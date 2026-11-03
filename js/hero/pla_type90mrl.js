/* ============ pla_type90mrl.js - HERO model: the Type 90B 122 mm 40-tube rocket launcher on the Beifang Benchi 2629 6x6 ============
   pla_e90_mlrs "Type 90/90B 122mm 40-tube rocket launcher", in service 1994; turret:true (the launcher trains).

   Which vehicle: en.wikipedia "PHL-81" (section Variants): "Type 90 ... the rockets are mounted on a Tiema SC2030 6X6
   truck.  The truck also carries a reload pack of 40 additional rockets"; "Type 90A ... mounted on a Tiema XC2200 6x6";
   "Type 90B ... mounted on a Beifang Benchi 2629 6x6 trucks".  Every photograph found (Wikimedia Commons, the Peruvian
   Army's 27 Type 90B, delivered 2015) shows the 90B, and none of the Type 90 or 90A on a Tiema truck was found, so the
   90B is drawn: the Beifang Benchi 2629 (the licensed Mercedes-Benz NG) 6x6 with its short flat-fronted cab, the
   tarpaulin-covered reload box of 40 rounds behind the cab, the loader, and the BM-21-type pack at the rear.

   References, Wikimedia Commons at width 960 (P1 and P3 also at 2400), cached in scratchpad/q_pla_e90_mlrs_ref:
     P1  "Type 90B Peru.jpg" - a line of launchers parked, the first seen from the port side a little from behind,
         telephoto: the cab's side (door window, rear quarter window, the black flared arch over the front wheel), the
         reload box with round shoulders and the tarpaulin in vertical folds over its front and sides, its open rear
         showing the rack (the plate with forty holes in four rows of ten, shelves over it), the loader with its post
         and the perforated block, the pack lying level with the MOUTHS FORWARD and bare, one clamp band behind them,
         the tail box at the rear with a slot in its side and the end plate with the forty tail holes, the sight
         bracket with the handwheel on the port side, the housing under the cradle with its placard, the cylinder
         lying aft under the tail box, the flat deck, the bogie with its guards, the rear lamps, the dark wheels.
     P2  "MINISTRO DE DEFENSA ... (19816606085).jpg" - a launcher driving, port front 3/4: the cab's flat front, the
         wide windscreen, the black grille panel across the front, the lamps in the bumper, the spare wheel standing on
         edge behind the cab on the port side.
     P3  "MINISTRO DE DEFENSA ... (19629861339).jpg" - a launcher driving past at night, port side, SIDE-ON: THE
         MEASURING PHOTO (scale the tyre, 166 px at 2x = 1.24 m, 134 px a metre): bumper at x +4.85 (origin near the middle of
         the length), the axles at +3.45, -1.59, -3.04 (front to middle 5.04 m, middle to rear 1.45 m), the cab 2.12 m
         long, its roof 3.15 m, windscreen 2.12-2.93 m, the deck 1.45 m from +2.09 to -4.85, the reload box +2.08 to
         +0.43 and 3.39 m high, the loader's posts (3.05 m) and its four-row guide block, the spare wheel's place, the
         fuel tank, the tool box, the exhaust, the rear lamps; the pack here trained 180 degrees (mouths aft, tail box
         forward, the reloading position): tails to mouths 3.06 m, 2.13-2.75 m high, the trunnion and the elevating
         gear just behind the tail box at 2.00 m, the turntable's ring at 1.62 m centred at x -3.54
         (where the pack in P1's travelling pose, mouths forward, has the same span mirrored).
     P4  "MINISTRO DE DEFENSA ... (19195724223).jpg" - launchers head-on: the widths (cab 2.16-2.30 m against its
         3.15 m roof; tyres 2.37 m over the outsides), the single wide windscreen, the raised hatch on the roof and the
         post at its front, the grille panel's bars, two lamps a side in the bumper, the big mirrors on their arms.
     P5  "MINISTRO DE DEFENSA ... (19809366302).jpg" - the line from behind: every pack's tail end with its plate of
         forty holes in four rows of ten facing aft (the travelling pose), the rear lamps, the deck's tail.
     P6  "MINISTRO DE DEFENSA ... (19790767456).jpg" - from behind, a pack raised: the four rows of ten, the cradle,
         the housing on the turntable, the pack pivoting at its tail end.
     ru_bm14_bm21.js / pla_phl81.js - the launcher conventions (nodes, userData.el and .cells, the stowed pose), the
         BM-21's 3.0 m tube against which the scale was checked.
   Published: the variants and trucks only (en.wikipedia "PHL-81", above); no dimensions reachable for the Type 90B
     (military-today, globalsecurity, fas.org: not reachable from this machine; en.wikipedia "Mercedes-Benz NG" gives
     no dimensions).  The model is scaled on its tyre, taken as 1.24 m (a 14.00-20, NOT CONFIRMED), which makes the
     pack's tubes 3.06 m against the BM-21's published 3.0 m: the scale agrees to 2 per cent.  The row's armour_specs
     entry (9.0 x 2.5 x 3.0, no source) is 0.7 m shorter than the measured truck.

   Recognition list (what makes it read at game zoom, and its source):
     1. The short flat-fronted NG cab over the front axle, the black grille panel, the black flared arch - P2, P3, P4: addCab.
     2. 6x6 with the long gap to the bogie, the flat deck running to the tail - P1, P3: AX, addChassis.
     3. The reload box with round shoulders and the tarpaulin's folds behind the cab - P1, P2, P3: addReload.
     4. The loader's posts and guide block between the box and the pack - P1, P3: addLoader.
     5. The pack, forty tubes in four rows of ten, the tail box at its rear, mouths forward - P1, P5: addPack.
     6. The turntable at the tail with the housing and the trunnion at the pack's tail end - P1, P3, P6: addMount.
   Paint: plain PLA green as the other PLA heroes (#525c3a); the Peruvian vehicles are sand: not drawn.  No stars,
   numbers, plates, flags or emblems (the maker's badge on the grille and P4's number boards are not drawn).
   THE TURRET'S REST: the engine trains the "turret" with the mouths on +X at rest, which is P1's and P5's travelling
   pose (mouths forward over the loader); P3's reloading pose (mouths aft, tails at the loader) is the same pack trained
   180 degrees, which the model reaches whenever it fires astern.
   NOT CONFIRMED, judgement calls: every length in metres (P3's ratios, the scale the 1.24 m tyre); the tyre's width
   (0.38) and the half track (1.00, from P4); the cab's half width (1.15, P4 gives 1.08-1.15); the deck's half width
   (1.22); the reload box's half width (1.15), its shoulder radius and the rack inside it (P1 shows the plate and the
   shelves only through the open rear); the loader: the starboard posts (P1 and P3 show the port ones), the guide block's
   width, the tray stopped at -1.90 m (P3 shows it running on under the reloading pose's tail box); the housing's shape,
   the cylinders (P1 shows the port one, drawn both sides); the trunnion 0.88 m ahead of the ring's centre and its
   height (P3, the gear's hub); the starboard fuel tank (not seen); the spare wheel's place across (port, P2 and P3);
   the rear lamps' brackets.
   NOT drawn: the reload rounds' fuzes and noses inside the box, the hoses and cables, aerials, the number boards, any
   rear jacks (none seen).
   Elevation: 35 degrees, as ru_bm14_bm21.js and pla_phl81.js (not a published figure; P6 shows about 25 degrees).

   Mechanisms (as pla_phl81.js): "turret" is the turntable (origin on the slewing ring at x -3.54, z 1.62), trained by
   the engine with the mouths along +X at rest.  Inside it, "podelev" is the pack and its cradle, hinged at the trunnion
   at the tail end (x -4.42, z 2.00 on the hull), stowed level at rotation 0; userData.el is the launch elevation and
   userData.cells the 40 mouths [x, y, z, tail x] in the group frame (render3d.js poseLauncher / launchOffset).  Three
   "roadwheel" groups, one per axle holding both wheels (axle along local Y, origin on the axle).
   Materials 5: paint (canvas texture, metre UVs), dark, glass, wheel (vertex colours: tyres, dark wheels, hubs), C.team
   (a strip on the pack's tail box, one high on each side of the reload box, one on each rear quarter of the cab).
   Draw calls: hull 4 + wheels 3 + turntable 2 + pack 3 = 12.
   Measured: 9.86 m from the stowed pack's tail box to the bumper's lamps (no published figure; armour_specs 9.0; 10.02
     m with the pack trained astern as in P3); 2.44 m over the deck, 2.37 over the tyres, 2.94 over the mirrors
     (armour_specs 2.5); 3.15 m to the cab roof, 3.42 over the reload box's folds (armour_specs 3.0).
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType90Mrl = (function () {
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
     +X nose, +Y port, +Z up, metres, tyres on z = 0.  Scale: the tyre (1.24 m, NOT CONFIRMED), checked against the
     pack's tube length (3.06 m measured, the BM-21's published 3.0 m).  The side stations are read off P3 (side-on,
     134 px a metre at 2x); the widths off P4 (head-on). */
  var XB = 4.85, XN = 4.75, XC = 2.63;                /* bumper front, cab front face, cab rear wall */
  var AX = [3.45, -1.59, -3.04], TY = 1.00, RT = 0.62; /* axles; half track; tyre radius */
  var CW = 1.15, ZR = 3.15, ZW = 2.12, ZWT = 2.93;    /* cab half width, roof, windscreen foot and head */
  var ZL = 1.36;                                      /* the cab's lower edge behind the arch */
  var XD = 2.09, XT = -4.85, ZK = 1.45, DW = 1.22;    /* the deck: front, rear, top, half width */
  var XR0 = 2.08, XR1 = 0.43, ZRB = 3.39, RW = 1.15;  /* the reload box: front, rear, top, half width */
  var RX = -3.54, RZ = 1.62;                          /* the turntable centre ("turret" origin, on the ring) */
  var PVX = -0.88, PVZ = 0.38;                        /* the trunnion in the turret frame (2.00 m over the ground) */
  var TP = 0.140, TRR = 0.062, RP = 0.135, Z0 = 0.22; /* tube pitch, radius, row pitch; bottom row over the trunnion */
  var TX0 = -0.57, TX1 = 2.49;                        /* tube tails and mouths from the trunnion (3.06 m) */
  var BX0 = -0.57, BX1 = -0.12;                       /* the tail box */
  var LAUNCH_EL = 35 * Math.PI / 180;
  var PAINT = { base: "#525c3a", blots: ["#4a5434", "#5a6442", "#4e5737"], seed: 9022 };

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
  /* a convex end profile [y, z] extruded along x0..x1 (the reload box's round-shouldered section) */
  function profX(bin, pts, x0, x1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) V.push([x1, pts[i][0], pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* the reload box's section: half width w, from z0 to the top zt, shoulders of radius r */
  function shoulder(w, z0, zt, r) {
    var P = [[-w, z0], [w, z0]], i, a;
    for (i = 0; i <= 4; i++) { a = i / 4 * Math.PI / 2; P.push([w - r + Math.cos(a) * r, zt - r + Math.sin(a) * r]); }
    for (i = 0; i <= 4; i++) { a = Math.PI / 2 + i / 4 * Math.PI / 2; P.push([-w + r + Math.cos(a) * r, zt - r + Math.sin(a) * r]); }
    return P;
  }

  /* ---------------------------------------------------------------- wheels
     1.24 m cross-country tyre, 0.38 m wide (NOT CONFIRMED) at y = yc: big staggered lug blocks across the crown
     (P1, P3); the wheel dark (P1, P3): dished disc, hub, ten-nut ring on the outer face (s the side) */
  var TYRE = [0.10, 0.105, 0.11], RIMC = [0.16, 0.165, 0.15], HUBC = [0.12, 0.125, 0.13], NUT = [0.20, 0.20, 0.18];
  function tyre(W, yc, s) {
    var N = 24, R = [[-0.19, 0.36, 0, 0], [-0.19, 0.50, 0, 0], [-0.16, 0.59, 1, 0], [-0.06, 0.62, 1, 0], [-0.01, 0.62, 1, 1],
                     [0.01, 0.62, 1, 0], [0.06, 0.62, 1, 1], [0.16, 0.59, 1, 1], [0.19, 0.50, 0, 0], [0.19, 0.36, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.035;
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
    cyl(W, [0, yc + s * 0.17, 0], [0, yc + s * 0.20, 0], 0.36, 0.30, 16, true, false);       /* dished disc */
    W.col = HUBC;
    cylY(W, 0, yc + s * 0.20, yc + s * 0.27, 0, 0.12, 10);                                  /* hub */
    W.col = NUT;
    for (j = 0; j < 10; j++) {                                                              /* nut ring */
      a = j / 10 * TAU;
      cylY(W, 0.19 * Math.cos(a), yc + s * 0.20, yc + s * 0.22, 0.19 * Math.sin(a), 0.02, 4);
    }
  }
  /* one axle: both wheels and the axle beam between them, origin on the axle centre */
  function addAxle(W) {
    tyre(W, TY, 1);
    tyre(W, -TY, -1);
    W.col = [0.14, 0.15, 0.16];
    cylY(W, 0, -0.80, 0.80, 0, 0.09, 8);
    box(W, -0.20, 0.20, -0.26, 0.26, -0.17, 0.17);
  }

  /* ---------------------------------------------------------------- chassis, deck, the kit under the deck */
  function addChassis(B) {
    var s, k, i, x;
    box(B.dark, XT + 0.05, XN - 0.35, -0.46, 0.46, 0.98, 1.25);                          /* frame rails */
    for (i = 0; i < 3; i++) box(B.dark, AX[i] - 0.50, AX[i] + 0.50, -0.72, 0.72, 0.70, 0.80);    /* springs */
    box(B.dark, AX[1] - 0.10, AX[2] + 0.10, -0.62, 0.62, 0.66, 0.78);                    /* bogie trunnion beam */
    /* the flat deck from behind the cab to the tail, its side board, the cross bearers under it (P1, P3, P5) */
    box(B.paint, XT, XD, -DW, DW, ZK - 0.06, ZK);
    for (s = -1; s <= 1; s += 2) box(B.paint, XT, XD, s * (DW - 0.04), s * DW, 1.25, ZK);
    box(B.paint, XT, XT + 0.04, -DW, DW, 1.25, ZK);
    box(B.dark, XT, XD, -DW + 0.04, DW - 0.04, 1.22, ZK - 0.06);
    for (k = 0; k < 7; k++) {
      x = XD - 0.30 - k * 1.05;
      for (s = -1; s <= 1; s += 2) sideBox(B.dark, s, DW, 0.01, x, x + 0.06, 1.27, 1.43);
    }
    /* the bogie's guards: a plate under the deck over the tyres and the curved stays at either end (P1, P3) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, AX[2] - 0.80, AX[1] + 0.80, s * (TY - 0.22), s * (TY + 0.24), 1.20, 1.25);
      ribbon(B.paint, [[AX[1] + 0.95, 1.22], [AX[1] + 0.78, 0.98], [AX[1] + 0.70, 0.62]], s * (TY - 0.04), s * (TY + 0.02), 0.05);
      ribbon(B.paint, [[AX[2] - 0.95, 1.22], [AX[2] - 0.78, 0.98], [AX[2] - 0.70, 0.62]], s * (TY - 0.04), s * (TY + 0.02), 0.05);
      box(B.dark, AX[2] - 0.76, AX[2] - 0.72, s * (TY - 0.18), s * (TY + 0.18), 0.32, 1.22);    /* mud flaps */
    }
    /* the rear: crossmember, the lamp clusters on their brackets, the tow hook (P3, P5) */
    box(B.dark, XT + 0.05, XT + 0.22, -1.10, 1.10, 0.86, 1.22);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT + 0.18, XT + 0.30, s * 0.80, s * 1.08, 0.90, 1.08);
      box(B.glass, XT + 0.17, XT + 0.18, s * 0.83, s * 1.05, 0.93, 1.05);
      box(B.dark, XT + 0.24, XT + 0.30, s * 0.88, s * 0.94, 0.70, 0.92);                 /* the drop leg under it (P3) */
    }
    box(B.dark, XT - 0.06, XT + 0.05, -0.07, 0.07, 0.90, 1.02);
    /* port: the battery box and step under the cab's rear corner, the fuel tank, the tool box (P3) */
    box(B.paint, 2.13, 2.57, 0.80, 1.14, 0.70, 1.26);
    box(B.dark, 2.10, 2.60, 0.86, 1.16, 0.70, 0.73);
    cyl(B.dark, [2.02, 0.92, 0.86], [0.88, 0.92, 0.86], 0.25, 0.25, 14);
    for (k = 0; k < 2; k++) box(B.dark, 1.75 - k * 0.65, 1.80 - k * 0.65, 0.66, 1.18, 0.58, 1.14);
    box(B.paint, -0.78, -0.11, 0.78, 1.18, 0.61, 1.21);
    box(B.dark, -0.47, -0.42, 1.18, 1.19, 0.70, 1.12);
    /* the exhaust coming down behind the fuel tank (P3) */
    cylZ(B.dark, 0.52, 0.80, 0.78, 1.22, 0.06, 8);
    /* starboard: the same tank (P4 shows the starboard cab corner only; NOT CONFIRMED behind it) */
    cyl(B.dark, [2.02, -0.92, 0.86], [0.88, -0.92, 0.86], 0.25, 0.25, 14);
    /* the spare wheel standing on edge behind the cab on the port side, its face forward (P2, P3) */
    cyl(B.dark, [2.55, 0.62, 1.90], [2.15, 0.62, 1.90], 0.60, 0.60, 22);
    cyl(B.dark, [2.57, 0.62, 1.90], [2.13, 0.62, 1.90], 0.34, 0.34, 12);
    box(B.dark, 2.20, 2.50, 0.30, 0.56, 1.45, 1.55);
  }

  /* ---------------------------------------------------------------- the reload box
     behind the cab (P1, P2, P3): a box with round shoulders, the tarpaulin hanging over its front and sides in
     vertical folds; its rear is an open frame showing the rack of reload rounds - the plate with forty holes for the
     rounds in four rows of ten, the shelf over it (P1) */
  function addReload(B) {
    var s, k, x, y, z, r, i;
    profX(B.paint, shoulder(RW, ZK, ZRB, 0.26), XR1 + 0.12, XR0);
    /* the folds: one standing rib every 0.19 m along each side and over the roof, a strap down each (P1, P3) */
    for (k = 0; k < 8; k++) {
      x = XR0 - 0.10 - k * 0.19;
      for (s = -1; s <= 1; s += 2) {
        box(B.paint, x - 0.05, x + 0.05, s * RW, s * (RW + 0.035), ZK + 0.06, ZRB - 0.24);
        box(B.dark, x + 0.06, x + 0.08, s * RW, s * (RW + 0.012), ZK + 0.10, ZRB - 0.26);
      }
      box(B.paint, x - 0.05, x + 0.05, -RW + 0.24, RW - 0.24, ZRB, ZRB + 0.03);
    }
    for (s = -1; s <= 1; s += 2) box(B.paint, XR1 + 0.12, XR0, s * (RW - 0.02), s * (RW + 0.04), ZK, ZK + 0.08);   /* the rolled hem */
    for (k = 0; k < 4; k++) box(B.paint, XR0, XR0 + 0.03, -RW + 0.1 + k * 0.58, -RW + 0.42 + k * 0.58, ZK + 0.30, ZRB - 0.30);
    /* the rear frame: posts, the arch beam, the sill */
    for (s = -1; s <= 1; s += 2) box(B.paint, XR1, XR1 + 0.12, s * (RW - 0.10), s * RW, ZK, ZRB - 0.20);
    box(B.paint, XR1, XR1 + 0.12, -RW + 0.15, RW - 0.15, ZRB - 0.22, ZRB - 0.02);
    box(B.paint, XR1, XR1 + 0.12, -RW, RW, ZK, ZK + 0.18);
    box(B.dark, XR1 + 0.11, XR1 + 0.12, -RW + 0.10, RW - 0.10, ZK + 0.18, ZRB - 0.22);         /* the dark inside */
    /* the plate with the forty holes, and the shelf above (P1) */
    box(B.paint, XR1 + 0.06, XR1 + 0.11, -0.85, 0.85, 1.92, 2.40);
    for (r = 0; r < 4; r++) for (i = 0; i < 10; i++) {
      y = (i - 4.5) * 0.16; z = 1.99 + r * 0.11;
      box(B.dark, XR1 + 0.055, XR1 + 0.06, y - 0.045, y + 0.045, z - 0.035, z + 0.035);
    }
    box(B.paint, XR1 + 0.04, XR1 + 0.11, -0.85, 0.85, 2.58, 2.64);
    box(B.paint, XR1 + 0.06, XR1 + 0.11, -0.85, 0.85, 2.96, 3.02);
    /* the team strip high on each side, on the folds */
    for (s = -1; s <= 1; s += 2) box(B.team, XR1 + 0.40, XR0 - 0.30, s * (RW + 0.035), s * (RW + 0.045), ZRB - 0.40, ZRB - 0.34);
  }

  /* ---------------------------------------------------------------- the loader between the reload box and the launcher
     (P3 side-on, P1): the dark slide beam on the deck and the tray over it, the block of short guide tubes in four rows,
     the A-frame strut in front of it, the tall post at each end of the loader (P1 and P3 show the port posts; the
     starboard pair is NOT CONFIRMED) */
  function addLoader(B) {
    var s, r, i, y, z;
    box(B.dark, -2.00, 0.38, -0.32, 0.32, ZK, 1.85);
    box(B.paint, -1.90, 0.19, -0.78, 0.78, 1.98, 2.06);
    for (s = -1; s <= 1; s += 2) box(B.paint, -1.90, 0.19, s * 0.70, s * 0.78, 1.85, 2.06);
    box(B.paint, -1.80, 0.10, -0.70, 0.70, 1.85, 1.98);
    /* the guide block: four rows of ten short tubes, the holes on both faces */
    box(B.paint, -0.63, -0.19, -0.76, 0.76, 2.10, 2.66);
    for (r = 0; r < 4; r++) for (i = 0; i < 10; i++) {
      y = (i - 4.5) * TP; z = 2.18 + r * 0.13;
      box(B.dark, -0.64, -0.18, y - 0.045, y + 0.045, z - 0.045, z + 0.045);
    }
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [0.15, s * 0.72, 2.06], [-0.19, s * 0.72, 2.62], 0.06);         /* the A-frame strut */
      box(B.paint, -0.12, 0.15, s * 0.70, s * 0.76, 2.06, 2.12);
      /* the posts: front at the box's rear frame, rear at the loader's tail, with their heads */
      box(B.paint, 0.11, 0.26, s * 0.86, s * 0.96, ZK, 3.05);
      box(B.dark, 0.08, 0.29, s * 0.84, s * 0.98, 2.92, 2.98);
      box(B.paint, -1.60, -1.23, s * 0.88, s * 0.96, ZK, 2.92);
      box(B.paint, -1.52, -1.31, s * 0.86, s * 0.98, 2.92, 3.05);
      box(B.dark, -1.62, -1.21, s * 0.86, s * 0.98, 2.62, 2.66);
      cylY(B.dark, -1.41, s * 0.96, s * 1.02, 2.78, 0.05, 8);
    }
  }

  /* ---------------------------------------------------------------- the cab
     The Beifang Benchi (licensed Mercedes-Benz NG) short cab (P2, P3, P4): a flat front with one wide windscreen, the
     black grille panel across the whole front under it, the deep bumper with two lamps a side, the black flared arch
     over the front wheel, one door and a rear quarter window a side, big mirrors, the raised hatch on the roof */
  function addCab(B) {
    var s, k, y, ZA = 1.76;
    /* upper body, side profile: the front leaning back a little to the roof */
    profY(B.paint, [[XN, ZA], [XN, ZW], [XN - 0.06, ZWT], [XN - 0.10, ZR - 0.04], [XN - 0.16, ZR], [XC, ZR], [XC, ZA]], -CW, CW);
    /* lower body ahead of the arch and behind it */
    box(B.paint, 4.25, XN, -CW, CW, 1.22, ZA + 0.01);
    box(B.paint, XC, 2.86, -CW, CW, ZL, ZA + 0.01);
    box(B.paint, 2.86, 4.25, -CW + 0.40, CW - 0.40, 1.22, ZA + 0.01);                      /* the wheel boxes' inner wall */
    for (s = -1; s <= 1; s += 2) {
      /* the black flared arch (P2, P3, P4) */
      ribbon(B.dark, [[4.32, 1.18], [4.20, 1.48], [3.92, 1.70], [3.45, 1.78], [3.00, 1.70], [2.82, 1.52], [2.78, ZL]],
             s * (CW - 0.06), s * (CW + 0.07), 0.08);
    }
    /* the roof's hatch hump and the post on its front starboard corner (P3, P4) */
    box(B.paint, 3.55, 4.25, -0.40, 0.40, ZR, ZR + 0.06);
    cylZ(B.dark, 4.10, -0.42, ZR, ZR + 0.20, 0.025, 6);
    /* the windscreen: dark frame, one wide pane, two wipers */
    var a = Math.atan2(0.06, ZWT - ZW), U = [-Math.sin(a), 0, Math.cos(a)], Wv = [0, 1, 0], Nn = [Math.cos(a), 0, Math.sin(a)];
    var P0 = [XN, 0, ZW], L = (ZWT - ZW) / Math.cos(a);
    planeBox(B.dark, P0, U, Wv, Nn, 0.03, L - 0.03, -CW + 0.08, CW - 0.08, -0.01, 0.012);
    planeBox(B.glass, P0, U, Wv, Nn, 0.07, L - 0.07, -CW + 0.13, CW - 0.13, 0.012, 0.03);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [XN + 0.04, s * 0.15, ZW + 0.08], [XN + 0.01, s * 0.55, ZW + 0.40], 0.022);
    /* under the windscreen: the body band, then the black grille panel across the whole front with its bars (P4) */
    box(B.dark, XN, XN + 0.02, -CW + 0.05, CW - 0.05, 1.30, 1.87);
    for (k = 0; k < 3; k++) box(B.paint, XN, XN + 0.035, -CW + 0.08, CW - 0.08, 1.42 + k * 0.15, 1.45 + k * 0.15);
    box(B.paint, XN, XN + 0.04, -0.06, 0.06, 1.30, 1.87);
    /* the bumper, the two lamps a side in it, the tow pins, the step under it */
    box(B.paint, XN - 0.10, XB, -1.20, 1.20, 0.75, 1.26);
    box(B.dark, XB - 0.01, XB + 0.004, -0.45, 0.45, 0.80, 1.00);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        box(B.dark, XB - 0.01, XB + 0.01, s * 0.62, s * 1.04, 0.86 + k * 0.17, 1.00 + k * 0.17);
        box(B.glass, XB + 0.01, XB + 0.02, s * 0.66, s * 1.00, 0.88 + k * 0.17, 0.98 + k * 0.17);
      }
      cylY(B.dark, XB - 0.08, s * 0.30, s * 0.44, 0.84, 0.04, 8);
      box(B.dark, XN - 0.15, XN + 0.05, s * 0.95, s * 1.15, 0.60, 0.64);              /* the step at the corner */
    }
    /* the sides: door seams, the door window, the rear quarter window, handle, hinges, mirrors on their arms */
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, CW, 0.008, 4.58, 4.60, ZL, ZWT);                     /* the door's leading edge */
      sideBox(B.dark, s, CW, 0.008, 3.46, 3.48, ZL, ZWT);                     /* its trailing edge */
      sideBox(B.dark, s, CW, 0.008, 3.48, 4.60, ZWT - 0.01, ZWT + 0.01);
      sideBox(B.dark, s, CW, 0.012, 3.55, 4.52, 2.14, 2.91);
      sideBox(B.glass, s, CW + 0.004, 0.012, 3.58, 4.49, 2.17, 2.88);
      sideBox(B.dark, s, CW, 0.012, 2.87, 3.43, 2.14, 2.91);
      sideBox(B.glass, s, CW + 0.004, 0.012, 2.90, 3.40, 2.17, 2.88);
      sideBox(B.dark, s, CW, 0.03, 3.62, 3.76, 1.94, 1.97);
      for (k = 0; k < 2; k++) sideBox(B.dark, s, CW, 0.03, 4.55, 4.60, 1.90 + k * 0.62, 2.04 + k * 0.62);
      bar(B.dark, [XN - 0.12, s * CW, 2.30], [XN - 0.02, s * (CW + 0.22), 2.36], 0.03);
      bar(B.dark, [XN - 0.12, s * CW, 2.86], [XN - 0.02, s * (CW + 0.22), 2.80], 0.03);
      box(B.dark, XN - 0.08, XN + 0.00, s * (CW + 0.16), s * (CW + 0.32), 2.30, 2.86);
      box(B.glass, XN - 0.09, XN - 0.08, s * (CW + 0.18), s * (CW + 0.30), 2.34, 2.82);
      /* the team strip, high on the rear quarter under the roof */
      sideBox(B.team, s, CW, 0.012, 2.88, 3.42, 2.98, 3.04);
    }
  }

  /* ------------------------------------------------- the launcher
     the turntable and the rotating platform ("turret", origin on the slewing ring, trained 0 with the mouths forward
     as in P1 and P5): the plinth ring, the platform, the housing under the cradle carrying the elevating gear and its
     handwheel on the port side, the trunnion cheeks at the housing's rear, the cylinder lying aft under the tail box
     (P1, P3, P4) */
  function addPlinth(B) {
    cylZ(B.dark, RX, 0, ZK, RZ - 0.04, 0.70, 22);
  }
  function addMount(B) {
    var s;
    cyl(B.dark, [0, 0, -0.04], [0, 0, 0.04], 0.74, 0.74, 24);
    box(B.paint, -0.95, 0.85, -0.70, 0.70, 0.04, 0.20);
    box(B.dark, -0.95, 0.85, -0.72, 0.72, 0.19, 0.22);
    /* the housing: a box with a sloped front under the pack's middle, its placard (P1) */
    profY(B.paint, [[PVX + 0.20, 0.22], [0.75, 0.22], [0.75, 0.30], [0.50, 0.44], [PVX + 0.20, 0.44]], -0.45, 0.45);
    box(B.dark, -0.20, 0.10, 0.45, 0.46, 0.28, 0.38);
    /* the elevating gear and its handwheel on the port side (P1, P3) */
    cylY(B.dark, -0.40, 0.45, 0.52, 0.32, 0.17, 16);
    cylY(B.paint, -0.05, 0.45, 0.55, 0.30, 0.10, 12);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, PVX - 0.18, PVX + 0.22, s * 0.45, s * 0.56, 0.20, PVZ + 0.12);          /* trunnion cheeks */
      cylY(B.dark, PVX, s * 0.36, s * 0.62, PVZ, 0.08, 10);                                   /* pins and bosses */
      cylY(B.dark, PVX, s * 0.56, s * 0.64, PVZ, 0.13, 12);
      /* the cylinder lying aft under the tail box, on its bracket (P1) */
      cylX(B.paint, PVX - 0.56, PVX - 0.08, s * 0.55, 0.10, 0.06, 10);
      cylX(B.dark, PVX - 0.40, PVX - 0.32, s * 0.55, 0.10, 0.065, 10);
      box(B.dark, PVX - 0.12, PVX - 0.04, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.04, 0.16);
    }
  }

  /* the pack: forty 122 mm tubes, four rows of ten in columns (P1, P5), the tails held in the box at the rear with a
     slot in each side plate and the plate with the forty tail holes across its end (P1, P3, P5), a clamp band 0.9 m
     behind the bare mouths (P1, P3), the cradle beam under it, the sight bracket on the port side (P1); group
     "podelev", origin on the trunnion */
  function addPack(B, cells) {
    var r, i, y, z, zt, zb, hw = 4.5 * TP + TRR + 0.02, xs;
    zb = Z0 - TRR - 0.03; zt = Z0 + 3 * RP + TRR + 0.03;
    for (r = 0; r < 4; r++) for (i = 0; i < 10; i++) {
      y = (i - 4.5) * TP; z = Z0 + r * RP;
      cylX(B.paint, BX1 - 0.02, TX1, y, z, TRR, 10);
      cylX(B.dark, TX1 - 0.03, TX1 + 0.002, y, z, TRR * 0.85, 8);                              /* the bore at the mouth */
      cylX(B.dark, TX0 - 0.002, TX0 + 0.02, y, z, TRR * 0.75, 8);                              /* the tail hole */
      cells.push([TX1 + 0.05, y, z, TX0]);
    }
    /* the tail box: side plates (a slot in each), top and bottom plates, the end plate round the tails */
    for (y = -1; y <= 1; y += 2) {
      box(B.paint, BX0, BX1, y * hw, y * (hw + 0.03), zb, zt);
      box(B.dark, BX0 + 0.20, BX0 + 0.27, y * (hw + 0.03), y * (hw + 0.035), Z0 + 0.10, Z0 + 0.30);
    }
    box(B.paint, BX0, BX1, -hw - 0.03, hw + 0.03, zt, zt + 0.03);
    box(B.paint, BX0, BX1, -hw - 0.03, hw + 0.03, zb - 0.03, zb);
    box(B.paint, BX0 + 0.02, BX1, -hw, hw, zb, zb + 0.02);
    for (r = 0; r <= 4; r++) box(B.paint, BX0 + 0.01, BX0 + 0.05, -hw, hw, zb + r * RP + 0.01, zb + r * RP + 0.035);
    for (i = 0; i <= 10; i++) box(B.paint, BX0 + 0.01, BX0 + 0.05, (i - 5) * TP - 0.012, (i - 5) * TP + 0.012, zb, zt);
    /* the clamp band 0.9 m behind the mouths, with its bolt lugs */
    xs = TX1 - 0.92;
    box(B.dark, xs, xs + 0.05, -hw, hw, zt - 0.02, zt);
    box(B.dark, xs, xs + 0.05, -hw, hw, zb, zb + 0.02);
    box(B.dark, xs, xs + 0.05, -hw - 0.015, -hw + 0.005, zb, zt);
    box(B.dark, xs, xs + 0.05, hw - 0.005, hw + 0.015, zb, zt);
    /* the cradle beam under the pack, deep at the trunnion and tapering forward, the shelf under the tail box, the
       lugs round the pins */
    profY(B.paint, [[-0.10, -0.10], [0.30, -0.16], [1.95, zb - 0.06], [1.95, zb], [-0.10, zb]], -0.32, 0.32);
    box(B.dark, -0.12, 1.95, -0.34, 0.34, zb - 0.02, zb);
    box(B.paint, BX0, -0.05, -0.50, 0.50, zb - 0.07, zb - 0.03);
    for (y = -1; y <= 1; y += 2) box(B.paint, -0.18, 0.22, y * 0.32, y * 0.40, -0.12, zb);
    /* the sight bracket on the port side, its head over the pack's side (P1) */
    box(B.paint, 1.00, 1.10, hw + 0.03, hw + 0.09, zb - 0.06, zt + 0.04);
    box(B.dark, 0.98, 1.14, hw + 0.04, hw + 0.12, zt + 0.04, zt + 0.12);
    cylY(B.dark, 1.05, hw + 0.09, hw + 0.13, Z0 + 0.10, 0.07, 10);
    /* the one team strip, along the top of the tail box */
    box(B.team, BX0 + 0.06, BX1 - 0.06, -0.30, 0.30, zt + 0.03, zt + 0.042);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, wg, WB;
    addChassis(HB);
    addCab(HB);
    addReload(HB);
    addLoader(HB);
    addPlinth(HB);
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
    /* the launcher: "turret" (traverses on the ring) holding "podelev" (elevates about the trunnion at the tail end;
       level when stowed, raised to userData.el by render3d.js poseLauncher) */
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

/* len is the measured X extent: the stowed pack's tail box to the bumper's lamps */
UNIT_MODELS["pla_e90_mlrs"] = { len: 9.86, build: HeroType90Mrl.build };
