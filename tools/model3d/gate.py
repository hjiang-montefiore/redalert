#!/usr/bin/env python3
"""The automatic gate for a hero model: numbers, limits, PASS or FAIL.

usage:
  python3 tools/model3d/gate.py KEY [--spec tools/model3d/specs/KEY.json] [--team T]
                                    [--before DIR] [--extra FILE.js]... [--out DIR]
                                    [--before-align] [--category ship|air|veh] [--no-render]

Runs dump.js on KEY (and on --before DIR), outline.py against every reference
of the spec, and render.js (a true render; with --before a before | after
sheet), the landmarks of the spec, the floating-part check, then prints one line
per rule with the measured number and its limit.
Exit code 1 if any rule FAILs. WARN and INFO never fail the gate: they are for
the reviewer. Everything lands in --out (default ./gate_out): gate_KEY.json,
KEY.json (the dump), render_KEY.png/.json, outline_KEY_*.png.

The spec is found at tools/model3d/specs/KEY.json when --spec is not given;
without one the outline, length-vs-published and required-node rules are
skipped and the category must come from --category or the game's unit table.
"""
import json, math, os, re, subprocess, sys, time
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import outline as OL  # noqa: E402
import m3dlib as ML   # noqa: E402

# ============================================================== THE LIMITS
# One column per category. None = not gated for that category (still printed).
#                                         ship     air      veh
LIMITS = {
    "draw_calls_max":                    (16,      16,      16),
    "tris_min":                          (8000,    6000,    8000),     # AGENT_POLICY 5: 8k-20k ship or vehicle,
    "tris_max":                          (20000,   12000,   20000),    # 6k-12k aircraft ...
    "tris_tolerance":                    (0.06,    0.06,    0.06),     # ... with this much grace on either end
    "zero_area_max":                     (0,       0,       0),
    "nan_max":                           (0,       0,       0),
    "length_tolerance":                  (0.015,   0.015,   0.015),    # of spec len and of the published length
    "textured_share_min":                (0.55,    0.55,    0.45),     # of OPAQUE area carrying a paint sheet
    "largest_flat_untextured_max":       (0.06,    0.06,    0.08),     # one flat, plain face as a share of opaque area
    # Boxiness is the share of opaque area whose normal lies along a model axis. A good model is NOT near
    # zero: decks, wing skins (an aerofoil 3-6% thick is within 3 degrees of flat) and fins all count. The
    # two hero models measured 41% (F-15C) and 50% (Type 055); a hull or fuselage built of boxes adds its
    # sides and ends on top of that. Calibrated on two models only - tighten as more pass through.
    "boxiness_max":                      (0.62,    0.50,    None),
    "plan_fill_max":                     (0.93,    None,    None),     # top silhouette / its bounding rectangle: a box hull is 1.0; the Type 055 measured 0.898
    "fittings_min":                      (40,      25,      30),       # separate small parts
    "outline_iou_min":                   (0.88,    0.88,    0.88),     # "exact" references only
    "detail_ratio_min":                  (1.00,    1.00,    1.00),     # game-view sobel, after / before
    "detail_ratio_want":                 (1.10,    1.10,    1.10),     # below this: WARN "did not rise"
    # Floating parts: an assembly of touching parts (gap <= 5 mm) that does not touch the main body FAILs
    # when its gap is over max(float_gap_min_m, float_gap_share x its own size, float_gap_len_share x the
    # model's length): an eighth of the part, and 3 px of the review sheet's 900 px side panel (0.0037 L).
    # A 0.8 m wheel door 0.24 m under the belly fails; a 0.2 m canopy rail 12 mm off the glass does not
    # (it is listed as a WARN, with every other part standing off by more than 5 mm).
    "float_gap_min_m":                   (0.02,    0.02,    0.02),
    "float_gap_share":                   (0.125,   0.125,   0.125),
    "float_gap_len_share":               (0.0,     0.0,     0.0),     # off: a length term was tuned to pass tel_c and let 5 cm floats through (ships got a 22 cm floor); fix the model instead
    "landmark_tol_m":                    (0.15,    0.05,    0.08),     # a landmark's tolerance when it gives none
}
CATS = ("ship", "air", "veh")
BOX_AXIS_COS = math.cos(math.radians(3.0))     # a face counts as axis-aligned within 3 degrees
FITTING_MAX_SIZE = 0.06                        # a "fitting": a separate part no bigger than 6% of the length ...
FITTING_MIN_SIZE = 0.0015                      # ... and no smaller than 0.15% (a stray sliver is not a fitting)
OPAQUE_MIN = 0.99                              # a material at or above this opacity is "opaque"
MARKING_WORDS = r"insignia|roundel|star|marking|flag|numeral|pennant|tailcode|serial|emblem|decal|logo"
FLOAT_REPORT_M = 0.005                         # parts closer than this touch
FREE_DEFAULT = ["rotordisc", "flame"]          # node names that float on purpose in every model
# a must_show item names a place: a number with a unit, an axis value, a station / column / row, a per cent of length
POSITION_RE = r"[-+]?\d+(\.\d+)?\s*(m|mm|deg|per ?cent|%)(?![a-z])|\b[xyzXYZ]\s*[=:~]?\s*[-+]?\s*\d|\b(col|cols|row|rows|station|stations|frame|axle)\s*\d"


