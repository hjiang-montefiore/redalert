/* ===== ru_brdm.js - HERO models: BRDM-1, 9P110 Malyutka carrier, BRDM-2 =====
   Rows (js/eras.js):
     pact_e50_recon           BRDM-1 Scout Car (1957)
     pact_e60_tankdestroyer   9P110, six 9M14 Malyutka on a BRDM-1 (1963), turret:false
     pact_e60_recon, pact_e80_recon, pact_e90_recon, pact_e00_recon, recon_p
                              BRDM-2 (1962)  - one model, one Soviet green

   References (Wikimedia Commons photographs, fetched once, generic agent; no
   drawing of either vehicle exists on Commons or on the English Wikipedia
   pages, so shapes are traced from these photographs):
     BRDM-1  "BRDM-1 TBiU 24 3.jpg" (clean side photograph, right side): the
        hull is CLOSED (roof, not an open boat); sloped beak bow with lamp
        pods at the bow corners, a row of louvre fins on the front deck, the
        deck rising to a low cabin box (roof about 1.9 m) with a pintle
        machine gun (SGMB, about 1.0 m long) on a pedestal just ahead of it,
        a lower flat rear deck, two big wheels with large arches, the pair of
        small belly wheels between them hung under the sill, ribbed step
        plates low on the side.  "BRDM in MWP.jpg" (3/4 front-right):
        slab sides, the box with sloped faces, louvre fins, bow post, lamps.
     9P110   "9P110 Malyutka.JPG" and "Malyutka BRDM-1 ATM in Museum of
        technique 2016-08-16.JPG": the BRDM-1 hull with the front deck, lamps,
        louvre fins and bow post unchanged and a low flat-roofed box over the
        rear compartment with roof hatches and a round vent/periscope stack.
        Both museum vehicles are in TRAVEL order: roof closed, missiles
        stowed inside - so no missile is drawn (the 6-rail launcher that rises
        through the roof is not shown in any reference; its layout is not
        guessed).
     BRDM-2  "BRDM-2 on display.JPEG" (clean side photograph, right side),
        "BRDM-2 in Korolyov Moscow Oblast.jpg" (left side), "BRDM-2 (side).jpg"
        and "BRDM-2 Serbian parade" (front 3/4): flat vertical slab sides on a
        boat bottom, short sloping bow with a bumper bar across it and
        lamp cages on the deck, wheel arches about 1.4 m wide, the tall
        sloped-sided crew superstructure (roof about 1.83 m) with a sloped
        windscreen and vision slits, the low BPU-1 turret on its rear half,
        a lower rear engine deck, ribbed step plates low on the side, two
        small belly wheels between the axles.
   Published figures used (Wikipedia infoboxes, the game's own rows):
     BRDM-1: 5.70 x 2.25 x 1.9 m, wheelbase 2.8 m, ground clearance 0.315 m
     BRDM-2: 5.75 x 2.35 x 2.31 m, wheelbase 3.1 m, ground clearance 0.43 m
   NOT CONFIRMED from references and therefore approximated: which of the two
   BPU-1 guns sits on which side (KPVT left, PKT right here); the exact tyre
   diameter (about 1.04 m / 1.0 m from the photographs); the pintle-gun fit
   is the one in the BRDM-1 photograph.  Not drawn: antennas, trim vane,
   unditching log, stowage, markings (photos disagree or show later fits).
   BRDM-2 later-era rows share the one model.

   Nodes: "turret" (BRDM-1 pintle gun, BRDM-2 BPU-1; none on the 9P110,
   turret:false), four "roadwheel" groups (axle on local Y).  Team material
   is exactly C.team, a plate on the rear deck.  Model space +X nose, +Y left,
   +Z up, tyres on 0.  ASCII only.                                          */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBrdm = (function () {
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

  /* ---- a tyre as soup: axle on local Y, lugged tread, dished rim, hub cap ---- */
  function wheelSoup(THREE, V, r, w, N) {
    var B = new Baker(THREE), hw = w / 2, i, j, o = [0, 0, 0];
    /* [radius fraction, y, colour, lug flag] */
    var prof = [[0.16, -hw * 0.82, K.rim, 0], [0.50, -hw * 0.82, K.rim, 0], [0.60, -hw * 0.98, K.rub, 0],
                [0.80, -hw, K.rub, 0], [0.94, -hw * 0.90, K.rub, 0], [1, -hw * 0.62, K.rub, 1],
                [1, hw * 0.62, K.rub, 1], [0.94, hw * 0.90, K.rub, 0], [0.80, hw, K.rub, 0],
                [0.60, hw * 0.98, K.rub, 0], [0.50, hw * 0.82, K.rim, 0], [0.16, hw * 0.82, K.rim, 0]];
    function P(rr, y, a) { return [rr * Math.cos(a), y, rr * Math.sin(a)]; }
    for (i = 0; i < N; i++) {
      var a0 = i / N * 6.28319, a1 = (i + 1) / N * 6.28319, lug = (i & 1) ? 0.955 : 1;
      for (j = 0; j + 1 < prof.length; j++) {
        var p = prof[j], q = prof[j + 1];
        var rp = p[0] * r * (p[3] ? lug : 1), rq = q[0] * r * (q[3] ? lug : 1);
        B.quad(V, P(rp, p[1], a0), P(rp, p[1], a1), P(rq, q[1], a1), P(rq, q[1], a0), o, q[2]);
      }
    }
    B.cyl(V, 0.15 * r, hw * 0.5, 12, 0, -hw * 0.82 - hw * 0.12, 0, "y", K.dk);
    B.cyl(V, 0.15 * r, hw * 0.5, 12, 0, hw * 0.82 + hw * 0.12, 0, "y", K.dk);
    return B.by[0];
  }
  function soupGeo(THREE, S) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(S.P), 3));
    g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(S.N), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(S.C), 3));
    g.computeBoundingSphere(); return g;
  }

  /* hull cross-section at x: bottom half-width hb at zb, chine to the side
     (hw) at zs, side up to zu, top corner hwt at zt */
  function ring(x, hb, zb, hw, zs, zu, hwt, zt) {
    return [[x, -hb, zb], [x, hb, zb], [x, hw, zs], [x, hw, zu], [x, hwt, zt], [x, -hwt, zt], [x, -hw, zu], [x, -hw, zs]];
  }
  /* station [x, w, zb, zt] -> ring */
  function sring(s) {
    var w = s[1], zb = s[2], zt = s[3], hb = Math.max(0.3, w - 0.5), zs = Math.min(zb + 0.13, zt - 0.06);
    return ring(s[0], hb, zb, w, zs, zt, w, zt);
  }
  /* arc of the wheel-arch cut: from angle a0 to a1 (degrees) about (xc,zc) */
  function arch(xc, zc, r, a0, a1, n) {
    var o = [], i;
    for (i = 0; i <= n; i++) { var a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; o.push([xc + r * Math.cos(a), zc + r * Math.sin(a)]); }
    return o;
  }
  function circ(z, rx, ry, cx, n) {
    var o = [], k;
    for (k = 0; k < n; k++) { var a = (k + 0.5) * 2 * Math.PI / n; o.push([cx + rx * Math.cos(a), ry * Math.sin(a), z]); }
    return o;
  }

  /* the hull: five core segments (wide, wheel-well, wide, wheel-well, wide)
     with a thin ceiling over each well, and a slab side plate on each flank
     cut out with the wheel arches (so the arches have real depth). */
  function buildHull(B, P, d) {
    var segs = d.segs, i, s;
    for (i = 0; i < segs.length; i++) B.loft(P, segs[i].map(sring), true, true);
    for (i = 0; i < d.ceil.length; i++) {
      var c = d.ceil[i], rs = c.map(function (e) { return ring(e[0], e[1], e[2], e[1], e[2], e[3], e[1], e[3]); });
      B.loft(P, rs, true, true);
    }
    for (s = -1; s <= 1; s += 2) B.plate(P, d.poly, s * d.yin, s * d.yout);
  }

  /* wheels common to every variant */
  function addWheels(THREE, g, B, V, R, W, WY, axles, bellyX, bellyR, bellyZ) {
    var S = wheelSoup(THREE, V, R, W, 36), geo = soupGeo(THREE, S), i, s;
    for (i = 0; i < axles.length; i++) for (s = -1; s <= 1; s += 2) {
      var w = new THREE.Group(); w.name = "roadwheel"; w.position.set(axles[i], s * WY, R);
      var m = new THREE.Mesh(geo, V); m.castShadow = true; m.receiveShadow = true; w.add(m); g.add(w);
    }
    /* belly wheels, retracted: static, hung just under the sill */
    var SB = wheelSoup(THREE, V, bellyR, W * 0.8, 24);
    for (i = 0; i < bellyX.length; i++) for (s = -1; s <= 1; s += 2) B.addSoup(V, SB, bellyX[i], s * (WY - 0.12), bellyZ);
  }

  /* side step ribs low on the flanks (both photographs), x ranges at z */
  function ribs(B, P, yo, list) {
    var i, s;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < list.length; i++)
      B.box(P, list[i][0], list[i][1], s > 0 ? yo : -yo - 0.02, s > 0 ? yo + 0.02 : -yo, list[i][2], list[i][2] + 0.035);
  }

  /* ================================================================= BRDM-1 */
  var DECK1 = [[2.85, 1.36], [2.55, 1.394], [2.06, 1.438], [0.64, 1.56], [0.2, 1.60], [-0.1, 1.60], [-0.74, 1.568], [-1.7, 1.52], [-2.16, 1.516], [-2.85, 1.50]];
  function deck1(x) {
    for (var i = 0; i + 1 < DECK1.length; i++) if (x <= DECK1[i][0] && x >= DECK1[i + 1][0]) {
      var a = DECK1[i], b = DECK1[i + 1], t = (a[0] - x) / (a[0] - b[0]); return a[1] + (b[1] - a[1]) * t;
    }
    return 1.5;
  }
  function hull1(B, P) {
    var W = 1.05, N = 0.68, XF = 1.35, XR = -1.45, R = 0.70, ZC = 0.52, SILL = 0.47, i;
    var d = deck1, segs = [
      [[2.85, W, 1.30, d(2.85)], [2.62, W, 1.05, d(2.62)], [2.40, W, 0.80, d(2.40)], [2.06, W, 0.47, d(2.06)]],
      [[2.05, N, 0.43, d(2.05) - 0.08], [XF - R + 0.01, N, 0.43, d(XF - R) - 0.08]],
      [[0.64, W, 0.43, d(0.64)], [0.2, W, 0.43, d(0.2)], [-0.1, W, 0.43, d(-0.1)], [-0.74, W, 0.43, d(-0.74)]],
      [[-0.76, N, 0.43, d(-0.76) - 0.08], [-2.14, N, 0.43, d(-2.14) - 0.08]],
      [[-2.16, W, 0.47, d(-2.16)], [-2.55, W, 0.77, d(-2.55)], [-2.85, W, 0.90, d(-2.85)]]];
    var ceil = [[[2.05, W, d(2.05) - 0.08, d(2.05)], [XF - R, W, d(XF - R) - 0.08, d(XF - R)]],
                [[-0.76, W, d(-0.76) - 0.08, d(-0.76)], [XR - R, W, d(XR - R) - 0.08, d(XR - R)]]];
    /* the side plate outline, bottom edge rear to front, then the deck back */
    var poly = [[-2.85, 0.90], [-2.55, 0.77], [-2.15, SILL]];
    poly = poly.concat(arch(XR, ZC, R, 184.1, -4.1, 14)).concat([[-0.75, SILL]]);
    poly = poly.concat(arch(XF, ZC, R, 184.1, -4.1, 14)).concat([[2.06, SILL], [2.40, 0.80], [2.62, 1.05], [2.85, 1.36]]);
    for (i = 1; i < DECK1.length; i++) poly.push(DECK1[i]);
    poly.push([-2.85, 1.50]);
    poly.pop();
    poly.push(DECK1[DECK1.length - 1]);
    buildHull(B, P, { segs: segs, ceil: ceil, poly: poly, yin: 1.05, yout: 1.10 });
    return W;
  }

  function brdm1Body(THREE, g, T, B, kind) {
    var P = T.paint, V = T.vc, i, s;
    hull1(B, P);
    /* ribbed step plates, low on the flank */
    ribs(B, P, 1.10, [[-1.03, 0.51, 0.76], [0.04, 0.51, 0.55], [-1.03, -0.52, 0.55]]);
    /* bow: lamp pods on posts with guard hoops, bow post */
    for (s = -1; s <= 1; s += 2) {
      B.box(P, 2.42, 2.52, s * 0.88 - 0.05, s * 0.88 + 0.05, 1.38, 1.52);
      B.cyl(V, 0.095, 0.20, 12, 2.50, s * 0.88, 1.62, "x", K.lamp);
      B.cyl(V, 0.105, 0.05, 12, 2.38, s * 0.88, 1.62, "x", K.dk);
      B.box(V, 2.58, 2.62, s * 0.88 - 0.12, s * 0.88 - 0.10, 1.52, 1.74, K.dk);
      B.box(V, 2.58, 2.62, s * 0.88 + 0.10, s * 0.88 + 0.12, 1.52, 1.74, K.dk);
      B.box(V, 2.58, 2.62, s * 0.88 - 0.12, s * 0.88 + 0.12, 1.72, 1.74, K.dk);
    }
    B.cyl(V, 0.065, 0.14, 10, 1.95, 0.05, 1.46, "z", K.dk);
    B.cyl(V, 0.09, 0.03, 10, 1.95, 0.05, 1.53, "z", K.dk);
    /* louvre fins either side of the front deck, towards the cabin */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 7; i++) {
      var fx = 0.30 + i * 0.145, fz = deck1(fx);
      B.box(V, fx, fx + 0.07, s * 0.80 - 0.19, s * 0.80 + 0.19, fz, fz + 0.065, K.dgr);
    }
    /* engine and filler covers on the front deck */
    B.cyl(V, 0.17, 0.03, 14, 1.35, -0.45, deck1(1.35) + 0.015, "z", K.dgr);
    B.cyl(V, 0.12, 0.03, 12, 1.35, 0.55, deck1(1.35) + 0.015, "z", K.dgr);
    if (kind === "td") {
      /* 9P110: flat-roofed box over the rear compartment, roof hatches, vent stack */
      B.frustum(P, -2.75, 0.20, 1.00, 1.50, -2.60, 0.0, 0.86, 1.86);
      B.box(V, 0.04, 0.12, -0.50, -0.15, 1.58, 1.80, K.glass);            /* front vision slits */
      B.box(V, 0.04, 0.12, 0.15, 0.50, 1.58, 1.80, K.glass);
      B.box(V, -0.80, -0.25, 0.10, 0.58, 1.86, 1.90, K.dgr);              /* roof hatch lids */
      B.box(V, -1.50, -0.95, 0.10, 0.58, 1.86, 1.90, K.dgr);
      B.box(V, -2.45, -1.65, -0.58, 0.58, 1.86, 1.90, K.dgr);            /* the big roof lid over the launcher */
      B.cyl(V, 0.09, 0.26, 12, -0.45, -0.32, 2.00, "z", K.dk);            /* vent / periscope stack */
      B.cyl(V, 0.11, 0.04, 12, -0.45, -0.32, 2.13, "z", K.dk);
      for (s = -1; s <= 1; s += 2) {
        B.box(V, -0.9, -0.55, s * 0.945 - 0.01, s * 0.945 + 0.01, 1.62, 1.74, K.glass);   /* side vision block */
      }
    } else {
      /* cabin box: sloped faces, roof hatches, vision blocks */
      B.frustum(P, -1.72, 0.05, 0.98, 1.50, -1.55, -0.03, 0.80, 1.92);
      B.box(V, -0.20, -0.04, -0.45, -0.12, 1.62, 1.78, K.glass);          /* front vision slits */
      B.box(V, -0.20, -0.04, 0.12, 0.45, 1.62, 1.78, K.glass);
      B.cyl(V, 0.19, 0.04, 14, -0.45, 0.30, 1.94, "z", K.dgr);            /* roof hatch rings */
      B.cyl(V, 0.19, 0.04, 14, -0.45, -0.30, 1.94, "z", K.dgr);
      B.box(V, -1.45, -0.85, -0.40, 0.40, 1.92, 1.96, K.dgr);             /* rear roof lid */
      for (s = -1; s <= 1; s += 2) {
        B.cyl(V, 0.075, 0.03, 10, -0.40, s * 0.93, 1.70, "y", K.glass);   /* round vision ports */
        B.cyl(V, 0.075, 0.03, 10, -1.05, s * 0.93, 1.70, "y", K.glass);
      }
      B.cyl(V, 0.17, 0.20, 14, -1.82, -0.55, 1.74, "y", K.dgr);           /* drum on the rear deck, right side photographed */
    }
    /* team plate on the rear deck */
    B.box(T.team, -2.55, -2.2, -0.32, 0.32, 1.50, 1.53);
  }

  function buildBrdm1(THREE, M, C, kind) {
    var T = makeMats(THREE, C), g = new THREE.Group(), B = new Baker(THREE), V = T.vc;
    g.name = kind === "td" ? "ru_9p110" : "ru_brdm1";
    brdm1Body(THREE, g, T, B, kind);
    addWheels(THREE, g, B, V, 0.52, 0.30, 0.93, [1.35, -1.45], [0.04, -0.77], 0.30, 0.50);
    B.flush(g);
    if (kind !== "td") {
      /* pedestal-mounted SGMB 7.62 mm ahead of the cabin: the node render3d trains */
      var tg = new THREE.Group(), TB = new Baker(THREE);
      tg.name = "turret"; tg.position.set(0.45, 0, 1.62);
      TB.cyl(V, 0.05, 0.46, 10, 0, 0, 0.23, "z", K.dk);
      TB.box(V, -0.08, 0.08, -0.10, 0.10, 0.46, 0.55, K.dk);
      TB.box(V, -0.28, 0.20, -0.05, 0.05, 0.55, 0.67, K.blk);
      TB.cyl(V, 0.032, 0.36, 10, 0.38, 0, 0.63, "x", K.dk);
      TB.cyl(V, 0.015, 0.34, 8, 0.70, 0, 0.63, "x", K.blk);
      TB.box(V, -0.40, -0.28, -0.05, 0.05, 0.59, 0.65, K.dk);
      TB.box(V, -0.10, 0.10, -0.04, 0.04, 0.67, 0.76, K.dk);
      TB.flush(tg); g.add(tg);
    }
    return g;
  }

  /* ================================================================= BRDM-2 */
  function hull2(B, P) {
    var W = 1.105, N = 0.70, XF = 1.50, XR = -1.60, R = 0.72, ZC = 0.50, ZT = 1.38, ZW = 1.30, i;
    var segs = [
      [[2.875, W, 1.32, ZT], [2.70, W, 1.05, ZT], [2.50, W, 0.78, ZT], [2.23, W, 0.50, ZT]],
      [[2.22, N, 0.43, ZW], [XF - R + 0.01, N, 0.43, ZW]],
      [[0.77, W, 0.43, ZT], [-0.87, W, 0.43, ZT]],
      [[-0.88, N, 0.43, ZW], [XR - R + 0.01, N, 0.43, ZW]],
      [[-2.33, W, 0.50, ZT], [-2.70, W, 0.72, ZT], [-2.875, W, 0.95, ZT]]];
    var ceil = [[[2.23, W, ZW, ZT], [XF - R, W, ZW, ZT]], [[XR + R, W, ZW, ZT], [XR - R, W, ZW, ZT]]];
    var poly = [[-2.875, 0.95], [-2.70, 0.72], [XR - R, ZC]];
    poly = poly.concat(arch(XR, ZC, R, 180, 0, 16)).concat([[XF - R, ZC]]);
    poly = poly.concat(arch(XF, ZC, R, 180, 0, 16)).concat([[2.50, 0.78], [2.70, 1.05], [2.875, 1.38], [-2.875, 1.38]]);
    buildHull(B, P, { segs: segs, ceil: ceil, poly: poly, yin: 1.105, yout: 1.155 });
  }

  function buildBrdm2(THREE, M, C) {
    var T = makeMats(THREE, C), g = new THREE.Group(), B = new Baker(THREE), P = T.paint, V = T.vc, i, s;
    g.name = "ru_brdm2";
    hull2(B, P);
    ribs(B, P, 1.155, [[-0.70, 0.48, 0.66], [-0.05, 0.48, 0.55], [-0.70, -0.20, 0.55]]);
    /* bow: bumper bar across the nose, lamp cages on the deck, two deck hatches */
    B.box(V, 2.71, 2.79, -1.05, 1.05, 0.98, 1.18, K.dgr);
    for (s = -1; s <= 1; s += 2) {
      B.box(P, 2.40, 2.52, s * 0.80 - 0.05, s * 0.80 + 0.05, 1.38, 1.50);
      B.cyl(V, 0.09, 0.18, 12, 2.50, s * 0.80, 1.60, "x", K.lamp);
      B.cyl(V, 0.10, 0.04, 12, 2.39, s * 0.80, 1.60, "x", K.dk);
      B.box(V, 2.58, 2.61, s * 0.80 - 0.12, s * 0.80 - 0.10, 1.50, 1.72, K.dk);
      B.box(V, 2.58, 2.61, s * 0.80 + 0.10, s * 0.80 + 0.12, 1.50, 1.72, K.dk);
      B.box(V, 2.58, 2.61, s * 0.80 - 0.12, s * 0.80 + 0.12, 1.70, 1.72, K.dk);
    }
    B.cyl(V, 0.15, 0.03, 14, 2.15, -0.40, 1.395, "z", K.dgr);
    B.cyl(V, 0.10, 0.03, 12, 2.15, 0.40, 1.395, "z", K.dgr);
    /* crew superstructure: sloped front, sloped sides, sloped rear */
    B.frustum(P, -1.75, 2.05, 1.00, 1.38, -0.80, 1.62, 0.80, 1.83);
    /* windscreen vision slits on the sloped front, side vision blocks */
    for (s = -1; s <= 1; s += 2) {
      B.quad(V, [1.915, s * 0.14, 1.55], [1.915, s * 0.62, 1.55], [1.80, s * 0.62, 1.67], [1.80, s * 0.14, 1.67], [0.5, 0, 1.2], K.glass);
      B.box(V, 0.85, 1.05, s * 0.935 - 0.012 + (s > 0 ? 0 : 0), s * 0.935 + 0.012, 1.62, 1.72, K.glass);
      B.box(V, 0.50, 0.66, s * 0.945 - 0.012, s * 0.945 + 0.012, 1.58, 1.64, K.glass);
      B.box(V, 0.10, 0.26, s * 0.955 - 0.012, s * 0.955 + 0.012, 1.58, 1.64, K.glass);
      B.cyl(V, 0.2, 0.05, 16, 1.10, s * 0.42, 1.855, "z", K.dgr);        /* driver and commander roof hatches */
      B.cyl(V, 0.10, 0.03, 12, 1.10, s * 0.42, 1.89, "z", K.dk);
    }
    /* rear engine deck: louvre grilles */
    B.box(V, -2.55, -1.95, -0.62, 0.62, 1.38, 1.405, K.dk);
    for (i = 0; i < 5; i++) B.box(V, -2.50 + i * 0.11, -2.45 + i * 0.11, -0.58, 0.58, 1.405, 1.425, K.dgr);
    B.box(T.team, -1.90, -1.60, -0.30, 0.30, 1.38, 1.41);
    addWheels(THREE, g, B, V, 0.50, 0.34, 0.95, [1.50, -1.60], [0.30, -0.52], 0.30, 0.48);
    B.flush(g);
    /* BPU-1 turret on the rear half of the roof: KPVT 14.5 mm and PKT 7.62 mm */
    var tg = new THREE.Group(), TB = new Baker(THREE);
    tg.name = "turret"; tg.position.set(-0.30, 0, 1.83);
    TB.loft(P, [circ(0, 0.62, 0.62, 0, 16), circ(0.15, 0.60, 0.60, 0, 16), circ(0.32, 0.48, 0.48, 0.02, 16), circ(0.36, 0.40, 0.40, 0.02, 16)], true, true);
    TB.box(P, 0.52, 0.72, -0.34, 0.34, 0.10, 0.34);                     /* mantlet */
    TB.cyl(V, 0.052, 0.60, 12, 0.98, 0.10, 0.22, "x", K.dk);            /* KPVT jacket */
    TB.cyl(V, 0.032, 0.80, 10, 1.60, 0.10, 0.22, "x", K.blk);           /* KPVT barrel */
    TB.cyl(V, 0.042, 0.10, 10, 2.05, 0.10, 0.22, "x", K.blk);           /* muzzle brake */
    TB.cyl(V, 0.022, 0.55, 8, 0.98, -0.13, 0.20, "x", K.blk);           /* PKT */
    TB.box(V, -0.25, -0.02, 0.18, 0.40, 0.34, 0.46, K.glass);           /* sight block */
    TB.cyl(V, 0.15, 0.04, 12, -0.20, -0.18, 0.38, "z", K.dgr);          /* turret roof hatch */
    TB.flush(tg); g.add(tg);
    return g;
  }

  return { brdm1: function (t, m, c) { return buildBrdm1(t, m, c, "r"); },
           td: function (t, m, c) { return buildBrdm1(t, m, c, "td"); },
           brdm2: buildBrdm2 };
})();

UNIT_MODELS["pact_e50_recon"] = { len: 5.7, build: HeroRuBrdm.brdm1 };
UNIT_MODELS["pact_e60_tankdestroyer"] = { len: 5.7, build: HeroRuBrdm.td };
["pact_e60_recon", "pact_e80_recon", "pact_e90_recon", "pact_e00_recon", "recon_p"].forEach(function (k) {
  UNIT_MODELS[k] = { len: 5.75, build: HeroRuBrdm.brdm2 };
});
