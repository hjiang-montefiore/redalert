/* ===== us_tpq53.js - HERO model: AN/TPQ-53 counterfire target acquisition radar on the FMTV 6x6 =====
   Full-quality redo (2026-10-24).  Two keys, both kept, one vehicle in two coats:
     nato_e00_radarv  "AN/TPQ-53 Quick Reaction Capability Radar"  (js/eras.js, e00, service 2013)  -> tan CARC
     radarv_n         "AN/TPQ-53 Radar Vehicle"                     (js/rules.js, e20, service 2011)  -> green CARC
   Build name kept: HeroTpq53.build (read by nothing else; it now takes a fourth argument, the coat).
   Neither row is deploy:true and a radar has no weapon, so js/entities.js never sets e.deployed for them: a
   "deploypose"/"travelpose" pair would show the travel pose for ever.  As the old file did, ONE pose is drawn: the
   working pose, array raised, stabilisers down.  The travel pose (array lowered flat over the bed) is not drawn.

   FACTS kept from the old header (checked against the photographs): an Oshkosh FMTV 5-ton MTV (M1083 series) 6x6
   with the armoured cab; 7.27 m long, 2.44 m wide (M1083A1P2 published); 395/85R20 tyres (1.18 m); the radar is not
   in a shelter: the array stands on a turntable over an equipment housing on the bed and turns (90-degree sector or
   360); "Quick Reaction Capability" is the programme's name, not a second configuration.
   CORRECTED: the old model put the array close behind the cab on a short enclosure, leaning back, held by one tilt
   tube; the photographs show it upright between two columns over a full-width housing further aft (E), with a
   spare wheel and a cabinet between it and the cab (E), the port column the heavy one with a brace at its foot (A,
   C); the array is taller than drawn (h : w 1.42 in A and E, was 1.17); the stabilisers are outriggers angled out
   under the bed front (A) and jacks at the tail (C), not legs at the enclosure.  The old cab profile was a soft-cab
   outline; D shows the armoured cab's bolted plates, rounded door window, three amber markers each side of the brow.

   REFERENCES (Wikimedia Commons at width 960, fetched 2026-10-24):
     A "Q-53 Counterfire Target Acquisition Radar.jpg"   US Army, PD, 19 Nov 2014: two Q-53 sets, front-left three
                                                          quarter, tan: cab front, the array up, the outrigger out.
     B "Q-53 truck-mounted mobile CTA radar system.jpg"  US Army, PD, 10 Oct 2012 Pentagon display: tan (paint).
     C "ANTPQ-53 Weapon Locating Radar AOH 2022 300522.jpg"  (CC BY-SA, Singapore 2022): the rear-left quarter: the
                                                          plain radome face, the port column, the tail jacks.  Shape only.
     D "240911-F-DL909-1032 - Arctic Angels deploy to Aleutian Islands.jpg"  USAF, PD, 11 Sep 2024: the armoured cab's
                                                          side close up, tan: bolts, the door window, markers, mirrors.
     E "U S - ROU Joint Radar Training (9956466).jpg"     US Army, PD, 9 Sep 2026, Grafenwoehr: port side from above,
                                                          GREEN: the housing, the turntable, both columns, the module
                                                          bays on the array's back, spare wheel, cab whips.

   RECOGNITION LIST (each one drawn):
     1  the FMTV armoured cab: a tall square shell over the front axle, chamfered front corners with quarter windows
        (A, D)                                                                                   -> CABS, cab()
     2  two separate armoured windscreens in thick frames, raked, the brow with amber markers (A, D)   -> cab()
     3  the grille band and the deep bumper with the lamps in it (A)                               -> cab()
     4  the rounded door window, mirrors on long arms, the bolted plates (D)                       -> cab(), paintTex
     5  three axles: one under the cab, a tandem behind, single big tyres (A, E)                   -> tyre()
     6  the spare wheel upright behind the cab, the louvred cabinet beside it (E)                  -> bed()
     7  the square housing on the bed with the turntable on its roof (E, C)                         -> bed(), array()
     8  the tall flat array raised above the cab roof between two columns, plain face (A, C, E)    -> array()
     9  the module bays across the array's back (E)                                                -> array()
     10 the outriggers angled out under the bed front (A) and the jacks at the tail (C)            -> bed()
     11 whip aerials on the cab's back corners (A, E)                                               -> cab()
   STATIONS (x forward from the bed's middle, z up; the truck's axle and cab figures are the old file's, which A
   and E do not contradict): bumper 3.62, cab face 3.46, cab back 1.25, roof 3.04; axles 2.40, -0.94, -2.26;
   pintle -3.65; deck 1.34; housing -1.95 .. 0.05, roof 2.60 (E, C); turntable axis -0.95; array 2.0 m wide, 2.85 m tall,
   lower edge 3.05 (just over the cab roof, A, E), top 5.90.  The array's size is NOT published: scaled off A and E
   against the 1.18 m tyre and the cab, an estimate (+-10 per cent).  The housing's fore-and-aft place is read off
   E, a high oblique view: an estimate.

   Paint, by the dated photographs: tan CARC 686A for the 2000s-10s row (B 2012, A 2014; D 2024 is still tan),
   drawn #ab9a7b as us_hemtt.js (D samples #b3a28f overcast); green CARC 383 for the present-day row (E, 2026,
   US Army in Germany; the old header also found a Korea-based green set of 2025), sampled #44493f overcast, drawn
   #4b5340.  Tan sets were still photographed in 2024-25, so the green is the latest dated coat, not the only one.
   No markings.
   NOT drawn: the towed generator trailer (A, E), the separate operations shelter truck (A), camouflage netting,
   cables on the ground, the far-side (starboard) fittings, which no photograph shows (drawn as the port side).

   Nodes: "turret" (turntable centre on the housing roof, the array face along +X at rest; render3d trains it by
   -(tang - ang), and a radar has no weapon, so it stands at any yaw: everything of it lies within 1.25 m of the
   axis, which is 2.2 m behind the cab's back wall and 1.4 m behind the cabinet), three "roadwheel" groups (an axle
   each, both tyres), "hull".  Team colour: C.team panels on the cab roof and the rear-deck box.
   Model space: +X nose, +Y port, +Z up, metres, tyres and stabiliser feet on z = 0.  ASCII only.
   DETAIL PASS 2 (the owner: the models looked plainer than the old ones): detail() and arrayDetail() on dpKit; the paint takes dpWeather.  nato_e00_radarv / radarv_n 8588 ->
     11116 tris, 15 draw calls.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTpq53 = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var VARIANTS = {
    e00: { base: "#ab9a7b", tone: ["#b3a283", "#a29171"], seed: 2014, face: 0xb2a283 },
    e20: { base: "#4b5340", tone: ["#535b47", "#434a39"], seed: 2026, face: 0x4a5240 }
  };
  var XF = 2.40, XR1 = -0.94, XR2 = -2.26, TR = 0.59, YT = 1.02;
  var X_BUMP = 3.62, X_PIN = -3.65, CAB_X0 = 1.25, CAB_Z1 = 3.04, DECK = 1.34;
  var HX0 = -1.95, HX1 = 0.05, HZ = 2.60, PIV_X = -0.95;
  var AW = 2.00, AH = 2.85, ZB = 3.05 - HZ;   /* the array: width, height, lower edge over the housing roof */
  var LEN = 7.31;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so the paint never stretches */
  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };

  /* a closed solid.  Whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not.
     smooth: average the face normals at shared corners (cast surfaces) */
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
      if (dot(fn, fn) < 1e-16) continue;                  /* a crease slit */
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
  /* a box turned about Z: centre (cx, cy), half sizes hx (along ang), hy */
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
  }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a convex outline in plan, thickened between z0 and z1 */
  function prism(bin, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* a capped cylinder or cone between two centres, smooth round the side.
     The faces are written outward directly, so a cap can be left off. */
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
  function cylY(bin, x, y0, y1, z, r, seg, nocapA, nocapB) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocapA, nocapB); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  /* ear clipping, for the end plates of the lofts (some are not convex) */
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
    else for (i = 1; i < idx.length - 1; i++) out.push([idx[0], idx[i], idx[i + 1]]);   /* give up cleanly */
    return out;
  }

  /* a skin lofted through cross-section rings (arrays of [x, y, z] with the
     same count each), capped at both ends.  Rings are re-ordered so they run
     counter-clockwise in the YZ plane, whatever the caller wrote. */
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

  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* a side profile in (x, z) thickened between y0 and y1.  The outline need not be convex: the end plates are
     ear-clipped, and the outline is taken counter-clockwise first so the sides and plates agree */
  function profY(bin, pts, y0, y1) {
    var n, V = [], F = [], i, k, T, ar = 0, a, b;
    for (i = 0; i < pts.length; i++) { a = pts[i]; b = pts[(i + 1) % pts.length]; ar += a[0] * b[1] - b[0] * a[1]; }
    if (ar < 0) pts = pts.slice().reverse();
    n = pts.length;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    T = earclip(pts);
    for (i = 0; i < T.length; i++) { F.push([T[i][0], T[i][2], T[i][1]]); F.push([n + T[i][0], n + T[i][1], n + T[i][2]]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* a body of revolution about the line through (x, y, z) along X: profile [[x, r]...] */
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var d = sub(B, A), L = Math.sqrt(dot(d, d)), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }

  function onSlope(bin, P0, t, n, y0, y1, w0, w1, h0, h1) { planeBox(bin, P0, [0, 1, 0], t, n, y0, y1, w0, w1, h0, h1); }

  /* a convex outline in a tilted plane [w, u] pairs, thickened between h0 and h1 along N */
  function planePrism(bin, P0, U, W, N, pts, h0, h1) {
    var n = pts.length, V = [], F = [], i, k;
    function pt(q, h) {
      return [P0[0] + U[0] * q[1] + W[0] * q[0] + N[0] * h, P0[1] + U[1] * q[1] + W[1] * q[0] + N[1] * h,
              P0[2] + U[2] * q[1] + W[2] * q[0] + N[2] * h];
    }
    for (i = 0; i < n; i++) V.push(pt(pts[i], h0));
    for (i = 0; i < n; i++) V.push(pt(pts[i], h1));
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }

  /* -------------------------------------------------------------- tyre */
  /* 395/85R20 cross-country tyre: chunky lugs alternating across the crown, a black disc wheel with
     the round CTIS hub, ten nuts; axle on Y, centred on (ox, oy, oz) */
  function tyre(bin, rim, ox, oy, oz) {
    var N = 20, HW = 0.19, i, j, k, r, a, m;
    var R = [[-HW, 0.33, 0, 0], [-HW, 0.50, 0, 0], [-0.175, 0.56, 1, 0], [-0.10, TR, 1, 0], [-0.02, TR, 1, 1],
             [0.02, TR, 1, 0], [0.10, TR, 1, 1], [0.175, 0.56, 1, 1], [HW, 0.50, 0, 0], [HW, 0.33, 0, 0]];
    var V = [], F = [];
    m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.04;
      a = j / N * TAU;
      V.push([ox + r * Math.cos(a), oy + R[i][0], oz + r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([ox, oy + R[0][0], oz], [ox, oy + R[m - 1][0], oz]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    for (k = -1; k <= 1; k += 2) {
      if (oy && k * oy < 0) continue;                                   /* hub and nuts on the outer face only */
      cyl(rim, [ox, oy + k * HW, oz], [ox, oy + k * (HW + 0.012), oz], 0.34, 0.31, 16, true, false);
      cyl(rim, [ox, oy + k * (HW - 0.06), oz], [ox, oy + k * (HW + 0.004), oz], 0.28, 0.26, 16, true, false);
      cyl(rim, [ox, oy + k * HW, oz], [ox, oy + k * (HW + 0.08), oz], 0.12, 0.10, 12);
      for (j = 0; j < 10; j++) {
        a = j / 10 * TAU;
        box(rim, ox + 0.19 * Math.cos(a) - 0.02, ox + 0.19 * Math.cos(a) + 0.02, oy + k * HW, oy + k * (HW + 0.03),
            oz + 0.19 * Math.sin(a) - 0.02, oz + 0.19 * Math.sin(a) + 0.02);
      }
    }
  }

  /* -------------------------------------------------------------- paint */
  /* one flat CARC coat per period: soft drift, rain streaks, scuffs and road dust at the canvas foot
     (UVs 0.34 a metre; v = 0 is the ground on every side) */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, P) {
    if (_tex[P.base] !== undefined) return _tex[P.base] || null;
    var t = false;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.tone.length; k++) {
        q.fillStyle = P.tone[k];
        for (i = 0; i < 8; i++) {
          x = R() * 256; y = R() * 256; w = 24 + R() * 50;
          q.globalAlpha = 0.45; q.beginPath(); q.ellipse(x, y, w, w * (0.35 + R() * 0.5), R() * 3, 0, TAU); q.fill();
        }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 50; i++) {
        q.fillStyle = (i % 3) ? "rgba(40,34,22,0.08)" : "rgba(240,232,210,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 2, 12 + R() * 50);
      }
      /* bolt heads of the armour plates, every 0.35 m along two seams (photograph D) */
      q.fillStyle = "rgba(20,18,12,0.30)";
      for (i = 0; i < 22; i++) { q.fillRect(i * 12 + 4, 52, 3, 3); q.fillRect(140, i * 12 + 6, 3, 3); }
      var gr = q.createLinearGradient(0, 190, 0, 256);
      gr.addColorStop(0, "rgba(130,110,80,0)"); gr.addColorStop(1, "rgba(130,110,80,0.32)");
      q.fillStyle = gr; q.fillRect(0, 190, 256, 66);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = false; }
    _tex[P.base] = t;
    return t || null;
  }

  function materials(THREE, C, V) {
    var T = {}, tp = paintTex(THREE, V);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tp) T.paint.map = tp; else T.paint.color.set(V.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x252623, roughness: 0.8, metalness: 0.25 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.12, metalness: 0.4 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.face = new THREE.MeshStandardMaterial({ color: V.face, roughness: 0.7, metalness: 0.05 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd9861a, roughness: 0.3, metalness: 0.1, emissive: 0x5a3208, emissiveIntensity: 0.8 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             tyre: new Bin(T.tyre, false), face: new Bin(T.face, false), lamp: new Bin(T.lamp, false), team: new Bin(T.team, false) };
  }

  /* ============================================================ chassis and the armoured cab */
  function chassis(B) {
    var s, i, AX = [XF, XR1, XR2];
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X_PIN + 0.20, 3.30, s * 0.44 - 0.06, s * 0.44 + 0.06, 0.78, 1.06);          /* frame rail */
      box(B.dark, XF - 0.50, XF + 0.50, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.70, 0.80);         /* front springs */
      box(B.dark, XR2 - 0.35, XR1 + 0.35, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.62, 0.74);
      bar(B.dark, [XR1 + 0.55, s * 0.60, 1.00], [(XR1 + XR2) / 2, s * 0.60, 0.70], 0.12);
    }
    for (i = 0; i < 3; i++) {
      cylY(B.dark, AX[i], -0.84, 0.84, TR, 0.085, 8);
      cylX(B.dark, AX[i] - 0.18, AX[i] + 0.18, 0, TR, 0.21, 10);
    }
    box(B.dark, 0.20, 0.70, -0.50, 0.50, 0.78, 1.00);                        /* transfer case */
    box(B.dark, 1.50, 3.30, -0.70, 0.70, 0.95, 1.30);                        /* engine under the cab */
    /* the fuel tank (port) and the battery and air tanks (starboard) under the bed front */
    box(B.paint, 0.35, 1.15, 0.78, 1.16, 0.62, 1.10);
    box(B.dark, 0.38, 1.12, 1.16, 1.17, 0.66, 1.06);
    cylX(B.paint, 0.30, 1.10, -0.98, 0.86, 0.20, 12);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XR2 - 0.66, XR1 + 0.66, s * 0.88, s * 1.24, 1.22, 1.26);   /* bogie fenders */
      box(B.dark, XR2 - 0.72, XR2 - 0.69, s * 0.88, s * 1.20, 0.34, 1.22);    /* mud flaps */
      box(B.dark, XF - 0.62, XF + 0.62, s * 0.86, s * 1.24, 1.20, 1.24);      /* front wheel-arch liner */
    }
    /* the tail: cross-member, lamps, the pintle */
    box(B.dark, -3.52, -3.36, -1.10, 1.10, 0.76, 1.12);
    for (s = -1; s <= 1; s += 2) box(B.glass, -3.535, -3.52, s * 0.92 - 0.08, s * 0.92 + 0.08, 0.86, 0.96);
    box(B.dark, X_PIN, -3.50, -0.11, 0.11, 0.84, 1.00);
    cylZ(B.dark, X_PIN + 0.10, 0, 0.82, 1.02, 0.07, 10);
  }

  /* the cab: horizontal sections of the armoured shell (D, A): z, face x, back x, half width, front chamfer */
  var CABS = [[1.20, 3.46, CAB_X0, 1.10, 0.10], [1.95, 3.46, CAB_X0, 1.16, 0.20], [2.06, 3.43, CAB_X0, 1.16, 0.22],
              [2.78, 3.32, CAB_X0, 1.16, 0.22], [2.86, 3.38, CAB_X0, 1.16, 0.20], [CAB_Z1, 3.36, CAB_X0 + 0.05, 1.12, 0.18]];
  function cabRing(st) {
    var z = st[0], xf = st[1], xr = st[2], w = st[3], ch = st[4];
    return [[xf, -(w - ch), z], [xf, w - ch, z], [xf - ch * 0.8, w, z], [xr, w, z], [xr, -w, z], [xf - ch * 0.8, -w, z]];
  }
  function cab(B) {
    var R = [], i, s, k;
    for (i = 0; i < CABS.length; i++) R.push(cabRing(CABS[i]));
    loft(B.paint, R, false);
    /* the two armoured windscreens in their thick frames, on the raked upper face */
    var A = [3.43, 0, 2.06], H = [3.32, 0, 2.78], Wd = unit(sub(H, A)), N = unit([Wd[2], 0, -Wd[0]]), L = 0.73;
    planeBox(B.paint, A, [0, 1, 0], Wd, N, -0.98, 0.98, 0.0, 0.16, 0.0, 0.02);   /* the plate under the glass */
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.dark, A, [0, 1, 0], Wd, N, s > 0 ? 0.06 : -0.86, s > 0 ? 0.86 : -0.06, 0.16, L - 0.02, 0.0, 0.06);
      planeBox(B.glass, A, [0, 1, 0], Wd, N, s > 0 ? 0.15 : -0.77, s > 0 ? 0.77 : -0.15, 0.25, L - 0.11, 0.0, 0.07);
      /* the small quarter window on the chamfered corner (A) */
      var C0 = [3.43 - 0.18, s * 1.16, 2.30], CT = unit([-0.18, s * 0.22, 0]), CN = unit([0.22, s * 0.18, 0]);
      planeBox(B.dark, C0, CT, [0, 0, 1], CN, 0.02, 0.24, -0.20, 0.30, 0.0, 0.02);
      planeBox(B.glass, C0, CT, [0, 0, 1], CN, 0.05, 0.21, -0.16, 0.26, 0.0, 0.025);
    }
    /* the brow over the glass with three amber marker lamps each side (D) */
    box(B.paint, 3.20, 3.44, -1.12, 1.12, 2.86, 2.92);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) box(B.lamp, 3.40, 3.46, s * (0.60 + k * 0.17) - 0.05, s * (0.60 + k * 0.17) + 0.05, 2.92, 2.99);
    /* the grille band, the bumper with its lamps and tow points */
    box(B.dark, 3.46, 3.48, -0.80, 0.80, 1.40, 1.88);
    for (i = 0; i < 7; i++) box(B.paint, 3.46, 3.50, -0.80, 0.80, 1.43 + i * 0.065, 1.46 + i * 0.065);
    box(B.paint, X_BUMP - 0.20, X_BUMP, -1.18, 1.18, 0.66, 1.06);
    box(B.dark, X_BUMP - 0.03, X_BUMP + 0.005, -1.10, 1.10, 1.00, 1.02);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X_BUMP - 0.02, X_BUMP + 0.01, s * 0.86 - 0.14, s * 0.86 + 0.14, 0.76, 0.96);
      cylX(B.glass, X_BUMP, X_BUMP + 0.02, s * 0.80, 0.86, 0.07, 12);
      cylX(B.glass, X_BUMP, X_BUMP + 0.02, s * 0.96, 0.86, 0.05, 10);
      box(B.dark, X_BUMP - 0.10, X_BUMP + 0.04, s * 0.45 - 0.06, s * 0.45 + 0.06, 0.66, 0.78);   /* tow eyes */
      /* the side: the door with its rounded window, the armour plate seams, handle, step ladder (D) */
      var y0 = s * 1.16, y1 = s * 1.172;
      profY(B.dark, [[2.06, 2.08], [2.95, 2.08], [3.02, 2.15], [3.02, 2.70], [2.95, 2.77], [2.06, 2.77], [1.99, 2.70], [1.99, 2.15]], y0, s * 1.175);
      profY(B.glass, [[2.10, 2.14], [2.93, 2.14], [2.97, 2.18], [2.97, 2.67], [2.93, 2.71], [2.10, 2.71], [2.04, 2.67], [2.04, 2.18]], y0, s * 1.18);
      box(B.dark, 1.86, 1.885, y0, y1, 1.24, 2.90);
      box(B.dark, 3.18, 3.205, y0, y1, 1.24, 2.86);
      box(B.dark, 1.86, 3.20, y0, y1, 1.24, 1.26);
      box(B.dark, 1.97, 2.10, y0, s * 1.19, 1.82, 1.86);
      for (k = 0; k < 6; k++) cylY(B.dark, 1.95 + k * 0.24, y0, s * 1.185, 1.40, 0.025, 6);
      for (k = 0; k < 3; k++) box(B.dark, 2.20, 2.70, s * 1.02, s * 1.18, 0.55 + k * 0.28, 0.58 + k * 0.28);
      /* the mirror: a long arm forward off the door pillar to a tall head and a round convex one (D) */
      bar(B.dark, [3.15, s * 1.16, 2.60], [3.45, s * 1.42, 2.62], 0.035);
      bar(B.dark, [3.15, s * 1.16, 2.10], [3.45, s * 1.42, 2.12], 0.035);
      box(B.dark, 3.42, 3.50, s * 1.36, s * 1.56, 2.02, 2.70);
      box(B.glass, 3.50, 3.51, s * 1.38, s * 1.54, 2.05, 2.67);
      cylX(B.dark, 3.42, 3.50, s * 1.46, 1.90, 0.08, 10);
    }
    /* the roof: hatch, team panel; two whip aerials at the back corners (A, E) */
    box(B.paint, 1.95, 2.65, -0.40, 0.40, CAB_Z1, CAB_Z1 + 0.06);
    box(B.dark, 2.00, 2.60, -0.35, 0.35, CAB_Z1 + 0.06, CAB_Z1 + 0.07);
    box(B.team, 1.40, 1.90, -0.80, 0.80, CAB_Z1 - 0.005, CAB_Z1 + 0.02);
    box(B.team, 2.75, 3.20, -0.80, 0.80, CAB_Z1 - 0.005, CAB_Z1 + 0.02);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, 1.42, s * 1.02, CAB_Z1, CAB_Z1 + 0.12, 0.05, 8);
      cylZ(B.dark, 1.42, s * 1.02, CAB_Z1 + 0.12, CAB_Z1 + 2.10, 0.012, 5);
    }
  }

  /* ============================================================ the bed: what is behind the cab, the housing, rear deck, legs */
  function bed(B) {
    var s, k, x;
    box(B.paint, -3.40, CAB_X0 - 0.05, -1.20, 1.20, DECK - 0.10, DECK);
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.40, CAB_X0 - 0.05, s * 1.20 - (s > 0 ? 0.04 : 0), s * 1.20 + (s < 0 ? 0.04 : 0), DECK - 0.18, DECK - 0.04);
    /* behind the cab: the spare wheel standing upright (E) and the equipment cabinet beside it, the exhaust stack */
    var sp = new Bin(B.tyre.mat, false), rm = new Bin(B.paint.mat, true);
    tyre(sp, rm, 0, 0, 0);
    var cx = 0.80, cy = 0.42, cz = DECK + TR + 0.02, i;
    for (i = 0; i < sp.P.length; i += 3) { B.tyre.P.push(sp.P[i + 1] + cx, -sp.P[i] + cy, sp.P[i + 2] + cz); B.tyre.N.push(sp.N[i + 1], -sp.N[i], sp.N[i + 2]); }
    for (i = 0; i < rm.P.length; i += 3) { B.dark.P.push(rm.P[i + 1] + cx, -rm.P[i] + cy, rm.P[i + 2] + cz); B.dark.N.push(rm.N[i + 1], -rm.N[i], rm.N[i + 2]); }
    box(B.dark, 0.55, 1.05, 0.38, 0.46, DECK, DECK + 0.40);
    box(B.paint, 0.45, 1.15, -1.16, -0.20, DECK, 2.70);
    box(B.dark, 1.155, 1.16, -1.08, -0.28, DECK + 0.20, 2.55);
    for (k = 0; k < 8; k++) box(B.paint, 0.45 + 0.08, 1.15 - 0.08, -1.18, -1.16, DECK + 0.35 + k * 0.12, DECK + 0.38 + k * 0.12);
    cylZ(B.dark, 1.15, -1.02, 1.30, 3.00, 0.075, 8);
    /* the housing under the array: a square box, louvred sides, the turntable on its roof (C, E) */
    box(B.paint, HX0, HX1, -1.15, 1.15, DECK, HZ);
    box(B.paint, HX0 - 0.03, HX1 + 0.03, -1.18, 1.18, HZ - 0.06, HZ);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.15, d = function (t) { return s > 0 ? [yo - 0.002, yo + t] : [yo - t, yo + 0.002]; }, e;
      e = d(0.012); box(B.dark, HX0 + 0.20, HX0 + 1.00, e[0], e[1], DECK + 0.25, HZ - 0.18);
      e = d(0.035);
      for (k = 0; k < 6; k++) box(B.paint, HX0 + 0.22, HX0 + 0.98, e[0], e[1], DECK + 0.30 + k * 0.10, DECK + 0.33 + k * 0.10);
      e = d(0.012); box(B.dark, HX1 - 0.85, HX1 - 0.20, e[0], e[1], DECK + 0.20, HZ - 0.20);
      e = d(0.03); box(B.dark, HX1 - 0.32, HX1 - 0.27, e[0], e[1], DECK + 0.50, DECK + 0.62);
      e = d(0.04); box(B.paint, HX0 + 1.10, HX0 + 1.30, e[0], e[1], DECK + 0.25, DECK + 0.65);   /* connector panel */
    }
    for (k = 0; k < 6; k++) box(B.paint, HX0 + 0.10 + k * 0.10, HX0 + 0.14 + k * 0.10, -0.90, 0.90, HZ, HZ + 0.04);   /* roof louvres at the tail (C) */
    /* the rear deck: a low equipment box and the upright frame stowed at the tail (E) */
    box(B.paint, -3.30, HX0 - 0.10, -1.10, 0.10, DECK, DECK + 0.55);
    box(B.dark, -3.31, -3.30, -1.00, 0.00, DECK + 0.08, DECK + 0.47);
    for (s = -1; s <= 1; s += 2) bar(B.paint, [-3.10, 0.55 + s * 0.30, DECK], [-3.10, 0.55 + s * 0.12, DECK + 1.05], 0.08);
    bar(B.paint, [-3.10, 0.30, DECK + 0.70], [-3.10, 0.80, DECK + 0.70], 0.06);
    box(B.team, -3.20, HX0 - 0.20, -0.95, -0.05, DECK + 0.55, DECK + 0.57);
    /* stabilisers, down: two outriggers angled out under the bed front (A), two jacks at the tail (C) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.10, 0.40, s * 0.70, s * 1.24, 0.92, 1.14);
      bar(B.paint, [0.25, s * 1.20, 1.04], [0.25, s * 1.78, 0.18], 0.11);
      bar(B.dark, [0.25, s * 1.70, 0.30], [0.25, s * 1.82, 0.08], 0.07);
      box(B.dark, 0.05, 0.45, s * 1.82 - 0.20, s * 1.82 + 0.20, 0.0, 0.05);
      box(B.dark, -3.48, -3.20, s * 0.86, s * 1.14, 0.95, 1.20);
      cylZ(B.paint, -3.34, s * 1.00, 0.40, 1.10, 0.075, 10);
      cylZ(B.dark, -3.34, s * 1.00, 0.05, 0.42, 0.045, 8);
      cylZ(B.dark, -3.34, s * 1.00, 0.0, 0.05, 0.16, 12);
    }
  }

  /* ============================================================ the array: turntable, posts, the raised panel ("turret") */
  /* local frame: origin the turntable centre on the housing roof, +X the face normal at rest */
  function array(B) {
    var s, k, z, hw = AW / 2, zb = ZB, zt = ZB + AH, x0 = -0.16, x1 = 0.16;
    cylZ(B.dark, 0, 0, 0.0, 0.08, 0.85, 24);
    cylZ(B.paint, 0, 0, 0.08, 0.22, 0.72, 24);
    box(B.paint, -0.55, 0.55, -1.00, 1.00, 0.14, 0.34);
    /* the panel: the plain radome face (A, C) in a framed housing, the module bays on the back (E) */
    box(B.paint, x0, x1 - 0.03, -hw, hw, zb, zt);
    box(B.face, x1 - 0.03, x1, -hw + 0.06, hw - 0.06, zb + 0.06, zt - 0.06);
    for (s = -1; s <= 1; s += 2) box(B.paint, x1 - 0.04, x1 + 0.02, s * hw - (s > 0 ? 0.07 : 0), s * hw + (s < 0 ? 0.07 : 0), zb, zt);
    box(B.paint, x1 - 0.04, x1 + 0.02, -hw, hw, zt - 0.07, zt);
    box(B.paint, x1 - 0.04, x1 + 0.02, -hw, hw, zb, zb + 0.07);
    for (k = 0; k < 6; k++) {
      z = zb + 0.10 + k * (AH - 0.20) / 6;
      box(B.paint, x0 - 0.12, x0, -hw + 0.10, hw - 0.10, z + 0.03, z + (AH - 0.20) / 6 - 0.03);
      box(B.dark, x0 - 0.125, x0 - 0.12, -hw + 0.20, hw - 0.20, z + 0.12, z + 0.16);
    }
    box(B.paint, x0 - 0.05, x1, -hw + 0.20, hw - 0.20, zt, zt + 0.10);            /* top cap */
    /* the two columns at the panel's edges, down to the turntable (E), the port one the heavy lift column (A, C) */
    for (s = -1; s <= 1; s += 2) {
      var cw = s > 0 ? 0.20 : 0.12;
      box(B.paint, -0.12 - cw / 2, -0.12 + cw / 2, s * (hw + 0.02), s * (hw + 0.02 + cw), 0.14, zt + 0.05);
      box(B.dark, -0.12 - cw / 2 - 0.005, -0.12 + cw / 2 + 0.005, s * (hw + 0.02 + cw * 0.3), s * (hw + 0.02 + cw * 0.7), 0.30, zt - 0.10);
      box(B.paint, -0.30, 0.10, s * (hw - 0.10), s * (hw + 0.02 + cw), 0.14, 0.45);
      for (k = 0; k < 2; k++) box(B.dark, -0.20, 0.0, s * (hw - 0.02), s * (hw + 0.03), zb + 0.30 + k * (AH - 0.60), zb + 0.42 + k * (AH - 0.60));   /* clamps */
    }
    /* the diagonal brace at the port column's foot and the whip on its head (A, C) */
    bar(B.paint, [-0.12, hw + 0.12, 1.30], [-0.75, 0.60, 0.30], 0.07);
    box(B.paint, -0.85, -0.65, 0.45, 0.75, 0.22, 0.40);
    cylZ(B.dark, -0.12, hw + 0.12, zt + 0.05, zt + 0.15, 0.04, 8);
    cylZ(B.dark, -0.12, hw + 0.12, zt + 0.15, zt + 1.00, 0.011, 5);
    /* cables from the turntable up the back */
    bar(B.dark, [-0.35, -0.40, 0.34], [x0 - 0.12, -0.40, zb + 0.20], 0.05);
  }

  /* ---------------------------------------------------------------- DETAIL PASS 2: the fittings kit
     Built on this module's own box(bin, x0, x1, y0, y1, z0, z1) and cyl(bin, A, B, r0, r1, seg); every
     part lands in the bin it is handed, so the draw calls do not grow.  s = +1 the left (+Y) side, a
     part on a side face stands off the face y = ys outward.  Sizes are by proportion (NOT CONFIRMED):
     the 20 l jerrycan 0.345 x 0.165 x 0.47 m, tool handles 0.03-0.04 m, tow cable 0.028 m. */
  function dpKit(box, cyl) {
    var TAU = 2 * Math.PI;
    function oy(s, ys, t0, t1) { return s > 0 ? [ys + t0, ys + t1] : [ys - t1, ys - t0]; }
    function bar(b, A, B, r, seg) { cyl(b, A, B, r, r, seg || 6); }
    var D = {
      bar: bar, oy: oy,
      /* a bolt row along X on the side face ys */
      bolts: function (b, x0, x1, n, ys, z, s, r) {
        r = r || 0.013; var i, x, q = oy(s, ys, -0.004, r * 1.1);
        for (i = 0; i < n; i++) { x = n > 1 ? x0 + (x1 - x0) * i / (n - 1) : x0; box(b, x - r, x + r, q[0], q[1], z - r, z + r); }
      },
      /* a bolt row along X on a top face z, or along Y when y1 is given */
      boltsTop: function (b, x0, x1, n, y0, y1, z, r) {
        r = r || 0.013; var i, t;
        for (i = 0; i < n; i++) { t = n > 1 ? i / (n - 1) : 0; var x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t; box(b, x - r, x + r, y - r, y + r, z - 0.004, z + r * 1.1); }
      },
      /* a door hinge on a side face: the barrel up the face and its two leaves */
      hinge: function (b, x, ys, z0, z1, s) {
        var q = oy(s, ys, 0, 0.022);
        cyl(b, [x, (q[0] + q[1]) / 2, z0], [x, (q[0] + q[1]) / 2, z1], 0.02, 0.02, 8);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.15, z0 + (z1 - z0) * 0.35);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.65, z0 + (z1 - z0) * 0.85);
      },
      /* a hatch hinge on a roof: the barrel along X or Y */
      hingeTop: function (b, x0, x1, y0, y1, z) { cyl(b, [x0, y0, z + 0.02], [x1, y1, z + 0.02], 0.022, 0.022, 8); },
      /* a U grab handle standing off the side face ys, along X */
      grab: function (b, s, ys, x0, x1, z) {
        var q = oy(s, ys, 0, 0.055), yf = s > 0 ? q[1] - 0.012 : q[0] + 0.012;
        bar(b, [x0, ys, z], [x0, yf, z], 0.011, 5); bar(b, [x1, ys, z], [x1, yf, z], 0.011, 5);
        bar(b, [x0, yf, z], [x1, yf, z], 0.011, 5);
      },
      /* a U grab handle on a top face z, along X (or Y with y1) */
      grabTop: function (b, x0, x1, y0, y1, z) {
        bar(b, [x0, y0, z], [x0, y0, z + 0.055], 0.011, 5); bar(b, [x1, y1, z], [x1, y1, z + 0.055], 0.011, 5);
        bar(b, [x0, y0, z + 0.055], [x1, y1, z + 0.055], 0.011, 5);
      },
      /* a U grab handle on a face across X (front or rear), dir = +1 the face looks to +X */
      grabX: function (b, xs, dir, y0, y1, z) {
        var xf = xs + dir * 0.05;
        bar(b, [xs, y0, z], [xf, y0, z], 0.011, 5); bar(b, [xs, y1, z], [xf, y1, z], 0.011, 5);
        bar(b, [xf, y0, z], [xf, y1, z], 0.011, 5);
      },
      /* a wire guard over a lamp on a face across X (dir +1 looks forward): three bars and two hoops */
      guard: function (b, x, y, z, r, dir) {
        var i, xf = x + dir * (r * 0.9);
        for (i = -1; i <= 1; i++) bar(b, [x, y + i * r * 0.65, z + r * 1.2], [xf, y + i * r * 0.65, z], 0.008, 4);
        for (i = -1; i <= 1; i++) bar(b, [xf, y + i * r * 0.65, z], [x, y + i * r * 0.65, z - r * 1.2], 0.008, 4);
        bar(b, [x, y - r * 1.25, z + r * 1.2], [x, y + r * 1.25, z + r * 1.2], 0.009, 4);
        bar(b, [x, y - r * 1.25, z - r * 1.2], [x, y + r * 1.25, z - r * 1.2], 0.009, 4);
        bar(b, [xf, y - r * 0.7, z], [xf, y + r * 0.7, z], 0.008, 4);
      },
      /* a 20 l jerrycan standing in its bracket against the side face ys (x its centre, z0 its foot) */
      jerry: function (bP, bD, x, ys, z0, s) {
        var q = oy(s, ys, 0.012, 0.177), yf = s > 0 ? q[1] : q[0];
        box(bP, x - 0.172, x + 0.172, q[0], q[1], z0, z0 + 0.47);
        /* the pressed X on its face and the rim */
        var yr = s > 0 ? [yf, yf + 0.006] : [yf - 0.006, yf];
        bar(bP, [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        bar(bP, [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        /* the three handles and the spout on top */
        var yc = (q[0] + q[1]) / 2, i;
        for (i = -1; i <= 1; i++) box(bD, x + i * 0.07 - 0.012, x + i * 0.07 + 0.012, yc - 0.05, yc + 0.05, z0 + 0.47, z0 + 0.50);
        cyl(bD, [x + 0.13, yc, z0 + 0.47], [x + 0.13, yc, z0 + 0.52], 0.022, 0.022, 6);
        /* the bracket: a foot tray and the strap round it */
        box(bD, x - 0.19, x + 0.19, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z0 - 0.025, z0);
        box(bD, x - 0.19, x + 0.19, s > 0 ? q[1] : q[0] - 0.008, s > 0 ? q[1] + 0.008 : q[0], z0 + 0.30, z0 + 0.33);
      },
      /* a pioneer tool clipped along X on the side face ys (kind: "shovel", "pick", "axe", "bar") */
      tool: function (bH, bM, kind, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.06), y = (q[0] + q[1]) / 2, L = x1 - x0, dir = L > 0 ? 1 : -1;
        bar(bH, [x0, y, z], [x1, y, z], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.008, y + 0.008, z - 0.11, z + 0.11);
          bar(bH, [x0, y, z - 0.06], [x0, y, z + 0.06], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y, z - 0.30], [x1, y, z + 0.30], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.012, y + 0.012, z - 0.04, z + 0.15);
        }
        /* the clamps */
        var c, qa = oy(s, ys, 0, 0.07);
        for (c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, qa[0], qa[1], z - 0.035, z + 0.035); }
      },
      /* the same lying flat on a top face z, the handle along X at y (the blade and the pick head flat) */
      toolTop: function (bH, bM, kind, x0, x1, y, z) {
        var L = x1 - x0, dir = L > 0 ? 1 : -1, zc = z + 0.022;
        bar(bH, [x0, y, zc], [x1, y, zc], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.11, y + 0.11, z + 0.004, z + 0.02);
          bar(bH, [x0, y - 0.06, zc], [x0, y + 0.06, zc], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y - 0.30, zc], [x1, y + 0.30, zc], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.04, y + 0.15, z + 0.01, z + 0.034);
        }
        for (var c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, y - 0.035, y + 0.035, z, z + 0.05); }
      },
      /* a tow cable along X on the side face ys: two strands, the eyes and three clips */
      cable: function (b, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.07), y = (q[0] + q[1]) / 2, i, a, k;
        bar(b, [x0 + 0.08, y, z + 0.025], [x1 - 0.08, y, z + 0.025], 0.016, 6);
        bar(b, [x0 + 0.08, y, z - 0.025], [x1 - 0.08, y, z - 0.025], 0.016, 6);
        for (k = 0; k < 2; k++) {
          var xe = k ? x1 - 0.06 : x0 + 0.06;
          for (i = 0; i < 6; i++) { a = i / 6 * TAU; var b2 = (i + 1) / 6 * TAU;
            bar(b, [xe + Math.cos(a) * 0.06, y, z + Math.sin(a) * 0.06], [xe + Math.cos(b2) * 0.06, y, z + Math.sin(b2) * 0.06], 0.014, 4); }
        }
        for (i = 1; i <= 3; i++) { var xc = x0 + (x1 - x0) * i / 4; box(b, xc - 0.03, xc + 0.03, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z - 0.06, z + 0.06); }
      },
      /* a stowage bin: the box, its lid's lip, the hinge along the top and two latches on the face s */
      stow: function (bP, bD, x0, x1, y0, y1, z0, z1, s) {
        box(bP, x0, x1, y0, y1, z0, z1);
        box(bP, x0 - 0.015, x1 + 0.015, y0 - 0.015, y1 + 0.015, z1 - 0.035, z1 + 0.012);
        var yi = s > 0 ? y0 : y1, yf = s > 0 ? y1 : y0, k;
        cyl(bD, [x0 + 0.05, yi, z1 + 0.012], [x1 - 0.05, yi, z1 + 0.012], 0.018, 0.018, 6);
        for (k = 0; k < 2; k++) { var xl = x0 + (x1 - x0) * (0.25 + k * 0.5);
          box(bD, xl - 0.025, xl + 0.025, s > 0 ? yf : yf - 0.02, s > 0 ? yf + 0.02 : yf, z1 - 0.13, z1 - 0.04); }
      },
      /* a rolled tarpaulin or camouflage net along X, with three straps */
      roll: function (bP, bD, x0, x1, y, z, r) {
        cyl(bP, [x0, y, z], [x1, y, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var x = x0 + (x1 - x0) * (0.15 + i * 0.35); cyl(bD, [x - 0.025, y, z], [x + 0.025, y, z], r + 0.012, r + 0.012, 12); }
      },
      /* the same rolled across Y */
      rollY: function (bP, bD, x, y0, y1, z, r) {
        cyl(bP, [x, y0, z], [x, y1, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var y = y0 + (y1 - y0) * (0.15 + i * 0.35); cyl(bD, [x, y - 0.025, z], [x, y + 0.025, z], r + 0.012, r + 0.012, 12); }
      },
      /* an aerial base: the mount, the spring and the stub of the mast (h, at most 0.5 m: the
         engine's era kit and sling clearances read the model's height, so no full-length whip) */
      whip: function (b, x, y, z, h) {
        h = Math.min(h || 0.4, 0.5);
        cyl(b, [x, y, z], [x, y, z + 0.09], 0.05, 0.042, 8);
        cyl(b, [x, y, z + 0.09], [x, y, z + 0.22], 0.024, 0.024, 6);
        cyl(b, [x, y, z + 0.22], [x, y, z + h], 0.011, 0.008, 4);
      },
      /* a mudflap hanging across X behind a wheel */
      flap: function (b, x, y0, y1, z0, z1) { box(b, x - 0.008, x + 0.008, y0, y1, z0, z1); },
      /* hub nuts round a wheel centre on the outer face y (axis along Y), ring radius R */
      nuts: function (b, x, y, z, R, n, s, r) {
        r = r || 0.018; var i, a;
        for (i = 0; i < n; i++) { a = i / n * TAU; cyl(b, [x + Math.cos(a) * R, y, z + Math.sin(a) * R], [x + Math.cos(a) * R, y + s * 0.025, z + Math.sin(a) * R], r, r, 6); }
      },
      /* grille slats across a top face, n of them along X */
      slats: function (b, x0, x1, y0, y1, z, n) {
        for (var i = 0; i < n; i++) { var x = x0 + (x1 - x0) * (i + 0.5) / n; box(b, x - 0.012, x + 0.012, y0, y1, z, z + 0.025); }
        box(b, x0 - 0.02, x1 + 0.02, y0 - 0.02, y0, z, z + 0.03); box(b, x0 - 0.02, x1 + 0.02, y1, y1 + 0.02, z, z + 0.03);
      },
      /* louvres on a side face ys: n slats along Z */
      louvres: function (b, x0, x1, ys, z0, z1, n, s) {
        var q = oy(s, ys, 0, 0.022);
        for (var i = 0; i < n; i++) { var z = z0 + (z1 - z0) * (i + 0.5) / n; box(b, x0, x1, q[0], q[1], z - 0.012, z + 0.012); }
        box(b, x0 - 0.02, x0, q[0], q[1], z0, z1); box(b, x1, x1 + 0.02, q[0], q[1], z0, z1);
      },
      /* a round hatch on a roof: the lid, the hinge and the handle */
      hatch: function (bP, bD, x, y, z, r, hy) {
        cyl(bP, [x, y, z], [x, y, z + 0.045], r, r * 0.97, 16);
        cyl(bD, [x, y, z + 0.045], [x, y, z + 0.055], r * 0.55, r * 0.5, 12);
        var h = hy || 1;
        cyl(bD, [x - r * 0.5, y + h * (r + 0.02), z + 0.03], [x + r * 0.5, y + h * (r + 0.02), z + 0.03], 0.028, 0.028, 8);
        bar(bD, [x - r * 0.3, y - h * r * 0.3, z + 0.06], [x + r * 0.3, y - h * r * 0.3, z + 0.06], 0.012, 5);
      },
      /* a periscope / vision block on a roof looking along dir (+1 forward): body and glass */
      vblock: function (bD, bG, x, y, z, w, dir) {
        box(bD, x - 0.07, x + 0.07, y - w / 2, y + w / 2, z, z + 0.09);
        var xf = x + dir * 0.07;
        box(bG, Math.min(xf, xf + dir * 0.008), Math.max(xf, xf + dir * 0.008), y - w / 2 + 0.015, y + w / 2 - 0.015, z + 0.02, z + 0.07);
        box(bD, x - 0.09, x + 0.09, y - w / 2 - 0.01, y + w / 2 + 0.01, z + 0.09, z + 0.11);
      },
      /* a towing hook or pintle on a face across X (dir +1 looks forward) */
      /* (L, default 0.19 m, the reach in front of the face; kept inside the model's old length) */
      hook: function (b, xs, y, z, dir, L) {
        var k = (L || 0.19) / 0.19;
        box(b, Math.min(xs, xs + dir * 0.05 * k), Math.max(xs, xs + dir * 0.05 * k), y - 0.09, y + 0.09, z - 0.10, z + 0.10);
        cyl(b, [xs + dir * 0.05 * k, y, z], [xs + dir * 0.16 * k, y, z], 0.035, 0.035, 8);
        cyl(b, [xs + dir * 0.16 * k, y, z - 0.07], [xs + dir * 0.16 * k, y, z + 0.05], 0.03, 0.03, 8);
        cyl(b, [xs + dir * 0.12 * k, y - 0.05, z + 0.06], [xs + dir * 0.12 * k, y + 0.05, z + 0.06], 0.015, 0.015, 5);
      },
      /* a lifting eye on a top face */
      eye: function (b, x, y, z, alongY) {
        if (alongY) box(b, x - 0.012, x + 0.012, y - 0.04, y + 0.04, z - 0.005, z + 0.06);
        else box(b, x - 0.04, x + 0.04, y - 0.012, y + 0.012, z - 0.005, z + 0.06);
      },
      /* an exhaust: the pipe from A to B with its silencer drum part way and a cap */
      exhaust: function (b, A, B, r, at) {
        var t = at === undefined ? 0.5 : at, M = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t];
        cyl(b, A, B, r, r, 8);
        var d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), k = Math.min(0.2, l * 0.25) / l;
        cyl(b, [M[0] - d[0] * k, M[1] - d[1] * k, M[2] - d[2] * k], [M[0] + d[0] * k, M[1] + d[1] * k, M[2] + d[2] * k], r * 2.1, r * 2.1, 10);
        cyl(b, B, [B[0] + d[0] / l * 0.03, B[1] + d[1] / l * 0.03, B[2] + d[2] / l * 0.03], r * 1.3, r * 1.3, 8);
      },
      /* a rack of rails standing on a top face: frame posts and two rails (a basket) */
      basket: function (b, x0, x1, y0, y1, z0, h) {
        var i, n = Math.max(2, Math.round((x1 - x0) / 0.3) + 1), x;
        for (i = 0; i < n; i++) { x = x0 + (x1 - x0) * i / (n - 1);
          bar(b, [x, y0, z0], [x, y0, z0 + h], 0.012, 4); bar(b, [x, y1, z0], [x, y1, z0 + h], 0.012, 4); }
        bar(b, [x0, y0, z0 + h], [x1, y0, z0 + h], 0.013, 4); bar(b, [x0, y1, z0 + h], [x1, y1, z0 + h], 0.013, 4);
        bar(b, [x0, y0, z0 + h * 0.5], [x1, y0, z0 + h * 0.5], 0.01, 4); bar(b, [x0, y1, z0 + h * 0.5], [x1, y1, z0 + h * 0.5], 0.01, 4);
        bar(b, [x0, y0, z0 + h], [x0, y1, z0 + h], 0.013, 4); bar(b, [x1, y0, z0 + h], [x1, y1, z0 + h], 0.013, 4);
      },
      /* kit bags / rucksacks stowed in a basket: lumpy boxes, strapped */
      bags: function (bP, bD, x0, x1, y0, y1, z0, h, seed) {
        var r = (seed || 7) >>> 0, n = Math.max(2, Math.round((x1 - x0) / 0.45)), i;
        function R() { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; return r / 4294967296; }
        for (i = 0; i < n; i++) {
          var a = x0 + (x1 - x0) * i / n + 0.02, c = x0 + (x1 - x0) * (i + 1) / n - 0.02, hh = h * (0.6 + R() * 0.4), w = (y1 - y0) * (0.75 + R() * 0.2), yc = (y0 + y1) / 2 + (R() - 0.5) * 0.06;
          box(bP, a, c, yc - w / 2, yc + w / 2, z0, z0 + hh);
          box(bD, (a + c) / 2 - 0.02, (a + c) / 2 + 0.02, yc - w / 2 - 0.006, yc + w / 2 + 0.006, z0, z0 + hh + 0.006);
        }
      }
    };
    return D;
  }
  /* DETAIL PASS 2: the weathered paint.  The module's own paint canvas (or a flat base colour) drawn
     onto a 512 px tile, then plate seams with a lit edge, bolt rows along some of them, access-panel
     outlines with corner screws, rain streaks, grime and dust, chipped paint and oil spots.  Plain
     paint: no markings, numbers or camouflage.  Cached per source. */
  var __DPW = {};
  function dpWeather(THREE, src, base, seed) {
    var key = (src && src.uuid ? src.uuid : "flat") + "|" + base + "|" + seed;
    if (__DPW[key] !== undefined) return __DPW[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, i, k, x, y, w, h, n, xs = [];
      var rs = (seed * 7 + 13) >>> 0, R = function () { rs = (Math.imul(rs, 1664525) + 1013904223) >>> 0; return rs / 4294967296; };
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = base || "#555544"; q.fillRect(0, 0, S, S);
      if (src && src.image) { try { q.drawImage(src.image, 0, 0, S, S); } catch (e) { /* flat base */ } }
      /* plate seams: four vertical butts, horizontal seams staggered between them, a bolt row on some */
      for (i = 0; i < 4; i++) xs.push(Math.floor(i * 128 + 20 + R() * 80) + 0.5);
      for (i = 0; i < 4; i++) {
        q.globalAlpha = 1; q.strokeStyle = "rgba(14,15,10,0.42)"; q.lineWidth = 2;
        q.beginPath(); q.moveTo(xs[i], 0); q.lineTo(xs[i], S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.12)"; q.lineWidth = 1;
        q.beginPath(); q.moveTo(xs[i] + 2, 0); q.lineTo(xs[i] + 2, S); q.stroke();
        y = Math.floor(60 + R() * 120) + 0.5;
        for (k = 0; k < 2; k++) {
          var xa = xs[i], xb = i < 3 ? xs[i + 1] : xs[0] + S;
          q.strokeStyle = "rgba(14,15,10,0.38)"; q.lineWidth = 2;
          q.beginPath(); q.moveTo(xa, y); q.lineTo(xb, y); q.stroke();
          q.beginPath(); q.moveTo(xa - S, y); q.lineTo(xb - S, y); q.stroke();
          q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1;
          q.beginPath(); q.moveTo(xa, y + 2); q.lineTo(xb, y + 2); q.stroke();
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      /* rain streaks, grime and dust, chips and scratches, oil spots */
      for (i = 0; i < 260; i++) { q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)"; q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54); }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, 2 * Math.PI); q.fill();
      }
      for (i = 0; i < 180; i++) { q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)"; n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n); }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      for (i = 0; i < 8; i++) { q.fillStyle = "rgba(12,10,6,0.16)"; q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, 2 * Math.PI); q.fill(); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (src && src.repeat && t.repeat) t.repeat.copy(src.repeat);
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    __DPW[key] = t;
    return t;
  }
  /* ============================================================ DETAIL PASS 2
     The fittings the first pass left out (classes A-E show on the LSAC cab and the bed; places and sizes by
     proportion, NOT CONFIRMED): the armour plates' bolt rows, grab handles beside the doors, the roof
     hatch's hinges and handle, the wipers, the brush guards over the bumper lamps, the mudflaps behind the
     front wheels; on the bed tie-down rings along the deck edge, jerrycans on the rear deck, the cabinet
     door's hinges and handle, the housing's lifting eyes, grab handles, the ladder up its rear face and the
     latches of its doors; on the array the module bays' handles.  The paint takes dpWeather. */
  var DPK = dpKit(box, cyl);
  function detail(B) {
    var DP = DPK, P = B.paint, D = B.dark, s, k;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * 1.16;
      /* the cab: bolt rows along the plate seams, a grab handle beside the door, the wiper */
      DP.bolts(D, 1.90, 3.15, 10, yc, 2.88, s, 0.012);
      DP.bolts(D, 1.90, 3.15, 10, yc, 1.30, s, 0.012);
      DP.bar(D, [1.80, yc + s * 0.05, 1.55], [1.80, yc + s * 0.05, 2.60], 0.016, 5);
      DP.bar(D, [1.80, yc, 1.55], [1.80, yc + s * 0.05, 1.55], 0.012, 4); DP.bar(D, [1.80, yc, 2.60], [1.80, yc + s * 0.05, 2.60], 0.012, 4);
      DP.bar(D, [3.44, s * 0.20, 2.12], [3.36, s * 0.55, 2.62], 0.009, 4);
      /* brush guards over the bumper lamps, the mudflaps behind the front wheels */
      DP.guard(D, X_BUMP - 0.06, s * 0.86, 0.86, 0.09, 1);
      DP.flap(D, XF - 0.66, s > 0 ? 0.86 : -1.24, s > 0 ? 1.24 : -0.86, 0.34, 1.20);
      /* tie-down rings along the deck edge */
      for (k = 0; k < 5; k++) DP.eye(D, -3.20 + k * 0.55, s * 1.16, DECK, true);
      /* the housing: lifting eyes, grab handles on its sides, its doors' latches */
      DP.eye(D, HX0 + 0.10, s * 1.08, HZ); DP.eye(D, HX1 - 0.10, s * 1.08, HZ);
      DP.grab(D, s, s * 1.15, HX1 - 0.18, HX1 - 0.02, DECK + 0.95);
      for (k = 0; k < 2; k++) box(D, HX0 + 0.25 + k * 0.65, HX0 + 0.31 + k * 0.65, s > 0 ? 1.162 : -1.19, s > 0 ? 1.19 : -1.162, HZ - 0.30, HZ - 0.24);
    }
    /* the roof hatch's hinges and handle */
    DP.hingeTop(D, 1.98, 1.98, -0.30, 0.30, CAB_Z1 + 0.05);
    DP.grabTop(D, 2.55, 2.55, -0.12, 0.12, CAB_Z1 + 0.07);
    /* the cabinet door's hinges and handle */
    DP.hinge(D, 1.16, -1.165, DECK + 0.30, 2.50, -1);
    box(D, 0.55, 0.60, -1.20, -1.165, DECK + 0.70, DECK + 0.90);
    /* jerrycans on the rear deck */
    DP.jerry(P, D, -2.60, 0.86, DECK, 1); DP.jerry(P, D, -2.22, 0.86, DECK, 1);
    /* the ladder up the housing's rear face */
    for (s = -1; s <= 1; s += 2) DP.bar(D, [HX0 - 0.06, 0.10 + s * 0.20, DECK + 0.55], [HX0 - 0.06, 0.10 + s * 0.20, HZ], 0.016, 6);
    for (k = 0; k < 4; k++) DP.bar(D, [HX0 - 0.06, -0.10, DECK + 0.70 + k * 0.17], [HX0 - 0.06, 0.30, DECK + 0.70 + k * 0.17], 0.013, 5);
  }
  function arrayDetail(B) {
    var D = B.dark, k, s, hw = AW / 2, x0 = -0.16, z;
    for (k = 0; k < 6; k++) {
      z = ZB + 0.10 + k * (AH - 0.20) / 6 + (AH - 0.20) / 12;
      for (s = -1; s <= 1; s += 2) DPK.grabX(D, x0 - 0.12, -1, s * (hw - 0.30), s * (hw - 0.15), z);
    }
  }
  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, vk) {
    var V = VARIANTS[vk] || VARIANTS.e00, T = materials(THREE, C, V), g = new THREE.Group(), HB = bins(T), AB = bins(T);
    var i, s, wg, WB, AX = [XF, XR1, XR2], dw = dpWeather(THREE, T.paint.map, V.base, V.seed);
    if (dw) T.paint.map = dw;
    chassis(HB); cab(HB); bed(HB); detail(HB);
    var h = new THREE.Group(); h.name = "hull";
    flush(THREE, h, HB);
    g.add(h);
    /* three "roadwheel" groups, an axle each with both its tyres (render3d spins each about its local Y) */
    for (i = 0; i < 3; i++) {
      WB = { tyre: new Bin(T.tyre, false), rim: new Bin(T.paint, true) };
      for (s = -1; s <= 1; s += 2) tyre(WB.tyre, WB.rim, 0, s * YT, 0);
      wg = new THREE.Group(); wg.name = "roadwheel";
      wg.position.set(AX[i], 0, TR);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    array(AB);
    arrayDetail(AB);
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV_X, 0, HZ);
    flush(THREE, tur, AB);
    g.add(tur);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, len: LEN, variants: VARIANTS };
})();

UNIT_MODELS["nato_e00_radarv"] = { len: HeroTpq53.len, build: function (THREE, M, C) { return HeroTpq53.build(THREE, M, C, "e00"); } };
UNIT_MODELS["radarv_n"] = { len: HeroTpq53.len, build: function (THREE, M, C) { return HeroTpq53.build(THREE, M, C, "e20"); } };
