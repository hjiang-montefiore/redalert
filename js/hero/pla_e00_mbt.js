/* ========== pla_e00_mbt.js - HERO model: ZTZ-99A (Type 99A) main battle tank ==========
   pla_e00_mbt   "ZTZ-99 (2001) and ZTZ-99A (2011)": drawn as the ZTZ-99A, the later of the
                 row's two variants and the one every usable photograph shows (the big
                 arrow-shaped turret, the saw-tooth skirts).  Rebuilt to the current standard:
                 the first version drew 297 separate meshes (one per part, 297 draw calls) and
                 its track pads dipped to z = -0.094; this one is merged per material and its
                 tracks stand on z = 0.

   HeroPlaE00Mbt.build(THREE, M, C) is also called by js/hero/mbt_c.js (mbt_c, "Type 99A") and
   js/hero/pla_ground_modern.js (hvy_c, "ZTZ-99A2 w/ GL5 APS").  Keep its name and signature.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_ztz99_ref:
     P1  "ZTZ-99A MBT 20170716.jpg" - a ZTZ-99A from the front LEFT, the left side about 37
         degrees off side-on (solved from the near and far mudguard corners against the
         published 7.6 x 3.7 m).  MEASURED here, along the near side (nose 298 px, tail 869 px,
         0.01331 m/px): six road wheels at x +2.00, +1.16, +0.27, -0.66, -1.59, -2.40; the
         drive sprocket at the REAR about -3.3, raised to about the height of the wheel tops;
         the skirt: one long first panel raked at its front (top +3.00, bottom +2.31) then five
         more, joints at +1.14, +0.19, -0.73, -1.60, -2.55, the last ending at -3.39 with its
         lower edge cut up over the sprocket; each panel's lower edge a shallow V (about 0.72 m
         at the joints, 0.52 m at the point) with one small square hole at mid height; the
         rounded front mudguard about 0.8 m long; the stowage boxes along the rear fenders
         with the round exhaust port on the left; the long turret with its side baskets
         reaching back to about -3.15 and the cylinder behind the bustle on the left; the
         smoke-tube cluster on the turret side about -0.45.
     P2  "Type 98 tanks on parade.jpg" - Type 98 (the ZTZ-99's pre-series) side-on from the
         right, wheels round, so ratios in wheel diameters D (75 px) are true: the wheel gaps
         1.33, 1.64, 1.64, 1.64, 1.33 D (rear to front: the end gaps short, as P1 shows them
         too), the idler 1.4 D ahead of the front wheel and about level with it; the fender
         line 2.6 D and the turret roof 3.8 D over the ground.
     P3  "ZTZ-99A tank front 20170902.jpg" - head-on, a little from the left: the two big
         rounded mudguards over the tracks standing proud of the long shallow glacis, the row
         of six applique blocks across the glacis, the headlamps in guards on the inner corners
         of the mudguards, the four brackets on the lower nose plate, the arrow: the cheek
         modules' faces swept back from a narrow mantlet, their top faces sloping down to the
         front, the commander's tall panoramic sight on the left rear of the roof, the
         gunner's sight box on the right front, the smoke tubes on the turret side.
     P4  "ZTZ-99A MBT 20170902.jpg", "ZTZ-99A tank 20170919.jpg" - front left 3/4: the same
         skirts, mudguards, turret, the evacuator at about 40 % of the exposed tube.
     P5  "Type 99 MBT rear.jpg", "Type 99 MBT front left.jpg" - a museum ZTZ-99 (the 2001
         tank): the raised rear sprocket, the rear plate and rear mudguards, the double road
         wheels, the 12.7 mm on its mount over the roof.
   Published (en.wikipedia "Type 99 tank"): hull 7.6 m, 11 m gun forward, 3.7 m wide, 2.35 m
   high; 55 t (99A); six rubber-tyred road wheels a side, torsion bars, sprocket at the rear;
   12.7 mm QJC-88 on the commander's cupola; twelve 81 mm smoke dischargers; the JD-3 laser
   box "behind the tank commander hatch"; 99A: "larger arrow-shaped turret with applique ERA".
   Scale: from P1's near side (7.6 m) the road wheel comes out D = 0.60 m (tyre width 45 +/- 4
   px); with it P2's fender line is 1.56 m and its turret roof 2.28 m, P1's skirt top 1.54 m.
   Measured on this build: 11.1 m over the gun (11.0 from the tail plate, the tow hooks behind
   it), 3.72 m wide over the skirts, turret roof 2.29 m, 2.81 m to the commander's sight head
   and the 12.7 mm.  Published 11 / 3.7 / 2.35 m (the 2.35 read as the turret roof: P2's roof
   measures 2.28 m at the same scale).

   Recognition list (what makes it read at game zoom, and its source):
     1. the long arrow-fronted turret: cheek faces swept back from the mantlet, their tops
        sloping to the front, flat sides, side baskets running back over the deck - P1, P3, P4
     2. six road wheels with the short end gaps, front idler, raised rear sprocket - P1, P2
     3. the saw-tooth skirt: a raked first panel and five more, one square hole each - P1
     4. two rounded mudguards proud of the long shallow glacis, the block row on it - P3, P4
     5. long 125 mm gun with thermal sleeve and the evacuator at about 40 % - P3, P4
     6. smoke tubes on each turret side, the tall panoramic sight on the roof - P1, P3
     7. stowage boxes on the rear fenders, the cylinder behind the bustle - P1, P5
   Paint: plain PLA green #4f5d3a (the fleet value of js/hero/pla_type96.js; every photograph
   here wears digital or woodland camouflage, so none was sampled).  No stars or numbers.
   NOT CONFIRMED, judgement calls: the wheel diameter (0.60 m: P1 measured, no published
   figure; the old model used 0.70); P1's mudguard-to-front-wheel distance (1.80 m) is 0.5 m
   longer than P2's Type 98 gives, P1 kept; the idler's place (from P2, hidden in P1); the
   sprocket's height (0.70 m) and place; no return rollers drawn (hidden by the skirt in every
   photograph); the belly (0.48 m); the glacis break (x +1.60) and the nose edge (0.88 m, from
   P3's proportions); the track width (0.60 m) and spread; the turret plan: front tip +1.41,
   cheek corners +0.65, half width 1.40, bustle to -3.25 behind the ring (P1 through the
   perspective), ring at x +0.10; the bustle's floor raised to 1.83 m so it clears the fender
   boxes when the turret trains; the fender boxes start at -1.05 for the same reason (P1 seems
   to show them further forward); the cylinder behind the bustle (what it is, its size); the
   roof fittings' sizes and places; the JD-3 box (placed behind the commander's hatch as
   published, not identified in a photograph); the smoke tubes as two rows of three a side
   (published twelve); the 12.7 mm (P5's ZTZ-99, not seen on P1/P3); the rear plate fittings;
   the engine deck grilles.
   NOT DRAWN: the ZTZ-99's smaller 2001 turret (the row's other variant), the GL5/GL6 active
   protection, crews, aerials, tow cables, the canvas mantlet cover's folds.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team): a
   strip on the bustle roof and one on each rear fender box.
   Nodes: "turret" (trains; origin on the ring at deck height x +0.10, gun along +X) and six
   "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 3 + 6 wheels = 12.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaE00Mbt = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4f5d3a", blots: ["#465232", "#586642"], seed: 99 };
  /* running gear (P1, P2): six wheels, the end gaps short; front idler, raised rear sprocket */
  var TY = 1.50, TW = 0.30;
  var XW = [2.02, 1.20, 0.27, -0.66, -1.59, -2.41], RW = 0.30, ZW = 0.38;
  var IDL = { x: 2.85, z: 0.42, r: 0.27 }, SPR = { x: -3.30, z: 0.70, r: 0.30 };
  /* hull: nose and tail, belly, deck, the hull's half width between the tracks, the fender
     and skirt half widths, the glacis break and the nose edge, the turret ring */
  var NOSE = 3.80, REAR = -3.80, BELLY = 0.48, DECK = 1.55, HW = 1.15, FW = 1.82, SKW = 1.85;
  var GX = 1.60, GZN = 0.88, NX = 3.72, TX = 0.10;

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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
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
  var GA = Math.atan2(DECK - GZN, NX - GX);
  function gz(x) { return x <= GX ? DECK : DECK - (x - GX) * Math.tan(GA); }
  /* skirt panels (P1): [front x at the top, front x at the bottom, x of the point, rear x,
     z at the front corner, z at the point, z at the rear corner] */
  var SKIRT = [
    [3.00, 2.31, 1.66, 1.14, 0.66, 0.52, 0.72],
    [1.14, 1.14, 0.67, 0.19, 0.72, 0.52, 0.72],
    [0.19, 0.19, -0.27, -0.73, 0.72, 0.52, 0.72],
    [-0.73, -0.73, -1.17, -1.60, 0.72, 0.52, 0.72],
    [-1.60, -1.60, -2.08, -2.55, 0.72, 0.52, 0.72],
    [-2.55, -2.55, -2.97, -3.39, 0.62, 0.785, 0.95]
  ];
  var ZS1 = 1.52;
  function addHull(B) {
    var s, i, x, p;
    /* the hull between the tracks: vertical tail plate, flat deck, the long shallow glacis
       (P3, P4) down to the nose edge, the lower nose plate leaning back to the belly */
    prismY(B.paint, [[REAR, DECK], [REAR, 0.70], [REAR + 0.30, BELLY], [3.30, BELLY],
                     [NX, GZN], [GX, DECK]], -HW, HW);
    var gu = [Math.cos(GA), 0, -Math.sin(GA)], gw = [Math.sin(GA), 0, Math.cos(GA)];
    var la = Math.atan2(NX - 3.30, GZN - BELLY), lu = [Math.sin(la), 0, Math.cos(la)], lw = [Math.cos(la), 0, -Math.sin(la)];
    for (p = -1; p <= 1; p += 2) {
      var yi = p * HW, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      var ys0 = Math.min(p * (SKW - 0.04), p * SKW), ys1 = Math.max(p * (SKW - 0.04), p * SKW);
      /* the fender shelf over the track, level with the deck, out to the skirts */
      box(B.paint, REAR, 2.96, ylo, yhi, DECK - 0.06, DECK);
      box(B.dark, -3.10, 2.90, p > 0 ? HW : -HW - 0.03, p > 0 ? HW + 0.03 : -HW, 0.95, DECK - 0.06);
      /* the rounded front mudguard over the idler (P1, P3): its top rolling down to a short
         upright front face, standing proud of the glacis */
      prismY(B.paint, [[2.95, DECK], [3.45, 1.50], [3.70, 1.40], [NOSE, 1.26], [NOSE, 0.80], [3.62, 0.76], [2.95, 0.76]],
             p > 0 ? HW + 0.05 : -SKW, p > 0 ? SKW : -HW - 0.05);
      /* the skirt (P1): six panels, the first raked at its front, the last cut up over the
         sprocket, each lower edge a shallow V; a square hole in each, dark joints */
      for (i = 0; i < SKIRT.length; i++) {
        var k = SKIRT[i];
        prismY(B.paint, [[k[0], ZS1], [k[1], k[4]], [k[2], k[5]], [k[3], k[6]], [k[3], ZS1]], ys0, ys1);
        var xm = (Math.max(k[0], k[1]) + k[3]) / 2 - (i === 0 ? 0.25 : 0);
        box(B.dark, xm - 0.045, xm + 0.045, p > 0 ? SKW : -SKW - 0.006, p > 0 ? SKW + 0.006 : -SKW, 0.85, 0.94);
        if (i > 0) box(B.dark, k[0] - 0.012, k[0] + 0.012, p > 0 ? SKW : -SKW - 0.008, p > 0 ? SKW + 0.008 : -SKW, k[4] + 0.02, ZS1);
      }
      /* the stowage boxes along the rear fender (P1, P5); clear of the bustle's sweep */
      box(B.paint, -3.75, -1.05, p > 0 ? 1.30 : -FW, p > 0 ? FW : -1.30, DECK, DECK + 0.27);
      box(B.dark, -3.75, -1.05, p > 0 ? 1.29 : -FW - 0.005, p > 0 ? FW + 0.005 : -1.29, DECK + 0.12, DECK + 0.135);
      box(B.dark, -2.40, -2.37, p > 0 ? 1.29 : -FW - 0.005, p > 0 ? FW + 0.005 : -1.29, DECK, DECK + 0.27);
      /* the rear mudguard over the sprocket (P5) */
      slab(B.paint, [-3.62, p * (HW + FW) / 2, DECK - 0.12], unit([0.55, 0, 0.84]), [0, 1, 0], unit([-0.84, 0, 0.55]), 0.20, (FW - HW) / 2, 0.02);
      /* headlamps in their guards on the inner corners of the mudguards (P3) */
      var hx = 3.05, hy = p * 0.98, hz = 1.28;
      cyl(B.paint, [hx - 0.06, hy, hz], [hx + 0.08, hy, hz], 0.075, 0.08, 12);
      cyl(B.dark, [hx + 0.08, hy, hz], [hx + 0.09, hy, hz], 0.068, 0.068, 12);
      box(B.dark, hx - 0.10, hx - 0.06, hy - 0.04, hy + 0.04, gz(hx), hz);
      box(B.dark, hx + 0.11, hx + 0.13, hy - 0.11, hy + 0.11, hz - 0.12, hz + 0.11);
      box(B.dark, hx - 0.06, hx + 0.13, hy - 0.11, hy - 0.09, hz + 0.07, hz + 0.11);
      box(B.dark, hx - 0.06, hx + 0.13, hy + 0.09, hy + 0.11, hz + 0.07, hz + 0.11);
      /* rear: tow hooks, tail lamps (P5) */
      box(B.dark, REAR - 0.10, REAR, p * 0.80 - 0.07, p * 0.80 + 0.07, 0.72, 0.84);
      box(B.dark, REAR - 0.05, REAR, p * 0.98 - 0.06, p * 0.98 + 0.06, 1.38, 1.48);
    }
    /* the exhaust port on the left fender box (P1) */
    cyl(B.dark, [-2.81, FW - 0.01, DECK + 0.14], [-2.81, FW + 0.015, DECK + 0.14], 0.085, 0.085, 12);
    /* the row of six applique blocks across the glacis (P3) and the driver's hatch behind
       them, centre right on the 99A (published) */
    for (i = 0; i < 6; i++) {
      var by = -0.55 + i * 0.22, bx = 2.50;
      slab(B.paint, [bx, by, gz(bx) + 0.04], gu, [0, 1, 0], gw, 0.30, 0.10, 0.04);
    }
    slab(B.paint, [1.95, -0.25, gz(1.95) + 0.03], gu, [0, 1, 0], gw, 0.26, 0.24, 0.03);
    box(B.dark, 1.64, 1.70, -0.42, -0.08, DECK, DECK + 0.07);
    /* the splash board at the foot of the glacis, the four brackets on the lower nose (P3) */
    slab(B.paint, [3.10, 0, gz(3.10) + 0.04], gw, [0, 1, 0], gu, 0.05, 0.95, 0.015);
    [-0.55, -0.18, 0.18, 0.55].forEach(function (yb) {
      slab(B.dark, [3.52 + 0.02, yb, 0.70], lu, [0, 1, 0], lw, 0.08, 0.10, 0.06);
    });
    box(B.dark, NX - 0.03, NX + 0.005, -HW, HW, GZN - 0.03, GZN + 0.005);
    /* tow hooks on the lower nose plate */
    for (p = -1; p <= 1; p += 2) box(B.dark, 3.40, 3.52, p * 0.85 - 0.04, p * 0.85 + 0.04, 0.55, 0.66);

    /* --- engine deck behind the turret: the grilles, an access plate (NOT CONFIRMED) --- */
    box(B.dark, -3.60, -2.10, -0.95, 0.95, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 11; i++) box(B.paint, -3.57 + i * 0.135, -3.52 + i * 0.135, -0.93, 0.93, DECK + 0.012, DECK + 0.04);
    box(B.paint, -1.95, -1.30, -0.75, 0.75, DECK, DECK + 0.03);
    /* --- the tail plate (P5): the grille panel, the plate's top edge --- */
    box(B.dark, REAR - 0.03, REAR, -0.70, 0.70, 0.95, 1.40);
    for (i = 0; i < 4; i++) box(B.paint, REAR - 0.05, REAR - 0.02, -0.68, 0.68, 1.00 + i * 0.11, 1.03 + i * 0.11);
    box(B.paint, REAR - 0.06, REAR, -HW, HW, DECK - 0.06, DECK);
    box(B.team, -3.20, -2.20, 1.42, 1.70, DECK + 0.27, DECK + 0.285);
    box(B.team, -3.20, -2.20, -1.70, -1.42, DECK + 0.27, DECK + 0.285);
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
  /* The belt runs on an envelope 0.045 m outside the wheels.  The link plates are 0.07 m
     thick centred on it and the wheels' centres are 0.38 m up, so the plates' lower faces lie
     on z = 0 (0.38 - 0.30 - 0.045 - 0.035), a plate straddling a bend clamped to that line;
     the first version's pads hung 0.094 m below. */
  var ENV = 0.045, PLATE = 0.07;
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], ZB = ZW - RW - ENV;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + ENV]);
    C.push([IDL.x, IDL.z, IDL.r + ENV], [SPR.x, SPR.z, SPR.r + ENV]);
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
    cnt = Math.round(tot / 0.26); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.02, y + TW - 0.02, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* link plate, and the centre guide horn on the inside of the run */
        /* a plate straddling the bend onto the ground run is not let below that run */
        belt(B.dark, px - dx * 0.10, Math.max(pz - dz * 0.10, ZB), px + dx * 0.10, Math.max(pz + dz * 0.10, ZB), y - TW, y + TW, PLATE);
        belt(B.dark, px - dx * 0.03 - dz * 0.07, pz - dz * 0.03 + dx * 0.07, px + dx * 0.03 - dz * 0.07, pz + dz * 0.03 + dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* the toothed drive sprocket at the REAR, raised (P1, P5) */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r - 0.04, 18);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.17, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.22, y + s * 0.28, SPR.z, 0.18, 12);
      cylY(B.dark, SPR.x, y + s * 0.28, y + s * 0.31, SPR.z, 0.08, 8);
      /* the idler at the front (P2) with its crank */
      cylY(B.paint, IDL.x, y - 0.23, y + 0.23, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.23, y + s * 0.29, IDL.z, 0.10, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
    }
  }
  /* road wheel (P1, P5): a double wheel, the dark tyre bands, the dished disc with six
     recesses, the hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.20, 0.21, 0.18];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.25, y - 0.14, 0, RW, 18);
      cylY(W, 0, y + 0.14, y + 0.25, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.14, y + 0.14, 0, 0.25, 18);
      cyl(W, [0, y + s * 0.25, 0], [0, y + s * 0.27, 0], 0.245, 0.13, 18);
      cylY(W, 0, y + s * 0.265, y + s * 0.29, 0, 0.09, 10);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.18, y + s * 0.257, Math.sin(a) * 0.18], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.040, 0.012, 0.042);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.285, y + s * 0.305, 0, 0.045, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* turret frame: origin on the ring centre at deck height (hull x = TX), gun along +X.
     The arrow (P1, P3, P4): the core lofted through plan rings - the cheek modules' faces
     swept back from the narrow front either side of the gun, their top faces sloping down
     to the front, the flat sides; the long bustle with its side baskets behind, its floor
     raised clear of the fender boxes */
  var TH = 0.74, BZ = 0.28;
  function tcore(z, dxf, k) {
    var P = [[1.41 - dxf, 0.32], [0.65 - dxf * 0.35, 1.40 - k], [-0.90, 1.40 - k]], R = [], i;
    for (i = 0; i < P.length; i++) R.push([P[i][0], P[i][1], z]);
    for (i = P.length - 1; i >= 0; i--) R.push([P[i][0], -P[i][1], z]);
    return R;
  }
  function tbustle(z, k) {
    var P = [[-0.85, 1.40 - k], [-3.10, 1.40 - k], [-3.25 + k * 0.5, 1.25 - k]], R = [], i;
    for (i = 0; i < P.length; i++) R.push([P[i][0], P[i][1], z]);
    for (i = P.length - 1; i >= 0; i--) R.push([P[i][0], -P[i][1], z]);
    return R;
  }
  var MUZ = 7.10, TRN = { x: 1.30, z: 0.38 };
  function addTurret(B) {
    var s, i, j;
    loftN(B.paint, [tcore(-0.03, 0.06, 0.06), tcore(0.45, 0.0, 0.0), tcore(TH, 0.78, 0.10)]);
    loftN(B.paint, [tbustle(BZ, 0.04), tbustle(BZ + 0.06, 0.0), tbustle(TH - 0.04, 0.0), tbustle(TH, 0.06)]);
    /* the seam between the turret side and the side basket, the basket's ERA joints (P1) */
    for (s = -1; s <= 1; s += 2) {
      [-0.88, -1.60, -2.35].forEach(function (bx) {
        box(B.dark, bx - 0.012, bx + 0.012, s > 0 ? 1.40 : -1.405, s > 0 ? 1.405 : -1.40, BZ + 0.04, TH - 0.05);
      });
    }
    /* the mantlet in the gap between the cheeks (P3) */
    box(B.paint, 1.20, 1.62, -0.30, 0.30, 0.12, 0.60);
    box(B.dark, 1.62, 1.70, -0.22, 0.22, 0.20, 0.54);
    cylX(B.dark, 1.66, 1.82, 0, TRN.z, 0.16, 0.13, 14);
    /* coaxial MG port right of the gun */
    cylX(B.dark, 1.60, 1.74, -0.22, 0.28, 0.03, 0.03, 6);
    /* the 125 mm gun (P3, P4): thermal sleeve in sections with clamp bands, the evacuator at
       about 40 % of the exposed tube, the muzzle reference collar; muzzle 11.0 m from the tail
       (published "gun forward") */
    var g0 = 1.80, ev = g0 + 0.40 * (MUZ - g0);
    cylX(B.paint, g0, ev - 0.34, 0, TRN.z, 0.105, 0.098, 14);
    cylX(B.paint, ev - 0.34, ev - 0.22, 0, TRN.z, 0.098, 0.135, 14);
    cylX(B.paint, ev - 0.22, ev + 0.26, 0, TRN.z, 0.135, 0.135, 14);
    cylX(B.paint, ev + 0.26, ev + 0.38, 0, TRN.z, 0.135, 0.092, 14);
    cylX(B.paint, ev + 0.38, MUZ - 0.18, 0, TRN.z, 0.092, 0.084, 14);
    cylX(B.paint, MUZ - 0.18, MUZ, 0, TRN.z, 0.092, 0.092, 14);
    cylX(B.dark, MUZ - 0.005, MUZ + 0.005, 0, TRN.z, 0.065, 0.065, 10);
    [g0 + 0.60, g0 + 1.20, ev + 0.80, ev + 1.45, ev + 2.10].forEach(function (bx) { cylX(B.dark, bx - 0.025, bx + 0.025, 0, TRN.z, 0.11, 0.11, 14); });
    box(B.dark, MUZ - 0.13, MUZ - 0.04, -0.03, 0.03, TRN.z + 0.085, TRN.z + 0.14);

    /* --- roof (P3): the commander's tall panoramic sight on the left rear, his hatch in
       front of it; the gunner's sight box on the right front, his hatch behind it; the JD-3
       box behind the commander's hatch (published; NOT CONFIRMED in a photograph) --- */
    cylZ(B.paint, -0.55, 0.78, TH - 0.01, TH + 0.30, 0.13, 14);
    box(B.paint, -0.70, -0.40, 0.65, 0.91, TH + 0.30, TH + 0.52);
    box(B.dark, -0.40, -0.38, 0.69, 0.87, TH + 0.36, TH + 0.47);
    cylZ(B.paint, -0.05, 0.62, TH - 0.01, TH + 0.08, 0.30, 16);
    cylZ(B.paint, -0.05, 0.62, TH + 0.08, TH + 0.11, 0.24, 14);
    box(B.paint, 0.25, 0.62, -0.80, -0.42, TH - 0.02, TH + 0.30);
    box(B.dark, 0.62, 0.64, -0.75, -0.47, TH + 0.12, TH + 0.26);
    cylZ(B.paint, -0.30, -0.60, TH - 0.01, TH + 0.06, 0.28, 16);
    box(B.dark, -0.32, -0.28, -0.85, -0.35, TH + 0.06, TH + 0.075);
    box(B.paint, -0.92, -0.62, 0.10, 0.36, TH - 0.01, TH + 0.10);
    box(B.paint, -0.95, -0.59, 0.06, 0.40, TH + 0.10, TH + 0.30);
    box(B.dark, -0.59, -0.57, 0.12, 0.34, TH + 0.14, TH + 0.26);
    box(B.team, -2.70, -2.10, -0.40, 0.40, TH, TH + 0.015);
    /* lifting eyes on the cheek tops */
    for (s = -1; s <= 1; s += 2) box(B.dark, 0.30, 0.40, s * 1.05 - 0.03, s * 1.05 + 0.03, TH - 0.02, TH + 0.05);
    /* the cylinder behind the bustle on the left (P1) */
    cylX(B.paint, -3.25, -3.85, 0.85, 0.52, 0.22, 0.22, 14);
    cylX(B.dark, -3.85, -3.87, 0.85, 0.52, 0.17, 0.17, 12);

    /* --- smoke tubes (P1, P3; published twelve): two rows of three on each turret side,
       aimed forward, up and out --- */
    for (s = -1; s <= 1; s += 2) {
      var dir = unit([0.62, s * 0.38, 0.69]);
      box(B.dark, -0.78, -0.30, s > 0 ? 1.40 : -1.46, s > 0 ? 1.46 : -1.40, 0.18, 0.58);
      for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) {
        var A = [-0.70 + i * 0.15, s * (1.48 + j * 0.02), 0.26 + j * 0.16];
        cyl(B.dark, A, [A[0] + dir[0] * 0.26, A[1] + dir[1] * 0.26, A[2] + dir[2] * 0.26], 0.045, 0.045, 8);
      }
    }
  }
  /* the QJC-88 12.7 mm on the commander's hatch ring (published; seen on P5's ZTZ-99) */
  function addAaMg(B) {
    var mx = -0.05, my = 0.62, mz = TH + 0.11;
    box(B.dark, mx - 0.30, mx - 0.24, my - 0.03, my + 0.03, mz, mz + 0.30);
    box(B.dark, mx - 0.40, mx + 0.15, my - 0.06, my + 0.06, mz + 0.27, mz + 0.38);
    cylX(B.dark, mx + 0.15, mx + 1.05, my, mz + 0.33, 0.025, 0.022, 8);
    cylX(B.dark, mx + 1.00, mx + 1.10, my, mz + 0.33, 0.04, 0.04, 8);
    box(B.dark, mx - 0.20, mx + 0.02, my - 0.20, my - 0.06, mz + 0.18, mz + 0.34);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    g.name = "pla_e00_mbt";
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
    addAaMg(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e00_mbt"] = { len: 11.1, build: function (THREE, M, C) { return HeroPlaE00Mbt.build(THREE, M, C); } };
