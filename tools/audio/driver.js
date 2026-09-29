/* ============ tools/audio/driver.js - fire every sound the game can make ============

   Run through audition.py, which hands it:
       jsc tools/audio/driver.js -- ROOT RAWDIR [FILTER_REGEX] [OPTIONS_JSON]
   ROOT is the game tree to render (its index.html, js/ and tools/jsc/env.js);
   the tool's own files load from OPTIONS.tool when given, so an uncommitted
   copy of this tool can render any tree.
   and turns what it writes (raw PCM, spectrogram bytes, envelopes and
   manifest.json in RAWDIR) into WAVs, PNGs, a contact sheet and metrics.

   HOW A SOUND IS MADE HERE IS HOW THE GAME MAKES IT. The page's own DOM
   stand-in (tools/jsc/env.js) is loaded, then every script index.html loads
   BEFORE js/audio.js, in the same order (so WEAPONS carries the calibres,
   warheads and damage that eras.js, heavyair.js and generations.js add), and
   then js/audio.js itself, untouched, with the emulator installed as
   window.AudioContext. Each sound is then triggered through the public Sfx
   surface with the arguments the game passes:
     weapons  Sfx.weapon(WEAPONS[id], x, y)  - what audio.js's Combat.fire hook
              calls with the shooter's position
     impacts  Sfx.impact(material, x, y, energy) - what its projectile poll
              and hitscan scheduler call
     booms    Sfx.boom(x, y, scale, water)
     cues     Sfx.play(name) - positionless, as every call site in js/ does
     engines  Sfx.updateEngines(game, dt) every 100 ms for a unit that idles,
              drives and idles, as the audio driver's frame loop does
     bed      Sfx.setIntensity(level) every frame, as threat.js does
   Every sound gets a FRESH copy of audio.js (a new context, bus, voice table
   and rate-limit memory), so nothing one sound leaves behind colours the
   next, and Math.random is seeded from the sound's name (not its number), so
   a re-render is sample-identical and a designer's before/after differ only
   by their edit.

   The listener is Render.cam at (2048, 2048), zoom 1. "near" puts the source
   on the camera focus (0 m: no air absorption, no pan, no delay). "far" puts
   it 360 px right and 600 px up-screen: 700 px = 560 m at audio.js's
   M_PER_PX 0.8, which audio.js turns into pan +0.59, a 4.3 kHz two-stage
   air-absorption lowpass and the 280 ms arrival-delay cap - a gun near the
   edge of a zoomed-in screen.

   COST, per call: the WebAudio nodes the call created (not counting the bus
   ensure() built before it), the automation events it scheduled, and the
   wall time of the call in jsc - once cold (the first call in a context
   also fills audio.js's 2.2 s noise buffer, as the first shot of a game
   does) and as the median of 9 warm repeats. jsc runs the same JavaScript
   engine as Safari, but node construction here is the emulator's, not a
   browser's native code, so read the milliseconds as relative cost and the
   node counts as absolute.
   ========================================================================= */

