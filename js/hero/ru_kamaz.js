/* ===== ru_kamaz.js - HERO model: KamAZ-6350 Mustang 8x8 cargo truck ========
   The "KamAZ Supply Truck" (rules.js supply_p, full name "KamAZ-6350";
   js/armour_specs.js names it "KamAZ-6350 Mustang 8x8 Cargo Truck").  The
   Russian counterpart of the HEMTT hero (js/hero/us_hemtt.js) and drawn the
   same way: baked meshes per material, eight turning "roadwheel" groups,
   tyres on z = 0, no turret, no markings and no unit numbers.

   References (Wikimedia Commons, labelled photographs, fetched once):
     "KamAZ-6350 truck, 2011.jpg"     the 8x8 with its canvas tilt, 3/4 view
        from the front-left: the flat-roofed cab-over cab with a two-pane
        windscreen and a centre post, the grille of horizontal slats with a
        round headlamp each side, the plate bumper, the black wheel arches
        round the first two wheels, the open body with steel drop sides and
        the tilt over bows with lashing loops along the side boards, four
        axles in two pairs.  The truck wears a three-tone camouflage; it is
        painted here in plain Russian green as the brief asks.
     "KAMAZ-6350-376 truck in 2012.jpg"  same cab in plain olive green
        (the paint used), the cab as a box with a raked windscreen, a
        lamp bar on the roof, bumper with tow eyes, and the cab/body gap.
   Figures (ru.wikipedia "KAMAZ-6350", technical data): length 9,850 mm,
   width 2,500 mm, height 3,080 mm to the cab roof and 3,260 mm to the tilt,
   wheelbase 1,940 + 3,340 + 1,320 mm, track 2,050 mm, tyres 425/85R21 (about
   1.26 m over all), open body with steel drop sides.  The axle stations
   follow that wheelbase; the cab shape and the cab/body split are drawn from
   the photographs ("KAMAZ-6350 - Army 2024-08-14 03.jpg" shows the same
   cab-over cab, plate bumper, wheel stations and tilt from the front right,
   its anti-drone cage is not drawn; "KAMAZ-6350 chassis.jpg" shows an 8x8
   cab and its arches from the side).  Estimated: the cab/body split.
   The photographs show a canvas tilt over the whole body,
   so no load, no crane and no weapon is drawn.

   DATA NOTE: the row is offered from e50, but the KamAZ-6350 is a post-1990s
   design (the KamAZ plant started in 1969; the Mustang family is 2000s).

   Draw calls 14 (six baked meshes + eight wheels), six materials.
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuKamaz = (function () {
  "use strict";

  var AX = [3.20, 1.26, -2.08, -3.40];       /* axle x: 1940 + 3340 + 1320 mm wheelbase */
  var TR = 0.63, TW = 0.21, TY = 1.025;      /* 425/85R21 tyre, track 2050 mm          */
  var Z_DECK = 1.30, Z_RAIL = 1.98, Z_CAB = 3.01, Z_TILT = 3.26;
  var X_NOSE = 4.40, X_CABR = 2.40, X_BEDF = 2.12, X_BEDT = -5.13;

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
    blk: lin(0x1a1a18), dkg: lin(0x2e2f2b), strap: lin(0x24241f), grey: lin(0x55574f),
    rub: lin(0x1c1c1a), rim: lin(0x3c3e38), hub: lin(0x6a6c66), nut: lin(0xa5a7a9),
    lensW: lin(0xfff1c6), amber: lin(0xffa11a), red: lin(0xd4261a), green: lin(0x4a5538)
  };
  function makeMats(THREE, C) {
    var T = {};
    /* plain Russian green; a plain tinted material so the era paint can recolour it */
    T.paint = new THREE.MeshStandardMaterial({ color: 0x4a5538, roughness: 0.88, metalness: 0.06 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.84, metalness: 0.06 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x8e9194, roughness: 0.42, metalness: 0.55 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2830, roughness: 0.12, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.35, metalness: 0.1,
                                              emissive: 0x5a4a2a, emissiveIntensity: 0.9 });
    return T;
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


  /* One wheel as a triangle soup with per-vertex colour, axle on local Y,
     outer face on +Y for side = +1.  Surface of revolution of a profile
     (radius, y); the tread radius alternates lug / groove, which is what
     shows the wheel turning.  The lowest vertex is a lug at exactly -TR. */
  function wheelSoup(side, N, nuts) {
    var S = { P: [], N: [], C: [] };
    var RT = TR, RG = TR - 0.04;
    var pts = [
      [0.00, -0.265, 0, null],
      [0.34, -0.265, 0, K.rub],
      [0.60, -0.25, 0, K.rub],
      [0, -0.19, 1, K.rub],
      [0, 0.19, 1, K.rub],
      [0.60, 0.25, 0, K.rub],
      [0.34, 0.265, 0, K.rub],
      [0.31, 0.17, 0, K.rim],
      [0.12, 0.17, 0, K.rim],
      [0.12, 0.21, 0, K.hub],
      [0.00, 0.21, 0, K.hub]
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
      var r = p[2] ? ((k & 1) === 0 ? RT : RG) : p[0] * (TR / 0.65);
      var th = k * Math.PI * 2 / N;
      return [r * Math.cos(th), p[1] * (TW / 0.265), r * Math.sin(th)];
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
    if (nuts) {
      var y = side * 0.172 * (TW / 0.265), j, ph;
      for (j = 0; j < 8; j++) {
        ph = j * Math.PI / 4 + 0.2;
        var cx = 0.22 * Math.cos(ph), cz = 0.22 * Math.sin(ph), ex = 0.022 * Math.cos(ph), ez = 0.022 * Math.sin(ph), fx = -0.022 * Math.sin(ph), fz = 0.022 * Math.cos(ph);
        var p0 = [cx - ex - fx, y, cz - ez - fz], p1 = [cx + ex - fx, y, cz + ez - fz],
            p2 = [cx + ex + fx, y, cz + ez + fz], p3 = [cx - ex + fx, y, cz - ez + fz];
        var up = side > 0;
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


  /* wheel-arch lip: a thin curved band over a tyre, from a1 to a2 (radians
     from +X, measured up through the top), spanning y0..y1 */
  function arch(B, mat, ax, y0, y1, R, a1, a2, nseg, col) {
    var i, ya = Math.min(y0, y1), yb = Math.max(y0, y1), hint = [ax, (ya + yb) / 2, TR];
    function pt(t, r, y) { return [ax + r * Math.cos(t), y, TR + r * Math.sin(t)]; }
    var RO = R + 0.07, ts = [];
    for (i = 0; i <= nseg; i++) ts.push(a1 + (a2 - a1) * i / nseg);
    for (i = 0; i < nseg; i++) {
      var t0 = ts[i], t1 = ts[i + 1];
      /* a closed prism: outer surface, inner surface, the two edge faces */
      B.quad(mat, pt(t0, RO, ya), pt(t1, RO, ya), pt(t1, RO, yb), pt(t0, RO, yb), hint, col);
      B.quad(mat, pt(t0, R, ya), pt(t1, R, ya), pt(t1, R, yb), pt(t0, R, yb), [ax + 3 * Math.cos(t0), (ya + yb) / 2, TR + 3 * Math.sin(t0)], col);
      B.quad(mat, pt(t0, R, ya), pt(t1, R, ya), pt(t1, RO, ya), pt(t0, RO, ya), [ax, ya + 1, TR], col);
      B.quad(mat, pt(t0, R, yb), pt(t1, R, yb), pt(t1, RO, yb), pt(t0, RO, yb), [ax, yb - 1, TR], col);
    }
    /* end caps so the lip is a solid */
    var te = [a1, a2], k;
    for (k = 0; k < 2; k++) {
      var t = te[k], mid = (a1 + a2) / 2;
      B.quad(mat, pt(t, R, ya), pt(t, RO, ya), pt(t, RO, yb), pt(t, R, yb), pt(mid, (R + RO) / 2, (ya + yb) / 2), col);
    }
  }

  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "ru_kamaz";
    var B = new Baker(THREE);
    var P = T.paint, V = T.vc, ST = T.steel, GL = T.glass, TM = T.team, LP = T.lamp;
    var s, i, j, x;
    var ZC0 = 1.32;                              /* underside of the main cab body */
    var WC = 1.17;                               /* cab half width                 */
    function xf(z) { return 4.40 - 0.07 * (z - ZC0) / (Z_CAB - ZC0); }   /* raked front face of the cab */

    /* ---- the cab: flat-roofed box over the engine, raked front ---- */
    B.loft(P, [ring(4.40, 4.33, ZC0, Z_CAB, WC, 0.05, 0.10), ring(X_CABR, X_CABR, ZC0, Z_CAB, WC, 0.05, 0.10)], true, true);
    /* lower front (hood / bumper panel): across the full width ahead of the first tyre, narrower behind */
    B.box(P, 3.88, 4.40, -WC, WC, 0.80, ZC0 + 0.02, undefined, "+z");
    B.box(P, X_CABR, 3.90, -0.70, 0.70, 0.88, ZC0 + 0.02, undefined, "+z");
    B.box(V, X_CABR, 4.40, -0.70, 0.70, 0.60, 0.88, K.dkg);
    /* grille of horizontal slats, a round headlamp each side, amber markers */
    var xg = 4.425, behind = [3.2, 0, 1.2];
    B.quad(V, [xg, -0.58, 0.96], [xg, 0.58, 0.96], [xg, 0.58, 1.42], [xg, -0.58, 1.42], behind, K.blk);
    for (i = 0; i < 6; i++) {
      var zs = 1.00 + i * 0.07;
      B.quad(ST, [xg + 0.012, -0.54, zs], [xg + 0.012, 0.54, zs], [xg + 0.012, 0.54, zs + 0.03], [xg + 0.012, -0.54, zs + 0.03], behind);
    }
    for (s = -1; s <= 1; s += 2) {
      B.cyl(V, 0.095, 0.06, 14, 4.40, s * 0.77, 1.20, "x", K.grey);
      B.cyl(LP, 0.075, 0.02, 14, 4.435, s * 0.77, 1.20, "x", K.lensW);
      B.box(LP, 4.40, 4.44, s * 0.95 - 0.04, s * 0.95 + 0.04, 1.14, 1.20, K.amber);
    }
    /* plate bumper with two tow eyes */
    B.box(V, 4.38, 4.65, -1.19, 1.19, 0.52, 0.80, K.dkg);
    B.box(V, 4.64, 4.68, -0.55, -0.45, 0.58, 0.72, K.blk);
    B.box(V, 4.64, 4.68, 0.45, 0.55, 0.58, 0.72, K.blk);
    /* windscreen: two panes with a centre post, brow above, sun visor strip */
    function wp(y, z) { return [xf(z) + 0.012, y, z]; }
    var inside = [3.7, 0, 2.2];
    B.quad(GL, wp(0.05, 1.96), wp(1.05, 1.96), wp(1.05, 2.82), wp(0.05, 2.82), inside);
    B.quad(GL, wp(-1.05, 1.96), wp(-0.05, 1.96), wp(-0.05, 2.82), wp(-1.05, 2.82), inside);
    B.box(P, xf(2.86), xf(2.86) + 0.14, -1.14, 1.14, 2.86, 2.90);
    for (i = 0; i < 3; i++) B.box(LP, 4.22, 4.30, -0.36 + i * 0.36, -0.24 + i * 0.36, Z_CAB, Z_CAB + 0.05, K.amber);
    /* side windows, door edges, handles, steps, wing mirrors */
    for (s = -1; s <= 1; s += 2) {
      var yw = s * (WC + 0.006);
      B.quad(GL, [3.18, yw, 1.94], [4.20, yw, 1.94], [4.14, yw, 2.82], [3.18, yw, 2.82], [3.5, 0, 2.2]);
      B.box(V, 3.10, 3.14, s * WC, s * (WC + 0.012), 1.38, 2.86, K.blk);
      B.box(V, 4.20, 4.24, s * WC, s * (WC + 0.012), 1.38, 2.86, K.blk);
      B.box(V, 3.10, 4.24, s * WC, s * (WC + 0.012), 1.36, 1.40, K.blk);
      B.box(ST, 3.18, 3.34, s * WC, s * (WC + 0.03), 2.13, 2.17);
      B.box(V, 3.20, 4.05, s > 0 ? 1.0 : -1.30, s > 0 ? 1.30 : -1.0, 0.70, 0.74, K.dkg);
      /* mirrors: arm out of the door, two black heads */
      B.box(V, 4.18, 4.22, s * 1.17, s * 1.36, 2.50, 2.54, K.blk);
      B.box(V, 4.16, 4.24, s * 1.34, s * 1.41, 2.10, 2.80, K.blk);
      B.box(V, 4.16, 4.24, s * 1.30, s * 1.37, 2.82, 2.86, K.blk);
      /* wheel arch lips, outer face flush with the tyre */
      arch(B, V, AX[0], s > 0 ? 0.76 : -1.25, s > 0 ? 1.25 : -0.76, TR + 0.05, 0.10, 3.05, 12, K.blk);
      arch(B, V, AX[1], s > 0 ? 0.76 : -1.25, s > 0 ? 1.25 : -0.76, TR + 0.05, 0.10, 3.05, 12, K.blk);
      arch(B, V, AX[2], s > 0 ? 0.76 : -1.25, s > 0 ? 1.25 : -0.76, TR + 0.05, 0.10, 3.05, 12, K.blk);
      arch(B, V, AX[3], s > 0 ? 0.76 : -1.25, s > 0 ? 1.25 : -0.76, TR + 0.05, 0.10, 3.05, 12, K.blk);
    }
    /* windscreen wipers, roof vent, door steps, fuel filler, tilt seams, tow hooks */
    B.box(V, xf(2.0) + 0.015, xf(2.0) + 0.03, -0.80, -0.10, 2.00, 2.03, K.blk);
    B.box(V, xf(2.0) + 0.015, xf(2.0) + 0.03, 0.10, 0.80, 2.00, 2.03, K.blk);
    B.box(P, 2.70, 3.05, -0.30, 0.30, Z_CAB, Z_CAB + 0.07);
    for (s = -1; s <= 1; s += 2) {
      B.box(V, 3.40, 3.90, s * WC, s * (WC + 0.14), 0.98, 1.02, K.dkg);
      B.box(V, 3.40, 3.90, s * WC, s * (WC + 0.14), 1.14, 1.18, K.dkg);
      B.box(V, 4.00, 4.12, s * 1.18, s * 1.32, 1.00, 1.30, K.blk);
      B.box(V, 4.60, 4.70, s * 0.90 - 0.04, s * 0.90 + 0.04, 0.60, 0.70, K.dkg, "-x");
      B.box(V, 2.46, 2.56, s * WC, s * (WC + 0.02), 1.50, 2.40, K.blk);
      for (i = 0; i < 7; i++) {
        x = X_BEDF - 0.5 - i * 1.0;
        B.box(V, x - 0.015, x + 0.015, s * 1.115, s * 1.245, 2.20, 2.52, K.green);
      }
      B.box(V, X_BEDT + 0.07, X_BEDF, s * 1.12, s * 1.235, 2.60, 2.64, K.green);
    }
    B.cyl(V, 0.05, 0.10, 8, 1.55, 1.255, 1.60, "y", K.dkg);
    B.box(V, 4.40, 4.46, -0.30, 0.30, 1.50, 1.54, K.dkg);

    /* team strip on the cab roof */
    B.box(TM, 3.10, 4.10, -0.125, 0.125, Z_CAB + 0.02, Z_CAB + 0.04, undefined, "-z");
    /* back of the cab and the gap to the body */
    B.box(V, X_BEDF + 0.02, X_CABR - 0.02, -0.90, 0.90, 1.00, 2.50, K.dkg);

    /* ---- the cargo body: floor, steel drop sides, headboard, tailgate ---- */
    B.box(P, X_BEDT, X_BEDF, -1.20, 1.20, Z_DECK - 0.10, Z_DECK);
    for (s = -1; s <= 1; s += 2) {
      B.box(P, X_BEDT, X_BEDF, s > 0 ? 1.20 : -1.24, s > 0 ? 1.24 : -1.20, Z_DECK - 0.04, Z_RAIL);
      B.box(V, X_BEDT, X_BEDF, s > 0 ? 1.19 : -1.25, s > 0 ? 1.25 : -1.19, Z_RAIL - 0.05, Z_RAIL + 0.005, K.dkg);
      B.box(V, X_BEDT, X_BEDF, s > 0 ? 1.19 : -1.25, s > 0 ? 1.25 : -1.19, Z_DECK - 0.01, Z_DECK + 0.05, K.dkg);
      for (i = 0; i < 8; i++) {
        x = X_BEDF - 0.45 - i * 0.84;
        B.box(P, x - 0.045, x + 0.045, s > 0 ? 1.21 : -1.255, s > 0 ? 1.255 : -1.21, Z_DECK + 0.04, Z_RAIL - 0.02, undefined, s > 0 ? "-y" : "+y");
      }
      /* tilt lashing loops along the top of the side board */
      for (i = 0; i < 24; i++) {
        x = X_BEDF - 0.18 - i * 0.30;
        B.box(V, x - 0.02, x + 0.02, s > 0 ? 1.215 : -1.255, s > 0 ? 1.255 : -1.215, Z_RAIL - 0.02, Z_RAIL + 0.13, K.dkg, "-z");
      }
    }
    B.box(P, X_BEDF - 0.08, X_BEDF, -1.20, 1.20, Z_DECK, 2.50);
    B.box(P, X_BEDT, X_BEDT + 0.07, -1.20, 1.20, Z_DECK, Z_RAIL);
    /* the canvas tilt: over bows, overhanging the side boards a little */
    B.loft(P, [ring(X_BEDF - 0.03, X_BEDF - 0.03, Z_RAIL, Z_TILT, 1.22, 0.20, 0.55), ring(X_BEDT + 0.03, X_BEDT + 0.03, Z_RAIL, Z_TILT, 1.22, 0.20, 0.55)], true, true);
    /* roped bow lines across the canvas, and a team strip on the ridge */
    for (i = 0; i < 6; i++) {
      x = X_BEDF - 0.5 - i * 1.0;
      B.box(V, x - 0.02, x + 0.02, -0.66, 0.66, Z_TILT - 0.03, Z_TILT + 0.025, K.green, "-z");
    }
    B.box(TM, -1.60, -0.50, -0.125, 0.125, Z_TILT + 0.02, Z_TILT + 0.04, undefined, "-z");

    /* ---- chassis: rails, cross-members, axles, shafts, tanks, flaps ---- */
    B.box(V, -5.10, 4.20, 0.40, 0.56, 0.88, 1.22, K.dkg);
    B.box(V, -5.10, 4.20, -0.56, -0.40, 0.88, 1.22, K.dkg);
    var cm = [3.9, 2.4, 0.5, -0.5, -2.8, -4.8];
    for (i = 0; i < cm.length; i++) B.box(V, cm[i] - 0.06, cm[i] + 0.06, -0.40, 0.40, 0.95, 1.18, K.dkg);
    for (i = 0; i < 4; i++) {
      B.box(V, AX[i] - 0.07, AX[i] + 0.07, -0.74, 0.74, TR - 0.10, TR + 0.10, K.dkg);
      B.cyl(V, 0.20, 0.34, 10, AX[i], 0, TR, "y", K.grey);
    }
    B.cyl(V, 0.04, AX[0] - AX[1], 6, (AX[0] + AX[1]) / 2, 0, 0.78, "x", K.dkg);
    B.cyl(V, 0.04, AX[1] - AX[2], 6, (AX[1] + AX[2]) / 2, 0, 0.78, "x", K.dkg);
    B.cyl(V, 0.04, AX[2] - AX[3], 6, (AX[2] + AX[3]) / 2, 0, 0.78, "x", K.dkg);
    /* round tank under the body on the left, strapped, and a tool box on the right */
    B.cyl(P, 0.30, 1.30, 14, -0.35, 0.84, 0.92, "x");
    B.cyl(V, 0.31, 0.05, 14, -0.80, 0.84, 0.92, "x", K.strap);
    B.cyl(V, 0.31, 0.05, 14, 0.10, 0.84, 0.92, "x", K.strap);
    B.box(P, -0.90, 0.40, -1.12, -0.60, 0.72, 1.20);
    B.box(P, -1.35, -1.02, 0.62, 0.90, 0.80, 1.20);
    /* mud flaps behind each rear wheel of a pair */
    for (s = -1; s <= 1; s += 2) {
      B.box(V, AX[1] - 0.73, AX[1] - 0.70, s > 0 ? 0.74 : -1.24, s > 0 ? 1.24 : -0.74, 0.25, 0.90, K.blk);
      B.box(V, AX[3] - 0.73, AX[3] - 0.70, s > 0 ? 0.74 : -1.24, s > 0 ? 1.24 : -0.74, 0.25, 0.90, K.blk);
      B.box(LP, X_BEDT - 0.04, X_BEDT, s > 0 ? 0.90 : -1.15, s > 0 ? 1.15 : -0.90, 1.10, 1.22, K.red);
    }
    B.box(V, X_BEDT + 0.03, X_BEDT + 0.15, -1.20, 1.20, 0.78, 1.04, K.dkg);
    B.box(ST, X_BEDT - 0.04, X_BEDT + 0.08, -0.09, 0.09, 0.88, 1.00);

    B.flush(g);

    /* ---- eight wheels, each a turning group ---- */
    var gL = soupGeo(THREE, wheelSoup(1, 30, true)), gR = soupGeo(THREE, wheelSoup(-1, 30, true));
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

UNIT_MODELS["supply_p"] = { len: 9.85, build: HeroRuKamaz.build };   /* published KamAZ-6350 length */
