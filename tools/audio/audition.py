#!/usr/bin/env python3
"""Hear and see every sound OPERATION IRONFRONT synthesises - no browser.

js/audio.js builds every sound live in Web Audio. This renders all of them
offline under JavaScriptCore through tools/audio/webaudio_emu.js (a Web Audio
implementation written from the spec), exactly as the game triggers them,
and writes for each one a 16-bit stereo 48 kHz WAV and a PNG (waveform, level
in dBFS, log-frequency spectrogram, and the numbers), plus a contact sheet of
the lot, metrics.json / metrics.csv, and a playlist for audition.sh.

usage
  python3 tools/audio/audition.py OUTDIR [--only REGEX] [--title TEXT] [--keep-raw]
  python3 tools/audio/audition.py --selftest       emulator checks against the spec
  python3 tools/audio/audition.py --list           what would be rendered
  python3 tools/audio/audition.py --compare BEFORE AFTER [--all]
                                                   metric deltas between two runs
  sh tools/audio/audition.sh OUTDIR [REGEX]        play them, each announced by name

  --only takes a regex over the sound ids (e.g. "wpn_gun_12|imp_armour"); ids
  are NNN_group_name_pos with group wpn, imp, boom, cue, eng, bed.
  --root renders another game tree with this copy of the tool (default: the
  tree this file sits in) - e.g. a designer's edited copy of js/audio.js,
  then --compare against the committed catalogue.

What the numbers mean is defined once, at the top of tools/audio/analysis.js;
how each sound is triggered (and where "near" and "far" are) at the top of
tools/audio/driver.js.

WHAT THE EMULATOR DOES NOT MODEL FAITHFULLY
  - DynamicsCompressor (audio.js's -9 dB 20:1 limiter and the engine
    compressor): the static curve and the spec's automatic makeup gain are
    exact (+5.13 dB and +11.55 dB here, checked), but the envelope is a
    per-frame peak detector with one-pole attack/release and a 6 ms look-ahead,
    not Chrome's kernel (adaptive release, warped envelope, 32-frame steps).
    Peaks driven into the limiter can differ by about a dB; a steady 0 dBFS
    tone measures -3.11 dBFS out against the curve's -3.42. The soft knee is a
    quadratic, only relevant to the engine compressor's 8 dB knee.
  - Oscillators: band-limited by switching between 112 wavetables (partials
    always within a semitone of Nyquist) instead of crossfading two as Chrome
    does. During a fast sweep a partial near Nyquist steps in or out; inaudible
    below ~20 kHz, but visible at the top of a spectrogram.
  - WaveShaper "2x": a 63-tap Blackman halfband, 31 frames (0.65 ms) of
    latency; Chrome's resampler kernels differ in latency and alias rejection.
  - Source start/stop times round up to the next frame; Chrome places a
    buffer source's start with sub-sample accuracy. At most 21 us.
  - Randomness: Math.random is seeded from each sound's name, so renders
    repeat exactly. In the game every session fills a different noise buffer
    and draws different jitter: a live shot differs sample by sample from
    these, not in spectrum or level.
  - One sound at a time, through the full bus. Voice stealing (22 voices),
    the limiter pumping under a real exchange and duck() pulling a battle down
    under a warning are not in these renders.
  - The context runs at 48 kHz. A browser follows the output device, often
    44.1 kHz, which moves Nyquist to 22.05 kHz.
  - Engines and the bed are driven at exactly 100 ms / 60 Hz steps; the game's
    frame loop jitters.
  - Spoken acknowledgements (Sfx.vox) use speechSynthesis, not Web Audio:
    not rendered.
  - Scheduling time is jsc wall time: the same JavaScript engine as Safari,
    but node construction is the emulator's, not native. Node counts are
    exact; milliseconds are relative cost.
  - WAVs are 16-bit without dither; metrics are taken from the float render.
"""
import csv, json, math, os, re, shutil, struct, subprocess, sys, time, wave
from array import array

JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:                                   # WAVs and metrics still work
    Image = None

