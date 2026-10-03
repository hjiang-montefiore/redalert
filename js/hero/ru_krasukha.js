/* ============ ru_krasukha.js - HERO model: 1RL257 Krasukha-4 electronic-warfare station, 8x8 truck ============
   One row, one vehicle:
     ewv_p  "1RL257 Krasukha-4"   (present day; turret:true, NOT deploy:true)

   References (Wikimedia Commons photographs, labelled Krasukha-4 / 1RL257E, fetched for this model; none copied):
     r1 "1RL257E Krasukha-4 Army-2022 2022-08-20 2459.jpg"  left side, antenna raised, plain olive green
     r2 "1RL257E Krasukha-4 Army-2018.jpg"   front-left three-quarter, field, antenna raised: the three dishes
     r3 "1RL257E Krasukha-4 (1).jpg"         distant side/rear, antenna raised, sensor mast with two struts
     r4 "1RL257E Krasukha-4 Army-2022 2022-08-20 2461.jpg"  the antenna suite close up from over the cab
     r5 "Zastava 2024 - Krasuha - 02.jpg"    clean left side (Serbian Army, three-tone paint NOT copied), KamAZ-63501
     r6 "Zastava 2024 - Krasuha - 01.jpg"    cab front, shelter side
   What each feature rests on:
     Truck (r1 r2 r5): four-axle 8x8 cab-over KamAZ-6350 type.  Axle spacing read off r5 (and its ratio checked against r2):
       front pair 2.1 m apart, a 3.6 m gap, rear pair 1.3 m apart.  Flat-fronted cab (grille, two round lamps, bumper, wheel
       arches, mirrors on arms), spare wheel and equipment boxes behind the cab, tank between the middle axles, the ribbed
       shelter with door, window, louvre panel and stowed stabiliser column, a roof rack running forward over the cab roof,
       rear ladders and a low rear frame behind the shelter (r2 r3 r5).
     Antenna suite (r2 r3 r4): on a round base on the rear of the shelter roof a tall equipment column with a round aperture
       on its front, carrying THREE dishes: two large ones (about 1.8 m across) out to the sides, tilted up and forward, and one
       above (about 1.6 m); a sensor mast rising behind the column with two struts, topped by a ring of lens tubes and a
       camera box (r4).  The first build had two dishes plus a box with a small dish and the mast 1.65 m off centre; r4 shows
       three dishes round one column, so it was redrawn.  A separate guyed tall mast (r2 r3) and the raised stabiliser legs
       are NOT drawn: they belong to the deployed set-up and no photograph shows them clearly attached.
   Length: no published length found (the Wikipedia article gives the BAZ-6910-022 chassis and no dimensions).  Fitted to
     photograph r5 against the 1.3 m tyres: 10.0 m long, 2.65 m wide (tyres 2.6 m over), 4.5 m over the side dishes, shelter roof 3.4 m, cab roof 3.0 m,
     antenna head about 7.5 m high.  armour_specs.js says 12 x 3 x 4 m; the model is about 2 m shorter than that table figure.
   CHASSIS: the brief named the BAZ-6910-022; every labelled Krasukha-4 photograph shows a KamAZ cab, so the KamAZ cab is drawn.
   POSE: the row is NOT deploy:true, so the antenna stays in its working pose.  r5 shows the suite folded on the march
     (the column laid forward along the roof rack over the cab); that travel pose is not drawn.
     The suite on its round base is the trained node "turret" (origin on the roof, rest pointing +X).
   NOT drawn: camouflage netting, flags, markings, numerals, whip antennas, the cab interior, a guyed mast, stabiliser legs.
   Paint: plain Russian green, a single coat (r1 r2).
   Nodes: "turret" and four "roadwheel" groups (one per axle, both tyres, spinning about Y; axle height = tyre radius).
   Materials (5): paint, dark, glass, tyre, C.team (two small up-facing strips, 0.25 x 1.0 m, on the cab roof rack).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKrasukha = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var PAINT = { base: "#4d5738", blots: ["#414a2e", "#59643f", "#485232"], seed: 1269 };
  var AXL = [3.55, 1.50, -2.10, -3.40];            /* axle x */
  var RT = 0.64, TY = 1.12, TWH = 0.21;        /* tyre radius, tyre centre y, half width */
  var ZS = 1.25, ZR = 3.40;                    /* shelter floor, shelter roof */
  var TX = -1.9;                               /* ring centre x on the roof */

  /* -------------------------------------------------------- geometry kit (as ru_zoopark.js) */
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

  /* a paraboloid dish: vertex at C, opening toward unit axis ax, radius R, depth d, a shell of thickness th.
     Every triangle is turned to face its own way (front: along ax, back: against it, rim: outward) */
  function dish(bin, C, ax, R, d, seg, rings, th) {
    var t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t)), v = cross(ax, u);
    var i, j, k, q, am;
    function pt(r0, h0, a0) {
      return [C[0] + ax[0] * h0 + (u[0] * Math.cos(a0) + v[0] * Math.sin(a0)) * r0,
              C[1] + ax[1] * h0 + (u[1] * Math.cos(a0) + v[1] * Math.sin(a0)) * r0,
              C[2] + ax[2] * h0 + (u[2] * Math.cos(a0) + v[2] * Math.sin(a0)) * r0];
    }
    function tr(a, b, c, ref) {
      if (dot(cross(sub(b, a), sub(c, a)), ref) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
    }
    function ring(i0, off) { q = i0 / rings; return [R * q, d * q * q + off]; }
    var side, off, ref, rr, p0, p1, p2, p3, a0, a1;
    for (side = 0; side < 2; side++) {
      off = side ? -th : 0; ref = side ? [-ax[0], -ax[1], -ax[2]] : ax;
      for (j = 0; j < seg; j++) {
        a0 = j / seg * TAU; a1 = (j + 1) / seg * TAU;
        rr = ring(1, off);
        tr(pt(0, off, 0), pt(rr[0], rr[1], a0), pt(rr[0], rr[1], a1), ref);
        for (i = 1; i < rings; i++) {
          rr = ring(i, off); var r2 = ring(i + 1, off);
          p0 = pt(rr[0], rr[1], a0); p1 = pt(rr[0], rr[1], a1); p2 = pt(r2[0], r2[1], a1); p3 = pt(r2[0], r2[1], a0);
          tr(p0, p3, p2, ref); tr(p0, p2, p1, ref);
        }
      }
    }
    for (j = 0; j < seg; j++) {
      a0 = j / seg * TAU; a1 = (j + 1) / seg * TAU; am = (a0 + a1) / 2;
      ref = [u[0] * Math.cos(am) + v[0] * Math.sin(am), u[1] * Math.cos(am) + v[1] * Math.sin(am), u[2] * Math.cos(am) + v[2] * Math.sin(am)];
      tr(pt(R, d, a0), pt(R, d, a1), pt(R, d - th, a1), ref);
      tr(pt(R, d, a0), pt(R, d - th, a1), pt(R, d - th, a0), ref);
    }
  }

  /* -------------------------------------------------------------- materials */
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* one axle's pair of wheels about the origin (axle centre): a lugged tyre as a toothed profile, rim disc and hub boss */
  function wheelPair(bin) {
    var s, i, pts, a, r, yc, o, NT = 36;
    for (s = -1; s <= 1; s += 2) {
      yc = s * TY;
      pts = [];
      for (i = 0; i < NT; i++) { a = i / NT * TAU; r = (i % 2) ? RT - 0.04 : RT; pts.push([r * Math.cos(a), r * Math.sin(a)]); }
      profY(bin, pts, yc - TWH, yc + TWH);
      o = yc + s * TWH;
      cyl(bin, [0, o, 0], [0, o + s * 0.02, 0], 0.40, 0.36, 18);
      cyl(bin, [0, o + s * 0.02, 0], [0, o + s * 0.07, 0], 0.17, 0.14, 12);
      for (i = 0; i < 6; i++) { a = i / 6 * TAU + 0.26; box(bin, 0.28 * Math.cos(a) - 0.02, 0.28 * Math.cos(a) + 0.02, o + s * 0.02, o + s * 0.045, 0.28 * Math.sin(a) - 0.02, 0.28 * Math.sin(a) + 0.02); }
    }
    box(bin, -0.05, 0.05, -TY, TY, -0.05, 0.05);       /* axle beam */
  }

  function hull(B) {
    var s, k, i, x, tg = [-0.678, 0, 0.735], ng = [0.735, 0, 0.678], pts, a, sg;
    /* ---- chassis frame, axles, springs, fenders */
    box(B.dark, -4.85, 4.75, -0.62, 0.62, 0.78, 1.14);
    box(B.dark, -4.92, -4.76, -1.2, 1.2, 0.80, 1.05);                     /* rear beam */
    box(B.dark, 4.80, 5.05, -1.2, 1.2, 0.78, 1.18);                       /* front bumper */
    box(B.paint, 4.80, 5.04, -1.2, 1.2, 1.18, 1.28);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) {
        x = AXL[i];
        pts = [];
        for (k = 0; k <= 6; k++) { a = (10 + k * 26.67) * Math.PI / 180; pts.push([x + 0.82 * Math.cos(a), RT + 0.82 * Math.sin(a) * 0.95]); }
        for (k = 6; k >= 0; k--) { a = (10 + k * 26.67) * Math.PI / 180; pts.push([x + 0.72 * Math.cos(a), RT + 0.72 * Math.sin(a) * 0.95]); }
        profY(B.paint, pts, s * TY - 0.27, s * TY + 0.27);
        box(B.dark, x - 0.12, x + 0.12, s * 0.62, s * 0.92, 0.62, 0.78);   /* spring pack */
      }
      /* mud flaps, steps, tow hooks, lamp clusters */
      box(B.dark, -3.4 - 0.9, -3.4 - 0.86, s * TY - 0.25, s * TY + 0.25, 0.30, 0.78);
      box(B.dark, 3.45, 3.95, s * 1.22 - 0.03, s * 1.22 + 0.03, 1.00, 1.04);
      box(B.dark, 3.45, 3.95, s * 1.22 - 0.07, s * 1.22 + 0.07, 0.62, 0.66);
      box(B.dark, 5.03, 5.12, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.90, 1.02);
      box(B.dark, -4.92, -4.85, s * 0.9 - 0.12, s * 0.9 + 0.12, 1.00, 1.12);
      /* tank and tool box between the middle axles */
      if (s > 0) cyl(B.paint, [-0.55, 0.98, 0.94], [0.55, 0.98, 0.94], 0.27, 0.27, 18);
      else box(B.paint, -0.55, 0.55, -1.28, -0.70, 0.70, 1.20);
      box(B.dark, -0.60, -0.50, s * 0.98 - 0.12, s * 0.98 + 0.12, 0.70, 1.20);
      box(B.dark, 0.50, 0.60, s * 0.98 - 0.12, s * 0.98 + 0.12, 0.70, 1.20);
    }
    /* ---- cab: side profile extruded, glass, grille, lamps */
    profY(B.paint, [[2.62, 1.40], [4.98, 1.40], [5.03, 2.25], [4.98, 2.45], [4.40, 3.00], [2.75, 3.02], [2.62, 2.90]], -1.20, 1.20);
    onSlope(B.glass, [4.98, 0, 2.45], tg, ng, -0.95, 0.95, 0.07, 0.78, 0.004, 0.024);
    box(B.dark, 4.99, 5.04, -0.62, 0.62, 1.60, 2.10);                      /* grille bed */
    for (k = 0; k < 4; k++) box(B.paint, 5.03, 5.065, -0.60, 0.60, 1.66 + k * 0.11, 1.72 + k * 0.11);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 5.0, 5.05, s * 0.88, 1.88, 0.14, 14);
      cylX(B.glass, 5.05, 5.07, s * 0.88, 1.88, 0.10, 12);
      box(B.glass, 3.35, 4.25, s * 1.20 - (s < 0 ? 0.02 : 0), s * 1.20 + (s > 0 ? 0.02 : 0), 2.30, 2.85);   /* door glass */
      box(B.dark, 3.30, 3.34, s * 1.20 - 0.015, s * 1.20 + 0.015, 1.50, 3.00);                               /* door seams */
      box(B.dark, 4.28, 4.32, s * 1.20 - 0.015, s * 1.20 + 0.015, 1.50, 2.95);
      box(B.dark, 3.38, 3.58, s * 1.20 - 0.03, s * 1.20 + 0.03, 2.05, 2.10);                                 /* handle */
      /* mirror arm and head */
      bar(B.dark, [4.50, s * 1.20, 2.75], [4.60, s * 1.55, 2.80], 0.04);
      box(B.dark, 4.50, 4.66, s * 1.52 - 0.03, s * 1.52 + 0.03, 2.30, 2.95);
      /* cab lamps on the roof edge */
      cylZ(B.dark, 4.30, s * 0.95, 3.00, 3.08, 0.05, 8);
    }
    box(B.dark, 2.60, 2.64, -1.0, 1.0, 1.55, 2.85);                        /* cab back */
    /* ---- the roof rack over the cab (r1), with the two team strips */
    box(B.paint, 2.45, 4.45, -1.10, 1.10, 3.52, 3.55);
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [2.50, s * 1.0, ZR], [2.50, s * 1.0, 3.52], 0.06);
      bar(B.dark, [4.20, s * 1.0, 3.02], [4.20, s * 1.0, 3.52], 0.06);
      box(B.team, 3.20, 4.20, s * 0.78 - 0.125, s * 0.78 + 0.125, 3.55, 3.57);
    }
    bar(B.dark, [2.45, 0, 3.52], [2.45, 0, 3.40], 0.05);
    /* ---- the shelter */
    hexa(B.paint, [[-4.4, -1.32, ZS], [2.45, -1.32, ZS], [2.45, 1.32, ZS], [-4.4, 1.32, ZS],
                   [-4.4, -1.24, ZR], [2.45, -1.24, ZR], [2.45, 1.24, ZR], [-4.4, 1.24, ZR]]);
    box(B.dark, -4.4, 2.45, -1.32, 1.32, ZS - 0.12, ZS);                   /* floor frame */
    for (s = -1; s <= 1; s += 2) {
      sg = s < 0 ? -1 : 1;
      var yw = s * 1.29;
      /* vertical rib panels along the flank (r1, r2) */
      for (k = 0; k < 10; k++) box(B.paint, -4.1 + k * 0.62, -4.04 + k * 0.62, yw - (s < 0 ? 0.045 : 0), yw + (s > 0 ? 0.045 : 0), 1.45, 3.30);
      /* door with window, louvre grille, hatch panel with ladder, stabiliser column */
      box(B.dark, 1.45, 2.15, yw - 0.025 * (s < 0 ? 1 : 0), yw + 0.025 * (s > 0 ? 1 : 0), 1.55, 3.25);
      box(B.paint, 1.50, 2.10, yw - 0.04 * (s < 0 ? 1 : 0), yw + 0.04 * (s > 0 ? 1 : 0), 1.60, 3.20);
      box(B.glass, 1.60, 1.95, yw - 0.055 * (s < 0 ? 1 : 0), yw + 0.055 * (s > 0 ? 1 : 0), 2.30, 2.75);
      box(B.dark, 0.20, 1.10, yw - 0.025 * (s < 0 ? 1 : 0), yw + 0.025 * (s > 0 ? 1 : 0), 1.90, 2.80);
      for (k = 0; k < 7; k++) box(B.paint, 0.24, 1.06, yw - 0.04 * (s < 0 ? 1 : 0), yw + 0.04 * (s > 0 ? 1 : 0), 1.94 + k * 0.12, 1.99 + k * 0.12);
      box(B.dark, -2.6, -1.6, yw - 0.02 * (s < 0 ? 1 : 0), yw + 0.02 * (s > 0 ? 1 : 0), 1.55, 2.60);
      for (k = 0; k < 5; k++) box(B.paint, -2.5 + k * 0.2, -2.46 + k * 0.2, yw - 0.04 * (s < 0 ? 1 : 0), yw + 0.04 * (s > 0 ? 1 : 0), 1.60, 2.55);
      bar(B.dark, [-0.60, s * 1.38, 0.20], [-0.60, s * 1.38, 3.00], 0.10);         /* stowed stabiliser column */
      box(B.dark, -0.72, -0.48, s * 1.38 - 0.12, s * 1.38 + 0.12, 0.10, 0.20);
      box(B.dark, -3.6, -3.2, yw - 0.03 * (s < 0 ? 1 : 0), yw + 0.03 * (s > 0 ? 1 : 0), 1.7, 2.1);   /* ladder housing */
      /* roof edge rail with posts */
      box(B.dark, -4.4, 2.45, s * 1.24 - 0.02, s * 1.24 + 0.02, ZR, ZR + 0.14);
      for (k = 0; k < 13; k++) bar(B.dark, [-4.3 + k * 0.53, s * 1.24, ZR], [-4.04 + k * 0.53, s * 1.24, ZR + 0.14], 0.025);
      bar(B.dark, [4.20, s * 1.0, 3.52], [2.50, s * 1.0, 3.52], 0.04);
      bar(B.dark, [4.20, s * 0.5, 3.52], [2.45, s * 0.1, 3.45], 0.03);
      for (k = 0; k < 7; k++) box(B.dark, -4.2 + k * 1.0, -4.15 + k * 1.0, s * 1.24 - 0.03, s * 1.24 + 0.03, ZR, ZR + 0.14);
    }
    /* the gap between cab and shelter: fuel tank, pipes (r1) */
    cylZ(B.paint, 2.52, 0.65, 1.40, 2.30, 0.12, 12);
    box(B.dark, 2.45, 2.62, -0.9, 0.9, 1.40, 2.60);
    /* rear: door seams, lamps, towing hook */
    box(B.dark, -4.43, -4.39, -1.10, 1.10, 1.50, 3.25);
    box(B.dark, -4.44, -4.39, -0.01, 0.01, 1.50, 3.25);
    for (s = -1; s <= 1; s += 2) box(B.dark, -4.44, -4.39, s * 1.15 - 0.07, s * 1.15 + 0.07, 1.30, 1.45);
    /* roof hatches and conduit */
    box(B.paint, -1.0, 0.0, -0.5, 0.5, ZR, ZR + 0.08);
    box(B.dark, -0.9, -0.1, -0.4, 0.4, ZR + 0.08, ZR + 0.10);
    box(B.paint, 0.4, 1.2, -0.45, 0.45, ZR, ZR + 0.06);
  }

  /* -------------------------------------------------------------- the raised antenna suite (origin on the roof ring) */
  function suite(B) {
    var s, k, ax, C, a;
    /* turntable and round base */
    cylZ(B.dark, 0, 0, 0.0, 0.07, 1.10, 32);
    cylZ(B.paint, 0, 0, 0.07, 0.40, 0.95, 28);
    cylZ(B.dark, 0, 0, 0.40, 0.46, 0.80, 24);
    /* central equipment column: a tall box carrying the dishes (r1 r2 r3 r4) */
    hexa(B.paint, [[-0.50, -0.55, 0.46], [0.45, -0.55, 0.46], [0.45, 0.55, 0.46], [-0.50, 0.55, 0.46],
                   [-0.45, -0.50, 2.55], [0.38, -0.50, 2.55], [0.38, 0.50, 2.55], [-0.45, 0.50, 2.55]]);
    box(B.paint, -0.55, 0.30, -0.70, -0.46, 0.55, 2.60);               /* side cabinets */
    box(B.paint, -0.55, 0.30, 0.46, 0.70, 0.55, 2.60);
    box(B.dark, 0.38, 0.46, -0.30, 0.30, 0.90, 2.20);                  /* front equipment plate */
    for (k = 0; k < 5; k++) box(B.paint, 0.46, 0.49, -0.26, 0.26, 1.00 + k * 0.22, 1.12 + k * 0.22);
    box(B.dark, -0.50, 0.40, -0.52, 0.52, 2.55, 2.62);
    cylX(B.dark, 0.38, 0.52, 0.0, 0.55, 0.20, 18);                     /* round aperture on the front */
    cylX(B.paint, 0.52, 0.55, 0.0, 0.55, 0.14, 14);
    /* a feed horn and pipework beside the column */
    cyl(B.dark, [0.30, -0.55, 2.10], [0.55, -0.55, 2.10], 0.09, 0.07, 10);
    cyl(B.dark, [0.30, 0.55, 2.10], [0.55, 0.55, 2.10], 0.09, 0.07, 10);
    /* the three dishes: two big ones out to the sides, lower, facing forward-out-up; one above, facing forward-up */
    for (s = -1; s <= 1; s += 2) {
      ax = unit([0.60, s * 0.45, 0.65]);
      C = [0.10, s * 1.30, 1.35];
      dish(B.paint, C, ax, 0.92, 0.32, 22, 4, 0.07);
      bar(B.paint, [0.0, s * 0.50, 1.30], [C[0] - ax[0] * 0.12, C[1] - s * 0.05, C[2] - ax[2] * 0.12], 0.16);
      bar(B.dark, [-0.30, s * 0.50, 0.90], [C[0] - ax[0] * 0.25, C[1], C[2] - ax[2] * 0.25 - 0.05], 0.07);
      cyl(B.dark, [C[0] + ax[0] * 0.30, C[1] + s * 0.02, C[2] + ax[2] * 0.30], [C[0] + ax[0] * 0.55, C[1] + s * 0.14, C[2] + ax[2] * 0.55], 0.05, 0.03, 8);
    }
    ax = unit([0.55, 0.0, 0.84]);
    C = [-0.05, 0.0, 2.75];
    dish(B.paint, C, ax, 0.82, 0.26, 20, 4, 0.06);
    bar(B.paint, [-0.10, 0, 2.55], [C[0] - ax[0] * 0.08, 0, C[2] - ax[2] * 0.08], 0.14);
    /* the sensor mast behind the column: tube, two struts, head with lens tubes and a camera box (r3 r4) */
    cylZ(B.dark, -0.75, 0, 0.46, 0.70, 0.20, 14);
    cylZ(B.paint, -0.75, 0, 0.70, 3.85, 0.08, 12);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [-0.75, s * 0.05, 2.5], [-0.35, s * 0.60, 0.46], 0.04);
    cylZ(B.dark, -0.75, 0, 3.85, 4.08, 0.20, 16);
    cylZ(B.paint, -0.75, 0, 4.08, 4.13, 0.12, 12);
    for (k = 0; k < 7; k++) {
      a = k / 7 * TAU;
      cyl(B.dark, [-0.75 + 0.18 * Math.cos(a), 0.18 * Math.sin(a), 3.96], [-0.75 + 0.28 * Math.cos(a), 0.28 * Math.sin(a), 3.96], 0.06, 0.06, 8);
    }
    box(B.paint, -0.55, -0.15, -0.18, 0.18, 3.55, 3.79);   /* camera box under the head */
    box(B.dark, -0.15, -0.12, -0.12, 0.12, 3.62, 3.80);
  }

  function build(THREE, M, C, key) {
    var T = materials(THREE, C), g = new THREE.Group(), HB, SB, k, wg, WB, tur;
    HB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
    SB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    hull(HB);
    flush(THREE, g, HB);
    for (k = 0; k < 4; k++) {
      WB = { tyre: new Bin(T.tyre, false) };
      wheelPair(WB.tyre);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AXL[k], 0, RT);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    suite(SB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(TX, 0, ZR);
    flush(THREE, tur, SB);
    g.add(tur);
    g.name = key;
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["ewv_p"] = {
  len: 10.0,
  build: function (THREE, M, C) { return HeroKrasukha.build(THREE, M, C, "ewv_p"); }
};
