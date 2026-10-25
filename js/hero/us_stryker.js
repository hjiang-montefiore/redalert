/* ===== us_stryker.js - HERO models: the Stryker 8x8 family =====
   Full-quality redo (owner 2026-10-24, US ground forces).  Four rules.js / eras.js keys, three vehicles, each row
   drawn as its own variant and period:
     nato_e00_lighttank  "Stryker MGS"   2000s-10s     M1128 Mobile Gun System, Iraq / Afghanistan fit: slat cage
     lt_n                "Stryker MGS"   present day   M1128 without the slat cage, as photograph C
     atgmv_n             "Stryker ATGM"  2000s on      M1134 ATGM Vehicle, the elevating twin TOW launcher, slat cage
     spaag_n             "M-SHORAD"      present day   Stryker A1 (double-V hull) M-SHORAD Increment 1
   (facts.js and armour_specs.js still describe spaag_n as the Gepard 1A2; rules.js names it the Stryker A1
   IM-SHORAD, which is what is drawn - a data mismatch to report, not changed here.)

   Published figures: en.wikipedia "Stryker" infobox: 6.95 x 2.72 m, height 2.64 m (over the ICV's weapon station),
     ICV 16.47 t, MGS 18.77 t; "M1128 mobile gun system": 6.95 x 2.72 m, height over 2.64 m, ground clearance 38 cm,
     M68A2 105 mm with fume extractor and autoloader, M240C coaxial, two M6 smoke grenade launchers, never built on
     the double-V hull, retired 2022.  "Stryker" (M-SHORAD): Leonardo DRS / Moog RIwP turret, 30 mm M230LF (XM914)
     with the 7.62 mm coax, one four-round Stinger pod or two Longbow Hellfire on either side; DVH Strykers have a
     new hull, wider tyres and a height management system.
   Kept from the old header and confirmed: the 6.95 / 2.72 m figures, MGS never on the DVH, slat on the Iraq-era
     vehicles and none on the M-SHORAD.  Corrected: the axle stations (the old 1.10 / -0.02 / -1.28 / -2.40 put the
     front axle 2.4 m behind the nose; drawing A puts the axles 1.57 / 2.81 / 4.21 / 5.43 m behind it); the nose (a
     raked lower plate and a long upper glacis rising to the roof, not a short vertical face); the MGS turret (the
     low plinth, the gun cradle and the long autoloader housing standing clear of it); the M1134 launcher (sight in
     the middle, both TOW tubes side by side on its left, photograph D); slat no longer on the present-day MGS.

   References (Wikimedia Commons, cached in the scratchpad q_stryker_ref):
     A "M1128 STRYKER MGS.png"    recognition side drawing, port side (scaled to the published 6.95 m: 85.9 px/m)
     B "M1134 STRYKER ATGM.png"   recognition side drawing, launcher raised (86.5 px/m)
     C "M1128 Stryker MGS.jpg"    M1128 front-left three-quarters, green, no slat (undated on Commons; European
                                  woodland)
     D "Stryker M1134 ATGM.jpg"   M1134 port side in Iraq, June 2007: green CARC, slat cage, launcher raised and
                                  trained to port
     E "M-SHORAD Stryker 2023 Oberdachstetten Range.jpg"  5-4 ADA, 26 Apr 2023, front right: Stinger pod right,
                                  Hellfire rails left, the XM914, the round housings, corner radars, side grille
     F "M-SHORAD Stryker.jpg"     Fort Belvoir, 15 Jun 2024, front left, pods raised
     G "M1128 Hutal Afghanistan-20100121.jpg"  M1128 firing, Afghanistan Jan 2010: green, slat cage all round
     H "Looking down on a Mobile Gun System - 071102-A-3843C-061.jpg"  M1128 from above, Tarmiyah, Iraq, Nov 2007:
                                  the slat cage round the whole hull
   Paint by period: every dated photograph of these variants found (Iraq 2007 D and H, Afghanistan 2010 G, C,
     the A1 in 2023 / 2024 E and F) shows green CARC, none tan, so all four rows are green: sampled off E and F at
     about (120,128,99) in sun and taken to about 0.7 (#525a41); the 2000s rows carry heavier road dust (D, G).

   Recognition list, with what it rests on (all shown on every row unless named):
     1. Four big tyres a side in two pairs, the wider 1.40 m gap between the second and third axles (A, B, C, E).
     2. The faceted nose: a raked lower plate, a long shallow glacis rising from the nose edge to the roof 2.35 m
        back, chamfered front corners (A, B, C, E).
     3. The bolt-on ceramic tile kit: panels standing proud on the upper flanks in two rows, dark joints (A, C, E).
     4. Headlamp clusters in tubular brush guards on the glacis corners, the two big tow shackles on the nose (A, E).
     5. Driver's hatch front left with three periscopes; the louvred engine deck front right (A, C; damage3d puts
        the engine front right).
     6. The port side access hatch abaft the driver (A, B); the rear ramp with its door, tail lamps, rear whips.
     7. M1128: the low profile turret - low plinth, the external 105 mm cradle with M6 smoke dischargers on its
        cheeks, the long autoloader housing over the rear deck, the commander's M2 front left, the fume extractor
        near the cradle and the muzzle brake 0.2 m past the nose (A, C, G).
     8. M1134: the launcher on its mast with the head at about 3.2 m, the perforated stowage racks on the rear
        flanks, the commander's vision block and M240 pintle, the big reload hatch on the rear deck (B, D).
     9. M-SHORAD: the double-V belly, wider tyres, the RIwP turret with the Stinger pod right and the two-rail
        Hellfire launcher left, the XM914 in the middle, the sight head front left, the round housings under the
        arms, radar units on the four roof corners, the louvred grille high on the starboard flank, the strapped
        stowage racks on the rear flanks (E, F).
    10. Slat cage on the 2000s MGS and the M1134: upright bars 0.45 m off the flanks, round the nose and across the
        tail, with horizontal-slat aprons over the wheel pairs (D, G, H).
   Station table: FLAT and DVH below, measured off A and B with the roof taken to 2.10 m (A and B draw it 2.2 -
     2.28 m; photograph C and the 2.64 m height over the weapon station put it lower); DVH 0.1 m higher on the V.
     Drawn (L x W, measured): M1128 7.26 x 2.77 m (hull 6.95 m, muzzle 0.19 m past the nose as A, tow pintle
     0.12 m); slat rows 7.69 x 3.65 m; M-SHORAD 7.07 x 2.89 m (the pods).  Hull width over the tile kit 2.77 m
     against the published 2.72.  Turret roofs: M1128 3.0 m, M1134 head 3.2 m, M-SHORAD pods 3.56 m.
   NOT CONFIRMED (drawn as approximations): the M1134 head's depth and the side of its smoke cluster (D shows it
     on the head's right end); which side of the M1128 turret the M2 mount is on (A is a side view: drawn left);
     what the round housings on the RIwP flanks are; the corner radar units' exact form
     (E, F show grilled drum-like units); the A1 commander's sensor post; the MGS turret's plan width (no top view
     clear enough: H is too small); the Hellfire rails are drawn loaded (E shows them empty on the ground).
   Not drawn: stowage, spare tyres, crew, antennas beyond the two rear whips, markings and numbers.
   Nodes: "turret" (ring centre on the roof, gun or launcher along +X), four "roadwheel" axle groups (both tyres in
     each).  No "podelev": all four rows are turret:true and the old file had none; the M1134's head is drawn
     raised, as A and D show it, and trains with the turret.  Materials: paint (canvas texture: CARC green, mottle,
     tile bolt rows, road dust low on the flanks), dark, glass, lamp, wheel (vertex colours, linear: rubber and
     green discs), C.team (two small strips on the roof).
   +X nose, +Y left (port), +Z up, metres, tyres on z = 0.  ASCII only.                                          */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroStryker = (function () {
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

  /* ---------------------------------------------------------------- more kit */
  /* a vertex-coloured bin (the wheels: rubber and painted hubs in one draw call); colours are linear */
  function VBin(mat) { Bin.call(this, mat, false); this.C = []; this.col = [0.02, 0.02, 0.02]; }
  VBin.prototype.tri = function (a, b, c, na, nb, nc) {
    Bin.prototype.tri.call(this, a, b, c, na, nb, nc);
    var k = this.col;
    this.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]);
  };
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  /* any simple outline [x, z] (convex or not) extruded across y0..y1 */
  function plateY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, k, a = 0, T;
    for (i = 0; i < n; i++) { k = (i + 1) % n; a += pts[i][0] * pts[k][1] - pts[k][0] * pts[i][1]; }
    if (a < 0) pts = pts.slice().reverse();
    T = earclip(pts);
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < T.length; i++) { F.push([T[i][0], T[i][1], T[i][2]]); F.push([n + T[i][0], n + T[i][2], n + T[i][1]]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, n + k, k], [i, n + i, n + k]); }
    solid(bin, V, F);
  }
  /* a body of revolution about the vertical through (cx, cy): profile [[z, r]...] bottom to top, capped */
  function lathe(bin, prof, cx, cy, seg, smooth) {
    var V = [], F = [], i, j, k, a, m = prof.length;
    for (i = 0; i < m; i++) for (j = 0; j < seg; j++) {
      a = (j + 0.5) / seg * TAU;
      V.push([cx + prof[i][1] * Math.cos(a), cy + prof[i][1] * Math.sin(a), prof[i][0]]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % seg;
      F.push([i * seg + j, i * seg + k, (i + 1) * seg + k], [i * seg + j, (i + 1) * seg + k, (i + 1) * seg + j]);
    }
    V.push([cx, cy, prof[0][0]], [cx, cy, prof[m - 1][0]]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j], [m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F, smooth);
  }
  /* a solid between two convex plan outlines with the same corner count (bottom at z0, top at z1) */
  function frust(bin, bot, top, z0, z1) {
    var n = bot.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([bot[i][0], bot[i][1], z0]);
    for (i = 0; i < n; i++) V.push([top[i][0], top[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  function mirrorPlan(half) {           /* [x, y>=0] from front to back on the left, mirrored to a closed outline */
    var o = half.slice(), i;
    for (i = half.length - 1; i >= 0; i--) o.push([half[i][0], -half[i][1]]);
    return o;
  }

  /* the painted bins map by each face's dominant axis: the flanks and ends take (along, height) so the dust band
     of the canvas lies along the bottom of the vehicle; the decks take (x, y) squeezed into the clean upper part
     of the canvas.  zo lifts a turret's local heights to the hull's (the turret is built about its ring). */
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), zo = this.zo || 0;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, 0.675 + q[1] * 0.15);
        else if (ay >= ax) this.U.push(q[0] * 0.34, (q[2] + zo) * 0.34);
        else this.U.push(q[1] * 0.34, (q[2] + zo) * 0.34);
      }
    }
  };

  /* ---------------------------------------------------------------- paint */
  /* CARC green 383 sampled off photographs C and E (about 120,128,99 in sun) and taken to about 0.7; the 2007 / 2010
     rows weathered with more road dust, as photographs D and F show them.  256 px spans 2.94 m: the bottom 30 % of
     the canvas is the lowest 0.9 m of the flanks, where the dust lies. */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed + P.dust;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd, gr;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 14 + R() * 30;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = (i % 3) ? "rgba(22,24,16,0.06)" : "rgba(214,204,170,0.05)";
        q.fillRect(R() * 256, R() * 180, 1 + R() * 3, 16 + R() * 50);
      }
      /* bolt heads of the ceramic tile kit: rows of dots every 0.6 m along, 0.35 m up */
      q.fillStyle = "rgba(16,18,12,0.22)";
      for (i = 0; i < 26; i++) for (k = 0; k < 5; k++) q.fillRect(i * 10 + 3, 40 + k * 30, 2, 2);
      /* road dust, densest at the bottom (canvas row 255 is z = 0) */
      gr = q.createLinearGradient(0, 160, 0, 256);
      gr.addColorStop(0, "rgba(150,132,98,0)");
      gr.addColorStop(1, "rgba(150,132,98," + P.dust + ")");
      q.fillStyle = gr; q.fillRect(0, 160, 256, 96);
      for (i = 0; i < 40; i++) {
        q.fillStyle = "rgba(140,122,90," + (0.08 + R() * P.dust * 0.4).toFixed(3) + ")";
        q.fillRect(R() * 256, 175 + R() * 80, 4 + R() * 22, 2 + R() * 7);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  var PAINT = {
    now:  { base: "#525a41", blots: ["#4a523b", "#5a6249", "#4e563e"], seed: 2012, dust: 0.30 },
    iraq: { base: "#545b42", blots: ["#4b533c", "#5e6550", "#62624c"], seed: 2007, dust: 0.62 },
    a1:   { base: "#535c42", blots: ["#4b543c", "#5b634a", "#4f583f"], seed: 2023, dust: 0.18 }
  };
  var HUB = lin(0x4f573e), RUB = lin(0x1c1c1a);

  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2a2d25, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2630, roughness: 0.15, metalness: 0.4 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd2ccb0, roughness: 0.3, metalness: 0.2, emissive: 0x1a1810 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.9, metalness: 0.04 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* ---------------------------------------------------------------- the hulls */
  /* Station rows, measured from the nose (xn, m) off drawing A and taken with the published 6.95 m:
     [xn, keel z, belly z, belly hw, knee z, knee hw, chine z, chine hw, shoulder z, shoulder hw, roof z, roof hw].
     Heights are the drawing's taken to the 2.10 m roof (photograph C and the 2.64 m height over the RWS put the
     drawing's roof 0.1 m high).  The knee is the shelf over the tyres; the chine the widest line of the hull with
     its tile kit, the upper flank leaning in above it to the roof edge. */
  var HL = 3.475;
  function X(xn) { return HL - xn; }
  var FLAT = { R: 0.56, W: 0.32, yc: 1.14, AX: [1.57, 2.81, 4.21, 5.43], S: [
    [0.00, 1.27, 1.27, 0.88, 1.29, 0.92, 1.31, 0.98, 1.39, 0.97, 1.43, 0.92],
    [0.10, 1.19, 1.19, 0.86, 1.25, 0.92, 1.31, 1.07, 1.43, 1.05, 1.47, 0.99],
    [0.50, 0.87, 0.87, 0.82, 1.20, 0.92, 1.31, 1.23, 1.54, 1.14, 1.58, 1.08],
    [0.95, 0.50, 0.50, 0.80, 1.20, 0.93, 1.31, 1.33, 1.65, 1.25, 1.70, 1.18],
    [1.30, 0.48, 0.48, 0.80, 1.20, 0.93, 1.31, 1.33, 1.74, 1.27, 1.79, 1.21],
    [2.35, 0.48, 0.48, 0.80, 1.20, 0.93, 1.31, 1.33, 2.05, 1.27, 2.10, 1.21],
    [6.45, 0.48, 0.48, 0.80, 1.20, 0.93, 1.31, 1.33, 2.05, 1.27, 2.10, 1.21],
    [6.95, 1.25, 1.25, 0.84, 1.27, 0.90, 1.31, 1.33, 2.03, 1.25, 2.08, 1.19]] };
  /* the double-V hull of the A1 (photographs E, F): the V under the old belly, the hull 0.1 m higher, wider tyres */
  var DVH = { R: 0.58, W: 0.40, yc: 1.13, AX: [1.57, 2.81, 4.21, 5.43], S: [
    [0.00, 1.30, 1.34, 0.86, 1.37, 0.92, 1.40, 0.98, 1.48, 0.97, 1.52, 0.92],
    [0.10, 1.05, 1.24, 0.86, 1.35, 0.92, 1.40, 1.07, 1.53, 1.05, 1.57, 0.99],
    [0.50, 0.70, 1.00, 0.86, 1.28, 0.93, 1.40, 1.23, 1.64, 1.14, 1.68, 1.08],
    [0.95, 0.56, 0.98, 0.88, 1.26, 0.94, 1.40, 1.33, 1.75, 1.25, 1.80, 1.18],
    [1.30, 0.50, 0.98, 0.88, 1.26, 0.94, 1.40, 1.33, 1.84, 1.27, 1.89, 1.21],
    [2.35, 0.50, 0.98, 0.88, 1.26, 0.94, 1.40, 1.33, 2.15, 1.27, 2.20, 1.21],
    [6.45, 0.50, 0.98, 0.88, 1.26, 0.94, 1.40, 1.33, 2.15, 1.27, 2.20, 1.21],
    [6.95, 1.18, 1.24, 0.84, 1.33, 0.90, 1.40, 1.33, 2.13, 1.25, 2.18, 1.19]] };

  function rowAt(H, xn) {
    var S = H.S, i, t, o = [], k;
    if (xn <= S[0][0]) return S[0].slice();
    for (i = 0; i + 1 < S.length; i++) {
      if (xn >= S[i][0] && xn <= S[i + 1][0]) {
        t = (xn - S[i][0]) / ((S[i + 1][0] - S[i][0]) || 1);
        for (k = 0; k < 12; k++) o.push(S[i][k] + (S[i + 1][k] - S[i][k]) * t);
        return o;
      }
    }
    return S[S.length - 1].slice();
  }
  function ring(r) {
    var x = X(r[0]);
    return [[x, 0, r[1]], [x, r[3], r[2]], [x, r[5], r[4]], [x, r[7], r[6]], [x, r[9], r[8]], [x, r[11], r[10]],
            [x, -r[11], r[10]], [x, -r[9], r[8]], [x, -r[7], r[6]], [x, -r[5], r[4]], [x, -r[3], r[2]]];
  }
  /* the upper flank plane at xn on side s: origin on the chine, W up the plate to the shoulder, N out */
  function flank(H, xn, s) {
    var r = rowAt(H, xn), a = r[7] - r[9], b = r[8] - r[6], l = Math.sqrt(a * a + b * b);
    return { P0: [X(xn), s * r[7], r[6]], W: [0, -s * a / l, b / l], N: [0, s * b / l, a / l], len: l, r: r };
  }
  function onFlank(bin, H, s, xn0, xn1, w0, w1, h0, h1) {
    var f = flank(H, (xn0 + xn1) / 2, s);
    planeBox(bin, f.P0, [-1, 0, 0], f.W, f.N, xn0 - (xn0 + xn1) / 2 + 0, xn1 - (xn0 + xn1) / 2, w0, w1, h0, h1);
  }
  function flankPt(H, s, xn, w, h) {
    var f = flank(H, xn, s);
    return [X(xn), f.P0[1] + f.W[1] * w + f.N[1] * h, f.P0[2] + f.W[2] * w + f.N[2] * h];
  }
  /* a deck frame on the roof / glacis at xn, y: returns z of the roof line there */
  function roofZ(H, xn) { return rowAt(H, xn)[10]; }
  /* a box lying on the sloping front deck: centre (xn, y), along-slope length L, width Wd, height h */
  function deckBox(bin, H, xn0, xn1, y0, y1, h0, h1) {
    var za = roofZ(H, xn0), zb = roofZ(H, xn1), U = unit([X(xn1) - X(xn0), 0, zb - za]), N = [-U[2], 0, U[0]];
    if (N[2] < 0) N = [U[2], 0, -U[0]];
    var L = Math.sqrt((X(xn1) - X(xn0)) * (X(xn1) - X(xn0)) + (zb - za) * (zb - za));
    planeBox(bin, [X(xn0), 0, za], U, [0, 1, 0], N, 0, L, y0, y1, h0, h1);
  }

  function addHull(B, H, v) {
    var S = H.S, rings = [], i, s, k;
    for (i = 0; i < S.length; i++) rings.push(ring(S[i]));
    loft(B.paint, rings, false);
    var mid = rowAt(H, 3.5), zr = mid[10];

    /* the bolt-on ceramic tile kit: panels standing proud of the upper flanks, two rows, dark seams between
       (A shows the panel joints; C, E the bolt rows).  Not over the side hatch or the stowage racks. */
    var COLS = [[1.40, 2.05], [2.08, 2.98], [3.62, 4.40], [4.43, 5.21], [5.24, 6.02], [6.05, 6.70]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < COLS.length; i++) {
        var Lw = flank(H, COLS[i][0], s).len, Lh = Math.min(Lw, 0.80);
        if (s > 0 && i === 1) continue;                                  /* the port side access hatch, below */
        onFlank(B.dark, H, s, COLS[i][0] - 0.02, COLS[i][1] + 0.02, 0.02, Lh - 0.03, -0.005, 0.014);
        onFlank(B.paint, H, s, COLS[i][0], COLS[i][1], 0.04, Lh * 0.48, -0.005, 0.03);
        if (!(v.racks && i >= 2)) onFlank(B.paint, H, s, COLS[i][0], COLS[i][1], Lh * 0.52, Lh - 0.05, -0.005, 0.03);
      }
    }
    /* the port side access hatch abaft the driver (A): raised panel with a dark seam, two handles */
    var Lp = flank(H, 3.3, 1).len;
    onFlank(B.dark, H, 1, 2.98, 3.60, 0.08, Lp - 0.10, -0.005, 0.02);
    onFlank(B.paint, H, 1, 3.02, 3.56, 0.12, Lp - 0.14, -0.005, 0.04);
    onFlank(B.dark, H, 1, 3.10, 3.16, 0.14, 0.24, 0.04, 0.08);
    onFlank(B.dark, H, 1, 3.42, 3.48, 0.14, 0.24, 0.04, 0.08);

    /* stowage racks along the upper rear flanks: a perforated rail plate on standoffs (A: two rows of eight holes) */
    if (v.racks) {
      for (s = -1; s <= 1; s += 2) {
        var Lr = flank(H, 5.0, s).len;
        onFlank(B.paint, H, s, 3.75, 6.75, Lr * 0.55, Lr - 0.04, 0.03, 0.07);
        onFlank(B.dark, H, s, 3.75, 6.75, Lr * 0.52, Lr * 0.55, -0.005, 0.07);
        for (k = 0; k < 16; k++) {
          var hx = 3.92 + k * 0.18 + (k >= 8 ? 0.12 : 0);
          var p0 = flankPt(H, s, hx, Lr * 0.70, 0.07), p1 = flankPt(H, s, hx, Lr * 0.70, 0.075);
          cyl(B.dark, p0, p1, 0.035, 0.035, 6);
        }
        for (k = 0; k < 6; k++) {                    /* the tie-down hoops of the A1's racks (E, F) */
          if (!v.a1) break;
          var hq = 3.95 + k * 0.48;
          bar(B.paint, flankPt(H, s, hq, Lr * 0.56, 0.07), flankPt(H, s, hq, Lr * 0.20, 0.11), 0.04);
          bar(B.paint, flankPt(H, s, hq + 0.10, Lr * 0.56, 0.07), flankPt(H, s, hq + 0.10, Lr * 0.20, 0.11), 0.04);
        }
      }
    }

    /* the lower hull: dark shadowed plates between the wheel stations and the suspension arms to each hub */
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2) {
      var ax = X(H.AX[i]);
      cylY(B.dark, ax, s > 0 ? 0.70 : -H.yc + 0.12, s > 0 ? H.yc - 0.12 : -0.70, H.R, 0.085, 8);
      bar(B.dark, [ax - 0.32, s * 0.80, H.R + 0.14], [ax - 0.02, s * (H.yc - 0.16), H.R + 0.05], 0.07);
      bar(B.dark, [ax + 0.10, s * 0.82, mid[4] - 0.06], [ax, s * (H.yc - 0.18), H.R + 0.18], 0.06);
    }

    /* front: the nose, tow shackles, headlamp clusters in their brush guards (A, C, E) */
    var n0 = rowAt(H, 0.0), n1 = rowAt(H, 0.55);
    for (s = -1; s <= 1; s += 2) {
      var sy = s * 0.62, zs = n0[2] - 0.28;
      box(B.dark, X(0.30) - 0.05, X(0.30) + 0.05, sy - 0.07, sy + 0.07, zs - 0.02, zs + 0.12);
      var sx = X(0.18);
      cyl(B.lamp, [sx + 0.05, sy - 0.10, zs - 0.10], [sx + 0.05, sy + 0.10, zs - 0.10], 0.035, 0.035, 8);  /* shackle pin */
      bar(B.paint, [sx, sy - 0.08, zs - 0.10], [sx + 0.16, sy - 0.06, zs - 0.30], 0.045);
      bar(B.paint, [sx, sy + 0.08, zs - 0.10], [sx + 0.16, sy + 0.06, zs - 0.30], 0.045);
      bar(B.paint, [sx + 0.16, sy - 0.07, zs - 0.30], [sx + 0.16, sy + 0.07, zs - 0.30], 0.045);
      /* the lamp cluster on the glacis corner: housing, lamps, the tubular guard over it */
      var lx = X(0.32), lz = rowAt(H, 0.32)[10], ly = s * 0.82;
      box(B.paint, lx - 0.14, lx + 0.10, ly - 0.14, ly + 0.14, lz - 0.04, lz + 0.14);
      cylX(B.lamp, lx + 0.10, lx + 0.12, ly + 0.05, lz + 0.07, 0.055, 10);
      cylX(B.lamp, lx + 0.10, lx + 0.12, ly - 0.07, lz + 0.07, 0.035, 8);
      bar(B.dark, [lx - 0.22, ly - 0.20, lz], [lx + 0.20, ly - 0.20, lz + 0.26], 0.03);
      bar(B.dark, [lx + 0.20, ly - 0.20, lz + 0.26], [lx + 0.20, ly + 0.20, lz + 0.26], 0.03);
      bar(B.dark, [lx + 0.20, ly + 0.20, lz + 0.26], [lx - 0.22, ly + 0.20, lz], 0.03);
      bar(B.dark, [lx + 0.20, ly - 0.20, lz + 0.26], [lx + 0.28, ly - 0.20, lz - 0.08], 0.03);
      bar(B.dark, [lx + 0.20, ly + 0.20, lz + 0.26], [lx + 0.28, ly + 0.20, lz - 0.08], 0.03);
    }
    /* the upright exhaust / mast stub at the front left (A: the tall hooked pipe by the driver) */
    var ex = X(0.95), ez = rowAt(H, 0.95)[10];
    cylZ(B.dark, ex, 0.98, ez - 0.05, ez + 0.62, 0.035, 8);
    bar(B.dark, [ex, 0.98, ez + 0.62], [ex - 0.10, 0.98, ez + 0.70], 0.05);
    /* the louvred engine deck on the front right (the engine sits front right, damage3d) */
    deckBox(B.dark, H, 0.75, 2.05, -1.02, -0.20, -0.01, 0.015);
    for (k = 0; k < 7; k++) deckBox(B.paint, H, 0.82 + k * 0.17, 0.90 + k * 0.17, -0.98, -0.24, 0.0, 0.05);
    /* the driver's hatch front left with three periscopes facing forward (A: raised hatch on the glacis) */
    var dx = 1.95, dz = roofZ(H, dx);
    cylZ(B.paint, X(dx), 0.55, dz - 0.04, dz + 0.08, 0.32, 16);
    cylZ(B.paint, X(dx), 0.55, dz + 0.08, dz + 0.13, 0.27, 16);
    for (k = -1; k <= 1; k++) {
      var py = 0.55 + k * 0.17, pa = k * 0.35;
      rbox(B.paint, X(dx) + 0.30 * Math.cos(pa), py, 0.05, 0.07, pa, dz + 0.02, dz + 0.16);
      rbox(B.glass, X(dx) + 0.355 * Math.cos(pa), py, 0.008, 0.055, pa, dz + 0.06, dz + 0.13);
    }
    /* rear: the ramp with its personnel door, hinges, tail lamps, the antenna bases and whips at the rear corners */
    var t0 = rowAt(H, 6.95), xr = X(6.95);
    box(B.dark, xr - 0.012, xr + 0.01, -0.80, 0.80, t0[2] + 0.04, t0[10] - 0.12);
    box(B.paint, xr - 0.04, xr + 0.01, -0.76, 0.76, t0[2] + 0.08, t0[10] - 0.16);
    box(B.dark, xr - 0.055, xr - 0.03, 0.04, 0.58, t0[2] + 0.16, t0[10] - 0.24);
    box(B.paint, xr - 0.07, xr - 0.03, 0.08, 0.54, t0[2] + 0.20, t0[10] - 0.28);
    box(B.dark, xr - 0.10, xr - 0.06, 0.12, 0.20, (t0[2] + t0[10]) / 2 - 0.05, (t0[2] + t0[10]) / 2 + 0.05);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, xr - 0.06, s * 0.70, s * 0.50, t0[2] + 0.06, 0.05, 8);
      box(B.lamp, xr - 0.03, xr + 0.02, s * 1.02 - 0.07, s * 1.02 + 0.07, t0[10] - 0.30, t0[10] - 0.20);
      var aX = X(6.70), aY = s * 1.05, aZ = rowAt(H, 6.70)[10];
      cylZ(B.dark, aX, aY, aZ, aZ + 0.12, 0.06, 8);
      cyl(B.dark, [aX, aY, aZ + 0.12], [aX, aY, aZ + 1.55], 0.012, 0.006, 5);
    }
    /* tow pintle under the ramp */
    box(B.dark, xr - 0.12, xr + 0.02, -0.10, 0.10, t0[2] - 0.12, t0[2] + 0.02);
    return zr;
  }

  /* Slat armour (the 2007 Iraq and 2010 Afghanistan photographs D, F, G): a cage of upright bars on frames standing
     about 0.45 m off the flanks, round the nose and across the tail, from about 1.2 m to the roof line, with
     horizontal-slat aprons over the upper half of each wheel pair. */
  function addSlat(B, H) {
    var yo = 1.80, z0 = 1.18, z1 = 2.16, xf = X(-0.32), xa = X(7.32), xc = X(0.70), yf = 1.30, s, x, y, k, t;
    function rail(p, q) { bar(B.paint, p, q, 0.05); }
    function bars(p, q, zA, zB, step) {
      var L = Math.sqrt((q[0] - p[0]) * (q[0] - p[0]) + (q[1] - p[1]) * (q[1] - p[1])), n = Math.max(1, Math.round(L / step));
      for (k = 0; k <= n; k++) {
        t = k / n; x = p[0] + (q[0] - p[0]) * t; y = p[1] + (q[1] - p[1]) * t;
        box(B.paint, x - 0.012, x + 0.012, y - 0.012, y + 0.012, zA, zB);
      }
      rail([p[0], p[1], zA], [q[0], q[1], zA]); rail([p[0], p[1], zB], [q[0], q[1], zB]);
      rail([p[0], p[1], (zA + zB) / 2], [q[0], q[1], (zA + zB) / 2]);
    }
    for (s = -1; s <= 1; s += 2) {
      bars([xc, s * yo], [xa, s * yo], z0, z1, 0.13);                     /* the flank */
      bars([xf, s * yf], [xc, s * yo], z0 - 0.10, z1 - 0.12, 0.13);        /* the front corner */
      /* standoff brackets to the hull */
      for (k = 0; k < 5; k++) {
        x = X(1.2 + k * 1.4);
        bar(B.paint, [x, s * 1.30, z1 - 0.08], [x, s * yo, z1 - 0.08], 0.04);
        bar(B.paint, [x, s * 1.36, z0 + 0.10], [x, s * yo, z0 + 0.10], 0.04);
      }
      /* the aprons over the wheel pairs: horizontal slats */
      var pr = [[1.05, 3.35], [3.70, 5.95]], j;
      for (j = 0; j < 2; j++) {
        var xa0 = X(pr[j][0]), xa1 = X(pr[j][1]), ya = s * (yo - 0.06);
        for (k = 0; k < 4; k++) rail([xa0, ya, 0.86 + k * 0.10], [xa1, ya, 0.86 + k * 0.10]);
        for (k = 0; k <= 4; k++) { x = xa0 + (xa1 - xa0) * k / 4; box(B.paint, x - 0.02, x + 0.02, ya - 0.02, ya + 0.02, 0.82, z0 + 0.02); }
      }
    }
    bars([xf, -yf], [xf, yf], z0 - 0.10, z1 - 0.12, 0.13);                    /* across the nose */
    bars([xa, -yo], [xa, yo], 0.95, z1, 0.13);                               /* across the tail */
    for (s = -1; s <= 1; s += 2) bar(B.paint, [X(6.95), s * 0.95, 1.95], [xa, s * 0.95, 1.95], 0.04);
  }

  /* ---------------------------------------------------------------- turrets (local: ring centre, roof at 0) */
  /* M1128: the low profile turret (A, B, C).  Ring centre 4.55 m behind the nose; the 105 mm in its external
     cradle on top, the autoloader housing behind it over the rear deck, the two M6 four-tube smoke dischargers on
     the cradle cheeks, the commander's M2 on its mount at front left, the gunner's sight front right. */
  function mgsTurret(B, H, zr) {
    var gz = 0.52;                                                      /* gun axis above the roof (A: 2.62 m) */
    /* the turret basket's roof: a low faceted plinth over the ring */
    frust(B.paint, mirrorPlan([[1.00, 0.50], [0.62, 0.90], [-0.80, 0.92], [-1.02, 0.66]]),
                   mirrorPlan([[0.90, 0.44], [0.56, 0.82], [-0.74, 0.84], [-0.94, 0.60]]), -0.02, 0.24);
    /* the cradle / mantlet housing round the gun, its front sloped, its belly clear of the plinth (A) */
    profY(B.paint, [[1.45, 0.30], [1.62, 0.40], [1.62, 0.62], [1.40, 0.76], [0.30, 0.78], [0.30, 0.22], [1.0, 0.24]], -0.42, 0.42);
    /* the autoloader housing: long, wide, its rear chamfered above and below, overhanging the rear deck (A, B) */
    profY(B.paint, [[0.32, 0.24], [0.32, 0.86], [-1.55, 0.86], [-1.88, 0.66], [-1.72, 0.40], [-0.90, 0.24]], -0.74, 0.74);
    frust(B.paint, mirrorPlan([[0.10, 0.70], [-1.55, 0.70]]), mirrorPlan([[0.0, 0.64], [-1.45, 0.64]]), 0.86, 0.90);
    /* the commander's sight block on the rear roof and the rear antenna mast (A, B) */
    box(B.paint, -0.85, -0.40, -0.55, -0.20, 0.90, 1.03);
    box(B.glass, -0.40, -0.39, -0.50, -0.25, 0.94, 1.00);
    cylZ(B.dark, -1.55, 0.55, 0.90, 1.40, 0.05, 8);
    cylZ(B.dark, -1.55, -0.55, 0.90, 1.05, 0.04, 8);
    /* seams round the loader doors on the housing flanks */
    for (var s = -1; s <= 1; s += 2) {
      box(B.dark, -1.30, -0.30, s * 0.745 - 0.006, s * 0.745 + 0.006, 0.30, 0.32);
      box(B.dark, -1.30, -0.30, s * 0.745 - 0.006, s * 0.745 + 0.006, 0.72, 0.74);
      box(B.dark, -0.32, -0.30, s * 0.745 - 0.006, s * 0.745 + 0.006, 0.30, 0.74);
      /* the M6 smoke dischargers: four tubes a side on the cradle cheeks, laid forward and up */
      var k, ce = Math.cos(0.45), se = Math.sin(0.45);
      box(B.dark, 1.02, 1.30, s * 0.42, s * 0.62, 0.56, 0.62);
      for (k = 0; k < 4; k++) {
        var yy = s * (0.45 + (k % 2) * 0.10), zz = 0.64 + ((k / 2) | 0) * 0.09;
        cyl(B.dark, [1.06, yy, zz], [1.06 + 0.20 * ce, yy, zz + 0.20 * se], 0.04, 0.04, 8);
      }
    }
    /* the gunner's sight head on the cradle, front right */
    box(B.paint, 0.95, 1.30, -0.40, -0.16, 0.82, 1.02);
    box(B.glass, 1.30, 1.31, -0.36, -0.20, 0.86, 0.98);
    /* the commander's hatch (left) with the M2 on its mount ahead of it (A, B) */
    cylZ(B.paint, 0.05, 0.42, 0.86, 0.96, 0.30, 14);
    box(B.dark, 0.32, 0.40, 0.36, 0.48, 0.96, 1.18);
    box(B.dark, 0.18, 0.62, 0.36, 0.48, 1.12, 1.24);
    cylX(B.dark, 0.62, 1.70, 0.42, 1.18, 0.024, 8);
    box(B.dark, 0.30, 0.50, 0.49, 0.60, 1.06, 1.20);
    /* the 105 mm M68A2: mantlet, tube, fume extractor near the cradle, muzzle brake past the nose */
    var mx = 1.62, mz = X(-0.19) - X(4.55);
    box(B.paint, 1.58, 1.74, -0.24, 0.24, gz - 0.18, gz + 0.18);
    cyl(B.dark, [1.74, 0, gz], [mz - 0.36, 0, gz], 0.085, 0.07, 14);
    cylX(B.dark, 1.85, 2.70, 0, gz, 0.115, 14);
    cyl(B.dark, [1.82, 0, gz], [1.85, 0, gz], 0.085, 0.115, 14);
    cyl(B.dark, [2.70, 0, gz], [2.76, 0, gz], 0.115, 0.075, 14);
    cylX(B.dark, mz - 0.36, mz, 0, gz, 0.10, 12);
    for (s = -1; s <= 1; s += 2) box(B.dark, mz - 0.30, mz - 0.06, s * 0.098, s * 0.106, gz - 0.035, gz + 0.035);
    /* the M240C coax to the right of the gun */
    cylX(B.dark, 1.62, 1.95, -0.30, gz - 0.06, 0.02, 6);
    return mx;
  }

  /* M1134: the elevating TOW launcher as photographed raised (A, D): a slewing base on the roof, the square mast,
     and the head with the sight in the middle and the twin TOW tubes to its left, the smoke cluster on its right. */
  function atgmTurret(B) {
    cylZ(B.paint, 0, 0, -0.02, 0.10, 0.48, 18);
    box(B.paint, -0.30, 0.30, -0.36, 0.36, 0.10, 0.24);
    box(B.paint, -0.21, 0.21, -0.22, 0.22, 0.24, 0.58);
    box(B.dark, 0.20, 0.215, -0.16, 0.16, 0.28, 0.54);
    /* the head: one block, top sloping down to the front (A) */
    profY(B.paint, [[-0.53, 0.56], [0.70, 0.56], [0.76, 0.68], [0.76, 0.88], [0.44, 1.10], [-0.53, 1.10]], -0.82, 0.82);
    box(B.dark, -0.55, 0.78, -0.24, -0.22, 0.58, 1.08);
    box(B.dark, -0.55, 0.78, 0.22, 0.24, 0.58, 0.88);
    /* the sight: day / thermal windows facing forward */
    box(B.dark, 0.76, 0.78, -0.20, 0.20, 0.64, 0.88);
    cylX(B.glass, 0.77, 0.80, 0.08, 0.76, 0.075, 12);
    cylX(B.glass, 0.77, 0.80, -0.09, 0.76, 0.055, 10);
    /* the twin TOW tubes, side by side in the left pod */
    var s, k;
    for (k = 0; k < 2; k++) {
      var ty = 0.38 + k * 0.28;
      cylX(B.dark, 0.76, 0.80, ty, 0.76, 0.11, 14);
      cylX(B.glass, 0.80, 0.81, ty, 0.76, 0.085, 12);
    }
    /* the smoke grenade cluster on the right end */
    for (k = 0; k < 4; k++) {
      var yy = -0.48 - (k % 2) * 0.12, zz = 0.94 + ((k / 2) | 0) * 0.10;
      cyl(B.dark, [0.50, yy, zz], [0.70, yy - 0.02, zz + 0.07], 0.045, 0.045, 8);
    }
    return 0.81;
  }

  /* Stryker A1 M-SHORAD Increment 1: the Leonardo DRS / Moog RIwP turret (E, F): the turret body over its ring
     abaft the hatches, the 30 mm XM914 in the middle with the M240 coax to its right, the sight head front left,
     a four-round Stinger pod on the right arm and the two-rail Hellfire launcher on the left (E: rails empty), the
     round housings low on the turret flanks under the arms (E, F; what they hold is not confirmed). */
  function shoradTurret(B) {
    cylZ(B.paint, 0, 0, -0.02, 0.14, 0.88, 22);
    frust(B.paint, mirrorPlan([[0.82, 0.42], [0.62, 0.72], [-0.80, 0.72], [-0.98, 0.50]]),
                   mirrorPlan([[0.72, 0.38], [0.54, 0.66], [-0.72, 0.66], [-0.88, 0.46]]), 0.14, 0.80);
    /* the gun cradle block in the middle, raised */
    box(B.paint, -0.30, 0.66, -0.28, 0.28, 0.80, 1.10);
    /* XM914 30 mm: receiver, barrel, muzzle; the M240 coax to its right */
    box(B.dark, 0.40, 0.95, -0.11, 0.11, 0.86, 1.06);
    cylX(B.dark, 0.95, 1.85, 0, 0.96, 0.038, 10);
    cylX(B.dark, 1.85, 1.98, 0, 0.96, 0.052, 10);
    cylX(B.dark, 0.66, 1.15, -0.20, 0.90, 0.02, 6);
    /* the sight head, front left of the gun (F) */
    box(B.paint, 0.25, 0.64, 0.30, 0.62, 0.80, 1.14);
    box(B.dark, 0.64, 0.65, 0.34, 0.58, 0.86, 1.10);
    cylX(B.glass, 0.645, 0.66, 0.50, 0.99, 0.065, 10);
    box(B.glass, 0.645, 0.66, 0.34, 0.42, 0.94, 1.04);
    /* reload hatches on the roof */
    box(B.dark, -0.70, -0.30, -0.56, -0.14, 0.80, 0.83);
    box(B.dark, -0.70, -0.30, 0.14, 0.56, 0.80, 0.83);
    /* the arms and the round housings under them (E, F) */
    var s, k;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.12, 0.26, s * 0.66, s * 0.94, 0.70, 1.10);
      cyl(B.paint, [0.08, s * 0.66, 0.54], [0.30, s * 0.76, 0.54], 0.30, 0.30, 18);
      cyl(B.dark, [0.30, s * 0.76, 0.54], [0.32, s * 0.77, 0.54], 0.25, 0.25, 18);
    }
    /* the Stinger pod, right: a box with four cells 2 x 2, red caps (E) */
    box(B.paint, -0.46, 0.60, -1.38, -0.94, 0.92, 1.36);
    box(B.dark, -0.20, 0.30, -0.95, -0.93, 1.00, 1.28);
    for (k = 0; k < 4; k++) {
      var cy = -1.16 + ((k % 2) ? 0.10 : -0.10), cz = 1.14 + (((k / 2) | 0) ? 0.10 : -0.10);
      cylX(B.dark, 0.60, 0.615, cy, cz, 0.056, 10);
      cylX(B.lamp, 0.615, 0.62, cy, cz, 0.042, 10);
    }
    /* the Hellfire launcher, left: a body with two rails one over the other, a missile on each */
    box(B.paint, -0.36, 0.36, 0.94, 1.16, 0.80, 1.42);
    for (k = 0; k < 2; k++) {
      var hz = 0.94 + k * 0.32;
      box(B.dark, -0.62, 0.66, 1.03, 1.09, hz + 0.09, hz + 0.12);
      cylX(B.dark, -0.80, 0.62, 1.06, hz, 0.089, 12);
      cyl(B.dark, [0.62, 1.06, hz], [0.86, 1.06, hz], 0.089, 0.02, 12);
      for (s = 0; s < 4; s++) {
        var fa = s * Math.PI / 2 + Math.PI / 4;
        bar(B.dark, [-0.78, 1.06, hz], [-0.68, 1.06 + 0.17 * Math.cos(fa), hz + 0.17 * Math.sin(fa)], 0.012);
      }
    }
    return 1.98;
  }

  /* the A1's radar arrays: a flat-faced drum unit on each roof corner, its face turned 45 deg out (E, F) */
  function radars(B, H) {
    var c, s, k;
    var P = [[0.70, 1], [6.70, -1]];
    for (k = 0; k < 2; k++) for (s = -1; s <= 1; s += 2) {
      var xn = P[k][0], fw = P[k][1], zr = roofZ(H, xn), x = X(xn), y = s * 1.00;
      var ph = Math.atan2(s, fw), d = [Math.cos(ph), Math.sin(ph), 0];
      cylZ(B.dark, x, y, zr - 0.02, zr + 0.16, 0.06, 8);
      c = [x, y, zr + 0.38];
      cyl(B.paint, [c[0] - d[0] * 0.10, c[1] - d[1] * 0.10, c[2]], [c[0] + d[0] * 0.10, c[1] + d[1] * 0.10, c[2]], 0.22, 0.22, 16);
      cyl(B.dark, [c[0] + d[0] * 0.10, c[1] + d[1] * 0.10, c[2]], [c[0] + d[0] * 0.115, c[1] + d[1] * 0.115, c[2]], 0.19, 0.19, 16);
    }
  }

  /* ---------------------------------------------------------------- wheels */
  /* the 12.00 R20 tyre (A1: the wider DVH tyre) with its lug pattern, and the painted disc wheel with eight
     nuts and the central-tyre-inflation hub (A, C, E) */
  function wheel(VB, H, yc, s, ph) {
    var N = 24, RT = H.R, hw = H.W / 2, prof = [[0.56, -1.0, 0], [0.70, -1.0, 0], [0.88, -0.96, 0], [0.97, -0.78, 0],
        [1.0, -0.40, 1], [1.0, 0.40, 2], [0.97, 0.78, 0], [0.88, 0.96, 0], [0.70, 1.0, 0], [0.56, 1.0, 0]];
    var V = [], F = [], i, j, k, m = prof.length, r, a;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = prof[i][0] * RT;
      if (prof[i][2] && ((j + prof[i][2]) % 2)) r -= 0.04;
      a = (j + ph) / N * TAU;
      V.push([r * Math.cos(a), yc + prof[i][1] * hw, r * Math.sin(a)]);
    }
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N; var i2 = (i + 1) % m;
      F.push([i * N + j, i * N + k, i2 * N + k], [i * N + j, i2 * N + k, i2 * N + j]);
    }
    VB.col = RUB;
    solid(VB, V, F, true);
    VB.col = HUB;
    var yf = yc + s * hw * 0.80;
    cyl(VB, [0, yf, 0], [0, yc - s * hw * 0.80, 0], 0.56 * RT, 0.56 * RT, 20);
    cyl(VB, [0, yf, 0], [0, yf + s * 0.015, 0], 0.46 * RT, 0.46 * RT, 20);
    cyl(VB, [0, yf, 0], [0, yf + s * 0.07, 0], 0.13, 0.11, 12);
    cyl(VB, [0, yf + s * 0.07, 0], [0, yf + s * 0.10, 0], 0.06, 0.05, 8);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      cyl(VB, [0.19 * Math.cos(a), yf, 0.19 * Math.sin(a)], [0.19 * Math.cos(a), yf + s * 0.035, 0.19 * Math.sin(a)], 0.022, 0.022, 6);
    }
  }

  /* ---------------------------------------------------------------- build */
  var KIND = {
    mgs_now:  { name: "stryker_m1128", hull: FLAT, paint: "now",  slat: false, turret: "mgs",  ring: 4.55, racks: false },
    mgs_iraq: { name: "stryker_m1128_slat", hull: FLAT, paint: "iraq", slat: true, turret: "mgs", ring: 4.55, racks: false },
    atgm:     { name: "stryker_m1134", hull: FLAT, paint: "iraq", slat: true, turret: "atgm", ring: 5.18, racks: true },
    shorad:   { name: "stryker_a1_m_shorad", hull: DVH, paint: "a1", slat: false, turret: "shorad", ring: 4.55, racks: true, a1: true }
  };
  function build(v, THREE, C) {
    var H = v.hull, T = materials(THREE, C, PAINT[v.paint]), g = new THREE.Group(), i, wg, geo, VB, s, k;
    g.name = v.name;
    var B = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
              lamp: new Bin(T.lamp, false), team: new Bin(T.team, false) };
    var zr = addHull(B, H, v);
    if (v.slat) addSlat(B, H);
    if (v.a1) {
      radars(B, H);
      /* the louvred engine air grille high on the starboard flank ahead of the turret (E) */
      var Lg = flank(H, 2.6, -1).len;
      onFlank(B.dark, H, -1, 2.05, 3.05, 0.10, Lg - 0.10, -0.005, 0.03);
      for (k = 0; k < 9; k++) onFlank(B.paint, H, -1, 2.05, 3.05, 0.14 + k * (Lg - 0.28) / 9, 0.16 + k * (Lg - 0.28) / 9, 0.0, 0.06);
      /* the commander's hatch with the sensor post (F) */
      cylZ(B.paint, X(2.85), -0.40, zr - 0.02, zr + 0.10, 0.30, 16);
      cylZ(B.dark, X(2.60), -0.85, zr, zr + 0.42, 0.04, 8);
      box(B.paint, X(2.60) - 0.12, X(2.60) + 0.12, -0.97, -0.73, zr + 0.42, zr + 0.56);
    }
    if (v.turret === "atgm") {
      /* the commander's hatch and the M240 on its pintle (A), the big reload hatch over the rear deck */
      profY(B.paint, [[X(2.30), zr - 0.02], [X(3.00), zr - 0.02], [X(3.00), zr + 0.14], [X(2.45), zr + 0.14]], -0.75, 0.05);
      for (k = 0; k < 4; k++) box(B.glass, X(2.36) + 0.0, X(2.36) + 0.03, -0.66 + k * 0.18, -0.56 + k * 0.18, zr + 0.04, zr + 0.11);
      cylZ(B.paint, X(3.05), -0.30, zr - 0.02, zr + 0.10, 0.31, 16);
      cylZ(B.dark, X(3.05), -0.30, zr + 0.10, zr + 0.13, 0.26, 16);
      cylZ(B.dark, X(3.30), -0.30, zr, zr + 0.45, 0.035, 8);
      box(B.dark, X(3.30) - 0.20, X(3.30) + 0.30, -0.36, -0.24, zr + 0.42, zr + 0.54);
      cylX(B.dark, X(3.30) + 0.30, X(3.30) + 0.85, -0.30, zr + 0.50, 0.018, 6);
      box(B.dark, X(6.70), X(5.85), -0.70, 0.70, zr - 0.01, zr + 0.03);
      box(B.paint, X(6.66), X(5.89), -0.66, 0.66, zr, zr + 0.06);
    }
    /* C.team: two strips on the roof edges ahead of the turret, flat to the deck */
    for (s = -1; s <= 1; s += 2) box(B.team, X(3.75), X(2.95), s > 0 ? 0.88 : -1.08, s > 0 ? 1.08 : -0.88, zr + 0.005, zr + 0.025);
    flush(THREE, g, B);
    for (i = 0; i < 4; i++) {
      VB = new VBin(T.wheel);
      wheel(VB, H, H.yc, 1, 0);
      wheel(VB, H, -H.yc, -1, 0.5);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(VB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(VB.N), 3));
      geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VB.C), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(X(H.AX[i]), 0, H.R);
      wg.add(new THREE.Mesh(geo, T.wheel));
      g.add(wg);
    }
    var TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
               lamp: new Bin(T.lamp, false) };
    TB.paint.zo = zr;
    if (v.turret === "mgs") mgsTurret(TB, H, zr); else if (v.turret === "atgm") atgmTurret(TB); else shoradTurret(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(X(v.ring), 0, zr);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }

  return { mgsNow: function (t, m, c) { return build(KIND.mgs_now, t, c); },
           mgsIraq: function (t, m, c) { return build(KIND.mgs_iraq, t, c); },
           atgm: function (t, m, c) { return build(KIND.atgm, t, c); },
           shorad: function (t, m, c) { return build(KIND.shorad, t, c); } };
})();

/* len is the measured X extent of each build (dump.js): the M1128 from the tow pintle to the muzzle brake, the
   slat rows from cage to cage, the M-SHORAD from the tow pintle to the nose */
UNIT_MODELS["lt_n"] = { len: 7.26, build: HeroStryker.mgsNow };
UNIT_MODELS["nato_e00_lighttank"] = { len: 7.69, build: HeroStryker.mgsIraq };
UNIT_MODELS["atgmv_n"] = { len: 7.69, build: HeroStryker.atgm };
UNIT_MODELS["spaag_n"] = { len: 7.07, build: HeroStryker.shorad };
