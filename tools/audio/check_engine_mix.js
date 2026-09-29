/* ============ tools/audio/check_engine_mix.js - engines under the guns they carry ============

   run
       jsc tools/audio/check_engine_mix.js -- ROOT [--measure] [--ref OTHER_ROOT]
   ROOT is the game tree (the directory holding index.html). Exit status 0
   and a last line "check_engine_mix: PASS" when every rule holds; a broken
   rule prints FAIL with the number that broke it and the run ends on an
   uncaught error (jsc's quit() ignores its argument; a throw exits 3).
   --measure prints every figure without judging it, and the IDENTITY table
   as it stands. --ref renders every IDENTITY sound with OTHER_ROOT's
   js/audio.js as well and compares the two sample for sample instead of
   against the table. About 8 minutes in jsc, most of it the roster.

   WHY THIS EXISTS. The engine bus ran through a DynamicsCompressor whose
   automatic makeup gain (the spec's (1 / curve(0 dBFS))^0.6: +11.55 dB for
   -26 dB, 8:1, 8 dB knee) undid its 0.26 trim, and one tank at the camera
   drove it 18 dB over threshold. Every hull came out at -10.8 to -13.4 LUFS
   whatever its size - an M1A2 driving at the camera 5.4 LU LOUDER than its
   own 120 mm, an HMMWV 19.1 LU louder than a burst of its 12.7 mm, all 403
   armed ground vehicles in rules.js and 231 of the 240 armed ships louder
   driving than their main weapon firing. The owner asked for better
   missiles and gunshots; an engine over the gun it carries makes every gun
   sound weaker. This holds the mix that replaced it, rendered through
   tools/audio/webaudio_emu.js as tools/audio/driver.js renders (the page's
   scripts first, js/audio.js untouched, everything through the public Sfx
   surface, Math.random seeded from each case's name). HEAD is js/audio.js
   at 081caf0 (unchanged since a6ae8c5); every HEAD figure below is this
   file run against it.

   Where: "at the camera" is the listener, 0 m; "far" is driver.js's far
   spot, 560 m. An engine is measured with the camera riding along so its
   distance holds. A voice's two sawtooths run 0.6% apart, so an engine
   throbs - every 10 s at a tank's idle, 4.6 s at its full drive - and each
   figure is the loudest 400 ms (BS.1770 momentary max) of one whole throb
   once the note has settled. A main weapon is weapons[0] fired as the game
   fires it (its w.burst rounds on simulation ticks), the figure the loudest
   400 ms of the report, the median of three seeds for a class (one 120 mm
   shot's loudest 400 ms moves 2 LU with its draw).

     MARGIN    per class, the engine at full drive at the camera sits
               between 8 and 13 LU under its own main weapon: under it by
               enough to leave the gun on top, not so far that the engine is
               gone (at the fix 9.3 to 11.6; HEAD had every one OVER its
               gun, by 2.0 to 19.1 LU). Far away, a tank's, a warship's and
               a Bradley's engine stays at least 12 LU under (13.9 to 19.1;
               a big gun carries, an engine falls off by place()'s law).
     LOAD      idle sits 6 to 9.5 LU under full drive, the contrast HEAD
               played at the camera (6.5-7.8; at the fix 6.6-7.8): an
               idling hull is a rumble, not silence.
     LAPTOP    for the tanks, above 200 Hz (what a laptop plays) the engine
               sits at least 12 dB under its gun (13.8 and 14.7; HEAD 3.7-3.8
               dB OVER).
     SIZE      an unarmed hull follows the size law too: the 40 t ore hauler
               within 3 dB of the 62 t M1A2 (-28.9 and -28.5 LUFS).
     ROSTER    every armed vehicle and ship in rules.js: every one at least
               8 LU under its main weapon, the median no more than 12 on land
               or afloat, and no engine at full drive at the camera under
               -47 LUFS (at the fix at least 8.8 and 8.9, medians 10.7 and
               10.8, engines -45.7 to -25.0 LUFS; HEAD 403 of 403 and 231 of
               240 OVER their gun). Each hull's engine is measured, not
               modelled: one full render per engine note, and for every hull
               a short render on that note whose samples are the reference's
               times its own level (checked block by block, to 0.2 dB). It
               prints audio.js's REPORT_Q as the reports measure it, the
               table to paste after a deliberate change to a weapon family.
     PLATOON   four M1A2s in line abreast drive past the camera, each firing
               its 120 mm on its 4.3 s reload: their four engines alone at
               least 5 LU under one of those shots at the camera; with the
               guns, the engines add at most 2 LU to the scene's loudest
               400 ms; the 400 ms before each shot at least 5 LU under one
               shot (at the fix 6.0, 1.5 and 6.0; HEAD 7.6 OVER, 10.5 and
               7.5 OVER).
     CROWD     seven M1A2s - the most engines audio.js plays - driving at the
               camera sit at least 2 LU under one 120 mm shot (3.3; HEAD 8.5
               OVER, with 19.9 dB of compression on them).
     ONE HULL  the loudest single hull the roster measured, driving at the
               camera for 12 s, takes no gain reduction from the engine
               compressor: one hull is levelled by its size, its gun, its
               load and its distance, only a crowd by the compressor (a 2900
               hp cruiser, 0.0 dB; HEAD pulled 6.7-6.8 dB off any one hull).
     DISTANCE  near to far at full drive falls by what place() prescribes
               for an engine's 190 m reference, 16.4 dB +-1.5 (HEAD 9.6-9.9,
               squashed by the compressor), and a far hull pans right.
     PITCH     the engine note is HEAD's: idle at engineBase x 0.62 within
               +-3.5% (each hull runs up to 3% off so a platoon does not
               phase-lock), full drive 1.40 / 0.62 times idle within 1.5%;
               and a hull's offset is its own: the same hull idles on the
               same note however the session's random numbers fall, so a
               voice dropped and rebuilt comes back on its note.
     VOICE     one engine builds HEAD's 10 nodes of the same kinds.
     AIRCRAFT  updateEngines gives aircraft no voice (it takes vehicles and
               ships): an AH-64 and an F-16 at the camera build nothing.
               Should one ever get a voice, it must sit 8 LU under its main
               weapon like any hull.
     IDENTITY  every weapon report, impact, blast and cue in the catalogue,
               and the intensity bed, renders sample for sample as HEAD
               did: FNV-1a over the 16-bit PCM tools/audio/audition.py
               writes to its WAVs, seeded by the catalogue's own names, so
               a digest here matches that WAV's data chunk. After a
               deliberate change to a weapon, impact, blast or cue, run
               --measure and paste the IDENTITY TABLE line it prints over
               DIGEST below, or run --ref against a checkout from before
               the change; MARGIN and ROSTER then say whether the engines
               still sit under the new guns.
   ========================================================================= */

