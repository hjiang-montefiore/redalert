/* ===== ru_btr8x8.js - HERO models: the BTR-60 / 70 / 80 / 82A eight-wheeled APC family =====
   Rows (js/eras.js):
     pact_e60_btr60    BTR-60PB   (accepted 1966)
     pact_e80_btr70    BTR-70     (accepted 1972)
     pact_e90_btr80    BTR-80     (accepted 1986)
     pact_e00_btr82a   BTR-82A    (accepted 2013)

   References (Wikimedia Commons photographs, fetched once, generic agent; no
   drawing of these vehicles was used, shapes are traced from the photographs):
     BTR-60PB  "Belarus-Pruzhany-Stepan Gudimov Park-BTR-60PB-2.jpg" (clean
        head-on view): the CLOSED hull, a V-shaped pointed bow in plan, a
        short flat nose plate with the trim vane (wave-breaker plate) stowed
        flat across it, sloped glacis with two raised pads, a low raised step
        with a row of driver/commander vision blocks, round headlamps on posts
        at the bow corners with tubular guards, a horn, and the low sloping
        BPU-1 turret with a single gun.  "BTR-60PB in Lutsk" and the other
        Pruzhany views give the 4-axle layout.
     BTR-70    "BTR-70 Lutsk.jpg" (front 3/4): the same pointed bow, the vane
        carried flat across the nose on two bars, the glacis pads, the vision
        step, the BPU-1 turret with its machine gun and the lower flank
        tucked under the upper hull flare.
     BTR-80    "Moscow 2012 Victory Day Parade Rehearsal, BTR-80, Russia.jpg"
        (clean side view): eight tyres in two close pairs (axle spacings
        about 1.43 / 1.79 / 1.38 m measured from the picture), the wedge
        bow, the flat roof, the rectangular side door panel between the
        second and third axles, the lower hull tucked in under the upper
        flank, the turret on the forward half of the roof.
     BTR-82A   "BTR-82A of the Western Military District - June 2023.jpg"
        (front 3/4): the BTR-80 hull with the angular, flat-faced BPPU
        turret, a sight block at its rear and a round sight dome beside it.
        (A BTR-82A suspension photograph was also fetched; it is a cutaway
        and was not used.)
   Published figures used (Wikipedia infoboxes and the game's own rows):
     BTR-60PB 7.56 x 2.825 x 2.31 m;  BTR-70 7.535 x 2.80 x 2.32 m;
     BTR-80 7.65 x 2.90 x 2.35 m;     BTR-82A 7.69 x 2.90 m, turret top 2.5 m
     (the row says 2.6), ground clearance about 0.475 m, tyres about 1.1 m.
   NOTE: the BTR-70 is NOT longer than the BTR-60PB (7.535 vs 7.56 m); the
   brief's "longer hull" is not supported, so none is drawn.
   NOT CONFIRMED from references and therefore approximated: the exact axle
   spacing of the 60PB and 70 (taken equal to the BTR-80 photograph); which
   gun sits on which side of a BPU-1 (KPVT left, PKT right here, as the
   BRDM-2 model does) and of the BPPU; the BTR-80 / BTR-82A smoke-discharger
   block positions (six 902V in two groups of three on the turret flanks);
   the side-door panel sizes (small hatch on the 70, larger split door on the
   80/82A); roof hatch positions.  Not drawn: antennas, searchlight, stowage
   and canvas, markings, the rear roof pipe seen on the BTR-80 photograph (its
   function is not confirmed), the 82A's EW jammer and add-on kits.

   Nodes: "turret" (the BPU-1 / BTR-80 / BPPU turret, at rest forward), eight
   "roadwheel" groups (axle on local Y).  Team material is exactly C.team, a
   plate on the rear engine deck.  Model space +X nose, +Y left, +Z up,
   tyres on 0.  ASCII only.                                                  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBtr8x8 = (function () {
  "use strict";

  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var K = { blk: lin(0x1a1a18), dk: lin(0x2e302a), rub: lin(0x1c1c1a), rim: lin(0x5a5f46),
            steel: lin(0x6c6f6c), glass: lin(0x1e2b30), lamp: lin(0xcfc8a0), mis: lin(0x4a5238),
            seat: lin(0x3a3d2c), grn: lin(0x5a6440), dgr: lin(0x4b5535) };

  function makeMats(THREE, C) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: 0x5a6440, roughness: 0.9, metalness: 0.05 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0.08 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.55, metalness: 0.18 });
    return T;
  }

  /* ---- triangle-soup baker (one mesh per material) ---- */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.slot = function (mat) {
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) return this.by[i];
    var s = { mat: mat, P: [], N: [], C: [], vc: !!mat.vertexColors };
    this.by.push(s); return s;
  };
  Baker.prototype.tri = function (mat, a, b, c, col) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var s = this.slot(mat);
    s.P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    s.N.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    if (s.vc) { var k = col || K.dk; s.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]); }
  };
  Baker.prototype.triAway = function (mat, a, b, c, h, col) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var d = nx * ((a[0] + b[0] + c[0]) / 3 - h[0]) + ny * ((a[1] + b[1] + c[1]) / 3 - h[1]) + nz * ((a[2] + b[2] + c[2]) / 3 - h[2]);
    if (d < 0) this.tri(mat, a, c, b, col); else this.tri(mat, a, b, c, col);
  };
  /* orient a triangle so its normal agrees with n */
  Baker.prototype.triN = function (mat, a, b, c, n, col) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var d = (uy * vz - uz * vy) * n[0] + (uz * vx - ux * vz) * n[1] + (ux * vy - uy * vx) * n[2];
    if (d < 0) this.tri(mat, a, c, b, col); else this.tri(mat, a, b, c, col);
  };
  Baker.prototype.quad = function (mat, a, b, c, d, h, col) { this.triAway(mat, a, b, c, h, col); this.triAway(mat, a, c, d, h, col); };
  Baker.prototype.box = function (mat, x0, x1, y0, y1, z0, z1, col, skip) {
    var c = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
    var h = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    var F = [["-z", 0, 3, 2, 1], ["+z", 4, 5, 6, 7], ["-y", 0, 1, 5, 4], ["+y", 3, 7, 6, 2], ["-x", 0, 4, 7, 3], ["+x", 1, 2, 6, 5]];
    for (var i = 0; i < 6; i++) { if (skip && skip.indexOf(F[i][0]) >= 0) continue; this.quad(mat, c[F[i][1]], c[F[i][2]], c[F[i][3]], c[F[i][4]], h, col); }
  };
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, col) {
    var THREE = this.T;
    var geo = new THREE.CylinderGeometry(r, r, len, seg, 1, false).toNonIndexed();
    var m = new THREE.Matrix4();
    if (axis === "x") m.makeRotationZ(-Math.PI / 2); else if (axis === "z") m.makeRotationX(Math.PI / 2);
    m.setPosition(x, y, z); geo.applyMatrix4(m);
    var p = geo.attributes.position.array, n = geo.attributes.normal.array, s = this.slot(mat), i;
    for (i = 0; i < p.length; i++) { s.P.push(p[i]); s.N.push(n[i]); }
    if (s.vc) { var k = col || K.dk; for (i = 0; i < p.length / 3; i++) s.C.push(k[0], k[1], k[2]); }
  };
  Baker.prototype.loft = function (mat, rings, capF, capL, col) {
    var i, k, n8 = rings[0].length, h = [0, 0, 0], n = 0;
    for (i = 0; i < rings.length; i++) for (k = 0; k < n8; k++) { h[0] += rings[i][k][0]; h[1] += rings[i][k][1]; h[2] += rings[i][k][2]; n++; }
    h = [h[0] / n, h[1] / n, h[2] / n];
    for (i = 0; i + 1 < rings.length; i++) for (k = 0; k < n8; k++) {
      var a = rings[i][k], b = rings[i][(k + 1) % n8], c = rings[i + 1][(k + 1) % n8], d = rings[i + 1][k];
      this.triAway(mat, a, b, c, h, col); this.triAway(mat, a, c, d, h, col);
    }
    var self = this;
    function cap(r) {
      var m = [0, 0, 0], j;
      for (j = 0; j < n8; j++) { m[0] += r[j][0] / n8; m[1] += r[j][1] / n8; m[2] += r[j][2] / n8; }
      for (j = 0; j < n8; j++) self.triAway(mat, m, r[j], r[(j + 1) % n8], h, col);
    }
    if (capF) cap(rings[0]);
    if (capL) cap(rings[rings.length - 1]);
  };
  /* convex solid from a bottom and a top rectangle (x0,x1,halfwidth,z) */
  Baker.prototype.frustum = function (mat, bx0, bx1, bw, bz, tx0, tx1, tw, tz, col) {
    var c = [[bx0, -bw, bz], [bx1, -bw, bz], [bx1, bw, bz], [bx0, bw, bz], [tx0, -tw, tz], [tx1, -tw, tz], [tx1, tw, tz], [tx0, tw, tz]];
    var h = [(bx0 + bx1) / 2, 0, (bz + tz) / 2];
    var F = [[4, 5, 6, 7], [0, 1, 5, 4], [3, 7, 6, 2], [0, 4, 7, 3], [1, 2, 6, 5]];
    for (var i = 0; i < F.length; i++) this.quad(mat, c[F[i][0]], c[F[i][1]], c[F[i][2]], c[F[i][3]], h, col);
  };
  /* simple polygon (x,z) extruded between y0 and y1 (ear clipped caps, rim walls) */
  Baker.prototype.plate = function (mat, poly, y0, y1, col) {
    var n = poly.length, i, j, area = 0;
    for (i = 0; i < n; i++) { j = (i + 1) % n; area += poly[i][0] * poly[j][1] - poly[j][0] * poly[i][1]; }
    var P = area < 0 ? poly.slice().reverse() : poly;
    var idx = [], out = [], g = 0;
    for (i = 0; i < n; i++) idx.push(i);
    function inTri(p, a, b, c) {
      var d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
      var d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
      var d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
      return !((d1 < -1e-9 || d2 < -1e-9 || d3 < -1e-9) && (d1 > 1e-9 || d2 > 1e-9 || d3 > 1e-9));
    }
    while (idx.length > 3 && g++ < 4000) {
      var m = idx.length, found = false;
      for (i = 0; i < m && !found; i++) {
        var ia = idx[(i + m - 1) % m], ib = idx[i], ic = idx[(i + 1) % m];
        var a = P[ia], b = P[ib], c = P[ic];
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-9) continue;
        var ok = true;
        for (j = 0; j < m; j++) {
          var q = idx[j]; if (q === ia || q === ib || q === ic) continue;
          if (inTri(P[q], a, b, c)) { ok = false; break; }
        }
        if (ok) { out.push([ia, ib, ic]); idx.splice(i, 1); found = true; }
      }
      if (!found) break;
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    var ymin = Math.min(y0, y1), ymax = Math.max(y0, y1);
    for (i = 0; i < out.length; i++) {
      var t = out[i];
      this.triN(mat, [P[t[0]][0], ymax, P[t[0]][1]], [P[t[1]][0], ymax, P[t[1]][1]], [P[t[2]][0], ymax, P[t[2]][1]], [0, 1, 0], col);
      this.triN(mat, [P[t[0]][0], ymin, P[t[0]][1]], [P[t[1]][0], ymin, P[t[1]][1]], [P[t[2]][0], ymin, P[t[2]][1]], [0, -1, 0], col);
    }
    var m2 = P.length;
    for (i = 0; i < m2; i++) {
      var p = P[i], q2 = P[(i + 1) % m2], nn = [q2[1] - p[1], 0, -(q2[0] - p[0])];
      this.triN(mat, [p[0], ymin, p[1]], [q2[0], ymin, q2[1]], [q2[0], ymax, q2[1]], nn, col);
      this.triN(mat, [p[0], ymin, p[1]], [q2[0], ymax, q2[1]], [p[0], ymax, p[1]], nn, col);
    }
  };
  Baker.prototype.addSoup = function (mat, S, dx, dy, dz) {
    var s = this.slot(mat), i;
    for (i = 0; i < S.P.length; i += 3) s.P.push(S.P[i] + dx, S.P[i + 1] + dy, S.P[i + 2] + dz);
    for (i = 0; i < S.N.length; i++) s.N.push(S.N[i]);
    if (s.vc) for (i = 0; i < S.C.length; i++) s.C.push(S.C[i]);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(e.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(e.N), 3));
      if (e.vc) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(e.C), 3));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat); mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };


  function soupGeo(THREE, S) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(S.P), 3));
    g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(S.N), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(S.C), 3));
    g.computeBoundingSphere(); return g;
  }
  function circ(z, rx, ry, cx, n) {
    var o = [], k;
    for (k = 0; k < n; k++) { var a = (k + 0.5) * 2 * Math.PI / n; o.push([cx + rx * Math.cos(a), ry * Math.sin(a), z]); }
    return o;
  }


  /* ---- 8-point hull ring: bottom, lower flank, shoulder, roof ---- */
  function hring(x, hb, zb, hl, zl, hs, zs, hr, zr) {
    return [[x, -hb, zb], [x, hb, zb], [x, hl, zl], [x, hs, zs], [x, hr, zr], [x, -hr, zr], [x, -hs, zs], [x, -hl, zl]];
  }

  /* variant table */
  var VAR = {
    b60: { name: "ru_btr60pb", L: 7.56, hs: 1.41, RZ: 1.85, door: 0, turret: "bpu", smoke: false, tx: 0.90 },
    b70: { name: "ru_btr70", L: 7.535, hs: 1.40, RZ: 1.88, door: 1, turret: "bpu", smoke: false, tx: 0.92 },
    b80: { name: "ru_btr80", L: 7.65, hs: 1.45, RZ: 1.94, door: 2, turret: "b80", smoke: true, tx: 0.95 },
    b82: { name: "ru_btr82a", L: 7.69, hs: 1.45, RZ: 1.95, door: 2, turret: "b82", smoke: true, tx: 0.95 }
  };
  var R = 0.55, TW = 0.36, WY = 1.20;
  var AX = [2.19, 0.76, -1.03, -2.41];

  /* tyre: axle on local Y, chevron tread (alternating lug radius), dished rim */
  function tyreSoup(THREE, V, r, w, N) {
    var B = new Baker(THREE), hw = w / 2, i, j, o = [0, 0, 0];
    var prof = [[0.20, -hw * 0.80, K.rim, 0], [0.56, -hw * 0.80, K.rim, 0], [0.66, -hw * 0.98, K.rub, 0],
                [0.84, -hw, K.rub, 0], [0.96, -hw * 0.82, K.rub, 0], [1, -hw * 0.46, K.rub, 1],
                [1, hw * 0.46, K.rub, 1], [0.96, hw * 0.82, K.rub, 0], [0.84, hw, K.rub, 0],
                [0.66, hw * 0.98, K.rub, 0], [0.56, hw * 0.80, K.rim, 0], [0.20, hw * 0.80, K.rim, 0]];
    function P(rr, y, a) { return [rr * Math.cos(a), y, rr * Math.sin(a)]; }
    for (i = 0; i < N; i++) {
      var a0 = i / N * 6.28319, a1 = (i + 1) / N * 6.28319, lug = (i & 1) ? 0.95 : 1;
      for (j = 0; j + 1 < prof.length; j++) {
        var p = prof[j], q = prof[j + 1];
        var rp = p[0] * r * (p[3] ? lug : 1), rq = q[0] * r * (q[3] ? lug : 1);
        var nr = q[1] - p[1], ny = -(rq - rp), am = (a0 + a1) / 2, nn = [nr * Math.cos(am), ny, nr * Math.sin(am)];
        B.triN(V, P(rp, p[1], a0), P(rp, p[1], a1), P(rq, q[1], a1), nn, q[2]);
        B.triN(V, P(rp, p[1], a0), P(rq, q[1], a1), P(rq, q[1], a0), nn, q[2]);
      }
    }
    B.cyl(V, 0.15 * r, hw * 0.5, 8, 0, -hw * 0.80 - hw * 0.12, 0, "y", K.dk);
    B.cyl(V, 0.15 * r, hw * 0.5, 8, 0, hw * 0.80 + hw * 0.12, 0, "y", K.dk);
    /* hub bolts */
    for (i = 0; i < 3; i++) {
      var ba = i / 3 * 6.28319;
      B.cyl(V, 0.022, 0.03, 4, 0.36 * r * Math.cos(ba), -hw * 0.86, 0.36 * r * Math.sin(ba), "y", K.steel);
      B.cyl(V, 0.022, 0.03, 4, 0.36 * r * Math.cos(ba), hw * 0.86, 0.36 * r * Math.sin(ba), "y", K.steel);
    }
    return B.by[0];
  }

  /* hull lofted from stations, scaled to the variant length and width */
  function hullLoft(B, P, v) {
    var sx = (v.L - 0.09) / 7.65, wf = v.hs / 1.45, RZ = v.RZ;
    function zr(z) { return Math.min(z, RZ); }
    var S = [
      [3.82, 0.50, 0.80, 0.58, 0.90, 0.64, 1.08, 0.58, zr(1.32)],
      [3.50, 0.70, 0.66, 0.86, 0.80, 0.94, 1.05, 0.84, zr(1.58)],
      [3.10, 0.84, 0.54, 1.02, 0.74, 1.18, 1.08, 0.98, zr(1.82)],
      [2.60, 0.92, 0.48, 1.12, 0.70, 1.43, 1.10, 1.24, RZ],
      [1.90, 0.92, 0.475, 1.12, 0.70, 1.45, 1.10, 1.30, RZ],
      [0.00, 0.92, 0.475, 1.12, 0.70, 1.45, 1.10, 1.30, RZ],
      [-1.60, 0.92, 0.475, 1.12, 0.70, 1.45, 1.10, 1.30, RZ],
      [-3.00, 0.92, 0.475, 1.12, 0.70, 1.45, 1.10, 1.30, RZ],
      [-3.50, 0.80, 0.60, 1.04, 0.80, 1.34, 1.10, 1.20, zr(1.90)],
      [-3.83, 0.64, 0.82, 0.90, 0.95, 1.14, 1.12, 1.04, zr(1.62)]
    ];
    var rings = S.map(function (s) {
      return hring(s[0] * sx, s[1] * wf, s[2], s[3] * wf, s[4], s[5] * wf, s[6], s[7] * wf, s[8]);
    });
    B.loft(P, rings, true, true);
    return { sx: sx, wf: wf };
  }
  /* half-width of the upper flank at height z (for fixing panels to the skin) */
  function flankY(v, z) {
    var hs = v.hs, hr = 1.30 * v.hs / 1.45;
    return hs + (hr - hs) * Math.max(0, Math.min(1, (z - 1.10) / (v.RZ - 1.10)));
  }

  function bpuTurret(THREE, P, V, TB, v) {
    TB.loft(P, [circ(0.00, 0.60, 0.56, 0, 16), circ(0.14, 0.58, 0.54, 0, 16), circ(0.30, 0.46, 0.42, 0.02, 16), circ(0.35, 0.38, 0.36, 0.02, 16)], true, true);
    TB.box(P, 0.46, 0.64, -0.30, 0.30, 0.08, 0.30);                      /* mantlet */
    TB.cyl(V, 0.052, 0.55, 12, 0.90, 0.11, 0.20, "x", K.dk);             /* KPVT jacket */
    TB.cyl(V, 0.032, 0.80, 10, 1.50, 0.11, 0.20, "x", K.blk);            /* KPVT barrel */
    TB.cyl(V, 0.042, 0.10, 10, 1.95, 0.11, 0.20, "x", K.blk);            /* muzzle brake */
    TB.cyl(V, 0.022, 0.50, 8, 0.88, -0.13, 0.18, "x", K.blk);            /* PKT */
    TB.box(V, 0.20, 0.34, -0.40, -0.12, 0.30, 0.40, K.glass);            /* sight window block */
    TB.box(V, -0.12, 0.10, 0.12, 0.30, 0.34, 0.42, K.glass);            /* sight block */
    TB.cyl(V, 0.14, 0.04, 12, -0.18, -0.20, 0.375, "z", K.dgr);          /* turret roof hatch */
  }
  function b80Turret(THREE, P, V, TB, v) {
    TB.loft(P, [circ(0.00, 0.72, 0.66, 0, 12), circ(0.14, 0.70, 0.64, 0, 12), circ(0.30, 0.52, 0.48, 0.02, 12), circ(0.34, 0.44, 0.40, 0.02, 12)], true, true);
    TB.box(P, 0.52, 0.72, -0.34, 0.34, 0.08, 0.34);                      /* mantlet */
    TB.cyl(V, 0.055, 0.60, 12, 1.00, 0.12, 0.22, "x", K.dk);             /* KPVT jacket */
    TB.cyl(V, 0.032, 0.80, 10, 1.68, 0.12, 0.22, "x", K.blk);            /* KPVT barrel */
    TB.cyl(V, 0.042, 0.10, 10, 2.12, 0.12, 0.22, "x", K.blk);            /* muzzle brake */
    TB.cyl(V, 0.022, 0.50, 8, 0.98, -0.14, 0.20, "x", K.blk);            /* PKT */
    TB.box(V, 0.24, 0.38, -0.42, -0.12, 0.30, 0.40, K.glass);
    TB.box(V, -0.10, 0.14, 0.12, 0.34, 0.34, 0.42, K.glass);
    TB.cyl(V, 0.14, 0.04, 12, -0.20, -0.22, 0.36, "z", K.dgr);
  }
  function b82Turret(THREE, P, V, TB, v) {
    TB.frustum(P, -0.62, 0.58, 0.82, 0.04, -0.46, 0.46, 0.64, 0.42);     /* flat-faced BPPU body */
    TB.frustum(P, 0.50, 0.74, 0.50, 0.06, 0.52, 0.66, 0.44, 0.34);       /* mantlet block */
    TB.cyl(V, 0.055, 0.60, 12, 1.00, 0.14, 0.22, "x", K.dk);             /* 2A72 jacket */
    TB.cyl(V, 0.034, 1.20, 10, 1.60, 0.14, 0.22, "x", K.blk);            /* barrel */
    TB.cyl(V, 0.045, 0.12, 10, 2.20, 0.14, 0.22, "x", K.blk);            /* muzzle brake / flash hider */
    TB.cyl(V, 0.022, 0.50, 8, 0.98, -0.14, 0.20, "x", K.blk);            /* PKTM */
    TB.box(V, -0.48, -0.12, -0.50, -0.14, 0.40, 0.52, K.dgr);            /* sight block at the rear */
    TB.box(V, -0.46, -0.30, -0.46, -0.18, 0.44, 0.50, K.glass);
    TB.cyl(V, 0.10, 0.05, 14, -0.04, 0.34, 0.425, "z", K.dgr);           /* gunner's sight dome base */
    TB.cyl(V, 0.08, 0.08, 14, -0.04, 0.34, 0.49, "z", K.glass);
    TB.box(V, 0.28, 0.52, -0.40, -0.20, 0.30, 0.40, K.glass);            /* front sight window */
    TB.cyl(V, 0.15, 0.04, 12, -0.20, 0.0, 0.44, "z", K.dgr);             /* roof hatch */
  }
  function smokeBlock(V, TB, y, x0, z0) {
    var i, s = y > 0 ? 1 : -1;
    TB.box(V, x0 - 0.10, x0 + 0.10, y - 0.04 * s, y + 0.04 * s, z0, z0 + 0.04, K.dk);
    for (i = 0; i < 3; i++) TB.cyl(V, 0.032, 0.18, 8, x0 - 0.07 + i * 0.07, y + 0.0, z0 + 0.13, "z", K.blk);
  }

  function build(v, THREE, M, C) {
    var T = makeMats(THREE, C), g = new THREE.Group(), B = new Baker(THREE), P = T.paint, V = T.vc, i, s;
    g.name = v.name;
    var hl = hullLoft(B, P, v), sx = hl.sx, RZ = v.RZ, hw = v.hs;
    /* --- bow: vane flat across the nose, bars, hinge brackets, tow eyes --- */
    B.box(P, 3.83 * sx, 3.88 * sx, -0.50, 0.50, 0.86, 1.34);
    for (s = -1; s <= 1; s += 2) {
      B.box(V, 3.80 * sx, 3.90 * sx, s * 0.40 - 0.03, s * 0.40 + 0.03, 0.90, 0.94, K.dk);
      B.box(V, 3.80 * sx, 3.90 * sx, s * 0.40 - 0.03, s * 0.40 + 0.03, 1.28, 1.32, K.dk);
      B.cyl(V, 0.045, 0.10, 8, 3.80 * sx, s * 0.62, 0.76, "x", K.dk);       /* tow eye */
    }
    /* glacis pads (raised panels) */
    for (s = -1; s <= 1; s += 2) {
      var pc = s * 0.45 * hl.wf, pw = 0.30 * hl.wf, ph = Math.min(RZ - 0.06, 1.80);
      B.box(P, 2.55 * sx, 3.05 * sx, pc - pw, pc + pw, ph, ph + 0.05);
    }
    /* driver / commander vision step across the front of the roof with vision blocks */
    B.box(P, 1.78 * sx, 2.12 * sx, -0.95 * hl.wf, 0.95 * hl.wf, RZ - 0.02, RZ + 0.13);
    for (i = -4; i <= 4; i++) if (i !== 0) B.box(V, 2.12 * sx, 2.145 * sx, i * 0.20 - 0.07, i * 0.20 + 0.07, RZ + 0.03, RZ + 0.10, K.glass);
    /* headlamps on posts at the bow corners with tubular guards */
    for (s = -1; s <= 1; s += 2) {
      var ly = s * 1.13 * hl.wf;
      B.box(P, 2.96 * sx, 3.06 * sx, ly - 0.05, ly + 0.05, 1.52, 1.64);
      B.cyl(V, 0.10, 0.16, 12, 3.08 * sx, ly, 1.70, "x", K.lamp);
      B.cyl(V, 0.11, 0.05, 12, 2.98 * sx, ly, 1.70, "x", K.dk);
      B.box(V, 3.22 * sx, 3.25 * sx, ly - 0.14, ly - 0.11, 1.40, 1.86, K.dk);
      B.box(V, 3.22 * sx, 3.25 * sx, ly + 0.11, ly + 0.14, 1.40, 1.86, K.dk);
      B.box(V, 3.22 * sx, 3.25 * sx, ly - 0.14, ly + 0.14, 1.84, 1.87, K.dk);
    }
    B.cyl(V, 0.08, 0.14, 10, 3.00 * sx, -0.55, RZ - 0.18, "x", K.dk);       /* horn */
    /* roof: troop hatches (approximate positions), engine deck louvres, aft step */
    for (s = -1; s <= 1; s += 2) {
      B.cyl(V, 0.21, 0.045, 14, -0.85 * sx, s * 0.62, RZ + 0.02, "z", K.dgr);
      B.cyl(V, 0.21, 0.045, 14, -1.60 * sx, s * 0.62, RZ + 0.02, "z", K.dgr);
      B.cyl(V, 0.09, 0.03, 10, -0.85 * sx, s * 0.62, RZ + 0.06, "z", K.dk);
      B.cyl(V, 0.09, 0.03, 10, -1.60 * sx, s * 0.62, RZ + 0.06, "z", K.dk);
    }
    B.box(V, -3.25 * sx, -2.25 * sx, -0.95, 0.95, RZ, RZ + 0.025, K.dk);
    for (i = 0; i < 8; i++) B.box(V, (-3.22 + i * 0.125) * sx, (-3.15 + i * 0.125) * sx, -0.92, 0.92, RZ + 0.025, RZ + 0.06, K.dgr);
    B.box(T.team, -2.20 * sx, -1.90 * sx, -0.30, 0.30, RZ, RZ + 0.03);
    /* turret ring */
    B.cyl(P, 0.62, 0.06, 20, v.tx, 0, RZ + 0.02, "z");
    /* side details: door panels, hinges, grab rails; lower flank skid plate */
    for (s = -1; s <= 1; s += 2) {
      var y1, d = 0.02;
      if (v.door === 2) {                                                   /* large split door */
        y1 = flankY(v, 1.3);
        B.box(P, -0.62, 0.38, s > 0 ? y1 - 0.02 : -y1 - d, s > 0 ? y1 + d : -y1 + 0.02, 0.98, 1.66);
        B.box(V, -0.62, 0.38, s > 0 ? y1 + d : -y1 - d - 0.01, s > 0 ? y1 + d + 0.01 : -y1 - d, 1.31, 1.34, K.dk);
        B.box(V, 0.28, 0.34, s > 0 ? y1 + d : -y1 - d - 0.03, s > 0 ? y1 + d + 0.03 : -y1 - d, 1.12, 1.22, K.dk);
      } else if (v.door === 1) {                                            /* small side hatches */
        y1 = flankY(v, 1.3);
        B.box(P, -0.36, 0.16, s > 0 ? y1 - 0.02 : -y1 - d, s > 0 ? y1 + d : -y1 + 0.02, 1.12, 1.62);
        B.box(V, 0.08, 0.13, s > 0 ? y1 + d : -y1 - d - 0.03, s > 0 ? y1 + d + 0.03 : -y1 - d, 1.30, 1.40, K.dk);
      }
      /* the vision ports along the flank */
      for (i = 0; i < 4; i++) {
        var px = 1.60 - i * 0.22 * 1.0, py = flankY(v, 1.55);
        B.box(V, px - 0.06, px + 0.06, s > 0 ? py - 0.02 : -py - 0.02, s > 0 ? py + 0.02 : -py + 0.02, 1.52, 1.62, K.glass);
      }
      /* lower flank grab rails and exhaust/waterjet stub at the rear */
      B.box(V, -3.55 * sx, -3.30 * sx, s * 0.40 - 0.05, s * 0.40 + 0.05, 0.58, 0.64, K.dk);
    }
    /* waterjet outlet grille across the stern */
    B.box(V, -3.84 * sx, -3.80 * sx, -0.35, 0.35, 0.90, 1.12, K.dk);
    /* wheels (spin nodes) */
    var tg = tyreSoup(THREE, V, R, TW, 24), geo = soupGeo(THREE, tg);
    for (i = 0; i < AX.length; i++) for (s = -1; s <= 1; s += 2) {
      var w = new THREE.Group(); w.name = "roadwheel"; w.position.set(AX[i] * sx, s * WY * hl.wf, R);
      var m = new THREE.Mesh(geo, V); m.castShadow = true; m.receiveShadow = true; w.add(m); g.add(w);
    }
    B.flush(g);
    /* turret */
    var tgp = new THREE.Group(), TB = new Baker(THREE);
    tgp.name = "turret"; tgp.position.set(v.tx, 0, RZ + 0.04);
    if (v.turret === "bpu") bpuTurret(THREE, P, V, TB, v);
    else if (v.turret === "b80") b80Turret(THREE, P, V, TB, v);
    else b82Turret(THREE, P, V, TB, v);
    if (v.smoke) { smokeBlock(V, TB, 0.56, -0.40, 0.12); smokeBlock(V, TB, -0.56, -0.40, 0.12); }
    TB.flush(tgp); g.add(tgp);
    return g;
  }

  return { b60: function (t, m, c) { return build(VAR.b60, t, m, c); },
           b70: function (t, m, c) { return build(VAR.b70, t, m, c); },
           b80: function (t, m, c) { return build(VAR.b80, t, m, c); },
           b82: function (t, m, c) { return build(VAR.b82, t, m, c); } };
})();

UNIT_MODELS["pact_e60_btr60"] = { len: 7.56, build: HeroRuBtr8x8.b60 };
UNIT_MODELS["pact_e80_btr70"] = { len: 7.535, build: HeroRuBtr8x8.b70 };
UNIT_MODELS["pact_e90_btr80"] = { len: 7.65, build: HeroRuBtr8x8.b80 };
UNIT_MODELS["pact_e00_btr82a"] = { len: 7.69, build: HeroRuBtr8x8.b82 };
