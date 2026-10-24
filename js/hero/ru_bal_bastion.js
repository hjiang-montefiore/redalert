/* ============ ru_bal_bastion.js - HERO model: the two Russian coastal anti-ship launchers on the MZKT-7930 8x8 ============
   Two rows (js/eras.js, "COASTAL ANTI-SHIP MISSILES"), one chassis built once, each with its own launch pack, cab
   fittings and paint:
     pact_e00_coastssm  "3K60 Bal (SSC-6 Sennight), launcher on the MZKT-7930"   (2008): the 3S60 self-propelled launcher,
                        EIGHT Kh-35 containers, two tiers of four, in a pack at the rear that rises about a pivot at the
                        frame's end and fires forward over the cab.
     pact_e20_coastssm  "K-300P Bastion-P (SSC-5 Stooge), K340P launcher"       (2011): the K340P, TWO P-800 Oniks
                        containers side by side in a long closed body, stood upright at the rear to fire.

   References (Wikimedia Commons, fetched at width 960 for this model, cached in the scratchpad q_bal_ref/img):
     cme01  "CoastalMissileExercise2018-01.jpg"  (mil.ru, CC-BY 4.0) two 3S60 set up, packs raised, right side and rear
     cme03  "CoastalMissileExercise2018-03.jpg"  (mil.ru) a 3S60 on the march, front-right three-quarter
     cs01   "Combat shooting of missiles 01.jpg"  (mil.ru) a 3S60 firing: the Kh-35 leaves the raised pack's upper end and
            climbs forward over the cab
     maks28 "MAKS2015part6-28.jpg"  (Vitaly Kuzmin) a Bal-E launcher side on, pack raised: the station table below
     imds32 "International Maritime Defence Show 2011 (377-32).jpg"  (Vitaly Kuzmin) a maker's 3S60 maquette side on, pack
            stowed: the pack's length and overhang behind the frame
     rost1  "Rostov-on-Don 2014 ... K-300P Bastion coastal defense missile launcher" front view: the cab front
     rost2  "Rostov-on-Don 2014 ... K-300P Bastion missile launcher" close front-left: mirrors, lamps, tow cable
     mod18  "K-300P Bastion-P.jpg"  (Russian MoD 2018) a K340P on the march, front-left three-quarter
     pre    "Komplex Bastion pered puskom raket.jpg" (Russian title) a K340P set up, both containers upright at the rear

   Recognition list (each shows in the model as noted):
     1. The short MZKT-7930 cab wholly ahead of the front axle: vertical lower front, a slightly raked face with THREE
        near-equal windscreen panes, the louvred grille in the middle under them, the full-width bumper with lamp clusters at
        the outer ends and the tow cable looped across it (rost1, rost2, cme03, mod18).            -> addChassis, the cab
     2. Mirror frames standing off the front corners with TWO mirror heads each (rost1, rost2).     -> addChassis
     3. Eight big lugged tyres in the 7930's pattern: two pairs with a long gap between the second and third axles (maks28,
        imds32 - the same axle stations as js/hero/ru_iskander.js, the existing MZKT-7930 hero).    -> roadwheel groups
     4. Bal: the engine compartment over the front axle with a louvred side panel, a lower box with a hatch behind it
        (maks28, cme03).                                                                             -> addBalBody
     5. Bal: the tall plain equipment cabin mid-vehicle, a door at the rear of its right side with a ladder beside it (cme01,
        cme03), two whip antennas on its roof (cme01, maks28).                                      -> addBalBody
     6. Bal: the pack of EIGHT round containers, two tiers of four, with domed rear caps, three strap frames and ring ribs,
        lying level on the rear deck and overhanging the frame's end by about 2 m (cme03, imds32).  -> addBalPack
     7. Bal set up: the pack raised about its rear pivot, front ends up, rear caps down near the ground behind the vehicle
        (cme01, maks28, cs01).                                                                       -> podelev
     8. Bastion-P: the crew module behind the cab, its top rising above the cab roof, a door with a window on its left side
        (mod18, pre).                                                                                -> addBastionBody
     9. Bastion-P: the long closed body to the very rear: vertical sides, a chamfer to a flat roof, a louvre panel at its front,
        skirts with wheel arches (mod18, pre).                                                       -> addBastionBody
    10. Bastion-P set up: the two containers side by side standing upright at the rear, domed tops, a clamp collar and the
        lattice erector frame on their cab side, jacks down behind the last axle (pre).            -> podelev, deploypose

   Station table (metres; +X forward from the vehicle's middle, as js/hero/ru_iskander.js; maks28 at 67 px/m, imds32 at
   57.7 px/m, both scaled on the front-to-last axle span 7.49 m):
       6.12 bumper face         5.95 cab lower front     4.45 cab rear / module front    3.49 axle 1
       2.85 module rear (Bal: low box 1.85-2.85)          1.43 axle 2           1.60/-1.70 Bal cabin front/rear
      -2.03 axle 3             -4.00 axle 4              -4.75 Bal pack pivot (z 1.78)  -6.74 Bal pack rear caps (stowed)
       2.85/-6.50 Bastion-P body front/rear              -5.85 Bastion-P container hinge (z 1.75)
     Heights: cab roof 3.12 (rost1: panes 0.79 m tall, 0.28 m under the roof, on a 2.9 m wide cab, roof to bumper foot 1.98 m),
     panes on the raked face 1.97-2.90, bumper 0.95-1.46; Bal engine compartment 2.70 (cme03: well under the cab roof), cabin
     1.55-3.62 (cme01: about 0.5 m over the cab roof), stowed pack 1.85-3.35; Bastion-P body floor 1.32, side 2.30,
     roof 3.05, crew module 3.40; containers upright 1.75-10.45 (pre: 10.5 m read off against the 3.05 m body roof).
   Published and measured: the MZKT-7930 chassis 12.7 x 3.0 m (en.wikipedia MZKT-7930). Drawn (len, the measured X extent): Bal 12.93 m (tow
     cable to the stowed pack's rear caps, which overhang the frame as imds32 shows), Bastion-P 12.79 m (tow cable to the
     rear wall's frame), 2.9 m over the cab, 3.4 m over the mirror frames (rost1). No maker length for either launcher was found.
   Angles and counts: Bal, 8 containers in 2 x 4 (cme01, cme03, imds32; the row's rounds:8); the pack raised to 32 degrees,
     read off maks28 (31.5-33 deg on the upper tier) and cs01 (33 deg) - no published figure found. Bastion-P, 2 containers
     side by side (pre, mod18 none visible: they lie inside the body; the row's rounds:2); raised to 90 degrees (pre).
   Poses (render3d shows one by e.deployed; deploypose_check.js):
     travelpose: jacks stowed (both); the Bastion-P's bay roof and rear wall shut (mod18).
     deploypose: jacks lowered, a pair behind the last axle on a cross beam (pre shows the leg under the Bastion-P's upright
       containers; on the Bal it is NOT seen in any photograph, drawn on the shared chassis); the Bastion-P's roof leaves
       dropped inside the body walls and the bay's rear wall gone, so the containers can stand (how the real roof and rear
       end open is not shown clearly by any photograph found: pre shows the body's outline unchanged from the side, and
       a raised section at the very rear that is not drawn).
     podelev: the pack, raised by render3d poseLauncher to userData.el while it holds a ship in reach. Bal: about the pivot at
       the frame's rear end, 32 deg, eight cells; Bastion-P: about the hinge at the containers' foot, 90 deg, two cells.
   No turntable: neither launcher traverses (both lay the pack fore-and-aft and the missile turns after launch), so
     turret:false loses nothing. The Bal's elevating ram and the Bastion-P's erector rams are not drawn (they would have
     to stretch with the pack).
   NOT drawn (not confirmed, or markings): tactical numbers ("412" on cme03), the St George ribbon and star on the cabin
     (cme01, cs01), the TZM loaders, the cabin's inside, the cable runs, the raised rear section seen at the back of the
     Bastion-P's body in "pre" (one photograph, unclear what it is), the Monolit-B radar vehicle (a separate vehicle).
   Paint by period (Russian green, sampled and taken to about 0.85 of the lit level): Bal (2008-on) from maks28 lit side
     99,101,87 -> #55584a; Bastion-P (2011-on) from mod18 lit sides 99,106,100 (body) and 95,101,90 (cab), rost1 87,98,95 ->
     #51574b, the greyer green of the 2010s photographs. A weathered single coat (canvas texture), no camouflage.
   Nodes: eight "roadwheel" groups, "travelpose", "deploypose", "podelev"; NOTHING named "turret" (turret:false).
   Materials (5): paint (canvas texture), dark, glass, tyre, C.team (two small up-facing strips on the cab roof).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBalBastion = (function () {
  "use strict";

  var PAINT_BAL = { base: "#55584a", blots: ["#4a4d40", "#5c5f50", "#505345"], seed: 3060 };
  var PAINT_BAS = { base: "#51574b", blots: ["#474d42", "#585e51", "#4c5246"], seed: 3400 };
  var AXL = [3.49, 1.43, -2.03, -4.0], TY = 1.27, RT = 0.682, TS = 1.1;   /* the MZKT-7930: axle x, track half, tyre radius, scale (ru_iskander.js) */
  var X1 = 6.12, XF = 5.95, XC0 = 4.45, XM0 = 2.85, ZR = 3.12, ZW = 1.92, CW = 1.45;   /* bumper, cab front, cab rear, module rear; cab roof, face foot, half width */
  /* Bal */
  var CB0 = -1.70, CB1 = 1.60, ZC = 3.62, ZE = 2.70;   /* the equipment cabin; the engine compartment's top (cme03: 0.4 m under the cab roof) */
  var BPX = -4.75, BPZ = 1.78;                     /* the pack's pivot */
  var PK0 = -1.83, PKL = 4.56;                     /* the containers' rear end from the pivot, their length (imds32) */
  var EL_BAL = 32 * Math.PI / 180;                 /* maks28, cs01 */
  var FRAME_BAL = -5.20, JX_BAL = [-5.05];
  /* Bastion-P */
  var BX0 = -6.50, BW = 1.48, ZB = 1.32, ZS = 2.30, ZT = 3.05;   /* body rear, half width, floor, side top, roof */
  var HX2 = -5.85, HZ2 = 1.75, TL = 8.45, TY2 = 0.47;            /* the containers' hinge, body length, y */
  var EL_BAS = Math.PI / 2;                                       /* upright (pre) */
  var FRAME_BAS = -6.45, JX_BAS = [-5.75];
  var COVER_OPEN = -Math.PI / 2;

  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit (as js/hero/ru_iskander.js) */
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
  function fp(P0, U, W, N, u, w, h) {
    return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h, P0[2] + U[2] * u + W[2] * w + N[2] * h];
  }
  /* a ring in (y, z) from half-width/height pairs, one side given from the centre line out; mirrored */
  function sym(x, half) {
    var r = [], i;
    for (i = 0; i < half.length; i++) r.push([x, half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, -half[i][0], half[i][1]]);
    return r;
  }
  /* a lugged cross-country tyre about the Y axis (two lanes of lugs a half step apart), dished wheel face and hub cap */
  /* a 1.25 m lugged cross-country tyre about the Y axis (two lanes of lugs a half step apart), with a
     dished wheel face and a hub cap each side (r1: the wheels are dished with a raised hub) */
  function tyre(bin) {
    var N = 24, R = [[-0.21, 0.37, 0, 0], [-0.21, 0.54, 0, 0], [-0.15, 0.62, 1, 0], [-0.02, 0.62, 1, 0],
                     [0.02, 0.62, 1, 1], [0.15, 0.62, 1, 1], [0.21, 0.54, 0, 0], [0.21, 0.37, 0, 0]];
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
      cylY(bin, 0, k * 0.19, k * 0.235, 0, 0.37, 18);
      cylY(bin, 0, k * 0.235, k * 0.285, 0, 0.15, 10);
      for (i = 0; i < 4; i++) {
        a = i / 4 * TAU + 0.4;
        box(bin, 0.26 * Math.cos(a) - 0.025, 0.26 * Math.cos(a) + 0.025, k * 0.235, k * 0.255, 0.26 * Math.sin(a) - 0.025, 0.26 * Math.sin(a) + 0.025);
      }
    }
  }

  /* -------------------------------------------------------------- materials */
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function side(bin, s, x0, x1, z0, z1, y, t) {      /* a thin plate on a side wall at y = s*|y| */
    box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1);
  }

  /* ---------------------------------------------- the MZKT-7930 chassis and cab (both rows) */
  /* cab cross-section: floor 1.30, sides to 0.12 under the top, a chamfered roof edge */
  function cabRing(x, top) { return sym(x, [[1.05, 1.30], [CW, 1.30], [CW, top - 0.12], [CW - 0.12, top]]); }

  function addChassis(B, row) {
    var s, i, k, U, W, N, P0, L;
    /* frame rails, cross members, the fuel tanks between the second and third axles (cme03), mudguards */
    var xr = row === "bal" ? FRAME_BAL : FRAME_BAS;
    box(B.dark, xr, 5.70, -0.85, 0.85, 0.72, 1.30);
    for (i = 0; i < 5; i++) box(B.dark, -4.6 + i * 2.0, -4.45 + i * 2.0, -1.0, 1.0, 1.05, 1.28);
    box(B.dark, xr, xr + 0.25, -1.25, 1.25, 0.95, 1.30);                       /* the rear cross beam carrying the jacks */
    for (s = -1; s <= 1; s += 2) {
      if (row === "bal") cylX(B.dark, -1.25, 0.55, s * 1.12, 1.02, 0.28, 14);
      box(B.dark, AXL[0] - 0.12, AXL[0] + 0.12, s * 0.85, s * 1.0, 0.6, 1.0);
    }
    /* -- the cab (rost1 front, rost2, mod2018, cme03): a short cab wholly ahead of the front axle, a vertical lower
          front, a slightly raked face with THREE windscreen panes, a chamfered roof edge -- */
    loft(B.paint, [cabRing(XC0, ZR), cabRing(XF - 0.26, ZR), cabRing(XF - 0.15, ZR - 0.18), cabRing(XF, ZW)], false);
    /* the panes on the raked face: P0 at the face's foot, U up the face, W across, N out */
    P0 = [XF, 0, ZW]; L = Math.sqrt(0.15 * 0.15 + (ZR - 0.18 - ZW) * (ZR - 0.18 - ZW));
    U = [-0.15 / L, 0, (ZR - 0.18 - ZW) / L]; W = [0, 1, 0]; N = [(ZR - 0.18 - ZW) / L, 0, 0.15 / L];
    planeBox(B.glass, P0, U, W, N, 0.06, L - 0.06, -1.33, -0.50, 0.004, 0.02);
    planeBox(B.glass, P0, U, W, N, 0.06, L - 0.06, -0.42, 0.42, 0.004, 0.02);
    planeBox(B.glass, P0, U, W, N, 0.06, L - 0.06, 0.50, 1.33, 0.004, 0.02);
    /* the wipers hang from the top of each pane (rost1) */
    for (k = -1; k <= 1; k++) bar(B.dark, fp(P0, U, W, N, L - 0.10, k * 0.92 - 0.22, 0.045), fp(P0, U, W, N, 0.40, k * 0.92 - 0.05, 0.045), 0.025);
    /* lower front: the louvred grille in the middle (rost1), the bumper with lamp clusters at the outer ends and the
       tow cable looped across it (rost1, rost2, cme03) */
    box(B.dark, XF, XF + 0.03, -0.45, 0.45, 1.50, 1.86);
    for (k = 0; k < 5; k++) box(B.paint, XF + 0.03, XF + 0.045, -0.43, 0.43, 1.53 + k * 0.07, 1.555 + k * 0.07);
    box(B.dark, XF, X1, -1.52, 1.52, 0.95, 1.46);
    box(B.dark, XF + 0.06, X1 + 0.02, -0.55, 0.55, 1.10, 1.30);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.glass, X1, X1 + 0.03, s * 1.38, 1.36, 0.06, 10);              /* the small upper lamp */
      cylX(B.glass, X1, X1 + 0.03, s * 1.18, 1.20, 0.09, 12);              /* round lamp */
      box(B.glass, X1, X1 + 0.03, s * 1.40 - 0.10, s * 1.40 + 0.10, 1.00, 1.10);   /* square lamp */
      box(B.dark, XF - 0.05, X1 - 0.02, s * 1.20 - 0.18, s * 1.20 + 0.18, 0.62, 0.95);   /* the tow hook housings */
    }
    profY(B.dark, [[XF + 0.05, 0.95], [XF - 0.55, 0.66], [XF - 0.95, 0.66], [XF - 0.95, 0.95]], -1.15, 1.15);   /* the sloped skid plate (cme03) */
    bar(B.dark, [X1 + 0.05, -0.85, 1.25], [X1 + 0.05, 0.85, 1.25], 0.035);
    bar(B.dark, [X1 + 0.05, -0.85, 1.15], [X1 + 0.05, 0.85, 1.15], 0.035);
    bar(B.dark, [X1 + 0.05, -0.85, 1.25], [X1 + 0.05, -0.95, 1.20], 0.035);
    bar(B.dark, [X1 + 0.05, 0.85, 1.25], [X1 + 0.05, 0.95, 1.20], 0.035);
    /* doors with their windows and seams, steps, the mirror frames with two heads each on the front corners (rost2) */
    for (s = -1; s <= 1; s += 2) {
      side(B.glass, s, 4.70, 5.45, 2.25, 2.88, CW, 0.012);
      side(B.dark, s, 4.58, 4.60, 1.42, 2.98, CW, 0.012);
      side(B.dark, s, 5.58, 5.60, 1.42, 2.98, CW, 0.012);
      side(B.dark, s, 4.58, 5.60, 1.40, 1.42, CW, 0.012);
      side(B.dark, s, 4.68, 4.88, 2.02, 2.08, CW + 0.01, 0.02);
      box(B.dark, 4.65, 5.50, s * 1.25 - 0.22, s * 1.25 + 0.22, 1.02, 1.07);
      box(B.dark, 4.65, 5.50, s * 1.25 - 0.22, s * 1.25 + 0.22, 0.70, 0.75);
      bar(B.dark, [XF - 0.25, s * CW, 3.0], [XF - 0.20, s * 1.62, 3.0], 0.04);
      bar(B.dark, [XF - 0.20, s * 1.62, 3.0], [XF - 0.20, s * 1.62, 2.05], 0.04);
      bar(B.dark, [XF - 0.20, s * 1.62, 2.05], [XF - 0.30, s * CW, 1.95], 0.04);
      box(B.dark, XF - 0.24, XF - 0.15, s * 1.62 - 0.08, s * 1.62 + 0.08, 2.52, 2.90);    /* two heads a side (rost1, rost2) */
      box(B.dark, XF - 0.24, XF - 0.15, s * 1.62 - 0.08, s * 1.62 + 0.08, 2.12, 2.44);
      box(B.team, XC0 + 0.15, XC0 + 0.95, s * 0.95 - 0.12, s * 0.95 + 0.12, ZR, ZR + 0.02);      /* the two small team strips */
    }
    /* roof fittings by row: the Bastion's sensor head on a box and amber markers (mod2018), the Bal's two dome lamps (cme03) */
    if (row === "bastion") {
      box(B.paint, XC0 + 0.15, XC0 + 0.55, 0.30, 0.75, ZR, ZR + 0.20);
      cylZ(B.paint, XC0 + 0.35, 0.52, ZR + 0.20, ZR + 0.32, 0.13, 12);
      box(B.glass, XC0 + 0.47, XC0 + 0.50, 0.44, 0.60, ZR + 0.22, ZR + 0.30);
      cylZ(B.dark, XC0 + 0.30, -0.80, ZR, ZR + 0.22, 0.05, 8);
      for (s = -1; s <= 1; s += 2) box(B.glass, XF - 0.40, XF - 0.30, s * 1.15 - 0.07, s * 1.15 + 0.07, ZR, ZR + 0.08);
    } else {
      for (s = -1; s <= 1; s += 2) { cylZ(B.paint, XF - 0.45, s * 1.10, ZR, ZR + 0.08, 0.10, 10); cylZ(B.glass, XF - 0.45, s * 1.10, ZR + 0.08, ZR + 0.14, 0.08, 10); }
    }
  }

  /* jack legs: stowed (feet drawn up under the frame) or lowered to the ground, x = the row's jack stations */
  function addJacks(B, xs, down) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < xs.length; i++) {
      box(B.paint, xs[i] - 0.14, xs[i] + 0.14, s * 1.15 - 0.14, s * 1.15 + 0.14, 1.00, 1.32);
      if (down) {
        cylZ(B.dark, xs[i], s * 1.15, 0.10, 1.00, 0.06, 8);
        box(B.dark, xs[i] - 0.22, xs[i] + 0.22, s * 1.15 - 0.22, s * 1.15 + 0.22, 0.0, 0.10);
      } else {
        cylZ(B.dark, xs[i], s * 1.15, 0.80, 1.00, 0.06, 8);
        box(B.dark, xs[i] - 0.20, xs[i] + 0.20, s * 1.15 - 0.20, s * 1.15 + 0.20, 0.72, 0.80);
      }
    }
  }

  /* ---------------------------------------------- 3S60 (Bal): equipment cabin and the eight-container pack */
  function addBalBody(B) {
    var s, i;
    /* the engine compartment over the front axle (maks28: grille panel and a hatch; cme03: louvred box) */
    loft(B.paint, [sym(XM0, [[1.0, 1.55], [1.40, 1.55], [1.40, ZE - 0.10], [1.30, ZE]]), sym(XC0, [[1.0, 1.55], [1.40, 1.55], [1.40, ZE - 0.10], [1.30, ZE]])], false);
    side(B.dark, -1, 3.05, 3.95, 1.95, 2.55, 1.40, 0.012);
    for (i = 0; i < 5; i++) side(B.paint, -1, 3.07, 3.93, 1.99 + i * 0.11, 2.02 + i * 0.11, 1.412, 0.015);
    side(B.dark, 1, 3.15, 3.95, 1.66, 2.62, 1.40, 0.012);                 /* the door on the left (cme03) */
    side(B.paint, 1, 3.19, 3.91, 1.70, 2.58, 1.412, 0.012);
    side(B.glass, 1, 3.35, 3.80, 2.18, 2.52, 1.424, 0.012);
    side(B.dark, 1, 3.22, 3.28, 2.15, 2.35, 1.424, 0.02);
    for (s = -1; s <= 1; s += 2) side(B.dark, s, 2.95, 4.35, 1.62, 1.64, 1.40, 0.012);
    box(B.dark, 3.2, 3.9, -0.6, 0.6, ZE, ZE + 0.04);
    /* the low box behind it with a hatch (maks28), a round intake duct on its right side (cme03) */
    box(B.paint, 1.85, XM0, -1.32, 1.32, 1.55, ZE - 0.12);
    side(B.dark, 1, 2.05, 2.65, 1.85, 2.55, 1.32, 0.012);
    side(B.dark, 1, 2.30, 2.40, 2.18, 2.24, 1.335, 0.02);
    cyl(B.dark, [2.35, -1.32, 2.2], [2.35, -1.50, 2.2], 0.22, 0.22, 14);
    /* the equipment cabin (maks28 side, cme01, cme03): a plain box with a rim round the roof, a door at the rear of the right
       side with the ladder beside it (cme01, cme03), seams */
    box(B.paint, CB0, CB1, -1.45, 1.45, 1.55, ZC);
    box(B.paint, CB0 - 0.03, CB1 + 0.03, -1.48, 1.48, ZC - 0.06, ZC);
    box(B.dark, CB0 + 0.4, CB0 + 0.9, -0.5, 0.5, ZC, ZC + 0.05);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) side(B.dark, s, CB0 + 0.65 + i * 0.66, CB0 + 0.67 + i * 0.66, 1.65, ZC - 0.1, 1.45, 0.012);
      side(B.dark, s, CB0 + 0.1, CB1 - 0.1, 1.62, 1.64, 1.45, 0.012);
    }
    side(B.dark, 1, CB0 + 0.12, CB0 + 0.86, 1.70, 3.25, 1.45, 0.012);
    side(B.paint, 1, CB0 + 0.16, CB0 + 0.82, 1.74, 3.21, 1.462, 0.012);
    side(B.dark, 1, CB0 + 0.70, CB0 + 0.74, 2.35, 2.60, 1.475, 0.02);
    cylY(B.glass, CB0 + 0.49, 1.474, 1.49, 2.95, 0.10, 10);
    bar(B.dark, [CB0 + 0.15, -1.56, 1.10], [CB0 + 0.15, -1.56, ZC + 0.35], 0.05);
    bar(B.dark, [CB0 + 0.55, -1.56, 1.10], [CB0 + 0.55, -1.56, ZC + 0.35], 0.05);
    for (i = 0; i < 8; i++) bar(B.dark, [CB0 + 0.15, -1.56, 1.30 + i * 0.30], [CB0 + 0.55, -1.56, 1.30 + i * 0.30], 0.035);
    for (i = 0; i < 2; i++) bar(B.dark, [CB0 + 0.15 + i * 0.4, -1.56, 2.4], [CB0 + 0.15 + i * 0.4, -1.45, 2.4], 0.035);
    /* two whip antennas on the cabin roof (cme01, maks28; drawn 2.3 m, the photographs crop them) */
    cylZ(B.dark, CB1 - 0.35, 1.15, ZC, ZC + 0.12, 0.07, 8); bar(B.dark, [CB1 - 0.35, 1.15, ZC + 0.12], [CB1 - 0.35, 1.15, ZC + 2.3], 0.025);
    cylZ(B.dark, CB0 + 1.3, -1.15, ZC, ZC + 0.12, 0.07, 8); bar(B.dark, [CB0 + 1.3, -1.15, ZC + 0.12], [CB0 + 1.3, -1.15, ZC + 2.3], 0.025);
    /* the rear deck and the pack's cradle: side beams to the pivot at the frame's end, the pivot boss (maks28, IMDS) */
    box(B.paint, BPX - 0.05, CB0, -1.25, 1.25, 1.30, 1.42);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, BPX, CB0 - 0.1, s * 1.12 - 0.10, s * 1.12 + 0.10, 1.42, 1.62);
      box(B.dark, BPX - 0.22, BPX + 0.22, s * 0.95 - 0.10, s * 0.95 + 0.10, 1.40, BPZ + 0.05);
      box(B.glass, BPX - 0.07, BPX - 0.03, s * 1.10 - 0.08, s * 1.10 + 0.08, 0.95, 1.15);    /* tail lamps */
    }
    cylY(B.dark, BPX, -1.05, 1.05, BPZ, 0.10, 12);
    box(B.dark, BPX - 0.08, BPX + 0.04, -1.30, 1.30, 0.80, 1.30);
  }

  /* the eight Kh-35 containers, two tiers of four (cme01, cme03, cs01, maks28), in the pod's frame: x along the pack
     from the pivot (the pack's rear 1.98 m behind it), +z up */
  function addBalPack(B) {
    var r, c, y, z, i, x0 = PK0, x1 = PK0 + PKL, R = 0.33;
    for (r = 0; r < 2; r++) for (c = 0; c < 4; c++) {
      y = (c - 1.5) * 0.70; z = 0.47 + r * 0.70;
      revolve(B.paint, [[x0 - 0.16, 0.0], [x0 - 0.12, 0.17], [x0 - 0.05, 0.27], [x0, R], [x1 - 0.06, R], [x1, R - 0.02], [x1, 0.0]], y, z, 16);
      revolve(B.dark, [[x1 - 0.02, R + 0.015], [x1 + 0.04, R + 0.015], [x1 + 0.04, 0.0]], y, z, 16);
      for (i = 0; i < 3; i++) revolve(B.paint, [[x0 + 0.75 + i * 1.3, R + 0.02], [x0 + 0.85 + i * 1.3, R + 0.02]], y, z, 16);
    }
    /* three strap frames round the pack (IMDS maquette, maks28) and the base rails to the pivot */
    var xs = [PK0 + 0.40, PK0 + 2.15, PK0 + 3.85];
    for (i = 0; i < xs.length; i++) {
      box(B.dark, xs[i] - 0.07, xs[i] + 0.07, -1.47, 1.47, 0.07, 0.14);
      box(B.dark, xs[i] - 0.07, xs[i] + 0.07, -1.47, 1.47, 1.50, 1.57);
      box(B.dark, xs[i] - 0.07, xs[i] + 0.07, -1.47, -1.40, 0.07, 1.57);
      box(B.dark, xs[i] - 0.07, xs[i] + 0.07, 1.40, 1.47, 0.07, 1.57);
      box(B.dark, xs[i] - 0.06, xs[i] + 0.06, -1.41, 1.41, 0.80, 0.84);
    }
    for (c = -1; c <= 1; c += 2) {
      box(B.dark, PK0 + 0.30, PK0 + 3.95, c * 0.95 - 0.08, c * 0.95 + 0.08, 0.0, 0.10);
      box(B.dark, -0.18, 0.18, c * 0.95 - 0.12, c * 0.95 + 0.12, -0.10, 0.10);
    }
  }

  /* ---------------------------------------------- K340P (Bastion-P): crew module, the long body, two P-800 containers */
  /* the body section: vertical sides, a chamfer, a lip; open between the inner walls (y = +-(BW - 0.53)) for the bay */
  function bodyRing(x) {
    var wi = BW - 0.53;
    return [[x, 0.9, ZB], [x, BW, ZB], [x, BW, ZS], [x, BW - 0.45, ZT], [x, wi, ZT], [x, wi, ZB + 0.06],
            [x, -wi, ZB + 0.06], [x, -wi, ZT], [x, -(BW - 0.45), ZT], [x, -BW, ZS], [x, -BW, ZB], [x, -0.9, ZB]];
  }
  function addBastionBody(B) {
    var s, i, xs;
    /* the crew module behind the cab, its top rising above the cab roof toward the body (mod2018, prelaunch); a door with a
       window on its left side (mod2018) */
    profY(B.paint, [[XM0, 1.55], [XC0, 1.55], [XC0, ZR], [XC0 - 0.55, ZR + 0.28], [XM0, ZR + 0.28]], -1.42, 1.42);
    side(B.dark, -1, 3.05, 3.85, 1.68, 3.15, 1.42, 0.012);
    side(B.paint, -1, 3.09, 3.81, 1.72, 3.11, 1.432, 0.012);
    side(B.glass, -1, 3.25, 3.65, 2.55, 3.00, 1.444, 0.012);
    side(B.dark, -1, 3.70, 3.76, 2.25, 2.45, 1.444, 0.02);
    side(B.dark, 1, 3.05, 3.85, 1.68, 3.15, 1.42, 0.012);
    /* the long body: vertical sides, a chamfer to the flat roof (mod2018, prelaunch); the roof itself is the cover, drawn by pose */
    loft(B.paint, [bodyRing(BX0), bodyRing(XM0)], false);
    for (s = -1; s <= 1; s += 2) {
      /* the louvre panel at the front of the body side (mod2018), seams, the chamfer line, the skirts with wheel arches */
      side(B.dark, s, 1.85, 2.45, 1.95, 2.45, BW, 0.012);
      for (i = 0; i < 6; i++) side(B.paint, s, 1.87, 2.43, 1.98 + i * 0.075, 2.0 + i * 0.075, BW + 0.012, 0.012);
      for (i = 0; i < 5; i++) side(B.dark, s, -5.0 + i * 1.6, -4.98 + i * 1.6, ZB + 0.1, ZS - 0.05, BW, 0.012);
      side(B.dark, s, BX0 + 0.05, XM0 - 0.05, ZS - 0.03, ZS - 0.01, BW, 0.012);
      xs = [[XM0, AXL[1] + 0.82], [AXL[1] - 0.82, AXL[2] + 0.82], [AXL[2] - 0.82, AXL[3] + 0.82], [AXL[3] - 0.82, BX0]];
      for (i = 0; i < xs.length; i++) box(B.paint, xs[i][1], xs[i][0], s * BW - (s < 0 ? 0 : 0.06), s * BW + (s < 0 ? 0.06 : 0), 0.98, ZB + 0.01);
      box(B.glass, BX0 - 0.03, BX0, s * 1.25 - 0.10, s * 1.25 + 0.10, 1.40, 1.55);       /* tail lamps */
    }
    /* the rear wall's frame */
    box(B.dark, BX0 - 0.04, BX0, -1.2, 1.2, ZS - 0.04, ZS);
    box(B.dark, BX0 - 0.10, BX0, -1.4, 1.4, 0.80, 1.00);
  }
  /* the roof cover over the container bay: two leaves hinged on the inner lips (y = s*(BW-0.53), z = ZT), meeting on the
     centre line when shut; th = swing from shut about the hinge (negative: down into the bay) */
  function bastionCover(B, th) {
    var s, c = Math.cos(th), sn = Math.sin(th), i, w = BW - 0.53, t = 0.05, x0 = BX0 + 0.02, x1 = XM0 - 0.02;
    function pt(s, u, h, x) { return [x, s * w + (-s * c * u + s * sn * h), ZT + (sn * u + c * h)]; }
    function slab(s, xa, xb, ua, ub, ha, hb) {
      hexa(B.paint, [pt(s, ua, ha, xa), pt(s, ub, ha, xa), pt(s, ub, ha, xb), pt(s, ua, ha, xb),
                     pt(s, ua, hb, xa), pt(s, ub, hb, xa), pt(s, ub, hb, xb), pt(s, ua, hb, xb)]);
    }
    for (s = -1; s <= 1; s += 2) {
      slab(s, x0, x1, 0, w, -t, 0);
      for (i = 0; i < 6; i++) slab(s, x0 + 0.5 + i * 1.6, x0 + 0.56 + i * 1.6, 0.05, w - 0.05, 0, 0.025);
      slab(s, x0, x1, w - 0.04, w, 0, 0.03);
    }
  }
  /* the two P-800 containers lying in the bay, in the pod's frame (x up the container from the hinge at its foot):
     ring stiffeners, the domed top caps and the clamp collar (prelaunch), the lattice erector frame under them that faces
     the cab when they stand (prelaunch) */
  function addBastionTubes(B) {
    var c, y, i, R = 0.40, L = TL;
    for (c = -1; c <= 1; c += 2) {
      y = c * TY2;
      revolve(B.paint, [[0.0, 0.0], [0.0, R - 0.03], [0.05, R], [L - 0.05, R], [L, R - 0.04], [L + 0.12, 0.30], [L + 0.22, 0.14], [L + 0.25, 0.0]], y, 0.5, 20);
      revolve(B.dark, [[0.02, R + 0.02], [0.30, R + 0.02], [0.30, 0.0]], y, 0.5, 20);
      for (i = 0; i < 6; i++) revolve(B.paint, [[1.1 + i * 1.25, R + 0.02], [1.18 + i * 1.25, R + 0.02]], y, 0.5, 20);
      cyl(B.dark, [L + 0.18, y, 0.5 + 0.15], [L + 0.18, y, 0.5 + 0.3], 0.05, 0.05, 8);
    }
    /* the clamp collar round both containers */
    box(B.dark, 3.70, 3.90, -1.0, 1.0, 0.05, 0.12);
    box(B.dark, 3.70, 3.90, -1.0, 1.0, 0.88, 0.95);
    box(B.dark, 3.70, 3.90, -1.0, -0.92, 0.05, 0.95);
    box(B.dark, 3.70, 3.90, 0.92, 1.0, 0.05, 0.95);
    /* the lattice frame: two rails, rungs and diagonals */
    for (c = -1; c <= 1; c += 2) box(B.dark, 0.0, 3.9, c * 0.70 - 0.05, c * 0.70 + 0.05, -0.02, 0.10);
    for (i = 0; i < 6; i++) box(B.dark, 0.15 + i * 0.7, 0.21 + i * 0.7, -0.70, 0.70, 0.0, 0.08);
    for (i = 0; i < 5; i++) bar(B.dark, [0.18 + i * 0.7, -0.68, 0.04], [0.88 + i * 0.7, 0.68, 0.04], 0.04);
    box(B.dark, -0.15, 0.15, -1.05, 1.05, -0.10, 0.12);      /* the hinge beam */
  }

  /* -------------------------------------------------------------- assembly */
  function build(THREE, M, C, key) {
    var row = key === "pact_e20_coastssm" ? "bastion" : "bal";
    var T = materials(THREE, C, row === "bal" ? PAINT_BAL : PAINT_BAS);
    var g = new THREE.Group(), HB = bins(T), EB = bins(T), TR = bins(T), DP = bins(T), i, s, wg, wm, geo, E, TB, trg, dpg, ry;
    addChassis(HB, row);
    if (row === "bal") addBalBody(HB); else addBastionBody(HB);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre, false);
    tyre(TB);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < AXL.length; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(AXL[i], s * TY, RT);
        wm = new THREE.Mesh(geo, T.tyre);
        wm.scale.set(TS, TS, TS);
        if (s < 0) wm.rotation.y = Math.PI / 24;
        wg.add(wm);
        g.add(wg);
      }
    }
    /* poses: the march (jacks up; the Bastion's bay roof shut) and set up (jacks down; the Bastion's roof leaves open) */
    addJacks(TR, row === "bal" ? JX_BAL : JX_BAS, false);
    addJacks(DP, row === "bal" ? JX_BAL : JX_BAS, true);
    if (row === "bastion") {
      bastionCover(TR, 0);
      box(TR.paint, BX0, BX0 + 0.05, -(BW - 0.53), BW - 0.53, ZB + 0.06, ZT);      /* the bay's rear wall, shut on the march */
      bastionCover(DP, COVER_OPEN);
    }
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { paint: TR.paint, dark: TR.dark });
    g.add(trg);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { paint: DP.paint, dark: DP.dark });
    g.add(dpg);
    /* the elevating launch pack */
    E = new THREE.Group();
    E.name = "podelev";
    if (row === "bal") {
      addBalPack(EB);
      E.position.set(BPX, 0, BPZ);
      E.userData.el = EL_BAL;
      E.userData.cells = [];
      for (i = 0; i < 8; i++) E.userData.cells.push([PK0 + PKL + 0.08, ((i % 4) - 1.5) * 0.70, 0.47 + ((i / 4) | 0) * 0.70, PK0 + PKL - 0.45]);
    } else {
      addBastionTubes(EB);
      E.position.set(HX2, 0, HZ2);
      E.userData.el = EL_BAS;
      E.userData.cells = [[TL + 0.3, TY2, 0.5, TL - 0.5], [TL + 0.3, -TY2, 0.5, TL - 0.5]];
    }
    flush(THREE, E, { paint: EB.paint, dark: EB.dark });
    g.add(E);
    g.name = key;
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of both poses, bumper to the pack's rear caps (Bal) or the body's rear wall (Bastion-P) */
UNIT_MODELS["pact_e00_coastssm"] = {
  len: 12.93,
  build: function (THREE, M, C) { return HeroBalBastion.build(THREE, M, C, "pact_e00_coastssm"); }
};
UNIT_MODELS["pact_e20_coastssm"] = {
  len: 12.79,
  build: function (THREE, M, C) { return HeroBalBastion.build(THREE, M, C, "pact_e20_coastssm"); }
};
