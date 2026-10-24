/* ============ ru_rubezh.js - HERO model: the 4K51 Rubezh coastal missile system's 3S51 launcher on the MAZ-543 ============
   One row (js/eras.js, coastssm, turret:false, deploy:true, rounds 2, e80-e90): pact_e80_coastssm "4K51 Rubezh (SSC-3
   Styx), 3S51 launcher on the MAZ-543".  ru.wikipedia ("Rubezh (beregovoy raketny kompleks)") calls the launcher 3S51
   (3S51M on the MAZ-543M from the early 1980s); the German museum captions on Commons write 3P51 / 3P51M.

   Recognition list, each with the photograph it rests on (Wikimedia Commons, cached in the scratchpad q_rubezh_ref):
     1. ONE cab, on the LEFT of the front, with a big single windscreen and two side windows; the radiator grille of
        vertical bars runs from it across the rest of the front ("ParkPatriot2015part5-17", "3S51 ... Park Patriot 01").
     2. The raised equipment box at the right front corner with three vent slots low on its side ("Park Patriot 01").
     3. The tall air-intake pipe at the cab's right rear and the caged roof lamp ("part5-17", "Park Patriot 01").
     4. The heavy bumper with the coiled tow cable, round headlamps either end of the grille ("part5-17").
     5. The Garpun antenna folded down over the engine: a flat box about 2.3 m wide with toothed (slotted) top and
        bottom edges, its face forward and tilted up, the mast lying forward over it with a head bracket over the cab
        ("Park Patriot 01", "-02", "part5-17").
     6. The tall operations cabin behind the cab, the full width of the vehicle and as high as the containers, a
        louvred gas-turbine bay at its front under the folded antenna, a fan grille high at its rear corners, a door and
        a round hatch on its side ("Park Patriot 02", "-01"; ru.wikipedia: control cabin, gas-turbine power unit).
     7. The two KT-161 containers side by side on a turntable over the rear axles, pointing AFT, wider than the chassis:
        a hard upper shell with rounded top edges over a corrugated lower part that tapers in, the rear ends closed by
        big faceted covers ("Park Patriot 02", "-03", "-04"; "BRK Rubezh (2)": the cover lifts as a visor).
     8. The walkway rail along the top of the pack, its ends rising ("Park Patriot 02", "-03", "-04").
     9. Eight big tyres in two pairs, the long gap between the second and third axles (MAZ-543; all side photographs).
    10. Set up: the antenna raised on its mast ahead of the cabin, far above everything; the containers raised for the
        shot ("BRK Rubezh (1)", "Romanian 4K51 Rubezh missile launch", the Black Sea Fleet launch photograph).
    11. The rear jacks with box pads at the rear corners ("Park Patriot 02", "-03", "-04", shown down).
    12. Plain Soviet olive green; the museum's tactical number "124", the guards badge, the Romanian and Pacific Fleet
        camouflage are NOT drawn.

   Station table (metres back from the bumper face), scaled off "Park Patriot 02" (side on, axle spacing 151.5 / 226 /
   152.5 px against the MAZ-543's published 2.20 / 3.30 / 2.20 m: 69 px a metre):
       0.00 bumper face        0.25 grille / front face   0.30-2.05 cab (left)      0.25-2.20 right front box
       2.51 axle 1             2.57-3.36 gas-turbine bay   2.95 antenna (folded) / mast (raised)
       3.36-6.77 operations cabin                          4.71 axle 2               5.75-7.05 side boxes
       6.98 container front end (the pack's trunnion)     8.01 axle 3               9.10 turntable centre
      10.21 axle 4            11.55 rear jacks            11.95 frame end           13.28 container covers (rear end)
     Heights: cab roof 2.95, engine hood 2.25, cabin and container tops 3.86, walkway rail 4.35, container bottoms
     1.85, the shell / corrugation joint 2.50, tyres 1.40 m (the photograph: 92-97 px).
   Published: P-15M 6.565 m long (ru.wikipedia) - the containers measure 6.3 m to the cover apex off the photograph,
     drawn as measured; the antenna raised to 7.3 m (drawn as its centre height); launch elevation up to 20 degrees
     (userData.el); the pack turns +-110 degrees either side of the stern (NOT drawn, below). No published length of
     the 3S51 was found: 13.28 m is measured off the photograph on the published wheelbase.
   TURNTABLE NOT SHOWN: the row is turret:false, so the pack is drawn laid fore-and-aft with its mouths aft, as on the
     march, and only elevates (podelev); the real pack turns on its platform to a side before it rises (ru.wikipedia),
     so the real launcher never fires over its cab. The game turns the hull's nose to the target: the round leaves
     the pod mouths aft and render3d pulls it onto its path over LAUNCH_JOIN.
   Elevation hinge: the pack is hinged high at its front end (not confirmed; the photographs never show it raised
     fore-and-aft), so at 20 degrees its top front edge stays clear of the cabin.
   Poses (render3d finds them by name, shows one from e.deployed): "travelpose" = antenna folded over the engine, mast
     lying forward, rear jacks up (the march pose is not photographed with the jacks; drawn up under their
     housings); "deploypose" = mast up ahead of the cabin with the antenna at 7.3 m and its brace, jacks down.  How the
     mast unfolds or telescopes is not shown in any photograph and is not drawn.  "podelev" = the two containers and
     the rail, inside a carrier turned end for end at the trunnion; userData.cells puts the round at each mouth.
     Four "roadwheel" axle groups (a tyre each side).  Nothing is named "turret".
   NOT confirmed and not drawn: the cover opening at launch, the reload vehicle, the whip antenna's full height (a
     2 m stub is drawn, as ru_iskander.js does), the cab interior, any marking.
   Paint: sampled off "Park Patriot 02" (overcast side, 87,86,66), taken to about 0.9: base #4d4f3a.
   Materials (6): paint (canvas texture), dark, glass, tyre, lamp, C.team (up-facing strips on the cab and cabin roofs).
   +X nose, +Y left (port), +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRubezh = (function () {
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
  /* every station is given in metres BACK from the bumper face (the header's table); X() turns it into model x */
  var XF = 6.64;
  function X(d) { return XF - d; }
  var AXD = [2.51, 4.71, 8.01, 10.21];                      /* axles: the MAZ-543's 2.20 / 3.30 / 2.20 m */
  var RT = 0.70, TYT = 1.19;                                /* tyre radius (1.40 m off the photograph), half track */
  var HW = 1.52;                                            /* half width of the chassis bodywork (3.05 m) */
  var TRD = 6.98, TRZ = 3.30;                               /* the pack's trunnion: the containers' front end, high */
  var CY = 0.80, CHW = 0.78;                                /* container centre lines and half width (outer face 1.58) */
  var CL = 6.30;                                            /* container length to the cover's apex (6.98 -> 13.28) */
  var EL = 20 * Math.PI / 180;                              /* launch elevation: "up to 20 degrees" (ru.wikipedia) */
  var MZ = 7.30;                                            /* the Garpun antenna raised: 7.3 m (ru.wikipedia) */

  var PAINT = { base: "#4d4f3a", blots: ["#43452f", "#575a43", "#494b36"], seed: 4051 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2b2d28, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.12, metalness: 0.4 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1d1e1f, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xc98a2a, roughness: 0.4, metalness: 0.1, emissive: 0x2a1600 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* ------------------------------------------------------------- the cab */
  /* the MAZ-543M front: ONE cab on the left (y +0.32..+1.52), the engine and its full-width grille to its right, the
     raised equipment box at the right front corner ("ParkPatriot2015part5-17", "Park Patriot 01") */
  function addFront(B) {
    var s, k, y, x;
    /* lower front body across the full width, the grille face at d 0.25 */
    profY(B.paint, [[X(0.25), 1.15], [X(2.45), 1.15], [X(2.45), 2.05], [X(0.80), 2.25], [X(0.30), 2.18], [X(0.25), 2.05]], -HW, 0.32);
    /* the grille: vertical bars in a dark recess, the black guard frame over its left half */
    box(B.dark, X(0.27), X(0.24), -1.25, 0.25, 1.38, 2.05);
    for (k = 0; k < 22; k++) { y = -1.20 + k * 0.068; box(B.paint, X(0.25), X(0.23), y - 0.015, y + 0.015, 1.40, 2.03); }
    box(B.dark, X(0.23), X(0.19), -0.85, 0.20, 1.52, 1.56);
    box(B.dark, X(0.23), X(0.19), -0.85, 0.20, 1.86, 1.90);
    for (k = 0; k < 4; k++) { y = -0.80 + k * 0.33; box(B.dark, X(0.23), X(0.19), y - 0.03, y + 0.03, 1.52, 1.90); }
    /* the right front box over the first wheel: sloped top front, three vent slots low on its side */
    profY(B.paint, [[X(0.25), 1.15], [X(2.20), 1.15], [X(2.20), 2.48], [X(0.85), 2.48], [X(0.30), 2.20]], -HW, -0.78);
    for (k = 0; k < 3; k++) { x = X(0.75 + k * 0.24); box(B.dark, x - 0.08, x + 0.08, -HW - 0.015, -HW + 0.01, 1.30, 1.66); }
    box(B.dark, X(2.10), X(0.50), -HW - 0.015, -HW + 0.01, 1.98, 2.01);
    /* the cab: lower body and the glazed upper part, roof at 2.95 */
    loft(B.paint, [
      [[X(0.30), 0.32, 1.15], [X(0.30), 0.32, 2.15], [X(0.30), HW, 2.15], [X(0.30), HW, 1.15]],
      [[X(2.05), 0.32, 1.15], [X(2.05), 0.32, 2.15], [X(2.05), HW, 2.15], [X(2.05), HW, 1.15]]], false);
    loft(B.paint, [
      [[X(0.36), 0.34, 2.15], [X(0.46), 0.36, 2.88], [X(0.52), 0.42, 2.95], [X(0.52), HW - 0.10, 2.95], [X(0.46), HW - 0.03, 2.88], [X(0.36), HW, 2.15]],
      [[X(2.05), 0.34, 2.15], [X(2.05), 0.36, 2.88], [X(2.05), 0.42, 2.95], [X(2.05), HW - 0.10, 2.95], [X(2.05), HW - 0.03, 2.88], [X(2.05), HW, 2.15]]], false);
    /* windscreen in its frame, wipers; two side windows and the door seam; the round lamp housings on the cab side */
    var P0 = [X(0.36), 0, 2.15], U = unit([-0.10, 0, 0.73]), W = [0, 1, 0], N = unit([0.73, 0, 0.10]);
    planeBox(B.dark, P0, U, W, N, 0.05, 0.68, 0.40, HW - 0.08, -0.03, 0.012);
    planeBox(B.glass, P0, U, W, N, 0.10, 0.63, 0.46, HW - 0.14, -0.01, 0.022);
    for (k = 0; k < 2; k++) bar(B.dark, [X(0.37), 0.62 + k * 0.50, 2.22], [X(0.42), 0.70 + k * 0.50, 2.55], 0.03);
    for (k = 0; k < 2; k++) {
      box(B.glass, X(1.10 + k * 0.55), X(0.70 + k * 0.55), HW - 0.01, HW + 0.02, 2.25, 2.75);
      box(B.dark, X(1.14 + k * 0.55), X(0.66 + k * 0.55), HW - 0.01, HW + 0.012, 2.20, 2.25);
    }
    box(B.dark, X(1.95), X(1.92), HW - 0.01, HW + 0.012, 1.25, 2.85);
    box(B.glass, X(0.62), X(0.48), HW - 0.01, HW + 0.03, 1.80, 2.05);                 /* the lamp housings on the cab side */
    /* cab roof: the tall air intake pipe at its right rear, the caged roof lamp, the team strip */
    cylZ(B.dark, X(1.85), 0.48, 2.95, 4.05, 0.10, 10);
    cyl(B.dark, [X(1.85), 0.48, 4.05], [X(1.85), 0.48, 4.18], 0.14, 0.10, 10);
    cylZ(B.dark, X(1.60), 0.82, 2.95, 3.10, 0.05, 6);
    cylX(B.dark, X(1.72), X(1.50), 0.82, 3.18, 0.11, 10);
    cylX(B.glass, X(1.50), X(1.49), 0.82, 3.18, 0.085, 10);
    box(B.team, X(1.55), X(0.95), 1.00, 1.30, 2.95, 2.965);
    /* bumper, headlamps either end of the grille, turn lamps, tow hooks and the coiled tow cable */
    box(B.dark, X(0.30), X(0.0), -HW, HW, 0.80, 1.15);
    for (s = -1; s <= 1; s += 2) {
      y = s > 0 ? 1.30 : -1.38;
      cylX(B.dark, X(0.30), X(0.20), y, 1.62, 0.13, 12);
      cylX(B.glass, X(0.21), X(0.19), y, 1.62, 0.10, 12);
      box(B.lamp, X(0.03), X(0.0), s * 1.25, s * 1.40, 0.95, 1.05);
      box(B.dark, X(0.06), X(0.0), s * 0.55 - 0.07, s * 0.55 + 0.07, 0.68, 0.80);
    }
    box(B.lamp, X(0.31), X(0.29), -1.10, -1.00, 1.60, 1.68);
    for (k = 0; k < 3; k++) cylY(B.dark, X(0.04), -0.90 + k * 0.10, 0.60 + k * 0.10, 1.05 - k * 0.04, 0.035, 6);
    /* front mudguards behind the wheel arch */
    for (s = -1; s <= 1; s += 2) box(B.paint, X(3.20), X(2.25), s * 0.90, s * HW, 1.42, 1.48);
  }

  /* ------------------------------------------------- the operations cabin */
  /* the box behind the cab: gas turbine bay (louvred) ahead under the folded antenna, the cabin proper behind, a fan
     grille high at each rear corner, a door and a round hatch on its side ("Park Patriot 02", "-01", part5-17) */
  function addCabin(B) {
    var s, k, x, y;
    box(B.paint, X(3.36), X(2.57), -HW, HW, 1.45, 2.85);
    profY(B.paint, [[X(6.77), 1.45], [X(3.36), 1.45], [X(3.36), 3.58], [X(3.55), 3.86], [X(6.77), 3.86]], -HW, HW);
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      for (k = 0; k < 9; k++) box(B.dark, X(3.28), X(2.66), y - s * 0.01, y + s * 0.02, 1.65 + k * 0.12, 1.69 + k * 0.12);
      box(B.dark, X(3.38), X(3.34), y - s * 0.01, y + s * 0.015, 1.47, 3.56);                 /* the bay's rear seam */
      /* fan grille, a square with its cross */
      box(B.dark, X(6.62), X(6.12), y - s * 0.01, y + s * 0.03, 3.30, 3.78);
      bar(B.paint, [X(6.60), y + s * 0.035, 3.32], [X(6.14), y + s * 0.035, 3.76], 0.03);
      bar(B.paint, [X(6.14), y + s * 0.035, 3.32], [X(6.60), y + s * 0.035, 3.76], 0.03);
      /* door outline and handle, a round hatch, the lower skirt seam, hinge strips */
      box(B.dark, X(4.95), X(4.91), y - s * 0.01, y + s * 0.015, 1.60, 3.40);
      box(B.dark, X(4.20), X(4.16), y - s * 0.01, y + s * 0.015, 1.60, 3.40);
      box(B.dark, X(4.95), X(4.16), y - s * 0.01, y + s * 0.015, 3.36, 3.40);
      box(B.dark, X(4.35), X(4.25), y - s * 0.01, y + s * 0.04, 2.40, 2.46);
      cylY(B.dark, X(5.45), y - s * 0.01, y + s * 0.015, 3.45, 0.24, 14);
      cylY(B.paint, X(5.45), y, y + s * 0.02, 3.45, 0.21, 14);
      box(B.dark, X(6.77), X(3.36), y - s * 0.01, y + s * 0.015, 1.62, 1.65);
      box(B.dark, X(6.70), X(6.66), y - s * 0.01, y + s * 0.015, 1.50, 3.80);
    }
    /* roof: the mast's base housing at the front, cable bundles, the whip antenna's base, team strip */
    box(B.paint, X(4.30), X(3.55), -0.55, 0.55, 3.86, 4.08);
    box(B.dark, X(4.25), X(3.60), -0.56, 0.56, 3.95, 3.98);
    for (k = 0; k < 3; k++) bar(B.dark, [X(4.30), -0.30 + k * 0.30, 4.06], [X(4.90), -0.40 + k * 0.30, 3.87], 0.06);
    cylZ(B.dark, X(5.95), -0.90, 3.86, 4.00, 0.07, 8);
    cylZ(B.dark, X(5.95), -0.90, 4.00, 5.86, 0.015, 4);
    box(B.team, X(6.40), X(5.20), 0.70, 1.05, 3.86, 3.875);
    box(B.team, X(6.40), X(5.20), -1.05, -0.70, 3.86, 3.875);
  }

  /* --------------------------------------------------------------- chassis */
  function addChassis(B) {
    var i, s, k, x;
    for (s = -1; s <= 1; s += 2) box(B.dark, X(11.95), X(0.30), s * 0.42, s * 0.60, 0.95, 1.40);
    for (k = 0; k < 7; k++) { x = X(0.6 + k * 1.85); box(B.dark, x - 0.06, x + 0.06, -0.60, 0.60, 1.00, 1.32); }
    for (i = 0; i < AXD.length; i++) {
      x = X(AXD[i]);
      cylY(B.dark, x, -0.95, 0.95, RT, 0.10, 8);
      cylY(B.dark, x, -0.30, 0.30, RT, 0.24, 10);
      for (s = -1; s <= 1; s += 2) box(B.dark, x - 0.40, x + 0.40, s * 0.60, s * 0.82, RT + 0.12, RT + 0.24);
    }
    /* between the second and third axles: the long side box (starboard) and the fuel tank (port), the step plates */
    box(B.paint, X(7.05), X(5.75), -1.50, -0.65, 0.45, 1.25);
    box(B.dark, X(6.45), X(6.41), -1.51, -1.49, 0.50, 1.20);
    box(B.dark, X(7.00), X(5.80), -1.51, -1.49, 1.05, 1.08);
    box(B.paint, X(7.05), X(5.75), 0.65, 1.50, 0.50, 1.25);
    for (k = 0; k < 2; k++) box(B.dark, X(6.10 + k * 0.65) - 0.04, X(6.10 + k * 0.65) + 0.04, 0.64, 1.52, 0.48, 1.27);
    /* ahead of the second axle on the starboard side, the battery box; exhaust under the cabin */
    box(B.paint, X(3.95), X(3.30), -1.48, -0.80, 0.70, 1.35);
    box(B.dark, X(3.90), X(3.35), -1.49, -1.47, 1.20, 1.23);
    cylX(B.dark, X(7.30), X(5.60), -0.70, 1.30, 0.09, 8);
    /* the turntable base over the third axle: its column, the ring and the cradle the pack lies on */
    box(B.paint, X(9.80), X(7.20), -1.05, 1.05, 1.32, 1.58);
    cylZ(B.paint, X(9.10), 0, 1.58, 1.72, 1.15, 24);
    cylZ(B.dark, X(9.10), 0, 1.72, 1.76, 1.05, 24);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(12.0), X(7.20), s * 0.80, s * 1.40, 1.25, 1.36);                  /* side sills to the rear end */
      box(B.dark, X(11.70), X(11.40), s * 1.20, s * 1.42, 1.00, 1.60);                /* jack housings at the rear */
      box(B.paint, X(11.35), X(8.80), s * 0.90, s * 1.45, 1.46, 1.50);               /* rear mudguards */
      box(B.dark, X(11.35), X(11.29), s * 0.92, s * 1.40, 0.75, 1.46);
      box(B.lamp, X(12.02), X(11.98), s * 1.00, s * 1.25, 1.10, 1.22);
    }
    box(B.dark, X(12.02), X(11.85), -1.30, 1.30, 0.95, 1.30);                         /* rear cross beam */
  }

  /* ---------------------------------------------------------- the pack */
  /* the two KT-161 containers in the elevating group's frame: +x AFT from the trunnion at their front end, z from the
     trunnion height.  Section from "Park Patriot 04" (rear) and "-02" (side): a hard upper shell with rounded top
     edges, a corrugated lower part tapering in, the faceted cover at the rear end bulged out; the walkway rail on top. */
  var SEC = [[0.30, 1.85], [0.55, 1.92], [0.70, 2.06], [0.77, 2.26], [0.78, 2.50], [0.78, 3.50], [0.755, 3.67], [0.68, 3.79], [0.50, 3.86]];
  function ring(x, yc, k, zc) {
    var r = [], i, p, n = SEC.length;
    for (i = 0; i < n; i++) { p = SEC[i]; r.push([x, yc + p[0] * k, zc + (p[1] - zc) * k - TRZ]); }
    for (i = n - 1; i >= 0; i--) { p = SEC[i]; r.push([x, yc - p[0] * k, zc + (p[1] - zc) * k - TRZ]); }
    return r;
  }
  function addPack(B) {
    var c, yc, k, x, s, zc = 2.86, y, z;
    for (c = -1; c <= 1; c += 2) {
      yc = c * CY;
      loft(B.paint, [ring(0.0, yc, 0.90, zc), ring(0.14, yc, 1.0, zc), ring(5.95, yc, 1.0, zc), ring(6.02, yc, 1.02, zc),
                     ring(6.12, yc, 0.92, zc), ring(CL, yc, 0.50, zc)], false);
      /* the corrugation of the rounded lower part, on the outer face (the inner faces are hidden by the pair) */
      for (k = 0; k < 24; k++) {
        x = 0.35 + k * 0.24;
        bar(B.paint, [x, yc + c * 0.57, 1.935 - TRZ], [x, yc + c * 0.74, 2.10 - TRZ], 0.08);
        bar(B.paint, [x, yc + c * 0.74, 2.10 - TRZ], [x, yc + c * 0.79, 2.46 - TRZ], 0.08);
      }
      for (s = -1; s <= 1; s += 2) {
        /* the strake along the joint of the shell and the corrugated part, and the cover's hinge line */
        box(B.dark, 0.20, 5.95, yc + s * 0.77, yc + s * 0.80, 2.48 - TRZ, 2.54 - TRZ);
        box(B.dark, 5.95, 6.03, yc + s * 0.70, yc + s * 0.80, 2.00 - TRZ, 3.70 - TRZ);
      }
      /* the cover's fold lines (the faceted lid), two hatches on the outer face */
      z = zc - TRZ;
      bar(B.dark, [6.13, yc - 0.70, 3.80 - TRZ], [CL - 0.02, yc, z + 0.10], 0.03);
      bar(B.dark, [6.13, yc + 0.70, 3.80 - TRZ], [CL - 0.02, yc, z + 0.10], 0.03);
      bar(B.dark, [6.13, yc, 1.92 - TRZ], [CL - 0.02, yc, z - 0.20], 0.03);
      y = yc + c * 0.79;
      box(B.dark, 1.10, 1.55, y - 0.01, y + c * 0.012, 3.30 - TRZ, 3.62 - TRZ);
      box(B.dark, 2.10, 2.70, y - 0.01, y + c * 0.012, 3.30 - TRZ, 3.62 - TRZ);
      /* the front end's frame ring */
      box(B.dark, 0.10, 0.18, yc - 0.80, yc + 0.80, 2.40 - TRZ, 2.46 - TRZ);
    }
    /* the cradle under the pack: two beams and the trunnion block at the front */
    for (s = -1; s <= 1; s += 2) box(B.dark, 0.05, 5.60, s * 0.30, s * 0.55, 1.68 - TRZ, 1.86 - TRZ);
    box(B.dark, 0.0, 0.35, -1.10, 1.10, 1.68 - TRZ, 2.10 - TRZ);
    /* the walkway rail on top: two rails with uprights, the ends rising */
    z = 3.86 - TRZ;
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.42;
      bar(B.dark, [0.45, y, z + 0.48], [5.45, y, z + 0.48], 0.04);
      bar(B.dark, [0.45, y, z + 0.24], [5.45, y, z + 0.24], 0.03);
      bar(B.dark, [0.45, y, z + 0.48], [0.05, y + s * 0.10, z + 0.60], 0.04);
      bar(B.dark, [5.45, y, z + 0.48], [6.00, y + s * 0.10, z + 0.62], 0.04);
      for (k = 0; k < 8; k++) { x = 0.55 + k * 0.70; bar(B.dark, [x, y, z], [x, y, z + 0.50], 0.035); }
    }
  }

  /* ------------------------------------------------- the Garpun antenna */
  /* a flat antenna box with the toothed (slotted) top and bottom edges, in its own frame: face toward +x, width along y,
     height along z, centred on the origin */
  var AW = 2.30, AH = 0.80, AD = 0.30;
  function addAntenna(B, P0, U, W, N) {
    var k, y;
    planeBox(B.paint, P0, U, W, N, -AH / 2, AH / 2, -AW / 2, AW / 2, -AD, 0);
    planeBox(B.dark, P0, U, W, N, -0.03, 0.03, -AW / 2 + 0.06, AW / 2 - 0.06, -0.01, 0.012);
    for (k = 0; k < 24; k++) {
      y = -AW / 2 + 0.06 + k * (AW - 0.12) / 23;
      planeBox(B.dark, P0, U, W, N, AH / 2, AH / 2 + 0.09, y - 0.03, y + 0.03, -AD + 0.04, -0.04);
      planeBox(B.dark, P0, U, W, N, -AH / 2 - 0.09, -AH / 2, y - 0.03, y + 0.03, -AD + 0.04, -0.04);
    }
    /* the feed box on the back */
    planeBox(B.dark, P0, U, W, N, -0.18, 0.18, -0.30, 0.30, -AD - 0.22, -AD);
  }

  /* levelling jacks at the rear corners: stowed, the pad drawn up under the housing; down, the leg and the pad on the
     ground ("Park Patriot 02/03/04" show them down) */
  function addJacks(B, down) {
    var s, x = X(11.55), y;
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.31;
      if (down) {
        cylZ(B.dark, x, y, 0.12, 1.05, 0.07, 8);
        box(B.dark, x - 0.24, x + 0.24, y - 0.20, y + 0.20, 0.0, 0.12);
        bar(B.dark, [x, y, 0.85], [x + 0.20, y, 0.14], 0.04);
      } else {
        cylZ(B.dark, x, y, 0.80, 1.05, 0.07, 8);
        box(B.dark, x - 0.24, x + 0.24, y - 0.20, y + 0.20, 0.70, 0.82);
      }
    }
  }

  function bins(T, all) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (all) { b.glass = new Bin(T.glass, false); b.lamp = new Bin(T.lamp, false); b.team = new Bin(T.team, false); }
    return b;
  }

  function build(THREE, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T, true), i, wg, geo, TB, TV, DP, PB, trv, dep, pk, E, x;
    addFront(HB);
    addCabin(HB);
    addChassis(HB);
    flush(THREE, g, HB);
    /* four turning axle groups outside both poses: a tyre each side (one mesh per axle, lugs a phase apart) */
    for (i = 0; i < AXD.length; i++) {
      TB = new Bin(T.tyre, false);
      tyre(TB, 0, -TYT, 0, 0, TB, RT / 0.75, 1.0);
      tyre(TB, 0, TYT, 0, 0.5, TB, RT / 0.75, 1.0);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(X(AXD[i]), 0, RT);
      wg.add(new THREE.Mesh(geo, T.tyre));
      g.add(wg);
    }
    /* on the march: the antenna folded down over the engine, its face up and forward, the mast lying forward over it
       with its head bracket over the cab ("Park Patriot 01/02", part5-17); jacks up */
    TV = bins(T, false);
    addAntenna(TV, [X(2.85), -0.15, 3.32], unit([-0.44, 0, 0.90]), [0, 1, 0], unit([0.90, 0, 0.44]));
    box(TV.paint, X(3.60), X(1.45), -0.12, 0.12, 3.62, 3.86);                         /* the mast, folded forward */
    profY(TV.paint, [[X(1.70), 3.40], [X(1.30), 3.40], [X(1.20), 3.62], [X(1.30), 3.86], [X(1.70), 3.86]], -0.22, 0.22);
    bar(TV.dark, [X(3.40), 0, 3.70], [X(2.60), -0.15, 3.55], 0.10);
    bar(TV.dark, [X(1.50), 0.18, 3.62], [X(2.55), 0.18, 3.95], 0.06);
    addJacks(TV, false);
    trv = new THREE.Group(); trv.name = "travelpose";
    flush(THREE, trv, TV);
    /* set up: the mast stood up ahead of the cabin with the antenna at 7.3 m, its brace from the cabin roof; jacks
       down ("BRK Rubezh (1)", the Black Sea Fleet launch photograph) */
    DP = bins(T, false);
    x = X(2.95);
    box(DP.paint, x - 0.14, x + 0.14, -0.14, 0.14, 2.85, MZ - 0.55);
    box(DP.dark, x - 0.18, x + 0.18, -0.18, 0.18, 2.85, 3.10);
    box(DP.paint, x - 0.22, x + 0.22, -0.20, 0.20, MZ - 0.62, MZ - 0.45);
    bar(DP.dark, [X(3.75), 0.25, 4.05], [x - 0.12, 0.10, 5.45], 0.08);
    bar(DP.dark, [X(3.75), -0.25, 4.05], [x - 0.12, -0.10, 5.45], 0.08);
    addAntenna(DP, [x + 0.30, 0, MZ], unit([-0.17, 0, 0.98]), [0, 1, 0], unit([0.98, 0, 0.17]));
    addJacks(DP, true);
    dep = new THREE.Group(); dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    g.add(trv); g.add(dep);
    /* the pack: a carrier turned end for end at the trunnion (so the elevating group's +x runs aft and the pod
       mouths rise when render3d turns it by -el), the containers inside "podelev" */
    PB = bins(T, false);
    addPack(PB);
    pk = new THREE.Group();
    pk.position.set(X(TRD), 0, TRZ);
    pk.rotation.z = Math.PI;
    E = new THREE.Group();
    E.name = "podelev";
    flush(THREE, E, PB);
    E.userData.el = EL;
    E.userData.cells = [[CL, CY, 2.86 - TRZ, 0.40], [CL, -CY, 2.86 - TRZ, 0.40]];
    pk.add(E);
    g.add(pk);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the bumper face to the container covers at the rear */
UNIT_MODELS["pact_e80_coastssm"] = { len: 13.28, build: function (THREE, M, C) { return HeroRubezh.build(THREE, C); } };
