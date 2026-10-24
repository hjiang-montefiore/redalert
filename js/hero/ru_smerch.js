/* ============ ru_smerch.js - HERO model: the 9A52 Smerch (BM-30) 300 mm multiple rocket launcher on the MAZ-543M 8x8 ============
   Full-quality redo (2026-10-24).  Four keys, kept: pact_e80_mlrs "9A52 Smerch 300mm MRL" (1987), pact_e90_mlrs "9A52 BM-30
   Smerch", pact_e00_mlrs "9A52 Smerch / 9A54 Tornado-S", mlrs_p "9A52 Smerch MRL" (present; js/facts.js calls it the 9A52-2).
   All four rows are turret:true; none is deploy:true.

   Sources (Wikimedia Commons, at width 960; ru.wikipedia "Smerch (RSZO)" for figures and variants):
     [S] "9A52 of 300-mm multiple rocket launching system 9K58 Smerch, Artillery museum, Saint-Petersburg pic1" - starboard
         side, pack raised: the side stations below, the arched mudguards, the jack between the rear pair, the crew cab door.
     [R] "9A52 TEL 9K58 Smerch system Rear View 2017-12-24" - the tube layout and the tails' collars.
     [A] "Army2016demo-066" (Vitaly Kuzmin) - 9A52-2 rear three-quarter, pack travelling: tube layout, cradle beam, the
         braced brackets under the rear, the whip aerial, the deck walkway.
     [P8] "2008 Moscow Victory Day Parade (58-24)" - starboard front: the full-width crew cab behind a lower driving cab on
         the PORT side, the grille between, the ladder behind the crew cab.  Its three-colour scheme is the 2008 parade's
         and is not drawn.
     [P11] "2011 Moscow Victory Day Parade (358-37)" - port front, plain green: driving cab, roof lamp, grille, headlamps,
         the lattice frame at the pack's tails.
     [T] "Tornado-S - Army 2024-08-14 44" - the 9A54 Tornado-S: the guard round the roof lamp, the box on the engine deck.
     [D] "280MM-Multiple rocket launcher-DIA" - the DIA painting: pack raised about 45 degrees over the cab.
   Published (ru.wikipedia): length in travel 12 370 mm (9A52; 12 100 for the 9A52-2), width 3050, height 3070, 43.7 t,
     12 tubes of 300 mm, elevation to 55 degrees.  MAZ-543M: 1500x600 tyres, wheelbase 2.2 + 3.3 + 2.2 m.
   CORRECTED from the old header: the MAZ-543M cab is not two side pods.  It is a low DRIVING cab on the port side with the
     grille and engine deck beside it, and behind both a tall full-width CREW cab [P8][P11][T][S].  The pack is not hinged
     over the turntable centre.  Its trunnion is at the rear of the rotating platform, and the tails swing down behind the
     vehicle as it rises [S][R].  ru.wikipedia gives the 9A52 on the MAZ-79111 and the 9A52-2 on the MAZ-543M.  The two are
     not told apart in the photographs, so both are drawn as the photographs show them.

   Recognition list (what each rests on; where it is in the code):
     1. 8x8 with the axle pairs 2.2 m apart and the long 3.3 m gap between axles 2 and 3 [S]: AX.
     2. The tall full-width crew cab over the front axle, two high front windows, a door each side [S][P8][T]: addCab.
     3. The low driving cab on the PORT side ahead of it, with a two-pane windscreen and a door [P11][P8][T]: addCab.
     4. The wide louvred grille across the rest of the front, the headlamps at the outer ends [P11][T]: addCab.
     5. Arched mudguards over each axle pair, rounded at both ends [S][P11]: ribbon() in addChassis.
     6. The ribbed stowage boxes between the pairs under the deck edge, and the dark tank below them [S]: addChassis.
     7. Twelve 300 mm tubes: four in the top row, two either side in the two lower rows, the middle of the lower rows
        taken by the cradle beam [R][A]: addPack.
     8. The tails' heavy collars and the lattice frame at the rear of the pack [R][P11]: addPack.
     9. The clamp frames round the pack at four stations, following its stepped outline [S][T]: addPack.
    10. The rotating platform over the rear axle, the trunnion at its rear, the pack laid flat over the deck with its mouths
        at the crew cab [S][P8][A]: addMount, "turret" and "podelev".
    11. The stabiliser jack between the rear axle pair, one each side [S]: addChassis (JX).
    12. The ladder behind the crew cab on the starboard side [P8][T]: addChassis.

   Rows: e80 and e90 are the 9A52 in plain Soviet green (#455437, the protective green of ru_buk.js's 9A310M1).  e00 is the
     9A52 of the 2008-2011 photographs in plain Russian green (#4b533f).  mlrs_p is the 9A52-2 / Tornado-S of Army-2016 [A]
     and Army-2024 [T], in their darker green (#4e5842; sampled lit #657259 [T], taken to about 0.8).  It adds what those
     photographs show: the guard round the roof lamp and the box on the engine deck [T], and the whip aerial [A].  The
     pact_e00_mlrs row named the 9A53 (the Uragan-1M launcher in ru.wikipedia) until 2026-10-24.  The Tornado-S is the 9A54, issued from
     2016, so that row draws the 9A52 its own decade shows.
   NOT drawn (not confirmed): the jacks set up.  The row is not deploy:true, and js/entities.js sets e.deployed only for SAM
     and coastal rows, so a lowered pose would never be shown; the jacks are drawn raised for the road.  Also not drawn: the
     long cylinders seen lying on the deck in [S] beyond the two elevating rams, nets, the 9A52-2's fire-control fit inside
     the cab, any marking or number, and the parade scheme of [P8].
   Elevation: 40 degrees (between [S] about 30 and [D] about 45; 55 is the published limit).

   Mechanisms: "turret" is the rotating platform (origin on the slewing ring at x -4.0, z 1.45).  Inside it, "podelev" is the
   cradle and tubes, hinged at the rear trunnion (x -5.2, z 1.93 on the hull).  Its userData.el is the launch elevation and
   userData.cells holds the 12 mouths [x, y, z, tail x] in the group frame.  Eight "roadwheel" groups.
   Materials 5: paint (canvas texture: a weathered single coat, metre UVs), dark, glass, tyre, C.team (one strip on top of
   the pack, none on the hull).  Draw calls: hull 3 + wheels 8 + platform 2 + pack 3 = 16.
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSmerch = (function () {
  "use strict";

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

  /* ----------------------------------------------------------- the stations
     Side view measured off the Saint-Petersburg museum photograph (starboard side, 71 px a metre at the cab, the
     wheelbase set to the MAZ-543M's published 2.2 + 3.3 + 2.2 m); +X nose, +Y port, +Z up, tyres on z = 0. */
  var XT = -5.20, XN = 6.08;                         /* rear frame end, front face (bumper 0.28 further) */
  var AX = [3.45, 1.25, -2.05, -4.25], TY = 1.19, RT = 0.75;   /* axles; track 2.38 m; 1500x600 tyres */
  var XC0 = 1.70, XC1 = 3.45, ZC = 3.07;             /* the full-width crew cab: rear, front (over the first axle), roof */
  var ZD = 2.10, ZP = 2.62, YP = 0.55;               /* engine deck, port driving cab roof, its inner wall */
  var ZK = 1.86;                                     /* the launcher deck */
  var TX = -4.00, TZ = 1.45;                         /* the turntable centre ("turret" origin) */
  var PVX = -1.20, PVZ = 0.48;                       /* the trunnion, at the turntable's rear, in the turret frame */
  var TP = 0.38, TR = 0.17, TX0 = -0.72, TX1 = 6.82; /* tube pitch and radius; tails and mouths from the trunnion */
  var ROWZ = [0.20, 0.58, 0.96];                     /* tube rows above the trunnion: stowed 2.13, 2.51, 2.89 m */
  var LAUNCH_EL = 40 * Math.PI / 180;
  var JX = -3.15, JY = 1.22;                         /* the stabiliser jack, between the rear pair of axles */

  /* fittings by row: the lamp is on the driving-cab roof in the 2008, 2011 and 2024 photographs; the Army-2024
     Tornado-S adds the guard round it and the box on the engine deck, and the Army-2016 9A52-2 the whip */
  var ROWS = {
    e80: { paint: { base: "#455437", blots: ["#3e4c32", "#4d5c3e", "#41503a"], seed: 30082 }, guard: false, box: false, whip: false },
    e90: { paint: { base: "#455437", blots: ["#3e4c32", "#4d5c3e", "#41503a"], seed: 30090 }, guard: false, box: false, whip: false },
    e00: { paint: { base: "#4b533f", blots: ["#444c39", "#535b46", "#474f3b"], seed: 30011 }, guard: false, box: false, whip: false },
    p:   { paint: { base: "#4e5842", blots: ["#47513c", "#56604a", "#4a543f"], seed: 30024 }, guard: true, box: true, whip: true }
  };

  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.95, metalness: 0.02 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }

  /* 1500x600 tyre: big staggered lug blocks across the crown, the dished wheel with its hub and nut ring */
  function tyre(bin) {
    var N = 22, R = [[-0.30, 0.47, 0, 0], [-0.30, 0.64, 0, 0], [-0.25, 0.73, 1, 0], [-0.10, 0.75, 1, 0], [-0.02, 0.75, 1, 1],
                     [0.02, 0.75, 1, 0], [0.10, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.64, 0, 0], [0.30, 0.47, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.04;
      a = j / N * TAU;
      V.push([r * Math.cos(a), R[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, R[0][0], 0], [0, R[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    for (k = -1; k <= 1; k += 2) {
      cyl(bin, [0, k * 0.29, 0], [0, k * 0.33, 0], 0.46, 0.40, 16, true, false);     /* dished rim face */
      cylY(bin, 0, k * 0.33, k * 0.40, 0, 0.17, 10);                                  /* hub */
      for (j = 0; j < 8; j++) {                                                      /* nut ring */
        a = j / 8 * TAU;
        cylY(bin, 0.24 * Math.cos(a), k * 0.33, k * 0.355, 0.24 * Math.sin(a), 0.025, 4);
      }
    }
  }

  function addChassis(B, R) {
    var s, k, i, yo, x;
    box(B.dark, XT + 0.10, XN, -0.55, 0.55, 0.95, 1.45);                                 /* frame rails */
    for (i = 0; i < 4; i++) cylY(B.dark, AX[i], -0.95, 0.95, RT, 0.11, 8);               /* axles and hubs reductions */
    for (i = 0; i < 4; i++) box(B.dark, AX[i] - 0.22, AX[i] + 0.22, -0.30, 0.30, 0.55, 0.95);   /* axle housings */
    /* rear: beam, tow hooks, lamps, and the two braced brackets under the cradle (Army-2016 rear view) */
    box(B.dark, XT, XT + 0.16, -1.40, 1.40, 0.98, 1.32);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.08, XT, s * 1.05 - 0.07, s * 1.05 + 0.07, 1.00, 1.14);
      bar(B.dark, [XT + 0.05, s * 0.45, 1.00], [XT - 0.05, s * 0.62, 0.62], 0.10);
      bar(B.dark, [XT + 0.05, s * 0.85, 1.00], [XT - 0.05, s * 0.62, 0.62], 0.10);
      box(B.dark, XT - 0.12, XT + 0.02, s * 0.62 - 0.14, s * 0.62 + 0.14, 0.56, 0.64);
    }
    /* front bumper with the tow eyes */
    box(B.dark, XN, XN + 0.28, -1.48, 1.48, 0.95, 1.28);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XN + 0.28, XN + 0.35, s * 0.55 - 0.08, s * 0.55 + 0.08, 1.02, 1.18);
      box(B.dark, XN + 0.10, XN + 0.24, s * 1.05 - 0.10, s * 1.05 + 0.10, 0.80, 0.95);
    }
    for (s = -1; s <= 1; s += 2) {
      yo = s > 0 ? [1.00, 1.52] : [-1.52, -1.00];
      /* mudguard arches over each pair, rounded at both ends as the museum side view shows them */
      /* the rear one ends in a flat upright plate at the back, carrying the tail lamp (Army-2016 rear view) */
      ribbon(B.paint, [[XT + 0.02, 0.92], [XT + 0.02, 1.62], [XT + 0.30, 1.70], [AX[3], 1.70], [AX[2], 1.70],
                       [AX[2] + 0.42, 1.62], [AX[2] + 0.70, 1.40], [AX[2] + 0.82, 1.02]], yo[0], yo[1], 0.05);
      ribbon(B.paint, [[AX[1] - 0.82, 1.02], [AX[1] - 0.70, 1.40], [AX[1] - 0.42, 1.62], [AX[1], 1.70], [AX[0], 1.70],
                       [AX[0] + 0.45, 1.66], [AX[0] + 0.80, 1.50], [AX[0] + 0.90, 1.22]], yo[0], yo[1], 0.05);
      /* mud flaps behind each pair */
      box(B.dark, XT + 0.02, XT + 0.06, yo[0] + 0.04, yo[1] - 0.04, 0.42, 0.95);
      box(B.glass, XT - 0.04, XT + 0.0, s * 1.30 - 0.09, s * 1.30 + 0.09, 1.48, 1.58);
      box(B.dark, AX[1] - 0.86, AX[1] - 0.82, yo[0] + 0.04, yo[1] - 0.04, 0.45, 1.05);
      /* the ribbed stowage boxes between the pairs, lids under the deck edge, and the dark tank below them */
      box(B.paint, AX[2] + 0.70, AX[1] - 0.84, s > 0 ? 0.55 : -1.48, s > 0 ? 1.48 : -0.55, 1.32, 1.80);
      for (k = 0; k < 9; k++) sideBox(B.paint, s, 1.48, 0.025, AX[2] + 0.80 + k * 0.17, AX[2] + 0.84 + k * 0.17, 1.36, 1.76);
      for (k = 0; k < 2; k++) sideBox(B.dark, s, 1.48, 0.04, AX[2] + 1.05 + k * 0.80, AX[2] + 1.20 + k * 0.80, 1.56, 1.62);
      box(B.dark, AX[2] + 0.85, AX[1] - 1.05, s > 0 ? 0.60 : -1.36, s > 0 ? 1.36 : -0.60, 0.62, 1.24);
      for (k = 0; k < 3; k++) sideBox(B.paint, s, 1.36, 0.02, AX[2] + 0.95 + k * 0.55, AX[2] + 1.00 + k * 0.55, 0.64, 1.22);
      /* the stabiliser jack between the rear pair: cylinder down the frame side, ram and foot plate raised for the road */
      cylZ(B.paint, JX, s * JY, 0.80, 1.80, 0.12, 10);
      cylZ(B.dark, JX, s * JY, 1.62, 1.70, 0.15, 10);
      cylZ(B.dark, JX, s * JY, 0.46, 0.80, 0.075, 8);
      cylZ(B.dark, JX, s * JY, 0.38, 0.46, 0.24, 12);
      box(B.dark, JX - 0.10, JX + 0.10, s > 0 ? 0.55 : -JY, s > 0 ? JY : -0.55, 1.30, 1.45);
      /* the ladder up behind the crew cab, starboard (2008 and 2024 photographs); a step under the port cab door */
      if (s < 0) {
        box(B.dark, XC0 - 0.30, XC0 - 0.27, -1.53, -1.50, 0.62, 1.86);
        box(B.dark, XC0 - 0.05, XC0 - 0.02, -1.53, -1.50, 0.62, 1.86);
        for (k = 0; k < 5; k++) box(B.dark, XC0 - 0.30, XC0 - 0.02, -1.53, -1.51, 0.72 + k * 0.25, 0.75 + k * 0.25);
      }
    }
    /* the launcher deck from the crew cab back to the turntable, walkway edges */
    box(B.paint, -2.80, XC0, -1.44, 1.44, ZK - 0.06, ZK);
    for (s = -1; s <= 1; s += 2) box(B.dark, -2.80, XC0, s > 0 ? 1.40 : -1.46, s > 0 ? 1.46 : -1.40, ZK - 0.12, ZK + 0.02);
    for (k = 0; k < 6; k++) box(B.dark, -2.6 + k * 0.72, -2.56 + k * 0.72, -1.40, 1.40, ZK, ZK + 0.01);
    box(B.paint, XT + 0.16, -2.80, -1.44, 1.44, 1.46, 1.56);                            /* the rear frame top under the turntable */
    /* the front travel rest: a saddle on two posts, under the cradle beam's fore end */
    for (s = -1; s <= 1; s += 2) box(B.paint, 0.70, 0.86, s * 0.20 - 0.07, s * 0.20 + 0.07, ZK, 2.12);
    box(B.dark, 0.62, 0.94, -0.30, 0.30, 2.08, 2.14);
    /* exhaust stub, starboard behind the cab */
    cylY(B.dark, XC0 + 0.30, -1.52, -1.40, 1.52, 0.06, 8);
  }

  /* the front: full-width engine bay with the louvred grille, the PORT driving cab ahead of the crew cab, and behind
     both the tall full-width crew cab (2011 parade, 2008 parade, Army-2024 and the museum side view) */
  function addCab(B, R) {
    var s, k, x, y;
    /* engine bay: lower body, side panels with the three louvre panels, the deck */
    box(B.paint, XC1, XN, -1.50, 1.50, 1.18, ZD);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) {
        sideBox(B.dark, s, 1.50, 0.015, 4.50 + k * 0.30, 4.74 + k * 0.30, 1.22, 1.62);
        for (x = 0; x < 4; x++) sideBox(B.paint, s, 1.515, 0.015, 4.50 + k * 0.30, 4.74 + k * 0.30, 1.26 + x * 0.09, 1.29 + x * 0.09);
      }
      sideBox(B.dark, s, 1.50, 0.012, XC1 + 0.10, XC1 + 0.12, 1.20, ZD - 0.04);
      sideBox(B.dark, s, 1.50, 0.012, 5.70, 5.72, 1.20, ZD - 0.04);
    }
    /* the grille: dark field, 15 vertical slats and two horizontal bars, from the starboard lamp to the port cab */
    box(B.dark, XN, XN + 0.03, -1.16, YP - 0.02, 1.38, 2.02);
    for (k = 0; k < 15; k++) { y = -1.12 + k * (YP + 1.08) / 14.5; box(B.paint, XN + 0.01, XN + 0.07, y, y + 0.04, 1.38, 2.02); }
    for (k = 0; k < 2; k++) box(B.paint, XN + 0.06, XN + 0.10, -1.14, YP - 0.04, 1.55 + k * 0.30, 1.59 + k * 0.30);
    /* headlamps at the outer ends, marker lamps below them */
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.32;
      cylX(B.dark, XN, XN + 0.08, y, 1.62, 0.12, 12);
      cylX(B.glass, XN + 0.08, XN + 0.10, y, 1.62, 0.09, 12);
      box(B.glass, XN, XN + 0.05, y - 0.06, y + 0.06, 1.34, 1.42);
    }
    /* engine deck: hatch seams, the raised intake housing before the crew cab on the starboard side (museum side view) */
    for (k = 0; k < 3; k++) box(B.dark, 4.30 + k * 0.62, 4.33 + k * 0.62, -1.40, YP - 0.05, ZD, ZD + 0.01);
    box(B.paint, XC1, XC1 + 0.72, -1.48, YP, ZD, 2.66);
    box(B.dark, XC1 + 0.72, XC1 + 0.74, -1.30, YP - 0.15, 2.20, 2.56);
    for (k = 0; k < 4; k++) box(B.dark, XC1 + 0.73, XC1 + 0.76, -1.25, YP - 0.20, 2.26 + k * 0.08, 2.29 + k * 0.08);
    /* the driving cab, port: windscreen in two panes, door and window on the port side, the roof lamp */
    box(B.paint, XC1, XN, YP, 1.50, ZD, ZP);
    box(B.dark, XN, XN + 0.02, YP + 0.06, 1.46, ZD + 0.02, ZP - 0.06);
    box(B.glass, XN + 0.02, XN + 0.03, YP + 0.10, 0.93, ZD + 0.05, ZP - 0.12);
    box(B.glass, XN + 0.02, XN + 0.03, 0.97, 1.42, ZD + 0.05, ZP - 0.12);
    box(B.dark, XN - 0.10, XN + 0.06, YP + 0.04, 1.48, ZP - 0.04, ZP + 0.02);                 /* visor lip */
    box(B.dark, 4.40, 5.40, 1.50, 1.515, 1.30, ZP - 0.06);                                   /* door seam field */
    box(B.paint, 4.43, 5.37, 1.51, 1.525, 1.33, ZP - 0.09);
    box(B.glass, 4.75, 5.30, 1.52, 1.535, 2.14, ZP - 0.14);
    box(B.dark, 4.50, 4.62, 1.525, 1.55, 1.80, 1.84);                                        /* handle */
    box(B.dark, 4.55, 5.25, 1.50, 1.62, 1.04, 1.08);                                         /* step */
    box(B.glass, XC1 + 0.20, 4.25, YP - 0.005, YP + 0.005, 2.20, ZP - 0.12);                /* inner side window over the deck */
    cylZ(B.dark, 5.75, 0.95, ZP, ZP + 0.12, 0.05, 6);
    cylX(B.dark, 5.62, 5.88, 0.95, ZP + 0.22, 0.12, 12);
    cylX(B.glass, 5.88, 5.90, 0.95, ZP + 0.22, 0.10, 12);
    if (R.guard) {                                                                          /* the guard hoop (Army-2024) */
      for (s = -1; s <= 1; s += 2) bar(B.dark, [5.50, 0.95 + s * 0.22, ZP], [5.96, 0.95 + s * 0.22, ZP + 0.36], 0.03);
      bar(B.dark, [5.96, 0.73, ZP + 0.36], [5.96, 1.17, ZP + 0.36], 0.03);
    }
    /* mirrors: the port cab's front corner and the crew cab's starboard front corner, on arms */
    bar(B.dark, [XN - 0.05, 1.50, 2.30], [XN + 0.12, 1.62, 2.40], 0.035);
    box(B.dark, XN + 0.08, XN + 0.16, 1.58, 1.72, 2.18, 2.52);
    bar(B.dark, [XC1, -1.50, 2.80], [XC1 + 0.22, -1.62, 2.85], 0.035);
    box(B.dark, XC1 + 0.18, XC1 + 0.26, -1.74, -1.58, 2.45, 2.85);
    if (R.box) {                                                                            /* the box on the engine deck (Army-2024) */
      box(B.paint, 4.55, 5.55, -1.30, -0.30, ZD, ZD + 0.34);
      box(B.dark, 4.55, 5.55, -1.31, -0.29, ZD + 0.26, ZD + 0.28);
      for (k = 0; k < 2; k++) box(B.dark, 4.80 + k * 0.5, 4.88 + k * 0.5, -1.32, -1.30, ZD + 0.12, ZD + 0.22);
    }
    /* the crew cab: full width, tall, two front windows high up, a door each side, roof hatch */
    box(B.paint, XC0, XC1, -1.50, 1.50, 1.80, ZC - 0.05);
    box(B.paint, XC0 + 0.05, XC1 - 0.05, -1.45, 1.45, ZC - 0.05, ZC);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XC1, XC1 + 0.02, s > 0 ? 0.45 : -1.38, s > 0 ? 1.38 : -0.45, 2.66, 3.00);
      box(B.glass, XC1 + 0.02, XC1 + 0.03, s > 0 ? 0.50 : -1.33, s > 0 ? 1.33 : -0.50, 2.70, 2.96);
      sideBox(B.dark, s, 1.50, 0.012, 2.05, 3.22, 1.86, 2.98);                                /* door seam field */
      sideBox(B.paint, s, 1.512, 0.012, 2.08, 3.19, 1.89, 2.95);
      sideBox(B.glass, s, 1.524, 0.01, 2.55, 3.05, 2.58, 2.90);
      sideBox(B.dark, s, 1.524, 0.03, 2.15, 2.30, 2.30, 2.34);
      sideBox(B.dark, s, 1.50, 0.012, XC0 + 0.06, XC0 + 0.24, 2.10, 2.70);                     /* rear vent */
    }
    box(B.dark, XC0, XC0 + 0.02, -1.20, 1.20, 2.00, 2.90);                                    /* rear wall seam */
    box(B.paint, XC0 + 0.02, XC0 + 0.04, -1.10, 1.10, 2.04, 2.86);
    box(B.dark, 2.20, 2.90, -0.40, 0.40, ZC, ZC + 0.05);                                      /* roof hatch */
    if (R.whip) {                                                                           /* whip aerial (Army-2016) */
      cylZ(B.dark, XC0 + 0.20, 0.90, ZC, ZC + 0.15, 0.05, 6);
      cyl(B.dark, [XC0 + 0.20, 0.90, ZC + 0.15], [XC0 + 0.20, 0.90, ZC + 1.8], 0.014, 0.008, 4, false, false);
    }
  }

  /* the turntable and the rotating platform ("turret", origin on the slewing ring): the trunnion cheeks at its rear,
     and the elevating rams lying forward under the cradle beam */
  function addMount(B) {
    var s, k;
    cyl(B.dark, [0, 0, 0.0], [0, 0, 0.10], 0.90, 0.90, 28);
    box(B.paint, -1.30, 1.15, -0.98, 0.98, 0.10, 0.40);
    box(B.dark, -1.30, 1.15, -1.00, 1.00, 0.36, 0.40);
    for (k = 0; k < 3; k++) box(B.dark, -0.90 + k * 0.70, -0.86 + k * 0.70, -1.00, 1.00, 0.12, 0.36);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, PVX - 0.24, PVX + 0.30, s * 0.29, s * 0.35, 0.10, PVZ + 0.12);           /* trunnion cheeks */
      cylY(B.dark, PVX, s * 0.20, s * 0.37, PVZ, 0.09, 10);                                   /* pins */
      box(B.dark, -0.60, 1.10, s * 0.70 - 0.20, s * 0.70 + 0.20, 0.40, 0.44);                 /* platform rails */
      cyl(B.dark, [0.95, s * 0.16, 0.44], [3.15, s * 0.16, 0.46], 0.075, 0.075, 10);         /* elevating rams */
      cyl(B.paint, [0.75, s * 0.16, 0.44], [1.50, s * 0.16, 0.44], 0.11, 0.11, 10);
    }
    box(B.paint, 0.60, 1.10, -0.30, 0.30, 0.40, 0.48);
    /* the raised housing between the trunnion cheeks, standing up into the gap of the lower rows behind the cradle
       beam: what is left standing under the pack once it is raised (museum side view) */
    box(B.paint, PVX + 0.30, 0.95, -0.34, 0.34, 0.40, 0.80);
    box(B.dark, PVX + 0.30, 0.95, -0.35, 0.35, 0.76, 0.80);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) box(B.dark, -0.55 + k * 0.45, -0.25 + k * 0.45, s * 0.34, s * 0.355, 0.48, 0.72);
  }

  /* the pack: twelve 300 mm tubes, four in the top row (columns 2-5 of six) and two either side in each lower row,
     the middle of the lower rows taken by the cradle beam (museum rear view and the Army-2016 rear view);
     group "podelev", origin on the trunnion */
  function addPack(B, cells) {
    var c, r, y, z, k, x, SL = [0.55, 2.20, 3.85, 5.50], yo = 2.5 * TP + TR, yi = 1.5 * TP + TR, zt = ROWZ[2] + TR, zb = ROWZ[0] - TR, zm = ROWZ[1] + TR;
    var cols = [[1, 2, 3, 4], [0, 1, 4, 5], [0, 1, 4, 5]];
    for (r = 0; r < 3; r++) for (k = 0; k < 4; k++) {
      c = cols[2 - r][k]; y = (c - 2.5) * TP; z = ROWZ[r];
      cylX(B.paint, TX0 + 0.24, TX1 - 0.12, y, z, TR, 14);
      cyl(B.paint, [TX0, y, z], [TX0 + 0.16, y, z], TR + 0.035, TR + 0.025, 14, true, false);  /* tail collar, flared, open */
      cyl(B.paint, [TX0 + 0.16, y, z], [TX0 + 0.24, y, z], TR + 0.025, TR, 14, true, true);
      cylX(B.dark, TX0 + 0.08, TX0 + 0.10, y, z, TR + 0.03, 12);                                /* the bore, seen down it */
      cyl(B.paint, [TX1 - 0.12, y, z], [TX1, y, z], TR + 0.018, TR + 0.018, 14, false, true);  /* mouth ring, open */
      cylX(B.dark, TX1 - 0.09, TX1 - 0.07, y, z, TR + 0.012, 12);
      cells.push([TX1 + 0.05, y, z, TX0]);
    }
    /* the cradle beam in the gap of the lower rows, and its rail under the pack */
    box(B.paint, 2.20, TX1 - 0.40, -0.27, 0.27, zb - 0.02, ROWZ[2] - TR + 0.01);
    box(B.dark, 2.20, TX1 - 0.40, -0.28, 0.28, zb - 0.06, zb - 0.02);
    for (k = 0; k < 4; k++) box(B.dark, 2.6 + k * 1.0, 2.64 + k * 1.0, -0.28, 0.28, zb, ROWZ[2] - TR);
    /* the cradle's side plates either side of the housing, from the trunnion lugs to the beam */
    for (c = -1; c <= 1; c += 2) box(B.paint, 0.30, 2.25, c * 0.36, c * 0.40, -0.12, zb + 0.10);
    box(B.paint, TX0 + 0.20, 0.10, -0.38, 0.38, ROWZ[2] - TR - 0.10, ROWZ[2] - TR);
    /* clamp frames at four stations, following the stepped outline: top, shoulders, flanks, belly; side lugs */
    for (k = 0; k < 4; k++) {
      x = SL[k];
      box(B.paint, x, x + 0.09, -yi + 0.02, yi - 0.02, zt, zt + 0.035);
      box(B.paint, x, x + 0.09, -yi - 0.035, -yi + 0.01, zm, zt + 0.035);
      box(B.paint, x, x + 0.09, yi - 0.01, yi + 0.035, zm, zt + 0.035);
      box(B.paint, x, x + 0.09, -yo, -yi + 0.02, zm, zm + 0.035);
      box(B.paint, x, x + 0.09, yi - 0.02, yo, zm, zm + 0.035);
      box(B.paint, x, x + 0.09, -yo - 0.035, -yo, zb, zm + 0.035);
      box(B.paint, x, x + 0.09, yo, yo + 0.035, zb, zm + 0.035);
      box(B.paint, x, x + 0.09, -yo, yo, zb - 0.035, zb);
      box(B.dark, x + 0.01, x + 0.08, -yo - 0.10, -yo - 0.035, ROWZ[1] - 0.06, ROWZ[1] + 0.06);
      box(B.dark, x + 0.01, x + 0.08, yo + 0.035, yo + 0.10, ROWZ[1] - 0.06, ROWZ[1] + 0.06);
    }
    /* the lattice frame binding the tails (2011 parade, rear) and the one behind the mouths */
    for (k = 0; k < 2; k++) {
      x = k ? TX1 - 0.55 : TX0 + 0.30;
      box(B.dark, x, x + 0.06, -yo, yo, ROWZ[0] + TP / 2 - 0.025, ROWZ[0] + TP / 2 + 0.025);
      box(B.dark, x, x + 0.06, -yi, yi, ROWZ[1] + TP / 2 - 0.025, ROWZ[1] + TP / 2 + 0.025);
      for (c = 0; c < 5; c++) {
        y = (c - 2) * TP;
        if (c === 2) continue;
        box(B.dark, x, x + 0.06, y - 0.025, y + 0.025, (c === 0 || c === 4) ? zb : ROWZ[0], (c === 0 || c === 4) ? zm : zt);
      }
    }
    /* trunnion lugs either side of the beam, round the pins */
    for (c = -1; c <= 1; c += 2) box(B.dark, -0.22, 0.30, c * 0.20, c * 0.28, -0.14, zb + 0.10);
    /* the one team strip, across the top two middle tubes */
    box(B.team, 2.80, 3.60, -0.24, 0.24, zt + 0.005, zt + 0.03);
  }

  function build(THREE, C, variant) {
    var R = ROWS[variant] || ROWS.p, T = materials(THREE, C, R.paint), g = new THREE.Group(), HB = bins(T), i, s, wg, wm, geo, TB;
    addChassis(HB, R);
    addCab(HB, R);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre, false);
    tyre(TB);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * TY, RT);
      wm = new THREE.Mesh(geo, T.tyre);
      if (s < 0) wm.rotation.y = Math.PI / 22;
      wg.add(wm);
      g.add(wg);
    }
    /* the launcher: "turret" (traverses on the ring) holding "podelev" (elevates about the rear trunnion) */
    var tur = new THREE.Group(), MB = bins(T), EB = bins(T), el = new THREE.Group(), cells = [];
    addMount(MB);
    flush(THREE, tur, MB);
    addPack(EB, cells);
    flush(THREE, el, EB);
    el.name = "podelev";
    el.position.set(PVX, 0, PVZ);
    el.userData.el = LAUNCH_EL;
    el.userData.cells = cells;
    tur.add(el);
    tur.name = "turret";
    tur.position.set(TX, 0, TZ);
    g.add(tur);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the tube tails to the front tow eyes, 12.37 m as published for the 9A52 */
UNIT_MODELS["pact_e80_mlrs"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "e80"); } };
UNIT_MODELS["pact_e90_mlrs"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "e90"); } };
UNIT_MODELS["pact_e00_mlrs"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "e00"); } };
UNIT_MODELS["mlrs_p"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "p"); } };
