/* ============ tools/audio/check_sound_weapons.js - weapon reports, held to their numbers ============

   Run:  jsc tools/audio/check_sound_weapons.js -- /path/to/repo
         (JavaScriptCore: /System/Library/Frameworks/JavaScriptCore.framework/
          Versions/A/Helpers/jsc). Exit status is non-zero on any failure.
         Add "measure" after the path to print the TABLE rows below from the
         current js/audio.js instead of checking it.

   tools/jsc/run.py stubs Sfx out, so the behaviour suites cannot see a single
   node of audio. This check loads the real js/audio.js under
   tools/audio/webaudio_emu.js exactly as tools/audio/driver.js does (the
   page's DOM stand-in, every script index.html loads before audio.js, a fresh
   Sfx per sound, Math.random seeded from the sound's name) and holds every
   weapon family to what the redesign measured. A level alone cannot tell a
   report from a report with a layer missing, so each row is also held to
   what makes it that weapon:
     NODES     per call, near and far: nothing may exceed 1.5x HEAD's count
               for its row, and the busiest (small arms, autocannon) stay
               below HEAD's. The buffer sources per call are counted exactly:
               each is a layer (blast, crack, noise, echoes, a burst's train).
     PEAK      a band per row: a ceiling (never above -1 dBFS for one sound)
               and a floor 3 dB under the measured peak, so a blast wave or a
               crack that loses its transient fails; and no single report may
               take more than 1 dB of gain reduction from the bus limiter.
     LOUDNESS  the loudest 400 ms (BS.1770 momentary max) within +-2 LU of the
               tuned value: the mix per family stays where it was set. The
               momentary max, not the integrated figure, because a bus that
               adds late reflections moves a short report's gated integrated
               loudness by LUs while its loudest block moves tenths.
     BASS      the big guns' 30-150 Hz energy, where a listener hears their
               size, held to a floor, and what lies under 30 Hz held 8 dB
               below it (a first cut lost 5-7 dB of the one to the other).
     CRACK     small arms' energy above 8 kHz in the first 20 ms, held to a
               floor: the supersonic crack.
     SHAPE     a missile's roar falls in pitch as it leaves (the old builder
               swept up: an arrival); a mortar rings at its tube's note; no
               dead air between an RPG's bang and its motor, an SLBM's eject
               and its breach, a bomb's release and its fall; a far report is
               duller than the same one near.
     VOICE     the voice a report holds lasts until the render is 60 dB under
               its peak (plus the longest reflection delay the bus adds, if
               any), so the game does not cut what the WAVs let you hear.
     BURSTS    one report per rotary burst: the rounds after the first, from
               the same place, build nothing; another shooter, or the next
               burst, does; a gun that keeps firing - an AC-130's Vulcan
               battery, a veteran A-10, 2x and 3x game speed - is heard all
               the way through; a first round refused a voice does not silence
               the rest of its burst. Every other weapon keeps HEAD's gap.
     CLOCK     what the game times follows Game.speed: a bomb's fall and an
               SLBM's rise to the surface are half as long at 2x.
     READING   the calibre, kind and family the mapping makes of names the
               old reader got wrong, and every WEAPONS row fired near and far
               builds a report with no warning.
   HEAD node counts are js/audio.js as of e44b7a6 (unchanged through
   3e33793), measured by tools/audio/driver.js's own seeding.
   ========================================================================= */

