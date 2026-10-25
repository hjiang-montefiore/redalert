/* ============ ru_shturm.js - HERO model: 9P149 Shturm-S (9K114 "AT-6 Spiral") tank destroyer on the MT-LB ============
   One row, one model:
     pact_e80_tankdestroyer   "9P149 Shturm-S on the MT-LB", service 1979, e80 to e90, turret:true, no deploy flag.
   The row covers 1979 to the 1990s: the Soviet 9P149 in Soviet protective green.  No later variant is drawn (the
   Ataka-armed 9P149M is named in the row's text only; no row is the 9P149M).

   REFERENCES (Wikimedia Commons, width 960, cached in the scratchpad q_shturm_ref):
     A "9P149.jpg"                                  LEFT side, a missile leaving: the hull profile (long shallow glacis,
                                                    flat roof), the launcher RAISED on its column at the rear, the tube
                                                    near level (5-7 deg nose-up), the sight, periscope and mushroom vent.
     B "9P149 Shturm-S Tank Destroyer.jpg"          front-LEFT, launcher raised (Armenian, digital camo: shape only): the
                                                    sight barrel on the RIGHT front, the cradle with its boxes and pods.
     C/D/E "9P149 combat vehicle 9K114 Shturm-S ATGM system ... Artillery museum, Saint-Petersburg pic1/2/3.JPG"
                                                    front-right, full front and low front-right, launcher STOWED: lower
                                                    nose plate with its bolt row and tow eyes, the upper glacis with the
                                                    trim vane folded on it and the grille at its top, the cab front, the
                                                    raised driver's hatch on the LEFT, the sight on its braced frame on
                                                    the RIGHT, headlamps in cages on the fender ends, the front sprocket.
     F "Army2016demo-027.jpg" (Vitaly Kuzmin)       front-LEFT in service, stowed: driver's window, mushroom vent, round
                                                    hatch, the rear-roof box and the right rear hand rail, the six wheels.
     G "RaceofHeroes072016-24.jpg" (Vitaly Kuzmin)  rear-RIGHT, launcher RAISED: the column, the cradle with a rear-facing
                                                    grilled pod and a forward pod on its right, the flat plate leaning
                                                    from the column down to the roof, the rear doors and the louvred gills
                                                    on both rear corners, the box with two lamps at the back of the roof.
     H "9P149 (possibly) near 3620 artillery supply base (Minsk) 2.jpg"  front-right, raised: sight column and periscope.
   Which vehicle is followed: the shapes of C/D/E (St Petersburg museum) and the in-service F/G (2016); the launcher
   from A and G.  A Kubinka survivor was not found on Commons.

   RECOGNITION LIST (each one drawn):
     1  MT-LB boat hull: a near-vertical lower nose plate, a long shallow upper glacis (about 20 deg) to a short steeper
        cab front, then a flat roof to the stern (A, C, D).                                   -> STATIONS loft
     2  the upper hull sides overhang the tracks and lean in; the front corners are chamfered down to the fenders (D, F).
     3  six road wheels a side, no return rollers, a toothed sprocket at the FRONT, the idler at the rear (C, E, F, G).
     4  fenders running out to the nose with a headlamp in a wire cage on each front end (C, D, H).
     5  the folded trim vane lying on the glacis and the grille at the glacis top (D).
     6  the sight on the cab's RIGHT: a barrel lying fore-and-aft with its window forward, on a braced frame, a periscope
        head behind it (B, D, E, H).
     7  the raised driver's hatch on the cab's LEFT, his window in the cab front, the mushroom vent behind (D, F, A).
     8  the launcher, STOWED: nothing above the roof but a closed hatch (C, D, E, F).                 -> "turret"/"podelev"
     9  the launcher, RAISED: one 9M114 container on a cradle on a column out of the rear roof, near level, with a pod
        under each end of the cradle on the right and a box on the left (A, B, G).
     10 the plate leaning from the column down to the roof in front of it (G).
     11 the box with two lamps at the back of the roof, the hand rail on the right rear roof (F, G).
     12 the rear: two doors, louvred gills on both rear corners (G).
   NOT drawn: aerials (F), tow cables' loops in detail, tactical numbers and badges (A "136", H "3620", F the Army-2016
   logo), the Armenian camouflage (B), the cover over the guidance pods.

   STATIONS (x from the hull centre, +X nose; z up from the ground; half widths y).  Hull 6.45 m long and 2.85 m wide
   (MT-LB published 6.454 x 2.85 m; js/generations.js 6.45 x 2.86), clearance 0.42 (MT-LB 0.40).  Heights from A
   scaled on the hull length (114 px/m): nose edge 1.0 m, roof edge 1.58-1.62 m, cab roof fittings to 1.9-2.0 m:
        x      belly z  belly hw   sponson z  sponson hw   roof-edge hw   roof z     note
      +3.22    0.94     0.95       0.96       0.97         0.95           1.02       nose edge
      +2.92    0.46     1.00       0.92       1.00         0.98           1.14       foot of the lower nose plate
      +2.25    0.42     1.00       0.92       1.42         1.02           1.38       glacis meets the cab front
      +1.95    0.42     1.00       0.92       1.42         1.22           1.62       cab front meets the roof
      -3.05    0.42     1.00       0.92       1.42         1.22           1.62
      -3.20    0.58     1.00       0.92       1.42         1.22           1.62       rear bevel
      -3.23    0.68     1.00       0.92       1.42         1.20           1.58       rear plate
     Running gear: road wheels x +1.73 .. -1.80 every 0.705 (MT-LBu pitch, ru_zoopark.js), r 0.31, centre z 0.35;
     sprocket x +2.42 z 0.55; idler x -2.47 z 0.45; track centre y 1.20, 0.35 wide (MT-LB 350 mm track).
   LAUNCHER: the column axis 1.30 m ahead of the stern (A) on the centre line (G), x -1.90.  Raised, the tube axis
     stands 0.75 m above the roof (the photographs disagree: A 0.55-0.6 at the column, G about 0.9; H about 0.6); tube
     1.83 m (the 9M114 container), 0.22 m across (G), 0.68 m of it behind the column and 1.15 m ahead (A 0.6/1.05,
     G about 0.75/1.08).  render3d poseLauncher
     can only ROTATE the group "podelev" about its local Y (userData.el), so the straight lift up the column is drawn
     as a rotation of 0.11 rad about a VIRTUAL hinge 9.4 m behind the column at tube height: the column comes up
     1.03 m and the tube ends 6.3 deg nose-up (A: 5-7 deg).  Nothing is drawn at the hinge.  Stowed, the launcher is
     wholly under the roof and the roof hatch outline is all that shows (C-F).
   NOT confirmed and drawn by judgement: that the plate in G is the roof hatch lid carried on the column (it is drawn
     on the column, under the roof when stowed); the hatch outline size; the left-side cradle box size (B only).
   KEPT from the old header: one tube; the sight on the right; the virtual-hinge lift and its rise; front sprocket.
   CORRECTED: the old hull was two slabs with a short steep glacis; A shows a long shallow glacis rising to a short cab
     front (now lofted); the old roof box "housing" over the launcher is not there (C-F show a closed flat roof there;
     the box F and G show sits at the very back of the roof); the driver's hatch is a raised rectangular hatch (D),
     not round; the pods under the cradle and the leaning plate (G) were missing.

   PAINT: Soviet protective green, one plain coat.  Sampled: F (2016, overcast) flank #515451, H (shade) #283c32;
   the museum C-E grey-green is a repaint and not used.  Base #4b5535, taken to about 0.8 of a sunlit 4BO green.
   No numbers, badges or insignia.

   Nodes: "turret" (pivot on the column axis, rest pointing forward +X) carries "podelev" (origin at the virtual
   hinge, userData.el, userData.cells = one cell: mouth x, y, z, rear x in that frame); six "roadwheel" groups (the
   wheel discs; the tyres stay in the hull).  Team colour: two small plain C.team strips on the roof, facing up.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroShturm = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var PAINT = { base: "#4b5535", tone: ["#535d3b", "#434c2f"], seed: 1979 };
  var NW = 6, XW = [1.73, 1.025, 0.32, -0.385, -1.09, -1.795];
  var FRT = { x: 2.42, z: 0.55, r: 0.25 };     /* front sprocket */
  var REA = { x: -2.47, z: 0.45, r: 0.23 };    /* rear idler */
  var ZW = 0.35, RWR = 0.31, TYC = 1.20, THW = 0.175;
  var ROOF = 1.62;
  var XP = -1.90;                         /* the launcher column axis, hull x (the turret node's pivot) */
  var EL = 0.11;                          /* the raise angle, rad: the tube ends 6.3 deg nose-up */
  var CS = ROOF - 0.28;                   /* the tube axis height at rest, under the roof */
  var RISE = ROOF + 0.75 - CS;            /* how far the tube axis comes up at the column */
  var DX = RISE / Math.sin(EL);           /* the virtual hinge lies this far behind the column, at tube height */
  var HX = XP - DX;

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

  /* -------------------------------------------------------------- track belt */
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
  function beltGeometry() {
    var zb = 0.055, ri = FRT.r + 0.045, rs = REA.r + 0.045;
    var Pf = [XW[NW - 1], zb], Pr = [XW[0], zb];
    var t1 = pickTangent(FRT, ri, Pf, true), t2 = pickTangent(REA, rs, Pr, false);
    var Lx = REA.x - FRT.x, Lz = REA.z - FRT.z, L = Math.sqrt(Lx * Lx + Lz * Lz), phi = Math.atan2(Lz, Lx);
    var al = Math.acos((ri - rs) / L), psi = Math.sin(phi + al) > Math.sin(phi - al) ? phi + al : phi - al;
    while (psi < t1) psi += TAU;
    while (t2 < psi) t2 += TAU;
    var p = [], T1, Q1, Q2, T2;
    function line(A, B) {
      var l = Math.sqrt((B[0] - A[0]) * (B[0] - A[0]) + (B[1] - A[1]) * (B[1] - A[1])), k, nn = Math.max(1, Math.ceil(l / 0.25));
      for (k = 1; k <= nn; k++) p.push([A[0] + (B[0] - A[0]) * k / nn, A[1] + (B[1] - A[1]) * k / nn]);
    }
    function arc(C, r, a0, a1) {
      var k, nn = Math.max(2, Math.ceil(r * (a1 - a0) / 0.18)), ang;
      for (k = 1; k <= nn; k++) { ang = a0 + (a1 - a0) * k / nn; p.push([C.x + r * Math.cos(ang), C.z + r * Math.sin(ang)]); }
    }
    p.push([Pr[0], Pr[1]]);
    line(Pr, Pf);
    T1 = [FRT.x + ri * Math.cos(t1), FRT.z + ri * Math.sin(t1)];
    line(Pf, T1);
    arc(FRT, ri, t1, psi);
    Q1 = [FRT.x + ri * Math.cos(psi), FRT.z + ri * Math.sin(psi)];
    Q2 = [REA.x + rs * Math.cos(psi), REA.z + rs * Math.sin(psi)];
    line(Q1, Q2);
    arc(REA, rs, psi, t2);
    T2 = [REA.x + rs * Math.cos(t2), REA.z + rs * Math.sin(t2)];
    line(T2, Pr);
    p.pop();
    return { path: p };
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.04, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;
      to = (i % 2) ? 0.022 : 0.060;
      V.push([b[0] + nx * to, y1, b[1] + nz * to], [b[0] + nx * to, y0, b[1] + nz * to],
             [b[0] - nx * ti, y0, b[1] - nz * ti], [b[0] - nx * ti, y1, b[1] - nz * ti]);
    }
    for (i = 0; i < n; i++) {
      A = i * 4; B = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        a0 = A + k; a1 = A + (k + 1) % 4; b0 = B + k; b1 = B + (k + 1) % 4;
        F.push([a0, b0, a1], [a1, b0, b1]);
      }
    }
    solid(bin, V, F);
  }

  /* -------------------------------------------------------------- paint */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* one plain coat: soft tonal patches, welded plate seams, rain streaks and chips;
     one tile is 2.94 m of surface (UVs are 0.34 per metre) */
  function paintTex(THREE, P) {
    var key = "shturm" + P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.tone.length; k++) {
        q.fillStyle = P.tone[k];
        for (i = 0; i < 8; i++) {
          x = R() * 256; y = R() * 256; w = 26 + R() * 60;
          q.globalAlpha = 0.42; q.beginPath(); q.ellipse(x, y, w, w * (0.35 + R() * 0.5), R() * 3, 0, TAU); q.fill();
        }
      }
      q.globalAlpha = 1;
      q.strokeStyle = "rgba(18,20,14,0.30)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 26.5, 0); q.lineTo(i * 64 + 26.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 38.5); q.lineTo(256, i * 64 + 38.5); q.stroke();
      }
      q.fillStyle = "rgba(12,13,9,0.32)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 3, 34, 2, 2); q.fillRect(90, i * 8 + 5, 2, 2); }
      for (i = 0; i < 100; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.08)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
      for (i = 0; i < 50; i++) { q.fillStyle = "rgba(10,10,8,0.2)"; q.fillRect(R() * 256, R() * 256, 2, 2); }
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
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             team: new Bin(T.team, false) };
  }

  /* -------------------------------------------------------------- running gear */
  /* the outer disc of a road wheel about the origin, both sides: dished plate, hub, eight bolts (E, F, G) */
  function wheel(bin) {
    var s, k, a, o;
    for (s = -1; s <= 1; s += 2) {
      o = s * (TYC + 0.15);
      cyl(bin, [0, o, 0], [0, o + s * 0.025, 0], RWR - 0.025, RWR - 0.05, 20, false, false);
      cyl(bin, [0, o + s * 0.025, 0], [0, o + s * 0.06, 0], 0.15, 0.12, 12, true, false);
      cyl(bin, [0, o + s * 0.06, 0], [0, o + s * 0.10, 0], 0.075, 0.06, 8, true, false);
      for (k = 0; k < 8; k++) {
        a = k / 8 * TAU;
        box(bin, 0.20 * Math.cos(a) - 0.018, 0.20 * Math.cos(a) + 0.018, o + s * 0.02 - 0.01, o + s * 0.042,
            0.20 * Math.sin(a) - 0.018, 0.20 * Math.sin(a) + 0.018);
      }
    }
  }
  function running(B) {
    var s, k, bg = beltGeometry(), a;
    belt(B.dark, bg.path, TYC - THW, TYC + THW);
    belt(B.dark, bg.path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < NW; k++) cyl(B.dark, [XW[k], s * (TYC - 0.15), ZW], [XW[k], s * (TYC + 0.15), ZW], RWR, RWR, 18);
      for (k = 0; k < NW; k++) cyl(B.dark, [XW[k], s * (TYC - 0.15), ZW], [XW[k], s * 0.99, ZW], 0.09, 0.09, 8, true, true);
      /* front sprocket: two toothed rings on a painted hub (C, E) */
      gear(B.dark, FRT.x, s * TYC - 0.14, s * TYC - 0.06, FRT.z, FRT.r - 0.035, FRT.r + 0.02, 12);
      gear(B.dark, FRT.x, s * TYC + 0.06, s * TYC + 0.14, FRT.z, FRT.r - 0.035, FRT.r + 0.02, 12);
      cyl(B.paint, [FRT.x, s * (TYC - 0.06), FRT.z], [FRT.x, s * (TYC + 0.06), FRT.z], 0.18, 0.18, 14, true, true);
      cyl(B.dark, [FRT.x, s * (TYC + 0.14), FRT.z], [FRT.x, s * (TYC + 0.21), FRT.z], 0.11, 0.09, 10);
      cyl(B.dark, [FRT.x, s * 0.99, FRT.z], [FRT.x, s * (TYC - 0.06), FRT.z], 0.12, 0.12, 10, true, true);
      /* rear idler: a spoked disc on its crank (G) */
      cyl(B.paint, [REA.x, s * (TYC - 0.13), REA.z], [REA.x, s * (TYC + 0.13), REA.z], REA.r, REA.r, 18);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        box(B.dark, REA.x + 0.13 * Math.cos(a) - 0.035, REA.x + 0.13 * Math.cos(a) + 0.035, s * (TYC + 0.13) - 0.005,
            s * (TYC + 0.13) + 0.005 + s * 0.012, REA.z + 0.13 * Math.sin(a) - 0.035, REA.z + 0.13 * Math.sin(a) + 0.035);
      }
      cyl(B.dark, [REA.x, s * (TYC + 0.13), REA.z], [REA.x, s * (TYC + 0.18), REA.z], 0.08, 0.07, 8);
      box(B.dark, REA.x - 0.04, REA.x + 0.32, s * 0.99 - 0.03, s * 0.99 + 0.03, REA.z - 0.05, REA.z + 0.05);
    }
  }

  /* -------------------------------------------------------------- hull */
  /* one station ring: belly, lower side, sponson floor out over the track, the upper side leaning in to the roof */
  function ring(x, zb, hb, zs, hw, hr, zt) {
    var r = [], i, half = [[hb, zb], [hb, zs], [hw, zs], [hw, Math.min(zs + 0.06, zt - 0.03)], [hr, zt - 0.03], [hr - 0.03, zt]];
    for (i = 0; i < half.length; i++) r.push([x, -half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, half[i][0], half[i][1]]);
    return r;
  }
  var STATIONS = [[3.22, 0.94, 0.95, 0.96, 0.97, 0.95, 1.02], [2.92, 0.46, 1.00, 0.92, 1.00, 0.98, 1.14],
                  [2.25, 0.42, 1.00, 0.92, 1.42, 1.02, 1.38], [1.95, 0.42, 1.00, 0.92, 1.42, 1.22, ROOF],
                  [-3.05, 0.42, 1.00, 0.92, 1.42, 1.22, ROOF], [-3.20, 0.58, 1.00, 0.92, 1.42, 1.22, ROOF],
                  [-3.23, 0.68, 1.00, 0.92, 1.42, 1.20, 1.58]];
  /* the glacis plane (centre line) from the nose edge (3.22, 1.02) up to the cab front foot (2.25, 1.38) */
  var GT = unit([-0.97, 0, 0.36]), GN = [-GT[2], 0, GT[0]];
  if (GN[2] < 0) GN = [-GN[0], 0, -GN[2]];
  function gp(d, y) { return [3.22 + GT[0] * d, y, 1.02 + GT[2] * d]; }
  /* the cab front plane from (2.25, 1.38) up to (1.95, ROOF) */
  var CT = unit([-0.30, 0, ROOF - 1.38]), CN = [CT[2], 0, -CT[0]];
  function cp(d, y) { return [2.25 + CT[0] * d, y, 1.38 + CT[2] * d]; }
  /* the lower nose plate from the nose edge (3.22, 0.96) down to its foot (2.92, 0.46) */
  var LT = unit([-0.30, 0, -0.50]), LN = [-LT[2], 0, LT[0]];
  if (LN[0] < 0) LN = [-LN[0], 0, -LN[2]];
  function lp(d, y) { return [3.22 + LT[0] * d, y, 0.96 + LT[2] * d]; }

  function hull(B) {
    var s, k, i, p, q, x, y, st = [];
    for (i = 0; i < STATIONS.length; i++) st.push(ring.apply(null, STATIONS[i]));
    loft(B.paint, st, false);
    running(B);
    for (s = -1; s <= 1; s += 2) {
      /* the fenders out to the nose (C, D): a plate over the track from the cab chamfer forward, a lip under it */
      prism(B.paint, s > 0 ? [[2.25, 0.99], [3.05, 0.99], [3.16, 1.10], [3.16, 1.42], [2.25, 1.42]]
                           : [[2.25, -1.42], [3.16, -1.42], [3.16, -1.10], [3.05, -0.99], [2.25, -0.99]], 0.90, 0.95);
      box(B.dark, -3.05, 3.16, s * 1.42 - 0.015, s * 1.42 + 0.015, 0.88, 0.93);
      /* headlamp in its wire cage on each fender end (C, D, H) */
      p = [3.00, s * 1.20, 1.10];
      cyl(B.dark, [p[0] - 0.12, p[1], p[2]], [p[0] + 0.02, p[1], p[2]], 0.10, 0.11, 14);
      cyl(B.glass, [p[0] + 0.02, p[1], p[2]], [p[0] + 0.035, p[1], p[2]], 0.09, 0.09, 14);
      box(B.dark, 2.90, 2.96, p[1] - 0.05, p[1] + 0.05, 0.95, 1.00);
      for (k = -1; k <= 1; k++) bar(B.dark, [2.86, p[1] + k * 0.11, 0.96], [3.10, p[1] + k * 0.11, 1.24], 0.014);
      bar(B.dark, [3.10, p[1] - 0.12, 1.24], [3.10, p[1] + 0.12, 1.24], 0.014);
      bar(B.dark, [3.10, p[1] - 0.12, 1.24], [3.10, p[1] - 0.12, 0.98], 0.014);
      bar(B.dark, [3.10, p[1] + 0.12, 1.24], [3.10, p[1] + 0.12, 0.98], 0.014);
      /* tow eyes at the foot of the lower nose plate (D) */
      q = lp(0.40, s * 0.72);
      box(B.dark, q[0] - 0.02, q[0] + 0.14, q[1] - 0.06, q[1] + 0.06, q[2] - 0.08, q[2] + 0.04);
      cylY(B.dark, q[0] + 0.12, q[1] - 0.06, q[1] + 0.06, q[2] - 0.02, 0.05, 8);
      /* upper flank: grab handles, two small vent slots at the front (F), the tow cable along it (F, H) */
      for (k = 0; k < 4; k++) box(B.dark, 1.30 - k * 1.25, 1.42 - k * 1.25, s * 1.40 - 0.02, s * 1.40 + 0.02, 1.36, 1.40);
      for (k = 0; k < 2; k++) planeBox(B.dark, [1.45 - k * 0.30, s * 1.30, 1.30], [1, 0, 0], [0, 0, 1], [0, s, 0.2 * 0], -0.10, 0.10, -0.03, 0.03, 0.0, 0.035);
      cyl(B.dark, [1.85, s * 1.425, 1.08], [-2.60, s * 1.425, 1.08], 0.022, 0.022, 6);
      box(B.dark, 1.75, 1.95, s * 1.41 - 0.025, s * 1.41 + 0.025, 1.02, 1.14);
      box(B.dark, -2.70, -2.50, s * 1.41 - 0.025, s * 1.41 + 0.025, 1.02, 1.14);
      /* the cab chamfer: a seam where the side plate meets the cab (D, F) */
      bar(B.dark, [2.25, s * 1.40, 0.97], [1.95, s * 1.235, ROOF - 0.03], 0.02);
      /* rear corners: louvred gills, triangular vanes in a frame (G) */
      for (k = 0; k < 6; k++) {
        y = s * (1.06 + k * 0.058);
        hexa(B.paint, [[-3.24, y - 0.012, 0.98], [-3.24, y + 0.012, 0.98], [-3.31, y + 0.012, 1.30], [-3.31, y - 0.012, 1.30],
                       [-3.24, y - 0.012, 1.50], [-3.24, y + 0.012, 1.50], [-3.24, y + 0.012, 1.30], [-3.24, y - 0.012, 1.30]]);
      }
      box(B.dark, -3.25, -3.215, s * 1.03 - 0.02, s * 1.40 + 0.02, 0.94, 1.52);
      box(B.paint, -3.30, -3.215, s * 1.03 - 0.025, s * 1.03 + 0.025, 0.94, 1.54);
      /* stern lamps */
      box(B.dark, -3.26, -3.22, s * 0.92 - 0.06, s * 0.92 + 0.06, 1.42, 1.52);
      /* rear door hinges */
      for (k = 0; k < 2; k++) box(B.dark, -3.27, -3.22, s * 0.86 - 0.04, s * 0.86 + 0.04, 0.82 + k * 0.48, 0.93 + k * 0.48);
      /* team strips on the roof, facing up (modest) */
      box(B.team, 0.10, 0.85, s * 1.02 - 0.08, s * 1.02 + 0.08, ROOF - 0.01, ROOF + 0.02);
    }
    /* the rear doors: centre split, a handle each, the step plate (G) */
    box(B.dark, -3.25, -3.225, -0.012, 0.012, 0.74, 1.54);
    box(B.dark, -3.25, -3.225, -0.86, 0.86, 1.53, 1.555);
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.28, -3.225, s * 0.18 - 0.06, s * 0.18 + 0.06, 1.12, 1.16);
    box(B.paint, -3.30, -3.20, -0.80, 0.80, 0.62, 0.66);

    /* the glacis: the folded trim vane lying on it, a rounded-end panel with its hinge rib (D) */
    planePrism(B.paint, gp(0, 0), GT, [0, 1, 0], GN,
               [[-0.70, 0.12], [0.70, 0.12], [0.82, 0.22], [0.82, 0.48], [0.70, 0.58], [-0.70, 0.58], [-0.82, 0.48], [-0.82, 0.22]], 0.0, 0.035);
    planeBox(B.dark, gp(0, 0), [0, 1, 0], GT, GN, -0.80, 0.80, 0.10, 0.12, 0.0, 0.03);
    for (k = -1; k <= 1; k += 2) planeBox(B.dark, gp(0, 0), [0, 1, 0], GT, GN, k * 0.42 - 0.04, k * 0.42 + 0.04, 0.30, 0.38, 0.035, 0.05);
    /* the grille at the top of the glacis, centre (D) */
    planeBox(B.dark, gp(0, 0), [0, 1, 0], GT, GN, -0.17, 0.17, 0.80, 0.97, 0.0, 0.02);
    for (k = 0; k < 5; k++) planeBox(B.paint, gp(0, 0), [0, 1, 0], GT, GN, -0.16, 0.16, 0.81 + k * 0.034, 0.825 + k * 0.034, 0.02, 0.03);
    /* the lower nose plate: the bolt row along its top and a row near the foot (D) */
    for (k = 0; k < 9; k++) {
      y = -0.84 + k * 0.21;
      planeBox(B.dark, lp(0, 0), [0, 1, 0], LT, LN, y - 0.018, y + 0.018, 0.06, 0.09, 0.0, 0.02);
      if (k % 2 === 0) planeBox(B.dark, lp(0, 0), [0, 1, 0], LT, LN, y - 0.018, y + 0.018, 0.36, 0.39, 0.0, 0.02);
    }
    /* the cab front: the driver's window on the LEFT with its armoured frame (F), the commander's on the right (D, H) */
    planeBox(B.dark, cp(0, 0), [0, 1, 0], CT, CN, 0.28, 0.80, 0.05, 0.30, 0.0, 0.03);
    planeBox(B.glass, cp(0, 0), [0, 1, 0], CT, CN, 0.33, 0.75, 0.09, 0.26, 0.03, 0.04);
    planeBox(B.paint, cp(0, 0), [0, 1, 0], CT, CN, 0.25, 0.83, 0.30, 0.34, 0.0, 0.10);
    planeBox(B.dark, cp(0, 0), [0, 1, 0], CT, CN, -0.78, -0.36, 0.06, 0.28, 0.0, 0.05);
    planeBox(B.glass, cp(0, 0), [0, 1, 0], CT, CN, -0.72, -0.42, 0.10, 0.24, 0.05, 0.06);
    /* the driver's raised hatch on the cab's LEFT (D), rounded corners, hinge at the back */
    prism(B.paint, [[1.42, 0.30], [1.86, 0.30], [1.92, 0.36], [1.92, 0.84], [1.86, 0.90], [1.42, 0.90], [1.36, 0.84], [1.36, 0.36]], ROOF - 0.01, ROOF + 0.07);
    prism(B.paint, [[1.46, 0.36], [1.84, 0.36], [1.86, 0.40], [1.86, 0.80], [1.84, 0.84], [1.46, 0.84], [1.42, 0.80], [1.42, 0.40]], ROOF + 0.07, ROOF + 0.10);
    box(B.dark, 1.30, 1.38, 0.42, 0.78, ROOF, ROOF + 0.06);
    box(B.dark, 1.60, 1.72, 0.58, 0.62, ROOF + 0.10, ROOF + 0.13);
    /* the mushroom vent behind the hatch (A, F) */
    cylZ(B.paint, 0.95, 0.42, ROOF - 0.01, ROOF + 0.22, 0.075, 12);
    cyl(B.paint, [0.95, 0.42, ROOF + 0.20], [0.95, 0.42, ROOF + 0.27], 0.15, 0.16, 16);
    cyl(B.paint, [0.95, 0.42, ROOF + 0.27], [0.95, 0.42, ROOF + 0.31], 0.16, 0.10, 16);
    cylZ(B.dark, 0.95, 0.42, ROOF + 0.17, ROOF + 0.20, 0.10, 12);
    /* a round flat hatch on the left of the troop roof (F) */
    cylZ(B.paint, 0.25, 0.55, ROOF - 0.01, ROOF + 0.05, 0.30, 20);
    cylZ(B.dark, 0.25, 0.55, ROOF + 0.05, ROOF + 0.06, 0.22, 16);
    box(B.dark, 0.48, 0.58, 0.50, 0.60, ROOF, ROOF + 0.07);
    /* the sight on the cab's RIGHT (B, D, E, H): a braced frame, a column, the barrel lying fore-and-aft with its
       window forward and a cap at the back, the periscope head behind it */
    var hx = 1.45, hy = -0.58, hz = ROOF + 0.36;
    box(B.paint, hx - 0.28, hx + 0.20, hy - 0.22, hy + 0.22, ROOF - 0.01, ROOF + 0.05);
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [hx - 0.24, hy + s * 0.19, ROOF + 0.05], [hx - 0.04, hy + s * 0.16, hz - 0.16], 0.04);
      bar(B.paint, [hx + 0.16, hy + s * 0.19, ROOF + 0.05], [hx - 0.04, hy + s * 0.16, hz - 0.16], 0.04);
      bar(B.dark, [hx - 0.24, hy + s * 0.19, ROOF + 0.05], [hx + 0.16, hy + s * 0.19, ROOF + 0.20], 0.025);
    }
    cylZ(B.paint, hx - 0.04, hy, ROOF + 0.05, hz - 0.12, 0.08, 14);
    box(B.paint, hx - 0.16, hx + 0.08, hy - 0.19, hy + 0.19, hz - 0.20, hz - 0.13);
    revolve(B.paint, [[hx - 0.32, 0.0], [hx - 0.32, 0.13], [hx - 0.29, 0.165], [hx + 0.24, 0.17], [hx + 0.27, 0.15], [hx + 0.27, 0.0]], hy, hz, 22);
    cylX(B.dark, hx + 0.27, hx + 0.285, hy, hz, 0.13, 20);
    cylX(B.glass, hx + 0.285, hx + 0.29, hy, hz, 0.10, 20);
    box(B.paint, hx - 0.10, hx + 0.16, hy - 0.06, hy + 0.06, hz + 0.16, hz + 0.21);
    box(B.paint, hx - 0.66, hx - 0.46, hy - 0.08, hy + 0.08, ROOF - 0.01, hz + 0.12);
    box(B.paint, hx - 0.68, hx - 0.44, hy - 0.10, hy + 0.10, hz + 0.12, hz + 0.18);
    box(B.glass, hx - 0.445, hx - 0.435, hy - 0.06, hy + 0.06, hz + 0.02, hz + 0.10);
    /* the launcher's roof hatch, closed: its outline and hinge blocks (C-F) */
    box(B.dark, XP - 0.55, XP + 0.95, -0.47, -0.43, ROOF - 0.005, ROOF + 0.012);
    box(B.dark, XP - 0.55, XP + 0.95, 0.43, 0.47, ROOF - 0.005, ROOF + 0.012);
    box(B.dark, XP - 0.55, XP - 0.51, -0.47, 0.47, ROOF - 0.005, ROOF + 0.012);
    box(B.dark, XP + 0.91, XP + 0.95, -0.47, 0.47, ROOF - 0.005, ROOF + 0.012);
    for (s = -1; s <= 1; s += 2) box(B.dark, XP + 0.80, XP + 0.98, s * 0.36 - 0.05, s * 0.36 + 0.05, ROOF, ROOF + 0.06);
    /* the box with two lamps at the very back of the roof (F, G), and the hand rail on the right rear roof (F) */
    box(B.paint, -3.20, -2.62, -0.62, 0.70, ROOF - 0.01, ROOF + 0.30);
    box(B.paint, -3.22, -2.60, -0.64, 0.72, ROOF + 0.30, ROOF + 0.33);
    box(B.dark, -3.215, -3.20, -0.58, 0.66, ROOF + 0.31, ROOF + 0.32);
    for (k = 0; k < 2; k++) cylX(B.glass, -3.23, -3.20, -0.42 - k * 0.12, ROOF + 0.16, 0.04, 10);
    cylX(B.paint, -3.30, -3.20, -0.18, ROOF + 0.16, 0.05, 10);
    for (s = 0; s < 3; s++) bar(B.dark, [-1.20 - s * 0.85, -1.10, ROOF], [-1.20 - s * 0.85, -1.10, ROOF + 0.17], 0.03);
    bar(B.dark, [-1.20, -1.10, ROOF + 0.17], [-2.90, -1.10, ROOF + 0.17], 0.03);
    bar(B.dark, [-1.40, -0.85, ROOF + 0.12], [-2.40, -0.85, ROOF + 0.12], 0.025);
    /* troop roof hatches on the right (F): two flat lids */
    for (k = 0; k < 2; k++) {
      box(B.paint, 0.55 - k * 0.95, 1.20 - k * 0.95, -1.00, -0.30, ROOF - 0.01, ROOF + 0.035);
      box(B.dark, 0.60 - k * 0.95, 0.66 - k * 0.95, -0.90, -0.40, ROOF + 0.035, ROOF + 0.05);
    }
  }

  /* -------------------------------------------------------------- the launcher */
  /* Drawn at REST in hull coordinates (tube level, axis at CS, wholly under the roof), then shifted so the origin of
     the group is the hinge H = (HX, 0, CS) in the turret frame (see the header). */
  function launcher(B) {
    var k, s, XT0 = XP - 0.68, XT1 = XP + 1.15, r = 0.11;
    /* the 9M114 container: body, the swelled end rings, the clamp bands, the rear cap and the front cover (A, B, G) */
    cylX(B.paint, XT0, XT1, 0, CS, r, 22);
    cyl(B.paint, [XT1 - 0.12, 0, CS], [XT1, 0, CS], r + 0.012, r + 0.012, 22);
    cyl(B.paint, [XT0, 0, CS], [XT0 + 0.10, 0, CS], r + 0.014, r + 0.014, 22);
    cylX(B.dark, XT0 - 0.02, XT0, 0, CS, r * 0.85, 18);
    cylX(B.dark, XT1, XT1 + 0.015, 0, CS, r * 0.9, 18);
    for (k = 0; k < 4; k++) cylX(B.paint, XT0 + 0.32 + k * 0.40, XT0 + 0.35 + k * 0.40, 0, CS, r + 0.006, 18);
    /* the cradle under the tube: a beam, the yoke on the column top with its trunnion bosses (A, B, G) */
    box(B.paint, XP - 0.42, XP + 0.52, -0.07, 0.07, CS - r - 0.07, CS - r + 0.005);
    box(B.paint, XP - 0.16, XP + 0.18, -0.16, 0.16, CS - r - 0.22, CS - r - 0.07);
    for (s = -1; s <= 1; s += 2) cylY(B.dark, XP, s * 0.16, s * 0.21, CS - r - 0.14, 0.055, 12);
    /* right side: a pod facing aft with a grilled face (G) and a pod facing forward with a window (B, G) */
    cylX(B.paint, XP - 0.56, XP - 0.24, -0.24, CS - r - 0.12, 0.09, 16);
    cylX(B.dark, XP - 0.575, XP - 0.56, -0.24, CS - r - 0.12, 0.08, 16);
    for (k = -2; k <= 2; k++) box(B.paint, XP - 0.585, XP - 0.57, -0.24 + k * 0.024 - 0.006, -0.24 + k * 0.024 + 0.006, CS - r - 0.18, CS - r - 0.06);
    box(B.paint, XP - 0.30, XP - 0.16, -0.24, -0.12, CS - r - 0.12, CS - r - 0.05);
    cylX(B.paint, XP + 0.20, XP + 0.50, -0.23, CS - r - 0.11, 0.08, 16);
    cylX(B.glass, XP + 0.50, XP + 0.515, -0.23, CS - r - 0.11, 0.06, 14);
    box(B.paint, XP + 0.14, XP + 0.30, -0.22, -0.12, CS - r - 0.10, CS - r - 0.03);
    /* left side: the box on the cradle (B) */
    box(B.paint, XP - 0.26, XP + 0.14, 0.12, 0.30, CS - r - 0.26, CS - r - 0.04);
    box(B.dark, XP + 0.14, XP + 0.155, 0.16, 0.26, CS - r - 0.20, CS - r - 0.10);
    /* the column: a box beam down through the roof hatch (A, G) */
    box(B.paint, XP - 0.11, XP + 0.11, -0.12, 0.12, CS - r - 0.78, CS - r - 0.20);
    box(B.dark, XP - 0.13, XP + 0.13, -0.14, 0.14, CS - r - 0.30, CS - r - 0.26);
    /* the plate leaning from the column down and forward to the roof (G) */
    var T0 = [XP + 0.09, 0, CS - 0.22], T1 = [XP + 0.43, 0, ROOF + 0.02 - RISE - 0.05], U = unit(sub(T1, T0)), N = [-U[2], 0, U[0]];
    if (N[2] < 0) N = [-N[0], 0, -N[2]];
    planeBox(B.paint, T0, U, [0, 1, 0], N, 0.0, Math.sqrt(dot(sub(T1, T0), sub(T1, T0))), -0.28, 0.28, -0.035, 0.0);
    planeBox(B.dark, T0, U, [0, 1, 0], N, 0.02, 0.10, -0.08, 0.08, 0.0, 0.03);
    bar(B.dark, [XP + 0.10, 0, CS - 0.36], [XP + 0.26, 0, CS - 0.34], 0.05);
    /* shift to the hinge frame */
    var key, b, i;
    for (key in B) { b = B[key]; for (i = 0; i < b.P.length; i += 3) { b.P[i] -= HX; b.P[i + 2] -= CS; } }
    return [[XT1 + 0.02 - HX, 0, 0, XT0 - 0.02 - HX]];
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), k, wg, WB, tur, E, cells, h;
    hull(HB);
    h = new THREE.Group(); h.name = "hull";
    flush(THREE, h, HB);
    g.add(h);
    for (k = 0; k < NW; k++) {
      WB = { paint: new Bin(T.paint, true) };
      wheel(WB.paint);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[k], 0, ZW);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    cells = launcher(EB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(XP, 0, ROOF);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX - XP, 0, CS - ROOF);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = EL;
    tur.add(E);
    g.add(tur);
    g.name = "pact_e80_tankdestroyer";
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e80_tankdestroyer"] = {
  len: 6.53,
  build: function (THREE, M, C) { return HeroShturm.build(THREE, M, C); }
};