var __DRIVER_ARGS = (typeof arguments !== "undefined") ? arguments : [];
(function () {
  "use strict";
  var ROOT = __DRIVER_ARGS[0], OUT = __DRIVER_ARGS[1];
  var ONLY = __DRIVER_ARGS[2] ? new RegExp(__DRIVER_ARGS[2]) : null;
  var OPTS = __DRIVER_ARGS[3] ? JSON.parse(__DRIVER_ARGS[3]) : {};
  if (!ROOT || !OUT) { print("usage: jsc tools/audio/driver.js -- ROOT RAWDIR [FILTER] [OPTIONS_JSON]"); return; }
  var TOOL = OPTS.tool || (ROOT + "/tools/audio");
  load(TOOL + "/webaudio_emu.js");
  load(TOOL + "/analysis.js");

  /* ---- the page environment audio.js expects ---- */
  globalThis.__IDS = {}; globalThis.__HASH = ""; globalThis.__SEARCH = ""; globalThis.__QUIET_CONSOLE = true;
  load(ROOT + "/tools/jsc/env.js");
  WebAudioEmu.install(globalThis);
  var perfOff = 0;
  performance.now = function () { return preciseTime() * 1000 + perfOff; };
  var warns = [];
  console.warn = function () { warns.push(Array.prototype.join.call(arguments, " ")); };
  console.error = console.warn;

  var html = read(ROOT + "/index.html");
  var re = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi, m, pre = [], all = [];
  var sawAudio = false;
  while ((m = re.exec(html))) {
    var src = m[1].split("?")[0];
    all.push(src);
    if (/(^|\/)audio\.js$/.test(src)) sawAudio = true;
    else if (!sawAudio) pre.push(src);
  }
  if (!sawAudio) { print("[driver] index.html does not load js/audio.js - nothing to render"); return; }
  pre.forEach(function (s) {
    try { load(ROOT + "/" + s); } catch (e) { print("[driver] load error " + s + ": " + e); }
  });
  var CAM = { x: 2048, y: 2048, z: 1 };
  globalThis.Render = { cam: CAM };
  var AUDIO = ROOT + "/js/audio.js";

  /* call sites of each cue name, for the catalogue: lines in the game's own
     scripts that mention Sfx and the quoted name */
  var siteText = [];
  all.forEach(function (s) {
    if (/three\.min\.js$|(^|\/)audio\.js$/.test(s)) return;
    try { siteText.push(read(ROOT + "/" + s)); } catch (e) {}
  });
  function callSites(name) {
    var n = 0, q = '"' + name + '"';
    for (var i = 0; i < siteText.length; i++) {
      var lines = siteText[i].split("\n");
      for (var j = 0; j < lines.length; j++) if (lines[j].indexOf("Sfx.") >= 0 && lines[j].indexOf(q) >= 0) n++;
    }
    return n;
  }

  /* ---- deterministic randomness ---- */
  function seedRandom(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
    var s = h;
    Math.random = function () {                    // mulberry32
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ============================== catalogue ============================== */
  var FAR = { x: CAM.x + 360, y: CAM.y - 600 };
  var farPx = Math.sqrt(360 * 360 + 600 * 600), farM = farPx * 0.8;
  var WHERE = {
    near: "at the camera focus: 0 m, centred, no air absorption, no delay",
    far: "far: " + farM.toFixed(0) + " m (360 px right, 600 px up-screen), pan +" + (Math.min(1, 360 / 520) * 0.85).toFixed(2) +
         ", air-absorption lowpass " + (19000 * Math.pow(0.5, farM / 260) / 1000).toFixed(1) + " kHz, arrival +" +
         Math.round(Math.min(0.28, farM / 1500) * 1000) + " ms",
    ui: "UI bus, not positional",
  };
  var jobs = [];
  var n = 0;
  function add(j) { n++; j.id = ("00" + n).slice(-3) + "_" + j.slug; jobs.push(j); }
  function slug(s) { return String(s).replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, ""); }

  /* Every kind audio.js tells apart (kindOf: mg, gun, arc, rocket, missile,
     torpedo, depth, bomb, ciws), every gun bore class (the ring changes at
     45 mm and for flak; everything else scales continuously with bore, so the
     guns walk 20 -> 203 mm), and two rows that show what the calibre parser
     makes of a cartridge name and of a decoy launcher. */
  var WPN = [
    ["rifle", "5.56 mm rifle"],
    ["w_e60_pact_rifle", "AKM 7.62x39 mm - the parser reads the case length: bore 39 mm"],
    ["lmg", "7.62 mm GPMG"],
    ["hmg", "12.7 mm HMG"],
    ["w_e80_kpa_ifv", "14.5 mm KPVT"],
    ["sniper", "12.7 mm anti-materiel rifle"],
    ["spectre20", "20 mm Vulcan (tracer: gun voice)"],
    ["chaingun", "30 mm chain gun"],
    ["spaag", "35 mm twin AA, flak"],
    ["w_e50_gbr_aa", "40 mm Bofors L/70, flak"],
    ["gun_light", "76 mm tank gun"],
    ["w_e50_kpa_mbt", "85 mm ZiS-S-53"],
    ["gun_105", "105 mm rifled"],
    ["gun_120", "120 mm M256"],
    ["gun_125", "125 mm smoothbore"],
    ["aagun_dp127", "127 mm/54 dual-purpose, flak"],
    ["coast_gun", "152 mm coastal gun"],
    ["w_e50_nato_cruiser", "203 mm/55 naval gun"],
    ["mortar", "81 mm mortar (arc)"],
    ["howitzer105", "105 mm howitzer (arc)"],
    ["pzh2000_l52", "155 mm L/52 (arc)"],
    ["navgun_203", "203 mm main battery (arc)"],
    ["w_e60_kpa_at", "RPG-7 (rocket)"],
    ["w_e80_nato_mlrs", "227 mm MLRS (rocket)"],
    ["mrl240", "240 mm rocket pod (rocket)"],
    ["w_e90_fra_aa", "Mistral MANPADS (missile)"],
    ["atgm_veh", "TOW-2 (missile)"],
    ["sam_site", "Patriot (missile)"],
    ["ssm_granit", "P-700 Granit (missile)"],
    ["srbm_scud", "R-17 SRBM (missile)"],
    ["slbm_f", "M51 SLBM (missile)"],
    ["asw_mk54", "Mk 54 lightweight torpedo"],
    ["torpedo", "heavyweight torpedo"],
    ["depthchg", "depth charge"],
    ["ironbombs", "iron bomb release"],
    ["jdam_hvy", "2000 lb JDAM release"],
    ["ciws", "20 mm CIWS (proj none)"],
    ["decoy_chaff", "Nulka / chaff decoy (proj none: CIWS voice)"],
  ];
  WPN.forEach(function (w) {
    var row = WEAPONS[w[0]];
    if (!row) { print("[driver] no such weapon " + w[0] + " - skipped"); return; }
    ["near", "far"].forEach(function (pos) {
      add({
        slug: "wpn_" + slug(w[0]) + "_" + pos, group: "weapon", pos: pos,
        label: row.name + ", " + pos,
        desc: w[1],
        call: "Sfx.weapon(WEAPONS." + w[0] + ", " + (pos === "near" ? "focus" : "far") + ")",
        weaponId: w[0],
        fire: function (S) { var p = pos === "near" ? CAM : FAR; S.weapon(WEAPONS[w[0]], p.x, p.y); },
      });
    });
  });

  /* every material emitImpact distinguishes, light and heavy round, and the
     heavy one again at range */
  var MATS = [["earth", "open ground (default)"], ["rock", "rock"], ["structure", "concrete, urban, road"],
              ["armour", "a tank's steel box"], ["hull", "a ship's hull"], ["flesh", "infantry"],
              ["water", "a round into water"], ["air", "a proximity burst / intercept"]];
  MATS.forEach(function (mt) {
    [["near", 0.25], ["near", 0.9], ["far", 0.9]].forEach(function (pe) {
      var pos = pe[0], e = pe[1];
      add({
        slug: "imp_" + mt[0] + "_e" + Math.round(e * 100) + "_" + pos, group: "impact", pos: pos,
        label: "impact " + mt[0] + ", energy " + e + ", " + pos,
        desc: mt[1] + ", energy " + e + (e < 0.3 ? " (a rifle or MG round, dmg/120)" : " (a heavy round, dmg/320)"),
        call: 'Sfx.impact("' + mt[0] + '", ' + (pos === "near" ? "focus" : "far") + ", " + e + ")",
        fire: function (S) { var p = pos === "near" ? CAM : FAR; S.impact(mt[0], p.x, p.y, e); },
      });
    });
  });

  /* booms: 0.18 is the smallest scale the projectile poll asks for */
  [["near", 0.18], ["near", 0.45], ["near", 0.75], ["near", 1.0], ["far", 0.45], ["far", 1.0]].forEach(function (ps) {
    [false, true].forEach(function (water) {
      var pos = ps[0], sc = ps[1];
      add({
        slug: "boom_" + (water ? "water" : "land") + "_s" + Math.round(sc * 100) + "_" + pos, group: "boom", pos: pos,
        label: "explosion on " + (water ? "water" : "land") + ", scale " + sc + ", " + pos,
        desc: "scale " + sc + (water ? " on water" : " on land"),
        call: "Sfx.boom(" + (pos === "near" ? "focus" : "far") + ", " + sc + ", " + water + ")",
        fire: function (S) { var p = pos === "near" ? CAM : FAR; S.boom(p.x, p.y, sc, water); },
      });
    });
  });

  var CUES = ["click", "sel_inf", "sel_veh", "sel_air", "sel_sea", "sel_sup", "sel_bld", "sel_intel", "sel_drop",
              "order", "ack_atk", "build", "ready", "unitready", "sell", "alarm", "under_fire", "threat_med",
              "threat_high", "launch_ballistic", "stealth_pass", "lock_warn",
              "shot", "cannon", "missile", "explode", "explode_big", "die_inf", "water"];
  /* how the game reaches each cue, so a designer knows whether a player can
     ever hear it */
  var selectSites = 0;
  siteText.forEach(function (t) { var mm = t.match(/Sfx\.select\(/g); if (mm) selectSites += mm.length; });
  function reach(c, sites) {
    if (/^sel_(inf|veh|air|sea|sup|bld)$/.test(c)) return "played by Sfx.select(), the class of the selection decides (" + selectSites + " select call sites)";
    if (/^(shot|cannon|missile)$/.test(c))
      return "combat.js plays it inside Combat.fire, where audio.js's own hook swallows it and the weapon's real report plays instead (" + sites + " call sites)";
    if (sites === 0) return "NO CALL SITE in js/: never heard in play";
    return sites + " call site" + (sites === 1 ? "" : "s") + " in js/";
  }
  CUES.forEach(function (c) {
    var sites = callSites(c);
    add({
      slug: "cue_" + c, group: "cue", pos: "ui",
      label: "cue " + c.replace(/_/g, " "),
      desc: c === "water" ? "MISSING: combat.js asks for it when a sub-launched missile breaches and audio.js has no such cue - it plays nothing"
            : (/^(shot|cannon|missile|explode|explode_big|die_inf)$/.test(c) ? "diegetic legacy cue, positionless as the game calls it; " : "") + reach(c, sites),
      call: c === "water" ? 'Sfx.play("water", focus)' : 'Sfx.play("' + c + '")',
      sites: sites,
      fire: c === "water" ? function (S) { S.play("water", CAM.x, CAM.y); } : function (S) { S.play(c); },
    });
  });

  function engineJob(key, what) {
    var d = UNITS[key];
    if (!d) { print("[driver] no such unit " + key); return; }
    add({
      slug: "eng_" + key, group: "engine", pos: "near",
      label: "engine, " + d.name,
      desc: what + ": idle 1.2 s, drive 2.4 s at " + (d.speed * 32).toFixed(0) + " px/s, idle 1.2 s, then out of range (0.25 s fade)",
      call: "Sfx.updateEngines(game, 0.1) every 100 ms",
      timeline: function (S, ctx) {
        var u = { id: 1, cat: d.cat, layer: d.layer, def: d, x: CAM.x - 60, y: CAM.y, dead: false, moving: false,
                  speedMul: function () { return 1; } };
        var game = { players: [{ units: [u] }] }, times = [], dt = 0.1;
        for (var step = 0; step < 48; step++) {
          var t = step * dt, mv = t >= 1.2 - 1e-9 && t < 3.6 - 1e-9;
          u.moving = mv;
          if (mv) u.x += (d.speed || 2) * 32 * dt;
          var c0 = preciseTime(); S.updateEngines(game, dt); times.push((preciseTime() - c0) * 1000);
          ctx.__renderTo(t + dt);
        }
        game.players[0].units = [];
        S.updateEngines(game, dt);
        ctx.__renderUntilQuiet(ctx.currentTime + 2, 0.3);
        return times;
      },
    });
  }
  engineJob("mbt_n", "tracked heavy, 62 t");
  engineJob("recon_n", "wheeled scout, 5 t");
  engineJob("harvester", "ore hauler, 40 t");
  engineJob("destroyer_n", "destroyer");
  add({
    slug: "bed_intensity", group: "bed", pos: "ui",
    label: "combat intensity bed",
    desc: "setIntensity 0.2 for 3 s, 1.0 for 3 s, 0 for 3 s",
    call: "Sfx.setIntensity(level) every frame (60 Hz)",
    timeline: function (S, ctx) {
      var times = [];
      for (var f = 0; f < 540; f++) {
        var t = f / 60, lvl = t < 3 ? 0.2 : t < 6 ? 1.0 : 0;
        var c0 = preciseTime(); S.setIntensity(lvl); times.push((preciseTime() - c0) * 1000);
        ctx.__renderTo(t + 1 / 60);
      }
      return times;
    },
  });

  if (OPTS.list) { jobs.forEach(function (j) { print(j.id + "\t" + j.call + "\t" + j.desc); }); return; }

  /* ============================== rendering ============================== */
  function median(a) { if (!a.length) return null; var b = a.slice().sort(function (x, y) { return x - y; }); return b[b.length >> 1]; }
  function r3(x) { return (x === null || x === undefined || !isFinite(x)) ? null : Math.round(x * 1000) / 1000; }
  function diffStats(a, b) {
    var by = {};
    for (var k in a.byType) { var d = a.byType[k] - (b.byType[k] || 0); if (d) by[k] = d; }
    return { nodes: a.nodes - b.nodes, byType: by, autoEvents: a.autoEvents - b.autoEvents,
             connections: a.connections - b.connections, buffers: a.buffers - b.buffers };
  }
  var COLS = OPTS.cols || 1100;
  var manifest = { generated: new Date().toISOString(), root: ROOT, sampleRate: 48000, camera: CAM, far: FAR,
                   where: WHERE, scriptsBeforeAudio: pre, sounds: [] };

  var selected = jobs.filter(function (j) { return !ONLY || ONLY.test(j.id); });
  var tAll = preciseTime();
  selected.forEach(function (job, idx) {
    var tj = preciseTime();
    seedRandom(job.slug);                          // by name, not number: adding sounds never reshuffles the rest
    warns.length = 0;
    var unsup0 = WebAudioEmu.unsupported.length;
    load(AUDIO);                                   // a fresh Sfx for every sound
    var S = Sfx;
    S.ensure();
    var ctx = S.ctx;
    var st0 = ctx.__stats(), cost, first, warm = [];
    if (job.timeline) {
      var times = job.timeline(S, ctx);
      cost = diffStats(ctx.__stats(), st0);
      first = times[0]; warm = times.slice(1);
    } else {
      var c0 = preciseTime();
      job.fire(S);
      first = (preciseTime() - c0) * 1000;
      cost = diffStats(ctx.__stats(), st0);
      ctx.__renderUntilQuiet(job.maxSec || 12, 0.4);
    }
    var out = ctx.__output(0.05);
    var L = out.L, R = out.R, len = out.length, sr = out.sampleRate;
    var lim = ctx.__limiterMinDb();
    if (!job.timeline) {
      for (var k = 0; k < 9; k++) {
        ctx.__jump(12); perfOff += 12000;
        var c1 = preciseTime(); job.fire(S); warm.push((preciseTime() - c1) * 1000);
      }
    }
    var lv = AudioAnalysis.levels(L, R, sr);
    var ld = AudioAnalysis.loudness(L, R, sr);
    var sp = AudioAnalysis.spectrogram(L, R, sr, { span: lv, rows: OPTS.rows || 256 });
    var env = AudioAnalysis.envelope(L, R, COLS);
    var pcm = new Int16Array(len * 2);
    for (var i = 0; i < len; i++) {
      var a = Math.round(L[i] * 32767), b = Math.round(R[i] * 32767);
      pcm[2 * i] = a > 32767 ? 32767 : a < -32768 ? -32768 : a;
      pcm[2 * i + 1] = b > 32767 ? 32767 : b < -32768 ? -32768 : b;
    }
    writeFile(OUT + "/" + job.id + ".pcm", pcm.buffer);
    writeFile(OUT + "/" + job.id + ".spec", sp.data.buffer);
    writeFile(OUT + "/" + job.id + ".env", env.buffer);
    var rec = {
      id: job.id, group: job.group, pos: job.pos, label: job.label, desc: job.desc, call: job.call,
      where: WHERE[job.pos] || "",
      frames: len, duration_s: r3(len / sr),
      silent: lv.peak === 0,
      peak_dbfs: r3(lv.peak_dbfs), rms_dbfs: r3(lv.rms_dbfs), crest_db: r3(lv.crest_db),
      lufs: r3(ld.integrated), lufs_mmax: r3(ld.momentaryMax),
      onset_ms: r3(lv.onset_ms), dur60_ms: r3(lv.dur60_ms), dur50_ms: r3(lv.dur50_ms), end60_ms: r3(lv.end60_ms),
      centroid_hz: r3(sp.centroid),
      nodes: cost.nodes, nodes_by_type: cost.byType, auto_events: cost.autoEvents,
      connections: cost.connections, buffers: cost.buffers,
      sched_ms_first: r3(first), sched_ms_warm: r3(median(warm)), sched_calls: warm.length + 1,
      limiter_gr_db: r3(lim[0]), engine_comp_gr_db: r3(lim[1]),
      spec: { frames: sp.frames, rows: sp.rows, hop: sp.hop, fLo: sp.fLo, fHi: sp.fHi, dbLo: sp.dbLo, dbHi: sp.dbHi, split: sp.split, NL: sp.NL, NS: sp.NS },
      env_cols: COLS,
      warnings: warns.slice(), unsupported: WebAudioEmu.unsupported.slice(unsup0),
      render_s: r3(preciseTime() - tj),
    };
    if (job.weaponId) rec.weapon = S.describe(WEAPONS[job.weaponId]);
    if (job.sites !== undefined) rec.call_sites = job.sites;
    manifest.sounds.push(rec);
    print("[" + (idx + 1) + "/" + selected.length + "] " + job.id + "  " + (rec.silent ? "SILENT" : rec.peak_dbfs.toFixed(1) + " dBFS") +
          "  " + rec.nodes + " nodes  " + rec.duration_s + " s  (" + rec.render_s.toFixed(2) + " s)" +
          (rec.warnings.length || rec.unsupported.length ? "  !! " + rec.warnings.concat(rec.unsupported).join("; ") : ""));
  });
  manifest.render_total_s = r3(preciseTime() - tAll);
  writeFile(OUT + "/manifest.json", JSON.stringify(manifest, null, 1));
  print("[driver] " + selected.length + " sounds in " + manifest.render_total_s.toFixed(1) + " s");
})();
