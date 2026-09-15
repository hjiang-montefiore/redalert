/* ============ audio.js - procedural battle audio, no sample files ============

   Everything here is synthesised at runtime through the Web Audio graph. The
   game is served from file:// so there is no server to fetch samples from and
   an XHR for a local .wav would be blocked anyway.

   Signal path
       one-shots  -----> sfxBus --+
       engines --> engComp -------+
       UI / threat cues --> uiBus +--> master --> limiter --> softclip --> out
       intensity bed -------------+       ^
                                          |
                                     duck() rides this

   WEAPON REPORTS are not a hand-written case per gun. They are built from the
   weapon row in rules.js: the calibre parsed out of WEAPONS[id].name, the
   projectile type, the warhead and the damage figure together decide the body
   frequency, the tail length, how much supersonic crack sits on top and how
   much sub-bass sits underneath. Add a gun to rules.js and it gets a report of
   the right size for nothing. A 7.62 mm GPMG lands near 1370 Hz with a 96 ms
   tail and almost no sub; a 125 mm smoothbore lands near 246 Hz with a 790 ms
   tail and a 74 Hz thump under it.

   DISTANCE is a three-part model: amplitude falls off on a curve whose knee
   scales with calibre (a tank gun carries much further than a rifle), the high
   end is rolled off by a lowpass standing in for air absorption, and the whole
   report is delayed by the flight time of the sound. A gun across the map
   thuds late and dull; one beside you cracks.

   The public surface that the rest of js/ already uses - play, ensure,
   setIntensity, duck - is unchanged. Everything new is additive, and audio.js
   wires itself into Combat on its own rather than asking other files to
   change: it wraps Combat.fire for reports and watches Combat.projectiles for
   impacts.
   ========================================================================= */