var __ARGS = (typeof arguments !== "undefined") ? arguments : [];
(function () {
  "use strict";
  var ROOT = __ARGS[0];
  var MEASURE = Array.prototype.indexOf.call(__ARGS, "--measure") >= 0;
  var ri = Array.prototype.indexOf.call(__ARGS, "--ref");
  var REF = ri >= 0 ? __ARGS[ri + 1] : null;
  if (!ROOT) throw new Error("usage: jsc tools/audio/check_engine_mix.js -- ROOT [--measure] [--ref OTHER_ROOT]");
  load(ROOT + "/tools/audio/webaudio_emu.js");
  load(ROOT + "/tools/audio/analysis.js");
  globalThis.__IDS = {}; globalThis.__HASH = ""; globalThis.__SEARCH = ""; globalThis.__QUIET_CONSOLE = true;
  load(ROOT + "/tools/jsc/env.js");
  WebAudioEmu.install(globalThis);
  /* a clock the check owns: audio.js reads the camera and gates its cues on
     performance.now, and a scene has to run on scene time */
  var vclock = 1e6;
  performance.now = function () { return vclock; };
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
  var FAROFF = { x: 360, y: -600 };                       // driver.js's "far": 560 m
  var AUDIO = ROOT + "/js/audio.js";

  function seedRandom(str) {                              // driver.js's seeding
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
  function fresh(seed, audio) {
    seedRandom(seed); warns.length = 0;
    CAM.x = 2048; CAM.y = 2048; vclock = 1e6;
    load(audio || AUDIO);
    Sfx.ensure();
    return Sfx;
  }
  function f1(x) { return (x === null || x === undefined || !isFinite(x)) ? "-" : x.toFixed(1); }
  function pad(s, n) { s = String(s); while (s.length < n) s += " "; return s; }
  function db(x) { return 20 * Math.log(x) / Math.LN10; }

  var fails = 0, checks = 0;
  function judge(ok, what) {
    checks++;
    if (MEASURE) return;
    if (!ok) { fails++; print("FAIL  " + what); }
  }

  /* ---------------------------------------------------------- measures */
  function loud(out, a, b) {                              // BS.1770 over [a, b) s
    var s = Math.max(0, Math.round(a * 48000)), e = Math.min(out.length, Math.round(b * 48000));
    return AudioAnalysis.loudness(out.L.subarray(s, e), out.R.subarray(s, e), 48000);
  }
  function mmax(out, a, b) { return loud(out, a, b).momentaryMax; }   // the loudest 400 ms in it
  /* the loudest 400 ms (100 ms hop) of the mono sum through two 2nd-order
     200 Hz high-passes: what a laptop's speakers play (check_sound_impacts'
     band, so the two read alike) */
  function hp200(out, a, b) {
    var s0 = Math.max(0, Math.round((a || 0) * 48000)), s1 = b ? Math.min(out.length, Math.round(b * 48000)) : out.length;
    var n = s1 - s0, y = new Float64Array(n), i, k;
    for (i = 0; i < n; i++) y[i] = (out.L[s0 + i] + out.R[s0 + i]) / 2;
    for (k = 0; k < 2; k++) {
      var w0 = 2 * Math.PI * 200 / 48000, al = Math.sin(w0) / (2 * Math.SQRT1_2), c = Math.cos(w0), a0 = 1 + al;
      var b0 = (1 + c) / 2 / a0, b1 = -(1 + c) / a0, b2 = b0, a1 = -2 * c / a0, a2 = (1 - al) / a0, x1 = 0, x2 = 0, y1 = 0, y2 = 0;
      for (i = 0; i < n; i++) { var v = y[i], o = b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = v; y2 = y1; y1 = o; y[i] = o; }
    }
    var best = 1e-20;
    for (var s = 0; s + 19200 <= Math.max(19200, n); s += 4800) {
      var e = 0; for (i = s; i < Math.min(n, s + 19200); i++) e += y[i] * y[i];
      if (e / 19200 > best) best = e / 19200;
    }
    return 10 * Math.log(best) / Math.LN10;
  }
  /* the strongest line between lo and hi Hz in [a, a + 2.73 s): a 2^17-point
     Hann FFT of the mono sum, the peak placed by a parabola through the log
     magnitudes of its bin and their neighbours */
  function lineHz(out, a, lo, hi) {
    var N = 131072, s0 = Math.round(a * 48000), re = new Float64Array(N), im = new Float64Array(N), w = AudioAnalysis.hann(N), i;
    for (i = 0; i < N && s0 + i < out.length; i++) re[i] = (out.L[s0 + i] + out.R[s0 + i]) / 2 * w[i];
    AudioAnalysis.fft(re, im);
    var df = 48000 / N, k0 = Math.ceil(lo / df), k1 = Math.floor(hi / df), best = k0, bm = -1;
    for (var k = k0; k <= k1; k++) { var mg = re[k] * re[k] + im[k] * im[k]; if (mg > bm) { bm = mg; best = k; } }
    function lm(k) { return Math.log(re[k] * re[k] + im[k] * im[k] + 1e-30); }
    var ya = lm(best - 1), yb = lm(best), yc = lm(best + 1), d = (ya - yc) / (2 * (ya - 2 * yb + yc));
    return (best + (isFinite(d) ? d : 0)) * df;
  }
  function engineComp(ctx) { return ctx.__limiterMinDb()[1] || 0; }

  /* game.js runs a deferred round on the first simulation tick at or after it */
  function tickQ(bd) { var tick = (typeof CFG !== "undefined" && CFG.DT > 0) ? CFG.DT : 1 / 30; return Math.ceil(bd / tick - 1e-6) * tick; }
  /* a unit's main weapon, fired as the game fires it: the loudest 400 ms */
  function asFired(wid, pos, seed) {
    if (!seed) {
      var r = [0, 1, 2].map(function (k) { return asFired(wid, pos, "emx_wpn_" + wid + "_" + pos + "_" + k); });
      var med = function (f) { return r.map(f).sort(function (a, b) { return a - b; })[1]; };
      return { mmax: med(function (x) { return x.mmax; }), lufs: med(function (x) { return x.lufs; }), hp: med(function (x) { return x.hp; }),
               warn: r[0].warn.concat(r[1].warn, r[2].warn) };
    }
    var S = fresh(seed), ctx = S.ctx, w = WEAPONS[wid];
    var p = pos === "near" ? { x: CAM.x, y: CAM.y } : { x: CAM.x + FAROFF.x, y: CAM.y + FAROFF.y };
    var n = Math.max(1, w.burst || 1), step = tickQ(w.burstDelay || 0.1);
    for (var k = 0; k < n; k++) {
      ctx.__renderTo(k * step);
      vclock = 1e6 + ctx.currentTime * 1000;
      S.weapon(w, p.x, p.y);
    }
    ctx.__renderUntilQuiet(12, 0.4);
    var out = ctx.__output(0.05);
    var ld = AudioAnalysis.loudness(out.L, out.R, 48000);
    return { mmax: ld.momentaryMax, lufs: ld.integrated, hp: hp200(out), warn: warns.slice() };
  }
  /* one hull, the camera riding along so its distance holds: idle, then
     full drive, each figure over one whole throb (a hull 3% flat throbs
     slowest); over a shorter window where it fell in the throb decided the
     figure (2 s read one T-90A 2.9 LU apart on two seeds) */
  function throb(f) { return 1 / (0.006 * f * 0.97) + 0.3; }
  function engine(key, pos, opt) {
    opt = opt || {};
    var S = fresh(opt.seed || "emx_eng_" + key + "_" + pos), ctx = S.ctx, d = UNITS[key], b = baseHz(d);
    var off = pos === "near" ? { x: 0, y: 0 } : FAROFF;
    var idle = opt.noIdle ? 0 : 1 + throb(b * 0.62), drive = opt.drive !== undefined ? opt.drive : 2.2 + throb(b * 1.4);
    var u = { id: opt.id || 1, cat: d.cat, layer: d.layer, def: d, x: CAM.x + off.x, y: CAM.y + off.y, dead: false, moving: false,
              speedMul: function () { return 1; } };
    var game = { players: [{ units: [u] }] }, st0 = ctx.__stats(), dt = 0.1, steps = Math.round((idle + drive) / dt);
    for (var step = 0; step < steps; step++) {
      var t = step * dt;
      u.moving = t >= idle - 1e-9;
      if (u.moving) { u.x += (d.speed || 2) * 32 * dt; CAM.x = u.x - off.x; }
      vclock = 1e6 + t * 1000;
      S.updateEngines(game, dt);
      ctx.__renderTo(t + dt);
    }
    var st = ctx.__stats(), by = {};
    for (var k in st.byType) { var dn = st.byType[k] - (st0.byType[k] || 0); if (dn) by[k] = dn; }
    var out = ctx.__output(), T = idle + drive, eL = 0, eR = 0, i;
    if (opt.short) return { out: out, idleEnd: idle, warn: warns.slice() };
    for (i = Math.round((idle + 2.2) * 48000); i < out.length; i++) { eL += out.L[i] * out.L[i]; eR += out.R[i] * out.R[i]; }
    var li = idle ? loud(out, 1, idle) : null, ld = loud(out, idle + 2.2, T);
    return { out: out, T: T, idleEnd: idle, idle: li && li.momentaryMax, drive: ld.momentaryMax, driveInt: ld.integrated,
             hp: hp200(out, idle + 2.2, T),
             nodes: st.nodes - st0.nodes, byType: by, gr: engineComp(ctx), rl: 10 * Math.log((eR + 1e-30) / (eL + 1e-30)) / Math.LN10,
             warn: warns.slice() };
  }
  /* HEAD's engine note for a unit, before the per-hull spread: engineBase */
  function baseHz(d) {
    if (d.cat === "naval") return 19 + (d.speed || 2) * 2.2;
    return Math.min(58, Math.max(26, 58 - (d.mass || 20) * 0.55));
  }

  /* ---------------------------------------- MARGIN, LOAD, DISTANCE ... --- */
  /* unit, what it is, the far floor under its main weapon (LU; null where
     the gun is a small bore: a 12.7 mm or 35 mm burst falls 25-30 dB to
     560 m as the air takes its crack, an engine 16.4, and out there both
     sit at -52 to -62 LUFS), and HEAD's level and near margin */
  var CLASSES = [
    ["mbt_n",       "tracked 62 t M1A2, 120 mm",         12,   -13.0, -5.4],
    ["mbt_p",       "tracked 47 t T-90A, 125 mm",        12,   -12.6, -5.0],
    ["ifv_n",       "tracked 30 t Bradley, TOW-2B",      12,   -11.7, -14.0],
    ["spaag_n",     "47 t M-SHORAD, 35 mm burst",        null, -12.6, -12.7],
    ["lt_n",        "wheeled 20 t MGS, 76 mm",           12,   -11.2, -12.8],
    ["recon_n",     "wheeled 5 t HMMWV, 12.7 mm burst",  null, -10.8, -19.1],
    ["destroyer_n", "ship: destroyer, 127 mm",           12,   -13.3, -2.0],
    ["corvette_n",  "ship: corvette, 76 mm burst",       12,   -13.1, -4.1],
    ["boat_n",      "ship: patrol boat, 12.7 mm burst",  null, -13.1, -16.8],
    ["harvester",   "ore hauler 40 t, unarmed",          null, -12.2, null],
  ];
  var FLOOR = 8, CEIL = 13, PLACE_DROP = 20 * Math.log(1 / (1 + Math.pow(Math.sqrt(360 * 360 + 600 * 600) * 0.8 / 190, 1.6))) / Math.LN10;
  var byKey = {};
  print("engines at full drive and at idle, each against its own main weapon as fired: loudest 400 ms / integrated LUFS; margin = weapon - engine, loudest 400 ms");
  print("unit         class                               near: drive       idle          weapon        margin (HEAD)   load  far: drive  weapon  margin  drop  >200 Hz  pitch idle/drive Hz");
  CLASSES.forEach(function (c) {
    var key = c[0], d = UNITS[key], wid = (d.weapons || [])[0];
    var en = engine(key, "near"), ef = engine(key, "far");
    var gn = wid ? asFired(wid, "near") : { mmax: null, lufs: null, hp: null, warn: [] }, gf = wid ? asFired(wid, "far") : { mmax: null };
    var mn = wid ? gn.mmax - en.drive : null, mf = wid ? gf.mmax - ef.drive : null, drop = en.drive - ef.drive, load = en.drive - en.idle;
    byKey[key] = en;
    if (wid) judge(mn >= FLOOR && mn <= CEIL, key + ": engine at the camera at full drive " + f1(en.drive) + " LUFS, " + f1(mn) + " LU under its " + wid +
                   " (" + f1(gn.mmax) + "); wanted " + FLOOR + " to " + CEIL + ", HEAD " + f1(c[3]) + " LUFS, " + (c[4] < 0 ? f1(-c[4]) + " OVER it" : f1(c[4]) + " under"));
    if (c[2] !== null) judge(mf >= c[2], key + " far: engine " + f1(ef.drive) + " LUFS, only " + f1(mf) + " LU under its " + wid + " (" + f1(gf.mmax) + "); floor " + c[2]);
    judge(load >= 6 && load <= 9.5, key + ": idle " + f1(en.idle) + " to drive " + f1(en.drive) + " LUFS is " + f1(load) + " LU; HEAD played 6.5-7.8 at the camera, wanted 6 to 9.5");
    judge(Math.abs(drop + PLACE_DROP) <= 1.5, key + ": near to far the engine falls " + f1(drop) + " dB, place() says " + f1(-PLACE_DROP) + " +-1.5");
    judge(ef.rl >= 6, key + " far: R over L by " + f1(ef.rl) + " dB - the hull 360 px right is not panned right");
    /* pitch, from the audio: idle, and drive against idle */
    var b = baseHz(d), fi = lineHz(en.out, en.idleEnd - 2.8, b * 0.62 * 0.8, b * 0.62 * 1.2), fd = lineHz(en.out, en.T - 2.75, b * 1.4 * 0.8, b * 1.4 * 1.2);
    judge(Math.abs(fi / (b * 0.62) - 1) <= 0.035, key + ": idles at " + f1(fi) + " Hz, HEAD's note is " + f1(b * 0.62) + " +-3.5%");
    judge(Math.abs((fd / fi) / (1.40 / 0.62) - 1) <= 0.015, key + ": full drive " + f1(fd) + " Hz is " + (fd / fi).toFixed(3) + "x idle, HEAD's law " + (1.40 / 0.62).toFixed(3));
    judge(en.nodes === 10 && en.byType.Oscillator === 3 && en.byType.Gain === 3 && en.byType.BiquadFilter === 2 &&
          en.byType.AudioBufferSource === 1 && (en.byType.StereoPanner || 0) <= 1, key + ": one engine built " + en.nodes + " nodes " + JSON.stringify(en.byType) + ", HEAD's voice is 10");
    judge(!en.warn.length && !ef.warn.length && !gn.warn.length, key + ": Sfx warned " + en.warn.concat(ef.warn, gn.warn).join("; "));
    if (/^mbt_/.test(key)) judge(gn.hp - en.hp >= 12, key + ": above 200 Hz the engine is only " + f1(gn.hp - en.hp) + " dB under its gun (a laptop plays that band; floor 12, HEAD 3.7-3.8 over)");
    print(pad(key, 12) + " " + pad(c[1], 36) + pad(f1(en.drive) + " / " + f1(en.driveInt), 14) + pad(f1(en.idle), 14) +
          pad(f1(gn.mmax) + " / " + f1(gn.lufs), 14) + pad(f1(mn) + " (" + f1(c[4]) + ")", 16) + pad(f1(load), 6) +
          pad(f1(ef.drive), 12) + pad(f1(gf.mmax), 8) + pad(f1(mf), 8) + pad(f1(drop), 6) + pad(f1(wid ? gn.hp - en.hp : null), 9) + f1(fi) + " / " + f1(fd));
  });
  judge(Math.abs(byKey.harvester.drive - byKey.mbt_n.drive) <= 3, "the 40 t ore hauler drives at " + f1(byKey.harvester.drive) + " LUFS, the 62 t M1A2 at " +
        f1(byKey.mbt_n.drive) + ": an unarmed hull has left the size law (within 3 dB)");

  /* ------------------------------------------------------- PITCH: own --- */
  /* a hull's offset is a function of the hull, not a draw: the same hull
     on two sessions' random numbers idles on one note */
  (function () {
    var a = engine("mbt_n", "near", { id: 7, seed: "emx_note_a", drive: 0, short: true }), b2 = engine("mbt_n", "near", { id: 7, seed: "emx_note_b", drive: 0, short: true });
    var b = baseHz(UNITS.mbt_n) * 0.62, fa = lineHz(a.out, a.idleEnd - 2.8, b * 0.9, b * 1.1), fb = lineHz(b2.out, b2.idleEnd - 2.8, b * 0.9, b * 1.1);
    judge(Math.abs(fa / fb - 1) <= 0.001, "hull 7 idles at " + fa.toFixed(3) + " Hz on one session's draw and " + fb.toFixed(3) + " on another's: a rebuilt voice comes back off its note");
    print("hull 7's idle note on two sessions: " + fa.toFixed(3) + " and " + fb.toFixed(3) + " Hz (HEAD's note " + b.toFixed(3) + ")");
  })();

  /* ----------------------------------------------------------- AIRCRAFT --- */
  ["helo_n", "fighter_n"].forEach(function (key) {
    var d = UNITS[key];
    if (!d) return;
    var e = engine(key, "near", { noIdle: true, drive: 3 });
    var g = e.nodes ? asFired(d.weapons[0], "near") : null;
    judge(!e.nodes || g.mmax - e.drive >= 8, key + ": has an engine voice now, " + f1(e.drive) + " LUFS, only " + f1(g && g.mmax - e.drive) + " LU under its " + d.weapons[0]);
    print(key + " (" + d.name + "): " + (e.nodes ? "engine " + f1(e.drive) + " LUFS, " + f1(g.mmax - e.drive) + " LU under its " + d.weapons[0]
                                                 : "no engine voice - updateEngines takes vehicles and ships only"));
  });

  /* ------------------------------------------------------------- ROSTER --- */
  /* every armed hull, its engine against its main weapon. A hull's note
     depends on its mass (on land) or its speed (afloat); its level on
     whatever audio.js decides. So each NOTE is rendered once in full, over
     a throb, and every hull once for 1.2 s on that note, with the same seed
     and the same hull id: a single engine never reaches the compressor, so
     its samples are the reference's times its own level, and the ratio is
     read block by block (and must hold to 0.2 dB, or the premise fails).
     Each report is rendered once per distinct fingerprint and burst. */
  var roster = { loudest: null };
  (function () {
    var noteC = {}, gunC = {}, gunF = {}, rows = [], worst = { v: null, n: null }, most = { v: null, n: null }, med = { v: [], n: [] }, quiet = null;
    var probe = fresh("emx_describe");
    for (var key in UNITS) {
      var d = UNITS[key];
      if (d.cat !== "vehicle" && d.cat !== "naval") continue;
      /* the note, and the load its top speed reaches: updateEngines reads
         load against at least 16 px/s, so a hull slower than 0.5 tiles a
         second (a towed SAM at 0.35) never reaches full drive */
      var nk = (d.cat === "naval" ? "n" : "v") + baseHz(d) + "@" + Math.min(1, (d.speed || 2) * 2);
      if (!noteC[nk]) noteC[nk] = key;
      var wid = (d.weapons || [])[0], gk = null;
      if (wid && WEAPONS[wid]) {
        var w = WEAPONS[wid], dsc = probe.describe(w); delete dsc.id;
        gk = JSON.stringify(dsc) + JSON.stringify([w.name, w.proj, w.warhead, w.dmg, w.burst, w.burstDelay, w.aoe, w.speed,
                                                   w.profile, w.tgt, w.rocket, w.coldLaunch, w.antiRadiation]);
        if (!gunC[gk]) { gunC[gk] = wid; gunF[gk] = { fam: dsc.fam, lvl: dsc.level, n: dsc.fam === "rotary" || dsc.fam === "revolver" ? 1 :
          Math.min(Math.max(1, w.burst || 1), 1 + Math.floor(0.4 / tickQ(w.burstDelay || 0.1) + 1e-9)) }; }
      }
      rows.push({ key: key, cat: d.cat, wid: wid, nk: nk, gk: gk });
    }
    var SH = 1.2, refL = {}, refOut = {};
    function blocks(out) {                                 // 0.1 s block energies from 0.5 s on
      var r = [];
      for (var s = Math.round(0.5 * 48000); s + 4800 <= Math.round(SH * 48000); s += 4800) {
        var e = 0; for (var i = s; i < s + 4800; i++) e += out.L[i] * out.L[i] + out.R[i] * out.R[i];
        r.push(e);
      }
      return r;
    }
    Object.keys(noteC).forEach(function (nk) {
      var e = engine(noteC[nk], "near", { noIdle: true, seed: "emx_note_" + nk });
      refL[nk] = e.drive; refOut[nk] = blocks(e.out);
    });
    var gunL = {};
    Object.keys(gunC).forEach(function (gk) { gunL[gk] = asFired(gunC[gk], "near", "emx_roster_" + gunC[gk]).mmax; });
    var skew = 0, skewKey = null;
    rows.forEach(function (r) {
      var e = engine(r.key, "near", { noIdle: true, seed: "emx_note_" + r.nk, drive: SH, short: true }), bl = blocks(e.out), ref = refOut[r.nk];
      var lo = Infinity, hi = -Infinity;
      for (var i = 0; i < bl.length; i++) { var q = 10 * Math.log(bl[i] / ref[i]) / Math.LN10; if (q < lo) lo = q; if (q > hi) hi = q; }
      if (hi - lo > skew) { skew = hi - lo; skewKey = r.key; }
      r.eng = refL[r.nk] + (lo + hi) / 2;
      if (!roster.loudest || r.eng > roster.loudest.eng) roster.loudest = r;
      if (!quiet || r.eng < quiet.eng) quiet = r;
    });
    judge(skew <= 0.2, "roster: " + skewKey + "'s engine is not its note's reference times one level (" + skew.toFixed(2) + " dB spread): a single hull is being compressed");
    var under = { vehicle: 0, naval: 0 }, louder = { vehicle: 0, naval: 0 }, count = { vehicle: 0, naval: 0 }, band = 0, armed = 0;
    rows.forEach(function (r) {
      if (!r.gk) return;
      var mg = gunL[r.gk] - r.eng, c = r.cat === "naval" ? "n" : "v";
      count[r.cat]++; armed++;
      if (mg < 0) louder[r.cat]++;
      if (mg >= 8 && mg <= 12) band++;
      if (mg < FLOOR) { under[r.cat]++; if (under[r.cat] <= 5) print("  " + r.key + ": engine " + f1(r.eng) + " LUFS, only " + f1(mg) + " LU under its " + r.wid + " (" + f1(gunL[r.gk]) + ")"); }
      med[c].push(mg);
      if (!worst[c] || mg < worst[c].mg) worst[c] = { mg: mg, key: r.key, wid: r.wid };
      if (!most[c] || mg > most[c].mg) most[c] = { mg: mg, key: r.key, wid: r.wid };
    });
    ["v", "n"].forEach(function (c) { med[c].sort(function (a, b) { return a - b; }); });
    var mv = med.v[med.v.length >> 1], mnv = med.n[med.n.length >> 1];
    judge(under.vehicle === 0, under.vehicle + " of " + count.vehicle + " armed ground vehicles drive within " + FLOOR + " LU of their main weapon, or over it (" + louder.vehicle + " over)");
    judge(under.naval === 0, under.naval + " of " + count.naval + " armed ships steam within " + FLOOR + " LU of their main weapon, or over it (" + louder.naval + " over)");
    judge(mv <= 12 && mnv <= 12, "roster: the median engine sits " + f1(mv) + " LU (land) and " + f1(mnv) + " LU (afloat) under its main weapon; over 12 and engines are fading out of the mix");
    judge(quiet.eng >= -47, "roster: " + quiet.key + "'s engine drives at " + f1(quiet.eng) + " LUFS at the camera, under -47: gone");
    print("roster: " + Object.keys(noteC).length + " engine notes, " + rows.length + " hulls and " + Object.keys(gunC).length + " reports rendered (levels read to " + skew.toFixed(2) + " dB)");
    print("        margin under the main weapon  ground vehicles " + count.vehicle + " (" + louder.vehicle + " louder than it): least " + f1(worst.v.mg) + " (" + worst.v.key + ", " + worst.v.wid +
          "), median " + f1(mv) + ", most " + f1(most.v.mg) + " (" + most.v.key + ", " + most.v.wid + ")   ships " + count.naval + " (" + louder.naval + " louder): least " +
          f1(worst.n.mg) + " (" + worst.n.key + ", " + worst.n.wid + "), median " + f1(mnv) + ", most " + f1(most.n.mg) + " (" + most.n.key + ", " + most.n.wid + ")");
    print("        " + band + " of " + armed + " armed hulls 8 to 12 LU under; engines at full drive at the camera from " + f1(quiet.eng) + " (" + quiet.key + ") to " +
          f1(roster.loudest.eng) + " LUFS (" + roster.loudest.key + ")");
    /* audio.js's REPORT_Q as these reports measure it - per family, the
       quietest main weapon's loudest 400 ms per unit of its level, one
       round - to paste over the table after a deliberate change to a weapon
       family's sound, which moves its guns and so where its hulls' engines
       may sit */
    var rq = {};
    Object.keys(gunC).forEach(function (gk) {
      var g = gunF[gk], q = gunL[gk] - db(g.lvl) - 10 * Math.log(g.n) / Math.LN10;
      if (rq[g.fam] === undefined || q < rq[g.fam]) rq[g.fam] = q;
    });
    print("        REPORT_Q as measured: {" + Object.keys(rq).map(function (f) { return f + ": " + (Math.floor(rq[f] * 10) / 10).toFixed(1); }).join(", ") + "}");
  })();

  /* ---------------------------------------------------- PLATOON, CROWD --- */
  var one = asFired(UNITS.mbt_n.weapons[0], "near");
  function platoon(fire, engines) {
    var S = fresh("emx_platoon"), ctx = S.ctx, d = UNITS.mbt_n, w = WEAPONS[d.weapons[0]], units = [], shots = [], i, t;
    /* line abreast 48 m apart, from 240 m left of the camera, 12 s at 50 px/s */
    for (i = 0; i < 4; i++) units.push({ id: 10 + i, cat: d.cat, layer: d.layer, def: d, x: CAM.x - 300 - i * 15, y: CAM.y - 90 + i * 60,
                                          dead: false, moving: true, speedMul: function () { return 1; } });
    for (i = 0; i < 4; i++) for (t = 1.0 + i * 1.07; t < 11; t += w.reload) shots.push({ t: t, k: i });
    shots.sort(function (a, b) { return a.t - b.t; });
    var game = { players: [{ units: engines ? units : [] }] }, si = 0;
    for (var step = 0; step < 120; step++) {
      var t0 = step * 0.1;
      for (i = 0; i < 4; i++) units[i].x += d.speed * 32 * 0.1;
      vclock = 1e6 + t0 * 1000;
      if (engines) S.updateEngines(game, 0.1);
      while (fire && si < shots.length && shots[si].t < t0 + 0.1) {
        ctx.__renderTo(shots[si].t);
        vclock = 1e6 + ctx.currentTime * 1000;
        S.weapon(w, units[shots[si].k].x, units[shots[si].k].y);
        si++;
      }
      ctx.__renderTo(t0 + 0.1);
    }
    var out = ctx.__output();
    return { out: out, mmax: AudioAnalysis.loudness(out.L, out.R, 48000).momentaryMax, shots: shots, warn: warns.slice() };
  }
  var eng4 = platoon(false, true), guns4 = platoon(true, false), both = platoon(true, true);
  var gapMax = -Infinity;
  both.shots.forEach(function (s) { gapMax = Math.max(gapMax, mmax(both.out, Math.max(0, s.t - 0.42), s.t - 0.02)); });
  judge(one.mmax - eng4.mmax >= 5, "platoon: four engines " + f1(eng4.mmax) + " LUFS, only " + f1(one.mmax - eng4.mmax) + " LU under one 120 mm shot (" + f1(one.mmax) + "); floor 5, HEAD 7.6 over");
  judge(both.mmax - guns4.mmax <= 2, "platoon: the engines add " + f1(both.mmax - guns4.mmax) + " LU to the scene's loudest 400 ms (ceiling 2, HEAD 10.5)");
  judge(one.mmax - gapMax >= 5, "platoon: between shots the scene reads " + f1(gapMax) + " LUFS, only " + f1(one.mmax - gapMax) + " LU under one shot (floor 5, HEAD 7.5 over)");
  judge(!eng4.warn.length && !both.warn.length, "platoon: Sfx warned " + eng4.warn.concat(both.warn).join("; "));
  print("platoon of four M1A2 driving past, firing: engines alone " + f1(eng4.mmax) + " LUFS (" + f1(one.mmax - eng4.mmax) + " LU under one shot at " + f1(one.mmax) +
        ")   guns alone " + f1(guns4.mmax) + "   both " + f1(both.mmax) + "   loudest 400 ms before a shot " + f1(gapMax));

  function crowd(n, key) {
    var S = fresh("emx_crowd" + n), ctx = S.ctx, d = UNITS[key], units = [], i;
    var offs = [[0, 0], [-60, -40], [60, -40], [-60, 40], [60, 40], [0, -90], [0, 90]];
    for (i = 0; i < n; i++) units.push({ id: 30 + i, cat: d.cat, layer: d.layer, def: d, x: CAM.x + offs[i][0], y: CAM.y + offs[i][1],
                                          dead: false, moving: true, speedMul: function () { return 1; } });
    var game = { players: [{ units: units }] };
    for (var step = 0; step < 100; step++) {
      for (i = 0; i < n; i++) units[i].x += d.speed * 3.2;
      CAM.x += d.speed * 3.2;
      vclock = 1e6 + step * 100;
      S.updateEngines(game, 0.1);
      ctx.__renderTo(step * 0.1 + 0.1);
    }
    var out = ctx.__output();
    return { mmax: mmax(out, 3, 10), gr: engineComp(ctx) };
  }
  var c7 = crowd(7, "mbt_n");
  judge(one.mmax - c7.mmax >= 2, "crowd: seven M1A2 driving at the camera " + f1(c7.mmax) + " LUFS, only " + f1(one.mmax - c7.mmax) + " LU under one shot (floor 2, HEAD 8.5 over)");
  print("crowd of seven M1A2 driving at the camera: " + f1(c7.mmax) + " LUFS, " + f1(one.mmax - c7.mmax) + " LU under one shot; engine compressor " + f1(-c7.gr) + " dB");

  /* ----------------------------------------------------------- ONE HULL --- */
  (function () {
    var k = roster.loudest.key, e = engine(k, "near", { noIdle: true, drive: 12 });
    judge(e.gr >= -0.05, k + ", the loudest hull, driving at the camera: the engine compressor pulled " + f1(-e.gr) + " dB - one hull reaches it (HEAD 6.8 off one M1A2)");
    print("loudest single hull, " + k + ", 12 s at full drive at the camera: " + f1(e.drive) + " LUFS, engine compressor " + f1(-e.gr) + " dB");
  })();

  /* ----------------------------------------------------------- IDENTITY --- */
  /* the catalogue's non-engine sounds, fired as tools/audio/driver.js fires
     them and seeded by its slugs */
  var WPN = ["rifle", "w_e60_pact_rifle", "lmg", "hmg", "w_e80_kpa_ifv", "sniper", "spectre20", "chaingun", "spaag", "w_e50_gbr_aa",
             "gun_light", "w_e50_kpa_mbt", "gun_105", "gun_120", "gun_125", "aagun_dp127", "coast_gun", "w_e50_nato_cruiser", "mortar",
             "howitzer105", "pzh2000_l52", "navgun_203", "w_e60_kpa_at", "w_e80_nato_mlrs", "mrl240", "w_e90_fra_aa", "atgm_veh", "sam_site",
             "ssm_granit", "srbm_scud", "slbm_f", "asw_mk54", "torpedo", "depthchg", "ironbombs", "jdam_hvy", "ciws", "decoy_chaff"];
  var MATS = ["earth", "rock", "structure", "armour", "hull", "flesh", "water", "air"];
  var CUES = ["click", "sel_inf", "sel_veh", "sel_air", "sel_sea", "sel_sup", "sel_bld", "sel_intel", "sel_drop", "order", "ack_atk", "build",
              "ready", "unitready", "sell", "alarm", "under_fire", "threat_med", "threat_high", "launch_ballistic", "stealth_pass", "lock_warn",
              "shot", "cannon", "missile", "explode", "explode_big", "die_inf", "water"];
  var FAR = { x: 2048 + FAROFF.x, y: 2048 + FAROFF.y };  // the scenes above move the camera; fresh() puts it back
  function slug(s) { return String(s).replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, ""); }
  var jobs = [];
  WPN.forEach(function (id) {
    ["near", "far"].forEach(function (pos) {
      jobs.push({ slug: "wpn_" + slug(id) + "_" + pos, fire: function (S) { var p = pos === "near" ? CAM : FAR; S.weapon(WEAPONS[id], p.x, p.y); } });
    });
  });
  MATS.forEach(function (mt) {
    [["near", 0.25], ["near", 0.9], ["far", 0.9]].forEach(function (pe) {
      jobs.push({ slug: "imp_" + mt + "_e" + Math.round(pe[1] * 100) + "_" + pe[0], fire: function (S) { var p = pe[0] === "near" ? CAM : FAR; S.impact(mt, p.x, p.y, pe[1]); } });
    });
  });
  [["near", 0.18], ["near", 0.45], ["near", 0.75], ["near", 1.0], ["far", 0.45], ["far", 1.0]].forEach(function (ps) {
    [false, true].forEach(function (wat) {
      jobs.push({ slug: "boom_" + (wat ? "water" : "land") + "_s" + Math.round(ps[1] * 100) + "_" + ps[0],
                  fire: function (S) { var p = ps[0] === "near" ? CAM : FAR; S.boom(p.x, p.y, ps[1], wat); } });
    });
  });
  CUES.forEach(function (c) {
    jobs.push({ slug: "cue_" + c, fire: c === "water" ? function (S) { S.play("water", CAM.x, CAM.y); } : function (S) { S.play(c); } });
  });
  jobs.push({ slug: "bed_intensity", timeline: function (S, ctx) {
    for (var f = 0; f < 540; f++) { var t = f / 60; S.setIntensity(t < 3 ? 0.2 : t < 6 ? 1.0 : 0); ctx.__renderTo(t + 1 / 60); }
  } });
  function render(job, audio) {
    var S = fresh(job.slug, audio), ctx = S.ctx;
    if (job.timeline) job.timeline(S, ctx);
    else { job.fire(S); ctx.__renderUntilQuiet(12, 0.4); }
    var out = ctx.__output(0.05), n = out.length, pcm = new Int16Array(n * 2);
    for (var i = 0; i < n; i++) {
      var a = Math.round(out.L[i] * 32767), b = Math.round(out.R[i] * 32767);
      pcm[2 * i] = a > 32767 ? 32767 : a < -32768 ? -32768 : a;
      pcm[2 * i + 1] = b > 32767 ? 32767 : b < -32768 ? -32768 : b;
    }
    return pcm;
  }
  function fnv(pcm) {                                      // FNV-1a over the little-endian bytes
    var h = 2166136261 >>> 0;
    for (var i = 0; i < pcm.length; i++) {
      var v = pcm[i] & 0xffff;
      h = Math.imul(h ^ (v & 0xff), 16777619) >>> 0;
      h = Math.imul(h ^ (v >>> 8), 16777619) >>> 0;
    }
    return ("0000000" + h.toString(16)).slice(-8) + ":" + pcm.length;
  }
  /* HEAD's digests (081caf0), each "fnv1a:samples"; --measure reprints them */
  var DIGEST = {
    "wpn_rifle_near": "d953eccb:100196", "wpn_rifle_far": "d212f6f6:102936", "wpn_w_e60_pact_rifle_near": "0de33129:97246",
    "wpn_w_e60_pact_rifle_far": "6aa3da9f:111306", "wpn_lmg_near": "a120a6b9:90676", "wpn_lmg_far": "abfced16:102324",
    "wpn_hmg_near": "fbf4cdcd:115348", "wpn_hmg_far": "50ebbf88:116584", "wpn_w_e80_kpa_ifv_near": "a1083cb8:113504",
    "wpn_w_e80_kpa_ifv_far": "82277d11:128012", "wpn_sniper_near": "265f182a:136586", "wpn_sniper_far": "c145e533:141432",
    "wpn_spectre20_near": "062f14b8:127026", "wpn_spectre20_far": "6206ac10:152612", "wpn_chaingun_near": "091afd3c:131348",
    "wpn_chaingun_far": "5d68b68f:147590", "wpn_spaag_near": "24adf37f:127484", "wpn_spaag_far": "1d003162:166846",
    "wpn_w_e50_gbr_aa_near": "9d45f7d0:149568", "wpn_w_e50_gbr_aa_far": "d5b3fb70:156818", "wpn_gun_light_near": "1b461e2d:253724",
    "wpn_gun_light_far": "5016ab2b:383190", "wpn_w_e50_kpa_mbt_near": "92b3b99e:259936", "wpn_w_e50_kpa_mbt_far": "ba0f736b:359284",
    "wpn_gun_105_near": "6417a128:289514", "wpn_gun_105_far": "69aef4b5:400478", "wpn_gun_120_near": "e9b555a9:273314",
    "wpn_gun_120_far": "ecbaf4bf:433162", "wpn_gun_125_near": "53cbe898:279848", "wpn_gun_125_far": "b6155af4:453760",
    "wpn_aagun_dp127_near": "2c1ce918:315126", "wpn_aagun_dp127_far": "64d5c61e:507278", "wpn_coast_gun_near": "802432a8:310304",
    "wpn_coast_gun_far": "a30b6132:546686", "wpn_w_e50_nato_cruiser_near": "2c2a0474:375440", "wpn_w_e50_nato_cruiser_far": "faba135c:587772",
    "wpn_mortar_near": "e1159a23:153676", "wpn_mortar_far": "820085e0:244348", "wpn_howitzer105_near": "9919a815:312628",
    "wpn_howitzer105_far": "dbdecb86:483870", "wpn_pzh2000_l52_near": "360955ad:391958", "wpn_pzh2000_l52_far": "18908238:574808",
    "wpn_navgun_203_near": "b2c1d9dd:376272", "wpn_navgun_203_far": "59a4dbea:603832", "wpn_w_e60_kpa_at_near": "0412580b:96096",
    "wpn_w_e60_kpa_at_far": "d85328a5:139172", "wpn_w_e80_nato_mlrs_near": "ccc348c7:119696", "wpn_w_e80_nato_mlrs_far": "40987783:160362",
    "wpn_mrl240_near": "d1ad7edd:116414", "wpn_mrl240_far": "a9a2a14e:158004", "wpn_w_e90_fra_aa_near": "fb8054b6:135558",
    "wpn_w_e90_fra_aa_far": "e706c4c9:170124", "wpn_atgm_veh_near": "2a967a62:139150", "wpn_atgm_veh_far": "1ac407ae:188478",
    "wpn_sam_site_near": "9b82788a:193306", "wpn_sam_site_far": "a31dc234:238722", "wpn_ssm_granit_near": "5ee55686:233414",
    "wpn_ssm_granit_far": "8ea5d7c6:276272", "wpn_srbm_scud_near": "efa293ad:290634", "wpn_srbm_scud_far": "60783d99:374720",
    "wpn_slbm_f_near": "c08f51c2:408474", "wpn_slbm_f_far": "ee8bd3cc:473766", "wpn_asw_mk54_near": "df454472:84364",
    "wpn_asw_mk54_far": "bf7968d3:110024", "wpn_torpedo_near": "7b37cc4a:123230", "wpn_torpedo_far": "3b927ffa:144734",
    "wpn_depthchg_near": "e6ee79ac:60134", "wpn_depthchg_far": "2c96ecb7:82420", "wpn_ironbombs_near": "23f83a5e:88490",
    "wpn_ironbombs_far": "c1112c4d:115314", "wpn_jdam_hvy_near": "7158e21e:88474", "wpn_jdam_hvy_far": "9bd9066b:115232",
    "wpn_ciws_near": "8a333500:115640", "wpn_ciws_far": "3ce68625:144126", "wpn_decoy_chaff_near": "2699e199:79608",
    "wpn_decoy_chaff_far": "22bc63ee:103548", "imp_earth_e25_near": "d3d15f2b:45202", "imp_earth_e90_near": "25c9bf9f:87510",
    "imp_earth_e90_far": "289bd3bf:115002", "imp_rock_e25_near": "caed474e:42416", "imp_rock_e90_near": "b2c43df5:60260",
    "imp_rock_e90_far": "9d900e39:87444", "imp_structure_e25_near": "bb638672:67084", "imp_structure_e90_near": "9630f4f9:104496",
    "imp_structure_e90_far": "86285088:131432", "imp_armour_e25_near": "1b3bbf00:51200", "imp_armour_e90_near": "fb50f842:30994",
    "imp_armour_e90_far": "5b08c862:77406", "imp_hull_e25_near": "2621acee:93338", "imp_hull_e90_near": "f86b3bf3:73470",
    "imp_hull_e90_far": "698f9091:105088", "imp_flesh_e25_near": "da384b23:26334", "imp_flesh_e90_near": "bea2eb92:29192",
    "imp_flesh_e90_far": "91e1c38b:55214", "imp_water_e25_near": "cc52e02d:81902", "imp_water_e90_near": "64cfb68b:118646",
    "imp_water_e90_far": "787b549a:148276", "imp_air_e25_near": "9dc7369d:31568", "imp_air_e90_near": "42591370:36376",
    "imp_air_e90_far": "326e652b:63328", "boom_land_s18_near": "aaf086ae:102170", "boom_water_s18_near": "1fea30dc:120172",
    "boom_land_s45_near": "705b8a1d:134148", "boom_water_s45_near": "41a6f961:146462", "boom_land_s75_near": "03201874:187862",
    "boom_water_s75_near": "7636cb20:181112", "boom_land_s100_near": "87654a75:231936", "boom_water_s100_near": "09c633b6:220028",
    "boom_land_s45_far": "f631a637:169838", "boom_water_s45_far": "590f80d4:167824", "boom_land_s100_far": "1b0e2f9e:252822",
    "boom_water_s100_far": "74352b56:247778", "cue_click": "aaaa46b1:13502", "cue_sel_inf": "4fbdaf89:15614", "cue_sel_veh": "ea3573b9:16862",
    "cue_sel_air": "236411ed:18014", "cue_sel_sea": "fcfa43a1:29246", "cue_sel_sup": "e536a07d:15134", "cue_sel_bld": "b1f41b55:20318",
    "cue_sel_intel": "000a6359:19288", "cue_sel_drop": "6d6d8299:14558", "cue_order": "a7806861:15902", "cue_ack_atk": "7cdf1ca5:14942",
    "cue_build": "678a5ddd:20606", "cue_ready": "6a786019:39228", "cue_unitready": "badd1561:27708", "cue_sell": "17d928c1:28190",
    "cue_alarm": "4cb6f5e9:55550", "cue_under_fire": "0023ff11:47870", "cue_threat_med": "15b93b41:130448", "cue_threat_high": "db5d6091:255336",
    "cue_launch_ballistic": "9389ff7d:295194", "cue_stealth_pass": "ceb8d281:180122", "cue_lock_warn": "66e13985:67358",
    "cue_shot": "da93da27:88690", "cue_cannon": "8196e6e1:279574", "cue_missile": "bd42a370:137934", "cue_explode": "20982efe:136582",
    "cue_explode_big": "e810eb37:259018", "cue_die_inf": "d66d1728:59552", "cue_water": "2fca5dc5:38912", "bed_intensity": "2d29ca8d:864000"
  };
  var mismatched = [], table = [];
  jobs.forEach(function (job) {
    var pcm = render(job), dg = fnv(pcm);
    table.push('"' + job.slug + '":"' + dg + '"');
    if (REF) {
      var ref = render(job, REF + "/js/audio.js"), same = ref.length === pcm.length;
      for (var i = 0; same && i < pcm.length; i++) if (pcm[i] !== ref[i]) same = false;
      if (!same) mismatched.push(job.slug);
    } else if (DIGEST[job.slug] !== dg) mismatched.push(job.slug + " (" + dg + ", HEAD " + DIGEST[job.slug] + ")");
  });
  judge(!mismatched.length, mismatched.length + " of " + jobs.length + " non-engine sounds no longer render as " + (REF ? REF : "HEAD") + " did: " +
        mismatched.slice(0, 8).join(", ") + (mismatched.length > 8 ? ", ..." : "") +
        (REF ? "" : " - if that was a deliberate change to them, --measure prints the table to paste over DIGEST"));
  print("identity: " + jobs.length + " weapon, impact, blast, cue and bed renders, " + (jobs.length - mismatched.length) + " sample for sample as " + (REF ? REF : "HEAD"));
  if (MEASURE) print("IDENTITY TABLE {" + table.join(",") + "}");

  print(MEASURE ? "check_engine_mix: measured " + checks + " figures (--measure: nothing judged)"
                : fails ? "check_engine_mix: FAIL (" + fails + " of " + checks + " rules broken)"
                        : "check_engine_mix: PASS (" + checks + " rules)");
  if (fails) throw new Error("check_engine_mix: " + fails + " rules broken");
})();
