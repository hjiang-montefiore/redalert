#!/usr/bin/env python3
"""SCORECARD: headless computer-vs-computer matches, A against B, aggregated.

usage:  python3 tools/jsc/scorecard.py [--off NAME[,NAME]] [--paired] [--quick] [--seeds N]
                                       [--maps fulda,korea,hormuz] [--eras e80,e20]
                                       [--tier commander] [--limit 900] [--jobs 2]
                                       [--tag LABEL] [--results FILE.jsonl] [--report FILE]
        python3 tools/jsc/scorecard.py --one map=fulda era=e80 seed=x fac0=nato fac1=pact b=1 [off=NAME] [offboth=NAME]
        python3 tools/jsc/scorecard.py --pair-report TREATMENT.jsonl CONTROL.jsonl [--report FILE]

Each match is one jsc process (run.py --test tools/jsc/scorecard.js), 3D off,
fog on, two computer commanders of one tier (default commander: every
behaviour active), doctrine "balanced" on both, 900 game-seconds. Run behind
_keep/jsc_wait.py, so it never piles more than two heavy jsc jobs on the
machine; --jobs 2 runs two at a time.

A and B are NOT seats. --off NAME[,NAME] puts player.aiOff = new Set([...]) on
B only, before the first tick (a behaviour checks P.aiOff && P.aiOff.has(name)
and skips itself); with no --off A and B are identical and the difference is
the NOISE FLOOR. Across the set the B seat alternates (player 0 / 1) and the
factions are swapped (nato / pact take each seat), four combinations in
rotation, one per seed, so spawn and faction advantage cancel:
    k=0  fac0=nato  B=seat 0 (B plays nato)      k=1  fac0=nato  B=seat 1 (B plays pact)
    k=2  fac0=pact  B=seat 0 (B plays pact)      k=3  fac0=pact  B=seat 1 (B plays nato)
Default set: maps fulda (land), korea (land), hormuz (water) x eras e80, e20 x
4 seeds = 24 matches. --seeds 8 doubles it for a tighter interval. --quick is 4
matches (fulda e80, one of each combination) cut to 300 game-seconds.

PAIRED MODE. --paired (needs --off) runs every spec of the set twice: the
treatment match as above (A has the behaviour, B has NAME off) and the CONTROL,
the SAME spec (map, era, seed, factions, B seat) with NAME off on BOTH seats
(scorecard.js offboth=NAME). A match is deterministic for its spec, so where
the behaviour never fires the two matches are bit-identical and the per-spec
effect, treatment minus control in A's net exchange, is exactly 0; only the
specs where it fires carry noise. The report gives the mean effect with a 95%
interval (normal), a bootstrap interval and an exact sign test over the specs
that differ, the identical / better / worse counts, the same split per
map/era and land vs sea (hormuz is the sea map); the same effect on A-B net
exchange is printed too. Both matches go to --results (resumable; control keys
carry offboth=NAME). Use PAIRED to measure a change that fires only now and
then (effects below ~0.2 net, which the rotated A/B cannot resolve at 24-48
matches), UNPAIRED for the NOISE FLOOR (no --off) or a change that alters
every match anyway. Costs 2x the matches. --pair-report reads two saved
results files (treatment, control; matched on map era seed b) and prints the
paired section without running anything.

COUNTERS. If a player has p.aiStats (an object of numbers), scorecard.js copies
it into that side's result ("stats"), and the report prints the per-match mean
of every key for A and B, so a new behaviour reports how often it fires by
bumping P.aiStats.<name> alone. kiteSteps (p.kiteN) stays as it was.

Per match a JSON line is appended to --results (default
scratch/scorecard_results.jsonl beside this run, see --results) and a finished
line is skipped when you re-run with the same --results and the same match key,
so an interrupted run resumes. Pass a different --tag (or file) for a new run.

Report: B minus A win rate (95% interval), the mean of the bounded net value
exchange (D-L)/(D+L) for A and B and their difference (paired per match), the
mean destroyed/lost ratio (smoothed (D+500)/(L+500), because a side that lost
nothing has no finite ratio) and the pooled sum(D)/sum(L), undecided count, and
a per-map/era breakdown. D = credits of the enemy's units+buildings this side
destroyed, L = credits it lost (the defs' costs, priced in Combat.kill).
"""
import json, math, os, re, subprocess, sys, threading, time
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
def find_wait():
    """_keep is git-ignored, so a git worktree has none: fall back to the main checkout."""
    c = [os.path.join(ROOT, "_keep", "jsc_wait.py")]
    try:
        g = subprocess.run(["git", "rev-parse", "--path-format=absolute", "--git-common-dir"], cwd=ROOT,
                           capture_output=True, text=True).stdout.strip()
        if g: c.append(os.path.join(os.path.dirname(g), "_keep", "jsc_wait.py"))
    except Exception: pass
    c.append("/Users/hjiang/Desktop/redalert/_keep/jsc_wait.py")
    return next((p for p in c if os.path.exists(p)), c[0])