var Sfx = (function () {
  "use strict";

  /* ------------------------------------------------------------- tuning */
  var BASE_GAIN   = 0.32;   // legacy master level; duck() still returns here
  var mixLevel    = 0.32;   // BASE_GAIN as adjusted by volume() and setEnabled()
  var MAX_VOICES  = 22;     // simultaneous spatial one-shots
  var MAX_ENGINES = 7;      // simultaneous engine beds
  var ENGINE_MIX  = 0.26;   // engines are a bed, never a feature
  var MAX_DELAY   = 0.28;   // s, cap on the speed-of-sound arrival lag

  /* Distances are world pixels converted to a nominal metre scale so that the
     falloff curve, the air-absorption filter and the arrival delay all share
     one honest unit. One 32 px tile is treated as 25 m. True ground scale
     would put a tank gun two kilometres out and turn everything on the far
     side of the screen into inaudible mud, which is accurate and useless. */
  var M_PER_PX = 0.8;
  var C_SOUND  = 1500;      // dramatised; 340 would lag a screen-wide shot 1.6 s

  var ctx = null, enabled = true, started = false;
  var master = null, sfxBus = null, engBus = null, uiBus = null, bedBus = null;

  /* ------------------------------------------------------- small helpers */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* Offline renders need to be repeatable, so the jitter that keeps repeated
     shots from sounding identical runs off a switchable LCG. */
  var detSeed = 0, det = false;
  function rnd() {
    if (!det) return Math.random();
    detSeed = (detSeed * 1664525 + 1013904223) >>> 0;
    return detSeed / 4294967296;
  }
  function vary(amount) { return 1 + (rnd() * 2 - 1) * amount; }

  /* One long white-noise buffer per context, read from a random offset. Far
     cheaper than filling a fresh buffer for every round of a burst. */
  var noiseCache = (typeof WeakMap !== "undefined") ? new WeakMap() : null;
  function noiseBuf(ac) {
    var b = noiseCache && noiseCache.get(ac);
    if (b) return b;
    var n = Math.floor(ac.sampleRate * 2.2);
    b = ac.createBuffer(1, n, ac.sampleRate);
    var d = b.getChannelData(0), last = 0;
    for (var i = 0; i < n; i++) {
      /* a touch of one-pole smoothing takes the fizz off pure white and makes
         it read as air rather than as a broken tweeter */
      var w = Math.random() * 2 - 1;
      last = last * 0.18 + w * 0.82;
      d[i] = last;
    }
    if (noiseCache) noiseCache.set(ac, b);
    return b;
  }
  function noiseSrc(ac, rate) {
    var s = ac.createBufferSource();
    s.buffer = noiseBuf(ac);
    s.loop = true;
    if (rate) s.playbackRate.value = rate;
    return s;
  }
  function startNoise(s, t0, dur) {
    try { s.start(t0, rnd() * 2.0); } catch (e) { try { s.start(t0); } catch (e2) {} }
    try { s.stop(t0 + dur + 0.02); } catch (e) {}
  }

  function gainNode(ac, v) { var g = ac.createGain(); g.gain.value = v === undefined ? 1 : v; return g; }

  /* attack then exponential decay, the shape of essentially every impulsive
     sound in the game */
  function burst(par, t0, atk, dec, peak) {
    peak = Math.max(peak, 0.00002);
    par.setValueAtTime(0.00001, t0);
    par.linearRampToValueAtTime(peak, t0 + Math.max(0.0004, atk));
    par.exponentialRampToValueAtTime(0.00001, t0 + Math.max(0.0004, atk) + dec);
  }
  function ramp(par, t0, from, to, dur) {
    par.setValueAtTime(Math.max(1, from), t0);
    par.exponentialRampToValueAtTime(Math.max(1, to), t0 + Math.max(0.002, dur));
  }
  function bp(ac, f, q) {
    var b = ac.createBiquadFilter(); b.type = "bandpass";
    b.frequency.value = clamp(f, 20, 20000); b.Q.value = q;
    return b;
  }
  function lpf(ac, f, q) {
    var b = ac.createBiquadFilter(); b.type = "lowpass";
    b.frequency.value = clamp(f, 30, 21000); if (q) b.Q.value = q;
    return b;
  }
  function hpf(ac, f) {
    var b = ac.createBiquadFilter(); b.type = "highpass";
    b.frequency.value = clamp(f, 20, 20000);
    return b;
  }
  function osc(ac, type, f) {
    var o = ac.createOscillator(); o.type = type;
    o.frequency.value = clamp(f, 8, 20000);
    return o;
  }

  /* ------------------------------------------------------- the bus stack */
  function softCurve() {
    var n = 2048, c = new Float32Array(n), k = 1.7, d = Math.tanh(k);
    for (var i = 0; i < n; i++) {
      var x = (i * 2) / (n - 1) - 1;
      c[i] = Math.tanh(x * k) / d;
    }
    return c;
  }

  /* Builds the whole output chain into any context, live or offline, so an
     offline render measures exactly what the game plays. */
  function buildBus(ac) {
    var m   = gainNode(ac, mixLevel);
    var lim = ac.createDynamicsCompressor();
    /* A brick wall, not a mix compressor: nothing that happens on screen may
       ever push the sum into clipping, however many guns are firing. */
    lim.threshold.value = -9;
    lim.knee.value = 0;
    lim.ratio.value = 20;
    lim.attack.value = 0.002;
    lim.release.value = 0.20;
    var clip = ac.createWaveShaper();
    clip.curve = softCurve();
    clip.oversample = "2x";
    var out = gainNode(ac, 0.92);
    m.connect(lim); lim.connect(clip); clip.connect(out); out.connect(ac.destination);

    var sfx = gainNode(ac, 1.0);   sfx.connect(m);
    var ui  = gainNode(ac, 0.90);  ui.connect(m);
    var bed = gainNode(ac, 1.0);   bed.connect(m);
    /* Engines get their own compressor as well as a hard trim, so seven idling
       hulls sit under the battle instead of forming a wall of drone. */
    var ec = ac.createDynamicsCompressor();
    ec.threshold.value = -26; ec.knee.value = 8; ec.ratio.value = 8;
    ec.attack.value = 0.05; ec.release.value = 0.4;
    var eng = gainNode(ac, ENGINE_MIX);
    eng.connect(ec); ec.connect(m);
    return { master: m, sfx: sfx, ui: ui, bed: bed, eng: eng, limiter: lim, out: out };
  }

  function ensure() {
    if (ctx) return enabled;
    if (!enabled) return false;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { enabled = false; return false; }
      ctx = new AC();
      var b = buildBus(ctx);
      master = b.master; sfxBus = b.sfx; uiBus = b.ui; bedBus = b.bed; engBus = b.eng;
    } catch (e) { enabled = false; ctx = null; return false; }
    startDriver();
    return true;
  }

  /* ------------------------------------------------- weapon fingerprints */
  /* Everything a report needs, derived once per weapon id and cached. */
  var specCache = {};

  function boreOf(w) {
    var nm = String(w.name || w.id || "");
    var mm = /(\d+(?:\.\d+)?)\s*mm/i.exec(nm);
    if (mm) return clamp(parseFloat(mm[1]), 4, 460);
    var lb = /(\d+(?:\.\d+)?)\s*lb/i.exec(nm);
    if (lb) return clamp(Math.pow(parseFloat(lb[1]), 0.42) * 22, 60, 420);
    var dmg = Math.max(1, w.dmg || 10);
    /* No calibre in the name, so size it from what the round actually does */
    if (w.proj === "bullet") return clamp(4.6 * Math.pow(dmg, 0.42), 5, 22);
    if (w.proj === "missile" || w.proj === "torpedo") return clamp(58 + dmg * 0.32, 70, 420);
    if (w.proj === "bomb") return clamp(120 + dmg * 0.5, 140, 420);
    if (w.proj === "shell" || w.proj === "arc") return clamp(9 * Math.pow(dmg, 0.52), 20, 260);
    return clamp(18 + dmg * 0.22, 10, 220);
  }

  function kindOf(w) {
    var p = w.proj, nm = String(w.name || "");
    if (p === "missile") return /rocket|MRL|barrage/i.test(nm) ? "rocket" : "missile";
    if (p === "torpedo") return "torpedo";
    if (p === "depth")   return "depth";
    if (p === "bomb")    return "bomb";
    if (p === "arc")     return /rocket|MRL|barrage/i.test(nm) ? "rocket" : "arc";
    if (p === "bullet")  return "mg";
    if (p === "none")    return "ciws";
    return "gun";                                  // shell, tracer, anything else
  }

  function specOf(w) {
    if (typeof w === "string") {
      if (specCache[w]) return specCache[w];
      var row = (typeof WEAPONS !== "undefined" && WEAPONS[w]) ? WEAPONS[w] : null;
      if (!row) row = { name: w, dmg: 40, proj: "shell", warhead: "he" };
      var s = buildSpec(row, w);
      specCache[w] = s;
      return s;
    }
    if (!w) return specOf("gun_light");
    var id = w.id || w.name || "?";
    if (specCache[id]) return specCache[id];
    specCache[id] = buildSpec(w, id);
    return specCache[id];
  }

  function buildSpec(w, id) {
    var bore = boreOf(w);
    var kind = kindOf(w);
    var dmg  = Math.max(1, w.dmg || 10);
    var wh   = w.warhead || "he";

    /* Body frequency. Bore is the whole story: the muzzle blast of a small
       bore is a high snap, a large bore is a low bark. */
    var f0 = clamp(760 * Math.pow(20 / bore, 0.62), 90, 1900);
    /* Tail. How long the blast keeps rolling. */
    var tail = 0.035 + 1.15 * Math.pow(bore / 200, 0.9);
    /* Intrinsic loudness, from bore first and payload second. */
    var level = clamp(0.10 + 0.55 * Math.pow(bore / 150, 0.55) +
                      0.22 * Math.pow(Math.min(dmg, 400) / 300, 0.7), 0.08, 1.0);
    /* Supersonic crack: everything a small bore has, almost nothing a
       howitzer has. */
    var crack = clamp(1.10 - bore / 140, 0.18, 1.0);
    /* Sub-bass concussion: the reverse. */
    var thump = clamp(Math.pow(bore / 160, 0.9), 0.02, 1.15);
    /* Mount and breech ring. Autocannon and AA mounts clatter; a tank gun in
       a big cast turret does not. */
    var ring = (wh === "flak") ? 0.55
             : (kind === "gun" && bore <= 45) ? 0.45
             : (kind === "mg") ? 0.18 : 0.06;
    /* How far the report carries before the falloff knee. */
    var refM = 90 + 3.2 * bore;

    if (kind === "missile" || kind === "rocket") {
      /* A launch has no shock wave, only motor. Burn time scales with the
         size of the round. */
      tail  = 0.50 + Math.min(0.95, dmg / 420);
      crack = 0.12;
      thump = clamp(0.20 + dmg / 700, 0.2, 0.9);
      level = level * (kind === "rocket" ? 0.70 : 0.62);
      ring  = 0.05;
      refM  = 260 + dmg * 0.9;
      f0    = clamp(f0, 150, 520);
    } else if (kind === "arc") {
      /* Mortars and howitzers fire out of a tube: hollow, no crack. */
      crack *= 0.30;
      tail  *= 1.25;
      ring   = 0.30;
    } else if (kind === "torpedo" || kind === "depth") {
      tail  = 0.55;
      crack = 0.10;
      thump = 0.55;
      level *= 0.55;
      refM  = 300;
    } else if (kind === "bomb") {
      /* A release is nearly silent from outside the aircraft. */
      tail = 0.30; crack = 0.05; thump = 0.10; level *= 0.22; refM = 200;
    } else if (kind === "ciws") {
      tail = 0.10; crack = 0.9; thump = 0.05; level = 0.30; ring = 0.7; refM = 190;
      f0 = 1200;
    }

    return {
      id: id, bore: bore, kind: kind, warhead: wh, dmg: dmg,
      f0: f0, tail: tail, level: level, crack: crack, thump: thump,
      ring: ring, refM: refM,
      dur: Math.max(0.12, tail * 1.9 + 0.10),
    };
  }

  /* --------------------------------------------------------- spatialiser */
  /* The camera is read once per frame, not once per shot: a heavy exchange
     asks for this hundreds of times and the try/catch is not free. */
  var camX = 0, camY = 0, camZ = 1, camT = -1;
  function readCam() {
    var now = (typeof performance !== "undefined") ? performance.now() : Date.now();
    if (now - camT < 12) return;
    camT = now;
    try {
      var c = Render.cam;
      if (c) { camX = c.x; camY = c.y; camZ = c.z || 1; }
    } catch (e) { /* no renderer yet: leave the listener where it was */ }
  }

  /* Returns null when the source is too far to be worth any nodes at all. */
  function place(x, y, refM, level) {
    readCam();
    var z = Math.max(0.35, camZ);
    var dx = (x - camX) / z, dy = (y - camY) / z;
    var px = Math.sqrt(dx * dx + dy * dy);
    var m  = px * M_PER_PX;
    var g  = 1 / (1 + Math.pow(m / refM, 1.6));
    if (g * (level || 1) < 0.006) return null;
    return {
      m: m,
      gain: g,
      /* air absorption: the high end goes first, so a distant gun is dull as
         well as quiet */
      cut: clamp(19000 * Math.pow(0.5, m / 260), 200, 19000),
      /* 0 near, 1 far - used to trade crack for roll */
      far: clamp(m / 700, 0, 1),
      pan: clamp(dx / 520, -1, 1) * 0.85,
      delay: Math.min(MAX_DELAY, m / C_SOUND),
    };
  }
  /* used by the offline renderer and by non-diegetic cues */
  function here(gain) {
    return { m: 0, gain: gain === undefined ? 1 : gain, cut: 19000, far: 0, pan: 0, delay: 0 };
  }

  /* -------------------------------------------------------- voice budget */
  var voices = [];
  function reap(now) {
    for (var i = voices.length - 1; i >= 0; i--) {
      if (voices[i].end <= now) {
        try { voices[i].g.disconnect(); } catch (e) {}
        voices.splice(i, 1);
      }
    }
  }
  /* Nearest-first stealing: when the budget is full the most distant live
     voice loses its slot, and if everything already playing is nearer than the
     new sound then the new sound is simply not worth a slot. */
  function voice(sp, dur, bus) {
    if (!ctx) return null;
    var now = ctx.currentTime;
    reap(now);
    if (voices.length >= MAX_VOICES) {
      var worst = -1, wd = sp.m;
      for (var j = 0; j < voices.length; j++) if (voices[j].m > wd) { wd = voices[j].m; worst = j; }
      if (worst < 0) return null;
      var v = voices[worst];
      try {
        v.g.gain.cancelScheduledValues(now);
        v.g.gain.setValueAtTime(v.g.gain.value, now);
        v.g.gain.linearRampToValueAtTime(0.00001, now + 0.02);
      } catch (e) {}
      v.end = now;
      voices.splice(worst, 1);
      try { setTimeout(function () { try { v.g.disconnect(); } catch (e) {} }, 120); } catch (e) {}
    }
    var g = gainNode(ctx, 1);
    var node = spatialChain(ctx, g, sp, bus || sfxBus);
    voices.push({ g: node.head, m: sp.m, end: now + dur + 0.25 });
    return node.head;
  }

  /* gain -> air-absorption lowpass -> pan -> arrival delay -> bus */
  function spatialChain(ac, g, sp, bus) {
    var head = g;
    var tailN = g;
    if (sp.cut < 18000) {
      /* Two cascaded poles. One biquad leaves a broad high shelf that keeps a
         distant gun sounding close; 24 dB/oct is both nearer the truth and
         what actually makes the far shot read as far. */
      var f1 = lpf(ac, sp.cut, 0.55), f2 = lpf(ac, sp.cut * 1.3, 0.55);
      tailN.connect(f1); f1.connect(f2); tailN = f2;
    }
    if (sp.pan && ac.createStereoPanner) {
      var p = ac.createStereoPanner();
      p.pan.value = sp.pan;
      tailN.connect(p); tailN = p;
    }
    if (sp.delay > 0.004 && ac.createDelay) {
      var d = ac.createDelay(MAX_DELAY + 0.05);
      d.delayTime.value = sp.delay;
      tailN.connect(d); tailN = d;
    }
    tailN.connect(bus);
    return { head: head, tail: tailN };
  }

  /* ============================ WEAPON REPORTS ============================
     Five layers, each scaled by the weapon's own fingerprint. A 7.62 mm is
     almost entirely layer 1; a 155 mm is almost entirely layers 3 and 4.   */

  function emitGun(ac, out, t0, S, sp) {
    var lvl = S.level * sp.gain;
    var cut = sp.cut, far = sp.far;
    var f0 = S.f0 * vary(0.04);
    var tail = S.tail * (1 + far * 0.55);           // distance stretches the roll

    /* 1. muzzle crack - the shock wave. Dies fast with distance. */
    var ck = S.crack * (1 - 0.72 * far);
    if (ck > 0.02 && cut > 700) {
      var cd = 0.004 + 0.030 * (S.bore / 200);
      var n1 = noiseSrc(ac, 1);
      var h1 = hpf(ac, clamp(f0 * 2.2, 380, 7000));
      var pk = ac.createBiquadFilter();
      pk.type = "peaking";
      pk.frequency.value = clamp(f0 * 3.2, 500, 11000);
      pk.Q.value = 0.9; pk.gain.value = 9;
      var g1 = gainNode(ac, 0);
      burst(g1.gain, t0, 0.0007, cd, lvl * ck * 0.95);
      n1.connect(h1); h1.connect(pk); pk.connect(g1); g1.connect(out);
      startNoise(n1, t0, cd);
    }

    /* 2. blast body - filtered noise sweeping down through the bore note */
    var bd = tail * 0.60;
    var n2 = noiseSrc(ac, 1);
    var l2 = lpf(ac, 1, 0.8);
    ramp(l2.frequency, t0,
         Math.min(cut, f0 * 3.1 * (1 - 0.55 * far)),
         Math.max(55, Math.min(cut, f0 * 0.55 * (1 - 0.35 * far))), bd);
    var h2 = hpf(ac, Math.max(26, f0 * 0.20));
    var g2 = gainNode(ac, 0);
    burst(g2.gain, t0 + 0.0015, 0.0025, bd, lvl * (0.55 + 0.35 * S.thump));
    n2.connect(h2); h2.connect(l2); l2.connect(g2); g2.connect(out);
    startNoise(n2, t0, bd);

    /* 3. concussion - the sub you feel rather than hear. Bore drives it. */
    if (S.thump > 0.05) {
      var tf = clamp(f0 * 0.30, 30, 200);
      var o3 = osc(ac, "sine", tf);
      o3.frequency.setValueAtTime(tf * 1.35, t0);
      o3.frequency.exponentialRampToValueAtTime(Math.max(24, tf * 0.52), t0 + tail * 0.8);
      var o3b = osc(ac, "triangle", tf * 2.02);
      o3b.frequency.setValueAtTime(tf * 2.7, t0);
      o3b.frequency.exponentialRampToValueAtTime(Math.max(30, tf * 1.0), t0 + tail * 0.6);
      var g3 = gainNode(ac, 0), g3b = gainNode(ac, 0);
      burst(g3.gain,  t0, 0.004, tail * 0.95, lvl * S.thump * 0.95);
      burst(g3b.gain, t0, 0.003, tail * 0.40, lvl * S.thump * 0.22);
      o3.connect(g3); g3.connect(out); o3.start(t0); o3.stop(t0 + tail + 0.06);
      o3b.connect(g3b); g3b.connect(out); o3b.start(t0); o3b.stop(t0 + tail * 0.7 + 0.05);
    }

    /* 4. rolling tail - the blast coming back off the ground. Only big bores
          and distant shots have one worth the nodes. */
    var rollLvl = S.thump * 0.40 + far * 0.45;
    if (rollLvl > 0.10) {
      var rd = tail * 1.5;
      var t4 = t0 + 0.035 + far * 0.06;
      var n4 = noiseSrc(ac, 0.7);
      var l4 = lpf(ac, 1, 0.5);
      /* The roll is stretched by distance, so its downward sweep has to start
         lower as well - otherwise the extra time it spends in the mid band
         measures as a DISTANT shot being brighter than a near one. */
      ramp(l4.frequency, t4, Math.min(cut, 700 * (1 - 0.55 * far)), 70, rd);
      var g4 = gainNode(ac, 0);
      burst(g4.gain, t4, 0.05, rd, lvl * rollLvl * 0.45);
      n4.connect(l4); l4.connect(g4); g4.connect(out);
      startNoise(n4, t4, rd);
    }

    /* 5. mount / breech ring - what makes a 30 mm chain gun mechanical */
    if (S.ring > 0.10 && cut > 900 && far < 0.75) {
      var rf = clamp(f0 * 1.9, 300, 4200) * vary(0.06);
      for (var k = 0; k < 2; k++) {
        var n5 = noiseSrc(ac, 1);
        var b5 = bp(ac, rf * (k ? 1.63 : 1), 11 + k * 5);
        var g5 = gainNode(ac, 0);
        burst(g5.gain, t0 + 0.003 * k, 0.001, 0.05 + 0.09 * S.ring,
              lvl * S.ring * (k ? 0.22 : 0.34) * (1 - far));
        n5.connect(b5); b5.connect(g5); g5.connect(out);
        startNoise(n5, t0, 0.16);
      }
    }
  }

  function emitMissile(ac, out, t0, S, sp) {
    var lvl = S.level * sp.gain, cut = sp.cut;
    var burn = S.tail * vary(0.06);

    /* 1. igniter - a short pressurised bang out of the tube */
    var n1 = noiseSrc(ac, 1);
    var b1 = bp(ac, clamp(Math.min(cut, 420), 120, 900), 1.1);
    var g1 = gainNode(ac, 0);
    burst(g1.gain, t0, 0.002, 0.075, lvl * 0.42);
    n1.connect(b1); b1.connect(g1); g1.connect(out);
    startNoise(n1, t0, 0.1);

    /* 2. motor - a wide band that opens upward as the round accelerates away,
          which is the single feature that makes a launch unmistakable */
    var n2 = noiseSrc(ac, 1);
    var b2 = bp(ac, 1, 0.85);
    var b2c = lpf(ac, Math.min(cut, 3200), 0.7);
    b2.frequency.setValueAtTime(240, t0);
    b2.frequency.exponentialRampToValueAtTime(Math.max(300, Math.min(cut, 2600)), t0 + burn * 0.42);
    b2.frequency.exponentialRampToValueAtTime(Math.max(180, Math.min(cut, 850)), t0 + burn);
    var g2 = gainNode(ac, 0);
    g2.gain.setValueAtTime(0.00001, t0);
    g2.gain.linearRampToValueAtTime(lvl * 0.68, t0 + 0.055);
    g2.gain.setValueAtTime(lvl * 0.68, t0 + burn * 0.30);
    g2.gain.exponentialRampToValueAtTime(0.00001, t0 + burn);
    n2.connect(b2); b2.connect(b2c); b2c.connect(g2); g2.connect(out);
    startNoise(n2, t0, burn);

    /* 3. motor rumble - the low half of the exhaust */
    var rf = clamp(S.f0 * 0.22, 42, 130);
    var o3 = osc(ac, "sawtooth", rf);
    o3.frequency.setValueAtTime(rf * 0.8, t0);
    o3.frequency.linearRampToValueAtTime(rf * 1.5, t0 + burn * 0.6);
    var l3 = lpf(ac, Math.min(cut, 300), 3.5);
    var g3 = gainNode(ac, 0);
    burst(g3.gain, t0, 0.05, burn * 0.9, lvl * S.thump * 1.05);
    o3.connect(l3); l3.connect(g3); g3.connect(out);
    o3.start(t0); o3.stop(t0 + burn + 0.05);

    /* 4. departure hiss - the round going away from you. Band-limited on
          both sides: unbounded it becomes the loudest thing in the spectrum
          and a missile launch ends up brighter than a rifle. */
    var n4 = noiseSrc(ac, 1);
    var h4 = hpf(ac, Math.min(cut * 0.7, 1800));
    var h4b = lpf(ac, Math.min(cut, 4200), 0.6);
    var g4 = gainNode(ac, 0);
    burst(g4.gain, t0 + 0.03, 0.12, burn * 1.05, lvl * 0.08 * (1 - sp.far * 0.7));
    n4.connect(h4); h4.connect(h4b); h4b.connect(g4); g4.connect(out);
    startNoise(n4, t0, burn + 0.2);
  }

  function emitRocket(ac, out, t0, S, sp) {
    /* An unguided rocket leaves harder and rougher than a guided round. */
    emitMissile(ac, out, t0, S, sp);
    var lvl = S.level * sp.gain;
    var n = noiseSrc(ac, 1.4);
    var b = bp(ac, Math.min(sp.cut, 1500), 0.8);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.004, 0.20, lvl * 0.55);
    n.connect(b); b.connect(g); g.connect(out);
    startNoise(n, t0, 0.24);
  }

  function emitArc(ac, out, t0, S, sp) {
    /* Tube artillery: the hollow tube note first, then the blast. */
    var lvl = S.level * sp.gain;
    var tf = clamp(S.f0 * 0.55, 60, 420);
    var o = osc(ac, "sine", tf);
    o.frequency.setValueAtTime(tf * 1.9, t0);
    o.frequency.exponentialRampToValueAtTime(tf * 0.7, t0 + 0.10);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.002, 0.13, lvl * 0.45);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + 0.2);
    emitGun(ac, out, t0, S, sp);
  }

  function emitTorpedo(ac, out, t0, S, sp) {
    var lvl = S.level * sp.gain;
    /* compressed-air launch: a muffled slam, then water */
    var n1 = noiseSrc(ac, 1);
    var l1 = lpf(ac, Math.min(sp.cut, 500), 1.2);
    var g1 = gainNode(ac, 0);
    burst(g1.gain, t0, 0.004, 0.16, lvl * 0.55);
    n1.connect(l1); l1.connect(g1); g1.connect(out);
    startNoise(n1, t0, 0.2);
    var o = osc(ac, "sine", 120);
    o.frequency.setValueAtTime(150, t0);
    o.frequency.exponentialRampToValueAtTime(48, t0 + 0.24);
    var go = gainNode(ac, 0);
    burst(go.gain, t0, 0.005, 0.26, lvl * 0.50);
    o.connect(go); go.connect(out); o.start(t0); o.stop(t0 + 0.32);
    /* bubbles: band-limited noise chopped by a fast LFO */
    var n2 = noiseSrc(ac, 1);
    var b2 = bp(ac, Math.min(sp.cut, 820), 2.2);
    var b2b = lpf(ac, Math.min(sp.cut, 1400), 0.7);
    var g2 = gainNode(ac, 0);
    burst(g2.gain, t0 + 0.05, 0.06, 0.55, lvl * 0.25);
    var lfo = osc(ac, "sine", 17), lg = gainNode(ac, 0.75);
    lfo.connect(lg); lg.connect(g2.gain);
    lfo.start(t0); lfo.stop(t0 + 0.7);
    n2.connect(b2); b2.connect(b2b); b2b.connect(g2); g2.connect(out);
    startNoise(n2, t0, 0.65);
  }

  function emitBomb(ac, out, t0, S, sp) {
    var lvl = S.level * sp.gain;
    var n = noiseSrc(ac, 0.9);
    var b = bp(ac, Math.min(sp.cut, 700), 0.7);
    b.frequency.setValueAtTime(Math.min(sp.cut, 900), t0);
    b.frequency.exponentialRampToValueAtTime(Math.max(120, Math.min(sp.cut, 220)), t0 + 0.32);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.05, 0.30, lvl * 0.9);
    n.connect(b); b.connect(g); g.connect(out);
    startNoise(n, t0, 0.36);
  }

  function emitCiws(ac, out, t0, S, sp) {
    /* Not discrete rounds: a saw at the cyclic rate. */
    var lvl = S.level * sp.gain;
    var o = osc(ac, "sawtooth", 62);
    var b = bp(ac, Math.min(sp.cut, 1700), 1.6);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.01, 0.34, lvl * 0.8);
    o.connect(b); b.connect(g); g.connect(out);
    o.start(t0); o.stop(t0 + 0.4);
    var n = noiseSrc(ac, 1);
    var h = hpf(ac, Math.min(sp.cut * 0.8, 2600));
    var gn = gainNode(ac, 0);
    burst(gn.gain, t0, 0.008, 0.30, lvl * 0.35);
    n.connect(h); h.connect(gn); gn.connect(out);
    startNoise(n, t0, 0.34);
  }

  function emitReport(ac, out, t0, S, sp) {
    switch (S.kind) {
      case "missile":  emitMissile(ac, out, t0, S, sp); break;
      case "rocket":   emitRocket(ac, out, t0, S, sp);  break;
      case "arc":      emitArc(ac, out, t0, S, sp);     break;
      case "torpedo":
      case "depth":    emitTorpedo(ac, out, t0, S, sp); break;
      case "bomb":     emitBomb(ac, out, t0, S, sp);    break;
      case "ciws":     emitCiws(ac, out, t0, S, sp);    break;
      default:         emitGun(ac, out, t0, S, sp);     break;
    }
  }

  /* =============================== IMPACTS ===============================
     What a round hits is as distinctive as what fired it.                 */

  /* excite a set of resonators with a short noise transient */
  function ring(ac, out, t0, freqs, q, dec, lvl, cut) {
    for (var i = 0; i < freqs.length; i++) {
      if (freqs[i] > cut * 1.4) continue;
      var n = noiseSrc(ac, 1);
      var b = bp(ac, freqs[i] * vary(0.03), q);
      var g = gainNode(ac, 0);
      burst(g.gain, t0, 0.0008, dec * (1 - i * 0.18), lvl / (1 + i * 0.55));
      n.connect(b); b.connect(g); g.connect(out);
      startNoise(n, t0, 0.006);
    }
  }
  /* a handful of scattered grains - debris, spall, gravel */
  function grains(ac, out, t0, n, spread, fLo, fHi, dec, lvl, cut) {
    for (var i = 0; i < n; i++) {
      var t = t0 + rnd() * spread;
      var f = fLo + rnd() * (fHi - fLo);
      if (f > cut) continue;
      var s = noiseSrc(ac, 1);
      var b = bp(ac, f, 6);
      var g = gainNode(ac, 0);
      burst(g.gain, t, 0.001, dec * (0.5 + rnd()), lvl * (0.4 + rnd() * 0.6));
      s.connect(b); b.connect(g); g.connect(out);
      startNoise(s, t, dec * 2);
    }
  }
  function thud(ac, out, t0, f, drop, dec, lvl) {
    var o = osc(ac, "sine", f);
    o.frequency.setValueAtTime(f, t0);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f * drop), t0 + dec);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.003, dec, lvl);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + dec + 0.05);
  }
  function hiss(ac, out, t0, fFrom, fTo, dec, lvl, cut, mode) {
    var n = noiseSrc(ac, 1);
    var f = ac.createBiquadFilter();
    f.type = mode || "bandpass";
    if (mode !== "highpass" && mode !== "lowpass") f.Q.value = 0.6;
    ramp(f.frequency, t0, Math.min(fFrom, cut), Math.min(fTo, cut), dec);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.004, dec, lvl);
    n.connect(f);
    if (mode === "lowpass") {
      /* One pole leaves a broad shelf on top and dull materials - concrete,
         earth, a body - stop reading as dull. Two poles fixes it. */
      var f2 = ac.createBiquadFilter();
      f2.type = "lowpass"; f2.Q.value = 0.6;
      ramp(f2.frequency, t0, Math.min(fFrom * 1.25, cut), Math.min(fTo * 1.25, cut), dec);
      f.connect(f2); f2.connect(g);
    } else f.connect(g);
    g.connect(out);
    startNoise(n, t0, dec);
  }

  /* e is a 0..1 energy figure taken from the round's damage */
  function emitImpact(ac, out, t0, mat, e, sp) {
    var lvl = sp.gain * clamp(0.18 + e * 0.85, 0.10, 1.05);
    var cut = sp.cut;
    switch (mat) {
      case "armour":
        /* a hard steel box, small and thick: high resonances, short decay */
        ring(ac, out, t0, [430, 1010, 2380], 14, 0.16 + e * 0.16, lvl * 1.05, cut);
        hiss(ac, out, t0, 4200, 1600, 0.05, lvl * 0.30, cut, "bandpass");
        thud(ac, out, t0, 96, 0.55, 0.10 + e * 0.08, lvl * 0.75);
        grains(ac, out, t0 + 0.02, 4, 0.10, 1600, 4200, 0.03, lvl * 0.20, cut);
        break;
      case "hull":
        /* a large steel box: the same event an octave down and far longer */
        ring(ac, out, t0, [138, 372, 905, 1640], 18, 0.55 + e * 0.5, lvl * 0.9, cut);
        thud(ac, out, t0, 62, 0.55, 0.34, lvl * 0.9);
        hiss(ac, out, t0, 2600, 600, 0.14, lvl * 0.30, cut, "bandpass");
        break;
      case "structure":
        /* concrete: a crunch, dust and falling debris */
        hiss(ac, out, t0, 1500, 280, 0.24 + e * 0.2, lvl * 1.00, cut, "lowpass");
        thud(ac, out, t0, 74, 0.5, 0.20 + e * 0.16, lvl * 0.95);
        grains(ac, out, t0 + 0.04, 9, 0.42, 700, 3200, 0.035, lvl * 0.22, cut);
        ring(ac, out, t0, [220, 640], 5, 0.10, lvl * 0.25, cut);
        break;
      case "water":
        /* the cavity opening, then the column falling back */
        hiss(ac, out, t0, 2000, 320, 0.12, lvl * 0.8, cut, "bandpass");
        thud(ac, out, t0, 230, 0.36, 0.13, lvl * 0.55);
        hiss(ac, out, t0 + 0.05, 2200, 3600, 0.45 + e * 0.4, lvl * 0.30, cut, "bandpass");
        grains(ac, out, t0 + 0.12, 7, 0.45, 1000, 3200, 0.05, lvl * 0.16, cut);
        break;
      case "rock":
        hiss(ac, out, t0, 2600, 500, 0.14, lvl * 0.7, cut, "bandpass");
        thud(ac, out, t0, 88, 0.5, 0.13, lvl * 0.6);
        grains(ac, out, t0 + 0.01, 10, 0.28, 1300, 5000, 0.025, lvl * 0.32, cut);
        break;
      case "flesh":
        hiss(ac, out, t0, 460, 160, 0.10, lvl * 0.70, cut, "lowpass");
        thud(ac, out, t0, 130, 0.4, 0.09, lvl * 0.55);
        grains(ac, out, t0 + 0.01, 3, 0.08, 500, 1200, 0.02, lvl * 0.10, cut);
        break;
      case "air":
        /* a proximity burst: crack, then hot gas */
        hiss(ac, out, t0, 5000, 1300, 0.07, lvl * 0.7, cut, "bandpass");
        hiss(ac, out, t0, 1400, 300, 0.26, lvl * 0.5, cut, "bandpass");
        thud(ac, out, t0, 110, 0.45, 0.16, lvl * 0.4);
        break;
      default: /* earth */
        hiss(ac, out, t0, 620, 150, 0.17 + e * 0.14, lvl * 0.8, cut, "lowpass");
        thud(ac, out, t0, 66, 0.5, 0.24 + e * 0.2, lvl * 0.9);
        grains(ac, out, t0 + 0.03, 6, 0.26, 700, 2400, 0.03, lvl * 0.22, cut);
        break;
    }
  }

  /* a general explosion, scale 0..1, used by the legacy explode cues too */
  function emitBoom(ac, out, t0, scale, water, sp) {
    var lvl = sp.gain * clamp(0.30 + scale * 0.8, 0.1, 1.1);
    var cut = sp.cut;
    var dec = 0.30 + scale * 0.95;
    /* leading edge */
    hiss(ac, out, t0, Math.min(cut, 5200), Math.min(cut, 900), 0.035 + scale * 0.03,
         lvl * 0.55 * (1 - sp.far * 0.6), cut, "highpass");
    /* the body, sweeping down */
    var n = noiseSrc(ac, 0.85);
    var l = lpf(ac, 1, 0.7);
    ramp(l.frequency, t0, Math.min(cut, 1400), 62, dec);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.006, dec, lvl);
    n.connect(l); l.connect(g); g.connect(out);
    startNoise(n, t0, dec);
    /* the sub */
    var f0 = water ? 74 : 58 + scale * 34;
    thud(ac, out, t0, f0 * 1.7, 0.34, dec * 0.9, lvl * (0.85 + scale * 0.2));
    /* the roll */
    var n2 = noiseSrc(ac, 0.6);
    var l2 = lpf(ac, 1, 0.5);
    ramp(l2.frequency, t0 + 0.06, Math.min(cut, 520), 70, dec * 1.6);
    var g2 = gainNode(ac, 0);
    burst(g2.gain, t0 + 0.06, 0.08, dec * 1.6, lvl * (0.30 + sp.far * 0.35));
    n2.connect(l2); l2.connect(g2); g2.connect(out);
    startNoise(n2, t0 + 0.06, dec * 1.6);
    if (water) {
      hiss(ac, out, t0 + 0.07, Math.min(cut, 3000), Math.min(cut, 5400), 0.6 + scale * 0.6,
           lvl * 0.35, cut, "highpass");
      grains(ac, out, t0 + 0.2, 10, 0.7, 1000, 4200, 0.06, lvl * 0.18, cut);
    } else {
      grains(ac, out, t0 + 0.08, 12, 0.7, 500, 4000, 0.05, lvl * 0.24, cut);
    }
  }

  /* ============================= PUBLIC SHOTS ============================= */

  var lastReport = {};    // per-weapon rate limit so a burst rattles, not smears

  function weapon(w, x, y) {
    if (!enabled || !ensure()) return;
    resume();
    var S = specOf(w);
    var sp = (x === undefined) ? here(0.9) : place(x, y, S.refM, S.level);
    if (!sp) return;
    var now = ctx.currentTime;
    var gap = S.kind === "mg" ? 0.022 : 0.030;
    var prev = lastReport[S.id];
    if (prev !== undefined && now - prev < gap) return;
    lastReport[S.id] = now;
    var head = voice(sp, S.dur * (1 + sp.far * 0.7) + sp.delay, sfxBus);
    if (!head) return;
    try { emitReport(ctx, head, now + 0.002, S, sp); } catch (e) { fail(e); }
  }

  function impact(mat, x, y, energy) {
    if (!enabled || !ensure()) return;
    var e = clamp(energy === undefined ? 0.4 : energy, 0, 1);
    var refM = 150 + 420 * e;
    var sp = (x === undefined) ? here(0.8) : place(x, y, refM, 0.4 + e * 0.6);
    if (!sp) return;
    var head = voice(sp, 1.0 + sp.delay, sfxBus);
    if (!head) return;
    try { emitImpact(ctx, head, ctx.currentTime + 0.002, mat, e, sp); } catch (er) { fail(er); }
  }

  function boom(x, y, scale, water) {
    if (!enabled || !ensure()) return;
    var s = clamp(scale === undefined ? 0.5 : scale, 0, 1);
    var refM = 260 + 900 * s;
    var sp = (x === undefined) ? here(0.9) : place(x, y, refM, 0.4 + s * 0.6);
    if (!sp) return;
    var head = voice(sp, 2.4 + sp.delay, sfxBus);
    if (!head) return;
    try { emitBoom(ctx, head, ctx.currentTime + 0.002, s, !!water, sp); } catch (e) { fail(e); }
  }

  var failed = 0;
  function fail(e) {
    if (failed++ < 3 && typeof console !== "undefined") console.warn("Sfx:", e && e.message);
  }
  function resume() {
    try { if (ctx && ctx.state === "suspended") ctx.resume(); } catch (e) {}
  }

  /* =============================== ENGINES ===============================
     One low bed per nearby vehicle, pitch tracking real ground speed. Capped,
     nearest first, and mixed far enough down that a hundred hulls on screen
     stay a rumble instead of a chord.                                      */

  var engVoices = {};   // unit id -> voice
  var engN = 0;
  var lastPos = {};     // unit id -> {x, y, t} for a true speed estimate

  function engineBase(u) {
    var d = u.def || {};
    if (u.cat === "naval") return 19 + (d.speed || 2) * 2.2;
    if (u.cat === "infantry") return 0;
    if (u.layer === "air") return d.jet ? 96 : 34;
    /* tracked heavies idle lower than wheeled scouts */
    var mass = d.mass || 20;
    return clamp(58 - mass * 0.55, 26, 58);
  }

  function makeEngine(u) {
    var f = engineBase(u);
    if (!f) return null;
    var v = {
      id: u.id, f: f, jet: !!(u.def && u.def.jet),
      g: gainNode(ctx, 0.0001),
      lp: lpf(ctx, 120, 2.2),
      pan: ctx.createStereoPanner ? ctx.createStereoPanner() : null,
      o1: osc(ctx, "sawtooth", f),
      o2: osc(ctx, "sawtooth", f * 1.005),
      o3: osc(ctx, "square", f * 0.5),
      n: noiseSrc(ctx, 1),
      ng: gainNode(ctx, 0.03),
      nb: bp(ctx, 900, 0.8),
      spd: 0,
    };
    v.o1.connect(v.lp); v.o2.connect(v.lp);
    var g3 = gainNode(ctx, 0.25); v.o3.connect(g3); g3.connect(v.lp);
    v.n.connect(v.nb); v.nb.connect(v.ng); v.ng.connect(v.lp);
    v.lp.connect(v.g);
    if (v.pan) { v.g.connect(v.pan); v.pan.connect(engBus); }
    else v.g.connect(engBus);
    var t = ctx.currentTime;
    v.o1.start(t); v.o2.start(t); v.o3.start(t);
    try { v.n.start(t, rnd() * 2); } catch (e) { try { v.n.start(t); } catch (e2) {} }
    engN++;
    return v;
  }

  function dropEngine(v) {
    if (!v) return;
    var t = ctx.currentTime;
    try {
      v.g.gain.cancelScheduledValues(t);
      v.g.gain.setValueAtTime(Math.max(0.00001, v.g.gain.value), t);
      v.g.gain.exponentialRampToValueAtTime(0.00001, t + 0.25);
      v.o1.stop(t + 0.3); v.o2.stop(t + 0.3); v.o3.stop(t + 0.3); v.n.stop(t + 0.3);
    } catch (e) {}
    engN--;
  }

  function updateEngines(game, dt) {
    if (!ctx || !game || !game.players) return;
    var now = ctx.currentTime;
    var cand = [], i, j, p, u, sp;
    for (i = 0; i < game.players.length; i++) {
      p = game.players[i];
      if (!p || !p.units) continue;
      for (j = 0; j < p.units.length; j++) {
        u = p.units[j];
        if (!u || u.dead || u.carried) continue;
        if (u.cat !== "vehicle" && u.cat !== "naval") continue;
        sp = place(u.x, u.y, 190, 0.5);
        if (!sp) continue;
        cand.push({ u: u, sp: sp });
      }
    }
    cand.sort(function (a, b) { return a.sp.m - b.sp.m; });
    if (cand.length > MAX_ENGINES) cand.length = MAX_ENGINES;

    var want = {};
    for (i = 0; i < cand.length; i++) {
      u = cand[i].u; sp = cand[i].sp;
      want[u.id] = 1;
      var v = engVoices[u.id];
      if (!v) { v = makeEngine(u); if (!v) continue; engVoices[u.id] = v; }

      /* true ground speed from displacement, falling back to the order book
         when the unit has only just been picked up */
      var lp = lastPos[u.id], pxps;
      if (lp && now > lp.t) pxps = Math.sqrt((u.x - lp.x) * (u.x - lp.x) + (u.y - lp.y) * (u.y - lp.y)) / (now - lp.t);
      else pxps = u.moving ? (u.def.speed || 2) * 32 * (u.speedMul ? u.speedMul() : 1) : 0;
      lastPos[u.id] = { x: u.x, y: u.y, t: now };
      var top = Math.max(16, (u.def.speed || 2) * 32);
      var frac = clamp(pxps / top, 0, 1.25);
      v.spd += (frac - v.spd) * 0.25;

      /* engine note rises with load, and the exhaust opens up with it */
      var f = v.f * (0.62 + 0.78 * v.spd);
      v.o1.frequency.setTargetAtTime(f, now, 0.10);
      v.o2.frequency.setTargetAtTime(f * 1.006, now, 0.10);
      v.o3.frequency.setTargetAtTime(f * 0.5, now, 0.12);
      v.lp.frequency.setTargetAtTime(Math.min(sp.cut, 95 + 420 * v.spd), now, 0.15);
      v.nb.frequency.setTargetAtTime(Math.min(sp.cut, 500 + 1500 * v.spd), now, 0.2);
      v.ng.gain.setTargetAtTime(0.02 + 0.10 * v.spd, now, 0.2);
      v.g.gain.setTargetAtTime(sp.gain * (0.35 + 0.65 * v.spd) * 0.85, now, 0.18);
      if (v.pan) v.pan.pan.setTargetAtTime(sp.pan, now, 0.2);
    }
    for (var id in engVoices) {
      if (!want[id]) { dropEngine(engVoices[id]); delete engVoices[id]; delete lastPos[id]; }
    }
  }

  function stopEngines() {
    for (var id in engVoices) { dropEngine(engVoices[id]); delete engVoices[id]; }
    lastPos = {};
  }

  /* ============================== LEGACY CUES ==============================
     Same names, same call signatures, rebuilt on the new synthesis. The UI
     beeps are deliberately unchanged in character - people navigate by them. */

  function beep(ac, out, t0, type, f, f2, atk, dec, lvl) {
    var o = osc(ac, type, f);
    if (f2) o.frequency.linearRampToValueAtTime(f2, t0 + dec * 0.8);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, atk, dec, lvl);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + atk + dec + 0.04);
  }

  /* ==================== SELECTION ACKNOWLEDGEMENTS ====================
     Selecting a unit used to play "click" - the same 900 Hz square as a build
     button - so the audio told you that a click had registered and nothing
     about WHAT you now had under command. These six cues carry the class
     instead, separated by centre of gravity rather than by melody, because
     that is what survives a firefight: a hatch clank at 190 Hz, a squad radio
     squelch at 2.1 kHz and an avionics chirp sweeping to 1.56 kHz are told
     apart under a barrage where three tunes in the same octave would not be.

     Be honest about how far that goes. Measured by band energy the six do NOT
     land in six places - they land in three families. The heavy pair
     (armour, structure) sit almost entirely below 180 Hz and are close
     together; infantry, ship, support and the enemy-intel cue all put most
     of their energy in 420-900 Hz; only the aircraft chirp stands alone, at
     0.9-1.8 kHz. Within a family it is DURATION and TEXTURE that separate
     them - 47 ms of filtered noise against 164 ms of two clean tones - not
     pitch. That is a real difference and a player does learn it, but the
     claim to defend is "three obvious families, told apart inside a family by
     length", not "six unmistakable timbres".

     LENGTH, measured off render() at -50 dB: infantry 47 ms, armour 52 ms,
     air 62 ms, support 42 ms, structure 79 ms, ship 164 ms - against the old
     click's 28 ms. These fire on every click of the game, so anything with a
     musical tail would smear the moment a player drags four boxes in a row.

     VARIATION: three variants per class, round-robin, applied as a +-5.5%
     pitch shift on every partial at once. That is wide enough to stop a
     re-clicked squad machine-gunning one tone and far narrower than the gaps
     BETWEEN classes (the nearest pair, sea 640 Hz and infantry 620 Hz, differ
     in timbre and tail rather than pitch), so the class identity survives the
     variation. selPin lets an offline render nail a specific variant. */
  var SELVARY = [1.0, 0.945, 1.058];
  var selRR = {}, selPin = -1;
  function selV(k) {
    if (selPin >= 0) return selPin % SELVARY.length;
    var i = selRR[k] || 0;
    selRR[k] = (i + 1) % SELVARY.length;
    return i;
  }

  /* a bandpassed noise tick: the click of a mechanism, not a tone */
  function tick(ac, o, t, f, q, dec, lvl) {
    var n = noiseSrc(ac, 1), b = bp(ac, f, q), g = gainNode(ac, 0);
    burst(g.gain, t, 0.002, dec, lvl);
    n.connect(b); b.connect(g); g.connect(o);
    startNoise(n, t, dec + 0.02);
  }

  var cues = {
    /* fallbacks for call sites that do not know which weapon fired */
    shot:    function (ac, o, t) { emitGun(ac, o, t, specOf("lmg"), here(0.75)); },
    cannon:  function (ac, o, t) { emitGun(ac, o, t, specOf("gun_105"), here(0.7)); },
    missile: function (ac, o, t) { emitMissile(ac, o, t, specOf("atgm_veh"), here(0.7)); },

    explode:     function (ac, o, t) { emitBoom(ac, o, t, 0.45, false, here(0.85)); },
    explode_big: function (ac, o, t) {
      emitBoom(ac, o, t, 1.0, false, here(0.95));
      emitBoom(ac, o, t + 0.11, 0.55, false, here(0.6));
    },
    die_inf: function (ac, o, t) { emitImpact(ac, o, t, "flesh", 0.5, here(0.7)); },

    click:     function (ac, o, t) { beep(ac, o, t, "square", 900, 0, 0.002, 0.04, 0.16); },

    /* ---- selection, by class. Durations are the audible ones, measured. ---- */

    /* INFANTRY 47 ms - a handset keyed: squelch break, then a short blip.
       Highest centre of gravity of the ground classes, which is why a squad
       reads as light the instant you hear it. */
    sel_inf: function (ac, o, t) {
      var v = SELVARY[selV("inf")];
      tick(ac, o, t, 2100 * v, 7, 0.045, 0.13);
      beep(ac, o, t + 0.012, "square", 620 * v, 0, 0.002, 0.05, 0.11);
    },

    /* ARMOUR / VEHICLE 52 ms - a hatch clank. The square drops 190->118 Hz
       in 60 ms for the mass, and a 1.5 kHz Q9 noise band on top is the steel.
       Deliberately the lowest-pitched of the mobile classes. */
    sel_veh: function (ac, o, t) {
      var v = SELVARY[selV("veh")];
      beep(ac, o, t, "square", 190 * v, 118 * v, 0.002, 0.075, 0.20);
      tick(ac, o, t, 1500 * v, 9, 0.065, 0.10);
    },

    /* AIRCRAFT 62 ms - avionics: a sine sweeping UP 880->1560 Hz with a thin
       6 kHz hiss. The only RISING cue in the set, which is what identifies
       it, and the only one whose energy sits in the 0.9-1.8 kHz band - alone
       there, so it is the easiest of the six to pick out.

       It is not, as this comment first claimed, the cue with energy above
       5 kHz: the 6.2 kHz tick runs at 0.05 against the tone's 0.17 and
       measures as nothing. The brightest cues in the game are `order` and
       `ack_atk`, which is the right way round - an order acknowledgement
       should cut, and it must never be mistaken for a selection. */
    sel_air: function (ac, o, t) {
      var v = SELVARY[selV("air")];
      beep(ac, o, t, "sine", 880 * v, 1560 * v, 0.004, 0.085, 0.17);
      tick(ac, o, t + 0.004, 6200 * v, 2.2, 0.035, 0.05);
    },

    /* SHIP 164 ms - a sonar ping with a hull echo 70 ms behind it, 9 dB down.
       The longest of the six on purpose: ships are selected in ones and twos,
       never in the twelve-click bursts that land units get, so the tail costs
       nothing and the echo is what makes it read as "at sea". */
    sel_sea: function (ac, o, t) {
      var v = SELVARY[selV("sea")];
      beep(ac, o, t, "sine", 640 * v, 596 * v, 0.006, 0.19, 0.19);
      beep(ac, o, t + 0.07, "sine", 640 * v, 596 * v, 0.006, 0.13, 0.07);
    },

    /* SUPPORT / UNARMED 42 ms - harvester, engineer, medic, MCV. A soft
       triangle fifth at 0.12 peak against armour's 0.20: it is quieter and
       duller than every armed class, so "this thing cannot shoot" is carried
       by the level and the timbre, not by a tune you have to learn. */
    sel_sup: function (ac, o, t) {
      var v = SELVARY[selV("sup")];
      beep(ac, o, t, "triangle", 430 * v, 0, 0.004, 0.055, 0.12);
      beep(ac, o, t + 0.006, "triangle", 645 * v, 0, 0.004, 0.045, 0.07);
    },

    /* STRUCTURE 79 ms - concrete. 124 Hz falling to 96 with a lowpassed
       noise body: immobile, heavy, nothing to order about. */
    sel_bld: function (ac, o, t) {
      var v = SELVARY[selV("bld")];
      beep(ac, o, t, "triangle", 124 * v, 96 * v, 0.003, 0.11, 0.22);
      var n = noiseSrc(ac, 1), f = lpf(ac, 320, 0.8), g = gainNode(ac, 0);
      burst(g.gain, t, 0.003, 0.085, 0.16);
      n.connect(f); f.connect(g); g.connect(o);
      startNoise(n, t, 0.10);
    },

    /* HOSTILE / NEUTRAL INTEL 86 ms - clicking an enemy is a look, not a
       command, so it has to sit UNDER every friendly cue.

       The first draft set both partials to 0.09, which is the lowest
       scheduled gain of the ten cues, and claimed that made it the quietest.
       It did not. Every other selection cue is one tone plus filtered noise;
       this one is two bare squares, and a square at 0.09 carries its odd
       harmonics unfiltered into the limiter - so measured at the OUTPUT it
       came back at 0.055 peak, second loudest of the ten and level with
       sel_sea. Scheduled gain is not loudness once the shapes differ.
       Lowpassed, and down to 0.040 scheduled, which measures 0.030 peak at
       the output - below sel_sup 0.033 and sel_inf 0.037, the two quietest
       friendly cues. At 0.055 it still measured 0.042 and was louder than
       four of the six things it is supposed to sit under. */
    sel_intel: function (ac, o, t) {
      var g = gainNode(ac, 1), f = lpf(ac, 2600, 0.7);
      g.connect(f); f.connect(o);
      beep(ac, g, t, "square", 1180, 0, 0.002, 0.035, 0.040);
      beep(ac, g, t + 0.055, "square", 780, 0, 0.002, 0.045, 0.040);
    },

    /* DROPPED FROM THE SELECTION 37 ms - shift-clicking a unit OUT of the
       group changed what the player commands and made no sound whatever,
       which is the one selection edit where the hand is faster than the eye.
       One falling triangle, no noise, quieter than every cue that ADDS
       something (0.026 peak against sel_sup's 0.033, the quietest of those):
       the group got smaller, and that is all it has to say. */
    sel_drop: function (ac, o, t) {
      beep(ac, o, t, "triangle", 560, 330, 0.003, 0.05, 0.10);
    },

    /* ORDER ACCEPTED 56 ms - rebuilt, same name, so all 23 order sites get it
       without touching them.

       Two clipped square taps, 36 ms apart. What separates it from every
       selection cue is not pitch - it shares the 0.9-1.8 kHz band with
       sel_air - but SHAPE: an order is a PAIR of taps with silence between
       them, a selection is one continuous event. That is the discriminator to
       defend, and it holds even when the two land 200 ms apart.

       Two things the first version of this comment claimed and the render
       does not support: it is not the shortest cue in the game (click 28 ms
       and ack_atk 40 ms are both shorter), and it is not built out of
       transients - it is two oscillators, no noise at all. ack_atk is the one
       with the noise transient. The old sine sweep it replaced shared its
       700-1050 Hz range and its 90 ms envelope with half the UI. */
    order: function (ac, o, t) {
      var v = SELVARY[selV("ack")];
      beep(ac, o, t, "square", 980 * v, 0, 0.001, 0.026, 0.13);
      beep(ac, o, t + 0.036, "square", 1320 * v, 0, 0.001, 0.030, 0.13);
    },

    /* ATTACK ORDER ACCEPTED 40 ms - a falling sawtooth with a bite of noise
       across it. Ordering a column to engage is not the same event as ordering
       it to walk, and it is the one order worth hearing over a battle. */
    ack_atk: function (ac, o, t) {
      var v = SELVARY[selV("atk")];
      beep(ac, o, t, "sawtooth", 700 * v, 470 * v, 0.002, 0.055, 0.15);
      /* the noise band moves with the tone. It used to be a hard-coded 900,
         so two of the three variants differed by less than the round-off of
         the other cues and the promised variation was half a promise. */
      tick(ac, o, t + 0.002, 900 * v, 3.0, 0.05, 0.09);
    },
    build:     function (ac, o, t) { beep(ac, o, t, "triangle", 420, 640, 0.006, 0.11, 0.18); },
    ready:     function (ac, o, t) {
      [660, 880, 1100].forEach(function (f, i) { beep(ac, o, t + i * 0.09, "triangle", f, 0, 0.01, 0.12, 0.22); });
    },
    unitready: function (ac, o, t) {
      [520, 780].forEach(function (f, i) { beep(ac, o, t + i * 0.08, "triangle", f, 0, 0.01, 0.10, 0.20); });
    },
    sell:      function (ac, o, t) {
      [900, 700, 520].forEach(function (f, i) { beep(ac, o, t + i * 0.06, "square", f, 0, 0.005, 0.07, 0.14); });
    },
    alarm:     function (ac, o, t) {
      for (var i = 0; i < 2; i++) beep(ac, o, t + i * 0.25, "sawtooth", 440, 620, 0.01, 0.22, 0.18);
    },

    /* ---- "you are being shot at" ----
       Deliberately built without noise. Every combat sound in this file is
       noise plus a transient, so a warning made the same way disappears into
       the battle it is warning about. This is two clean square pulses a
       fourth apart - 760 and 570Hz, the interval a European two-tone siren
       uses - over a short sine thump that gives it weight without reading as
       an explosion. 0.44s of scheduled nodes and 0.26s actually audible,
       measured offline - it fires while the player is already doing
       something else and must not sit on top of them. play() holds it to one
       every 9 seconds, the longest gap in that table.

       And it ducks, which the first draft did not. Every other warning pulls
       the mix down to cut through - threat_med 0.55 over 1.2s, threat_high
       0.35 over 2.6, launch_ballistic 0.4 over 3.0 - and this was the only
       one without, while also being the quietest of them and the ONLY one
       that fires while a firefight is at its loudest, which is precisely
       when it is needed. A gentle 0.7 over 0.7s: enough to clear a window
       for it, far short of the drama the strategic cues are allowed. */
    under_fire: function (ac, o, t) {
      duck(0.70, 0.7);
      [760, 570].forEach(function (f, i) {
        var t2 = t + i * 0.17;
        var ov = osc(ac, "square", f), fl = lpf(ac, 2200, 0.9), g = gainNode(ac, 0);
        burst(g.gain, t2, 0.004, 0.13, 0.22);
        ov.connect(fl); fl.connect(g); g.connect(o);
        ov.start(t2); ov.stop(t2 + 0.22);
      });
      var sb = osc(ac, "sine", 96), sg = gainNode(ac, 0);
      sb.frequency.exponentialRampToValueAtTime(58, t + 0.34);
      burst(sg.gain, t, 0.012, 0.34, 0.34);
      sb.connect(sg); sg.connect(o); sb.start(t); sb.stop(t + 0.44);
    },

    /* ---------- threat-scaled cues ----------
       Routine contact stays quiet on purpose. The heavy cues are reserved for
       things that genuinely change the shape of the battle, so that hearing
       one actually means something. */
    threat_med: function (ac, o, t) {
      duck(0.55, 1.2);
      [110, 131].forEach(function (f, i) {
        var ov = osc(ac, "sawtooth", f), g = gainNode(ac, 0), fl = lpf(ac, 300, 1);
        fl.frequency.linearRampToValueAtTime(1400, t + 0.9);
        ov.frequency.linearRampToValueAtTime(f * 1.5, t + 0.9);
        burst(g.gain, t + i * 0.05, 0.10, 1.0, 0.30);
        ov.connect(fl); fl.connect(g); g.connect(o);
        ov.start(t + i * 0.05); ov.stop(t + 1.3);
      });
      var n = noiseSrc(ac, 1), nf = bp(ac, 180, 2.5), ng = gainNode(ac, 0);
      burst(ng.gain, t, 0.08, 1.0, 0.28);
      n.connect(nf); nf.connect(ng); ng.connect(o);
      startNoise(n, t, 1.1);
    },

    /* tier 3: strategic. Sub-bass drop, a dissonant cluster and a long tail -
       the sound a B-2 or a ballistic launch deserves. */
    threat_high: function (ac, o, t) {
      duck(0.35, 2.6);
      var sub = osc(ac, "sine", 120), sg = gainNode(ac, 0);
      sub.frequency.exponentialRampToValueAtTime(26, t + 1.8);
      burst(sg.gain, t, 0.02, 2.4, 0.95);
      sub.connect(sg); sg.connect(o); sub.start(t); sub.stop(t + 2.6);
      [55, 77.8, 116.5].forEach(function (f, i) {
        var ov = osc(ac, "sawtooth", f), g = gainNode(ac, 0), fl = lpf(ac, 180, 1);
        fl.frequency.linearRampToValueAtTime(2600, t + 0.7);
        fl.frequency.linearRampToValueAtTime(400, t + 2.4);
        burst(g.gain, t + i * 0.04, 0.18, 2.3, 0.32);
        ov.connect(fl); fl.connect(g); g.connect(o);
        ov.start(t + i * 0.04); ov.stop(t + 2.6);
      });
      for (var i = 0; i < 2; i++) {
        var t2 = t + 0.25 + i * 0.75;
        var ov2 = osc(ac, "sawtooth", 300), g2 = gainNode(ac, 0);
        ov2.frequency.linearRampToValueAtTime(760, t2 + 0.32);
        ov2.frequency.linearRampToValueAtTime(300, t2 + 0.66);
        burst(g2.gain, t2, 0.06, 0.60, 0.26);
        ov2.connect(g2); g2.connect(o); ov2.start(t2); ov2.stop(t2 + 0.7);
      }
      var n = noiseSrc(ac, 1), nf = lpf(ac, 900, 0.7), ng = gainNode(ac, 0);
      nf.frequency.exponentialRampToValueAtTime(70, t + 2.2);
      burst(ng.gain, t, 0.05, 2.2, 0.40);
      n.connect(nf); nf.connect(ng); ng.connect(o);
      startNoise(n, t, 2.4);
    },

    /* a ballistic launch: the rumble builds instead of hitting at once */
    launch_ballistic: function (ac, o, t) {
      duck(0.4, 3.0);
      var n = noiseSrc(ac, 1), f = lpf(ac, 70, 0.7), g = gainNode(ac, 0);
      f.frequency.exponentialRampToValueAtTime(1500, t + 1.6);
      f.frequency.exponentialRampToValueAtTime(200, t + 2.9);
      g.gain.setValueAtTime(0.00001, t);
      g.gain.linearRampToValueAtTime(0.80, t + 1.5);
      g.gain.exponentialRampToValueAtTime(0.00001, t + 3.0);
      n.connect(f); f.connect(g); g.connect(o);
      startNoise(n, t, 3.0);
      var ov = osc(ac, "sine", 38), og = gainNode(ac, 0);
      ov.frequency.linearRampToValueAtTime(64, t + 2.2);
      burst(og.gain, t, 0.6, 2.2, 0.85);
      ov.connect(og); og.connect(o); ov.start(t); ov.stop(t + 3.0);
    },

    /* a stealth aircraft crossing the line: felt more than heard */
    stealth_pass: function (ac, o, t) {
      var n = noiseSrc(ac, 1), f = bp(ac, 120, 0.7), g = gainNode(ac, 0);
      f.frequency.exponentialRampToValueAtTime(900, t + 0.9);
      f.frequency.exponentialRampToValueAtTime(90, t + 1.7);
      burst(g.gain, t, 0.55, 1.1, 0.40);
      n.connect(f); f.connect(g); g.connect(o);
      startNoise(n, t, 1.8);
    },

    /* radar lock warning - the thing a pilot least wants to hear */
    lock_warn: function (ac, o, t) {
      for (var i = 0; i < 6; i++) beep(ac, o, t + i * 0.11, "square", 1180, 0, 0.003, 0.05, 0.13);
    },
  };

  /* Pull the whole mix down for a moment so a heavy cue cuts through the
     battle instead of piling on top of it. */
  function duck(to, dur) {
    if (!master || !ctx) return;
    var t = ctx.currentTime;
    try {
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(mixLevel * to, t + 0.06);
      master.gain.linearRampToValueAtTime(mixLevel, t + dur);
    } catch (e) {}
  }

  /* ---- combat intensity bed ----
     A slow drone whose brightness tracks how much damage is being done. Quiet
     skirmishing stays calm; a real engagement audibly tightens. */
  var bed = null, bedGain = null, bedFilter = null, bedLevel = 0;
  function startBed() {
    if (bed || !ensure()) return;
    bed = osc(ctx, "sawtooth", 41.2);              // low E
    var bed2 = osc(ctx, "sawtooth", 61.7);         // the fifth above
    bedGain = gainNode(ctx, 0);
    bedFilter = lpf(ctx, 120, 1.2);
    bed.connect(bedFilter); bed2.connect(bedFilter);
    bedFilter.connect(bedGain); bedGain.connect(bedBus);
    bed.start(); bed2.start();
  }
  function setIntensity(level) {
    if (!enabled || !ctx) return;
    startBed();
    if (!bedGain) return;
    bedLevel += (level - bedLevel) * 0.08;
    var t = ctx.currentTime;
    bedGain.gain.setTargetAtTime(bedLevel * 0.16, t, 0.6);
    bedFilter.frequency.setTargetAtTime(90 + bedLevel * 620, t, 0.8);
  }

  /* ------------------------------------------------------------- play() */
  var lastCue = {};
  var inFire = 0;          // depth of Combat.fire, so its own cues defer
  function play(name, x, y) {
    if (!enabled || !ensure()) return;
    /* Combat announces its own shots with three generic names. We already
       synthesised the real report from the weapon row, so swallow them. */
    if (inFire > 0 && (name === "shot" || name === "cannon" || name === "missile")) return;
    resume();
    var now = performance.now();
    var gap = /^threat_high|^launch_ballistic/.test(name) ? 6000
            /* the attack warning is the one cue a losing player hears most,
               so it gets the longest gap in the table */
            : /^under_fire/.test(name) ? 9000
            : /^threat_med|^stealth_pass|^lock_warn/.test(name) ? 2500 : 60;
    if (lastCue[name] && now - lastCue[name] < gap) return;
    lastCue[name] = now;
    var fn = cues[name];
    if (!fn) return;
    var diegetic = /^(shot|cannon|missile|explode|explode_big|die_inf)$/.test(name);
    var bus = uiBus;
    if (diegetic) {
      var sp = (x === undefined) ? here(0.85) : place(x, y, name === "explode_big" ? 900 : 400, 0.8);
      if (!sp) return;
      bus = voice(sp, 3.0, sfxBus);
      if (!bus) return;
    }
    try { fn(ctx, bus, ctx.currentTime + 0.002); } catch (e) { fail(e); }
  }

  /* ---- one sound per selection, whatever its size ----
     Twelve units must not fire twelve cues. The rule: the WHOLE selection gets
     ONE cue, chosen by the most numerous class in it, so a nine-tank column
     with a stray medic sounds like armour. On an exact tie the heavier class
     wins (armour > air > sea > infantry > support > structure), because in a
     mixed box what you most need to know is the heaviest thing you just picked
     up. play()'s own 60 ms per-name gate then catches the rare double call.

     Selection is a UI event, not a thing happening on the map, so it is NOT
     positional: play() only spatialises the six diegetic names (shot, cannon,
     missile, explode, explode_big, die_inf) and routes everything else to
     uiBus flat and dry. A cue that panned to wherever the unit stood would be
     quieter for the units furthest from the camera - exactly backwards, since
     those are the ones you are least sure about. */
  /* The rank only ever decides an exact tie - three tanks and three ships in
     one box. AIRCRAFT sit above armour in it, which is not what "the heaviest
     thing wins" would give: the tie-break is for the class whose being
     UNNOTICED costs the most, and a stray fighter swept into a ground box is
     flown over the enemy's SAM belt by the next move order, while a stray
     tank in an air group merely arrives late. */
  var SEL_RANK = { sel_air: 6, sel_veh: 5, sel_sea: 4, sel_inf: 3, sel_sup: 2, sel_bld: 1 };
  function selClass(e) {
    if (!e || e.dead) return null;
    if (e.kind === "building") return "sel_bld";
    var d = e.def || {};
    /* Unarmed only demotes GROUND units. An unarmed aircraft is still an
       aircraft and an unarmed hull is still a ship - domain beats armament
       there, because knowing a thing is airborne matters more than knowing it
       cannot shoot. On the ground it is the other way round: harvester,
       engineer, medic and MCV behave nothing like a tank. */
    if ((e.cat === "infantry" || e.cat === "vehicle") && (!d.weapons || !d.weapons.length))
      return "sel_sup";
    return e.cat === "infantry" ? "sel_inf"
         : e.cat === "aircraft" ? "sel_air"
         : e.cat === "naval"    ? "sel_sea"
         : "sel_veh";
  }
  /* Returns the cue name it played, or null if the selection held nothing it
     could name - an empty list, or a reference to something already dead.
     A caller that must make SOME sound needs to know which happened: the
     attention-jump key selects a unit that may have died since the list was
     scored, and keying its fallback on "was there a reference" rather than on
     "did a cue play" left that key silent. */
  function select(sel) {
    if (!enabled) return null;
    var list = (sel && sel.length !== undefined) ? sel : (sel ? [sel] : []);
    var tally = {}, best = null, bn = 0, i, c, n;
    for (i = 0; i < list.length; i++) {
      c = selClass(list[i]);
      if (!c) continue;
      n = tally[c] = (tally[c] || 0) + 1;
      if (n > bn || (n === bn && SEL_RANK[c] > SEL_RANK[best])) { bn = n; best = c; }
    }
    if (!best) return null;
    play(best);
    return best;
  }

  /* ========================= WIRING INTO THE GAME =========================
     audio.js loads before combat.js, so the hooks are installed lazily the
     first time the graph is asked for. Nothing outside this file changes. */

  var hooked = false, tracked = [], driverOn = false;

  function hookCombat() {
    if (hooked || typeof Combat === "undefined" || !Combat.fire) return;
    hooked = true;
    var origFire = Combat.fire;
    Combat.fire = function (game, shooter, w, target) {
      var r;
      try {
        inFire++;
        try { weapon(w, shooter.x, shooter.y); } catch (e) { fail(e); }
        r = origFire.apply(this, arguments);
      } finally { inFire--; }
      /* hitscan rounds never become projectiles, so their impact is scheduled
         here from the flight time over the intervening ground */
      if (w && w.proj === "bullet" && target && !target.dead) {
        try {
          var d = Math.sqrt((target.x - shooter.x) * (target.x - shooter.x) +
                            (target.y - shooter.y) * (target.y - shooter.y));
          scheduleImpact(game, target, target.x, target.y, w.dmg / 120, d / 26000);
        } catch (e) { fail(e); }
      }
      return r;
    };
  }

  function materialFor(game, ent, px, py, underwater) {
    if (underwater) return "water";
    if (ent && !ent.dead) {
      var a = ent.armor || (ent.def && ent.def.armor);
      if (ent.layer === "air") return "air";
      if (a === "heavy" || a === "light") return ent.cat === "naval" ? "hull" : "armour";
      if (a === "structure" || a === "wall") return "structure";
      if (a === "infantry") return "flesh";
      if (a === "air") return "air";
    }
    try {
      var m = game.map, TL = CFG.TILE;
      var tx = clamp((px / TL) | 0, 0, m.W - 1), ty = clamp((py / TL) | 0, 0, m.H - 1);
      var t = m.terrain[ty * m.W + tx];
      if (t === T.WATER) return "water";
      if (t === T.ROCK) return "rock";
      if (t === T.URBAN || t === T.ROAD) return "structure";
    } catch (e) {}
    return "earth";
  }

  var pendImpacts = [];
  function scheduleImpact(game, ent, px, py, energy, wait) {
    /* A long burst puts eight of these in the air inside half a second. Every
       round does not need its own strike: thin them out and let the ones that
       survive carry the burst. */
    if (energy < 0.25 && Math.random() > 0.45) return;
    if (pendImpacts.length > 40) return;
    var mat = materialFor(game, ent, px, py, false);
    if (wait > 0.008) pendImpacts.push({ t: performance.now() + wait * 1000, mat: mat, x: px, y: py, e: energy });
    else impact(mat, px, py, energy);
  }

  /* Detonations are read straight off Combat.projectiles: a round that leaves
     the list has either arrived or been shot down, and the two are told apart
     by how far it still was from its aim point. */
  function pollProjectiles(game) {
    var live;
    try { live = Combat.projectiles; } catch (e) { return; }
    if (!live) return;
    if (tracked.length) {
      for (var i = 0; i < tracked.length; i++) {
        var p = tracked[i];
        if (live.indexOf(p) >= 0) continue;
        var miss = Math.sqrt((p.x - p.tx) * (p.x - p.tx) + (p.y - p.ty) * (p.y - p.ty));
        var uw = p.type === "torpedo" || p.type === "depth";
        var aoe = (p.w && p.w.aoe) || 0.35;
        var e = clamp((p.dmg || 40) / 320, 0.05, 1);
        if (miss > CFG.TILE * 1.5) {
          /* killed on the way in: a burst in mid air where it died */
          impact("air", p.x, p.y, e * 0.7);
        } else if (aoe >= 1.2 || (p.dmg || 0) >= 150) {
          boom(p.tx, p.ty, clamp(aoe / 3.2, 0.18, 1), materialFor(game, null, p.tx, p.ty, uw) === "water");
          if (p.target && p.hit) impact(materialFor(game, p.target, p.tx, p.ty, uw), p.tx, p.ty, e * 0.7);
        } else {
          impact(materialFor(game, p.hit ? p.target : null, p.tx, p.ty, uw), p.tx, p.ty, e);
        }
      }
    }
    tracked = live.slice(0);
  }

  function drainPending() {
    if (!pendImpacts.length) return;
    var now = performance.now();
    for (var i = pendImpacts.length - 1; i >= 0; i--) {
      if (pendImpacts[i].t <= now) {
        var q = pendImpacts[i];
        pendImpacts.splice(i, 1);
        impact(q.mat, q.x, q.y, q.e);
      }
    }
  }

  var lastDrive = 0;
  function drive() {
    if (!driverOn) return;
    try { requestAnimationFrame(drive); } catch (e) { driverOn = false; return; }
    if (!ctx) return;
    hookCombat();
    if (!enabled) { if (engN) stopEngines(); return; }
    var now = performance.now();
    var dt = (now - lastDrive) / 1000;
    lastDrive = now;
    var g = null;
    try { g = (typeof Game !== "undefined" && Game && Game.map) ? Game : null; } catch (e) {}
    try { reap(ctx.currentTime); drainPending(); } catch (e) { fail(e); }
    if (!g) { if (engN) stopEngines(); return; }
    try { pollProjectiles(g); } catch (e) { fail(e); }
    /* engines only need a few updates a second to sound continuous */
    if (dt >= 0 && (now - (drive.eng || 0)) > 90) { drive.eng = now; try { updateEngines(g, dt); } catch (e) { fail(e); } }
  }
  function startDriver() {
    if (driverOn) return;
    driverOn = true; lastDrive = performance.now();
    try { requestAnimationFrame(drive); } catch (e) { driverOn = false; }
  }
  /* If nothing ever calls ensure() from a gesture the driver still comes up
     once the page settles, so the hooks are in place the moment audio starts. */
  try {
    if (typeof window !== "undefined" && window.addEventListener)
      window.addEventListener("load", function () { setTimeout(hookCombat, 0); }, { once: true });
  } catch (e) {}

  /* ============================ OFFLINE RENDER ============================
     The same synthesis, rendered into an OfflineAudioContext through the same
     limiter, so a report can be measured rather than described. Deterministic:
     the jitter runs off a seeded LCG for the duration of the render.        */
  function render(spec) {
    spec = spec || {};
    var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OAC) return Promise.reject(new Error("no OfflineAudioContext"));
    var sr  = spec.sampleRate || 48000;
    var dur = spec.duration || 3.0;
    var oc  = new OAC(1, Math.ceil(sr * dur), sr);
    var bus = buildBus(oc);
    var sp;
    if (spec.metres !== undefined) {
      var m = spec.metres, refM = spec.refM || 400;
      sp = { m: m, gain: 1 / (1 + Math.pow(m / refM, 1.6)),
             cut: clamp(19000 * Math.pow(0.5, m / 260), 200, 19000),
             far: clamp(m / 700, 0, 1), pan: 0, delay: 0 };
    } else sp = here(1);

    det = true; detSeed = spec.seed === undefined ? 20260821 : spec.seed;
    /* pin the round-robin so a render measures the variant it asked for */
    selPin = spec.variant === undefined ? -1 : (spec.variant | 0);
    try {
      var chain = spatialChain(oc, gainNode(oc, 1), sp, bus.sfx);
      if (spec.weapon) {
        var S = specOf(spec.weapon);
        if (spec.metres !== undefined) {
          sp.gain = 1 / (1 + Math.pow(sp.m / S.refM, 1.6));
        }
        emitReport(oc, chain.head, 0.02, S, sp);
      } else if (spec.impact) {
        emitImpact(oc, chain.head, 0.02, spec.impact, spec.energy === undefined ? 0.6 : spec.energy, sp);
      } else if (spec.boom !== undefined) {
        emitBoom(oc, chain.head, 0.02, spec.boom, !!spec.water, sp);
      } else if (spec.cue && cues[spec.cue]) {
        cues[spec.cue](oc, bus.ui, 0.02);
      }
    } finally { det = false; selPin = -1; }
    return oc.startRendering();
  }

  /* Everything the weapon fingerprint decided, as plain numbers. Useful for
     a balance pass and for proving that two guns really are different. */
  function describe(id) {
    var S = specOf(id);
    return {
      id: S.id, kind: S.kind, warhead: S.warhead, bore_mm: +S.bore.toFixed(2),
      body_hz: +S.f0.toFixed(1), tail_s: +S.tail.toFixed(3),
      level: +S.level.toFixed(3), crack: +S.crack.toFixed(3),
      thump: +S.thump.toFixed(3), ring: +S.ring.toFixed(2),
      carry_m: +S.refM.toFixed(0),
    };
  }

  function stats() {
    return {
      state: ctx ? ctx.state : "none",
      voices: voices.length,
      engines: engN,
      hooked: hooked,
      tracked: tracked.length,
      sampleRate: ctx ? ctx.sampleRate : 0,
    };
  }

  /* Mute and volume have to survive a duck(), which ramps the master back to
     wherever the mix is meant to sit rather than to a constant. */
  var userVol = 1;
  function applyMix() {
    mixLevel = enabled ? BASE_GAIN * userVol : 0;
    if (!master || !ctx) return;
    try {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(mixLevel, ctx.currentTime);
    } catch (e) { try { master.gain.value = mixLevel; } catch (e2) {} }
  }
  function setEnabled(on) {
    enabled = !!on;
    if (!enabled) stopEngines();
    applyMix();
  }
  function volume(v) { userVol = clamp(v, 0, 1); applyMix(); }

  /* ====================== SPOKEN ACKNOWLEDGEMENT ======================
     The owner: "the unit audio has the sound but no answer voice like MCV
     reporting / Ore miner working."

     Right - the class cues say WHAT you picked up, and nothing ever answered.
     That answering voice is half of what makes a unit feel crewed, and this
     game had none.

     ZERO ASSET FILES is a hard rule here, so a recorded voice line is out.
     speechSynthesis is the way round it: it ships inside the browser, needs
     no file, and is the only way to get real words into this project. It is
     deliberately NOT routed through the Web Audio graph - the utterance queue
     is its own output - so it is volume-matched by hand against userVol and
     silenced with the rest when the player mutes.

     Lines are per ROLE where the role has an identity worth hearing (a
     harvester, an engineer, a construction vehicle, a ship) and per CLASS
     otherwise, because fifty-eight roles of bespoke dialogue is a liability,
     not a feature. Pitch and rate shift by class so an infantry section and a
     destroyer do not sound like the same rating reading from the same card. */
  var VOX = {
    /* role lines - the ones the owner named, and their obvious siblings */
    mcv:        ["Construction vehicle ready", "MCV reporting", "Standing by to deploy"],
    harvester:  ["Ore miner working", "Hauler reporting", "Running the ore"],
    engineer:   ["Engineer reporting", "Ready to work"],
    medic:      ["Medic up", "Corpsman reporting"],
    repair:     ["Recovery vehicle ready", "Workshop standing by"],
    supply:     ["Supply section reporting", "Loaded and ready"],
    oiler:      ["Oiler on station"],
    tanker:     ["Tanker on station", "Ready to pass fuel"],
    awacs:      ["Picture is clear", "Radar on line", "Scope is up"],
    cawacs:     ["Picture is clear", "Scope is up"],
    ewair:      ["Jammers ready", "Electronic attack ready"],
    sead:       ["Wild Weasel ready", "Hunting radars"],
    recon:      ["Scout reporting", "Eyes forward"],
    engineer2:  ["Ready"],
    sniper:     ["In position", "Overwatch set"],
    mlrs:       ["Battery ready", "Rockets loaded"],
    spg:        ["Gun line ready", "Battery is laid"],
    tel:        ["Launcher ready", "Awaiting release"],
    ssbn:       ["Boat is ready", "Tubes are ready"],
    ssgn:       ["Boat is ready"],
    sub:        ["Running quiet", "Boat is ready"],
    minelayer:  ["Layer ready"],
    mineclear:  ["Clearing party ready"],
  };
  /* fall back by class, so every unit answers something */
  var VOX_CLASS = {
    sel_inf: ["Yes sir", "Ready", "Section reporting", "Awaiting orders"],
    sel_veh: ["Crew ready", "Standing by", "Engine running"],
    sel_air: ["Airborne", "On station", "Ready for tasking"],
    sel_sea: ["Bridge reporting", "Ship is ready", "Standing by"],
    sel_sup: ["Reporting", "Standing by"],
    sel_bld: [],                                  // a building does not speak
  };
  var VOX_ORDER = {
    sel_inf: ["Moving", "On our way", "Acknowledged"],
    sel_veh: ["Moving out", "On our way"],
    sel_air: ["Wilco", "Rolling in", "En route"],
    sel_sea: ["Coming about", "Making way"],
    sel_sup: ["Moving"],
    sel_bld: [],
  };
  /* class colouring: an infantry section is not a destroyer */
  var VOX_TONE = {
    sel_inf: { pitch: 1.06, rate: 1.12 },
    sel_veh: { pitch: 0.94, rate: 1.00 },
    sel_air: { pitch: 1.00, rate: 1.16 },
    sel_sea: { pitch: 0.84, rate: 0.92 },
    sel_sup: { pitch: 1.00, rate: 1.02 },
  };
  var voxOn = true, voxT = 0, voxN = 0, voxVoice = null, voxTried = false;

  function voxPick(list) {
    if (!list || !list.length) return null;
    voxN = (voxN + 1) % 1000;
    return list[voxN % list.length];
  }
  /* One English voice, chosen once. getVoices() is empty until the engine has
     loaded them, which is asynchronous in every browser that implements it -
     hence the retry rather than a single lookup at startup. */
  function voxSelect(syn) {
    if (voxVoice || voxTried) return voxVoice;
    var vs = [];
    try { vs = syn.getVoices() || []; } catch (e) { return null; }
    if (!vs.length) return null;               // not loaded yet, try again later
    voxTried = true;
    for (var i = 0; i < vs.length; i++)
      if (/^en[-_]/i.test(vs[i].lang || "") && !/novelty|whisper/i.test(vs[i].name || ""))
        { voxVoice = vs[i]; break; }
    if (!voxVoice) voxVoice = vs[0];
    return voxVoice;
  }

  /* e is the unit; kind is "select" or "order". Returns the line, or null. */
  function vox(e, kind) {
    if (!enabled || !voxOn || !e || e.dead) return null;
    var syn = (typeof window !== "undefined") && window.speechSynthesis;
    if (!syn) return null;
    /* Rate limit hard. This fires on every click and a voice that talks over
       itself is worse than silence - 1.6s is about one line. */
    var now = (typeof performance !== "undefined" && performance.now)
      ? performance.now() / 1000 : Date.now() / 1000;
    if (now - voxT < 1.6) return null;
    var cls = selClass(e);
    if (!cls || cls === "sel_bld") return null;
    var role = (e.def && e.def.role) || "";
    var line = kind === "order" ? voxPick(VOX_ORDER[cls])
                                : (voxPick(VOX[role]) || voxPick(VOX_CLASS[cls]));
    if (!line) return null;
    voxT = now;
    try {
      var u = new window.SpeechSynthesisUtterance(line);
      var tone = VOX_TONE[cls] || { pitch: 1, rate: 1 };
      u.pitch = tone.pitch; u.rate = tone.rate;
      u.volume = clamp(userVol, 0, 1) * 0.85;
      var v = voxSelect(syn); if (v) u.voice = v;
      /* never let a backlog build: one line at a time */
      try { syn.cancel(); } catch (e2) {}
      syn.speak(u);
    } catch (e3) { return null; }
    return line;
  }
  function voxEnabled(on) {
    voxOn = !!on;
    if (!voxOn) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  return {
    /* the surface the rest of js/ already uses */
    play: play, ensure: ensure, setIntensity: setIntensity, duck: duck,
    /* new, all optional */
    select: select, selClass: selClass, vox: vox, voxEnabled: voxEnabled,
    weapon: weapon, impact: impact, boom: boom,
    updateEngines: updateEngines, stopEngines: stopEngines,
    render: render, describe: describe, stats: stats,
    setEnabled: setEnabled, volume: volume,
    get ctx() { return ctx; },
    /* the pre-limiter sum, exposed so a test rig can tap the live mix */
    get bus() { return master; },
  };
})();
