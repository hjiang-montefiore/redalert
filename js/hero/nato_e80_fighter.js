/* ========== nato_e80_fighter.js - HERO MODEL: F-15C Eagle (e80, NATO) ==========

   Style and period anchor for the 1980s NATO air roster. Everything here is
   measured off a McDonnell Douglas planform drawing (bottom view, scale
   checked twice: 13.05 m span and 19.43 m length both land on 110.5 px/m)
   and off side / three-quarter photographs of 18th Wing jets.

   Model space follows models3d.js: +X nose, +Y left, +Z up, real metres.
   Everything in this file is written against a NOSE STATION s - metres aft
   of the radome tip, exactly as the drawing is dimensioned - and converted
   with X(s). That way the numbers below can be checked against the drawing
   without mental arithmetic.

   The four period cues this model exists to carry:
     1. twin fins standing WIDE APART on the outboard engine decks, on booms
        that run aft past the nozzles;
     2. a large trapezoidal wing with a very long root chord (7.6 m at the
        centreline, 39% of the aircraft) and the raked-off tip;
     3. rectangular variable cheek intakes, open-mouthed, with the ramp
        wedge visible inside and the boundary-layer splitter standing off
        the fuselage side;
     4. a bubble canopy set far forward - the windscreen starts where the
        radome ends, at 15% of the length.

   Station reference (metres aft of the nose tip):
        0.00  radome tip
        2.90  radome / windscreen joint
        5.72  intake lip (top lip; bottom lip 5.95)
        7.18  wing leading edge, extended to the centreline
       14.76  wing trailing edge at the centreline
       14.90  fin root leading edge
       16.18  stabilator root leading edge
       17.84  engine nozzle exit
       19.00  tail boom aft end
       19.42  stabilator trailing edge - the aft-most point on the aircraft
*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var NOSE = 9.72;                  /* x of the radome tip */
  function X(s) { return NOSE - s; }

  /* ------------------------------------------------------------- palette */
  /* Taken from the PAINT table at the top of js/air3d_era.js: this airframe
     is spec'd camo:"twotone", the modern US grey-on-grey. Do not invent. */
  var SKIN_C = 0x768086, SKIN_R = 0.86, SKIN_M = 0.07;
  var TONE_HI = "#8b959b", TONE_LO = "#5f6a72";

  /* ------------------------------------------------------------- texture */
  /* One 1024x512 sheet does the work of several thousand triangles: base
     camouflage mottle, panel seams, rivet rows down the frames, access
     hatches, exhaust soot and belly grime. The lofted bodies carry
     cylindrical UVs (u aft->nose, v around) so the sheet wraps once; u = 0
     is the TAIL, and v = 0.75 is the belly, which is where the dirt goes. */
  var texCache = null;

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function makeSkinTexture(THREE) {
    var W = 1024, H = 512;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rngFor(0x15EA61E);

    /* canvas row for a given v (uv.y), remembering the default flipY */
    function CY(v) { return (1 - v) * H; }

    g.fillStyle = "#768086"; g.fillRect(0, 0, W, H);

    /* two-tone compass-grey mottle */
    var b, tone;
    for (b = 0; b < 30; b++) {
      tone = (b & 1) ? TONE_HI : TONE_LO;
      g.globalAlpha = 0.42;
      g.fillStyle = tone;
      g.beginPath();
      g.ellipse(R() * W, R() * H, 50 + R() * 140, 26 + R() * 74, R() * 3.14, 0, 6.29);
      g.fill();
    }
    g.globalAlpha = 1;

    /* the upper surfaces are a shade darker than the flanks, the belly a
       shade lighter - the standard Mod Eagle wrap */
    var top = g.createLinearGradient(0, CY(0.36), 0, CY(0.14));
    top.addColorStop(0, "rgba(60,68,74,0.00)");
    top.addColorStop(1, "rgba(60,68,74,0.28)");
    g.fillStyle = top; g.fillRect(0, CY(0.36), W, CY(0.14) - CY(0.36));
    var bel = g.createLinearGradient(0, CY(0.62), 0, CY(0.88));
    bel.addColorStop(0, "rgba(196,203,208,0.00)");
    bel.addColorStop(1, "rgba(196,203,208,0.26)");
    g.fillStyle = bel; g.fillRect(0, CY(0.62), W, CY(0.88) - CY(0.62));

    /* panel seams: frames across, stringers along */
    var x, y, i, n;
    g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 1.7;
    x = 0;
    while (x < W) {
      x += 22 + R() * 62;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    y = 0;
    while (y < H) {
      y += 30 + R() * 70;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.17)"; g.lineWidth = 1;
    for (i = 0; i < 70; i++) {
      var qx = R() * W, qy = R() * H, ql = 34 + R() * 170;
      g.beginPath();
      if (R() < 0.55) { g.moveTo(qx, qy); g.lineTo(qx + ql, qy); }
      else { g.moveTo(qx, qy); g.lineTo(qx, qy + ql * 0.55); }
      g.stroke();
    }

    /* rivet rows following the frames */
    g.fillStyle = "rgba(0,0,0,0.24)";
    for (i = 0; i < 46; i++) {
      var ry = R() * H, rx = R() * W * 0.75;
      n = 18 + (R() * 46) | 0;
      for (var j = 0; j < n; j++) g.fillRect(rx + j * 6.5, ry, 1.5, 1.5);
    }
    /* a few vertical rivet lines too, around the frames */
    for (i = 0; i < 16; i++) {
      var vx = R() * W, vy = R() * H * 0.7;
      n = 14 + (R() * 26) | 0;
      for (j = 0; j < n; j++) g.fillRect(vx, vy + j * 6.5, 1.5, 1.5);
    }

    /* access hatches and inspection panels */
    g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1.3;
    for (i = 0; i < 26; i++) {
      var hx = R() * W, hy = R() * H, hw = 13 + R() * 40, hh = 10 + R() * 26;
      g.strokeRect(hx, hy, hw, hh);
      g.globalAlpha = 0.09; g.fillStyle = "#000"; g.fillRect(hx, hy, hw, hh);
      g.globalAlpha = 1;
    }

    /* exhaust soot: u = 0 is the tail, so the burn lives on the left edge */
    var soot = g.createLinearGradient(0, 0, W * 0.34, 0);
    soot.addColorStop(0, "rgba(18,16,15,0.46)");
    soot.addColorStop(1, "rgba(18,16,15,0.00)");
    g.fillStyle = soot; g.fillRect(0, 0, W * 0.34, H);

    /* belly grime, heaviest low down and streaking aft from the vents */
    var grime = g.createLinearGradient(0, CY(0.60), 0, CY(0.80));
    grime.addColorStop(0, "rgba(34,31,28,0.00)");
    grime.addColorStop(1, "rgba(34,31,28,0.30)");
    g.fillStyle = grime; g.fillRect(0, CY(0.60), W, CY(0.80) - CY(0.60));
    g.fillStyle = "rgba(30,27,24,0.16)";
    for (i = 0; i < 60; i++) {
      var sx = R() * W, sy = CY(0.52 + R() * 0.42);
      g.fillRect(sx - 40 - R() * 130, sy, 44 + R() * 140, 2 + R() * 5);
    }
    /* gun-gas staining, forward starboard wing root */
    g.fillStyle = "rgba(26,24,22,0.22)";
    for (i = 0; i < 14; i++)
      g.fillRect(W * 0.42 - R() * 150, CY(0.42) + R() * 26, 60 + R() * 130, 3 + R() * 4);

    /* walkway lines along the wing root and a warning stripe */
    g.strokeStyle = "rgba(24,24,24,0.42)"; g.lineWidth = 3;
    g.setLineDash([10, 8]);
    g.beginPath(); g.moveTo(W * 0.16, CY(0.30)); g.lineTo(W * 0.66, CY(0.30)); g.stroke();
    g.beginPath(); g.moveTo(W * 0.16, CY(0.70)); g.lineTo(W * 0.66, CY(0.70)); g.stroke();
    g.setLineDash([]);
    g.fillStyle = "rgba(178,42,32,0.50)";
    g.fillRect(W * 0.40, CY(0.35), 52, 4);
    g.fillRect(W * 0.24, CY(0.66), 44, 4);

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function skinTex(THREE) {
    if (texCache === null) {
      try { texCache = makeSkinTexture(THREE); } catch (e) { texCache = false; }
    }
    return texCache || null;
  }

  /* ------------------------------------------------------------ materials */
  /* Exactly three tiers. SKIN carries the sheet; METAL is bare fittings and
     rubber; GLASS is the canopy. Nothing else. */
  function makeMats(THREE) {
    var t = skinTex(THREE);
    var skin = new THREE.MeshStandardMaterial({
      color: t ? 0xffffff : SKIN_C, roughness: SKIN_R, metalness: SKIN_M,
      side: THREE.DoubleSide });
    if (t) skin.map = t;

    /* Extruded panels carry UVs in model METRES, so the sheet has to be
       scaled down or a 13 m wing tiles it thirteen times and reads as
       corduroy. One repeat covers roughly nine metres. */
    var panel = new THREE.MeshStandardMaterial({
      color: t ? 0xffffff : SKIN_C, roughness: SKIN_R, metalness: SKIN_M,
      side: THREE.DoubleSide });
    if (t) {
      var c = t.clone(); c.needsUpdate = true;
      c.wrapS = c.wrapT = THREE.RepeatWrapping;
      c.repeat.set(1 / 9, 1 / 9);
      c.offset.set(0.31, 0.44);
      panel.map = c;
    }

    return {
      skin: skin,
      panel: panel,
      metal: new THREE.MeshStandardMaterial({
        color: 0x8d9399, roughness: 0.55, metalness: 0.50 }),
      steel: new THREE.MeshStandardMaterial({
        color: 0x6f757a, roughness: 0.48, metalness: 0.60 }),
      burnt: new THREE.MeshStandardMaterial({
        color: 0x5d5751, roughness: 0.52, metalness: 0.58 }),
      dark: new THREE.MeshStandardMaterial({
        color: 0x15181a, roughness: 0.95, metalness: 0.05 }),
      rubber: new THREE.MeshStandardMaterial({
        color: 0x17181a, roughness: 0.95, metalness: 0.04 }),
      duct: new THREE.MeshStandardMaterial({
        color: 0xb9bec2, roughness: 0.62, metalness: 0.36 }),
      /* Canopy tint. Measured off the render twice: at 0x9fb2b6 the canopy
         came out (145,157,162) against skin at (169,176,177) - a 14 per cent
         separation, which reads as a metal blister, not glass. The tone
         mapping lifts everything, the material is double-sided so the far
         pane is shaded too, and a clearcoat that strong puts a white lobe
         over the whole bubble. Hence a much darker tint, the top of the
         allowed opacity band, and a calmer clearcoat. */
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x101c22, roughness: 0.09, metalness: 0.05,
        transparent: true, opacity: 0.86,
        clearcoat: 0.70, clearcoatRoughness: 0.06, side: THREE.DoubleSide }),
    };
  }

  /* ------------------------------------------------------------- helpers */
  /* Station tables are written nose-first because that is how the drawing
     reads; loft() wants increasing x, so hand it the reverse. */
  function loftStations(THREE, M, rows, segs, yc) {
    var secs = [], i, r;
    for (i = rows.length - 1; i >= 0; i--) {
      r = rows[i];
      secs.push({ x: X(r[0]), w: r[1], h: r[2], zc: r[3], sq: r[4] });
    }
    var geo = M.loft(THREE, secs, segs);
    if (yc) geo.translate(0, yc, 0);
    return geo;
  }

  function box(THREE, mat, sx, sy, sz, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(px, py, pz);
    return m;
  }

  /* ============================================================== BUILD */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = makeMats(THREE);
    /* The first render came back with no team colour visible at all: the
       renderer's ACES curve plus the warm key light drained a mid blue to
       grey, exactly as the house style warns. So the flash keeps C.team's
       HUE but is pushed in saturation and given a little emissive of its
       own, and the flashes themselves are cut larger and stood proud of
       the skin rather than flush with it. */
    var tc = new THREE.Color((C && C.team) || 0x3f7fd0);
    var THS = { h: 0, s: 0, l: 0 };
    tc.getHSL(THS);
    tc.setHSL(THS.h, Math.min(1, THS.s * 1.5 + 0.18),
              Math.min(0.60, Math.max(0.40, THS.l)));
    var team = new THREE.MeshStandardMaterial({
      color: tc, roughness: 0.52, metalness: 0.20,
      emissive: tc, emissiveIntensity: 0.12 });
    var s, i, sgn, m;

    /* ------------------------------------------------------- fuselage */
    /* Slim ogival radome, a cockpit section barely wider than the radome
       base, then a long broadening into the flat aft engine structure that
       finishes as the flat "beaver tail" plate between the nozzles.
       sq falls from 1.10 (round nose) to 0.42 (square aft deck). */
    var BODY = [
      /*  s      w      h      zc     sq  */
      [ 0.00, 0.015, 0.015, -0.36, 1.10],
      [ 0.40, 0.130, 0.120, -0.34, 1.10],
      [ 0.90, 0.250, 0.240, -0.31, 1.08],
      [ 1.50, 0.380, 0.360, -0.27, 1.06],
      [ 2.10, 0.480, 0.460, -0.22, 1.04],
      [ 2.75, 0.560, 0.550, -0.16, 1.00],
      [ 3.50, 0.610, 0.630, -0.10, 0.96],
      [ 4.60, 0.635, 0.710, -0.05, 0.90],
      [ 5.80, 0.640, 0.760, -0.02, 0.86],
      [ 7.00, 0.655, 0.790,  0.00, 0.82],
      [ 8.60, 0.750, 0.800, -0.02, 0.76],
      [10.40, 0.880, 0.790, -0.05, 0.70],
      [12.40, 0.960, 0.760, -0.08, 0.64],
      [14.40, 1.000, 0.720, -0.10, 0.58],
      [16.20, 0.980, 0.660, -0.13, 0.54],
      [17.60, 0.900, 0.540, -0.19, 0.50],
      [18.40, 0.800, 0.300, -0.27, 0.46],
      [19.05, 0.660, 0.150, -0.31, 0.42],
    ];
    g.add(new THREE.Mesh(loftStations(THREE, M, BODY, 32), T.skin));

    /* --------------------------------------- engine nacelles / decks */
    /* Rectangular where they leave the intake, round by the time they
       reach the nozzle: sq walks 0.40 -> 1.00. Outer edge lands on
       y = 2.01, which is what the drawing measures. */
    var NAC = [
      [ 9.00, 0.40, 0.68, -0.12, 0.40],
      [10.20, 0.56, 0.70, -0.13, 0.48],
      [11.60, 0.72, 0.72, -0.14, 0.56],
      [13.00, 0.79, 0.73, -0.15, 0.64],
      [14.60, 0.80, 0.73, -0.15, 0.72],
      [16.20, 0.78, 0.70, -0.15, 0.82],
      [17.20, 0.68, 0.63, -0.15, 0.92],
      [17.85, 0.58, 0.56, -0.15, 1.00],
    ];
    /* tail booms: the outboard structure that runs aft PAST the nozzles
       and carries both the fin and the stabilator pivot. */
    var BOOM = [
      [14.20, 0.42, 0.50, -0.05, 0.60],
      [16.50, 0.38, 0.46, -0.06, 0.60],
      [17.80, 0.34, 0.38, -0.08, 0.62],
      [18.60, 0.28, 0.28, -0.10, 0.66],
      [19.05, 0.17, 0.15, -0.12, 0.70],
    ];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      g.add(new THREE.Mesh(loftStations(THREE, M, NAC, 24, sgn * 1.21), T.skin));
      g.add(new THREE.Mesh(loftStations(THREE, M, BOOM, 18, sgn * 1.66), T.skin));
    }

    /* ------------------------------------- rectangular cheek intakes */
    /* Built as a four-walled open duct rather than a solid block, so the
       mouth really is a mouth: you can see the ramp wedge inside it. The
       top lip leads the bottom lip by 0.40 m, which is the rake that
       makes an Eagle inlet read as an Eagle inlet. */
    var iOut = [[X(5.55), 0.50], [X(5.95), -0.70], [X(9.40), -0.80], [X(9.40), 0.56]];
    var iIn  = [[X(5.82), 0.50], [X(6.17), -0.70], [X(9.40), -0.80], [X(9.40), 0.56]];
    var iTop = [[X(5.55), 0.00], [X(5.55), 0.80], [X(9.40), 0.80], [X(9.40), 0.00]];
    var iBot = [[X(5.95), 0.00], [X(5.95), 0.80], [X(9.40), 0.80], [X(9.40), 0.00]];
    /* the variable ramp: a wedge hanging from the duct roof */
    var iRamp = [[X(5.70), 0.40], [X(5.70), 0.28], [X(8.30), -0.06], [X(8.30), 0.34]];
    /* boundary-layer splitter, standing off the fuselage flank */
    var iSplit = [[X(5.40), 0.44], [X(5.90), -0.62], [X(9.60), -0.72], [X(9.60), 0.50]];

    for (sgn = -1; sgn <= 1; sgn += 2) {
      var yOut = sgn > 0 ? 1.56 : -1.46;     /* outer wall, 0.10 thick */
      var yIn  = sgn > 0 ? 0.86 : -0.76;     /* inner wall */
      m = new THREE.Mesh(M.slab(THREE, iOut, 0.10, "xz"), T.panel);
      m.position.y = yOut; g.add(m);
      m = new THREE.Mesh(M.slab(THREE, iIn, 0.10, "xz"), T.panel);
      m.position.y = yIn; g.add(m);
      /* roof and floor: flat plates spanning the duct */
      m = new THREE.Mesh(M.slab(THREE, iTop, 0.10), T.panel);
      m.position.set(0, sgn > 0 ? 0.76 : -1.56, 0.46); g.add(m);
      m = new THREE.Mesh(M.slab(THREE, iBot, 0.10), T.panel);
      m.position.set(0, sgn > 0 ? 0.76 : -1.56, -0.86); g.add(m);
      /* ramp wedge inside the mouth */
      m = new THREE.Mesh(M.slab(THREE, iRamp, 0.66, "xz"), T.duct);
      m.position.y = sgn > 0 ? 1.49 : -0.83; g.add(m);
      /* duct throat, so the mouth reads dark rather than see-through */
      g.add(box(THREE, T.dark, 0.30, 0.66, 1.16, X(9.20), sgn * 1.16, -0.16));
      /* ramp hinge lines across the intake roof - the "variable" part */
      g.add(box(THREE, T.steel, 0.09, 0.74, 0.07, X(6.75), sgn * 1.16, 0.585));
      g.add(box(THREE, T.steel, 0.09, 0.74, 0.07, X(7.75), sgn * 1.16, 0.585));
      /* splitter plate */
      m = new THREE.Mesh(M.slab(THREE, iSplit, 0.07, "xz"), T.panel);
      m.position.y = sgn > 0 ? 0.74 : -0.67; g.add(m);
      /* boundary-layer bleed louvre on the outer face */
      g.add(box(THREE, T.dark, 1.30, 0.05, 0.30, X(7.60), sgn * 1.575, 0.10));
    }

    /* ------------------------------------------------------------ wing */
    /* Leading edge a straight 46 deg from the root; trailing edge almost
       lateral; the outboard trailing corner sliced away by the rake that
       gives the Eagle its sharp, cropped tip. Root chord on the
       centreline is 7.58 m - 39% of the aircraft. */
    var WING = [
      [ X(8.12), 0.90],   /* leading edge where it leaves the fuselage  */
      [ X(13.93), 6.45],  /* leading edge, near the tip                 */
      [ X(14.48), 6.50],  /* blunt tip                                  */
      [ X(15.52), 5.68],  /* rake corner                                */
      [ X(14.88), 0.90],  /* trailing edge at the fuselage              */
    ];
    /* the thick root glove - the wing is 6.6% thick at the root and 3% at
       the tip, and a constant slab cannot say that on its own */
    var GLOVE = [
      [ X(8.12), 0.90], [ X(10.50), 3.20], [ X(13.10), 3.20], [ X(14.88), 0.90],
    ];
    var WZ = 0.40;
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var wp = [], gp = [];
      for (i = 0; i < WING.length; i++) wp.push([WING[i][0], sgn * WING[i][1]]);
      for (i = 0; i < GLOVE.length; i++) gp.push([GLOVE[i][0], sgn * GLOVE[i][1]]);
      m = new THREE.Mesh(M.slab(THREE, wp, 0.18), T.panel);
      m.position.z = WZ - 0.09; g.add(m);
      m = new THREE.Mesh(M.slab(THREE, gp, 0.42), T.panel);
      m.position.z = WZ - 0.21; g.add(m);
      /* flap and aileron hinge fairings under the trailing edge */
      g.add(box(THREE, T.panel, 0.34, 1.30, 0.13, X(14.60), sgn * 1.90, WZ - 0.14));
      g.add(box(THREE, T.panel, 0.30, 1.10, 0.12, X(14.90), sgn * 3.60, WZ - 0.13));
    }
    /* M61 gun fairing, starboard wing root, with the muzzle port */
    g.add(box(THREE, T.panel, 2.00, 0.46, 0.26, X(9.00), -1.16, WZ + 0.32));
    m = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.24, 10), T.dark);
    m.rotation.z = Math.PI / 2;
    m.position.set(X(8.05), -1.16, WZ + 0.32);
    g.add(m);

    /* ----------------------------------------------------- stabilators */
    /* All-moving slabs mounted low and far outboard, with the snag in the
       leading edge at 60% span and the raked-off tip. */
    var STAB = [
      [ X(15.52), 1.30],
      [ X(16.73), 2.58],
      [ X(16.55), 2.62],   /* the snag: outer panel steps forward */
      [ X(18.30), 4.10],
      [ X(18.56), 4.28],
      [ X(19.42), 3.80],
      [ X(18.84), 1.30],
    ];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var sp = [];
      for (i = 0; i < STAB.length; i++) sp.push([STAB[i][0], sgn * STAB[i][1]]);
      m = new THREE.Mesh(M.slab(THREE, sp, 0.17), T.panel);
      m.position.z = -0.29; g.add(m);
      /* pivot fairing where the stabilator enters the boom */
      g.add(box(THREE, T.panel, 1.90, 0.30, 0.34, X(17.30), sgn * 1.42, -0.20));
    }

    /* ------------------------------------------------------------ fins */
    /* The cue that matters most: two big fins standing 3.1 m apart on the
       outboard engine decks, not a pair leaning together over the spine.
       Squared tips with the ECM fairing projecting forward at the top. */
    var FIN = [
      [ X(14.90), 0.42],   /* root leading edge  */
      [ X(17.15), 3.47],   /* tip leading edge   */
      [ X(19.05), 3.47],   /* tip trailing edge  */
      [ X(18.85), 0.42],   /* root trailing edge */
    ];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      m = new THREE.Mesh(M.slab(THREE, FIN, 0.15, "xz"), T.panel);
      m.position.y = sgn > 0 ? 1.63 : -1.48;
      g.add(m);
      var fy = sgn * 1.555;
      /* forward tip fairing (ALQ-135 antenna) and the aft tip pod */
      g.add(box(THREE, T.panel, 0.72, 0.19, 0.30, X(16.85), fy, 3.30));
      g.add(box(THREE, T.panel, 0.52, 0.17, 0.26, X(19.28), fy, 3.28));
      /* tip cap */
      g.add(box(THREE, T.panel, 1.95, 0.20, 0.09, X(18.10), fy, 3.49));
      /* fin root fairing running forward along the deck */
      g.add(box(THREE, T.panel, 1.60, 0.26, 0.24, X(14.40), fy, 0.44));
      /* rudder hinge line, a shallow step down the trailing edge */
      g.add(box(THREE, T.panel, 0.10, 0.17, 2.90, X(18.62), fy, 1.90));
      /* team band across the fin - squadron marking, reads at map zoom */
      g.add(box(THREE, team, 1.72, 0.34, 0.62, X(17.90), fy, 2.86));
    }

    /* --------------------------------------------------------- nozzles */
    /* Convergent-divergent cans with the petals bare, which on a hard-worked
       Eagle are the most heat-stained thing on the aircraft. */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var ny = sgn * 1.21;
      var can = new THREE.Mesh(
        new THREE.CylinderGeometry(0.53, 0.45, 0.80, 16, 1, true), T.burnt);
      can.rotation.z = Math.PI / 2;
      can.position.set(X(17.46), ny, -0.15);
      g.add(can);
      /* petal ribs */
      for (i = 0; i < 14; i++) {
        var a = i / 14 * Math.PI * 2;
        var rib = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.045, 0.13), T.steel);
        rib.position.set(X(17.46), ny + Math.cos(a) * 0.50, -0.15 + Math.sin(a) * 0.50);
        rib.rotation.x = -a;
        g.add(rib);
      }
      /* the hot dark throat */
      var thr = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.30, 0.55, 14, 1, true), T.dark);
      thr.rotation.z = Math.PI / 2;
      thr.position.set(X(17.70), ny, -0.15);
      g.add(thr);
      g.add(box(THREE, T.dark, 0.05, 0.62, 0.62, X(17.98), ny, -0.15));
    }

    /* ------------------------------------------------------ dorsal brake */
    /* The Eagle's speedbrake is enormous and sits on the spine directly
       behind the canopy. Closed at cruise, but the panel still reads. */
    var brake = [[X(7.60), 0.62], [X(7.60), -0.62], [X(9.90), -0.70], [X(9.90), 0.70]];
    m = new THREE.Mesh(M.slab(THREE, brake, 0.07), T.panel);
    m.position.z = 0.775; g.add(m);

    /* ---------------------------------------------------------- canopy */
    /* Bubble canopy set far forward: the windscreen base is at station
       2.95, right where the radome ends, which is the single most
       recognisable thing about the aircraft from the side. */
    var CANOPY = [
      [ 3.05, 0.08, 0.05, 0.60],
      [ 3.70, 0.31, 0.26, 0.71],
      [ 4.40, 0.45, 0.38, 0.79],
      [ 5.15, 0.50, 0.44, 0.83],
      [ 5.90, 0.48, 0.42, 0.83],
      [ 6.60, 0.36, 0.31, 0.81],
    ];
    g.add(new THREE.Mesh(loftStations(THREE, M, CANOPY, 24), T.glass));
    /* the metal fairing that carries the canopy back into the spine */
    var SPINE = [
      [ 6.45, 0.37, 0.32, 0.81],
      [ 7.10, 0.32, 0.25, 0.79],
      [ 7.80, 0.22, 0.15, 0.77],
      [ 8.40, 0.12, 0.07, 0.76],
    ];
    g.add(new THREE.Mesh(loftStations(THREE, M, SPINE, 16), T.skin));
    /* windscreen bow, canopy sills, and the frame arch at the aft end */
    g.add(box(THREE, T.steel, 0.10, 0.66, 0.46, X(4.28), 0, 0.80));
    for (sgn = -1; sgn <= 1; sgn += 2)
      g.add(box(THREE, T.steel, 3.10, 0.07, 0.09, X(5.30), sgn * 0.47, 0.64));
    g.add(box(THREE, T.panel, 0.16, 0.64, 0.46, X(6.62), 0, 0.79));
    /* cockpit: coaming, HUD, seat - visible through the glass, nothing more */
    g.add(box(THREE, T.dark, 0.44, 0.60, 0.20, X(4.72), 0, 0.66));
    g.add(box(THREE, T.steel, 0.07, 0.36, 0.30, X(4.55), 0, 0.88));
    g.add(box(THREE, T.dark, 0.34, 0.44, 0.52, X(5.62), 0, 0.66));
    g.add(box(THREE, T.dark, 0.22, 0.40, 0.24, X(5.35), 0, 0.92));

    /* ----------------------------------------------------------- stores */
    /* Classic air-superiority fit: four fuselage-corner Sparrows, a pair of
       Sidewinders on each wing pylon, and the centreline bag. */
    function missile(len, dia, px, py, pz, finSpan) {
      var grp = new THREE.Group();
      var bod = new THREE.Mesh(
        new THREE.CylinderGeometry(dia * 0.5, dia * 0.5, len * 0.84, 10), T.metal);
      bod.rotation.z = Math.PI / 2;
      grp.add(bod);
      var nz = new THREE.Mesh(new THREE.ConeGeometry(dia * 0.5, len * 0.18, 10), T.dark);
      nz.rotation.z = -Math.PI / 2;
      nz.position.x = len * 0.51;
      grp.add(nz);
      for (var k = 0; k < 4; k++) {
        var an = k / 4 * Math.PI * 2 + Math.PI / 4;
        var f = new THREE.Mesh(
          new THREE.BoxGeometry(len * 0.16, 0.035, finSpan), T.steel);
        f.position.set(-len * 0.38, Math.cos(an) * finSpan * 0.55,
                       Math.sin(an) * finSpan * 0.55);
        f.rotation.x = -an;
        grp.add(f);
        var w = new THREE.Mesh(
          new THREE.BoxGeometry(len * 0.13, 0.030, finSpan * 0.80), T.steel);
        w.position.set(len * 0.22, Math.cos(an) * finSpan * 0.45,
                       Math.sin(an) * finSpan * 0.45);
        w.rotation.x = -an;
        grp.add(w);
      }
      grp.position.set(px, py, pz);
      return grp;
    }

    /* 610 gallon wing bag - 5.55 m long on a 0.66 m barrel */
    var WTANK = [
      [ 8.30, 0.05, 0.05, -0.62, 1.0],
      [ 8.85, 0.26, 0.26, -0.62, 1.0],
      [ 9.70, 0.33, 0.33, -0.62, 1.0],
      [12.20, 0.33, 0.33, -0.62, 1.0],
      [13.10, 0.26, 0.26, -0.63, 1.0],
      [13.85, 0.09, 0.09, -0.64, 1.0],
    ];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      /* fuselage-corner AIM-7, tucked into the lower corner of the trunk */
      g.add(missile(3.66, 0.20, X(10.10), sgn * 1.82, -0.74, 0.62));
      g.add(missile(3.66, 0.20, X(10.70), sgn * 1.30, -0.94, 0.62));
      /* Wing pylon. Both reference photographs show the same fit: a 610
         gallon bag on the pylon and a Sidewinder on each shoulder rail
         beside it, which is also what gives the Eagle its loaded, heavy
         look from three-quarters below. */
      g.add(box(THREE, T.panel, 2.40, 0.18, 0.62, X(11.40), sgn * 2.90, 0.02));
      g.add(new THREE.Mesh(loftStations(THREE, M, WTANK, 18, sgn * 2.90), T.skin));
      for (i = 0; i < 4; i++) {
        var wa = i / 4 * Math.PI * 2 + Math.PI / 4;
        var wf = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.05, 0.56), T.panel);
        wf.position.set(X(13.05), sgn * 2.90 + Math.cos(wa) * 0.30,
                        -0.62 + Math.sin(wa) * 0.30);
        wf.rotation.x = -wa;
        g.add(wf);
      }
      g.add(box(THREE, T.steel, 1.80, 0.98, 0.10, X(11.20), sgn * 2.90, -0.18));
      g.add(missile(2.87, 0.17, X(11.10), sgn * 2.90 + 0.46, -0.30, 0.44));
      g.add(missile(2.87, 0.17, X(11.10), sgn * 2.90 - 0.46, -0.30, 0.44));
    }
    /* centreline 600 gallon tank */
    var TANK = [
      [ 7.30, 0.06, 0.06, -1.25, 1.0],
      [ 7.80, 0.28, 0.28, -1.25, 1.0],
      [ 8.60, 0.42, 0.42, -1.25, 1.0],
      [11.20, 0.44, 0.44, -1.25, 1.0],
      [12.30, 0.36, 0.36, -1.26, 1.0],
      [12.90, 0.16, 0.16, -1.27, 1.0],
    ];
    g.add(new THREE.Mesh(loftStations(THREE, M, TANK, 18), T.skin));
    for (i = 0; i < 4; i++) {
      var ta = i / 4 * Math.PI * 2 + Math.PI / 4;
      var tf = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.05, 0.52), T.panel);
      tf.position.set(X(12.30), Math.cos(ta) * 0.36, -1.26 + Math.sin(ta) * 0.36);
      tf.rotation.x = -ta;
      g.add(tf);
    }
    g.add(box(THREE, T.panel, 1.20, 0.20, 0.34, X(9.80), 0, -0.98));

    /* ------------------------------------------------------------- gear */
    /* Named so render3d.js can stow it in cruise and drop it on the apron. */
    var gear = new THREE.Group();
    gear.name = "gear";
    g.add(gear);

    function leg(px, py, topZ, hubZ, tyreR, tyreW, strutR) {
      var h = topZ - hubZ;
      var st = new THREE.Mesh(
        new THREE.CylinderGeometry(strutR, strutR * 1.25, h, 8), T.steel);
      st.position.set(px, py, hubZ + h * 0.5);
      gear.add(st);
      var ol = new THREE.Mesh(
        new THREE.CylinderGeometry(strutR * 1.5, strutR * 1.5, h * 0.34, 8), T.metal);
      ol.position.set(px, py, topZ - h * 0.20);
      gear.add(ol);
      var wh = new THREE.Mesh(
        new THREE.CylinderGeometry(tyreR, tyreR, tyreW, 16), T.rubber);
      wh.rotation.x = Math.PI / 2;
      wh.position.set(px, py, hubZ);
      gear.add(wh);
      var hub = new THREE.Mesh(
        new THREE.CylinderGeometry(tyreR * 0.52, tyreR * 0.52, tyreW * 1.12, 12), T.metal);
      hub.rotation.x = Math.PI / 2;
      hub.position.set(px, py, hubZ);
      gear.add(hub);
    }
    /* nose leg under the intake lips, mains at 2.75 m track under the wing */
    leg(X(5.90), 0, -0.72, -1.78, 0.30, 0.17, 0.075);
    gear.add(box(THREE, T.panel, 1.30, 0.09, 0.72, X(5.30), 0.16, -1.10));
    leg(X(10.80),  1.375, -0.84, -1.64, 0.44, 0.24, 0.095);
    leg(X(10.80), -1.375, -0.84, -1.64, 0.44, 0.24, 0.095);
    for (sgn = -1; sgn <= 1; sgn += 2) {
      gear.add(box(THREE, T.panel, 1.60, 0.08, 0.86, X(10.60), sgn * 1.02, -1.24));
      /* retraction jack, which is what makes a leg look engineered */
      var jk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.92, 6), T.metal);
      jk.rotation.y = 0.55;
      jk.position.set(X(10.30), sgn * 1.375, -1.18);
      gear.add(jk);
    }

    /* ------------------------------------------------- probes and lights */
    /* A production Eagle carries NO nose boom. The first build had one and
       it turned the radome into a needle - the aircraft read as a MiG-21 in
       the side view. Short flank pitot probes instead. */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var pit = new THREE.Mesh(
        new THREE.CylinderGeometry(0.024, 0.030, 0.46, 6), T.steel);
      pit.rotation.z = Math.PI / 2;
      pit.position.set(X(1.34), sgn * 0.33, -0.36);
      g.add(pit);
    }
    /* angle-of-attack vanes on the radome flanks */
    for (sgn = -1; sgn <= 1; sgn += 2)
      g.add(box(THREE, T.steel, 0.26, 0.05, 0.13, X(2.30), sgn * 0.50, -0.20));
    /* blade antennas above the spine and under the forward fuselage */
    g.add(box(THREE, T.dark, 0.30, 0.05, 0.30, X(9.60), 0, 0.86));
    g.add(box(THREE, T.dark, 0.34, 0.05, 0.34, X(4.60), 0, -0.86));
    g.add(box(THREE, T.dark, 0.30, 0.05, 0.30, X(5.60), 0, -0.88));
    /* arrestor hook fairing on the keel between the nozzles */
    g.add(box(THREE, T.metal, 1.40, 0.16, 0.16, X(17.10), 0, -0.52));

    /* Navigation lenses. A nav light IS a coloured glass lens, so these are
       clones of the GLASS tier with an emissive added, not a fourth tier. */
    function lens(col, emi, ei) {
      var lm = T.glass.clone();
      lm.color = new THREE.Color(col);
      lm.emissive = new THREE.Color(emi);
      lm.emissiveIntensity = ei;
      lm.opacity = 0.88;
      return lm;
    }
    var red = lens(0xd8382a, 0x8c1a10, 0.9);
    var grn = lens(0x36d059, 0x11761f, 0.9);
    var wht = lens(0xe6ecef, 0x9aa4a8, 0.7);
    m = new THREE.Mesh(new THREE.SphereGeometry(0.10, 8, 6), red);
    m.position.set(X(14.10), 6.34, WZ); g.add(m);
    m = new THREE.Mesh(new THREE.SphereGeometry(0.10, 8, 6), grn);
    m.position.set(X(14.10), -6.34, WZ); g.add(m);
    for (sgn = -1; sgn <= 1; sgn += 2) {
      m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), wht);
      m.position.set(X(19.20), sgn * 1.555, 3.36); g.add(m);
    }

    /* ------------------------------------------------------- team flashes */
    /* The fin bands above are the primary mark; these put ownership on the
       wing uppers too, so it reads from directly overhead on a busy map. */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      /* wing upper flash, standing 50 mm proud so it survives at map zoom */
      g.add(box(THREE, team, 1.45, 1.70, 0.06, X(12.40), sgn * 4.05, WZ + 0.185));
      /* and one underneath, for when the aircraft banks away from you */
      g.add(box(THREE, team, 1.25, 1.45, 0.06, X(12.40), sgn * 4.05, WZ - 0.185));
      /* a chevron on the flat outer cheek of each intake trunk */
      g.add(box(THREE, team, 0.90, 0.09, 0.36, X(8.80), sgn * 1.605, 0.14));
    }
    /* nose flash under the radome */
    g.add(box(THREE, team, 1.10, 0.40, 0.06, X(2.50), 0, -0.72));
    /* spine flash - in an RTS the aircraft is mostly seen from above, so the
       top surfaces are where ownership actually has to read */
    g.add(box(THREE, team, 1.20, 0.50, 0.06, X(10.60), 0, 0.765));

    return g;
  }

  UNIT_MODELS["nato_e80_fighter"] = { len: 19.43, build: build };
})();