SPEC_LIMITS = {}   # per-model exceptions from the spec's "limits" block, set in main()


def lim(name, cat):
    """A limit from the table, unless the spec overrides it. An override must give a reason
    ({"limits": {"plan_fill_max": {"value": 0.95, "reason": "..."}}}); the gate prints it."""
    o = SPEC_LIMITS.get(name)
    if o is not None:
        return o["value"]
    return LIMITS[name][CATS.index(cat)]


# ============================================================== MEASURES
def tri_arrays(dump):
    tris = dump["tris"]
    T = np.array([t[:9] for t in tris], dtype=np.float64).reshape(-1, 3, 3)
    mi = np.array([t[9] for t in tris], dtype=np.int32)
    return T, mi


def surface_measures(dump):
    T, mi = tri_arrays(dump)
    mats = dump["materials"]
    n = np.cross(T[:, 1] - T[:, 0], T[:, 2] - T[:, 0])
    a2 = np.linalg.norm(n, axis=1)
    area = a2 / 2
    nrm = n / np.maximum(a2, 1e-12)[:, None]
    opaque_m = np.array([(m.get("opacity", 1) or 0) >= OPAQUE_MIN for m in mats])
    textured_m = np.array([bool(m.get("map")) for m in mats])
    vcol_m = np.array([bool(m.get("vcol")) for m in mats])
    op = opaque_m[mi]
    tex = textured_m[mi] & op
    A = float(area[op].sum())
    out = {"opaque_area_m2": round(A, 2), "transparent_area_m2": round(float(area[~op].sum()), 2)}
    out["textured_share"] = round(float(area[tex].sum()) / A, 4) if A else 0
    out["vertex_coloured_share"] = round(float(area[vcol_m[mi] & op].sum()) / A, 4) if A else 0
    # boxiness: opaque area whose normal lies along a model axis
    ax = np.abs(nrm).max(axis=1) >= BOX_AXIS_COS
    out["boxiness"] = round(float(area[ax & op].sum()) / A, 4) if A else 0
    # the largest flat untextured face: plain opaque triangles grouped by material and plane
    plain = op & ~tex
    if plain.any():
        P = T[plain]
        nn = nrm[plain]
        d = np.einsum("ij,ij->i", nn, P[:, 0])
        keys = np.concatenate([mi[plain][:, None], np.round(nn / 0.02).astype(np.int64), np.round(d / 0.02).astype(np.int64)[:, None]], axis=1)
        _, inv = np.unique(keys, axis=0, return_inverse=True)
        sums = np.bincount(inv.ravel(), weights=area[plain])
        j = int(sums.argmax())
        sel = inv.ravel() == j
        c = P[sel].reshape(-1, 3).mean(axis=0)
        out["largest_flat_untextured"] = {"share": round(float(sums[j]) / A, 4), "area_m2": round(float(sums[j]), 2),
                                          "normal": [round(float(v), 2) for v in nn[sel][0]], "at": [round(float(v), 2) for v in c],
                                          "material": int(mi[plain][sel][0]), "color": mats[int(mi[plain][sel][0])].get("color")}
    else:
        out["largest_flat_untextured"] = {"share": 0.0, "area_m2": 0.0}
    # plan fill: the top silhouette as a share of its bounding rectangle
    from PIL import Image, ImageDraw
    S = T[op]
    x0, y0 = S[:, :, 0].min(), S[:, :, 1].min()
    k = 1200.0 / max(1e-6, S[:, :, 0].max() - x0)
    w, h = 1201, int(math.ceil((S[:, :, 1].max() - y0) * k)) + 1
    im = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(im)
    PX, PY = (S[:, :, 0] - x0) * k, (S[:, :, 1] - y0) * k
    for i in range(len(S)):
        d.polygon([(PX[i, 0], PY[i, 0]), (PX[i, 1], PY[i, 1]), (PX[i, 2], PY[i, 2])], fill=255, outline=255)
    out["plan_fill"] = round(float((np.asarray(im) > 127).mean()), 4)
    return out


def parts(dump):
    """Separate parts: triangles joined through shared vertices (welded at 1 mm). -> list of bbox diagonals."""
    T, mi = tri_arrays(dump)
    V = np.round(T.reshape(-1, 3) * 1000).astype(np.int64)
    _, vid = np.unique(V, axis=0, return_inverse=True)
    vid = vid.ravel().reshape(-1, 3)
    nv = int(vid.max()) + 1 if len(vid) else 0
    par = np.arange(nv)

    def find(a):
        while par[a] != a:
            par[a] = par[par[a]]
            a = par[a]
        return a
    for a, b, c in vid.tolist():
        ra, rb, rc = find(a), find(b), find(c)
        if ra != rb:
            par[ra] = rb
        rb = find(b)
        if rc != rb:
            par[rc] = rb
    roots = np.array([find(i) for i in range(nv)])
    troot = roots[vid[:, 0]]
    uniq, inv = np.unique(troot, return_inverse=True)
    P = T.reshape(-1, 9)
    lo = np.full((len(uniq), 3), np.inf)
    hi = np.full((len(uniq), 3), -np.inf)
    for k in range(3):
        for c in range(3):
            np.minimum.at(lo[:, c], inv, P[:, k * 3 + c])
            np.maximum.at(hi[:, c], inv, P[:, k * 3 + c])
    return np.linalg.norm(hi - lo, axis=1)


