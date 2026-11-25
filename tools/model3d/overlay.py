#!/usr/bin/env python3
"""The true render laid over a reference photograph or drawing, at the spec's scale and origin.

usage:
  python3 tools/model3d/overlay.py KEY [--spec SPEC.json] [--out DIR] [--ref N]... [--team T]
                                       [--extra FILE.js]... [--root DIR] [--zoom K] [--alpha 0.5]
                                       [--pitch DEG] [--flip | --no-flip] [--gear up|down]

outline.py compares SILHOUETTES; this puts the whole picture on the picture, which is what
the pilot's reviewers did by hand to check a hand trace, a window edge or a box end: every
reference that has an image, a px_per_m and an origin/anchor (and a side, top or front view)
is brought to the standard orientation exactly as outline.py does (crop -> rotate -> flip), and
render.js draws the model with the real materials as a bare panel of the same size, at the same
px per metre, with the same model point on the same pixel. Then, per reference n:

  overlay_KEY_n_blend.png   the render blended over the picture (--alpha, default 0.5), the
                            picture in colour at full resolution (enlarged x --zoom, default so
                            that it is at least 1800 px wide), a metre ruler on both axes, and
                            the spec's landmarks for this reference as blue crosses
  overlay_KEY_n_edges.png   the picture with the model's silhouette (red) and its internal edges
                            (yellow: creases and paint breaks from the render) drawn over it
  overlay_KEY_n_crop_<name>.png   zoomed crops, blend above edges: the spec's "overlay_crops"
                            ([{name, ref, box_m: [h0, v0, h1, v1], zoom}]) or, without them, a
                            3 m box round every landmark of this reference
  overlay_KEY.json          what was drawn, the scale and origin used, the files

A reference may carry "overlay": {...} with fields that override its own for this tool only:
a picture kept as "quarter" for outline.py (no mask, not compared) can still be overlaid, e.g.
{"view": "side", "px_per_m": 14.2, "anchor_px": [250, 646], "anchor_m": [30.21, 0], "flip": true}.
The reference's "pitch_deg" and "hide" (outline.py's) are used here too; --pitch, --flip and
--gear override them for a quick look.

Views (model space +X nose, +Y left, +Z up): side h=x v=z (from starboard), top h=x v=y
(port up), front h=y v=z.
"""
import json, math, os, subprocess, sys, time
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import outline as OL  # noqa: E402

AXN = {"side": ("x", "z"), "top": ("x", "y"), "front": ("y", "z")}


def ruler(img, s, ox, oy, view, title, lines=(), marks=()):
    """img (RGB) with a ruler margin: s px per metre in THIS image, (ox, oy) the pixel of view (0, 0)."""
    W, H = img.size
    L, T, B = 52, 30 + 16 * len(lines), 40
    sheet = Image.new("RGB", (W + L + 8, H + T + B), (27, 31, 35))
    sheet.paste(img, (L, T))
    d = ImageDraw.Draw(sheet)
    f1, f2 = OL.font(16), OL.font(12)
    d.text((8, 6), title, fill=(242, 244, 245), font=f1)
    for i, t in enumerate(lines):
        d.text((8, 28 + 16 * i), t, fill=(196, 204, 210), font=f2)
    step = 100
    for st in (0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50):
        if st * s >= 64:
            step = st
            break
    v = math.ceil((-ox) / s / step) * step
    while v <= (W - ox) / s:
        x = L + ox + v * s
        d.line([(x, T + H), (x, T + H + 8)], fill=(170, 180, 187))
        d.text((x + 2, T + H + 8), "%g" % round(v, 3), fill=(170, 180, 187), font=f2)
        v += step
    d.text((L, T + H + 24), "%s, m" % AXN[view][0], fill=(130, 140, 147), font=f2)
    v = math.ceil((oy - H) / s / step) * step
    while v <= oy / s:
        y = T + oy - v * s
        d.line([(L - 7, y), (L, y)], fill=(170, 180, 187))
        d.text((2, y - 7), ("%g" % round(v, 3))[:6], fill=(170, 180, 187), font=f2)
        v += step
    d.text((2, T - 14), AXN[view][1] + ", m", fill=(130, 140, 147), font=f2)
    for mk in marks:
        px, py, lab = mk[0], mk[1], mk[2]
        if px is None and py is None:
            continue
        if px is None:          # a height only: a line across
            y = T + py
            d.line([(L, y), (L + W, y)], fill=(30, 120, 255), width=1)
            d.text((L + 4, y + 2), lab, fill=(30, 120, 255), font=f2)
            continue
        if py is None:          # a station only: a line down
            x = L + px
            d.line([(x, T), (x, T + H)], fill=(30, 120, 255), width=1)
            d.text((x + 3, T + 4), lab, fill=(30, 120, 255), font=f2)
            continue
        x, y = L + px, T + py
        d.line([(x - 9, y), (x + 9, y)], fill=(30, 120, 255), width=2)
        d.line([(x, y - 9), (x, y + 9)], fill=(30, 120, 255), width=2)
        d.text((x + 6, y + 4), lab, fill=(30, 120, 255), font=f2)
    return sheet


