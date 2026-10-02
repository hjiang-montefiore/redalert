/* ===== us_hemtt.js - HERO model: Oshkosh M977 HEMTT 8x8 cargo truck ========
   The "HEMTT Supply Truck" (rules.js supply_n, full name "M977 HEMTT"; the
   row is offered in every era from e50 to e20).  The old model was a truck
   with a hand-guessed cab; this one is the present-day production truck, the
   M977A4, drawn from published figures and photographs.

   Published figures (Wikipedia infobox for the M977A4, the German article's
   data table, the older M977A2 figures):
     length            409 in   10.39 m   (A2: 10.17 m)
     width              96 in    2.44 m
     height            118 in    3.00 m   over the spare tyre; the cab roof is
                                          lower, 2.59 m (102 in) to 2.84 m
                                          (112 in) "depending on the body"
     wheelbase                   5.33 m   centre of the front tandem to centre
                                          of the rear tandem: 1.52 m between
                                          the axles of each pair and 3.81 m of
                                          bare frame between the pairs
     tyres             16.00R20, Michelin XZL: 1.27 m over the lugs, 0.41 m wide
     engine / drive    Caterpillar C15 diesel, Allison 4500SP; 8x8, the front
                       two axles steer.  Single tyres on all eight wheels.
     fuel              155 US gal in one round tank slung under the bed

   What the photographs show and this builds (the Oshkosh A4 cargo factory
   photo, US Army / DoD photos of M977s, an Oshkosh 1985 press photo of a
   cab close up, an Israeli and a Taiwanese truck; the German and French
   Wikipedia articles for the crane):
     - the cab is a tall flat-roofed box with a raked two-pane windscreen and
       a brow over it; below the glass a faceted nose with the grille slanting
       back, square headlamp pockets in its top corners and a plate bumper
       with two tow hooks.  The engine is in that nose, AHEAD of the first axle.
     - behind the cab, a tall louvred cabinet on the left with a vertical
       exhaust stack on the right, and the spare tyre lying on top of the
       cabinet and the rear edge of the cab roof.  That is what makes the
       118 in: roof 2.62 m + 0.40 m tyre.  Between cabinet and body: the air
       cleaner and the battery box.
     - an open cargo body with plain steel sides (about 0.7 m), vertical
       stiffeners and a headboard that stands higher than the sides.
     - the materiel handling crane (a Grove, 2,500 lb, on the M977 and M985
       cargo trucks) is mounted at the REAR; the photos show only its slewing
       head at the tail of the bed, just below the rail line, so the boom is
       stowed forward along the bed floor, which is how it is drawn here.
     - the 155 gal tank under the bed on the left, a tool box on the right,
       mud flaps behind each tandem.
   WHERE THINGS STAND along the truck was measured on the A4 factory photo by
   fitting a projective map to the four left-hand hubs (known 1.524 / 3.810 /
   1.524 m apart) and reading the other features through it: nose 2.34 m
   ahead of axle 1, door front 1.82 m, cab rear wall 0.39 m, louvre cabinet
   from 0.39 m ahead to 0.65 m behind it, body 1.59 m behind it (right over
   axle 2) to 7.29 m, tail 7.99 m: 10.33 m against the published 10.39 m.
   So the front overhang is 2.40 m and the tail 1.13 m, the cab is only about
   2.0 m from bumper to rear wall, and the first wheel stands just behind the
   door.  The cargo body is 5.7 m long and the fuel tank 1.85 m.
   The load (two strapped pallet stacks and six fuel drums) is a generic cargo
   truck load, so the truck reads as the game's supply truck.

   NOT built, deliberately: the add-on armour (B-kit), the guided-missile
   transporter fit, the 10x10 LHS conversions.  This is the plain cargo truck.

   Game use (render3d.js): supply_n has no turret and no animated part except
   the wheels, so the only named nodes are the eight "roadwheel" groups, axle
   on local Y.  supply_n is also the stand-in for the other armies' supply
   rows that have no model of their own, so the team material is exactly
   C.team and the paint is a plain tinted material (eraPaint repaints it).

   Draw calls: 14 (six baked meshes by material + eight wheels, which turn).
   Materials: six.  Wheels carry their paint per vertex (linear, as three
   reads a colour attribute raw), so tyre, rim and nuts are one mesh each.

   Model space: +X nose, +Y left (port), +Z up, real metres, tyres on z = 0.
   Nothing sticks out along X past the tow hooks and the pintle, so the
   measured X extent is the 10.39 m of the truck.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsHemtt = (function () {
  "use strict";

  /* ---------------------------------------------------------------- figures */
  /* Axle stations: 1.524 / 3.810 / 1.524 apart.  The front overhang is 2.40 m and
     the tail 1.13 m: the engine stands ahead of the first axle and the cab door
     sits in front of it, so the first wheel is just behind the cab's rear wall
     (a projective fit of the four hubs in the A4 factory photo puts the nose
     2.34 m ahead of axle 1, the cab wall 0.39 m ahead of it and the tail 1.15 m
     behind axle 4 - 10.33 m against the published 10.39 m). */
  var AX = [2.795, 1.271, -2.539, -4.063];
  var TR = 0.635;                            /* 16.00R20: 1.27 m over the lugs             */
  var TY = 1.00;                             /* tyre centre line off the truck's axis      */
  var Z_DECK = 1.60, Z_RAIL = 2.32, Z_ROOF = 2.62, Z_SILL = 1.10;
  /* the body stations the same photo gives, measured from the nose (x = +5.195) */
  var X_CABR = 3.19;    /* rear wall of the cab                                     */
  var X_CABIN = 2.14;   /* rear of the louvred cabinet (it is 1.05 m deep)          */
  var X_BEDF = 1.21;    /* headboard: right over the second axle                    */
  var X_BEDT = -4.50;   /* tail of the cargo body, 0.43 m behind the last axle      */

  /* ---------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  /* sRGB hex -> linear triple: a colour ATTRIBUTE is read raw by three, only
     material colours are linearised by prepModel(). */
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var K = {
    blk: lin(0x1a1a18), dkg: lin(0x2e2f2b), wood: lin(0x7b6443), strap: lin(0x24241f),
    olive: lin(0x55603d), tan: lin(0x8c7b55), drum: lin(0x4b5839), drumBand: lin(0x2f3827),
    rub: lin(0x1c1c1a), rim: lin(0x6d6850), hub: lin(0x8b8e90), nut: lin(0xa5a7a9),
    lensW: lin(0xfff1c6), amber: lin(0xffa11a), red: lin(0xd4261a)
  };

  /* ------------------------------------------------------------- paint tex */
  /* CARC desert tan (Tan 686A is a warm sandy khaki).  One canvas per page.
     The baked paint mesh is mapped by WORLD position (see worldUV), so a cab
     panel and a bed side carry the same grain; v is height, so the dust
     band at the foot of the canvas lands on the lowest metre of every side. */
  var _cv = null;
  function paintCanvas() {
    if (_cv) return _cv;
    var R = rng(686001), W = 256, H = 256, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#b3a078"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 34; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(238,226,192,0.07)" : "rgba(72,58,32,0.07)";
      q.fillRect(R() * W, R() * H, 20 + R() * 80, 14 + R() * 56);
    }
    q.fillStyle = "rgba(60,48,26,0.16)";
    for (i = 0; i < 26; i++) q.fillRect(R() * W, R() * H * 0.8, 6 + R() * 30, 1 + R() * 2);
    var gr = q.createLinearGradient(0, H * 0.70, 0, H);
    gr.addColorStop(0, "rgba(128,104,70,0.00)");
    gr.addColorStop(1, "rgba(128,104,70,0.50)");
    q.fillStyle = gr; q.fillRect(0, H * 0.70, W, H * 0.30);
    q.fillStyle = "rgba(48,40,26,0.30)";
    for (i = 0; i < 40; i++) q.fillRect(R() * (W - 3), R() * (H - 3), 2, 2);
    _cv = cv;
    return cv;
  }
  function paintTex(THREE) {
    try {
      var t = new THREE.CanvasTexture(paintCanvas());
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  function makeMats(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.setHex(0xb3a078);
    /* everything dark, black or small and coloured: tyres, frame, grille,
       cargo.  Per-vertex colour, so it stays ONE mesh. */
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.84, metalness: 0.06 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x8e9194, roughness: 0.42, metalness: 0.55 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2830, roughness: 0.12, metalness: 0.35 });
    /* the owner's colour exactly, so the era kit leaves it alone */
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    /* lamps: diffuse per vertex (white, amber, red), a little glow */
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.35, metalness: 0.1,
                                              emissive: 0x5a4a2a, emissiveIntensity: 0.9 });
    return T;
  }

  /* World-position UVs for the paint: sides take (along, height), tops take
     the cleaner upper part of the canvas. */
  function worldUV(P) {
    var n = P.length / 9, U = new Float32Array(n * 6), t, k;
    for (t = 0; t < n; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (k = 0; k < 3; k++) {
        var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / 4; v = 0.55 + 0.4 * (y / 4 - Math.floor(y / 4)); }
        else if (ny >= nx) { u = x / 4; v = Math.min(0.999, Math.max(0.001, z / 3.2)); }
        else { u = y / 4 + 0.37; v = Math.min(0.999, Math.max(0.001, z / 3.2)); }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
    return U;
  }

  /* --------------------------------------------------------------- baking */
  /* Triangle soup per material, flat normals, one mesh per material at the
     end.  triAway() winds each triangle so that it faces AWAY from a hint
     point, which is exact for any convex part and for a flat panel with the
     hint on its back side. */
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
    if (s.vc) {
      var k = col || K.dkg;
      s.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]);
    }
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
  /* box from its corners; skip = e.g. "-z" or "-z -x" to leave buried faces off */
  Baker.prototype.box = function (mat, x0, x1, y0, y1, z0, z1, col, skip) {
    var c = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
    var h = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    var F = [["-z", 0, 3, 2, 1], ["+z", 4, 5, 6, 7], ["-y", 0, 1, 5, 4], ["+y", 3, 7, 6, 2], ["-x", 0, 4, 7, 3], ["+x", 1, 2, 6, 5]];
    for (var i = 0; i < 6; i++) {
      if (skip && skip.indexOf(F[i][0]) >= 0) continue;
      this.quad(mat, c[F[i][1]], c[F[i][2]], c[F[i][3]], c[F[i][4]], h, col);
    }
  };
  /* box turned about Y through its own centre (positive angle dips the +X end) */
  Baker.prototype.boxRY = function (mat, cx, cy, cz, sx, sy, sz, ang, col) {
    var ca = Math.cos(ang), sa = Math.sin(ang), i, c = [];
    var q = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var x = q[i][0] * sx / 2, z = q[i][2] * sz / 2;
      c.push([cx + x * ca + z * sa, cy + q[i][1] * sy / 2, cz - x * sa + z * ca]);
    }
    var h = [cx, cy, cz];
    var F = [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [3, 7, 6, 2], [0, 4, 7, 3], [1, 2, 6, 5]];
    for (i = 0; i < 6; i++) this.quad(mat, c[F[i][0]], c[F[i][1]], c[F[i][2]], c[F[i][3]], h, col);
  };
  /* smooth-sided cylinder along a world axis ("x", "y" or "z") */
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
  /* a lofted prism through rings of 8 points; hint = middle of every ring */
  Baker.prototype.loft = function (mat, rings, capFirst, capLast, col) {
    var i, k, h = [0, 0, 0], n = 0, r;
    for (i = 0; i < rings.length; i++) for (k = 0; k < 8; k++) { h[0] += rings[i][k][0]; h[1] += rings[i][k][1]; h[2] += rings[i][k][2]; n++; }
    h[0] /= n; h[1] /= n; h[2] /= n;
    for (i = 0; i + 1 < rings.length; i++) {
      for (k = 0; k < 8; k++) {
        var a = rings[i][k], b = rings[i][(k + 1) % 8], c = rings[i + 1][(k + 1) % 8], d = rings[i + 1][k];
        this.triAway(mat, a, b, c, h, col);
        this.triAway(mat, a, c, d, h, col);
      }
    }
    function cap(base, bk) {
      var m = [0, 0, 0], j;
      for (j = 0; j < 8; j++) { m[0] += base[j][0] / 8; m[1] += base[j][1] / 8; m[2] += base[j][2] / 8; }
      for (j = 0; j < 8; j++) bk.triAway(mat, m, base[j], base[(j + 1) % 8], h, col);
    }
    if (capFirst) cap(rings[0], this);
    if (capLast) cap(rings[rings.length - 1], this);
  };
  Baker.prototype.addSoup = function (mat, S, tf) {
    var s = this.slot(mat), i, p;
    for (i = 0; i < S.P.length; i += 3) {
      p = tf([S.P[i], S.P[i + 1], S.P[i + 2]]);
      s.P.push(p[0], p[1], p[2]);
    }
    for (i = 0; i < S.N.length; i += 3) {
      p = tf([S.N[i], S.N[i + 1], S.N[i + 2]], true);
      s.N.push(p[0], p[1], p[2]);
    }
    if (s.vc) for (i = 0; i < S.C.length; i++) s.C.push(S.C[i]);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i];
      var P = new Float32Array(e.P), N = new Float32Array(e.N);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      if (e.mat.map) geo.setAttribute("uv", new THREE.BufferAttribute(worldUV(P), 2));
      if (e.vc) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(e.C), 3));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* ------------------------------------------------------------------ tyre */
  /* One wheel as a triangle soup with per-vertex colour, axle on local Y,
     outer face on +Y for side = +1 and on -Y for side = -1.  A surface of
     revolution: a profile (radius, y) swept in N steps.  The tread radius
     alternates lug / groove step by step: that zig-zag is the XZL's chunky
     tread and it is what shows the wheel turning, because a smooth tyre
     spinning on its own axis shows nothing.  The lowest vertex is a lug at
     exactly -TR, so the group sits at z = TR with the lug on the ground.
     Each profile segment is wound by construction (the profile runs inner
     face -> tread -> outer face -> hub), which gives outward normals; the
     other side is the mirror image walked backwards. */
  function wheelSoup(side, N, nuts) {
    var S = { P: [], N: [], C: [] };
    var RT = TR, RG = TR - 0.032;
    /* r, y, tread-flag, colour of the segment that ENDS at this point */
    var pts = [
      [0.00, -0.20, 0, null],
      [0.30, -0.20, 0, K.rub],
      [0.585, -0.185, 0, K.rub],
      [0, -0.15, 1, K.rub],
      [0, 0.15, 1, K.rub],
      [0.585, 0.185, 0, K.rub],
      [0.30, 0.20, 0, K.rub],
      [0.27, 0.13, 0, K.rim],
      [0.10, 0.13, 0, K.rim],
      [0.10, 0.17, 0, K.hub],
      [0.00, 0.17, 0, K.hub]
    ];
    var segs = [], i, k;
    for (i = 0; i + 1 < pts.length; i++) segs.push({ a: pts[i], b: pts[i + 1], col: pts[i + 1][3] });
    if (side < 0) {
      segs = segs.reverse().map(function (s) {
        function m(p) { return [p[0], -p[1], p[2], p[3]]; }
        return { a: m(s.b), b: m(s.a), col: s.col };
      });
    }
    function at(p, k) {
      var r = p[2] ? ((k & 1) === 0 ? RT : RG) : p[0];
      var th = k * Math.PI * 2 / N;
      return [r * Math.cos(th), p[1], r * Math.sin(th)];
    }
    function tri(a, b, c, col) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (l < 1e-9) return;
      nx /= l; ny /= l; nz /= l;
      S.P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      S.N.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
      S.C.push(col[0], col[1], col[2], col[0], col[1], col[2], col[0], col[1], col[2]);
    }
    for (i = 0; i < segs.length; i++) {
      for (k = 0; k < N; k++) {
        var a = at(segs[i].a, k), b = at(segs[i].b, k), c = at(segs[i].b, k + 1), d = at(segs[i].a, k + 1);
        tri(a, b, c, segs[i].col);
        tri(a, c, d, segs[i].col);
      }
    }
    /* wheel nuts: small flat squares on the disc face */
    if (nuts) {
      var y = side * 0.134, j, ph;
      for (j = 0; j < 8; j++) {
        ph = j * Math.PI / 4 + 0.2;
        var cx = 0.19 * Math.cos(ph), cz = 0.19 * Math.sin(ph), ex = 0.022 * Math.cos(ph), ez = 0.022 * Math.sin(ph), fx = -0.022 * Math.sin(ph), fz = 0.022 * Math.cos(ph);
        var p0 = [cx - ex - fx, y, cz - ez - fz], p1 = [cx + ex - fx, y, cz + ez - fz],
            p2 = [cx + ex + fx, y, cz + ez + fz], p3 = [cx - ex + fx, y, cz - ez + fz];
        /* face outward: +Y for side +1 */
        var up = side > 0;
        /* y component of the normal of (p0, p1, p2): uz * vx - ux * vz */
        var n0 = (p1[2] - p0[2]) * (p2[0] - p0[0]) - (p1[0] - p0[0]) * (p2[2] - p0[2]);
        if ((n0 > 0) === up) { tri(p0, p1, p2, K.nut); tri(p0, p2, p3, K.nut); }
        else { tri(p0, p2, p1, K.nut); tri(p0, p3, p2, K.nut); }
      }
    }
    return S;
  }
  function soupGeo(THREE, S) {
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(S.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(S.N), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(S.C), 3));
    geo.computeBoundingSphere();
    return geo;
  }

  /* ------------------------------------------------------------- lofts */
  /* Eight-point cross-section: w = half width, chamfered at the bottom
     corners by chB and the top corners by chT; the bottom edge sits at x = xb
     and the top edge at x = xt, so a face can lean. */
  function ring(xb, xt, z0, z1, w, chB, chT) {
    function X(z) { return xb + (z - z0) * (xt - xb) / (z1 - z0); }
    var c0 = z0 + chB, c1 = z1 - chT;
    return [
      [X(z0), -(w - chB), z0], [X(z0), (w - chB), z0],
      [X(c0), w, c0], [X(c1), w, c1],
      [X(z1), (w - chT), z1], [X(z1), -(w - chT), z1],
      [X(c1), -w, c1], [X(c0), -w, c0]
    ];
  }

  /* ========================================================== ASSEMBLY ==== */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "us_hemtt";
    var B = new Baker(THREE);
    var P = T.paint, V = T.vc, ST = T.steel, GL = T.glass, TM = T.team, LP = T.lamp;
    var s, i, j, x;

    /* ---- the nose: faceted, the face leans back, engine behind it ---- */
    B.loft(P, [ring(5.10, 4.93, 0.80, 1.52, 1.19, 0.14, 0.30), ring(4.62, 4.62, 0.80, 1.80, 1.20, 0.06, 0.10)], true, true);
    /* the front face plane: x = 5.10 - 0.2361 (z - 0.80) */
    function xf(z) { return 5.10 - 0.2361 * (z - 0.80); }
    var nfx = 0.9736, nfz = 0.2299;                     /* its outward normal */
    function fp(y, z, d) { return [xf(z) + nfx * d, y, z + nfz * d]; }
    var behind = [3.8, 0, 1.2];
    /* grille: a dark panel with four steel slats across it */
    B.quad(V, fp(-0.74, 0.90, 0.020), fp(0.74, 0.90, 0.020), fp(0.74, 1.40, 0.020), fp(-0.74, 1.40, 0.020), behind, K.blk);
    for (i = 0; i < 4; i++) {
      var zs = 0.98 + i * 0.10;
      B.quad(ST, fp(-0.70, zs, 0.030), fp(0.70, zs, 0.030), fp(0.70, zs + 0.035, 0.030), fp(-0.70, zs + 0.035, 0.030), behind);
    }
    /* headlamp pockets in the top corners, an amber marker beside each */
    for (s = -1; s <= 1; s += 2) {
      B.quad(V, fp(s * 0.78, 1.16, 0.020), fp(s * 0.98, 1.16, 0.020), fp(s * 0.98, 1.34, 0.020), fp(s * 0.78, 1.34, 0.020), behind, K.blk);
      B.quad(LP, fp(s * 0.82, 1.20, 0.030), fp(s * 0.94, 1.20, 0.030), fp(s * 0.94, 1.30, 0.030), fp(s * 0.82, 1.30, 0.030), behind, K.lensW);
      B.quad(LP, fp(s * 0.62, 1.20, 0.026), fp(s * 0.72, 1.20, 0.026), fp(s * 0.72, 1.26, 0.026), fp(s * 0.62, 1.26, 0.026), behind, K.amber);
    }
    /* plate bumper and two tow hooks */
    B.box(V, 5.00, 5.14, -1.20, 1.20, 0.58, 0.84, K.dkg);
    B.box(ST, 5.10, 5.195, -0.60, -0.50, 0.66, 0.74);
    B.box(ST, 5.10, 5.195, 0.50, 0.60, 0.66, 0.74);

    /* ---- the cab: tall box, raked windscreen, brow over it ---- */
    B.loft(P, [ring(4.62, 4.62, Z_SILL, 1.80, 1.20, 0.06, 0.10), ring(4.40, 4.40, Z_SILL, Z_ROOF, 1.20, 0.05, 0.10),
               ring(X_CABR, X_CABR, Z_SILL, Z_ROOF, 1.20, 0.05, 0.10)], false, true);
    /* sub-floor between the front tyres, so the gap under the cab reads dark */
    B.box(V, X_CABR, 4.50, -0.78, 0.78, 0.92, Z_SILL, K.dkg);
    /* windscreen: two panes on the raked plane x = 4.62 - 0.2683 (z - 1.80) */
    function xw(z) { return 4.62 - 0.2683 * (z - 1.80); }
    function wp(y, z) { return [xw(z) + 0.0193, y, z + 0.0052]; }
    var inside = [3.9, 0, 2.2];
    B.quad(GL, wp(0.07, 1.92), wp(1.08, 1.92), wp(1.08, 2.54), wp(0.07, 2.54), inside);
    B.quad(GL, wp(-1.08, 1.92), wp(-0.07, 1.92), wp(-0.07, 2.54), wp(-1.08, 2.54), inside);
    /* the brow over the glass, and five amber roof markers on it */
    B.boxRY(P, 4.52, 0, 2.62, 0.30, 2.34, 0.05, 0.20);
    for (i = 0; i < 5; i++) B.box(LP, 4.50, 4.57, -0.88 + i * 0.44, -0.78 + i * 0.44, 2.56, 2.63, K.amber);
    /* side windows, door unit marks, handles, steps, mirrors */
    for (s = -1; s <= 1; s += 2) {
      var yw = s * 1.222;
      B.quad(GL, [3.70, yw, 1.92], [4.45, yw, 1.92], [4.33, yw, 2.52], [3.70, yw, 2.52], inside);
      B.quad(TM, [3.76, s * 1.226, 1.30], [4.30, s * 1.226, 1.30], [4.30, s * 1.226, 1.62], [3.76, s * 1.226, 1.62], inside);
      B.box(ST, 3.78, 3.90, s * 1.20, s * 1.235, 1.96, 1.99);
      B.box(V, 3.72, 4.42, s > 0 ? 1.20 : -1.36, s > 0 ? 1.36 : -1.20, 0.80, 0.84, K.dkg);
      B.box(V, 4.40, 4.46, s * 1.20, s * 1.36, 2.22, 2.26, K.blk);
      B.box(V, 4.40, 4.46, s * 1.20, s * 1.36, 2.02, 2.06, K.blk);
      B.box(V, 4.40, 4.46, s > 0 ? 1.34 : -1.46, s > 0 ? 1.46 : -1.34, 1.96, 2.36, K.blk);
      B.quad(GL, [4.395, s * 1.355, 1.99], [4.395, s * 1.445, 1.99], [4.395, s * 1.445, 2.33], [4.395, s * 1.355, 2.33], [4.7, s * 1.4, 2.15]);
    }
    /* team panel on the roof, the surface the game camera sees */
    B.quad(TM, [3.72, -0.85, 2.636], [4.32, -0.85, 2.636], [4.32, 0.85, 2.636], [3.72, 0.85, 2.636], [4.0, 0, 2.0]);

    /* ---- behind the cab: louvred cabinet, exhaust stack, spare tyre ---- */
    B.box(P, X_CABIN, X_CABR, -0.20, 1.12, Z_DECK, Z_ROOF - 0.02, undefined, "-z");
    B.quad(V, [X_CABIN + 0.08, 1.140, 1.72], [X_CABR - 0.09, 1.140, 1.72], [X_CABR - 0.09, 1.140, 2.48], [X_CABIN + 0.08, 1.140, 2.48], [2.7, 0.4, 2.0], K.blk);
    for (i = 0; i < 5; i++) {
      var zl = 1.82 + i * 0.13;
      B.quad(ST, [X_CABIN + 0.10, 1.150, zl], [X_CABR - 0.11, 1.150, zl], [X_CABR - 0.11, 1.150, zl + 0.035], [X_CABIN + 0.10, 1.150, zl + 0.035], [2.7, 0.4, 2.0]);
    }
    /* behind the cabinet, on the right: the exhaust stack, and on the left an
       air cleaner and the battery box, in the 0.9 m between cabinet and body */
    B.cyl(V, 0.085, 1.30, 8, 1.75, -0.55, 2.20, "z", K.blk);
    B.cyl(V, 0.11, 0.08, 8, 1.75, -0.55, 2.88, "z", K.dkg);
    B.cyl(V, 0.13, 0.80, 10, 1.70, 0.95, Z_DECK + 0.40, "z", K.dkg);
    B.box(P, 1.46, 2.10, 0.18, 0.78, Z_DECK, Z_DECK + 0.46);
    /* the spare lies flat on the cabinet: roof 2.62 + the tyre = 3.00 m */
    var sp = wheelSoup(1, 20, false);
    B.addSoup(V, sp, function (p, isNormal) {
      /* local +Y -> +Z (turn about X by +90 degrees), then place */
      var q = [p[0], -p[2], p[1]];
      return isNormal ? q : [q[0] + 2.99, q[1] + 0.46, q[2] + 2.80];
    });

    /* ---- the cargo body ---- */
    /* the whole truck is 2.44 m wide (96 in): the side boards are pressed in
       0.03 m and their stiffeners fill the rest, so nothing passes y = 1.22 */
    B.box(P, X_BEDT, X_CABR, -1.22, 1.22, Z_DECK - 0.12, Z_DECK);
    for (s = -1; s <= 1; s += 2) {
      B.box(P, X_BEDT, X_BEDF, s > 0 ? 1.10 : -1.22, s > 0 ? 1.22 : -1.10, Z_DECK - 0.18, Z_DECK - 0.12);
      B.box(P, X_BEDT, X_BEDF, s > 0 ? 1.12 : -1.19, s > 0 ? 1.19 : -1.12, Z_DECK, Z_RAIL);
      B.box(TM, X_BEDT, X_BEDF, s > 0 ? 1.12 : -1.22, s > 0 ? 1.22 : -1.12, Z_RAIL, Z_RAIL + 0.035);
      for (i = 0; i < 6; i++) {
        x = X_BEDF - 0.55 - i * 1.00;
        B.box(P, x - 0.05, x + 0.05, s > 0 ? 1.19 : -1.22, s > 0 ? 1.22 : -1.19, Z_DECK + 0.05, Z_RAIL - 0.04);
      }
    }
    B.box(P, X_BEDF - 0.07, X_BEDF, -1.22, 1.22, Z_DECK, Z_RAIL + 0.14);
    B.box(P, X_BEDT - 0.06, X_BEDT, -1.22, 1.22, Z_DECK, Z_RAIL - 0.25);

    /* ---- the materiel handling crane, stowed: head at the tail, boom forward ---- */
    B.box(P, -5.10, -4.70, -0.22, 0.22, 1.12, 1.75);
    B.box(P, -5.18, -4.58, -0.32, 0.32, 1.67, 2.27);
    B.box(P, -4.58, -1.80, -0.14, 0.14, 1.75, 2.03);
    B.box(P, -1.80, -0.35, -0.11, 0.11, 1.78, 2.00);
    B.box(ST, -0.39, -0.23, -0.07, 0.07, 1.65, 1.81);
    B.cyl(ST, 0.035, 1.9, 6, -3.55, 0, 1.69, "x");

    /* ---- the load: two strapped pallet stacks forward, six drums aft ---- */
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.28 : -1.14, y1 = s > 0 ? 1.14 : -0.28;
      var crate = s > 0 ? K.olive : K.tan, top = s > 0 ? 2.50 : 2.28;
      B.box(V, -0.08, 1.14, y0, y1, Z_DECK, Z_DECK + 0.12, K.wood);
      B.box(V, -0.04, 1.10, y0 + 0.02, y1 - 0.02, Z_DECK + 0.12, top, crate);
      B.box(V, 0.23, 0.28, y0 + 0.005, y1 - 0.005, Z_DECK + 0.11, top + 0.012, K.strap);
      B.box(V, 0.78, 0.83, y0 + 0.005, y1 - 0.005, Z_DECK + 0.11, top + 0.012, K.strap);
    }
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      x = -1.20 - i * 0.90;
      B.cyl(V, 0.29, 0.88, 9, x, s * 0.62, Z_DECK + 0.44, "z", K.drum);
      B.cyl(V, 0.30, 0.05, 9, x, s * 0.62, Z_DECK + 0.44, "z", K.drumBand);
    }

    /* ---- chassis: rails, cross-members, axles, tank, boxes, flaps, tail ---- */
    B.box(V, -5.05, 4.45, 0.34, 0.50, 0.92, 1.40, K.dkg);
    B.box(V, -5.05, 4.45, -0.50, -0.34, 0.92, 1.40, K.dkg);
    var cm = [3.95, 2.05, 0.15, -1.30, -3.30];
    for (i = 0; i < cm.length; i++) B.box(V, cm[i] - 0.06, cm[i] + 0.06, -0.34, 0.34, 1.02, 1.36, K.dkg);
    for (i = 0; i < 4; i++) {
      B.box(V, AX[i] - 0.08, AX[i] + 0.08, -0.78, 0.78, 0.50, 0.70, K.dkg);
      B.box(V, AX[i] - 0.17, AX[i] + 0.17, -0.17, 0.17, 0.42, 0.80, K.dkg);
    }
    B.cyl(V, 0.045, 1.52, 6, (AX[0] + AX[1]) / 2, 0, 0.84, "x", K.dkg);
    B.cyl(V, 0.045, 3.81, 6, (AX[1] + AX[2]) / 2, 0, 0.84, "x", K.dkg);
    B.cyl(V, 0.045, 1.52, 6, (AX[2] + AX[3]) / 2, 0, 0.84, "x", K.dkg);
    /* the 155 gal tank, left; strapped */
    B.cyl(P, 0.37, 1.85, 14, -0.60, 0.84, 1.02, "x");
    B.cyl(V, 0.38, 0.05, 14, -1.25, 0.84, 1.02, "x", K.strap);
    B.cyl(V, 0.38, 0.05, 14, 0.05, 0.84, 1.02, "x", K.strap);
    /* tool box and a small tank, right */
    B.box(P, -0.80, 0.50, -1.15, -0.60, 0.80, 1.30);
    B.cyl(V, 0.15, 0.80, 10, -1.35, -0.85, 0.98, "x", K.dkg);
    /* mud flaps behind the rear tyre of each tandem */
    for (s = -1; s <= 1; s += 2) {
      B.box(V, AX[1] - 0.73, AX[1] - 0.69, s > 0 ? 0.80 : -1.20, s > 0 ? 1.20 : -0.80, 0.25, 0.95, K.blk);
      B.box(V, AX[3] - 0.72, AX[3] - 0.68, s > 0 ? 0.80 : -1.20, s > 0 ? 1.20 : -0.80, 0.25, 0.95, K.blk);
      B.box(LP, -5.195, -5.16, s > 0 ? 0.96 : -1.12, s > 0 ? 1.12 : -0.96, 1.06, 1.18, K.red);
    }
    B.box(V, -5.16, -5.04, -1.14, 1.14, 0.78, 1.04, K.dkg);
    B.box(ST, -5.195, -5.06, -0.09, 0.09, 0.88, 1.00);

    B.flush(g);

    /* ---- eight wheels, each a turning group ---- */
    var gL = soupGeo(THREE, wheelSoup(1, 24, true)), gR = soupGeo(THREE, wheelSoup(-1, 24, true));
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2) {
      var w = new THREE.Group();
      w.name = "roadwheel";
      w.position.set(AX[i], s * TY, TR);
      var wm = new THREE.Mesh(s > 0 ? gL : gR, V);
      wm.castShadow = true; wm.receiveShadow = true;
      w.add(wm);
      g.add(w);
    }
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["supply_n"] = { len: 10.39, build: HeroUsHemtt.build };
