#!/usr/bin/env python3
"""SCORECARD: headless computer-vs-computer matches, A against B, aggregated.

usage:  python3 tools/jsc/scorecard.py [--off NAME[,NAME]] [--quick] [--seeds N]
                                       [--maps fulda,korea,hormuz] [--eras e80,e20]
                                       [--tier commander] [--limit 900] [--jobs 2]
                                       [--tag LABEL] [--results FILE.jsonl] [--report FILE]
        python3 tools/jsc/scorecard.py --one map=fulda era=e80 seed=x fac0=nato fac1=pact b=1 [off=NAME]

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
WAIT = os.path.join(ROOT, "_keep", "jsc_wait.py")
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
    return "|".join(str(spec[k]) for k in ("map", "era", "seed", "fac0", "fac1", "b", "limit", "diff", "off"))

def run_match(spec, console=False):
    """One jsc process. Returns the parsed SCORECARD dict (plus 'raw_errors')."""
    subprocess.run([sys.executable, WAIT], check=False)
    a = ["%s=%s" % (k, spec[k]) for k in ("map", "era", "seed", "fac0", "fac1", "b", "limit", "diff") if k in spec]
    if spec.get("off"): a.append("off=" + spec["off"])
    cmd = [sys.executable, os.path.join(HERE, "run.py"), "index.html", "--limit", "2400",
           "--test", os.path.join(HERE, "scorecard.js"), "--"] + a
    t0 = time.time()
    p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    text = p.stdout + p.stderr
    m = re.findall(r"^SCORECARD (\{.*\})$", text, re.M)
    if not m:
        return dict(spec, error="no result line", tail=text[-600:], wall=round(time.time() - t0, 1))
    r = json.loads(m[-1]); r["spec_off"] = spec.get("off", "")
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

def main():
    args = sys.argv[1:]
    if "-h" in args or "--help" in args: print(__doc__); return
    if "--one" in args:
        kv = dict(a.split("=", 1) for a in args[args.index("--one") + 1:] if "=" in a)
        spec = dict(map="fulda", era="e80", seed="one", fac0="nato", fac1="pact", b=1, limit=900, diff="commander", off="")
        spec.update(kv); spec["b"] = int(spec["b"])
        r = run_match(spec); print(json.dumps(r)); return
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
    done = {}
    if os.path.exists(results):
        for l in open(results):
            try: r = json.loads(l)
            except Exception: continue
            if "key" in r and "A" in r: done[r["key"]] = r
    todo = [s for s in specs if key(s) not in done]
    print("%d matches, %d already in %s" % (len(specs), len(specs) - len(todo), results), flush=True)
    lock = threading.Lock(); t0 = time.time()
    def go(s):
        r = run_match(s)
        with lock:
            if "A" in r:
                open(results, "a").write(json.dumps(r) + "\n"); done[key(s)] = r
            print("  [%4.0fs] %s %s %s fac0=%s b=%d -> %s" % (
                time.time() - t0, s["map"], s["era"], s["seed"], s["fac0"], s["b"],
                ("A %s B %s, %.0fs wall" % (r["A"]["result"], r["B"]["result"], r["wall"])) if "A" in r else r.get("error")), flush=True)
    with ThreadPoolExecutor(max_workers=jobs) as ex: list(ex.map(go, todo))
    rs = [done[key(s)] for s in specs if key(s) in done]
    label = "off=%s  tier=%s  limit=%ds  maps=%s eras=%s seeds=%d" % (off or "(none: A and B identical, NOISE FLOOR)", tier, limit, ",".join(maps), ",".join(eras), nseeds)
    text = report(rs, label, "python3 tools/jsc/scorecard.py " + " ".join(args))
    text += "\nbatch wall time %.0f s (%d jobs)" % (time.time() - t0, jobs)
    print("\n" + text)
    rp = argv_opt(args, "--report")
    if rp: open(rp, "w").write(text + "\n")

if __name__ == "__main__":
    main()
