/* ============ ru_krasukha.js - HERO model: 1RL257 Krasukha-4 electronic-warfare station on the KamAZ-6350 8x8 ============
   One row, one vehicle:
     ewv_p  "1RL257 Krasukha-4"   (rules.js, from e00; turret:true, tturn 0.7, NOT deploy:true)

   References (Wikimedia Commons, fetched at width 960 for this redo; nothing copied):
     r1 "MAKS2015part6-51.jpg"                  right side, antenna raised (MAKS 2015, labelled 1RL257E Krasukha-4)
     r2 "1RL257E Krasukha-4.jpg"                front-left three-quarter in the field, antenna raised, facing forward
     r3 "1RL257E Krasukha-4 (1).jpg"            distant right side in the field
     r4 "1RL257E Krasukha-4 Army-2018.jpg"      cab and front of the body close up, front-right ("based on Kamaz 6350 chassis")
     r5 "1RL257E Krasukha-4 Army-2022 2022-08-20 2459.jpg"  front-left three-quarter, head turned to the left
     r6 "1RL257E Krasukha-4 Army-2022 2022-08-20 2461.jpg"  the antenna head from over the cab: three dishes, sensor mast
     r7 "Zastava 2024 - Krasuha - 02.jpg"       clean right side on the march (Serbian; its three-tone paint NOT copied)
     r8 "MAKS2015part6-52.jpg"                  right side, near orthogonal: the measuring view (vitalykuzmin.net)
     r9 "MAKS2015part6-53.jpg"                  rear-left three-quarter
   Published figures (ru.wikipedia "KAMAZ-6350"): length 9 850 mm, width 2 500, cab height 3 080, wheelbase
     1 940 + 3 340 + 1 320, track 2 050, tyres 425/85R21 (1.26 m).  The Krasukha-4 body has no published dimensions.

   CHASSIS: every labelled Krasukha-4 photograph (r1-r9) shows the KamAZ-6350 cab and axle layout, and r4's own
     caption says "based on Kamaz 6350 chassis".  The BAZ-6910-022 belongs to the Krasukha-2 (1L269, Commons
     "1L269E Krasukha-2 Army-2018.jpg"), so the KamAZ is drawn.  The old file said the same.

   RECOGNITION LIST (each one drawn; reference in brackets):
     1. KamAZ-6350 cab-over cab: flat front, two-pane windscreen, grille between round lamps, black bumper,
        big black front wheel arch, door with large window, tall mirror on an arm, steps (r2 r4 r5)
     2. four single-tyre axles 1.94 / 3.34 / 1.32 m apart, the wide gap between the second and third (r1 r7 r8)
     3. the long ribbed shelter from behind the cab almost to the tail, with the low rear compartment and its
        louvre panel (r1 r8 r9)
     4. right flank: two canvas-covered windows with hatches below, a glazed window, the side door (r1 r8);
        left flank: front window, louvre panel, door (r5 r9)
     5. zig-zag truss rails along both roof edges (r1 r8 r9)
     6. the flat sloped-sided cover on the forward roof and the ladder-frame rack running out over the cab
        roof on struts, with a grating over the cab-shelter gap (r1 r2 r4 r5 r8)
     7. spare wheel standing on edge behind the cab on the right, the transverse tank above it, the air intake
        on the cab back (r1 r4 r8)
     8. stabiliser jacks: a pair ahead of the second axle and a pair at the tail, braced to the frame (r1 r2 r8 r9)
     9. the antenna head on its turntable: equipment column between two tall side plates, a drum under it,
        TWO large dishes (about 1.8-2.0 m) out to the sides and ONE smaller dish (about 1.0 m) on top (r2 r5 r6 r8)
    10. the dish backs ribbed (r8 r9), the column front with lamps, camera tube and the ring mount (r6)
    11. the sensor mast behind the head, about 6.7 m to the top, braced fore and aft by two struts, topped by
        a ring of camera lenses over a pale sensor box (r1 r5 r6 r8 r9)
     12. plain Russian green, a single coat (r1 r2 r4 r5 r8)

   Measured off r8 (scale from the published axle spacing, 80-85 px/m) and checked against r1 and r7:
     front axle +3.30, 2nd +1.36, 3rd -1.98, 4th -3.30; bumper +4.48, cab face +4.36, cab back +2.40;
     shelter +1.27 .. -4.41, floor 1.33, roof 3.27; rear compartment to -5.25; overall 9.80 m (published 9.85);
     shelter 2.50 wide (published vehicle width); antenna turntable at -2.35, head column 0.4-2.0 m over the
     roof; side dishes 1.84 m across (r1 r8 give 2.0-2.1 m by vertical extent, r6 about 1.2-1.3 times the column
     width; drawn between the two), top dish 1.04 m (0.55 of a side dish, r6); dishes span 4.9 m (r2 about 5);
     mast at -3.55, sensor ring at 6.45 m, top 6.8 m (r1 r8: 6.4-6.6 m).

   POSE: the row is NOT deploy:true, so render3d never swaps a "travelpose"/"deploypose" pair for it
     (render3d.js: g.def.deploy).  One pose is drawn: the antenna raised (r1 r2 r5 r6 r8 r9), since the row jams
     and trains its turret in play.  r7 shows the march pose (head and mast folded forward onto the cab rack);
     it is not drawn.  The jacks are drawn stowed (r7), because the unit drives in that pose.
   The mast does NOT turn with the head: in r6 (head forward) and r8 (head turned aft) it stands at the same place
     behind it on the centre line, so it is hull.  The head on its turntable is the trained node "turret"
     (origin on the roof, at rest facing +X).
   NOT drawn: camouflage netting, flags, the tall guyed mast of the neighbouring vehicle (r2), cables, the
     hazard placard and the "6350" badge, numerals, the cab interior.
   Paint: plain green, sampled on r1 r2 r5 r8 (about 0x505040 average), taken to about 0.85: 0x4a4c38.
     The canvas window covers are beige (r1 r8), the sensor box pale grey (r5 r6).
   Nodes: "turret" and four "roadwheel" groups (one per axle, spinning about Y; axle height = tyre radius).
   Materials (6): paint (canvas texture in metre UVs; also the wheel rims), dark, glass, tyre, canvas (window covers,
     sensor box), team (two small up-facing strips, 0.9 x 0.1 m, on the rack beams over the cab, as the first build).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKrasukha = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var PAINT = { base: "#4a4c38", blots: ["#42452f", "#53553f", "#474a33"], seed: 1269 };
  var AXL = [3.30, 1.36, -1.98, -3.30];        /* axle x: 1.94 + 3.34 + 1.32 (published) */
  var RT = 0.63, TY = 1.025, TWH = 0.21;       /* tyre radius, half track, tyre half width (425/85R21) */
  var ZS = 1.33, ZR = 3.27;                    /* shelter floor, shelter roof */
  var XF = 1.27, XB = -4.41, XT = -5.25;       /* shelter front and back walls, tail of the rear compartment */
  var HW = 1.25;                               /* shelter half width */
  var TX = -2.35;                              /* turntable centre x on the roof */
  var MX = -3.55;                              /* sensor mast x */

  /* -------------------------------------------------------- geometry kit (as the first build, after ru_zoopark.js) */
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

  /* a paraboloid dish: vertex at C, opening toward unit axis ax, radius R, depth d, a shell of thickness th.
     Every triangle is turned to face its own way (front: along ax, back: against it, rim: outward) */
  function dish(bin, C, ax, R, d, seg, rings, th) {
    var t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t)), v = cross(ax, u);
    var i, j, k, q, am;
    function pt(r0, h0, a0) {
      return [C[0] + ax[0] * h0 + (u[0] * Math.cos(a0) + v[0] * Math.sin(a0)) * r0,
              C[1] + ax[1] * h0 + (u[1] * Math.cos(a0) + v[1] * Math.sin(a0)) * r0,
              C[2] + ax[2] * h0 + (u[2] * Math.cos(a0) + v[2] * Math.sin(a0)) * r0];
    }
    function tr(a, b, c, ref) {
      if (dot(cross(sub(b, a), sub(c, a)), ref) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
    }
    function ring(i0, off) { q = i0 / rings; return [R * q, d * q * q + off]; }
    var side, off, ref, rr, p0, p1, p2, p3, a0, a1;
    for (side = 0; side < 2; side++) {
      off = side ? -th : 0; ref = side ? [-ax[0], -ax[1], -ax[2]] : ax;
      for (j = 0; j < seg; j++) {
        a0 = j / seg * TAU; a1 = (j + 1) / seg * TAU;
        rr = ring(1, off);
        tr(pt(0, off, 0), pt(rr[0], rr[1], a0), pt(rr[0], rr[1], a1), ref);
        for (i = 1; i < rings; i++) {
          rr = ring(i, off); var r2 = ring(i + 1, off);
          p0 = pt(rr[0], rr[1], a0); p1 = pt(rr[0], rr[1], a1); p2 = pt(r2[0], r2[1], a1); p3 = pt(r2[0], r2[1], a0);
          tr(p0, p3, p2, ref); tr(p0, p2, p1, ref);
        }
      }
    }
    for (j = 0; j < seg; j++) {
      a0 = j / seg * TAU; a1 = (j + 1) / seg * TAU; am = (a0 + a1) / 2;
      ref = [u[0] * Math.cos(am) + v[0] * Math.sin(am), u[1] * Math.cos(am) + v[1] * Math.sin(am), u[2] * Math.cos(am) + v[2] * Math.sin(am)];
      tr(pt(R, d, a0), pt(R, d, a1), pt(R, d - th, a1), ref);
      tr(pt(R, d, a0), pt(R, d - th, a1), pt(R, d - th, a0), ref);
    }
  }

  /* -------------------------------------------------------------- the coat: canvas texture in metre UVs (0.34 per m) */
  var _tex = {};
  function coatTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      /* one flat coat gone patchy with weather: low-contrast drift, no pattern (r1 r8) */
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
      /* panel seams every ~1.47 m and the bolt rows of the shelter skin (r1 r8: rows of fasteners) */
      q.fillStyle = "rgba(20,20,14,0.22)";
      q.fillRect(0, 0, 256, 2); q.fillRect(0, 0, 2, 256); q.fillRect(128, 0, 1, 256);
      q.fillStyle = "rgba(18,18,12,0.20)";
      for (i = 6; i < 256; i += 15) { q.fillRect(i, 5, 2, 2); q.fillRect(i, 249, 2, 2); q.fillRect(5, i, 2, 2); q.fillRect(133, i, 2, 2); }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.06)" : "rgba(240,236,215,0.045)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 26, 2 + R() * 14);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  /* -------------------------------------------------------------- materials */
  function materials(THREE, C) {
    var T = {}, tx = coatTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.canvas = new THREE.MeshStandardMaterial({ color: 0x8a836c, roughness: 0.95, metalness: 0.0 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* a rounded-rectangle cross-section at station x, 16 points, counter-clockwise in YZ */
  function rrRing(x, hy, z0, z1, rc) {
    var P = [], k, a, c, cs = [[hy - rc, z1 - rc, 0], [-hy + rc, z1 - rc, 90], [-hy + rc, z0 + rc, 180], [hy - rc, z0 + rc, 270]];
    for (c = 0; c < 4; c++) for (k = 0; k < 4; k++) {
      a = (cs[c][2] + k * 30) * Math.PI / 180;
      P.push([x, cs[c][0] + rc * Math.cos(a), cs[c][1] + rc * Math.sin(a)]);
    }
    return P;
  }
  /* an arch over a wheel in side profile, thickened across y0..y1 */
  function arch(bin, x, zc, r0, r1, a0, a1, y0, y1) {
    var pts = [], k, a, n = 8;
    for (k = 0; k <= n; k++) { a = (a0 + (a1 - a0) * k / n) * Math.PI / 180; pts.push([x + r1 * Math.cos(a), zc + r1 * Math.sin(a)]); }
    for (k = n; k >= 0; k--) { a = (a0 + (a1 - a0) * k / n) * Math.PI / 180; pts.push([x + r0 * Math.cos(a), zc + r0 * Math.sin(a)]); }
    profY(bin, pts, y0, y1);
  }
  /* a side-wall panel standing proud of the flank by d (s = +1 left, -1 right) */
  function flank(bin, s, x0, x1, z0, z1, d, base) {
    var b = base === undefined ? HW : base;
    box(bin, x0, x1, s > 0 ? b - 0.01 : -b - d, s > 0 ? b + d : -b + 0.01, z0, z1);
  }
  /* horizontal louvre slats on a dark bed */
  function louvre(B, s, x0, x1, z0, z1, n, base) {
    var k, h = (z1 - z0) / n;
    flank(B.dark, s, x0, x1, z0, z1, 0.015, base);
    for (k = 0; k < n; k++) flank(B.paint, s, x0 + 0.03, x1 - 0.03, z0 + k * h + h * 0.35, z0 + k * h + h * 0.75, 0.035, base);
  }

  /* one axle's pair of wheels about the origin (axle centre): lugged tyre, painted rim and inflation hub */
  function wheelPair(T, R) {
    var s, i, pts, a, r, yc, o, NT = 36;
    for (s = -1; s <= 1; s += 2) {
      yc = s * TY;
      pts = [];
      for (i = 0; i < NT; i++) { a = i / NT * TAU; r = (i % 2) ? RT - 0.035 : RT; pts.push([r * Math.cos(a), r * Math.sin(a)]); }
      profY(T, pts, yc - TWH, yc + TWH);
      o = yc + s * TWH;
      cyl(T, [0, o, 0], [0, o + s * 0.012, 0], 0.44, 0.40, 18, true, false);          /* bead ring */
      cyl(R, [0, o, 0], [0, o + s * 0.025, 0], 0.31, 0.29, 18);                     /* rim disc */
      cyl(R, [0, o + s * 0.025, 0], [0, o + s * 0.09, 0], 0.15, 0.12, 12);          /* hub */
      cyl(R, [0, o + s * 0.09, 0], [0, o + s * 0.13, 0], 0.05, 0.04, 8);            /* inflation union */
      for (i = 0; i < 8; i++) { a = i / 8 * TAU + 0.2; box(R, 0.22 * Math.cos(a) - 0.025, 0.22 * Math.cos(a) + 0.025, o + s * 0.02 - 0.012, o + s * 0.02 + 0.012 + s * 0.02, 0.22 * Math.sin(a) - 0.025, 0.22 * Math.sin(a) + 0.025); }
    }
    box(T, -0.06, 0.06, -TY + TWH, TY - TWH, -0.06, 0.06);                         /* axle beam */
  }

  /* -------------------------------------------------------------- KamAZ-6350 cab (r2 r4 r5 r7 r8) */
  function cab(B) {
    var s, k, st, rings = [], t, n;
    st = [[2.40, 1.20, 1.31, 3.00, 0.10], [2.44, 1.25, 1.27, 3.05, 0.13], [4.02, 1.25, 1.27, 3.08, 0.13],
          [4.18, 1.245, 1.27, 3.05, 0.12], [4.26, 1.24, 1.27, 2.96, 0.10], [4.33, 1.23, 1.27, 2.30, 0.08],
          [4.36, 1.20, 1.29, 2.22, 0.06]];
    for (k = 0; k < st.length; k++) rings.push(rrRing(st[k][0], st[k][1], st[k][2], st[k][3], st[k][4]));
    loft(B.paint, rings, false);
    /* two-pane windscreen on the raked face, split by a post (r2 r5) */
    t = unit([-0.07, 0, 0.66]); n = unit([0.66, 0, 0.07]);
    onSlope(B.glass, [4.33, 0, 2.30], t, n, -1.10, -0.035, 0.05, 0.60, 0.0, 0.016);
    onSlope(B.glass, [4.33, 0, 2.30], t, n, 0.035, 1.10, 0.05, 0.60, 0.0, 0.016);
    onSlope(B.dark, [4.33, 0, 2.30], t, n, -1.16, 1.16, 0.0, 0.05, 0.0, 0.010);              /* rubber at the foot */
    /* front: grille bed with slats between round lamps, bumper with tow hooks and steps (r5) */
    box(B.dark, 4.355, 4.375, -0.64, 0.64, 1.50, 1.84);
    for (k = 0; k < 5; k++) box(B.paint, 4.37, 4.39, -0.62, 0.62, 1.53 + k * 0.064, 1.565 + k * 0.064);
    box(B.paint, 4.36, 4.38, -0.04, 0.04, 1.50, 1.84);
    box(B.dark, 4.24, 4.48, -1.25, 1.25, 0.98, 1.27);                                         /* bumper */
    box(B.dark, 4.30, 4.36, -1.18, 1.18, 1.27, 1.31);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 4.33, 4.385, s * 0.90, 1.67, 0.135, 16);                                 /* headlamp pot */
      cylX(B.glass, 4.385, 4.395, s * 0.90, 1.67, 0.105, 14);
      box(B.dark, 4.47, 4.53, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.04, 1.16);                /* tow hooks */
      box(B.dark, 4.36, 4.37, s * 1.02 - 0.08, s * 1.02 + 0.08, 2.05, 2.12);                /* side lamp */
      /* steps ahead of the front wheel at the bumper corner (r4 r8) */
      box(B.dark, 4.02, 4.36, s * 0.98, s * 1.22, 0.62, 0.66);
      box(B.dark, 4.02, 4.36, s * 0.98, s * 1.22, 0.90, 0.94);
      box(B.dark, 4.02, 4.06, s * 1.18, s * 1.22, 0.55, 1.00);
      /* black plastic arch over the front wheel, carried forward to the bumper (r4) */
      arch(B.dark, AXL[0], RT, 0.74, 0.82, 0, 180, s * (TY - 0.26), s * (TY + 0.27));
      /* door: big window with seal, seams, handle; mirror on two arms (r4) */
      flank(B.glass, s, 3.38, 4.14, 2.24, 2.92, 0.012, 1.25);
      flank(B.dark, s, 3.36, 4.16, 2.215, 2.235, 0.014, 1.25);
      flank(B.dark, s, 3.24, 3.27, 1.40, 3.00, 0.008, 1.25);
      flank(B.dark, s, 4.22, 4.25, 1.40, 2.98, 0.008, 1.24);
      flank(B.dark, s, 3.40, 3.56, 2.04, 2.08, 0.03, 1.25);
      flank(B.dark, s, 3.27, 4.22, 1.40, 1.42, 0.008, 1.25);
      bar(B.dark, [4.20, s * 1.25, 2.92], [4.42, s * 1.44, 2.95], 0.035);
      bar(B.dark, [4.20, s * 1.25, 2.40], [4.42, s * 1.44, 2.35], 0.035);
      box(B.dark, 4.39, 4.46, s * 1.40 - 0.07, s * 1.40 + 0.07, 2.30, 3.00);
      cylZ(B.dark, 4.15, s * 0.95, 3.05, 3.12, 0.05, 8);                                    /* roof marker lamps */
    }
    /* air intake on the back of the cab, right corner (r4) */
    box(B.dark, 2.16, 2.40, -1.20, -0.78, 2.30, 3.22);
    for (k = 0; k < 6; k++) box(B.paint, 2.15, 2.16, -1.17, -0.81, 2.40 + k * 0.13, 2.46 + k * 0.13);
    box(B.dark, 2.36, 2.40, -1.0, 1.0, 1.40, 1.45);
  }

  /* -------------------------------------------------------------- chassis, gap equipment, jacks */
  function chassis(B) {
    var s, k, x, a, ax, C;
    box(B.dark, XT + 0.05, 4.26, -0.46, 0.46, 0.80, 1.12);                                   /* frame */
    box(B.dark, XT - 0.06, XT + 0.06, -1.15, 1.15, 0.88, 1.15);                               /* rear beam */
    for (s = -1; s <= 1; s += 2) {
      /* springs: front packs, the rear bogie pack (r7 r8) */
      for (k = 0; k < 2; k++) box(B.dark, AXL[k] - 0.55, AXL[k] + 0.55, s * 0.62, s * 0.86, 0.70, 0.80);
      box(B.dark, AXL[3] - 0.25, AXL[2] + 0.25, s * 0.62, s * 0.86, 0.66, 0.80);
      box(B.dark, AXL[3] + 0.35, AXL[2] - 0.35, s * 0.56, s * 0.92, 0.60, 0.92);
      /* green arches over axles 2, 3, 4, tight over the tyres (r7 r8) */
      arch(B.paint, AXL[1], RT, 0.67, 0.71, 15, 165, s * (TY - 0.24), s * (TY + 0.24));
      arch(B.paint, AXL[2], RT, 0.67, 0.71, 20, 160, s * (TY - 0.24), s * (TY + 0.24));
      arch(B.paint, AXL[3], RT, 0.67, 0.71, 20, 160, s * (TY - 0.24), s * (TY + 0.24));
      box(B.paint, AXL[3] + 0.20, AXL[2] - 0.20, s * (TY - 0.24), s * (TY + 0.24), 1.27, 1.31);
      box(B.dark, AXL[3] - 0.78, AXL[3] - 0.74, s * (TY - 0.24), s * (TY + 0.24), 0.32, 1.28); /* mud flaps */
      /* rear lamps and the rear jack pair, stowed (r7 r8 r9) */
      box(B.dark, XT - 0.08, XT - 0.04, s * 0.95 - 0.12, s * 0.95 + 0.12, 1.00, 1.12);
      cylZ(B.dark, XT + 0.12, s * 1.08, 1.05, 2.25, 0.085, 10);
      cylZ(B.paint, XT + 0.12, s * 1.08, 0.58, 1.05, 0.06, 8);
      cylZ(B.dark, XT + 0.12, s * 1.08, 0.52, 0.58, 0.16, 12);
      bar(B.dark, [XT + 0.12, s * 1.08, 1.70], [XT + 0.60, s * 0.46, 1.05], 0.06);
      /* front jack pair ahead of the second axle, braced to the frame (r1 r4 r8) */
      cylZ(B.dark, 1.98, s * 1.33, 1.15, 2.42, 0.09, 10);
      cylZ(B.paint, 1.98, s * 1.33, 0.60, 1.15, 0.065, 8);
      cylZ(B.dark, 1.98, s * 1.33, 0.54, 0.60, 0.17, 12);
      box(B.dark, 1.86, 2.10, s * 0.46, s * 1.26, 1.02, 1.16);
      bar(B.paint, [1.98, s * 1.30, 2.10], [2.45, s * 0.55, 1.15], 0.07);
      bar(B.paint, [1.98, s * 1.30, 2.10], [1.40, s * 0.60, 1.15], 0.06);
    }
    /* right side under the body: tank box and a tool box (r8); left: the round fuel tank and battery box (r9) */
    box(B.dark, -0.88, 0.49, -1.20, -0.72, 0.68, 1.10);
    box(B.dark, -1.35, -0.92, -1.31, -1.10, 1.08, 1.32);
    cyl(B.paint, [-0.85, 0.98, 0.86], [0.35, 0.98, 0.86], 0.26, 0.26, 18);
    for (k = 0; k < 2; k++) cyl(B.dark, [-0.55 + k * 0.6, 0.98, 0.86], [-0.50 + k * 0.6, 0.98, 0.86], 0.275, 0.275, 18);
    box(B.paint, -1.55, -1.00, 0.70, 1.20, 0.70, 1.12);
    /* the gap behind the cab: spare wheel on edge (r1 r4 r8), the transverse tank above (r4), a box on the left (r5) */
    ax = unit([1, -0.23, 0]); C = [2.03, -0.62, 2.00];
    cyl(B.dark, [C[0] - ax[0] * 0.21, C[1] - ax[1] * 0.21, C[2]], [C[0] + ax[0] * 0.21, C[1] + ax[1] * 0.21, C[2]], 0.63, 0.63, 24);
    cyl(B.paint, [C[0] + ax[0] * 0.21, C[1] + ax[1] * 0.21, C[2]], [C[0] + ax[0] * 0.24, C[1] + ax[1] * 0.24, C[2]], 0.30, 0.28, 16);
    for (k = 0; k < 12; k++) {      /* tread blocks on the visible crown */
      a = k / 12 * TAU;
      var p = [C[0], C[1] + 0.64 * Math.cos(a), C[2] + 0.64 * Math.sin(a)];
      box(B.dark, p[0] - 0.16, p[0] + 0.16, p[1] - 0.05, p[1] + 0.05, p[2] - 0.05, p[2] + 0.05);
    }
    box(B.dark, 1.70, 2.30, -0.80, -0.40, 1.12, 1.40);                                     /* carrier */
    cyl(B.paint, [1.50, -1.18, 2.62], [1.50, -0.30, 2.62], 0.21, 0.21, 16);
    cyl(B.paint, [1.50, -1.18, 2.62], [1.50, -1.24, 2.62], 0.19, 0.12, 14);
    box(B.dark, 1.42, 1.58, -1.10, -0.40, 2.38, 2.42);
    box(B.paint, 1.45, 2.30, 0.50, 1.18, 1.15, 1.75);
    box(B.dark, 1.44, 2.31, 0.49, 1.19, 1.74, 1.77);
    cylZ(B.dark, 2.25, 0.25, 1.12, 2.90, 0.06, 8);                                        /* pipe up the cab back */
  }

  /* -------------------------------------------------------------- the shelter (r1 r5 r8 r9) */
  function shelter(B) {
    var s, k, x, RIB = [XF - 0.04, -0.22, -1.69, -2.78, -3.70, XB + 0.04], NZ = 13, x0, x1;
    hexa(B.paint, [[XB, -HW, ZS], [XF, -HW, ZS], [XF, HW, ZS], [XB, HW, ZS],
                   [XB, -HW, ZR], [XF, -HW, ZR], [XF, HW, ZR], [XB, HW, ZR]]);
    box(B.dark, XB, XF, -1.12, 1.12, 1.12, ZS);                                            /* sub-frame */
    /* rear compartment, lower roof, louvres both sides and across the tail (r8 r9) */
    box(B.paint, XT, XB, -1.20, 1.20, 1.22, 3.10);
    for (s = -1; s <= 1; s += 2) louvre(B, s, XT + 0.10, XB - 0.10, 1.60, 2.95, 9, 1.20);
    box(B.dark, XT - 0.015, XT, -1.00, 0.10, 1.55, 2.90);
    for (k = 0; k < 9; k++) box(B.paint, XT - 0.04, XT - 0.01, -0.97, 0.07, 1.62 + k * 0.145, 1.68 + k * 0.145);
    for (k = 0; k < 2; k++) cylZ(B.dark, XT - 0.06, 0.35 + k * 0.45, 0.45, 3.10, 0.025, 6);   /* stowed rear ladder */
    for (k = 0; k < 9; k++) box(B.dark, XT - 0.08, XT - 0.04, 0.35, 0.80, 0.60 + k * 0.28, 0.63 + k * 0.28);
    for (s = -1; s <= 1; s += 2) {
      /* ribs: vertical frames, the top and bottom bands */
      for (k = 0; k < RIB.length; k++) flank(B.paint, s, RIB[k] - 0.045, RIB[k] + 0.045, ZS, ZR, 0.045);
      flank(B.paint, s, XB, XF, ZR - 0.09, ZR, 0.035);
      flank(B.paint, s, XB, XF, ZS, ZS + 0.09, 0.035);
      /* the zig-zag truss rail along the roof edge */
      bar(B.dark, [XB + 0.03, s * 1.20, ZR + 0.18], [XF - 0.03, s * 1.20, ZR + 0.18], 0.045);
      for (k = 0; k < NZ; k++) {
        x0 = XB + 0.05 + (XF - XB - 0.10) * k / NZ; x1 = XB + 0.05 + (XF - XB - 0.10) * (k + 1) / NZ;
        bar(B.dark, [x0, s * 1.20, (k % 2) ? ZR + 0.18 : ZR], [x1, s * 1.20, (k % 2) ? ZR : ZR + 0.18], 0.03);
      }
      for (k = 0; k <= 3; k++) bar(B.dark, [XB + 0.05 + (XF - XB - 0.10) * k / 3, s * 1.20, ZR], [XB + 0.05 + (XF - XB - 0.10) * k / 3, s * 1.20, ZR + 0.18], 0.035);
    }
    /* RIGHT flank (s = -1, r1 r8): door, glazed window with a panel below, two canvas-covered windows with hatches */
    flank(B.dark, -1, -0.12, 0.71, 1.38, 2.82, 0.012);
    flank(B.paint, -1, -0.09, 0.68, 1.41, 2.79, 0.022);
    flank(B.dark, -1, 0.52, 0.62, 2.05, 2.10, 0.05);
    flank(B.dark, -1, -1.23, -0.64, 2.28, 2.71, 0.015);
    flank(B.glass, -1, -1.19, -0.68, 2.32, 2.67, 0.022);
    flank(B.dark, -1, -1.15, -0.75, 1.82, 1.97, 0.04);
    for (k = 0; k < 2; k++) {
      x0 = k ? -3.65 : -2.60; x1 = k ? -2.84 : -1.80;
      flank(B.canvas, -1, x0, x1, 2.28, 2.60, 0.06);
      flank(B.dark, -1, x0 + 0.04, x1 - 0.04, 1.76, 2.26, 0.012);
      flank(B.paint, -1, x0 + 0.07, x1 - 0.07, 1.79, 2.23, 0.02);
    }
    flank(B.dark, -1, XB + 0.25, XB + 0.55, 1.75, 2.15, 0.05);                              /* ladder housing */
    /* LEFT flank (s = +1, r5 r9): front window, a box, the louvre panel, the door */
    flank(B.dark, 1, 0.40, 0.89, 2.28, 2.71, 0.015);
    flank(B.glass, 1, 0.44, 0.85, 2.32, 2.67, 0.022);
    flank(B.dark, 1, -0.83, -0.32, 2.00, 2.30, 0.06);
    louvre(B, 1, -1.91, -1.12, 1.70, 2.90, 8);
    flank(B.dark, 1, -3.42, -2.58, 1.38, 2.84, 0.012);
    flank(B.paint, 1, -3.39, -2.61, 1.41, 2.81, 0.022);
    flank(B.dark, 1, -2.80, -2.70, 2.05, 2.10, 0.05);
    /* front wall: frame for the rack braces */
    box(B.dark, XF, XF + 0.03, -1.10, 1.10, 2.50, 2.56);
    /* the flat sloped-sided cover on the forward roof, carried out over the gap (r1 r2 r8) */
    hexa(B.paint, [[-0.20, -1.12, ZR + 0.06], [1.92, -1.12, ZR + 0.06], [1.92, 1.12, ZR + 0.06], [-0.20, 1.12, ZR + 0.06],
                   [-0.05, -0.98, ZR + 0.36], [1.80, -0.98, ZR + 0.36], [1.80, 0.98, ZR + 0.36], [-0.05, 0.98, ZR + 0.36]]);
    box(B.dark, -0.20, 1.92, -1.12, 1.12, ZR, ZR + 0.06);
    /* the rack: two channel beams out over the cab roof, cross members, posts and braces (r1 r4 r5) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 1.20, 3.95, s * 0.86, s * 0.98, ZR - 0.04, ZR + 0.07);
      bar(B.dark, [2.62, s * 0.92, 3.04], [2.62, s * 0.92, ZR - 0.04], 0.06);
      bar(B.dark, [3.70, s * 0.92, 3.06], [3.70, s * 0.92, ZR - 0.04], 0.05);
      bar(B.dark, [XF + 0.03, s * 0.92, 2.53], [2.25, s * 0.92, ZR - 0.04], 0.06);
      bar(B.dark, [XF + 0.03, s * 0.92, 2.53], [XF + 0.03, s * 0.92, ZR - 0.04], 0.06);
      box(B.team, 2.95, 3.85, s * 0.87, s * 0.97, ZR + 0.07, ZR + 0.085);
    }
    for (k = 0; k < 4; k++) { x = 2.05 + k * 0.62; box(B.dark, x - 0.04, x + 0.04, -0.98, 0.98, ZR - 0.01, ZR + 0.04); }
    box(B.dark, XF, 2.40, -1.10, 1.10, ZR - 0.06, ZR - 0.03);                                /* grating over the gap */
    /* roof at the tail: the platform the mast stands on (r8) */
    for (s = -1; s <= 1; s += 2) box(B.dark, -4.62, -3.15, s * 0.42, s * 0.52, ZR, ZR + 0.10);
    box(B.dark, -3.80, -3.30, -0.52, 0.52, ZR, ZR + 0.12);
  }

  /* -------------------------------------------------------------- the sensor mast, hull-fixed (r1 r5 r6 r8 r9) */
  function mast(B) {
    var k, a;
    cylZ(B.paint, MX, 0, ZR + 0.12, 5.00, 0.085, 12);
    cylZ(B.dark, MX, 0, 4.95, 5.06, 0.11, 12);
    cylZ(B.paint, MX, 0, 5.06, 6.36, 0.06, 10);
    bar(B.dark, [MX - 0.02, 0, 4.98], [-4.60, 0, 3.14], 0.06);       /* fore and aft struts */
    bar(B.dark, [MX + 0.02, 0, 4.98], [-3.22, 0, ZR + 0.10], 0.06);
    /* the pale sensor box below the ring, its lens forward (r5 r6) */
    box(B.canvas, MX - 0.08, MX + 0.40, -0.19, 0.19, 6.04, 6.30);
    box(B.dark, MX + 0.40, MX + 0.43, -0.12, 0.12, 6.09, 6.25);
    /* the ring of camera lenses and the top post (r6) */
    cylZ(B.dark, MX, 0, 6.36, 6.52, 0.18, 14);
    for (k = 0; k < 9; k++) {
      a = k / 9 * TAU;
      cyl(B.dark, [MX + 0.14 * Math.cos(a), 0.14 * Math.sin(a), 6.44], [MX + 0.33 * Math.cos(a), 0.33 * Math.sin(a), 6.46], 0.055, 0.05, 8);
    }
    cylZ(B.dark, MX, 0, 6.52, 6.80, 0.075, 10);
  }

  /* -------------------------------------------------------------- the antenna head (origin on the turntable, facing +X) */
  function ribbedDish(B, C, ax, R, d, th) {
    var t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t)), v = cross(ax, u), k, a, P;
    dish(B.paint, C, ax, R, d, 28, 5, th);
    cyl(B.dark, [C[0] - ax[0] * 0.24, C[1] - ax[1] * 0.24, C[2] - ax[2] * 0.24], [C[0] - ax[0] * th, C[1] - ax[1] * th, C[2] - ax[2] * th], R * 0.17, R * 0.15, 12);
    for (k = 0; k < 8; k++) {        /* the ribbed back (r8 r9) */
      a = k / 8 * TAU;
      P = [C[0] + (u[0] * Math.cos(a) + v[0] * Math.sin(a)) * R * 0.94 + ax[0] * (d * 0.88 - th),
           C[1] + (u[1] * Math.cos(a) + v[1] * Math.sin(a)) * R * 0.94 + ax[1] * (d * 0.88 - th),
           C[2] + (u[2] * Math.cos(a) + v[2] * Math.sin(a)) * R * 0.94 + ax[2] * (d * 0.88 - th)];
      bar(B.paint, [C[0] - ax[0] * (th + 0.06) + (u[0] * Math.cos(a) + v[0] * Math.sin(a)) * R * 0.15,
                    C[1] - ax[1] * (th + 0.06) + (u[1] * Math.cos(a) + v[1] * Math.sin(a)) * R * 0.15,
                    C[2] - ax[2] * (th + 0.06) + (u[2] * Math.cos(a) + v[2] * Math.sin(a)) * R * 0.15],
          [P[0] - ax[0] * 0.03, P[1] - ax[1] * 0.03, P[2] - ax[2] * 0.03], 0.05);
    }
  }
  function head(B) {
    var s, ax, C;
    cylZ(B.dark, 0, 0, 0.0, 0.08, 0.80, 28);                                   /* turntable */
    cylZ(B.paint, 0, 0, 0.08, 0.28, 0.62, 24);
    hexa(B.paint, [[-0.45, -0.42, 0.28], [0.35, -0.42, 0.28], [0.35, 0.42, 0.28], [-0.45, 0.42, 0.28],
                   [-0.30, -0.42, 0.46], [0.10, -0.42, 0.46], [0.10, 0.42, 0.46], [-0.30, 0.42, 0.46]]);
    cylY(B.paint, -0.10, -0.50, 0.50, 0.50, 0.30, 20);                           /* elevation drum under the column (r6) */
    cylY(B.dark, -0.10, -0.53, 0.53, 0.50, 0.12, 10);
    /* the equipment column between two tall side plates (r6 r8) */
    box(B.paint, -0.32, 0.30, -0.50, 0.50, 0.55, 1.98);
    box(B.dark, -0.30, 0.28, -0.48, 0.48, 1.98, 2.02);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.38, 0.40, s * 0.50, s * 0.66, 0.45, 2.10);
      box(B.dark, 0.40, 0.43, s * 0.52, s * 0.64, 0.52, 2.03);
      box(B.dark, -0.30, 0.36, s * 0.66, s * 0.665 + s * 0.01, 1.30, 1.34);
      /* the bearing ring each side dish turns on (r6) and its arm */
      cylY(B.dark, 0.10, s * 0.66, s * 0.76, 1.10, 0.24, 18);
    }
    /* the front box with its door, lamps and the camera tube on top (r6) */
    box(B.paint, 0.30, 0.48, -0.30, 0.12, 0.62, 1.45);
    box(B.dark, 0.48, 0.49, -0.24, 0.06, 0.70, 1.38);
    box(B.paint, 0.49, 0.505, -0.15, -0.02, 1.00, 1.10);
    cylX(B.dark, 0.28, 0.50, 0.58, 2.07, 0.075, 12);
    cylX(B.glass, 0.50, 0.51, 0.58, 2.07, 0.06, 10);
    cylZ(B.dark, 0.32, 0.20, 2.0, 2.22, 0.05, 8);
    cylY(B.dark, 0.36, -0.05, 0.40, 1.82, 0.045, 8);
    cyl(B.dark, [0.30, -0.35, 1.70], [0.47, -0.35, 1.70], 0.06, 0.05, 8);
    /* two large dishes out to the sides (about 2.0 m), one smaller above and behind (about 1.1 m) (r2 r6 r8) */
    for (s = -1; s <= 1; s += 2) {
      ax = unit([1, s * 0.20, 0.15]);
      C = [-0.02, s * 1.50, 1.08];
      ribbedDish(B, C, ax, 0.92, 0.24, 0.05);
      bar(B.paint, [0.10, s * 0.76, 1.10], [C[0] - ax[0] * 0.22, C[1] - ax[1] * 0.22, C[2] - ax[2] * 0.22], 0.14);
    }
    ax = unit([1, 0, 0.45]);
    C = [-0.42, 0, 2.02];
    ribbedDish(B, C, ax, 0.52, 0.14, 0.04);
    bar(B.paint, [-0.20, 0, 1.97], [C[0] - ax[0] * 0.18, 0, C[2] - ax[2] * 0.18], 0.12);
  }

  function build(THREE, M, C, key) {
    var T = materials(THREE, C), g = new THREE.Group(), HB, SB, k, wg, WB, tur;
    HB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
           canvas: new Bin(T.canvas, false), team: new Bin(T.team, false) };
    SB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
    cab(HB); chassis(HB); shelter(HB); mast(HB);
    flush(THREE, g, HB);
    for (k = 0; k < 4; k++) {
      WB = { tyre: new Bin(T.tyre, false), rim: new Bin(T.paint, true) };
      wheelPair(WB.tyre, WB.rim);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AXL[k], 0, RT);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    head(SB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(TX, 0, ZR);
    flush(THREE, tur, SB);
    g.add(tur);
    g.name = key;
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["ewv_p"] = {
  len: 9.8,
  build: function (THREE, M, C) { return HeroKrasukha.build(THREE, M, C, "ewv_p"); }
};
