/* ============================================================================
   lha_n_america.js -- HERO model: USS America (LHA-6), America class,
   Flight 0 (no well deck), as in service from 2014. Registered as lha_n.

   References, all read at known scale and named so the next person can
   check them (Wikimedia Commons unless said otherwise):
     - "World Navy Aircraft carries chart.svg": the America's PLAN, an
       orthographic top view drawn to the published 257 m. Every station
       along the ship comes from a metre grid laid over it: the deck ends,
       the two lifts, the island's blocks, both stack tops and the domes.
     - "Stbd side view of USS America (LHA-6) in August 2014": broadside
       from starboard, a little aft of abeam. Deck height, the island's
       tiers and both masts, the raked transom, the bow overhang, the
       starboard lift and the hangar openings under it, the gallery of
       life-raft canisters, the boat recess and the forward sponson drum.
     - "USSAmericaByPhilKonstantin": high port broadside. The island's
       inboard face and window bands, the port gallery.
     - "Overhead view of USS America (LHA-6) in August 2014": what sits
       where across the deck: the stack tops on the island's outboard edge
       with their D-shaped grilles, the masts inboard of them, the domes,
       the lift outlines, the yellow line-up line and the spot marks. It is
       oblique (tall things lean aft), so it gives no stations of its own.
     - "Bow view of USS America (LHA-6) in August 2014": the island's
       forward face, both masts end-on, the lifts as thin plates standing
       out either side, the domed drum on the starboard forward sponson.
     - "USS America (LHA-6) off Pascagoula in 2013": port bow quarter. The
       flared V bow and its strakes, the deep vertical face under the bow
       end of the flight deck, the anchors, the port sponsons on their
       knees and the domed drum on the port quarter.
     - "USS America (LHA 6) launching a RIM-116 Rolling Airframe Missile"
       (24 Jan 2023): the Mk 49 RAM box on a deckhouse roof at the
       island's forward end, the starboard catwalk below it.
     - "CWIS maintenance 141005-N-MD297-024" (Oct 2014): her Phalanx is the
       Block 1B, the tall grey radome drum on the gun.
   Published figures: 257.3 m (844 ft) long, 32.3 m (106 ft) waterline
   beam, 7.9 m (26 ft) draught (en.wikipedia infobox); flight deck 36.0 m
   (118 ft, US Navy brochure). Deck height ~20 m is measured on the
   starboard broadside (82 px of side against 1,067 px of ship), not
   published. Sensors per the same infobox: SPS-48E, SPS-49(V)1, SPQ-9B,
   SPN-43C.

   RECOGNITION LIST (what has to read at game zoom, and where it comes from)
     1. A long flat-top with a SQUARED TRANSOM, raked, and no well-deck
        gate (starboard broadside, Pascagoula).
     2. A big FLARED V BOW under a flight deck that runs out square to the
        bow, with a deep vertical face under its forward end (Pascagoula,
        bow view).
     3. The ISLAND set from 0.30 to 0.64 of the length from the stern on
        the starboard edge, 88 m long, stepped down at both ends (plan,
        starboard broadside).
     4. TWO raked EXHAUST STACKS on the island's outboard side with dark
        grilles on top (overhead, starboard broadside, bow view).
     5. TWO MASTS: a lattice forward mast carrying the tilted SPS-48E
        planar array, and a taller pole mast aft with two yards and a
        masthead dome (starboard broadside, bow view, Pascagoula).
     6. The SPS-49 MESH reflector aft of the after mast (starboard broadside).
     7. TWO DECK-EDGE LIFTS standing out from the deck: one to starboard
        right aft, one to port abaft the island's after end, each over a
        dark hangar opening (plan, overhead, starboard broadside).
     8. SATCOM DOMES clustered on the island and on the gallery sponsons
        (overhead, starboard broadside).
     9. A continuous GALLERY of white LIFE-RAFT CANISTERS under both deck
        edges, catwalks and nets (every broadside).
    10. Sponsons on knee braces, two of them carrying the PHALANX drums:
        starboard forward and port aft (bow view, Pascagoula, overhead).
    11. The YELLOW LINE-UP LINE a quarter in from the port edge with the
        white spot marks across it, and the dashed foul line inboard of
        the island (overhead).
    12. RAM on the island's forward deckhouse (RAM launch photograph).

   What is not drawn, because no reference here resolves it: the two Mk 29
   ESSM launchers, the second RAM, the 25 mm Mk 38 mounts, the .50 cal
   tubs and the SPQ-9B and SPN-43 aerials. The hull number, name and
   ensign are left off by the house rule.

   Model space: +X bow, +Y port, +Z up, metres. Waterline at z = 0, keel
   -7.9, flight deck 20.0. render3d scales by the X extent, which is the
   257.3 m from the stern gallery (-128.65) to the bow end of the flight
   deck (+128.65): nothing reaches past either.

   Every static part is merged into ONE mesh per material (ten). Nothing is
   named "turret". The team colour is exactly C.team: two thin flashes on
   the deck ends and a narrow band round the head of the island's base
   block. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAmericaLHA = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 257.3;
  var XB     = 128.65;             /* bow end of the flight deck                */
  var XS     = -128.65;            /* after edge of the stern gallery           */
  var XD0    = -122.0;             /* after edge of the flight deck (plan)      */
  var FD_TOP = 20.0;               /* est.: starboard broadside                  */
  var FD_TH  = 1.2;
  var FD_BOT = FD_TOP - FD_TH;     /* 18.8: gallery deck, top of the hull loft   */
  var KEEL   = -7.9;               /* 26 ft draught                              */
  var KNUCK  = 9.5;                /* hangar deck                                */
  var DHW    = 18.0;               /* flight deck half width, 118 ft             */

  /* ------------------------------------------------------ the deck outline
     Plan view, read off the chart's plan on a metre grid: the flight deck
     ends square at the bow with small chamfers, and at the stern at x -122
     with larger ones; the stern gallery below runs on to -128.65. The lifts
     stand OUTSIDE the deck edge, the way deck-edge lifts do; each sits in a
     shallow notch 1.5 m into the deck, its inboard edge.                    */
  var LIFTS = [
    { x0: -102.0, x1: -88.0, y0: -28.5, y1: -16.5, s: -1 },    /* starboard aft   */
    { x0:  -70.0, x1: -55.0, y0:  16.5, y1:  28.5, s:  1 },    /* port            */
  ];
  var DECK = [
    [ XB, -16.9], [ XB, 16.9], [ XB - 1.1, DHW],
    [ -55.0, DHW], [ -55.0, 16.5], [ -70.0, 16.5], [ -70.0, DHW],
    [ XD0 + 3.2, DHW], [ XD0, DHW - 2.6],
    [ XD0, -DHW + 3.4], [ XD0 + 4.0, -DHW],
    [ -102.0, -DHW], [ -102.0, -16.5], [ -88.0, -16.5], [ -88.0, -DHW],
    [ XB - 1.1, -DHW],
  ];

  /* ------------------------------------------------- the island, in plan
     Off the chart's plan: x -52 .. +36 for the island proper and a low
     deckhouse on to +43; its outboard face stands a hand outside the deck
     edge over the gallery, its inboard face 14 m in.                       */
  var ISL = {
    aft:   [[-52.0, -15.8], [-49.6, -8.0], [-40.0, -8.0], [-40.0, -18.4], [-50.0, -18.4]],
    main:  [[-40.0, -18.6], [-40.0, -4.4], [16.0, -4.4], [16.0, -18.6]],
    fwd:   [[16.0, -18.6], [16.0, -5.2], [33.6, -5.2], [36.0, -7.6], [36.0, -18.6]],
    low:   [[36.0, -18.0], [36.0, -9.2], [40.2, -9.2], [43.0, -12.0], [43.0, -18.0]],
  };
  var Z0 = FD_TOP;

  /* ================================================================ helpers */
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function Batch() { this.p = []; this.n = []; this.u = []; }
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    for (var i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
      if (U) this.u.push(U.getX(i), U.getY(i)); else this.u.push(0, 0);
    }
    return this;
  };
  Batch.addGroups = function (geo, batches) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var groups = g.groups.length ? g.groups : [{ start: 0, count: P.count, materialIndex: 0 }];
    groups.forEach(function (gr) {
      var B = batches[gr.materialIndex] || batches[0];
      for (var i = gr.start; i < gr.start + gr.count; i++) {
        B.p.push(P.getX(i), P.getY(i), P.getZ(i));
        B.n.push(N.getX(i), N.getY(i), N.getZ(i));
        if (U) B.u.push(U.getX(i), U.getY(i)); else B.u.push(0, 0);
      }
    });
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    return new THREE.Mesh(g, mtl);
  };

  var _o = null;
  function place(THREE, geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }
  function box(THREE, lx, ly, lz, x, y, z, rx, ry, rz) {
    return place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz);
  }
  function cylZ(THREE, rt, rb, h, seg, x, y, z0) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  var _v0 = null, _v1 = null;
  function strut(THREE, ax, ay, az, bx, by, bz, r, seg, r2) {
    if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 5, 1);
    var q = new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize());
    g.applyQuaternion(q);
    g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    return g;
  }
  function sphere(THREE, r, ws, hs, x, y, z, sx, sy, sz, half) {
    var g = new THREE.SphereGeometry(r, ws, hs, 0, PI * 2, 0, half ? PI * 0.5 : PI);
    g.rotateX(PI / 2);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(THREE, g, x, y, z);
  }
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) { var p = pts[i], q = pts[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* A closed frustum on a convex plan: the bottom outline at zb, the same
     outline scaled by sTop about its centroid at zt, so every face of a
     block leans inboard as the island's do. UVs in metres / 16.          */
  function frustum(THREE, pts, zb, zt, sBot, sTop, noCaps) {
    pts = ccw(pts);
    var n = pts.length, cx = 0, cy = 0, i;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    var B = [], T = [];
    for (i = 0; i < n; i++) {
      B.push([cx + (pts[i][0] - cx) * sBot, cy + (pts[i][1] - cy) * sBot]);
      T.push([cx + (pts[i][0] - cx) * sTop, cy + (pts[i][1] - cy) * sTop]);
    }
    var pos = [], uv = [], per = 0, K = 1 / 16;
    function tri(a, b, c, ua, ub, uc) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      uv.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      var b0 = [B[i][0], B[i][1], zb], b1 = [B[j][0], B[j][1], zb];
      var t0 = [T[i][0], T[i][1], zt], t1 = [T[j][0], T[j][1], zt];
      var L = Math.sqrt((B[j][0] - B[i][0]) * (B[j][0] - B[i][0]) + (B[j][1] - B[i][1]) * (B[j][1] - B[i][1]));
      var u0 = per * K, u1 = (per + L) * K; per += L;
      tri(b0, b1, t1, [u0, zb * K], [u1, zb * K], [u1, zt * K]);
      tri(b0, t1, t0, [u0, zb * K], [u1, zt * K], [u0, zt * K]);
    }
    for (i = 1; i < n - 1 && !noCaps; i++) {
      tri([T[0][0], T[0][1], zt], [T[i][0], T[i][1], zt], [T[i + 1][0], T[i + 1][1], zt],
          [T[0][0] * K, T[0][1] * K], [T[i][0] * K, T[i][1] * K], [T[i + 1][0] * K, T[i + 1][1] * K]);
      tri([B[0][0], B[0][1], zb], [B[i + 1][0], B[i + 1][1], zb], [B[i][0], B[i][1], zb],
          [B[0][0] * K, B[0][1] * K], [B[i + 1][0] * K, B[i + 1][1] * K], [B[i][0] * K, B[i][1] * K]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  /* an outline drawn in the XZ plane ([x, z]) and given th of thickness
     across Y: brackets, stack sides, knees                               */
  function vplate(THREE, pts, th) {
    var g = frustum(THREE, pts, -th * 0.5, th * 0.5, 1, 1);
    g.rotateX(PI / 2);
    return g;
  }
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }

  /* ================================================================== hull
     A STATION TABLE, lofted. Half-breadths at nine waterlines, measured off
     the broadsides and the Pascagoula bow quarter and fitted to the
     published 32.3 m waterline beam and the 36 m deck: a flat bottom with
     a tight bilge, sides that stand nearly straight to the hangar deck and
     then lean out to the gallery deck, a long fine entrance under a hard
     V flare forward that opens out, above the hawse, into a broad flat
     face right across under the bow end of the deck (Pascagoula), and a run that lifts to a raked transom whose lower
     edge sits just above the waterline, 9 m forward of its top. A level
     below the station's keel (null) folds onto the keel line, so the run
     and the forefoot turn up in a chine and the raked transom is simply
     the underside of the last stations.                                    */
  var ZL = [-7.9, -7.3, -6.0, -3.5, 0.0, 4.0, KNUCK, 14.0, FD_BOT];
  var ST = [
    /*  x       keel    -7.9   -7.3   -6.0   -3.5    0.0    4.0    9.5   14.0   18.8 */
    [-126.0,  17.80, [null,  null,  null,  null,  null,  null,  null,  null, 17.20]],
    [-123.0,  12.70, [null,  null,  null,  null,  null,  null,  null, 16.80, 17.40]],
    [-120.0,   6.60, [null,  null,  null,  null,  null,  null, 16.30, 17.00, 17.50]],
    [-117.0,   0.50, [null,  null,  null,  null,  null, 15.50, 16.40, 17.10, 17.60]],
    [-113.0,  -1.20, [null,  null,  null,  null, 14.80, 15.80, 16.50, 17.20, 17.60]],
    [-108.0,  -2.90, [null,  null,  null,  null, 15.20, 16.00, 16.60, 17.30, 17.60]],
    [-102.0,  -4.60, [null,  null,  null, 14.60, 15.60, 16.20, 16.70, 17.30, 17.60]],
    [ -95.0,  -6.00, [null,  null, 14.20, 15.40, 15.90, 16.25, 16.70, 17.30, 17.60]],
    [ -86.0,  -7.30, [null, 13.80, 15.30, 15.90, 16.10, 16.30, 16.70, 17.30, 17.60]],
    [ -75.0,  -7.90, [12.40, 14.80, 15.70, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [ -60.0,  -7.90, [12.60, 14.90, 15.80, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [ -30.0,  -7.90, [12.60, 14.90, 15.80, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [   0.0,  -7.90, [12.60, 14.90, 15.80, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [  30.0,  -7.90, [12.60, 14.90, 15.80, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [  60.0,  -7.90, [12.60, 14.90, 15.80, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [  75.0,  -7.90, [12.00, 14.56, 15.80, 16.10, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [  86.0,  -7.90, [ 9.86, 12.42, 14.66, 15.91, 16.15, 16.30, 16.70, 17.30, 17.60]],
    [  95.0,  -7.90, [ 6.77,  8.99, 11.74, 13.99, 15.49, 16.29, 16.70, 17.30, 17.60]],
    [ 102.0,  -7.90, [ 3.47,  5.19,  8.04, 10.81, 13.13, 15.08, 16.65, 17.30, 17.60]],
    [ 106.0,  -7.90, [ 1.20,  2.40,  4.40,  8.30, 10.90, 13.30, 15.60, 17.10, 17.60]],
    [ 109.5,  -7.30, [null,   0.60,  2.20,  5.80,  8.80, 11.80, 14.80, 16.90, 17.60]],
    [ 113.0,  -5.60, [null,   null,  null,  2.20,  5.20,  9.00, 13.20, 16.40, 17.60]],
    [ 117.0,  -1.40, [null,   null,  null,  null,  1.20,  4.60,  9.40, 14.20, 17.50]],
    [ 120.0,   3.60, [null,   null,  null,  null,  null,  0.80,  4.80, 11.00, 17.20]],
    [ 123.0,   9.50, [null,   null,  null,  null,  null,  null,  0.60,  6.40, 16.80]],
    [ 125.6,  15.50, [null,   null,  null,  null,  null,  null,  null,  null, 16.20]],
  ];
  var HX0 = ST[0][0], HX1 = ST[ST.length - 1][0];

  /* half-breadth of the station table at any x and level k, interpolated
     along the ship; null below the keel                                    */
  function hbAt(x, k) {
    var i = 1;
    while (i < ST.length - 1 && ST[i][0] < x) i++;
    var a = ST[i - 1], b = ST[i], t = clamp((x - a[0]) / (b[0] - a[0]), 0, 1);
    var va = a[2][k], vb = b[2][k];
    if (va === null && vb === null) return null;
    if (va === null) va = 0; if (vb === null) vb = 0;
    return lerp(va, vb, t);
  }

  /* ============================================================= textures */
  var PAINT = { hull: 0x737a81, sup: 0x7c848b, deck: 0x474c51 };

  function hullTex(THREE, zTop, zBot, H, seed, under) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z, len, gr;
    var PXZ = H / (zTop - zBot), PXX = W / (HX1 - HX0);
    function rowZ(zz) { return (zTop - zz) * PXZ; }
    function colX(xx) { return (xx - HX0) * PXX; }
    function band(za, zb, col) {
      var ya = rowZ(Math.min(za, zTop)), yb = rowZ(Math.max(zb, zBot));
      if (yb > ya) { g.fillStyle = col; g.fillRect(0, ya, W, yb - ya); }
    }
    function hline(zz) {
      if (zz <= zBot || zz >= zTop) return;
      y = rowZ(zz); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    band(zTop, zBot, under ? "#5e2d29" : hx(PAINT.hull));
    for (i = 0; i < 300; i++) {
      z = zBot + R() * (zTop - zBot);
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    /* boot topping: black from under the waterline to 1.6 m above it      */
    if (under) band(0, -0.8, "#17191c"); else band(1.6, 0, "#17191c");
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.3;
    for (i = 1; i < 64; i++) {
      x = i * W / 64 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(under ? -i * 1.8 : i * 2.2);
    if (!under) {
      /* the hangar-deck strake, catching the light                         */
      g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 3; hline(KNUCK);
      g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 2; hline(KNUCK - 0.35);
      /* the gallery's shadow band under the deck edge                       */
      g.fillStyle = "rgba(18,22,26,0.30)";
      g.fillRect(0, rowZ(FD_BOT), W, rowZ(FD_BOT - 1.6) - rowZ(FD_BOT));
      /* two rows of scuttles along the 02 and 03 levels, broken by the
         hangar openings, and the doors at the hangar deck: the broadsides  */
      g.fillStyle = "rgba(22,25,28,0.75)";
      for (x = -110; x < 108; x += 4.6) {
        if (x > -103 && x < -87) continue;
        g.fillRect(colX(x), rowZ(15.6), 0.7 * PXX, 0.55 * PXZ);
        if ((Math.round(x * 10) % 3) === 0) g.fillRect(colX(x + 2.0), rowZ(13.4), 0.7 * PXX, 0.55 * PXZ);
      }
      for (i = 0; i < 16; i++) {
        x = -96 + i * 13.0 + R() * 3;
        g.fillRect(colX(x), rowZ(KNUCK + 2.1), 1.2 * PXX, 2.0 * PXZ);
      }
      /* rust weeping from the scuppers                                      */
      for (i = 0; i < 60; i++) {
        x = R() * W; y = rowZ(3 + R() * 13); len = (2 + R() * 5) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.30)"); gr.addColorStop(1, "rgba(92,58,40,0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
      }
      /* draught marks forward and aft                                       */
      g.fillStyle = "rgba(236,238,240,0.9)";
      [112.0, -114.0].forEach(function (mx) {
        for (var k = 0; k < 6; k++) {
          var z2 = 0.4 + k * 1.0;
          if (z2 < zTop) g.fillRect(colX(mx), rowZ(z2) - 1, 7, 2);
        }
      });
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(6602), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.3;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
    }
    /* doors, vents and the odd scuttle stay in the paint                    */
    g.fillStyle = "rgba(20,22,25,0.45)";
    for (i = 0; i < 22; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    g.fillStyle = "rgba(20,22,25,0.6)";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, R() * H, 6, 6);
    for (i = 0; i < 40; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.20)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck
     One plan painting of the whole deck and both lifts, sampled through
     shape-space UVs in metres (repeat/offset below), so every line sits
     where the overhead puts it at no triangle cost.                         */
  var DX0 = -130, DX1 = 130, DY0 = -31, DY1 = 31;
  var LUL = 9.8;                    /* the yellow line-up line, y            */
  /* port-row spots (overhead), and the two starboard bird-foot spots       */
  var SPOTS = [-100.0, -68.0, -30.0, 4.0, 42.0, 84.0];
  var SPOTS_S = [60.0, 107.0];
  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(2014), i, p, q;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    function mline(a, b, wm, col, dash) {
      g.save();
      g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      if (dash) g.setLineDash([dash[0] * SX, dash[1] * SX]);
      g.beginPath(); g.moveTo(cx(a[0]), cy(a[1])); g.lineTo(cx(b[0]), cy(b[1])); g.stroke();
      g.restore();
    }
    function mrect(xa, ya, xb, yb, col) {
      g.fillStyle = col; g.fillRect(cx(xa), cy(yb), (xb - xa) * SX, (yb - ya) * SY);
    }
    /* non-skid, mottled, with tie-down pad-eyes and plating seams          */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 520; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 10 + R() * 46);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 4000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.30)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }
    /* the landing lane down the port side is scuffed darker by rotor wash
       and tyres, darkest round the spots                                    */
    mrect(-120, LUL - 7, 126, LUL + 6, "rgba(18,21,24,0.22)");
    g.fillStyle = "#0c0e10";
    for (i = 0; i < 360; i++) {
      var sx = SPOTS[Math.floor(R() * SPOTS.length)] + (R() - 0.5) * 18;
      g.globalAlpha = 0.06 + R() * 0.08;
      g.fillRect(cx(sx), cy(LUL + (R() - 0.5) * 9), (2 + R() * 6) * SX, 1.5 + R() * 2.5);
    }
    g.globalAlpha = 1;
    var WH = "#e6e9ea", YL = "#d0a23a";
    /* the yellow line-up line from the round-down to the bow, ending in a
       bar across at the bow, as the overhead shows                          */
    mline([XD0 + 2.5, LUL], [XB - 2.6, LUL], 0.9, YL);
    mline([XB - 2.6, 3.0], [XB - 2.6, 16.6], 0.9, YL);
    /* port-row spots: a white bar across the line and a diagonal tail
       running inboard and aft, and the dashes between them                 */
    SPOTS.forEach(function (sx) {
      mline([sx, LUL + 5.0], [sx, LUL - 9.0], 0.55, WH);
      mline([sx, LUL - 1.0], [sx + 5.5, LUL - 8.5], 0.55, WH);
      mline([sx + 9, LUL + 3.2], [sx + 14, LUL + 3.2], 0.55, WH);
    });
    /* the two bird-foot spots forward to starboard                          */
    SPOTS_S.forEach(function (sx) {
      var yc = -12.0;
      mline([sx, -2.6], [sx, -16.4], 0.55, WH);
      mline([sx, yc], [sx + 6.0, yc + 7.0], 0.55, WH);
      mline([sx - 4.5, yc + 4.5], [sx, yc], 0.55, WH);
      mline([sx, yc], [sx + 7.0, yc], 0.55, WH);
      mline([sx, yc + 1.0], [sx + 6.0, yc - 3.0], 0.55, WH);
      mline([sx + 11.0, yc], [sx + 15.0, yc], 0.55, WH);
    });
    /* the dashed foul line clear of the island, end to end                  */
    mline([XD0 + 3, -2.0], [XB - 3, -2.0], 0.35, WH, [2.6, 2.6]);
    /* deck-edge line all round                                             */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.75)"; g.lineWidth = Math.max(1.2, 0.5 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0]), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();
    /* lifts: an orange-and-white chequered safety border inside a dark
       joint, the outline every overhead shows                               */
    LIFTS.forEach(function (L) {
      mrect(L.x0, L.y0, L.x1, L.y1, "#43484d");
      g.save();
      g.strokeStyle = "rgba(214,120,40,0.95)"; g.lineWidth = Math.max(1.5, 0.45 * SY);
      g.setLineDash([1.4 * SX, 1.0 * SX]);
      g.strokeRect(cx(L.x0 + 0.7), cy(L.y1 - 0.7), (L.x1 - L.x0 - 1.4) * SX, (L.y1 - L.y0 - 1.4) * SY);
      g.restore();
      mline([L.x0, L.y0], [L.x0, L.y1], 0.25, "#0b0c0e");
      mline([L.x1, L.y0], [L.x1, L.y1], 0.25, "#0b0c0e");
      mline([L.x0, L.s > 0 ? L.y0 : L.y1], [L.x1, L.s > 0 ? L.y0 : L.y1], 0.25, "#0b0c0e");
      mline([L.x0 + 2.5, (L.y0 + L.y1) / 2], [L.x1 - 2.5, (L.y0 + L.y1) / 2], 0.3, "rgba(230,232,234,0.6)", [1.5, 1.5]);
    });
    /* the stern: a white round-down band, the bow a white edge bar          */
    mline([XD0 + 0.6, -14.5], [XD0 + 0.6, 15.4], 0.5, WH);
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      top:  hullTex(THREE, FD_BOT, 0, 256, 6601, false),
      bot:  hullTex(THREE, 0, KEEL, 128, 6602, true),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* one side's outline at a station, keel to gallery deck, as [y, z]      */
  function sideRing(x) {
    var out = [], zk, k, i = 1;
    while (i < ST.length - 1 && ST[i][0] < x) i++;
    var a = ST[i - 1], b = ST[i], t = clamp((x - a[0]) / (b[0] - a[0]), 0, 1);
    zk = lerp(a[1], b[1], t);
    var first = 0;
    while (first < ZL.length - 1 && (ZL[first] < zk - 1e-6 || hbAt(x, first) === null)) first++;
    var yFirst = hbAt(x, first) || 0;
    for (k = 0; k < ZL.length; k++) {
      var y = hbAt(x, k);
      if (k < first || y === null) out.push([0.8 * yFirst, zk]);
      else out.push([y, ZL[k]]);
    }
    return { pts: out, zk: zk };
  }

  function hullGeo(THREE) {
    var xs = [], i, j;
    ST.forEach(function (s) { xs.push(s[0]); });
    /* extra stations either side of each lift and through the midbody so
       the hangar openings and the shading come out clean                   */
    [-101.5, -88.5, -69.5, -55.5, -45, -15, 15, 45, 68, 80, 90, 98.5, 111, 115, 118.5, 121.5, 124.3].forEach(function (x) { xs.push(x); });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.2) st.push(xs[i]);
    var rings = [];
    for (i = 0; i < st.length; i++) {
      var R = sideRing(st[i]), P = R.pts, r = [];
      r.push([0, FD_BOT]);
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, R.zk]);
      for (j = 0; j < P.length; j++) r.push([-P[j][0], P[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
    var faces = [];
    function K(ii, jj) { return ii * nR + (jj % nR); }
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;
      ar = Math.sqrt(ar);
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [cxp, cyp, czp], u: [cxp / ar, cyp / ar, czp / ar] });
    }
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1));
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1));
      }
    }
    /* caps at both ends: the transom's top strip and the stem head, both
       under the deck overhang; fanned from their own centres               */
    [[0, 1], [st.length - 1, -1]].forEach(function (e) {
      var r0 = rings[e[0]], cyy = 0, czz = 0;
      for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
      var C = [st[e[0]], cyy / nR, czz / nR];
      for (j = 0; j < nR; j++) {
        if (e[1] > 0) tri(C, V(e[0], j), V(e[0], j + 1), -1, -2 - j, -2 - ((j + 1) % nR));
        else tri(C, V(e[0], j + 1), V(e[0], j), -9, -20 - ((j + 1) % nR), -20 - j);
      }
    });
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) { f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); }); });
    faces.forEach(function (f) {
      var o = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3 >= 0 ? OUT.top : OUT.bot;
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        around[f.k[c]].forEach(function (gi) {
          var g2 = faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        o.pos.push(q[0], q[1], q[2]);
        o.nrm.push(sx / l, sy / l, sz / l);
        o.uv.push(uOf(q[0]), clamp((q[2] - o.z0) / (o.z1 - o.z0), 0, 1));
      }
    });
    function geo(o) {
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(o.pos, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(o.nrm, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(o.uv, 2));
      return g;
    }
    return { top: geo(OUT.top), bot: geo(OUT.bot) };
  }
  /* the hull's half-breadth at (x, z), for fittings on the side          */
  function sideY(x, z) {
    var P = sideRing(x).pts, k;
    for (k = 1; k < P.length; k++) {
      if (z <= P[k][1]) {
        var t = (z - P[k - 1][1]) / Math.max(1e-6, P[k][1] - P[k - 1][1]);
        return lerp(P[k - 1][0], P[k][0], clamp(t, 0, 1));
      }
    }
    return P[P.length - 1][0];
  }

  /* ========================================================== weapons
     Built in their own frame, gun or launcher along +X, ring centre at the
     origin, then dropped into the batches at a heading.                    */
  function phalanxParts(THREE) {
    /* Block 1B: the tall radome drum over the gun, the FLIR box on its
       side, the six-barrel gun under the drum's front                     */
    return [
      ["S", cylZ(THREE, 1.0, 1.1, 0.8, 10, 0, 0, 0)],
      ["W", box(THREE, 1.7, 1.6, 1.2, -0.1, 0, 1.4)],
      ["W", cylZ(THREE, 0.78, 0.78, 1.9, 12, -0.3, 0, 2.0)],
      ["W", sphere(THREE, 0.78, 12, 4, -0.3, 0, 3.9, 1, 1, 0.75, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.17, 0.22, 2.2, 8).rotateZ(-PI / 2), 1.55, 0, 1.45)],
      ["K", box(THREE, 0.5, 0.36, 0.5, 0.35, 0.95, 2.4)],
    ];
  }
  /* Mk 49: the 21-round RAM box on its mount                                */
  function ramParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.85, 1.0, 0.9, 10, 0, 0, 0)],
      ["S", box(THREE, 1.4, 2.4, 1.0, 0, 0, 1.4)],
      ["W", box(THREE, 2.6, 1.7, 1.7, 0.4, 0, 2.5, 0, -0.18, 0)],
      ["K", box(THREE, 0.1, 1.45, 1.45, 1.72, 0, 2.74, 0, -0.18, 0)],
      ["S", box(THREE, 0.9, 0.35, 0.9, -0.6, 1.05, 2.2)],
      ["S", box(THREE, 0.9, 0.35, 0.9, -0.6, -1.05, 2.2)],
    ];
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j, s;
    var T = {}, TX = textures(THREE);
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.top, roughness: 0.86, metalness: 0.08 });
    T.U = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.bot, roughness: 0.90, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.87, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1f2327, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x40474e, roughness: 0.58, metalness: 0.22 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd7dbdd, roughness: 0.62, metalness: 0.04 });
    /* the team material, pulled a couple of depth steps toward the camera
       because its flashes lie on the deck within centimetres               */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0x4b8fe0),
                                           roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (k) { B[k] = new Batch(); });
    function emit(parts, x, y, z, hdg) {
      parts.forEach(function (pp) {
        place(THREE, pp[1], 0, 0, 0, 0, 0, hdg || 0);
        pp[1].translate(x, y, z);
        B[pp[0]].add(pp[1]);
      });
    }
    function ringRail(pts, z) {
      for (var k = 0; k < pts.length; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    /* a sponson: a deck plate, and under it a knee sweeping back in to the
       hull side, so it reads as carried and not stuck on                   */
    function bracket(top, bot, zt, zb) {
      var pos = [], uv = [], nn = top.length, k;
      for (k = 0; k < nn; k++) {
        var q = (k + 1) % nn;
        pos.push(bot[k][0], bot[k][1], zb, bot[q][0], bot[q][1], zb, top[q][0], top[q][1], zt);
        pos.push(bot[k][0], bot[k][1], zb, top[q][0], top[q][1], zt, top[k][0], top[k][1], zt);
        uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1);
      }
      for (k = 1; k < nn - 1; k++) {
        pos.push(bot[0][0], bot[0][1], zb, bot[k + 1][0], bot[k + 1][1], zb, bot[k][0], bot[k][1], zb);
        uv.push(0, 0, 1, 1, 0, 1);
      }
      var gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      gg.computeVertexNormals();
      return gg;
    }
    function sponson(x0, x1, side, out, ztop, depth) {
      var yin = side * 17.3, yo = side * (DHW + out);
      var pts = ccw([[x0, yin], [x1, yin], [x1 - 0.8, yo], [x0 + 0.8, yo]]);
      B.S.add(plate(THREE, pts, ztop - 0.5, ztop));
      var knee = pts.map(function (q) { return [q[0], side * lerp(17.0, Math.abs(q[1]), 0.2)]; });
      B.S.add(bracket(pts, knee, ztop - 0.5, ztop - 0.5 - depth));
      ringRail([[x0 + 0.8, yo], [x1 - 0.8, yo], [x1, yin + side * 0.6], [x0, yin + side * 0.6]], ztop + 1.0);
    }

    /* ------------------------------------------------------------- hull */
    var hg = hullGeo(THREE);
    B.H.add(hg.top);
    B.U.add(hg.bot);

    /* ------------------------------------------------------ flight deck */
    var shp = new THREE.Shape();
    shp.moveTo(DECK[0][0], DECK[0][1]);
    for (i = 1; i < DECK.length; i++) shp.lineTo(DECK[i][0], DECK[i][1]);
    shp.closePath();
    var dg = new THREE.ExtrudeGeometry(shp, { depth: FD_TH, bevelEnabled: false, curveSegments: 1 });
    dg.translate(0, 0, FD_BOT);
    Batch.addGroups(dg, [B.D, B.S]);
    /* the deck overhangs the hull aft of the transom top and forward of the
       stem head; the deep plated face under each end closes it: the bow
       photograph shows a light band some 3 m deep right across the bow    */
    B.S.add(plate(THREE, [[XB - 7.0, -17.4], [XB - 0.15, -16.6], [XB - 0.15, 16.6], [XB - 7.0, 17.4]], FD_BOT - 2.6, FD_BOT));
    B.K.add(box(THREE, 0.1, 30.0, 0.7, XB - 0.12, 0, FD_BOT - 1.9));
    /* the hawse at the stem head, and the anchors either side of the flare
       (Pascagoula)                                                          */
    B.K.add(place(THREE, new THREE.CylinderGeometry(0.85, 0.85, 0.3, 10).rotateZ(PI / 2), XB - 0.2, 0, FD_BOT - 1.0));
    for (s = -1; s <= 1; s += 2) {
      var ya = sideY(114.0, 9.0);
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.9, 0.9, 0.4, 10), 114.0, s * (ya + 0.1), 9.0, 0, 0, s * 0.5));
      B.M.add(box(THREE, 2.4, 0.5, 2.6, 113.4, s * (ya + 0.25), 7.4, 0, 0, s * 0.5));
    }
    /* the stern gallery under the after end of the deck, out to -128.65,
       railed, with its two light boxes on the overhead                     */
    B.S.add(plate(THREE, rect(XS, HX0 + 0.5, -15.0, 15.0), FD_BOT - 1.4, FD_BOT - 0.9));
    B.S.add(plate(THREE, rect(HX0 - 0.2, XD0 + 0.5, -16.8, 16.8), FD_BOT - 1.5, FD_BOT));
    ringRail([[XS + 0.1, -14.9], [XS + 0.1, 14.9], [HX0, 14.9], [HX0, -14.9]], FD_BOT - 0.0);
    B.W.add(box(THREE, 1.4, 1.8, 1.4, XS + 1.2, 3.2, FD_BOT - 0.2));
    B.W.add(box(THREE, 1.4, 1.8, 1.4, XS + 1.2, -3.2, FD_BOT - 0.2));
    B.G.add(box(THREE, 0.12, 22.0, 0.9, HX0 - 0.25, 0, FD_BOT - 3.0));

    /* ---------------------------------------------------------- lifts
       Raised to the flight deck, standing out from the edge: a slab with
       the deck painting, a frame under it, its guide trunks running down
       the hull side, and the dark hangar opening behind and below it.      */
    LIFTS.forEach(function (L) {
      var ls = new THREE.Shape();
      ls.moveTo(L.x0 + 0.1, L.y0); ls.lineTo(L.x1 - 0.1, L.y0); ls.lineTo(L.x1 - 0.1, L.y1); ls.lineTo(L.x0 + 0.1, L.y1);
      ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 1.0, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 1.0 + 0.02);
      Batch.addGroups(lg, [B.D, B.S]);
      var xm = (L.x0 + L.x1) * 0.5, len = L.x1 - L.x0, yo = L.s > 0 ? L.y1 : L.y0;
      /* the under-frame, deep along the outboard edge                       */
      B.M.add(box(THREE, len - 0.4, 0.4, 1.4, xm, yo - L.s * 0.3, FD_TOP - 1.7));
      B.M.add(box(THREE, len - 0.4, 0.3, 0.9, xm, (L.y0 + L.y1) * 0.5, FD_TOP - 1.4));
      /* the hangar opening, hangar deck to gallery                          */
      var yh = L.s * (sideY(xm, 13.0) + 0.04);
      B.K.add(box(THREE, len - 1.6, 0.2, FD_BOT - 1.0 - KNUCK, xm, yh, (FD_BOT - 1.0 + KNUCK) * 0.5));
      /* guide trunks either end, down to the hangar deck                    */
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.5 : L.x0 + 0.5;
        B.S.add(box(THREE, 1.0, 1.4, FD_TOP - 1.0 - KNUCK + 1.5, tx, yh + L.s * 0.6, (FD_TOP - 1.0 + KNUCK - 1.5) * 0.5));
      }
      /* a rail round the outboard edge                                       */
      B.M.add(box(THREE, len - 0.6, 0.07, 0.07, xm, yo - L.s * 0.1, FD_TOP + 0.95));
      for (j = 0; j <= 4; j++) B.M.add(box(THREE, 0.07, 0.07, 1.0, L.x0 + 0.4 + j * (len - 0.8) / 4, yo - L.s * 0.1, FD_TOP + 0.5));
    });

    /* -------------------- hull-side openings, the boat recess, the screws */
    /* starboard shell openings abaft the island and the RHIB in its
       recess under the island (starboard broadside)                         */
    [[-82.0, -71.0, 12.0, 16.4], [-48.0, -37.0, 12.4, 16.2]].forEach(function (o) {
      var xm = (o[0] + o[1]) * 0.5, yy = -(sideY(xm, (o[2] + o[3]) * 0.5) + 0.03);
      B.K.add(box(THREE, o[1] - o[0], 0.15, o[3] - o[2], xm, yy, (o[2] + o[3]) * 0.5));
    });
    var yb = -(sideY(-9.0, 7.5) + 0.03);
    B.K.add(box(THREE, 12.0, 0.15, 3.6, -9.0, yb, 7.6));
    B.W.add(place(THREE, new THREE.CylinderGeometry(0.75, 0.75, 9.0, 8).rotateZ(PI / 2).scale(1, 1, 0.9), -9.0, yb - 0.6, 6.9));
    B.K.add(box(THREE, 7.0, 1.5, 0.6, -9.6, yb - 0.6, 7.4));
    B.S.add(box(THREE, 2.2, 1.2, 0.9, -11.4, yb - 0.6, 7.9));
    /* bilge keels, screws, shafts, struts and the two rudders              */
    for (s = -1; s <= 1; s += 2) {
      B.U.add(box(THREE, 90.0, 0.3, 1.4, -5.0, s * 15.2, -6.9, s * 0.75, 0, 0));
      var sy = s * 8.0;
      B.M.add(strut(THREE, -70.0, sy * 0.7, -6.6, -104.0, sy, -4.2, 0.45, 6));
      B.M.add(strut(THREE, -100.5, sy, -4.4, -100.5, sy * 0.75, -1.3, 0.3, 4));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.5, 0.8, 1.6, 8).rotateZ(PI / 2), -105.0, sy, -4.2));
      for (j = 0; j < 5; j++) {
        var bl = new THREE.BoxGeometry(0.3, 1.3, 2.3);
        bl.translate(0, 0, 1.4);
        bl.rotateZ(0.4);
        bl.rotateX(j * 2 * PI / 5);
        bl.translate(-105.0, sy, -4.2);
        B.M.add(bl);
      }
      B.M.add(box(THREE, 5.2, 0.7, 5.4, -110.5, sy, -2.3));
    }

    /* ---------------------------- catwalks, nets and the life-raft gallery
       Along both deck edges outside the island and the lifts. The gallery's
       canisters are the continuous white row under the deck edge in every
       broadside: here a cradle of three every 6.5 m, ends turned outboard. */
    function edgeRun(x0, x1, side) {
      var L2 = x1 - x0, xm = (x0 + x1) * 0.5, y0 = side * DHW;
      B.S.add(box(THREE, L2, 1.5, 0.25, xm, y0 + side * 0.85, FD_TOP - 1.45));
      var net = new THREE.BoxGeometry(L2 - 0.4, 1.9, 0.08);
      net.rotateX(side * 0.21);
      net.translate(xm, y0 + side * 2.35, FD_TOP - 0.62);
      B.K.add(net);
      B.M.add(box(THREE, L2, 0.08, 0.08, xm, y0 + side * 1.55, FD_TOP - 0.3));
      var n3 = Math.floor(L2 / 6.5);
      for (var q = 0; q < n3; q++) {
        var cxq = x0 + (q + 0.5) * L2 / n3;
        B.S.add(box(THREE, 3.6, 1.6, 0.15, cxq, side * (DHW - 0.2), FD_TOP - 3.0));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.15, 6);
          can.translate(0, 0, 0);
          B.W.add(place(THREE, can, cxq + d3 * 1.15, side * (DHW + 0.05), FD_TOP - 2.35, 0, 0, 0));
        }
      }
    }
    /* port: bow to the port lift, and from the lift to the round-down       */
    edgeRun(-55.0, XB - 4.0, 1);
    edgeRun(XD0 + 4.0, -70.0, 1);
    /* starboard: forward of the island, and between the island and the
       lift; under the island the gallery carries the stacks' sponsons      */
    edgeRun(44.0, XB - 4.0, -1);
    edgeRun(-87.0, -53.0, -1);
    edgeRun(XD0 + 5.0, -103.0, -1);

    /* ----------------------------------------------------------- sponsons */
    var ZS = FD_TOP - 6.2;
    /* Phalanx drums: starboard forward (bow view, starboard broadside) and
       port aft (Pascagoula, overhead); each on a sponson on its knee       */
    sponson(18.0, 27.0, -1, 5.0, ZS, 4.0);
    emit(phalanxParts(THREE), 22.5, -21.4, ZS, -PI * 0.5);
    sponson(-86.0, -77.0, 1, 5.0, ZS, 4.0);
    emit(phalanxParts(THREE), -81.5, 21.4, ZS, PI * 0.5);
    /* the domes on the gallery sponsons: a big one and a small one to
       starboard under the island, two small ones to port (overhead)       */
    sponson(-36.0, -27.0, -1, 4.6, FD_TOP - 3.6, 3.0);
    B.S.add(cylZ(THREE, 1.4, 1.6, 1.4, 10, -31.5, -20.8, FD_TOP - 3.6));
    B.W.add(sphere(THREE, 2.3, 14, 8, -31.5, -20.8, FD_TOP - 1.6));
    sponson(-18.0, -12.0, -1, 3.6, FD_TOP - 3.2, 2.6);
    B.W.add(sphere(THREE, 1.3, 12, 6, -15.0, -20.3, FD_TOP - 2.4, 1, 1, 1, true));
    B.S.add(cylZ(THREE, 0.7, 0.8, 0.8, 8, -15.0, -20.3, FD_TOP - 3.2));
    [-46.0, -26.0].forEach(function (dx) {
      sponson(dx - 3.0, dx + 3.0, 1, 3.6, FD_TOP - 3.2, 2.6);
      B.S.add(cylZ(THREE, 0.7, 0.8, 0.8, 8, dx, 20.3, FD_TOP - 3.2));
      B.W.add(sphere(THREE, 1.25, 12, 6, dx, 20.3, FD_TOP - 2.4, 1, 1, 1, true));
    });
    /* two plain port sponsons forward on their knees (Pascagoula); what
       stands on them does not resolve, so nothing is put there            */
    [38.0, 5.0].forEach(function (dx) {
      sponson(dx - 3.5, dx + 3.5, 1, 3.4, FD_TOP - 3.2, 2.6);
    });

    /* ------------------------------------------------------------ island
       Heights above the deck off the starboard broadside, at 4.1 px a metre
       (its 82 px of side for 20 m): the after deckhouse 9.5 m; the base block
       11.5 m; the "6" block aft to 13; stack tops 17.0 and 17.6, raked down
       aft; the bridge tier 10.5-14.6 with its glass at 12.4-14.0; the forward
       mast's lattice to 26 m and its SPS-48E face 26.5-32; the after mast's
       platforms at 23.7 and 30.5, its pole to 40.6.                          */
    B.S.add(frustum(THREE, ISL.aft, Z0, Z0 + 9.5, 1.0, 0.985));
    B.S.add(frustum(THREE, ISL.main, Z0, Z0 + 11.5, 1.0, 0.992));
    B.S.add(frustum(THREE, ISL.fwd, Z0, Z0 + 10.5, 1.0, 0.99));
    B.S.add(frustum(THREE, ISL.low, Z0, Z0 + 6.0, 1.0, 0.98));
    /* the "6" block over the after end of the base, to 13 m                  */
    var SIX = [[-40.0, -18.4], [-40.0, -7.0], [-28.5, -7.0], [-28.5, -18.4]];
    B.S.add(frustum(THREE, SIX, Z0 + 11.5, Z0 + 13.0, 1.0, 0.99));
    /* window bands on the inboard face (port broadside) and the forward
       faces of the base block and the low deckhouse                          */
    B.G.add(box(THREE, 44.0, 0.2, 1.0, -12.0, -4.32, Z0 + 3.2));
    B.G.add(box(THREE, 14.0, 0.2, 1.0, 25.0, -5.12, Z0 + 3.2));
    B.G.add(box(THREE, 0.2, 9.0, 1.0, 36.05, -13.6, Z0 + 3.4));
    B.G.add(box(THREE, 0.2, 7.0, 0.9, 43.05, -15.0, Z0 + 3.4));
    /* pri-fly: the glazed bay on the inboard face at the after end, its
       windows canted out over the deck                                       */
    B.S.add(frustum(THREE, [[-38.5, -7.0], [-38.5, -4.4], [-30.0, -4.4], [-30.0, -7.0]], Z0 + 8.0, Z0 + 11.5, 1.0, 1.0));
    B.G.add(box(THREE, 8.0, 0.25, 2.2, -34.25, -4.3, Z0 + 9.8, 0.25, 0, 0));
    /* doors and ladders down the inboard face                                */
    for (j = 0; j < 8; j++) B.K.add(box(THREE, 1.2, 0.15, 2.1, -38.0 + j * 9.0, -4.36, Z0 + 1.05));
    /* balcony deck round the base block, railed                              */
    var bal = [[-39.6, -19.3], [-39.6, -3.7], [16.0, -3.7], [16.0, -19.3]];
    B.S.add(plate(THREE, bal, Z0 + 11.3, Z0 + 11.6));
    ringRail(scalePts(bal, 0.998), Z0 + 12.6);
    /* the bridge tier over the forward block: glass round the front and
       both sides under a visor, the wings out to both sides, and a small
       house on its roof                                                       */
    var BR = [[16.5, -18.4], [16.5, -5.6], [33.2, -5.6], [35.6, -8.0], [35.6, -18.4]];
    B.S.add(frustum(THREE, BR, Z0 + 10.5, Z0 + 12.4, 1.0, 1.0));
    B.G.add(frustum(THREE, BR, Z0 + 12.4, Z0 + 14.0, 0.992, 0.992));
    B.S.add(plate(THREE, scalePts(BR, 1.025), Z0 + 14.0, Z0 + 14.6));
    B.S.add(plate(THREE, rect(29.0, 33.0, -21.4, -3.0), Z0 + 12.1, Z0 + 12.4));
    ringRail(rect(29.1, 32.9, -21.3, -3.1), Z0 + 13.4);
    B.S.add(frustum(THREE, rect(18.5, 29.0, -16.4, -7.6), Z0 + 14.6, Z0 + 17.0, 1.0, 0.97));
    /* team band round the head of the base block, a band and no roof        */
    B.T.add(frustum(THREE, ISL.main, Z0 + 10.6, Z0 + 11.2, 1.004, 0.997, true));

    /* ------------------------------------------------- the exhaust stacks
       Two, on the island's outboard half, flush with its side: tops raked
       down aft, the after face raked too, the D-shaped grilles of the
       overhead let into the top, and the gas-turbine intake louvres low on
       the outboard face (the dark grids on the broadside).                   */
    [[-27.0, -12.0, 17.0, 15.8], [3.0, 17.5, 17.6, 16.4]].forEach(function (sk) {
      var xa = sk[0], xf = sk[1], hf = sk[2], ha = sk[3];
      var prof = [[xa, Z0 + 11.5], [xf, Z0 + 11.5], [xf, Z0 + hf], [xa + 3.0, Z0 + ha], [xa, Z0 + 13.2]];
      var sg = vplate(THREE, prof, 7.6);
      sg.translate(0, -14.8, 0);
      B.S.add(sg);
      var sl = (hf - ha) / (xf - xa - 3.0), gx0 = xa + 4.2, gx1 = xf - 1.0;
      var gzm = Z0 + ha + ((gx0 + gx1) * 0.5 - xa - 3.0) * sl;
      B.K.add(box(THREE, gx1 - gx0, 4.4, 0.12, (gx0 + gx1) * 0.5, -15.8, gzm - 0.04, 0, -Math.atan(sl), 0));
      B.M.add(box(THREE, 0.35, 7.6, 0.5, xf - 0.15, -14.8, Z0 + hf + 0.15));
      /* intake louvres on the outboard face, below the stack               */
      for (var lv = 0; lv < 2; lv++) {
        var lx = xa + 4.0 + lv * 4.6;
        B.K.add(box(THREE, 3.8, 0.3, 5.0, lx, -18.75, Z0 + 5.6));
        B.M.add(box(THREE, 0.16, 0.2, 5.0, lx, -18.95, Z0 + 5.6));
        B.M.add(box(THREE, 3.8, 0.2, 0.16, lx, -18.95, Z0 + 5.6));
      }
      B.M.add(strut(THREE, xf - 1.5, -18.75, Z0 + 11.5, xf - 1.5, -18.75, Z0 + hf - 0.4, 0.18, 5));
    });

    /* between the stacks the outboard face steps in round the foot of the
       lattice mast: a shadowed recess with its pipe runs (broadside)         */
    B.K.add(box(THREE, 13.0, 0.3, 6.5, -4.5, -18.62, Z0 + 7.6));
    for (j = 0; j < 4; j++)
      B.M.add(strut(THREE, -9.5 + j * 3.2, -18.85, Z0 + 4.4, -9.5 + j * 3.2, -18.85, Z0 + 11.0, 0.16, 5));
    B.S.add(box(THREE, 13.4, 0.6, 0.4, -4.5, -18.75, Z0 + 11.0));

    /* -------------------------------------------- the forward lattice mast
       Four legs off the roof between the stacks, inboard of them, a platform
       at 18 and 22.6, the SPS-48E planar array leaning back on top.          */
    var FX = 1.5, FY = -9.2, FZ0 = Z0 + 11.5, FZ1 = Z0 + 25.6;
    var legs = [[-1.9, -1.9], [1.9, -1.9], [1.9, 1.9], [-1.9, 1.9]];
    legs.forEach(function (l, k) {
      B.M.add(strut(THREE, FX + l[0], FY + l[1], FZ0, FX + l[0] * 0.45, FY + l[1] * 0.45, FZ1, 0.18, 5));
      var l2 = legs[(k + 1) % 4];
      for (var b2 = 0; b2 < 4; b2++) {
        var za = FZ0 + b2 * 3.5, zb = za + 3.5, fa = 1 - 0.55 * (za - FZ0) / (FZ1 - FZ0), fb = 1 - 0.55 * (zb - FZ0) / (FZ1 - FZ0);
        B.M.add(strut(THREE, FX + l[0] * fa, FY + l[1] * fa, za, FX + l2[0] * fb, FY + l2[1] * fb, zb, 0.07, 4));
      }
    });
    [[Z0 + 18.0, 3.4], [Z0 + 22.6, 2.6]].forEach(function (pl) {
      B.S.add(plate(THREE, rect(FX - pl[1], FX + pl[1], FY - pl[1], FY + pl[1]), pl[0] - 0.25, pl[0]));
      ringRail(rect(FX - pl[1] + 0.1, FX + pl[1] - 0.1, FY - pl[1] + 0.1, FY + pl[1] - 0.1), pl[0] + 1.0);
    });
    B.S.add(box(THREE, 1.4, 1.0, 1.6, FX + 1.8, FY - 2.4, Z0 + 18.8));
    B.S.add(box(THREE, 1.4, 1.0, 1.6, FX + 1.8, FY + 2.4, Z0 + 18.8));
    B.M.add(box(THREE, 0.4, 11.0, 0.35, FX, FY, Z0 + 23.2));
    for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, FX, FY + s * 5.0, Z0 + 23.2, FX, FY + s * 5.0, Z0 + 26.4, 0.05, 4));
    B.M.add(cylZ(THREE, 0.7, 0.9, 1.0, 8, FX, FY, FZ1 - 0.2));
    var arr = new THREE.BoxGeometry(0.5, 5.0, 5.4);
    arr.rotateY(-0.26);
    arr.translate(FX + 0.2, FY, FZ1 + 3.6);
    B.R.add(arr);
    var arf = new THREE.BoxGeometry(0.5, 5.3, 0.3);
    arf.rotateY(-0.26);
    arf.translate(FX - 0.3, FY, FZ1 + 1.0);
    B.M.add(arf);
    B.M.add(strut(THREE, FX - 0.5, FY, FZ1 + 0.9, FX - 1.2, FY, FZ1 + 5.3, 0.12, 4));
    /* a short pole and its whip above the array                              */
    B.M.add(strut(THREE, FX + 1.6, FY - 2.0, FZ0 + 2.0, FX + 1.6, FY - 2.0, Z0 + 34.0, 0.12, 4, 0.06));

    /* ---------------------------------------------- the after pole mast
       A tapered tube off the "6" block at x -29.5, two platforms, the long
       yard at 30.5 m, a short one above, and the masthead dome: the ship's
       tallest point, 40.6 m over the deck.                                    */
    var AX = -29.8, AY = -10.0, AZ0 = Z0 + 13.0;
    B.S.add(strut(THREE, AX, AY, AZ0, AX, AY, Z0 + 30.5, 1.45, 8, 0.8));
    B.S.add(strut(THREE, AX, AY, Z0 + 30.5, AX, AY, Z0 + 38.4, 0.55, 6, 0.3));
    /* the tube's ladder and cable runs, aft and outboard                     */
    B.M.add(strut(THREE, AX - 1.25, AY - 0.4, AZ0, AX - 0.75, AY - 0.4, Z0 + 30.3, 0.09, 4));
    B.M.add(strut(THREE, AX - 0.4, AY - 1.25, AZ0, AX - 0.4, AY - 0.75, Z0 + 30.3, 0.12, 4));
    [[Z0 + 23.7, 2.8, 8.0], [Z0 + 28.0, 2.0, 5.0]].forEach(function (pl) {
      B.S.add(plate(THREE, rect(AX - pl[1], AX + pl[1], AY - pl[2] * 0.5, AY + pl[2] * 0.5), pl[0] - 0.25, pl[0]));
      ringRail(rect(AX - pl[1] + 0.1, AX + pl[1] - 0.1, AY - pl[2] * 0.5 + 0.1, AY + pl[2] * 0.5 - 0.1), pl[0] + 1.0);
    });
    B.S.add(box(THREE, 3.6, 12.0, 0.45, AX, AY, Z0 + 30.5));
    ringRail(rect(AX - 1.7, AX + 1.7, AY - 5.9, AY + 5.9), Z0 + 31.5);
    B.S.add(box(THREE, 1.3, 7.0, 0.4, AX, AY, Z0 + 34.5));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, AX, AY + s * 0.8, Z0 + 27.8, AX, AY + s * 5.0, Z0 + 30.3, 0.1, 4));
      B.W.add(sphere(THREE, 0.55, 8, 5, AX + 1.0, AY + s * 5.0, Z0 + 31.3));
      B.M.add(strut(THREE, AX - 0.8, AY + s * 3.2, Z0 + 30.7, AX - 0.8, AY + s * 3.2, Z0 + 33.4, 0.05, 4));
      B.S.add(box(THREE, 0.8, 0.8, 1.0, AX, AY + s * 3.0, Z0 + 35.2));
    }
    /* EW boxes on the lower platform, a dome on the upper, masthead dome     */
    B.S.add(box(THREE, 1.8, 1.4, 2.2, AX - 2.0, AY - 2.2, Z0 + 24.8));
    B.S.add(box(THREE, 1.8, 1.4, 2.2, AX - 2.0, AY + 2.2, Z0 + 24.8));
    B.W.add(sphere(THREE, 0.9, 10, 6, AX + 1.2, AY, Z0 + 28.0, 1, 1, 1, true));
    B.W.add(cylZ(THREE, 0.7, 0.7, 1.3, 10, AX, AY, Z0 + 38.4));
    B.W.add(sphere(THREE, 0.7, 10, 4, AX, AY, Z0 + 39.7, 1, 1, 1, true));
    B.M.add(strut(THREE, AX, AY, Z0 + 40.2, AX, AY, Z0 + 40.6, 0.08, 4));

    /* SPS-49: the big curved mesh reflector on its pedestal aft of the after
       mast, 16-21 m over the deck on the starboard broadside                 */
    B.S.add(cylZ(THREE, 0.9, 1.2, 3.6, 8, -36.0, -12.5, Z0 + 13.0));
    B.M.add(cylZ(THREE, 0.45, 0.45, 1.2, 8, -36.0, -12.5, Z0 + 16.6));
    for (j = -2; j <= 2; j++) {
      var ang = j * 0.22;
      var pn = new THREE.BoxGeometry(0.15, 1.55, 4.2);
      pn.rotateZ(ang);
      pn.translate(-36.0 + 0.9 - Math.cos(ang) * 0.9 + Math.abs(j) * 0.18, -12.5 + Math.sin(ang) * 3.6, Z0 + 19.2);
      B.R.add(pn);
    }
    B.M.add(strut(THREE, -35.2, -12.5, Z0 + 17.4, -36.6, -12.5, Z0 + 19.2, 0.12, 4));

    /* ----------------------------------------------- domes on the island
       The overhead and the broadside put a pair of big SATCOM domes on the
       after deckhouse, one on a pedestal over the "6" block, smaller ones
       round the masts and on the bridge roof, and a big dome and a small one
       on the low deckhouse in front of the bridge (bow view).                */
    [[-47.6, -14.6, 9.5, 2.5], [-44.6, -10.2, 9.5, 1.9], [-37.5, -8.6, 13.0, 1.4],
     [-8.0, -7.2, 11.5, 1.2], [-4.0, -16.4, 11.5, 1.1], [21.0, -8.6, 14.6, 1.1],
     [25.5, -13.0, 17.0, 1.0], [38.4, -15.9, 6.0, 1.9], [41.0, -11.3, 6.0, 1.0]].forEach(function (d) {
      B.S.add(cylZ(THREE, d[3] * 0.55, d[3] * 0.65, 0.9, 8, d[0], d[1], Z0 + d[2]));
      B.W.add(sphere(THREE, d[3], 12, 7, d[0], d[1], Z0 + d[2] + 0.9 + d[3] * 0.55));
    });
    B.S.add(cylZ(THREE, 0.5, 0.7, 2.6, 8, -37.5, -8.6, Z0 + 13.0));
    /* RAM on the forward deckhouse roof, trained forward (RAM photograph)   */
    emit(ramParts(THREE), 39.0, -12.6, Z0 + 6.0, 0.15);
    B.S.add(plate(THREE, [[36.3, -17.7], [36.3, -9.5], [40.0, -9.5], [42.7, -12.1], [42.7, -17.7]], Z0 + 6.0, Z0 + 6.25));
    ringRail([[36.4, -17.6], [36.4, -9.6], [40.0, -9.6], [42.6, -12.1], [42.6, -17.6]], Z0 + 7.2);
    /* whips along the island roof's outboard edge between the stacks        */
    for (j = 0; j < 3; j++)
      B.M.add(strut(THREE, -9.0 + j * 4.5, -17.9, Z0 + 11.5, -9.0 + j * 4.5, -18.4, Z0 + 18.0, 0.06, 4));

    /* --------------------------------------------------------- deck gear */
    /* deck-edge whips folded down along the starboard side, and the tall
       folding pole at the bow, both on every broadside                       */
    for (i = 0; i < 4; i++)
      B.M.add(strut(THREE, 60.0 + i * 16, -19.5, FD_TOP - 1.0, 60.0 + i * 16 - 5.6, -20.4, FD_TOP + 1.2, 0.07, 4));
    /* team flashes on the deck ends: thin, laid on the deck                   */
    B.T.add(box(THREE, 1.6, 14.0, 0.2, XB - 1.6, -6.0, FD_TOP + 0.1));
    B.T.add(box(THREE, 1.6, 14.0, 0.2, XD0 + 1.6, -6.0, FD_TOP + 0.1));

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["lha_n"] = {
  len: 257.3,
  build: function (THREE, M, C) { return HeroAmericaLHA.build(THREE, M, C); }
};
