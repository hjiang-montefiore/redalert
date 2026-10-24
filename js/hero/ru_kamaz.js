/* ===== ru_kamaz.js - HERO model: the KamAZ-6350 "Mustang" 8x8 army cargo truck with its canvas tilt ========
   Full-quality redo (2026-10-24).  One key, kept: supply_p "KamAZ Supply Truck" (js/rules.js, full "KamAZ-6350";
   js/armour_specs.js "KamAZ-6350 Mustang 8x8 Cargo Truck"; the row's desc says 8x8).  The row names the 8x8 KamAZ-6350,
   so that is the truck drawn, not the 6x6 KamAZ-5350 or the 4310.  No era rows exist for supply_p; one model serves.

   Sources (Wikimedia Commons, at width 960; ru.wikipedia "KAMAZ-6350" for the figures):
     [S]  "TB2015ExhibitionP1-58" (Vitaly Kuzmin, Army-2015) - PORT SIDE, square on, plain olive: the side drawing.
          Measured at 92.5 px a metre off the published wheelbase (the three gaps agree within 2 per cent).
     [P]  "Army2016-479" (Kuzmin) - port side three-quarter, plain olive: board stanchions, the tilt and its lashing.
     [F]  "Army2016-478" (Kuzmin) - front-left three-quarter, plain olive: cab face, bumper, mirrors, roof lamps.
     [C]  "KamAZ-6350 truck, 2011" - front-left three-quarter: the grille slats between the round headlamps, the two-pane
          windscreen, three amber roof lamps, the lamp on the port front corner of the roof, the black front arch.
     [R]  "Interpolitex 2011 (402-32)" (Kuzmin) - starboard rear three-quarter: the SPARE WHEEL upright behind the cab on
          the starboard side, the black intake head behind the cab top, the rear mud flaps, the tank under the body.
     [O]  "KAMAZ-6350-376 truck in 2012" - the same cab in plain olive (paint check).
     [A]  "KAMAZ-6350 - Army 2024-08-14 03" - the same cab under an anti-drone cage (cage not drawn).
     [K]  "KAMAZ-6350 chassis" - a later chassis with a different cab; used for the wheel stations only.
   Published (ru.wikipedia, technical data): length 9850 mm, width 2500, height 3080 to the cab and 3260 to the tilt,
     wheelbase 1940 + 3340 + 1320, track 2050, ground clearance 390, tyres 425/85R21, diskless wheels, cab-over cab
     ("bezkapotnaya") without sleeper, steel drop-side platform, tanks 350 + 210 l, in production from 2003-2004.
   CONFIRMED from the old header: the dimensions, wheelbase, track, tyres, the flat cab-over cab with a two-pane
     windscreen and a centre post, the grille of horizontal slats with a round headlamp each side, the plate bumper with
     tow eyes, the black arches, the steel drop sides and the tilt over bows.
   CORRECTED: the old model put a black arch over all four axles; the photographs show one only, the big front fender
     over axle 1 that runs down behind the wheel [S][C][R], and mud flaps behind axles 2 and 4.  The old cab sat on a
     narrow lower block; the real cab is full width down to its sill over the fender [S][F].  The old body had no
     spare wheel, no intake and no air cleaner, which [S][R] show.  "KAMAZ-6350 chassis.jpg" shows a later cab, not
     the one on the cargo trucks of [S][P][F].  The old "round tank strapped under the body" is a flat-sided tank [S][R].

   Recognition list (what each rests on; where it is in the code):
     1. 8x8 with the axles 1.94 + 3.34 + 1.32 m apart: two close front axles, a long gap, a close rear pair [S][P]: AX.
     2. The flat-faced cab-over cab, full width, its face raked about 9 degrees above a near-vertical grille panel [S][C]:
        CAB stations, addCab.
     3. The big two-pane windscreen with a centre post and two wipers [C][F]: addCab.
     4. The grille panel: four horizontal slats between two round headlamps, amber lamps at the corners [C][O]: addCab.
     5. The deep plate bumper with two openings, lamps at its ends and the tow hooks under it [C][F]: addCab.
     6. The black front fender over axle 1, flat on top, running down behind the wheel [S][C][R]: addChassis (ribbon).
     7. The tall mirrors on frames off the A-pillars, a small one above each [C][F][R]: addCab.
     8. Three amber lamps on the roof front and the round lamp on the port front corner [C][S][O]: addCab.
     9. Behind the cab: the black intake pipe up the port corner to the louvred intake head, the round air cleaner, and
        the spare wheel upright on the starboard side [S][R]: addBehindCab.
    10. The long drop-side body: ribbed steel boards split by stanchions into three bays, small amber reflectors along the
        foot [S][P]: addBody.
    11. The canvas tilt, square in section with rounded shoulders, sagging between the bows, its hem roped to the board
        top in a zig-zag [S][P][C]: addTilt.
    12. The big single 425/85R21 tyres with heavy lugs on black diskless wheels, hub and clamp ring [S][C]: tyre().
   Paint: plain olive, as [S][P][F][O] show (the three-tone scheme of [C] and [R] is a later field scheme and is not
     drawn).  Sampled [S]: cab side in sun #6f7269 (a cool sky cast), board in shade #53564d, tilt #636558 and #5f6355.
     Drawn: body paint #545a46 (about 0.8 of the lit sample, its hue kept to the olive the shaded samples show), canvas
     #5b5e4c (0.9 of the tilt sample).  No markings, numbers or plates; the KAMAZ letters are not drawn.
   NOT drawn (not confirmed for this truck or a fitting of one photograph only): the anti-drone cage of [A], a winch,
     the CTIS hoses, the exhaust route, any load.  Estimated: the intake head's width (seen from both sides [S][R], so
     drawn across the cab back), the spare's carrier post (only its foot shows in [R]), which tank is the 350 l one
     (the larger box is to starboard in [R]), the six rim clamps (not countable at 960 px), the frame and springs.
   DATA NOTE (kept): the row is offered from e50, but the KamAZ-6350 is a 2000s design (ru.wikipedia: built from 2003).
     Reported, not changed.

   Mechanisms: eight "roadwheel" groups (render3d spins them about local Y).  No turret.
   Materials 7: paint (canvas texture, metre UVs), canvas (tilt texture), dark, glass, tyre, lamp (emissive, vertex
   colours), C.team (a strip on the cab roof and a patch on the tilt roof).  Draw calls 7 static + 8 wheels = 15.
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuKamaz = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bins also get planar UVs from the dominant axis of each face
     (uvk a metre), and the lamp bin a colour per vertex */
  function Bin(mat, uvk, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uvk ? [] : null; this.k = uvk; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.k;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
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
  /* a capped cylinder or cone between two centres, smooth round the side */
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
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
  /* a side-view polyline [x, z] made into a plate across y0..y1, t thick below the line (a fender) */
  function ribbon(bin, pts, y0, y1, t) {
    var i, a, b, dx, dz, L, nx, nz;
    for (i = 0; i < pts.length - 1; i++) {
      a = pts[i]; b = pts[i + 1]; dx = b[0] - a[0]; dz = b[1] - a[1]; L = Math.sqrt(dx * dx + dz * dz) || 1;
      nx = -dz / L * t; nz = dx / L * t;
      profY(bin, [[a[0], a[1]], [b[0], b[1]], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]], y0, y1);
    }
  }
  /* rings of the same count, lofted and capped (fan caps on the ring centre: the rings here are convex) */
  function loftRings(bin, R, smooth) {
    var m = R.length, n = R[0].length, V = [], F = [], i, j, k, c;
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (i = 0; i < 2; i++) {
      var ring = R[i ? m - 1 : 0], ctr = [0, 0, 0], b0 = V.length;
      for (j = 0; j < n; j++) { ctr[0] += ring[j][0] / n; ctr[1] += ring[j][1] / n; ctr[2] += ring[j][2] / n; }
      for (j = 0; j < n; j++) V.push(ring[j]);
      V.push(ctr); c = V.length - 1;
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push(i ? [c, b0 + j, b0 + k] : [c, b0 + k, b0 + j]); }
    }
    /* solid() turns every face by the whole-body volume sign, so the caps must agree with the skin: they do, as long
       as all rings run the same way round, which the ring builders guarantee */
    solid(bin, V, F, smooth);
  }
  function flush(THREE, group, B) {
    var k, b, geo, mesh;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      geo.computeBoundingSphere();
      mesh = new THREE.Mesh(geo, b.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  /* ------------------------------------------------------------ paint */
  var _tex = {};
  /* one flat coat, weathered: low-contrast drift, rain streaks, dust and scuffs (metre UVs, 0.34 a metre) */
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd, h;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      if (P.weave) {
        /* canvas: a fine weave, the long creases of a tilt pulled over bows, water marks */
        for (i = 0; i < 256; i += 2) {
          q.fillStyle = (i % 4) ? "rgba(0,0,0,0.035)" : "rgba(255,250,230,0.025)";
          q.fillRect(0, i, 256, 1); q.fillRect(i, 0, 1, 256);
        }
        for (i = 0; i < 14; i++) {
          x = R() * 256; q.fillStyle = "rgba(10,12,6,0.07)"; q.fillRect(x, 0, 2 + R() * 3, 256);
        }
        for (i = 0; i < 18; i++) {
          q.fillStyle = "rgba(20,22,12,0.06)";
          q.beginPath(); q.ellipse(R() * 256, R() * 256, 10 + R() * 30, 5 + R() * 14, 0, 0, TAU); q.fill();
        }
      } else {
        for (i = 0; i < 40; i++) {
          x = R() * 256; h = 20 + R() * 70; y = R() * 256;
          q.fillStyle = (i % 3) ? "rgba(20,20,14,0.07)" : "rgba(170,160,130,0.06)";
          q.fillRect(x, y, 1 + R() * 2, h);
        }
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.06)" : "rgba(235,228,200,0.045)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 24, 2 + R() * 12);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  var PAINT = { base: "#545a46", blots: ["#4d533f", "#5b614c", "#50563f"], seed: 63501 };
  var CANVAS = { base: "#5b5e4c", blots: ["#555846", "#616452", "#585b48"], seed: 63502, weave: true };

  /* sRGB hex -> linear: vertex colours are read raw by three; only material colours are linearised by prepModel */
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var AMBER = lin(0xffa11a), WHITE = lin(0xfff1c6), RED = lin(0xd4261a);

  function materials(THREE, C) {
    var T = {}, tp = paintTex(THREE, PAINT), tc = paintTex(THREE, CANVAS);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tp) T.paint.map = tp; else T.paint.color.set(PAINT.base);
    T.canvas = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0.0 });
    if (tc) T.canvas.map = tc; else T.canvas.color.set(CANVAS.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.35, metalness: 0.1,
                                              emissive: 0x5a4a2a, emissiveIntensity: 0.9 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, 0.34), canvas: new Bin(T.canvas, 0.5), dark: new Bin(T.dark), glass: new Bin(T.glass),
             tyre: new Bin(T.tyre), lamp: new Bin(T.lamp, 0, true), team: new Bin(T.team) };
  }

  /* ----------------------------------------------------------- the stations
     Side view [S]: 92.5 px a metre on the wheelbase, heights x1.03 so the cab roof meets the published 3.08 m with its
     lamps.  +X nose, +Y port, +Z up, tyres on z = 0. */
  var AX = [3.30, 1.36, -1.98, -3.30];        /* 1940 + 3340 + 1320 mm                          */
  var RT = 0.61, TH = 0.21, TY = 1.025;       /* 425/85R21 (1.26 m free, 1.22 loaded [S]); track 2050 */
  var XCF = 4.45, XCR = 2.66, ZC0 = 1.45, ZCR = 3.04, CW = 1.245;   /* cab: face at the sill, back, sill, roof, half width */
  var XBF = 1.74, XBR = -5.02, ZFL = 1.46, ZBT = 1.97, BW = 1.25;   /* body: headboard, tailgate, floor, board top, half width */
  var ZTT = 3.16, TWD = 1.27, ZTB = 2.00;     /* tilt: ridge (3.17 measured [S]), half width, hem */
  var XST = [1.70, -1.04, -2.97, -4.98];      /* board stanchions [S]                           */

  /* cab station table (horizontal sections, [S] side and [C][F] front): z, face x, back x, half width, corner radii */
  var CAB = [
    [ZC0, XCF, XCR, CW, 0.10, 0.04],
    [1.90, 4.43, XCR, CW, 0.10, 0.04],          /* top of the grille panel                 */
    [1.96, 4.385, XCR, CW, 0.10, 0.04],         /* the step back to the face above it      */
    [2.28, 4.345, XCR, CW, 0.10, 0.04],         /* windscreen foot                         */
    [2.92, 4.225, XCR, 1.24, 0.11, 0.04],       /* windscreen head (about 9 degrees of rake) */
    [3.00, 4.175, 2.675, 1.225, 0.13, 0.06],
    [ZCR, 4.08, 2.71, 1.17, 0.14, 0.08]         /* the roof, rounded over at its edges     */
  ];
  function cabRing(st) {
    var z = st[0], xf = st[1], xr = st[2], w = st[3], rf = st[4], rr = st[5], P = [], i, a, n = 4;
    /* counter-clockwise seen from above: front-starboard, front-port, back-port, back-starboard corners */
    var C = [[xf - rf, -w + rf, rf, -0.5 * Math.PI], [xf - rf, w - rf, rf, 0], [xr + rr, w - rr, rr, 0.5 * Math.PI], [xr + rr, -w + rr, rr, Math.PI]];
    for (i = 0; i < 4; i++) for (a = 0; a < n; a++) {
      var t = C[i][3] + a / (n - 1) * 0.5 * Math.PI;
      P.push([C[i][0] + C[i][2] * Math.cos(t), C[i][1] + C[i][2] * Math.sin(t), z]);
    }
    return P;
  }
  function faceX(z) {                           /* the cab face at height z */
    for (var i = 0; i < CAB.length - 1; i++) if (z <= CAB[i + 1][0]) return CAB[i][1] + (z - CAB[i][0]) * (CAB[i + 1][1] - CAB[i][1]) / (CAB[i + 1][0] - CAB[i][0]);
    return CAB[CAB.length - 1][1];
  }

  /* 425/85R21: chevron lug blocks staggered across the crown, the black spokeless wheel with its hub and clamp ring.
     Axle on local Y; centred on (ox, oy, oz). */
  function tyre(bin, ox, oy, oz) {
    var N = 26, R = [[-0.21, 0.33, 0, 0], [-0.21, 0.50, 0, 0], [-0.19, 0.58, 1, 0], [-0.10, RT, 1, 0], [-0.03, RT, 1, 1],
                     [0.03, RT, 1, 0], [0.10, RT, 1, 1], [0.19, 0.58, 1, 1], [0.21, 0.50, 0, 0], [0.21, 0.33, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length, sh;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.05;
      sh = R[i][2] ? (R[i][0] < 0 ? 0.25 : -0.25) * (R[i][3] ? 1 : 0) : 0;   /* the chevron lean of the lugs */
      a = (j + sh) / N * TAU;
      V.push([ox + r * Math.cos(a), oy + R[i][0], oz + r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([ox, oy + R[0][0], oz], [ox, oy + R[m - 1][0], oz]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    for (k = -1; k <= 1; k += 2) {
      cyl(bin, [ox, oy + k * 0.20, oz], [ox, oy + k * 0.215, oz], 0.335, 0.30, 16, true, false);   /* wheel dish */
      cylY(bin, ox, oy + k * 0.215, oy + k * 0.29, oz, 0.13, 12);                                   /* hub        */
      cylY(bin, ox, oy + k * 0.29, oy + k * 0.31, oz, 0.07, 8);                                     /* hub cap    */
      for (j = 0; j < 6; j++) {                                                                     /* rim clamps */
        a = j / 6 * TAU + 0.26;
        box(bin, ox + 0.235 * Math.cos(a) - 0.035, ox + 0.235 * Math.cos(a) + 0.035, oy + k * 0.215, oy + k * 0.245,
            oz + 0.235 * Math.sin(a) - 0.035, oz + 0.235 * Math.sin(a) + 0.035);
      }
    }
  }

  /* --------------------------------------------------------------- the cab */
  function addCab(B) {
    var R = [], i, s, y, z, x;
    for (i = 0; i < CAB.length; i++) R.push(cabRing(CAB[i]));
    loftRings(B.paint, R, false);
    /* the windscreen plane through its foot and head */
    var A = [CAB[3][1], 0, CAB[3][0]], H = [CAB[4][1], 0, CAB[4][0]];
    var W = unit(sub(H, A)), N = unit([W[2], 0, -W[0]]), U = [0, 1, 0];
    var L = Math.sqrt(dot(sub(H, A), sub(H, A)));
    planeBox(B.dark, A, U, W, N, -1.10, 1.10, -0.02, L, -0.02, 0.006);               /* rubber surround      */
    planeBox(B.glass, A, U, W, N, 0.05, 1.06, 0.01, L - 0.03, 0.0, 0.022);           /* port pane            */
    planeBox(B.glass, A, U, W, N, -1.06, -0.05, 0.01, L - 0.03, 0.0, 0.022);         /* starboard pane       */
    planeBox(B.paint, A, U, W, N, -0.05, 0.05, -0.02, L, 0.0, 0.03);                 /* centre post          */
    planeBox(B.dark, A, U, W, N, 0.18, 0.86, 0.04, 0.07, 0.022, 0.036);              /* wipers, parked low   */
    planeBox(B.dark, A, U, W, N, -0.86, -0.18, 0.04, 0.07, 0.022, 0.036);
    planeBox(B.paint, A, U, W, N, -1.14, 1.14, L, L + 0.07, 0.0, 0.05);              /* brow over the glass  */
    /* the grille panel: dark field, four slats, the round headlamps and their square bezels, corner lamps */
    var xg = faceX(1.66);
    box(B.dark, xg - 0.04, xg + 0.006, -0.66, 0.66, 1.52, 1.80);
    for (i = 0; i < 4; i++) box(B.paint, xg, xg + 0.03, -0.63, 0.63, 1.545 + i * 0.065, 1.58 + i * 0.065);
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.98;
      box(B.dark, xg - 0.02, xg + 0.012, y - 0.16, y + 0.16, 1.50, 1.80);
      cylX(B.paint, xg, xg + 0.04, y, 1.65, 0.13, 14);
      B.lamp.col = WHITE; cylX(B.lamp, xg + 0.04, xg + 0.05, y, 1.65, 0.105, 14);
      B.lamp.col = AMBER; box(B.lamp, 4.30, 4.40, s * CW, s * (CW + 0.012), 1.82, 1.90);     /* corner lamps   */
      box(B.lamp, 3.98, 4.05, s * CW, s * (CW + 0.012), 1.66, 1.71);                         /* side repeaters */
    }
    /* the crease under the windscreen panel and the tow-eye plate below the grille */
    box(B.paint, faceX(1.93) - 0.02, faceX(1.93) + 0.035, -1.16, 1.16, 1.90, 1.95);
    /* bumper: deep plate with two openings, a lamp at each end, tow hooks below */
    box(B.dark, 4.29, 4.57, -1.20, 1.20, 1.08, 1.38);                                   /* black on the olive trucks [S][F][O] */
    box(B.dark, 4.31, 4.55, -1.18, 1.18, 1.38, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(B.tyre, 4.56, 4.575, s * 0.40, s * 0.70, 1.14, 1.30);
      box(B.tyre, 4.56, 4.575, s * 0.14, s * 0.30, 1.16, 1.28);
      B.lamp.col = AMBER; cylX(B.lamp, 4.565, 4.585, s * 1.02, 1.24, 0.055, 10);
      bar(B.dark, [4.50, s * 0.86, 1.08], [4.62, s * 0.86, 0.94], 0.05);
      bar(B.dark, [4.62, s * 0.86, 0.94], [4.55, s * 0.86, 0.86], 0.05);
    }
    /* the sides: door and rear-quarter glass, door seams, handle, sill */
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * CW, y1 = s * (CW + 0.008), y2 = s * (CW + 0.016);
      profY(B.glass, [[3.39, 2.34], [3.90, 2.34], [3.86, 2.88], [3.39, 2.88]], y0, y1);
      profY(B.glass, [[2.74, 2.42], [3.04, 2.42], [3.04, 2.88], [2.74, 2.88]], y0, y1);
      box(B.dark, 3.97, 3.99, y0, y2, 1.50, 2.95);
      box(B.dark, 3.10, 3.12, y0, y2, 1.50, 2.95);
      box(B.dark, 3.10, 3.99, y0, y2, 1.49, 1.51);
      box(B.dark, 3.20, 3.34, y0, s * (CW + 0.03), 2.10, 2.14);
      box(B.dark, 2.70, 3.08, y0, y2, 2.38, 2.40);
      /* mirrors: a frame off the A-pillar, the tall head and the small one above */
      x = 4.28;
      bar(B.dark, [4.30, s * 1.20, 2.92], [x, s * 1.56, 2.86], 0.03);
      bar(B.dark, [4.32, s * 1.20, 2.16], [x, s * 1.56, 2.22], 0.03);
      bar(B.dark, [x, s * 1.56, 2.20], [x, s * 1.56, 2.88], 0.03);
      box(B.dark, x - 0.04, x + 0.02, s * 1.50, s * 1.64, 2.28, 2.72);
      box(B.dark, x - 0.04, x + 0.02, s * 1.50, s * 1.61, 2.76, 2.88);
    }
    /* roof: three amber lamps on the front edge, the round lamp on the port front corner, a team strip */
    B.lamp.col = AMBER;
    for (i = -1; i <= 1; i++) box(B.lamp, 3.98, 4.06, i * 0.22 - 0.05, i * 0.22 + 0.05, ZCR - 0.01, ZCR + 0.045);
    box(B.dark, 4.02, 4.10, 1.10, 1.18, ZCR - 0.04, ZCR + 0.08);
    cylX(B.dark, 4.00, 4.18, 1.14, ZCR + 0.15, 0.09, 12);
    B.lamp.col = WHITE; cylX(B.lamp, 4.18, 4.19, 1.14, ZCR + 0.15, 0.072, 12);
    box(B.team, 3.00, 3.85, -0.14, 0.14, ZCR - 0.01, ZCR + 0.012);
  }

  /* ----------------------------------------- behind the cab: intake, air cleaner, spare wheel */
  function addBehindCab(B) {
    var k;
    /* intake pipe up the port back corner, the louvred intake head across the cab back at roof height [S][R] */
    cylZ(B.dark, 2.48, 0.98, 1.55, 2.62, 0.075, 10);
    box(B.dark, 2.18, 2.58, -1.05, 1.08, 2.62, 3.00);
    for (k = 0; k < 5; k++) {
      box(B.dark, 2.20, 2.40, 1.08, 1.10, 2.66 + k * 0.065, 2.69 + k * 0.065);
      box(B.dark, 2.20, 2.40, -1.07, -1.05, 2.66 + k * 0.065, 2.69 + k * 0.065);
    }
    B.lamp.col = RED; box(B.lamp, 2.18, 2.24, 1.08, 1.095, 2.64, 2.70);
    /* the round air cleaner on the port side, its end facing out [S] */
    cylY(B.dark, 2.27, 0.45, 1.12, 1.98, 0.18, 14);
    cylY(B.dark, 2.27, 1.12, 1.15, 1.98, 0.12, 12);
    /* the spare, upright on the starboard side behind the cab, on its carrier post [R] */
    tyre(B.tyre, 2.12, -1.04, 1.95);
    box(B.dark, 2.06, 2.18, -0.82, -0.60, 0.95, 2.05);
    box(B.dark, 2.02, 2.22, -0.83, -0.60, 1.88, 2.02);
    /* back wall bracing of the cab, seen through the gap */
    box(B.dark, XCR - 0.04, XCR, -1.10, 1.10, 1.50, 2.90);
  }

  /* --------------------------------------------------------- the chassis */
  function addChassis(B) {
    var s, i, k, x, yo;
    box(B.dark, XBR + 0.10, 4.30, 0.40, 0.52, 0.88, 1.18);
    box(B.dark, XBR + 0.10, 4.30, -0.52, -0.40, 0.88, 1.18);
    var CM = [4.10, 2.60, 0.90, -0.60, -2.64, -4.20, XBR + 0.16];
    for (i = 0; i < CM.length; i++) box(B.dark, CM[i] - 0.05, CM[i] + 0.05, -0.40, 0.40, 0.94, 1.14);
    /* engine and gearbox under the cab, transfer case behind it */
    box(B.dark, 3.00, 4.25, -0.42, 0.42, 0.78, 1.45);
    box(B.dark, 2.20, 3.00, -0.28, 0.28, 0.82, 1.20);
    box(B.dark, 1.70, 2.20, -0.36, 0.36, 0.66, 1.00);
    /* axles: beams, differential housings, leaf springs; the rear pair on one balancer spring a side */
    for (i = 0; i < 4; i++) {
      box(B.dark, AX[i] - 0.07, AX[i] + 0.07, -0.80, 0.80, RT - 0.08, RT + 0.08);
      cylX(B.dark, AX[i] - 0.20, AX[i] + 0.20, 0, RT, 0.22, 12);
    }
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) box(B.dark, AX[i] - 0.62, AX[i] + 0.62, s * 0.40, s * 0.54, RT + 0.10, RT + 0.24);
      box(B.dark, AX[3] - 0.10, AX[2] + 0.10, s * 0.40, s * 0.54, RT + 0.10, RT + 0.26);
      box(B.dark, (AX[2] + AX[3]) / 2 - 0.16, (AX[2] + AX[3]) / 2 + 0.16, s * 0.38, s * 0.56, RT + 0.20, 0.92);
    }
    /* propeller shafts from the transfer case */
    cylX(B.dark, AX[0], 1.80, 0, 0.70, 0.045, 6);
    cylX(B.dark, AX[1] + 0.20, 1.70, 0.08, 0.72, 0.045, 6);
    cylX(B.dark, AX[2] + 0.20, 1.70, -0.08, 0.72, 0.045, 6);
    cylX(B.dark, AX[3] + 0.20, AX[2] - 0.20, 0, RT + 0.05, 0.045, 6);
    /* the front fender over axle 1: flat on top, down to the axle behind the wheel [S][C][R] */
    for (s = -1; s <= 1; s += 2) {
      yo = s > 0 ? [0.80, 1.285] : [-1.285, -0.80];
      ribbon(B.dark, [[4.00, 1.40], [3.88, 1.62], [3.62, 1.72], [2.98, 1.72], [2.74, 1.60], [2.60, 1.32], [2.56, 0.66]], yo[0], yo[1], 0.05);
      /* its deep outer lip, the black band that frames the wheel from the side */
      ribbon(B.dark, [[4.02, 1.36], [3.89, 1.63], [3.62, 1.735], [2.98, 1.735], [2.73, 1.61], [2.585, 1.32], [2.545, 0.64]],
             s > 0 ? 1.20 : -1.27, s > 0 ? 1.27 : -1.20, 0.15);
      /* mud flaps behind axle 2 and axle 4 [S][R] */
      box(B.dark, AX[1] - 0.74, AX[1] - 0.70, s * 0.80, s * 1.24, 0.42, 1.36);
      box(B.dark, AX[3] - 0.76, AX[3] - 0.72, s * 0.80, s * 1.24, 0.40, 1.36);
      /* rear lamps under the tail of the body, on their brackets */
      box(B.dark, XBR + 0.04, XBR + 0.20, s * 0.90, s * 1.15, 1.10, 1.24);
      B.lamp.col = RED; box(B.lamp, XBR - 0.005, XBR + 0.04, s * 0.92, s * 1.13, 1.12, 1.22);
    }
    /* between the axles: the battery box and the 210 l tank on the port side, the air receivers; the 350 l tank to
       starboard [S][R] (ru.wikipedia gives 350 + 210 l) */
    box(B.dark, -0.05, 0.45, 0.62, 1.12, 0.80, 1.12);
    box(B.paint, -0.90, -0.18, 0.60, 1.14, 0.74, 1.26);
    box(B.dark, -0.92, -0.16, 0.62, 1.12, 0.98, 1.00);
    for (k = 0; k < 3; k++) cylY(B.dark, k === 1 ? -1.18 : (k ? -1.32 : -1.04), 0.70, 1.10, k === 1 ? 0.84 : 1.06, 0.10, 10);
    box(B.paint, -0.80, 0.40, -1.12, -0.58, 0.72, 1.26);
    box(B.dark, -0.82, 0.42, -1.10, -0.60, 1.00, 1.02);
    /* rear: under-run beam and the towing hitch */
    box(B.dark, XBR + 0.02, XBR + 0.14, -0.95, 0.95, 0.82, 1.04);
    box(B.dark, XBR - 0.12, XBR + 0.02, -0.09, 0.09, 0.86, 1.00);
    box(B.dark, XBR - 0.16, XBR - 0.10, -0.05, 0.05, 0.82, 1.04);
  }

  /* ------------------------------------------------- the drop-side body */
  function addBody(B) {
    var s, i, x, y0, y1, k;
    /* the body's own longerons on the frame, cross bearers, floor */
    box(B.dark, XBR + 0.04, XBF - 0.04, 0.38, 0.52, 1.18, 1.32);
    box(B.dark, XBR + 0.04, XBF - 0.04, -0.52, -0.38, 1.18, 1.32);
    for (x = XBF - 0.12; x > XBR; x -= 0.55) box(B.paint, x - 0.04, x + 0.04, -1.20, 1.20, 1.28, 1.40);
    box(B.paint, XBR, XBF, -1.21, 1.21, 1.40, ZFL);
    for (s = -1; s <= 1; s += 2) {
      y0 = s * (BW - 0.04); y1 = s * BW;
      /* the board: panel, top and bottom rails, two pressed ribs, stanchions, the amber reflectors along the foot */
      box(B.paint, XBR, XBF, y0, y1, 1.43, ZBT);
      box(B.paint, XBR, XBF, s * (BW - 0.05), s * (BW + 0.02), ZBT - 0.05, ZBT);
      box(B.paint, XBR, XBF, s * (BW - 0.05), s * (BW + 0.02), 1.42, 1.48);
      for (k = 0; k < 2; k++) box(B.paint, XBR + 0.02, XBF - 0.02, y1, s * (BW + 0.014), 1.62 + k * 0.16, 1.66 + k * 0.16);
      for (i = 0; i < XST.length; i++) box(B.paint, XST[i] - 0.05, XST[i] + 0.05, y1, s * (BW + 0.035), 1.40, ZBT + 0.02);
      for (i = 0; i < XST.length; i++) box(B.dark, XST[i] - 0.07, XST[i] + 0.07, s * (BW + 0.02), s * (BW + 0.045), ZBT - 0.10, ZBT - 0.06);
      B.lamp.col = AMBER;
      var RF = [1.12, -0.02, -1.97, -4.34];
      for (i = 0; i < RF.length; i++) box(B.lamp, RF[i] - 0.04, RF[i] + 0.04, s * (BW + 0.02), s * (BW + 0.03), 1.44, 1.47);
      /* board hinges along the foot */
      for (x = XBF - 0.40; x > XBR; x -= 1.15) box(B.dark, x - 0.06, x + 0.06, s * BW, s * (BW + 0.03), 1.38, 1.44);
    }
    /* headboard and tailgate, ribbed like the sides */
    box(B.paint, XBF - 0.06, XBF, -BW, BW, 1.40, ZBT);
    box(B.paint, XBR, XBR + 0.04, -BW, BW, 1.40, ZBT);
    for (k = 0; k < 2; k++) {
      box(B.paint, XBF, XBF + 0.014, -1.20, 1.20, 1.62 + k * 0.16, 1.66 + k * 0.16);
      box(B.paint, XBR - 0.014, XBR, -1.20, 1.20, 1.62 + k * 0.16, 1.66 + k * 0.16);
    }
    for (s = -1; s <= 1; s += 2) box(B.dark, XBR - 0.03, XBR, s * 0.60 - 0.06, s * 0.60 + 0.06, ZBT - 0.10, ZBT - 0.04);
  }

  /* ---------------------------------------------------- the canvas tilt
     Section: hem a little outside the board top, sides upright, rounded shoulders, a flat roof [S][P][C].  Bows every
     1.1 m; the canvas sags 3 cm on the roof and draws in 1 cm at the sides between them, which is what shows the bows. */
  function tiltRing(x, ztop, w, sag) {
    var P = [], i, rc = 0.15, zt = ztop - sag, ww = w - sag * 0.33, n = 5;
    P.push([x, -ww, ZTB], [x, ww, ZTB]);
    P.push([x, ww, ZTB + 0.45]);
    for (i = 0; i < n; i++) { var t = i / (n - 1) * 0.5 * Math.PI; P.push([x, ww - rc + rc * Math.cos(t), zt - rc + rc * Math.sin(t)]); }
    for (i = 0; i < n; i++) { var u = Math.PI * 0.5 + i / (n - 1) * 0.5 * Math.PI; P.push([x, -ww + rc + rc * Math.cos(u), zt - rc + rc * Math.sin(u)]); }
    P.push([x, -ww, ZTB + 0.45]);
    return P;
  }
  function addTilt(B) {
    var R = [], bows = [], i, x, s, k, n;
    for (i = 0; i < 7; i++) bows.push(XBF - 0.02 + i * (XBR - XBF + 0.04) / 6);
    R.push(tiltRing(XBF + 0.005, ZTT - 0.05, TWD - 0.03, 0));
    for (i = 0; i < bows.length; i++) {
      R.push(tiltRing(bows[i], ZTT, TWD, 0));
      if (i + 1 < bows.length) R.push(tiltRing((bows[i] + bows[i + 1]) / 2, ZTT, TWD, 0.03));
    }
    R.push(tiltRing(XBR - 0.005, ZTT - 0.05, TWD - 0.03, 0));
    loftRings(B.canvas, R, false);
    /* the hem: eyelets along the foot of the tilt roped in a zig-zag to hooks under the board's top rail [P] */
    for (s = -1; s <= 1; s += 2) {
      n = Math.floor((XBF - XBR - 0.2) / 0.30);
      for (k = 0; k <= n; k++) {
        x = XBF - 0.10 - k * 0.30;
        bar(B.dark, [x, s * (TWD + 0.004), ZTB + 0.05], [x - 0.15, s * (BW + 0.022), ZBT - 0.06], 0.014);
        if (k < n) bar(B.dark, [x - 0.15, s * (BW + 0.022), ZBT - 0.06], [x - 0.30, s * (TWD + 0.004), ZTB + 0.05], 0.014);
        box(B.dark, x - 0.012, x + 0.012, s * TWD, s * (TWD + 0.008), ZTB + 0.035, ZTB + 0.065);
      }
      box(B.canvas, XBR, XBF, s * (TWD - 0.02), s * (TWD + 0.004), ZTB, ZTB + 0.08);    /* the doubled hem band */
    }
    /* rear and front flaps' roll straps, and a team patch on the roof over the third bow */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XBR - 0.03, XBR - 0.01, s * 0.80 - 0.02, s * 0.80 + 0.02, ZTB + 0.10, ZTT - 0.12);
    }
    box(B.team, bows[3] - 0.30, bows[3] + 0.30, -0.32, 0.32, ZTT - 0.02, ZTT + 0.012);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, s, wg, wm, geo, TB;
    g.name = "ru_kamaz";
    addCab(HB);
    addBehindCab(HB);
    addChassis(HB);
    addBody(HB);
    addTilt(HB);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre);
    tyre(TB, 0, 0, 0);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
    geo.computeBoundingSphere();
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * TY, RT);
      wm = new THREE.Mesh(geo, T.tyre);
      wm.castShadow = true; wm.receiveShadow = true;
      wg.add(wm);
      g.add(wg);
    }
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the towing hitch to the front tow hooks (9.85 m published to the bumper and tailboard) */
UNIT_MODELS["supply_p"] = { len: 9.8, build: HeroRuKamaz.build };
