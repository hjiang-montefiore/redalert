/* ===== us_stryker.js - HERO models: the Stryker 8x8 family ===============
   Three vehicles on one hull family, four rules.js keys:
     lt_n                  "Stryker MGS"  present day        M1128 Mobile Gun System
     nato_e00_lighttank    "Stryker MGS"  2000s-10s          the same M1128
     atgmv_n               "Stryker ATGM" 2000s to present   M1134 ATGM Vehicle
     spaag_n               "M-SHORAD"     present day        Stryker A1 IM-SHORAD
   The old models drew the LAV III hull for the first three and a Gepard
   (tracked, twin 35 mm) for the fourth, because facts.js and armour_specs.js
   still describe spaag_n as the Flakpanzer Gepard 1A2 although rules.js
   names it the Stryker A1 IM-SHORAD.  This draws the M-SHORAD.

   Reference.  Published figures (the Stryker infobox on Wikipedia): length
   6.95 m, width 2.72 m, height 2.64 m, 8x8 wheels, ICV 16.5 t and MGS 18.8 t.
   Everything else is read off photographs, all Wikimedia
   Commons, read off with a metre grid at the vehicle's own scale:
     "M1128 Stryker MGS.jpg"                      port side, whole vehicle
     "Flickr - The U.S. Army - TOW missile fire"  M1134 head on, launcher raised
     "M-SHORAD Stryker.jpg"                       the A1 hull, turret, pods
     "5-4 ADA ... Saber Strike 2022 03.jpg"       the A1 head on, radar drums
   What the photographs say, and is built here:
     - The flat-bottom hull (M1128 and M1134: Wikipedia says the MGS was never
       built in the double-V hull, and the original M1134 is flat-bottomed) is
       a box 6.95 m long whose nose is a short vertical face with a shallow
       glacis behind it, a low front deck, and a main roof that steps up
       2 m above the ground about 1.9 m back from the nose.  Roof 2.03 m.
     - Four tyres a side at about 1.1 m pitch with a wider gap in the middle:
       front wheel 2.4 m behind the nose, 1.1 m of hull behind the last.
       Tyres are about 1.1 m across and flush with the hull sides.
     - M1128: the low-profile turret sits over the rear half of the hull
       (its front plate 2.8 m behind the nose, the bustle about a metre
       short of the tail), its roof 0.7 m above the hull roof; the 105 mm
       tube clears the nose by only 0.4 m, with a bore evacuator partway out
       and a muzzle brake.
     - M1134: a boxed launcher on an elevating mast, two TOW tubes either side
       of the sight housing, 1.5 m across and its top about 3.0 m up.
     - A1 IM-SHORAD: the double-V hull is a little taller and wider (roof
       2.17 m, tyres 0.44 m wide), the Leonardo DRS RIwP turret is unmanned
       and sits behind the crew hatches, with the 30 mm M230LF in the middle,
       a four-tube Stinger pod on one arm, a Hellfire rail with two missiles
       on the other, and the RADA multi-mission radar arrays as drums at the
       roof corners (the head-on photograph shows the front pair; the rear
       pair follows from the radar being four arrays for a full hemisphere).
   Slat armour is drawn on the three vehicles whose armour_specs.js extras
   list it (the 2004-on Iraq cage on the sides and rear) and not on the
   M-SHORAD, whose photographs show none.

   Wheels: four Groups named "roadwheel", one per axle, each carrying the
   left and right tyre (the axle is the Group's local Y).  Twelve tread lugs
   a tyre make the turn visible.  The turret Group "turret" has its origin on
   the turret ring and the gun along +X, as render3d.js trains and recoils it.
   Draw calls: 7 for the hull and turret, 8 for the wheels.  Five materials.
   Team colour: a recognition panel on the flat roof ahead of the turret, on
   a material that is exactly C.team (era-painted stand-ins rely on that).
   Colours are authored in sRGB and left to prepModel() to linearise.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroStryker = (function () {
  "use strict";

  var HL = 3.475;                              /* half of the 6.95 m hull */
  var AX = [1.10, -0.02, -1.28, -2.40];        /* axle x, front to rear   */

  /* roof profile: [x, roof z] stations from the step to the nose */
  var FLAT = {
    roof: 2.03, belly: 0.42, bellyTail: 0.62, wb: 0.88, ws: 1.31,
    hood: [[1.45, 2.03], [1.55, 1.84], [3.05, 1.64], [HL, 1.56]],
    up3: 0.40, upN: 0.53,
    R: 0.56, W: 0.40, yc: 1.16, lug: 0.035
  };
  var DVH = {
    roof: 2.17, belly: 0.58, bellyTail: 0.74, wb: 0.70, ws: 1.36,
    hood: [[1.45, 2.17], [1.55, 1.98], [3.05, 1.78], [HL, 1.70]],
    up3: 0.17, upN: 0.22,
    R: 0.58, W: 0.44, yc: 1.27, lug: 0.04
  };

  function roofAt(S, x) {
    var h = S.hood, i;
    if (x >= h[h.length - 1][0]) return h[h.length - 1][1];
    if (x <= h[0][0]) return S.roof;
    for (i = 0; i < h.length - 1; i++)
      if (x >= h[i][0] && x <= h[i + 1][0])
        return h[i][1] + (h[i + 1][1] - h[i][1]) * (x - h[i][0]) / (h[i + 1][0] - h[i][0]);
    return S.roof;
  }
  /* pitch of the front deck, for boxes that lie on it */
  function hoodPitch(S) { return Math.atan((S.hood[1][1] - S.hood[2][1]) / (S.hood[2][0] - S.hood[1][0])); }

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  var _skinCv = null;
  function skinCanvas() {
    if (_skinCv) return _skinCv;
    var R = rng(88213), W = 256, H = 256, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#4d5b3d"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(210,222,176,0.05)" : "rgba(20,26,12,0.07)";
      q.fillRect(R() * W, R() * H * 0.8, 20 + R() * 70, 14 + R() * 50);
    }
    q.fillStyle = "rgba(22,26,14,0.20)";
    for (i = 0; i < 70; i++) q.fillRect(R() * W, R() * H * 0.8, 1 + R() * 5, 1 + R() * 3);
    /* road dust and mud: the bottom quarter of the canvas is the lowest metre */
    var gr = q.createLinearGradient(0, H * 0.76, 0, H);
    gr.addColorStop(0, "rgba(110,92,64,0.00)");
    gr.addColorStop(1, "rgba(110,92,64,0.50)");
    q.fillStyle = gr; q.fillRect(0, H * 0.76, W, H * 0.24);
    for (i = 0; i < 40; i++) {
      q.fillStyle = "rgba(86,70,48," + (0.12 + R() * 0.18).toFixed(3) + ")";
      q.fillRect(R() * W, H * 0.80 + R() * H * 0.2, 4 + R() * 20, 2 + R() * 8);
    }
    _skinCv = cv;
    return cv;
  }
  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* ---------------------------------------------------------- materials */
  /* Five: SKIN (CARC green on steel), METAL (barrels, launcher tubes,
     fittings), RUBBER (tyres), GLASS (periscopes and sensor windows), TEAM. */
  function makeMats(THREE, C) {
    var T = {};
    var st = canvasTex(THREE, skinCanvas());
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (st) T.skin.map = st; else T.skin.color.setHex(0x4d5b3d);
    T.skin.userData.worldUV = 4.5;
    T.metal = new THREE.MeshStandardMaterial({ color: 0x2f332c, roughness: 0.55, metalness: 0.35 });
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x1c1c1a, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2830, roughness: 0.15, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    return T;
  }

  /* --------------------------------------------------------- triangles */
  function vsub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function vcross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function vnorm(a) { var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }

  function Soup() { this.p = []; this.n = []; }
  /* winding as given */
  Soup.prototype.tri0 = function (a, b, c) {
    var n = vcross(vsub(b, a), vsub(c, a));
    var l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    if (l < 1e-9) return;
    n[0] /= l; n[1] /= l; n[2] /= l;
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
  };
  /* oriented to face away from a hint point (every convex part) */
  Soup.prototype.tri = function (a, b, c, away) {
    var n = vcross(vsub(b, a), vsub(c, a));
    var l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    if (l < 1e-9) return;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0], cy = (a[1] + b[1] + c[1]) / 3 - away[1],
        cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (n[0] * cx + n[1] * cy + n[2] * cz < 0) { var t = b; b = c; c = t; n = [-n[0], -n[1], -n[2]]; }
    n[0] /= l; n[1] /= l; n[2] /= l;
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  /* smooth normals: the winding follows the supplied normals */
  Soup.prototype.triN = function (a, b, c, na, nb, nc) {
    var n = vcross(vsub(b, a), vsub(c, a));
    if (n[0] * n[0] + n[1] * n[1] + n[2] * n[2] < 1e-18) return;
    if (n[0] * (na[0] + nb[0] + nc[0]) + n[1] * (na[1] + nb[1] + nc[1]) + n[2] * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
  };
  Soup.prototype.geo = function (THREE, S) {
    var g = new THREE.BufferGeometry(), P = new Float32Array(this.p), N = new Float32Array(this.n);
    var U = new Float32Array(P.length / 3 * 2);
    if (S) worldUV(P, N, U, S);
    g.setAttribute("position", new THREE.BufferAttribute(P, 3));
    g.setAttribute("normal", new THREE.BufferAttribute(N, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(U, 2));
    g.computeBoundingSphere();
    return g;
  };

  /* Box projection by each triangle's own facing.  Sides take (along,
     height) so the dust band sits at the bottom of the vehicle; top faces
     take the cleaner upper part of the canvas. */
  function worldUV(P, N, U, S) {
    for (var t = 0; t < P.length / 9; t++) {
      var nx = Math.abs(N[t * 9]), ny = Math.abs(N[t * 9 + 1]), nz = Math.abs(N[t * 9 + 2]);
      for (var k = 0; k < 3; k++) {
        var o = t * 9 + k * 3, x = P[o], y = P[o + 1], z = P[o + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = 0.30 + 0.65 * (((y / S) % 1 + 1) % 1); }
        else if (ny >= nx) { u = x / S; v = z / S; }
        else { u = y / S; v = z / S; }
        U[(t * 3 + k) * 2] = u; U[(t * 3 + k) * 2 + 1] = v;
      }
    }
  }

  /* ------------------------------------------------------------- baker */
  /* One merged mesh per material.  Every part is a plain triangle list,
     so a box keeps its hard edges and a cylinder its smooth sides. */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.S = function (mat) {
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) return this.by[i].s;
    var s = new Soup(); this.by.push({ mat: mat, s: s }); return s;
  };
  Baker.prototype.box = function (mat, x0, x1, y0, y1, z0, z1) {
    var S = this.S(mat), c = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2], t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    var A = [x0, y0, z0], B = [x1, y0, z0], C = [x1, y1, z0], D = [x0, y1, z0],
        E = [x0, y0, z1], F = [x1, y0, z1], G = [x1, y1, z1], H = [x0, y1, z1];
    S.quad(A, B, C, D, c); S.quad(E, F, G, H, c); S.quad(A, B, F, E, c);
    S.quad(D, C, G, H, c); S.quad(A, D, H, E, c); S.quad(B, C, G, F, c);
  };
  /* box about its centre with an Euler turn (about X, then Y, then Z) */
  Baker.prototype.boxR = function (mat, cx, cy, cz, sx, sy, sz, rx, ry, rz) {
    var THREE = this.T, S = this.S(mat), m = new THREE.Matrix4(), v = new THREE.Vector3();
    m.compose(new THREE.Vector3(cx, cy, cz),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    var hx = sx / 2, hy = sy / 2, hz = sz / 2, c = [cx, cy, cz];
    function P(x, y, z) { v.set(x, y, z).applyMatrix4(m); return [v.x, v.y, v.z]; }
    var A = P(-hx, -hy, -hz), B = P(hx, -hy, -hz), C = P(hx, hy, -hz), D = P(-hx, hy, -hz),
        E = P(-hx, -hy, hz), F = P(hx, -hy, hz), G = P(hx, hy, hz), H = P(-hx, hy, hz);
    S.quad(A, B, C, D, c); S.quad(E, F, G, H, c); S.quad(A, B, F, E, c);
    S.quad(D, C, G, H, c); S.quad(A, D, H, E, c); S.quad(B, C, G, F, c);
  };
  /* round bar or cone from a to b, r0 at a and r1 at b, optional end caps */
  Baker.prototype.cyl = function (mat, a, b, r0, r1, seg, capA, capB) {
    var S = this.S(mat);
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var d = [dx / L, dy / L, dz / L];
    var t = Math.abs(d[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = vnorm(vcross(d, t)), v = vcross(d, u), dr = r0 - r1, j;
    var nA = [-d[0], -d[1], -d[2]];
    for (j = 0; j < seg; j++) {
      var a0 = j / seg * Math.PI * 2, a1 = (j + 1) / seg * Math.PI * 2;
      var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      var e0 = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      var e1 = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      var pa0 = [a[0] + e0[0] * r0, a[1] + e0[1] * r0, a[2] + e0[2] * r0];
      var pa1 = [a[0] + e1[0] * r0, a[1] + e1[1] * r0, a[2] + e1[2] * r0];
      var pb0 = [b[0] + e0[0] * r1, b[1] + e0[1] * r1, b[2] + e0[2] * r1];
      var pb1 = [b[0] + e1[0] * r1, b[1] + e1[1] * r1, b[2] + e1[2] * r1];
      var n0 = vnorm([e0[0] * L + d[0] * dr, e0[1] * L + d[1] * dr, e0[2] * L + d[2] * dr]);
      var n1 = vnorm([e1[0] * L + d[0] * dr, e1[1] * L + d[1] * dr, e1[2] * L + d[2] * dr]);
      if (r0 > 1e-6) S.triN(pa0, pa1, pb1, n0, n1, n1);
      if (r1 > 1e-6) S.triN(pa0, pb1, pb0, n0, n1, n0);
      if (capA && r0 > 1e-6) S.triN(a, pa1, pa0, nA, nA, nA);
      if (capB && r1 > 1e-6) S.triN(b, pb0, pb1, d, d, d);
    }
  };
  /* Loft through rings of equal point count, tail to nose (x increasing),
     each ring counter-clockwise in (y, z).  Faces come out outward and flat. */
  Baker.prototype.loft = function (mat, rings, capTail, capNose) {
    var S = this.S(mat), K = rings.length, N = rings[0].length, k, i, j, e;
    for (k = 0; k < K - 1; k++) {
      for (i = 0; i < N; i++) {
        j = (i + 1) % N;
        S.tri0(rings[k][i], rings[k][j], rings[k + 1][j]);
        S.tri0(rings[k][i], rings[k + 1][j], rings[k + 1][i]);
      }
    }
    if (capNose) { e = rings[K - 1]; for (i = 1; i < N - 1; i++) S.tri0(e[0], e[i], e[i + 1]); }
    if (capTail) { e = rings[0]; for (i = 1; i < N - 1; i++) S.tri0(e[0], e[i + 1], e[i]); }
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i];
      var mesh = new THREE.Mesh(e.s.geo(THREE, e.mat.userData && e.mat.userData.worldUV), e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* ---------------------------------------------------------- the hull */
  /* Cross-section, counter-clockwise in (y, z): the belly, the lower side
     that slopes out to the shoulder above the tyres, the upright side, a
     chamfered roof edge. */
  function hullRing(x, zb, zr, wb, ws) {
    var zs = zb + 0.45 * (zr - zb), ct = 0.10;
    return [[x, -wb, zb], [x, wb, zb], [x, ws, zs], [x, ws, zr - ct], [x, ws - ct, zr],
            [x, -ws + ct, zr], [x, -ws, zr - ct], [x, -ws, zs]];
  }
  function buildHull(K, T, S) {
    var h = S.hood;
    K.loft(T.skin, [
      hullRing(-HL, S.bellyTail, S.roof, S.wb * 0.95, S.ws),
      hullRing(-HL + 0.28, S.belly, S.roof, S.wb, S.ws),
      hullRing(1.00, S.belly, S.roof, S.wb, S.ws),
      hullRing(h[0][0], S.belly + 0.08, h[0][1], S.wb, S.ws),
      hullRing(h[1][0], S.belly + 0.10, h[1][1], S.wb, S.ws),
      hullRing(h[2][0], S.belly + S.up3, h[2][1], S.wb * 0.92, S.ws - 0.04),
      hullRing(HL, S.belly + S.upN, h[3][1], S.wb * 0.80, S.ws - 0.13)
    ], true, true);

    /* the wheel-arch covers: a plate over each pair of tyres */
    var zt = 2 * S.R + 0.015, ya = S.yc - S.W / 2 - 0.02, yb = S.yc + S.W / 2 + 0.02, sd;
    for (sd = -1; sd <= 1; sd += 2) {
      K.box(T.skin, AX[1] - 0.52, AX[0] + 0.50, sd * ya, sd * yb, zt, zt + 0.06);
      K.box(T.skin, AX[3] - 0.50, AX[2] + 0.52, sd * ya, sd * yb, zt, zt + 0.06);
    }
    /* tow shackles, headlamps and the nose plate's bolt row */
    var zn = S.belly + S.upN, wn = S.ws - 0.13;
    for (sd = -1; sd <= 1; sd += 2) {
      K.box(T.metal, HL - 0.02, HL + 0.07, sd * 0.78 - 0.04, sd * 0.78 + 0.04, zn + 0.04, zn + 0.17);
      K.box(T.glass, HL - 0.03, HL + 0.015, sd * (wn - 0.20) - 0.08, sd * (wn - 0.20) + 0.08, h[3][1] - 0.20, h[3][1] - 0.08);
    }
    /* rear door outline and tail lamps */
    var zr0 = S.bellyTail + 0.18, zr1 = S.roof - 0.20;
    K.box(T.metal, -HL - 0.02, -HL, -1.00, 1.00, zr0, zr0 + 0.04);
    K.box(T.metal, -HL - 0.02, -HL, -1.00, 1.00, zr1 - 0.04, zr1);
    K.box(T.metal, -HL - 0.02, -HL, -1.00, -0.96, zr0, zr1);
    K.box(T.metal, -HL - 0.02, -HL, 0.96, 1.00, zr0, zr1);
    K.box(T.metal, -HL - 0.02, -HL, -0.02, 0.02, zr0, zr1);
    /* the driver's hatch, front left, with its three periscopes */
    var xd = 2.35, zh = roofAt(S, xd) - 0.04, sd2 = 0.50;
    K.cyl(T.skin, [xd, sd2, zh], [xd, sd2, zh + 0.15], 0.30, 0.29, 14, false, true);
    K.cyl(T.metal, [xd, sd2, zh + 0.15], [xd, sd2, zh + 0.18], 0.27, 0.27, 14, false, true);
    var pi;
    for (pi = -1; pi <= 1; pi++) K.box(T.glass, xd + 0.24, xd + 0.30, sd2 + pi * 0.16 - 0.05, sd2 + pi * 0.16 + 0.05, zh + 0.07, zh + 0.14);
    /* the engine deck's louvred panel, front right, lying on the slope */
    var xe = 2.40, pt = hoodPitch(S);
    K.boxR(T.metal, xe, -0.62, roofAt(S, xe) + 0.012, 1.10, 0.80, 0.025, 0, pt, 0);
    /* the slat attachment rack: a perforated plate high on each side aft */
    var rz1 = S.roof - 0.04, rz0 = S.roof - 0.42, hx;
    for (sd = -1; sd <= 1; sd += 2) {
      K.box(T.skin, -3.05, -1.50, sd * S.ws, sd * (S.ws + 0.045), rz0, rz1);
      for (hx = 0; hx < 8; hx++)
        K.box(T.metal, -2.95 + hx * 0.19, -2.88 + hx * 0.19, sd * (S.ws + 0.045), sd * (S.ws + 0.052), rz0 + 0.12, rz0 + 0.19);
    }
    /* whip antennas on the rear roof corners */
    for (sd = -1; sd <= 1; sd += 2) {
      K.cyl(T.metal, [-3.15, sd * 1.05, S.roof], [-3.15, sd * 1.05, S.roof + 0.10], 0.045, 0.045, 6, false, true);
      K.cyl(T.metal, [-3.15, sd * 1.05, S.roof + 0.10], [-3.15, sd * 1.05, S.roof + 1.35], 0.011, 0.007, 5, false, true);
    }
  }

  /* Slat armour: a cage of upright bars on rails, 0.2 m off the sides and
     the tail, over the tyres.  Real slat ends short of the nose. */
  function buildSlat(K, T, S) {
    var xa = -HL - 0.22, xb = 1.35, ys = S.ws + 0.19, z0 = 1.22, z1 = S.roof + 0.08, sd, x, y, zm = (z0 + z1) / 2;
    for (sd = -1; sd <= 1; sd += 2) {
      for (x = xa; x <= xb + 0.001; x += 0.2) K.box(T.skin, x - 0.03, x + 0.03, sd * ys - 0.025, sd * ys + 0.025, z0, z1);
      K.box(T.skin, xa - 0.03, xb + 0.03, sd * ys - 0.035, sd * ys + 0.035, z1 - 0.05, z1);
      K.box(T.skin, xa - 0.03, xb + 0.03, sd * ys - 0.035, sd * ys + 0.035, z0, z0 + 0.05);
      K.box(T.skin, xa - 0.03, xb + 0.03, sd * ys - 0.035, sd * ys + 0.035, zm - 0.025, zm + 0.025);
    }
    var zl = 1.00;
    for (y = -ys + 0.2; y <= ys - 0.199; y += 0.2) K.box(T.skin, xa - 0.025, xa + 0.025, y - 0.03, y + 0.03, zl, z1);
    K.box(T.skin, xa - 0.035, xa + 0.035, -ys, ys, z1 - 0.05, z1);
    K.box(T.skin, xa - 0.035, xa + 0.035, -ys, ys, zl, zl + 0.05);
    K.box(T.skin, xa - 0.035, xa + 0.035, -ys, ys, (zl + z1) / 2 - 0.025, (zl + z1) / 2 + 0.025);
  }

  /* ------------------------------------------------------------ wheels */
  /* A surface of revolution about Y; prof is [r, y] pairs, y0 the centre.
     The outward side of a span walked from p0 to p1 is (dy, -dr). */
  function lathe(Sp, prof, seg, y0) {
    for (var i = 0; i < prof.length - 1; i++) {
      var r0 = prof[i][0], ya = y0 + prof[i][1], r1 = prof[i + 1][0], yb = y0 + prof[i + 1][1];
      var dr = r1 - r0, dy = yb - ya, l = Math.sqrt(dr * dr + dy * dy);
      var nr = dy / l, ny = -dr / l;
      for (var j = 0; j < seg; j++) {
        var a0 = j / seg * Math.PI * 2, a1 = (j + 1) / seg * Math.PI * 2;
        var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
        var A = [r0 * c0, ya, r0 * s0], B = [r0 * c1, ya, r0 * s1];
        var Cc = [r1 * c1, yb, r1 * s1], D = [r1 * c0, yb, r1 * s0];
        var nA = [nr * c0, ny, nr * s0], nB = [nr * c1, ny, nr * s1];
        if (r0 > 1e-6) Sp.triN(A, B, Cc, nA, nB, nB);
        if (r1 > 1e-6) Sp.triN(A, Cc, D, nA, nB, nA);
      }
    }
  }
  /* One axle: the left and the right tyre, tread lugs, and the painted disc
     and hub cap on each outer face.  The origin is the axle line. */
  function wheelGeos(THREE, T, S) {
    var R = S.R, W = S.W, h = W / 2, LUG = S.lug, tire = new Soup(), hub = new Soup();
    var Kh = new Baker(THREE), sd, k, LUGS = 12;
    for (sd = -1; sd <= 1; sd += 2) {
      var y0 = sd * S.yc;
      lathe(tire, [[0.27, -h + 0.04], [R * 0.80, -h], [R - LUG, -h + 0.06], [R - LUG, h - 0.06],
                   [R * 0.80, h], [0.27, h - 0.04]], 16, y0);
      /* lugs: blocks across the tread; lug 0 is centred straight down so
         the tyre stands on one and the model rests on z = 0 */
      var pitch = Math.PI * 2 / LUGS, tw = R * pitch * 0.26, ya = y0 - h + 0.05, yb = y0 + h - 0.05;
      for (k = 0; k < LUGS; k++) {
        var a = -Math.PI / 2 + k * pitch, ca = Math.cos(a), sa = Math.sin(a);
        var ri = R - LUG - 0.006, ro = R;
        var c = [(ri + ro) / 2 * ca, y0, (ri + ro) / 2 * sa];
        var P = function (r, t, y) { return [r * ca - t * sa, y, r * sa + t * ca]; };
        var o0 = P(ro, -tw, ya), o1 = P(ro, tw, ya), o2 = P(ro, tw, yb), o3 = P(ro, -tw, yb);
        var i0 = P(ri, -tw, ya), i1 = P(ri, tw, ya), i2 = P(ri, tw, yb), i3 = P(ri, -tw, yb);
        tire.quad(o0, o1, o2, o3, c);
        tire.quad(o0, o1, i1, i0, c); tire.quad(o3, o2, i2, i3, c);
        tire.quad(o0, o3, i3, i0, c); tire.quad(o1, o2, i2, i1, c);
      }
      /* disc and hub cap on the outer face only */
      var yo = y0 + sd * (h - 0.05);
      Kh.cyl(T.skin, [0, yo, 0], [0, yo + sd * 0.045, 0], 0.30, 0.30, 12, false, true);
      Kh.cyl(T.skin, [0, yo + sd * 0.045, 0], [0, yo + sd * 0.085, 0], 0.13, 0.10, 10, false, true);
    }
    var hg = Kh.S(T.skin).geo(THREE, 0), uv = hg.attributes.uv.array, ui;
    for (ui = 0; ui < uv.length; ui++) uv[ui] = 0.5;
    return { tire: tire.geo(THREE, 0), hub: hg };
  }
  function buildWheels(THREE, g, T, S) {
    var G = wheelGeos(THREE, T, S), i;
    for (i = 0; i < 4; i++) {
      var w = new THREE.Group();
      w.name = "roadwheel";
      w.position.set(AX[i], 0, S.R);
      var m1 = new THREE.Mesh(G.tire, T.rubber), m2 = new THREE.Mesh(G.hub, T.skin);
      m1.castShadow = m2.castShadow = true; m1.receiveShadow = m2.receiveShadow = true;
      w.add(m1); w.add(m2);
      g.add(w);
    }
  }

  /* ----------------------------------------------------------- turrets */
  function hexRing(x, w, z0, z1, z2, s) {
    return [[x, -w, z0], [x, w, z0], [x, w, z1], [x, w - s, z2], [x, -w + s, z2], [x, -w, z1]];
  }
  /* A hatch: a short ring with a flat lid, at (x, y) on a deck at z. */
  function hatch(K, T, x, y, z, r, hgt) {
    K.cyl(T.skin, [x, y, z], [x, y, z + hgt], r, r * 0.96, 14, false, true);
    K.cyl(T.metal, [x, y, z + hgt], [x, y, z + hgt + 0.025], r * 0.88, r * 0.88, 12, false, true);
  }

  /* M1128: the low-profile turret.  Origin on the ring, 0.55 m behind the
     hull's middle; the 105 mm tube reaches 0.4 m past the nose. */
  function buildMGSTurret(THREE, T, S) {
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(-0.55, 0, S.roof);
    K.loft(T.skin, [
      hexRing(-1.80, 0.95, 0.04, 0.42, 0.58, 0.12),
      hexRing(-1.67, 1.12, 0.04, 0.48, 0.66, 0.14),
      hexRing(-0.25, 1.18, 0.04, 0.54, 0.72, 0.15),
      hexRing(0.55, 1.12, 0.04, 0.52, 0.70, 0.15),
      hexRing(0.95, 0.80, 0.04, 0.46, 0.62, 0.12),
      hexRing(1.12, 0.56, 0.10, 0.40, 0.52, 0.10)
    ], true, true);
    /* the slab mantlet, the 105 mm M68A2, its bore evacuator and muzzle brake */
    K.box(T.metal, 1.10, 1.30, -0.40, 0.40, 0.20, 0.68);
    K.cyl(T.metal, [1.28, 0, 0.46], [4.47, 0, 0.46], 0.088, 0.074, 14, true, true);
    K.cyl(T.metal, [1.85, 0, 0.46], [2.35, 0, 0.46], 0.118, 0.118, 14, true, true);
    K.cyl(T.metal, [4.17, 0, 0.46], [4.47, 0, 0.46], 0.112, 0.112, 12, true, true);
    K.cyl(T.metal, [1.28, -0.17, 0.33], [1.62, -0.17, 0.33], 0.022, 0.022, 6, true, true);
    /* smoke grenade launchers on the front cheeks */
    var sd;
    for (sd = -1; sd <= 1; sd += 2) K.box(T.metal, 0.72, 0.92, sd * 0.80 - 0.11, sd * 0.80 + 0.11, 0.58, 0.70);
    /* commander's cupola with the M2, starboard; loader's hatch, port */
    K.cyl(T.skin, [-0.55, -0.45, 0.68], [-0.55, -0.45, 0.89], 0.31, 0.29, 14, false, true);
    K.cyl(T.metal, [-0.55, -0.45, 0.89], [-0.55, -0.45, 0.915], 0.26, 0.26, 12, false, true);
    K.box(T.glass, -0.30, -0.26, -0.58, -0.32, 0.81, 0.87);
    K.box(T.metal, -0.48, -0.16, -0.51, -0.39, 0.95, 1.05);
    K.cyl(T.metal, [-0.16, -0.45, 1.00], [0.66, -0.45, 1.00], 0.022, 0.022, 6, true, true);
    K.box(T.metal, -0.50, -0.46, -0.47, -0.43, 0.89, 0.97);
    hatch(K, T, -0.60, 0.50, 0.68, 0.28, 0.07);
    /* the gunner's sight, front right of the roof */
    K.box(T.metal, 0.40, 0.78, -0.62, -0.30, 0.66, 0.90);
    K.box(T.glass, 0.78, 0.80, -0.56, -0.36, 0.73, 0.84);
    K.box(T.metal, -1.83, -1.79, -0.50, 0.50, 0.16, 0.36);
    K.flush(tg);
    return tg;
  }

  /* M1134: the elevating TOW launcher, origin on its slewing ring. */
  function buildATGMTurret(THREE, T, S) {
    var tg = new THREE.Group(), K = new Baker(THREE), sd;
    tg.name = "turret";
    tg.position.set(-0.30, 0, S.roof);
    K.cyl(T.skin, [0, 0, 0], [0, 0, 0.10], 0.52, 0.52, 16, false, true);
    K.box(T.skin, -0.27, 0.27, -0.30, 0.30, 0.10, 0.42);
    K.box(T.skin, -0.55, 0.40, -0.52, 0.52, 0.42, 0.84);
    /* sight head on the housing, day and thermal windows to the front */
    K.box(T.metal, 0.10, 0.55, -0.20, 0.20, 0.84, 1.04);
    K.box(T.glass, 0.55, 0.57, -0.17, -0.03, 0.90, 0.98);
    K.box(T.glass, 0.55, 0.57, 0.03, 0.17, 0.90, 0.98);
    /* the two TOW tubes, one either side, with their brackets */
    for (sd = -1; sd <= 1; sd += 2) {
      K.cyl(T.metal, [-0.60, sd * 0.66, 0.63], [0.95, sd * 0.66, 0.63], 0.11, 0.11, 12, true, true);
      K.cyl(T.glass, [0.95, sd * 0.66, 0.63], [0.965, sd * 0.66, 0.63], 0.085, 0.085, 10, false, true);
      K.box(T.metal, -0.25, 0.30, sd * 0.52 - 0.02, sd * 0.52 + 0.02, 0.50, 0.76);
      K.box(T.metal, -0.25, 0.30, sd * 0.57, sd * 0.575 + 0.05, 0.52, 0.74);
    }
    K.flush(tg);
    return tg;
  }

  /* Stryker A1 IM-SHORAD: the RIwP turret, origin on its ring. */
  function buildSHORADTurret(THREE, T, S) {
    var tg = new THREE.Group(), K = new Baker(THREE), sd;
    tg.name = "turret";
    tg.position.set(-1.05, 0, S.roof);
    K.cyl(T.skin, [0, 0, 0], [0, 0, 0.12], 0.92, 0.92, 18, false, true);
    K.loft(T.skin, [
      hexRing(-0.88, 0.90, 0.10, 0.36, 0.52, 0.12),
      hexRing(-0.70, 0.98, 0.10, 0.38, 0.56, 0.14),
      hexRing(0.40, 0.98, 0.10, 0.40, 0.58, 0.14),
      hexRing(0.82, 0.70, 0.10, 0.36, 0.50, 0.12)
    ], true, true);
    /* the raised centre section, the M230LF on its cradle, the coax */
    K.box(T.skin, -0.30, 0.55, -0.40, 0.25, 0.55, 0.80);
    K.box(T.metal, 0.30, 0.70, -0.12, 0.12, 0.62, 0.86);
    K.cyl(T.metal, [0.70, 0, 0.74], [1.52, 0, 0.74], 0.042, 0.038, 8, true, true);
    K.cyl(T.metal, [1.50, 0, 0.74], [1.66, 0, 0.74], 0.062, 0.062, 8, true, true);
    K.cyl(T.metal, [0.70, 0.12, 0.70], [1.15, 0.12, 0.70], 0.018, 0.018, 6, true, true);
    /* electro-optical sensor head, front left of the gun */
    K.box(T.metal, 0.40, 0.66, 0.25, 0.47, 0.80, 1.02);
    K.box(T.glass, 0.66, 0.68, 0.29, 0.43, 0.86, 0.96);
    /* reload hatches in the roof */
    K.box(T.metal, -0.62, -0.30, -0.30, 0.30, 0.55, 0.575);
    /* Stinger pod on the starboard arm: four tubes, nose up */
    K.box(T.skin, -0.05, 0.12, -1.00, -0.88, 0.36, 0.78);
    K.boxR(T.skin, 0.10, -0.98, 1.02, 0.60, 0.42, 0.44, 0, -0.26, 0);
    var cu, cw, pp = 0.26, xa = [Math.cos(pp), 0, Math.sin(pp)], za = [-Math.sin(pp), 0, Math.cos(pp)];
    for (cu = -1; cu <= 1; cu += 2) for (cw = -1; cw <= 1; cw += 2)
      K.boxR(T.glass, 0.10 + 0.305 * xa[0] + cw * 0.10 * za[0], -0.98 + cu * 0.10, 1.02 + 0.305 * xa[2] + cw * 0.10 * za[2],
             0.02, 0.14, 0.14, 0, -pp, 0);
    /* Hellfire rail on the port arm: two missiles, one above the other */
    K.box(T.skin, -0.05, 0.12, 0.88, 1.00, 0.36, 0.72);
    K.box(T.metal, -0.52, -0.46, 0.80, 1.14, 0.66, 1.30);
    K.box(T.metal, 0.12, 0.18, 0.80, 1.14, 0.66, 1.30);
    var mz;
    for (mz = 0; mz < 2; mz++) {
      var zc = 0.82 + mz * 0.26;
      K.cyl(T.metal, [-0.80, 0.97, zc], [0.62, 0.97, zc], 0.088, 0.088, 10, true, false);
      K.cyl(T.glass, [0.62, 0.97, zc], [0.86, 0.97, zc], 0.088, 0.012, 10, false, true);
    }
    K.flush(tg);
    return tg;
  }

  /* The radar arrays: drums on the four roof corners, faces turned out.  Both
     photographs of the A1 (the head-on one and the port-side one) put a drum
     at about 0.4 m across, seated on a short stub with its centre about
     0.25 m above the roof edge, so they sit low and small beside the turret. */
  function buildRadar(K, T, S) {
    var x, sd, c;
    for (x = 0; x < 2; x++) for (sd = -1; sd <= 1; sd += 2) {
      var bx = x === 0 ? 1.25 : -3.15, by = sd * 1.07, fwd = x === 0 ? 1 : -1;
      var th = 0.21, ph = Math.atan2(sd, fwd);            /* 45 deg out from the heading */
      var d = [Math.cos(ph) * Math.cos(th), Math.sin(ph) * Math.cos(th), Math.sin(th)];
      K.cyl(T.metal, [bx, by, S.roof], [bx, by, S.roof + 0.10], 0.075, 0.065, 8, false, true);
      c = [bx, by, S.roof + 0.27];
      K.cyl(T.skin, [c[0] - d[0] * 0.09, c[1] - d[1] * 0.09, c[2] - d[2] * 0.09],
                    [c[0] + d[0] * 0.09, c[1] + d[1] * 0.09, c[2] + d[2] * 0.09], 0.21, 0.21, 14, true, true);
      K.cyl(T.metal, [c[0] + d[0] * 0.09, c[1] + d[1] * 0.09, c[2] + d[2] * 0.09],
                     [c[0] + d[0] * 0.105, c[1] + d[1] * 0.105, c[2] + d[2] * 0.105], 0.18, 0.18, 14, false, true);
    }
  }

  /* ---------------------------------------------------------- assembly */
  function build(THREE, M, C, kind) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group(), S = kind === "shorad" ? DVH : FLAT;
    g.name = kind === "shorad" ? "stryker_m_shorad" : (kind === "atgm" ? "stryker_m1134" : "stryker_m1128");
    var K = new Baker(THREE), sd, i;
    buildHull(K, T, S);
    if (kind !== "shorad") buildSlat(K, T, S);

    if (kind === "mgs") {
      K.box(T.team, 0.80, 1.35, -0.60, 0.60, S.roof, S.roof + 0.02);
    } else if (kind === "atgm") {
      hatch(K, T, 0.95, -0.55, S.roof - 0.04, 0.30, 0.12);
      K.cyl(T.metal, [0.80, -0.55, S.roof + 0.26], [1.50, -0.55, S.roof + 0.26], 0.02, 0.02, 6, true, true);
      K.box(T.metal, 0.82, 1.10, -0.60, -0.50, S.roof + 0.20, S.roof + 0.30);
      K.box(T.metal, 0.86, 0.92, -0.58, -0.52, S.roof + 0.06, S.roof + 0.22);
      for (sd = -1; sd <= 1; sd += 2) hatch(K, T, -1.80, sd * 0.50, S.roof - 0.04, 0.27, 0.08);
      K.box(T.team, 0.50, 1.30, 0.05, 0.85, S.roof, S.roof + 0.02);
    } else {
      hatch(K, T, 0.55, -0.45, S.roof - 0.04, 0.30, 0.14);
      for (i = -1; i <= 1; i++) K.box(T.glass, 0.78, 0.83, -0.45 + i * 0.17 - 0.05, -0.45 + i * 0.17 + 0.05, S.roof + 0.07, S.roof + 0.14);
      buildRadar(K, T, S);
      K.box(T.team, 0.15, 0.95, 0.10, 0.90, S.roof, S.roof + 0.02);
    }
    K.flush(g);
    buildWheels(THREE, g, T, S);
    g.add(kind === "mgs" ? buildMGSTurret(THREE, T, S) : (kind === "atgm" ? buildATGMTurret(THREE, T, S)
                                                                          : buildSHORADTurret(THREE, T, S)));
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build };
})();

/* The M1128 under both of its rows, the M1134, and the M-SHORAD.  len is the
   MEASURED X extent: the tail slat to the muzzle brake for the M1128, the tail
   slat to the nose for the M1134, tail to nose for the M-SHORAD. */
UNIT_MODELS["lt_n"] = { len: 7.65, build: function (T, M, C) { return HeroStryker.build(T, M, C, "mgs"); } };
UNIT_MODELS["nato_e00_lighttank"] = { len: 7.65, build: function (T, M, C) { return HeroStryker.build(T, M, C, "mgs"); } };
UNIT_MODELS["atgmv_n"] = { len: 7.28, build: function (T, M, C) { return HeroStryker.build(T, M, C, "atgm"); } };
UNIT_MODELS["spaag_n"] = { len: 7.04, build: function (T, M, C) { return HeroStryker.build(T, M, C, "shorad"); } };
