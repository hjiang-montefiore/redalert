/* ============ pla_ground_modern.js - HERO models: modern PLA ground vehicles and missile launchers ============
   Keys registered here (rules.js / eras.js rows):
     hvy_c         "ZTZ-99A2 w/ GL5 APS"            - the ZTZ-99A hero of js/hero/pla_e00_mbt.js, called, its meshes
                                                       merged per material (no GL5 drawn: see below)
     pla_e00_sam   "HQ-9 on Taian TAS-5380"         - buildHq9("hq9"), one builder with a VARIANTS table
     sam_c         "HQ-9B on Taian TAS-5380"        - buildHq9("hq9b")
     pla_e00_tel   "DF-15B on a WS2400 TEL"         - buildDf15b
     tel_c         "DF-16 (CSS-11) on a 10x10 TEL"  - buildDf16
   Held, NOT registered (the generic models stay), each with its reason at the foot of the file:
     lt_c (ZTQ-15: photographs, but no published dimension to scale them by), atgmv_c (AFT-10: no photograph of the
     vehicle), pla_e60_sam (tracked HQ-2B: no photograph of the self-propelled launcher), pla_e90_tel (DF-15 / M-9:
     no photograph of the original round or its launcher), ewv_c and radarv_c (not attempted: no references fetched).

   References, Wikimedia Commons, fetched through thumb.php, cached in scratchpad/q_plagm_ref:
     H1  "HQ-9 Surface-to-air missiles 20170919.jpg" (1280) - Beijing Military Museum, an HQ-9 on the TAS-5380A
         (the type plate "TAS5380A" on the cab front), starboard front 3/4, canisters ERECTED: the full-width
         forward-control cab with two big windscreens either side of a centre pillar, the louvred grille panel with
         vertical slats and its grab handle, the headlamps low at the outer corners, amber lamps above them, the
         deep bumper with its lamps and the apron sloping back under it; the door with its window, the mirror on
         its arm; the louvred box on the cab roof's front; the tall equipment cabin behind the cab with its roof
         chamfered down to the cab; the front pair of axles under the rear of the cab, the long gap, the rear pair;
         the ladder on the side; the four canisters standing upright behind the vehicle in a 2 x 2 block, the
         lattice frame with X braces on the face toward the cab, the jacks.
     H2  "HQ-9 at the China's 60th anniversary parade.jpg" (1280) - 2009 parade, port front 3/4, canisters LAID
         FOR THE ROAD: 2 x 2, lying level over the deck, their domed caps forward against the back of the
         cabin, the lower row's caps a little behind the upper row's; the cabin's chamfered front roof; the beacon
         on the cab roof; four axles in two close pairs.
     H3  "HQ-9B surface-to-air missile 20250921.jpg" (1280) - HQ-9B, from behind, erected: the four canisters'
         banded bodies (eleven hoops), the domed bottoms standing just above the ground, the cap at the top, the
         ratio of canister width to length (0.87 : 7.2, measured 190 : 1580 px), the rear jacks on round feet.
     H4  "HQ-9B 20250921.jpg" (1280) - HQ-9B, starboard front 3/4, erected: the same truck and cabin as H1, the
         cabin's air-conditioner at its top front, the mast, the red beacon on the cab roof, and TWO CABLE DRUMS
         stacked on the cabin's starboard front corner (not on the HQ-9 of H1: the VARIANTS difference).
     D1  "Dongfeng-15B.JPG" (1280) - 2015 parade, port side, near side-on: THE MEASURING PHOTO for pla_e00_tel.
         The round lying on top in a trough of the body, the cab, the body, four axles, the folded launch table.
     T1  "DF-16 Ballistic Missile 20170919.jpg" (1280) - Beijing Military Museum, starboard front 3/4: the 10x10
         (two axles forward, three aft), the full-width crew cab with three side windows, the bar guards over the
         headlamps, the grille, the steps, the long rounded shell over the round, the louvred box behind the cab.
     T2  "Dongfeng-16.JPG" (1280) - 2015 parade, port side, near side-on (same street as D1): the measuring photo
         for tel_c.  Contrast lifted (gamma 0.5) to read it.
     Not used for geometry: "Type 15 tank 20221020.jpg", the video still in Category:Type 15 tank (its title is
     not ASCII), "VT-5 light tank of Bangladesh Army.jpg", "Red Arrow 10 Anti-tank missile.jpg" (the round only).
   Published: en.wikipedia "TA580/TAS5380": 11 m x 3 m x 3 m, 18 t empty.  en.wikipedia "WS2400": 11.44 x 3.05 x
     2.97 m.  en.wikipedia "DF-15": 9.1 m, 1.0 m diameter, 6,200 kg.  en.wikipedia "HQ-9": the round 6.8 m, first
     stage 700 mm.  en.wikipedia "Dongfeng (missile)" DF-16: "a 10x10 wheeled TEL ... a new protective shell to
     cover the missile" - no dimensions.  en.wikipedia "GL5 Active Protection System": four radars, two rockets a
     time; no photograph of it on any vehicle (and none on Commons, searched "GL5 active protection").

   Model space: +X nose, +Y left (port), +Z up, metres, ground at z = 0.  ASCII only.
   Materials (each build): paint (canvas texture, PLA green #525c3a, plain - no camouflage, stars, numbers or
   emblems, all of which the parade and museum vehicles wear), dark, glass, wheel (vertex colours), C.team (small
   strips), and on the HQ-9 a red for the canister caps and the beacon.
   ========================================================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaGroundModern = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 2015 };

  /* ------------------------------------------------------------ geometry kit (js/hero/pla_type63_apc.js's) */
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
  /* a closed solid; the signed volume turns the faces outward whatever order they came in; smooth: averaged normals */
  function solid(bin, V, F, Nv, smooth) {
    var vol = 0, i, f, a, b, c, fn, k, q, flip;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    flip = vol < 0;
    if (smooth) {
      Nv = [];
      for (i = 0; i < V.length; i++) Nv.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a])); q = [a, b, c];
        for (k = 0; k < 3; k++) { Nv[q[k]][0] += fn[0]; Nv[q[k]][1] += fn[1]; Nv[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < Nv.length; i++) Nv[i] = unit(Nv[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;
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
  /* a box on one side: s the side (+1 port), y the face, t the thickness outward */
  function sideBox(bin, s, y, t, x0, x1, z0, z1) { box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
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
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function bar(bin, A, B, r) { cyl(bin, A, B, r, r, 6); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L, smooth) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F, null, smooth);
  }
  /* a body of revolution about +X from a profile of [x, r] (r 0 at a pointed end) */
  function lathe(bin, prof, seg, y, z) {
    var V = [], F = [], n = prof.length, i, k, a, b, c, d;
    y = y || 0; z = z || 0;
    for (k = 0; k < n; k++) for (i = 0; i < seg; i++) {
      a = i / seg * TAU;
      V.push([prof[k][0], y + Math.cos(a) * prof[k][1], z + Math.sin(a) * prof[k][1]]);
    }
    for (k = 0; k + 1 < n; k++) for (i = 0; i < seg; i++) {
      a = k * seg + i; b = k * seg + (i + 1) % seg; c = (k + 1) * seg + (i + 1) % seg; d = (k + 1) * seg + i;
      F.push([a, b, c], [a, c, d]);
    }
    for (i = 1; i + 1 < seg; i++) { F.push([0, i + 1, i]); F.push([(n - 1) * seg, (n - 1) * seg + i, (n - 1) * seg + i + 1]); }
    solid(bin, V, F, null, true);
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
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1e2a30, roughness: 0.15, metalness: 0.4 });
    T.red = new THREE.MeshStandardMaterial({ color: 0x8c3b34, roughness: 0.6, metalness: 0.05 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             red: new Bin(T.red, false), team: new Bin(T.team, false) };
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

  /* ---------------------------------------------------------------- truck tyres
     the PHL-03 hero's lugged tyre profile (js/hero/pla_phl03.js), scaled to radius R and half width H: lug blocks
     staggered across the crown, a dished painted wheel, the hub on the outer face (s the side); the nut ring is left
     to the texture of the game's zoom (16 segments, about 420 triangles a tyre) */
  function rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }
  var TYRE = [0.11, 0.115, 0.12];
  function tyre(W, yc, s, R, H) {
    var N = 16, kr = R / 0.75, kh = H / 0.30;
    var P = [[-0.30, 0.47, 0, 0], [-0.30, 0.64, 0, 0], [-0.25, 0.73, 1, 0], [-0.10, 0.75, 1, 0], [-0.02, 0.75, 1, 1],
             [0.02, 0.75, 1, 0], [0.10, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.64, 0, 0], [0.30, 0.47, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = P.length, RIM = rgb(PAINT.base, 1.05), HUB = rgb(PAINT.base, 1.2);
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = P[i][1] * kr;
      if (P[i][2] && ((j + P[i][3]) % 2)) r -= 0.04 * kr;
      a = j / N * TAU;
      V.push([r * Math.cos(a), yc + P[i][0] * kh, r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + P[0][0] * kh, 0], [0, yc + P[m - 1][0] * kh, 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    W.col = TYRE;
    solid(W, V, F, null, true);
    W.col = RIM;
    cyl(W, [0, yc + s * 0.29 * kh, 0], [0, yc + s * 0.33 * kh, 0], 0.46 * kr, 0.40 * kr, 16, false);
    W.col = HUB;
    cylY(W, 0, yc + s * 0.33 * kh, yc + s * 0.40 * kh, 0, 0.17 * kr, 10);
  }
  /* one "roadwheel" group per axle, both wheels and the axle beam, origin on the axle centre */
  function addAxles(THREE, g, T, AX, R, H, TY) {
    var i, wg, W;
    for (i = 0; i < AX.length; i++) {
      W = new Bin(T.wheel, false, true);
      tyre(W, TY, 1, R, H);
      tyre(W, -TY, -1, R, H);
      W.col = [0.14, 0.15, 0.16];
      cylY(W, 0, -(TY - 0.25), TY - 0.25, 0, 0.11, 8);
      box(W, -0.20, 0.20, -0.28, 0.28, -0.18, 0.18);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, R);
      flush(THREE, wg, { wheel: W });
      g.add(wg);
    }
  }

  /* ======================================================================== hvy_c
     ZTZ-99A2 with the GL5.  POLICY 5: js/hero/pla_e00_mbt.js already draws the ZTZ-99A hull and turret, so its
     builder is called and nothing of it is copied.  What the reference search found to add: NOTHING.  The GL5's
     four radar panels and two-round launchers have no photograph on Commons, on a ZTZ-99 or anything else (the
     en.wikipedia "GL5 Active Protection System" article's only picture is a plain ZTZ-99), and no photograph of a
     "99A2" was found, so neither is drawn (POLICY 1).  The one change is mechanical: that builder hands back 297
     meshes, one per part; here they are merged per material inside the hull and inside "turret" (the only named
     node it has), which takes the draw calls to 9 without moving a vertex.  Its paint, its 7.6 m hull and its
     11.44 m over the gun are its own (see that file's header). */
  function mergeGroup(THREE, grp, keep) {
    var by = {}, order = [], rm = [];
    grp.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(grp.matrixWorld).invert(), m = new THREE.Matrix4();
    grp.traverse(function (o) {
      if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
      for (var p = o.parent; p && p !== grp; p = p.parent) if (keep(p)) return;
      if (o.material && o.material.isMaterial === true && !Array.isArray(o.material)) {
        var id = o.material.uuid;
        if (!by[id]) { by[id] = { mat: o.material, P: [], N: [], U: [], uv: false }; order.push(id); }
        var g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry, pa = g.attributes.position, na = g.attributes.normal, ua = g.attributes.uv;
        m.multiplyMatrices(inv, o.matrixWorld);
        var nm = new THREE.Matrix3().getNormalMatrix(m), v = new THREE.Vector3(), i, b = by[id];
        for (i = 0; i < pa.count; i++) {
          v.fromBufferAttribute(pa, i).applyMatrix4(m); b.P.push(v.x, v.y, v.z);
          if (na) { v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize(); b.N.push(v.x, v.y, v.z); } else b.N.push(0, 0, 1);
          if (ua) { b.U.push(ua.getX(i), ua.getY(i)); b.uv = true; } else b.U.push(0, 0);
        }
        rm.push(o);
      }
    });
    rm.forEach(function (o) { o.parent.remove(o); });
    order.forEach(function (id) {
      var b = by[id], geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.uv) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      var mesh = new THREE.Mesh(geo, b.mat);
      mesh.castShadow = mesh.receiveShadow = true;
      grp.add(mesh);
    });
    /* drop the groups the merge emptied (the builder's part holders) */
    var empty = [];
    grp.traverse(function (o) { if (o !== grp && !o.isMesh && !keep(o) && o.children.length === 0 && o.type === "Group") empty.push(o); });
    empty.forEach(function (o) { if (o.parent) o.parent.remove(o); });
  }
  function buildHvyC(THREE, M, C) {
    var root = HeroPlaE00Mbt.build(THREE, M, C), tur = null;
    root.traverse(function (o) { if (!tur && o.name === "turret") tur = o; });
    if (tur) mergeGroup(THREE, tur, function () { return false; });
    mergeGroup(THREE, root, function (p) { return p.name === "turret"; });
    root.name = "hvy_c";
    return root;
  }

  /* ======================================================================== HQ-9 / HQ-9B on the Taian TAS-5380
     Recognition list (what makes it read, and its source):
       1. ONE full-width flat-fronted forward-control cab well ahead of the first axle, two big windscreens, the
          slatted grille panel between the headlamps, the deep bumper - H1, H2, H4: hq9Cab.
       2. The tall equipment cabin behind the cab, its roof chamfered down at the front - H1, H2, H4: hq9Body.
       3. Four canisters in a 2 x 2 block lying over the rear, caps forward against the cabin - H2: travel pose.
       4. Set up, the block stood upright at the rear, the lattice with X braces facing the cab - H1, H3, H4.
       5. Eight wheels in two close pairs with the long gap between - H1, H2, H4: AX.
       6. HQ-9B only: the two cable drums on the cabin's starboard front corner - H4 (absent in H1): VARIANTS.
     Scale and stations.  There is no side-on photograph of the launcher on Commons, only three-quarter views,
     and a perspective solve off them (tyre heights as the depth cue) did not hold together, so the stations are
     judgement calls set to the published 11 m truck: bumper to first axle 2.40 m (H1: the first axle under the
     cab's rear wall, the cab and its bumper wholly ahead of it), pairs 1.45 m (H1, H4: the tyres of a pair close
     together), the middle gap 4.40 m and the rear overhang 1.30 m (H1, H2: the frame ends a little behind the last
     axle).  The tyre is 1.13 m: H1 measures the cab's rear corner at 2.66 tyre heights over the ground, and the
     published 3 m is taken as the cab roof.  The canister: 7.20 x 0.87 m, its ratio measured off H3 (190 : 1580
     px) and its length set just over the published 6.8 m round.  Laid for the road its tail stands 0.20 m behind
     the frame (H2: about level with it) and its cap then reaches 4.05 m behind the bumper; the cabin is drawn up to
     there (H2: the caps against its back).
     NOT CONFIRMED: every station above; the tyre; the track (2.36 m); the cab's floor (1.05 m) and the cabin's
     length (1.55 m: H1 and H4 make it look longer than the canisters leave room for, which is not resolved); the
     canister rows' heights (lower axis 1.92, upper 2.92: H2's upper row just over the cab roof); the 1.00 m pitch
     of the block both ways; the jacks (four: H1 shows one behind the second axle, H3 two at the rear corners); the
     drums' size.
     SET UP (H1, H3, H4): the block stands upright BEHIND the frame, the lattice face toward the cab a few
     centimetres behind the frame's rear beam (H1: the lattice directly over the rear beam's line), the domed
     bottoms a hand's width off the ground (H1, H3: about 0.2 m; drawn 0.20), the caps at 7.48 m.  The set-up
     silhouette is therefore 1.94 m longer than the travelling one (13.16 m); len stays the travelling 11.22.
     The hinge is NOT CONFIRMED: no photograph shows it or the block part-way up.  It is put on the rear beam
     (x -5.50, z 1.36, the deck), the only place from which a block lying on the deck with its tails 0.20 m behind
     the frame can swing up to stand where H1 shows it; the brackets drawn there and the two rams from the deck to
     the lattice (H1 shows one bar running up from the deck to the block) are NOT CONFIRMED in size or place.
     How it swings between the two poses is not drawn (it is shown at its two ends).
     Poses: "travelpose" (block lying on its lattice, pivot brackets, jacks up) and "deploypose" (block upright,
     jacks down); nothing is "turret" (the block never trains: H1, H3) and nothing "podelev".  Four "roadwheel" groups, one per axle.
     Paint: plain PLA green; H1 wears woodland, H2 navy digital, H3 and H4 desert digital: none drawn. */
  var VARIANTS = {
    hq9:  { id: "pla_e00_sam", drums: false },   /* H1, H2: no drums on the cabin */
    hq9b: { id: "sam_c", drums: true }           /* H4: two cable drums on the starboard front corner */
  };
  var Q = {
    XB: 5.50, XN: 5.38, XC0: 3.02, XK: 1.47, XT: -5.50, AX: [3.10, 1.65, -2.75, -4.20],
    RT: 0.565, TH: 0.20, TY: 1.18, CW: 1.45, ZF: 1.05, ZC: 3.00, ZK: 1.36,
    CL: 7.20, CR: 0.435, CP: 1.00, ZLO: 1.92, ZUP: 2.92, TAIL: -5.70
  };
  function hq9Cab(B) {
    var s, k, y, XN = Q.XN, XC0 = Q.XC0, CW = Q.CW, ZF = Q.ZF, ZC = Q.ZC, ZW = 2.02, a0 = Q.AX[0];
    /* the cab, side profile: upright front, the windscreen leaning back a little, the roof, the rear wall (H1) */
    prismY(B.paint, [[XC0, ZF + 0.35], [XC0, ZC], [XN - 0.16, ZC], [XN - 0.06, ZW], [XN, 1.70], [XN, ZF], [a0 + 0.62, ZF]], -CW, CW);
    /* the arch over the first axle cut into the cab's rear lower corner: a dark wheel box behind it */
    box(B.dark, a0 - 0.62, a0 + 0.62, -CW + 0.30, CW - 0.30, ZF - 0.05, ZF + 0.35);
    /* the windscreens: two panes either side of the centre pillar, the wipers (H1) */
    var ang = Math.atan2(0.10, ZC - 0.08 - ZW), U = [-Math.sin(ang), 0, Math.cos(ang)], Nn = [Math.cos(ang), 0, Math.sin(ang)], L = (ZC - 0.10 - ZW) / Math.cos(ang);
    for (s = -1; s <= 1; s += 2) {
      var c = [XN - 0.06 - Math.sin(ang) * L * 0.5 + 0.02, s * 0.70, ZW + L * 0.5 * Math.cos(ang)];
      slab(B.glass, c, U, [0, 1, 0], Nn, L * 0.5 - 0.05, 0.62, 0.02);
      bar(B.dark, [XN - 0.02, s * 0.25, ZW + 0.08], [XN - 0.05, s * 0.95, ZW + 0.30], 0.02);
    }
    box(B.dark, XN - 0.11, XN - 0.03, -0.05, 0.05, ZW, ZC - 0.05);
    /* the grille panel with its vertical slats and grab handle, between the headlamps (H1) */
    box(B.dark, XN, XN + 0.02, -0.78, 0.78, 1.52, 1.96);
    for (k = 0; k < 12; k++) { y = -0.70 + k * 0.127; box(B.paint, XN + 0.01, XN + 0.05, y - 0.025, y + 0.025, 1.55, 1.93); }
    bar(B.dark, [XN + 0.08, -0.18, 1.62], [XN + 0.08, 0.18, 1.62], 0.02);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, XN, XN + 0.03, s * 1.20 - 0.15, s * 1.20 + 0.15, 1.42, 1.56);           /* headlamps */
      box(B.red, XN, XN + 0.03, s * 1.30 - 0.06, s * 1.30 + 0.06, 1.66, 1.80);             /* amber lamps */
      /* the mirror on its arm at the front corner (H1, H4) */
      bar(B.dark, [XN - 0.25, s * CW, 2.70], [XN - 0.05, s * (CW + 0.22), 2.75], 0.03);
      box(B.dark, XN - 0.10, XN, s * (CW + 0.14), s * (CW + 0.30), 2.25, 2.72);
      /* the door: seam field, window, handle, the step under it (H1, H4) */
      sideBox(B.dark, s, CW, 0.012, 3.55, 4.75, ZF + 0.08, 2.80);
      sideBox(B.paint, s, CW + 0.012, 0.012, 3.58, 4.72, ZF + 0.11, 2.77);
      sideBox(B.glass, s, CW + 0.024, 0.01, 3.80, 4.70, 2.10, 2.72);
      sideBox(B.dark, s, CW + 0.024, 0.03, 3.62, 3.72, 1.82, 1.86);
      sideBox(B.dark, s, CW, 0.12, 3.70, 4.40, 0.62, 0.66);
      sideBox(B.dark, s, CW, 0.12, 3.70, 4.40, 0.86, 0.90);
      /* the team strip high on the cab side, behind the door */
      sideBox(B.team, s, CW, 0.015, 3.10, 3.48, 2.55, 2.68);
    }
    /* the deep bumper, its lamps, and the apron sloping back under it (H1) */
    prismY(B.paint, [[XN - 0.05, ZF], [XN - 0.05, 1.38], [Q.XB, 1.38], [Q.XB, 1.08], [XN - 0.30, 0.66], [XN - 0.70, 0.66]], -1.40, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(B.red, Q.XB - 0.02, Q.XB + 0.01, s * 1.05 - 0.10, s * 1.05 + 0.10, 1.18, 1.27);
      box(B.dark, Q.XB - 0.02, Q.XB + 0.02, s * 0.35 - 0.12, s * 0.35 + 0.12, 1.16, 1.28);
    }
    /* the louvred box on the cab roof's front (H1, H4), and the beacon (H2, H4) */
    box(B.paint, XN - 1.40, XN - 0.40, -0.72, 0.72, ZC, ZC + 0.22);
    for (k = 0; k < 6; k++) box(B.dark, XN - 0.39, XN - 0.37, -0.62 + k * 0.22, -0.48 + k * 0.22, ZC + 0.05, ZC + 0.18);
    cylZ(B.red, XN - 0.30, 1.15, ZC, ZC + 0.18, 0.08, 10);
  }
  function hq9Body(B, V) {
    var s, k, XC0 = Q.XC0, XK = Q.XK, XT = Q.XT, ZK = Q.ZK, A = Q.AX;
    /* frame rails, the spring seats over the axles, the rear beam (H1) */
    box(B.dark, XT, XC0, -0.55, 0.55, 0.92, ZK - 0.06);
    for (k = 0; k < 4; k++) box(B.dark, A[k] - 0.16, A[k] + 0.16, -0.55, 0.55, 0.62, 0.92);
    box(B.dark, XT, XT + 0.18, -1.40, 1.40, 0.95, ZK);
    /* the equipment cabin: its roof chamfered down to the cab at the front, a door and louvres on each side (H1, H2, H4) */
    prismY(B.paint, [[XK, 1.30], [XK, 3.10], [XC0 - 0.62, 3.10], [XC0 - 0.02, 2.62], [XC0 - 0.02, 1.30]], -1.42, 1.42);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, 1.42, 0.012, XK + 0.25, XK + 0.95, 1.45, 2.85);
      sideBox(B.paint, s, 1.432, 0.012, XK + 0.28, XK + 0.92, 1.48, 2.82);
      sideBox(B.dark, s, 1.444, 0.03, XK + 0.80, XK + 0.86, 2.05, 2.25);
      for (k = 0; k < 6; k++) sideBox(B.dark, s, 1.42, 0.02, XK + 1.05, XK + 1.40, 1.70 + k * 0.08, 1.73 + k * 0.08);
      sideBox(B.team, s, 1.42, 0.015, XK + 0.10, XK + 0.22, 2.60, 3.00);
    }
    /* the mast stub at the cabin's rear corner (H1, H4) */
    cylZ(B.dark, XK + 0.12, 1.20, 3.10, 3.80, 0.04, 8);
    /* HQ-9B: two cable drums stacked on the starboard front corner, axis across (H4) */
    if (V.drums) for (k = 0; k < 2; k++) {
      cylY(B.dark, XC0 - 0.40, -1.42, -1.70, 1.85 + k * 0.62, 0.28, 16);
      cylY(B.paint, XC0 - 0.40, -1.70, -1.74, 1.85 + k * 0.62, 0.30, 16);
      cylY(B.dark, XC0 - 0.40, -1.74, -1.78, 1.85 + k * 0.62, 0.10, 8);
    }
    /* the deck over the rear, the fenders over the rear pair, the lockers between the pairs, the ladder (H1, H4) */
    box(B.paint, XT + 0.10, XK, -1.40, 1.40, ZK - 0.06, ZK);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.95 : -1.45, y1 = s > 0 ? 1.45 : -0.95;
      box(B.paint, A[3] - 0.80, A[2] + 0.80, y0, y1, 1.28, 1.34);
      box(B.paint, A[2] + 0.80, A[2] + 0.86, y0, y1, 0.90, 1.34);
      box(B.paint, A[3] - 0.86, A[3] - 0.80, y0, y1, 0.90, 1.34);
      box(B.paint, A[2] + 0.95, A[1] - 0.80, s > 0 ? 0.60 : -1.40, s > 0 ? 1.40 : -0.60, 0.70, 1.30);
      for (k = 0; k < 3; k++) sideBox(B.dark, s, 1.40, 0.015, A[2] + 1.05 + k * 0.85, A[2] + 1.80 + k * 0.85, 0.78, 1.22);
      box(B.dark, A[1] - 0.80, A[1] - 0.70, s > 0 ? 0.95 : -1.45, s > 0 ? 1.45 : -0.95, 0.45, 1.30);
      box(B.dark, A[2] + 0.80, A[2] + 0.90, s > 0 ? 0.95 : -1.45, s > 0 ? 1.45 : -0.95, 0.45, 1.30);
      /* the ladder up to the deck behind the cabin (H1) */
      box(B.dark, XK - 0.42, XK - 0.39, s * 1.44, s * 1.47, 0.55, ZK);
      box(B.dark, XK - 0.10, XK - 0.07, s * 1.44, s * 1.47, 0.55, ZK);
      for (k = 0; k < 3; k++) box(B.dark, XK - 0.42, XK - 0.07, s * 1.44, s * 1.47, 0.70 + k * 0.22, 0.73 + k * 0.22);
      box(B.red, XT - 0.02, XT, s * 1.25 - 0.08, s * 1.25 + 0.08, 1.10, 1.22);                  /* tail lamps */
    }
  }
  /* the jack housings, four: behind the second axle (H1) and at the rear corners (H3); down sets the rams */
  function hq9Jacks(B, down) {
    var s, k, J = [[Q.AX[1] - 0.95, 1.30], [Q.XT + 0.35, 1.10]];
    for (k = 0; k < 2; k++) for (s = -1; s <= 1; s += 2) {
      var x = J[k][0], y = s * J[k][1];
      cylZ(B.paint, x, y, 0.85, 1.30, 0.11, 10);
      if (down) {
        cylZ(B.dark, x, y, 0.06, 0.85, 0.065, 8);
        cylZ(B.dark, x, y, 0.0, 0.06, 0.24, 14);
      } else {
        cylZ(B.dark, x, y, 0.70, 0.85, 0.065, 8);
        cylZ(B.dark, x, y, 0.64, 0.70, 0.22, 14);
      }
    }
  }
  /* one canister, along local +x from its tail (0) to its cap (CL): banded body, domed tail, red frangible cap (H1-H4) */
  function canister(B, y, z, rot) {
    var k, L = Q.CL, R = Q.CR, prof = [], i, a, P = function (p) { return rot(p[0], y + p[1], z + p[2]); };
    /* the body and its domed tail, as a lathe in the block's frame */
    for (i = 0; i <= 4; i++) { a = i / 4 * Math.PI / 2; prof.push([0.24 * (1 - Math.cos(a)), R * Math.sin(a) + 0.001]); }
    prof.push([L - 0.08, R]);
    var seg = 14, V = [], F = [], n = prof.length, b, c, d;
    for (k = 0; k < n; k++) for (i = 0; i < seg; i++) {
      a = i / seg * TAU;
      V.push(P([prof[k][0], Math.cos(a) * prof[k][1], Math.sin(a) * prof[k][1]]));
    }
    for (k = 0; k + 1 < n; k++) for (i = 0; i < seg; i++) {
      a = k * seg + i; b = k * seg + (i + 1) % seg; c = (k + 1) * seg + (i + 1) % seg; d = (k + 1) * seg + i;
      F.push([a, b, c], [a, c, d]);
    }
    for (i = 1; i + 1 < seg; i++) { F.push([0, i + 1, i]); F.push([(n - 1) * seg, (n - 1) * seg + i, (n - 1) * seg + i + 1]); }
    solid(B.paint, V, F, null, true);
    /* eleven hoops (H3), the two lifting bands with lugs (H3, H4) */
    for (k = 0; k < 11; k++) {
      var x = 0.45 + k * 0.62;
      cyl(B.paint, P([x, 0, 0]), P([x + 0.07, 0, 0]), R + 0.03, R + 0.03, 12, false);
    }
    /* the cap: a low red dome on a rim (H1, H3, H4) */
    cyl(B.paint, P([L - 0.10, 0, 0]), P([L - 0.02, 0, 0]), R + 0.04, R + 0.04, 14, false);
    cyl(B.red, P([L - 0.02, 0, 0]), P([L + 0.08, 0, 0]), R + 0.02, R - 0.12, 14, false);
  }
  /* the block: 2 x 2 canisters about the block axis (local +x along the canisters), the lattice frame on the face
     toward the cab (local -z when laid), its X braces (H1) */
  function hq9Block(B, rot) {
    var r, c, h = Q.CP / 2, L = Q.CL, k;
    for (r = -1; r <= 1; r += 2) for (c = -1; c <= 1; c += 2) canister(B, c * h, r * h, rot);
    function bx(x0, x1, y0, y1, z0, z1, bin) {
      var P = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
      hexa(bin || B.paint, P.map(function (p) { return rot(p[0], p[1], p[2]); }));
    }
    /* the lattice on the face between the rows and the frame: stiles and rails, X braces in its bays (H1) */
    var zf = -h - Q.CR - 0.10;
    for (c = -1; c <= 1; c += 2) bx(0.30, L - 0.40, c * 0.98, c * 0.98 + c * 0.10, zf - 0.08, zf + 0.06);
    for (k = 0; k < 5; k++) bx(0.40 + k * 1.55, 0.52 + k * 1.55, -1.06, 1.06, zf - 0.08, zf + 0.06);
    for (k = 0; k < 4; k++) {
      var x0 = 0.52 + k * 1.55, x1 = 0.40 + (k + 1) * 1.55;
      var A = rot(x0, -0.95, zf), Bp = rot(x1, 0.95, zf), C2 = rot(x0, 0.95, zf), D2 = rot(x1, -0.95, zf);
      bar(B.paint, A, Bp, 0.04); bar(B.paint, C2, D2, 0.04);
    }
    /* the clamp frames round the block at two stations (H1, H4) */
    for (k = 0; k < 2; k++) {
      var x = [2.30, 5.10][k];
      bx(x, x + 0.14, -1.02, 1.02, h + Q.CR - 0.02, h + Q.CR + 0.08, B.dark);
      for (c = -1; c <= 1; c += 2) bx(x, x + 0.14, c * 0.94, c * 1.02, zf, h + Q.CR + 0.08, B.dark);
    }
    /* the team strip on the frame's top rail */
    bx(3.40, 4.00, -0.15, 0.15, h + Q.CR + 0.08, h + Q.CR + 0.10, B.team);
  }
  function buildHq9(THREE, C, which) {
    var V = VARIANTS[which], T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TV = bins(T), DP = bins(T), trv, dep, s;
    hq9Cab(HB);
    hq9Body(HB, V);
    flush(THREE, g, HB);
    addAxles(THREE, g, T, Q.AX, Q.RT, Q.TH, Q.TY);
    /* travel: lying level, tails 0.20 m behind the frame, caps against the cabin, the lower row's axis at 1.92, the
       lattice under the block on the deck (it faces the cab once the block is up); the rear pivot brackets (H2) */
    var zc = (Q.ZLO + Q.ZUP) / 2;
    hq9Block(TV, function (x, y, z) { return [Q.TAIL + x, y, zc + z]; });
    for (s = -1; s <= 1; s += 2) box(TV.dark, Q.XT + 0.25, Q.XT + 0.65, s * 0.70, s * 0.95, Q.ZK, Q.ZLO - 0.10);
    hq9Jacks(TV, false);
    trv = new THREE.Group(); trv.name = "travelpose";
    flush(THREE, trv, TV);
    /* set up (H1, H3): the block upright behind the frame, the lattice toward the cab just behind the rear beam,
       bottoms 0.20 m off the ground; the hinge brackets on the rear beam and the rams from the deck to the lattice
       (NOT CONFIRMED, see above); jacks down */
    var xc = Q.XT - 0.05 - (Q.CP / 2 + Q.CR + 0.18), z0 = 0.20, xl = xc + Q.CP / 2 + Q.CR + 0.18;
    hq9Block(DP, function (x, y, z) { return [xc - z, y, z0 + x]; });
    for (s = -1; s <= 1; s += 2) {
      box(DP.dark, Q.XT - 0.12, Q.XT + 0.10, s * 0.70, s * 0.90, Q.ZK - 0.30, Q.ZK + 0.12);
      cylY(DP.dark, Q.XT - 0.05, s * 0.66, s * 0.94, Q.ZK, 0.08, 10);
      cyl(DP.dark, [Q.XT + 1.60, s * 0.45, Q.ZK + 0.05], [xl + 0.02, s * 0.45, 3.40], 0.11, 0.11, 10);
      cyl(DP.dark, [xl + 0.02, s * 0.45, 3.40], [xl, s * 0.45, 4.20], 0.07, 0.07, 8);
    }
    hq9Jacks(DP, true);
    dep = new THREE.Group(); dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    g.add(trv); g.add(dep);
    g.name = V.id;
    return g;
  }

  /* ======================================================================== DF-15B on the WS2400 (pla_e00_tel)
     Recognition list:
       1. The round lying on top, its long cone forward over the cab's rear, four small control fins on the
          re-entry vehicle, four tail fins in "+" at the rear - D1: df15Round.
       2. The full-width cab with its rounded top corners, a window in the door and one behind it, the rack and
          the beacon dome on the roof, the arch cut diagonally into its rear lower corner over the first axle -
          D1: df15Cab.
       3. The long flat-sided body behind the cab, as tall as the cab, the round in a trough in its top; the
          louvres at its front, the hatch with its round port - D1: df15Body.
       4. 8x8: the rear pair closer than the front pair (1.50 m against 2.20 m), the long gap - D1: AX.
       5. The launch table folded up behind the round's tail - D1: df15Body.
     MEASURED off D1 (port side, the front a little nearer the camera).  Local scale along the hull taken as
     linear in image x, set by the tyres (radius 57 px at the rear axle, 65 px at the second) and by the round:
     tip (x 1005) to its tail at the table (x 90) = the published 9.1 m.  That makes the vehicle 11.36 m from the
     bumper (x 1185) to the folded table (x 25) - the published WS2400 is 11.44 m, so the two published figures
     agree to 1% - and the tyre radius 0.62 m at both axles.  Stations from the bumper: first axle 2.24, second
     4.44, third 8.02, fourth 9.52; cab front face 0.40, cab rear 2.34; the body's rear end 10.51.  Heights at the
     local scale over the ground line: cab roof 2.79, its roof rack 2.96 (published 2.97), the door window 2.12-
     2.59, the cab side's foot 1.08; the body's top edge 2.85, its foot 1.39; the round's top 3.22 at x 150 rising
     to 3.80 at x 700: it lies 4 degrees nose-up on the travel saddle (the body's top edge rises only 0.14 m over
     the same run, so this is not the camera).  The round's diameter reads 0.80 m (the published 1.0 m is the
     DF-15's; both are given, the measurement drawn): rule 2, the two published lengths agree with each other.
     NOT CONFIRMED: the track (2.38 m) and tyre width; the cab's width (2.90 m) and its front, which D1 does not
     show (the grille and lamps are left out, the bumper box and the windscreen drawn plain); the body's width; the
     hidden side; the erector (a beam under the round is drawn so it has something to stand on when raised - D1
     shows only the clamp band); the hinge (placed so the round stands upright over the table); the jacks (D1
     shows two posts at the rear; drawn raised).  Not drawn: anything under the body between the axles.
     Nodes: four "roadwheel" groups; "podelev" (round and erector, hinged at x -5.30, z 2.45; userData.el 86
     degrees, so the round, lying 4 degrees nose-up, stands upright; userData.cells puts the flash at the tail).
     No "turret" (turret:false), no deploy poses (the jacks are not seen set). */
  var F15 = {
    XB: 5.70, XN: 5.30, XC0: 3.36, XT: -5.66, AX: [3.46, 1.26, -2.32, -3.82], RT: 0.62, TH: 0.24, TY: 1.19,
    CW: 1.45, ZC: 2.79, ZF: 1.08, BW: 1.45, ZB: 2.85, ZBF: 1.39,
    HX: -5.30, HZ: 2.45, PITCH: 4.0, MR: 0.40, MT: -4.92, MN: 4.18
  };
  function df15Cab(B) {
    var s, k, F = F15, XN = F.XN, XC0 = F.XC0, CW = F.CW, a0 = F.AX[0];
    /* side profile: the arch cut diagonally from the rear wall down to the foot ahead of the axle (D1), the front
       face leaning back 0.13 m over its height, the rounded top corners */
    prismY(B.paint, [[XC0, 1.52], [XC0, F.ZC - 0.12], [XC0 + 0.12, F.ZC], [XN - 0.25, F.ZC], [XN - 0.12, F.ZC - 0.10],
                     [XN, 1.60], [XN, F.ZF], [4.06, F.ZF]], -CW, CW);
    box(B.dark, a0 - 0.66, 4.06, -CW + 0.30, CW - 0.30, 0.95, 1.52);
    /* the bumper box under the front (D1: it stands 0.4 m proud of the face, 1.15-1.57 m) */
    box(B.paint, XN - 0.05, F.XB, -1.40, 1.40, 1.15, 1.57);
    for (s = -1; s <= 1; s += 2) {
      box(B.red, F.XB - 0.02, F.XB + 0.01, s * 1.15 - 0.08, s * 1.15 + 0.08, 1.40, 1.52);
      box(B.glass, F.XB - 0.02, F.XB + 0.01, s * 0.75 - 0.14, s * 0.75 + 0.14, 1.25, 1.42);
    }
    /* the windscreen, plain (D1 does not show the front) */
    var ang = Math.atan2(0.12, 0.95);
    slab(B.glass, [XN - 0.07, 0, 2.18], [-Math.sin(ang), 0, Math.cos(ang)], [0, 1, 0], [Math.cos(ang), 0, Math.sin(ang)], 0.40, CW - 0.12, 0.02);
    for (s = -1; s <= 1; s += 2) {
      /* the windows: one behind (3.50-4.30) and the door's (4.60-5.15), the door seams, the handle (D1) */
      sideBox(B.dark, s, CW, 0.012, 3.48, 4.32, 2.17, 2.64);
      sideBox(B.glass, s, CW + 0.012, 0.01, 3.52, 4.28, 2.20, 2.61);
      sideBox(B.dark, s, CW, 0.012, 4.58, 5.17, 2.10, 2.61);
      sideBox(B.glass, s, CW + 0.012, 0.01, 4.62, 5.13, 2.14, 2.57);
      sideBox(B.dark, s, CW, 0.012, 4.42, 4.44, 1.15, 2.70);
      sideBox(B.dark, s, CW, 0.012, 5.20, 5.22, 1.15, 2.70);
      sideBox(B.dark, s, CW + 0.012, 0.03, 4.50, 4.62, 1.90, 1.94);
      sideBox(B.dark, s, CW, 0.012, 4.10, 5.25, 1.22, 1.24);
      /* the mirror frame on its bracket at the front corner (D1: x 1140-1190) */
      bar(B.dark, [XN - 0.10, s * CW, 2.55], [XN + 0.08, s * (CW + 0.18), 2.60], 0.025);
      bar(B.dark, [XN + 0.08, s * (CW + 0.18), 2.60], [XN + 0.08, s * (CW + 0.18), 2.00], 0.02);
      box(B.dark, XN + 0.03, XN + 0.12, s * (CW + 0.12), s * (CW + 0.26), 2.05, 2.45);
      /* steps under the door */
      for (k = 0; k < 2; k++) sideBox(B.dark, s, CW - 0.10, 0.12, 4.50, 5.10, 0.62 + k * 0.25, 0.66 + k * 0.25);
      /* the team strip on the cab side under the rear window */
      sideBox(B.team, s, CW, 0.015, 3.55, 4.25, 1.98, 2.08);
    }
    /* the roof: the low rack over the front half (D1: 4.20-5.20, to 2.96 m), the beacon dome at its rear (D1) */
    for (s = -1; s <= 1; s += 2) box(B.dark, 4.20, 5.20, s * 1.10 - 0.04, s * 1.10 + 0.04, F.ZC, 2.96);
    box(B.dark, 4.20, 4.28, -1.10, 1.10, 2.90, 2.96);
    box(B.dark, 5.12, 5.20, -1.10, 1.10, 2.90, 2.96);
    box(B.paint, 4.35, 5.05, -0.70, 0.70, F.ZC, 2.90);
    cylZ(B.dark, 3.80, 0.0, F.ZC, F.ZC + 0.05, 0.16, 12);
    cyl(B.dark, [3.80, 0, F.ZC + 0.05], [3.80, 0, F.ZC + 0.17], 0.15, 0.08, 12);
  }
  function df15Body(B) {
    var s, k, F = F15, A = F.AX, x0 = -4.81, x1 = F.XC0 - 0.08, yi = 0.55;
    /* the frame under it, the spring seats */
    box(B.dark, F.XT + 0.10, F.XC0, -0.55, 0.55, 0.95, F.ZBF);
    for (k = 0; k < 4; k++) box(B.dark, A[k] - 0.16, A[k] + 0.16, -0.55, 0.55, 0.66, 0.95);
    /* the two side bodies either side of the trough, and the trough floor (D1: the round's lower half hidden) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, x0, x1, s > 0 ? yi : -F.BW, s > 0 ? F.BW : -yi, F.ZBF, F.ZB);
      /* the hatch with its round port (D1: x 400-545, port at 505) */
      sideBox(B.dark, s, F.BW, 0.012, -1.62, -0.20, 1.55, 2.72);
      sideBox(B.paint, s, F.BW + 0.012, 0.012, -1.58, -0.24, 1.58, 2.69);
      cyl(B.dark, [-0.55, s * (F.BW + 0.02), 1.97], [-0.55, s * (F.BW + 0.05), 1.97], 0.13, 0.13, 12);
      /* the louvre panels toward the front (D1: x 760-830) and the grille strip by the cab (x 885-900) */
      for (k = 0; k < 8; k++) sideBox(B.dark, s, F.BW, 0.02, 1.98 + k * 0.08, 2.02 + k * 0.08, 1.90, 2.60);
      for (k = 0; k < 9; k++) sideBox(B.dark, s, F.BW, 0.02, 3.05, 3.24, 1.60 + k * 0.12, 1.64 + k * 0.12);
      /* panel seams */
      [-3.30, -1.90, 0.60, 1.85].forEach(function (x) { sideBox(B.dark, s, F.BW, 0.01, x - 0.01, x + 0.01, F.ZBF + 0.05, F.ZB - 0.05); });
      /* the fender lips over each wheel (the body's foot runs over the tyres) */
      for (k = 1; k < 4; k++) sideBox(B.dark, s, F.BW, 0.03, A[k] - 0.70, A[k] + 0.70, F.ZBF - 0.04, F.ZBF);
      /* the extinguisher on the body's front corner (D1) */
      cylZ(B.red, F.XC0 - 0.12, s * (F.BW + 0.08), 1.70, 2.20, 0.07, 8);
      /* the team strip along the body top */
      sideBox(B.team, s, F.BW, 0.015, -3.80, -2.80, F.ZB - 0.14, F.ZB - 0.04);
    }
    box(B.paint, x0, x1, -yi, yi, F.ZBF, 2.30);
    box(B.paint, x0, x0 + 0.10, -F.BW, F.BW, F.ZBF, F.ZB);
    /* the front saddle the round's cone rests on (D1: x 780-810, from the body top to the round's underside) */
    for (s = -1; s <= 1; s += 2) box(B.paint, 2.15, 2.40, s * 0.10, s * 0.40, 2.30, 3.05);
    box(B.dark, 2.10, 2.45, -0.42, 0.42, 3.00, 3.08);
    /* the rear: the frame end, the launch table folded up on its frame behind the round's tail, the two jack
       posts raised at the corners (D1: x 20-110) */
    box(B.dark, F.XT, x0, -1.20, 1.20, 1.00, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, F.XT + 0.06, x0, s * 0.62, s * 0.74, 1.40, 2.95);
      cylZ(B.paint, F.XT + 0.30, s * 1.15, 0.80, 2.10, 0.09, 8);
      cylZ(B.dark, F.XT + 0.30, s * 1.15, 0.62, 0.80, 0.06, 8);
      cylZ(B.dark, F.XT + 0.30, s * 1.15, 0.56, 0.62, 0.20, 12);
      box(B.red, F.XT - 0.01, F.XT + 0.02, s * 1.00 - 0.07, s * 1.00 + 0.07, 1.10, 1.22);
    }
    box(B.paint, F.XT + 0.06, x0, -0.74, 0.74, 2.83, 2.95);
    cylX(B.paint, F.XT + 0.02, F.XT + 0.12, 0, 2.55, 0.45, 18);
    cylX(B.dark, F.XT, F.XT + 0.02, 0, 2.55, 0.30, 14);
    /* the rear fenders' upright plates */
    for (s = -1; s <= 1; s += 2) box(B.paint, -4.60, -4.55, s > 0 ? 0.95 : -1.45, s > 0 ? 1.45 : -0.95, 0.70, F.ZBF);
  }
  /* the round in the podelev frame (origin on the hinge): lying 4 degrees nose-up, tail at MT, tip at MN */
  function df15Round(B) {
    var F = F15, p = F.PITCH * D2R, cp = Math.cos(p), sp = Math.sin(p), zt = 2.85 - F.HZ, xt = F.MT - F.HX, k, s, i;
    function P(x, y, z) { return [xt + x * cp - z * sp, y, zt + x * sp + z * cp]; }
    var L = F.MN - F.MT, R = F.MR, prof = [[0, R * 0.92], [0.06, R], [5.20, R], [5.30, R * 0.96], [6.85, R * 0.96], [L, 0.0]];
    /* the body, the re-entry vehicle a shade narrower, the long cone (D1) */
    var seg = 20, V = [], Fc = [], n = prof.length, a, b, c, d;
    for (k = 0; k < n; k++) for (i = 0; i < seg; i++) {
      a = i / seg * TAU;
      V.push(P(prof[k][0], Math.cos(a) * prof[k][1], Math.sin(a) * prof[k][1]));
    }
    for (k = 0; k + 1 < n; k++) for (i = 0; i < seg; i++) {
      a = k * seg + i; b = k * seg + (i + 1) % seg; c = (k + 1) * seg + (i + 1) % seg; d = (k + 1) * seg + i;
      Fc.push([a, b, c], [a, c, d]);
    }
    for (i = 1; i + 1 < seg; i++) Fc.push([0, i + 1, i]);
    solid(B.paint, V, Fc, null, true);
    /* the joint ring at the re-entry vehicle, the clamp band (D1: the light band at x 530-545) */
    cyl(B.dark, P(5.18, 0, 0), P(5.24, 0, 0), R + 0.02, R + 0.02, 20);
    cyl(B.dark, P(4.62, 0, 0), P(4.82, 0, 0), R + 0.04, R + 0.04, 20);
    /* tail fins in "+": swept, root 1.00 m (D1: x 75-175), 0.32 m tall */
    for (k = 0; k < 4; k++) {
      var ca = Math.cos(k * Math.PI / 2), sa = Math.sin(k * Math.PI / 2);
      var q = [[0.05, R], [1.05, R], [0.35, R + 0.32], [0.05, R + 0.32]];
      var Vf = [], Ff = [[0, 1, 2], [0, 2, 3], [4, 6, 5], [4, 7, 6], [0, 4, 5], [0, 5, 1], [1, 5, 6], [1, 6, 2], [2, 6, 7], [2, 7, 3], [3, 7, 4], [3, 4, 0]];
      for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
        var r = q[i][1], t = s * 0.025;
        Vf.push(P(q[i][0], ca * r - sa * t, sa * r + ca * t));
      }
      solid(B.paint, [Vf[0], Vf[1], Vf[2], Vf[3], Vf[4], Vf[5], Vf[6], Vf[7]], Ff);
      /* the re-entry vehicle's small control fins (D1: x 620-690, 0.67 m root, 0.18 m tall) */
      var e = [[5.55, R * 0.96], [6.22, R * 0.96], [6.10, R * 0.96 + 0.18], [5.85, R * 0.96 + 0.18]], Ve = [];
      for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
        var r2 = e[i][1], t2 = s * 0.02;
        Ve.push(P(e[i][0], ca * r2 - sa * t2, sa * r2 + ca * t2));
      }
      solid(B.dark, Ve, Ff);
    }
    /* the erector under the round (NOT CONFIRMED, see above): a beam from the hinge to the clamp band, its foot
       on the hinge pin; the team strip on top of the round's body is left off (it is a round), on the beam's foot */
    var zb = -R - 0.10;
    hexa(B.paint, [P(-0.25, -0.30, zb - 0.22), P(4.90, -0.30, zb - 0.22), P(4.90, 0.30, zb - 0.22), P(-0.25, 0.30, zb - 0.22),
                   P(-0.25, -0.30, zb), P(4.90, -0.30, zb), P(4.90, 0.30, zb), P(-0.25, 0.30, zb)]);
    for (s = -1; s <= 1; s += 2) bar(B.dark, P(4.72, s * 0.30, zb), P(4.72, s * (R + 0.02), 0), 0.05);
    cylY(B.dark, 0, -0.45, 0.45, 0, 0.10, 12);
    for (s = -1; s <= 1; s += 2) bar(B.paint, [0, s * 0.35, 0], P(0.40, s * 0.30, zb - 0.11), 0.09);
  }
  function buildDf15b(THREE, M, C) {
    var F = F15, T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), E;
    df15Cab(HB);
    df15Body(HB);
    flush(THREE, g, HB);
    addAxles(THREE, g, T, F.AX, F.RT, F.TH, F.TY);
    df15Round(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(F.HX, 0, F.HZ);
    flush(THREE, E, EB);
    E.userData.el = (90 - F.PITCH) * D2R;
    var p = F.PITCH * D2R, xt = F.MT - F.HX, zt = 2.85 - F.HZ;
    /* the cell: the round first drawn 1.5 m up its own axis from the tail, the jet out of the tail */
    E.userData.cells = [[xt + 1.50 * Math.cos(p), 0, zt + 1.50 * Math.sin(p), xt - 0.30]];
    g.add(E);
    g.name = "pla_e00_tel";
    return g;
  }

  /* ======================================================================== DF-16 on its 10x10 (tel_c)
     Recognition list:
       1. 10x10: two axles under and behind the cab, the long gap, three close axles aft - T1, T2: AX.
       2. The full-width crew cab, flat-fronted, two big windscreens, the grille between the bar-guarded lamp
          clusters, the bumper with its lamps, the steps under the doors; three windows down each side - T1: df16Cab.
       3. The long rounded shell over the round the full length of the body, its rounded front end over the
          louvred box behind the cab - T1, T2: df16Body.
       4. The flat body sides with their wheel arches and doors under it - T1, T2.
     MEASURED off T2 (port side, near side-on; brightened).  No published dimension of the DF-16 or its carrier
     was found, so the SCALE is a chain: the tyre is taken as the 1.24 m measured on the DF-15B TEL in D1 (NOT
     CONFIRMED - the tyres look alike in T1 and D1, nothing more), 86 px in T2, which with T1's ratio of cab height
     to tyre (2.07) gives 67 px/m.  Stations from the bumper (x 1005): axles 2.76, 5.07, 8.73, 10.30, 11.87; cab
     rear 2.64; the shell's front end 2.61 (its round nose from 3.66), its rear 12.54; the vehicle's rear 12.76.
     Heights: cab roof 2.50, the shell's crown 2.84, the body sides' top 2.46 and foot 0.85, the cab windows
     1.80-2.22.  So the model is 12.8 m long: the generic tel_c was 14.17 m and nothing published settles either.
     NOT CONFIRMED: the scale (above); the width (3.0 m) and track; the shell's section (a flattened arch over the
     full width, from T1); the cab front's details beyond T1's; the louvred box; the doors.  Not drawn: the round
     (inside the shell in every photograph), how the shell opens and the round is raised (no photograph), jacks.
     Nodes: five "roadwheel" groups.  No "podelev" (no photograph shows what is raised or how), no "turret". */
  var F16 = {
    XB: 6.38, XN: 6.30, XC0: 3.74, XT: -6.38, AX: [3.62, 1.31, -2.35, -3.92, -5.49], RT: 0.62, TH: 0.24, TY: 1.19,
    CW: 1.48, ZC: 2.50, ZF: 0.95, BW: 1.48, ZB: 2.46, ZBF: 0.85, SF: 3.77, SN: 2.72, SR: -6.16, ZS: 2.84
  };
  function df16Cab(B) {
    var s, k, F = F16, XN = F.XN, XC0 = F.XC0, CW = F.CW, a0 = F.AX[0], ZW = 1.72;
    /* the cab: upright front, the windscreen leaning back a little, the roof, the rear wall over the first axle (T1, T2) */
    prismY(B.paint, [[XC0, 1.40], [XC0, F.ZC], [XN - 0.18, F.ZC], [XN - 0.06, ZW], [XN, 1.40], [XN, F.ZF], [a0 + 0.66, F.ZF]], -CW, CW);
    box(B.dark, a0 - 0.12, a0 + 0.66, -CW + 0.30, CW - 0.30, F.ZF - 0.05, 1.40);
    /* windscreens either side of the centre pillar, wipers (T1) */
    var ang = Math.atan2(0.12, F.ZC - 0.08 - ZW), L = (F.ZC - 0.10 - ZW) / Math.cos(ang);
    var U = [-Math.sin(ang), 0, Math.cos(ang)], Nn = [Math.cos(ang), 0, Math.sin(ang)];
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [XN - 0.06 - Math.sin(ang) * L * 0.5 + 0.02, s * 0.70, ZW + 0.02 + L * 0.5 * Math.cos(ang)], U, [0, 1, 0], Nn, L * 0.5 - 0.05, 0.62, 0.02);
      bar(B.dark, [XN - 0.02, s * 0.25, ZW + 0.06], [XN - 0.05, s * 0.95, ZW + 0.25], 0.02);
    }
    box(B.dark, XN - 0.11, XN - 0.03, -0.05, 0.05, ZW, F.ZC - 0.05);
    /* the grille between the lamp clusters, each cluster behind its bar guard (T1) */
    box(B.dark, XN, XN + 0.02, -0.55, 0.55, 1.20, 1.60);
    for (k = 0; k < 7; k++) box(B.paint, XN + 0.01, XN + 0.04, -0.52, 0.52, 1.24 + k * 0.05, 1.26 + k * 0.05);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XN, XN + 0.03, s * 1.05 - 0.38, s * 1.05 + 0.38, 1.20, 1.60);
      box(B.glass, XN + 0.01, XN + 0.04, s * 1.05 - 0.30, s * 1.05 + 0.30, 1.28, 1.52);
      for (k = 0; k < 4; k++) box(B.paint, XN + 0.06, XN + 0.10, s * 1.05 - 0.36, s * 1.05 + 0.36, 1.22 + k * 0.12, 1.25 + k * 0.12);
      for (k = 0; k < 2; k++) box(B.paint, XN + 0.03, XN + 0.10, s * (0.69 + k * 0.72) - 0.02, s * (0.69 + k * 0.72) + 0.02, 1.20, 1.60);
      box(B.red, XN, XN + 0.03, s * 1.30 - 0.06, s * 1.30 + 0.06, 1.66, 1.78);                  /* amber lamps */
      /* the three windows, the door seams, the handles (T1, T2) */
      sideBox(B.dark, s, CW, 0.012, 3.85, 4.30, 1.78, 2.25);
      sideBox(B.glass, s, CW + 0.012, 0.01, 3.88, 4.27, 1.81, 2.22);
      sideBox(B.dark, s, CW, 0.012, 4.40, 5.15, 1.78, 2.25);
      sideBox(B.glass, s, CW + 0.012, 0.01, 4.43, 5.12, 1.81, 2.22);
      sideBox(B.dark, s, CW, 0.012, 5.35, 6.10, 1.78, 2.25);
      sideBox(B.glass, s, CW + 0.012, 0.01, 5.38, 6.07, 1.81, 2.22);
      [4.35, 5.25, 6.18].forEach(function (x) { sideBox(B.dark, s, CW, 0.012, x - 0.01, x + 0.01, 1.00, 2.40); });
      sideBox(B.dark, s, CW + 0.012, 0.03, 4.95, 5.07, 1.62, 1.66);
      sideBox(B.dark, s, CW + 0.012, 0.03, 5.88, 6.00, 1.62, 1.66);
      /* mirrors on arms (T1) */
      bar(B.dark, [XN - 0.15, s * CW, 2.30], [XN + 0.05, s * (CW + 0.22), 2.40], 0.025);
      box(B.dark, XN - 0.02, XN + 0.08, s * (CW + 0.14), s * (CW + 0.30), 1.95, 2.40);
      /* the step ladders under the doors (T1) */
      for (k = 0; k < 2; k++) sideBox(B.dark, s, CW - 0.06, 0.10, 5.35, 6.05, 0.48 + k * 0.24, 0.52 + k * 0.24);
      sideBox(B.dark, s, CW - 0.06, 0.10, 5.33, 5.37, 0.48, F.ZF);
      sideBox(B.dark, s, CW - 0.06, 0.10, 6.03, 6.07, 0.48, F.ZF);
      sideBox(B.team, s, CW, 0.015, 3.85, 4.30, 2.30, 2.40);
    }
    /* the bumper with its lamps (T1), the box and beacon on the roof (T1, T2) */
    box(B.paint, XN - 0.05, F.XB, -1.42, 1.42, 0.70, 1.15);
    for (s = -1; s <= 1; s += 2) box(B.glass, F.XB - 0.01, F.XB + 0.01, s * 0.80 - 0.20, s * 0.80 + 0.20, 0.88, 1.02);
    box(B.paint, XN - 0.90, XN - 0.30, -0.60, 0.60, F.ZC, F.ZC + 0.14);
    cylZ(B.dark, 4.20, 0.95, F.ZC, F.ZC + 0.16, 0.10, 10);
  }
  function df16Body(B) {
    var s, k, F = F16, A = F.AX;
    box(B.dark, F.XT + 0.10, F.XC0, -0.55, 0.55, 0.90, 1.20);
    for (k = 0; k < 5; k++) box(B.dark, A[k] - 0.16, A[k] + 0.16, -0.55, 0.55, 0.66, 0.90);
    /* the body sides: flat, from the foot 0.85 m to 2.46 m, the arches over each axle cut out as dark boxes */
    box(B.paint, F.XT, F.XC0 - 0.04, -F.BW, F.BW, 1.40, F.ZB);
    var seg = [[F.XT, A[4] - 0.72], [A[2] + 0.72, A[1] - 0.72], [A[1] + 0.72, F.XC0 - 0.04]];
    seg.forEach(function (q) { box(B.paint, q[0], q[1], -F.BW, F.BW, F.ZBF, 1.40); });
    for (k = 1; k < 5; k++) box(B.dark, A[k] - 0.72, A[k] + 0.72, -F.BW + 0.25, F.BW - 0.25, 1.05, 1.40);
    box(B.paint, A[4] + 0.72, A[3] - 0.72, -F.BW, F.BW, 1.36, 1.40);
    box(B.paint, A[3] + 0.72, A[2] - 0.72, -F.BW, F.BW, 1.36, 1.40);
    for (s = -1; s <= 1; s += 2) {
      for (k = 1; k < 5; k++) sideBox(B.dark, s, F.BW, 0.03, A[k] - 0.74, A[k] + 0.74, 1.36, 1.42);
      /* the doors and their hinges (T1: two on the starboard side between the pairs and at the rear) */
      [[-1.70, -0.50], [0.10, 1.00], [-5.60, -4.70]].forEach(function (q) {
        sideBox(B.dark, s, F.BW, 0.012, q[0], q[1], 1.48, 2.30);
        sideBox(B.paint, s, F.BW + 0.012, 0.012, q[0] + 0.03, q[1] - 0.03, 1.51, 2.27);
        sideBox(B.dark, s, F.BW + 0.012, 0.03, q[1] - 0.15, q[1] - 0.06, 1.86, 1.90);
      });
      /* the small port high on the rear section (T1) */
      sideBox(B.dark, s, F.BW, 0.015, -4.20, -4.05, 2.00, 2.20);
      /* the louvred box behind the cab (T1) */
      for (k = 0; k < 8; k++) sideBox(B.dark, s, F.BW, 0.02, 2.70 + k * 0.10, 2.74 + k * 0.10, 1.70, 2.35);
      /* the handrail upright by the cab (T2: x 815) */
      sideBox(B.dark, s, F.BW, 0.05, 3.58, 3.62, 1.50, 2.40);
      box(B.red, F.XT - 0.01, F.XT + 0.02, s * 1.20 - 0.07, s * 1.20 + 0.07, 1.10, 1.22);
      sideBox(B.team, s, F.BW, 0.015, -3.40, -2.40, 2.30, 2.40);
    }
    /* the shell: a flattened arch over the full width from the body sides' top to the crown at 2.84 m, its front
       end rounded down over the box behind the cab (T1, T2) */
    var ring = function (x, w, top) {
      var P = [], i, a;
      for (i = 0; i <= 8; i++) { a = i / 8 * Math.PI; P.push([x, Math.cos(a) * w, F.ZB - 0.02 + Math.sin(a) * (top - F.ZB + 0.02)]); }
      return P;
    };
    loftN(B.paint, [ring(F.SR, F.BW - 0.04, F.ZS - 0.04), ring(F.SR + 0.06, F.BW - 0.02, F.ZS), ring(F.SN, F.BW - 0.02, F.ZS),
                    ring(F.SN + 0.45, F.BW - 0.10, F.ZS - 0.04), ring(F.SN + 0.80, F.BW - 0.30, F.ZS - 0.14), ring(F.SF, F.BW - 0.70, F.ZS - 0.30)], true);
    /* the shell's seam along each shoulder and its hoops (T1) */
    for (s = -1; s <= 1; s += 2) box(B.dark, F.SR + 0.10, F.SN, s * (F.BW - 0.01) - 0.02, s * (F.BW - 0.01) + 0.02, F.ZB - 0.04, F.ZB + 0.02);
    for (k = 0; k < 5; k++) {
      var x = -5.30 + k * 1.95;
      box(B.dark, x, x + 0.05, -0.40, 0.40, F.ZS - 0.01, F.ZS + 0.01);
    }
  }
  function buildDf16(THREE, M, C) {
    var F = F16, T = materials(THREE, C), g = new THREE.Group(), HB = bins(T);
    df16Cab(HB);
    df16Body(HB);
    flush(THREE, g, HB);
    addAxles(THREE, g, T, F.AX, F.RT, F.TH, F.TY);
    g.name = "tel_c";
    return g;
  }

  return { buildHvyC: buildHvyC, buildHq9: buildHq9, buildDf15b: buildDf15b, buildDf16: buildDf16 };
})();

