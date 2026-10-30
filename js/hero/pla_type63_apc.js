/* ========== pla_type63_apc.js - HERO model: Type 63 (YW531) armoured personnel carrier ==========
   pla_e60_ifv   "Type 63 (YW531 / K63) armoured personnel carrier", the PLA's first tracked APC.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_ypr_ref:
     P1  "Type 63 Armored personnel carriers 20251112.jpg" - from the left, near side-on (front
         to the left): the box hull, the upper sides leaning in hard to a flat roof, the
         ribbed stowage bins running the full length over the track, FOUR big rubber-tyred
         dished road wheels evenly spaced, the toothed drive sprocket at the FRONT, the idler
         at the rear, no return rollers, the vertical rear plate with the big door on the
         right and its hinges, the 12.7 mm on the roof's front third.  Wheel spacing read
         through the perspective (the gaps grow evenly toward the camera): an even pitch of
         about 0.99 m, the sprocket and idler 0.85 and 0.75 of a pitch beyond the end wheels.
     P2  "Type 63 APC at the Beijing Military Museum - 1.jpg" - front right 3/4: the steep
         glacis with the trim vane folded flat on it, the twin headlamps in their guards on
         the roof's front edge, the 12.7 mm Type 54 on its pintle, the louvred grille panel on
         the roof, the bins with three ribs, the nose plate's towing eyes.
     P3  "Puckapunyal-YW531-1.jpg" - head-on from the front left: the trim vane's full
         width, the lower nose plate leaning back under it, the headlamps, the sprocket.
   Published (en.wikipedia "Type 63 (armoured personnel carrier)"): 5.476 x 2.978 x 2.58 m
   (to the machine gun), 12.6 t; "driven at the front by a drive sprocket, ... four
   rubber-tyred road wheels, then ... an idler at the rear"; "no return rollers"; "two roof
   hatches and a large rear door"; Type 54 12.7 mm.

   Recognition list (what makes it read at game zoom, and its source):
     1. a plain box with the upper sides leaning in hard to a flat roof - P1, P2
     2. four big tyred road wheels, front sprocket, rear idler, no return rollers - P1
     3. the ribbed bins along the whole fender - P1, P2
     4. the steep glacis with the trim vane lying on it, the headlamps above - P2, P3
     5. the 12.7 mm on its pintle at the roof front - P1, P2
     6. the vertical rear plate with the big door - P1
   Paint: PLA green.  P2 (indoors, lit #6b6f4c) taken to about 0.85 of level -> #525c3a.  P1
   wears museum digital camouflage: not drawn.  No stars or numbers (P2 carries a star).
   NOT CONFIRMED, judgement calls: the hull's heights (deck 1.90 m, bins 0.95-1.25 m, belly
   0.46 m: from the photographs' proportions against the published 2.58 m, no drawing found),
   the upper sides' lean, the wheel size (0.74 m), the pintle's place across the roof, the
   hatch and grille positions.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team): a
   strip on the roof.  Nodes: "turret" (the 12.7 mm on its pintle, trained; origin on the
   socket, gun along +X) and four "roadwheel" groups.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType63Apc = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 531 };
  /* running gear (P1): even pitch 0.99 m, front sprocket, rear idler */
  var TY = 1.24, TW = 0.18;
  var XW = [1.43, 0.44, -0.55, -1.54], ZW = 0.37, RW = 0.37;
  var SPR = { x: 2.27, z: 0.56, r: 0.27 }, IDL = { x: -2.28, z: 0.46, r: 0.28 };
  /* hull: nose and rear plates, belly, bins, roof, roof edge half width, side at the bins */
  var NOSE = 2.74, REAR = -2.74, BELLY = 0.46, BZ0 = 0.95, BZ1 = 1.25, ROOF = 1.90, RW2 = 1.02, SW = 1.40, BW = 1.49;

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  function addHull(B) {
    var s, i, x;
    /* the lower hull between the tracks: belly, the nose plate leaning back (P3), the
       rear plate */
    prismY(B.paint, [[REAR, 0.62], [REAR + 0.18, BELLY], [2.40, BELLY], [NOSE, 1.02], [NOSE, BZ0 + 0.02], [REAR, BZ0 + 0.02]], -1.02, 1.02);
    /* the upper hull: a loft of cross-sections - the bins' level at the side, the sides
       leaning in to the roof (P1, P2); the steep glacis at the front, the vertical rear */
    function sec(x, top, hw, w0) {
      return [[x, -w0, BZ0], [x, w0, BZ0], [x, w0, BZ1], [x, hw, top], [x, -hw, top], [x, -w0, BZ1]];
    }
    loftN(B.paint, [sec(REAR, ROOF - 0.12, RW2 - 0.08, SW), sec(REAR + 0.10, ROOF, RW2, SW),
                    sec(1.55, ROOF, RW2, SW), sec(NOSE, BZ1 + 0.02, RW2 + 0.20, SW)]);
    for (s = -1; s <= 1; s += 2) {
      /* the stowage bins over the track, three ribs, end caps (P1, P2) */
      var yi = s * SW, yo = s * BW, ya = Math.min(yi, yo), yb = Math.max(yi, yo);
      box(B.paint, REAR + 0.05, NOSE - 0.10, ya, yb, BZ0, BZ1);
      for (i = 0; i < 3; i++) {
        var zr = BZ0 + 0.06 + i * 0.09;
        box(B.dark, REAR + 0.08, NOSE - 0.13, s > 0 ? yb : ya - 0.012, s > 0 ? yb + 0.012 : ya, zr, zr + 0.025);
      }
      [-1.40, 0.10, 1.55].forEach(function (bx) { box(B.dark, bx - 0.02, bx + 0.02, s > 0 ? yb : ya - 0.015, s > 0 ? yb + 0.015 : ya, BZ0, BZ1); });
      /* the mudguard turned down over the sprocket at the front */
      belt(B.paint, NOSE - 0.10, BZ0, NOSE + 0.08, BZ0 - 0.22, ya, yb, 0.03);
    }
    /* --- glacis (P2, P3): the trim vane folded flat on it, the twin headlamps in guards
       at the roof's front corners, the towing eyes on the nose plate --- */
    var ang = Math.atan2(ROOF - (BZ1 + 0.02), NOSE - 1.55), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function gz(x) { return ROOF - (x - 1.55) * Math.tan(ang); }
    slab(B.paint, [2.15, 0, gz(2.15) + 0.05], u, [0, 1, 0], w, 0.42, 1.30, 0.03);
    slab(B.dark, [1.76, 0, gz(1.76) + 0.09], u, [0, 1, 0], w, 0.025, 1.28, 0.025);
    for (s = -1; s <= 1; s += 2) {
      var hy = s * 0.80;
      [-0.12, 0.12].forEach(function (dy) {
        cyl(B.paint, [1.48, hy + dy, ROOF + 0.14], [1.62, hy + dy, ROOF + 0.14], 0.075, 0.08, 12);
        cyl(B.dark, [1.62, hy + dy, ROOF + 0.14], [1.63, hy + dy, ROOF + 0.14], 0.068, 0.068, 12);
      });
      box(B.dark, 1.44, 1.48, hy - 0.04, hy + 0.04, ROOF, ROOF + 0.10);
      box(B.dark, 1.66, 1.69, hy - 0.26, hy + 0.26, ROOF + 0.05, ROOF + 0.08);
      box(B.dark, 1.40, 1.69, hy - 0.26, hy - 0.23, ROOF + 0.05, ROOF + 0.08);
      box(B.dark, 1.40, 1.69, hy + 0.23, hy + 0.26, ROOF + 0.05, ROOF + 0.08);
      cyl(B.dark, [NOSE + 0.02, s * 0.55 - 0.07, 0.80], [NOSE + 0.02, s * 0.55 + 0.07, 0.80], 0.055, 0.055, 8);
      box(B.dark, NOSE - 0.12, NOSE, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.75, 0.85);
    }
    /* --- roof: the driver's and commander's hatches up front, the louvred grille panel
       (P2), the two troop hatches behind (published), team strip --- */
    box(B.paint, 0.95, 1.40, 0.25, 0.75, ROOF, ROOF + 0.05);
    cylZ(B.paint, 1.15, 0.50, ROOF + 0.05, ROOF + 0.09, 0.20, 14);
    box(B.paint, 0.60, 1.40, -0.95, -0.25, ROOF, ROOF + 0.03);
    for (i = 0; i < 7; i++) box(B.dark, 0.66 + i * 0.105, 0.70 + i * 0.105, -0.90, -0.30, ROOF + 0.03, ROOF + 0.045);
    [-0.55, -1.55].forEach(function (hx) {
      box(B.paint, hx - 0.40, hx + 0.40, -0.70, 0.70, ROOF, ROOF + 0.04);
      box(B.dark, hx - 0.02, hx + 0.02, -0.68, 0.68, ROOF + 0.04, ROOF + 0.055);
      box(B.dark, hx + 0.30, hx + 0.36, -0.06, 0.06, ROOF + 0.04, ROOF + 0.09);
    });
    box(B.team, -2.40, -2.05, -0.55, 0.55, ROOF, ROOF + 0.015);
    /* the antenna base on the rear left */
    cylZ(B.dark, -2.30, 0.85, ROOF, ROOF + 0.14, 0.05, 8);
    /* --- rear (P1): the big door on the right with its hinges and handle, the lamp --- */
    box(B.paint, REAR - 0.04, REAR, -0.95, 0.05, 0.62, ROOF - 0.20);
    [0.80, 1.40].forEach(function (hz) { box(B.dark, REAR - 0.07, REAR, 0.02, 0.12, hz - 0.05, hz + 0.05); });
    box(B.dark, REAR - 0.08, REAR - 0.04, -0.80, -0.70, 1.10, 1.30);
    box(B.dark, REAR - 0.10, REAR, 0.50, 0.70, 1.50, 1.60);
    for (s = -1; s <= 1; s += 2) box(B.dark, REAR - 0.12, REAR, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.66, 0.76);
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.20); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the toothed drive sprocket at the FRONT (P1, P3) */
      cylY(B.dark, SPR.x, y - 0.12, y + 0.12, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.12, y + s * 0.17, SPR.z, 0.15, 14);
      /* the idler at the rear (P1) */
      cylY(B.paint, IDL.x, y - 0.15, y + 0.15, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.15, y + s * 0.20, IDL.z, 0.07, 10);
    }
  }
  /* road wheel (P1, P2): rubber tyre, a dished disc with six recesses, hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y + 0.15, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.18, 0], RW - 0.055, 0.12, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.20, y + s * 0.168, Math.sin(a) * 0.20], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.06, 0.010, 0.055);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.17, y + s * 0.20, 0, 0.09, 10);
    }
  }

  /* ---------------------------------------------- the 12.7 mm on its pintle */
  /* origin on the socket over the roof; "turret" (trained); the Type 54 (a DShKM) with
     its cradle, ammunition box and the small shield (P1, P2) */
  var MG = { x: 0.95, y: -0.20, z: ROOF + 0.45 };
  function addPintle(B) {
    cylZ(B.paint, MG.x, MG.y, ROOF, ROOF + 0.06, 0.16, 12);
    cylZ(B.dark, MG.x, MG.y, ROOF + 0.06, MG.z - 0.08, 0.04, 8);
  }
  function addMg(B) {
    box(B.dark, -0.10, 0.12, -0.07, 0.07, -0.08, 0.06);
    box(B.dark, -0.42, 0.18, -0.06, 0.06, 0.0, 0.12);
    cyl(B.dark, [0.18, 0, 0.06], [1.28, 0, 0.07], 0.028, 0.026, 8);
    for (var i = 0; i < 4; i++) cyl(B.dark, [0.22 + i * 0.07, 0, 0.06], [0.25 + i * 0.07, 0, 0.06], 0.045, 0.045, 8);
    cyl(B.dark, [1.22, 0, 0.07], [1.34, 0, 0.07], 0.045, 0.045, 8);
    box(B.dark, -0.12, 0.12, 0.07, 0.24, -0.16, 0.02);
    box(B.dark, -0.55, -0.42, -0.04, 0.04, -0.05, 0.05);
    box(B.paint, 0.20, 0.24, -0.30, 0.30, -0.22, 0.20);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB);
    addRunning(HB);
    addPintle(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addMg(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(MG.x, MG.y, MG.z);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e60_ifv"] = { len: 5.69, build: HeroType63Apc.build };
