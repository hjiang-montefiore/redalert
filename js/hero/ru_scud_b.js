/* ============ ru_scud_b.js - HERO model: R-17 Elbrus (8K14, Scud-B) on the 9P117 Uragan TEL (MAZ-543P 8x8) ============
   Full-quality redo (2026-10-24).  One key, kept: pact_e60_tel "Scud-B", "R-17 Elbrus on the 9P117 Uragan", e60-e80,
   turret:false, deploy:true (deploySec 6).  Drawn as the 9P117 of the 1960s-70s photographs (ru.wikipedia "R-17": the 9P117
   on the MAZ-543P was adopted in 1967).  Do NOT confuse with the 2P19 tracked launcher (ru_scud_a.js) or the Tochka.

   Sources (Wikimedia Commons, fetched at 960 px for this model):
     [S1] [S2] [S3] "9P117 TEL 9K72 Elbrus missile system ... Artillery museum, Saint-Petersburg pic1 / pic2 / pic3" - on the
          march: starboard front three-quarter, head-on, port front three-quarter.
     [R]  "SpB-Museum-artillery-84" (Vitaly Kuzmin) - from behind: the launch table folded up at the rear with its tubular hoop,
          the two rear jacks down on round foot plates.  [K] "SpB-Museum-artillery-82 / -83", front three-quarters.
     [top] "1980s - soviet Scud B.JPEG" (Soviet Military Power 1983, p. 37) - overhead from ahead: the two cab pods with their
          sloped fronts, the nose lying between them in a trough outlined by a raised rim, the searchlight in its guard on the
          port pod, an aerial post on the starboard pod.
     [M84] "SS-1C Scud B missiles on TEL.JPEG" (Soviet Military Power 1984) - a column on the march: the nose above the engine
          deck between the cabs.
     [L]  "9K72 Lviv.jpg" - port side, round upright.  [E] "Scud-launcher-England1.jpg" - starboard, upright, field green.
     [F]  "Front view of a Soviet made MAZ-543-TEL for SCUD missiles.jpeg" - head-on, upright: boom rails either side, the hoop.
     [T]  "9P117M in TLT-5318.JPG" (Togliatti) - raised about 45 degrees: the boom on the round's upper side.
     [M]  "Wz8K14 RB1.jpg" - the 8K14 round on its own: ogive nose, joint bands, four fins.
   No scale drawing of the 9P117 is on Commons; the plan rests on [top] and the published figures, the side stations on [L] and
   [E] scaled to the published wheelbase.
   Published: ru.wikipedia "MAZ-543": 11 657 x 3 050 x 2 900 mm, wheelbase 2 200 + 3 300 + 2 200, track 2 375, clearance
     400, two separate fibreglass cabs with the driver in the LEFT one; the MAZ-543P is the 9P117's chassis.  ru.wikipedia
     "R-17" (from the 8K14 technical description): 11 164 mm heels to tip, 880 mm body, 1 810 mm over the fins.
   CORRECTED from the old header: the round is 11.164 m (not 11.25); it HANGS UNDER the erector boom (the boom on its upper side
     in [T], on its rear side upright in [E][L]), not on a beam beneath it; it stands upright to fire ([L][E][F]: 90 degrees,
     not the 80 the old file used without a source); the separate cabs stand wholly ahead of the first axle ([L][E]), so the
     front overhang is 2.92 m, not 2.16; the jacks are drawn down when set up ([R]).  Kept: the 8x8 on 2.2 / 3.3 / 2.2 m, the
     1500x600 tyres, the split cab, the nose between the pods and the tail at the rear, the louvred grille, plain green.

   Recognition list (what each rests on; where it is in the code):
     1. Two separate cab pods either side of the round's nose, each with a big round-cornered windscreen on a raked front,
        rounded roof edges, two doors in tandem and a raked quarter window on its outer side [S1][S2][S3][top]: addCab.
     2. The wide grille housing between the pods, lower than they are, with its vertical slats and two straps [S2]: addCab.
     3. The heavy bumper the full width, lamps in its ends, the skid plate sloping back under the cabs [S2][S3]: addCab.
     4. The round's ogive nose lying above the engine deck between the pods, in a trough with a raised rim, and the wire hoop
        arching over it [S2][M84][top]: addCab (rim), addErector (hoop).
     5. The searchlight in its wire guard on the port pod, the whip aerial on the starboard pod [S2][S3][top][E]: addCab.
     6. 8x8 with the long 3.3 m gap between the pairs; 1500x600 lugged tyres on green dished wheels [S1][S3][L]: AX, tyre.
     7. The long flat-topped side bodies behind the cabs: louvred vents behind the cab, boxed down to the frame between the
        pairs with a door and a round port on the port side, two round ports on the starboard side; low lockers over the rear
        pair [S1][S3][L]: addBody.
     8. The R-17 round: 0.88 m body, joint bands, four fins in X at the tail [M][L][E]: addMissile.
     9. The erector boom over the round: box rails, ties and diagonals across its top, clamps, the clamp frame at a third of
        its length, the lighter clamp higher up [T][E][L][F][top]: addErector.
    10. The launch table folded up at the rear with its tubular hoop on the march [R][S1]: addTravel.
    11. Set up: the two rear jacks down on round foot plates, the table level under the heels [R][L]: addDeploy.
    12. Raised: the round upright at the rear of the vehicle, the boom behind it, the hoop over the tip [L][E][F]: "podelev".

   Poses: "travelpose" holds the table folded up and the jacks raised; "deploypose" (shown once e.deployed) the table level
     under the heels at z 1.33 and the jacks down.  How the real table swings between the two is NOT confirmed: it is drawn at
     its two ends.  "podelev" is the boom and round, hinged at x -4.75, z 2.35, raised to userData.el = 90 degrees while the
     launcher holds a target; userData.cells puts the motor's flash at the tail.  The hinge is placed so the round lies with
     its tip 0.45 m behind the bumper [top] and stands with its heels over the rear frame end [L][E]; the real boom is worked
     by a ram and its exact pivot is not published.  The ram is not drawn (it could not extend with the boom).
     A round raised before the unit has deployed shows the table still folded behind it (as Iskander's cover).
   Paint: plain Soviet green, no numbers or markings.  Sampled: [L] lit round #62613a, [S3] museum repaint in sun #978861
     (yellowed), [E] field green in shade #2c3532; drawn #4b5236 (about 0.8 of [L], the protective green of ru_smerch.js's
     e80 row #455437 a touch lighter) on a weathered canvas coat; the wheels the same green by vertex colour.
   NOT drawn (not confirmed): the erection ram, cable runs, stowage, nets, mirrors, cab interiors, the cab roof hatches'
     detail, any bort number or marking.
   Nodes: eight "roadwheel" groups, "podelev", "travelpose", "deploypose"; NOTHING named "turret" (turret:false).
   Materials 5 (paint with its canvas texture, dark, glass, tyre with vertex colours, C.team on a strip on each cab roof).
   Draw calls: hull 4 + wheels 8 + boom 2 + the pose shown 2 = 16.
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroScudB = (function () {
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
     +X nose, +Y port, +Z up, metres, tyres on z = 0.  MAZ-543P: 11 657 x 3 050 x 2 900 mm, wheelbase 2.2 + 3.3 + 2.2 m,
     track 2 375 mm, 1500x600-635 tyres (ru.wikipedia "MAZ-543").  The overhangs off [L] and [E] (the split cab stands wholly
     ahead of the first axle, its rear wall over the axle; the frame ends about a metre behind the last one). */
  var X1 = 5.86, XF = 5.74, XC0 = 2.90;              /* bumper face, cab front face, cab rear wall */
  var AX = [2.94, 0.74, -2.56, -4.76], TY = 1.19, RT = 0.75;
  var XR = -5.78;                                    /* rear frame end */
  var YO = 1.52, YG = 0.74, YI = 0.52, ZCR = 2.86;   /* cab pods: outer wall, lower inner wall beside the grille housing,
                                                      upper inner wall over it [S2] */
  var ZG = 2.22;                                     /* grille housing and engine deck between the pods */
  var BI = 0.70, BO = 1.50;                          /* side bodies: inner (trough) and outer wall */
  /* the erector: hinge over the last axle; the missile axis MZ above it, its heels MT behind it [L][T] */
  var HX = -4.75, HZ = 2.35, MZ = 0.45, MT = -1.00, ML = 11.164, MR = 0.44;
  var MTIP = MT + ML;                                /* 10.164 in the hinge frame: world x 5.41, 0.45 m behind the bumper [top] */
  var EL = Math.PI / 2;                              /* upright, as every erected photograph shows it [L][E][F] */
  var JX = -5.50, JY = 1.24;                         /* the rear stabiliser jacks [R] */
  var PAINT = { base: "#4b5236", blots: ["#434a30", "#545b3e", "#474e33"], seed: 17117 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.92, metalness: 0.03 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function lin(n) {
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }

  /* 1500x600-635 tyre: two lanes of lugs half a step apart over the crown; the dished wheel painted green with its hub
     and nut ring [S1][S3] */
  function tyre(bin, rim) {
    var N = 22, R = [[-0.30, 0.40, 0, 0], [-0.30, 0.63, 0, 0], [-0.25, 0.73, 1, 0], [-0.03, 0.75, 1, 0],
                     [0.03, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.63, 0, 0], [0.30, 0.40, 0, 0]];
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
      cyl(rim, [0, k * 0.29, 0], [0, k * 0.315, 0], 0.41, 0.36, 16, true, false);   /* the dish, its rim proud of the sidewall */
      cylY(rim, 0, k * 0.30, k * 0.36, 0, 0.15, 10);                                /* the hub */
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        cylY(rim, 0.25 * Math.cos(a), k * 0.31, k * 0.33, 0.25 * Math.sin(a), 0.028, 4);
      }
    }
  }

  /* one cab pod ring: a rounded box section between the inner wall yi and the outer wall yo (signed by s) */
  function podRing(x, s, zb, zt, inset) {
    var yo = YO - inset, notch = zt > 2.25, yu = notch ? YI : YG, zn = notch ? ZG : zt - 0.09, ro = 0.16, ri = 0.07, c = 0.2929;
    return [[x, s * YG, zb], [x, s * yo, zb], [x, s * yo, zt - ro], [x, s * (yo - ro * c), zt - ro * c], [x, s * (yo - ro), zt],
            [x, s * (yu + ri), zt], [x, s * (yu + ri * c), zt - ri * c], [x, s * yu, zt - ri], [x, s * yu, zn], [x, s * YG, zn]];
  }
  /* the windscreen slope: from the top of the front face (XF, 2.06) up and back to (5.30, 2.78) */
  var WS = [XF, 2.06], WD = [-0.44, 0.72], WL = Math.sqrt(0.44 * 0.44 + 0.72 * 0.72);
  var WU = [WD[0] / WL, 0, WD[1] / WL], WN = [WD[1] / WL, 0, -WD[0] / WL];

  /* the front: the two separate fibreglass cab pods, the grille housing between them, the bumper [S2][S3][top][F] */
  function addCab(B) {
    var s, k, y, x, rings, st, i, P0, w0, w1;
    st = [[XF, 1.30, 2.06, 0.12], [5.595, 1.30, 2.30, 0.05], [5.445, 1.30, 2.54, 0.01], [5.30, 1.30, 2.78, 0],
          [5.20, 1.30, 2.84, 0], [5.06, 1.30, ZCR, 0], [3.76, 1.30, ZCR, 0], [3.72, 1.62, ZCR, 0], [XC0, 1.62, ZCR, 0]];
    for (s = -1; s <= 1; s += 2) {
      rings = [];
      for (i = 0; i < st.length; i++) rings.push(podRing(st[i][0], s, st[i][1], st[i][2], st[i][3]));
      loft(B.paint, rings, false);
      /* windscreen: a dark frame and the big round-cornered pane on the slope [S2] */
      P0 = [WS[0], s * (YG + YO) / 2, WS[1]];
      w0 = (YG - 0.05 - (YG + YO) / 2); w1 = (YO - 0.10 - (YG + YO) / 2);
      planeBox(B.dark, P0, WU, [0, s, 0], WN, 0.03, 0.80, w0, w1, -0.01, 0.03);
      planeBox(B.glass, P0, WU, [0, s, 0], WN, 0.07, 0.76, w0 + 0.04, w1 - 0.04, 0.03, 0.05);
      planeBox(B.dark, P0, WU, [0, s, 0], WN, 0.40, 0.43, w0 + 0.04, w1 - 0.04, 0.05, 0.06);       /* the wiper bar */
      /* front face: the round lamp housing outboard, the small square hatch inboard, a seam above the bumper [S2] */
      y = s * (YO - 0.30);
      cylX(B.dark, XF - 0.02, XF + 0.08, y, 1.74, 0.12, 14);
      cylX(B.glass, XF + 0.08, XF + 0.095, y, 1.74, 0.08, 12);
      box(B.dark, XF - 0.01, XF + 0.015, s * 0.84, s * 1.06, 1.62, 1.80);
      box(B.paint, XF + 0.015, XF + 0.025, s * 0.86, s * 1.04, 1.64, 1.78);
      box(B.dark, XF - 0.01, XF + 0.012, s * (YG + 0.04), s * (YO - 0.10), 1.98, 2.00);
      for (k = 0; k < 5; k++) box(B.dark, XF, XF + 0.02, s * (YG + 0.08 + k * 0.15), s * (YG + 0.10 + k * 0.15), 1.94, 1.96);   /* rivet row */
      /* outer side: the raked quarter window and two doors in tandem, each with its window, handle and step [S1][S3] */
      x = s * YO;
      box(B.glass, 4.98, 5.28, x - (s > 0 ? 0 : 0.015), x + (s > 0 ? 0.015 : 0), 2.18, 2.60);
      box(B.dark, 4.16, 4.90, x - (s > 0 ? 0 : 0.01), x + (s > 0 ? 0.01 : 0), 1.40, 2.74);
      box(B.paint, 4.19, 4.87, x - (s > 0 ? 0 : 0.02), x + (s > 0 ? 0.02 : 0), 1.43, 2.71);
      box(B.glass, 4.30, 4.80, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 2.20, 2.62);
      box(B.dark, 3.36, 4.10, x - (s > 0 ? 0 : 0.01), x + (s > 0 ? 0.01 : 0), 1.70, 2.74);
      box(B.paint, 3.39, 4.07, x - (s > 0 ? 0 : 0.02), x + (s > 0 ? 0.02 : 0), 1.73, 2.71);
      box(B.glass, 3.48, 4.00, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 2.20, 2.62);
      for (k = 0; k < 2; k++) {
        box(B.dark, [4.78, 3.98][k], [4.88, 4.08][k], x - (s > 0 ? 0 : 0.04), x + (s > 0 ? 0.04 : 0), 2.00, 2.04);   /* handles */
        box(B.dark, [4.18, 3.38][k], [4.22, 3.42][k], x - (s > 0 ? 0 : 0.035), x + (s > 0 ? 0.035 : 0), [1.55, 1.85][k], [1.65, 1.95][k]);
      }
      box(B.dark, 4.25, 4.85, s * YO, s * (YO + 0.06), 1.18, 1.22);                                 /* the step under the front door */
      box(B.dark, 4.25, 4.30, s * YO, s * (YO + 0.03), 1.18, 1.30);
      box(B.dark, 4.80, 4.85, s * YO, s * (YO + 0.03), 1.18, 1.30);
      /* the wheel arch lip over the front wheel */
      box(B.dark, 2.20, 3.74, s * (YO - 0.62), s * YO, 1.58, 1.62);
      /* inner wall over the missile's nose: the mesh guard panel each side [S2] */
      box(B.dark, 4.30, 5.05, s * (YI - 0.012), s * YI, 2.30, 2.62);
      for (k = 0; k < 6; k++) box(B.paint, 4.34 + k * 0.13, 4.37 + k * 0.13, s * (YI - 0.02), s * YI, 2.31, 2.61);
      /* roof: drip rail at the front edge, a hatch, the team strip on the rear half */
      box(B.dark, 5.04, 5.10, s * (YI + 0.08), s * (YO - 0.10), ZCR - 0.01, ZCR + 0.025);
      box(B.paint, 3.60, 4.30, s * (YI + 0.22), s * (YO - 0.30), ZCR, ZCR + 0.04);
      box(B.dark, 3.60, 4.30, s * (YI + 0.22), s * (YO - 0.30), ZCR + 0.04, ZCR + 0.05);
      box(B.team, 3.02, 3.50, s * (YI + 0.15), s * (YO - 0.15), ZCR, ZCR + 0.02);
    }
    /* the port pod's searchlight on its inner front corner, in its wire guard [S2][S3][top] */
    cylZ(B.dark, 5.02, YI + 0.16, ZCR, ZCR + 0.16, 0.035, 6);
    cyl(B.dark, [4.94, YI + 0.16, ZCR + 0.26], [5.10, YI + 0.16, ZCR + 0.26], 0.10, 0.12, 12);
    cylX(B.glass, 5.10, 5.115, YI + 0.16, ZCR + 0.26, 0.10, 12);
    for (k = 0; k < 4; k++) {
      var ga = k / 4 * TAU + 0.785;
      bar(B.dark, [5.02 + 0.15 * Math.cos(ga), YI + 0.16 + 0.15 * Math.sin(ga), ZCR + 0.02],
                  [5.02 + 0.13 * Math.cos(ga), YI + 0.16 + 0.13 * Math.sin(ga), ZCR + 0.42], 0.018);
    }
    /* the starboard pod's aerial base and whip [top][E] */
    cylZ(B.dark, 4.55, -(YI + 0.40), ZCR, ZCR + 0.10, 0.07, 8);
    cyl(B.dark, [4.55, -(YI + 0.40), ZCR + 0.10], [4.55, -(YI + 0.40), ZCR + 2.10], 0.016, 0.007, 4, false, false);

    /* the grille housing between the pods: 22 vertical slats, two straps with latches; the engine deck above [S2][top] */
    box(B.paint, 3.90, XF + 0.04, -YG, YG, 1.15, ZG);
    box(B.dark, XF + 0.04, XF + 0.06, -YG + 0.06, YG - 0.06, 1.36, ZG - 0.06);
    for (k = 0; k < 26; k++) { y = -YG + 0.09 + k * (2 * YG - 0.18) / 25; box(B.paint, XF + 0.05, XF + 0.10, y - 0.017, y + 0.017, 1.37, ZG - 0.07); }
    for (k = 0; k < 2; k++) {
      box(B.paint, XF + 0.09, XF + 0.12, -YG + 0.07, YG - 0.07, [1.70, 2.02][k], [1.73, 2.05][k]);
      for (i = -1; i <= 1; i += 2) box(B.dark, XF + 0.11, XF + 0.14, i * 0.36 - 0.03, i * 0.36 + 0.03, [1.66, 1.98][k], [1.78, 2.10][k]);
    }
    box(B.paint, XF - 0.20, XF + 0.06, -YG, YG, ZG - 0.06, ZG);                                     /* the housing's top lip */
    for (k = 0; k < 2; k++) box(B.dark, XF - 0.14, XF - 0.08, k ? 0.20 : -0.30, k ? 0.30 : -0.20, ZG, ZG + 0.03);
    for (k = 0; k < 3; k++) box(B.dark, 4.10 + k * 0.50, 4.13 + k * 0.50, -YI + 0.03, YI - 0.03, ZG, ZG + 0.01);
    /* the raised rim round the nose (the light outline in the 1983 overhead photograph) */
    var rim = [[3.00, 0.50], [4.10, 0.47], [4.80, 0.37], [5.30, 0.22], [5.62, 0.0]];
    for (s = -1; s <= 1; s += 2) for (k = 0; k < rim.length - 1; k++)
      bar(B.paint, [rim[k][0], s * rim[k][1], 2.38], [rim[k + 1][0], s * rim[k + 1][1], 2.38], 0.05);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) bar(B.paint, [rim[k + 1][0], s * rim[k + 1][1], 2.36], [rim[k + 1][0], s * (YI - 0.01), 2.30], 0.04);

    /* the bumper: a heavy beam with the skid plate sloping back under the cabs, lamps in its ends, the tow hooks [S2][S3] */
    profY(B.dark, [[5.30, 0.82], [X1, 1.15], [X1, 1.55], [XF, 1.55], [5.30, 1.25]], -YO + 0.02, YO - 0.02);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        y = s * [1.12, 1.32][k];
        cylX(B.dark, X1, X1 + 0.03, y, 1.37, 0.075, 10);
        cylX(B.glass, X1 + 0.03, X1 + 0.04, y, 1.37, 0.055, 10);
      }
      box(B.dark, X1, X1 + 0.05, s * 0.42 - 0.06, s * 0.42 + 0.06, 1.24, 1.44);                        /* tow hooks */
      box(B.dark, X1 - 0.30, X1 - 0.02, s * 1.30, s * 1.38, 0.84, 1.15);                               /* the step bracket */
      box(B.dark, X1 - 0.30, X1 - 0.02, s * 1.30, s * 1.42, 0.92, 0.95);
    }
    box(B.dark, X1, X1 + 0.04, -0.14, 0.14, 1.28, 1.42);
  }

  /* the chassis, the side bodies behind the cabs, the rear deck [S1][S3][L][E][R] */
  function addBody(B) {
    var s, k, i, x, y, yo, yi;
    box(B.dark, XR + 0.15, 5.40, -0.55, 0.55, 0.95, 1.40);                                            /* frame */
    for (i = 0; i < 4; i++) {
      cylY(B.dark, AX[i], -0.92, 0.92, RT, 0.11, 8);
      box(B.dark, AX[i] - 0.24, AX[i] + 0.24, -0.32, 0.32, 0.50, 0.95);                                /* axle housings */
    }
    /* the rear fork: the frame rails stand apart behind the hinge, so the round's heels pass between them */
    for (s = -1; s <= 1; s += 2) box(B.dark, XR, -4.40, s * 0.72, s * 0.86, 0.95, 1.42);
    box(B.dark, XR, XR + 0.16, -1.44, 1.44, 0.98, 1.30);                                                /* rear beam */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XR - 0.08, XR, s * 1.05 - 0.07, s * 1.05 + 0.07, 1.00, 1.14);                          /* tow eyes */
      box(B.glass, XR - 0.03, XR, s * 1.30 - 0.08, s * 1.30 + 0.08, 1.16, 1.26);                         /* tail lamps */
    }
    for (s = -1; s <= 1; s += 2) {
      yo = s * BO; yi = s * BI;
      /* section A, over the first two axles: tall, flat-topped, the louvred vents behind the cab [S1][S3] */
      box(B.paint, 0.30, XC0, yi, yo, 1.62, 2.80);
      box(B.paint, 0.36, XC0 - 0.06, s * (BI + 0.04), s * (BO - 0.04), 2.80, 2.84);                     /* the lid */
      box(B.dark, 0.36, XC0 - 0.06, s * (BI + 0.02), s * (BO - 0.02), 2.795, 2.805);
      for (k = 0; k < (s > 0 ? 2 : 1); k++) {
        sideBox(B.dark, s, BO, 0.012, 2.28, 2.78, [2.30, 1.88][k], [2.64, 2.22][k]);
        for (i = 0; i < 6; i++) sideBox(B.paint, s, BO + 0.012, 0.02, 2.31 + i * 0.08, 2.35 + i * 0.08, [2.32, 1.90][k], [2.62, 2.20][k]);
      }
      for (i = 0; i < 3; i++) sideBox(B.dark, s, BO, 0.012, [2.12, 1.28, 0.42][i], [2.14, 1.30, 0.44][i], 1.66, 2.76);   /* panel seams */
      sideBox(B.dark, s, BO, 0.012, 0.50, 2.06, 1.66, 1.68);
      for (i = 0; i < 3; i++) sideBox(B.dark, s, BO, 0.04, [0.80, 1.60, 1.95][i], [0.90, 1.70, 2.05][i], 2.10, 2.15);   /* latches */
      /* section B, between the axle pairs: a little lower, and boxed down to the frame between the wheels [L][S1] */
      box(B.paint, -2.40, 0.30, yi, yo, 1.62, 2.72);
      box(B.paint, -2.34, 0.26, s * (BI + 0.04), s * (BO - 0.04), 2.72, 2.76);
      box(B.paint, -1.74, -0.04, s * 0.60, yo, 1.10, 1.62);
      sideBox(B.dark, s, BO, 0.012, -2.40, -2.36, 1.66, 2.70);
      sideBox(B.dark, s, BO, 0.012, -0.04, -0.02, 1.12, 2.70);
      if (s > 0) {                                                                                       /* port: the door with its round port [L] */
        sideBox(B.dark, s, BO, 0.012, -1.35, -0.62, 1.20, 2.58);
        sideBox(B.paint, s, BO + 0.012, 0.012, -1.32, -0.65, 1.23, 2.55);
        cylY(B.dark, -0.98, BO + 0.02, BO + 0.05, 2.22, 0.14, 14);
        cylY(B.paint, -0.98, BO + 0.05, BO + 0.06, 2.22, 0.11, 14);
        sideBox(B.dark, s, BO + 0.024, 0.03, -0.75, -0.69, 1.80, 1.95);
      } else {                                                                                           /* starboard: two round ports [S1] */
        for (k = 0; k < 2; k++) {
          cylY(B.dark, [-1.55, -0.95][k], -BO - 0.05, -BO - 0.02, 2.15, 0.14, 14);
          cylY(B.paint, [-1.55, -0.95][k], -BO - 0.06, -BO - 0.05, 2.15, 0.11, 14);
        }
        sideBox(B.dark, s, BO, 0.012, -2.10, -0.30, 1.30, 1.32);
      }
      for (k = 0; k < 4; k++) sideBox(B.dark, s, BO, 0.03, -1.65 + k * 0.42, -1.58 + k * 0.42, 1.14, 1.18);   /* the ribs of the lower box */
      /* the fuel tank between the first pair, its straps [L] */
      box(B.paint, 1.56, 2.14, s * 0.95, s * 1.42, 0.92, 1.58);
      for (k = 0; k < 2; k++) box(B.dark, [1.66, 1.98][k], [1.70, 2.02][k], s * 0.94, s * 1.43, 0.91, 1.59);
      /* section C, over the rear pair: low lockers each side of the erector bed [L][E] */
      box(B.paint, -5.30, -2.40, s * 0.92, yo, 1.62, 2.28);
      box(B.paint, -5.26, -2.44, s * 0.96, s * (BO - 0.04), 2.28, 2.31);
      for (k = 0; k < 3; k++) sideBox(B.dark, s, BO, 0.012, -5.20 + k * 0.95, -5.18 + k * 0.95, 1.66, 2.26);
      for (k = 0; k < 3; k++) sideBox(B.dark, s, BO, 0.04, -4.80 + k * 0.95, -4.70 + k * 0.95, 2.08, 2.13);
      /* mudguards: the flat deck edge over the rear pair, mud flaps behind each pair */
      box(B.paint, -5.55, -1.74, s * 0.86, yo, 1.56, 1.62);
      box(B.dark, -5.58, -5.54, s * 0.92, s * (BO - 0.06), 0.45, 1.56);
      box(B.dark, -0.06, -0.02, s * 0.92, s * (BO - 0.06), 0.45, 1.10);
      box(B.paint, 0.0, 2.20, s * 0.86, yo, 1.56, 1.62);
      /* the rear stabiliser jack housings at the rear corners [R] */
      cylZ(B.paint, JX, s * JY, 0.96, 1.90, 0.12, 12);
      cylZ(B.dark, JX, s * JY, 1.78, 1.86, 0.15, 12);
      box(B.dark, JX - 0.08, JX + 0.08, s * 0.86, s * (JY - 0.08), 1.30, 1.46);
      /* the hinge cheeks of the erector on the frame [L] */
      box(B.paint, HX - 0.34, HX + 0.40, s * 0.84, s * 0.94, 1.40, HZ + 0.14);
      cylY(B.dark, HX, s * 0.80, s * 0.98, HZ, 0.12, 12);
      /* exhaust stub behind the starboard cab */
      if (s < 0) cylY(B.dark, XC0 - 0.25, -BO - 0.10, -BO, 1.66, 0.07, 8);
    }
    /* the trough floor under the round and the erector bed between the lockers */
    box(B.dark, -2.40, XC0, -BI, BI, 2.06, 2.12);
    box(B.paint, -2.40, 3.90, -BI, BI, 1.40, 2.06);
    box(B.paint, -4.40, -2.40, -0.92, 0.92, 1.40, 1.86);
    box(B.dark, -4.40, -2.40, -0.90, 0.90, 1.86, 1.89);
    for (k = 0; k < 3; k++) box(B.dark, -4.20 + k * 0.62, -4.16 + k * 0.62, -0.88, 0.88, 1.89, 1.92);
    /* the travel rest under the round, behind the cabs */
    for (s = -1; s <= 1; s += 2) box(B.paint, XC0 - 0.40, XC0 - 0.20, s * 0.40, s * 0.56, 2.12, 2.36);
    box(B.dark, XC0 - 0.44, XC0 - 0.16, -0.56, 0.56, 2.30, 2.34);
  }

  /* the R-17 (8K14): 11 164 mm heels to tip, 880 mm body, 1 810 mm over the fins (ru.wikipedia "R-17", from the
     8K14 technical description); the ogive nose, the warhead and instrument joints, the tank joints, four fins in X [M][L][E].
     Frame: the hinge; x along the boom, the missile axis at z = MZ. */
  function addMissile(B) {
    var i, k, a, ca, sa, V, q, hh, pts, t0 = MT, tip = MTIP;
    revolve(B.paint, [[t0, 0.30], [t0 + 0.03, 0.40], [t0 + 0.08, MR], [tip - 3.20, MR], [tip - 3.16, MR + 0.012], [tip - 3.10, MR + 0.012],
                      [tip - 3.06, MR], [tip - 2.36, MR], [tip - 2.30, MR - 0.005], [tip - 1.90, 0.405], [tip - 1.30, 0.33],
                      [tip - 0.80, 0.245], [tip - 0.40, 0.15], [tip - 0.12, 0.06], [tip, 0.0]], 0, MZ, 24);
    for (i = 0; i < 4; i++) revolve(B.dark, [[[t0 + 1.70, tip - 6.80, tip - 4.90, tip - 2.34][i] - 0.025, MR + 0.006],
                                             [[t0 + 1.70, tip - 6.80, tip - 4.90, tip - 2.34][i] + 0.025, MR + 0.006]], 0, MZ, 20);
    cyl(B.dark, [t0 - 0.02, 0, MZ], [t0 + 0.05, 0, MZ], 0.24, 0.30, 14);                          /* the nozzle in the tail */
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a);
      pts = [[t0 + 0.08, MR - 0.02], [t0 + 1.40, MR - 0.02], [t0 + 0.72, 0.905], [t0 + 0.16, 0.905]]; V = [];
      for (k = 0; k < 8; k++) {
        q = pts[k % 4]; hh = k < 4 ? -0.022 : 0.022;
        V.push([q[0], q[1] * ca - hh * sa, MZ + q[1] * sa + hh * ca]);
      }
      hexa(B.paint, V);
    }
  }

  /* the erector boom: the round hangs under it.  Two box rails along the upper half of the round, cross ties and diagonals
     over its top, clamps closing over it, the clamp frame round it at a third of its length and a lighter one higher up,
     the wire hoop over the nose, the foot down to the trunnion.  Raised, the boom stands on the rear side of the round
     [T: the 42-degree view shows the boom on the round's upper side][E][L: on its rear side, upright][top][F][S2] */
  function addErector(B) {
    var s, i, k, fx, a0, a1, n, P, RX0 = 0.50, RX1 = 7.60, RY = 0.58, ZR0 = MZ - 0.05, ZR1 = MZ + 0.40, ZT = MZ + MR + 0.03;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, RX0, RX1, s * (RY - 0.06), s * (RY + 0.06), ZR0, ZR1);
      box(B.dark, RX0, RX1, s * (RY + 0.06), s * (RY + 0.075), ZR0 + 0.10, ZR1 - 0.10);
      /* the foot: cheeks from the trunnion up to the rails, the pin */
      profY(B.paint, [[-0.26, -0.14], [0.30, -0.18], [RX0 + 0.30, ZR0], [RX0 + 0.30, ZR1], [-0.10, 0.30]], s * 0.72, s * 0.80);
      box(B.paint, 0.20, RX0 + 0.30, s * (RY - 0.06), s * 0.72, ZR0, ZR0 + 0.30);
    }
    cylY(B.dark, 0, -0.84, 0.84, 0, 0.09, 12);
    box(B.paint, -0.20, 0.20, -0.72, 0.72, -0.24, -0.12);                                              /* the foot's cross beam */
    for (i = 0; i < 7; i++) {
      fx = RX0 + 0.30 + i * 1.10;
      box(B.paint, fx - 0.05, fx + 0.05, -RY - 0.06, RY + 0.06, ZT, ZT + 0.09);
      if (i < 6) {
        bar(B.dark, [fx, -RY + 0.02, ZT + 0.045], [fx + 1.10, RY - 0.02, ZT + 0.045], 0.035);
        bar(B.dark, [fx, RY - 0.02, ZT + 0.045], [fx + 1.10, -RY + 0.02, ZT + 0.045], 0.035);
      }
    }
    /* the clamps closing over the round, padded [T][top] */
    for (i = 0; i < 3; i++) {
      fx = [1.20, 3.90, 6.70][i]; n = 7;
      for (k = 0; k < n; k++) {
        a0 = Math.PI * 0.10 + k / n * Math.PI * 0.80; a1 = Math.PI * 0.10 + (k + 1) / n * Math.PI * 0.80;
        bar(B.paint, [fx, (MR + 0.05) * Math.cos(a0), MZ + (MR + 0.05) * Math.sin(a0)], [fx, (MR + 0.05) * Math.cos(a1), MZ + (MR + 0.05) * Math.sin(a1)], 0.09);
      }
      for (s = -1; s <= 1; s += 2) box(B.dark, fx - 0.06, fx + 0.06, s * (MR + 0.02), s * (RY - 0.06), MZ + 0.08, MZ + 0.18);
    }
    /* the clamp frame at a third of the length: a square frame round the round [E][L][F] */
    fx = 2.05;
    for (s = -1; s <= 1; s += 2) box(B.paint, fx - 0.18, fx + 0.18, s * (RY - 0.06), s * (RY + 0.14), MZ - MR - 0.14, ZT + 0.12);
    box(B.paint, fx - 0.18, fx + 0.18, -RY - 0.14, RY + 0.14, MZ - MR - 0.14, MZ - MR - 0.04);
    box(B.paint, fx - 0.18, fx + 0.18, -RY - 0.14, RY + 0.14, ZT + 0.02, ZT + 0.12);
    box(B.dark, fx - 0.20, fx + 0.20, -RY - 0.15, RY + 0.15, ZT + 0.12, ZT + 0.14);
    /* the lighter clamp higher up [F] */
    fx = 6.20;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, fx - 0.08, fx + 0.08, s * (RY - 0.05), s * (RY + 0.10), MZ - 0.30, ZR1);
      bar(B.dark, [fx, s * (RY - 0.04), MZ - 0.28], [fx, s * 0.30, MZ - MR + 0.06], 0.045);
    }
    /* the wire hoop: off the rails' front ends, narrowing between the cabs, arching over the nose to just past the tip
       [S2: an arch over the nose seen from ahead][E: over the tip, upright][T] */
    P = [[RX1, RY, ZR1], [8.40, 0.48, ZR1 + 0.06], [9.20, 0.42, ZR1 + 0.06], [9.80, 0.32, ZR1], [10.18, 0.18, ZR1 - 0.10], [10.36, 0.0, ZR1 - 0.16]];
    for (s = -1; s <= 1; s += 2) for (k = 0; k < P.length - 1; k++)
      bar(B.paint, [P[k][0], s * P[k][1], P[k][2]], [P[k + 1][0], s * P[k + 1][1], P[k + 1][2]], 0.04);
    for (s = -1; s <= 1; s += 2) bar(B.paint, [RX1 - 0.60, s * RY, ZR0 + 0.05], [8.40, s * 0.48, ZR1 + 0.06], 0.035);
  }

  /* travel: the launch table folded up at the rear behind the heels, its tubular hoop over it; the jacks raised [R][S1] */
  function addTravel(B) {
    var s, k, x0 = XR - 0.12, x1 = XR - 0.04;
    box(B.dark, XR - 0.14, XR + 0.04, -0.96, 0.96, 1.30, 1.46);                                       /* the table's hinge beam */
    box(B.paint, x0, x1, -0.76, -0.62, 1.46, 2.96);
    box(B.paint, x0, x1, 0.62, 0.76, 1.46, 2.96);
    box(B.paint, x0, x1, -0.76, 0.76, 1.46, 1.60);
    box(B.paint, x0, x1, -0.76, 0.76, 2.82, 2.96);
    box(B.dark, x0 + 0.03, x1 - 0.01, -0.62, 0.62, 1.60, 2.82);                                          /* the table face */
    for (k = 0; k < 4; k++) box(B.paint, x0 - 0.02, x0 + 0.02, -0.60, 0.60, 1.86 + k * 0.24, 1.90 + k * 0.24);
    cyl(B.paint, [x0 - 0.10, 0, 2.21], [x0, 0, 2.21], 0.12, 0.30, 12);                                  /* the deflector cone, seen end on */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.paint, [XR - 0.08, s * 0.86, 2.00], [XR - 0.08, s * 0.86, 3.02], 0.035, 0.035, 8);
      cyl(B.paint, [XR - 0.08, s * 0.86, 3.02], [XR - 0.08, s * 0.74, 3.16], 0.035, 0.035, 8);
      box(B.dark, XR - 0.12, XR - 0.04, s * 0.76, s * 0.90, 2.40, 2.46);
      /* the jacks up: ram in, foot plate tucked under the housing */
      cylZ(B.dark, JX, s * JY, 0.80, 0.96, 0.06, 8);
      cyl(B.dark, [JX, s * JY, 0.74], [JX, s * JY, 0.80], 0.22, 0.20, 14);
    }
    cyl(B.paint, [XR - 0.08, -0.74, 3.16], [XR - 0.08, 0.74, 3.16], 0.035, 0.035, 8);
  }
  /* set up: the table swung down level under the round's heels, struts back to its hinge beam; the jacks down on their
     foot plates [R][L].  How the real table swings between the two is not confirmed: it is drawn at its two ends. */
  function addDeploy(B) {
    var s, k, cx = HX - MZ, z1 = HZ + MT - 0.02, h = 0.56;
    box(B.dark, XR - 0.14, XR + 0.04, -0.96, 0.96, 1.30, 1.46);
    box(B.paint, cx - h, cx + h, -h, -h + 0.14, z1 - 0.14, z1);
    box(B.paint, cx - h, cx + h, h - 0.14, h, z1 - 0.14, z1);
    box(B.paint, cx - h, cx - h + 0.14, -h, h, z1 - 0.14, z1);
    box(B.paint, cx + h - 0.14, cx + h, -h, h, z1 - 0.14, z1);
    cyl(B.paint, [cx, 0, z1 - 0.62], [cx, 0, z1 - 0.10], 0.34, 0.06, 14);                                /* the deflector cone */
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [cx - h * s, s * h, z1 - 0.14], [cx, s * 0.12, z1 - 0.60], 0.05);
      bar(B.paint, [cx - h + 0.07, s * (h - 0.07), z1 - 0.07], [XR + 0.02, s * 0.80, 1.38], 0.07);
      cylZ(B.dark, JX, s * JY, 0.06, 0.96, 0.06, 8);
      cyl(B.dark, [JX, s * JY, 0.0], [JX, s * JY, 0.06], 0.26, 0.24, 16);
      /* the hoop, laid down behind */
      cyl(B.paint, [cx + h, s * 0.70, z1 - 0.07], [XR - 0.20, s * 0.70, z1 - 0.07], 0.035, 0.035, 8);
    }
    cyl(B.paint, [XR - 0.20, -0.70, z1 - 0.07], [XR - 0.20, 0.70, z1 - 0.07], 0.035, 0.035, 8);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, s, wg, wm, geo, TB, RB, E, EB, TR, DP, trg, dpg;
    addCab(HB);
    addBody(HB);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre, false); RB = new Bin(T.tyre, false);
    tyre(TB, RB);
    var cr = lin(0x1c1d1f), cw = lin(0x3c412f), col = [];
    for (i = 0; i < TB.P.length / 3; i++) col.push(cr[0], cr[1], cr[2]);
    for (i = 0; i < RB.P.length / 3; i++) col.push(cw[0], cw[1], cw[2]);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P.concat(RB.P)), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N.concat(RB.N)), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(col), 3));
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * TY, RT);
      wm = new THREE.Mesh(geo, T.tyre);
      if (s < 0) wm.rotation.y = Math.PI / 26;
      wg.add(wm);
      g.add(wg);
    }
    TR = bins(T); addTravel(TR);
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { paint: TR.paint, dark: TR.dark });
    g.add(trg);
    DP = bins(T); addDeploy(DP);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { paint: DP.paint, dark: DP.dark });
    g.add(dpg);
    EB = bins(T);
    addMissile(EB);
    addErector(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    flush(THREE, E, { paint: EB.paint, dark: EB.dark });
    E.userData.el = EL;
    E.userData.cells = [[MT + 1.50, 0, MZ, MT - 0.30]];
    g.add(E);
    g.name = "pact_e60_tel";
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent over both poses: the tow hooks (+5.91) to the table's hoop laid down behind the frame
   (-6.015); the chassis itself is 11.66 m as published, the travel pose 11.91 m */
UNIT_MODELS["pact_e60_tel"] = {
  len: 11.93,
  build: function (THREE, M, C) { return HeroScudB.build(THREE, M, C); }
};
