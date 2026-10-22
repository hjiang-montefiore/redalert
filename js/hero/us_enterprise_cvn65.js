/* ============================================================================
   us_enterprise_cvn65.js -- HERO model: USS Enterprise (CVAN-65) as she was
   in the 1960s, row nato_e60_carrier. Replaces the parametric warship3d.js
   stand-in for that key.

   She is drawn as the photographs of 1962-1964 show her: commissioned on
   25 November 1961 with no guns and no missiles (the Terrier launchers she
   was designed for were deleted to save money), so no defensive weapon is
   drawn at all. Her first fit, a prototype BPDMS with two eight-round Sea
   Sparrow box launchers, came "late in 1967" and none of the references
   here shows where it stood, so it is left off rather than guessed.

   References (Wikimedia Commons, read at known scale):
     - "USS Enterprise (CVN-65) deck plan, in 1999.png": the only scale
       drawing found. The flight-deck outline, the four lift notches and
       their chamfered corners, the island's place, all four catapult
       tracks, the blast-deflector wells, the four arresting pendants and
       the landing-area lines are measured off it on a metre grid: x from
       the 342.3 m length (stern corner to the tips of the bridle horns),
       y from the 78.4 m (257.2 ft) published extreme width. It is a 1999
       drawing: the 1979-82 refit rebuilt the island and later sponsons
       carried Phalanx and NSSM, so only the deck, lifts and catapults are
       taken from it -- the 1960s photographs below show those unchanged.
     - "USS Enterprise (CVAN-65) at Guantanamo in February 1962" (colour,
       starboard side from aft of the beam): lifts, island position, the
       long empty quarter sponson, the gallery, the flared bow, the paint.
     - "USS Enterprise (CVAN-65) rounds Cape Horn on 17 September 1964"
       (port broadside, nearly level): deck height 18.5-19.5 m, the raked
       stem 11-12 m behind the deck front, island heights.
     - "USS Enterprise (CVAN-65) underway on 10 April 1962 (USN 1063070)"
       (dead ahead, from above): the island's forward face -- base column,
       radar box with one square SPS-33 and one wide SPS-32 face, two
       window tiers, the beehive, the yard -- and the bow with its two
       bridle horns on gratings.
     - "Island of USS Enterprise (CVAN-65), in 1963-1964 (NNAM...038)" and
       "USN1059659 SCANFAR Radars (SPS-32,SPS-33) ... 1962-02-10": the
       island corner-on from starboard forward: both faces' arrays, the
       overhang of the box over the base column, the raked bridge glazing,
       the six antenna rows on the beehive, the mesh dishes.
     - "... underway in October 1962" and "... 30 May 1963 (KN-5074)" and
       "... fire 1969 aft flight deck aerial view": the 1960s deck marking
       plan -- ladder-pattern landing lines, solid landing centreline, the
       axial bow centreline, lift outlines.

   RECOGNITION LIST (each must read at game zoom):
     1. The long, narrow hull and 342 m deck, W/L 0.23 (deck plan).
     2. The angled deck at 9 degrees to port, its forward corner standing
        42 m out to port at x 28..63 (deck plan; Oct 1962 view).
     3. FOUR deck-edge lifts, three to starboard (one abaft the island, two
        forward of it) and one to port at the after end of the angled deck,
        each with its real chamfered outline and the hangar opening under it
        (deck plan; Guantanamo 1962; 1969 aerial).
     4. Four C-13 catapults: two up the bow, two in the waist on the angle
        (deck plan; April 1962 view).
     5. The SQUARE island set 37% of the length from the stern: a narrow
        base column carrying an overhanging square radar box (April 1962,
        1963-64 close-up).
     6. SCANFAR: on every face of the box one square AN/SPS-33 array and one
        wide AN/SPS-32 array, set pinwheel-fashion (two faces photographed;
        the other two follow the pattern).
     7. The "beehive": the conical ECM dome three storeys high above the
        bridge, ringed with six rows of AA-8200 dipole antennas, the upper
        two rows in piping radomes (close-up; WP "Radar" section).
     8. The wide yard on a short mast above the beehive, whips and a small
        dome at the head (April 1962).
     9. Two bridle-arrester horns jutting from the bow on gratings (April
        and October 1962).
    10. The flared bow with a raked stem and a square transom under the
        overhang; the long empty starboard quarter sponson (Guantanamo).
    11. Catwalks and life-raft racks fringing the deck edge (all views).
    12. 1960s haze grey topsides with a dark deck and its 1960s markings.

   Published figures used: 342.3 m (1,123 ft) overall; 317 m (1,040 ft)
   on the waterline; 40.5 m (132.8 ft) waterline beam; 78.4 m (257.2 ft)
   extreme width; 11.9 m (39 ft) draught; deck 19.0 m above the waterline
   (measured, Cape Horn broadside). The hull below the waterline measures
   90,700 m3 by signed volume, about 91,500 long tons: under the 93,284 the
   Naval Vessel Register gives for her final fit and near the 89,000-90,000
   usually quoted for her as built (that figure could not be confirmed).

   Model space: +X bow, +Y port, +Z up. Real metres, waterline at z = 0,
   keel at z = -11.9, flight deck at z = 19.0. render3d.js stands the model
   up with rotation.x = -PI/2 and scales it by its X extent, which is the
   stern corner to the bridle-horn tips: nothing else passes either end.

   Materials: the house three tiers -- SKIN (painted steel with procedural
   CanvasTextures: hull plating, flight deck, island plate), METAL, GLASS --
   plus flat colours (array faces, white canisters and radomes, dark
   openings) and the team material, exactly C.team. Every static part is
   merged into ONE mesh per material. There is no "turret": she had no gun.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEnterpriseCVN65 = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 342.3;              /* stern corner to the bridle-horn tips     */
  var X_AFT  = -171.1, X_FWD = 171.1;
  var X_BOW  = 164.1;              /* the flight deck's forward edge           */
  var FD_TOP = 19.0;               /* flight deck above the waterline          */
  var FD_TH  = 1.4;                /* deck plate and its girders               */
  var FD_BOT = FD_TOP - FD_TH;     /* 17.6: gallery deck, top of the hull loft */
  var KEEL   = -11.9;              /* 39 ft draught                            */
  var KNUCK  = 9.0;                /* hangar deck: where the flare starts      */
  var HX0 = -166.0, HX1 = 163.4;   /* hull loft: transom, stem head            */

  /* The landing area. Its edge lines read off the deck plan at 9.0 degrees
     to the centreline, 19 m apart, the axis crossing the stern at y -0.9. */
  var ANG = 9.0 * PI / 180, CA = Math.cos(ANG), SA = Math.sin(ANG);
  var LA_Y0 = 25.1, LA_HW = 9.5;
  /* a point s metres along the landing axis, o metres to port of it */
  function la(s, o) { return [s * CA - o * SA, LA_Y0 + s * SA + o * CA]; }
  /* the four pendants: on the plan they cross the axis at x -110, -97.5,
     -85.6 and -74.3, twelve metres apart                                  */
  var PEND = [-111.0, -98.6, -86.6, -75.2];

  /* ------------------------------------------------------ the deck outline
     Plan view off the 1999 deck plan, bow first, down the port side, across
     the slanting stern and forward up the starboard side. The four lifts
     are NOTCHES in this outline and their own slabs fill them, so each
     reads as a separate plate with the hangar opening dark under it.     */
  var DECK = [
    [ 164.1,  13.9], [ 158.9,  14.5], [ 117.1,  17.6], [  84.9,  19.8],
    [  68.2,  20.8], [  65.9,  31.8], [  63.4,  41.9],     /* angled corner */
    [  27.7,  42.8], [   3.9,  40.3],
    [ -92.0,  41.0], [ -93.0,  41.0],                      /* port lift     */
    [ -96.2,  29.9], [ -97.8,  23.0], [-118.4,  23.0], [-118.4,  41.0],
    [-121.0,  41.0], [-130.6,  31.5], [-150.6,  31.5], [-150.6,  21.1],
    [-168.6,  20.5], [-171.1,  19.2],                      /* round-down    */
    [-166.6, -17.0], [-130.6, -17.3], [-122.6, -17.3], [-122.6, -24.3],
    [ -95.2, -26.1], [ -95.2, -35.6],
    [ -92.0, -35.6], [ -92.0, -16.7], [ -71.1, -16.7], [ -71.1, -23.6],
    [ -67.9, -35.6],                                       /* No.3 lift     */
    [ -24.4, -35.6], [ -24.4, -16.7], [  -3.5, -16.7], [  -3.5, -23.6],
    [  -0.3, -35.6],                                       /* No.2 lift     */
    [  24.4, -35.6], [  24.4, -17.3], [  45.4, -17.3], [  45.4, -24.3],
    [  48.9, -35.6],                                       /* No.1 lift     */
    [  52.8, -35.6], [  74.6, -17.3], [ 117.1, -16.1], [ 158.9, -14.5],
    [ 164.1, -13.9],
  ];
  /* the lift platforms: the notch outline, outer edge on the deck edge.
     s is the side (+1 port, -1 starboard). On the plan each has its
     forward outboard corner cut back on a slant.                          */
  var LIFTS = [
    { s:  1, P: [[-118.4, 23.0], [-97.8, 23.0], [-96.2, 29.9], [-93.0, 41.0], [-118.4, 41.0]] },
    { s: -1, P: [[-92.0, -35.6], [-67.9, -35.6], [-71.1, -23.6], [-71.1, -16.7], [-92.0, -16.7]] },
    { s: -1, P: [[-24.4, -35.6], [-0.3, -35.6], [-3.5, -23.6], [-3.5, -16.7], [-24.4, -16.7]] },
    { s: -1, P: [[24.4, -35.6], [48.9, -35.6], [45.4, -24.3], [45.4, -17.3], [24.4, -17.3]] },
  ];
  LIFTS.forEach(function (L) {
    L.x0 = Math.min.apply(null, L.P.map(function (q) { return q[0]; }));
    L.x1 = Math.max.apply(null, L.P.map(function (q) { return q[0]; }));
    L.y0 = Math.min.apply(null, L.P.map(function (q) { return q[1]; }));
    L.y1 = Math.max.apply(null, L.P.map(function (q) { return q[1]; }));
  });

  /* catapult tracks [start, end] off the plan: two up the bow, two in the
     waist, the outer one running almost parallel to the centreline       */
  var CATS = [
    [[  64.0,  10.1], [147.7,   9.1]],
    [[  65.6, -11.7], [149.3,  -7.2]],
    [[ -51.8,  35.9], [ 42.1,  35.3]],
    [[ -40.5,  20.2], [ 54.4,  31.5]],
  ];

  /* the island: a square radar box 22 m a side, its outboard face just
     inside the deck edge, over a base column 14 m square                  */
  var IX = -47.8, IY = -23.8, IB = 11.0, IC = 7.0;

  /* ================================================================ helpers */
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function mkCv(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* largest |y| of the deck outline on one side (+1 port, -1 starboard) at
     station x. Inside a lift notch that is the notch's inner edge, which is
     where the hull stops flaring and the hangar opening begins.           */
  function deckHalf(x, side) {
    var best = 0, i, n = DECK.length;
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      if (side * a[1] <= 0 && side * b[1] <= 0) continue;
      var lo = Math.min(a[0], b[0]), hi = Math.max(a[0], b[0]);
      if (x < lo || x > hi) continue;
      var y;
      if (hi - lo < 1e-6) y = Math.max(side * a[1], side * b[1]);
      else y = side * (a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
      if (y > best) best = y;
    }
    return best;
  }

  /* ------------------------------------------------------------- batching
     Every static part lands in one Batch per material and goes out as one
     mesh, as on the Ford.                                                */
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
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
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

  /* A closed frustum on a convex plan: the outline scaled by sBot about
     its centroid at zb and by sTop at zt. UVs in metres / 16.             */
  function frustum(THREE, pts, zb, zt, sBot, sTop) {
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
    for (i = 1; i < n - 1; i++) {
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
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  /* a square plan about (cx, cy), half-sizes hx (along x) and hy        */
  function sq(cx, cy, hxx, hyy) {
    return [[cx + hxx, cy - hyy], [cx + hxx, cy + hyy], [cx - hxx, cy + hyy], [cx - hxx, cy - hyy]];
  }

  /* ============================================================= textures
     1960s haze grey (5-H). On the Guantanamo colour print the sunlit flank
     samples #ccc7bf to #d5d1ca, the sunlit island #e1ded9 and the deck
     #8b7c64 to #9c8761 (the print runs warm): a neutral grey, a shade
     lighter than the blue-grey the Ford wears, over a much darker deck. The
     sampled level is not usable as it stands -- this renderer's ACES pass
     lifts mid greys about 1.8x (pla_e00_destroyer.js) -- so, as the house
     rule has it, the hull is taken to 0.9 of a 5-H reference level
     (#878b8f -> #7a7d81), neutral, and the island a step lighter, as every
     1960s photograph shows it. The deck is the dark non-skid the prints
     show well below the hull, and the bottom the dark red of the period. */
  var PAINT = { hull: 0x7a7d81, sup: 0x83878b, deck: 0x46484a };

  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z, len, gr;
    var PXZ = H / (zTop - zBot), PXX = W / (HX1 - HX0);
    function rowZ(zz) { return (zTop - zz) * PXZ; }
    function band(za, zb, col) {
      var ya = rowZ(Math.min(za, zTop)), yb = rowZ(Math.max(zb, zBot));
      if (yb > ya) { g.fillStyle = col; g.fillRect(0, ya, W, yb - ya); }
    }
    function hline(zz) {
      if (zz <= zBot || zz >= zTop) return;
      y = rowZ(zz); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    band(zTop, 0, hx(PAINT.hull));
    band(0, zBot, "#5a2d29");
    for (i = 0; i < 300; i++) {
      z = zBot + R() * (zTop - zBot);
      var under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    /* black boot topping, as the period prints show it at the waterline   */
    band(1.5, -0.9, "#17191c");
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 76; i++) {
      x = i * W / 76 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(i * 2.0);
    for (i = 1; i < 5; i++) hline(-i * 2.4);
    /* the hangar-deck strake: the long light line along every broadside   */
    g.strokeStyle = "rgba(255,255,255,0.22)"; g.lineWidth = 3; hline(KNUCK);
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 2; hline(KNUCK - 0.35);
    /* a working ship: rust weeping from the scuppers and the hawse        */
    if (zTop > 4) {
      for (i = 0; i < 90; i++) {
        x = R() * W; y = rowZ(4 + R() * 12); len = (2 + R() * 7) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.36)");
        gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
        g.fillStyle = "rgba(24,22,20,0.38)"; g.fillRect(x - 1, y - 1, 4 + R() * 3, 3);
      }
      /* the row of scuttles under the gallery forward, as the bow photos
         show them                                                         */
      g.fillStyle = "rgba(18,20,22,0.75)";
      for (x = 60; x < 150; x += 3.4) g.fillRect((x - HX0) * PXX, rowZ(14.2), 3, 3);
    }
    g.fillStyle = "rgba(236,238,240,0.9)";
    [146.0, -158.0].forEach(function (mx) {
      for (var k = 0; k < 7; k++) {
        var zz = -6 + k * 1.0;
        if (zz > zBot && zz < zTop) g.fillRect((mx - HX0) * PXX, rowZ(zz) - 1, 7, 2);
      }
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  /* island plate: seams, doors, portholes, a little soot near the top     */
  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(6501), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.4;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
    }
    g.fillStyle = "rgba(20,22,25,0.42)";
    for (i = 0; i < 16; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    g.fillStyle = "rgba(20,22,25,0.55)";
    for (i = 0; i < 40; i++) {
      g.beginPath(); g.arc(R() * W, R() * H, 2.6, 0, PI * 2); g.fill();
    }
    for (i = 0; i < 40; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.18)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck
     One plan-view painting of the whole deck, sampled through the slab's
     shape-space UVs (metres, with repeat and offset), so every line sits
     where the deck plan puts it. The lift slabs sample the same painting.

     The 1960s marking plan, from the 1962-1969 overheads:
       - the landing area's two edges painted as LADDERS, a pair of white
         lines with rungs across them, the pattern every overhead of the
         period shows down the angled deck;
       - a solid white landing centreline between them;
       - a solid white centreline down the bow, from the bow to abeam the
         island (October 1962);
       - catapult tracks dark, the blast-deflector wells scorched;
       - a white outline round each lift.
     The "65" the crew painted on the bow is a hull number and is left off. */
  var DX0 = -172, DX1 = 172, DY0 = -38, DY1 = 45;

  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(6502), i, p, q;
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
    function mpoly(pts, col) {
      g.fillStyle = col; g.beginPath();
      g.moveTo(cx(pts[0][0]), cy(pts[0][1]));
      for (var k = 1; k < pts.length; k++) g.lineTo(cx(pts[k][0]), cy(pts[k][1]));
      g.closePath(); g.fill();
    }

    /* --- non-skid ----------------------------------------------------- */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 460; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d9194" : "#202224";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 10 + R() * 46);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#141618";
    for (i = 0; i < 5000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.30)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }

    /* --- landing area: scuffed darker, rubber thickest at the wires ----- */
    g.beginPath();
    p = la(-185, LA_HW); g.moveTo(cx(p[0]), cy(p[1]));
    p = la(75, LA_HW);   g.lineTo(cx(p[0]), cy(p[1]));
    p = la(75, -LA_HW);  g.lineTo(cx(p[0]), cy(p[1]));
    p = la(-185, -LA_HW); g.lineTo(cx(p[0]), cy(p[1]));
    g.closePath(); g.fillStyle = "rgba(18,20,22,0.22)"; g.fill();
    g.fillStyle = "#0c0e10";
    for (i = 0; i < 480; i++) {
      var s0 = -130 + Math.pow(R(), 1.6) * 120, o0 = (R() - 0.5) * 9;
      p = la(s0, o0);
      g.globalAlpha = 0.07 + R() * 0.08;
      g.save(); g.translate(cx(p[0]), cy(p[1])); g.rotate(-ANG);
      g.fillRect(0, 0, (4 + R() * 16) * SX, 1.5 + R() * 2.5);
      g.restore();
    }
    g.globalAlpha = 1;

    /* --- the two ladder edges and the solid centreline ------------------- */
    var LS0 = -185, LS1 = 72, WHITE = "#e6e9ea";
    [-1, 1].forEach(function (sd) {
      var o1 = sd * LA_HW, o2 = sd * (LA_HW - 1.7);
      mline(la(LS0, o1), la(LS1, o1), 0.4, WHITE);
      mline(la(LS0, o2), la(LS1, o2), 0.4, WHITE);
      for (var s = LS0 + 4; s < LS1; s += 9.0) mline(la(s, o1), la(s, o2), 0.45, WHITE);
    });
    mline(la(LS0, 0), la(LS1 + 8, 0), 0.5, WHITE);
    /* the bow centreline, solid, from the bow back to abeam the island    */
    mline([-46, 0], [161, 0], 0.5, WHITE);

    /* --- catapults: the track with its slot, starting at the well -------- */
    function cat(a, b) {
      mline(a, b, 1.6, "#6c7074");
      mline(a, b, 0.35, "#101214");
    }
    CATS.forEach(function (c) { cat(c[0], c[1]); });
    /* blast-deflector wells, drawn lowered: a frame round a panel scorched
       black down the middle where the exhaust hits                         */
    function jbd(x, y, hw, ang) {
      g.save(); g.translate(cx(x), cy(y)); g.rotate(-ang);
      g.fillStyle = "#5c4a3a"; g.fillRect(-2.1 * SX, -hw * SY, 4.2 * SX, 2 * hw * SY);
      var gg = g.createLinearGradient(0, -hw * SY, 0, hw * SY);
      gg.addColorStop(0, "rgba(38,30,24,0.6)");
      gg.addColorStop(0.5, "rgba(18,16,15,0.95)");
      gg.addColorStop(1, "rgba(38,30,24,0.6)");
      g.fillStyle = gg; g.fillRect(-1.8 * SX, -(hw - 0.3) * SY, 3.6 * SX, 2 * (hw - 0.3) * SY);
      g.restore();
    }
    CATS.forEach(function (c) {
      var dx = c[1][0] - c[0][0], dy = c[1][1] - c[0][1], L = Math.sqrt(dx * dx + dy * dy);
      jbd(c[0][0] - dx / L * 4.5, c[0][1] - dy / L * 4.5, 5.2, Math.atan2(dy, dx));
    });

    /* --- the four pendants, square to the landing axis -------------------- */
    PEND.forEach(function (sw) {
      mline(la(sw, -LA_HW - 0.4), la(sw, LA_HW + 0.4), 0.3, "#15181b");
      [-1, 1].forEach(function (sd) {
        var sh = la(sw + 1.0, sd * (LA_HW + 2.0));
        g.fillStyle = "#d9dcde";
        g.beginPath(); g.arc(cx(sh[0]), cy(sh[1]), 0.55 * SX, 0, PI * 2); g.fill();
      });
    });

    /* --- lifts: a white outline a metre inside each platform's edge ------ */
    LIFTS.forEach(function (L) {
      var inner = scalePts(L.P, 0.9);
      g.save(); g.strokeStyle = WHITE; g.lineWidth = Math.max(1.2, 0.4 * SY);
      g.beginPath(); g.moveTo(cx(inner[0][0]), cy(inner[0][1]));
      for (var k = 1; k < inner.length; k++) g.lineTo(cx(inner[k][0]), cy(inner[k][1]));
      g.closePath(); g.stroke(); g.restore();
      /* the hinge-line gap between platform and deck                      */
      g.save(); g.strokeStyle = "#0b0c0e"; g.lineWidth = Math.max(1.0, 0.25 * SY);
      g.beginPath(); g.moveTo(cx(L.P[0][0]), cy(L.P[0][1]));
      for (var k2 = 1; k2 < L.P.length; k2++) g.lineTo(cx(L.P[k2][0]), cy(L.P[k2][1]));
      g.closePath(); g.stroke(); g.restore();
    });

    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* the paintings depend on nothing but the ship: made once per page     */
  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      top:  hullTex(THREE, FD_BOT, 0, 256, 65017),
      bot:  hullTex(THREE, 0, KEEL, 128, 65018),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================= hull
     Lofted from station outlines as on the Ford, with Enterprise's own
     table: a finer, "more cruiser-like" hull (317 m on the waterline,
     40.5 m beam, 11.9 m draught), long fine entrance and run, no bulb (no
     reference shows one), a raked stem 12 m behind the deck front and a
     square transom just clear of the water under the after overhang.

     Levels: z, midship half-breadth, where the waterline starts to fine
     toward the stem, the stem x at that level, the taper powers, where it
     starts to fine aft, how far aft it would vanish, and the aft power. */
  var LEV = [
    /*  z      yMid  xb0   stemX  p    q     xs0    xsEnd  ps              */
    [ -11.9,  6.0, -70, 136.0, 1.4, 1.00,  -10, -145, 1.3 ],
    [ -11.0, 12.0, -50, 141.0, 1.5, 0.85,  -20, -160, 1.5 ],
    [  -8.5, 16.2, -35, 146.0, 1.7, 0.70,  -35, -182, 1.7 ],
    [  -4.0, 19.1, -20, 149.5, 1.8, 0.66,  -55, -212, 2.0 ],
    [   0.0, 20.25, -5, 152.0, 1.8, 0.90,  -80, -265, 2.0 ],
    [   5.0, 20.6,  40, 156.0, 1.9, 0.85, -130, -400, 2.0 ],
    [  KNUCK, 21.0, 85, 159.0, 2.2, 0.75, -999, -9999, 1 ],
  ];
  var KEELZ = [
    [-166, 1.0], [-158, -2.0], [-148, -5.0], [-136, -7.8], [-122, -9.9],
    [-106, -11.2], [-86, -11.8], [-66, KEEL],
    [126, KEEL], [132, -11.6], [136, -11.0], [140, -9.9], [143.5, -8.2],
    [146.5, -6.0], [149.5, -3.0], [152.0, 0.0],
    [156.0, 5.0], [159.0, KNUCK], [161.5, 13.0], [162.8, 16.2], [HX1, FD_BOT],
  ];
  var STEM = [[0, 152.0], [5, 156.0], [KNUCK, 159.0], [13, 161.5], [16.2, 162.8], [FD_BOT, HX1]];
  function wedge(x, z) {
    var k = z < 13 ? lerp(0.50, 0.70, clamp((z - KNUCK) / (13 - KNUCK), 0, 1))
                   : lerp(0.70, 0.95, clamp((z - 13) / (FD_BOT - 13), 0, 1));
    return k * Math.max(0, tbl(STEM, z) - x);
  }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function lowY(k, x) {
    var L = LEV[k], y = L[1];
    if (x > L[2]) {
      var t = clamp((x - L[2]) / (L[3] - L[2]), 0, 1);
      y *= Math.pow(Math.max(0, 1 - Math.pow(t, L[4])), L[5]);
    }
    if (x < L[6]) {
      var ts = clamp((L[6] - x) / (L[6] - L[7]), 0, 1);
      y *= Math.max(0, 1 - Math.pow(ts, L[8]));
    }
    return y;
  }

  function sideRing(x, side) {
    var out = [], zk = tbl(KEELZ, x), k;
    var first = 0;
    while (first < LEV.length - 1 && LEV[first][0] < zk) first++;
    var yFirst = lowY(first, x);
    for (k = 0; k < LEV.length; k++) {
      if (LEV[k][0] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([lowY(k, x), LEV[k][0]]);
    }
    var yK = out[LEV.length - 1][0];
    /* out to the deck edge less a metre and a half of overhang; inside a
       lift notch that collapses to the hangar side                        */
    var edge = Math.max(yK, deckHalf(x, side) - 1.5), over = edge - yK;
    /* Enterprise's sides stand nearly straight up past the hangar deck and
       the gallery shelf carries the deck edge out (Guantanamo); under the
       angled deck the knees start lower                                    */
    var zF = Math.max(zk, lerp(12.8, 10.4, clamp((over - 12) / 8, 0, 1)));
    var yF = Math.min(yK + 0.10 * over, wedge(x, zF));
    /* the gallery: a plumb face 2.2 m deep under the deck edge, the
       broad light band every 1962 broadside shows, with the shelf under
       it in shadow                                                         */
    var y15 = Math.min(edge, wedge(x, 15.4));
    var y17 = Math.min(edge, wedge(x, FD_BOT));
    out.push([yF, zF], [y15, 15.4], [y17, FD_BOT]);
    return out;
  }

  function hullGeo(THREE) {
    var xs = [-166, -163, -159, -154, -148, -142, -135, -127, -118, -108,
              -96, -84, -72, -60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60,
              72, 84, 96, 108, 118, 126, 133, 139, 144, 148, 151, 153.5,
              155.5, 157.5, 159.5, 161.0, 162.2, HX1];
    var i, j;
    DECK.forEach(function (p) { if (p[0] > HX0 + 0.5 && p[0] < HX1 - 0.5) xs.push(p[0]); });
    LIFTS.forEach(function (L) {
      [L.x0, L.x1].forEach(function (e) {
        if (e > HX0 + 0.5) { xs.push(e - 0.25); xs.push(e + 0.25); }
      });
    });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.2) st.push(xs[i]);
    var rings = [];
    for (i = 0; i < st.length; i++) {
      var x = st[i], P = sideRing(x, 1), S = sideRing(x, -1), r = [];
      r.push([0, FD_BOT]);
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, tbl(KEELZ, x)]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
    var faces = [];
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;
      ar = Math.sqrt(ar);
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [cxp, cyp, czp], u: [cxp / ar, cyp / ar, czp / ar] });
    }
    function K(ii, jj) { return ii * nR + (jj % nR); }
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1));
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1));
      }
    }
    var r0 = rings[0], cyy = 0, czz = 0;
    for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
    var C = [st[0], cyy / nR, czz / nR];
    for (j = 0; j < nR; j++) tri(C, V(0, j), V(0, j + 1), -1, -2 - j, -2 - ((j + 1) % nR));
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) {
      f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); });
    });
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

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j, s, k;

    /* ---------------------------------------------------- the materials */
    var T = {}, TX = textures(THREE);
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.top, roughness: 0.86, metalness: 0.08 });
    T.U = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.bot, roughness: 0.90, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.87, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1f2226, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d6368, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    /* the SCANFAR faces: smooth flat plate, a touch lighter than the island
       walls round them, as both close-ups show                             */
    T.R = new THREE.MeshStandardMaterial({ color: 0x8e9296, roughness: 0.70, metalness: 0.06 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd2d5d6, roughness: 0.62, metalness: 0.04 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0x4b8fe0),
                                           roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(); });

    function ringRail(pts, z) {
      for (var q = 0; q < pts.length; q++) {
        var p0 = pts[q], p1 = pts[(q + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    /* a flat plate on an arbitrary (convex or not) outline via a Shape    */
    function shapePlate(pts, z0, th) {
      var sh = new THREE.Shape();
      sh.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) sh.lineTo(pts[q][0], pts[q][1]);
      sh.closePath();
      var g = new THREE.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false, curveSegments: 1 });
      g.translate(0, 0, z0);
      return g;
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
    /* the lifts: the same painting, a hair proud of the deck, and under
       each the hangar opening with its rounded head (Guantanamo 1962) and
       the two guide trunks either side                                    */
    LIFTS.forEach(function (L) {
      var inner = scalePts(L.P, 0.992);
      var lg = shapePlate(inner, FD_TOP - 1.1 + 0.02, 1.1);
      Batch.addGroups(lg, [B.D, B.S]);
      var xm = (L.x0 + L.x1) * 0.5, yo = L.s * (lowY(LEV.length - 1, xm) + 0.05);
      B.K.add(box(THREE, L.x1 - L.x0 - 3.0, 0.3, 6.6, xm, yo, KNUCK + 3.6));
      B.K.add(place(THREE, new THREE.CylinderGeometry(1.4, 1.4, 0.3, 8), L.x0 + 2.9, yo, KNUCK + 6.9));
      B.K.add(place(THREE, new THREE.CylinderGeometry(1.4, 1.4, 0.3, 8), L.x1 - 2.9, yo, KNUCK + 6.9));
      B.K.add(box(THREE, L.x1 - L.x0 - 5.8, 0.3, 1.4, xm, yo, KNUCK + 7.5));
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.9 : L.x0 + 0.9;
        B.S.add(box(THREE, 1.6, 2.4, FD_BOT - KNUCK, tx, yo + L.s * 1.15, (FD_BOT + KNUCK) * 0.5));
      }
    });

    /* ---------------------------- catwalks and safety nets round the edge */
    var n = DECK.length;
    function inNotch(a, b) {
      for (var q = 0; q < LIFTS.length; q++) {
        var L = LIFTS[q];
        var inx = function (p) { return p[0] >= L.x0 - 0.01 && p[0] <= L.x1 + 0.01; };
        var iny = function (p) { return p[1] >= L.y0 - 0.01 && p[1] <= L.y1 + 0.01; };
        if (inx(a) && inx(b) && iny(a) && iny(b)) return true;
      }
      return false;
    }
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1], L2 = Math.sqrt(dx * dx + dy * dy);
      if (L2 < 3 || inNotch(a, b)) continue;
      var ox = dy / L2, oy = -dx / L2, ang = Math.atan2(dy, dx);
      var reach = Math.max(Math.abs(a[0]), Math.abs(b[0])) + Math.abs(ox) * 3.6;
      if (Math.abs(ox) > 0.75 || reach > X_BOW - 0.5) continue;
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5;
      B.S.add(box(THREE, L2, 1.5, 0.25, mx + ox * 0.9, my + oy * 0.9, FD_TOP - 1.45, 0, 0, ang));
      var net = new THREE.BoxGeometry(L2 - 0.4, 2.0, 0.08);
      net.rotateX(0.21);
      net.rotateZ(ang - PI);
      net.translate(mx + ox * 2.45, my + oy * 2.45, FD_TOP - 0.62);
      B.K.add(net);
      B.M.add(box(THREE, L2, 0.08, 0.08, mx + ox * 1.6, my + oy * 1.6, FD_TOP - 0.25, 0, 0, ang));
    }

    /* life-raft canister racks along the gallery: the white rows under the
       deck edge in the 1963-64 close-up and every broadside                */
    for (i = 0; i < n; i++) {
      var a3 = DECK[i], b3 = DECK[(i + 1) % n];
      var ex = b3[0] - a3[0], ey = b3[1] - a3[1], LE = Math.sqrt(ex * ex + ey * ey);
      if (LE < 18 || inNotch(a3, b3) || Math.abs(ey / LE) > 0.6) continue;
      var k3 = Math.floor(LE / 14), ea = Math.atan2(ey, ex);
      for (j = 0; j < k3; j++) {
        var f = (j + 0.5) / k3;
        var rx = a3[0] + ex * f + (ey / LE) * 0.5, ry = a3[1] + ey * f - (ex / LE) * 0.5;
        B.S.add(box(THREE, 3.5, 2.3, 0.15, rx - (ey / LE) * 0.5, ry + (ex / LE) * 0.5, FD_TOP - 2.65, 0, 0, ea));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.15, 5);
          can.translate(d3 * 1.1, 0, 0.5);
          B.W.add(place(THREE, can, rx, ry, FD_TOP - 2.6, 0, 0, ea));
        }
      }
    }

    /* --------------------------------------------- stern and bow details */
    /* the enclosed gallery under the after overhang, glazed aft            */
    B.S.add(box(THREE, 4.6, 34.0, 5.2, -167.6, 1.0, FD_BOT - 2.6));
    B.G.add(box(THREE, 0.12, 28.0, 1.0, -169.95, 1.0, FD_BOT - 2.0));
    /* the fantail opening in the transom                                   */
    B.K.add(box(THREE, 0.3, 20.0, 4.6, HX0 - 0.1, 0, 6.0));
    /* the LSO platform hung off the port quarter, below deck level        */
    B.S.add(plate(THREE, [[-158.0, 21.0], [-150.8, 21.0], [-150.8, 29.6], [-158.0, 29.6]], FD_TOP - 1.4, FD_TOP - 1.1));
    ringRail([[-157.8, 21.2], [-151.0, 21.2], [-151.0, 29.4], [-157.8, 29.4]], FD_TOP - 0.2);

    /* the bow: the flat face under the flight deck's forward edge, its row
       of round ports (April 1962), anchors and hawse pipes                 */
    B.S.add(box(THREE, 1.2, 27.0, 2.6, X_BOW - 0.6, 0, FD_BOT - 1.3));
    for (i = 0; i < 5; i++)
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.45, 0.45, 0.2, 8).rotateZ(PI / 2), X_BOW + 0.02, -6 + i * 3.0, FD_BOT - 1.2));
    for (s = -1; s <= 1; s += 2) {
      var ya = sideRing(152.0, s)[LEV.length - 1][0];
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.9, 0.9, 0.3, 10), 152.0, s * (ya + 0.2), 10.6, 0, 0, 0));
      B.M.add(box(THREE, 2.2, 0.5, 3.0, 151.0, s * (ya + 0.3), 8.4));
    }

    /* bilge keels                                                          */
    for (s = -1; s <= 1; s += 2) {
      var bk = lowY(1, 0) + 0.5;
      B.U.add(box(THREE, 110.0, 0.35, 1.6, -5.0, s * bk, -10.9, s * 0.75, 0, 0));
    }
    /* four shafts and screws, and the FOUR rudders she alone among
       carriers carried, one abaft each screw                              */
    var SH = [[6.5, -8.0, -136.0], [14.5, -7.0, -142.0]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var sy = s * SH[i][0], sz = SH[i][1], sx = SH[i][2];
        B.M.add(strut(THREE, -94.0, sy, sz + 2.2, sx - 0.8, sy, sz, 0.55, 6));
        B.M.add(strut(THREE, sx + 4.5, s * (SH[i][0] - 2.5), sz + 4.0, sx + 4.5, sy, sz, 0.35, 4));
        B.M.add(strut(THREE, sx + 4.5, s * (SH[i][0] + 2.5), sz + 4.0, sx + 4.5, sy, sz, 0.35, 4));
        B.M.add(place(THREE, new THREE.CylinderGeometry(0.55, 0.9, 1.8, 8).rotateZ(PI / 2), sx - 1.3, sy, sz));
        for (j = 0; j < 5; j++) {
          var bl = new THREE.BoxGeometry(0.35, 1.6, 2.8);
          bl.translate(0, 0, 1.7);
          bl.rotateZ(0.4);
          bl.rotateX(j * 2 * PI / 5);
          bl.translate(sx - 1.3, sy, sz);
          B.M.add(bl);
        }
        B.M.add(box(THREE, 5.6, 0.7, 7.0, sx - 9.0, sy, sz + 1.6));
      }
    }

    /* ----------------------------------------------------------- sponsons */
    function sponson(pts, ztop, depth, side) {
      pts = ccw(pts);
      B.S.add(plate(THREE, pts, ztop - 0.6, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.25)]; });
      B.S.add(bracket(pts, knee, ztop - 0.6, ztop - 0.6 - depth));
    }
    function bracket(top, bot, zt, zb) {
      var pos = [], uv = [], nn = top.length, q;
      for (q = 0; q < nn; q++) {
        var r = (q + 1) % nn;
        var t0 = [top[q][0], top[q][1], zt], t1 = [top[r][0], top[r][1], zt];
        var b0 = [bot[q][0], bot[q][1], zb], b1 = [bot[r][0], bot[r][1], zb];
        pos.push(b0[0], b0[1], b0[2], b1[0], b1[1], b1[2], t1[0], t1[1], t1[2]);
        pos.push(b0[0], b0[1], b0[2], t1[0], t1[1], t1[2], t0[0], t0[1], t0[2]);
        uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1);
      }
      for (q = 1; q < nn - 1; q++) {
        pos.push(bot[0][0], bot[0][1], zb, bot[q + 1][0], bot[q + 1][1], zb, bot[q][0], bot[q][1], zb);
        uv.push(0, 0, 1, 1, 0, 1);
      }
      var gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      gg.computeVertexNormals();
      return gg;
    }
    /* The long starboard-quarter sponson the Guantanamo print shows empty
       on the hull side under the gallery, abaft the No.3 lift: a shelf at
       about 11 m with its underside sloping back into the plating.         */
    var yq = lowY(LEV.length - 1, -115) + 0.1;
    sponson([[-138, -yq], [-97, -yq], [-99, -(yq + 3.6)], [-136, -(yq + 3.6)]], 11.6, 3.2, -1);
    B.K.add(box(THREE, 30.0, 0.2, 1.4, -117.5, -(yq + 3.65), 10.4));

    /* ------------------------------------------- bridle-arrester horns
       Two booms jutting 7 m from the bow at the ends of the bow catapults,
       sloping down, each with a grating platform either side and a rail:
       the bow of the April 1962 photograph. Their tips set the ship's X
       extent at +171.1.                                                     */
    [8.8, -7.2].forEach(function (hy) {
      var hg2 = new THREE.BoxGeometry(7.4, 2.0, 0.9);
      hg2.translate(3.7, 0, -0.45);
      hg2.rotateY(0.13);
      hg2.translate(X_BOW - 0.4, hy, FD_TOP);
      B.S.add(hg2);
      for (var sd = -1; sd <= 1; sd += 2) {
        B.K.add(box(THREE, 5.6, 1.1, 0.12, X_BOW + 2.6, hy + sd * 1.6, FD_TOP - 1.6));
        B.M.add(box(THREE, 5.6, 0.08, 0.08, X_BOW + 2.6, hy + sd * 2.15, FD_TOP - 0.6));
        B.M.add(strut(THREE, X_BOW + 5.3, hy + sd * 2.15, FD_TOP - 1.6, X_BOW + 5.3, hy + sd * 2.15, FD_TOP - 0.6, 0.05, 4));
        B.M.add(strut(THREE, X_BOW + 2.6, hy + sd * 1.6, FD_TOP - 1.65, X_BOW - 0.2, hy + sd * 1.6, FD_TOP - 4.0, 0.12, 4));
      }
    });

    /* --------------------------------------------------------- deck gear */
    /* four pendants raised a hand's breadth on their bow springs           */
    PEND.forEach(function (sw) {
      var pa = la(sw, -LA_HW - 0.4), pb = la(sw, LA_HW + 0.4);
      B.M.add(strut(THREE, pa[0], pa[1], FD_TOP + 0.1, pb[0], pb[1], FD_TOP + 0.1, 0.08, 4));
    });
    /* whips along the starboard deck edge, and the tall pole the April and
       October 1962 views show standing at the starboard edge forward of
       the island                                                           */
    B.M.add(strut(THREE, -30.0, -36.1, FD_TOP - 1.0, -30.0, -36.1, FD_TOP + 13.0, 0.18, 5, 0.08));
    for (i = 0; i < 4; i++)
      B.M.add(strut(THREE, -140 + i * 54, -36.0, FD_TOP - 1.0, -140 + i * 54, -36.9, FD_TOP + 6.0, 0.07, 4));
    /* team flashes on the bow and at the round-down, on the deck          */
    B.T.add(box(THREE, 2.0, 20.0, 0.2, X_BOW - 1.6, 0.0, FD_TOP + 0.1));
    B.T.add(box(THREE, 2.0, 24.0, 0.2, -167.0, 1.0, FD_TOP + 0.1, 0, 0, 0.123));

    /* ============================================================ island
       Heights above the deck (April 1962 bow view against the 22 m box;
       Cape Horn broadside against the 342 m length): base column 0-7.6,
       radar box 7.6-16.0, two raked window tiers 16.0-21.0, the open top
       with its dark windscreens 21.0-22.0, the beehive 22.0-32.6, the yard
       at 36, the masthead at 42.                                           */
    var Z0 = FD_TOP;
    var ZB0 = Z0 + 7.6, ZB1 = Z0 + 16.0, ZT1 = Z0 + 18.5, ZT2 = Z0 + 21.0, ZH0 = Z0 + 22.0;
    var BOXP = sq(IX, IY, IB, IB);
    /* base column, a hand's breadth narrower at the top                    */
    B.S.add(frustum(THREE, sq(IX, IY, IC, IC), Z0, ZB0, 1.0, 0.99));
    /* doors and the vent louvres along its foot                            */
    [[IX + IC + 0.06, IY + 3.0, 0], [IX + IC + 0.06, IY - 4.0, 0], [IX - 2.0, IY - IC - 0.06, 1], [IX + 3.5, IY + IC + 0.06, 1]].forEach(function (d) {
      B.K.add(box(THREE, d[2] ? 1.0 : 0.12, d[2] ? 0.12 : 1.0, 2.0, d[0], d[1], Z0 + 1.0));
    });
    /* team band round the head of the column, under the box's overhang    */
    B.T.add(frustum(THREE, sq(IX, IY, IC, IC), ZB0 - 1.0, ZB0 - 0.2, 1.006, 1.006));

    /* the radar box: a flat soffit overhanging the column on every side    */
    B.S.add(plate(THREE, BOXP, ZB0, ZB1));
    /* SCANFAR. On each face one square AN/SPS-33 (7.0 x 7.6 m) at one end
       and one wide AN/SPS-32 (13.0 x 6.4 m) at the other, pinwheel-fashion:
       the forward face carries its SPS-33 at the starboard end and the
       starboard face at the after end (both photographed), so the after
       face has it at the port end and the port face at the forward end.
       On the fore and aft faces the SPS-32 sits low, with a window strip
       over it on the forward face; on the side faces it sits high.         */
    function arrayPanel(face, u0, u1, z0, z1) {
      /* face: 0 fwd (+x), 1 port (+y), 2 aft (-x), 3 stbd (-y); u along the
         face, left to right as seen from outside                           */
      var nx = [1, 0, -1, 0][face], ny = [0, 1, 0, -1][face];
      var tx = -ny, ty = nx;                       /* along the face, CCW   */
      var w = u1 - u0, uc = (u0 + u1) * 0.5, zc = (z0 + z1) * 0.5, hgt = z1 - z0;
      var cx0 = IX + nx * IB + tx * uc, cy0 = IY + ny * IB + ty * uc;
      var rot = Math.atan2(ty, tx);
      /* a smooth slab standing 0.8 m proud of the box wall, so its edges
         throw the shadow lines both close-ups show between the arrays     */
      B.R.add(box(THREE, w, 0.8, hgt, cx0 + nx * 0.4, cy0 + ny * 0.4, zc, 0, 0, rot));
      /* the dark joint round its back edge, where it meets the wall       */
      B.K.add(box(THREE, w + 0.3, 0.12, hgt + 0.3, cx0 + nx * 0.06, cy0 + ny * 0.06, zc, 0, 0, rot));
    }
    var E = IB - 0.45;
    /* forward face: u runs from starboard (-) to port (+)                  */
    arrayPanel(0, -E, -E + 7.0, ZB0 + 0.35, ZB0 + 7.95);
    arrayPanel(0, -E + 7.6, E, ZB0 + 0.35, ZB0 + 6.75);
    B.G.add(box(THREE, 0.2, 12.4, 1.0, IX + IB + 0.06, IY + (-E + 7.6 + E) * 0.5, ZB0 + 7.55));
    /* port face: u runs from forward (-) to aft (+) seen from outboard     */
    arrayPanel(1, -E, -E + 7.0, ZB0 + 0.35, ZB0 + 7.95);
    arrayPanel(1, -E + 7.6, E, ZB0 + 1.55, ZB0 + 7.95);
    /* after face: u from port (-) to starboard (+)                         */
    arrayPanel(2, -E, -E + 7.0, ZB0 + 0.35, ZB0 + 7.95);
    arrayPanel(2, -E + 7.6, E, ZB0 + 0.35, ZB0 + 6.75);
    /* starboard face: u from aft (-) to forward (+)                        */
    arrayPanel(3, -E, -E + 7.0, ZB0 + 0.35, ZB0 + 7.95);
    arrayPanel(3, -E + 7.6, E, ZB0 + 1.55, ZB0 + 7.95);

    /* the two window tiers: wider than the box forward and to starboard,
       their glazing raked outward, a visor plate over each                 */
    var TIER = [[IX + IB + 1.5, IY - IB - 1.2], [IX + IB + 1.5, IY + IB + 0.5],
                [IX - IB - 0.3, IY + IB + 0.5], [IX - IB - 0.3, IY - IB - 1.2]];
    [[ZB1, ZT1], [ZT1, ZT2]].forEach(function (zz) {
      B.S.add(frustum(THREE, TIER, zz[0], zz[0] + 0.9, 0.985, 0.985));
      B.G.add(frustum(THREE, TIER, zz[0] + 0.9, zz[1] - 0.25, 0.965, 1.0));
      B.S.add(plate(THREE, scalePts(TIER, 1.02), zz[1] - 0.25, zz[1]));
      /* window mullions on the fore and starboard faces                    */
      for (var q = 0; q < 12; q++) {
        var yy = IY - IB - 1.2 + (q + 0.5) * (2 * IB + 1.7) / 12;
        B.S.add(box(THREE, 0.16, 0.2, zz[1] - zz[0] - 1.15, IX + IB + 1.55, yy, zz[0] + 0.9 + (zz[1] - zz[0] - 1.15) * 0.5, 0, 0.06, 0));
        var xx = IX - IB - 0.3 + (q + 0.5) * (2 * IB + 1.8) / 12;
        B.S.add(box(THREE, 0.2, 0.16, zz[1] - zz[0] - 1.15, xx, IY - IB - 1.25, zz[0] + 0.9 + (zz[1] - zz[0] - 1.15) * 0.5, 0.06, 0, 0));
      }
    });
    /* the open top: a deck with dark weather screens all round (the black
       band of the April 1962 view), and a flag-bag wing to port            */
    var TOPP = scalePts(TIER, 0.98);
    B.S.add(plate(THREE, TOPP, ZT2, ZT2 + 0.3));
    for (k = 0; k < 4; k++) {
      var p0 = TOPP[k], p1 = TOPP[(k + 1) % 4];
      var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
      B.K.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.15, 1.5, (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, ZT2 + 1.05, 0, 0, Math.atan2(ddy, ddx)));
    }
    B.S.add(plate(THREE, [[IX + 9.5, IY + IB], [IX + 9.5, IY + IB + 3.4], [IX + 1.0, IY + IB + 3.4], [IX + 1.0, IY + IB]], ZT2 - 0.3, ZT2));
    ringRail([[IX + 9.3, IY + IB + 0.2], [IX + 9.3, IY + IB + 3.2], [IX + 1.2, IY + IB + 3.2], [IX + 1.2, IY + IB + 0.2]], ZT2 + 1.0);
    B.S.add(box(THREE, 5.0, 2.6, 2.4, IX + 6.5, IY + IB + 1.7, ZT2 + 1.2));
    B.G.add(box(THREE, 5.1, 2.7, 0.8, IX + 6.5, IY + IB + 1.7, ZT2 + 1.7));

    /* --- the beehive: a lathe on the measured profile, three storeys -------- */
    /* as wide at the foot (10.8 m) as it is tall, two-thirds as wide at
       the top ring: the Cape Horn broadside and the April 1962 bow view    */
    var prof = [[5.4, 0.0], [5.45, 1.0], [5.25, 2.6], [4.9, 4.3], [4.5, 6.0],
                [4.05, 7.8], [3.7, 9.4], [3.6, 10.0], [3.95, 10.2], [3.95, 10.6], [0.0, 10.6]];
    var lp = prof.map(function (q) { return new THREE.Vector2(q[0], q[1]); });
    var hv = new THREE.LatheGeometry(lp, 28);
    hv.rotateX(PI / 2);
    hv.translate(IX, IY, ZH0);
    B.S.add(hv);
    /* its plinth on the open top                                           */
    B.S.add(cylZ(THREE, 5.5, 5.7, 0.6, 28, IX, IY, ZH0 - 0.6));
    /* The AA-8200 rows: four rows of dipole arms standing out of the dome,
       each leaning diagonally, the rows leaning alternately -- the
       herringbone of the close-up -- and over them the upper two rows in
       their piping radomes, two rings round the shoulder.                  */
    function rAt(h) {
      for (var q = 1; q < prof.length; q++)
        if (h <= prof[q][1]) return lerp(prof[q - 1][0], prof[q][0], (h - prof[q - 1][1]) / (prof[q][1] - prof[q - 1][1]));
      return prof[prof.length - 1][0];
    }
    [3.7, 5.0, 6.3, 7.6].forEach(function (h, row) {
      var nEl = 24, rr = rAt(h) + 0.3;
      for (var e = 0; e < nEl; e++) {
        var th = (e + (row % 2) * 0.5) / nEl * PI * 2;
        var arm = new THREE.BoxGeometry(0.28, 0.75, 1.9);
        arm.rotateY(row % 2 ? 0.75 : -0.75);
        arm.rotateZ(th + PI / 2);
        arm.translate(IX + Math.cos(th) * rr, IY + Math.sin(th) * rr, ZH0 + h);
        B.R.add(arm);
      }
    });
    [8.7, 9.45].forEach(function (h) {
      var tor = new THREE.TorusGeometry(rAt(h) + 0.25, 0.3, 5, 28);
      tor.translate(IX, IY, ZH0 + h);
      B.W.add(tor);
    });
    /* --- the top: rail, the drum at the mast foot, mast, yard, head dome --- */
    var ZHT = ZH0 + 10.6;
    var topRing = [];
    for (k = 0; k < 10; k++) topRing.push([IX + Math.cos(k * PI / 5) * 3.8, IY + Math.sin(k * PI / 5) * 3.8]);
    ringRail(topRing, ZHT + 1.0);
    B.S.add(cylZ(THREE, 0.9, 0.9, 2.2, 10, IX, IY, ZHT));
    B.M.add(strut(THREE, IX, IY, ZHT + 2.2, IX, IY, Z0 + 41.2, 0.32, 6, 0.14));
    var ZY = Z0 + 36.0;
    B.M.add(box(THREE, 0.5, 25.0, 0.45, IX, IY, ZY));
    for (s = -1; s <= 1; s += 2) {
      /* braces from the beehive top out under the yard                    */
      B.M.add(strut(THREE, IX, IY + s * 2.6, ZHT + 0.2, IX, IY + s * 6.5, ZY - 0.2, 0.12, 4));
      B.M.add(strut(THREE, IX + 2.2, IY + s * 1.6, ZHT + 0.2, IX + 0.2, IY + s * 4.0, ZY - 0.2, 0.10, 4));
      /* whips standing off the yard, and the small boxes hung under it    */
      for (j = 0; j < 4; j++) {
        var wy = IY + s * (3.0 + j * 3.0);
        B.M.add(strut(THREE, IX, wy, ZY + 0.2, IX, wy, ZY + (j === 3 ? 4.4 : 2.6), 0.05, 4));
      }
      B.S.add(box(THREE, 0.6, 0.9, 0.8, IX, IY + s * 11.6, ZY - 0.6));
      B.S.add(box(THREE, 0.6, 0.7, 0.6, IX, IY + s * 6.0, ZY - 0.5));
    }
    /* the radial array round the mast above the yard (close-up)           */
    for (k = 0; k < 12; k++) {
      var tk = k * PI / 6;
      B.M.add(strut(THREE, IX, IY, Z0 + 38.6, IX + Math.cos(tk) * 2.6, IY + Math.sin(tk) * 2.6, Z0 + 38.9, 0.05, 3));
    }
    B.S.add(cylZ(THREE, 0.35, 0.35, 0.5, 8, IX, IY, Z0 + 38.4));
    B.W.add(sphere(THREE, 0.75, 10, 6, IX, IY, Z0 + 41.6));
    /* a short signal yard and the ensign gaff aft                          */
    B.M.add(box(THREE, 0.3, 8.0, 0.25, IX - 0.3, IY, Z0 + 39.6));
    B.M.add(strut(THREE, IX, IY, Z0 + 34.6, IX - 4.0, IY, Z0 + 36.6, 0.07, 4));

    /* two mesh dishes on pedestals, at the forward port corner of the top
       (April and October 1962) and the after starboard corner (1963-64)    */
    [[IX + IB - 0.6, IY + IB - 0.6, 0.6], [IX - IB + 0.8, IY - IB - 0.2, -2.4]].forEach(function (d) {
      B.S.add(cylZ(THREE, 0.45, 0.6, 3.2, 8, d[0], d[1], ZT2 + 0.3));
      /* the dish as a shallow drum, so it reads from both faces in one
         single-sided batch; its face turned outboard on the heading      */
      var dish = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 12);
      dish.scale(1, 1, 0.8);
      dish.rotateZ(PI / 2);
      dish.rotateY(-0.25);
      dish.rotateZ(d[2]);
      dish.translate(d[0], d[1], ZT2 + 4.3);
      B.M.add(dish);
      B.M.add(strut(THREE, d[0], d[1], ZT2 + 3.5, d[0], d[1], ZT2 + 4.5, 0.15, 5));
    });

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (kk) {
      var mm = B[kk].mesh(THREE, T[kk]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* Registration: the 1960s NATO carrier def, nato_e60_carrier. len is the
   measured X extent, stern corner to the bridle-horn tips.                 */
UNIT_MODELS["nato_e60_carrier"] = {
  len: 342.3,
  build: function (THREE, M, C) { return HeroEnterpriseCVN65.build(THREE, M, C); }
};
