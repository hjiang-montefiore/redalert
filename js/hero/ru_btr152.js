/* ===== ru_btr152.js - HERO model: BTR-152 armoured personnel carrier =========
   Row pact_e50_ifv ("BTR-152 Armoured Personnel Carrier", e50, turret:true,
   cargo 6).  The 1950 BTR-152 on the ZiS-151 truck chassis: 6x6, front axle
   plus a rear tandem, a bonnet with an armoured radiator shutter in front, a
   cab with sloped armoured windscreen and armoured side doors, then the
   open-topped troop compartment with sloped sides and a sloped tail.

   Published figures (Wikipedia en/ru BTR-152 infobox, ZIS-151 article):
     base BTR-152 length 6.55 m (6.83 m is the BTR-152V with its front fittings),
     width 2.32 m, hull height 2.04 m without the machine gun (2.36 m with it),
     clearance 0.295-0.300 m, track 1.72 m, wheelbase 3.88 m (front axle to the
     centre of the rear bogie; ZIS-151 bogie 1.12 m, so axles 3.32 and 4.44 m
     behind the front one), 9.00-20 tyres (ZiS-150 pattern with off-road tread
     on 1947-55 vehicles), armament one 7.62 mm SGMB on a pintle.
   What each feature rests on (Commons photographs fetched by the check pass:
   "BTR-152V, Kubinka tank museum.jpg", "BTR-152 APC in Berlin.jpg",
   "Skarzysko BTR-152 04.jpg", "BTR-152 TNI di Museum Angkut.jpg" plus the
   builder's "Skarzysko BTR-152 01.jpg"):
     - upper hull leaning inward above a sill with a lower vertical plate
       between the tyres, rear tyres tucked under the sill shelf, sloped tail,
       rear-leaning armoured windscreen with closed armour covers, doors with
       hinges, round filler bosses on the sill plate, three round vision ports
       a side on the troop box: Kubinka / Berlin / Skarzysko photographs.
     - front fenders arched over the front tyre with a running board behind,
       headlamp with a wire guard on the fender top, beam bumper, louvred
       radiator shutter: Kubinka and Indonesia photographs.
     - axle stations, clearance, track, height: the published figures above.
   Open top (no roof, no tarpaulin): the 1950 model is open-topped; the roof is
   the later BTR-152K.  NOT confirmed: the bench layout (two side benches and a
   centre bench drawn), the exact stations of the round ports, the pintle post
   (drawn on the cab floor, gun axis 0.46 m over the hull top so the overall
   height is 2.36 m as published); no spare wheel is drawn (none seen in the
   photographs).  No radio, no antenna, no tactical markings, no later kit
   (no tyre-inflation pipework, no night-vision gear).

   Game use: turret:true, so the SGMB on its pintle is the group "turret"
   (origin on the pintle foot, gun along +X, trains with the pintle).  Six
   "roadwheel" groups, axle on local Y.  Team material exactly C.team (a
   strip along each rim of the troop compartment, facing up).
   Draw calls: 4 hull meshes + 2 turret meshes + 6 wheels = 12.  Materials 5.
   Model space: +X nose, +Y left (port), +Z up, metres, tyres on z = 0.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBtr152 = (function () {
  "use strict";

  var AXF = 2.29, AXR1 = -1.03, AXR2 = -2.15;      /* axle stations (3.88 m to bogie centre, 1.12 m tandem) */
  var TR = 0.54, TW = 0.26, TY = 0.86;             /* tyre radius, width, track 1.72 m / 2 */
  var ZB = 0.295, ZS = 1.12, ZT = 2.04;            /* clearance, sill, hull top  */
  var XTAIL = -3.10, XTAILT = -2.90;               /* sloped tail wall           */
  var WB = 1.16, WT = 0.82;                        /* half-width at sill / top   */

  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var K = {
    blk: lin(0x181816), dkg: lin(0x2b2e28), rub: lin(0x1b1b19), rim: lin(0x3c4731),
    hub: lin(0x6c6e66), nut: lin(0x8c8c84), floor: lin(0x4a4e3c), seat: lin(0x7a6444),
    lens: lin(0xe8dca8), steelc: lin(0x77797a)
  };

  function makeMats(THREE, C) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: 0x4a5638, roughness: 0.9, metalness: 0.06 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.86, metalness: 0.06 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x2a2c2b, roughness: 0.45, metalness: 0.55 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2428, roughness: 0.15, metalness: 0.3 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    return T;
  }

  /* ---------------------------------------------------------------- baking */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.slot = function (mat) {
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) return this.by[i];
    var s = { mat: mat, P: [], N: [], C: [], vc: !!mat.vertexColors };
    this.by.push(s);
    return s;
  };
  Baker.prototype.tri = function (mat, a, b, c, col) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var s = this.slot(mat);
    s.P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    s.N.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    if (s.vc) { var k = col || K.dkg; s.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]); }
  };
  Baker.prototype.triAway = function (mat, a, b, c, hint, col) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var mx = (a[0] + b[0] + c[0]) / 3 - hint[0], my = (a[1] + b[1] + c[1]) / 3 - hint[1], mz = (a[2] + b[2] + c[2]) / 3 - hint[2];
    if (nx * mx + ny * my + nz * mz < 0) this.tri(mat, a, c, b, col); else this.tri(mat, a, b, c, col);
  };
  Baker.prototype.quad = function (mat, a, b, c, d, hint, col) {
    this.triAway(mat, a, b, c, hint, col);
    this.triAway(mat, a, c, d, hint, col);
  };
  /* convex six-faced solid: corners 0-3 the bottom ring, 4-7 the top ring, same order */
  Baker.prototype.hexa = function (mat, c, col, skip) {
    var h = [0, 0, 0], i;
    for (i = 0; i < 8; i++) { h[0] += c[i][0] / 8; h[1] += c[i][1] / 8; h[2] += c[i][2] / 8; }
    var F = [["-z", 0, 3, 2, 1], ["+z", 4, 5, 6, 7], ["a", 0, 1, 5, 4], ["b", 3, 7, 6, 2], ["c", 0, 4, 7, 3], ["d", 1, 2, 6, 5]];
    for (i = 0; i < 6; i++) {
      if (skip && skip.indexOf(F[i][0]) >= 0) continue;
      this.quad(mat, c[F[i][1]], c[F[i][2]], c[F[i][3]], c[F[i][4]], h, col);
    }
  };
  Baker.prototype.box = function (mat, x0, x1, y0, y1, z0, z1, col, skip) {
    this.hexa(mat, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], col, skip);
  };
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, col) {
    var THREE = this.T;
    var geo = new THREE.CylinderGeometry(r, r, len, seg, 1, false).toNonIndexed();
    var m = new THREE.Matrix4();
    if (axis === "x") m.makeRotationZ(-Math.PI / 2); else if (axis === "z") m.makeRotationX(Math.PI / 2);
    m.setPosition(x, y, z);
    geo.applyMatrix4(m);
    var p = geo.attributes.position.array, n = geo.attributes.normal.array, s = this.slot(mat), i;
    for (i = 0; i < p.length; i++) { s.P.push(p[i]); s.N.push(n[i]); }
    if (s.vc) { var k = col || K.dkg; for (i = 0; i < p.length / 3; i++) s.C.push(k[0], k[1], k[2]); }
  };
  Baker.prototype.addSoup = function (mat, S, tf) {
    var s = this.slot(mat), i, p;
    for (i = 0; i < S.P.length; i += 3) { p = tf([S.P[i], S.P[i + 1], S.P[i + 2]]); s.P.push(p[0], p[1], p[2]); }
    for (i = 0; i < S.N.length; i += 3) { p = tf([S.N[i], S.N[i + 1], S.N[i + 2]], true); s.N.push(p[0], p[1], p[2]); }
    for (i = 0; i < S.C.length; i++) s.C.push(S.C[i]);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i];
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(e.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(e.N), 3));
      if (e.vc) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(e.C), 3));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* ------------------------------------------------------------------ tyre */
  /* Zig-zag tread of 24 lugs, flat sidewalls, painted rim disc with hub and
     eight nuts.  Axle on local Y, outer face on +Y for side +1.  Soup with
     per-vertex colour; lowest vertex is a lug at exactly -TR. */
  function wheelSoup(THREE, side) {
    var B = new Baker(THREE), M = { vertexColors: true };
    var mat = { vertexColors: true };
    var N = 24, i, k, a, r, pts = [], yo = side * TW / 2, yi = -yo;
    for (i = 0; i < 2 * N; i++) {
      a = i * Math.PI / N;
      r = (i % 2 === 0) ? TR : TR - 0.035;
      pts.push([Math.cos(a), Math.sin(a), r]);
    }
    /* lowest lug at -z exactly: rotate so that angle -90 deg is a lug vertex */
    for (i = 0; i < 2 * N; i++) {
      var p0 = pts[i], p1 = pts[(i + 1) % (2 * N)];
      var a0 = [p0[0] * p0[2], yi, p0[1] * p0[2]], b0 = [p0[0] * p0[2], yo, p0[1] * p0[2]];
      var a1 = [p1[0] * p1[2], yi, p1[1] * p1[2]], b1 = [p1[0] * p1[2], yo, p1[1] * p1[2]];
      B.quad(mat, a0, a1, b1, b0, [0, 0, 0], K.rub);
      var ro = 0.36, rr = 0.05;
      var o0 = [p0[0] * ro, yo, p0[1] * ro], o1 = [p1[0] * ro, yo, p1[1] * ro];
      var q0 = [p0[0] * rr, yo, p0[1] * rr], q1 = [p1[0] * rr, yo, p1[1] * rr];
      var oi0 = [p0[0] * ro, yi, p0[1] * ro], oi1 = [p1[0] * ro, yi, p1[1] * ro];
      var far = [0, -side * 2, 0], near = [0, side * 2, 0];
      B.quad(mat, b0, b1, o1, o0, far, K.rub);                   /* outer sidewall */
      B.quad(mat, o0, o1, q1, q0, far, K.rim);                   /* rim disc       */
      B.quad(mat, a0, a1, oi1, oi0, near, K.rub);                /* inner sidewall */
      B.quad(mat, oi0, oi1, [p1[0] * 0.05, yi, p1[1] * 0.05], [p0[0] * 0.05, yi, p0[1] * 0.05], near, K.rim);
    }
    /* hub cap and nuts on the outer face */
    B.cyl(mat, 0.09, 0.06, 10, 0, yo + side * 0.02, 0, "y", K.hub);
    for (k = 0; k < 8; k++) {
      a = k * Math.PI / 4;
      B.cyl(mat, 0.022, 0.05, 5, Math.cos(a) * 0.14, yo + side * 0.025, Math.sin(a) * 0.14, "y", K.nut);
    }
    var s = B.slot(mat);
    return { P: s.P, N: s.N, C: s.C };
  }
  function soupGeo(THREE, S) {
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(S.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(S.N), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(S.C), 3));
    geo.computeBoundingSphere();
    return geo;
  }

  /* ----------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "ru_btr152";
    var B = new Baker(THREE);
    var P = T.paint, V = T.vc, ST = T.steel, GL = T.glass, TM = T.team;
    var s, i, x, z;

    /* outer half-width of the leaning side at height z */
    function yo(zz) { return WB - (zz - ZS) * (WB - WT) / (ZT - ZS); }

    /* ---- belly and chassis ---- */
    B.box(P, XTAIL, 1.05, -0.72, 0.72, 0.34, ZS);                       /* lower hull between the tyres */
    B.box(V, XTAIL + 0.05, 1.0, -0.62, 0.62, ZB, 0.40, K.dkg);          /* frame rails                   */
    for (i = 0; i < 3; i++) {
      x = [AXF, AXR1, AXR2][i];
      B.cyl(V, 0.06, 1.72, 8, x, 0, TR, "y", K.dkg);
      B.box(V, x - 0.18, x + 0.18, -0.2, 0.2, ZB, 0.50, K.dkg);         /* axle casing / differential    */
    }
    /* rear bogie leaf springs */
    for (s = -1; s <= 1; s += 2) B.box(V, AXR2 - 0.05, AXR1 + 0.05, s * 0.62 - 0.04, s * 0.62 + 0.04, 0.50, 0.56, K.dkg);
    /* shelf over the rear tyres and the sloped sill plate between the wheel stations */
    B.box(P, XTAIL, -0.42, -WB, WB, ZS - 0.04, ZS);
    for (s = -1; s <= 1; s += 2) {
      B.hexa(P, [[-0.42, s * 0.72, 0.34], [1.10, s * 0.72, 0.34], [1.10, s * WB, ZS], [-0.42, s * WB, ZS],
                 [-0.42, s * 0.72, ZS], [1.10, s * 0.72, ZS], [1.10, s * WB, ZS + 0.04], [-0.42, s * WB, ZS + 0.04]]);
      /* round fuel filler boss on the sill plate (Skarzysko / Berlin photographs) */
      B.cyl(V, 0.07, 0.05, 10, -0.20, s * 1.07, 0.92, "y", K.dkg);
    }

    /* ---- bonnet: sloped front, armoured radiator shutter and guard ---- */
    B.hexa(P, [[1.05, -0.80, 0.75], [3.15, -0.80, 0.75], [3.15, 0.80, 0.75], [1.05, 0.80, 0.75],
               [1.05, -0.64, 1.52], [2.92, -0.64, 1.52], [2.92, 0.64, 1.52], [1.05, 0.64, 1.52]]);
    B.box(P, 1.05, 3.10, -0.80, 0.80, ZB + 0.1, 0.78);
    function xf(zz) { return 3.15 - (zz - 0.75) * 0.23 / 0.77; }
    B.hexa(V, [[xf(0.86) + 0.07, -0.55, 0.86], [xf(0.86) + 0.01, -0.55, 0.86], [xf(0.86) + 0.01, 0.55, 0.86], [xf(0.86) + 0.07, 0.55, 0.86],
               [xf(1.40) + 0.07, -0.55, 1.40], [xf(1.40) + 0.01, -0.55, 1.40], [xf(1.40) + 0.01, 0.55, 1.40], [xf(1.40) + 0.07, 0.55, 1.40]], K.blk);
    /* bumper beam and its two end brackets */
    B.box(V, 3.20, 3.41, -1.10, 1.10, 0.52, 0.72, K.steelc);
    for (s = -1; s <= 1; s += 2) B.box(V, 3.02, 3.20, s * 0.55 - 0.04, s * 0.55 + 0.04, 0.56, 0.66, K.dkg);
    /* hood ridge hatch */
    B.box(P, 1.55, 2.10, -0.30, 0.30, 1.52, 1.56);

    /* ---- front fenders: arched over the front tyre, running board behind ---- */
    function fendArch(sd) {
      var y0 = sd > 0 ? 0.78 : -1.16, y1 = sd > 0 ? 1.16 : -0.78, R = 0.64, n = 14, k, a0, a1, p0, p1;
      for (k = 0; k < n; k++) {
        a0 = (15 + 150 * k / n) * Math.PI / 180; a1 = (15 + 150 * (k + 1) / n) * Math.PI / 180;
        p0 = [AXF + R * Math.cos(a0), TR + R * Math.sin(a0)]; p1 = [AXF + R * Math.cos(a1), TR + R * Math.sin(a1)];
        /* arch skin, outward face only (the camera never looks up under it) */
        B.quad(P, [p0[0], y0, p0[1]], [p1[0], y0, p1[1]], [p1[0], y1, p1[1]], [p0[0], y1, p0[1]], [AXF, sd * 0.97, TR]);
        /* outer lip, facing outboard */
        B.quad(P, [p0[0], sd * 1.16, p0[1]], [p1[0], sd * 1.16, p1[1]], [p1[0], sd * 1.16, p1[1] - 0.04], [p0[0], sd * 1.16, p0[1] - 0.04], [AXF, 0, TR]);
      }
      /* running board between the arch and the cab door */
      B.box(P, 1.05, AXF - R * 0.966, y0, y1, 0.74, 0.78);
      /* headlamp with a wire guard on the fender top, ahead of the tyre */
      B.cyl(V, 0.08, 0.10, 8, 2.62, sd * 0.90, 1.24, "x", K.lens);
      B.box(V, 2.56, 2.90, sd * 0.90 - 0.10, sd * 0.90 + 0.10, 1.17, 1.20, K.dkg);
      B.box(V, 2.78, 2.80, sd * 0.90 - 0.10, sd * 0.90 + 0.10, 1.17, 1.36, K.dkg);
      B.box(V, 2.56, 2.80, sd * 0.90 - 0.10, sd * 0.90 - 0.08, 1.20, 1.34, K.dkg);
      B.box(V, 2.56, 2.80, sd * 0.90 + 0.08, sd * 0.90 + 0.10, 1.20, 1.34, K.dkg);
    }
    fendArch(1); fendArch(-1);

    /* ---- armoured cab: windscreen plate with closed armour covers, open above ---- */
    B.hexa(P, [[1.00, -1.08, 1.45], [1.05, -1.08, 1.45], [1.05, 1.08, 1.45], [1.00, 1.08, 1.45],
               [0.75, -WT + 0.01, ZT], [0.80, -WT + 0.01, ZT], [0.80, WT - 0.01, ZT], [0.75, WT - 0.01, ZT]]);
    function xw(zz) { return 1.05 - (zz - 1.45) * 0.25 / (ZT - 1.45) + 0.012; }
    for (s = -1; s <= 1; s += 2) {
      var yc = s * 0.40;
      /* vision opening: frame then glass, each leaning with the plate */
      B.quad(V, [xw(1.62) + 0.010, yc - 0.27, 1.62], [xw(1.62) + 0.010, yc + 0.27, 1.62], [xw(1.92) + 0.010, yc + 0.27, 1.92], [xw(1.92) + 0.010, yc - 0.27, 1.92], [0.0, yc, 1.8], K.blk);
      B.quad(GL, [xw(1.65) + 0.025, yc - 0.22, 1.65], [xw(1.65) + 0.025, yc + 0.22, 1.65], [xw(1.89) + 0.025, yc + 0.22, 1.89], [xw(1.89) + 0.025, yc - 0.22, 1.89], [0.0, yc, 1.8]);
    }
    B.box(P, 0.28, 0.36, -0.80, 0.80, ZS, ZT - 0.34);                  /* bulkhead behind the seats */
    /* the two cab seats */
    for (s = -1; s <= 1; s += 2) {
      B.box(V, 0.40, 0.72, s * 0.50 - 0.20, s * 0.50 + 0.20, 1.14, 1.34, K.seat);
      B.box(V, 0.36, 0.42, s * 0.50 - 0.20, s * 0.50 + 0.20, 1.34, 1.70, K.seat);
    }

    /* ---- side walls (cab + troop compartment), leaning inward, with a sloped tail ---- */
    for (s = -1; s <= 1; s += 2) {
      var t = 0.06, y0i = s * (WB - t), y0o = s * WB, y1i = s * (WT - t), y1o = s * WT;
      B.hexa(P, [[XTAIL, y0i, ZS], [1.05, y0i, ZS], [1.05, y0o, ZS], [XTAIL, y0o, ZS],
                 [XTAILT, y1i, ZT], [0.80, y1i, ZT], [0.80, y1o, ZT], [XTAILT, y1o, ZT]]);
      /* round vision ports in the troop-compartment sides (three a side, approximate stations) */
      var px = [-2.75, -2.15, -1.55];
      for (i = 0; i < 3; i++) {
        B.cyl(GL, 0.055, 0.05, 10, px[i], s * (yo(1.70) + 0.004), 1.70, "y");
        B.cyl(V, 0.075, 0.03, 10, px[i], s * (yo(1.70) - 0.006), 1.70, "y", K.dkg);
      }
      /* cab door panel outline: two seams and a handle */
      B.box(V, 0.27, 0.30, s * (yo(1.5) - 0.002) - 0.002, s * (yo(1.5) - 0.002) + 0.002, ZS, ZT - 0.2, K.blk, null);
      B.box(V, 0.95, 0.98, s * yo(1.5) - 0.01, s * yo(1.5) + 0.01, 1.40, 1.50, K.dkg);
      B.box(V, 0.50, 0.60, s * yo(1.55) - 0.02, s * yo(1.55) + 0.02, 1.52, 1.58, K.dkg);
      /* a row of bolt heads along the lower sill of the troop side */
      for (i = 0; i < 8; i++) B.cyl(V, 0.025, 0.02, 5, -2.8 + i * 0.42, s * (yo(1.2) + 0.006), 1.20, "y", K.dkg);
      /* team strip on the rim, facing up */
      B.quad(TM, [-2.85, s * (WT - 0.01), ZT + 0.004], [0.25, s * (WT - 0.01), ZT + 0.004], [0.25, s * (WT - 0.05), ZT + 0.004], [-2.85, s * (WT - 0.05), ZT + 0.004], [0, 0, 0]);
    }
    /* tail wall, leaning in */
    B.hexa(P, [[XTAIL - 0.05, -WB, ZS], [XTAIL + 0.01, -WB, ZS], [XTAIL + 0.01, WB, ZS], [XTAIL - 0.05, WB, ZS],
               [XTAILT - 0.05, -WT, ZT], [XTAILT + 0.01, -WT, ZT], [XTAILT + 0.01, WT, ZT], [XTAILT - 0.05, WT, ZT]]);

    /* ---- the troop compartment inside: floor, three benches ---- */
    B.box(V, -3.00, 1.00, -0.76, 0.76, 1.06, 1.14, K.floor);
    B.box(V, -2.90, 0.20, 0.50, 0.70, 1.14, 1.42, K.seat);
    B.box(V, -2.90, 0.20, -0.70, -0.50, 1.14, 1.42, K.seat);
    B.box(V, -2.90, 0.20, -0.14, 0.14, 1.14, 1.50, K.seat);
    B.box(V, -2.90, 0.20, -0.14, 0.14, 1.50, 1.56, K.dkg);
    /* the pintle post standing on the cab floor */
    B.cyl(V, 0.04, 0.68, 8, 0.50, 0, 1.46, "z", K.dkg);

    B.flush(g);

    /* ---- six wheels ---- */
    var gL = soupGeo(THREE, wheelSoup(THREE, 1)), gR = soupGeo(THREE, wheelSoup(THREE, -1));
    var axs = [AXF, AXR1, AXR2];
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      var w = new THREE.Group();
      w.name = "roadwheel";
      w.position.set(axs[i], s * TY, TR);
      var wm = new THREE.Mesh(s > 0 ? gL : gR, V);
      wm.castShadow = true; wm.receiveShadow = true;
      w.add(wm);
      g.add(w);
    }

    /* ---- the 7.62 mm SGMB on its pintle: the trained "turret" ---- */
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(0.50, 0, 1.80);
    var TB = new Baker(THREE);
    TB.cyl(V, 0.035, 0.40, 8, 0, 0, 0.20, "z", K.dkg);
    TB.cyl(V, 0.07, 0.05, 8, 0, 0, 0.03, "z", K.dkg);
    TB.box(V, -0.08, 0.08, -0.07, 0.07, 0.40, 0.46, K.dkg);             /* cradle    */
    TB.box(ST, -0.12, 0.22, -0.045, 0.045, 0.44, 0.53);                  /* receiver  */
    TB.cyl(ST, 0.027, 0.50, 8, 0.45, 0, 0.49, "x");                      /* jacket    */
    TB.cyl(ST, 0.014, 0.18, 6, 0.79, 0, 0.49, "x");                      /* muzzle    */
    TB.box(ST, -0.20, -0.12, -0.012, 0.012, 0.47, 0.50);                 /* backplate */
    TB.box(V, -0.26, -0.20, -0.07, -0.05, 0.44, 0.52, K.dkg);            /* grips     */
    TB.box(V, -0.26, -0.20, 0.05, 0.07, 0.44, 0.52, K.dkg);
    TB.box(V, 0.00, 0.17, 0.045, 0.14, 0.39, 0.53, K.dkg);               /* belt box  */
    TB.box(ST, 0.12, 0.18, -0.045, 0.045, 0.53, 0.56);                   /* sight     */
    TB.flush(tg);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e50_ifv"] = { len: 6.55, build: HeroRuBtr152.build };
