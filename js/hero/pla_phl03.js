/* ============ pla_phl03.js - HERO model: the PHL-03 300 mm multiple rocket launcher on the Wanshan WS2400 8x8 ============
   pla_e00_mlrs "PHL-03 300mm multiple rocket launcher", in service 2005; turret:true (the launcher trains), not deploy:true.

   Which vehicle: the PLA's AR-1 / PHL-03, the reverse-engineered BM-30 Smerch (en.wikipedia "PHL-03").  The LAUNCHER is the
   Smerch's - the same twelve 300 mm tubes in the same stepped pack, the same rotating platform with the trunnion at its
   rear - and is drawn as js/hero/ru_smerch.js draws it (copied, not shared).  The TRUCK is not the MAZ-543M: it is the
   Chinese Wanshan WS2400 8x8, with ONE full-width forward-control cab across the whole front (no split driving and crew
   cabs, no grille between them), standing well ahead of the first axle.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e00_mlrs_ref:
     P1  "PHL-03 Multiple rocket launchers 20170902.jpg" - the Beijing Military Museum vehicle, starboard front 3/4, pack
         raised: the full-width cab with its two big near-square windscreens side by side, the bar guard over the lower
         front with the louvred grille behind it, the amber lamps at the outer corners, the deep bumper with two lamp boxes
         each side and the raked grated apron under it, the raised roof panel with the caged beacon at its front, the
         boxes on the roof's front corners; on the side the door window and a second window behind it, the taller rear
         section of the cab with a small high window, the step ladder under the door, the first axle under the rear of
         the cab, the ladder and the stowage boxes behind; the pack: FOUR tubes in the top row, two either side of the
         cradle beam in each of the two lower rows (as the Smerch), the clamp frames, the lattice at the tails.
     P2  "PHL-03 heavy multiple rocket launcher.jpg" - an exhibition vehicle, port front 3/4, pack raised: THE MEASURING
         PHOTO for the chassis (hub and corner positions corrected for perspective by the local tyre height): front
         pair 0.94, middle gap 1.32, rear pair 0.96, rear overhang 0.44, cab front corner to first axle 1.01, first axle
         to cab rear 0.64 (in one unit; the ratio of the middle gap to a pair is 1.4); the deck the man stands on at the
         platform, the fenders over the rear pair, the rotating platform under the raised pack, the trunnion at the rear.
     P3  "Chinese 8x8 military truck.jpg" - a WS2400 with the short two-door cab and a shelter body (2009 parade),
         starboard front: the same chassis, corrected the same way - pairs 0.78 / 0.82, middle 1.17, rear overhang 0.36,
         cab corner 0.83 ahead of the first axle; the cab roof at 2.07 tyre heights over the ground.
     P4  "YJ-62 Anti-ship missiles 20170716.jpg" - a WS2400 TEL, port front 3/4: the cab front, the bar guard, the
         bumper lamps and the grated apron again, the tyres and the axle spacing (shapes only).
     ru_smerch.js - the launcher: tube pitch and radius, tube length, rows, the clamp stations, the trunnion and the
         platform, all measured there off the 9A52 photographs.
   Published (en.wikipedia "PHL-03", after military-today): length 12 m, width 3 m, height 3 m, 43 t, crew 4, 12 tubes
     of 300 mm.  No WS2400 article: its tyre is taken as the MAZ-543's 1500x600 (NOT CONFIRMED).

   Recognition list (what makes it read at game zoom, and its source):
     1. 8x8 in two pairs with the long gap between, the cab well ahead of the first axle - P2, P3: AX, XN.
     2. ONE tall full-width flat-fronted cab, the two big windscreens side by side - P1, P2, P4: addCab.
     3. The bar guard over the lower front, the deep bumper with its lamp boxes and the raked apron - P1, P4: addCab.
     4. The caged beacon on the raised roof panel - P1, P2: addCab.
     5. The Smerch pack: four tubes on top, two and two in the lower rows round the cradle beam, laid flat over the deck
        with its mouths just behind the cab - P1, P2, ru_smerch.js: addPack.
     6. The rotating platform over the rear pair with the trunnion at its rear - P2: addMount, "turret", "podelev".
   Paint: plain PLA green as the other PLA heroes (#525c3a).  P1, P2 and P4 wear the digital camouflage of the 2017
   displays: not drawn.  No stars, numbers or emblems (P1's star on the cab door is not drawn).
   Scale: the published 12 m, over the tube tails to the bumper (the stowed pack's tails stand 0.72 m behind the frame
   end, as on the Smerch); the chassis ratios of P2 and P3 at that length give 2.25 m pairs and a 3.30 m middle gap (the
   MAZ-543M has 2.2 / 3.3 / 2.2), the cab front 2.45 m ahead of the first axle and its rear 1.55 m behind.  The cab roof at
   3.00 m (P3: 2.07 tyre heights over the ground at a 1.5 m tyre; published height 3 m).
   NOT CONFIRMED, judgement calls: the tyre (1500x600) and track (2.40 m); the wheelbase in metres (the ratios are
   measured, the scale is the published length); the cab's half width (1.47 m), the windscreen's lean, the height of the
   cab floor (0.95 m), the wheel arch cut in the cab side; the split between the cab's front section and its taller rear
   section; the deck height (1.80 m); the stowage boxes, tank, ladder and fenders behind the cab (shapes from P1 and P2,
   sizes guessed); the stabiliser jacks between the rear pair (drawn as on the Smerch; not seen in P1-P2); the travel
   rest under the cradle beam; the stowed pose itself (no photograph of a PHL-03 travelling was found: the pack is laid
   flat as the Smerch's is); everything of the launcher not visible in P1-P2 is the Smerch's.
   NOT drawn: the jacks set up (not deploy:true), the fire-control fit, aerials, nets, markings.
   Elevation: 40 degrees, as ru_smerch.js (P1 and P2 show it at about 40-45; 55 is the Smerch's published limit).

   Mechanisms (ru_smerch.js's): "turret" is the rotating platform (origin on the slewing ring at x -4.30, z 1.45).  Inside
   it, "podelev" is the cradle and tubes, hinged at the rear trunnion (x -5.50, z 1.93 on the hull), stowed level at
   rotation 0; its userData.el is the launch elevation and userData.cells the 12 mouths [x, y, z, tail x] in the group
   frame (render3d.js poseLauncher / launchOffset).  Four "roadwheel" groups, one per axle holding both wheels (axle
   along local Y, origin on the axle centre).
   Materials 5: paint (canvas texture, metre UVs), dark, glass, wheel (vertex colours: tyres, rims, hubs), C.team (a strip
   on top of the pack, one high on each side of the cab's rear section).  Draw calls: hull 4 + wheels 4 + platform 2 +
   pack 3 = 13.
   Measured: 12.22 m over the stowed tube tails and the bumper's lamp boxes (published 12); 3.54 m over the mirrors, 3.20
   over the hubs, 2.94 over the cab (published 3); cab roof 3.00, pack top 3.10, beacon cage 3.25 (published 3).
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPhl03 = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so the paint never stretches;
     a vertex-coloured bin (the wheels) writes its current colour, col, at each corner */
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
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

  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
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
  /* a side-view polyline [x, z] made into a plate across y0..y1, t thick below the line (a mudguard arch) */
  function ribbon(bin, pts, y0, y1, t) {
    var i, a, b, dx, dz, L, nx, nz;
    for (i = 0; i < pts.length - 1; i++) {
      a = pts[i]; b = pts[i + 1]; dx = b[0] - a[0]; dz = b[1] - a[1]; L = Math.sqrt(dx * dx + dz * dz) || 1;
      nx = -dz / L * t; nz = dx / L * t;
      profY(bin, [[a[0], a[1]], [b[0], b[1]], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]], y0, y1);
    }
  }
  /* a side-face box on the +y (s > 0) or -y face at |y| = yf, standing d proud of it */
  function sideBox(bin, s, yf, d, x0, x1, z0, z1) { box(bin, x0, x1, s * yf, s * (yf + d), z0, z1); }

  var _tex = {};
  /* one flat coat, weathered: low-contrast drift, rain streaks running down, dust and scuffs.
     The painted bin carries metre UVs (0.34 a metre), so the 256 px tile spans about 2.9 m and repeats. */
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
        for (i = 0; i < 10; i++) {
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
      /* streaks: thin, long, faint - the texture's v runs with z on the sides */
      for (i = 0; i < 40; i++) {
        x = R() * 256; h = 20 + R() * 70; y = R() * 256;
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.07)" : "rgba(170,160,130,0.06)";
        q.fillRect(x, y, 1 + R() * 2, h);
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

  /* ----------------------------------------------------------- the stations
     Side stations from the ratios of P2 and P3 (see the header), scaled to the published 12 m over the stowed tube tails
     and the bumper; +X nose, +Y port, +Z up, tyres on z = 0. */
  var XT = -5.50, XN = 5.75, XB = 5.92;              /* rear frame end (the trunnion stands over it), cab front, bumper */
  var AX = [3.30, 1.05, -2.25, -4.50], TY = 1.20, RT = 0.75;   /* axles; track 2.40 m; 1500x600 tyres */
  var XC0 = 1.75, XCS = 2.55, ZC = 3.00, CW = 1.47;  /* cab rear, the step to its taller rear section, roof, half width */
  var ZF = 0.95, ZW = 2.04;                          /* cab floor; windscreen foot */
  var ZK = 1.80;                                     /* the launcher deck */
  var TX = -4.30, TZ = 1.45;                         /* the turntable centre ("turret" origin) */
  var PVX = -1.20, PVZ = 0.48;                       /* the trunnion, at the turntable's rear, in the turret frame */
  var TP = 0.38, TR = 0.17, TX0 = -0.72, TX1 = 6.82; /* tube pitch and radius; tails and mouths from the trunnion */
  var ROWZ = [0.20, 0.58, 0.96];                     /* tube rows above the trunnion: stowed 2.13, 2.51, 2.89 m */
  var LAUNCH_EL = 40 * Math.PI / 180;
  var JX = -3.38, JY = 1.22;                         /* the stabiliser jack, between the rear pair of axles */
  var PAINT = { base: "#525c3a", blots: ["#4a5434", "#5a6442", "#4e5737"], seed: 30003 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }

  /* ---------------------------------------------------------------- wheels
     1500x600 tyre at y = yc (NOT CONFIRMED: the MAZ-543's): big staggered lug blocks across the crown; the wheel
     painted green (P1, P2), dished, with its hub and nut ring on the outer face (s the side) */
  function rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }
  var TYRE = [0.11, 0.115, 0.12], NUT = [0.16, 0.17, 0.15];
  function tyre(W, yc, s) {
    var N = 22, R = [[-0.30, 0.47, 0, 0], [-0.30, 0.64, 0, 0], [-0.25, 0.73, 1, 0], [-0.10, 0.75, 1, 0], [-0.02, 0.75, 1, 1],
                     [0.02, 0.75, 1, 0], [0.10, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.64, 0, 0], [0.30, 0.47, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length, RIM = rgb(PAINT.base, 1.05), HUB = rgb(PAINT.base, 1.2);
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.04;
      a = j / N * TAU;
      V.push([r * Math.cos(a), yc + R[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + R[0][0], 0], [0, yc + R[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    W.col = TYRE;
    solid(W, V, F, true);
    W.col = RIM;
    cyl(W, [0, yc + s * 0.29, 0], [0, yc + s * 0.33, 0], 0.46, 0.40, 16, true, false);       /* dished rim face */
    W.col = HUB;
    cylY(W, 0, yc + s * 0.33, yc + s * 0.40, 0, 0.17, 10);                                  /* hub */
    W.col = NUT;
    for (j = 0; j < 8; j++) {                                                               /* nut ring */
      a = j / 8 * TAU;
      cylY(W, 0.24 * Math.cos(a), yc + s * 0.33, yc + s * 0.355, 0.24 * Math.sin(a), 0.025, 4);
    }
  }
  /* one axle: both wheels and the axle beam between them, origin on the axle centre */
  function addAxle(W) {
    tyre(W, TY, 1);
    tyre(W, -TY, -1);
    W.col = [0.14, 0.15, 0.16];
    cylY(W, 0, -0.90, 0.90, 0, 0.11, 8);
    box(W, -0.22, 0.22, -0.30, 0.30, -0.20, 0.20);
  }

  /* ---------------------------------------------------------------- chassis */
  function addChassis(B) {
    var s, k, i, yo;
    box(B.dark, XT + 0.10, XN - 0.30, -0.55, 0.55, 0.95, 1.45);                          /* frame rails */
    for (i = 0; i < 4; i++) box(B.dark, AX[i] - 0.18, AX[i] + 0.18, -0.55, 0.55, 0.62, 0.95);   /* spring seats over the axles */
    /* rear: beam, tow hooks, and the two braced brackets under the cradle (as the Smerch) */
    box(B.dark, XT, XT + 0.16, -1.40, 1.40, 0.98, 1.32);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.08, XT, s * 1.05 - 0.07, s * 1.05 + 0.07, 1.00, 1.14);
      bar(B.dark, [XT + 0.05, s * 0.45, 1.00], [XT - 0.05, s * 0.62, 0.62], 0.10);
      bar(B.dark, [XT + 0.05, s * 0.85, 1.00], [XT - 0.05, s * 0.62, 0.62], 0.10);
      box(B.dark, XT - 0.12, XT + 0.02, s * 0.62 - 0.14, s * 0.62 + 0.14, 0.56, 0.64);
    }
    for (s = -1; s <= 1; s += 2) {
      yo = s > 0 ? [0.98, 1.50] : [-1.50, -0.98];
      /* the fender over the rear pair, flat on top and rounded down at the front, ending in an upright plate at the
         back that carries the tail lamp (P2) */
      ribbon(B.paint, [[XT + 0.02, 0.92], [XT + 0.02, 1.62], [XT + 0.30, 1.70], [AX[3], 1.70], [AX[2], 1.70],
                       [AX[2] + 0.42, 1.62], [AX[2] + 0.70, 1.40], [AX[2] + 0.82, 1.02]], yo[0], yo[1], 0.05);
      box(B.glass, XT - 0.04, XT + 0.0, s * 1.30 - 0.09, s * 1.30 + 0.09, 1.48, 1.58);
      box(B.dark, XT + 0.02, XT + 0.06, yo[0] + 0.04, yo[1] - 0.04, 0.42, 0.95);              /* mud flaps */
      /* the fender over the second axle, from the cab's rear wall (P1, P2) */
      ribbon(B.paint, [[XC0 - 0.02, 1.70], [AX[1], 1.70], [AX[1] - 0.45, 1.64], [AX[1] - 0.75, 1.42], [AX[1] - 0.85, 1.05]],
             yo[0], yo[1], 0.05);
      box(B.dark, AX[1] - 0.89, AX[1] - 0.85, yo[0] + 0.04, yo[1] - 0.04, 0.45, 1.05);
      /* the stowage boxes between the pairs, lids under the deck edge, with ribs and catches; the tank below (P1) */
      box(B.paint, AX[2] + 0.70, AX[1] - 0.90, s > 0 ? 0.55 : -1.48, s > 0 ? 1.48 : -0.55, 1.28, 1.76);
      for (k = 0; k < 9; k++) sideBox(B.paint, s, 1.48, 0.025, AX[2] + 0.82 + k * 0.17, AX[2] + 0.86 + k * 0.17, 1.32, 1.72);
      for (k = 0; k < 2; k++) sideBox(B.dark, s, 1.48, 0.04, AX[2] + 1.00 + k * 0.80, AX[2] + 1.15 + k * 0.80, 1.52, 1.58);
      box(B.dark, AX[2] + 0.85, AX[1] - 1.10, s > 0 ? 0.60 : -1.36, s > 0 ? 1.36 : -0.60, 0.62, 1.22);
      for (k = 0; k < 3; k++) sideBox(B.paint, s, 1.36, 0.02, AX[2] + 0.95 + k * 0.55, AX[2] + 1.00 + k * 0.55, 0.64, 1.20);
      /* the stabiliser jack between the rear pair, raised for the road (as the Smerch; NOT CONFIRMED) */
      cylZ(B.paint, JX, s * JY, 0.80, 1.70, 0.12, 10);
      cylZ(B.dark, JX, s * JY, 1.55, 1.63, 0.15, 10);
      cylZ(B.dark, JX, s * JY, 0.46, 0.80, 0.075, 8);
      cylZ(B.dark, JX, s * JY, 0.38, 0.46, 0.24, 12);
      box(B.dark, JX - 0.10, JX + 0.10, s > 0 ? 0.55 : -JY, s > 0 ? JY : -0.55, 1.30, 1.45);
      /* the ladder up to the deck behind the cab, starboard (P1) */
      if (s < 0) {
        box(B.dark, XC0 - 0.34, XC0 - 0.31, -1.53, -1.50, 0.62, ZK + 0.02);
        box(B.dark, XC0 - 0.07, XC0 - 0.04, -1.53, -1.50, 0.62, ZK + 0.02);
        for (k = 0; k < 4; k++) box(B.dark, XC0 - 0.34, XC0 - 0.04, -1.53, -1.51, 0.74 + k * 0.26, 0.77 + k * 0.26);
      }
    }
    /* the launcher deck from the cab back to the turntable, walkway edges, tread strips */
    box(B.paint, -3.10, XC0, -1.44, 1.44, ZK - 0.06, ZK);
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.10, XC0, s > 0 ? 1.40 : -1.46, s > 0 ? 1.46 : -1.40, ZK - 0.12, ZK + 0.02);
    for (k = 0; k < 7; k++) box(B.dark, -2.90 + k * 0.66, -2.86 + k * 0.66, -1.40, 1.40, ZK, ZK + 0.01);
    box(B.paint, XT + 0.16, -3.10, -1.44, 1.44, 1.46, 1.56);                            /* the rear frame top under the turntable */
    /* the travel rest: a saddle on two posts under the cradle beam's fore end */
    for (s = -1; s <= 1; s += 2) box(B.paint, 0.42, 0.58, s * 0.20 - 0.07, s * 0.20 + 0.07, ZK, 2.06);
    box(B.dark, 0.34, 0.66, -0.30, 0.30, 2.02, 2.08);
    /* exhaust stub, starboard behind the cab */
    cylY(B.dark, XC0 - 0.55, -1.52, -1.40, 1.50, 0.06, 8);
  }

  /* ---------------------------------------------------------------- the cab
     ONE full-width forward-control cab (P1, P2, P4): a flat front with the two big windscreens leaning a little back, the
     bar guard and grille below them, the deep bumper and the raked apron; two windows a side in the front section, the
     taller-looking rear section with its small high window; the first axle under its rear in an arch cut in the side */
  function addCab(B) {
    var s, k, y, x, xa0 = AX[0] - 0.88, xa1 = AX[0] + 0.88, ZA = 1.66;
    /* upper body, side profile: the windscreen leaning back from its foot, the roof */
    profY(B.paint, [[XN, ZA], [XN, ZW], [XN - 0.15, ZC - 0.10], [XN - 0.26, ZC], [XC0, ZC], [XC0, ZA]], -CW, CW);
    /* lower body ahead of the arch, behind it, and the arch's crown */
    box(B.paint, xa1, XN, -CW, CW, ZF, ZA + 0.01);
    box(B.paint, XC0, xa0, -CW, CW, 1.12, ZA + 0.01);
    ribbon(B.paint, [[xa0, 1.12], [xa0 + 0.12, 1.42], [AX[0] - 0.45, 1.62], [AX[0] + 0.45, 1.62], [xa1 - 0.12, 1.42], [xa1, ZF]],
           -CW, CW, 0.04);
    box(B.paint, xa0, xa1, -CW + 0.30, CW - 0.30, 1.30, ZA + 0.01);                       /* the floor over the wheel boxes */
    /* the windscreens: dark frame, two panes either side of the centre pillar, wipers */
    var a = Math.atan2(0.15, ZC - 0.10 - ZW), U = [-Math.sin(a), 0, Math.cos(a)], Wv = [0, 1, 0], Nn = [Math.cos(a), 0, Math.sin(a)];
    var P0 = [XN, 0, ZW], L = (ZC - 0.10 - ZW) / Math.cos(a);
    planeBox(B.dark, P0, U, Wv, Nn, 0.06, L - 0.06, -CW + 0.08, CW - 0.08, -0.01, 0.02);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.glass, P0, U, Wv, Nn, 0.10, L - 0.10, s > 0 ? 0.07 : -CW + 0.14, s > 0 ? CW - 0.14 : -0.07, 0.02, 0.045);
      bar(B.dark, [XN + 0.07, s * 0.30, ZW + 0.10], [XN + 0.03, s * 0.80, ZW + 0.36], 0.025);
    }
    /* the front panel below: the bar guard (ten uprights in a frame, P1), the louvred grille behind its middle */
    box(B.dark, XN, XN + 0.03, -1.14, 1.14, 1.34, 1.99);                                  /* the guard's dark field */
    box(B.dark, XN, XN + 0.05, -0.62, 0.62, 1.42, 1.86);
    for (k = 0; k < 5; k++) box(B.paint, XN + 0.03, XN + 0.07, -0.60, 0.60, 1.46 + k * 0.08, 1.49 + k * 0.08);
    box(B.paint, XN + 0.10, XN + 0.16, -1.12, 1.12, 1.92, 1.97);
    box(B.paint, XN + 0.10, XN + 0.16, -1.12, 1.12, 1.36, 1.41);
    for (k = 0; k < 11; k++) {
      y = -1.10 + k * 0.218;
      box(B.paint, XN + 0.10, XN + 0.15, y - 0.02, y + 0.02, 1.36, 1.97);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XN, XN + 0.12, s * 1.10 - 0.03, s * 1.10 + 0.03, 1.40, 1.94);              /* the guard's stand-offs */
      box(B.glass, XN, XN + 0.05, s * 1.30 - 0.08, s * 1.30 + 0.08, 1.48, 1.66);              /* amber corner lamps */
      box(B.dark, XN - 0.01, XN + 0.03, s * 1.30 - 0.10, s * 1.30 + 0.10, 1.46, 1.68);
    }
    /* bumper with two lamp boxes each side, tow eyes; the raked grated apron under it (P1, P4) */
    box(B.paint, XN, XB, -1.45, 1.45, 0.98, 1.32);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        y = s * (k ? 1.10 : 0.55);
        box(B.dark, XB, XB + 0.03, y - 0.17, y + 0.17, 1.08, 1.24);
        box(B.glass, XB + 0.02, XB + 0.04, y - 0.14, y + 0.14, 1.11, 1.21);
      }
      box(B.dark, XB, XB + 0.08, s * 0.20 - 0.07, s * 0.20 + 0.07, 1.02, 1.12);
    }
    profY(B.paint, [[XB - 0.02, 0.98], [XN - 0.38, 0.62], [XN - 0.62, 0.62], [XN - 0.62, 0.98]], -1.10, 1.10);
    for (k = 0; k < 5; k++) {
      y = -0.88 + k * 0.44;
      bar(B.dark, [XB - 0.01, y, 0.99], [XN - 0.36, y, 0.625], 0.035);
    }
    /* the sides: door seam fields, the door window and the window behind it, the rear section's small high window,
       its seam, handles, the step ladders under the doors (P1, P2) */
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, CW, 0.015, 4.05, 5.45, 1.02, ZC - 0.12);
      sideBox(B.paint, s, CW + 0.015, 0.015, 4.08, 5.42, 1.05, ZC - 0.15);
      sideBox(B.dark, s, CW + 0.03, 0.01, 4.56, 5.34, 2.14, 2.82);
      sideBox(B.glass, s, CW + 0.04, 0.012, 4.60, 5.30, 2.18, 2.78);
      sideBox(B.dark, s, CW, 0.02, 3.36, 3.99, 2.14, 2.82);
      sideBox(B.glass, s, CW + 0.02, 0.012, 3.40, 3.95, 2.18, 2.78);
      sideBox(B.dark, s, CW + 0.03, 0.04, 4.15, 4.30, 2.00, 2.04);
      sideBox(B.dark, s, CW, 0.012, XCS - 0.02, XCS, 1.70, ZC - 0.05);
      sideBox(B.dark, s, CW, 0.015, 1.91, 2.39, 2.48, 2.86);
      sideBox(B.glass, s, CW + 0.015, 0.012, 1.95, 2.35, 2.52, 2.82);
      for (k = 0; k < 3; k++) sideBox(B.dark, s, CW, 0.10, 4.35, 5.20, 0.48 + k * 0.26, 0.51 + k * 0.26);
      sideBox(B.dark, s, CW, 0.12, 4.30, 4.34, 0.45, 1.02);
      sideBox(B.dark, s, CW, 0.12, 5.21, 5.25, 0.45, 1.02);
      /* the team strip, high on the rear section */
      sideBox(B.team, s, CW, 0.015, 1.85, 2.45, 2.28, 2.40);
      /* mirrors on arms at the front corners */
      bar(B.dark, [XN - 0.10, s * CW, 2.55], [XN + 0.10, s * (CW + 0.22), 2.65], 0.035);
      box(B.dark, XN + 0.05, XN + 0.13, s * (CW + 0.14), s * (CW + 0.30), 2.30, 2.75);
      /* the boxes on the roof's front corners (P1) */
      box(B.paint, XN - 0.80, XN - 0.30, s > 0 ? CW - 0.42 : -CW + 0.05, s > 0 ? CW - 0.05 : -CW + 0.42, ZC, ZC + 0.16);
    }
    box(B.dark, XC0 - 0.02, XC0, -1.20, 1.20, 1.85, 2.90);                                     /* rear wall seam */
    /* the raised roof panel with its grating, and the caged beacon at its front (P1, P2) */
    box(B.paint, 3.00, XN - 0.90, -0.95, 0.95, ZC, ZC + 0.10);
    for (k = 0; k < 7; k++) box(B.dark, 3.10 + k * 0.25, 3.14 + k * 0.25, -0.90, 0.90, ZC + 0.10, ZC + 0.12);
    cylZ(B.dark, XN - 0.62, 0, ZC, ZC + 0.06, 0.12, 10);
    cylZ(B.glass, XN - 0.62, 0, ZC + 0.06, ZC + 0.22, 0.09, 10);
    for (k = 0; k < 4; k++) {
      x = Math.cos(k / 4 * TAU + 0.785) * 0.12; y = Math.sin(k / 4 * TAU + 0.785) * 0.12;
      bar(B.dark, [XN - 0.62 + x, y, ZC + 0.05], [XN - 0.62 + x, y, ZC + 0.25], 0.015);
    }
    cylZ(B.dark, XN - 0.62, 0, ZC + 0.24, ZC + 0.26, 0.13, 10);
    box(B.dark, 2.00, 2.60, -0.40, 0.40, ZC, ZC + 0.05);                                       /* rear roof hatch */
  }

  /* ------------------------------------------------- the launcher (copied from ru_smerch.js, the same Smerch pack)
     the turntable and the rotating platform ("turret", origin on the slewing ring): the trunnion cheeks at its rear,
     and the elevating rams lying forward under the cradle beam (P2 shows the platform under the raised pack) */
  function addMount(B) {
    var s, k;
    cyl(B.dark, [0, 0, 0.0], [0, 0, 0.10], 0.90, 0.90, 28);
    box(B.paint, -1.30, 1.15, -0.98, 0.98, 0.10, 0.40);
    box(B.dark, -1.30, 1.15, -1.00, 1.00, 0.36, 0.40);
    for (k = 0; k < 3; k++) box(B.dark, -0.90 + k * 0.70, -0.86 + k * 0.70, -1.00, 1.00, 0.12, 0.36);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, PVX - 0.24, PVX + 0.30, s * 0.29, s * 0.35, 0.10, PVZ + 0.12);           /* trunnion cheeks */
      cylY(B.dark, PVX, s * 0.20, s * 0.37, PVZ, 0.09, 10);                                   /* pins */
      box(B.dark, -0.60, 1.10, s * 0.70 - 0.20, s * 0.70 + 0.20, 0.40, 0.44);                 /* platform rails */
      cyl(B.dark, [0.95, s * 0.16, 0.44], [3.15, s * 0.16, 0.46], 0.075, 0.075, 10);         /* elevating rams */
      cyl(B.paint, [0.75, s * 0.16, 0.44], [1.50, s * 0.16, 0.44], 0.11, 0.11, 10);
    }
    box(B.paint, 0.60, 1.10, -0.30, 0.30, 0.40, 0.48);
    /* the raised housing between the trunnion cheeks, standing up into the gap of the lower rows behind the cradle
       beam: what is left standing under the pack once it is raised (museum side view) */
    box(B.paint, PVX + 0.30, 0.95, -0.34, 0.34, 0.40, 0.80);
    box(B.dark, PVX + 0.30, 0.95, -0.35, 0.35, 0.76, 0.80);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) box(B.dark, -0.55 + k * 0.45, -0.25 + k * 0.45, s * 0.34, s * 0.355, 0.48, 0.72);
  }

  /* the pack: twelve 300 mm tubes, four in the top row (columns 2-5 of six) and two either side in each lower row,
     the middle of the lower rows taken by the cradle beam (P1 and P2 show the same layout as the 9A52's rear views);
     group "podelev", origin on the trunnion */
  function addPack(B, cells) {
    var c, r, y, z, k, x, SL = [0.55, 2.20, 3.85, 5.50], yo = 2.5 * TP + TR, yi = 1.5 * TP + TR, zt = ROWZ[2] + TR, zb = ROWZ[0] - TR, zm = ROWZ[1] + TR;
    var cols = [[1, 2, 3, 4], [0, 1, 4, 5], [0, 1, 4, 5]];
    for (r = 0; r < 3; r++) for (k = 0; k < 4; k++) {
      c = cols[2 - r][k]; y = (c - 2.5) * TP; z = ROWZ[r];
      cylX(B.paint, TX0 + 0.24, TX1 - 0.12, y, z, TR, 14);
      cyl(B.paint, [TX0, y, z], [TX0 + 0.16, y, z], TR + 0.035, TR + 0.025, 14, true, false);  /* tail collar, flared, open */
      cyl(B.paint, [TX0 + 0.16, y, z], [TX0 + 0.24, y, z], TR + 0.025, TR, 14, true, true);
      cylX(B.dark, TX0 + 0.08, TX0 + 0.10, y, z, TR + 0.03, 12);                                /* the bore, seen down it */
      cyl(B.paint, [TX1 - 0.12, y, z], [TX1, y, z], TR + 0.018, TR + 0.018, 14, false, true);  /* mouth ring, open */
      cylX(B.dark, TX1 - 0.09, TX1 - 0.07, y, z, TR + 0.012, 12);
      cells.push([TX1 + 0.05, y, z, TX0]);
    }
    /* the cradle beam in the gap of the lower rows, and its rail under the pack */
    box(B.paint, 2.20, TX1 - 0.40, -0.27, 0.27, zb - 0.02, ROWZ[2] - TR + 0.01);
    box(B.dark, 2.20, TX1 - 0.40, -0.28, 0.28, zb - 0.06, zb - 0.02);
    for (k = 0; k < 4; k++) box(B.dark, 2.6 + k * 1.0, 2.64 + k * 1.0, -0.28, 0.28, zb, ROWZ[2] - TR);
    /* the cradle's side plates either side of the housing, from the trunnion lugs to the beam */
    for (c = -1; c <= 1; c += 2) box(B.paint, 0.30, 2.25, c * 0.36, c * 0.40, -0.12, zb + 0.10);
    box(B.paint, TX0 + 0.20, 0.10, -0.38, 0.38, ROWZ[2] - TR - 0.10, ROWZ[2] - TR);
    /* clamp frames at four stations, following the stepped outline: top, shoulders, flanks, belly; side lugs */
    for (k = 0; k < 4; k++) {
      x = SL[k];
      box(B.paint, x, x + 0.09, -yi + 0.02, yi - 0.02, zt, zt + 0.035);
      box(B.paint, x, x + 0.09, -yi - 0.035, -yi + 0.01, zm, zt + 0.035);
      box(B.paint, x, x + 0.09, yi - 0.01, yi + 0.035, zm, zt + 0.035);
      box(B.paint, x, x + 0.09, -yo, -yi + 0.02, zm, zm + 0.035);
      box(B.paint, x, x + 0.09, yi - 0.02, yo, zm, zm + 0.035);
      box(B.paint, x, x + 0.09, -yo - 0.035, -yo, zb, zm + 0.035);
      box(B.paint, x, x + 0.09, yo, yo + 0.035, zb, zm + 0.035);
      box(B.paint, x, x + 0.09, -yo, yo, zb - 0.035, zb);
      box(B.dark, x + 0.01, x + 0.08, -yo - 0.10, -yo - 0.035, ROWZ[1] - 0.06, ROWZ[1] + 0.06);
      box(B.dark, x + 0.01, x + 0.08, yo + 0.035, yo + 0.10, ROWZ[1] - 0.06, ROWZ[1] + 0.06);
    }
    /* the lattice frame binding the tails (2011 parade, rear) and the one behind the mouths */
    for (k = 0; k < 2; k++) {
      x = k ? TX1 - 0.55 : TX0 + 0.30;
      box(B.dark, x, x + 0.06, -yo, yo, ROWZ[0] + TP / 2 - 0.025, ROWZ[0] + TP / 2 + 0.025);
      box(B.dark, x, x + 0.06, -yi, yi, ROWZ[1] + TP / 2 - 0.025, ROWZ[1] + TP / 2 + 0.025);
      for (c = 0; c < 5; c++) {
        y = (c - 2) * TP;
        if (c === 2) continue;
        box(B.dark, x, x + 0.06, y - 0.025, y + 0.025, (c === 0 || c === 4) ? zb : ROWZ[0], (c === 0 || c === 4) ? zm : zt);
      }
    }
    /* trunnion lugs either side of the beam, round the pins */
    for (c = -1; c <= 1; c += 2) box(B.dark, -0.22, 0.30, c * 0.20, c * 0.28, -0.14, zb + 0.10);
    /* the one team strip, across the top two middle tubes */
    box(B.team, 2.80, 3.60, -0.24, 0.24, zt + 0.005, zt + 0.03);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, wg, WB;
    addChassis(HB);
    addCab(HB);
    flush(THREE, g, HB);
    /* four axles, each one "roadwheel" group holding both wheels, origin on the axle centre */
    for (i = 0; i < 4; i++) {
      WB = new Bin(T.wheel, false, true);
      addAxle(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, RT);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    /* the launcher: "turret" (traverses on the ring) holding "podelev" (elevates about the rear trunnion; level when
       stowed, raised to userData.el by render3d.js poseLauncher) */
    var tur = new THREE.Group(), MB = bins(T), EB = bins(T), el = new THREE.Group(), cells = [];
    addMount(MB);
    flush(THREE, tur, MB);
    addPack(EB, cells);
    flush(THREE, el, EB);
    el.name = "podelev";
    el.position.set(PVX, 0, PVZ);
    el.userData.el = LAUNCH_EL;
    el.userData.cells = cells;
    tur.add(el);
    tur.name = "turret";
    tur.position.set(TX, 0, TZ);
    g.add(tur);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the stowed tube tails to the bumper's lamp boxes (published 12 m) */
UNIT_MODELS["pla_e00_mlrs"] = { len: 12.2, build: HeroPhl03.build };
