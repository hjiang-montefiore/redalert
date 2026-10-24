/* ===== ru_btr8x8.js - HERO models: the BTR-60PB / BTR-70 / BTR-80 / BTR-82A eight-wheeled carriers =====
   Full-quality redo (owner 2026-10-24, Russian front line).  Rows (js/eras.js), each drawn as its own vehicle:
     pact_e60_btr60    BTR-60PB   (accepted 1966)   pact_e80_btr70    BTR-70    (accepted 1972)
     pact_e90_btr80    BTR-80     (accepted 1986)   pact_e00_btr82a   BTR-82A   (accepted 2013)

   Published figures (ru.wikipedia infoboxes "BTR-60", "BTR-70", "BTR-80"; the "BTR-82" infobox is blank):
     BTR-60PB 7.56 x 2.83 m, 2.31 m (PB);  BTR-70 7.535 x 2.80 m, 2.235-2.32 m;  BTR-80 7.65 x 2.90 m,
     2.35-2.46 m.  All three: wheelbase (first to last axle) 4.40 m, ground clearance 0.475 m; track 2.38 m
     (60, 70) and 2.41 m (80).  ru.wikipedia "BTR-80": the hull is 115 mm taller and longer and 100 mm wider than
     the BTR-70's, the overall height only 30 mm more.  The 82A keeps the BTR-80 hull (ru.wikipedia "BTR-82").
   Corrected against the old file: the axle spacing is 1.35 / 1.70 / 1.35 m (measured 1.38 / 1.62 / 1.40 off the
     BTR-60PB side photograph and 1.38 / 1.68 / 1.34 off the BTR-80 one, both scaled to the published 4.40 m; the old
     model had 1.43 / 1.79 / 1.38 = 4.60 m); the 82A is drawn on the BTR-80's 7.65 m hull (the old 7.69 is not
     supported by the references found); the BPU-1 has no roof hatch (the old one drew one).

   References (Wikimedia Commons, cached in the scratchpad q_btr_ref; no line drawing of these vehicles exists on
   Commons, so the shapes come from two near-square side photographs plus the published figures):
     A "Belarus-Pruzhany-Stepan Gudimov Park-BTR-60PB-4.jpg"    BTR-60PB square side, right side, nose right
     B "BTR-60PB (6090298704).jpg", "BTR-60PB APC at the Muzeum Polskiej Techniki Wojskowej in Warsaw.JPG"
                                                                BTR-60PB front three-quarters
     C "BTR 70 in the Musee des Blindes, France.JPG", "BTR-70, museum, Togliatti-1/-2.JPG", "BTR-70 Belarus 1.jpg"
                                                                BTR-70 front three-quarters, both sides
     D "Moscow 2012 Victory Day Parade Rehearsal, BTR-80, Russia.jpg"   BTR-80 square side, left side, nose left
     E "BTR-82A - TankBiathlon14part2-60.jpg"                   BTR-82A near-side, right side, nose right
     F "BTR-82A (1).jpg", "BTR-82A turret - June 2023.jpg"      BTR-82A front three-quarters; roof from above-rear
   Text: ru.wikipedia "BTR-60" (PB: the two troop roof hatches set diagonally, a rectangular hatch high in each
     side by the turret, the driver's and commander's hatches in the upper front plate with three B-1 vision blocks
     each, the folding trim vane stowed on the lower front plate); "BTR-80" (two rectangular roof hatches, the big
     two-leaf side doors just behind the turret, the upper leaf opening forward and the lower dropping as a step;
     902V smoke dischargers; one KamAZ diesel); "BTR-82" (BPPU module, 30 mm 2A72 with a 7.62 mm PKTM, TKN-4GA sight).

   Recognition list (each must show at game zoom), with what it rests on:
     1. Four evenly big tyres in two pairs, the 1.70 m gap between the second and third axles (A, D, E).
     2. The boat hull: a pointed, shallow-V bow in plan with the trim vane folded flat on the lower front plate,
        the long low upper front plate rising to the roof (A, B, D, F).
     3. The chine: a sharp break round the hull at about 1.25 m, the upper flank leaning in above it and the lower
        hull tucked in under it, dark between the wheels (A, D, E).
     4. Driver's and commander's armoured hatches side by side in the upper front plate (B, C, F; ru.wiki).
     5. Headlamps in tubular guards at the front corners of the upper front plate (B, C, F).
     6. BTR-60PB: the long sloping engine deck behind the troop roof, a rectangular hatch high in each flank beside
        the turret, the two roof hatches set diagonally, the OU-3 searchlight in front of the commander (A, B; ru.wiki).
     7. BTR-70: a sloping rear deck shorter than the 60PB's, the small two-leaf hatch low between the second and
        third axles straddling the chine, firing ports along the flank (C; ru.wiki BTR-70 / BTR-80).
     8. BTR-80 / 82A: the squarer rear with a level roof to the stern, the big two-leaf door between the second
        and third axles, the long tube on the left rear roof (D, E, F).
     9. BTR-60PB / BTR-70: the low conical one-man BPU-1 turret, KPVT and PKT, no hatch (A, B, C).
    10. BTR-80: the taller conical turret with the 1P3-9 sight block and 902V smoke dischargers (D; ru.wiki).
    11. BTR-82A: the angular BPPU module, the long 30 mm 2A72 reaching past the bow, the TKN-4GA sight box at the
        rear of the roof, three smoke tubes each side at the front corners (E, F).
    12. Paint by period: Soviet protective green on the 60PB, 70 and 80; the duller present-day Russian green on
        the 82A (E sampled 81,87,74, taken to 0.9).  No numbers, emblems or markings.

   Station table (model x, m; +X nose).  Axles 2.20 / 0.85 / -0.85 / -2.20.  A row is
     [x, bottom z, bottom half-width, knee z, knee half-width, chine z, chine half-width, roof z, roof half-width].
     The 60PB's and 70's upper front plate is laid at about 33 and 28 deg (A: 36 deg along the near corner; B and
     C show it steep and tall from ahead); the BTR-80's runs lower and longer (D).
     Roof heights: the flank-scale photographs put the 60PB's roof edge at about 1.98-2.06 m (A, over 1.29 at the
     chine) and the BTR-80's at 1.84 (D, foreshortened); taken with the published heights (turret tops 2.31 / 2.32 /
     2.35-2.46) and the ru.wiki "+115 mm" relation: roof 1.95 (60PB), 1.84 (70), 1.95 (80, 82A); chine 1.24-1.26.
     The hull ends are put at the published lengths, keeping each photograph's front / rear overhang ratio (A: 1.12
     : 1.04, D: 1.85 : 1.55), since both photographs foreshorten the centre-line ends.
     Drawn (L x W x H, m): 60PB 7.58 x 2.86 x 2.36 (published 7.56 x 2.83 x 2.31); 70 7.55 x 2.86 x 2.25 (7.535 x
     2.80 x 2.235-2.32); 80 7.67 x 2.93 x 2.46 (7.65 x 2.90 x 2.35-2.46); 82A 7.69 x 2.97 x 2.75 (the 30 mm muzzle
     reaches 0.03 m past the bow; the 82A's height is not published in the references found).
   NOT CONFIRMED (drawn as approximations): the BTR-70's rear-deck slope and its turret station (no square side
     photograph of a BTR-70 was found: taken between the 60PB's and the 80's); the size of the BTR-70 side hatch;
     roof hatch positions on the 70 and 80; the BTR-80 smoke-discharger layout (six 902V, three each side at the
     turret rear); the function of the BTR-80 / 82A rear-roof tube; which side the KPVT sits on in the BPU-1.
     Not drawn: antennas, stowage and canvas, markings, the 82A's add-on kits and jammers.
   Nodes: "turret" (the ring centre on the roof, at rest pointing forward), four "roadwheel" axle groups (local Y
     the axle, both tyres in each).  Materials: paint (canvas texture, planar UVs), dark, glass, lamp, wheel (vertex
     colours: rubber and green hubs), C.team (two small strips on the roof).
   +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.                                                */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBtr8x8 = (function () {
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
  /* canvas paint: one flat coat of Russian green gone patchy with weather, rain streaks down the faces and faint
     panel seams.  Planar UVs at 0.34 a metre (Bin.tri), so the 256 px tile spans about 2.9 m and repeats. */
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
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* rain and dust streaks, running down (v is height on the side faces) */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.06)" : "rgba(214,208,180,0.05)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 18 + R() * 60);
      }
      /* faint panel seams and a few rivet rows */
      q.fillStyle = "rgba(18,18,12,0.16)";
      q.fillRect(0, 86, 256, 2); q.fillRect(0, 214, 256, 2); q.fillRect(118, 0, 2, 256);
      q.fillStyle = "rgba(18,18,12,0.12)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 2, 92, 2, 2); q.fillRect(124, i * 8 + 3, 2, 2); }
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

  /* ---------------------------------------------------------------- the variants */
  /* Station tables: [x, bottom z, bottom hw, knee z, knee hw, chine z, chine hw, roof z, roof hw] (see header).
     The knee is the under-chine shelf that clears the tyre tops (1.10 m); the dark lower hull seen between the
     wheels is drawn by the gap plates (gapPlates). */
  var AX = [2.20, 0.85, -0.85, -2.20], RT = 0.55, TW = 0.36;
  var VAR = {
    b60: { id: "b60", name: "ru_btr60pb", trk: 1.19, tx: 0.75, turret: "bpu", side: "hatch60", deck: -2.10, tube: false,
      S: [[3.84, 1.28, 0.50, 1.31, 0.56, 1.34, 0.64, 1.38, 0.60],
          [3.60, 1.05, 0.40, 1.18, 0.66, 1.31, 0.92, 1.53, 0.80],
          [3.30, 0.80, 0.40, 1.13, 0.80, 1.27, 1.18, 1.73, 0.96],
          [2.95, 0.58, 0.56, 1.11, 0.94, 1.25, 1.36, 1.95, 1.06],
          [2.62, 0.50, 0.76, 1.11, 0.98, 1.24, 1.415, 1.95, 1.10],
          [2.40, 0.50, 0.78, 1.11, 0.98, 1.24, 1.415, 1.95, 1.10],
          [-2.10, 0.50, 0.78, 1.11, 0.98, 1.24, 1.415, 1.95, 1.10],
          [-2.80, 0.50, 0.76, 1.11, 0.97, 1.25, 1.39, 1.74, 1.07],
          [-3.30, 0.60, 0.70, 1.12, 0.94, 1.27, 1.33, 1.57, 1.02],
          [-3.56, 0.84, 0.64, 1.16, 0.86, 1.30, 1.22, 1.46, 0.96],
          [-3.72, 1.10, 0.58, 1.22, 0.72, 1.32, 1.05, 1.38, 0.90]] },
    b70: { id: "b70", name: "ru_btr70", trk: 1.19, tx: 0.80, turret: "bpu", side: "hatch70", deck: -2.50, tube: false,
      S: [[3.80, 1.26, 0.50, 1.29, 0.56, 1.32, 0.64, 1.36, 0.60],
          [3.56, 1.04, 0.40, 1.16, 0.66, 1.29, 0.92, 1.49, 0.80],
          [3.26, 0.80, 0.40, 1.12, 0.80, 1.26, 1.17, 1.65, 0.96],
          [2.92, 0.58, 0.56, 1.11, 0.94, 1.23, 1.35, 1.84, 1.05],
          [2.58, 0.50, 0.76, 1.11, 0.98, 1.22, 1.40, 1.84, 1.09],
          [2.38, 0.50, 0.78, 1.11, 0.98, 1.22, 1.40, 1.84, 1.09],
          [-2.50, 0.50, 0.78, 1.11, 0.98, 1.22, 1.40, 1.84, 1.09],
          [-3.20, 0.56, 0.74, 1.11, 0.96, 1.24, 1.36, 1.68, 1.05],
          [-3.52, 0.80, 0.66, 1.15, 0.88, 1.29, 1.26, 1.56, 0.99],
          [-3.73, 1.10, 0.58, 1.22, 0.74, 1.33, 1.08, 1.46, 0.92]] },
    b80: { id: "b80", name: "ru_btr80", trk: 1.205, tx: 1.05, turret: "b80", side: "door", deck: -3.33, tube: true,
      S: [[3.97, 1.32, 0.52, 1.35, 0.58, 1.38, 0.66, 1.42, 0.62],
          [3.70, 1.08, 0.42, 1.20, 0.70, 1.34, 0.96, 1.52, 0.84],
          [3.36, 0.82, 0.42, 1.15, 0.84, 1.31, 1.22, 1.65, 1.00],
          [3.00, 0.58, 0.58, 1.14, 0.96, 1.28, 1.40, 1.80, 1.10],
          [2.60, 0.50, 0.80, 1.14, 1.00, 1.26, 1.45, 1.92, 1.15],
          [2.45, 0.50, 0.80, 1.14, 1.00, 1.26, 1.45, 1.95, 1.15],
          [-3.10, 0.50, 0.80, 1.14, 1.00, 1.26, 1.45, 1.95, 1.15],
          [-3.33, 0.68, 0.74, 1.15, 0.98, 1.28, 1.42, 1.95, 1.13],
          [-3.55, 0.98, 0.66, 1.22, 0.90, 1.36, 1.32, 1.68, 1.06],
          [-3.68, 1.30, 0.60, 1.36, 0.76, 1.42, 1.14, 1.48, 0.98]] }
  };
  VAR.b82 = { id: "b82", name: "ru_btr82a", trk: 1.205, tx: 1.05, turret: "bppu", side: "door", deck: -3.33, tube: true,
              box: true, S: VAR.b80.S };
  /* paint by period: Soviet protective green for the 60PB / 70 / 80 (the green the Russian T-72 / T-90 heroes
     use, taken a touch greener for the earlier years); the 82A's duller present-day green sampled off photograph
     E (81, 87, 74) and taken to about 0.9 */
  var PAINTS = {
    b60: { base: "#535b3c", blots: ["#4a5235", "#5c6444", "#4f5739"], seed: 60 },
    b70: { base: "#545b3e", blots: ["#4b5237", "#5d6446", "#50573b"], seed: 70 },
    b80: { base: "#50573f", blots: ["#475038", "#595f47", "#4c533c"], seed: 80 },
    b82: { base: "#494f42", blots: ["#41473b", "#52584a", "#454b3f"], seed: 82 }
  };
  var HUB = { b60: lin(0x4c5436), b70: lin(0x4d5437), b80: lin(0x495038), b82: lin(0x43493c) }, RUB = lin(0x1d1d1b);

  function materials(THREE, C, v) {
    var T = {}, P = PAINTS[v.id], tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2b2d27, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2630, roughness: 0.15, metalness: 0.4 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd2ccb0, roughness: 0.3, metalness: 0.2, emissive: 0x1a1810 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.9, metalness: 0.04 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* the station row at x (linear between table rows) */
  function rowAt(S, x) {
    var i, t, o = [], k;
    if (x >= S[0][0]) return S[0].slice();
    for (i = 0; i + 1 < S.length; i++) {
      if (x <= S[i][0] && x >= S[i + 1][0]) {
        t = (S[i][0] - x) / ((S[i][0] - S[i + 1][0]) || 1);
        for (k = 0; k < 9; k++) o.push(S[i][k] + (S[i + 1][k] - S[i][k]) * t);
        return o;
      }
    }
    return S[S.length - 1].slice();
  }
  function ring(r) {
    var x = r[0];
    return [[x, r[2], r[1]], [x, r[4], r[3]], [x, r[6], r[5]], [x, r[8], r[7]],
            [x, -r[8], r[7]], [x, -r[6], r[5]], [x, -r[4], r[3]], [x, -r[2], r[1]]];
  }
  /* the upper flank frame at station x on side s: origin on the chine, W up the plate, N out of it */
  function flank(v, x, s) {
    var r = rowAt(v.S, x), a = r[6] - r[8], b = r[7] - r[5], l = Math.sqrt(a * a + b * b);
    return { P0: [0, s * r[6], r[5]], W: [0, -s * a / l, b / l], N: [0, s * b / l, a / l], len: l, r: r };
  }
  function onFlank(bin, v, s, x0, x1, w0, w1, h0, h1) {
    var f = flank(v, (x0 + x1) / 2, s);
    planeBox(bin, f.P0, [1, 0, 0], f.W, f.N, x0, x1, w0, w1, h0, h1);
  }
  /* a raised panel on the flank with a dark seam round it, so the hatch reads at game zoom */
  function flankPanel(B, v, s, x0, x1, w0, w1, h) {
    onFlank(B.dark, v, s, x0 - 0.03, x1 + 0.03, w0 - 0.03, w1 + 0.03, -0.01, h - 0.012);
    onFlank(B.paint, v, s, x0, x1, w0, w1, -0.01, h);
  }
  function flankPt(v, s, x, w, h) {
    var f = flank(v, x, s);
    return [x, f.P0[1] + f.W[1] * w + f.N[1] * h, f.P0[2] + f.W[2] * w + f.N[2] * h];
  }
  /* ---------------------------------------------------------------- hull */
  function addHull(B, v) {
    var S = v.S, rings = [], i, s, r, x;
    for (i = 0; i < S.length; i++) rings.push(ring(S[i]));
    loft(B.paint, rings, false);
    var mid = rowAt(S, 0), yo = mid[6] - 0.20, yi = mid[6] - 0.34;
    /* the lower hull plates seen between the wheels, cut round each tyre (0.04 m clear) */
    for (i = 0; i + 1 < AX.length; i++) {
      var xa = AX[i], xb = AX[i + 1], P = [], k, t, rr = RT + 0.04, zt = mid[5] + 0.01;
      for (k = 0; k <= 5; k++) { t = (90 + 65 * k / 5) * Math.PI / 180; P.push([xa + rr * Math.cos(t), RT + rr * Math.sin(t)]); }
      for (k = 0; k <= 5; k++) { t = (25 + 65 * k / 5) * Math.PI / 180; P.push([xb + rr * Math.cos(t), RT + rr * Math.sin(t)]); }
      P.push([xb, zt]); P.push([xa, zt]);
      for (s = -1; s <= 1; s += 2) plateY(B.paint, P, s > 0 ? yi : -yo, s > 0 ? yo : -yi);
      /* the bent-bar steps hanging under the chine between the wheels (A, D) */
      var xm = (xa + xb) / 2, yb = mid[6] - 0.16, zb0 = mid[5] - 0.02, zb1 = 0.80;
      for (s = -1; s <= 1; s += 2) {
        bar(B.paint, [xm + 0.14, s * yb, zb0], [xm + 0.05, s * yb, zb1], 0.035);
        bar(B.paint, [xm + 0.05, s * yb, zb1], [xm - 0.05, s * yb, zb1], 0.035);
        bar(B.paint, [xm - 0.05, s * yb, zb1], [xm - 0.14, s * yb, zb0], 0.035);
      }
    }
    /* the half-shafts and suspension arms from the hull side to each wheel hub (independent suspension, so no
       through axle), dark in the shade under the chine */
    for (i = 0; i < AX.length; i++) for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, AX[i], s > 0 ? 0.70 : -v.trk + 0.18, s > 0 ? v.trk - 0.18 : -0.70, RT, 0.09, 8);
      bar(B.dark, [AX[i] - 0.30, s * 0.74, RT + 0.08], [AX[i] - 0.02, s * (v.trk - 0.22), RT + 0.04], 0.07);
    }
    /* the turret ring collar on the roof */
    cylZ(B.paint, v.tx, 0, mid[7] - 0.02, mid[7] + 0.05, 0.70, 28);
    /* tow eyes at the nose foot and the stern */
    for (s = -1; s <= 1; s += 2) {
      r = rowAt(S, S[2][0]);
      cylX(B.dark, S[2][0] - 0.02, S[2][0] + 0.14, s * 0.30, r[1] + 0.08, 0.055, 8);
      r = S[S.length - 2];
      cylX(B.dark, r[0] - 0.14, r[0] + 0.02, s * 0.36, r[1] + 0.12, 0.055, 8);
    }
  }

  /* the trim vane folded flat on the lower front plate, with its frame and two stowage brackets */
  function addVane(B, v) {
    var a = v.S[0], b = v.S[3], U = unit([b[0] - a[0], 0, b[1] - a[1]]), N = [-U[2], 0, U[0]];
    if (N[0] < 0) N = [-N[0], 0, -N[2]];
    var P0 = [a[0] + N[0] * 0.01 - 0.03, 0, a[1] + N[2] * 0.01], L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
    planeBox(B.paint, P0, U, [0, 1, 0], N, 0.02, L * 0.70, -0.66, 0.66, 0.0, 0.04);
    planeBox(B.paint, P0, U, [0, 1, 0], N, 0.02, L * 0.70, -0.66, -0.60, 0.04, 0.065);
    planeBox(B.paint, P0, U, [0, 1, 0], N, 0.02, L * 0.70, 0.60, 0.66, 0.04, 0.065);
    planeBox(B.paint, P0, U, [0, 1, 0], N, 0.02, 0.08, -0.66, 0.66, 0.04, 0.065);
    planeBox(B.dark, P0, U, [0, 1, 0], N, L * 0.30, L * 0.36, -0.50, -0.38, -0.04, 0.10);
    planeBox(B.dark, P0, U, [0, 1, 0], N, L * 0.30, L * 0.36, 0.38, 0.50, -0.04, 0.10);
  }

  /* the upper front plate: the driver's (left) and commander's (right) armoured hatches with three B-1 vision
     blocks each (ru.wiki BTR-60), the headlamps in their guards at the corners */
  function addFront(B, v) {
    var S = v.S, f = null, k;
    for (k = 1; k < S.length; k++) if (S[k][7] >= S[k - 1][7] - 1e-6 && Math.abs(S[k][7] - S[k + 1][7]) < 1e-6) { f = S[k]; break; }
    var n = S[1], U = unit([n[0] - f[0], 0, n[7] - f[7]]), N = [-U[2], 0, U[0]], P0 = [f[0], 0, f[7]], W = [0, 1, 0], s;
    if (N[2] < 0) N = [U[2], 0, -U[0]];
    var L = Math.sqrt((n[0] - f[0]) * (n[0] - f[0]) + (n[7] - f[7]) * (n[7] - f[7]));
    for (s = -1; s <= 1; s += 2) {
      var w0 = s > 0 ? 0.08 : -0.68, w1 = s > 0 ? 0.68 : -0.08, j;
      planeBox(B.paint, P0, U, W, N, 0.10, Math.min(L * 0.80, 0.86), w0, w1, -0.01, 0.045);
      planeBox(B.dark, P0, U, W, N, 0.10, 0.16, w0 + 0.04, w1 - 0.04, 0.045, 0.075);        /* hinge */
      for (j = 0; j < 3; j++) {
        var wc = (w0 + w1) / 2 + (j - 1) * 0.18;
        planeBox(B.paint, P0, U, W, N, 0.18, 0.28, wc - 0.07, wc + 0.07, 0.04, 0.10);
        planeBox(B.glass, P0, U, W, N, 0.275, 0.285, wc - 0.055, wc + 0.055, 0.055, 0.09);
      }
    }
    /* the headlamps at the front corners, each in a tubular guard */
    var lx = f[0] + (n[0] - f[0]) * 0.55, rr = rowAt(S, lx), lz = rr[7], ly = rr[8] - 0.14;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, lx - 0.06, lx + 0.06, s * ly - 0.05, s * ly + 0.05, lz - 0.04, lz + 0.10);
      cylX(B.dark, lx - 0.04, lx + 0.10, s * ly, lz + 0.17, 0.095, 12);
      cylX(B.lamp, lx + 0.10, lx + 0.12, s * ly, lz + 0.17, 0.08, 12);
      bar(B.dark, [lx - 0.02, s * (ly - 0.13), lz], [lx + 0.20, s * (ly - 0.13), lz + 0.30], 0.03);
      bar(B.dark, [lx - 0.02, s * (ly + 0.13), lz - 0.02], [lx + 0.20, s * (ly + 0.13), lz + 0.30], 0.03);
      bar(B.dark, [lx + 0.20, s * (ly - 0.13), lz + 0.30], [lx + 0.20, s * (ly + 0.13), lz + 0.30], 0.03);
    }
    return { xf: f[0], P0: P0, U: U, N: N };
  }

  /* roof hatches, ports, rails, decks: what differs between the four */
  function addRoofAndFlanks(B, v, fr) {
    var S = v.S, mid = rowAt(S, 0), zr = mid[7], s, i, x;
    /* driver's and commander's roof hatches right behind the upper front plate (half-round on the 60PB and 70,
       ru.wiki; round on the 80 / 82A, F) */
    for (s = -1; s <= 1; s += 2) {
      var hx = fr.xf - 0.34, hy = s * 0.46, pts = [];
      if (v.turret === "bpu") {
        for (i = 0; i <= 8; i++) { var t = Math.PI / 2 + i / 8 * Math.PI; pts.push([hx + 0.22 + 0.30 * Math.cos(t), hy + 0.30 * Math.sin(t)]); }
        prism(B.paint, pts, zr - 0.01, zr + 0.06);
        box(B.dark, hx + 0.18, hx + 0.24, hy - 0.22, hy + 0.22, zr + 0.06, zr + 0.09);
      } else {
        cylZ(B.paint, hx, hy, zr - 0.01, zr + 0.065, 0.27, 16);
        cylZ(B.dark, hx + 0.20, hy, zr + 0.065, zr + 0.10, 0.04, 6);
      }
    }
    /* troop roof hatches: diagonal on the 60PB (ru.wiki), side by side behind the turret on the others */
    var TH = v.id === "b60" ? [[-0.05, -0.55, 0.20, 0.72], [-0.92, -1.42, -0.72, -0.20]]
                            : [[-0.40, -0.92, 0.16, 0.70], [-0.40, -0.92, -0.70, -0.16]];
    for (i = 0; i < TH.length; i++) {
      box(B.paint, TH[i][1], TH[i][0], TH[i][2], TH[i][3], zr - 0.01, zr + 0.05);
      box(B.dark, TH[i][1] + 0.04, TH[i][1] + 0.09, TH[i][2] + 0.05, TH[i][3] - 0.05, zr + 0.05, zr + 0.08);
      box(B.dark, (TH[i][0] + TH[i][1]) / 2 - 0.05, (TH[i][0] + TH[i][1]) / 2 + 0.05, (TH[i][2] + TH[i][3]) / 2 - 0.10, (TH[i][2] + TH[i][3]) / 2 + 0.10, zr + 0.05, zr + 0.08);
    }
    /* the OU-3 searchlight on a post in front of the commander (B, C) */
    if (v.turret === "bpu") {
      x = fr.xf - 0.10;
      cylZ(B.dark, x, -0.86, zr, zr + 0.16, 0.03, 6);
      cylX(B.dark, x - 0.12, x + 0.10, -0.86, zr + 0.24, 0.10, 12);
      cylX(B.lamp, x + 0.10, x + 0.12, -0.86, zr + 0.24, 0.085, 12);
    }
    /* firing ports (round covers) and grab rails along the upper flank */
    var PX = v.id === "b60" ? [0.45, -0.97, -2.05] : (v.id === "b70" ? [1.70, -0.75, -1.55] : [1.75, -1.30, -2.00]);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < PX.length; i++) {
        var c = flank(v, PX[i], s), A = flankPt(v, s, PX[i], 0.40, 0.0), Bp = flankPt(v, s, PX[i], 0.40, 0.05);
        cyl(B.paint, A, Bp, 0.085, 0.07, 10);
      }
      var RX = v.id === "b60" ? [[2.10, 1.45], [0.38, -0.24], [-1.01, -1.67]] : [[2.05, 1.30], [-1.05, -1.95]];
      for (i = 0; i < RX.length; i++) {
        var p0 = flankPt(v, s, RX[i][0], 0.18, 0.07), p1 = flankPt(v, s, RX[i][1], 0.18, 0.07);
        bar(B.dark, p0, p1, 0.028);
        bar(B.dark, p0, flankPt(v, s, RX[i][0], 0.18, 0.0), 0.028);
        bar(B.dark, p1, flankPt(v, s, RX[i][1], 0.18, 0.0), 0.028);
      }
    }
    /* the side entries */
    var yo = mid[6] - 0.20;
    for (s = -1; s <= 1; s += 2) {
      if (v.side === "hatch60") {                     /* rectangular hatch high in each flank by the turret */
        flankPanel(B, v, s, 0.62, 1.32, 0.24, 0.60, 0.035);
        onFlank(B.dark, v, s, 0.70, 1.24, 0.56, 0.60, 0.035, 0.06);
        onFlank(B.dark, v, s, 0.92, 1.02, 0.34, 0.38, 0.035, 0.07);
      } else if (v.side === "hatch70") {             /* the small two-leaf hatch low between axles 2 and 3 */
        flankPanel(B, v, s, -0.32, 0.22, 0.05, 0.34, 0.035);
        onFlank(B.dark, v, s, -0.28, 0.18, 0.30, 0.34, 0.035, 0.06);
        box(B.dark, -0.35, 0.25, s > 0 ? yo - 0.01 : -yo - 0.025, s > 0 ? yo + 0.025 : -yo + 0.01, 0.85, mid[5] - 0.01);
        box(B.paint, -0.32, 0.22, s > 0 ? yo : -yo - 0.04, s > 0 ? yo + 0.04 : -yo, 0.88, mid[5] - 0.04);
        box(B.dark, -0.10, 0.00, s > 0 ? yo + 0.04 : -yo - 0.07, s > 0 ? yo + 0.07 : -yo - 0.04, 1.02, 1.08);
      } else {                                       /* the BTR-80's big two-leaf door: upper leaf, lower step */
        flankPanel(B, v, s, -0.38, 0.38, 0.05, 0.58, 0.035);
        onFlank(B.dark, v, s, -0.34, 0.34, 0.54, 0.58, 0.035, 0.06);
        onFlank(B.dark, v, s, 0.20, 0.30, 0.26, 0.30, 0.035, 0.075);
        var dp = flankPt(v, s, 0.0, 0.30, 0.035), dq = flankPt(v, s, 0.0, 0.30, 0.09);
        cyl(B.paint, dp, dq, 0.07, 0.06, 10);         /* the firing port in the upper leaf (D) */
        box(B.dark, -0.39, 0.39, s > 0 ? yo - 0.01 : -yo - 0.025, s > 0 ? yo + 0.025 : -yo + 0.01, 0.83, mid[5] - 0.01);
        box(B.paint, -0.36, 0.36, s > 0 ? yo : -yo - 0.04, s > 0 ? yo + 0.04 : -yo, 0.86, mid[5] - 0.04);
        box(B.dark, -0.06, 0.06, s > 0 ? yo + 0.04 : -yo - 0.07, s > 0 ? yo + 0.07 : -yo - 0.04, 0.98, 1.04);
      }
    }
    /* the engine deck: louvres down the 60PB / 70 sloping deck, flat grilles on the 80 / 82A roof */
    if (v.deck > -3.0) {
      var d0 = rowAt(S, v.deck - 0.20), d1 = rowAt(S, S[S.length - 2][0] + 0.12), n = Math.max(4, Math.round((d0[0] - d1[0]) / 0.19));
      for (i = 0; i < n; i++) {
        var tt = (i + 0.5) / n, xx = d0[0] + (d1[0] - d0[0]) * tt, rz = rowAt(S, xx)[7];
        box(B.dark, xx - 0.05, xx + 0.05, -0.72, 0.72, rz - 0.01, rz + 0.03);
      }
      box(B.dark, d0[0] - 0.05, d0[0] + 0.03, -0.80, 0.80, d0[7] - 0.01, d0[7] + 0.05);
    } else {
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, -3.22, -2.12, s > 0 ? 0.10 : -0.70, s > 0 ? 0.70 : -0.10, zr - 0.01, zr + 0.015);
        for (i = 0; i < 9; i++) box(B.paint, -3.20 + i * 0.12, -3.16 + i * 0.12, s > 0 ? 0.10 : -0.70, s > 0 ? 0.70 : -0.10, zr + 0.015, zr + 0.05);
      }
      box(B.paint, -3.26, -2.08, -0.06, 0.06, zr - 0.01, zr + 0.06);
    }
    /* the long tube on the left rear roof of the 80 / 82A (D, E, F; what it holds is not confirmed) */
    if (v.tube) {
      cylX(B.paint, -3.28, -1.70, 0.84, zr + 0.15, 0.12, 14);
      cylX(B.dark, -3.31, -3.28, 0.84, zr + 0.15, 0.10, 14);
      box(B.paint, -3.05, -2.95, 0.74, 0.94, zr - 0.01, zr + 0.06);
      box(B.paint, -1.98, -1.88, 0.74, 0.94, zr - 0.01, zr + 0.06);
    }
    /* the 82A's stowage box high on the right rear flank (E) */
    if (v.box) onFlank(B.paint, v, -1, -2.78, -1.98, 0.16, 0.52, 0.0, 0.13);
    /* the waterjet outlet low in the stern plate */
    var tr = S[S.length - 1], tr2 = S[S.length - 2];
    cylX(B.dark, tr2[0] - 0.02, tr2[0] + 0.03, 0, (tr2[1] + tr2[3]) / 2 + 0.06, 0.20, 14);
    /* tail lamps */
    for (s = -1; s <= 1; s += 2) box(B.lamp, tr[0] - 0.02, tr[0] + 0.03, s * (tr[8] - 0.12) - 0.06, s * (tr[8] - 0.12) + 0.06, tr[7] - 0.10, tr[7] - 0.04);
    /* C.team: two small up-facing strips along the roof edges behind the troop hatches */
    var tx0 = v.tube ? -1.60 : -2.00, tx1 = v.tube ? -0.70 : -1.05;
    for (s = -1; s <= 1; s += 2) box(B.team, tx0, tx1, s > 0 ? 0.80 : -1.02, s > 0 ? 1.02 : -0.80, zr + 0.01, zr + 0.03);
  }

  /* ---------------------------------------------------------------- turrets (local: ring centre, roof at 0) */
  function kpvtPkt(B, gx, gz, kpvtLen) {
    box(B.paint, gx - 0.06, gx + 0.22, -0.24, 0.26, gz - 0.12, gz + 0.11);                   /* mantlet */
    cylX(B.dark, gx + 0.18, gx + 0.66, 0.09, gz, 0.062, 12);                                  /* KPVT jacket */
    cylX(B.dark, gx + 0.66, gx + kpvtLen, 0.09, gz, 0.033, 10);                               /* KPVT barrel */
    cylX(B.dark, gx + kpvtLen, gx + kpvtLen + 0.07, 0.09, gz, 0.042, 10);                      /* flash hider */
    cylX(B.dark, gx + 0.18, gx + 0.52, -0.13, gz - 0.03, 0.02, 8);                             /* PKT */
  }
  function bpuTurret(B) {
    /* the BPU-1: a low truncated cone with a flat top and no hatch (A, B, C) */
    lathe(B.paint, [[0.0, 0.62], [0.08, 0.61], [0.29, 0.45], [0.345, 0.38], [0.36, 0.32]], 0, 0, 24, true);
    kpvtPkt(B, 0.46, 0.18, 1.30);
    box(B.paint, 0.06, 0.24, -0.34, -0.16, 0.29, 0.38);                                       /* PP-61AM sight head */
    box(B.glass, 0.24, 0.25, -0.31, -0.19, 0.31, 0.36);
    box(B.glass, -0.22, -0.10, 0.14, 0.24, 0.33, 0.38);                                        /* vision block */
  }
  function b80Turret(B) {
    /* the BTR-80's turret: the same family of cone, taller, the KPVT laid to 60 deg, the 1P3-9 sight, 902V */
    lathe(B.paint, [[0.0, 0.66], [0.10, 0.65], [0.34, 0.48], [0.42, 0.41], [0.44, 0.35]], 0, 0, 24, true);
    kpvtPkt(B, 0.50, 0.22, 1.36);
    box(B.paint, 0.04, 0.26, -0.38, -0.16, 0.36, 0.48);                                       /* 1P3-9 sight head */
    box(B.glass, 0.26, 0.27, -0.35, -0.19, 0.39, 0.46);
    box(B.glass, -0.24, -0.12, 0.14, 0.26, 0.41, 0.46);
    smoke(B, -0.28, 0.54, 0.26, 0.50);
  }
  /* three 902V tubes on each side, laid forward and up */
  function smoke(B, x, y, z, el) {
    var s, i, c = Math.cos(el), sn = Math.sin(el);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, x - 0.10, x + 0.10, s * y - 0.16, s * y + 0.16, z - 0.06, z - 0.02);
      for (i = 0; i < 3; i++) {
        var yy = s * y + (i - 1) * 0.095, A = [x - 0.06, yy, z], E = [x - 0.06 + 0.24 * c, yy, z + 0.24 * sn];
        cyl(B.dark, A, E, 0.038, 0.038, 8);
      }
    }
  }
  function bppuTurret(B) {
    /* the BPPU: an angular, flat-faced body (E, F) */
    var bot = mirrorPlan([[0.70, 0.40], [0.46, 0.76], [-0.66, 0.78], [-0.82, 0.48]]);
    var top = mirrorPlan([[0.54, 0.32], [0.34, 0.60], [-0.56, 0.62], [-0.70, 0.40]]);
    frust(B.paint, bot, top, 0.0, 0.48);
    /* the armoured gun housing on the front, the 2A72 and the PKTM */
    var hb = mirrorPlan([[0.84, 0.20], [0.80, 0.24], [0.28, 0.26]]), ht = mirrorPlan([[0.74, 0.17], [0.70, 0.21], [0.28, 0.23]]);
    var i;
    for (i = 0; i < hb.length; i++) { hb[i] = [hb[i][0], hb[i][1] + 0.03]; ht[i] = [ht[i][0], ht[i][1] + 0.03]; }
    frust(B.paint, hb, ht, 0.16, 0.50);
    cylX(B.dark, 0.80, 1.18, 0.05, 0.34, 0.068, 12);                                            /* 2A72 receiver jacket */
    cylX(B.dark, 1.18, 2.84, 0.05, 0.34, 0.035, 10);                                            /* 30 mm barrel */
    cylX(B.dark, 2.84, 2.94, 0.05, 0.34, 0.046, 10);                                            /* muzzle device */
    cylX(B.dark, 0.74, 1.04, -0.17, 0.27, 0.02, 8);                                             /* PKTM */
    /* the TKN-4GA sight box at the rear left of the roof, its window facing forward (E, F) */
    box(B.paint, -0.70, -0.24, 0.10, 0.52, 0.46, 0.74);
    box(B.glass, -0.24, -0.23, 0.16, 0.46, 0.56, 0.69);
    box(B.paint, -0.66, -0.28, 0.14, 0.48, 0.74, 0.77);
    /* commander's vision blocks and the small sight on the right */
    box(B.paint, -0.10, 0.14, -0.48, -0.26, 0.46, 0.58);
    box(B.glass, 0.14, 0.15, -0.45, -0.29, 0.49, 0.56);
    smoke(B, 0.38, 0.70, 0.38, 0.30);
  }

  /* ---------------------------------------------------------------- wheels */
  /* a 13.00-18 cross-country tyre on the Y axis centred at (0, yc, 0), chevron lugs, and its painted disc wheel
     with the tyre-pressure hub (A, D, E show the hub and the dished disc) */
  function wheel(VB, yc, s, ph, hub) {
    var N = 22, hw = TW / 2, prof = [[0.58, -1.0, 0], [0.70, -1.0, 0], [0.86, -0.97, 0], [0.96, -0.80, 0], [1.0, -0.42, 1],
                                     [1.0, 0.42, 2], [0.96, 0.80, 0], [0.86, 0.97, 0], [0.70, 1.0, 0], [0.58, 1.0, 0]];
    var V = [], F = [], i, j, k, m = prof.length, r, a;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = prof[i][0] * RT;
      if (prof[i][2] && ((j + prof[i][2]) % 2)) r -= 0.045;
      a = (j + ph) / N * TAU;
      V.push([r * Math.cos(a), yc + prof[i][1] * hw, r * Math.sin(a)]);
    }
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N; var i2 = (i + 1) % m;
      F.push([i * N + j, i * N + k, i2 * N + k], [i * N + j, i2 * N + k, i2 * N + j]);
    }
    VB.col = RUB;
    solid(VB, V, F, true);
    VB.col = hub;
    var yf = yc + s * hw * 0.78;
    cyl(VB, [0, yf, 0], [0, yc - s * hw * 0.78, 0], 0.585 * RT, 0.585 * RT, 18);               /* the disc wheel */
    cyl(VB, [0, yf, 0], [0, yf + s * 0.012, 0], 0.50 * RT, 0.50 * RT, 18);                    /* its raised rim  */
    cyl(VB, [0, yf, 0], [0, yf + s * 0.10, 0], 0.16, 0.12, 12);                               /* the hub (tyre-pressure head) */
    for (i = 0; i < 6; i++) {
      a = i / 6 * TAU;
      bar(VB, [0.12 * Math.cos(a), yf + s * 0.02, 0.12 * Math.sin(a)], [0.27 * Math.cos(a), yf + s * 0.02, 0.27 * Math.sin(a)], 0.035);
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(v, THREE, C) {
    var T = materials(THREE, C, v), g = new THREE.Group(), i, wg, geo, VB, s;
    g.name = v.name;
    var B = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
              lamp: new Bin(T.lamp, false), team: new Bin(T.team, false) };
    addHull(B, v);
    addVane(B, v);
    var fr = addFront(B, v);
    addRoofAndFlanks(B, v, fr);
    flush(THREE, g, B);
    /* four turning axle groups, both tyres in each */
    for (i = 0; i < AX.length; i++) {
      VB = new VBin(T.wheel);
      wheel(VB, v.trk, 1, 0, HUB[v.id]);
      wheel(VB, -v.trk, -1, 0.5, HUB[v.id]);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(VB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(VB.N), 3));
      geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VB.C), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, RT);
      wg.add(new THREE.Mesh(geo, T.wheel));
      g.add(wg);
    }
    /* the turret on its ring, at rest forward */
    var TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
    if (v.turret === "bpu") bpuTurret(TB); else if (v.turret === "b80") b80Turret(TB); else bppuTurret(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(v.tx, 0, rowAt(v.S, 0)[7] + 0.03);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }

  return { b60: function (t, m, c) { return build(VAR.b60, t, c); },
           b70: function (t, m, c) { return build(VAR.b70, t, c); },
           b80: function (t, m, c) { return build(VAR.b80, t, c); },
           b82: function (t, m, c) { return build(VAR.b82, t, c); } };
})();

/* len is the measured X extent of each: nose (the folded vane) to stern; the 82A's 30 mm muzzle just past the bow */
UNIT_MODELS["pact_e60_btr60"] = { len: 7.58, build: HeroRuBtr8x8.b60 };
UNIT_MODELS["pact_e80_btr70"] = { len: 7.55, build: HeroRuBtr8x8.b70 };
UNIT_MODELS["pact_e90_btr80"] = { len: 7.67, build: HeroRuBtr8x8.b80 };
UNIT_MODELS["pact_e00_btr82a"] = { len: 7.69, build: HeroRuBtr8x8.b82 };
