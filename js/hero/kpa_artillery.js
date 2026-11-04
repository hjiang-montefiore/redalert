/* ========== kpa_artillery.js - HERO models: North Korean artillery, rocket launchers and the VTT-323 carrier ==========
   Rows registered at the foot (and only these):
     kpa_e60_mlrs  "Type 75 122mm MRL" (BM-21 Grad pattern)   the 2B5 pack on the Ural-375D: ru_bm14_bm21.js copied
     kpa_e80_mlrs  M1985 240 mm MRL, 12 tubes                   the same Ural-375D, a 2 x 6 pack of 240 mm tubes
     kpa_e90_mlrs  M1991 240 mm MRL, 22 tubes                   a cab-over 6x6 off the MCIA drawing, a 7-8-7 pack
     kpa_e80_ifv   VTT-323 (M-1973)                             off the MCIA drawing; the Type 63's hull idiom
     kpa_e90_ifv   VTT-323, as kpa_e80_ifv
     kpa_e80_spg   M-1978 Koksan 170 mm                         ru_t54.js's T-54A hull and running gear, open mount
     kpa_e90_spg   M-1989 Koksan 170 mm                         the M-1978's mount on a longer hull (weakly founded)
     kpa_e00_spg   M-1989 Koksan, as kpa_e90_spg
     kpa_e60_spg   M1974 152 mm on the Tokchon hull             off one 3/4 parade photograph (weakly founded)
   NOT built: kpa_e00_mlrs (KN-09 300 mm).  No free photograph or drawing of it was found; en.wikipedia gives only
   "6x6", "armored louvers to protect the windshield" and "two pods of four rockets" (and a 12-tube ZIL-135 8x8
   from 2020), which leaves the truck, the pods' length and the layout to invention.  It keeps its generic model.

   References (Wikimedia Commons at width 960 unless noted; cached in scratchpad/q_kpa_art_ref):
     [HB]  "North Korea Country Handbook", Marine Corps Intelligence Activity, May 1997 (MCIA-2630-NK-016-97; also on
           Commons as "MarinesDPRKCountryHandbook.pdf"), the equipment annex: A-8 VTT-323 (text and line drawing),
           A-34 "152mm SP gun-howitzer M-1974" in the KPA inventory, A-41 M-1978 (KOKSAN) (text and a 3/4 drawing,
           "probably mounted on a T-54 chasis"), A-42 BM-21 "mounted on a URAL 375D (6x6) truck", A-43 BM-11 "mounted
           on URAL-375D or Japanese truck", A-45 the 240 mm M-1985 and M-1991 (text only: "the 12 round M-1985 ...
           2 rows of 6 tubes ... mounted on a cab behind engine chassis.  The M-1991 is mounted on a cab over engine
           chassis"; "LINE DIAGRAM UNAVAILABLE").
     [HBV] the A-8 drawing, side and front at one scale, rendered at 400 dpi (also Commons "VTT 323.jpg"): five road
           wheels, front sprocket, rear idler, no return rollers, the bins over the track, the upper sides leaning in,
           the low cone turret just behind mid hull, the AT-3 over the roof ahead of it, two oval ports and a hand rail
           on the side, the long roof hatch, the slotted panel at the rear of the side, the glacis to a sharp nose.
     [V1]  "VTT-323 Sinhung - North Korea Victory Day-2013 01.jpg" (Sinhung with a breve in the title): the hull and
           running gear of the 107 mm MRL variant of the VTT-323, front left: the dished road wheels, front sprocket,
           bins, the glacis and nose (its MRL and twin AA gun are the variant's and are not drawn).
     [K1]  "SPG M-1978 KOKSAN.JPG" - an M-1978 in Iraq, near side-on from the right, from far off (wheels round):
           measured, 59.8 px a metre from the T-54's 0.88 m wheel pitch (three pitches 158 px; the front gap then reads
           1.10 m, as on the T-54).  (en.wikipedia's "Koksan being towed by a M88-tank.jpg" calls a vehicle at the
           same site a 180 mm variant; [K1]'s brake and barrel are not checked against the 170 mm: NOT CONFIRMED.)
     [K2]  "M-1978 Koksan.jpg" - an Iranian 170 mm on a trailer, right side 3/4: the travel lock as an upright post
           with lightening holes on the nose, the rails round the rear platform, the spades folded up at the rear.
           Wide-angle and close: not measured.
     [K3]  "M-1978 Koksan in Iran-Iraq War.jpg" - the post with its two oval holes and the clamp, the rear platform.
     [K4]  "170mm M1989 Koksan - North Korea Victory Day-2013 01.jpg" - M-1989 front left 3/4 (not measurable);
           [K5] "... 02.jpg" the breech and the jacket close up.
     [M74] "152mm M1974 Tokch'on - North Korea Victory Day-2013 01.jpg" (diacritics in the title) - front left 3/4.
     [M91] "240MM rocket launcher M-1991.jpg" - the MCIA line drawing of the M-1991, side, pack raised: measured.
     The BM-21 / Ural-375D references are ru_bm14_bm21.js's ([D] [L] [F] [S2] [P] [Rr] [M] [Si] [Fi]; see there).

   Published figures, and each build against them (L x W x H, metres, as dumped):
     Type 75 (kpa_e60_mlrs): no KPA figure.  BM-21 (ru.wikipedia) 7.35 x 2.40 x 3.09.  Built 7.40 x 2.74 x 3.08 (the
       2.74 is the mirrors, as in ru_bm14_bm21.js).
     M1985 (kpa_e80_mlrs): none (12 tubes, 2 rows of 6 [HB]).  Built 7.80 x 2.74 x 2.90.
     M1991 (kpa_e90_mlrs): none (22 tubes [HB]).  Built 8.03 x 2.96 (mirrors) x 2.64.
     VTT-323 (kpa_e80/e90_ifv): none found.  Type 63 (en.wikipedia) 5.476 x 2.978 x 2.58.  Built 6.74 x 3.01 x 2.94
       (2.43 to the turret roof, 2.94 to the AT-3's fins; 6.62 m plate to plate).
     M-1978 (kpa_e80_spg): en.wikipedia (after Foss 2011): 14.9 x 3.27 x 3.1 m, 40 t.  Built about 12.3 x 3.30 x 3.7.
       DISAGREEMENT, settled from [K1]: at one station (the wheels and the gun in the same side-on view, 59.8 px a
       metre) the muzzle stands 6.74 m ahead of the first road wheel (403 px), 8.61 m ahead of mid hull, and the
       folded spades end 3.77 m behind it: 12.4 m overall, not 14.9.  The barrel so measured (muzzle to the breech
       at about X -2.1) is 10.7 m, 63 calibres of 170 mm, in line with the L/66 en.wikipedia gives, so the photograph
       is not short-barrelled.  The 14.9 m figure is not drawn.  Height: [K1] puts the folded spades' tips 3.68 m up
       and the recoil cylinders' tops 3.0 m; the published 3.1 m matches the mount, not the spades.  Drawn as
       measured (the spades are not shortened to fit).  Width 3.30 over the T-54's fenders (published 3.27).
     M-1989 (kpa_e90/e00_spg): none.  Built 11.6 x 3.24 x 3.23.
     M1974 (kpa_e60_spg): none.  ATS-59 (en.wikipedia) length 6.28, height 2.3 (cab).  Built 7.08 x 2.94 x 3.01.

   Recognition lists:
     VTT-323: 1. five big tyred road wheels, front sprocket, rear idler [HBV][V1]; 2. bins along the whole fender [HBV][V1];
       3. upper sides leaning in to a flat roof, glacis to a sharp nose [HBV]; 4. the low cone turret behind mid hull,
       twin 14.5 mm [HBV][HB]; 5. the AT-3 rail over its front [HBV][HB]; 6. ports and hand rail on the side [HBV].
     M-1978: 1. T-54 running gear: five starfish wheels, the wide first gap, rear sprocket [K1]; 2. the very long
       barrel forward with the multi-slotted brake, carried in the post on the nose [K1][K2][K3]; 3. the open mount on
       the rear deck: cheeks, breech, the two recoil cylinders over the jacket, the equilibrators [K1][K5]; 4. the
       spades folded up behind, leaning forward [K1][K2]; 5. the rear platform and its hand rails [K1][K2][K3].
     M1991: cab-over 6x6, the box behind the cab, the flat deck with two lockers, the 22-tube pack lying fore and aft
       from a trunnion at the rear [M91].   M1985: the Ural-375D (stand-in), a 2 x 6 pack [HB].
     M1974: five road wheels, front sprocket, the low cab under the sloping nose, the tall open-topped casemate, the
       152 mm with its double-baffle brake over the cab [M74].
     M-1989: the long glacis, the armoured cab under the gun, the M-1978 mount at the rear [K4].
   Paint: plain KPA green, one coat; sampled [M74] casemate side in sun #5e6143, shade #4c4e3b; drawn #50553a (about
     0.85 of the lit sample).  The parade vehicles wear a three-colour pattern and white numbers and slogans: NOT drawn.
     No national markings, no numbers, no slogans.  Team colour: a few small strips (roof, fenders, pack top).

   NOT CONFIRMED (judgement, not measured or published):
     - Type 75: the designation, and that the KPA's own Grad copies use the Ural-375D ([HB] puts the BM-21 on it; the
       BM-11 copy on "URAL-375D or Japanese truck").  The Ural-375D and the 2B5 pack are the BM-21's, unchanged.
     - M1985: the truck (no photograph: the Ural-375D stands in), the mount, the pack's station and height, and its
       tube length (taken from [M91]); no sight, handwheel or jacks are drawn because none is shown anywhere.
     - M1991: the scale (from the tyre taken as 1.12 m), the tube layout 7-8-7 (the count 22 is published; a 0.76 m
       deep pack holds three staggered rows), the width (2.44 m over the cab), the item behind the cab, the launch
       elevation userData.el 35 deg (the drawing shows the pack only 11 deg up; 35 is the BM-21's picture value).
     - VTT-323: its width (the Type 63's 2.978 m used to scale [HBV]), so all its sizes; the rear door (the Type 63's;
       [HBV] shows only a lamp box on the rear plate); the AT-3 on a turret bracket (the drawing shows the round
       ahead of the turret, its mount not resolved); the headlamps and trim vane (the Type 63's).
     - M-1978: the spades' spacing across and blade shape; the carriage's width; the recoil cylinders drawn one over
       the other as [K1] shows them; the travel lock's lean (from [K1]; [K2][K3] show it upright).
     - M-1989: nearly everything below the mount: hull length 7.0 m, six road wheels with the wider front gap (from
       the en.wikipedia text, not counted), the front sprocket, the cab's size, the deck height 1.50 m; no spades
       are drawn (none photographed on it).
     - M1974: hull length (the ATS-59's 6.28 m assumed), the road wheel (0.70 m assumed; the heights follow from it),
       the casemate's height 2.95 m, the gun's length (4.2 m, the D-20's barrel per [HB]'s "152mm"); the row's own
       name says 122 mm, [HB] says 152 mm, [M74]'s title says 152 mm: a 152 mm is drawn.

   Engine positions (js/damage3d.js ENGINE_AT, not edited): kpa_e80_spg "rear" agrees (T-54 hull).  kpa_e90_spg and
     kpa_e00_spg (M-1989) and kpa_e60_spg (M1974) are not listed, so they burn at the front by role; the AT-S and
     ATS-59 tractors carry the engine forward, under or behind the cab, so that is likely right but NOT CONFIRMED for
     the North Korean hulls.  The VTT-323 (Type 63 layout: engine front right) and the trucks: front, by role, agree.

   Mechanisms: every row has a "turret" group (origin on the ring; the gun or the pack along +X).  Launchers: "turret"
   holds "podelev" (origin on the rear trunnion), userData.el (35 deg) and userData.cells ([mouth x, y, z, tail x] in
   the group's frame: 40 Grad, 12 M1985, 22 M1991).  No launcher here names its round (no "ord").  "roadwheel": one
   group per axle (trucks: one per wheel, as ru_bm14_bm21.js; tracked: one per station holding both sides).
   Model space: +X nose, +Y left (port), +Z up, metres, ground at z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaRockets = (function () {
  "use strict";
  /* ---- copied from js/hero/ru_bm14_bm21.js (HeroRuBm): the geometry kit and the paint texture, unchanged ---- */
  var TAU = Math.PI * 2;

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
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
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
  /* a convex side profile [x, z] extruded across y0..y1 */
  function profY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
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
  /* a side-view polyline [x, z] made into a plate across y0..y1, t thick below the line (a mudguard arch) */
  function ribbon(bin, pts, y0, y1, t) {
    var i, a, b, dx, dz, L, nx, nz;
    for (i = 0; i < pts.length - 1; i++) {
      a = pts[i]; b = pts[i + 1]; dx = b[0] - a[0]; dz = b[1] - a[1]; L = Math.sqrt(dx * dx + dz * dz) || 1;
      nx = -dz / L * t; nz = dx / L * t;
      profY(bin, [[a[0], a[1]], [b[0], b[1]], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]], y0, y1);
    }
  }
  /* a side-face box on the +y (s > 0) or -y face at |y| = yf, standing d proud of it */
  function sideBox(bin, s, yf, d, x0, x1, z0, z1) { box(bin, x0, x1, s * yf, s * (yf + d), z0, z1); }

  var _tex = {};
  /* one flat coat, weathered: low-contrast drift, rain streaks running down, dust and scuffs.
     The painted bin carries metre UVs (0.34 a metre), so the 256 px tile spans about 2.9 m and repeats. */
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd, h;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* streaks: thin, long, faint - the texture's v runs with z on the sides */
      for (i = 0; i < 40; i++) {
        x = R() * 256; h = 20 + R() * 70; y = R() * 256;
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.07)" : "rgba(170,160,130,0.06)";
        q.fillRect(x, y, 1 + R() * 2, h);
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.06)" : "rgba(235,228,200,0.045)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 24, 2 + R() * 12);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  /* ------------------------------------------------------------ the rows this module draws
     KPA green, one flat coat (parade vehicles wear a three-colour pattern: not drawn).  Sampled
     [M74] casemate side in sun #5e6143, shade #4c4e3b; drawn about 0.85 of the lit sample. */
  var KPA_PAINT = { base: "#50553a", blots: ["#4a4f35", "#575c40", "#4d5237"], seed: 31975 };
  var ROWS = {
    kpa_e60_mlrs: { veh: "grad",  paint: KPA_PAINT },
    kpa_e80_mlrs: { veh: "m1985", paint: { base: "#50553a", blots: ["#4a4f35", "#575c40", "#4d5237"], seed: 31985 } },
    kpa_e90_mlrs: { veh: "m1991", paint: { base: "#50553a", blots: ["#4a4f35", "#575c40", "#4d5237"], seed: 31991 } }
  };

  /* ---- copied from js/hero/ru_bm14_bm21.js: materials, tyres, wheels, bands, bonnet loft, the elevating group, the
     Ural-375D and the 2B5 mount and 40-tube pack (the BM-21), unchanged ---- */
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25262a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.95, metalness: 0.02 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, tyres) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
    if (tyres) b.tyre = new Bin(T.tyre, false);
    return b;
  }
  function geoOf(THREE, bin) {
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(bin.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(bin.N), 3));
    return geo;
  }

  /* a cross-country tyre on its disc wheel, axle along local Y: lug blocks staggered across the crown, the dished
     disc with hub and nut ring on the one face that shows (face +1 or -1 on local Y; 0 for none: the inner twin).
     xf maps a local point into place (the Ural's spare stands with its axle along X). */
  function tyre(bin, R, W, nl, xf, face) {
    var h = W / 2, P = [[-h, R * 0.64, 0, 0], [-h, R * 0.86, 0, 0], [-h * 0.84, R * 0.97, 1, 0], [-h * 0.34, R, 1, 0], [-h * 0.04, R, 1, 1],
                        [h * 0.04, R, 1, 0], [h * 0.34, R, 1, 1], [h * 0.84, R * 0.97, 1, 1], [h, R * 0.86, 0, 0], [h, R * 0.64, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = P.length, d = R * 0.06;
    for (i = 0; i < m; i++) for (j = 0; j < nl; j++) {
      r = P[i][1];
      if (P[i][2] && ((j + P[i][3]) % 2)) r -= d;
      a = j / nl * TAU;
      V.push(xf([r * Math.cos(a), P[i][0], r * Math.sin(a)]));
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < nl; j++) {
      k = (j + 1) % nl;
      F.push([i * nl + j, i * nl + k, (i + 1) * nl + k], [i * nl + j, (i + 1) * nl + k, (i + 1) * nl + j]);
    }
    V.push(xf([0, P[0][0], 0]), xf([0, P[m - 1][0], 0]));
    for (j = 0; j < nl; j++) { k = (j + 1) % nl; F.push([m * nl, k, j], [m * nl + 1, (m - 1) * nl + j, (m - 1) * nl + k]); }
    solid(bin, V, F, true);
    for (k = -1; k <= 1; k += 2) {
      if (k !== face) continue;                      /* only the face that shows */
      cyl(bin, xf([0, k * (h - 0.03), 0]), xf([0, k * (h + 0.005), 0]), R * 0.63, R * 0.56, 16, true, false);   /* dished disc */
      cyl(bin, xf([0, k * (h + 0.005), 0]), xf([0, k * (h + 0.06), 0]), R * 0.24, R * 0.20, 10);              /* hub */
      for (j = 0; j < 8; j++) {
        a = j / 8 * TAU;
        cyl(bin, xf([R * 0.36 * Math.cos(a), k * (h + 0.005), R * 0.36 * Math.sin(a)]),
                 xf([R * 0.36 * Math.cos(a), k * (h + 0.03), R * 0.36 * Math.sin(a)]), 0.022, 0.022, 4);
      }
    }
  }
  function local(p) { return p; }
  /* six "roadwheel" groups; dual: the tyres twinned on the bogie axles (ZiS-151) */
  function addWheels(THREE, g, T, AX, TYs, R, W, nl, dual) {
    var i, s, wg, wm, single = new Bin(T.tyre, false), twin = new Bin(T.tyre, false), gs, gt;
    tyre(single, R, W, nl, local, 1);
    gs = geoOf(THREE, single);
    if (dual) {
      tyre(twin, R, W, nl, function (p) { return [p[0], p[1] + dual, p[2]]; }, 1);
      tyre(twin, R, W, nl, function (p) { return [p[0], p[1] - dual, p[2]]; }, 0);
      gt = geoOf(THREE, twin);
    }
    for (i = 0; i < AX.length; i++) for (s = -1; s <= 1; s += 2) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * TYs[i], R);
      wm = new THREE.Mesh(dual && i > 0 ? gt : gs, T.tyre);
      if (s < 0) wm.rotation.z = Math.PI;
      wg.add(wm);
      g.add(wg);
    }
  }
  /* a rectangular band round a tube pack at x (depth dx): half width hw, from z0 to z1, t thick */
  function band(bin, x, dx, hw, z0, z1, t) {
    box(bin, x, x + dx, -hw - t, hw + t, z1, z1 + t);
    box(bin, x, x + dx, -hw - t, hw + t, z0 - t, z0);
    box(bin, x, x + dx, hw, hw + t, z0, z1);
    box(bin, x, x + dx, -hw - t, -hw, z0, z1);
  }
  /* hood loft: rings at stations [x, half width, crown], from zb up; rounded shoulders */
  function hood(bin, st, zb, sh) {
    var rings = [], i, x, w, h;
    for (i = 0; i < st.length; i++) {
      x = st[i][0]; w = st[i][1]; h = st[i][2];
      rings.push([[x, w, zb], [x, w, h - sh], [x, w * 0.93, h - sh * 0.38], [x, w * 0.62, h - 0.01], [x, 0, h],
                  [x, -w * 0.62, h - 0.01], [x, -w * 0.93, h - sh * 0.38], [x, -w, h - sh], [x, -w, zb]]);
    }
    loft(bin, rings, true);
  }
  /* the launcher's elevating group, hinged on the trunnion at (px, pz) of the mount */
  function elevGroup(THREE, EB, px, pz, el, cells) {
    var e = new THREE.Group();
    flush(THREE, e, EB);
    e.name = "podelev";
    e.position.set(px, 0, pz);
    e.userData.el = el;
    e.userData.cells = cells;
    return e;
  }

  /* ===================================================================== BM-21 Grad (2B5) on the Ural-375D
     Stations off the Mick Bell 1/76 drawing [D] (58.5 px a metre over the published 7.35 m length; x measured back
     from the bumper face, model X = 3.675 - x) and the published wheelbase 3525 + 1400 and track 2000. */
  var UR = { XN: 3.675, XT: -3.675, AX: [2.405, -1.12, -2.52], R: 0.60, W: 0.37, TY: 1.0 };
  var G_TX = -1.62, G_TZ = 1.36;                     /* the turntable ("turret") on the launcher deck */
  var G_PVX = -1.42, G_PVZ = 0.86;                   /* the trunnion at the rear of the mount (X -3.04, Z 2.22) */
  var G_XTL = -0.58, G_XMO = 2.42;                   /* tube tails and mouths from the trunnion: 3.0 m tubes */
  var G_P = 0.158, G_RZ = 0.165, G_R = 0.068, G_Z0 = 0.265;   /* column pitch, row pitch, tube radius, bottom row */
  var G_EL = 35 * Math.PI / 180;

  function ural(B) {
    var s, k, x, y, yo, yi;
    var XN = UR.XN, AX = UR.AX;
    /* chassis: frame rails, axles, axle housings, leaf springs */
    box(B.dark, -3.60, 3.45, -0.46, 0.46, 0.78, 1.02);
    for (k = 0; k < 3; k++) {
      cylY(B.dark, AX[k], -0.90, 0.90, UR.R, 0.09, 8);
      box(B.dark, AX[k] - 0.20, AX[k] + 0.20, -0.32, 0.32, 0.46, 0.76);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, AX[0] - 0.70, AX[0] + 0.70, s * 0.46, s * 0.58, 0.72, 0.80);
      box(B.dark, AX[2] - 0.30, AX[1] + 0.30, s * 0.46, s * 0.60, 0.70, 0.80);
      cylY(B.dark, (AX[1] + AX[2]) / 2, s * 0.40, s * 0.70, 0.86, 0.12, 10);       /* bogie trunnion */
    }
    /* front bumper: the deep plate the photographs show, tow hooks on its top */
    box(B.dark, 3.43, XN, -1.20, 1.20, 0.80, 1.10);
    box(B.dark, 3.40, 3.43, -1.10, 1.10, 0.84, 1.06);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.52, 3.64, s * 0.55 - 0.05, s * 0.55 + 0.05, 1.10, 1.17);
      box(B.dark, 3.60, 3.65, s * 0.55 - 0.05, s * 0.55 + 0.05, 1.10, 1.22);
    }
    /* radiator housing and grille: dark field, eleven vertical bars, frame */
    box(B.paint, 3.05, 3.40, -0.50, 0.50, 0.95, 1.45);
    box(B.dark, 3.40, 3.43, -0.44, 0.44, 1.00, 1.68);
    for (k = 0; k < 11; k++) { y = -0.40 + k * 0.08; box(B.paint, 3.41, 3.46, y - 0.016, y + 0.016, 1.02, 1.66); }
    box(B.paint, 3.40, 3.47, -0.48, 0.48, 1.66, 1.72);
    box(B.paint, 3.40, 3.47, -0.48, 0.48, 0.96, 1.02);
    for (s = -1; s <= 1; s += 2) box(B.paint, 3.40, 3.47, s * 0.44, s * 0.48, 0.96, 1.72);
    /* bonnet: lofted from the drawing's side and plan, narrowing to the grille, crowned */
    hood(B.paint, [[3.42, 0.50, 1.73], [3.30, 0.55, 1.81], [3.05, 0.64, 1.90], [2.70, 0.74, 1.96], [2.35, 0.82, 1.99], [2.03, 0.88, 2.02]], 1.43, 0.16);
    box(B.dark, 2.10, 3.30, -0.015, 0.015, 1.995, 2.025);                              /* the bonnet's centre seam */
    for (s = -1; s <= 1; s += 2) {
      /* the louvre strip on the bonnet side: eight oval vents in a recessed panel [D] */
      for (k = 0; k < 8; k++) {
        x = 3.02 - k * 0.095;
        yo = 0.62 + (3.05 - x) * 0.25;
        box(B.dark, x - 0.035, x + 0.035, s * yo - 0.012, s * yo + 0.012, 1.56, 1.66);
      }
      /* the front wing: flat-topped, sweeping down behind the wheel [D][L] */
      yo = s > 0 ? [0.50, 1.20] : [-1.20, -0.50];
      ribbon(B.paint, [[1.62, 0.78], [1.68, 0.98], [1.86, 1.22], [2.10, 1.40], [2.40, 1.47], [3.42, 1.46]], yo[0], yo[1], 0.045);
      box(B.paint, 2.25, 3.42, s * 1.17, s * 1.21, 1.34, 1.47);                         /* rolled wing edge */
      box(B.paint, 3.30, 3.42, yo[0], yo[1], 1.00, 1.46);                               /* the wing's front face */
      cylX(B.dark, 3.42, 3.48, s * 0.80, 1.22, 0.125, 14);                             /* headlamp */
      cylX(B.glass, 3.48, 3.49, s * 0.80, 1.22, 0.10, 14);
      cylX(B.dark, 3.42, 3.46, s * 1.05, 1.24, 0.055, 8);                              /* sidelight */
      cylX(B.glass, 3.46, 3.47, s * 1.05, 1.24, 0.045, 8);
      box(B.dark, 3.20, 3.30, yo[0] + 0.04, yo[1] - 0.06, 0.95, 1.00);
    }
    /* the all-metal 375D cab (from 1964): door, window, the raked two-pane windscreen, roof peak */
    profY(B.paint, [[0.795, 1.05], [1.70, 1.05], [2.03, 1.55], [2.03, 2.02], [1.93, 2.60], [1.86, 2.68], [0.86, 2.68], [0.795, 2.60]], -1.0, 1.0);
    box(B.paint, 0.88, 1.84, -0.92, 0.92, 2.68, 2.705);
    box(B.paint, 1.84, 1.98, -0.98, 0.98, 2.62, 2.69);                                   /* roof peak */
    var U = unit([-0.10, 0, 0.58]), N = unit([0.58, 0, 0.10]), P0 = [2.03, 0, 2.02];
    planeBox(B.dark, P0, U, [0, 1, 0], N, 0.03, 0.56, -0.96, 0.96, 0, 0.012);
    planeBox(B.glass, P0, U, [0, 1, 0], N, 0.06, 0.53, 0.04, 0.92, 0.012, 0.02);
    planeBox(B.glass, P0, U, [0, 1, 0], N, 0.06, 0.53, -0.92, -0.04, 0.012, 0.02);
    box(B.paint, 2.03, 2.06, -1.0, 1.0, 1.96, 2.03);                                     /* cowl lip */
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.glass, s, 1.0, 0.008, 1.08, 1.70, 2.02, 2.52);                         /* door window */
      sideBox(B.dark, s, 1.0, 0.006, 1.72, 1.745, 1.08, 2.58);                         /* door seams */
      sideBox(B.dark, s, 1.0, 0.006, 0.86, 0.885, 1.08, 2.58);
      sideBox(B.dark, s, 1.0, 0.006, 0.885, 1.72, 1.97, 1.99);
      sideBox(B.dark, s, 1.0, 0.03, 0.96, 1.10, 1.83, 1.87);                           /* handle */
      box(B.dark, 0.95, 1.55, s * 1.0, s * 1.15, 0.70, 0.75);                           /* step */
      box(B.dark, 1.00, 1.04, s * 1.0, s * 1.10, 0.75, 1.05);
      bar(B.dark, [1.98, s * 0.98, 2.30], [2.06, s * 1.24, 2.44], 0.03);                 /* mirror arm */
      cylX(B.dark, 2.04, 2.08, s * 1.26, 2.44, 0.11, 12);                                /* round mirror */
    }
    box(B.glass, 0.785, 0.795, -0.45, 0.45, 2.10, 2.42);                                /* rear window */
    /* the air-intake pipe up the starboard windscreen pillar, mushroom head over the roof [F][L][D] */
    cylZ(B.paint, 2.00, -1.04, 1.90, 2.76, 0.075, 10);
    cyl(B.paint, [2.00, -1.04, 1.90], [2.16, -0.86, 1.82], 0.075, 0.075, 10);
    cyl(B.dark, [2.00, -1.04, 2.76], [2.00, -1.04, 2.86], 0.12, 0.12, 12);
    box(B.dark, 1.96, 2.04, -1.08, -1.0, 2.30, 2.34);
    /* behind the cab: the spare upright on the starboard side, axle fore-and-aft [D][Rr]; the locker to port [M] */
    tyre(B.tyre, UR.R, UR.W, 24, function (p) { return [0.50 + p[1], -0.58 + p[0], 1.70 + p[2]]; }, -1);
    for (k = 0; k < 2; k++) box(B.dark, 0.26, 0.30, -0.98 + k * 0.76, -0.94 + k * 0.76, 1.30, 2.10);
    box(B.dark, 0.26, 0.30, -0.98, -0.18, 1.66, 1.72);
    box(B.paint, 0.18, 0.72, 0.12, 0.95, 1.36, 1.84);
    box(B.dark, 0.17, 0.73, 0.11, 0.96, 1.78, 1.80);
    box(B.dark, 0.30, 0.42, 0.955, 0.965, 1.62, 1.70);
    /* the fuel tank under the cab back, port [M] */
    box(B.paint, -0.50, 0.72, 0.62, 1.12, 0.56, 1.12);
    for (k = 0; k < 2; k++) box(B.dark, -0.20 + k * 0.62, -0.15 + k * 0.62, 0.61, 1.13, 0.55, 1.13);
    cylZ(B.dark, 0.55, 0.95, 1.12, 1.17, 0.05, 8);
    box(B.dark, -0.50, 0.72, 0.46, 0.62, 0.80, 0.86);
    /* the launcher deck over the bogie, its channel edges, the mudguards below: flat-topped, rounded both ends,
       fluted over the front sweep [Si][Rr] */
    box(B.paint, -3.62, 0.20, -0.74, 0.74, 1.24, G_TZ);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.62, 0.20, s * 0.74, s * 0.78, 1.20, 1.34);
      yo = s > 0 ? [0.78, 1.22] : [-1.22, -0.78];
      ribbon(B.paint, [[-3.66, 0.80], [-3.66, 1.06], [-3.56, 1.20], [-3.36, 1.26], [-0.80, 1.26], [-0.56, 1.18], [-0.43, 1.00], [-0.38, 0.80]], yo[0], yo[1], 0.04);
      for (k = 0; k < 6; k++) {
        yi = s * (0.84 + k * 0.065);
        bar(B.paint, [-1.30, yi, 1.27], [-0.80, yi, 1.27], 0.025);
        bar(B.paint, [-0.80, yi, 1.27], [-0.56, yi, 1.19], 0.025);
        bar(B.paint, [-0.56, yi, 1.19], [-0.43, yi, 1.01], 0.025);
      }
      box(B.dark, -3.70, -3.66, s * 0.90 - 0.08, s * 0.90 + 0.08, 0.92, 1.04);         /* tail lamps */
      box(B.glass, -3.71, -3.70, s * 0.90 - 0.06, s * 0.90 + 0.06, 0.94, 1.02);
      box(B.dark, -3.62, -3.58, yo[0] + 0.04, yo[1] - 0.04, 0.35, 0.80);                /* mud flap */
    }
    /* rear cross-member and the tow hook */
    box(B.dark, -3.675, -3.55, -0.95, 0.95, 0.88, 1.18);
    cylX(B.dark, -3.68, -3.60, 0, 0.98, 0.07, 10);
    box(B.dark, -3.72, -3.68, -0.05, 0.05, 0.90, 1.08);
  }

  /* the 2B5 mount: the turntable on the deck, the base housing, the trunnion cheeks at its rear; the handwheel on the
     starboard side [Rr], the panoramic sight on the port side [Si] */
  function gradMount(B) {
    var s;
    cylZ(B.dark, 0, 0, 0, 0.08, 0.80, 24);
    profY(B.paint, [[-1.50, 0.08], [0.70, 0.08], [0.92, 0.22], [0.92, 0.38], [-1.50, 0.38]], -0.56, 0.56);
    box(B.dark, -1.50, 0.92, -0.57, 0.57, 0.36, 0.38);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, G_PVX - 0.22, G_PVX + 0.24, s * 0.60, s * 0.68, 0.08, G_PVZ + 0.12);
      cylY(B.dark, G_PVX, s * 0.56, s * 0.72, G_PVZ, 0.10, 12);
      box(B.dark, -0.90, 0.40, s * 0.56, s * 0.575, 0.14, 0.34);
    }
    /* starboard: the laying gearbox and its handwheel */
    box(B.dark, -0.30, 0.10, -0.86, -0.72, 0.30, 0.62);
    cylY(B.dark, -0.10, -0.94, -0.86, 0.50, 0.15, 14);
    cylY(B.paint, -0.10, -0.95, -0.94, 0.50, 0.04, 8);
    /* port: the sight bracket, the panoramic sight on its post */
    box(B.dark, -0.50, -0.30, 0.72, 0.92, 0.30, 0.46);
    cylZ(B.dark, -0.40, 0.84, 0.46, 0.86, 0.05, 8);
    box(B.dark, -0.50, -0.28, 0.76, 0.92, 0.86, 1.02);
    cylX(B.dark, -0.28, -0.20, 0.84, 0.94, 0.04, 8);
  }

  /* the 40-tube pack, "podelev", origin on the trunnion: four rows of ten 122 mm tubes [Rr][P], the tails in the
     box frame at the rear with the slot in its side plate [Rr], the clamp bands, the cradle's side plates
     tapering forward [M], the sector gears under the cradle */
  function gradPack(B, cells) {
    var i, j, k, y, z, s, zt = G_Z0 + 3 * G_RZ + G_R, zb = G_Z0 - G_R, hw = 4.5 * G_P + G_R, a, pts;
    for (j = 0; j < 4; j++) for (i = 0; i < 10; i++) {
      y = (i - 4.5) * G_P; z = G_Z0 + j * G_RZ;
      cylX(B.paint, G_XTL + 0.01, G_XMO - 0.035, y, z, G_R, 10);
      cyl(B.paint, [G_XMO - 0.035, y, z], [G_XMO, y, z], G_R + 0.006, G_R + 0.006, 10, false, true);
      cylX(B.dark, G_XMO - 0.05, G_XMO - 0.04, y, z, G_R - 0.004, 8);                 /* the bore at the mouth */
      cylX(B.dark, G_XTL, G_XTL + 0.012, y, z, G_R - 0.006, 8);                       /* and at the tail */
      cells.push([G_XMO + 0.05, y, z, G_XTL]);
    }
    /* tail box frame, its rear-face grid between the tubes, the slot in each side plate */
    box(B.paint, G_XTL, G_XTL + 0.30, -hw - 0.04, hw + 0.04, zt, zt + 0.035);
    box(B.paint, G_XTL, G_XTL + 0.30, -hw - 0.04, hw + 0.04, zb - 0.035, zb);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, G_XTL, G_XTL + 0.30, s * hw, s * (hw + 0.04), zb - 0.035, zt + 0.035);
      sideBox(B.dark, s, hw + 0.04, 0.004, G_XTL + 0.10, G_XTL + 0.20, G_Z0 + 0.20, G_Z0 + 0.36);
    }
    for (j = 0; j < 3; j++) box(B.paint, G_XTL - 0.005, G_XTL + 0.02, -hw, hw, G_Z0 + (j + 0.5) * G_RZ - 0.012, G_Z0 + (j + 0.5) * G_RZ + 0.012);
    for (i = 0; i < 9; i++) box(B.paint, G_XTL - 0.005, G_XTL + 0.02, (i - 4) * G_P - 0.008, (i - 4) * G_P + 0.008, zb, zt);
    /* clamp bands: behind the mouths and at mid length */
    band(B.paint, 1.98, 0.06, hw, zb, zt, 0.025);
    band(B.paint, 0.80, 0.06, hw, zb, zt, 0.025);
    /* cradle: the beam under the pack, the side plates tapering forward from the tail frame */
    box(B.paint, -0.30, 1.90, -0.34, 0.34, -0.18, zb);
    box(B.dark, -0.30, 1.90, -0.35, 0.35, -0.08, -0.05);
    box(B.dark, 1.88, 1.92, -0.32, 0.32, -0.16, zb - 0.02);
    box(B.paint, -0.30, 1.90, -hw, hw, zb - 0.03, zb);
    for (s = -1; s <= 1; s += 2) {
      pts = [[G_XTL + 0.30, 0.0], [1.70, 0.10], [1.70, zb + 0.10], [G_XTL + 0.30, zb + 0.22]];
      profY(B.paint, pts, s * (hw + 0.005), s * (hw + 0.035));
      box(B.dark, -0.18, 0.22, s * 0.40, s * 0.54, -0.10, 0.12);                          /* trunnion lugs */
      /* the sector gear, hung under the cradle about the trunnion */
      pts = [[0, 0]];
      for (k = 0; k <= 6; k++) { a = (-100 + k * 10) * Math.PI / 180; pts.push([0.66 * Math.cos(a), 0.66 * Math.sin(a)]); }
      profY(B.dark, pts, s * 0.47, s * 0.52);
    }
    cylY(B.dark, 0, -0.60, 0.60, 0, 0.075, 10);
    /* the one team strip, on top of the pack */
    box(B.team, 1.10, 1.85, -0.30, 0.30, zt + 0.002, zt + 0.02);
  }

  function buildBM21(THREE, C, R) {
    var T = materials(THREE, C, R.paint), g = new THREE.Group(), HB = bins(T, true);
    ural(HB);
    flush(THREE, g, HB);
    addWheels(THREE, g, T, UR.AX, [UR.TY, UR.TY, UR.TY], UR.R, UR.W, 24, 0);
    var tur = new THREE.Group(), MB = bins(T, false), EB = bins(T, false), cells = [];
    gradMount(MB);
    flush(THREE, tur, MB);
    gradPack(EB, cells);
    tur.add(elevGroup(THREE, EB, G_PVX, G_PVZ, G_EL, cells));
    tur.name = "turret";
    tur.position.set(G_TX, 0, G_TZ);
    g.add(tur);
    return g;
  }

  /* ===================================================================== the 240 mm launchers
     One pack builder for both: rows of 240 mm tubes, tails at the trunnion end, mouths forward, a box frame round
     the tails, two clamp bands, the cradle beam under it.  Tube: 0.25 m over the wall, column pitch 0.27 m, a
     staggered row 0.225 m above the last.  Tube length 4.87 m, measured off [M91] (the pack's length along its axis,
     339 px at 69.6 px a metre); the M-1985's tube length is taken to be the same (it fires the same 240 mm round:
     NOT CONFIRMED). */
  var R240 = 0.125, P240 = 0.27, RZ240 = 0.225, L240 = 4.87;
  function pack240(B, cells, rows, xt, z0) {
    var i, j, y, z, s, n, nmax = 0, xm = xt + L240, zb = z0 - R240 - 0.01, zt = z0 + (rows.length - 1) * RZ240 + R240 + 0.01, hw;
    for (j = 0; j < rows.length; j++) nmax = Math.max(nmax, rows[j]);
    hw = nmax * P240 / 2 + 0.01;
    for (j = 0; j < rows.length; j++) {
      n = rows[j]; z = z0 + j * RZ240;
      for (i = 0; i < n; i++) {
        y = (i - (n - 1) / 2) * P240;
        cylX(B.paint, xt + 0.01, xm - 0.04, y, z, R240, 12);
        cyl(B.paint, [xm - 0.04, y, z], [xm, y, z], R240 + 0.008, R240 + 0.008, 12, false, true);
        cylX(B.dark, xm - 0.06, xm - 0.05, y, z, R240 - 0.012, 10);                    /* the bore at the mouth */
        cylX(B.dark, xt, xt + 0.012, y, z, R240 - 0.012, 10);                          /* and at the tail */
        cells.push([xm + 0.05, y, z, xt]);
      }
    }
    /* the tail box frame, open at the back */
    box(B.paint, xt, xt + 0.40, -hw - 0.05, hw + 0.05, zt, zt + 0.04);
    box(B.paint, xt, xt + 0.40, -hw - 0.05, hw + 0.05, zb - 0.04, zb);
    for (s = -1; s <= 1; s += 2) box(B.paint, xt, xt + 0.40, s * hw, s * (hw + 0.05), zb - 0.04, zt + 0.04);
    /* clamp bands behind the mouths and at mid length */
    band(B.paint, xm - 0.55, 0.08, hw, zb, zt, 0.03);
    band(B.paint, xt + 2.30, 0.08, hw, zb, zt, 0.03);
    /* the cradle: a beam under the pack, the trunnion lugs, the cross shaft */
    box(B.paint, -0.20, xt + 2.60, -0.36, 0.36, -0.16, zb - 0.04);
    box(B.dark, -0.20, xt + 2.60, -0.37, 0.37, -0.06, -0.03);
    for (s = -1; s <= 1; s += 2) box(B.dark, -0.18, 0.22, s * 0.40, s * 0.54, -0.10, 0.12);
    cylY(B.dark, 0, -0.60, 0.60, 0, 0.075, 10);
    /* the one team strip, on top of the pack */
    box(B.team, xt + 2.80, xt + 3.40, -0.22, 0.22, zt + 0.04, zt + 0.055);
  }
  /* a plain launcher mount: turntable, base, two trunnion cheeks at its rear.  Nothing on it is photographed for
     the KPA launchers: only what any such mount must carry is drawn (no sight, no handwheel). */
  function mount240(B, pvx, pvz, hw) {
    var s, bt = Math.min(0.34, pvz - 0.18);
    cylZ(B.dark, 0, 0, 0, 0.08, 0.80, 24);
    box(B.paint, pvx - 0.25, 0.80, -hw, hw, 0.08, bt);
    box(B.dark, pvx - 0.25, 0.80, -hw - 0.01, hw + 0.01, bt - 0.02, bt);
    for (s = -1; s <= 1; s += 2) {
      profY(B.paint, [[pvx - 0.25, bt - 0.02], [pvx + 0.45, bt - 0.02], [pvx + 0.20, pvz + 0.15], [pvx - 0.20, pvz + 0.15]], s * 0.56, s * 0.66);
      cylY(B.dark, pvx, s * 0.54, s * 0.70, pvz, 0.10, 12);
    }
    /* the elevating ram, from the base up to the cradle beam ahead of the trunnion */
    if (pvz - 0.16 - bt > 0.12) cyl(B.dark, [pvx + 1.30, 0, bt], [pvx + 1.40, 0, pvz - 0.16], 0.07, 0.07, 10);
  }

  /* ---------------------------------------------------------------- M-1985: twelve tubes on the Ural-375D
     [HB] A-45: "the 12 round M-1985 ... has 2 rows of 6 tubes and is mounted on a cab behind engine chassis".  The
     truck is not identified in any source found here: the Ural-375D, which [HB] lists in KPA service under the BM-21
     and the BM-11, stands in for it (a cab-behind-engine 6x6), copied from ru_bm14_bm21.js.  NOT CONFIRMED: the
     truck, the mount's station, the pack's height and length; no photograph of an M-1985 was found. */
  var M85 = { TX: -1.62, TZ: 1.36, PVX: -2.10, PVZ: 0.70, XT: -0.40, Z0: 0.42, EL: 35 * Math.PI / 180 };
  function buildM1985(THREE, C, R) {
    var T = materials(THREE, C, R.paint), g = new THREE.Group(), HB = bins(T, true);
    ural(HB);
    flush(THREE, g, HB);
    addWheels(THREE, g, T, UR.AX, [UR.TY, UR.TY, UR.TY], UR.R, UR.W, 24, 0);
    var tur = new THREE.Group(), MB = bins(T, false), EB = bins(T, false), cells = [];
    mount240(MB, M85.PVX, M85.PVZ, 0.56);
    flush(THREE, tur, MB);
    pack240(EB, cells, [6, 6], M85.XT, M85.Z0);
    /* two rows of six in line, not staggered ([HB] "2 rows of 6") */
    tur.add(elevGroup(THREE, EB, M85.PVX, M85.PVZ, M85.EL, cells));
    tur.name = "turret";
    tur.position.set(M85.TX, 0, M85.TZ);
    g.add(tur);
    return g;
  }

  /* ---------------------------------------------------------------- M-1991: 22 tubes on a cab-over 6x6
     Stations off [M91] (the MCIA line drawing, side view, pack raised): scale 69.6 px a metre from the tyre, taken
     as 1.12 m across (0.56 m radius; NOT published - a cross-country 6x6's size, judgement); model X = (290 - px) /
     69.6, Z = (259 - py) / 69.6.  Bumper 3.85, cab back 2.05, cab roof 2.57; axles 2.53, -0.75, -2.03; deck 1.52 from
     1.48 back to -3.55; the box behind the cab 1.52-1.87; two lockers on the deck; the mount on the deck's rear third,
     the trunnion at its rear (X -3.85, Z 1.80); the pack 4.87 m by 0.76 m deep.  Twenty-two tubes ([HB] A-45) in a
     0.76 m deep pack fit three staggered rows: 7, 8, 7 (the arrangement is NOT CONFIRMED). */
  var M91 = { XN: 3.85, AX: [2.53, -0.75, -2.03], R: 0.56, W: 0.40, TY: 0.98,
              TX: -2.55, TZ: 1.52, PVX: -1.30, PVZ: 0.28, XT: -0.10, Z0: 0.20, EL: 35 * Math.PI / 180 };
  function cabover(B) {
    var s, k, x, AX = M91.AX, XN = M91.XN, yo;
    /* chassis: frame rails 0.76-1.12 [M91], axles, springs */
    box(B.dark, -3.62, 3.70, -0.45, 0.45, 0.76, 1.06);
    for (k = 0; k < 3; k++) {
      cylY(B.dark, AX[k], -0.88, 0.88, M91.R, 0.09, 8);
      box(B.dark, AX[k] - 0.20, AX[k] + 0.20, -0.32, 0.32, 0.42, 0.72);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, AX[0] - 0.70, AX[0] + 0.70, s * 0.45, s * 0.57, 0.70, 0.78);
      box(B.dark, AX[2] - 0.35, AX[1] + 0.35, s * 0.45, s * 0.59, 0.68, 0.78);
      cylY(B.dark, (AX[1] + AX[2]) / 2, s * 0.40, s * 0.70, 0.84, 0.12, 10);
    }
    /* bumper [M91]: 0.63-0.85 */
    box(B.dark, XN - 0.12, XN, -1.22, 1.22, 0.63, 0.85);
    for (s = -1; s <= 1; s += 2) box(B.dark, XN - 0.02, XN + 0.08, s * 0.60 - 0.05, s * 0.60 + 0.05, 0.66, 0.78);
    /* the cab: a tall box over the front axle, the front face nearly upright [M91] */
    profY(B.paint, [[2.05, 0.90], [3.78, 0.90], [3.80, 1.60], [3.74, 2.50], [3.66, 2.57], [2.05, 2.57]], -1.22, 1.22);
    box(B.paint, 2.10, 3.62, -1.16, 1.16, 2.57, 2.60);
    /* windscreen (two panes), the grille panel below it, headlamps at the corners */
    box(B.dark, 3.77, 3.79, -1.12, 1.12, 1.72, 2.42);
    box(B.glass, 3.785, 3.80, 0.04, 1.08, 1.76, 2.38);
    box(B.glass, 3.785, 3.80, -1.08, -0.04, 1.76, 2.38);
    for (k = 0; k < 6; k++) box(B.dark, 3.79, 3.81, -0.55, 0.55, 1.05 + k * 0.08, 1.09 + k * 0.08);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 3.78, 3.84, s * 0.92, 1.12, 0.11, 12);
      cylX(B.glass, 3.84, 3.85, s * 0.92, 1.12, 0.09, 12);
      /* door with its window, handle, the two steps under it [M91] */
      sideBox(B.glass, s, 1.22, 0.008, 2.66, 3.45, 1.60, 2.30);
      sideBox(B.dark, s, 1.22, 0.006, 2.55, 2.57, 0.95, 2.45);
      sideBox(B.dark, s, 1.22, 0.006, 3.62, 3.64, 0.95, 2.45);
      sideBox(B.dark, s, 1.22, 0.03, 2.62, 2.76, 1.45, 1.49);
      box(B.dark, 2.70, 3.30, s * 1.10, s * 1.24, 0.62, 0.66);
      box(B.dark, 2.70, 3.30, s * 1.10, s * 1.24, 0.90, 0.94);
      /* the front mudguard round the wheel, under the cab [M91] */
      yo = s > 0 ? [0.92, 1.24] : [-1.24, -0.92];
      ribbon(B.paint, [[1.95, 0.70], [2.05, 0.98], [2.30, 1.16], [2.75, 1.18], [3.05, 1.08], [3.20, 0.90]], yo[0], yo[1], 0.04);
      /* mirror on its arm */
      bar(B.dark, [3.70, s * 1.22, 2.20], [3.88, s * 1.42, 2.30], 0.03);
      box(B.dark, 3.86, 3.92, s * 1.38, s * 1.48, 2.05, 2.40);
    }
    box(B.glass, 2.04, 2.05, -0.50, 0.50, 1.95, 2.35);                                   /* rear window */
    /* behind the cab [M91]: an upright housing with a round top, starboard; NOT identified (air cleaner?) */
    box(B.paint, 1.52, 1.87, -1.10, -0.70, 1.06, 2.30);
    cylZ(B.paint, 1.70, -0.90, 2.30, 2.56, 0.17, 14);
    cylZ(B.dark, 1.70, -0.90, 2.56, 2.58, 0.15, 14);
    /* the deck: a flat bed with side rails from 1.48 back to -3.55 [M91], two lockers on it */
    box(B.paint, -3.55, 1.48, -1.20, 1.20, 1.40, 1.52);
    for (s = -1; s <= 1; s += 2) box(B.paint, -3.55, 1.48, s * 1.20, s * 1.23, 1.18, 1.52);
    box(B.paint, 0.36, 0.93, -0.90, 0.90, 1.52, 1.86);
    box(B.paint, -0.79, -0.14, -0.90, 0.90, 1.52, 1.86);
    box(B.dark, 0.36, 0.93, -0.91, 0.91, 1.84, 1.86);
    box(B.dark, -0.79, -0.14, -0.91, 0.91, 1.84, 1.86);
    /* tool box under the deck, port, and the battery box behind the cab, starboard [M91] */
    box(B.paint, -3.45, -2.70, 0.80, 1.18, 0.90, 1.12);
    box(B.paint, 1.07, 1.50, -1.18, -0.80, 0.72, 1.06);
    /* rear: cross member, tail-lamp posts [M91], tow hook */
    box(B.dark, -3.62, -3.50, -1.10, 1.10, 0.80, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.70, -3.62, s * 1.00 - 0.05, s * 1.00 + 0.05, 0.85, 1.40);
      box(B.glass, -3.71, -3.70, s * 1.00 - 0.04, s * 1.00 + 0.04, 1.25, 1.35);
    }
    cylX(B.dark, -3.70, -3.62, 0, 0.95, 0.07, 10);
  }
  function buildM1991(THREE, C, R) {
    var T = materials(THREE, C, R.paint), g = new THREE.Group(), HB = bins(T, false);
    cabover(HB);
    flush(THREE, g, HB);
    addWheels(THREE, g, T, M91.AX, [M91.TY, M91.TY, M91.TY], M91.R, M91.W, 24, 0);
    var tur = new THREE.Group(), MB = bins(T, false), EB = bins(T, false), cells = [];
    mount240(MB, M91.PVX, M91.PVZ, 0.62);
    flush(THREE, tur, MB);
    pack240(EB, cells, [7, 8, 7], M91.XT, M91.Z0);
    tur.add(elevGroup(THREE, EB, M91.PVX, M91.PVZ, M91.EL, cells));
    tur.name = "turret";
    tur.position.set(M91.TX, 0, M91.TZ);
    g.add(tur);
    return g;
  }

  function build(key, THREE, M, C) {
    var R = ROWS[key] || ROWS.kpa_e60_mlrs;
    var root = R.veh === "m1985" ? buildM1985(THREE, C, R) : R.veh === "m1991" ? buildM1991(THREE, C, R) : buildBM21(THREE, C, R);
    root.name = key;
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build, rows: ROWS };
})();

