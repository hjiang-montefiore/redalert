/* ============ ru_sopka.js - HERO model: the S-2 Sopka coastal missile system's B-163 launcher and its AT-S tractor ============
   One row (js/eras.js, coastssm, turret:false, deploy:true, rounds 1, e50-e60): pact_e50_coastssm "S-2 Sopka (SSC-2b
   Samlet), B-163 towed launcher".  ru.wikipedia ("Sopka (beregovoy raketny kompleks)"): the B-163 (KB of the
   Bolshevik plant) is a TWO-AXLE TRAILER towed by the AT-S artillery tractor; its guide beam lies at 0 degrees on the
   march and +10 in the firing position and is trained in azimuth by an electric motor (a hand drive in reserve); it
   is reloaded from a PR-15 semi-trailer docked to it; the missiles travel on PR-15s behind ZiL-157V tractors.  The
   S-2 is the KS-1 Kometa air-to-ship missile with an SPRD-15 solid booster.

   Recognition list, each with the photograph it rests on (Wikimedia Commons, cached in the scratchpad q_sopka_ref):
     1. The S-2 itself: a MiG-15-like winged airframe, a fat cylinder with a nose intake ring and a radome bullet
        standing proud in the upper half of the intake ("J20 542 Seezielflugkoerper Mikojan S 2", "S-2 Sopka Gdansk
        2026 01", "Samolet-snaryad ... (v fas)").
     2. Mid-set wings swept about 55 degrees, a slight droop, a fence across each ("J20 542", "Gdansk 2026 01").
     3. The swept fin with its long dorsal fillet, the swept tailplane set a third up it and trailing past the tail
        ("Sopka (4K87) im MHM in Dresden", "J20 542").
     4. The black SPRD-15 booster under the rear fuselage, its big nozzle canted down and out past the jet pipe
        ("Gdansk 2026 03", "Dresden").
     5. The long, deep box-girder launch beam, the missile riding on its top, rounded access covers down its sides,
        a lip and a row of small holes along its top edges ("Varna 2017 132", "Gdansk 2026 02", "Dresden").
     6. The big faceted box under the beam's launch end, wider than the beam ("Varna 2017 132", "Gdansk 2026 02",
        "Skarzysko S-2 Sopka 01", "S-2 Sopka Bulgarian Navy Museum").
     7. The equipment case on the left side under the beam: two X-braced doors on a louvred base with a sloped
        front, the column behind it ("Dresden", "Varna 2017 132", "Gdansk 2026 02").
     8. Two axles on DUAL tyres, wide apart (6.9 m), with mudguards ("Varna 2017 132", "Gdansk 2026 02", "Dresden").
     9. The A-frame drawbar at the missile's TAIL end: the launch end is the trailer's rear ("Dresden": the drawbar
        resting on the ground at the left, the nose and the beam's launch end at the right).
    10. Set up: the screw jacks on round pads at the four corners, swung out ("Gdansk 2026 02", "Varna 2017 132",
        "Skarzysko 01"); the beam raised, its launch end up ("Samolet-snaryad ... (v profil)", all museum launchers).
    11. On the march: behind the AT-S - a tall flat front plate with a barred grille and two caged lamps at its top
        corners, a full-width cab, a short stake-sided body, small road wheels ("Artillery tractor AT-S", "AT-S
        towing a field gun side").
    12. Plain Soviet olive green on the launcher and tractor, the missile left in its light metal grey; the Polish,
        Bulgarian and East German museum markings and tactical numbers are NOT drawn.

   Station table (metres BACK from the drawbar eye), scaled off "Dresden" (side on, level, the missile 8.29 m =
   662 px: 80 px a metre; checked against the missile's 1.20 m body = 95 px). "Dresden" is cut at the frame edge at
   11.73 m; the beam's run past the missile's nose, 3.07 m, is taken off "Samolet-snaryad ... (v profil)", where the
   beam is trained square to the camera (its trailer, seen end on, shows its two axles close together):
       0.00 drawbar eye (on the AT-S's hook; the hook 6.04 m behind the tractor's nose)
       1.00 beam front end      1.15 missile tail (fin tip 1.06)   2.85 front axle (duals, tyres about 1.20 m)
       3.20 end of the booster trough at the beam's front           3.90 trunnion (beam lower edge) / front jacks
       5.05-8.05 equipment case base, 5.19-6.69 its door case        6.30 turntable centre    7.75 column
       9.40 missile nose (radome tip)   9.71 rear axle   10.55 rear jacks   10.60-12.45 the faceted end box
      12.45 beam launch end
     Heights: frame 0.82-1.14, turntable 1.14-1.30, carriage platform 1.52, beam 1.94-3.09, missile axis 3.69, fin tip
     5.19, door case top 2.62, end box down to 1.14 (the photographs show it hanging well below the beam).
   Published: KS-1 8.29 m long, 1.20 m body, 4.77 m span (en.wikipedia "Raduga KS-1 Komet"), drawn to them (the
     radome tip counted in the length). The AT-S 5,870 x 2,570 x 2,533 mm (ru.wikipedia, as ru_s75_s125.js). No
     figure for the B-163 itself was found: 12.45 m eye to launch end is measured off the two photographs above.
     Drawn: the S-2 8.34 m from the fin tip to the radome tip (8.29 published), 4.77 m span, 1.20 m body.
   len: the convoy on the march, the AT-S's nose to the beam's launch end, 18.49 m (measured off the build). Set up,
     the tractor is gone, so the set-up launcher stands inside the march length.
   TURNTABLE NOT SHOWN: the row is turret:false, so the beam is drawn laid fore-and-aft with its launch end aft, as on
     the march, and only elevates (podelev). The real beam trains on the upper carriage's turntable by its electric
     drive (ru.wikipedia gives no sector for one launcher; each battalion covered +-85 degrees). The launch end is the
     trailer's rear (item 9), so the row declares fireAft: entities.js turns the trailer's tail to the ship.
   Elevation hinge: at the beam's lower edge in its front third (NOT confirmed; the museum launchers show the front
     end dropping and the launch end rising, so the hinge is not at either end).
   Poses (render3d finds them by name, shows one from e.deployed): "travelpose" = the AT-S hitched, the drawbar on its
     hook, jacks stowed up beside the frame, the beam level and EMPTY (the rounds rode the PR-15s); "deploypose" = no
     tractor, the drawbar down on the ground, the four jacks swung out and down on their pads, and the beam with the
     S-2 on it inside "podelev" (a carrier turned end for end at the trunnion, so render3d's -el lifts the launch
     end); userData.cells starts the round where it sits, nose at the mouth.  Two "roadwheel" axle groups (the
     duals); the AT-S's running gear is merged in the travel pose (it does not turn).  Nothing is named "turret".
   NOT confirmed and not drawn: the far (right) side's equipment (no photograph shows it squarely), the loading
     mechanism and the PR-15, any cables, the launch-time cover or plugs, the travel lock, the ventral strake under the
     booster, the AT-S's cargo tilt, any marking.
   Paint: launcher sampled off "Gdansk 2026 02" in shade (89,97,74 / 85,91,72), taken to about 0.9: base #555a3c;
     the missile off "J20 542" overcast (165,164,159), taken to about 0.75: #7e7f7b, metallic; the booster dark.
   Materials (6): paint (canvas texture), dark, glass, tyre, missile grey, C.team (one strip on the door case top and
     one on the AT-S roof).
   +X the tractor's nose (the march direction), +Y left (port), +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSopka = (function () {
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
  /* canvas paint: one flat coat of Soviet green gone patchy with weather, rain streaks down the faces and faint
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
  /* trailer stations are metres BACK from the drawbar eye (the header's table); X() turns one into model x.
     The eye sits on the AT-S's towing hook, 6.04 m behind the tractor's nose; the convoy is centred on x = 0. */
  var XT = 3.205;
  function X(d) { return XT - d; }
  var XN = XT + 6.04;                                       /* the AT-S's nose */
  var AXD = [2.85, 9.71];                                   /* the trailer's two axles (Dresden, side on) */
  var RT = 0.60, TY0 = 0.78, TY1 = 1.12;                    /* tyre radius (1.20 m), inner and outer tyre of a dual */
  var TRD = 3.90, TRZ = 1.94;                               /* the beam's trunnion: front third, at its lower edge */
  var BT = 1.15, BW = 0.50;                                 /* beam depth (1.94 -> 3.09 m) and half width */
  var UF = 1.00 - TRD, UR = 12.45 - TRD;                    /* beam ends along the beam, from the trunnion */
  var MZ = BT + 0.60;                                       /* the missile's axis above the trunnion (3.69 m) */
  var MT = 1.15 - TRD;                                      /* the missile's tail (d 1.15), along the beam */
  var ML = 8.29;                                            /* KS-1 length, radome tip to tail (en.wikipedia) */
  var EL = 10 * Math.PI / 180;                              /* "+10 degrees in the combat position" (ru.wikipedia) */

  var PAINT = { base: "#555a3c", blots: ["#4b5034", "#5f6446", "#50553a"], seed: 4087 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2b2d28, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.12, metalness: 0.4 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1d1e1f, roughness: 0.95, metalness: 0.02 });
    T.mis = new THREE.MeshStandardMaterial({ color: 0x7e7f7b, roughness: 0.42, metalness: 0.55 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, which) {
    var b = {}, i, k;
    for (i = 0; i < which.length; i++) { k = which[i]; b[k] = new Bin(T[k], k === "paint"); }
    return b;
  }

  /* a thin flat plate in the XZ plane (side profile pts [x, z]) standing at y, t thick */
  function plateY(bin, pts, y, t) { profY(bin, pts, y - t / 2, y + t / 2); }
  /* a thin surface in plan (pts [x, y] at height z), t thick: wings and tailplanes */
  function slab(bin, pts, z, t) { prism(bin, pts, z - t / 2, z + t / 2); }

  /* ---------------------------------------------------------- the S-2 missile
     drawn along +x in a frame with its tail at x = 0 and the nose at ML; axis on z = 0.
     KS-1 airframe: 8.29 m, 1.20 m body, 4.77 m span (en.wikipedia "Raduga KS-1 Komet"); the SPRD-15 solid booster
     under the rear fuselage (ru.wikipedia). Shapes off "Peenemuende J20 542" (side 3/4), "Gdansk 2026 01" (nose),
     "Gdansk 2026 03" (tail and booster from behind), "Dresden" (side on). */
  function missile(B, ox, oz) {
    var s, y, a, k;
    function P(x, z) { return [ox + x, oz + z]; }
    /* the body: intake lip, the long cylinder, the MiG-15-like taper to the jet pipe */
    revolve(B.mis, [[0.00, 0.36], [0.10, 0.40], [0.55, 0.46], [1.20, 0.53], [1.90, 0.58], [2.50, 0.60], [5.60, 0.60],
                    [6.80, 0.595], [7.40, 0.58], [7.75, 0.55], [7.92, 0.51], [7.98, 0.48]].map(function (p) {
                      return [ox + p[0], p[1]]; }), 0, oz, 22);
    /* the dark intake face and the jet pipe's mouth */
    cyl(B.dark, [ox + 7.90, 0, oz], [ox + 7.99, 0, oz], 0.44, 0.44, 18);
    cyl(B.dark, [ox - 0.02, 0, oz], [ox + 0.06, 0, oz], 0.32, 0.32, 16);
    /* the radome in the upper half of the intake, standing proud of the lip ("Gdansk 2026 01", "J20 542") */
    revolve(B.mis, [[7.70, 0.26], [7.98, 0.27], [8.10, 0.25], [8.20, 0.19], [8.26, 0.11], [ML, 0.02]].map(function (p) {
      return [ox + p[0], p[1]]; }), 0, oz + 0.16, 14);
    /* wings: mid-set, about 55 degrees of sweep, a slight droop; 4.77 m span */
    for (s = -1; s <= 1; s += 2) {
      a = -0.035;
      k = [[ox + 6.20, s * 0.50], [ox + 4.25, s * 0.50], [ox + 2.62, s * 2.385], [ox + 3.62, s * 2.385]];
      for (y = 0; y < 4; y++) k[y].push(oz - 0.02 + Math.abs(k[y][1]) * a);
      prismTilt(B.mis, k, 0.09, 0.04);
      /* the wing fence a third out ("J20 542": a raised fence across the chord) */
      box(B.mis, ox + 3.70, ox + 5.30, s * 1.10 - 0.012, s * 1.10 + 0.012, oz - 0.06, oz + 0.10);
    }
    /* fin with its dorsal fillet, measured off "Dresden": root 0.26..2.99, tip -0.05..0.95, 1.5 above the axis */
    plateY(B.mis, [P(0.26, 0.40), P(2.99, 0.58), P(1.70, 0.95), P(0.95, 1.50), P(-0.05, 1.50)], 0, 0.08);
    /* tailplane on the fin, a third up it, swept; its tips end just ahead of the jet pipe ("Dresden", side on) */
    for (s = -1; s <= 1; s += 2) {
      slab(B.mis, [[ox + 1.55, s * 0.03], [ox + 0.25, s * 0.03], [ox + 0.20, s * 1.12], [ox + 0.75, s * 1.12]], oz + 0.88, 0.05);
    }
    /* the SPRD-15 booster under the rear fuselage, its nozzle canted down and out past the tail ("Gdansk 2026 03") */
    var bA = [ox + 2.40, 0, oz - 0.76], bB = [ox + 0.05, 0, oz - 0.86], bC = [ox - 0.30, 0, oz - 0.88], bD = [ox - 0.65, 0, oz - 0.92];
    cyl(B.dark, [ox + 2.70, 0, oz - 0.72], bA, 0.12, 0.30, 14, false, true);
    cyl(B.dark, bA, bB, 0.30, 0.30, 14, true, true);
    cyl(B.dark, bB, bC, 0.30, 0.17, 14, true, true);
    cyl(B.dark, bC, bD, 0.17, 0.30, 14, true, false);
    /* its fairing to the fuselage and the launch shoes on the beam rails */
    box(B.mis, ox + 0.60, ox + 2.30, -0.10, 0.10, oz - 0.62, oz - 0.48);
    box(B.dark, ox + 2.60, ox + 2.95, -0.16, 0.16, oz - 0.66, oz - 0.56);
    box(B.dark, ox + 5.30, ox + 5.65, -0.16, 0.16, oz - 0.66, oz - 0.56);
  }
  /* a plan outline with a z per corner (wings with droop), t thick */
  function prismTilt(bin, pts, tr, tt) {
    var n = pts.length, V = [], F = [], i, k, h;
    for (i = 0; i < n; i++) { h = (i < 2 ? tr : tt) / 2; V.push([pts[i][0], pts[i][1], pts[i][2] - h]); }
    for (i = 0; i < n; i++) { h = (i < 2 ? tr : tt) / 2; V.push([pts[i][0], pts[i][1], pts[i][2] + h]); }
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }

  /* --------------------------------------------------------- the launch beam
     in the beam's own frame: u metres along it from the trunnion (positive toward the launch end, the trailer's
     rear), z above the trunnion. A deep box girder with rounded access covers down its sides and a lip along its
     top edges, a trough at its front end for the booster, and the big faceted box under its launch end
     ("Varna 2017 132", "Gdansk 2026 02", "Bulgarian Navy Museum", "Dresden") */
  function beam(B) {
    var s, i, u, c = [0.50, 1.50, 2.50, 3.50, 4.50, 5.50], uT = -0.20;
    /* the girder behind the trough, full depth */
    profY(B.paint, [[uT, 0], [UR - 0.45, 0], [UR, 0.55], [UR, BT], [uT, BT]], -BW, BW);
    /* the front end: lower box, its tip cut up, the side walls carried up beside the booster */
    profY(B.paint, [[UF + 0.30, 0.05], [uT, 0], [uT, 0.50], [UF, 0.50], [UF, 0.32]], -BW, BW);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, UF + 0.25, uT, s * BW - 0.07, s * BW, 0.50, BT - 0.10);
      /* the top lip along each edge, and a row of small holes under it (dark dots) */
      box(B.paint, UF + 0.25, UR - 0.05, s * (BW + 0.04) - 0.04, s * (BW + 0.04) + 0.04, BT - 0.05, BT + 0.03);
      for (i = 0; i < 18; i++) {
        u = uT + 0.35 + i * 0.42;
        if (u > UR - 0.6) break;
        box(B.dark, u - 0.04, u + 0.04, s * BW - 0.005, s * BW + 0.012, BT - 0.17, BT - 0.10);
      }
      /* rounded access covers, proud of the side */
      for (i = 0; i < c.length; i++) {
        oct(B.dark, c[i], s * BW, 0.56, 0.45, 0.41, s, 0.012);
        oct(B.paint, c[i], s * BW, 0.56, 0.42, 0.38, s, 0.024);
      }
      oct(B.dark, -1.15, s * BW, 0.30, 0.33, 0.21, s, 0.012);
      oct(B.paint, -1.15, s * BW, 0.30, 0.30, 0.18, s, 0.024);
      /* the lower flange */
      box(B.paint, uT, UR - 0.45, s * (BW + 0.03) - 0.03, s * (BW + 0.03) + 0.03, 0.0, 0.06);
    }
    /* the two rails on top, the missile's shoes ride them */
    for (s = -1; s <= 1; s += 2) box(B.dark, uT - 0.4, UR - 0.6, s * 0.16 - 0.05, s * 0.16 + 0.05, BT, BT + 0.07);
    /* the faceted box under the launch end, wider than the beam, its inner face sloped ("Varna 2017 132",
       "Gdansk 2026 02", "Bulgarian Navy Museum") */
    /* lofted: a top flush with the beam's, the sides flaring out to a ridge and back in to the bottom, the face toward
       the trunnion sloped down and aft */
    function ring(u, zt, zm, zb, wt, wm, wb) {
      return [[u, -wt, zt], [u, wt, zt], [u, wm, zm], [u, wb, zb], [u, -wb, zb], [u, -wm, zm]];
    }
    loft(B.paint, [ring(UR - 1.85, BT - 0.10, 0.62, 0.50, BW + 0.02, BW + 0.12, BW - 0.05),
                   ring(UR - 1.05, BT - 0.10, 0.10, -0.80, BW + 0.04, BW + 0.46, BW - 0.06),
                   ring(UR - 0.03, BT - 0.10, 0.10, -0.80, BW + 0.04, BW + 0.46, BW - 0.06)], false);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [UR - 1.85, s * (BW + 0.12), 0.62], [UR - 1.05, s * (BW + 0.46), 0.10], 0.035);
    /* the trunnion bosses */
    for (s = -1; s <= 1; s += 2) cylY(B.dark, 0, s * BW, s * (BW + 0.14), 0.0, 0.16, 12);
    /* the blast plate under the booster's nozzle at the front end */
    box(B.dark, UF - 0.02, UF + 0.70, -0.42, 0.42, 0.44, 0.50);
    /* the elevating ram's rod, from the beam's underside down into its cylinder (static part) */
    cyl(B.dark, [3.45, 0, 0.0], [3.10, 0, -0.55], 0.07, 0.07, 10);
    /* the upper half of the flat strut behind the door case, from the beam's underside ("Varna 2017 132") */
    planeBox(B.paint, [5.20, 0, 0.0], unit([-0.93, 0, -0.37]), [0, 1, 0], unit([0.37, 0, -0.93]), 0, 0.85, -BW - 0.30, -BW + 0.05, 0, 0.05);
  }
  /* a rounded-corner cover: an eight-sided plate on the beam side at u, height zc, half length a, half height b */
  function oct(bin, u, y, zc, a, b, s, t) {
    var pts = [], i, ang;
    for (i = 0; i < 8; i++) {
      ang = (i + 0.5) / 8 * TAU;
      pts.push([u + Math.cos(ang) * a / Math.cos(Math.PI / 8), zc + Math.sin(ang) * b / Math.cos(Math.PI / 8)]);
    }
    profY(bin, pts, s > 0 ? y : y - t, s > 0 ? y + t : y);
  }

  /* --------------------------------------------------- the trailer (static)
     two axles on duals, the long frame, the upper carriage on its turntable (the turntable the real launcher
     trains on; NOT turned here), the equipment box on the left side ("Dresden", "Varna 2017 132", "Gdansk 2026 02") */
  function trailer(B) {
    var s, i, x, d;
    /* frame rails from the front bogie to past the rear axle, cross members */
    for (s = -1; s <= 1; s += 2) box(B.paint, X(10.55), X(2.30), s * 0.46 - 0.09, s * 0.46 + 0.09, 0.82, 1.14);
    for (i = 0; i < 6; i++) { d = 2.6 + i * 1.6; box(B.paint, X(d) - 0.08, X(d) + 0.08, -0.46, 0.46, 0.86, 1.10); }
    /* the front bogie: fifth-wheel ring over the front axle, spring hangers */
    cylZ(B.dark, X(2.85), 0, 1.00, 1.14, 0.62, 18);
    for (i = 0; i < 2; i++) {
      x = X(AXD[i]);
      cylY(B.dark, x, -TY0 + 0.10, TY0 - 0.10, RT, 0.09, 10);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, x - 0.55, x + 0.55, s * 0.62 - 0.06, s * 0.62 + 0.06, RT + 0.10, RT + 0.22);
        box(B.dark, x - 0.06, x + 0.06, s * 0.62 - 0.05, s * 0.62 + 0.05, RT + 0.20, 0.86);
      }
    }
    /* the upper carriage: turntable ring and the platform over it */
    cylZ(B.dark, X(6.30), 0, 1.14, 1.30, 0.86, 22);
    box(B.paint, X(8.40), X(3.30), -0.78, 0.78, 1.30, 1.52);
    /* the trunnion cradles either side of the beam */
    for (s = -1; s <= 1; s += 2) {
      profY(B.paint, [[X(4.55), 1.52], [X(3.25), 1.52], [X(3.62), 2.10], [X(4.18), 2.10]], s * (BW + 0.15), s * (BW + 0.30));
      cylY(B.dark, X(TRD), s * (BW + 0.12), s * (BW + 0.34), TRZ, 0.14, 10);
    }
    /* the equipment box on the left: the X-braced double door case on a louvred base, sloped front ("Dresden",
       "Varna 2017 132") */
    profY(B.paint, [[X(5.10), 1.18], [X(8.25), 1.18], [X(8.25), 1.56], [X(5.10), 1.56]], BW + 0.05, 1.20);
    profY(B.paint, [[X(5.25), 1.56], [X(6.75), 1.56], [X(6.75), 2.62], [X(5.36), 2.62], [X(5.25), 2.48]], BW + 0.08, 1.15);
    profY(B.paint, [[X(6.75), 1.56], [X(8.10), 1.56], [X(8.10), 2.00], [X(6.75), 2.00]], BW + 0.08, 1.08);
    for (i = 0; i < 2; i++) {
      x = X(5.36 + i * 0.68) - 0.32;
      /* door frames and the X braces, the doors themselves painted */
      box(B.dark, x - 0.31, x + 0.31, 1.15, 1.162, 1.66, 1.69);
      box(B.dark, x - 0.31, x + 0.31, 1.15, 1.162, 2.50, 2.53);
      box(B.dark, x - 0.31, x - 0.28, 1.15, 1.162, 1.66, 2.53);
      box(B.dark, x + 0.28, x + 0.31, 1.15, 1.162, 1.66, 2.53);
      bar(B.dark, [x - 0.27, 1.162, 1.70], [x + 0.27, 1.162, 2.49], 0.03);
      bar(B.dark, [x - 0.27, 1.162, 2.49], [x + 0.27, 1.162, 1.70], 0.03);
    }
    for (i = 0; i < 14; i++) { x = X(6.95 + i * 0.08); box(B.dark, x - 0.02, x + 0.02, 1.08, 1.092, 1.64, 1.92); }
    box(B.dark, X(8.25), X(5.10), 1.20, 1.212, 1.36, 1.39);
    /* the lower half of the flat strut, on the carriage behind the door case ("Varna 2017 132") */
    planeBox(B.paint, [X(8.10), 0, 1.40], unit([-0.93, 0, 0.37]), [0, 1, 0], unit([0.37, 0, 0.93]), 0, 0.75, BW - 0.05, BW + 0.30, 0, 0.05);
    /* the vertical column behind the door case ("Dresden", "Varna 2017 132") */
    cylZ(B.dark, X(7.75), BW + 0.25, 1.52, 1.92, 0.10, 10);
    /* the elevating ram's cylinder, on the carriage under the beam */
    cyl(B.dark, [X(7.00), 0, 1.40], [X(7.25), 0, 1.70], 0.12, 0.12, 10);
    /* tail lamps and the rear cross beam */
    box(B.paint, X(10.65), X(10.45), -1.05, 1.05, 0.80, 1.08);
    for (s = -1; s <= 1; s += 2) box(B.dark, X(10.68), X(10.64), s * 0.90 - 0.08, s * 0.90 + 0.08, 0.90, 1.00);
    /* a modest team strip on top of the door case */
    box(B.team, X(6.45), X(5.55), BW + 0.45, 1.00, 2.62, 2.632);
  }

  /* the drawbar: an A-frame from the front bogie to the eye, at the hook (travel) or resting on the ground (set up) */
  function drawbar(B, zEye) {
    var s, eye = [X(0.0), 0, zEye];
    for (s = -1; s <= 1; s += 2) bar(B.paint, [X(2.35), s * 0.55, 1.00], [X(0.35), s * 0.06, zEye + 0.06], 0.11);
    cyl(B.dark, [X(0.35), 0, zEye + 0.06], eye, 0.07, 0.07, 10);
    cylZ(B.dark, X(0.0), 0, zEye - 0.04, zEye + 0.06, 0.10, 12);
  }
  /* the four jacks on their swing arms: stowed up beside the frame on the march, swung out and down when set up
     ("Gdansk 2026 02", "Varna 2017 132", "Skarzysko 01": a screw jack on a round pad at each corner) */
  function jacks(B, down) {
    var s, k, d, y;
    for (k = 0; k < 2; k++) {
      d = k ? 10.55 : 3.95;
      for (s = -1; s <= 1; s += 2) {
        if (down) {
          y = s * 1.85;
          box(B.paint, X(d) - 0.09, X(d) + 0.09, s * 0.55, y, 0.88, 1.06);
          cylZ(B.paint, X(d), y, 0.16, 1.12, 0.08, 10);
          cylZ(B.dark, X(d), y, 0.0, 0.08, 0.26, 14);
          cylZ(B.dark, X(d), y, 0.08, 0.16, 0.05, 8);
        } else {
          y = s * 0.70;
          box(B.paint, X(d) - 0.09, X(d) + 0.09, s * 0.55, y, 0.88, 1.06);
          cylZ(B.paint, X(d), y, 0.60, 1.12, 0.08, 10);
          cylZ(B.dark, X(d), y, 0.52, 0.60, 0.22, 14);
        }
      }
    }
  }

  /* ------------------------------------------------------------------ the AT-S medium artillery tractor
     Ru-wiki: 5,870 x 2,570 x 2,533 mm; the tractor ru.wikipedia names for the B-163. Shape from Commons "Artillery
     tractor AT-S" (front 3/4) and "AT-S towing a field gun side": a tall flat front plate with a vertical-bar grille
     and two caged lamps at its top corners, the full-width cab with a two-pane windscreen and a rounded roof, the
     short stake-sided body behind, small road wheels, the sprocket at the front. Nose at x = XN. */
  function ats(B) {
    var i, s, y, x, YT = 0.98, TW = 0.42;
    function A(lx) { return XN + lx; }
    box(B.paint, A(-5.60), A(-0.25), -0.76, 0.76, 0.36, 0.98);
    for (s = -1; s <= 1; s += 2) {
      y = s * YT;
      box(B.paint, A(-5.85), A(-0.10), y - TW / 2 - 0.08, y + TW / 2 + 0.08, 0.94, 0.99);
      /* the track: lower and upper runs, the runs round the sprocket and idler, cleats */
      box(B.dark, A(-4.20), A(-0.95), y - TW / 2, y + TW / 2, 0.0, 0.07);
      box(B.dark, A(-4.80), A(-0.55), y - TW / 2, y + TW / 2, 0.82, 0.89);
      bar(B.dark, [A(-0.95), y, 0.035], [A(-0.28), y, 0.62], 0.07);
      bar(B.dark, [A(-0.28), y, 0.62], [A(-0.55), y, 0.86], 0.07);
      bar(B.dark, [A(-4.20), y, 0.035], [A(-4.86), y, 0.55], 0.07);
      bar(B.dark, [A(-4.86), y, 0.55], [A(-4.80), y, 0.86], 0.07);
      for (i = 0; i < 12; i++) { x = A(-4.1 + i * 0.27); box(B.dark, x, x + 0.06, y - TW / 2, y + TW / 2, 0.0, 0.09); }
      /* road wheels, sprocket, idler, return rollers */
      for (i = 0; i < 6; i++) cylY(B.dark, A(-1.20 - i * 0.56), y - 0.10, y + 0.10, 0.30, 0.25, 12);
      for (i = 0; i < 6; i++) cylY(B.dark, A(-1.20 - i * 0.56), y + s * 0.10, y + s * 0.13, 0.30, 0.10, 8);
      cylY(B.dark, A(-0.55), y - 0.10, y + 0.10, 0.60, 0.30, 12);
      cylY(B.dark, A(-4.62), y - 0.10, y + 0.10, 0.50, 0.27, 12);
      for (i = 0; i < 3; i++) cylY(B.dark, A(-1.5 - i * 1.1), y - 0.12, y + 0.12, 0.78, 0.08, 8);
    }
    /* the front: tall flat plate with the grille, the caged lamps at its top corners, the bumper */
    profY(B.paint, [[A(-1.30), 0.98], [A(-0.14), 0.98], [A(-0.14), 1.92], [A(-0.30), 2.0], [A(-1.30), 2.0]], -1.20, 1.20);
    box(B.dark, A(-0.14), A(-0.12), -0.52, 0.52, 1.10, 1.78);
    for (i = 0; i < 12; i++) box(B.paint, A(-0.12), A(-0.09), -0.48 + i * 0.087, -0.45 + i * 0.087, 1.12, 1.76);
    box(B.paint, A(-0.16), A(0.0), -1.22, 1.22, 0.86, 1.00);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, A(-0.14), A(-0.04), s * 0.92, 1.80, 0.12, 12);
      cylX(B.glass, A(-0.04), A(-0.03), s * 0.92, 1.80, 0.10, 12);
      for (i = 0; i < 3; i++) box(B.dark, A(-0.03), A(0.0), s * 0.92 - 0.12, s * 0.92 + 0.12, 1.74 + i * 0.06, 1.75 + i * 0.06);
      /* the sloped panel down the cab side to the track guard */
      profY(B.paint, [[A(-3.0), 0.99], [A(-1.30), 0.99], [A(-1.30), 1.55], [A(-3.0), 1.55]], s * 1.20, s * 1.285);
    }
    /* the cab: full width, two windscreen panes, door windows, a rounded roof edge */
    box(B.paint, A(-3.10), A(-1.30), -1.285, 1.285, 0.98, 2.38);
    box(B.paint, A(-3.05), A(-1.36), -1.22, 1.22, 2.38, 2.533);
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [A(-3.05), s * 1.25, 2.40], [A(-1.36), s * 1.25, 2.40], 0.08);
      box(B.glass, A(-1.31), A(-1.28), s > 0 ? 0.06 : -1.12, s > 0 ? 1.12 : -0.06, 2.0, 2.34);
      box(B.glass, A(-2.05), A(-1.45), s * 1.285 - 0.015, s * 1.285 + 0.015, 1.95, 2.30);
      box(B.glass, A(-2.80), A(-2.20), s * 1.285 - 0.015, s * 1.285 + 0.015, 1.95, 2.30);
      box(B.dark, A(-2.14), A(-2.10), s * 1.29 - 0.01, s * 1.29 + 0.01, 1.58, 2.34);
    }
    box(B.dark, A(-1.30), A(-1.27), -0.06, 0.06, 2.0, 2.36);
    /* the cargo body: floor, stake sides with a top rail, tailboard */
    box(B.paint, A(-5.87), A(-3.10), -1.25, 1.25, 0.98, 1.08);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, A(-5.87), A(-3.10), s * 1.25 - 0.03, s * 1.25 + 0.03, 1.08, 1.45);
      box(B.dark, A(-5.87), A(-3.10), s * 1.25 - 0.025, s * 1.25 + 0.025, 1.80, 1.84);
      for (i = 0; i < 6; i++) { x = A(-3.2 - i * 0.52); box(B.dark, x - 0.025, x + 0.025, s * 1.25 - 0.025, s * 1.25 + 0.025, 1.08, 1.82); }
    }
    box(B.paint, A(-5.87), A(-5.81), -1.25, 1.25, 1.08, 1.45);
    box(B.dark, A(-5.87), A(-5.83), -1.25, 1.25, 1.80, 1.84);
    /* the towing hook */
    box(B.dark, A(-6.0), A(-5.6), -0.2, 0.2, 0.62, 0.86);
    /* a modest team strip on the cab roof */
    box(B.team, A(-2.60), A(-1.80), -0.30, 0.30, 2.533, 2.545);
  }

  /* ------------------------------------------------------------------ assembly */
  function build(THREE, C) {
    var T = materials(THREE, C), g = new THREE.Group(), SB = bins(T, ["paint", "dark", "team"]), i, s, wg, TB, geo;
    var TV, DP, trv, dep, pk, E, EB, LB;
    trailer(SB);
    flush(THREE, g, SB);
    /* the trailer's two axles, a dual each side, each axle one turning group */
    for (i = 0; i < AXD.length; i++) {
      TB = new Bin(T.tyre, false);
      for (s = -1; s <= 1; s += 2) {
        tyre(TB, 0, s * TY0, 0, 0, s > 0 ? null : null, RT / 0.75, 0.5);
        tyre(TB, 0, s * TY1, 0, 0.5, TB, RT / 0.75, 0.5);
      }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(X(AXD[i]), 0, RT);
      wg.add(new THREE.Mesh(geo, T.tyre));
      g.add(wg);
    }
    /* on the march: behind its AT-S, the drawbar on the hook, jacks stowed, the beam level (0 degrees) and EMPTY -
       the missiles travelled on PR-15 semi-trailers (ru.wikipedia) */
    TV = bins(T, ["paint", "dark", "glass", "team"]);
    ats(TV);
    drawbar(TV, 0.74);
    jacks(TV, false);
    trv = new THREE.Group(); trv.name = "travelpose";
    flush(THREE, trv, TV);
    LB = bins(T, ["paint", "dark"]);
    beam(LB);
    var lv = new THREE.Group();
    lv.position.set(X(TRD), 0, TRZ);
    lv.rotation.z = Math.PI;
    flush(THREE, lv, LB);
    trv.add(lv);
    /* set up: tractor gone, the drawbar down on the ground, jacks swung out and down, the S-2 on the beam */
    DP = bins(T, ["paint", "dark"]);
    drawbar(DP, 0.06);
    jacks(DP, true);
    dep = new THREE.Group(); dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    /* the beam and its missile: a carrier turned end for end at the trunnion, so the elevating group's +x runs aft
       (the launch end) and the launch end rises when render3d turns it by -el */
    EB = bins(T, ["paint", "dark", "mis"]);
    beam(EB);
    missile(EB, MT, MZ);
    pk = new THREE.Group();
    pk.position.set(X(TRD), 0, TRZ);
    pk.rotation.z = Math.PI;
    E = new THREE.Group();
    E.name = "podelev";
    flush(THREE, E, EB);
    E.userData.el = EL;
    /* the round starts from where it sits: nose at the mouth, its tail the rear */
    E.userData.cells = [[MT + ML, 0, MZ, MT]];
    pk.add(E);
    dep.add(pk);
    g.add(trv); g.add(dep);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent of the convoy: the AT-S's nose to the beam's launch end */
UNIT_MODELS["pact_e50_coastssm"] = { len: 18.49, build: function (THREE, M, C) { return HeroSopka.build(THREE, C); } };
