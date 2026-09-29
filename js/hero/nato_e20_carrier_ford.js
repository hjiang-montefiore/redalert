/* ============================================================================
   nato_e20_carrier_ford.js -- HERO model: USS Gerald R. Ford (CVN-78).
   Registered as carrier_n, which is also the stand-in hull that ERA_KIT
   repaints for every NATO-side carrier def that has no model of its own
   (carrier_b, carrier_f, the gbr and fra e50-e00 carriers, and the Kiev).

   The old carrier_n was a Nimitz wearing a Ford badge: bow number 68, four
   lifts with one to port abaft the waist, the island near midships and four
   arresting wires. Every one of those is what the Ford class changed.

   Measured off the reference photographs, which were read at known scale
   and are named here so the next person can check them:
     - "Overhead view of USS Gerald R. Ford (CVN 78) transiting the Atlantic
       Ocean, March 19, 2023" (US Navy, Wikimedia Commons). Nearly straight
       down, bow to starboard of frame. Deck outline, island, lifts,
       catapults, blast deflectors, landing lines, the three pendants, the
       lens and the bow number all come from a metre grid laid over this
       one. Registered on the lifts, which fall within 0.3 m along the ship;
       across it the shot is a few degrees off vertical and reads about 7%
       narrow, so it gives stations, and the widths come from the 78 m deck.
     - "Broadside view of USS Gerald R. Ford (CVN-78) underway on 8 April
       2017" (PORT side: bow to the left, the island on the far edge).
       Deck height, island and mast heights, the flared bow, the stern
       overhang.
     - "Bow view ..." (8 April 2017) and "221009-N-TL968-1248" (9 Oct 2022):
       the island's forward face, the square radar faces and the mast.
     - "Stern view ... 9 April 2017" (port quarter): the port lift.

   What has to read at a glance:
     - 337 m overall, 78 m across the flight deck, 41 m on the waterline,
       12 m draught, 76 m keel to masthead. Deck 18.8 m above the waterline:
       the broadside reads 16.7-17.6 m raw, but it is taken from about 5.5
       degrees up (the far deck edge shows 35 px above the near one), and
       the near deck edge overhangs the waterline under it by 15-20 m, so it
       projects 1.5-1.9 m low. Corrected, the three stations give 18.5-19.5.
     - A SMALL ISLAND SET WELL AFT on the starboard edge: 140 ft (43 m)
       further aft than a Nimitz's and 3 ft further outboard. Its main block
       spans x -99 .. -75 here, about a quarter of the length from the stern,
       and it is barely 13 m across.
     - The DUAL BAND RADAR: three faces, one forward and one on each after
       quarter, each carrying a big SPY-4 volume-search array low and a
       smaller SPY-3 array high. CVN-78 is the only ship of the class with
       this fit; CVN-79 onward carry SPY-6(V)3 instead. No rotating radars
       and no Mk 95 illuminators, because the SPY-3 guides the ESSM.
     - ONE tall tapered mast off the island roof with two yards and a big
       radome at the head, two SATCOM domes on the island roof.
     - THREE deck-edge lifts, not four: two to starboard, both forward of the
       island with a parking gap between them, and the third on the port
       QUARTER, right at the stern corner.
     - Four EMALS tracks (two up the bow, two in the waist, nearly parallel
       to the centreline) and THREE Advanced Arresting Gear pendants,
       crossing the landing axis at x -106.3, -93.5 and -80.6, 13 m apart,
       each with its dark trough and sheave out past both landing lines. The
       landing lines measure 8.5 degrees off the centreline, and the
       centreline runs solid yellow and white in lengths of 14-17 m from
       the ramp to the wires, then dashed.
     - Defence: Mk 29 ESSM launchers on the port forward and starboard after
       sponsons, Mk 49 RAM on the other two, three Phalanx near them, and
       the published four M2 .50 cal mounts on catwalk tubs.
     - The hull flares hard from the hangar deck out to the flight deck, and
       under the bow the flare closes to a sharp raked stem over a bulb.

   Model space: +X bow, +Y port, +Z up. Real metres, waterline at z = 0,
   keel at z = -12, flight deck at z = 18.8. render3d.js stands the model up
   with rotation.x = -PI/2 and scales it by its measured X extent, which is
   the flight deck: nothing is allowed to stick out past either end of it.

   Materials are the house three tiers: SKIN (painted steel with procedural
   CanvasTextures: hull plating, flight deck, island plate), METAL, GLASS,
   plus a few flat colours (radar faces, radomes, the parked aircraft) and
   the team material, which is exactly C.team because this key stands in
   for thirteen other carriers and eraPaint only leaves a material alone if
   it matches the team colour. The island's hull number is painted in a
   spare corner of the deck canvas rather than costing a material and a
   draw of its own. The canvases depend on nothing but the ship, so they
   are painted once per page and shared by every build.

   Every static part is merged into ONE mesh per material. The ship is the
   biggest thing on the map and every mesh costs a draw call and a shadow
   draw, so some 12,000 triangles go out in fifteen draws where a mesh per
   part would take six hundred. The one exception is the starboard after
   Phalanx, which is the named "turret" the renderer trains.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroFordCVN = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 337.0;              /* flight deck, end to end: x -168.5..168.5 */
  var FD_TOP = 18.8;               /* flight deck above the waterline          */
  var FD_TH  = 1.4;                /* flight deck plate and its girders        */
  var FD_BOT = FD_TOP - FD_TH;     /* 17.4: gallery deck, top of the hull loft */
  var KEEL   = -12.0;              /* 39 ft draught                            */
  var KNUCK  = 9.2;                /* hangar deck: where the flare starts      */
  var HX0 = -160.0, HX1 = 166.8;   /* hull loft: transom, stem head            */

  /* The landing area. Its two edge lines were read off the overhead at
     y = 10.9 + 0.147 x and y = 28.0 + 0.147 x: 8.4 degrees, 17 m apart.  */
  var ANG = 8.5 * PI / 180, CA = Math.cos(ANG), SA = Math.sin(ANG);
  var LA_Y0 = 19.45, LA_HW = 8.5;
  /* a point s metres along the landing axis, o metres to port of it */
  function la(s, o) { return [s * CA - o * SA, LA_Y0 + s * SA + o * CA]; }
  /* The three AAG pendants, as stations along that axis. On the overhead
     they cross the centreline at x -106, -93.5 and -80.5, 13 m apart: two
     separate readings agree within half a metre, on a grid pinned to the
     lifts, which it places within 0.3 m. The Fresnel lens stands abeam
     the middle one, on the platform the overhead shows at x -92 to -88. */
  var PEND = [-107.5, -94.5, -81.5];

  /* ------------------------------------------------------ the deck outline
     Plan view, bow first, down the port side, across the stern and forward
     up the starboard side. The three lifts are NOTCHES in this outline and
     their own slabs fill them, so a lift reads as a separate plate with the
     hangar opening dark underneath it, as it does on the ship.           */
  var DECK = [
    [ 168.5, -12.0], [ 168.5,  12.5], [ 166.8,  15.6],
    [ 140.0,  17.4], [ 112.0,  19.4], [  89.5,  21.0],
    [  59.5,  41.6],                                   /* angled deck corner */
    [  20.0,  41.4], [ -20.0,  40.9], [ -58.0,  40.2], [ -62.0,  38.6],
    [-139.0,  38.6], [-141.5,  35.4],
    [-141.5,  20.6], [-163.5,  20.6],                  /* No.3 lift notch    */
    [-168.5,  16.5], [-168.5, -12.0], [-167.0, -20.0], [-164.5, -33.5],
    [-163.0, -35.0],
    [ -75.0, -35.0], [ -75.0, -19.4], [ -49.0, -19.4], [ -49.0, -35.0],
    [   2.0, -35.0], [   2.0, -19.4], [  28.0, -19.4], [  28.0, -35.0],
    /* the starboard bow cut: a short steep diagonal from x 75 to 91.5, the
       catwalk running down it, and the RAM sponson sitting LOW outboard of
       the straight edge forward of it, not under a wedge of flight deck  */
    [  75.0, -34.8], [  91.5, -18.6], [ 108.0, -16.9], [ 140.0, -15.6],
    [ 166.8, -14.6],
  ];
  /* 85 x 52 ft lifts to starboard; the port one is the 70 ft aft lift     */
  var LIFTS = [
    { x0:    2.0, x1:   28.0, y0: -35.0, y1: -19.4, s: -1 },
    { x0:  -75.0, x1:  -49.0, y0: -35.0, y1: -19.4, s: -1 },
    { x0: -163.5, x1: -141.5, y0:  20.6, y1:  35.4, s:  1 },
  ];

  /* island main block: 18 m long, 12.7 m across, its outboard face a
     hand's breadth outside the deck edge                                  */
  var ISL_X0 = -93.0, ISL_X1 = -75.0, ISL_YO = -35.45, ISL_YI = -22.75;
  var ISL_YC = (ISL_YO + ISL_YI) * 0.5;

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
     exactly where the hull stops flaring and the hangar opening begins.  */
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
     mesh. Parts are built with ordinary three.js geometry, moved into
     model space, then appended as plain triangles.                       */
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
  /* an ExtrudeGeometry's caps and sides into two different batches       */
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

  /* geometry placed in model space: rotate (XYZ Euler), then translate    */
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
  /* vertical cylinder (axis +Z) standing on z0                             */
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  /* a round bar between two points: struts, braces, shafts, masts        */
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
    g.rotateX(PI / 2);                             /* poles on the Z axis    */
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(THREE, g, x, y, z);
  }

  /* A closed frustum on a convex plan: bottom outline at zb, the same
     outline scaled by sTop about its own centroid at zt. Every face of the
     Ford's island leans inboard, and this is how it gets that for free.
     pts run counter-clockwise seen from above. UVs are in metres / 16 so
     the plate texture tiles at a constant size whatever the block.      */
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
  /* the same outline, counter-clockwise seen from above, which is the
     order frustum() needs for its faces to point out                      */
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* a flat plate on a plan outline (any convex polygon), z0 to z1        */
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  /* the same plate drawn in the XZ plane (outline as [x, z]) and extruded
     th across Y: fins, vertical tails, blast deflectors                  */
  function vplate(THREE, pts, th) {
    var g = frustum(THREE, pts, -th * 0.5, th * 0.5, 1, 1);
    g.rotateX(PI / 2);                     /* plan y -> z; extrusion -> -y */
    return g;
  }
  /* an outline scaled about its own centroid: balconies, visors, roofs   */
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function centroid(pts) {
    var cx = 0, cy = 0, i;
    for (i = 0; i < pts.length; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    return [cx / pts.length, cy / pts.length];
  }

  /* ============================================================= textures */
  var PAINT = { hull: 0x737a81, sup: 0x7d858c, deck: 0x464b50 };

  /* The hull is two materials split at the waterline, each with its own
     canvas: haze grey topsides and the red bottom. Row 0 of each canvas is
     its top edge (flipY puts v = 1 there), so v runs straight from z and
     the boot topping sits on the waterline at every station, fine bow and
     full midbody alike.                                                   */
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
    /* haze grey above, the dark red US carriers wear below               */
    band(zTop, 0, hx(PAINT.hull));
    band(0, zBot, "#5e2d29");
    for (i = 0; i < 300; i++) {
      z = zBot + R() * (zTop - zBot);
      var under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    /* boot topping: black from a metre under the waterline to 1.8 m above,
       the band every photograph of her shows at the waterline            */
    band(1.8, -1.0, "#17191c");
    /* plate butts and strakes                                             */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 72; i++) {
      x = i * W / 72 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(i * 2.0);
    for (i = 1; i < 5; i++) hline(-i * 2.4);
    /* the hangar-deck strake, where the flare starts: it catches the light */
    g.strokeStyle = "rgba(255,255,255,0.20)"; g.lineWidth = 3; hline(KNUCK);
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 2; hline(KNUCK - 0.35);
    /* a new ship: light rust weeping from the scuppers only               */
    if (zTop > 4) {
      for (i = 0; i < 70; i++) {
        x = R() * W; y = rowZ(4 + R() * 12); len = (2 + R() * 6) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.34)");
        gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
        g.fillStyle = "rgba(24,22,20,0.38)"; g.fillRect(x - 1, y - 1, 4 + R() * 3, 3);
      }
    }
    /* draught marks, forward and aft                                      */
    g.fillStyle = "rgba(236,238,240,0.9)";
    [148.0, -156.0].forEach(function (mx) {
      for (var k = 0; k < 7; k++) {
        var zz = -6 + k * 1.0;
        if (zz > zBot && zz < zTop) g.fillRect((mx - HX0) * PXX, rowZ(zz) - 1, 7, 2);
      }
    });
    var t = finish(THREE, cv);
    /* clamped, so the boot topping on one edge never bleeds onto the other */
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  /* island and gallery plate: seams, doors, a little weathering           */
  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4478), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
    }
    /* watertight doors and vents stay in the paint                        */
    g.fillStyle = "rgba(20,22,25,0.42)";
    for (i = 0; i < 18; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
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
     One plan-view painting of the whole deck, sampled through the slab's
     shape-space UVs, so every line sits where the overhead photograph puts
     it and none of it costs a triangle. The lift slabs sample the same
     painting, so their outlines line up across the joint.                */
  var DX0 = -170, DX1 = 170, DY0 = -38, DY1 = 44;
  /* The island's hull number lives in a corner of the same painting that
     no deck ever samples (off the port bow, 13 m clear of the deck edge,
     so even the smallest mip does not bleed it onto the deck). The two
     number panels map their UVs onto it. 18 x 9 m of canvas for a
     9.6 x 4.8 m panel is ~110 px across: several times what the closest
     zoom puts on screen.                                                 */
  var NUMR = { x0: 149.0, x1: 167.0, y0: 30.0, y1: 39.0 };

  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1106), i, p, q;
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
    function mrect(xa, ya, xb, yb, col) {
      mpoly([[xa, ya], [xb, ya], [xb, yb], [xa, yb]], col);
    }

    /* --- non-skid ----------------------------------------------------- */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 460; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 10 + R() * 46);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 5000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    /* tie-down pad-eyes on a 3 m grid, and the plating seams             */
    g.fillStyle = "rgba(12,14,16,0.30)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }

    /* --- landing area: scuffed darker, tyre marks thickest at the wires */
    g.save();
    g.beginPath();
    p = la(-175, LA_HW); g.moveTo(cx(p[0]), cy(p[1]));
    p = la(95, LA_HW);   g.lineTo(cx(p[0]), cy(p[1]));
    p = la(95, -LA_HW);  g.lineTo(cx(p[0]), cy(p[1]));
    p = la(-175, -LA_HW); g.lineTo(cx(p[0]), cy(p[1]));
    g.closePath(); g.fillStyle = "rgba(18,21,24,0.26)"; g.fill();
    g.restore();
    g.fillStyle = "#0c0e10";
    for (i = 0; i < 520; i++) {
      var s0 = -140 + Math.pow(R(), 1.6) * 150, o0 = (R() - 0.5) * 9;
      p = la(s0, o0);
      g.globalAlpha = 0.07 + R() * 0.08;
      g.save(); g.translate(cx(p[0]), cy(p[1])); g.rotate(-ANG);
      g.fillRect(0, 0, (4 + R() * 16) * SX, 1.5 + R() * 2.5);
      g.restore();
    }
    g.globalAlpha = 1;

    /* --- landing lines, centreline, foul line --------------------------- */
    mline(la(-176, LA_HW), la(100, LA_HW), 0.45, "#e8ecee");
    mline(la(-176, -LA_HW), la(100, -LA_HW), 0.45, "#e8ecee");
    /* The centreline is SOLID from the ramp to the wires, in alternating
       lengths measured off the overhead: yellow from the ramp to x -155,
       white to -138, yellow again to -123, white to -109. Forward of the
       wires it is white dashes. The orange along it at the wires is not
       paint: it is tyre rubber and hydraulic staining, painted over it
       a few lines further on.                                             */
    var CL = [[-176, -156.7, "#d8a23a"], [-156.7, -139.5, "#e8ecee"],
              [-139.5, -124.7, "#d8a23a"], [-124.7, -110.2, "#e8ecee"]];
    CL.forEach(function (c) { mline(la(c[0], 0), la(c[1], 0), 0.55, c[2]); });
    mline(la(-110.2, 0), la(100, 0), 0.40, "#e8ecee", [6, 6]);
    mline(la(-176, -LA_HW - 3.2), la(60, -LA_HW - 3.2), 0.30, "rgba(178,58,48,0.8)", [3, 3]);
    /* edge bars every 24 m along both lines, the marks the photos show   */
    for (i = 0; i < 11; i++) {
      var sb = -150 + i * 24;
      mline(la(sb, LA_HW), la(sb, LA_HW + 3.2), 0.9, "#e8ecee");
      mline(la(sb, -LA_HW), la(sb, -LA_HW - 3.2), 0.9, "#e8ecee");
    }
    /* rubber and hydraulic fluid where the hooks come down: a rust-orange
       smear along the axis through the wires, and a band across it at
       the last pendant, both as the overhead shows them                  */
    for (i = 0; i < 90; i++) {
      var ss = -112 + R() * 40, so = (R() - 0.5) * 3.2;
      p = la(ss, so);
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillStyle = R() < 0.6 ? "#8a4a22" : "#5c3a24";
      g.save(); g.translate(cx(p[0]), cy(p[1])); g.rotate(-ANG);
      g.fillRect(0, 0, (3 + R() * 10) * SX, 1.2 + R() * 2.2);
      g.restore();
    }
    g.globalAlpha = 1;
    mline(la(PEND[2] - 0.6, -4.5), la(PEND[2] - 0.6, 4.5), 1.3, "rgba(150,82,36,0.35)");
    /* THREE Advanced Arresting Gear pendants, square to the landing axis.
       Past each landing line the wire runs into a dark trough that angles
       outboard and aft for about six metres to the deck sheave, the white
       disc at its outer end: all six show plainly on the overhead.       */
    PEND.forEach(function (sw) {
      mline(la(sw, -LA_HW - 0.6), la(sw, LA_HW + 0.6), 0.30, "#15181b");
      for (var sd = -1; sd <= 1; sd += 2) {
        var t0 = la(sw + 6.2, sd * (LA_HW + 0.4)), t1 = la(sw + 1.7, sd * (LA_HW + 4.9));
        mline(t0, t1, 1.25, "rgba(22,20,19,0.82)");
        mline(t0, t1, 0.25, "rgba(96,70,52,0.5)");
        var sh = la(sw + 0.9, sd * (LA_HW + 5.9));
        g.fillStyle = "#e3e6e7";
        g.beginPath(); g.arc(cx(sh[0]), cy(sh[1]), 0.65 * SX, 0, PI * 2); g.fill();
      }
    });

    /* --- EMALS: the linear-motor covers read as pale strips with the
       shuttle slot down the middle. Two up the bow, two in the waist,
       each starting just forward of its blast deflector.                  */
    function cat(a, b) {
      mline(a, b, 2.3, "#858c92");
      mline(a, b, 0.32, "#121417");
      mline([a[0] - 0.6, a[1] - 1.6], [a[0] - 0.6, a[1] + 1.6], 0.5, "#e8ecee");
    }
    CATS.forEach(function (c) { cat(c[0], c[1]); });
    /* The waist deflectors lie flush, so they are paint and nothing else:
       on the overhead each is a rust-tan frame round a panel scorched
       nearly black down the middle, where the exhaust hits.               */
    function jbdFlush(xa, ya, xb, yb) {
      mrect(xa, ya, xb, yb, "#6e5139");
      var gg = g.createLinearGradient(cx(xa), 0, cx(xb), 0);
      gg.addColorStop(0, "rgba(38,30,24,0.55)");
      gg.addColorStop(0.5, "rgba(20,18,17,0.95)");
      gg.addColorStop(1, "rgba(38,30,24,0.55)");
      g.fillStyle = gg;
      g.fillRect(cx(xa + 0.35), cy(yb - 0.35), (xb - xa - 0.7) * SX, (yb - ya - 0.7) * SY);
    }
    jbdFlush(-55.5, 18.7, -51.3, 29.3);
    jbdFlush(-73.5, 28.7, -69.3, 39.7);
    /* bow deflector wells behind the raised panels                        */
    mrect(33.0, -21.6, 37.2, -10.6, "rgba(20,22,25,0.9)");
    mrect(33.0, -0.5, 37.2, 10.5, "rgba(20,22,25,0.9)");
    /* bow centreline, dashed                                              */
    mline([40, 0], [166, 0], 0.35, "#e8ecee", [3, 3]);

    /* --- helicopter spots down the port side of the waist --------------- */
    [[-30.7, 29.0], [-2.2, 29.5], [26.3, 30.0], [54.7, 30.5]].forEach(function (h, k) {
      mline([h[0] - 6, h[1]], [h[0] + 6, h[1]], 0.5, "#e8ecee");
      mline([h[0], h[1] - 3], [h[0], h[1] + 3], 0.5, "#e8ecee");
      g.save(); g.translate(cx(h[0] - 9), cy(h[1])); g.rotate(PI / 2);
      g.font = "bold " + Math.round(3.2 * SY) + "px Arial";
      g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = "#e8ecee"; g.fillText(String(6 - k), 0, 0);
      g.restore();
    });

    /* --- lift outlines: a red dashed safety border inside a white edge -- */
    LIFTS.forEach(function (L) {
      g.save();
      g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.35 * SY);
      g.setLineDash([2 * SX, 1.5 * SX]);
      g.strokeRect(cx(L.x0 + 0.8), cy(L.y1 - 0.8), (L.x1 - L.x0 - 1.6) * SX, (L.y1 - L.y0 - 1.6) * SY);
      g.restore();
      mline([L.x0, L.y0], [L.x0, L.y1], 0.30, "#0b0c0e");
      mline([L.x1, L.y0], [L.x1, L.y1], 0.30, "#0b0c0e");
      mline([L.x0, L.s > 0 ? L.y0 : L.y1], [L.x1, L.s > 0 ? L.y0 : L.y1], 0.30, "#0b0c0e");
    });

    /* --- the deck edge line, all the way round -------------------------- */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.7)"; g.lineWidth = Math.max(1.2, 0.6 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0]), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();

    /* --- the hull number at the bow, reading forward from aft, "7" to
       port and "8" to starboard, 11 m tall: measured on the overhead     */
    g.save();
    g.translate(cx(161.5), cy(1.6)); g.rotate(PI / 2);
    g.font = "bold " + Math.round(11.5 * SX) + "px Arial";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = 0.6 * SX; g.strokeStyle = "#e8ecee";
    g.strokeText("78", 0, 0);
    g.restore();

    /* --- the island's hull number, in its spare corner: white with a black
       edge on island grey, as painted on both faces of CVN-78's island     */
    var nx0 = cx(NUMR.x0), ny0 = cy(NUMR.y1), nw = (NUMR.x1 - NUMR.x0) * SX, nh = (NUMR.y1 - NUMR.y0) * SY;
    g.fillStyle = hx(PAINT.sup); g.fillRect(nx0 - 4, ny0 - 4, nw + 8, nh + 8);
    g.save();
    g.font = "bold " + Math.round(nh * 0.86) + "px Arial";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = Math.max(2, nh * 0.055); g.strokeStyle = "#16181b";
    g.strokeText("78", nx0 + nw * 0.5, ny0 + nh * 0.54);
    g.fillStyle = "#eef0f1"; g.fillText("78", nx0 + nw * 0.5, ny0 + nh * 0.54);
    g.restore();

    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* The paintings depend on nothing but the ship, never the team, so they
     are made once per page and every build shares them (pact_e80_mbt's
     _cv is the same idea). render3d builds this key once per team and era
     for itself and thirteen stand-ins, and icons3d once per sidebar icon;
     each would otherwise repaint four canvases, some 2.2 M texels and
     ten thousand canvas calls. Nothing in the game disposes a map
     (loading.js relies on the same sharing).                             */
  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      top:  hullTex(THREE, FD_BOT, 0, 256, 78017),
      bot:  hullTex(THREE, 0, KEEL, 128, 78018),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* EMALS tracks, [start, end]. Bow pair from the blast-deflector wells at
     x 33-37 to the bow; waist pair from their wells to the forward edge of
     the angled deck. The waist tracks run only 2-3 degrees off the axis.  */
  var CATS = [
    [[ 38.0, -16.1], [161.0,  -6.4]],
    [[ 38.0,   5.0], [161.0,   7.6]],
    [[-50.5,  24.0], [ 77.0,  29.4]],
    [[-68.5,  34.2], [ 63.4,  38.8]],
  ];

  /* ================================================================= hull
     Lofted from explicit station outlines, not the superellipse: a carrier
     section is a flat bottom, a tight bilge, near-vertical sides to the
     hangar deck, then a flare that runs out under the flight deck and is a
     different width to port and starboard at every station. The loft runs
     stern to bow and is wound outward (checked by signed volume).

     Lower levels: midship half-breadth, where each waterline starts to
     fine away toward the stem and how blunt it ends there, then where it
     starts to fine away aft and how far aft it would vanish. The two levels
     at -4 and -8.5 end blunt forward: that is the bulb, standing proud of a
     finer waterline above it. The table was trimmed until the hull below
     the waterline measured 101,500 m3 by signed volume: 104,000 t against
     her "about 100,000 long tons" (101,600 t) full load, on 312 m by 41.0 m
     at the waterline, block coefficient 0.66. The first cut, a full-bodied
     section with a short run, measured 134,000 t.                        */
  var LEV = [
    /*  z      yMid  xb0   stemX  p    q     xs0    xsEnd  ps              */
    [ -12.0,  8.0, -40, 146.0, 1.4, 1.00,  -15, -150, 1.3 ],
    [ -11.0, 14.0, -20, 149.0, 1.5, 0.85,  -25, -165, 1.5 ],
    [  -8.5, 18.0, -10, 153.0, 1.8, 0.60,  -40, -185, 1.7 ],
    [  -4.0, 19.9,   0, 154.4, 2.0, 0.55,  -55, -215, 2.0 ],
    [   0.0, 20.5,  10, 151.6, 1.7, 1.00,  -90, -270, 2.0 ],
    [   5.0, 20.8,  55, 156.0, 1.9, 0.85, -130, -400, 2.0 ],
    [  KNUCK, 21.3, 96, 160.0, 2.2, 0.75, -999, -9999, 1 ],
  ];
  /* keel height along the length: the run rises to a transom whose lower
     edge sits just above the waterline, and the forefoot rises into the
     bulb                                                                   */
  var KEELZ = [
    [-160, 0.8], [-150, -2.6], [-140, -5.4], [-128, -7.9], [-115, -9.8],
    [-100, -11.1], [-80, -11.8], [-60, -12.0],
    [140, -12.0], [144, -11.8], [146, -11.4], [148, -10.8], [150, -9.8],
    [152, -8.6], [153.5, -7.2], [154.6, -5.0],
    /* past the bulb the lowest point of the section IS the stem, raked
       back from 151.6 m on the waterline to 166.8 m under the deck edge */
    [155.5, 4.4], [156.0, 5.0], [160.0, KNUCK], [163.2, 13.0], [166.0, 16.2],
    [166.8, FD_BOT],
  ];
  /* the stem line above the waterline, keyed by height, and the V of the
     flared bow: the half-breadth grows by k metres per metre aft of it   */
  var STEM = [[0, 151.6], [5, 156.0], [KNUCK, 160.0], [13, 163.2], [16.2, 166.0], [FD_BOT, 166.8]];
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

  /* one side's outline at station x, keel to gallery deck, as [y, z]     */
  function sideRing(x, side) {
    var out = [], zk = tbl(KEELZ, x), k;
    /* levels under a risen keel (the run aft, the forefoot and stem
       forward) fold onto the keel line, a little inside the first level
       that survives, so the bottom turns up in a chine and never folds
       into a zero-thickness fin                                           */
    var first = 0;
    while (first < LEV.length - 1 && LEV[first][0] < zk) first++;
    var yFirst = lowY(first, x);
    for (k = 0; k < LEV.length; k++) {
      if (LEV[k][0] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([lowY(k, x), LEV[k][0]]);
    }
    var yK = out[LEV.length - 1][0];
    /* out to the deck edge less the metre of flight-deck overhang; inside a
       lift notch that collapses to the hangar side, so the hull goes
       straight up under each lift                                          */
    var edge = Math.max(yK, deckHalf(x, side) - 1.0), over = edge - yK;
    /* Where the overhang is modest (starboard, and the bow) the side stands
       nearly straight up past the hangar deck and a sponson shelf carries
       the deck edge out: light plating, then a dark band under the gallery,
       which is how the broadside photograph reads. Under the angled deck,
       twenty metres out to port, the knees start down at the hangar deck. */
    var zF = Math.max(zk, lerp(12.6, 10.2, clamp((over - 13) / 6, 0, 1)));
    /* the bow above the knuckle is a V: straight flare lines closing on a
       raked stem, the look of the bow photograph                          */
    var yF = Math.min(yK + 0.08 * over, wedge(x, zF));
    var y16 = Math.min(edge, wedge(x, 16.2));
    var y17 = Math.min(edge, wedge(x, FD_BOT));
    out.push([yF, zF], [y16, 16.2], [y17, FD_BOT]);
    return out;
  }

  function hullGeo(THREE) {
    /* stations: dense at the ends, a pair either side of every lift edge so
       the hangar openings come out square                                 */
    var xs = [-160, -157, -153, -148, -142, -136, -128, -120, -110, -100,
              -88, -76, -64, -52, -40, -28, -16, -4, 8, 20, 32, 44, 56, 68,
              80, 90, 100, 110, 118, 126, 133, 139, 144, 148, 151, 153.5,
              155.5, 157.5, 159.5, 161.5, 163.3, 164.8, 166.0, HX1];
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

    /* ring: top centre, port side top-down, keel centre, starboard bottom-up */
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
    /* topsides and bottom, split by each triangle's own mean height: every
       ring has a vertex on z = 0, so almost none straddle the waterline   */
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
    /* Faces are collected first, each corner keyed to its grid vertex, so
       the normals can be smoothed across neighbours: flat facets made the
       twisted quads of the bow flare and the run read as a zigzag. Only
       neighbours within 34 degrees are averaged, so the hangar-deck
       knuckle, the gallery deck and the square lift openings stay crisp. */
    var faces = [];
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;                                      /* < 1 mm2 */
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
    /* the transom: a flat cap, fanned from its own centre, keyed apart
       from the loft so its edge stays a hard corner                        */
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
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];                /* area-weighted */
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

  /* ========================================================== weapons
     Built in their own frame, gun or launcher along +X, ring centre at the
     origin, then dropped into the batches at a heading.                   */
  function phalanxParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.95, 1.05, 0.8, 10, 0, 0, 0)],
      ["W", box(THREE, 1.7, 1.5, 1.1, -0.15, 0, 1.35)],
      ["W", cylZ(THREE, 0.72, 0.72, 1.55, 10, -0.35, 0, 1.9)],
      ["W", sphere(THREE, 0.72, 10, 3, -0.35, 0, 3.45, 1, 1, 1, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.2, 0.24, 2.3, 8).rotateZ(-PI / 2), 1.65, 0, 1.3)],
      ["K", box(THREE, 0.5, 0.36, 0.36, 0.55, 0.72, 1.55)],
    ];
  }
  /* Mk 29: the eight-cell box launcher on its pedestal, trained outboard  */
  function mk29Parts(THREE) {
    return [
      ["S", cylZ(THREE, 0.9, 1.1, 1.1, 10, 0, 0, 0)],
      ["S", box(THREE, 0.7, 2.9, 1.2, 0, 0, 1.6)],
      ["S", box(THREE, 3.9, 2.5, 1.8, 0.2, 0, 2.7, 0, -0.33, 0)],
      ["K", box(THREE, 0.12, 2.2, 1.5, 2.08, 0, 3.37, 0, -0.33, 0)],
    ];
  }
  /* Mk 49: the 21-round RAM box on its mount                              */
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

  /* ====================================================== parked aircraft
     A sparse deck park only - the real air wing are separate units. Wings
     folded, as they sit on deck. Local frame: nose +X, wheels on z = 0.  */
  function hornetParts(THREE, M) {
    var P = [], s;
    var fus = M.loft(THREE, [
      { x:  9.1, w: 0.06, h: 0.06, zc: 1.95 },
      { x:  8.0, w: 0.45, h: 0.42, zc: 1.95 },
      { x:  5.8, w: 0.80, h: 0.78, zc: 2.05 },
      { x:  2.0, w: 1.75, h: 0.82, zc: 2.00 },
      { x: -3.0, w: 1.70, h: 0.80, zc: 1.95 },
      { x: -7.2, w: 1.35, h: 0.66, zc: 1.95 },
      { x: -9.1, w: 1.05, h: 0.52, zc: 1.95 },
    ], 6);
    P.push(["A", fus]);
    P.push(["K", place(THREE, new THREE.CircleGeometry(1.0, 6).rotateY(-PI / 2).scale(1, 1.0, 0.5), -9.1, 0, 1.95)]);
    P.push(["G", sphere(THREE, 1, 6, 3, 5.0, 0, 2.72, 1.9, 0.55, 0.55)]);
    for (s = -1; s <= 1; s += 2) {
      /* LEX, inner wing, folded outer panel, canted fin, stabilator       */
      P.push(["A", plate(THREE, s > 0 ? [[6.0, 0.7], [2.0, 1.8], [2.0, 0.7]] : [[6.0, -0.7], [2.0, -0.7], [2.0, -1.8]], 2.05, 2.25)]);
      P.push(["A", plate(THREE, s > 0 ? [[1.6, 1.5], [-3.6, 1.5], [-3.0, 4.6], [-0.4, 4.6]]
                                      : [[1.6, -1.5], [-0.4, -4.6], [-3.0, -4.6], [-3.6, -1.5]], 1.85, 2.10)]);
      P.push(["A", place(THREE, vplate(THREE, [[-0.3, 0], [-2.9, 0], [-2.5, 3.1], [-1.1, 3.1]], 0.2), 0, s * 4.7, 2.0, s * -0.14, 0, 0)]);
      P.push(["A", place(THREE, vplate(THREE, [[-4.4, 0], [-7.7, 0], [-8.2, 3.0], [-6.9, 3.0]], 0.2), 0, s * 1.15, 2.4, s * -0.35, 0, 0)]);
      P.push(["A", plate(THREE, s > 0 ? [[-7.0, 1.2], [-9.4, 1.2], [-9.4, 3.5], [-8.3, 3.5]]
                                      : [[-7.0, -1.2], [-8.3, -3.5], [-9.4, -3.5], [-9.4, -1.2]], 1.8, 1.95)]);
      P.push(["M", strut(THREE, -1.0, s * 1.4, 0.35, -1.0, s * 1.4, 1.5, 0.14, 5)]);
      P.push(["K", place(THREE, new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8), -1.0, s * 1.4, 0.4)]);
    }
    P.push(["M", strut(THREE, 6.2, 0, 0.3, 6.2, 0, 1.5, 0.12, 5)]);
    return P;
  }
  function hawkeyeParts(THREE, M) {
    var P = [], s;
    P.push(["A", M.loft(THREE, [
      { x:  8.8, w: 0.10, h: 0.12, zc: 1.75 },
      { x:  7.6, w: 0.90, h: 0.95, zc: 1.95 },
      { x:  4.5, w: 1.35, h: 1.30, zc: 2.05 },
      { x: -2.0, w: 1.35, h: 1.30, zc: 2.05 },
      { x: -6.4, w: 0.80, h: 0.85, zc: 2.30 },
      { x: -8.6, w: 0.30, h: 0.35, zc: 2.55 },
    ], 6)]);
    P.push(["G", sphere(THREE, 1, 6, 3, 6.6, 0, 2.85, 1.3, 0.95, 0.5)]);
    /* the 24 ft rotodome on its pylons                                     */
    P.push(["W", cylZ(THREE, 3.66, 3.66, 0.76, 16, -1.8, 0, 4.9)]);
    P.push(["A", strut(THREE, -0.6, 0, 3.2, -0.6, 0, 4.95, 0.28, 5)]);
    P.push(["A", strut(THREE, -3.2, 0, 3.1, -3.2, 0, 4.95, 0.28, 5)]);
    for (s = -1; s <= 1; s += 2) {
      /* nacelles, wing roots, and the outer wings folded back alongside   */
      P.push(["A", place(THREE, new THREE.CylinderGeometry(0.62, 0.55, 5.4, 8).rotateZ(-PI / 2), 1.6, s * 3.9, 2.85)]);
      /* the E-2D's eight-bladed NP2000 propellers, 4.1 m across, on
         spinners at the front of each nacelle                              */
      P.push(["K", place(THREE, new THREE.CylinderGeometry(0.06, 0.42, 0.9, 8).rotateZ(-PI / 2), 4.75, s * 3.9, 2.85)]);
      for (var pb = 0; pb < 8; pb++) {
        var bl = new THREE.BoxGeometry(0.08, 0.26, 1.7);
        bl.translate(0, 0, 1.2);
        bl.rotateY(0.35);
        bl.rotateX(pb * PI / 4 + 0.2);
        bl.translate(4.45, s * 3.9, 2.85);
        P.push(["K", bl]);
      }
      P.push(["A", plate(THREE, s > 0 ? [[2.8, 1.2], [-0.2, 1.2], [-0.2, 5.0], [2.3, 5.0]]
                                      : [[2.8, -1.2], [2.3, -5.0], [-0.2, -5.0], [-0.2, -1.2]], 3.2, 3.5)]);
      P.push(["A", place(THREE, vplate(THREE, [[-0.2, 0], [-9.8, 0], [-9.8, 1.9], [-0.2, 2.6]], 0.25), 0, s * 5.2, 2.2, 0, 0, 0)]);
      P.push(["M", strut(THREE, 1.4, s * 3.9, 0.3, 1.4, s * 3.9, 2.3, 0.14, 5)]);
      /* the quad fins' outer pair                                          */
      P.push(["A", place(THREE, vplate(THREE, [[-7.0, 0], [-8.9, 0], [-8.9, 2.4], [-7.6, 2.4]], 0.2), 0, s * 3.9, 2.6, 0, 0, 0)]);
      P.push(["A", place(THREE, vplate(THREE, [[-7.0, 0], [-8.9, 0], [-8.9, 2.0], [-7.6, 2.0]], 0.2), 0, s * 1.4, 2.8, 0, 0, 0)]);
    }
    P.push(["A", plate(THREE, [[-7.0, -4.0], [-7.0, 4.0], [-8.8, 4.0], [-8.8, -4.0]], 2.55, 2.8)]);
    P.push(["M", strut(THREE, 6.0, 0, 0.3, 6.0, 0, 1.3, 0.12, 5)]);
    return P;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j, s;

    /* ---------------------------------------------------- the materials */
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
    T.A = new THREE.MeshStandardMaterial({ color: 0x9aa2a8, roughness: 0.70, metalness: 0.10 });
    /* The team material is pulled a couple of depth steps toward the
       camera. Its flashes lie on the deck and its bands hug the island
       within centimetres; scaled by 0.31 that is under one step of a
       24-bit buffer at the zoom-out limit (near 2, dist 1200: ~0.043 world
       units), where they would shimmer against the plate beneath.         */
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

    /* a hand rail round a plan outline at height z: one thin bar a side  */
    function ringRail(pts, z) {
      for (var k = 0; k < pts.length; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
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
    /* the lifts: the same deck painting, a hair proud of the deck        */
    LIFTS.forEach(function (L) {
      var ls = new THREE.Shape();
      ls.moveTo(L.x0 + 0.15, L.y0 + (L.s > 0 ? 0.15 : 0)); ls.lineTo(L.x1 - 0.15, L.y0 + (L.s > 0 ? 0.15 : 0));
      ls.lineTo(L.x1 - 0.15, L.y1 - (L.s < 0 ? 0.15 : 0)); ls.lineTo(L.x0 + 0.15, L.y1 - (L.s < 0 ? 0.15 : 0));
      ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 1.1, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 1.1 + 0.02);
      Batch.addGroups(lg, [B.D, B.S]);
      /* the hangar opening behind it, and the two guide trunks            */
      var yo = L.s * (lowY(LEV.length - 1, (L.x0 + L.x1) * 0.5) + 0.05);
      B.K.add(box(THREE, L.x1 - L.x0 - 1.0, 0.3, 7.4, (L.x0 + L.x1) * 0.5, yo, KNUCK + 4.3));
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.9 : L.x0 + 0.9;
        B.S.add(box(THREE, 1.6, 2.6, FD_BOT - KNUCK, tx, yo + L.s * 1.25, (FD_BOT + KNUCK) * 0.5));
      }
    });

    /* ---------------------------- catwalks and safety nets round the edge
       Skipped along the lift notches, where the lift itself is the edge. */
    var n = DECK.length;
    function inNotch(a, b) {
      for (var k = 0; k < LIFTS.length; k++) {
        var L = LIFTS[k];
        var inx = function (q) { return q[0] >= L.x0 - 0.01 && q[0] <= L.x1 + 0.01; };
        var iny = function (q) { return q[1] >= L.y0 - 0.01 && q[1] <= L.y1 + 0.01; };
        if (inx(a) && inx(b) && iny(a) && iny(b)) return true;
      }
      return false;
    }
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1], L2 = Math.sqrt(dx * dx + dy * dy);
      if (L2 < 3 || inNotch(a, b)) continue;
      /* outward normal of a counter-clockwise outline                      */
      var ox = dy / L2, oy = -dx / L2, ang = Math.atan2(dy, dx);
      /* nothing hangs off the bow or the round-down: anything past the
         deck ends in X would shrink the whole ship in render3d. The net
         reaches 3.6 m out; a steep edge well inside the ends (the bow cut
         at x 75-91) keeps its catwalk, the stubs by the port lift do not. */
      var reach = Math.max(Math.abs(a[0]), Math.abs(b[0])) + Math.abs(ox) * 3.6;
      if (Math.abs(ox) > 0.75 || reach > LOA * 0.5 - 0.1) continue;
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5;
      /* the catwalk plank, a metre and a half under the deck edge          */
      B.S.add(box(THREE, L2, 1.5, 0.25, mx + ox * 0.9, my + oy * 0.9, FD_TOP - 1.45, 0, 0, ang));
      /* the safety net outboard of it, canted up and out about the edge.
         Its local +Y is outboard once turned to the edge's heading, so a
         positive roll about X lifts the outer lip.                         */
      var net = new THREE.BoxGeometry(L2 - 0.4, 2.0, 0.08);
      net.rotateX(0.21);
      net.rotateZ(ang - PI);
      net.translate(mx + ox * 2.45, my + oy * 2.45, FD_TOP - 0.62);
      B.K.add(net);
      /* the catwalk's outer hand rail: the fine light line that fringes
         the deck edge in every photograph                                  */
      B.M.add(box(THREE, L2, 0.08, 0.08, mx + ox * 1.6, my + oy * 1.6, FD_TOP - 0.25, 0, 0, ang));
    }

    /* life-raft canister racks along the gallery: the white rows under the
       deck edge in every broadside. Each rack is a cradle carrying three
       canisters with their ends turned outboard, which is why the
       broadsides show a row of round-ended white drums, not a white bar. */
    for (i = 0; i < n; i++) {
      var a3 = DECK[i], b3 = DECK[(i + 1) % n];
      var ex = b3[0] - a3[0], ey = b3[1] - a3[1], LE = Math.sqrt(ex * ex + ey * ey);
      if (LE < 18 || inNotch(a3, b3) || Math.abs(ey / LE) > 0.6) continue;
      var k3 = Math.floor(LE / 15), ea = Math.atan2(ey, ex);
      for (j = 0; j < k3; j++) {
        var f = (j + 0.5) / k3;
        var rx = a3[0] + ex * f + (ey / LE) * 0.5, ry = a3[1] + ey * f - (ex / LE) * 0.5;
        /* the cradle reaches back to the hull plating a metre inboard of
           the deck edge; the canisters clear the catwalk plank above      */
        B.S.add(box(THREE, 3.5, 2.3, 0.15, rx - (ey / LE) * 0.5, ry + (ex / LE) * 0.5, FD_TOP - 2.65, 0, 0, ea));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.15, 5);
          can.translate(d3 * 1.1, 0, 0.5);
          B.W.add(place(THREE, can, rx, ry, FD_TOP - 2.6, 0, 0, ea));
        }
      }
    }

    /* --------------------------------------------- stern and bow details */
    /* the enclosed stern gallery under the after overhang                 */
    B.S.add(box(THREE, 7.6, 46.0, 5.6, -164.0, -3.0, FD_BOT - 2.8));
    B.G.add(box(THREE, 0.12, 40.0, 1.0, -167.85, -3.0, FD_BOT - 2.4));
    /* the fantail opening in the transom                                   */
    B.K.add(box(THREE, 0.3, 22.0, 5.2, HX0 - 0.1, 0, 6.2));
    /* the stern sponson boat bay to starboard                              */
    B.K.add(box(THREE, 19.0, 0.3, 5.0, -114.5, -(lowY(6, -114.5) + 0.02), 6.4));

    /* anchors and hawse pipes, one each bow                                */
    for (s = -1; s <= 1; s += 2) {
      var ya = sideRing(154.0, s)[LEV.length - 1][0];
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.9, 0.9, 0.3, 10), 154.0, s * (ya + 0.25), 10.8, 0, 0, 0));
      B.M.add(box(THREE, 2.2, 0.5, 3.0, 153.0, s * (ya + 0.35), 8.6, 0, 0, 0));
      B.M.add(box(THREE, 3.2, 0.4, 0.5, 153.0, s * (ya + 0.4), 7.2));
    }

    /* bilge keels, a plate on each turn of the bilge over the midbody     */
    for (s = -1; s <= 1; s += 2) {
      var bk = lowY(1, 0) + 0.5;
      B.U.add(box(THREE, 110.0, 0.35, 1.6, -5.0, s * bk, -10.9, s * 0.75, 0, 0));
    }
    /* screws, shafts, struts, rudders: four five-bladed 21 ft screws      */
    var SH = [[7.0, -8.2, -138.0], [15.2, -7.2, -144.0]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var sy = s * SH[i][0], sz = SH[i][1], sx = SH[i][2];
        B.M.add(strut(THREE, -96.0, sy, sz + 2.2, sx - 0.8, sy, sz, 0.55, 6));
        B.M.add(strut(THREE, sx + 4.5, s * (SH[i][0] - 2.5), sz + 4.0, sx + 4.5, sy, sz, 0.35, 4));
        B.M.add(strut(THREE, sx + 4.5, s * (SH[i][0] + 2.5), sz + 4.0, sx + 4.5, sy, sz, 0.35, 4));
        B.M.add(place(THREE, new THREE.CylinderGeometry(0.55, 0.9, 1.8, 8).rotateZ(PI / 2), sx - 1.3, sy, sz));
        for (j = 0; j < 5; j++) {
          var bl = new THREE.BoxGeometry(0.35, 1.6, 2.9);
          bl.translate(0, 0, 1.75);
          bl.rotateZ(0.4);
          bl.rotateX(j * 2 * PI / 5);
          bl.translate(sx - 1.3, sy, sz);
          B.M.add(bl);
        }
      }
      B.M.add(box(THREE, 6.6, 0.8, 8.0, -152.5, s * 11.0, -6.3));
    }

    /* ----------------------------------------------------------- sponsons */
    /* a sponson: a deck plate, and under it a knee that sweeps back in to
       the hull side, so it reads as carried and not stuck on               */
    function sponson(pts, ztop, depth, side) {
      pts = ccw(pts);
      B.S.add(plate(THREE, pts, ztop - 0.6, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.25)]; });
      B.S.add(bracket(pts, knee, ztop - 0.6, ztop - 0.6 - depth));
    }
    function bracket(top, bot, zt, zb) {
      var pos = [], uv = [], nn = top.length, k;
      for (k = 0; k < nn; k++) {
        var q = (k + 1) % nn;
        var t0 = [top[k][0], top[k][1], zt], t1 = [top[q][0], top[q][1], zt];
        var b0 = [bot[k][0], bot[k][1], zb], b1 = [bot[q][0], bot[q][1], zb];
        pos.push(b0[0], b0[1], b0[2], b1[0], b1[1], b1[2], t1[0], t1[1], t1[2]);
        pos.push(b0[0], b0[1], b0[2], t1[0], t1[1], t1[2], t0[0], t0[1], t0[2]);
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
    var ZS = FD_TOP - 3.6;
    /* starboard forward: RAM, on the low sponson just forward of the bow
       cut. Its after face is square at x 91.5, its forward face raked
       back from the flight deck edge at x 111, as on the overhead.       */
    sponson([[91.5, -17.6], [111.5, -17.0], [111.0, -21.1], [104.2, -29.8], [91.5, -29.8]], ZS, 6.0, -1);
    emit(ramParts(THREE), 101.5, -25.6, ZS, -PI * 0.35);
    /* port forward: Mk 29 and a Phalanx                                    */
    sponson([[88, 19.0], [114, 19.0], [112, 28.0], [90, 28.0]], ZS, 6.0, 1);
    emit(mk29Parts(THREE), 106.0, 24.0, ZS, PI * 0.30);
    emit(phalanxParts(THREE), 94.5, 24.2, ZS, PI * 0.45);
    /* starboard after: Mk 29 and the Phalanx that trains                   */
    sponson([[-160, -33.0], [-134, -33.0], [-136, -42.0], [-158, -42.0]], ZS, 6.5, -1);
    emit(mk29Parts(THREE), -152.0, -38.0, ZS, -PI * 0.62);
    /* port after: RAM and a Phalanx, forward of the port lift              */
    sponson([[-134, 37.0], [-110, 37.0], [-112, 45.0], [-132, 45.0]], ZS, 6.0, 1);
    emit(ramParts(THREE), -126.5, 41.2, ZS, PI * 0.65);
    emit(phalanxParts(THREE), -116.5, 41.4, ZS, PI * 0.55);

    /* CVN-78's published gun fit besides the Phalanx is four M2 .50 cal
       machine guns, for a small boat coming in fast. Each sits on a round
       catwalk tub on a pedestal mount with a small shield: 1.65 m of gun,
       barrel on +X. Two a side; the spots are inferred from the broadsides,
       which show tubs on the gallery but cannot resolve what is in them.  */
    function m2(x, y, hdg) {
      /* the tub wall as eight plates: an open cylinder would lose its far
         side to back-face culling seen from above                          */
      var wall = [];
      for (var q = 0; q < 8; q++) {
        var aq = (q + 0.5) * PI / 4;
        wall.push(["S", box(THREE, 0.06, 0.78, 1.0, 0.93 * Math.cos(aq), 0.93 * Math.sin(aq), 0.75, 0, 0, aq)]);
      }
      emit(wall.concat([
        ["S", cylZ(THREE, 1.0, 1.0, 0.25, 8, 0, 0, 0)],
        ["M", cylZ(THREE, 0.08, 0.12, 1.1, 5, 0, 0, 0.25)],
        ["M", box(THREE, 0.9, 0.25, 0.28, 0.05, 0, 1.45)],
        ["M", place(THREE, new THREE.CylinderGeometry(0.035, 0.035, 1.15, 5).rotateZ(-PI / 2), 1.05, 0, 1.47)],
        ["S", box(THREE, 0.05, 0.75, 0.55, 0.42, 0, 1.55)],
      ]), x, y, FD_TOP - 1.95, hdg);
    }
    m2(118.0, -17.9, -PI * 0.5);
    m2(125.0, 20.2, PI * 0.5);
    m2(-20.0, -37.2, -PI * 0.5);
    m2(-40.0, 42.9, PI * 0.5);

    /* the named mount: its own group, ring centre at the origin, gun on +X,
       rotation left at zero so render3d's rotation.z trains it cleanly     */
    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(-142.0, -38.4, ZS);
    var tb = {};
    phalanxParts(THREE).forEach(function (pp) {
      if (!tb[pp[0]]) tb[pp[0]] = new Batch();
      tb[pp[0]].add(pp[1]);
    });
    Object.keys(tb).forEach(function (k) { var mm = tb[k].mesh(THREE, T[k]); if (mm) tur.add(mm); });
    root.add(tur);

    /* --------------------------------------------------------- deck gear */
    /* bow blast deflectors, raised: hinged on the forward edge and leaning
       aft at 55 degrees, 11 m wide. The face that meets the exhaust is the
       panel's deck side, non-skid like the deck around it, so it takes the
       deck material (its box UVs land on plain non-skid near x 0, y 0).
       The waist pair lie flush and are only paint, in deckTex.            */
    [[-16.1], [5.0]].forEach(function (c) {
      var jb = box(THREE, 4.2, 11.0, 0.3, 0, 0, 0);
      jb.translate(-2.1, 0, 0.15);
      jb.rotateY(0.96);
      jb.translate(37.3, c[0], FD_TOP);
      B.D.add(jb);
      for (var k = -1; k <= 1; k += 2)
        B.M.add(strut(THREE, 36.4, c[0] + k * 3.5, FD_TOP, 35.3, c[0] + k * 3.5, FD_TOP + 2.2, 0.18, 4));
      /* the hinge line along the forward edge                             */
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.22, 0.22, 11.0, 6), 37.3, c[0], FD_TOP + 0.05));
    });
    /* three AAG pendants, raised a hand's breadth on their bow springs,
       each ending at the landing lines in a low wire support              */
    PEND.forEach(function (sw) {
      var pa = la(sw, -LA_HW - 0.6), pb = la(sw, LA_HW + 0.6);
      B.M.add(strut(THREE, pa[0], pa[1], FD_TOP + 0.12, pb[0], pb[1], FD_TOP + 0.12, 0.09, 4));
      [pa, pb].forEach(function (pe) {
        B.K.add(place(THREE, new THREE.BoxGeometry(0.9, 1.2, 0.2), pe[0], pe[1], FD_TOP + 0.1, 0, 0, ANG));
      });
    });
    /* the Fresnel lens optical landing aid on the port edge, abeam the
       middle pendant on its platform at x -92 .. -88, and its datum arms
       out either side of the light box, square to the approach: the white
       bar across the deck edge at x -88.5 on the overhead                 */
    B.S.add(box(THREE, 4.0, 3.0, 0.3, -90.0, 40.2, FD_TOP - 0.2));
    B.S.add(box(THREE, 1.4, 1.6, 3.2, -90.0, 39.8, FD_TOP + 1.6));
    B.W.add(box(THREE, 0.3, 1.3, 2.6, -89.25, 39.8, FD_TOP + 1.8));
    B.M.add(box(THREE, 0.3, 7.0, 0.3, -89.4, 39.8, FD_TOP + 1.9));
    /* the tall folding pole mast at the forward starboard deck edge, and
       whips spaced along the starboard deck edge forward of the island   */
    B.M.add(strut(THREE, 60.0, -35.8, FD_TOP - 1.0, 60.0, -35.8, FD_TOP + 13.0, 0.18, 5, 0.08));
    for (i = 0; i < 4; i++)
      B.M.add(strut(THREE, -46 + i * 34, -36.1, FD_TOP - 1.0, -46 + i * 34, -37.0, FD_TOP + 6.5, 0.07, 4));
    /* deck-edge identification: team flashes on the bow and at the round-
       down, laid on the deck so they read from the RTS camera. 0.2 m
       proud and on the offset team material: 0.06 m scaled by 0.31 is
       half a depth step at full zoom-out.                                  */
    B.T.add(box(THREE, 2.0, 21.0, 0.2, 167.2, 0.3, FD_TOP + 0.1));
    B.T.add(box(THREE, 2.0, 26.0, 0.2, -167.2, 1.0, FD_TOP + 0.1));

    /* ------------------------------------------------------------ island
       Main block -93 .. -75, a lower annex aft to -99. Heights above the
       deck off the broadside: SPY-4 faces 8.5-13.5 m, bridge windows at
       15.5-17, SPY-3 faces 19-22, roof at 24, masthead 45.               */
    var Z0 = FD_TOP;
    var base = [[ISL_X1, ISL_YO], [ISL_X1, ISL_YI - 2.0], [ISL_X1 - 2.0, ISL_YI],
                [ISL_X0 + 1.5, ISL_YI], [ISL_X0, ISL_YI - 1.5], [ISL_X0, ISL_YO]];
    B.S.add(frustum(THREE, base, Z0, Z0 + 8.5, 1.0, 0.985));
    /* the annex under pri-fly, and its after glazing                       */
    var annex = [[-93.0, -34.3], [-93.0, -25.2], [-99.0, -26.4], [-99.0, -33.6]];
    B.S.add(frustum(THREE, annex, Z0, Z0 + 7.2, 1.0, 0.96));
    B.G.add(box(THREE, 0.14, 6.4, 1.3, -99.05, -30.0, Z0 + 5.6));
    /* number panels, both sides of the base block. Their UVs are set in
       deck-painting metres, onto the corner where deckTex paints the "78";
       u runs with the panel's own +X, which reads left to right from
       either side once the port panel is turned about                   */
    function numberPanel(flip) {
      var np = new THREE.PlaneGeometry(9.6, 4.8), uv = np.getAttribute("uv");
      for (var q = 0; q < uv.count; q++)
        uv.setXY(q, lerp(NUMR.x0, NUMR.x1, uv.getX(q)), lerp(NUMR.y0, NUMR.y1, uv.getY(q)));
      np.rotateX(PI / 2);
      if (flip) np.rotateZ(PI);
      /* 0.2 m off the leaning wall: at 0.06 it was under one depth step
         at full zoom-out once scaled by 0.31                              */
      np.translate(-84.5, flip ? ISL_YI + 0.2 : ISL_YO - 0.2, Z0 + 4.4);
      B.D.add(np);
    }
    numberPanel(false);
    numberPanel(true);
    /* flight deck control looks out over the deck from the island's
       inboard face, a long low window band just above the deck            */
    B.G.add(box(THREE, 11.0, 0.3, 1.1, -84.0, ISL_YI + 0.1, Z0 + 3.0));
    /* team band round the head of the base block                           */
    B.T.add(frustum(THREE, base, Z0 + 7.0, Z0 + 8.2, 1.012, 1.004));
    /* balcony deck and its rail                                            */
    B.S.add(plate(THREE, scalePts(base, 1.07), Z0 + 8.3, Z0 + 8.65));
    ringRail(scalePts(base, 1.065), Z0 + 9.65);

    /* the radar block: a hexagon, one array face forward and one on each
       after quarter, 120 degrees apart                                     */
    var HEX = [[-75.8, -35.3], [-75.8, -22.9], [-83.5, -22.8], [-92.6, -27.5],
               [-92.6, -30.7], [-83.5, -35.4]];
    var hc = centroid(HEX);
    var Z1 = Z0 + 8.65, Z2 = Z0 + 15.6;
    B.S.add(frustum(THREE, HEX, Z1, Z2, 1.0, 0.93));
    /* bridge band: glass all round, a visor plate over it                  */
    B.G.add(frustum(THREE, HEX, Z2, Z2 + 1.55, 0.925, 0.925));
    B.S.add(plate(THREE, scalePts(HEX, 0.98), Z2 + 1.55, Z2 + 1.9));
    var Z3 = Z2 + 1.9, Z4 = Z0 + 24.0;
    B.S.add(frustum(THREE, HEX, Z3, Z4, 0.86, 0.80));

    /* The six arrays: SPY-4 low on the big block, SPY-3 high on the upper.
       Both photographs of the island's faces show them SQUARE, a dark
       panel inside a raised light frame: about 5 m across the frame for
       the SPY-4, measured against the 12.4 m forward face in the bow view,
       and a little over 3 m for the SPY-3.                                 */
    function arrayFace(e0, e1, zb, zt, sb, st, zc, side) {
      var f = (zc - zb) / (zt - zb), sc = lerp(sb, st, f);
      var ax = hc[0] + (lerp(HEX[e0][0], HEX[e1][0], 0.5) - hc[0]) * sc;
      var ay = hc[1] + (lerp(HEX[e0][1], HEX[e1][1], 0.5) - hc[1]) * sc;
      var ex2 = HEX[e1][0] - HEX[e0][0], ey2 = HEX[e1][1] - HEX[e0][1], el = Math.sqrt(ex2 * ex2 + ey2 * ey2);
      var nx2 = ey2 / el, ny2 = -ex2 / el;
      /* the face leans in by the frustum's own taper                       */
      var dist = Math.abs((lerp(HEX[e0][0], HEX[e1][0], 0.5) - hc[0]) * nx2 + (lerp(HEX[e0][1], HEX[e1][1], 0.5) - hc[1]) * ny2);
      var lean = Math.atan2(dist * (sb - st), zt - zb);
      var N = new THREE.Vector3(nx2 * Math.cos(lean), ny2 * Math.cos(lean), Math.sin(lean));
      /* built facing local +Y, local X along the face and Z up it, then set
         on the wall by an explicit basis: the plain shortest-arc turn from
         +Y to a leaning normal rolls a square panel ten degrees           */
      var Hh = new THREE.Vector3().crossVectors(N, new THREE.Vector3(0, 0, 1)).normalize();
      var Uu = new THREE.Vector3().crossVectors(Hh, N).normalize();
      var q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(Hh, N, Uu));
      var fw = side * 0.07, h = side * 0.5, parts = [
        ["R", new THREE.BoxGeometry(side, 0.3, side).translate(0, 0.15, 0)],
        ["S", new THREE.BoxGeometry(side + 2 * fw, 0.5, fw).translate(0, 0.25, h + fw * 0.5)],
        ["S", new THREE.BoxGeometry(side + 2 * fw, 0.5, fw).translate(0, 0.25, -h - fw * 0.5)],
        ["S", new THREE.BoxGeometry(fw, 0.5, side).translate(h + fw * 0.5, 0.25, 0)],
        ["S", new THREE.BoxGeometry(fw, 0.5, side).translate(-h - fw * 0.5, 0.25, 0)],
      ];
      parts.forEach(function (pp) {
        pp[1].applyQuaternion(q);
        pp[1].translate(ax, ay, zc);
        B[pp[0]].add(pp[1]);
      });
    }
    [[0, 1], [2, 3], [4, 5]].forEach(function (e) {
      arrayFace(e[0], e[1], Z1, Z2, 1.0, 0.93, Z0 + 11.4, 4.3);
      arrayFace(e[0], e[1], Z3, Z4, 0.86, 0.80, Z0 + 20.4, 2.8);
    });
    ringRail(scalePts(HEX, 0.975), Z2 + 2.9);
    /* bridge wings, and the signal platform above the SPY-3 faces: in the
       bow photograph both stand four metres out past the island's sides   */
    B.S.add(plate(THREE, [[-80.8, -39.4], [-76.2, -39.4], [-76.2, -18.8], [-80.8, -18.8]], Z2 - 0.35, Z2));
    ringRail([[-80.6, -39.2], [-76.4, -39.2], [-76.4, -18.9], [-80.6, -18.9]], Z2 + 1.0);
    B.S.add(plate(THREE, [[-83.5, -37.6], [-78.8, -37.6], [-78.8, -20.6], [-83.5, -20.6]], Z0 + 21.9, Z0 + 22.25));
    ringRail([[-83.3, -37.4], [-79.0, -37.4], [-79.0, -20.8], [-83.3, -20.8]], Z0 + 23.2);
    /* the roof: a team-coloured coaming round a plated roof                */
    B.T.add(frustum(THREE, HEX, Z4 - 0.9, Z4 + 0.25, 0.808, 0.808));
    B.S.add(plate(THREE, scalePts(HEX, 0.66), Z4 + 0.25, Z4 + 0.45));
    /* two SATCOM radomes on the roof, diagonally                          */
    [[-80.2, -25.9], [-87.4, -32.3]].forEach(function (d) {
      B.S.add(cylZ(THREE, 1.1, 1.3, 1.0, 8, d[0], d[1], Z4 + 0.25));
      B.W.add(sphere(THREE, 2.1, 12, 7, d[0], d[1], Z4 + 3.2));
    });
    /* small domes on the balcony corners, and the pair the bow view shows
       at the port end of the signal platform, one a little higher        */
    [[-76.5, -34.6], [-90.8, -24.0]].forEach(function (d) {
      B.W.add(sphere(THREE, 0.75, 8, 5, d[0], d[1], Z1 + 0.8));
    });
    B.W.add(sphere(THREE, 0.8, 8, 5, -80.2, -21.6, Z0 + 22.25 + 0.75));
    B.S.add(cylZ(THREE, 0.35, 0.45, 0.9, 6, -82.4, -21.2, Z0 + 22.25));
    B.W.add(sphere(THREE, 0.7, 8, 5, -82.4, -21.2, Z0 + 22.25 + 1.55));

    /* ------------------------------------------------------------ mast
       One tapered enclosed mast off the roof, the main yard across it at
       30 m above the deck, a platform, the top yard at 37.5 m and the big
       radome at the head, then the pole to 45 m: 76 m keel to masthead.   */
    var MX = -84.6, MY = ISL_YC, MZ0 = Z4 + 0.25, MZ1 = Z0 + 37.4;
    var mg = new THREE.CylinderGeometry(0.95, 1.9, MZ1 - MZ0, 4, 1);
    mg.rotateY(PI / 4); mg.rotateX(PI / 2);
    mg.translate(MX, MY, (MZ0 + MZ1) * 0.5);
    B.S.add(mg);
    var ZY1 = Z0 + 30.2;
    B.S.add(box(THREE, 2.6, 24.0, 0.45, MX, MY, ZY1));
    /* both yards are walkways with a rail all round, the bow view's two
       long fringed bars                                                   */
    ringRail([[MX - 1.2, MY - 11.9], [MX + 1.2, MY - 11.9], [MX + 1.2, MY + 11.9], [MX - 1.2, MY + 11.9]], ZY1 + 1.0);
    ringRail([[MX - 1.0, MY - 9.4], [MX + 1.0, MY - 9.4], [MX + 1.0, MY + 9.4], [MX - 1.0, MY + 9.4]], MZ1 + 1.0);
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MX, MY + s * 1.2, ZY1 - 3.4, MX, MY + s * 8.5, ZY1 - 0.2, 0.14, 4));
      B.W.add(sphere(THREE, 0.5, 8, 5, MX, MY + s * 10.8, ZY1 + 0.7));
      B.M.add(strut(THREE, MX + 0.6, MY + s * 6.0, ZY1, MX + 0.6, MY + s * 6.0, ZY1 + 2.6, 0.05, 4));
    }
    /* two small platforms girdle the mast between the yards, at 32 and
       35.3 m in the bow view                                              */
    [Z0 + 32.0, Z0 + 35.3].forEach(function (zp) {
      B.S.add(place(THREE, new THREE.CylinderGeometry(2.1, 2.1, 0.35, 8).rotateX(PI / 2), MX, MY, zp));
      ringRail([[MX - 1.45, MY - 1.45], [MX + 1.45, MY - 1.45], [MX + 1.45, MY + 1.45], [MX - 1.45, MY + 1.45]], zp + 1.0);
    });
    /* the top yard is braced down to the mast as well                     */
    for (s = -1; s <= 1; s += 2)
      B.M.add(strut(THREE, MX, MY + s * 1.0, MZ1 - 2.6, MX, MY + s * 5.0, MZ1 - 0.2, 0.11, 4));
    B.S.add(box(THREE, 2.2, 19.0, 0.4, MX, MY, MZ1));
    for (s = -1; s <= 1; s += 2)
      B.W.add(sphere(THREE, 0.65, 8, 5, MX, MY + s * 7.6, MZ1 + 0.8));
    B.S.add(cylZ(THREE, 0.9, 1.1, 0.9, 8, MX, MY, MZ1 + 0.2));
    B.W.add(sphere(THREE, 1.7, 12, 8, MX, MY, MZ1 + 2.7));
    B.M.add(strut(THREE, MX, MY, MZ1 + 4.2, MX, MY, Z0 + 45.0, 0.2, 5, 0.1));
    B.M.add(cylZ(THREE, 0.45, 0.45, 0.8, 8, MX, MY, Z0 + 42.6));
    /* the electronic-warfare and comms boxes that crowd the mast faces,
       and the whips standing up off both yards                            */
    for (s = -1; s <= 1; s += 2) {
      B.S.add(box(THREE, 1.2, 0.5, 1.6, MX, MY + s * 1.3, Z0 + 27.2));
      B.S.add(box(THREE, 0.5, 1.2, 1.4, MX + s * 1.1, MY, Z0 + 33.7));
      for (j = 0; j < 2; j++) {
        B.M.add(strut(THREE, MX - 0.8, MY + s * (4.0 + j * 4.5), ZY1 + 0.2, MX - 0.8, MY + s * (4.0 + j * 4.5), ZY1 + 3.4, 0.05, 4));
        B.M.add(strut(THREE, MX + 0.6, MY + s * (3.0 + j * 3.5), MZ1 + 0.2, MX + 0.6, MY + s * (3.0 + j * 3.5), MZ1 + 2.4, 0.04, 4));
      }
    }

    /* ---------------------------------------------- the sparse deck park */
    function park(parts, x, y, hdg) { emit(parts, x, y, FD_TOP, hdg); }
    /* two on the bow row, tails over the starboard edge as they park them,
       two in the corral abaft the island, and the Hawkeye just forward of
       the island, abeam the after starboard lift (x -75 .. -49). All clear
       of the foul line.                                                    */
    park(hornetParts(THREE, M), 150.0, -6.5, PI * 0.62);
    park(hornetParts(THREE, M), 136.0, -6.5, PI * 0.62);
    park(hornetParts(THREE, M), -118.0, -25.5, PI * 0.5);
    park(hornetParts(THREE, M), -132.0, -25.0, PI * 0.5);
    park(hawkeyeParts(THREE, M), -62.0, -11.0, PI * 1.08);

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

/* Registration. The key is carrier_n itself: the def is the Ford, and every
   carrier that borrows carrier_n through ROLES borrows this hull. len is
   the measured X extent, the 337 m flight deck.                            */
UNIT_MODELS["carrier_n"] = {
  len: 337,
  build: function (THREE, M, C) { return HeroFordCVN.build(THREE, M, C); }
};