var HeroKpaTracked = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---- copied from js/hero/ru_t54.js (HeroT54): the running-gear stations, the geometry kit, materials, the hull
     (station table and addHull), the running gear and the starfish road wheel.  One change, marked KPA COPY: the
     fender stowage is drawn only when the variant sets stow (the Koksan photographs show bare fenders). ---- */

  /* running gear (D1, P1, published track centres): pitch 0.88 m, front gap 1.10 m */
  var TY = 1.32, TW = 0.29;
  var XW = [1.87, 0.77, -0.11, -0.99, -1.87], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.62, z: 0.56, r: 0.29 }, SPR = { x: -2.68, z: 0.66, r: 0.30 };
  var DECK = 1.42, FZ = 1.08, FW = 1.635, HW = 1.00, TX = 0.0;   /* deck, fender, fender edge, hull side, turret x */

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
  /* sc: an optional per-axis scale [sx, sy, sz] applied to the geometry (normals by the
     inverse), for a variant drawn as this model resized (the Type 62) */
  function flush(THREE, group, B, sc) {
    var k, b, geo, i, nx, ny, nz, l;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (sc) {
        for (i = 0; i < b.P.length; i += 3) {
          b.P[i] *= sc[0]; b.P[i + 1] *= sc[1]; b.P[i + 2] *= sc[2];
          nx = b.N[i] / sc[0]; ny = b.N[i + 1] / sc[1]; nz = b.N[i + 2] / sc[2];
          l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          b.N[i] = nx / l; b.N[i + 1] = ny / l; b.N[i + 2] = nz / l;
        }
      }
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

    if (V.stow) {   /* KPA COPY: the T-54A's fender stowage, drawn only when the variant asks for it */
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
    }

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
      if (V.wheel === "spoke") {
        /* the Type 62's spoked wheel (P8, P9): ten spokes over a dark open dish */
        W.col = HOLE;
        cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.262, 0], 0.33, 0.33, 18);
        W.col = RIB;
        for (i = 0; i < 10; i++) {
          a = i / 10 * TAU;
          slab(W, [Math.cos(a) * 0.225, y + s * 0.27, Math.sin(a) * 0.225], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.11, 0.014, 0.026);
        }
        W.col = TYRE;
        cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.11, 12);
        continue;
      }
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

  /* ---- copied from js/hero/pla_type63_apc.js (HeroType63Apc): the convex side-profile prism, unchanged ---- */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }

  /* ======================================================================= shared tracked parts (this file)
     The running gear of pla_type63_apc.js / ru_t54.js made to take its stations as an argument G:
     XW wheel stations, ZW and RW wheel centre height and radius, SPR and IDL sprocket and idler, TY and TW track
     centre and half width, LK the drawn link pitch.  The sprocket's teeth face the way the photographs show. */
  function addRunningG(B, G) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < G.XW.length; i++) C.push([G.XW[i], G.ZW, G.RW + 0.035]);
    C.push([G.IDL.x, G.IDL.z, G.IDL.r + 0.035], [G.SPR.x, G.SPR.z, G.SPR.r + 0.035]);
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
    cnt = Math.round(tot / G.LK); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - G.TW, y + G.TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - G.TW - 0.01, y + G.TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the toothed drive sprocket */
      cylY(B.dark, G.SPR.x, y - 0.12, y + 0.12, G.SPR.z, G.SPR.r - 0.05, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [G.SPR.x + ca * (G.SPR.r - 0.02), y, G.SPR.z + sa * (G.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, G.SPR.x, y + s * 0.12, y + s * 0.17, G.SPR.z, G.SPR.r * 0.55, 14);
      /* the idler */
      cylY(B.paint, G.IDL.x, y - 0.15, y + 0.15, G.IDL.z, G.IDL.r, 18);
      cylY(B.dark, G.IDL.x, y + s * 0.15, y + s * 0.20, G.IDL.z, 0.07, 10);
    }
  }
  /* a road wheel pair on one axle (the Type 63's dished wheel, sized by G.RW): tyre, dished disc, six recesses, hub */
  function addWheelG(W, G, base) {
    var s, y, i, a, r = G.RW, k = r / 0.37, rr = parseInt(base.substr(1, 2), 16) / 255, gg = parseInt(base.substr(3, 2), 16) / 255, bb = parseInt(base.substr(5, 2), 16) / 255;
    var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14], BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y + 0.15, 0, r, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.18, 0], r - 0.055, 0.12 * k, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.20 * k, y + s * 0.168, Math.sin(a) * 0.20 * k], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.06 * k, 0.010, 0.055 * k);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.17, y + s * 0.20, 0, 0.09 * k, 10);
    }
  }
  function wheels(THREE, g, T, G, base) {
    var i, wg, WB;
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheelG(WB, G, base);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.XW[i], 0, G.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
  }

  var KPA_V = { paint: { base: "#50553a", blots: ["#4a4f35", "#575c40", "#4d5237"], seed: 323 }, canvas: "#4a4d36", drums: 0, stow: false };

  /* ======================================================================= VTT-323
     Stations off [HBV], the MCIA line drawing (side and front, one scale): the front view's width over the tracks,
     368 px, taken as the Type 63's published 2.978 m (the VTT-323 is "the North Korean version of the Type A531",
     en.wikipedia; its own width is NOT published in any source found) gives 123.6 px a metre.  Model X = (px - 450)
     / 123.6 (px on the 400 dpi crop), Z = (457 - py) / 123.6.  Check at one station: the drawing's wheel pitch
     comes out 0.97 m against the Type 63's 0.99 m, the wheel 0.81 m against 0.74 m. */
  var VG = { XW: [1.76, 0.77, -0.21, -1.17, -2.14], ZW: 0.40, RW: 0.40, TY: 1.24, TW: 0.18, LK: 0.20,
             SPR: { x: 2.45, z: 0.64, r: 0.26 }, IDL: { x: -3.07, z: 0.64, r: 0.28 } };
  var V_NOSE = 3.31, V_REAR = -3.31, V_BELLY = 0.46, V_BZ0 = 0.99, V_BZ1 = 1.25, V_ROOF = 1.97, V_RW2 = 1.02, V_SW = 1.40, V_BW = 1.49;
  var V_TX = -1.08;                                     /* turret centre [HBV]: 0.13 m behind mid hull, "just to the rear of the hull centreline" [HB] */
  function vttHull(B) {
    var s, i;
    /* lower hull: belly, the nose plate leaning back from the nose tip (3.31, 1.30) to (2.70, 0.46) [HBV] */
    prismY(B.paint, [[V_REAR, 0.66], [V_REAR + 0.18, V_BELLY], [2.70, V_BELLY], [V_NOSE, V_BZ0 + 0.02], [V_REAR, V_BZ0 + 0.02]], -1.02, 1.02);
    /* upper hull: the bins' level at the side, the sides leaning in to the roof (as the Type 63); roof 1.97 to the
       rear plate, the upper glacis from (2.17, 1.80) down to the nose tip at 1.32 [HBV] */
    function sec(x, top, hw, w0) {
      return [[x, -w0, V_BZ0], [x, w0, V_BZ0], [x, w0, V_BZ1], [x, hw, top], [x, -hw, top], [x, -w0, V_BZ1]];
    }
    loftN(B.paint, [sec(V_REAR, V_ROOF - 0.10, V_RW2 - 0.06, V_SW), sec(V_REAR + 0.08, V_ROOF, V_RW2, V_SW),
                    sec(1.40, V_ROOF, V_RW2, V_SW), sec(2.17, 1.80, V_RW2 + 0.06, V_SW), sec(V_NOSE, 1.32, V_RW2 + 0.20, V_SW)]);
    for (s = -1; s <= 1; s += 2) {
      /* the bins over the track [HBV] (Z 0.99-1.25, the full length) with the ribs the Type 63 carries */
      var yi = s * V_SW, yo = s * V_BW, ya = Math.min(yi, yo), yb = Math.max(yi, yo);
      box(B.paint, V_REAR + 0.05, V_NOSE - 0.25, ya, yb, V_BZ0, V_BZ1);
      for (i = 0; i < 2; i++) {
        var zr = V_BZ0 + 0.08 + i * 0.10;
        box(B.dark, V_REAR + 0.08, V_NOSE - 0.28, s > 0 ? yb : ya - 0.012, s > 0 ? yb + 0.012 : ya, zr, zr + 0.025);
      }
      [-1.40, 0.10, 1.55].forEach(function (bx) { box(B.dark, bx - 0.02, bx + 0.02, s > 0 ? yb : ya - 0.015, s > 0 ? yb + 0.015 : ya, V_BZ0, V_BZ1); });
      belt(B.paint, V_NOSE - 0.25, V_BZ0, V_NOSE - 0.05, V_BZ0 - 0.24, ya, yb, 0.03);
      /* on the leaning side [HBV]: two oval firing ports at X -1.36 and -0.48, the hand rail over them, the slotted
         panel at the rear (X -2.95 to -2.24; NOT identified), the side lamp box at the front */
      var lean = (V_SW - V_RW2) / (V_ROOF - V_BZ1), yAt = function (z) { return s * (V_SW - (z - V_BZ1) * lean); };
      [-1.36, -0.48].forEach(function (px) {
        var y0 = yAt(1.65);
        slab(B.dark, [px, y0 + s * 0.005, 1.65], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.06, 0.012, 0.11);
      });
      box(B.dark, -1.98, -0.62, yAt(1.82) - 0.03, yAt(1.82) + 0.03, 1.80, 1.84);
      [-1.90, -0.70].forEach(function (px) { box(B.dark, px - 0.02, px + 0.02, yAt(1.82) - 0.04, yAt(1.82) + 0.04, 1.76, 1.84); });
      box(B.paint, -2.95, -2.24, yAt(1.74) - 0.05, yAt(1.74) + 0.05, 1.50, 1.98);
      for (i = 0; i < 4; i++) box(B.dark, -2.88 + i * 0.17, -2.82 + i * 0.17, yAt(1.74) - 0.06, yAt(1.74) + 0.06, 1.58, 1.90);
      /* the twin headlamps in their guard on the roof's front corner [HBV front view], as the Type 63 */
      var hy = s * 0.80;
      [-0.12, 0.12].forEach(function (dy) {
        cyl(B.paint, [1.98, hy + dy, V_ROOF - 0.04], [2.12, hy + dy, V_ROOF - 0.04], 0.075, 0.08, 12);
        cyl(B.dark, [2.12, hy + dy, V_ROOF - 0.04], [2.13, hy + dy, V_ROOF - 0.04], 0.068, 0.068, 12);
      });
      box(B.dark, 2.16, 2.19, hy - 0.26, hy + 0.26, V_ROOF + 0.05, V_ROOF + 0.08);
      /* towing eyes on the nose plate */
      cyl(B.dark, [V_NOSE - 0.25, s * 0.55 - 0.07, 0.80], [V_NOSE - 0.25, s * 0.55 + 0.07, 0.80], 0.055, 0.055, 8);
    }
    /* the trim vane folded on the glacis [HBV front view shows its edge], as the Type 63 */
    var ang = Math.atan2(1.80 - 1.32, V_NOSE - 2.17), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function gz(x) { return 1.80 - (x - 2.17) * Math.tan(ang); }
    slab(B.paint, [2.75, 0, gz(2.75) + 0.05], u, [0, 1, 0], w, 0.40, 1.25, 0.03);
    /* roof [HBV]: the long hatch and its raised frame ahead of the turret (X -0.03 to 1.12), the driver's hatch at
       the front left, the team strip, the antenna base */
    box(B.paint, -0.03, 1.12, -0.55, 0.55, V_ROOF, V_ROOF + 0.10);
    box(B.dark, 0.53, 0.57, -0.53, 0.53, V_ROOF + 0.10, V_ROOF + 0.115);
    cylZ(B.paint, 1.75, 0.50, V_ROOF, V_ROOF + 0.06, 0.24, 14);
    box(B.dark, 1.95, 2.02, 0.35, 0.65, V_ROOF, V_ROOF + 0.07);
    box(B.team, -2.95, -2.65, -0.40, 0.40, V_ROOF, V_ROOF + 0.015);
    cylZ(B.dark, -2.85, -0.85, V_ROOF, V_ROOF + 0.14, 0.05, 8);
    /* rear plate [HBV]: the lamp box at its top; the big door is the Type 63's (NOT shown by [HBV]: judgement) */
    box(B.paint, V_REAR - 0.04, V_REAR, -0.95, 0.05, 0.66, V_ROOF - 0.20);
    [0.85, 1.45].forEach(function (hz) { box(B.dark, V_REAR - 0.07, V_REAR, 0.02, 0.12, hz - 0.05, hz + 0.05); });
    box(B.dark, V_REAR - 0.10, V_REAR, 0.55, 0.85, 1.60, 1.90);
    for (s = -1; s <= 1; s += 2) box(B.dark, V_REAR - 0.12, V_REAR, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.70, 0.80);
  }
  /* the turret [HBV]: a low cone, 1.50 m across the foot and 0.96 m across the flat top, 0.46 m tall; the twin
     14.5 mm KPVT ([HB] "Twin 14.5mm hvy MG") in a slot in its face; the AT-3 rail over its front ([HB] "AT-3 ATGM";
     [HBV] draws the round above the roof ahead of the turret).  Origin on the ring at the roof, guns along +X. */
  function vttTurret(B) {
    var s;
    cyl(B.paint, [0, 0, 0], [0, 0, 0.46], 0.75, 0.48, 16);
    cylZ(B.dark, 0, 0, 0, 0.03, 0.78, 16);
    cylZ(B.paint, -0.10, 0.12, 0.46, 0.51, 0.24, 14);
    box(B.dark, -0.12, 0.10, 0.10, 0.14, 0.51, 0.54);
    /* the gun slot and the mantlet */
    box(B.dark, 0.55, 0.66, -0.24, 0.24, 0.12, 0.36);
    box(B.paint, 0.60, 0.78, -0.22, 0.22, 0.14, 0.34);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 0.78, 1.10, s * 0.12, 0.24, 0.05, 0.05, 10);
      cylX(B.dark, 1.10, 2.12, s * 0.12, 0.24, 0.022, 0.022, 8);
      cylX(B.dark, 2.02, 2.15, s * 0.12, 0.24, 0.032, 0.032, 8);
    }
    /* the AT-3 (9M14) on its rail, on a post at the turret's front edge */
    cylZ(B.dark, 0.40, -0.30, 0.38, 0.62, 0.035, 8);
    box(B.dark, 0.30, 1.50, -0.33, -0.27, 0.62, 0.66);
    cylX(B.paint, 0.62, 1.48, -0.30, 0.73, 0.0625, 0.0625, 12);
    cyl(B.paint, [1.48, -0.30, 0.73], [1.62, -0.30, 0.73], 0.0625, 0.02, 12);
    for (s = 0; s < 4; s++) {
      var a = (s + 0.5) / 4 * TAU;
      slab(B.paint, [0.75, -0.30 + Math.cos(a) * 0.14, 0.73 + Math.sin(a) * 0.14], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.10, 0.08, 0.006);
    }
  }
  function buildVTT(THREE, C) {
    var T = materials(THREE, C, KPA_V), g = new THREE.Group(), HB = bins(T), TB = bins(T), tg;
    vttHull(HB);
    addRunningG(HB, VG);
    flush(THREE, g, HB);
    wheels(THREE, g, T, VG, KPA_V.paint.base);
    vttTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(V_TX, 0, V_ROOF);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  /* ======================================================================= the Koksan's gun and mount
     Measured off [K1] (the M-1978 near side-on, 59.8 px a metre from the T-54's 0.88 m wheel pitch, three pitches
     158 px; the front gap reads 1.10 m, as the T-54's), in the mount's frame (origin on the ring at the deck, X
     -0.92 of the hull): trunnion x -0.34, z 1.00; the gun's axis 1.03 over the deck (2.45 m above ground); the
     breech back at x -1.17; the jacket 0.42 m thick out to x 2.25; the tube 0.30 m at the jacket and 0.23 m at the
     muzzle; the multi-slotted brake 0.37 m across, its face at x 9.53 (8.61 m ahead of mid hull); two recoil
     cylinders over the jacket at z 1.40 and 1.53; the equilibrators sloping up from the carriage; the carriage deck
     0.25-0.50 over the hull deck, x -1.68 to 1.59; the loading platform behind with its hand rails ([K2][K3]). */
  var GZ = 1.03, MUZ = 9.53;
  function koksanMount(B) {
    var s, i, x;
    cylZ(B.dark, 0, 0, 0, 0.06, 1.05, 24);
    cylZ(B.paint, 0, 0, 0.06, 0.25, 0.95, 24);
    box(B.paint, -1.68, 1.59, -1.00, 1.00, 0.25, 0.50);
    box(B.dark, -1.68, 1.59, -1.01, 1.01, 0.47, 0.50);
    /* trunnion cheeks */
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[-1.10, 0.50], [0.60, 0.50], [0.10, 1.24], [-0.70, 1.24]], s * 0.40, s * 0.50);
      cylY(B.dark, -0.34, s * 0.38, s * 0.56, 1.00, 0.12, 12);
    }
    /* breech ring and the loading tray behind it */
    box(B.paint, -1.40, -0.60, -0.32, 0.32, 0.72, 1.34);
    box(B.dark, -1.42, -1.38, -0.28, 0.28, 0.76, 1.30);
    box(B.dark, -1.95, -1.40, -0.18, 0.18, 0.86, 0.92);
    /* jacket, tube, the multi-slotted brake */
    cylX(B.paint, -0.60, 2.25, 0, GZ, 0.21, 0.21, 16);
    cylX(B.paint, 2.25, MUZ - 0.55, 0, GZ, 0.15, 0.117, 16);
    cylX(B.paint, MUZ - 0.55, MUZ, 0, GZ, 0.185, 0.185, 16);
    for (i = 0; i < 5; i++) {
      x = MUZ - 0.48 + i * 0.09;
      box(B.dark, x, x + 0.04, -0.19, 0.19, GZ - 0.04, GZ + 0.04);
    }
    cylX(B.dark, MUZ, MUZ + 0.005, 0, GZ, 0.09, 0.09, 12);
    /* recoil cylinders over the jacket [K1] */
    cylX(B.paint, 0.32, 2.32, 0, 1.53, 0.10, 0.10, 12);
    cylX(B.paint, 0.32, 2.27, 0, 1.38, 0.10, 0.10, 12);
    box(B.paint, 2.10, 2.30, -0.12, 0.12, 1.20, 1.60);
    box(B.paint, 0.20, 0.40, -0.14, 0.14, 1.20, 1.62);
    /* the equilibrators, from the carriage up to the cradle [K1] */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.paint, [1.20, s * 0.55, 0.55], [0.20, s * 0.55, 1.30], 0.08, 0.08, 10);
      cyl(B.dark, [0.20, s * 0.55, 1.30], [-0.05, s * 0.50, 1.40], 0.04, 0.04, 8);
    }
    /* the loading platform behind the breech and its hand rails, both sides [K1][K2][K3] */
    box(B.paint, -2.05, -1.68, -1.00, 1.00, 0.44, 0.50);
    for (s = -1; s <= 1; s += 2) {
      [-1.95, -1.50, -1.05].forEach(function (px) { cylZ(B.dark, px, s * 0.98, 0.50, 1.45, 0.025, 6); });
      cylX(B.dark, -1.95, -1.05, s * 0.98, 1.45, 0.025, 0.025, 6);
      cylX(B.dark, -1.95, -1.05, s * 0.98, 1.00, 0.02, 0.02, 6);
    }
    /* the one team strip, on the carriage deck ahead of the cheeks */
    box(B.team, 0.80, 1.40, -0.40, 0.40, 0.50, 0.515);
  }
  /* two spades, folded up for the march, leaning forward from their hinges at the hull rear: [K1] bottom (X -3.43,
     Z 1.17), top (X -2.26, Z 3.68), 0.42 m wide; the blade at the top.  Their spacing across is NOT measured. */
  function spades(B, xb, zb, xt, zt) {
    var s, dx = xt - xb, dz = zt - zb, L = Math.sqrt(dx * dx + dz * dz), u = [dx / L, 0, dz / L], w = [-dz / L, 0, dx / L], c;
    for (s = -1; s <= 1; s += 2) {
      /* the arm: a plate standing edge-on to the track, broad side out ([K1] shows it 0.42 m wide side-on) */
      c = [xb + dx * 0.40, s * 0.75, zb + dz * 0.40];
      slab(B.paint, c, u, w, [0, 1, 0], L * 0.40, 0.21, 0.04);
      /* the blade at its top, wider [K1] */
      c = [xb + dx * 0.84, s * 0.75, zb + dz * 0.84];
      slab(B.paint, c, u, w, [0, 1, 0], L * 0.12, 0.30, 0.16);
      slab(B.dark, [c[0] + w[0] * 0.30, s * 0.75, c[2] + w[2] * 0.30], u, w, [0, 1, 0], L * 0.11, 0.012, 0.15);
      cylY(B.dark, xb, s * 0.60, s * 0.90, zb, 0.09, 10);
    }
    box(B.dark, xb - 0.10, xb + 0.10, -0.95, 0.95, zb - 0.12, zb - 0.02);
  }
  /* the travel lock on the nose: an upright post of two plates with lightening holes ([K2][K3]), the gun resting in
     its clamp; [K1] puts its foot at (2.87, 0.80) and its top under the barrel at X 3.48 */
  function travelLock(B, xb, zb, xt, zt) {
    var s, dx = xt - xb, dz = zt - zb, L = Math.sqrt(dx * dx + dz * dz), u = [dx / L, 0, dz / L], w = [-dz / L, 0, dx / L];
    for (s = -1; s <= 1; s += 2) {
      slab(B.paint, [xb + dx / 2, s * 0.16, zb + dz / 2], u, [0, 1, 0], w, L / 2, 0.025, 0.14);
      [0.32, 0.68].forEach(function (f) { slab(B.dark, [xb + dx * f, s * 0.188, zb + dz * f], u, [0, 1, 0], w, L * 0.12, 0.004, 0.07); });
    }
    box(B.paint, xt - 0.18, xt + 0.18, -0.24, 0.24, zt - 0.04, zt + 0.04);
    for (s = -1; s <= 1; s += 2) box(B.dark, xt - 0.12, xt + 0.12, s * 0.20, s * 0.24, zt, zt + 0.22);
  }

  /* ======================================================================= M-1978 Koksan on the Type 59 hull
     The hull and running gear are the T-54A's (copied above from ru_t54.js: the Type 59 is the T-54A built under
     licence) with the turret off and the ring plated, no fender stowage (none shows on [K1][K3]), no stern drums. */
  var K_TX = -0.92;
  function buildM1978(THREE, C) {
    var T = materials(THREE, C, KPA_V), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB, KPA_V);
    addRunning(HB);
    /* the plate over the old turret ring, under the mount */
    cylZ(HB.paint, K_TX, 0, DECK, DECK + 0.03, 1.05, 24);
    spades(HB, -3.43, 1.17, -2.26, 3.68);
    travelLock(HB, 2.87, 0.80, 3.40, 2.29);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, KPA_V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    koksanMount(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(K_TX, 0, DECK + 0.03);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  /* ======================================================================= M-1989 Koksan
     "the same gun and mount of the M-1978, but ... on a modified AT-S tracked artillery tractor chassis ... longer
     ... The forward road wheels are more widely separated from the rest.  Two armoured cabs located in the front and
     center" (en.wikipedia, after Foss 2011).  Only [K4], a front-left 3/4 parade photograph, was found: it shows the
     long shallow glacis, the armoured cab with its hatches and the headlamps at its foot, the upper hull sides
     leaning in, the gun carried forward over the cab and the M-1978's mount at the rear.  NOTHING here is measured:
     the hull length (7.0 m), the six road wheels and their spacing, the cab's size and the deck height are
     judgement, scaled to the M-1978's mount; see NOT CONFIRMED in the header. */
  var NG = { XW: [2.15, 0.95, 0.10, -0.75, -1.60, -2.45], ZW: 0.40, RW: 0.40, TY: 1.30, TW: 0.25, LK: 0.22,
             SPR: { x: 3.05, z: 0.66, r: 0.30 }, IDL: { x: -3.15, z: 0.62, r: 0.30 } };
  var N_NOSE = 3.50, N_REAR = -3.50, N_FZ = 1.05, N_DECK = 1.50, N_TX = -1.85, N_HW = 1.10, N_FW = 1.62;
  function m1989Hull(B) {
    var s;
    /* the lower hull and the long shallow glacis [K4] */
    prismY(B.paint, [[N_REAR, 0.60], [N_REAR + 0.20, 0.42], [3.00, 0.42], [N_NOSE, 0.85], [N_NOSE, 1.00], [2.10, 1.62], [N_REAR, N_DECK]], -N_HW, N_HW);
    for (s = -1; s <= 1; s += 2) {
      /* fender over the track, its lip */
      box(B.paint, N_REAR + 0.05, 3.15, s > 0 ? N_HW : -N_FW, s > 0 ? N_FW : -N_HW, N_FZ - 0.03, N_FZ);
      box(B.paint, N_REAR + 0.05, 3.15, s > 0 ? N_FW - 0.025 : -N_FW, s > 0 ? N_FW : -N_FW + 0.025, N_FZ - 0.10, N_FZ);
      /* the upper hull side leaning in from the fender to the deck [K4] */
      prismY(B.paint, [[N_REAR, N_FZ], [2.10, N_FZ], [2.10, N_DECK - 0.05], [N_REAR, N_DECK - 0.05]], s * N_HW, s * (N_HW + 0.01));
      belt(B.paint, 3.15, N_FZ, 3.50, N_FZ - 0.30, s > 0 ? N_HW : -N_FW, s > 0 ? N_FW : -N_HW, 0.03);
      /* headlamps at the foot of the cab front [K4] */
      cyl(B.paint, [2.22, s * 0.85, 1.62], [2.36, s * 0.85, 1.62], 0.09, 0.10, 12);
      cyl(B.dark, [2.36, s * 0.85, 1.62], [2.37, s * 0.85, 1.62], 0.085, 0.085, 12);
    }
    /* the armoured cab, front and centre, sides leaning in, roof under the gun [K4]; two round hatches */
    loftN(B.paint, [[[0.70, -1.10, N_DECK], [0.70, 1.10, N_DECK], [0.70, 0.92, 2.12], [0.70, -0.92, 2.12]],
                    [[1.70, -1.10, N_DECK], [1.70, 1.10, N_DECK], [1.55, 0.92, 2.12], [1.55, -0.92, 2.12]],
                    [[2.10, -1.10, 1.62], [2.10, 1.10, 1.62], [1.70, 0.92, 2.05], [1.70, -0.92, 2.05]]]);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.paint, 1.05, s * 0.50, 2.12, 2.17, 0.30, 16);
      cylZ(B.dark, 1.05, s * 0.50, 2.17, 2.19, 0.10, 8);
      box(B.dark, 1.62, 1.66, s * 0.50 - 0.15, s * 0.50 + 0.15, 1.98, 2.04);          /* vision blocks */
    }
    /* the engine deck behind the cab, louvres; tow hooks */
    box(B.dark, -0.40, 0.55, -0.80, 0.80, N_DECK, N_DECK + 0.02);
    for (s = 0; s < 6; s++) box(B.paint, -0.36 + s * 0.15, -0.30 + s * 0.15, -0.78, 0.78, N_DECK + 0.02, N_DECK + 0.04);
    for (s = -1; s <= 1; s += 2) box(B.dark, N_REAR - 0.10, N_REAR, s * 0.70 - 0.07, s * 0.70 + 0.07, 0.70, 0.82);
    box(B.team, -0.30, 0.40, -1.40, -1.20, N_FZ, N_FZ + 0.015);
    box(B.team, -0.30, 0.40, 1.20, 1.40, N_FZ, N_FZ + 0.015);
  }
  function buildM1989(THREE, C) {
    var T = materials(THREE, C, KPA_V), g = new THREE.Group(), HB = bins(T), TB = bins(T), tg;
    m1989Hull(HB);
    addRunningG(HB, NG);
    cylZ(HB.paint, N_TX, 0, N_DECK, N_DECK + 0.03, 1.05, 24);
    flush(THREE, g, HB);
    wheels(THREE, g, T, NG, KPA_V.paint.base);
    koksanMount(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(N_TX, 0, N_DECK + 0.03);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  /* ======================================================================= M1974 152 mm on the Tokchon hull
     [M74]: a front-left 3/4 parade photograph, the only one found.  It shows five road wheels, the toothed sprocket
     at the FRONT with a longer gap ahead of it, the idler at the rear; a low cab under a sloping nose; the tall
     box casemate with vertical sides over the tracks taking the rear two thirds, open on top (crew stand in it;
     [HB] A-39 "sides enclosed, top open"); the 152 mm gun with its double-baffle brake reaching about to the nose
     over the cab, behind a shield in the casemate's front.  [HB] A-34 names it "152mm SP gun-howitzer M-1974" (the
     game row's "122mm" is not supported).  Scale: the hull is taken as the ATS-59's published 6.28 m (en.wikipedia;
     the Tokchon is commonly called an ATS-59 derivative: NOT CONFIRMED); heights from the photograph's ratios to the
     road wheel taken as 0.70 m (judgement). */
  var TG = { XW: [0.87, 0.09, -0.69, -1.47, -2.25], ZW: 0.36, RW: 0.35, TY: 1.18, TW: 0.24, LK: 0.20,
             SPR: { x: 2.09, z: 0.62, r: 0.30 }, IDL: { x: -2.86, z: 0.55, r: 0.30 } };
  var T_NOSE = 3.14, T_REAR = -3.14, T_FZ = 1.02, T_HW = 0.98, T_CW = 1.45, T_TOP = 2.95, T_CF = 0.70;
  function m1974Hull(B) {
    var s, i;
    /* lower hull, nose plate, the low cab under its sloping roof [M74] */
    prismY(B.paint, [[T_REAR, 0.55], [T_REAR + 0.20, 0.38], [2.60, 0.38], [T_NOSE, 0.90], [T_NOSE, 1.05], [2.10, 1.62], [T_CF, 1.72], [T_REAR, 1.72]], -T_HW, T_HW);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 1.20, 2.90, s > 0 ? T_HW : -T_CW, s > 0 ? T_CW : -T_HW, T_FZ - 0.03, T_FZ);
      belt(B.paint, 2.90, T_FZ, 3.14, T_FZ - 0.25, s > 0 ? T_HW : -T_CW, s > 0 ? T_CW : -T_HW, 0.03);
      /* headlamp in front of the cab [M74] */
      cyl(B.paint, [2.30, s * 0.80, 1.50], [2.44, s * 0.80, 1.50], 0.09, 0.10, 12);
      cyl(B.dark, [2.44, s * 0.80, 1.50], [2.45, s * 0.80, 1.50], 0.085, 0.085, 12);
      /* the casemate: vertical sides over the tracks from the fender line to the top [M74] */
      box(B.paint, T_REAR, T_CF, s > 0 ? T_CW - 0.03 : -T_CW, s > 0 ? T_CW : -T_CW + 0.03, T_FZ - 0.10, T_TOP);
      box(B.paint, T_REAR, T_CF, s > 0 ? T_HW : -T_CW, s > 0 ? T_CW : -T_HW, T_FZ - 0.10, T_FZ);
      /* a stiffening strip and the stowage rail along it [M74] */
      box(B.dark, T_REAR + 0.05, T_CF - 0.05, s * T_CW, s * (T_CW + 0.02), 2.10, 2.14);
      box(B.dark, T_REAR + 0.05, T_CF - 0.05, s * T_CW, s * (T_CW + 0.02), 1.30, 1.34);
    }
    /* casemate front: the sloped plate up to the gun shield, the rear wall; the floor inside; open top */
    belt(B.paint, T_CF, 1.72, T_CF - 0.45, T_TOP - 0.25, -T_CW, T_CW, 0.04);
    box(B.paint, T_REAR, T_REAR + 0.04, -T_CW, T_CW, T_FZ - 0.10, T_TOP - 0.25);
    box(B.dark, T_REAR + 0.04, T_CF - 0.20, -T_CW + 0.03, T_CW - 0.03, 1.72, 1.74);
    /* the cab roof: driver's hatch, vision blocks */
    cylZ(B.paint, 1.35, 0.45, 1.70, 1.76, 0.24, 14);
    box(B.dark, 1.95, 2.00, 0.30, 0.60, 1.62, 1.68);
    for (i = 0; i < 2; i++) box(B.dark, T_REAR - 0.06, T_REAR, (i ? 1 : -1) * 0.70 - 0.07, (i ? 1 : -1) * 0.70 + 0.07, 0.60, 0.72);
    box(B.team, -2.80, -2.20, -T_CW - 0.002, -T_CW + 0.02, T_TOP - 0.02, T_TOP);
    box(B.team, -2.80, -2.20, T_CW - 0.02, T_CW + 0.002, T_TOP - 0.02, T_TOP);
  }
  /* the 152 mm gun: cradle, shield in the casemate front, recoil cylinders, barrel, double-baffle brake [M74].
     Origin on the casemate floor at the gun's pivot; the gun along +X.  Barrel 4.2 m to the brake (the D-20's,
     [HB] A-34 "152mm D-20" for the M-1974's ordnance; length NOT measured off [M74]). */
  var T_TX = 0.05, T_GZ = 0.62;
  function m1974Gun(B) {
    var s;
    cylZ(B.dark, 0, 0, 0, 0.05, 0.55, 18);
    for (s = -1; s <= 1; s += 2) prismY(B.paint, [[-0.60, 0.05], [0.30, 0.05], [0.10, T_GZ + 0.15], [-0.40, T_GZ + 0.15]], s * 0.28, s * 0.36);
    box(B.paint, -1.10, -0.30, -0.25, 0.25, T_GZ - 0.25, T_GZ + 0.25);
    /* the shield: a plate across the casemate front opening */
    box(B.paint, 0.18, 0.24, -0.70, 0.70, T_GZ - 0.40, T_GZ + 0.45);
    cylX(B.paint, 0.24, 0.80, 0, T_GZ, 0.22, 0.20, 16);
    cylX(B.paint, 0.20, 1.20, 0, T_GZ + 0.25, 0.08, 0.08, 10);
    cylX(B.paint, 0.80, 3.30, 0, T_GZ, 0.12, 0.10, 16);
    /* the double-baffle brake */
    cylX(B.paint, 3.30, 3.42, 0, T_GZ, 0.17, 0.17, 14);
    box(B.dark, 3.42, 3.52, -0.17, 0.17, T_GZ - 0.08, T_GZ + 0.08);
    cylX(B.paint, 3.52, 3.64, 0, T_GZ, 0.17, 0.17, 14);
    box(B.dark, 3.64, 3.72, -0.17, 0.17, T_GZ - 0.08, T_GZ + 0.08);
    cylX(B.paint, 3.72, 3.80, 0, T_GZ, 0.15, 0.15, 14);
  }
  function buildM1974(THREE, C) {
    var T = materials(THREE, C, KPA_V), g = new THREE.Group(), HB = bins(T), TB = bins(T), tg;
    m1974Hull(HB);
    addRunningG(HB, TG);
    flush(THREE, g, HB);
    wheels(THREE, g, T, TG, KPA_V.paint.base);
    m1974Gun(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(T_TX, 0, 1.74);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  var BUILD = { vtt: buildVTT, m1978: buildM1978, m1989: buildM1989, m1974: buildM1974 };
  function build(which, THREE, M, C) {
    var root = BUILD[which](THREE, C);
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }
  return { build: build };
})();

