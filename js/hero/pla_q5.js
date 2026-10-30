/* ============================================================================
   pla_q5.js  --  HERO model: Nanchang Q-5 "Fantan" attack aircraft
                  (pla_e60_cas "Nanchang Q-5 Fantan", pla_e80_cas "Nanchang
                  Q-5C Fantan"). One builder, VARIANTS below.
   ----------------------------------------------------------------------------
   Full-quality redo, 2026-10-30. The Q-5 is a MiG-19 (J-6) development: the
   fuselage lengthened and area-ruled round a 4 m internal bomb bay, the nose
   intake replaced by a solid pointed nose and two side intakes, a new wing
   of greater area and less sweep; the same twin WP-6 (RD-9) engines.

   References (Wikimedia Commons, fetched at 960-1600 px, cached in the
   scratchpad q_q5_ref folder):
     P  "911 Nanchang A-5 Taxiing (8130250163).jpg" - an A-5C (the export
        Q-5, Bangladesh) taxiing, broadside from port with a long lens. The
        SIDE tables are read off it on a pixel grid: 100 px/m, nose-probe
        tip px 25 to tailplane tip px 1590 = the published 15.65 m;
        X = (832 - px) / 100, Z = (510 - py) / 100. That scale gives the
        nose tyre 0.51 m and the main tyre 0.68 m across. It shows the
        long pointed solid nose and its probe, the D-shaped side intakes
        standing off the fuselage, the low bubble canopy and the mast
        behind it, the spine falling to the fin, the tall fin with its
        long dorsal fillet and swept rudder, the low-set tailplane reaching
        past the jet pipes, the twin pipes low in the tail with the fairing
        above them, the ventral keel, the tandem pylons under the forward
        fuselage, the wing pylons, the long-legged main gear with its big
        leg door, and the fin-tip fairing of a late (RWR) airframe.
     D  "Nanchang Q-5I silhouette.png" (234 x 389 px plan view). The WING
        and TAILPLANE planforms and the fuselage widths are read off it:
        span 202 px = the published 9.68 m (20.9 px/m across). Its length
        agrees with 15.65 m including the probe; its forward fuselage is
        drawn about 0.5 m too short against P (intake lip, wing root), so
        the plan stations are re-mapped onto P's axis: X = 1.0457 Xd +
        0.418 (Xd = 8.07 - (py - 16) / 20.9), which puts D's intake lip
        and tailplane tip where P has them.
     M  "Q-5 in Military Museum of the Chinese People's Revolution
        20170919.jpg" - a PLA Q-5 head-on: the tall D-shaped intakes with
        their flat inner splitter plates, the anhedral wing, the main legs
        in the wings and their doors, the fin.
     B  "Nanchang A-5 left1 2016 Military Museum Beijing.jpg" and "Nanchang
        A-5 left2 ..." - PLA Q-5 33027 from port: the plain silver-grey
        finish, the nose probe, ONE big curved wing fence a side running
        the whole chord, the main-leg door, the long fuselage.
     E  "Q-5-0064(w).jpg" - an early Q-5 (Datangshan): bare natural metal
        with rivet rows, the intake lip, the cockpit, the forward-fuselage
        pylons.
     W  "Q5 parked.png" - a PLA Q-5 (10167): the cannon muzzle in each wing
        root leading edge, the tandem fuselage pylons, the canopy hinged at
        the back, the pylons under the wing.
     en.wikipedia "Nanchang Q-5" (Wilson 2000): length 15.65 m, span
        9.68 m, height 4.33 m, wing area 27.95 m2; a 4 m internal weapons
        bay; intakes moved to the fuselage sides; two Type 23 cannon in the
        wing roots; Q-5I (A) replaced the bay with a fuel tank and added
        pylons; Q-5II (C) is a Q-5I with omnidirectional radar warning
        receivers. air_specs.js: len 15.7, span 9.7, anhedral 3-4 deg.

   Recognition list (each shows in the model; source in brackets):
     1. Long, solid, pointed nose with a pitot probe; no nose intake
        (P, B, E).
     2. Two D-shaped side intakes standing off the fuselage on flat
        splitter plates beside the cockpit, their trunks fairing back into
        the fuselage over the wing root (P, M, E).
     3. MiG-19-style wing swept 56 deg at the leading edge, 4 deg anhedral,
        mid-set; the trailing edge stepped aft outboard of the flap (D);
        ONE big full-chord fence a side (B).
     4. Long, area-ruled fuselage, deep at the rear over the twin engines;
        the 4 m bomb bay outlined on the belly (P, published).
     5. Low bubble canopy behind a framed windscreen, a mast behind it (P).
     6. Tall fin, leading edge about 67 deg, a long dorsal fillet, the
        rudder trailing edge swept; low-set swept tailplane reaching past
        the jet pipes (P, D).
     7. Twin jet pipes side by side low in the tail, the fin-root fairing
        above and between them; a shallow ventral keel (P).
     8. Tandem pylons under the forward fuselage, two pylons under each
        wing; cannon muzzles in the wing roots (P, W, E).
     9. Long-legged main gear in the wings with big leg doors; nose leg
        under the cockpit (P, M, B).
    10. Q-5C (pla_e80_cas) only: the fin-tip fairing with its small
        antennas, as P (an A-5C) shows it.

   NOT CONFIRMED (estimated, or taken from a related airframe):
     - Height. P, D and the tyre sizes agree on the scale, and on that scale
       the fin top stands 3.55 m off the ground; the published 4.33 m could
       not be reconciled with any reference (P is broadside and long-lens; a
       foreshortened length would make the model TALLER per metre, not
       shorter). The model keeps the photographed proportions: 3.55 m.
       Cross-check independent of P's scale: fin top above ground over
       nose tip to jet-pipe exit (probe excluded). P: 350 px / 1305 px =
       0.268. Q "906 Nanchang A-5 Taxiing (8130235332).jpg" (another A-5C,
       broadside but yawed about 20 deg, which can only RAISE the ratio):
       fin top py 392, centreline ground py 740 (nose tyre; mean of the
       two main tyres 739), nose tip px 136, pipe exit px 1378: 348 / 1242
       = 0.280, +4.5% on P. The model: 3.55 / 13.05 = 0.272. The published
       4.33 m would need 0.332. No second published height could be read
       (other-language wikis and aerospaceweb refused from this machine);
       the 4.51 m (A-5C) and 16.255 / 15.415 m figures quoted elsewhere
       are unverified here and agree with no photograph either.
     - Whether the published 15.65 m includes the probe: D and the tyres
       say it does; taken so.
     - The fence's spanwise station (Y 2.05) and height (0.30 m): B and M
       are oblique. The main-gear track (3.2 m) is estimated from M.
     - The Q-5C's fin-tip fairing is P's A-5C (an export Q-5 of the same
       generation); no photograph of a PLA Q-5C fin tip was fetched. The
       early Q-5 is drawn without it.
     - Bomb-bay door outline (position along the belly; 4 m long as
       published). On the Q-5I/C the bay holds a fuel tank; the outline is
       drawn on both.
     - Pylon shapes, the cannon position across the root, the intake
       duct's depth, the tyre widths, door outlines: approximate.
     Not drawn: stores and drop tanks (the rows list none), national
     markings and numbers (forbidden), camouflage (P's is Bangladeshi).

   Paint: the PLA finish of B is aluminium-painted silver-grey, E bare
   metal; sampled off B's sunlit flanks (~178,180,176) and taken to about
   0.9 of level: field #a2a5a3. The ACES pass lifts it back.

   Materials: body, wing, fin (canvas-textured skin), team, metal, hot,
   ink, glass; the gear group adds its own (ink, metal, body).
   Nodes: "gear" (landing gear; the engine hides it in flight).
   Model space: +X nose, +Y port, +Z up, metres; the fuselage datum (nose
   tip height) at z = 0, the wheels on z = -1.76.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroQ5 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;

  var PAL = { lt: "#a2a5a3", dk: "#8b8f8e", pale: "#b4b6b3", soot: "rgba(38,34,30," };
  var SKIN_R = 0.78, SKIN_M = 0.12;

  /* e60: the original Q-5; e80: the Q-5C (Q-5II), with the fin-tip
     RWR fairing (P). Everything else is the same airframe. */
  var VARIANTS = {
    q5: { rwr: false },
    q5c: { rwr: true },
  };

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
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
  /* painted aluminium: sheets of slightly different tone, panel seams,
     rivet rows (E shows them dense on the nose). Kept light. */
  function metalBase(g, W, H, R, n) {
    var i;
    g.fillStyle = PAL.lt; g.fillRect(0, 0, W, H);
    for (i = 0; i < n; i++) {
      g.globalAlpha = 0.08 + R() * 0.12;
      g.fillStyle = (i % 3 === 0) ? PAL.pale : PAL.dk;
      g.fillRect(R() * W, R() * H, 30 + R() * 110, 16 + R() * 50);
    }
    g.globalAlpha = 1;
  }
  function seams(g, W, H, R, n) {
    var i, x = 0;
    g.strokeStyle = "rgba(24,26,26,0.28)"; g.lineWidth = 1.3;
    while (x < W) { x += 30 + R() * 56; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(24,26,26,0.15)"; g.lineWidth = 1;
    for (i = 0; i < n; i++) {
      var px = R() * W, py = R() * H, L = 30 + R() * 110;
      g.beginPath();
      if (R() < 0.6) { g.moveTo(px, py); g.lineTo(px + L, py); } else { g.moveTo(px, py); g.lineTo(px, py + L * 0.5); }
      g.stroke();
    }
    g.strokeStyle = "rgba(24,26,26,0.28)";
    for (i = 0; i < 18; i++) g.strokeRect(R() * W, R() * H, 10 + R() * 28, 8 + R() * 16);
    g.fillStyle = "rgba(0,0,0,0.16)";
    for (i = 0; i < 40; i++) {
      var ry = R() * H, rx = R() * W * 0.85, m = 14 + ((R() * 30) | 0);
      for (var k = 0; k < m; k++) g.fillRect(rx + k * 6.5, ry, 1.5, 1.5);
    }
  }

  /* ============================================================ textures ==
     Fuselage: the loft runs nose first from the nose tip (x 7.00) to the
     tail (x -6.00): u = (7.00 - x) / 13.0; v = 0 port, 0.25 top, 0.5
     starboard, 0.75 belly. After flipY: port at canvas row H (and 0), top
     0.75H, starboard 0.5H, belly 0.25H. */
  var BODY_X0 = 7.00, BODY_L = 13.0;
  function bu(x) { return (BODY_X0 - x) / BODY_L; }
  var _bd = null;
  function bodySheet(THREE) {
    if (_bd !== null) return _bd;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(5051);
      metalBase(g, W, H, R, 20);
      seams(g, W, H, R, 70);
      /* production breaks: nose cone, cockpit section, intake station, the
         wing-root frames and the rear-fuselage joint */
      g.strokeStyle = "rgba(20,22,22,0.50)"; g.lineWidth = 2.2;
      [bu(6.10), bu(4.40), bu(3.70), bu(2.30), bu(-1.95), bu(-3.10)].forEach(function (u) {
        g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke();
      });
      /* the internal bomb bay: two long doors on the belly, 4 m (published)
         between the intake trunks and the engines; v 0.25 is the belly */
      g.strokeStyle = "rgba(14,16,16,0.70)"; g.lineWidth = 2.6;
      var b0 = bu(1.90) * W, b1 = bu(-2.10) * W;
      g.strokeRect(b0, H * 0.215, b1 - b0, H * 0.07);
      g.beginPath(); g.moveTo(b0, H * 0.25); g.lineTo(b1, H * 0.25); g.stroke();
      /* gun-gas soot is on the wing roots (wing sheet); here: the cockpit
         side panels, the avionics bay behind the canopy, the engine-bay
         access panels low on the rear fuselage */
      g.strokeStyle = "rgba(20,22,22,0.42)"; g.lineWidth = 1.8;
      g.strokeRect(bu(4.6) * W, H * 0.66, (bu(3.9) - bu(4.6)) * W, H * 0.07);
      g.strokeRect(bu(4.6) * W, H * 0.77, (bu(3.9) - bu(4.6)) * W, H * 0.07);
      g.strokeRect(bu(2.2) * W, H * 0.66, (bu(1.3) - bu(2.2)) * W, H * 0.18);
      g.strokeRect(bu(-2.4) * W, H * 0.06, (bu(-3.5) - bu(-2.4)) * W, H * 0.10);
      g.strokeRect(bu(-2.4) * W, H * 0.34, (bu(-3.5) - bu(-2.4)) * W, H * 0.10);
      /* oil streaks under the rear belly, heat staining over the last 1.5 m */
      for (var i = 0; i < 40; i++) {
        g.fillStyle = PAL.soot + (0.04 + R() * 0.07).toFixed(3) + ")";
        g.fillRect(bu(-1.0) * W + R() * W * 0.35, H * (0.12 + R() * 0.26), 30 + R() * 80, 2 + R() * 3);
      }
      var s = g.createLinearGradient(bu(-4.6) * W, 0, W, 0);
      s.addColorStop(0, PAL.soot + "0)"); s.addColorStop(1, PAL.soot + "0.45)");
      g.fillStyle = s; g.fillRect(bu(-4.6) * W, 0, W - bu(-4.6) * W, H);
      /* a clean spot for small parts (pinUV) */
      g.fillStyle = PAL.lt; g.fillRect(W * 0.975, H * 0.94, W * 0.025, H * 0.06);
      _bd = texOf(THREE, cv);
    } catch (e) { _bd = null; }
    return _bd;
  }

  /* wings: planform UVs, u along x over [WX0, WX1], v across |y| */
  var WX0 = -5.10, WX1 = 2.60, WS1 = 4.90;
  var _wg = null;
  function wingSheet(THREE) {
    if (_wg !== null) return _wg;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(5577);
      function U(x) { return (x - WX0) / (WX1 - WX0) * W; }
      function V(y) { return (1 - y / WS1) * H; }
      metalBase(g, W, H, R, 12);
      seams(g, W, H, R, 40);
      /* flap inboard (y 0.85 to 2.35), aileron outboard (2.50 to 4.55):
         hinge lines about a quarter chord ahead of the trailing edge */
      g.strokeStyle = "rgba(16,18,18,0.58)"; g.lineWidth = 2.6;
      g.beginPath(); g.moveTo(U(-1.05), V(0.85)); g.lineTo(U(-2.25), V(2.35)); g.lineTo(U(-2.95), V(2.35)); g.stroke();
      g.beginPath(); g.moveTo(U(-1.05), V(0.85)); g.lineTo(U(-1.80), V(0.85)); g.stroke();
      g.beginPath(); g.moveTo(U(-3.00), V(2.50)); g.lineTo(U(-4.35), V(4.55)); g.lineTo(U(-4.85), V(4.55)); g.stroke();
      g.beginPath(); g.moveTo(U(-3.00), V(2.50)); g.lineTo(U(-3.52), V(2.50)); g.stroke();
      /* spar line and the main-wheel bay door under the root */
      g.strokeStyle = "rgba(16,18,18,0.30)"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(U(1.0), V(0.9)); g.lineTo(U(-3.4), V(4.6)); g.stroke();
      g.strokeRect(U(-0.20), V(1.95), U(0.70) - U(-0.20), V(0.90) - V(1.95));
      /* cannon gas soot behind the root muzzles */
      var gs = g.createLinearGradient(U(2.2), 0, U(0.6), 0);
      gs.addColorStop(0, PAL.soot + "0.38)"); gs.addColorStop(1, PAL.soot + "0)");
      g.fillStyle = gs; g.fillRect(U(0.6), V(1.25), U(2.2) - U(0.6), V(0.85) - V(1.25));
      _wg = texOf(THREE, cv);
    } catch (e) { _wg = null; }
    return _wg;
  }

  /* fin and tailplane share one sheet: the fin in the upper half (v 0.5-1,
     u along x over [FX0, FX1], v up z), the tailplane in the lower (v 0 to
     0.45, across |y|). */
  var FX0 = -7.40, FX1 = -2.30, FZ0 = 0.30, FZ1 = 1.85, TS1 = 2.60;
  var _fn = null;
  function finSheet(THREE) {
    if (_fn !== null) return _fn;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(4455);
      function U(x) { return (x - FX0) / (FX1 - FX0) * W; }
      function V(z) { return 0.5 * (1 - (z - FZ0) / (FZ1 - FZ0)) * H; }
      function VT(y) { return (1 - y / TS1) * H; }
      metalBase(g, W, H, R, 10);
      seams(g, W, H, R, 24);
      /* rudder: hinge from (-5.15, 0.32) to (-6.65, 1.60), its top edge
         across to the trailing edge (P) */
      g.strokeStyle = "rgba(16,18,18,0.62)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-5.15), V(0.34)); g.lineTo(U(-6.65), V(1.60)); g.lineTo(U(-7.20), V(1.60)); g.stroke();
      g.strokeRect(U(-6.10), V(0.95), U(-5.75) - U(-6.10), V(0.62) - V(0.95));
      /* tailplane: elevator hinge about 0.3 of the chord */
      g.beginPath(); g.moveTo(U(-5.60), VT(0.75)); g.lineTo(U(-6.80), VT(2.20)); g.stroke();
      /* heat staining low on the fin where it overhangs the pipes */
      var hs = g.createLinearGradient(0, V(0.30), 0, V(0.80));
      hs.addColorStop(0, PAL.soot + "0.28)"); hs.addColorStop(1, PAL.soot + "0)");
      g.fillStyle = hs; g.fillRect(U(-6.30), V(0.80), U(-5.00) - U(-6.30), V(0.30) - V(0.80));
      _fn = texOf(THREE, cv);
    } catch (e) { _fn = null; }
    return _fn;
  }

  /* ============================================================ materials */
  function materials(THREE, C) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    return {
      body: sk(bodySheet(THREE), PAL.lt),
      wing: sk(wingSheet(THREE), PAL.lt),
      fin: sk(finSheet(THREE), PAL.lt),
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0xd03f3f),
        roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x5c6266, roughness: 0.50, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({
        color: 0x3a3632, roughness: 0.58, metalness: 0.50, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({
        color: 0x070809, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x2a3b42, roughness: 0.12, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.80, side: THREE.DoubleSide }),
    };
  }

  /* ================================================================ loft ==
     Sections {x, w, zt, zb, zw, e, yc}: half width w at height zw, the top
     at zt and the bottom at zb, each half a superellipse of exponent e.
     Nose first; u along the loft, v round the section from port. */
  function loft(THREE, secs, segs, bodyUV) {
    var pos = [], uv = [], idx = [];
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i], e = s.e || 1, zw = s.zw === undefined ? (s.zt + s.zb) / 2 : s.zw;
      for (var j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t);
        var y = (s.yc || 0) + s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        var dz = (sz >= 0 ? (s.zt - zw) : (zw - s.zb)) * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        pos.push(s.x, y, zw + dz);
        uv.push(bodyUV ? bu(s.x) : (x1 === x0 ? 0 : (s.x - x0) / (x1 - x0)), j / segs);
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
  /* small parts in the body paint take one clean spot of the sheet */
  function pinUV(geo) {
    var u = geo.attributes.uv;
    if (u) for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
    return geo;
  }
  function S(x, zt, zb, w, zw, e) { return { x: x, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }
  function O(x, r, zc, yc) { return { x: x, w: r, zt: zc + r, zb: zc - r, zw: zc, e: 1, yc: yc || 0 }; }
  function Y(x, yc, w, zt, zb, zw, e) { return { x: x, yc: yc, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }

  /* ===================================================== lifting surfaces ==
     An aerofoil lofted spanwise through stations {s, le, te, t, h}; thin
     rounded-nose section, thickest at 43% chord; planform UVs fitted to
     the box. vert: span along +Z. mirror: Y -> -Y. Tip capped. */
  function foil(xc) { return Math.pow(xc, 0.75) * (1 - xc) / 0.3027; }
  function surf(THREE, sts, opt) {
    var K = 10, pos = [], uv = [], idx = [], ring = 2 * K;
    var box = opt.box;
    for (var i = 0; i < sts.length; i++) {
      var st = sts[i];
      for (var k = 0; k < ring; k++) {
        var up = k <= K, kk = up ? k : 2 * K - k;
        var xc = (1 - Math.cos(PI * kk / K)) * 0.5;
        var ht = (Math.max(0.003, st.t * 0.5 * foil(xc)) + (st.pad || 0)) * (up ? 1 : -1);
        if (k === 0 || k === K) ht = 0;
        var X = st.le - xc * (st.le - st.te);
        var Sp = st.s, Z = st.h + ht;
        uv.push((X - box.x0) / (box.x1 - box.x0), (Math.abs(Sp) - box.s0) / (box.s1 - box.s0));
        if (opt.vert) pos.push(X, -Z, Sp); else pos.push(X, Sp, Z);
      }
    }
    var flip = (sts[sts.length - 1].s < sts[0].s) !== !!opt.mirror;
    function tri(a, b, c) { if (flip) idx.push(a, c, b); else idx.push(a, b, c); }
    for (i = 0; i < sts.length - 1; i++)
      for (k = 0; k < ring; k++) {
        var a = i * ring + k, b = i * ring + (k + 1) % ring;
        var c = a + ring, d = b + ring;
        tri(a, c, b); tri(b, c, d);
      }
    var last = sts.length - 1, base = last * ring, cx = 0, cy = 0, cz = 0;
    for (k = 0; k < ring; k++) { cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2]; }
    var ci = pos.length / 3;
    pos.push(cx / ring, cy / ring, cz / ring);
    uv.push(uv[base * 2], uv[base * 2 + 1]);
    for (k = 0; k < ring; k++) tri(ci, base + (k + 1) % ring, base + k);
    if (opt.mirror) for (i = 1; i < pos.length; i += 3) pos[i] = -pos[i];
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* ========================================================= station tables
     BODY -- side (zt, zb) off P; half widths off D (re-mapped), the nose
     widths spread over P's nose length. The belly deepens aft over the
     two engines; the rear section is squarer (e < 1). The canopy and the
     intake trunks are separate lofts. */
  var BODY = [
    S( 7.00,  0.012, -0.030, 0.018, -0.010),
    S( 6.90,  0.035, -0.055, 0.050, -0.010),
    S( 6.50,  0.130, -0.120, 0.150,  0.000),
    S( 6.00,  0.240, -0.220, 0.255,  0.000),
    S( 5.50,  0.330, -0.300, 0.330,  0.010),
    S( 5.00,  0.400, -0.380, 0.375,  0.000),
    S( 4.50,  0.470, -0.440, 0.405,  0.000),
    S( 4.20,  0.520, -0.470, 0.420,  0.000),
    S( 3.80,  0.550, -0.500, 0.430,  0.000),
    S( 3.40,  0.580, -0.530, 0.460,  0.000),
    S( 3.00,  0.620, -0.580, 0.500, -0.020),
    S( 2.60,  0.735, -0.680, 0.560, -0.040),
    S( 2.00,  0.760, -0.780, 0.620, -0.070),
    S( 1.00,  0.700, -0.850, 0.700, -0.100, 0.95),
    S( 0.00,  0.630, -0.900, 0.740, -0.150, 0.92),
    S(-1.00,  0.550, -0.950, 0.750, -0.200, 0.90),
    S(-2.00,  0.520, -1.030, 0.760, -0.250, 0.88),
    S(-3.00,  0.520, -1.050, 0.740, -0.270, 0.86),
    S(-4.00,  0.470, -1.030, 0.730, -0.300, 0.86),
    S(-5.00,  0.380, -1.000, 0.720, -0.330, 0.86),
    S(-5.50,  0.320, -0.970, 0.710, -0.350, 0.86),
    S(-5.95,  0.250, -0.920, 0.680, -0.380, 0.86),
  ];
  /* the jet pipes, side by side low in the tail (P: exit at x -6.05,
     centres 0.66 m below the datum) */
  var PIPE_X = -6.05, PIPE_Y = 0.33, PIPE_Z = -0.64, PIPE_R = 0.27;

  /* CANOPY -- windscreen base x 4.22 (z 0.52), its top frame at x 3.75
     (z 0.80), the hood's crown 0.845 from 3.5 to 3.1, falling into the
     spine fairing at x 2.55 (P side); 0.68 m across (D). */
  var CANOPY = [
    S( 4.22, 0.530, 0.440, 0.120, 0.45, 0.92),
    S( 4.00, 0.665, 0.440, 0.270, 0.46, 0.90),
    S( 3.75, 0.800, 0.450, 0.330, 0.48, 0.88),
    S( 3.50, 0.840, 0.470, 0.340, 0.50, 0.88),
    S( 3.10, 0.845, 0.480, 0.340, 0.51, 0.88),
    S( 2.85, 0.830, 0.500, 0.320, 0.53, 0.88),
    S( 2.68, 0.805, 0.520, 0.280, 0.56, 0.90),
    S( 2.55, 0.775, 0.560, 0.180, 0.60, 0.92),
  ];

  /* WING -- plan off D re-mapped: leading edge 56 deg, x = 1.60 - 1.558
     (y - 1.24); trailing edge 1.85 at the root swept back to the flap end
     at y 2.30, stepped aft to -3.50 at y 2.45, then 41 deg to the tip;
     rounded tip at y 4.84 (span 9.68). Chord plane at z -0.15 at the root
     (mid-wing, P), 4 deg anhedral (air_specs; M shows the droop); t/c 8%
     (the MiG-19's, not confirmed for the Q-5). */
  var WZ = -0.15, TAN_ANH = Math.tan(4 * D2R), SEMI = 4.84;
  var WING = [
    [0.70, 2.44, -1.78], [1.24, 1.60, -1.85], [1.53, 1.15, -2.10], [1.96, 0.48, -2.50],
    [2.30, -0.05, -2.95], [2.45, -0.29, -3.50], [3.11, -1.32, -3.56], [3.54, -1.99, -3.95],
    [4.11, -2.88, -4.45], [4.55, -3.56, -4.85], [4.72, -3.86, -4.98], [4.80, -4.05, -4.85],
    [4.84, -4.22, -4.55]];
  function wz(y) { return WZ - Math.abs(y) * TAN_ANH; }
  function wtc(y) { return 0.08 - 0.01 * Math.abs(y) / SEMI; }
  function lerpTab(tab, y, col) {
    for (var i = 1; i < tab.length; i++) {
      if (y <= tab[i][0]) {
        var k = (y - tab[i - 1][0]) / (tab[i][0] - tab[i - 1][0]);
        return tab[i - 1][col] + (tab[i][col] - tab[i - 1][col]) * k;
      }
    }
    return tab[tab.length - 1][col];
  }
  function wingStations() {
    var o = [];
    for (var i = 0; i < WING.length; i++) {
      var y = WING[i][0], le = WING[i][1], te = WING[i][2];
      o.push({ s: y, le: le, te: te, t: (le - te) * wtc(y), h: wz(y) });
    }
    return o;
  }
  /* TAIL -- plan off D re-mapped: leading edge 56 deg from (-4.20, 0.81)
     to the tip at y 2.42; trailing edge from -6.25 to -7.55; flat, set
     low on the rear fuselage at z -0.38 (P). */
  var TAIL_Z = -0.38;
  var TAIL = [[0.55, -3.92, -6.05], [0.81, -4.20, -6.25], [1.24, -4.85, -6.65], [1.67, -5.55, -7.00],
              [2.11, -6.20, -7.40], [2.30, -6.50, -7.55], [2.40, -6.75, -7.48], [2.44, -7.00, -7.30]];
  /* FIN -- side off P: the dorsal fillet from the spine at x -2.4 sweeping
     into a straight leading edge (-3.55, 0.75) to (-5.85, 1.72); the top
     flat at 1.79; the trailing edge from (-5.95, 0.33) raked to
     (-7.15, 1.62). The root is buried in the spine. */
  var FIN = [[0.30, -2.40, -5.90], [0.52, -2.75, -6.12], [0.62, -3.20, -6.21], [0.80, -3.67, -6.38],
             [1.00, -4.14, -6.57], [1.40, -5.09, -6.94], [1.62, -5.62, -7.15], [1.72, -5.86, -7.18],
             [1.77, -6.05, -7.05], [1.79, -6.30, -6.80]];

  var GROUND = -1.76;     /* tyres on the ground in P (fin top 1.79: 3.55 m) */

  /* =============================================================== build */
  var THREE_ = null;
  function add(g, geo, mat, x, y, z) {
    var m = new THREE_.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    g.add(m);
    return m;
  }
  function rod(g, mat, r, a, b, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r, r, L, seg || 6), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE_.Vector3(0, 1, 0), new THREE_.Vector3(dx / L, dy / L, dz / L));
    g.add(m);
    return m;
  }
  /* a tube along X: r0 at the front end, r1 at the back */
  function xtube(g, mat, r0, r1, xf, xb, y, z, seg, open) {
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r1, r0, xf - xb, seg, 1, !!open), mat);
    m.rotation.z = HALF_PI;   /* local +Y -> world -X: the "top" radius is aft */
    m.position.set((xf + xb) / 2, y, z);
    g.add(m);
    return m;
  }
  /* a flat plate in the XZ plane at y, outline pts [[x, z]...], with a
     twin dy inboard for thickness; UVs pinned to a clean spot */
  function plate(g, mat, pts, y, dy) {
    var shp = new THREE_.Shape();
    shp.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) shp.lineTo(pts[i][0], pts[i][1]);
    shp.lineTo(pts[0][0], pts[0][1]);
    [0, dy].forEach(function (o) {
      var fg = new THREE_.ShapeGeometry(shp);
      fg.rotateX(HALF_PI);
      var u = fg.attributes.uv;
      for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
      add(g, fg, mat, 0, y + o, 0);
    });
  }

  function build(THREE, M, C, vk) {
    THREE_ = THREE;
    var V = VARIANTS[vk] || VARIANTS.q5;
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addBody(THREE, g, T);
    addIntakes(THREE, g, T);
    addCockpit(THREE, g, T);
    addWings(THREE, g, T);
    addTail(THREE, g, T, V);
    addPylons(THREE, g, T);
    addGear(THREE, g, T);
    addTeam(THREE, g, T);
    var out = mergeByMaterial(THREE, g);
    out.name = "q5";
    return out;
  }

  /* ------------------------------------- fuselage, probe, pipes, keel -- */
  function addBody(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, BODY, 40, true), T.body));
    /* the tail closed behind the pipes by a soot-dark bulkhead */
    var L = BODY[BODY.length - 1];
    g.add(new THREE.Mesh(loft(THREE, [L, S(-5.85, -0.33, -0.43, 0.02, -0.38)], 32), T.hot));
    /* the pitot probe: 1.07 m from the nose tip (P), a collar at its root */
    xtube(g, T.metal, 0.010, 0.022, 8.07, 7.40, 0, -0.012, 8);
    xtube(g, T.metal, 0.022, 0.030, 7.40, 6.95, 0, -0.012, 8);
    add(g, new THREE.CylinderGeometry(0.035, 0.035, 0.05, 10), T.metal, 7.42, 0, -0.012).rotation.z = HALF_PI;
    /* the twin jet pipes: heat-darkened lip rings proud of the tail, the
       dark pipes inside, the flame-holder ring deep in each (P) */
    for (var s = -1; s <= 1; s += 2) {
      var py = s * PIPE_Y;
      g.add(new THREE.Mesh(loft(THREE, [
        O(-5.70, PIPE_R + 0.01, PIPE_Z, py), O(PIPE_X, PIPE_R, PIPE_Z, py),
        O(PIPE_X - 0.03, PIPE_R - 0.03, PIPE_Z, py), O(PIPE_X + 0.08, PIPE_R - 0.05, PIPE_Z, py)], 24), T.hot));
      xtube(g, T.ink, PIPE_R - 0.05, PIPE_R - 0.09, PIPE_X + 0.08, -5.30, py, PIPE_Z, 22, true);
      var fh = add(g, new THREE.TorusGeometry(0.14, 0.02, 6, 18), T.hot, -5.55, py, PIPE_Z);
      fh.rotation.y = HALF_PI;
      add(g, new THREE.CylinderGeometry(0.07, 0.10, 0.22, 12), T.hot, -5.45, py, PIPE_Z).rotation.z = HALF_PI;
    }
    /* the fin-root fairing over and between the pipes, ending in a dark
       cap at x -6.18 (P) */
    g.add(new THREE.Mesh(loft(THREE, [
      Y(-5.40, 0, 0.30, 0.30, -0.42, -0.06, 0.9), Y(-5.80, 0, 0.26, 0.24, -0.40, -0.06, 0.9),
      Y(-6.00, 0, 0.20, 0.17, -0.30, -0.06, 0.9)], 20), T.body));
    g.add(new THREE.Mesh(loft(THREE, [
      Y(-6.00, 0, 0.20, 0.17, -0.30, -0.06, 0.9), Y(-6.12, 0, 0.14, 0.12, -0.20, -0.04, 0.9),
      Y(-6.19, 0, 0.04, 0.04, -0.06, -0.01)], 20), T.hot));
    /* the ventral keel under the rear fuselage, x -3.05 to -5.0, its
       edge 1.22 below the datum (P) */
    var ks = [{ s: -0.95, le: -2.90, te: -5.10, t: 0.07, h: 0 }, { s: -1.22, le: -3.20, te: -4.95, t: 0.05, h: 0 }];
    var kg = surf(THREE, ks, { vert: true, box: { x0: FX0, x1: FX1, s0: 0, s1: 3 } });
    pinUV(kg);
    g.add(new THREE.Mesh(kg, T.body));
    /* the spine mast behind the canopy, raked aft (P) */
    rod(g, T.metal, 0.014, [2.70, 0, 0.76], [2.56, 0, 1.00], 5);
  }

  /* ---------------------------------------- intakes and splitter plates --
     D-shaped, standing off the fuselage: the lip at x 3.66 (P), 0.79 m
     tall (z 0.42 to -0.37) and 0.40 wide, its outer face 0.88 out (D);
     the trunk swells to 0.96 out at x 2.5 and fairs into the fuselage
     over the wing root. A flat splitter plate stands off the fuselage at
     the inner face (M, E). */
  var INTAKE = [
    Y(3.66, 0.68, 0.200, 0.420, -0.370, 0.025, 0.82),
    Y(3.40, 0.665, 0.240, 0.445, -0.420, 0.010, 0.82),
    Y(2.50, 0.600, 0.355, 0.450, -0.560, -0.050, 0.82),
    Y(1.50, 0.500, 0.400, 0.400, -0.660, -0.120, 0.85),
    Y(0.50, 0.400, 0.400, 0.300, -0.720, -0.180, 0.88),
    Y(-0.50, 0.300, 0.420, 0.200, -0.760, -0.220, 0.90),
  ];
  function addIntakes(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var sec = INTAKE.map(function (q) { var c = {}; for (var k in q) c[k] = q[k]; c.yc = s * q.yc; return c; });
      g.add(new THREE.Mesh(loft(THREE, sec, 28, true), T.body));
      /* the rolled lip and the dark duct behind it */
      var a = sec[0];
      g.add(new THREE.Mesh(loft(THREE, [
        Y(3.60, a.yc, a.w - 0.035, a.zt - 0.035, a.zb + 0.035, a.zw, a.e),
        Y(3.69, a.yc, a.w - 0.012, a.zt - 0.012, a.zb + 0.012, a.zw, a.e),
        Y(3.66, a.yc, a.w, a.zt, a.zb, a.zw, a.e)], 28, true), T.body));
      g.add(new THREE.Mesh(loft(THREE, [
        Y(3.60, a.yc, a.w - 0.035, a.zt - 0.035, a.zb + 0.035, a.zw, a.e),
        Y(3.10, s * 0.62, 0.15, 0.38, -0.33, 0.02, 0.82),
        Y(2.85, s * 0.58, 0.01, 0.02, -0.02, 0.0)], 24), T.ink));
      /* the splitter plate: from just ahead of the lip back to x 2.8,
         its front edge raked (M, E) */
      plate(g, T.body, [[3.80, 0.40], [3.80, -0.36], [2.80, -0.45], [2.80, 0.50]], s * 0.475, -s * 0.015);
    }
  }

  /* ---------------------------------------------------- canopy, cockpit -- */
  function addCockpit(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, CANOPY, 28), T.glass));
    /* coaming, the sight head, seat and headrest through the glass */
    add(g, new THREE.BoxGeometry(0.30, 0.46, 0.14), T.ink, 3.78, 0, 0.53);
    add(g, new THREE.BoxGeometry(0.10, 0.10, 0.14), T.metal, 3.82, 0, 0.64);
    add(g, new THREE.BoxGeometry(0.40, 0.44, 0.28), T.ink, 3.15, 0, 0.58);
    add(g, new THREE.BoxGeometry(0.14, 0.30, 0.22), T.ink, 3.00, 0, 0.72);
    /* windscreen frame: the arch at x 3.76 and the two posts; the sills;
       the hood's rear frame (the hood hinges at the back, W) */
    var arch = add(g, new THREE.TorusGeometry(0.31, 0.020, 5, 20, PI), T.metal, 3.76, 0, 0.47);
    arch.rotation.set(HALF_PI, HALF_PI, 0);
    arch.scale.set(1.08, 1.06, 1.0);
    for (var s = -1; s <= 1; s += 2) {
      rod(g, T.metal, 0.015, [4.20, s * 0.10, 0.52], [3.77, s * 0.15, 0.79]);
      add(g, new THREE.BoxGeometry(1.45, 0.035, 0.05), T.metal, 3.30, s * 0.335, 0.47);
    }
    var rs = add(g, new THREE.TorusGeometry(0.25, 0.016, 4, 16, PI), T.metal, 2.70, 0, 0.53);
    rs.rotation.set(HALF_PI, HALF_PI, 0);
    rs.scale.set(1.1, 1.1, 1.0);
  }

  /* -------------------------------------------------------------- wings -- */
  function addWings(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    var st = wingStations();
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, mirror: true }), T.wing));
    /* ONE big fence a side (B): wraps the leading edge, rises to 0.30 m
       over mid-chord and runs the whole chord */
    var FY = 2.05, run = 0.97;
    for (var s = -1; s <= 1; s += 2) {
      var le = lerpTab(WING, FY, 1), te = lerpTab(WING, FY, 2), c = le - te, t = c * wtc(FY), h = wz(FY);
      var pts = [[le + 0.05, h - t * 0.30]], N = 12, i, xc;
      for (i = 0; i <= N; i++) {
        xc = run * i / N;
        var rise = 0.30 * Math.sin(Math.min(1, (xc + 0.03) / 0.55) * HALF_PI) * (xc > 0.70 ? Math.max(0.25, (run - xc) / 0.27) : 1);
        pts.push([le - xc * c, h + t * 0.5 * foil(xc) + rise]);
      }
      for (i = N; i >= 0; i--) {
        xc = run * i / N;
        pts.push([le - xc * c, h + t * 0.5 * foil(xc) - 0.02]);
      }
      plate(g, T.wing, pts, s * FY, -s * 0.02);
      /* the Type 23 cannon muzzle in each wing root leading edge (W) */
      var gy = 1.02, gx = lerpTab(WING, gy, 1);
      xtube(g, T.ink, 0.030, 0.030, gx + 0.16, gx - 0.10, s * gy, wz(gy) - 0.01, 10);
      xtube(g, T.metal, 0.045, 0.050, gx + 0.02, gx - 0.12, s * gy, wz(gy) - 0.01, 10);
    }
  }

  /* -------------------------------------- fin, tailplane, Q-5C fairing -- */
  function addTail(THREE, g, T, V) {
    var fs = [];
    for (var i = 0; i < FIN.length; i++) {
      var z = FIN[i][0], le = FIN[i][1], te = FIN[i][2];
      fs.push({ s: z, le: le, te: te, t: Math.max(0.05, (le - te) * 0.06), h: 0 });
    }
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: FX0, x1: FX1, s0: 2 * FZ0 - FZ1, s1: FZ1 } }), T.fin));
    var ts = [];
    for (i = 0; i < TAIL.length; i++) {
      var y = TAIL[i][0], l2 = TAIL[i][1], t2 = TAIL[i][2];
      ts.push({ s: y, le: l2, te: t2, t: (l2 - t2) * 0.07, h: TAIL_Z });
    }
    var TB = { x0: FX0, x1: FX1, s0: 0, s1: TS1 };
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB }), T.fin));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, mirror: true }), T.fin));
    /* Q-5C: the RWR fairing on the fin tip, a bullet running aft past the
       rudder to x -7.28, with two small blade antennas on top (P) */
    if (V.rwr) {
      g.add(new THREE.Mesh(loft(THREE, [
        O(-6.10, 0.01, 1.76), O(-6.30, 0.045, 1.755), O(-7.05, 0.050, 1.72), O(-7.22, 0.035, 1.70),
        O(-7.30, 0.008, 1.695)], 12), T.fin));
      add(g, new THREE.BoxGeometry(0.05, 0.012, 0.11), T.metal, -6.72, 0, 1.83).rotation.y = 0.35;
      add(g, new THREE.BoxGeometry(0.05, 0.012, 0.11), T.metal, -6.88, 0, 1.82).rotation.y = 0.35;
      add(g, new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8), T.ink, -7.29, 0, 1.695).rotation.z = HALF_PI;
    }
  }

  /* -------------------------------------------------------------- pylons --
     The tandem pair under each side of the forward fuselage (P, W, E) and
     two under each wing (P, W). Bare: the rows list no stores. */
  function addPylons(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      [[4.45, 3.80], [3.72, 2.95]].forEach(function (p) {
        var bx = (p[0] + p[1]) / 2, L = p[0] - p[1];
        add(g, pinUV(new THREE.BoxGeometry(L, 0.07, 0.20)), T.body, bx, s * 0.30, -0.56 - (bx - 3.0) * -0.03);
        add(g, new THREE.BoxGeometry(L * 0.55, 0.05, 0.05), T.metal, bx, s * 0.30, -0.68);
      });
      [[1.95, 0.75, -0.95], [2.85, -0.35, -1.75]].forEach(function (p) {
        var y = p[0], x0 = p[1], x1 = p[2], h = wz(y);
        plate(g, T.wing, [[x0, h - 0.03], [x0 - 0.15, h - 0.24], [x1 + 0.10, h - 0.24], [x1, h - 0.03]], s * y, -s * 0.06);
        add(g, new THREE.BoxGeometry((x0 - x1) * 0.8, 0.06, 0.02), T.wing, (x0 + x1) / 2, s * (y - 0.03), h - 0.24);
      });
    }
  }

  /* --------------------------------------------------------------- gear --
     Nose leg under the cockpit: wheel centre (3.07, -1.50), 0.52 m tyre
     (P). Main legs in the wings: wheel centres x -0.78 on a 3.2 m track
     (estimated from M), 0.68 m tyres; the big leg door outboard of each
     wheel (P, B). Tyres touch -1.76. */
  function addGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 3.07, nr = 0.26, nz = GROUND + nr;
    rod(gr, T.metal, 0.050, [3.22, 0, -0.52], [3.12, 0, nz + 0.20], 8);
    rod(gr, T.metal, 0.030, [2.90, 0, -0.56], [3.12, 0, nz + 0.45], 6);
    for (var f = -1; f <= 1; f += 2)
      rod(gr, T.metal, 0.025, [3.12, f * 0.11, nz + 0.25], [NX, f * 0.11, nz], 6);
    add(gr, new THREE.CylinderGeometry(nr, nr, 0.17, 18), T.ink, NX, 0, nz);
    add(gr, new THREE.CylinderGeometry(0.13, 0.13, 0.18, 10), T.metal, NX, 0, nz);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(0.90, 0.025, 0.30)), T.body, 3.05, d * 0.22, -0.72);
      nd.rotation.x = d * 0.25;
    }
    var MX = -0.78, mr = 0.34, mz = GROUND + mr, MY = 1.60, LY = 1.50;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.060, [MX + 0.15, s * LY, wz(LY) - 0.05], [MX, s * LY, mz + 0.08], 8);
      rod(gr, T.metal, 0.032, [MX + 0.80, s * 1.10, wz(1.10) - 0.10], [MX + 0.03, s * LY, mz + 0.50], 6);
      rod(gr, T.metal, 0.045, [MX, s * LY, mz], [MX, s * (MY - 0.06), mz], 6);
      add(gr, new THREE.CylinderGeometry(mr, mr, 0.19, 20), T.ink, MX, s * MY, mz);
      add(gr, new THREE.CylinderGeometry(0.17, 0.17, 0.20, 12), T.metal, MX, s * MY, mz);
      /* the leg door outboard of the wheel (P's outline) */
      plate(gr, T.body, [[0.12, wz(1.75) - 0.04], [-1.00, wz(1.75) - 0.04], [-1.15, -1.20],
                         [-0.95, -1.52], [-0.45, -1.52], [0.05, -0.80]], s * 1.75, -s * 0.025);
      /* the inner wheel-bay door hanging below the root */
      var bd = add(gr, pinUV(new THREE.BoxGeometry(1.00, 0.025, 0.40)), T.body, -0.35, s * 1.00, -0.62);
      bd.rotation.x = s * 0.30;
    }
  }

  /* --------------------------------------------------------- team flash --
     Modest and exactly C.team: a chordwise band over each upper wing
     outboard of the outer pylon, 2 cm proud so it never fights the skin. */
  function addTeam(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 }, band = [];
    [3.85, 4.20].forEach(function (y) {
      var le = lerpTab(WING, y, 1), te = lerpTab(WING, y, 2);
      band.push({ s: y, le: le + 0.03, te: te - 0.02, t: (le - te) * wtc(y), pad: 0.016, h: wz(y) });
    });
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB }), T.team));
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB, mirror: true }), T.team));
  }

  /* --------------------------------------------------------------- merge -- */
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
          if (!geo.attributes.normal) geo.computeVertexNormals();
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

  return {
    build: build,
    q5: function (THREE, M, C) { return build(THREE, M, C, "q5"); },
    q5c: function (THREE, M, C) { return build(THREE, M, C, "q5c"); },
  };
})();

/* len: the measured X extent, probe tip (8.07) to the tailplane tip
   (-7.55): 15.62 m against the published 15.65 (Q-5C: the fin-tip
   fairing at -7.30 stays inside it) */
UNIT_MODELS["pla_e60_cas"] = { len: 15.62, build: HeroQ5.q5 };
UNIT_MODELS["pla_e80_cas"] = { len: 15.62, build: HeroQ5.q5c };
