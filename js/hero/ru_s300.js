/* ============ ru_s300.js - HERO model: the S-300P family launcher (5P85S / 5P85SE / 5P85SE2) on the MAZ-543M 8x8 ============
   Three rows (rules.js, deploy:true, turret:true, rounds 4): pact_e80_sam "S-300PS, 5P85S TEL" 1982, pact_e90_sam
   "S-300PM / PMU-1, 5P85SE TEL" 1993, pact_e00_sam "S-300PMU-2 Favorit" 2001 (the 5P85SE2). All self-propelled on the
   MAZ-543M; no row names the towed 5P85T, so none is drawn.  Redone 2026-10-24 to the full-quality standard (lofted cab,
   measured layout, three photo-compare passes).
   CORRECTED from the earlier header: it drew one truck for all three ("the same cab and housing").  The photographs split
   the rows: the 5P85S carries the tall launch-control housing behind the cab; the 5P85SE (MAKS-2007) and the 5P85SE2
   (MAKS, Moscow 2008/2009 parades) carry no housing, only a low box, a raised box and tubular hand rails.

   Recognition list, each with the photograph it rests on (Wikimedia Commons, cached in the scratchpad q_s300_ref):
     1. The MAZ-543M split cab: a full-width front body with the big vertical-bar radiator grille between round headlamp
        wings and a heavy bumper with tow eyes and the coiled tow cable; on its deck, set back, the PORT pod (driver) with a
        two-pane windscreen raked back, door and rear windows, and the STARBOARD pod with a closed louvred front
        ("Slovak S-300 PS TEL at SIAF-2021", "5P85SE2 of the SAM system S-300 PMU-2", "S-300PS TEL, Kyiv 2021, 10").
     2. Eight wheels in two pairs, 2.2 + 3.3 + 2.2 m apart: two axles under the cab, the long gap, two under the rear
        ("Side view of a S-300 launcher", "2008 Moscow Victory Day Parade - S-300 TEL").
     3. e80 only: the tall launch-control housing behind the pods, nearly full width, a sloped front face from the pod
        roofs up to its roof, louvred and door panels on its sides, a whip antenna, the amber beacon ahead of it
        ("Slovak S-300 PS TEL at SIAF-2021", "Slovak S-300PMU at SIAF 2017", the tarp-covered housing in "Kyiv 2021, 10").
     4. e90 / e00: no housing; a low box behind the pods, a raised box just ahead of the tubes and the tubular hand rails
        arching over them ("5P85SE TEL at MAKS-2007", "5P85SE2 of the SAM system S-300 PMU-2", "Side view of a S-300
        launcher").  e90 also: the amber beacon on a post at the port pod's inboard corner ("5P85SE TEL at MAKS-2007").
     5. Four canisters 2 x 2 lying level, about 1 m across and 7.1 m long, ring hoops about 0.5 m apart, domed tails
        overhanging the frame's rear by about 0.9 m, flat covers forward, the lower row slightly further aft ("Side view").
     6. Ribbed equipment boxes along both sides of the deck, fuel tanks slung between the second and third axles, flat
        rear mudguards ("Side view", "2008 Moscow Victory Day Parade - S-300 TEL").
     7. Set up: the block stood vertical over the rear, the lattice erector spine on its face toward the cab, two rams
        ("Slovak S-300 PS TEL at SIAF-2021", "5P85SE2 ...", "Slovak S-300PMU at SIAF 2017", "5P85SE TEL at MAKS-2007").
     8. Mirrors on long arms at both pods' outer front corners; the searchlight on the port pod's roof ("5P85SE2 ...").
     9. Plain green all over, by period (below).

   Station table (metres back from the bumper face, scaled off "Side view of a S-300 launcher" at 65 px/m from the
   1.5 m tyres, checked on "2008 Moscow Victory Day Parade - S-300 TEL"):
       0.00 bumper face        0.30/0.48 grille face (bottom/deck)   0.60-0.78 port windscreen (sill/top)
       2.70 pods' rear         2.75 / 4.95 front axles               2.72-4.92 e80 housing (roof 4.00, slope to 3.50)
       2.72-3.75 e90/e00 low box (2.80)   4.05-4.95 raised box (3.35)   4.97 canister covers
       5.75-11.10 side boxes   5.75-7.45 fuel tanks                  8.25 / 10.45 rear axles
      11.35 frame rear         12.07 / 12.22 domed tails (upper / lower row)
     Heights: bumper 1.00-1.30, front body deck 2.12, pod roofs 2.88-2.92, canisters lying 1.76-3.89 (axes 2.30 / 3.33).
   Published: truck-encyclopedia.com 5P85 page: 5P85S/5P85D on the MAZ-7910 (MAZ-543M family) 11,450 x 3,050 x 3,550 mm,
     wheelbase 7.7 m, track 2,375 mm, 1500x600 tyres; the 5P85S/D has the left (port) cab only.  The model: 11.35 m
     bumper to the rear beam (11.41 with the tow eyes), 12.28 m to the canister tails; 3.04 m body, 3.48 m over the mirrors;
     wheelbase 7.7 m, track 2.38 m, 1.5 m tyres.  CORRECTED: the 3.55 m height is not what the side photographs show (the
     upper canisters' top at 3.8-3.95 m on both); the canisters are drawn at 3.89 m and overhang the rear by 0.9 m.
   Deliberate departure: set up, the photographs stand the block BEHIND the frame with its tails near the ground.  render3d
     scales by the box of both poses, so a hidden block there would shrink the whole truck by about 8%, and the forward row
     would cut through the rear tyres.  The block stands instead on a foot table over the frame's rear, its rear face at the
     travel length and its tails at 1.6-1.7 m, so it stands about 1.6 m taller than in the photographs.
   Paint, by period, plain (no parade camouflage, no show schemes, no Ukrainian light-grey canisters, no markings):
     e80 Soviet green #4a5538, e90 Russian green #4b5639, e00 Russian green #4f573f, the canisters in the vehicle colour.
     Sampled: "5P85SE2 ..." lit front 76,78,70; "Anti-AircraftExercise2018-05" (S-300PM1, mil.ru) canisters 82,89,85 under
     overcast; taken to about 0.8-0.9 of their level and kept on the green side of those greys.
   NOT confirmed and not drawn: the jack count and positions (four drawn, as before), any 5P85SE / 5P85SE2 difference
     beyond the beacon, the housing's inside, cable runs, the exact hand-rail and erector geometry, roof nets, spare wheels.

   Poses (render3d finds them by name, shows one from e.deployed): "travelpose" = canisters lying level on the spine with
   the front saddle and rear brackets, jacks up; "deploypose" = the block stood vertical on its foot table, rams, jacks
   down.  The truck, cab and the eight "roadwheel" groups stay outside both.  Nothing is named "turret" (the block never
   traverses) and nothing "podelev" (the old file had neither).
   Materials (6): paint (canvas texture), dark, glass, tyre, lamp, C.team (small up-facing strips on the pod and box roofs).
   15 draw calls, about 13,700 triangles counting both poses.  +X nose, +Y left (port), +Z up, metres, tyres on z = 0.
   ASCII only. */

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


  /* --------------------------------------------------------------- layout */
  /* every station is given in metres BACK from the bumper face (the header's table); X() turns it into model x */
  var XF = 6.10;
  function X(d) { return XF - d; }
  var AXD = [2.75, 4.95, 8.25, 10.45], TY = 1.19, RT = 0.75;   /* MAZ-543M axles 2.2 + 3.3 + 2.2 m, track 2.375 m */
  var DREAR = 11.35;                                            /* frame rear */
  var CR = 0.50, CRIB = 0.56, CSY = 0.53, CSZ = 0.515;         /* tube radius, rib radius, column / row half offsets */
  var CL = 7.10, LOW = 0.15;                                    /* tube length tail tip to front cover; lower row aft */
  var TRZ = 2.815, TAILD = 12.07;                               /* travel: block axis height, upper-row tail station */
  var DPX = X(11.10), DPZ = 1.72;                               /* set up: block centre plane x, upper-row tail height */

  var PAINTS = {
    soviet: { base: "#4a5538", blots: ["#3e482f", "#57624a", "#434d34"], seed: 30082 },
    ru90:   { base: "#4b5639", blots: ["#3f4930", "#58634a", "#454f35"], seed: 30093 },
    ru00:   { base: "#4f573f", blots: ["#434a35", "#5b634b", "#495139"], seed: 30001 }
  };

  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2a2d29, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xc98a2a, roughness: 0.4, metalness: 0.1, emissive: 0x2a1600 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, all) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (all) { b.glass = new Bin(T.glass, false); b.lamp = new Bin(T.lamp, false); b.team = new Bin(T.team, false); }
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
      for (j = 0; j < 8; j++) {                                   /* the wheel nuts */
        a = j / 8 * TAU;
        cylY(bin, 0.30 * Math.cos(a), k * 0.335, k * 0.355, 0.30 * Math.sin(a), 0.035, 5);
      }
    }
  }

  /* a curved fender over a wheel at station d: a strip following the tyre, angles a0..a1 (0 = forward), across y0..y1 */
  function fender(bin, d, y0, y1, r0, r1, a0, a1, n) {
    var i, t0, t1, c0, s0, c1, s1, x = X(d);
    for (i = 0; i < n; i++) {
      t0 = a0 + (a1 - a0) * i / n; t1 = a0 + (a1 - a0) * (i + 1) / n;
      c0 = Math.cos(t0); s0 = Math.sin(t0); c1 = Math.cos(t1); s1 = Math.sin(t1);
      hexa(bin, [[x + c0 * r0, y0, RT + s0 * r0], [x + c1 * r0, y0, RT + s1 * r0], [x + c1 * r0, y1, RT + s1 * r0], [x + c0 * r0, y1, RT + s0 * r0],
                 [x + c0 * r1, y0, RT + s0 * r1], [x + c1 * r1, y0, RT + s1 * r1], [x + c1 * r1, y1, RT + s1 * r1], [x + c0 * r1, y1, RT + s0 * r1]]);
    }
  }

  /* ------------------------------------------------------------------ cab */
  /* station table of the MAZ-543M front (photo-scaled, see the header):
     the full-width front body, its face raked from d 0.30 at the bumper top to 0.42 at the deck, the corners rounded
     over the headlamp wings; the two pods on its deck: the PORT pod (driver) with the two-pane windscreen raked back,
     the STARBOARD pod with a closed front.  Rings are [y, z] outlines at a station. */
  function ringBody(d, hw, zb, zt, ch) {
    return [[X(d), -hw, zb], [X(d), hw, zb], [X(d), hw, zt - ch], [X(d), hw - ch * 0.8, zt], [X(d), -hw + ch * 0.8, zt], [X(d), -hw, zt - ch]];
  }
  var FRONT = [  /* d,   half width, bottom, top, corner */
    [0.30, 1.30, 1.22, 1.96, 0.26],
    [0.36, 1.44, 1.18, 2.06, 0.24],
    [0.48, 1.51, 1.16, 2.12, 0.18],
    [1.95, 1.52, 1.16, 2.12, 0.14]];
  /* a pod: y from ya (inboard) to yb (outboard), the face raked from df (sill) to dt (roof), roof zt, rear dr */
  function pod(bin, ya, yb, df, dt, dr, zs, zt) {
    var yi = Math.min(ya, yb), yo = Math.max(ya, yb), c = 0.12;
    function ring(dl, du) {
      return [[X(dl), yi, zs], [X(dl), yo, zs], [X(du), yo - 0.03, zt - c], [X(du), yo - 0.03 - c, zt],
              [X(du), yi + 0.03 + c, zt], [X(du), yi + 0.03, zt - c]];
    }
    loft(bin, [ring(df, dt), ring(dr, dr)], false);
  }

  function addCab(B, v) {
    var i, s, k, y, x, rings = [];
    for (i = 0; i < FRONT.length; i++) rings.push(ringBody(FRONT[i][0], FRONT[i][1], FRONT[i][2], FRONT[i][3], FRONT[i][4]));
    loft(B.paint, rings, false);
    /* the body over the front axles: side walls with the wheel arches cut by the fenders, the floor between */
    box(B.paint, X(5.70), X(1.95), -1.52, 1.52, 1.66, 2.12);
    box(B.paint, X(5.70), X(1.95), -0.86, 0.86, 1.05, 1.66);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        fender(B.paint, AXD[i], s * 0.86, s * 1.53, 0.84, 0.90, 0.18, Math.PI - 0.18, 9);
        box(B.dark, X(AXD[i]) - 0.02, X(AXD[i]) + 0.02, s * 1.52, s * 1.545, 1.66, 2.10);       /* panel seam over the axle */
      }
      box(B.paint, X(4.02), X(3.68), s * 0.86, s * 1.52, 1.16, 1.66);                           /* web between the arches */
      /* steps and the grab handle under the pod doors (port: the crew door; starboard: the equipment door) */
      for (k = 0; k < 2; k++) box(B.dark, X(2.00), X(1.50), s * 1.40, s * 1.56, 1.25 + k * 0.38, 1.29 + k * 0.38);
      bar(B.dark, [X(0.95), s * 1.55, 2.20], [X(0.95), s * 1.55, 2.80], 0.03);
    }
    /* front face: the radiator grille between the headlamp wings (vertical bars, two cross bars, a guard frame) */
    x = X(0.36);
    box(B.dark, x - 0.04, x + 0.035, -0.86, 0.86, 1.32, 2.00);
    for (k = 0; k < 13; k++) { y = -0.80 + k * (1.60 / 12); box(B.paint, x + 0.03, x + 0.06, y - 0.025, y + 0.025, 1.34, 1.98); }
    for (k = 0; k < 2; k++) box(B.paint, x + 0.05, x + 0.08, -0.86, 0.86, 1.55 + k * 0.25, 1.59 + k * 0.25);
    box(B.dark, x + 0.06, x + 0.10, -0.90, 0.90, 1.96, 2.02);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, x + 0.06, x + 0.10, s * 0.86 - 0.03, s * 0.86 + 0.03, 1.30, 2.02);
      /* round headlamp in its wing, the side lamp and the turn lamp under it */
      cylX(B.dark, X(0.40), X(0.31), s * 1.18, 1.72, 0.125, 14);
      cylX(B.glass, X(0.31), X(0.29), s * 1.18, 1.72, 0.095, 14);
      cylX(B.lamp, X(0.33), X(0.30), s * 1.10, 1.42, 0.05, 8);
      /* the vertical vent slots in the front body's outer corners ("5P85SE2 of the SAM system S-300 PMU-2") */
      for (k = 0; k < 3; k++) box(B.dark, X(0.95) + k * 0.16, X(0.90) + k * 0.16, s * 1.52, s * 1.535, 1.30, 1.88);
    }
    /* the heavy bumper with the tow eyes, the coiled tow cable across it, small lamps at its ends */
    box(B.dark, X(0.30), X(0.0), -1.42, 1.42, 1.00, 1.30);
    box(B.paint, X(0.02), X(0.0) + 0.01, -1.40, 1.40, 1.04, 1.26);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(0.04), X(-0.06), s * 0.55 - 0.08, s * 0.55 + 0.08, 1.06, 1.20);
      bar(B.dark, [X(-0.02), s * 0.55, 1.22], [X(-0.04), s * 0.15, 1.38], 0.04);
      bar(B.dark, [X(-0.04), s * 0.15, 1.38], [X(-0.03), -s * 0.05, 1.36], 0.04);
      box(B.lamp, X(0.0), X(-0.02), s * 1.20, s * 1.32, 1.12, 1.20);
    }
    /* the engine deck between the pods, its intake box and a hatch seam */
    box(B.paint, X(2.70), X(0.48), -0.36, 0.36, 2.12, 2.30);
    box(B.dark, X(1.40), X(0.70), -0.30, 0.30, 2.30, 2.33);
    box(B.paint, X(2.65), X(1.85), -0.32, 0.32, 2.30, 2.62);
    for (k = 0; k < 4; k++) box(B.dark, X(2.55) + k * 0.18, X(2.48) + k * 0.18, -0.33, 0.33, 2.36, 2.56);
    /* PORT pod: the crew cab, the windscreen raked back (sill 2.18 at d 0.48, top 2.80 at d 0.62) */
    pod(B.paint, 0.34, 1.52, 0.60, 0.78, 2.70, 2.12, 2.92);
    var P0 = [X(0.61), 0, 2.20], U = unit([-0.14, 0, 0.62]), W = [0, 1, 0], N = unit([0.62, 0, 0.14]);
    planeBox(B.dark, P0, U, W, N, 0.0, 0.64, 0.42, 1.44, -0.06, 0.015);
    planeBox(B.glass, P0, U, W, N, 0.05, 0.60, 0.47, 0.92, -0.02, 0.022);
    planeBox(B.glass, P0, U, W, N, 0.05, 0.60, 0.97, 1.39, -0.02, 0.022);
    for (k = 0; k < 2; k++) bar(B.dark, [X(0.61) + 0.03, 0.62 + k * 0.48, 2.24], [X(0.67) + 0.03, 0.70 + k * 0.48, 2.58], 0.025);
    box(B.dark, X(0.74), X(0.58), 0.36, 1.50, 2.86, 2.93);                                  /* visor */
    /* its side: the door (window, seam, handle) and the rear window */
    y = 1.52;
    box(B.glass, X(1.62), X(1.02), y - 0.02, y + 0.022, 2.30, 2.76);
    box(B.dark, X(1.70), X(1.66), y - 0.02, y + 0.015, 1.70, 2.86);
    box(B.dark, X(0.94), X(0.90), y - 0.02, y + 0.015, 1.70, 2.86);
    box(B.dark, X(1.58), X(1.42), y - 0.02, y + 0.04, 2.18, 2.22);
    box(B.glass, X(2.50), X(1.92), y - 0.02, y + 0.022, 2.34, 2.74);
    box(B.glass, X(2.40), X(1.90), 0.33, 0.35, 2.36, 2.74);                                   /* inboard window */
    /* STARBOARD pod: closed front with a louvred panel, side windows, louvres low on its outer face */
    pod(B.paint, -0.34, -1.52, 0.62, 0.64, 2.70, 2.12, 2.88);
    for (k = 0; k < 5; k++) box(B.dark, X(0.64), X(0.61), -1.30, -0.58, 2.24 + k * 0.11, 2.29 + k * 0.11);
    y = -1.52;
    box(B.glass, X(1.62), X(1.02), y - 0.022, y + 0.02, 2.32, 2.72);
    box(B.glass, X(2.50), X(1.92), y - 0.022, y + 0.02, 2.34, 2.72);
    box(B.dark, X(1.70), X(1.66), y - 0.015, y + 0.02, 1.70, 2.82);
    box(B.dark, X(0.94), X(0.90), y - 0.015, y + 0.02, 1.70, 2.82);
    /* mirrors on their arms at both pods' outer front corners */
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [X(0.76), s * 1.50, 2.70], [X(0.54), s * 1.70, 2.76], 0.035);
      bar(B.dark, [X(0.76), s * 1.50, 2.30], [X(0.54), s * 1.70, 2.34], 0.035);
      box(B.dark, X(0.60), X(0.50), s * 1.66, s * 1.74, 2.28, 2.80);
    }
    /* roof fittings: the searchlight on its post (port pod), the amber beacon (starboard pod), vents, team strips */
    cylZ(B.dark, X(0.99), 0.55, 2.92, 3.10, 0.03, 6);
    cyl(B.dark, [X(1.09), 0.55, 3.16], [X(0.92), 0.55, 3.16], 0.12, 0.12, 12);
    cylX(B.glass, X(0.92), X(0.91), 0.55, 3.16, 0.10, 12);
    if (v === "e90") {                    /* the amber beacon at the port pod's inboard corner ("5P85SE TEL at MAKS-2007") */
      cylZ(B.dark, X(0.94), 0.42, 2.92, 3.20, 0.03, 6);
      cylZ(B.lamp, X(0.94), 0.42, 3.20, 3.36, 0.07, 10);
    }
    box(B.dark, X(2.30), X(1.80), 0.60, 1.10, 2.92, 2.96);
    box(B.team, X(2.10), X(1.10), 1.00, 1.30, 2.92, 2.94);
    box(B.team, X(2.10), X(1.10), -1.30, -1.00, 2.88, 2.90);
    /* the exhaust stub low on the port side behind the cab */
    cylY(B.dark, X(5.55), 1.52, 1.62, 1.55, 0.06, 8);
  }

  /* behind the pods, by row.  5P85S (e80): the tall launch-control housing, full height with the sloped front face
     ("Slovak S-300 PS TEL at SIAF-2021", "S-300PS TEL, Kyiv 2021, 10", "Slovak S-300PMU at SIAF 2017").
     5P85SE / 5P85SE2 (e90, e00): no housing; a low equipment box, a raised box just ahead of the tubes and the tubular
     hand rails arching over them ("5P85SE TEL at MAKS-2007", "5P85SE2 of the SAM system S-300 PMU-2", "Side view of a
     S-300 launcher", "2008 Moscow Victory Day Parade - S-300 TEL"). */
  function addAft(B, v) {
    var s, k, y, x;
    if (v === "e80") {
      profY(B.paint, [[X(2.72), 2.12], [X(4.92), 2.12], [X(4.92), 4.00], [X(3.50), 4.00], [X(2.72), 3.02]], -1.32, 1.32);
      for (s = -1; s <= 1; s += 2) {
        y = s * 1.32;
        box(B.dark, X(4.10), X(3.30), y - (s > 0 ? 0 : 0.02), y + (s > 0 ? 0.02 : 0), 2.30, 3.30);       /* door */
        for (k = 0; k < 6; k++) box(B.dark, X(4.70), X(4.25), y - (s > 0 ? 0 : 0.035), y + (s > 0 ? 0.035 : 0), 2.50 + k * 0.12, 2.54 + k * 0.12);
        box(B.dark, X(3.20), X(2.85), y - (s > 0 ? 0 : 0.03), y + (s > 0 ? 0.03 : 0), 2.30, 2.70);       /* small hatch */
        box(B.dark, X(4.00), X(3.85), y - (s > 0 ? 0 : 0.05), y + (s > 0 ? 0.05 : 0), 2.70, 2.74);       /* handle */
      }
      /* on the sloped face: the box housing and the hatch; on the roof the whip-antenna base, the vent, a team strip */
      var P0 = [X(2.72), 0, 3.02], U = unit([-0.78, 0, 0.98]), W = [0, 1, 0], N = unit([0.98, 0, 0.78]);
      planeBox(B.paint, P0, U, W, N, 0.20, 0.95, 0.20, 0.95, 0.0, 0.28);
      planeBox(B.dark, P0, U, W, N, 0.25, 0.90, -0.95, -0.15, 0.0, 0.03);
      cylZ(B.dark, X(4.30), 0.85, 4.00, 4.18, 0.08, 8);
      cylZ(B.dark, X(4.30), 0.85, 4.18, 5.60, 0.015, 4);
      box(B.dark, X(4.75), X(4.15), -0.90, -0.30, 4.00, 4.06);
      box(B.team, X(4.70), X(3.70), -0.12, 0.12, 4.00, 4.02);
      /* the amber beacon in front of the housing ("Slovak S-300 PS TEL at SIAF-2021") */
      cylZ(B.dark, X(2.55), -0.10, 2.62, 2.72, 0.08, 10);
      cylZ(B.lamp, X(2.55), -0.10, 2.72, 2.88, 0.07, 10);
    } else {
      /* the low box behind the pods, its top sloped at the front */
      profY(B.paint, [[X(2.72), 2.12], [X(3.75), 2.12], [X(3.75), 2.80], [X(2.95), 2.80], [X(2.72), 2.62]], -1.30, 1.30);
      for (s = -1; s <= 1; s += 2) {
        y = s * 1.30;
        box(B.dark, X(3.60), X(2.95), y - (s > 0 ? 0 : 0.02), y + (s > 0 ? 0.02 : 0), 2.22, 2.70);
      }
      /* the raised box ahead of the tubes, on its frame */
      box(B.paint, X(4.95), X(4.05), -0.95, 0.95, 2.62, 3.35);
      box(B.dark, X(4.95), X(4.05), -0.96, 0.96, 3.10, 3.13);
      for (s = -1; s <= 1; s += 2) box(B.dark, X(4.90), X(4.10), s * 0.80, s * 0.95, 2.12, 2.62);
      box(B.paint, X(4.95), X(3.75), -1.30, 1.30, 2.12, 2.30);
      /* the tubular hand rails: from the pods' rear up over the boxes and back to the tubes, posts and cross rails */
      for (s = -1; s <= 1; s += 2) {
        y = s * 1.22;
        bar(B.dark, [X(2.60), y, 2.88], [X(2.95), y, 3.18], 0.05);
        bar(B.dark, [X(2.95), y, 3.18], [X(3.45), s * 1.18, 3.38], 0.05);
        bar(B.dark, [X(3.45), s * 1.18, 3.38], [X(4.95), s * 1.12, 3.45], 0.05);
        bar(B.dark, [X(3.70), s * 1.20, 2.80], [X(3.70), s * 1.18, 3.38], 0.045);
        bar(B.dark, [X(4.95), s * 1.12, 2.30], [X(4.95), s * 1.12, 3.45], 0.045);
      }
      bar(B.dark, [X(3.45), -1.18, 3.38], [X(3.45), 1.18, 3.38], 0.045);
      box(B.team, X(4.80), X(4.20), -0.12, 0.12, 3.35, 3.37);
    }
  }

  /* ------------------------------------------------------- chassis, aft deck */
  function addChassis(B) {
    var i, s, k, x, y;
    for (s = -1; s <= 1; s += 2) box(B.dark, X(DREAR), X(1.90), s * 0.42, s * 0.62, 0.95, 1.45);     /* frame rails */
    for (k = 0; k < 7; k++) { x = X(5.9 + k * 0.9); box(B.dark, x - 0.06, x + 0.06, -0.62, 0.62, 1.00, 1.40); }
    for (i = 0; i < 4; i++) {
      x = X(AXD[i]);
      cylY(B.dark, x, -0.95, 0.95, RT, 0.11, 8);
      cylY(B.dark, x, -0.30, 0.30, RT, 0.24, 10);
    }
    box(B.dark, X(DREAR) - 0.02, X(DREAR - 0.16), -1.45, 1.45, 0.98, 1.30);                      /* rear beam */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(DREAR) - 0.08, X(DREAR), s * 1.05 - 0.07, s * 1.05 + 0.07, 1.02, 1.16);      /* tow hooks */
      box(B.lamp, X(DREAR) - 0.03, X(DREAR), s * 1.28 - 0.08, s * 1.28 + 0.08, 1.16, 1.26);      /* rear lamps */
      /* the fuel tanks and the battery box slung between the second and third axles */
      profY(B.paint, [[X(7.45), 0.86], [X(5.90), 0.86], [X(5.75), 1.02], [X(5.75), 1.40], [X(7.45), 1.40]],
            s > 0 ? 0.92 : -1.46, s > 0 ? 1.46 : -0.92);
      for (k = 0; k < 2; k++) box(B.dark, X(6.25 + k * 0.80) - 0.04, X(6.25 + k * 0.80) + 0.04, s > 0 ? 0.90 : -1.48, s > 0 ? 1.48 : -0.90, 0.84, 1.42);
      /* the long equipment boxes on both sides of the deck, ribbed lids, seams and handles */
      box(B.paint, X(11.10), X(5.75), s > 0 ? 1.02 : -1.50, s > 0 ? 1.50 : -1.02, 1.42, 1.86);
      y = s * 1.50;
      for (k = 0; k < 7; k++) { x = X(5.85 + k * 0.85); box(B.dark, x - 0.015, x + 0.015, y - (s > 0 ? 0 : 0.03), y + (s > 0 ? 0.03 : 0), 1.44, 1.84); }
      for (k = 0; k < 6; k++) { x = X(6.25 + k * 0.85); box(B.dark, x - 0.12, x + 0.12, y - (s > 0 ? 0 : 0.045), y + (s > 0 ? 0.045 : 0), 1.70, 1.74); }
      box(B.dark, X(11.10), X(5.75), s > 0 ? 1.02 : -1.51, s > 0 ? 1.51 : -1.02, 1.86, 1.88);
      /* rear mudguards over the third and fourth axles: flat tops and outer valances, flaps behind */
      box(B.paint, X(11.25), X(7.45), s > 0 ? 0.90 : -1.53, s > 0 ? 1.53 : -0.90, 1.56, 1.62);
      box(B.paint, X(11.25), X(7.45), s > 0 ? 1.49 : -1.53, s > 0 ? 1.53 : -1.49, 1.42, 1.62);
      box(B.dark, X(11.30), X(11.24), s * 0.95, s * 1.48, 0.70, 1.56);
      /* levelling-jack housings (legs are in the poses): between the second and third axles and at the rear */
      box(B.dark, X(7.80), X(7.50), s * 1.30, s * 1.56, 1.00, 1.88);
      box(B.dark, X(11.30), X(11.00), s * 1.30, s * 1.56, 1.00, 1.70);
    }
    /* the deck between the side boxes */
    box(B.paint, X(DREAR), X(5.75), -1.02, 1.02, 1.42, 1.50);
  }

  /* -------------------------------------------------------------- canisters */
  /* the block in its own frame: tails at x = 0 (upper row) and -LOW (lower row), front covers toward +x; columns along y,
     rows along z (+z the upper row).  The erector spine is on the -z face, the side that faces the vehicle when set up. */
  function addBlock(B) {
    var r, c, k, y, z, o, rb, x;
    for (r = -1; r <= 1; r += 2) for (c = -1; c <= 1; c += 2) {
      y = c * CSY; z = r * CSZ; o = r > 0 ? 0 : -LOW;
      revolve(B.paint, [[o, 0.16], [o + 0.06, 0.30], [o + 0.16, 0.41], [o + 0.30, 0.48], [o + 0.40, CR]], y, z, 16);   /* the domed tail */
      cyl(B.paint, [o + 0.40, y, z], [o + CL - 0.16, y, z], CR, CR, 16, true, true);
      for (k = 0; k < 12; k++) {
        rb = o + 0.62 + k * 0.53;
        cyl(B.paint, [rb, y, z], [rb + 0.07, y, z], CRIB, CRIB, 16, true, true);                       /* ring ribs */
      }
      cyl(B.dark, [o + 0.40, y, z], [o + 0.52, y, z], CRIB + 0.01, CRIB + 0.01, 16, true, true);        /* tail band */
      cyl(B.paint, [o + CL - 0.42, y, z], [o + CL - 0.16, y, z], CRIB + 0.01, CRIB + 0.01, 16, true, true);   /* head band */
      cyl(B.paint, [o + CL - 0.16, y, z], [o + CL, y, z], CR, CR - 0.06, 16, true);                      /* front cover */
      cylX(B.dark, o + CL, o + CL + 0.02, y, z, CR - 0.16, 10);
      box(B.dark, o + 2.0, o + 5.2, y - 0.03, y + 0.03, z + r * CRIB - 0.01, z + r * CRIB + 0.03);      /* cable duct */
    }
    /* frames that tie the four tubes, the spine and its lattice on the -z face, the wide cross frame */
    for (k = 0; k < 3; k++) {
      x = [0.55, 3.70, 6.80][k];
      for (c = -1; c <= 1; c += 2) {
        box(B.dark, x - 0.05, x + 0.05, -CSY - CRIB, CSY + CRIB, c * (CSZ + CRIB) - 0.03, c * (CSZ + CRIB) + 0.04);
        box(B.dark, x - 0.05, x + 0.05, c * (CSY + CRIB) - 0.03, c * (CSY + CRIB) + 0.03, -CSZ - CRIB, CSZ + CRIB);
      }
    }
    z = -CSZ - CRIB - 0.04;
    for (c = -1; c <= 1; c += 2) box(B.paint, -LOW, 6.30, c * 0.30 - 0.06, c * 0.30 + 0.06, z - 0.12, z);
    for (k = 0; k < 9; k++) {
      x = -0.05 + k * 0.70;
      bar(B.dark, [x, -0.30, z - 0.06], [x + 0.70, 0.30, z - 0.06], 0.05);
      bar(B.dark, [x + 0.35, -0.30, z - 0.06], [x + 0.35, 0.30, z - 0.06], 0.04);
    }
    box(B.dark, 3.30, 3.42, -1.20, 1.20, z - 0.14, z);
    for (c = -1; c <= 1; c += 2) bar(B.dark, [2.55, c * (CSY + CRIB), z - 0.06], [3.36, c * 1.18, z - 0.06], 0.05);
  }

  /* copy a bin into another turned about Y by ang and moved to (px, 0, pz) */
  function bake(from, to, px, pz, ang) {
    var c = Math.cos(ang), sn = Math.sin(ang), k, x, z;
    for (k = 0; k < from.P.length; k += 3) {
      x = from.P[k]; z = from.P[k + 2];
      to.P.push(px + x * c + z * sn, from.P[k + 1], pz - x * sn + z * c);
      x = from.N[k]; z = from.N[k + 2];
      to.N.push(x * c + z * sn, from.N[k + 1], -x * sn + z * c);
      if (to.U) to.U.push(from.U[k / 3 * 2], from.U[k / 3 * 2 + 1]);
    }
  }

  /* levelling jacks (four, the count NOT confirmed): stowed, the leg up and the pad clear of the ground; down, on the ground */
  function addJacks(B, down) {
    var i, s, d, y, pz;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      d = i ? 11.15 : 7.65; y = s * 1.43; pz = down ? 0.0 : 0.80;
      cylZ(B.dark, X(d), y, pz + 0.07, 1.10, 0.075, 8);
      cylZ(B.paint, X(d), y, pz, pz + 0.07, 0.24, 12);
    }
  }

  function build(THREE, C, variant) {
    var P = variant === "e00" ? PAINTS.ru00 : variant === "e90" ? PAINTS.ru90 : PAINTS.soviet;
    var T = materials(THREE, C, P), g = new THREE.Group(), HB = bins(T, true), i, s, wg, wm, geo, TB, BK, TV, DP, trv, dep, x;
    addCab(HB, variant);
    addAft(HB, variant);
    addChassis(HB);
    flush(THREE, g, HB);
    /* eight turning wheels outside both poses (one geometry, the port side's lugs a phase apart) */
    TB = new Bin(T.tyre, false);
    tyre(TB);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(X(AXD[i]), s * TY, RT);
      wm = new THREE.Mesh(geo, T.tyre);
      if (s < 0) wm.rotation.y = Math.PI / 20;
      wg.add(wm);
      g.add(wg);
    }
    BK = bins(T, false);
    addBlock(BK);
    /* travel: the block lying level on its spine, the upper-row tails at station 12.07, the lower row's 0.15 m further aft;
       the front saddle and the rear pivot brackets under it */
    TV = bins(T, false);
    bake(BK.paint, TV.paint, X(TAILD), TRZ, 0); bake(BK.dark, TV.dark, X(TAILD), TRZ, 0);
    for (s = -1; s <= 1; s += 2) {
      box(TV.dark, X(5.45), X(5.15), s * 0.20, s * 0.42, 1.50, TRZ - CSZ - CRIB - 0.16);
      box(TV.dark, X(11.30), X(10.90), s * 0.20, s * 0.42, 1.50, TRZ - CSZ - CRIB - 0.16);
      cylY(TV.dark, X(11.10), s * 0.18, s * 0.45, 1.55, 0.10, 10);
    }
    box(TV.dark, X(5.45), X(5.15), -0.42, 0.42, 1.50, 1.58);
    addJacks(TV, false);
    trv = new THREE.Group(); trv.name = "travelpose";
    flush(THREE, trv, TV);
    /* set up: the block stood vertical over the rear (local +x up, the upper row aft), its tails on the foot table over
       the frame's rear, the spine and lattice facing the cab, two erector rams from the deck, jacks down */
    DP = bins(T, false);
    bake(BK.paint, DP.paint, DPX, DPZ, -Math.PI / 2); bake(BK.dark, DP.dark, DPX, DPZ, -Math.PI / 2);
    x = DPX + CSZ + CRIB + 0.16;                                    /* the spine face, x */
    box(DP.dark, DPX - CSZ - CRIB, x, -1.10, 1.10, 1.48, DPZ - LOW - 0.02);
    for (s = -1; s <= 1; s += 2) {
      box(DP.paint, DPX - CSZ - CRIB, DPX - CSZ - CRIB + 0.20, s * 0.95, s * 1.10, 0.0, 1.50);     /* rear legs of the table */
      box(DP.paint, DPX - CSZ - CRIB, DPX - CSZ - CRIB + 0.45, s * 0.85, s * 1.20, 0.0, 0.08);
      cyl(DP.dark, [X(8.60), s * 0.45, 1.52], [x + 0.10, s * 0.45, 3.40], 0.11, 0.11, 10);
      cyl(DP.dark, [x + 0.10, s * 0.45, 3.40], [x + 0.02, s * 0.45, 4.60], 0.065, 0.065, 8);
      box(DP.dark, X(8.75), X(8.45), s * 0.32, s * 0.58, 1.48, 1.62);
      bar(DP.dark, [X(9.40), s * 1.00, 1.50], [x, s * 0.80, 2.40], 0.07);
    }
    addJacks(DP, true);
    dep = new THREE.Group(); dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    g.add(trv); g.add(dep);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the front tow eyes to the lower row's domed tails */
UNIT_MODELS["pact_e80_sam"] = { len: 12.3, build: function (THREE, M, C) { return HeroS300.build(THREE, C, "e80"); } };
UNIT_MODELS["pact_e90_sam"] = { len: 12.3, build: function (THREE, M, C) { return HeroS300.build(THREE, C, "e90"); } };
UNIT_MODELS["pact_e00_sam"] = { len: 12.3, build: function (THREE, M, C) { return HeroS300.build(THREE, C, "e00"); } };
