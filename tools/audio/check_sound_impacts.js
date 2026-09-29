/* ============ tools/audio/check_sound_impacts.js - impacts, blasts and the bus, held to account ============

   run
       jsc tools/audio/check_sound_impacts.js -- ROOT [--measure] [--battle-wav FILE]
   ROOT is the game tree (the directory holding index.html). Exit status 0
   and a last line "check_sound_impacts: PASS" when every rule holds; any
   broken rule prints FAIL with the number that broke it, and the run ends
   on an uncaught error - jsc's quit() ignores its argument, a throw exits 3.
   --measure prints every figure without judging it (for re-baselining after
   a deliberate change); --battle-wav writes the battle mix as 16-bit stereo.

   WHY THIS EXISTS. tools/jsc/run.py replaces Sfx with a no-op, so the game
   suites cannot hear a thing. This renders through tools/audio/webaudio_emu.js
   exactly as tools/audio/driver.js does (the page's own scripts first, then
   js/audio.js untouched, every sound through the public Sfx surface, seeded
   by the catalogue's own names so its figures match the catalogue's) and
   checks the contract the sound_impacts redesign was built to. "HEAD" below
   is js/audio.js as it stood before the redesign (c437f8a, unchanged at
   6bad888); its figures are quoted so a reader can see what moved.

     NODE BUDGET   no Sfx.impact / Sfx.boom / named-cue call may create more
                   than 1.5x the nodes HEAD did for the same call. Counted over
                   six seeds per case, since a ricochet whine is a chance and
                   costs nodes when it happens.
     LOUDNESS      each material and blast stays inside its band (BS.1770
                   integrated, as tools/audio/analysis.js computes it): the
                   designed level +-2 LU, +-1.5 for small-arms rounds (e 0.1,
                   the hits a battle is mostly made of). The designed level
                   sits within a few LU of HEAD except where the owner asked
                   for more ("i don't see damaged effect so far": armour).
     PEAK CEILING  one sound alone peaks under -1.0 dBFS (an impact) or -0.9
                   (a blast or cue) and never drives the -9 dB limiter by more
                   than 1 dB (impact) or 2 dB (blast); a shell bursting on a
                   hull - its blast and its impact together - by no more than
                   1.5 dB, with no more of its samples past SAT (below) than
                   the battle is allowed.
     SATURATION    what "clipping" means on this bus. Nothing reaches full
                   scale: the soft clipper and the 0.92 output trim cap it
                   at -0.72 dBFS. Worked through its static curve, the
                   limiter (-9 dB, 20:1, +5.13 dB makeup) and clipper deliver
                   0.803 for a 0 dBFS input and 0.844 for +20 dBFS - so a
                   sample over 0.80 only says the limiter is holding, and a
                   sample over SAT = 0.86 is a transient that got past the
                   limiter's 2 ms attack and is being rounded by the clipper.
     LAPTOP        the owner listens on a laptop, which plays little under
                   200 Hz. For every blast and the blast cues, the loudest
                   400 ms through a 200 Hz high-pass (two 2nd-order sections)
                   may not fall more than 0.5 dB under HEAD's (nor 1.5 dB
                   under the design, which sits 2-4 dB over HEAD), and the band
                   under 100 Hz (two 2nd-order 100 Hz low-passes) may not
                   rise more than 15 dB over HEAD's: a 40-80 Hz thump is the
                   point, a thump that is all a blast is, is not. Small-arms
                   hits on earth, concrete, flesh and armour keep at least
                   HEAD's energy above 200 Hz, and their centroid where a
                   small speaker (and the ear in a battle full of sub) finds
                   it.
     FELT          a main-gun hit on armour (e 0.2-0.46 in play) stays at least
                   2.5 LU above HEAD's and keeps its centroid above 350 Hz, in
                   the band a tank gun's own report leaves empty (a 120 mm
                   report's centroid is 113 Hz); with its blast (the 120 mm
                   case) the clang lifts the event above 200 Hz by 5 dB or
                   more over HEAD's.
     PING          twelve rounds of HMG fire on a tank, each rendered alone
                   from its own seed: every one a ping (centroid over 1 kHz,
                   loudness in band), and between 2 and 8 of them carrying an
                   audible ricochet whine (energy 0.2-0.5 s after the hit
                   within 50 dB of its first 100 ms; the design is about 40%),
                   none louder than 22 dB under the ping.
     PAIRING       a shell bursting on a hull arrives as Sfx.boom then
                   Sfx.impact in the same tick; the plate adds its ring, not
                   a second crack and thud (counted in nodes: at least 5 fewer
                   than the same impact alone). A lone e above 0.5 on metal is an
                   anti-materiel rifle round: it plays as the HMG's cartridge
                   does (within 3 LU of the HMG ping) and at least 6 LU under
                   a 105 mm round on the same tank.
     LIFETIME      every sound is 60 dB down before audio.js's voice reaper
                   disconnects it: impact() books 1.0 s, boom() 2.4 s, a
                   diegetic cue 3.0 s, each plus the arrival delay and 0.25 s.
                   A tail past that is cut off in the game, not in a render.
     BATTLE        five seconds of a dense exchange - three MG teams, four tank
                   guns, a howitzer battery, ATGMs, a torpedo, intercepts, unit
                   deaths - through the real bus with its 22-voice limit, and
                   the same with eight more 105 mm howitzer rounds landing on
                   armour: no sample at full scale, the sample peak under
                   -0.8 dBFS, under 0.02% of samples past SAT, the limiter
                   never pulling more than 2.5 dB (HEAD: 0.7 and 0.8 dB),
                   never more than the 22 voices allowed, and nothing
                   throwing.
   ========================================================================= */

