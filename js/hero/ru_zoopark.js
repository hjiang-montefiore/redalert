/* ============ ru_zoopark.js - HERO model: 1L219 Zoopark-1 counter-battery radar on the MT-LBu chassis ============
   Two rows, one vehicle:
     pact_e00_radarv  "1L219 Zoopark-1"            (from e90; turret:true)
     radarv_p         "1L219 Zoopark-1 Radar"      (present day)
   The Zoopark-1M (1L219M) is the same vehicle on the same chassis in the photographs fetched (r1 is captioned
   1L219M), so both rows draw ONE model.  Zoopark-2 (1L220U, wheeled) is a different system: not drawn.

   What each feature rests on (Wikimedia Commons photographs fetched for this model):
     r1  "1L219 Zoopark-1 radar Tula 2016.JPG" (left side, plain Russian green, antenna raised): the tracked MT-LBu hull
         with its sloped bow and flat roof, a front sprocket, SEVEN rubber-rimmed dished road wheels and a small rear
         idler, a louvred grille on the roof edge, a rounded rear hatch, the rotating equipment module (a box with louvre
         panels and data plates) on the rear half of the roof, a sensor mast with a head at its front, a round dome on its
         front, the long rod along the module top, and the big flat antenna panel carried on arms at the module's REAR,
         leaning back about 20 degrees from vertical so that its face looks forward and up over the cab.
     r2  "1L219M MAKS2005.jpg" (front three-quarter, MAKS 2005): the panel with chamfered corners, a framed array face,
         edge rivet strips and top corner blocks; two big headlamps and a third small one on the glacis, a guard bar,
         vision blocks on the glacis, tow eyes, a locker box at the front of the module, the dome and the rectangular
         sensor horn on the module top; the hull is the same boat-shaped MT-LB family.
     r3  "Zoopark 1L219 turret Tula 2016.JPG" (front three-quarter, plain green, antenna raised) and "1L219M back view
         MAKS2005.jpg" (rear three-quarter, flag and whip antennas, rear housing with louvres), both read in the check:
         they confirm the antenna stands at the REAR of the module on two arms, face looking FORWARD and up over the cab,
         top leaning back toward the stern; the dome and the horn at the module's FRONT; the module on the rear half of
         the roof.  r4  "Zoopark Tula 08.10.2017 (37668729276).jpg" (pure left side, read in the check): module spans about
         33-79 percent of the hull length from the nose, panel slant about 2.5 m at about 20 deg from vertical, panel top
         about 0.73 x the overall length above the ground (the model: 5.33 m on 7.34 m), sprocket at the nose, SEVEN road
         wheels and a small rear idler.
   CHECKED: working height - no published figure was found (English Wikipedia "Zoopark-1" gives none), so the 5.33 m raised
   height rests on the photographs (proportion above) and is kept; the travelling height in armour_specs is 2.7 m.
   No fetched photograph shows the antenna folded; the travel pose is not drawn because the rows have no set-up phase.
   Risk: the photographs suggest the hull roof a little higher and the module a little lower than drawn (roof 1.85 m is the
   published MT-LB figure); the module top (2.75 m) matches.
   Published figures: armour_specs.js row 7.2 x 2.9 x 2.7 m (travelling height).  Seven road wheels per r1 (the MT-LB has
   six; the MT-LBu is longer); the armour_specs row for radarv_p says 6 wheels - a data point reported, not followed.
   Antenna size (2.0 x 2.5 m), tilt (20 deg), module outline and sensor positions are read off r1/r2 by eye (unpublished).

   POSE: the rows are NOT deploy:true, so there is no travel/deploy split: the antenna is drawn RAISED, its working pose.
   The folded-flat travel pose is not drawn.  The whole module with the antenna is the trained node "turret".
   NOT drawn: radio masts and whips, camouflage nets, flags, plates and markings (the museum and fair stickers in r1/r2 are
   not copied), the cab interior.  Paint: plain Russian green, a single coat.
   Nodes: "turret" (origin on the ring centre, rest pointing +X) and seven "roadwheel" groups.  Materials (5): paint, dark,
   glass, array face, C.team (two small up-facing strips on the forward roof, 0.25 x 1.0 m).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZoopark = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var PAINT = { base: "#4f5a34", blots: ["#424c2a", "#5c6841", "#48532f"], seed: 219 };
  var NW = 7, XW = [-3.0, -2.34, -1.68, -1.02, -0.36, 0.30, 0.96];
  var FRT = { x: 1.95, z: 0.40, r: 0.31 };     /* front sprocket */
  var REA = { x: -3.38, z: 0.30, r: 0.26 };    /* rear idler */
  var ZW = 0.34, RWR = 0.30, TYC = 1.235, THW = 0.18;
  var TX = -0.45, TZ = 1.85;                   /* the ring centre on the roof */

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

  /* -------------------------------------------------------------- track belt */
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
    var zb = 0.055, ri = FRT.r + 0.045, rs = REA.r + 0.045;
    var Pf = [XW[NW - 1], zb], Pr = [XW[0], zb];
    var t1 = pickTangent(FRT, ri, Pf, true), t2 = pickTangent(REA, rs, Pr, false);
    var Lx = REA.x - FRT.x, Lz = REA.z - FRT.z, L = Math.sqrt(Lx * Lx + Lz * Lz), phi = Math.atan2(Lz, Lx);
    var al = Math.acos((ri - rs) / L), psi = Math.sin(phi + al) > Math.sin(phi - al) ? phi + al : phi - al;
    while (psi < t1) psi += TAU;
    while (t2 < psi) t2 += TAU;
    var p = [], T1, Q1, Q2, T2;
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
    T1 = [FRT.x + ri * Math.cos(t1), FRT.z + ri * Math.sin(t1)];
    line(Pf, T1);
    arc(FRT, ri, t1, psi);
    Q1 = [FRT.x + ri * Math.cos(psi), FRT.z + ri * Math.sin(psi)];
    Q2 = [REA.x + rs * Math.cos(psi), REA.z + rs * Math.sin(psi)];
    line(Q1, Q2);
    arc(REA, rs, psi, t2);
    T2 = [REA.x + rs * Math.cos(t2), REA.z + rs * Math.sin(t2)];
    line(T2, Pr);
    p.pop();
    return { path: p };
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.04, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;
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
    T.face = new THREE.MeshStandardMaterial({ color: 0x5f6a4a, roughness: 0.6, metalness: 0.2 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             face: new Bin(T.face, false), team: new Bin(T.team, false) };
  }

  /* a road wheel about the origin: dished steel disc with a rubber lip, hub boss and bolts, both sides (r1) */
  function wheel(bin) {
    var s, k, a, yc, o;
    for (s = -1; s <= 1; s += 2) {
      yc = s * 1.205;
      cyl(bin, [0, yc - 0.105, 0], [0, yc + 0.105, 0], RWR, RWR, 24);
      o = yc + s * 0.105;
      cyl(bin, [0, o, 0], [0, o + s * 0.022, 0], 0.235, 0.215, 22);
      cyl(bin, [0, o + s * 0.022, 0], [0, o + s * 0.06, 0], 0.095, 0.085, 14);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        box(bin, 0.16 * Math.cos(a) - 0.014, 0.16 * Math.cos(a) + 0.014, o + s * 0.022, o + s * 0.04, 0.16 * Math.sin(a) - 0.014, 0.16 * Math.sin(a) + 0.014);
      }
      cyl(bin, [0, yc - s * 0.105, 0], [0, yc - s * 0.14, 0], 0.17, 0.17, 12);
    }
  }

  function hr(x, hw, zb, zt, zs) {
    var bw = hw * 0.72;
    return [[x, -bw, zb], [x, bw, zb], [x, hw, zs], [x, hw, zt - 0.06], [x, 0.92 * hw, zt], [x, -0.92 * hw, zt],
            [x, -hw, zt - 0.06], [x, -hw, zs]];
  }

  function hull(B) {
    var s, k, i, bg = beltGeometry(), tg = [0.832, 0, -0.555], ng = [0.555, 0, 0.832];
    loft(B.paint, [hr(-3.60, 1.40, 0.45, 1.85, 0.95), hr(2.60, 1.45, 0.45, 1.85, 0.95), hr(3.20, 1.30, 0.50, 1.45, 0.90), hr(3.55, 0.95, 0.55, 1.10, 0.85)], false);
    belt(B.dark, bg.path, TYC - THW, TYC + THW);
    belt(B.dark, bg.path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      gear(B.dark, FRT.x, s * TYC - 0.12, s * TYC + 0.12, FRT.z, FRT.r - 0.04, FRT.r + 0.02, 14);
      cyl(B.dark, [FRT.x, s * (TYC + 0.12), FRT.z], [FRT.x, s * (TYC + 0.18), FRT.z], 0.13, 0.11, 12);
      cylY(B.dark, REA.x, s * TYC - 0.11, s * TYC + 0.11, REA.z, REA.r - 0.02, 18);
      cyl(B.dark, [REA.x, s * (TYC + 0.11), REA.z], [REA.x, s * (TYC + 0.17), REA.z], 0.10, 0.09, 10);
      /* idler crank arm */
      box(B.dark, REA.x - 0.05, REA.x + 0.30, s * (TYC + 0.12) - 0.02, s * (TYC + 0.12) + 0.02, REA.z - 0.04, REA.z + 0.04);
      /* headlamps (two close, one on the other side) with guard bars (r2) */
      /* side lockers and the step */
      box(B.dark, 0.2, 0.9, s * 1.455 - 0.02, s * 1.455 + 0.02, 1.05, 1.40);
      box(B.dark, -2.4, -1.8, s * 1.455 - 0.02, s * 1.455 + 0.02, 1.05, 1.40);
      box(B.dark, 1.40, 1.46, s * 1.455 - 0.02, s * 1.455 + 0.02, 1.0, 1.55);
      /* tow eyes on the nose, stern eyes */
      box(B.dark, 3.46, 3.60, s * 0.70 - 0.07, s * 0.70 + 0.07, 0.62, 0.74);
      box(B.dark, -3.68, -3.58, s * 0.85 - 0.07, s * 0.85 + 0.07, 0.62, 0.78);
      /* roof grille on each edge (r1): a dark bed with raised slats */
      box(B.dark, -1.65, -0.10, s * 1.02 - (s < 0 ? 0.36 : 0), s * 1.02 + (s > 0 ? 0.36 : 0), 1.85, 1.875);
      for (k = 0; k < 9; k++) box(B.paint, -1.62 + k * 0.17, -1.55 + k * 0.17, s * 1.02 - (s < 0 ? 0.36 : 0), s * 1.02 + (s > 0 ? 0.36 : 0), 1.875, 1.91);
      /* stowage box on the rear deck */
      box(B.paint, -3.40, -2.78, s * 0.72 - (s < 0 ? 0.52 : 0), s * 0.72 + (s > 0 ? 0.52 : 0), 1.85, 2.18);
      box(B.dark, -3.40, -2.78, s * 0.72 - (s < 0 ? 0.52 : 0), s * 0.72 + (s > 0 ? 0.52 : 0), 2.18, 2.205);
      /* the two small team strips on the forward roof */
      box(B.team, 1.45, 2.45, s * 1.12 - 0.125, s * 1.12 + 0.125, 1.85, 1.87);
      /* driver and commander hatches and their vision blocks on the glacis */
      cylZ(B.paint, 2.05, s * 0.55, 1.85, 1.93, 0.27, 18);
      cylZ(B.dark, 2.05, s * 0.55, 1.93, 1.955, 0.20, 12);
      onSlope(B.glass, [2.64, 0, 1.83], tg, ng, s * 0.55 - 0.13, s * 0.55 + 0.13, 0.00, 0.12, 0.0, 0.03);
      /* hull-side hatch seams on the flank */
      box(B.dark, -1.0, -0.95, s * 1.455 - 0.02, s * 1.455 + 0.02, 0.98, 1.60);
    }
    /* headlamps on the glacis: two close on the left, one small on the right (r2), guard bar over them */
    for (i = 0; i < 3; i++) {
      var yy = [0.38, 0.80, -1.00][i], rr = i < 2 ? 0.115 : 0.085, zz = 1.85 - (3.08 - 2.60) * 0.667 - 0.10;
      cylX(B.dark, 3.02, 3.16, yy, zz, rr, 12);
      box(B.glass, 3.16, 3.175, yy - rr * 0.7, yy + rr * 0.7, zz - rr * 0.7, zz + rr * 0.7);
    }
    bar(B.dark, [2.95, 0.20, 1.60], [3.17, 0.20, 1.46], 0.035);
    bar(B.dark, [3.17, 0.20, 1.46], [3.17, 1.05, 1.46], 0.035);
    /* rear: the round-cornered hatch on the deck, rear door lines */
    box(B.paint, -3.22, -2.62, -0.25, 0.30, 1.85, 1.88);
    box(B.dark, -3.62, -3.60, -1.0, 1.0, 0.78, 1.60);
    box(B.dark, -3.63, -3.60, -0.01, 0.01, 0.55, 1.60);
    /* trim vane on the glacis (folded) */
    onSlope(B.paint, [3.22, 0, 1.45], [0.95, 0, -0.30], [0.30, 0, 0.95], -0.8, 0.8, 0.0, 0.22, -0.01, 0.03);
  }

  /* -------------------------------------------------------------- the module and the raised array */
  function pbx(bin, P0, U, W, N, a0, a1, b0, b1, h0, h1) { planeBox(bin, P0, W, U, N, a0, a1, b0, b1, h0, h1); }
  var BETA = 20 * Math.PI / 180;     /* the face looks 20 degrees above the horizon */
  function module(B) {
    var s, k, i, P0, U, W, N, face, pts, inner;
    /* turntable, the box with its chamfered front */
    cylZ(B.dark, 0, 0, 0.0, 0.06, 1.12, 32);
    prism(B.paint, [[-1.70, -1.0], [0.90, -1.0], [1.30, -0.70], [1.30, 0.70], [0.90, 1.0], [-1.70, 1.0]], 0.06, 0.86);
    /* roof lids, the data plate panel, louvre panels and latch handles on the flanks */
    box(B.paint, -1.50, -0.20, -0.65, 0.65, 0.86, 0.90);
    box(B.dark, -1.30, -0.30, -0.45, 0.45, 0.90, 0.92);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -1.45, -0.55, s * 1.0 - (s < 0 ? 0.015 : 0), s * 1.0 + (s > 0 ? 0.015 : 0), 0.28, 0.72);
      for (k = 0; k < 7; k++) box(B.paint, -1.42 + k * 0.125, -1.38 + k * 0.125, s * 1.0 - (s < 0 ? 0.035 : 0), s * 1.0 + (s > 0 ? 0.035 : 0), 0.30, 0.70);
      box(B.dark, -0.30, 0.50, s * 1.0 - (s < 0 ? 0.015 : 0), s * 1.0 + (s > 0 ? 0.015 : 0), 0.25, 0.75);
      box(B.paint, -0.30, 0.50, s * 1.0 - (s < 0 ? 0.03 : 0), s * 1.0 + (s > 0 ? 0.03 : 0), 0.24, 0.27);
      box(B.dark, 0.60, 0.62, s * 1.0 - (s < 0 ? 0.02 : 0), s * 1.0 + (s > 0 ? 0.02 : 0), 0.20, 0.80);
      for (k = 0; k < 3; k++) box(B.dark, 0.05 + k * 0.30, 0.15 + k * 0.30, s * 1.0 - (s < 0 ? 0.04 : 0), s * 1.0 + (s > 0 ? 0.04 : 0), 0.60, 0.66);
      /* rear brackets that take the lift arms */
      box(B.paint, -1.80, -1.45, s * 0.82 - 0.09, s * 0.82 + 0.09, 0.30, 0.90);
    }
    /* the locker box at the front corner (r2) and the dome on the front (r1, r2) */
    box(B.paint, 0.85, 1.55, -1.38, -0.78, 0.08, 0.60);
    box(B.dark, 0.85, 1.56, -1.38, -0.78, 0.60, 0.63);
    box(B.dark, 1.54, 1.57, -1.30, -0.86, 0.20, 0.50);
    revolve(B.paint, [[1.20, 0.0], [1.23, 0.12], [1.32, 0.23], [1.45, 0.29], [1.58, 0.28], [1.68, 0.20], [1.74, 0.10], [1.76, 0.0]], 0.30, 0.52, 20);
    /* sensor horn on the top (r2): a tapering box with a dark mouth, on a short pedestal; and the mast head (r1) */
    box(B.paint, 0.55, 1.00, 0.20, 0.70, 0.86, 1.00);
    hexa(B.paint, [[0.60, 0.25, 1.00], [0.98, 0.25, 1.00], [1.02, 0.65, 1.00], [0.62, 0.65, 1.00],
                   [0.52, 0.12, 1.75], [1.08, 0.12, 1.75], [1.08, 0.78, 1.75], [0.52, 0.78, 1.75]]);
    box(B.dark, 0.60, 0.99, 0.18, 0.72, 1.75, 1.77);
    box(B.dark, 1.08, 1.10, 0.20, 0.70, 1.20, 1.70);
    /* the long rod along the module top (r1) with its end blocks */
    cylX(B.dark, -1.30, 0.55, -0.30, 0.98, 0.05, 10);
    box(B.paint, -1.30, -1.20, -0.38, -0.22, 0.90, 1.04);
    box(B.paint, 0.50, 0.60, -0.38, -0.22, 0.90, 1.04);
    /* the raised array: P0 is the centre of its lower edge, U up the leaning plane, W across, N the face normal */
    P0 = [-1.45, 0, 1.00];
    U = [-Math.sin(BETA), 0, Math.cos(BETA)]; W = [0, 1, 0]; N = [Math.cos(BETA), 0, Math.sin(BETA)];
    pts = [[-0.80, 0.00], [0.80, 0.00], [1.00, 0.25], [1.00, 2.15], [0.75, 2.50], [-0.75, 2.50], [-1.00, 2.15], [-1.00, 0.25]];
    inner = [[-0.74, 0.10], [0.74, 0.10], [0.90, 0.30], [0.90, 2.10], [0.70, 2.40], [-0.70, 2.40], [-0.90, 2.10], [-0.90, 0.30]];
    planePrism(B.paint, P0, U, W, N, pts, -0.22, 0.0);
    planePrism(B.face, P0, U, W, N, inner, 0.0, 0.035);
    /* array face seams, rim rivet strips, back ribs, corner blocks, hinge lugs */
    for (k = 1; k < 4; k++) pbx(B.dark, P0, U, W, N, -0.90, 0.90, 0.10 + k * 0.575 - 0.008, 0.10 + k * 0.575 + 0.008, 0.035, 0.045);
    for (k = 0; k < 14; k++) {
      pbx(B.dark, P0, U, W, N, 0.93, 0.98, 0.35 + k * 0.125, 0.40 + k * 0.125, -0.01, 0.03);
      pbx(B.dark, P0, U, W, N, -0.98, -0.93, 0.35 + k * 0.125, 0.40 + k * 0.125, -0.01, 0.03);
    }
    for (k = 0; k < 3; k++) pbx(B.paint, P0, U, W, N, -0.95, 0.95, 0.45 + k * 0.75, 0.55 + k * 0.75, -0.30, -0.22);
    for (k = 0; k < 2; k++) pbx(B.paint, P0, U, W, N, -0.50 + k * 0.90, -0.40 + k * 0.90, 0.10, 2.40, -0.30, -0.22);
    for (s = -1; s <= 1; s += 2) {
      pbx(B.paint, P0, U, W, N, s > 0 ? 0.62 : -0.98, s > 0 ? 0.98 : -0.62, 2.25, 2.58, -0.28, 0.06);
      pbx(B.dark, P0, U, W, N, s * 0.80 - 0.10, s * 0.80 + 0.10, -0.08, 0.14, -0.30, 0.02);
      /* the lift arms from the rear brackets to the back of the panel, and the crossed tube */
      bar(B.paint, [-1.62, s * 0.82, 0.80], [P0[0] + U[0] * 1.30 - N[0] * 0.30, s * 0.80, P0[2] + U[2] * 1.30 - N[2] * 0.30], 0.14);
      bar(B.dark, [-1.40, s * 0.90, 0.45], [P0[0] + U[0] * 0.60 - N[0] * 0.22, s * 0.88, P0[2] + U[2] * 0.60 - N[2] * 0.22], 0.07);
    }
    bar(B.dark, [P0[0] + U[0] * 1.30 - N[0] * 0.30, -0.80, P0[2] + U[2] * 1.30 - N[2] * 0.30],
        [P0[0] + U[0] * 1.30 - N[0] * 0.30, 0.80, P0[2] + U[2] * 1.30 - N[2] * 0.30], 0.09);
  }

  function build(THREE, M, C, key) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), MB = bins(T), k, wg, WB, tur;
    hull(HB);
    flush(THREE, g, HB);
    for (k = 0; k < NW; k++) {
      WB = { paint: new Bin(T.paint, true) };
      wheel(WB.paint);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[k], 0, ZW);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    module(MB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(TX, 0, TZ);
    flush(THREE, tur, { paint: MB.paint, dark: MB.dark, face: MB.face });
    g.add(tur);
    g.name = key;
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e00_radarv"] = {
  len: 7.3,
  build: function (THREE, M, C) { return HeroZoopark.build(THREE, M, C, "pact_e00_radarv"); }
};
UNIT_MODELS["radarv_p"] = {
  len: 7.3,
  build: function (THREE, M, C) { return HeroZoopark.build(THREE, M, C, "radarv_p"); }
};
