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

Per reference, besides crop / rotate (any angle, clockwise) / flip:
  hide        ["gear", ...] node names whose meshes are left out first (the
              dump's "meshes" table says which triangles are whose)
  pitch_deg   turn the model this many degrees NOSE UP about the Y axis through
              pitch_about_m [x, z] (default the origin) before rasterising: a
              model stood on its wheels against a drawing in the datum takes
              the negative of its sit angle
A picture with transparency is laid on white (an RGBA line drawing used to
read as solid black). An outline_m polygon needs no px_per_m.

The overlay is the picture in colour at full resolution (enlarged to at least
1800 px), the fills tinted over it, both outlines, and a metre ruler on both
axes (the station bins are the short marks under it). For the whole render
laid over the picture use overlay.py.

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


def load_picture(ref, base):
    """The reference picture. A picture with transparency is laid on WHITE (a transparent PNG
    reads as black otherwise); with mask "alpha" the alpha channel is kept."""
    path = ref["image"]
    if not os.path.isabs(path):
        path = os.path.join(base, path)
    img = Image.open(path)
    has_alpha = img.mode in ("RGBA", "LA", "PA") or (img.mode == "P" and "transparency" in img.info)
    if has_alpha:
        img = img.convert("RGBA")
        if ref.get("mask", "dark") == "alpha":
            return img
        white = Image.new("RGBA", img.size, (255, 255, 255, 255))
        return Image.alpha_composite(white, img).convert("RGB")
    return img.convert("RGB")


def prepare_image(ref, base):
    """-> (RGB(A) image in standard orientation, f(px point in ORIGINAL image) -> point in it)."""
    img = load_picture(ref, base)
    steps = []
    crop = ref.get("crop")
    if crop:
        x0, y0, x1, y1 = [int(v) for v in crop]
        img = img.crop((x0, y0, x1, y1))
        steps.append(lambda p, x0=x0, y0=y0: (p[0] - x0, p[1] - y0))
    rot = float(ref.get("rotate", 0)) % 360
    w, h = img.size
    if rot not in (0, 90, 180, 270):
        # any other angle, clockwise, about the picture's centre; the canvas grows to hold it
        t = math.radians(rot)
        fill = (255, 255, 255, 0) if img.mode == "RGBA" else (255, 255, 255)
        img = img.rotate(-rot, expand=True, resample=Image.BICUBIC, fillcolor=fill)
        W2, H2 = img.size
        c, sn = math.cos(t), math.sin(t)
        steps.append(lambda p, w=w, h=h, W2=W2, H2=H2, c=c, sn=sn: (
            W2 / 2 + (p[0] + 0.5 - w / 2) * c - (p[1] + 0.5 - h / 2) * sn - 0.5,
            H2 / 2 + (p[0] + 0.5 - w / 2) * sn + (p[1] + 0.5 - h / 2) * c - 0.5))
    elif rot == 90:
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


def ref_frame(ref, base):
    """Where a reference puts the model: -> dict(img, tf, s (px per m), ox, oy (pixel of view (0, 0) in the
    prepared picture), iw, ih, poly (outline_m polygons or None)). to_m(px in ORIGINAL picture) and to_px(m)
    convert between the picture and view metres."""
    poly_m = ref.get("outline_m")
    polys = None
    if poly_m:
        polys = poly_m if isinstance(poly_m[0][0], (list, tuple)) else [poly_m]
    img, tf = None, (lambda p: p)
    if ref.get("image"):
        if "px_per_m" not in ref:
            raise ValueError("a reference picture needs px_per_m")
        s = float(ref["px_per_m"])
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
    elif polys:
        hs = [p[0] for q in polys for p in q]
        vs = [p[1] for q in polys for p in q]
        # a traced outline needs no scale of its own: it is rasterised at about 1500 px across
        s = float(ref.get("px_per_m") or 1500.0 / max(1e-6, max(max(hs) - min(hs), max(vs) - min(vs))))
        ox, oy = -min(hs) * s, max(vs) * s
        iw, ih = int(math.ceil((max(hs) - min(hs)) * s)) + 1, int(math.ceil((max(vs) - min(vs)) * s)) + 1
    else:
        raise ValueError("a reference needs an image or an outline_m polygon")
    fr = {"img": img, "tf": tf, "s": s, "ox": ox, "oy": oy, "iw": iw, "ih": ih, "poly": polys}
    fr["to_m"] = lambda p: ((tf(tuple(p))[0] - ox) / s, (oy - tf(tuple(p))[1]) / s)
    fr["to_px"] = lambda m: (ox + m[0] * s, oy - m[1] * s)
    return fr


def model_tris(dump, ref):
    """The model as the reference sees it: solid triangles, minus the groups in ref "hide", turned nose up
    by ref "pitch_deg" about ref "pitch_about_m" ([x, z], default the origin)."""
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import m3dlib
    T, mi = m3dlib.tri_array(dump)
    mats = dump["materials"]
    keep = np.array([(m.get("opacity", 1) or 0) >= 0.5 and m.get("visible", True) for m in mats])[mi] if len(mi) else np.zeros(0, bool)
    if ref.get("hide"):
        keep &= ~m3dlib.select_names(dump, ref["hide"])
    T = T[keep]
    if ref.get("pitch_deg"):
        T = m3dlib.pitch_tris(T, float(ref["pitch_deg"]), tuple(ref.get("pitch_about_m", (0.0, 0.0))))
    return T


def compare_one(dump, ref, base, key, idx, out_dir, align_override=None, tag=""):
    view = ref["view"]
    if view not in AXES:
        raise ValueError("reference view must be side, top or front (got %r)" % view)
    ah, av = AXES[view]
    T = model_tris(dump, ref)
    if not len(T):
        raise ValueError("no model triangles left (hide?)")
    H2 = T[:, :, ah]
    V2 = T[:, :, av]
    fr = ref_frame(ref, base)
    img, s, ox, oy, iw, ih, poly_m = fr["img"], fr["s"], fr["ox"], fr["oy"], fr["iw"], fr["ih"], fr["poly"]

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
        im = Image.new("L", (W, Hh), 0)
        d = ImageDraw.Draw(im)
        for q in poly_m:
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
    modm_all = modm
    modm = modm & win

    def iou(a, b):
        u = np.logical_or(a, b).sum()
        return float(np.logical_and(a, b).sum()) / u if u else 0.0

    shift = (0, 0)
    amax = float(ref.get("align_m", 0) if align_override is None else align_override)
    if amax > 0:
        n = int(amax * s)
        bx = by = 0
        src = modm
        if align_override is not None:
            # the old model on its OWN best fit: start from the shift that lays the two silhouettes'
            # centroids on each other (an old origin can be metres off), search +-amax round it, and
            # slide the whole silhouette, not only what the window kept
            src = modm_all
            ry, rx = np.nonzero(refm)
            my, mx = np.nonzero(src & win) if (src & win).any() else np.nonzero(src)
            if len(rx) and len(mx):
                bx, by = int(round(rx.mean() - mx.mean())), int(round(ry.mean() - my.mean()))
        best = (iou(refm, np.roll(np.roll(src, by, axis=0), bx, axis=1) & win), bx, by)
        step = max(1, n // 6)
        cx, cy = bx, by
        while True:
            for dy in range(cy - step * 6, cy + step * 6 + 1, step):
                for dx in range(cx - step * 6, cx + step * 6 + 1, step):
                    if abs(dx - bx) > n or abs(dy - by) > n:
                        continue
                    v = iou(refm, np.roll(np.roll(src, dy, axis=0), dx, axis=1) & win if src is not modm else np.roll(np.roll(modm, dy, axis=0), dx, axis=1))
                    if v > best[0] + 1e-9:
                        best = (v, dx, dy)
            cx, cy = best[1], best[2]
            if step == 1:
                break
            step = max(1, step // 3)
        shift = (best[1], best[2])
        modm = np.roll(np.roll(src, shift[1], axis=0), shift[0], axis=1) & win

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
           "exact": bool(ref.get("exact", True)), "px_per_m": round(s, 4), "iou": round(val, 4), "align_m": amax,
           "hide": ref.get("hide") or [], "pitch_deg": ref.get("pitch_deg") or 0,
           "shift_m": [round(shift[0] / s, 3), round(-shift[1] / s, 3)],
           "extent_axes": list(AXN[view]),
           "ref_extent_m": er, "model_extent_m": em,
           "ref_area_m2": round(float(refm.sum()) / s / s, 2), "model_area_m2": round(float(modm.sum()) / s / s, 2),
           "worst": {"upper": worst("upper_m"), "lower": worst("lower_m"), "fatter": worst("fatter_m")},
           "stations": stations}

    # ---- the overlay: the picture in colour at full resolution (small pictures enlarged), the fills
    # tinted over it, both outlines, and a metre ruler on both axes
    k = max(1, min(4, int(math.ceil(1800.0 / W)))) if W < 1800 else 1
    if img is not None:
        bgim = Image.new("RGB", (W, Hh), (255, 255, 255))
        bgim.paste(img.convert("RGB"), (-cx0, -cy0))
        bg = np.asarray(bgim).astype(np.float32) * 0.80 + 255 * 0.20
    else:
        bg = np.full((Hh, W, 3), 245, dtype=np.float32)
    ov = bg.copy()

    def tint(mask, col, a):
        ov[mask] = ov[mask] * (1 - a) + np.array(col, dtype=np.float32) * a
    tint(np.logical_and(refm, ~modm), (40, 90, 235), 0.45)        # reference only: model is missing / thinner here
    tint(np.logical_and(modm, ~refm), (235, 50, 40), 0.45)        # model only: model is fatter / extra here
    tint(~win, (120, 120, 120), 0.30)
    o = Image.fromarray(ov.clip(0, 255).astype(np.uint8))
    if k > 1:
        o = o.resize((W * k, Hh * k), Image.BICUBIC if img is not None else Image.NEAREST)

    def big(m):
        if k > 1:
            m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).resize((W * k, Hh * k), Image.BILINEAR)) > 127
        return Image.fromarray((edges_of(m) * 255).astype(np.uint8))
    o.paste((10, 40, 200), mask=big(refm))
    o.paste((200, 10, 10), mask=big(modm))
    HEAD, RUL = 78, 46
    sheet = Image.new("RGB", (max(o.size[0] + RUL, 900), o.size[1] + HEAD + 70), (27, 31, 35))
    sheet.paste(o, (RUL, HEAD))
    d = ImageDraw.Draw(sheet)
    f1, f2 = font(18), font(13)
    d.text((8, 6), "%s  %s view vs %s%s" % (key, view.upper(), res["name"], tag), fill=(242, 244, 245), font=f1)
    extra = ("   hidden: %s" % ",".join(res["hide"]) if res["hide"] else "") + ("   pitched %+.2f deg" % res["pitch_deg"] if res["pitch_deg"] else "")
    d.text((8, 30), "IoU %.3f   %s   %.2f px/m (x%d here)   slid %.2f, %.2f m   ref %s  model %s (m: %s0 %s1 %s0 %s1)%s" % (
        val, "EXACT (gated)" if res["exact"] else "ADVISORY (not gated)", s, k, res["shift_m"][0], res["shift_m"][1],
        er, em, AXN[view][0], AXN[view][0], AXN[view][1], AXN[view][1], extra), fill=(196, 204, 210), font=f2)
    wr = res["worst"]

    def wtxt(n, lab):
        w = wr[n]
        return "%s %+.2f m at %s %.1f..%.1f" % (lab, w["m"], AXN[view][0], w["from_m"], w["to_m"]) if w else lab + " n/a"
    d.text((8, 50), "worst:  " + wtxt("upper", "upper edge") + "   |   " + wtxt("lower", "lower edge") + "   |   " + wtxt("fatter", "fatter(+)/thinner(-)"),
           fill=(255, 190, 110), font=f2)
    # metre rulers: horizontal along the bottom, vertical down the left, at a step that gives ~ 90 px
    def nice(px_per_m_shown):
        for st in (0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50):
            if st * px_per_m_shown >= 70:
                return st
        return 100
    sk = s * k
    step = nice(sk)
    ybase = HEAD + o.size[1]
    h_lo, h_hi = (-ox_c) / s, (W - ox_c) / s
    v = math.ceil(h_lo / step) * step
    while v <= h_hi:
        x = RUL + (ox_c + v * s) * k
        major = abs(v / step) % 2 < 1e-6 or step >= 1
        d.line([(x, ybase), (x, ybase + (9 if major else 5))], fill=(170, 180, 187))
        d.text((x + 2, ybase + 8), ("%g" % round(v, 3)), fill=(170, 180, 187), font=f2)
        v += step
    d.text((RUL + 4, ybase + 24), "%s, metres (model %s; the ruler is the view's own axis)" % (AXN[view][0], AXN[view][0]), fill=(130, 140, 147), font=f2)
    v_lo, v_hi = (oy_c - Hh) / s, oy_c / s
    v = math.ceil(v_lo / step) * step
    while v <= v_hi:
        y = HEAD + (oy_c - v * s) * k
        d.line([(RUL - 6, y), (RUL, y)], fill=(170, 180, 187))
        d.text((2, y - 7), ("%g" % round(v, 3))[:6], fill=(170, 180, 187), font=f2)
        v += step
    # station bins (the worst-station numbers refer to them), as short marks under the ruler
    for st in stations:
        x = RUL + (ox_c + st["from_m"] * s) * k
        d.line([(x, ybase + 40), (x, ybase + 44)], fill=(110, 120, 127))
    y = ybase + 48
    x = 8
    for col, lab in (((10, 40, 200), "reference outline"), ((200, 10, 10), "model outline"), ((95, 125, 240), "reference only (model missing/thinner)"),
                     ((240, 100, 90), "model only (model fatter/extra)"), ((150, 150, 150), "outside the compared window"), ((110, 120, 127), "station bins")):
        d.rectangle([x, y + 2, x + 12, y + 14], fill=col)
        d.text((x + 18, y), lab, fill=(196, 204, 210), font=f2)
        x += 30 + int(d.textlength(lab, font=f2))
    png = os.path.join(out_dir, "outline_%s%s_%d_%s.png" % (key, "_before" if tag else "", idx, view))
    sheet.save(png)
    res["overlay"] = os.path.abspath(png)
    return res


def run(dump_path, spec_path, out_dir, only=None, align_override=None, tag=""):
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
            a = None
            if align_override is not None:      # gate --before-align: the old model on its own best fit
                a = max(float(ref.get("align_m", 0)), float(align_override(ref)))
            out.append(compare_one(dump, ref, base, key, i, out_dir, align_override=a, tag=tag))
        except Exception as e:  # a missing picture must not hide the other references
            out.append({"n": i, "name": ref.get("name") or ref.get("image"), "view": ref.get("view"), "error": "%s: %s" % (type(e).__name__, e),
                        "exact": bool(ref.get("exact", True))})
    res = {"key": key, "dump": os.path.abspath(dump_path), "spec": os.path.abspath(spec_path), "references": out}
    json.dump(res, open(os.path.join(out_dir, "outline_%s%s.json" % (key, "_before" if tag else "")), "w"), indent=1)
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
