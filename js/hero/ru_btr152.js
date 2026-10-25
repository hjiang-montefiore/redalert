/* ===== ru_btr152.js - HERO model: the BTR-152 armoured personnel carrier, base 1950 model =====
   Full-quality redo (owner 2026-10-24, the older Soviet set).  One key, kept: pact_e50_ifv ("BTR-152",
   "BTR-152 Armoured Personnel Carrier", e50, service 1950, turret:true, cargo 6; js/eras.js); armour_specs
   "BTR-152 Armoured Personnel Carrier" (6.8 x 2.3 x 2.1 m, three axles, wheel r 0.55).  Build name kept: the
   builder is HeroRuBtr152.build, read by nothing else.

   Sub-variant drawn: the BASE BTR-152 of 1950-55 production (ru.wikipedia: 4923 built at ZiS 1950-55, open
   hull, 13 mm front, 10 mm sides).  en.wikipedia: "The basic BTR-152 has no winch, an open top, and no tire
   pressure control lines"; ru.wikipedia: 1947-55 vehicles ran on ZiS-150-pattern wheels with off-road tread.
   So no winch box on the bumper, no external air lines to the hubs, no roof: those are the 152V / V1 / V3 /
   K of 1955-62, which most museum vehicles are.  The Kubinka "BTR-152" [K1] is a base vehicle (plain channel
   bumper, no air lines); the rest of the photographs are of 152V-family vehicles, used for the hull, which
   the V kept (ru.wikipedia: 152V sides 9-11 mm, the same body).

   Published figures (en.wikipedia infobox and text; ru.wikipedia infobox, which is for the 152V):
     length 6.55 m (6.83 m for the 152V with its winch), width 2.32 m, height 2.04 m without the machine gun
     and 2.36 m with it, wheelbase 3.88 m (front axle to the bogie centre), track 1.72-1.742 m, ground
     clearance 0.295 m; one 7.62 mm SGMB on a pintle (ru.wikipedia: on the sockets of swivel brackets), 1250
     rounds; side doors to the cab whose tops fold down for observation, two rear doors for the troops, firing
     ports in the sides (en.wikipedia); seats along the sides and across the front of the troop compartment
     (ru.wikipedia); front axle on two semi-elliptic springs, the rear two on balancer springs (ru.wikipedia).
     Kept from the old header (confirmed): 6.55 / 2.32 / 2.04 / 2.36 m, the wheelbase, the ZiS-151 bogie of
     1.12 m (axles 3.32 and 4.44 m behind the front one), clearance, track, the 9.00-20 tyres, the SGMB.
   Corrected against the old file: the hull side is not one plate leaning in all along.  Behind the third
     firing port it is a VERTICAL plate to the rim; a diagonal knuckle then runs down and forward to 1.30 m at
     the cab door, and only forward of it does the upper plate lean in, over a vertical lower plate [S][T][R].
     The windscreen stands ahead of the cab door (top 1.01 m, foot 1.40 m; the old one leaned from 0.75 to 1.05
     over the door) [T]; the front fenders are high crowned arches (crown 1.40 m, the old 1.18) [T][B]; the
     headlamps stand in tall wire
     cages on the fender crowns [K1][B]; the tail has the two rear doors (the old file had none); the firing
     ports are three a side in the vertical rear plate at 1.74 m [S][T][R] (the old file had them as glass).
     No spare wheel is drawn: none shows in any photograph found (sides, quarters and rear), and the brief's
     "spare wheel" is not confirmed for this vehicle.

   References (Wikimedia Commons at width 960, cached in the scratchpad q_btr152_ref; no line drawing of the
   BTR-152 exists on Commons, so the shapes come from near-square side photographs and the published figures):
     [T]  "BTR-152 in Technical museum Togliatty.JPG" (a 152V1) - starboard side, near square, open top: the
          side drawing.  Stations scaled piecewise between the axles and the published 3.32 / 1.12 m spacing.
     [S]  "Skarzysko BTR-152 01-04.jpg" (a 152V under a tarpaulin) - both sides, front three-quarters: the
          knuckle, the doors, the ports, the fuel-filler boss, the grab handle.
     [K1] "BTR-152 in the Kubinka Tank Museum.jpg" - a base vehicle: channel bumper, louvred radiator armour,
          caged headlamps, the closed windscreen covers, the SGMB high on its pintle.
     [K2] "BTR-152V, Kubinka tank museum.jpg" - front-left three-quarter (the 152V's winch not drawn).
     [B]  "BTR-152 APC in Berlin.jpg" (an East German vehicle on the road) - open top, the gun on its pintle at
          the front of the troop compartment, the fender crowns, the radiator louvres.
     [R]  "BTR-152 en Saumur.JPG", "... b.JPG" - the rear quarter: the vertical rear plate with its ports, the
          diagonal knuckle, the chamfered rear corner, the rear tyres tucked under the sill.
     [M]  "Munster 2022 - Panzermuseum - SPW-152 - by-RaBoe 071/074/076.jpg" - paint and proportion checks.

   Recognition list (each shows at game zoom), what it rests on, where it is in the code:
     1. Three axles, a long gap behind the front one and the close rear tandem under the hull [T][S]: AXF/AXR.
     2. The open top: troop compartment and cab open above, benches and seats seen from the camera [B][T]:
        addBody (walls lofted as plates), addInterior.
     3. The faceted sides: vertical rear plate, the diagonal knuckle, the leaning upper plate over the cab
        [T][S][R]: sideAt / the wall stations.
     4. The windscreen plate laid back, its two armoured covers shut, each with a slit [K1][T]: addBody.
     5. The long bonnet with leaning sides and the louvred radiator armour across its raked front [K1][B]:
        addFront.
     6. The high crowned front fenders sweeping down to the step under the cab door [T][B][K1]: addFront.
     7. Headlamps in tall wire cages on the fender crowns [K1][B]: addFront.
     8. The plain channel bumper with two tow hooks (no winch on the base vehicle) [K1]: addFront.
     9. The cab doors bent over the knuckle, the fold-down top with its vision-slit cover [T][S]: addBody.
    10. Three round firing-port covers a side in the vertical rear plate; the fuel-filler boss ahead of the
        rear tyres [T][S][R]: addBody.
    11. The SGMB on its tall pintle at the front of the troop compartment, belt box on the right [K1][B]: sgmb.
    12. Big single 9.00-20 tyres with chevron off-road tread on green disc wheels [T][K1]: wheel.
   Paint: Soviet protective green, the green the BTR-60PB hero uses (#535b3c), checked against [T] (lower side
     in sun sampled 99,101,84; taken to about 0.85 and kept to the greener hue of the period) and [K1] (77,75,42
     under the museum's yellow light).  No numbers, stars, emblems or markings (the photographed "821", "UEZ
     0256" and the GDR and Polish insignia are not drawn).

   Station table (model x, m; +X nose; axles 2.29 / -1.03 / -2.15).  Each side wall is one plate lofted
   through these rows: [x, bottom z, knuckle z, rim z, knuckle half-width, rim half-width]; the tail rows lean
   forward 0.144 m a metre of height, the rear corners are chamfered (Saumur [R]).
       -3.10  1.00  2.02  2.04  0.98  0.97      tail corner
       -2.93  1.00  2.02  2.04  1.12  1.11      vertical rear plate, ports at -2.36 / -1.66 / -0.90
       -0.84  1.00  2.02  2.04  1.12  1.11      the diagonal knuckle starts at the rim
       -0.50  1.00  1.74  2.04  1.12  1.00      front of the rear wheel opening
       -0.30  0.62  1.58  2.04  1.12  0.93      the lower plate down to 0.62 m
        0.05  0.62  1.30  2.04  1.12  0.82      the knuckle reaches 1.30 m at the door's rear edge
        1.01  0.62  1.30  2.04  1.12  0.82      windscreen top
        1.40  0.62  1.30  1.52  1.12  1.03      windscreen foot on the cowl
     Bonnet x 1.40-2.95, half-width 0.74 at 0.80 m to 0.55 at the top, top 1.50 falling to 1.38; radiator
     armour raked 14 deg.  Fenders: an elliptic arch 0.78 x 0.85 m about (2.29, 0.55), crown 1.40 m.
   Drawn (L x W x H): 6.56 x 2.33 x 2.37 m (published 6.55 x 2.32 x 2.36 with the gun); hull rim 2.04 m.
   NOT CONFIRMED (drawn as approximations): the exact plan of the rear doors (en.wikipedia says two doors; no
     rear photograph of the tail plate was found); the station of the pintle post (x 0.30, behind the cab
     seats, from [K1][B]); the bench layout; the door hinges' side.  Not drawn: the optional side pintle
     mounts (en.wikipedia "optional"; none in the photographs), radio antenna, stowage, tarpaulin, any 152V
     fittings (winch, tyre-pressure lines, night-vision lamps).

   Nodes: "turret" (the SGMB on its swivel, origin on the socket at 2.00 m, gun along +X), three "roadwheel"
   axle groups (local Y the axle, both tyres in each), as the BTR-60/70/80 hero does.
   Materials 5: paint (canvas texture, planar UVs), dark, lamp, wheel (vertex colours), C.team (two short strips
   on the troop-compartment rims, facing up).  Draw calls 4 static + 2 turret + 3 wheels = 9.
   +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.                                            */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBtr152 = (function () {
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
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
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

  /* ---------------------------------------------------------------- more kit */
  /* a vertex-coloured bin (the wheels: rubber and painted hubs in one draw call); colours are linear */
  function VBin(mat) { Bin.call(this, mat, false); this.C = []; this.col = [0.02, 0.02, 0.02]; }
  VBin.prototype.tri = function (a, b, c, na, nb, nc) {
    Bin.prototype.tri.call(this, a, b, c, na, nb, nc);
    var k = this.col;
    this.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]);
  };
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }

  /* ---------------------------------------------------------------- the vehicle */
  var AXF = 2.29, AXR1 = -1.03, AXR2 = -2.15;        /* axle stations: 3.32 + 1.12 m, 3.88 m to the bogie centre */
  var RT = 0.535, TW = 0.26, TRK = 0.86;             /* 9.00-20 tyre radius and width, half of the 1.72 m track */
  var WH = 1.12, LEAN = 0.405;                       /* hull half-width at the knuckle; upper-plate lean, tan 22 deg */
  var ZT = 2.04, ZK = 1.30, ZSILL = 1.00, ZLOW = 0.62;
  var XTAIL = -3.10, TSLANT = 0.144;                 /* tail foot and its lean: 0.15 m forward over the 1.04 m plate */
  var XWS = 1.01, XCOWL = 1.40, ZCOWL = 1.52;        /* windscreen top edge, its foot on the cowl */
  var XPIN = 0.30;                                   /* the pintle post, front of the troop compartment */

  function lerp(a, b, t) { return a + (b - a) * t; }
  function ramp(x, x0, x1, a, b) { return x <= x0 ? a : (x >= x1 ? b : lerp(a, b, (x - x0) / (x1 - x0))); }

  /* the side at station x: bottom edge, knuckle, top edge, half-widths.  Behind x = -0.84 the side is one
     vertical plate to the rim (the three firing ports are in it); from there the knuckle runs diagonally
     down to 1.30 m at the door's rear edge (x = 0.05), and forward of it the upper plate leans in at
     22 deg over a vertical lower plate (Togliatti, Skarzysko, Saumur photographs; see the header). */
  function sideAt(x) {
    var W = x < -2.93 ? ramp(x, XTAIL, -2.93, 0.98, WH) : WH;
    var zb = x <= -0.50 ? ZSILL : (x <= -0.40 ? ramp(x, -0.50, -0.40, ZSILL, 0.76) : ramp(x, -0.40, -0.30, 0.76, ZLOW));
    var zt = ramp(x, XWS, XCOWL, ZT, ZCOWL);
    var zk = Math.min(ramp(x, -0.84, 0.05, ZT - 0.02, ZK), zt - 0.02);
    return { W: W, zb: zb, zk: zk, zt: zt, hwt: W - (zt - zk) * LEAN };
  }
  /* the outward frame of the leaning upper plate forward of the door's rear edge */
  function facet(s) {
    var dy = WH - (WH - (ZT - ZK) * LEAN), dz = ZT - ZK, l = Math.sqrt(dy * dy + dz * dz);
    return { P0: [0, s * WH, ZK], W: [0, -s * dy / l, dz / l], N: [0, s * dz / l, dy / l], len: l };
  }
  function onFacet(bin, s, x0, x1, w0, w1, h0, h1) {
    var f = facet(s);
    planeBox(bin, f.P0, [1, 0, 0], f.W, f.N, x0, x1, w0, w1, h0, h1);
  }
  /* a hexahedron given as a trapezoid on a tilted plane (half-width hw0 at u0, hw1 at u1) */
  function trap(bin, P0, U, N, u0, u1, hw0, hw1, h0, h1, yc) {
    var c = yc || 0;
    function pt(u, w, h) { return [P0[0] + U[0] * u + N[0] * h, c + w, P0[2] + U[2] * u + N[2] * h]; }
    hexa(bin, [pt(u0, -hw0, h0), pt(u1, -hw1, h0), pt(u1, hw1, h0), pt(u0, hw0, h0),
               pt(u0, -hw0, h1), pt(u1, -hw1, h1), pt(u1, hw1, h1), pt(u0, hw0, h1)]);
  }

  var PAINT = { base: "#535b3c", blots: ["#4a5235", "#5b6343", "#4f5739"], seed: 152 };
  var HUB = lin(0x4a5234), RUB = lin(0x1d1d1b), NUT = lin(0x30352a);

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2b2d27, roughness: 0.78, metalness: 0.3 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd2ccb0, roughness: 0.3, metalness: 0.2, emissive: 0x1a1810 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.9, metalness: 0.04 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* ---------------------------------------------------------------- the armoured body */
  var WX = [XTAIL, -2.93, -2.40, -1.60, -0.84, -0.50, -0.40, -0.30, 0.05, XWS, 1.20, XCOWL];
  function wallRing(x, s, slant) {
    var r = sideAt(x), t = 0.06, P = [[s * r.W, r.zb], [s * r.W, r.zk], [s * r.hwt, r.zt],
                                       [s * (r.hwt - t), r.zt], [s * (r.W - t), r.zk], [s * (r.W - t), r.zb]];
    return P.map(function (p) { return [x + (slant ? (p[1] - ZSILL) * TSLANT : 0), p[0], p[1]]; });
  }
  function addBody(B) {
    var s, i, rings, x;
    /* the two side walls, each one plate lofted through the stations, open above (the open top) */
    for (s = -1; s <= 1; s += 2) {
      rings = [];
      for (i = 0; i < WX.length; i++) rings.push(wallRing(WX[i], s, i < 2));
      loft(B.paint, rings, false);
    }
    /* the tail plate, leaning forward 8 deg, between the chamfered corners */
    var tU = unit([TSLANT, 0, 1]), tN = unit([-1, 0, TSLANT]), tP = [XTAIL, 0, ZSILL], tl = ZT - ZSILL;
    planeBox(B.paint, tP, tU, [0, 1, 0], tN, 0, tl * Math.sqrt(1 + TSLANT * TSLANT), -0.97, 0.97, -0.06, 0.0);
    /* the two rear doors (en.wikipedia: two rear doors for the troops), dark seams, hinges, handles and a
       round firing port in each leaf */
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.paint, tP, tU, [0, 1, 0], tN, 0.08, 0.92, s > 0 ? 0.012 : -0.41, s > 0 ? 0.41 : -0.012, 0.0, 0.03);
      planeBox(B.dark, tP, tU, [0, 1, 0], tN, 0.20, 0.28, s * 0.41 - 0.025, s * 0.41 + 0.025, 0.0, 0.05);
      planeBox(B.dark, tP, tU, [0, 1, 0], tN, 0.70, 0.78, s * 0.41 - 0.025, s * 0.41 + 0.025, 0.0, 0.05);
      planeBox(B.dark, tP, tU, [0, 1, 0], tN, 0.46, 0.50, s * 0.04, s * 0.12, 0.03, 0.06);
      var pc = [tP[0] + tU[0] * 0.66 + tN[0] * 0.03, s * 0.21, tP[2] + tU[2] * 0.66 + tN[2] * 0.03];
      cyl(B.paint, pc, [pc[0] + tN[0] * 0.03, pc[1], pc[2] + tN[2] * 0.03], 0.075, 0.065, 12);
      /* tail lamp low on each corner */
      var lp = [tP[0] + tU[0] * 0.16, s * 0.78, tP[2] + tU[2] * 0.16];
      box(B.dark, lp[0] - 0.05, lp[0] + 0.01, lp[1] - 0.07, lp[1] + 0.07, lp[2] - 0.05, lp[2] + 0.05);
      box(B.lamp, lp[0] - 0.06, lp[0] - 0.05, lp[1] - 0.05, lp[1] + 0.05, lp[2] - 0.035, lp[2] + 0.035);
    }
    /* the belly between the wheels, the shelves over the rear tyres, the cowl bulkhead under the windscreen */
    box(B.paint, XTAIL + 0.02, XCOWL, -0.68, 0.68, 0.48, 1.05);
    for (s = -1; s <= 1; s += 2) box(B.paint, -3.02, -0.48, s > 0 ? 0.66 : -1.08, s > 0 ? 1.08 : -0.66, 0.97, 1.03);
    box(B.paint, XCOWL - 0.04, XCOWL + 0.02, -1.08, 1.08, ZLOW, ZCOWL - 0.02);
    /* the windscreen plate laid back 37 deg, with its two armoured vision covers shut, each with its slit */
    var wU = unit([XCOWL - XWS, 0, ZCOWL - ZT]), wN = unit([ZT - ZCOWL, 0, XCOWL - XWS]), wl = Math.sqrt((XCOWL - XWS) * (XCOWL - XWS) + (ZT - ZCOWL) * (ZT - ZCOWL));
    var hTop = sideAt(XWS).hwt, hBot = sideAt(XCOWL).hwt;
    trap(B.paint, [XWS, 0, ZT], wU, wN, 0, wl, hTop - 0.03, hBot - 0.03, -0.05, 0.0);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.paint, [XWS, 0, ZT], wU, [0, 1, 0], wN, 0.15, 0.48, s * 0.42 - 0.29, s * 0.42 + 0.29, 0.0, 0.03);
      planeBox(B.dark, [XWS, 0, ZT], wU, [0, 1, 0], wN, 0.29, 0.31, s * 0.42 - 0.20, s * 0.42 + 0.20, 0.03, 0.036);
      planeBox(B.dark, [XWS, 0, ZT], wU, [0, 1, 0], wN, 0.11, 0.15, s * 0.42 - 0.24, s * 0.42 + 0.24, 0.0, 0.05);   /* hinge */
    }
    /* the cab doors (x 0.11-0.75), bent over the knuckle: lower leaf on the vertical plate, upper leaf on the
       leaning plate with the vision slit in the fold-down top (en.wikipedia: the tops fold down) */
    var fl = facet(1).len;
    for (s = -1; s <= 1; s += 2) {
      var yo = s * WH, d = s * 0.022;
      box(B.paint, 0.11, 0.75, yo - s * 0.004, yo + d, 0.67, ZK);
      onFacet(B.paint, s, 0.11, 0.75, 0.0, fl * 0.77, -0.004, 0.022);
      onFacet(B.dark, s, 0.11, 0.75, fl * 0.42, fl * 0.44, 0.022, 0.03);        /* the fold line of the top */
      onFacet(B.paint, s, 0.26, 0.58, fl * 0.52, fl * 0.66, 0.02, 0.05);        /* vision-slit cover        */
      onFacet(B.dark, s, 0.30, 0.54, fl * 0.58, fl * 0.60, 0.05, 0.056);
      onFacet(B.dark, s, 0.14, 0.21, fl * 0.20, fl * 0.26, 0.02, 0.06);         /* handle                   */
      box(B.dark, 0.09, 0.11, yo - s * 0.004, yo + s * 0.03, 0.67, ZK);              /* door seams, lower leaf */
      box(B.dark, 0.75, 0.77, yo - s * 0.004, yo + s * 0.03, 0.67, ZK);
      box(B.dark, 0.09, 0.77, yo - s * 0.004, yo + s * 0.03, 0.65, 0.67);
      onFacet(B.dark, s, 0.09, 0.11, 0.0, fl * 0.79, -0.004, 0.03);
      onFacet(B.dark, s, 0.75, 0.77, 0.0, fl * 0.79, -0.004, 0.03);
      onFacet(B.dark, s, 0.09, 0.77, fl * 0.77, fl * 0.79, -0.004, 0.03);
      box(B.dark, 0.71, 0.79, yo, yo + s * 0.04, 0.84, 0.92);                    /* hinges at the front edge */
      box(B.dark, 0.71, 0.79, yo, yo + s * 0.04, 1.16, 1.24);
      /* the three round firing ports in the rear plate (Saumur, Togliatti, Skarzysko), shut, each on its lug */
      var PX = [-2.36, -1.66, -0.90];
      for (i = 0; i < 3; i++) {
        cylY(B.paint, PX[i], yo, yo + s * 0.035, 1.74, 0.085, 14);
        cylY(B.dark, PX[i], yo + s * 0.035, yo + s * 0.045, 1.74, 0.025, 8);
        box(B.dark, PX[i] - 0.03, PX[i] + 0.03, yo, yo + s * 0.04, 1.60, 1.66);
      }
      /* the fuel-filler boss low ahead of the rear tyres (Saumur, Skarzysko, Togliatti) */
      cylY(B.paint, -0.24, yo, yo + s * 0.035, 1.13, 0.09, 14);
      cylY(B.dark, -0.24, yo + s * 0.035, yo + s * 0.045, 1.13, 0.055, 10);
      /* the grab handle on the leaning plate forward of the diagonal (Skarzysko) */
      var g0 = [-0.62, s * (WH + 0.015), 1.42], g1 = [-0.30, s * (WH + 0.015), 1.42];
      bar(B.dark, [g0[0], s * WH, 1.42], g0, 0.025); bar(B.dark, g0, g1, 0.025); bar(B.dark, g1, [g1[0], s * WH, 1.42], 0.025);
    }
  }

  /* ---------------------------------------------------------------- bonnet, radiator armour, fenders, bumper */
  function addFront(B) {
    var s, i, k;
    /* the bonnet: flat top, sides leaning in (Kubinka), the front end raked back 14 deg above the radiator */
    var ztop = function (x) { return 1.50 - (x - XCOWL) * 0.08; }, xf = 2.95, zf = ztop(xf), rk = 0.25;
    var BX = [XCOWL, 1.90, 2.45, xf], rings = [];
    for (i = 0; i < BX.length; i++) {
      var x = BX[i], zt = ztop(x), last = i === BX.length - 1;
      var xb = last ? xf + (zf - 0.80) * rk : x;
      rings.push([[xb, -0.74, 0.80], [xb, 0.74, 0.80], [x, 0.55, zt], [x, -0.55, zt]]);
    }
    loft(B.paint, rings, false);
    /* bonnet top: centre seam and the two hold-down catches */
    box(B.dark, XCOWL + 0.05, xf - 0.04, -0.012, 0.012, ztop(2.1) - 0.003, ztop(2.1) + 0.008);
    for (s = -1; s <= 1; s += 2) box(B.dark, 2.62, 2.70, s * 0.585 - 0.02, s * 0.585 + 0.02, 1.16, 1.33);
    /* the radiator armour: a trapezoid plate over the front with four horizontal louvre slots (Kubinka, Berlin) */
    var rU = unit([(zf - 0.80) * rk, 0, -(zf - 0.80)]), rN = unit([zf - 0.80, 0, (zf - 0.80) * rk]), rl = (zf - 0.80) * Math.sqrt(1 + rk * rk);
    trap(B.paint, [xf, 0, zf], rU, rN, -0.02, rl, 0.56, 0.75, 0.0, 0.035);
    for (k = 0; k < 4; k++) {
      var u0 = 0.10 + k * 0.115, hw = lerp(0.56, 0.75, (u0 + 0.03) / rl) - 0.10;
      trap(B.dark, [xf, 0, zf], rU, rN, u0, u0 + 0.05, hw, hw, 0.035, 0.045);
      trap(B.paint, [xf, 0, zf], rU, rN, u0 - 0.04, u0, hw + 0.02, hw + 0.02, 0.035, 0.07);
    }
    trap(B.dark, [xf, 0, zf], rU, rN, -0.02, 0.03, 0.40, 0.40, 0.035, 0.06);   /* the top hinge */
    /* the front fenders: a broad crowned arch over each front tyre, sweeping back down to the step under
       the cab door, the outer edge rolled (Togliatti, Skarzysko, Kubinka) */
    var P = [[0.06, ZLOW], [0.80, ZLOW], [1.22, 0.69]], RX = 0.78, RZ = 0.85, ZC = 0.55;
    for (k = 0; k <= 10; k++) { var a = (165 - k * 15) * Math.PI / 180; P.push([AXF + RX * Math.cos(a), ZC + RZ * Math.sin(a)]); }
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i + 1 < P.length; i++) {
        var A = [P[i][0], 0, P[i][1]], Bp = [P[i + 1][0], 0, P[i + 1][1]], U = unit(sub(Bp, A)), N = [-U[2], 0, U[0]];
        var L = Math.sqrt(dot(sub(Bp, A), sub(Bp, A)));
        planeBox(B.paint, A, U, [0, 1, 0], N, -0.004, L + 0.004, s > 0 ? 0.60 : -1.13, s > 0 ? 1.13 : -0.60, -0.035, 0.0);
        bar(B.paint, [A[0] - N[0] * 0.03, s * 1.135, A[2] - N[2] * 0.03], [Bp[0] - N[0] * 0.03, s * 1.13, Bp[2] - N[2] * 0.03], 0.06);
      }
      /* the headlamp on the fender crown in its wire cage (Kubinka, Berlin) */
      var hx = 2.62, hy = s * 0.86, hz = 1.50;
      box(B.dark, hx - 0.05, hx + 0.03, hy - 0.04, hy + 0.04, 1.28, hz - 0.08);
      cylX(B.paint, hx - 0.08, hx + 0.08, hy, hz, 0.105, 14);
      cylX(B.lamp, hx + 0.08, hx + 0.095, hy, hz, 0.09, 14);
      var c0 = hx - 0.10, c1 = hx + 0.20, cy0 = hy - 0.16, cy1 = hy + 0.16, cz0 = 1.34, cz1 = 1.66;
      bar(B.dark, [c1, cy0, cz0], [c1, cy0, cz1], 0.016); bar(B.dark, [c1, cy1, cz0], [c1, cy1, cz1], 0.016);
      bar(B.dark, [c0, cy0, cz1], [c1, cy0, cz1], 0.016); bar(B.dark, [c0, cy1, cz1], [c1, cy1, cz1], 0.016);
      bar(B.dark, [c1, cy0, cz1], [c1, cy1, cz1], 0.016); bar(B.dark, [c0, cy0, cz1], [c0, cy1, cz1], 0.016);
      bar(B.dark, [c0, cy0, cz0], [c0, cy0, cz1], 0.016); bar(B.dark, [c0, cy1, cz0], [c0, cy1, cz1], 0.016);
      for (k = 1; k <= 3; k++) {
        var yk = lerp(cy0, cy1, k / 4), zk = lerp(cz0, cz1, k / 4);
        bar(B.dark, [c1, yk, cz0], [c1, yk, cz1], 0.01);
        bar(B.dark, [c1, cy0, zk], [c1, cy1, zk], 0.01);
        bar(B.dark, [c0, yk, cz1], [c1, yk, cz1], 0.01);
      }
    }
    /* the bumper: a channel beam across the frame horns (no winch on the base BTR-152), two tow hooks */
    box(B.paint, 3.22, 3.27, -1.10, 1.10, 0.52, 0.74);
    box(B.paint, 3.22, 3.40, -1.10, 1.10, 0.70, 0.74);
    box(B.paint, 3.22, 3.40, -1.10, 1.10, 0.52, 0.56);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 3.22, 3.40, s * 1.06, s * 1.10, 0.56, 0.70);
      box(B.dark, 2.85, 3.22, s * 0.40, s * 0.50, 0.56, 0.72);                 /* frame horn  */
      box(B.dark, 3.27, 3.40, s * 0.46 - 0.035, s * 0.46 + 0.035, 0.58, 0.68); /* tow hook    */
      cylY(B.dark, 3.38, s * 0.46 - 0.06, s * 0.46 + 0.06, 0.63, 0.03, 8);
    }
  }

  /* ---------------------------------------------------------------- running gear under the body */
  function addChassis(B) {
    var s, i, x;
    /* front beam axle on leaf springs; the rear tandem on the balancer springs (ru.wikipedia) */
    cylY(B.dark, AXF, -TRK + 0.12, TRK - 0.12, RT, 0.06, 10);
    box(B.dark, AXF - 0.15, AXF + 0.15, 0.00, 0.30, RT - 0.17, RT + 0.15);
    for (s = -1; s <= 1; s += 2) box(B.dark, AXF - 0.55, AXF + 0.55, s * 0.47, s * 0.57, RT + 0.08, RT + 0.15);
    for (i = 0; i < 2; i++) {
      x = [AXR1, AXR2][i];
      cylY(B.dark, x, -TRK + 0.12, TRK - 0.12, RT, 0.07, 10);
      box(B.dark, x - 0.17, x + 0.17, -0.20, 0.20, RT - 0.18, RT + 0.16);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, AXR2 - 0.06, AXR1 + 0.06, s * 0.57, s * 0.69, RT + 0.08, RT + 0.17);
      cylY(B.dark, (AXR1 + AXR2) / 2, s * 0.45, s * 0.70, RT + 0.22, 0.10, 12);
    }
    /* propeller shafts from the transfer box under the cab */
    cylX(B.dark, AXR1 + 0.17, 0.70, 0.0, RT + 0.05, 0.04, 8);
    cylX(B.dark, 0.70, AXF - 0.15, 0.15, RT + 0.05, 0.04, 8);
    /* towing pintle under the tail */
    box(B.dark, XTAIL - 0.05, XTAIL + 0.04, -0.07, 0.07, 0.80, 0.90);
    cylZ(B.dark, XTAIL - 0.025, 0, 0.74, 0.96, 0.025, 8);
  }

  /* ---------------------------------------------------------------- inside the open top */
  function addInterior(B) {
    var s;
    box(B.paint, XTAIL + 0.06, XCOWL - 0.04, -1.06, 1.06, 1.05, 1.10);                     /* the floor */
    for (s = -1; s <= 1; s += 2) {
      /* the benches along the sides and across the front of the troop compartment (ru.wikipedia) */
      box(B.dark, -2.86, -0.20, s > 0 ? 0.70 : -1.06, s > 0 ? 1.06 : -0.70, 1.46, 1.53);
      box(B.paint, -2.86, -0.20, s > 0 ? 0.68 : -0.73, s > 0 ? 0.73 : -0.68, 1.10, 1.46);
      box(B.dark, 0.00, 0.34, s > 0 ? 0.10 : -1.06, s > 0 ? 1.06 : -0.10, 1.46, 1.53);
      box(B.paint, 0.34, 0.40, s > 0 ? 0.10 : -1.06, s > 0 ? 1.06 : -0.10, 1.10, 1.86);
      /* the driver's (left) and commander's seats */
      box(B.dark, 0.62, 0.98, s * 0.20, s * 0.66, 1.42, 1.52);
      box(B.dark, 0.56, 0.63, s * 0.20, s * 0.66, 1.52, 1.92);
      box(B.paint, 0.64, 0.96, s * 0.25, s * 0.61, 1.10, 1.42);
    }
    /* the instrument panel under the windscreen, the steering wheel on the left */
    box(B.dark, 1.27, 1.36, -0.96, 0.96, 1.36, 1.50);
    bar(B.dark, [1.33, 0.42, 1.40], [1.15, 0.42, 1.70], 0.04);
    cyl(B.dark, [1.13, 0.42, 1.71], [1.15, 0.42, 1.73], 0.20, 0.20, 16);
    /* the pintle post (the SGMB on top of it is the "turret") */
    cylZ(B.dark, XPIN, 0, 1.10, 1.14, 0.09, 12);
    cylZ(B.dark, XPIN, 0, 1.10, 2.00, 0.035, 10);
    /* C.team: two short strips on the rims of the troop compartment, facing up */
    for (s = -1; s <= 1; s += 2) box(B.team, -2.70, -1.20, s > 0 ? 1.065 : -1.115, s > 0 ? 1.115 : -1.065, ZT - 0.01, ZT + 0.008);
  }

  /* ---------------------------------------------------------------- the SGMB on its swivel (local: socket top) */
  function sgmb(B) {
    cylZ(B.dark, 0, 0, -0.02, 0.10, 0.045, 10);                         /* swivel             */
    box(B.dark, -0.07, 0.07, -0.075, 0.075, 0.10, 0.20);                 /* yoke               */
    cylY(B.dark, 0, -0.085, 0.085, 0.235, 0.03, 8);                      /* trunnion           */
    box(B.dark, -0.18, 0.20, -0.05, 0.05, 0.19, 0.30);                   /* receiver           */
    box(B.dark, -0.04, 0.16, -0.055, 0.055, 0.30, 0.33);                 /* feed cover         */
    cylX(B.dark, 0.20, 0.80, 0, 0.255, 0.032, 10);                       /* fluted barrel      */
    cylX(B.dark, 0.80, 0.88, 0, 0.255, 0.022, 8);                        /* muzzle             */
    cylX(B.dark, 0.20, 0.60, 0, 0.205, 0.013, 6);                        /* gas cylinder       */
    box(B.dark, 0.74, 0.77, -0.008, 0.008, 0.28, 0.33);                  /* foresight          */
    bar(B.dark, [0.34, 0, 0.29], [0.40, 0, 0.36], 0.02);                 /* barrel handle      */
    bar(B.dark, [0.40, 0, 0.36], [0.56, 0, 0.36], 0.02);
    bar(B.dark, [0.56, 0, 0.36], [0.60, 0, 0.29], 0.02);
    box(B.dark, 0.06, 0.10, -0.012, 0.012, 0.33, 0.36);                  /* rear sight         */
    box(B.dark, -0.21, -0.18, -0.07, 0.07, 0.20, 0.30);                  /* back plate         */
    cylZ(B.dark, -0.25, 0.06, 0.19, 0.30, 0.016, 6);                      /* spade grips        */
    cylZ(B.dark, -0.25, -0.06, 0.19, 0.30, 0.016, 6);
    box(B.paint, -0.04, 0.18, -0.22, -0.07, 0.11, 0.30);                 /* belt box, feed right */
  }

  /* ---------------------------------------------------------------- wheels */
  /* a 9.00-20 tyre with the off-road chevron tread on a ZiS-150-pattern disc wheel (ru.wikipedia: 1947-55
     vehicles), ten studs round the hub; on the Y axis at (0, yc, 0) */
  function wheel(VB, yc, s, ph) {
    var N = 24, hw = TW / 2, prof = [[0.58, -1.0, 0], [0.70, -1.0, 0], [0.86, -0.97, 0], [0.96, -0.80, 0], [1.0, -0.42, 1],
                                     [1.0, 0.42, 2], [0.96, 0.80, 0], [0.86, 0.97, 0], [0.70, 1.0, 0], [0.58, 1.0, 0]];
    var V = [], F = [], i, j, k, m = prof.length, r, a;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = prof[i][0] * RT;
      if (prof[i][2] && ((j + prof[i][2]) % 2)) r -= 0.04;
      a = (j + ph) / N * TAU;
      V.push([r * Math.cos(a), yc + prof[i][1] * hw, r * Math.sin(a)]);
    }
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N; var i2 = (i + 1) % m;
      F.push([i * N + j, i * N + k, i2 * N + k], [i * N + j, i2 * N + k, i2 * N + j]);
    }
    VB.col = RUB;
    solid(VB, V, F, true);
    VB.col = HUB;
    var yf = yc + s * hw * 0.80;
    cyl(VB, [0, yf, 0], [0, yc - s * hw * 0.80, 0], 0.585 * RT, 0.585 * RT, 18);                 /* the disc        */
    cyl(VB, [0, yf, 0], [0, yf + s * 0.015, 0], 0.54 * RT, 0.50 * RT, 18);                       /* its rim ring    */
    cyl(VB, [0, yf, 0], [0, yf + s * 0.06, 0], 0.11, 0.09, 12);                                  /* hub             */
    VB.col = NUT;
    cyl(VB, [0, yf + s * 0.06, 0], [0, yf + s * 0.09, 0], 0.06, 0.05, 10);                      /* hub cap         */
    for (i = 0; i < 10; i++) {
      a = i / 10 * TAU;
      cyl(VB, [0.145 * Math.cos(a), yf, 0.145 * Math.sin(a)], [0.145 * Math.cos(a), yf + s * 0.03, 0.145 * Math.sin(a)], 0.018, 0.018, 6);
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), i, wg, geo, VB;
    g.name = "ru_btr152";
    var B = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
              lamp: new Bin(T.lamp, false), team: new Bin(T.team, false) };
    addBody(B);
    addFront(B);
    addChassis(B);
    addInterior(B);
    flush(THREE, g, B);
    /* three turning axle groups, both tyres in each */
    var AX = [AXF, AXR1, AXR2];
    for (i = 0; i < AX.length; i++) {
      VB = new VBin(T.wheel);
      wheel(VB, TRK, 1, 0);
      wheel(VB, -TRK, -1, 0.5);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(VB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(VB.N), 3));
      geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VB.C), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, RT);
      wg.add(new THREE.Mesh(geo, T.wheel));
      g.add(wg);
    }
    /* the SGMB on the pintle: the trained "turret", origin on the socket, gun along +X */
    var TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    sgmb(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(XPIN, 0, 2.00);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the towing pintle under the tail to the tow hooks on the bumper */
UNIT_MODELS["pact_e50_ifv"] = { len: 6.56, build: HeroRuBtr152.build };
