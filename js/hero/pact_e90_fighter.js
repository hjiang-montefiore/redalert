/* ============ pact_e90_fighter -- the MiG-29 family (HERO MODEL) ============

   Redrawn 2026-10-24 from a scale three-view and period photographs. Every
   primary shape below is a station table measured off the drawing, not a
   generic fighter tuned by eye.

   REFERENCES (Wikimedia Commons, fetched at 960 px)
     D  "Mikoyan MiG-29 3-view.svg" -- side, plan and head-on of the 9.12.
        Scale: 748 px pitot tip to stabilator tip = 17.32 m, so 0.02316 m/px;
        the span then measures 11.28 m against the published 11.36 m.
     A  "Soviet MiG-29 DF-ST-99-04977.JPG" (US DoD): a Soviet 9.12 parked,
        head-on three-quarter -- intakes, LERX louvres, red fin stars.
     B  "DD-ST-87-08189.jpg" (US DoD, 1987): a Soviet 9.12 in flight, side.
     C  "MiG-29 at Farnborough.jpg" (1988): the Soviet two-tone grey scheme
        and the dark anti-glare panel ahead of the windscreen.
     E  "Mikoyan MiG-29 Fulcrum 10 blue (8605744566).jpg": a Soviet 9.12 side
        three-quarter -- the overwing louvres, canted fins, slim spine.
     F  "04 Blue Mikoyan Mig-29 Russian Air Force (8019116872).jpg": an early
        9.12 -- grey radome, dark anti-glare panel, light grey overall.
     G  "36507 Mikoyan-Gurevich MiG-29SE Fulcrum-C Bangladesh Air Force
        2960536507 VGHS.jpg": the 9.13 hump, side on (export paint, used for
        the shape only).
     H  "Vooruzhenie ... rossiiskoi voennoi bazy v Armenii" (mil.ru, 2010s):
        Russian MiG-29s at Erebuni -- the Russian-era blue-grey two-tone.

   RECOGNITION LIST (each must show at game zoom)
     1. Ogival LERX: the plan outline flares smoothly out of the forebody
        from x 4.3 to meet the wing leading edge at y 1.66 (D plan) -- CB.
     2. Blended fuselage: one broad flat lifting body from the LERX to the
        tail booms, the forebody and spine riding on it (D side and plan).
     3. Widely spaced engine nacelles hung under it with an open tunnel
        between them, 0.7 m deep (D head-on, A) -- NAC.
     4. Raked intakes: upper lip under the LERX at x 1.97, lower lip set
        back 1.3 m (D side, E); a dark mouth with the closing door (the
        intake ramp) stowed against the roof in flight (A).
     5. Overwing auxiliary louvres on the LERX upper surface, five slots a
        side (D plan; E shows them) -- every row here is a 9.12 or 9.13.
     6. Twin fins canted outboard on the booms, 47 deg leading edge, with
        the forward root fillet (D side, A, E).
     7. Spine: the 9.12 slopes straight down from the canopy to the tail
        (D, E); the 9.13 carries the hump (G) -- SPINE13.
     8. Tall bubble canopy on a drooped radome, the KOLS IRST ball offset to
        starboard ahead of the windscreen (D plan, A).
     9. 42 deg wing with a slightly swept trailing edge, low stabilators
        beside the nozzles, reaching aft of them (D plan).
    10. Long RD-33 nozzles, spaced 1.74 m centre to centre (D plan).
    11. Paint by period: Soviet light grey with grey-green disruptive
        pattern, pale belly, grey radome, dark anti-glare panel (A, C, F);
        the Russian 2010s blue-grey two-tone (H). Red star, white edged, on
        the outer face of each fin (A, B, E).

   MEASUREMENTS (drawing D against published figures)
     length incl. probe 17.32 m (published 17.32) -- model X extent 17.3;
     span 11.36 m (drawing 11.28; model 11.36); height 4.73 m (the fin tip
     stands 3.01 m above the probe line, so the ground is at z -1.72);
     stabilator span 7.78 m (model 7.74); track 3.09 m and wheelbase
     3.645 m (published) with the main legs at x -2.2 (D side).

   VARIANTS. build(THREE, M, C, which):
     "9.12"   pact_e80_fighter (1983): slim spine, the small ventral fins of
              the first batches, Soviet two-tone grey.
     "9.13S"  pact_e90_fighter (1991): the 9.13 hump, no ventral fins (G),
              the same Soviet two-tone grey (no 1991 9.13 photograph was
              found; A, C, F and H show one scheme across the period).
     "9.13R"  fighter_p (the present-day row, MiG-29S): the hump, Russian
              2010s blue-grey (H).
     "9.12G"  deu_e90_mig29, Luftwaffe light grey (kept from the old file:
              Gatow 29+03 photographs); no star.
     "9.12K"  kpa_e00_fighter, slim spine, blue-grey (kept from the old
              file); no star.
   Corrected from the old file: it painted the 9.13S and fighter_p dark grey
   0x4f575d, which no photograph here shows; its nacelles sat 1.28 m out
   (D: 0.74 m at the intake, 0.87 m at the nozzle); its LERX ran only to
   y 2.0 m at x 1.6, and its louvres sat outboard on the wing glove instead
   of beside the spine (D plan: x 0.6..1.65, y 0.52..1.08).

   Model space: +X nose, +Y left (port), +Z up, metres. Gear RETRACTS, so its
   group is "gear". Merged to one mesh per material (mergeByMaterial).
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var MiG29Hero = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var HALF_PI = Math.PI / 2;
  var PI = Math.PI;

  /* ---------------------------------------------------------- paint ------
     Sampled off A, C, F (Soviet) and H (Russian) and taken to about 0.85 of
     their level; the ACES pass lifts mid greys. lt: the field colour; dk:
     the disruptive tone; bl: the belly; rd: the radome; ag: the anti-glare
     panel. star: whether the row wears the red star. */
  var PAL = {
    sov:  { id: "sov",  lt: "#a2a9a7", dk: "#76847e", bl: "#a9b3b6", rd: "#7f8689", ag: "#2b2f31", star: true },
    rus:  { id: "rus",  lt: "#91a1a6", dk: "#6a7c83", bl: "#a3b1b6", rd: "#80878b", ag: "#2b2f31", star: true },
    sea:  { id: "sea",  lt: "#abb5bb", dk: "#9aa4ab", bl: "#bec7cd", rd: "#8f979b", ag: "#3a3f42", star: false },
    blu:  { id: "blu",  lt: "#8799aa", dk: "#75899c", bl: "#a2b4c4", rd: "#7c8790", ag: "#2e3236", star: false },
  };
  var SKIN_R = 0.86, SKIN_M = 0.06;

  /* ---------------------------------------------------------------- rng -- */
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function star(g, cx, cy, r) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * r * k, y = cy + Math.sin(a) * q * r * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dad6"; path(1.18); g.fill();
    g.fillStyle = "#a8241c"; path(1.0); g.fill();
  }

  /* ============================================================ texture ==
     Lofts here run NOSE FIRST, so u = 0 at the nose and 1 at the tail, and
     v = 0.25 on the top, 0.75 on the belly. After the canvas flipY the top
     lands at canvas row 0.75H and the belly at 0.25H: camouflage lives in
     the lower half of the canvas, belly grey in the upper half. */
  function camo(g, W, H, pal, R, y0, y1) {
    g.fillStyle = pal.dk;
    for (var i = 0; i < 34; i++) {
      var cx = R() * W, cy = y0 + R() * (y1 - y0);
      var rx = 50 + R() * 100, ry = 20 + R() * 44;
      g.globalAlpha = 0.88;
      g.beginPath();
      /* a lumpy blob, the soft-edged freehand pattern the type wore */
      for (var k = 0; k <= 12; k++) {
        var a = k / 12 * PI * 2, q = 0.72 + R() * 0.42;
        var x = cx + Math.cos(a) * rx * q, y = cy + Math.sin(a) * ry * q;
        if (k) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath(); g.fill();
    }
    g.globalAlpha = 1;
  }
  function seams(g, W, H, R, n) {
    g.strokeStyle = "rgba(20,22,24,0.30)"; g.lineWidth = 1.4;
    var x = 0;
    while (x < W) { x += 30 + R() * 60; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(20,22,24,0.18)"; g.lineWidth = 1;
    for (var i = 0; i < n; i++) {
      var px = R() * W, py = R() * H, L = 30 + R() * 120;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(px, py); g.lineTo(px + L, py); }
      else { g.moveTo(px, py); g.lineTo(px, py + L * 0.5); }
      g.stroke();
    }
    g.strokeStyle = "rgba(20,22,24,0.32)";
    for (i = 0; i < 18; i++) g.strokeRect(R() * W, R() * H, 12 + R() * 30, 8 + R() * 18);
    g.fillStyle = "rgba(0,0,0,0.20)";
    for (i = 0; i < 30; i++) {
      var ry = R() * H, rx = R() * W * 0.8, m = 14 + ((R() * 30) | 0);
      for (var k = 0; k < m; k++) g.fillRect(rx + k * 7, ry, 1.6, 1.6);
    }
  }
  function canvas(W, H) {
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H; return cv;
  }
  function texOf(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  /* the shared skin of the lofts: camouflaged top, pale belly, soot aft */
  var _sk = {};
  function skinSheet(THREE, pal) {
    if (_sk[pal.id] !== undefined) return _sk[pal.id];
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(29013);
      g.fillStyle = pal.lt; g.fillRect(0, 0, W, H);
      camo(g, W, H, pal, R, H * 0.50, H * 1.02);
      var b = g.createLinearGradient(0, 0, 0, H * 0.5);
      /* rows 0 and 0.5H are the two sides: fade to the field colour at
         both, so port and starboard carry the same soft demarcation */
      b.addColorStop(0.00, "rgba(0,0,0,0)");
      b.addColorStop(0.22, pal.bl);
      b.addColorStop(0.78, pal.bl);
      b.addColorStop(1.00, "rgba(0,0,0,0)");
      g.globalAlpha = 0.92; g.fillStyle = b; g.fillRect(0, 0, W, H * 0.5); g.globalAlpha = 1;
      seams(g, W, H, R, 60);
      /* exhaust soot over the last fifth of every loft (u -> 1 is the tail) */
      var s = g.createLinearGradient(W * 0.78, 0, W, 0);
      s.addColorStop(0, "rgba(28,26,24,0)"); s.addColorStop(1, "rgba(28,26,24,0.42)");
      g.fillStyle = s; g.fillRect(W * 0.78, 0, W * 0.22, H);
      _sk[pal.id] = texOf(THREE, cv);
    } catch (e) { _sk[pal.id] = null; }
    return _sk[pal.id];
  }

  /* the forebody and spine get their own sheet so the radome and the
     anti-glare panel land on the nose alone. FUS runs x 7.55 -> -7.20, so
     u = (7.55 - x) / 14.75: the radome joint at x 6.45 is u 0.075 and the
     windscreen at 4.66 is u 0.196. */
  var _bd = {};
  function bodySheet(THREE, pal) {
    if (_bd[pal.id] !== undefined) return _bd[pal.id];
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(55117);
      g.fillStyle = pal.lt; g.fillRect(0, 0, W, H);
      camo(g, W, H, pal, R, H * 0.52, H * 1.02);
      var b = g.createLinearGradient(0, 0, 0, H * 0.5);
      b.addColorStop(0.00, "rgba(0,0,0,0)"); b.addColorStop(0.22, pal.bl);
      b.addColorStop(0.78, pal.bl); b.addColorStop(1.00, "rgba(0,0,0,0)");
      g.globalAlpha = 0.92; g.fillStyle = b; g.fillRect(0, 0, W, H * 0.5); g.globalAlpha = 1;
      seams(g, W, H, R, 50);
      /* the nose ahead of the radome joint is plain radome grey */
      g.fillStyle = pal.rd; g.fillRect(0, 0, W * 0.075, H);
      g.fillStyle = "rgba(20,22,24,0.45)"; g.fillRect(W * 0.075, 0, 3, H);
      /* anti-glare panel: from the radome joint to the windscreen, over the
         top third of the section (C, F) */
      g.fillStyle = pal.ag;
      g.beginPath();
      g.moveTo(W * 0.078, H * 0.66); g.lineTo(W * 0.196, H * 0.60);
      g.lineTo(W * 0.196, H * 0.90); g.lineTo(W * 0.078, H * 0.84);
      g.closePath(); g.fill();
      var s = g.createLinearGradient(W * 0.80, 0, W, 0);
      s.addColorStop(0, "rgba(28,26,24,0)"); s.addColorStop(1, "rgba(28,26,24,0.40)");
      g.fillStyle = s; g.fillRect(W * 0.80, 0, W * 0.20, H);
      _bd[pal.id] = texOf(THREE, cv);
    } catch (e) { _bd[pal.id] = null; }
    return _bd[pal.id];
  }

  /* fins: their slab caps carry shape coordinates (x, z above the root), so
     this sheet is fitted to the fin box with repeat and offset, and the red
     star lands on the outer face where A, B and E put it. */
  var FIN_X0 = -7.30, FIN_X1 = -3.20, FIN_Z0 = -0.10, FIN_Z1 = 2.50;
  var _fn = {};
  function finSheet(THREE, pal) {
    if (_fn[pal.id] !== undefined) return _fn[pal.id];
    try {
      var W = 512, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(7741);
      g.fillStyle = pal.lt; g.fillRect(0, 0, W, H);
      camo(g, W, H, pal, R, 0, H);
      seams(g, W, H, R, 16);
      function U(x) { return (x - FIN_X0) / (FIN_X1 - FIN_X0) * W; }
      function V(z) { return (1 - (z - FIN_Z0) / (FIN_Z1 - FIN_Z0)) * H; }
      /* dielectric fin cap and the rudder hinge line */
      g.fillStyle = pal.rd; g.fillRect(U(-7.30), V(2.50), U(-6.10) - U(-7.30), V(2.30) - V(2.50));
      g.strokeStyle = "rgba(20,22,24,0.45)"; g.lineWidth = 2;
      g.beginPath(); g.moveTo(U(-6.62), V(2.25)); g.lineTo(U(-6.62), V(0.35)); g.stroke();
      if (pal.star) star(g, U(-5.90), V(1.30), 0.40 / (FIN_Z1 - FIN_Z0) * H);
      var t = texOf(THREE, cv);
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.repeat.set(1 / (FIN_X1 - FIN_X0), 1 / (FIN_Z1 - FIN_Z0));
      t.offset.set(-FIN_X0 / (FIN_X1 - FIN_X0), -FIN_Z0 / (FIN_Z1 - FIN_Z0));
      _fn[pal.id] = t;
    } catch (e) { _fn[pal.id] = null; }
    return _fn[pal.id];
  }

  /* ============================================================ materials ==
     SKIN (body, skin, panel, fin, team), METAL (metal, hot, ink) and GLASS.
     This three.js build hands a flat material colour to the shader as if it
     were already linear, so the untextured tiers are given dark values: a
     0x0e1012 duct once measured #585d60 on screen. The team flash is
     exactly C.team so eraPaint leaves it alone.                             */
  function materials(THREE, C, pal) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    var skin = sk(skinSheet(THREE, pal), pal.lt);
    var body = sk(bodySheet(THREE, pal), pal.lt);
    var fin = sk(finSheet(THREE, pal), pal.lt);
    /* wings and stabilators: raw-metre UVs. At 0.040 a metre the whole
       11.4 m span lands in v 0.02..0.48, the camouflaged half of the sheet;
       a larger repeat put the port wing on the belly grey. */
    var ptex = skinSheet(THREE, pal), panel;
    if (ptex) {
      var c = ptex.clone(); c.needsUpdate = true;
      c.wrapS = c.wrapT = THREE.RepeatWrapping;
      c.repeat.set(0.040, 0.040);
      c.offset.set(0.40, 0.25);
      panel = sk(c, pal.lt);
    } else panel = sk(null, pal.lt);

    var team = new THREE.MeshStandardMaterial({
      color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
      roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
    var metal = new THREE.MeshStandardMaterial({
      color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide });
    var hot = new THREE.MeshStandardMaterial({
      color: 0x1b1c1c, roughness: 0.62, metalness: 0.40, side: THREE.DoubleSide });
    /* duct and wheel-well black, and the tyres */
    var ink = new THREE.MeshStandardMaterial({
      color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide });
    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
      transparent: true, opacity: 0.84, side: THREE.DoubleSide });
    return { skin: skin, body: body, fin: fin, panel: panel, team: team,
             metal: metal, hot: hot, ink: ink, glass: glass };
  }

  /* ================================================================ loft ==
     M.loft with two additions: a section may sit off the centreline (yc),
     and may be RAKED (rk): its vertices move along x in proportion to their
     depth below the section top, so the raked intake mouth is one ring.
     Sections run nose first, which winds the skin outward.                  */
  function loftR(THREE, secs, segs) {
    var pos = [], uv = [], idx = [];
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i], e = s.sq || 1;
      for (var j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t);
        var y = (s.yc || 0) + s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        var dz = s.h * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        var x = s.x + (s.rk || 0) * (s.h - dz) / (2 * s.h);
        pos.push(x, y, (s.zc || 0) + dz);
        uv.push((s.x - x0) / (x1 - x0), j / segs);
      }
    }
    var ring = segs + 1;
    for (i = 0; i < secs.length - 1; i++)
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function mirrorSecs(secs) {
    var o = [];
    for (var i = 0; i < secs.length; i++) {
      var s = {}, k;
      for (k in secs[i]) s[k] = secs[i][k];
      s.yc = -(s.yc || 0);
      o.push(s);
    }
    return o;
  }
  function mirrorY(pts) {
    var o = [];
    for (var i = 0; i < pts.length; i++) o.push([pts[i][0], -pts[i][1]]);
    return o;
  }
  function between(secs, x) {
    /* interpolated section of a nose-first table at x */
    for (var i = 1; i < secs.length; i++) {
      var a = secs[i - 1], b = secs[i];
      if (x <= a.x && x >= b.x) {
        var t = (a.x - x) / (a.x - b.x), o = { x: x };
        ["w", "h", "zc", "sq", "yc"].forEach(function (k) {
          o[k] = (a[k] || 0) + ((b[k] || 0) - (a[k] || 0)) * t;
        });
        return o;
      }
    }
    return secs[x > secs[0].x ? 0 : secs.length - 1];
  }

  /* ========================================================= station tables
     Measured off D: x = (386 - px) * 0.02316, z = (139 - py) * 0.02316, with
     the probe line at z 0. w is the half width, h the half height.

     FUS -- radome, cockpit and the 9.12 spine, one body. Top line: radome
     0.53 at x 6.62, windscreen base 0.97 at 4.66, sill 1.08, the canopy's
     rear fairing 1.40 at x 2.0, then straight down to 0.70 at the fin root
     fillet (x -3.3) and 0.42 at the tail. */
  var FUS = [
    { x:  7.55, w: 0.04, h: 0.03, zc: 0.03, sq: 1.00 },
    { x:  7.25, w: 0.15, h: 0.145, zc: 0.10, sq: 1.00 },
    { x:  6.62, w: 0.31, h: 0.335, zc: 0.195, sq: 0.96 },
    { x:  5.81, w: 0.43, h: 0.455, zc: 0.285, sq: 0.92 },
    { x:  4.66, w: 0.50, h: 0.56, zc: 0.41, sq: 0.86 },
    { x:  3.50, w: 0.52, h: 0.59, zc: 0.49, sq: 0.84 },
    { x:  2.60, w: 0.52, h: 0.62, zc: 0.54, sq: 0.82 },
    { x:  2.00, w: 0.48, h: 0.72, zc: 0.68, sq: 0.80 },
    { x:  0.83, w: 0.46, h: 0.58, zc: 0.55, sq: 0.80 },
    { x: -0.32, w: 0.46, h: 0.48, zc: 0.47, sq: 0.80 },
    { x: -2.00, w: 0.45, h: 0.39, zc: 0.40, sq: 0.80 },
    { x: -3.30, w: 0.44, h: 0.34, zc: 0.36, sq: 0.80 },
    { x: -5.00, w: 0.42, h: 0.27, zc: 0.35, sq: 0.80 },
    { x: -6.40, w: 0.36, h: 0.21, zc: 0.31, sq: 0.80 },
    { x: -7.20, w: 0.26, h: 0.15, zc: 0.27, sq: 0.85 },
  ];
  /* the 9.13 raises the spine behind the canopy and holds it up almost to
     the fins (G): top 1.36 at x 0.83 against the 9.12's 1.13, 1.17 at
     x -2.0 against 0.79 */
  var HUMP = { "0.83": 1.36, "-0.32": 1.30, "-2": 1.17, "-3.3": 0.98 };
  function fusFor(V) {
    if (!V.hump) return FUS;
    var o = [];
    for (var i = 0; i < FUS.length; i++) {
      var s = FUS[i], top = HUMP[String(s.x)];
      if (top === undefined) { o.push(s); continue; }
      var bot = s.zc - s.h;
      o.push({ x: s.x, w: s.w + 0.03, h: (top - bot) * 0.5, zc: (top + bot) * 0.5, sq: 0.74 });
    }
    return o;
  }
  function spineTop(V, x) { var s = between(fusFor(V), x); return s.zc + s.h; }

  /* CB -- the LERX and the lifting body. w follows the plan outline of D:
     0.50 at x 4.31 where the LERX leaves the forebody, 0.93 at 3.16, 1.22
     at 2.00, 1.47 at 0.84, 1.66 at the wing junction (x -0.21), then the
     boom shoulders at 1.80 back to the stabilator root. sq above 1 pinches
     the section to the sharp LERX edge. */
  var CB = [
    { x:  4.60, w: 0.40, h: 0.20, zc: 0.46, sq: 1.10 },
    { x:  4.31, w: 0.50, h: 0.22, zc: 0.46, sq: 1.25 },
    { x:  3.70, w: 0.72, h: 0.25, zc: 0.46, sq: 1.35 },
    { x:  3.16, w: 0.93, h: 0.27, zc: 0.45, sq: 1.40 },
    { x:  2.00, w: 1.22, h: 0.30, zc: 0.44, sq: 1.40 },
    { x:  0.84, w: 1.47, h: 0.32, zc: 0.42, sq: 1.32 },
    { x: -0.21, w: 1.66, h: 0.34, zc: 0.39, sq: 1.20 },
    { x: -1.50, w: 1.77, h: 0.36, zc: 0.36, sq: 1.00 },
    { x: -3.30, w: 1.80, h: 0.36, zc: 0.33, sq: 0.90 },
    { x: -4.60, w: 1.80, h: 0.33, zc: 0.30, sq: 0.80 },
    { x: -5.40, w: 1.79, h: 0.29, zc: 0.27, sq: 0.74 },
    { x: -5.85, w: 1.76, h: 0.22, zc: 0.25, sq: 0.70 },
    { x: -6.05, w: 1.70, h: 0.06, zc: 0.25, sq: 0.80 },
  ];

  /* BOOM -- the tail booms outboard of the nozzles that carry the fins
     and the stabilator pivots, running on past the lifting body's aft
     edge to x -7.35 (D plan: outer edge 1.85, inner 1.40) */
  var BOOM = [
    { x: -3.40, yc: 1.62, w: 0.10, h: 0.10, zc: 0.52, sq: 0.80 },
    { x: -4.30, yc: 1.62, w: 0.20, h: 0.24, zc: 0.40, sq: 0.62 },
    { x: -6.00, yc: 1.63, w: 0.23, h: 0.27, zc: 0.36, sq: 0.60 },
    { x: -6.90, yc: 1.63, w: 0.21, h: 0.24, zc: 0.34, sq: 0.62 },
    { x: -7.30, yc: 1.63, w: 0.15, h: 0.16, zc: 0.30, sq: 0.75 },
    { x: -7.38, yc: 1.63, w: 0.04, h: 0.04, zc: 0.28, sq: 1.00 },
  ];

  /* NAC -- one engine nacelle, port side. The mouth ring is raked 1.30 m:
     upper lip x 1.97 z 0.13, lower lip x 0.67 z -0.75 (D side); 0.88 m
     wide (D head-on). The duct centre walks out from y 0.76 at the mouth to 0.87 at the nozzle (D
     head-on and plan); the bottom rises from -0.74 to -0.56. */
  var NAC = [
    { x:  1.97, yc: 0.76, zc: -0.31, w: 0.44, h: 0.44, sq: 0.42, rk: -1.30 },
    { x:  1.80, yc: 0.765, zc: -0.31, w: 0.455, h: 0.45, sq: 0.44, rk: -1.20 },
    { x:  1.20, yc: 0.77, zc: -0.30, w: 0.46, h: 0.45, sq: 0.48, rk: -0.60 },
    { x:  0.30, yc: 0.78, zc: -0.29, w: 0.46, h: 0.45, sq: 0.55 },
    { x: -1.00, yc: 0.80, zc: -0.26, w: 0.47, h: 0.45, sq: 0.65 },
    { x: -2.60, yc: 0.83, zc: -0.21, w: 0.50, h: 0.44, sq: 0.76 },
    { x: -4.00, yc: 0.85, zc: -0.18, w: 0.52, h: 0.43, sq: 0.86 },
    { x: -5.00, yc: 0.86, zc: -0.16, w: 0.52, h: 0.42, sq: 0.95 },
    { x: -5.90, yc: 0.87, zc: -0.16, w: 0.50, h: 0.40, sq: 1.00 },
  ];
  var NOZ_Y = 0.87, NOZ_Z = -0.16;

  /* wing planform from D: LE junction (-0.21, 1.66) to the tip (-3.80,
     5.68), 41 deg; tip chord 1.2 m; TE root (-4.38, 1.77) to tip (-5.00). */
  var WING = [
    [-0.05, 1.50], [-0.21, 1.66], [-3.68, 5.55], [-3.84, 5.63], [-4.96, 5.63],
    [-5.00, 5.55], [-4.38, 1.77], [-4.30, 1.50],
  ];
  var WING_Z = 0.30, WING_T = 0.13, ANHEDRAL = 2.0, SIN_ANH = Math.sin(ANHEDRAL * D2R);
  function wingTop(y) { return WING_Z + WING_T * 0.5 - Math.abs(y) * SIN_ANH; }
  function wingBot(y) { return WING_Z - WING_T * 0.5 - Math.abs(y) * SIN_ANH; }
  function leAt(y) { return -0.21 - (y - 1.66) * 0.90; }
  function teAt(y) { return -4.38 - (y - 1.77) * 0.16; }

  /* stabilator: LE root (-5.42, 1.82) to LE tip (-7.74, 3.80), rounded tip
     to -8.62, TE back to the root at -7.30 (D plan) */
  var STAB = [
    [-5.42, 1.70], [-5.42, 1.82], [-7.70, 3.78], [-7.95, 3.87], [-8.50, 3.87],
    [-8.62, 3.80], [-7.30, 1.82], [-7.30, 1.70],
  ];
  var STAB_Z = 0.16;

  /* fin, in (x, height above its root at z 0.62): fillet from x -3.27 to
     -4.49 (1.04 high in D, 0.42 above the root), 47 deg LE to the tip at
     z 3.01, tip chord 0.54, TE straight down at -7.16 (D side) */
  var FIN = [
    [-3.27, 0.00], [-4.49, 0.42], [-6.62, 2.39], [-7.16, 2.39], [-7.20, -0.05], [-3.27, -0.05],
  ];
  var FIN_ROOT_Z = 0.60, FIN_Y = 1.70, FIN_CANT = 6;

  var GROUND = -1.72;

  /* ============================================================ variants == */
  var VARIANTS = {
    "9.12":  { hump: false, ventral: true,  fit: "e80", pal: PAL.sov },
    "9.13S": { hump: true,  ventral: false, fit: "e90", pal: PAL.sov },
    "9.13R": { hump: true,  ventral: false, fit: "e90", pal: PAL.rus },
    "9.12G": { hump: false, ventral: false, fit: "e90", pal: PAL.sea },
    "9.12K": { hump: false, ventral: false, fit: "k",   pal: PAL.blu },
  };
  function variantOf(v) { return (typeof v === "string" ? VARIANTS[v] : v) || VARIANTS["9.13S"]; }

  /* ---------------------------------------------------------- store fits --
     Three pylons a wing. e90: an R-27 inboard and R-73s on the middle and
     outer rails (the "R-27R and R-73" generations.js gives the MiG-29S; the
     Gatow 29+03 photographs show the R-27 inboard). e80: the 1983 aircraft
     the same, the R-27 and R-73 having entered service with it. k: the KPAF
     row's R-27R inboard and one R-73 outboard (no loading photograph). */
  var R27 = { len: 4.08, rad: 0.115, fc: 0.55, fs: 0.40 };
  var R73 = { len: 2.90, rad: 0.085, fc: 0.40, fs: 0.30 };
  function fitRacks(kind) {
    var IN = { y: 2.45 }, MID = { y: 3.40 }, OUT = { y: 4.30 };
    var pick = { e90: [[IN, R27], [MID, R73], [OUT, R73]],
                 e80: [[IN, R27], [MID, R73], [OUT, R73]],
                 k:   [[IN, R27], [OUT, R73]] }[kind] || [];
    var o = [];
    for (var i = 0; i < pick.length; i++) {
      var y = pick[i][0].y, w = pick[i][1];
      o.push({ y: y, w: w, cx: (leAt(y) + teAt(y)) * 0.5 + 0.35 });
    }
    return o;
  }

  /* ============================================================== merge ==
     One mesh per material; the "gear" group is kept apart so the renderer
     can stow it, its parts merged inside it.                                */
  function mergeByMaterial(THREE, root) {
    var main = { order: [], by: {} }, gear = { order: [], by: {} };
    (function walk(node, pm, inGear) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        var m = pm.clone().multiply(c.matrix);
        var ing = inGear || c.name === "gear";
        if (c.isMesh) {
          var b = ing ? gear : main, key = c.material.uuid;
          if (!b.by[key]) { b.by[key] = { mat: c.material, parts: [] }; b.order.push(key); }
          var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
          geo.applyMatrix4(m);
          b.by[key].parts.push(geo);
        } else walk(c, m, ing);
      }
    })(root, new THREE.Matrix4(), false);
    function emit(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var a = e.parts[k].attributes;
          P.set(a.position.array, o * 3);
          N.set(a.normal.array, o * 3);
          if (a.uv) U.set(a.uv.array, o * 2);
          o += a.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var out = new THREE.Group();
    emit(main, out);
    var gr = new THREE.Group();
    gr.name = "gear";
    emit(gear, gr);
    out.add(gr);
    return out;
  }

  /* ================================================================ build == */
  function build(THREE, M, C, which) {
    var V = variantOf(which);
    var T = materials(THREE, C, V.pal);
    var g = new THREE.Group();
    addBody(THREE, M, g, T, V);
    addNacelles(THREE, M, g, T);
    addWings(THREE, M, g, T);
    addTail(THREE, M, g, T, V);
    addCockpit(THREE, M, g, T);
    addNoseKit(THREE, M, g, T);
    addSpineKit(THREE, M, g, T, V);
    addStores(THREE, M, g, T, V);
    addGear(THREE, M, g, T);
    addTeamFlash(THREE, M, g, T, V);
    return mergeByMaterial(THREE, g);
  }

  function add(g, geo, mat, x, y, z) {
    var m = new THREE_.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    g.add(m);
    return m;
  }
  var THREE_ = null;

  /* ------------------------------------------------- body, LERX, spine -- */
  function addBody(THREE, M, g, T, V) {
    THREE_ = THREE;
    g.add(new THREE.Mesh(loftR(THREE, fusFor(V), 36), T.body));
    g.add(new THREE.Mesh(loftR(THREE, CB, 40), T.skin));
    /* tail cone between the nozzles, holding the brake chute (D plan) */
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: -6.60, w: 0.30, h: 0.20, zc: 0.12, sq: 0.80 },
      { x: -7.30, w: 0.30, h: 0.22, zc: 0.12, sq: 0.70 },
      { x: -7.62, w: 0.26, h: 0.19, zc: 0.12, sq: 0.75 },
      { x: -7.70, w: 0.12, h: 0.09, zc: 0.12, sq: 0.90 },
    ], 18), T.skin));
    g.add(new THREE.Mesh(loftR(THREE, BOOM, 18), T.skin));
    g.add(new THREE.Mesh(loftR(THREE, mirrorSecs(BOOM), 18), T.skin));
  }

  /* --------------------------------------------- nacelles and intakes ----
     The mouth is raked, the duct is black behind it, and the ramp that
     closes the intake on the ground lies stowed against the duct roof, as
     it does in flight (A shows the mouths open on the ground with engines
     off). A splitter web stands between the duct roof and the LERX.       */
  function addNacelles(THREE, M, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var secs = s > 0 ? NAC : mirrorSecs(NAC);
      g.add(new THREE.Mesh(loftR(THREE, secs, 28), T.skin));
      var m0 = secs[0], yc = m0.yc;
      /* black liner just inside the lip, closed at its end */
      var liner = [];
      for (var k = 0; k < 3; k++) {
        var q = secs[k];
        liner.push({ x: q.x - 0.03, yc: q.yc, zc: q.zc, w: q.w * 0.90, h: q.h * 0.90, sq: q.sq, rk: q.rk });
      }
      liner.push({ x: 0.10, yc: s * 0.78, zc: -0.29, w: 0.30, h: 0.30, sq: 0.7 });
      liner.push({ x: 0.05, yc: s * 0.78, zc: -0.29, w: 0.01, h: 0.01, sq: 1 });
      g.add(new THREE.Mesh(loftR(THREE, liner, 24), T.ink));
      /* the closing door (ramp), stowed up against the duct roof */
      var door = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.74, 0.035), T.metal);
      door.rotation.y = -0.10;
      door.position.set(1.25, yc, 0.02);
      g.add(door);
      /* lip ring: a bright edge round the raked mouth */
      g.add(new THREE.Mesh(loftR(THREE, [
        { x: m0.x + 0.015, yc: yc, zc: m0.zc, w: m0.w + 0.012, h: m0.h + 0.012, sq: m0.sq, rk: m0.rk },
        { x: m0.x - 0.04, yc: yc, zc: m0.zc, w: m0.w + 0.024, h: m0.h + 0.024, sq: m0.sq, rk: m0.rk },
      ], 28), T.panel));
      /* boundary-layer splitter web between the duct roof and the LERX */
      add(g, new THREE.BoxGeometry(1.40, 0.04, 0.10), T.panel, 1.25, s * (yc - 0.10), 0.16);

      /* RD-33 nozzle: a long shroud tapering to the exit, petals faceted,
         a bright actuator ring where it leaves the nacelle, a dark hole */
      var ny = s * NOZ_Y;
      var act = add(g, new THREE.CylinderGeometry(0.505, 0.505, 0.12, 20, 1, true), T.metal, -5.92, ny, NOZ_Z);
      act.rotation.z = HALF_PI;
      var noz = add(g, new THREE.CylinderGeometry(0.43, 0.49, 1.20, 16, 1, true), T.hot, -6.56, ny, NOZ_Z);
      noz.rotation.z = HALF_PI;
      var lip = add(g, new THREE.CylinderGeometry(0.43, 0.435, 0.05, 16, 1, true), T.metal, -7.17, ny, NOZ_Z);
      lip.rotation.z = HALF_PI;
      var thr = add(g, new THREE.CylinderGeometry(0.42, 0.22, 0.80, 16, 1, true), T.ink, -6.80, ny, NOZ_Z);
      thr.rotation.z = HALF_PI;
      var plug = add(g, new THREE.CylinderGeometry(0.23, 0.23, 0.04, 14), T.ink, -6.40, ny, NOZ_Z);
      plug.rotation.z = HALF_PI;
      /* petal seams down the shroud */
      for (var p = 0; p < 8; p++) {
        var a = p / 8 * PI * 2;
        var sm = add(g, new THREE.BoxGeometry(1.18, 0.03, 0.02), T.ink,
          -6.56, ny + Math.cos(a) * 0.465, NOZ_Z + Math.sin(a) * 0.465);
        sm.rotation.x = a;
      }
    }
  }

  /* ----------------------------------------------------- wings, louvres -- */
  function addWings(THREE, M, g, T) {
    for (var i = 0; i < 2; i++) {
      var s = i ? -1 : 1;
      var w = new THREE.Mesh(M.slab(THREE, s > 0 ? WING : mirrorY(WING), WING_T), T.panel);
      w.position.z = WING_Z - WING_T * 0.5;
      w.rotation.x = s * ANHEDRAL * D2R * -1;
      g.add(w);
      /* hinge lines: flaps and ailerons a quarter chord in from the TE,
         the leading-edge flap 0.40 m behind the LE (D plan) */
      seam(g, T, teAt(1.9) + 0.95, s * 1.9, teAt(5.4) + 0.32, s * 5.4);
      seam(g, T, leAt(2.1) - 0.40, s * 2.1, leAt(5.45) - 0.30, s * 5.45);
      /* flap-track fairings under the trailing edge */
      add(g, new THREE.BoxGeometry(0.70, 0.13, 0.12), T.panel, teAt(2.9) + 0.1, s * 2.9, wingBot(2.9) - 0.05);
      add(g, new THREE.BoxGeometry(0.60, 0.12, 0.11), T.panel, teAt(4.1) + 0.1, s * 4.1, wingBot(4.1) - 0.05);

      /* overwing auxiliary louvres, five slots each side (D plan, E): a
         dark recessed frame on the LERX top, the slats across it */
      var ly = s * 0.80;
      var lz = between(CB, 1.12);
      var top = lz.zc + lz.h * Math.pow(Math.max(0, 1 - Math.pow(0.80 / lz.w, 2 / lz.sq)), lz.sq / 2);
      var fr = add(g, new THREE.BoxGeometry(1.05, 0.52, 0.04), T.ink, 1.12, ly, top - 0.005);
      fr.rotation.x = s * 0.20;
      for (var k = 0; k < 5; k++) {
        var sl = add(g, new THREE.BoxGeometry(0.07, 0.50, 0.10), T.panel, 1.52 - k * 0.20, ly, top + 0.025);
        sl.rotation.x = s * 0.20;
        sl.rotation.y = -0.45;
      }
    }
    /* GSh-30-1 port on the PORT LERX root, just aft of the cockpit (D plan) */
    add(g, new THREE.BoxGeometry(0.40, 0.14, 0.12), T.ink, 2.35, 0.62, 0.70);
    add(g, new THREE.BoxGeometry(0.85, 0.24, 0.04), T.panel, 2.10, 0.66, 0.72);
  }

  /* a dark seam on the upper wing between two plan points */
  function seam(g, T, x1, y1, x2, y2) {
    var L = Math.hypot(x2 - x1, y2 - y1), ym = (y1 + y2) * 0.5;
    var m = add(g, new THREE_.BoxGeometry(L, 0.025, 0.02), T.ink,
      (x1 + x2) * 0.5, ym, wingTop(ym) + WING_T * 0.4 + 0.004);
    m.rotation.order = "ZYX";
    m.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    m.rotation.x = -Math.sign(ym) * ANHEDRAL * D2R;
    return m;
  }

  /* ----------------------------------------------- fins and stabilators -- */
  function addTail(THREE, M, g, T, V) {
    for (var s = -1; s <= 1; s += 2) {
      /* fin: a pivot on its root line, canted 6 deg outboard */
      var pv = new THREE.Group();
      pv.position.set(0, s * FIN_Y, FIN_ROOT_Z);
      pv.rotation.x = -s * FIN_CANT * D2R;
      var fin = new THREE.Mesh(M.slab(THREE, FIN, 0.10, "xz"), T.fin);
      fin.position.y = 0.05;
      pv.add(fin);
      /* rudder actuator fairing low on the inner face, the tip antenna */
      var cap = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.13, 0.08), T.panel);
      cap.position.set(-6.85, 0, 2.38);
      pv.add(cap);
      var rf = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.12, 0.14), T.panel);
      rf.position.set(-6.95, 0, 0.18);
      pv.add(rf);
      /* team band across the upper fin, proud of both faces */
      var band = new THREE.Mesh(M.slab(THREE, [
        [-5.73, 1.55], [-6.12, 1.90], [-7.17, 1.90], [-7.18, 1.55],
      ], 0.16, "xz"), T.team);
      band.position.y = 0.08;
      pv.add(band);
      g.add(pv);

      /* all-moving stabilator, small anhedral, on the boom side */
      var st = new THREE.Mesh(M.slab(THREE, s > 0 ? STAB : mirrorY(STAB), 0.10), T.panel);
      st.position.z = STAB_Z - 0.05;
      st.rotation.x = -s * 3 * D2R;
      g.add(st);

      /* the ventral fins under the booms: early 9.12 only */
      if (V.ventral) {
        var vf = new THREE.Mesh(M.slab(THREE, [
          [-5.30, 0.00], [-6.10, -0.50], [-6.95, -0.50], [-6.90, 0.00],
        ], 0.06, "xz"), T.panel);
        vf.position.set(0, s * 1.42 + 0.03, 0.02);
        g.add(vf);
      }
    }
  }

  /* --------------------------------------------------- canopy, cockpit --
     The bubble sits on the sill at z 1.08 and peaks at 1.60 over the seat
     (D side); the windscreen arch at x 4.19. */
  function addCockpit(THREE, M, g, T) {
    add(g, new THREE.BoxGeometry(1.80, 0.70, 0.40), T.ink, 3.30, 0, 0.95);
    add(g, new THREE.BoxGeometry(0.42, 0.50, 0.75), T.ink, 2.75, 0, 1.15);
    add(g, new THREE.BoxGeometry(0.30, 0.32, 0.24), T.ink, 2.70, 0, 1.45);
    add(g, new THREE.BoxGeometry(0.40, 0.56, 0.18), T.ink, 3.85, 0, 1.12);
    add(g, new THREE.BoxGeometry(0.05, 0.30, 0.22), T.glass, 3.98, 0, 1.30);
    var can = [
      { x: 4.64, w: 0.10, h: 0.03, zc: 0.98, sq: 1.00 },
      { x: 4.40, w: 0.38, h: 0.15, zc: 1.07, sq: 1.00 },
      { x: 4.19, w: 0.45, h: 0.27, zc: 1.15, sq: 1.02 },
      { x: 3.70, w: 0.48, h: 0.30, zc: 1.26, sq: 1.06 },
      { x: 3.15, w: 0.49, h: 0.31, zc: 1.29, sq: 1.08 },
      { x: 2.60, w: 0.46, h: 0.28, zc: 1.30, sq: 1.06 },
      { x: 2.20, w: 0.38, h: 0.20, zc: 1.33, sq: 1.02 },
      { x: 1.98, w: 0.20, h: 0.08, zc: 1.38, sq: 1.00 },
    ];
    g.add(new THREE.Mesh(loftR(THREE, can, 24), T.glass));
    /* windscreen arch and the canopy's forward frame */
    var arch = function (x, k) {
      var c = between(can, x);
      g.add(new THREE.Mesh(loftR(THREE, [
        { x: x + 0.04, w: c.w * k, h: c.h * k, zc: c.zc, sq: c.sq },
        { x: x - 0.04, w: c.w * k, h: c.h * k, zc: c.zc, sq: c.sq },
      ], 24), T.metal));
    };
    arch(4.19, 1.03);
    arch(3.95, 1.03);
    for (var s = -1; s <= 1; s += 2)
      add(g, new THREE.BoxGeometry(2.40, 0.05, 0.06), T.panel, 3.20, s * 0.47, 1.06);
  }

  /* --------------------------------------------- probe, IRST, AoA vanes -- */
  function addNoseKit(THREE, M, g, T) {
    /* KOLS IRST ball ahead of the windscreen, offset to STARBOARD (D, A) */
    add(g, new THREE.SphereGeometry(0.14, 14, 9), T.glass, 4.92, -0.17, 0.99);
    var col = add(g, new THREE.CylinderGeometry(0.15, 0.17, 0.14, 12), T.metal, 4.92, -0.17, 0.90);
    col.rotation.x = HALF_PI;
    /* nose probe from the radome tip, 1.1 m (D) */
    var pt = add(g, new THREE.CylinderGeometry(0.022, 0.045, 0.92, 8), T.metal, 7.98, 0, 0.03);
    pt.rotation.z = HALF_PI;
    var tp = add(g, new THREE.CylinderGeometry(0.006, 0.022, 0.24, 8), T.metal, 8.55, 0, 0.03);
    tp.rotation.z = HALF_PI;
    for (var s = -1; s <= 1; s += 2) {
      add(g, new THREE.BoxGeometry(0.20, 0.04, 0.14), T.metal, 5.90, s * 0.46, 0.35);
      /* pitot-static booms either side of the cockpit floor */
      var ps = add(g, new THREE.CylinderGeometry(0.015, 0.02, 0.40, 6), T.metal, 5.30, s * 0.47, 0.10);
      ps.rotation.z = HALF_PI;
    }
  }

  /* the outline of a spine panel: four thin dark strips */
  function seamBox(g, T, x, z, lx, ly) {
    add(g, new THREE_.BoxGeometry(lx, 0.02, 0.02), T.ink, x, ly * 0.5, z + 0.01);
    add(g, new THREE_.BoxGeometry(lx, 0.02, 0.02), T.ink, x, -ly * 0.5, z + 0.01);
    add(g, new THREE_.BoxGeometry(0.02, ly, 0.02), T.ink, x + lx * 0.5, 0, z + 0.01);
    add(g, new THREE_.BoxGeometry(0.02, ly, 0.02), T.ink, x - lx * 0.5, 0, z + 0.01);
  }

  /* ------------------------------------------- airbrakes, aerials, kit -- */
  function addSpineKit(THREE, M, g, T, V) {
    /* upper airbrake on the tail cone between the fins, its outline only */
    var z1 = spineTop(V, -6.0);
    add(g, new THREE.BoxGeometry(1.00, 0.50, 0.03), T.panel, -6.10, 0, z1 + 0.01);
    seamBox(g, T, -6.10, z1 + 0.012, 1.00, 0.50);
    /* dorsal blade aerial behind the canopy and one under the nose */
    var ab = new THREE.Mesh(M.slab(THREE, [
      [0.00, 0.00], [-0.20, 0.32], [-0.36, 0.32], [-0.30, 0.00],
    ], 0.04, "xz"), T.panel);
    ab.position.set(1.15, 0.02, spineTop(V, 1.2) - 0.04);
    g.add(ab);
    var b2 = new THREE.Mesh(M.slab(THREE, [
      [0.00, 0.00], [-0.18, -0.24], [-0.34, -0.24], [-0.30, 0.00],
    ], 0.04, "xz"), T.panel);
    b2.position.set(5.2, 0.02, -0.18);
    g.add(b2);
    /* formation-light strips on the spine shoulders */
    for (var s = -1; s <= 1; s += 2) {
      var x = -1.2, top = spineTop(V, x);
      add(g, new THREE.BoxGeometry(1.6, 0.04, 0.05), T.metal, x, s * 0.40, top - 0.12);
    }
  }

  /* ------------------------------------------------------ pylons, stores */
  function missile(THREE, M, T, w) {
    var grp = new THREE.Group(), len = w.len, rad = w.rad;
    grp.add(new THREE.Mesh(M.loft(THREE, [
      { x: -len * 0.50, w: rad * 0.85, h: rad * 0.85, zc: 0, sq: 1 },
      { x: -len * 0.43, w: rad, h: rad, zc: 0, sq: 1 },
      { x:  len * 0.24, w: rad, h: rad, zc: 0, sq: 1 },
      { x:  len * 0.37, w: rad * 0.88, h: rad * 0.88, zc: 0, sq: 1 },
      { x:  len * 0.46, w: rad * 0.55, h: rad * 0.55, zc: 0, sq: 1 },
      { x:  len * 0.50, w: rad * 0.08, h: rad * 0.08, zc: 0, sq: 1 },
    ], 12), T.metal));
    for (var k = 0; k < 4; k++) {
      var f = new THREE.Mesh(new THREE.BoxGeometry(w.fc, w.fs, 0.02), T.metal);
      f.position.set(-len * 0.40, rad + w.fs * 0.5, 0);
      var pv = new THREE.Group(); pv.add(f); pv.rotation.x = k * HALF_PI + PI / 4; grp.add(pv);
      var c = new THREE.Mesh(new THREE.BoxGeometry(w.fc * 0.5, w.fs * 0.6, 0.02), T.metal);
      c.position.set(len * 0.25, rad + w.fs * 0.3, 0);
      var pc = new THREE.Group(); pc.add(c); pc.rotation.x = k * HALF_PI + PI / 4; grp.add(pc);
    }
    return grp;
  }
  function addStores(THREE, M, g, T, V) {
    var racks = fitRacks(V.fit);
    for (var i = 0; i < racks.length; i++) {
      var r = racks[i];
      for (var s = -1; s <= 1; s += 2) {
        var wz = wingBot(r.y);
        add(g, new THREE.BoxGeometry(1.10, 0.09, 0.26), T.panel, r.cx, s * r.y, wz - 0.11);
        var ms = missile(THREE, M, T, r.w);
        ms.position.set(r.cx + 0.25, s * r.y, wz - 0.24 - r.w.rad);
        g.add(ms);
      }
    }
  }

  /* ---------------------------------------------------------------- gear --
     It retracts, so the group is "gear". Track 3.09 m, wheelbase 3.645 m
     (published); main legs at x -2.2 (D side), so the twin nose wheels sit
     at x 1.45 between the intakes, with the mudguard the type carries for
     rough strips (A). A CylinderGeometry runs along +Y: legs are turned
     PI/2 about X; wheels are left alone, their axle already lateral.      */
  function addGear(THREE, M, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 1.45, nr = 0.285, nz = GROUND + nr;
    var nl = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 1.30, 8), T.metal);
    nl.rotation.x = HALF_PI; nl.position.set(NX + 0.03, 0, -0.75); gr.add(nl);
    for (var w = -1; w <= 1; w += 2) {
      var nw = new THREE.Mesh(new THREE.CylinderGeometry(nr, nr, 0.15, 16), T.ink);
      nw.position.set(NX, w * 0.13, nz); gr.add(nw);
      var nh = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.16, 10), T.metal);
      nh.position.set(NX, w * 0.13, nz); gr.add(nh);
    }
    var mud = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.46, 0.05), T.metal);
    mud.rotation.y = 0.12; mud.position.set(NX + 0.02, 0, nz + 0.33); gr.add(mud);
    for (var d = -1; d <= 1; d += 2) {
      var nd = new THREE.Mesh(new THREE.BoxGeometry(1.00, 0.04, 0.45), T.panel);
      nd.position.set(NX + 0.25, d * 0.27, -0.28); gr.add(nd);
    }
    var mr = 0.42, mz = GROUND + mr;
    for (var s = -1; s <= 1; s += 2) {
      var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, 1.30, 8), T.metal);
      leg.rotation.x = HALF_PI + s * 0.08;
      leg.position.set(-2.15, s * 1.47, -0.68); gr.add(leg);
      var br = new THREE.Mesh(new THREE.BoxGeometry(1.00, 0.06, 0.08), T.metal);
      br.rotation.y = -0.80; br.position.set(-1.80, s * 1.45, -0.55); gr.add(br);
      var mw = new THREE.Mesh(new THREE.CylinderGeometry(mr, mr, 0.20, 18), T.ink);
      mw.position.set(-2.20, s * 1.545, mz); gr.add(mw);
      var hb = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.21, 12), T.metal);
      hb.position.set(-2.20, s * 1.545, mz); gr.add(hb);
      var md = new THREE.Mesh(new THREE.BoxGeometry(1.30, 0.04, 0.55), T.panel);
      md.rotation.x = s * 0.25; md.position.set(-1.55, s * 1.66, -0.30); gr.add(md);
    }
  }

  /* ------------------------------------------------------- team flash ----
     Modest, and exactly C.team: the fin bands (addTail), a chordwise band
     on each upper wing, and a short stripe on the spine for the top view. */
  function addTeamFlash(THREE, M, g, T, V) {
    for (var s = -1; s <= 1; s += 2) {
      var y = 3.9, cx = (leAt(y) + teAt(y)) * 0.5;
      var b = add(g, new THREE.BoxGeometry(1.0, 0.55, 0.03), T.team, cx, s * y,
        wingTop(y) + WING_T * 0.4 + 0.015);
      b.rotation.x = -s * ANHEDRAL * D2R;
      b.rotation.z = -s * 0.10;
    }
    add(g, new THREE.BoxGeometry(0.42, 0.40, 0.05), T.team, -4.3, 0, spineTop(V, -4.3) + 0.005);
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent, probe tip to stabilator tip (17.36 m) */
UNIT_MODELS["pact_e90_fighter"] = {
  len: 17.36,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.13S"); },
};
UNIT_MODELS["fighter_p"] = {
  len: 17.36,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.13R"); },
};
UNIT_MODELS["pact_e80_fighter"] = {
  len: 17.36,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.12"); },
};
UNIT_MODELS["deu_e90_mig29"] = {
  len: 17.36,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.12G"); },
};
UNIT_MODELS["kpa_e00_fighter"] = {
  len: 17.36,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.12K"); },
};
