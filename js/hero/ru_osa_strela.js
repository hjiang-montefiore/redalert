/* ============ ru_osa_strela.js - HERO models: 9K33M3 Osa-AKM (9A33BM3) and 9K35 Strela-10 (9A35) ============
   Two rows, two models, one geometry kit:
     pact_e60_osa       "9K33 Osa (SA-8 Gecko), 9A33B launcher; Osa-AK 1975, Osa-AKM 1980"  e60..e90, weapon
                        "9M33 / 9M33M3", 6 rounds, 10 km  -> drawn as the OSA-AKM (9A33BM3, 1980): six rounds in
                        containers and the 9M33M3 point to it.  The Osa-AK (9A33BM2, 1975) carries the same six
                        containers and is not told apart from it on the photographs used.  The 1971 9A33B with four
                        rounds on open rails (photographs O1, O2) is NOT drawn: the row's six rounds rule it out.
     pact_e60_strela10  "9K35 Strela-10 (SA-13 Gopher) on the MT-LB; Strela-10M3 1989"  e60 onward, 9M37 / 9M333,
                        8 rounds -> drawn as the 9A35 launch vehicle, which the base system (1976) and the M, M2, M3
                        share: the photographs of 1988 (S2), 2007 (S5) and 2014 (S3, S4) show the same hull, four
                        containers and the radar between them.  Nothing outwardly peculiar to the M3 (its new sight,
                        the 9M333 round, 2.23 m against 2.19 m) shows at game size, so none is drawn.

   REFERENCES (Wikimedia Commons, width 960, fetched 2026-11-03):
     O1 "Soviet OSA SAM.JPEG" (US DoD 1982, side, nose left): the 9A33B with open rails - hull proportions,
        the three axles, the boat bow.
     O2 "Soviet SA-8 Gecko on parade.JPEG" (Red Square 1977, rear-right): transom, flank ribs, the turret base.
     O3 "9K33M3 Osa-AKM in VDNKh.jpg" (2015, square-on LEFT side, nose left): the station table below; the raked
        windscreens, the flank strakes and lockers, the turret base, the tall tracking antenna edge-on, a guidance
        dish, the six-container blocks at about 27 deg, the search radar raised.
     O4 "9A33BM3 - OSA-AKM (1).jpg" (MAKS 2011, front-right): the blocks at about 20 deg, the search radar raised,
        the cab, mirrors.
     O5 "Ukrainian 9k33 Osa, Independence Day parade in Kiev.JPG" (front-right, on the march): the round guidance
        dishes, the tall tracking antenna with its rounded top, the container caps on the upper ends, a cab hatch,
        the tyre tread and hubs; the search radar folded on the march (not drawn: the row draws the working pose).
     O6 "Lesany ... 9K 33 OSA AKM.JPG" (museum, head-on): the bow plan, the upper bow plate with the folded trim
        vane, the two big windscreens and the centre pillar, the lamps at the bow corners, the antenna cluster.
     O7 "UA anti-air training 2021 Osa-AKM (1).jpg": an Osa-AKM firing - the blocks at about 29 deg.
     S1 "289b-SA-13-GOPHER.jpg" (recognition plate, US public domain): side drawing, 6 road wheels, the raised
        launcher; length 21.7 ft, height 7.5 ft.
     S2 "SA-13 short-range surface to air missile system.JPEG" (US DoD 1988, rear-right): the two big rear doors,
        the handrail round the rear roof, the raised launcher, the whip.
     S3 "9A35 combat vehicle 9K35 Strela-10 - TankBiathlon14part2-33.jpg" (2014, square-on LEFT side, nose right):
        the station table below: six road wheels, front sprocket, rear idler, no return rollers, the cable coil on
        the side, the handrail, the air louvres behind the cab.
     S4 "...TankBiathlon14part2-36.jpg" (2014, front-left): the two container pairs, the platform.
     S5 "9A35 Strela-10.JPG" (Artillery Museum St Petersburg, 2007, with 9M37 rounds): the glacis with the trim
        vane, the windscreen covers, the launcher raised with the round radar between the pairs.
     S6 "9K35 Strela-10. Royal Tank Museum, Amman, Jordan.jpg": the launcher steeply raised, the radar dish.
     ru.wikipedia "Osa (zenitnyi raketnyi kompleks)": 9K33 1971 with four 9M33; Osa-AK six 9M33M2 and Osa-AKM six
        9M33M3, both in transport-launch containers; chassis BAZ-5937, three axles, waterjet; the search antenna
        turns at 33 1/3 rpm (a "radar" node is not read by render3d, so it is drawn still).
     ru.wikipedia "Strela-10": the 9A35 on the MT-LB, 4 rounds on the launcher and 4 inside, a PKT; the 9S86
        millimetre-wave radio rangefinder is part of the base 9K35; M2 1981, M3 1989, 9M333 2.23 m long.
   Published figures used: Osa 9.14 x 2.75 m, 4.2 m high on the march (armour_specs row); MT-LB 6.454 x 2.85 m; the
   Strela-10's 2.3 m travelling height (armour_specs row; S1 gives 7.5 ft).

   OSA-AKM RECOGNITION LIST (each one drawn):
     1  long boat hull: a low bow edge, the upper bow plate rising to two big raked windscreens, a flat roof and
        deck to a chamfered transom; the boat bottom narrows below the skirts (O1, O3, O6)       -> hull lofts
     2  three axles of big cross-country tyres in square arches, the tyres flush with the hull side (O3, O5)
     3  flank strakes, the square lockers, the cab side window (O3)
     4  folded trim vane on the bow plate, headlamps at the bow corners, mirrors (O4, O6)
     5  the turret: a low wide octagonal base and the equipment cabin on it (O3, O4)
     6  the tall flat tracking antenna with the rounded top on the turret front (O3, O5, O6)
     7  the two round guidance dishes on arms either side, a lamp unit under each (O3, O5, O6)
     8  the search radar raised over the cabin rear: the curved mesh reflector on its post (O3, O4)
     9  two blocks of three ribbed containers on the turret flanks, raised, caps at the upper ends (O3, O4, O5, O7)
   STRELA-10 RECOGNITION LIST:
     1  the MT-LB: low flat-roofed box hull, sloped glacis to a near-vertical nose plate, vertical tail (S3, S5)
     2  six road wheels a side, front sprocket, rear idler, no return rollers (S1, S3)
     3  the trim vane folded on the glacis, the two armoured windscreen covers, hatches (S5)
     4  the air louvres behind the cab, the cable coil on the side, the handrail on the rear roof (S2, S3)
     5  the launcher on a small turret on the rear roof: two pairs of square ribbed containers, a gap between the
        pairs, the round range-only radar between them at the trunnions (S5, S6)
     6  the gunner's small cupola with the PKT at the front right (S3; the PKT ru.wikipedia)

   STATIONS.  Osa (from O3, the perspective taken out on the near and far tyre sizes, scaled on 9.14 m; O1 checks
   the axle pitch): axles x +2.43, -0.22, -2.87 (pitches 2.65 m: O3 gives 2.70/2.47, O1 2.82/2.82), tyre r 0.62
   (O3 0.625); nose edge x +4.57 z 1.44; upper bow plate to the windscreen foot x +3.55 z 1.63; windscreen top
   x +2.62 z 2.08 = the roof and deck; transom x -4.57 z 1.94; boat bottom z 0.48 (clearance 0.44), the bow
   undersurface rising from x +3.40 to the nose edge; arch line 1.30 m, skirt foot 0.98 m.  Turret ring x +0.30 (O3: the base runs x -1.35 .. +1.85, the tracking antenna stands over the front axle);
   base 0.48 m tall, cabin to 1.56 m over the deck; tracking antenna 1.0 x 1.36 m at x +1.8, top 4.04 m (published 4.2 m on
   the march); search reflector 1.24 x 1.04 m on a short post, top 5.45 m (O3).  Containers 3.5 m (9M33 3.16 m), 0.27 m square; the blocks run from over the rear axle (x -2.94) to x +0.3 (O3).
   Strela (from S3, scaled on the 6.454 m hull, 112 px/m): road wheels x -2.09 .. +1.91 every 0.80, r 0.31;
   sprocket x +2.86, idler x -2.96; roof 1.55 m (MT-LB 1.865 m over the cupola); sponson floor 0.80 m; belly 0.40;
   glacis from the roof edge x +2.47 to the nose x +3.2 z 1.14; turret ring x -1.10.  Containers 2.3 m long
   (9M37 2.19 m), 0.29 m square (S1: 1 ft).

   POSES (both rows turret:true; the launcher is "podelev" inside "turret", render3d poseLauncher pitches it by
   userData.el while the unit holds a target in reach, userData.cells at the container mouths):
     Osa: the blocks drawn at 20 deg (O4, the lowest the photographs show, on the march in O5 about the same) and
       raised a further 9 deg to the 29 deg of the firing photograph O7.  Neither angle is published.
     Strela: drawn STOWED, the pack level with its top at the published 2.3 m; raised 40 deg (S1, S5, S6 read by
       eye, not published).  The column lift of the raised launcher (S3, S4) is not drawn.
   PAINT: Soviet green, one coat, no numbers, no stars: the Osa #555e3a (O5's sunlit green #898953 taken to
   about 0.65), the Strela #4f5a3a (the Soviet green of the other Soviet heroes, S3's 2014 grey-green being later).
   NOT drawn (not confirmed or not shown): the 9S16 passive direction-finder aerials of the Strela, the M2's
   flotation floats, radio whips, canvas covers, the Osa's search radar folded, markings and numerals.
   CORRECTIONS to the old file: the Osa axles (2.45/0.15/-2.15 -> 2.43/-0.22/-2.87, O1 O3), the turret base
   lengthened to 3.2 m with the tracking antenna over the front axle (O3), the tracking antenna a tall flat dish (it was a round disc), the search radar
   a raised mesh reflector (it was a grid frame), the blocks now raise through "podelev"; the Strela turret moved
   back to the rear roof (S3: ring x -1.10, was -0.60), the wheel pitch 0.75 -> 0.80 m, the return run lies on
   the wheels.

   Nodes: "turret" (ring centre, rests facing +X), "podelev" inside it, "roadwheel" groups (axle on local Y: three
   for the Osa, both tyres each; six for the Strela, both discs each).  Materials: paint (canvas), dark, glass,
   team (plain C.team, modest up-facing strips), mesh (the Osa reflector).
   Model space: +X nose, +Y left, +Z up, metres, wheels and tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOsaStrela = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var OSA_PAINT = { base: "#555e3a", tone: ["#5e6842", "#4b5433"], seed: 1980 };
  var STR_PAINT = { base: "#4f5a3a", tone: ["#58633f", "#465033"], seed: 1976 };

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

  /* a toothed wheel standing on the Y axis: nt teeth between radii rr and rt */
  function gear(bin, cx, y0, y1, cz, rr, rt, nt) {
    var n = nt * 4, V = [], F = [], i, t, step = TAU / nt, a, r, kk, ph = [0.05, 0.30, 0.55, 0.80], rd = [rr, rt, rt, rr];
    for (i = 0; i < n; i++) {
      t = (i / 4) | 0; kk = i % 4; a = (t + ph[kk]) * step; r = rd[kk];
      V.push([cx + r * Math.cos(a), y0, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < n; i++) V.push([V[i][0], y1, V[i][2]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (i = 0; i < n; i++) {
      t = (i + 1) % n;
      F.push([i, n + i, t], [t, n + i, n + t], [2 * n, i, t], [2 * n + 1, n + t, n + i]);
    }
    solid(bin, V, F);
  }

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
    /* end caps (fans on a centre vertex) */
    V.push([prof[0][0], y, z]); V.push([prof[m - 1][0], y, z]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j]); F.push([m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F, true);
  }
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

  /* a convex outline in a tilted plane, [w, u] pairs, thickened between h0 and h1 along N */
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
  /* a curved sheet facing +X (the mesh reflector): centre (x, y, zc), half width hw, half height hh, depth dd */
  function sheet(bin, x, y, zc, hw, hh, dd, nu, nv) {
    var i, j, P = [], row, u, v;
    for (j = 0; j <= nv; j++) {
      row = []; v = -1 + 2 * j / nv;
      for (i = 0; i <= nu; i++) { u = -1 + 2 * i / nu; row.push([x - dd * u * u, y + u * hw, zc + v * hh]); }
      P.push(row);
    }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      bin.tri(P[j][i], P[j][i + 1], P[j + 1][i + 1]);
      bin.tri(P[j][i], P[j + 1][i + 1], P[j + 1][i]);
    }
  }
  /* one hull ring from a half-section [[hw, z], ...] (bottom centre-line first, going up the side) */
  function ringOf(x, half) {
    var r = [], i;
    for (i = 0; i < half.length; i++) r.push([x, -half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) if (half[i][0] > 0) r.push([x, half[i][0], half[i][1]]);
    return r;
  }

  /* -------------------------------------------------------------- paint */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      draw(cv.getContext("2d"));
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* one Soviet green coat: soft tonal patches where it was touched up, welded plate seams about every 0.75 m,
     a bolt row, rain streaks and chips; one tile is 2.94 m of surface (UVs 0.34 per metre) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "osastr" + P.base + P.seed, function (q) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.tone.length; k++) {
        q.fillStyle = P.tone[k];
        for (i = 0; i < 8; i++) {
          x = R() * 256; y = R() * 256; w = 26 + R() * 60;
          q.globalAlpha = 0.42; q.beginPath(); q.ellipse(x, y, w, w * (0.35 + R() * 0.5), R() * 3, 0, TAU); q.fill();
        }
      }
      q.globalAlpha = 1;
      q.strokeStyle = "rgba(18,20,14,0.32)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 12.5, 0); q.lineTo(i * 64 + 12.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 40.5); q.lineTo(256, i * 64 + 40.5); q.stroke();
      }
      q.fillStyle = "rgba(12,13,9,0.35)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 2, 36, 2, 2); q.fillRect(76, i * 8 + 3, 2, 2); }
      for (i = 0; i < 100; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.08)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
      for (i = 0; i < 50; i++) { q.fillStyle = "rgba(10,10,8,0.2)"; q.fillRect(R() * 256, R() * 256, 2, 2); }
    });
  }
  /* the Osa's search reflector is a wire mesh: a grid in the paint over a dark ground */
  function meshTex(THREE, base) {
    return canvasTex(THREE, "osamesh" + base, function (q) {
      var i;
      q.fillStyle = "#2a2d27"; q.fillRect(0, 0, 256, 256);
      q.strokeStyle = base; q.lineWidth = 5;
      for (i = 0; i <= 8; i++) {
        q.beginPath(); q.moveTo(i * 32, 0); q.lineTo(i * 32, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 32); q.lineTo(256, i * 32); q.stroke();
      }
    });
  }
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P), mt = meshTex(THREE, P.base);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.mesh = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.25, side: THREE.DoubleSide });
    if (mt) T.mesh.map = mt; else T.mesh.color.set(0x3c4036);
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             team: new Bin(T.team, false), mesh: new Bin(T.mesh, true) };
  }
  /* mesh UVs: the grid texture wants about 2 repeats a metre, not 0.34 */
  function meshBin(T) { var b = new Bin(T.mesh, true); b.tri = function (a, c, d) { Bin.prototype.tri.call(this, a, c, d); var n = this.U.length; for (var i = n - 6; i < n; i++) this.U[i] *= 6; }; return b; }

  /* frame helpers: a frame tilted up by angle a about Y (U along, N up, W left) */
  function frame(a) { return { U: [Math.cos(a), 0, Math.sin(a)], N: [-Math.sin(a), 0, Math.cos(a)], W: [0, 1, 0] }; }
  function at(P, F, u, w, h) {
    return [P[0] + F.U[0] * u + F.W[0] * w + F.N[0] * h, P[1] + F.U[1] * u + F.W[1] * w + F.N[1] * h,
            P[2] + F.U[2] * u + F.W[2] * w + F.N[2] * h];
  }
  function fbox(bin, P, F, u0, u1, w0, w1, h0, h1) { planeBox(bin, P, F.U, F.W, F.N, u0, u1, w0, w1, h0, h1); }
  function onSlope(bin, P0, t, n, y0, y1, w0, w1, h0, h1) { planeBox(bin, P0, [0, 1, 0], t, n, y0, y1, w0, w1, h0, h1); }
  /* a lug on a wheel (axle on local Y): wedge between radii r0 and r1 */
  function lug(bin, a, d, ya, yb, r0, r1) {
    function p(r, an, y) { return [r * Math.cos(an), y, r * Math.sin(an)]; }
    hexa(bin, [p(r0, a - d, ya), p(r0, a - d, yb), p(r0, a + d, yb), p(r0, a + d, ya),
               p(r1, a - d, ya), p(r1, a - d, yb), p(r1, a + d, yb), p(r1, a + d, ya)]);
  }

  /* ================================================================= 9K33M3 OSA-AKM (9A33BM3) */
  /* STATIONS (x from the hull middle, +X nose; z up from the ground), from photograph O3 (VDNKh, side, scaled on
     the published 9.14 m with the perspective taken out on the wheel sizes) checked against O1 (side, 1982) and
     O6 (head-on) - see the header table */
  var OA = { x: [2.43, -0.22, -2.87], R: 0.62, yi: 0.86, yo: 1.30 };
  var ODECK = 2.08, OHW = 1.375;
  var OTX = 0.30;                                   /* the turret ring on the deck */

  function osaTyre(bin, ya, yb, out) {
    var k, R = OA.R, s = out, yo = out > 0 ? yb : ya, yin = out > 0 ? ya : yb, a, ym = (ya + yb) / 2;
    cyl(bin, [0, ya, 0], [0, yb, 0], R - 0.03, R - 0.03, 24);
    /* the cross-country tread: chevron lugs in two staggered rows (O3, O5) */
    for (k = 0; k < 16; k++) {
      a = k / 16 * TAU;
      lug(bin, a + 0.06, 0.07, Math.min(ya, yb) + 0.02, ym - 0.01, R - 0.05, R);
      lug(bin, a - 0.06, 0.07, ym + 0.01, Math.max(ya, yb) - 0.02, R - 0.05, R);
    }
    /* sidewall bulge, the rim with its tyre-pressure hub, eight studs (O3, O5) */
    cyl(bin, [0, yo, 0], [0, yo + s * 0.02, 0], R - 0.06, R - 0.12, 22);
    cyl(bin, [0, yo + s * 0.02, 0], [0, yo + s * 0.03, 0], 0.37, 0.36, 20);
    cyl(bin, [0, yo + s * 0.01, 0], [0, yo + s * 0.07, 0], 0.15, 0.12, 12);
    cyl(bin, [0, yo + s * 0.07, 0], [0, yo + s * 0.10, 0], 0.06, 0.05, 8);
    for (k = 0; k < 8; k++) {
      a = k / 8 * TAU;
      box(bin, 0.25 * Math.cos(a) - 0.022, 0.25 * Math.cos(a) + 0.022, yo + s * 0.02, yo + s * 0.045, 0.25 * Math.sin(a) - 0.022, 0.25 * Math.sin(a) + 0.022);
    }
    cyl(bin, [0, yin, 0], [0, yin - s * 0.03, 0], 0.30, 0.30, 14);
  }

  function osaHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, i, x, y, z;
    /* the boat bottom between the wheels: narrow V-ish section, the lower bow plate rising to the nose edge,
       the stern undercut rising to the transom (O1, O3, O6) */
    function low(x, zb, hb, ht) { return ringOf(x, [[0, zb - 0.04], [hb, zb], [ht, 1.34]]); }
    loft(P, [low(4.55, 1.30, 0.98, 1.02), low(4.25, 1.00, 0.95, 1.12), low(3.85, 0.66, 0.85, 1.22),
             low(3.40, 0.50, 0.68, 1.26), low(3.12, 0.48, 0.66, 1.26), low(3.10, 0.48, 0.66, 0.80),
             low(-3.55, 0.48, 0.66, 0.80), low(-3.57, 0.48, 0.66, 1.26), low(-4.05, 0.62, 0.78, 1.28),
             low(-4.55, 0.98, 0.95, 1.30)], false);
    /* the upper body: full width from the arch line (1.30 m) to the deck, the upper bow plate, the raked
       windscreen plate, the long flat roof and deck, a chamfered transom (STATIONS) */
    function up(x, zt, hw, ch) { return ringOf(x, [[0, 1.30], [hw, 1.30], [hw, zt - ch], [hw - ch, zt], [0, zt]]); }
    loft(P, [up(4.57, 1.44, 0.95, 0.02), up(4.38, 1.50, 1.20, 0.04), up(4.10, 1.58, OHW, 0.06),
             up(3.20, ODECK, OHW, 0.08), up(-4.42, ODECK, OHW, 0.08),
             up(-4.57, 1.94, 1.33, 0.06)], false);
    /* side skirts between the wheel arches: the outer skin from 0.98 m to the arch line, the arch cut round
       each tyre (O3: a narrow gap over the tread) */
    var AR = 0.70, segs = [[3.10, 4.30], [OA.x[1] + 0.66, OA.x[0] - 0.66], [OA.x[2] + 0.66, OA.x[1] - 0.66], [-4.45, -3.55]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < segs.length; i++) {
        var x0 = segs[i][0], x1 = segs[i][1], pts = [], n = 6, ax, dx;
        /* bottom edge: from x0 to x1 at 0.98 m, bent up by the arches near either end */
        for (k = 0; k <= n; k++) {
          x = x0 + (x1 - x0) * k / n; z = 0.98;
          for (var j = 0; j < 3; j++) { dx = x - OA.x[j]; if (Math.abs(dx) < AR) z = Math.max(z, 0.62 + Math.sqrt(AR * AR - dx * dx)); }
          if (i === 0) z = Math.max(z, 0.98 + (x - 3.6) * 0.55 * (x > 3.6 ? 1 : 0));
          if (i === 3) z = Math.max(z, 0.98 + (-3.95 - x) * 0.6 * (x < -3.95 ? 1 : 0));
          pts.push([x, Math.min(z, 1.28)]);
        }
        pts.push([x1, 1.31], [x0, 1.31]);
        profY(P, pts, s > 0 ? OHW - 0.06 : -OHW, s > 0 ? OHW : -OHW + 0.06);
      }
      /* arch lips over the three tyres */
      for (j = 0; j < 3; j++) {
        var prev = null;
        for (k = 0; k <= 8; k++) {
          var an = Math.PI * (0.18 + 0.64 * k / 8), p = [OA.x[j] + Math.cos(an) * (AR + 0.03), s * (OHW + 0.005), 0.62 + Math.sin(an) * (AR + 0.03)];
          if (p[2] > 1.27) p[2] = 1.27;
          if (prev) bar(D, prev, p, 0.05);
          prev = p;
        }
      }
      /* horizontal stiffening strakes along the body side (O3: two ribs and the chine) */
      box(P, -4.35, 2.50, s > 0 ? OHW : -OHW - 0.035, s > 0 ? OHW + 0.035 : -OHW, 1.62, 1.66);
      box(P, -4.35, 2.70, s > 0 ? OHW : -OHW - 0.035, s > 0 ? OHW + 0.035 : -OHW, 1.88, 1.92);
      box(P, -4.40, 3.90, s > 0 ? OHW - 0.02 : -OHW - 0.03, s > 0 ? OHW + 0.03 : -OHW + 0.02, 1.29, 1.33);
      /* cab side window and the door outline behind it (O3) */
      hexa(G, [[3.25, s * (OHW - 0.01), 1.70], [3.84, s * (OHW - 0.01), 1.70], [3.84, s * (OHW + 0.012), 1.70], [3.25, s * (OHW + 0.012), 1.70],
               [3.24, s * (OHW - 0.01), 1.99], [3.34, s * (OHW - 0.01), 1.99], [3.34, s * (OHW + 0.012), 1.99], [3.24, s * (OHW + 0.012), 1.99]]);
      box(D, 3.20, 3.48, s > 0 ? OHW - 0.01 : -OHW - 0.016, s > 0 ? OHW + 0.016 : -OHW + 0.01, 1.99, 2.02);
      box(D, 3.20, 3.88, s > 0 ? OHW - 0.01 : -OHW - 0.016, s > 0 ? OHW + 0.016 : -OHW + 0.01, 1.67, 1.70);
      box(D, 2.30, 2.34, s > 0 ? OHW - 0.01 : -OHW - 0.016, s > 0 ? OHW + 0.016 : -OHW + 0.01, 1.36, 2.02);
      box(D, 3.18, 3.22, s > 0 ? OHW - 0.01 : -OHW - 0.016, s > 0 ? OHW + 0.016 : -OHW + 0.01, 1.36, 2.02);
      box(D, 2.62, 2.82, s > 0 ? OHW + 0.01 : -OHW - 0.04, s > 0 ? OHW + 0.04 : -OHW - 0.01, 1.74, 1.78);
      /* square lockers and access plates along the side (O3) */
      for (k = 0; k < 3; k++) {
        x = -3.95 + k * 1.25;
        box(D, x, x + 0.80, s > 0 ? OHW : -OHW - 0.012, s > 0 ? OHW + 0.012 : -OHW, 1.38, 1.58);
        box(P, x + 0.03, x + 0.77, s > 0 ? OHW : -OHW - 0.022, s > 0 ? OHW + 0.022 : -OHW, 1.40, 1.56);
      }
      /* headlamps in their guards at the bow corners, on the upper bow plate (O6) */
      cylX(D, 4.24, 4.40, s * 0.98, 1.44, 0.09, 14);
      cylX(G, 4.40, 4.42, s * 0.98, 1.44, 0.07, 14);
      box(D, 4.24, 4.46, s * 0.98 - 0.14, s * 0.98 - 0.12, 1.32, 1.58);
      box(D, 4.24, 4.46, s * 0.98 + 0.12, s * 0.98 + 0.14, 1.32, 1.58);
      box(D, 4.42, 4.46, s * 0.98 - 0.14, s * 0.98 + 0.14, 1.56, 1.58);
      /* tow eyes on the nose edge and the transom */
      box(D, 4.50, 4.64, s * 0.60 - 0.07, s * 0.60 + 0.07, 1.30, 1.40);
      box(D, -4.64, -4.52, s * 0.70 - 0.07, s * 0.70 + 0.07, 1.10, 1.20);
      /* wing mirrors on arms at the windscreen corners (O4) */
      bar(D, [3.95, s * 1.30, 1.80], [4.12, s * 1.48, 1.86], 0.03);
      box(D, 4.10, 4.15, s * 1.46 - 0.05, s * 1.46 + 0.05, 1.70, 1.95);
      /* rear lamps on the transom */
      box(D, -4.60, -4.50, s * 1.10 - 0.08, s * 1.10 + 0.08, 1.70, 1.82);
    }
    /* the windscreens: two large panes in the raked plate, a centre pillar, a frame (O3, O6) */
    var WS = [4.10, 0, 1.58], wt = unit([3.20 - 4.10, 0, ODECK - 1.58]), wn = [-wt[2], 0, wt[0]];
    if (wn[2] < 0) wn = [-wn[0], 0, -wn[2]];
    var wl = Math.sqrt((4.10 - 3.20) * (4.10 - 3.20) + (ODECK - 1.58) * (ODECK - 1.58));
    for (s = -1; s <= 1; s += 2) {
      onSlope(G, WS, wt, wn, s > 0 ? 0.08 : -1.12, s > 0 ? 1.12 : -0.08, 0.10, wl - 0.10, -0.01, 0.012);
      onSlope(D, WS, wt, wn, s > 0 ? 0.04 : -1.20, s > 0 ? 1.20 : -0.04, 0.05, 0.10, -0.01, 0.02);
      onSlope(D, WS, wt, wn, s > 0 ? 0.04 : -1.20, s > 0 ? 1.20 : -0.04, wl - 0.10, wl - 0.05, -0.01, 0.02);
      onSlope(D, WS, wt, wn, s > 0 ? 1.12 : -1.20, s > 0 ? 1.20 : -1.12, 0.05, wl - 0.05, -0.01, 0.02);
      /* wiper on each pane */
      onSlope(D, WS, wt, wn, s * 0.55 - 0.012, s * 0.55 + 0.012, 0.12, 0.62, 0.012, 0.03);
    }
    onSlope(D, WS, wt, wn, -0.04, 0.04, 0.05, wl - 0.05, -0.01, 0.02);
    /* the trim vane folded on the upper bow plate (O6): a board with a lip and two hinge blocks */
    var bt = unit([4.10 - 4.57, 0, 1.58 - 1.44]), bn = [-bt[2], 0, bt[0]];
    if (bn[2] < 0) bn = [-bn[0], 0, -bn[2]];
    onSlope(P, [4.57, 0, 1.44], bt, bn, -0.88, 0.88, 0.05, 0.42, 0.0, 0.05);
    onSlope(D, [4.57, 0, 1.44], bt, bn, -0.88, 0.88, 0.02, 0.07, 0.0, 0.08);
    for (s = -1; s <= 1; s += 2) onSlope(D, [4.57, 0, 1.44], bt, bn, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.38, 0.48, 0.0, 0.07);
    /* the cab roof: two square crew hatches behind the windscreens (O5: a hatch open, crewman standing) */
    for (s = -1; s <= 1; s += 2) {
      box(P, 2.30, 2.90, s * 0.62 - 0.30, s * 0.62 + 0.30, ODECK - 0.01, ODECK + 0.05);
      box(D, 2.35, 2.85, s * 0.62 - 0.25, s * 0.62 + 0.25, ODECK + 0.05, ODECK + 0.06);
      box(D, 2.81, 2.89, s * 0.62 - 0.10, s * 0.62 + 0.10, ODECK + 0.05, ODECK + 0.10);
    }
    /* team: two modest up-facing strips on the cab roof */
    for (s = -1; s <= 1; s += 2) box(B.team, 3.00, 3.10, s * 1.0 - 0.18, s * 1.0 + 0.18, ODECK - 0.005, ODECK + 0.012);
    box(B.team, -4.30, -3.75, -0.10, 0.10, ODECK - 0.005, ODECK + 0.012);
    /* rear deck: engine-air grilles each side of the centre, the waterjet hatch; the transom lines */
    for (s = -1; s <= 1; s += 2) {
      box(D, -4.20, -2.95, s > 0 ? 0.30 : -1.15, s > 0 ? 1.15 : -0.30, ODECK - 0.01, ODECK + 0.012);
      for (k = 0; k < 9; k++) box(P, -4.17 + k * 0.137, -4.12 + k * 0.137, s > 0 ? 0.33 : -1.12, s > 0 ? 1.12 : -0.33, ODECK + 0.012, ODECK + 0.045);
    }
    box(D, -4.585, -4.565, -0.95, 0.95, 1.86, 1.89);
    box(D, -4.585, -4.565, -0.55, 0.55, 1.30, 1.70);
    /* the underbody: axle housings between the tyres */
    for (k = 0; k < 3; k++) cylY(D, OA.x[k], -0.86, 0.86, OA.R, 0.11, 10);
  }

  /* -------- the turret (local frame: origin on the ring, z = 0 on the deck, rests pointing +X) */
  /* Pack of the Osa-AK / Osa-AKM: two blocks of three containers, drawn as photographed at rest (O4, MAKS 2011:
     about 20 deg) in the group "podelev", hinged at OPV; render3d poseLauncher turns it a further OEL to the
     29 deg the firing photograph O7 and the side view O3 show.  Neither angle is a published figure. */
  var OA0 = 20 * Math.PI / 180, OEL = 9 * Math.PI / 180, OPV = [-1.45, 0, 1.05];
  var OCL = 3.50, OCU0 = -1.95, OCW = 0.27;
  function osaPack(B) {
    var F = frame(OA0), P = [0, 0, 0], s, m, k, cw, cells = [], u1 = OCU0 + OCL;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * 1.04;
      /* the cradle under the block, and its rear plate */
      fbox(B.paint, P, F, OCU0 + 0.10, u1 - 0.25, yc - 0.44, yc + 0.44, -0.10, -0.02);
      fbox(B.dark, P, F, -0.10, 0.10, yc - 0.46, yc + 0.46, -0.16, -0.02);
      fbox(B.paint, P, F, 1.00, 1.16, yc - 0.46, yc + 0.46, -0.16, -0.02);
      for (m = -1; m <= 1; m++) {
        cw = yc + m * (OCW + 0.02);
        /* the transport-launch container: a ribbed box (O3, O4, O5) */
        fbox(B.paint, P, F, OCU0, u1, cw - OCW / 2, cw + OCW / 2, -0.02, OCW - 0.02);
        for (k = 0; k < 7; k++) fbox(B.paint, P, F, OCU0 + 0.25 + k * 0.48, OCU0 + 0.30 + k * 0.48, cw - OCW / 2 - 0.012, cw + OCW / 2 + 0.012, -0.03, OCW - 0.008);
        fbox(B.dark, P, F, OCU0 + 0.05, u1 - 0.05, cw - 0.012, cw + 0.012, OCW - 0.02, OCW - 0.005);
        /* the front cover: a dark lid with a round cap (O5: the caps are the bright spots on the upper end) */
        fbox(B.dark, P, F, u1, u1 + 0.03, cw - OCW / 2 + 0.01, cw + OCW / 2 - 0.01, 0.0, OCW - 0.04);
        cyl(B.dark, at(P, F, u1 + 0.03, cw, OCW / 2 - 0.02), at(P, F, u1 + 0.07, cw, OCW / 2 - 0.02), 0.07, 0.06, 10);
        /* rear cover */
        fbox(B.dark, P, F, OCU0 - 0.03, OCU0, cw - OCW / 2 + 0.01, cw + OCW / 2 - 0.01, 0.0, OCW - 0.04);
        cells.push([at(P, F, u1 + 0.07, cw, OCW / 2 - 0.02)[0], cw, at(P, F, u1 + 0.07, cw, OCW / 2 - 0.02)[2], at(P, F, OCU0, cw, 0)[0]]);
      }
      /* the trunnion boss on the inner side of the block */
      cylY(B.dark, 0, s * 0.50, s * 0.62, 0, 0.09, 10);
    }
    return cells;
  }

  function osaTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, i;
    /* ring and the low wide base: chamfered octagon, 0.45 m tall (O3) */
    cylZ(D, 0, 0, -0.02, 0.06, 1.12, 32);
    prism(P, [[-1.65, -0.80], [-1.35, -1.10], [1.25, -1.10], [1.55, -0.80], [1.55, 0.80], [1.25, 1.10], [-1.35, 1.10], [-1.65, 0.80]], 0.05, 0.48);
    prism(D, [[-1.66, -0.81], [-1.36, -1.11], [1.26, -1.11], [1.56, -0.81], [1.56, 0.81], [1.26, 1.11], [-1.36, 1.11], [-1.66, 0.81]], 0.05, 0.09);
    for (s = -1; s <= 1; s += 2) {
      /* louvre boxes on the base flanks */
      for (k = 0; k < 2; k++) {
        box(D, -0.95 + k * 0.9, -0.30 + k * 0.9, s > 0 ? 1.10 : -1.115, s > 0 ? 1.115 : -1.10, 0.16, 0.40);
        for (i = 0; i < 4; i++) box(P, -0.93 + k * 0.9, -0.32 + k * 0.9, s > 0 ? 1.11 : -1.13, s > 0 ? 1.13 : -1.11, 0.18 + i * 0.055, 0.20 + i * 0.055);
      }
    }
    /* the equipment cabin on the base (O3, O4) */
    prism(P, [[-0.95, -0.58], [1.05, -0.58], [1.32, -0.40], [1.32, 0.40], [1.05, 0.58], [-0.95, 0.58]], 0.48, 1.45);
    prism(P, [[-0.87, -0.50], [1.00, -0.50], [1.22, -0.34], [1.22, 0.34], [1.00, 0.50], [-0.87, 0.50]], 1.45, 1.56);
    for (s = -1; s <= 1; s += 2) {
      box(P, 0.35, 0.95, s > 0 ? 0.58 : -0.72, s > 0 ? 0.72 : -0.58, 0.62, 1.20);
      box(D, 0.40, 0.90, s > 0 ? 0.72 : -0.73, s > 0 ? 0.73 : -0.72, 0.70, 1.12);
      cylY(D, 0.10, s * 0.58, s * 0.66, 1.10, 0.07, 10);
    }
    box(D, -0.70, 0.80, -0.30, 0.30, 1.56, 1.58);
    /* the target-tracking antenna: the tall flat dish with a rounded top on the cabin front (O3 edge-on, O5, O6) */
    var aU = [0, 0, 1], aW = [0, 1, 0], aN = [1, 0, 0];
    var outl = [[-0.50, 0.00], [0.50, 0.00], [0.50, 1.05], [0.40, 1.26], [0.20, 1.36], [-0.20, 1.36], [-0.40, 1.26], [-0.50, 1.05]];
    var inl = [[-0.44, 0.06], [0.44, 0.06], [0.44, 1.03], [0.35, 1.21], [0.18, 1.30], [-0.18, 1.30], [-0.35, 1.21], [-0.44, 1.03]];
    planePrism(D, [1.50, 0, 0.60], aU, aW, aN, outl, 0.0, 0.08);
    planePrism(P, [1.50, 0, 0.60], aU, aW, aN, inl, 0.08, 0.10);
    box(P, 1.32, 1.50, -0.24, 0.24, 0.80, 1.55);
    box(D, 1.28, 1.50, -0.10, 0.10, 0.62, 0.80);
    cylX(D, 1.59, 1.66, 0, 1.26, 0.06, 10);
    /* the two missile-guidance antennas: round dishes on arms either side, a lamp unit under each (O3, O5, O6) */
    for (s = -1; s <= 1; s += 2) {
      box(P, 1.05, 1.35, s > 0 ? 0.50 : -1.02, s > 0 ? 1.02 : -0.50, 1.32, 1.46);
      cyl(P, [1.35, s * 0.90, 1.55], [1.46, s * 0.90, 1.55], 0.31, 0.30, 24);
      cyl(D, [1.46, s * 0.90, 1.55], [1.47, s * 0.90, 1.55], 0.30, 0.30, 24);
      cyl(P, [1.47, s * 0.90, 1.55], [1.48, s * 0.90, 1.55], 0.27, 0.27, 24);
      cyl(D, [1.47, s * 0.90, 1.55], [1.55, s * 0.90, 1.55], 0.05, 0.04, 8);
      box(P, 1.20, 1.42, s * 0.90 - 0.13, s * 0.90 + 0.13, 1.04, 1.24);
      cylX(D, 1.42, 1.48, s * 0.90, 1.14, 0.075, 12);
      cylX(G, 1.48, 1.49, s * 0.90, 1.14, 0.06, 12);
    }
    /* the search radar on the cabin top rear, raised as O3 and O4 show it: a post, a yoke, the curved mesh
       reflector facing forward with its lattice frame behind and the feed on a boom in front */
    var MX = -0.55, rz = 2.85, rh = 0.52, rw = 0.62;
    cylZ(D, MX, 0, 1.56, 1.66, 0.24, 16);
    cylZ(P, MX, 0, 1.66, 2.20, 0.10, 10);
    box(P, MX - 0.08, MX + 0.08, -0.40, 0.40, 2.16, 2.26);
    for (s = -1; s <= 1; s += 2) box(P, MX - 0.06, MX + 0.06, s * 0.36 - 0.04, s * 0.36 + 0.04, 2.20, rz);
    sheet(B.mesh, MX + 0.10, 0, rz, rw, rh, 0.22, 12, 4);
    for (k = -2; k <= 2; k++) {
      var fy = k * rw / 2, dep = 0.22 * (fy * fy) / (rw * rw);
      bar(D, [MX + 0.08 - dep, fy, rz - rh], [MX + 0.08 - dep, fy, rz + rh], 0.025);
      bar(D, [MX + 0.08 - dep, fy, rz + rh], [MX - 0.30, 0, rz], 0.02);
      bar(D, [MX + 0.08 - dep, fy, rz - rh], [MX - 0.30, 0, rz], 0.02);
    }
    for (k = -1; k <= 1; k++) bar(D, [MX - 0.14, -rw, rz + k * rh], [MX - 0.14, rw, rz + k * rh], 0.025);
    bar(D, [MX + 0.08, -0.20, rz - rh + 0.05], [MX + 0.55, 0, rz - 0.10], 0.03);
    bar(D, [MX + 0.08, 0.20, rz - rh + 0.05], [MX + 0.55, 0, rz - 0.10], 0.03);
    box(P, MX + 0.52, MX + 0.64, -0.14, 0.14, rz - 0.20, rz + 0.02);
    /* the pack supports: a frame from the base rear up to each trunnion, an elevating ram (O3) */
    for (s = -1; s <= 1; s += 2) {
      hexa(P, [[OPV[0] - 0.30, s * 0.50, 0.48], [OPV[0] + 0.30, s * 0.50, 0.48], [OPV[0] + 0.30, s * 0.62, 0.48], [OPV[0] - 0.30, s * 0.62, 0.48],
               [OPV[0] - 0.12, s * 0.50, OPV[2] + 0.06], [OPV[0] + 0.12, s * 0.50, OPV[2] + 0.06], [OPV[0] + 0.12, s * 0.62, OPV[2] + 0.06], [OPV[0] - 0.12, s * 0.62, OPV[2] + 0.06]]);
      bar(D, [-0.40, s * 0.66, 0.50], [OPV[0] + 0.50, s * 0.66, OPV[2] + 0.12], 0.06);
    }
    /* team: a modest strip on the cabin roof */
    box(B.team, -0.45, 0.35, -0.08, 0.08, 1.58, 1.595);
  }

  function buildOsa(THREE, M, C) {
    var T = materials(THREE, C, OSA_PAINT), g = new THREE.Group(), HB = bins(T), TB = bins(T), EB = bins(T), k, wg, WB, tur, E, cells;
    TB.mesh = meshBin(T);
    osaHull(HB);
    flush(THREE, g, HB);
    for (k = 0; k < 3; k++) {
      WB = { dark: new Bin(T.dark, false) };
      osaTyre(WB.dark, OA.yi, OA.yo, 1);
      osaTyre(WB.dark, -OA.yo, -OA.yi, -1);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(OA.x[k], 0, OA.R);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    osaTurret(TB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(OTX, 0, ODECK);
    flush(THREE, tur, TB);
    cells = osaPack(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(OPV[0], OPV[1], OPV[2]);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = OEL;
    tur.add(E);
    g.add(tur);
    g.name = "pact_e60_osa";
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  /* ============================================================ 9K35 STRELA-10 (9A35 on the MT-LB) */
  /* running gear from photograph S3 (2014, square-on left side, scaled on the published 6.454 m hull) */
  var NW = 6, XW = [-2.09, -1.29, -0.49, 0.31, 1.11, 1.91];
  var FRT = { x: 2.86, z: 0.43, r: 0.27 };     /* drive sprocket at the nose */
  var REA = { x: -2.93, z: 0.42, r: 0.28 };    /* idler at the tail */
  var ZW = 0.36, RWR = 0.31, TYC = 1.25, THW = 0.175;
  var SROOF = 1.55, STX = -1.10;

  function pickTangent(C, r, P, arrive) {
    var vx = P[0] - C.x, vz = P[1] - C.z, d = Math.sqrt(vx * vx + vz * vz), phi = Math.atan2(vz, vx), al = Math.acos(r / d);
    var cand = [phi + al, phi - al], i, th, tx, tz, dx, dz;
    for (i = 0; i < 2; i++) {
      th = cand[i]; tx = -Math.sin(th); tz = Math.cos(th);
      dx = arrive ? (C.x + r * Math.cos(th) - P[0]) : (P[0] - (C.x + r * Math.cos(th)));
      dz = arrive ? (C.z + r * Math.sin(th) - P[1]) : (P[1] - (C.z + r * Math.sin(th)));
      if (dx * tx + dz * tz > 0) return th;
    }
    return cand[0];
  }
  /* the track run: ground run under the wheels, up round the sprocket, a top run lying on the wheels (the MT-LB
     has no return rollers, S3), down round the idler */
  function beltPath() {
    var zb = 0.055, ri = FRT.r + 0.045, rs = REA.r + 0.045, p = [], k;
    var Pf = [XW[NW - 1], zb], Pr = [XW[0], zb];
    var t1 = pickTangent(FRT, ri, Pf, true), t2 = pickTangent(REA, rs, Pr, false);
    function line(A, B) {
      var l = Math.sqrt((B[0] - A[0]) * (B[0] - A[0]) + (B[1] - A[1]) * (B[1] - A[1])), j, nn = Math.max(1, Math.ceil(l / 0.22));
      for (j = 1; j <= nn; j++) p.push([A[0] + (B[0] - A[0]) * j / nn, A[1] + (B[1] - A[1]) * j / nn]);
    }
    function arc(C, r, a0, a1) {
      var j, nn = Math.max(2, Math.ceil(r * Math.abs(a1 - a0) / 0.15)), ang;
      for (j = 1; j <= nn; j++) { ang = a0 + (a1 - a0) * j / nn; p.push([C.x + r * Math.cos(ang), C.z + r * Math.sin(ang)]); }
    }
    p.push([Pr[0], Pr[1]]);
    line(Pr, Pf);
    var T1 = [FRT.x + ri * Math.cos(t1), FRT.z + ri * Math.sin(t1)];
    line(Pf, T1);
    var a1 = Math.PI / 2;
    while (a1 < t1) a1 += TAU;
    arc(FRT, ri, t1, a1);
    /* the top run sags onto each wheel top */
    var tops = [], top = ZW + RWR + 0.045;
    for (k = NW - 1; k >= 0; k--) tops.push([XW[k], top]);
    var last = [FRT.x, FRT.z + ri];
    for (k = 0; k < tops.length; k++) { line(last, tops[k]); last = tops[k]; }
    line(last, [REA.x, REA.z + rs]);
    var t2b = t2; while (t2b < Math.PI / 2) t2b += TAU;
    arc(REA, rs, Math.PI / 2, t2b);
    line([REA.x + rs * Math.cos(t2), REA.z + rs * Math.sin(t2)], Pr);
    p.pop();
    return p;
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.04, A, B2, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;
      to = (i % 2) ? 0.022 : 0.060;
      V.push([b[0] + nx * to, y1, b[1] + nz * to], [b[0] + nx * to, y0, b[1] + nz * to],
             [b[0] - nx * ti, y0, b[1] - nz * ti], [b[0] - nx * ti, y1, b[1] - nz * ti]);
    }
    for (i = 0; i < n; i++) {
      A = i * 4; B2 = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        a0 = A + k; a1 = A + (k + 1) % 4; b0 = B2 + k; b1 = B2 + (k + 1) % 4;
        F.push([a0, b0, a1], [a1, b0, b1]);
      }
    }
    solid(bin, V, F);
  }

  /* the outer disc of a road wheel about the origin, both sides: the dished disc with its ribs (S3, S5) */
  function stWheel(bin) {
    var s, k, a, o;
    for (s = -1; s <= 1; s += 2) {
      o = s * (TYC + 0.13);
      cyl(bin, [0, o, 0], [0, o + s * 0.025, 0], RWR - 0.04, RWR - 0.07, 20, false, false);
      cyl(bin, [0, o + s * 0.025, 0], [0, o + s * 0.06, 0], 0.12, 0.10, 12, true, false);
      cyl(bin, [0, o + s * 0.06, 0], [0, o + s * 0.09, 0], 0.06, 0.05, 8, true, false);
      for (k = 0; k < 6; k++) { a = (k + 0.5) / 6 * TAU; cyl(bin, [0.085 * Math.cos(a), o + s * 0.055, 0.085 * Math.sin(a)], [0.085 * Math.cos(a), o + s * 0.075, 0.085 * Math.sin(a)], 0.015, 0.015, 6, false, false); }
      for (k = 0; k < 8; k++) {
        a = k / 8 * TAU;
        hexa(bin, [[0.10 * Math.cos(a - 0.08), o, 0.10 * Math.sin(a - 0.08)], [0.25 * Math.cos(a - 0.05), o, 0.25 * Math.sin(a - 0.05)],
                   [0.25 * Math.cos(a + 0.05), o, 0.25 * Math.sin(a + 0.05)], [0.10 * Math.cos(a + 0.08), o, 0.10 * Math.sin(a + 0.08)],
                   [0.10 * Math.cos(a - 0.08), o + s * 0.04, 0.10 * Math.sin(a - 0.08)], [0.25 * Math.cos(a - 0.05), o + s * 0.03, 0.25 * Math.sin(a - 0.05)],
                   [0.25 * Math.cos(a + 0.05), o + s * 0.03, 0.25 * Math.sin(a + 0.05)], [0.10 * Math.cos(a + 0.08), o + s * 0.04, 0.10 * Math.sin(a + 0.08)]]);
      }
    }
  }

  function stHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, i, x, path = beltPath();
    /* STATIONS: belly between the tracks, the sponson floor over them, vertical sides to the roof; the nose:
       a near-vertical lower plate and the upper glacis up to the roof; the tail a near-vertical plate (S3, S5) */
    function st(x, zb, zs, zt, hw) { return ringOf(x, [[0, zb - 0.02], [0.95, zb], [0.95, zs], [hw - 0.02, zs], [hw, zs + 0.03], [hw, zt - 0.05], [hw - 0.05, zt], [0, zt]]); }
    loft(P, [st(3.227, 0.70, 0.80, 1.12, 1.36), st(3.20, 0.62, 0.80, 1.14, 1.40), st(2.90, 0.40, 0.80, 1.33, 1.425),
             st(2.47, 0.40, 0.80, SROOF, 1.425), st(-3.08, 0.40, 0.80, SROOF, 1.425), st(-3.20, 0.52, 0.80, 1.52, 1.425),
             st(-3.227, 0.58, 0.80, 1.49, 1.40)], false);
    /* tracks, sprocket, idler, tyres */
    belt(D, path, TYC - THW, TYC + THW);
    belt(D, path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      /* rubber tyres of the six stations (the discs are the roadwheel groups) */
      for (k = 0; k < NW; k++) cyl(D, [XW[k], s * (TYC - 0.13), ZW], [XW[k], s * (TYC + 0.13), ZW], RWR, RWR, 18);
      gear(D, FRT.x, s * TYC - 0.14, s * TYC - 0.06, FRT.z, FRT.r - 0.035, FRT.r + 0.02, 13);
      gear(D, FRT.x, s * TYC + 0.06, s * TYC + 0.14, FRT.z, FRT.r - 0.035, FRT.r + 0.02, 13);
      cyl(P, [FRT.x, s * (TYC - 0.06), FRT.z], [FRT.x, s * (TYC + 0.06), FRT.z], 0.19, 0.19, 14, true, true);
      cyl(D, [FRT.x, s * (TYC + 0.14), FRT.z], [FRT.x, s * (TYC + 0.21), FRT.z], 0.11, 0.09, 10);
      cyl(P, [REA.x, s * (TYC - 0.12), REA.z], [REA.x, s * (TYC + 0.12), REA.z], REA.r, REA.r, 18);
      cyl(D, [REA.x, s * (TYC + 0.12), REA.z], [REA.x, s * (TYC + 0.17), REA.z], 0.09, 0.08, 8);
      /* the fender lip along the sponson edge, turned down at the nose over the sprocket */
      box(D, -3.10, 2.60, s > 0 ? 1.40 : -1.44, s > 0 ? 1.44 : -1.40, 0.76, 0.82);
      /* headlamps in guards on the nose plate, tow hooks (S5) */
      box(D, 3.10, 3.24, s * 0.95 - 0.12, s * 0.95 + 0.12, 1.08, 1.20);
      cylX(G, 3.20, 3.25, s * 0.95, 1.14, 0.07, 12);
      box(D, 3.20, 3.30, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.72, 0.84);
      /* tail: hinges of the two big rear doors, the lamps (S2) */
      for (k = 0; k < 2; k++) box(D, -3.25, -3.22, s * 1.05 - 0.05, s * 1.05 + 0.05, 0.75 + k * 0.50, 0.88 + k * 0.50);
      box(D, -3.25, -3.22, s * 1.25 - 0.07, s * 1.25 + 0.07, 1.30, 1.42);
      /* the handrail round the rear roof, on posts (S2, S3) */
      for (k = 0; k < 4; k++) bar(D, [-3.05 + k * 0.55, s * 1.36, SROOF], [-3.05 + k * 0.55, s * 1.36, SROOF + 0.22], 0.03);
      bar(D, [-3.05, s * 1.36, SROOF + 0.22], [-1.40, s * 1.36, SROOF + 0.22], 0.032);
      /* a cable coil carried on the side (S3) */
      var prev = null;
      for (i = 0; i <= 14; i++) {
        var an = i / 14 * TAU, p = [0.55 + Math.cos(an) * 0.42, s * 1.445, 1.22 + Math.sin(an) * 0.13];
        if (prev) bar(D, prev, p, 0.025);
        prev = p;
      }
    }
    bar(D, [-3.05, 1.36, SROOF + 0.22], [-3.05, -1.36, SROOF + 0.22], 0.032);
    /* the tail: the two rear doors' outlines on the near-vertical plate (S2) */
    for (s = -1; s <= 1; s += 2) {
      box(P, -3.28, -3.20, s > 0 ? 0.04 : -1.06, s > 0 ? 1.06 : -0.04, 0.70, 1.40);
      box(D, -3.29, -3.27, s > 0 ? 0.30 : -0.80, s > 0 ? 0.80 : -0.30, 1.02, 1.08);
    }
    box(D, -3.25, -3.22, -0.03, 0.03, 0.66, 1.42);
    /* the glacis: the trim vane folded flat with its ribs (S5), the driver's and commander's armoured windscreen
       covers at the top of the glacis, the driver's hatch and the gunner's small machine-gun cupola (S3, S5) */
    var gt = unit([2.47 - 3.20, 0, SROOF - 1.14]), gn = [-gt[2], 0, gt[0]];
    if (gn[2] < 0) gn = [-gn[0], 0, -gn[2]];
    onSlope(P, [3.20, 0, 1.14], gt, gn, -0.95, 0.95, 0.04, 0.48, 0.0, 0.04);
    for (k = -2; k <= 2; k++) onSlope(D, [3.20, 0, 1.14], gt, gn, k * 0.40 - 0.015, k * 0.40 + 0.015, 0.04, 0.48, 0.04, 0.06);
    for (s = -1; s <= 1; s += 2) {
      onSlope(D, [3.20, 0, 1.14], gt, gn, s * 0.55 - 0.32, s * 0.55 + 0.32, 0.56, 0.78, 0.0, 0.03);
      onSlope(P, [3.20, 0, 1.14], gt, gn, s * 0.55 - 0.30, s * 0.55 + 0.30, 0.57, 0.77, 0.03, 0.05);
      cylZ(P, 2.05, s * 0.55, SROOF - 0.01, SROOF + 0.06, 0.28, 16);
      cylZ(D, 2.05, s * 0.55, SROOF + 0.06, SROOF + 0.075, 0.20, 12);
    }
    cylZ(P, 1.75, -0.55, SROOF + 0.06, SROOF + 0.20, 0.26, 16);
    cylZ(D, 1.75, -0.55, SROOF + 0.20, SROOF + 0.24, 0.20, 14);
    cylX(D, 1.95, 2.45, -0.55, SROOF + 0.13, 0.025, 6);
    /* engine deck: the louvred air intake over the engine behind the cab (S3), the exhaust box */
    box(D, 0.15, 1.30, -0.95, 0.95, SROOF - 0.01, SROOF + 0.012);
    for (k = 0; k < 10; k++) box(P, 0.18 + k * 0.112, 0.23 + k * 0.112, -0.92, 0.92, SROOF + 0.012, SROOF + 0.045);
    /* troop-compartment roof hatches either side of the turret (S2) */
    for (s = -1; s <= 1; s += 2) {
      box(D, -2.90, -2.25, s * 0.85 - 0.33, s * 0.85 + 0.33, SROOF - 0.01, SROOF + 0.03);
      box(P, -2.87, -2.28, s * 0.85 - 0.30, s * 0.85 + 0.30, SROOF + 0.03, SROOF + 0.05);
      box(D, -2.40, -2.32, s * 0.85 - 0.10, s * 0.85 + 0.10, SROOF + 0.05, SROOF + 0.08);
    }
    /* team: modest strips on the forward roof */
    for (s = -1; s <= 1; s += 2) box(B.team, 0.15, 0.95, s * 1.20 - 0.10, s * 1.20 + 0.10, SROOF - 0.005, SROOF + 0.012);
  }

  /* the MT-LB's small fittings (the detail pass): the three vision blocks in front of the driver's and the
     commander's hatches, the firing port with its cover low in each side of the troop compartment, grab handles
     along the roof's side edges and on the rear doors, the bolt row along the sponson's top edge, the cable coil's
     two eyes and its clips, the front mudflaps over the sprockets */
  function stFittings(B) {
    var D = B.dark, P = B.paint, G = B.glass, s, k, x, y;
    for (s = -1; s <= 1; s += 2) {
      for (k = -1; k <= 1; k++) {
        y = s * 0.55 + k * 0.17;
        box(P, 2.38, 2.48, y - 0.06, y + 0.06, SROOF - 0.01, SROOF + 0.08);
        box(G, 2.48, 2.485, y - 0.05, y + 0.05, SROOF + 0.015, SROOF + 0.06);
      }
      cylY(P, -1.60, s * 1.425, s * 1.455, 1.15, 0.09, 12);
      box(D, -1.50, -1.45, s * 1.425, s * 1.46, 1.12, 1.18);
      for (k = 0; k < 3; k++) {
        x = -0.80 + k * 0.90;
        bar(D, [x - 0.12, s * 1.38, SROOF], [x - 0.12, s * 1.38, SROOF + 0.06], 0.022);
        bar(D, [x + 0.12, s * 1.38, SROOF], [x + 0.12, s * 1.38, SROOF + 0.06], 0.022);
        bar(D, [x - 0.12, s * 1.38, SROOF + 0.06], [x + 0.12, s * 1.38, SROOF + 0.06], 0.022);
      }
      for (x = -3.0; x < 2.5; x += 0.30) box(D, x - 0.015, x + 0.015, s > 0 ? 1.395 : -1.435, s > 0 ? 1.435 : -1.395, 0.82, 0.835);
      cylY(D, 0.13, s * 1.43, s * 1.465, 1.22, 0.05, 8);
      cylY(D, 0.97, s * 1.43, s * 1.465, 1.22, 0.05, 8);
      for (k = 0; k < 3; k++) box(D, 0.30 + k * 0.25, 0.34 + k * 0.25, s > 0 ? 1.425 : -1.465, s > 0 ? 1.465 : -1.425, 1.06, 1.38);
      box(D, 2.95, 3.00, s > 0 ? 1.02 : -1.44, s > 0 ? 1.44 : -1.02, 0.55, 0.80);
      bar(D, [-3.25, s * 0.50, 0.95], [-3.285, s * 0.50, 0.95], 0.02);
      bar(D, [-3.25, s * 0.50, 1.20], [-3.285, s * 0.50, 1.20], 0.02);
      bar(D, [-3.285, s * 0.50, 0.95], [-3.285, s * 0.50, 1.20], 0.02);
    }
  }

  /* Stowed and raised.  The launcher (four containers and the range-only radar) is the group "podelev"
     (render3d poseLauncher), hinged at SPV in the turret frame and drawn STOWED: containers level, pointing
     forward, the top of the pack at the published travelling height of 2.3 m.  It turns to userData.el = SEL
     while the vehicle holds a target in reach: the 40 deg the raised launchers of S5 and S6 and the plate S1 are
     read at, NOT a published figure.  The lift of the column the 2014 photographs (S3, S4) show is not drawn:
     poseLauncher only pitches the group. */
  var SEL = 0.70, SPV = [-0.55, 0, 0.45], SCL = 2.30, SCW = 0.29;
  function stTurret(B, EB) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, w, c, cells = [], F = frame(0), O = [0, 0, 0];
    /* ring, platform and the pedestal that carries the trunnions (S3, S5) */
    cylZ(D, 0, 0, -0.02, 0.06, 0.92, 28);
    prism(P, [[-0.95, -0.85], [0.55, -0.85], [0.90, -0.45], [0.90, 0.45], [0.55, 0.85], [-0.95, 0.85]], 0.05, 0.16);
    prism(P, [[-0.80, -0.32], [-0.30, -0.32], [-0.20, -0.22], [-0.20, 0.22], [-0.30, 0.32], [-0.80, 0.32]], 0.16, 0.36);
    for (s = -1; s <= 1; s += 2) {
      box(P, -0.68, -0.42, s > 0 ? 0.10 : -0.16, s > 0 ? 0.16 : -0.10, 0.34, 0.50);
      cylY(D, SPV[0], s * 0.05, s * 0.18, SPV[2], 0.06, 10);
    }
    /* the operator's sighting head at the front of the platform: an armoured box with the glazed window (S5) */
    box(P, 0.25, 0.75, -0.30, 0.30, 0.16, 0.31);
    box(P, 0.30, 0.70, -0.26, 0.26, 0.31, 0.34);
    box(G, 0.75, 0.765, -0.22, 0.22, 0.19, 0.28);
    box(D, 0.74, 0.77, -0.26, 0.26, 0.28, 0.30);
    /* team strip on the platform rear */
    box(B.team, -0.92, -0.78, -0.30, 0.30, 0.16, 0.175);
    /* the containers (frame at the hinge: u forward, w left, h up): two pairs abreast, a gap between them for
       the radar; ribbed square boxes with a lid at each end (S3, S4, S5) */
    var u0 = -0.55, u1 = u0 + SCL;
    for (s = -1; s <= 1; s += 2) {
      fbox(EB.paint, O, F, u0 + 0.10, u1 - 0.10, s > 0 ? 0.16 : -0.80, s > 0 ? 0.80 : -0.16, -0.08, 0.0);
      fbox(EB.dark, O, F, -0.10, 0.10, s > 0 ? 0.05 : -0.80, s > 0 ? 0.80 : -0.05, -0.12, 0.0);
      for (k = 0; k < 2; k++) {
        c = s * (0.32 + k * 0.31);
        fbox(EB.paint, O, F, u0, u1, c - SCW / 2, c + SCW / 2, 0.0, SCW);
        for (w = 0; w < 5; w++) fbox(EB.paint, O, F, u0 + 0.22 + w * 0.44, u0 + 0.27 + w * 0.44, c - SCW / 2 - 0.012, c + SCW / 2 + 0.012, -0.012, SCW + 0.012);
        fbox(EB.dark, O, F, u1, u1 + 0.03, c - SCW / 2 + 0.01, c + SCW / 2 - 0.01, 0.01, SCW - 0.01);
        fbox(EB.dark, O, F, u0 - 0.03, u0, c - SCW / 2 + 0.01, c + SCW / 2 - 0.01, 0.01, SCW - 0.01);
        fbox(EB.dark, O, F, u0 + 0.10, u1 - 0.10, c - 0.012, c + 0.012, SCW, SCW + 0.012);
        cells.push([u1 + 0.03, c, SCW / 2, u0]);
      }
    }
    /* the 9S86 range-only radar between the pairs, at the front: a round dish behind a cone (S5, S6) */
    fbox(EB.paint, O, F, 0.05, 0.45, -0.12, 0.12, -0.02, 0.14);
    cyl(EB.paint, at(O, F, 0.45, 0, 0.14), at(O, F, 0.68, 0, 0.14), 0.08, 0.15, 16);
    cyl(EB.dark, at(O, F, 0.68, 0, 0.14), at(O, F, 0.70, 0, 0.14), 0.15, 0.15, 16);
    cyl(EB.dark, at(O, F, 0.70, 0, 0.14), at(O, F, 0.79, 0, 0.14), 0.04, 0.02, 8);
    return cells;
  }

  function buildStrela(THREE, M, C) {
    var T = materials(THREE, C, STR_PAINT), g = new THREE.Group(), HB = bins(T), TB = bins(T), EB = bins(T), k, wg, WB, tur, E, cells;
    stHull(HB);
    stFittings(HB);
    flush(THREE, g, HB);
    for (k = 0; k < NW; k++) {
      WB = { paint: new Bin(T.paint, true) };
      stWheel(WB.paint);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[k], 0, ZW);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    cells = stTurret(TB, EB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(STX, 0, SROOF);
    flush(THREE, tur, TB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(SPV[0], SPV[1], SPV[2]);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = SEL;
    tur.add(E);
    g.add(tur);
    g.name = "pact_e60_strela10";
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { buildOsa: buildOsa, buildStrela: buildStrela };
})();

/* len is the measured X extent of each build (dump, 2026-11-03) */
UNIT_MODELS["pact_e60_osa"] = {
  len: 9.28,
  build: function (THREE, M, C) { return HeroOsaStrela.buildOsa(THREE, M, C); }
};
UNIT_MODELS["pact_e60_strela10"] = {
  len: 6.61,
  build: function (THREE, M, C) { return HeroOsaStrela.buildStrela(THREE, M, C); }
};
