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
   weapon row in rules.js: the calibre read out of WEAPONS[id].name (cartridge,
   millimetre, centimetre, inch and .50-cal notations alike), what the name
   says the weapon is, the projectile type, the warhead and the damage figure
   pick a family - rifle, machine gun, heavy MG, autocannon, rotary, tank gun,
   naval gun, howitzer, mortar, ten kinds of missile launch, three of rocket,
   torpedoes, depth charges, bombs - and scale its physics. Add a gun to
   rules.js and it gets a report of the right size for nothing. A 7.62 mm GPMG
   is a 0.7 ms blast wave under a 0.24 ms bullet crack with a short outdoor
   tail; a 125 mm smoothbore is a 4 ms blast wave, a 1 ms crack, a noise boom
   centred near 90 Hz and two echoes rolling out over two seconds. A rotary
   gun is one report per burst, at its true cyclic rate.

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
  var ENGINE_MIX  = 0.080;  // a 62 t hull's engine: see engineLevel, and buildBus
  var ENGINE_UNDER = 9;     // LU an engine keeps under its own main weapon, at least
  var ENGINE_COMP_T = -10;  // dBFS: the engine compressor, which only a crowd reaches
  var ENGINE_IDLE = 0.62;   // an idling engine's gain against full drive
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
    /* TERRAIN RETURNS. Outdoors there is no reverb tail, but a shot or a
       blast is never dry either: it comes back off the vehicles, walls and
       ground close by within a few tens of ms, and later off the tree line
       or the rise behind you - dull, because foliage and the longer path eat
       the top, and never as a clean copy, because a rough surface scatters
       it over tens of ms. Without that every one-shot here sounded as if
       fired in an anechoic room.
       Two clusters, off the one-shot bus only (UI cues and engines stay
       dry):
         near    six small taps at 13-45 ms, irregular so they make no
                 pitch, each lowpassed a little lower. Inside ~50 ms the ear
                 fuses them with the sound itself: they read as space and
                 body, not as echoes.
         far     six taps at 97-163 ms, 9-17 ms apart, each lowpassed lower
                 than the one before (1.5 kHz down to 700 Hz) and on
                 alternating sides: one rough, dull return off the tree line,
                 not six copies of the crack.
       A first cut used six identical 2.2 kHz taps spread 29-211 ms; on a
       single rifle shot or a clink they read as a multi-tap delay. Every tap
       has its own filter now, so no two returns are the same copy, and the
       send is highpassed at 160 Hz so a blast's sub is not doubled into the
       limiter. The taps sum to -19.5 dB of the dry energy before their
       filters; after them a rifle crack's returns sit about 28 dB under
       it and an armour clang's about 16 dB, and the loudest 400 ms of any
       weapon report moves by -0.3 to +0.2 dB. No feedback loop, so nothing
       can build up however dense the battle, and it is built once per
       context: no sound pays a node for it. */
    var rs = gainNode(ac, 0.15), rh = hpf(ac, 160);
    sfx.connect(rs); rs.connect(rh);
    var side = [m, m];
    if (ac.createStereoPanner) {
      side = [ac.createStereoPanner(), ac.createStereoPanner()];
      side[0].pan.value = -0.6; side[1].pan.value = 0.55;
      side[0].connect(m); side[1].connect(m);
    }
    [[0.013, 0.34, 3400], [0.019, 0.30, 3100], [0.026, 0.27, 2800], [0.031, 0.23, 2600],
     [0.038, 0.20, 2400], [0.045, 0.17, 2200],
     [0.097, 0.17, 1500], [0.106, 0.15, 1350], [0.118, 0.13, 1200], [0.131, 0.11, 1000],
     [0.146, 0.09, 850], [0.163, 0.07, 700]].forEach(function (tp, i) {
      var d = ac.createDelay(0.2), l = lpf(ac, tp[2], 0.5), g = gainNode(ac, tp[1]);
      d.delayTime.value = tp[0];
      rh.connect(d); d.connect(l); l.connect(g); g.connect(side[i & 1]);
    });
    var ui  = gainNode(ac, 0.90);  ui.connect(m);
    var bed = gainNode(ac, 1.0);   bed.connect(m);
    /* ENGINES: a trim, a compressor only a crowd reaches, and that
       compressor's own makeup gain taken back out after it.
       A DynamicsCompressor raises everything it passes by the spec's
       automatic MAKEUP GAIN, (1 / curve(0 dBFS))^0.6, whatever goes in. The
       old settings (-26 dB, 8:1, 8 dB knee) made that +11.55 dB, which undid
       all but 0.15 dB of the 0.26 trim, and one tank at the camera drove
       them 18 dB over threshold: a lone engine was held 6.8 dB down and
       every hull came out at -10.8 to -13.4 LUFS over its loudest 400 ms
       whatever its size. An M1A2 driving at the camera read -13.0 against
       -18.4 for its own 120 mm (above 200 Hz, all a laptop plays, 3.8 dB
       over it), a 5 t HMMWV -10.8 against -29.9 for a burst of its 12.7 mm,
       and all 403 armed ground vehicles in rules.js and 231 of the 240
       armed ships were louder driving than their main weapon firing
       (tools/audio/check_engine_mix.js measures all of it).
       The knee is hard now, so the makeup is exactly 0.6 * -T * (1 - 1/R)
       in the spec and in every browser (a soft knee's curve is each
       implementation's own), and the gain after the compressor removes it:
       a hull's level is ENGINE_MIX and its own (engineLevel), nothing else.
       The loudest hull in the game, a 2900 hp cruiser, reaches the
       compressor at -14.0 dBFS at full drive at the camera, so at -10 it
       never touches one engine; seven of them packed round the camera lose
       0.3 dB to it, seven M1A2s nothing. */
    var ec = ac.createDynamicsCompressor(), ecT = ENGINE_COMP_T, ecR = 8;
    ec.threshold.value = ecT; ec.knee.value = 0; ec.ratio.value = ecR;
    ec.attack.value = 0.05; ec.release.value = 0.4;
    var unmake = gainNode(ac, Math.pow(10, -0.6 * -ecT * (1 - 1 / ecR) / 20));
    var eng = gainNode(ac, ENGINE_MIX);
    eng.connect(ec); ec.connect(unmake); unmake.connect(m);
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
  /* Everything a report needs, derived once per weapon row and cached.

     THE NAME SAYS WHAT THE WEAPON IS; THE PROJECTILE SAYS HOW THE GAME MOVES
     ITS DAMAGE. rules.js strafes an A-10's GAU-8 as proj "bomb", fires a
     fighter's GSh-30-1 as a "missile" and a Mi-24's YakB gatling as a HEAT
     "missile". Keyed on the projectile alone, 92 of the 2135 rows at HEAD
     that are guns played a bomb leaving its rack (25) or a missile or rocket
     launch (67), and 33 missiles and rockets played a gun. Where the two
     disagree the name wins, and a GAU-8 is heard as a GAU-8. */
  var specCache = {}, specMap = (typeof WeakMap !== "undefined") ? new WeakMap() : null, specN = 0;

  function num(s) { return parseFloat(String(s).replace(",", ".")); }

  /* THE CALIBRE, read the way the name wrote it. Every notation in the roster
     is read, and where a name holds two the one written first wins, since the
     first-listed weapon is the mount's main one. The old reader took the
     first number in front of "mm" and nothing else, which over the 1918 rows
     at HEAD read the AKM's 7.62x39mm as a 39 mm cannon (the case length), the
     G3's "7,62mm" as a 62 mm gun (a decimal comma), 3in/50 and .50cal as
     unknown (sized from damage instead: 51.8 and 28.2 mm) and "1,000 lb" as
     0 lb, clamped up to the smallest bomb. 267 of the 2135 rows read
     differently now, 96 of them the tanks' "coaxial machine gun", which it
     sized from damage as an 11.6 mm gun. */
  var CAL_RX = [
    /* bullet x case: 7.62x39 is a 7.62 mm bullet in a 39 mm case, 30x173 the
       GAU-8's round. "4x 20mm" and "2x30mm" are counts, told apart by the
       numbers: no service bullet is under 4.5 mm and no case is under 17. */
    [/(\d+(?:[.,]\d+)?)[x×](\d+(?:[.,]\d+)?)/, function (m) {
      var a = num(m[1]), b = num(m[2]);
      return (a >= 4.5 && a <= 45 && b >= 17 && b <= 180 && b > a * 1.2) ? a : 0;
    }],
    [/(\d+(?:[.,]\d{1,2})?)\s*mm\b/i, function (m) { return num(m[1]); }],
    [/(\d+(?:[.,]\d+)?)\s*cm\b/i, function (m) { return num(m[1]) * 10; }],
    [/(\d+(?:\.\d+)?)(?:in\b|\s?-?inch|")/i, function (m) { return num(m[1]) * 25.4; }],
    [/(?:^|[^\w.])\.(\d{2,3})(?!\d)/, function (m) { return parseFloat("0." + m[1]) * 25.4; }],
    [/(\d+)\s*-?\s*(?:pounder|pdr)\b/i, function (m) { return 31.5 * Math.pow(num(m[1]), 0.33); }],
    /* bomb weight, thousands separators and kilograms included */
    [/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*-?\s*(lb|kg)\b/i, function (m) {
      var v = parseFloat(m[1].replace(/,/g, "")) * (/kg/i.test(m[2]) ? 2.2046 : 1);
      return v > 0 ? clamp(Math.pow(v, 0.42) * 22, 60, 420) : 0;
    }],
  ];
  var calAtIdx = Infinity;                         // where calOf found it
  function calOf(nm) {
    var best = 0, at = Infinity;
    for (var i = 0; i < CAL_RX.length; i++) {
      var m = CAL_RX[i][0].exec(nm);
      if (!m || m.index >= at) continue;
      var v = CAL_RX[i][1](m);
      if (v > 0) { best = v; at = m.index; }
    }
    calAtIdx = at;
    return best;
  }
  function boreOf(w) {
    var nm = String(w.name || w.id || "");
    var c = calOf(nm);
    if (c) return clamp(c, 4, 460);
    /* the small arms that are named without a calibre */
    if (/Minimi|M249|\bSAW\b|M16|\bM4\b|AR-15|L85|FAMAS|G36|Galil|\bAUG\b/.test(nm)) return 5.56;
    if (/GPMG|\bM60\b|\bPKM?T?\b|\bMG ?(?:3|42)\b|FN MAG|\bBren\b|DP-28|\bRPK\b|Garand|\bM14\b|\bFAL\b|\bG3\b|\bSKS\b|Mosin|machine gun/.test(nm)) return 7.62;
    var dmg = Math.max(1, w.dmg || 10);
    /* No calibre in the name, so size it from what the round actually does */
    if (w.proj === "bullet") return clamp(4.6 * Math.pow(dmg, 0.42), 5, 22);
    if (w.proj === "missile" || w.proj === "torpedo") return clamp(58 + dmg * 0.32, 70, 420);
    if (w.proj === "bomb") return clamp(120 + dmg * 0.5, 140, 420);
    if (w.proj === "shell" || w.proj === "arc") return clamp(9 * Math.pow(dmg, 0.52), 20, 260);
    return clamp(18 + dmg * 0.22, 10, 220);
  }

  /* where in a name a class of weapon is first mentioned */
  function firstAt(rx, s) { var m = rx.exec(s); return m ? m.index : Infinity; }
  var RX_GUN = /cannon|gun ?pod|GAU-\d|M61|M168|M197|\bM39\b|Vulcan|GSh-|\bN[RS]-\d|\bN-37|ADEN|DEFA|Hispano|BK-?27|YakB|gatling|minigun|chain ?gun|autocannon|[Ff]lak\b|Bofors|Rh ?202/i;
  var RX_ROCKET = /rocket|\bMRL|MLRS|\bMARS\b|barrage|Katyusha|\bGrad\b|Hydra|FFAR|HVAR|SNEB|\bRP-3|\bS-[58]\b|\bS-13|\bLAU-|Zuni|RBU|Hedgehog|recoilless|Carl Gust|\bRPG|PG-7|\bLAW\b|bazooka|Panzerfaust/i;
  /* acronyms are case-sensitive: "TOW" is not "towed", "HOT" not "shot" */
  var RX_MISSILE = /[Mm]issile|\bSAM\b|\bAAM|ATGM|\bSSM|MANPADS|\bR-\d|\b(?:AIM|AGM|RIM|MIM|BGM|FGM)-|\bKh-|\bHJ-|\bHQ-|\bPL-\d|\bYJ-|\b9M\d|\bTOW\b|TOW-\d|\bHOT\b|HOT ?\d|MILAN|Milan|Javelin|Spike|Hellfire|Maverick|\bHARM\b|\bALARM\b|Harpoon|Exocet|Stinger|Mistral|Aster \d|Crotale|Tomaha|TLAM|Granit|Termit|Styx|Moskit|Scud|Patriot|Sparrow|Sidewinder|AMRAAM|ASRAAM|Brimstone|Storm Shadow|SCALP|Taurus|JASSM|ATACMS|Polaris|Trident|Bulava|Bazalt|\bVLS\b|\bSM-\d|ESSM|Kalibr|Oniks|BrahMos|Yakhont|Matra|\bR\.5\d\d|Super 530|\bMagic\b|\bMICA\b|Meteor|Python|Shafrir|Firestreak|Red Top|Skyflash/;
  var RX_BOMB = /bomb|JDAM|\bGBU|Paveway|\bMk ?8[2-4]\b|BL755|cluster|\bFAB-|\bKAB-/i;

  function kindOf(w) {
    var p = w.proj, nm = String(w.name || "");
    if (p === "none") return /decoy|chaff|Nulka|SRBOC|flare/i.test(nm) ? "decoy" : "ciws";
    if (p === "torpedo") return "torpedo";
    if (p === "depth")   return "depth";
    if (p === "missile" || p === "bomb") {
      var g = firstAt(RX_GUN, nm), r = firstAt(RX_ROCKET, nm), s = firstAt(RX_MISSILE, nm), b = firstAt(RX_BOMB, nm);
      var lead = Math.min(r, s, b), cal = calOf(nm);
      /* a gun named first - by name, or by a gun's calibre with nothing
         that flies itself ("37mm 61-K", "3 x 30mm NR-30") or listed ahead of
         it as a separate item ("4 x 20mm and T-10 rockets"; but "40mm PG-7
         series HEAT rocket" is the rocket's own calibre) */
      if (g < lead || (lead === Infinity && cal > 0 && cal <= 130 && !/\d\s*-?\s*(?:lb|kg)\b/i.test(nm)) ||
          (cal > 0 && cal <= 40 && calAtIdx < lead && /\band\b|,|\+|&|\bplus\b|\bwith\b/i.test(nm.slice(calAtIdx, lead)))) return "gun";
      if (/recoilless|Carl Gust|\bRCL\b/i.test(nm)) return "gun";
      if (r < Math.min(s, b) || (w.rocket && s === Infinity)) return "rocket";
      if (p === "bomb") return s < b ? "missile" : "bomb";
      return "missile";
    }
    if (p === "arc") {
      /* a helicopter's dipping-sonar attack is the torpedo it drops */
      if (/torpedo|sonar/i.test(nm) && !RX_ROCKET.test(nm)) return "torpedo";
      if (/\bASW\b|depth charge/i.test(nm) && !RX_ROCKET.test(nm)) return "depth";
      return (w.rocket || RX_ROCKET.test(nm)) ? "rocket" : "arc";
    }
    /* "8 x Kh-35 SSM" moved as a shell is still a missile */
    if (firstAt(RX_MISSILE, nm) < firstAt(RX_GUN, nm) && !/\d\s*mm\b/.test(nm.slice(0, firstAt(RX_MISSILE, nm)))) return "missile";
    if (p === "bullet")  return "mg";
    return "gun";                                  // shell, tracer, anything else
  }

  /* ROTARY AND REVOLVER GUNS: cyclic rate in rounds per minute, from the
     makers' figures. Above ~2500 rpm the reports fuse into one tone at the
     firing rate - the GAU-8's 3900 rpm is a 65 Hz "BRRRT", an M61's 6000 a
     100 Hz buzz, a Phalanx's 4500 in between - so these are heard as a
     burst, not as rounds. Rates are per gun; a battery's add (below). */
  var RPM = [
    [/GAU-8|Goalkeeper/i, 3900], [/Phalanx|M168/i, 4500], [/M61|Vulcan/i, 6000], [/M134|minigun/i, 3000],
    [/H\/PJ-1[14]|Kashtan|Type 1130/i, 9500], [/AK-630|GSh-6|Type 730|H\/PJ-1[23]|six-barrel/i, 5000],
    [/GSh-23|Type 23-3/i, 3400], [/GSh-30-2/i, 3000], [/YakB|12\.7mm gatling/i, 4500], [/GAU-19/i, 1300],
    [/GAU-12|GAU-22/i, 3600], [/M197/i, 730], [/Meroka/i, 1800], [/AK-230|Type 69/i, 2000],
    [/30M791/i, 2500], [/30M781/i, 750], [/DEFA|\bM39\b/i, 1500], [/ADEN/i, 1300], [/BK-?27|Mauser/i, 1700],
    [/GSh-30-1|GSh-301/i, 1650], [/NR-30/i, 850], [/NR-23|Type 23-2/i, 850], [/NS-23/i, 550], [/N-37/i, 400],
    [/Hispano|HS\.?404/i, 700], [/ShVAK/i, 750], [/Colt Mk 12/i, 1000],
    [/M230/i, 625], [/2A42/i, 550], [/2A38/i, 2500], [/Bofors L\/60|40mm L\/60/i, 130], [/Bofors|L\/70/i, 300],
    /* machine guns count here only as a battery: one is heard round by round */
    [/M2HB/i, 550, 1], [/\bM3\b|\.50 ?cal/i, 1200, 1], [/KPV|14\.5/i, 600, 1],
  ];
  /* A battery of separate guns - an F-86's six .50s, a Hunter's four ADENs,
     a ZPU-4 - is one ripping burst: the rates add, as the reports fuse. The
     count is the one the name leads with. */
  var COUNT = { two: 2, twin: 2, three: 3, four: 4, quad: 4, six: 6 };
  function rpmOf(nm) {
    for (var i = 0; i < RPM.length; i++) if (RPM[i][0].test(nm)) {
      var c = /^\s*(\d)\s*x/i.exec(nm), w = /^\s*(two|twin|three|four|quad|six)\b/i.exec(nm);
      var n = c ? +c[1] : w ? COUNT[w[1].toLowerCase()] : 1;
      if (RPM[i][2] && n < 2) return 0;
      return n > 1 ? Math.min(6000, RPM[i][1] * n) : RPM[i][1];
    }
    return 0;
  }

  var RX_MANPADS = /MANPADS|Stinger|Mistral|Igla|Strela|9K3[2-8]\b|\b9M3(?:13|2M?|6|9|42)\b|\bQW-\d|HN-5|FN-6|Blowpipe|Starstreak|Redeye|Chiron|RBS[- ]?70|\bHVM\b|IR\/UV/i;

  /* THE VOICE. kind is the coarse class (it is what describe() reports and
     what the rate limit keys on); fam picks the physics. */
  function famOf(w, kind, bore, nm) {
    var rpm = rpmOf(nm), p = w.proj;
    switch (kind) {
      case "ciws":  return "rotary";
      case "decoy": return "decoy";
      case "depth": return "depth";
      case "bomb":  return "bomb";
      case "torpedo":
        return (bore >= 330 || /heavyweight|533|21in|650|Mk ?48|Spearfish|Tigerfish|DM2|F17|F21|53-65|UGST|Yu-6|SUT|Seeaal|Seehecht|tubes/i.test(nm))
          ? "torpedo" : "lwt";
      case "rocket":
        /* the shoulder-fired ones: a launch charge, then the motor */
        if (/RPG|PG-7|\bLAW\b|bazooka|Panzerfaust|rocket-propelled grenade|LRAC|M72|AT4|APILAS|Armbrust|disposable|shaped-charge|\bM20\b|3[.,]5 ?in/i.test(nm)) return "rpg";
        if (p === "missile" || p === "bomb") return "ffar";
        return "mlrs";
      case "missile":
        /* what a round can engage says more than its flight profile: the
           Patriot site's row flies a "cruise" profile */
        if (RX_MANPADS.test(nm)) return "manpads";
        if (w.tgt && w.tgt.air && !w.tgt.ground) {
          /* a named air-to-air round first: "Matra R.530 and 2x30mm DEFA"
             carries a 30 mm calibre that is the gun's, not the missile's */
          if (/\bAAM|AIM-|\bR-\d|\bPL-\d|Sparrow|Sidewinder|AMRAAM|ASRAAM|Meteor|MICA|Magic|R\.5\d\d|Super 530|Python|Shafrir|Derby|Firestreak|Red Top|Skyflash|Phoenix|Sky Sword|air-to-air|IR missile|radar missile|in the bays/i.test(nm)) return "aam";
          /* shoulder-fired rounds are 70-80 mm; the British Javelin is one
             (the American one is an anti-tank round, so only here). Only a
             calibre the name states counts: one sized from damage made the
             S-75's V-750 and the HAWK shoulder-fired */
          if (/Javelin|shoulder/i.test(nm) || (calOf(nm) > 0 && bore <= 80)) return "manpads";
          return /S-[34]00|\bFort|\bRif\b|Kinzhal|Klinok|Shtil|48N6|5V55|9M96|HQ-9|HHQ-9|Pongae|Vertically|\bVLS\b|CAMM|Sea Ceptor/i.test(nm) ? "sam_cold" : "sam";
        }
        /* an air-to-air round by name, whatever the row says it engages (not
           by "R-" or "PL-": the R-17, R-27 and R-39 are ballistic) */
        if (/\bAAM|AIM-|Sparrow|Sidewinder|AMRAAM|ASRAAM|Meteor|MICA|Magic|R\.5\d\d|Super 530|Python|Shafrir|Derby|Firestreak|Red Top|Skyflash|Phoenix|Sky Sword|air-to-air/i.test(nm)) return "aam";
        if (/\bSAM\b|surface-to-air|\bSM-\d|ESSM/i.test(nm)) return "sam";
        /* names first, the flight profile last: the Z-10's "AKD-10 anti-
           tank missile" is derived from a row that flies a cruise profile */
        if (/ballistic|Scud|SRBM|ATACMS|Iskander|Tochka|Pluton|Hades|Lance|Hwasong|Polaris|Trident|Bulava|SLBM|R-17|Pukguksong|\bM[245]\d\b|\bM20\b|JL-\d|DF-\d/i.test(nm)) return "ballistic";
        if (/cruise|Tomaha|TLAM|BGM-109|Kh-55|Kh-101|\bKD-\d|CJ-10|Kalibr|3M14|Storm Shadow|SCALP|Taurus|JASSM|ALCM|Hyunmoo-3/i.test(nm)) return "cruise";
        if (w.antiRadiation || /anti-radiation|anti-radar|\bARM\b/i.test(nm)) return "asm";
        if (/anti-ship|\bSSM|Harpoon|Exocet|Styx|Termit|P-15|P-270|Moskit|P-700|Granit|P-800|Oniks|Yakhont|BrahMos|\bYJ-\d|C-80\d|\bSY-\d|\bHY-\d|Hsiung Feng|\bHF-\d|\bNSM\b|RBS[- ]?15|Otomat|Penguin|Kormoran|Gabriel|Sea Eagle|Kh-35|LRASM|Silkworm|Kh-22|P-500|Bazalt|P-1000|Vulkan|P-35\b|P-6\b/i.test(nm)) return "ashm";
        if (/Hellfire|AGM-|Maverick|Brimstone|Vikhr|Ataka|Shturm|\bAS\.\d|\bKh-\d|Mokopa|AKD-\d|air-to-surface|laser-guided missile|stand-off/i.test(nm)) return "asm";
        if (/Javelin|FGM-148|Spike|NLAW|HJ-12|Eryx|\bMMP\b|Bulsae-3|fire-and-forget/i.test(nm)) return "atgm_soft";
        if (/anti-tank|ATGM|wire-guided|SACLOS|MCLOS|beam-riding|\bTOW\b|\bHOT\b|MILAN|Milan|Malyutka|Konkurs|Kornet|Fagot|Falanga|Swingfire|\bSS\.1[01]\b|\bHJ-(?:73|8|9)\b/.test(nm)) return "atgm";
        if (w.profile === "ballistic") return "ballistic";
        if (w.profile === "cruise") return "cruise";
        if (w.profile === "skim") return "ashm";
        return "atgm";
      case "arc":
        if (/mortar/i.test(nm) || (bore <= 120 && (w.speed || 0) <= 190)) return "mortar";
        return "howitzer";
      default: break;
    }
    /* guns and small arms */
    if (/recoilless|Carl Gust|\bRCL\b/i.test(nm)) return "recoilless";
    if (/grenade launcher|\bGMG\b|\bAGL\b|AGS-\d|\bMk ?19\b|\bMk ?47\b|QLZ/i.test(nm) && calOf(nm) >= 30 && calOf(nm) <= 40) return "gl";
    if (rpm >= 2500 || /rotary cannon|gatling|minigun|CIWS|six-barrel/i.test(nm)) return "rotary";
    if (rpm > 0 && (p === "missile" || p === "bomb" || (w.burstDelay && w.burstDelay < 0.06))) return "revolver";
    if (p === "missile" || p === "bomb") return bore < 16 ? "rotary" : "revolver";     // a gun fired as a "missile": one call is one burst
    if (bore < 9.6) {
      var cm = /(\d+(?:[.,]\d+)?)[x×](\d+)/.exec(nm);
      if (/SMG|sub-?machine|machine pistol|pistol|PPSh|PPS-|\bUzi|Sten\b|Thompson|MP ?40|MP ?5\b|Sterling/i.test(nm) ||
          (cm && num(cm[2]) <= 33 && num(cm[1]) <= 11.5)) return "pistol";
      return ((w.burst || 1) >= 4) ? "mg" : "rifle";
    }
    if (bore < 16) return "hmg";
    if (bore < 60) return "autocannon";
    /* a direct-fire round (kinetic, HEAT, HESH) is a tank or anti-tank gun;
       HE and proximity rounds out of a big bore are a ship's or a coastal
       battery's, or a dual-purpose mount's */
    if (/cannon|heat|bullet/.test(w.warhead || "") && !/\d(?:mm|in)\/\d\d|naval|coastal|Mk ?4[25]\b/i.test(nm)) return "tank";
    return "naval";
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
    /* one fingerprint per weapon row, matched by the row itself. Not by id:
       generations.js derives rows from a template and keeps its id, so
       "atgm_inf" is a Javelin, a Kornet and an HJ-12, which launch nothing
       alike. Not by name either: many rows carry no id, and "30mm GSh-30-2"
       is both a 14-round burst and a 2-round strafing pass, which need
       their own burst lengths and their own rate limits */
    var S = specMap ? specMap.get(w) : null;
    if (S) return S;
    var id = w.id || w.name || "?", key = id + "|" + (w.name || "");
    if (!specMap && specCache[key]) return specCache[key];
    S = buildSpec(w, id);
    S.key = key + "#" + (++specN);
    if (specMap) specMap.set(w, S); else specCache[key] = S;
    return S;
  }

  /* FAMILY TABLE. Per family, relative to the bore-scaled base:
       T    blast positive-phase duration, ms per mm of bore. Blast waves
            scale with the cube root of charge energy (Hopkinson-Cranz), and
            the cube root of the propellant charge runs close to linear in
            bore (5.56 mm: 1.7 g, 120 mm: 8.5 kg - a ratio of 17 in cube
            root against 22 in bore), so the pulse length goes with bore:
            0.09 ms/mm puts a 5.56 at 0.5 ms and a 120 mm at 11 ms, the order
            of what small arms show at a few metres and big guns at tens.
            A Friedlander wave's spectrum peaks at 1/(2 pi T) and falls
            6 dB an octave above it: the rifle's centres near 300 Hz and
            still snaps. The tank gun's would centre near 15 Hz - felt, not
            heard, and not reproduced at all by the laptops and headphones
            this is played on: a first cut spent a third of a 155 mm's
            energy below 30 Hz and lost 5-7 dB of its audible 30-150 Hz
            weight. So the pulse stops growing at 4.2 ms (peak 38 Hz) and
            the size of a big gun is carried by its boom (bm), a noise band
            at 60-240 Hz by bore, which is where a listener hears it.
       cD   ballistic crack N-wave length, ms: 0.2 ms for a rifle bullet,
            about 1 ms for a tank round's bow shock (it grows with the body's
            diameter); ck how much of it - a pistol round barely makes one
            (7.62x25 is only just supersonic, 9 mm often is not), a mortar
            bomb and a grenade none
       bf   body band centre, Hz - the turbulent propellant gas leaving the
            muzzle; bq its Q; bd seconds for it to die away
       bm   boom: the low, noisy bulk of a big charge (0 = none); bmd its time
       cf   mechanism ring, Hz (breech, links, feed tray); rg its level
       tl   outdoor tail, seconds to silence: reflections off terrain, tree
            lines and buildings; ta its level against the blast; tf its
            starting brightness, Hz
       ec   discrete echoes coming back (big guns)
       tube a mortar's or grenade launcher's quarter-wave note, Hz (0: from
            the bore - 63 Hz for an 81 mm)
       lv   loudness trim against HEAD's mix, measured per family. Small
            arms' crack (ck) sits above 1: at 0.85 the first 20 ms had 3-4 dB
            less above 8 kHz than HEAD's report */
  var FAM = {
    pistol:     { T: 0.070, cD: 0.15, ck: 0.30, bf: 1400, bq: 0.9, bd: 0.12, bm: 0,    bmd: 0,    cf: 0,    rg: 0,    tl: 0.70, ta: 0.045, tf: 2400, ec: 0, lv: 0.80 },
    rifle:      { T: 0.090, cD: 0.20, ck: 1.90, bf: 1700, bq: 0.8, bd: 0.15, bm: 0,    bmd: 0,    cf: 0,    rg: 0,    tl: 0.90, ta: 0.055, tf: 2800, ec: 0, lv: 0.88 },
    mg:         { T: 0.095, cD: 0.24, ck: 1.25, bf: 1450, bq: 0.8, bd: 0.16, bm: 0,    bmd: 0,    cf: 0,    rg: 0,    tl: 0.90, ta: 0.055, tf: 2600, ec: 0, lv: 0.75 },
    hmg:        { T: 0.090, cD: 0.36, ck: 1.40, bf: 850,  bq: 0.8, bd: 0.22, bm: 0.35, bmd: 0.18, cf: 0,    rg: 0,    tl: 1.10, ta: 0.060, tf: 2000, ec: 0, lv: 0.57 },
    autocannon: { T: 0.085, cD: 0.55, ck: 0.70, bf: 700,  bq: 0.9, bd: 0.30, bm: 0.55, bmd: 0.30, cf: 2300, rg: 0.45, tl: 1.30, ta: 0.065, tf: 1600, ec: 0, lv: 0.40 },
    gl:         { T: 0.080, cD: 0,    ck: 0,    bf: 420,  bq: 1.6, bd: 0.22, bm: 0.30, bmd: 0.20, cf: 1400, rg: 0.25, tl: 0.80, ta: 0.050, tf: 1000, ec: 0, lv: 1.00, tube: 190 },
    tank:       { T: 0.090, cD: 1.00, ck: 0.55, bf: 480,  bq: 0.7, bd: 0.50, bm: 1.15, bmd: 0.90, cf: 0,    rg: 0,    tl: 2.60, ta: 0.090, tf: 900,  ec: 2, lv: 0.86 },
    recoilless: { T: 0.085, cD: 0.80, ck: 0.80, bf: 650,  bq: 0.7, bd: 0.40, bm: 0.80, bmd: 0.70, cf: 0,    rg: 0,    tl: 2.00, ta: 0.080, tf: 1100, ec: 1, lv: 1.00 },
    naval:      { T: 0.090, cD: 0.90, ck: 0.50, bf: 440,  bq: 0.7, bd: 0.55, bm: 2.40, bmd: 1.00, cf: 1700, rg: 0.12, tl: 2.80, ta: 0.110, tf: 800,  ec: 2, lv: 0.56 },
    howitzer:   { T: 0.095, cD: 1.10, ck: 0.45, bf: 380,  bq: 0.7, bd: 0.60, bm: 2.30, bmd: 1.10, cf: 0,    rg: 0,    tl: 3.20, ta: 0.110, tf: 700,  ec: 2, lv: 0.64 },
    mortar:     { T: 0.055, cD: 0,    ck: 0,    bf: 0,    bq: 3.0, bd: 0.28, bm: 0.80, bmd: 0.50, cf: 0,    rg: 0,    tl: 1.40, ta: 0.060, tf: 600,  ec: 1, lv: 1.00, tube: 0 },
  };

  function buildSpec(w, id) {
    var bore = boreOf(w);
    var kind = kindOf(w);
    var nm   = String(w.name || "");
    var fam  = famOf(w, kind, bore, nm);
    var dmg  = Math.max(1, w.dmg || 10);
    var wh   = w.warhead || "he";

    /* HEAD's fingerprint, kept as the defaults: body frequency from bore (a
       small bore is a high snap, a large one a low bark), tail length,
       loudness from bore then payload, crack, thump and ring. Each family
       below replaces what it models; describe() reports the result. */
    var f0 = clamp(760 * Math.pow(20 / bore, 0.62), 90, 1900);
    var tail = 0.035 + 1.15 * Math.pow(bore / 200, 0.9);
    var level = clamp(0.10 + 0.55 * Math.pow(bore / 150, 0.55) +
                      0.22 * Math.pow(Math.min(dmg, 400) / 300, 0.7), 0.08, 1.0);
    var crack = clamp(1.10 - bore / 140, 0.18, 1.0);
    var thump = clamp(Math.pow(bore / 160, 0.9), 0.02, 1.15);
    var ring = (wh === "flak") ? 0.55 : (fam === "autocannon") ? 0.45 : (fam === "mg" || fam === "rifle") ? 0.18 : 0.06;
    var refM = 90 + 3.2 * bore;

    var S = {
      id: id, key: id, bore: bore, kind: kind, fam: fam, warhead: wh, dmg: dmg,
      f0: f0, tail: tail, level: level, crack: crack, thump: thump, ring: ring, refM: refM,
      gap: kind === "mg" ? 0.022 : 0.030,
    };

    var F = FAM[fam];
    if (F) {
      /* ---- a gun: crack, blast, body, mechanism, outdoor tail ---- */
      /* the pulse is capped at 4.2 ms, spectral peak 38 Hz: see T above */
      S.T   = clamp(F.T * bore, 0.3, 4.2) / 1000;
      S.cD  = F.cD / 1000 * (fam === "hmg" ? bore / 12.7 : 1);
      S.crack = F.ck;
      S.f0  = F.bf * Math.pow((fam === "tank" || fam === "naval" || fam === "howitzer") ? 105 / bore : 1, 0.45);
      S.bq  = F.bq; S.bd = F.bd * (fam === "autocannon" ? Math.pow(bore / 30, 0.5) : 1);
      S.bm  = F.bm; S.bmd = F.bmd * Math.pow(clamp(bore / 100, 0.3, 2.1), 0.3);
      S.fm  = clamp(260 * Math.pow(12.7 / bore, 0.45), 60, 240);
      S.sub = bore >= 57 || fam === "mortar";
      S.cf  = F.cf; S.ring = F.rg * (wh === "flak" ? 1.2 : 1);
      S.tail = F.tl * Math.pow(clamp(bore / 100, 0.5, 2.1), (fam === "tank" || fam === "naval" || fam === "howitzer") ? 0.35 : 0);
      S.ta  = F.ta; S.tf = F.tf; S.ec = F.ec;
      S.tube = F.tube === 0 ? clamp(46 * Math.pow(120 / bore, 0.8), 40, 150) : (F.tube || 0);
      if (!F.bf) S.f0 = S.tube * 3;
      /* the blast is the report's reference level; its size is in S.level,
         from the bore alone: a report is as loud as its charge, and the
         game's damage figure is not the charge (the 105 mm M102 does 300 a
         round, the PzH 2000's 155 mm 158). describe() reports the boom as
         the thump, the mechanism as the ring */
      S.thump = F.bm;
      S.level = clamp(0.12 + 0.62 * Math.pow(bore / 150, 0.6), 0.08, 1.0) * F.lv;
      /* between big guns the charge grows with the cube of the bore and the
         blast's overpressure at a given range with its cube root, to a power
         a little over one: a 125 mm is 5-6 dB over a 76 mm, as HEAD had them,
         not the 1.7 dB the curve above gives. Above 120 mm the curve flattens
         again: what a 203 mm has over a 155 mm lives below 150 Hz, and a mix
         bus can only give it to the limiter (at the steeper slope one 203 mm
         shot took 4-5 dB of gain reduction off everything else) */
      if (fam === "tank" || fam === "naval" || fam === "howitzer") S.level *= Math.pow(bore / 120, bore < 120 ? 0.75 : 0.3);
      /* the anti-materiel rifle: one round, the heaviest crack a man carries */
      if (fam === "hmg" && (w.burst || 1) === 1) {
        /* ...and its muzzle brake throws the blast sideways: a Barrett's
           report is notorious, well above an M2's through the same round */
        S.crack = 1.45; S.tail *= 1.2; S.level *= 1.45;
      }
      /* the voice is held until the report is 60 dB under its peak, near
         or far (check_sound_weapons.js holds it to that). Small arms fire
         hundreds of rounds a minute, so theirs is kept short: 0.57 s for a
         rifle with the voice table's margin, against HEAD's 0.50 */
      S.dur = 0.06 + S.tail * (bore < 16 ? 0.29 : bore < 60 ? 0.35 : 0.58);
    } else if (fam === "rotary" || fam === "revolver") {
      /* ---- one report per BURST ---- */
      var rpm = rpmOf(nm) || (fam === "rotary" ? (bore < 16 ? 4000 : 4500) : 1200);
      S.rpm = rpm;
      /* the report lasts the game's burst - its rounds' span, in GAME
         seconds, which the clock turns into real ones (see gameRate) - and
         a little over, so a round the frame loop delivers late still falls
         inside it. The rounds land on simulation ticks: game.js runs a
         deferred round on the first tick at or after its time, so at 30 Hz a
         burstDelay of 0.045 s is two ticks, 0.067 s, and a GAU-8's 14 rounds
         take 0.87 s, not 0.59. A burst-of-one row is one fixed burst a call. */
      var tick = (typeof CFG !== "undefined" && CFG.DT > 0) ? CFG.DT : 1 / 30;
      var step = Math.ceil((w.burstDelay || 0.1) / tick - 1e-6) * tick;
      S.span = (w.burst || 1) > 1 ? Math.min(1.1, (w.burst - 1) * step) : 0;
      S.over = S.span ? 0.12 : kind === "ciws" ? 0.5 : 0.55;
      S.blen = S.span + S.over;
      S.burst = true;
      S.T = clamp(0.085 * bore, 0.5, 3.2) / 1000;
      S.f0 = clamp(3800 * Math.pow(12.7 / bore, 0.6), 1200, 5000);
      S.tail = 0.45 + bore * 0.012;
      S.level = clamp(0.30 + bore * 0.006, 0.3, 0.55) * (kind === "ciws" ? 0.8 : 1);
      /* HEAD's carry for the calibre: a burst is louder than a round
         because it is more rounds, not because it carries further */
      S.refM = 90 + 3.2 * bore;
      S.dur = S.blen + S.tail;
      /* for describe(): no crack layer, the weight band is the thump */
      S.crack = 0; S.thump = 1.2; S.ring = 0;
    } else if (MIS[fam]) {
      /* ---- a motor: the family's row, adjusted for how this one leaves ---- */
      var M = {}, k2;
      for (k2 in MIS[fam]) M[k2] = MIS[fam][k2];
      /* an SLBM is blown out of its tube by gas under water and lights at the
         breach, 1.05 s later in combat.js's own timing */
      if (w.coldLaunch) { M.ej = 1.0; M.ejT = 12; M.gap = 1.05; M.wet = true; }
      /* anti-ship rounds that cruise on a turbojet once the booster drops */
      if (fam === "ashm" && /Harpoon|NSM|RBS[- ]?15|Kh-35|Uran|YJ-8[23]|C-80[23]|LRASM|Hsiung Feng II\b|Granit|Otomat|Sea Eagle|Block 3/i.test(nm)) M.jet = 0.8;
      /* an air-launched cruise missile falls clear and starts its engine: no booster */
      if (fam === "cruise" && (w.proj === "bomb" || /ALCM|AGM-86|Kh-55|Kh-101|\bKD-\d|Storm Shadow|SCALP|Taurus|JASSM/i.test(nm))) { M.ig = 0.15; M.bst = 0.25; M.ck = 0.1; M.rum = 0.25; }
      S.mis = M;
      /* for describe(): the crackle and the rumble */
      S.crack = M.ck; S.thump = M.rum; S.ring = 0;
      S.msize = clamp(0.55 + dmg / 500, 0.55, 1.7);
      S.level = fam === "decoy" ? 0.30 : level * (kind === "rocket" ? 0.70 : 0.62);
      S.refM = 260 + Math.min(dmg, 900) * 0.9;
      S.dur = (M.gap || 0) + M.bst + M.sus * 1.4 + 0.1;
    } else {
      /* ---- what goes into water, and what falls ---- */
      S.level = kind === "bomb" ? level * 0.10 : level * 0.55;
      S.refM = kind === "bomb" ? 200 : 300;
      S.dur = kind === "bomb" ? 0.75 : kind === "depth" ? 0.6 : 1.3;
      S.crack = 0; S.thump = 0; S.ring = 0;
    }
    return S;
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
     A report is built from what a microphone at the gun actually records,
     layer by layer, each scaled by the weapon's own fingerprint:
       the BLAST WAVE  - the muzzle's pressure pulse, a Friedlander wave whose
                         length grows with bore: 0.5 ms for a rifle (a snap),
                         4 ms for a tank gun (a punch - longer would be
                         infrasound); played from one shared table, so it
                         costs two nodes whatever the calibre
       the CRACK       - the supersonic projectile's N-wave: 0.2 ms for a
                         rifle bullet, about 1 ms for a tank round
       the BODY        - turbulent propellant gas leaving the muzzle, noise
       the BOOM        - a big charge's low bulk, a noise band 60-240 Hz by
                         bore: where a listener hears a big gun's size
       the MECHANISM   - breech, links, feed tray: autocannon only
       the TAIL        - the report coming back off terrain and tree lines,
                         and for big guns discrete echoes: the "roll"
     Distance is honest: the crack dies first (it is the highest and the
     most directional), the blast wave stretches (a weak shock lengthens as it
     travels), the tail takes over, and the spatial chain's air absorption
     does the rest - a 155 mm across the map is a low thud and a long roll.
     Motors (missiles, rockets) and water (torpedoes, depth charges) have
     their own builders below. */

  /* ------------------------------------------ shared pressure waveforms --
     Computed once per context and shared like the noise buffer. A report
     plays each at the rate that gives the length it needs. */
  var shapeCache = (typeof WeakMap !== "undefined") ? new WeakMap() : null;
  var BLAST_T = 0.002, NWAVE_D = 0.001;          // reference lengths of the stored shapes
  function shapeBuf(ac, name) {
    var c = shapeCache ? shapeCache.get(ac) : ac.__shapes;
    if (!c) { c = {}; if (shapeCache) shapeCache.set(ac, c); else ac.__shapes = c; }
    if (c[name]) return c[name];
    var sr = ac.sampleRate, n, b, d, i, x, r;
    if (name === "blast") {
      /* Friedlander, p = (1 - t/T) e^(-t/T). With the decay constant at 1
         the positive and negative impulses cancel, as they do in the far
         field, so a pulse leaves no DC for the limiter to sit on. */
      n = Math.ceil(sr * BLAST_T * 16);
      b = ac.createBuffer(1, n, sr); d = b.getChannelData(0);
      for (i = 0; i < n; i++) { x = i / (sr * BLAST_T); d[i] = (1 - x) * Math.exp(-x); }
    } else if (name === "echo") {
      /* the same wave come back off a tree line: its shock front rounded
         off by the trip (a triangular smoothing half a length wide - two
         running means, so it costs O(n)), so an echo thuds instead of
         clicking; still zero-mean */
      var src0 = shapeBuf(ac, "blast").getChannelData(0), L0 = src0.length;
      var h = Math.max(1, Math.round(sr * BLAST_T * 0.25)), acc = 0;
      n = L0 + 2 * h; b = ac.createBuffer(1, n, sr); d = b.getChannelData(0);
      var tmp = new Float32Array(n);
      for (i = 0; i < n; i++) {
        acc += (i < L0 ? src0[i] : 0) - (i >= h && i - h < L0 ? src0[i - h] : 0);
        tmp[i] = acc / h;
      }
      acc = 0;
      for (i = 0; i < n; i++) { acc += tmp[i] - (i >= h ? tmp[i - h] : 0); d[i] = acc / h; }
    } else if (name === "nwave") {
      /* instant compression, linear fall through zero, instant return; the
         ground reflection follows 2.5 lengths later at half strength */
      var L = Math.max(4, Math.round(sr * NWAVE_D));
      n = L * 5; b = ac.createBuffer(1, n, sr); d = b.getChannelData(0);
      for (i = 0; i < L; i++) { x = 1 - 2 * i / (L - 1); d[i] += x; d[i + Math.round(L * 2.5)] += 0.5 * x; }
    } else if (name === "rot" || name === "rev" || name === "cell") {
      /* A burst: rounds at a reference rate, each a small blast wave plus a
         puff of muzzle gas. "rot" is seven barrels at 70 Hz and loops as a
         whole - no two barrels quite alike, which is the growl under a
         GAU-8. "rev" is a revolver's four chambers at 25 Hz. "cell" is one
         round and silence, looped at whatever length the rate asks, for guns
         slow enough to be heard round by round. */
      var hz = name === "rot" ? 70 : name === "rev" ? 25 : 4, k = name === "cell" ? 1 : name === "rot" ? 7 : 4;
      var P = Math.round(sr / hz), T = sr * (name === "rot" ? 0.0011 : 0.0024), tau = sr * (name === "rot" ? 0.005 : 0.009);
      n = P * k; b = ac.createBuffer(1, n, sr); d = b.getChannelData(0);
      var span = Math.min(n, Math.round(Math.max(T * 12, tau * 7)));
      /* one round's pulse and its gas envelope, computed once */
      var bk = new Float32Array(span), ek = new Float32Array(span);
      for (i = 0; i < span; i++) { x = i / T; bk[i] = (1 - x) * Math.exp(-x); ek[i] = 0.5 * Math.exp(-i / tau); }
      /* between a rotary's rounds the gas never stops: a floor under the train */
      if (name === "rot") for (i = 0; i < n; i++) d[i] = 0.16 * (Math.random() * 2 - 1);
      for (r = 0; r < k; r++) {
        var A = k > 1 ? 0.78 + 0.22 * Math.random() : 1, off = r * P + (k > 1 ? Math.round((Math.random() - 0.5) * P * 0.05) : 0);
        for (i = 0; i < span; i++) d[(off + i + n) % n] += A * (bk[i] + (Math.random() * 2 - 1) * ek[i]);
      }
    } else if (name === "crackle") {
      /* The crackle of a big solid motor: shock-steepened spikes in the jet
         noise, compressions only, arriving at random - positively skewed,
         which is why a Grad salvo rips and a hiss does not. 1 s, looped. */
      /* the hiss under the spikes is the shared noise buffer's, not a
         second 72,000 calls to Math.random */
      n = Math.floor(sr * 1.0); b = ac.createBuffer(1, n, sr); d = b.getChannelData(0);
      var nz = noiseBuf(ac).getChannelData(0), tauC = sr * 0.00015, mean = 0, t = 0, kc = new Float32Array(40);
      for (i = 0; i < 40; i++) kc[i] = Math.exp(-i / tauC);
      for (i = 0; i < n; i++) { d[i] = 0.26 * nz[i]; mean += d[i]; }
      while (true) {
        t += -Math.log(1 - Math.random()) * sr / 700;
        if (t >= n) break;
        var a = -Math.log(1 - Math.random()) * 0.7, s0 = Math.floor(t);
        for (i = 0; i < 40 && s0 + i < n; i++) { d[s0 + i] += a * kc[i]; mean += a * kc[i]; }
      }
      mean /= n;
      for (i = 0; i < n; i++) d[i] -= mean;
    }
    c[name] = b;
    return b;
  }
  /* Built on first use, like the noise buffer. After a session's first
     report the rest are built one per turn of the event loop, 40 ms apart,
     so the first missile or rotary burst does not pay for its table in the
     middle of a frame (the crackle alone is several milliseconds cold) */
  var warmQ = null;
  function warmTables(ac) {
    if (warmQ) return;
    warmQ = ["echo", "rot", "rev", "cell", "crackle"];
    var next = function () {
      var nm = warmQ.shift();
      if (!nm) return;
      try { shapeBuf(ac, nm); } catch (e) {}
      try { setTimeout(next, 40); } catch (e) {}
    };
    try { setTimeout(next, 40); } catch (e) {}
  }
  function shapeSrc(ac, name, rate) {
    var s = ac.createBufferSource();
    s.buffer = shapeBuf(ac, name);
    s.playbackRate.value = clamp(rate, 0.02, 64);
    return s;
  }
  /* one pressure pulse into out: a buffer source and its gain, no automation */
  function pulse(ac, out, t, name, rate, amp) {
    var s = shapeSrc(ac, name, rate), g = gainNode(ac, amp);
    s.connect(g); g.connect(out);
    s.start(t);
    return s;
  }

  /* a noise band's RMS scales with the square root of its bandwidth; these
     turn a target level into a gain whatever the band, so a layer keeps its
     place in the report when its filter moves */
  function nbBand(ac, f, q) { return 2 * Math.sqrt(q * ac.sampleRate * 0.5 / Math.max(40, f)); }
  function nbLow(ac, f) { return 2 * Math.sqrt(ac.sampleRate * 0.5 / Math.max(40, f)); }

  /* attack, then an exponential decay of 80 dB over dec, relative to the
     layer's own peak (and on at that slope, rather than parking on a floor
     until the source stops). The shared burst() decays to an absolute 1e-5,
     so a quiet layer - any report heard from far off - lost fewer dB in the
     same time than a loud one: distance slowed the decay, and far tails
     outlived their voices */
  function env(par, t0, atk, dec, peak) {
    peak = Math.max(peak, 0.00002);
    var a = Math.max(0.0004, atk);
    par.setValueAtTime(peak * 0.0001, t0);
    par.linearRampToValueAtTime(peak, t0 + a);
    par.exponentialRampToValueAtTime(peak * 0.00001, t0 + a + dec * 1.25);
  }

  /* level of each layer against S.level: set by measurement so each family
     sits in the mix where HEAD's did (see the comparison with the commit) */
  var KG = { blast: 0.95, crack: 0.62, body: 0.20, boom: 0.26, tail: 1.0, tube: 6.0, clank: 0.55, echo: 0.42 };

  function emitGun(ac, out, t0, S, sp) {
    var far = sp.far, cut = sp.cut;
    var lvl = S.level * sp.gain * vary(0.10);
    /* a big charge's report goes out through a subsonic filter, 12 dB/oct
       below 38 Hz (where BS.1770 stops counting loudness too): under it the
       pulse, the boom and the late tail would spend headroom on nothing a
       speaker plays */
    if (S.sub) { var hs = hpf(ac, 38); hs.connect(out); out = hs; }

    /* 1. BLAST WAVE, stretching with distance - to 5.5 ms at most, since
          below ~29 Hz a longer one is headroom, not sound */
    var T = Math.min(0.0055, S.T * vary(0.08) * (1 + 1.4 * far));
    var pb = lvl * KG.blast;
    var sB = pulse(ac, out, t0, "blast", BLAST_T / T, pb * (1 - 0.5 * far) * (S.tube ? 0.45 : 1));
    if (S.tube) {
      /* a mortar or grenade tube is a pipe closed at one end: it rings at
         its quarter-wave note (an 81 mm tube 1.3 m long: 343 / 5.2 = 66 Hz;
         the body band sits on the third partial) for some 50 ms, and a
         low-velocity round leaves a soft pulse - hollow, not sharp. At Q 4.5
         the ring was over in 20 ms and made no difference to the sound */
      var bt = bp(ac, S.tube * vary(0.05), 10), gt = gainNode(ac, lvl * KG.tube);
      sB.connect(bt); bt.connect(gt); gt.connect(out);
    }

    /* 2. CRACK - the first thing distance takes */
    var ck = S.crack * (1 - 1.25 * far);
    if (ck > 0.04 && S.cD > 0 && cut > 2500)
      pulse(ac, out, t0, "nwave", NWAVE_D / (S.cD * vary(0.12)), lvl * ck * KG.crack);

    /* 3. BODY - the gas jet; 4. BOOM - the low bulk of a big charge;
       5. MECHANISM; 6. TAIL - all off one noise source */
    var n = noiseSrc(ac, 1);
    /* gains are normalised at the NEAR band, so when distance pulls a filter
       down the energy above it really is gone, as absorption takes it. The
       ground takes more: over grass at a grazing angle the 200-800 Hz band
       is the one that dips, so a far gun keeps its boom and loses its bark */
    var f0 = S.f0 * vary(0.07), fb = clamp(f0 * (1 - 0.45 * far), 60, Math.max(90, cut * 0.8));
    var bb = bp(ac, fb, S.bq), gb = gainNode(ac, 0);
    env(gb.gain, t0, 0.0006, S.bd * (1 + 0.8 * far), pb * KG.body * nbBand(ac, f0, S.bq) * (1 - 0.75 * far));
    n.connect(bb); bb.connect(gb); gb.connect(out);
    if (S.bm) {
      /* a noise band, not a pitched thump: lowpassed at 12 dB/oct with a
         little resonance, centred by bore (240 Hz for a 12.7 mm, 94 Hz for
         a 120 mm) and sinking as it dies */
      var fm = S.fm * vary(0.08), dm = S.bmd * (1 + 0.3 * far), lm = lpf(ac, fm, 3), gm = gainNode(ac, 0);
      ramp(lm.frequency, t0, fm, fm * 0.55, dm);
      env(gm.gain, t0 + 0.002, 0.004 + 0.03 * far, dm, pb * S.bm * KG.boom * nbLow(ac, fm));
      n.connect(lm); lm.connect(gm); gm.connect(out);
    }
    if (S.ring > 0.05 && S.cf && far < 0.6 && cut > S.cf) {
      var bc = bp(ac, S.cf * vary(0.05), 8), gc = gainNode(ac, 0);
      env(gc.gain, t0 + 0.005, 0.0008, 0.08 + 0.10 * S.ring, lvl * S.ring * KG.clank * nbBand(ac, S.cf, 8) * (1 - far));
      n.connect(bc); bc.connect(gc); gc.connect(out);
    }
    /* the tail darkens as it dies, and is longer and relatively louder with
       distance - which is what makes a far gun read as far. Small arms' and
       autocannon's grow less: they fire hundreds of rounds a minute and
       their voices are held briefly (see buildSpec) */
    var tl = S.tail * vary(0.10) * (1 + (S.bore < 20 ? 0.1 : S.bore < 60 ? 0.2 : 0.6) * far), t5 = t0 + 0.008 + 0.03 * far;
    var tf = Math.min(cut, S.tf * (1 - 0.55 * far));
    var lt = lpf(ac, tf, 0.6), gl = gainNode(ac, 0);
    ramp(lt.frequency, t5, tf, Math.max(S.bore >= 60 ? 90 : 55, S.tf * 0.07), tl * 0.7);
    env(gl.gain, t5, 0.015 + 0.05 * far + tl * 0.02, tl, pb * S.ta * KG.tail * nbLow(ac, S.tf) * (1 + (S.bore >= 20 ? 0.3 : -0.4) * far));
    n.connect(lt); lt.connect(gl); gl.connect(out);
    startNoise(n, t0, tl + 0.05);

    /* 7. ECHOES - big guns: the report returning from tree lines and hills,
          each later, softer and longer, its front rounded off by the trip */
    for (var e = 0; e < S.ec; e++)
      pulse(ac, out, t0 + (0.21 + 0.37 * e) * vary(0.2) + far * 0.05, "echo",
            BLAST_T / Math.min(0.0065, T * (1.6 + 1.0 * e)), pb * KG.echo * (0.30 - 0.10 * e) * (1 + 0.3 * far));
  }

  /* MORTARS: the hollow tube note is emitGun's tube layer; this only keeps
     the name the dispatch has always used for indirect fire */
  function emitArc(ac, out, t0, S, sp) { emitGun(ac, out, t0, S, sp); }

  /* ---------------------------------------------------------- bursts ----
     ROTARY AND FAST AIRCRAFT CANNON. A GAU-8 at 3900 rpm puts a round out
     every 15 ms; the reports fuse into one tearing tone at 65 Hz, the
     "BRRRT", which a train of separate gun reports cannot be (it clicks). So
     one call is the whole burst: a looped train of rounds at the true rate,
     spun up from 62 % over the first 0.12 s as a driven gun is, with the
     burst's own echo building under it. Slower guns (an M230 at 625 rpm)
     loop a single round at their own interval and are heard round by round.
     A gun that is still firing when its report ends - an AC-130's Vulcan
     battery never stops, a veteran A-10's passes run into each other - goes
     straight on in a new report without spinning up again (admitShot). */
  function emitBurst(ac, out, t0, S, sp) {
    var far = sp.far, cut = sp.cut, ts = sp.ts || 1;
    var lvl = S.level * sp.gain * vary(0.08);
    /* as long as the game's burst, on the game's clock */
    var len = Math.max(0.12, S.span * ts + S.over * (1 + 0.1 * rnd()));
    var hz = S.rpm / 60 * vary(0.02);
    var train = hz >= 42 ? "rot" : hz >= 17 ? "rev" : "cell";
    var src = ac.createBufferSource();
    src.buffer = shapeBuf(ac, train);
    src.loop = true;
    var rate = 1;
    if (train === "cell") { src.loopStart = 0; src.loopEnd = 1 / hz; }
    else rate = hz / (train === "rot" ? 70 : 25);
    var spin = train === "rot" && !sp.cont ? Math.min(0.12, len * 0.25) : 0;
    src.playbackRate.setValueAtTime(rate * (spin ? 0.62 : 1), t0);
    if (spin) src.playbackRate.linearRampToValueAtTime(rate, t0 + spin);

    var g = gainNode(ac, 0), pk = lvl * 0.46, atk = sp.cont ? 0.02 : 0.004;
    g.gain.setValueAtTime(0.00001, t0);
    g.gain.linearRampToValueAtTime(pk, t0 + atk);
    g.gain.setValueAtTime(pk, t0 + len - 0.025);
    g.gain.linearRampToValueAtTime(pk * 0.0001, t0 + len);
    /* the tearing top, darkened by distance */
    var lp = lpf(ac, Math.min(cut, S.f0 * (1 - 0.55 * far)), 0.7);
    src.connect(lp); lp.connect(g);
    /* the weight: the burst's own fundamental and its first harmonics -
       held, not raised, with distance, so the burst falls off as a round of
       the same calibre does */
    var lw = lpf(ac, clamp(hz * 2.6, 60, 420), 0.9), gw = gainNode(ac, 1.2);
    src.connect(lw); lw.connect(gw); gw.connect(g);
    g.connect(out);
    /* a burst opens on a round: a single-round loop starts at its onset, a
       barrel train anywhere in its cycle */
    var off = train === "cell" ? 0 : rnd() * src.buffer.duration;
    try { src.start(t0, off); } catch (e1) { src.start(t0); }
    src.stop(t0 + len + 0.02);

    /* the burst coming back: reverberation builds while it fires and
       outlasts it, darkening from the middle of the burst on */
    var tf = Math.min(cut, 1500 * (1 - 0.45 * far));
    var nt = noiseSrc(ac, 0.8), lt = lpf(ac, tf, 0.6), gt = gainNode(ac, 0);
    ramp(lt.frequency, t0 + len * 0.5, tf, 80, len * 0.5 + S.tail);
    gt.gain.setValueAtTime(0.00001, t0);
    gt.gain.linearRampToValueAtTime(lvl * 0.14 * (1 + 0.3 * far), t0 + len);
    gt.gain.exponentialRampToValueAtTime(lvl * 0.14e-4, t0 + len + S.tail * (1 + 0.5 * far));
    nt.connect(lt); lt.connect(gt); gt.connect(out);
    startNoise(nt, t0, len + S.tail * 1.5);

    /* the burst is registered only now that it has a voice, so a round
       refused one leaves the next round free to be heard */
    if (sp.bst) {
      var L = sp.bst.list;
      for (var i = L.length - 1; i >= 0; i--)
        if (Math.abs(L[i].x - sp.bst.x) + Math.abs(L[i].y - sp.bst.y) < 96) L.splice(i, 1);
      L.push({ x: sp.bst.x, y: sp.bst.y, last: t0 + S.span * ts + 0.07, end: t0 + len });
    }
  }

  function emitCiws(ac, out, t0, S, sp) { emitBurst(ac, out, t0, S, sp); }

  /* ----------------------------------------------------------- motors ----
     A launch is a motor, not a shock wave. What it sounds like depends on
     how it leaves the tube:
       soft / cold launch (Javelin, Stinger, S-300, an SLBM): a gas charge
         pops the round out, a beat of near silence, then the motor lights;
       hot launch (TOW's launch motor, Patriot, a rail-launched Hellfire):
         ignition at once;
     and then the motor itself: broadband roar whose centre falls with nozzle
     size (jet noise peaks near 0.2 x exhaust speed / nozzle diameter - a
     Stinger hisses, a Scud roars), with crackle - the shock-steepened
     spikes of a big solid motor - underneath. As the round leaves, the band
     slides DOWN (Doppler and air absorption both pull it there) and fades:
     the old builder swept it upward, which is the sound of an approach. A
     cruise missile's sustainer is a turbojet, heard as a whine that falls
     away; most anti-ship missiles are the same after the booster.
       ej/ejT   eject pop and its blast length (ms); gap before ignition (s)
       wet      the eject happens under water (an SLBM): heard through it
       bang     a launch charge like a gun's (RPG-7, disposable launchers)
       ig/igT   ignition thump, its length (ms)
       fB       roar band centre (Hz); bst booster seconds; sus fade seconds
       ck       crackle; rum low rumble; jet turbojet whine; hs 0 drops the
                departing hiss; lv level trim */
  var MIS = {
    atgm:      { ej: 0,   gap: 0,    ig: 0.80, igT: 3.5, fB: 1900, bst: 0.30, sus: 1.00, ck: 0.10, rum: 0.35, jet: 0, lv: 0.63 },
    atgm_soft: { ej: 1.3, ejT: 2.2, gap: 0.17, ig: 0.25, igT: 2.5, fB: 2300, bst: 0.28, sus: 0.85, ck: 0.10, rum: 0.25, jet: 0, lv: 0.60 },
    asm:       { ej: 0,   gap: 0,    ig: 0.45, igT: 3.0, fB: 1700, bst: 0.50, sus: 0.75, ck: 0.35, rum: 0.45, jet: 0, lv: 0.60 },
    aam:       { ej: 0,   gap: 0,    ig: 0.30, igT: 2.5, fB: 1800, bst: 0.40, sus: 0.55, ck: 0.35, rum: 0.35, jet: 0, lv: 0.60 },
    manpads:   { ej: 1.6, ejT: 1.8, gap: 0.22, ig: 0.35, igT: 2.0, fB: 2300, bst: 0.45, sus: 0.65, ck: 0.30, rum: 0.30, jet: 0, lv: 0.39 },
    sam:       { ej: 0,   gap: 0,    ig: 0.90, igT: 6.0, fB: 1150, bst: 0.95, sus: 0.90, ck: 0.65, rum: 0.80, jet: 0, lv: 0.60 },
    sam_cold:  { ej: 1.0, ejT: 7.0, gap: 0.38, ig: 0.60, igT: 6.0, fB: 1150, bst: 0.95, sus: 0.90, ck: 0.65, rum: 0.80, jet: 0, lv: 0.60 },
    ashm:      { ej: 0,   gap: 0,    ig: 0.90, igT: 7.0, fB: 1000, bst: 1.10, sus: 1.20, ck: 0.55, rum: 0.90, jet: 0, lv: 0.78 },
    cruise:    { ej: 0,   gap: 0,    ig: 0.80, igT: 7.0, fB: 1050, bst: 0.80, sus: 1.90, ck: 0.40, rum: 0.70, jet: 1.0, lv: 0.70 },
    ballistic: { ej: 0,   gap: 0,    ig: 1.00, igT: 10,  fB: 620,  bst: 2.00, sus: 1.10, ck: 1.00, rum: 1.20, jet: 0, lv: 0.78 },
    rpg:       { ej: 0,   gap: 0.07, bang: 1, ig: 0.30, igT: 2.0, fB: 2000, bst: 0.22, sus: 0.60, ck: 0.10, rum: 0.20, jet: 0, lv: 0.60 },
    mlrs:      { ej: 0,   gap: 0,    ig: 0.70, igT: 5.0, fB: 900,  bst: 0.55, sus: 0.55, ck: 0.85, rum: 0.90, jet: 0, lv: 0.54 },
    ffar:      { ej: 0,   gap: 0,    ig: 0.40, igT: 2.5, fB: 2200, bst: 0.28, sus: 0.35, ck: 0.40, rum: 0.30, jet: 0, lv: 0.60 },
    decoy:     { ej: 0.8, ejT: 3.0, gap: 0.05, ig: 0.10, igT: 1.5, fB: 3000, bst: 0.25, sus: 0.40, ck: 0.10, rum: 0,     jet: 0, hs: 0, lv: 0.35 },
  };
  var KM = { ej: 0.9, ig: 0.8, roar: 0.75, hiss: 0.10, rum: 0.80, jet: 0.08, gas: 0.11, wash: 0.5 };

  function emitMissile(ac, out, t0, S, sp) {
    var M = S.mis || MIS.atgm, far = sp.far, cut = sp.cut;
    var lvl = S.level * sp.gain * vary(0.10) * M.lv;
    var size = S.msize || 1;                          // motor size, 0.6 (Stinger) .. 1.6 (Scud)
    /* an SLBM breaks the surface when the game says (combat.js's WET, in
       game seconds); every other gap is the round's own */
    var ti = t0 + (M.wet ? M.gap * (sp.ts || 1) : (M.gap || 0) * vary(0.15));
    var bst = M.bst * vary(0.08), sus = M.sus * vary(0.1) * (1 + 0.4 * far);
    /* far off, the ground and the air take the top of a motor's roar as
       they take a gun's bark, and a jet radiates its highs aft, not to the
       side: a distant launch is a low rush with a soft onset */
    var dull = 1 - 0.4 * far;

    /* 1. eject charge, or a gun-like launch charge */
    if (M.ej) {
      var sE = shapeSrc(ac, "blast", BLAST_T / (M.ejT / 1000 * vary(0.1) * (1 + far)));
      var gE = gainNode(ac, lvl * M.ej * KM.ej * (M.wet ? 1.6 : 1) * (1 - 0.6 * far));
      if (M.wet) {
        var lE = lpf(ac, 220, 0.8);
        sE.connect(lE); lE.connect(gE);
      } else sE.connect(gE);
      gE.connect(out); sE.start(t0);
    }
    if (M.bang) {
      pulse(ac, out, t0, "blast", BLAST_T / (0.0035 * (1 + far)), lvl * 1.1 * (1 - 0.5 * far));
      if (far < 0.6 && cut > 2500) pulse(ac, out, t0, "nwave", NWAVE_D / 0.0005, lvl * 0.45 * (1 - far));
    }

    /* 2. ignition */
    if (M.ig) pulse(ac, out, ti, "blast", BLAST_T / (M.igT / 1000 * vary(0.1) * (1 + 1.5 * far)), lvl * M.ig * KM.ig * (1 - 0.8 * far));

    /* 3. the roar: a broad band that falls as the round leaves - most of
          the way by burnout, when it is already doing Mach 1-2 away from
          the launcher (Doppler alone puts a round receding at 300 m/s at
          c / (c + v) = 0.53 of its pitch), the rest as it goes */
    var fB = M.fB * vary(0.06) * dull, rise = 0.03 + 0.05 * size + (M === MIS.ballistic ? 0.25 : 0);
    var n = noiseSrc(ac, 1);
    var br = bp(ac, 1, 0.55);
    br.frequency.setValueAtTime(Math.min(cut, fB * 0.8), ti);
    br.frequency.linearRampToValueAtTime(Math.min(cut, fB), ti + rise);
    br.frequency.exponentialRampToValueAtTime(Math.max(90, Math.min(cut, fB * 0.6)), ti + bst);
    br.frequency.exponentialRampToValueAtTime(Math.max(90, Math.min(cut, fB * 0.3 * dull)), ti + bst + sus);
    /* ...and its top closes down with it: the air between takes more of
       the highs the further the round is */
    var fL = Math.min(cut * 0.5, fB * 2.6), lr = lpf(ac, fL, 0.6);
    lr.frequency.setValueAtTime(fL, ti + rise);
    lr.frequency.exponentialRampToValueAtTime(Math.max(200, fL * 0.5), ti + bst);
    lr.frequency.exponentialRampToValueAtTime(Math.max(150, fL * 0.25), ti + bst + sus);
    /* the band moves down at constant Q, so it narrows; the energy the air
       leaves - the low part - is kept (1 / sqrt(dull)) */
    var gr = gainNode(ac, 0), pk = lvl * KM.roar * (1 - 0.1 * far) / Math.sqrt(dull);
    gr.gain.setValueAtTime(0.00001, ti);
    gr.gain.linearRampToValueAtTime(pk, ti + rise);
    gr.gain.setValueAtTime(pk, ti + rise + bst * 0.5);
    gr.gain.exponentialRampToValueAtTime(pk * 0.35, ti + bst);
    gr.gain.exponentialRampToValueAtTime(pk * 0.0001, ti + bst + sus);
    n.connect(br); br.connect(lr); lr.connect(gr); gr.connect(out);

    /* 4. the hiss of the jet going away, high and thin, and the first thing
          to go as it does (a decoy's little motor is all hiss already, and
          fires often enough to save the nodes) */
    if (M.hs !== 0) {
      var hh = hpf(ac, Math.min(cut * 0.7, 2600)), gh = gainNode(ac, 0);
      env(gh.gain, ti + 0.02, 0.06, (bst + sus * 0.8) * 0.5, lvl * KM.hiss * (1 - 0.8 * far));
      n.connect(hh); hh.connect(gh); gh.connect(out);
    }

    /* 5. between the launch and the motor. An RPG-7's charge throws the
          round out with a bang and its gas and echo carry on for the tenth
          of a second before the sustainer lights 10 m out - outdoors a
          bang is never followed by silence. An SLBM's eject is heard
          through the sea: the gas bubble churns and dies away, then the
          missile shoulders the water aside as it rises and breaks the
          surface in a column of spray, and lights */
    var pre = M.bang || M.wet;
    if (pre) {
      var lb = M.wet ? lpf(ac, Math.min(cut, 420), 0.7) : bp(ac, Math.min(cut, 1100 * dull), 0.7);
      var gb = gainNode(ac, 0);
      if (M.wet) {
        var aw = lvl * KM.wash * (1 - 0.4 * far), tw = ti - t0;
        gb.gain.setValueAtTime(0.00001, t0);
        gb.gain.linearRampToValueAtTime(aw, t0 + 0.06);
        gb.gain.exponentialRampToValueAtTime(aw * 0.18, t0 + tw * 0.55);
        gb.gain.exponentialRampToValueAtTime(aw * 1.2, ti);
        gb.gain.exponentialRampToValueAtTime(aw * 0.0001, ti + 0.8);
      } else env(gb.gain, t0 + 0.001, 0.002, 0.34, lvl * KM.gas * nbBand(ac, 1100, 0.7) * (1 - 0.5 * far));
      n.connect(lb); lb.connect(gb); gb.connect(out);
    }
    startNoise(n, pre ? t0 : ti, (pre ? ti - t0 : 0) + bst + sus + 0.05);

    /* 6. rumble and crackle: a big motor tears, a small one barely does.
          The low end is what carries: it lasts as long as the roar does */
    if (M.rum > 0.05) {
      var sc = shapeSrc(ac, "crackle", (0.55 + 0.5 * M.ck) / Math.sqrt(size));
      sc.loop = true;
      var lc = lpf(ac, 1, 0.7);
      lc.frequency.setValueAtTime(Math.min(cut * 0.6, (380 + 900 * M.ck / size) * dull), ti);
      lc.frequency.exponentialRampToValueAtTime(Math.max(70, Math.min(cut, 160 / size)), ti + bst + sus);
      var gc = gainNode(ac, 0), pc = lvl * M.rum * KM.rum * (1 - 0.2 * far);
      gc.gain.setValueAtTime(0.00001, ti);
      gc.gain.linearRampToValueAtTime(pc, ti + rise * 1.5);
      gc.gain.setValueAtTime(pc, ti + Math.max(rise * 1.5, rise + bst * 0.5));
      gc.gain.exponentialRampToValueAtTime(pc * 0.35, ti + bst);
      gc.gain.exponentialRampToValueAtTime(pc * 0.0001, ti + bst + sus);
      sc.connect(lc); lc.connect(gc); gc.connect(out);
      try { sc.start(ti, rnd() * 0.9); } catch (e1) { sc.start(ti); }
      sc.stop(ti + bst + sus + 0.05);
    }

    /* 7. the turbojet sustainer: a whine that falls away as the round does */
    if (M.jet && cut > 1200) {
      var fj = 3100 * vary(0.08);
      var oj = osc(ac, "triangle", fj), gj = gainNode(ac, 0);
      oj.frequency.setValueAtTime(fj, ti + bst * 0.5);
      oj.frequency.exponentialRampToValueAtTime(fj * 0.62, ti + bst + sus);
      gj.gain.setValueAtTime(0.00001, ti + bst * 0.5);
      gj.gain.linearRampToValueAtTime(lvl * M.jet * KM.jet * (1 - 0.8 * far), ti + bst);
      gj.gain.exponentialRampToValueAtTime(lvl * M.jet * KM.jet * 1e-4, ti + bst + sus);
      oj.connect(gj); gj.connect(out);
      oj.start(ti + bst * 0.5); oj.stop(ti + bst + sus + 0.05);
    }
  }

  /* ROCKETS: unguided motors, the same physics with their own table rows -
     an RPG's launch charge bangs before its sustainer lights 10 m out; an
     MLRS round is all booster, and a salvo's ripple is the game's own burst
     cadence (12 rounds at 0.16 s), one whoosh per round. */
  function emitRocket(ac, out, t0, S, sp) { emitMissile(ac, out, t0, S, sp); }

  /* ------------------------------------------------------------ water ----
     A torpedo leaves its tube on a water ram or a slug of air: from above
     the surface that is a muffled thump (the air-water boundary passes about
     a thousandth of the energy, so everything above ~300 Hz is gone), the
     tube's own hollow note, then the air and water it pushed out -
     bubbles, whose pitch rises as they shrink - and the water closing
     behind it. Its motor stays in the water: a first cut let a 640 Hz
     whine through and it ended every launch on a test tone. A lightweight
     torpedo from a deck tube or an aircraft goes into the water in the
     open: a compressed-air cough and a splash. */
  function emitTorpedo(ac, out, t0, S, sp) {
    var far = sp.far, cut = sp.cut;
    var lvl = S.level * sp.gain * vary(0.10);
    var heavy = S.fam === "torpedo";
    var bT = (heavy ? 0.016 : 0.006) * vary(0.1) * (1 + far);
    var sB = shapeSrc(ac, "blast", BLAST_T / bT);
    var lB = lpf(ac, Math.min(cut, heavy ? 300 : 700), 0.8), gB = gainNode(ac, lvl * (heavy ? 0.85 : 0.60));
    sB.connect(lB); lB.connect(gB); gB.connect(out);
    if (heavy) {
      var bt = bp(ac, 78 * vary(0.06), 5), gt = gainNode(ac, lvl * 1.6);
      sB.connect(bt); bt.connect(gt); gt.connect(out);
    }
    sB.start(t0);

    /* bubbles: a band rising as they shrink, chopped at the rate they
       break. The chop rides a unity gain AFTER the envelope, so it scales
       with it and the bubbles die away instead of holding their level */
    var n = noiseSrc(ac, 1), dull = 1 - 0.4 * far;
    var b2 = bp(ac, 1, 2.0);
    b2.frequency.setValueAtTime(Math.min(cut, (heavy ? 520 : 900) * dull), t0 + 0.04);
    b2.frequency.exponentialRampToValueAtTime(Math.min(cut, (heavy ? 1150 : 1900) * dull), t0 + 0.7);
    var g2 = gainNode(ac, 0), gm = gainNode(ac, 0.5);
    env(g2.gain, t0 + 0.04, 0.05, heavy ? 0.75 : 0.6, lvl * (heavy ? 3.7 : 1.0));
    var lfo = osc(ac, "triangle", 11 * vary(0.2)), lg = gainNode(ac, 0.5);
    lfo.connect(lg); lg.connect(gm.gain);
    lfo.start(t0); lfo.stop(t0 + 0.85);
    n.connect(b2); b2.connect(g2); g2.connect(gm); gm.connect(out);
    if (!heavy) {
      /* the splash of the round going in: a broad band round 2 kHz with a
         soft front, not a crack - water parts, it does not shatter */
      var hs = bp(ac, Math.min(cut * 0.5, 2200 * (1 - 0.5 * far)), 0.8), gs = gainNode(ac, 0);
      env(gs.gain, t0 + 0.07, 0.012, 0.26, lvl * 1.5 * (1 - 0.6 * far));
      n.connect(hs); hs.connect(gs); gs.connect(out);
    }
    /* the water closing over it: a low wash that dies away */
    var lw = lpf(ac, Math.min(cut, heavy ? 260 : 420), 0.7), gw = gainNode(ac, 0);
    env(gw.gain, t0 + 0.06, 0.10, heavy ? 1.0 : 0.6, lvl * (heavy ? 1.8 : 0.8) * (1 - 0.3 * far));
    n.connect(lw); lw.connect(gw); gw.connect(out);
    startNoise(n, t0, heavy ? 1.15 : 0.8);
  }

  /* DEPTH CHARGES leave a K-gun or a Y-gun on a black-powder impulse charge -
     a low, soft "whumpf", not a gun's crack - and tumble away through the
     air. The splash and the detonation belong to the impact. */
  function emitDepth(ac, out, t0, S, sp) {
    var far = sp.far, cut = sp.cut;
    var lvl = S.level * sp.gain * vary(0.10);
    var sB = shapeSrc(ac, "blast", BLAST_T / (0.007 * vary(0.1) * (1 + far)));
    var lB = lpf(ac, Math.min(cut, 650), 0.7), gB = gainNode(ac, lvl * 1.7);
    sB.connect(lB); lB.connect(gB); gB.connect(out); sB.start(t0);
    var n = noiseSrc(ac, 1), b = bp(ac, 1, 1.2), g = gainNode(ac, 0);
    ramp(b.frequency, t0, Math.min(cut, 900), Math.min(cut, 380), 0.45);
    env(g.gain, t0 + 0.01, 0.03, 0.45, lvl * 1.6);
    n.connect(b); b.connect(g); g.connect(out);
    startNoise(n, t0, 0.5);
  }

  /* BOMBS. The release is the ejector rack's cartridges kicking the store
     off its hooks - a hard metallic clack - and then the fall: rushing air
     that grows and rises in pitch as it comes down toward the ground
     listener (Doppler, approaching). The combat code gives a bomb 0.7 s of
     game time, so the rush is cut there and the explosion takes over. */
  function emitBomb(ac, out, t0, S, sp) {
    var far = sp.far, cut = sp.cut;
    var lvl = S.level * sp.gain * vary(0.10);
    var n = noiseSrc(ac, 1);
    var bc = bp(ac, Math.min(cut, 1250 * vary(0.06)), 6), gc = gainNode(ac, 0);
    env(gc.gain, t0, 0.0008, 0.07, lvl * 2.6 * (1 - 0.6 * far));
    n.connect(bc); bc.connect(gc); gc.connect(out);
    var br = bp(ac, 1, 1.3), gr = gainNode(ac, 0), fall = 0.68 * (sp.ts || 1);
    br.frequency.setValueAtTime(Math.min(cut, 520 * (1 - 0.4 * far)), t0 + 0.05);
    br.frequency.exponentialRampToValueAtTime(Math.min(cut, 1250 * (1 - 0.4 * far)), t0 + fall);
    /* from 50 dB under its peak, not from nothing: the air is moving from
       the moment the store leaves the rack */
    gr.gain.setValueAtTime(lvl * 2.6 * 0.003, t0 + 0.05);
    gr.gain.exponentialRampToValueAtTime(lvl * 2.6, t0 + fall - 0.02);
    gr.gain.linearRampToValueAtTime(0.00001, t0 + fall + 0.02);
    n.connect(br); br.connect(gr); gr.connect(out);
    startNoise(n, t0, fall + 0.05);
  }

  function emitReport(ac, out, t0, S, sp) {
    switch (S.fam) {
      case "rotary": case "revolver":            emitBurst(ac, out, t0, S, sp);   break;
      case "mortar":                             emitArc(ac, out, t0, S, sp);     break;
      case "rpg": case "mlrs": case "ffar":      emitRocket(ac, out, t0, S, sp);  break;
      case "torpedo": case "lwt":                emitTorpedo(ac, out, t0, S, sp); break;
      case "depth":                              emitDepth(ac, out, t0, S, sp);   break;
      case "bomb":                               emitBomb(ac, out, t0, S, sp);    break;
      default:
        if (S.mis) emitMissile(ac, out, t0, S, sp);
        else emitGun(ac, out, t0, S, sp);
        break;
    }
  }

  /* THE GAME'S CLOCK. main.js runs the simulation at dt * Game.speed, so
     at 2x a burst rules.js times at 0.35 s is over in 0.18 s of audio time.
     Motors and blasts are physics and keep their own time; what the game
     times - a burst's length, a bomb's fall, an SLBM's rise to the surface -
     follows its clock. Read per call: the speed button can change it at
     any moment. */
  function gameRate() {
    try { var s = Game.speed; return (s > 0 && s < 10) ? s : 1; } catch (e) { return 1; }
  }

  /* ONE REPORT PER BURST for the burst families. A rotary's later rounds
     arrive as calls every burstDelay; they are already inside the report the
     first call made, so they are swallowed while they fall inside its span
     and come from the same place (two A-10s strafing side by side each get
     their own). A round after the span - the next burst, or a gun that
     never stops - starts a new report; if the last one is still sounding it
     carries straight on (sp.cont). Every other weapon keeps the per-weapon
     gap it always had. */
  var burstsLive = {};
  function admitShot(S, x, y, now, sp) {
    var key = S.key || S.id;
    if (sp) sp.ts = 1 / gameRate();
    if (!warmQ && ctx) warmTables(ctx);
    if (!S.burst) {
      var prev = lastReport[key];
      if (prev !== undefined && now - prev < S.gap) return false;
      lastReport[key] = now;
      return true;
    }
    var list = burstsLive[key] || (burstsLive[key] = []);
    var px = x === undefined ? 0 : x, py = y === undefined ? 0 : y;
    for (var i = list.length - 1; i >= 0; i--) {
      var b = list[i];
      if (now > b.end + 0.3) { list.splice(i, 1); continue; }
      if (Math.abs(b.x - px) + Math.abs(b.y - py) >= 96) continue;
      if (now < b.last) { b.x = px; b.y = py; return false; }
      if (sp) sp.cont = now < b.end + 0.15;
      break;
    }
    if (sp) sp.bst = { list: list, x: px, y: py };
    return true;
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

  /* ---- the struck-body building blocks ----
     (owner) "i don't see damaged effect so far." Measured, the old metal was
     not metal: ring() lets its noise exciter run 6 ms into a Q 14-18
     bandpass, and a bandpass that narrow at 430 Hz rings for Q / (pi f) =
     10 ms, so the "0.55 s hull ring" measured 30 ms and every steel hit was
     really the sine thud under it (armour centroid 144 Hz, hull 77 Hz - the
     same band as the 120 mm report that fired the round, which masked it).
     A struck plate is the opposite: an impulse with almost no duration and
     modes that ring on long after it. So metal now rings on sine
     oscillators at the body's own inharmonic modes, and everything that is
     many small impacts (spall, grit, debris, the crush of a fracture) is one
     noise source, one bandpass and one gain scheduled as a train of grains,
     where the old grains() spent three nodes on every grain.
     ring, grains, thud and hiss are unchanged and still here for anyone
     who calls them. */

  /* A struck body's modes: one sine per mode, a sub-millisecond attack, each
     mode decaying on its own clock (tau / ratio^0.55, so the high modes die
     first and a clang goes CLANG-ng instead of sounding a chord). ratios is
     the body's inharmonic series; amps weights each mode. glide bends every
     mode down by that fraction over the first 60 ms - a hard blow stiffens a
     plate for an instant, which is what makes a big hit sound strained.
     Each mode wanders only 0.4%: the caller varies the whole body's pitch
     per hit, and more than that per mode would scramble a designed beat. */
  function plateModes(ac, out, t0, f1, ratios, amps, tau, lvl, cut, glide) {
    for (var i = 0; i < ratios.length; i++) {
      var f = f1 * ratios[i] * vary(0.004);
      if (!amps[i] || f > cut * 1.2 || f > 15000) continue;
      var o = osc(ac, "sine", f);
      if (glide) {
        o.frequency.setValueAtTime(f * (1 + glide), t0);
        o.frequency.exponentialRampToValueAtTime(f, t0 + 0.06);
      }
      var g = gainNode(ac, 0);
      var d = tau / Math.pow(ratios[i], 0.55);
      burst(g.gain, t0, 0.0005, d, lvl * amps[i]);
      o.connect(g); g.connect(out);
      o.start(t0); o.stop(t0 + d + 0.03);
    }
  }

  /* Many small impacts on ONE noise source, ONE bandpass and ONE gain: the
     gain is scheduled as a train of grains and the bandpass jumps to a new
     centre (log-uniform in fLo..fHi) for each one. shape > 1 crowds the
     grains towards the start and every grain is quieter than the one before
     it on average, which is how debris lands: most of it at once, then the
     stragglers. Grains never overlap on the one envelope - each is cut short
     at the next - so a dense train reads as a crunch and a sparse one as a
     patter. */
  function grainTrain(ac, out, t0, n, spread, fLo, fHi, dec, lvl, cut, q, shape) {
    var fh = Math.min(fHi, cut);
    if (n < 1 || fh < fLo * 1.05) return;
    var s = noiseSrc(ac, 1), b = bp(ac, fLo, q || 5), g = gainNode(ac, 0);
    var ts = [], i;
    for (i = 0; i < n; i++) ts.push(Math.pow(rnd(), shape || 1) * spread);
    ts.sort(function (x, y) { return x - y; });
    g.gain.setValueAtTime(0, t0);
    var last = t0;
    for (i = 0; i < n; i++) {
      var t = t0 + ts[i];
      if (t < last) continue;
      var room = (i + 1 < n ? t0 + ts[i + 1] : t + dec * 2) - t - 0.001;
      var d = Math.min(dec * (0.5 + rnd()), Math.max(0.0015, room));
      b.frequency.setValueAtTime(fLo * Math.pow(fh / fLo, rnd()), t);
      var pk = lvl * (0.35 + 0.65 * rnd()) * (1 - 0.70 * ts[i] / Math.max(0.001, spread));
      g.gain.setValueAtTime(0.00001, t);
      g.gain.linearRampToValueAtTime(Math.max(0.00002, pk), t + 0.0006);
      g.gain.exponentialRampToValueAtTime(0.00001, t + 0.0006 + d);
      last = t + 0.0006 + d;
    }
    /* the envelope goes BEFORE the filter, so each grain's attack is
       band-limited too: a muffled crunch stays muffled instead of every
       grain clicking out to 20 kHz */
    s.connect(g); g.connect(b); b.connect(out);
    startNoise(s, t0, Math.max(0.01, last - t0));
  }

  /* a noise band with a real attack: the column of a water burst rising
     and the spray coming down take a tenth of a second or more to build,
     which hiss()'s 4 ms attack cannot say */
  function noiseWash(ac, out, t0, type, fFrom, fTo, q, atk, dec, lvl, cut) {
    var n = noiseSrc(ac, 1), f = ac.createBiquadFilter(), g = gainNode(ac, 0);
    f.type = type; f.Q.value = q;
    ramp(f.frequency, t0, Math.min(fFrom, cut), Math.min(fTo, cut), atk + dec);
    burst(g.gain, t0, atk, dec, lvl);
    n.connect(f); f.connect(g); g.connect(out);
    startNoise(n, t0, atk + dec);
  }

  /* The contact, or the shock front: broadband above fHp, a fraction of a
     millisecond to rise and a few ms to go. The ear times an event from this
     edge, and it is what the air takes first - a distant one keeps only
     what the absorption lowpass lets through. */
  function contactCrack(ac, out, t0, fHp, dec, lvl, cut) {
    if (lvl < 0.0005 || cut < fHp * 0.9) return;
    var n = noiseSrc(ac, 1), h = hpf(ac, fHp), g = gainNode(ac, 0);
    burst(g.gain, t0, 0.0003, dec, lvl);
    n.connect(h); h.connect(g); g.connect(out);
    startNoise(n, t0, dec + 0.01);
  }

  /* A ricochet. The round leaves tumbling, and a tumbling slug whistles at
     its tumble rate, falling in pitch as it slows and recedes. Band noise
     carries the rush of air and a quieter sine the whistle in it; a pure
     sine alone is a cartoon. */
  function ricochetWhine(ac, out, t0, f, dur, lvl, cut) {
    if (f > cut) return;
    var n = noiseSrc(ac, 1), b = bp(ac, f, 16), g = gainNode(ac, 0);
    b.frequency.setValueAtTime(f * 1.08, t0);
    b.frequency.exponentialRampToValueAtTime(f * 0.55, t0 + dur);
    g.gain.setValueAtTime(0.00001, t0);
    g.gain.linearRampToValueAtTime(lvl * 2.2, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(lvl * 0.9, t0 + dur * 0.45);
    g.gain.exponentialRampToValueAtTime(0.00001, t0 + dur);
    n.connect(b); b.connect(g); g.connect(out);
    startNoise(n, t0, dur);
    var o = osc(ac, "sine", f), go = gainNode(ac, 0);
    o.frequency.setValueAtTime(f * 1.08, t0);
    o.frequency.exponentialRampToValueAtTime(f * 0.55, t0 + dur);
    go.gain.setValueAtTime(0.00001, t0);
    go.gain.linearRampToValueAtTime(lvl * 0.35, t0 + 0.02);
    go.gain.exponentialRampToValueAtTime(0.00001, t0 + dur * 0.9);
    o.connect(go); go.connect(out);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  /* The blast's positive phase: one heavy low swing. Its pitch starts at
     `glide` times the note and falls to it within `gt` seconds: close to a
     charge the first swing of the pressure wave is the shortest one, and
     that steep first swing is the punch. It then sinks further as the swing
     lengthens. It is driven through a soft saturator, so it carries 3f and
     5f: 40-80 Hz is below what a laptop speaker can make, and those
     harmonics are what let the ear hear the fundamental that is not there.
     The drive sits before the saturator, so the harmonics fade as the swing
     does, as the real nonlinearity of a loud pressure wave would. The
     harmonics stay under 3 kHz, far below Nyquist, so the shaper needs no
     oversampling. */
  var thumpCurves = {};
  function blastThump(ac, out, t0, f, dec, lvl, drive, glide, gt) {
    var k = Math.round(drive * 10) / 10;
    if (!thumpCurves[k]) {
      var c = new Float32Array(1024), d = Math.tanh(k);
      for (var i = 0; i < 1024; i++) c[i] = Math.tanh(((i * 2) / 1023 - 1) * k) / d;
      thumpCurves[k] = c;
    }
    var o = osc(ac, "sine", f);
    o.frequency.setValueAtTime(f * glide, t0);
    o.frequency.exponentialRampToValueAtTime(f, t0 + Math.min(gt, dec * 0.2));
    o.frequency.exponentialRampToValueAtTime(Math.max(22, f * 0.6), t0 + dec);
    var g = gainNode(ac, 0);
    burst(g.gain, t0, 0.0025, dec, 1);
    var ws = ac.createWaveShaper();
    ws.curve = thumpCurves[k];
    var go = gainNode(ac, lvl);
    o.connect(g); g.connect(ws); ws.connect(go); go.connect(out);
    o.start(t0); o.stop(t0 + dec + 0.05);
  }

  /* lowpassed noise whose corner falls from fFrom to fTo: the body of a
     blast, or its roll. poles 2 gives 24 dB/oct, for a roll that must stay
     low however loud it is. */
  function lowRoar(ac, out, t0, rate, fFrom, fTo, atk, dec, lvl, poles) {
    var n = noiseSrc(ac, rate), l = lpf(ac, 1, 0.7), g = gainNode(ac, 0), tail = l;
    ramp(l.frequency, t0, fFrom, fTo, dec);
    n.connect(l);
    if (poles === 2) {
      var l2 = lpf(ac, 1, 0.6);
      ramp(l2.frequency, t0, fFrom * 1.3, fTo * 1.3, dec);
      l.connect(l2); tail = l2;
    }
    burst(g.gain, t0, atk, dec, lvl);
    tail.connect(g); g.connect(out);
    startNoise(n, t0, atk + dec);
  }

  /* When the last blast was scheduled. A shell that bursts on a target
     arrives as two calls in the same tick: audio.js's projectile poll plays
     Sfx.boom() and then Sfx.impact() for what it struck, both at
     currentTime + 2 ms. emitImpact reads this to know that the blast is
     already there. */
  var blastAt = -1;

  /* e is a 0..1 energy figure taken from the round's damage. What e means
     in play, measured off WEAPONS: small arms arrive at 0.06-0.12 (rifle
     0.09, GPMG 0.12, a 30 mm chain gun 0.06), a tank round at 0.19-0.46
     (76 mm 0.19, 105 mm 0.33, the GAU-8's 30 mm 0.38, 120 mm 0.35 beside its
     own boom), artillery and heavy missiles at 0.5-0.7, always with a blast.
     So the voice that must be unmistakable - a main-gun round striking a
     tank - lives at e 0.2-0.46, not at 0.9.

     Two cases are told apart here, not by e alone:
     - PAIRED. A shell bursting on a hull comes with its own blast (above),
       which already carries the crack and the low thump. The struck plate
       adds only what the blast lacks: its ring and the spall. A second
       contact crack and a second thud 30 Hz from the blast's would beat
       against it and pull the limiter for nothing: a first cut that played
       them pulled 2.4 dB for a 105 mm howitzer round on a tank (HEAD 0.6);
       without them it pulls 0.5.
     - ANTI-MATERIEL. No shell arrives on its own above e 0.47 (the heaviest,
       the CN120-26 at dmg 148, is 0.46; everything heavier bursts), so a
       lone e above 0.5 on metal is a rifle round whose e is an artefact of
       the hitscan scale dmg / 120: the 12.7 mm anti-materiel rifle at 0.79
       and the 8.6 mm G22 at 0.73. The 12.7 mm fires the HMG's own cartridge,
       so on a tank or a ship it sounds like the HMG's rounds (0.11), not
       like the main-gun penetration e 0.79 would otherwise ask for, which
       measured louder than a 105 mm round on the same tank (-20.7 LUFS
       against -22.0; now -32.4, beside the HMG's -33.7). */
  function emitImpact(ac, out, t0, mat, e, sp) {
    var paired = Math.abs(t0 - blastAt) < 0.004;
    if (!paired && e > 0.5 && (mat === "armour" || mat === "hull")) e = 0.12;
    var lvl = sp.gain * clamp(0.18 + e * 0.85, 0.10, 1.05);
    var cut = sp.cut, far = sp.far;
    var big = clamp((e - 0.10) / 0.5, 0, 1);         // 0 a rifle round, 1 a shell
    switch (mat) {
      case "armour": {
        /* A tank is a small, very thick steel box. A rifle round does not get
           in: it is a hard high PING off the plate (the small contact
           excites the upper modes) and now and then the whine of the round
           leaving. A main-gun round is the other event: the crack of the
           contact, a lower CLANG from the whole plate, the dull heavy thud
           of the hull taking the blow and, a few tens of ms later, the
           crunch of spall inside. The clang sits at 0.5-4 kHz, the band a
           tank gun report leaves empty (a 120 mm report's centroid is
           113 Hz), which is why it reads through the gunfire around it
           without having to be louder than that gunfire. */
        var pen = clamp((e - 0.10) / 0.26, 0, 1);
        /* a flatter law than the other materials: what matters is that a
           main-gun hit at e 0.2-0.46 is plain, not that an e 0.7 hit is
           deafening */
        lvl = sp.gain * clamp(0.30 + e * 0.62, 0.10, 0.95) * 0.75;
        if (!paired)
          contactCrack(ac, out, t0, 2600 - 1100 * pen, 0.005 + 0.012 * pen, lvl * (0.55 + 0.30 * pen), cut);
        var pa = [0.30, 0.55, 0.85, 1.00, 0.70], pb = [1.00, 0.80, 0.62, 0.42, 0.22], am = [];
        for (var ai = 0; ai < 5; ai++) am.push(pa[ai] * (1 - pen) + pb[ai] * pen);
        plateModes(ac, out, t0, (880 - 400 * pen) * vary(0.05), [1, 1.59, 2.36, 3.47, 4.62], am,
              0.10 + 0.46 * pen, lvl * (0.34 + 0.30 * pen), cut, 0.02 * pen);
        if (!paired)
          thud(ac, out, t0, 92 - 16 * pen, 0.5, 0.10 + 0.22 * pen, lvl * (0.25 + 0.45 * pen));
        if (pen > 0.25)
          grainTrain(ac, out, t0 + 0.03, Math.round(14 + 16 * pen), 0.06 + 0.08 * pen, 300, 2000, 0.008,
                lvl * 0.65 * pen, cut, 2.5, 1.3);
        if (pen < 0.7 && rnd() < 0.40 - 0.38 * pen)
          ricochetWhine(ac, out, t0 + 0.006, (2500 + rnd() * 1500) * (1 - 0.2 * pen), 0.26 + rnd() * 0.24,
                lvl * 0.10 * (1 - far * 0.6), cut);
        break;
      }
      case "hull": {
        /* A ship is a big thin-skinned steel box full of air: the same blow an
           octave and more down, far longer, and hollow - the compartment
           behind the plate booms like a drum. The fundamental is doubled
           1.1% apart (under 2 Hz at 130-165 Hz), and the pair beats: the
           slow shimmer every big struck panel has. */
        var hp = clamp((e - 0.10) / 0.30, 0, 1);
        if (!paired) contactCrack(ac, out, t0, 1500, 0.008 + 0.010 * hp, lvl * 0.45, cut);
        /* Under its own blast (a naval shell or missile bursting on the hull)
           the ring is 3 dB down: it is secondary to the blast there, and the
           doubled fundamental starts in phase, 1.7 times one mode's height,
           right on top of the blast's first swing - measured, that put 14
           samples of a 203 mm hit into the clipper, against 7 without it. */
        plateModes(ac, out, t0, (165 - 35 * hp) * vary(0.04), [1, 1.011, 1.52, 2.26, 3.1, 4.37],
              [1.0, 0.7, 0.75, 0.6, 0.42, 0.28], Math.min(1.0, 0.65 + 0.40 * hp), lvl * (paired ? 0.23 : 0.33), cut, 0.015 * hp);
        if (!paired) thud(ac, out, t0, 58, 0.7, 0.40 + 0.30 * hp, lvl * (0.45 + 0.15 * hp));
        if (hp > 0.2)
          grainTrain(ac, out, t0 + 0.03, Math.round(6 + 12 * hp), 0.14 + 0.2 * hp, 500, 3000, 0.02,
                lvl * 0.35 * hp, cut, 4, 1.3);
        break;
      }
      case "structure":
        /* concrete: a sharp fracture crack (a lower corner than steel), the
           crush of the fracture itself, a puff of dust and then the chips
           and chunks coming down. Only a shell moves enough of the wall to
           give the low thud of its mass; under a rifle round it is a
           trace. */
        contactCrack(ac, out, t0, 1200, 0.016 + 0.004 * big, lvl * (2.00 - 1.25 * big), cut);
        grainTrain(ac, out, t0 + 0.002, Math.round(12 + 14 * big), 0.09 + 0.03 * big, 350, 2600, 0.010,
              lvl * (4.20 - 3.40 * big), cut, 1.6, 1.5);
        thud(ac, out, t0, 80, 0.5, 0.16 + 0.20 * big, lvl * (0.20 + 0.70 * big));
        hiss(ac, out, t0 + 0.01, 1400, 300, 0.22 + 0.30 * big, lvl * (1.90 - 1.45 * big), cut, "lowpass");
        grainTrain(ac, out, t0 + 0.06, Math.round(10 + 26 * big), 0.30 + 0.50 * big, 600, 3600, 0.02,
              lvl * 0.28, cut, 3, 1.8);
        break;
      case "water": {
        /* a round into water: the slap of the surface, the plip of the
           cavity (a bubble's pitch RISES as it shrinks - the one sound that
           says water and nothing else), the column going up as spray and
           coming back down as drops */
        contactCrack(ac, out, t0, 900, 0.012 + 0.02 * big, lvl * 0.50, cut);
        var bf = (520 - 280 * big) * vary(0.08);
        var ob = osc(ac, "sine", bf), gb = gainNode(ac, 0);
        ob.frequency.setValueAtTime(bf, t0 + 0.004);
        ob.frequency.exponentialRampToValueAtTime(bf * 2.1, t0 + 0.05 + 0.08 * big);
        burst(gb.gain, t0 + 0.004, 0.002, 0.05 + 0.08 * big, lvl * 0.45);
        ob.connect(gb); gb.connect(out); ob.start(t0); ob.stop(t0 + 0.2 + 0.1 * big);
        thud(ac, out, t0, 150 - 60 * big, 0.5, 0.10 + 0.15 * big, lvl * 0.45);
        noiseWash(ac, out, t0 + 0.02, "bandpass", 1600, 4200, 0.7, 0.04 + 0.05 * big, 0.30 + 0.50 * big, lvl * 0.30, cut);
        grainTrain(ac, out, t0 + 0.14 + 0.1 * big, Math.round(10 + 18 * big), 0.30 + 0.55 * big, 1400, 5000, 0.016,
              lvl * 0.18, cut, 5, 1.3);
        break;
      }
      case "rock":
        /* rock is hard and brittle: the brightest non-metal contact, stone
           chips and grit sprayed off it, and a small round glances off it
           as often as off a tank */
        contactCrack(ac, out, t0, 2400, 0.006 + 0.008 * big, lvl * (1.20 - 0.40 * big), cut);
        thud(ac, out, t0, 90, 0.5, 0.10 + 0.10 * big, lvl * 0.50);
        grainTrain(ac, out, t0 + 0.004, Math.round(12 + 14 * big), 0.16 + 0.24 * big, 1500, 6000, 0.014,
              lvl * (0.80 - 0.30 * big), cut, 5, 1.6);
        hiss(ac, out, t0, 2800, 700, 0.12 + 0.10 * big, lvl * (0.55 - 0.20 * big), cut, "bandpass");
        if (e < 0.3 && rnd() < 0.35)
          ricochetWhine(ac, out, t0 + 0.005, 2200 + rnd() * 1400, 0.22 + rnd() * 0.2, lvl * 0.08, cut);
        break;
      case "flesh":
        /* kept deliberately plain: a muffled blow through cloth and kit, no
           more. The death is told by die_inf, and told quietly. It is
           lifted at the small end only - a rifle round is how it arrives -
           so a hit on a squad is not lost in the battle around it. */
        lvl *= 1.40 - 0.40 * big;
        hiss(ac, out, t0, 520, 170, 0.07 + 0.05 * e, lvl * 0.70, cut, "lowpass");
        thud(ac, out, t0, 120, 0.45, 0.07 + 0.04 * e, lvl * 0.45);
        break;
      case "air":
        /* a proximity burst: HE going off in open air with nothing to damp
           it - the brightest pop in the game - then the gas ball, and the
           fragments leaving. Little low end: there is no ground to couple
           the blast into, which is what makes a ground burst a thump. */
        contactCrack(ac, out, t0, 1900, 0.010 + 0.012 * e, lvl * 1.05, cut);
        hiss(ac, out, t0, 1600, 350, 0.10 + 0.14 * e, lvl * (0.88 - 0.25 * e), cut, "bandpass");
        thud(ac, out, t0, 120, 0.5, 0.09 + 0.08 * e, lvl * 0.26);
        grainTrain(ac, out, t0 + 0.012, Math.round(6 + 8 * e), 0.14, 2500, 7000, 0.012, lvl * 0.30, cut, 4, 1.2);
        break;
      default: /* earth */
        /* Soft ground takes the blow, and what it gives back depends on the
           round. A rifle bullet has nowhere near the energy to move enough
           soil for a low note: it is a dull, short "thwp" in the low mids
           and a spurt of grit. A shell throws up a whump of earth at
           60-70 Hz, a lowpassed puff, and clods pattering back down. */
        var soft = (1 - big) * (1 - big);
        thud(ac, out, t0, 118 - 56 * big, 0.55, 0.10 + 0.32 * big, lvl * (0.95 + 0.20 * soft));
        hiss(ac, out, t0, 1300 - 600 * big, 180 - 20 * big, 0.10 + 0.22 * big, lvl * (0.80 + 2.50 * soft), cut, "lowpass");
        grainTrain(ac, out, t0 + 0.004 + 0.08 * big, Math.round(8 + 11 * big), 0.10 + 0.54 * big, 400, 2200 - 500 * big, 0.018,
              lvl * (0.30 + 0.95 * soft), cut, 3, 1.4);
        break;
    }
  }

  /* An explosion, scale 0..1 (0.18 is the smallest the projectile poll asks
     for), on land or water. What a blast is, in the order it arrives:
       crack   the shock front - broadband, sub-ms rise, a few ms long; the
               first thing air absorption takes from a distant one
       thump   the positive phase, one heavy swing at 40-80 Hz (48 Hz at
               scale 1, 74 Hz at 0.18: a bigger charge has a longer positive
               phase, so a lower one), felt rather than heard
       crunch  the ground and the casing fracturing: a dense train of small
               impacts in the mids, the first 60-160 ms
       body    the fireball, lowpassed noise closing down from 2 kHz
       debris  what was thrown up coming back down: 0.1 s to over a second
       roll    the blast coming back off terrain, low and long; at range it
               is most of what is left, so a big one far away is a rumble
     Size scales every layer; distance trades the crack, the crunch and the
     debris for the roll. A charge in water has no crack in air - the water
     takes the shock and gives back a muffled slam - and then the plume: the
     column rising as spray and falling back as a long hiss and a patter of
     drops.

     THE BALANCE, measured as the loudest 400 ms through a 200 Hz high-pass
     (what a laptop speaker plays) and through a 100 Hz low-pass (what it
     cannot). A first cut put the thump at 0.8 of the level and the body at
     0.85: the band under 100 Hz rose 11-16 dB over HEAD while everything a
     laptop plays fell 2-3 dB, so on the owner's speakers a blast sounded
     thinner than before, and the sub it could not play pulled the limiter.
     Now the thump sits at 0.45 of the level with twice the drive (its 3f
     and 5f carry it on a small speaker), the fireball body at 1.6 closing
     to 90 Hz rather than 65, and the crunch and debris bands are wide
     enough to be heard at all. Every land blast plays 2.3-4.7 dB more above
     200 Hz than HEAD did, the band under 100 Hz goes from 4 dB less (the
     smallest, 74 Hz) to 13 dB more (the biggest, 48 Hz), and the loudest
     400 ms stays within 1.4 dB of HEAD's. */
  function emitBoom(ac, out, t0, scale, water, sp) {
    var s = scale;
    blastAt = t0;
    /* HEAD's level law, trimmed a little at the small end: the crack and the
       crunch put more of a small blast where the ear (and K-weighting) is
       most sensitive */
    var lvl = sp.gain * clamp(0.30 + s * 0.8, 0.1, 1.1) * (0.85 + 0.15 * Math.sqrt(s));
    var cut = sp.cut, far = sp.far;
    var dec = (0.30 + s * 0.95) * vary(0.06);
    var fth = (water ? 62 - 18 * s : 80 - 32 * s) * vary(0.05) * (1 - 0.12 * far);
    if (!water) {
      contactCrack(ac, out, t0, 1500, 0.008 + 0.018 * s, lvl * 0.70 * (1 - 0.85 * far), cut);
      blastThump(ac, out, t0, fth, dec * (0.75 + 0.25 * far), lvl * 0.45, (1.6 + 0.8 * s) * 1.8, 2.4, 0.06);
      /* the crunch follows the shock front by a few ms - the ground has to
         be hit before it can break - and is dense rather than sharp: grains
         24 ms long, each cut by the next. Shorter, harder grains measured
         no louder above 200 Hz and put single-sample spikes past the
         limiter's 2 ms attack into the clipper when two blasts stacked. */
      grainTrain(ac, out, t0 + 0.006, Math.round(16 + 24 * s), 0.06 + 0.10 * s, 280, 2600, 0.024,
            lvl * 1.6 * (1 - 0.7 * far), cut, 0.9, 1.6);
      lowRoar(ac, out, t0, 0.85, Math.min(cut, 1800), 90, 0.004, dec, lvl * 1.6, 1);
      grainTrain(ac, out, t0 + 0.08 + 0.04 * s, Math.round(12 + 30 * s), 0.30 + 0.80 * s, 900, 5200, 0.018,
            lvl * 0.40 * (1 - 0.9 * far), cut, 2.5, 1.8);
    } else {
      hiss(ac, out, t0, Math.min(cut, 1200), Math.min(cut, 300), 0.05 + 0.03 * s, lvl * 0.75, cut, "bandpass");
      /* the water's slam carries far, the plume does not: at range the
         thump is most of a water burst, so it gives up less to distance */
      blastThump(ac, out, t0, fth, dec * 0.85, lvl * (0.70 + 0.15 * s) * (1 + 0.8 * far), 1.2, 1.7, 0.08);
      lowRoar(ac, out, t0, 0.7, Math.min(cut, 700), 55, 0.006, dec * 0.8, lvl * 0.70, 1);
      noiseWash(ac, out, t0 + 0.03, "bandpass", 900, 2600, 0.7, 0.10 + 0.08 * s, 0.50 + 0.70 * s, lvl * 0.80, cut);
      noiseWash(ac, out, t0 + 0.12, "highpass", 2500, 4500, 0.7, 0.20 + 0.10 * s, 0.50 + 0.60 * s, lvl * 0.36, cut);
      grainTrain(ac, out, t0 + 0.30 + 0.2 * s, Math.round(16 + 26 * s), 0.60 + 0.80 * s, 900, 4500, 0.02,
            lvl * 0.15, cut, 4, 1.3);
    }
    lowRoar(ac, out, t0 + 0.06, 0.55, Math.min(cut, 480 * (1 - 0.4 * far)), 55, 0.08 + 0.06 * far, dec * 1.7,
         lvl * (0.28 + 0.45 * far) * (water ? 0.7 + 0.3 * far : 1), 2);
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
    if (!admitShot(S, x, y, now, sp)) return;
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

  /* HOW LOUD A HULL'S ENGINE IS: two rules, and the quieter one wins.
     BY ITS SIZE. Sound power follows engine power and engine power follows
     weight - an M1A2's 1500 hp for 62 t, a Bradley's 600 for 30, an
     HMMWV's 190 for 5 - so 3 dB a doubling of mass, a 62 t hull at
     ENGINE_MIX: -28.5 LUFS over its loudest 400 ms at full drive at the
     camera, 10 LU under its own 120 mm. Afloat rules.js gives no mass but
     does give size, as hit points (a patrol boat 520, a corvette 1150, a
     destroyer 2100, a carrier 4200), and a ship's engine runs as a ground
     hull of hp / 20 tonnes would: a destroyer's as a 105 t one's, 11.6 LU
     under its own 127 mm.
     UNDER ITS OWN GUN. Size alone cannot keep an engine under the gun its
     hull carries, because at any one weight the main weapons span 15 LU at
     the camera: a 12.7 mm burst reads -30 LUFS, an autocannon -27, a tank
     gun -19, a howitzer -15. With the M1A2 10 LU under its 120 mm, size
     alone put 176 of the 403 armed ground vehicles within 8 LU of their own
     main weapon and 8 of them over it (an 18 t light tank 2.5 LU over its
     30 mm); holding every one 8 LU under by size alone left the median 19
     under and the quietest 29 - gone. So no engine comes within
     ENGINE_UNDER of the quietest report its main weapon's family makes.
     REPORT_Q is that report, per family: the loudest 400 ms at the camera,
     per unit of S.level, of the quietest main weapon any vehicle or ship in
     rules.js carries, one round, with the rounds of a burst that land
     inside 400 ms adding 10 log n (a rotary or revolver burst is one
     report); tools/audio/check_engine_mix.js prints it afresh, to paste
     here when a weapon family's sound is changed. It reads each of the 615
     main weapons 0 to 5.5 LU quieter than that weapon really reads (1.4
     the median). VOICE_LU is one voice's own loudness per unit gain
     through this bus at full drive at the camera; it rises 2.24 dB an
     octave of its note (the K-weighting over a 16-80 Hz saw) and fits every
     note in the game to +-0.27 dB. So no armed hull comes nearer its gun
     than ENGINE_UNDER less those 0.27 dB. A family missing from REPORT_Q
     leaves a hull on its size.
     At full drive at the camera an M1A2 sits 10.0 LU under its 120 mm
     (HEAD 5.4 over it), a T-90A 10.9 under its 125 mm, a Bradley 9.3 under
     its TOW, an M-SHORAD 11.1 under its 35 mm, an HMMWV 9.9 under a burst
     of its 12.7 mm (HEAD 19.1 over), a destroyer 11.6 under its 127 mm and
     a patrol boat 9.7 under its 12.7 mm. Of the 643 armed hulls in rules.js
     every one is at least 8.8 LU under its main weapon, 491 of them 8 to 12
     (the median 10.7 on land, 10.8 afloat); the widest, 18-19 LU, are small
     hulls with big guns, whose engines keep their size: an 18 t truck
     carrying a 155 mm howitzer, a 720 hp corvette carrying a 127 mm.
     Engines at full drive at the camera run from -45.7 LUFS (a 14 t SPAAG
     firing four .50s) to -25.0 (a 2900 hp cruiser), idling 6.6-7.8 LU
     under that. */
  var REPORT_Q = {
    tank: -14.7, naval: -9.7, howitzer: -11.1, autocannon: -18.3, hmg: -21.1, mg: -22.4, rotary: -20.2,
    revolver: -28.2, atgm: -19.0, atgm_soft: -18.8, manpads: -19.9, sam: -17.2, sam_cold: -18.2, aam: -16.7,
    ashm: -14.9, cruise: -16.1, ballistic: -14.9, mlrs: -19.4, torpedo: -19.2,
  };
  var VOICE_LU = -5.63;     // LUFS: one voice on a 32 Hz note, gain 1, ENGINE_MIX 1, full drive, at the camera
  function engineLevel(u) {
    var d = u.def || {};
    var t = u.cat === "naval" ? clamp((d.hp || 1000) / 20, 4, 240) : clamp(d.mass || 20, 4, 80);
    var lvl = Math.sqrt(t / 62);
    var wid = (d.weapons || [])[0], w = (wid && typeof WEAPONS !== "undefined") ? WEAPONS[wid] : null;
    if (!w) return lvl;
    var S = specOf(w), q = REPORT_Q[S.fam];
    if (q === undefined) return lvl;
    var tick = (typeof CFG !== "undefined" && CFG.DT > 0) ? CFG.DT : 1 / 30;
    var step = Math.ceil((w.burstDelay || 0.1) / tick - 1e-6) * tick;
    var n = S.burst ? 1 : Math.min(Math.max(1, w.burst || 1), 1 + Math.floor(0.4 / step + 1e-9));
    var gun = q + 20 * Math.log(S.level) / Math.LN10 + 10 * Math.log(n) / Math.LN10;
    var voice = VOICE_LU + 20 * Math.log(ENGINE_MIX) / Math.LN10 + 2.24 * Math.log(engineBase(u) / 32) / Math.LN2;
    return Math.min(lvl, Math.pow(10, (gun - ENGINE_UNDER - voice) / 20));
  }
  var lvlCache = (typeof WeakMap !== "undefined") ? new WeakMap() : null;
  function levelOf(u) {                     // once per unit type, not per voice
    var l = (lvlCache && u.def) ? lvlCache.get(u.def) : undefined;
    if (l === undefined) { l = engineLevel(u); if (lvlCache && u.def) lvlCache.set(u.def, l); }
    return l;
  }
  /* No two hulls run at the same rpm. Four tanks picked up in the same
     frame - a camera pan onto a platoon - started four sawtooths in phase
     at one pitch, and they summed like one engine 12 dB up, not like four:
     seven M1A2s driving at the camera read -14.8 LUFS over their loudest
     400 ms on one note, 3.6 LU over one of their 120 mm shots, and -21.7
     with each up to 3% its own; four in line passing the camera -19.0
     against -24.4. The offset is the hull's, from its id, not a draw: a
     voice dropped when its hull leaves the nearest seven and rebuilt when
     it comes back is the same engine, not one up to a semitone off (a
     30 s, 28-vehicle scene rebuilds 11-14 voices that way). */
  function hullSpread(id) {
    var s = String(id), h = 2166136261;
    for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12;
    return 1 + 0.03 * (2 * ((h >>> 0) / 4294967296) - 1);
  }

  function makeEngine(u) {
    var f = engineBase(u);
    if (!f) return null;
    f *= hullSpread(u.id);
    var v = {
      id: u.id, f: f, jet: !!(u.def && u.def.jet), lvl: levelOf(u),
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
      /* idle against full drive: HEAD's 0.35 + 0.65 x speed, heard through
         a compressor that squashed it, played an idling hull 6.5-7.8 LU
         under its full drive at the camera; unsquashed the same law puts
         it 11.6-12.7 LU under (an idling M1A2 at -40.9 LUFS, a harvester
         waiting at a refinery -41.2, an HMMWV -51.4). 0.62 plays HEAD's
         contrast again, 6.6-7.8 LU, with the note and the exhaust still
         opening up on load */
      v.g.gain.setTargetAtTime(sp.gain * v.lvl * (ENGINE_IDLE + (1 - ENGINE_IDLE) * v.spd) * 0.85, now, 0.18);
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
    shot:    function (ac, o, t) { emitReport(ac, o, t, specOf("lmg"), here(0.75)); },
    cannon:  function (ac, o, t) { emitReport(ac, o, t, specOf("gun_105"), here(0.7)); },
    missile: function (ac, o, t) { emitReport(ac, o, t, specOf("atgm_veh"), here(0.7)); },

    /* explode is the most repeated blast in the game: combat.js plays it for
       every detonation over 14 px of aoe near the camera, and game.js for
       every vehicle, aircraft and ship that dies. emitBoom varies its pitch
       and length per call, so a salvo does not machine-gun one sample. */
    explode:     function (ac, o, t) { emitBoom(ac, o, t, 0.45, false, here(0.85)); },
    /* The biggest event there is, and game.js plays it for three: a
       structure lost, an area strike or nuke (more than 3 tiles of aoe), and
       a side capitulating (each of its buildings goes up with a blast). One
       tail has to be true of all three, so it is the aftermath any blast
       that size leaves: everything it threw up coming back down for two
       seconds - the heavy pieces first, low and crumbling, then the lighter
       patter - the low roll of the ground and whatever stood on it
       settling, and a secondary at 0.55 s as something inside cooks off.
       HEAD stacked a second boom 110 ms after the first, which only
       thickened it. */
    explode_big: function (ac, o, t) {
      var sp = here(0.95);
      emitBoom(ac, o, t, 1.0, false, sp);
      grainTrain(ac, o, t + 0.28, 52, 1.9, 180, 2200, 0.032, 0.38, sp.cut, 1.4, 1.2);
      grainTrain(ac, o, t + 0.40, 28, 1.7, 900, 4200, 0.02, 0.15, sp.cut, 3, 1.4);
      lowRoar(ac, o, t + 0.25, 0.5, 650, 50, 0.30, 2.1, 0.60, 2);
      emitBoom(ac, o, t + 0.55, 0.5, false, here(0.62));
    },
    /* Tasteful on purpose: no voice, nothing wet. A man going down is the
       muffled blow, then the body and his kit meeting the ground - a soft
       low thump, a puff of dirt, and the brief clink of a rifle landing. */
    die_inf: function (ac, o, t) {
      var sp = here(0.7);
      emitImpact(ac, o, t, "flesh", 0.5, sp);
      thud(ac, o, t + 0.30, 95, 0.5, 0.14, 0.17);
      hiss(ac, o, t + 0.30, 600, 180, 0.10, 0.12, sp.cut, "lowpass");
      plateModes(ac, o, t + 0.36, 1450 * vary(0.06), [1, 2.76], [1, 0.5], 0.07, 0.035, sp.cut);
    },

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
      id: S.id, kind: S.kind, fam: S.fam, warhead: S.warhead, bore_mm: +S.bore.toFixed(2),
      body_hz: +S.f0.toFixed(1), tail_s: +S.tail.toFixed(3),
      level: +S.level.toFixed(3), crack: +S.crack.toFixed(3),
      thump: +S.thump.toFixed(3), ring: +S.ring.toFixed(2),
      carry_m: +S.refM.toFixed(0), rpm: S.rpm || 0, voice_s: +S.dur.toFixed(3),
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
