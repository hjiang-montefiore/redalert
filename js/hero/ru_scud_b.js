/* ============ ru_scud_b.js - HERO model: R-17 Elbrus (8K14, Scud-B) on the 9P117 Uragan TEL ============
   One row:  pact_e60_tel   "R-17 Elbrus on the 9P117 Uragan", e60-e80.

   What each feature rests on (Wikimedia Commons photographs fetched for this model):
     r1  "Front view of a Soviet made MAZ-543-TEL for SCUD missiles.jpeg" (erected, from the front): the
         SPLIT two-cab front - two separate cab pods with a big windscreen each, a round headlamp and a
         small lamp low on each front corner, a heavy full-width bumper, the engine bay BETWEEN the pods
         with its louvred radiator grille, and the erector standing between them: two side rails with
         cross ties, a collar frame at the foot, and a thin wire hoop that rises over the missile's nose.
     r2  "Scud missile on TEL vehicle, National Museum of Military History, Bulgaria.jpg" (side,
         erected): the long boxy equipment housing behind the cabs with a mesh window, the open rear
         deck, the erector on its rear table with the missile standing on it, ring bands on the round,
         the cone-cylinder warhead with a joint band below it.
     r3  "Scud-launcher-England1.jpg" (side, erected, Soviet green): the same layout - cabs, housing,
         four black tyres in view, the erector rooted at the very back of the vehicle, round upright.
     r4  "MAZ-543P, National Museum of Military History, Bulgaria.jpg" (close side view of axles 2-3):
         1500x600-635 cross-country tyres with the chevron lug tread, black dished wheels with a bolt
         ring and a hub cap, a sloping fuel/equipment tank between the wheels with a strap, a short
         exhaust stub above it, the long housing above with a mesh panel and a louvred vent.
   Published figures used: 8x8, axle spacing 2.20 / 3.30 / 2.20 m (7.7 m wheelbase), tyres 1500 x 600
   (0.75 m radius), 9P117 overall length 11.75 m (11.66 m in another listing), width 3.05 m, height
   3.30 m in travel (R-17 Elbrus article and a 9P117 data sheet); R-17 length 11.25 m, body diameter
   0.88 m.  The earlier 13.4 m of armour_specs.js / tel3d.js is not a published length of the vehicle
   with the missile aboard; this model is 11.94 m (rear overhang 1.9 m behind the last axle), the round
   lying with its tail at the rear and its nose over the engine bay between the cab pods.
   NOT confirmed and not drawn: the erector's hydraulic rams and the rear stabiliser jacks DEPLOYED (the
   jack housings are drawn retracted), roof antennas, camouflage net stowage on the cabs, spare wheel,
   any markings or numerals, the wire hoop's exact shape (drawn as an arch in the rail plane), the
   exact erection angle (userData.el 1.40 rad = 80 deg, as the committed Scud-A hero, not a published
   figure).  1960s Soviet single-colour olive green.

   Erection: the erector with the missile is the group "podelev" hinged at the rear cradle (render3d
   poseLauncher, as ru_scud_a.js and the US M270/HIMARS): level in travel, raised when the launcher holds
   a target. userData.cells puts the motor flash and backblast at the tail of the round.
   HOW IT IMPROVES ON tel3d.js (4,814 triangles, the missile on a rigid boom that never erects, sheeted
   tyres): the round now raises (the TEL reads as a launcher at the shot), the tyres have the chevron
   lug tread and dished bolted wheels as nodes "roadwheel" that spin, the two cab pods carry their
   windscreens, side windows, doors, lamps, mirrors and steps, the engine bay carries its louvred grille,
   the housing behind the cabs has its mesh windows, panel doors and vents, the fuel tank, exhaust and
   jack housings are drawn, and the round has its ring bands, joint band, tail nozzle and fins.

   Nodes: eight "roadwheel" groups (one per wheel, axle on local Y), "podelev"; NOTHING named "turret"
   (turret:false row). Materials (6): paint (olive canvas), dark, glass, tyre, missile paint, C.team
   (cab roof and housing roof strips, up-facing for the RTS camera). 15 draw calls.
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroScudB = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var XT = -5.12, XN = 6.36;
  var AX = [4.46, 2.26, -1.04, -3.24], TY = 1.19, RT = 0.75;
  var PX = -4.95, PZ = 2.28;               /* erector hinge (world)                 */
  var EL = 1.40;                           /* raise angle, rad (80 deg)             */
  var MR = 0.44, MZ = 0.47;                /* missile radius, axis above the beam   */
  var PAINT = { base: "#47523a", blots: ["#39422e", "#556047", "#414b36"], seed: 65117 };

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
    T.msl = new THREE.MeshStandardMaterial({ color: 0x7d866b, roughness: 0.55, metalness: 0.25 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), team: new Bin(T.team, false) };
  }

  /* a 1500x600-635 tyre about the Y axis with the chevron lug tread: two lanes of
     lugs a half step out of phase, a rounded shoulder, a flat sidewall */
  function tyre(bin) {
    var N = 24, R = [[-0.30, 0.50, 0, 0], [-0.30, 0.66, 0, 0], [-0.22, 0.75, 1, 0], [-0.03, 0.75, 1, 0],
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
    /* dished black wheel faces, hub caps */
    for (k = -1; k <= 1; k += 2) {
      cylY(bin, 0, k * 0.29, k * 0.335, 0, 0.47, 16);
      cylY(bin, 0, k * 0.335, k * 0.385, 0, 0.19, 8);
    }
  }

  function modelParts() { return null; }

  /* ------------------------------------------------------------------- hull */
  function addHull(B) {
    var i, k, s, x, y0, y1;
    /* ---- chassis: frame, cross members, axles, rear bumper, front bumper ---- */
    box(B.dark, XT + 0.10, 6.20, -0.80, 0.80, 0.95, 1.45);
    for (i = 0; i < 4; i++) cylY(B.dark, AX[i], -1.00, 1.00, RT, 0.12, 8);
    box(B.dark, XT, XT + 0.14, -1.45, 1.45, 0.98, 1.30);                     /* rear bumper beam */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.12, XT, s * 1.10 - 0.07, s * 1.10 + 0.07, 1.00, 1.14);      /* tow hooks */
      box(B.dark, XT - 0.02, XT, s * 1.30 - 0.07, s * 1.30 + 0.07, 1.14, 1.24);      /* rear lamps */
    }
    box(B.dark, 6.36, 6.62, -1.46, 1.46, 0.98, 1.24);                       /* front bumper */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 6.50, 6.70, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.04, 1.16);   /* front tow eyes */
      box(B.dark, 6.30, 6.62, s * 1.46 - 0.04, s * 1.46 + 0.04, 0.98, 1.24);  /* bumper wings */
    }
    /* fuel tank hung between the 2nd and 3rd axle (port), sloping underneath, with its strap */
    profY(B.paint, [[-0.02, 1.55], [1.32, 1.55], [1.32, 1.08], [1.08, 0.88], [0.22, 0.88], [-0.02, 1.08]], 0.92, 1.46);
    box(B.dark, 0.0, 1.30, 1.46, 1.485, 1.00, 1.02);
    box(B.dark, 0.0, 1.30, 1.46, 1.485, 1.34, 1.36);
    /* the starboard equipment box the same place, and the exhaust stub above it */
    profY(B.paint, [[-0.02, 1.55], [1.32, 1.55], [1.32, 1.12], [1.12, 0.94], [0.22, 0.94], [-0.02, 1.12]], -1.46, -0.92);
    cylY(B.dark, 1.40, -1.62, -1.40, 1.62, 0.055, 8);
    /* rear mudguards over the fourth wheel, flared at the ends */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -4.15, -2.35, s > 0 ? 0.84 : -1.58, s > 0 ? 1.58 : -0.84, 1.58, 1.64);
      box(B.paint, -4.15, -2.35, s > 0 ? 1.54 : -1.58, s > 0 ? 1.58 : -1.54, 1.40, 1.64);
    }

    /* ---- the two cab pods (split cab: driver's left, crew right) ---- */
    for (s = -1; s <= 1; s += 2) {
      y0 = s * 0.46; y1 = s * 1.46;
      profY(B.paint, [[4.14, 1.52], [6.36, 1.52], [6.36, 2.10], [6.20, 2.62], [4.14, 2.62]], y0, y1);
      /* windscreen: a hooded dark frame, the glass in two halves with a centre post */
      planeBox(B.dark, [6.36, s * 0.96, 2.10], [-0.30, 0, 0.954], [0, 1, 0], [0.954, 0, 0.30], 0.04, 0.55, -0.42, 0.42, 0, 0.012);
      planeBox(B.glass, [6.36, s * 0.96, 2.10], [-0.30, 0, 0.954], [0, 1, 0], [0.954, 0, 0.30], 0.07, 0.52, -0.39, -0.015, 0, 0.026);
      planeBox(B.glass, [6.36, s * 0.96, 2.10], [-0.30, 0, 0.954], [0, 1, 0], [0.954, 0, 0.30], 0.07, 0.52, 0.015, 0.39, 0, 0.026);
      planeBox(B.dark, [6.36, s * 0.96, 2.10], [-0.30, 0, 0.954], [0, 1, 0], [0.954, 0, 0.30], 0.52, 0.58, -0.44, 0.44, 0, 0.05);   /* hood peak */
      /* front face: lamp each corner, a blackout lamp, the grab handle and panel seams */
      cylX(B.dark, 6.36, 6.43, s * 1.20, 1.76, 0.10, 12);
      cylX(B.glass, 6.43, 6.445, s * 1.20, 1.76, 0.07, 12);
      box(B.dark, 6.36, 6.42, s * 0.74 - 0.07, s * 0.74 + 0.07, 1.70, 1.78);
      box(B.glass, 6.42, 6.435, s * 0.74 - 0.05, s * 0.74 + 0.05, 1.71, 1.77);
      box(B.dark, 6.36, 6.39, s * 0.96 - 0.46, s * 0.96 + 0.46, 1.50, 1.60);
      for (k = 0; k < 2; k++) box(B.dark, 6.36, 6.375, s * 0.96 - 0.44, s * 0.96 + 0.44, 1.92 + k * 0.05, 1.935 + k * 0.05);
      /* outer side: door with window, handle, hinge, a step, the wing mirror on its arm */
      x = s > 0 ? 1.46 : -1.46;
      box(B.dark, 4.62, 5.98, x - 0.012, x + 0.012, 1.58, 2.58);
      box(B.paint, 4.66, 5.94, x - (s > 0 ? 0.0 : 0.03), x + (s > 0 ? 0.03 : 0.0), 1.62, 2.54);
      box(B.glass, 4.80, 5.80, x - (s > 0 ? 0.0 : 0.04), x + (s > 0 ? 0.04 : 0.0), 2.06, 2.46);
      box(B.dark, 5.76, 5.90, x - (s > 0 ? 0.0 : 0.06), x + (s > 0 ? 0.06 : 0.0), 1.98, 2.02);
      box(B.dark, 4.62, 4.68, x - (s > 0 ? 0.0 : 0.06), x + (s > 0 ? 0.06 : 0.0), 1.84, 1.94);
      box(B.dark, 4.62, 4.68, x - (s > 0 ? 0.0 : 0.06), x + (s > 0 ? 0.06 : 0.0), 2.26, 2.36);
      box(B.dark, 4.90, 5.70, s * 1.46 - 0.0, s * 1.46 + s * 0.12, 1.30, 1.36);
      bar(B.dark, [6.16, s * 1.46, 2.34], [6.20, s * 1.56, 2.42], 0.035);
      box(B.dark, 6.16, 6.22, s * 1.56 - 0.02, s * 1.56 + 0.02, 2.36, 2.72);
      /* engine-side wall of the pod: a dark vent slot */
      box(B.dark, 4.60, 5.60, s * 0.46 - (s > 0 ? 0.01 : 0.0), s * 0.46 + (s > 0 ? 0.0 : 0.01) + 0.0, 1.70, 1.92);
      /* the roof: team strip, a vent hatch, a drip rail */
      box(B.team, 4.95, 5.80, s * 0.80 - (s > 0 ? 0.0 : 0.36), s * 0.80 + (s > 0 ? 0.36 : 0.0), 2.72, 2.74);
      cylZ(B.paint, 4.55, s * 1.10, 2.62, 2.68, 0.13, 12);
      cylZ(B.dark, 4.55, s * 1.10, 2.68, 2.69, 0.09, 10);
    }

    /* ---- engine bay between the pods: the louvred radiator grille ---- */
    box(B.paint, 4.14, 6.36, -0.46, 0.46, 1.08, 2.00);
    box(B.dark, 6.36, 6.40, -0.38, 0.38, 1.26, 1.86);
    for (k = 0; k < 7; k++) box(B.paint, 6.40, 6.42, -0.38, 0.38, 1.28 + k * 0.085, 1.31 + k * 0.085);
    box(B.dark, 6.36, 6.40, -0.07, 0.07, 1.26, 1.86);
    box(B.dark, 4.14, 6.30, -0.44, 0.44, 2.00, 2.03);
    /* lamp pair low on the nose between the pods and a winch-free front plate */
    box(B.dark, 6.20, 6.36, -0.45, 0.45, 1.00, 1.08);

    /* ---- the long equipment housing behind the cabs, each side, with its mesh windows ---- */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.60, 3.95, s > 0 ? 0.62 : -1.42, s > 0 ? 1.42 : -0.62, 1.58, 2.35);
      box(B.team, -1.20, 3.50, s > 0 ? 0.90 : -1.14, s > 0 ? 1.14 : -0.90, 2.45, 2.47);
      x = s > 0 ? 1.42 : -1.42;
      for (i = 0; i < 2; i++) {
        var wx = [0.45, 2.50][i];
        box(B.dark, wx, wx + 0.75, x - (s > 0 ? 0.0 : 0.03), x + (s > 0 ? 0.03 : 0.0), 1.86, 2.26);
        for (k = 0; k < 4; k++) box(B.paint, wx + 0.06 + k * 0.17, wx + 0.075 + k * 0.17, x - (s > 0 ? 0.0 : 0.04), x + (s > 0 ? 0.04 : 0.0), 1.88, 2.24);
      }
      box(B.dark, -0.95, -0.55, x - (s > 0 ? 0.0 : 0.03), x + (s > 0 ? 0.03 : 0.0), 1.92, 2.18);      /* louvred vent */
      for (k = 0; k < 5; k++) box(B.paint, -0.95, -0.55, x - (s > 0 ? 0.0 : 0.04), x + (s > 0 ? 0.04 : 0.0), 1.95 + k * 0.05, 1.975 + k * 0.05);
      /* door and panel seams, latches */
      for (i = 0; i < 6; i++) {
        var sx = [-1.20, 0.18, 1.34, 2.20, 3.30, 3.80][i];
        box(B.dark, sx, sx + 0.02, x - (s > 0 ? 0.0 : 0.02), x + (s > 0 ? 0.02 : 0.0), 1.60, 2.33);
      }
      for (i = 0; i < 3; i++) box(B.dark, [-0.85, 1.20, 3.10][i], [-0.75, 1.30, 3.20][i], x - (s > 0 ? 0.0 : 0.04), x + (s > 0 ? 0.04 : 0.0), 1.76, 1.80);
      /* fenders over the second and third wheel's arches */
      box(B.paint, 3.00, 3.95, s > 0 ? 0.84 : -1.60, s > 0 ? 1.60 : -0.84, 1.56, 1.60);
    }
    /* the central deck under the beam, its two pedestals */
    box(B.paint, -1.60, 4.14, -0.62, 0.62, 1.45, 1.85);
    box(B.dark, -1.60, 4.14, -0.50, 0.50, 1.85, 1.88);
    for (i = 0; i < 2; i++) box(B.paint, [-3.15, -0.15][i] - 0.30, [-3.15, -0.15][i] + 0.30, -0.52, 0.52, i ? 1.85 : 1.58, PZ - 0.22);

    /* ---- the rear: open deck, the launch table, hinge cradle, jack housings ---- */
    box(B.paint, XT + 0.14, -1.60, -0.80, 0.80, 1.44, 1.58);
    box(B.paint, XT + 0.14, -4.05, -1.10, 1.10, 1.44, 1.62);
    box(B.dark, XT + 0.14, XT + 0.40, -1.00, 1.00, 1.62, 1.66);
    for (k = 0; k < 4; k++) box(B.dark, -4.90 + k * 0.50, -4.78 + k * 0.50, -0.78, 0.78, 1.58, 1.60);
    for (s = -1; s <= 1; s += 2) {
      profY(B.paint, [[PX - 0.24, 1.60], [PX + 0.40, 1.60], [PX + 0.24, PZ + 0.20], [PX - 0.14, PZ + 0.20]], s * 0.62, s * 0.78);
      cylY(B.dark, PX, s * 0.58, s * 0.88, PZ, 0.11, 12);
      /* retracted stabiliser jacks: housing, leg, foot pad */
      for (i = 0; i < 2; i++) {
        var jx = [-4.30, -4.85][i];
        box(B.paint, jx - 0.13, jx + 0.13, s * 1.40 - 0.13, s * 1.40 + 0.13, 1.00, 1.66);
        cylZ(B.dark, jx, s * 1.40, 0.70, 1.00, 0.06, 8);
        box(B.dark, jx - 0.16, jx + 0.16, s * 1.40 - 0.16, s * 1.40 + 0.16, 0.66, 0.72);
      }
    }
  }

  /* ---------------------------------------------------------------- erector */
  /* the frame of the hinge: origin at the cradle pin, +X along the boom, Z up (level) */
  function addErector(B) {
    var i, k, s, a, fx, a0, a1, n;
    /* the R-17: cylinder body, a joint band, the cone-cylinder warhead, tail fins, a tail nozzle */
    revolve(B.msl, [[0.06, 0.34], [0.14, 0.40], [0.40, 0.44], [8.30, 0.44], [8.36, 0.455], [8.50, 0.455], [8.56, 0.44],
                    [9.41, 0.44], [9.80, 0.41], [10.30, 0.33], [10.80, 0.21], [11.15, 0.08], [11.31, 0.0]], 0, MZ, 24);
    for (i = 0; i < 3; i++) cylX(B.msl, [2.10, 5.20, 7.40][i] - 0.04, [2.10, 5.20, 7.40][i] + 0.04, 0, MZ, 0.452, 20);
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      var ca = Math.cos(a), sa = Math.sin(a), th = 0.03, pts = [[0.10, 0.40], [1.52, 0.43], [1.20, 0.86], [0.62, 0.86]], V = [];
      for (k = 0; k < 8; k++) {
        var q = pts[k % 4], hh = k < 4 ? -th : th;
        V.push([q[0], q[1] * ca - hh * sa, MZ + q[1] * sa + hh * ca]);
      }
      hexa(B.msl, V);
    }
    cyl(B.dark, [-0.10, 0, MZ], [0.14, 0, MZ], 0.30, 0.34, 14);
    /* the foot: trunnion block on the pin, the launch table under the tail */
    box(B.paint, -0.20, 0.95, -0.58, 0.58, -0.36, 0.02);
    box(B.dark, -0.23, -0.20, -0.50, 0.50, -0.30, 0.02);
    cylY(B.dark, 0, -0.80, 0.80, 0, 0.10, 12);
    for (s = -1; s <= 1; s += 2) box(B.paint, -0.20, 0.42, s * 0.58 - 0.04, s * 0.58 + 0.04, -0.20, 0.30);
    /* the two side rails of the boom, lattice ties and diagonals */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 0.95, 9.30, s * 0.40 - 0.07, s * 0.40 + 0.07, -0.26, 0.0);
      box(B.dark, 0.95, 9.30, s * 0.40 - 0.03, s * 0.40 + 0.03, -0.285, -0.26);
    }
    for (i = 0; i < 10; i++) {
      fx = 1.35 + i * 0.86;
      box(B.paint, fx - 0.05, fx + 0.05, -0.40, 0.40, -0.20, -0.10);
      if (i < 9) {
        bar(B.paint, [fx, -0.40, -0.15], [fx + 0.86, 0.40, -0.15], 0.05);
        bar(B.paint, [fx, 0.40, -0.15], [fx + 0.86, -0.40, -0.15], 0.05);
      }
    }
    /* three saddles: half rings under the round with pads */
    for (i = 0; i < 3; i++) {
      fx = [2.10, 5.20, 7.40][i];
      n = 8;
      for (k = 0; k < n; k++) {
        a0 = Math.PI + k / n * Math.PI * 0.84 + Math.PI * 0.08; a1 = Math.PI + (k + 1) / n * Math.PI * 0.84 + Math.PI * 0.08;
        bar(B.paint, [fx, 0.52 * Math.cos(a0), MZ + 0.52 * Math.sin(a0)], [fx, 0.52 * Math.cos(a1), MZ + 0.52 * Math.sin(a1)], 0.10);
      }
      box(B.dark, fx - 0.10, fx + 0.10, -0.12, 0.12, MZ - 0.50, MZ - 0.40);
    }
    /* the collar frame at the head of the boom and the wire hoop over the nose */
    box(B.paint, 9.20, 9.38, -0.52, 0.52, -0.26, -0.04);
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [9.30, s * 0.46, -0.10], [10.55, s * 0.44, -0.10], 0.035);
      bar(B.paint, [9.30, s * 0.46, -0.10], [9.30, s * 0.46, 0.30], 0.05);
    }
    n = 10;
    for (k = 0; k < n; k++) {
      a0 = k / n * Math.PI; a1 = (k + 1) / n * Math.PI;
      bar(B.paint, [10.55 + 0.60 * Math.sin(a0), 0.44 * Math.cos(a0), -0.10], [10.55 + 0.60 * Math.sin(a1), 0.44 * Math.cos(a1), -0.10], 0.035);
    }
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), i, s, wg, wm, geo, E, TB;
    addHull(HB);
    flush(THREE, g, HB);
    /* eight turning wheels, one tyre geometry for each side */
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
        if (s < 0) wm.rotation.y = Math.PI / 24;     /* a lug phase apart from the other side */
        wg.add(wm);
        g.add(wg);
      }
    }
    addErector(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(PX, 0, PZ);
    flush(THREE, E, EB);
    E.userData.el = EL;
    E.userData.cells = [[0.60, 0, MZ, -0.10]];
    g.add(E);
    g.name = "pact_e60_tel";
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: rear bumper hooks to the front tow eyes */
UNIT_MODELS["pact_e60_tel"] = {
  len: 11.94,
  build: function (THREE, M, C) { return HeroScudB.build(THREE, M, C); }
};