def find_source(key, extra, root):
    """The file that registers UNIT_MODELS[key]: the last --extra that does, else the last index.html script that does."""
    pat = re.compile(r"UNIT_MODELS\s*(\[\s*[\"']%s[\"']\s*\]|\.%s\b)\s*=" % (re.escape(key), re.escape(key)))
    for f in reversed(extra):
        try:
            if pat.search(open(f, encoding="utf8", errors="replace").read()):
                return f
        except OSError:
            pass
    try:
        html = open(os.path.join(root, "index.html"), encoding="utf8", errors="replace").read()
    except OSError:
        return None
    hit = None
    for m in re.finditer(r"<script\b[^>]*\bsrc\s*=\s*[\"']([^\"'?]+)", html):
        f = os.path.join(root, m.group(1))
        if "three.min" in f or not os.path.exists(f):
            continue
        if pat.search(open(f, encoding="utf8", errors="replace").read()):
            hit = f
    return hit


def paint_scan(path):
    """Advisory: canvas text drawn in the file's CODE (comments stripped). Identifiers are NOT scanned:
    the kit's own option names (deckMarkings, ...) are paint the rules allow; marking-like MATERIAL names
    are checked on the dump instead."""
    src = open(path, encoding="utf8", errors="replace").read()
    code = re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group(0).count("\n"), src, flags=re.S)
    hits = []
    for i, line in enumerate(code.split("\n"), 1):
        line2 = re.sub(r"//.*$", "", line)
        if re.search(r"\b(fillText|strokeText)\s*\(", line2):
            hits.append((i, "canvas text", line2.strip()[:90]))
    return hits


def marking_material(name):
    m = re.search(r"(%s)" % MARKING_WORDS, name or "", flags=re.I)
    return bool(m) and not re.search(r"star(t|board)", name, flags=re.I)


def eval_landmarks(dump, spec, spec_path, cat):
    """Each spec landmark: where the reference puts it, where the model has it, the error in metres."""
    base = os.path.dirname(os.path.abspath(spec_path))
    refs = spec.get("references", [])
    T0, mi = ML.tri_array(dump)
    out = []
    for j, lm in enumerate(spec.get("landmarks", [])):
        r = {"n": j, "name": lm.get("name", "#%d" % j)}
        try:
            ref = refs[lm["ref"]] if lm.get("ref") is not None else {}
            view = lm.get("view") or ref.get("view")
            tol = float(lm.get("tol_m", lim("landmark_tol_m", cat)))
            r.update({"ref": lm.get("ref"), "view": view, "tol_m": tol})
            # expected, in the view's axes (h, v), or model xyz with nulls for what is not checked
            if lm.get("expect_m") is not None:
                e = list(lm["expect_m"])
            elif lm.get("at_m") is not None:
                e = list(lm["at_m"])
            elif lm.get("at_px") is not None:
                e = list(OL.ref_frame(ref, base)["to_m"](lm["at_px"]))
            else:
                raise ValueError("needs expect_m, at_m or at_px")
            if len(e) == 3:
                axes = [0, 1, 2]
            elif view in ML.VIEW_AXES:
                axes = list(ML.VIEW_AXES[view])
            else:
                raise ValueError("a 2-value expectation needs a side/top/front view (landmark 'view' or its reference's)")
            sel = lm.get("model_at") or {}
            T = T0
            if ref.get("pitch_deg"):
                T = ML.pitch_tris(T0, float(ref["pitch_deg"]), tuple(ref.get("pitch_about_m", (0.0, 0.0))))
            got = [None] * len(e)
            if sel.get("node"):
                hits = [nd for nd in dump["nodes"] if nd["name"] == sel["node"]]
                if not hits:
                    raise ValueError("no node named %r" % sel["node"])
                pos = np.array([hits[int(sel.get("index", 0))]["pos"]], dtype=np.float64)
                if ref.get("pitch_deg"):
                    pos = ML.pitch_tris(pos[None], float(ref["pitch_deg"]), tuple(ref.get("pitch_about_m", (0.0, 0.0))))[0]
                got = [float(pos[0][a]) for a in axes]
            else:
                m = ML.select_tris(dump, T, mi, sel)
                if ref.get("hide"):
                    m &= ~ML.select_names(dump, ref["hide"])
                if not m.any():
                    raise ValueError("model_at selects no triangles")
                S = T[m]
                if sel.get("cross") is not None:
                    # where the silhouette's edge first crosses a level, scanning from_h -> to_h: a box end,
                    # a step, a raked front. expect_m is [h, level]; only h is compared
                    if len(e) != 2:
                        raise ValueError("a cross landmark takes a 2-value expect_m [h, level]")
                    lev = float(sel["cross"])
                    h0, h1 = float(sel["from_h"]), float(sel["to_h"])
                    up = sel.get("edge", "upper") != "lower"
                    nstep = max(2, int(abs(h1 - h0) / 0.01))
                    prev, hit = None, None
                    for q in range(nstep + 1):
                        h = h0 + (h1 - h0) * q / nstep
                        v = ML.edge_at(S, axes[0], axes[1], h, upper=up)
                        above = v is not None and (v >= lev if up else v <= lev)
                        if above and prev is not None:
                            hit = h
                            break
                        prev = h if not above else None
                        if q == 0 and above:
                            raise ValueError("the edge is already past %.2f at from_h %.2f" % (lev, h0))
                    if hit is None:
                        raise ValueError("the edge never crosses %.2f between %.2f and %.2f" % (lev, h0, h1))
                    got = [hit, e[1]]
                    e = [e[0], None]
                elif sel.get("edge"):
                    if len(e) != 2:
                        raise ValueError("an edge landmark takes a 2-value expect_m [h, v]")
                    h = sel.get("at_h", e[0])
                    v = ML.edge_at(S, axes[0], axes[1], float(h), upper=sel["edge"] != "lower")
                    got = [e[0], v]
                    if v is None:
                        raise ValueError("no model surface at %s = %.2f" % ("xyz"[axes[0]], h))
                else:
                    pts = S.reshape(-1, 3)
                    pick = sel.get("point") or ["mid"] * len(e)
                    for q, a in enumerate(axes):
                        how = pick[q] if q < len(pick) else "mid"
                        if e[q] is None or how is None:
                            continue
                        col = pts[:, a]
                        got[q] = float(col.min() if how == "min" else col.max() if how == "max" else
                                       (col.min() + col.max()) / 2)
            d2, used = 0.0, []
            for q in range(len(e)):
                if e[q] is None or got[q] is None:
                    continue
                d2 += (got[q] - e[q]) ** 2
                used.append("xyz"[axes[q]])
            if not used:
                raise ValueError("nothing to compare (every coordinate null)")
            r.update({"expect": [None if x is None else round(float(x), 3) for x in e],
                      "model": [None if x is None else round(float(x), 3) for x in got], "axes": "".join("xyz"[a] for a in axes),
                      "checked": "".join(used), "error_m": round(math.sqrt(d2), 3)})
            r["ok"] = r["error_m"] <= tol
        except Exception as ex:   # a broken landmark is a spec error, reported as such
            r["error"] = "%s: %s" % (type(ex).__name__, ex)
        out.append(r)
    return out


