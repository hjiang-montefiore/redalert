/* ===== ru_bm14_bm21.js - HERO models: the BM-14 (8U32) on the ZiS-151 and the BM-21 Grad (2B5) on the Ural-375D =====
   Full-quality redo (2026-11-03).  Two keys, kept, registered in the loop at the foot as before (HeroRuBm.build and
   HeroRuBm.rows keep their names; no other file calls them - pla_phl81.js, pla_type90mrl.js, pla_bm13.js and
   pla_type63mrl.js only cite this file in comments, and ru_shmel.js has its own bm14()):
     pact_e50_mlrs  "BM-14" 140 mm, 1952 (armour_specs "BM-14-16") - the 16-tube BM-14 (8U32) on the ZiS-151 6x6
     pact_e60_mlrs  "BM-21 Grad" 122 mm, 1963 - the 2B5 launcher on the Ural-375D 6x6
   Both rows are turret:true; neither is deploy:true, so there is no travel/deploy pose pair.

   Which truck (ru.wikipedia "BM-14"): "BM-14 (8U32) - the base version, on the ZiS-151 chassis"; the BM-14M (2B2) is the
     ZiL-157 and the 17-tube BM-14-17 the GAZ-63.  The 1952 row is the 16-tube base version, so the ZiS-151.  ru.wikipedia
     "Grad (RSZO)": the 2B5 combat vehicle on the Ural-375D; ru.wikipedia "Ural-375D": the all-metal cab from 1964 (the
     1961-64 Ural-375 had a folding canvas roof).  The photographs below all show the metal cab, so that is drawn.

   Sources (Wikimedia Commons at width 960; ru.wikipedia for figures):
     [D]  "Ural-375, Truck, Cargo, 4000 kg, 4 tonne, 6x6.png" - Mick Bell's 1/76 general arrangement of the Ural-375D
          (side, plan, front, rear; CC-BY 4.0): the station drawing for the truck, measured at 58.5 px a metre.
     [L]  "Lesany, vojenske muzeum, raketomet BM-21 na nakladnim automobilu Ural" - front-left: grille, wings, headlamps, cab.
     [F]  "Ural 375-D Rocket Launcher (23309550740)" - front-right: the intake pipe up the starboard pillar, the roof peak.
     [S2] "BM-21 Grad on Ural-375D chassis (1)" - front-left, pack raised: grille, bumper, mirrors.
     [P]  "Wyrzutne rakiet BM-21 'Grad' na samochodach Ural 375D" - 1960s parade: the pack laid fore-and-aft, mouths just
          behind the cab.
     [Rr] "Wyrzutnia rakiet BM-21 Grad na podwoziu Ural-375D, widok z tylu (1)" - rear-right: the tails in their box frame
          (4 rows of 10, in line), the slot in its side plate, the clamp band behind the mouths, the cradle, the starboard
          handwheel, the spare behind the cab, the big rear mudguards.
     [M]  "BM-21 Grad (MUN 27777) side view 2" - port side: the fuel tank under the cab back, the locker behind the cab,
          the deck's channel edge, the cradle's tapering side plates.  [Si] "... side view 1": the sight on the port side,
          the fluted mudguard over the bogie.
     [Fi] "Ukrainian BM-21 Grad firing" - near side-on: the pack hinged at its tail end over the rear of the truck, mouths
          forward, about 34 degrees up, the back-blast off the rear.
     [Z]  "ZIS-151 Rocket Launcher (22966077674)" - BM-14 front-left: tall barred grille, louvred bonnet, separate round
          wings, guarded headlamps, the cab's armour shutters LOWERED (two front plates and the door plates, vision slits),
          the two-tier pack behind the cab.
     [Zm] "Reaktivnaya sistema zalpovogo ognya BM-14" (Moscow museum, the ru.wikipedia infobox picture) - BM-14 front-left
          with the shutters folded on the roof: the pack's open truss of curved tubes, the spare upright behind the cab, port.
   Published (ru.wikipedia): BM-21: length 7350, width 2400, height 3090 in travel, tubes 3000 mm long, elevation to 55.
     Ural-375D: length 7350, width 2690 (the cargo body), cab height 2680, wheelbase 3525 + 1400, track 2000.
     BM-14: length 6920, width 2300, height 2650, 16 smooth tubes of 140.3 mm and 1370 mm in a two-tier welded truss of front
     and rear clamps and cross tubes, elevation 0 to +50, traverse +-70.  ZiS-151: wheelbase 3665 + 1120, track 1590 front and
     1720 rear, twinned rear tyres, height 2310 to the cab.
   CONFIRMED from the old header: the trucks, the dimensions, the packs (16 in two rows of eight; 40 in four rows of ten), the
     mouths forward with the trunnion at the pack's rear [Fi], the armoured BM-14 cab [Z], no markings.
   CORRECTED: the BM-14 tubes were 1.9 m "scaled off the photographs"; ru.wikipedia gives 1370 mm, drawn.  The BM-21's rows
     were staggered; [Rr] shows them in line.  The Grad's width is 2.40 (the published 2.69 is the cargo body).  The old
     cabs, bonnets and wings were boxes; the old Ural cab sat too far forward of the drawing.  The ZiS-151's rear tyres are
     twinned (ru.wikipedia), not single.  The spare wheel the old header ruled out is photographed on both [Zm][Rr].

   Recognition list (what each rests on; where it is in the code):
     BM-21  1. Ural-375D proportions: the long bonnet narrowing to the grille, the 3.525 + 1.40 m wheelbase, 1.2 m tyres [D]: UR, ural().
            2. The flat-topped front wings sweeping down behind the wheel, the headlamps in their front faces [D][L]: ural().
            3. The tall grille of vertical bars, the deep plate bumper with its hooks [L][S2]: ural().
            4. The metal cab: raked two-pane windscreen, roof peak, door window, round mirrors on arms [L][F][D]: ural().
            5. The air-intake pipe up the starboard windscreen pillar with its mushroom head [F][L][D]: ural().
            6. The spare upright behind the cab, starboard [D][Rr]; the locker and the fuel tank, port [M]: ural().
            7. Forty tubes, four rows of ten in line, 3.0 m, the tails in the box frame with its side slot [Rr][P]: gradPack().
            8. The pack laid fore-and-aft over the bogie, mouths behind the cab [P]; raised about its tail trunnion [Fi]: "podelev".
            9. The mount: turntable, base, trunnion cheeks, handwheel to starboard [Rr], sight to port [Si]: gradMount().
           10. The big rear mudguards, rounded both ends and fluted at the front [Rr][Si]: ural().
     BM-14  1. ZiS-151 proportions: 3.665 + 1.12 m wheelbase, twinned rear tyres, narrow front track [Zm][Z]: ZS, addWheels().
            2. The tall narrow barred grille and the rounded louvred bonnet [Z][Zm]: zis().
            3. Separate round-crowned wings, the headlamps on brackets over them in wire guards [Z][Zm]: zis().
            4. The armoured cab: two front shutters lowered with vision slits, plates over the door windows, roof plate [Z]: zis().
            5. The channel bumper, the running boards [Z][Zm]: zis().
            6. Sixteen 140 mm tubes in two tiers of eight with thick rims, in the open truss of clamps and curved cross
               tubes [Zm][Z]: zisPack().
            7. The pack close behind the cab, the spare upright on the port side [Zm]: Z_TX, zis().
            8. The pedestal and rotating frame, the trunnion at its rear, the sight to port [Zm]: zisMount().
   Poses: on the march both packs lie level, mouths forward ([P]; [Z][Zm] show the BM-14 pack forward over the frame).
     Firing: "podelev" raised to userData.el = 35 degrees about the rear trunnion; [Fi] measures about 34 for the BM-21.  No
     BM-14 firing photograph was found: 35 is drawn for it as well, inside the published 0 to +50, and is not a figure.
     "turret" is the traversing mount with the pack along its +X; the engine trains it all round, the real limits are
     +-70 (BM-14) and about -102/+70 (BM-21, not drawn).
   Paint: plain Soviet green, no numbers or markings.  Sampled: [L] bonnet in daylight #78764f, door #646246; [Zm] bonnet
     #66644f.  Drawn: BM-21 #535538 (about 0.7 of [L]), BM-14 #555440 (about 0.84 of [Zm]).
   NOT drawn (not confirmed): folding armour shutters on the Grad's cab (none of [L][F][S2][P][M][Fi][Rr] shows any), any
     stabiliser jacks (none photographed), the BM-14's spring balancer (seen only as a blur), the cables and conduits, the
     Ural's winch, canvas muzzle covers, markings, numbers or plates.  Estimated: the BM-14 mount's station (the 3/4
     photographs fix only that the pack's mouths are close behind the cab), the Grad's turntable station between the
     bogie axles, the depth of the tail frame, the spare's carrier; [Fi] shows a spare turned the other way on a wartime
     vehicle, the factory position of [D] is drawn.

   Mechanisms: "turret" (origin on the ring) holds "podelev" (origin on the rear trunnion), userData.el and userData.cells
   ([mouth x, y, z, tail x] in the group's frame: 40 and 16); six "roadwheel" groups (the BM-14's rear four twinned).
   Materials 5: paint (canvas texture, metre UVs), dark, glass, tyre, C.team (one strip on top of each pack, none on the
   hull).  Draw calls 15: hull 4 (paint, dark, glass, tyre for the spare), wheels 6, mount 2, pack 3.
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBm = (function () {
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

  /* ------------------------------------------------------------ shared parts */
  var ROWS = {
    pact_e50_mlrs: { veh: "bm14", paint: { base: "#555440", blots: ["#4e4d3a", "#5c5b46", "#51503c"], seed: 14052 } },
    pact_e60_mlrs: { veh: "bm21", paint: { base: "#535538", blots: ["#4c4e33", "#5a5c3f", "#4f5136"], seed: 21063 } }
  };

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

  /* ===================================================================== BM-14 (8U32) on the ZiS-151
     Figures (ru.wikipedia, ZiS-151 and BM-14): length 6930 (6920 for the BM-14), width 2320 (2300), height to the cab
     2310 (2650 to the pack), wheelbase 3665 + 1120, track 1590 front and 1720 rear, twinned rear tyres. */
  var ZS = { XN: 3.46, XT: -3.46, AX: [2.46, -1.205, -2.325], R: 0.475, W: 0.21, TYF: 0.795, TYR: 0.86, DUAL: 0.115 };
  var Z_TX = -0.15, Z_TZ = 1.14;
  var Z_PVX = -0.62, Z_PVZ = 0.86;                   /* trunnion at the rear of the rotating frame (X -1.22, Z 2.00) */
  var Z_XTL = -0.20, Z_XMO = 1.17;                   /* 1.37 m tubes (ru.wikipedia) */
  var Z_P = 0.19, Z_R = 0.078, Z_ROWS = [0.36, 0.54];
  var Z_EL = 35 * Math.PI / 180;

  function zis(B) {
    var s, k, x, y, yo;
    var AX = ZS.AX;
    box(B.dark, -3.40, 3.30, -0.44, 0.44, 0.62, 0.82);
    for (k = 0; k < 3; k++) {
      cylY(B.dark, AX[k], -0.80, 0.80, ZS.R, 0.075, 8);
      box(B.dark, AX[k] - 0.16, AX[k] + 0.16, -0.26, 0.26, 0.36, 0.60);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, AX[0] - 0.60, AX[0] + 0.60, s * 0.44, s * 0.54, 0.58, 0.66);
      box(B.dark, AX[2] - 0.25, AX[1] + 0.25, s * 0.44, s * 0.56, 0.56, 0.66);
    }
    /* the channel bumper and the tow hooks under it */
    box(B.dark, 3.30, ZS.XN, -1.10, 1.10, 0.50, 0.70);
    box(B.dark, 3.30, 3.42, -1.10, 1.10, 0.53, 0.67);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.40, 3.49, s * 0.42 - 0.04, s * 0.42 + 0.04, 0.40, 0.50);
      box(B.dark, 3.45, 3.49, s * 0.42 - 0.04, s * 0.42 + 0.04, 0.40, 0.56);
    }
    /* the tall narrow radiator shell with its vertical bars [Z][Zm] */
    box(B.paint, 3.06, 3.20, -0.40, 0.40, 0.70, 1.56);
    box(B.dark, 3.20, 3.215, -0.33, 0.33, 0.76, 1.50);
    for (k = 0; k < 11; k++) { y = -0.30 + k * 0.06; box(B.paint, 3.205, 3.235, y - 0.012, y + 0.012, 0.77, 1.49); }
    box(B.paint, 3.20, 3.24, -0.36, 0.36, 1.12, 1.15);
    cylX(B.dark, 3.20, 3.30, 0, 0.66, 0.035, 6);                                   /* starting handle dog */
    /* the rounded bonnet */
    hood(B.paint, [[3.10, 0.38, 1.57], [2.95, 0.42, 1.61], [2.60, 0.48, 1.645], [2.20, 0.52, 1.66], [1.86, 0.54, 1.67]], 0.98, 0.24);
    for (s = -1; s <= 1; s += 2) {
      /* louvres in the bonnet side [Z] */
      for (k = 0; k < 5; k++) box(B.dark, 2.18, 2.62, s * 0.515 - 0.01, s * 0.515 + 0.01, 1.24 + k * 0.05, 1.26 + k * 0.05);
      /* the round-crowned front wing over the wheel, separate from the bonnet [Z][Zm] */
      yo = s > 0 ? [0.40, 1.03] : [-1.03, -0.40];
      ribbon(B.paint, [[1.76, 0.60], [1.82, 0.80], [1.96, 0.98], [2.20, 1.08], [2.50, 1.12], [2.80, 1.10], [3.05, 1.01], [3.22, 0.85], [3.28, 0.64]], yo[0], yo[1], 0.035);
      ribbon(B.paint, [[1.82, 0.62], [1.88, 0.80], [2.00, 0.95], [2.22, 1.04], [2.50, 1.08], [2.78, 1.06], [3.02, 0.98], [3.17, 0.84], [3.22, 0.66]], s > 0 ? 1.03 : -1.07, s > 0 ? 1.07 : -1.03, 0.035);
      /* the headlamp on its bracket over the wing, its wire guard [Z][Zm] */
      cylX(B.dark, 2.92, 3.04, s * 0.66, 1.26, 0.115, 14);
      cylX(B.glass, 3.04, 3.05, s * 0.66, 1.26, 0.098, 14);
      box(B.dark, 2.94, 3.00, s * 0.66 - 0.03, s * 0.66 + 0.03, 1.10, 1.15);
      for (k = -1; k <= 1; k++) bar(B.dark, [3.08, s * 0.66 + k * 0.07, 1.14], [3.08, s * 0.66 + k * 0.07, 1.38], 0.012);
      bar(B.dark, [3.08, s * 0.66 - 0.12, 1.26], [3.08, s * 0.66 + 0.12, 1.26], 0.012);
      /* running board under the door */
      box(B.dark, 0.62, 1.80, s * 0.70, s * 1.05, 0.58, 0.62);
    }
    /* the cab, armoured: the shutters lowered over the windscreen with their vision slits, the plates over the door
       windows, the roof plate [Z] */
    profY(B.paint, [[0.62, 0.92], [1.60, 0.92], [1.84, 1.30], [1.88, 1.67], [1.74, 2.24], [1.64, 2.31], [0.70, 2.31], [0.62, 2.22]], -0.98, 0.98);
    var U = unit([-0.14, 0, 0.57]), N = unit([0.57, 0, 0.14]), P0 = [1.88, 0, 1.67];
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.paint, P0, U, [0, 1, 0], N, -0.02, 0.60, s > 0 ? 0.02 : -0.97, s > 0 ? 0.97 : -0.02, 0.0, 0.03);
      planeBox(B.dark, P0, U, [0, 1, 0], N, 0.36, 0.385, s > 0 ? 0.22 : -0.70, s > 0 ? 0.70 : -0.22, 0.03, 0.035);
      sideBox(B.paint, s, 0.98, 0.03, 1.02, 1.62, 1.72, 2.24);                       /* door-window plate */
      sideBox(B.dark, s, 1.01, 0.004, 1.12, 1.48, 2.00, 2.025);                      /* its slit */
      sideBox(B.dark, s, 0.98, 0.006, 1.64, 1.66, 0.96, 2.20);                       /* door seams */
      sideBox(B.dark, s, 0.98, 0.006, 0.80, 0.82, 0.96, 2.20);
      sideBox(B.dark, s, 1.01, 0.03, 0.90, 1.00, 1.60, 1.64);                        /* handle */
      bar(B.dark, [1.80, s * 0.96, 2.05], [1.86, s * 1.14, 2.12], 0.025);             /* mirror */
      box(B.dark, 1.82, 1.86, s * 1.14 - 0.06, s * 1.14 + 0.06, 1.98, 2.22);
    }
    cylY(B.dark, 1.73, -0.96, 0.96, 2.27, 0.025, 6);                                /* shutter hinge */
    box(B.paint, 0.72, 1.70, -0.94, 0.94, 2.31, 2.345);                               /* roof plate */
    box(B.dark, 0.72, 1.70, -0.95, 0.95, 2.30, 2.31);
    /* behind the cab: the spare wheel upright on the port side [Zm] */
    tyre(B.tyre, ZS.R, ZS.W, 20, function (p) { return [0.34 + p[0], 0.80 + p[1], 1.42 + p[2]]; }, 1);
    box(B.dark, 0.16, 0.52, 0.62, 0.66, 1.00, 1.80);
    /* the launcher deck, the lockers ahead of the bogie, the mudguard aprons [Z][Zm] */
    box(B.paint, -3.42, 0.56, -0.62, 0.62, 1.06, Z_TZ);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.42, 0.56, s * 0.62, s * 0.64, 1.02, 1.14);
      box(B.paint, -3.42, -0.95, s * 0.62, s * 1.12, 1.06, 1.10);                      /* flat mudguard over the twinned wheels */
      box(B.dark, -3.42, -0.95, s * 1.12, s * 1.14, 1.00, 1.10);
      box(B.paint, -0.95, 0.45, s * 0.62, s * 1.02, 0.68, 1.06);
      box(B.dark, -0.95, 0.45, s * 1.02, s * 1.03, 0.98, 1.00);
      for (k = 0; k < 2; k++) box(B.dark, -0.70 + k * 0.80, -0.60 + k * 0.80, s * 1.02, s * 1.035, 0.84, 0.90);
      box(B.paint, -0.98, -0.95, s * 0.62, s * 1.12, 0.66, 1.06);                       /* bogie front apron */
      box(B.paint, -3.42, -3.38, s * 0.62, s * 1.12, 0.66, 1.06);                       /* rear apron */
      box(B.dark, -3.46, -3.42, s * 0.90 - 0.07, s * 0.90 + 0.07, 0.86, 0.96);         /* tail lamps */
      box(B.glass, -3.47, -3.46, s * 0.90 - 0.05, s * 0.90 + 0.05, 0.88, 0.94);
    }
    box(B.dark, -3.46, -3.38, -0.90, 0.90, 0.72, 1.00);
    cylX(B.dark, -3.52, -3.46, 0, 0.82, 0.06, 8);
  }

  /* the BM-14 mount: pedestal, ring, the rotating frame with the trunnion cheeks at its rear, the elevating
     screw housing at its front, the sight on the port side */
  function zisMount(B) {
    var s;
    cylZ(B.dark, 0, 0, 0, 0.30, 0.40, 18);
    cylZ(B.dark, 0, 0, 0.30, 0.36, 0.52, 20);
    box(B.paint, -0.82, 0.52, -0.46, 0.46, 0.36, 0.52);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, Z_PVX - 0.16, Z_PVX + 0.16, s * 0.50, s * 0.56, 0.36, Z_PVZ + 0.08);
      cylY(B.dark, Z_PVX, s * 0.46, s * 0.60, Z_PVZ, 0.07, 10);
      bar(B.paint, [Z_PVX + 0.16, s * 0.53, 0.52], [Z_PVX - 0.10, s * 0.53, Z_PVZ - 0.06], 0.05);
    }
    cylZ(B.paint, 0.36, 0, 0.52, 0.80, 0.06, 10);
    cylZ(B.dark, 0.36, 0, 0.80, 0.88, 0.035, 8);
    box(B.dark, -0.20, 0.00, 0.46, 0.62, 0.40, 0.56);
    cylZ(B.dark, -0.10, 0.56, 0.56, 0.84, 0.035, 8);
    box(B.dark, -0.20, 0.00, 0.50, 0.64, 0.84, 0.96);
    cylY(B.dark, 0.20, 0.46, 0.50, 0.46, 0.10, 12);                                   /* laying handwheel */
  }

  /* the open-frame pack, "podelev", origin on the trunnion: two tiers of eight 140 mm tubes in the welded truss
     of front and rear clamps and curved cross tubes [Zm][Z]; ru.wikipedia: "a two-tier pack ... in a welded truss
     of front and rear clamps and transverse tubes" */
  function zisPack(B, cells) {
    var i, j, k, y, z, s, x, hw = 3.5 * Z_P + Z_R, zb = Z_ROWS[0] - Z_R, zt = Z_ROWS[1] + Z_R, H, c;
    for (j = 0; j < 2; j++) for (i = 0; i < 8; i++) {
      y = (i - 3.5) * Z_P; z = Z_ROWS[j];
      cylX(B.paint, Z_XTL + 0.04, Z_XMO - 0.05, y, z, Z_R, 12);
      cyl(B.paint, [Z_XMO - 0.05, y, z], [Z_XMO, y, z], Z_R + 0.010, Z_R + 0.010, 12, false, true);   /* mouth rim */
      cyl(B.paint, [Z_XTL, y, z], [Z_XTL + 0.04, y, z], Z_R + 0.008, Z_R + 0.008, 12, true, false);   /* tail rim */
      cylX(B.dark, Z_XMO - 0.07, Z_XMO - 0.06, y, z, Z_R - 0.004, 10);
      cylX(B.dark, Z_XTL + 0.05, Z_XTL + 0.06, y, z, Z_R - 0.004, 10);
      cells.push([Z_XMO + 0.05, y, z, Z_XTL]);
    }
    /* front and rear clamps */
    band(B.paint, Z_XMO - 0.24, 0.06, hw, zb, zt, 0.028);
    band(B.paint, Z_XTL + 0.10, 0.06, hw, zb, zt, 0.028);
    for (k = 0; k < 2; k++) {
      x = k ? Z_XMO - 0.21 : Z_XTL + 0.13;
      box(B.paint, x - 0.02, x + 0.02, -hw, hw, (Z_ROWS[0] + Z_ROWS[1]) / 2 - 0.012, (Z_ROWS[0] + Z_ROWS[1]) / 2 + 0.012);
    }
    /* the curved cross tubes under the pack, the side and bottom rails joining them */
    H = [[-hw - 0.03, Z_ROWS[1]], [-hw - 0.03, zb - 0.02], [-0.56, 0.12], [-0.28, 0.05], [0.28, 0.05], [0.56, 0.12], [hw + 0.03, zb - 0.02], [hw + 0.03, Z_ROWS[1]]];
    for (k = 0; k < 3; k++) {
      x = Z_XTL + 0.13 + k * (Z_XMO - 0.34 - Z_XTL) / 2;
      for (c = 0; c < H.length - 1; c++) bar(B.paint, [x, H[c][0], H[c][1]], [x, H[c + 1][0], H[c + 1][1]], 0.04);
    }
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [Z_XTL + 0.13, s * 0.42, 0.085], [Z_XMO - 0.21, s * 0.42, 0.085], 0.035);
      bar(B.paint, [Z_XTL + 0.13, s * (hw + 0.03), zb - 0.02], [Z_XMO - 0.21, s * (hw + 0.03), zb - 0.02], 0.035);
      box(B.dark, -0.10, 0.12, s * 0.36, s * 0.46, -0.08, 0.10);                       /* trunnion lugs */
    }
    /* the cradle beam from the trunnion forward under the cross tubes */
    box(B.paint, -0.12, Z_XMO - 0.20, -0.12, 0.12, -0.04, 0.05);
    cylY(B.dark, 0, -0.50, 0.50, 0, 0.055, 10);
    box(B.team, 0.30, 0.80, -0.26, 0.26, zt + 0.002, zt + 0.018);
  }

  function buildBM14(THREE, C, R) {
    var T = materials(THREE, C, R.paint), g = new THREE.Group(), HB = bins(T, true);
    zis(HB);
    flush(THREE, g, HB);
    addWheels(THREE, g, T, ZS.AX, [ZS.TYF, ZS.TYR, ZS.TYR], ZS.R, ZS.W, 20, ZS.DUAL);
    var tur = new THREE.Group(), MB = bins(T, false), EB = bins(T, false), cells = [];
    zisMount(MB);
    flush(THREE, tur, MB);
    zisPack(EB, cells);
    tur.add(elevGroup(THREE, EB, Z_PVX, Z_PVZ, Z_EL, cells));
    tur.name = "turret";
    tur.position.set(Z_TX, 0, Z_TZ);
    g.add(tur);
    return g;
  }

  function build(key, THREE, M, C) {
    var R = ROWS[key] || ROWS.pact_e60_mlrs;
    var root = R.veh === "bm14" ? buildBM14(THREE, C, R) : buildBM21(THREE, C, R);
    root.name = key;
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build, rows: ROWS };
})();

/* len: the measured X extent of each build, tow hooks included (BM-14 7.01 m, BM-21 7.40 m); the packs lie inside the
   trucks' length on the march, and a raised pack is a pose of "podelev", not a second pose group */
(function () {
  var k, rows = HeroRuBm.rows;
  function reg(key, len) {
    UNIT_MODELS[key] = { len: len, build: function (THREE, M, C) { return HeroRuBm.build(key, THREE, M, C); } };
  }
  for (k in rows) if (Object.prototype.hasOwnProperty.call(rows, k)) reg(k, rows[k].veh === "bm14" ? 7.01 : 7.40);
})();
