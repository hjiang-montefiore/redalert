/* ===== us_tpq37.js - HERO model: AN/TPQ-37 Firefinder weapon-locating radar, shelter truck and antenna trailer =====
   Full-quality redo (2026-10-24).  One key, kept: nato_e80_radarv (js/eras.js, "AN/TPQ-37 Firefinder weapon-locating
   radar (with the TPQ-36)", e80 to e90, service 1980, turret:true).  Build name kept: HeroTpq37.build (read by nothing
   else).  The row is NOT deploy:true and a radar has no weapon, so js/entities.js never sets e.deployed for it: a
   "deploypose"/"travelpose" pair would leave it packed up for ever (render3d shows the travel pose unless e.deployed).
   So, as the old file did and as ru_zoopark.js does, ONE pose is drawn: the working pose, array raised, jacks down.
   The travel pose (array lowered flat on the trailer roof) is not drawn.

   FACTS (en.wikipedia "AN/TPQ-37 Firefinder radar", fetched 2026-10-24; the Army pamphlet [P]):
     - Hughes, IOC 1980, full deployment 1984; S-band, 90-degree sector, 120 kW peak; 50 km.  CONFIRMED from the old header.
     - "A typical AN/TPQ-37 system consists of the Antenna-Transceiver Group, Command Shelter and 60 kW Generator."
     - [P] "Firefinder Radars Q36 and Q37.jpg" (US Army, 2001): "Transporter: ... 5-ton cargo truck (AN/TPQ-37)";
       "An operations shelter is set up on a cargo truck.  A generator and a radar antenna ... are towed behind the
       truck."  CONFIRMED.  (Wikipedia's "towed by a 2 1/3-ton truck" is the TPQ-36 figure and is not followed.)

   REFERENCES (Wikimedia Commons at width 960, fetched 2026-10-24):
     A "AN TPQ-37 Firefinder radar.JPEG"  SPC Glenn W. Suggs, US Army, PD, 19 May 1996, Glamoc, Bosnia (Joint Endeavor):
                                          the ATG side-on from the PORT side, array up, jacks down.  IN PERIOD: the
                                          station table below is measured off it, and its paint is followed.
     B "Q-37 (V) Firefinder Radar.jpg"    US Army, PD, 2014: the ATG from the starboard rear quarter, desert tan: the
                                          array's BACK (frames, boxes, the Y bracket and the strut starboard of centre).
                                          Later than the row: shape only, its paint and its later fittings not drawn.
     C "TPQ-37 (51463).jpg"               (CC BY-SA, undated): a woodland 5-ton with the shelter, the ATG hitched behind
                                          it with the array up, its FACE seen with the corner boxes: the composition.
   Scale: A at 121 px a metre off its 1.04 m trailer tyres (11.00-20 class: the tyre size is NOT published in what I
   found, an assumption carried over from the old file); B agrees to 10 per cent on the array height.

   RECOGNITION LIST (each one drawn):
     1  the tall portrait array standing upright at the FRONT of the trailer, face forward, a deep box (0.73 m) (A, C)
                                                                                                      -> array()
     2  the corner boxes fore and aft of the slab: a big one at the top, a small one a third down, a wedge at the
        base, at both edges (A side-on, C face-on)                                                    -> array()
     3  the single long tilt strut from a foot on the platform to a Y bracket high on the back, starboard of
        centre, thick ram above, thin rod below (A, B)                                                -> array()
     4  the turntable platform under the array, overhanging the trailer front (A)                     -> array()
     5  the tall box body, roof at 3.16 m, rolled roof rim, a seam at mid-height with a row of latches (A)
     6  the louvre panels: four in the upper row, two in the lower, at the positions A shows             -> LVX
     7  the raised cowl at the tail, its front face sloping up from the roof (A)                       -> trailer()
     8  the tandem axle a third back from the front, single tyres, the four leveling jacks down on pads (A)
     9  the A-frame drawbar to the truck's pintle (A, C)
     10 the 5-ton 6x6 with the operations shelter on its bed, taller than the cab (C, [P])            -> truck()
     11 NATO three-colour CARC, green with brown and black (A, 1996)                                  -> PAINT

   STATIONS (A, x aft of the box front TX0 = -2.00, z over the ground):
       box front 0.00, rear 5.37; axles 1.79 and 3.51; jacks 0.29 and 5.00; cowl 4.75 .. 5.45, top 3.49
       box body z 1.24 .. 3.16 (side sill 1.10 .. 1.24); seam 2.48; louvres upper z 2.58 .. 3.02, lower 1.96 .. 2.40
       array: face 0.37 AHEAD of the box front, slab 0.73 deep, bottom 3.42, top 8.72 (5.30 m tall); turntable
       platform -0.40 .. 1.72 at z 3.23 .. 3.38; strut foot 1.49 aft at 3.69, top 0.54 aft at 7.04.
       Width of the array: 2.45 m, from B (height : width 2.2) and C (1.9, oblique): an ESTIMATE.  CORRECTED from the
       old header: roof 2.60 -> 3.16 m, array 3.5 -> 5.3 m tall (the old file drew the low end of a range; A, the one
       square-on photograph, gives these), box 5.7 -> 5.37 m, axles moved forward to where A has them, the cowl's
       sloping face.  Treat all as +-10 per cent (the tyre assumption).
   The truck: kept from the old file as a 5-ton 6x6 in outline (the M809/M939 family, not a named model: [P] says
   "5-ton cargo truck" only), redrawn with the long flat-topped hood, wide flat fenders with the lamps in their noses,
   the brush guard, the two-pane windscreen; its axle spacing is the old file's and is NOT confirmed.

   NOT drawn: the 60 kW generator and its trailer (a separate tow, [P]), camouflage netting, cables, the tarpaulin load
   on A's drawbar, the later Block II fittings and B's propped-open awning flaps and side wheels (2014).  Not
   confirmed: the trailer's width (2.4 m, drawn), what is on the far (starboard) side of the trailer (drawn as the
   port side), the array's width, the shelter's model.

   Paint: NATO three-colour CARC (green 383, brown 383, black), the scheme A shows in 1996 and the Army's from the
   mid-1980s; the earlier MERDC coat of 1980-85 is not drawn (one key, one coat; A is the dated photograph).
   A is backlit and samples #464440 / #3c3836 (green), #1d1a17 (black): drawn #4a5236 / #56462f / #24241f, the
   CARC hues at about 0.8 of their level.  No markings (A's chalked serial is not drawn).

   Nodes: "turret" (ring centre on the trailer roof, the array's face along +X at rest: render3d trains it by
   -(tang - ang); a radar has no weapon, so it stands at any yaw; every part of it is above the trailer roof and
   within 1.87 m of the axis, which is 2.76 m behind the truck's bed end, so at any yaw it stops 0.9 m short of the
   truck and 1.4 m short of the shelter), five "roadwheel" groups (an axle each, both tyres),
   "hull".  Team colour: C.team panels on the cab roof, the shelter roof and the trailer roof.
   Model space: +X nose, +Y port, +Z up, metres, tyres and jack pads on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTpq37 = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  /* the truck: bumper face +8.10, front axle, the bogie, tyre radius and track; cab and shelter */
  var X_BUMP = 8.10, XF = 6.85, XR1 = 2.65, XR2 = 1.33, TR = 0.52, YT = 1.04;
  var CAB_X0 = 4.70, CAB_X1 = 6.25, CAB_Z1 = 2.88, SH_X0 = 0.60, SH_X1 = 4.35, SH_Z1 = 3.30;
  /* the antenna-transceiver trailer (A): box front and tail, roof, axles, track */
  var TX0 = -2.00, TX1 = -7.37, ROOF = 3.16, TAX = [-3.79, -5.51], YTT = 1.00;
  var PIV_X = TX0 - 0.66;                      /* the ring centre: the middle of A's turntable platform */
  var AW = 2.45, AH = 5.30;                    /* the array: width (estimate), height (A) */
  /* louvres (A): distance aft of the box front, centre height, width */
  var LVX = [[0.68, 2.80, 0.54], [1.94, 2.80, 0.58], [2.77, 2.80, 0.58], [4.34, 2.80, 0.58], [1.24, 2.18, 0.50], [3.64, 2.18, 0.50]];
  var SEAMS = [1.48, 2.48, 3.30, 4.34, 5.12];   /* panel joints on the slab's edge, over the roof (A) */
  var STRUT = { foot: [-0.83, 0.53], top: [0.12, 3.88] };   /* turret-local x, z (A) */
  var LEN = 15.56;

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
  /* a military cross-country tyre on a disc wheel, axle on Y, centred on (ox, oy, oz): block lugs alternating
     across the crown, rim flange, disc, hub and eight nuts (the wheel faces of photograph A) */
  function tyre(bin, rim, ox, oy, oz, RT, HW) {
    var N = 18, i, j, k, r, a, m;
    var R = [[-HW, RT * 0.62, 0, 0], [-HW, RT * 0.86, 0, 0], [-HW * 0.92, RT * 0.95, 1, 0], [-HW * 0.5, RT, 1, 0],
             [-HW * 0.08, RT, 1, 1], [HW * 0.08, RT, 1, 0], [HW * 0.5, RT, 1, 1], [HW * 0.92, RT * 0.95, 1, 1],
             [HW, RT * 0.86, 0, 0], [HW, RT * 0.62, 0, 0]];
    var V = [], F = [];
    m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.035;
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
      cyl(rim, [ox, oy + k * HW, oz], [ox, oy + k * (HW + 0.012), oz], RT * 0.62, RT * 0.57, 16, true, false);
      cyl(rim, [ox, oy + k * (HW - 0.05), oz], [ox, oy + k * (HW + 0.004), oz], RT * 0.50, RT * 0.47, 16, true, false);
      cyl(rim, [ox, oy + k * HW, oz], [ox, oy + k * (HW + 0.07), oz], 0.12, 0.10, 12);
      for (j = 0; j < 8; j++) {
        a = j / 8 * TAU;
        box(rim, ox + 0.18 * Math.cos(a) - 0.02, ox + 0.18 * Math.cos(a) + 0.02, oy + k * HW, oy + k * (HW + 0.03),
            oz + 0.18 * Math.sin(a) - 0.02, oz + 0.18 * Math.sin(a) + 0.02);
      }
    }
  }

  /* -------------------------------------------------------------- paint */
  /* NATO three-colour CARC as photograph A (1996) shows it on the ATG: green ground, big brown and black
     patches.  One tile is 2.94 m of surface (UVs 0.34 a metre); every blot is drawn at nine offsets so the
     tile wraps without a seam; road dust at the canvas foot (v = 0 is the ground on every side). */
  var _tex = null;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE) {
    if (_tex !== null) return _tex || null;
    var t = false;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), R = rng(371996), i, k, a, x, y, rr, rd, dx, dy, shp, sx;
      q.fillStyle = PAINT.green; q.fillRect(0, 0, 256, 256);
      var cols = [PAINT.brown, PAINT.black, PAINT.brown, PAINT.black, PAINT.brown];
      for (i = 0; i < 10; i++) {
        q.fillStyle = cols[i % cols.length];
        x = R() * 256; y = R() * 256; rr = 26 + R() * 30; sx = 1.3 + R() * 0.9;
        shp = []; for (k = 0; k < 9; k++) shp.push(0.55 + R() * 0.7);
        for (dx = -256; dx <= 256; dx += 256) for (dy = -256; dy <= 256; dy += 256) {
          q.beginPath();
          for (a = 0; a < 9; a++) {
            rd = rr * shp[a];
            if (a === 0) q.moveTo(x + dx + Math.cos(a / 9 * TAU) * rd * sx, y + dy + Math.sin(a / 9 * TAU) * rd);
            else q.lineTo(x + dx + Math.cos(a / 9 * TAU) * rd * sx, y + dy + Math.sin(a / 9 * TAU) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.10)" : "rgba(210,200,170,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 2, 10 + R() * 40);
      }
      q.strokeStyle = "rgba(12,12,8,0.30)"; q.lineWidth = 1;
      for (i = 0; i < 3; i++) { q.beginPath(); q.moveTo(0, i * 85 + 30.5); q.lineTo(256, i * 85 + 30.5); q.stroke(); }
      var gr = q.createLinearGradient(0, 196, 0, 256);
      gr.addColorStop(0, "rgba(120,104,78,0)"); gr.addColorStop(1, "rgba(120,104,78,0.34)");
      q.fillStyle = gr; q.fillRect(0, 196, 256, 60);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = false; }
    _tex = t;
    return t || null;
  }
  var PAINT = { green: "#4a5236", brown: "#56462f", black: "#24241f" };

  function materials(THREE, C) {
    var T = {}, tp = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tp) T.paint.map = tp; else T.paint.color.set(PAINT.green);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x232421, roughness: 0.82, metalness: 0.2 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             tyre: new Bin(T.tyre, false), team: new Bin(T.team, false) };
  }

  /* ============================================================ the 5-ton truck */
  function truck(B) {
    var s, i, x, AXT = [XF, XR1, XR2];
    /* chassis: frame rails, springs, axles, differentials, the bogie's walking beams */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.05, 7.95, s * 0.40 - 0.06, s * 0.40 + 0.06, 0.82, 1.08);
      box(B.dark, XF - 0.55, XF + 0.55, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.70, 0.80);
      box(B.dark, XR2 - 0.30, XR1 + 0.30, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.62, 0.76);
      bar(B.dark, [XR1 + 0.6, s * 0.62, 1.00], [(XR1 + XR2) / 2, s * 0.62, 0.72], 0.12);
    }
    for (i = 0; i < 3; i++) {
      cylY(B.dark, AXT[i], -0.92, 0.92, TR, 0.08, 8);
      cylX(B.dark, AXT[i] - 0.18, AXT[i] + 0.18, 0, TR, 0.20, 10);
    }
    box(B.dark, 3.95, 4.45, -0.50, 0.50, 0.80, 1.02);                         /* transfer case */
    box(B.dark, 5.90, 7.70, -0.62, 0.62, 0.95, 1.40);                         /* engine and sump under the hood */
    /* fuel tank (port) and battery box (starboard) between the cab and the bogie */
    cylX(B.paint, 3.55, 4.55, 0.86, 1.02, 0.27, 14);
    box(B.paint, 4.80, 5.45, -1.10, -0.70, 0.78, 1.18);
    box(B.dark, 4.85, 5.40, -1.105, -1.10, 0.85, 1.12);
    /* the bogie's flat fenders and mud flaps */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XR2 - 0.62, XR1 + 0.62, s * 0.88, s * 1.25, 1.20, 1.25);
      box(B.dark, XR2 - 0.70, XR2 - 0.67, s * 0.88, s * 1.20, 0.38, 1.20);
    }

    /* the bumper and the brush guard over the grille */
    box(B.paint, X_BUMP - 0.26, X_BUMP, -1.18, 1.18, 0.56, 0.90);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X_BUMP - 0.18, X_BUMP - 0.04, s * 0.92 - 0.07, s * 0.92 + 0.07, 0.60, 0.86);    /* tow shackles */
      bar(B.dark, [X_BUMP - 0.12, s * 0.70, 0.90], [X_BUMP - 0.12, s * 0.70, 2.00], 0.05);         /* guard uprights */
    }
    bar(B.dark, [X_BUMP - 0.12, -0.72, 2.00], [X_BUMP - 0.12, 0.72, 2.00], 0.05);
    bar(B.dark, [X_BUMP - 0.12, -0.72, 1.45], [X_BUMP - 0.12, 0.72, 1.45], 0.04);
    for (i = -2; i <= 2; i++) bar(B.dark, [X_BUMP - 0.12, i * 0.25, 0.90], [X_BUMP - 0.12, i * 0.25, 2.00], 0.03);
    /* the hood: a long flat-topped box narrowing a little to the grille, louvred sides */
    loft(B.paint, [
      [[6.22, -0.86, 1.30], [6.22, 0.86, 1.30], [6.22, 0.84, 2.06], [6.22, 0.74, 2.14], [6.22, -0.74, 2.14], [6.22, -0.84, 2.06]],
      [[7.80, -0.80, 1.30], [7.80, 0.80, 1.30], [7.80, 0.78, 1.98], [7.80, 0.70, 2.04], [7.80, -0.70, 2.04], [7.80, -0.78, 1.98]]
    ], false);
    box(B.dark, 7.80, 7.84, -0.72, 0.72, 1.36, 1.96);                         /* grille */
    for (i = 0; i < 9; i++) box(B.paint, 7.80, 7.86, -0.72, 0.72, 1.40 + i * 0.065, 1.42 + i * 0.065);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) box(B.dark, 6.75 + i * 0.13, 6.82 + i * 0.13, s * 0.85 - 0.01, s * 0.85 + 0.01, 1.62, 1.92);   /* hood side louvres */
      /* the wide flat front fender with the headlamp in its nose */
      profY(B.paint, [[5.98, 1.18], [5.98, 1.42], [7.86, 1.42], [7.96, 1.30], [7.96, 1.10], [7.52, 1.10], [7.38, 1.30],
                      [6.32, 1.30], [6.18, 1.18]], s > 0 ? 0.84 : -1.26, s > 0 ? 1.26 : -0.84);
      cylX(B.dark, 7.90, 7.98, s * 1.02, 1.30, 0.11, 14);
      cylX(B.glass, 7.97, 7.99, s * 1.02, 1.30, 0.085, 14);
      box(B.glass, 7.94, 7.98, s * 1.18 - 0.04, s * 1.18 + 0.04, 1.36, 1.40);   /* blackout marker */
    }

    /* the cab: a flat-sided steel cab with a hard top, the windscreen in two flat panes */
    profY(B.paint, [[CAB_X0, 1.28], [CAB_X1, 1.28], [CAB_X1, 2.14], [6.13, 2.14], [6.02, 2.80], [5.96, CAB_Z1],
                    [CAB_X0 + 0.04, CAB_Z1], [CAB_X0, CAB_Z1 - 0.04]], -1.15, 1.15);
    var A = [6.13, 0, 2.14], H = [6.02, 0, 2.80], Wd = unit(sub(H, A)), Nn = unit([Wd[2], 0, -Wd[0]]), L = 0.67;
    planeBox(B.dark, A, [0, 1, 0], Wd, Nn, -1.10, 1.10, 0.0, L, -0.02, 0.012);
    planeBox(B.glass, A, [0, 1, 0], Wd, Nn, 0.04, 1.02, 0.05, L - 0.05, 0.0, 0.02);
    planeBox(B.glass, A, [0, 1, 0], Wd, Nn, -1.02, -0.04, 0.05, L - 0.05, 0.0, 0.02);
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [6.08, s * 0.40, 2.82], [6.18, s * 0.30, 2.16], 0.02);     /* wiper */
      profY(B.glass, [[5.08, 2.20], [5.92, 2.20], [5.92, 2.74], [5.08, 2.74]], s * 1.15, s * 1.162);   /* door window */
      box(B.dark, 4.96, 4.98, s * 1.15, s * 1.165, 1.32, 2.82);              /* door seams */
      box(B.dark, 6.00, 6.02, s * 1.15, s * 1.165, 1.32, 2.14);
      box(B.dark, 4.96, 6.02, s * 1.15, s * 1.165, 1.32, 1.34);
      box(B.dark, 5.10, 5.26, s * 1.15, s * 1.175, 1.96, 2.00);              /* handle */
      box(B.dark, 5.20, 5.80, s * 0.90, s * 1.12, 0.92, 0.96);               /* step */
      /* the mirror on its two arms off the door pillar */
      bar(B.dark, [6.04, s * 1.15, 2.66], [6.08, s * 1.62, 2.66], 0.03);
      bar(B.dark, [6.04, s * 1.15, 2.16], [6.08, s * 1.62, 2.20], 0.03);
      box(B.dark, 6.04, 6.10, s * 1.58, s * 1.78, 2.10, 2.70);
      box(B.glass, 6.10, 6.115, s * 1.60, s * 1.76, 2.13, 2.67);
    }
    box(B.paint, 5.90, 6.00, -1.15, 1.15, CAB_Z1 - 0.06, CAB_Z1 + 0.03);     /* the brow */
    box(B.team, 5.00, 5.80, -0.70, 0.70, CAB_Z1 - 0.01, CAB_Z1 + 0.012);       /* team panel on the cab roof */
    /* the air intake stack and the exhaust behind the cab, starboard */
    cylZ(B.paint, 4.62, -0.95, 1.40, 2.95, 0.10, 10);
    cylZ(B.dark, 4.62, -0.95, 2.95, 3.05, 0.14, 10);
    cylZ(B.dark, 4.62, 0.98, 1.40, 3.10, 0.06, 8);

    /* the bed: floor, side rails, headboard; the operations shelter on it */
    box(B.paint, 0.10, 4.55, -1.20, 1.20, 1.28, 1.40);
    box(B.paint, 4.45, 4.55, -1.20, 1.20, 1.40, 1.95);
    for (s = -1; s <= 1; s += 2) box(B.paint, 0.10, 4.45, s * 1.20 - (s > 0 ? 0.05 : 0), s * 1.20 + (s < 0 ? 0.05 : 0), 1.40, 1.62);
    box(B.paint, SH_X0, SH_X1, -1.14, 1.14, 1.40, SH_Z1);
    for (s = -1; s <= 1; s += 2) {
      /* corner posts and the roof rim of the shelter, louvre panels on its sides */
      box(B.dark, SH_X0 - 0.02, SH_X0 + 0.06, s * 1.10, s * 1.16, 1.40, SH_Z1 + 0.02);
      box(B.dark, SH_X1 - 0.06, SH_X1 + 0.02, s * 1.10, s * 1.16, 1.40, SH_Z1 + 0.02);
      box(B.paint, SH_X0, SH_X1, s * 1.10, s * 1.16, SH_Z1 - 0.06, SH_Z1 + 0.02);
      for (i = 0; i < 2; i++) {
        x = 1.40 + i * 1.50;
        box(B.dark, x, x + 0.80, s * 1.14, s * 1.155, 2.30, 2.80);
        for (var k = 0; k < 6; k++) box(B.paint, x + 0.02, x + 0.78, s * 1.14, s * 1.17, 2.34 + k * 0.08, 2.37 + k * 0.08);
      }
      box(B.dark, 3.80, 4.10, s * 1.14, s * 1.16, 1.70, 2.00);               /* cable entry box */
    }
    /* the rear door, its hinges and handle; the ladder hooked on the tailboard */
    box(B.dark, SH_X0 - 0.015, SH_X0, -0.55, 0.40, 1.50, 3.10);
    box(B.paint, SH_X0 - 0.03, SH_X0 - 0.01, -0.50, 0.35, 1.55, 3.05);
    box(B.dark, SH_X0 - 0.06, SH_X0 - 0.03, 0.20, 0.30, 2.20, 2.26);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [0.08, s * 0.20 - 0.35, 1.40], [-0.05, s * 0.20 - 0.35, 0.50], 0.04);
    for (i = 0; i < 4; i++) bar(B.dark, [0.08 - i * 0.033, -0.55, 1.30 - i * 0.22], [0.08 - i * 0.033, -0.15, 1.30 - i * 0.22], 0.03);
    /* the shelter roof: an air conditioner and two vents, the team panel */
    box(B.paint, 3.55, 4.25, -0.75, 0.75, SH_Z1, SH_Z1 + 0.32);
    box(B.dark, 3.54, 3.56, -0.65, 0.65, SH_Z1 + 0.05, SH_Z1 + 0.27);
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, 1.00, s * 0.60, SH_Z1, SH_Z1 + 0.12, 0.10, 10);
    box(B.team, 1.40, 3.20, -0.80, 0.80, SH_Z1 - 0.01, SH_Z1 + 0.012);
    /* the tail: rear cross-member, lamps, pintle hook */
    box(B.dark, -0.02, 0.12, -1.10, 1.10, 0.82, 1.10);
    for (s = -1; s <= 1; s += 2) box(B.glass, -0.035, -0.02, s * 0.95 - 0.08, s * 0.95 + 0.08, 0.92, 1.02);
    box(B.dark, -0.24, -0.02, -0.10, 0.10, 0.84, 1.00);
  }

  /* ============================================================ the antenna-transceiver trailer */
  function trailer(B) {
    var s, i, k, x, z;
    /* drawbar: lunette, A-frame, cross brace, the folding support leg */
    cylZ(B.dark, -0.42, 0, 0.90, 0.97, 0.13, 12);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [-0.48, 0, 0.94], [TX0 - 0.10, s * 0.62, 1.16], 0.09);
    bar(B.dark, [-1.40, -0.36, 1.05], [-1.40, 0.36, 1.05], 0.06);
    bar(B.dark, [-0.90, 0.00, 0.98], [-0.90, 0.00, 0.40], 0.06);
    box(B.dark, -0.98, -0.82, -0.08, 0.08, 0.36, 0.42);
    /* frame and running gear */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, TX1 - 0.02, TX0 - 0.05, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.06, 1.24);
      box(B.dark, TAX[1] - 0.70, TAX[0] + 0.70, s * 0.70 - 0.05, s * 0.70 + 0.05, 0.62, 0.74);   /* springs */
      box(B.dark, TX1, TX0, s * 1.16, s * 1.22, 1.10, 1.24);                                       /* side sill */
      box(B.paint, TAX[1] - 0.62, TAX[0] + 0.62, s * 0.88, s * 1.21, 1.24, 1.28);                  /* mudguard */
      box(B.dark, TAX[1] - 0.66, TAX[1] - 0.63, s * 0.86, s * 1.18, 0.40, 1.24);                   /* mud flap */
    }
    for (i = 0; i < 2; i++) cylY(B.dark, TAX[i], -0.86, 0.86, TR, 0.075, 8);
    for (k = 0; k < 4; k++) box(B.dark, TX0 - 0.10 - k * 1.75, TX0 - 0.02 - k * 1.75, -1.16, 1.16, 1.08, 1.22);   /* cross members */
    /* four leveling jacks, down on their pads (A) */
    var JX = [TX0 - 0.29, TX1 + 0.37];
    for (k = 0; k < 2; k++) for (s = -1; s <= 1; s += 2) {
      box(B.dark, JX[k] - 0.10, JX[k] + 0.10, s * 1.02, s * 1.24, 1.02, 1.24);
      cylZ(B.paint, JX[k], s * 1.13, 0.42, 1.12, 0.075, 10);
      cylZ(B.dark, JX[k], s * 1.13, 0.06, 0.45, 0.045, 8);
      cylZ(B.dark, JX[k], s * 1.13, 0.0, 0.06, 0.17, 12);
      box(B.dark, JX[k] - 0.03, JX[k] + 0.03, s * 1.13 - 0.10, s * 1.13 + 0.10, 0.85, 0.90);   /* crank */
    }

    /* the body: one box, a rolled rim round the roof edge, a seam at mid-height with its latch row */
    box(B.paint, TX1, TX0, -1.20, 1.20, 1.24, ROOF);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, TX1, TX0, s * 1.20 - (s > 0 ? 0 : 0.035), s * 1.20 + (s > 0 ? 0.035 : 0), ROOF - 0.07, ROOF + 0.01);
      box(B.dark, TX1, TX0, s * 1.20 - (s > 0 ? 0 : 0.015), s * 1.20 + (s > 0 ? 0.015 : 0), 2.47, 2.49);
      box(B.paint, TX1, TX0, s * 1.20 - (s > 0 ? 0 : 0.03), s * 1.20 + (s > 0 ? 0.03 : 0), 1.32, 1.38);
      var yo = s * 1.20, d = function (t) { return s > 0 ? [yo - 0.002, yo + t] : [yo - t, yo + 0.002]; }, e;
      /* the louvre panels as photograph A has them: four in the upper row, two in the lower */
      for (k = 0; k < LVX.length; k++) {
        x = TX0 - LVX[k][0]; z = LVX[k][1];
        e = d(0.012); box(B.dark, x - LVX[k][2] / 2, x + LVX[k][2] / 2, e[0], e[1], z - 0.22, z + 0.22);
        e = d(0.035);
        box(B.paint, x - LVX[k][2] / 2 - 0.03, x + LVX[k][2] / 2 + 0.03, e[0], e[1], z + 0.22, z + 0.26);
        for (i = 0; i < 7; i++) box(B.paint, x - LVX[k][2] / 2 + 0.02, x + LVX[k][2] / 2 - 0.02, e[0], e[1], z - 0.20 + i * 0.06, z - 0.18 + i * 0.06);
      }
      /* the plain access panel and the small electrical box near the tail (A) */
      e = d(0.012); box(B.dark, TX0 - 3.64, TX0 - 3.10, e[0], e[1], 2.58, 3.02);
      e = d(0.10); box(B.paint, TX0 - 5.25, TX0 - 4.88, e[0], e[1], 2.60, 2.92);
      /* latches along the seam and the lower edge (A) */
      for (k = 0; k < 9; k++) {
        x = TX0 - 0.35 - k * 0.58;
        e = d(0.03); box(B.dark, x - 0.025, x + 0.025, e[0], e[1], 2.28, 2.56);
        e = d(0.025); box(B.dark, x - 0.025, x + 0.025, e[0], e[1], 1.42, 1.58);
      }
      /* tail and front lamps */
      box(B.glass, TX1 - 0.015, TX1, s * 1.00 - 0.07, s * 1.00 + 0.07, 1.30, 1.40);
      box(B.dark, TX1 - 0.02, TX1, s * 0.70 - 0.08, s * 0.70 + 0.08, 1.15, 1.30);
    }
    /* the front end: corner posts, handles and the cable reel bracket (A) */
    for (s = -1; s <= 1; s += 2) box(B.dark, TX0, TX0 + 0.05, s * 1.10, s * 1.20, 1.24, ROOF);
    box(B.dark, TX0, TX0 + 0.03, -0.80, 0.80, 2.30, 2.34);
    cylY(B.dark, TX0 + 0.14, -0.45, 0.45, 1.70, 0.24, 14);
    box(B.dark, TX0, TX0 + 0.12, -0.50, 0.50, 1.40, 1.48);
    /* the raised cowl at the tail, its front face sloping up from the roof (A) */
    profY(B.paint, [[TX1 - 0.08, ROOF - 0.10], [TX0 - 4.75, ROOF - 0.10], [TX0 - 4.75, ROOF], [TX0 - 4.98, 3.49], [TX1 - 0.08, 3.49]], -1.02, 1.02);
    box(B.dark, TX0 - 5.10, TX0 - 5.00, -0.30, 0.30, 3.49, 3.56);
    bar(B.dark, [TX1 - 0.02, -0.40, 3.49], [TX1 - 0.02, -0.40, 3.68], 0.03);
    box(B.dark, TX1 - 0.09, TX1 - 0.07, -0.85, 0.85, 1.40, 3.40);             /* rear doors' seam */
    /* the roof: the team panels */
    box(B.team, TX0 - 4.55, TX0 - 2.30, 0.45, 1.05, ROOF - 0.01, ROOF + 0.012);
    box(B.team, TX0 - 4.55, TX0 - 2.30, -1.05, -0.45, ROOF - 0.01, ROOF + 0.012);
  }

  /* ============================================================ the array on its turntable ("turret") */
  /* local frame: origin on the ring centre on the roof, +X the face normal at rest, z up from the roof */
  function array(B) {
    var s, k, z, x0 = 0.30, x1 = 1.03, zb = 0.26, zt = zb + AH, hw = AW / 2;
    cylZ(B.dark, 0, 0, 0.0, 0.07, 0.80, 24);                                   /* slew ring */
    prism(B.paint, [[1.08, -0.92], [1.08, 0.92], [-0.70, 0.92], [-1.06, 0.60], [-1.06, -0.60], [-0.70, -0.92]], 0.07, 0.22);
    box(B.dark, -1.06, 1.08, -0.93, 0.93, 0.07, 0.10);
    /* hinge blocks under the slab, at its lower back edge */
    for (s = -1; s <= 1; s += 2) box(B.dark, 0.25, 0.60, s * 0.75 - 0.12, s * 0.75 + 0.12, 0.20, zb + 0.06);
    /* the slab: a deep box, framed edges, the face a shade proud */
    box(B.paint, x0, x1 - 0.04, -hw, hw, zb, zt);
    box(B.paint, x1 - 0.04, x1, -hw + 0.07, hw - 0.07, zb + 0.07, zt - 0.07);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, x1 - 0.06, x1 + 0.01, s * hw - (s > 0 ? 0.08 : 0), s * hw + (s < 0 ? 0.08 : 0), zb, zt);
      box(B.dark, x0 + 0.02, x1 - 0.06, s * hw - (s > 0 ? 0.004 : 0.012), s * hw + (s > 0 ? 0.012 : 0.004), zb + 0.03, zt - 0.03);
      box(B.paint, x0 + 0.05, x1 - 0.08, s * hw - (s > 0 ? 0.004 : 0.02), s * hw + (s > 0 ? 0.02 : 0.004), zb + 0.05, zt - 0.05);
      /* the panel joints on the slab's edge, at the heights photograph A shows */
      for (k = 0; k < SEAMS.length; k++) box(B.dark, x0 + 0.02, x1 - 0.06, s * hw - (s > 0 ? 0.004 : 0.026), s * hw + (s > 0 ? 0.026 : 0.004), SEAMS[k] - 0.015, SEAMS[k] + 0.015);
    }
    box(B.paint, x1 - 0.06, x1 + 0.01, -hw, hw, zt - 0.08, zt);
    box(B.paint, x1 - 0.06, x1 + 0.01, -hw, hw, zb, zb + 0.08);
    box(B.dark, x0 - 0.01, x1, -0.30, 0.30, zt, zt + 0.06);                    /* lifting eye plate on top */
    /* the face: a dark row seam every third of the height (the space-fed lens panels) */
    for (k = 1; k < 3; k++) box(B.dark, x1, x1 + 0.006, -hw + 0.10, hw - 0.10, zb + AH * k / 3 - 0.012, zb + AH * k / 3 + 0.012);
    box(B.dark, x1, x1 + 0.006, -0.012, 0.012, zb + 0.10, zt - 0.10);
    /* the boxes fore and aft of the slab at the corners: top, a third down, base (A, B, C) */
    for (s = -1; s <= 1; s += 2) {
      var yc = s * (hw - 0.26);
      hexa(B.paint, [[x1, yc - 0.22, zt - 0.98], [x1 + 0.37, yc - 0.22, zt - 0.90], [x1 + 0.37, yc + 0.22, zt - 0.90], [x1, yc + 0.22, zt - 0.98],
                     [x1, yc - 0.22, zt - 0.20], [x1 + 0.37, yc - 0.22, zt - 0.28], [x1 + 0.37, yc + 0.22, zt - 0.28], [x1, yc + 0.22, zt - 0.20]]);
      box(B.dark, x1 + 0.37, x1 + 0.38, yc - 0.17, yc + 0.17, zt - 0.84, zt - 0.34);
      box(B.paint, x1, x1 + 0.18, yc - 0.15, yc + 0.15, zt - 1.47, zt - 1.06);
      hexa(B.paint, [[x1, yc - 0.22, zb + 0.30], [x1 + 0.20, yc - 0.22, zb + 0.30], [x1 + 0.20, yc + 0.22, zb + 0.30], [x1, yc + 0.22, zb + 0.30],
                     [x1, yc - 0.22, zb + 0.82], [x1 + 0.42, yc - 0.22, zb + 0.82], [x1 + 0.42, yc + 0.22, zb + 0.82], [x1, yc + 0.22, zb + 0.82]]);
      box(B.dark, x1 + 0.20, x1 + 0.42, yc - 0.17, yc + 0.17, zb + 0.80, zb + 0.83);
      box(B.paint, x0 - 0.27, x0, yc - 0.20, yc + 0.20, zt - 0.90, zt - 0.46);
      box(B.paint, x0 - 0.25, x0, yc - 0.15, yc + 0.15, zt - 1.59, zt - 1.20);
      box(B.paint, x0 - 0.27, x0, yc - 0.20, yc + 0.20, zb + 0.28, zb + 0.77);
    }
    /* the back: two vertical frames, horizontal stiffeners, an equipment box low down (B) */
    for (s = -1; s <= 1; s += 2) box(B.paint, x0 - 0.10, x0, s * 0.45 - 0.06, s * 0.45 + 0.06, zb + 0.10, zt - 0.10);
    for (k = 0; k < 6; k++) { z = zb + 0.55 + k * 0.80; box(B.paint, x0 - 0.06, x0, -hw + 0.12, hw - 0.12, z, z + 0.06); }
    box(B.paint, x0 - 0.22, x0, -0.35, 0.35, zb + 1.10, zb + 1.85);
    box(B.dark, x0 - 0.23, x0 - 0.22, -0.28, 0.28, zb + 1.18, zb + 1.78);
    /* the Y bracket and the tilt strut, starboard of centre: foot on the platform, ram up to the bracket (A, B) */
    var Y = -0.55, top = [STRUT.top[0], Y, STRUT.top[1]], foot = [STRUT.foot[0], Y, STRUT.foot[1]];
    bar(B.paint, [x0 - 0.02, Y - 0.40, top[2] + 0.45], top, 0.08);
    bar(B.paint, [x0 - 0.02, Y + 0.40, top[2] + 0.45], top, 0.08);
    bar(B.paint, [x0 - 0.02, Y, top[2] - 0.30], top, 0.08);
    var mid = [foot[0] + (top[0] - foot[0]) * 0.55, Y, foot[2] + (top[2] - foot[2]) * 0.55];
    cyl(B.dark, foot, mid, 0.045, 0.045, 10);
    cyl(B.paint, mid, top, 0.085, 0.085, 12);
    cylY(B.dark, top[0], Y - 0.10, Y + 0.10, top[2], 0.07, 10);
    box(B.paint, foot[0] - 0.22, foot[0] + 0.22, Y - 0.16, Y + 0.16, 0.22, foot[2]);
    cylY(B.dark, foot[0], Y - 0.18, Y + 0.18, foot[2], 0.06, 10);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), AB = bins(T), i, k, s, wg, WB;
    truck(HB);
    trailer(HB);
    var h = new THREE.Group(); h.name = "hull";
    flush(THREE, h, HB);
    g.add(h);
    /* the axles: five Groups named "roadwheel", each with both tyres of its axle */
    var AXS = [[XF, YT], [XR1, YT], [XR2, YT], [TAX[0], YTT], [TAX[1], YTT]];
    for (i = 0; i < AXS.length; i++) {
      WB = { tyre: new Bin(T.tyre, false), rim: new Bin(T.paint, true) };
      for (s = -1; s <= 1; s += 2) tyre(WB.tyre, WB.rim, 0, s * AXS[i][1], 0, TR, 0.145);
      wg = new THREE.Group(); wg.name = "roadwheel";
      wg.position.set(AXS[i][0], 0, TR);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    array(AB);
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV_X, 0, ROOF);
    flush(THREE, tur, AB);
    g.add(tur);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, len: LEN };
})();

UNIT_MODELS["nato_e80_radarv"] = { len: HeroTpq37.len, build: HeroTpq37.build };
