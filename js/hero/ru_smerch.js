/* ============ ru_smerch.js - HERO model: the 9A52 Smerch (BM-30) 300 mm multiple rocket launcher on the MAZ-543M 8x8 ============
   Four keys: pact_e80_mlrs "BM-30 Smerch, 9A52 Smerch 300mm MRL" 1987, pact_e90_mlrs, pact_e00_mlrs ("9A52 Smerch / 9A53
   Tornado-S"), mlrs_p (present day, js/rules.js).  All four rows are turret:true, none is deploy:true, and no row asks for the
   9A52-2 on the MAZ-79112 or the Tornado-S as a distinct vehicle, and no labelled photograph of either was fetched, so ONE model
   serves all four: the 9A52 as photographed, with per-period paint only (plain Soviet green for e80/e90; a slightly
   different plain olive for e00 and mlrs_p).  No camouflage pattern, no markings.

   What each feature rests on (Wikimedia Commons, cached in the scratchpad smerch_ref):
     "9A52 of 300-mm multiple rocket launching system 9K58 Smerch, Artillery museum, Saint-Petersburg pic1" (side, pack raised
         about 50 degrees): eight tyres in two close pairs with the long gap between axles 2 and 3; the cab at the front with a
         lower flat-topped equipment housing behind it; a long mudguard over each pair; equipment boxes down the frame; the
         pack of long round tubes bound by straps, hinged on a trunnion on a turntable over the REAR, mouths forward and up.
     "Azeri Smerch, parade in Baku, 2013" (front 3/4, pack travelling): the cab is the split MAZ-543M cab (full-width low front
         with the louvred grille, a taller port pod with the windscreen, a closed starboard pod) - the same as ru_s300.js, so
         it is reused from there; the pack lies LEVEL along the vehicle with its mouths just behind the housing; three tubes
         across, tubes stacked four high; lattice frame at the rear end.  The Baku camouflage is NOT copied (an Azeri vehicle).
     "Kuwait BM-30 Smerch launchers are firing, 2021": launchers firing forward and up over the cab at about 40 degrees.
   Published (js/armour_specs.js, js/facts.js): 12 tubes of 300 mm, 12.4 x 3.1 x 3.1 m, 4 wheel axles 8x8, 43.7 t.  The model:
     12.4 m (rear tow hooks to front tow eyes), 3.1 m with mudguards, pack top at 3.1 m, wheelbase 7.7 m, 1500x600 tyres.
   NOT confirmed and not drawn: jack count and leg positions (two housings at the rear are drawn with legs stowed - the rows are
     not deploy:true, so there is no lowered pose), the 9A52-2 / MAZ-79112 / Tornado-S, roof antennas, nets, spare wheel,
     any marking, tube strapping detail beyond plain bands.  The firing elevation is the Kuwait photograph (about 40 degrees).

   Mechanisms: the pack is the "turret" node (traverses about the rear turntable, rests pointing +X forward); inside it the
   "podelev" group (hinged at the trunnion) carries the twelve tubes, lattice and straps; userData.el = firing elevation and
   userData.cells = the 12 tube mouths [x, y, z, tail x] in the group frame, for the launch flash.  Eight "roadwheel" groups.
   Materials 5: paint, dark, glass, tyre, C.team (one 1 m strip on the top of the pack, none on the hull).
   Draw calls 3 (hull) + 8 (wheels, one mesh each) + 2 (turret mount) + 3 (podelev) = 16.  +X nose, +Y left, +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSmerch = (function () {
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
    /* the lower equipment housing behind the pods (museum photograph: lower than the cab roof, flat top, vents) */
    profY(B.paint, [[1.65, 1.50], [3.95, 1.50], [3.95, 2.70], [1.65, 2.70]], -1.30, 1.30);
    for (s = -1; s <= 1; s += 2) {
      x = s * 1.30;
      box(B.dark, 2.60, 3.50, x - (s > 0 ? 0 : 0.02), x + (s > 0 ? 0.02 : 0), 2.20, 2.55);
      for (k = 0; k < 4; k++) box(B.dark, 2.65 + k * 0.12, 2.67 + k * 0.12, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 2.25, 2.50);
    }
    box(B.dark, 1.65, 1.69, -0.90, 0.90, 2.00, 2.60);
    /* the rear-facing box behind the housing (m3): equipment cases each side below the block */
  }

  /* ------------------------------------------------------------- the Smerch */
  var XT = -5.20, XN = 6.20, CABDX = 0.25;
  var AX = [3.45, 1.25, -2.05, -4.25], TY = 1.19, RT = 0.75;   /* front axle 2.75 m behind the nose, rear axle 0.93 m ahead of the body end (Ukrainian parade side view) */
  var TX = -4.00, TZ = 1.50, PZ = 1.00;        /* turntable centre, and the trunnion height above it */
  var TR = 0.18, TPITCH = 0.38, TX0 = -1.80, TX1 = 5.45;   /* tube radius, spacing, tail and mouth in the pack frame */
  var LAUNCH_EL = 30 * Math.PI / 180;
  var JXS = -3.15;

  var PAINTS = {
    soviet: { base: "#47523a", blots: ["#39422e", "#556047", "#414b36"], seed: 30082 },
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

  /* 1500x600 tyre with chevron lug tread, dished bolted wheel (as ru_s300.js) */
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

  function addChassis(B) {
    var i, s, k, x, sx;
    box(B.dark, XT + 0.10, XN, -0.80, 0.80, 0.95, 1.45);                          /* frame */
    for (i = 0; i < 4; i++) cylY(B.dark, AX[i], -1.00, 1.00, RT, 0.12, 8);        /* axles */
    box(B.dark, XT, XT + 0.14, -1.45, 1.45, 0.98, 1.30);                          /* rear bumper beam */
    box(B.dark, XN, XN + 0.26, -1.46, 1.46, 0.98, 1.24);                          /* front bumper */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.06, XT, s * 1.10 - 0.07, s * 1.10 + 0.07, 1.00, 1.14);    /* tow hooks */
      box(B.dark, XT - 0.02, XT, s * 1.30 - 0.07, s * 1.30 + 0.07, 1.14, 1.24);    /* rear lamps */
      box(B.dark, XN + 0.14, XN + 0.22, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.04, 1.16);   /* front tow eyes */
      profY(B.paint, [[-1.07, 1.55], [0.27, 1.55], [0.27, 1.08], [0.03, 0.88], [-0.83, 0.88], [-1.07, 1.08]],
            s > 0 ? 0.92 : -1.46, s > 0 ? 1.46 : -0.92);                             /* tank / box between the pairs */
      /* mudguards over each pair of wheels */
      box(B.paint, AX[3] - 0.78, AX[2] + 0.78, s > 0 ? 1.04 : -1.52, s > 0 ? 1.52 : -1.04, 1.58, 1.64);
      box(B.paint, AX[3] - 0.78, AX[2] + 0.78, s > 0 ? 1.48 : -1.52, s > 0 ? 1.52 : -1.48, 1.40, 1.64);
      box(B.paint, AX[1] - 0.78, AX[0] + 0.50, s > 0 ? 1.04 : -1.52, s > 0 ? 1.52 : -1.04, 1.58, 1.64);
      box(B.paint, AX[1] - 0.78, AX[0] + 0.50, s > 0 ? 1.48 : -1.52, s > 0 ? 1.52 : -1.48, 1.40, 1.64);
      /* equipment boxes down the frame: panels, seams, latches */
      x = s > 0 ? 1.45 : -1.45;
      for (k = 0; k < 2; k++) {
        sx = k ? -1.10 : -3.30;
        box(B.paint, sx, sx + (k ? 1.65 : 1.90), s > 0 ? 1.04 : -1.45, s > 0 ? 1.45 : -1.04, 1.64, 2.05);
        box(B.dark, sx, sx + (k ? 1.65 : 1.90), s > 0 ? 1.04 : -1.45, s > 0 ? 1.45 : -1.04, 2.05, 2.07);
        for (i = 0; i < 3; i++) box(B.dark, sx + 0.1 + i * 0.55, sx + 0.12 + i * 0.55, x - (s > 0 ? 0 : 0.03), x + (s > 0 ? 0.03 : 0), 1.66, 2.03);
        box(B.dark, sx + 0.2, sx + 0.44, x - (s > 0 ? 0 : 0.04), x + (s > 0 ? 0.04 : 0), 1.80, 1.84);
      }
      /* stabiliser jack, stowed: a housing beside the frame between the rear pair of wheels (Tula rear view, Saint-Petersburg side view: one each side, leg down only when firing) */
      box(B.dark, JXS - 0.20, JXS + 0.20, s * 1.10 - 0.20, s * 1.10 + 0.20, 1.00, 1.08);   /* foot pad, stowed clear of the ground */
      box(B.paint, JXS - 0.12, JXS + 0.12, s * 1.10 - 0.12, s * 1.10 + 0.12, 1.08, 1.60);
      box(B.dark, JXS - 0.14, JXS + 0.14, s * 1.10 - 0.14, s * 1.10 + 0.14, 1.40, 1.46);
      box(B.paint, JXS - 0.16, JXS + 0.16, s * 0.84 - 0.12, s * 0.84 + 0.12, 1.20, 1.45);
    }
    cylY(B.dark, -0.4, -1.52, -1.40, 1.52, 0.055, 8);                               /* exhaust stub */
    /* the turntable seat on the frame and the front rest for the pack's travel position */
    box(B.paint, XT + 0.14, -3.00, -1.20, 1.20, 1.44, 1.50);
    box(B.dark, XT + 0.14, XT + 0.40, -1.15, 1.15, 1.50, 1.54);
    for (k = 0; k < 3; k++) box(B.dark, -4.85 + k * 0.30, -4.75 + k * 0.30, -1.15, 1.15, 1.50, 1.52);
    box(B.paint, 0.55, 1.00, -0.50, 0.50, 1.45, 1.80);
    box(B.dark, 0.55, 1.00, -0.40, 0.40, 1.80, 1.86);
  }

  /* the turntable, wide base platform and trunnion cheeks (node "turret", origin on the turntable axis, z = 1.5).
     The cheeks stand outside the tube bundle, so nothing passes through the tubes when the pack elevates. */
  function addMount(B) {
    var s, k;
    cyl(B.dark, [0, 0, 0.0], [0, 0, 0.10], 0.95, 0.95, 28);                       /* slewing ring */
    box(B.paint, -0.85, 0.85, -1.40, 1.40, 0.10, 0.34);                           /* base platform, as wide as the chassis */
    box(B.dark, -0.85, 0.85, -1.42, 1.42, 0.34, 0.37);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.34, 0.34, s > 0 ? 1.22 : -1.40, s > 0 ? 1.40 : -1.22, 0.30, PZ + 0.32);   /* cheeks */
      cylY(B.dark, 0, s * 1.18, s * 1.46, PZ, 0.13, 12);                            /* trunnion pins */
    }
    /* elevating ram bodies between the platform and the cradle (rods ride in the pack): fixed cylinders */
    for (s = -1; s <= 1; s += 2) cyl(B.dark, [0.45, s * 0.60, 0.37], [1.30, s * 0.60, PZ - 0.62], 0.085, 0.07, 10);
    for (k = -1; k <= 1; k += 2) box(B.dark, 0.35, 0.85, k * 0.60 - 0.12, k * 0.60 + 0.12, 0.34, 0.40);
  }

  /* the pack: 12 tubes, 4 across at the top and 2 + 2 below (Kuwait front view, Tula rear view: on a six-column grid the
     top row fills columns 2-5, the two lower rows columns 1, 2, 5, 6, the middle left open on the cradle frame), lying along +X
     in the trunnion frame (origin at the pivot) */
  function addPack(B, cells) {
    var c, r, y, z, k, v, P = TPITCH, hw = 2.5 * P + TR + 0.035, hh = P + TR + 0.035, ys = [], zs = [];
    var HY = 1.5 * P + TR, OY = 2.5 * P + TR, tt = P + TR, st = TR;
    for (c = 0; c < 6; c++) for (r = 0; r < 3; r++) {
      if (r === 2 ? (c < 1 || c > 4) : (c > 1 && c < 4)) continue;
      y = (c - 2.5) * P; z = (r - 1) * P;
      cylX(B.paint, TX0, TX1, y, z, TR, 14);                                         /* tube */
      cylX(B.dark, TX1 - 0.02, TX1 + 0.03, y, z, TR + 0.012, 14);                     /* muzzle ring */
      cylX(B.dark, TX1 + 0.03, TX1 + 0.035, y, z, TR - 0.04, 12);                     /* closing disc / bore dark */
      cylX(B.dark, TX0 - 0.10, TX0, y, z, TR - 0.03, 12);                             /* tail ferrule */
      cells.push([TX1 + 0.06, y, z, TX0 - 0.1]);
    }
    /* the cradle frame filling the open middle of the two lower rows */
    box(B.dark, TX0 + 0.1, TX1 - 0.2, -P, P, -P - 0.1, 0.12);
    /* straps following the stepped outline: top, shelves, flanks and underside */
    for (k = 0; k < 9; k++) {
      var bx = 0.2 + k * 0.62;
      box(B.dark, bx, bx + 0.07, -HY, HY, tt, tt + 0.05);
      box(B.dark, bx, bx + 0.07, -OY, -HY, st, st + 0.05);
      box(B.dark, bx, bx + 0.07, HY, OY, st, st + 0.05);
      box(B.dark, bx, bx + 0.07, -HY - 0.05, -HY, st, tt + 0.05);
      box(B.dark, bx, bx + 0.07, HY, HY + 0.05, st, tt + 0.05);
      box(B.dark, bx, bx + 0.07, -OY - 0.05, -OY, -tt, st + 0.05);
      box(B.dark, bx, bx + 0.07, OY, OY + 0.05, -tt, st + 0.05);
      box(B.dark, bx, bx + 0.07, -OY, OY, -tt - 0.05, -tt);
    }
    /* cradle slab below, side rails, front lattice frame and rear plate */
    box(B.paint, TX0 - 0.1, TX1 - 0.2, -hw, hw, -hh - 0.10, -hh);
    for (c = -1; c <= 1; c += 2) box(B.paint, TX0 - 0.1, TX1 - 0.2, c * hw - 0.04, c * hw + 0.04, -hh - 0.10, -hh + 0.2);
    box(B.dark, TX0 - 0.14, TX0 - 0.08, -hw - 0.02, hw + 0.02, -hh, hh - 0.30);
    for (k = -1; k <= 1; k += 2) {
      box(B.dark, TX1 - 0.12, TX1 - 0.02, k * hw - 0.04, k * hw + 0.04, -hh, 0.30);
      for (c = 0; c < 3; c++) box(B.dark, TX1 - 0.12, TX1 - 0.02, k > 0 ? HY : -OY, k > 0 ? OY : -HY, -hh + c * 0.38, -hh + c * 0.38 + 0.04);
    }
    /* the trunnion lugs where the cheeks hold the cradle */
    box(B.paint, -0.30, 0.30, -hw - 0.02, hw + 0.02, -hh - 0.14, -hh);
    for (c = -1; c <= 1; c += 2) box(B.dark, -0.18, 0.18, c * (hw + 0.06) - 0.06, c * (hw + 0.06) + 0.06, -hh - 0.14, 0.1);
    /* the one team strip on the top of the pack, up-facing */
    box(B.team, 2.4, 3.4, -0.12, 0.12, tt + 0.07, tt + 0.09);
  }

  function shiftX(from, n, dx) { var k; for (k = n; k < from.P.length; k += 3) from.P[k] += dx; }

  function build(THREE, C, variant) {
    var P = (variant === "e80" || variant === "e90") ? PAINTS.soviet : PAINTS.olive;
    var T = materials(THREE, C, P), g = new THREE.Group(), HB = bins(T, true), CB = bins(T, true), i, s, wg, wm, geo, TB, k, b;
    addChassis(HB);
    addCabMaz(CB);
    for (k in CB) { shiftX(CB[k], 0, CABDX); b = HB[k]; b.P = b.P.concat(CB[k].P); b.N = b.N.concat(CB[k].N); if (b.U) b.U = b.U.concat(CB[k].U); }
    flush(THREE, g, HB);
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
    /* the launcher: "turret" (traverses) holding "podelev" (elevates about the trunnion) */
    var tur = new THREE.Group(), MB = bins(T, false), EB = bins(T, true), el = new THREE.Group(), cells = [];
    addMount(MB);
    flush(THREE, tur, MB);
    addPack(EB, cells);
    flush(THREE, el, EB);
    el.name = "podelev";
    el.position.set(0, 0, PZ);
    el.userData.el = LAUNCH_EL;
    el.userData.cells = cells;
    tur.add(el);
    tur.name = "turret";
    tur.position.set(TX, 0, TZ);
    g.add(tur);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the rear tow hooks to the front tow eyes */
UNIT_MODELS["pact_e80_mlrs"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "e80"); } };
UNIT_MODELS["pact_e90_mlrs"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "e90"); } };
UNIT_MODELS["pact_e00_mlrs"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "e00"); } };
UNIT_MODELS["mlrs_p"] = { len: 12.4, build: function (THREE, M, C) { return HeroSmerch.build(THREE, C, "p"); } };
