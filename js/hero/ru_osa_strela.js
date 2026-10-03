/* ============ ru_osa_strela.js - HERO models: 9K33 Osa (Osa-AK/AKM) and 9K35 Strela-10 (9A35) ============
   Two rows, two models, one shared geometry kit:
     pact_e60_osa       "9K33 Osa (SA-8 Gecko), 9A33B launcher; Osa-AK 1975, Osa-AKM 1980"
     pact_e60_strela10  "9K35 Strela-10 (SA-13 Gopher) on the MT-LB; Strela-10M3 1989"

   What each feature rests on (Wikimedia Commons photographs fetched for this model):
     osa1  "British 9K33 OSA SA-8 Gecko.jpg" (Duxford, front three-quarter, an Osa-AKM): the BAZ-5937 6x6
           boat hull - a long sloped glacis carrying two raked windscreens, a headlamp each side, a trim
           vane on the glacis, big cross-country tyres under flat full-height sides with square lockers
           and a door, wing mirrors on the cab corners; the turret on a ring behind the cab with a large
           round target-tracking antenna in the middle of its front, two smaller round antennas out on arms
           left and right with a lens/lamp unit beside each, and the rectangular grid search antenna on a
           short mast on top; the missile launcher groups rising on each flank of the turret.
     osa2  "9K33 Osa, St. Petersburg.JPG" (front, parade): the same layout in plan - two launcher groups
           raised and splayed to each side of the turret centre, 3 tyres a side.
     osa3  "9A33B (10892181105).jpg", "(10892131745)" (Saumur museum; the file names say 9A33B): the same hull and
           turret with the grid antenna folded up, red-star museum paint; used for the proportions of the turret
           against the hull and the launcher-group elevation.
     st1   "9K35 Striela-10 Darlowo 2.JPG" (Polish vehicle, driven, front view from the left): the MT-LB
           hull with its sloped glacis, flat roof with a turret on it behind the driver, the elevated
           launcher: TWO containers on each side of a central round range-only radar dish, the containers
           square-section boxes with ribbed sides and a lid at the muzzle end.
     st2   "9K35 Strela-10. Royal Tank Museum, Amman, Jordan.jpg" (front-right, launcher raised): the
           hull seen full length - front mudguards over the tracks, trim vane lying on the glacis, hatches
           on the roof, the driver's lid, the front sprocket with its holes and the six rubber-tyred road
           wheels, the turret platform, the pylon carrying the elevating frame and the four containers
           (two a side) with the round dish between them.
   Published figures used: Osa length 9.14 m, width 2.75 m (tyres outside the hull), height 4.2 m (radar up);
   BAZ-5937 is a 6x6 with 1.24 m tyres; 9M33 missile 3.158 m long. Strela-10 on the MT-LB: hull length about
   6.45 m, width 2.85 m, height 2.3 m with the launcher stowed (armour_specs.js row says 6.6 x 2.85 x 2.3).

   OSA: the row spans 1971-1990s and names the Osa-AK (1975) and Osa-AKM (1980).  EVERY photograph fetched (osa1
   Duxford, osa2 St. Petersburg, osa3 Saumur) shows the sealed-container layout, so the model is the Osa-AK/AKM
   with SIX containers, three abreast in a slab on each side of the turret, a lid on the upper end of each.  The
   original 1971 open-rail 9A33B (four missiles) is NOT drawn: no photograph of it was found.  The slabs are
   drawn raised, as in the photographs; the lowered travelling pose is not drawn, and the slab elevation (25 deg)
   is read by eye.  Container length (3.3 m) follows the 9M33 round, the width and lid detail the photographs.
   STRELA-10: the generic 9A35 launcher, four containers and a round range-only dish.  The launcher group is the
   render-only raise-to-fire group "podelev" (render3d poseLauncher, as js/hero/us_m270_himars.js): at rest it is
   STOWED, containers level pointing forward, 2.27 m tall like the published 2.3 m; it rises to userData.el = 0.70
   rad (40 deg, read by eye from photographs st1, st2, NOT published) while it holds a target, 3.5 m tall.  The
   lifting column of the raised pose in the photographs is not drawn.  Nothing specific to the M3 (the 9M333
   missile, its optical channels) is drawn - not confirmed from a photograph.
   NOT drawn: radio masts, canvas covers, wading screens other than the trim vane, markings, numerals.
   Soviet olive green (period paint, no tactical markings).

   Nodes: "turret" (origin on the ring centre, rest pointing forward +X) on both; "roadwheel" groups (axle on
   local Y: three axles of two tyres for the Osa, six single axles pairs for the MT-LB); on the Strela "podelev"
   is a child of the turret.  Materials: paint (canvas), dark, glass, missile, plain C.team (up-facing plates).
   Model space: +X nose, +Y left, +Z up, metres, wheels and tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOsaStrela = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var PAINT = { base: "#535d38", blots: ["#454e2c", "#616c46", "#4b552f"], seed: 117 };
  /* belt geometry reads these: wheel x list, circles for the front (IDL) and rear (SPR) of the track */
  var NW = 6, XW = [-2.25, -1.50, -0.75, 0.0, 0.75, 1.50];
  var SPR = { x: -2.85, z: 0.42, r: 0.30 };
  var IDL = { x: 2.55, z: 0.56, r: 0.30 };

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

  /* ------------------------------------------------------------------- hull */
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
    var zb = 0.055, ri = IDL.r + 0.045, rs = SPR.r + 0.045;
    var Pf = [XW[NW - 1], zb], Pr = [XW[0], zb];
    var t1 = pickTangent(IDL, ri, Pf, true), t2 = pickTangent(SPR, rs, Pr, false);
    var Lx = SPR.x - IDL.x, Lz = SPR.z - IDL.z, L = Math.sqrt(Lx * Lx + Lz * Lz), phi = Math.atan2(Lz, Lx);
    var al = Math.acos((ri - rs) / L), psi = Math.sin(phi + al) > Math.sin(phi - al) ? phi + al : phi - al;
    while (psi < t1) psi += TAU;
    while (t2 < psi) t2 += TAU;
    var p = [], i, n, a, f, T1, T2, Q1, Q2;
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
    T1 = [IDL.x + ri * Math.cos(t1), IDL.z + ri * Math.sin(t1)];
    line(Pf, T1);
    arc(IDL, ri, t1, psi);
    Q1 = [IDL.x + ri * Math.cos(psi), IDL.z + ri * Math.sin(psi)];
    Q2 = [SPR.x + rs * Math.cos(psi), SPR.z + rs * Math.sin(psi)];
    line(Q1, Q2);
    arc(SPR, rs, psi, t2);
    T2 = [SPR.x + rs * Math.cos(t2), SPR.z + rs * Math.sin(t2)];
    line(T2, Pr);
    p.pop();                                        /* the closing point repeats the first */
    return { path: p, top: [Q1, Q2], nrm: [Math.cos(psi), Math.sin(psi)] };
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.04, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;                    /* outward normal of a counter-clockwise loop */
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



  /* -------------------------------------------------------------- materials */
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.msl = new THREE.MeshStandardMaterial({ color: 0x7d866b, roughness: 0.55, metalness: 0.25 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), team: new Bin(T.team, false) };
  }

  /* a frame tilted up by angle a about Y: U along the beam, N its up, W the left */
  function frame(a) { return { U: [Math.cos(a), 0, Math.sin(a)], N: [-Math.sin(a), 0, Math.cos(a)], W: [0, 1, 0] }; }
  function at(P, F, u, w, h) {
    return [P[0] + F.U[0] * u + F.W[0] * w + F.N[0] * h, P[1] + F.U[1] * u + F.W[1] * w + F.N[1] * h,
            P[2] + F.U[2] * u + F.W[2] * w + F.N[2] * h];
  }
  function fbox(bin, P, F, u0, u1, w0, w1, h0, h1) { planeBox(bin, P, F.U, F.W, F.N, u0, u1, w0, w1, h0, h1); }
  /* a wheel-axis (Y) lug: wedge between radii r0 and r1, angles a-d..a+d, y from ya to yb */
  function lug(bin, a, d, ya, yb, r0, r1) {
    function p(r, an, y) { return [r * Math.cos(an), y, r * Math.sin(an)]; }
    hexa(bin, [p(r0, a - d, ya), p(r0, a - d, yb), p(r0, a + d, yb), p(r0, a + d, ya),
               p(r1, a - d, ya), p(r1, a - d, yb), p(r1, a + d, yb), p(r1, a + d, ya)]);
  }
  /* a sloped panel on a plane through P0 (profile direction t, normal n): u across Y, w along t, h out */
  function onSlope(bin, P0, t, n, y0, y1, w0, w1, h0, h1) { planeBox(bin, P0, [0, 1, 0], t, n, y0, y1, w0, w1, h0, h1); }

  /* ================================================================= 9K33 OSA */
  var OW = { x: [2.45, 0.15, -2.15], R: 0.62, yi: 0.86, yo: 1.31 };

  function osaTyre(bin, ya, yb, out) {
    var k, R = OW.R, s = out, yo = out > 0 ? yb : ya, yin = out > 0 ? ya : yb, a, ym = (ya + yb) / 2;
    cyl(bin, [0, ya, 0], [0, yb, 0], R, R, 24);
    /* shoulder lugs, in two staggered rows so the tread reads as the cross-country pattern */
    for (k = 0; k < 12; k++) {
      a = k / 12 * TAU;
      lug(bin, a + 0.07, 0.085, Math.min(ya, ym) + 0.03, ym - 0.01, R - 0.012, R + 0.045);
      lug(bin, a - 0.07, 0.085, ym + 0.01, Math.max(yb, ym) - 0.03, R - 0.012, R + 0.045);
    }
    /* sidewall step, rim, hub and studs on the outer face */
    cyl(bin, [0, yo, 0], [0, yo + s * 0.012, 0], 0.55, 0.55, 20);
    cyl(bin, [0, yo + s * 0.012, 0], [0, yo + s * 0.04, 0], 0.37, 0.34, 20);
    cyl(bin, [0, yo + s * 0.04, 0], [0, yo + s * 0.05, 0], 0.13, 0.11, 12);
    for (k = 0; k < 8; k++) {
      a = k / 8 * TAU;
      box(bin, 0.24 * Math.cos(a) - 0.02, 0.24 * Math.cos(a) + 0.02, yo + s * 0.04, yo + s * 0.05, 0.24 * Math.sin(a) - 0.02, 0.24 * Math.sin(a) + 0.02);
    }
    /* inner face: a plain hub disc so nothing is hollow */
    cyl(bin, [0, yin, 0], [0, yin - s * 0.03, 0], 0.30, 0.30, 16);
  }

  function osaHull(B) {
    var k, s, y, X0 = -4.50, X1 = 4.57;
    /* boat hull below, full-width body above */
    profY(B.paint, [[X0, 0.60], [3.80, 0.55], [X1, 0.80], [X1, 1.30], [X0, 1.30]], -0.95, 0.95);
    profY(B.paint, [[X0, 1.25], [4.00, 1.25], [X1, 1.10], [3.55, 1.78], [3.20, 2.10], [-4.30, 2.10], [X0, 1.95]], -1.25, 1.25);
    /* turret ring seat */
    cylZ(B.paint, -0.55, 0, 2.10, 2.22, 1.10, 28);
    cylZ(B.dark, -0.55, 0, 2.10, 2.14, 1.16, 28);
    /* windscreens on the raked cab front */
    var tw = [-0.738, 0, 0.675], nw = [0.675, 0, 0.738];
    for (s = -1; s <= 1; s += 2) {
      onSlope(B.glass, [3.55, 0, 1.78], tw, nw, s > 0 ? 0.10 : -1.08, s > 0 ? 1.08 : -0.10, 0.06, 0.42, -0.01, 0.018);
      /* frame bars round each pane */
      onSlope(B.dark, [3.55, 0, 1.78], tw, nw, s > 0 ? 0.08 : -1.10, s > 0 ? 1.10 : -0.08, 0.02, 0.06, -0.01, 0.022);
      onSlope(B.dark, [3.55, 0, 1.78], tw, nw, s > 0 ? 0.08 : -1.10, s > 0 ? 1.10 : -0.08, 0.42, 0.46, -0.01, 0.022);
      /* side window of the cab and its door */
      box(B.glass, 2.95, 3.42, s * 1.250, s * 1.262, 1.74, 2.03);
      box(B.dark, 2.62, 2.66, s * 1.250, s * 1.260, 1.35, 2.06);
      box(B.dark, 3.40, 3.44, s * 1.250, s * 1.260, 1.35, 2.06);
      box(B.dark, 2.62, 3.44, s * 1.250, s * 1.260, 1.35, 1.38);
      /* hull lockers (square panels) along the body side */
      for (k = 0; k < 4; k++) {
        box(B.dark, -3.9 + k * 1.15, -3.15 + k * 1.15, s * 1.250, s * 1.259, 1.50, 1.92);
        box(B.paint, -3.86 + k * 1.15, -3.19 + k * 1.15, s * 1.258, s * 1.266, 1.54, 1.88);
      }
      /* headlamps in their guards on the glacis, tow eyes at the nose */
      cylX(B.dark, 4.06, 4.20, s * 0.95, 1.40, 0.09, 12);
      box(B.glass, 4.19, 4.215, s * 0.95 - 0.06, s * 0.95 + 0.06, 1.34, 1.46);
      box(B.dark, 4.50, 4.62, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.78, 0.90);
      /* wing mirrors on arms at the cab corners */
      bar(B.dark, [3.50, s * 1.20, 2.00], [3.60, s * 1.34, 2.12], 0.035);
      box(B.dark, 3.56, 3.62, s * 1.335, s * 1.35, 1.88, 2.28);
      /* mud flaps behind each tyre pair and wheel arch lips */
      for (k = 0; k < 3; k++) box(B.dark, OW.x[k] - 0.66, OW.x[k] + 0.66, s * 1.20, s * 1.26, 1.22, 1.30);
      /* side step */
      box(B.dark, 2.0, 3.1, s * 1.14, s * 1.30, 0.80, 0.84);
    }
    /* trim vane lying on the glacis */
    var tg = [-0.832, 0, 0.555], ng = [0.555, 0, 0.832];
    onSlope(B.paint, [X1, 0, 1.10], tg, ng, -0.95, 0.95, 0.12, 0.62, -0.01, 0.05);
    onSlope(B.dark, [X1, 0, 1.10], tg, ng, -0.95, 0.95, 0.12, 0.62, 0.05, 0.06);
    /* team plate on the cab roof and on the rear deck (up-facing for the RTS camera) */
    box(B.team, 2.30, 3.10, -0.125, 0.125, 2.10, 2.12);

    /* engine deck grilles and hatches */
    for (k = 0; k < 5; k++) box(B.dark, -4.0 + k * 0.28, -3.88 + k * 0.28, -0.70, 0.70, 2.10, 2.16);
    box(B.dark, -2.1, -1.8, -0.75, -0.25, 2.10, 2.16);
    box(B.dark, -2.1, -1.8, 0.25, 0.75, 2.10, 2.16);
    /* rear: tail plate details and tow eyes */
    box(B.dark, -4.52, -4.50, -0.9, 0.9, 1.35, 1.80);
    box(B.dark, -4.56, -4.50, -0.6, -0.40, 0.75, 0.90);
    box(B.dark, -4.56, -4.50, 0.40, 0.60, 0.75, 0.90);
    /* front bumper beam, wading vane edge */
    box(B.dark, 4.52, 4.60, -1.05, 1.05, 0.72, 0.84);
    /* underbody axle housings */
    for (k = 0; k < 3; k++) cylY(B.dark, OW.x[k], -1.02, 1.02, 0.62, 0.10, 10);
  }

  function osaTurret(B, MB) {
    var s, k, F, P, m, u0;
    /* the turret: body, upper housing, search mast */
    prism(B.paint, [[-1.0, -0.85], [0.45, -0.85], [0.85, -0.45], [0.85, 0.45], [0.45, 0.85], [-1.0, 0.85]], 0.0, 1.15);
    prism(B.paint, [[-0.88, -0.60], [0.35, -0.60], [0.55, -0.30], [0.55, 0.30], [0.35, 0.60], [-0.88, 0.60]], 1.15, 1.30);
    prism(B.dark, [[-0.99, -0.86], [0.46, -0.86], [0.86, -0.46], [0.86, 0.46], [0.46, 0.86], [-0.99, 0.86]], 0.0, 0.06);
    box(B.team, -0.80, 0.30, -0.125, 0.125, 1.30, 1.32);
    cylZ(B.dark, -0.20, 0, 1.30, 1.44, 0.34, 20);
    cylZ(B.paint, -0.20, 0, 1.30, 1.56, 0.07, 10);
    box(B.paint, -0.30, -0.08, -0.30, 0.30, 1.42, 1.50);
    /* grid search antenna: outer frame with chamfered corners, grid bars behind */
    var zc = 1.70, hy = 0.64, hz = 0.28, ch = 0.09, xs = -0.10, bw = 0.03;
    var pts = [[-hy + ch, -hz], [hy - ch, -hz], [hy, -hz + ch], [hy, hz - ch], [hy - ch, hz], [-hy + ch, hz], [-hy, hz - ch], [-hy, -hz + ch]];
    for (k = 0; k < 8; k++) bar(B.dark, [xs, pts[k][0], zc + pts[k][1]], [xs, pts[(k + 1) % 8][0], zc + pts[(k + 1) % 8][1]], 0.04);
    for (k = -5; k <= 5; k++) bar(B.dark, [xs, k * 0.115, zc - hz], [xs, k * 0.115, zc + hz], 0.012);
    for (k = -2; k <= 2; k++) bar(B.dark, [xs, -hy, zc + k * 0.11], [xs, hy, zc + k * 0.11], 0.012);
    box(B.paint, xs - 0.07, xs + 0.03, -0.16, 0.16, zc - hz - 0.04, zc - hz + 0.03);
    /* target-tracking antenna: big disc on a pedestal in the middle of the front */
    box(B.paint, 0.50, 0.86, -0.32, 0.32, 0.25, 0.95);
    cyl(B.paint, [0.86, 0, 0.62], [0.99, 0, 0.62], 0.55, 0.52, 28);
    cyl(B.dark, [0.99, 0, 0.62], [1.00, 0, 0.62], 0.50, 0.50, 28);
    cyl(B.dark, [0.99, 0, 0.62], [1.06, 0, 0.62], 0.06, 0.05, 10);
    for (s = -1; s <= 1; s += 2) {
      /* the two small round antennas on arms, with lens/lamp unit beside each */
      box(B.paint, 0.30, 0.52, s * 0.82, s * 1.02, 0.55, 0.95);
      cyl(B.paint, [0.52, s * 1.04, 0.84], [0.64, s * 1.04, 0.84], 0.30, 0.27, 22);
      cyl(B.dark, [0.64, s * 1.04, 0.84], [0.65, s * 1.04, 0.84], 0.25, 0.25, 22);
      cylX(B.dark, 0.60, 0.72, s * 0.50, 1.00, 0.06, 10);
      box(B.glass, 0.72, 0.735, s * 0.50 - 0.045, s * 0.50 + 0.045, 0.955, 1.045);
      box(B.dark, 0.58, 0.64, s * 0.62, s * 0.78, 0.28, 0.42);
    }
    box(B.dark, 0.2, 0.7, -0.20, 0.20, 1.15, 1.22);
    /* launcher groups of the Osa-AK / Osa-AKM: one sealed slab a side, three transport-launch containers
       abreast, raised on an arm from the turret flank, lids at the upper end (photos osa1, osa2) */
    F = frame(0.436);
    for (s = -1; s <= 1; s += 2) {
      P = [-0.55, s * 0.92, 0.35];
      box(B.paint, -0.72, -0.40, s * 0.82, s * 1.12, 0.0, 0.50);               /* trunnion block on the turret flank */
      fbox(B.paint, P, F, -0.15, 3.05, -0.42, 0.42, -0.10, -0.02);             /* the slab's underside */
      fbox(B.paint, P, F, 0.30, 0.50, -0.42, 0.42, -0.16, -0.10);              /* cross members under it */
      fbox(B.paint, P, F, 2.40, 2.60, -0.42, 0.42, -0.16, -0.10);
      bar(B.dark, [-0.50, s * 0.8, 0.18], at(P, F, 1.20, 0, -0.14), 0.07);       /* elevating strut */
      for (m = -1; m <= 1; m++) {
        var cw = m * 0.275, cA = at(P, F, 3.30, cw, 0.15), cB = at(P, F, 3.345, cw, 0.15);
        fbox(B.paint, P, F, -0.10, 3.30, cw - 0.130, cw + 0.130, -0.02, 0.30);   /* the container */
        fbox(B.dark, P, F, 0.0, 3.2, cw - 0.085, cw + 0.085, 0.30, 0.318);        /* top strip */
        cyl(B.dark, cA, cB, 0.115, 0.115, 16);                                    /* the lid on the front face */
        cyl(B.paint, cB, at(P, F, 3.365, cw, 0.15), 0.082, 0.082, 14);
        for (k = 0; k < 6; k++) {                                                 /* lid studs */
          var ak = k / 6 * TAU, qc = cw + 0.09 * Math.cos(ak), qh = 0.15 + 0.09 * Math.sin(ak);
          fbox(B.dark, P, F, 3.33, 3.355, qc - 0.012, qc + 0.012, qh - 0.012, qh + 0.012);
        }
        for (k = 0; k < 6; k++) fbox(B.paint, P, F, 0.25 + k * 0.50, 0.30 + k * 0.50, cw - 0.136, cw + 0.136, -0.01, 0.31);   /* stiffening bands */
      }
      fbox(B.dark, P, F, -0.12, -0.08, -0.42, 0.42, -0.02, 0.30);                 /* rear plate */
      fbox(B.dark, P, F, 3.30, 3.33, -0.42, 0.42, -0.02, 0.05);                   /* lower lip of the front */
    }
  }

  function buildOsa(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), k, s, wg, WB, tur;
    osaHull(HB);
    flush(THREE, g, HB);
    for (k = 0; k < 3; k++) {
      WB = { dark: new Bin(T.dark, false) };
      osaTyre(WB.dark, OW.yi, OW.yo, 1);
      osaTyre(WB.dark, -OW.yo, -OW.yi, -1);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(OW.x[k], 0, OW.R);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    osaTurret(TB, TB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(-0.55, 0, 2.22);
    /* the kit above wrote the turret in its own frame, x forward from the ring centre: shift back */
    flush(THREE, tur, TB);
    g.add(tur);
    g.name = "pact_e60_osa";
    return g;
  }

  /* ============================================================ 9K35 STRELA-10 */
  var ZW = 0.36, RWR = 0.30, TYC = 1.235, THW = 0.18;

  function stWheel(bin, x) {
    var s, k, a, yc, o;
    for (s = -1; s <= 1; s += 2) {
      yc = s * 1.205;
      cyl(bin, [0, yc - 0.105, 0], [0, yc + 0.105, 0], RWR, RWR, 22);
      /* rubber tyre ring seen as a lip, the steel disc inside it, hub cap and bolts */
      o = yc + s * 0.105;
      cyl(bin, [0, o, 0], [0, o + s * 0.02, 0], 0.235, 0.215, 20);
      cyl(bin, [0, o + s * 0.02, 0], [0, o + s * 0.05, 0], 0.09, 0.08, 12);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        box(bin, 0.15 * Math.cos(a) - 0.014, 0.15 * Math.cos(a) + 0.014, o + s * 0.02, o + s * 0.04, 0.15 * Math.sin(a) - 0.014, 0.15 * Math.sin(a) + 0.014);
      }
      cyl(bin, [0, yc - s * 0.105, 0], [0, yc - s * 0.14, 0], 0.17, 0.17, 12);
    }
  }

  function stHull(B) {
    var s, k, bg = beltGeometry();
    /* lower hull and the narrower upper hull with the sloped glacis */
    profY(B.paint, [[-3.20, 0.55], [2.90, 0.55], [3.25, 0.85], [3.25, 1.00], [-3.20, 1.00]], -1.12, 1.12);
    profY(B.paint, [[-3.20, 1.00], [3.25, 1.00], [2.45, 1.58], [2.0, 1.62], [-3.0, 1.62], [-3.20, 1.50]], -0.98, 0.98);
    /* tracks, sprockets, idlers, return run */
    belt(B.dark, bg.path, TYC - THW, TYC + THW);
    belt(B.dark, bg.path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      gear(B.dark, IDL.x, s * TYC - 0.12, s * TYC + 0.12, IDL.z, IDL.r - 0.04, IDL.r + 0.02, 14);
      cyl(B.dark, [IDL.x, s * (TYC + 0.15), IDL.z], [IDL.x, s * (TYC + 0.20), IDL.z], 0.14, 0.12, 12);
      cylY(B.dark, SPR.x, s * TYC - 0.11, s * TYC + 0.11, SPR.z, SPR.r - 0.02, 20);
      cyl(B.dark, [SPR.x, s * (TYC + 0.11), SPR.z], [SPR.x, s * (TYC + 0.16), SPR.z], 0.10, 0.09, 12);
      /* fender over the track, front mudguard tapering forward, rolled edge */
      box(B.paint, -2.90, 2.70, s > 0 ? 1.05 : -1.405, s > 0 ? 1.405 : -1.05, 0.95, 0.99);
      prism(B.paint, s > 0 ? [[2.70, 1.05], [3.15, 1.05], [3.25, 1.25], [2.70, 1.405]] : [[2.70, -1.405], [3.25, -1.25], [3.15, -1.05], [2.70, -1.05]], 0.95, 0.99);
      box(B.dark, -2.90, 2.70, s * 1.405 - 0.02, s * 1.405 + 0.02, 0.89, 1.01);
      /* headlamps and their guard bars */
      cylX(B.dark, 3.18, 3.28, s * 0.62, 1.12, 0.10, 12);
      box(B.glass, 3.27, 3.285, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.06, 1.18);
      box(B.dark, 3.20, 3.26, s * 0.62 - 0.12, s * 0.62 + 0.12, 0.98, 1.00);
      /* tow eyes on the nose */
      box(B.dark, 3.22, 3.32, s * 0.95 - 0.06, s * 0.95 + 0.06, 0.62, 0.74);
    }
    /* trim vane lying on the glacis, with its ribs */
    var tg = [-0.81, 0, 0.587], ng = [0.587, 0, 0.81];
    onSlope(B.paint, [3.25, 0, 1.0], tg, ng, -0.85, 0.85, 0.12, 0.72, -0.01, 0.04);
    for (k = -2; k <= 2; k++) onSlope(B.dark, [3.25, 0, 1.0], tg, ng, k * 0.34 - 0.015, k * 0.34 + 0.015, 0.12, 0.72, 0.04, 0.06);
    /* driver's lid, commander's lid, three vision blocks, an IR sight box */
    cylZ(B.paint, 1.55, 0.50, 1.62, 1.70, 0.27, 18);
    cylZ(B.dark, 1.55, 0.50, 1.70, 1.725, 0.20, 14);
    cylZ(B.paint, 1.55, -0.50, 1.62, 1.68, 0.24, 18);
    for (k = -1; k <= 1; k++) box(B.glass, 2.12, 2.16, 0.50 + k * 0.17 - 0.06, 0.50 + k * 0.17 + 0.06, 1.55, 1.68);
    box(B.dark, 2.06, 2.20, 0.40, 0.60, 1.52, 1.70);
    box(B.dark, 1.15, 1.60, -0.18, 0.05, 1.62, 1.70);
    /* team plates on the rear deck and beside the lids (up-facing for the RTS camera) */
    box(B.team, -2.20, -1.20, -0.125, 0.125, 1.62, 1.64);

    /* engine/air louvres, hatches and the rear doors with their lines */
    for (k = 0; k < 4; k++) box(B.dark, -3.0 + k * 0.17, -2.92 + k * 0.17, 0.95 - 1.9, 0.0, 1.62, 1.66);
    box(B.dark, 1.15, 1.20, -0.9, 0.9, 1.62, 1.66);
    box(B.dark, -3.22, -3.20, -0.9, 0.9, 0.90, 1.45);
    box(B.dark, -3.22, -3.19, -0.01, 0.01, 0.62, 1.45);
    box(B.dark, -3.22, -3.19, -0.9, -0.5, 0.58, 0.66);
    box(B.dark, -3.22, -3.19, 0.5, 0.9, 0.58, 0.66);
    /* hull side doors and a step plate */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -0.4, -0.35, s * 1.115, s * 1.125, 0.62, 0.98);
      box(B.dark, 0.6, 0.65, s * 1.115, s * 1.125, 0.62, 0.98);
      box(B.dark, -0.4, 0.65, s * 1.115, s * 1.125, 0.62, 0.66);
    }
  }

  /* Stowed and raised.  The launcher group (four containers and the dish) is the group "podelev" (render3d
     poseLauncher), hinged at HP in the turret frame and drawn in its STOWED pose: containers level, pointing
     forward over the roof, 2.3 m over the ground (published height with the launcher stowed).  render3d turns
     it about its own Y to userData.el when the vehicle engages.  EL is NOT a published figure: it is the 40
     degrees the Darlowo and Amman photographs (st1, st2) are read at by eye.  The cells give each round's mouth
     and the container's rear in the group's frame.  NOT drawn: the lifting column of the raised pose. */
  var EL = 0.70, HP = [-0.30, 0, 0.24];
  function stTurret(B, EB) {
    var s, k, F = frame(0), P = [0, 0, 0], c, w, cells = [];
    /* turret platform and its ring */
    cylZ(B.dark, 0, 0, 0.0, 0.05, 0.98, 28);
    prism(B.paint, [[-0.85, -0.80], [0.45, -0.80], [0.80, -0.35], [0.80, 0.35], [0.45, 0.80], [-0.85, 0.80]], 0.04, 0.10);
    box(B.team, -0.84, -0.52, -0.125, 0.125, 0.10, 0.12);
    /* hinge brackets either side and the trunnion stubs */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.46, -0.14, s > 0 ? 0.80 : -0.88, s > 0 ? 0.88 : -0.80, 0.10, 0.42);
      cylY(B.dark, -0.30, s > 0 ? 0.76 : -0.92, s > 0 ? 0.92 : -0.76, 0.24, 0.06, 10);
    }
    /* the four containers (frame at the hinge: u forward, w left, h up): two a side, a gap between the pairs */
    for (s = -1; s <= 1; s += 2) {
      fbox(EB.paint, P, F, 0.20, 2.05, s > 0 ? 0.16 : -0.78, s > 0 ? 0.78 : -0.16, -0.06, -0.02);   /* cradle plate */
      for (k = 0; k < 2; k++) {
        c = s * (0.31 + k * 0.30);
        fbox(EB.paint, P, F, 0.20, 2.20, c - 0.14, c + 0.14, 0.0, 0.28);                          /* the container */
        fbox(EB.dark, P, F, 2.20, 2.235, c - 0.15, c + 0.15, -0.01, 0.29);                        /* muzzle lid */
        fbox(EB.msl, P, F, 2.235, 2.245, c - 0.10, c + 0.10, 0.05, 0.23);                         /* the round's nose behind the lid */
        fbox(EB.dark, P, F, 0.14, 0.20, c - 0.15, c + 0.15, -0.01, 0.29);                         /* rear cap */
        for (w = 0; w < 5; w++) fbox(EB.paint, P, F, 0.45 + w * 0.38, 0.50 + w * 0.38, c - 0.155, c + 0.155, -0.01, 0.29);   /* stiffening bands */
        fbox(EB.dark, P, F, 0.25, 2.15, c - 0.10, c + 0.10, 0.28, 0.295);                         /* top strip */
        cells.push([2.245, c, 0.14, 0.14]);
      }
    }
    /* the range-only radar dish behind the container pairs: round dish facing along the launch line, back cone, feed */
    bar(EB.dark, [0.0, 0, -0.04], [0.0, 0, 0.14], 0.06);
    cyl(EB.paint, [-0.20, 0, 0.14], [0.0, 0, 0.14], 0.04, 0.26, 24);
    cyl(EB.dark, [0.0, 0, 0.14], [0.015, 0, 0.14], 0.25, 0.25, 24);
    cyl(EB.dark, [0.015, 0, 0.14], [0.10, 0, 0.14], 0.04, 0.03, 8);
    return cells;
  }

  function buildStrela(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), EB = bins(T), k, wg, WB, tur, E, cells;
    stHull(HB);
    flush(THREE, g, HB);
    for (k = 0; k < NW; k++) {
      WB = { dark: new Bin(T.dark, false) };
      stWheel(WB.dark, XW[k]);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[k], 0, ZW);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    cells = stTurret(TB, EB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(-0.60, 0, 1.62);
    flush(THREE, tur, TB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HP[0], HP[1], HP[2]);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = EL;
    tur.add(E);
    g.add(tur);
    g.name = "pact_e60_strela10";
    return g;
  }

  return { buildOsa: buildOsa, buildStrela: buildStrela };
})();

/* len is the measured X extent (filled from the dump) */
UNIT_MODELS["pact_e60_osa"] = {
  len: 9.18,
  build: function (THREE, M, C) { return HeroOsaStrela.buildOsa(THREE, M, C); }
};
UNIT_MODELS["pact_e60_strela10"] = {
  len: 6.54,
  build: function (THREE, M, C) { return HeroOsaStrela.buildStrela(THREE, M, C); }
};
