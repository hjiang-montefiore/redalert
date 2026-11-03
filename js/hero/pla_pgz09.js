/* ========== pla_pgz09.js - HERO model: PGZ-09 (Type 09) twin 35 mm SPAAG ==========
   pla_e00_spaag   "PGZ-09 self-propelled anti-aircraft gun" (Type 09), in service about 2011:
                   twin 35 mm in a big radar turret on the PLZ-05 family's tracked chassis.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e00_spaag_ref:
     P1  "PGZ-09 Self-propelled Anti-Aircrafft Artillery 20170919.jpg" - Beijing military
         museum, from the front left: the long low glacis and the deep armoured front side
         panel, the headlamp box at its corner, the tow cable across the nose; the huge
         turret over the rear two thirds of the deck, its lower body wide and deep, the
         round TRACKING-RADAR dish standing on the turret front's centre line with the
         electro-optical box (lens, laser window) above it; the near (left) gun's angular
         housing high on the turret's rear quarter, its barrel running forward along the
         turret's outside past the dish; the far gun the same; the SEARCH-RADAR antenna
         FOLDED FLAT on its housing over the turret rear; the smoke-discharger tubes low on
         the turret's side; the hull's rear deck clear behind the turret.
     P2  "PGZ-09 Self Propelled Anti-Aircrafft Gun 20170902.jpg" - another vehicle from the
         front right: the dish and the EO box from ahead, the right gun's barrel along the
         turret side, the folded antenna's full width over the turret rear, six road wheels.
     P3  "PGZ-09 Self-propelled anti-aircraft artillery 20170902.jpg" - the P2 vehicle near
         side-on from the right (nose to the right): the MEASURING photograph.  SIX road
         wheels, unevenly pitched, the spoked idler raised at the rear, three return
         rollers, the sprocket hidden behind the front side panel; the plain side plate;
         the turret's profile: the lower body, the low louvred box with a vertical cylinder
         on the rear deck behind it, the upper body with its flat roof stepping down to the front, the gun
         housing (a wedge) on the rear half of the upper side, the barrel, the ammunition
         door on the side, the three smoke tubes, the dish edge-on and the EO box on its
         pedestal, the folded search radar on top at the rear.
   Published (en.wikipedia "PGZ-09"): 6.7 x 3.2 x 3.4 m "(radar down)", 4.82 m "(radar up)";
   35 t; "a tracked chassis similar to PLZ-05", "six roadwheels"; "The search and
   surveillance radar ... is located at the rear of the turret roof"; "The tracking radar is
   mounted in front of the turret with digital fire control system above"; twin 35 mm.

   Recognition list (what makes it read at game zoom, and its source):
     1. the big slab-sided turret, nearly hull-wide, over the rear two thirds - P1, P3
     2. the two 35 mm barrels running along the turret's OUTSIDE from wedge housings high
        on its rear quarters - P1, P2, P3
     3. the round tracking-radar dish on the turret front, the EO box above it - P1, P2
     4. the folded search-radar antenna, a wide flat slab over the turret rear - P1, P2, P3
     5. six road wheels, the raised rear idler, the deep front side panel, the long glacis
        (the PLZ-05 family) - P3
   Pose: the search radar is drawn STOWED (antenna folded flat), as all three photographs
   show it and as the published 3.4 m "radar down" height describes; the guns level ahead.
   Paint: plain PLA green #525c3a (the museum vehicles wear digital camouflage and a star:
   not drawn).  No stars or numbers.
   Measured off P3 with the road wheel taken as 0.70 m (that gives a hull of 6.74 m against
   the published 6.7 m), correcting for the camera's distance (it stands near the rear, the
   scale falls about 10% from the first wheel to the last; points on the centre line are
   farther than the side plate, about 0.86 of its scale): the wheel stations, the idler, the
   return rollers, the side plate (sponson floor 1.10 m, deck 1.60 m), the front panel and
   the glacis, the turret's length (tail -2.85 to front 0.45 m), its roof (2.83 m), the
   gun axis (2.35 m), the housing and barrel ends, the dish (0.72 m across, centre 2.38 m),
   the folded antenna (3.08 to 3.40 m, the published radar-down height).
   NOT CONFIRMED, judgement calls: every width (the turret's half widths 1.30 lower and 1.10
   upper, the housings to 1.52, the barrels at 1.36, the antenna 1.9 m across: from P1/P2
   proportions, no plan or front view found), the ring's place, the sprocket (hidden), the
   wheel size, the lower nose, the deck fittings (driver's hatch, grille, lamps: as on the
   PLZ-05 hero), the roof hatches and sight, the barrels' exposed length (the museum guns
   wear muzzle covers; drawn bare), the dish's depth and bracket, the smoke-tube count (three
   a side), the antenna's thickness and the housing under it; the louvred box on the rear deck: P3
   shows it on the right, P1 shows nothing on the left, so it is drawn on the right half only
   (the turret's tail corners pass over it when trained well off the bow).
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the turret's lower sides and the antenna housing.  Nodes: "turret" (origin on
   the ring centre at deck level, guns along +X; the guns, dish and radar are fixed in it)
   and six "roadwheel" groups (one per station, both sides).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPgz09 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 909 };
  /* running gear (P3): six wheels, unevenly pitched; front sprocket (hidden), raised rear
     idler, three return rollers */
  var TY = 1.32, TW = 0.24;
  var XW = [2.00, 1.16, 0.18, -0.60, -1.46, -2.37], ZW = 0.38, RW = 0.35;
  var SPR = { x: 2.92, z: 0.80, r: 0.29 }, IDL = { x: -3.18, z: 0.70, r: 0.28 };
  var RRX = [1.53, -0.17, -1.78], RRZ = 0.87, RRR = 0.09;
  /* hull: nose, rear, belly, sponson floor, deck, glacis top, nose top, lower and sponson
     half widths, the front side panel's back edge */
  var NOSE = 3.35, REAR = -3.35, BELLY = 0.45, SPZ = 1.10, DECK = 1.60, GLX = 2.60, NTZ = 1.18, HW = 1.04, SW = 1.56, FPX = 1.84;
  /* turret: ring centre; lower tail, upper tail, roof, lower and upper half widths; the
     gun axis and the barrels' half spacing */
  var TX = -1.30, TT = -2.85, TU = -2.80, TROOF = 2.83, TLW = 1.30, TUW = 1.10, GZ = 2.35, GY = 1.36;

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
  /* the PLZ-05 family's hull (P3): engine and driver in front, a long flat deck, the
     glacis, the deep armoured side panel over the sprocket and the first wheel */
  var GANG = Math.atan2(DECK - NTZ, NOSE - GLX);
  function gz(x) { return DECK - (x - GLX) * Math.tan(GANG); }
  function addHull(B) {
    var s, i;
    /* the lower hull between the tracks: belly, the lower nose plate leaning back, the
       rear plate */
    prismY(B.paint, [[REAR, 0.72], [REAR + 0.22, BELLY], [2.90, BELLY], [NOSE, 0.95], [NOSE, SPZ + 0.01], [REAR, SPZ + 0.01]], -HW, HW);
    /* the upper hull over the tracks: plain vertical side plates (P3), the flat deck, the
       glacis down to the nose */
    function sec(x, top) {
      return [[x, -SW, SPZ], [x, SW, SPZ], [x, SW, top - 0.08], [x, SW - 0.08, top], [x, -SW + 0.08, top], [x, -SW, top - 0.08]];
    }
    loftN(B.paint, [sec(REAR, DECK - 0.06), sec(REAR + 0.06, DECK), sec(GLX, DECK), sec(NOSE, NTZ)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * SW, ya = Math.min(yo, s * (SW + 0.02)), yb = Math.max(yo, s * (SW + 0.02));
      /* the deep front side panel, its lower edge rising to the nose (P1, P3) */
      prismY(B.paint, [[FPX, SPZ + 0.02], [FPX, 0.70], [3.00, 0.68], [NOSE - 0.03, 0.92], [NOSE - 0.03, SPZ + 0.02]], ya, yb);
      box(B.dark, FPX + 0.03, 2.98, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, 0.71, 0.74);
      /* the side plate's lower lip behind it, the mud flap at the tail */
      box(B.paint, REAR + 0.02, FPX, ya, yb, SPZ - 0.03, SPZ + 0.03);
      box(B.dark, REAR - 0.02, REAR + 0.10, ya - (s > 0 ? 0.22 : 0), yb + (s < 0 ? 0.22 : 0), SPZ - 0.30, SPZ);
      /* the inspection port on the front panel (P3) */
      box(B.dark, 2.62, 2.80, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, 0.90, 1.00);
    }
    /* --- the nose (P1, P2): the headlamp boxes at the glacis corners, the tow cable, the
       towing eyes --- */
    var u = [Math.cos(GANG), 0, -Math.sin(GANG)], w = [Math.sin(GANG), 0, Math.cos(GANG)];
    slab(B.dark, [GLX + 0.06, 0, gz(GLX + 0.06) + 0.01], u, [0, 1, 0], w, 0.02, SW - 0.12, 0.015);
    for (s = -1; s <= 1; s += 2) {
      var hy = s * 1.30;
      box(B.paint, 2.36, 2.62, hy - 0.20, hy + 0.20, gz(2.62) - 0.02, DECK + 0.15);
      [-0.08, 0.08].forEach(function (dy) {
        cyl(B.paint, [2.58, hy + dy, DECK + 0.05], [2.68, hy + dy, DECK + 0.05], 0.065, 0.065, 12);
        cyl(B.dark, [2.68, hy + dy, DECK + 0.05], [2.69, hy + dy, DECK + 0.05], 0.057, 0.057, 12);
      });
      box(B.dark, 2.64, 2.72, hy - 0.20, hy + 0.20, DECK + 0.13, DECK + 0.16);
      cyl(B.dark, [NOSE - 0.10, s * 0.75 - 0.08, 0.84], [NOSE - 0.10, s * 0.75 + 0.08, 0.84], 0.06, 0.06, 8);
      box(B.dark, NOSE - 0.24, NOSE - 0.06, s * 0.75 - 0.07, s * 0.75 + 0.07, 0.78, 0.90);
    }
    var cab = [[NOSE - 0.08, -1.10, 1.12], [NOSE + 0.01, -0.60, 1.04], [NOSE + 0.03, 0.0, 1.01], [NOSE + 0.01, 0.60, 1.04], [NOSE - 0.08, 1.10, 1.12]];
    for (i = 0; i + 1 < cab.length; i++) cyl(B.dark, cab[i], cab[i + 1], 0.025, 0.025, 6, true);
    /* --- the front deck: the driver's hatch front left with its periscopes, the louvred
       engine grille front right, filler caps, the turret ring collar --- */
    cylZ(B.paint, 2.05, 0.72, DECK, DECK + 0.07, 0.28, 16);
    box(B.dark, 1.96, 2.14, 0.64, 0.80, DECK + 0.07, DECK + 0.10);
    for (i = -1; i <= 1; i++) box(B.dark, 2.36, 2.44, 0.72 + i * 0.15 - 0.055, 0.72 + i * 0.15 + 0.055, DECK, DECK + 0.07);
    box(B.paint, 0.95, 2.15, -1.36, -0.30, DECK, DECK + 0.04);
    for (i = 0; i < 9; i++) box(B.dark, 1.03 + i * 0.125, 1.08 + i * 0.125, -1.30, -0.36, DECK + 0.04, DECK + 0.06);
    cylZ(B.dark, 0.95, 1.20, DECK, DECK + 0.05, 0.09, 10);
    cylZ(B.dark, 0.95, 0.30, DECK, DECK + 0.05, 0.09, 10);
    cylZ(B.dark, TX, 0, DECK - 0.01, DECK + 0.03, 1.25, 32);
    /* --- the louvred box on the right of the rear deck, behind the turret, and the
       vertical cylinder at its tail (P3; P1 shows the left of the rear deck clear) --- */
    box(B.paint, -3.30, -2.92, -1.45, -0.20, DECK, 2.12);
    box(B.dark, -3.31, -2.91, -1.46, -0.19, 2.12, 2.14);
    for (i = 0; i < 4; i++) box(B.dark, -3.22, -2.98, -1.46, -1.45, 1.78 + i * 0.07, 1.81 + i * 0.07);
    cylZ(B.paint, -3.22, -1.20, DECK, 2.08, 0.10, 12);
    cylZ(B.dark, -3.22, -1.20, 2.08, 2.12, 0.07, 12);
    /* --- rear plate: the door, tail lamps, towing eyes --- */
    box(B.paint, REAR - 0.04, REAR, -0.55, 0.55, 0.85, 1.50);
    box(B.dark, REAR - 0.06, REAR - 0.04, 0.30, 0.38, 1.08, 1.28);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, REAR - 0.08, REAR, s * 1.28 - 0.08, s * 1.28 + 0.08, 1.42, 1.56);
      box(B.dark, REAR - 0.08, REAR, s * 0.85 - 0.06, s * 0.85 + 0.06, 0.68, 0.80);
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
      /* the toothed drive sprocket at the FRONT, twin rings (hidden behind the front panel in P3; as on the PLZ-05) */
      cylY(B.dark, SPR.x, y - 0.20, y + 0.20, SPR.z, SPR.r - 0.06, 18);
      [-0.13, 0.13].forEach(function (oy) {
        for (i = 0; i < 12; i++) {
          var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
          slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y + oy, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.045, 0.04, 0.03);
        }
      });
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.25, SPR.z, 0.15, 14);
      /* the spoked idler raised at the rear (P3) */
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.22, y + s * 0.27, IDL.z, 0.08, 10);
      /* the return rollers under the high upper run */
      for (i = 0; i < RRX.length; i++) {
        cylY(B.dark, RRX[i], y - 0.20, y + 0.20, RRZ, RRR, 12);
        cylY(B.dark, RRX[i], s * (HW - 0.01), y, RRZ, 0.04, 8);
      }
    }
  }
  /* road wheel (P1, P3): dual rubber-tyred discs with a gap for the guide horns, a dished
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
    /* the lower body (P1, P3): hull-wide, vertical sides, the front plate sloping back under the dish */
    prismY(B.paint, [[TT, DECK + 0.04], [0.40, DECK + 0.04], [0.66, 2.20], [TT + 0.08, 2.20], [TT, 2.12]], -TLW, TLW);
    /* the upper body (P3): a shelf in from the lower sides, the flat roof stepping down at
       the front to a short vertical face */
    prismY(B.paint, [[TU, 2.20], [0.45, 2.20], [0.45, 2.45], [0.10, TROOF], [TU + 0.10, TROOF], [TU, TROOF - 0.10]], -TUW, TUW);
    box(B.dark, TU + 0.05, 0.40, -TUW - 0.01, TUW + 0.01, 2.20, 2.23);
    for (s = -1; s <= 1; s += 2) {
      var yl = s * TLW, la = Math.min(yl, s * (TLW + 0.012)), lb = Math.max(yl, s * (TLW + 0.012));
      var yu = s * TUW, ua = Math.min(yu, s * (TUW + 0.012)), ub = Math.max(yu, s * (TUW + 0.012));
      /* the gun housing: a wedge high on the upper side's rear half (P1, P3), the cradle
         block at its front, the 35 mm barrel running forward along the outside */
      var hy0 = s * TUW, hy1 = s * 1.52;
      prismY(B.paint, [[-2.42, 2.36], [-2.28, 2.70], [-1.05, 2.74], [-0.90, 2.52], [-1.02, 2.24], [-2.25, 2.20]], Math.min(hy0, hy1), Math.max(hy0, hy1));
      box(B.dark, -2.20, -1.10, s > 0 ? 1.52 : -1.53, s > 0 ? 1.53 : -1.52, 2.44, 2.47);
      box(B.paint, -0.98, -0.70, s * GY - 0.11, s * GY + 0.11, GZ - 0.11, GZ + 0.11);
      cyl(B.dark, [-0.72, s * GY, GZ], [-0.20, s * GY, GZ], 0.07, 0.065, 12);
      cyl(B.dark, [-0.20, s * GY, GZ], [1.62, s * GY, GZ], 0.048, 0.042, 10);
      cyl(B.dark, [1.62, s * GY, GZ], [1.72, s * GY, GZ], 0.052, 0.052, 10);
      /* the ammunition door on the upper side (P3) */
      box(B.dark, -0.52, -0.02, ua, ub, 2.28, 2.31);
      box(B.dark, -0.52, -0.02, ua, ub, 2.60, 2.63);
      box(B.dark, -0.52, -0.48, ua, ub, 2.28, 2.63);
      box(B.dark, -0.06, -0.02, ua, ub, 2.28, 2.63);
      /* the stowage bin, the team strip */
      box(B.paint, -2.10, -1.55, s * TLW, s * (TLW + 0.10), DECK + 0.10, 2.05);
      box(B.team, -0.90, -0.10, la, lb, 1.92, 2.04);
      /* the smoke-discharger tubes low on the side, angled forward and up (P1, P3) */
      box(B.dark, -1.30, -0.30, s * TLW, s * (TLW + 0.05), 1.72, 1.78);
      for (i = 0; i < 3; i++) {
        x = -1.15 + i * 0.34;
        cyl(B.paint, [x, s * (TLW + 0.08), 1.74], [x + 0.14, s * (TLW + 0.10), 2.00], 0.05, 0.05, 8);
        cyl(B.dark, [x + 0.14, s * (TLW + 0.10), 2.00], [x + 0.145, s * (TLW + 0.10), 2.01], 0.042, 0.042, 8);
      }
      /* grab rails on the upper side, antenna bases on the roof's rear corners */
      box(B.dark, -0.85, -0.55, ua, ub, 2.70, 2.73);
      cylZ(B.dark, TU + 0.18, s * 0.92, TROOF, TROOF + 0.16, 0.05, 8);
    }
    /* the rear door outline */
    box(B.dark, TT - 0.02, TT, -0.45, 0.45, 1.75, 1.78);
    box(B.dark, TT - 0.02, TT, -0.45, -0.42, 1.75, 2.10);
    box(B.dark, TT - 0.02, TT, 0.42, 0.45, 1.75, 2.10);

    /* --- the tracking radar on the turret front (P1, P2): a round dish on the centre
       line, facing ahead, on its bracket; the EO box (lens, laser window) above --- */
    box(B.paint, 0.40, 0.74, -0.13, 0.13, 2.22, 2.52);
    cyl(B.paint, [0.70, 0, 2.38], [0.78, 0, 2.38], 0.38, 0.38, 24);
    cyl(B.paint, [0.78, 0, 2.38], [0.88, 0, 2.38], 0.38, 0.27, 24);
    cyl(B.paint, [0.88, 0, 2.38], [0.93, 0, 2.38], 0.27, 0.10, 24);
    cyl(B.dark, [0.69, 0, 2.38], [0.71, 0, 2.38], 0.39, 0.39, 24, true);
    box(B.paint, 0.20, 0.48, -0.14, 0.14, 2.48, 2.64);
    box(B.paint, 0.04, 0.60, -0.30, 0.30, 2.64, 2.93);
    box(B.dark, 0.04, 0.62, -0.31, 0.31, 2.93, 2.95);
    cyl(B.dark, [0.60, 0.08, 2.79], [0.62, 0.08, 2.79], 0.085, 0.085, 14);
    cyl(B.dark, [0.60, -0.13, 2.79], [0.62, -0.13, 2.79], 0.045, 0.045, 10);
    box(B.dark, 0.60, 0.62, -0.20, 0.0, 2.68, 2.71);

    /* --- roof: the two crew hatches, the emergency day sight --- */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.paint, -0.75, s * 0.52, TROOF, TROOF + 0.07, 0.28, 16);
      box(B.dark, -0.90, -0.60, s * 0.52 - 0.03, s * 0.52 + 0.03, TROOF + 0.07, TROOF + 0.10);
    }
    box(B.paint, -1.45, -1.20, -0.12, 0.12, TROOF, TROOF + 0.14);
    cylZ(B.dark, -1.32, 0, TROOF + 0.14, TROOF + 0.22, 0.08, 10);

    /* --- the search radar at the roof's rear, STOWED (P1, P2, P3): the housing and
       rotator, the wide flat antenna folded down on top of them, its face up --- */
    box(B.paint, -2.62, -1.95, -0.42, 0.42, TROOF, 3.04);
    cylZ(B.dark, -2.25, 0, 3.04, 3.09, 0.24, 16);
    box(B.team, -2.63, -2.62, -0.30, 0.30, 2.88, 2.96);
    box(B.paint, -2.50, -1.38, -0.95, 0.95, 3.09, 3.37);
    for (i = 0; i < 6; i++) box(B.dark, -2.42 + i * 0.19, -2.38 + i * 0.19, -0.90, 0.90, 3.37, 3.40);
    box(B.dark, -2.52, -1.36, -0.97, 0.97, 3.18, 3.21);
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

/* len: the measured X extent of the build (the track round the idler -3.53 to the tow cable 3.41) */
UNIT_MODELS["pla_e00_spaag"] = { len: 6.94, build: HeroPgz09.build };
