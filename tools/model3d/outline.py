#!/usr/bin/env python3
"""Shape against a reference: the model's silhouette laid over a drawing or photo.

usage:
  python3 tools/model3d/outline.py DUMP.json SPEC.json [--out DIR] [--only N]

DUMP.json is a tools/model3d/dump.js dump; SPEC.json is a spec
(tools/model3d/specs/README.md) and every entry of its "references" list is
compared. For each one this writes  DIR/outline_<key>_<n>_<view>.png  (the
overlay) and prints the numbers; DIR/outline_<key>.json holds them all.

What it does, per reference: brings the picture to the view's standard
orientation (crop -> rotate -> flip), takes the reference silhouette from it
(or from a hand-traced polygon in metres), rasterises the model's silhouette
in the same view AT THE SAME SCALE AND ORIGIN - nothing is fitted unless the
reference allows a small "align_m" slide - and reports

  iou            intersection over union of the two silhouettes
  extent         the reference's and the model's extent on both axes, metres
  stations       20 bins along the view's horizontal axis; in each, how far
                 the model's upper edge and lower edge stand from the
                 reference's (metres, + = model higher) and how much
                 fatter (+) or thinner (-) the model is there
  worst          the bins where each of those is largest

A tower 3 m low shows as upper = -3.0 at its station; a box hull as "fatter"
at the bow and stern bins.

Views (model space +X nose, +Y left, +Z up):
  side   horizontal +X (nose right), vertical +Z      - seen from starboard
  top    horizontal +X (nose right), vertical +Y      - port side up
  front  horizontal +Y, vertical +Z                   - seen from dead ahead
"""
import json, math, os, sys, time
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

BINS = 20
AXES = {"side": (0, 2), "top": (0, 1), "front": (1, 2)}
AXN = {"side": ("x", "z"), "top": ("x", "y"), "front": ("y", "z")}


def font(size):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", "/System/Library/Fonts/Menlo.ttc"):
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()


def prepare_image(ref, base):
    """-> (RGB(A) image in standard orientation, f(px point in ORIGINAL image) -> point in it)."""
    path = ref["image"]
    if not os.path.isabs(path):
        path = os.path.join(base, path)
    img = Image.open(path)
    img = img.convert("RGBA") if (img.mode in ("RGBA", "LA", "P") and ref.get("mask", "dark") in ("alpha",)) or img.mode in ("RGBA", "LA") else img.convert("RGB")
    steps = []
    crop = ref.get("crop")
    if crop:
        x0, y0, x1, y1 = [int(v) for v in crop]
        img = img.crop((x0, y0, x1, y1))
        steps.append(lambda p, x0=x0, y0=y0: (p[0] - x0, p[1] - y0))
    rot = int(ref.get("rotate", 0)) % 360
    if rot not in (0, 90, 180, 270):
        raise ValueError("rotate must be 0, 90, 180 or 270 (clockwise)")
    w, h = img.size
    if rot == 90:
        img = img.transpose(Image.ROTATE_270)
        steps.append(lambda p, h=h: (h - 1 - p[1], p[0]))
    elif rot == 180:
        img = img.transpose(Image.ROTATE_180)
        steps.append(lambda p, w=w, h=h: (w - 1 - p[0], h - 1 - p[1]))
    elif rot == 270:
        img = img.transpose(Image.ROTATE_90)
        steps.append(lambda p, w=w: (p[1], w - 1 - p[0]))
    if ref.get("flip"):
        w2 = img.size[0]
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
        steps.append(lambda p, w2=w2: (w2 - 1 - p[0], p[1]))

    def tf(p):
        for s in steps:
            p = s(p)
        return p
    return img, tf


def fill_holes(mask):
    """mask: bool array. Everything not reachable from the border through False becomes True."""
    h, w = mask.shape
    im = Image.new("L", (w + 2, h + 2), 0)
    im.paste(Image.fromarray((mask * 255).astype(np.uint8)), (1, 1))
    ImageDraw.floodfill(im, (0, 0), 128)
    return np.asarray(im)[1:-1, 1:-1] != 128


