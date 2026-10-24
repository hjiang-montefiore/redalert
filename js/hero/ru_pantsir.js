/* ============ ru_pantsir.js - HERO model: the 96K6 Pantsir-S1 on the KamAZ-6560 8x8 ============
   One row (js/eras.js): pact_e00_spaag "96K6 Pantsir-S1" (service 2012, turret:true; armour_specs: len 10,
   width 2.9, height 4, camo green).  ru.wikipedia ("Pantsir-S1"): the serial 96K6 is built on the KamAZ-6560;
   12 ready 57E6 missiles, two twin 30 mm 2A38M, the 1RS1 search radar and the 1RS2 tracking radar; the 57E6
   is 3.2 m long.  ru.wikipedia ("KAMAZ-6560"): 7,500 mm wheelbase, 2,550 mm wide.

   Recognition list, each with the photograph it rests on (Wikimedia Commons, cached in the scratchpad
   q_pantsir_ref; "Bronnitsy - 01/03 - Pantsir-S1 SAM", "Pantsir-S1 missile system on Oboronexpo in 2014 (front
   view)" and "(rear view)" by Vitaly Kuzmin, "96K6 Pantsir-S1 wheeled at Engineering Technologies 2012" and its
   "Turret" close-up):
     1. The flat-fronted KamAZ cab-over cab: one big leaning windscreen, the grille of horizontal slats between
        two round headlamps, the heavy plate bumper with its lamps, the green fender arch over the front wheel,
        mirrors on arms, an amber beacon at the right front roof corner ("Bronnitsy - 01", Oboronexpo front).
     2. Four axles: the front pair, a long gap, the rear pair (all side photographs; "Bronnitsy - 03").
     3. The tall operator cabin behind the cab, as high as the cab, with the SPARE WHEEL standing in a recess on its
        RIGHT front corner (Oboronexpo front, ET-2012, "Bronnitsy - 03"; the old model had it on the left), a door
        with a step ladder on each side, a louvred panel on the left behind the cab ("Bronnitsy - 01").
     4. The low rear platform whose box has MESH-PANEL walls in a frame of posts, a hand rail at each end, and a
        louvred box at the very rear ("Bronnitsy - 03", "-01", Oboronexpo front).
     5. The rear face: two ladders, the bumper beam with lamp clusters, stabiliser jacks at the rear corners and
        amidships (Oboronexpo rear, the KamAZ-6560 rear three-quarter).
     6. The combat module on a drum over the platform: a central body with the round, flat-faced 1RS2 tracking
        radar on its FRONT (rear view, ET-2012 close-up).
     7. Two banks of SIX tubes, three high and two across, one each side, held in clamp frames, a side shield low on
        each bank's outer face (rear view, close-up, "Bronnitsy - 03").
     8. The two twin 30 mm 2A38M guns, one on the INNER side of each bank, flanking the tracking radar, two barrels
        one above the other (rear view, close-up).
     9. The 1RS1 search radar: a flat rectangular antenna standing on the module's BACK, leaning back, with its
        equipment box behind (Oboronexpo front, ET-2012, close-up).
    10. A domed head on a column on the module roof behind the guns ("Bronnitsy - 03"; which sensor it is was not
        found), two whip antennas.
    11. Fuel tanks on both sides between the axle pairs (Bronnitsy 01 and 03).
    12. Plain Russian green; the Victory-parade 2010 three-tone scheme and every marking are NOT drawn.

   Station table, off "Bronnitsy - 03" (side on): model x = (px - 483.5) / 88.67, the published 7.50 m wheelbase
   over 665 px; z = (501 - py) / 88.67.
       x  4.98 bumper face        4.90 cab front face      4.73 roof front edge    4.10 axle 1
          3.45 cab back           3.40 operator cabin front (spare wheel 2.97)      2.02 axle 2
          1.53..2.35 cabin door   0.72 cabin back / mesh box front                  -1.75 module ring centre
         -1.88 axle 3            -3.40 axle 4             -3.57 mesh box rear      -4.61 rear box face
         -4.90 the rear ladders' feet
       z  0.63 axles (tyres 1.25 m)  1.42 cab sill   1.67 platform / cabin floor   2.50 mesh walls top
          2.55 module seat           2.95 drum top   3.04 cab roof   3.07 cabin roof   2.92 rear box roof
          tubes (march pose, measured) 3.57 / 3.87 / 4.17 centres; search radar standing to 4.58.
     Axle spacing measured 2.08 / 3.90 / 1.52 m (sum = the published 7.50 m).
   The module: drum 2.2 m across, body 1.6 m wide, the tube blocks centred 1.1 m out (outer face 2.78 m across),
     tubes 3.35 m (57E6 3.2 m), tracking radar face about 1.0 m across, search antenna 1.6 x 1.05 m: from the rear
     view and the close-up against the 2.55 m chassis; perspective allows +-10 %.
   Height: the row's 4 m is the march pose; with the search antenna standing, as drawn, 4.58 m.

   Drawn in the module's rest pose for the game: facing FORWARD (render3d trains "turret" from 0 = hull heading),
     the search radar standing, tubes and guns level.  The photographs show it turned to the rear on the march,
     the antenna folded flat back over the operator cabin; that is a deliberate choice, not a photograph.
   "podelev" lifts both tube blocks and both guns together on one trunnion (a choice: the photographs show each
     side laid on its own); userData.el 0.98 rad (about 56 deg, the ET-2012 and KamAZ-6560 photographs show the
     blocks at 45-60 deg); userData.cells = the twelve tube mouths.
   NOT CONFIRMED: the cab length (1.45 m measured), module dimensions beyond the +-10 % above, what the domed
     head is, the inside of the mesh box (drawn dark), the tube clamp count.
   Paint: sampled off the Kuzmin photographs (lit 117,122,115, shade 83,85,84, olive 96,106,87), taken to about
     0.85: base #545a4c, canvas texture.
   Materials (6): paint (canvas texture), dark, glass, tyre, lamp, C.team (up-facing strips on the cabin roof and
     the module body roof).  Named nodes: "turret" (ring centre x -1.75 on the mesh box roof z 2.55), "podelev" in
     it, four "roadwheel" axle groups.
   +X nose, +Y left (port), +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPantsir = (function () {
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
  /* canvas paint: one flat coat of Russian green gone patchy with weather, rain streaks down the faces and faint
     panel seams.  Planar UVs at 0.34 a metre (Bin.tri), so the 256 px tile spans about 2.9 m and repeats. */
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
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* rain and dust streaks, running down (v is height on the side faces) */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.06)" : "rgba(214,208,180,0.05)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 18 + R() * 60);
      }
      /* faint panel seams and a few rivet rows */
      q.fillStyle = "rgba(18,18,12,0.16)";
      q.fillRect(0, 86, 256, 2); q.fillRect(0, 214, 256, 2); q.fillRect(118, 0, 2, 256);
      q.fillStyle = "rgba(18,18,12,0.12)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 2, 92, 2, 2); q.fillRect(124, i * 8 + 3, 2, 2); }
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

  /* a lugged cross-country tyre on the Y axis centred at (cx, yc, cz): chevron lugs a half step apart, dished wheel.
     sc scales the radius (1 = 0.75 m), wk the width (1 = 0.60 m) */
  /* a lugged cross-country tyre on the Y axis centred at (cx, yc, cz): chevron lugs a half step apart, dished wheel.
     sc scales the radius (1 = 0.75 m), wk the width (1 = 0.60 m) */
  function tyre(bin, cx, yc, cz, ph, hub, sc, wk) {
    var N = 18, R = [[-0.30, 0.52, 0, 0], [-0.30, 0.66, 0, 0], [-0.22, 0.75, 1, 0], [-0.03, 0.75, 1, 0],
                     [0.03, 0.75, 1, 1], [0.22, 0.75, 1, 1], [0.30, 0.66, 0, 0], [0.30, 0.52, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1] * sc;
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.035;
      a = (j + ph) / N * TAU;
      V.push([cx + r * Math.cos(a), yc + R[i][0] * wk, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([cx, yc + R[0][0] * wk, cz], [cx, yc + R[m - 1][0] * wk, cz]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    if (hub) for (k = -1; k <= 1; k += 2) {
      cyl(hub, [cx, yc + k * 0.27 * wk, cz], [cx, yc + k * 0.31 * wk, cz], 0.40 * sc, 0.40 * sc, 12);
      cyl(hub, [cx, yc + k * 0.31 * wk, cz], [cx, yc + k * 0.37 * wk, cz], 0.15 * sc, 0.12 * sc, 8);
    }
  }

  /* --------------------------------------------------------------- layout */
  /* model x = (px - 483.5) / 88.67 off "Bronnitsy - 03" (side on, right side): the published 7.50 m KamAZ-6560
     wheelbase spans 665 px between the first and last axle centres */
  var AX = [4.10, 2.02, -1.88, -3.40];                      /* axle stations, measured: 2.08 + 3.90 + 1.52 m        */
  var RT = 0.63, TYT = 1.03;                                /* tyre radius (1.25 m off the photograph), half track  */
  var HW = 1.25;                                            /* half width of the bodywork (KamAZ-6560: 2.55 m)       */
  var XR = -1.75, ZR = 2.55;                                /* module ring centre and its seat on the mesh box roof  */
  var PVU = -0.30, PVZ = 1.20;                              /* the elevating arms' trunnion, turret frame (u, z)     */
  var EL = 0.98;                                            /* launch elevation, as the old model (about 56 deg)     */
  var ROWS = [1.00, 1.27, 1.54], COLS = [0.86, 1.10], TR = 0.105, TU0 = -0.80, TU1 = 2.55;

  var PAINT = { base: "#545a4c", blots: ["#4b5044", "#5d6355", "#50564a"], seed: 6560 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2a2c27, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.12, metalness: 0.4 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1d1e1f, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xc98a2a, roughness: 0.4, metalness: 0.1, emissive: 0x2a1600 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, all) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (all) { b.glass = new Bin(T.glass, false); b.lamp = new Bin(T.lamp, false); b.team = new Bin(T.team, false); b.tyre = new Bin(T.tyre, false); }
    return b;
  }

  /* a cross-section ring of the cab at station x: square lower corners, rounded upper ones */
  function cabRing(x, w, zb, zt, r) {
    var P = [[x, w, zb]], k, a;
    for (k = 0; k <= 3; k++) { a = k / 3 * Math.PI / 2; P.push([x, w - r + r * Math.cos(a), zt - r + r * Math.sin(a)]); }
    for (k = 0; k <= 3; k++) { a = Math.PI / 2 + k / 3 * Math.PI / 2; P.push([x, -w + r + r * Math.cos(a), zt - r + r * Math.sin(a)]); }
    P.push([x, -w, zb]);
    return P;
  }
  /* a fender arch over an axle: a curved band of segments between radii r0 and r1, y0..y1 */
  function arch(bin, ax, cz, r0, r1, a0, a1, y0, y1, n) {
    var k, t0, t1, c0, s0, c1, s1;
    for (k = 0; k < n; k++) {
      t0 = a0 + (a1 - a0) * k / n; t1 = a0 + (a1 - a0) * (k + 1) / n;
      c0 = Math.cos(t0); s0 = Math.sin(t0); c1 = Math.cos(t1); s1 = Math.sin(t1);
      hexa(bin, [[ax + c0 * r0, y0, cz + s0 * r0], [ax + c1 * r0, y0, cz + s1 * r0], [ax + c1 * r0, y1, cz + s1 * r0], [ax + c0 * r0, y1, cz + s0 * r0],
                 [ax + c0 * r1, y0, cz + s0 * r1], [ax + c1 * r1, y0, cz + s1 * r1], [ax + c1 * r1, y1, cz + s1 * r1], [ax + c0 * r1, y1, cz + s0 * r1]]);
    }
  }
  /* a ladder standing in the YZ plane (rails at yc +-0.22) from A (bottom) to B (top), x moving with height */
  function ladder(bin, xa, xb, yc, z0, z1, n) {
    var i, t, x, z;
    bar(bin, [xa, yc - 0.22, z0], [xb, yc - 0.22, z1], 0.045);
    bar(bin, [xa, yc + 0.22, z0], [xb, yc + 0.22, z1], 0.045);
    for (i = 0; i < n; i++) {
      t = (i + 0.5) / n; x = xa + (xb - xa) * t; z = z0 + (z1 - z0) * t;
      bar(bin, [x, yc - 0.22, z], [x, yc + 0.22, z], 0.035);
    }
  }

  /* ------------------------------------------------------------- the cab */
  /* the KamAZ-6560 cab: a loft through seven stations (x, half width, sill, roof, roof-edge radius) measured off
     "Bronnitsy - 03" and the Oboronexpo front view: the flat lower face, the windscreen leaning back about 9 deg,
     the rounded roof edge; the cab ends at 3.45 */
  var CAB = [[3.45, 1.25, 1.42, 3.04, 0.14], [4.56, 1.25, 1.42, 3.04, 0.14], [4.69, 1.245, 1.42, 2.995, 0.12],
             [4.776, 1.24, 1.42, 2.90, 0.09], [4.82, 1.235, 1.42, 2.630, 0.07], [4.87, 1.23, 1.42, 2.324, 0.06],
             [4.90, 1.23, 1.42, 2.14, 0.05]];
  function addCab(B) {
    var P = B.paint, D = B.dark, G = B.glass, L = B.lamp, s, i, rings = [], k, z, a0;
    for (i = 0; i < CAB.length; i++) rings.push(cabRing(CAB[i][0], CAB[i][1], CAB[i][2], CAB[i][3], CAB[i][4]));
    loft(P, rings, false);
    /* the windscreen: one pane on the leaning band, wipers parked under it */
    var W0 = [4.90, 0, 2.14], Wd = unit([-0.124, 0, 0.76]), Nw = [Wd[2], 0, -Wd[0]];
    planeBox(G, W0, [0, 1, 0], Wd, Nw, -1.08, 1.08, 0.05, 0.72, 0.012, 0.03);
    for (s = -1; s <= 1; s += 2) bar(D, [4.925, s * 0.15, 2.24], [4.915, s * 0.75, 2.30], 0.02);
    /* the lower front: grille of four slats between round headlamps, the plate below it */
    box(D, 4.88, 4.905, -0.74, 0.74, 1.60, 2.00);
    for (k = 0; k < 4; k++) { z = 1.66 + k * 0.095; box(P, 4.90, 4.93, -0.72, 0.72, z, z + 0.045); }
    for (s = -1; s <= 1; s += 2) {
      cylX(D, 4.88, 4.92, s * 0.97, 1.80, 0.125, 14);
      cylX(G, 4.90, 4.935, s * 0.97, 1.80, 0.10, 14);
      box(L, 4.895, 4.92, s * 0.80, s * 0.88, 1.56, 1.62);
      /* the side windows, door seams and handle, the mirror on its arm */
      box(G, 3.90, 4.62, s * 1.256, s * 1.27, 2.30, 2.84);
      box(D, 3.86, 3.90, s * 1.255, s * 1.265, 1.50, 2.90);
      box(D, 4.62, 4.66, s * 1.255, s * 1.265, 1.50, 2.90);
      box(D, 3.86, 4.66, s * 1.255, s * 1.265, 1.48, 1.52);
      box(D, 3.98, 4.10, s * 1.25, s * 1.275, 2.12, 2.16);
      bar(D, [4.70, s * 1.22, 2.80], [4.80, s * 1.47, 2.78], 0.04);
      bar(D, [4.70, s * 1.22, 2.30], [4.80, s * 1.47, 2.40], 0.04);
      box(D, 4.74, 4.84, s * 1.40, s * 1.52, 2.32, 2.82);
      /* the front fender arches over the first two axles, the wheel-arch skirt of the cab corner */
      arch(P, AX[0], RT, 0.72, 0.79, 0.10, Math.PI - 0.15, s * 0.80, s * 1.27, 9);
      arch(D, AX[1], RT, 0.72, 0.78, 0.25, Math.PI - 0.25, s * 0.82, s * 1.26, 8);
      box(P, 4.72, 4.90, s * 0.82, s * 1.25, 1.36, 1.42);
      /* cab steps behind the front wheel */
      box(D, 3.22, 3.46, s * 1.02, s * 1.24, 0.92, 0.96);
      box(D, 3.22, 3.46, s * 1.02, s * 1.24, 1.18, 1.22);
    }
    /* the bumper: heavy plate with indicators, fog lamps and tow eyes */
    box(P, 4.80, 5.00, -1.24, 1.24, 1.02, 1.42);
    box(D, 4.85, 4.98, -1.10, 1.10, 0.94, 1.02);
    for (s = -1; s <= 1; s += 2) {
      cylX(L, 4.995, 5.01, s * 1.02, 1.30, 0.045, 10);
      box(G, 4.995, 5.005, s * 0.52, s * 0.70, 1.08, 1.14);
      box(D, 4.97, 5.03, s * 0.30, s * 0.40, 1.05, 1.15);
    }
    /* roof: the amber beacon at the right front corner ("Bronnitsy - 01"), marker lamps, a roof hatch */
    cylZ(D, 4.45, -0.62, 3.04, 3.08, 0.08, 10);
    cyl(L, [4.45, -0.62, 3.08], [4.45, -0.62, 3.20], 0.065, 0.055, 10);
    for (s = -1; s <= 1; s += 2) box(L, 4.60, 4.66, s * 0.95, s * 1.05, 3.02, 3.07);
    box(D, 3.80, 4.30, -0.30, 0.30, 3.04, 3.07);
    /* under the cab: frame horns, steering box */
    box(D, 4.55, 4.82, -0.55, 0.55, 0.95, 1.20);
  }

  /* ------------------------------------------------- the operator cabin */
  /* the tall equipment / crew box behind the cab, x 0.72..3.40, roof 3.07; the spare wheel stands in a recess on
     its RIGHT front corner ("Bronnitsy - 03", Oboronexpo front view, ET-2012); a door with a step ladder on each
     side, a louvred panel on the left behind the cab ("Bronnitsy - 01") */
  function addCabin(B) {
    var P = B.paint, D = B.dark, T = B.team, s, k, z, x;
    profY(P, [[0.72, 1.67], [2.50, 1.67], [2.50, 3.07], [0.80, 3.07], [0.72, 2.99]], -HW, HW);
    profY(P, [[2.50, 1.67], [3.38, 1.67], [3.38, 3.00], [3.32, 3.07], [2.50, 3.07]], -0.66, HW);
    box(P, 2.50, 3.40, -HW, -0.66, 3.00, 3.07);                         /* the canopy over the spare wheel */
    box(D, 2.50, 2.53, -HW, -0.66, 1.67, 3.00);
    /* the spare wheel, standing, its hub outward */
    tyre(B.tyre, 2.97, -0.98, 2.14, 0.25, B.dark, 0.56 / 0.75, 0.62);
    box(D, 2.92, 3.02, -0.80, -0.66, 1.95, 2.33);
    /* right side: the door with its step ladder, a hatch low at the front corner, a grab rail */
    box(P, 1.53, 2.35, -HW - 0.02, -HW, 1.74, 2.95);
    box(D, 1.53, 2.35, -HW - 0.03, -HW - 0.01, 1.72, 1.75);
    box(D, 1.51, 1.54, -HW - 0.03, -HW - 0.01, 1.72, 2.97);
    box(D, 2.34, 2.37, -HW - 0.03, -HW - 0.01, 1.72, 2.97);
    box(D, 1.53, 2.35, -HW - 0.03, -HW - 0.01, 2.94, 2.97);
    for (k = 0; k < 3; k++) { z = 1.95 + k * 0.24; box(D, 1.78, 2.20, -HW - 0.10, -HW - 0.02, z, z + 0.03); }
    bar(D, [1.78, -HW - 0.08, 1.95], [1.78, -HW - 0.08, 2.48], 0.03);
    bar(D, [2.20, -HW - 0.08, 1.95], [2.20, -HW - 0.08, 2.48], 0.03);
    box(D, 2.22, 2.28, -HW - 0.05, -HW - 0.01, 2.30, 2.36);
    box(D, 0.78, 1.20, -HW - 0.02, -HW - 0.005, 1.72, 2.36);
    box(P, 0.80, 1.18, -HW - 0.03, -HW - 0.01, 1.74, 2.34);
    bar(D, [1.40, -HW - 0.07, 1.90], [1.40, -HW - 0.07, 2.80], 0.03);
    /* left side: the louvred panel behind the cab and the door with its ladder */
    box(D, 2.62, 3.24, HW, HW + 0.01, 1.85, 2.92);
    for (k = 0; k < 11; k++) { z = 1.90 + k * 0.093; box(P, 2.64, 3.22, HW + 0.005, HW + 0.035, z, z + 0.035); }
    box(P, 1.48, 2.30, HW, HW + 0.02, 1.74, 2.95);
    box(D, 1.46, 1.49, HW + 0.01, HW + 0.03, 1.72, 2.97);
    box(D, 2.29, 2.32, HW + 0.01, HW + 0.03, 1.72, 2.97);
    for (k = 0; k < 3; k++) { z = 1.95 + k * 0.24; box(D, 1.70, 2.10, HW + 0.02, HW + 0.10, z, z + 0.03); }
    bar(D, [1.70, HW + 0.08, 1.95], [1.70, HW + 0.08, 2.48], 0.03);
    bar(D, [2.10, HW + 0.08, 1.95], [2.10, HW + 0.08, 2.48], 0.03);
    /* roof: hatch ring, a vent, the team strip */
    cylZ(P, 1.20, 0.55, 3.07, 3.13, 0.24, 14);
    cylZ(D, 1.20, 0.55, 3.13, 3.15, 0.18, 12);
    box(D, 2.70, 3.10, 0.20, 0.70, 3.07, 3.16);
    box(T, 1.65, 2.40, -0.13, 0.13, 3.07, 3.085);
    /* the cab / cabin bridge and the cabin floor frame */
    box(D, 3.38, 3.47, -1.0, 1.0, 1.42, 2.80);
    box(D, 0.72, 3.40, -HW, HW, 1.60, 1.67);
  }

  /* ---------------------------------------------------- chassis and rear */
  function addChassis(B) {
    var P = B.paint, D = B.dark, L = B.lamp, s, k, x, z, y;
    /* the frame rails and cross members */
    for (s = -1; s <= 1; s += 2) box(D, -4.62, 4.82, s * 0.40, s * 0.54, 0.95, 1.24);
    for (x = -4.4; x < 4.6; x += 1.05) box(D, x, x + 0.10, -0.54, 0.54, 1.00, 1.18);
    /* the rear platform: deck plate, the dark equipment under it, the mesh-walled box that carries the module */
    box(P, -4.61, 0.72, -HW - 0.02, HW + 0.02, 1.67, 1.77);
    box(D, -4.55, 0.70, -0.98, 0.98, 1.24, 1.67);
    box(D, -3.55, 0.64, -HW + 0.06, HW - 0.06, 1.77, 2.50);
    box(P, -3.57, 0.66, -HW, HW, 2.50, ZR);
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      bar(P, [-3.57, y, 2.50], [0.66, y, 2.50], 0.06);
      bar(P, [-3.57, y, 1.80], [0.66, y, 1.80], 0.06);
      for (k = 0; k <= 7; k++) { x = -3.57 + k * (4.23 / 7); bar(P, [x, y, 1.80], [x, y, 2.50], k % 7 ? 0.04 : 0.07); }
      for (k = 1; k <= 6; k++) { z = 1.80 + k * 0.10; bar(P, [-3.57, y, z], [0.66, y, z], 0.012); }
      for (k = 1; k <= 20; k++) { x = -3.57 + k * (4.23 / 21); bar(P, [x, y, 1.80], [x, y, 2.50], 0.010); }
      /* the hand rails at the platform ends */
      bar(P, [-4.15, y * 0.99, 1.77], [-4.15, y * 0.99, 2.62], 0.04);
      bar(P, [-4.15, y * 0.99, 2.62], [-3.62, y * 0.99, 2.62], 0.04);
      bar(P, [0.70, y * 0.99, 1.77], [0.70, y * 0.99, 2.62], 0.04);
      /* the rear box: louvres on its sides */
      box(D, -4.42, -3.78, y, y + s * 0.01, 1.92, 2.78);
      for (k = 0; k < 8; k++) { z = 1.96 + k * 0.102; box(P, -4.40, -3.80, y + s * 0.005, y + s * 0.035, z, z + 0.04); }
      /* fuel tanks between the axle pairs (both sides) and the air reservoirs */
      cylX(D, -0.32, 0.81, s * 0.92, 1.02, 0.31, 16);
      box(D, -0.10, -0.04, s * 0.60, s * 1.25, 0.70, 1.34);
      box(D, 0.55, 0.61, s * 0.60, s * 1.25, 0.70, 1.34);
      cylX(D, -0.94, -0.44, s * 0.85, 1.05, 0.13, 10);
      /* the stabiliser jacks: amidships and at the rear corners, stowed with their pads up */
      cylZ(D, 1.12, s * 1.12, 0.42, 1.67, 0.09, 10);
      cylZ(D, 1.12, s * 1.12, 0.34, 0.42, 0.20, 12);
      cylZ(D, -4.45, s * 1.12, 0.40, 1.67, 0.08, 10);
      cylZ(D, -4.45, s * 1.12, 0.32, 0.40, 0.18, 12);
      /* rear mudguards over the rear axle pair, the flap behind the second axle */
      box(D, -4.20, -1.10, s * 0.80, s * 1.28, 1.36, 1.40);
      box(D, 1.30, 1.36, s * 0.80, s * 1.28, 0.75, 1.40);
      /* rear lamp clusters on the bumper beam */
      box(L, -4.765, -4.75, s * 0.85, s * 1.10, 0.98, 1.10);
    }
    /* the rear box and its rear face: two ladders, a hatch, the bumper beam and the tow coupling */
    profY(P, [[-4.61, 1.77], [-3.57, 1.77], [-3.57, 2.92], [-4.55, 2.92], [-4.61, 2.86]], -HW, HW);
    box(D, -4.63, -4.61, -0.30, 0.30, 1.95, 2.60);
    box(P, -4.64, -4.62, -0.26, 0.26, 1.99, 2.56);
    ladder(D, -4.90, -4.66, -0.82, 0.98, 2.90, 7);
    ladder(D, -4.90, -4.66, 0.82, 0.98, 2.90, 7);
    box(D, -4.75, -4.58, -1.22, 1.22, 0.92, 1.16);
    box(D, -4.82, -4.70, -0.20, 0.20, 1.00, 1.20);
    /* tops of the rear box: a vent and the slew-drive cover */
    box(D, -4.30, -3.90, -0.60, 0.60, 2.92, 2.98);
  }

  /* ---------------------------------------------------------- the module */
  /* turret frame: u forward (the module's front, where the tracking radar and the tube mouths are), origin on the
     slew ring at its seat */
  function addModule(B) {
    var P = B.paint, D = B.dark, T = B.team, s, a, c, sn;
    /* the slew ring and drum */
    cylZ(D, 0, 0, 0, 0.07, 1.10, 32);
    cylZ(P, 0, 0, 0.07, 0.40, 1.04, 32);
    /* the central body, its top chamfered at both ends */
    profY(P, [[-1.55, 0.40], [0.80, 0.40], [0.80, 0.80], [0.66, 0.95], [-1.40, 0.95], [-1.55, 0.84]], -0.70, 0.70);
    for (s = -1; s <= 1; s += 2) {
      box(P, -1.50, -0.90, s * 0.70, s * 0.92, 0.42, 0.86);
      box(D, -1.45, -0.95, s * 0.92, s * 0.925, 0.48, 0.80);
    }
    /* the 1RS2 tracking radar on the module front: a short drum with its flat round face */
    cylX(D, 0.40, 0.62, 0, 1.05, 0.48, 24);
    cylX(P, 0.62, 1.08, 0, 1.05, 0.57, 32);
    cyl(D, [1.08, 0, 1.05], [1.115, 0, 1.05], 0.57, 0.55, 32);
    cylX(P, 1.08, 1.13, 0, 1.05, 0.52, 32);
    for (s = -1; s <= 1; s += 2) box(D, 0.70, 0.95, s * 0.30, s * 0.40, 0.40, 0.56);
    /* the 1RS1 search radar on the module's back: pedestal, the antenna standing and leaning back 12 deg, its
       equipment box behind ("Oboronexpo front view", ET-2012) */
    box(P, -1.85, -1.30, -0.34, 0.34, 0.86, 1.04);
    box(D, -1.75, -1.55, -0.40, 0.40, 0.96, 1.10);
    a = 12 * Math.PI / 180; c = Math.cos(a); sn = Math.sin(a);
    var R0 = [-1.58, 0, 1.04], Ru = [0, 1, 0], Rw = [-sn, 0, c], Rn = [c, 0, sn];
    planeBox(P, R0, Ru, Rw, Rn, -0.80, 0.80, 0, 1.05, -0.20, 0);
    planeBox(D, R0, Ru, Rw, Rn, -0.74, 0.74, 0.06, 0.99, 0, 0.015);
    planeBox(P, R0, Ru, Rw, Rn, -0.55, 0.55, 0.12, 0.88, -0.52, -0.20);
    planeBox(D, R0, Ru, Rw, Rn, -0.82, 0.82, 0.97, 1.05, -0.22, 0.01);
    /* the round-domed head on its column behind the guns ("Bronnitsy - 03"), the whip antennas */
    box(P, -1.08, -0.78, -0.18, 0.18, 0.95, 1.50);
    cylZ(P, -0.93, 0, 1.50, 1.60, 0.20, 16);
    cyl(D, [-0.93, 0, 1.60], [-0.93, 0, 1.74], 0.20, 0.08, 16);
    for (s = -1; s <= 1; s += 2) {
      cylZ(D, -1.45, s * 0.55, 0.95, 1.05, 0.05, 8);
      cylZ(D, -1.45, s * 0.55, 1.05, 2.00, 0.012, 5);
    }
    /* hatches on the body roof and the team strip across it */
    cylZ(P, -0.50, 0.42, 0.95, 1.00, 0.17, 12);
    box(T, -1.38, -1.12, -0.50, 0.50, 0.95, 0.965);
  }

  /* the elevating parts: on each side a block of six 57E6 tubes (three high, two across) in clamp frames with its
     side shield, and the twin 30 mm 2A38M on the block's inner side (rear view, ET-2012 close-up); all in the
     turret frame, moved back by the pivot when the group is made.  Returns the twelve cells. */
  function addArms(E) {
    var P = E.paint, D = E.dark, cells = [], s, i, j, k, y, z, u;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < ROWS.length; i++) for (j = 0; j < COLS.length; j++) {
        y = s * COLS[j]; z = ROWS[i];
        cylX(P, TU0, TU1, y, z, TR, 12);
        cylX(D, TU1, TU1 + 0.02, y, z, TR - 0.012, 12);
        cylX(P, TU1 + 0.005, TU1 + 0.025, y, z, TR - 0.035, 10);
        cylX(D, TU0 - 0.02, TU0, y, z, TR - 0.02, 10);
        for (k = 0; k < 3; k++) { u = [0.25, 1.30, 2.20][k]; cylX(P, u, u + 0.06, y, z, TR + 0.012, 12); }
        cells.push([TU1 - PVU, y, z - PVZ, TU0 - PVU]);
      }
      /* the clamp frames round the block (four bars each) and the cradle plate at its rear */
      for (k = 0; k < 3; k++) {
        u = [-0.55, 0.85, 2.00][k];
        box(P, u, u + 0.08, s * 0.73, s * 1.23, 1.64, 1.70);
        box(P, u, u + 0.08, s * 0.73, s * 1.23, 0.84, 0.90);
        box(P, u, u + 0.08, s * 0.73, s * 0.76, 0.84, 1.70);
        box(P, u, u + 0.08, s * 1.20, s * 1.23, 0.84, 1.70);
      }
      box(D, -0.82, -0.72, s * 0.73, s * 1.23, 0.84, 1.70);
      /* the housing under the block, and the side shield with its panel on the block's outer face */
      box(P, -0.85, 0.95, s * 0.71, s * 1.23, 0.45, 0.86);
      box(D, -0.60, 0.40, s * 0.71, s * 1.23, 0.445, 0.45);
      box(P, -0.85, 0.95, s * 1.23, s * 1.28, 0.45, 1.20);
      box(D, -0.70, 0.80, s * 1.28, s * 1.285, 0.56, 0.60);
      box(D, -0.70, 0.80, s * 1.28, s * 1.285, 1.06, 1.10);
      box(D, -0.70, -0.66, s * 1.28, s * 1.285, 0.56, 1.10);
      box(D, 0.76, 0.80, s * 1.28, s * 1.285, 0.56, 1.10);
      /* the trunnion arm to the body */
      box(P, -0.48, -0.12, s * 0.68, s * 0.73, 0.70, 1.42);
      /* the 2A38M on top of the block's inner column: receiver housing, the feed cover, two barrels one above the
         other with jackets and brakes */
      box(P, -0.60, 0.52, s * 0.72, s * 1.00, 1.66, 1.92);
      box(P, -0.40, 0.20, s * 0.76, s * 0.96, 1.92, 1.99);
      box(D, 0.52, 0.62, s * 0.76, s * 0.96, 1.70, 1.90);
      for (k = 0; k < 2; k++) {
        z = k ? 1.85 : 1.74;
        cylX(D, 0.62, 1.15, s * 0.86, z, 0.05, 10);
        cylX(D, 1.15, 2.42, s * 0.86, z, 0.030, 8);
        cylX(D, 2.30, 2.44, s * 0.86, z, 0.045, 8);
      }
      box(D, 1.70, 1.76, s * 0.81, s * 0.91, 1.72, 1.87);
    }
    /* the trunnion shaft */
    cylY(D, PVU, -0.70, 0.70, PVZ, 0.07, 10);
    return cells;
  }

  function build(THREE, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T, true), i, wg, TB, MB, EB, E, geo, cells;
    addCab(HB);
    addCabin(HB);
    addChassis(HB);
    flush(THREE, g, HB);
    /* four turning axle groups: a tyre each side and the axle beam */
    for (i = 0; i < AX.length; i++) {
      TB = new Bin(T.tyre, false);
      tyre(TB, 0, -TYT, 0, 0, TB, RT / 0.75, 0.40 / 0.60);
      tyre(TB, 0, TYT, 0, 0.5, TB, RT / 0.75, 0.40 / 0.60);
      cylY(TB, 0, -TYT + 0.14, TYT - 0.14, 0, 0.09, 8);
      cylY(TB, 0, -0.22, 0.22, 0, 0.20, 10);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, RT);
      wg.add(new THREE.Mesh(geo, T.tyre));
      g.add(wg);
    }
    /* the combat module: "turret" on the slew ring, the arms in "podelev" on their trunnion */
    MB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) };
    addModule(MB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(XR, 0, ZR);
    flush(THREE, wg, MB);
    EB = bins(T, false);
    cells = addArms(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(PVU, 0, PVZ);
    flush(THREE, E, EB);
    for (i = 0; i < E.children.length; i++) E.children[i].position.set(-PVU, 0, -PVZ);
    E.userData.el = EL;
    E.userData.cells = cells;
    wg.add(E);
    g.add(wg);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the rear ladders' feet (-4.92) to the bumper's tow eyes (5.03) */
UNIT_MODELS["pact_e00_spaag"] = { len: 9.95, build: function (THREE, M, C) { return HeroPantsir.build(THREE, C); } };