WAIT = find_wait()
SCRATCH = "/private/tmp/claude-501/-Users-hjiang-Desktop-redalert/205bdd5e-d956-4ba9-8b16-4689520df09b/scratchpad/scorecard"
COMBOS = [("nato", "pact", 0), ("nato", "pact", 1), ("pact", "nato", 0), ("pact", "nato", 1)]
K = 500.0     # smoothing for the ratio

def argv_opt(args, name, default=None):
    return args[args.index(name) + 1] if name in args else default

def match_list(maps, eras, nseeds, off_tag, limit, tier):
    out = []
    for mi, m in enumerate(maps):
        for ei, e in enumerate(eras):
            for s in range(nseeds):
                f0, f1, b = COMBOS[(s + mi + 2 * ei) % 4]       # rotate so every cell sees all four
                out.append(dict(map=m, era=e, seed="sc%s%d" % (off_tag, s), fac0=f0, fac1=f1, b=b,
                                limit=limit, diff=tier))
    return out

def key(spec):
    k = "|".join(str(spec[k]) for k in ("map", "era", "seed", "fac0", "fac1", "b", "limit", "diff", "off"))
    return k + "|offboth=" + spec["offboth"] if spec.get("offboth") else k

def run_match(spec, console=False):
    """One jsc process. Returns the parsed SCORECARD dict (plus 'raw_errors')."""
    subprocess.run([sys.executable, WAIT], check=False)
    a = ["%s=%s" % (k, spec[k]) for k in ("map", "era", "seed", "fac0", "fac1", "b", "limit", "diff") if k in spec]
    if spec.get("off"): a.append("off=" + spec["off"])
    if spec.get("offboth"): a.append("offboth=" + spec["offboth"])
    cmd = [sys.executable, os.path.join(HERE, "run.py"), "index.html", "--limit", "2400",
           "--test", os.path.join(HERE, "scorecard.js"), "--"] + a
    t0 = time.time()
    p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    text = p.stdout + p.stderr
    m = re.findall(r"^SCORECARD (\{.*\})$", text, re.M)
    if not m:
        return dict(spec, error="no result line", tail=text[-600:], wall=round(time.time() - t0, 1))
    r = json.loads(m[-1]); r["spec_off"] = spec.get("off", ""); r["spec_offboth"] = spec.get("offboth", "")
    r["key"] = key(spec)
    gamelines = [l for l in text.splitlines() if re.search(r"\[(timer|load|inline|test load|DOMContentLoaded) error\]", l)]
    if gamelines: r["game_errors"] = gamelines[:5]
    return r

# ---------------------------------------------------------------- statistics
def mean_ci(xs):
    n = len(xs)
    if n == 0: return (float("nan"), float("nan"), float("nan"))
    mu = sum(xs) / n
    if n < 2: return (mu, float("nan"), float("nan"))
    sd = math.sqrt(sum((x - mu) ** 2 for x in xs) / (n - 1))
    h = 1.96 * sd / math.sqrt(n)           # normal approximation; n is small, treat as indicative
    return (mu, mu - h, mu + h)

def net(s):   # bounded net value exchange
    t = s["destroyed"] + s["lost"]
    return (s["destroyed"] - s["lost"]) / t if t else 0.0

def ratio(s):
    return (s["destroyed"] + K) / (s["lost"] + K)

def fmt(t, pct=False, d=2):
    mu, lo, hi = t
    if lo != lo: return "%+.*f [n/a]" % (d, mu)
    if pct: return "%+.0f%% [%+.0f%%, %+.0f%%]" % (mu * 100, lo * 100, hi * 100)
    return "%+.*f [%+.*f, %+.*f]" % (d, mu, d, lo, d, hi)