def reference_mask(ref, img):
    """bool array, True where the reference shows the subject."""
    mode = ref.get("mask", "dark")
    opts = ref.get("mask_opts", {})
    rgb = np.asarray(img.convert("RGB")).astype(np.float32)
    lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    if mode == "dark":
        m = lum < opts.get("threshold", 128)
    elif mode == "light":
        m = lum > opts.get("threshold", 128)
    elif mode == "alpha":
        if img.mode != "RGBA":
            raise ValueError("mask 'alpha' needs an image with an alpha channel")
        m = np.asarray(img)[:, :, 3] > opts.get("threshold", 128)
    elif mode == "bg":
        # the backdrop of each ROW is the median of that row's ends: a sky that grades from top to bottom
        k = int(opts.get("edge_px", 12))
        ends = np.concatenate([rgb[:, :k, :], rgb[:, -k:, :]], axis=1)
        bg = np.median(ends, axis=1)[:, None, :]
        m = np.abs(rgb - bg).max(axis=2) > opts.get("tolerance", 28)
    else:
        raise ValueError("unknown mask mode " + str(mode))
    close = int(opts.get("close_px", 0))
    if close > 0:      # bridge gaps in a line drawing before filling it
        im = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(2 * close + 1)).filter(ImageFilter.MinFilter(2 * close + 1))
        m = np.asarray(im) > 127
    if opts.get("fill", True):
        m = fill_holes(m)
    op = int(opts.get("open_px", 1 if mode == "bg" else 0))
    if op > 0:         # drop specks: whitecaps, JPEG noise
        im = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(2 * op + 1)).filter(ImageFilter.MaxFilter(2 * op + 1))
        m = np.asarray(im) > 127
    return m


def edges_of(mask):
    im = Image.fromarray((mask * 255).astype(np.uint8))
    return np.asarray(ImageChops.difference(im, im.filter(ImageFilter.MinFilter(3)))) > 127


