/* ============ ru_scud_a.js - HERO model: R-11M (8K11, Scud-A) on the 8U218 tracked launcher ============
   One row:  pact_e50_tel   "R-11 (8K11) on the 8U218 erector", 1957.  HeroScudA is kept as the name.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960, cached in
   scratchpad/q_scuda_ref:
     W0  "8U218 missle launcher at the Muzeum Polskiej Techniki Wojskowej in Warsaw.jpg" (starboard front
         3/4, erector raised about 15 deg) and W2 "2U118 Scud-2.jpg" (the same vehicle, starboard side): the
         full-width crew box, its door and window, the ladder, the dark cylinder on the box side at its rear,
         the roof case, the six wheel pairs, rear sprocket, the erector: a half-pipe trough under the missile
         body and an open lattice cage forward of it.  ru.wikipedia's R-11 caption: this vehicle carries the
         missile part WITHOUT its warhead ("s raketnoy chast'yu R-11M (bez GCh)"), so the round "drum" in the
         middle of the erector is the front face of the missile body, and the cone on the stand beside it is
         the warhead.  The old model drew the drum as a fitting and the warhead as a separate missile: corrected.
     W3  "... Warsaw (3).jpg" (port front 3/4): the sloped box front with its TWO windows, the headlamps in
         wire baskets on its upper corners, the big ribbed box mudguards, the spare track links across the
         nose, the port door, ladder and eagle panel (the eagle is not drawn).
     W1  "... Warsaw (1).JPG", the museum plaque: "9K51 na podwoziu dziala samobieznego ISU-152K", missile
         880 mm, 10,334 mm, launcher in the firing position 40,800 kg, in Polish service 1962-1975.
     F1  "Paine Field-Lake Stickney ... panoramio (136).jpg" (the Flying Heritage museum's 8U218, starboard
         side, WITH a complete missile on the erector): the missile lies TAIL AT THE REAR over the engine
         deck, one X-set fin standing up at the rear corner, the warhead forward in the cage; the curved
         arms and a plate with four holes at the rear (the erector's heel gear, purpose NOT confirmed).
     F2  "... panoramio (135).jpg" (the same, port front): the missile in the cage, nose forward.
     K1  "Kolobrzeg Muzeum Oreza Polskiego 40/41.jpg" (an R-170, the export R-11M, on its 8U218): port
         front 3/4 and head-on - the cage's elongated hexagonal frames round the warhead.
     B1  "Muzeul Militar National - R-11 Zemlya (33381751548 / 54022058080).jpg" (Bucharest, port front):
         the erector raised about 62 deg, pivoted at the rear of the roof, the free end forward and up.
   IDENTIFICATION: W0-W3 and K1 are labelled 8U218 by their museums (W1's plaque names the ISU-152K
   chassis; ru.wikipedia: "8U218 (ob"ekt 803) na baze ISU-152K"); F1/F2 and B1 match them part for part.
   High confidence for the type.  The 2P19 (Skarzysko, Commons files it in the same category) is the
   later R-17 launcher and is NOT used.  "Raketa R-11 v pokhodnom polozhenii.jpg" shows the R-11 on a
   ZIL-157 transporter, not on the 8U218: not used for shape.
   Published: R-11M (8K11) length from the support heels to the tip 10,344 mm, diameter 880 mm, fin span
   1,800 mm (ru.wikipedia, table "8K11"; the plaque gives 10,334); in service 1957-58.  The chassis is the
   ISU-152K hull: 6.77 m long (the old model and tel3d.js: 6.75 m drawn), 3.07 m over the tracks, six
   550 mm road wheel pairs, three return rollers, rear sprocket; 470 mm ground clearance.
   CORRECTIONS against the old model: the missile lay the wrong way (its tail sits over the engine deck at
   the rear, F1); fin span 1.5 -> 1.80 m, missile 10.4 -> 10.344 m; the crew box spans nearly the fenders (2.68 m of
   3.07, W3, F1), it was 2.2 m wide; the erector's drum was a fitting, it is the missile body's front
   (Warsaw: no warhead); the box mudguards, spare links and rear heel gear were missing.

   Recognition list (each drawn; its source):
     1. the long IS-series tracked hull, six wheel pairs, three return rollers, rear sprocket - W2, F1
     2. the tall, nearly full-width armoured crew box on the fenders, sloped front with TWO windows - W3, F1
     3. the headlamps in wire baskets on the upper corners of the box front - W3, F1
     4. the big ribbed box mudguards over the front of the tracks and the spare links across the nose - W3
     5. a door with a window and a ladder on each side of the box - W2, W3, F1
     6. the long dark cylinder on each side of the box at its rear, the case on the roof - W2, F1
     7. the missile body in a half-pipe trough, tail and X-set fins over the engine deck - F1, W2
     8. the warhead forward in an open lattice cage of hexagonal frames, reaching far past the nose - K1, F2
     9. the heel gear at the rear: curved arms and the plate with four holes - F1, W2
    10. the erector pivoted at the rear, the free end swinging forward and up - B1, W0
   Poses: the march is the erector level (F1 shows it nearly so, with the missile).  Firing: "podelev",
   pivoted at the rear on the deck pedestals, raised to VERTICAL (userData.el = pi/2): ru.wikipedia, the R-11
   is raised to the vertical and fired from a launch table.  NO photograph of an 8U218 with its missile
   upright was found, so the launch table, any jacks and the boom's swing-back after the transfer are NOT
   drawn (no deploypose: nothing photographed changes when it sets up), and the round stays on the erector
   upright over the rear deck.  B1's 62 deg is a museum pose.  turret:false: nothing traverses.
   Paint: Soviet green.  Sampled: Bucharest hull in shade (53,69,37), the 1950s colour slide of the
   transporter (101,99,87 sunlit, faded); drawn #4f5935 (as ru_t10.js, about 0.8 of a lit wall), canvas
   texture of mottling, weld seams and grime.  Missile grey-green, Bucharest lit (188,193,182) taken to
   0.62.  No numbers, eagles, stars or museum colours (F1's red band and K1's red nose are museum paint).
   NOT CONFIRMED (drawn as photographed, or judged): the pivot height and the heel gear's purpose; the
   roof case's size; the warhead's split from the body (6.1 m body, 4.24 m head part, from W2/F1: the body's
   front face sits over the box front with the erector at 15 deg); return roller
   and idler positions (W2, the IS-2 layout); the cylinder's purpose.  NOT DRAWN: launch table, hydraulic
   ram (only its roof saddle), cables, antennas, the Polish eagle.
   Nodes: six "roadwheel" groups (axle along local Y, both sides), "podelev"; NOTHING named "turret".
   Budget: 16,256 triangles, 13 draw calls (hull 4, six wheels, erector 3).  len 10.53 m, the measured X
   extent (the rear heel gear at -3.49 to the missile tip at +7.04, the erector level as in the template;
   raised upright the round reaches -3.67, which render3d does not count: it sizes from the template).
   Materials (6): paint (canvas texture), dark, glass, wheel (vertex colours), missile, C.team (two strips
   on the roof).  Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroScudA = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* hull (ISU-152K, 6.75 m drawn, 3.07 m over the tracks) */
  var XT = -3.20, XN = 3.55, ZB = 0.47, FZ = 1.12, FW = 1.535;
  /* crew box: rear wall, front foot, the front face's slope top, roof, half width */
  var BX0 = -1.90, BX1 = 2.58, BXS = 2.22, BZ0 = 1.66, BZR = 2.30, BW = 1.34;
  /* running gear */
  var TY = 1.21, TW = 0.325;
  var XW = [-2.05, -1.23, -0.41, 0.41, 1.23, 2.05], ZW = 0.365, RW = 0.275;
  var IDL = { x: 3.02, z: 0.56, r: 0.29 }, SPR = { x: -2.80, z: 0.62, r: 0.33 };
  var XROLL = [-1.64, 0.0, 1.64], ZROLL = 0.82, RROLL = 0.11;
  /* erector: pivot (world), missile axis over it, tail heel in the pivot frame */
  var PX = -2.40, PZ = 2.45, MZ = 0.60, U0 = -0.90, MLEN = 10.344, MR = 0.44, UB = 6.1;
  var EL = Math.PI / 2;
  var PAINT = { base: "#4f5935", blots: ["#464f30", "#59633f"], seed: 8218 };

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
  /* a closed solid: the signed volume says whether the faces point out, and they are
     turned if they do not.  smooth: average the face normals at shared corners */
  function solid(bin, V, F, smooth) {
    var vol = 0, i, f, a, b, c, N = null, fn, k, q;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var flip = vol < 0;
    if (smooth) {
      N = [];
      for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
        q = [a, b, c];
        for (k = 0; k < 3; k++) { N[q[k]][0] += fn[0]; N[q[k]][1] += fn[1]; N[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < N.length; i++) N[i] = unit(N[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
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
  function strip(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }
  /* a convex side profile [x, z] extruded across y0..y1 */
  function profY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* ear clipping for the lofts' end plates (the sponsons make them non-convex) */
  function inTri(p, a, b, c) {
    var d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
    var d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
    var d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
    var neg = (d1 < -1e-12) || (d2 < -1e-12) || (d3 < -1e-12), pos = (d1 > 1e-12) || (d2 > 1e-12) || (d3 > 1e-12);
    return !(neg && pos);
  }
  function earclip(P) {
    var n = P.length, idx = [], out = [], i, k, m, area = 0, a, b, c, i0, i1, i2, ok, found, guard = 0, q;
    for (i = 0; i < n; i++) { a = P[i]; b = P[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; idx.push(i); }
    if (area < 0) idx.reverse();
    while (idx.length > 3 && guard++ < 400) {
      m = idx.length; found = false;
      for (i = 0; i < m && !found; i++) {
        i0 = idx[(i + m - 1) % m]; i1 = idx[i]; i2 = idx[(i + 1) % m];
        a = P[i0]; b = P[i1]; c = P[i2];
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-12) continue;
        ok = true;
        for (k = 0; k < m; k++) {
          q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          if (inTri(P[q], a, b, c)) { ok = false; break; }
        }
        if (ok) { out.push([i0, i1, i2]); idx.splice(i, 1); found = true; }
      }
      if (!found) break;
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    else for (i = 1; i < idx.length - 1; i++) out.push([idx[0], idx[i], idx[i + 1]]);
    return out;
  }
  /* a skin lofted through rings in the YZ plane (same count each), capped at both ends */
  function loft(bin, rings, smooth) {
    var m = rings.length, n = rings[0].length, V = [], F = [], i, j, k, R = [], area = 0, a, b, T, b0, ri, tr;
    for (j = 0; j < n; j++) { a = rings[0][j]; b = rings[0][(j + 1) % n]; area += a[1] * b[2] - b[1] * a[2]; }
    for (i = 0; i < m; i++) R.push(area < 0 ? rings[i].slice().reverse() : rings[i]);
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (ri = 0; ri < 2; ri++) {
      T = earclip(R[ri ? m - 1 : 0].map(function (p) { return [p[1], p[2]]; }));
      b0 = V.length;
      for (j = 0; j < n; j++) V.push(R[ri ? m - 1 : 0][j]);
      for (tr = 0; tr < T.length; tr++) {
        if (ri) F.push([b0 + T[tr][0], b0 + T[tr][1], b0 + T[tr][2]]);
        else F.push([b0 + T[tr][0], b0 + T[tr][2], b0 + T[tr][1]]);
      }
    }
    solid(bin, V, F, smooth);
  }
  /* a body of revolution about the line through (y, z) along X: profile [[x, r]...] */
  function revolve(bin, prof, y, z, seg) {
    var V = [], F = [], i, j, k, a, m = prof.length;
    for (i = 0; i < m; i++) for (j = 0; j < seg; j++) {
      a = j / seg * TAU;
      V.push([prof[i][0], y + prof[i][1] * Math.cos(a), z + prof[i][1] * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % seg;
      F.push([i * seg + j, i * seg + k, (i + 1) * seg + k], [i * seg + j, (i + 1) * seg + k, (i + 1) * seg + j]);
    }
    V.push([prof[0][0], y, z]); V.push([prof[m - 1][0], y, z]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j]); F.push([m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F, true);
  }
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* one tile is 1 / 0.34 = 2.9 m: the brushed green's mottling, weld seams with their bead
     highlight, rivet rows on the box, grime and rain streaks (W0, W2, F1) */
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512;
      cv.width = S; cv.height = S;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 700; i++) {
        q.fillStyle = (i % 2) ? "rgba(20,22,14,0.08)" : "rgba(220,225,190,0.05)";
        q.fillRect(R() * S, R() * S, 1 + R() * 2, 1 + R() * 2);
      }
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < S; i += 170) for (k = 4; k < S; k += 12) {
        q.fillStyle = "rgba(225,228,205,0.10)"; q.fillRect(i + 5, k, 2, 2);
        q.fillStyle = "rgba(10,10,8,0.12)"; q.fillRect(i + 6, k + 1, 2, 2);
      }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08, vertexColors: true });
    T.msl = new THREE.MeshStandardMaterial({ color: 0x737a6c, roughness: 0.55, metalness: 0.2 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), team: new Bin(T.team, false) };
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
  /* station table of the ISU-152K lower hull (W2 side, W3 front, scaled to the 6.75 m drawn hull):
     x, belly half width, belly z, side half width at the sponson, sponson z, deck half width, deck z.
     The lower sides stand inside the tracks; the sponson floor runs out over them to the fender edge;
     the nose is the IS-2's: the lower glacis up from the belly to the nose plate, the upper glacis back
     to the deck.  The engine deck falls a little to the tail plate (W2, F1). */
  var HS = [
    [-3.20, 0.86, 0.66, 0.88, 1.06, 1.40, 1.26],
    [-3.10, 0.88, 0.50, 0.90, 1.08, 1.45, 1.32],
    [-2.90, 0.90, 0.47, 0.92, 1.10, 1.48, 1.36],
    [ 2.55, 0.90, 0.47, 0.92, 1.10, 1.48, 1.44],
    [ 2.95, 0.88, 0.52, 0.90, 1.08, 1.30, 1.32],
    [ 3.30, 0.84, 0.66, 0.86, 1.02, 1.00, 1.12],
    [ 3.55, 0.78, 0.80, 0.80, 0.98, 0.80, 0.98]
  ];
  function hullRing(S) {
    var x = S[0], P = [[S[1], S[2]], [S[3], S[4] - 0.02], [S[3] + 0.02, S[4]], [S[5], S[6]],
                       [-S[5], S[6]], [-S[3] - 0.02, S[4]], [-S[3], S[4] - 0.02], [-S[1], S[2]]];
    return P.map(function (p) { return [x, p[0], p[1]]; });
  }
  /* the crew box: vertical sides on the fenders, the roof edges chamfered; the front rings draw the
     sloped face (W3, F1) */
  function boxRing(x, top, hw) {
    return [[x, -hw, FZ], [x, hw, FZ], [x, hw, top - 0.10], [x, hw - 0.10, top], [x, -hw + 0.10, top], [x, -hw, top - 0.10]];
  }

  function addHull(B) {
    var s, i, k, x, z, y;
    loft(B.paint, HS.map(hullRing), false);
    /* the fender shelf over each track, its turned-down edge, the rear fender end */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XT + 0.02, 2.70, s > 0 ? 0.90 : -FW, s > 0 ? FW : -0.90, FZ - 0.04, FZ);
      box(B.paint, XT + 0.02, 2.70, s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -FW + 0.025, FZ - 0.09, FZ + 0.01);
      strip(B.paint, XT + 0.02, FZ - 0.02, XT - 0.10, FZ - 0.20, s > 0 ? 0.92 : -FW, s > 0 ? FW : -0.92, 0.03);
      /* the big box mudguard over the front of the track (W3, F1): its flat top falls to the nose
         with ribs across it, deep side cheeks */
      var MG = [], t, ya = s > 0 ? 0.92 : -FW - 0.01, yb = s > 0 ? FW + 0.01 : -0.92;
      /* the guard stands up to about the window sill (W3, K1: 1.40 m) and rolls down over the idler */
      MG = [[2.60, 1.40], [2.85, 1.40], [3.10, 1.38], [3.30, 1.32], [3.45, 1.22], [3.56, 1.10], [3.62, 0.98]];
      box(B.paint, 2.58, 2.62, ya, yb, FZ - 0.02, 1.40);
      for (i = 0; i + 1 < MG.length; i++) {
        strip(B.paint, MG[i][0], MG[i][1], MG[i + 1][0], MG[i + 1][1], ya, yb, 0.04);
        strip(B.paint, MG[i][0], MG[i][1] - 0.22, MG[i + 1][0], MG[i + 1][1] - 0.22, s > 0 ? FW - 0.03 : -FW - 0.01, s > 0 ? FW + 0.01 : -FW + 0.03, 0.44);
        strip(B.paint, MG[i][0], MG[i][1] - 0.16, MG[i + 1][0], MG[i + 1][1] - 0.16, s > 0 ? 0.92 : -0.95, s > 0 ? 0.95 : -0.92, 0.32);
      }
      for (k = 0; k < 5; k++) {
        y = s * (1.00 + k * 0.125);
        for (i = 0; i + 1 < MG.length; i++) strip(B.paint, MG[i][0], MG[i][1] + 0.025, MG[i + 1][0], MG[i + 1][1] + 0.025, y - 0.02, y + 0.02, 0.035);
      }
      box(B.paint, MG[6][0] - 0.05, MG[6][0], ya, yb, MG[6][1] - 0.30, MG[6][1] + 0.01);
      /* the stowage box on the rear fender with its louvred lid (W2, F1) */
      box(B.paint, -2.95, -1.95, s > 0 ? 1.12 : -FW + 0.04, s > 0 ? FW - 0.04 : -1.12, FZ, FZ + 0.34);
      for (k = 0; k < 6; k++) box(B.dark, -2.85 + k * 0.15, -2.79 + k * 0.15, s > 0 ? FW - 0.045 : -FW + 0.035, s > 0 ? FW - 0.035 : -FW + 0.045, FZ + 0.08, FZ + 0.26);
    }
    /* nose: the spare track links across the upper glacis between the mudguards (W3), tow hooks */
    for (i = 0; i < 6; i++) {
      y = -0.62 + i * 0.25;
      slab(B.dark, [3.12, y, 1.25], unit([0.62, 0, 0.78]), [0, 1, 0], unit([0.78, 0, -0.62]), 0.10, 0.11, 0.035);
      slab(B.dark, [3.02, y, 1.33], unit([0.62, 0, 0.78]), [0, 1, 0], unit([0.78, 0, -0.62]), 0.03, 0.09, 0.05);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.45, 3.66, s * 0.45 - 0.05, s * 0.45 + 0.05, 0.80, 0.90);
      box(B.dark, 3.56, 3.66, s * 0.45 - 0.05, s * 0.45 + 0.05, 0.70, 0.82);
    }
    /* tail plate: the exhaust stubs and tow hooks */
    box(B.dark, XT - 0.03, XT, -0.55, 0.55, 0.80, 1.15);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.12, XT, s * 0.75 - 0.07, s * 0.75 + 0.07, 0.62, 0.74);
      cylX(B.dark, XT - 0.14, XT, s * 0.30, 1.20, 0.07, 10);
    }
    /* engine deck: louvred grilles and two filler caps */
    for (k = 0; k < 7; k++) box(B.dark, -3.08 + k * 0.15, -3.02 + k * 0.15, -0.80, 0.80, 1.34, 1.36);
    for (s = -1; s <= 1; s += 2) cylZ(B.paint, -2.05, s * 0.95, 1.36, 1.42, 0.11, 12);

    /* ---- the crew box (W3, F1, W2) ---- */
    loft(B.paint, [boxRing(BX0, BZR, BW), boxRing(BXS, BZR, BW)].concat([0.75, 0.5, 0.25, 0].map(function (f) {
      return boxRing(BX1 + (BXS - BX1) * f, BZ0 + (BZR - BZ0) * f, BW);
    })), false);
    box(B.paint, BX1 - 0.02, BX1 + 0.04, -BW, BW, FZ, BZ0);
    /* the two windows in the sloped front, their frames and the brow over them (W3) */
    var FU = unit([BXS - BX1, 0, BZR - BZ0]), FN = unit([BZR - BZ0, 0, BX1 - BXS]);
    function onFront(f, y, h) { return [BX1 + (BXS - BX1) * f + FN[0] * h, y, BZ0 + (BZR - BZ0) * f + FN[2] * h]; }
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.50;
      slab(B.glass, onFront(0.42, y, 0.030), FU, [0, 1, 0], FN, 0.13, 0.34, 0.012);
      slab(B.dark, onFront(0.42, y, 0.012), FU, [0, 1, 0], FN, 0.17, 0.38, 0.010);
      slab(B.paint, onFront(0.66, y, 0.04), FU, [0, 1, 0], FN, 0.025, 0.42, 0.045);
      /* the headlamp in its wire basket on each upper corner (W3, F1) */
      var hc = onFront(0.30, s * 1.18, 0.10);
      cyl(B.paint, [hc[0] - 0.10, hc[1], hc[2]], [hc[0] + 0.06, hc[1], hc[2]], 0.09, 0.10, 12);
      cyl(B.glass, [hc[0] + 0.06, hc[1], hc[2]], [hc[0] + 0.075, hc[1], hc[2]], 0.085, 0.085, 12);
      var gq = [[0.10, -0.15, -0.16], [0.10, -0.15, 0.17], [0.10, 0.15, 0.17], [0.10, 0.15, -0.16]], j;
      for (j = 0; j < 4; j++) {
        var g0 = gq[j], g1 = gq[(j + 1) % 4];
        cyl(B.dark, [hc[0] + g0[0], hc[1] + g0[1], hc[2] + g0[2]], [hc[0] + g1[0], hc[1] + g1[1], hc[2] + g1[2]], 0.012, 0.012, 5, true, true);
        cyl(B.dark, [hc[0] - 0.14, hc[1] + g0[1], hc[2] + g0[2]], [hc[0] + g0[0], hc[1] + g0[1], hc[2] + g0[2]], 0.012, 0.012, 5, true, true);
      }
      for (j = 1; j < 4; j++) cyl(B.dark, [hc[0] + 0.10, hc[1] - 0.15, hc[2] - 0.16 + j * 0.083], [hc[0] + 0.10, hc[1] + 0.15, hc[2] - 0.16 + j * 0.083], 0.008, 0.008, 4, true, true);
      /* doors with windows, hinges and handle; the ladder below the door at the front of the
         sponson (W2, W3, F1) */
      var yo = s * BW, ys = function (a, b) { return s > 0 ? [BW + a, BW + b] : [-BW - b, -BW - a]; }, yy;
      yy = ys(0, 0.015); box(B.dark, 0.75, 1.70, yy[0], yy[1], 1.22, 2.06);
      yy = ys(0, 0.03); box(B.paint, 0.80, 1.65, yy[0], yy[1], 1.27, 2.01);
      yy = ys(0.03, 0.04); box(B.glass, 0.98, 1.47, yy[0], yy[1], 1.66, 1.94);
      yy = ys(0.03, 0.07); box(B.dark, 1.52, 1.60, yy[0], yy[1], 1.58, 1.64);
      for (j = 0; j < 2; j++) { yy = ys(0.0, 0.05); box(B.dark, 0.74, 0.82, yy[0], yy[1], 1.35 + j * 0.50, 1.47 + j * 0.50); }
      yy = ys(0.03, 0.07);
      bar(B.dark, [1.90, yy[0] + s * 0.05, 0.62], [1.90, yy[0] + s * 0.05, 1.10], 0.035);
      bar(B.dark, [2.20, yy[0] + s * 0.05, 0.62], [2.20, yy[0] + s * 0.05, 1.10], 0.035);
      for (j = 0; j < 3; j++) bar(B.dark, [1.90, yy[0] + s * 0.05, 0.70 + j * 0.16], [2.20, yy[0] + s * 0.05, 0.70 + j * 0.16], 0.03);
      /* the long cylinder on the box side at its rear, on two straps (W2 dark, F1) */
      cylX(B.dark, -1.85, -0.25, s * (BW + 0.13), 1.95, 0.13, 14);
      cylX(B.dark, -0.25, -0.15, s * (BW + 0.13), 1.95, 0.09, 12);
      for (j = 0; j < 2; j++) { yy = ys(0, 0.16); box(B.paint, -1.55 + j * 0.95, -1.47 + j * 0.95, yy[0], yy[1], 1.86, 2.10); }
      /* side panel seams and a louvre bank under the cylinder (W2) */
      yy = ys(0, 0.012); box(B.dark, -0.10, -0.08, yy[0], yy[1], FZ + 0.05, BZR - 0.12);
      for (k = 0; k < 5; k++) { yy = ys(0, 0.03); box(B.dark, -1.65 + k * 0.20, -1.57 + k * 0.20, yy[0], yy[1], 1.30, 1.66); }
      /* roof hatches over the crew seats, a periscope ahead of each */
      cylZ(B.paint, 1.55, s * 0.80, BZR, BZR + 0.07, 0.30, 16);
      cylZ(B.dark, 1.55, s * 0.80, BZR + 0.07, BZR + 0.085, 0.22, 14);
      box(B.paint, 1.95, 2.10, s * 0.80 - 0.10, s * 0.80 + 0.10, BZR, BZR + 0.12);
      box(B.glass, 2.10, 2.11, s * 0.80 - 0.08, s * 0.80 + 0.08, BZR + 0.03, BZR + 0.09);
      /* the team colour, two strips on the roof outboard of the erector */
      box(B.team, 0.10, 1.10, s > 0 ? 1.05 : -1.30, s > 0 ? 1.30 : -1.05, BZR, BZR + 0.015);
    }
    /* the case on the roof, right rear (W2, F1), clear of the erector trough */
    box(B.paint, -1.65, -0.30, -1.30, -0.60, BZR, BZR + 0.27);
    box(B.paint, -1.67, -0.28, -1.32, -0.58, BZR + 0.24, BZR + 0.29);
    for (k = 0; k < 2; k++) box(B.dark, -1.30 + k * 0.62, -1.24 + k * 0.62, -1.33, -1.30, BZR + 0.08, BZR + 0.17);
    /* the erector's saddle on the roof (W2: the strut under the boom ahead of the trough) */
    for (s = -1; s <= 1; s += 2) box(B.dark, 1.10, 1.30, s * 0.42 - 0.06, s * 0.42 + 0.06, BZR, PZ + MZ - MR - 0.10);
    box(B.paint, 1.06, 1.34, -0.50, 0.50, PZ + MZ - MR - 0.14, PZ + MZ - MR - 0.10);
    /* the lower equipment compartment behind the box, ahead of the pivot pedestals (W2, F1), its seams */
    box(B.paint, -2.36, BX0, -1.22, 1.22, FZ, 1.92);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 4; k++) box(B.dark, -2.30, -1.96, s > 0 ? 1.22 : -1.235, s > 0 ? 1.235 : -1.22, 1.30 + k * 0.14, 1.33 + k * 0.14);
    /* rear wall of the box: a hatch and its rungs */
    box(B.dark, BX0 - 0.015, BX0, -0.35, 0.35, 1.30, 2.00);
    /* ---- the erector's pivot pedestals on the rear deck and the heel gear at the rear (F1, W2):
       curved arms down the tail plate and the upright plate with four holes ---- */
    for (s = -1; s <= 1; s += 2) {
      profY(B.paint, [[PX - 0.32, 1.34], [PX + 0.32, 1.38], [PX + 0.14, PZ - 0.10], [PX - 0.14, PZ - 0.10]], s * 0.72 - 0.08, s * 0.72 + 0.08);
      cylY(B.dark, PX, s * 0.56, s * 0.88, PZ, 0.10, 12);
      var CA = [[-2.55, 1.98], [-2.95, 2.05], [-3.28, 1.90], [-3.42, 1.62], [-3.38, 1.30], [-3.22, 1.22]], j2;
      for (j2 = 0; j2 + 1 < CA.length; j2++) cyl(B.paint, [CA[j2][0], s * 0.95, CA[j2][1]], [CA[j2 + 1][0], s * 0.95, CA[j2 + 1][1]], 0.07, 0.07, 8, j2 > 0, j2 + 2 < CA.length);
      bar(B.dark, [-3.30, s * 0.95, 1.40], [-2.70, s * 0.70, 1.36], 0.06);
    }
    box(B.dark, -3.38, -3.34, -1.12, -0.72, 1.85, 2.42);
    for (k = 0; k < 4; k++) cylX(B.glass, -3.395, -3.335, -1.02 + (k % 2) * 0.20, 1.98 + (k > 1 ? 0.30 : 0), 0.045, 8);

    /* ---- running gear: the track as a convex loop of plates with every other 160 mm link proud,
       guide horns inside; the rear sprocket, the front idler, three return rollers (W2, F1) ---- */
    var C = [], pts = [], n, segs = [], tot = 0, a, b, l, cnt, step, q, rem, d, tt, dx, dz, px, pz;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.05]);
    for (i = 0; i < XROLL.length; i++) C.push([XROLL[i], ZROLL, RROLL + 0.05]);
    C.push([IDL.x, IDL.z, IDL.r + 0.05], [SPR.x, SPR.z, SPR.r + 0.05]);
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
    cnt = Math.round(tot / 0.32); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) strip(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.06);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        tt = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * tt; pz = a[1] + (b[1] - a[1]) * tt;
        strip(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TW - 0.01, y + TW + 0.01, 0.08);
        strip(B.dark, px - dx * 0.035 - dz * 0.085, pz - dz * 0.035 + dx * 0.085, px + dx * 0.035 - dz * 0.085, pz + dz * 0.035 + dx * 0.085, y - 0.03, y + 0.03, 0.07);
      }
      /* the sprocket: two toothed rings and the hub */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 14; i++) {
        var ta = i / 14 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y - s * 0.14, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y + s * 0.14, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
      }
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.26, SPR.z, 0.21, 16);
      cylY(B.dark, SPR.x, y + s * 0.26, y + s * 0.31, SPR.z, 0.08, 10);
      /* the idler: a double disc and its crank */
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y - 0.03, y + 0.03, IDL.z, IDL.r + 0.012, 18);
      cylY(B.dark, IDL.x, y + s * 0.22, y + s * 0.28, IDL.z, 0.10, 10);
      box(B.dark, IDL.x - 0.36, IDL.x, y + s * 0.30 - 0.035, y + s * 0.30 + 0.035, IDL.z - 0.045, IDL.z + 0.045);
      for (i = 0; i < XROLL.length; i++) {
        cylY(B.dark, XROLL[i], y - 0.18, y + 0.18, ZROLL, RROLL, 12);
        box(B.dark, XROLL[i] - 0.05, XROLL[i] + 0.05, s > 0 ? 0.90 : -1.05, s > 0 ? 1.05 : -0.90, ZROLL - 0.04, ZROLL + 0.04);
      }
      for (i = 0; i < XW.length; i++) box(B.dark, XW[i] - 0.06, XW[i] + 0.20, s > 0 ? 0.90 : -0.98, s > 0 ? 0.98 : -0.90, ZW + 0.02, ZW + 0.10);
    }
  }

  /* road wheel pair (W2, F1): two dished steel discs on each side of the track's guide horns, a
     ring of lightening holes, the hub.  Vertex colours: the green disc, the dark rim and holes. */
  var RIM = [0.19, 0.20, 0.18], HOLE = [0.08, 0.085, 0.07];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, BODY = [parseInt(c.substr(1, 2), 16) / 255 * 1.12, parseInt(c.substr(3, 2), 16) / 255 * 1.12, parseInt(c.substr(5, 2), 16) / 255 * 1.12];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = RIM;
      cylY(W, 0, y - 0.27, y - 0.17, 0, RW, 16);
      cylY(W, 0, y + 0.17, y + 0.27, 0, RW, 16);
      W.col = BODY;
      cylY(W, 0, y - 0.17, y + 0.17, 0, 0.21, 10);
      cyl(W, [0, y + s * 0.27, 0], [0, y + s * 0.30, 0], 0.255, 0.15, 16);
      cylY(W, 0, y + s * 0.29, y + s * 0.33, 0, 0.08, 10);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.165, y + s * 0.285, Math.sin(a) * 0.165], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.045, 0.014, 0.045);
      }
      W.col = RIM;
      cylY(W, 0, y + s * 0.32, y + s * 0.345, 0, 0.045, 8);
    }
  }

  /* ---------------------------------------------------------------- erector */
  /* in the frame of the pivot: origin on the pin, +X along the boom to the nose, the missile's axis
     at z = MZ, its heel at x = U0 */
  function addErector(B) {
    var i, k, s, a, x, u, P, Q;
    /* the R-11M: a plain body of 0.88 m to the warhead joint (UB from the heel), the long warhead cone
       with its slight ogive (K1, B1, F2), the nozzle skirt, tank joint rings */
    revolve(B.msl, [[U0, 0.36], [U0 + 0.10, 0.42], [U0 + 0.20, MR], [U0 + UB, MR], [U0 + UB + 0.8, 0.43], [U0 + UB + 1.7, 0.39],
                    [U0 + UB + 2.6, 0.31], [U0 + UB + 3.4, 0.20], [U0 + MLEN - 0.20, 0.07], [U0 + MLEN, 0.0]], 0, MZ, 24);
    cyl(B.dark, [U0 - 0.05, 0, MZ], [U0 + 0.02, 0, MZ], 0.30, 0.34, 16);
    [1.9, 4.0, UB].forEach(function (uu) { cylX(B.dark, U0 + uu - 0.03, U0 + uu + 0.03, 0, MZ, MR + 0.008, 24); });
    /* four fins in an X, 1.80 m over the tips, the trailing edge at the heel, the leading edge swept (F1) */
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      var ca = Math.cos(a), sa = Math.sin(a), th = 0.025, pts = [[U0 + 0.08, MR - 0.02], [U0 + 1.45, MR - 0.02], [U0 + 0.62, 0.90], [U0 + 0.08, 0.90]], V = [];
      for (k = 0; k < 8; k++) {
        var qq = pts[k % 4], hh = k < 4 ? -th : th;
        V.push([qq[0], qq[1] * ca - hh * sa, MZ + qq[1] * sa + hh * ca]);
      }
      hexa(B.msl, V);
    }
    /* the half-pipe trough under the body (W0, W2, B1), from the fins to the warhead joint, with its
       two edge rails and the spine beneath */
    var rings = [], m = 11, rr0 = MR + 0.04, rr1 = MR + 0.09;
    [U0 + 1.55, U0 + UB].forEach(function (xx) {
      var ring = [];
      for (k = 0; k < m; k++) { a = Math.PI * 1.12 + k / (m - 1) * Math.PI * 0.76; ring.push([xx, rr1 * Math.cos(a), MZ + rr1 * Math.sin(a)]); }
      for (k = m - 1; k >= 0; k--) { a = Math.PI * 1.12 + k / (m - 1) * Math.PI * 0.76; ring.push([xx, rr0 * Math.cos(a), MZ + rr0 * Math.sin(a)]); }
      rings.push(ring);
    });
    loft(B.paint, rings, false);
    for (s = -1; s <= 1; s += 2) {
      a = Math.PI * 1.12;
      cylX(B.paint, U0 + 1.50, U0 + UB, s * rr1 * Math.cos(a), MZ + rr1 * Math.sin(a), 0.05, 8);
      /* the trough's side ribs */
      for (i = 0; i < 5; i++) {
        x = U0 + 2.0 + i * 0.95;
        slab(B.paint, [x, s * 0.42, MZ - 0.30], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.03, 0.10, 0.20);
      }
      /* the curved heel arms from the pin to the trough (B1, F1) */
      var HA = [[0, s * 0.72, 0], [0.45, s * 0.66, MZ - 0.30], [U0 + 2.2, s * 0.50, MZ - 0.46]];
      for (i = 0; i + 1 < HA.length; i++) cyl(B.paint, HA[i], HA[i + 1], 0.075, 0.07, 10, i > 0, false);
    }
    box(B.paint, U0 + 1.55, U0 + UB, -0.10, 0.10, MZ - rr1 - 0.14, MZ - rr1 + 0.02);
    cylY(B.dark, 0, -0.56, 0.56, 0, 0.12, 14);
    box(B.paint, -0.15, 0.15, -0.62, 0.62, -0.12, 0.10);
    /* clamp bands over the body */
    [U0 + 2.5, U0 + 4.6].forEach(function (xx) {
      for (k = 0; k < 10; k++) {
        var a0 = k / 10 * Math.PI, a1 = (k + 1) / 10 * Math.PI;
        bar(B.dark, [xx, (MR + 0.02) * Math.cos(a0), MZ + (MR + 0.02) * Math.sin(a0)], [xx, (MR + 0.02) * Math.cos(a1), MZ + (MR + 0.02) * Math.sin(a1)], 0.05);
      }
    });
    /* the warhead cage: elongated hexagonal frames round the warhead (K1 head-on), longerons at their
       corners, diagonals down the sides; semicircular saddles under the cone (W0, B1) */
    var HX = [], NF = 5, CX0 = U0 + UB - 0.10, CX1 = U0 + MLEN - 0.25, cw = 0.58, ch = 0.62, cz = MZ + 0.02;
    for (k = 0; k < 6; k++) { a = Math.PI / 2 + k * Math.PI / 3; HX.push([cw * Math.cos(a) / Math.cos(Math.PI / 6) * 0.92, ch * Math.sin(a)]); }
    for (i = 0; i < NF; i++) {
      x = CX0 + (CX1 - CX0) * i / (NF - 1);
      for (k = 0; k < 6; k++) bar(B.paint, [x, HX[k][0], cz + HX[k][1]], [x, HX[(k + 1) % 6][0], cz + HX[(k + 1) % 6][1]], 0.05);
      if (i + 1 < NF) {
        var x2 = CX0 + (CX1 - CX0) * (i + 1) / (NF - 1);
        for (s = -1; s <= 1; s += 2) {
          bar(B.paint, [x, HX[s > 0 ? 1 : 5][0], cz + HX[s > 0 ? 1 : 5][1]], [x2, HX[s > 0 ? 2 : 4][0], cz + HX[s > 0 ? 2 : 4][1]], 0.035);
        }
      }
    }
    for (k = 0; k < 6; k++) cyl(B.paint, [CX0, HX[k][0], cz + HX[k][1]], [CX1, HX[k][0], cz + HX[k][1]], 0.035, 0.035, 6);
    for (i = 0; i < 3; i++) {
      x = U0 + UB + 0.8 + i * 1.1;
      var rs = [0.43, 0.395, 0.33][i] + 0.04;
      for (k = 0; k < 8; k++) {
        var b0 = Math.PI + k / 8 * Math.PI, b1 = Math.PI + (k + 1) / 8 * Math.PI;
        bar(B.paint, [x, rs * Math.cos(b0), MZ + rs * Math.sin(b0)], [x, rs * Math.cos(b1), MZ + rs * Math.sin(b1)], 0.04);
      }
      bar(B.paint, [x, 0, MZ - rs], [x, 0, cz + HX[3][1]], 0.04);
    }
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), i, wg, WB, E;
    addHull(HB);
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
    addErector(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(PX, 0, PZ);
    flush(THREE, E, EB);
    E.userData.el = EL;
    /* mouth x, y, z and the rear x, in this group's frame: the motor lights at the heel of the round */
    E.userData.cells = [[U0 + 0.30, 0, MZ, U0 - 0.10]];
    g.add(E);
    g.name = "pact_e50_tel";
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the rear heel gear to the missile's tip */
UNIT_MODELS["pact_e50_tel"] = {
  len: 10.53,
  build: function (THREE, M, C) { return HeroScudA.build(THREE, M, C); }
};