/* len: the measured X extent of each build */
UNIT_MODELS["hvy_c"] = { len: 11.44, build: HeroPlaGroundModern.buildHvyC };
UNIT_MODELS["pla_e00_sam"] = { len: 11.22, build: function (THREE, M, C) { return HeroPlaGroundModern.buildHq9(THREE, C, "hq9"); } };
UNIT_MODELS["sam_c"] = { len: 11.22, build: function (THREE, M, C) { return HeroPlaGroundModern.buildHq9(THREE, C, "hq9b"); } };
UNIT_MODELS["pla_e00_tel"] = { len: 11.38, build: HeroPlaGroundModern.buildDf15b };
UNIT_MODELS["tel_c"] = { len: 12.79, build: HeroPlaGroundModern.buildDf16 };

/* HELD - not registered; the generic models stay until a reference turns up:
   lt_c         ZTQ-15: three photographs (a head-on museum view, a head-on VT-5, a blurred side view from a video
                still) but no published length, width or height reachable (en.wikipedia's infobox is blank), and
                nothing in them of known size to scale by.
   atgmv_c      AFT-10: no photograph of the vehicle (Commons has the HJ-10 round only; en.wikipedia "HJ-10" puts the
                AFT-10 on a ZBD-04A chassis - js/hero/pla_zbd04.js would be the hull to call).
   pla_e60_sam  HQ-2B self-propelled: Commons Category:HQ-2 holds towed launchers and museum rounds by their titles;
                no photograph of the tracked launcher found.
   pla_e90_tel  DF-15 / M-9: Category:DF-15 holds only the DF-15B; no photograph of the original round or its
                1990s launcher.
   ewv_c, radarv_c  not attempted (no references fetched). */