def compare_one(dump, ref, base, key, idx, out_dir):
    view = ref["view"]
    if view not in AXES:
        raise ValueError("reference view must be side, top or front (got %r)" % view)
    s = float(ref["px_per_m"])
    ah, av = AXES[view]
    tris = dump["tris"]
    mats = dump["materials"]
    T = np.array([t[:9] for t in tris], dtype=np.float64).reshape(-1, 3, 3)
    mi = np.array([t[9] for t in tris], dtype=np.int32)
    solid = np.array([(m.get("opacity", 1) or 0) >= 0.5 and m.get("visible", True) for m in mats])[mi]
    T = T[solid]
    H2 = T[:, :, ah]
    V2 = T[:, :, av]

    poly_m = ref.get("outline_m")
    img = None
    if ref.get("image"):
        img, tf = prepare_image(ref, base)
        if "anchor_px" in ref:
            apx = tf(tuple(ref["anchor_px"]))
            am = ref.get("anchor_m", [0, 0])
        else:
            apx = tf(tuple(ref["origin_px"]))
            am = [0, 0]
        ox = apx[0] - am[0] * s
        oy = apx[1] + am[1] * s
        iw, ih = img.size
    elif poly_m:
        polys = poly_m if isinstance(poly_m[0][0], (list, tuple)) else [poly_m]
        hs = [p[0] for q in polys for p in q]
        vs = [p[1] for q in polys for p in q]
        ox, oy = -min(hs) * s, max(vs) * s
        iw, ih = int(math.ceil((max(hs) - min(hs)) * s)) + 1, int(math.ceil((max(vs) - min(vs)) * s)) + 1
    else:
        raise ValueError("a reference needs an image or an outline_m polygon")

    # one canvas holding both the picture and the whole model
    mh0, mh1, mv0, mv1 = H2.min(), H2.max(), V2.min(), V2.max()
    pad = 12
    cx0 = int(math.floor(min(0, ox + mh0 * s))) - pad
    cy0 = int(math.floor(min(0, oy - mv1 * s))) - pad
    cx1 = int(math.ceil(max(iw, ox + mh1 * s))) + pad
    cy1 = int(math.ceil(max(ih, oy - mv0 * s))) + pad
    W, Hh = cx1 - cx0, cy1 - cy0
    if W * Hh > 60e6:
        raise ValueError("canvas %dx%d too large: check px_per_m and the origin" % (W, Hh))
    ox_c, oy_c = ox - cx0, oy - cy0

    refm = np.zeros((Hh, W), dtype=bool)
    if poly_m:
        polys = poly_m if isinstance(poly_m[0][0], (list, tuple)) else [poly_m]
        im = Image.new("L", (W, Hh), 0)
        d = ImageDraw.Draw(im)
        for q in polys:
            d.polygon([(ox_c + p[0] * s, oy_c - p[1] * s) for p in q], fill=255)
        refm = np.asarray(im) > 127
    else:
        refm[-cy0:-cy0 + ih, -cx0:-cx0 + iw] = reference_mask(ref, img)

    im = Image.new("L", (W, Hh), 0)
    d = ImageDraw.Draw(im)
    PX = ox_c + H2 * s
    PY = oy_c - V2 * s
    for i in range(len(T)):
        d.polygon([(PX[i, 0], PY[i, 0]), (PX[i, 1], PY[i, 1]), (PX[i, 2], PY[i, 2])], fill=255, outline=255)
    modm = np.asarray(im) > 127

    # the window: only this part of the view is compared (metres)
    win = np.ones((Hh, W), dtype=bool)
    wm = ref.get("window_m")
    if wm:
        h0, v0, h1, v1 = wm
        xa, xb = sorted((ox_c + h0 * s, ox_c + h1 * s))
        ya, yb = sorted((oy_c - v0 * s, oy_c - v1 * s))
        win[:] = False
        win[max(0, int(round(ya))):max(0, int(round(yb))), max(0, int(round(xa))):max(0, int(round(xb)))] = True
    # ignore_m: boxes left out of the comparison (stores the drawing does not carry, a flag, a wake)
    for h0, v0, h1, v1 in ref.get("ignore_m", []):
        xa, xb = sorted((ox_c + h0 * s, ox_c + h1 * s))
        ya, yb = sorted((oy_c - v0 * s, oy_c - v1 * s))
        win[max(0, int(round(ya))):max(0, int(round(yb))), max(0, int(round(xa))):max(0, int(round(xb)))] = False
    refm &= win
    modm &= win

    def iou(a, b):
        u = np.logical_or(a, b).sum()
        return float(np.logical_and(a, b).sum()) / u if u else 0.0

    shift = (0, 0)
    amax = float(ref.get("align_m", 0))
    if amax > 0:
        n = int(amax * s)
        best = (iou(refm, modm), 0, 0)
        step = max(1, n // 6)
        cx = cy = 0
        while True:
            for dy in range(cy - step * 6, cy + step * 6 + 1, step):
                for dx in range(cx - step * 6, cx + step * 6 + 1, step):
                    if abs(dx) > n or abs(dy) > n:
                        continue
                    v = iou(refm, np.roll(np.roll(modm, dy, axis=0), dx, axis=1))
                    if v > best[0] + 1e-9:
                        best = (v, dx, dy)
            cx, cy = best[1], best[2]
            if step == 1:
                break
            step = max(1, step // 3)
        shift = (best[1], best[2])
        modm = np.roll(np.roll(modm, shift[1], axis=0), shift[0], axis=1) & win

    val = iou(refm, modm)

    def extent(m):
        ys, xs = np.nonzero(m)
        if not len(xs):
            return None
        return [round(float(v), 2) for v in ((xs.min() - ox_c) / s, (xs.max() + 1 - ox_c) / s, (oy_c - ys.max() - 1) / s, (oy_c - ys.min()) / s)]
    er, em = extent(refm), extent(modm)

    # stations along the horizontal axis
    both = np.logical_or(refm, modm)
    cols = np.nonzero(both.any(axis=0))[0]
    stations = []
    if len(cols):
        c0, c1 = cols.min(), cols.max() + 1

        def top(m):   # first True row per column, nan where none
            t = np.argmax(m, axis=0).astype(np.float64)
            t[~m.any(axis=0)] = np.nan
            return t

        def bot(m):
            b = (m.shape[0] - 1 - np.argmax(m[::-1], axis=0)).astype(np.float64)
            b[~m.any(axis=0)] = np.nan
            return b
        rt, rb, mt, mb = top(refm), bot(refm), top(modm), bot(modm)
        rf, mf = refm.sum(axis=0) / s, modm.sum(axis=0) / s
        import warnings
        for b in range(BINS):
            a0 = c0 + (c1 - c0) * b // BINS
            a1 = max(a0 + 1, c0 + (c1 - c0) * (b + 1) // BINS)
            sl = slice(a0, a1)
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                up = np.nanmean((rt[sl] - mt[sl])) / s       # + = model's upper edge is higher
                lo = np.nanmean((rb[sl] - mb[sl])) / s       # + = model's lower edge is higher
            st = {"bin": b, "from_m": round(float(a0 - ox_c) / s, 2), "to_m": round(float(a1 - ox_c) / s, 2),
                  "upper_m": None if np.isnan(up) else round(float(up), 2),
                  "lower_m": None if np.isnan(lo) else round(float(lo), 2),
                  "fatter_m": round(float(np.mean(mf[sl] - rf[sl])), 2),
                  "ref_thick_m": round(float(np.mean(rf[sl])), 2), "model_thick_m": round(float(np.mean(mf[sl])), 2)}
            stations.append(st)

    def worst(k):
        c = [x for x in stations if x[k] is not None]
        if not c:
            return None
        w = max(c, key=lambda x: abs(x[k]))
        return {"bin": w["bin"], "from_m": w["from_m"], "to_m": w["to_m"], "m": w[k]}
    res = {"n": idx, "name": ref.get("name") or os.path.basename(ref.get("image", "outline_m")), "view": view,
           "exact": bool(ref.get("exact", True)), "px_per_m": s, "iou": round(val, 4),
           "shift_m": [round(shift[0] / s, 3), round(-shift[1] / s, 3)],
           "extent_axes": list(AXN[view]),
           "ref_extent_m": er, "model_extent_m": em,
           "ref_area_m2": round(float(refm.sum()) / s / s, 2), "model_area_m2": round(float(modm.sum()) / s / s, 2),
           "worst": {"upper": worst("upper_m"), "lower": worst("lower_m"), "fatter": worst("fatter_m")},
           "stations": stations}

    # ---- the overlay
    k = max(1, min(4, int(round(1500 / W)))) if W < 1500 else 1
    if img is not None:
        bgim = Image.new("RGB", (W, Hh), (255, 255, 255))
        bgim.paste(img.convert("RGB"), (-cx0, -cy0))
        bg = np.asarray(bgim.convert("L").convert("RGB")).astype(np.float32) * 0.45 + 255 * 0.55
    else:
        bg = np.full((Hh, W, 3), 245, dtype=np.float32)
    ov = bg.copy()

    def tint(mask, col, a):
        ov[mask] = ov[mask] * (1 - a) + np.array(col, dtype=np.float32) * a
    tint(np.logical_and(refm, modm), (120, 190, 120), 0.35)       # agree
    tint(np.logical_and(refm, ~modm), (40, 90, 235), 0.60)        # reference only: model is missing / thinner here
    tint(np.logical_and(modm, ~refm), (235, 50, 40), 0.60)        # model only: model is fatter / extra here
    tint(~win, (120, 120, 120), 0.35)
    o = Image.fromarray(ov.clip(0, 255).astype(np.uint8))
    if k > 1:
        o = o.resize((W * k, Hh * k), Image.NEAREST)

    def big(m):
        e = Image.fromarray((edges_of(m) * 255).astype(np.uint8))
        if k > 1:
            e = e.resize((W * k, Hh * k), Image.NEAREST)
        return e
    o.paste((10, 40, 170), mask=big(refm))
    o.paste((180, 10, 10), mask=big(modm))
    HEAD = 78
    sheet = Image.new("RGB", (max(o.size[0], 900), o.size[1] + HEAD + 44), (27, 31, 35))
    sheet.paste(o, (0, HEAD))
    d = ImageDraw.Draw(sheet)
    f1, f2 = font(18), font(13)
    d.text((8, 6), "%s  %s view vs %s" % (key, view.upper(), res["name"]), fill=(242, 244, 245), font=f1)
    d.text((8, 30), "IoU %.3f   %s   %.2f px/m   slid %.2f, %.2f m   ref %s  model %s (m: %s0 %s1 %s0 %s1)" % (
        val, "EXACT (gated)" if res["exact"] else "ADVISORY (perspective / stylised: not gated)", s, res["shift_m"][0], res["shift_m"][1],
        er, em, AXN[view][0], AXN[view][0], AXN[view][1], AXN[view][1]), fill=(196, 204, 210), font=f2)
    wr = res["worst"]

    def wtxt(n, lab):
        w = wr[n]
        return "%s %+.2f m at %s %.1f..%.1f" % (lab, w["m"], AXN[view][0], w["from_m"], w["to_m"]) if w else lab + " n/a"
    d.text((8, 50), "worst:  " + wtxt("upper", "upper edge") + "   |   " + wtxt("lower", "lower edge") + "   |   " + wtxt("fatter", "fatter(+)/thinner(-)"),
           fill=(255, 190, 110), font=f2)
    # station ticks
    for st in stations:
        x = (ox_c + st["from_m"] * s) * k
        d.line([(x, HEAD + o.size[1]), (x, HEAD + o.size[1] + 6)], fill=(170, 180, 187))
        if st["bin"] % 2 == 0:
            d.text((x + 2, HEAD + o.size[1] + 6), "%d" % st["bin"], fill=(170, 180, 187), font=f2)
    y = HEAD + o.size[1] + 24
    x = 8
    for col, lab in (((10, 40, 170), "reference outline"), ((180, 10, 10), "model outline"), ((95, 125, 240), "reference only (model missing/thinner)"),
                     ((240, 100, 90), "model only (model fatter/extra)"), ((150, 150, 150), "outside the compared window")):
        d.rectangle([x, y + 2, x + 12, y + 14], fill=col)
        d.text((x + 18, y), lab, fill=(196, 204, 210), font=f2)
        x += 30 + int(d.textlength(lab, font=f2))
    png = os.path.join(out_dir, "outline_%s_%d_%s.png" % (key, idx, view))
    sheet.save(png)
    res["overlay"] = os.path.abspath(png)
    return res


def run(dump_path, spec_path, out_dir, only=None):
    dump = json.load(open(dump_path))
    spec = json.load(open(spec_path))
    base = os.path.dirname(os.path.abspath(spec_path))
    key = spec.get("key") or dump.get("key")
    os.makedirs(out_dir, exist_ok=True)
    out = []
    for i, ref in enumerate(spec.get("references", [])):
        if only is not None and i != only:
            continue
        if ref.get("view") not in AXES:      # a three-quarter photograph: for the reviewer, not for this tool
            out.append({"n": i, "name": ref.get("name") or ref.get("image"), "view": ref.get("view"), "skipped": "not an orthographic view"})
            continue
        try:
            out.append(compare_one(dump, ref, base, key, i, out_dir))
        except Exception as e:  # a missing picture must not hide the other references
            out.append({"n": i, "name": ref.get("name") or ref.get("image"), "view": ref.get("view"), "error": "%s: %s" % (type(e).__name__, e),
                        "exact": bool(ref.get("exact", True))})
    res = {"key": key, "dump": os.path.abspath(dump_path), "spec": os.path.abspath(spec_path), "references": out}
    json.dump(res, open(os.path.join(out_dir, "outline_%s.json" % key), "w"), indent=1)
    return res


def main(argv):
    if len(argv) < 2 or "-h" in argv or "--help" in argv:
        print(__doc__)
        return 2
    out_dir, only, pos = ".", None, []
    i = 0
    while i < len(argv):
        if argv[i] == "--out":
            out_dir = argv[i + 1]; i += 2
        elif argv[i] == "--only":
            only = int(argv[i + 1]); i += 2
        else:
            pos.append(argv[i]); i += 1
    t0 = time.time()
    res = run(pos[0], pos[1], out_dir, only)
    for r in res["references"]:
        if "error" in r:
            print("[outline] #%d %s: ERROR %s" % (r["n"], r["name"], r["error"]))
            continue
        if "skipped" in r:
            print("[outline] #%d %s: skipped (%s)" % (r["n"], r["name"], r["skipped"]))
            continue
        w = r["worst"]
        print("[outline] #%d %s %s (%s): IoU %.3f; ref extent %s, model %s" % (r["n"], r["view"], r["name"], "exact" if r["exact"] else "advisory",
              r["iou"], r["ref_extent_m"], r["model_extent_m"]))
        for n, lab in (("upper", "upper edge"), ("lower", "lower edge"), ("fatter", "fatter/thinner")):
            if w[n]:
                print("[outline]      worst %-14s %+6.2f m at station %d (%s %.1f..%.1f m)" % (lab, w[n]["m"], w[n]["bin"], r["extent_axes"][0], w[n]["from_m"], w[n]["to_m"]))
        print("[outline]      -> " + r["overlay"])
    print("[outline] %d reference(s), %.1f s" % (len(res["references"]), time.time() - t0))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
