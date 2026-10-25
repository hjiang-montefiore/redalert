/* ===== us_early_rockets.js - HERO models: the 1950s US Army rocket and missile launchers =====
   Full-quality redo (2026-10-24).  Two keys, kept:
     nato_e50_mlrs  "MGR-1A Honest John free-flight rocket" (1953)   turret:true
     nato_e50_tel   "MGM-5 Corporal guided missile" (1955)            turret:false, deploy:true (deploySec 9)
   HeroUsEarlyRockets {buildHJ, buildCorporal} is kept as the name.  This file loads after js/tel3d.js (index.html),
   so its nato_e50_tel entry replaces tel3d.js's generic erector.

   Sources (Wikimedia Commons at width 960, U.S. Army photographs, public domain unless noted; cached in
   scratchpad/q_earlyrockets_ref):
     [HJ3]  "MGR-1 Honest John 03.jpg" (filed under M289): the M289 from the rear quarter, the launch rail raised about
            57 deg, the rocket on top of the rail, its big X fins straddling the rail's heel at the very tail of the truck;
            the A-frame elevating struts standing behind the cab; the box-frame rail rest over the front bumper; an open
            cab; a jack down behind the front wheel and one at the tail.
     [HJ7]  "MGR-1 Honest John 07.jpg" (1958-01-17) and [HJ4] "... 04.jpg": two launchers firing, rails at about 45 deg.
     [HJR]  "MGR-1 Honest John rocket.jpg" (Redstone Arsenal archive, 1960s): the rail and the struts, an orange test round.
     [M289] "Een International M139D 5-tons 6x6-lanceerauto, met een Honest John-raket (762 mm, M289) ... (2155 046863).jpg"
            (Nationaal Archief, Dutch Army): the M289 launcher on the M139D, side-on: the long box rail raised about 20 deg
            from a pivot over the tail, its tapered front end far past the bumper, the grating along its left side under the
            rocket, the post-and-brace rail rest standing on the bumper; jacks down at both bumper corners and behind the
            front wheel with their big pyramid feet; single 14.00-20 tyres all round (the rear tandem too).
     [MF]   "Maneuver and Firepower - Honest John rocket launcher.jpg" (US Army CMH, three launchers): rails low over open cabs,
            the rocket's fins at the tail over the rear deck, the rail's front end past the bumper.
     [C02]  "MGM-5 Corporal 02.jpg" (colour): the twin-cab tractor towing the erector semitrailer, the boom raised about
            65 deg at the trailer's tail over a single big-tyred axle; the white missile with its black aft band.
     [CMV]  "Corporal mammoth vehicle transporter.jpg" (1957): the same rig from the front quarter: the big box body over the
            front axle, TWO separate cabs side by side with arched roofs, the lattice ladder along the boom, a jack at the
            trailer's rear corner.
     [C05]  "MGM-5 Corporal 05.jpg" (1958, White Sands): the erector's tail close up: the big round disc on the boom's
            pivot, the box boom, the C-shaped clamp collars near the tail and at the nose, the single axle ahead of the disc.
     [C04]  "MGM-5 Corporal 04.jpg" (1958): the round upright on its launch table: a ring platform on four splayed legs.
     [C03]  "MGM-5 Corporal 03.jpg" (1954): the black aft section and band (the 10-02 file measured them on it; kept).
     Wikipedia "MGR-1 Honest John" and designation-systems.net (r-1): M31 (MGR-1A) 8.30 m (27 ft 3 in), motor 22 7/8 in
       (0.58 m), warhead 30 in (0.76 m), fin span 9 ft 1 in (2.77 m); the M6 motor 5.015 m; "mounted on an M289 launcher";
       the support vehicles list "M289 truck, rocket launcher, (M139 truck)" and the short-rail M386 (for the later M50,
       1961 on; not this row).  Wikipedia "M39 series": the M139 5-ton 6x6 chassis, wheelbase 215 in (5.46 m) to the
       middle of the tandem, 29 ft 5 in (8.97 m), 14.00x20 tyres.
     Wikipedia "MGM-5 Corporal" and designation-systems.net (m-5): 45 ft 4 in (13.82 m), 30 in (0.76 m), span 7 ft
       (2.13 m), 11,000 lb; "inertial guidance kept the missile in a vertical position" at launch; Type II (1955-56 on):
       "the missile launcher, erector, and servicing platform were also redesigned".
   CORRECTED from the 10-02 file: the Honest John's rail sat on a trainable ring in mid-air with no rest; it now pivots on
     its tail pedestal and lies on the photographed rail rest over the bumper [HJ3][M289]; the cab was a closed hard-top,
     the 1950s US launchers are open [HJ3][MF]; the rear tandem had dual tyres, the photographs show singles [M289][HJ3]; the
     launcher now has its poses (march, set up, raised to the photographed 45 deg).  The Corporal's tractor had a rear
     tandem "assumed": the photographs show one rear axle under the fifth wheel [C02]; the rig was 13.4 m, scaled to the
     missile in [C02] it is about 16.5 m; the boom was fixed at 24 deg, it now lies on the march and goes up to vertical;
     the discs, the clamp collars, the ladder and the launch table are drawn from [C05][CMV][C04].

   Recognition list (each drawn; its source; where in the code):
     HONEST JOHN
      1. the long M139 6x6 with single big tyres, the front axle far forward, the tandem at the rear [M289][HJ3]: buildHJ.
      2. the open cab behind the long flat-sided hood, the flat windscreen with two panes [HJ3][MF][M289]: hjCab.
      3. the long box rail pivoted over the tail, lying low over the cab and running far past the bumper [M289][MF]: hjRail.
      4. the fat rocket on top of the rail: thin motor, the flare to the 30 in warhead, its pointed ogive [M289][HJ3]: hjRail.
      5. the four big X fins at the tail, straddling the rail's heel [HJ3][HJR]: hjRail.
      6. the post-and-brace rail rest on the front bumper [M289][HJ3]: hjFront.
      7. six jacks with big pyramid feet (bumper corners, behind the cab, the tail) [M289][HJ3]: hjJacks.
      8. the grating along the rail's left side under the rocket [M289]: hjRail.
     CORPORAL
      9. the big box body of the tractor over its front axle and the TWO separate arched-roof cabs [CMV][C02]: corTractor.
     10. the spare tyre lying on the tractor's deck behind the cabs [C02]: corTractor.
     11. the long low semitrailer, its arch over ONE big-tyred axle at the tail [C02][CMV][C05]: corTrailer.
     12. the big round disc on the boom's pivot at the tail [C05][C02]: corTrailer.
     13. the long slim white missile, black aft section and band, four swept fins [C02][C03][C04]: corBoom.
     14. the box boom with its C clamp collars and the lattice ladder [C05][CMV]: corBoom.
     15. raised to vertical over the launch table, a ring on four splayed legs [C04]: corDeploy, "podelev" el 90 deg.

   Poses (render3d.js: "podelev" raised to userData.el while the unit holds a target in reach; "deploypose" shown while
   e.deployed and standing, "travelpose" otherwise):
     Honest John: travelpose = the six jack feet up; deploypose = the six jacks down on their pyramid feet [M289][HJ3].  The
       rail rests at 8 deg on its rest over the bumper on the march [MF][M289] (a fixed group "railbase" holds that rest
       angle; "podelev" inside it is level in its own frame), and is raised to 45 deg total [HJ7][HJ4] (userData.el 37 deg).
       The row is turret:true: "turret" is the launcher mount, its origin on the tail pedestal under the rail's pivot, so
       the game trains rail and rocket about the pedestal; "podelev" sits inside it, as js/hero/us_m270_himars.js does.
       The real M289 lays its rail in azimuth over a limited arc only (the truck is laid roughly on the target): the arc
       is NOT confirmed and turret:true trains it all the way round; the row is not changed.  The row is NOT deploy:true,
       so the game never sets it up and the jacks-down pose stays hidden in play; it is drawn for the day the row has it.
     Corporal: travelpose = the rear jacks up; deploypose = the rear jacks down and the launch table set out under the tail
       [C04][CMV].  The boom lies at 6 deg on the march, the missile nose forward over the tractor's cabs (NO photograph of
       the rig on the march was found: the angle is the lowest that clears the cabs, and the missile is drawn on the
       erector throughout, as the Pershing and Scud-A heroes carry theirs).  Raised: "podelev" to vertical (userData.el =
       90 deg less the 6 deg rest), the tail coming down onto the launch table [C04]; the erector's withdrawal after the
       transfer is not drawn.
     The elevating gear (the Honest John's A-frame struts [HJ3], the Corporal's ram) is not drawn: it could not follow the
     rail, which render3d only turns.  Their feet on the deck are drawn.
   Paint: 1950s US Army olive drab on every vehicle, as the period colour photographs show it ([HJ7] faded, [C02] lit,
     #4e5434..#5a5c3b sampled, taken to about 0.85): drawn #4a5235 on a weathered canvas coat, the value the Pershing 1a
     hero uses.  The Honest John round is olive drab like its launcher [M289][MF] (the white [HJ3] and orange [HJR] rounds
     are test paint); the Corporal round white (#c9c7bd, 0.85 of the lit white) with the black aft section and band [C03]
     ([C04]'s checks are test marks).  No numbers, unit marks, names or national insignia.
   NOT CONFIRMED: the Honest John rail's length (11.0 m, measured on [HJ3] against the 8.30 m rocket); the pivot and rest
     heights; the jack positions (from [M289][HJ3]); the Corporal tractor's designation and its rear axle (one drawn), its
     tyre size, the trailer's length (scaled on [C02] against the 13.82 m missile), the boom's length, the ladder's
     place, the launch table's size ([C04] against the missile).
   Team colour: C.team exactly: strips on the Honest John's fender tops and on the Corporal's cab roofs.
   Nodes: "roadwheel" groups (one per axle, axle on local Y), "travelpose", "deploypose", "podelev" (both rows), "turret"
     on the Honest John only.  +X forward, +Y left, +Z up, metres, tyres on z = 0, the length centred.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsEarlyRockets = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* -------------------------------------------------------- geometry kit (as js/hero/us_pershing.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin gets metre UVs off each face's dominant axis */
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
  /* a closed solid: the signed volume says whether the faces point out, and they are turned if not */
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
      if (dot(fn, fn) < 1e-16) continue;
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* both sides at once: y0..y1 given for the left (+Y) side, mirrored to the right */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function strip(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB, rot) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU + (rot || 0); a1 = j / seg * TAU + (rot || 0);
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      if (seg > 6) {
        n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
        n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
        bin.tri(pa, pb, pc, n0, n1, n1);
        bin.tri(pa, pc, pd, n0, n1, n0);
      } else { bin.tri(pa, pb, pc); bin.tri(pa, pc, pd); }
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
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
  /* a convex cross-section [y, z] extruded along x0..x1 */
  function profX(bin, pts, x0, x1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) V.push([x1, pts[i][0], pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* a body of revolution about the line through (y, z) along X: profile [[x, r]...] */
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
    V.push([prof[0][0], y, z]); V.push([prof[m - 1][0], y, z]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j]); F.push([m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F, true);
  }
  /* four fins in an X round the axis (y 0, z mz): planform [[x, r]...] (convex), thickness th */
  function finsX(bin, pts, mz, th) {
    var i, k, a, ca, sa, q, hh, V;
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a); V = [];
      for (k = 0; k < 2 * pts.length; k++) {
        q = pts[k % pts.length]; hh = k < pts.length ? -th / 2 : th / 2;
        V.push([q[0], q[1] * ca - hh * sa, mz + q[1] * sa + hh * ca]);
      }
      var n = pts.length, F = [], j;
      for (j = 1; j < n - 1; j++) { F.push([0, j + 1, j]); F.push([n, n + j, n + j + 1]); }
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push([j, k, n + k], [j, n + k, n + j]); }
      solid(bin, V, F);
    }
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

  /* ------------------------------------------------------------ paint
     Olive drab: the base coat, darker and lighter patches drawn nine times so the 512 px tile repeats, rain streaks,
     dust and chipped edges.  Metre UVs (0.34 a metre): the tile spans about 2.9 m. */
  var _tex = {};
  function rnd(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function blob(q, R, x, y, r) {
    var pts = [], a, k, n = 9, rot = R() * Math.PI, c, s, ox, oy, i, px, py;
    for (k = 0; k < n; k++) { a = k / n * TAU; pts.push([Math.cos(a) * r * (0.6 + R() * 0.6) * 1.6, Math.sin(a) * r * (0.6 + R() * 0.6)]); }
    c = Math.cos(rot); s = Math.sin(rot);
    for (ox = -512; ox <= 512; ox += 512) for (oy = -512; oy <= 512; oy += 512) {
      q.beginPath();
      for (i = 0; i < n; i++) {
        px = x + ox + pts[i][0] * c - pts[i][1] * s; py = y + oy + pts[i][0] * s + pts[i][1] * c;
        if (i === 0) q.moveTo(px, py); else q.lineTo(px, py);
      }
      q.closePath(); q.fill();
    }
  }
  var OD = { key: "us50_od", base: "#4a5235", pat: [["#525a3c", 9, 55], ["#40472e", 9, 45]], seed: 1953 };
  function paintTex(THREE, P) {
    if (_tex[P.key] !== undefined) return _tex[P.key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 512; cv.height = 512;
      var q = cv.getContext("2d"), R = rnd(P.seed), i, k;
      q.fillStyle = P.base; q.fillRect(0, 0, 512, 512);
      for (k = 0; k < P.pat.length; k++) {
        q.fillStyle = P.pat[k][0];
        for (i = 0; i < P.pat[k][1]; i++) blob(q, R, R() * 512, R() * 512, P.pat[k][2] * (0.7 + R() * 0.6));
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.06)" : "rgba(170,160,130,0.05)";
        q.fillRect(R() * 512, R() * 512, 1 + R() * 2, 30 + R() * 120);
      }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.05)" : "rgba(235,228,200,0.04)";
        q.fillRect(R() * 512, R() * 512, 4 + R() * 40, 3 + R() * 20);
      }
      /* panel seams and rivet rows, a mud band low down */
      for (i = 0; i < 512; i += 128) {
        q.fillStyle = "rgba(18,18,12,0.16)"; q.fillRect(i, 0, 2, 512); q.fillRect(0, i, 512, 2);
        for (k = 6; k < 512; k += 16) { q.fillStyle = "rgba(230,225,200,0.08)"; q.fillRect(i + 5, k, 2, 2); }
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.key] = t;
    return t;
  }
  function lin(n) {
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, OD);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(OD.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.92, metalness: 0.03 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.white = new THREE.MeshStandardMaterial({ color: 0xc9c7bd, roughness: 0.55, metalness: 0.05 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false),
             white: new Bin(T.white, false) };
  }

  /* a lugged tyre on its dished wheel, centred at y = yc: radius R, width W; two lanes of lugs half a step apart */
  function tyre(bin, rim, R, W, yc) {
    var N = 22, h = W / 2, P = [[-h, R * 0.56, 0, 0], [-h, R * 0.86, 0, 0], [-h * 0.84, R * 0.97, 1, 0], [-h * 0.08, R, 1, 0],
                                [h * 0.08, R, 1, 1], [h * 0.84, R * 0.97, 1, 1], [h, R * 0.86, 0, 0], [h, R * 0.56, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = P.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = P[i][1];
      if (P[i][2] && ((j + P[i][3]) % 2)) r -= R * 0.055;
      a = j / N * TAU;
      V.push([r * Math.cos(a), yc + P[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + P[0][0], 0], [0, yc + P[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    k = yc > 0 ? 1 : -1;                                                     /* the outer face only */
    cyl(rim, [0, yc + k * (h - 0.01), 0], [0, yc + k * (h + 0.015), 0], R * 0.56, R * 0.50, 16, true, false);
    cylY(rim, 0, yc + k * h, yc + k * (h + 0.07), 0, R * 0.22, 10);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      cylY(rim, R * 0.34 * Math.cos(a), yc + k * (h + 0.01), yc + k * (h + 0.035), R * 0.34 * Math.sin(a), 0.026, 4);
    }
  }
  /* one axle: a "roadwheel" group at (x, 0, R), both tyres in one mesh so the engine turns the axle with one rotation.y */
  function axleGroup(THREE, T, R, W, TY, x) {
    var TB = new Bin(T.tyre, false), RB = new Bin(T.tyre, false), col = [], i, geo, g, cr = lin(0x1c1d1f), cw = lin(0x434a30);
    tyre(TB, RB, R, W, TY);
    tyre(TB, RB, R, W, -TY);
    for (i = 0; i < TB.P.length / 3; i++) col.push(cr[0], cr[1], cr[2]);
    for (i = 0; i < RB.P.length / 3; i++) col.push(cw[0], cw[1], cw[2]);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P.concat(RB.P)), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N.concat(RB.N)), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(col), 3));
    g = new THREE.Group();
    g.name = "roadwheel";
    g.position.set(x, 0, R);
    g.add(new THREE.Mesh(geo, T.tyre));
    return g;
  }
  /* a jack: the leg from the housing down to z0 of its pyramid foot (foot height fh, base half width fw) */
  function jack(bin, x, y, zTop, zFoot, fh, fw) {
    cylZ(bin, x, y, zFoot + fh, zTop, 0.06, 8);
    cyl(bin, [x, y, zFoot], [x, y, zFoot + fh], fw * 1.414, 0.10, 4, false, false, Math.PI / 4);
  }

  /* ======================================================================================================
     MGR-1A HONEST JOHN on the M289 launcher, M139 5-ton 6x6 (hull frame: the bumper at +4.50, the tail at -4.47)
     ====================================================================================================== */
  var HJ = { XF: 3.15, XR: [-1.625, -2.995], R: 0.63, W: 0.38, TY: 1.20,        /* 5.46 m to the tandem's middle */
             XP: -3.70, ZT: 1.58, ZP: 2.05, A0: 8 * D2R, EL: 37 * D2R,           /* pivot over the tail; rest 8, raised 45 */
             JX: [4.40, 0.55, -4.28], JY: [1.12, 1.32, 1.10], JZ: [1.06, 1.30, 1.40] };
  /* the rail frame (podelev): u along the rail from the pivot, z up from the pivot; the rocket's axis at MZ */
  var HR = { U0: -0.60, U1: 10.40, ZB: -0.10, ZT: 0.40, HW: 0.24, MZ: 0.86, RT: -0.40, RL: 8.30 };

  function hjChassis(B) {
    var i, s, x;
    /* frame rails and cross members */
    box2(B.dark, -4.45, 4.22, 0.40, 0.50, 0.95, 1.25);
    for (i = 0; i < 6; i++) { x = [-4.30, -3.40, -2.30, -0.90, 1.00, 3.00][i]; box(B.dark, x - 0.06, x + 0.06, -0.50, 0.50, 0.98, 1.20); }
    /* axles, differentials, springs (the tandem's walking-beam springs) */
    var ax = [HJ.XF].concat(HJ.XR);
    for (i = 0; i < 3; i++) {
      cylY(B.dark, ax[i], -1.0, 1.0, HJ.R, 0.08, 8);
      box(B.dark, ax[i] - 0.22, ax[i] + 0.22, -0.24, 0.24, HJ.R - 0.24, HJ.R + 0.22);
    }
    box2(B.dark, HJ.XF - 0.70, HJ.XF + 0.70, 0.46, 0.60, 0.82, 0.92);
    box2(B.dark, HJ.XR[1] - 0.25, HJ.XR[0] + 0.25, 0.46, 0.62, 0.78, 0.90);
    box2(B.dark, -2.45, -2.17, 0.42, 0.66, 0.80, 1.10);
    /* lockers between the front wheel and the tandem [M289], the fuel tank on the right */
    box(B.paint, -0.85, 0.40, 0.66, 1.28, 0.86, 1.36);
    for (i = 0; i < 3; i++) box(B.dark, -0.70 + i * 0.40, -0.48 + i * 0.40, 1.28, 1.30, 1.18, 1.22);
    cylX(B.paint, 0.55, 1.75, -0.98, 1.05, 0.28, 14);
    box(B.dark, 0.70, 0.78, -1.28, -0.70, 0.76, 1.32);
    box(B.dark, 1.52, 1.60, -1.28, -0.70, 0.76, 1.32);
    /* steps under the cab doors */
    box2(B.dark, 0.90, 1.60, 0.70, 1.22, 0.70, 0.74);
  }

  function hjCab(B) {
    var s, i, y;
    /* the hood: flat sides, a slightly crowned top falling to the grille (M39 series) [M289][HJ3] */
    profY(B.paint, [[2.30, 1.30], [4.08, 1.30], [4.12, 1.90], [4.04, 2.00], [2.30, 2.08]], -0.62, 0.62);
    box(B.paint, 2.30, 4.04, -0.50, 0.50, 2.06, 2.10);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 6; i++) box(B.dark, 3.20 + i * 0.11, 3.26 + i * 0.11, s * 0.62 - 0.01, s * 0.62 + 0.01, 1.62, 1.92);
    /* the grille: a dark recess behind vertical bars */
    box(B.dark, 4.12, 4.15, -0.52, 0.52, 1.36, 1.88);
    for (i = 0; i < 9; i++) box(B.paint, 4.15, 4.19, -0.48 + i * 0.12 - 0.02, -0.48 + i * 0.12 + 0.02, 1.38, 1.86);
    box(B.paint, 4.15, 4.20, -0.54, 0.54, 1.86, 1.92);
    /* front fenders: flat tops over the tyres, the front lip down to the bumper, the side skirts [M289] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 2.20, 4.12, s > 0 ? 0.62 : -1.44, s > 0 ? 1.44 : -0.62, 1.38, 1.44);
      strip(B.paint, 4.12, 1.44, 4.30, 1.08, s > 0 ? 0.62 : -1.44, s > 0 ? 1.44 : -0.62, 0.05);
      box(B.paint, 2.20, 2.30, s > 0 ? 0.62 : -1.44, s > 0 ? 1.44 : -0.62, 1.00, 1.44);
      /* headlamps on the fender, a guard over each */
      cylX(B.paint, 3.92, 4.12, s * 0.86, 1.58, 0.12, 14);
      cylX(B.glass, 4.12, 4.14, s * 0.86, 1.58, 0.10, 14);
      bar(B.dark, [4.18, s * 0.74, 1.44], [4.18, s * 0.74, 1.74], 0.03);
      bar(B.dark, [4.18, s * 0.98, 1.44], [4.18, s * 0.98, 1.74], 0.03);
      bar(B.dark, [4.18, s * 0.74, 1.74], [4.18, s * 0.98, 1.74], 0.03);
      /* blackout lamp and the team strip on the fender top */
      box(B.glass, 4.06, 4.12, s * 1.26 - 0.05, s * 1.26 + 0.05, 1.44, 1.52);
      box(B.team, 2.55, 3.85, s > 0 ? 0.92 : -1.30, s > 0 ? 1.30 : -0.92, 1.44, 1.455);
    }
    /* bumper, tow shackles */
    box(B.paint, 4.30, 4.50, -1.26, 1.26, 0.78, 1.08);
    for (s = -1; s <= 1; s += 2) box(B.dark, 4.50, 4.58, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.84, 1.00);
    /* the open cab: floor, walls with the door cut-downs, the seat backs, the steering wheel [HJ3][MF] */
    box(B.dark, 0.66, 2.28, -1.12, 1.12, 1.30, 1.36);
    box(B.paint, 0.62, 0.68, -1.14, 1.14, 1.30, 2.12);                   /* rear wall */
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.11;
      box(B.paint, 0.62, 2.30, y - 0.03, y + 0.03, 1.30, 1.84);
      box(B.paint, 1.20, 1.90, y - 0.035, y + 0.035, 1.84, 1.86);
      box(B.dark, 1.88, 1.92, y - 0.04, y + 0.04, 1.40, 1.82);
      /* seats */
      box(B.dark, 0.70, 1.30, s > 0 ? 0.20 : -1.05, s > 0 ? 1.05 : -0.20, 1.36, 1.72);
      box(B.dark, 0.70, 0.84, s > 0 ? 0.20 : -1.05, s > 0 ? 1.05 : -0.20, 1.72, 2.10);
      /* mirror on its arm */
      bar(B.dark, [2.26, y, 1.86], [2.26, s * 1.38, 2.30], 0.03);
      box(B.dark, 2.22, 2.28, s * 1.38 - 0.10, s * 1.38 + 0.10, 2.22, 2.48);
    }
    /* the cowl and dash, the windscreen frame with its two panes [HJ3][M289] */
    box(B.paint, 2.24, 2.32, -1.14, 1.14, 1.30, 2.14);
    box(B.dark, 2.10, 2.24, -1.00, 1.00, 1.84, 1.96);
    cyl(B.dark, [1.86, 0.55, 2.02], [1.90, 0.55, 2.06], 0.22, 0.22, 14);
    bar(B.dark, [1.92, 0.55, 2.00], [2.15, 0.55, 1.86], 0.05);
    box(B.paint, 2.28, 2.34, -1.12, 1.12, 2.14, 2.20);
    box(B.paint, 2.28, 2.34, -1.12, 1.12, 2.56, 2.62);
    for (i = -1; i <= 1; i++) box(B.paint, 2.28, 2.34, i * 1.07 - 0.04, i * 1.07 + 0.04, 2.14, 2.62);
    box(B.glass, 2.30, 2.32, 0.04, 1.03, 2.20, 2.56);
    box(B.glass, 2.30, 2.32, -1.03, -0.04, 2.20, 2.56);
    /* the folded canvas top over the rear wall */
    cylY(B.paint, 0.70, -1.05, 1.05, 2.16, 0.07, 8);
  }

  function hjDeck(B) {
    var s, i, x;
    /* the launcher deck over the tandem, its side valances, steps and stowage [M289][HJ3] */
    box(B.paint, -4.47, 0.58, -1.40, 1.40, 1.42, 1.52);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -4.47, 0.58, s > 0 ? 1.34 : -1.40, s > 0 ? 1.40 : -1.34, 1.22, 1.42);
      for (i = 0; i < 5; i++) { x = -4.0 + i * 1.05; box(B.dark, x - 0.03, x + 0.03, s > 0 ? 1.40 : -1.41, s > 0 ? 1.41 : -1.40, 1.24, 1.50); }
      /* the grab rail along the deck edge */
      bar(B.dark, [-4.30, s * 1.30, 1.52], [-4.30, s * 1.30, 1.92], 0.04);
      bar(B.dark, [-0.20, s * 1.30, 1.52], [-0.20, s * 1.30, 1.92], 0.04);
      bar(B.dark, [-4.30, s * 1.30, 1.92], [-0.20, s * 1.30, 1.92], 0.04);
      /* stowage chests beside the rail */
      box(B.paint, -2.90, -1.00, s > 0 ? 0.62 : -1.22, s > 0 ? 1.22 : -0.62, 1.52, 1.78);
      box(B.dark, -2.85, -1.05, s > 0 ? 0.60 : -1.24, s > 0 ? 1.24 : -0.60, 1.76, 1.80);
      /* the elevating struts' feet behind the cab [HJ3] (the struts themselves are not drawn) */
      box(B.dark, 0.05, 0.45, s * 0.70 - 0.10, s * 0.70 + 0.10, 1.52, 1.86);
      cylY(B.dark, 0.25, s * 0.56, s * 0.84, 1.76, 0.07, 10);
      /* tail lamps, the rear step */
      box(B.glass, -4.50, -4.47, s * 1.10 - 0.08, s * 1.10 + 0.08, 1.30, 1.40);
    }
    box(B.dark, -4.52, -4.47, -0.80, 0.80, 1.00, 1.20);
    /* the pedestal under the rail's pivot at the tail */
    box(B.paint, -4.20, -3.20, -0.70, 0.70, 1.52, HJ.ZT - 0.02);
    cylZ(B.dark, HJ.XP, 0, HJ.ZT - 0.04, HJ.ZT, 0.62, 20);
  }

  /* the rail rest standing on the bumper: two posts, the cross head with its saddle, braces back to the frame [M289][HJ3].
     Its top meets the rail's underside at the 8 deg rest. */
  function hjFront(B) {
    var s, xr = 4.30, zs = HJ.ZP + (xr - HJ.XP) * Math.tan(HJ.A0) + HR.ZB / Math.cos(HJ.A0);
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [xr, s * 0.55, 1.08], [xr, s * 0.36, zs - 0.10], 0.14);
      bar(B.paint, [xr, s * 0.50, 1.40], [3.90, s * 0.40, 1.95], 0.06);
      bar(B.dark, [xr, s * 0.45, 1.70], [xr, -s * 0.45, 2.40], 0.05);
    }
    box(B.paint, xr - 0.10, xr + 0.10, -0.48, 0.48, zs - 0.16, zs - 0.06);
    box(B.dark, xr - 0.16, xr + 0.16, -0.30, 0.30, zs - 0.06, zs - 0.005);
    box2(B.dark, xr - 0.16, xr + 0.16, 0.26, 0.32, zs - 0.06, zs + 0.12);
    /* the gear case on the rest's cross head [M289] */
    box(B.dark, xr - 0.24, xr + 0.04, 0.32, 0.62, zs - 0.40, zs - 0.08);
    cylY(B.dark, xr - 0.10, 0.62, 0.78, zs - 0.24, 0.07, 10);
  }

  function hjJacks(B, down) {
    var i, s;
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      if (down) jack(B.dark, HJ.JX[i], s * HJ.JY[i], HJ.JZ[i], 0.0, 0.16, 0.30);
      else jack(B.dark, HJ.JX[i], s * HJ.JY[i], HJ.JZ[i], 0.62, 0.16, 0.30);
    }
  }
  function hjJackHousings(B) {
    var i, s;
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, HJ.JX[i], s * HJ.JY[i], HJ.JZ[i] - 0.40, HJ.JZ[i] + 0.10, 0.10, 10);
      box(B.dark, HJ.JX[i] - 0.06, HJ.JX[i] + 0.06, s > 0 ? 0.50 : -HJ.JY[i], s > 0 ? HJ.JY[i] : -0.50, HJ.JZ[i] - 0.12, HJ.JZ[i] - 0.02);
    }
  }

  /* the rail and the rocket, in the rail frame (origin the pivot pin) */
  function hjRail(B) {
    var i, s, u, H = HR;
    /* the girder: a deep box, its front end tapering to a point under the top flange [M289] */
    profY(B.paint, [[H.U0, H.ZB], [H.U1 - 1.30, H.ZB], [H.U1, H.ZT - 0.12], [H.U1, H.ZT], [H.U0, H.ZT]], -H.HW, H.HW);
    box(B.paint, H.U0, H.U1, -H.HW - 0.07, H.HW + 0.07, H.ZT, H.ZT + 0.05);
    /* web stiffeners down the sides, the guide rails on top */
    for (i = 0; i < 12; i++) {
      u = H.U0 + 0.4 + i * 0.85;
      if (u > H.U1 - 1.4) break;
      box2(B.dark, u - 0.03, u + 0.03, H.HW, H.HW + 0.02, H.ZB + 0.02, H.ZT - 0.02);
    }
    box2(B.dark, H.U0 + 0.10, H.U1 - 0.05, 0.10, 0.16, H.ZT + 0.05, H.ZT + 0.10);
    /* the heel: the trunnion cheeks round the pin */
    profY(B.paint, [[-0.45, -0.25], [0.45, -0.25], [0.60, H.ZB], [-0.55, H.ZB]], -H.HW, H.HW);
    cylY(B.dark, 0, -0.42, 0.42, 0, 0.10, 12);
    /* the grating walkway along the left side under the rocket, its brackets [M289] */
    box(B.dark, 0.20, 4.80, H.HW + 0.02, H.HW + 0.55, H.ZB + 0.06, H.ZB + 0.10);
    for (i = 0; i < 12; i++) box(B.paint, 0.25 + i * 0.38, 0.29 + i * 0.38, H.HW + 0.02, H.HW + 0.55, H.ZB + 0.10, H.ZB + 0.12);
    for (i = 0; i < 4; i++) bar(B.dark, [0.4 + i * 1.4, H.HW, H.ZT - 0.10], [0.4 + i * 1.4, H.HW + 0.52, H.ZB + 0.08], 0.04);
    /* the elevating struts' heads under the rail [HJ3] */
    box(B.dark, 5.00, 5.40, -0.30, 0.30, H.ZB - 0.16, H.ZB);
    /* the shoes the rocket rides on */
    [0.30, 3.40].forEach(function (uu) {
      box(B.dark, uu, uu + 0.36, -0.14, 0.14, H.ZT + 0.10, H.MZ - 0.24);
    });
    box(B.dark, 5.20, 5.50, -0.14, 0.14, H.ZT + 0.10, H.MZ - 0.34);
    /* the rocket: nozzle, the 22 7/8 in motor (5.015 m), the joint ring with its spin motors, the flare to the 30 in
       warhead, the ogive [M289][HJ3] */
    var t0 = H.RT, MZ = H.MZ;
    revolve(B.paint, [[t0, 0.20], [t0 + 0.04, 0.25], [t0 + 0.20, 0.27], [t0 + 0.40, 0.29], [t0 + 5.00, 0.29], [t0 + 5.38, 0.375],
                      [t0 + 6.55, 0.381], [t0 + 6.95, 0.365], [t0 + 7.35, 0.315], [t0 + 7.70, 0.235], [t0 + 7.98, 0.14],
                      [t0 + 8.20, 0.05], [t0 + 8.30, 0.0]], 0, MZ, 24);
    cyl(B.dark, [t0 - 0.05, 0, MZ], [t0 + 0.02, 0, MZ], 0.16, 0.21, 16);
    revolve(B.dark, [[t0 + 5.00, 0.296], [t0 + 5.08, 0.296]], 0, MZ, 24);
    revolve(B.dark, [[t0 + 5.38, 0.386], [t0 + 5.46, 0.386]], 0, MZ, 24);
    for (i = 0; i < 4; i++) {
      var a = i * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
      cyl(B.dark, [t0 + 5.12, 0.30 * ca, MZ + 0.30 * sa], [t0 + 5.34, 0.36 * ca, MZ + 0.36 * sa], 0.045, 0.05, 8);
    }
    /* the four big fins in an X, 2.77 m over the tips, the trailing edge at the tail, the leading edge swept [HJ3][HJR] */
    finsX(B.paint, [[t0 + 0.04, 0.27], [t0 + 1.30, 0.27], [t0 + 0.62, 1.385], [t0 + 0.06, 1.385]], MZ, 0.05);
    finsX(B.dark, [[t0 + 0.06, 1.33], [t0 + 0.62, 1.33], [t0 + 0.60, 1.39], [t0 + 0.06, 1.39]], MZ, 0.056);
  }

  function buildHJ(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i;
    hjChassis(HB); hjCab(HB); hjDeck(HB); hjFront(HB); hjJackHousings(HB);
    flush(THREE, g, HB);
    g.add(axleGroup(THREE, T, HJ.R, HJ.W, HJ.TY, HJ.XF));
    for (i = 0; i < 2; i++) g.add(axleGroup(THREE, T, HJ.R, HJ.W, HJ.TY, HJ.XR[i]));
    var TR = bins(T), DP = bins(T), trg = new THREE.Group(), dpg = new THREE.Group();
    hjJacks(TR, false); hjJacks(DP, true);
    trg.name = "travelpose"; flush(THREE, trg, TR); g.add(trg);
    dpg.name = "deploypose"; dpg.visible = false; flush(THREE, dpg, DP); g.add(dpg);
    /* the launcher mount: "turret" on the pedestal, the rail's rest angle, the elevating rail */
    var tur = new THREE.Group(), TB = bins(T), base = new THREE.Group(), E = new THREE.Group(), EB = bins(T), s;
    tur.name = "turret";
    tur.position.set(HJ.XP, 0, HJ.ZT);
    for (s = -1; s <= 1; s += 2) profY(TB.paint, [[-0.40, 0], [0.40, 0], [0.16, HJ.ZP - HJ.ZT + 0.14], [-0.16, HJ.ZP - HJ.ZT + 0.14]], s * 0.30, s * 0.46);
    cylZ(TB.dark, 0, 0, 0, 0.08, 0.55, 20);
    flush(THREE, tur, TB);
    base.name = "railbase";
    base.position.set(0, 0, HJ.ZP - HJ.ZT);
    base.rotation.y = -HJ.A0;
    hjRail(EB);
    E.name = "podelev";
    flush(THREE, E, EB);
    E.userData.el = HJ.EL;                               /* 8 deg rest + 37 = the 45 deg of [HJ7][HJ4] */
    /* mouth x, y, z and the rear x in this group's frame: the motor lights at the rocket's base */
    E.userData.cells = [[HR.RT + 0.30, 0, HR.MZ, HR.RT - 0.10]];
    base.add(E); tur.add(base); g.add(tur);
    for (i = 0; i < g.children.length; i++) g.children[i].position.x += HJ.OX;
    g.name = "us_honest_john";
    return g;
  }

  /* ======================================================================================================
     MGM-5 CORPORAL on its erector semitrailer and tractor (hull frame: the tractor's front axle at x = 0)
     ====================================================================================================== */
  var CO = { XA: 0.0, XB: -3.70, RA: 0.80, WA: 0.56, TYA: 1.02,                   /* tractor axles, big single tyres */
             XT: -11.55, RT: 0.72, WT: 0.52, TYT: 1.10,                         /* the trailer's single axle */
             XH: -12.75, ZH: 2.35, A0: 6 * D2R, DR: 1.25,                       /* the boom's pivot, its rest, the disc */
             MZ: 0.62, U0: -0.90, ML: 13.82, MR: 0.381, UB: 10.80 };

  function arcRoof(bin, x0, x1, yc, hw, z0, rise) {
    var n = 6, i, a0, a1, y0, y1, za, zb;
    for (i = 0; i < n; i++) {
      a0 = Math.PI * i / n; a1 = Math.PI * (i + 1) / n;
      y0 = yc + hw * Math.cos(a0); y1 = yc + hw * Math.cos(a1);
      za = z0 + rise * Math.sin(a0); zb = z0 + rise * Math.sin(a1);
      profX(bin, [[y0, za], [y1, zb], [y1, zb + 0.05], [y0, za + 0.05]], x0, x1);
    }
  }

  function corTractor(B) {
    var s, i, yc, x0 = -1.20, x1 = 0.50, zf = 2.02, zr = 3.00;
    /* chassis, axles */
    box2(B.dark, -4.70, 1.90, 0.40, 0.52, 0.90, 1.30);
    for (i = 0; i < 2; i++) {
      var ax = [CO.XA, CO.XB][i];
      cylY(B.dark, ax, -1.0, 1.0, CO.RA, 0.10, 8);
      box(B.dark, ax - 0.28, ax + 0.28, -0.28, 0.28, CO.RA - 0.28, CO.RA + 0.26);
      box2(B.dark, ax - 0.70, ax + 0.70, 0.46, 0.62, CO.RA + 0.10, CO.RA + 0.22);
    }
    /* the big box body: the engine housing ahead and over the front axle, flat sides, a belt rib, the bumper [CMV][C02] */
    profY(B.paint, [[0.85, 0.72], [2.15, 0.72], [2.22, 0.80], [2.22, 1.82], [2.05, 2.02], [0.85, 2.02]], -1.30, 1.30);
    profY(B.paint, [[-1.25, 1.66], [0.85, 1.66], [0.85, 2.02], [-1.25, 2.02]], -1.36, 1.36);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.25, 2.20, s > 0 ? 1.30 : -1.38, s > 0 ? 1.38 : -1.30, 1.40, 1.48);        /* the belt rib */
      box(B.paint, -1.25, -0.95, s > 0 ? 1.20 : -1.36, s > 0 ? 1.36 : -1.20, 1.10, 1.66);      /* the arch's rear cheek */
      for (i = 0; i < 7; i++) box(B.dark, 1.05 + i * 0.13, 1.10 + i * 0.13, s * 1.30 - 0.01, s * 1.30 + 0.01, 1.55, 1.90);
      /* headlamps on the top front corners [CMV] */
      cylX(B.paint, 1.95, 2.20, s * 1.05, 2.12, 0.11, 12);
      cylX(B.glass, 2.20, 2.22, s * 1.05, 2.12, 0.09, 12);
    }
    box(B.dark, 2.22, 2.26, -0.90, 0.90, 1.00, 1.70);
    for (i = 0; i < 8; i++) box(B.paint, 2.26, 2.30, -0.84 + i * 0.24 - 0.03, -0.84 + i * 0.24 + 0.03, 1.02, 1.68);
    box(B.paint, 2.22, 2.40, -1.32, 1.32, 0.66, 0.92);
    for (s = -1; s <= 1; s += 2) box(B.dark, 2.40, 2.48, s * 0.70 - 0.07, s * 0.70 + 0.07, 0.72, 0.88);
    /* the TWO cabs side by side, each with its arched roof, open-framed sides and front windows [CMV][C02] */
    for (s = -1; s <= 1; s += 2) {
      yc = s * 0.74;
      /* the waist is low and the rest is glass in a light frame [CMV] */
      box(B.paint, x0, x1, yc - 0.52, yc + 0.52, zf, 2.34);
      box(B.dark, x0 + 0.05, x1 - 0.05, yc - 0.47, yc + 0.47, 2.34, 2.36);
      [x0, x0 + 0.85, x1].forEach(function (xx) {
        box(B.paint, xx - 0.04, xx + 0.04, yc - 0.52, yc - 0.46, 2.34, zr);
        box(B.paint, xx - 0.04, xx + 0.04, yc + 0.46, yc + 0.52, 2.34, zr);
      });
      box(B.paint, x1 - 0.04, x1 + 0.04, yc - 0.03, yc + 0.03, 2.34, zr);
      box(B.paint, x0, x1, yc - 0.52, yc + 0.52, 2.62, 2.65);
      box(B.glass, x1 - 0.02, x1 + 0.01, yc - 0.46, yc - 0.04, 2.37, zr - 0.04);
      box(B.glass, x1 - 0.02, x1 + 0.01, yc + 0.04, yc + 0.46, 2.37, zr - 0.04);
      box(B.glass, x0 + 0.04, x0 + 0.06, yc - 0.40, yc + 0.40, 2.40, zr - 0.06);
      /* the side windows on both sides; the inner sides face each other across the gap */
      box(B.glass, x0 + 0.06, x1 - 0.06, yc + 0.49, yc + 0.50, 2.38, zr - 0.04);
      box(B.glass, x0 + 0.06, x1 - 0.06, yc - 0.50, yc - 0.49, 2.38, zr - 0.04);
      /* seat backs seen through the glass */
      box(B.dark, x0 + 0.20, x0 + 0.40, yc - 0.30, yc + 0.30, zf, 2.60);
      box(B.paint, x0 + 0.04, x1 - 0.04, yc - 0.52, yc + 0.52, zr - 0.04, zr);
      arcRoof(B.paint, x0 - 0.04, x1 + 0.04, yc, 0.54, zr, 0.20);
      box(B.team, x0 + 0.25, x1 - 0.25, yc - 0.20, yc + 0.20, zr + 0.22, zr + 0.24);
      /* steps up the body side to the door */
      for (i = 0; i < 2; i++) box(B.dark, -1.05, -0.65, s > 0 ? 1.36 : -1.44, s > 0 ? 1.44 : -1.36, 1.0 + i * 0.36, 1.04 + i * 0.36);
      /* mirror */
      bar(B.dark, [x1, s * 1.26, 2.6], [x1 + 0.2, s * 1.50, 2.8], 0.03);
      box(B.dark, x1 + 0.17, x1 + 0.23, s * 1.50 - 0.10, s * 1.50 + 0.10, 2.70, 2.95);
    }
    /* the deck behind the cabs with the spare tyre lying on it [C02], the fifth wheel over the rear axle */
    box(B.paint, -4.75, -1.20, -1.30, 1.30, 1.56, 1.66);
    for (s = -1; s <= 1; s += 2) box(B.paint, -4.75, -2.70, s > 0 ? 1.22 : -1.36, s > 0 ? 1.36 : -1.22, 1.30, 1.66);
    cyl(B.dark, [-1.95, 0, 1.66], [-1.95, 0, 2.18], 0.78, 0.78, 22);
    cylZ(B.paint, -1.95, 0, 2.18, 2.20, 0.42, 16);
    cylZ(B.dark, -1.95, 0, 2.20, 2.24, 0.14, 10);
    box(B.dark, -4.25, -3.15, -0.70, 0.70, 1.66, 1.82);
  }

  function corTrailer(B) {
    var s, i, x;
    /* the gooseneck over the fifth wheel, the drop to the low beam [C02] */
    profY(B.paint, [[-4.55, 1.84], [-2.90, 1.84], [-2.90, 2.28], [-4.55, 2.28]], -0.55, 0.55);
    profY(B.paint, [[-5.40, 1.00], [-4.55, 1.84], [-4.55, 2.28], [-5.40, 1.50]], -0.55, 0.55);
    cylZ(B.dark, -3.70, 0, 1.70, 1.84, 0.12, 10);
    /* the long low beam: two side members and the top plate */
    box2(B.paint, -10.35, -5.40, 0.30, 0.55, 1.00, 1.50);
    box(B.paint, -10.35, -5.40, -0.30, 0.30, 1.38, 1.48);
    for (i = 0; i < 7; i++) { x = -9.9 + i * 0.75; box(B.dark, x - 0.04, x + 0.04, -0.56, 0.56, 1.02, 1.48); }
    /* the landing legs under the gooseneck (up) */
    for (s = -1; s <= 1; s += 2) { box(B.dark, -5.20, -5.05, s * 0.50 - 0.07, s * 0.50 + 0.07, 0.60, 1.10); box(B.dark, -5.30, -4.95, s * 0.50 - 0.12, s * 0.50 + 0.12, 0.54, 0.60); }
    /* the arch over the single axle, rising to the pivot housing [C02][CMV][C05] */
    profY(B.paint, [[-10.35, 1.00], [-10.35, 1.50], [-10.85, 2.05], [-12.40, 2.05], [-12.40, 1.62], [-10.85, 1.62]], -0.62, 0.62);
    for (s = -1; s <= 1; s += 2) {
      /* the fender over the big tyre and its spring hangers */
      box(B.paint, CO.XT - 0.95, CO.XT + 0.95, s > 0 ? 0.80 : -1.44, s > 0 ? 1.44 : -0.80, 1.56, 1.62);
      strip(B.paint, CO.XT + 0.95, 1.60, CO.XT + 1.20, 1.25, s > 0 ? 0.80 : -1.44, s > 0 ? 1.44 : -0.80, 0.05);
      box(B.dark, CO.XT - 0.40, CO.XT + 0.40, s > 0 ? 0.55 : -0.80, s > 0 ? 0.80 : -0.55, 0.95, 1.62);
      /* the pivot housing cheeks and the two big discs on the boom's pivot [C05] */
      profY(B.paint, [[-12.40, 1.62], [-12.40, 2.05], [CO.XH + 0.35, CO.ZH], [CO.XH - 0.45, CO.ZH], [CO.XH - 0.45, 1.62]], s * 0.40, s * 0.60);
    }
    cylY(B.dark, CO.XT, -1.0, 1.0, CO.RT, 0.10, 8);
    box(B.dark, CO.XH - 0.70, -12.20, -0.62, 0.62, 1.30, 1.62);
    /* the jack housings at the rear corners [CMV] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, CO.XH - 0.20, s * 1.12, 1.10, 1.72, 0.10, 10);
      box(B.dark, CO.XH - 0.30, CO.XH - 0.10, s > 0 ? 0.62 : -1.12, s > 0 ? 1.12 : -0.62, 1.50, 1.62);
      box(B.glass, CO.XH - 0.66, CO.XH - 0.62, s * 0.30 - 0.08, s * 0.30 + 0.08, 1.40, 1.52);
    }
  }
  /* the discs ride the pivot pin with the boom (their rim spokes turn), so they are the boom's [C05] */
  function corDiscs(B) {
    var s, k, a;
    for (s = -1; s <= 1; s += 2) {
      cylY(B.paint, 0, s * 0.64, s * 0.72, 0, CO.DR, 32);
      cylY(B.dark, 0, s * 0.72, s * 0.75, 0, CO.DR * 0.97, 32);
      cylY(B.paint, 0, s * 0.75, s * 0.82, 0, 0.36, 16);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU + 0.3;
        bar(B.paint, [0.36 * Math.cos(a), s * 0.76, 0.36 * Math.sin(a)], [(CO.DR - 0.08) * Math.cos(a), s * 0.76, (CO.DR - 0.08) * Math.sin(a)], 0.08);
      }
    }
    cylY(B.dark, 0, -0.86, 0.86, 0, 0.14, 12);
  }

  /* the boom and the missile, in the boom frame (origin the pivot pin) */
  function corBoom(B) {
    var i, s, k, u, MZ = CO.MZ, t0 = CO.U0, H = 0.32;
    corDiscs(B);
    /* the box boom from the hub to under the forward collar, its rails, the hub arms [C05] */
    profY(B.paint, [[-0.45, -0.30], [CO.UB - 0.40, -0.30], [CO.UB, -0.10], [CO.UB, 0.05], [-0.45, 0.05]], -H, H);
    box2(B.dark, 0.0, CO.UB - 0.10, 0.10, 0.17, 0.05, 0.10);
    for (s = -1; s <= 1; s += 2) profY(B.paint, [[-0.40, -0.30], [0.40, -0.30], [1.60, -0.10], [1.60, 0.05], [-0.40, 0.25]], s * 0.32, s * 0.62);
    for (i = 0; i < 10; i++) { u = 1.0 + i * 1.0; box2(B.dark, u - 0.03, u + 0.03, H, H + 0.02, -0.28, 0.03); }
    /* the cradles under the missile */
    [0.6, 4.4, 8.2].forEach(function (uu) {
      for (k = 0; k < 6; k++) {
        var a0 = Math.PI * 1.15 + k / 6 * Math.PI * 0.70, a1 = Math.PI * 1.15 + (k + 1) / 6 * Math.PI * 0.70;
        bar(B.dark, [uu, 0.44 * Math.cos(a0), MZ + 0.44 * Math.sin(a0)], [uu, 0.44 * Math.cos(a1), MZ + 0.44 * Math.sin(a1)], 0.10);
      }
      box(B.dark, uu - 0.05, uu + 0.05, -0.12, 0.12, 0.05, MZ - 0.40);
    });
    /* the two C clamp collars round the missile, near the tail and at the nose, on their arms [C05][C02] */
    [2.20, 10.30].forEach(function (uu, j) {
      var rr = (j ? 0.27 : MR()) + 0.05;
      for (k = 0; k < 12; k++) {
        var a0 = -Math.PI * 0.20 + k / 12 * Math.PI * 1.40, a1 = -Math.PI * 0.20 + (k + 1) / 12 * Math.PI * 1.40;
        bar(B.dark, [uu, rr * Math.cos(a0), MZ + rr * Math.sin(a0)], [uu, rr * Math.cos(a1), MZ + rr * Math.sin(a1)], 0.12);
      }
      for (s = -1; s <= 1; s += 2) bar(B.dark, [uu, s * (rr + 0.02) * Math.cos(Math.PI * 0.2), MZ - rr * Math.sin(Math.PI * 0.2)], [uu, s * 0.28, 0.0], 0.08);
    });
    /* the lattice ladder along the right of the boom on its stand-offs [CMV] */
    var LY = -0.95, LZ0 = 0.10, LZ1 = 0.42;
    for (i = 0; i < 2; i++) bar(B.paint, [0.6, LY, i ? LZ1 : LZ0], [CO.UB - 0.3, LY, i ? LZ1 : LZ0], 0.05);
    for (i = 0; i < 26; i++) { u = 0.8 + i * 0.36; bar(B.dark, [u, LY, LZ0], [u, LY, LZ1], 0.03); }
    for (i = 0; i < 5; i++) { u = 1.0 + i * 2.2; bar(B.dark, [u, -H, -0.05], [u, LY, LZ0 + 0.02], 0.04); }
    /* the missile: 13.82 m, 30 in; black aft section to 2.25 m, one black band 2.55-3.10 m, white to the nose [C03] */
    revolve(B.dark, [[t0, 0.30], [t0 + 0.30, 0.36], [t0 + 2.25, 0.381]], 0, MZ, 24);
    revolve(B.white, [[t0 + 2.25, 0.381], [t0 + 2.55, 0.381]], 0, MZ, 24);
    revolve(B.dark, [[t0 + 2.55, 0.382], [t0 + 3.10, 0.382]], 0, MZ, 24);
    revolve(B.white, [[t0 + 3.10, 0.381], [t0 + 10.55, 0.381], [t0 + 11.05, 0.37], [t0 + 11.85, 0.335], [t0 + 12.55, 0.265],
                      [t0 + 13.10, 0.17], [t0 + 13.55, 0.075], [t0 + 13.82, 0.0]], 0, MZ, 24);
    cyl(B.dark, [t0 - 0.06, 0, MZ], [t0 + 0.02, 0, MZ], 0.20, 0.28, 14);
    /* four swept fins in an X, 7 ft over the tips, their trailing edge at the tail [C02][C04] */
    finsX(B.white, [[t0 + 0.05, 0.37], [t0 + 2.00, 0.37], [t0 + 0.95, 1.065], [t0 + 0.08, 1.065]], MZ, 0.05);
  }
  function MR() { return CO.MR; }

  /* rear jacks: up on the march, down when set up [CMV]; set up, the launch table under the round's tail as it comes
     upright: a ring platform on four splayed legs, the flame deflector cone under it [C04] */
  function corJacks(B, down) {
    for (var s = -1; s <= 1; s += 2) jack(B.dark, CO.XH - 0.20, s * 1.12, 1.30, down ? 0.0 : 0.60, 0.14, 0.26);
  }
  function corTable(B) {
    var XC = CO.XH - CO.MZ - 0.0, ZT = CO.ZH + CO.U0 - 0.06, k, a, cx, cy;
    cyl(B.paint, [XC, 0, ZT - 0.12], [XC, 0, ZT], 0.64, 0.64, 20);
    cyl(B.dark, [XC, 0, ZT - 0.70], [XC, 0, ZT - 0.12], 0.10, 0.50, 16);
    for (k = 0; k < 4; k++) {
      a = Math.PI / 4 + k * Math.PI / 2; cx = Math.cos(a); cy = Math.sin(a);
      bar(B.paint, [XC + 0.55 * cx, 0.55 * cy, ZT - 0.10], [XC + 0.92 * cx, 0.92 * cy, 0.08], 0.10);
      cyl(B.dark, [XC + 0.92 * cx, 0.92 * cy, 0], [XC + 0.92 * cx, 0.92 * cy, 0.06], 0.16, 0.14, 10);
    }
  }

  function buildCorporal(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i;
    corTractor(HB); corTrailer(HB);
    flush(THREE, g, HB);
    g.add(axleGroup(THREE, T, CO.RA, CO.WA, CO.TYA, CO.XA));
    g.add(axleGroup(THREE, T, CO.RA, CO.WA, CO.TYA, CO.XB));
    g.add(axleGroup(THREE, T, CO.RT, CO.WT, CO.TYT, CO.XT));
    var TR = bins(T), DP = bins(T), trg = new THREE.Group(), dpg = new THREE.Group();
    corJacks(TR, false); corJacks(DP, true); corTable(DP);
    trg.name = "travelpose"; flush(THREE, trg, TR); g.add(trg);
    dpg.name = "deploypose"; dpg.visible = false; flush(THREE, dpg, DP); g.add(dpg);
    var base = new THREE.Group(), E = new THREE.Group(), EB = bins(T);
    base.name = "boombase";
    base.position.set(CO.XH, 0, CO.ZH);
    base.rotation.y = -CO.A0;
    corBoom(EB);
    E.name = "podelev";
    flush(THREE, E, EB);
    E.userData.el = Math.PI / 2 - CO.A0;                  /* upright onto the launch table [C04] */
    E.userData.cells = [[CO.U0 + 0.30, 0, CO.MZ, CO.U0 - 0.10]];
    base.add(E); g.add(base);
    for (i = 0; i < g.children.length; i++) g.children[i].position.x += CO.OX;
    g.name = "us_corporal";
    return g;
  }

  HJ.OX = -0.99; CO.OX = 5.85;                          /* centre the measured length on the origin */
  return { buildHJ: buildHJ, buildCorporal: buildCorporal, HJ: HJ, CO: CO };
})();

UNIT_MODELS["nato_e50_mlrs"] = { len: 11.14, build: HeroUsEarlyRockets.buildHJ };
UNIT_MODELS["nato_e50_tel"] = { len: 16.65, build: HeroUsEarlyRockets.buildCorporal };
