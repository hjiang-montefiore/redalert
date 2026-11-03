/* ============ pla_phl81.js - HERO model: the Type 81 (PHL-81) 122 mm 40-tube rocket launcher on the Shaanxi SX250 6x6 ============
   pla_e80_mlrs "Type 81 (PHL-81) 122mm 40-tube rocket launcher", in service 1982; turret:true (the launcher trains).

   Which vehicle: en.wikipedia "PHL-81": "a variant of the Soviet BM-21 Grad ... The Type 81 mounts a 40-round launcher on
   an Hongyan CQ261 6X6 truck chassis.  The truck was later changed to a Shaanxi SX250"; the same article captions P1
   "Rear view of Type 81 MLRS (SX250 chassis)" although the file is named for the CQ261.  Every Type 81 photograph found
   (P1-P3) shows the one truck, the Yan'an / Shaanxi SX250 of P4, and the unit's own description names the SX250, so the
   SX250 is drawn.  It is NOT the Ural-375: a crew cab with two doors a side and a flat front, the front axle under the
   cab, a long gap to the bogie.  The launcher is the BM-21's pack: forty tubes in four rows of ten, mouths forward over
   the cab, the trunnion at the rear of the turntable (js/hero/ru_bm14_bm21.js), here with the tails held in a box frame.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e80_mlrs_ref:
     P1  "Type 81 MLRS on Hongyan OQ261 chassis.jpg" - a crewed launcher on a range, starboard rear 3/4, pack raised a
         little: the crew cab with two doors a side and the door windows, the peaked roof, the air intake pipe rising
         behind the cab, the bench behind the cab with its black cushion and the tubular rail at its end, the spare wheel
         standing on edge between the bench and the cab, the cross tube at the bench's foot, the long fender over the
         bogie sloping down at its front and rolled down at the tail, the tails in their staggered rows in the rear box,
         the strap behind the mouths.
     P2  "Type 81 40-tube rocket launcher.jpg" - museum vehicle, starboard rear 3/4, pack raised about 20 degrees: the rear
         box round the tails (side plate with a slot, the flared tails standing out of its open end), the single strap
         behind the mouths, the cradle beam under the pack deep at the trunnion and tapering forward, the housing with a
         sloped top on the turntable, the trunnion boss at the turntable's rear, the cylinder lying aft along the side,
         the fender's flat top and outer skirt, the boxed lamp brackets at the rear corners, the dark cylinder on the
         starboard side behind the cab, the goose-neck of the intake over the cab's rear; MEASURING PHOTO for the axle
         spacing (hub positions corrected for perspective by the local tyre radius: front to middle 2.3 times middle to
         rear) and the trunnion height (2.4 tyre radii over the rear hub, on the near side; about 2.15 m on the centre).
     P3  "Type 81 122mm rocket launcher.jpg" - the same museum vehicle, port front 3/4: the cab front (mesh panel over three
         slatted bands, the twin headlamps in wire cages at the corners, the deep bumper with the tow hooks, the windscreens
         leaning back under the roof's peak), the two doors, the mirror on its long arm, the flared arch round the front
         wheel with the axle under the joint between the doors, the black fuel tank on the port side between the cab and
         the bogie; MEASURING PHOTO for the heights (scaled from the roof and the ground at the cab's near front corner,
         against the tyre: roof 2.4 tyre heights, windscreen foot 1.92 m, grille 1.16-1.84, headlamps 1.30, bumper
         0.68-1.06 at a 2.65 m roof), the cab's split about the front axle (1.15 m ahead, 0.95 m behind) and the second
         axle-spacing ratio (2.3, as P2); the fender top 1.54 tyre radii over the middle hub (1.40 m).
     P4  the Commons file named in Chinese characters "Yan'an SX250.jpg" (the Yan'an SX250 cargo truck in a museum, from
         en.wikipedia "Shaanxi SX2150") - front left 3/4:
         the same cab - the flat front, the grille panel, the twin lamps either side, the full-width bumper - and the black
         wheels; it confirms the truck of P1-P3 is the SX250.
     ru_bm14_bm21.js / pla_phl03.js - the launcher conventions (nodes, userData.el and .cells, the stowed pose), the BM-21's
         tube pitch, radius and row pitch, the 3.0 m tube.
   Published: NONE reachable for the Type 81 itself.  en.wikipedia "PHL-81"'s infobox (9.8 x 3.24 x 3.50 m with AAMG,
     18-30 t, torsion bars, a 520 hp 12-cylinder engine) is the tracked PHZ-89's, not the truck's, and is not used;
     military-today, globalsecurity and sinodefence were not reachable from this machine; en.wikipedia "Shaanxi SX2150"
     gives no figures.  The model is scaled on its tyre, taken as 1.10 m (NOT CONFIRMED), and its proportions are the
     photographs'.  The row's own armour_specs entry (7.4 x 2.5 x 3.1, no source) agrees to within 0.25 m in length.

   Recognition list (what makes it read at game zoom, and its source):
     1. The SX250's flat-fronted crew cab with two doors a side, the front axle under it - P1, P3, P4: addCab.
     2. The grille panel between the caged twin headlamps, the deep bumper - P3, P4: addCab.
     3. 6x6 with the long gap to the bogie; the long flat fender over the bogie - P1, P2, P3: AX, addChassis.
     4. The BM-21 pack, forty tubes in four staggered rows of ten, mouths forward, tails in the rear box - P1, P2: addPack.
     5. The turntable over the bogie with the trunnion at its rear - P2: addMount, "turret", "podelev".
     6. The bench, the spare wheel on edge and the intake pipe behind the cab - P1, P2, P3: addChassis.
   Paint: plain PLA green as the other PLA heroes (#525c3a); P1 wears desert camouflage and P2/P3 the digital camouflage
   of the museum: not drawn.  No stars, numbers, plates or emblems (P2's placard is not drawn).  Cab shields: NONE - no
   photograph shows armour or window shutters on the cab (unlike the BM-14), so none are drawn.
   NOT CONFIRMED, judgement calls: every length in metres (ratios measured, the scale is the 1.10 m tyre); the tyre's width
   (0.32) and the track (1.96); the axle spacing in metres (3.10 and 1.35: the bogie's 1.35 from the near-touching tyres
   of P1-P3); the rear overhang (1.0 m to the frame end), the cab's half width (1.18), its length (2.10); the deck heights;
   the bench's size and the spare wheel's exact place; the fuel tank's and the starboard cylinder's sizes; the rear box's
   depth (0.65 m) and the strap's place; the cradle beam's depth; the housing; the turntable's place (0.80 m behind the
   middle axle) and the trunnion 0.75 m behind its centre; the cylinders lying aft (seen on the starboard side
   only, drawn both sides); THE STOWED POSE: no photograph of a Type 81 travelling was found; the pack lies level with
   its mouths forward over the bench, as the BM-21's does (ru_bm14_bm21.js, on BM-21 photographs).
   NOT drawn: the flat cover plate over the rear of the pack in P1 (not on the museum vehicle), aerials, nets, markings,
   any rear jacks (none seen).
   Elevation: 35 degrees, as ru_bm14_bm21.js (not a published figure; P1-P3 show 15-25 degrees).

   Mechanisms (as ru_bm14_bm21.js and pla_phl03.js): "turret" is the turntable (origin on the slewing ring at x -1.55,
   z 1.48), trained by the engine with the mouths along +X at rest.  Inside it, "podelev" is the pack and its cradle,
   hinged at the rear trunnion (x -2.30, z 2.15 on the hull), stowed level at rotation 0; userData.el is the launch
   elevation and userData.cells the 40 mouths [x, y, z, tail x] in the group frame (render3d.js poseLauncher /
   launchOffset).  Three "roadwheel" groups, one per axle holding both wheels (axle along local Y, origin on the axle).
   Materials 5: paint (canvas texture, metre UVs), dark, glass, wheel (vertex colours: tyres, black wheels, hubs), C.team
   (a strip on the pack's rear box, one high on each rear door).  Draw calls: hull 4 + wheels 3 + turntable 2 + pack 3 = 12.
   Measured: 7.16 m over the tow hooks and the rear lamp brackets (no published figure; armour_specs 7.4); 2.50 m over the
   body and fenders, 2.96 over the mirrors (armour_specs 2.5); 2.65 m to the cab roof, 2.88 over the stowed pack's rear
   box (armour_specs 3.1).
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPhl81 = (function () {
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
     +X nose, +Y port, +Z up, metres, tyres on z = 0.  Scale: the tyre (1.10 m, NOT CONFIRMED); the side stations from
     the ratios of P2 and P3 (see the header). */
  var XB = 3.74, XN = 3.50, XC = 1.40;               /* bumper front, cab front face, cab rear wall */
  var AX = [2.35, -0.75, -2.10], TY = 0.98, RT = 0.55; /* axles; half track; tyre radius */
  var CW = 1.18, ZR = 2.65, ZW = 1.92, ZS = 1.98;    /* cab half width, roof, windscreen foot, side window sill */
  var XT = -3.10;                                    /* frame end */
  var ZK = 1.42, ZD = 1.32;                          /* the fender top / launcher deck; the deck behind the cab */
  var RX = -1.55, RZ = 1.48;                         /* the turntable centre ("turret" origin) */
  var PVX = -0.75, PVZ = 0.67;                       /* the trunnion in the turret frame (2.15 m over the ground) */
  var TP = 0.145, TRR = 0.06, RP = 0.125, Z0 = 0.18; /* tube pitch, radius, row pitch; bottom row over the trunnion */
  var TX0 = -0.45, TX1 = 2.55;                       /* tube tails and mouths from the trunnion (3.0 m tubes) */
  var BX0 = -0.40, BX1 = 0.25;                       /* the rear box round the tails */
  var LAUNCH_EL = 35 * Math.PI / 180;
  var PAINT = { base: "#525c3a", blots: ["#4a5434", "#5a6442", "#4e5737"], seed: 8122 };

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
     1.10 m cross-country tyre, 0.32 m wide (NOT CONFIRMED) at y = yc: staggered lug blocks across the crown (P2, P3);
     the wheel black (P2, P3, P4): dished disc, hub, nut ring on the outer face (s the side) */
  var TYRE = [0.10, 0.105, 0.11], RIMC = [0.07, 0.075, 0.08], HUBC = [0.12, 0.125, 0.13], NUT = [0.18, 0.18, 0.17];
  function tyre(W, yc, s) {
    var N = 22, R = [[-0.16, 0.33, 0, 0], [-0.16, 0.45, 0, 0], [-0.13, 0.53, 1, 0], [-0.05, 0.55, 1, 0], [-0.01, 0.55, 1, 1],
                     [0.01, 0.55, 1, 0], [0.05, 0.55, 1, 1], [0.13, 0.53, 1, 1], [0.16, 0.45, 0, 0], [0.16, 0.33, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.03;
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
    W.col = RIMC;
    cyl(W, [0, yc + s * 0.15, 0], [0, yc + s * 0.18, 0], 0.33, 0.28, 16, true, false);       /* dished disc */
    W.col = HUBC;
    cylY(W, 0, yc + s * 0.18, yc + s * 0.24, 0, 0.11, 10);                                  /* hub */
    W.col = NUT;
    for (j = 0; j < 8; j++) {                                                               /* nut ring */
      a = j / 8 * TAU;
      cylY(W, 0.16 * Math.cos(a), yc + s * 0.18, yc + s * 0.20, 0.16 * Math.sin(a), 0.018, 4);
    }
  }
  /* one axle: both wheels and the axle beam between them, origin on the axle centre */
  function addAxle(W) {
    tyre(W, TY, 1);
    tyre(W, -TY, -1);
    W.col = [0.14, 0.15, 0.16];
    cylY(W, 0, -0.82, 0.82, 0, 0.08, 8);
    box(W, -0.18, 0.18, -0.24, 0.24, -0.16, 0.16);
  }

  /* ---------------------------------------------------------------- chassis, fenders, the deck behind the cab */
  function addChassis(B) {
    var s, k, i, yo, y;
    box(B.dark, XT, XN - 0.20, -0.48, 0.48, 0.70, 0.98);                                 /* frame rails */
    for (i = 0; i < 3; i++) box(B.dark, AX[i] - 0.45, AX[i] + 0.45, -0.70, 0.70, 0.62, 0.72);    /* springs */
    box(B.dark, AX[1] - 0.10, AX[2] + 0.10, -0.62, 0.62, 0.58, 0.70);                    /* bogie trunnion beam */
    /* rear: crossmember, tow hook, the boxed lamp brackets at the corners (P2) */
    box(B.dark, XT - 0.06, XT + 0.10, -1.15, 1.15, 0.70, 0.98);
    box(B.dark, XT - 0.16, XT - 0.06, -0.07, 0.07, 0.74, 0.86);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XT - 0.12, XT + 0.10, s * 0.92 - 0.14, s * 0.92 + 0.14, 0.86, 1.10);
      box(B.glass, XT - 0.13, XT - 0.12, s * 0.92 - 0.08, s * 0.92 + 0.08, 0.94, 1.04);
    }
    for (s = -1; s <= 1; s += 2) {
      yo = s > 0 ? [0.72, 1.24] : [-1.24, -0.72];
      /* the long fender over the bogie, flat on top at the deck, the front sloping down ahead of the middle axle and
         the rear rolled down to the tail (P1, P2, P3) */
      ribbon(B.paint, [[0.30, 1.02], [0.10, 1.30], [-0.10, ZK], [AX[1], ZK], [AX[2], ZK], [XT + 0.45, ZK],
                       [XT + 0.15, 1.30], [XT + 0.02, 1.05], [XT + 0.02, 0.80]], yo[0], yo[1], 0.05);
      /* the outer skirt, leaning out a little (P2) */
      box(B.paint, -0.10, XT + 0.45, s * 1.20, s * 1.25, 1.18, ZK);
      box(B.dark, 0.26, 0.30, yo[0] + 0.04, yo[1] - 0.04, 0.40, 1.02);                       /* mud flaps */
      box(B.dark, XT + 0.0, XT + 0.04, yo[0] + 0.04, yo[1] - 0.04, 0.38, 0.80);
    }
    /* the launcher deck between the fenders */
    box(B.paint, XT + 0.30, 0.0, -0.72, 0.72, ZK - 0.08, ZK);
    /* the deck behind the cab */
    box(B.paint, 0.10, XC, -1.10, 1.10, ZD - 0.06, ZD);
    box(B.dark, 0.10, XC, -0.50, 0.50, 0.98, ZD - 0.06);
    /* port: the fuel tank between the cab and the bogie (P3); starboard: the dark cylinder and box (P2) */
    box(B.dark, -0.05, 1.10, 0.72, 1.12, 0.55, 1.05);
    for (k = 0; k < 2; k++) box(B.dark, 0.20 + k * 0.62, 0.26 + k * 0.62, 0.70, 1.15, 0.53, 1.07);
    cylY(B.dark, 0.85, 1.12, 1.15, 0.92, 0.06, 8);
    cyl(B.dark, [-0.05, -0.92, 0.82], [1.10, -0.92, 0.82], 0.21, 0.21, 14);
    box(B.dark, 0.05, 0.85, -0.70, -0.62, 0.62, 1.00);
    /* the crew bench across the deck behind the cab: box, black cushion, a tubular rail at each end (P1, P2, P3) */
    box(B.paint, 0.22, 0.84, -1.00, 0.95, ZD, 1.82);
    box(B.dark, 0.20, 0.86, -1.02, 0.97, 1.82, 1.92);
    for (k = 0; k < 4; k++) sideBox(B.dark, 1, 0.95, 0.02, 0.30 + k * 0.14, 0.34 + k * 0.14, 1.40, 1.76);
    for (s = -1; s <= 1; s += 2) {
      y = s > 0 ? 1.00 : -1.05;
      bar(B.dark, [0.28, y, 1.80], [0.28, y, 2.18], 0.035);
      bar(B.dark, [0.78, y, 1.80], [0.78, y, 2.18], 0.035);
      bar(B.dark, [0.26, y, 2.18], [0.80, y, 2.18], 0.035);
    }
    /* the cross tube at the bench's fore foot, seen at both ends (P1, P2, P3) */
    cylY(B.paint, 0.95, -1.08, 1.03, 1.52, 0.075, 10);
    /* the spare wheel standing on edge against the cab's rear wall, to port of the middle (P1, P2, P3) */
    cyl(B.dark, [1.00, 0.28, 1.84], [1.32, 0.28, 1.84], 0.55, 0.55, 20);
    cyl(B.dark, [0.98, 0.28, 1.84], [1.34, 0.28, 1.84], 0.30, 0.30, 12);
    box(B.dark, 1.30, XC, 0.10, 0.46, 1.70, 1.80);
    /* the air intake rising behind the cab and turned over at the top (P1, P2) */
    cylZ(B.dark, 1.30, -0.55, ZD, 2.82, 0.07, 10);
    cyl(B.dark, [1.30, -0.55, 2.82], [1.08, -0.55, 2.82], 0.07, 0.07, 10);
    cyl(B.dark, [1.08, -0.55, 2.84], [1.08, -0.55, 2.66], 0.09, 0.09, 10, false, true);
    box(B.dark, 1.30, XC, -0.60, -0.50, 2.20, 2.26);
  }

  /* ---------------------------------------------------------------- the cab
     The SX250's crew cab (P3, P4): a flat front with the two windscreens leaning back under a peaked roof, the grille
     panel in the middle of the lower front (a mesh panel over three slatted bands), the twin headlamps in wire cages
     at the corners, the deep bumper; two doors a side, the front axle under the joint between them in a flared arch */
  function addCab(B) {
    var s, k, y, xa0 = AX[0] - 0.70, xa1 = AX[0] + 0.70, ZA = 1.30, ZF = 1.00;
    /* upper body, side profile: the windscreen leaning back from its foot, the roof */
    profY(B.paint, [[XN, ZA], [XN, ZW], [XN - 0.16, ZR - 0.06], [XN - 0.22, ZR], [XC, ZR], [XC, ZA]], -CW, CW);
    /* the roof's peak over the windscreen and its raised rim (P3, P4) */
    profY(B.paint, [[XN - 0.24, ZR - 0.02], [XN - 0.06, ZR - 0.04], [XN - 0.04, ZR], [XN - 0.24, ZR + 0.04]], -CW, CW);
    box(B.paint, XC + 0.05, XN - 0.24, -CW + 0.06, CW - 0.06, ZR, ZR + 0.04);
    /* lower body ahead of the arch, behind it, the arch's crown with its flare */
    box(B.paint, xa1, XN, -CW, CW, ZF, ZA + 0.01);
    box(B.paint, XC, xa0, -CW, CW, 0.92, ZA + 0.01);
    for (s = -1; s <= 1; s += 2) {
      ribbon(B.paint, [[xa0 - 0.06, 0.80], [xa0 - 0.02, 1.10], [AX[0] - 0.42, 1.28], [AX[0] + 0.42, 1.28], [xa1 + 0.02, 1.10],
                       [xa1 + 0.06, ZF]], s * (CW - 0.06), s * (CW + 0.05), 0.07);
    }
    box(B.paint, xa0, xa1, -CW + 0.30, CW - 0.30, 0.95, ZA + 0.01);                        /* the wheel boxes' inner wall */
    box(B.paint, xa0 - 0.10, xa1 + 0.10, -CW, CW, 1.24, ZA + 0.01);
    /* the windscreens: dark frame, two panes either side of the centre pillar, wipers */
    var a = Math.atan2(0.16, ZR - 0.06 - ZW), U = [-Math.sin(a), 0, Math.cos(a)], Wv = [0, 1, 0], Nn = [Math.cos(a), 0, Math.sin(a)];
    var P0 = [XN, 0, ZW], L = (ZR - 0.06 - ZW) / Math.cos(a);
    planeBox(B.dark, P0, U, Wv, Nn, 0.04, L - 0.04, -CW + 0.06, CW - 0.06, -0.01, 0.015);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.glass, P0, U, Wv, Nn, 0.07, L - 0.07, s > 0 ? 0.05 : -CW + 0.11, s > 0 ? CW - 0.11 : -0.05, 0.015, 0.035);
      bar(B.dark, [XN + 0.05, s * 0.25, ZW + 0.08], [XN + 0.0, s * 0.62, ZW + 0.42], 0.022);
    }
    /* the lower front: the grille panel (mesh, then three slatted bands) between the corner panels (P3, P4) */
    box(B.dark, XN, XN + 0.02, -0.46, 0.46, 1.14, 1.86);
    box(B.paint, XN, XN + 0.04, -0.48, 0.48, 1.84, 1.90);
    box(B.paint, XN, XN + 0.04, -0.48, 0.48, 1.58, 1.62);
    for (k = 0; k < 2; k++) box(B.paint, XN, XN + 0.035, -0.46, 0.46, 1.29 + k * 0.145, 1.31 + k * 0.145);
    for (s = -1; s <= 1; s += 2) box(B.paint, XN, XN + 0.04, s * 0.48 - 0.03, s * 0.48 + 0.03, 1.12, 1.90);
    for (s = -1; s <= 1; s += 2) {
      /* twin headlamps in a wire cage at each corner */
      for (k = 0; k < 2; k++) {
        y = s * (0.72 + k * 0.21);
        cylX(B.dark, XN, XN + 0.06, y, 1.30, 0.095, 12);
        cylX(B.glass, XN + 0.06, XN + 0.075, y, 1.30, 0.08, 12);
      }
      box(B.dark, XN + 0.13, XN + 0.15, s * 0.60, s * 1.06, 1.18, 1.20);
      box(B.dark, XN + 0.13, XN + 0.15, s * 0.60, s * 1.06, 1.40, 1.42);
      for (k = 0; k < 4; k++) box(B.dark, XN, XN + 0.15, s * (0.62 + k * 0.14) - 0.01, s * (0.62 + k * 0.14) + 0.01, 1.18, 1.42);
      /* a small lamp high on the corner, under the windscreen */
      box(B.dark, XN, XN + 0.03, s * 0.95 - 0.06, s * 0.95 + 0.06, 1.68, 1.76);
    }
    /* the bumper, tow hooks, the step under it */
    box(B.paint, XN - 0.10, XB, -1.22, 1.22, 0.70, 1.04);
    box(B.dark, XB - 0.01, XB + 0.005, -1.10, 1.10, 0.84, 0.86);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XB, XB + 0.10, s * 0.50 - 0.04, s * 0.50 + 0.04, 0.88, 0.98);
      bar(B.dark, [XB + 0.08, s * 0.50, 0.98], [XB + 0.14, s * 0.50, 1.06], 0.05);
      cylY(B.dark, XB - 0.08, s * 1.04, s * 1.08, 0.90, 0.04, 8);
    }
    box(B.dark, XN - 0.30, XN - 0.10, -0.50, 0.50, 0.66, 0.72);
    /* the sides: door seams, the windows of both doors, handles, hinges, the steps under the doors, mirrors */
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, CW, 0.008, 3.13, 3.15, 1.02, ZR - 0.08);                  /* front door's leading edge */
      sideBox(B.dark, s, CW, 0.008, 2.32, 2.34, 0.95, ZR - 0.08);                  /* the joint between the doors */
      sideBox(B.dark, s, CW, 0.008, 1.48, 1.50, 0.95, ZR - 0.08);
      sideBox(B.dark, s, CW, 0.008, 1.48, 3.15, ZR - 0.10, ZR - 0.08);
      sideBox(B.dark, s, CW, 0.012, 2.42, 3.05, ZS, 2.50);
      sideBox(B.glass, s, CW + 0.004, 0.012, 2.45, 3.02, ZS + 0.03, 2.47);
      sideBox(B.dark, s, CW, 0.012, 1.58, 2.25, ZS, 2.50);
      sideBox(B.glass, s, CW + 0.004, 0.012, 1.61, 2.22, ZS + 0.03, 2.47);
      sideBox(B.dark, s, CW, 0.03, 2.48, 2.62, 1.78, 1.81);                        /* handles */
      sideBox(B.dark, s, CW, 0.03, 2.08, 2.22, 1.78, 1.81);
      for (k = 0; k < 2; k++) sideBox(B.dark, s, CW, 0.03, 2.36, 2.40, 1.45 + k * 0.55, 1.58 + k * 0.55);   /* hinges */
      box(B.dark, 1.55, 2.25, s * (CW - 0.10), s * (CW + 0.02), 0.66, 0.70);           /* step under the rear door */
      box(B.dark, 1.55, 1.58, s * (CW - 0.10), s * (CW + 0.02), 0.66, 0.92);
      box(B.dark, 2.22, 2.25, s * (CW - 0.10), s * (CW + 0.02), 0.66, 0.92);
      /* the team strip, high on the rear door below the roof */
      sideBox(B.team, s, CW, 0.012, 1.62, 2.20, 2.53, 2.58);
      /* the mirror on its long arm from the front corner (P3, P4) */
      bar(B.dark, [XN - 0.25, s * CW, 2.05], [XN - 0.10, s * (CW + 0.20), 2.10], 0.025);
      bar(B.dark, [XN - 0.10, s * (CW + 0.20), 2.10], [XN - 0.10, s * (CW + 0.20), 2.30], 0.025);
      box(B.dark, XN - 0.14, XN - 0.08, s * (CW + 0.13), s * (CW + 0.30), 2.18, 2.48);
    }
    box(B.glass, XC - 0.01, XC, -0.50, 0.50, 2.08, 2.42);                             /* rear window */
  }

  /* ------------------------------------------------- the launcher
     the turntable and the rotating platform ("turret", origin on the slewing ring): the trunnion cheeks at its rear,
     the housing under the cradle with its sloped front, the cylinders lying aft on either side (P1, P2, P3) */
  function addMount(B) {
    var s, k;
    cyl(B.dark, [0, 0, 0.0], [0, 0, 0.10], 0.80, 0.80, 26);
    box(B.paint, -0.95, 0.80, -0.75, 0.75, 0.10, 0.34);
    box(B.dark, -0.95, 0.80, -0.77, 0.77, 0.32, 0.36);
    /* the housing between the cheeks (P2: the box with the sloped top under the raised cradle) */
    profY(B.paint, [[PVX + 0.20, 0.36], [0.85, 0.36], [0.85, 0.50], [0.45, 0.78], [PVX + 0.20, 0.78]], -0.42, 0.42);
    for (k = 0; k < 2; k++) sideBox(B.dark, 1, 0.42, 0.01, -0.30 + k * 0.45, 0.05 + k * 0.45, 0.42, 0.70);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, PVX - 0.20, PVX + 0.22, s * 0.42, s * 0.52, 0.10, PVZ + 0.12);           /* trunnion cheeks */
      cylY(B.dark, PVX, s * 0.36, s * 0.60, PVZ, 0.08, 10);                                   /* pins and bosses */
      cylY(B.dark, PVX, s * 0.52, s * 0.62, PVZ, 0.12, 12);
      /* the cylinder lying aft along the side under the pack's tail, on its brackets (P2) */
      cylX(B.paint, PVX - 0.70, PVX + 0.10, s * 0.62, 0.40, 0.085, 10);
      cylX(B.dark, PVX - 0.80, PVX - 0.70, s * 0.62, 0.40, 0.05, 8);
      box(B.dark, PVX - 0.84, PVX - 0.76, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.10, 0.44);
    }
  }

  /* the pack: forty 122 mm tubes, four rows of ten, the rows staggered by half a pitch (P1, P2), the tails held in
     the box frame at the rear (P2: side plates with a slot, the flared tails standing out of its open end), one
     strap behind the mouths (P1, P2), the cradle beam under the pack; group "podelev", origin on the trunnion */
  function addPack(B, cells) {
    var r, i, y, z, zt, zb, hw = 5 * TP + TRR + 0.02, xs;
    zb = Z0 - TRR - 0.03; zt = Z0 + 3 * RP + TRR + 0.03;
    for (r = 0; r < 4; r++) for (i = 0; i < 10; i++) {
      y = (i - 4.5) * TP + (r & 1 ? TP / 4 : -TP / 4); z = Z0 + r * RP;
      cylX(B.paint, BX1 - 0.02, TX1, y, z, TRR, 10);
      cyl(B.paint, [TX0, y, z], [TX0 + 0.08, y, z], TRR + 0.012, TRR, 10, true, true);       /* flared tail, open */
      cylX(B.dark, TX0 + 0.05, TX0 + 0.06, y, z, TRR, 8);
      cylX(B.dark, TX1 - 0.03, TX1 + 0.002, y, z, TRR * 0.85, 8);                              /* the bore at the mouth */
      cells.push([TX1 + 0.05, y, z, TX0]);
    }
    /* the rear box: side plates (a slot in each), top and bottom plates, a frame plate across its front */
    for (y = -1; y <= 1; y += 2) {
      box(B.paint, BX0, BX1, y * hw, y * (hw + 0.03), zb, zt);
      box(B.dark, BX0 + 0.25, BX0 + 0.33, y * (hw + 0.03), y * (hw + 0.035), Z0 + 0.10, Z0 + 0.28);
    }
    box(B.paint, BX0, BX1, -hw - 0.03, hw + 0.03, zt, zt + 0.03);
    box(B.paint, BX0, BX1, -hw - 0.03, hw + 0.03, zb - 0.03, zb);
    box(B.paint, BX1 - 0.04, BX1, -hw, hw, zb, zb + 0.04);
    box(B.paint, BX1 - 0.04, BX1, -hw, hw, zt - 0.04, zt);
    /* the strap behind the mouths, with its bolt lugs */
    xs = TX1 - 0.40;
    box(B.dark, xs, xs + 0.05, -hw, hw, zt - 0.02, zt);
    box(B.dark, xs, xs + 0.05, -hw, hw, zb, zb + 0.02);
    box(B.dark, xs, xs + 0.05, -hw - 0.015, -hw + 0.005, zb, zt);
    box(B.dark, xs, xs + 0.05, hw - 0.005, hw + 0.015, zb, zt);
    /* the cradle beam under the pack, deep at the trunnion and tapering forward (P2), the lugs round the pins */
    profY(B.paint, [[-0.10, -0.12], [0.30, -0.22], [2.10, zb - 0.06], [2.10, zb], [-0.10, zb]], -0.34, 0.34);
    box(B.dark, -0.12, 2.10, -0.36, 0.36, zb - 0.02, zb);
    for (y = -1; y <= 1; y += 2) box(B.paint, -0.18, 0.22, y * 0.34, y * 0.40, -0.12, zb);
    /* the one team strip, along the top of the pack */
    box(B.team, BX0 + 0.08, BX1 - 0.08, -0.30, 0.30, zt + 0.03, zt + 0.042);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, wg, WB;
    addChassis(HB);
    addCab(HB);
    flush(THREE, g, HB);
    /* three axles, each one "roadwheel" group holding both wheels, origin on the axle centre */
    for (i = 0; i < 3; i++) {
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
    tur.position.set(RX, 0, RZ);
    g.add(tur);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the rear lamp brackets to the bumper's tow hooks */
UNIT_MODELS["pla_e80_mlrs"] = { len: 7.16, build: HeroPhl81.build };