def report(rs, label, cmd):
    ok = [r for r in rs if "A" in r]
    bad = [r for r in rs if "A" not in r]
    L = []
    L.append("SCORECARD  %s" % label)
    L.append("command: %s" % cmd)
    L.append("matches %d ok, %d failed; wall %.0f s of match time (%.0f s mean)" % (
        len(ok), len(bad), sum(r["wall"] for r in ok), (sum(r["wall"] for r in ok) / len(ok)) if ok else 0))
    if not ok: return "\n".join(L + ["no results"])
    def win(r, side): return 1.0 if r[side]["result"] == "won" else 0.0
    wdiff = [win(r, "B") - win(r, "A") for r in ok]
    L.append("")
    L.append("undecided at the limit: %d of %d   A won %d   B won %d" % (
        sum(r["A"]["result"] == "undecided" for r in ok), len(ok),
        sum(r["A"]["result"] == "won" for r in ok), sum(r["B"]["result"] == "won" for r in ok)))
    L.append("win rate B - A            %s" % fmt(mean_ci(wdiff), pct=True))
    nA = [net(r["A"]) for r in ok]; nB = [net(r["B"]) for r in ok]
    L.append("net exchange (D-L)/(D+L)  A %+.3f   B %+.3f   B-A %s" % (
        sum(nA) / len(nA), sum(nB) / len(nB), fmt(mean_ci([b - a for a, b in zip(nA, nB)]), d=3)))
    rA = [ratio(r["A"]) for r in ok]; rB = [ratio(r["B"]) for r in ok]
    L.append("mean D/L ratio (smoothed) A %.2f   B %.2f   B-A %s" % (
        sum(rA) / len(rA), sum(rB) / len(rB), fmt(mean_ci([b - a for a, b in zip(rA, rB)]))))
    for side in ("A", "B"):
        D = sum(r[side]["destroyed"] for r in ok); Lo = sum(r[side]["lost"] for r in ok)
        L.append("  %s pooled: destroyed %d  lost %d  D/L %.2f   army value at end %.0f  prod bldgs left %.1f  units lost %.1f  bldgs lost %.1f" % (
            side, D, Lo, D / Lo if Lo else float("inf"),
            sum(r[side]["armyValue"] for r in ok) / len(ok), sum(r[side]["prodLeft"] for r in ok) / len(ok),
            sum(r[side]["lostUnits"] for r in ok) / len(ok), sum(r[side]["lostBldgs"] for r in ok) / len(ok)))
    kA = [r["A"].get("kiteSteps", 0) for r in ok]; kB = [r["B"].get("kiteSteps", 0) for r in ok]
    L.append("kite steps per match      A %.1f (max %d, %d of %d matches with any)   B %.1f" % (
        sum(kA) / len(kA), max(kA), sum(1 for k in kA if k), len(kA), sum(kB) / len(kB)))
    keys = sorted({k for r in ok for sd in ("A", "B") for k in (r[sd].get("stats") or {})})
    if keys:
        L.append("aiStats per match (mean; A / B; matches with any):")
        for k in keys:
            va = [(r["A"].get("stats") or {}).get(k, 0) for r in ok]; vb = [(r["B"].get("stats") or {}).get(k, 0) for r in ok]
            L.append("  %-24s A %9.2f (%d)   B %9.2f (%d)" % (k, sum(va) / len(va), sum(1 for v in va if v), sum(vb) / len(vb), sum(1 for v in vb if v)))
    L.append("")
    L.append("per map / era (B-A net exchange, B-A win rate, undecided):")
    cells = {}
    for r in ok: cells.setdefault((r["map"], r["era"]), []).append(r)
    for c in sorted(cells):
        g = cells[c]
        dn = [net(r["B"]) - net(r["A"]) for r in g]
        dw = [win(r, "B") - win(r, "A") for r in g]
        L.append("  %-8s %-4s n=%d  net %+.3f   win %+.0f%%   undecided %d   mean end t %.0f s" % (
            c[0], c[1], len(g), sum(dn) / len(dn), 100 * sum(dw) / len(dw),
            sum(r["A"]["result"] == "undecided" for r in g), sum(r["endT"] for r in g) / len(g)))
    sw = [r for r in ok if r["A"]["result"] != "undecided"]
    if sw:
        L.append("")
        L.append("decided matches:")
        for r in sw:
            L.append("  %s %s %s b=seat%d  winner %s  at t=%s" % (
                r["map"], r["era"], r["seed"], r["b"], "A" if r["A"]["result"] == "won" else "B",
                r["B"]["defeatT"] if r["A"]["result"] == "won" else r["A"]["defeatT"]))
    err = [r for r in ok if r.get("game_errors") or r.get("errors")]
    if err:
        L.append("")
        L.append("matches with game errors: %d" % len(err))
        for r in err[:5]: L.append("  %s %s %s: %s" % (r["map"], r["era"], r["seed"], (r.get("errors") or r.get("game_errors"))[0]))
    for r in bad: L.append("FAILED %s: %s" % (key(r) if "map" in r else "?", r.get("error")))
    return "\n".join(L)

