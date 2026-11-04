/* ============ fr_mirage3.js - HERO model: Dassault Mirage IIIE ============
   Registers two rows, one builder with a VARIANTS table:
     fra_e60_fighter  "Mirage IIIE"          (service 1964)
     fra_e60_sead     "Mirage IIIE / AS.37"  (the same aeroplane with an
                                              AS.37 Martel, 1972)
   No other row is registered or changed. There was no Mirage III model in
   js/hero/ before this file: both rows borrowed the role peer fighter_n
   (an F-16), which is the "before" of the comparison sheets.

   Full-quality redo, 2026-11-04. Model space: +X nose, +Y left (port), +Z
   up, metres. Everything in side elevation is read off S on a pixel grid:
     X = (480 - px) / 62.6,   Z = (219 - py) / 62.6,   ground py 334.
   62.6 px/m makes S's pitot tip (px 11) to fin tip (px 952) the published
   15.03 m, and the same scale then gives the fin tip 4.52 m over the
   ground line (published height 4.50 m) and the main tyre 0.75 m across:
   three independent checks of the one scale. Z = 0 is the nozzle axis.

   References (Wikimedia Commons, cached in scratchpad/q_mirage3_ref;
   Wikipedia for the figures):
     S "Mirage IIIE 13-QL.jpg" (960 px) - an exact side elevation of a
       IIIE of EC 1/13 in 1971 camouflage. Every side station is measured
       off it: pitot and its thicker root, the black radome (tip px 45,
       joint px 130), the nose and windscreen (foot px 196, arch px 232),
       the canopy (top py 159-160, end px 318 into the spine), the spine
       and crown, the half-cone (tip px 302) and intake lip (px 315, py
       193..243), the box under the fuselage behind the nose leg (px
       312..375), the wing's chord level, the
       fin (LE root px 650, tip px 900..952 at py 51, TE base px 885), the
       two antenna fairings on the fin, the small fairing over the nozzle
       (to px 937), the Atar nozzle (px 905..926, py 193..245), the pale
       ventral pack fairing under the rear fuselage (bottom py 275, rising
       to the nozzle at px 865), the wing tanks (px 430..765, py 252..275),
       the gear (nose wheel px 293, main wheel px 607, r 0.375 m, the main
       leg door), the paint: green #5a6555, grey-blue patches, pale
       undersides #a9abac (sampled). Its roundels, codes, badges and the
       fin flash are NOT drawn.
     F "Mirage IIIC & IIIE forebody comparison.svg" (960 px raster) - the
       IIIE's longer forebody and its Doppler radome: a long shallow pale
       bulge under the nose from the radome joint to under the windscreen;
       the box behind the nose leg; the nose leg and its single wheel.
     T "Dassault Mirage IIIE and Mirage IV top-view silhouette
       comparison.png" (1280 px) - a plan silhouette of the IIIE. Y off
       its span (514 px = 8.22 m: 62.5 px/m); X off its windscreen foot and
       nozzle exit matched to S (X = 4.54 - (py - 276) / 65.3, so T's
       intake lip lands at 2.67 and its canopy end at 2.67 against S's 2.64
       and 2.59). Its nose is 0.5 m shorter and its pitot 0.85 m longer
       than S's; S and the published length are followed there. Measured
       off T: the wing (LE 58.7 deg, the published 60 used, apex X 2.62;
       the rounded LE corner; TE -5.15 at the root to -4.86 at the tip;
       elevon hinge X -4.74, split at Y 2.45, inner end Y 0.79), the
       fuselage half-widths (0.33 at X 5.2 to 0.44 at the cockpit, 0.62
       just aft of the TE, 0.40 at the nozzle exit), the intakes (outer
       edge Y 0.82 at the lip, 0.90 at X 1.0), the canopy (half-width
       0.37). A traced outline of the model on T matches it from the
       windscreen aft. T is a silhouette: it does not show the tanks,
       the Doppler bulge or the ventral pack.
     M "Martel TV-Guided Missile - Elvington - BB.jpg" - a Martel round
       (the AJ.168 TV variant) beside a IIIE: the cylindrical body, the
       cropped-delta wings in an X on the rear half, the small tail fins in
       line with them; behind it, the IIIE's D-shaped half-cone intake
       with its lip and the tall main legs.
     en.wikipedia "Dassault Mirage III": IIIE length 15.03 m, span 8.22 m,
       height 4.5 m, wing area 34.85 m2; 60 deg sweep; "a 300 mm forward
       fuselage extension ... avionics bay, located directly behind the
       cockpit"; "Doppler navigation radar radome on the bottom of the
       fuselage, underneath the cockpit"; RWR antennas in the fin; the
       Atar 09C "petal-style variable exhaust"; SEPR 841 rocket engine.
     en.wikipedia "Martel (missile)": 4.18 m long, 0.40 m, span 1.20 m;
       carried by the Mirage III "(one or two)".
   As drawn: 15.05 x 8.22 x 4.52 m (published 15.03 x 8.22 x 4.50).

   Recognition list:
     1. Tailless delta, LE 60 deg, TE swept slightly forward with two
        elevons a side, no tailplane (T, published sweep and span) -
        the wing, with conical camber drooping the LE outboard.
     2. Half-cone intakes behind the cockpit, the shock cone ahead of the
        lip (S, M).
     3. The IIIE's long forebody and the Doppler bulge under the cockpit
        (S, F).
     4. The big swept fin with a straight LE (no HF extension on this
        airframe, S) and its antenna fairings.
     5. One Atar 9C nozzle, the fairing over it, the ventral pack below
        (S).
     6. Tall, narrow-track gear under the wing roots; single nose wheel
        (S, F, M).
     7. Black radome and pitot; green/grey-blue camouflage over pale
        undersides (S).
   Variant difference: fra_e60_fighter carries the two wing tanks S
   shows; fra_e60_sead the same tanks and one AS.37 on a centreline
   pylon (M for the round's shape, en.wikipedia for its size).

   NOT CONFIRMED (estimated, not measured):
     - the head-on shapes: the cross-section exponents, the cone's
       lateral station (Y 0.46) and size; the widths of the Doppler bulge
       (0.30), the ventral pack (0.32) and the box behind the nose leg
       (0.22), which T's silhouette hides.
     - the wing's centreline chord follows T (7.77 m); with the rounded
       tip the drawn area is about 33 m2 against the published 34.85.
     - the main gear track 3.16 m (a remembered published figure, not in
       the fetched sources); the gear legs' rake and doors.
     - the conical-camber droop (0.07 m at the tip) and the wing's 4.5 %
       thickness. The elevon lines (T) are paint only.
     - the wing tank station (Y 2.10) and diameter (0.40 m, S shows only
       the part below the wing); the AS.37's station (centreline), its
       nose shape (M shows the TV nose, not the AS.37's radome) and its
       wing and fin sizes beyond the published span.
     - what the ventral pack is: S shows the fairing; the SEPR 841 pack
       and a ventral tank shared that bay, so it is drawn as S shows it,
       for both rows, without the rocket nozzle.
     - the camouflage pattern: colours sampled from S, blotches not traced.
   Not drawn: national markings, codes, badges, fin flash (forbidden);
   the white band behind the radome (a marking in S, absent in F); guns;
   the R.530 the fighter row names (no fetched reference shows one on a
   IIIE; S shows tanks only); the brake chute; open airbrakes.

   Materials: SKIN (one painted canvas, projected), RADOME, UNDER (pale:
   cones, Doppler bulge, ventral pack and box, pylons, gear doors), DARK,
   METAL, NOZZLE, GLASS, PALE (tanks), CREAM (the Martel), TEAM (one strip
   on each upper outer wing, exactly C.team); gear: METAL, TYRE, UNDER.
   Nodes: "gear". Model space line: +X nose, +Y port, +Z up, metres; the
   tyres touch Z -1.84.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMirage3 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  /* S side: X = (480 - px) / 62.6, Z = (219 - py) / 62.6; ground py 334 */
  var GROUND = -1.84;

  /* ------------------------------------------------------ the variants -- */
  var VARIANTS = {
    fra_e60_fighter: { key: "e",  load: "tanks" },
    fra_e60_sead:    { key: "em", load: "martel" }
  };

  /* ------------------------------------------------------- the tables -- */
  /* body: [X, half-width, crown Z, keel Z, Z of max width, upper exp, lower exp]
     crown and keel off S (13-QL side); half-widths see PLAN below. The first
     five rows are the black radome (tip px 45, joint px 130). */
  var BODY = [
    [6.95, 0.02, -0.14, -0.18, -0.16, 1.0, 1.0],
    [6.61, 0.09, -0.05, -0.22, -0.13, 1.0, 1.0],
    [6.27, 0.16, 0.04, -0.27, -0.11, 1.0, 1.0],
    [5.93, 0.23, 0.13, -0.31, -0.09, 1.0, 1.0],
    [5.59, 0.29, 0.22, -0.35, -0.07, 1.0, 1.0],     /* radome joint */
    [5.20, 0.33, 0.30, -0.40, -0.05, 1.0, 0.95],
    [4.80, 0.38, 0.38, -0.43, -0.03, 1.0, 0.9],
    [4.54, 0.39, 0.40, -0.43, -0.02, 1.0, 0.85],    /* windscreen foot */
    [3.90, 0.43, 0.45, -0.44, 0.00, 0.95, 0.8],
    [3.20, 0.44, 0.48, -0.46, 0.00, 0.95, 0.8],
    [2.85, 0.44, 0.70, -0.48, 0.02, 1.2, 0.8],
    [2.55, 0.45, 0.92, -0.50, 0.04, 1.35, 0.8],     /* spine from the canopy's end */
    [2.00, 0.47, 0.93, -0.53, 0.05, 1.35, 0.8],
    [1.00, 0.52, 0.90, -0.53, 0.05, 1.3, 0.8],
    [0.00, 0.58, 0.88, -0.53, 0.05, 1.3, 0.8],
    [-1.50, 0.62, 0.85, -0.52, 0.05, 1.3, 0.8],
    [-3.00, 0.63, 0.80, -0.50, 0.05, 1.25, 0.85],
    [-5.32, 0.62, 0.70, -0.46, 0.03, 1.15, 0.95],      /* T: just aft of the TE */
    [-4.50, 0.63, 0.74, -0.47, 0.04, 1.2, 0.9],
    [-6.00, 0.53, 0.64, -0.45, 0.02, 1.1, 1.0],
    [-6.79, 0.43, 0.46, -0.43, 0.00, 1.0, 1.0]      /* nozzle shroud, S px 905 */
  ];
  var RADOME_N = 5;
  /* canopy on a sill at Z 0.40 (S: windscreen foot px 196, arch px 232,
     top py 159-160 from px 260 to 300, the end at px 318 into the spine):
     [X, half-width, top Z] */
  var CANOPY = [[4.56, 0.30, 0.41], [4.25, 0.35, 0.60], [3.96, 0.37, 0.75], [3.51, 0.37, 0.92],
                [3.20, 0.37, 0.96], [2.88, 0.35, 0.96], [2.62, 0.30, 0.94], [2.50, 0.20, 0.93]];
  var FRAMES = [3.96, 2.70];
  /* intake trunk, each side: [X, centre Y, half-width, centre Z, half-height, exp]
     (S: lip px 315, Z -0.38..0.42; widths see PLAN) */
  /* T: the mouth's outer edge Y 0.82 at the lip, 0.90 at X 1.0 */
  var TRUNK = [
    [2.64, 0.63, 0.19, 0.02, 0.40, 0.75],
    [2.00, 0.65, 0.20, 0.02, 0.40, 0.75],
    [1.00, 0.69, 0.21, 0.01, 0.38, 0.8],
    [0.00, 0.66, 0.19, 0.00, 0.34, 0.85],
    [-0.90, 0.56, 0.12, -0.02, 0.26, 0.95]
  ];
  /* the half cone (S: tip px 302, py 213) */
  var CONE = { tip: 2.84, base: 2.30, y: 0.46, z: 0.06, r: 0.21 };
  /* wing (T plan, span 514 px = the published 8.22 m): LE 60 deg (T: 58.7,
     published 60 followed) through T's mid-span point (-1.95, 2.64), so the
     apex is X 2.62 on the centreline; the LE corner rounded off from Y 4.0
     to the tip at (-4.65, 4.11). TE swept slightly forward: X -5.15 at the
     root (Y 0.79), -4.86 at the tip. Elevon hinge X -4.74, the two elevons
     split at Y 2.45 (T). */
  var WSEMI = 4.11, WROOT = 0.55, APEX = 2.62, WZ = -0.30, HINGE = -4.74, ESPLIT = 2.45;
  function wLE(y) {
    var x = APEX - y * Math.tan(60 * PI / 180);
    if (y > 4.0) x -= (y - 4.0) / (WSEMI - 4.0) * 0.21;
    return x;
  }
  function wTE(y) { return -5.15 + Math.max(0, y - 0.79) / (WSEMI - 0.79) * 0.29; }
  function wT(y) { return Math.max(0.03, (wLE(y) - wTE(y)) * 0.045); }
  /* conical camber: the leading edge droops more toward the tip */
  function wDroop(y) { return Math.max(0, (y - 1.2) / (WSEMI - 1.2)) * 0.07; }
  /* fin (S): LE (-2.85, 0.81) to (-6.71, 2.68); TE (-6.47, 0.78) to (-7.54, 2.68) */
  var FIN = { z0: 0.78, z1: 2.68 };
  function finLE(z) { return -2.85 - (z - 0.81) * 2.064; }
  function finTE(z) { return -6.47 - (z - 0.78) * 0.563; }
  /* Atar 9C nozzle (S: shroud px 905, exit px 926, py 193..245) */
  var NOZ = { x0: -6.79, x1: -6.86, x2: -7.12, r0: 0.43, r1: 0.42, r2: 0.40, z: 0.0 };   /* T: 0.80 m wide at the exit */
  /* gear (S): nose wheel px 293, r 0.24; main px 607, r 0.375 */
  var GEAR = { nx: 2.99, nr: 0.24, mx: -2.03, mr: 0.375, my: 1.58 };

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -7.8, TW = 468;
  var YMAX = 4.3, TOPH = 258, ZTOP = 2.9, SIDEH = 135;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  /* S sampled: green #5a6555, grey-blue patches #6b7a7a, undersides #a9abac */
  var P = { base: "#5a6555", patch: "#6c7a79", belly: "#a9abac", radome: 0x151717 };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 1964, i, b, k, x, y;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = P.base; g.fillRect(0, 0, TW, TH);
    g.fillStyle = P.belly; g.fillRect(0, B_BEL, TW, TOPH);
    /* the sides go pale below the wing line (S: below py ~250, Z -0.5) */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.fillStyle = P.belly; g.fillRect(0, bd + pxZ(-0.40), TW, SIDEH - pxZ(-0.40));
    }
    /* the grey-blue patches: soft-edged blobs (S); layout not traced */
    function blob(cx, cy, rx, ry) {
      var n = 9, a0 = R() * PI;
      g.beginPath();
      for (var j = 0; j < n; j++) {
        var a = a0 + j * 2 * PI / n, f = 0.65 + R() * 0.55;
        var px = cx + Math.cos(a) * rx * f, py = cy + Math.sin(a) * ry * f;
        if (j) g.lineTo(px, py); else g.moveTo(px, py);
      }
      g.closePath(); g.fill();
    }
    g.fillStyle = P.patch;
    var bands = [B_TOP, B_PORT, B_STBD, B_IN];
    for (b = 0; b < bands.length; b++) {
      var h = bands[b] === B_TOP ? TOPH : SIDEH, nb = h === TOPH ? 10 : 5;
      for (i = 0; i < nb; i++) {
        var cyb = bands[b] + 10 + R() * (h === TOPH ? h - 20 : pxZ(-0.3) - 10);
        blob(20 + R() * (TW - 40), cyb, 28 + R() * 34, 14 + R() * 20);
      }
    }
    /* panel lines: frames */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [4.85, 3.20, 2.64, 1.40, 0.0, -1.5, -3.0, -4.5, -6.0];
    for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    /* wing: the elevon hinge line across the trailing edge, split mid-span
       (two elevons a side) */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(pxX(HINGE), ob + pxY(k * 0.79)); g.lineTo(pxX(HINGE), ob + pxY(k * 4.05)); g.stroke();
        g.beginPath(); g.moveTo(pxX(HINGE), ob + pxY(k * ESPLIT)); g.lineTo(pxX(wTE(ESPLIT)), ob + pxY(k * ESPLIT)); g.stroke();
      }
    }
    /* fin: rudder hinge on the side bands */
    for (b = 0; b < 3; b++) {
      var bs = [B_PORT, B_STBD, B_IN][b];
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(pxX(-6.05), bs + pxZ(0.95)); g.lineTo(pxX(-6.75), bs + pxZ(2.2)); g.stroke();
    }
    /* rivet rows, light weathering */
    g.fillStyle = "rgba(0,0,0,0.09)";
    for (i = 0; i < 60; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 20) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(30,32,36," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 30, 2 + R() * 5);
    }
    var hs = g.createLinearGradient(pxX(-6.0), 0, pxX(-6.8), 0);
    hs.addColorStop(0, "rgba(40,36,32,0)"); hs.addColorStop(1, "rgba(40,36,32,0.30)");
    g.fillStyle = hs; g.fillRect(pxX(-6.8), 0, 0.8 * PXM, TH);
    _cv = cv;
    return cv;
  }

  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    var t = false;
    try {
      t = new V.CanvasTexture(paint());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex = t;
    return t;
  }

  /* each face takes the band its normal looks into (as fr_mirage2000.js) */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3;
      var band;
      if (nz > 0.55) band = B_TOP;
      else if (nz < -0.55) band = B_BEL;
      else if (Math.abs(cy) > 0.3 && ny * cy < 0) band = B_IN;
      else band = ny >= 0 ? B_PORT : B_STBD;
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === B_TOP || band === B_BEL) { U = pxX(x); W = band + clamp(pxY(y), 1, TOPH - 1); }
        else { U = pxX(endOn ? x + y : x); W = band + clamp(pxZ(z), 1, SIDEH - 1); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.base);
    m.radome = new V.MeshStandardMaterial({ color: P.radome, roughness: 0.55, metalness: 0.05 });
    m.under = new V.MeshStandardMaterial({ color: 0xa9abac, roughness: 0.55, metalness: 0.25 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.75, metalness: 0.20 });
    m.metal = new V.MeshStandardMaterial({ color: 0x8a8e90, roughness: 0.40, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x4a4f4c, roughness: 0.42, metalness: 0.60 });
    m.glass = new V.MeshStandardMaterial({ color: 0x26353c, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xd1d1d0, roughness: 0.45, metalness: 0.30 });   /* S: the tanks */
    m.cream = new V.MeshStandardMaterial({ color: 0xd9d2bb, roughness: 0.60, metalness: 0.08 });   /* M: the Martel */
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (fr_mirage2000.js's kit: place, box, cyl, bar, merge, sloft, foil, loft) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
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
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function sloft(S) {
    var A = S[0], B = S[1], n = A.length, i, k, nx = 0, ny = 0, nz = 0, ax = 0, ay = 0, az = 0, out = [];
    for (i = 0; i < n; i++) {
      var p = A[i], q = A[(i + 1) % n];
      nx += (p[1] - q[1]) * (p[2] + q[2]); ny += (p[2] - q[2]) * (p[0] + q[0]); nz += (p[0] - q[0]) * (p[1] + q[1]);
      ax += B[i][0] - A[i][0]; ay += B[i][1] - A[i][1]; az += B[i][2] - A[i][2];
    }
    var sg = (nx * ax + ny * ay + nz * az) >= 0 ? 1 : -1;
    function q3(a, b, c) { if (sg > 0) out.push(a, b, c); else out.push(a, c, b); }
    var L = S[S.length - 1];
    for (i = 1; i < n - 1; i++) { q3(A[0], A[i + 1], A[i]); q3(L[0], L[i], L[i + 1]); }
    for (k = 0; k < S.length - 1; k++) {
      var Pp = S[k], Q = S[k + 1];
      for (i = 0; i < n; i++) {
        var j = (i + 1) % n;
        var d1 = (Pp[i][0] - Q[j][0]) * (Pp[i][0] - Q[j][0]) + (Pp[i][1] - Q[j][1]) * (Pp[i][1] - Q[j][1]) + (Pp[i][2] - Q[j][2]) * (Pp[i][2] - Q[j][2]);
        var d2 = (Pp[j][0] - Q[i][0]) * (Pp[j][0] - Q[i][0]) + (Pp[j][1] - Q[i][1]) * (Pp[j][1] - Q[i][1]) + (Pp[j][2] - Q[i][2]) * (Pp[j][2] - Q[i][2]);
        if (d1 <= d2) { q3(Pp[i], Pp[j], Q[j]); q3(Pp[i], Q[j], Q[i]); }
        else { q3(Pp[i], Pp[j], Q[i]); q3(Pp[j], Q[j], Q[i]); }
      }
    }
    return tris(out);
  }
  /* aerofoil section: thickness t along the unit normal nrm; droop lowers
     the leading edge (conical camber) */
  function foil(le, te, t, nrm, droop) {
    var dr = droop || 0;
    function p(f, k) {
      var d = f < 0.2 ? dr * (1 - f / 0.2) : 0;
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * (k - d), le[1] + (te[1] - le[1]) * f + nrm[1] * (k - d),
              le[2] + (te[2] - le[2]) * f + nrm[2] * (k - d)];
    }
    return [p(0, 0), p(0.06, t * 0.36), p(0.18, t / 2), p(0.45, t * 0.48), p(0.75, t * 0.32), p(1, 0),
            p(0.75, -t * 0.32), p(0.45, -t * 0.48), p(0.18, -t / 2), p(0.06, -t * 0.36)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }
  function sec(x, yc, zc, w, hu, hl, eu, el) {
    return { x: x, yc: yc, zc: zc, w: w, hu: hu, hl: hl, eu: eu || 1, el: el || eu || 1 };
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, e, z;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      e = sn >= 0 ? s.eu : s.el;
      z = s.zc + (sn >= 0 ? s.hu : s.hl) * sgn(sn) * Math.pow(Math.abs(sn), e);
      o.push([s.x, s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), e), z]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(r[j][0], r[j][1], r[j][2]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    if (noseDx !== null && noseDx !== undefined) out.push(capOf(secs[0], n, noseDx, true));
    if (tailDx !== null && tailDx !== undefined) out.push(capOf(secs[secs.length - 1], n, -tailDx, false));
    return out;
  }
  function capOf(s, n, dx, front) {
    var rr = ringOf(s, n), t = [], cx = 0, cy = 0, cz = 0, j;
    for (j = 0; j < n; j++) { cx += rr[j][0]; cy += rr[j][1]; cz += rr[j][2]; }
    var o = [cx / n + dx, cy / n, cz / n];
    for (j = 0; j < n; j++) {
      var p0 = rr[j], p1 = rr[(j + 1) % n];
      if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
    }
    return tris(t);
  }
  function revolve(prof, len, r, x, y, z, n) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(sec(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], r * prof[i][1], 1, 1));
    return loft(secs, n, 0, 0);
  }
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.10) / 2, d = (x0 - x1) * 0.12;
    list.push(sloft([
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]]
    ]));
  }
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a);
      var A = [x, y, z], B = [x - chordR, y, z];
      var Cc = [x - sweep - chordT, y + cy * span, z + cz * span], D = [x - sweep, y + cy * span, z + cz * span];
      var nY = -cz * th, nZ = cy * th;
      list.push(sloft([[[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                       [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]]));
    }
  }

  /* ----------------------------------------------------------- stores -- */
  var P_TANK = [[0.50, 0.03], [0.42, 0.55], [0.30, 0.92], [0.18, 1.0], [-0.22, 1.0], [-0.40, 0.65], [-0.50, 0.08]];
  var P_MARTEL = [[0.50, 0.30], [0.47, 0.75], [0.42, 0.97], [0.38, 1.0], [-0.47, 1.0], [-0.50, 0.85]];

  /* the Atar 9C nozzle: shroud ring, petals, dark bore */
  function nozzle(K) {
    var z = NOZ.z;
    push(K.metal, loft([sec(NOZ.x0, 0, z, NOZ.r0, NOZ.r0, NOZ.r0), sec(NOZ.x1, 0, z, NOZ.r1, NOZ.r1, NOZ.r1)], 24, null, null));
    push(K.nozzle, loft([sec(NOZ.x1, 0, z, NOZ.r1, NOZ.r1, NOZ.r1), sec(NOZ.x2, 0, z, NOZ.r2, NOZ.r2, NOZ.r2)], 24, null, null));
    push(K.dark, loft([sec(NOZ.x2, 0, z, NOZ.r2 - 0.015, NOZ.r2 - 0.015, NOZ.r2 - 0.015), sec(NOZ.x2 + 0.5, 0, z, 0.33, 0.33, 0.33)], 20, null, null));
    K.dark.push(capOf(sec(NOZ.x2 + 0.5, 0, z, 0.33, 0.33, 0.33), 20, 0, false));
    for (var i = 0; i < 16; i++) {
      var a = (i + 0.5) * 2 * PI / 16;
      K.dark.push(bar([NOZ.x1 - 0.02, Math.cos(a) * (NOZ.r1 + 0.002), z + Math.sin(a) * (NOZ.r1 + 0.002)],
                      [NOZ.x2 + 0.02, Math.cos(a) * (NOZ.r2 + 0.002), z + Math.sin(a) * (NOZ.r2 + 0.002)], 0.010, 3));
    }
  }

  function buildAirframe(THREE, C, VT) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "mirage3_" + VT.key;
    var K = { skin: [], radome: [], under: [], dark: [], metal: [], glass: [], team: [], pale: [], cream: [], nozzle: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y, r;

    /* ---- radome and body */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      var sc = sec(r[0], 0, r[4], r[1], r[2] - r[4], r[4] - r[3], r[5], r[6]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 36, 0, null));
    push(K.skin, loft(bs, 36, null, 0));
    /* pitot boom (S: px 10 to the radome tip, a thicker root) */
    K.metal.push(cyl(0.012, 0.016, 0.34, 6, "x", 7.34, 0, -0.17));
    K.metal.push(cyl(0.022, 0.035, 0.24, 8, "x", 7.06, 0, -0.165));

    /* ---- Doppler bulge under the cockpit (S, F: pale, X 5.05..3.45) */
    push(K.under, loft([sec(5.05, 0, -0.40, 0.10, 0.04, 0.02, 1, 1), sec(4.70, 0, -0.42, 0.26, 0.06, 0.10, 1, 1),
                        sec(4.20, 0, -0.43, 0.30, 0.06, 0.13, 1, 1), sec(3.80, 0, -0.44, 0.27, 0.06, 0.10, 1, 1),
                        sec(3.45, 0, -0.45, 0.12, 0.04, 0.02, 1, 1)], 18, 0.05, 0.08));

    /* ---- canopy on its sill, frames */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) cs.push(sec(CANOPY[i][0], 0, 0.40, CANOPY[i][1], CANOPY[i][2] - 0.40, 0.08, 1.0, 1.0));
    push(K.glass, loft(cs, 28, 0.04, 0.03));
    function topAt(x) {
      for (var j = 0; j < CANOPY.length - 1; j++)
        if (x <= CANOPY[j][0] && x >= CANOPY[j + 1][0]) {
          var f = (CANOPY[j][0] - x) / (CANOPY[j][0] - CANOPY[j + 1][0]);
          return [CANOPY[j][1] + (CANOPY[j + 1][1] - CANOPY[j][1]) * f, CANOPY[j][2] + (CANOPY[j + 1][2] - CANOPY[j][2]) * f];
        }
      return [CANOPY[0][1], CANOPY[0][2]];
    }
    for (i = 0; i < FRAMES.length; i++) {
      var tp = topAt(FRAMES[i]);
      var rr = ringOf(sec(FRAMES[i], 0, 0.40, tp[0] + 0.012, tp[1] - 0.40 + 0.012, 0.08), 28);
      for (var j = 0; j < 14; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 28], 0.022, 4));
    }
    /* the sill rail along the canopy (S: a dark line px 196..318) */
    for (s = -1; s <= 1; s += 2) K.dark.push(bar([4.56, s * 0.395, 0.41], [2.55, s * 0.455, 0.42], 0.018, 4));

    /* ---- intake trunks, ducts, half cones */
    for (s = -1; s <= 1; s += 2) {
      var ts = [];
      for (i = 0; i < TRUNK.length; i++) {
        r = TRUNK[i];
        ts.push(sec(r[0], s * r[1], r[3], r[2], r[4], r[4], r[5], r[5]));
      }
      push(K.skin, loft(ts, 24, null, 0.2));
      var m0 = TRUNK[0];
      push(K.dark, loft([sec(m0[0] - 0.50, s * m0[1], m0[3], m0[2] - 0.05, m0[4] - 0.05, m0[4] - 0.05, m0[5], m0[5]),
                         sec(m0[0] + 0.004, s * m0[1], m0[3], m0[2] - 0.012, m0[4] - 0.012, m0[4] - 0.012, m0[5], m0[5])], 24, null, null));
      K.dark.push(capOf(sec(m0[0] - 0.49, s * m0[1], m0[3], m0[2] - 0.06, m0[4] - 0.06, m0[4] - 0.06, m0[5], m0[5]), 24, 0, true));
      var lip = ringOf(sec(m0[0] + 0.005, s * m0[1], m0[3], m0[2] + 0.002, m0[4] + 0.002, m0[4] + 0.002, m0[5], m0[5]), 24);
      for (i = 0; i < 24; i++) K.skin.push(bar(lip[i], lip[(i + 1) % 24], 0.02, 4));
      /* the half cone (S: pale, tip px 302): its inner half buried in the body */
      push(K.under, loft([sec(CONE.tip, s * CONE.y, CONE.z, 0.01, 0.01, 0.01),
                          sec(CONE.tip - 0.22, s * CONE.y, CONE.z, CONE.r * 0.55, CONE.r * 0.55, CONE.r * 0.55),
                          sec(CONE.base, s * CONE.y, CONE.z, CONE.r, CONE.r, CONE.r),
                          sec(CONE.base - 0.60, s * CONE.y, CONE.z, CONE.r, CONE.r, CONE.r)], 16, 0, null));
    }

    /* ---- wing: a loft of aerofoil sections, root (inside the body) to tip,
       the leading edge drooped outboard (conical camber) */
    for (s = -1; s <= 1; s += 2) {
      var ws = [], WST = [0.30, WROOT, 1.2, 2.0, 2.8, 3.5, 4.0, WSEMI];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        ws.push(foil([wLE(y), s * y, WZ], [wTE(y), s * y, WZ], wT(y), [0, 0, 1], wDroop(y)));
      }
      K.skin.push(sloft(ws));
      var plate = function (yy) {
        var zz = WZ + wT(yy) * 0.47 + 0.015;
        return blk([wLE(yy), s * yy, zz], [wTE(yy), s * yy, zz], 0.35, 0.75, 0.015, [0, 0, 1]);
      };
      K.team.push(sloft([plate(3.0), plate(3.4)]));
    }

    /* ---- fin with its rounded-off tip, the fairing over the nozzle */
    function finSec(z, t) { return foil([finLE(z), 0, z], [finTE(z), 0, z], t, [0, 1, 0]); }
    K.skin.push(sloft([finSec(0.55, 0.20), finSec(FIN.z0, 0.20), finSec(1.6, 0.15), finSec(2.3, 0.09),
                       finSec(FIN.z1, 0.05)]));
    /* the small fairing over the nozzle (S: px 885..937, py 170..182) */
    push(K.skin, loft([sec(-6.10, 0, 0.62, 0.10, 0.08, 0.08), sec(-6.50, 0, 0.66, 0.10, 0.09, 0.09),
                       sec(-7.10, 0, 0.66, 0.09, 0.08, 0.08), sec(-7.30, 0, 0.66, 0.05, 0.05, 0.05)], 12, null, 0.04));

    /* ---- the ventral pack fairing under the rear fuselage (S: pale, its
       bottom py 275 = Z -0.89, rising to Z -0.54 at px 865) */
    push(K.under, loft([sec(-1.60, 0, -0.45, 0.20, 0.05, 0.05, 1, 1), sec(-2.30, 0, -0.62, 0.30, 0.18, 0.25, 1, 0.9),
                        sec(-3.00, 0, -0.65, 0.32, 0.18, 0.24, 1, 0.9), sec(-5.50, 0, -0.65, 0.30, 0.18, 0.24, 1, 0.9),
                        sec(-6.00, 0, -0.60, 0.24, 0.14, 0.14, 1, 1), sec(-6.25, 0, -0.52, 0.12, 0.06, 0.04, 1, 1)], 16, 0.1, 0.03));

    /* ---- ventral box behind the nose leg (S, F: px 312..375, bottom py 262) */
    push(K.under, loft([sec(2.70, 0, -0.52, 0.22, 0.03, 0.16, 0.6, 0.6), sec(1.70, 0, -0.52, 0.22, 0.03, 0.16, 0.6, 0.6)], 12, 0.02, 0.02));

    /* the fin's antenna fairings (S): one ahead of the leading edge near the
       tip (px 822..845, py 76..80), one on each face low on the fin (px
       845..875, py 126..134) */
    push(K.under, loft([sec(-5.42, 0, 2.25, 0.01, 0.01, 0.01), sec(-5.52, 0, 2.25, 0.035, 0.035, 0.035),
                        sec(-5.90, 0, 2.25, 0.035, 0.035, 0.035)], 8, 0, null));
    for (s = -1; s <= 1; s += 2)
      push(K.under, loft([sec(-5.80, s * 0.075, 1.42, 0.01, 0.01, 0.01), sec(-5.92, s * 0.08, 1.42, 0.03, 0.04, 0.04),
                          sec(-6.25, s * 0.07, 1.42, 0.03, 0.04, 0.04)], 8, 0, 0.03));
    /* two small blades on the spine (S: px 400 and 565) */
    K.dark.push(sloft([[[1.36, 0.008, 0.88], [1.16, 0.008, 0.88], [1.20, 0.008, 1.02], [1.30, 0.008, 1.02]],
                       [[1.36, -0.008, 0.88], [1.16, -0.008, 0.88], [1.20, -0.008, 1.02], [1.30, -0.008, 1.02]]]));
    K.dark.push(sloft([[[-1.26, 0.008, 0.84], [-1.44, 0.008, 0.84], [-1.40, 0.008, 0.95], [-1.32, 0.008, 0.95]],
                       [[-1.26, -0.008, 0.84], [-1.44, -0.008, 0.84], [-1.40, -0.008, 0.95], [-1.32, -0.008, 0.95]]]));

    nozzle(K);

    /* ---- stores */
    var TY = 2.10;
    function wingPylon(yy, x0, x1, drop) {
      var zb = WZ - wT(yy) * 0.45;
      for (s = -1; s <= 1; s += 2) pylon(K.under, x0, x1, s * yy, zb + 0.02, zb - drop, 0.08);
      return zb - drop;
    }
    if (VT.load === "tanks") {
      /* S: tank nose px 430, tail px 765, py 252..275 */
      var zt = wingPylon(TY, -1.2, -3.2, 0.05);
      for (s = -1; s <= 1; s += 2) push(K.pale, revolve(P_TANK, 5.35, 0.20, -1.88, s * TY, zt - 0.20, 16));
    } else {
      zt = wingPylon(TY, -1.2, -3.2, 0.05);
      for (s = -1; s <= 1; s += 2) push(K.pale, revolve(P_TANK, 5.35, 0.20, -1.88, s * TY, zt - 0.20, 16));
      /* AS.37 Martel on a deep centreline pylon, hung low enough to clear
         the ventral pack (published 4.18 m long, 0.40 m, wings 1.20 m) */
      pylon(K.under, 0.9, -1.5, 0, -0.50, -0.90, 0.10);
      var mz = -1.10, mx0 = -0.69;
      push(K.cream, revolve(P_MARTEL, 4.18, 0.20, mx0, 0, mz, 18));
      /* M (the Elvington round): cropped-delta wings in an X on the rear
         half of the body, small control fins in line with them at the tail */
      fins(K.cream, mx0 - 0.21, 0, mz, 1.10, 0.30, 0.75, 0.60, PI / 4, 0.012);
      fins(K.cream, mx0 - 1.62, 0, mz, 0.40, 0.20, 0.15, 0.42, PI / 4, 0.010);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.under, T.under, "under");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzle");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "tanks");
    mesh(g, K.cream, T.cream, "martel");

    /* ---- landing gear (S, F): it retracts, so "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = GEAR.nx, nr = GEAR.nr, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.10, 0, -0.45], [nx + 0.05, 0, nz + 0.45], 0.055, 10));     /* nose leg */
    G.metal.push(bar([nx + 0.05, 0.08, nz + 0.45], [nx, 0.08, nz], 0.035, 6));          /* fork */
    G.metal.push(bar([nx + 0.05, -0.08, nz + 0.45], [nx, -0.08, nz], 0.035, 6));
    G.metal.push(bar([nx + 0.70, 0, -0.48], [nx + 0.08, 0, nz + 0.75], 0.03, 6));       /* drag brace */
    G.tyre.push(cyl(nr, nr, 0.13, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.14, 12, "y", nx, 0, nz));
    for (s = -1; s <= 1; s += 2) G.dark.push(box(0.9, 0.02, 0.16, nx + 0.30, s * 0.17, -0.55));   /* bay doors */
    var mx = GEAR.mx, mr = GEAR.mr, mz2 = GROUND + mr, my = GEAR.my;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.18, s * (my - 0.10), WZ - 0.10], [mx, s * (my - 0.12), mz2 + 0.10], 0.07, 10));   /* main leg */
      G.metal.push(bar([mx + 0.80, s * (my - 0.30), WZ - 0.12], [mx + 0.05, s * (my - 0.13), mz2 + 0.60], 0.03, 6));
      G.metal.push(cyl(0.05, 0.05, 0.20, 8, "y", mx, s * (my - 0.05), mz2));
      G.tyre.push(cyl(mr, mr, 0.22, 26, "y", mx, s * my, mz2));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.23, 14, "y", mx, s * my, mz2));
      /* the leg door (S: pale, px 575..610, py 270..300) */
      G.dark.push(box(0.55, 0.02, 0.60, mx + 0.25, s * (my - 0.22), -1.00));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.under, "gear_doors");
    return g;
  }

  var out = { VARIANTS: VARIANTS };
  Object.keys(VARIANTS).forEach(function (id) {
    out[id] = function (THREE, M, C) { return buildAirframe(THREE, C, VARIANTS[id]); };
  });
  return out;
})();

/* len is the measured X extent: pitot tip (7.51) to the fin tip's trailing
   corner (-7.54) */
UNIT_MODELS["fra_e60_fighter"] = { len: 15.05, build: HeroMirage3.fra_e60_fighter };
UNIT_MODELS["fra_e60_sead"]    = { len: 15.05, build: HeroMirage3.fra_e60_sead };
