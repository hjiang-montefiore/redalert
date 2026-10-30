/* ============ ru_zsu.js - HERO models: the Soviet self-propelled AA guns ============
   Two vehicles, one file, both with the gun turret as the trained node:
     pact_e50_spaag   ZSU-57-2 "Sparka"   (in service 1955)  HeroZsu57
     pact_e60_spaag   ZSU-23-4 "Shilka"   (in service 1965)  HeroShilka, at the foot of the file
   Each builder's own header gives its references.  Both redone 2026-10-30.

   ========== HeroZsu57 - ZSU-57-2 "Sparka" (pact_e50_spaag) ==========================
   The twin 57 mm S-68 in a big open-topped turret on a lightened T-54 chassis with four
   road wheels a side.  Drawn under its tarpaulin, as most photographs show it.

   REDO 2026-10-30 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_z57_ref:
     P1  "Latrun 231224 ZSU-57-2.jpg" - from the front right: the turret's walls with their
         heavily rounded top edges under the tarpaulin, the front face leaning back over the
         two big recoil housings, the long barrels with multi-baffle brakes, hand rails on
         the roof, the T-54 hull, fenders and curved front mudguards.
     P2  "ZSU-57-2 02.JPG" - from the rear left: the wire basket for spent cases hung on the
         turret rear, the T-54 rear plate, the starfish wheels.
     P3  "Parola Tank Museum 078 - ZSU 57-2 (37853491974).jpg" - head-on from the front
         left: the turret nearly the hull's width, the two housings close together under
         the leaning front face, the brakes.
     P4  "ZSU-57-2 MWP 03.jpg" - from the rear left, near side-on: FOUR starfish road
         wheels with rubber tyres at about 1.05 m (scaled off the 830 mm wheel), the rear
         sprocket with its lantern rings, the basket, the fender boxes.
     P5  "ZSU-57-2 01.JPG", "ZSU-57-2 03.JPG", "ZSU-57-2 Hun 2010 02.jpg" - a line and a
         single vehicle from the front left: the guns raised, the tarpaulin, the antenna.
   Published (en.wikipedia ZSU-57-2 infobox and text): hull 6.22 m, 8.46 m with the guns
   forward, width 3.27 m, height 2.71 m (2.75 m with the tarpaulin), clearance 425 mm,
   28.1 t; a modified T-54 chassis with four twin rubber-tyred road wheels a side instead
   of five and thinner armour; rear drive sprocket with lantern rings; empty cases go by
   conveyor through a port in the turret rear into "an external metal wire basket on the
   back of the turret"; 2 x 57 mm S-68 (L/76.6).
   The hull, fenders, fender stowage and running gear are the T-54A's as measured for
   js/hero/ru_t54.js (deck 1.42 m, fender 1.08 m, 830 mm wheels, idler and sprocket), with
   four wheels in place of five.

   CORRECTIONS against the previous model (the references do not support it):
   - the hull was drawn about 0.9 m high, a third under the T-54's 1.42 m deck it is (P1, P4);
   - the turret was an upright box with a dark open top; P1-P5 show near-vertical walls
     with heavily rounded top edges, the front face leaning back to the gun housings, and
     the tarpaulin over the top;
   - the wire case basket on the turret rear, the gun recoil housings, the multi-baffle
     brakes, the T-54 fender stowage and mudguards were all missing.

   Recognition list (what makes it read at game zoom, and its source):
     1. four big starfish road wheels with wide gaps, rear sprocket - P4
     2. the big turret, nearly hull width, rounded top edges, tarpaulin top - P1, P3
     3. the twin long 57 mm barrels with fat multi-baffle brakes, close together - P1, P3
     4. the two big recoil housings under the leaning front face - P1, P3
     5. the wire basket on the turret rear - P2, P4
     6. the T-54 hull: rounded nose, fender shelf, curved front mudguards - P1
   Paint: Soviet green, as the T-54A benchmark (P2/P5 museum green).  No numbers or
   markings (P5 carries "122" and badges: not drawn).
   NOT CONFIRMED, drawn as judgement calls: the wheel pitch (1.10 m kept from the old
   model, against 1.05 m measured off a 3/4 view); the turret's plan length; the basket's
   size; the gun elevation (20 degrees, a choice); the tarpaulin's sag; the fender boxes
   (the T-54A's).

   Materials: PAINT, DARK, CANVAS, WHEEL (as ru_t54.js), MESH (the basket's mesh,
   translucent) and the team colour (C.team): the T-54's deck strips and one on the
   tarpaulin.  Nodes: "turret" (trains), four "roadwheel" groups.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZsu57 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: { base: "#4c5636", blots: ["#434c2f", "#56603f"], seed: 572 }, canvas: "#4f5440",
         el: 20, muz: 4.30, drums: 0 }
  };

  /* the T-54A's running gear and hull (ru_t54.js), FOUR road wheels (P4) */
  var TY = 1.32, TW = 0.29;
  var XW = [1.45, 0.35, -0.75, -1.85], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.62, z: 0.56, r: 0.29 }, SPR = { x: -2.68, z: 0.66, r: 0.30 };
  var DECK = 1.42, FZ = 1.08, FW = 1.635, HW = 1.00, TX = 0.10;

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
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
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through rings of [x, y, z] points (same count, each convex); ends capped */
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
  /* a box with rounded top edges along X (the fender fuel tanks, P2 P6): x0..x1, y0..y1, z0..z1 */
  function roundBox(bin, x0, x1, y0, y1, z0, z1, r) {
    var R = [], a, yc0 = y0 + r, yc1 = y1 - r, zc = z1 - r;
    /* ring order: bottom left, bottom right, right side up over the top to the left side */
    var Q = [[y0, z0], [y1, z0]], k;
    for (k = 0; k <= 3; k++) { a = k / 3 * Math.PI / 2; Q.push([yc1 + Math.cos(a) * r, zc + Math.sin(a) * r]); }
    for (k = 0; k <= 3; k++) { a = Math.PI / 2 + k / 3 * Math.PI / 2; Q.push([yc0 + Math.cos(a) * r, zc + Math.sin(a) * r]); }
    R.push(Q.map(function (p) { return [x0, p[0], p[1]]; }));
    R.push(Q.map(function (p) { return [x1, p[0], p[1]]; }));
    loftN(bin, R);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling of the brushed
     4BO green, weld seams with their bead highlight, rain streaks and grime (P2, P3, P5) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and chipped wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  /* the canvas mantlet cover (P2, P4, P5): olive duck, darker folds and seams; tile 1 m */
  function canvasCover(THREE, base) {
    return canvasTex(THREE, "c" + base, 128, function (q, S) {
      var R = rng(137), i;
      q.fillStyle = base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 18; i++) { q.fillStyle = "rgba(15,16,10," + (0.12 + R() * 0.2) + ")"; q.fillRect(R() * S, R() * S, 2 + R() * 5, 20 + R() * 60); }
      for (i = 0; i < 14; i++) { q.fillStyle = "rgba(230,225,200,0.07)"; q.fillRect(R() * S, R() * S, 3 + R() * 8, 18 + R() * 50); }
      q.fillStyle = "rgba(10,10,6,0.35)"; q.fillRect(0, S / 2, S, 2);
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), tc = canvasCover(THREE, V.canvas);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.canvas = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.97, metalness: 0.0 });
    if (tc) T.canvas.map = tc; else T.canvas.color.set(V.canvas);
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), canvas: new Bin(T.canvas, true, false, 1.0),
             team: new Bin(T.team, false) };
  }
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
  /* station table, measured off D1 (scale from the 830 mm road wheel) and P1:
     x, belly half width, belly z, side half width, roof z.  The hull sides are vertical from
     the belly to the deck at 1.42 m; the rear plate leans in at the foot; the upper glacis
     falls at 30 deg to the rounded nose at about 0.76 m, the lower glacis runs back at 35 deg
     to the belly by x = 2.58 (P2, P6). */
  var HS = [
    [-3.00, 0.95, 0.66, 0.99, 1.24],
    [-2.99, 0.96, 0.57, 1.00, 1.33],
    [-2.96, 0.97, 0.50, 1.00, 1.39],
    [-2.90, 0.98, 0.455, 1.00, 1.42],
    [-2.75, 0.98, 0.425, 1.00, 1.42],
    [-1.60, 0.98, 0.425, 1.00, 1.42],
    [-0.40, 0.98, 0.425, 1.00, 1.42],
    [ 0.80, 0.98, 0.425, 1.00, 1.42],
    [ 1.93, 0.98, 0.425, 1.00, 1.42],
    [ 2.20, 0.98, 0.425, 1.00, 1.264],
    [ 2.45, 0.98, 0.425, 1.00, 1.12],
    [ 2.60, 0.98, 0.44, 1.00, 1.033],
    [ 2.75, 0.975, 0.545, 0.995, 0.946],
    [ 2.87, 0.97, 0.625, 0.99, 0.876],
    [ 2.95, 0.965, 0.685, 0.985, 0.825],
    [ 3.00, 0.96, 0.725, 0.98, 0.79],
    [ 3.03, 0.955, 0.752, 0.975, 0.768]
  ];
  function glacisZ(x) { return x <= 1.93 ? DECK : DECK - 0.577 * (x - 1.93); }
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }

  function addHull(B, V) {
    var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, p, s, x, n = R[0].length;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    for (k = 1; k + 1 < n; k++) {
      triN(B.paint, R[0][0], R[0][k], R[0][k + 1], [-1, 0, 0]);
      triN(B.paint, R[R.length - 1][0], R[R.length - 1][k], R[R.length - 1][k + 1], [1, 0, 0]);
    }
    /* the rounded nose: a fat round bar where the two glacis plates meet (P2, P6) */
    cyl(B.paint, [2.995, 0.95, 0.77], [2.995, -0.95, 0.77], 0.045, 0.045, 10);

    for (p = -1; p <= 1; p += 2) {
      var yi = p * HW, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf low over the track run (D1, P1, P3), its turned-down outer lip */
      box(B.paint, -2.98, 2.30, ylo, yhi, FZ - 0.03, FZ);
      box(B.paint, -2.98, 2.30, p > 0 ? FW - 0.025 : -FW, p > 0 ? FW : -FW + 0.025, FZ - 0.08, FZ + 0.01);
      /* the big curved front mudguard over the idler (P2, P4, P6) */
      /* a quarter ellipse from the shelf to the nose, clear of the track round the idler */
      var MG = [];
      for (i = 0; i <= 8; i++) { var tt = i / 8 * Math.PI / 2; MG.push([2.15 + 0.93 * Math.sin(tt), FZ + 0.03 - 0.55 * (1 - Math.cos(tt))]); }
      for (i = 0; i + 1 < MG.length; i++) {
        belt(B.paint, MG[i][0], MG[i][1], MG[i + 1][0], MG[i + 1][1], ylo, yhi, 0.035);
        /* the deep turned-down outer lip and the inner one against the hull (P4) */
        belt(B.paint, MG[i][0], MG[i][1] - 0.07, MG[i + 1][0], MG[i + 1][1] - 0.07, p > 0 ? FW - 0.03 : -FW - 0.01, p > 0 ? FW + 0.01 : -FW + 0.03, 0.17);
        belt(B.paint, MG[i][0], MG[i][1] - 0.04, MG[i + 1][0], MG[i + 1][1] - 0.04, p > 0 ? HW + 0.02 : -HW - 0.05, p > 0 ? HW + 0.05 : -HW - 0.02, 0.10);
      }
      /* its stiffening ribs (P2) */
      for (i = 0; i < 2; i++) {
        var yr = p * (1.22 + i * 0.22);
        for (k = 2; k + 1 < MG.length; k++) belt(B.paint, MG[k][0], MG[k][1] + 0.02, MG[k + 1][0], MG[k + 1][1] + 0.02, yr - 0.015, yr + 0.015, 0.03);
      }
      /* rear fender end, turned down, and the mud flap */
      belt(B.paint, -2.98, FZ, -3.08, FZ - 0.16, ylo, yhi, 0.03);
      /* hull side above the shelf: the joint strip */
      box(B.dark, -2.95, 1.93, p > 0 ? HW : -HW - 0.012, p > 0 ? HW + 0.012 : -HW, FZ, FZ + 0.02);
    }

    /* --- glacis -------------------------------------------------------------- */
    var ang = Math.atan(0.577), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    /* the welded joint of the glacis to the deck and the bow MG's small port, right (ru.wiki) */
    slab(B.dark, [1.95, 0, glacisZ(1.95) + 0.004], u, [0, 1, 0], w, 0.012, 0.97, 0.006);
    cyl(B.dark, [2.30, -0.38, glacisZ(2.30) + 0.0], [2.33, -0.38, glacisZ(2.33) + 0.05], 0.035, 0.035, 8);
    /* two towing hooks and the lifting eyes on the nose (P6) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 2.98, 3.10, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.70, 0.80);
      box(B.dark, 3.06, 3.12, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.62, 0.72);
      slab(B.dark, [2.55, s * 0.80, glacisZ(2.55) + 0.04], u, [0, 1, 0], w, 0.05, 0.015, 0.04);
    }
    /* driver's hatch front left with its two periscopes (P6), the hull-roof joint */
    cylZ(B.paint, 1.62, 0.52, DECK, DECK + 0.06, 0.26, 18);
    cylZ(B.paint, 1.62, 0.52, DECK + 0.06, DECK + 0.08, 0.20, 14);
    box(B.dark, 1.86, 1.94, 0.38, 0.48, DECK, DECK + 0.07);
    box(B.dark, 1.86, 1.94, 0.56, 0.66, DECK, DECK + 0.07);
    /* the headlamp in its guard on the right front (P2, P6) */
    cyl(B.paint, [2.06, -1.22, FZ + 0.17], [2.20, -1.22, FZ + 0.17], 0.095, 0.10, 14);
    cyl(B.dark, [2.20, -1.22, FZ + 0.17], [2.215, -1.22, FZ + 0.17], 0.085, 0.085, 14);
    box(B.paint, 2.08, 2.14, -1.25, -1.19, FZ, FZ + 0.08);
    /* its guard: a bent bar frame ahead of the lamp */
    box(B.dark, 2.26, 2.29, -1.38, -1.35, FZ, FZ + 0.30);
    box(B.dark, 2.26, 2.29, -1.09, -1.06, FZ, FZ + 0.30);
    box(B.dark, 2.26, 2.29, -1.38, -1.06, FZ + 0.27, FZ + 0.30);
    box(B.dark, 2.02, 2.29, -1.38, -1.35, FZ + 0.27, FZ + 0.30);
    box(B.dark, 2.02, 2.29, -1.09, -1.06, FZ + 0.27, FZ + 0.30);

    /* --- fender stowage --------------------------------------------------------
       right (P2, P6): three box fuel tanks at the front, two ZIP boxes behind;
       left (P1): long ZIP boxes, the oil tank, the exhaust outlet over the rear */
    var yI = HW + 0.05, yO = FW - 0.06;
    for (i = 0; i < 3; i++) {
      x = 2.02 - i * 0.58;
      roundBox(B.paint, x - 0.54, x, -yO, -yI, FZ, FZ + 0.36, 0.07);
      box(B.dark, x - 0.56, x - 0.54, -yO, -yI, FZ, FZ + 0.30);
      cylZ(B.dark, x - 0.12, -1.30, FZ + 0.36, FZ + 0.40, 0.04, 8);
    }
    box(B.paint, -1.10, 0.20, -yO, -yI, FZ, FZ + 0.30);
    box(B.dark, -0.47, -0.43, -yO - 0.005, -yI, FZ + 0.08, FZ + 0.24);
    box(B.paint, -2.70, -1.30, -yO, -yI, FZ, FZ + 0.27);
    box(B.team, -2.30, -1.70, -1.42, -1.22, FZ + 0.27, FZ + 0.29);
    box(B.paint, 0.40, 2.05, yI, yO, FZ, FZ + 0.30);
    box(B.dark, 1.20, 1.24, yO, yO + 0.005, FZ + 0.08, FZ + 0.22);
    roundBox(B.paint, -0.30, 0.30, yI, yO, FZ, FZ + 0.34, 0.08);
    box(B.paint, -1.65, -0.45, yI, yO, FZ, FZ + 0.28);
    box(B.dark, -1.08, -1.04, yO, yO + 0.005, FZ + 0.06, FZ + 0.22);
    /* exhaust outlet on the left fender rear (P1) */
    box(B.paint, -2.75, -2.05, yI, yO - 0.10, FZ, FZ + 0.14);
    box(B.dark, -2.70, -2.10, yO - 0.10, yO - 0.06, FZ + 0.02, FZ + 0.12);
    /* box straps */
    [1.70, 0.75].forEach(function (xx) { box(B.dark, xx - 0.025, xx + 0.025, yI - 0.01, yO + 0.01, FZ + 0.30, FZ + 0.315); });

    /* --- engine deck: louvred intake, radiator grille across the rear, access hatch ---- */
    box(B.paint, -1.55, -1.05, -0.70, 0.70, DECK, DECK + 0.05);
    for (i = 0; i < 6; i++) box(B.dark, -1.52 + i * 0.08, -1.48 + i * 0.08, -0.62, 0.62, DECK + 0.05, DECK + 0.06);
    box(B.dark, -2.85, -1.95, -0.85, 0.85, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 7; i++) box(B.paint, -2.82 + i * 0.13, -2.77 + i * 0.13, -0.83, 0.83, DECK + 0.012, DECK + 0.035);
    box(B.paint, -1.88, -1.62, -0.55, 0.55, DECK, DECK + 0.03);
    box(B.team, -1.84, -1.66, -0.25, 0.25, DECK + 0.03, DECK + 0.045);
    /* stern: tow hooks */
    box(B.dark, -3.10, -2.99, 0.62, 0.76, 0.64, 0.76);
    box(B.dark, -3.10, -2.99, -0.76, -0.62, 0.64, 0.76);
    /* the two 200 l drums across the stern on their brackets (D1, P5) */
    for (i = 0; i < V.drums; i++) {
      var dyr = i ? -0.47 : 0.47, dxr = -3.24, dzr = 1.32;
      cylY(B.paint, dxr, dyr - 0.44, dyr + 0.44, dzr, 0.29, 18);
      /* the rolled rims and the two rolling hoops (open bands: the painted ends show) */
      cyl(B.dark, [dxr, dyr - 0.44, dzr], [dxr, dyr - 0.40, dzr], 0.296, 0.296, 18, true);
      cyl(B.dark, [dxr, dyr + 0.40, dzr], [dxr, dyr + 0.44, dzr], 0.296, 0.296, 18, true);
      cyl(B.dark, [dxr, dyr - 0.16, dzr], [dxr, dyr - 0.13, dzr], 0.297, 0.297, 18, true);
      cyl(B.dark, [dxr, dyr + 0.13, dzr], [dxr, dyr + 0.16, dzr], 0.297, 0.297, 18, true);
      cylY(B.dark, dxr, dyr + (dyr > 0 ? 0.44 : -0.46), dyr + (dyr > 0 ? 0.46 : -0.44), dzr + 0.17, 0.035, 8);
      box(B.dark, -3.24, -2.99, dyr - 0.32, dyr - 0.28, 1.00, 1.10);
      box(B.dark, -3.24, -2.99, dyr + 0.28, dyr + 0.32, 1.00, 1.10);
      box(B.dark, -3.26, -3.22, dyr - 0.32, dyr - 0.28, 1.00, 1.62);
      box(B.dark, -3.26, -3.22, dyr + 0.28, dyr + 0.32, 1.00, 1.62);
    }
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.04]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.04]);
    pts = [];
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
    /* the small-link dry-pin track (ru.wiki): 137 mm links, drawn as every other link */
    cnt = Math.round(tot / 0.274); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.06);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link with its grouser, and the centre guide horn standing inside the run (P1) */
        belt(B.dark, px - dx * 0.06, pz - dz * 0.06, px + dx * 0.06, pz + dz * 0.06, y - TW - 0.01, y + TW + 0.01, 0.08);
        belt(B.dark, px - dx * 0.03 - dz * 0.075, pz - dz * 0.03 + dx * 0.075, px + dx * 0.03 - dz * 0.075, pz + dz * 0.03 + dx * 0.075, y - 0.03, y + 0.03, 0.06);
      }
      /* rear drive sprocket with its two toothed rings (P1, P4), front idler */
      cylY(B.dark, SPR.x, y - 0.20, y + 0.20, SPR.z, SPR.r - 0.04, 18);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y - s * 0.12, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y + s * 0.12, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
      }
      cylY(B.paint, SPR.x, y + s * 0.19, y + s * 0.25, SPR.z, 0.19, 14);
      cylY(B.dark, SPR.x, y + s * 0.25, y + s * 0.30, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.21, y + 0.21, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.20, y + s * 0.27, IDL.z, 0.11, 10);
      box(B.dark, IDL.x - 0.32, IDL.x, y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
    }
  }

  /* road wheel (P1, P3): the cast "starfish" pair, rubber tyres, a dished face with eight
     holes between the ribs, and the hub cap */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.25, y - 0.15, 0, RW, 18);
      cylY(W, 0, y + 0.15, y + 0.25, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.34, 16);
      cyl(W, [0, y + s * 0.25, 0], [0, y + s * 0.28, 0], 0.345, 0.20, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.12, 12);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.255, y + s * 0.266, Math.sin(a) * 0.255], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.055, 0.012, 0.045);
      }
      W.col = RIB;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        slab(W, [Math.cos(a) * 0.23, y + s * 0.27, Math.sin(a) * 0.23], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.11, 0.012, 0.018);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.32, 0, 0.055, 8);
    }
  }


  /* --------------------------------------------------------------- turret */
  /* origin on the ring centre at the deck.  The big welded turret (P1-P6): near-vertical
     walls with heavily rounded top edges, the front face leaning back over the two gun
     housings, the top under its tarpaulin, the wire basket for spent cases hung on the
     rear.  Rings of (y, z) across, lofted along x. */
  var TH = 1.22, TF = 1.30, TR = -1.72;
  function ring(x, hw, top, bot) {
    var r = Math.min(0.26, (top - bot) * 0.4), Q = [], k, a;
    Q.push([x, -hw, bot], [x, hw, bot]);
    for (k = 0; k <= 3; k++) { a = k / 3 * Math.PI / 2; Q.push([x, hw - r + Math.cos(a) * r - 0.05 * (1 - Math.cos(a)), top - r + Math.sin(a) * r]); }
    for (k = 0; k <= 3; k++) { a = Math.PI / 2 + k / 3 * Math.PI / 2; Q.push([x, -hw + r + Math.cos(a) * r + 0.05 * (1 + Math.cos(a)), top - r + Math.sin(a) * r]); }
    return Q;
  }
  function addTurret(V, B) {
    var s, i, k;
    /* the shell: the rear wall's rounded foot, the full section, then the front face
       leaning back to the gun housings (P1, P3, P5) */
    loftN(B.paint, [ring(TR - 0.06, 1.30, TH - 0.10, 0.06), ring(TR, 1.38, TH, 0.0), ring(0.70, 1.38, TH, 0.0),
                    ring(1.02, 1.36, TH - 0.28, 0.0), ring(TF, 1.32, 0.62, 0.04)]);
    /* the tarpaulin over the open top: canvas, sagging a little between the hoops (P1, P2) */
    var L = [], R = rng(57);
    [TR + 0.06, -1.0, -0.2, 0.55, 0.95].forEach(function (x, n) {
      var hw = 1.26, top = (n === 4 ? TH - 0.24 : TH) + 0.035, Q = [];
      for (k = 0; k <= 8; k++) {
        var yy = -hw + 2 * hw * k / 8, sag = (n > 0 && n < 4) ? 0.03 * Math.sin(k / 8 * Math.PI) * (0.6 + R() * 0.4) : 0;
        Q.push([x, yy, top - 0.02 - sag + 0.06 * Math.sin(k / 8 * Math.PI)]);
      }
      Q.push([x, hw, top - 0.12], [x, -hw, top - 0.12]);
      L.push(Q);
    });
    loftN(B.canvas, L);
    /* the tarpaulin's tie-down straps over the hoops */
    [-1.0, -0.2, 0.55].forEach(function (x) { box(B.dark, x - 0.03, x + 0.03, -1.30, 1.30, TH - 0.02, TH + 0.10); });
    /* hand rails on the roof edges (P1) and the lifting eyes */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.dark, [-0.40, s * 0.95, TH + 0.10], [0.40, s * 0.95, TH + 0.10], 0.018, 0.018, 6, true);
      cyl(B.dark, [-0.40, s * 0.95, TH], [-0.40, s * 0.95, TH + 0.10], 0.016, 0.016, 6, true);
      cyl(B.dark, [0.40, s * 0.95, TH], [0.40, s * 0.95, TH + 0.10], 0.016, 0.016, 6, true);
      box(B.dark, TR + 0.1, TR + 0.2, s * 1.36 - 0.015, s * 1.36 + 0.015, TH - 0.35, TH - 0.25);
    }
    /* the side vision ports and a weld seam round the walls */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.10, 0.30, s > 0 ? 1.375 : -1.39, s > 0 ? 1.39 : -1.375, 0.80, 0.86);
      box(B.dark, TR + 0.05, 0.70, s > 0 ? 1.378 : -1.388, s > 0 ? 1.388 : -1.378, 0.44, 0.455);
    }
    box(B.team, -1.30, -0.70, -0.55, 0.55, TH + 0.06, TH + 0.075);
    /* the antenna base on the left rear (P3, P6) */
    cylZ(B.dark, TR + 0.35, 1.10, TH - 0.05, TH + 0.12, 0.05, 8);

    /* --- the wire basket for the spent cases on the rear (P2, P4, P6): a frame of angle
       iron with mesh panels, wider at the top --- */
    var x0 = TR - 0.05, x1 = TR - 0.62, zb = 0.40, zt = TH - 0.02, by = 1.05, bars = [];
    function bar(a, b) { cyl(B.dark, a, b, 0.018, 0.018, 4, true); }
    [[x0, -by], [x1, -by], [x1, by], [x0, by]].forEach(function (c, n, A) {
      var d = A[(n + 1) % 4];
      bar([c[0], c[1], zb], [d[0], d[1], zb]); bar([c[0], c[1], zt], [d[0], d[1], zt]);
      bar([c[0], c[1], zb], [c[0], c[1], zt]);
    });
    for (i = 1; i < 7; i++) {
      var yy = -by + 2 * by * i / 7;
      bar([x1, yy, zb], [x1, yy, zt]);
    }
    for (s = -1; s <= 1; s += 2) for (i = 1; i < 3; i++) {
      var xx = x0 + (x1 - x0) * i / 3;
      bar([xx, s * by, zb], [xx, s * by, zt]);
    }
    bar([x1, -by, (zb + zt) / 2], [x1, by, (zb + zt) / 2]);
    /* its mesh: a thin dark panel on the back and the floor */
    box(B.mesh, x1 - 0.005, x1 + 0.005, -by, by, zb, zt);
    box(B.mesh, x1, x0, -by, by, zb - 0.005, zb + 0.005);
    for (s = -1; s <= 1; s += 2) box(B.mesh, x1, x0, s * by - 0.005, s * by + 0.005, zb, zt);

    /* --- the twin S-68: two big recoil housings out of the front face, the long barrels,
       the pepperpot muzzle brakes (P1, P3, P5); elevated EL --- */
    var EL = V.el * Math.PI / 180, d = [Math.cos(EL), 0, Math.sin(EL)], P0 = [1.02, 0, 0.50];
    function at(a, y, h) { return [P0[0] + d[0] * a - d[2] * h, y, P0[2] + d[2] * a + d[0] * h]; }
    /* the mount's armoured front between the housings */
    slab(B.paint, at(0.05, 0, 0), d, [0, 1, 0], [-d[2], 0, d[0]], 0.30, 0.52, 0.26);
    [-0.31, 0.31].forEach(function (gy) {
      cyl(B.paint, at(-0.10, gy, 0), at(0.85, gy, 0), 0.15, 0.14, 16);
      cyl(B.paint, at(0.85, gy, 0), at(1.15, gy, 0), 0.14, 0.085, 14);
      cyl(B.dark, at(0.60, gy, 0), at(0.64, gy, 0), 0.152, 0.152, 16, true);
      cyl(B.paint, at(1.15, gy, 0), at(V.muz - 0.38, gy, 0), 0.062, 0.052, 12);
      /* the multi-baffle brake: a fat tube with rings of ports */
      cyl(B.dark, at(V.muz - 0.38, gy, 0), at(V.muz, gy, 0), 0.085, 0.085, 12);
      for (k = 0; k < 3; k++) cyl(B.paint, at(V.muz - 0.32 + k * 0.11, gy, 0), at(V.muz - 0.28 + k * 0.11, gy, 0), 0.09, 0.09, 12, true);
    });
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    T.mesh = new THREE.MeshStandardMaterial({ color: 0x2a2c2a, roughness: 0.8, metalness: 0.3, transparent: true, opacity: 0.45, depthWrite: false });
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    TB.mesh = new Bin(T.mesh, false);
    addHull(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of the build, the hull's rear to the muzzles at 20 degrees
   (the published 8.46 m is with the guns level) */
UNIT_MODELS["pact_e50_spaag"] = {
  len: 8.29,
  build: function (THREE, M, C) { return HeroZsu57.build(THREE, M, C, "A"); }
};
/* the KPA's ZSU-57-2 (row service 1968): the same vehicle, no markings drawn */
UNIT_MODELS["kpa_e60_spaag"] = {
  len: 8.29,
  build: function (THREE, M, C) { return HeroZsu57.build(THREE, M, C, "A"); }
};

/* ========== HeroShilka - HERO model: ZSU-23-4 Shilka (pact_e60_spaag) ===========
   The radar-directed quad 23 mm SPAAG on the GM-575 chassis, in service 1965.

   REDO 2026-10-30 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_zsu_ref:
     P1  "ZSU-23-4 Shilka 01.jpg" - head-on from the front left, radar raised: the wide
         flat turret over the whole hull width, the four 2A7 barrels in two stacked pairs
         between two armoured cheek boxes at the turret's front corners, the dish on its
         A-frame at the rear right of the roof, the domed hatch, the shallow upper glacis
         with the big rounded driver's hatch on the left, the pair of lamps on the right,
         the steep lower nose plate with its towing eyes.
     P2  "ZSU-23-4 Shilka 07.jpg" - from the rear right: the dish raised, the big exhaust
         silencer lying across the top of the rear plate, the rear plate's stowage
         panels, the rear sprocket, the turret's rear stowage box.
     P3  "ZSU 23-4 'Shilka' ... Museum of Army Flying ... .jpg" - front left 3/4: the wide
         superstructure overhanging the track with its vertical sides and rounded access
         panels, the dished SPOKED road wheels with rubber tyres, the spoked front idler
         raised, the lobed drive sprocket at the REAR, no return rollers.
     P4  "Zsu-23-4-radar.jpg" (US DoD, Grenada 1983) - near side-on from the right, radar
         raised: scaled from the published 6.535 m length (0.0107 m a pixel, which also
         gives the 0.66 m road wheel and the published height): six road wheels at a 0.72 m
         pitch, the idler 0.62 m ahead of the first wheel and raised, the sprocket 0.72 m
         behind the last and the hull running on 0.75 m behind it; fender line 0.91 m, hull deck 1.82 m, turret roof 2.41 m, the
         dish about 1.0 m across centred about 3.1 m up; turret ring 0.17 m behind
         mid-hull.
   Published (en.wikipedia ZSU-23-4 infobox): length 6.535 m, width 3.125 m, height 2.576 m,
   3.572 m with the radar raised, ground clearance 375 mm, 19 t, individual torsion bars,
   four 23 mm 2A7 (the AZP-23 Amur mount), V-6R diesel.

   CORRECTIONS against the previous model (the references do not support it):
   - the drive sprocket is at the REAR (P2, P3, P4: the lobed wheel under the radar end);
     the old model drove from the front;
   - six 0.66 m wheels at 0.72 m (P4), not 0.72 m wheels at 0.76 m; the idler raised;
   - the superstructure spans the full width over the tracks with vertical sides (P1, P3);
     deck 1.82 m (P4), the old roof sat low;
   - the barrels are two stacked PAIRS between armoured cheek boxes (P1, P3), not a pair
     each side of the front;
   - the radar is drawn RAISED on its A-frame (P1, P2, P4 all show it up; it is what the
     vehicle is known by), the old model laid it back stowed;
   - the exhaust silencer across the rear and the turret's rear box were missing (P2, P4).

   Recognition list (what makes it read at game zoom, and its source):
     1. the dish on its A-frame standing high over the turret rear - P1, P2, P4
     2. four long thin barrels in two stacked pairs between two cheek boxes - P1, P3
     3. the wide flat turret, sloped flanks, nearly the hull's width - P1, P4
     4. six dished spoked road wheels, raised front idler, rear sprocket, no return
        rollers - P3, P4
     5. the boxy hull overhanging the tracks, vertical sides, rounded access panels - P3
     6. the shallow glacis with the big rounded driver's hatch on the left - P1
     7. the silencer across the top of the rear plate - P2
   Paint: Soviet green.  P2's green, sampled (lit #66704f, shade #3c4430), taken to about
   0.85 of level -> base #4d5838.  P1, P3 and P4 wear museum, desert or local camouflage:
   not drawn.  No numbers or markings (P4 carries "415": not drawn).
   NOT CONFIRMED, drawn as judgement calls: the turret's plan length and the cheek boxes'
   exact faces (no plan view); the dish's tilt (drawn looking forward, 12 degrees up); the
   lamp and towing-eye positions; the access panels' count; the barrels' elevation (12
   degrees, a choice: the engine trains the turret in azimuth only); the published 6.535 m
   is taken to run over the rear silencer.

   Materials: PAINT (canvas texture), DARK (track, guns, fittings), WHEEL (tyres, discs,
   ribs by vertex colour) and the team colour exactly as handed in (C.team): two strips
   (rear deck, turret roof).
   Nodes: "turret" (trains, origin on the ring centre at the deck, guns along +X) and six
   "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 3 + 6 wheels = 12.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

var HeroShilka = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4d5838", blots: ["#434d30", "#57623f"], seed: 234 };
  /* running gear (P3, P4) */
  var TY = 1.33, TW = 0.19;
  var XW = [2.02, 1.30, 0.58, -0.14, -0.86, -1.58], ZW = 0.33, RW = 0.33;
  var IDL = { x: 2.64, z: 0.60, r: 0.24 }, SPR = { x: -2.30, z: 0.42, r: 0.30 };
  /* hull (P4): fender line, deck, superstructure half width, nose and rear plates */
  var FZ = 0.91, DECK = 1.82, SW = 1.52, LW = 1.02, NOSE = 2.97, REAR = -3.05, BELLY = 0.375;
  var TX = -0.17, EL = 12 * Math.PI / 180;

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
    /* the lower hull between the tracks: belly, the steep lower nose plate (P1), the
       rear plate leaning in at its foot */
    prismY(B.paint, [[REAR + 0.18, BELLY], [2.52, BELLY], [NOSE, 1.22], [NOSE - 0.02, 1.25], [REAR, 1.25], [REAR, 0.62]], -LW, LW);
    /* the superstructure over the full width (P1, P3, P4): vertical sides from the fender
       line to the deck, the shallow upper glacis to the nose, the rear plate */
    prismY(B.paint, [[REAR, FZ], [2.62, FZ], [NOSE, 1.20], [NOSE, 1.27], [1.52, DECK], [REAR + 0.22, DECK], [REAR, DECK - 0.20]], -SW, SW);
    for (s = -1; s <= 1; s += 2) {
      /* the fender lip along the foot of the side (P3) */
      box(B.dark, REAR + 0.05, 2.60, s > 0 ? SW - 0.01 : -SW - 0.02, s > 0 ? SW + 0.02 : -SW + 0.01, FZ - 0.02, FZ + 0.03);
      /* the front mudguard turned down ahead of the idler (P1, P3) */
      belt(B.paint, 2.60, FZ, 3.12, FZ - 0.28, s * 1.10, s * SW, 0.03);
      /* three rounded access panels on each side (P3) and their handles */
      [1.25, 0.20, -1.55].forEach(function (px) {
        var yo = s * (SW + 0.012), ya = Math.min(yo, s * SW), yb = Math.max(yo, s * SW);
        box(B.paint, px - 0.26, px + 0.26, ya, yb, 1.18, 1.62);
        box(B.dark, px - 0.06, px + 0.06, s > 0 ? yb : ya - 0.02, s > 0 ? yb + 0.02 : ya, 1.48, 1.52);
      });
      /* the top edge strip of the side */
      box(B.dark, REAR + 0.22, 1.50, s > 0 ? SW - 0.03 : -SW, s > 0 ? SW : -SW + 0.03, DECK - 0.015, DECK + 0.005);
    }
    /* --- glacis (P1): the big rounded driver's hatch on the left, two lamps on the right,
       towing eyes on the lower nose plate --- */
    var ang = Math.atan2(DECK - 1.27, NOSE - 1.52), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function onGlacis(gx) { return 1.27 + (NOSE - gx) * Math.tan(ang); }
    slab(B.paint, [2.10, 0.78, onGlacis(2.10) + 0.05], u, [0, 1, 0], w, 0.36, 0.40, 0.05);
    slab(B.paint, [2.10, 0.78, onGlacis(2.10) + 0.11], u, [0, 1, 0], w, 0.30, 0.34, 0.03);
    slab(B.dark, [1.78, 0.78, onGlacis(1.78) + 0.12], u, [0, 1, 0], w, 0.03, 0.22, 0.04);
    for (i = -1; i <= 1; i += 2) {
      cyl(B.paint, [2.62, -0.70 + i * 0.13, onGlacis(2.62) + 0.02], [2.80, -0.70 + i * 0.13, onGlacis(2.62) + 0.06], 0.075, 0.075, 12);
      cyl(B.dark, [2.80, -0.70 + i * 0.13, onGlacis(2.62) + 0.06], [2.81, -0.70 + i * 0.13, onGlacis(2.62) + 0.06], 0.062, 0.062, 12);
    }
    [-0.85, -0.25, 0.25, 0.85].forEach(function (ey) {
      cyl(B.dark, [2.86, ey - 0.07, 0.86], [2.86, ey + 0.07, 0.86], 0.06, 0.06, 8);
      box(B.dark, 2.74, 2.84, ey - 0.06, ey + 0.06, 0.82, 0.90);
    });
    /* --- engine deck: louvred intake and grilles behind the turret --- */
    box(B.dark, -2.55, -1.95, -1.15, 1.15, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 6; i++) box(B.paint, -2.52 + i * 0.10, -2.47 + i * 0.10, -1.12, 1.12, DECK + 0.012, DECK + 0.035);
    box(B.team, -2.45, -2.05, 1.20, 1.45, DECK, DECK + 0.02);
    /* --- rear (P2): the exhaust silencer across the top of the rear plate on its
       brackets, two stowage panels, towing hooks --- */
    cyl(B.paint, [REAR - 0.17, -0.45, DECK - 0.36], [REAR - 0.17, 1.40, DECK - 0.36], 0.16, 0.16, 16);
    cyl(B.dark, [REAR - 0.17, 1.40, DECK - 0.36], [REAR - 0.17, 1.46, DECK - 0.36], 0.10, 0.10, 12);
    [-0.25, 0.55, 1.20].forEach(function (by) { box(B.dark, REAR - 0.20, REAR, by - 0.04, by + 0.04, DECK - 0.50, DECK - 0.30); });
    box(B.paint, REAR - 0.03, REAR, -1.05, -0.25, 0.95, 1.30);
    box(B.paint, REAR - 0.03, REAR, 0.20, 1.00, 0.95, 1.30);
    for (s = -1; s <= 1; s += 2) box(B.dark, REAR - 0.12, REAR, s * 0.85 - 0.07, s * 0.85 + 0.07, 0.62, 0.74);
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
        /* the link with its grouser and the centre guide horn (P3) */
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the lobed drive sprocket at the REAR (P2, P3, P4) */
      cylY(B.dark, SPR.x, y - 0.13, y + 0.13, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.10, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.13, y + s * 0.18, SPR.z, 0.17, 14);
      /* the spoked front idler, raised (P3) */
      cylY(B.paint, IDL.x, y - 0.15, y + 0.15, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.15, y + s * 0.20, IDL.z, 0.07, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y + s * 0.22 - 0.03, y + s * 0.22 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
    }
  }
  /* road wheel (P3): rubber tyre, dished disc with twelve ribs, hub */
  var TYRE = [0.13, 0.135, 0.125];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.32, gg * 1.32, bb * 1.32];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y + 0.15, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.19, 0], RW - 0.05, 0.10, 20);
      W.col = RIB;
      for (i = 0; i < 12; i++) {
        a = i / 12 * TAU;
        slab(W, [Math.cos(a) * 0.17, y + s * 0.17, Math.sin(a) * 0.17], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.11, 0.015, 0.012);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.19, y + s * 0.22, 0, 0.06, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* origin on the ring centre at the deck.  The body (P1, P4): vertical lower walls, the
     flanks sloping in to a flat roof 0.59 m up, nearly the hull's width; the two armoured
     cheek boxes at the front corners with the gun slot between them; the rear box. */
  var TH = 0.59;
  function bodyRing(x, hw) {
    return [[x, -hw, 0], [x, hw, 0], [x, hw, 0.24], [x, hw - 0.30, TH], [x, -(hw - 0.30), TH], [x, -hw, 0.24]];
  }
  function addTurret(B) {
    var s, i;
    loftN(B.paint, [bodyRing(-1.50, 1.20), bodyRing(-1.35, 1.38), bodyRing(0.70, 1.38)]);
    /* the cheek boxes: their fronts lean back from the foot to the roof (P1, P3) */
    for (s = -1; s <= 1; s += 2) {
      var yi = s * 0.36, yo = s * 1.36;
      prismY(B.paint, [[0.60, 0], [1.22, 0], [1.30, 0.12], [1.02, TH - 0.02], [0.60, TH - 0.02]], Math.min(yi, yo), Math.max(yi, yo));
      /* the vision block on each cheek's roof */
      box(B.dark, 0.78, 0.92, s * 0.80 - 0.10, s * 0.80 + 0.10, TH - 0.02, TH + 0.06);
    }
    /* the gun slot's floor and back wall */
    box(B.paint, 0.60, 1.00, -0.36, 0.36, 0, 0.10);
    /* the rear stowage box (P2, P4) */
    box(B.paint, -1.85, -1.42, -1.15, 1.15, 0.06, 0.46);
    box(B.dark, -1.86, -1.84, -1.0, 1.0, 0.28, 0.31);
    /* roof: the domed hatch on the right (P1), the left hatch, periscopes, team strip */
    cylZ(B.paint, -0.55, -0.70, TH, TH + 0.06, 0.30, 18);
    cyl(B.paint, [-0.55, -0.70, TH + 0.06], [-0.55, -0.70, TH + 0.16], 0.28, 0.16, 18);
    cylZ(B.paint, -0.55, 0.70, TH, TH + 0.05, 0.27, 16);
    for (i = 0; i < 3; i++) box(B.dark, 0.05 + i * 0.16, 0.15 + i * 0.16, -0.30, -0.18, TH, TH + 0.07);
    box(B.team, -1.25, -0.85, 0.30, 0.95, TH, TH + 0.015);

    /* --- the AZP-23 quad mount (P1, P3): a cradle in the slot, four 2A7 barrels in two
       stacked pairs, each with its jacket and flash hider; elevated EL --- */
    var P0 = [0.82, 0, 0.30], d = [Math.cos(EL), 0, Math.sin(EL)], up = [-Math.sin(EL), 0, Math.cos(EL)];
    function at(a, y, h) { return [P0[0] + d[0] * a + up[0] * h, y, P0[2] + d[2] * a + up[2] * h]; }
    slab(B.dark, at(0.10, 0, 0.04), d, [0, 1, 0], up, 0.40, 0.30, 0.20);
    [[-0.16, 0.10], [0.16, 0.10], [-0.16, -0.06], [0.16, -0.06]].forEach(function (g) {
      cyl(B.dark, at(0.40, g[0], g[1]), at(1.05, g[0], g[1]), 0.055, 0.050, 10);
      cyl(B.dark, at(1.05, g[0], g[1]), at(2.10, g[0], g[1]), 0.030, 0.028, 8);
      cyl(B.dark, at(2.10, g[0], g[1]), at(2.30, g[0], g[1]), 0.048, 0.044, 10);
    });

    /* --- the RPK-2 Tobol radar, raised (P1, P2, P4): the A-frame from the roof's rear
       right, the dish about 1.0 m across in its drum, looking forward 12 degrees up --- */
    var MX = -1.20, MY = -0.20, DZ = 0.86;
    for (s = -1; s <= 1; s += 2) cyl(B.dark, [MX - 0.10, MY + s * 0.30, TH], [MX, MY + s * 0.08, DZ - 0.10], 0.035, 0.03, 8);
    box(B.paint, MX - 0.20, MX + 0.20, MY - 0.30, MY + 0.30, TH, TH + 0.12);
    cylZ(B.dark, MX, MY, DZ - 0.16, DZ - 0.04, 0.10, 10);
    var dn = [Math.cos(0.21), 0, Math.sin(0.21)], C0 = [MX + 0.05, MY, DZ + 0.30];
    function dp(a) { return [C0[0] + dn[0] * a, C0[1], C0[2] + dn[2] * a]; }
    cyl(B.paint, dp(-0.28), dp(0.10), 0.47, 0.50, 24);
    cyl(B.paint, dp(-0.40), dp(-0.28), 0.30, 0.47, 20);
    cyl(B.dark, dp(0.10), dp(0.105), 0.46, 0.46, 24, true);
    cyl(B.dark, dp(0.02), dp(0.104), 0.08, 0.44, 24);
    cyl(B.dark, dp(0.0), dp(0.30), 0.02, 0.02, 6);
    cyl(B.dark, dp(-0.15), dp(-0.15).map(function (v, k) { return k === 2 ? v - 0.42 : v; }), 0.05, 0.05, 8);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB);
    addRunning(HB);
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
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build, the rear silencer (-3.38) to the front
   mudguards (3.13); the published length is 6.535 m */
UNIT_MODELS["pact_e60_spaag"] = { len: 6.51, build: HeroShilka.build };
