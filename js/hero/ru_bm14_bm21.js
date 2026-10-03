/* ===== ru_bm14_bm21.js - HERO models: BM-14 and BM-21 Grad truck rocket launchers =====
   Two rows of the Soviet (pact) truck-mounted multiple rocket launcher:
     pact_e50_mlrs  BM-14-16 (8U32, 1952), 16 tubes of 140 mm in two rows of eight on the
                    ZiS-151 6x6 truck, armoured cab
     pact_e60_mlrs  BM-21 Grad (1963), 40 tubes of 122 mm in four rows of ten on the Ural-375D 6x6

   Which truck: en.wikipedia (BM-14): "BM-14 (8U32) - 16-round model (two rows of 8), launcher
   mounted on the ZIS-151 truck, entered service in 1952, also known as BM-14-16"; the ZIL-157 is
   the BM-14M and the GAZ-63A the 17-round BM-14-17 (revealed 1959), so the 1950s row (named
   "BM-14-16" in armour_specs) is drawn on the ZiS-151, not the ZIL-157.

   Published figures: BM-14 length 6.93 m, width 2.3 m, height 2.56 m, 7000 kg (museum data plate,
   USSR BM-14 Multiple Rocket Launcher, Wikimedia Commons 9732335029).  BM-21 length 7.35 m, width
   2.69 m, height 3.09 m (en.wikipedia BM-21 Grad).  Modelled 6.93 x 2.3 x 2.56 and 7.35 x 2.69 x 3.09;
   render3d rescales by the measured X extent, so only proportions survive.

   References (Wikimedia Commons, museum exhibits; what each feature rests on):
     "ZIS-151 Rocket Launcher (22966077674)"  ZiS-151 truck: tall narrow radiator with a vertical
        slat grille, rounded hood and separate round fenders, headlamps on the fender tops, the
        channel bumper, a short cab fitted with hinged armour plates and vision slits, the
        launcher on a turntable behind the cab on the bogie, tubes lying forward.
     "USSR BM-14 Multiple Rocket Launcher (9735565592)" and "VNPA BM-14 - 092025"  the same armoured
        cab box and the 2-tier tube pack on its frame (these are ZIL-157 / ZIL-131 trucks, used
        only for the pack, the cab box and the tool lockers behind the cab).
     "Ural 375-D Rocket Launcher (23309550740)"  Ural-375D: long sloped hood, tall vertical-slat
        grille, round headlamps low on the front fenders, a heavy front bumper, a boxy cab with a
        raked two-pane windscreen, square-flared fenders, big 14.00-20 tyres, a locker box behind
        the cab on the left, the 40-tube pack raised on its cradle behind the cab.
   NOT confirmed and so not drawn: any marking, number, canvas muzzle covers, rear stabiliser jacks,
   a spare wheel.  The tube length of the BM-14 (1.9 m) is scaled off the photographs, not a
   published figure; the elevation angle the pack is raised to is the same 35 degrees the M270 hero
   uses (not a published figure either).  The armoured cab is shown on the BM-14 only: the
   photographs of the Ural-based Grad show an ordinary soft-skin cab.

   Turret: both rows have turret:true.  The launcher (turntable, pedestal, cradle and tubes) is the
   node "turret" on the ring behind the cab, at rest with the tube mouths FORWARD over the cab,
   which is how the real launchers travel and fire.  Rest direction, on photographs (Wikimedia
   Commons): "Ukrainian BM-21 Grad firing" and "Strelba-RSZO-Grad" (Cyrillic title, a Grad
   firing on a range) show the rockets leaving forward over the Ural's cab with the back-blast off
   the rear of the pack - the second with the pack almost level, in its travel lie; "Wyrzutne
   rakiet BM-21 Grad na samochodach Ural 375D" shows Grads on parade with the pack level and its
   mouths just behind the cab.  The BM-14 photographs (ZiS-151, ZIL-157, ZIL-131) show the same
   arrangement - the pack's front end raised over the cab on a trunnion at its rear, and the cab
   armoured with window shutters; no photograph of a BM-14 firing was found, so its firing
   direction rests on that arrangement and not on a firing picture.  An earlier note here said the
   packs travel aft; the firing photographs contradict it, so neither row declares turretRest
   (entities.js restTurret) and the mount rests nose-forward, as render3d trains it
   (rotation.z = -(tang - ang)).  The cradle and tubes are the
   child group "podelev", hinged at the rear trunnion, which render3d (poseLauncher) raises to the
   firing elevation; userData.cells holds each tube mouth for the round and the back-blast.  The
   six tyres are groups named "roadwheel" (axle on local Y).
   Draw calls 16 (hull 4, turret 2, podelev 4, six wheels), materials 6.  The team flash (exactly
   C.team) is a 1 m stripe on the top of the tube pack, up-facing.
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBm = (function () {
  "use strict";

  function Soup() { this.p = []; this.n = []; }
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
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(this.p.length / 3 * 2).fill(0), 2));
    return g;
  };
  /* One merged mesh per material.  `pre` is an optional matrix every part is
     put through on the way in: about(px, pz) takes parts authored in the
     module's frame into the elevating group's, whose origin is the rear
     trunnion; about() clears it. */
  function Baker(THREE) { this.T = THREE; this.by = []; this.pre = null; }
  Baker.prototype.about = function (px, pz) {
    this.pre = px === undefined ? null : new this.T.Matrix4().makeTranslation(-px, 0, -pz);
  };
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (this.pre) g.applyMatrix4(this.pre);
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var T = this.T, m = new T.Matrix4();
    m.compose(new T.Vector3(x, y, z),
              new T.Quaternion().setFromEuler(new T.Euler(rx || 0, ry || 0, rz || 0)),
              new T.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  Baker.prototype.box = function (mat, sx, sy, sz, x, y, z, rx, ry, rz) {
    this.put(mat, new this.T.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  };
  /* box from min/max corners; mirrored callers may hand them swapped */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.box(mat, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* cylinder on a world axis ("x", "y" or "z"); r2 is the far-end radius */
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  /* a flat disc facing +X (a tube mouth) */
  Baker.prototype.mouth = function (mat, r, seg, x, y, z) {
    this.put(mat, new this.T.CircleGeometry(r, seg), x, y, z, 0, Math.PI / 2, 0);
  };
  /* convex XZ polygon extruded across Y from y0 to y1 */
  Baker.prototype.prism = function (mat, pts, y0, y1) {
    var S = new Soup(), n = pts.length, cx = 0, cz = 0, i;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cz += pts[i][1]; }
    cx /= n; cz /= n;
    var away = [cx, (y0 + y1) / 2, cz], c0 = [cx, y0, cz], c1 = [cx, y1, cz];
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var a0 = [a[0], y0, a[1]], b0 = [b[0], y0, b[1]], a1 = [a[0], y1, a[1]], b1 = [b[0], y1, b[1]];
      S.tri(c0, a0, b0, away); S.tri(c1, a1, b1, away);
      S.quad(a0, b0, b1, a1, away);
    }
    this.add(mat, S.geo(this.T));
  };
  /* convex YZ polygon extruded along X from x0 to x1 */
  Baker.prototype.prismYZ = function (mat, pts, x0, x1) {
    var S = new Soup(), n = pts.length, cy = 0, cz = 0, i;
    for (i = 0; i < n; i++) { cy += pts[i][0]; cz += pts[i][1]; }
    cy /= n; cz /= n;
    var away = [(x0 + x1) / 2, cy, cz], c0 = [x0, cy, cz], c1 = [x1, cy, cz];
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var a0 = [x0, a[0], a[1]], b0 = [x0, b[0], b[1]], a1 = [x1, a[0], a[1]], b1 = [x1, b[0], b[1]];
      S.tri(c0, a0, b0, away); S.tri(c1, a1, b1, away);
      S.quad(a0, b0, b1, a1, away);
    }
    this.add(mat, S.geo(this.T));
  };
  Baker.prototype.flush = function (group) {
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


  var LAUNCH_EL = 35 * Math.PI / 180;
  var ROWS = { pact_e50_mlrs: { veh: "bm14" }, pact_e60_mlrs: { veh: "bm21" } };

  function makeMats(THREE, C) {
    var T = {};
    T.skin  = new THREE.MeshStandardMaterial({ color: 0x3b4a2b, roughness: 0.88, metalness: 0.05 });
    T.dark  = new THREE.MeshStandardMaterial({ color: 0x22231e, roughness: 0.82, metalness: 0.20 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x4a4d4f, roughness: 0.50, metalness: 0.38 });
    T.rub   = new THREE.MeshStandardMaterial({ color: 0x151514, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1c2a31, roughness: 0.14, metalness: 0.30 });
    T.team  = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                               roughness: 0.60, metalness: 0.10 });
    return T;
  }

  /* an arc of mudguard over a wheel: the top 205 degrees of a cylinder about Y */
  function shell(K, mat, r, w, x, y, z) {
    var g = new K.T.CylinderGeometry(r, r, w, 20, 1, true, -0.57 * Math.PI, 1.14 * Math.PI);
    K.put(mat, g, x, y, z);
  }
  /* a rectangular strap about a tube pack: x, half width, z range, bar t */
  function band(K, mat, x, hw, z0, z1, t) {
    K.bb(mat, x - t, x + t, -hw - t, hw + t, z1, z1 + t);
    K.bb(mat, x - t, x + t, -hw - t, hw + t, z0 - t, z0);
    K.bb(mat, x - t, x + t, hw, hw + t, z0, z1);
    K.bb(mat, x - t, x + t, -hw - t, -hw, z0, z1);
  }
  /* round headlamp: rim, glass */
  function lamp(K, T, x, y, z, r) {
    K.cyl(T.steel, r * 1.15, 0.07, 14, x, y, z, "x");
    K.cyl(T.glass, r, 0.02, 14, x + 0.04, y, z, "x");
  }

  /* one tyre, axle on local Y: tyre barrel, rim, hub, lug blocks, lug nuts */
  function wheelMesh(THREE, T, R, W, nb) {
    var B = new Baker(THREE), tmp = new THREE.Group(), i, a, s;
    B.cyl(T.rub, R, W, 28, 0, 0, 0, "y");
    B.cyl(T.rub, R * 0.62, W * 1.03, 20, 0, 0, 0, "y");
    B.cyl(T.rub, R * 0.22, W * 1.10, 12, 0, 0, 0, "y");
    for (i = 0; i < nb; i++) {
      a = i * Math.PI * 2 / nb;
      B.put(T.rub, new THREE.BoxGeometry(R * 0.07, W * 0.46, R * 0.20), (R + 0.012) * Math.cos(a), (i & 1 ? 0.21 : -0.21) * W, (R + 0.012) * Math.sin(a), 0, -a, 0);
    }
    for (i = 0; i < 8; i++) {
      a = i * Math.PI / 4;
      for (s = -1; s <= 1; s += 2)
        B.put(T.rub, new THREE.BoxGeometry(R * 0.06, W * 0.04, R * 0.06), R * 0.40 * Math.cos(a), s * W * 0.53, R * 0.40 * Math.sin(a), 0, -a, 0);
    }
    B.flush(tmp);
    return tmp.children[0];
  }
  function addWheels(THREE, T, root, AX, track, R, W, nb) {
    var wm = wheelMesh(THREE, T, R, W, nb), i, s, wg, m;
    for (i = 0; i < AX.length; i++) for (s = -1; s <= 1; s += 2) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * track, R);
      m = new THREE.Mesh(wm.geometry, wm.material);
      m.castShadow = true; m.receiveShadow = true;
      wg.add(m);
      root.add(wg);
    }
  }

  /* chassis items shared by both trucks: frame, axles, springs, tow hook, rear beam */
  function chassis(K, T, x0, x1, AX, R, track, zf) {
    var i;
    K.bb(T.dark, x0, x1, -0.45, 0.45, zf, zf + 0.20);
    for (i = 0; i < AX.length; i++) {
      K.cyl(T.dark, 0.075, track * 2 - 0.2, 10, AX[i], 0, R, "y");
      K.cyl(T.dark, 0.17, 0.26, 12, AX[i], 0, R, "y");
      K.bb(T.dark, AX[i] - 0.5, AX[i] + 0.5, -track + 0.1, -track + 0.18, R + 0.06, R + 0.11);
      K.bb(T.dark, AX[i] - 0.5, AX[i] + 0.5, track - 0.18, track - 0.1, R + 0.06, R + 0.11);
    }
  }

  /* the elevating group is built in the turret frame and shifted about the trunnion */
  function elevGroup(THREE, KE, px, pz, cells) {
    var E = new THREE.Group();
    E.name = "podelev";
    E.position.set(px, 0, pz);
    KE.flush(E);
    KE.about();
    E.userData.cells = cells;
    E.userData.el = LAUNCH_EL;
    return E;
  }

  /* ================================================================ BM-14-16 on ZiS-151 */
  function buildBM14(THREE, T) {
    var root = new THREE.Group(), K = new Baker(THREE), i, s, j;
    var R = 0.5, TR = 0.88, AX = [2.55, -1.11, -2.23], DECK = 1.2;
    chassis(K, T, -3.45, 3.3, AX, R, TR, 0.66);
    /* front: channel bumper, tow hooks, radiator, grille, hood, fenders, lamps */
    K.bb(T.dark, 3.36, 3.46, -1.08, 1.08, 0.48, 0.68);
    K.bb(T.dark, 3.30, 3.46, -1.12, -1.04, 0.46, 0.70);
    K.bb(T.dark, 3.30, 3.46, 1.04, 1.12, 0.46, 0.70);
    for (s = -1; s <= 1; s += 2) K.bb(T.steel, 3.30, 3.45, s * 0.22 - 0.03, s * 0.22 + 0.03, 0.38, 0.46);
    K.bb(T.skin, 2.95, 3.18, -0.40, 0.40, 0.80, 1.56);
    K.bb(T.dark, 3.175, 3.195, -0.34, 0.34, 0.86, 1.50);
    for (i = -4; i <= 4; i++) K.bb(T.steel, 3.19, 3.215, i * 0.07 - 0.012, i * 0.07 + 0.012, 0.88, 1.48);
    K.bb(T.steel, 3.19, 3.215, -0.34, 0.34, 1.16, 1.19);
    K.cyl(T.steel, 0.05, 0.14, 8, 3.26, 0, 0.98, "x");                       /* starting-handle dog */
    K.prism(T.skin, [[1.95, 1.2], [2.0, 1.60], [2.7, 1.62], [3.0, 1.55], [3.0, 1.2]], -0.50, 0.50);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) K.bb(T.dark, 2.15 + i * 0.1, 2.20 + i * 0.1, s * 0.503 - 0.004, s * 0.503 + 0.004, 1.32, 1.50);
    for (s = -1; s <= 1; s += 2) {
      shell(K, T.skin, 0.60, 0.46, AX[0], s * 0.86, R);
      K.bb(T.skin, 2.0, 3.12, s > 0 ? 0.62 : -1.12, s > 0 ? 1.12 : -0.62, 1.10, 1.14);
      K.bb(T.skin, 3.12, 3.17, s > 0 ? 0.62 : -1.12, s > 0 ? 1.12 : -0.62, 0.86, 1.14);
      K.bb(T.skin, 1.94, 2.0, s > 0 ? 0.62 : -1.12, s > 0 ? 1.12 : -0.62, 0.86, 1.14);
      lamp(K, T, 3.02, s * 0.66, 1.25, 0.095);
      K.bb(T.steel, 3.00, 3.03, s * 0.66 - 0.02, s * 0.66 + 0.02, 1.14, 1.16);
      for (j = 0; j < 2; j++) shell(K, T.skin, 0.60, 0.48, AX[1 + j], s * 0.86, R);
      K.bb(T.dark, -2.9, -0.5, s > 0 ? 0.64 : -1.12, s > 0 ? 1.12 : -0.64, 1.10, 1.14);
      K.bb(T.dark, -2.80, -2.77, s * 1.0 - 0.14, s * 1.0 + 0.14, 0.22, 0.80);     /* mudflap */
    }
    /* armoured cab */
    K.prism(T.skin, [[0.75, 1.12], [1.95, 1.12], [1.95, 1.85], [1.80, 2.42], [0.85, 2.42], [0.75, 2.30]], -0.98, 0.98);
    K.bb(T.skin, 0.80, 1.90, -0.88, 0.88, 2.42, 2.47);                          /* roof flap */
    K.bb(T.skin, 0.9, 1.7, -0.58, 0.58, 2.47, 2.50);
    for (s = -1; s <= 1; s += 2) {
      K.box(T.dark, 0.012, 0.34, 0.035, 1.905, s * 0.46, 2.20, 0, 0.26, 0);       /* vision slits */
      K.bb(T.dark, 1.0, 1.55, s * 0.985 - 0.006, s * 0.985 + 0.006, 2.12, 2.16);
      K.bb(T.dark, 1.02, 1.04, s * 0.985 - 0.006, s * 0.985 + 0.006, 1.2, 2.3);
      K.bb(T.dark, 1.78, 1.80, s * 0.985 - 0.006, s * 0.985 + 0.006, 1.2, 1.9);
      K.bb(T.steel, 1.50, 1.62, s * 0.985 - 0.02, s * 0.985 + 0.02, 1.78, 1.82);    /* door handle */
      K.bb(T.dark, 1.15, 1.85, s * 0.98, s * 1.17, 0.88, 0.92);                    /* running board */
      K.bb(T.steel, 1.78, 1.80, s * 0.98, s * 1.10, 1.62, 1.66);
      K.bb(T.steel, 1.78, 1.82, s * 0.98 + 0.0, s * 1.14, 2.14, 2.17);             /* mirror arm */
      K.bb(T.dark, 1.78, 1.82, s * 1.14 - 0.02, s * 1.14 + 0.02, 1.98, 2.34);      /* mirror */
    }
    /* rear deck, equipment lockers behind the cab, tail beam */
    K.bb(T.skin, -3.40, 0.75, -0.92, 0.92, 1.14, DECK + 0.04);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -0.55, 0.65, s > 0 ? 0.56 : -0.93, s > 0 ? 0.93 : -0.56, DECK + 0.04, 1.70);
      K.bb(T.dark, -0.55, 0.65, s > 0 ? 0.56 : -0.93, s > 0 ? 0.93 : -0.56, 1.70, 1.72);
      K.bb(T.skin, -3.40, 0.0, s > 0 ? 0.88 : -0.92, s > 0 ? 0.92 : -0.88, DECK + 0.04, 1.40);   /* low sideboard */
      K.bb(T.dark, -3.47, -3.40, s * 0.55 - 0.15, s * 0.55 + 0.15, 0.90, 1.14);
      K.bb(T.steel, -3.50, -3.46, s * 0.15 - 0.03, s * 0.15 + 0.03, 0.80, 0.90);
      K.cyl(T.dark, 0.05, 0.03, 8, -3.49, s * 0.78, 1.05, "x");
    }
    K.bb(T.dark, -3.47, -3.40, -0.95, 0.95, 0.90, 1.14);
    K.bb(T.steel, -3.50, -3.40, -0.03, 0.03, 0.80, 0.90);                      /* tow hook */
    K.flush(root);

    /* the launcher: turntable and pedestal in the node "turret", ring centre at x = -1.40 */
    var RX = -1.40, KT = new Baker(THREE), KE = new Baker(THREE), cells = [], x0 = -0.9, x1 = 1.0, px = -0.95, pz = 0.90;
    var rowZ = [1.12, 1.26], zc, y, r = 0.075, N = 8, pitch = 0.17;
    KT.cyl(T.dark, 0.62, 0.10, 24, 0, 0, 0.05, "z");
    KT.bb(T.skin, -0.50, 0.40, -0.58, 0.58, 0.10, 0.52);
    KT.bb(T.dark, -0.50, 0.40, -0.60, 0.60, 0.50, 0.54);
    KT.bb(T.skin, 0.0, 0.40, -0.30, 0.30, 0.54, 0.84);                          /* front rest */
    KT.bb(T.skin, -0.85, 0.30, -0.44, 0.44, 0.54, 0.88);                         /* base housing under the cradle */
    for (s = -1; s <= 1; s += 2) {
      KT.bb(T.skin, -1.05, -0.85, s > 0 ? 0.44 : -0.62, s > 0 ? 0.62 : -0.44, 0.10, 0.98);   /* trunnion cheeks */
      KT.cyl(T.dark, 0.06, 0.26, 10, px, s * 0.53, pz, "y");
      KT.bb(T.skin, -0.9, -0.5, s > 0 ? 0.50 : -0.62, s > 0 ? 0.62 : -0.50, 0.30, 0.66);
    }
    KE.about(px, pz);
    for (j = 0; j < 2; j++) {
      zc = rowZ[j];
      for (i = 0; i < N; i++) {
        y = (i - (N - 1) / 2) * pitch + (j ? pitch / 2 : -pitch / 2) * 0.5;
        KE.cyl(T.skin, r, x1 - x0, 14, (x0 + x1) / 2, y, zc, "x");
        KE.mouth(T.dark, r * 0.86, 14, x1 + 0.004, y, zc);
        cells.push([x1 + 0.06 - px, y, zc - pz, x0 - px]);
      }
    }
    var hw = 0.80;
    for (i = 0; i < 4; i++) band(KE, T.steel, -0.65 + i * 0.52, hw - 0.02, rowZ[0] - 0.085, rowZ[1] + 0.085, 0.016);
    KE.bb(T.steel, x0 - 0.04, x1 - 0.1, -0.60, 0.60, 0.89, 0.94);               /* cradle slab */
    for (s = -1; s <= 1; s += 2) KE.bb(T.steel, x0 - 0.04, x1 - 0.1, s * 0.58 - 0.025, s * 0.58 + 0.025, 0.94, 1.03);
    for (i = -2; i <= 2; i++) KE.bb(T.steel, x0 - 0.04, x1 - 0.1, i * 0.25 - 0.025, i * 0.25 + 0.025, 0.94, 1.03);
    KE.bb(T.dark, x0 - 0.05, x0 - 0.01, -0.80, 0.80, 1.00, 1.40);               /* breech plate */
    KE.bb(T.dark, x1 - 0.03, x1 + 0.0, -0.80, 0.80, 1.03, 1.12);
    KE.bb(T.dark, x1 - 0.03, x1 + 0.0, -0.80, 0.80, 1.28, 1.36);
    KE.bb(T.team, -0.45, 0.55, -0.12, 0.12, 1.338, 1.348);
    var G = new THREE.Group();
    G.position.set(RX, 0, DECK - 0.08);
    KT.flush(G);
    G.add(elevGroup(THREE, KE, px, pz, cells));
    G.name = "turret";
    root.add(G);
    addWheels(THREE, T, root, AX, TR, R, 0.27, 26);
    return root;
  }

  /* ================================================================ BM-21 Grad on Ural-375D */
  function buildBM21(THREE, T) {
    var root = new THREE.Group(), K = new Baker(THREE), i, s, j;
    var R = 0.65, TR = 1.04, AX = [2.6, -0.925, -2.325], DECK = 1.46;
    chassis(K, T, -3.6, 3.5, AX, R, TR, 0.80);
    /* front bumper, hooks, grille, hood, fenders, lamps */
    K.bb(T.dark, 3.52, 3.70, -1.20, 1.20, 0.58, 0.92);
    K.bb(T.steel, 3.50, 3.52, -1.20, 1.20, 0.62, 0.66);
    K.bb(T.steel, 3.50, 3.52, -1.20, 1.20, 0.84, 0.88);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.steel, 3.66, 3.70, s * 0.40 - 0.05, s * 0.40 + 0.05, 0.64, 0.72);   /* tow eyes */
      K.bb(T.dark, 3.52, 3.70, s * 1.20 - 0.01, s * 1.20 + 0.01, 0.50, 0.99);
    }
    K.prism(T.skin, [[2.0, 1.30], [2.0, 2.0], [2.5, 2.06], [3.2, 1.97], [3.32, 1.82], [3.32, 1.08], [3.2, 1.0]], -0.86, 0.86);
    K.bb(T.dark, 3.31, 3.34, -0.58, 0.58, 1.10, 1.76);
    for (i = -7; i <= 7; i++) K.bb(T.steel, 3.33, 3.36, i * 0.075 - 0.014, i * 0.075 + 0.014, 1.12, 1.74);
    K.bb(T.steel, 3.33, 3.36, -0.58, 0.58, 1.40, 1.44);
    K.bb(T.skin, 3.31, 3.40, -0.62, 0.62, 1.76, 1.83);                          /* grille top lip */
    K.bb(T.steel, 3.34, 3.37, -0.10, 0.10, 1.84, 1.90);                          /* badge */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, 2.0, 3.40, s > 0 ? 0.80 : -1.30, s > 0 ? 1.30 : -0.80, 1.30, 1.36);
      K.bb(T.skin, 3.34, 3.42, s > 0 ? 0.80 : -1.30, s > 0 ? 1.30 : -0.80, 1.00, 1.36);
      K.bb(T.skin, 1.94, 2.0, s > 0 ? 0.80 : -1.30, s > 0 ? 1.30 : -0.80, 1.00, 1.36);
      shell(K, T.skin, 0.75, 0.50, AX[0], s * 1.05, R);
      lamp(K, T, 3.40, s * 0.98, 1.17, 0.10);
      K.bb(T.steel, 3.38, 3.43, s * 1.2 - 0.06, s * 1.2 + 0.06, 1.28, 1.34);      /* side lamp */
      K.bb(T.skin, 2.35, 2.9, s > 0 ? 0.80 : -0.84, s > 0 ? 0.84 : -0.80, 1.36, 1.48);   /* hood side line */
      for (i = 0; i < 4; i++) K.bb(T.dark, 2.3 + i * 0.12, 2.36 + i * 0.12, s * 0.862 - 0.004, s * 0.862 + 0.004, 1.55, 1.85);
      for (j = 1; j <= 2; j++) shell(K, T.skin, 0.75, 0.50, AX[j], s * 1.05, R);
      K.bb(T.skin, -3.05, -0.20, s > 0 ? 0.82 : -1.30, s > 0 ? 1.30 : -0.82, 1.32, 1.37);
      K.bb(T.skin, -3.05, -3.0, s > 0 ? 0.82 : -1.30, s > 0 ? 1.30 : -0.82, 0.98, 1.37);
      K.bb(T.dark, -3.15, -3.12, s * 1.05 - 0.2, s * 1.05 + 0.2, 0.30, 1.28);      /* mud flap */
    }
    /* cab */
    K.prism(T.skin, [[0.45, 1.35], [2.0, 1.35], [2.0, 2.0], [1.62, 2.62], [0.5, 2.62], [0.45, 2.50]], -0.98, 0.98);
    K.bb(T.skin, 1.55, 1.95, -0.96, 0.96, 2.60, 2.66);                          /* visor */
    K.bb(T.steel, 1.2, 1.4, -0.16, 0.16, 2.62, 2.68);                           /* roof vent */
    for (s = -1; s <= 1; s += 2) {
      K.box(T.glass, 0.02, 0.84, 0.74, 1.82, s * 0.47, 2.32, 0, -0.55, 0);       /* windscreen panes */
      K.box(T.dark, 0.03, 0.04, 0.78, 1.82, s * 0.92, 2.32, 0, -0.55, 0);
      K.bb(T.glass, 0.82, 1.62, s * 0.985 - 0.006, s * 0.985 + 0.006, 1.98, 2.50);
      K.bb(T.dark, 1.62, 1.66, s * 0.985 - 0.007, s * 0.985 + 0.007, 1.40, 2.55);
      K.bb(T.dark, 0.80, 0.84, s * 0.985 - 0.007, s * 0.985 + 0.007, 1.40, 2.55);
      K.bb(T.dark, 0.84, 1.62, s * 0.985 - 0.007, s * 0.985 + 0.007, 1.94, 1.98);
      K.bb(T.steel, 1.45, 1.57, s * 0.985 - 0.02, s * 0.985 + 0.02, 1.80, 1.85);   /* door handle */
      K.bb(T.dark, 1.0, 1.7, s * 0.98, s * 1.20, 0.96, 1.00);                      /* step */
      K.bb(T.dark, 1.0, 1.04, s * 0.98, s * 1.20, 0.96, 1.30);
      K.bb(T.dark, 1.66, 1.70, s * 0.98, s * 1.20, 0.96, 1.30);
      K.bb(T.steel, 1.92, 1.98, s * 0.98, s * 1.33, 2.28, 2.32);                   /* mirror arm */
      K.bb(T.dark, 1.90, 1.99, s * 1.31 - 0.02, s * 1.31 + 0.02, 1.90, 2.46);      /* mirror */
    }
    K.bb(T.glass, 0.47, 0.485, -0.55, 0.55, 2.05, 2.40);                         /* rear window */
    /* rear deck, lockers, tail beam */
    K.bb(T.skin, -3.65, 0.45, -0.90, 0.90, 1.30, DECK);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -0.25, 0.43, s > 0 ? 0.50 : -0.96, s > 0 ? 0.96 : -0.50, DECK, 1.95);
      K.bb(T.dark, -0.25, 0.43, s > 0 ? 0.50 : -0.96, s > 0 ? 0.96 : -0.50, 1.95, 1.97);
      K.bb(T.dark, -0.20, -0.18, s > 0 ? 0.60 : -0.86, s > 0 ? 0.86 : -0.60, 1.55, 1.85);
      K.bb(T.dark, -3.65, -3.55, s * 0.60 - 0.20, s * 0.60 + 0.20, 0.88, 1.30);
      K.bb(T.dark, -3.68, -3.65, s * 0.86 - 0.08, s * 0.86 + 0.08, 1.12, 1.24);   /* tail lamps */
    }
    K.bb(T.dark, -3.65, -3.55, -1.0, 1.0, 0.88, 1.30);
    K.bb(T.steel, -3.65, -3.55, -0.05, 0.05, 0.92, 1.02);                        /* tow hook */
    K.flush(root);

    /* the launcher, ring centre x = -1.90 */
    var RX = -1.90, KT = new Baker(THREE), KE = new Baker(THREE), cells = [], x0 = -1.40, x1 = 1.60, px = -1.35, pz = 1.04;
    var zc, y, r = 0.0675, pitch = 0.145, rowP = 0.125, z0 = 1.18;
    KT.cyl(T.dark, 0.90, 0.12, 28, 0, 0, 0.06, "z");
    KT.bb(T.skin, -1.00, 0.85, -0.85, 0.85, 0.12, 0.56);
    KT.bb(T.dark, -1.00, 0.85, -0.87, 0.87, 0.54, 0.60);
    KT.bb(T.skin, -0.25, 0.50, -0.55, 0.55, 0.60, 0.95);                        /* centre pedestal */
    KT.bb(T.skin, -1.10, 0.75, -0.66, 0.66, 0.60, 1.04);                         /* base housing under the cradle */
    for (s = -1; s <= 1; s += 2) {
      KT.bb(T.skin, -1.45, -1.25, s > 0 ? 0.80 : -0.96, s > 0 ? 0.96 : -0.80, 0.12, 1.14);   /* trunnion cheeks */
      KT.cyl(T.dark, 0.07, 0.30, 10, px, s * 0.88, pz, "y");
      KT.bb(T.skin, -1.3, -0.4, s > 0 ? 0.70 : -0.86, s > 0 ? 0.86 : -0.70, 0.56, 0.90);
      KT.bb(T.dark, -0.9, 0.1, s * 0.84 - 0.03, s * 0.84 + 0.03, 0.60, 0.64);
    }
    KE.about(px, pz);
    for (j = 0; j < 4; j++) {
      zc = z0 + j * rowP;
      for (i = 0; i < 10; i++) {
        y = (i - 4.5) * pitch + (j & 1 ? pitch / 2 : 0) - pitch / 4;
        KE.cyl(T.skin, r, x1 - x0, 10, (x0 + x1) / 2, y, zc, "x");
        KE.mouth(T.dark, r * 0.86, 10, x1 + 0.004, y, zc);
        cells.push([x1 + 0.06 - px, y, zc - pz, x0 - px]);
      }
    }
    var hw = 0.79, bz0 = z0 - 0.075, bz1 = z0 + 3 * rowP + 0.075;
    for (i = 0; i < 5; i++) band(KE, T.steel, -1.15 + i * 0.68, hw, bz0, bz1, 0.017);
    KE.bb(T.steel, x0, x1 - 0.1, -0.70, 0.70, 1.07, 1.12);                       /* cradle slab */
    for (s = -1; s <= 1; s += 2) KE.bb(T.steel, x0, x1 - 0.1, s * 0.84 - 0.04, s * 0.84 + 0.04, 1.07, 1.30);
    for (i = -3; i <= 3; i++) KE.bb(T.steel, x0, x1 - 0.1, i * 0.22 - 0.025, i * 0.22 + 0.025, 1.12, 1.18);
    KE.bb(T.dark, x0 - 0.06, x0 - 0.01, -0.80, 0.80, 1.07, 1.67);               /* rear block */
    KE.bb(T.dark, x1 - 0.03, x1, -0.80, 0.80, 1.09, 1.17);
    KE.bb(T.dark, x1 - 0.03, x1, -0.80, 0.80, 1.55, 1.62);
    KE.bb(T.team, -0.35, 0.65, -0.12, 0.12, bz1 - 0.01, bz1 + 0.012);
    var G = new THREE.Group();
    G.position.set(RX, 0, DECK - 0.08);
    KT.flush(G);
    G.add(elevGroup(THREE, KE, px, pz, cells));
    G.name = "turret";
    root.add(G);
    addWheels(THREE, T, root, AX, TR, R, 0.40, 22);
    return root;
  }

  function build(key, THREE, M, C) {
    var V = ROWS[key], T = makeMats(THREE, C);
    var root = V.veh === "bm14" ? buildBM14(THREE, T) : buildBM21(THREE, T);
    root.name = key;
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build, rows: ROWS };
})();

(function () {
  var k, rows = HeroRuBm.rows;
  function reg(key, len) {
    UNIT_MODELS[key] = { len: len, build: function (THREE, M, C) { return HeroRuBm.build(key, THREE, M, C); } };
  }
  for (k in rows) if (Object.prototype.hasOwnProperty.call(rows, k)) reg(k, rows[k].veh === "bm14" ? 6.93 : 7.35);
})();