/* registration.  len: the measured X extent of each build, as dumped (tow hooks, the pack's overhang on the march,
   the muzzle and the folded spades included) */
(function () {
  function reg(key, len, build) { UNIT_MODELS[key] = { len: len, build: build }; }
  var LEN = { kpa_e60_mlrs: 7.40, kpa_e80_mlrs: 7.80, kpa_e90_mlrs: 8.03 };
  /* kpa_e80_mlrs (M1985) is NOT registered: no photo or drawing of it was
     found (only a line of text in the 1997 handbook), so it keeps its
     stand-in until one is measured. */
  ["kpa_e60_mlrs", "kpa_e90_mlrs"].forEach(function (k) {
    reg(k, LEN[k], function (THREE, M, C) { return HeroKpaRockets.build(k, THREE, M, C); });
  });
  function trk(which) { return function (THREE, M, C) { return HeroKpaTracked.build(which, THREE, M, C); }; }
  reg("kpa_e80_ifv", 6.74, trk("vtt"));
  reg("kpa_e90_ifv", 6.74, trk("vtt"));
  reg("kpa_e80_spg", 12.24, trk("m1978"));
  reg("kpa_e90_spg", 11.59, trk("m1989"));
  reg("kpa_e00_spg", 11.59, trk("m1989"));
  reg("kpa_e60_spg", 7.08, trk("m1974"));
})();
