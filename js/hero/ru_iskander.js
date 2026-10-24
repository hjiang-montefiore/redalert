/* ============ ru_iskander.js - HERO model: 9K720 Iskander-M on the 9P78-1 TEL (MZKT-7930 8x8) ============
   Two rows, one launcher (the same 9P78-1 in both: no variant difference is published or photographed):
     pact_e00_tel   "9K720 Iskander-M, 9P78-1 TEL"   (2006)
     tel_p          "9K720 Iskander-M, 9P78-1 TEL"   (the generic pact row, from e20)
   The Bal and Bastion-P coastal rows (js/eras.js) borrow this model through modelAs:"pact_e00_tel" until their own lands.
   Do NOT confuse with pact_e80_tel / pact_e90_tel (the Tochka, js/hero/ru_tochka.js).

   References (Wikimedia Commons, Category:9P78-1; fetched at 960 px for this model):
     ra  "9P78-1 TEL Iskander-M.JPG"            high front three-quarter, Moscow parade: the roof, the cab roof, the fixed section
     rb  "Iskander demo Army-2016.jpg"          a true side view, deployed, a round upright: the SIDE STATIONS below
     rc  "CombatLaunching2018-05/-07.jpg"        field, plain green, deployed: rails, ladder, jacks, opened cover
     rd  "2013 Moscow Victory Day Parade (45).jpg"   head-on: the cab front
     re  "2011 Moscow Victory Day Parade (358-31).jpg", "2008 Moscow Victory Day Parade - Iskander-M.jpg",
         "Alabino05042017-51.jpg"               side three-quarters, travel: the cover, doors, tanks
     ru.wikipedia "MZKT-7930": length 12,669 mm, width 3,070, height 3,017; tyres 1500x600-635; fuel 2 x 385 l;
     ground clearance 400 mm.  The 9M723 round, 7.3 m (en.wikipedia "9K720 Iskander"), as the earlier model had it.

   Recognition list (each is drawn; where it rests):
     1. A long flat-sided box body behind the cab with a SLOPED HIP BAND between the vertical walls and the flat roof
        (rb, ra, rc-05, re: every view).
     2. The roof cover in two leaves meeting on the centre line, transverse panel joints about 1.1 m apart and two long
        raised strips on each leaf (ra).
     3. The fixed roof section between cover and cab: horizontal louvres down its hip band, a mesh vent panel on the right,
        a round flat-topped dome on the left, two antenna posts at the front corners (ra, rc-05).
     4. The forward-control cab, flat front with chamfered vertical corners, as wide as the body and a little lower than its
        roof (rb, rd), two compartments under one roof (ra).
     5. Three equal flat windscreen panes 0.84 m wide, a frame head with rain strips, a louvred panel below (rd).
     6. A bumper across the full width with round headlamps, outboard indicators, side lamps, dark plates and a tow hook (rd).
     7. The cab roof: two lamps on the front corners, a whip antenna on the left, a recess with two hatches, a raised box on
        the right rear (ra; its near side is the starboard side).
     8. A big-windowed crew door each side, a second window on the left (re 2011, the port side), steps ahead of the front tyres, big mirrors (rb, re).
     9. Eight 1500x600-635 lugged tyres on dished wheels, in two pairs: 2.08 m, 3.51 m, 2.03 m apart (rb; ru.wikipedia).
    10. The 385-litre tanks between the pairs, mudguard plates and flaps over each pair (re 2008, rb).
    11. Deployed: two stabiliser jack pairs in the pair gaps (rb shows both down), the folding guard rails up along the roof
        edges, a boarding ladder on the right (rc-05/-07, both of the starboard side); the rounds erect about the rear of the body, upright (rb).

   SIDE STATIONS (rb, scaled to the published 12.669 m): bumper +6.335; cab front face +6.18; crew-door window 5.15-5.72;
   compartment joint 4.50; cab rear +3.24; fixed roof section 3.24 to 2.22; cover 2.22 to the rear plate -6.335.
   Axles +3.88, +1.80, -1.71, -3.74.  Heights: tyre top 1.44; body underside 1.50; wall top (hip foot) 2.82; roof 3.10;
   cab roof 2.90 (rb 2.82, rd 3.0; the published 3.017 m chassis height counts the roof fittings); windscreen 1.88-2.64.
   CROSS-SECTION (rd, ra): walls at +-1.535 (3.07 m published), the hip leaning in to +-1.27 at the roof; the cab the same
   width, its front corners chamfered 0.14 m and its roof edge 0.12 m.
   The earlier model was 12.0 m long on a 1.36 m tyre; rb puts the wheels and the overhangs on the published 12.669 m.

   Poses: the roof cover is drawn twice, shut in "travelpose" and in "deploypose" with its two leaves swung over their outer
   hinges and down at 50 degrees past the horizontal, lying along the hip band with their edges standing out below it (rc-05
   shows thin plates standing out at the foot of the hip band and the walls uncovered; how far the leaves really swing is NOT
   confirmed).  The deploy pose also has the two jack pairs down (x -2.75, +2.80, rb: -2.82, +2.73), the guard rails
   (posts 1.1 m apart, 1.0 m high, rc-05) and the ladder on the right (rc-07).  The engine raises both rounds together on one group
   "podelev" about the hinge at the rear of the body (the real launcher erects them one at a time); userData.cells holds one
   nozzle a round.  A round raised before the unit has deployed rises through the shut cover (risk, as before).
   Paint: plain Russian green, sampled off re 2011 (#4d4d3e in shade) and rc-07 (#43443d, overcast); drawn #4a543e (about 0.9 of a lit
   wall, less yellow than the earlier #48553a) on a canvas texture of weathered blotches, faint 0.98 m panel seams with rivet
   rows and rain streaks; the wheels painted the same green (ra, rb) by vertex colour.  The 2008 parade's three-colour camouflage (re 2008) is NOT drawn: it is a parade finish, as the
   S-400 hero treats the 2009-10 parade camouflage.  NOT drawn: the parade stripes and star, the white squares and tactical
   numbers, the loader crane (a separate TZM), the cab interior, the antenna above 2 m (it runs out of every frame).
   Nodes: eight "roadwheel" groups, "podelev", "travelpose", "deploypose"; NOTHING named "turret" (turret:false).
   Budget: 11,660 triangles in travel pose, 12,196 deployed; 15 draw calls in travel, 16 deployed; 6 materials (paint with
   its canvas texture, dark, glass, tyre with vertex colours, missile paint, C.team on two small strips on the cab roof).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroIskander = (function () {
  "use strict";

  var PAINT = { base: "#4a543e", blots: ["#404936", "#535e45", "#454f3a"], seed: 7930 };
  /* Side stations off Army-2016 (rb), scaled to the published 12.669 m chassis length (41.6 px/m):
     axle pairs 2.08 and 2.03 m apart, 3.51 m between the pairs; the cab 2.94 m long behind a 0.15 m bumper, a fixed roof
     section 1.02 m long behind it, the cover over the rest; tyre 1.44 m over the tread (published 1500x600-635, loaded) */
  var AXL = [3.88, 1.80, -1.71, -3.74], TY = 1.21, RT = 0.72;   /* axle x, tyre centre half track, loaded tyre radius */
  var HX = -5.85, HZ = 2.12, EL = 1.57;     /* the rounds' hinge (world) at the rear of the body; upright, as Army-2016 shows */
  var X0 = -6.335, XB = 2.22, XC = 3.24, XF = 6.18, XS = 6.27, X1 = 6.335;   /* body rear, cover/fixed-roof joint, cab rear, cab front face, bumper face, tow hook */
  var HW = 1.535, ZB = 1.50, ZW = 2.82, ZR = 3.10, RW = 1.27;   /* half width (3.07 published), body bottom, wall top (the hip band's foot), roof, roof half width */
  var ZC = 2.90;                                   /* cab roof: 2.82 on rb, 3.0 on the front view; 3.017 m published over the roof fittings */
  var COVER_OPEN = 230 * Math.PI / 180;           /* the leaves swung over their outer hinges and down onto the hip band, their edges standing
                                                      out below it (CombatLaunching2018-05); how far they swing is not published */
  var JX = [-2.75, 2.80];                          /* the stabiliser jacks: in the gap of each axle pair (Army-2016, both down at -2.82 and 2.73) */
  var RY = 0.72;                                   /* the two rounds at y = +-RY */


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
    T.msl = new THREE.MeshStandardMaterial({ color: 0x5f6c48, roughness: 0.55, metalness: 0.25 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), team: new Bin(T.team, false) };
  }

  /* the 1500x600-635 cross-country tyre (ru.wikipedia MZKT-7930), loaded to 0.72 m: two lanes of lugs a half
     step apart over the crown, a dished wheel with a raised hub and four bolts each side (ra, rc) */
  function tyre(bin, rim) {
    var N = 28, R = [[-0.29, 0.33, 0, 0], [-0.29, 0.60, 0, 0], [-0.25, 0.70, 1, 0], [-0.03, 0.72, 1, 0],
                     [0.03, 0.72, 1, 1], [0.25, 0.70, 1, 1], [0.29, 0.60, 0, 0], [0.29, 0.33, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.035;
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
      cyl(rim, [0, k * 0.27, 0], [0, k * 0.21, 0], 0.34, 0.30, 18, true, false);   /* the wheel dish, its rim proud of the sidewall */
      cylY(rim, 0, k * 0.21, k * 0.33, 0, 0.14, 10);                               /* the hub */
      for (i = 0; i < 4; i++) {
        a = i / 4 * TAU + 0.4;
        box(rim, 0.22 * Math.cos(a) - 0.025, 0.22 * Math.cos(a) + 0.025, k * 0.27 - 0.02, k * 0.27 + 0.02, 0.22 * Math.sin(a) - 0.025, 0.22 * Math.sin(a) + 0.025);
      }
    }
  }

  function lin(n) {
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }
  function side(bin, s, x0, x1, z0, z1, y, t) {      /* a thin plate on a side face at y = s*|y|, standing out by t */
    box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1);
  }
  /* the hip band runs from the wall top (HW, ZW) to the roof edge (RW, ZR); a point on it at fraction f up, d out of it */
  var HIP_N = (function () { var dy = HW - RW, dz = ZR - ZW, l = Math.sqrt(dy * dy + dz * dz); return [dz / l, dy / l]; })();
  function hipPt(s, x, f, d) {
    return [x, s * (HW + (RW - HW) * f + HIP_N[0] * d), ZW + (ZR - ZW) * f + HIP_N[1] * d];
  }
  function hipStrip(bin, s, x0, x1, f0, f1, d0, d1) {     /* a strip lying on the hip band */
    hexa(bin, [hipPt(s, x0, f0, d0), hipPt(s, x1, f0, d0), hipPt(s, x1, f1, d0), hipPt(s, x0, f1, d0),
               hipPt(s, x0, f0, d1), hipPt(s, x1, f0, d1), hipPt(s, x1, f1, d1), hipPt(s, x0, f1, d1)]);
  }

  /* The body: an open-topped box, wall tops at 2.82 m, a hip band leaning in to the roof edge at 3.10 (rb, ra, rc -05:
     every photograph shows the sloped band between the vertical wall and the flat roof), floor at 1.62 */
  function bodyRing(x) {
    return [[x, -1.30, ZB], [x, 1.30, ZB], [x, HW, ZB + 0.08], [x, HW, ZW], [x, RW, ZR], [x, RW - 0.07, ZR],
            [x, RW - 0.07, ZR - 0.06], [x, HW - 0.10, ZW - 0.02], [x, HW - 0.10, 1.62], [x, -HW + 0.10, 1.62],
            [x, -HW + 0.10, ZW - 0.02], [x, -RW + 0.07, ZR - 0.06], [x, -RW + 0.07, ZR], [x, -RW, ZR], [x, -HW, ZW], [x, -HW, ZB + 0.08]];
  }
  /* the fixed roof section between the cover and the cab: the same hip, a closed roof */
  function fixedRing(x) {
    return [[x, -1.30, ZB], [x, 1.30, ZB], [x, HW, ZB + 0.08], [x, HW, ZW], [x, RW, ZR], [x, -RW, ZR], [x, -HW, ZW], [x, -HW, ZB + 0.08]];
  }
  /* the cab: vertical sides, the roof edge chamfered; hw and the roof drawn in at the front for the corner chamfers */
  function cabRing(x, hw, top, z0) {
    return [[x, -hw + 0.05, z0], [x, hw - 0.05, z0], [x, hw, z0 + 0.05], [x, hw, top - 0.12], [x, hw - 0.12, top],
            [x, -hw + 0.12, top], [x, -hw, top - 0.12], [x, -hw, z0 + 0.05]];
  }

  function addHull(B) {
    var s, i, k, x, a, f;
    /* ---- body: the open box from the rear plate to the fixed roof, its rear plate, the fixed roof section ---- */
    loft(B.paint, [bodyRing(X0 + 0.14), bodyRing(XB)], false);
    box(B.paint, X0 + 0.08, X0 + 0.14, -HW, HW, ZB + 0.04, ZW);                  /* the rear plate */
    loft(B.paint, [fixedRing(XB), fixedRing(XC)], false);
    /* rear plate: lamp clusters, a tow eye, a step rung (r_top34 rear, rc) */
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, X0 + 0.05, X0 + 0.08, s * 1.25 - 0.12, s * 1.25 + 0.12, 1.62, 1.72);
      box(B.dark, X0 + 0.03, X0 + 0.08, s * 1.25 - 0.16, s * 1.25 + 0.16, 1.58, 1.62);
    }
    box(B.dark, X0 + 0.01, X0 + 0.14, -0.20, 0.20, 1.10, 1.30);
    bar(B.dark, [X0 + 0.025, -0.6, 1.58], [X0 + 0.025, 0.6, 1.58], 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* wall panel seams and compartment door frames: vertical seams every 1.10 m and one horizontal stiffener (ra, rc) */
      for (i = 0; i < 8; i++) {
        x = -5.75 + i * 1.10;
        box(B.dark, x, x + 0.025, s > 0 ? HW : -HW - 0.012, s > 0 ? HW + 0.012 : -HW, ZB + 0.12, ZW - 0.05);
        hipStrip(B.dark, s, x, x + 0.025, 0.03, 0.97, 0, 0.012);
      }
      side(B.paint, s, X0 + 0.15, XB - 0.10, 2.22, 2.27, HW, 0.03);
      side(B.paint, s, X0 + 0.08, XC, ZB + 0.06, ZB + 0.14, HW, 0.03);             /* the bottom rail */
      side(B.paint, s, X0 + 0.08, XB, ZW - 0.04, ZW + 0.02, HW, 0.025);              /* the rail at the hip's foot */
      /* compartment doors with their handles: two low in the wall over each axle gap (rc -05 shows them open) */
      for (i = 0; i < 2; i++) {
        x = i ? 0.10 : -3.30;
        side(B.dark, s, x, x + 1.05, 1.66, 1.68, HW, 0.014);
        side(B.dark, s, x, x + 1.05, 2.14, 2.16, HW, 0.014);
        side(B.dark, s, x + 0.47, x + 0.58, 1.86, 1.92, HW, 0.03);
      }
      /* the forward fixed section: horizontal louvres down its hip band (ra, rc -05), a seam at each end */
      for (i = 0; i < 6; i++) {
        f = 0.10 + i * 0.145;
        hipStrip(B.dark, s, XB + 0.12, XC - 0.12, f, f + 0.06, -0.005, 0.012);
        hipStrip(B.paint, s, XB + 0.12, XC - 0.12, f + 0.06, f + 0.085, 0, 0.03);
      }
      box(B.dark, XB - 0.012, XB + 0.012, s > 0 ? HW - 0.02 : -HW - 0.01, s > 0 ? HW + 0.01 : -HW + 0.02, ZB + 0.1, ZW);
      /* the cover's seat: a lip along the roof edge either side */
      box(B.paint, X0 + 0.08, XB, s > 0 ? RW - 0.08 : -RW, s > 0 ? RW : -RW + 0.08, ZR, ZR + 0.02);
    }
    /* the fixed roof: a mesh vent panel on the right, a box at its rear corner, the round dome on the left, two antenna posts (ra) */
    box(B.dark, XB + 0.10, XC - 0.15, -1.12, -0.10, ZR, ZR + 0.03);
    for (k = 0; k < 7; k++) box(B.paint, XB + 0.12 + k * 0.125, XB + 0.15 + k * 0.125, -1.12, -0.10, ZR + 0.03, ZR + 0.05);
    for (k = 0; k < 4; k++) box(B.paint, XB + 0.10, XC - 0.15, -0.18 - k * 0.30, -0.15 - k * 0.30, ZR + 0.03, ZR + 0.05);
    box(B.paint, XB + 0.06, XB + 0.40, -1.12, -0.72, ZR, ZR + 0.18);
    k = 8;
    cyl(B.paint, [2.74, 0.70, ZR], [2.74, 0.70, ZR + 0.20], 0.38, 0.34, k);
    cyl(B.paint, [2.74, 0.70, ZR + 0.20], [2.74, 0.70, ZR + 0.25], 0.30, 0.22, k);
    box(B.dark, 2.52, 2.62, 0.60, 0.80, ZR + 0.10, ZR + 0.16);
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [XC - 0.10, s * 1.18, ZR], [XC - 0.10, s * 1.18, ZR + 0.32], 0.04);
      cylZ(B.dark, XC - 0.10, s * 1.18, ZR + 0.30, ZR + 0.36, 0.05, 8);
    }

    /* ---- chassis: frame, cross members, axles, the two 385-litre tanks (ru.wikipedia MZKT-7930; r_parade08 shows the left one
       between the second and third axles), mudguards over each pair ---- */
    box(B.dark, -6.10, 5.95, -0.62, 0.62, 0.86, ZB);
    for (i = 0; i < AXL.length; i++) {
      cylY(B.dark, AXL[i], -1.02, 1.02, RT, 0.11, 10);
      box(B.dark, AXL[i] - 0.22, AXL[i] + 0.22, -0.30, 0.30, RT - 0.20, RT + 0.24);
    }
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, -0.25, 0.85, s * 1.12, 1.02, 0.34, 16);
      for (i = 0; i < 2; i++) box(B.dark, (i ? 0.70 : -0.12) - 0.03, (i ? 0.70 : -0.12) + 0.03, s * 1.12 - 0.36, s * 1.12 + 0.36, 0.72, 1.38);
      box(B.dark, -0.90, -0.30, s * 1.05 - 0.24, s * 1.05 + 0.24, 0.85, 1.42);                 /* battery and tool boxes */
      /* the stabiliser jack housings (x = JX) under the body, mudguard plates over each axle pair */
      for (i = 0; i < JX.length; i++) {
        box(B.paint, JX[i] - 0.14, JX[i] + 0.14, s * 1.24 - 0.13, s * 1.24 + 0.13, 0.98, ZB);
        box(B.dark, JX[i] - 0.06, JX[i] + 0.06, s * 1.24 - 0.06, s * 1.24 + 0.06, 0.80, 0.98);
      }
      for (i = 0; i < 4; i += 2) box(B.paint, AXL[i + 1] - 0.80, AXL[i] + 0.80, s * 1.21 - 0.31, s * 1.21 + 0.31, ZB - 0.04, ZB);
      for (i = 0; i < 4; i++) box(B.dark, AXL[i] - 0.80 - 0.02 + (i % 2 ? 0 : 1.62), AXL[i] - 0.80 + 0.02 + (i % 2 ? 0 : 1.62), s * 1.21 - 0.30, s * 1.21 + 0.30, 0.95, ZB - 0.04);
    }

    /* ---- the cab (ra, rc -05, the 2013 front view): two compartments under one roof, crew cab in front, a vertical front with
       chamfered corners, three windscreen panes, a louvred panel below them, the bumper with its lamps ---- */
    loft(B.paint, [cabRing(XC, HW, ZC, ZB), cabRing(XF - 0.16, HW, ZC, ZB), cabRing(XF, HW - 0.14, ZC - 0.06, ZB)], false);
    box(B.paint, 4.66, XF, -HW + 0.08, HW - 0.08, 1.04, ZB + 0.02);                         /* the cab's lower front ahead of the front tyres */
    box(B.paint, 4.62, 4.70, -HW + 0.04, HW - 0.04, 1.04, ZB);
    for (s = -1; s <= 1; s += 2) {
      k = s * 0.90;                                                                         /* the three panes, 0.84 m each, 1.88 to 2.64 m */
      box(B.glass, XF - 0.01, XF + 0.012, k - 0.42, k + 0.42, 1.88, 2.64);
    }
    box(B.glass, XF - 0.01, XF + 0.012, -0.42, 0.42, 1.88, 2.64);
    box(B.paint, XF - 0.02, XF + 0.035, -1.36, 1.36, 2.64, 2.70);                          /* the frame head and its two rain strips */
    for (s = -1; s <= 1; s += 2) box(B.paint, XF, XF + 0.10, s * 0.45 - 0.35, s * 0.45 + 0.35, 2.70, 2.72);
    box(B.paint, XF - 0.02, XF + 0.03, -1.36, 1.36, 1.84, 1.88);
    for (s = -1; s <= 1; s += 2) box(B.paint, XF - 0.02, XF + 0.03, s * 0.48 - 0.03, s * 0.48 + 0.03, 1.88, 2.64);
    box(B.dark, XF, XF + 0.02, -0.40, 0.40, 1.44, 1.70);                                     /* the louvred panel */
    for (k = 0; k < 5; k++) box(B.paint, XF + 0.02, XF + 0.045, -0.38, 0.38, 1.47 + k * 0.05, 1.49 + k * 0.05);
    for (i = -1; i <= 1; i++) bar(B.dark, [XF + 0.03, i * 0.90 + 0.30, 1.92], [XF + 0.03, i * 0.90 - 0.10, 2.48], 0.022);   /* wipers */
    /* bumper with headlamps, indicators, side lamps and the tow hook (the 2013 front view) */
    box(B.paint, XF, XS, -1.50, 1.50, 1.06, 1.38);
    box(B.dark, XF + 0.02, XS - 0.02, -1.45, 1.45, 1.00, 1.06);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.glass, XS - 0.02, XS + 0.02, s * 1.12, 1.25, 0.10, 12);
      cylX(B.dark, XS - 0.01, XS + 0.005, s * 1.12, 1.25, 0.125, 12);
      cylX(B.glass, XS - 0.02, XS + 0.02, s * 1.38, 1.27, 0.055, 8);
      box(B.glass, XS - 0.01, XS + 0.02, s * 1.12 - 0.09, s * 1.12 + 0.09, 1.10, 1.15);
      box(B.dark, XS - 0.01, XS + 0.02, s * 0.62 - 0.16, s * 0.62 + 0.16, 1.18, 1.30);       /* the dark plates either side of the hook */
    }
    box(B.dark, XS - 0.02, X1, -0.08, 0.08, 1.10, 1.22);
    /* doors, windows, steps, grab rails, mirrors (rb, ra, the 2011 parade side): a crew door with a big window each side, a
       second window in the rear compartment on the left, the cab steps ahead of the front tyres */
    for (s = -1; s <= 1; s += 2) {
      side(B.glass, s, 5.15, 5.72, 1.92, 2.42, HW, 0.012);
      side(B.dark, s, 5.05, 5.07, 1.06, 2.70, HW, 0.014);
      side(B.dark, s, 5.84, 5.86, 1.06, 2.70, HW, 0.014);
      side(B.dark, s, 5.05, 5.86, 2.69, 2.71, HW, 0.014);
      side(B.dark, s, 5.15, 5.30, 1.75, 1.80, HW, 0.03);
      side(B.dark, s, 4.50, 4.52, 1.55, 2.70, HW, 0.014);                                 /* the joint of the two compartments */
      for (i = 0; i < 2; i++) box(B.dark, 5.12, 5.80, s * (HW - 0.10) - 0.16, s * (HW - 0.10) + 0.16, 1.10 + i * 0.22, 1.13 + i * 0.22);
      bar(B.dark, [5.00, s * (HW + 0.06), 1.70], [5.00, s * (HW + 0.06), 2.55], 0.035);
      bar(B.dark, [XF - 0.05, s * (HW - 0.02), 2.55], [XF + 0.07, s * 1.78, 2.45], 0.04);  /* mirror arms and heads */
      box(B.dark, XF + 0.02, XF + 0.12, s > 0 ? 1.74 : -1.86, s > 0 ? 1.86 : -1.74, 2.05, 2.62);
      box(B.glass, XF, XF + 0.02, s > 0 ? 1.76 : -1.84, s > 0 ? 1.84 : -1.76, 2.08, 2.58);
      box(B.team, 4.75, 5.45, s * 0.98 - 0.125, s * 0.98 + 0.125, ZC, ZC + 0.02);            /* the two small team strips */
    }
    side(B.glass, 1, 4.00, 4.40, 1.96, 2.40, HW, 0.012);
    /* cab roof (ra): the two roof lamps on the front corners, the whip antenna on the left, a recess with two hatches over the
       rear compartment, a raised box at its right rear */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, 5.85, s * 1.05, ZC, ZC + 0.10, 0.05, 8);
      cyl(B.glass, [5.92, s * 1.05, ZC + 0.17], [5.98, s * 1.05, ZC + 0.17], 0.08, 0.08, 10);
      cyl(B.dark, [5.78, s * 1.05, ZC + 0.17], [5.92, s * 1.05, ZC + 0.17], 0.07, 0.085, 10);
    }
    cylZ(B.dark, 5.50, 0.55, ZC, ZC + 0.14, 0.08, 10);
    bar(B.dark, [5.50, 0.55, ZC + 0.14], [5.50, 0.55, ZC + 2.10], 0.025);
    box(B.dark, 3.70, 4.70, -0.45, 0.85, ZC - 0.02, ZC + 0.005);
    box(B.paint, 3.78, 4.18, 0.20, 0.75, ZC, ZC + 0.05);
    box(B.paint, 4.24, 4.64, 0.20, 0.75, ZC, ZC + 0.05);
    box(B.paint, 3.30, 3.95, -1.30, -0.55, ZC, ZC + 0.22);
    box(B.dark, 3.32, 3.93, -1.28, -0.57, ZC + 0.22, ZC + 0.235);
    box(B.paint, 3.24, 3.30, -HW + 0.1, HW - 0.1, ZC, ZC + 0.06);
  }

  /* the deployed fittings: the two stabiliser jack pairs (x = JX) down, the folding guard rails raised along the roof
     edges (rc -05: posts about 1.1 m apart, a top rail at about a metre), the boarding ladder on the right (rc -07 and -05 look at the starboard side) */
  function addDeploy(B) {
    var s, i, x;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < JX.length; i++) {
        cylZ(B.dark, JX[i], s * 1.24, 0.10, 0.82, 0.055, 8);
        box(B.dark, JX[i] - 0.20, JX[i] + 0.20, s * 1.24 - 0.20, s * 1.24 + 0.20, 0.0, 0.10);
      }
      for (i = 0; i < 8; i++) {
        x = -5.70 + i * 1.10;
        bar(B.dark, [x, s * 1.24, ZR], [x, s * 1.24, ZR + 1.00], 0.04);
      }
      bar(B.dark, [-5.70, s * 1.24, ZR + 1.00], [-5.70 + 7 * 1.10, s * 1.24, ZR + 1.00], 0.04);
      bar(B.dark, [-5.70, s * 1.24, ZR + 0.50], [-5.70 + 7 * 1.10, s * 1.24, ZR + 0.50], 0.03);
    }
    bar(B.dark, [-0.95, -HW - 0.12, 0.05], [-0.95, -HW - 0.05, ZW - 0.2], 0.05);
    bar(B.dark, [-0.55, -HW - 0.12, 0.05], [-0.55, -HW - 0.05, ZW - 0.2], 0.05);
    for (i = 0; i < 8; i++) bar(B.dark, [-0.95, -HW - 0.12 + i * 0.008, 0.30 + i * 0.30], [-0.55, -HW - 0.12 + i * 0.008, 0.30 + i * 0.30], 0.035);
  }

  /* the roof cover: two leaves of transverse panels, hinged on the roof edges (y = s*RW, z = ZR) and meeting on the centre line
     (ra: a seam down the middle, panel joints across about every 1.1 m, two long raised strips on each leaf).
     th = rotation from shut about the hinge */
  function cover(B, th) {
    var s, c = Math.cos(th), sn = Math.sin(th), i, t = 0.05, w = RW, x0 = X0 + 0.08, x1 = XB - 0.03;
    var hy = th > Math.PI ? RW + 0.05 : RW, hz = th > Math.PI ? ZR + 0.06 : ZR + 0.02;   /* opened, the hinge pin stands clear of the hip */
    function pt(s, u, h, x) {            /* u inward from the hinge, h above the leaf plane */
      return [x, s * (hy - c * u + sn * h), hz + sn * u + c * h];
    }
    function slab(s, xa, xb, ua, ub, ha, hb) {
      hexa(B.paint, [pt(s, ua, ha, xa), pt(s, ub, ha, xa), pt(s, ub, ha, xb), pt(s, ua, ha, xb),
                     pt(s, ua, hb, xa), pt(s, ub, hb, xa), pt(s, ub, hb, xb), pt(s, ua, hb, xb)]);
    }
    for (s = -1; s <= 1; s += 2) {
      slab(s, x0, x1, 0, w, 0, t);                                                   /* the leaf */
      slab(s, x0, x1, w - 0.04, w, t, t + 0.03);                                     /* the meeting flange on the inner edge */
      for (i = 0; i < 8; i++) slab(s, x0 + 0.55 + i * 1.10, x0 + 0.60 + i * 1.10, 0.04, w - 0.04, t, t + 0.025);   /* panel joints */
      slab(s, x0 + 0.1, x1 - 0.1, 0.36, 0.42, t, t + 0.05);                          /* the two long strips */
      slab(s, x0 + 0.1, x1 - 0.1, 0.86, 0.92, t, t + 0.05);
      for (i = 0; i < 4; i++) slab(s, x0 + 0.15 + i * 2.15, x0 + 1.85 + i * 2.15, -0.04, 0.05, -0.03, 0.04);     /* hinge barrels */
    }
  }

  /* the 9M723 rounds and their cradle, local x along the body from the tail, axis at z = 0 */
  function addRounds(B) {
    var i, k, a, ca, sa, V, q, hh, pts, c, sx, xs = [1.0, 3.1, 4.9];
    for (c = -1; c <= 1; c += 2) {
      sx = c * RY;
      revolve(B.msl, [[0.00, 0.34], [0.12, 0.40], [0.45, 0.455], [0.95, 0.475], [5.00, 0.475], [5.50, 0.455], [6.00, 0.40],
                      [6.55, 0.30], [7.00, 0.17], [7.25, 0.06], [7.30, 0.0]], sx, 0, 28);
      for (i = 0; i < 3; i++) revolve(B.dark, [[xs[i] - 0.05, 0.480], [xs[i] + 0.05, 0.480]], sx, 0, 24);
      cyl(B.dark, [-0.12, sx, 0], [0.04, sx, 0], 0.22, 0.30, 14);                                  /* the nozzle */
      for (i = 0; i < 4; i++) {
        a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a);
        pts = [[0.05, 0.44], [0.75, 0.47], [0.62, 0.64], [0.22, 0.64]]; V = [];
        for (k = 0; k < 8; k++) {
          q = pts[k % 4]; hh = k < 4 ? -0.02 : 0.02;
          V.push([q[0], sx + q[1] * ca - hh * sa, q[1] * sa + hh * ca]);
        }
        hexa(B.msl, V);
      }
      /* the erector tray under each round and its saddles */
      box(B.dark, 0.05, 5.60, sx - 0.20, sx + 0.20, -0.56, -0.50);
      for (i = 0; i < 3; i++) box(B.dark, xs[i] - 0.14, xs[i] + 0.14, sx - 0.36, sx + 0.36, -0.52, -0.30);
    }
    box(B.dark, -0.12, 0.12, -1.25, 1.25, -0.58, -0.40);          /* the hinge beam across */
    for (c = -1; c <= 1; c += 2) box(B.dark, -0.18, 0.18, c * 1.25 - 0.06, c * 1.25 + 0.06, -0.58, -0.30);
  }

  function build(THREE, M, C, key) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), TR = bins(T), DP = bins(T), i, s, wg, wm, geo, E, TB, RB, trg, dpg;
    addHull(HB);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre, false); RB = new Bin(T.tyre, false);
    tyre(TB, RB);
    /* one mesh a wheel: rubber and the green-painted wheel (ra, rb) told apart by vertex colour, linear as ru_buk.js has it */
    var cr = lin(0x1c1d1f), cw = lin(0x434c37), col = [];
    for (i = 0; i < TB.P.length / 3; i++) col.push(cr[0], cr[1], cr[2]);
    for (i = 0; i < RB.P.length / 3; i++) col.push(cw[0], cw[1], cw[2]);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P.concat(RB.P)), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N.concat(RB.N)), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(col), 3));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < AXL.length; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(AXL[i], s * TY, RT);
        wm = new THREE.Mesh(geo, T.tyre);
        if (s < 0) wm.rotation.y = Math.PI / 28;
        wg.add(wm);
        g.add(wg);
      }
    }
    cover(TR, 0);
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { paint: TR.paint });
    g.add(trg);
    cover(DP, COVER_OPEN);
    addDeploy(DP);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { paint: DP.paint, dark: DP.dark });
    g.add(dpg);
    addRounds(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    flush(THREE, E, { dark: EB.dark, msl: EB.msl });
    E.userData.el = EL;
    E.userData.cells = [[0.50, RY, 0, -0.25], [0.50, -RY, 0, -0.25]];
    g.add(E);
    g.name = key;
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: bumper to rear plate, the published 12.669 m */
UNIT_MODELS["pact_e00_tel"] = {
  len: 12.67,
  build: function (THREE, M, C) { return HeroIskander.build(THREE, M, C, "pact_e00_tel"); }
};
UNIT_MODELS["tel_p"] = {
  len: 12.67,
  build: function (THREE, M, C) { return HeroIskander.build(THREE, M, C, "tel_p"); }
};
