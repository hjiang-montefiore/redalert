/* ============ ru_krug_kub.js - HERO models: 2K11 Krug (2P24) and 2K12 Kub (2P25), tracked SAM launchers ============
   Two rows, each drawn as ITS launcher:
     pact_e60_sam  "2K11 Krug, 2P24 launcher"  (1965; GM-123 chassis, two 3M8 ramjet rounds)
     pact_e60_kub  "2K12 Kub (SA-6 Gainful), 2P25 launcher and 1S91 radar"  (1967, row e60-e80;
                   GM-578 chassis, three 3M9).  The 1S91 is a SEPARATE tracked vehicle (en.wikipedia:
                   "the 1S91 radar vehicle is based on a GM-568 chassis"); the row's unit is drawn as the
                   2P25 launcher and no radar is put on it.

   REFERENCES (Wikimedia Commons, fetched at 960 px; the museum vehicles are the ones followed):
     [K1] "ZRK Krug 2016 G1.jpg" (Russian museum, 2P24, front-left three-quarter, rounds stowed)
     [K3] "ZRK Krug 2005 G1.jpg" (Russian museum, 2P24, near-orthogonal right side: the side drawing)
     [K2] "2K11 Krug, National Museum of Military History in Sofia.jpg" (3M8 noses from below)
     [K4] "SA-4 Ganef.JPEG" (US DoD, 1977 Red Square parade, 2P24 in service paint)
     [U1] "ZRK KUB 2007 G1.jpg" (Ukrainian museum, 2P25 front-left, rounds raised)
     [U3] "2P25 TEL with 3 3M9 missiles ... Saint-Petersburg, Russia.jpg" (front three-quarter, raised)
     [U5] "2K12 Kub backside at Central Museum of Russian Armed Forces.jpg" (rear three-quarter)
     [U2] "ZRK KUB 2007 G3.jpg" (front), [U6] "Sa-6tel.jpg" (US DoD, service vehicle)
     en.wikipedia 2K11 Krug / 2K12 Kub infoboxes; ru.wikipedia for the battery make-up.

   RECOGNITION LIST (what each rests on, where it shows):
     Krug 2P24
      1. Two big 3M8 rounds side by side, lying nose-forward over the hull, the noses well past the
         bow [K1][K3] - pod, the rounds.
      2. 3M8: the long conical centre body standing out of a ring intake lip at the front of the
         body tube [K1][K2][K3] - REV_3M8 table.
      3. Four strap-on boosters at the diagonals over the aft 40 % of each round, rounded fronts and
         nozzles at the tail [K1][K3][K4] - booster().
      4. Cropped-delta wings in the X set just ahead of the booster fronts; tail fins in the + set,
         the vertical pair standing high [K3 side view, K1] - fins.
      5. The long box-girder launch beam under and between the rounds, X-braced web at its front
         half, tubular A-frame cradles under the round bodies at the front of the beam [K1][K3].
      6. GM-123: seven disc road wheels with holes, TOOTHED SPROCKET RAISED AT THE FRONT, idler raised
         at the rear [K1][K3], return rollers under the top run (armour_specs rollers: 4).
      7. Sloped bow with stowage over it, vertical rear plate, stowage boxes along the hull side [K1][K3].
     Kub 2P25
      8. Three 3M9 side by side on their own rail beams, noses over the bow, raised to fire [U1][U3][U2].
      9. 3M9: long light radome, plain green body, four cropped-delta wings mid-body in the X set and
         four tail fins in line with them; four intake ducts between the wings [U1][U3][U2].
     10. The guard frame each side: a tubular fence outboard of the outer round, a tall front loop
         with rungs, a rear loop and the top rail joining them, all parallel to the rails [U1][U3][U5].
     11. GM-578: six ribbed-disc road wheels, NO return rollers, toothed sprocket RAISED AT THE REAR,
         small idler at the front (U1 crop: the 12-tooth wheel under the rear fender) - roadwheel
         groups and the track.
     12. Two rounded hump covers on the upper glacis, wide flat fenders at the bow corners, a low
         flat deck with the turntable at mid-hull, rear plate with two round ports and a mesh grille
         low in the middle, mud flaps [U3][U2][U5].
     Paint: plain Soviet green, no numbers or markings; museum two-tone camouflage NOT drawn.

   MEASUREMENTS (metres; published figures from en.wikipedia unless said):
     Krug: hull 7.5 (published 7.5), hull tail to round tip 9.43 (published 9.46 with missiles; the
       measured X extent, len, is 9.57 with the rear tow eyes and exhausts), height with rounds 4.49
       to the top tail fin (published 4.472), width over tracks 3.20 (published 3.2), 3.90 over the
       outer tail fins; 3M8 8.78 x
       0.86 (published 8.784 x 0.86); booster, wing and fin sizes read off [K3] (not published).
       Launch elevation 45 deg (infobox; the text gives 70 deg as the limit).
     Kub: hull 7.0, width 3.14 over the tracks, deck 1.66, height stowed 3.50 to the guard frame
       (all scaled off [U1][U3] against the 3M9: NOT published in my sources); len 7.48 (rear fittings
       to the round tips); 3M9 5.80 x 0.335, wing span 1.245 (published).  Firing
       elevation 35 deg read off [U1] (not published).
   CORRECTIONS to the old file: the Krug's wings are in the X set and its tail fins in the + set
     ([K3]: the top wing stands 0.3 m over the body, the top tail fin 0.6 m), boosters end just behind
     the wings; the Krug pivot is at the REAR of the beam [K3] and the turntable sits mid-hull; the
     Kub guard frame is a fence along each side [U1][U5], not loops across the launcher; the Kub's
     intakes lie between its wings, not on them; the motor cells now sit at the round noses with the
     backblast out of the tails (render3d: mouth x, y, z, rear x); raised to the firing elevation
     the lowest point of the pod stands 0.57 m (Krug) and 0.53 m (Kub) over the deck (measured on
     the build), the tails clear of the turntable.
   NOT CONFIRMED / NOT DRAWN: the 1S91 radar (separate vehicle); hydraulic ram rods (only the
     sleeves are drawn: the pod moves alone); antennas, lamps and crew items too small to read; the
     Kub hull dimensions; the 3M8 tail-fin span (drawn so the two rounds' inner fins just meet).

   Paint (sampled): Krug hull #4a4e45 in shade [K3] -> #4b5537; Kub hull #938f6b (faded museum repaint
   [U5]) taken to ~0.7 with Soviet green -> #4f5a3a; 3M8 grey #9ba09f [K3] -> 0.88; 3M9 radome
   #f3f9fe [U3] -> 0.82.
   Materials: PAINT (canvas texture), DARK, GLASS, TEAM (plain C.team, two small deck plates), VC
   (vertex-coloured: road wheels and the pod).  Nodes: "roadwheel" (one per axle, both sides),
   "turret" (the turntable, trained by render3d on these turret:true rows), "podelev" inside it
   (beam and rounds, hinged at the trunnion; userData.el, userData.cells).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKrugKub = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function raw(hex, k) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex; k = k || 1;
    return [Math.min(1, ((n >> 16) & 255) / 255 * k), Math.min(1, ((n >> 8) & 255) / 255 * k), Math.min(1, (n & 255) / 255 * k)];
  }
  /* one bin of triangles per material: the painted bin gets planar UVs in metres (texture
     repeat 3 m) from each face's dominant axis; a vertex-coloured bin carries bin.col */
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
  function vcView(bin, col) { return { tri: function (a, b, c, na, nb, nc) { bin.col = col; bin.tri(a, b, c, na, nb, nc); } }; }
  function quad(bin, a, b, c, d, want) {
    var f = cross(sub(b, a), sub(c, a));
    if (dot(f, want) >= 0) { bin.tri(a, b, c); bin.tri(a, c, d); }
    else { bin.tri(a, c, b); bin.tri(a, d, c); }
  }
  /* a closed solid: the signed volume says whether the faces point out */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c, cx = 0, cy = 0, cz = 0, W = V;
    for (i = 0; i < V.length; i++) { cx += V[i][0]; cy += V[i][1]; cz += V[i][2]; }
    cx /= V.length; cy /= V.length; cz /= V.length;
    W = V.map(function (p) { return [p[0] - cx, p[1] - cy, p[2] - cz]; });
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(W[f[0]], cross(W[f[1]], W[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-14) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    var t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
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
  function tube(bin, A, B, r) { cyl(bin, A, B, r, r, 6, true); }
  /* a convex XZ outline extruded across y0..y1 */
  function profY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }
  /* a convex plan outline [x, y] thickened between z0 and z1 */
  function prismZ(bin, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }
  /* LOFT through (y, z) sections S[i] at stations X[i]: smooth round each section */
  function loft(bin, X, S) {
    var ns = X.length, n = S[0].length, V = [], N = [], F = [], i, j, k, p, q, r, e, nx, b0, b1;
    for (i = 0; i < ns; i++) for (j = 0; j < n; j++) {
      p = S[i][(j + n - 1) % n]; q = S[i][(j + 1) % n];
      var n2 = [q[1] - p[1], -(q[0] - p[0])], l2 = Math.sqrt(n2[0] * n2[0] + n2[1] * n2[1]) || 1;
      n2 = [n2[0] / l2, n2[1] / l2];
      var i0 = Math.max(0, i - 1), i1 = Math.min(ns - 1, i + 1);
      e = [S[i1][j][0] - S[i0][j][0], S[i1][j][1] - S[i0][j][1]];
      nx = -(e[0] * n2[0] + e[1] * n2[1]) / ((X[i1] - X[i0]) || 1);
      V.push([X[i], S[i][j][0], S[i][j][1]]);
      N.push(unit([nx, n2[0], n2[1]]));
    }
    for (i = 0; i < ns - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n; r = i * n;
      F.push([r + j, r + n + j, r + n + k], [r + j, r + n + k, r + k]);
    }
    for (i = 0; i < 2; i++) {
      var si = i ? ns - 1 : 0, cy = 0, cz = 0, ax = [i ? 1 : -1, 0, 0];
      for (j = 0; j < n; j++) { cy += S[si][j][0] / n; cz += S[si][j][1] / n; }
      b0 = V.length; V.push([X[si], cy, cz]); N.push(ax);
      b1 = V.length;
      for (j = 0; j < n; j++) { V.push([X[si], S[si][j][0], S[si][j][1]]); N.push(ax); }
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push(i ? [b0, b1 + k, b1 + j] : [b0, b1 + j, b1 + k]); }   /* wound as the sides are */
    }
    solid(bin, V, F, N);
  }
  /* rounded-rectangle (y, z) section, counter-clockwise seen from +X */
  function rrSec(w, zb, zt, rt, rb, k) {
    var P = [], C = [[-w + rb, zb + rb, rb, 180], [w - rb, zb + rb, rb, 270], [w - rt, zt - rt, rt, 0], [-w + rt, zt - rt, rt, 90]], c, i, a;
    for (c = 0; c < 4; c++) for (i = 0; i <= k; i++) {
      a = (C[c][3] + 90 * i / k) * Math.PI / 180;
      P.push([C[c][0] + Math.cos(a) * C[c][2], C[c][1] + Math.sin(a) * C[c][2]]);
    }
    return P;
  }
  /* a body of revolution along +X through (y, z): profile [[x, r]...], smooth normals from the slope */
  function revolve(bin, prof, y, z, seg, roll) {
    var V = [], N = [], F = [], i, j, k, a, m = prof.length, dr, dx, l, base;
    roll = roll || 0;
    for (i = 0; i < m; i++) {
      var i0 = Math.max(0, i - 1), i1 = Math.min(m - 1, i + 1);
      dx = prof[i1][0] - prof[i0][0]; dr = prof[i1][1] - prof[i0][1]; l = Math.sqrt(dx * dx + dr * dr) || 1;
      for (j = 0; j < seg; j++) {
        a = j / seg * TAU + roll;
        V.push([prof[i][0], y + prof[i][1] * Math.cos(a), z + prof[i][1] * Math.sin(a)]);
        N.push(unit([-dr / l, dx / l * Math.cos(a), dx / l * Math.sin(a)]));
      }
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % seg;
      F.push([i * seg + j, i * seg + k, (i + 1) * seg + k], [i * seg + j, (i + 1) * seg + k, (i + 1) * seg + j]);
    }
    for (i = 0; i < 2; i++) {
      var si = i ? m - 1 : 0;
      if (prof[si][1] < 1e-4) continue;
      base = V.length; V.push([prof[si][0], y, z]); N.push([i ? 1 : -1, 0, 0]);
      for (j = 0; j < seg; j++) { V.push(V[si * seg + j]); N.push([i ? 1 : -1, 0, 0]); }
      for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push(i ? [base, base + 1 + j, base + 1 + k] : [base, base + 1 + k, base + 1 + j]); }
    }
    solid(bin, V, F, N);
  }
  /* a thin trapezoidal fin on a round lying along +X through (y, z): root a0..a1 at radius r0,
     tip b0..b1 at radius r1, in the plane at roll angle phi (0 = +Y, pi/2 = +Z) */
  function fin(bin, y, z, phi, r0, r1, a0, a1, b0, b1, th) {
    var ry = Math.cos(phi), rz = Math.sin(phi), ny = -rz, nz = ry;
    function p(x, r, o) { return [x, y + ry * r + ny * o, z + rz * r + nz * o]; }
    hexa(bin, [p(a0, r0, -th), p(a1, r0, -th), p(b1, r1, -th), p(b0, r1, -th),
               p(a0, r0, th), p(a1, r0, th), p(b1, r1, th), p(b0, r1, th)]);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      /* one flat coat gone patchy with weather and touch-up: low-contrast drift, no pattern */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 14 + R() * 34;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* plate seams every ~1.1 m (85 px of a 3 m tile), weld beads, grime streaks */
      q.strokeStyle = "rgba(10,12,8,0.28)"; q.lineWidth = 1.2;
      for (i = 0; i < 3; i++) {
        q.beginPath(); q.moveTo(i * 85 + 20, 0); q.lineTo(i * 85 + 20, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 85 + 40); q.lineTo(256, i * 85 + 40); q.stroke();
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.08)" : "rgba(235,232,210,0.05)";
        q.fillRect(R() * 256, R() * 256, 2 + R() * 22, 2 + R() * 14);
      }
      for (i = 0; i < 24; i++) {
        q.fillStyle = "rgba(42,36,24,0.10)";
        q.fillRect(R() * 256, R() * 256, 1.5 + R() * 2, 10 + R() * 30);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2833, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.82, metalness: 0.1 });
    /* vertex colours: the authored sRGB value / 255, as ru_buk.js writes them */
    T.green = raw(V.paint.base, 1.0);
    T.steel = raw(V.paint.base, 1.08);
    T.rubber = raw(0x262726);
    T.hubc = raw(0x55584e);
    T.railc = raw(0x2a2c2e);
    T.dk = raw(0x34372f);
    T.mbody = raw(V.msl.body);
    T.mnose = raw(V.msl.nose);
    T.mwing = raw(V.msl.wing);
    T.mnoz = raw(0x2c2b29);
    return T;
  }
  function flush(THREE, group, B, ox, oz) {
    var k, b, geo, P, i;
    for (k in B) {
      b = B[k];
      if (!b || !b.P || !b.P.length) continue;
      P = b.P;
      if (ox || oz) { P = P.slice(); for (i = 0; i < P.length; i += 3) { P[i] -= ox || 0; P[i + 2] -= oz || 0; } }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------------- the rows */
  /* running gear station tables, read off [K3] (Krug, scaled to the published 7.5 m hull) and
     [U1][U3] (Kub): road wheel x, radius, centre height; the sprocket (S, toothed) and idler (I) */
  var KRUG = {
    key: "pact_e60_sam", len: 9.57,
    paint: { base: "#4b5537", blots: ["#465033", "#525d3d", "#434c31"], seed: 211 },
    msl: { body: 0x8c908c, nose: 0x8c908c, wing: 0x84877f },
    XR: -3.75, XF: 3.75, TY: 1.32, TH: 0.27, DZ: 1.70,
    RG: { XW: [-2.70, -1.89, -1.08, -0.27, 0.54, 1.35, 2.16], RW: 0.34, ZW: 0.36,
          S: { x: 2.98, z: 0.64, r: 0.33 }, I: { x: -3.38, z: 0.62, r: 0.30 },
          ROLL: [-2.30, -0.68, 0.94, 2.56], ZROLL: 0.86, wheel: "holes" },
    TX: -0.85, HX: -2.55, HZ: 2.58, EL: 0.785
  };
  var KUB = {
    key: "pact_e60_kub", len: 7.48,
    paint: { base: "#4f5a3a", blots: ["#4a5536", "#566140", "#47512f"], seed: 212 },
    msl: { body: 0x55603a, nose: 0xc8ccc4, wing: 0x4c5634 },
    XR: -3.45, XF: 3.55, TY: 1.31, TH: 0.25, DZ: 1.66,
    RG: { XW: [-2.30, -1.42, -0.54, 0.34, 1.22, 2.10], RW: 0.31, ZW: 0.33,
          S: { x: -3.02, z: 0.72, r: 0.31 }, I: { x: 2.98, z: 0.60, r: 0.25 },
          ROLL: [], ZROLL: 0, wheel: "ribs" },
    TX: -0.50, HX: -1.35, HZ: 2.30, EL: 0.61
  };
  var RG = KRUG.RG, TY = 1.32, TH = 0.27;

  /* ------------------------------------------------------------- the track */
  function trackLine() {
    var n = RG.XW.length;
    var C = [[RG.S.x, RG.S.z, RG.S.r], [RG.I.x, RG.I.z, RG.I.r], [RG.XW[0], RG.ZW, RG.RW], [RG.XW[n - 1], RG.ZW, RG.RW]], pts = [], i, k, a, r;
    for (i = 0; i < RG.ROLL.length; i++) C.push([RG.ROLL[i], RG.ZROLL, 0.12]);
    for (i = 0; i < C.length; i++) {
      r = C[i][2] + 0.04;
      for (k = 0; k < 24; k++) { a = k / 24 * TAU; pts.push([C[i][0] + Math.cos(a) * r, C[i][1] + Math.sin(a) * r]); }
    }
    pts.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    function cr(o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) {
      while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop();
      lo.push(pts[i]);
    }
    for (i = pts.length - 1; i >= 0; i--) {
      while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop();
      up.push(pts[i]);
    }
    lo.pop(); up.pop();
    return lo.concat(up);
  }
  function addTrack(D, L, y0, y1) {
    var n = L.length, i, j, O = [], I = [], NS = [], e, l, nx, nz, h = 0.04;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; l = Math.sqrt(e[0] * e[0] + e[1] * e[1]) || 1;
      NS.push([e[1] / l, -e[0] / l]);
    }
    for (i = 0; i < n; i++) {
      var p = NS[(i - 1 + n) % n], q = NS[i];
      nx = p[0] + q[0]; nz = p[1] + q[1]; l = Math.sqrt(nx * nx + nz * nz) || 1;
      nx /= l; nz /= l;
      var k = 1 / Math.max(0.5, nx * q[0] + nz * q[1]);
      O.push([L[i][0] + nx * h * k, L[i][1] + nz * h * k]);
      I.push([L[i][0] - nx * h * k, L[i][1] - nz * h * k]);
    }
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      var w = [NS[i][0], 0, NS[i][1]];
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [O[j][0], y1, O[j][1]], [O[i][0], y1, O[i][1]], w);
      quad(D, [I[i][0], y0, I[i][1]], [I[j][0], y0, I[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [-w[0], 0, -w[2]]);
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [I[j][0], y0, I[j][1]], [I[i][0], y0, I[i][1]], [0, -1, 0]);
      quad(D, [O[i][0], y1, O[i][1]], [O[j][0], y1, O[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [0, 1, 0]);
    }
    var acc = 0.1, seg, t;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; seg = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
      t = acc;
      while (t < seg) {
        var px = L[i][0] + e[0] * t / seg, pz = L[i][1] + e[1] * t / seg;
        planeBox(D, [px, 0, pz], [e[0] / seg, 0, e[1] / seg], [0, 1, 0], [NS[i][0], 0, NS[i][1]],
                 -0.035, 0.035, y0 - 0.008, y1 + 0.008, h - 0.01, h + 0.03);
        t += 0.17;
      }
      acc = t - seg;
    }
  }
  function sprocket(P, D, S, y0, y1) {
    var i, a, cx, cz, ym = (y0 + y1) / 2;
    cylY(P, S.x, y0 + 0.03, y1 - 0.03, S.z, S.r - 0.07, 18);
    cylY(D, S.x, y1 - 0.03, y1 + 0.06, S.z, 0.13, 10);
    for (i = 0; i < 12; i++) {
      a = i / 12 * TAU; cx = S.x + Math.cos(a) * (S.r - 0.03); cz = S.z + Math.sin(a) * (S.r - 0.03);
      planeBox(D, [cx, 0, cz], [-Math.sin(a), 0, Math.cos(a)], [0, 1, 0], [Math.cos(a), 0, Math.sin(a)],
               -0.035, 0.035, ym - 0.17, ym + 0.17, -0.04, 0.06);
    }
  }
  function idler(P, D, I, y0, y1) {
    var ym = (y0 + y1) / 2;
    cylY(P, I.x, y0 + 0.04, ym - 0.03, I.z, I.r - 0.03, 16);
    cylY(P, I.x, ym + 0.03, y1 - 0.04, I.z, I.r - 0.03, 16);
    cylY(D, I.x, y1 - 0.04, y1 + 0.04, I.z, 0.11, 10);
  }
  /* one road-wheel axle: rubber tyre pair, the disc (holes on the GM-123, radial ribs on the
     GM-578), hub - both sides of the hull */
  function wheelStation(W, T) {
    var s, c, k, a, o;
    for (s = -1; s <= 1; s += 2) {
      c = s * TY;
      W.col = T.rubber;
      cyl(W, [0, c - s * 0.20, 0], [0, c - s * 0.03, 0], RG.RW, RG.RW, 16);
      cyl(W, [0, c + s * 0.03, 0], [0, c + s * 0.20, 0], RG.RW, RG.RW, 16);
      W.col = T.steel;
      cyl(W, [0, c + s * 0.19, 0], [0, c + s * 0.22, 0], RG.RW - 0.05, RG.RW - 0.05, 16);
      cyl(W, [0, c + s * 0.22, 0], [0, c + s * 0.25, 0], 0.15, 0.12, 10);
      if (RG.wheel === "holes") {
        W.col = T.rubber;
        for (k = 0; k < 6; k++) {
          a = k / 6 * TAU + 0.26;
          cyl(W, [Math.cos(a) * 0.19, c + s * 0.215, Math.sin(a) * 0.19], [Math.cos(a) * 0.19, c + s * 0.225, Math.sin(a) * 0.19], 0.045, 0.045, 6);
        }
      } else {
        W.col = T.steel;
        for (k = 0; k < 10; k++) {
          a = k / 10 * TAU;
          o = [Math.cos(a), 0, Math.sin(a)];
          planeBox(W, [0, c + s * 0.22, 0], o, [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.12, RG.RW - 0.07, 0, s * 0.03, -0.012, 0.012);
        }
      }
      W.col = T.hubc;
      cyl(W, [0, c + s * 0.25, 0], [0, c + s * 0.29, 0], 0.075, 0.055, 8);
    }
  }

  /* ----------------------------------------------------------- the hulls */
  /* The lower hull between the tracks and the upper hull over them, each a loft through side
     stations.  Columns: x, belly z, deck z (the side profile read off [K3] / [U1][U3]); the upper
     hull's plan half-width comes from the track width. */
  function hullLoft(P, X, ZB, ZT, W, rt) {
    var S = [], i;
    for (i = 0; i < X.length; i++) S.push(rrSec(W[i], ZB[i], ZT[i], Math.min(rt, (ZT[i] - ZB[i]) * 0.4), 0.04, 2));
    loft(P, X, S);
  }
  function addKrugHull(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, s, i, x, L = trackLine(), DZ = V.DZ, xr = V.XR, xf = V.XF;
    /* lower hull, between the tracks: square tail, raked lower nose (side station table [K3]) */
    hullLoft(P, [xr, xr + 0.05, 2.80, 3.30, 3.62, xf], [0.62, 0.48, 0.48, 0.58, 0.80, 1.02], [1.12, 1.12, 1.12, 1.12, 1.12, 1.12],
             [1.02, 1.02, 1.02, 1.02, 1.00, 0.96], 0.02);
    /* upper hull over the tracks: deck 1.70, the bow sloping from 2.55 down to 1.05 at the nose */
    hullLoft(P, [xr, xr + 0.06, 2.40, 2.75, 3.20, 3.55, xf], [1.04, 1.04, 1.04, 1.04, 1.04, 1.04, 1.04],
             [DZ - 0.06, DZ, DZ, DZ - 0.10, 1.52, 1.30, 1.12], [1.58, 1.60, 1.60, 1.60, 1.58, 1.55, 1.50], 0.10);
    for (s = -1; s <= 1; s += 2) {
      /* fender ledge over the track and the front mudguard curling over the sprocket */
      box(P, xr + 0.05, 3.30, s * 1.56, s * 1.62, 1.00, 1.06);
      planeBox(P, [3.30, s * 1.46, 1.03], unit([1, 0, -0.45]), [0, 1, 0], unit([0.45, 0, 1]), 0, 0.55, -0.16, 0.16, -0.03, 0.03);
      /* stowage boxes along the hull side, lids and latches [K1][K3] */
      var SB = [[-3.55, -2.45], [-2.40, -1.15], [-1.10, 0.10], [0.15, 1.20], [1.25, 2.35]];
      for (i = 0; i < SB.length; i++) {
        box(P, SB[i][0], SB[i][1], s * 1.58, s * 1.64, 1.10, DZ - 0.08);
        box(D, SB[i][0] + 0.05, SB[i][1] - 0.05, s * 1.64, s * 1.65, DZ - 0.14, DZ - 0.11);
        box(D, (SB[i][0] + SB[i][1]) / 2 - 0.05, (SB[i][0] + SB[i][1]) / 2 + 0.05, s * 1.64, s * 1.66, 1.36, 1.44);
      }
      addTrack(D, L, s * TY - TH, s * TY + TH);
      sprocket(P, D, RG.S, s * TY - TH, s * TY + TH);
      idler(P, D, RG.I, s * TY - TH, s * TY + TH);
      for (i = 0; i < RG.ROLL.length; i++) {
        cylY(D, RG.ROLL[i], s * (TY - 0.12), s * (TY + 0.12), RG.ZROLL, 0.11, 10);
        cylY(P, RG.ROLL[i], s * (TY - 0.30), s * (TY - 0.12), RG.ZROLL, 0.04, 6);
      }
      /* road-wheel swing arms out of the lower hull */
      for (i = 0; i < RG.XW.length; i++)
        planeBox(D, [RG.XW[i], 0, RG.ZW], unit([-0.30, 0, 0.15]), [0, 1, 0], unit([0.15, 0, 0.30]), 0, 0.34, s * 1.00, s * 1.08, -0.05, 0.05);
      /* bow: headlamps in guards, tow hooks [K1] */
      cyl(P, [3.36, s * 1.18, 1.50], [3.50, s * 1.18, 1.46], 0.10, 0.10, 10);
      cyl(G, [3.50, s * 1.18, 1.46], [3.51, s * 1.18, 1.46], 0.08, 0.08, 10);
      tube(D, [3.56, s * 1.06, 1.38], [3.56, s * 1.30, 1.38], 0.014);
      tube(D, [3.56, s * 1.06, 1.38], [3.50, s * 1.06, 1.60], 0.014);
      tube(D, [3.56, s * 1.30, 1.38], [3.50, s * 1.30, 1.60], 0.014);
      box(D, xf - 0.02, xf + 0.10, s * 0.62, s * 0.76, 0.86, 0.98);
      /* rear plate: tow eyes, lamps, the two exhausts [K3] */
      box(D, xr - 0.08, xr, s * 0.80, s * 0.94, 0.62, 0.74);
      box(D, xr - 0.04, xr, s * 1.20, s * 1.40, 1.48, 1.60);
      cyl(D, [xr - 0.14, s * 0.40, 1.34], [xr, s * 0.40, 1.34], 0.08, 0.08, 10);
    }
    /* the bow equipment bench: the slab over the sloped nose and the driver's hatch [K1][K3] */
    planeBox(P, [3.20, 0, 1.52], unit([0.35, 0, -0.80]), [0, 1, 0], unit([0.80, 0, 0.35]), 0, 0.30, -1.10, 1.10, 0, 0.06);
    box(P, 2.20, 3.00, -1.15, -0.20, DZ - 0.02, DZ + 0.14);
    cylZ(P, 2.55, 0.70, DZ - 0.02, DZ + 0.09, 0.28, 16);
    cylZ(P, 2.55, 0.70, DZ + 0.09, DZ + 0.12, 0.22, 16);
    for (i = 0; i < 3; i++) box(G, 2.86, 2.92, 0.50 + i * 0.16, 0.62 + i * 0.16, DZ + 0.00, DZ + 0.06);
    /* rear deck louvres and the team plates */
    box(D, -3.65, -2.75, -1.05, 1.05, DZ - 0.01, DZ + 0.012);
    for (x = -3.61; x < -2.78; x += 0.14) box(P, x, x + 0.05, -1.03, 1.03, DZ - 0.01, DZ + 0.04);
    box(B.team, -3.62, -3.18, -1.45, -1.08, DZ, DZ + 0.02);
    box(B.team, -3.62, -3.18, 1.08, 1.45, DZ, DZ + 0.02);
  }
  function addKubHull(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, s, i, x, L = trackLine(), DZ = V.DZ, xr = V.XR, xf = V.XF;
    /* lower hull: vertical rear plate, the long raked lower nose [U3][U2] */
    hullLoft(P, [xr, xr + 0.05, 2.70, 3.10, 3.40, xf], [0.62, 0.46, 0.46, 0.56, 0.74, 0.92], [1.10, 1.10, 1.10, 1.10, 1.10, 1.10],
             [1.00, 1.00, 1.00, 1.00, 0.98, 0.96], 0.02);
    /* upper hull: flat deck 1.66 from the tail to 2.35, the upper glacis down to 1.18 at the nose */
    hullLoft(P, [xr, xr + 0.06, 2.35, 2.95, 3.35, xf], [1.02, 1.02, 1.02, 1.02, 1.02, 1.02],
             [DZ - 0.05, DZ, DZ, 1.46, 1.28, 1.16], [1.58, 1.58, 1.58, 1.57, 1.55, 1.50], 0.08);
    /* the two rounded hump covers on the upper glacis [U3][U2] */
    for (s = -1; s <= 1; s += 2) {
      /* each a half-round cover lying on the slope, its crown just under the deck line */
      cyl(P, [3.38, s * 0.54, 1.05], [2.62, s * 0.54, 1.37], 0.30, 0.30, 16);
      box(D, 2.35, 2.42, s * 0.20, s * 0.80, DZ - 0.02, DZ + 0.03);
    }
    for (s = -1; s <= 1; s += 2) {
      /* the side boxes over the track, from tail to bow, with panel seams [U1] */
      box(P, xr + 0.02, 2.60, s * 1.50, s * 1.60, 1.04, DZ - 0.04);
      for (x = -3.05; x < 2.4; x += 1.10) box(D, x, x + 0.03, s * 1.60, s * 1.61, 1.08, DZ - 0.08);
      box(D, -2.80, 2.40, s * 1.60, s * 1.612, DZ - 0.12, DZ - 0.10);
      /* the wide flat fender at the bow corner, sloping down to the nose [U3] */
      planeBox(P, [2.60, s * 1.57, 1.02], unit([1, 0, -0.42]), [0, 1, 0], unit([0.42, 0, 1]), 0, 1.02, -0.13, 0.08, -0.03, 0.03);
      box(P, 2.60, 3.05, s * 1.33, s * 1.60, 1.06, 1.34);
      addTrack(D, L, s * TY - TH, s * TY + TH);
      sprocket(P, D, RG.S, s * TY - TH, s * TY + TH);
      idler(P, D, RG.I, s * TY - TH, s * TY + TH);
      for (i = 0; i < RG.XW.length; i++)
        planeBox(D, [RG.XW[i], 0, RG.ZW], unit([0.30, 0, 0.15]), [0, 1, 0], unit([-0.15, 0, 0.30]), 0, 0.32, s * 1.00, s * 1.08, -0.05, 0.05);
      /* bow: headlamps on the fenders, tow hooks; rear: the mud flaps, lamps, tow eyes [U3][U5] */
      cyl(P, [3.00, s * 1.25, 1.40], [3.12, s * 1.25, 1.40], 0.09, 0.09, 10);
      cyl(G, [3.12, s * 1.25, 1.40], [3.13, s * 1.25, 1.40], 0.07, 0.07, 10);
      box(D, xf - 0.02, xf + 0.10, s * 0.60, s * 0.74, 0.86, 0.98);
      box(D, xr - 0.03, xr + 0.02, s * 1.30, s * 1.62, 0.66, 1.04);
      box(D, xr - 0.04, xr, s * 1.05, s * 1.25, 1.44, 1.56);
      box(D, xr - 0.08, xr, s * 0.70, s * 0.84, 0.60, 0.72);
      /* the two round ports in the rear plate [U5] */
      cyl(D, [xr - 0.03, s * 0.28 + 0.18, 1.32], [xr + 0.01, s * 0.28 + 0.18, 1.32], 0.15, 0.15, 14);
    }
    /* rear plate: the mesh grille low in the middle [U5] */
    box(D, xr - 0.02, xr + 0.01, -0.62, 0.62, 0.70, 0.98);
    for (i = 0; i < 9; i++) box(P, xr - 0.04, xr - 0.01, -0.60 + i * 0.15, -0.57 + i * 0.15, 0.70, 0.98);
    /* driver's hatch front left, vision blocks; engine louvres at the rear */
    cylZ(P, 2.05, 0.75, DZ - 0.02, DZ + 0.08, 0.28, 16);
    cylZ(P, 2.05, 0.75, DZ + 0.08, DZ + 0.11, 0.22, 16);
    for (i = 0; i < 3; i++) box(G, 2.36, 2.44, 0.52 + i * 0.16, 0.64 + i * 0.16, DZ - 0.04, DZ + 0.03);
    box(D, -3.35, -2.30, -1.05, 1.05, DZ - 0.01, DZ + 0.012);
    for (x = -3.31; x < -2.33; x += 0.14) box(P, x, x + 0.05, -1.03, 1.03, DZ - 0.01, DZ + 0.04);
    box(B.team, -2.15, -1.75, -1.30, -0.85, DZ, DZ + 0.02);
    box(B.team, -2.15, -1.75, 0.85, 1.30, DZ, DZ + 0.02);
  }

  /* ---------------------------------------------------------------- rounds */
  /* 3M8: radii along the round from the nozzle (x = 0) to the tip (8.78), read off [K3] (the
     body), [K2] (the centre body standing out of the lip) and scaled to the published 8.784 x 0.86 */
  var REV_3M8 = [[0.00, 0.30], [0.08, 0.40], [0.22, 0.43], [6.48, 0.43], [6.52, 0.45], [6.62, 0.45],
                 [6.64, 0.30], [7.10, 0.27], [7.60, 0.21], [8.10, 0.13], [8.55, 0.045], [8.78, 0.0]];
  function round3M8(B, Tm, x0, y, z) {
    var M = vcView(B, Tm.mbody), Wn = vcView(B, Tm.mwing), N = vcView(B, Tm.mnoz), k, phi, by, bz, prof = [], i;
    for (i = 0; i < REV_3M8.length; i++) prof.push([x0 + REV_3M8[i][0], REV_3M8[i][1]]);
    revolve(M, prof, y, z, 20);
    cyl(N, [x0 - 0.02, y, z], [x0 + 0.04, y, z], 0.26, 0.26, 14);
    /* joint bands on the body */
    for (i = 0; i < 3; i++) cyl(Wn, [x0 + [2.40, 4.95, 5.90][i], y, z], [x0 + [2.40, 4.95, 5.90][i] + 0.05, y, z], 0.437, 0.437, 18, true);
    for (k = 0; k < 4; k++) {
      /* the four boosters at the diagonals: tail to just behind the wings [K3] */
      phi = Math.PI / 4 + k * Math.PI / 2;
      by = y + Math.cos(phi) * 0.60; bz = z + Math.sin(phi) * 0.60;
      revolve(M, [[x0 - 0.10, 0.10], [x0 - 0.02, 0.15], [x0 + 0.05, 0.165], [x0 + 3.00, 0.165], [x0 + 3.25, 0.12], [x0 + 3.42, 0.04], [x0 + 3.46, 0.0]], by, bz, 10);
      cyl(N, [x0 - 0.16, by, bz], [x0 - 0.10, by, bz], 0.09, 0.09, 8);
      tube(Wn, [x0 + 0.50, y + Math.cos(phi) * 0.42, z + Math.sin(phi) * 0.42], [x0 + 0.50, by - Math.cos(phi) * 0.15, bz - Math.sin(phi) * 0.15], 0.03);
      tube(Wn, [x0 + 2.70, y + Math.cos(phi) * 0.42, z + Math.sin(phi) * 0.42], [x0 + 2.70, by - Math.cos(phi) * 0.15, bz - Math.sin(phi) * 0.15], 0.03);
      /* cropped-delta wings in the X set ahead of the boosters [K3][K1] */
      fin(Wn, y, z, phi, 0.42, 1.02, x0 + 3.52, x0 + 4.62, x0 + 4.02, x0 + 4.40, 0.022);
      /* tail fins in the + set, the vertical pair high [K3] */
      fin(Wn, y, z, k * Math.PI / 2, 0.42, 0.97, x0 + 0.12, x0 + 0.98, x0 + 0.42, x0 + 0.84, 0.02);
    }
  }
  /* 3M9: 5.80 x 0.335 (published), wing span 1.245 (published); radome, intakes, fins off [U1][U3] */
  function round3M9(B, Tm, x0, y, z) {
    var M = vcView(B, Tm.mbody), No = vcView(B, Tm.mnose), Wn = vcView(B, Tm.mwing), N = vcView(B, Tm.mnoz), k, phi, a;
    revolve(M, [[x0, 0.12], [x0 + 0.05, 0.155], [x0 + 0.20, 0.1675], [x0 + 4.45, 0.1675]], y, z, 16);
    revolve(No, [[x0 + 4.45, 0.1675], [x0 + 4.80, 0.160], [x0 + 5.15, 0.130], [x0 + 5.45, 0.085], [x0 + 5.68, 0.035], [x0 + 5.80, 0.0]], y, z, 16);
    cyl(N, [x0 - 0.02, y, z], [x0 + 0.02, y, z], 0.11, 0.11, 12);
    cyl(Wn, [x0 + 4.42, y, z], [x0 + 4.46, y, z], 0.172, 0.172, 16, true);
    for (k = 0; k < 4; k++) {
      phi = Math.PI / 4 + k * Math.PI / 2;
      /* mid wings and tail fins in the X set [U2][U3] */
      fin(Wn, y, z, phi, 0.16, 0.6225, x0 + 2.30, x0 + 3.20, x0 + 2.85, x0 + 3.12, 0.014);
      fin(Wn, y, z, phi, 0.16, 0.47, x0 + 0.04, x0 + 0.62, x0 + 0.30, x0 + 0.56, 0.012);
      /* four intake ducts between the wings, fairing into the body aft [U3] */
      a = k * Math.PI / 2;
      var dy = Math.cos(a), dz = Math.sin(a);
      cyl(M, [x0 + 3.45, y + dy * 0.19, z + dz * 0.19], [x0 + 1.55, y + dy * 0.19, z + dz * 0.19], 0.055, 0.055, 6, true);
      cyl(N, [x0 + 3.46, y + dy * 0.19, z + dz * 0.19], [x0 + 3.44, y + dy * 0.19, z + dz * 0.19], 0.045, 0.045, 6);
      cyl(M, [x0 + 1.55, y + dy * 0.19, z + dz * 0.19], [x0 + 1.25, y + dy * 0.16, z + dz * 0.16], 0.055, 0.02, 6);
    }
  }

  /* ------------------------------------------------------- Krug launcher */
  /* turntable: ring, slab, the base box and the trunnion brackets at its rear, the ram sleeves.
     The pod (beam, cradles, rounds) is hinged at (HX, HZ), the rear end of the beam [K3]. */
  function krugTurntable(B, V) {
    var P = B.paint, D = B.dark, s, DZ = V.DZ, TX = V.TX;
    cylZ(D, TX, 0, DZ - 0.02, DZ + 0.04, 1.30, 28);
    cylZ(P, TX, 0, DZ + 0.04, DZ + 0.16, 1.24, 28);
    /* base girder from the trunnions to the ram mounts, with the equipment box [K3] */
    prismZ(P, [[V.HX - 0.25, -0.75], [TX + 1.25, -0.75], [TX + 1.45, -0.50], [TX + 1.45, 0.50], [TX + 1.25, 0.75], [V.HX - 0.25, 0.75]], DZ + 0.16, 2.20);
    box(P, TX - 0.80, TX + 0.40, -1.15, -0.75, DZ + 0.16, 2.12);
    box(D, TX - 0.70, TX + 0.30, -1.16, -1.15, DZ + 0.30, 2.00);
    box(P, TX - 0.80, TX + 0.40, 0.75, 1.15, DZ + 0.16, 2.05);
    for (s = -1; s <= 1; s += 2) {
      profY(P, [[V.HX - 0.30, 2.18], [V.HX + 0.40, 2.18], [V.HX + 0.18, V.HZ + 0.10], [V.HX - 0.14, V.HZ + 0.12]], s * 0.48 - 0.06, s * 0.48 + 0.06);
      cylY(D, V.HX, s * 0.48 - 0.10, s * 0.48 + 0.10, V.HZ, 0.11, 12);
      /* the elevating rams' sleeves at the front of the base [K3] */
      cyl(D, [TX + 1.20, s * 0.55, 2.18], [TX + 1.45, s * 0.55, 2.42], 0.10, 0.10, 10);
    }
    box(B.team, TX - 0.40, TX + 0.20, -0.30, 0.30, 2.20, 2.215);
  }
  function krugPod(Pb, Tm, V, cells) {
    var Dv = vcView(Pb, Tm.dk), Gv = vcView(Pb, Tm.green), s, i, x, YR = 0.98, ZA = 3.43, x0 = -3.10, HX = V.HX, HZ = V.HZ;
    /* the box-girder launch beam: from the trunnion forward, its top 2.98 [K3] */
    /* a dark lattice girder [K1][K3]: a narrow core, the top and bottom chords each side and the
       X-braced web between them over its front 60 % */
    box(Dv, HX - 0.20, 2.75, -0.16, 0.16, HZ - 0.20, 2.92);
    for (s = -1; s <= 1; s += 2) {
      box(Dv, HX - 0.20, 2.75, s * 0.30, s * 0.38, 2.84, 2.96);
      box(Dv, HX - 0.20, 2.75, s * 0.30, s * 0.38, HZ - 0.24, HZ - 0.12);
      box(Dv, HX - 0.20, -0.10, s * 0.16, s * 0.37, HZ - 0.20, 2.90);
      for (x = -0.10; x < 2.6; x += 0.57) {
        box(Dv, x, x + 0.06, s * 0.31, s * 0.37, HZ - 0.14, 2.86);
        tube(Dv, [x + 0.03, s * 0.34, HZ - 0.13], [x + 0.60, s * 0.34, 2.85], 0.022);
        tube(Dv, [x + 0.03, s * 0.34, 2.85], [x + 0.60, s * 0.34, HZ - 0.13], 0.022);
      }
    }
    cylY(Dv, HX, -0.58, 0.58, HZ, 0.12, 12);
    /* cross bearers, the saddle cradles under each round and the tubular A-frames at the front
       of the beam, rising to the body [K1][K3] */
    var CX = [-2.15, -0.10, 1.55, 2.60];
    for (i = 0; i < CX.length; i++) box(Gv, CX[i] - 0.10, CX[i] + 0.10, -1.30, 1.30, 2.86, 2.98);
    for (s = -1; s <= 1; s += 2) {
      var y = s * YR;
      round3M8(Pb, Tm, x0, y, ZA);
      cells.push([x0 + 8.78, y, ZA, x0]);
      for (i = 0; i < CX.length; i++) {
        tube(Gv, [CX[i], y - 0.40, 2.97], [CX[i], y - 0.22, ZA - 0.38], 0.035);
        tube(Gv, [CX[i], y + 0.40, 2.97], [CX[i], y + 0.22, ZA - 0.38], 0.035);
        box(Dv, CX[i] - 0.08, CX[i] + 0.08, y - 0.24, y + 0.24, ZA - 0.46, ZA - 0.42);
      }
      /* the tubular front cradle: two A-frames under each round's fore body, legs from the beam's
         lower chord and the cross bearer up to a collar round the body, braced [K1][K3] */
      var AX = [1.85, 2.55], j;
      for (j = 0; j < 2; j++) {
        tube(Gv, [AX[j], s * 0.36, HZ - 0.12], [AX[j], y - s * 0.24, ZA - 0.34], 0.055);
        tube(Gv, [AX[j], s * 1.28, 2.90], [AX[j], y + s * 0.24, ZA - 0.34], 0.055);
        tube(Gv, [AX[j], s * 0.36, HZ - 0.12], [AX[j], s * 1.28, 2.90], 0.045);
        cyl(Gv, [AX[j] - 0.05, y, ZA], [AX[j] + 0.05, y, ZA], 0.46, 0.46, 18, true);
      }
      tube(Gv, [AX[0], s * 0.36, HZ - 0.12], [AX[1], y - s * 0.24, ZA - 0.34], 0.04);
      tube(Gv, [AX[0], s * 1.28, 2.90], [AX[1], y + s * 0.24, ZA - 0.34], 0.04);
      /* the guide rail under each round */
      box(Dv, -2.95, 2.20, y - 0.05, y + 0.05, ZA - 0.48, ZA - 0.43);
    }
    /* the tail support frame across the rear, under the tails [K3] */
    box(Gv, HX - 0.35, HX - 0.15, -1.25, 1.25, HZ - 0.05, HZ + 0.35);
    for (s = -1; s <= 1; s += 2) tube(Gv, [HX - 0.25, s * 1.20, HZ + 0.35], [HX - 0.25, s * 0.98, ZA - 0.55], 0.04);
  }

  /* -------------------------------------------------------- Kub launcher */
  function kubTurntable(B, V) {
    var P = B.paint, D = B.dark, s, DZ = V.DZ, TX = V.TX;
    cylZ(D, TX, 0, DZ - 0.02, DZ + 0.04, 1.12, 28);
    cylZ(P, TX, 0, DZ + 0.04, DZ + 0.14, 1.08, 28);
    /* the squat launcher base box on the turntable [U1][U5] */
    prismZ(P, [[V.HX - 0.25, -0.95], [TX + 0.95, -0.95], [TX + 1.15, -0.70], [TX + 1.15, 0.70], [TX + 0.95, 0.95], [V.HX - 0.25, 0.95]], DZ + 0.14, 2.06);
    box(D, TX - 0.40, TX + 0.70, -0.96, -0.95, DZ + 0.24, 1.98);
    box(D, TX - 0.40, TX + 0.70, 0.95, 0.96, DZ + 0.24, 1.98);
    for (s = -1; s <= 1; s += 2) {
      profY(P, [[V.HX - 0.24, 2.04], [V.HX + 0.34, 2.04], [V.HX + 0.14, V.HZ + 0.10], [V.HX - 0.12, V.HZ + 0.12]], s * 0.62 - 0.06, s * 0.62 + 0.06);
      cylY(D, V.HX, s * 0.62 - 0.09, s * 0.62 + 0.09, V.HZ, 0.10, 12);
      cyl(D, [TX + 0.85, s * 0.40, 2.06], [TX + 1.05, s * 0.40, 2.20], 0.08, 0.08, 10);
    }
    box(B.team, TX - 0.10, TX + 0.50, -0.30, 0.30, 2.06, 2.075);
  }
  function kubPod(Pb, Tm, V, cells) {
    var Dv = vcView(Pb, Tm.dk), Gv = vcView(Pb, Tm.green), s, i, k, YY = [0.88, 0, -0.88], ZA = 2.74, x0 = -1.85, HX = V.HX, HZ = V.HZ;
    cylY(Dv, HX, -0.75, 0.75, HZ, 0.10, 12);
    /* the frame: two cross girders and the side members [U3] */
    box(Gv, HX - 0.05, HX + 0.25, -1.38, 1.38, HZ - 0.10, HZ + 0.12);
    box(Gv, 0.70, 0.95, -1.38, 1.38, HZ - 0.06, HZ + 0.14);
    for (s = -1; s <= 1; s += 2) box(Gv, HX - 0.05, 0.95, s * 1.30, s * 1.38, HZ - 0.08, HZ + 0.10);
    for (k = 0; k < 3; k++) {
      var y = YY[k];
      round3M9(Pb, Tm, x0, y, ZA);
      cells.push([x0 + 5.80, y, ZA, x0]);
      /* each round's own rail beam with the hanger shoes [U1][U3] */
      box(Gv, x0 + 0.20, 1.55, y - 0.09, y + 0.09, HZ + 0.10, ZA - 0.26);
      box(Dv, x0 + 0.25, 1.50, y - 0.05, y + 0.05, ZA - 0.26, ZA - 0.21);
      for (i = 0; i < 2; i++) box(Dv, [-0.95, 0.85][i] - 0.08, [-0.95, 0.85][i] + 0.08, y - 0.04, y + 0.04, ZA - 0.22, ZA - 0.16);
      box(Gv, -0.40, 0.10, y - 0.16, y + 0.16, HZ + 0.10, HZ + 0.26);
    }
    /* the guard frame each side: a tubular fence outboard of the outer round - the tall front loop
       with three rungs, the rear loop and the top rail joining them, parallel to the rails [U1][U3][U5] */
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.36, zt = HZ + 1.08, xf0 = 0.62, xf1 = 0.92, xr0 = HX + 0.02, xr1 = HX + 0.30;
      tube(Gv, [xf0, yo, HZ + 0.12], [xf0, yo, zt - 0.10], 0.03);
      tube(Gv, [xf1, yo, HZ + 0.12], [xf1, yo, zt - 0.10], 0.03);
      tube(Gv, [xf0, yo, zt - 0.10], [xf0 + 0.08, yo, zt], 0.03);
      tube(Gv, [xf1, yo, zt - 0.10], [xf1 - 0.08, yo, zt], 0.03);
      for (i = 0; i < 3; i++) tube(Gv, [xf0, yo, HZ + 0.38 + i * 0.22], [xf1, yo, HZ + 0.38 + i * 0.22], 0.02);
      tube(Gv, [xr0, yo, HZ + 0.12], [xr0, yo, zt - 0.10], 0.03);
      tube(Gv, [xr1, yo, HZ + 0.12], [xr1, yo, zt - 0.10], 0.03);
      tube(Gv, [xr0, yo, zt - 0.10], [xr0 + 0.08, yo, zt], 0.03);
      tube(Gv, [xr1, yo, zt - 0.10], [xr1 - 0.08, yo, zt], 0.03);
      tube(Gv, [xr0 + 0.08, yo, zt], [xf1 - 0.08, yo, zt], 0.03);
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C, V) {
    var Tm = materials(THREE, C, V), g = new THREE.Group(), i, wg, W, isK = V.key === "pact_e60_sam";
    RG = V.RG; TY = V.TY; TH = V.TH;
    var HB = { paint: new Bin(Tm.paint, true), dark: new Bin(Tm.dark), glass: new Bin(Tm.glass), team: new Bin(Tm.team) };
    if (isK) addKrugHull(HB, V); else addKubHull(HB, V);
    flush(THREE, g, HB);
    for (i = 0; i < RG.XW.length; i++) {
      W = new Bin(Tm.vc, false, true);
      wheelStation(W, Tm);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(RG.XW[i], 0, RG.ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    var TB = { paint: new Bin(Tm.paint, true), dark: new Bin(Tm.dark), team: new Bin(Tm.team) };
    var PB = new Bin(Tm.vc, false, true), cells = [];
    if (isK) { krugTurntable(TB, V); krugPod(PB, Tm, V, cells); }
    else { kubTurntable(TB, V); kubPod(PB, Tm, V, cells); }
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(V.TX, 0, 0);
    flush(THREE, tg, TB, V.TX, 0);
    var eg = new THREE.Group();
    eg.name = "podelev";
    eg.position.set(V.HX - V.TX, 0, V.HZ);
    flush(THREE, eg, { vc: PB }, V.HX, V.HZ);
    eg.userData.el = V.EL;
    /* mouth x, y, z (the round's nose) and the rear x (its tail), in this group's frame */
    eg.userData.cells = cells.map(function (c) { return [c[0] - V.HX, c[1], c[2] - V.HZ, c[3] - V.HX]; });
    tg.add(eg);
    g.add(tg);
    g.name = V.key;
    return g;
  }

  return { build: build, KRUG: KRUG, KUB: KUB };
})();

UNIT_MODELS["pact_e60_sam"] = { len: 9.57, build: function (THREE, M, C) { return HeroKrugKub.build(THREE, M, C, HeroKrugKub.KRUG); } };
UNIT_MODELS["pact_e60_kub"] = { len: 7.48, build: function (THREE, M, C) { return HeroKrugKub.build(THREE, M, C, HeroKrugKub.KUB); } };