def must_show_lint(spec):
    """must_show items that name no station or position."""
    return [m for m in spec.get("must_show", []) if not re.search(POSITION_RE, m)]


def run(cmd, timeout=600):
    t = time.time()
    p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, timeout=timeout)
    return p.returncode, p.stdout, time.time() - t


def jsc_runner():
    """How to run dump.js: real jsc if there is one, else the Node shim next to this file."""
    for j in (os.environ.get("JSC"), "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"):
        if j and os.path.exists(j):
            return [j]
    return ["node", os.path.join(HERE, "jscnode.js")]


# ============================================================== THE GATE
def main(argv):
    if not argv or "-h" in argv or "--help" in argv:
        print(__doc__)
        return 2
    o = {"extra": [], "out": "gate_out", "spec": None, "before": None, "team": None, "category": None, "render": True, "before_align": False}
    pos, i = [], 0
    while i < len(argv):
        a = argv[i]
        if a == "--spec": o["spec"] = argv[i + 1]; i += 2
        elif a == "--before": o["before"] = os.path.abspath(argv[i + 1]); i += 2
        elif a == "--extra": o["extra"].append(os.path.abspath(argv[i + 1])); i += 2
        elif a == "--out": o["out"] = argv[i + 1]; i += 2
        elif a == "--team": o["team"] = argv[i + 1]; i += 2
        elif a == "--category": o["category"] = argv[i + 1]; i += 2
        elif a == "--no-render": o["render"] = False; i += 1
        elif a == "--before-align": o["before_align"] = True; i += 1
        else: pos.append(a); i += 1
    key = pos[0]
    out = os.path.abspath(o["out"])
    os.makedirs(out, exist_ok=True)
    T0 = time.time()
    times = {}
    spec_path = o["spec"] or os.path.join(HERE, "specs", key + ".json")
    spec = json.load(open(spec_path)) if os.path.exists(spec_path) else None
    for _n, _o in ((spec or {}).get("limits") or {}).items():
        if _n not in LIMITS:
            sys.exit("gate: spec limit %r is not a gate rule (rules: %s)" % (_n, ", ".join(sorted(LIMITS))))
        if not (isinstance(_o, dict) and "value" in _o and str(_o.get("reason", "")).strip()):
            sys.exit("gate: spec limit %r needs {\"value\": ..., \"reason\": \"...\"}" % _n)
        SPEC_LIMITS[_n] = _o
        print("OVERRIDE  %-32s %s (table: %s) - %s" % (_n, _o["value"], LIMITS[_n], _o["reason"]))
    if o["spec"] and spec is None:
        print("gate: spec %s not found" % o["spec"]); return 2
    team = o["team"] or (spec or {}).get("team") or "nato"

    rows = []          # (status, rule, measured, limit, note)

    def add(status, rule, measured, limit="", note=""):
        rows.append((status, rule, str(measured), str(limit), note))

    # ---- 1. dump
    dump_path = os.path.join(out, key + ".json")
    cmd = jsc_runner() + [os.path.join(HERE, "dump.js"), "--", "unit", key, team, dump_path]
    for f in o["extra"]:
        cmd += ["--extra", f]
    if os.path.exists(dump_path):
        os.remove(dump_path)
    rc, txt, times["dump"] = run(cmd)
    if rc != 0 or not os.path.exists(dump_path):
        print(txt.strip()); print("gate %s: FAIL - the model does not build (dump.js)" % key); return 1
    load_errors = [l for l in txt.split("\n") if l.startswith("[load error]")]
    dump = json.load(open(dump_path))
    st = dump["stats"]
    before = None
    if o["before"]:
        bpath = os.path.join(out, key + "_before.json")
        if os.path.exists(bpath):
            os.remove(bpath)
        rc, btxt, times["dump_before"] = run(jsc_runner() + [os.path.join(HERE, "dump.js"), "--", "unit", key, team, bpath, "--root", o["before"]])
        if rc == 0 and os.path.exists(bpath):
            before = json.load(open(bpath))
        else:
            add("WARN", "before", "no " + key + " in " + o["before"], "", "the --before rules are skipped")

    cat = o["category"] or (spec or {}).get("category")
    if cat not in CATS:
        cat = None
    if cat is None:
        cat = "ship" if re.search(r"cruiser|(?<!tank)destroyer|frigate|corvette|carrier|boat|(?<!gun)ship|sub|ssbn|ssn|lcu|lst|lhd|lph|lpd|landing|patrol|minesweep", key) else \
              "air" if re.search(r"fighter|bomber|cas|helo|gunship|transport|lamps|airlift|tanker|ewair|awacs|air|stealth|drone|uav", key) else "veh"
        add("INFO", "category", cat, "", "guessed from the key: put \"category\" in the spec")

    # ---- 2. rules on the dump
    n_iss = len(st.get("issues", [])) + len(load_errors)
    add("PASS" if n_iss == 0 else "FAIL", "dump issues", n_iss, "0", "; ".join((st.get("issues", []) + load_errors)[:2]))
    for nt in st.get("notes", [])[:2]:
        add("INFO", "dump note", nt)
    add("PASS" if st["drawCalls"] <= lim("draw_calls_max", cat) else "FAIL", "draw calls", st["drawCalls"], "<= %d" % lim("draw_calls_max", cat))
    tol = lim("tris_tolerance", cat)
    tmin, tmax = lim("tris_min", cat), lim("tris_max", cat)
    ok = tmin * (1 - tol) <= st["triangles"] <= tmax * (1 + tol)
    nt = st["triangles"]
    if nt > tmax:
        gnote = "%.1f%% over the %d budget: inside the %d%% grace" % ((nt / tmax - 1) * 100, tmax, round(tol * 100)) if ok else "over the budget and its grace"
    elif nt < tmin:
        gnote = "%.1f%% under the %d floor: inside the %d%% grace" % ((1 - nt / tmin) * 100, tmin, round(tol * 100)) if ok else "under the floor and its grace"
    else:
        gnote = ""
    add("PASS" if ok else "FAIL", "triangles", nt, "%d..%d (+-%d%%)" % (tmin, tmax, round(tol * 100)), gnote)
    add("PASS" if st["degenerate"] <= lim("zero_area_max", cat) else "FAIL", "zero-area triangles", st["degenerate"], "0")
    add("PASS" if st["nan"] <= lim("nan_max", cat) else "FAIL", "NaN triangles", st["nan"], "0")
    L = st["bbox"]["size"][0]
    ltol = lim("length_tolerance", cat)
    want = (spec or {}).get("len") or dump.get("len")
    if want:
        e = abs(L - want) / want
        add("PASS" if e <= ltol else "FAIL", "length vs len", "%.2f m (%+.2f%%)" % (L, (L - want) / want * 100), "%.2f m +-%.1f%%" % (want, ltol * 100),
            "" if spec and spec.get("len") else "the entry's own len: no spec")
    if spec and dump.get("len") and spec.get("len") and abs(dump["len"] - spec["len"]) > 1e-6:
        add("FAIL", "entry len vs spec len", dump["len"], spec["len"], "UNIT_MODELS[key].len must be the spec's")
    pub = (spec or {}).get("published") or {}
    if pub.get("len"):
        e = abs(L - pub["len"]) / pub["len"]
        add("PASS" if e <= ltol else "FAIL", "length vs published", "%.2f m (%+.2f%%)" % (L, (L - pub["len"]) / pub["len"] * 100), "%.2f m +-%.1f%%" % (pub["len"], ltol * 100))
    wid = pub.get("beam") or pub.get("span") or pub.get("width")
    if wid:
        Wm = st["bbox"]["size"][1]
        add("INFO", "width vs published", "%.2f m (%+.2f%%)" % (Wm, (Wm - wid) / wid * 100), "%.2f m" % wid, "report only: aerials, rotors and stores count in the box")
    if pub.get("height"):
        Hm = st["bbox"]["size"][2]
        add("INFO", "height vs published", "%.2f m (%+.2f%%)" % (Hm, (Hm - pub["height"]) / pub["height"] * 100), "%.2f m" % pub["height"], "report only: needs the same datum (gear, keel)")
    names = {}
    for nd in dump["nodes"]:
        names[nd["name"]] = names.get(nd["name"], 0) + 1
    if spec and spec.get("nodes") is not None:
        miss = [n for n in spec["nodes"] if n not in names]
        add("PASS" if not miss else "FAIL", "required nodes", "%d of %d" % (len(spec["nodes"]) - len(miss), len(spec["nodes"])), "all",
            ("missing: " + ", ".join(miss)) if miss else ", ".join(spec["nodes"]))
    if before:
        bn = {}
        for nd in before["nodes"]:
            bn[nd["name"]] = (bn.get(nd["name"], (0, False))[0] + 1, nd.get("engine", False))
        lost_engine = [n for n, (c, e) in bn.items() if e and n not in names]
        lost_other = [n for n, (c, e) in bn.items() if not e and n not in names]
        fewer = ["%s %d->%d" % (n, c, names[n]) for n, (c, e) in bn.items() if e and n in names and names[n] < c]
        add("PASS" if not lost_engine else "FAIL", "engine nodes kept (vs before)", "%d lost" % len(lost_engine), "0", ", ".join(lost_engine))
        if lost_other or fewer:
            add("WARN", "other nodes (vs before)", "%d lost, %d fewer" % (len(lost_other), len(fewer)), "", ", ".join((lost_other + fewer)[:8]) + " - grep the engine for each before accepting")
    t = time.time()
    sm = surface_measures(dump)
    add("PASS" if sm["textured_share"] >= lim("textured_share_min", cat) else "FAIL", "textured share of opaque area", "%.1f%%" % (sm["textured_share"] * 100),
        ">= %.0f%%" % (lim("textured_share_min", cat) * 100), "opaque %.0f m2, transparent %.0f m2 left out" % (sm["opaque_area_m2"], sm["transparent_area_m2"]))
    lf = sm["largest_flat_untextured"]
    add("PASS" if lf["share"] <= lim("largest_flat_untextured_max", cat) else "FAIL", "largest flat untextured face", "%.1f%%" % (lf["share"] * 100),
        "<= %.0f%%" % (lim("largest_flat_untextured_max", cat) * 100),
        ("%.1f m2 %s facing %s near %s" % (lf["area_m2"], lf.get("color"), lf.get("normal"), lf.get("at"))) if lf["share"] else "")
    bmax = lim("boxiness_max", cat)
    add("INFO" if bmax is None else ("PASS" if sm["boxiness"] <= bmax else "FAIL"), "boxiness (axis-aligned area)", "%.1f%%" % (sm["boxiness"] * 100),
        "not gated" if bmax is None else "<= %.0f%%" % (bmax * 100))
    pmax = lim("plan_fill_max", cat)
    add("INFO" if pmax is None else ("PASS" if sm["plan_fill"] <= pmax else "FAIL"), "plan fill (top silhouette / box)", "%.1f%%" % (sm["plan_fill"] * 100),
        "not gated" if pmax is None else "<= %.0f%%" % (pmax * 100), "" if pmax is None else "a hull with no taper at bow or stern fills its rectangle")
    diag = parts(dump)
    fit = int(((diag <= FITTING_MAX_SIZE * L) & (diag >= FITTING_MIN_SIZE * L)).sum())
    add("PASS" if fit >= lim("fittings_min", cat) else "FAIL", "small separate parts (fittings)", fit, ">= %d" % lim("fittings_min", cat),
        "%d separate parts in all; a fitting is %.2f..%.2f m across" % (len(diag), FITTING_MIN_SIZE * L, FITTING_MAX_SIZE * L))
    times["measure"] = time.time() - t
    # floating parts
    t = time.time()
    Tall, _mi = ML.tri_array(dump)
    free_names = FREE_DEFAULT + list((spec or {}).get("free_parts", []))
    try:
        free = ML.select_names(dump, free_names)
    except ValueError:
        free = None
    gaps = ML.gap_check(Tall, free=free, report=FLOAT_REPORT_M)
    times["gaps"] = time.time() - t
    gmin, gshare = max(lim("float_gap_min_m", cat), lim("float_gap_len_share", cat) * L), lim("float_gap_share", cat)

    def fdesc(f):
        b = f["bbox"]
        nb = f.get("nearest", {}).get("bbox")
        return "%.3f m gap, %.2f m part at x %.2f..%.2f y %.2f..%.2f z %.2f..%.2f%s" % (
            f["gap_m"], f["size_m"], b[0][0], b[1][0], b[0][1], b[1][1], b[0][2], b[1][2],
            (", nearest x %.2f..%.2f z %.2f..%.2f" % (nb[0][0], nb[1][0], nb[0][2], nb[1][2])) if nb else "")
    fl = [f for f in gaps["floating"] if not f["free"]]
    over = [f for f in fl if f["gap_m"] > max(gmin, gshare * f["size_m"])]
    under = [f for f in fl if f not in over]
    add("PASS" if not over else "FAIL", "floating parts", "%d over the limit" % len(over), "gap <= max(%.2f m, %.3f x size)" % (gmin, gshare),
        ("; ".join(fdesc(f) for f in over[:3])) if over else "%d parts, %d touching assemblies; free by name: %s" % (gaps["parts"], gaps["assemblies"], ",".join(free_names)))
    if under:
        add("WARN", "parts standing off (> 5 mm)", "%d" % len(under), "look", "; ".join(fdesc(f) for f in under[:3]) + (" ... (all in gate json)" if len(under) > 3 else ""))
    add("INFO", "hidden geometry", "not measured", "", "a part inside another counts as touching; check the true render")

    # ---- 3. plain paint (advisory)
    src = find_source(key, o["extra"], REPO)
    if src:
        hits = paint_scan(src)
        mat_hits = [m.get("name") for m in dump["materials"] if m.get("name") and marking_material(m["name"])]
        if hits or mat_hits:
            add("WARN", "plain paint (advisory)", "%d hit(s)" % (len(hits) + len(mat_hits)), "0",
                os.path.relpath(src, REPO) + ": " + "; ".join(["line %d %s" % (h[0], h[1]) for h in hits[:4]] + ["material '%s'" % n for n in mat_hits[:3]]) +
                " - canvas text anywhere in the FILE, not only this key's builder")
        else:
            add("PASS", "plain paint (advisory)", "0 hits", "0", os.path.relpath(src, REPO))
    else:
        add("INFO", "plain paint (advisory)", "source not found", "", "no script registers UNIT_MODELS['%s'] by a literal key" % key)

    # ---- 4. outline against the references
    outline = None
    if spec and spec.get("references"):
        t = time.time()
        outline = OL.run(dump_path, spec_path, out)
        times["outline"] = time.time() - t
        for r in outline["references"]:
            lab = "outline #%d %s" % (r["n"], r.get("view"))
            if "skipped" in r:
                add("INFO", lab, "reviewer only", "", r["name"])
                continue
            if "error" in r:
                add("FAIL" if r.get("exact") else "WARN", lab, "ERROR", "", r["error"])
                continue
            w = r["worst"]
            note = "%s; worst: upper %s, lower %s, fatter %s" % (r["name"],
                   *[("%+.2f m @%s %.0f..%.0f" % (w[k]["m"], r["extent_axes"][0], w[k]["from_m"], w[k]["to_m"])) if w[k] else "n/a" for k in ("upper", "lower", "fatter")])
            if r["exact"]:
                add("PASS" if r["iou"] >= lim("outline_iou_min", cat) else "FAIL", lab + " IoU", "%.3f" % r["iou"], ">= %.2f" % lim("outline_iou_min", cat), note)
            else:
                add("INFO", lab + " IoU (advisory)", "%.3f" % r["iou"], "report only", note)
    elif spec is None:
        add("WARN", "spec", "none", "", "no %s: outline, published length and required nodes are not checked" % os.path.relpath(spec_path, REPO))
    else:
        add("WARN", "outline", "no references in the spec", "", "shape is not checked against anything")

    # ---- 4b. the old model's outlines, on its own best fit when asked
    if outline and before and spec:
        t = time.time()
        bpath = os.path.join(out, key + "_before.json")
        Lb = before["stats"]["bbox"]["size"][0]
        bo = OL.run(bpath, spec_path, out, align_override=(lambda ref: 0.05 * Lb) if o["before_align"] else None, tag="before")
        times["outline_before"] = time.time() - t
        for ra, rb in zip(outline["references"], bo["references"]):
            if "iou" not in ra or "iou" not in rb:
                continue
            add("INFO", "outline #%d %s before -> after" % (ra["n"], ra["view"]), "%.3f -> %.3f" % (rb["iou"], ra["iou"]), "report only",
                ("before on its own best fit (slid %+.2f, %+.2f m)" % tuple(rb["shift_m"])) if o["before_align"] else
                "before NOT aligned: an old model with another origin scores low for that alone - use --before-align")

    # ---- 4c. landmarks and the must_show lint
    landmarks = None
    if spec and spec.get("landmarks"):
        t = time.time()
        landmarks = eval_landmarks(dump, spec, spec_path, cat)
        times["landmarks"] = time.time() - t
        for r in landmarks:
            lab = "landmark %s" % r["name"]
            if "error" in r:
                add("FAIL", lab, "ERROR", "", "spec error: " + r["error"])
                continue
            add("PASS" if r["ok"] else "FAIL", lab, "%.3f m" % r["error_m"], "<= %.2f m" % r["tol_m"],
                "%s %s: ref %s, model %s (ref #%s)" % (r["view"] or "xyz", r["checked"], r["expect"], r["model"], r["ref"]))
    elif spec:
        add("WARN", "landmarks", "none", "", "the spec has no landmarks: nothing checks where features sit inside the outline")
    if spec and spec.get("must_show"):
        bad = must_show_lint(spec)
        add("WARN" if bad else "PASS", "must_show items with a position", "%d of %d" % (len(spec["must_show"]) - len(bad), len(spec["must_show"])), "all",
            ("no station or position in: " + " | ".join(b[:50] for b in bad[:4])) if bad else "")

    # ---- 5. the true render, and detail against the before
    render = None
    if o["render"]:
        png = os.path.join(out, "render_%s.png" % key)
        cmd = ["node", os.path.join(HERE, "render.js"), key, team, png]
        for f in o["extra"]:
            cmd += ["--extra", f]
        if before:
            cmd += ["--before", o["before"]]
        rc, rtxt, times["render"] = run(cmd)
        if rc != 0:
            add("FAIL", "true render", "render.js failed", "", rtxt.strip().split("\n")[-1][:160])
        else:
            render = json.load(open(png[:-4] + ".json"))
            side = render.get("after", render)
            g = side["views"].get("game", {})
            p = side["views"].get("play", {})
            add("INFO", "game-view detail", "sobel %.2f, regions %d" % (g.get("sobel_mean", 0), g.get("regions", 0)), "",
                "as played (%s px long): sobel %.2f, regions %d" % (round(p.get("len_px", 0)), p.get("sobel_mean", 0), p.get("regions", 0)))
            if side["draw_calls"] != st["drawCalls"] or side["triangles"] != st["triangles"] + st["degenerate"]:
                add("INFO", "renderer.info vs dump", "%d tris, %d calls" % (side["triangles"], side["draw_calls"]), "%d, %d" % (st["triangles"], st["drawCalls"]),
                    "the GPU count includes zero-area triangles and anything the dump skips")
            errs = side.get("page_errors", []) + side.get("console_errors", [])
            if errs:
                add("INFO", "browser errors while loading", len(errs), "", errs[0][:120])
            if "ratio" in render and render["ratio"].get("game"):
                k = render["ratio"]["game"]["sobel"]
                kp = (render["ratio"].get("play") or {}).get("sobel")
                note = "regions x%s; as played: sobel x%s, regions x%s" % (render["ratio"]["game"]["regions"], kp, (render["ratio"].get("play") or {}).get("regions"))
                if k is None:
                    add("WARN", "game-view detail vs before", "n/a", "", "the before has no detail to compare")
                elif k < lim("detail_ratio_min", cat):
                    add("FAIL", "game-view detail vs before", "x%.2f" % k, ">= x%.2f" % lim("detail_ratio_min", cat), note)
                elif k < lim("detail_ratio_want", cat):
                    add("WARN", "game-view detail vs before", "x%.2f" % k, "should reach x%.2f" % lim("detail_ratio_want", cat), note + " - it did not fall, but it barely rose")
                else:
                    add("PASS", "game-view detail vs before", "x%.2f" % k, ">= x%.2f" % lim("detail_ratio_min", cat), note)
            if before:
                bs = before["stats"]
                add("INFO", "before -> after", "%d -> %d tris, %d -> %d draw calls" % (bs["triangles"], st["triangles"], bs["drawCalls"], st["drawCalls"]))

    # ---- report
    nf = sum(1 for r in rows if r[0] == "FAIL")
    nw = sum(1 for r in rows if r[0] == "WARN")
    npass = sum(1 for r in rows if r[0] == "PASS")
    w1 = max(len(r[1]) for r in rows)
    w2 = max(len(r[2]) for r in rows)
    w3 = max(len(r[3]) for r in rows)
    print("gate %s  (%s, team %s%s)" % (key, cat, team, ", spec " + os.path.relpath(spec_path, REPO) if spec else ", NO SPEC"))
    for s, rule, m, l, note in rows:
        print("  %-4s  %-*s  %-*s  %-*s  %s" % (s, w1, rule, w2, m, w3, l, note))
    verdict = "FAIL" if nf else "PASS"
    files = {"dump": dump_path, "gate": os.path.join(out, "gate_%s.json" % key)}
    if render:
        files["render"] = render["png"]
    if outline:
        files["overlays"] = [r["overlay"] for r in outline["references"] if "overlay" in r]
    total = time.time() - T0
    print("  files: " + "  ".join([files["gate"]] + ([files["render"]] if render else []) + files.get("overlays", [])))
    print("gate %s: %s - %d pass, %d fail, %d warn; %d tris, %d draw calls, %.2f m; %s" % (
        key, verdict, npass, nf, nw, st["triangles"], st["drawCalls"], L,
        ", ".join("%s %.1fs" % (k, v) for k, v in times.items()) + ", total %.1fs" % total))
    json.dump({"key": key, "category": cat, "team": team, "spec": spec_path if spec else None, "before": o["before"], "extra": o["extra"],
               "verdict": verdict, "counts": {"pass": npass, "fail": nf, "warn": nw},
               "rules": [{"status": r[0], "rule": r[1], "measured": r[2], "limit": r[3], "note": r[4]} for r in rows],
               "limits": {k: lim(k, cat) for k in LIMITS}, "surface": sm, "fittings": fit, "parts": int(len(diag)),
               "stats": {k: st[k] for k in ("triangles", "drawCalls", "meshes", "materials", "textures", "degenerate", "nan", "bbox")},
               "outline": outline, "landmarks": landmarks, "gaps": gaps, "render": render, "files": files, "seconds": dict(times, total=round(total, 2))},
              open(files["gate"], "w"), indent=1)
    return 1 if nf else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
