/* ============ ru_shturm.js - HERO model: 9P149 Shturm-S (SS-... "AT-6 Spiral") tank destroyer on the MT-LB ============
   One row, one model:
     pact_e80_tankdestroyer   "9P149 Shturm-S on the MT-LB" (in service 1979), turret:true, no deploy flag

   What each feature rests on (Wikimedia Commons photographs, cached in the scratchpad as shturm_ref/s1..s4 and
   shturm_ref2/r1..r5):
     s1  "9P149 vehicle with 9M144 missiles ... Military-historical Museum of Artillery, Saint-Petersburg" (front-right,
         Soviet green, launcher stowed): MT-LB hull with sloped glacis, FRONT toothed drive sprocket and six road
         wheels, mudguards; the sight barrel and its bracket on the right of the roof in the front half; the air
         intake grille on the front deck; a low flat-topped box at the extreme rear of the roof.
     s2  "9P149 Shturm-S Tank Destroyer.jpg" (front-left, launcher RAISED): a single long launch tube on a pedestal
         at the rear of the roof, the sight barrel on the vehicle's right (far side from this camera), its window
         in the front face, lying along the hull.
     r1  "9P149.jpg" (side, a missile leaving): the whole 9P149 in profile.  One tube, on a vertical pedestal about
         1.3 m ahead of the rear edge, the tube axis about 0.6 m above the roof at the pedestal, ONE tube, pointing
         forward and about 5-7 deg up; the sight barrel 1.15-1.65 m behind the nose line of the cab roof (x about
         +1.15 to +1.65), 0.2-0.5 m above the roof; front sprocket, six road wheels, rear idler.
     r2  "9P149 (possibly) near 3620 artillery supply base (Minsk) 2.jpg" (front-right, launcher raised, Soviet
         green): the same single tube on its post at the rear of the roof, the post coming out of a boxed collar,
         the sight barrel on the roof's right with its column and bracket.
     s3, r5  burnt-out hulls: the driver's round hatch with a raised vision-block front on the left; headlamp guards.
     s4  full front: glacis bolt rows, two headlamps in guards, the trim vane lying on the glacis.
   Published figures used: MT-LB hull about 6.45 m long, 2.85 m wide (armour_specs.js row for the Strela-10 on the
   same hull: 6.6 x 2.85 x 2.3); the 9M114 container about 1.9 m long, 0.19 m across.  Height of the 9P149 with the
   launcher stowed was not confirmed from a published source; the model stands 2.18 m to the top of the sight.

   HULL: the same MT-LB geometry as js/hero/ru_osa_strela.js (front sprocket, six road wheels, rear idler).  The
   9P149's own part is the roof: sight barrel and bracket on the right at x +1.40, front-deck grille, driver's hatch
   on the left, the launcher's housing box at the rear.
   LAUNCHER: ONE tube (r1, r2, s2 all show one), level and wholly under the roof at rest, the roof closed by the
   fixed housing box.  Raised, the pedestal stands on the roof axis 1.85 m behind the middle; the tube axis is 0.62 m
   above the roof at the post, the tube stands 7.4 deg nose-up (r1: 5-7 deg), 1.9 m long, the muzzle 1.33 m ahead of
   the post, 0.57 m behind it.  render3d poseLauncher can only ROTATE the group "podelev" about its local Y
   (userData.el), so the real straight lift up the pedestal is approximated by a rotation of 0.13 rad about a
   VIRTUAL hinge 6.5 m behind the post at tube height: the post comes up 0.84 m and shifts 0.05 m, and the tube ends at
   the el it was built at.  Nothing is drawn at the hinge.  The post leans 7.4 deg at rest so it stands upright raised.
   NOT confirmed and drawn by judgement: the exact tube pitch, the housing box size (taken from s1/r1/r2), that the
   box is fixed rather than a lid lifting with the launcher (no photograph shows a lid), the centre-line position of
   the pedestal.  NOT drawn: radio masts, wading screens, canvas, markings, numerals, a cover over the roof grille.
   Soviet olive green (period paint), no tactical markings.

   Nodes: "turret" (pivot on the pedestal axis, rest pointing forward +X) carries the group "podelev" (origin at the
   virtual hinge, userData.el, userData.cells = one cell: mouth x, y, z, rear x in that frame); six "roadwheel"
   groups (axle on local Y).  Materials: paint (canvas), dark, glass, missile body, plain C.team (one up-facing
   strip on the left of the roof).  Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroShturm = (function () {
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
  /* ============================================================ 9P149 ON THE MT-LB */
  var ZW = 0.36, RWR = 0.30, TYC = 1.235, THW = 0.18;
  var ROOF = 1.62;
  var XP = -1.85;                         /* the launcher's pedestal axis, hull x (the turret node's pivot) */
  var EL = 0.13;                          /* the raise angle, rad: the tube stands 7.4 deg nose-up when raised */
  var CS = 1.40;                          /* the tube axis height at rest, under the roof (roof 1.62) */
  var RISE = ROOF + 0.62 - CS;            /* how far the tube axis must come up at the pedestal */
  var DX = RISE / Math.sin(EL);           /* the hinge lies this far behind the pedestal, at tube height */
  var HX = XP - DX;                       /* hinge x (a virtual hinge behind the hull: no geometry sits there) */

  function stWheel(bin, x) {
    var s, k, a, yc, o;
    for (s = -1; s <= 1; s += 2) {
      yc = s * 1.205;
      cyl(bin, [0, yc - 0.105, 0], [0, yc + 0.105, 0], RWR, RWR, 22);
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

  function hull(B) {
    var s, k, bg = beltGeometry(), z, xc;
    /* lower hull and the narrower upper hull with the sloped glacis (as the Strela-10's MT-LB) */
    profY(B.paint, [[-3.20, 0.55], [2.90, 0.55], [3.25, 0.85], [3.25, 1.00], [-3.20, 1.00]], -1.12, 1.12);
    profY(B.paint, [[-3.20, 1.00], [3.25, 1.00], [2.45, 1.58], [2.0, 1.62], [-3.0, 1.62], [-3.20, 1.50]], -0.98, 0.98);
    belt(B.dark, bg.path, TYC - THW, TYC + THW);
    belt(B.dark, bg.path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      gear(B.dark, IDL.x, s * TYC - 0.12, s * TYC + 0.12, IDL.z, IDL.r - 0.04, IDL.r + 0.02, 14);
      cyl(B.dark, [IDL.x, s * (TYC + 0.15), IDL.z], [IDL.x, s * (TYC + 0.20), IDL.z], 0.14, 0.12, 12);
      cylY(B.dark, SPR.x, s * TYC - 0.11, s * TYC + 0.11, SPR.z, SPR.r - 0.02, 20);
      cyl(B.dark, [SPR.x, s * (TYC + 0.11), SPR.z], [SPR.x, s * (TYC + 0.16), SPR.z], 0.10, 0.09, 12);
      box(B.paint, -2.90, 2.70, s > 0 ? 1.05 : -1.405, s > 0 ? 1.405 : -1.05, 0.95, 0.99);
      prism(B.paint, s > 0 ? [[2.70, 1.05], [3.15, 1.05], [3.25, 1.25], [2.70, 1.405]] : [[2.70, -1.405], [3.25, -1.25], [3.15, -1.05], [2.70, -1.05]], 0.95, 0.99);
      box(B.dark, -2.90, 2.70, s * 1.405 - 0.02, s * 1.405 + 0.02, 0.89, 1.01);
      /* headlamp, glass and the guard frame round it (s4, s3) */
      cylX(B.dark, 3.18, 3.28, s * 0.62, 1.12, 0.10, 12);
      box(B.glass, 3.27, 3.285, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.06, 1.18);
      box(B.dark, 3.20, 3.26, s * 0.62 - 0.12, s * 0.62 + 0.12, 0.98, 1.00);
      box(B.dark, 3.20, 3.26, s * 0.62 - 0.12, s * 0.62 + 0.12, 1.24, 1.26);
      box(B.dark, 3.20, 3.26, s * 0.62 - 0.125, s * 0.62 - 0.105, 0.98, 1.26);
      box(B.dark, 3.20, 3.26, s * 0.62 + 0.105, s * 0.62 + 0.125, 0.98, 1.26);
      box(B.dark, 3.22, 3.32, s * 0.95 - 0.06, s * 0.95 + 0.06, 0.62, 0.74);
      /* bolt rows on the glacis plate */
      for (k = 0; k < 5; k++) {
        z = 1.05 + k * 0.1;
        xc = 2.45 + 0.8 * (1.58 - z) / 0.58;
        box(B.dark, xc - 0.01, xc + 0.03, s * 0.78 - 0.02, s * 0.78 + 0.02, z - 0.02, z + 0.02);
      }
    }
    /* trim vane lying on the glacis */
    var tg = [-0.81, 0, 0.587], ng = [0.587, 0, 0.81];
    onSlope(B.paint, [3.25, 0, 1.0], tg, ng, -0.85, 0.85, 0.12, 0.72, -0.01, 0.04);
    for (k = -2; k <= 2; k++) onSlope(B.dark, [3.25, 0, 1.0], tg, ng, k * 0.34 - 0.015, k * 0.34 + 0.015, 0.12, 0.72, 0.04, 0.06);
    /* driver's round hatch on the left with its vision blocks (s3: raised front with three blocks) */
    cylZ(B.paint, 1.55, 0.50, ROOF, ROOF + 0.08, 0.27, 18);
    cylZ(B.dark, 1.55, 0.50, ROOF + 0.08, ROOF + 0.105, 0.20, 14);
    box(B.paint, 2.00, 2.20, 0.30, 0.72, ROOF, ROOF + 0.12);
    for (k = -1; k <= 1; k++) box(B.glass, 2.20, 2.225, 0.50 + k * 0.14 - 0.05, 0.50 + k * 0.14 + 0.05, ROOF + 0.04, ROOF + 0.10);
    /* the air intake grille on the front deck (s1) */
    box(B.paint, 1.68, 1.96, -0.36, 0.04, ROOF, ROOF + 0.05);
    for (k = 0; k < 5; k++) box(B.dark, 1.71 + k * 0.05, 1.735 + k * 0.05, -0.33, 0.01, ROOF + 0.05, ROOF + 0.065);
    /* the sight housing on the vehicle's right (s1, s2, r1, r2): a barrel lying along the hull with a window in
       its front face, carried on a short column and a braced bracket; r1 puts it 1.15-1.65 m ahead of the roof's
       middle, about 0.2-0.5 m above the roof */
    var hx = 1.40, hy = -0.56, hz = ROOF + 0.36;
    box(B.dark, hx - 0.30, hx + 0.12, hy - 0.22, hy + 0.22, ROOF, ROOF + 0.04);
    cylZ(B.paint, hx - 0.06, hy, ROOF + 0.04, hz - 0.12, 0.075, 14);
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [hx - 0.24, hy + s * 0.18, ROOF + 0.04], [hx - 0.04, hy + s * 0.17, hz - 0.08], 0.035);
      bar(B.paint, [hx + 0.08, hy + s * 0.18, ROOF + 0.04], [hx - 0.04, hy + s * 0.17, hz - 0.08], 0.035);
    }
    box(B.paint, hx - 0.14, hx + 0.04, hy - 0.20, hy + 0.20, hz - 0.14, hz - 0.08);
    cylX(B.paint, hx - 0.30, hx + 0.30, hy, hz, 0.155, 26);
    cylX(B.dark, hx + 0.30, hx + 0.325, hy, hz, 0.135, 22);
    cylX(B.glass, hx + 0.325, hx + 0.335, hy, hz, 0.105, 22);
    cylX(B.dark, hx - 0.33, hx - 0.30, hy, hz, 0.14, 22);
    box(B.paint, hx - 0.12, hx + 0.30, hy - 0.05, hy + 0.05, hz + 0.15, hz + 0.19);
    box(B.dark, hx - 0.02, hx + 0.10, hy - 0.17, hy - 0.155, hz - 0.06, hz + 0.06);
    /* the launcher's housing on the rear deck (s1: a low flat-topped box at the back of the roof; r1: the
       pedestal comes up out of a boxed collar).  It is fixed to the hull and closes the roof over the stowed
       launcher; whether it is the launcher's own lid is not confirmed */
    box(B.paint, XP - 0.62, XP + 0.62, -0.40, 0.40, ROOF, ROOF + 0.105);
    box(B.dark, XP - 0.64, XP + 0.64, -0.42, 0.42, ROOF, ROOF + 0.03);
    box(B.paint, XP - 0.56, XP + 0.56, -0.34, 0.34, ROOF + 0.105, ROOF + 0.12);
    for (k = -1; k <= 1; k += 2) for (s = -1; s <= 1; s += 2) cylZ(B.dark, XP + k * 0.46, s * 0.27, ROOF + 0.12, ROOF + 0.14, 0.022, 8);
    /* team strip on the left of the roof, up-facing for the RTS camera */
    box(B.team, -1.00, 0.10, 0.34, 0.58, ROOF, ROOF + 0.02);
    /* rear doors, step plate, air louvres, and the hull side doors */
    box(B.dark, -3.22, -3.20, -0.9, 0.9, 0.90, 1.45);
    box(B.dark, -3.22, -3.19, -0.01, 0.01, 0.62, 1.45);
    box(B.dark, -3.22, -3.19, -0.9, -0.5, 0.58, 0.66);
    box(B.dark, -3.22, -3.19, 0.5, 0.9, 0.58, 0.66);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -0.4, -0.35, s * 1.115, s * 1.125, 0.62, 0.98);
      box(B.dark, 0.6, 0.65, s * 1.115, s * 1.125, 0.62, 0.98);
      box(B.dark, -0.4, 0.65, s * 1.115, s * 1.125, 0.62, 0.66);
    }
  }

  /* The launcher is the group "podelev" inside the node "turret" (pivot on the pedestal axis XP).  Everything is
     drawn at REST in hull coordinates (tube level, axis at height CS, wholly under the roof), then shifted so the
     origin of the group is the hinge H = (HX, 0, CS) in the turret frame.  render3d turns the group about its
     local Y by userData.el: the tube comes up DX*sin(EL) = 0.84 m at the pedestal (to 0.62 m above the roof, as
     r1 and r2 show) and ends 7.4 deg nose-up, as r1 shows.  The real launcher rises straight up on a pedestal;
     a single rotation cannot do that, so the hinge is a virtual one 6.5 m behind the pedestal. */
  function launcher(B) {
    var k, XT0 = XP - 0.57, XT1 = XP + 1.33, r = 0.095, se = Math.sin(EL), ce = Math.cos(EL), A = [XP, 0, CS], d = [-se, 0, -ce];
    function along(t) { return [A[0] + d[0] * t, 0, A[2] + d[2] * t]; }
    /* the launch container: one tube, end rings, clamps, the rear cap and the lid at the muzzle (r1, r2, s2) */
    cylX(B.paint, XT0, XT1, 0, CS, r, 24);
    cylX(B.dark, XT0 - 0.07, XT0, 0, CS, r + 0.012, 20);
    cylX(B.dark, XT0 - 0.09, XT0 - 0.07, 0, CS, r * 0.7, 14);
    cylX(B.dark, XT1, XT1 + 0.05, 0, CS, r + 0.02, 22);
    cylX(B.msl, XT1 + 0.05, XT1 + 0.06, 0, CS, r * 0.66, 16);
    for (k = 0; k < 5; k++) cylX(B.dark, XT0 + 0.22 + k * 0.36, XT0 + 0.27 + k * 0.36, 0, CS, r + 0.012, 20);
    /* the cradle beam under the tube and its two end blocks */
    box(B.paint, XT0 + 0.08, XT1 - 0.25, -0.07, 0.07, CS - r - 0.075, CS - r + 0.005);
    box(B.dark, XT0 + 0.05, XT0 + 0.20, -0.10, 0.10, CS - r - 0.09, CS - r + 0.01);
    box(B.dark, XT1 - 0.40, XT1 - 0.25, -0.10, 0.10, CS - r - 0.09, CS - r + 0.01);
    /* the pedestal: a post leaning so that it stands upright when the group is raised, a yoke with two trunnion
       blocks, a servo box each side, and the collar that sits on the housing */
    var P0 = along(0.15), P1 = along(0.98), Pc = along(0.47);
    cyl(B.paint, P0, P1, 0.075, 0.075, 14);
    cyl(B.dark, Pc, along(0.53), 0.135, 0.135, 18);
    for (k = -1; k <= 1; k += 2) {
      box(B.paint, XP - 0.11, XP + 0.11, k * 0.13 - 0.02, k * 0.13 + 0.02, CS - 0.22, CS - 0.01);
      cylY(B.dark, XP, k * 0.15, k * 0.22, CS - 0.02, 0.045, 12);
      box(B.dark, XP - 0.17, XP - 0.02, k * 0.22 - 0.045, k * 0.22 + 0.045, CS - 0.16, CS - 0.04);
    }
    /* shift to the hinge frame */
    var key, b, i;
    for (key in B) { b = B[key]; for (i = 0; i < b.P.length; i += 3) { b.P[i] -= HX; b.P[i + 2] -= CS; } }
    return [[XT1 + 0.06 - HX, 0, 0, XT0 - 0.09 - HX]];
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), EB = bins(T), k, wg, WB, tur, E, cells;
    hull(HB);
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
    cells = launcher(EB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(XP, 0, ROOF);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX - XP, 0, CS - ROOF);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = EL;
    tur.add(E);
    g.add(tur);
    g.name = "pact_e80_tankdestroyer";
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e80_tankdestroyer"] = {
  len: 6.54,
  build: function (THREE, M, C) { return HeroShturm.build(THREE, M, C); }
};
