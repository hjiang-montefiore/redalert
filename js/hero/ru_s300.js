/* ============ ru_s300.js - HERO model: the S-300P family launcher (5P85S / 5P85SE) on the MAZ-543M/7910 8x8 ============
   Three rows (rules.js, deploy:true, turret:true, rounds 4): pact_e80_sam "S-300PS, 5P85S TEL" 1982, pact_e90_sam
   "S-300PM / PMU-1, 5P85SE TEL" 1993, pact_e00_sam "S-300PMU-2 Favorit" 2001. NOT registered: sam_p, pla_e90_sam.
   One truck for all three: the photographs of the S-300PS TEL (Slovak, Kyiv) and of the PMU-1 (Slovak SIAF 2017) and
   of a Moscow 2008 launcher captioned S-300PMU2 show the SAME cab and housing, so no variant differences are drawn.
   Paint: plain Soviet green (e80, e90); a slightly different plain olive (e00). No parade camouflage, no markings.

   What each feature rests on (Wikimedia Commons, cached in the scratchpad s300_ref):
     "Slovak S-300 PS TEL at SIAF-2021" (front 3/4) and "S-300, Kyiv 2018, 12" (front 3/4, close): the cab is SPLIT in
         plan, not one full-width cab: a full-width low front body with the louvred grille in its face between round
         headlamp wings and a flat deck on top; on the PORT (driver's) side a cab pod rising from the deck with the
         windscreen (two panes), side windows and a roof lamp; on the starboard side a pod with a CLOSED front (louvres)
         and side windows; behind both, the tall control housing sloping down to the rear.
     "S-300PS TEL, Kyiv 2021, 10", "Slovak S-300PMU at SIAF 2017" (side, canisters erected), "2008 Moscow Victory Day
         Parade - S-300 TEL" (side, caption S-300PMU2 launcher): the 8x8 with the cab over the first axles, 2x2 ribbed
         canisters lying level behind the housing, equipment cases along the frame, the erected block standing on the
         rear with a lattice erector and rams in front of it.
   Published: truck-encyclopedia.com 5P85 page: 5P85S/5P85D on the MAZ-7910 (MAZ-543M family) 11,450 x 3,050 x 3,550 mm,
     wheelbase 7.7 m, track 2,375 mm (the model: 11.47 x 3.2 x 3.6 m, 3.2 with the mirrors; wheelbase 7.7 m, 1500x600 tyres).
     Same page: the 5P85S/D chassis has a left cab only (matches the port windscreen). The PMU-2 row uses the 5P85SE2 on the
     same family (armyrecognition: 5P85SE on a MAZ-7910 variant); the flat-fronted cab of an Iran photo is NOT used.
   NOT confirmed and not drawn: jack count and positions (four legs drawn: two stations), roof antennas, nets, spare wheel,
     any marking; the travel-pose rams (hidden); 5P85S vs 5P85SE differences. The tubes are 1.0 m x 7.2 m (TPK about 7.5 m).

   Poses (render3d finds them by name, shows one from e.deployed): "travelpose" = canisters lying level, jacks up;
   "deploypose" = canisters stood vertical at the rear on a foot table with two erector rams, jacks down. The truck, cab and the
   eight "roadwheel" groups stay outside both. Nothing is named "turret" (the block never traverses).
   Materials (5): paint, dark, glass, tyre, C.team (three small up-facing strips on the cab roofs and housing roof).
   14 draw calls, about 9,600 triangles (travel) / 9,800 (deployed pose). +X nose, +Y left, +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroS300 = (function () {
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


  var XT = -5.20, XN = 5.95;
  var AX = [4.46, 2.26, -1.04, -3.24], TY = 1.19, RT = 0.75;
  var PVX = -4.25, PVZ = 2.53;              /* canister block pivot (world) */
  var CR = 0.5, CS = 0.52, CL = 6.95;        /* canister radius, row/column offset, body length */
  var JX = [-2.14, -4.85];                   /* levelling jack stations */

  var PAINTS = {
    soviet: { base: "#47523a", blots: ["#39422e", "#556047", "#414b36"], seed: 30082 },
    parade: { base: "#4c5a38", blots: ["#2d3626", "#5e5236", "#3a4a2c", "#6a5d3c"], seed: 30093 },
    olive:  { base: "#4b5538", blots: ["#3d4730", "#566141", "#444e33"], seed: 30001 }
  };

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
  function bins(T, withAll) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (withAll) { b.glass = new Bin(T.glass, false); b.team = new Bin(T.team, false); }
    return b;
  }

  /* 1500x600 tyre with chevron lug tread: two lanes of lugs half a step apart, dished bolted wheel */
  function tyre(bin) {
    var N = 20, R = [[-0.30, 0.50, 0, 0], [-0.30, 0.66, 0, 0], [-0.22, 0.75, 1, 0], [-0.03, 0.75, 1, 0],
                     [0.03, 0.75, 1, 1], [0.22, 0.75, 1, 1], [0.30, 0.66, 0, 0], [0.30, 0.50, 0, 0]];
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
      cylY(bin, 0, k * 0.29, k * 0.335, 0, 0.47, 12);
      cylY(bin, 0, k * 0.335, k * 0.385, 0, 0.19, 8);
    }
  }

  /* -------------------------------------------------- the truck (both poses) */
  function sideBox(B, x0, x1, s, z0, z1, d) { /* a thin panel proud of the side at y = s*? handled by caller */
    box(B, x0, x1, s > 0 ? d : -d - 0.03, s > 0 ? d + 0.03 : -d, z0, z1);
  }

  function addChassis(B) {
    var i, s, k, x;
    box(B.dark, XT + 0.10, 6.20, -0.80, 0.80, 0.95, 1.45);                       /* frame */
    for (i = 0; i < 4; i++) cylY(B.dark, AX[i], -1.00, 1.00, RT, 0.12, 8);        /* axles */
    box(B.dark, XT, XT + 0.14, -1.45, 1.45, 0.98, 1.30);                         /* rear bumper beam */
    box(B.dark, XN, XN + 0.26, -1.46, 1.46, 0.98, 1.24);                         /* front bumper */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.06, XT, s * 1.10 - 0.07, s * 1.10 + 0.07, 1.00, 1.14);    /* tow hooks */
      box(B.dark, XT - 0.02, XT, s * 1.30 - 0.07, s * 1.30 + 0.07, 1.14, 1.24);    /* rear lamps */
      box(B.dark, XN + 0.14, XN + 0.22, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.04, 1.16);   /* front tow eyes */
      /* fuel tank / equipment box between axles 2 and 3, slung under the frame (r1, r2) */
      profY(B.paint, [[-0.02, 1.55], [1.32, 1.55], [1.32, 1.08], [1.08, 0.88], [0.22, 0.88], [-0.02, 1.08]],
            s > 0 ? 0.92 : -1.46, s > 0 ? 1.46 : -0.92);
      /* mudguards over the rear pair and the second axle */
      box(B.paint, -4.15, -2.35, s > 0 ? 1.04 : -1.52, s > 0 ? 1.52 : -1.04, 1.58, 1.64);
      box(B.paint, -4.15, -2.35, s > 0 ? 1.48 : -1.52, s > 0 ? 1.52 : -1.48, 1.40, 1.64);
      box(B.paint, 1.60, 2.95, s > 0 ? 1.04 : -1.52, s > 0 ? 1.52 : -1.04, 1.58, 1.64);
      box(B.paint, 1.60, 2.95, s > 0 ? 1.48 : -1.52, s > 0 ? 1.52 : -1.48, 1.40, 1.64);
    }
    cylY(B.dark, 1.40, -1.52, -1.40, 1.52, 0.055, 8);                              /* exhaust stub */
    /* the equipment boxes down the frame under the block: panels with seams (r1) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.95, 1.35, s > 0 ? 1.04 : -1.45, s > 0 ? 1.45 : -1.04, 1.62, 2.05);
      x = s > 0 ? 1.45 : -1.45;
      for (i = 0; i < 6; i++) {
        var sx = [-3.95, -2.80, -1.60, -0.40, 0.55, 1.33][i];
        box(B.dark, sx, sx + 0.02, x - (s > 0 ? 0.0 : 0.03), x + (s > 0 ? 0.03 : 0.0), 1.64, 2.03);
      }
      for (i = 0; i < 5; i++) {
        var hx = -3.5 + i * 1.2;
        box(B.dark, hx, hx + 0.22, x - (s > 0 ? 0.0 : 0.04), x + (s > 0 ? 0.04 : 0.0), 1.80, 1.84);
      }
      box(B.dark, -3.95, 1.35, s > 0 ? 1.04 : -1.45, s > 0 ? 1.45 : -1.04, 2.05, 2.07);
    }
    /* the central deck under the block and the rear table with its two pedestals for the pivot */
    box(B.paint, XT + 0.14, 2.9, -0.62, 0.62, 1.45, 1.49);
    box(B.paint, XT + 0.14, -4.20, -1.25, 1.25, 1.44, 1.50);
    box(B.dark, XT + 0.14, XT + 0.40, -1.15, 1.15, 1.50, 1.54);
    for (k = 0; k < 3; k++) box(B.dark, -4.95 + k * 0.30, -4.85 + k * 0.30, -1.20, 1.20, 1.50, 1.52);
    for (s = -1; s <= 1; s += 2) {
      profY(B.paint, [[PVX - 0.34, 1.62], [PVX + 0.34, 1.62], [PVX + 0.16, PVZ + 0.20], [PVX - 0.16, PVZ + 0.20]], s * 0.80, s * 0.98);
      cylY(B.dark, PVX, s * 0.74, s * 1.04, PVZ, 0.12, 10);
    }
    /* levelling-jack housings (legs are in the poses) */
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      box(B.dark, JX[i] - 0.25, JX[i] + 0.25, s * 0.80 - (s > 0 ? 0 : 0.69), s * 0.80 + (s > 0 ? 0.69 : 0), 1.10, 1.20);
      box(B.paint, JX[i] - 0.14, JX[i] + 0.14, s * 1.35 - 0.14, s * 1.35 + 0.14, 1.05, 1.62);
    }
  }

  /* the 5P85S / 5P85SE cab on the MAZ-543M/7910 truck as the photographs show it (m4, m5, r2, r4): a full-width low
     front body with the louvred grille in its face and a flat deck on top; on the PORT side (driver's side) a cab
     pod with a windscreen and side windows; on the starboard side a pod with a closed front and side windows;
     behind them the tall control housing sloping down to the rear */
  function addCabMaz(B) {
    var i, k, s, x, y, NX = 5.95;
    /* lower body: sides above the tyres, a lower centre block carrying the grille */
    box(B.paint, 3.95, 5.60, -1.50, 1.50, 1.55, 2.10);
    box(B.paint, 5.25, NX, -1.50, 1.50, 1.30, 2.10);
    box(B.paint, 5.10, 5.30, -0.85, 0.85, 1.20, 1.55);
    /* grille between the headlamp wings: dark field, horizontal bars, centre rails */
    box(B.dark, NX, NX + 0.04, -0.72, 0.72, 1.42, 2.02);
    for (k = 0; k < 4; k++) box(B.paint, NX + 0.04, NX + 0.06, -0.72, 0.72, 1.52 + k * 0.14, 1.56 + k * 0.14);
    for (k = 0; k < 3; k++) box(B.dark, NX + 0.04, NX + 0.07, -0.50 + k * 0.50, -0.46 + k * 0.50, 1.42, 2.02);
    /* flat deck over the engine, a hatch seam */
    box(B.dark, 5.30, 5.58, -0.40, 0.40, 2.10, 2.12);
    for (s = -1; s <= 1; s += 2) {
      /* headlamp wing: round lamp, amber lamp low, wiring-free */
      cylX(B.dark, NX, NX + 0.08, s * 1.10, 1.78, 0.115, 12);
      cylX(B.glass, NX + 0.08, NX + 0.10, s * 1.10, 1.78, 0.085, 12);
      box(B.dark, NX, NX + 0.07, s * 1.18 - 0.10, s * 1.18 + 0.10, 1.38, 1.52);
      box(B.glass, NX + 0.07, NX + 0.09, s * 1.18 - 0.08, s * 1.18 + 0.08, 1.40, 1.50);
      box(B.dark, NX, NX + 0.05, s * 1.50 - (s > 0 ? 0.40 : 0), s * 1.50 + (s > 0 ? 0 : 0.40), 1.40, 1.46);
      /* the pod sides: door seam, handle, step, mirror on its arm */
      x = s * 1.50;
      box(B.dark, 4.55, 4.57, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 1.58, 2.90);
      box(B.dark, 5.30, 5.33, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 1.58, 2.90);
      box(B.dark, 5.15, 5.30, x - (s > 0 ? 0 : 0.05), x + (s > 0 ? 0.05 : 0), 2.02, 2.06);
      box(B.dark, 4.65, 5.30, s * 1.50, s * 1.50 + s * 0.08, 1.34, 1.40);
      bar(B.dark, [5.50, s * 1.50, 2.55], [5.54, s * 1.58, 2.60], 0.035);
      box(B.dark, 5.50, 5.57, s * 1.58 - 0.02, s * 1.58 + 0.02, 2.30, 2.74);
    }
    /* port pod: the crew cab with the windscreen (two panes) and three side windows */
    box(B.paint, 3.95, 5.55, 0.35, 1.50, 2.10, 2.95);
    box(B.dark, 5.55, 5.58, 0.45, 1.40, 2.32, 2.86);
    box(B.glass, 5.58, 5.60, 0.48, 0.90, 2.36, 2.82);
    box(B.glass, 5.58, 5.60, 0.95, 1.37, 2.36, 2.82);
    box(B.dark, 5.55, 5.60, 0.40, 1.45, 2.88, 2.96);                                    /* visor */
    box(B.dark, 4.60, 5.45, 1.50, 1.53, 2.30, 2.86);
    box(B.glass, 4.66, 5.38, 1.53, 1.55, 2.36, 2.80);
    box(B.dark, 4.00, 4.50, 1.50, 1.53, 2.30, 2.86);
    box(B.glass, 4.06, 4.44, 1.53, 1.55, 2.36, 2.80);
    /* starboard pod: closed front with a louvred vent, side windows */
    box(B.paint, 3.95, 5.30, -1.50, -0.35, 2.10, 2.85);
    for (k = 0; k < 4; k++) box(B.dark, 5.30, 5.32, -1.30, -0.60, 2.20 + k * 0.10, 2.25 + k * 0.10);
    box(B.dark, 4.60, 5.20, -1.53, -1.50, 2.30, 2.76);
    box(B.glass, 4.66, 5.14, -1.55, -1.53, 2.36, 2.70);
    box(B.dark, 4.00, 4.50, -1.53, -1.50, 2.30, 2.76);
    box(B.glass, 4.06, 4.44, -1.55, -1.53, 2.36, 2.70);
    /* roof: a lamp on its bracket and a vent on the port pod, a vent on the starboard pod, the team strips */
    cylZ(B.dark, 5.30, 1.10, 2.95, 3.12, 0.07, 8);
    cylZ(B.glass, 5.30, 1.10, 3.12, 3.18, 0.07, 8);
    cylZ(B.paint, 4.40, 0.85, 2.95, 3.01, 0.15, 12);
    box(B.dark, 4.50, 5.00, -1.10, -0.70, 2.85, 2.89);
    box(B.team, 4.20, 5.10, 1.05, 1.30, 2.95, 2.97);
    box(B.team, 4.20, 5.10, -1.30, -1.05, 2.85, 2.87);
    /* the control housing behind the pods: sloped down to the rear, vents on the sides */
    profY(B.paint, [[3.00, 1.90], [3.95, 1.90], [3.95, 3.40], [3.60, 3.40], [3.00, 2.80]], -1.30, 1.30);
    for (s = -1; s <= 1; s += 2) {
      x = s * 1.30;
      box(B.dark, 3.30, 3.80, x - (s > 0 ? 0 : 0.02), x + (s > 0 ? 0.02 : 0), 2.30, 3.00);
      for (k = 0; k < 4; k++) box(B.dark, 3.35 + k * 0.12, 3.37 + k * 0.12, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 2.40, 2.90);
      box(B.dark, 3.20, 3.22, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 1.95, 2.60);
    }
    box(B.dark, 3.70, 4.00, 0.30, 0.70, 3.40, 3.46);                                    /* roof vent */
    box(B.team, 3.30, 3.90, -0.12, 0.12, 3.40, 3.42);
    box(B.dark, 3.00, 3.04, -0.90, 0.90, 2.00, 2.60);
    /* the rear-facing box behind the housing (m3): equipment cases each side below the block */
  }

  /* ------------------------------------------------------------- the poses */
  /* the canister block in its own frame: origin at the pivot, axis along +X, rows along Z, columns along Y */
  function addBlock(B) {
    var i, j, k, y, z, rb;
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      y = i * CS; z = j * CS;
      cylX(B.paint, 0.0, CL, y, z, CR, 14);                                           /* the tube */
      for (k = 0; k < 9; k++) {
        rb = 0.45 + k * 0.76;
        cylX(B.paint, rb, rb + 0.06, y, z, CR + 0.02, 14);                             /* ring ribs (r1) */
      }
      cyl(B.paint, [CL, y, z], [CL + 0.28, y, z], CR, CR - 0.06, 14);                  /* domed end cap (r3) */
      cylX(B.dark, CL + 0.28, CL + 0.31, y, z, CR - 0.12, 12);
      cylX(B.dark, -0.30, 0.0, y, z, CR - 0.05, 12);                                  /* tail */
      cylX(B.dark, 0.20, 0.34, y, z, CR + 0.025, 14);                                 /* tail band */
      cylX(B.dark, CL - 0.34, CL - 0.20, y, z, CR + 0.025, 14);                       /* head band */
    }
    /* cradle: the base plate, the column divider and the cross ties that hold the four tubes */
    for (i = -1; i <= 1; i += 2) box(B.dark, -0.10, CL - 0.20, i * (CS + CR + 0.04) - 0.06, i * (CS + CR + 0.04) + 0.06, -CS - CR - 0.12, -CS - CR + 0.06);
    for (k = 0; k < 6; k++) {
      var fx = 0.30 + k * 1.30;
      box(B.dark, fx - 0.06, fx + 0.06, -CS - CR - 0.02, CS + CR + 0.02, -0.04, 0.04);
      box(B.dark, fx - 0.06, fx + 0.06, -0.04, 0.04, -CS - CR - 0.05, CS + CR + 0.05);
    }
    for (j = -1; j <= 1; j += 2) box(B.dark, -0.22, 0.30, -CS - CR - 0.04, CS + CR + 0.04, j * (CS + CR) - 0.04, j * (CS + CR) + 0.04);
  }

  /* a levelling jack leg at (x, side), the foot pad at height pz */
  function addJackLeg(B, x, s, pz) {
    var y = s * 1.35;
    cylZ(B.dark, x, y, pz + 0.06, 1.12, 0.07, 8);
    box(B.dark, x - 0.20, x + 0.20, y - 0.20, y + 0.20, pz, pz + 0.07);
  }

  /* copy a bin into another turned about Y by ang and moved to (px, 0, pz) */
  function bake(from, to, px, pz, ang) {
    var c = Math.cos(ang), sn = Math.sin(ang), k, x, y, z;
    for (k = 0; k < from.P.length; k += 3) {
      x = from.P[k]; z = from.P[k + 2];
      to.P.push(px + x * c + z * sn, from.P[k + 1], pz - x * sn + z * c);
      x = from.N[k]; z = from.N[k + 2];
      to.N.push(x * c + z * sn, from.N[k + 1], -x * sn + z * c);
      if (to.U) { to.U.push(from.U[k / 3 * 2], from.U[k / 3 * 2 + 1]); }
    }
  }

  function build(THREE, C, variant) {
    var P = variant === "e00" ? PAINTS.olive : PAINTS.soviet;
    var T = materials(THREE, C, P), g = new THREE.Group(), HB = bins(T, true), i, s, wg, wm, geo, TB;
    addChassis(HB);
    addCabMaz(HB);
    flush(THREE, g, HB);
    /* eight turning wheels outside both poses (one geometry per side, lugs a phase apart) */
    for (s = -1; s <= 1; s += 2) {
      TB = new Bin(T.tyre, false);
      tyre(TB);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      for (i = 0; i < 4; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(AX[i], s * TY, RT);
        wm = new THREE.Mesh(geo, T.tyre);
        if (s < 0) wm.rotation.y = Math.PI / 20;
        wg.add(wm);
        g.add(wg);
      }
    }
    /* travel pose: the block level over the vehicle, jack legs drawn up.  Each pose is ONE group with two
       meshes (paint, dark): the block is built in its own frame and baked into the pose's bins. */
    var TV = bins(T, false), DP = bins(T, false), trv = new THREE.Group(), dep = new THREE.Group(), BK;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) { addJackLeg(TV, JX[i], s, 0.88); addJackLeg(DP, JX[i], s, 0.0); }
    BK = bins(T, false);
    addBlock(BK);
    bake(BK.paint, TV.paint, PVX, PVZ, 0); bake(BK.dark, TV.dark, PVX, PVZ, 0);
    trv.name = "travelpose";
    flush(THREE, trv, TV);
    /* deploy pose: the block stood vertical on the rear (local +X turned to up), jack legs down on the ground */
    bake(BK.paint, DP.paint, PVX, PVZ, -Math.PI / 2); bake(BK.dark, DP.dark, PVX, PVZ, -Math.PI / 2);
    /* the block's foot table on the rear deck, with its four posts, only when it stands */
    box(DP.dark, PVX - 0.80, PVX + 0.80, -1.25, 1.25, PVZ - 0.62, PVZ - 0.50);
    for (i = -1; i <= 1; i += 2) for (s = -1; s <= 1; s += 2) box(DP.paint, PVX + i * 0.62 - 0.10, PVX + i * 0.62 + 0.10, s * 1.0 - 0.10, s * 1.0 + 0.10, 1.62, PVZ - 0.62);
    /* the erector: two hydraulic rams from the rear deck up to the standing block (m3 shows the green lattice frame and
       rams in front of the standing tubes); a cylinder and a thinner rod each */
    for (s = -1; s <= 1; s += 2) {
      cyl(DP.dark, [PVX + 1.45, s * 0.50, 1.62], [PVX + 0.95, s * 0.50, 3.40], 0.085, 0.085, 8);
      cyl(DP.paint, [PVX + 0.95, s * 0.50, 3.40], [PVX + 0.62, s * 0.50, 4.70], 0.055, 0.055, 8);
      box(DP.dark, PVX + 1.30, PVX + 1.60, s * 0.50 - 0.12, s * 0.50 + 0.12, 1.50, 1.64);
    }
    dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    g.add(trv); g.add(dep);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the rear tow hooks to the front tow eyes */
UNIT_MODELS["pact_e80_sam"] = { len: 11.5, build: function (THREE, M, C) { return HeroS300.build(THREE, C, "e80"); } };
UNIT_MODELS["pact_e90_sam"] = { len: 11.5, build: function (THREE, M, C) { return HeroS300.build(THREE, C, "e90"); } };
UNIT_MODELS["pact_e00_sam"] = { len: 11.5, build: function (THREE, M, C) { return HeroS300.build(THREE, C, "e00"); } };
