/* ============ ru_tochka.js - HERO model: OTR-21 Tochka (9K79) on the 9P129 launcher, BAZ-5921 chassis ============
   Two rows, one launcher:
     pact_e80_tel  "OTR-21 Tochka, 9P129 launcher"  (1976)
     pact_e90_tel  "OTR-21 Tochka-U"                (1989)
   Do NOT confuse with pact_e00_tel / tel_p (the Iskander): not registered here.

   What each feature rests on (Wikimedia Commons photographs fetched for this model):
     r1  "Soviet SS-21.JPEG" (left side, Soviet period, three-tone camouflage): the long boxy body with its
         BOAT-SHAPED bow, the cab ahead of the first axle and lower than the missile compartment, a flat roof
         with a row of hinged roof flaps along the edge, horizontal rib lines on the plank-like side, a
         hatch panel with latches on the side of the compartment, six big lugged tyres on dished wheels
         (three axles, near equal spacing), a sloped front with a headlamp/vent grille and a folded trim
         plate at the bow.
     r2  "Toczka Polish DSC03376.jpg" (front three-quarter, plain olive green, roof doors open, cab hatches
         up): two sloped windscreens and a rounded side window on the cab, two small side hatches, a
         louvred/mesh side panel in the middle of the body, amber marker lamps, a mirror arm on each front
         corner, the compartment roof opening with the long roof leaf swung up on its side hinge, the
         low cab roof against the higher compartment, the sloped sheet-metal prow.
     r3  "Dywizjon ogniowy Toczka (8).jpg" (the launch): the round is carried horizontally inside the body
         behind the cab, erected from the REAR of the body by a hinge at the tail end, and leaves nose-up
         about 15 degrees off the vertical (userData.el 1.31 rad = 75 degrees, read off this photograph, not
         a published figure); the round is green, the cone-cylinder nose, a narrow flared tail.
   Published figures (recalled, not re-fetched in the check: Wikipedia gives only the round, 6.4 m; ru.wikipedia gives the
   chassis 17.8 t and a nearly vertical launch): 9P129 / BAZ-5921 6x6 amphibious, length 9.63 m, width 3.15 m, height about 2.86 m,
   about 18 t; 9M79 round 6.4 m long, 0.65 m body diameter.  Wheel size, axle spacing, hull profile and
   cab/compartment split are measured off r1/r2 (approximate, unpublished).
   TOCHKA-U: the launcher is the same vehicle (photographs of the two rounds do not tell the 9M79 from
   the 9M79-1 outside, and no launcher change is documented), so the 1989 row draws the same model.
   NOT confirmed and not drawn: the water-jet/propeller fit at the stern, the exact trim-plate shape
   (omitted), cab interior, roof antennas, camouflage net kit, any markings or numerals.  Paint: plain single-coat Soviet olive, as ru_scud_b.js. r1 is a monochrome print (likely artwork) whose hues are unknown, so its three-tone layout is NOT drawn.

   Poses: the missile is the group "podelev", hinged at the rear of the body inside the compartment (level at
   rest, userData.el = 1.31, userData.cells at the tail for the launch flash). The roof doors are drawn twice:
   one long leaf per side (r2), shut in group "travelpose", opened 60 degrees on the outer hinge in "deploypose" (render3d hook that shows
   them from e.deployed; the round is drawn level in the open compartment when deployed, and raises).
   A missile raised before the unit has deployed rises through closed doors (risk, see report).
   Nodes: six "roadwheel" groups, "podelev", "travelpose", "deploypose"; NOTHING named "turret" (turret:false).
   Materials (6): paint, dark, glass, tyre, missile paint, C.team (two small up-facing strips on the cab roof).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTochka = (function () {
  "use strict";

  var PAINT = { base: "#47523a", blots: ["#39422e", "#556047", "#414b36"], seed: 21129 };   /* as ru_scud_b.js */
  var AX = [3.0, 0.1, -2.8], TY = 1.34, RT = 0.62;
  var HX = -4.3, HZ = 2.0;                 /* the round's hinge (world), at the rear of the compartment */
  var EL = 1.31;                           /* 75 degrees from r3 */
  var X0 = -4.8, X1 = 4.82, XC = 2.05;     /* body rear, bow stem, cab/compartment joint */
  var HW = 1.575, ZT = 2.8, ZB = 0.60;

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
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.msl = new THREE.MeshStandardMaterial({ color: 0x6f7b52, roughness: 0.55, metalness: 0.25 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), team: new Bin(T.team, false) };
  }

  /* a 1.25 m lugged cross-country tyre about the Y axis (two lanes of lugs a half step apart), with a
     dished wheel face and a hub cap each side (r1: the wheels are dished with a raised hub) */
  function tyre(bin) {
    var N = 30, R = [[-0.21, 0.37, 0, 0], [-0.21, 0.54, 0, 0], [-0.15, 0.62, 1, 0], [-0.02, 0.62, 1, 0],
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
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        box(bin, 0.26 * Math.cos(a) - 0.025, 0.26 * Math.cos(a) + 0.025, k * 0.235, k * 0.255, 0.26 * Math.sin(a) - 0.025, 0.26 * Math.sin(a) + 0.025);
      }
    }
  }

  /* a body cross-section ring in (y, z): chamfered lower hull, flat side, rounded top edge */
  function ring(x, hw, zb, zt) {
    var H = zt - zb, bw = hw * 0.57;
    return [[x, -bw, zb], [x, bw, zb], [x, 0.80 * hw, zb + 0.22 * H], [x, hw, zb + 0.55 * H], [x, hw, zt - 0.08 * H],
            [x, 0.94 * hw, zt], [x, -0.94 * hw, zt], [x, -hw, zt - 0.08 * H], [x, -hw, zb + 0.55 * H], [x, -0.80 * hw, zb + 0.22 * H]];
  }
  /* the missile compartment: an open-topped trough (walls 0.2 m, floor at 1.5 m), a U-shaped ring */
  function troughRing(x) {
    var H = ZT - ZB, bw = HW * 0.57, wi = HW - 0.2;
    return [[x, -bw, ZB], [x, bw, ZB], [x, 0.80 * HW, ZB + 0.22 * H], [x, HW, ZB + 0.55 * H], [x, HW, ZT - 0.08 * H],
            [x, 0.94 * HW, ZT], [x, wi, ZT], [x, wi, 1.5], [x, -wi, 1.5], [x, -wi, ZT], [x, -0.94 * HW, ZT],
            [x, -HW, ZT - 0.08 * H], [x, -HW, ZB + 0.55 * H], [x, -0.80 * HW, ZB + 0.22 * H]];
  }
  function zroof(x) {                       /* cab roof height along x (flat, then the windscreen slope) */
    if (x <= 3.5) return 2.35;
    if (x >= 4.35) return 1.80;
    return 2.33 - 0.53 * (x - 3.5) / 0.85;
  }

  function addHull(B) {
    var s, i, k, x, a;
    /* compartment trough */
    loft(B.paint, [troughRing(X0), troughRing(XC)], false);
    /* its end walls, front (against the cab) and rear (low, the round rises over it) */
    box(B.paint, XC - 0.16, XC, -HW + 0.2, HW - 0.2, 1.5, ZT - 0.02);
    box(B.paint, X0, X0 + 0.12, -HW + 0.2, HW - 0.2, 1.5, 2.25);
    /* the cab and the sheet-metal prow */
    loft(B.paint, [ring(XC, HW, ZB, 2.35), ring(3.5, 1.56, 0.62, 2.33), ring(4.35, 1.40, 0.78, 1.80), ring(4.82, 1.0, 1.0, 1.55)], false);
    /* round cradle in the trough: two rails on the floor and three saddles with pads */
    for (s = -1; s <= 1; s += 2) box(B.dark, X0 + 0.2, XC - 0.25, s * 0.40 - 0.05, s * 0.40 + 0.05, 1.5, 1.60);
    for (i = 0; i < 3; i++) {
      x = [-3.4, -1.2, 0.9][i];
      box(B.dark, x - 0.12, x + 0.12, -0.50, 0.50, 1.5, 1.56);
      for (s = -1; s <= 1; s += 2) box(B.dark, x - 0.10, x + 0.10, s * 0.46 - 0.05, s * 0.46 + 0.05, 1.50, 1.70);
    }
    box(B.dark, X0 + 0.12, X0 + 0.55, -0.60, 0.60, 1.5, 1.58);     /* the erecting pivot block */
    for (s = -1; s <= 1; s += 2) box(B.dark, HX - 0.07, HX + 0.07, s * 0.64 - 0.05, s * 0.64 + 0.05, 1.5, HZ + 0.1);
    /* -- cab: windscreens on the slope, side windows, hatches, doors, lamps, mirrors -- */
    var P0 = [3.62, 0, zroof(3.62)], W = [0.849, 0, -0.529], N = [0.529, 0, 0.849];
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.glass, P0, [0, 1, 0], W, N, s > 0 ? 0.06 : -0.80, s > 0 ? 0.80 : -0.06, 0.06, 0.60, -0.01, 0.025);
      planeBox(B.paint, P0, [0, 1, 0], W, N, s > 0 ? 0.80 : -0.84, s > 0 ? 0.84 : -0.80, 0.06, 0.60, -0.01, 0.03);
      /* side windows (a big one and a rounded one nearer the stem) and the door seam */
      box(B.glass, 2.35, 2.95, s * (HW - 0.01) - (s < 0 ? 0.03 : 0), s * (HW - 0.01) + (s > 0 ? 0.03 : 0), 1.62, 2.14);
      box(B.glass, 3.10, 3.45, s * (1.55) - (s < 0 ? 0.03 : 0), s * 1.55 + (s > 0 ? 0.03 : 0), 1.72, 2.10);
      box(B.dark, 2.30, 2.31, s * (HW - 0.01) - (s < 0 ? 0.03 : 0), s * (HW - 0.01) + (s > 0 ? 0.03 : 0), 1.0, 2.20);
      box(B.dark, 3.05, 3.06, s * (HW - 0.01) - (s < 0 ? 0.03 : 0), s * (HW - 0.01) + (s > 0 ? 0.03 : 0), 1.0, 2.20);
      /* roof hatches, hinged, with a handle */
      box(B.paint, 2.35, 3.05, s * 0.50 - 0.30, s * 0.50 + 0.30, 2.35, 2.39);
      box(B.dark, 2.65, 2.75, s * 0.50 - 0.10, s * 0.50 + 0.10, 2.39, 2.42);
      /* the two small team strips (up-facing, 0.25 x 1.0) on the cab roof */
      box(B.team, 2.45, 3.45, s * 1.00 - 0.125, s * 1.00 + 0.125, 2.35, 2.37);
      /* headlamps in the stem, tow hooks, mirror arms at the front corners of the cab */
      box(B.glass, 4.62, 4.84, s * 0.68 - 0.12, s * 0.68 + 0.12, 1.16, 1.34);
      box(B.dark, 4.58, 4.88, s * 0.40 - 0.06, s * 0.40 + 0.06, 1.00, 1.08);
      bar(B.dark, [3.9, s * 1.55, 2.0], [4.15, s * 1.67, 2.1], 0.05);
      box(B.dark, 4.10, 4.17, Math.min(s * 1.64, s * 1.70), Math.max(s * 1.64, s * 1.70), 1.95, 2.35);
      /* hull rib lines along the side (r1), a hatch panel with latches, the mesh/louvre panel (r2) */
      for (k = 0; k < 3; k++) box(B.paint, X0 + 0.15, XC - 0.1, s * (HW + 0.012) - (s < 0 ? 0.012 : 0), s * (HW + 0.012) + (s > 0 ? 0.012 : 0), 1.52 + k * 0.30, 1.56 + k * 0.30);
      box(B.paint, -4.35, -3.45, s * (HW + 0.02) - (s < 0 ? 0.02 : 0), s * (HW + 0.02) + (s > 0 ? 0.02 : 0), 1.85, 2.55);
      box(B.dark, -3.95, -3.85, s * (HW + 0.04) - (s < 0 ? 0.02 : 0), s * (HW + 0.04) + (s > 0 ? 0.02 : 0), 2.05, 2.30);
      box(B.dark, -1.75, -0.45, s * (HW + 0.02) - (s < 0 ? 0.02 : 0), s * (HW + 0.02) + (s > 0 ? 0.02 : 0), 2.00, 2.55);
      for (k = 0; k < 7; k++) box(B.paint, -1.70 + k * 0.18, -1.62 + k * 0.18, s * (HW + 0.04) - (s < 0 ? 0.02 : 0), s * (HW + 0.04) + (s > 0 ? 0.02 : 0), 2.04, 2.51);
      /* small square side hatches in the cab flank */
      box(B.dark, 2.15, 2.35, s * (HW + 0.02) - (s < 0 ? 0.02 : 0), s * (HW + 0.02) + (s > 0 ? 0.02 : 0), 1.35, 1.55);
      /* wheel-arch shadows above the tyres (flat dark plates on the hull side) */
      for (i = 0; i < 3; i++) box(B.dark, AX[i] - 0.70, AX[i] + 0.70, s * 1.37 - (s < 0 ? 0.10 : 0), s * 1.37 + (s > 0 ? 0.10 : 0), 1.10, 1.30);
      /* rear step and tail lamps */
      box(B.dark, X0 - 0.10, X0, s * 1.0 - 0.15, s * 1.0 + 0.15, 0.85, 1.05);
    }
    /* front grille on the stem between the lamps */
    box(B.dark, 4.70, 4.84, -0.22, 0.22, 1.12, 1.40);
    for (k = 0; k < 4; k++) box(B.paint, 4.70, 4.86, -0.22, 0.22, 1.16 + k * 0.06, 1.18 + k * 0.06);
    /* the fixed edge frame round the compartment opening (cross beams) */
    box(B.paint, XC - 0.30, XC - 0.14, -HW + 0.1, HW - 0.1, ZT, ZT + 0.06);
    box(B.paint, X0, X0 + 0.14, -HW + 0.1, HW - 0.1, ZT, ZT + 0.06);
  }

  /* the roof leaves: one long leaf per side, hinged on its outer edge (y = s*1.40, z = 2.80), the two meeting on
     the centre line when shut (r2: one long slab per side, with a flange rim and ribs under it).
     th = rotation from shut: 0, or 60 degrees (opens a 1.1 m gap on the centre line, the least that clears the
     round's fins; r2 shows a leaf lifted only ~10 degrees and no photograph shows the full opening) */
  function leaves(B, th) {
    var s, c = Math.cos(th), sn = Math.sin(th), i, hw = 1.40, t = 0.06, w = 1.40, x0 = -4.64, x1 = 1.74;
    function pt(s, u, h, x) {            /* u inward from the hinge, h above the leaf plane */
      var dy = -s * c * u + s * sn * h, dz = sn * u + c * h;
      return [x, s * hw + dy, 2.80 + dz];
    }
    function slab(s, xa, xb, ua, ub, ha, hb) {
      hexa(B.paint, [pt(s, ua, ha, xa), pt(s, ub, ha, xa), pt(s, ub, ha, xb), pt(s, ua, ha, xb),
                     pt(s, ua, hb, xa), pt(s, ub, hb, xa), pt(s, ub, hb, xb), pt(s, ua, hb, xb)]);
    }
    for (s = -1; s <= 1; s += 2) {
      slab(s, x0, x1, 0, w, 0, t);                                   /* the leaf */
      slab(s, x0, x1, w - 0.05, w, t, t + 0.04);                     /* the flange rim on the inner edge */
      slab(s, x0, x1, 0, 0.05, t, t + 0.04);                         /* and on the hinge edge */
      for (i = 0; i < 6; i++) slab(s, x0 + 0.35 + i * 1.18, x0 + 0.41 + i * 1.18, 0.05, w - 0.05, t, t + 0.025);   /* ribs */
      for (i = 0; i < 3; i++) slab(s, x0 + 0.1 + i * 2.1, x0 + 2.0 + i * 2.1, -0.05, 0.05, -0.04, 0.05);          /* hinge barrels */
    }
  }

  /* the 9M79 round about the hinge point: local x along the body, axis at z = 0 */
  function addMissile(B) {
    var i, k, a, ca, sa, V, q, hh, pts;
    revolve(B.msl, [[-0.25, 0.23], [-0.20, 0.30], [0.05, 0.32], [0.30, 0.325], [4.50, 0.325], [4.90, 0.30], [5.40, 0.22],
                    [5.85, 0.10], [6.00, 0.05], [6.15, 0.0]], 0, 0, 28);
    for (i = 0; i < 3; i++) cylX(B.msl, [1.55, 3.30, 4.60][i] - 0.03, [1.55, 3.30, 4.60][i] + 0.03, 0, 0, 0.332, 24);
    cylX(B.dark, -0.30, -0.12, 0, 0, 0.19, 14);                       /* the tail nozzle */
    cylX(B.dark, 0.60, 0.68, 0, 0, 0.333, 24);                         /* tail ring band */
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a);
      pts = [[0.00, 0.31], [0.80, 0.325], [0.60, 0.74], [0.18, 0.74]]; V = [];
      for (k = 0; k < 8; k++) {
        q = pts[k % 4]; hh = k < 4 ? -0.02 : 0.02;
        V.push([q[0], q[1] * ca - hh * sa, q[1] * sa + hh * ca]);
      }
      hexa(B.msl, V);
    }
  }

  function build(THREE, M, C, key) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), TR = bins(T), DP = bins(T), i, s, wg, wm, geo, E, TB, trg, dpg;
    addHull(HB);
    flush(THREE, g, HB);
    for (s = -1; s <= 1; s += 2) {
      TB = new Bin(T.tyre, false);
      tyre(TB);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      for (i = 0; i < AX.length; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(AX[i], s * TY, RT);
        wm = new THREE.Mesh(geo, T.tyre);
        if (s < 0) wm.rotation.y = Math.PI / 24;
        wg.add(wm);
        g.add(wg);
      }
    }
    leaves(TR, 0);
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { paint: TR.paint });
    g.add(trg);
    leaves(DP, 60 * Math.PI / 180);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { paint: DP.paint });
    g.add(dpg);
    addMissile(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    flush(THREE, E, { dark: EB.dark, msl: EB.msl });
    E.userData.el = EL;
    E.userData.cells = [[0.50, 0, 0, -0.25]];
    g.add(E);
    g.name = key;
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: stem to rear step */
UNIT_MODELS["pact_e80_tel"] = {
  len: 9.78,
  build: function (THREE, M, C) { return HeroTochka.build(THREE, M, C, "pact_e80_tel"); }
};
/* Tochka-U: the same launcher (see the header) */
UNIT_MODELS["pact_e90_tel"] = {
  len: 9.78,
  build: function (THREE, M, C) { return HeroTochka.build(THREE, M, C, "pact_e90_tel"); }
};