# ---------------------------------------------------------------- paired
def pkey(r): return (r["map"], r["era"], r["seed"], r["b"])

def same(a, b):
    f = ("destroyed", "lost", "lostUnits", "lostBldgs", "armyValue", "bldValue")
    return all(a[s][k] == b[s][k] for s in ("A", "B") for k in f) and a["endT"] == b["endT"]

def sign_p(w, l):
    n = w + l
    if not n: return 1.0
    t = sum(math.comb(n, i) for i in range(0, min(w, l) + 1)) / 2.0 ** n
    return min(1.0, 2 * t)

def boot_ci(xs, n=4000):
    import random
    rnd = random.Random(12345); m = len(xs)
    ms = sorted(sum(xs[rnd.randrange(m)] for _ in range(m)) / m for _ in range(n))
    return ms[int(0.025 * n)], ms[int(0.975 * n)]

def paired_report(tr, ct):
    """tr, ct: lists of result dicts (treatment: A has behaviour / B off; control: off on both)."""
    c = {pkey(r): r for r in ct if "A" in r}
    pr = [(r, c[pkey(r)]) for r in tr if "A" in r and pkey(r) in c]
    L = ["", "PAIRED: effect = A net exchange (D-L)/(D+L), treatment minus control (same spec, behaviour off on both seats); >0 = behaviour helps A",
         "specs with both matches: %d of %d treatment matches" % (len(pr), len(tr))]
    if not pr: return "\n".join(L)
    def row(g):
        e = [net(t["A"]) - net(k["A"]) for t, k in g]
        e2 = [(net(t["A"]) - net(t["B"])) - (net(k["A"]) - net(k["B"])) for t, k in g]
        ident = sum(1 for t, k in g if same(t, k))
        w = sum(1 for x in e if x > 1e-9); l = sum(1 for x in e if x < -1e-9)
        return e, e2, ident, w, l
    def line(name, g):
        e, e2, ident, w, l = row(g)
        mu, lo, hi = mean_ci(e)
        s = "  %-14s n=%2d  effect %s   identical %2d   better %2d  worse %2d  (differ, tied %d)" % (
            name, len(g), fmt((mu, lo, hi), d=3), ident, w, l, len(g) - ident - w - l)
        return s
    e, e2, ident, w, l = row(pr)
    L.append("effect on A net exchange   %s   (A-B net: %s)" % (fmt(mean_ci(e), d=3), fmt(mean_ci(e2), d=3)))
    bl, bh = boot_ci(e)
    L.append("bootstrap 95%% interval     [%+.3f, %+.3f]   sign test (specs with an effect) %d better / %d worse, two-sided p=%.3f" % (bl, bh, w, l, sign_p(w, l)))
    L.append("identical matches          %d of %d (effect exactly 0)   better %d   worse %d" % (ident, len(pr), w, l))
    L.append("")
    L.append("per map / era, land vs sea:")
    cells = {}
    for t, k in pr: cells.setdefault((t["map"], t["era"]), []).append((t, k))
    for cc in sorted(cells): L.append(line("%s %s" % cc, cells[cc]))
    L.append(line("LAND", [p for p in pr if p[0]["map"] != "hormuz"]) if any(p[0]["map"] != "hormuz" for p in pr) else "  LAND  none")
    if any(p[0]["map"] == "hormuz" for p in pr): L.append(line("SEA (hormuz)", [p for p in pr if p[0]["map"] == "hormuz"]))
    return "\n".join(L)