var __ARGS = (typeof arguments !== "undefined") ? arguments : [];
(function () {
  "use strict";
  var ROOT = __ARGS[0];
  var MEASURE = Array.prototype.indexOf.call(__ARGS, "--measure") >= 0;
  var wi = Array.prototype.indexOf.call(__ARGS, "--battle-wav");
  var BATTLE_WAV = wi >= 0 ? __ARGS[wi + 1] : null;
  if (!ROOT) throw new Error("usage: jsc tools/audio/check_sound_impacts.js -- ROOT [--measure] [--battle-wav FILE]");
  load(ROOT + "/tools/audio/webaudio_emu.js");
  load(ROOT + "/tools/audio/analysis.js");
  globalThis.__IDS = {}; globalThis.__HASH = ""; globalThis.__SEARCH = ""; globalThis.__QUIET_CONSOLE = true;
  load(ROOT + "/tools/jsc/env.js");
  WebAudioEmu.install(globalThis);
  var perfOff = 0;
  performance.now = function () { return preciseTime() * 1000 + perfOff; };
  var warns = [];
  console.warn = function () { warns.push(Array.prototype.join.call(arguments, " ")); };
  console.error = console.warn;
  var html = read(ROOT + "/index.html");
  var re = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi, m;
  while ((m = re.exec(html))) {
    var src = m[1].split("?")[0];
    if (/(^|\/)audio\.js$/.test(src)) break;
    try { load(ROOT + "/" + src); } catch (e) { print("[check] load error " + src + ": " + e); }
  }
  var CAM = { x: 2048, y: 2048, z: 1 };
  globalThis.Render = { cam: CAM };
  var FAR = { x: CAM.x + 360, y: CAM.y - 600 };          // driver.js's "far": 560 m
  var AUDIO = ROOT + "/js/audio.js";

  function seedRandom(str) {                              // driver.js's seeding, so figures match the catalogue
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
  function fresh(seed) {
    seedRandom(seed); warns.length = 0;
    load(AUDIO);
    Sfx.ensure();
    return Sfx;
  }
  function f1(x) { return (x === null || x === undefined || !isFinite(x)) ? "-" : x.toFixed(1); }

  /* the loudest 400 ms (100 ms hop) of the mono sum through two cascaded
     2nd-order (Q 0.707) high- or low-passes: what a laptop plays, and what
     it cannot */
  function biq(x, hp, f0) {
    var w0 = 2 * Math.PI * f0 / 48000, al = Math.sin(w0) / (2 * Math.SQRT1_2), c = Math.cos(w0), a0 = 1 + al;
    var b0 = (hp ? (1 + c) / 2 : (1 - c) / 2) / a0, b1 = (hp ? -(1 + c) : 1 - c) / a0, b2 = b0, a1 = -2 * c / a0, a2 = (1 - al) / a0;
    var y = new Float64Array(x.length), x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (var i = 0; i < x.length; i++) { var v = x[i], o = b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = v; y2 = y1; y1 = o; y[i] = o; }
    return y;
  }
  function loudest400(y) {
    var win = 19200, best = 1e-20;
    for (var s = 0; s + win <= Math.max(win, y.length); s += 4800) {
      var e = 0; for (var i = s; i < Math.min(y.length, s + win); i++) e += y[i] * y[i];
      if (e / win > best) best = e / win;
    }
    return 10 * Math.log(best) / Math.LN10;
  }
  function bands(L, R) {
    var mono = new Float64Array(L.length);
    for (var i = 0; i < L.length; i++) mono[i] = (L[i] + R[i]) / 2;
    return { hp: loudest400(biq(biq(mono, true, 200), true, 200)), lp: loudest400(biq(biq(mono, false, 100), false, 100)) };
  }

  var fails = 0, checks = 0, SAT = 0.86;
  function judge(ok, what) {
    checks++;
    if (MEASURE) return;
    if (!ok) { fails++; print("FAIL  " + what); }
  }

  /* one event, rendered alone through the full bus */
  function measure(seed, fire) {
    var S = fresh(seed), ctx = S.ctx, st0 = ctx.__stats();
    fire(S);
    var nodes = ctx.__stats().nodes - st0.nodes;
    ctx.__renderUntilQuiet(12, 0.4);
    var out = ctx.__output(0.05);
    var lv = AudioAnalysis.levels(out.L, out.R, out.sampleRate);
    var ld = AudioAnalysis.loudness(out.L, out.R, out.sampleRate);
    var sp = AudioAnalysis.spectrogram(out.L, out.R, out.sampleRate, { span: lv, rows: 64 });
    var knee = 0;
    for (var i = 0; i < out.length; i++) if (Math.abs(out.L[i]) > SAT || Math.abs(out.R[i]) > SAT) knee++;
    var bd = bands(out.L, out.R);
    return { nodes: nodes, peak: lv.peak_dbfs, lufs: ld.integrated, end60: lv.end60_ms, centroid: sp.centroid, hp: bd.hp, lp: bd.lp,
             gr: ctx.__limiterMinDb()[0], knee: knee, len: out.length, warn: warns.slice(), unsup: WebAudioEmu.unsupported.length };
  }
  /* node count only, over several seeds: the worst case is what the budget is for */
  function worstNodes(seedBase, fire) {
    var S = fresh(seedBase), ctx = S.ctx, worst = 0;
    for (var k = 0; k < 6; k++) {
      var st0 = ctx.__stats().nodes;
      fire(S);
      worst = Math.max(worst, ctx.__stats().nodes - st0);
      ctx.__jump(12); perfOff += 12000;
    }
    return worst;
  }
  function common(r, id, life, limMax, pkMax, kneeOk) {
    judge(r.gr >= -limMax, id + ": limiter pulled " + f1(-r.gr) + " dB alone (ceiling " + limMax + ")");
    judge(r.peak <= pkMax && kneeOk, id + ": peak " + f1(r.peak) + " dBFS, " + r.knee + " samples past SAT");
    judge(r.end60 <= life, id + ": still sounding at " + f1(r.end60) + " ms, the voice is reaped at " + life);
    judge(!r.warn.length && !r.unsup, id + ": Sfx warned " + r.warn.join("; "));
  }

  /* ---------------- impacts ----------------
     head: HEAD's node counts per call (near / far; far adds the spatial
     chain's two lowpasses, panner and delay), its worst case over the draw
     (rock far is 40, not the catalogue's 22: HEAD's grains above the 4.3 kHz
     air-absorption cut are skipped, so its far count swings); the ceiling is
     1.5x. Rows are [e, position, designed LUFS, HEAD LUFS]; small is the e 0.1
     near row's floors: its centroid, and HEAD's loudest 400 ms above 200 Hz,
     which it may not fall under. */
  var TOL = 2.0, TOL_SMALL = 1.5, LIM_MAX_IMP = 1.0, LIM_MAX_BOOM = 2.0, LIM_MAX_PAIR = 1.5, PK_IMP = -1.0, PK_BOOM = -0.9;
  var IMP = {
    earth:     { head: [25, 29], small: { c: 200, hp: -48.8 },
                 rows: [[0.1, "near", -28.3, -30.9], [0.1, "far", -46.7, -49.1], [0.25, "near", -24.7, -26.7], [0.9, "near", -18.7, -18.7], [0.9, "far", -27.5, -27.5]] },
    rock:      { head: [36, 40], small: null,
                 rows: [[0.1, "near", -35.1, -33.7], [0.1, "far", -53.8, -51.9], [0.25, "near", -31.2, -30.4], [0.9, "near", -23.5, -23.3], [0.9, "far", -33.2, -32.2]] },
    structure: { head: [40, 44], small: { c: 800, hp: -40.4 },
                 rows: [[0.1, "near", -29.6, -29.6], [0.1, "far", -49.1, -48.7], [0.25, "near", -27.1, -26.1], [0.9, "near", -18.4, -18.2], [0.9, "far", -27.3, -26.6]] },
    armour:    { head: [27, 31], small: { c: 1000, hp: -49.0 },
                 rows: [[0.1, "near", -34.5, -33.9], [0.1, "far", -50.9, -52.4], [0.25, "near", -24.9, -30.4], [0.9, "near", -32.5, -22.2], [0.9, "far", -40.8, -31.0]] },
    hull:      { head: [18, 22], small: null,
                 rows: [[0.1, "near", -29.5, -29.7], [0.1, "far", -45.4, -48.5], [0.25, "near", -25.6, -26.5], [0.9, "near", -28.7, -19.8], [0.9, "far", -34.9, -28.8]] },
    flesh:     { head: [16, 20], small: { c: 100, hp: -50.2 },
                 rows: [[0.1, "near", -36.3, -36.8], [0.1, "far", -55.1, -55.7], [0.25, "near", -33.6, -33.8], [0.9, "near", -27.6, -27.0], [0.9, "far", -36.1, -35.3]] },
    water:     { head: [30, 34], small: null,
                 rows: [[0.1, "near", -34.7, -35.6], [0.1, "far", -53.9, -51.7], [0.25, "near", -32.8, -32.5], [0.9, "near", -25.0, -24.8], [0.9, "far", -31.1, -32.1]] },
    air:       { head: [9, 13],  small: null,
                 rows: [[0.1, "near", -35.6, -34.4], [0.1, "far", -55.3, -53.1], [0.25, "near", -31.7, -31.0], [0.9, "near", -24.4, -24.4], [0.9, "far", -33.1, -32.6]] },
  };
  print("impacts       nodes worst(near/far) cap   LUFS by row: e.1 near / e.1 far / e.25 near / e.9 near / e.9 far   peak (max)  limGR (max)  end60 ms (max)  centroid e.1/e.25");
  var armourSmall = null;
  Object.keys(IMP).forEach(function (mat) {
    var d = IMP[mat];
    var capN = Math.floor(d.head[0] * 1.5), capF = Math.floor(d.head[1] * 1.5);
    var wn = 0, wf = 0;
    [0.05, 0.1, 0.25, 0.5, 0.9, 1.0].forEach(function (e) {
      wn = Math.max(wn, worstNodes("n_" + mat + e, function (S) { S.impact(mat, CAM.x, CAM.y, e); }));
      wf = Math.max(wf, worstNodes("f_" + mat + e, function (S) { S.impact(mat, FAR.x, FAR.y, e); }));
    });
    judge(wn <= capN, mat + ": " + wn + " nodes near > cap " + capN);
    judge(wf <= capF, mat + ": " + wf + " nodes far > cap " + capF);
    var rs = d.rows.map(function (row) {
      var e = row[0], pos = row[1], p = pos === "near" ? CAM : FAR;
      var id = "imp_" + mat + "_e" + Math.round(e * 100) + "_" + pos;
      var r = measure(id, function (S) { S.impact(mat, p.x, p.y, e); });
      var tol = e < 0.2 ? TOL_SMALL : TOL;
      judge(Math.abs(r.lufs - row[2]) <= tol, id + ": " + f1(r.lufs) + " LUFS outside " + row[2] + " +-" + tol + " (HEAD " + row[3] + ")");
      common(r, id, 1000 * (1.0 + (pos === "near" ? 0 : 0.28) + 0.25), LIM_MAX_IMP, PK_IMP, r.knee === 0);
      return r;
    });
    if (d.small) {
      judge(rs[0].centroid >= d.small.c, mat + " e0.1 near: centroid " + f1(rs[0].centroid) + " Hz under " + d.small.c);
      judge(rs[0].hp >= d.small.hp, mat + " e0.1 near: " + f1(rs[0].hp) + " dB above 200 Hz, under HEAD's " + d.small.hp);
    }
    if (mat === "armour") {
      armourSmall = rs[0];
      var main = measure("imp_armour_felt", function (S) { S.impact("armour", CAM.x, CAM.y, 0.3); });
      judge(rs[2].lufs >= d.rows[2][3] + 2.5, "armour e0.25: " + f1(rs[2].lufs) + " LUFS is not 2.5 LU above HEAD's " + d.rows[2][3]);
      judge(rs[2].centroid >= 350 && main.centroid >= 350, "armour: centroid " + f1(rs[2].centroid) + " / " + f1(main.centroid) + " Hz fell back under the gunfire's band");
    }
    var mx = function (k, sg) { return rs.reduce(function (a, r) { return Math.max(a, sg * r[k]); }, -Infinity) * sg; };
    print("  " + (mat + "          ").slice(0, 10) + "  " + wn + "/" + wf + "    " + capN + "/" + capF + "    " +
          rs.map(function (r) { return f1(r.lufs); }).join(" / ") + "    " + f1(mx("peak", 1)) + "   " + f1(-mx("gr", -1)) +
          "   " + Math.round(mx("end60", 1)) + "   " + Math.round(rs[0].centroid) + "/" + Math.round(rs[2].centroid));
  });

  /* ---------------- HMG rounds on a tank: pings, and now and then a ricochet ---------------- */
  var whines = 0, loudestWhine = -Infinity, pingLufs = [];
  for (var k = 0; k < 12; k++) {
    var Sp = fresh("mg_ping_" + k), cp = Sp.ctx;
    Sp.impact("armour", CAM.x, CAM.y, 0.108);
    cp.__renderTo(0.8);
    var po = cp.__output(), PL = po.L, PR = po.R;
    var plv = AudioAnalysis.levels(PL, PR, 48000), pld = AudioAnalysis.loudness(PL, PR, 48000);
    var psp = AudioAnalysis.spectrogram(PL, PR, 48000, { span: plv, rows: 64 });
    var on = Math.round(plv.onset_ms * 48), e1 = 0, e2 = 0, j;
    for (j = on; j < on + 4800; j++) e1 += PL[j] * PL[j] + PR[j] * PR[j];
    for (j = on + 9600; j < Math.min(PL.length, on + 24000); j++) e2 += PL[j] * PL[j] + PR[j] * PR[j];
    var late = 10 * Math.log(e2 / e1 + 1e-20) / Math.LN10;
    if (late > -50) { whines++; loudestWhine = Math.max(loudestWhine, late); }
    pingLufs.push(pld.integrated);
    judge(Math.abs(pld.integrated - (-33.6)) <= TOL_SMALL, "HMG ping " + k + ": " + f1(pld.integrated) + " LUFS outside -33.6 +-" + TOL_SMALL);
    judge(psp.centroid >= 1000, "HMG ping " + k + ": centroid " + f1(psp.centroid) + " Hz - not a ping");
    judge(!warns.length, "HMG ping " + k + ": Sfx warned " + warns.join("; "));
  }
  judge(whines >= 2 && whines <= 8, "HMG pings: " + whines + " of 12 whine (2-8 expected, the design is ~40%)");
  judge(loudestWhine <= -22, "HMG pings: the loudest ricochet is " + f1(loudestWhine) + " dB re its ping (ceiling -22)");
  print("HMG on a tank, 12 seeded rounds   LUFS " + f1(Math.min.apply(null, pingLufs)) + " to " + f1(Math.max.apply(null, pingLufs)) +
        "   ricochets " + whines + "/12, loudest " + f1(loudestWhine) + " dB re its ping");

  /* ---------------- a shell bursting on a hull, and an anti-materiel round ---------------- */
  var PAIR = [
    /* id, [scale, material, e], designed LUFS, HEAD LUFS, HEAD above-200 Hz */
    ["how105_on_tank", [1.0, "armour", 0.656], -15.4, -14.5, -21.9],
    ["navgun203_on_ship", [0.94, "hull", 0.5], -16.1, -15.4, -23.1],
    ["gun120_on_tank", [0.28, "armour", 0.3456], -21.3, -22.1, -31.5],
  ];
  print("paired events            LUFS (band)    HEAD   peak  limGR  >200Hz (HEAD)  centroid");
  var pr = {};
  PAIR.forEach(function (p) {
    var sc = p[1][0], mt = p[1][1], pe = p[1][2];
    var r = measure("x_" + p[0], function (S) { S.boom(CAM.x, CAM.y, sc, false); S.impact(mt, CAM.x, CAM.y, pe); });
    pr[p[0]] = r;
    /* the plate adds only its ring: paired, the impact builds no contact
       crack (3 nodes) and no thud (2) - counted against the same round
       alone (at e 0.46 where a lone e above 0.5 would read as a rifle round) */
    var Sb = fresh("x_" + p[0]), nb = Sb.ctx.__stats().nodes; Sb.boom(CAM.x, CAM.y, sc, false); nb = Sb.ctx.__stats().nodes - nb;
    var Si = fresh("x_" + p[0]), ni = Si.ctx.__stats().nodes; Si.impact(mt, CAM.x, CAM.y, Math.min(pe, 0.46)); ni = Si.ctx.__stats().nodes - ni;
    judge(r.nodes - nb <= ni - 5, p[0] + ": the impact under its blast built " + (r.nodes - nb) + " nodes, alone " + ni +
          " - it should drop its crack and thud (5) when the blast carries them");
    judge(Math.abs(r.lufs - p[2]) <= TOL, p[0] + ": " + f1(r.lufs) + " LUFS outside " + p[2] + " +-" + TOL);
    common(r, p[0], 2650, LIM_MAX_PAIR, PK_BOOM, r.knee <= r.len * 0.0002);
    judge(r.hp >= p[4] - 0.5, p[0] + ": " + f1(r.hp) + " dB above 200 Hz, HEAD " + p[4]);
    print("  " + (p[0] + "                    ").slice(0, 22) + f1(r.lufs) + " (" + p[2] + ")   " + f1(p[3]) + "  " + f1(r.peak) + "  " + f1(-r.gr) +
          "   " + f1(r.hp) + " (" + f1(p[4]) + ")   " + Math.round(r.centroid));
  });
  judge(pr.gun120_on_tank.hp >= -31.5 + 5 && pr.gun120_on_tank.centroid >= 350,
        "120 mm on a tank: " + f1(pr.gun120_on_tank.hp) + " dB above 200 Hz, centroid " + f1(pr.gun120_on_tank.centroid) + " - the clang no longer lifts it");
  var h105 = measure("x_h105", function (S) { S.impact("armour", CAM.x, CAM.y, 0.328); });
  var amr = measure("x_sniper_on_tank", function (S) { S.impact("armour", CAM.x, CAM.y, 0.79); });
  var amrShip = measure("x_sniper_on_ship", function (S) { S.impact("hull", CAM.x, CAM.y, 0.79); });
  judge(amr.lufs <= h105.lufs - 6, "12.7 mm anti-materiel on a tank: " + f1(amr.lufs) + " LUFS, not 6 LU under a 105 mm round's " + f1(h105.lufs));
  judge(Math.abs(amr.lufs - armourSmall.lufs) <= 3, "12.7 mm anti-materiel on a tank: " + f1(amr.lufs) + " LUFS, not within 3 LU of the HMG-class ping " + f1(armourSmall.lufs));
  judge(amrShip.lufs <= IMP.hull.rows[2][2] - 2, "12.7 mm anti-materiel on a ship: " + f1(amrShip.lufs) + " LUFS, louder than a shell's hit");
  print("anti-materiel  on a tank " + f1(amr.lufs) + " LUFS (105 mm round " + f1(h105.lufs) + ", HMG-class ping " + f1(armourSmall.lufs) +
        ")   on a ship " + f1(amrShip.lufs));

  /* ---------------- explosions ---------------- */
  var BOOM = [
    /* scale, water, pos, HEAD nodes, designed LUFS, HEAD LUFS, HEAD >200 Hz, HEAD <100 Hz, designed >200 Hz */
    [0.18, false, "near", 48, -25.6, -24.9, -33.7, -30.1, -29.9], [0.45, false, "near", 48, -20.4, -19.4, -28.8, -27.6, -25.2],
    [0.75, false, "near", 48, -18.0, -15.3, -24.8, -26.9, -21.4], [1.0, false, "near", 48, -15.5, -14.4, -22.1, -27.1, -19.3],
    [0.18, true, "near", 45, -22.9, -23.8, -31.3, -33.0, -28.5], [0.45, true, "near", 45, -19.9, -18.7, -27.3, -27.9, -25.1],
    [0.75, true, "near", 45, -16.0, -15.9, -23.2, -24.0, -21.3], [1.0, true, "near", 45, -13.5, -13.8, -21.8, -21.9, -18.3],
    [0.45, false, "far", 52, -25.5, -25.6, -36.9, -36.1, -32.9], [1.0, false, "far", 52, -17.9, -16.0, -26.9, -32.2, -24.6],
    [0.45, true, "far", 49, -24.4, -24.9, -35.5, -35.8, -33.9], [1.0, true, "far", 49, -16.8, -15.8, -27.1, -27.0, -25.6],
  ];
  print("explosions              nodes worst  cap   LUFS (band +-" + TOL + ")  HEAD   peak  limGR  end60 ms  >200Hz (HEAD)  <100Hz (HEAD)");
  BOOM.forEach(function (b) {
    var sc = b[0], wat = b[1], p = b[2] === "near" ? CAM : FAR, cap = Math.floor(b[3] * 1.5);
    var id = "boom_" + (wat ? "water" : "land") + "_s" + Math.round(sc * 100) + "_" + b[2];
    var wn = worstNodes("n_" + id, function (S) { S.boom(p.x, p.y, sc, wat); });
    var r = measure(id, function (S) { S.boom(p.x, p.y, sc, wat); });
    judge(wn <= cap, id + ": " + wn + " nodes > cap " + cap);
    judge(Math.abs(r.lufs - b[4]) <= TOL, id + ": " + f1(r.lufs) + " LUFS outside " + b[4] + " +-" + TOL);
    common(r, id, 1000 * (2.4 + (b[2] === "near" ? 0 : 0.28) + 0.25), LIM_MAX_BOOM, PK_BOOM, r.knee <= r.len * 0.0001);
    judge(r.hp >= Math.max(b[6] - 0.5, b[8] - 1.5), id + ": " + f1(r.hp) + " dB above 200 Hz: HEAD " + b[6] + " (floor -0.5), designed " + b[8] + " (floor -1.5)");
    judge(r.lp <= b[7] + 15, id + ": " + f1(r.lp) + " dB under 100 Hz, more than 15 dB over HEAD's " + b[7]);
    print("  " + (id + "                    ").slice(0, 24) + wn + "      " + cap + "   " + f1(r.lufs) + "          " + f1(b[5]) + "  " +
          f1(r.peak) + "  " + f1(-r.gr) + "   " + Math.round(r.end60) + "     " + f1(r.hp) + " (" + f1(b[6]) + ")   " + f1(r.lp) + " (" + f1(b[7]) + ")");
  });

  /* ---------------- named cues ---------------- */
  /* explode_big's integrated figure sits well under HEAD's by construction:
     HEAD stacked two blasts 110 ms apart (one loud second), this lets the
     aftermath run for two seconds, and BS.1770's relative gate keeps that
     tail in the average. Its loudest 400 ms is the figure to compare. */
  var CUE = [
    /* name, HEAD nodes, designed LUFS, HEAD LUFS, HEAD >200 Hz (null: not a blast), HEAD <100 Hz, designed >200 Hz */
    ["explode", 48, -21.3, -21.1, -30.3, -29.1, -26.4], ["explode_big", 95, -17.9, -14.4, -22.1, -26.2, -19.6], ["die_inf", 16, -32.7, -33.0, null, null, null]];
  print("named cues              nodes worst  cap   LUFS (band +-" + TOL + ")  HEAD   peak  limGR  end60 ms  >200Hz (HEAD)");
  CUE.forEach(function (c) {
    var cap = Math.floor(c[1] * 1.5);
    var wn = worstNodes("n_cue_" + c[0], function (S) { S.play(c[0]); });
    var r = measure("cue_" + c[0], function (S) { S.play(c[0]); });
    judge(wn <= cap, c[0] + ": " + wn + " nodes > cap " + cap);
    judge(Math.abs(r.lufs - c[2]) <= TOL, c[0] + ": " + f1(r.lufs) + " LUFS outside " + c[2] + " +-" + TOL);
    common(r, c[0], 3250, LIM_MAX_BOOM, PK_BOOM, r.knee <= r.len * 0.0001);
    if (c[4] !== null) {
      judge(r.hp >= Math.max(c[4] - 0.5, c[6] - 1.5), c[0] + ": " + f1(r.hp) + " dB above 200 Hz: HEAD " + c[4] + " (floor -0.5), designed " + c[6] + " (floor -1.5)");
      judge(r.lp <= c[5] + 15, c[0] + ": " + f1(r.lp) + " dB under 100 Hz, more than 15 dB over HEAD's " + c[5]);
    }
    print("  " + (c[0] + "                    ").slice(0, 24) + wn + "      " + cap + "   " + f1(r.lufs) + "          " + f1(c[3]) + "  " +
          f1(r.peak) + "  " + f1(-r.gr) + "   " + Math.round(r.end60) + (c[4] !== null ? "     " + f1(r.hp) + " (" + f1(c[4]) + ")" : ""));
  });

  /* ---------------- the battle ----------------
     Every call goes through the public surface with the arguments audio.js's
     own Combat hooks would pass: a hitscan round's impact at dmg/120 after its
     flight time and thinned the way scheduleImpact thins it, a shell's boom and
     impact as pollProjectiles decides them (boom for aoe >= 1.2 or dmg >= 150,
     at clamp(aoe / 3.2, 0.18, 1), then the struck material at 0.7 e), and
     unit deaths as game.js plays them - positionless. The second run adds a
     105 mm battery walking eight rounds onto armour. */
  var battleWav = null;
  [false, true].forEach(function (arty) {
    var S = fresh("battle"), ctx = S.ctx, ev = [], lcg = 99991;
    function r01() { lcg = (lcg * 1664525 + 1013904223) >>> 0; return lcg / 4294967296; }
    function at(t, f) { ev.push({ t: t, f: f }); }
    function spot(r) { return { x: CAM.x + (r01() * 2 - 1) * r, y: CAM.y + (r01() * 2 - 1) * r * 0.7 }; }
    function shell(t, wid, from, to, mat) {
      var w = WEAPONS[wid];
      at(t, function () { S.weapon(w, from.x, from.y); });
      var e = Math.min(1, Math.max(0.05, w.dmg / 320)), aoe = w.aoe || 0.35, fl = 0.22 + r01() * 0.2;
      at(t + fl, function () {
        if (aoe >= 1.2 || w.dmg >= 150) {
          S.boom(to.x, to.y, Math.min(1, Math.max(0.18, aoe / 3.2)), mat === "water");
          if (mat !== "water") S.impact(mat, to.x, to.y, e * 0.7);
        } else S.impact(mat, to.x, to.y, e);
      });
    }
    ["lmg", "hmg", "rifle"].forEach(function (wid, k) {
      var from = spot(420), to = spot(420), w = WEAPONS[wid];
      for (var t = 0.05 + k * 0.23; t < 4.8; t += 1.3) {
        for (var b = 0; b < 8; b++) {
          (function (tt) {
            at(tt, function () { S.weapon(w, from.x, from.y); });
            var e = w.dmg / 120;
            if (!(e < 0.25 && r01() > 0.45))
              at(tt + 0.02, function () { S.impact(k === 1 ? "armour" : (k ? "flesh" : "structure"), to.x, to.y, e); });
          })(t + b * 0.09);
        }
      }
    });
    ["gun_120", "gun_125", "gun_105", "gun_120"].forEach(function (wid, k) {
      var from = spot(500);
      for (var t = 0.3 + k * 0.37; t < 4.8; t += 1.4) shell(t, wid, from, spot(300), k === 2 ? "earth" : "armour");
    });
    [0.9, 1.7, 2.5, 3.3].forEach(function (t) { shell(t, "howitzer105", FAR, spot(350), r01() < 0.5 ? "earth" : "structure"); });
    [1.1, 3.0].forEach(function (t) { shell(t, "atgm_veh", spot(500), spot(300), "armour"); });
    shell(2.2, "torpedo", spot(500), spot(300), "water");
    [1.5, 3.8].forEach(function (t) { var p = spot(400); at(t, function () { S.impact("air", p.x, p.y, 0.5); }); });
    [1.6, 2.9, 4.1].forEach(function (t) { at(t, function () { S.play("explode"); }); });
    [2.0, 3.4, 4.4].forEach(function (t) { at(t, function () { S.play("die_inf"); }); });
    at(2.6, function () { S.play("explode_big"); });
    if (arty) [0.4, 1.0, 1.6, 2.2, 2.8, 3.4, 4.0, 4.5].forEach(function (t) { shell(t, "howitzer105", FAR, spot(250), "armour"); });
    ev.sort(function (a, b) { return a.t - b.t; });
    var maxVoices = 0, i;
    for (i = 0; i < ev.length; i++) {
      ctx.__renderTo(ev[i].t);
      perfOff = ev[i].t * 1000 - preciseTime() * 1000 + 1e6;   // play()'s rate gates run on performance.now
      try { ev[i].f(); } catch (e) { warns.push("threw: " + e); }
      maxVoices = Math.max(maxVoices, S.stats().voices);
    }
    ctx.__renderTo(5.0);
    var out = ctx.__output();
    var lv = AudioAnalysis.levels(out.L, out.R, out.sampleRate), ld = AudioAnalysis.loudness(out.L, out.R, out.sampleRate);
    var knee = 0, held = 0, over = 0;
    for (i = 0; i < out.length; i++) {
      var a = Math.max(Math.abs(out.L[i]), Math.abs(out.R[i]));
      if (a > 0.80) held++;
      if (a > SAT) knee++;
      if (a >= 0.999) over++;
    }
    var gr = ctx.__limiterMinDb()[0], name = arty ? "battle + 105 mm on armour" : "battle";
    print(name + "  " + ev.length + " calls in 5 s   peak " + f1(lv.peak_dbfs) + " dBFS   " + f1(ld.integrated) + " LUFS (400 ms max " +
          f1(ld.momentaryMax) + ")   limiter max GR " + f1(-gr) + " dB   at the limiter's ceiling " + (100 * held / out.length).toFixed(3) +
          "%   past SAT " + knee + " samples (" + (100 * knee / out.length).toFixed(3) + "%)   full-scale " + over + "   voices max " + maxVoices);
    judge(over === 0, name + ": " + over + " samples at full scale");
    judge(lv.peak_dbfs <= -0.8, name + ": peak " + f1(lv.peak_dbfs) + " dBFS");
    judge(knee / out.length <= 0.0002, name + ": " + (100 * knee / out.length).toFixed(3) + "% of samples past SAT, the clipper saturating");
    judge(gr >= -2.5, name + ": the limiter pulled " + f1(-gr) + " dB (ceiling 2.5)");
    judge(maxVoices <= 22, name + ": " + maxVoices + " voices live, the limit is 22");
    judge(!warns.length && !WebAudioEmu.unsupported.length, name + ": Sfx warned " + warns.join("; "));
    if (!arty) battleWav = out;
  });
  if (BATTLE_WAV) {
    var out = battleWav, n = out.length, buf = new ArrayBuffer(44 + n * 4), dv = new DataView(buf), i;
    var hdr = [0x46464952, 36 + n * 4, 0x45564157, 0x20746d66, 16, 0x00020001, 48000, 48000 * 4, 0x00100004, 0x61746164, n * 4];
    for (i = 0; i < hdr.length; i++) dv.setUint32(i * 4, hdr[i], true);
    for (i = 0; i < n; i++) {
      dv.setInt16(44 + i * 4, Math.max(-32768, Math.min(32767, Math.round(out.L[i] * 32767))), true);
      dv.setInt16(46 + i * 4, Math.max(-32768, Math.min(32767, Math.round(out.R[i] * 32767))), true);
    }
    writeFile(BATTLE_WAV, buf);
    print("battle mix written to " + BATTLE_WAV);
  }
  print(MEASURE ? "check_sound_impacts: measured " + checks + " figures (--measure: nothing judged)"
                : fails ? "check_sound_impacts: FAIL (" + fails + " of " + checks + " rules broken)"
                        : "check_sound_impacts: PASS (" + checks + " rules)");
  if (fails) throw new Error("check_sound_impacts: " + fails + " rules broken");
})();
