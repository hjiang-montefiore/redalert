/* ===== us_pershing.js - HERO model: Pershing 1a and Pershing II erector-launchers =====
   Full-quality redo (2026-10-24).  Two keys, kept: nato_e60_tel "Pershing 1a" ("MGM-31A Pershing 1a, M790 erector-launcher",
   1969) and nato_e80_tel "Pershing II" ("MGM-31B Pershing II", 1983); both turret:false, deploy:true (deploySec 6).
   This file loads after js/tel3d.js (index.html), so its two UNIT_MODELS entries replace tel3d.js's generic ones.

   What the unit is: ONE articulated vehicle, the tractor towing the erector-launcher (EL) semitrailer with the round on it.
   The programmer test station and power station (Pershing 1a: on a separate M656 truck) and the warhead carrier are other
   vehicles and are not drawn.

   Sources (Wikimedia Commons at 960 px, U.S. Army photographs and drawings, public domain unless noted):
     [TM-RS]  "Pershing II launcher roadside.png" - TM line drawing of the M1003: gooseneck and the pallet under its covers at
              the front, the long flat frame, the tandem at the rear with the erector hinge and the big ring (item 11) over
              it, the jacks (items 14, 15), a box low on the side at the front (item 16).
     [SINS]   "Pershing 1a erector launcher (37474831374).jpg" (Auto- und Technikmuseum Sinsheim, CC BY-SA 2.0) - the M790 with
              its round: nose forward over the gooseneck, the round lying high between two box booms, the frame and the
              cradles under it, the open girder frame, two axles of single tyres at the rear, olive drab.
     [L76]    "Launch of Pershing IA (26 Oct 1976).png" - the M790 behind its M757 after a launch: booms back down, jacks
              down at the rear corners; the round olive drab in flight.
     [EL]     "Pershing II on EL 2.jpg" - a round standing upright at the rear of an EL in its booms with the crosshead.
     [P1A]    "Pershing 1A being launched.jpg" - upright, leaving the EL.
     [PII-F]  "Pershing II.jpg" (a test round in flight): the four big fins at the first stage's tail, four small ones at the
              second's, the long two-cone nose with the light radome tip.
     [P2MAN]  "Pershing2MAN.jpg" - a Pershing II of the 56th Field Artillery Command raised upright on its EL behind its MAN
              tractor, head-on: flat cab front, two big windscreens, slatted grille, heavy bumper, mirrors on arms, the
              spare wheel upright behind the cab on the right, the empty U cradle of the pallet at the front of the EL, a
              front jack down; the tractor in a three-colour disruptive pattern; the round dark with a light tip.
     Wikipedia "MGM-31 Pershing": the M790 EL "was a modified low-boy flat-bed trailer towed by a Ford M757 5-ton tractor";
       the booms "could erect the five ton missile from horizontal to vertical in nine seconds"; the warhead "was not mated
       during travel" (see below).  Wikipedia "Pershing II": the M790s were "modified into the Pershing II M1003 launchers";
       the GIEU "on the side of the launcher"; "the warhead and radar sections were carried as an assembly on a pallet that
       rotated to mate with the main missile"; "The U.S. units used the M983 HEMTT ... Tactical units in Germany used the
       M1001 MAN tractor with an Atlas Maschinen GmbH AK4300 M5 crane and a 30 kW generator".  Round: Pershing 1a 10.55 m,
       Pershing II 10.61 m (34.8 ft), both 1.02 m (40 in) across.
   No dimensioned drawing of the EL or of either tractor was found: the trailer, the tractors and the stage lengths are
   scaled against the round's published length and diameter in [SINS], [TM-RS], [P2MAN] and [PII-F].

   CORRECTED from the 10-02 file: the Pershing II's tractor is the MAN M1001 the tactical units in Germany used (the row is a
     fielded NATO-theatre unit, and [P2MAN] shows one), not the M983 HEMTT of the units at home; the round is drawn with
     poses (travel, set up, raised upright) instead of stowed only, since render3d now has them; the Pershing 1a round is
     drawn whole.  Kept: the M757 8x8 cab-over with its flat slab front, the M790/M1003 as one trailer with the tandem at the
     rear, the GIEU and the pallet on the Pershing II, plain olive drab on the 1a.
   NOT drawn as the text says: the Pershing 1a's warhead section rode in its own carrier and was mated on site; the round
     lives in "podelev", which is shown in every pose, so it is drawn mated throughout, as the museum display [SINS] has it.
     The Pershing II's re-entry assembly likewise lies mated to the round, over its pallet's cradles.

   Recognition list (where each rests; where it is in the code):
     1. A long low semitrailer with its tandem at the very rear and the gooseneck over the tractor [TM-RS][SINS]: addTrailer.
     2. The round lying high along the whole trailer, nose forward over the gooseneck, between two box booms [SINS]: addRound,
        addErector.
     3. The big ring round the round's tail over the tandem, the hinge cheeks under it [TM-RS][SINS]: addErector, addTrailer.
     4. Raised, the round stands upright at the rear of the trailer in its booms, the crosshead clamp high on it [EL][P1A]
        [P2MAN]: "podelev", el 90 degrees.
     5. The jacks: two at the front of the frame, two at the rear corners, down when set up [TM-RS][L76][P2MAN]: addDeploy.
     6. Pershing 1a: a two-stage round with four fins at each stage's tail and the long conical warhead section [SINS][EL].
     7. Pershing II: the big fins at the first stage, the small ones at the second, the long two-cone re-entry vehicle with
        the light radome tip [PII-F][P2MAN].
     8. Pershing 1a: the M757 cab-over 8x8, flat slab front, two big windscreen panes, vertical grille, deep bumper [TM757].
     9. Pershing II: the MAN M1001 8x8, two big round-cornered windscreens over a slatted grille, the heavy bumper, mirrors on
        arms, the spare wheel upright behind the cab, the crane behind it [P2MAN]: addM1001.
    10. Pershing II: the pallet's U cradles at the front of the trailer and the GIEU box on the side [TM-RS][P2MAN].
   ([TM757] is the TM drawing "M757 tractor" read for the 10-02 file; it was not re-fetched today.)

   Poses: "travelpose" holds the four jacks up; "deploypose" (shown once e.deployed) the jacks down on their foot plates
     [L76][P2MAN].  "podelev" is the booms, the ring, the crosshead and the round, hinged at x -10.00, z 1.95 (kingpin frame)
     over the rear axle, raised to userData.el = 90 degrees ("from horizontal to vertical", MGM-31 article; upright in [EL]
     [P1A][P2MAN]) while the launcher holds a target; userData.cells puts the motor's flash at the tail.  The real booms are
     raised by a hydraulic ram whose pivot is not published; it is not drawn (it could not extend with the booms).
     The real launcher does not traverse: the round goes up fore-and-aft and turns in flight, so turret:false loses nothing.
   Paint: Pershing 1a plain olive drab, as [SINS] and the 1976 colour photograph [L76] show it.  Samples off [SINS] came out
     blue-shifted (#405a66 on the lit round) and [L76] is a faded print (#4d3c32 on the trailer), so neither was used as a
     value: drawn #4a5235 (about 0.85 of Army olive drab, the 10-02 file's #4c5737 a touch darker) on a weathered canvas
     coat.  Pershing II: the three-colour disruptive pattern on the tractor in [P2MAN] (black and white, undated, 1983-91):
     drawn as the NATO three-colour green, brown and black (#434f30, #4d3f2c, #1f201b), the period's pattern for the
     theatre; whether a given launcher still wore MERDC is not known.  The rounds: [L76] olive green, [P2MAN] dark with a
     light tip; drawn #4b5338 and #3c4330, the Pershing II radome light grey.  No numbers, unit marks or national insignia.
   Team colour: C.team on the cab roof strip and the gooseneck's front edge.
   NOT drawn (not confirmed): the erection ram, cables and their reels, the warhead carrier, nets, the PII pallet's covers
     (the TM drawings show it both ways), cab interiors.
   Nodes: six "roadwheel" groups (one per axle), "podelev", "travelpose", "deploypose"; NOTHING named "turret".
   +X the tractor's bumper, +Y left (roadside), +Z up, metres, tyres on z = 0; built with the kingpin at x = 0 and moved so
   the length is centred.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsPershing = (function () {
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


  /* ------------------------------------------------------------ paint
     One canvas per row: the base coat, the pattern's patches drawn nine times so the 512 px tile repeats, then rain streaks
     and dust.  The painted bin carries metre UVs (0.34 a metre), so the tile spans about 2.9 m. */
  var _tex = {};
  function rnd(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function blob(q, R, x, y, r) {
    var pts = [], a, k, n = 9, rot = R() * Math.PI, c, s, ox, oy, i, px, py;
    for (k = 0; k < n; k++) { a = k / n * TAU; pts.push([Math.cos(a) * r * (0.6 + R() * 0.6) * 1.6, Math.sin(a) * r * (0.6 + R() * 0.6)]); }
    c = Math.cos(rot); s = Math.sin(rot);
    for (ox = -512; ox <= 512; ox += 512) for (oy = -512; oy <= 512; oy += 512) {
      q.beginPath();
      for (i = 0; i < n; i++) {
        px = x + ox + pts[i][0] * c - pts[i][1] * s; py = y + oy + pts[i][0] * s + pts[i][1] * c;
        if (i === 0) q.moveTo(px, py); else q.lineTo(px, py);
      }
      q.closePath(); q.fill();
    }
  }
  function paintTex(THREE, P) {
    if (_tex[P.key] !== undefined) return _tex[P.key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 512; cv.height = 512;
      var q = cv.getContext("2d"), R = rnd(P.seed), i, k;
      q.fillStyle = P.base; q.fillRect(0, 0, 512, 512);
      for (k = 0; k < P.pat.length; k++) {
        q.fillStyle = P.pat[k][0];
        for (i = 0; i < P.pat[k][1]; i++) blob(q, R, R() * 512, R() * 512, P.pat[k][2] * (0.7 + R() * 0.6));
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.06)" : "rgba(170,160,130,0.05)";
        q.fillRect(R() * 512, R() * 512, 1 + R() * 2, 30 + R() * 120);
      }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.05)" : "rgba(235,228,200,0.04)";
        q.fillRect(R() * 512, R() * 512, 4 + R() * 40, 3 + R() * 20);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.key] = t;
    return t;
  }
  function lin(n) {
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.92, metalness: 0.03 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.msl = new THREE.MeshStandardMaterial({ color: V.msl, roughness: 0.62, metalness: 0.12 });
    T.white = new THREE.MeshStandardMaterial({ color: 0xc9c7bd, roughness: 0.55, metalness: 0.05 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false),
             msl: new Bin(T.msl, false), white: new Bin(T.white, false) };
  }

  /* a lugged tyre on its dished wheel, centred at y = yc: radius R, width W; two lanes of lugs half a step apart */
  function tyre(bin, rim, R, W, yc) {
    var N = 22, h = W / 2, P = [[-h, R * 0.56, 0, 0], [-h, R * 0.86, 0, 0], [-h * 0.84, R * 0.97, 1, 0], [-h * 0.08, R, 1, 0],
                                [h * 0.08, R, 1, 1], [h * 0.84, R * 0.97, 1, 1], [h, R * 0.86, 0, 0], [h, R * 0.56, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = P.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = P[i][1];
      if (P[i][2] && ((j + P[i][3]) % 2)) r -= R * 0.055;
      a = j / N * TAU;
      V.push([r * Math.cos(a), yc + P[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + P[0][0], 0], [0, yc + P[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    k = yc > 0 ? 1 : -1;                                                     /* the outer face only */
    cyl(rim, [0, yc + k * (h - 0.01), 0], [0, yc + k * (h + 0.015), 0], R * 0.56, R * 0.50, 16, true, false);
    cylY(rim, 0, yc + k * h, yc + k * (h + 0.07), 0, R * 0.22, 10);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      cylY(rim, R * 0.34 * Math.cos(a), yc + k * (h + 0.01), yc + k * (h + 0.035), R * 0.34 * Math.sin(a), 0.026, 4);
    }
  }

  /* a rounded-top box section at x: half width hw, z0..z1, the top corners rounded r */
  function rring(x, hw, z0, z1, r) {
    var c = 0.2929;
    return [[x, -hw, z0], [x, hw, z0], [x, hw, z1 - r], [x, hw - r * c, z1 - r * c], [x, hw - r, z1],
            [x, -hw + r, z1], [x, -hw + r * c, z1 - r * c], [x, -hw, z1 - r]];
  }

  /* ================================================== the M757 tractor (Pershing 1a)
     Ford M757 5-ton 8x8 tractor, the tractor version of the Ford XM656 8x8 (MGM-31 Pershing article: "towed by a Ford M757
     5-ton tractor").  The U.S. Army TM line drawing "M757 tractor" [TM757] and [L76]: a cab-over-engine 8x8 with the four axles
     evenly spaced, a flat slab front with two big windscreen panes, a vertical-slat grille and a deep bumper plate.
     Axle spacing, tyre size and heights are estimated (no published figures were found). */
  var M757 = { AX: [4.10, 2.45, 0.80, -0.80], R: 0.58, W: 0.32, TY: 0.96 };
  function addM757(B) {
    var s, k, x, XF = 5.05, XC0 = 3.10, X1 = 5.30, Z0 = 1.30, ZR = 2.78, HW = 1.20, rings, P0, U, N, wl;
    rings = [rring(XF, HW, Z0, 2.02, 0.04), rring(XF - 0.10, HW, Z0, 2.62, 0.08), rring(XF - 0.20, HW, Z0, ZR, 0.12),
             rring(XC0, HW, Z0, ZR, 0.12)];
    loft(B.paint, rings, false);
    /* the windscreen: two big panes either side of the centre post on the slightly raked upper face [TM757][L76] */
    wl = Math.sqrt(0.10 * 0.10 + 0.60 * 0.60); U = [-0.10 / wl, 0, 0.60 / wl]; N = [0.60 / wl, 0, 0.10 / wl];
    P0 = [XF, 0, 2.02];
    planeBox(B.dark, P0, U, [0, 1, 0], N, 0.02, 0.58, -1.12, 1.12, -0.01, 0.02);
    for (s = -1; s <= 1; s += 2) planeBox(B.glass, P0, U, [0, 1, 0], N, 0.05, 0.55, s > 0 ? 0.05 : -1.08, s > 0 ? 1.08 : -0.05, 0.02, 0.035);
    /* the vertical-slat grille in the middle of the slab front, the lamps either side of it */
    box(B.dark, XF - 0.01, XF + 0.02, -0.55, 0.55, 1.42, 1.94);
    for (k = 0; k < 15; k++) box(B.paint, XF + 0.01, XF + 0.05, -0.52 + k * 0.074, -0.50 + k * 0.074, 1.44, 1.92);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, XF, XF + 0.06, s * 0.88, 1.66, 0.12, 14);
      cylX(B.glass, XF + 0.06, XF + 0.07, s * 0.88, 1.66, 0.09, 12);
      box(B.dark, XF, XF + 0.04, s * 0.62, s * 0.74, 1.88, 1.96);                                  /* marker lamps */
      /* doors: the frame, the window, the handle; the step under it; the mirror on its arm */
      x = s * HW;
      box(B.dark, 3.40, 4.60, x - (s > 0 ? 0 : 0.012), x + (s > 0 ? 0.012 : 0), 1.38, 2.62);
      box(B.paint, 3.43, 4.57, x - (s > 0 ? 0 : 0.02), x + (s > 0 ? 0.02 : 0), 1.41, 2.59);
      box(B.glass, 3.55, 4.50, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 2.08, 2.52);
      box(B.dark, 3.48, 3.58, x - (s > 0 ? 0 : 0.045), x + (s > 0 ? 0.045 : 0), 1.92, 1.96);
      box(B.dark, 3.60, 4.40, s * (HW - 0.10), s * (HW + 0.04), 0.86, 0.90);
      box(B.dark, 3.60, 4.40, s * (HW - 0.10), s * (HW + 0.04), 1.10, 1.14);
      bar(B.dark, [4.85, s * HW, 2.40], [5.05, s * (HW + 0.22), 2.50], 0.04);
      box(B.dark, 5.00, 5.06, s * (HW + 0.18), s * (HW + 0.30), 2.16, 2.56);
      /* the front wheel housing under the cab, open below Z0 */
      box(B.paint, 3.20, 4.95, s * (HW - 0.06), s * HW, 0.95, Z0);
      box(B.dark, 3.30, 4.90, s * 0.40, s * (HW - 0.06), Z0 - 0.04, Z0);
    }
    /* the deep bumper plate across the front, the tow shackles */
    profY(B.paint, [[XF - 0.05, 0.72], [X1, 0.80], [X1, 1.24], [XF - 0.05, 1.30]], -HW, HW);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X1, X1 + 0.06, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.90, 1.10);
      cylY(B.dark, X1 + 0.08, s * 0.55 - 0.05, s * 0.55 + 0.05, 1.00, 0.05, 8);
    }
    box(B.dark, X1, X1 + 0.012, -HW + 0.05, HW - 0.05, 1.20, 1.22);
    /* roof: the drip rail and a hatch; the team strip */
    box(B.dark, XF - 0.24, XF - 0.20, -HW + 0.10, HW - 0.10, ZR - 0.01, ZR + 0.02);
    box(B.paint, 3.55, 4.15, -0.35, 0.35, ZR, ZR + 0.06);
    box(B.team, 3.18, 3.48, -HW + 0.15, HW - 0.15, ZR, ZR + 0.02);
    /* the chassis behind the cab: frame rails, the fifth wheel on its plate over the tandem, fenders, tanks */
    box(B.dark, -1.55, XF - 0.10, -0.48, 0.48, 0.82, 1.14);
    box(B.paint, -0.62, 0.62, -0.62, 0.62, 1.14, 1.32);
    box(B.dark, -0.55, 0.55, -0.55, 0.55, 1.32, 1.42);
    box(B.dark, -0.70, -0.30, -0.12, 0.12, 1.30, 1.40);                                               /* the throat */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.50, 1.48, s * 0.70, s * 1.22, 1.22, 1.27);                                        /* rear fenders */
      box(B.paint, -1.50, 1.48, s * 1.17, s * 1.22, 1.05, 1.22);
      box(B.paint, 1.86, XC0, s * 0.70, s * 1.22, 1.22, 1.27);                                          /* over axle 2 */
      cylX(B.paint, 1.40, 1.86, s * 0.86, 0.98, 0.21, 12);                                             /* tanks between axles */
      for (k = 0; k < 2; k++) box(B.dark, 1.48 + k * 0.28, 1.52 + k * 0.28, s * 0.62, s * 1.09, 0.76, 1.20);
      box(B.dark, -1.62, -1.52, s * 0.50, s * 1.18, 0.40, 1.20);                                        /* mud flaps */
      box(B.glass, -1.58, -1.55, s * 0.95 - 0.08, s * 0.95 + 0.08, 1.12, 1.20);                         /* tail lamps */
      /* the air and electrical lines coiled behind the cab */
      cylY(B.dark, XC0 - 0.20, s * 0.30, s * 0.42, 1.60, 0.16, 10);
    }
    box(B.dark, XC0 - 0.40, XC0 - 0.05, -0.50, 0.50, 1.14, 1.70);
    for (k = 0; k < 4; k++) box(B.dark, M757.AX[k] - 0.20, M757.AX[k] + 0.20, -0.30, 0.30, 0.45, 0.82);
  }

  /* ================================================== the M1001 MAN tractor (Pershing II)
     MAN 8x8, the M1001 of the Pershing II battalions in Germany (Pershing II article: "Tactical units in Germany used the
     M1001 MAN tractor with an Atlas Maschinen GmbH AK4300 M5 crane and a 30 kW generator").  [P2MAN] (head-on, raised): the
     flat cab front with two big round-cornered windscreens and wipers, the slatted grille in the middle under them, the deep
     bumper with its shackles and the lamps at its ends, the big mirrors on arms, the spare wheel upright behind the cab on the
     right, the crane and its box behind the cab; 8x8 with the front pair close together.
     Axle spacing, tyre size and heights are estimated from [P2MAN] (no published figures were found). */
  var M1001 = { AX: [5.30, 3.75, 0.85, -0.65], R: 0.62, W: 0.37, TY: 1.02 };
  function addM1001(B) {
    var s, k, x, XF = 6.25, XC0 = 4.20, X1 = 6.48, Z0 = 1.42, ZR = 3.08, HW = 1.25, rings, P0, U, N, wl;
    rings = [rring(XF, HW, Z0, 2.26, 0.04), rring(XF - 0.05, HW, Z0, 2.98, 0.10), rring(XF - 0.14, HW, Z0, ZR, 0.16),
             rring(XC0, HW, Z0, ZR, 0.16)];
    loft(B.paint, rings, false);
    wl = Math.sqrt(0.05 * 0.05 + 0.72 * 0.72); U = [-0.05 / wl, 0, 0.72 / wl]; N = [0.72 / wl, 0, 0.05 / wl];
    P0 = [XF, 0, 2.26];
    /* two big windscreens, round-cornered, either side of the centre post; a wiper on each [P2MAN] */
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.dark, P0, U, [0, 1, 0], N, 0.02, 0.70, s > 0 ? 0.04 : -1.18, s > 0 ? 1.18 : -0.04, -0.01, 0.02);
      planeBox(B.glass, P0, U, [0, 1, 0], N, 0.06, 0.66, s > 0 ? 0.08 : -1.14, s > 0 ? 1.14 : -0.08, 0.02, 0.035);
      bar(B.dark, [XF + 0.04, s * 0.30, 2.34], [XF + 0.035, s * 0.62, 2.62], 0.025);
    }
    /* the grille: a frame with horizontal slats in the middle, a smaller slatted panel on the left, the lamp row below */
    box(B.dark, XF - 0.01, XF + 0.03, -0.62, 0.48, 1.70, 2.14);
    for (k = 0; k < 9; k++) box(B.paint, XF + 0.02, XF + 0.05, -0.58, 0.44, 1.73 + k * 0.045, 1.75 + k * 0.045);
    box(B.dark, XF - 0.01, XF + 0.03, 0.60, 1.08, 1.62, 1.78);
    for (k = 0; k < 4; k++) box(B.paint, XF + 0.02, XF + 0.05, 0.62, 1.06, 1.64 + k * 0.035, 1.655 + k * 0.035);
    for (k = 0; k < 5; k++) box(B.dark, XF, XF + 0.03, -0.55 + k * 0.22, -0.40 + k * 0.22, 1.50, 1.60);
    for (s = -1; s <= 1; s += 2) {
      x = s * HW;
      /* the door: frame, window, handle; the steps; the big mirror on its arm off the front corner [P2MAN] */
      box(B.dark, 4.45, 5.75, x - (s > 0 ? 0 : 0.012), x + (s > 0 ? 0.012 : 0), 1.48, 2.96);
      box(B.paint, 4.48, 5.72, x - (s > 0 ? 0 : 0.02), x + (s > 0 ? 0.02 : 0), 1.51, 2.93);
      box(B.glass, 4.62, 5.62, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 2.30, 2.84);
      box(B.dark, 4.55, 4.66, x - (s > 0 ? 0 : 0.045), x + (s > 0 ? 0.045 : 0), 2.12, 2.16);
      for (k = 0; k < 2; k++) box(B.dark, 4.60, 5.60, s * (HW - 0.12), s * (HW + 0.03), [0.95, 1.20][k], [0.99, 1.24][k]);
      bar(B.dark, [6.05, s * HW, 2.75], [6.20, s * (HW + 0.30), 2.85], 0.04);
      bar(B.dark, [6.05, s * HW, 2.30], [6.20, s * (HW + 0.30), 2.40], 0.04);
      box(B.dark, 6.16, 6.24, s * (HW + 0.24), s * (HW + 0.38), 2.30, 2.86);
      /* the front wheel housings, open below the cab */
      box(B.paint, 4.40, 6.10, s * (HW - 0.06), s * HW, 1.08, Z0);
      box(B.dark, 4.50, 6.05, s * 0.45, s * (HW - 0.06), Z0 - 0.04, Z0);
      /* the lamp boxes at the bumper ends [P2MAN] */
      box(B.dark, XF + 0.02, X1 + 0.02, s * 0.98, s * 1.22, 1.30, 1.48);
      cylX(B.glass, X1 + 0.02, X1 + 0.03, s * 1.10, 1.39, 0.07, 10);
    }
    /* the bumper: a heavy beam the full width, the plate below, the tow shackles and the jaw [P2MAN] */
    profY(B.paint, [[XF - 0.05, 0.86], [X1, 0.94], [X1, 1.30], [XF - 0.05, 1.32]], -HW, HW);
    box(B.dark, X1 - 0.02, X1 + 0.012, -HW + 0.05, HW - 0.05, 1.18, 1.20);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X1, X1 + 0.07, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.98, 1.20);
      cylY(B.dark, X1 + 0.10, s * 0.62 - 0.05, s * 0.62 + 0.05, 1.06, 0.06, 8);
    }
    box(B.dark, X1, X1 + 0.08, -0.14, 0.14, 1.00, 1.16);
    /* roof: the drip rail; the team strip */
    box(B.dark, XF - 0.20, XF - 0.16, -HW + 0.10, HW - 0.10, ZR - 0.01, ZR + 0.02);
    box(B.team, 4.30, 4.70, -HW + 0.15, HW - 0.15, ZR, ZR + 0.02);
    /* behind the cab: the spare wheel upright on the right [P2MAN] */
    cylY(B.dark, 3.75, -1.25, -0.88, 2.40, 0.60, 18);
    cylY(B.paint, 3.75, -1.27, -1.25, 2.40, 0.34, 14);
    box(B.dark, 3.55, 3.95, -0.88, -0.70, 2.15, 2.65);
    /* the crane: its pedestal, the slewing column and the knuckle boom folded forward; the 30 kW generator box on the left;
       (Pershing II article: Atlas AK4300 M5 crane and 30 kW generator; the layout behind the cab is estimated) */
    cylZ(B.paint, 3.35, 0.0, 1.30, 2.30, 0.28, 14);
    box(B.paint, 3.05, 3.65, -0.40, 0.40, 1.20, 1.45);
    box(B.paint, 3.20, 3.55, -0.18, 0.18, 2.30, 3.05);
    box(B.paint, 3.30, 4.05, -0.14, 0.14, 2.82, 3.02);
    box(B.paint, 3.00, 3.95, -0.12, 0.12, 2.56, 2.76);
    cylY(B.dark, 3.40, -0.22, 0.22, 2.90, 0.09, 10);
    bar(B.dark, [3.42, 0, 2.40], [3.90, 0, 2.86], 0.08);
    box(B.paint, 2.15, 2.95, 0.35, 1.18, 1.32, 2.20);
    for (k = 0; k < 5; k++) box(B.dark, 2.25 + k * 0.14, 2.30 + k * 0.14, 1.18, 1.20, 1.55, 2.05);
    box(B.dark, 2.10, 3.00, 0.33, 1.20, 2.20, 2.24);
    /* the chassis: frame rails, the fifth wheel over the tandem, fenders, the tanks and the boxes between the axles */
    box(B.dark, -1.45, XF - 0.10, -0.48, 0.48, 0.92, 1.22);
    box(B.paint, -0.62, 0.62, -0.62, 0.62, 1.22, 1.34);
    box(B.dark, -0.55, 0.55, -0.55, 0.55, 1.34, 1.42);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.40, 1.55, s * 0.70, s * 1.24, 1.30, 1.35);
      box(B.paint, -1.40, 1.55, s * 1.19, s * 1.24, 1.12, 1.30);
      box(B.paint, 3.05, 4.40, s * 0.70, s * 1.24, 1.30, 1.35);
      cylX(B.paint, 1.60, 3.00, s * 0.90, 1.02, 0.26, 14);                                              /* tanks */
      for (k = 0; k < 2; k++) box(B.dark, 1.75 + k * 0.95, 1.80 + k * 0.95, s * 0.62, s * 1.18, 0.74, 1.30);
      box(B.dark, -1.52, -1.42, s * 0.50, s * 1.20, 0.42, 1.28);
      box(B.glass, -1.48, -1.45, s * 0.98 - 0.08, s * 0.98 + 0.08, 1.18, 1.26);
    }
    for (k = 0; k < 4; k++) box(B.dark, M1001.AX[k] - 0.22, M1001.AX[k] + 0.22, -0.32, 0.32, 0.46, 0.92);
  }

  /* ================================================== the erector-launcher semitrailer
     M790 (Pershing 1a) and M1003 (the M790 rebuilt for the Pershing II under SALT II, Pershing II article).  Kingpin at x = 0.
     [TM-RS] "Pershing II launcher roadside" (TM line drawing): the gooseneck at the front, the long flat frame, the TANDEM at
     the rear with the erector's hinge and its big ring over it, the jacks; the pallet under its covers at the front (Pershing
     II).  [SINS] (the M790 at Sinsheim): the round lying high in the erector between two box booms, the nose forward over the
     gooseneck, open girder frame with walkways, two axles of single tyres at the rear.  [L76] the M790 after a launch, the
     booms back down and the four jacks down on the ground.  The lengths and heights are estimated against the round. */
  var XT = -10.05, ZDK = 1.30, ZGN = 1.78;                    /* trailer tail, main deck top, gooseneck top */
  var TRL = { AX: [-8.05, -9.30], R: 0.55, W: 0.36, TY: 0.94 };
  var XH = -10.00, ZH = 1.95, MZ = 0.45, MT = -0.40;          /* the erector hinge; the round's axis over it, its tail behind */
  var JF = -1.45, JR = -9.95, JY = 1.30;                      /* the jacks */
  function addTrailer(B, V) {
    var s, k, x;
    /* the gooseneck: a solid deck over the fifth wheel, its front face and the kingpin plate */
    box(B.paint, -1.80, 0.95, -1.20, 1.20, 1.46, ZGN);
    for (k = 0; k < 3; k++) box(B.dark, -1.60 + k * 0.85, -1.58 + k * 0.85, -1.18, 1.18, ZGN, ZGN + 0.01);
    box(B.dark, -0.30, 0.30, -0.30, 0.30, 1.42, 1.46);
    for (k = 0; k < 3; k++) box(B.dark, 0.955, 0.97, -1.10 + k * 1.0, -0.90 + k * 1.0, 1.52, 1.70);
    box(B.team, 0.955, 0.965, -1.15, 1.15, 1.72, 1.76);
    /* the drop from the gooseneck to the main frame */
    for (s = -1; s <= 1; s += 2) profY(B.paint, [[-1.80, 1.46], [-1.80, ZGN], [-2.60, ZDK], [-2.60, 0.85], [-2.20, 0.85]], s * 0.36, s * 0.56);
    box(B.paint, -2.60, -1.80, -1.20, 1.20, ZDK - 0.05, ZDK);
    /* the main frame: two deep girders, the side rails, cross members, the walkway gratings along each side [SINS] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XT + 0.10, -2.40, s * 0.36, s * 0.56, 0.85, ZDK);
      box(B.dark, XT + 0.10, -2.40, s * 0.30, s * 0.62, ZDK - 0.03, ZDK);
      box(B.paint, XT, -2.60, s * 1.14, s * 1.22, 1.08, ZDK);
      box(B.dark, XT + 0.05, -2.65, s * 0.80, s * 1.14, ZDK - 0.025, ZDK - 0.005);
      for (k = 0; k < 24; k++) box(B.paint, -2.75 - k * 0.30, -2.72 - k * 0.30, s * 0.82, s * 1.12, ZDK - 0.02, ZDK);
    }
    for (k = 0; k < 8; k++) { x = -2.90 - k * 0.95; if (x < XT + 0.2) break; box(B.paint, x - 0.06, x + 0.06, -1.14, 1.14, 1.10, ZDK - 0.02); }
    box(B.paint, XT, XT + 0.14, -1.22, 1.22, 0.92, ZDK);                                               /* the rear beam */
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, XT - 0.02, XT, s * 1.02 - 0.08, s * 1.02 + 0.08, 1.04, 1.14);
      box(B.dark, XT - 0.02, XT, s * 0.70 - 0.08, s * 0.70 + 0.08, 1.04, 1.14);
      /* the tandem's spring hangers and the fenders over it */
      for (k = 0; k < 2; k++) box(B.dark, TRL.AX[k] - 0.10, TRL.AX[k] + 0.10, s * 0.40, s * 0.62, 0.55, 0.85);
      box(B.dark, TRL.AX[1] - 0.60, TRL.AX[0] + 0.60, s * 0.45, s * 0.55, 0.62, 0.70);
      /* the erector's hinge cheeks over the tandem [TM-RS][SINS] */
      profY(B.paint, [[XH - 0.32, ZDK], [XH + 0.70, ZDK], [XH + 0.22, ZH + 0.16], [XH - 0.22, ZH + 0.16]], s * 0.82, s * 0.94);
      cylY(B.dark, XH, s * 0.80, s * 1.00, ZH, 0.13, 12);
      /* the boom rests on the frame, where the booms lie on the march [SINS] */
      for (k = 0; k < 2; k++) {
        x = [-3.05, -6.70][k];
        box(B.paint, x - 0.14, x + 0.14, s * 0.62, s * 0.80, ZDK, ZH + MZ - 0.22);
        box(B.dark, x - 0.18, x + 0.18, s * 0.60, s * 0.82, ZH + MZ - 0.24, ZH + MZ - 0.20);
      }
      /* the jack housings: two at the front of the frame, two at the rear corners [TM-RS][L76][P2MAN] */
      cylZ(B.paint, JF, s * JY, 1.20, ZGN, 0.11, 12);
      box(B.paint, JF - 0.10, JF + 0.10, s * 1.18, s * 1.22, 1.40, 1.70);
      cylZ(B.paint, JR, s * JY, 0.92, 1.42, 0.11, 12);
      box(B.paint, JR - 0.10, JR + 0.10, s * 1.18, s * 1.22, 1.00, 1.28);
      cylZ(B.dark, JF, s * JY, ZGN, ZGN + 0.05, 0.13, 12);
      cylZ(B.dark, JR, s * JY, 1.42, 1.47, 0.13, 12);
    }
    for (k = 0; k < 2; k++) cylY(B.dark, TRL.AX[k], -0.80, 0.80, TRL.R, 0.09, 8);
    /* the hydraulic power unit and the cable boxes on the frame ahead of the hinge [SINS]: drawn as two boxes */
    box(B.paint, -8.70, -7.55, -0.56, 0.56, 0.78, ZDK - 0.02);
    box(B.dark, -8.62, -7.62, -0.57, 0.57, 0.92, 1.18);
    if (V.gieu) {
      /* Pershing II: the GIEU (ground integrated electronics unit, the launch control assembly) on the side of the
         launcher (Pershing II article; [TM-RS] item 16), and the pallet the re-entry assembly rides on, at the front
         ([TM-RS]; [P2MAN]: the empty U cradle standing at the front once the round is up) */
      box(B.paint, -2.05, -1.05, 0.62, 1.18, ZGN, ZGN + 0.62);
      box(B.dark, -2.00, -1.10, 1.18, 1.19, ZGN + 0.08, ZGN + 0.56);
      for (k = 0; k < 4; k++) box(B.dark, -1.95 + k * 0.22, -1.88 + k * 0.22, 1.19, 1.20, ZGN + 0.12, ZGN + 0.52);
      box(B.paint, -1.30, 0.80, -0.50, 0.50, ZGN, ZGN + 0.10);
      for (k = 0; k < 2; k++) {
        x = [-0.95, 0.30][k];
        for (s = -1; s <= 1; s += 2) {
          box(B.paint, x - 0.07, x + 0.07, s * 0.40, s * 0.52, ZGN + 0.10, ZH + MZ - 0.30);
          bar(B.paint, [x, s * 0.46, ZH + MZ - 0.32], [x, s * 0.20, ZH + MZ - [0.46, 0.36][k]], 0.10);
        }
        box(B.paint, x - 0.07, x + 0.07, -0.22, 0.22, ZH + MZ - [0.52, 0.42][k], ZH + MZ - [0.44, 0.34][k]);
      }
    } else {
      /* Pershing 1a: the box on the curb side of the gooseneck [SINS] */
      box(B.paint, -1.70, -0.90, -1.18, -0.70, ZGN, ZGN + 0.55);
      box(B.dark, -1.65, -0.95, -1.19, -1.18, ZGN + 0.06, ZGN + 0.49);
    }
  }

  /* ================================================== the round and the erector (the "podelev" group)
     Frame: the hinge; x along the booms, the round's axis at z = MZ, its tail at x = MT.
     MGM-31A Pershing 1a: 10.55 m, 1.02 m (40 in) across (MGM-31 Pershing article); two stages each with four fins at the tail,
       the guidance section and the long conical warhead section [SINS][L76][EL].
     MGM-31B Pershing II: 10.61 m (34.8 ft), 1.02 m across (Pershing II article); four fins at the first stage's tail, four
       small ones at the second's [PII-F][P2MAN], the guidance and control section, then the long re-entry vehicle with its
       radar section in two cones to the light radome tip [PII-F][P2MAN].
     Stage lengths are estimated off [PII-F] and [SINS] against the published length.  The fins are drawn in an X, as [SINS]
     shows the rear ones lying on the march. */
  function addRound(B, V) {
    var i, k, a, ca, sa, q, hh, pts, Vt, t0 = MT, P = V.prof, F = V.fins, fi, f;
    var prof = [];
    for (i = 0; i < P.length; i++) prof.push([t0 + P[i][0], P[i][1]]);
    revolve(B.msl, prof, 0, MZ, 28);
    if (V.tip) revolve(B.white, [[t0 + V.tip[0], V.tip[1]], [t0 + V.tip[0] + 0.25, V.tip[1] * 0.62], [t0 + V.L - 0.08, 0.04], [t0 + V.L, 0.0]], 0, MZ, 20);
    for (i = 0; i < V.joints.length; i++)
      revolve(B.dark, [[t0 + V.joints[i] - 0.025, 0.517], [t0 + V.joints[i] + 0.025, 0.517]], 0, MZ, 24);
    cyl(B.dark, [t0 - 0.03, 0, MZ], [t0 + 0.04, 0, MZ], 0.30, 0.36, 16);                          /* the nozzle exit */
    for (fi = 0; fi < F.length; fi++) {
      f = F[fi];
      for (i = 0; i < 4; i++) {
        a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a);
        pts = [[t0 + f[0], 0.49], [t0 + f[1], 0.49], [t0 + f[3], f[4]], [t0 + f[2], f[4]]]; Vt = [];
        for (k = 0; k < 8; k++) {
          q = pts[k % 4]; hh = k < 4 ? -0.025 : 0.025;
          Vt.push([q[0], q[1] * ca - hh * sa, MZ + q[1] * sa + hh * ca]);
        }
        hexa(B.msl, Vt);
      }
    }
  }
  function addErector(B, V) {
    var s, i, k, x, a0, a1, n = 8, RY = 0.70, ZB0 = MZ - 0.20, ZB1 = MZ + 0.16, XB = V.boom;
    for (s = -1; s <= 1; s += 2) {
      /* the box booms beside the round [SINS][TM-RS] */
      box(B.paint, -0.30, XB, s * (RY - 0.09), s * (RY + 0.09), ZB0, ZB1);
      box(B.dark, -0.20, XB - 0.10, s * (RY + 0.09), s * (RY + 0.10), ZB0 + 0.07, ZB1 - 0.07);
      /* the foot: cheeks from the hinge pin up to the booms */
      profY(B.paint, [[-0.28, -0.12], [0.30, -0.16], [0.95, ZB0], [0.95, ZB1], [-0.10, ZB1]], s * (RY - 0.08), s * (RY + 0.08));
    }
    cylY(B.dark, 0, -0.98, 0.98, 0, 0.10, 12);
    /* the cradles under the round and the straps over it, at three stations along the booms [SINS] */
    for (i = 0; i < 3; i++) {
      x = [0.90, V.boom * 0.48, V.boom - 0.60][i];
      for (k = 0; k < n; k++) {
        a0 = Math.PI * 1.05 + k / n * Math.PI * 0.90; a1 = Math.PI * 1.05 + (k + 1) / n * Math.PI * 0.90;
        bar(B.paint, [x, 0.58 * Math.cos(a0), MZ + 0.58 * Math.sin(a0)], [x, 0.58 * Math.cos(a1), MZ + 0.58 * Math.sin(a1)], 0.12);
      }
      for (s = -1; s <= 1; s += 2) box(B.paint, x - 0.07, x + 0.07, s * 0.52, s * (RY - 0.09), MZ - 0.30, MZ + 0.05);
      if (i > 0) for (k = 0; k < n; k++) {
        a0 = Math.PI * 0.05 + k / n * Math.PI * 0.90; a1 = Math.PI * 0.05 + (k + 1) / n * Math.PI * 0.90;
        bar(B.dark, [x, 0.535 * Math.cos(a0), MZ + 0.535 * Math.sin(a0)], [x, 0.535 * Math.cos(a1), MZ + 0.535 * Math.sin(a1)], 0.05);
      }
    }
    /* the crosshead at the booms' front ends: the frame across over the round and its clamp [EL][SINS] */
    x = XB - 0.15;
    box(B.paint, x - 0.15, x + 0.15, -RY - 0.09, RY + 0.09, MZ + 0.56, MZ + 0.72);
    for (s = -1; s <= 1; s += 2) box(B.paint, x - 0.15, x + 0.15, s * (RY - 0.09), s * (RY + 0.09), ZB1, MZ + 0.72);
    box(B.dark, x - 0.10, x + 0.10, -0.25, 0.25, MZ + 0.52, MZ + 0.56);
    /* the clamp gear boxed outboard of the crosshead, hanging below the booms [SINS] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, x - 0.60, x + 0.12, s * (RY + 0.09), s * (RY + 0.32), ZB0 - 0.50, ZB1 + 0.08);
      box(B.dark, x - 0.56, x + 0.08, s * (RY + 0.32), s * (RY + 0.33), ZB0 - 0.44, ZB1 + 0.02);
      for (k = 0; k < 3; k++) box(B.dark, x - 0.50 + k * 0.20, x - 0.44 + k * 0.20, s * (RY + 0.33), s * (RY + 0.35), ZB0 - 0.30, ZB1 - 0.10);
    }
    /* the big ring round the tail [TM-RS item 11][SINS], four spokes out to the booms' feet */
    revolve(B.paint, [[MT + 0.02, 0.60], [MT + 0.02, 0.80], [MT + 0.20, 0.80], [MT + 0.20, 0.60]], 0, MZ, 24);
    for (k = 0; k < 4; k++) {
      a0 = Math.PI / 4 + k * Math.PI / 2;
      bar(B.dark, [MT + 0.11, 0.80 * Math.cos(a0), MZ + 0.80 * Math.sin(a0)],
                  [0.40, (RY - 0.05) * (Math.cos(a0) > 0 ? 1 : -1), MZ + (Math.sin(a0) > 0 ? 0.10 : -0.18)], 0.07);
    }
  }

  /* travel: the jacks up, their feet tucked under the housings */
  function addTravel(B) {
    var s, k, x;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      x = k ? JR : JF;
      cylZ(B.dark, x, s * JY, k ? 0.70 : 1.00, k ? 0.92 : 1.20, 0.07, 8);
      cyl(B.dark, [x, s * JY, k ? 0.64 : 0.94], [x, s * JY, k ? 0.70 : 1.00], 0.20, 0.18, 14);
    }
  }
  /* set up: the four jacks down on their foot plates [L76][P2MAN] */
  function addDeploy(B) {
    var s, k, x;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      x = k ? JR : JF;
      cylZ(B.dark, x, s * JY, 0.06, k ? 0.92 : 1.20, 0.07, 8);
      cyl(B.dark, [x, s * JY, 0.0], [x, s * JY, 0.06], 0.26, 0.24, 16);
    }
  }

  function axleGroup(THREE, T, W, x, rimCol) {
    var TB = new Bin(T.tyre, false), RB = new Bin(T.tyre, false), col = [], i, geo, g, cr = lin(0x1c1d1f), cw = lin(rimCol);
    tyre(TB, RB, W.R, W.W, W.TY);
    tyre(TB, RB, W.R, W.W, -W.TY);
    for (i = 0; i < TB.P.length / 3; i++) col.push(cr[0], cr[1], cr[2]);
    for (i = 0; i < RB.P.length / 3; i++) col.push(cw[0], cw[1], cw[2]);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P.concat(RB.P)), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N.concat(RB.N)), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(col), 3));
    g = new THREE.Group();
    g.name = "roadwheel";
    g.position.set(x, 0, W.R);
    g.add(new THREE.Mesh(geo, T.tyre));
    return g;
  }

  function build(THREE, C, V) {
    var T = materials(THREE, C, V), g = new THREE.Group(), HB = bins(T), i, E, EB, TR, DP, trg, dpg, W = V.tractor === "m757" ? M757 : M1001;
    if (V.tractor === "m757") addM757(HB); else addM1001(HB);
    addTrailer(HB, V);
    flush(THREE, g, { paint: HB.paint, dark: HB.dark, glass: HB.glass, team: HB.team });
    for (i = 0; i < 4; i++) g.add(axleGroup(THREE, T, W, W.AX[i], V.rim));
    for (i = 0; i < 2; i++) g.add(axleGroup(THREE, T, TRL, TRL.AX[i], V.rim));
    TR = bins(T); addTravel(TR);
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { dark: TR.dark });
    g.add(trg);
    DP = bins(T); addDeploy(DP);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { dark: DP.dark });
    g.add(dpg);
    EB = bins(T);
    addRound(EB, V);
    addErector(EB, V);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(XH, 0, ZH);
    flush(THREE, E, { paint: EB.paint, dark: EB.dark, msl: EB.msl, white: EB.white });
    E.userData.el = Math.PI / 2;                       /* upright: "from horizontal to vertical in nine seconds" */
    E.userData.cells = [[MT + 1.40, 0, MZ, MT - 0.30]];
    g.add(E);
    /* centre the convoy's length on the origin */
    for (i = 0; i < g.children.length; i++) g.children[i].position.x += V.ox;
    g.name = V.name;
    return g;
  }

  return { build: build };
})();

