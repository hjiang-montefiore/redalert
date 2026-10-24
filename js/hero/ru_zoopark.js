/* ============ ru_zoopark.js - HERO model: 1L219 "Zoopark-1" counter-battery radar on the MT-LBu chassis ============
   Two rows, both named "Zoopark-1" (rules.js radarv_p, eras.js pact_e00_radarv), one vehicle drawn in two paints:
     pact_e00_radarv  "1L219 Zoopark-1"         from e90 to e00, service 1993   -> the 2000s 1L219M, MAKS 2005 paint
     radarv_p         "1L219 Zoopark-1 Radar"   present day                      -> the 2010s service vehicle's paint
   Neither row is deploy:true, so the antenna is drawn RAISED, its working pose; the folded travel pose is not drawn.

   FACTS (ru.wikipedia "Zoopark (radiolokatsionny kompleks)" and "MT-LBu", fetched 2026-10-24):
     - The Zoopark-1 is GRAU 1L219M; its radar is the 1L259, carried with all its equipment on the MT-LBu
       tracked chassis (the complex also has a 1I30 maintenance van on a Ural-43203 and a trailer generator: not drawn).
     - "Zoopark-1M" is a DIFFERENT, later radar, index 1L260 (shown at MAKS-2013).  CORRECTION: the old header called
       the 1L219M "Zoopark-1M"; it is the Zoopark-1.  No row names the 1L260, so it is not drawn.
     - Zoopark-2 (1L220U) is a different system from NPK Iskra: not drawn.
     - MT-LBu = MT-LB hull lengthened 810 mm with a 7th road wheel and raised 200 mm.  With the MT-LB's published
       6.454 x 2.85 m this gives the 7.26 m x 2.85 m hull drawn here.  Roof 2.12 m: the published MT-LB height + 0.2 m
       is 2.07, the long-lens side photograph C scaled on the 7.26 m hull gives 2.20.
       KEPT from the old header: seven road wheels, sprocket at the nose, small raised rear idler, the antenna at the
       module REAR facing forward over the cab, plain green.  CORRECTED: roof 1.85 -> 2.12 m; the chine (the side runs
       down to 1.38 m and bevels in to a sponson floor at 1.14 m, C); wheel pitch 0.66 -> 0.71 m and wheel 0.64 m
       (photograph C: seven wheels, nearly touching, over 6 pitches); the module moved forward and shortened (abs x
       -1.25 .. +1.50, C, D); the headlamp pair is on the RIGHT of the glacis and the horn on the module's LEFT front
       (A is a front-RIGHT view, B a rear-RIGHT view; the old header read them as left views); the camera mast of the
       Tula museum vehicle dropped (see below); grilles on BOTH roof edges confirmed (D left, A right).

   REFERENCES (Wikimedia Commons, width 960):
     A "1L219M MAKS2005.jpg"            front-RIGHT three-quarter, 2005: glacis, lamps, vision blocks, right-side vents,
                                         dome, horn, the silver ram along the module's right top, the array face.
     B "1L219M back view MAKS2005.jpg"  rear-RIGHT three-quarter, 2005: ribbed array back, the two top corner units,
                                         the folding arms, the louvred box on the right rear deck, the horn at the front.
     C "ArtilleryExercise2014-06.jpg"   LEFT side in service, 2014, long lens (the truest proportions): horn at the module
                                         front, the diagonal strut and the cranked lower arms, the panel at ~30 deg lean.
     D "Zoopark Tula 08.10.2017 (37668729276).jpg" and E "1L219 Zoopark-1 radar Tula 2016.JPG"  LEFT side, museum:
                                         hull profile, chine, left vent hood, side hatch, the seven wheels.
     F "Zoopark 1L219 turret Tula 2016.JPG", G "1L219M REA 2009.jpg": module and dome detail.

   RECOGNITION LIST (each one drawn):
     1  MT-LBu boat hull: long flat roof, a 46-deg glacis to a sharp nose, a lower nose plate under it, the upper sides
        overhanging the tracks with a bevelled chine (A, D).                                  -> hull loft, STATIONS
     2  seven dished road wheels, no return rollers, front sprocket, small raised rear idler (D, E).  -> running gear
     3  the rotating equipment module on the rear 60 % of the roof, chamfered front corners (C, D).    -> "turret"
     4  the big flat phased-array panel standing at the module REAR, leaning back, face forward over the cab, chamfered
        corners, a framed face with rivet strips (A, C, D).                                    -> panel
     5  the back of the panel: close horizontal ribs and two vertical stiffeners (B, C).
     6  the two drum units on the panel's top corners (B, C).
     7  the cranked lower arms each side and the diagonal strut from the module top to the panel back (B, C).
     8  the forward-looking dome on the module front (A, D, F, G).
     9  the tall horn box with the slanted open top at the module's front-left (A, B, C, G).
     10 louvred vent hoods on the roof edge each side over the engine (A right, D left).
     11 the glacis: two lamps right of centre, one lamp high on the left, vision blocks on the roof edge (A).
     12 the louvred equipment box on the right rear deck (B).
   NOT drawn: radio whips (B), flags, data plates and stickers, museum signs (D), the bort number "104" (C), crew.
   The museum vehicle in D/E/F carries a camera mast with a cross head where A, B, C (2005, 2014) carry the horn; it
   could not be dated, so both rows draw the horn the two in-service photographs show.

   STATIONS (x from the hull centre, +X nose; z up from the ground; half widths y), from photograph C (long lens, left
   side, 2014) scaled on the 7.26 m hull, checked against D, E and A:
        x      belly z  belly hw   sponson z  side hw   roof z      note
      +3.63    1.20     0.95       1.22       0.98      1.32        nose edge
      +3.30    0.97     1.00       1.14       1.20      1.65        45-deg glacis, lower nose plate, plan chamfer
      +2.83    0.62     1.00       1.14       1.40      2.12        glacis meets the roof
      +2.50    0.45     1.00       1.14       1.425     2.12        full section: belly 0.45 (MT-LB clearance 0.40)
      -3.30    0.45     1.00       1.14       1.425     2.12
      -3.52    0.60     1.00       1.14       1.425     2.12        rear bevel
      -3.63    0.70     1.00       1.14       1.41      1.97        rear plate, top edge chamfered
     the chine: the side runs vertical from the roof down to 1.38 m, then bevels in 0.14 m to the sponson floor (C).
     Running gear (C): road wheels x -2.13 .. +2.11 every 0.707, centre z 0.36, r 0.32; sprocket x 2.80 z 0.67;
     idler x -2.80 z 0.50; track centre y 1.23, 0.35 wide (MT-LB 350 mm track).  Engine-air hoods on both roof
     edges x -0.58 .. +0.95 (C, D); the left side door x -1.75 .. -1.10 (C, D).
     Module (turret local, ring centre abs x +0.10 on the roof): body x -1.35..+1.40, half width 1.0, 0.64 m tall;
     panel 2.0 x 2.65 m, lower edge 0.93 m above the roof, leaning back 25 deg (D ~23 deg square-on); top 5.45 m,
     5.57 m over the corner drums (unpublished: from C, D proportions; the old model had 5.33 m).

   PAINT, sampled and taken to about 0.75 of level: A (2005, sun) #82845a -> e00 #5d6040, the bright Russian
   protective green; C (2014, overcast) #272821 / #292c25 and D (2017) #404333 / #383b2d -> e20 #464b3b,
   the darker, greener olive.
   Both plain single-coat green, no pattern; no numbers or insignia.

   Nodes: "turret" (ring centre, at rest facing +X, carries the panel) and seven "roadwheel" groups (the wheel discs;
   the tyres stay in the hull).  Team colour: two small plain C.team strips on the forward roof.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZoopark = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var VARIANTS = {
    e00: { paint: { base: "#5d6040", tone: ["#666a48", "#53573a"], seed: 2005 }, face: 0x646a49 },
    e20: { paint: { base: "#464b3b", tone: ["#4e5342", "#3f4435"], seed: 2014 }, face: 0x4d533f }
  };
  var NW = 7, XW = [-2.13, -1.43, -0.72, -0.01, 0.69, 1.40, 2.11];
  var FRT = { x: 2.80, z: 0.67, r: 0.29 };     /* front sprocket */
  var REA = { x: -2.80, z: 0.50, r: 0.26 };    /* rear idler */
  var ZW = 0.36, RWR = 0.32, TYC = 1.23, THW = 0.175;
  var TX = 0.10, TZ = 2.12;                    /* the ring centre on the roof */
  var ROOF = 2.12;

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
  /* one plain coat per period: soft tonal patches, plate seams, rain streaks and
     chipped edges; one tile is 2.94 m of surface (UVs are 0.34 per metre) */
  function paintTex(THREE, P) {
    var key = "zoo" + P.base + P.seed;
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
      /* welded plate seams about every 0.75 m */
      q.strokeStyle = "rgba(18,20,14,0.32)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 20.5, 0); q.lineTo(i * 64 + 20.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 44.5); q.lineTo(256, i * 64 + 44.5); q.stroke();
      }
      /* bolt rows along two of the seams */
      q.fillStyle = "rgba(12,13,9,0.35)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 2, 40, 2, 2); q.fillRect(84, i * 8 + 3, 2, 2); }
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
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.face = new THREE.MeshStandardMaterial({ color: V.face, roughness: 0.62, metalness: 0.15 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             face: new Bin(T.face, false), team: new Bin(T.team, false) };
  }

  /* -------------------------------------------------------------- running gear */
  /* the outer disc of a road wheel about the origin, both sides: dished plate, hub, eight bolts (D, E) */
  function wheel(bin) {
    var s, k, a, o;
    for (s = -1; s <= 1; s += 2) {
      o = s * (TYC + 0.15);
      cyl(bin, [0, o, 0], [0, o + s * 0.025, 0], RWR - 0.025, RWR - 0.05, 20, false, false);
      cyl(bin, [0, o + s * 0.025, 0], [0, o + s * 0.06, 0], 0.15, 0.12, 12, true, false);
      cyl(bin, [0, o + s * 0.06, 0], [0, o + s * 0.10, 0], 0.075, 0.06, 8, true, false);
      for (k = 0; k < 8; k++) {
        a = k / 8 * TAU;
        box(bin, 0.205 * Math.cos(a) - 0.018, 0.205 * Math.cos(a) + 0.018, o + s * 0.02 - 0.01, o + s * 0.042,
            0.205 * Math.sin(a) - 0.018, 0.205 * Math.sin(a) + 0.018);
      }
    }
  }
  function running(B) {
    var s, k, bg = beltGeometry();
    belt(B.dark, bg.path, TYC - THW, TYC + THW);
    belt(B.dark, bg.path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      /* rubber tyres of the seven stations (the discs are the roadwheel groups) */
      for (k = 0; k < NW; k++) cyl(B.dark, [XW[k], s * (TYC - 0.15), ZW], [XW[k], s * (TYC + 0.15), ZW], RWR, RWR, 18);
      for (k = 0; k < NW; k++) cyl(B.dark, [XW[k], s * (TYC - 0.15), ZW], [XW[k], s * 1.01, ZW], 0.09, 0.09, 8, true, true);
      /* sprocket: two toothed rings and a hub; idler: a spoked disc on a crank */
      gear(B.dark, FRT.x, s * TYC - 0.14, s * TYC - 0.06, FRT.z, FRT.r - 0.035, FRT.r + 0.02, 13);
      gear(B.dark, FRT.x, s * TYC + 0.06, s * TYC + 0.14, FRT.z, FRT.r - 0.035, FRT.r + 0.02, 13);
      cyl(B.paint, [FRT.x, s * (TYC - 0.06), FRT.z], [FRT.x, s * (TYC + 0.06), FRT.z], 0.20, 0.20, 14, true, true);
      cyl(B.dark, [FRT.x, s * (TYC + 0.14), FRT.z], [FRT.x, s * (TYC + 0.21), FRT.z], 0.12, 0.10, 10);
      cyl(B.paint, [REA.x, s * (TYC - 0.13), REA.z], [REA.x, s * (TYC + 0.13), REA.z], REA.r, REA.r, 18);
      cyl(B.dark, [REA.x, s * (TYC + 0.13), REA.z], [REA.x, s * (TYC + 0.18), REA.z], 0.09, 0.08, 8);
      box(B.dark, REA.x - 0.04, REA.x + 0.34, s * 1.02 - 0.03, s * 1.02 + 0.03, REA.z - 0.05, REA.z + 0.05);
    }
  }

  /* -------------------------------------------------------------- hull */
  /* one station ring: belly, sponson floor, bevelled chine, vertical side, roof edge (see STATIONS) */
  function ring(x, zb, hb, zs, hw, zt) {
    var zc = Math.min(zs + 0.24, zt - 0.05), hc = Math.max(hb, hw - 0.14), r = [], i;
    var half = [[hb, zb], [hb, zs], [hc, zs], [hw, zc], [hw, zt - 0.05], [hw - 0.05, zt]];
    for (i = 0; i < half.length; i++) r.push([x, -half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, half[i][0], half[i][1]]);
    return r;
  }
  var STATIONS = [[3.63, 1.20, 0.95, 1.22, 0.98, 1.32], [3.30, 0.97, 1.00, 1.14, 1.20, 1.65],
                  [2.83, 0.62, 1.00, 1.14, 1.40, 2.12], [2.50, 0.45, 1.00, 1.14, 1.425, 2.12],
                  [-3.30, 0.45, 1.00, 1.14, 1.425, 2.12], [-3.52, 0.60, 1.00, 1.14, 1.425, 2.12],
                  [-3.63, 0.70, 1.00, 1.14, 1.41, 1.97]];
  /* the glacis plane: from the roof edge (2.83, 2.12) down to the nose edge (3.63, 1.32) */
  var GT = unit([0.80, 0, -0.80]), GN = [-GT[2], 0, GT[0]];
  function gp(d, y) { return [2.83 + GT[0] * d, y, ROOF + GT[2] * d]; }

  function vent(B, s, x0, x1) {
    /* a louvred hood on the roof edge (D left, A right): a dark bed and slanted slats */
    var yo = s * 1.425, k, n = 11, dx = (x1 - x0) / n;
    box(B.paint, x0 - 0.04, x1 + 0.04, yo - (s > 0 ? 0.01 : 0.05), yo + (s > 0 ? 0.05 : 0.01), 1.66, 1.70);
    box(B.dark, x0, x1, yo - (s > 0 ? 0.01 : 0.035), yo + (s > 0 ? 0.035 : 0.01), 1.70, ROOF - 0.04);
    box(B.dark, x0, x1, s * 1.10 - 0.18, s * 1.10 + 0.18, ROOF - 0.01, ROOF + 0.02);
    for (k = 0; k < n; k++) {
      box(B.paint, x0 + k * dx + 0.01, x0 + k * dx + dx * 0.55, yo - (s > 0 ? 0.01 : 0.05), yo + (s > 0 ? 0.05 : 0.01), 1.72, ROOF - 0.05);
      box(B.paint, x0 + k * dx + 0.01, x0 + k * dx + dx * 0.55, s * 1.10 - 0.17, s * 1.10 + 0.17, ROOF + 0.02, ROOF + 0.05);
    }
  }

  function hull(B) {
    var s, k, i, p, y, x, st = [];
    for (i = 0; i < STATIONS.length; i++) st.push(ring.apply(null, STATIONS[i]));
    loft(B.paint, st, false);
    running(B);
    for (s = -1; s <= 1; s += 2) {
      vent(B, s, -0.58, 0.95);
      /* nose tow eyes and the lower-nose plate seam */
      box(B.dark, 3.50, 3.68, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.05, 1.17);
      box(B.dark, -3.70, -3.60, s * 0.80 - 0.07, s * 0.80 + 0.07, 0.72, 0.86);
      /* stern lamps and the rear door hinges */
      box(B.dark, -3.66, -3.62, s * 1.22 - 0.06, s * 1.22 + 0.06, 1.70, 1.82);
      for (k = 0; k < 2; k++) box(B.dark, -3.67, -3.62, s * 0.92 - 0.05, s * 0.92 + 0.05, 1.05 + k * 0.55, 1.18 + k * 0.55);
      /* front fender lip over the sprocket */
      box(B.paint, 2.45, 3.25, s * 1.425 - (s > 0 ? 0.30 : 0), s * 1.425 + (s < 0 ? 0.30 : 0), 1.10, 1.14);
      /* flank: grab handles, the cable clamps and a stowage locker */
      for (k = 0; k < 4; k++) box(B.dark, 2.30 - k * 1.25, 2.45 - k * 1.25, s * 1.43 - 0.02, s * 1.43 + 0.02, 1.94, 1.98);
      box(B.paint, 1.35, 2.05, s * 1.425 - (s > 0 ? 0 : 0.06), s * 1.425 + (s > 0 ? 0.06 : 0), 1.45, 1.70);
      box(B.dark, 1.35, 2.05, s * 1.425 - (s > 0 ? 0 : 0.065), s * 1.425 + (s > 0 ? 0.065 : 0), 1.695, 1.71);
      /* the forward roof: two round hatches with dark seals (E) */
      cylZ(B.paint, 2.30, s * 0.55, ROOF - 0.01, ROOF + 0.07, 0.30, 18);
      cylZ(B.dark, 2.30, s * 0.55, ROOF + 0.07, ROOF + 0.085, 0.21, 12);
      box(B.dark, 2.08, 2.20, s * 0.55 - 0.05, s * 0.55 + 0.05, ROOF + 0.07, ROOF + 0.11);
      /* team strips on the forward roof, facing up (modest) */
      box(B.team, 1.65, 2.30, s * 1.17 - 0.11, s * 1.17 + 0.11, ROOF - 0.01, ROOF + 0.02);
    }
    /* the side door on the LEFT flank, rear (D): a round-cornered frame and its handle */
    for (k = 0; k < 2; k++) box(B.dark, -1.75 + k * 0.65, -1.70 + k * 0.65, 1.415, 1.445, 1.42, 1.86);
    for (k = 0; k < 2; k++) box(B.dark, -1.66, -1.14, 1.415, 1.445, 1.36 + k * 0.54, 1.41 + k * 0.54);
    box(B.dark, -1.55, -1.35, 1.44, 1.47, 1.60, 1.64);
    /* glacis lamps: a pair low right of centre and one high on the left (A), with a guard bar */
    var L = [[0.52, -0.22, 0.11], [0.52, -0.55, 0.11], [0.20, 0.78, 0.10]];
    for (i = 0; i < 3; i++) {
      p = gp(L[i][0], L[i][1]);
      cyl(B.dark, p, [p[0] + GN[0] * 0.13, p[1], p[2] + GN[2] * 0.13], L[i][2], L[i][2] * 0.95, 14);
      p = [p[0] + GN[0] * 0.13, p[1], p[2] + GN[2] * 0.13];
      cyl(B.glass, p, [p[0] + GN[0] * 0.015, p[1], p[2] + GN[2] * 0.015], L[i][2] * 0.82, L[i][2] * 0.8, 14);
    }
    p = gp(0.36, -0.08); y = gp(0.36, -0.72);
    bar(B.dark, [p[0] + GN[0] * 0.20, p[1], p[2] + GN[2] * 0.20], [y[0] + GN[0] * 0.20, y[1], y[2] + GN[2] * 0.20], 0.03);
    bar(B.dark, p, [p[0] + GN[0] * 0.20, p[1], p[2] + GN[2] * 0.20], 0.03);
    bar(B.dark, y, [y[0] + GN[0] * 0.20, y[1], y[2] + GN[2] * 0.20], 0.03);
    /* vision blocks along the top of the glacis (A) */
    for (i = 0; i < 4; i++) {
      y = [0.95, 0.42, -0.42, -0.95][i];
      planeBox(B.dark, gp(0.02, y), [0, 1, 0], GT, GN, -0.12, 0.12, 0.0, 0.14, 0.0, 0.06);
      planeBox(B.glass, gp(0.02, y), [0, 1, 0], GT, GN, -0.09, 0.09, 0.03, 0.11, 0.06, 0.075);
    }
    /* glacis plate seam and the folded trim vane edge */
    planeBox(B.dark, gp(0.66, 0), [0, 1, 0], GT, GN, -1.0, 1.0, 0.0, 0.03, 0.0, 0.015);
    /* rear: twin doors (outlines), the right rear louvred equipment box (B) */
    box(B.dark, -3.645, -3.62, -0.012, 0.012, 0.78, 1.88);
    box(B.dark, -3.645, -3.62, -0.95, 0.95, 1.86, 1.89);
    box(B.paint, -3.45, -2.70, -1.36, -0.58, ROOF - 0.01, ROOF + 0.55);
    box(B.paint, -3.48, -2.67, -1.39, -0.55, ROOF + 0.55, ROOF + 0.59);
    box(B.dark, -3.46, -3.44, -1.30, -0.64, ROOF + 0.08, ROOF + 0.48);
    box(B.dark, -3.36, -2.79, -1.38, -1.36, ROOF + 0.08, ROOF + 0.48);
    for (k = 0; k < 8; k++) {
      x = -3.33 + k * 0.07;
      box(B.paint, x, x + 0.035, -1.395, -1.36, ROOF + 0.09, ROOF + 0.47);
      y = -1.27 + k * 0.08;
      box(B.paint, -3.475, -3.44, y, y + 0.035, ROOF + 0.09, ROOF + 0.47);
    }
    /* left rear deck: a hatch and a cable reel; centre deck lids */
    box(B.paint, -3.30, -2.70, 0.20, 0.95, ROOF - 0.01, ROOF + 0.04);
    box(B.dark, -3.25, -2.75, 0.25, 0.90, ROOF + 0.04, ROOF + 0.05);
    cylY(B.dark, -2.95, 1.05, 1.30, ROOF + 0.14, 0.13, 12);
  }

  /* -------------------------------------------------------------- the module and the raised array */
  function pbx(bin, P0, U, W, N, a0, a1, b0, b1, h0, h1) { planeBox(bin, P0, W, U, N, a0, a1, b0, b1, h0, h1); }
  var BETA = 25 * Math.PI / 180;     /* the panel leans back 25 deg from upright (D ~23; C ~30 seen at an angle) */
  function at(P0, U, N, u, h, y) { return [P0[0] + U[0] * u + N[0] * h, y, P0[2] + U[2] * u + N[2] * h]; }

  function module(B, V) {
    var s, k, j, x, P0, U, W, N, pts, inner, A, K, Q, M;
    /* turntable and the body, the front corners chamfered (C, D): abs x -1.25 .. +1.50, 0.64 m tall */
    cylZ(B.dark, 0, 0, 0.0, 0.08, 0.95, 28);
    prism(B.paint, [[-1.35, -1.0], [1.15, -1.0], [1.40, -0.78], [1.40, 0.78], [1.15, 1.0], [-1.35, 1.0]], 0.08, 0.72);
    box(B.paint, -1.20, 0.55, -0.88, 0.88, 0.72, 0.76);
    box(B.paint, 0.65, 1.25, -0.90, 0.20, 0.72, 0.77);
    box(B.dark, -1.35, 1.15, -1.005, 1.005, 0.08, 0.13);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.0, d = function (t) { return s > 0 ? [yo - 0.002, yo + t] : [yo - t, yo + 0.002]; }, e;
      /* two vertical-slat louvres on the rear part (E, F) */
      for (k = 0; k < 2; k++) {
        x = -1.22 + k * 0.48;
        e = d(0.015); box(B.dark, x, x + 0.40, e[0], e[1], 0.24, 0.62);
        e = d(0.035);
        for (j = 0; j < 6; j++) box(B.paint, x + 0.02 + j * 0.065, x + 0.05 + j * 0.065, e[0], e[1], 0.26, 0.60);
      }
      /* the front block's horizontal louvre and the seam to the main box (E) */
      e = d(0.015); box(B.dark, 0.72, 1.08, e[0], e[1], 0.34, 0.64);
      e = d(0.035);
      for (k = 0; k < 5; k++) box(B.paint, 0.73, 1.07, e[0], e[1], 0.36 + k * 0.056, 0.39 + k * 0.056);
      e = d(0.012); box(B.dark, 0.55, 0.58, e[0], e[1], 0.13, 0.72);
      /* the door in the middle of each side and its handle */
      e = d(0.012);
      box(B.dark, -0.30, 0.45, e[0], e[1], 0.18, 0.21); box(B.dark, -0.30, 0.45, e[0], e[1], 0.65, 0.68);
      box(B.dark, -0.30, -0.27, e[0], e[1], 0.18, 0.68); box(B.dark, 0.42, 0.45, e[0], e[1], 0.18, 0.68);
      e = d(0.05); box(B.dark, 0.28, 0.36, e[0], e[1], 0.40, 0.46);
      /* the brackets at the rear that carry the lower arms */
      box(B.paint, -1.55, -1.20, s * 0.88 - 0.10, s * 0.88 + 0.10, 0.15, 0.55);
    }
    /* the forward-looking dome on the front face, right of centre (A, D, F) */
    revolve(B.paint, [[1.39, 0.0], [1.40, 0.22], [1.46, 0.30], [1.56, 0.34], [1.69, 0.32], [1.79, 0.25], [1.86, 0.14], [1.88, 0.0]], -0.18, 0.40, 18);
    cylX(B.dark, 1.35, 1.41, -0.18, 0.40, 0.36, 18);
    /* the horn at the front-left: a tall box, open on the slanted top, facing forward and up (A, B, C, G) */
    box(B.paint, 0.75, 1.30, 0.28, 0.92, 0.72, 0.82);
    hexa(B.paint, [[0.80, 0.34, 0.82], [1.26, 0.34, 0.82], [1.26, 0.86, 0.82], [0.80, 0.86, 0.82],
                   [0.76, 0.31, 1.48], [1.31, 0.31, 1.15], [1.31, 0.89, 1.15], [0.76, 0.89, 1.48]]);
    hexa(B.dark, [[0.81, 0.36, 1.462], [1.27, 0.36, 1.180], [1.27, 0.84, 1.180], [0.81, 0.84, 1.462],
                  [0.81, 0.36, 1.472], [1.27, 0.36, 1.190], [1.27, 0.84, 1.190], [0.81, 0.84, 1.472]]);
    box(B.dark, 0.73, 0.76, 0.40, 0.80, 0.90, 1.40);
    /* the raised array: P0 the centre of its lower edge, U up the leaning plane, W across, N the face normal */
    P0 = [-1.15, 0, 0.93];
    U = [-Math.sin(BETA), 0, Math.cos(BETA)]; W = [0, 1, 0]; N = [Math.cos(BETA), 0, Math.sin(BETA)];
    pts = [[-0.80, 0.00], [0.80, 0.00], [1.00, 0.25], [1.00, 2.30], [0.78, 2.65], [-0.78, 2.65], [-1.00, 2.30], [-1.00, 0.25]];
    inner = [[-0.73, 0.09], [0.73, 0.09], [0.90, 0.30], [0.90, 2.25], [0.72, 2.54], [-0.72, 2.54], [-0.90, 2.25], [-0.90, 0.30]];
    planePrism(B.paint, P0, U, W, N, pts, -0.22, 0.0);
    planePrism(B.face, P0, U, W, N, inner, 0.0, 0.03);
    /* face: three seams and the rivet strips down both edges (A) */
    for (k = 1; k < 4; k++) pbx(B.dark, P0, U, W, N, -0.90, 0.90, 0.09 + k * 0.62 - 0.008, 0.09 + k * 0.62 + 0.008, 0.03, 0.04);
    for (k = 0; k < 15; k++) {
      pbx(B.dark, P0, U, W, N, 0.93, 0.975, 0.36 + k * 0.128, 0.40 + k * 0.128, -0.01, 0.03);
      pbx(B.dark, P0, U, W, N, -0.975, -0.93, 0.36 + k * 0.128, 0.40 + k * 0.128, -0.01, 0.03);
    }
    /* back: close horizontal ribs and two vertical stiffeners (B, C) */
    for (k = 0; k < 18; k++) pbx(B.paint, P0, U, W, N, -0.94, 0.94, 0.12 + k * 0.142, 0.155 + k * 0.142, -0.28, -0.22);
    for (s = -1; s <= 1; s += 2) pbx(B.paint, P0, U, W, N, s * 0.45 - 0.05, s * 0.45 + 0.05, 0.05, 2.55, -0.32, -0.22);
    for (s = -1; s <= 1; s += 2) {
      /* the drum units on the two top corners (B, C) */
      M = at(P0, U, N, 2.52, -0.10, s * 0.62);
      pbx(B.paint, P0, U, W, N, s > 0 ? 0.50 : -0.95, s > 0 ? 0.95 : -0.50, 2.40, 2.68, -0.30, -0.02);
      cyl(B.dark, [M[0] - N[0] * 0.10, s * 0.56, M[2] - N[2] * 0.10 + 0.20], [M[0] - N[0] * 0.10, s * 1.02, M[2] - N[2] * 0.10 + 0.20], 0.12, 0.11, 12);
      cyl(B.dark, [M[0] - N[0] * 0.10, s * 1.02, M[2] - N[2] * 0.10 + 0.20], [M[0] - N[0] * 0.10, s * 1.04, M[2] - N[2] * 0.10 + 0.20], 0.09, 0.09, 12);
      /* hinge lugs */
      pbx(B.dark, P0, U, W, N, s * 0.78 - 0.10, s * 0.78 + 0.10, -0.10, 0.16, -0.30, 0.0);
      /* the cranked lower arm: rear bracket -> knee behind the panel -> panel back (C, B) */
      A = [-1.40, s * 0.88, 0.35]; K = [-2.65, s * 0.88, 0.98]; Q = at(P0, U, N, 0.55, -0.27, s * 0.88);
      bar(B.paint, A, K, 0.15);
      bar(B.paint, K, Q, 0.13);
      cylY(B.dark, K[0], s * 0.80, s * 0.97, K[2], 0.09, 10);
      /* the diagonal strut, a ram with its bright rod, from the module top to the panel back (A, C) */
      A = [0.40, s * 0.74, 0.78]; Q = at(P0, U, N, 1.60, -0.26, s * 0.74);
      M = [A[0] + (Q[0] - A[0]) * 0.58, A[1], A[2] + (Q[2] - A[2]) * 0.58];
      cyl(B.paint, A, M, 0.07, 0.07, 10);
      cyl(B.dark, M, Q, 0.04, 0.04, 8);
      box(B.paint, 0.30, 0.50, s * 0.74 - 0.08, s * 0.74 + 0.08, 0.72, 0.84);
    }
    /* the travel-lock claw on the module top (A) */
    box(B.dark, 0.10, 0.22, -0.62, -0.50, 0.76, 0.98);
    box(B.dark, 0.10, 0.30, -0.62, -0.50, 0.94, 1.00);
  }

  function build(THREE, M, C, key, vk) {
    var V = VARIANTS[vk] || VARIANTS.e20, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), MB = bins(T), k, wg, WB, tur;
    hull(HB);
    var h = new THREE.Group(); h.name = "hull";
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
    module(MB, V);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(TX, 0, TZ);
    flush(THREE, tur, { paint: MB.paint, dark: MB.dark, face: MB.face });
    g.add(tur);
    g.name = key;
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e00_radarv"] = {
  len: 7.3,
  build: function (THREE, M, C) { return HeroZoopark.build(THREE, M, C, "pact_e00_radarv", "e00"); }
};
UNIT_MODELS["radarv_p"] = {
  len: 7.3,
  build: function (THREE, M, C) { return HeroZoopark.build(THREE, M, C, "radarv_p", "e20"); }
};
