/* ============================================================================
   pla_j6.js  --  HERO model: Shenyang J-6, the licence-built MiG-19S
   (pla_e60_fighter, "Shenyang J-6 (licence MiG-19S)")
   ----------------------------------------------------------------------------
   Full-quality redo, 2026-10-30, built on the ru_mig17.js kit and idiom.

   Reference (Wikimedia Commons, held at 960 px):
     D  "Mikoyan-Gurevich MiG-19S three-view silhouette" (GVG, public
        domain): side, plan and head-on silhouettes. Every station table
        below is measured off its pixels. The three views are drawn at
        slightly different scales, so each is scaled on its own published
        figure: SIDE 41.2 px/m, lip (px 826) to the fin's top trailing
        corner (px 309) = the published 12.54 m; PLAN 38.33 px/m across,
        tip to tip (px 43-388) = the published 9.00 m span, and 39.1 px/m
        along, so the lip-to-tailplane-tip run matches the side view (at
        its span scale the plan runs 3% long; its canopy sits 0.4 m aft of
        the side's, the side's is used); FRONT 40.3 px/m on the span. Side: X = 6.27 -
        (826 - px) / 41.2, Z = (158 - py) / 41.2. Plan: X = 6.27 - (py -
        101) / 39.1, Y = (216 - px) / 38.33. Front: Y = (610.5 - px) / 40.3.
   Published (en.wikipedia "Shenyang J-6" and "Mikoyan-Gurevich MiG-19"):
   length 12.54 m with the pitot probe retracted, 14.64 m extended; span
   9.00 m; height 3.885 m; wing area 25.16 m2; wing swept 55 deg with "a
   wing fence on each side"; MiG-19S: all-moving stabilators, "heavy rods"
   on each tailplane tip against flutter, three NR-30 (one in the fuselage,
   one in each wing root), two engines, three airbrakes (two side, one
   ventral).
   Fit: 14.64 x 9.00 x 3.885 m (L with the probe, as D draws it extended;
   12.54 lip to fin). Wing off D: LE 55.8 deg, TE 40.6 deg, 53 deg at the
   quarter chord, tip chord 0.9 m, about 22 m2 gross: D's chords give 13%
   less than the published 25.16 m2. D is drawn, not altered, to match.

   Recognition list (each shows in the model; all off D unless noted):
     1. Round nose intake sitting a little low, the vertical splitter in the
        duct (front: two half-openings), the long pitot boom off the bottom
        of the lip (side, plan; 2.10 m = 14.64 - 12.54 published).
     2. Thin, highly swept wing set at the axis, root reaching forward to
        under the canopy (LE root x 3.93), 3.1 deg anhedral, rounded tips.
     3. ONE full-chord fence a side at y 2.65, wrapping under the leading
        edge (plan line; front-view tick 0.17 m below the wing).
     4. NR-30 barrels in slim fairings standing 0.8 m ahead of the wing-root
        leading edges at y 0.83 (plan).
     5. Deep fuselage (1.75 m at the belly bulge behind the wing), 1.41 m
        wide, tapering to a flat 1.02 x 0.48 m tail end holding the TWO
        nozzles side by side, a pointed fairing between them (side, plan).
     6. Tall swept fin (LE 59.7 deg) out of a long dorsal fillet, its
        trailing edge raked forward at 45 deg so the top overhangs the
        nozzles by 1.95 m (side).
     7. Big all-moving slab tailplane, 4.6 m span, set low at Z 0.21 and
        running past the nozzles; no elevator line; the anti-flutter rod
        stubs at the tips (plan; rods published).
     8. Small bubble canopy, windscreen frame at x 4.45 (side).
     9. Bare natural metal, no markings (the PLAAF star-and-bars and bort
        numbers are forbidden by the house rule).
   NOT CONFIRMED (not shown by D; estimated):
     the fuselage top under the fin (hidden behind it: run down to where
     the fin's trailing edge meets the shell); the fence's height above the
     upper skin (D's head-on shows none above, only the 0.17 m below; drawn
     0.14 m, the brief and the type's history call the fences big); the
     wing thickness (5.6%, read off a few pixels); nozzle radius and spacing
     (fitted inside the measured 1.02 x 0.48 m end); the fuselage gun's
     place (starboard, low under the cockpit) and the side airbrake outlines
     (drawn as closed seams only); the landing gear (D has none): legs,
     track 4.16 m, wheel sizes, nose leg at x 4.70, mains at x 0.30, the
     ground set by the published height under the fin top.
   Not drawn: the two under-wing ticks D's head-on shows at y 1.73 and
   1.06 (pylons or gear fairings; not identified); drop tanks and stores
   (the row lists none); open airbrakes; a ventral fin (D shows none).

   Paint: bare metal, the ru_mig17.js palette (#a4a7a7 field), NOT sampled
   off a J-6 photograph (none fetched; D is a silhouette).

   Materials: body, wing, fin (canvas textures), metal, hot, ink, glass, and
   the team colour (C.team) as a chordwise band over each outer wing.
   Nodes: "gear" (the landing gear, folded away in flight).
   Model space: +X nose, +Y port, +Z up, metres, the fuselage axis at z 0,
   the tyres at GROUND. ASCII only. Merged per material.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJ6 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;

  var PAL = { lt: "#a4a7a7", dk: "#8c9091", pale: "#b3b5b3", soot: "rgba(38,34,30," };
  var SKIN_R = 0.80, SKIN_M = 0.10;

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
  /* bare aluminium: sheets of slightly different temper, panel seams, rivet
     rows. Kept light so the airframe reads as metal, not a quilt. */
  function metalBase(g, W, H, R, n) {
    var i;
    g.fillStyle = PAL.lt; g.fillRect(0, 0, W, H);
    for (i = 0; i < n; i++) {
      g.globalAlpha = 0.10 + R() * 0.14;
      g.fillStyle = (i % 3 === 0) ? PAL.pale : PAL.dk;
      g.fillRect(R() * W, R() * H, 30 + R() * 110, 16 + R() * 50);
    }
    g.globalAlpha = 1;
  }
  function seams(g, W, H, R, n) {
    var i, x = 0;
    g.strokeStyle = "rgba(24,26,26,0.30)"; g.lineWidth = 1.3;
    while (x < W) { x += 30 + R() * 56; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(24,26,26,0.16)"; g.lineWidth = 1;
    for (i = 0; i < n; i++) {
      var px = R() * W, py = R() * H, L = 30 + R() * 110;
      g.beginPath();
      if (R() < 0.6) { g.moveTo(px, py); g.lineTo(px + L, py); } else { g.moveTo(px, py); g.lineTo(px, py + L * 0.5); }
      g.stroke();
    }
    g.strokeStyle = "rgba(24,26,26,0.30)";
    for (i = 0; i < 18; i++) g.strokeRect(R() * W, R() * H, 10 + R() * 28, 8 + R() * 16);
    g.fillStyle = "rgba(0,0,0,0.18)";
    for (i = 0; i < 36; i++) {
      var ry = R() * H, rx = R() * W * 0.85, m = 14 + ((R() * 30) | 0);
      for (var k = 0; k < m; k++) g.fillRect(rx + k * 6.5, ry, 1.5, 1.5);
    }
  }

  /* ============================================================ textures ==
     Fuselage: the loft runs nose first from the lip (BODY_X0) to the end of
     the shell (BODY_X1): u = (BODY_X0 - x) / BODY_L; v = 0 port, 0.25 top,
     0.5 starboard, 0.75 belly. After flipY: port at canvas row H (and 0),
     top 0.75H, starboard 0.5H, belly 0.25H. */
  var BODY_X0 = 6.27, BODY_X1 = -4.30, BODY_L = BODY_X0 - BODY_X1;
  function bu(x) { return (BODY_X0 - x) / BODY_L; }
  var _bd = null;
  function bodySheet(THREE) {
    if (_bd !== null) return _bd;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(19066);
      metalBase(g, W, H, R, 20);
      seams(g, W, H, R, 64);
      /* production breaks: the intake ring, the cockpit section, the joint
         ahead of the wing, the rear-fuselage break where the tail comes off
         for an engine change */
      g.strokeStyle = "rgba(20,22,22,0.55)"; g.lineWidth = 2.2;
      [bu(5.85), bu(5.30), bu(2.60), bu(-0.10), bu(-2.40)].forEach(function (u) {
        g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke();
      });
      /* the two side airbrakes, closed, low on the fuselage sides behind
         the wing root, and the ventral one on the belly between them */
      g.strokeStyle = "rgba(16,18,18,0.65)"; g.lineWidth = 2.6;
      var a0 = bu(AB_X0) * W, a1 = bu(AB_X1) * W;
      g.strokeRect(a0, H * 0.53, a1 - a0, H * 0.13);
      g.strokeRect(a0, H * 0.84, a1 - a0, H * 0.13);
      g.strokeRect(a0, H * 0.20, (bu(AB_X1 + 0.15) - bu(AB_X0)) * W, H * 0.10);
      /* gun gas soot aft of the fuselage cannon's muzzle (starboard, low) */
      var gs = g.createLinearGradient(bu(FG_X) * W, 0, bu(FG_X - 1.6) * W, 0);
      gs.addColorStop(0, PAL.soot + "0.42)"); gs.addColorStop(1, PAL.soot + "0)");
      g.fillStyle = gs;
      g.fillRect(bu(FG_X) * W, H * 0.33, (bu(FG_X - 1.6) - bu(FG_X)) * W, H * 0.12);
      /* hatches: the avionics bay behind the hood, the cockpit side panels */
      g.strokeStyle = "rgba(20,22,22,0.45)"; g.lineWidth = 1.8;
      g.strokeRect(bu(2.50) * W, H * 0.66, (bu(1.60) - bu(2.50)) * W, H * 0.18);
      g.strokeRect(bu(5.10) * W, H * 0.60, (bu(4.30) - bu(5.10)) * W, H * 0.08);
      g.strokeRect(bu(5.10) * W, H * 0.82, (bu(4.30) - bu(5.10)) * W, H * 0.08);
      g.strokeRect(bu(0.60) * W, H * 0.70, (bu(-0.60) - bu(0.60)) * W, H * 0.10);
      /* oil streaks under the belly, heat staining over the engine bays */
      for (var i = 0; i < 40; i++) {
        g.fillStyle = PAL.soot + (0.04 + R() * 0.07).toFixed(3) + ")";
        g.fillRect(bu(0.5) * W + R() * W * 0.45, H * (0.15 + R() * 0.22), 30 + R() * 80, 2 + R() * 3);
      }
      var s = g.createLinearGradient(bu(-2.9) * W, 0, W, 0);
      s.addColorStop(0, PAL.soot + "0)"); s.addColorStop(1, PAL.soot + "0.45)");
      g.fillStyle = s; g.fillRect(bu(-2.9) * W, 0, W - bu(-2.9) * W, H);
      g.fillStyle = PAL.lt; g.fillRect(W * 0.975, 0, W * 0.025, H * 0.06);
      _bd = texOf(THREE, cv);
    } catch (e) { _bd = null; }
    return _bd;
  }

  /* wings: planform UVs, u along x over [WX0, WX1], v across |y| */
  var WX0 = -2.90, WX1 = 4.60, WS1 = 4.60;
  var _wg = null;
  function wingSheet(THREE) {
    if (_wg !== null) return _wg;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(6919);
      function U(x) { return (x - WX0) / (WX1 - WX0) * W; }
      function V(y) { return (1 - y / WS1) * H; }
      metalBase(g, W, H, R, 12);
      seams(g, W, H, R, 40);
      /* flap inboard of the fence, aileron outboard: hinge lines about 0.25
         of the chord ahead of the trailing edge */
      g.strokeStyle = "rgba(16,18,18,0.60)"; g.lineWidth = 2.6;
      function hinge(y0, y1) {
        var x0 = lerpTab(WING, y0, 2) + 0.25 * (lerpTab(WING, y0, 1) - lerpTab(WING, y0, 2));
        var x1 = lerpTab(WING, y1, 2) + 0.25 * (lerpTab(WING, y1, 1) - lerpTab(WING, y1, 2));
        g.beginPath(); g.moveTo(U(lerpTab(WING, y0, 2)), V(y0)); g.lineTo(U(x0), V(y0));
        g.lineTo(U(x1), V(y1)); g.lineTo(U(lerpTab(WING, y1, 2)), V(y1)); g.stroke();
      }
      hinge(0.80, FENCE_Y - 0.05);
      hinge(FENCE_Y + 0.08, SEMI - 0.25);
      /* the spar line and the main-wheel well under the root */
      g.strokeStyle = "rgba(16,18,18,0.30)"; g.lineWidth = 1.6;
      g.beginPath();
      g.moveTo(U(lerpTab(WING, 0.8, 1) - 1.2), V(0.8));
      g.lineTo(U(lerpTab(WING, SEMI - 0.3, 1) - 0.45), V(SEMI - 0.3)); g.stroke();
      g.strokeRect(U(MG_X - 0.35), V(MG_Y + 0.15), 0.9 * W / (WX1 - WX0), (MG_Y - 0.75) * H / WS1);
      _wg = texOf(THREE, cv);
    } catch (e) { _wg = null; }
    return _wg;
  }

  /* fin and tailplane share one sheet: the fin in the upper half (v 0.5-1,
     u along x over [FX0, FX1], v up z), the tailplane in the lower (v 0 to
     0.45, across |y|). The tailplane is all-moving: no elevator line. */
  var FX0 = -6.40, FX1 = 0.00, FZ0 = 0.40, FZ1 = 2.30, TS1 = 2.40;
  var _fn = null;
  function finSheet(THREE) {
    if (_fn !== null) return _fn;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(5519);
      function U(x) { return (x - FX0) / (FX1 - FX0) * W; }
      function V(z) { return 0.5 * (1 - (z - FZ0) / (FZ1 - FZ0)) * H; }
      metalBase(g, W, H, R, 10);
      seams(g, W, H, R, 24);
      /* rudder: hinge about 0.45 m ahead of the trailing edge, from the
         fin root up to near the tip */
      g.strokeStyle = "rgba(16,18,18,0.62)"; g.lineWidth = 2.4;
      var zr0 = FZ0 + 0.18, zr1 = FIN[FIN.length - 3][0];
      var h0 = lerpTab(FIN, zr0, 2) + 0.45, h1 = lerpTab(FIN, zr1, 2) + 0.40;
      g.beginPath(); g.moveTo(U(h0), V(zr0)); g.lineTo(U(h1), V(zr1)); g.lineTo(U(lerpTab(FIN, zr1, 2)), V(zr1)); g.stroke();
      g.strokeRect(U(h0 - 0.42), V(zr0 + 0.55), 0.30 * W / (FX1 - FX0), 0.30 * 0.5 * H / (FZ1 - FZ0));
      /* heat staining low on the fin over the nozzles */
      var hs = g.createLinearGradient(0, V(FZ0), 0, V(FZ0 + 0.5));
      hs.addColorStop(0, PAL.soot + "0.30)"); hs.addColorStop(1, PAL.soot + "0)");
      g.fillStyle = hs; g.fillRect(U(-5.20), V(FZ0 + 0.5), U(-3.6) - U(-5.2), V(FZ0) - V(FZ0 + 0.5));
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
  /* small parts in the body paint take one clean spot of the sheet, so a
     gear door does not wear the whole fuselage squeezed onto it */
  function pinUV(geo) {
    var u = geo.attributes.uv;
    if (u) for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
    return geo;
  }
  function S(x, zt, zb, w, zw, e) { return { x: x, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }
  function O(x, r, zc, yc) { return { x: x, w: r, zt: zc + r, zb: zc - r, zw: zc, e: 1, yc: yc || 0 }; }

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
     All measured off D (see the header). Side view: X = 6.27 - (826 - px) /
     41.2, Z = (158 - py) / 41.2. Plan: X = 6.27 - (py - 101) / 39.1, Y =
     (216 - px) / 38.33. Front: Y = (610.5 - px) / 40.3, Z from the body
     centre at py 487.
     BODY -- zt/zb off the side, w off the plan. The intake sits a little
     low (lip Z +0.39 / -0.51). Behind x -2.0 the top line is hidden by the
     fin and its dorsal fillet: it is run down to the end, where the fin's
     trailing edge meets the shell (Z 0.21), so the tail end is a flat oval
     1.02 m across (plan) and 0.48 m deep (side), the two nozzles in it. */
  var BODY = [
    S( 6.27, 0.388, -0.510, 0.417),
    S( 6.15, 0.485, -0.534, 0.444),
    S( 5.90, 0.510, -0.558, 0.522),
    S( 5.60, 0.558, -0.583, 0.574),
    S( 5.20, 0.631, -0.631, 0.626),
    S( 4.80, 0.655, -0.655, 0.652),
    S( 4.40, 0.655, -0.680, 0.675),
    S( 4.00, 0.660, -0.704, 0.688),
    S( 3.60, 0.704, -0.704, 0.695, undefined, 0.95),
    S( 3.20, 0.752, -0.728, 0.700, undefined, 0.92),
    S( 2.80, 0.825, -0.752, 0.700, undefined, 0.90),
    S( 2.40, 0.777, -0.752, 0.702, undefined, 0.90),
    S( 1.00, 0.777, -0.752, 0.704, undefined, 0.88),
    S(-0.20, 0.777, -0.850, 0.704, undefined, 0.88),
    S(-0.80, 0.795, -0.922, 0.690, undefined, 0.88),
    S(-1.40, 0.790, -0.898, 0.680, undefined, 0.88),
    S(-2.00, 0.760, -0.801, 0.690, undefined, 0.88),
    S(-2.60, 0.680, -0.631, 0.670, undefined, 0.86),
    S(-3.00, 0.580, -0.534, 0.640, undefined, 0.84),
    S(-3.40, 0.470, -0.485, 0.600, undefined, 0.82),
    S(-3.80, 0.350, -0.364, 0.555, undefined, 0.80),
    S(-4.10, 0.260, -0.291, 0.525, undefined, 0.78),
    S(-4.30, 0.210, -0.267, 0.510, undefined, 0.76),
  ];
  /* the two nozzles side by side in the end of the shell; their lower lips
     stand 0.22 m proud of it (side, px 380-389) */
  var NOZ_X = -4.30, NOZ_Y = 0.255, NOZ_Z = -0.03, NOZ_R = 0.235;

  /* CANOPY -- side: windscreen base x 5.17 (Z 0.68), the frame arch at
     4.45 (px 750), the hood's peak 1.09 at 4.06-3.70, falling into the
     spine fairing at 2.73. Plan: 0.61 m across at most. */
  var CANOPY = [
    S( 5.17, 0.680, 0.600, 0.120, 0.62, 0.92),
    S( 5.00, 0.790, 0.600, 0.215, 0.63, 0.90),
    S( 4.79, 0.885, 0.600, 0.265, 0.64, 0.88),
    S( 4.55, 0.990, 0.600, 0.295, 0.65, 0.88),
    S( 4.25, 1.065, 0.600, 0.305, 0.66, 0.88),
    S( 3.95, 1.090, 0.610, 0.305, 0.67, 0.88),
    S( 3.60, 1.065, 0.630, 0.295, 0.69, 0.88),
    S( 3.21, 0.970, 0.660, 0.260, 0.71, 0.88),
    S( 2.95, 0.895, 0.690, 0.200, 0.73, 0.90),
    S( 2.73, 0.840, 0.740, 0.090, 0.76, 0.92),
  ];

  /* WING -- [y, le, te] off the plan: leading edge 55.8 deg from the root
     (3.93 at y 0.68) to the rounded tip (-1.80 at y 4.50); trailing edge
     40.6 deg from the root fillet (0.26) to -2.70. Mid-set at the axis
     (front view); 3.1 deg anhedral at the mid-plane (front: 7.5 px drop
     over 138 px); 5.6% thick (front: 8 px at the root). */
  var WZ = 0.00, TAN_ANH = Math.tan(3.1 * D2R), SEMI = 4.50;
  var WING = [
    [0.50, 4.20, 0.26], [0.68, 3.93, 0.30], [1.44, 2.82, 0.00], [4.20, -1.24, -2.55],
    [4.42, -1.58, -2.68], [4.50, -1.80, -2.70]];
  function wz(y) { return WZ - Math.max(0, Math.abs(y) - 0.5) * TAN_ANH; }
  function wtc(y) { return 0.056; }
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
    var o = [], ys = [0.50, 0.68, 1.44, 2.20, 2.95, 3.70, 4.20, 4.42, 4.50];
    for (var i = 0; i < ys.length; i++) {
      var y = ys[i], le = lerpTab(WING, y, 1), te = lerpTab(WING, y, 2);
      o.push({ s: y, le: le, te: te, t: (le - te) * wtc(y), h: wz(y) });
    }
    return o;
  }
  /* the fence: plan, a full-chord line at y 2.65 (px 115 and 318) */
  var FENCE_Y = 2.65;
  /* the wing-root cannon: plan, barrels at y 0.83 (px 184 and 247) from
     the leading edge forward to x 4.51 (py 170) */
  var GUN_Y = 0.83, GUN_X = 4.51;
  /* the fuselage cannon, starboard, low under the cockpit */
  var FG_X = 4.70;
  /* airbrakes on the fuselage sides behind the wing root */
  var AB_X0 = -0.30, AB_X1 = -1.20;
  /* the pitot boom off the bottom of the lip (side py 178, plan on the
     centreline), 2.10 m: the published 14.64 less 12.54 */
  var PITOT_Z = -0.475, PITOT_X1 = 6.27 + 2.10;

  /* TAIL -- all-moving slab, [y, le, te] off the plan: LE 52.6 deg from
     (-2.04, 0.70), TE 39.9 deg, tip at y 2.30 from -4.09 to -5.24. Set at
     Z 0.21 (side: the slab edge-on at py 149.5, standing aft of the shell
     to px 352). */
  var TAIL_Z = 0.21;
  var TAIL = [[0.50, -1.80, -3.80], [0.70, -2.04, -3.95], [2.20, -4.00, -5.18], [2.30, -4.13, -5.24]];
  /* FIN -- [z, le, te] off the side: LE 59.7 deg, out of a long dorsal
     fillet that starts on the spine at x -0.2; TE raked forward at 45 deg
     from the top (-6.27, Z 2.25) to the end of the shell; the top flat */
  var FIN = [[0.45, -0.60, -4.47], [0.78, -0.19, -4.90], [0.97, -1.64, -5.09], [1.09, -2.37, -5.21],
             [1.36, -3.10, -5.48], [1.77, -3.83, -5.89], [2.04, -4.26, -6.16], [2.18, -4.56, -6.25],
             [2.25, -4.92, -6.27]];

  var GROUND = 2.25 - 3.885;     /* fin top less the published 3.885 m height */
  /* main wheels: x, half track; nose wheel x (NOT CONFIRMED: no gear in D) */
  var MG_X = 0.30, MG_Y = 2.08, NG_X = 4.70;

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

  function build(THREE, M, C) {
    THREE_ = THREE;
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addBody(THREE, g, T);
    addIntake(THREE, g, T);
    addGuns(THREE, g, T);
    addCockpit(THREE, g, T);
    addWings(THREE, g, T);
    addTail(THREE, g, T);
    addGear(THREE, g, T);
    addTeam(THREE, g, T);
    var out = mergeByMaterial(THREE, g);
    out.name = "j6";
    return out;
  }

  /* -------------------------------------------- fuselage, nozzles -------- */
  function addBody(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, BODY, 40), T.body));
    var e = BODY[BODY.length - 1];
    /* the end of the shell: a dark heat-shield plate the two nozzles come
       through, closing the oval */
    var cap = new THREE.Mesh(new THREE.CircleGeometry(1, 28), T.hot);
    cap.rotation.y = -HALF_PI;
    cap.scale.set((e.zt - e.zb) / 2 - 0.005, e.w - 0.005, 1);
    cap.position.set(NOZ_X - 0.005, 0, (e.zt + e.zb) / 2);
    g.add(cap);
    /* two afterburner nozzles side by side, their lips 0.22 m proud of the
       plate (side): a heat-darkened ring, the dark pipe, the flame holder */
    for (var s = -1; s <= 1; s += 2) {
      var y = s * NOZ_Y;
      g.add(new THREE.Mesh(loft(THREE, [
        O(NOZ_X + 0.05, NOZ_R + 0.004, NOZ_Z, y), O(NOZ_X - 0.20, NOZ_R, NOZ_Z, y),
        O(NOZ_X - 0.22, NOZ_R - 0.025, NOZ_Z, y), O(NOZ_X - 0.15, NOZ_R - 0.04, NOZ_Z, y)], 24), T.hot));
      xtube(g, T.ink, NOZ_R - 0.04, NOZ_R - 0.08, NOZ_X - 0.15, NOZ_X + 0.50, y, NOZ_Z, 20, true);
      var fh = add(g, new THREE.TorusGeometry(0.11, 0.018, 6, 16), T.hot, NOZ_X + 0.25, y, NOZ_Z);
      fh.rotation.y = HALF_PI;
      add(g, new THREE.CylinderGeometry(0.06, 0.08, 0.20, 12), T.hot, NOZ_X + 0.35, y, NOZ_Z).rotation.z = HALF_PI;
    }
    /* the pointed fairing between the nozzles under the fin's foot (plan:
       the shell runs out to a point at x -4.40) */
    g.add(new THREE.Mesh(loft(THREE, [
      O(-4.00, 0.13, 0.10), O(-4.30, 0.08, 0.10), O(-4.42, 0.015, 0.10)], 10), T.body));
    /* wing-root fillets: the root fairs into the fuselage side from ahead
       of the guns back to the trailing edge (plan: the LE meets the side at
       x 3.93, the TE at 0.26) */
    for (s = -1; s <= 1; s += 2) {
      g.add(new THREE.Mesh(loft(THREE, [
        { x: 4.30, yc: s * 0.68, w: 0.02, zt: WZ + 0.03, zb: WZ - 0.03, zw: WZ },
        { x: 3.90, yc: s * 0.70, w: 0.06, zt: WZ + 0.13, zb: WZ - 0.13, zw: WZ, e: 0.9 },
        { x: 2.00, yc: s * 0.71, w: 0.06, zt: WZ + 0.13, zb: WZ - 0.13, zw: WZ, e: 0.9 },
        { x: 0.50, yc: s * 0.71, w: 0.05, zt: WZ + 0.08, zb: WZ - 0.08, zw: WZ, e: 0.9 },
        { x: 0.20, yc: s * 0.705, w: 0.02, zt: WZ + 0.03, zb: WZ - 0.03, zw: WZ },
      ], 12, true), T.body));
    }
  }

  /* ---------------------------------------------- intake and splitter ----
     The lip (side: Z +0.39 to -0.51; plan 0.83 m across) is a rolled ring
     sitting a little low on the axis; inside it a dark duct and the vertical
     splitter plate dividing the flow for the two engines (front view: the
     two half-openings either side of it). The pitot boom runs forward off
     the bottom of the lip (side and plan). */
  function addIntake(THREE, g, T) {
    var L = BODY[0], zc = (L.zt + L.zb) / 2, hh = (L.zt - L.zb) / 2, hw = L.w;
    function R(x, k) { return S(x, zc + hh * k, zc - hh * k, hw * k, zc); }
    g.add(new THREE.Mesh(loft(THREE, [R(6.05, 0.86), R(6.25, 0.89), R(6.31, 0.94), L], 40, true), T.body));
    g.add(new THREE.Mesh(loft(THREE, [R(6.05, 0.86), R(5.70, 0.83)], 32, true), T.body));
    g.add(new THREE.Mesh(loft(THREE, [R(5.70, 0.83), R(5.30, 0.80), R(4.70, 0.74), R(4.68, 0.02)], 32), T.ink));
    /* the splitter: a plate on the centreline, front edge rounded */
    add(g, new THREE.BoxGeometry(1.30, 0.05, hh * 1.66), T.metal, 5.43, 0, zc);
    add(g, new THREE.CylinderGeometry(0.03, 0.03, hh * 1.66, 8), T.metal, 6.08, 0, zc).rotation.x = HALF_PI;
    /* the pitot boom: a fairing on the lower lip, the thin boom, its head */
    g.add(new THREE.Mesh(loft(THREE, [
      O(6.00, 0.01, PITOT_Z - 0.01), O(6.15, 0.045, PITOT_Z), O(6.45, 0.04, PITOT_Z), O(6.60, 0.022, PITOT_Z)], 10, true), T.body));
    xtube(g, T.metal, 0.020, 0.022, PITOT_X1 - 0.30, 6.60, 0, PITOT_Z, 8);
    xtube(g, T.metal, 0.010, 0.020, PITOT_X1, PITOT_X1 - 0.30, 0, PITOT_Z, 8);
  }

  /* --------------------------------------------------------- the guns ----
     Three NR-30 (published): one in each wing root, the barrel in a slim
     fairing standing well forward of the leading edge (plan, to x 4.51);
     one in the fuselage, starboard, low under the cockpit (position NOT
     CONFIRMED: D is a silhouette). */
  function addGuns(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var y = s * GUN_Y, le = lerpTab(WING, GUN_Y, 1), z = wz(GUN_Y);
      g.add(new THREE.Mesh(loft(THREE, [
        O(GUN_X - 0.30, 0.025, z, y), O(GUN_X - 0.42, 0.045, z, y), O(le + 0.05, 0.060, z, y),
        O(le - 0.60, 0.02, z, y)], 12, true), T.wing));
      xtube(g, T.ink, 0.022, 0.022, GUN_X - 0.05, GUN_X - 0.32, y, z, 10);
      xtube(g, T.metal, 0.032, 0.032, GUN_X, GUN_X - 0.06, y, z, 10);
    }
    var gy = -0.55, gz = -0.48;
    g.add(new THREE.Mesh(loft(THREE, [
      O(FG_X + 0.05, 0.03, gz, gy), O(FG_X - 0.08, 0.075, gz, gy), O(FG_X - 0.90, 0.085, gz, gy),
      O(FG_X - 1.30, 0.02, gz + 0.02, gy + 0.03)], 12, true), T.body));
    xtube(g, T.ink, 0.024, 0.024, FG_X + 0.25, FG_X - 0.02, gy, gz, 10);
  }

  /* ---------------------------------------------------- canopy, cockpit -- */
  function addCockpit(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, CANOPY, 28), T.glass));
    add(g, new THREE.BoxGeometry(0.30, 0.48, 0.16), T.ink, 4.85, 0, 0.68);
    add(g, new THREE.BoxGeometry(0.10, 0.10, 0.14), T.metal, 4.90, 0, 0.80);
    add(g, new THREE.BoxGeometry(0.40, 0.44, 0.30), T.ink, 3.95, 0, 0.78);
    add(g, new THREE.BoxGeometry(0.14, 0.30, 0.22), T.ink, 3.78, 0, 0.94);
    /* windscreen: the flat front panel's two posts up to the frame arch
       at x 4.45 (side px 750 shows the frame over the glass); the sills */
    var arch = add(g, new THREE.TorusGeometry(0.30, 0.022, 5, 20, PI), T.metal, 4.45, 0, 0.66);
    arch.rotation.set(HALF_PI, HALF_PI, 0);
    arch.scale.set(1.0, 1.33, 1.0);
    for (var s = -1; s <= 1; s += 2) {
      rod(g, T.metal, 0.016, [5.16, s * 0.10, 0.68], [4.47, s * 0.20, 1.02]);
      add(g, new THREE.BoxGeometry(2.40, 0.035, 0.05), T.metal, 3.95, s * 0.31, 0.64);
    }
    var rs = add(g, new THREE.TorusGeometry(0.22, 0.016, 4, 16, PI), T.metal, 2.85, 0, 0.76);
    rs.rotation.set(HALF_PI, HALF_PI, 0);
    rs.scale.set(1.0, 0.62, 1.0);
  }

  /* -------------------------------------------------------------- wings -- */
  function addWings(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    var st = wingStations();
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, mirror: true }), T.wing));
    /* ONE big fence a side, full chord (plan), wrapping the leading edge
       and hanging FENCE_D under the front of the lower skin (front view:
       the tick 0.17 m below the wing at y 2.57); FENCE_H over the upper
       skin is NOT CONFIRMED (the front view shows none above) */
    var FENCE_H = 0.14, FENCE_D = 0.17;
    for (var s = -1; s <= 1; s += 2) {
      var y = FENCE_Y;
      var le = lerpTab(WING, y, 1), te = lerpTab(WING, y, 2), c = le - te, t = c * wtc(y), h = wz(y);
      var shp = new THREE.Shape(), N = 14, i, xc, run = 0.97;
      shp.moveTo(le + 0.06, h - t * 0.40);
      for (i = 0; i <= N; i++) {
        xc = run * i / N;
        var rise = FENCE_H * Math.min(1, (xc + 0.03) / 0.12) * (xc > run - 0.10 ? Math.max(0.30, (run - xc) / 0.10) : 1);
        shp.lineTo(le - xc * c, h + t * 0.5 * foil(xc) + rise);
      }
      shp.lineTo(le - run * c, h + t * 0.5 * foil(run) - 0.01);
      for (i = N; i >= 0; i--) {
        xc = run * i / N;
        var drop = FENCE_D * (xc < 0.30 ? Math.min(1, (xc + 0.04) / 0.10) : Math.max(0, (0.60 - xc) / 0.30));
        shp.lineTo(le - xc * c, h - t * 0.5 * foil(xc) - 0.01 - drop);
      }
      shp.lineTo(le + 0.06, h - t * 0.40);
      var fg = new THREE.ShapeGeometry(shp);
      fg.rotateX(HALF_PI);
      var fg2 = fg.clone();
      add(g, fg, T.wing, 0, s * y, 0);
      add(g, fg2, T.wing, 0, s * (y - 0.025), 0);
      [fg, fg2].forEach(function (q) {
        var u = q.attributes.uv;
        for (var j = 0; j < u.count; j++) u.setXY(j, 0.5, 0.95);
      });
    }
  }

  /* ----------------------------------------------- fin and tailplane ---- */
  function addTail(THREE, g, T) {
    var fs = [];
    for (var i = 0; i < FIN.length; i++) {
      var z = FIN[i][0], le = FIN[i][1], te = FIN[i][2];
      fs.push({ s: z, le: le, te: te, t: Math.max(0.05, Math.min(0.16, (le - te) * 0.05)), h: 0 });
    }
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: FX0, x1: FX1, s0: 2 * FZ0 - FZ1, s1: FZ1 } }), T.fin));
    var ts = [];
    for (i = 0; i < TAIL.length; i++) {
      var y = TAIL[i][0], l2 = TAIL[i][1], t2 = TAIL[i][2];
      ts.push({ s: y, le: l2, te: t2, t: (l2 - t2) * 0.06, h: TAIL_Z });
    }
    var TB = { x0: FX0, x1: FX1, s0: 0, s1: TS1 };
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB }), T.fin));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, mirror: true }), T.fin));
    /* the anti-flutter mass rods at the slab tips (published: added on the
       SM-9/3 and kept), standing about 0.15 m forward of the leading edge
       (plan: the stub at px 129-130 and 302, py 503-506) */
    var tipY = TAIL[TAIL.length - 1][0] - 0.03, tipLE = lerpTab(TAIL, tipY, 1);
    for (var s = -1; s <= 1; s += 2) {
      xtube(g, T.metal, 0.010, 0.030, tipLE + 0.18, tipLE - 0.25, s * tipY, TAIL_Z, 8);
    }
    /* the pivot fairing where each slab meets the fuselage */
    for (s = -1; s <= 1; s += 2) {
      g.add(new THREE.Mesh(loft(THREE, [
        O(-2.30, 0.01, TAIL_Z, s * 0.62), O(-2.50, 0.07, TAIL_Z, s * 0.62), O(-3.30, 0.075, TAIL_Z, s * 0.56),
        O(-3.70, 0.01, TAIL_Z, s * 0.52)], 10, true), T.body));
    }
  }

  /* --------------------------------------------------------------- gear --
     Main legs in the wings, wheels on the track 2 MG_Y, retracting inward
     into the roots; the nose leg retracting forward under the intake duct.
     Tyres touch GROUND. */
  function addGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var nr = 0.24, nz = GROUND + nr;
    rod(gr, T.metal, 0.045, [NG_X - 0.04, 0, -0.66], [NG_X, 0, nz + 0.10], 8);
    rod(gr, T.metal, 0.028, [NG_X - 0.42, 0, -0.70], [NG_X - 0.02, 0, nz + 0.30], 6);
    for (var f = -1; f <= 1; f += 2)
      add(gr, new THREE.BoxGeometry(0.10, 0.03, 0.34), T.metal, NG_X + 0.02, f * 0.12, nz + 0.12);
    add(gr, new THREE.CylinderGeometry(nr, nr, 0.18, 18), T.ink, NG_X, 0, nz);
    add(gr, new THREE.CylinderGeometry(0.12, 0.12, 0.19, 10), T.metal, NG_X, 0, nz);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(0.90, 0.025, 0.34)), T.body, NG_X + 0.25, d * 0.25, -0.86);
      nd.rotation.x = d * 0.30;
    }
    var mr = 0.33, mz = GROUND + mr, LY = MG_Y - 0.13;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.055, [MG_X + 0.05, s * LY, wz(LY) - 0.05], [MG_X, s * LY, mz + 0.06], 8);
      rod(gr, T.metal, 0.030, [MG_X + 0.60, s * (LY - 0.60), wz(LY - 0.6) - 0.08], [MG_X + 0.02, s * LY, mz + 0.45], 6);
      rod(gr, T.metal, 0.040, [MG_X, s * LY, mz], [MG_X, s * (MG_Y - 0.05), mz], 6);
      add(gr, new THREE.CylinderGeometry(mr, mr, 0.19, 20), T.ink, MG_X, s * MG_Y, mz);
      add(gr, new THREE.CylinderGeometry(0.17, 0.17, 0.20, 12), T.metal, MG_X, s * MG_Y, mz);
      add(gr, pinUV(new THREE.BoxGeometry(0.75, 0.025, 0.85)), T.body, MG_X + 0.02, s * (LY + 0.09), wz(LY) - 0.50);
      var bd = add(gr, pinUV(new THREE.BoxGeometry(1.00, 0.025, 0.42)), T.body, MG_X + 0.25, s * 1.15, wz(1.15) - 0.32);
      bd.rotation.x = s * 0.25;
    }
  }

  /* --------------------------------------------------------- team flash --
     Exactly C.team: a chordwise band over each upper wing outboard of the
     fence, 2 cm proud so it never fights the skin. */
  function addTeam(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 }, band = [];
    [3.55, 3.85].forEach(function (y) {
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

  return { build: build };
})();

/* len: the measured X extent, the pitot head (8.37) to the fin's top trailing
   corner (-6.27): the published 14.64 m with the probe */
UNIT_MODELS["pla_e60_fighter"] = {
  len: 14.64,
  build: function (THREE, M, C) { return HeroJ6.build(THREE, M, C); },
};