/* The two launchers share one trailer (the M1003 is a rebuilt M790) and differ in the tractor, the round, the GIEU and
   pallet, and the paint.  len is the measured X extent over both poses: the tractor's bumper shackles to the round's
   nozzle on the march (the raised round is not part of the template's measure). */
(function () {
  var VARS = {
    nato_e60_tel: {
      name: "pershing_1a_m790", tractor: "m757", gieu: false, ox: 2.50, len: 15.86,
      paint: { key: "pershing_od", base: "#4a5235", pat: [["#525a3c", 9, 55], ["#40472e", 9, 45]], seed: 6919 },
      msl: 0x4b5338, rim: 0x3f4630, L: 10.55, boom: 7.20, tip: null,
      prof: [[0, 0.34], [0.04, 0.46], [0.10, 0.51], [7.60, 0.51], [8.10, 0.475], [8.70, 0.405], [9.30, 0.315], [9.90, 0.20],
             [10.30, 0.10], [10.48, 0.035], [10.55, 0]],
      joints: [3.95, 6.85, 7.60],
      fins: [[0.06, 1.20, 0.12, 0.52, 1.02], [3.98, 4.95, 4.04, 4.24, 0.98]]
    },
    nato_e80_tel: {
      name: "pershing_ii_m1003", tractor: "m1001", gieu: true, ox: 1.89, len: 17.07,
      paint: { key: "pershing_nato", base: "#434f30", pat: [["#4d3f2c", 8, 80], ["#1f201b", 7, 55]], seed: 19841 },
      msl: 0x3c4330, rim: 0x3a4230, L: 10.61, boom: 7.20, tip: [9.95, 0.225],
      prof: [[0, 0.34], [0.04, 0.46], [0.10, 0.51], [7.30, 0.51], [7.60, 0.495], [8.40, 0.44], [9.20, 0.36], [9.30, 0.335],
             [9.95, 0.225]],
      joints: [3.85, 6.75, 7.30],
      fins: [[0.06, 1.15, 0.12, 0.55, 1.00], [3.88, 4.40, 3.92, 4.08, 0.78]]
    }
  };
  Object.keys(VARS).forEach(function (k) {
    UNIT_MODELS[k] = { len: VARS[k].len, build: function (THREE, M, C) { return HeroUsPershing.build(THREE, C, VARS[k]); } };
  });
})();