var __CHK_ARGS = (typeof arguments !== "undefined") ? arguments : [];
(function () {
  "use strict";
  var ROOT = __CHK_ARGS[0] || ".", MEASURE = __CHK_ARGS[1] === "measure";
  var TOOL = ROOT + "/tools/audio";
  load(TOOL + "/webaudio_emu.js");
  load(TOOL + "/analysis.js");
  globalThis.__IDS = {}; globalThis.__HASH = ""; globalThis.__SEARCH = ""; globalThis.__QUIET_CONSOLE = true;
  load(ROOT + "/tools/jsc/env.js");
  WebAudioEmu.install(globalThis);
  performance.now = function () { return preciseTime() * 1000; };
  var warns = [];
  console.warn = function () { warns.push(Array.prototype.join.call(arguments, " ")); };
  console.error = console.warn;
  var html = read(ROOT + "/index.html"), re = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi, m;
  while ((m = re.exec(html))) {
    var src = m[1].split("?")[0];
    if (/(^|\/)audio\.js$/.test(src)) break;
    try { load(ROOT + "/" + src); } catch (e) { print("[check] load error " + src + ": " + e); }
  }
  var CAM = { x: 2048, y: 2048, z: 1 }, FAR = { x: CAM.x + 360, y: CAM.y - 600 };
  globalThis.Render = { cam: CAM };
  /* where "far" is, in audio.js's own terms: 560 m, far 0.8, arrival 0.28 s */
  var FARF = Math.min(1, Math.sqrt(360 * 360 + 600 * 600) * 0.8 / 700), FARD = Math.min(0.28, Math.sqrt(360 * 360 + 600 * 600) * 0.8 / 1500);

  var passed = 0, failed = 0;
  function check(name, ok, detail) {
    if (ok) passed++; else failed++;
    if (!ok || !MEASURE) print((ok ? "PASS " : "FAIL ") + name + (detail ? "  -- " + detail : ""));
  }
  function seed(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
    var s = h;
    Math.random = function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var busDelays = 0;
  function fresh(name, speed) {
    seed(name);
    globalThis.Game = { speed: speed || 1 };
    load(ROOT + "/js/audio.js");
    Sfx.ensure();
    busDelays = Sfx.ctx.__stats().byType.Delay || 0;
    return Sfx;
  }
  function f1(x) { return (Math.round(x * 10) / 10).toFixed(1); }

  /* ------------------------------------------------------ measurements --- */
  function biq(x, sr, f0, lo) {
    var Q = Math.SQRT1_2, w0 = 2 * Math.PI * f0 / sr, al = Math.sin(w0) / (2 * Q), c = Math.cos(w0), b0, b1, b2;
    if (lo) { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; } else { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; }
    var a0 = 1 + al, a1 = -2 * c / a0, a2 = (1 - al) / a0;
    b0 /= a0; b1 /= a0; b2 /= a0;
    var y = new Float64Array(x.length), x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (var i = 0; i < x.length; i++) {
      var v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
    }
    return y;
  }
  /* energy (dB, re a full-scale sine's per-second energy of 0.5) of the mid
     signal between lo and hi Hz (4th order each side; 0 = open), in the
     window [i0, i1) samples */
  function bandDb(x, sr, lo, hi, i0, i1) {
    var y = x.subarray(Math.max(0, i0 || 0), Math.min(x.length, i1 || x.length));
    if (lo) y = biq(biq(y, sr, lo, false), sr, lo, false);
    if (hi) y = biq(biq(y, sr, hi, true), sr, hi, true);
    var e = 0;
    for (var i = 0; i < y.length; i++) e += y[i] * y[i];
    return e > 0 ? 10 * Math.log(e / sr) / Math.LN10 : -200;
  }
  /* power-weighted mean frequency over octave bands 63 Hz - 16 kHz */
  var OCT = [63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
  function centroid(x, sr, i0, i1) {
    var num = 0, den = 0;
    OCT.forEach(function (f) {
      var e = Math.pow(10, bandDb(x, sr, f / Math.SQRT2, Math.min(f * Math.SQRT2, sr * 0.45), i0, i1) / 10);
      num += e * f; den += e;
    });
    return den > 0 ? num / den : 0;
  }
  /* fire one report as the game does and render it until quiet */
  function shot(id, pos, name, speed) {
    var S = fresh(name, speed), ctx = S.ctx;
    warns.length = 0;
    var st0 = ctx.__stats(), n0 = st0.nodes, b0 = st0.byType.AudioBufferSource || 0;
    var d = null, where = pos === "far" ? FAR : CAM;
    if (/^cue:/.test(id)) S.play(id.slice(4));
    else { S.weapon(WEAPONS[id], where.x, where.y); d = S.describe(WEAPONS[id]); }
    var st1 = ctx.__stats();
    var srcN = (st1.byType.AudioBufferSource || 0) - b0;
    ctx.__renderUntilQuiet(14, 0.4);
    var o = ctx.__output(0.05), sr = o.sampleRate, L = o.L, R = o.R;
    var M = new Float64Array(L.length), pk = 0, i;
    for (i = 0; i < L.length; i++) { M[i] = (L[i] + R[i]) / 2; pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); }
    var on = 0; while (on < L.length && Math.abs(L[on]) < pk * 1e-3 && Math.abs(R[on]) < pk * 1e-3) on++;
    var end = L.length - 1; while (end > 0 && Math.abs(L[end]) < pk * 1e-3 && Math.abs(R[end]) < pk * 1e-3) end--;
    var ld = AudioAnalysis.loudness(L, R, sr);
    return {
      id: id, pos: pos, nodes: st1.nodes - n0, src: srcN, warns: warns.slice(), d: d, M: M, sr: sr, on: on, end: end,
      peak: pk > 0 ? 20 * Math.log(pk) / Math.LN10 : -200, mmax: ld.momentaryMax, lufs: ld.integrated,
      gr: (ctx.__limiterMinDb() || [0])[0],
    };
  }

  /* ---------------------------------------------------------- READING --- */
  (function () {
    var S = fresh("reading");
    function row(name, proj, extra) {
      var w = { name: name, proj: proj, dmg: 40, warhead: "he" };
      for (var k in extra || {}) w[k] = extra[k];
      return S.describe(w);
    }
    /* name, proj, bore (null: any), kind, family (null: any), why */
    var cases = [
      ["7.62x39mm AKM", "bullet", 7.62, "mg", "rifle", "the case length is not the bore"],
      ["5.45x39mm AK-74M", "bullet", 5.45, "mg", "rifle", ""],
      ["7,62mm Gewehr G3A3", "bullet", 7.62, "mg", "rifle", "a decimal comma"],
      ["7.62x25mm PPSh-41 SMG", "bullet", 7.62, "mg", "pistol", "a pistol cartridge barely cracks"],
      ["6 x 12,7 mm M3 (Canadair Sabre Mk 6)", "missile", 12.7, "gun", "rotary", "a decimal comma, and six guns fused into one burst"],
      ["ring-mounted .50cal M2HB", "bullet", 12.7, "mg", "hmg", ".50 calibre; one M2 is heard round by round"],
      ["Twin 3in/50 Mk 33", "shell", 76.2, "gun", "naval", "inches"],
      ["4 cm Flak L/70 Bofors, towed", "missile", 40, "gun", "revolver", "centimetres, and a gun fired as a missile"],
      ["30mm GAU-8/A", "bomb", 30, "gun", "rotary", "an A-10's gun, strafing as proj bomb"],
      ["2 x 23mm NS-23 cannon", "bomb", 23, "gun", null, ""],
      ["23mm cannon", "missile", 23, "gun", null, ""],
      ["2 cm Zwillingsflak Rh 202, towed", "missile", 20, "gun", null, "\"towed\" is not a TOW"],
      ["45mm M-42 towed gun", "missile", 45, "gun", null, "a calibre and nothing that flies"],
      ["4 x 20mm and T-10 rockets", "bomb", 20, "gun", null, "the guns are listed first"],
      ["30mm six-barrel", "shell", 30, "gun", "rotary", ""],
      ["2 x twin 30mm AK-230", "shell", 30, "gun", "rotary", "two twin mounts at 2000 rpm each fuse"],
      ["AIM-9L Sidewinder and 20 mm M61 (F-4F)", "missile", null, "missile", "aam", "the missile is named first"],
      ["Matra R.530 and 2x30mm DEFA 552A", "missile", null, "missile", null, "the missile is named first"],
      ["40mm PG-7 series HEAT rocket", "missile", 40, "rocket", "rpg", "the rocket's own calibre is not a gun"],
      ["66mm disposable shaped-charge rocket", "missile", 66, "rocket", "rpg", "the M72 LAW"],
      ["M20 3.5in rocket launcher", "missile", 88.9, "rocket", "rpg", "the super bazooka"],
      ["M40A1 106mm RCL", "missile", 106, "gun", "recoilless", ""],
      ["8 x Kh-35 SSM", "shell", null, "missile", "ashm", "a missile moved as a shell"],
      ["8 x P-270 Moskit", "shell", null, "missile", "ashm", ""],
      ["90-96 cell Mk 41 VLS with SM-2/ESSM/Tomaha", "shell", null, "missile", "sam", ""],
      ["V-750 command-guided SAM", "missile", null, "missile", "sam", "a damage-sized bore does not make it shoulder-fired", { tgt: { air: 1, ground: 0 }, dmg: 30 }],
      ["AKD-10 anti-tank missile", "missile", null, "missile", "asm", "the name outranks a cruise profile", { profile: "cruise" }],
      ["Dipping sonar and one AT-1 torpedo", "arc", null, "torpedo", "lwt", "the torpedo it drops"],
      ["Nulka / chaff decoy", "none", null, "decoy", "decoy", "a decoy launcher is not a CIWS"],
      ["20mm CIWS", "none", 20, "ciws", "rotary", ""],
      ["12 x 227mm rockets", "arc", 227, "rocket", "mlrs", ""],
      ["12 x 227 mm MARS (M270)", "arc", 227, "rocket", "mlrs", "MARS is a rocket system"],
    ];
    cases.forEach(function (c) {
      var d = row(c[0], c[1], c[6]);
      var ok = d.kind === c[3] && (c[2] === null || Math.abs(d.bore_mm - c[2]) < 0.05) && (c[4] === null || d.fam === c[4]);
      check("reads \"" + c[0] + "\" (" + c[1] + ") as " + c[3] + (c[4] ? "/" + c[4] : "") + (c[2] ? " " + c[2] + " mm" : "") + (c[5] ? " - " + c[5] : ""),
            ok, "got " + d.kind + "/" + d.fam + " " + d.bore_mm + " mm");
    });
    var lb = row("1,000 lb retarded bombs", "bomb");
    check("reads \"1,000 lb\" as a thousand pounds, not zero", lb.kind === "bomb" && lb.bore_mm > 300, "bore " + lb.bore_mm);
    var a = S.describe({ id: "atgm_inf", name: "FGM-148 Javelin", proj: "missile", dmg: 130, warhead: "heat" });
    var b = S.describe({ id: "atgm_inf", name: "9M133 Kornet", proj: "missile", dmg: 150, warhead: "heat" });
    check("rows sharing a template id keep their own fingerprint", a.fam !== b.fam, a.fam + " vs " + b.fam);
    var g1 = S.describe({ name: "30mm GSh-30-2", proj: "bullet", dmg: 28, warhead: "cannon", burst: 14, burstDelay: 0.045 });
    var g2 = S.describe({ name: "30mm GSh-30-2", proj: "bomb", dmg: 28, warhead: "cannon", burst: 2, burstDelay: 0.35 });
    check("rows named alike keep their own burst (" + g1.voice_s + " s vs " + g2.voice_s + " s)", g1.voice_s !== g2.voice_s);
    /* every row in the game, near and far */
    var ctx = S.ctx, n = 0, zero = [], most = 0, mostId = "";
    warns.length = 0;
    for (var id in WEAPONS) {
      if (!WEAPONS[id]) continue;
      [CAM, FAR].forEach(function (p) {
        ctx.__jump(3.0);
        var n0 = ctx.__stats().nodes;
        S.weapon(WEAPONS[id], p.x, p.y); n++;
        var dn = ctx.__stats().nodes - n0;
        if (dn === 0) zero.push(id);
        if (dn > most) { most = dn; mostId = id; }
      });
    }
    check("all " + n + " calls (every WEAPONS row, near and far) build a report, no warnings, at most 24 nodes",
          zero.length === 0 && warns.length === 0 && most <= 24,
          zero.length + " silent (" + zero.slice(0, 3).join(", ") + "), " + warns.length + " warnings " + (warns[0] || "") + ", max " + most + " (" + mostId + ")");
  })();

  /* ---------------------------------------------- the rows and their marks --- */
  /* id, pos, HEAD nodes (0: not in HEAD's catalogue), max nodes, buffer
     sources, peak floor, peak ceiling, loudest-400 ms target (+-2 LU), and
     per-row marks: bass = 30-150 Hz floor (dB), hi = >8 kHz in the first
     20 ms floor (dB). Produced by "measure" and checked in. */
  var TABLE = [
    ["rifle", "near", 15, 10, 3, -12.0, -7.5, -35.6, {"hi":-61.1}],
    ["rifle", "far", 16, 12, 2, -45.4, -40.9, -68.9],
    ["w_e60_pact_rifle", "near", 22, 10, 3, -11.4, -6.9, -34.5, {"hi":-60.5}],
    ["lmg", "near", 19, 10, 3, -14.3, -9.8, -36.3, {"hi":-63.3}],
    ["lmg", "far", 20, 12, 2, -45.8, -41.3, -68.9],
    ["hmg", "near", 19, 12, 3, -14.3, -9.8, -34.9, {"hi":-64}],
    ["hmg", "far", 20, 14, 2, -45.0, -40.5, -65.5],
    ["sniper", "near", 19, 12, 3, -11.9, -7.4, -32.3, {"hi":-61.2}],
    ["w_e80_kpa_ifv", "near", 19, 12, 3, -14.2, -9.7, -35.6, {"hi":-64.6}],
    ["chaingun", "near", 19, 14, 3, -17.0, -12.5, -33.5],
    ["chaingun", "far", 20, 14, 2, -40.2, -35.7, -58.6],
    ["spaag", "near", 22, 14, 3, -17.8, -13.3, -31.9],
    ["gun_light", "near", 16, 17, 5, -10.4, -5.9, -22.8, {"bass":-33.8}],
    ["gun_105", "near", 16, 17, 5, -7.8, -3.3, -18.4, {"bass":-28.2}],
    ["gun_120", "near", 16, 17, 5, -7.9, -3.4, -19.0, {"bass":-28.2}],
    ["gun_120", "far", 20, 19, 4, -14.2, -9.7, -26.3, {"bass":-35.3}],
    ["gun_125", "near", 16, 17, 5, -6.6, -2.1, -16.1, {"bass":-24.2}],
    ["aagun_dp127", "near", 22, 19, 5, -6.1, -1.6, -15.9, {"bass":-24.6}],
    ["coast_gun", "near", 16, 19, 5, -6.6, -2.1, -16.0, {"bass":-23.9}],
    ["coast_gun", "far", 20, 19, 4, -8.6, -4.1, -21.8, {"bass":-29.8}],
    ["howitzer105", "near", 24, 17, 5, -5.2, -1.0, -16.2, {"bass":-24.5}],
    ["pzh2000_l52", "near", 24, 17, 5, -5.4, -1.0, -15.5, {"bass":-23.5}],
    ["pzh2000_l52", "far", 22, 19, 4, -9.4, -4.9, -20.3, {"bass":-28.5}],
    ["navgun_203", "near", 24, 17, 5, -4.6, -1.0, -12.9, {"bass":-20.5}],
    ["mortar", "near", 24, 15, 3, -11.1, -6.6, -23.7, {"bass":-32.3}],
    ["mortar", "far", 22, 19, 3, -20.6, -16.1, -33.8],
    ["spectre20", "near", 19, 9, 2, -16.4, -11.9, -26.0],
    ["spectre20", "far", 20, 13, 2, -37.0, -32.5, -48.5],
    ["ciws", "near", 7, 9, 2, -16.8, -12.3, -27.9],
    ["gau8", "near", 19, 9, 2, -16.4, -11.9, -26.3],
    ["w_e00_nato_cas", "near", 0, 9, 2, -15.3, -10.8, -25.8],
    ["atgm_veh", "near", 15, 12, 3, -19.5, -15.0, -25.9],
    ["atgm_veh", "far", 19, 16, 3, -29.4, -24.9, -39.6],
    ["atgm_inf", "near", 15, 14, 4, -14.5, -10.0, -26.0],
    ["manpad", "near", 15, 14, 4, -17.2, -12.7, -28.2],
    ["w_e90_fra_aa", "near", 15, 14, 4, -18.3, -13.8, -29.0],
    ["sam_site", "near", 15, 12, 3, -14.7, -10.2, -23.0],
    ["ssm", "near", 15, 14, 3, -10.4, -5.9, -21.0],
    ["ssm_granit", "near", 15, 14, 3, -10.9, -6.4, -19.5],
    ["srbm_scud", "near", 15, 12, 3, -7.0, -2.5, -17.7],
    ["slbm_f", "near", 15, 17, 4, -6.7, -2.2, -17.5],
    ["w_e60_kpa_at", "near", 18, 18, 5, -14.8, -10.3, -29.1],
    ["w_e60_kpa_at", "far", 22, 20, 4, -30.3, -25.8, -43.7],
    ["w_e80_nato_mlrs", "near", 18, 12, 3, -9.5, -5.0, -22.1],
    ["w_e80_nato_mlrs", "far", 22, 16, 3, -25.2, -20.7, -38.2],
    ["torpedo", "near", 12, 14, 2, -8.5, -4.0, -23.9],
    ["asw_mk54", "near", 12, 14, 2, -11.0, -6.5, -24.0],
    ["depthchg", "near", 12, 7, 2, -8.9, -4.4, -27.9],
    ["ironbombs", "near", 4, 6, 1, -23.6, -19.1, -33.6],
    ["jdam_hvy", "near", 4, 6, 1, -23.1, -18.6, -33.6],
    ["decoy_chaff", "near", 7, 9, 3, -26.3, -21.8, -32.2],
    ["cue:shot", "ui", 19, 10, 3, -16.5, -12.0, -38.4],
    ["cue:cannon", "ui", 16, 17, 5, -9.8, -5.3, -21.7],
    ["cue:missile", "ui", 15, 12, 3, -19.1, -14.6, -27.8],
  ];
  var measured = {};
  TABLE.forEach(function (r) {
    var id = r[0], pos = r[1], x = shot(id, pos, "chk_" + id + "_" + pos);
    measured[id + ":" + pos] = x;
    if (MEASURE) return;
    var tag = id + " " + pos, sr = x.sr, mk = r[8] || {};
    /* exact: every node is a layer or its filter, so one fewer is a layer lost */
    check(tag + ": " + x.nodes + " nodes = " + r[3] + (r[2] ? " (HEAD " + r[2] + ", 1.5x = " + Math.floor(r[2] * 1.5) + ")" : ""),
          x.nodes === r[3] && (!r[2] || x.nodes <= Math.floor(r[2] * 1.5)));
    check(tag + ": " + x.src + " layers (buffer sources) = " + r[4], x.src === r[4]);
    check(tag + ": peak " + f1(x.peak) + " dBFS in " + f1(r[5]) + " .. " + f1(Math.min(r[6], -1)), x.peak >= r[5] && x.peak <= Math.min(r[6], -1));
    check(tag + ": loudest 400 ms " + f1(x.mmax) + " LUFS in " + f1(r[7] - 2) + " .. " + f1(r[7] + 2), Math.abs(x.mmax - r[7]) <= 2);
    /* one report must not lean on the limiter: a big gun's bass pushed one
       203 mm shot to 4-5 dB of gain reduction, ducking everything else */
    check(tag + ": the limiter takes at most 1 dB off one report (" + f1(x.gr) + " dB)", x.gr >= -1.0);
    if (mk.bass !== undefined) {
      var b = bandDb(x.M, sr, 30, 150), u = bandDb(x.M, sr, 0, 30);
      check(tag + ": 30-150 Hz " + f1(b) + " dB >= " + f1(mk.bass) + ", under 30 Hz " + f1(u) + " dB at least 8 dB below it", b >= mk.bass && u <= b - 8);
    }
    if (mk.hi !== undefined) {
      var h = bandDb(x.M, sr, 8000, 0, x.on, x.on + Math.round(0.02 * sr));
      check(tag + ": crack, >8 kHz in the first 20 ms " + f1(h) + " dB >= " + f1(mk.hi), h >= mk.hi);
    }
    check(tag + ": no Sfx warnings or unemulated calls", x.warns.length === 0, x.warns.join("; "));
    if (x.d) {
      var far = pos === "far" ? FARF : 0, dl = pos === "far" ? FARD : 0;
      var vEnd = x.d.voice_s * (1 + 0.7 * far) + dl + 0.25 + 0.002, slack = busDelays ? 0.25 : 0;
      check(tag + ": its voice (" + f1(vEnd * 1000) + " ms) outlasts the render to -60 dB (" + f1(x.end / sr * 1000) + " ms" + (slack ? ", less the bus's reflections" : "") + ")",
            x.end / sr <= vEnd + slack + 0.01);
    }
  });
  if (MEASURE) {
    var HEADN = { rifle: [15, 16], w_e60_pact_rifle: [22, 20], lmg: [19, 20], hmg: [19, 20], w_e80_kpa_ifv: [19, 20], sniper: [19, 20],
                  spectre20: [19, 20], chaingun: [19, 20], spaag: [22, 20], gun_light: [16, 20], gun_105: [16, 20], gun_120: [16, 20],
                  gun_125: [16, 20], aagun_dp127: [22, 20], coast_gun: [16, 20], mortar: [24, 22], howitzer105: [24, 22],
                  pzh2000_l52: [24, 22], navgun_203: [24, 22], w_e60_kpa_at: [18, 22], w_e80_nato_mlrs: [18, 22],
                  w_e90_fra_aa: [15, 19], atgm_veh: [15, 19], sam_site: [15, 19], ssm_granit: [15, 19], srbm_scud: [15, 19],
                  slbm_f: [15, 19], asw_mk54: [12, 16], torpedo: [12, 16], depthchg: [12, 16], ironbombs: [4, 8], jdam_hvy: [4, 8],
                  ciws: [7, 11], decoy_chaff: [7, 11], "cue:shot": [19], "cue:cannon": [16], "cue:missile": [15],
                  gau8: [19, 20], w_e00_nato_cas: [4, 8], atgm_inf: [15, 19], manpad: [15, 19], ssm: [15, 19] };
    TABLE.forEach(function (r) {
      var x = measured[r[0] + ":" + r[1]], mk = r[8] || {}, out = {}, sr = x.sr;
      if (mk.bass !== undefined) out.bass = +f1(bandDb(x.M, sr, 30, 150) - 2);
      if (mk.hi !== undefined) out.hi = +f1(bandDb(x.M, sr, 8000, 0, x.on, x.on + Math.round(0.02 * sr)) - 2.5);
      var hn = HEADN[r[0]] ? HEADN[r[0]][r[1] === "far" ? 1 : 0] : 0;
      var mx = Math.max(x.nodes, 0);
      print("    [" + JSON.stringify(r[0]) + ", " + JSON.stringify(r[1]) + ", " + hn + ", " + mx + ", " + x.src + ", " +
            f1(x.peak - 3) + ", " + f1(Math.min(-1, x.peak + 1.5)) + ", " + f1(x.mmax) + (Object.keys(out).length ? ", " + JSON.stringify(out) : "") + "],");
    });
  }

  /* ------------------------------------------------------------ SHAPE --- */
  function measuredOr(id, pos) { return measured[id + ":" + pos] || shot(id, pos, "chk_" + id + "_" + pos); }
  (function () {
    if (MEASURE) return;
    /* the roar falls as the round leaves: the first quarter of the report is
       brighter than its second half */
    /* windows on the motor itself: the first 150 ms within 3 dB of its
       loudest (full thrust), then the second half of the way from there
       down to 30 dB under it (going away) */
    ["atgm_veh", "atgm_inf", "sam_site", "srbm_scud", "w_e80_nato_mlrs"].forEach(function (id) {
      var x = measuredOr(id, "near"), fr = Math.round(0.05 * x.sr), rms = [], k, e, j, best = 0, kb = 0;
      for (k = 0; (k + 1) * fr <= x.M.length; k++) {
        for (e = 0, j = k * fr; j < (k + 1) * fr; j++) e += x.M[j] * x.M[j];
        rms.push(e); if (e > best && k * fr > x.on + 0.03 * x.sr) { best = e; kb = k; }
      }
      for (k = 0; k < rms.length; k++) if (k * fr > x.on + 0.03 * x.sr && rms[k] >= best * 0.5) { kb = k; break; }
      var ke = kb; while (ke < rms.length - 1 && rms[ke] > best * 0.001) ke++;
      var k1 = kb + Math.round((ke - kb) / 2);
      var c1 = centroid(x.M, x.sr, kb * fr, (kb + 3) * fr), c2 = centroid(x.M, x.sr, k1 * fr, (ke + 1) * fr);
      check(id + " near: the roar falls as it leaves - " + Math.round(c1) + " Hz at full thrust, " + Math.round(c2) + " Hz going away (at most 0.8x)", c2 <= 0.8 * c1);
    });
    /* the mortar's tube: its quarter-wave note (40-90 Hz for an 81 mm)
       stands over the rest of the first 0.4 s (+2.4 to +4.4 dB with the tube
       ringing, -2.4 to +0.9 dB without it, over three seeds) */
    var mo = measuredOr("mortar", "near"), i0 = mo.on, i1 = mo.on + Math.round(0.4 * mo.sr);
    var tube = bandDb(mo.M, mo.sr, 40, 90, i0, i1), rest = bandDb(mo.M, mo.sr, 150, 4000, i0, i1);
    check("mortar near: the tube note (40-90 Hz, " + f1(tube) + " dB) stands 1.5 dB over 150 Hz-4 kHz (" + f1(rest) + " dB)", tube >= rest + 1.5);
    /* no dead air inside a launch: outdoors a bang is never followed by
       digital silence. RPG-7 bang to motor, SLBM eject to breach, bomb clack
       to rush: the quietest stretch stays within reach of the peak (measured
       -33 / -43 / -59 dB with the bridging layer, -289 / -296 / -96 dB
       without it) */
    [["w_e60_kpa_at", 0.015, 0.12, 0.005, -45], ["slbm_f", 0.1, 0.95, 0.05, -55], ["ironbombs", 0.08, 0.6, 0.02, -70]].forEach(function (g) {
      var x = measuredOr(g[0], "near"), sr = x.sr, w = Math.round(g[3] * sr), pk = 0, lo = Infinity, i, a;
      for (i = 0; i < x.M.length; i++) pk = Math.max(pk, Math.abs(x.M[i]));
      for (a = x.on + Math.round(g[1] * sr); a + w <= x.on + Math.round(g[2] * sr); a += Math.round(w / 2)) {
        var e = 0; for (i = a; i < a + w; i++) e += x.M[i] * x.M[i];
        lo = Math.min(lo, 10 * Math.log(e / w + 1e-30) / Math.LN10 - 20 * Math.log(pk) / Math.LN10);
      }
      check(g[0] + " near: no dead air between " + g[1] + " and " + g[2] + " s - quietest " + (g[3] * 1000) + " ms at " + f1(lo) + " dB re peak (>= " + g[4] + ")", lo >= g[4]);
    });
    /* far is duller than near */
    ["rifle", "lmg", "chaingun", "gun_120", "pzh2000_l52", "spectre20", "atgm_veh", "w_e80_nato_mlrs", "w_e60_kpa_at"].forEach(function (id) {
      var a = measuredOr(id, "near"), b = measuredOr(id, "far");
      var ca = centroid(a.M, a.sr, a.on, a.end), cb = centroid(b.M, b.sr, b.on, b.end);
      check(id + ": far (" + Math.round(cb) + " Hz) is duller than near (" + Math.round(ca) + " Hz) by 0.8x or more", cb <= 0.8 * ca);
    });
  })();

  /* ------------------------------------------------------------ BURSTS --- */
  (function () {
    if (MEASURE) return;
    var S = fresh("bursts"), ctx = S.ctx;
    function fire(w, x, y) { var n0 = ctx.__stats().nodes; S.weapon(w, x, y); return ctx.__stats().nodes - n0; }
    function wait(sec) { ctx.__renderTo(ctx.currentTime + sec); }
    var g = WEAPONS.gau8;
    var a = fire(g, 2000, 2000);
    var cont = 0;
    for (var i = 0; i < 13; i++) { wait(0.045); cont += fire(g, 2000 + i, 2000); }
    check("GAU-8: the first round of a burst builds the whole report (" + a + " nodes)", a > 0);
    check("GAU-8: the 13 rounds that follow from the same gun build nothing", cont === 0, cont + " nodes");
    var b = fire(g, 2400, 2000);
    check("GAU-8: a second A-10 300 px away gets its own burst", b > 0, b + " nodes");
    wait(1.6);
    var c = fire(g, 2000, 2000);
    check("GAU-8: the next burst, after the reload, is heard", c > 0, c + " nodes");
    var l = WEAPONS.lmg;
    wait(1.5);
    var l1 = fire(l, 2000, 2000);
    wait(0.010);
    var l2 = fire(l, 2000, 2000);
    wait(0.050);
    var l3 = fire(l, 2000, 2000);
    check("GPMG: every round is its own report, with HEAD's 22 ms gap kept", l1 > 0 && l2 === 0 && l3 > 0, l1 + " / " + l2 + " / " + l3);

    /* a first round refused a voice must not hold the burst: fill the table
       with nearer reports, fire a far GAU-8 burst into it, and the rounds
       after the table frees up are heard */
    var S2 = fresh("refused"), c2 = S2.ctx;
    for (var k = 0; k < 22; k++) S2.weapon({ id: "fill" + k, name: "5.56mm rifle", proj: "bullet", dmg: 11, warhead: "bullet" }, CAM.x + k, CAM.y);
    var heard = [], full = S2.stats().voices;
    for (var r = 0; r < 14; r++) {
      var n0 = c2.__stats().nodes;
      S2.weapon(g, FAR.x, FAR.y);
      heard.push(c2.__stats().nodes - n0 > 0 ? 1 : 0);
      c2.__renderTo(c2.currentTime + 0.045);
    }
    check("GAU-8 fired into a full voice table (" + full + " voices): refused while it is full, heard once they free up (" + heard.join("") + ")",
          full === 22 && heard[0] === 0 && heard.indexOf(1) > 0);
  })();

  /* sustained fire on the game's own schedule, on its ticks: a burst every
     reload / VET_ROF, its rounds burstDelay apart, each landing on the first
     simulation tick at or after its time (game.js G.defer), all in game
     seconds at Game.speed */
  function sustained(id, rof, speed, dur) {
    var S = fresh("sust_" + id + "_" + rof + "_" + speed, speed), ctx = S.ctx, w = WEAPONS[id];
    var DT = CFG.DT, q = function (t) { return Math.ceil(t / DT - 1e-6) * DT; };
    var n = w.burst || 1, bd = q(w.burstDelay || 0.1), cd = q(w.reload / rof), ev = [], reports = 0, most = 0;
    var bursts = 0;
    for (var t = 0; t < dur * speed; t += cd) { if (0.05 + t / speed <= dur) bursts++; for (var k = 0; k < n; k++) ev.push(t + k * bd); }
    ev.sort(function (a, b) { return a - b; });
    var first = 0.05 + ev[0] / speed, last = first;
    for (var i = 0; i < ev.length; i++) {
      var rt = 0.05 + ev[i] / speed;
      if (rt > dur) break;
      ctx.__renderTo(rt);
      var n0 = ctx.__stats().nodes;
      S.weapon(w, 2048, 2048);
      if (ctx.__stats().nodes > n0) reports++;
      most = Math.max(most, S.stats().voices);
      last = rt;
    }
    ctx.__renderTo(dur + 1.5);
    var o = ctx.__output(), sr = o.sampleRate, win = Math.round(sr * 0.25), lows = [];
    for (var a = Math.round(first * sr); a + win <= Math.round((last + 0.1) * sr); a += win) {
      var e = 0; for (var j = a; j < a + win; j++) e += o.L[j] * o.L[j];
      lows.push(10 * Math.log(e / win + 1e-20) / Math.LN10);
    }
    return { reports: reports, rounds: ev.length, bursts: bursts, lowest: Math.min.apply(null, lows), voices: most };
  }
  (function () {
    if (MEASURE) return;
    var v = sustained("spectre20", 1, 1, 4);
    check("AC-130 Vulcan battery firing without a break for 4 s: no 250 ms window under -40 dBFS (lowest " + f1(v.lowest) + ")", v.lowest > -40);
    check("AC-130 Vulcan battery: " + v.reports + " reports carry it, at most 5 voices at once (" + v.voices + ")", v.reports <= 16 && v.voices <= 5);
    /* a 14-round GAU-8 burst lands on the ticks two apart, 0.87 s, not the
       0.59 s its burstDelay says: still one report, not one and a restart */
    var gb = sustained("gau8", 1, 1, 1.2);
    check("GAU-8's 14-round burst on the game's ticks (" + gb.rounds + " rounds in " + gb.bursts + " burst) is one report (" + gb.reports + ")",
          gb.bursts === 1 && gb.reports === 1);
    /* a veteran's passes run into each other, and 2x/3x game speed crowds
       them: each pass is still one report, and none is swallowed */
    [[1, 1], [1.18, 1], [1, 2], [1, 3]].forEach(function (c) {
      var a = sustained("w_e00_nato_cas", c[0], c[1], 4);
      check("A-10 GAU-8 at rate x" + c[0] + ", " + c[1] + "x game speed: every one of its " + a.bursts + " passes heard, one report each (" + a.reports + ")",
            a.reports === a.bursts);
    });
  })();

  /* ------------------------------------------------------------- CLOCK --- */
  (function () {
    if (MEASURE) return;
    function lastLoud(id, speed, dbUnder) {
      var x = shot(id, "near", "clock_" + id, speed), thr = Math.pow(10, (x.peak - dbUnder) / 20), i = x.M.length - 1;
      while (i > 0 && Math.abs(x.M[i]) < thr) i--;
      return i / x.sr;
    }
    function firstLoudAfter(id, speed, after, dbUnder) {
      var x = shot(id, "near", "clock_" + id, speed), thr = Math.pow(10, (x.peak - dbUnder) / 20), i = Math.round(after * x.sr);
      while (i < x.M.length && Math.abs(x.M[i]) < thr) i++;
      return i / x.sr;
    }
    var b1 = lastLoud("ironbombs", 1, 30), b2 = lastLoud("ironbombs", 2, 30);
    check("a bomb's fall follows the game clock: its rush ends at " + f1(b1 * 1000) + " ms at 1x, " + f1(b2 * 1000) + " ms at 2x",
          b1 > 0.6 && b1 < 0.8 && b2 > 0.28 && b2 < 0.42);
    var s1 = firstLoudAfter("slbm_f", 1, 0.3, 12), s2 = firstLoudAfter("slbm_f", 2, 0.3, 12);
    check("an SLBM lights at the breach combat.js times (1.05 game s): " + f1(s1 * 1000) + " ms at 1x, " + f1(s2 * 1000) + " ms at 2x",
          s1 > 0.95 && s1 < 1.2 && s2 > 0.45 && s2 < 0.65);
  })();

  print("==== " + passed + " passed, " + failed + " failed ====");
  if (failed && !MEASURE) throw new Error(failed + " check(s) failed");
})();