def load(path):
    out = []
    for l in open(path):
        try: r = json.loads(l)
        except Exception: continue
        if "A" in r: out.append(r)
    return out

def main():
    args = sys.argv[1:]
    if "-h" in args or "--help" in args: print(__doc__); return
    if "--one" in args:
        kv = dict(a.split("=", 1) for a in args[args.index("--one") + 1:] if "=" in a)
        spec = dict(map="fulda", era="e80", seed="one", fac0="nato", fac1="pact", b=1, limit=900, diff="commander", off="")
        spec.update(kv); spec["b"] = int(spec["b"])
        r = run_match(spec); print(json.dumps(r)); return
    if "--pair-report" in args:
        i = args.index("--pair-report"); tr, ct = load(args[i + 1]), load(args[i + 2])
        text = report(tr, "treatment=%s control=%s" % (args[i + 1], args[i + 2]), "scorecard.py " + " ".join(args)) + "\n" + paired_report(tr, ct)
        print(text)
        rp = argv_opt(args, "--report")
        if rp: open(rp, "w").write(text + "\n")
        return
    quick = "--quick" in args
    maps = argv_opt(args, "--maps", "fulda" if quick else "fulda,korea,hormuz").split(",")
    eras = argv_opt(args, "--eras", "e80" if quick else "e80,e20").split(",")
    nseeds = int(argv_opt(args, "--seeds", "4"))
    limit = int(argv_opt(args, "--limit", "300" if quick else "900"))
    tier = argv_opt(args, "--tier", "commander")
    off = argv_opt(args, "--off", "")
    jobs = int(argv_opt(args, "--jobs", "2"))
    tag = argv_opt(args, "--tag", "")
    results = argv_opt(args, "--results", os.path.join(SCRATCH, "results_%s.jsonl" % (re.sub(r"\W+", "_", off or "none") + tag)))
    os.makedirs(os.path.dirname(results), exist_ok=True)
    specs = match_list(maps, eras, nseeds, tag, limit, tier)
    for s in specs: s["off"] = off
    paired = "--paired" in args
    if paired:
        if not off: print("--paired needs --off NAME"); sys.exit(2)
        ctl = [dict(s, off="", offboth=off) for s in specs]
        allspecs = [x for pair in zip(specs, ctl) for x in pair]       # a pair side by side, so a cut run keeps whole pairs
    else:
        allspecs = specs
    done = {}
    if os.path.exists(results):
        for l in open(results):
            try: r = json.loads(l)
            except Exception: continue
            if "key" in r and "A" in r: done[r["key"]] = r
    todo = [s for s in allspecs if key(s) not in done]
    print("%d matches, %d already in %s" % (len(allspecs), len(allspecs) - len(todo), results), flush=True)
    lock = threading.Lock(); t0 = time.time()
    def go(s):
        r = run_match(s)
        with lock:
            if "A" in r:
                open(results, "a").write(json.dumps(r) + "\n"); done[key(s)] = r
            print("  [%4.0fs] %s %s %s fac0=%s b=%d -> %s" % (
                time.time() - t0, s["map"], s["era"], s["seed"] + ("/ctl" if s.get("offboth") else ""), s["fac0"], s["b"],
                ("A %s B %s, %.0fs wall" % (r["A"]["result"], r["B"]["result"], r["wall"])) if "A" in r else r.get("error")), flush=True)
    with ThreadPoolExecutor(max_workers=jobs) as ex: list(ex.map(go, todo))
    rs = [done[key(s)] for s in specs if key(s) in done]
    label = "off=%s  tier=%s  limit=%ds  maps=%s eras=%s seeds=%d" % (off or "(none: A and B identical, NOISE FLOOR)", tier, limit, ",".join(maps), ",".join(eras), nseeds)
    text = report(rs, label, "python3 tools/jsc/scorecard.py " + " ".join(args))
    if paired:
        text += "\n" + paired_report(rs, [done[key(s)] for s in ctl if key(s) in done])
    text += "\nbatch wall time %.0f s (%d jobs)" % (time.time() - t0, jobs)
    print("\n" + text)
    rp = argv_opt(args, "--report")
    if rp: open(rp, "w").write(text + "\n")

if __name__ == "__main__":
    main()