# ------------------------------------------------------------------ drawing
BG, PANEL, GRID, TEXT, DIM = (15, 17, 21), (24, 27, 33), (52, 57, 66), (225, 228, 232), (140, 146, 156)
COL_L, COL_R, COL_LVL, COL_MARK = (255, 170, 60), (90, 200, 255), (130, 220, 140), (255, 90, 90)
INFERNO = [(0, 0, 4), (22, 11, 57), (66, 10, 104), (106, 23, 110), (147, 38, 103), (188, 55, 84),
           (221, 81, 58), (243, 120, 25), (252, 165, 10), (246, 215, 70), (252, 255, 164)]
GROUPS = [("weapon", "WEAPON REPORTS  Sfx.weapon"), ("impact", "IMPACTS  Sfx.impact"),
          ("boom", "EXPLOSIONS  Sfx.boom"), ("cue", "UI AND EVENT CUES  Sfx.play"),
          ("engine", "ENGINES  Sfx.updateEngines"), ("bed", "INTENSITY BED  Sfx.setIntensity")]


def palette():
    out = []
    for i in range(256):
        x = i / 255 * (len(INFERNO) - 1)
        k = min(int(x), len(INFERNO) - 2)
        f = x - k
        a, b = INFERNO[k], INFERNO[k + 1]
        out += [int(round(a[c] + (b[c] - a[c]) * f)) for c in range(3)]
    return out


PAL = palette()
_fonts = {}


def font(size):
    if size in _fonts:
        return _fonts[size]
    f = None
    try:
        f = ImageFont.load_default(size=size)
    except TypeError:
        for p in ("/System/Library/Fonts/Menlo.ttc", "/System/Library/Fonts/Supplemental/Arial.ttf"):
            try:
                f = ImageFont.truetype(p, size)
                break
            except OSError:
                pass
        if f is None:
            f = ImageFont.load_default()
    _fonts[size] = f
    return f


def fmt(v, spec, unit="", none="-"):
    if v is None or (isinstance(v, float) and (math.isnan(v) or math.isinf(v))):
        return none
    return format(v, spec) + unit


def spec_image(rec, raw, w, h):
    s = rec["spec"]
    data = open(os.path.join(raw, rec["id"] + ".spec"), "rb").read()
    im = Image.frombytes("L", (s["rows"], s["frames"]), data).transpose(Image.Transpose.ROTATE_90)
    im = im.resize((w, h), Image.Resampling.BILINEAR)
    im = im.convert("P")
    im.putpalette(PAL)
    return im.convert("RGB")


def read_env(rec, raw):
    a = array("f")
    a.frombytes(open(os.path.join(raw, rec["id"] + ".env"), "rb").read())
    return a


def freq_y(f, s, top, h):
    lo, hi = math.log(s["fLo"]), math.log(s["fHi"])
    return top + h - (math.log(f) - lo) / (hi - lo) * h


def nice_step(dur, target=10):
    for st in (0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5):
        if dur / st <= target:
            return st
    return 10


def metric_lines(rec):
    if rec.get("silent"):
        return ["SILENT - the call made no sound (" + str(rec["nodes"]) + " nodes created)", rec["desc"]]
    l1 = ("peak " + fmt(rec["peak_dbfs"], ".1f", " dBFS") + "   RMS " + fmt(rec["rms_dbfs"], ".1f", " dBFS") +
          "   crest " + fmt(rec["crest_db"], ".1f", " dB") + "   loudness " + fmt(rec["lufs"], ".1f", " LUFS") +
          " (400 ms max " + fmt(rec["lufs_mmax"], ".1f") + ")   centroid " + fmt(rec["centroid_hz"], ".0f", " Hz"))
    l2 = ("to -60 dB " + fmt(rec["dur60_ms"], ".0f", " ms") + " (-50 dB " + fmt(rec["dur50_ms"], ".0f", " ms") +
          ")   onset " + fmt(rec["onset_ms"], ".0f", " ms") + "   limiter GR " + fmt(rec["limiter_gr_db"], ".1f", " dB") +
          "   " + str(rec["nodes"]) + " nodes, " + str(rec["auto_events"]) + " automation events" +
          "   schedule " + fmt(rec["sched_ms_warm"], ".3f", " ms") + " warm / " + fmt(rec["sched_ms_first"], ".2f", " ms") + " first")
    bt = rec.get("nodes_by_type") or {}
    l3 = "nodes: " + ", ".join("%s %d" % (k.replace("AudioBufferSource", "BufferSource"), v) for k, v in sorted(bt.items(), key=lambda kv: -kv[1]))
    wp = rec.get("weapon")
    if wp:
        l3 += ("     weapon: %s, bore %.1f mm, body %.0f Hz, tail %.2f s, level %.2f, crack %.2f, thump %.2f, ring %.2f, carry %d m"
               % (wp["kind"], wp["bore_mm"], wp["body_hz"], wp["tail_s"], wp["level"], wp["crack"], wp["thump"], wp["ring"], wp["carry_m"]))
    return [l1, l2, l3]


