/* ============ ru_tochka.js - HERO model: OTR-21 Tochka (9K79) on the 9P129 launcher, BAZ-5921 6x6 amphibious chassis ============
   Two rows, one vehicle:
     pact_e80_tel  "OTR-21 Tochka, 9P129 launcher"  (1976)
     pact_e90_tel  "OTR-21 Tochka-U"                (1989), drawn as the 9P129-1M
   Do NOT confuse with pact_e00_tel / tel_p (the Iskander, js/hero/ru_iskander.js): not registered here.
   Redone 2026-10-24 to the full-quality standard (lofted boat hull on the published stations, photo-compared).

   Published figures (militaryrussia.ru "9K79 Tochka - SS-21 SCARAB", topic-191, from the Polish 1989 technical description
   "Zestaw Rakietowy 9K79. Opis techniczny"): 9P129 length 9,490 mm, width 2,890, height on the march 2,340, ground clearance
   357, track 2,275, wheelbase 2,800 + 2,600, front overhang 2,238, rear overhang 1,848; launch elevation 78 degrees at any
   range, the rail traverses +-15 degrees, 15 s to raise; 18,145-18,200 kg with round and crew (17,945 kg the 9P129); water
   jets afloat; a heat-protective cover over the warhead.  The 9M79 round 6,400 mm (9M79-1 6,407), 650 mm across, wings and
   lattice rudders 1,440 mm in span.  ru.wikipedia "BAZ-5921": 17.8 t, front and rear axles steer.
   CORRECTED from the earlier header: length 9.49 m (was 9.63, recalled), width 2.89 (was 3.15), height 2.34 (was 2.86); the
   launch angle is the published 78 degrees (was 75, read off a photograph); the round is a 6.40 m body with four low wings and
   four LATTICE rudders at the tail (was plain fins); the water-jet outlets ARE photographed (rear17) and are drawn.

   References (Wikimedia Commons, fetched at 960 px for this model, cached in the scratchpad q_tochka_ref):
     pp512  "ParkPatriot2015part5-12.jpg"  9P129-1M, front three-quarter: bow, three windscreen panes, lamp recesses, mirrors
     pp513  "ParkPatriot2015part5-13.jpg"  9P129-1M, port side three-quarter: the chine, the cab side, ribs, grille, arches
     pp514  "ParkPatriot2015part5-14.jpg"  9P129-1M, starboard rear three-quarter: ribs, a leaf part open, its end gusset
     pp515  "ParkPatriot2015part5-15.jpg"  9P129-1M, starboard side: cab, windscreen covers folded forward as visors
     pp516  "ParkPatriot2015part5-16.jpg"  inside the compartment from the rear: grey interior, the green erector boom, arms
     rear17 "2P129 TEL 9K79 Tochka system Rear View 2017-12-24.jpg"  the rear plate head-on (scaled to the 2.89 m width)
     chem01 "ChemicalExercise2018-01.jpg"  9P129-1M of the 448th brigade setting up: the round rising about the rear of the body
     pl3376 "Toczka Polish DSC03376.jpg"   Polish 9P129, port front three-quarter: the windscreen covers standing up
     dyw8   "Dywizjon ogniowy Toczka (8).jpg", vos27 "Vostok2010 27.jpg"  the launch, the round nearly upright at the rear
     sov21  "Soviet SS-21.JPEG"  the 1970s-80s vehicle, port side, three-colour scheme (a monochrome print: NOT drawn)
   No three-view drawing was found; the stations below are the published figures, the heights and the cross-section measured
   off rear17 (200 px/m) and the side three-quarters.

   Recognition list (each is drawn; where it rests):
     1. A long low hull, 2.34 m high on 9.49 m: the box-sided missile compartment over two thirds of the length (pp513, pp515).
     2. The BOAT BOW: a narrow deck from the windscreen to a knuckle at the stem, a short face (the folded wave-breaker board)
        sloping back under it, then a long bottom plate up from under the front axle (pp512, pp513, pp515).
     3. The cab: a hard chine at windscreen-base height running from the stem to the compartment, the upper side leaning in
        to a roof lower than the compartment's, the lower side leaning in to the arches (pp513, pp515).
     4. Three windscreen panes on a 37-degree slope with frames and wipers, a side window in each upper cab side (pp512, pp515).
     5. The armoured windscreen covers, hinged at the roof edge: standing up on the Polish 9P129 (pl3376), folded forward as
        visors on the 9P129-1M (pp515).  Each row is drawn as its photographs show it.
     6. Six 1.14 m lugged tyres on dark dished wheels, axles 2.80 + 2.60 m apart, under big arches cut into the side, dark
        inside (pp513, pp514).
     7. Vertical compartment sides with four horizontal ribs and a double louvred grille over the power pack (pp513, pp515).
     8. The roof: one long leaf a side hinged on the wall top, each a chamfer and a flat top meeting on the centre line, the
        centre strip a little proud (rear17); opened, they stand up with gusset end plates (pp514, chem01).
     9. The rear plate: lamps in square housings at the top corners, a recessed centre panel, two round water-jet outlets
        (the port one open, the starboard one shut by its fluted flap: rear17).
    10. The 9M79 round: a long cone, a 0.65 m body, four low wings and four lattice rudders at the tail, on a green erector boom
        hinged at the rear of the body; raised it leans 12 degrees forward over the vehicle (chem01, vos27, dyw8).
    11. Plain Soviet/Russian green, no numbers (pp513, pl3376, chem01).

   STATION TABLE (metres, x forward from mid-length; the published overhangs and wheelbase):
       +4.745 the stem knuckle (deck 1.42, face foot +4.62 at 0.98)   +4.35 windscreen foot (1.55)    +3.60 cab roof front edge
       +3.05  the bottom plate reaches the belly                      +2.507 front axle                 +2.05 cab / compartment joint
       +0.66..+1.34 the louvred grille                                -0.293 middle axle                -2.893 rear axle
       -4.15  the stern plate reaches the belly                       -4.745 rear plate (foot 0.72)
     Heights: belly 0.36 (clearance 0.357), skirt foot 0.70, arch tops 1.30, chine 1.58, wall top and leaf hinges 1.94, cab roof
     2.12, roof leaves 2.27, their centre strip 2.30.  Half widths: walls 1.445 (2.89 published), the narrow lower hull 0.86,
     roof flat 1.24, cab roof 1.06, track 1.1375 (2,275 published).  Arches 1.36 m across at the foot, 0.84 at the top.
     The windscreen stations are scaled off pp515 against the published 2.238 m front overhang.

   Poses: render3d shows "deploypose" once the unit has set up (e.deployed) and "travelpose" otherwise.  Travel: both leaves
   shut.  Set up: both leaves opened 35 degrees on their outer hinges, with the holding arms (pp516); the angle is NOT published:
   chem01 shows the port leaf lifted about a third of the way, its ribbed underside to the camera, and the rear gussets
   standing up; 35 degrees leaves the 0.65 m body a 0.90 m gap between the inner edges and keeps the tail's wings and rudders
   under the leaves as the round turns about its pivot.  The
   round and its boom are the group "podelev", hinged at x -4.26, z 1.62 (the boom's pivot at the rear of the trough), level
   at rest and raised by poseLauncher to userData.el = 78 degrees (published), nose forward; userData.cells holds its one
   nozzle.  A round raised before the unit has deployed rises through the shut leaves (as on the Iskander).
   NOT drawn (not confirmed, or not showable): the rail's +-15 degree traverse (turret:false: the round stays fore-and-aft);
   the warhead's heat cover (photographed only raised on display vehicles with no round aboard, pp513/pp515/pl3376; chem01,
   the one set-up photograph, shows none standing); two thin poles on the leaves (chem01, purpose unknown); the round pads
   under the rear plate (rear17, purpose unknown); the cab interior; the 1970s three-colour camouflage (sov21, a monochrome
   print whose hues are unknown); the white bands on the chem01 round (a practice round); any number or marking.
   Variants: the 9P129 (1976) and the 9P129-1M (Tochka-U, 1989) differ in their equipment, by which rounds they can fire
   (militaryrussia); no change to the vehicle's shape is documented or visible, so one geometry serves both.  The only
   photographed difference drawn is the position of the windscreen covers (recognition item 5).
   Paint: sampled off pp514 (lit side 103,105,93), chem01 (overcast 100,102,95) and pp513 (shade 50,51,46), taken to about
   0.8 of the lit level with the olive the eye sees in pp513: base #4f5642 on a canvas texture of weathered blotches and faint
   panel seams.  Wheels dark (pp513, pp514), by vertex colour.  Interior light grey (pp516), taken down to #666b6a.
   Nodes: six "roadwheel" groups, "podelev", "travelpose", "deploypose"; NOTHING named "turret" (turret:false).
   Budget (dump.js): 10,332 triangles, 9,660 shown on the march and 9,756 set up; 15 meshes and draw calls, 2 of them the
   hidden pose; 7 materials, 1 texture.
   Materials (7): paint with its canvas texture, dark, glass, tyre with vertex colours, missile paint, interior grey, C.team
   (small up-facing strips on the cab roof).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTochka = (function () {
  "use strict";

  var PAINT = { base: "#4f5642", blots: ["#454c39", "#5a614b", "#4a503d"], seed: 5921 };
  var AX = [2.507, -0.293, -2.893], TY = 1.1375, RT = 0.57;     /* axles (2.80 + 2.60 m), half track, tyre radius */
  var X0 = -4.745, X1 = 4.745, XC = 2.05;                       /* rear plate, stem, cab / compartment joint */
  var HW = 1.445, LH = 0.86, ZB = 0.36, ZS = 0.70, ZA = 1.30, ZW = 1.94, ZR = 2.27, RW = 1.24;
  var ZK = 1.58, ZC = 2.12, CW = 1.06;                          /* the cab's chine, roof and roof half width */
  var HX = -4.26, HZ = 1.62, EL = 78 * Math.PI / 180;           /* the boom's pivot; the published launch elevation */
  var LEAF_OPEN = 35 * Math.PI / 180;

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
      /* a single flat coat gone patchy with weather: low-contrast drift, no pattern */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 12; i++) {
          x = R() * 256; y = R() * 256; rr = 18 + R() * 40;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.07)" : "rgba(240,236,215,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 30, 2 + R() * 18);
      }
      /* panel framing (rc -27, ra: the walls and the cover are riveted sheet on frames): faint seams on a 0.98 m
         square with rows of rivet heads along them, and thin rain streaks running down */
      q.fillStyle = "rgba(20,22,16,0.16)";
      for (i = 0; i < 256; i += 85) { q.fillRect(i, 0, 1, 256); q.fillRect(0, i, 256, 1); }
      for (i = 0; i < 256; i += 85) for (k = 3; k < 256; k += 7) {
        q.fillStyle = "rgba(225,228,205,0.10)"; q.fillRect(i + 3, k, 1, 1); q.fillRect(k, i + 3, 1, 1);
        q.fillStyle = "rgba(10,10,8,0.12)"; q.fillRect(i + 4, k + 1, 1, 1); q.fillRect(k + 1, i + 4, 1, 1);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,24,18,0.06)"; q.fillRect(R() * 256, R() * 256, 1 + R() * 2, 20 + R() * 60); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
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


  /* -------------------------------------------------------------- materials */
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.92, metalness: 0.03 });
    T.msl = new THREE.MeshStandardMaterial({ color: 0x56633f, roughness: 0.55, metalness: 0.25 });
    T.grey = new THREE.MeshStandardMaterial({ color: 0x666b6a, roughness: 0.8, metalness: 0.15 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), grey: new Bin(T.grey, false), team: new Bin(T.team, false) };
  }

  /* the cross-country tyre, 1.14 m over the tread and 0.46 m wide (measured off pp513/pp515/rear17 against the published
     2.34 m height and 2.89 m width; no tyre size was found published): two lanes of lugs a half step apart over the crown,
     a dished wheel with a raised hub and six nuts each side (pp513, pp514) */
  function tyre(bin, rim) {
    var N = 28, R = [[-0.23, 0.30, 0, 0], [-0.23, 0.47, 0, 0], [-0.20, 0.555, 1, 0], [-0.02, 0.57, 1, 0],
                     [0.02, 0.57, 1, 1], [0.20, 0.555, 1, 1], [0.23, 0.47, 0, 0], [0.23, 0.30, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.03;
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
      cyl(rim, [0, k * 0.22, 0], [0, k * 0.17, 0], 0.30, 0.26, 18, true, false);   /* the wheel dish, its rim proud of the sidewall */
      cylY(rim, 0, k * 0.17, k * 0.27, 0, 0.12, 10);                               /* the hub */
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU + 0.3;
        box(rim, 0.19 * Math.cos(a) - 0.02, 0.19 * Math.cos(a) + 0.02, k * 0.22 - 0.02, k * 0.22 + 0.02, 0.19 * Math.sin(a) - 0.02, 0.19 * Math.sin(a) + 0.02);
      }
    }
  }
  function lin(n) {
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }
  function side(bin, s, x0, x1, z0, z1, y, t) {      /* a thin plate on a side face at y = s*|y|, standing out by t */
    box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1);
  }
  /* a convex outline [x, z] on the side at y = s*|y|, standing out by t */
  function sideProf(bin, s, pts, y, t) { profY(bin, pts, s > 0 ? y : -y - t, s > 0 ? y + t : -y); }

  /* ---- the hull rings (station table in the header) ---- */
  /* compartment: an open trough, vertical walls to the leaf hinges, floor at 1.05, the narrow lower hull under the arches */
  function trough(x, zb) {
    var w = HW - 0.05;
    return [[x, -0.80, zb], [x, 0.80, zb], [x, LH, zb + 0.14], [x, LH, ZA], [x, HW, ZA], [x, HW, ZW], [x, w, ZW], [x, w, 1.05],
            [x, -w, 1.05], [x, -w, ZW], [x, -HW, ZW], [x, -HW, ZA], [x, -LH, ZA], [x, -LH, zb + 0.14]];
  }
  /* the cab behind the bow: the lower hull, the side leaning out to the chine at ZK, the upper side leaning in to the roof */
  function cabRing(x, zb) {
    return [[x, -0.80, zb], [x, 0.80, zb], [x, LH, zb + 0.14], [x, LH, ZA], [x, 1.30, ZA], [x, HW, ZK], [x, CW, ZC],
            [x, -CW, ZC], [x, -HW, ZK], [x, -1.30, ZA], [x, -LH, ZA], [x, -LH, zb + 0.14]];
  }
  /* the boat bow: bottom plate (half width bw at zb), lower side up and out to (hl, zl), to the chine (hw, zk), the upper
     side (cab side, windscreen, deck) in to (ht, zt) */
  function bowRing(x, zb, bw, hl, zl, hw, zk, ht, zt) {
    return [[x, -bw, zb], [x, bw, zb], [x, hl, zl], [x, hw, zk], [x, ht, zt], [x, -ht, zt], [x, -hw, zk], [x, -hl, zl]];
  }

  function addHull(B, V) {
    var s, i, k, x, a, f;
    /* ---- the three lofts: compartment, cab, bow ---- */
    loft(B.paint, [trough(X0, 0.72), trough(-4.15, ZB), trough(XC, ZB)], false);
    loft(B.paint, [cabRing(XC, ZB), cabRing(3.05, ZB), cabRing(3.21, 0.42)], false);
    loft(B.paint, [bowRing(3.20, 0.42, 0.90, 1.28, 0.80, HW, ZK, CW, ZC),
                   bowRing(3.60, 0.577, 0.95, 1.30, 0.95, HW, ZK, CW, ZC),
                   bowRing(4.35, 0.873, 1.02, 1.32, 1.08, 1.41, 1.52, 1.31, 1.55),
                   bowRing(4.62, 0.98, 1.05, 1.30, 1.10, 1.37, 1.44, 1.33, 1.46),
                   bowRing(X1, 1.36, 1.08, 1.24, 1.38, 1.30, 1.40, 1.28, 1.42)], false);
    /* ---- skirts: the side wall below the arch line between the wheel arches (arches 1.36 m across at the foot, 1.10 at the
       top: pp513, pp515), each closed underneath ---- */
    var SK = [[AX[1] + 0.55, AX[0] - 0.55], [AX[2] + 0.55, AX[1] - 0.55]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < SK.length; i++) {
        sideProf(B.paint, s, [[SK[i][0] + 0.13, ZS], [SK[i][1] - 0.13, ZS], [SK[i][1] - 0.11, 1.06], [SK[i][1] + 0.13, ZA],
                              [SK[i][0] - 0.13, ZA], [SK[i][0] + 0.11, 1.06]], HW - 0.05, 0.05);
        box(B.paint, SK[i][0] + 0.13, SK[i][1] - 0.13, s > 0 ? LH : -HW, s > 0 ? HW : -LH, ZS, ZS + 0.04);
        side(B.paint, s, SK[i][0] + 0.06, SK[i][1] - 0.06, 0.92, 0.95, HW, 0.02);                 /* a rib along it */
      }
      sideProf(B.paint, s, [[X0, 0.74], [AX[2] - 0.68, ZS], [AX[2] - 0.66, 1.06], [AX[2] - 0.42, ZA], [X0, ZA]], HW - 0.05, 0.05);
      box(B.paint, X0 + 0.05, AX[2] - 0.68, s > 0 ? LH : -HW, s > 0 ? HW : -LH, ZS, ZS + 0.04);
      side(B.paint, s, X0 + 0.05, AX[2] - 0.62, 0.92, 0.95, HW, 0.02);
      /* the wheel wells: dark liners on the lower hull's side and under the arch tops (pp513, pp514: the arches read dark) */
      for (i = 0; i < 3; i++) {
        box(B.dark, AX[i] - 0.66, AX[i] + 0.66, s > 0 ? LH : -LH - 0.02, s > 0 ? LH + 0.02 : -LH, 0.62, ZA - 0.005);
        box(B.dark, AX[i] - 0.62, AX[i] + 0.62, s > 0 ? LH : -HW + 0.06, s > 0 ? HW - 0.06 : -LH, ZA - 0.03, ZA - 0.005);
      }
      /* the arch rims (a lip round each arch top) */
      for (i = 0; i < 3; i++) side(B.dark, s, AX[i] - 0.42, AX[i] + 0.42, ZA - 0.03, ZA, HW, 0.03);
    }

    /* ---- the compartment sides: horizontal ribs (pp513, pp514, pp515), the double louvred engine grille (pp513, pp515),
       the small hatch and fittings at its front, the hatch near the rear (pp514) ---- */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) {
        side(B.paint, s, X0 + 0.06, 0.62, 1.42 + k * 0.17, 1.45 + k * 0.17, HW, 0.025);
        side(B.paint, s, 1.38, XC - 0.04, 1.42 + k * 0.17, 1.45 + k * 0.17, HW, 0.025);
      }
      side(B.paint, s, X0 + 0.06, XC - 0.04, ZA, ZA + 0.04, HW, 0.03);                      /* the rail along the arch tops */
      side(B.paint, s, X0 + 0.02, XC, ZW - 0.05, ZW, HW, 0.035);                          /* the top rail at the hinge line */
      side(B.dark, s, 0.66, 1.34, 1.34, 1.88, HW, 0.012);                                  /* the grille frame */
      for (i = 0; i < 2; i++) {
        side(B.paint, s, 0.70 + i * 0.33, 0.97 + i * 0.33, 1.38, 1.84, HW, 0.02);
        for (k = 0; k < 8; k++) side(B.dark, s, 0.72 + i * 0.33, 0.95 + i * 0.33, 1.41 + k * 0.054, 1.43 + k * 0.054, HW, 0.03);
      }
      side(B.paint, s, 1.62, 1.84, 1.60, 1.78, HW, 0.02);                                  /* small hatch */
      side(B.dark, s, 1.70, 1.76, 1.66, 1.72, HW, 0.035);
      cylY(B.dark, 1.48, s * HW, s * (HW + 0.03), 1.48, 0.05, 8);
      cylY(B.dark, 1.48, s * HW, s * (HW + 0.03), 1.62, 0.04, 8);
      side(B.paint, s, -4.42, -4.12, 1.30, 1.80, HW, 0.02);                                /* rear side hatch (pp514) */
      side(B.dark, s, -4.30, -4.24, 1.50, 1.62, HW, 0.04);
      /* cab side: a small hatch and a handle behind the front arch (pp513 detail), the louvred grille at the bow corner */
      side(B.paint, s, 2.20, 2.42, 1.30, 1.50, 1.36, 0.06);
      side(B.dark, s, 2.27, 2.35, 1.36, 1.44, 1.42, 0.02);
    }
    /* the side windows in the upper cab side, the louvred grilles low on the bow corners (pp513 detail, pp515) */
    for (s = -1; s <= 1; s += 2) {                         /* the cab's upper side: from the chine (HW, ZK) in to the roof (CW, ZC) */
      var P0 = [0, s * HW, ZK], U = [1, 0, 0], W = unit([0, s * (CW - HW), ZC - ZK]), N = unit([0, s * (ZC - ZK), (HW - CW)]);
      planeBox(B.glass, P0, U, W, N, 2.55, 3.38, 0.12, 0.40, -0.01, 0.02);
      planeBox(B.dark, P0, U, W, N, 2.51, 3.42, 0.08, 0.44, -0.01, 0.012);
      for (k = 0; k < 6; k++) box(B.dark, 3.84, 4.06, s > 0 ? 1.335 + k * 0.012 : -1.365 - k * 0.012, s > 0 ? 1.365 + k * 0.012 : -1.335 - k * 0.012, 1.16 + k * 0.055, 1.185 + k * 0.055);
    }
    /* ---- the cab front: three panes on the windscreen slope with frames and wipers, the armoured covers over them (opened:
       standing up on the 9P129 photographed in Poland, folded forward as visors on the 9P129-1M at Army-2015) ---- */
    var WP = [3.60, 0, ZC], WD = unit([0.75, 0, -0.57]), WN = [-WD[2], 0, WD[0]];
    function wpt(y, w, h) { return [WP[0] + WD[0] * w + WN[0] * h, y, WP[2] + WD[2] * w + WN[2] * h]; }
    for (i = -1; i <= 1; i++) {
      planeBox(B.glass, WP, [0, 1, 0], WD, WN, i * 0.70 - 0.30, i * 0.70 + 0.30, 0.10, 0.76, -0.01, 0.02);
      planeBox(B.dark, WP, [0, 1, 0], WD, WN, i * 0.70 - 0.33, i * 0.70 + 0.33, 0.07, 0.79, -0.01, 0.012);
      bar(B.dark, wpt(i * 0.70 + 0.20, 0.18, 0.04), wpt(i * 0.70 - 0.12, 0.62, 0.04), 0.02);
      var ca = V.cover, D = [Math.cos(ca), 0, Math.sin(ca)], DN = [-Math.sin(ca), 0, Math.cos(ca)], H = [3.60, 0, ZC + 0.02];
      planeBox(B.paint, H, [0, 1, 0], D, DN, i * 0.70 - 0.31, i * 0.70 + 0.31, 0.02, 0.74, 0, 0.025);
      planeBox(B.paint, H, [0, 1, 0], D, DN, i * 0.70 - 0.31, i * 0.70 + 0.31, 0.02, 0.06, 0.025, 0.06);
      planeBox(B.paint, H, [0, 1, 0], D, DN, i * 0.70 - 0.31, i * 0.70 + 0.31, 0.70, 0.74, 0.025, 0.06);
      planeBox(B.paint, H, [0, 1, 0], D, DN, i * 0.70 - 0.31, i * 0.70 - 0.27, 0.06, 0.70, 0.025, 0.06);
      planeBox(B.paint, H, [0, 1, 0], D, DN, i * 0.70 + 0.27, i * 0.70 + 0.31, 0.06, 0.70, 0.025, 0.06);
      planeBox(B.paint, H, [0, 1, 0], D, DN, i * 0.70 - 0.03, i * 0.70 + 0.03, 0.06, 0.70, 0.025, 0.05);
      cylY(B.dark, 3.60, i * 0.70 - 0.22, i * 0.70 - 0.12, ZC + 0.02, 0.03, 6);
      cylY(B.dark, 3.60, i * 0.70 + 0.12, i * 0.70 + 0.22, ZC + 0.02, 0.03, 6);
    }
    /* the bow: the folded wave-breaker board on the front face with its rim, lamp recesses with headlamps and grilles at
       both corners, tow hooks on the bottom plate (pp512, pp513 detail) */
    var FP = [4.62, 0, 0.98], FD = unit([0.125, 0, 0.44]), FN = unit([0.44, 0, -0.125]);
    planeBox(B.paint, FP, [0, 1, 0], FD, FN, -0.95, 0.95, 0.04, 0.40, -0.01, 0.03);
    planeBox(B.dark, FP, [0, 1, 0], FD, FN, -0.95, 0.95, 0.02, 0.04, -0.01, 0.035);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.dark, FP, [0, 1, 0], FD, FN, s > 0 ? 0.98 : -1.22, s > 0 ? 1.22 : -0.98, 0.06, 0.40, -0.02, 0.01);
      planeBox(B.glass, FP, [0, 1, 0], FD, FN, s * 1.10 - 0.07, s * 1.10 + 0.07, 0.24, 0.36, 0, 0.03);
      for (k = 0; k < 3; k++) planeBox(B.paint, FP, [0, 1, 0], FD, FN, s > 0 ? 1.0 : -1.2, s > 0 ? 1.2 : -1.0, 0.08 + k * 0.05, 0.10 + k * 0.05, 0, 0.025);
      box(B.dark, 4.30, 4.42, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.80, 0.86);
      cylY(B.dark, 4.36, s * 0.55 - 0.08, s * 0.55 + 0.08, 0.76, 0.06, 8);
    }
    /* ---- the cab roof: two hatches, two lamps at the front, the whip antenna on the left front corner, mirrors on posts at
       both front corners (pp512, pp513, pp515), the team strips ---- */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 2.40, 3.00, s * 0.48 - 0.30, s * 0.48 + 0.30, ZC, ZC + 0.05);
      box(B.dark, 2.62, 2.78, s * 0.48 - 0.06, s * 0.48 + 0.06, ZC + 0.05, ZC + 0.08);
      cylZ(B.dark, 3.45, s * 0.92, ZC, ZC + 0.08, 0.05, 8);
      bar(B.dark, [3.70, s * 1.24, 1.82], [3.78, s * 1.42, 2.00], 0.035);
      bar(B.dark, [3.78, s * 1.42, 2.00], [3.78, s * 1.44, 2.26], 0.03);
      box(B.dark, 3.74, 3.82, s > 0 ? 1.36 : -1.52, s > 0 ? 1.52 : -1.36, 2.14, 2.42);
      box(B.glass, 3.82, 3.83, s > 0 ? 1.38 : -1.50, s > 0 ? 1.50 : -1.38, 2.16, 2.40);
      box(B.team, 2.20, 2.34, s * 0.95 - 0.08, s * 0.95 + 0.08, ZC, ZC + 0.02);
      box(B.team, 3.06, 3.40, s * 0.30 - 0.06, s * 0.30 + 0.06, ZC, ZC + 0.02);
    }
    cylZ(B.dark, 3.50, 1.00, ZC, ZC + 0.12, 0.06, 8);
    bar(B.dark, [3.50, 1.00, ZC + 0.12], [3.50, 1.00, ZC + 1.80], 0.022);

    /* ---- the rear plate (rear17, chem01): lamps in square housings at the top corners, the recessed centre panel with a
       step, the two water-jet outlets (the port one open, the starboard one shut by its fluted flap, as rear17 shows them),
       vertical stiffeners, a tow hook under it ---- */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X0 - 0.03, X0, s * 1.27 - 0.09, s * 1.27 + 0.09, 1.60, 1.76);
      cylX(B.glass, X0 - 0.045, X0 - 0.02, s * 1.27, 1.68, 0.05, 10);
      for (k = 0; k < 4; k++) box(B.paint, X0 - 0.03, X0, s * (0.62 + k * 0.17) - 0.015, s * (0.62 + k * 0.17) + 0.015, 1.36, 1.72);
    }
    box(B.paint, X0, X0 + 0.05, -HW + 0.05, HW - 0.05, 1.05, ZW);                          /* the rear wall of the trough */
    box(B.paint, X0 - 0.02, X0, -0.33, 0.33, 1.38, 1.62);
    box(B.dark, X0 - 0.04, X0, -0.32, 0.32, 1.08, 1.16);
    for (k = 0; k < 5; k++) box(B.paint, X0 - 0.05, X0 - 0.04, -0.30 + k * 0.15, -0.28 + k * 0.15, 1.08, 1.16);
    cylX(B.dark, X0 - 0.03, X0, 1.15, 1.17, 0.21, 16);
    cylX(B.grey, X0 - 0.031, X0 - 0.02, 1.15, 1.17, 0.16, 16);
    cyl(B.paint, [X0, -1.15, 1.10], [X0 - 0.04, -1.15, 1.10], 0.20, 0.17, 14);
    for (k = 0; k < 5; k++) { a = -0.9 + k * 0.45; bar(B.paint, [X0 - 0.045, -1.15, 1.02], [X0 - 0.045, -1.15 + 0.15 * Math.sin(a), 1.02 + 0.15 * Math.cos(a)], 0.02); }
    box(B.dark, X0 - 0.045, X0, -0.10, 0.10, 0.80, 0.90);
    bar(B.dark, [X0 - 0.035, -0.18, 0.84], [X0 - 0.035, 0.18, 0.84], 0.03);

    /* ---- inside the trough (seen with the roof open; pp516: grey inside, frames along the walls, the erector's pivot at
       the rear, the power pack under its cover at the front) ---- */
    for (s = -1; s <= 1; s += 2) {
      box(B.grey, X0 + 0.06, XC - 0.06, s > 0 ? HW - 0.07 : -HW + 0.05, s > 0 ? HW - 0.05 : -HW + 0.07, 1.06, ZW - 0.01);
      for (k = 0; k < 8; k++) { x = -4.30 + k * 0.80; box(B.grey, x, x + 0.06, s > 0 ? HW - 0.16 : -HW + 0.07, s > 0 ? HW - 0.07 : -HW + 0.16, 1.06, ZW - 0.04); }
      box(B.grey, X0 + 0.06, XC - 0.06, s > 0 ? HW - 0.30 : -HW + 0.07, s > 0 ? HW - 0.07 : -HW + 0.30, 1.60, 1.66);
      box(B.dark, HX - 0.12, HX + 0.12, s * 0.42 - 0.06, s * 0.42 + 0.06, 1.05, HZ - 0.40);
    }
    box(B.grey, X0 + 0.06, XC - 0.06, -HW + 0.07, HW - 0.07, 1.05, 1.07);
    box(B.grey, 0.45, XC - 0.10, -1.05, 1.05, 1.07, 1.24);
    for (k = 0; k < 5; k++) box(B.dark, 0.60 + k * 0.28, 0.70 + k * 0.28, -0.95, 0.95, 1.24, 1.26);
    box(B.paint, XC - 0.10, XC, -HW + 0.05, HW - 0.05, 1.05, ZW);                          /* the cab's rear bulkhead */
  }

  /* ---- the roof: one leaf a side, hinged along the wall top (y = s*HW, z = ZW); each is a chamfer face up to (s*RW, ZR) and
     the flat top to the centre line, with end plates (rear17 shows the leaves' ends, the centre half a little proud;
     pp514 a leaf part open on its outer hinge, its end plate a gusset).  th = the opening angle ---- */
  function leafPt(s, q, dz, x, th) {
    var c = Math.cos(th), sn = Math.sin(th), q2 = q * c + dz * sn, d2 = -q * sn + dz * c;
    return [x, s * (HW + q2), ZW + d2];
  }
  function leafSlab(bin, s, th, xa, xb, P) {       /* P: 4 (q, dz) corners of a convex section, extruded xa..xb */
    hexa(bin, [leafPt(s, P[0][0], P[0][1], xa, th), leafPt(s, P[1][0], P[1][1], xa, th), leafPt(s, P[1][0], P[1][1], xb, th), leafPt(s, P[0][0], P[0][1], xb, th),
               leafPt(s, P[3][0], P[3][1], xa, th), leafPt(s, P[2][0], P[2][1], xa, th), leafPt(s, P[2][0], P[2][1], xb, th), leafPt(s, P[3][0], P[3][1], xb, th)]);
  }
  function leaves(B, th) {
    var s, i, x, xa = X0 + 0.02, xb = XC - 0.04, dz = ZR - ZW, qc = RW - HW, t = 0.035, V, F, k, m, E;
    for (s = -1; s <= 1; s += 2) {
      leafSlab(B.paint, s, th, xa, xb, [[0, 0], [0.012, -0.01], [qc + 0.012, dz - 0.01], [qc, dz]]);
      leafSlab(B.paint, s, th, xa, xb, [[qc, dz - t], [-0.67, dz - t], [-0.67, dz], [qc, dz]]);
      leafSlab(B.paint, s, th, xa, xb, [[-0.67, dz - t], [-HW + 0.005, dz - t], [-HW + 0.005, dz + 0.03], [-0.67, dz + 0.03]]);
      leafSlab(B.paint, s, th, xa, xb, [[-HW + 0.005, dz - 0.12], [-HW + 0.04, dz - 0.12], [-HW + 0.04, dz], [-HW + 0.005, dz]]);
      for (i = 0; i < 6; i++) {                                                        /* ribs across the outer part */
        x = xa + 0.45 + i * 1.12;
        leafSlab(B.paint, s, th, x, x + 0.05, [[qc - 0.02, dz], [-0.69, dz], [-0.69, dz + 0.025], [qc - 0.02, dz + 0.025]]);
      }
      leafSlab(B.dark, s, th, xa + 0.3, xa + 0.6, [[-0.95, dz + 0.03], [-1.10, dz + 0.03], [-1.10, dz + 0.06], [-0.95, dz + 0.06]]);
      leafSlab(B.dark, s, th, xb - 0.6, xb - 0.3, [[-0.95, dz + 0.03], [-1.10, dz + 0.03], [-1.10, dz + 0.06], [-0.95, dz + 0.06]]);
      for (i = 0; i < 4; i++) { x = xa + 0.2 + i * 1.68; leafSlab(B.dark, s, th, x, x + 1.2, [[0.0, -0.03], [0.05, -0.03], [0.05, 0.03], [0.0, 0.03]]); }
      /* the end plates (gussets) */
      for (E = 0; E < 2; E++) {
        x = E ? xb : xa;
        leafSlab(B.paint, s, th, E ? x - 0.04 : x, E ? x : x + 0.04, [[-0.02, 0.02], [qc, dz], [-0.67, dz], [-0.30, 0.10]]);
        leafSlab(B.paint, s, th, E ? x - 0.04 : x, E ? x : x + 0.04, [[-0.30, 0.10], [-0.67, dz], [-HW + 0.005, dz], [-HW + 0.005, dz - 0.12]]);
        for (k = 0; k < 3; k++) leafSlab(B.paint, s, th, E ? x : x - 0.02, E ? x + 0.02 : x, [[-0.30 - k * 0.12, 0.14], [-0.33 - k * 0.12, 0.14], [-0.33 - k * 0.12, dz - 0.02], [-0.30 - k * 0.12, dz - 0.02]]);
      }
    }
  }
  /* opened: the arms that hold each leaf (pp516: two a leaf, at its ends) */
  function leafArms(B, th) {
    var s, E, x, a, b;
    for (s = -1; s <= 1; s += 2) for (E = 0; E < 2; E++) {
      x = E ? XC - 0.35 : X0 + 0.35;
      a = [x, s * (HW - 0.10), 1.45];
      b = leafPt(s, -0.80, ZR - ZW - 0.05, x, th);
      bar(B.dark, a, b, 0.07);
    }
  }

  /* ---- the 9M79 round on its erector boom, local x from the tail along the body, axis at z = 0 (militaryrussia: 6.40 m,
     0.65 m across, wings and lattice rudders 1.44 m in span; the round's shape off chem01 and dyw8). Four low wings ahead of
     four lattice rudders at the tail, set at 45 degrees ("X") so they clear the shut roof ---- */
  /* a slab in a fin's plane: x along the round, r out from the axis, h across the plane (the plane at angle a: ca, sa) */
  function finSeg(bin, ca, sa, xa, xb, ra, rb, h0, h1) {
    var P = [[xa, ra], [xb, ra], [xb, rb], [xa, rb]], V = [], m, q, h;
    for (m = 0; m < 8; m++) { q = P[m % 4]; h = m < 4 ? h0 : h1; V.push([q[0], q[1] * ca - h * sa, q[1] * sa + h * ca]); }
    hexa(bin, V);
  }
  function addRound(B) {
    var i, k, a, ca, sa, V, q, hh, pts, xs = [0.90, 2.60, 4.20];
    revolve(B.msl, [[0.00, 0.27], [0.05, 0.315], [0.15, 0.325], [4.70, 0.325], [5.05, 0.31], [5.45, 0.26], [5.85, 0.18],
                    [6.15, 0.10], [6.34, 0.035], [6.40, 0.0]], 0, 0, 28);
    cyl(B.dark, [-0.20, 0, 0], [0.01, 0, 0], 0.17, 0.24, 14);                         /* the nozzle */
    revolve(B.dark, [[4.06, 0.330], [4.10, 0.330]], 0, 0, 24);                          /* warhead joint */
    revolve(B.dark, [[2.30, 0.330], [2.33, 0.330]], 0, 0, 24);
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a);
      pts = [[0.42, 0.31], [1.55, 0.31], [1.30, 0.66], [0.62, 0.66]]; V = [];        /* the wing */
      for (k = 0; k < 8; k++) { q = pts[k % 4]; hh = k < 4 ? -0.018 : 0.018; V.push([q[0], q[1] * ca - hh * sa, q[1] * sa + hh * ca]); }
      hexa(B.msl, V);
      /* the lattice rudder: a frame 0.39 m out from the body and 0.26 long on the wing's plane, two webs each way inside */
      finSeg(B.dark, ca, sa, 0.02, 0.28, 0.33, 0.36, -0.17, 0.17);
      finSeg(B.dark, ca, sa, 0.02, 0.28, 0.67, 0.70, -0.17, 0.17);
      finSeg(B.dark, ca, sa, 0.02, 0.28, 0.33, 0.70, -0.182, -0.158);
      finSeg(B.dark, ca, sa, 0.02, 0.28, 0.33, 0.70, 0.158, 0.182);
      finSeg(B.dark, ca, sa, 0.04, 0.26, 0.45, 0.465, -0.17, 0.17);
      finSeg(B.dark, ca, sa, 0.04, 0.26, 0.57, 0.585, -0.17, 0.17);
      finSeg(B.dark, ca, sa, 0.04, 0.26, 0.33, 0.70, -0.066, -0.050);
      finSeg(B.dark, ca, sa, 0.04, 0.26, 0.33, 0.70, 0.050, 0.066);
    }
    /* the erector boom under the round (pp516: a green channel the length of the round), saddles, the pivot hub */
    box(B.msl, -0.10, 4.70, -0.17, 0.17, -0.55, -0.40);
    box(B.dark, -0.10, 4.70, -0.19, 0.19, -0.42, -0.40);
    for (i = 0; i < 3; i++) box(B.msl, xs[i] - 0.10, xs[i] + 0.10, -0.26, 0.26, -0.42, -0.30);
    cylY(B.dark, 0.0, -0.40, 0.40, -0.48, 0.09, 10);
    box(B.dark, -0.15, 0.20, -0.32, 0.32, -0.56, -0.40);
  }

  function build(THREE, M, C, key, V) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), TR = bins(T), DP = bins(T), i, s, wg, wm, geo, E, TB, RB, trg, dpg;
    addHull(HB, V);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre, false); RB = new Bin(T.tyre, false);
    tyre(TB, RB);
    /* one mesh a wheel: rubber and the dark wheel (pp513, pp514) told apart by vertex colour, linear as ru_iskander.js has it */
    var cr = lin(0x28292b), cw = lin(0x33372c), col = [];
    for (i = 0; i < TB.P.length / 3; i++) col.push(cr[0], cr[1], cr[2]);
    for (i = 0; i < RB.P.length / 3; i++) col.push(cw[0], cw[1], cw[2]);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P.concat(RB.P)), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N.concat(RB.N)), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(col), 3));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < AX.length; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(AX[i], s * TY, RT);
        wm = new THREE.Mesh(geo, T.tyre);
        if (s < 0) wm.rotation.y = Math.PI / 28;
        wg.add(wm);
        g.add(wg);
      }
    }
    leaves(TR, 0);
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { paint: TR.paint, dark: TR.dark });
    g.add(trg);
    leaves(DP, LEAF_OPEN);
    leafArms(DP, LEAF_OPEN);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { paint: DP.paint, dark: DP.dark });
    g.add(dpg);
    addRound(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    flush(THREE, E, { dark: EB.dark, msl: EB.msl });
    E.userData.el = EL;
    E.userData.cells = [[0.50, 0, 0, -0.25]];
    g.add(E);
    g.name = key;
    return g;
  }

  return { build: build, V80: { cover: 90 * Math.PI / 180 }, V90: { cover: 8 * Math.PI / 180 } };
})();

/* len is the measured X extent over both poses: the bow's top edge to the rear lamps (the published 9.49 m hull) */
UNIT_MODELS["pact_e80_tel"] = {
  len: 9.56,
  build: function (THREE, M, C) { return HeroTochka.build(THREE, M, C, "pact_e80_tel", HeroTochka.V80); }
};
/* Tochka-U: the 9P129-1M, the same vehicle (see the header) */
UNIT_MODELS["pact_e90_tel"] = {
  len: 9.56,
  build: function (THREE, M, C) { return HeroTochka.build(THREE, M, C, "pact_e90_tel", HeroTochka.V90); }
};
