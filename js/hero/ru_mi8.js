/* ======= ru_mi8.js - HERO model: the Mil Mi-8 Hip family (redo 2026-10-24) =======
   Five defs, four builds:
     pact_e60_transport  "Mil Mi-8T Hip", e60 (1967)               -> HeroMi8.t
     pact_e80_transport  "Mil Mi-8MT / Mi-17 Hip-H", e80 (1977)    -> HeroMi8.mt80
     pact_e90_transport  "Mil Mi-8MT / Mi-17", e90 ("Unchanged")   -> HeroMi8.mt90
     pact_e00_transport  "Mil Mi-8AMTSh Terminator", e00 (2009)    -> HeroMi8.amtsh
     trans_p             "Mi-8AMTSh Terminator" (rules.js)         -> HeroMi8.amtsh
   asw_helo_p is NOT a stand-in: units3d_air2.js ALIAS lists it against trans_p,
   but js/hero/pact_ka27_helix.js registers its own asw_helo_p after this file.
   Nothing reads a hook or sling node from this model: render3d drawSlings
   hangs the load from footOf() (the lowest point) and the Box3, so the
   undercarriage stays the lowest opaque part.

   REFERENCES (Commons at width=960, one request each, generic UA)
     Drawing: "Mil Mi-8T two-view silhouette" (side and front) and "Mil Mi-8MT
       side-view silhouette". Horizontal scale from the 21.29 m rotor line
       (17.75 px/m, mast 5.4 m behind the nose tip); heights from the ground
       line under the nose wheel at 19.35 px/m, the scale that puts the rotor
       column at the published 4.73 m. Station table below.
     ru.wikipedia "Mi-8": rotor 21.288 m, hub 1.744 m; tail rotor 3.908 m,
       "on the right" on the Mi-8, "on the left on the Mi-8MT, MTV, AMT, with
       blades of increased chord (305 mm)"; height at the rotor column 4.73 m;
       parking angle +3 deg 42'; track 4.5 m; wheelbase 4.258 m; length over
       the blade tips 25.244 m (Mi-8T), 25.31 m (the MT line); dust
       protection (PZU) fitted for dusty strips; Mi-8P/PS passenger versions
       "have rectangular windows" - the military rows here all keep round ones.
     Photographs: Mi-8T "05 red" (port, Monino), Mi-8T "10 yellow" (starboard,
       Patriot park), Mi-8T Gatow (front 3/4), Mi-8MT c/n 93413 (port, faded
       1980s camouflage, plain intakes, oval exhausts), Russian AF Mi-8MT
       "Dvurekov-8" (port, in flight, tail rotor on the port side), Mi-8AMTSh
       at MAKS-2013 (port 3/4), "Mi-8AMTSh 1/2" (front 3/4: dust filters,
       radar nose, outriggers), "Mi-8AMTSh 3/4" (side, rear), RF-95560
       (in flight, belly and gear), Mi-8AMTSh-VA MAKS-2021.

   RECOGNITION LIST (and where each shows)
     1 deep box cabin, flat belly, sides leaning in to the roof    (loft, front)
     2 glazed nose: two big windscreens, side blisters, chin glass (glass mesh)
       - the AMTSh's solid radar snout in place of the chin glass   (AMTSh 1/2)
     3 engine cowl on the roof with the twin round intakes in front,
       the gearbox hump behind them under the mast                   (cowl loft)
     4 dust-filter drums (PZU) only on the AMTSh                      (AMTSh 1/2)
     5 exhaust on each cowl side: round pipe ahead of the mast on the
       Mi-8T, the larger oval one at the mast on the MT line         (photos)
     6 a row of round windows: five each side, and the sliding cabin door
       with its own window on the port side                         (05 red, 10 yellow)
     7 external tanks: the long starboard tank with the KO-50 heater
       nose, the shorter port tank behind the door                   (10 yellow, Dvurekov)
     8 clamshell rear doors under the boom (seams, upswept belly)    (2-view, photos)
     9 long thin boom, swept pylon, tail rotor on the starboard side
       (Mi-8T) or the port side (MT, AMTSh); stabiliser at the boom end (2-view, Dvurekov)
    10 fixed tricycle undercarriage: twin nose wheels, one big main
       wheel each side on an oleo and a V of radius rods           (photos, RF-95560)
    11 five-blade main rotor leaning 4.5 deg forward                (photos)
    12 AMTSh outrigger beams, racks empty                           (MAKS-2013, AMTSh 1)

   VARIANT DECISIONS (each from the photographs above)
     t      starboard pusher tail rotor (0.24 m chord), round exhausts, plain
            intakes, Soviet green over a light blue belly ("05 red": blue under
            the boom), Soviet star.
     mt80   port tractor tail rotor (0.305 m chord), oval exhausts, PLAIN
            intakes (c/n 93413 and the Russian Mi-8MT both have none), sand and
            green 1980s camouflage over light blue-grey (93413, Gatow), star.
     mt90   the same aircraft (the row says "Unchanged"), same finish.
     amtsh  dust filters, radar nose, outrigger beams with three EMPTY racks a
            side, tanks, grey-green / olive / sand camouflage (AMTSh 1/3,
            RF-95560), the bordered Russian star of 2010.
   NOT DRAWN, and why: exhaust suppressors (EVU: listed by ru.wikipedia but no
     photograph here shows them on this type), the cockpit armour (inside the
     airframe), the rear ramp some AMTSh-V display aircraft have ("Mi-8AMTSh
     3/4"; RF-95560 and the MAKS-2013 aircraft show clamshells, and the task's
     rows are drawn with them), square windows (passenger Mi-8P/PS only),
     weapons, bort numbers, titles, Aeroflot paint.

   CORRECTIONS to the old model: the exhausts sat at the cowl's tail pointing
     aft; the photographs put them on the cowl SIDES at the mast. The fuselage
     was 0.2 m too low and the tail rotor 0.75 m too low for the drawing (the
     drawing is in the construction horizontal; parked at +3.7 deg the tail
     comes down 0.82 m, which is how the published 5.54-5.65 m height with the
     tail rotor turning is met). The Mi-8MT had no tanks; every photograph
     shows them. The fixed undercarriage was named "gear" (render3d hides
     "gear" above 18 m, as if retracted): it is "undercarriage" now.

   NAMED NODES (rotor_axes_check):
     rotor      -PI/2 about X inside a group leaning the shaft 4.5 deg forward;
                clockwise from above, as every Mil rotor.
     rotordisc  inside the rotor, a transparent depthWrite:false disc.
     tailrotor  +PI/2 about X for the port tractor (MT line), -PI/2 for the
                starboard pusher (Mi-8T); one blade built pointing aft.
     undercarriage  the fixed tricycle gear; the lowest opaque part.
   len is the measured X extent with the rotors turning: main disc front to
   the aft tail rotor tip (25.268 m Mi-8T, 25.328 m MT line; published 25.244
   and 25.31 m). Model space: +X nose, +Y port, +Z up, metres; origin under
   the mast, 2.00 m above the wheel contact plane. Materials: SKIN (canvas
   texture per scheme), METAL, DARK, BLADE, RUBBER, GLASS, TEAM (exactly
   C.team), DISC, MARK (vertex-coloured star). ASCII only.                  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMi8 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ datums */
  var GROUND = -2.00;
  function Z(h) { return GROUND + h; }
  var X_NOSE = 5.40;                       /* nose tip, ahead of the mast   */
  var HUB_H = 4.45, ROTOR_R = 10.644, CHORD = 0.52, MAST_TILT = 4.5 * D2R;
  var TR_R = 1.954, TR_H = 4.45;
  var NW_X = 2.86, NW_R = 0.2975, NW_W = 0.185, NW_Y = 0.24;   /* 595 x 185 */
  var MW_X = -1.40, MW_Y = 2.25, MW_R = 0.4325, MW_W = 0.28;   /* 865 x 280 */
  var WIN_X = [2.03, 1.00, 0.05, -0.60, -1.60], WIN_Z = 1.95, WIN_R = 0.19;
  var DOOR = { x0: 3.23, x1: 2.29, z0: 0.86, z1: 2.26, wx: 2.76 };

  var VARIANTS = {
    t:     { key: "t",     side: -1, trx: -12.70, trc: 0.24,  oval: false, pzu: false, radar: false,
             rig: false, star: "soviet",  scheme: "t" },
    mt80:  { key: "mt80",  side:  1, trx: -12.76, trc: 0.305, oval: true,  pzu: false, radar: false,
             rig: false, star: "soviet",  scheme: "mt" },
    mt90:  { key: "mt90",  side:  1, trx: -12.76, trc: 0.305, oval: true,  pzu: false, radar: false,
             rig: false, star: "soviet",  scheme: "mt" },
    amtsh: { key: "amtsh", side:  1, trx: -12.76, trc: 0.305, oval: true,  pzu: true,  radar: true,
             rig: true,  star: "russian", scheme: "amtsh" },
    /* the PLA's Mi-17 / Mi-171 bought from Russia (pla_e90_transport): the mt90 airframe,
       NO star (the PLAAF star-and-bars is not drawn, no reference fetched; the KPA rows'
       rule); the paint is the mt scheme, NOT confirmed for PLA aircraft */
    pla:   { key: "pla",   side:  1, trx: -12.76, trc: 0.305, oval: true,  pzu: false, radar: false,
             rig: false, star: null,      scheme: "mt" }
  };

  /* Paint, sampled off the photographs and taken to about 0.8 of their
     level for the ACES pass: t from "05 red" (green, blue under the boom),
     mt from c/n 93413 and Gatow (sand and green, light belly), amtsh from
     "Mi-8AMTSh 1/3" and RF-95560 (grey-green, olive, sand). */
  var SCHEMES = {
    t:     { key: "t",     base: "#4b603a", c1: null,      c2: null,      belly: "#71838e", seed: 8017 },
    mt:    { key: "mt",    base: "#7a6f55", c1: "#4a5636", c2: null,      belly: "#6f7d86", seed: 8077 },
    amtsh: { key: "amtsh", base: "#6f735c", c1: "#4d5340", c2: "#857f61", belly: "#5f634f", seed: 8209 }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, model metres:
       band 0 TOP (x across, y down), 1 PORT side (x, z), 2 STARBOARD (x, z),
       3 BELLY (x, y). projUV() picks the band from each face normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -15.0, UX1 = 6.2, QY = 2.9;
  var QZ0 = Z(0.30), QZ1 = Z(4.90);
  var SX = TW / (UX1 - UX0), SZ = BAND / (QZ1 - QZ0);
  function pxX(x) { return (x - UX0) * SX; }
  function pyTop(y) { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y) { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function skinCanvas(SC) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed), i, b, x;
    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);
    /* camouflage: soft-edged blobs, larger along the airframe */
    function blobs(col, n) {
      if (!col) return;
      g.fillStyle = col;
      for (i = 0; i < n; i++) {
        var cx = R() * TW, cy = R() * 3 * BAND, rx = (0.9 + R() * 1.6) * SX, ry = 22 + R() * 40;
        g.beginPath();
        for (var k = 0; k < 14; k++) {
          var a = k / 14 * PI * 2, q = 0.7 + R() * 0.45;
          var px = cx + Math.cos(a) * rx * q, py = cy + Math.sin(a) * ry * q;
          if (k) g.lineTo(px, py); else g.moveTo(px, py);
        }
        g.closePath(); g.fill();
      }
    }
    blobs(SC.c1, 46);
    blobs(SC.c2, 30);
    /* the belly colour, and a weathered top */
    g.fillStyle = SC.belly; g.fillRect(0, 3 * BAND, TW, BAND);
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    /* panel-to-panel shade */
    for (i = 0; i < 140; i++) {
      g.fillStyle = (i & 1) ? "rgba(255,255,240,0.05)" : "rgba(0,0,0,0.06)";
      g.fillRect(R() * TW, R() * TH, (0.4 + R() * 1.2) * SX, 8 + R() * 26);
    }
    /* exhaust soot down the boom from the cowl sides */
    var sg = g.createLinearGradient(pxX(0.2), 0, pxX(-6.0), 0);
    sg.addColorStop(0, "rgba(18,16,14,0.45)"); sg.addColorStop(1, "rgba(18,16,14,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-6.0), pyTop(1.1), pxX(0.2) - pxX(-6.0), pyTop(-1.1) - pyTop(1.1));
    for (b = 1; b <= 2; b++) g.fillRect(pxX(-6.0), pySide(Z(3.9), b), pxX(0.2) - pxX(-6.0), pySide(Z(2.9), b) - pySide(Z(3.9), b));
    /* frames and stringers */
    var frames = [4.45, 3.62, 3.23, 2.29, 1.55, 0.52, -0.30, -1.10, -2.10, -2.32, -3.20, -4.20,
                  -5.40, -5.85, -6.80, -7.80, -8.80, -9.80, -10.80, -11.40];
    g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.fillStyle = "rgba(150,150,140,0.16)";
      for (var yy = 3; yy < TH; yy += 7) g.fillRect(x - 4, yy, 1.4, 1.4);
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    [0.95, 1.45, 2.48, 2.80, 3.30].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var y = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(-5.6), y); g.lineTo(pxX(3.6), y); g.stroke();
      }
    });
    /* cowl hatches on the roof: the engine and gearbox panels */
    g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.6;
    [[3.30, 1.45], [1.40, -1.75]].forEach(function (p) {
      [0.62, -0.62].forEach(function (q) {
        g.beginPath(); g.moveTo(pxX(p[0]), pyTop(q)); g.lineTo(pxX(p[1]), pyTop(q)); g.stroke();
      });
    });
    for (b = 1; b <= 2; b++) {
      g.strokeRect(pxX(3.25), pySide(Z(3.45), b), pxX(1.45) - pxX(3.25), pySide(Z(2.92), b) - pySide(Z(3.45), b));
      g.strokeRect(pxX(1.35), pySide(Z(3.90), b), pxX(-1.70) - pxX(1.35), pySide(Z(2.92), b) - pySide(Z(3.90), b));
    }
    /* the sliding cabin door (port) with its rail; the clamshell doors on
       both sides, forward edge curving up behind the last window */
    function rect(b, x0, x1, h0, h1, w) {
      g.strokeStyle = "rgba(0,0,0,0.58)"; g.lineWidth = w || 2.2;
      g.strokeRect(pxX(x0), pySide(Z(h1), b), pxX(x1) - pxX(x0), pySide(Z(h0), b) - pySide(Z(h1), b));
    }
    rect(1, DOOR.x1, DOOR.x0, DOOR.z0, DOOR.z1);
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 3;
    g.beginPath(); g.moveTo(pxX(DOOR.x1), pySide(Z(2.33), 1)); g.lineTo(pxX(0.70), pySide(Z(2.33), 1)); g.stroke();
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.4;
      g.beginPath();
      g.moveTo(pxX(-2.45), pySide(Z(0.85), b));
      g.quadraticCurveTo(pxX(-2.20), pySide(Z(2.10), b), pxX(-2.70), pySide(Z(2.78), b));
      g.lineTo(pxX(-5.70), pySide(Z(2.78), b));
      g.stroke();
      /* window rims */
      for (i = 0; i < WIN_X.length; i++) {
        g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.5;
        g.beginPath(); g.ellipse(pxX(WIN_X[i]), pySide(Z(WIN_Z), b), (WIN_R + 0.06) * SX, (WIN_R + 0.06) * SZ, 0, 0, PI * 2); g.stroke();
      }
    }
    /* the clamshell seam along the belly */
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2.4;
    g.beginPath(); g.moveTo(pxX(-2.5), pyBelly(0)); g.lineTo(pxX(-5.8), pyBelly(0)); g.stroke();
    /* walkway lines along the cowl top */
    g.strokeStyle = "rgba(10,10,8,0.35)"; g.lineWidth = 1.1;
    [0.30, -0.30].forEach(function (q) {
      g.beginPath(); g.moveTo(pxX(3.2), pyTop(q)); g.lineTo(pxX(1.5), pyTop(q)); g.stroke();
    });
    return cv;
  }
  var _cv = {}, _tex = {};
  function skinTexture(SC) {
    var k = SC.key;
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(SC);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[k] = t;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.62 ? 0 : nz < -0.62 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0) { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else { U = pxX(endOn ? x + Math.abs(y) * 0.5 : x); W = pySide(z, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, VR) {
    var SC = SCHEMES[VR.scheme], tex = skinTexture(SC), m = {};
    m.skin   = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.07 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.32 });
    m.blade  = new V.MeshStandardMaterial({ color: 0x383c38, roughness: 0.78, metalness: 0.14 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x0e0f0f, roughness: 0.95, metalness: 0.02 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1b262b, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    m.mark   = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.7, metalness: 0.02 });
    return m;
  }

  /* ---------------------------------------------------- geometry kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2); else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
      if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name, uvFn) {
    if (!list.length) return null;
    var geo = merge(list);
    if (uvFn) uvFn(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* a station: x, belly / crown / widest heights (above the ground), the
     half-widths at the belly, the widest line and the crown, and the
     superellipse exponent */
  function sec(x, zb, zt, zm, wb, wm, wt, e) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e), z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    return pts;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], rl = 2 * n, i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], r = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += r[j][0]; cz += r[j][1]; }
      var o = [s.x + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function secAt(secs, x) {
    if (x >= secs[0].x) return secs[0];
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return secs[secs.length - 1];
  }
  function bracket(secs, x) {
    if (x >= secs[0].x) return [secs[0], secs[0], 0];
    for (var q = 0; q < secs.length - 1; q++)
      if (x <= secs[q].x && x >= secs[q + 1].x) return [secs[q], secs[q + 1], (secs[q].x - x) / (secs[q].x - secs[q + 1].x)];
    var L = secs[secs.length - 1];
    return [L, L, 0];
  }
  /* the angle on a station's ring at absolute height z (upper or lower half) */
  function thAt(s, z) {
    if (z >= s.zm) {
      var u = Math.min(1, (z - s.zm) / Math.max(0.01, s.zt - s.zm));
      return Math.asin(Math.pow(u, 1 / s.e));
    }
    var l = Math.min(1, (s.zm - z) / Math.max(0.01, s.zm - s.zb));
    return -Math.asin(Math.pow(l, 1 / s.e));
  }
  function sideY(secs, x, z) { var s = secAt(secs, x); return ringPt(s, thAt(s, z))[0]; }
  /* a skin-following patch over x0..x1 and heights z0..z1 (above the
     ground) on one side
     (sgn), stood `off` metres proud - glazing and its frames */
  function patch(secs, sgn, x0, x1, z0, z1, nx, nz, off) {
    var P = [], i, j, out = [];
    for (i = 0; i <= nx; i++) {
      var x = x0 + (x1 - x0) * i / nx, s = secAt(secs, x), row = [], br = bracket(secs, x);
      for (j = 0; j <= nz; j++) {
        /* on the lofted facets themselves: the same ring angle on the two
           stations either side, blended linearly as the loft joins them */
        var th = thAt(s, Z(z0 + (z1 - z0) * j / nz));
        var pa = ringPt(br[0], th), pb = ringPt(br[1], th);
        var p = [pa[0] + (pb[0] - pa[0]) * br[2], pa[1] + (pb[1] - pa[1]) * br[2]];
        /* stand off along the surface normal, fore-and-aft slope included */
        var dxs = br[0].x - br[1].x, sl = 0;
        if (dxs > 0.01) sl = (Math.hypot(pa[0], pa[1] - br[0].zm) - Math.hypot(pb[0], pb[1] - br[1].zm)) / dxs;
        var nn = Math.sqrt(1 + sl * sl);
        var ny = Math.cos(th) / nn, nz2 = Math.sin(th) / nn;
        row.push([x - off * sl / nn, sgn * (p[0] + off * ny), p[1] + off * nz2]);
      }
      P.push(row);
    }
    for (i = 0; i < nx; i++) for (j = 0; j < nz; j++) {
      var a = P[i][j], b = P[i + 1][j], c = P[i + 1][j + 1], d = P[i][j + 1];
      /* outward: away from the station's centre line */
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
      var ny2 = uz * vx - ux * vz, nzz = ux * vy - uy * vx;
      var cz = secAt(secs, a[0]).zm;
      var o = ny2 * a[1] + nzz * (a[2] - cz);
      if (o >= 0) out.push(a, b, c, a, c, d); else out.push(a, c, b, a, d, c);
    }
    return tris(out);
  }

  /* flat national star: Soviet red / white / red rim, or the Russian
     2010 star with the blue rim; one vertex-coloured mesh */
  function starLayers(list, cx, cz, y, sgn, r, kind, tilt) {
    var layers = kind === "soviet"
      ? [[1.24, [0.66, 0.15, 0.12]], [1.12, [0.88, 0.88, 0.85]], [1.0, [0.70, 0.16, 0.13]]]
      : [[1.26, [0.10, 0.18, 0.46]], [1.14, [0.88, 0.88, 0.85]], [1.0, [0.70, 0.16, 0.13]]];
    layers.forEach(function (L, li) {
      var pts = [], i, a, q, d0 = 0.012 * (li + 1);
      for (i = 0; i < 10; i++) {
        a = PI / 2 + i * PI / 5; q = (i & 1) ? 0.40 : 1;
        pts.push([cx + Math.cos(a) * q * r * L[0], Math.sin(a) * q * r * L[0]]);
      }
      var pos = [], col = [], nor = [];
      var cy = Math.cos(tilt), sz = Math.sin(tilt);
      function P(px, pv) { return [px, sgn * (y + d0 - pv * sz), cz + pv * cy]; }
      for (i = 0; i < 10; i++) {
        var p1 = pts[i], p2 = pts[(i + 1) % 10];
        var tri = [P(cx, 0), P(p1[0], p1[1]), P(p2[0], p2[1])];
        var ux = tri[1][0] - tri[0][0], uy = tri[1][1] - tri[0][1], uz = tri[1][2] - tri[0][2];
        var vx = tri[2][0] - tri[0][0], vy = tri[2][1] - tri[0][1], vz = tri[2][2] - tri[0][2];
        var ny = uz * vx - ux * vz;
        if (ny * sgn < 0) { var t = tri[1]; tri[1] = tri[2]; tri[2] = t; }
        for (var k = 0; k < 3; k++) {
          pos.push(tri[k][0], tri[k][1], tri[k][2]);
          nor.push(0, sgn * cy, sz); col.push(L[1][0], L[1][1], L[1][2]);
        }
      }
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      g.setAttribute("color", new V.Float32BufferAttribute(col, 3));
      list.push(g);
    });
  }
  function mergeColored(list) {
    var pos = [], nor = [], col = [], i, j;
    for (i = 0; i < list.length; i++) {
      var p = list[i].attributes.position.array, n = list[i].attributes.normal.array, c = list[i].attributes.color.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); col.push(c[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("color", new V.Float32BufferAttribute(col, 3));
    return out;
  }

  /* ======================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "mi8" + VR.key;
    var i, k, a;
    var skin = [], dark = [], metal = [], team = [], glass = [], marks = [];
    var gearM = [], gearR = [];

    /* ---------------------------------------------- the main fuselage --
       STATION TABLE from the Mi-8T two-view (x = (199 - px) / 17.75, height
       = (139.5 - py) / 19.35): nose tip 5.40; cockpit roof 2.82; belly 0.85
       flat to x -2.2, then the clamshell upsweep (0.95 at -2.65, 1.16 at
       -3.55, 1.74 at -4.45, 2.61 at -5.35); boom 2.71-3.57 deep at -7.2,
       2.97-3.55 at -11.2. Widths from the front view: 2.5 m across the cabin
       at the widest, the sides leaning in to a 1.9 m roof. */
    var fus = [
      sec( 5.40, 1.26, 1.74, 1.48, 0.10, 0.15, 0.09, 1.0),
      sec( 5.26, 1.10, 2.00, 1.50, 0.40, 0.52, 0.34, 0.95),
      sec( 5.05, 0.98, 2.27, 1.52, 0.64, 0.78, 0.52, 0.85),
      sec( 4.80, 0.90, 2.49, 1.55, 0.84, 0.99, 0.68, 0.75),
      sec( 4.48, 0.86, 2.64, 1.55, 0.99, 1.12, 0.80, 0.65),
      sec( 4.08, 0.84, 2.76, 1.55, 1.08, 1.20, 0.88, 0.56),
      sec( 3.55, 0.83, 2.82, 1.55, 1.12, 1.24, 0.93, 0.5),
      sec( 2.80, 0.83, 2.84, 1.55, 1.14, 1.25, 0.95, 0.46),
      sec(-2.10, 0.83, 2.84, 1.55, 1.14, 1.25, 0.95, 0.46),
      sec(-2.65, 0.95, 3.30, 1.75, 1.04, 1.16, 0.74, 0.5),
      sec(-3.15, 1.03, 3.46, 1.95, 0.94, 1.06, 0.62, 0.55),
      sec(-3.65, 1.20, 3.53, 2.15, 0.82, 0.94, 0.55, 0.6),
      sec(-4.20, 1.55, 3.56, 2.42, 0.67, 0.79, 0.50, 0.66),
      sec(-4.70, 2.05, 3.57, 2.72, 0.54, 0.64, 0.46, 0.72),
      sec(-5.25, 2.55, 3.57, 3.00, 0.45, 0.51, 0.42, 0.8),
      sec(-5.85, 2.68, 3.57, 3.10, 0.41, 0.45, 0.39, 0.85),
      sec(-7.20, 2.72, 3.57, 3.14, 0.37, 0.41, 0.35, 0.9),
      sec(-9.40, 2.86, 3.56, 3.21, 0.31, 0.34, 0.29, 0.95),
      sec(-11.25, 2.97, 3.55, 3.26, 0.26, 0.29, 0.25, 0.95),
      sec(-11.75, 3.10, 3.60, 3.35, 0.22, 0.24, 0.21, 0.95)
    ];
    loft(fus, 18, 0.05, 0.04).forEach(function (q) { skin.push(q); });

    /* the nose glazing, laid on the loft: two windscreens over the nose
       top, the pilots' sliding blisters, and the chin glass of the Mi-8T/MT;
       the AMTSh's radar snout instead of the chin glass */
    [1, -1].forEach(function (sg) {
      glass.push(patch(fus, sg, 4.52, 5.18, 1.86, 2.75, 6, 6, 0.035));
      glass.push(patch(fus, sg, 3.70, 4.44, 1.80, 2.52, 5, 4, 0.05));
      if (!VR.radar) glass.push(patch(fus, sg, 4.96, 5.38, 1.08, 1.78, 4, 5, 0.035));
      /* frames: windscreen sill and the bar between screen and blister */
      dark.push(patch(fus, sg, 4.46, 4.54, 1.80, 2.66, 1, 4, 0.06));
      dark.push(patch(fus, sg, 4.52, 5.18, 1.82, 1.88, 6, 1, 0.05));
      dark.push(patch(fus, sg, 3.68, 4.46, 1.76, 1.82, 4, 1, 0.065));
      dark.push(patch(fus, sg, 4.04, 4.10, 1.80, 2.52, 1, 3, 0.07));
      if (!VR.radar) dark.push(patch(fus, sg, 5.12, 5.16, 1.08, 1.80, 1, 3, 0.05));
    });
    /* windscreen centre post */
    dark.push(box(0.62, 0.07, 0.06, 4.86, 0, Z(2.40), 0, 0.72, 0));
    if (VR.radar) {
      /* the radar snout of the AMTSh ("Mi-8AMTSh 1/2"): a blunt nose
         below the windscreens, a little ahead of the glazed nose's tip */
      skin.push(sph(0.62, 18, 10, 5.25, 0, Z(1.36), 1.25, 1.02, 0.66));
    }
    /* landing lamps under the nose; pitot booms on the nose top corners */
    glass.push(sph(0.09, 10, 6, 4.70, 0.35, Z(0.88), 1, 1, 0.6));
    glass.push(sph(0.09, 10, 6, 4.70, -0.35, Z(0.88), 1, 1, 0.6));
    both(metal, bar([4.90, 0.42, Z(2.30)], [5.55, 0.46, Z(2.25)], 0.018, 6, true));

    /* round cabin windows, five a side; the sliding door's window (port) */
    function windowAt(x, sgn) {
      var w = sideY(fus, x, Z(WIN_Z)), w2 = sideY(fus, x, Z(WIN_Z + 0.2));
      var lean = Math.atan2(w - w2, 0.2);        /* the side leans in to the roof */
      var d = new V.CircleGeometry(WIN_R, 18);
      d.rotateX(-PI / 2); d.rotateX(lean);
      d.translate(x, w + 0.012, Z(WIN_Z));
      var rg = new V.RingGeometry(WIN_R, WIN_R + 0.045, 18);
      rg.rotateX(-PI / 2); rg.rotateX(lean);
      rg.translate(x, w + 0.016, Z(WIN_Z));
      glass.push(sgn > 0 ? d : mirrorY(d));
      dark.push(sgn > 0 ? rg : mirrorY(rg));
    }
    for (i = 0; i < WIN_X.length; i++) { windowAt(WIN_X[i], 1); windowAt(WIN_X[i], -1); }
    windowAt(DOOR.wx, 1);
    /* the door handle and step (port) */
    var dw = sideY(fus, DOOR.x1 + 0.1, Z(1.5));
    metal.push(box(0.16, 0.05, 0.05, DOOR.x1 + 0.12, dw + 0.03, Z(1.55)));
    metal.push(box(0.50, 0.30, 0.05, (DOOR.x0 + DOOR.x1) / 2, 1.30, Z(0.62)));

    /* ------------------------------------------- engine cowl and hump --
       2-view: the cowl front (intakes) at x 3.44 rising to 3.54; the main
       gearbox hump 3.95-3.98 from x 1.41 to -1.75; down to the boom top
       (3.57) by -2.6. */
    var cowl = [
      sec( 3.52, 2.80, 3.36, 3.08, 0.60, 0.74, 0.56, 0.75),
      sec( 3.30, 2.80, 3.48, 3.12, 0.82, 0.90, 0.68, 0.65),
      sec( 2.50, 2.80, 3.54, 3.14, 0.90, 0.94, 0.72, 0.58),
      sec( 1.55, 2.80, 3.55, 3.14, 0.90, 0.94, 0.72, 0.58),
      sec( 1.35, 2.80, 3.84, 3.20, 0.90, 0.94, 0.62, 0.6),
      sec( 0.90, 2.80, 3.97, 3.25, 0.90, 0.93, 0.58, 0.6),
      sec(-1.40, 2.80, 3.98, 3.25, 0.88, 0.92, 0.58, 0.6),
      sec(-1.80, 2.80, 3.90, 3.25, 0.84, 0.88, 0.56, 0.62),
      sec(-2.25, 2.95, 3.68, 3.28, 0.66, 0.70, 0.48, 0.66),
      sec(-2.70, 3.15, 3.58, 3.33, 0.46, 0.48, 0.40, 0.72)
    ];
    loft(cowl, 14, 0.06, 0.10).forEach(function (q) { skin.push(q); });
    /* the oil-cooler fan grille on the hump's back; the post antenna */
    dark.push(patch(cowl, 1, -1.15, -1.70, 3.80, 3.99, 3, 2, 0.03));
    dark.push(patch(cowl, -1, -1.15, -1.70, 3.80, 3.99, 3, 2, 0.03));
    metal.push(bar([2.0, 0, Z(3.53)], [2.12, 0, Z(4.15)], 0.014, 5, true));
    /* two forward intakes; the AMTSh's dust-filter drums ahead of them */
    [1, -1].forEach(function (sg) {
      var ix = 3.46, iy = sg * 0.40, iz = Z(3.12);
      if (VR.pzu) {
        skin.push(cyl(0.40, 0.40, 0.92, 16, "x", ix + 0.40, sg * 0.45, iz));
        skin.push(sph(0.40, 16, 8, ix + 0.86, sg * 0.45, iz, 0.42, 1, 1));
        dark.push(cyl(0.405, 0.405, 0.08, 20, "x", ix + 0.62, sg * 0.45, iz, true));
        metal.push(cyl(0.41, 0.41, 0.04, 20, "x", ix + 0.10, sg * 0.45, iz, true));
      } else {
        /* the plain intakes: big round mouths standing ahead of the cowl
           over the cockpit roof, about 0.75 m across (Gatow, c/n 93413) */
        skin.push(cyl(0.36, 0.34, 0.46, 20, "x", ix + 0.14, iy, iz, true));
        metal.push(cyl(0.38, 0.38, 0.07, 20, "x", ix + 0.38, iy, iz, true));
        dark.push(place(new V.CircleGeometry(0.34, 18), ix + 0.30, iy, iz, 0, PI / 2, 0));
        metal.push(sph(0.13, 10, 6, ix + 0.30, iy, iz, 1.4, 1, 1));
      }
      /* the exhaust on the cowl side: a round pipe ahead of the mast on the
         Mi-8T ("10 yellow", "05 red"), the larger oval one at the mast on
         the MT line (c/n 93413) - each turned out and aft */
      var exX = VR.oval ? 0.10 : 0.55;
      var ex = new V.CylinderGeometry(0.27, 0.27, 0.44, 18, 1, true);
      if (VR.oval) ex.scale(1, 1, 1.40);
      ex.rotateZ(-PI / 2);                       /* along +x */
      ex.rotateZ(sg * 120 * D2R);                /* turned out and aft */
      var oy = sideY(cowl, exX, Z(3.15));
      ex.translate(exX - 0.10, sg * (oy + 0.12), Z(3.15));
      metal.push(ex);
      var exd = new V.CircleGeometry(0.25, 18);
      if (VR.oval) exd.scale(1.40, 1, 1);
      exd.rotateY(PI / 2); exd.rotateZ(sg * 120 * D2R);
      exd.translate(exX - 0.10 - 0.21 * 0.5, sg * (oy + 0.12 + 0.21 * 0.866), Z(3.15));
      dark.push(exd);
      /* fairing collar where the pipe leaves the cowl */
      skin.push(sph(0.36, 14, 8, exX, sg * (oy - 0.02), Z(3.15), 1.2, 0.55, VR.oval ? 1.4 : 1.0));
    });
    /* the mast shroud under the head, leaned with the shaft */
    var tiltM = new V.Matrix4().makeRotationY(MAST_TILT).premultiply(new V.Matrix4().makeTranslation(0, 0, Z(HUB_H)));
    [cyl(0.30, 0.26, 0.55, 18, "z", 0, 0, -0.40), cyl(0.46, 0.46, 0.08, 20, "z", 0, 0, -0.66)].forEach(function (q) {
      q.applyMatrix4(tiltM); metal.push(q);
    });

    /* ----------------------------------------- pylon, tail rotor, tail --
       2-view: the leading edge sweeps from (-11.3, 3.57) to the tail
       rotor gearbox at the top, the trailing edge from (-11.9, 3.0). */
    var TRX = VR.trx, TRY = VR.side * 0.50;
    var pyl = [[-11.20, 3.57], [-12.42, 4.66], [-12.92, 4.66], [-12.98, 4.36], [-12.10, 3.05], [-11.60, 2.98]];
    var pA = pyl.map(function (p, j) { return [p[0], j < 3 ? 0.13 : 0.10, Z(p[1])]; });
    var pB = pA.map(function (p) { return [p[0], -p[1], p[2]]; });
    skin.push(solid(pA, pB));
    /* the tail rotor gearbox on the pylon's top, and its output shaft */
    metal.push(sph(0.20, 14, 8, TRX, 0, Z(TR_H), 1.3, 1.0, 0.9));
    metal.push(bar([TRX, VR.side * 0.10, Z(TR_H)], [TRX, VR.side * 0.40, Z(TR_H)], 0.075, 10, true));
    /* stabiliser at the boom end, under the pylon (2-view, AMTSh 3) */
    var stab = [[-10.55, 0.12], [-10.75, 1.36], [-11.25, 1.36], [-11.40, 0.12]];
    var sA = stab.map(function (p) { return [p[0], p[1], Z(3.02) + 0.04]; });
    var sB = stab.map(function (p) { return [p[0], p[1], Z(3.02) - 0.04]; });
    both(skin, solid(sA, sB));
    /* team flash: a strip on the top of each stabiliser half */
    both(team, box(0.42, 0.70, 0.012, -10.95, 0.80, Z(3.02) + 0.046));
    /* tail bumper under the boom end, and the Doppler fairing under the boom root */
    metal.push(bar([-10.45, 0, Z(2.95)], [-10.95, 0, Z(2.22)], 0.045, 8, true));
    metal.push(bar([-11.30, 0, Z(3.0)], [-10.98, 0, Z(2.22)], 0.035, 8, true));
    metal.push(box(0.42, 0.14, 0.05, -10.98, 0, Z(2.20)));
    skin.push(box(0.70, 0.55, 0.12, -6.45, 0, Z(2.68)));
    /* antennas: a whip under the belly, a blade over the boom root */
    metal.push(bar([-1.0, 0, Z(0.83)], [-1.6, 0, Z(0.55)], 0.012, 4, true));
    metal.push(box(0.30, 0.03, 0.30, -6.20, 0, Z(3.70)));

    /* star on the clamshell door, both sides (05 red, 10 yellow, RF-95560) */
    var stx = -3.05, stz = Z(2.05);
    var sy0 = sideY(fus, stx, stz), sy1 = sideY(fus, stx, stz + 0.2);
    var lean = Math.atan2(sy0 - sy1, 0.2);
    if (VR.star) {
      starLayers(marks, stx, stz, sy0, 1, 0.34, VR.star, lean);
      starLayers(marks, stx, stz, sy0, -1, 0.34, VR.star, lean);
    }

    /* --------------------------------------------------- external tanks --
       Starboard (y-): the long tank with the KO-50 heater in its nose,
       x -1.8 to 3.6 ("10 yellow"); port: the shorter tank behind the
       door, x 0.55 to -2.85 (Dvurekov, 05 red). */
    function tank(sgn, x0, x1, r) {
      var L = x0 - x1, cx = (x0 + x1) / 2, ty = sgn * 1.53, tz = Z(1.05);
      skin.push(cyl(r, r, L - 2 * r * 0.8, 16, "x", cx, ty, tz, true));
      skin.push(sph(r, 16, 8, x0 - r * 0.8, ty, tz, 0.8, 1, 1));
      skin.push(sph(r, 16, 8, x1 + r * 0.8, ty, tz, 0.8, 1, 1));
      [x0 - L * 0.28, x1 + L * 0.28].forEach(function (bx) {
        metal.push(cyl(r + 0.012, r + 0.012, 0.05, 20, "x", bx, ty, tz, true));
        metal.push(bar([bx, sgn * 1.17, Z(1.25)], [bx, ty, tz + r * 0.6], 0.035, 6, true));
      });
      metal.push(cyl(0.06, 0.06, 0.04, 10, "z", cx, ty, tz + r));
    }
    tank(1, 0.55, -2.85, 0.36);
    tank(-1, 2.30, -1.80, 0.36);
    /* the heater's nose ahead of the starboard tank, its intake */
    skin.push(cyl(0.27, 0.34, 1.05, 18, "x", 2.80, -1.53, Z(1.05), true));
    skin.push(sph(0.27, 16, 8, 3.33, -1.53, Z(1.05), 0.9, 1, 1));
    dark.push(place(new V.CircleGeometry(0.10, 12), 3.57, -1.53, Z(1.05), 0, PI / 2, 0));

    if (VR.rig) {
      /* outrigger beam each side above the tank, three racks under it,
         EMPTY (MAKS-2013, "Mi-8AMTSh 1") */
      [1, -1].forEach(function (sg) {
        var bz = Z(1.92), bx = -0.40;
        var bA = [[bx + 0.30, sg * 1.18, bz], [bx + 0.30, sg * 2.78, bz - 0.12], [bx - 0.30, sg * 2.78, bz - 0.12], [bx - 0.30, sg * 1.18, bz]];
        var bB = bA.map(function (p) { return [p[0], p[1], p[2] + 0.11]; });
        skin.push(solid(bA, bB));
        metal.push(bar([bx + 0.20, sg * 1.20, Z(1.38)], [bx + 0.15, sg * 2.20, bz - 0.06], 0.035, 6, true));
        metal.push(bar([bx - 0.20, sg * 1.20, Z(1.38)], [bx - 0.25, sg * 2.20, bz - 0.06], 0.035, 6, true));
        [1.62, 2.12, 2.60].forEach(function (ry) {
          metal.push(box(0.62, 0.10, 0.20, bx, sg * ry, bz - 0.06 * (ry - 1.18) / 1.6 - 0.14));
          dark.push(box(0.48, 0.04, 0.05, bx, sg * ry, bz - 0.06 * (ry - 1.18) / 1.6 - 0.26));
        });
      });
    }

    /* ----------------------------------------------- the undercarriage --
       Fixed tricycle (it stays down in flight), so NOT named "gear":
       twin nose wheels on a vertical oleo; each main wheel on an oleo up to
       the fuselage side outboard of the tank and a V of radius rods to the
       belly (05 red, RF-95560). Track 4.5 m, wheelbase 4.258 m. */
    var und = new V.Group();
    und.name = "undercarriage";
    g.add(und);
    both(gearR, cyl(NW_R, NW_R, NW_W, 22, "y", NW_X, NW_Y, Z(NW_R)));
    both(gearM, cyl(0.17, 0.17, NW_W + 0.01, 14, "y", NW_X, NW_Y, Z(NW_R)));
    gearM.push(cyl(0.04, 0.04, 2 * NW_Y + 0.10, 8, "y", NW_X, 0, Z(NW_R)));
    gearM.push(bar([NW_X - 0.06, 0, Z(0.86)], [NW_X, 0, Z(NW_R)], 0.065, 8, true));
    gearM.push(bar([NW_X + 0.30, 0, Z(0.86)], [NW_X, 0, Z(NW_R + 0.05)], 0.035, 6, true));
    gearM.push(box(0.16, 0.30, 0.10, NW_X, 0, Z(NW_R + 0.18)));
    both(gearR, cyl(MW_R, MW_R, MW_W, 26, "y", MW_X, MW_Y, Z(MW_R)));
    both(gearM, cyl(0.25, 0.25, MW_W + 0.01, 18, "y", MW_X, MW_Y, Z(MW_R)));
    both(gearM, cyl(0.07, 0.07, MW_W + 0.10, 8, "y", MW_X, MW_Y, Z(MW_R)));
    var axl = [MW_X, MW_Y - MW_W / 2 - 0.04, Z(MW_R)];
    both(gearM, bar(axl, [MW_X + 0.30, 1.28, Z(2.08)], 0.085, 10, true));    /* oleo */
    both(gearM, bar(axl, [MW_X + 0.85, 0.92, Z(0.86)], 0.050, 8, true));     /* front rod */
    both(gearM, bar(axl, [MW_X - 0.75, 0.92, Z(0.86)], 0.050, 8, true));     /* rear rod */
    mesh(und, gearM, T.metal, "undercarriage_struts");
    mesh(und, gearR, T.rubber, "tyres");

    /* ------------------------------------------------ airframe meshes -- */
    mesh(g, skin, T.skin, "airframe", projUV);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");
    if (marks.length) {
      var mk = new V.Mesh(mergeColored(marks), T.mark);
      mk.name = "markings";
      g.add(mk);
    }

    /* ============================================================ rotor == */
    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    var mnt = new V.Group();
    mnt.rotation.x = -PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);
    var hubM = [], blades = [];
    hubM.push(cyl(0.30, 0.34, 0.32, 16, "z", 0, 0, 0));
    hubM.push(cyl(0.40, 0.40, 0.05, 16, "z", 0, 0, -0.30));
    hubM.push(cyl(0.14, 0.16, 0.30, 10, "z", 0, 0, 0.26));
    /* the blade: 0.52 m chord, leading edge on -Y (clockwise from above);
       roots at the 1.744 m hub's hinges */
    var BP = [[0.95, -0.13], [1.30, -0.16], [ROTOR_R - 0.10, -0.16], [ROTOR_R, -0.10],
              [ROTOR_R, CHORD - 0.20], [ROTOR_R - 0.06, CHORD - 0.16], [1.30, CHORD - 0.16], [0.95, 0.24]];
    for (k = 0; k < 5; k++) {
      a = (36 + 72 * k) * D2R;
      var bl = M.slab(V, BP, 0.035);
      bl.translate(0, 0, -0.02);
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [box(0.56, 0.22, 0.17, 0.52, 0, 0), box(0.34, 0.28, 0.13, 0.88, 0.05, 0),
                   cyl(0.05, 0.05, 0.56, 8, "x", 0.58, 0.22, 0.04),
                   box(0.20, 0.42, 0.05, ROTOR_R - 0.10, 0.08, 0.0)];
      for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
      hubM.push(bar([0.30 * Math.cos(a), 0.30 * Math.sin(a), -0.14], [0.50 * Math.cos(a), 0.50 * Math.sin(a), 0.10], 0.018, 5, true));
    }
    hubM.push(cyl(0.36, 0.36, 0.07, 20, "z", 0, 0, -0.16));                       /* swashplate */
    hubM.push(cyl(0.22, 0.22, 0.10, 14, "z", 0, 0, -0.22));
    mesh(head, hubM, T.metal, "hub");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       Three blades, 3.908 m across; 0.24 m chord on the Mi-8T, 0.305 m on
       the MT line (ru.wikipedia). Local -Z is outboard in both mounts. One
       blade points straight aft as built. Hub and blades are one mesh. */
    var tm = new V.Group();
    tm.position.set(TRX, TRY, Z(TR_H));
    tm.rotation.x = VR.side > 0 ? PI / 2 : -PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trB = [cyl(0.12, 0.12, 0.18, 12, "z", 0, 0, 0), cyl(0.08, 0.02, 0.14, 10, "z", 0, 0, -0.16)];
    for (k = 0; k < 3; k++) {
      var ang = (180 + 120 * k) * D2R;
      var tb = box(TR_R - 0.25, VR.trc, 0.035, 0.25 + (TR_R - 0.25) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(ang);
      tb.translate(0, 0, -0.04);
      trB.push(tb);
      var cuff = box(0.28, 0.12, 0.10, 0.18, 0, 0);
      cuff.rotateZ(ang); cuff.translate(0, 0, -0.04);
      trB.push(cuff);
    }
    mesh(trot, trB, T.blade, "tailrotor_blades");
    return g;
  }

  return {
    t:     function (THREE, M, C) { return build(THREE, M, C, VARIANTS.t); },
    mt80:  function (THREE, M, C) { return build(THREE, M, C, VARIANTS.mt80); },
    mt90:  function (THREE, M, C) { return build(THREE, M, C, VARIANTS.mt90); },
    amtsh: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.amtsh); },
    pla:   function (THREE, M, C) { return build(THREE, M, C, VARIANTS.pla); }
  };
})();

UNIT_MODELS["pact_e60_transport"] = { len: 25.268, build: HeroMi8.t };
UNIT_MODELS["pact_e80_transport"] = { len: 25.328, build: HeroMi8.mt80 };
UNIT_MODELS["pact_e90_transport"] = { len: 25.328, build: HeroMi8.mt90 };
UNIT_MODELS["pact_e00_transport"] = { len: 25.328, build: HeroMi8.amtsh };
UNIT_MODELS["trans_p"]            = { len: 25.328, build: HeroMi8.amtsh };
UNIT_MODELS["pla_e90_transport"]  = { len: 25.328, build: HeroMi8.pla };