def main(argv):
    if not argv or "-h" in argv or "--help" in argv:
        print(__doc__)
        return 2
    o = {"extra": [], "refs": [], "out": "overlay_out", "spec": None, "team": None, "root": None, "zoom": None,
         "alpha": 0.5, "pitch": None, "flip": None, "gear": None}
    pos, i = [], 0
    while i < len(argv):
        a = argv[i]
        if a == "--spec": o["spec"] = argv[i + 1]; i += 2
        elif a == "--out": o["out"] = argv[i + 1]; i += 2
        elif a == "--ref": o["refs"].append(int(argv[i + 1])); i += 2
        elif a == "--team": o["team"] = argv[i + 1]; i += 2
        elif a == "--extra": o["extra"].append(os.path.abspath(argv[i + 1])); i += 2
        elif a == "--root": o["root"] = os.path.abspath(argv[i + 1]); i += 2
        elif a == "--zoom": o["zoom"] = int(argv[i + 1]); i += 2
        elif a == "--alpha": o["alpha"] = float(argv[i + 1]); i += 2
        elif a == "--pitch": o["pitch"] = float(argv[i + 1]); i += 2
        elif a == "--flip": o["flip"] = True; i += 1
        elif a == "--no-flip": o["flip"] = False; i += 1
        elif a == "--gear": o["gear"] = argv[i + 1]; i += 2
        else: pos.append(a); i += 1
    key = pos[0]
    spec_path = o["spec"] or os.path.join(HERE, "specs", key + ".json")
    spec = json.load(open(spec_path))
    base = os.path.dirname(os.path.abspath(spec_path))
    team = o["team"] or spec.get("team") or "nato"
    out = os.path.abspath(o["out"])
    os.makedirs(out, exist_ok=True)
    T0 = time.time()
    result = {"key": key, "spec": os.path.abspath(spec_path), "references": []}
    for n, ref0 in enumerate(spec.get("references", [])):
        if o["refs"] and n not in o["refs"]:
            continue
        ref = dict(ref0)
        ref.update(ref0.get("overlay") or {})
        if o["flip"] is not None:
            ref["flip"] = o["flip"]
        if o["pitch"] is not None:
            ref["pitch_deg"] = o["pitch"]
        view = ref.get("view")
        if not ref.get("image") or view not in AXN or "px_per_m" not in ref or not ("origin_px" in ref or "anchor_px" in ref):
            if o["refs"]:
                print("[overlay] #%d %s: needs image, px_per_m, origin_px/anchor_px and a side/top/front view (or an \"overlay\" block)" % (n, ref.get("name")))
            continue
        t = time.time()
        fr = OL.ref_frame(ref, base)
        img, s, ox, oy, iw, ih = fr["img"].convert("RGB"), fr["s"], fr["ox"], fr["oy"], fr["iw"], fr["ih"]
        k = o["zoom"] or max(1, min(4, int(math.ceil(1800.0 / iw))))
        if iw * k * ih * k > 16e6:
            k = max(1, int(math.sqrt(16e6 / (iw * ih))))
        W, H = iw * k, ih * k
        sk = s * k
        # the view point under the middle of the prepared picture
        hc, vc = (iw / 2.0 - ox) / s, (oy - ih / 2.0) / s
        stem = os.path.join(out, "overlay_%s_%d" % (key, n))
        cmd = ["node", os.path.join(HERE, "render.js"), key, team, stem + "_raw.png", "--raw", "--views", view,
               "--size", "%dx%d" % (W, H), "--scale", "%.6f" % sk, "--centre", "%.6f,%.6f" % (hc, vc)]
        if ref.get("pitch_deg"):
            cmd += ["--pitch", str(ref["pitch_deg"])]
        hide = [h for h in (ref.get("hide") or []) if h != "gear"]
        if "gear" in (ref.get("hide") or []) and not o["gear"]:
            cmd += ["--gear", "up"]
        if o["gear"]:
            cmd += ["--gear", o["gear"]]
        if hide:
            cmd += ["--hide", ",".join(hide)]
        for f in o["extra"]:
            cmd += ["--extra", f]
        if o["root"]:
            cmd += ["--root", o["root"]]
        p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        if p.returncode != 0:
            print(p.stdout.strip())
            print("[overlay] #%d: render.js failed" % n)
            return 1
        rnd = Image.open(stem + "_raw_%s.png" % view).convert("RGBA")
        photo = img.resize((W, H), Image.BICUBIC) if k > 1 else img
        ra = np.asarray(rnd).astype(np.float32)
        alpha = (ra[:, :, 3:4] / 255.0)
        ph = np.asarray(photo).astype(np.float32)
        blend = ph * (1 - alpha * o["alpha"]) + ra[:, :, :3] * alpha * o["alpha"]
        blend_im = Image.fromarray(blend.clip(0, 255).astype(np.uint8))
        # edges: the silhouette and the render's own creases / paint breaks
        sil = alpha[:, :, 0] > 0.5
        silE = OL.edges_of(sil)
        lum = Image.fromarray((ra[:, :, :3] @ np.array([0.299, 0.587, 0.114], dtype=np.float32)).clip(0, 255).astype(np.uint8))
        ed = np.asarray(lum.filter(ImageFilter.FIND_EDGES)) > 40
        ed &= np.asarray(Image.fromarray((sil * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))) > 127
        edge_im = photo.copy()
        edge_im.paste((255, 214, 0), mask=Image.fromarray((ed * 255).astype(np.uint8)))
        edge_im.paste((235, 20, 20), mask=Image.fromarray((silE * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)))
        oxk, oyk = ox * k, oy * k
        rj = json.load(open(stem + "_raw.json"))
        bb = rj.get("bbox") or {"min": [0, 0, 0], "max": [0, 0, 0]}
        ah, av = OL.AXES[view]
        mid = ((bb["min"][ah] + bb["max"][ah]) / 2, (bb["min"][av] + bb["max"][av]) / 2)
        # a landmark that checks one coordinate only is drawn as a line across the picture (None for the other)
        marks, lmarks = [], []
        lms = [lm for lm in spec.get("landmarks", []) if lm.get("ref") == n and (lm.get("view") or view) == view]
        for lm in lms:
            e = lm.get("expect_m")
            if e is None and lm.get("at_m") is not None:
                e = lm["at_m"]
            if e is None and lm.get("at_px"):
                e = fr["to_m"](lm["at_px"])
            if e is None:
                lmarks.append(None)
                continue
            e = list(e)
            if len(e) == 3:
                e = [e[ah], e[av]]
            cv = None
            if (lm.get("model_at") or {}).get("cross") is not None:
                cv, e = e[1], [e[0], None]        # a station where the edge crosses a level: crop round the level
            mk = (None if e[0] is None else oxk + e[0] * sk, None if e[1] is None else oyk - e[1] * sk, lm["name"][:30],
                  mid[0] if e[0] is None else e[0], (cv if cv is not None else mid[1]) if e[1] is None else e[1])
            marks.append(mk)
            lmarks.append(mk)
        lines = ["%s  %.3f px/m in the picture, x%d here  |  model (0, 0) at picture px (%.1f, %.1f) after crop/rotate/flip  |  flip %s  pitch %s  hidden %s" % (
                     ref.get("name", ""), s, k, ox, oy, bool(ref.get("flip")), ref.get("pitch_deg") or 0, ",".join(ref.get("hide") or []) or "-"),
                 "true render (render.js, the real materials) at the same scale and origin; blue crosses: the spec's landmarks on this reference"]
        f_blend, f_edges = stem + "_blend.png", stem + "_edges.png"
        ruler(blend_im, sk, oxk, oyk, view, "%s  %s  render %d%% over the reference" % (key, view.upper(), round(o["alpha"] * 100)), lines, marks).save(f_blend)
        ruler(edge_im, sk, oxk, oyk, view, "%s  %s  model edges over the reference (red silhouette, yellow creases)" % (key, view.upper()), lines, marks).save(f_edges)
        # crops
        crops = [c for c in spec.get("overlay_crops", []) if c.get("ref") == n]
        if not crops:
            span = max(1.0, min(3.0, 0.2 * max(bb["max"][ah] - bb["min"][ah], 1e-6)))
            for j, (lm, mk) in enumerate(zip(lms, lmarks)):
                if mk is None:
                    continue
                h, v = mk[3], mk[4]
                crops.append({"name": "lm%d" % j, "box_m": [h - span / 2, v - span / 3, h + span / 2, v + span / 3], "label": lm["name"]})
        cfiles = []
        for c in crops:
            h0, v0, h1, v1 = c["box_m"]
            x0, x1 = sorted((oxk + h0 * sk, oxk + h1 * sk))
            y0, y1 = sorted((oyk - v1 * sk, oyk - v0 * sk))
            box = (int(max(0, x0)), int(max(0, y0)), int(min(W, x1)), int(min(H, y1)))
            if box[2] - box[0] < 4 or box[3] - box[1] < 4:
                continue
            z = c.get("zoom") or max(1, min(6, int(900 / max(1, box[2] - box[0]))))
            a = blend_im.crop(box).resize(((box[2] - box[0]) * z, (box[3] - box[1]) * z), Image.LANCZOS)
            b = edge_im.crop(box).resize(a.size, Image.LANCZOS)
            pair = Image.new("RGB", (a.size[0], a.size[1] * 2 + 6), (27, 31, 35))
            pair.paste(a, (0, 0)); pair.paste(b, (0, a.size[1] + 6))
            cm = [(None if mk[0] is None else mk[0] - box[0], None if mk[1] is None else mk[1] - box[1], mk[2]) for mk in marks
                  if (mk[0] is None or box[0] <= mk[0] <= box[2]) and (mk[1] is None or box[1] <= mk[1] <= box[3])]
            cz = lambda v, z: None if v is None else v * z
            sheet = ruler(pair.crop((0, 0, a.size[0], a.size[1])), sk * z, (oxk - box[0]) * z, (oyk - box[1]) * z, view,
                          "%s  crop %s: %s" % (key, c["name"], c.get("label", "")), [], [(cz(x, z), cz(y, z), l) for x, y, l in cm])
            sheet2 = ruler(pair.crop((0, a.size[1] + 6, a.size[0], a.size[1] * 2 + 6)), sk * z, (oxk - box[0]) * z, (oyk - box[1]) * z, view,
                           "edges", [], [(cz(x, z), cz(y, z), l) for x, y, l in cm])
            both = Image.new("RGB", (max(sheet.size[0], sheet2.size[0]), sheet.size[1] + sheet2.size[1]), (27, 31, 35))
            both.paste(sheet, (0, 0)); both.paste(sheet2, (0, sheet.size[1]))
            f = stem + "_crop_%s.png" % c["name"]
            both.save(f)
            cfiles.append(f)
        os.remove(stem + "_raw_%s.png" % view)
        os.remove(stem + "_raw.json")
        rec = {"n": n, "name": ref.get("name"), "view": view, "px_per_m": s, "zoom": k, "origin_px_prepared": [ox, oy],
               "flip": bool(ref.get("flip")), "pitch_deg": ref.get("pitch_deg") or 0, "hide": ref.get("hide") or [],
               "blend": f_blend, "edges": f_edges, "crops": cfiles, "seconds": round(time.time() - t, 2)}
        result["references"].append(rec)
        print("[overlay] #%d %s %s: x%d, %.1f s -> %s %s%s" % (n, view, ref.get("name", "")[:50], k, rec["seconds"], f_blend, f_edges,
              (" + %d crops" % len(cfiles)) if cfiles else ""))
    if not result["references"]:
        print("[overlay] no reference of %s has an image with a scale and origin in a side/top/front view (add an \"overlay\" block)" % key)
    json.dump(result, open(os.path.join(out, "overlay_%s.json" % key), "w"), indent=1)
    print("[overlay] %d reference(s), %.1f s" % (len(result["references"]), time.time() - T0))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
