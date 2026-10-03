/* ============ ru_s400.js - HERO model: the S-400 Triumf 5P85TE2 launcher, a semi-trailer behind a BAZ-64022 6x6 tractor ============
   One row (rules.js, deploy:true, rounds 4, present day): sam_p "S-400 Triumf, 5P85TE2 TEL" (from e20). The row text says
   "eight-wheeled tractor"; the photographs show the 5P85TE2 as a SEMI-TRAILER behind a three-axle 6x6 BAZ-64022 cab-over tractor
   (the 5P85SE2 on the eight-wheel BAZ-6909 is a different launcher, not drawn). Reported as a data wording problem; nothing edited.
   Paint: plain Russian green, no camouflage, no markings (the parade photograph's door star is NOT drawn).

   What each feature rests on (Wikimedia Commons, cached in the scratchpad ru_s400_ref):
     "ParkPatriot2015part8-01" (5P85TE2 TEL, front 3/4 from the starboard side, canisters erected): the flat-faced cab-over
         cab with TWO windscreen panes under a visor, big front bumper with lamps at each end, three tractor axles with
         lugged tyres about 1.6 m across, an upright spare wheel and a boarding ladder on the starboard side behind the cab, an
         equipment housing with two small drums above the tractor frame, the low semi-trailer with its fifth-wheel overlap,
         equipment cases along the trailer frame, a rear two-axle bogie, levelling jacks with foot pads, and the block of four
         ribbed canisters (2x2) on a lattice erector with a cross frame.
     "2013 Moscow Victory Day Parade (37)" (captioned 5P85T2/TE2 TEL, front 3/4 from the port side, canisters lying): the
         canisters lie level over the tractor with their noses just behind the cab roof and the pivot at the rear of the
         trailer; amber lamps along the cab roof edge, a roof spotlight on the port corner, big mirrors on arms.
     "ParkPatriot2015part8-02" (5P85TE2, starboard side, erected): the side view of the tractor (cab ahead of the front axle by
         about 2.5 m, spare wheel and ladder behind the cab, tandem rear axles) and of the trailer (two close axles with
         smaller tyres, the equipment cases along its side, inclined jack legs with foot pads at the trailer rear and
         ahead of the cases), and the erected block of four canisters at the rear.
     "ParkPatriot2015part12-45" (5P85TE2, from dead ahead): the flat cab face, two windscreen panes, the lower panel with a
         round badge, the wide bumper with a lamp and a wire guard at each end, big mirrors on arms, roof lamps.
     "S-400 Triumf launch vehicle" (2010 parade, side on, canisters lying) and "S-400 5P85T2 Moscow 2015" (from above):
         the lying block of 2 x 2 canisters on the trailer deck from the rear end to over the trailer front, the rig's
         proportions (length about ten tractor-tyre diameters; the cab roof about two tyre diameters up).
   Published: no maker figure was found. The only figure is the Hobby Boss 85517 kit (BAZ-64022 with 5P85TE2, 1:35) listed by
     retailers as 437 mm long, 113.2 mm wide when built (15.3 m and 3.96 m scaled: the width presumably counts mirrors and
     jack pads). The photographs agree with about 15 m only if the tractor tyres are about 1.6 m (16.00-type), so this model
     is 15.3 m long, tyres 1.6 m (trailer 1.1 m), cab 3.1 m wide, roof about 3.15 m, stowed width 3.3 m. The canister block
     (6.3 m body, 1.04 m tubes) is scaled from the photographs; the erected block stands on the trailer's rear table (the
     photographs show it nearly on the ground behind the trailer, which would put hidden geometry beyond the visible length
     that render3d scales by; this is the one deliberate departure).
   NOT confirmed and not drawn: any marking, the whip antenna, the exact jack count (four inclined legs drawn, two
     stations a side as the photographs show), axle spacing (scaled from the photographs), the interior of the erector.

   Poses (render3d finds them by name, shows one from e.deployed): "travelpose" = canisters lying level on the trailer
   deck (tail at the rear end, nose over the trailer front), jacks folded; "deploypose" = canisters stood vertical on the
   trailer's rear table on four posts with two erector rams, jacks down on inclined legs. Tractor and trailer chassis and the five "roadwheel" axle groups (a tyre each side) stay outside both. Nothing is
   named "turret" (the block never traverses).
   Materials (5): paint, dark, glass, tyre, C.team (two small up-facing strips on the cab roof).
   +X nose, +Y left, +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroS400 = (function () {
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



  /* The rig is drawn in a "kit" frame and stretched into place by xform(): x by SX, y by SY, and the cab part above z 1.45
     squeezed to 0.78 so the cab roof ends about 3.15 m (the photographs put the roof at about 1.95 tyre diameters).  Round
     things (spare wheel, drums, fifth wheel) are built after the stretch (the R bins) so they stay round. */
  var SX = 1.25, SY = 1.05, ZK = 1.45, ZL = 0.30, ZS = 0.78, ZB = 1.75;
  function zmap(z) { return z <= ZK ? z + ZL : ZB + (z - ZK) * ZS; }
  var AXTP = [5.05, 1.15, -0.45], AXRP = [-6.60, -5.45];     /* axles in metres: tractor (front, tandem), trailer bogie */
  var AXT = [AXTP[0] / SX, AXTP[1] / SX, AXTP[2] / SX], AXR = [AXRP[0] / SX, AXRP[1] / SX];
  var RTT = 0.80, RTR = 0.55;                                /* tyre radii: tractor 1.6 m tyres, trailer 1.1 m */
  var AXZT = RTT - ZL, AXZR = RTR - ZL;                      /* axle shaft heights in the kit frame */
  var TY = 1.18;
  var PVX = -7.17, PVZ = 3.08;                              /* canister block pivot, travel pose (world) */
  var DPX = -6.55, DPZ = 2.35;                              /* the block stood up on the trailer rear table: axis x, tail height */
  var CR = 0.52, CS = 0.54, CL = 6.30;                      /* canister radius, row/column offset, body length */
  var JXP = [-3.20, -7.35];                                 /* jack stations (x), hinged at |y| 1.47 on the trailer side */

  var PAINT = { base: "#4a5a3a", blots: ["#3d4b30", "#566645", "#445234"], seed: 40041 };

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
  function bins(T, withAll) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (withAll) { b.glass = new Bin(T.glass, false); b.team = new Bin(T.team, false); }
    return b;
  }

  /* a lugged cross-country tyre on the Y axis centred at (0, yc, 0): chevron lugs a half step apart, dished wheel */
  function tyre(bin, yc, ph, hub, sc, hk) {
    var N = 18, R = [[-0.30, 0.50, 0, 0], [-0.30, 0.66, 0, 0], [-0.22, 0.75, 1, 0], [-0.03, 0.75, 1, 0],
                     [0.03, 0.75, 1, 1], [0.22, 0.75, 1, 1], [0.30, 0.66, 0, 0], [0.30, 0.50, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1] * sc;
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.03;
      a = (j + ph) / N * TAU;
      V.push([r * Math.cos(a), yc + R[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + R[0][0], 0], [0, yc + R[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    if (hub) for (k = -1; k <= 1; k += 2) {
      cylY(bin, 0, yc + k * 0.29, yc + k * 0.33, 0, 0.40 * hk, 10);
      cylY(bin, 0, yc + k * 0.33, yc + k * 0.38, 0, 0.16 * hk, 8);
    }
  }

  /* ---------------------------------------------- tractor and trailer (both poses) */
  function sbox(bin, x0, x1, s, y, t, z0, z1) { box(bin, x0, x1, s > 0 ? y : y - t, s > 0 ? y + t : y, z0, z1); }   /* a slab proud of a side face at y */

  function addTractor(B, R) {
    var i, k, s, a, yy;
    /* frame, bumper, tow eyes, lamps */
    box(B.dark, -0.95, 5.95, -0.78, 0.78, 0.95, 1.38);
    for (i = 0; i < 3; i++) cylY(B.dark, AXT[i], -1.00, 1.00, AXZT, 0.11, 8);
    box(B.paint, 5.88, 6.15, -1.45, 1.45, 0.78, 1.22);
    box(B.dark, 5.95, 6.17, -1.40, 1.40, 0.88, 0.94);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 6.10, 6.18, s * 1.22, 1.00, 0.095, 10);
      cylX(B.glass, 6.18, 6.20, s * 1.22, 1.00, 0.07, 10);
      box(B.dark, 6.10, 6.18, s * 0.62 - 0.12, s * 0.62 + 0.12, 0.92, 1.06);
      box(B.dark, 6.10, 6.18, s * 0.86 - 0.12, s * 0.86 + 0.12, 0.92, 1.06);
      box(B.dark, 6.15, 6.22, s * 0.30 - 0.08, s * 0.30 + 0.08, 0.84, 0.94);        /* tow eyes */
    }
    /* cab: flat face, lower body with the grille panels, windscreen panes under a visor */
    box(B.paint, 3.55, 5.95, -1.45, 1.45, 1.45, 3.25);
    box(B.paint, 5.95, 6.00, -1.38, 1.38, 1.50, 2.20);
    for (k = 0; k < 3; k++) box(B.dark, 5.98, 6.02, -1.00, 1.00, 1.62 + k * 0.17, 1.68 + k * 0.17);
    box(B.dark, 5.98, 6.02, -0.04, 0.04, 1.55, 2.12);
    box(B.dark, 5.95, 6.03, -1.38, -1.12, 1.50, 2.12);                               /* corner vents */
    box(B.dark, 5.95, 6.03, 1.12, 1.38, 1.50, 2.12);
    for (s = -1; s <= 1; s += 2) {
      a = s * 0.70;
      box(B.dark, 5.95, 6.00, a - 0.60, a + 0.60, 2.22, 3.08);                       /* pane frame */
      box(B.glass, 6.00, 6.03, a - 0.54, a + 0.54, 2.28, 3.02);
    }
    box(B.dark, 5.90, 6.06, -1.38, 1.38, 3.08, 3.20);                                 /* visor */
    for (k = 0; k < 3; k++) cylZ(B.dark, 5.90, -0.60 + k * 0.60, 3.25, 3.31, 0.05, 6);  /* roof edge lamps */
    box(B.glass, 5.86, 5.94, -1.43, -1.35, 3.28, 3.31);
    /* side doors: window, seam, handle, step; the mirror arms at the front corners */
    for (s = -1; s <= 1; s += 2) {
      yy = s * 1.45;
      sbox(B.dark, 4.62, 5.60, s, yy, 0.03, 2.20, 3.08);
      sbox(B.glass, 4.70, 5.52, s, yy + s * 0.03, 0.02, 2.28, 3.02);
      sbox(B.dark, 4.58, 4.61, s, yy, 0.03, 1.55, 3.10);
      sbox(B.dark, 5.62, 5.65, s, yy, 0.03, 1.55, 3.10);
      sbox(B.dark, 4.68, 4.88, s, yy, 0.05, 2.10, 2.15);
      sbox(B.dark, 4.30, 4.62, s, yy, 0.10, 1.22, 1.30);                     /* step */
      bar(B.dark, [5.78, s * 1.45, 2.80], [5.84, s * 1.56, 2.70], 0.04);
      box(B.dark, 5.78, 5.86, s * 1.56 - 0.03, s * 1.56 + 0.03, 2.25, 2.95);         /* mirror */
      box(B.dark, 5.78, 5.86, s * 1.56 - 0.03, s * 1.56 + 0.03, 2.25, 2.95);
      box(B.dark, 5.78, 5.84, s * 1.50 - 0.03, s * 1.50 + 0.03, 2.05, 2.28);          /* small mirror */
      /* wheel arches over the tractor axles: flat guards with a lip */
      for (i = 0; i < 3; i++) {
        sbox(B.paint, AXT[i] - 0.78, AXT[i] + 0.78, s, s * 0.82, 0, 1.40, 1.46);
      }
    }
    /* fenders over the rear tractor pair and the front axle (arch tops, outboard of the cab) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.05, 1.65, s > 0 ? 0.85 : -1.50, s > 0 ? 1.50 : -0.85, 1.38, 1.44);
      box(B.paint, -1.05, 1.65, s > 0 ? 1.44 : -1.50, s > 0 ? 1.50 : -1.44, 1.10, 1.44);
      box(B.paint, AXT[0] - 0.82, AXT[0] + 0.82, s > 0 ? 1.45 : -1.55, s > 0 ? 1.55 : -1.45, 1.20, 1.26);
    }
    /* behind the cab: the housing over the frame with its sloped front, two drums, the ladder, the spare wheel */
    profY(B.paint, [[-0.65, 1.38], [1.60, 1.38], [1.60, 1.72], [1.10, 2.00], [-0.65, 2.00]], -0.95, 0.95);
    box(B.dark, -0.65, 1.60, -0.96, -0.93, 1.45, 1.90);
    box(B.dark, -0.65, 1.60, 0.93, 0.96, 1.45, 1.90);
    for (k = 0; k < 2; k++) cylY(R.paint, (0.55 + k * 0.40) * SX, -1.05 * SY, -0.60 * SY, zmap(1.62), 0.19, 12);   /* the two drums */
    box(B.dark, 1.62, 3.55, -0.60, 0.60, 1.38, 1.60);                                  /* frame between cab and housing */
    box(B.dark, 1.64, 1.68, -1.30, -0.95, 1.45, 2.30);                                 /* ladder rails */
    box(B.dark, 2.10, 2.14, -1.30, -0.95, 1.45, 2.30);
    for (k = 0; k < 5; k++) box(B.dark, 1.68, 2.10, -1.28, -0.97, 1.65 + k * 0.14, 1.69 + k * 0.14);
    cyl(R.tyre, [2.75 * SX, -1.45, 2.30], [2.75 * SX, -1.09, 2.30], 0.80, 0.80, 20);        /* upright spare wheel */
    cyl(R.paint, [2.75 * SX, -1.45, 2.30], [2.75 * SX, -1.47, 2.30], 0.40, 0.40, 14);
    box(B.dark, 2.45, 3.05, -1.04, -0.96, 1.40, 1.80);
    box(B.team, 4.30, 5.30, 0.95, 1.20, 3.25, 3.27);                                  /* team strips (the two, on the cab roof) */
    box(B.team, 4.30, 5.30, -1.20, -0.95, 3.25, 3.27);
    cylZ(B.dark, 5.50, 1.15, 3.25, 3.42, 0.065, 8);                                    /* spotlight on its post */
    cylX(B.dark, 5.50, 5.64, 1.15, 3.50, 0.10, 10);
    cylX(B.glass, 5.64, 5.66, 1.15, 3.50, 0.075, 10);
    /* fifth wheel plate */
    cylZ(R.dark, 0.20 * SX, 0, zmap(1.38), zmap(1.50), 0.50, 16);
  }

  function addTrailer(B, R) {
    var i, k, s, x;
    /* main frame, deck, gooseneck over the fifth wheel */
    box(B.dark, -6.00, 0.60, -0.85, 0.85, 1.28, 1.52);
    box(B.paint, -6.00, 0.60, -1.20, 1.20, 1.52, 1.60);
    box(B.dark, -6.00, -5.88, -1.30, 1.30, 1.15, 1.45);                                /* rear beam */
    for (i = 0; i < 2; i++) cylY(B.dark, AXR[i], -1.00, 1.00, AXZR, 0.10, 8);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -6.04, -6.00, s * 1.05 - 0.07, s * 1.05 + 0.07, 1.25, 1.38);          /* rear lamps */
      /* fenders over the bogie */
      box(B.paint, -5.95, -3.20, s > 0 ? 0.88 : -1.52, s > 0 ? 1.52 : -0.88, 1.38, 1.44);
      box(B.paint, -5.95, -3.20, s > 0 ? 1.46 : -1.52, s > 0 ? 1.52 : -1.46, 1.15, 1.44);
      /* equipment cases along the frame with seams and handles */
      box(B.paint, -3.05, -0.20, s > 0 ? 1.00 : -1.45, s > 0 ? 1.45 : -1.00, 1.40, 1.95);
      for (i = 0; i < 4; i++) {
        x = -3.05 + i * 0.72;
        box(B.dark, x, x + 0.02, s > 0 ? 1.45 : -1.48, s > 0 ? 1.48 : -1.45, 1.42, 1.93);
        box(B.dark, x + 0.18, x + 0.40, s > 0 ? 1.45 : -1.49, s > 0 ? 1.49 : -1.45, 1.66, 1.70);
      }
      box(B.dark, -3.05, -0.20, s > 0 ? 1.00 : -1.45, s > 0 ? 1.45 : -1.00, 1.95, 1.97);
    }
    /* jack housings on the trailer sides (legs are in the poses) */
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2)
      box(B.dark, JXP[i] / SX - 0.16, JXP[i] / SX + 0.16, s * 1.40 - 0.12, s * 1.40 + 0.12, 1.05, 1.52);
    /* the rear table the block lies on */
    box(B.dark, -5.90, -4.10, -1.05, 1.05, 1.60, 1.70);
    for (k = 0; k < 3; k++) box(B.dark, -5.70 + k * 0.50, -5.62 + k * 0.50, -1.05, 1.05, 1.70, 1.73);
  }

  /* ------------------------------------------------------------- the poses */
  /* the canister block in its own frame: origin at the pivot, axis along +X, rows along Z, columns along Y */
  function addBlock(B) {
    var i, j, k, y, z, rb;
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      y = i * CS; z = j * CS;
      cylX(B.paint, 0.0, CL, y, z, CR, 14);                                            /* the tube */
      for (k = 0; k < 7; k++) {
        rb = 0.55 + k * 0.85;
        cylX(B.paint, rb, rb + 0.07, y, z, CR + 0.02, 14);                              /* ring ribs */
      }
      cyl(B.paint, [CL, y, z], [CL + 0.26, y, z], CR, CR - 0.06, 14);                   /* domed end cap */
      cylX(B.dark, CL + 0.26, CL + 0.29, y, z, CR - 0.12, 12);
      cylX(B.dark, -0.28, 0.0, y, z, CR - 0.05, 12);                                    /* tail */
      cylX(B.dark, 0.20, 0.34, y, z, CR + 0.025, 14);                                   /* tail band */
      cylX(B.dark, CL - 0.34, CL - 0.20, y, z, CR + 0.025, 14);                         /* head band */
    }
    /* cradle: base beams, the cross ties and the erector frame at the tail */
    for (i = -1; i <= 1; i += 2) box(B.dark, -0.10, CL - 0.20, i * (CS + CR + 0.04) - 0.06, i * (CS + CR + 0.04) + 0.06, -CS - CR - 0.12, -CS - CR + 0.06);
    for (k = 0; k < 5; k++) {
      var fx = 0.30 + k * 1.40;
      box(B.dark, fx - 0.06, fx + 0.06, -CS - CR - 0.02, CS + CR + 0.02, -0.04, 0.04);
      box(B.dark, fx - 0.06, fx + 0.06, -0.04, 0.04, -CS - CR - 0.05, CS + CR + 0.05);
    }
    for (j = -1; j <= 1; j += 2) box(B.dark, -0.22, 0.30, -CS - CR - 0.04, CS + CR + 0.04, j * (CS + CR) - 0.04, j * (CS + CR) + 0.04);
  }

  /* a levelling jack at station i, side s: an inclined leg and foot pad out from the trailer side when down (the pad
     out at |y| 1.80), folded up against the side when stowed (so the stowed width stays the trailer's 3.2 m) */
  function addJackLeg(B, i, s, down) {
    var x = JXP[i], hy = s * 1.47, px = x + (i ? -0.14 : 0.10), py = s * 1.80;
    if (down) {
      cyl(B.dark, [x, hy, 1.72], [px, py, 0.08], 0.055, 0.055, 8);
      box(B.dark, px - 0.20, px + 0.20, py - 0.20, py + 0.20, 0.0, 0.07);
      cyl(B.dark, [x, hy, 1.40], [x + (px - x) * 0.45, hy + (py - hy) * 0.45, 0.95], 0.035, 0.035, 6);   /* brace */
    } else {
      cyl(B.dark, [x, hy, 1.72], [x, hy + s * 0.04, 1.30], 0.055, 0.055, 8);
      box(B.dark, x - 0.16, x + 0.16, hy + s * 0.04 - 0.14, hy + s * 0.04 + 0.14, 1.23, 1.30);
    }
  }

  /* copy a bin into another turned about Y by ang and moved to (px, 0, pz) */
  function bake(from, to, px, pz, ang) {
    var c = Math.cos(ang), sn = Math.sin(ang), k, x, z;
    for (k = 0; k < from.P.length; k += 3) {
      x = from.P[k]; z = from.P[k + 2];
      to.P.push(px + x * c + z * sn, from.P[k + 1], pz - x * sn + z * c);
      x = from.N[k]; z = from.N[k + 2];
      to.N.push(x * c + z * sn, from.N[k + 1], -x * sn + z * c);
      if (to.U) { to.U.push(from.U[k / 3 * 2], from.U[k / 3 * 2 + 1]); }
    }
  }

  /* stretch a bin from the kit frame into metres (see the constants) */
  function xform(b) {
    var k, z, sz;
    for (k = 0; k < b.P.length; k += 3) {
      z = b.P[k + 2]; sz = z <= ZK ? 1 : ZS;
      b.P[k] *= SX; b.P[k + 1] *= SY; b.P[k + 2] = zmap(z);
      var nx = b.N[k] / SX, ny = b.N[k + 1] / SY, nz = b.N[k + 2] / sz, l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      b.N[k] = nx / l; b.N[k + 1] = ny / l; b.N[k + 2] = nz / l;
    }
  }
  function build(THREE, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T, true), i, s, wg, geo, TB, ax;
    var RB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), tyre: new Bin(T.tyre, false) };
    addTractor(HB, RB);
    addTrailer(HB, RB);
    for (i in HB) xform(HB[i]);
    flush(THREE, g, HB);
    flush(THREE, g, RB);
    /* five turning axle groups outside both poses: a tyre each side (one mesh per axle, lugs a phase apart) */
    ax = AXTP.concat(AXRP);
    for (i = 0; i < ax.length; i++) {
      var rr = i < 3 ? RTT : RTR, sc = rr / 0.75;
      TB = new Bin(T.tyre, false);
      tyre(TB, -TY, 0, true, sc, sc / 0.87);
      tyre(TB, TY, 0.5, true, sc, sc / 0.87);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(ax[i], 0, rr);
      wg.add(new THREE.Mesh(geo, T.tyre));
      g.add(wg);
    }
    var TV = bins(T, false), DP = bins(T, false), trv = new THREE.Group(), dep = new THREE.Group(), BK;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) { addJackLeg(TV, i, s, false); addJackLeg(DP, i, s, true); }
    BK = bins(T, false);
    addBlock(BK);
    /* travel: the block lies level on the trailer deck, its tail at the rear end, its nose over the trailer front */
    bake(BK.paint, TV.paint, PVX, PVZ, 0); bake(BK.dark, TV.dark, PVX, PVZ, 0);
    trv.name = "travelpose";
    flush(THREE, trv, TV);
    /* deploy: the block stood vertical (local +X turned up) on the trailer's rear table, on four posts, with two erector
       rams from the deck to its front face; jacks down.  (The photographs show the block standing nearly on the ground
       behind the trailer; that would put hidden geometry beyond the visible length, which render3d scales by, so it
       stands on the table instead.) */
    bake(BK.paint, DP.paint, DPX, DPZ, -Math.PI / 2); bake(BK.dark, DP.dark, DPX, DPZ, -Math.PI / 2);
    box(DP.dark, DPX - 1.20, DPX + 1.20, -1.15, 1.15, 1.98, 2.06);                           /* foot table */
    for (i = -1; i <= 1; i += 2) for (s = -1; s <= 1; s += 2)
      box(DP.paint, DPX + i * 1.0 - 0.10, DPX + i * 1.0 + 0.10, s * 0.95 - 0.10, s * 0.95 + 0.10, 1.90, 2.10);
    for (s = -1; s <= 1; s += 2) {
      cyl(DP.dark, [DPX + 2.05, s * 0.45, 1.95], [DPX + 1.10, s * 0.45, 4.10], 0.09, 0.09, 8);   /* erector rams */
      cyl(DP.paint, [DPX + 1.10, s * 0.45, 4.10], [DPX + 1.02, s * 0.45, 5.40], 0.055, 0.055, 8);
      box(DP.dark, DPX + 1.90, DPX + 2.20, s * 0.45 - 0.12, s * 0.45 + 0.12, 1.90, 2.04);
    }
    dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    g.add(trv); g.add(dep);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the rear lamps to the front tow eyes */
UNIT_MODELS["sam_p"] = { len: 15.3, build: function (THREE, M, C) { return HeroS400.build(THREE, C); } };
