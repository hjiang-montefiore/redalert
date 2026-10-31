/* ========== pla_plz05.js - HERO model: PLZ-05 155 mm self-propelled howitzer ==========
   pla_e00_spg   "PLZ-05 155mm self-propelled howitzer" (Type 05), unveiled 2007, the PLA's
                 first 155 mm/52 SPH, on a front-engined tracked chassis from the PLZ-45.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e00_spg_ref:
     P1  "PLZ-05 Self-Propelled Artillery 20170919.jpg" - Beijing military museum, from the
         front left, the side fairly open: SIX road wheels a side (the first half hidden
         behind the deep front side panel), the rear idler, the track's upper run carried
         high; the deep armoured side panel over the front third of the side (over the
         sprocket and the first wheel), the plain fender line behind it; the long glacis
         with the tall A-frame travel lock standing on it; the headlamp pair at the corner
         where the glacis meets the side; the big box turret over the rear half, its sides
         vertical, its front sloped back to the roof, the louvred grille high on the side's
         tail; the cradle with the cylinder above it, the black rubber bellows, the collar,
         the thick bore-evacuator section, the thin tube.
     P2  "PLZ-05 Self-Propelled Artillery 20170902.jpg" - the same vehicle from the front
         left 3/4: the nose, the glacis and the travel lock's two splayed legs, the louvred
         grille on the front deck's right, the headlamps, the tow cable across the nose,
         the four-tube smoke dischargers on the turret front corner, the roof sight boxes.
     P3  "PLZ 05 self propelled gun.jpg" - 2007 unveiling, front right 3/4: the turret's
         sloped front and its gun-mount housing, the cradle cylinder above the gun, the
         12.7 mm on the cupola at the turret roof's right rear, the mesh grille on the deck.
     P4  "Army Games 2019 in Korla China (2019-08-04) 07.jpg" - a line of PLZ-05s at high
         elevation: the long multi-baffle muzzle brake (the museum guns wear covers), the
         bore evacuator about a quarter of the exposed tube long, ending at the bellows.
   Published (en.wikipedia "PLZ-05"): 11.60 x 3.38 x 3.55 m (gun forward); 155 mm L/52;
   "six roadwheels" (the lengthened PLZ-05B has seven: not this model); "the driver and
   powerpack are at the front of the hull with a fully enclosed turret at the rear", "a drive
   sprocket at the front, idler at the rear and track return rollers" (said of the PLZ-52 on
   the same family hull); QJC-88 12.7 mm; "2 sets of 4-barrel grenade launchers".  The brief
   suggested seven road wheels: P1 shows six, and six is what is drawn.

   Recognition list (what makes it read at game zoom, and its source):
     1. the very long 155 mm L/52 tube, the bellows and bore evacuator, the long brake - P1, P4
     2. the big flat-roofed box turret over the rear half of the hull - P1, P3
     3. the long low glacis with the A-frame travel lock on it - P1, P2
     4. six close-pitched road wheels, the high track run, the deep front side panel - P1
     5. the cupola and 12.7 mm at the turret's right rear - P3
     6. the smoke-discharger banks on the turret front corners - P1, P2
   Pose: the gun is drawn LEVEL and straight ahead, resting just above the travel lock's
   cradle - a choice for the game (the museum vehicles have the lock raised and the gun a few
   degrees up, P1, P2; in action the lock folds down onto the glacis).
   Paint: plain PLA green #525c3a (the museum vehicles wear digital camouflage and stars:
   not drawn).  No stars or numbers.
   Measured: heights scaled off P1 at the second road wheel (deck about 1.85 m, turret roof
   about 3.2 m, 12.7 mm top 3.55 m published) with the road wheel taken as 0.72 m; the length from
   the published 11.60 m with the tube's L/52 (8.06 m) fixing the muzzle against the turret.
   NOT CONFIRMED, judgement calls (no drawing found, P1 is in strong perspective): the hull
   length (7.30 m) and the wheel pitch (0.84 m, the first gap 1.04 m), the wheel size, the
   sprocket and idler places, the glacis angle, the front side panel's outline, the turret's
   length (4.06 m) and front profile, the ring's place, the gun sitting on the centre line, the
   cradle and recuperator lengths, the evacuator's place, the brake's baffle count, the
   hatch, sight, grille and stowage positions, the return-roller count (three).
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the turret sides and the roof tail.  Nodes: "turret" (origin on the ring centre
   at deck level, gun along +X; the gun is fixed in it) and six "roadwheel" groups (one per
   station, both sides).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlz05 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 505 };
  /* running gear (P1): six wheels, the rear five close-pitched; front sprocket, rear idler,
     three return rollers */
  var TY = 1.40, TW = 0.24;
  var XW = [1.70, 0.66, -0.18, -1.02, -1.86, -2.70], ZW = 0.43, RW = 0.36;
  var SPR = { x: 2.98, z: 0.74, r: 0.30 }, IDL = { x: -3.32, z: 0.56, r: 0.30 };
  var RRX = [1.20, -0.60, -2.30], RRZ = 0.92, RRR = 0.09;
  /* hull: nose, rear, belly, sponson floor, deck, glacis top, lower and sponson half widths */
  var NOSE = 3.65, REAR = -3.65, BELLY = 0.45, SPZ = 1.12, DECK = 1.85, GLX = 2.25, NTZ = 1.24, HW = 1.12, SW = 1.66;
  /* turret: ring centre, tail, front at the base, roof, half width; the gun axis height */
  var TX = -1.55, TT = -3.58, TF = 0.48, TROOF = 3.22, THW = 1.42, GZ = 2.60;

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

  /* move every vertex of a bin by (dx, dy, dz): the turret is authored in hull space */
  function shift(B, dx, dy, dz) {
    var k, P, i;
    for (k in B) { P = B[k].P; for (i = 0; i < P.length; i += 3) { P[i] += dx; P[i + 1] += dy; P[i + 2] += dz; } }
  }

  /* ---------------------------------------------------------------- hull */
  var GANG = Math.atan2(DECK - NTZ, NOSE - GLX);
  function gz(x) { return DECK - (x - GLX) * Math.tan(GANG); }
  function addHull(B) {
    var s, i, x;
    /* the lower hull between the tracks: belly, the lower nose plate leaning back under
       the glacis, the rear plate */
    prismY(B.paint, [[REAR, 0.72], [REAR + 0.22, BELLY], [3.25, BELLY], [NOSE, 1.00], [NOSE, SPZ + 0.01], [REAR, SPZ + 0.01]], -HW, HW);
    /* the upper hull over the tracks: a loft of cross-sections with chamfered top edges;
       the flat deck, then the long glacis down to the nose (P1, P2) */
    function sec(x, top) {
      return [[x, -SW, SPZ], [x, SW, SPZ], [x, SW, top - 0.10], [x, SW - 0.10, top], [x, -SW + 0.10, top], [x, -SW, top - 0.10]];
    }
    loftN(B.paint, [sec(REAR, DECK - 0.06), sec(REAR + 0.06, DECK), sec(GLX, DECK), sec(NOSE, NTZ)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * SW, ya = Math.min(yo, s * (SW + 0.02)), yb = Math.max(yo, s * (SW + 0.02));
      /* the deep armoured side panel over the sprocket and the first wheel (P1) */
      prismY(B.paint, [[1.15, SPZ + 0.02], [1.15, 0.86], [1.40, 0.62], [3.15, 0.62], [3.62, SPZ + 0.02]], ya, yb);
      box(B.dark, 1.18, 3.12, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, 0.63, 0.66);
      /* the plain fender lip behind it, and the mud flap at the tail */
      box(B.paint, REAR + 0.02, 1.15, ya, yb, SPZ - 0.03, SPZ + 0.03);
      box(B.dark, REAR - 0.02, REAR + 0.10, ya - (s > 0 ? 0.22 : 0), yb + (s < 0 ? 0.22 : 0), SPZ - 0.30, SPZ);
      /* stowage bins on the fender behind the side panel */
      box(B.paint, -2.90, -1.70, s > 0 ? SW - 0.30 : -SW, s > 0 ? SW : -SW + 0.30, DECK, DECK + 0.18);
      box(B.dark, -2.92, -1.68, s > 0 ? SW - 0.31 : -SW - 0.01, s > 0 ? SW + 0.01 : -SW + 0.31, DECK + 0.08, DECK + 0.10);
    }
    /* --- glacis (P1, P2): the headlamp pairs in guards at the corners, the tow cable,
       the towing eyes, the travel lock --- */
    var u = [Math.cos(GANG), 0, -Math.sin(GANG)], w = [Math.sin(GANG), 0, Math.cos(GANG)];
    slab(B.dark, [GLX + 0.06, 0, gz(GLX + 0.06) + 0.01], u, [0, 1, 0], w, 0.02, SW - 0.12, 0.015);
    for (s = -1; s <= 1; s += 2) {
      var hy = s * 1.38;
      box(B.paint, 2.32, 2.62, hy - 0.22, hy + 0.22, gz(2.62), gz(2.32) + 0.16);
      [-0.09, 0.09].forEach(function (dy) {
        cyl(B.paint, [2.58, hy + dy, gz(2.32) + 0.06], [2.68, hy + dy, gz(2.32) + 0.06], 0.07, 0.07, 12);
        cyl(B.dark, [2.68, hy + dy, gz(2.32) + 0.06], [2.69, hy + dy, gz(2.32) + 0.06], 0.062, 0.062, 12);
      });
      box(B.dark, 2.66, 2.74, hy - 0.22, hy + 0.22, gz(2.32) + 0.14, gz(2.32) + 0.17);
      /* towing eyes on the lower nose */
      cyl(B.dark, [NOSE - 0.10, s * 0.75 - 0.08, 0.86], [NOSE - 0.10, s * 0.75 + 0.08, 0.86], 0.06, 0.06, 8);
      box(B.dark, NOSE - 0.24, NOSE - 0.06, s * 0.75 - 0.07, s * 0.75 + 0.07, 0.80, 0.92);
    }
    /* the tow cable draped across the nose (P2) */
    var cab = [[3.55, -1.10, 1.16], [3.66, -0.60, 1.06], [3.68, 0.0, 1.03], [3.66, 0.60, 1.06], [3.55, 1.10, 1.16]];
    for (i = 0; i + 1 < cab.length; i++) cyl(B.dark, cab[i], cab[i + 1], 0.025, 0.025, 6, true);
    /* the travel lock (P1, P2): an A-frame hinged on the glacis, its two legs splayed, a
       hydraulic strut from the nose, the cradle on top.  The gun lies just above it. */
    var LX = 3.06, LZ = gz(LX) + 0.03, TOPZ = GZ - 0.19;
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, LX - 0.10, LX + 0.10, s * 0.40 - 0.06, s * 0.40 + 0.06, LZ - 0.04, LZ + 0.08);
      cyl(B.paint, [LX, s * 0.40, LZ + 0.04], [LX + 0.08, s * 0.10, TOPZ - 0.04], 0.05, 0.045, 8);
    }
    cyl(B.paint, [LX + 0.03, -0.29, LZ + 0.40], [LX + 0.03, 0.29, LZ + 0.40], 0.035, 0.035, 8);
    cyl(B.dark, [3.42, 0, gz(3.42) + 0.02], [LX + 0.04, 0, LZ + 0.42], 0.035, 0.03, 8);
    box(B.paint, LX - 0.03, LX + 0.19, -0.22, 0.22, TOPZ - 0.06, TOPZ);
    box(B.dark, LX - 0.01, LX + 0.17, -0.20, -0.15, TOPZ, TOPZ + 0.20);
    box(B.dark, LX - 0.01, LX + 0.17, 0.15, 0.20, TOPZ, TOPZ + 0.20);
    /* --- deck: the driver's hatch front LEFT with its periscopes, the louvred engine
       grille front right (P2, P3), filler caps, the turret ring collar --- */
    cylZ(B.paint, 1.80, 0.78, DECK, DECK + 0.07, 0.30, 16);
    box(B.dark, 1.70, 1.90, 0.70, 0.86, DECK + 0.07, DECK + 0.10);
    for (i = -1; i <= 1; i++) box(B.dark, 2.08, 2.16, 0.78 + i * 0.16 - 0.06, 0.78 + i * 0.16 + 0.06, DECK, DECK + 0.08);
    box(B.paint, 0.90, 2.10, -1.40, -0.30, DECK, DECK + 0.04);
    for (i = 0; i < 9; i++) box(B.dark, 0.98 + i * 0.125, 1.03 + i * 0.125, -1.34, -0.36, DECK + 0.04, DECK + 0.06);
    cylZ(B.dark, 0.60, -1.20, DECK, DECK + 0.05, 0.09, 10);
    cylZ(B.dark, 0.60, 1.20, DECK, DECK + 0.05, 0.09, 10);
    cylZ(B.dark, TX, 0, DECK - 0.01, DECK + 0.03, 1.30, 32);
    /* --- rear plate: the ammunition door, tail lamps, towing eyes --- */
    box(B.paint, REAR - 0.04, REAR, -0.55, 0.55, 0.95, 1.65);
    box(B.dark, REAR - 0.06, REAR - 0.04, 0.30, 0.38, 1.20, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, REAR - 0.08, REAR, s * 1.30 - 0.08, s * 1.30 + 0.08, 1.55, 1.70);
      box(B.dark, REAR - 0.08, REAR, s * 0.85 - 0.06, s * 0.85 + 0.06, 0.70, 0.82);
    }
  }

  /* ------------------------------------------------------------ running gear */
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    for (i = 0; i < RRX.length; i++) C.push([RRX[i], RRZ, RRR + 0.035]);
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
    cnt = Math.round(tot / 0.17); step = tot / cnt;
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
        belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - TW - 0.01, y + TW + 0.01, 0.07);
        /* the twin guide horns between the wheel halves */
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.022, y + 0.022, 0.05);
      }
      /* the toothed drive sprocket at the FRONT, twin rings (published, P1) */
      cylY(B.dark, SPR.x, y - 0.20, y + 0.20, SPR.z, SPR.r - 0.06, 18);
      [-0.13, 0.13].forEach(function (oy) {
        for (i = 0; i < 12; i++) {
          var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
          slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y + oy, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.045, 0.04, 0.03);
        }
      });
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.25, SPR.z, 0.15, 14);
      /* the idler at the rear (P1) */
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.22, y + s * 0.27, IDL.z, 0.08, 10);
      /* the return rollers under the high upper run */
      for (i = 0; i < RRX.length; i++) {
        cylY(B.dark, RRX[i], y - 0.20, y + 0.20, RRZ, RRR, 12);
        cylY(B.dark, RRX[i], s * (HW - 0.01), y, RRZ, 0.04, 8);
      }
    }
  }
  /* road wheel (P1): dual rubber-tyred discs with a gap for the guide horns, a dished
     outer disc with six recesses and a hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.23, y - 0.03, 0, RW, 20);
      cylY(W, 0, y + 0.03, y + 0.23, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.03, y + 0.03, 0, RW - 0.08, 14);
      cylY(W, 0, s * (HW + 0.02), y - s * 0.23, 0, 0.07, 8);
      cyl(W, [0, y + s * 0.23, 0], [0, y + s * 0.26, 0], RW - 0.06, 0.13, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.21, y + s * 0.248, Math.sin(a) * 0.21], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.06, 0.010, 0.055);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.25, y + s * 0.28, 0, 0.09, 10);
    }
  }

  /* -------------------------------------------------------------- turret */
  /* authored in hull space, then shifted onto the ring centre at deck level */
  function addTurret(B) {
    var s, i, x;
    /* the box (P1, P3): vertical sides, the front sloping back to the flat roof, the
       tail chamfered */
    prismY(B.paint, [[TT, DECK + 0.03], [TF - 0.18, DECK + 0.03], [TF, 2.35], [TF - 0.06, 2.85], [0.0, TROOF], [TT + 0.13, TROOF], [TT, TROOF - 0.14]], -THW, THW);
    /* the gun-mount housing below and round the cradle, projecting from the face (P1, P3) */
    prismY(B.paint, [[TF - 0.20, 1.98], [0.92, 2.14], [0.98, GZ - 0.22], [TF - 0.10, GZ - 0.22]], -0.55, 0.55);
    box(B.paint, TF - 0.10, TF + 0.18, -0.48, 0.48, GZ - 0.24, GZ + 0.30);
    for (s = -1; s <= 1; s += 2) {
      /* the four-tube smoke-discharger bank on each front corner, angled out (P1, P2) */
      for (i = 0; i < 4; i++) {
        var yy = s * (0.82 + i * 0.13), zz = 2.98;
        cyl(B.paint, [0.10, yy, zz], [0.40, yy + s * 0.10, zz + 0.08], 0.05, 0.05, 8);
        cyl(B.dark, [0.40, yy + s * 0.10, zz + 0.08], [0.41, yy + s * 0.10, zz + 0.08], 0.042, 0.042, 8);
      }
      box(B.dark, 0.0, 0.20, s > 0 ? 0.76 : -1.30, s > 0 ? 1.30 : -0.76, 2.88, 2.94);
      var yi = s * THW, ya = Math.min(yi, s * (THW + 0.04)), yb = Math.max(yi, s * (THW + 0.04));
      /* the louvred grille high on the side's tail (P1, P4) */
      box(B.paint, -3.30, -2.45, ya, yb, 2.70, 3.08);
      for (i = 0; i < 6; i++) box(B.dark, -3.26, -2.49, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, 2.74 + i * 0.055, 2.765 + i * 0.055);
      /* stowage boxes low on the side, hand rails, the team strip */
      box(B.paint, -2.30, -0.90, s * THW, s * (THW + 0.10), DECK + 0.10, DECK + 0.48);
      box(B.dark, -2.32, -0.88, s > 0 ? THW + 0.10 : -THW - 0.11, s > 0 ? THW + 0.11 : -THW - 0.10, DECK + 0.40, DECK + 0.42);
      box(B.dark, -2.00, -0.30, s > 0 ? THW : -THW - 0.05, s > 0 ? THW + 0.05 : -THW, 3.00, 3.03);
      box(B.team, -0.80, -0.20, s > 0 ? THW : -THW - 0.012, s > 0 ? THW + 0.012 : -THW, 2.70, 2.80);
      /* antenna bases on the roof's rear corners */
      cylZ(B.dark, TT + 0.30, s * 1.20, TROOF, TROOF + 0.16, 0.05, 8);
    }
    /* the rear face: the door outline and its hinges */
    box(B.dark, TT - 0.02, TT, -0.45, 0.45, 2.15, 2.19);
    box(B.dark, TT - 0.02, TT, -0.45, 0.45, 2.85, 2.89);
    box(B.dark, TT - 0.02, TT, -0.45, -0.41, 2.15, 2.89);
    box(B.dark, TT - 0.02, TT, 0.41, 0.45, 2.15, 2.89);
    /* --- roof: the gunner's sight box front left, the loader's hatch, the vent, the
       commander's cupola with the 12.7 mm at the right rear (P3), the team strip --- */
    box(B.paint, -0.70, -0.15, 0.55, 1.00, TROOF, TROOF + 0.24);
    box(B.dark, -0.15, -0.13, 0.62, 0.93, TROOF + 0.06, TROOF + 0.20);
    box(B.paint, -2.75, -1.95, 0.35, 1.05, TROOF, TROOF + 0.04);
    box(B.dark, -2.40, -2.30, 0.40, 1.00, TROOF + 0.04, TROOF + 0.06);
    cylZ(B.paint, -1.15, 0.05, TROOF, TROOF + 0.12, 0.16, 12);
    cylZ(B.dark, -1.15, 0.05, TROOF + 0.12, TROOF + 0.14, 0.12, 12);
    var CX = -2.60, CY = -0.80;
    cylZ(B.paint, CX, CY, TROOF, TROOF + 0.15, 0.40, 18);
    cylZ(B.paint, CX, CY, TROOF + 0.15, TROOF + 0.20, 0.32, 18);
    for (i = 0; i < 6; i++) {
      var pa = i / 6 * TAU;
      box(B.dark, CX + Math.cos(pa) * 0.38 - 0.04, CX + Math.cos(pa) * 0.38 + 0.04, CY + Math.sin(pa) * 0.38 - 0.04, CY + Math.sin(pa) * 0.38 + 0.04, TROOF + 0.06, TROOF + 0.12);
    }
    /* the QJC-88 on its cradle at the cupola's front edge, gun along +X */
    var MX = CX + 0.30, MZ = 3.47;
    cylZ(B.dark, MX, CY, TROOF + 0.20, MZ - 0.05, 0.035, 8);
    box(B.dark, MX - 0.45, MX + 0.15, CY - 0.06, CY + 0.06, MZ - 0.05, MZ + 0.08);
    cyl(B.dark, [MX + 0.15, CY, MZ + 0.02], [MX + 1.20, CY, MZ + 0.02], 0.025, 0.022, 8);
    cyl(B.dark, [MX + 1.12, CY, MZ + 0.02], [MX + 1.22, CY, MZ + 0.02], 0.04, 0.04, 8);
    box(B.dark, MX - 0.12, MX + 0.10, CY + 0.06, CY + 0.22, MZ - 0.14, MZ + 0.02);
    box(B.team, TT + 0.15, TT + 0.55, -0.20, 0.40, TROOF, TROOF + 0.015);

    /* --- the 155 mm L/52, LEVEL (see the header), on the centre line (P1, P2, P4) --- */
    /* the cradle drum, the recuperator cylinder above it on its bracket */
    cyl(B.paint, [TF, 0, GZ], [1.45, 0, GZ], 0.25, 0.25, 18);
    cyl(B.dark, [1.30, 0, GZ], [1.36, 0, GZ], 0.27, 0.27, 18);
    cyl(B.paint, [TF + 0.10, 0.04, GZ + 0.36], [1.60, 0.04, GZ + 0.36], 0.12, 0.12, 14);
    cyl(B.dark, [1.60, 0.04, GZ + 0.36], [1.64, 0.04, GZ + 0.36], 0.09, 0.09, 12);
    box(B.paint, 1.05, 1.25, -0.06, 0.12, GZ + 0.18, GZ + 0.30);
    /* the black rubber bellows, ribbed */
    cyl(B.dark, [1.45, 0, GZ], [2.35, 0, GZ], 0.21, 0.20, 16);
    for (x = 1.50; x < 2.33; x += 0.075) cyl(B.dark, [x, 0, GZ], [x + 0.03, 0, GZ], 0.225, 0.225, 16, true);
    /* the collar, the thick bore-evacuator section, the tube */
    cyl(B.paint, [2.35, 0, GZ], [2.55, 0, GZ], 0.18, 0.18, 16);
    cyl(B.paint, [2.55, 0, GZ], [2.68, 0, GZ], 0.12, 0.15, 16);
    cyl(B.paint, [2.68, 0, GZ], [3.92, 0, GZ], 0.15, 0.15, 16);
    cyl(B.paint, [3.92, 0, GZ], [4.08, 0, GZ], 0.15, 0.105, 16);
    cyl(B.paint, [4.08, 0, GZ], [7.17, 0, GZ], 0.105, 0.095, 14);
    /* the long multi-baffle muzzle brake (P4) */
    cyl(B.dark, [7.14, 0, GZ], [7.87, 0, GZ], 0.125, 0.125, 14);
    for (i = 0; i < 7; i++) cyl(B.paint, [7.17 + i * 0.105, 0, GZ], [7.22 + i * 0.105, 0, GZ], 0.150, 0.150, 14);
    cyl(B.paint, [7.84, 0, GZ], [7.87, 0, GZ], 0.15, 0.15, 14);
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
    shift(TB, -TX, 0, -DECK);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build (the tail's towing eyes -3.73 to the muzzle 7.87) */
UNIT_MODELS["pla_e00_spg"] = { len: 11.60, build: HeroPlz05.build };