def draw_sound(rec, raw, path):
    W, X0, PW = 1200, 70, 1100
    H = 860
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.text((16, 10), rec["id"], fill=TEXT, font=font(22))
    d.text((16, 40), rec["label"] + "   -   " + rec["desc"], fill=TEXT, font=font(14))
    d.text((16, 60), rec["call"] + "     " + rec["where"], fill=DIM, font=font(13))
    y = 84
    for ln in metric_lines(rec):
        d.text((16, y), ln, fill=TEXT if y < 110 else DIM, font=font(13))
        y += 19
    dur = rec["duration_s"] or 0.001
    env = read_env(rec, raw)
    cols = rec["env_cols"]

    # waveform: L and R in their own lanes, scaled to the sound's own peak so a
    # -40 dBFS click is as readable as a blast (the level strip below is absolute)
    top, lane = 150, 78
    pk = 10 ** (rec["peak_dbfs"] / 20) if rec.get("peak_dbfs") is not None else 1.0
    gain = 1.0 / pk if pk > 0 else 1.0
    for k, (col, name) in enumerate(((COL_L, "L"), (COL_R, "R"))):
        t0 = top + k * (lane + 6)
        d.rectangle([X0, t0, X0 + PW, t0 + lane], fill=PANEL)
        mid = t0 + lane / 2
        d.line([X0, mid, X0 + PW, mid], fill=GRID)
        for c in range(min(cols, PW)):
            mn, mx = env[c * 5 + 2 * k] * gain, env[c * 5 + 2 * k + 1] * gain
            ya, yb = mid - mx * lane / 2, mid - mn * lane / 2
            d.line([X0 + c, ya, X0 + c, max(yb, ya + 0.5)], fill=col)
        d.text((X0 - 22, mid - 8), name, fill=col, font=font(13))
    d.text((X0 + PW - 330, top + 2), "waveform scaled to its peak: full lane = %s dBFS" % fmt(rec.get("peak_dbfs"), ".1f"),
           fill=DIM, font=font(11))

    # level in dBFS with the -60 dB-from-peak line and the onset/end markers
    lt, lh, lo = top + 2 * lane + 22, 120, -96.0
    d.rectangle([X0, lt, X0 + PW, lt + lh], fill=PANEL)
    for g in (0, -20, -40, -60, -80):
        yy = lt + (g / lo) * lh
        d.line([X0, yy, X0 + PW, yy], fill=GRID)
        d.text((X0 - 44, yy - 7), "%d" % g, fill=DIM, font=font(11))
    d.text((X0 - 64, lt + lh / 2 - 8), "dBFS", fill=DIM, font=font(11))
    pts = []
    for c in range(min(cols, PW)):
        v = max(lo, min(0.0, env[c * 5 + 4]))
        pts.append((X0 + c, lt + (v / lo) * lh))
    for c in range(len(pts)):
        d.line([pts[c][0], pts[c][1], pts[c][0], lt + lh], fill=(40, 90, 55))
    d.line(pts, fill=COL_LVL, width=1)
    if not rec.get("silent") and rec["peak_dbfs"] is not None:
        thr = rec["peak_dbfs"] - 60
        if thr > lo:
            yy = lt + (thr / lo) * lh
            for x in range(X0, X0 + PW, 8):
                d.line([x, yy, x + 4, yy], fill=COL_MARK)
            d.text((X0 + PW - 120, yy - 15), "peak - 60 dB", fill=COL_MARK, font=font(11))
        for tms in (rec["onset_ms"], rec["end60_ms"]):
            if tms is not None:
                xx = X0 + tms / 1000.0 / dur * PW
                d.line([xx, lt, xx, lt + lh], fill=COL_MARK)

    # spectrogram on a log frequency axis
    st, sh = lt + lh + 22, 330
    s = rec["spec"]
    im.paste(spec_image(rec, raw, PW, sh), (X0, st))
    for f in (20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000):
        if f < s["fLo"] or f > s["fHi"]:
            continue
        yy = freq_y(f, s, st, sh)
        for x in range(X0, X0 + PW, 6):
            d.point((x, yy), fill=(120, 120, 120))
        d.text((X0 - 44, yy - 7), ("%dk" % (f // 1000)) if f >= 1000 else str(f), fill=DIM, font=font(11))
    d.text((X0 - 64, st - 16), "Hz", fill=DIM, font=font(11))
    # colour key
    kx = X0 + PW + 12
    for i in range(sh):
        v = int(255 * (1 - i / (sh - 1)))
        d.line([kx, st + i, kx + 10, st + i], fill=tuple(PAL[3 * v:3 * v + 3]))
    d.text((kx - 2, st - 16), "%d" % s["dbHi"], fill=DIM, font=font(11))
    d.text((kx - 6, st + sh + 2), "%d" % s["dbLo"], fill=DIM, font=font(11))

    # time axis
    ty = st + sh + 6
    step = nice_step(dur)
    t = 0.0
    while t <= dur + 1e-9:
        xx = X0 + t / dur * PW
        d.line([xx, ty, xx, ty + 5], fill=DIM)
        d.text((xx - 12, ty + 7), ("%g s" % round(t, 3)), fill=DIM, font=font(11))
        t += step
    d.text((16, H - 22), "spectrogram of (L+R)/2: %d-pt Hann below %d Hz, %d-pt above, hop %.1f ms; colour = dB re a full-scale sine per bin; "
           "red lines: onset and end at peak - 60 dB" % (s.get("NL", 4096), s["split"], s.get("NS", 1024), s["hop"] / 48.0),
           fill=DIM, font=font(11))
    im.save(path, compress_level=2)               # zlib at 6 was two thirds of the drawing time


def contact_sheet(recs, raw, path, title):
    COLS, TW, TH, PAD = 5, 372, 228, 10
    groups = [(g, t, [r for r in recs if r["group"] == g]) for g, t in GROUPS]
    groups = [x for x in groups if x[2]]
    height = 70
    for _, _, rs in groups:
        height += 34 + ((len(rs) + COLS - 1) // COLS) * (TH + PAD)
    W = COLS * (TW + PAD) + PAD
    im = Image.new("RGB", (W, height), BG)
    d = ImageDraw.Draw(im)
    d.text((PAD, 12), title, fill=TEXT, font=font(22))
    d.text((PAD, 42), "%d sounds  -  per tile: spectrogram 20 Hz-24 kHz (log), level trace -96..0 dBFS, own time scale; "
           "peak dBFS / loudness LUFS / time to -60 dB / nodes" % len(recs), fill=DIM, font=font(13))
    y = 70
    for g, gt, rs in groups:
        d.text((PAD, y + 8), gt, fill=COL_L, font=font(16))
        y += 34
        for i, r in enumerate(rs):
            x = PAD + (i % COLS) * (TW + PAD)
            yy = y + (i // COLS) * (TH + PAD)
            d.rectangle([x, yy, x + TW, yy + TH], fill=PANEL)
            d.text((x + 6, yy + 4), r["id"][:52], fill=TEXT, font=font(12))
            d.text((x + 6, yy + 20), r["desc"][:58], fill=DIM, font=font(11))
            if r.get("silent"):
                d.text((x + 6, yy + 90), "SILENT - no such cue / no sound", fill=COL_MARK, font=font(14))
                continue
            sp = spec_image(r, raw, TW - 12, 118)
            im.paste(sp, (x + 6, yy + 38))
            env = read_env(r, raw)
            cols = r["env_cols"]
            base, hh = yy + 160, 40
            d.rectangle([x + 6, base, x + TW - 6, base + hh], fill=(18, 20, 24))
            prev = None
            for c in range(TW - 12):
                k = int(c * cols / (TW - 12))
                v = max(-96.0, min(0.0, env[k * 5 + 4]))
                pt = (x + 6 + c, base + (v / -96.0) * hh)
                if prev:
                    d.line([prev, pt], fill=COL_LVL)
                prev = pt
            d.text((x + 6, yy + 204), "%s dBFS  %s LUFS  %s ms  %d nodes  %.2f s" % (
                fmt(r["peak_dbfs"], ".1f"), fmt(r["lufs"], ".1f"), fmt(r["dur60_ms"], ".0f"), r["nodes"], r["duration_s"]),
                fill=TEXT, font=font(12))
        y += ((len(rs) + COLS - 1) // COLS) * (TH + PAD)
    im.save(path, compress_level=3)


# ------------------------------------------------------------------ outputs
CSV_COLS = ["id", "group", "pos", "label", "desc", "call", "silent", "peak_dbfs", "rms_dbfs", "crest_db", "lufs",
            "lufs_mmax", "onset_ms", "dur60_ms", "dur50_ms", "centroid_hz", "nodes", "auto_events", "buffers",
            "sched_ms_first", "sched_ms_warm", "limiter_gr_db", "duration_s", "call_sites",
            "w_kind", "w_bore_mm", "w_body_hz", "w_tail_s", "w_level", "wav", "png"]


def write_wav(rec, raw, path):
    pcm = open(os.path.join(raw, rec["id"] + ".pcm"), "rb").read()
    if sys.byteorder != "little":
        a = array("h"); a.frombytes(pcm); a.byteswap(); pcm = a.tobytes()
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(48000)
        w.writeframes(pcm)


def run_driver(root, raw, only, extra):
    extra = dict(extra, tool=HERE)
    cmd = [JSC, os.path.join(HERE, "driver.js"), "--", root, raw, only or "", json.dumps(extra)]
    p = subprocess.Popen(cmd, cwd=root, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    lines = []
    for ln in p.stdout:
        sys.stdout.write(ln); sys.stdout.flush(); lines.append(ln)
    p.wait()
    return p.returncode, "".join(lines)


def render(args, root):
    out = os.path.abspath(args["out"])
    raw = os.path.join(out, ".raw")
    os.makedirs(raw, exist_ok=True)
    t0 = time.time()
    rc, text = run_driver(root, raw, args.get("only"), {})
    man_path = os.path.join(raw, "manifest.json")
    if rc != 0 or not os.path.exists(man_path):
        print("[audition] the jsc driver failed (exit %s)" % rc)
        sys.exit(2)
    man = json.load(open(man_path))
    recs = man["sounds"]
    t1 = time.time()
    for r in recs:
        r["wav"] = r["id"] + ".wav"
        write_wav(r, raw, os.path.join(out, r["wav"]))
        if Image is not None:
            r["png"] = r["id"] + ".png"
            draw_sound(r, raw, os.path.join(out, r["png"]))
    title = args.get("title") or ("IRONFRONT audio catalogue - " + time.strftime("%Y-%m-%d %H:%M"))
    if Image is not None and recs:
        contact_sheet(recs, raw, os.path.join(out, "contact_sheet.png"), title)
    meta = {k: v for k, v in man.items() if k != "sounds"}
    meta["title"] = title
    json.dump({"meta": meta, "sounds": [{k: v for k, v in r.items() if k not in ("spec", "env_cols")} for r in recs]},
              open(os.path.join(out, "metrics.json"), "w"), indent=1)
    with open(os.path.join(out, "metrics.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(CSV_COLS)
        for r in recs:
            wp = r.get("weapon") or {}
            row = dict(r, w_kind=wp.get("kind"), w_bore_mm=wp.get("bore_mm"), w_body_hz=wp.get("body_hz"),
                       w_tail_s=wp.get("tail_s"), w_level=wp.get("level"))
            w.writerow(["" if row.get(c) is None else row.get(c) for c in CSV_COLS])
    with open(os.path.join(out, "playlist.txt"), "w") as f:
        for r in recs:
            f.write(r["wav"] + "\t" + r["label"] + "\n")
    if not args.get("keep_raw"):
        shutil.rmtree(raw, ignore_errors=True)
    bad = [r["id"] for r in recs if r.get("warnings") or r.get("unsupported")]
    print("[audition] %d sounds -> %s  (render %.0f s, WAV/PNG %.0f s)" % (len(recs), out, t1 - t0, time.time() - t1))
    if bad:
        print("[audition] WARNING: Sfx reported errors or unsupported calls for: " + ", ".join(bad))


def selftest(root):
    p = subprocess.run([JSC, os.path.join(HERE, "selftest.js"), "--", root, HERE],
                       cwd=root, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    sys.stdout.write(p.stdout)
    m = re.findall(r"==== (\d+) passed, (\d+) failed ====", p.stdout)
    sys.exit(0 if m and m[-1][1] == "0" else 1)


def compare(before, after, show_all):
    def load(d):
        j = json.load(open(os.path.join(d, "metrics.json")))
        return {re.sub(r"^\d+_", "", r["id"]): r for r in j["sounds"]}
    a, b = load(before), load(after)
    keys = [k for k in b if k in a]
    tol = {"peak_dbfs": 0.1, "lufs": 0.1, "dur60_ms": 5, "centroid_hz": None, "nodes": 0}
    print("%-44s %16s %16s %16s %16s %10s" % ("sound", "peak dBFS", "LUFS", "to -60 dB ms", "centroid Hz", "nodes"))
    changed = 0
    for k in keys:
        ra, rb = a[k], b[k]
        diff = False
        cells = []
        for m, t in tol.items():
            va, vb = ra.get(m), rb.get(m)
            if va is None or vb is None:
                cells.append("%7s->%-7s" % (fmt(va, ".1f"), fmt(vb, ".1f")))
                diff = diff or (va != vb)
                continue
            lim = abs(va) * 0.02 if t is None else t
            if abs(vb - va) > lim:
                diff = True
            cells.append("%7s->%-7s" % (fmt(va, ".0f" if m in ("dur60_ms", "centroid_hz", "nodes") else ".1f"),
                                        fmt(vb, ".0f" if m in ("dur60_ms", "centroid_hz", "nodes") else ".1f")))
        if diff:
            changed += 1
        if diff or show_all:
            print("%-44s %s%s" % (k[:44], " ".join(cells), "  *" if diff else ""))
    only_a = [k for k in a if k not in b]
    only_b = [k for k in b if k not in a]
    print("[compare] %d sounds in both, %d changed beyond tolerance (peak/LUFS 0.1 dB, -60 dB time 5 ms, centroid 2%%, any node)"
          % (len(keys), changed))
    for name, lst in (("BEFORE", only_a), ("AFTER", only_b)):
        if lst:
            print("[compare] only in %s (%d): %s" % (name, len(lst), ", ".join(lst if show_all or len(lst) <= 12 else lst[:12] + ["..."])))


def main():
    argv = sys.argv[1:]
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)

    def opt(name, default=None):
        if name in argv:
            i = argv.index(name)
            v = argv[i + 1]
            del argv[i:i + 2]
            return v
        return default

    root = os.path.abspath(opt("--root", DEFAULT_ROOT))
    if not os.path.exists(JSC):
        print("[audition] JavaScriptCore not found at " + JSC)
        sys.exit(2)
    if "--selftest" in argv:
        selftest(root)
    if "--list" in argv:
        subprocess.run([JSC, os.path.join(HERE, "driver.js"), "--", root, "/dev/null", "", json.dumps({"list": True, "tool": HERE})], cwd=root)
        return
    if "--compare" in argv:
        i = argv.index("--compare")
        compare(argv[i + 1], argv[i + 2], "--all" in argv)
        return
    only = opt("--only")
    title = opt("--title")
    keep = "--keep-raw" in argv
    rest = [x for x in argv if not x.startswith("--")]
    if not rest:
        print(__doc__)
        sys.exit(2)
    render({"out": rest[0], "only": only, "title": title, "keep_raw": keep}, root)


if __name__ == "__main__":
    main()
