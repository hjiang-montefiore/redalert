/* ============ ru_redut.js - HERO model: the 4K44 Redut coastal missile system's SPU-35B launcher on the BAZ-135MB ============
   One row (js/eras.js, coastssm, turret:false, deploy:true, rounds 1, e60-e90): pact_e60_coastssm "4K44 Redut (SSC-1b
   Sepal), SPU-35B on the BAZ-135MB".  ru.wikipedia ("Redut (beregovoy raketny kompleks)"): the P-35B, 1 m across and
   9.5 m long; the SPU-35B on the BAZ-135MB, 21 t, crew five.  ru.wikipedia ("P-35 (raketa)"): "the launch was made at an
   angle of 20 degrees".  ru.wikipedia ("ZIL-135"): track 2,300 mm, base 6,300 mm for the family.

   Recognition list, each with the photograph it rests on (Wikimedia Commons, cached in the scratchpad q_redut_ref):
     1. ONE big container, nearly the whole length of the vehicle, lying level on the march from just behind the cab to
        far past the last axle ("Transporter erector launcher of Redut ... Park Patriot 01/02/03", the Kaliningrad
        rehearsal photograph "Beregovoy protivokorabelny raketny kompleks Redut").
     2. Its big rounded REAR cover with a tube hoop over it, bosses on its sides and a flat louvred lid on top
        ("Park Patriot 02", "-03", "BRK Redut. Chernomorsky flot").
     3. The wider joint band about 60 percent of the way back with a ladder over it each side ("Park Patriot 02", "-03",
        Kaliningrad), strap rings along the body.
     4. Walkway grilles with low rails along the top, a hood on top of the rounded front end behind the cab ("Park
        Patriot 01", "-02", Kaliningrad).
     5. The flat, full-width BAZ-135MB cab ahead of the first axle: three flat windscreen panes, a louvred grille in
        the middle of the front, round headlamps at the corners, marker lamps along the roof's front edge ("Park
        Patriot 01", "ParkPatriot2015part5-23", "SuddenTest2013-08").
     6. The heavy black bumper wider than the cab, and the beak-shaped under-shield sloping back beneath it to the
        first axle ("Park Patriot 01", "part5-24", "part5-26").
     7. The door with its big window, a narrow window ahead of it, the square lamp box on the door ("Park Patriot 01",
        "SuddenTest2013-05", "part5-24").
     8. Eight big tyres: one axle under the cab's rear, a close middle pair, one axle at the rear, with heavy rounded
        mudguards and square boxes between the wheels ("Park Patriot 02", "-03", Kaliningrad).
     9. The two upright pillars either side of the container over the second axle, the trunnion it turns on
        ("Park Patriot 02", "-03", "part5-24", "part5-26").
    10. Set up to fire: the container's REAR end raised high, its front end dipping down behind the cab, so the round
        leaves over the tail ("ParkPatriot2015part5-24/-25/-26", "BRK Redut. Chernomorsky flot") - the row's
        fireAft:true rests on these four photographs.
    11. Plain Soviet olive green; the museum's "22", the guards badge, the 2016 parade black and the Pacific Fleet's
        camouflage ("Redut - Berega Sakhalina") are NOT drawn.

   Station table (metres back from the bumper face).  No side-on photograph or drawing was found: the stations are read
   off the Kaliningrad photograph (starboard side, front three-quarter) through a perspective fit on the published
   6.30 m base, cross-checked against "Park Patriot 03" (port side, rear three-quarter):
       0.00 bumper face        0.35 cab front face        0.84-1.53 door          2.20 cab rear wall
       2.40 container front    2.45 axle 1                3.25-4.15 boxes          4.85 axle 2
       4.95 trunnion pillars   6.35 axle 3                7.10-8.00 boxes          7.24-7.62 joint band and ladder
       8.75 axle 4             9.20 rear saddle           9.60 frame end           10.95-12.10 lid on the rear cover
      12.30 apex of the rear cover
     Heights (the front ones off "part5-23", dead ahead): cab roof 3.00, windscreen 2.22-2.79, grille 1.36-1.70, headlamps
     1.55, bumper 1.02-1.30 (3.1 m wide), tyres 1.36 (16.00-20), container axis 2.35 (its top at the cab roof, "Park Patriot 01"),
     forward body 1.58 m across, after body 1.84 m (from the photographs; the missile inside is 1.0 m across).
   Published: the P-35B 9.5 m long: the container drawn 9.9 m between its end covers (the photographs put the rear
     cover 3.4-3.9 m past the last axle; "Park Patriot 03" alone reads it nearer 2.2 m, which would leave no room for
     the round).  The 2.40 / 1.50 / 2.40 split of the 6.30 m base is read off the photographs (Kaliningrad gives the
     first gap a little longer).  No published length of the SPU-35B was found: 12.30 m is measured off the build.
   Firing: the container is raised about the trunnion on the pillars to the published 20 degrees (userData.el) with
     its rear cover up and aft; the row carries fireAft:true so the game turns the tail to the ship.  Where the real
     trunnion sits is not published: the pillars stand over the second axle in every photograph, and raised there the
     front end dips behind the cab as "part5-24/-26" show (to about 2.15 m at its top).  The elevating rams seen in
     "part5-24/-26" are not drawn (the engine turns one group; a ram cannot follow it).
   NO TURNTABLE: the container only elevates; nothing in the photographs or sources traverses.  Nothing is named
     "turret".
   NO POSE GROUPS: the SPU-35B carries no radar mast, cover or jacks of its own in any photograph (the museum stands
     under "Park Patriot 01" and "part5-26" are props), so there is no "travelpose" / "deploypose"; set up, it is the
     march state with the container raised.  The Mys radar and the 4R45 Skala control vehicle are other vehicles.
   NOT confirmed and not drawn: the rams, the container's front and rear covers opening at launch, the reload vehicle,
     the cab interior, the whip antennas, any marking.
   Paint: sampled off "Park Patriot 03" (overcast side, 94,86,67), taken to about 0.85: base #514a38.
   Materials (6): paint (canvas texture), dark, glass, tyre, lamp, C.team (two small up-facing strips on the cab roof).
   Nodes: four "roadwheel" axle groups (a tyre each side), "podelev" (the container).
   +X nose, +Y left (port), +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRedut = (function () {
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
  /* every station is given in metres BACK from the bumper face (the header's table); X() turns it into model x */
  var XF = 6.15;
  function X(d) { return XF - d; }
  var AXD = [2.45, 4.85, 6.35, 8.75];                      /* axles: base 6.30 m (ru.wikipedia ZIL-135), 2.40 / 1.50 / 2.40 */
  var RT = 0.68, TYT = 1.15;                                /* tyre radius (16.00-20, about 1.36 m), half track (2.30 m) */
  var HW = 1.40;                                            /* half width of the cab (2.80 m) */
  var TRD = 4.95, TRZ = 2.40;                               /* the container's trunnion on its two pillars over axle 2 */
  var CZ = 2.35;                                            /* the container's axis on the march */
  var CF = 2.40, CR = 12.30;                                /* the container's front end and the apex of its rear cover */
  var EL = 20 * Math.PI / 180;                              /* "launched at 20 degrees" (ru.wikipedia, P-35) */

  var PAINT = { base: "#514a38", blots: ["#474131", "#5b5440", "#4c4534"], seed: 3544 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x272824, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.12, metalness: 0.4 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1d1e1f, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xc98a2a, roughness: 0.4, metalness: 0.1, emissive: 0x2a1600 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* ------------------------------------------------------------- the cab */
  /* the BAZ-135MB cab: a flat, full-width box ahead of the first axle with three flat windscreen panes, a louvred
     grille in the middle of the front, round headlamps at the corners, the heavy black bumper and the beak-shaped
     under-shield sloping back beneath it ("Park Patriot 01", "ParkPatriot2015part5-23/-24/-26", "SuddenTest2013-08") */
  function addCab(B) {
    var s, k, y, x;
    profY(B.paint, [[X(0.35), 1.05], [X(1.55), 1.05], [X(1.72), 1.46], [X(2.20), 1.46], [X(2.20), 2.97], [X(2.15), 3.00],
                    [X(0.42), 3.00], [X(0.35), 2.93]], -HW, HW);
    /* the roof's raised rim and the four marker lamps along its front edge */
    box(B.dark, X(2.18), X(0.38), -HW + 0.02, HW - 0.02, 3.00, 3.05);
    box(B.paint, X(2.12), X(0.46), -HW + 0.10, HW - 0.10, 3.00, 3.07);
    for (k = 0; k < 4; k++) { y = -1.05 + k * 0.70; box(B.lamp, X(0.47), X(0.38), y - 0.06, y + 0.06, 3.02, 3.11); }
    /* three windscreen panes in their frames, wipers */
    box(B.dark, X(0.37), X(0.33), -HW + 0.08, HW - 0.08, 2.17, 2.84);
    for (k = 0; k < 3; k++) {
      y = -0.86 + k * 0.86;
      box(B.glass, X(0.36), X(0.32), y - 0.38, y + 0.38, 2.22, 2.79);
      bar(B.dark, [X(0.315), y - 0.10, 2.25], [X(0.315), y + 0.12, 2.52], 0.025);
    }
    /* the grille: horizontal louvres in a frame on the middle of the front */
    box(B.dark, X(0.37), X(0.33), -0.36, 0.36, 1.36, 1.70);
    for (k = 0; k < 4; k++) box(B.paint, X(0.34), X(0.30), -0.33, 0.33, 1.40 + k * 0.08, 1.43 + k * 0.08);
    box(B.paint, X(0.34), X(0.30), -0.015, 0.015, 1.38, 1.68);
    /* round headlamps at the corners, the small side lamps beside them */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, X(0.37), X(0.28), s * 1.17, 1.55, 0.13, 12);
      cylX(B.glass, X(0.29), X(0.27), s * 1.17, 1.55, 0.105, 12);
      cylX(B.lamp, X(0.37), X(0.31), s * 0.82, 1.55, 0.05, 8);
    }
    /* the bumper, wider than the cab, and the under-shield sloping back to the first axle */
    box(B.dark, X(0.40), X(0.0), -1.55, 1.55, 1.02, 1.30);
    hexa(B.dark, [[X(0.06), -1.40, 1.02], [X(0.06), 1.40, 1.02], [X(1.35), 0.82, 0.50], [X(1.35), -0.82, 0.50],
                  [X(0.40), -1.40, 1.02], [X(0.40), 1.40, 1.02], [X(1.55), 0.82, 0.70], [X(1.55), -0.82, 0.70]]);
    for (s = -1; s <= 1; s += 2) box(B.dark, X(0.10), X(0.0), s * 0.62 - 0.06, s * 0.62 + 0.06, 0.90, 1.02);   /* tow hooks */
    /* the cab sides: the narrow front window, the door with its big window, the square lamp box on the door, door
       seams and handle, the step under the door (no mirrors show in any photograph) */
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      box(B.glass, X(0.75), X(0.50), y - s * 0.01, y + s * 0.02, 2.30, 2.82);
      box(B.glass, X(1.45), X(0.92), y - s * 0.01, y + s * 0.02, 2.32, 2.80);
      box(B.dark, X(1.50), X(0.87), y - s * 0.01, y + s * 0.012, 2.27, 2.32);
      box(B.dark, X(1.56), X(1.53), y - s * 0.01, y + s * 0.012, 1.35, 2.92);
      box(B.dark, X(0.84), X(0.81), y - s * 0.01, y + s * 0.012, 1.35, 2.92);
      box(B.dark, X(1.42), X(0.98), y, y + s * 0.13, 1.92, 2.22);
      box(B.glass, X(1.38), X(1.02), y + s * 0.13, y + s * 0.14, 1.96, 2.18);
      box(B.dark, X(1.48), X(1.38), y, y + s * 0.04, 1.70, 1.74);
      for (k = 0; k < 2; k++) box(B.dark, X(1.40), X(0.95), y - s * 0.02, y + s * 0.12, 0.95 + k * 0.22, 0.98 + k * 0.22);
      bar(B.dark, [X(1.40), y, 1.30], [X(1.40), y + s * 0.10, 0.92], 0.03);
      bar(B.dark, [X(0.95), y, 1.30], [X(0.95), y + s * 0.10, 0.92], 0.03);
    }
    /* the rear wall's seam */
    box(B.dark, X(2.22), X(2.19), -HW, HW, 1.46, 1.50);
    box(B.team, X(1.85), X(1.35), 0.70, 1.00, 3.07, 3.085);
    box(B.team, X(1.85), X(1.35), -1.00, -0.70, 3.07, 3.085);
  }

  /* --------------------------------------------------------------- chassis */
  /* a mudguard over a wheel: an arched strip from angle a0 to a1 (0 aft, 90 up, 180 forward) about the axle */
  function fender(B, d, a0, a1, s) {
    var n = 6, k, A, Bq, r0 = RT + 0.10, r1 = RT + 0.16, p = [], c, sn;
    for (k = 0; k <= n; k++) {
      A = (a0 + (a1 - a0) * k / n) * Math.PI / 180;
      c = Math.cos(A); sn = Math.sin(A);
      p.push([[X(d + r0 * c), RT + r0 * sn], [X(d + r1 * c), RT + r1 * sn]]);
    }
    for (k = 0; k < n; k++) {
      Bq = [p[k][0], p[k + 1][0], p[k + 1][1], p[k][1]];
      profY(B.paint, Bq, s * 0.90, s * 1.42);
    }
  }
  function addChassis(B) {
    var i, s, k, x;
    /* frame rails and the low engine deck behind the cab, which the container's front end dips toward at launch */
    for (s = -1; s <= 1; s += 2) box(B.dark, X(9.60), X(1.00), s * 0.38, s * 0.55, 0.72, 0.92);
    box(B.paint, X(4.40), X(2.20), -0.85, 0.85, 0.76, 0.90);
    for (k = 0; k < 6; k++) { x = X(2.40 + k * 0.32); box(B.dark, x - 0.05, x + 0.05, -0.80, 0.80, 0.90, 0.92); }
    for (i = 0; i < AXD.length; i++) {
      x = X(AXD[i]);
      cylY(B.dark, x, -0.95, 0.95, RT, 0.10, 8);
      cylY(B.dark, x, -0.28, 0.28, RT, 0.22, 10);
    }
    /* the mudguards: the first behind the cab, one long guard over the middle pair, the last ("Park Patriot 02/03") */
    for (s = -1; s <= 1; s += 2) {
      fender(B, AXD[0], 10, 88, s);
      fender(B, AXD[1], 92, 170, s);
      fender(B, AXD[2], 10, 88, s);
      box(B.paint, X(AXD[2]), X(AXD[1]), s * 0.90, s * 1.42, RT + 0.70, RT + 0.76);
      fender(B, AXD[3], 10, 170, s);
      /* the equipment boxes behind the cab, outboard of the container's front end as it dips ("Park Patriot 01",
         Kaliningrad), and the square boxes between the wheels, a lid seam each */
      box(B.paint, X(3.15), X(2.22), s * 0.86, s * 1.36, 1.02, 1.62);
      box(B.dark, X(3.12), X(2.25), s * 1.36, s * 1.375, 1.50, 1.53);
      box(B.paint, X(4.15), X(3.25), s * 0.86, s * 1.36, 0.70, 1.42);
      box(B.dark, X(4.12), X(3.28), s * 1.36, s * 1.375, 1.30, 1.33);
      box(B.paint, X(8.00), X(7.10), s * 0.86, s * 1.36, 0.70, 1.42);
      box(B.dark, X(7.97), X(7.13), s * 1.36, s * 1.375, 1.30, 1.33);
      /* the trunnion pillars beside the container, a bearing block at the top ("Park Patriot 02/03", "part5-26") */
      box(B.paint, X(TRD + 0.11), X(TRD - 0.11), s * 0.90, s * 1.10, 1.00, TRZ + 0.20);
      cylY(B.dark, X(TRD), s * 0.86, s * 1.14, TRZ, 0.15, 12);
      bar(B.dark, [X(TRD + 0.9), s * 1.00, 1.02], [X(TRD + 0.10), s * 1.00, 1.95], 0.07);
      bar(B.dark, [X(TRD - 0.9), s * 1.00, 1.02], [X(TRD - 0.10), s * 1.00, 1.95], 0.07);
      /* rear lamps and the cross beam's ends */
      box(B.lamp, X(9.62), X(9.58), s * 1.00, s * 1.18, 0.95, 1.05);
    }
    /* the saddle under the container's rear, the rear cross beam and hitch */
    box(B.dark, X(9.45), X(8.95), -0.62, 0.62, 1.00, 1.18);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [X(9.20), s * 0.55, 1.18], [X(9.20), s * 0.32, CZ - 0.90], 0.10);
    box(B.dark, X(9.60), X(9.40), -1.25, 1.25, 0.75, 1.05);
    box(B.dark, X(9.75), X(9.58), -0.10, 0.10, 0.80, 0.92);
  }

  /* ---------------------------------------------------- the container */
  /* the P-35B's launch container, in the elevating group's frame: +x AFT from the trunnion, z from the trunnion's
     height.  Radii along its length read off "Park Patriot 02/03", the Kaliningrad photograph and
     "part5-24/-26": a rounded front end and a top hood behind the cab, the forward body, the wider joint band with
     its ladder, the after body, and the big rounded rear cover with its hoop, side bosses and the louvred lid on top. */
  var PROF = [[2.40, 0.02], [2.43, 0.30], [2.52, 0.52], [2.68, 0.66], [2.95, 0.75], [3.40, 0.79], [7.20, 0.80], [7.24, 0.90],
              [7.58, 0.90], [7.62, 0.88], [11.30, 0.92], [11.70, 0.92], [11.95, 0.86], [12.12, 0.74], [12.24, 0.52],
              [12.29, 0.28], [12.30, 0.02]];
  function L(d) { return d - TRD; }
  var ZC = CZ - TRZ;
  function rAt(d) {
    var i, a, b;
    for (i = 0; i < PROF.length - 1; i++) {
      a = PROF[i]; b = PROF[i + 1];
      if (d >= a[0] && d <= b[0]) return a[1] + (b[1] - a[1]) * (d - a[0]) / (b[0] - a[0]);
    }
    return 0;
  }
  function addContainer(B) {
    var s, k, d, y, z, a, r, q, prev;
    revolve(B.paint, PROF.map(function (p) { return [L(p[0]), p[1]]; }), 0, ZC, 20);
    /* strap rings */
    [5.20, 7.27, 7.55, 9.60, 11.25].forEach(function (d) {
      r = rAt(d) + 0.018;
      cyl(B.dark, [L(d) - 0.03, 0, ZC], [L(d) + 0.03, 0, ZC], r, r, 20, true, true);
    });
    /* the hood on top of the front end */
    profY(B.paint, [[L(2.58), ZC + 0.50], [L(3.65), ZC + 0.50], [L(3.65), ZC + 1.02], [L(3.10), ZC + 1.02], [L(2.62), ZC + 0.74]], -0.46, 0.46);
    box(B.dark, L(3.62), L(3.12), -0.47, 0.47, ZC + 0.96, ZC + 1.00);
    /* the walkway grilles on top with their rails */
    [[3.80, 6.90], [8.05, 10.70]].forEach(function (w) {
      z = ZC + rAt(w[0] + 0.5) + 0.02;
      box(B.dark, L(w[0]), L(w[1]), -0.30, 0.30, z, z + 0.05);
      for (k = 0; k * 0.22 < w[1] - w[0]; k++) box(B.paint, L(w[0] + k * 0.22), L(w[0] + k * 0.22 + 0.05), -0.30, 0.30, z + 0.05, z + 0.07);
      for (s = -1; s <= 1; s += 2) {
        bar(B.dark, [L(w[0]), s * 0.38, z + 0.22], [L(w[1]), s * 0.38, z + 0.22], 0.035);
        for (d = w[0]; d <= w[1] + 0.01; d += (w[1] - w[0]) / 4) bar(B.dark, [L(d), s * 0.36, z - 0.03], [L(d), s * 0.38, z + 0.23], 0.03);
      }
    });
    /* the ladder over the joint band, one each side ("Park Patriot 02" starboard, "-03" and Kaliningrad port) */
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (k = 0; k <= 6; k++) {
        a = (-35 + k * 20) * Math.PI / 180;
        q = [s * Math.cos(a) * 0.97, ZC + Math.sin(a) * 0.97];
        if (prev) { bar(B.dark, [L(7.25), prev[0], prev[1]], [L(7.25), q[0], q[1]], 0.035); bar(B.dark, [L(7.62), prev[0], prev[1]], [L(7.62), q[0], q[1]], 0.035); }
        bar(B.dark, [L(7.25), q[0], q[1]], [L(7.62), q[0], q[1]], 0.03);
        prev = q;
      }
    }
    /* the rear cover: side bosses, the hoop over the top, a pipe forward along each side, the centre fitting */
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, L(11.72), s * 0.90, s * 1.03, ZC, 0.13, 12);
      bar(B.dark, [L(11.72), s * 1.00, ZC + 0.05], [L(11.98), s * 0.86, ZC + 0.50], 0.06);
      bar(B.dark, [L(11.98), s * 0.86, ZC + 0.50], [L(12.12), s * 0.52, ZC + 0.76], 0.06);
      bar(B.dark, [L(12.12), s * 0.52, ZC + 0.76], [L(12.17), 0, ZC + 0.84], 0.06);
      bar(B.dark, [L(11.62), s * 0.98, ZC + 0.12], [L(10.55), s * 0.97, ZC + 0.12], 0.07);
      cylY(B.dark, L(10.20), s * 0.86, s * 0.98, ZC - 0.35, 0.10, 8);
    }
    cylX(B.dark, L(12.20), L(12.27), 0, ZC - 0.20, 0.07, 8);
    /* the louvred lid on top of the rear cover: a flat plate, its rear part drooping with the dome */
    profY(B.paint, [[L(10.80), ZC + 0.88], [L(11.95), ZC + 0.88], [L(11.95), ZC + 1.08], [L(10.88), ZC + 1.08], [L(10.80), ZC + 1.00]], -0.62, 0.62);
    profY(B.paint, [[L(11.95), ZC + 0.88], [L(12.18), ZC + 0.62], [L(12.18), ZC + 0.74], [L(11.95), ZC + 1.08]], -0.62, 0.62);
    for (k = 0; k < 8; k++) box(B.dark, L(10.98 + k * 0.11), L(11.03 + k * 0.11), -0.55, 0.55, ZC + 1.08, ZC + 1.10);
    /* the trunnion stubs into the pillars, the ram lugs under the body */
    for (s = -1; s <= 1; s += 2) cylY(B.dark, 0, s * 0.70, s * 0.88, 0, 0.11, 10);
    box(B.dark, L(6.20), L(6.60), -0.25, 0.25, ZC - 0.86, ZC - 0.70);
  }

  function bins(T, all) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (all) { b.glass = new Bin(T.glass, false); b.lamp = new Bin(T.lamp, false); b.team = new Bin(T.team, false); }
    return b;
  }

  function build(THREE, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T, true), i, wg, geo, TB, PB, pk, E;
    addCab(HB);
    addChassis(HB);
    flush(THREE, g, HB);
    /* four turning axle groups: a tyre each side (one mesh per axle, lugs a phase apart) */
    for (i = 0; i < AXD.length; i++) {
      TB = new Bin(T.tyre, false);
      tyre(TB, 0, -TYT, 0, 0, TB, RT / 0.75, 0.80);
      tyre(TB, 0, TYT, 0, 0.5, TB, RT / 0.75, 0.80);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(X(AXD[i]), 0, RT);
      wg.add(new THREE.Mesh(geo, T.tyre));
      g.add(wg);
    }
    /* the container: a carrier turned end for end at the trunnion (so the elevating group's +x runs aft and the
       mouth at the rear cover rises when render3d turns it by -el), the container inside "podelev" */
    PB = bins(T, false);
    addContainer(PB);
    pk = new THREE.Group();
    pk.position.set(X(TRD), 0, TRZ);
    pk.rotation.z = Math.PI;
    E = new THREE.Group();
    E.name = "podelev";
    flush(THREE, E, PB);
    E.userData.el = EL;
    E.userData.cells = [[L(CR), 0, ZC, L(CF)]];
    pk.add(E);
    g.add(pk);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the bumper face to the apex of the container's rear cover */
UNIT_MODELS["pact_e60_coastssm"] = { len: 12.30, build: function (THREE, M, C) { return HeroRedut.build(THREE, C); } };
