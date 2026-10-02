/* ===== us_prophet.js - HERO model: AN/MLQ-44 Prophet Enhanced ===============
   The "Prophet EW" (rules.js ewv_n, full name AN/MLQ-44 Prophet, 2000s to
   present).  The old model was a Stryker hull with a telescoping mast; the
   references do not support a Stryker for this designation, so this draws
   the carrier they do support.

   WHAT THE REFERENCES SAY, AND WHERE THEY ARE THIN
   - AN/MLQ-44 is the Prophet Enhanced (PE).  The Army's PM EW&C portfolio
     page lists "Prophet Enhanced (PE)" and its upgrade path: AN/MLQ-44A to
     44B (FY17-21), then the ESP variant AN/MLQ-44E(V)1 (FY20-26).  It calls
     the PE a ground-based tactical SIGINT and electronic-support sensor with
     "multiple configurations supporting manpack, vehicle-mounted and
     dismounted / fixed-site operations", interdependent with "Armored
     Tactical Vehicles".  General Dynamics says "fielded on a variety of
     ground vehicles".  So the carrier is NOT a single vehicle.
   - The same Army page carries one photograph of the PE (a test-range
     still, DVIDS image 9468268): an Oshkosh M-ATV, the 4x4 MRAP all-terrain
     vehicle, with a gunner protection kit on the roof and, at the rear
     STARBOARD corner, a tall white housing topped by a flat platform ring
     that carries a dark-blue cylindrical radome, with a whip beside it.
     That is the only view of the system found; it is taken from the front
     and starboard side, so nothing of the port side, the tail or the
     equipment compartment is known.
   - Deagel (via ARMSNET) says the PE was first integrated into the Army's
     Medium Mine Protected Vehicle, contract May 2009, first delivery Oct
     2009 - an MRAP-family carrier too, the Cougar/MaxxPro class.  The older
     AN/MLQ-40(V)3 Prophet Block I, which did ride a HMMWV, is a different
     designation, so no Humvee is drawn.
   Drawn: what the photograph shows (M-ATV body, roof GPK, starboard-rear
   mast housing, platform ring with its small elements, blue radome, whip,
   the two door seams and windows, the mirrors).  Not drawn: anything the
   photograph does not show - no port-side antenna, no shelter, no second
   mast.  The tail is a plain slab, the length of the published hull.

   M-ATV dimensions (Oshkosh figures as published by Wikipedia and a spec
   sheet aggregator): 246.8 in long, 98.1 in wide, 105 in high (6.27 x 2.49
   x 2.67 m), wheelbase 3.93 m, ground clearance 375 mm, 395/85R20 tyres
   (outside diameter 1.18 m).  The width is the tyre faces: track 2.10 m
   plus the 0.395 m section; the mirrors and the mast ring stand out past
   it, to 3.06 m overall against the 3.12 m "including accessories" the
   spec-sheet aggregator gives.  Measured against the 1.18 m tyre, the
   photograph puts the cab roof near 2.4 m, the GPK top near 3.0 m and the
   radome top near 3.1 m.  Oshkosh's 2.67 m is higher than that roof and the
   sources do not say which point it is measured to, so the roof follows the
   photograph.

   Model space: +X nose, +Y port, +Z up, metres, tyres on z = 0.  Nothing
   sticks out along X past the bumper or the tail, so render3d's measured
   scale is the hull's 6.27 m.
   Named nodes: "turret" is the GPK on its roof ring (origin on the ring
   centre, open front toward +X); render3d trains it with rotation.z for
   this row's turret:true.  The entities only write tang when a unit fires,
   and a jammer carries no weapon, so the GPK keeps the heading the vehicle
   spawned with, as every other turret here holds its last bearing.  The
   mast stays fixed, as it is in the photo.
   "roadwheel" x4, axle on local Y, tread lugs so the spin is visible.
   Draw calls: 6 baked body meshes + 4 wheels + 2 turret = 12.  Materials: 7
   (skin, dark, glass, white, blue, team, tyre).  The team material is
   exactly C.team: era stand-ins repaint everything else and keep it.
   Colours are authored in sRGB and left to prepModel() to linearise; the
   tyre's vertex colours are already linear.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroProphet = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var XB = 3.135;                 /* bumper tip; the tail is its mirror          */
  var XF = 1.94, XR = -1.99;      /* axles, 3.93 m apart                          */
  var TR = 0.59, TY = 1.05;       /* tyre radius; track half-width (2.10 m)       */
  var HW = 1.18;                  /* body half width; the tyres reach 1.2475      */
  var ROOF = 2.38;                /* cab roof                                     */
  var GX = 0.35;                  /* GPK ring centre                              */
  var MX = -2.78, MY = -1.29;     /* mast axis, rear starboard corner             */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* One canvas per page, shared by every team's copy.  The skin is mapped by
     WORLD position (3.4 m to the canvas), so a door and a roof carry the paint
     at the same scale; on vertical faces v is height, so the road-dust band at
     the bottom of the canvas lands on the lower 1.3 m of the hull. */
  var _cv = null;
  function skinCanvas() {
    if (_cv) return _cv;
    var R = rng(44017), W = 256, H = 256, i, q, g;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    q = cv.getContext("2d");
    q.fillStyle = "#b09c76"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(226,212,172,0.10)" : "rgba(90,74,48,0.09)";
      q.fillRect(R() * W, R() * H * 0.8, 20 + R() * 90, 12 + R() * 60);
    }
    q.fillStyle = "rgba(56,46,32,0.20)";
    for (i = 0; i < 26; i++) q.fillRect(R() * W, R() * H * 0.85, 4 + R() * 28, 1 + R() * 2);
    g = q.createLinearGradient(0, H * 0.62, 0, H);
    g.addColorStop(0, "rgba(168,142,100,0)"); g.addColorStop(1, "rgba(168,142,100,0.55)");
    q.fillStyle = g; q.fillRect(0, H * 0.62, W, H * 0.38);
    _cv = cv;
    return cv;
  }
  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  function makeMats(THREE, C) {
    var T = {}, st = null;
    try { st = canvasTex(THREE, skinCanvas()); } catch (e) { st = null; }
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    if (st) T.skin.map = st; else T.skin.color.setHex(0xb09c76);
    T.skin.userData.worldUV = 3.4;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2a2b29, roughness: 0.78, metalness: 0.22 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2830, roughness: 0.12, metalness: 0.35 });
    T.white = new THREE.MeshStandardMaterial({ color: 0xd6d4ca, roughness: 0.66, metalness: 0.08 });
    T.blue = new THREE.MeshStandardMaterial({ color: 0x22407a, roughness: 0.45, metalness: 0.05 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0.02,
                                              vertexColors: true });
    return T;
  }

  /* --------------------------------------------------------- triangles */
  /* A flat triangle soup.  tri() winds every face to point AWAY from a hint
     point, so no part here depends on getting a winding order right by hand
     (447 of 832 roster keys carry an inside-out FrontSide mesh). */
  function Soup(vc) { this.p = []; this.n = []; this.c = vc ? [] : null; this.cur = [0.01, 0.01, 0.01]; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0];
    var cy = (a[1] + b[1] + c[1]) / 3 - away[1];
    var cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    if (this.c) for (var k = 0; k < 3; k++) this.c.push(this.cur[0], this.cur[1], this.cur[2]);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(this.p.length / 3 * 2).fill(0), 2));
    if (this.c) g.setAttribute("color", new THREE.Float32BufferAttribute(this.c, 3));
    g.computeBoundingSphere();
    return g;
  };

  /* ------------------------------------------------------------- Baker */
  /* Everything that does not move is baked: one merged geometry per
     material, each part keeping its own hard or smooth normals. */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var THREE = this.T, m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  /* box from its min/max corners; the corners may arrive swapped */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.put(mat, new this.T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* cylinder along a world axis; r is the bottom (or rear) radius, r2 the top */
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  /* cylinder from point a to point b */
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 6);
    var m = new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    this.add(mat, g);
  };
  /* a convex solid from 8 corners: 0-3 a ring, 4-7 the ring above it in the
     same order.  Tapers, slopes and wedges (two coincident corners make a
     wedge) all come from this one call. */
  var HEXF = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
  Baker.prototype.hex = function (mat, P) {
    var S = new Soup(false), i, c = [0, 0, 0];
    for (i = 0; i < 8; i++) { c[0] += P[i][0] / 8; c[1] += P[i][1] / 8; c[2] += P[i][2] / 8; }
    for (i = 0; i < 6; i++) { var f = HEXF[i]; S.quad(P[f[0]], P[f[1]], P[f[2]], P[f[3]], c); }
    this.add(mat, S.geo(this.T));
  };
  /* a plate lying along the segment (x0,z0)-(x1,z1) in the XZ plane, spanning
     y0..y1, thickened toward the side that faces forward and up */
  Baker.prototype.panel = function (mat, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz);
    var nx = dz / l, nz = -dx / l;
    if (nx + nz < 0) { nx = -nx; nz = -nz; }
    var cx = x0 + nx * th, cz = z0 + nz * th, ex = x1 + nx * th, ez = z1 + nz * th;
    this.hex(mat, [[x0, y0, z0], [x0, y1, z0], [x1, y1, z1], [x1, y0, z1],
                   [cx, y0, cz], [cx, y1, cz], [ex, y1, ez], [ex, y0, ez]]);
  };
  Baker.prototype.flush = function (group, ox, oy, oz) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S, ox || 0, oy || 0, oz || 0);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* Box projection by each triangle's own facing; the offset is where the
     piece sits on the hull, so the turret's paint carries on from the roof. */
  function worldUV(P, U, S, ox, oy, oz) {
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3] + ox, y = P[o + k * 3 + 1] + oy, z = P[o + k * 3 + 2] + oz, u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = 0.40 + 0.55 * Math.min(1, Math.max(0, y / S + 0.5)); }
        else if (nx >= ny) { u = y / S + 0.5; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* --------------------------------------------------------------- body */
  function buildBody(THREE, K, T) {
    var s, i;
    /* the V-hull: dark and narrower than the tyre insides (0.8525), so it
       reads as the shadowed underside between the wheels; its keel stands the
       published 375 mm clear of the ground */
    K.hex(T.dark, [[2.62, -0.50, 0.375], [2.62, 0.50, 0.375], [-3.00, 0.50, 0.375], [-3.00, -0.50, 0.375],
                   [2.62, -0.80, 1.00], [2.62, 0.80, 1.00], [-3.00, 0.80, 1.00], [-3.00, -0.80, 1.00]]);
    /* the armoured body in three runs: the doors, the stretch over the rear
       tyres (its sill lifted clear of them) and the tail */
    K.bb(T.skin, -1.27, 1.22, -HW, HW, 0.58, 2.28);
    K.bb(T.skin, -2.71, -1.27, -HW, HW, 1.30, 2.28);
    K.bb(T.skin, -XB, -2.71, -HW, HW, 0.62, 2.28);
    /* the roof, chamfered at its edges */
    K.hex(T.skin, [[1.22, -HW, 2.28], [1.22, HW, 2.28], [-XB, HW, 2.28], [-XB, -HW, 2.28],
                   [1.22, -1.06, ROOF], [1.22, 1.06, ROOF], [-XB, 1.06, ROOF], [-XB, -1.06, ROOF]]);
    /* the cowl: a wedge whose slope carries the two windscreen panes */
    K.hex(T.skin, [[1.76, -1.14, 1.50], [1.76, 1.14, 1.50], [1.22, 1.14, 1.50], [1.22, -1.14, 1.50],
                   [1.22, -1.10, ROOF], [1.22, 1.10, ROOF], [1.22, 1.10, ROOF], [1.22, -1.10, ROOF]]);
    var wb = [1.76, 1.50], wt = [1.22, ROOF];
    var wa = [wb[0] + (wt[0] - wb[0]) * 0.30, wb[1] + (wt[1] - wb[1]) * 0.30];
    var wc = [wb[0] + (wt[0] - wb[0]) * 0.92, wb[1] + (wt[1] - wb[1]) * 0.92];
    K.panel(T.glass, wa[0], wa[1], wc[0], wc[1], 0.05, 1.02, 0.02);
    K.panel(T.glass, wa[0], wa[1], wc[0], wc[1], -1.02, -0.05, 0.02);
    /* the hood: highest at the screen, falling to the grille */
    K.hex(T.skin, [[2.66, -0.80, 0.70], [2.66, 0.80, 0.70], [1.70, 0.80, 0.70], [1.70, -0.80, 0.70],
                   [2.66, -0.74, 1.60], [2.66, 0.74, 1.60], [1.70, 0.74, 1.72], [1.70, -0.74, 1.72]]);
    /* grille face, with its three vents */
    K.bb(T.skin, 2.66, 2.86, -0.80, 0.80, 0.70, 1.60);
    K.bb(T.dark, 2.85, 2.87, 0.30, 0.78, 1.04, 1.42);
    K.bb(T.dark, 2.85, 2.87, -0.78, -0.30, 1.04, 1.42);
    K.bb(T.dark, 2.85, 2.87, -0.17, 0.17, 1.04, 1.42);
    /* bumper beam and the winch plate proud of it */
    K.bb(T.skin, 2.86, 3.10, -1.15, 1.15, 0.52, 0.90);
    K.bb(T.dark, 3.04, XB, -0.38, 0.38, 0.60, 0.82);
    for (s = -1; s <= 1; s += 2) {
      /* front fender flares over the tyres, and the lamp pods at the corners */
      K.bb(T.skin, 1.22, 2.86, s * 0.80, s * 1.22, 1.26, 1.50);
      K.bb(T.skin, 2.66, 2.86, s * 0.80, s * 1.22, 0.70, 1.50);
      K.bb(T.glass, 2.85, 2.872, s * 0.88, s * 1.12, 1.12, 1.36);
      /* door windows, front and rear */
      K.bb(T.glass, 0.34, 1.08, s * 1.178, s * 1.194, 1.66, 2.18);
      K.bb(T.glass, -0.62, 0.14, s * 1.178, s * 1.194, 1.66, 2.18);
      /* door seams: the front door, the rear door and the end of the cab */
      K.bb(T.dark, 1.138, 1.162, s * 1.178, s * 1.188, 0.66, 2.26);
      K.bb(T.dark, 0.208, 0.232, s * 1.178, s * 1.188, 0.66, 2.26);
      K.bb(T.dark, -0.732, -0.708, s * 1.178, s * 1.188, 0.66, 2.26);
      /* the side step under the doors */
      K.bb(T.dark, 0.20, 1.12, s * 1.16, s * 1.36, 0.50, 0.57);
      /* mirror arm and head at the front corner of the cab */
      K.bb(T.dark, 1.20, 1.44, s * 1.18, s * 1.36, 1.78, 1.84);
      K.bb(T.dark, 1.36, 1.44, s * 1.34, s * 1.42, 1.62, 1.98);
    }
    /* team flashes, flat and facing up: a roof panel behind the GPK and a
       panel laid on the hood slope */
    K.bb(T.team, -2.15, -1.25, -0.46, 0.46, ROOF, ROOF + 0.014);
    var zh = function (x) { return 1.72 - 0.125 * (x - 1.70); };
    K.hex(T.team, [[2.45, -0.36, zh(2.45) - 0.002], [2.45, 0.36, zh(2.45) - 0.002],
                   [2.00, 0.36, zh(2.00) - 0.002], [2.00, -0.36, zh(2.00) - 0.002],
                   [2.45, -0.36, zh(2.45) + 0.014], [2.45, 0.36, zh(2.45) + 0.014],
                   [2.00, 0.36, zh(2.00) + 0.014], [2.00, -0.36, zh(2.00) + 0.014]]);
    /* the ring the GPK turns on */
    K.cyl(T.dark, 0.72, 0.04, 28, GX, 0, ROOF + 0.015, "z");
  }

  /* --------------------------------------------------------------- mast */
  /* As the Army photograph shows it: a white housing standing against the
     rear starboard corner, a flat platform ring on top of it that overhangs
     the side, a row of small elements round the ring, the dark-blue
     cylindrical radome on the ring, and a whip on its outboard edge. */
  function buildMast(THREE, K, T) {
    var i, a;
    K.bb(T.white, MX - 0.18, MX + 0.18, MY - 0.11, MY + 0.11, 0.90, 2.45);
    K.cyl(T.dark, 0.33, 0.07, 20, MX, MY, 2.475, "z");
    for (i = 0; i < 10; i++) {
      a = i * TAU / 10;
      K.put(T.dark, new THREE.BoxGeometry(0.10, 0.09, 0.10),
            MX + 0.30 * Math.cos(a), MY + 0.30 * Math.sin(a), 2.56, 0, 0, a);
    }
    K.cyl(T.blue, 0.23, 0.62, 20, MX, MY, 2.82, "z", 0.215);
    K.cyl(T.dark, 0.03, 0.08, 8, MX + 0.02, MY - 0.27, 2.55, "z");
    K.rod(T.dark, 0.011, [MX + 0.02, MY - 0.27, 2.55], [MX + 0.02, MY - 0.27, 3.62], 5);
  }

  /* ------------------------------------------------------------- turret */
  /* The gunner protection kit on the roof ring: a boxy armoured cupola with
     a raked front carrying two panes, a pane in each side, and the two raised
     flaps along the top of its front, as in the photograph.  Its origin is
     the ring centre. */
  function buildTurret(THREE, T) {
    var t = new THREE.Group(), K = new Baker(THREE), s;
    t.name = "turret";
    t.position.set(GX, 0, ROOF);
    K.hex(T.skin, [[0.64, -0.66, 0], [0.64, 0.66, 0], [-0.52, 0.66, 0], [-0.52, -0.66, 0],
                   [0.42, -0.62, 0.46], [0.42, 0.62, 0.46], [-0.52, 0.62, 0.46], [-0.52, -0.62, 0.46]]);
    var fa = [0.64 - 0.22 * 0.22, 0.46 * 0.22], fb = [0.64 - 0.22 * 0.88, 0.46 * 0.88];
    K.panel(T.glass, fa[0], fa[1], fb[0], fb[1], 0.06, 0.60, 0.016);
    K.panel(T.glass, fa[0], fa[1], fb[0], fb[1], -0.60, -0.06, 0.016);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.glass, -0.22, 0.30, s * 0.655, s * 0.675, 0.14, 0.38);
      K.panel(T.skin, 0.36, 0.46, 0.30, 0.74, s > 0 ? 0.07 : -0.49, s > 0 ? 0.49 : -0.07, 0.04);
    }
    K.flush(t, GX, 0, ROOF);
    return t;
  }

  /* ------------------------------------------------------------- wheels */
  /* 395/85R20: 1.18 m over the lugs, 0.395 m section.  One carcass of
     revolution about the axle (Y), 14 pairs of chevron tread blocks round it
     so the turn shows, and a dished hub on each side; vertex colours carry
     rubber, rim and hub, so a wheel is one mesh. */
  function tyreGeo(THREE) {
    var S = new Soup(true), N = 28, N2 = 20, i, k, a0, a1, c0, s0, c1, s1, sd;
    var RUB = [0.011, 0.011, 0.012], RIM = [0.070, 0.074, 0.078], HUB = [0.115, 0.120, 0.125];
    var O = [0, 0, 0];
    var half = [[0.262, 0.17], [0.43, 0.2025], [0.51, 0.19], [0.55, 0.15]];
    var prof = half.slice();
    for (i = half.length - 1; i >= 0; i--) prof.push([half[i][0], -half[i][1]]);
    S.cur = RUB;
    for (k = 0; k < N; k++) {
      a0 = k * TAU / N; a1 = (k + 1) * TAU / N;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      for (i = 0; i < prof.length - 1; i++) {
        var p = prof[i], q = prof[i + 1];
        S.quad([p[0] * c0, p[1], p[0] * s0], [p[0] * c1, p[1], p[0] * s1],
               [q[0] * c1, q[1], q[0] * s1], [q[0] * c0, q[1], q[0] * s0], O);
      }
    }
    /* tread blocks: tangential 0.10, across 0.16, 0.045 tall, yawed 24 deg so
       the pair makes a chevron; the two rows are half a pitch apart */
    var LN = 14, LR = 0.5675, LH = 0.0225, cs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    var LF = [[4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
    for (k = 0; k < LN; k++) {
      for (sd = -1; sd <= 1; sd += 2) {
        var a = (k + (sd > 0 ? 0 : 0.5)) * TAU / LN, ca = Math.cos(a), sa = Math.sin(a);
        var vc = sd * 0.095, phi = sd * 0.42, cp = Math.cos(phi), sp = Math.sin(phi);
        var P = [], lv, cen = [0, 0, 0];
        for (lv = 0; lv < 2; lv++) {
          for (i = 0; i < 4; i++) {
            var du = cs[i][0] * 0.05, dv = cs[i][1] * 0.08;
            var u = du * cp - dv * sp, v = du * sp + dv * cp, rr = LR + (lv ? LH : -LH);
            P.push([rr * ca - u * sa, vc + v, rr * sa + u * ca]);
          }
        }
        for (i = 0; i < 8; i++) { cen[0] += P[i][0] / 8; cen[1] += P[i][1] / 8; cen[2] += P[i][2] / 8; }
        for (i = 0; i < LF.length; i++) {
          var f = LF[i];
          S.quad(P[f[0]], P[f[1]], P[f[2]], P[f[3]], cen);
        }
      }
    }
    /* the dished hub on each side: a flat disc seated on the sidewall's
       inner edge, and a boss standing out of its middle */
    for (sd = -1; sd <= 1; sd += 2) {
      var yd = sd * 0.17, yb = sd * 0.215;
      for (k = 0; k < N2; k++) {
        a0 = k * TAU / N2; a1 = (k + 1) * TAU / N2;
        c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
        S.cur = RIM;
        S.tri([0, yd, 0], [0.262 * c0, yd, 0.262 * s0], [0.262 * c1, yd, 0.262 * s1], O);
        S.cur = HUB;
        S.quad([0.10 * c0, yd, 0.10 * s0], [0.10 * c1, yd, 0.10 * s1],
               [0.10 * c1, yb, 0.10 * s1], [0.10 * c0, yb, 0.10 * s0], O);
        S.tri([0, yb, 0], [0.10 * c0, yb, 0.10 * s0], [0.10 * c1, yb, 0.10 * s1], O);
      }
    }
    return S.geo(THREE);
  }
  function buildWheels(THREE, g, T) {
    var tg = tyreGeo(THREE), xs = [XF, XR], i, s;
    for (i = 0; i < 2; i++) {
      for (s = -1; s <= 1; s += 2) {
        var w = new THREE.Group();
        w.name = "roadwheel";
        w.position.set(xs[i], s * TY, TR);
        w.add(new THREE.Mesh(tg, T.tyre));
        g.add(w);
      }
    }
  }

  /* ========================================================== ASSEMBLY  */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "prophet_matv";
    var K = new Baker(THREE);
    buildBody(THREE, K, T);
    buildMast(THREE, K, T);
    K.flush(g, 0, 0, 0);
    g.add(buildTurret(THREE, T));
    buildWheels(THREE, g, T);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent, bumper face to tail; render3d.js normalises
   on the measurement.  Heroes load after the parametric layers, so this
   replaces the Stryker-hull Prophet in units3d_ew.js. */
UNIT_MODELS["ewv_n"] = { len: 6.27, build: HeroProphet.build };
