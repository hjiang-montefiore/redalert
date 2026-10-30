/* ============================================================================
   ru_mig17.js  --  HERO model: MiG-17F "Fresco-C" (pact_e50_fighter)
   ----------------------------------------------------------------------------
   Full-quality redo, 2026-10-24. Every shape below is measured, not guessed.

   References (Wikimedia Commons, fetched at width 960 and cached):
     D  "Mikoyan-Gurevich MiG-17F three-view silhouette" (public domain). The
        station tables are measured off its pixels: 23.7 px/m, which gives
        the published 9.63 m span and 11.2 m length. Side view: X = (px -
        342.8) / 23.7, Z = (76 - py) / 23.7; plan: X = (146.2 - py) / 23.7,
        Y = (128 - px) / 23.7; head-on for the fence stations and anhedral.
     T  "MiG-17F Top View" (an airframe in flight from above): the three
        fences a side and how far each runs back over the chord.
     H  "MiG-17F Fresco-C RHeadOn KAM 11Aug2010": the round intake lip, the
        small fitting on its top, the splitter deep in the duct, the
        windscreen and hood, natural metal.
     G  "MiG-17F Fresco-C Cannons CFM 7Oct2011": the two NR-23 barrels on the
        PORT side of the gun tray, stacked, with the N-37D muzzle beyond.
     Z  "MiG-17F Fresco C, Czech air force 0872 pic1": the N-37D with its
        slotted muzzle brake on the STARBOARD side, reaching to below the
        lip; the slanted mast behind the hood; the tray fairing; bare metal.
     A  "MiG-17F Airbrake" and "MiG-17F Fresco-C RRear KAM": the F's two
        airbrakes on the rear fuselage sides just ahead of the jet pipe.
     J  "MiG-17F JBG-31": the tail (tailplane on the fin, rudder, the
        airbrake outline closed), the main-leg doors, fences in profile.
     S  "MiG-17F Fresco-C RSide KAM": the rear fuselage parted at the
        production joint just behind the wing root.
     Monino "MiG-17 at Central Air Force Museum Monino pic1" (kept from the
        first version): a Soviet airframe, bare metal, ONE small red star on
        each side of the fin.
   Published: length 11.26 m, span 9.63 m, height 3.80 m, sweep 45 deg,
   anhedral 3 deg (air_specs.js: len 11.3, span 9.6, sweep 45, dihedral -3).

   Recognition list (each shows in the model; source in brackets):
     1. Round nose intake, 0.97 m across, with a thin vertical splitter set
        back in the duct and a small fitting on the lip top (D head-on, H).
     2. Compound-swept wing: leading edge 48 deg inboard of y 2.45 m, 45 deg
        outboard; trailing edge straight across at the root then 41 deg;
        rounded tips (D plan, measured).
     3. THREE fences a side at 1.33, 2.72 and 3.39 m, wrapping the leading
        edge; the outer one runs back over about two thirds of the chord
        (D head-on, T).
     4. Small bubble canopy: framed windscreen and a frameless sliding hood,
        peak 1.10 m over the axis just behind the windscreen, falling into
        the spine at x 2.4 (D side).
     5. Tall fin, leading edge swept about 60 deg, rounded top at 2.57 m;
        tailplane set ON the fin at 1.62 m, swept 45 deg (D side, plan, J).
     6. The F's afterburner tail: the jet pipe ends at x -3.55 under the fin
        overhang; the two airbrakes on the rear fuselage sides (D, A, J).
     7. Three cannon under the nose: N-37D starboard with its muzzle brake,
        two NR-23 port, stacked, on the gun-tray fairing (G, Z, H).
     8. Deep, near-circular fuselage, 1.40 m wide at the wing, the belly
        rising to the jet pipe (D side, plan).
     9. Bare natural metal; a red star on each fin face only (Monino, Z, H).
    10. Mast slanted aft-outboard behind the hood and the short spine mast
        at x 0.73 (D side and head-on, Z).
   Not confirmed, so not drawn: wing-tip probes (T is a privately flown
   airframe), drop tanks (the row lists none), open airbrakes, bort numbers
   (forbidden). Approximate only: barrel positions, the tray outline, the
   exact splitter depth, tyre sizes, the gear-door outlines.

   Paint: sunlit metal sampled off H (192,190,191) and Z (196,180,164,
   museum light, warm), taken to about 0.85 of level and neutralised:
   field #a4a7a7. The ACES pass lifts it back.

   Model space: +X nose, +Y port, +Z up, metres. Merged per material; the
   retracting undercarriage is the group "gear" (it folds into the wing
   roots and under the cockpit, so it is "gear", not "undercarriage").
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMiG17 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;

  var PAL = { lt: "#a4a7a7", dk: "#8c9091", pale: "#b3b5b3", soot: "rgba(38,34,30,", red: "#a8241c" };
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
  /* the Soviet star: red with a white border and a thin red edge, as the
     existing Russian heroes paint it */
  /* rx, ry: the radius in canvas pixels along u and v, which differ when
     the sheet's pixels are not square in metres */
  function star(g, cx, cy, rx, ry) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#9e2a22"; path(1.26); g.fill();
    g.fillStyle = "#dcdad3"; path(1.14); g.fill();
    g.fillStyle = PAL.red; path(1.0); g.fill();
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
     Fuselage: the loft runs nose first from the lip (x 5.47) to the jet
     pipe (x -3.55): u = (5.47 - x) / 9.02; v = 0 port, 0.25 top, 0.5
     starboard, 0.75 belly. After flipY: port at canvas row H (and 0),
     top 0.75H, starboard 0.5H, belly 0.25H. */
  var BODY_X0 = 5.47, BODY_L = 9.02;
  function bu(x) { return (BODY_X0 - x) / BODY_L; }
  var _bd = null;
  function bodySheet(THREE) {
    if (_bd !== null) return _bd;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(17052);
      metalBase(g, W, H, R, 18);
      seams(g, W, H, R, 60);
      /* production breaks: the intake ring, the cockpit section, and the
         rear-fuselage joint just behind the wing root (S shows it parted) */
      g.strokeStyle = "rgba(20,22,22,0.55)"; g.lineWidth = 2.2;
      [bu(5.05), bu(4.30), bu(2.30), bu(0.00), bu(-2.55)].forEach(function (u) {
        g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke();
      });
      /* the airbrakes, closed: an outline on each side ahead of the pipe
         (J shows the seam). Port straddles the wrap, so twice. */
      g.strokeStyle = "rgba(16,18,18,0.65)"; g.lineWidth = 2.6;
      var a0 = bu(-2.72) * W, a1 = bu(-3.42) * W;
      g.strokeRect(a0, H * 0.405, a1 - a0, H * 0.19);
      g.strokeRect(a0, H * 0.905, a1 - a0, H * 0.19);
      g.strokeRect(a0, -H * 0.095, a1 - a0, H * 0.19);
      /* gun gas soot along the lower nose from the muzzles back (G, Z) */
      var gs = g.createLinearGradient(bu(5.2) * W, 0, bu(3.4) * W, 0);
      gs.addColorStop(0, PAL.soot + "0.40)"); gs.addColorStop(1, PAL.soot + "0)");
      g.fillStyle = gs;
      g.fillRect(bu(5.2) * W, H * 0.12, (bu(3.4) - bu(5.2)) * W, H * 0.30);
      /* hatches: the cockpit side panel, the radio bay behind the hood */
      g.strokeStyle = "rgba(20,22,22,0.45)"; g.lineWidth = 1.8;
      g.strokeRect(bu(3.6) * W, H * 0.66, (bu(2.9) - bu(3.6)) * W, H * 0.07);
      g.strokeRect(bu(3.6) * W, H * 0.77, (bu(2.9) - bu(3.6)) * W, H * 0.07);
      g.strokeRect(bu(1.9) * W, H * 0.64, (bu(1.2) - bu(1.9)) * W, H * 0.22);
      /* oil streaks under the belly, heat staining over the last metre */
      for (var i = 0; i < 36; i++) {
        g.fillStyle = PAL.soot + (0.04 + R() * 0.07).toFixed(3) + ")";
        g.fillRect(bu(1.5) * W + R() * W * 0.55, H * (0.15 + R() * 0.22), 30 + R() * 80, 2 + R() * 3);
      }
      var s = g.createLinearGradient(bu(-2.3) * W, 0, W, 0);
      s.addColorStop(0, PAL.soot + "0)"); s.addColorStop(1, PAL.soot + "0.42)");
      g.fillStyle = s; g.fillRect(bu(-2.3) * W, 0, W - bu(-2.3) * W, H);
      g.fillStyle = PAL.lt; g.fillRect(W * 0.975, 0, W * 0.025, H * 0.06);
      _bd = texOf(THREE, cv);
    } catch (e) { _bd = null; }
    return _bd;
  }

  /* wings: planform UVs, u along x over [WX0, WX1], v across |y| */
  var WX0 = -2.30, WX1 = 4.00, WS1 = 4.90;
  var _wg = null;
  function wingSheet(THREE) {
    if (_wg !== null) return _wg;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(7717);
      function U(x) { return (x - WX0) / (WX1 - WX0) * W; }
      function V(y) { return (1 - y / WS1) * H; }
      metalBase(g, W, H, R, 12);
      seams(g, W, H, R, 40);
      /* flap inboard (root to 2.70 m), aileron outboard (2.80 to 4.45 m):
         hinge lines parallel to the trailing edge, about 0.25 of chord */
      g.strokeStyle = "rgba(16,18,18,0.60)"; g.lineWidth = 2.6;
      g.beginPath(); g.moveTo(U(0.95), V(0.70)); g.lineTo(U(0.95), V(1.43)); g.lineTo(U(-0.65), V(2.70)); g.stroke();
      g.beginPath(); g.moveTo(U(-0.73), V(2.80)); g.lineTo(U(-1.80), V(4.45)); g.stroke();
      g.beginPath(); g.moveTo(U(-0.65), V(2.70)); g.lineTo(U(-1.20), V(2.70)); g.stroke();
      g.beginPath(); g.moveTo(U(-0.73), V(2.80)); g.lineTo(U(-1.28), V(2.80)); g.stroke();
      g.beginPath(); g.moveTo(U(-1.80), V(4.45)); g.lineTo(U(-2.14), V(4.45)); g.stroke();
      /* the spar line and the main-wheel well doors under the root */
      g.strokeStyle = "rgba(16,18,18,0.30)"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(U(2.1), V(0.7)); g.lineTo(U(-0.7), V(4.4)); g.stroke();
      g.strokeRect(U(0.95), V(1.95), U(2.10) - U(0.95), V(0.75) - V(1.95));
      /* the tailplane block (v below 0.13, inside the fuselage on the wing
         itself) is kept clean for nothing; the fin sheet carries the tail */
      _wg = texOf(THREE, cv);
    } catch (e) { _wg = null; }
    return _wg;
  }

  /* fin and tailplane share one sheet: the fin in the upper half (v 0.5-1,
     u along x over [FX0, FX1], v up z), the tailplane in the lower (v 0 to
     0.45, across |y|). The star sits on the fin where Monino shows it. */
  var FX0 = -5.90, FX1 = -1.20, FZ0 = 0.30, FZ1 = 2.62, TS1 = 3.80;
  /* plain: no national marking (the PLA J-5 row, see the foot of the file) */
  var _fn = {};
  function finSheet(THREE, plain) {
    var fk = plain ? "plain" : "star";
    if (_fn[fk] !== undefined) return _fn[fk];
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(4421);
      function U(x) { return (x - FX0) / (FX1 - FX0) * W; }
      function V(z) { return 0.5 * (1 - (z - FZ0) / (FZ1 - FZ0)) * H; }
      function VT(y) { return (1 - y / TS1) * H; }
      metalBase(g, W, H, R, 10);
      seams(g, W, H, R, 24);
      /* rudder: hinge about 0.55 m ahead of the trailing edge, from the
         tailplane up to 2.30 m; its foot over the jet pipe (D, J) */
      g.strokeStyle = "rgba(16,18,18,0.62)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-4.60), V(0.48)); g.lineTo(U(-4.92), V(1.55)); g.lineTo(U(-5.18), V(2.30)); g.stroke();
      g.beginPath(); g.moveTo(U(-5.18), V(2.30)); g.lineTo(U(-5.70), V(2.30)); g.stroke();
      /* the trim tab low on the rudder */
      g.strokeRect(U(-5.05), V(1.30), U(-4.80) - U(-5.05), V(0.95) - V(1.30));
      /* the red star, one each face (Monino) */
      if (!plain) star(g, U(-4.40), V(2.02), 0.24 * W / (FX1 - FX0), 0.24 * 0.5 * H / (FZ1 - FZ0));
      /* tailplane: elevator hinge about 0.3 of the chord */
      g.beginPath(); g.moveTo(U(-4.70), VT(0.10)); g.lineTo(U(-5.30), VT(1.55)); g.stroke();
      /* heat staining where the fin's foot hangs over the pipe */
      var hs = g.createLinearGradient(0, V(0.30), 0, V(0.90));
      hs.addColorStop(0, PAL.soot + "0.28)"); hs.addColorStop(1, PAL.soot + "0)");
      g.fillStyle = hs; g.fillRect(U(-4.40), V(0.90), U(-3.50) - U(-4.40), V(0.30) - V(0.90));
      _fn[fk] = texOf(THREE, cv);
    } catch (e) { _fn[fk] = null; }
    return _fn[fk];
  }

  /* ============================================================ materials */
  function materials(THREE, C, plain) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    return {
      body: sk(bodySheet(THREE), PAL.lt),
      wing: sk(wingSheet(THREE), PAL.lt),
      fin: sk(finSheet(THREE, plain), PAL.lt),
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
     BODY -- measured off D (side for zt/zb, plan for w). The belly line
     here is the fuselage's own; the gun tray hangs below it separately. The
     axis rises aft: the jet pipe's centre is 0.07 m up at the exit. */
  var BODY = [
    S( 5.47, 0.445, -0.425, 0.468,  0.010),
    S( 5.38, 0.468, -0.455, 0.492,  0.005),
    S( 5.20, 0.490, -0.500, 0.530,  0.000),
    S( 5.00, 0.515, -0.545, 0.570, -0.010),
    S( 4.60, 0.570, -0.600, 0.630, -0.020),
    S( 4.20, 0.620, -0.640, 0.655, -0.020),
    S( 3.80, 0.660, -0.680, 0.680, -0.020),
    S( 3.20, 0.715, -0.710, 0.700,  0.000),
    S( 2.40, 0.760, -0.720, 0.700,  0.000),
    S( 1.50, 0.735, -0.720, 0.700,  0.000),
    S( 0.50, 0.710, -0.680, 0.700,  0.010),
    S(-0.50, 0.690, -0.620, 0.670,  0.020),
    S(-1.40, 0.675, -0.620, 0.635,  0.030),
    S(-2.10, 0.650, -0.610, 0.600,  0.040),
    S(-2.60, 0.620, -0.550, 0.565,  0.050),
    S(-3.00, 0.585, -0.470, 0.525,  0.060),
    S(-3.30, 0.540, -0.380, 0.470,  0.070),
    S(-3.55, 0.460, -0.320, 0.400,  0.070),
  ];
  var PIPE_Z = 0.07, PIPE_R = 0.385, PIPE_X = -3.55;

  /* CANOPY -- windscreen base x 4.15 (z 0.70), its top frame at x 3.73
     (z 1.10), the hood falling into the spine at x 2.38 (D side); 0.68 m
     across (D head-on). */
  var CANOPY = [
    S( 4.16, 0.700, 0.600, 0.150, 0.60, 0.92),
    S( 4.00, 0.860, 0.600, 0.265, 0.62, 0.90),
    S( 3.80, 1.040, 0.600, 0.320, 0.64, 0.88),
    S( 3.62, 1.100, 0.600, 0.338, 0.66, 0.88),
    S( 3.30, 1.085, 0.600, 0.340, 0.66, 0.88),
    S( 3.00, 1.035, 0.600, 0.330, 0.66, 0.88),
    S( 2.75, 0.955, 0.620, 0.300, 0.68, 0.88),
    S( 2.52, 0.840, 0.660, 0.225, 0.70, 0.90),
    S( 2.38, 0.770, 0.690, 0.100, 0.72, 0.92),
  ];

  /* WING -- plan off D: LE 48 deg to the kink at y 2.45, 45 deg outboard;
     TE straight across to y 1.43 then 41 deg; rounded tip to y 4.81. The
     chord plane sits 0.02 m up at the root with 3 deg of anhedral; t/c 9%
     at the root to 8% at the tip (TsAGI S-12s, published). */
  var WZ = 0.02, TAN_ANH = Math.tan(3 * D2R), SEMI = 4.81;
  var WING = [
    [0.45, 3.94, 0.24], [0.70, 3.66, 0.24], [1.43, 2.84, 0.24], [2.45, 1.70, -0.64],
    [3.40, 0.75, -1.46], [4.09, 0.06, -2.05], [4.35, -0.20, -2.14], [4.60, -0.46, -2.10],
    [4.73, -0.71, -1.85], [4.81, -1.05, -1.55]];
  function wz(y) { return WZ - Math.abs(y) * TAN_ANH; }
  function wtc(y) { return 0.09 - 0.01 * Math.abs(y) / SEMI; }
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
  /* TAIL -- plan off D: LE (-3.88, 0.34) swept 45 deg to (-5.15, 1.60),
     TE from (-4.95, 0) swept 21 deg to the tip at -5.72, rounded; set on
     the fin at z 1.62 (D side). */
  var TAIL_Z = 1.62;
  var TAIL = [[0.03, -3.57, -4.97], [0.34, -3.88, -5.12], [0.90, -4.44, -5.40], [1.45, -4.99, -5.67],
              [1.62, -5.18, -5.74], [1.67, -5.40, -5.68]];
  /* FIN -- side off D: LE (-1.41, 0.68) curving into ~60 deg, rounded top
     at z 2.57; TE from the pipe overhang (-4.30, 0.46) raked to (-5.73,
     2.35). The root is buried in the spine. */
  var FIN = [[0.40, -1.25, -4.25], [0.68, -1.41, -4.58], [0.84, -1.62, -4.73], [1.10, -2.13, -4.91],
             [1.39, -2.65, -5.13], [1.69, -3.16, -5.38], [1.98, -3.66, -5.56], [2.28, -4.17, -5.71],
             [2.41, -4.42, -5.72], [2.49, -4.68, -5.64], [2.54, -4.88, -5.45], [2.57, -5.02, -5.14]];

  var GROUND = -1.25;     /* fin tip 2.57 - published height 3.80 */

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

  function build(THREE, M, C, plain) {
    THREE_ = THREE;
    var T = materials(THREE, C, plain);
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
    out.name = "mig17";
    return out;
  }

  /* -------------------------------------------- fuselage, pipe, brakes -- */
  function addBody(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, BODY, 40), T.body));
    /* the afterburner nozzle: a heat-darkened lip ring proud of the skin,
       the dark pipe inside, and the flame-holder ring deep in it (A, J) */
    g.add(new THREE.Mesh(loft(THREE, [
      O(-3.40, 0.392, PIPE_Z), O(-3.56, PIPE_R, PIPE_Z), O(-3.60, PIPE_R - 0.03, PIPE_Z),
      O(-3.50, PIPE_R - 0.05, PIPE_Z)], 32), T.hot));
    xtube(g, T.ink, PIPE_R - 0.05, PIPE_R - 0.10, -3.50, -2.70, 0, PIPE_Z, 28, true);
    var fh = add(g, new THREE.TorusGeometry(0.20, 0.025, 6, 22), T.hot, -3.05, 0, PIPE_Z);
    fh.rotation.y = HALF_PI;
    add(g, new THREE.CylinderGeometry(0.10, 0.14, 0.30, 14), T.hot, -2.95, 0, PIPE_Z).rotation.z = HALF_PI;
    /* the two airbrakes, closed: curved plates 12 mm proud of the rear
       fuselage either side, hinged at their front edge (A, J) */
    for (var s = -1; s <= 1; s += 2) {
      var ab = new THREE.Mesh(new THREE.CylinderGeometry(0.462, 0.575, 0.70, 10, 1, true,
        s > 0 ? 55 * D2R : 235 * D2R, 70 * D2R), T.body);
      ab.rotation.z = HALF_PI;
      ab.position.set(-3.07, 0, 0.065);
      g.add(ab);
      /* the plate wears the sheet where the fuselage outline is painted:
         u from its x, v from its angle round the axis (port 0, top 0.25) */
      var pa = ab.geometry.attributes.position, ua = ab.geometry.attributes.uv;
      for (var j = 0; j < pa.count; j++)
        ua.setXY(j, bu(-3.07 - pa.getY(j)), Math.atan2(pa.getZ(j), pa.getX(j)) / (2 * PI));
      /* the jack fairing ahead of each brake */
      g.add(new THREE.Mesh(loft(THREE, [
        O(-2.30, 0.01, 0.06, s * 0.600), O(-2.45, 0.05, 0.06, s * 0.590),
        O(-2.70, 0.055, 0.06, s * 0.570), O(-2.74, 0.01, 0.06, s * 0.568)], 10, true), T.body));
    }
    /* wing-root fillets: the fuselage side swells where the wing meets it
       (D plan: 1.39 m across at the root against 1.30 ahead of it) */
    for (s = -1; s <= 1; s += 2) {
      g.add(new THREE.Mesh(loft(THREE, [
        { x: 3.85, yc: s * 0.66, w: 0.02, zt: WZ + 0.03, zb: WZ - 0.03, zw: WZ },
        { x: 3.40, yc: s * 0.68, w: 0.08, zt: WZ + 0.14, zb: WZ - 0.14, zw: WZ, e: 0.9 },
        { x: 1.80, yc: s * 0.70, w: 0.08, zt: WZ + 0.15, zb: WZ - 0.15, zw: WZ, e: 0.9 },
        { x: 0.30, yc: s * 0.69, w: 0.06, zt: WZ + 0.10, zb: WZ - 0.10, zw: WZ, e: 0.9 },
        { x: 0.05, yc: s * 0.68, w: 0.02, zt: WZ + 0.03, zb: WZ - 0.03, zw: WZ },
      ], 12, true), T.body));
    }
  }

  /* ---------------------------------------------- intake and splitter ----
     The lip is a rolled ring 0.94 m outside (D plan, H); inside it a dark
     duct and the vertical splitter set back about 0.25 m (D head-on: the
     centre bar; H: the divider deep in the duct). */
  function addIntake(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, [
      S(5.30, 0.395, -0.385, 0.415, 0.005), S(5.45, 0.405, -0.395, 0.425, 0.005),
      S(5.495, 0.425, -0.410, 0.448, 0.008), S(5.47, 0.445, -0.425, 0.468, 0.010)], 40, true), T.body));
    /* the duct's bright first half-metre (H shows bare metal well inside
       the lip), then dark */
    g.add(new THREE.Mesh(loft(THREE, [
      S(5.30, 0.395, -0.385, 0.415, 0.005), S(4.85, 0.372, -0.362, 0.380, 0.005)], 32, true), T.body));
    g.add(new THREE.Mesh(loft(THREE, [
      S(4.85, 0.372, -0.362, 0.380, 0.005), S(4.60, 0.360, -0.350, 0.360, 0.005),
      S(4.10, 0.330, -0.330, 0.320, 0.005), S(4.08, 0.01, -0.01, 0.01, 0.005)], 32), T.ink));
    /* the splitter: a thin plate on the centreline, its front edge rounded */
    add(g, new THREE.BoxGeometry(1.00, 0.035, 0.70), T.metal, 4.70, 0, 0.005);
    add(g, new THREE.CylinderGeometry(0.022, 0.022, 0.70, 8), T.metal, 5.20, 0, 0.005).rotation.x = HALF_PI;
    /* the small fitting on the top of the lip (H, Z) */
    g.add(new THREE.Mesh(loft(THREE, [
      O(5.52, 0.012, 0.475), O(5.49, 0.040, 0.468), O(5.35, 0.048, 0.468), O(5.10, 0.03, 0.50),
      O(4.95, 0.008, 0.51)], 12, true), T.body));
    add(g, new THREE.CylinderGeometry(0.018, 0.018, 0.02, 10), T.ink, 5.525, 0, 0.475).rotation.z = HALF_PI;
  }

  /* --------------------------------------------------------- the guns ----
     The tray fairing under the nose from x 5.00 back to 1.70, its belly at
     -0.74 (D side). N-37D starboard, muzzle brake reaching x 5.32 (Z, D);
     two NR-23 port, stacked, muzzles at 5.02 and 4.88 (G). */
  function addGuns(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, [
      S(5.02, -0.50, -0.58, 0.14, -0.54, 0.9), S(4.90, -0.46, -0.68, 0.26, -0.58, 0.85),
      S(4.50, -0.44, -0.735, 0.34, -0.60, 0.80), S(3.40, -0.44, -0.745, 0.37, -0.60, 0.80),
      S(2.40, -0.44, -0.74, 0.36, -0.60, 0.80), S(1.90, -0.44, -0.71, 0.30, -0.58, 0.85),
      S(1.60, -0.48, -0.62, 0.12, -0.55, 0.9)], 22, true), T.body));
    /* N-37D: barrel out of a ribbed fairing, slotted brake at the muzzle */
    g.add(new THREE.Mesh(loft(THREE, [
      O(4.95, 0.040, -0.64, -0.24), O(4.70, 0.075, -0.64, -0.24), O(4.10, 0.085, -0.64, -0.24),
      O(3.80, 0.02, -0.62, -0.24)], 12, true), T.body));
    xtube(g, T.ink, 0.042, 0.042, 5.05, 4.85, -0.24, -0.64, 12);
    xtube(g, T.ink, 0.068, 0.068, 5.32, 5.05, -0.24, -0.64, 14);
    for (var k = 0; k < 3; k++) add(g, new THREE.BoxGeometry(0.035, 0.145, 0.02), T.metal, 5.11 + k * 0.07, -0.24, -0.64);
    /* the NR-23 pair: the upper one inboard, both long thin barrels (G) */
    var NR = [[0.20, -0.60, 5.02, 4.55], [0.30, -0.67, 4.88, 4.20]];
    for (var n = 0; n < 2; n++) {
      var q = NR[n];
      g.add(new THREE.Mesh(loft(THREE, [
        O(q[3], 0.022, q[1], q[0]), O(q[3] - 0.10, 0.055, q[1], q[0]), O(q[3] - 0.80, 0.060, q[1], q[0]),
        O(q[3] - 1.10, 0.015, q[1] + 0.02, q[0])], 12, true), T.body));
      xtube(g, T.ink, 0.030, 0.030, q[2], q[3] - 0.02, q[0], q[1], 10);
    }
  }

  /* ---------------------------------------------------- canopy, cockpit -- */
  function addCockpit(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, CANOPY, 28), T.glass));
    /* coaming, the gunsight head, seat and headrest seen through the glass */
    add(g, new THREE.BoxGeometry(0.30, 0.48, 0.16), T.ink, 3.68, 0, 0.67);
    add(g, new THREE.BoxGeometry(0.10, 0.10, 0.14), T.metal, 3.74, 0, 0.80);
    add(g, new THREE.BoxGeometry(0.40, 0.44, 0.28), T.ink, 3.05, 0, 0.73);
    add(g, new THREE.BoxGeometry(0.14, 0.30, 0.20), T.ink, 2.95, 0, 0.86);
    /* windscreen frame: the arch at x 3.75 and the two posts of the flat
       front panel (H); the hood's front bow just behind it; the sills */
    var arch = add(g, new THREE.TorusGeometry(0.315, 0.022, 5, 20, PI), T.metal, 3.76, 0, 0.705);
    arch.rotation.set(HALF_PI, HALF_PI, 0);
    arch.scale.set(1.07, 1.24, 1.0);
    var bow = add(g, new THREE.TorusGeometry(0.33, 0.018, 5, 20, PI), T.metal, 3.62, 0, 0.67);
    bow.rotation.set(HALF_PI, HALF_PI, 0);
    bow.scale.set(1.03, 1.30, 1.0);
    for (var s = -1; s <= 1; s += 2) {
      rod(g, T.metal, 0.016, [4.15, s * 0.11, 0.70], [3.77, s * 0.15, 1.08]);
      add(g, new THREE.BoxGeometry(1.15, 0.035, 0.05), T.metal, 3.18, s * 0.335, 0.66);
    }
    /* the hood's rear seal where it meets the fixed fairing */
    var rs = add(g, new THREE.TorusGeometry(0.24, 0.016, 4, 16, PI), T.metal, 2.50, 0, 0.70);
    rs.rotation.set(HALF_PI, HALF_PI, 0);
    rs.scale.set(1.0, 0.62, 1.0);
    /* masts: slanted aft and outboard to port behind the hood (D side and
       head-on, Z), and the short one on the spine at x 0.73 (D side) */
    rod(g, T.metal, 0.014, [2.36, 0.10, 0.74], [2.08, 0.26, 1.14], 5);
    rod(g, T.metal, 0.012, [0.73, 0, 0.70], [0.70, 0, 1.03], 5);
  }

  /* -------------------------------------------------------------- wings -- */
  function addWings(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    var st = wingStations();
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, mirror: true }), T.wing));
    /* three fences a side (D head-on: 1.33, 2.72, 3.39 m); each wraps the
       leading edge, rises 0.17 m over the skin, and runs to 0.9 of the
       chord, the outer one to 0.65 (T) */
    var FY = [[1.33, 0.92], [2.72, 0.90], [3.39, 0.66]];
    for (var s = -1; s <= 1; s += 2) {
      for (var f = 0; f < FY.length; f++) {
        var y = FY[f][0], run = FY[f][1];
        var le = lerpTab(WING, y, 1), te = lerpTab(WING, y, 2), c = le - te, t = c * wtc(y), h = wz(y);
        var shp = new THREE.Shape(), N = 10, i, xc;
        shp.moveTo(le + 0.04, h - t * 0.30);
        for (i = 0; i <= N; i++) {
          xc = run * i / N;
          var rise = 0.17 * Math.min(1, (xc + 0.02) / 0.18) * (xc > run - 0.08 ? Math.max(0.35, (run - xc) / 0.08) : 1);
          shp.lineTo(le - xc * c, h + t * 0.5 * foil(xc) + rise);
        }
        shp.lineTo(le - run * c, h + t * 0.5 * foil(run) - 0.01);
        for (i = N; i >= 0; i--) {
          xc = run * i / N;
          shp.lineTo(le - xc * c, h + t * 0.5 * foil(xc) - 0.02);
        }
        shp.lineTo(le + 0.04, h - t * 0.30);
        var fg = new THREE.ShapeGeometry(shp);
        fg.rotateX(HALF_PI);
        var fm = add(g, fg, T.wing, 0, s * y, 0);
        fm.rotation.x = 0;
        /* give the plate a little thickness: a twin 2 cm inboard */
        var fg2 = fg.clone();
        add(g, fg2, T.wing, 0, s * (y - 0.02), 0);
        /* fences take their UVs from shape space: pin them to a clean patch */
        [fg, fg2].forEach(function (q) {
          var u = q.attributes.uv;
          for (var j = 0; j < u.count; j++) u.setXY(j, 0.5, 0.95);
        });
      }
    }
  }

  /* ----------------------------------------------- fin and tailplane ---- */
  function addTail(THREE, g, T) {
    var fs = [];
    for (var i = 0; i < FIN.length; i++) {
      var z = FIN[i][0], le = FIN[i][1], te = FIN[i][2];
      fs.push({ s: z, le: le, te: te, t: Math.max(0.05, (le - te) * 0.065), h: 0 });
    }
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: FX0, x1: FX1, s0: 2 * FZ0 - FZ1, s1: FZ1 } }), T.fin));
    var ts = [];
    for (i = 0; i < TAIL.length; i++) {
      var y = TAIL[i][0], l2 = TAIL[i][1], t2 = TAIL[i][2];
      ts.push({ s: y, le: l2, te: t2, t: (l2 - t2) * 0.08, h: TAIL_Z });
    }
    var TB = { x0: FX0, x1: FX1, s0: 0, s1: TS1 };
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB }), T.fin));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, mirror: true }), T.fin));
    /* the bullet fairing where the tailplane spar crosses the fin (J) */
    g.add(new THREE.Mesh(loft(THREE, [
      O(-3.95, 0.01, TAIL_Z), O(-4.15, 0.07, TAIL_Z), O(-4.90, 0.075, TAIL_Z), O(-5.35, 0.04, TAIL_Z),
      O(-5.55, 0.01, TAIL_Z)], 12), T.fin));
  }

  /* --------------------------------------------------------------- gear --
     Main legs in the wings at x 0.65, wheels on a 3.85 m track, retracting
     inward into the roots; the nose leg at x 4.02 (3.37 m wheelbase, as
     published), retracting forward under the cockpit. Tyres touch -1.25. */
  function addGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 4.02, nr = 0.24, nz = GROUND + nr;
    rod(gr, T.metal, 0.045, [3.98, 0, -0.62], [NX, 0, nz + 0.10], 8);
    rod(gr, T.metal, 0.028, [3.60, 0, -0.66], [NX - 0.02, 0, nz + 0.28], 6);
    for (var f = -1; f <= 1; f += 2)
      add(gr, new THREE.BoxGeometry(0.10, 0.03, 0.34), T.metal, NX + 0.02, f * 0.12, nz + 0.12);
    add(gr, new THREE.CylinderGeometry(nr, nr, 0.18, 18), T.ink, NX, 0, nz);
    add(gr, new THREE.CylinderGeometry(0.12, 0.12, 0.19, 10), T.metal, NX, 0, nz);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(0.80, 0.025, 0.32)), T.body, 3.75, d * 0.24, -0.82);
      nd.rotation.x = d * 0.30;
    }
    var MX = 0.65, mr = 0.31, mz = GROUND + mr, MY = 1.925, LY = 1.80;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.055, [MX + 0.05, s * LY, wz(LY) - 0.05], [MX, s * LY, mz + 0.06], 8);
      rod(gr, T.metal, 0.030, [MX + 0.55, s * 1.25, wz(1.25) - 0.08], [MX + 0.02, s * LY, mz + 0.42], 6);
      rod(gr, T.metal, 0.040, [MX, s * LY, mz], [MX, s * (MY - 0.05), mz], 6);
      add(gr, new THREE.CylinderGeometry(mr, mr, 0.17, 20), T.ink, MX, s * MY, mz);
      add(gr, new THREE.CylinderGeometry(0.16, 0.16, 0.18, 12), T.metal, MX, s * MY, mz);
      /* the leg door outboard of the strut (J) */
      add(gr, pinUV(new THREE.BoxGeometry(0.70, 0.025, 0.78)), T.body, MX + 0.02, s * (LY + 0.08), -0.62);
      /* the inner wheel-well door hanging below the root */
      var bd = add(gr, pinUV(new THREE.BoxGeometry(1.00, 0.025, 0.42)), T.body, 1.45, s * 0.98, -0.36);
      bd.rotation.x = s * 0.25;
    }
  }

  /* --------------------------------------------------------- team flash --
     Modest and exactly C.team: a chordwise band over each upper wing
     outboard of the outer fence, 2 cm proud so it never fights the skin. */
  function addTeam(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 }, band = [];
    [3.75, 4.05].forEach(function (y) {
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

  return { build: build, plain: function (THREE, M, C) { return build(THREE, M, C, true); } };
})();

/* len: the measured X extent, the lip fitting (5.535) to the tailplane
   tip (-5.74) */
UNIT_MODELS["pact_e50_fighter"] = {
  len: 11.27,
  build: function (THREE, M, C) { return HeroMiG17.build(THREE, M, C); },
};

/* The PLA's Shenyang J-5 is the MiG-17F built under licence (from 1956), so it takes
   this airframe whole.  Drawn plain: the Soviet fin star is left off and the PLAAF
   star-and-bars insignia is not drawn (no reference fetched for it; the house rule of
   the KPA rows, which drop the stars on their Soviet-built airframes). */
UNIT_MODELS["pla_e50_fighter"] = { len: 11.27, build: HeroMiG17.plain };
