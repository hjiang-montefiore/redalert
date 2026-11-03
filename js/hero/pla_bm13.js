/* ============ pla_bm13.js - HERO model: the BM-13N 132 mm "Katyusha" on the Studebaker US6 6x6, as the PLA kept it ============
   pla_e50_mlrs "BM-13-16 132mm multiple rocket launcher", in service 1951; turret:true (the launcher trains).

   Which truck: the Studebaker US6, as the BM-13N.  The one PLA example on record, the launcher in the Military Museum of
   the Chinese People's Revolution, Beijing (P1, P2; P2's museum plate reads "BM-13 rocket launcher (Soviet-built)"), is
   the BM-13N on the Studebaker US6: the narrow vertical-slat grille between flat-topped wing fenders, the headlamps in
   wire cages beside it, the deep channel bumper with the two C-hooks, the US6's closed cab with the sloped A-pillar,
   twin rear wheels on both bogie axles.  It is NOT the ZIS-151 (BM-13NN, 1949): no rounded ZIS hood and grille, no
   separate round fenders, no single rear tyres.  en.wikipedia "Katyusha rocket launcher": "The cross-country
   performance of the Studebaker US6 ... became the GAU's standard mounting in 1943, designated BM-13N"; "BM-13s were
   used in the Korean War by the Chinese People's Volunteer Army"; ru.wikipedia "BM-13": the BM-13N is the base
   variant on the Studebaker US6 from 1943, the BM-13NN on the ZIS-151 from 1949; 22 BM-13s fired for the PVA's
   15th Corps at Triangle Hill on 30 October 1952.  The row is the 1951 PVA/PLA launcher, and the Beijing vehicle is the
   US6, so the US6 is drawn.

   References, Wikimedia Commons, cached in scratchpad/q_pla_e50_mlrs_ref:
     P1  "BM-13N Katyusha front-left 2016 Military Museum Beijing.jpg" (category "BM-13N in Military Museum of the
         Chinese People's Revolution") - the PLA vehicle, starboard front 3/4, rails raised: the grille of vertical slats,
         the caged headlamp on the fender apron beside it, the flat wing fender with its front lip and the deep skirt
         behind the wheel, the channel bumper standing well ahead of the grille with the C-hook on it, the four armour
         shutters lowered over the windscreen and standing above the roof, the dark tank box with its filler cap behind
         the cab, the rear fender over both bogie wheels, twin rear tyres, the eight rails with their round lightening
         holes and the tie tubes with collars across them.
     P2  "Soviet BM-13 Rocket Launcher (9871409224).jpg" - the same vehicle (plate "BM-13 rocket launcher", Beijing),
         port front 3/4: the hood, rounded on top and widening to the cowl, the cab door with its window, the same
         shutters (two rows of two, hinge straps), the rails' T-headed webs with the holes, two lines of tie-tube collars
         across the rails, the lattice under the rails, the rockets hanging under the rear of the rails, the tank box
         with its cap behind the port door, the front fender's flat top level with the hood's lower edge.
     P3  "Tour Salon in Poznan, X 2014r (15).JPG" - a BM-13N on the US6 (Polish museum), port side square on, rails
         raised: THE MEASURING PHOTO.  Hub centres, cab, hood, fenders, the deck, the rear fender, the rails' ends, the
         rear pivot, the lattice nodes and the elevating screw were read off a pixel grid; perspective corrected by the
         tyre's apparent size at each end (213 px/m at the front axle, 238 at the bogie, varied linearly), the scale set
         by the published 4.115 m wheelbase.  It shows the rockets' place: one riding on each rail with its tail 0.34 m
         behind the rail's rear end, one hanging under with its tail 0.27 m ahead of it; the M-13's four tail fins.
     P4  "Verkhnyaya Pyshma Tank Museum 2011 029.jpg" - a BM-13N on the US6 (UMMC museum), port front 3/4: confirms the
         grille, the bumper, the fender shapes, the single fender over the bogie with its mud flap, the rockets on top of
         and under the rear of the rails; its shutters are folded up on the roof and it carries a spare wheel behind the
         cab, which neither Beijing photograph shows (not drawn).
   Published: Studebaker US6 (en.wikipedia, from TM 9-807): long wheelbase 162 in (4.115 m, front axle to the bogie's
     centre, the U9 chassis-cab that carried the Katyusha), 7.50-20 tyres, dual rear tyres; U9 width 7 ft 3 in
     (2.21 m), height to the cab top 7 ft 3 in (2.21 m).  M-13 rocket (ru.wikipedia "BM-13"): 1.41 m long, 132 mm.
     ru.wikipedia also gives two jacks at the rear: no photograph shows them (P3's rear is plain), so they are not drawn.
     No published length or height was found for the BM-13N as a whole; the row's armour_specs (6.9 x 2.2 x 2.7) cites
     no source.

   Recognition list (what makes it read at game zoom, and its source):
     1. The eight long open rails with their round holes, lying over the cab, tie tubes across them - P1-P4: addRails.
     2. Sixteen M-13s at the rear: one on top of and one under each rail - P2, P3, P4: addRockets.
     3. The lattice under the rails, pivoted at the rear over the rear axle - P2, P3: addCradle.
     4. The US6's narrow slatted grille, flat wing fenders, caged headlamps, deep bumper - P1, P2, P4: addFront.
     5. The armour shutters over the windscreen standing above the roof - P1, P2: addCab.
     6. 6x6 with dual rear tyres under one flat fender over the bogie - P1, P3, P4: addRear, axles.
   Paint: plain PLA green as the other PLA heroes (#525c3a); P1/P2 are dusty museum green.  No stars, numbers or plates.
   NOT CONFIRMED, judgement calls: every height and length off P3 (the scale is the published wheelbase; the tyre comes
   out 0.90 m against the nominal 0.89, drawn 0.90); the bogie spacing (1.15 m, measured, not published); the cab's
   width (1.84) and the hood's widths, the rails' pitch across (0.26 m, from P1/P2's pack being about the cab's width),
   the rail section (0.20 m deep web, 0.05 m T heads, holes 0.14 m apart) and the M-13's fin span (0.30); the tie tubes'
   places (P3); the lattice drawn as two side frames at y = 0.80 (P2 shows struts under the near edge, the far side is
   hidden); the elevating screw; the base frame and its turntable (the BM-13N traverses only a few degrees; the engine
   trains it fully); the tank box's size (P1, P2); the rear locker (P3, port side only, drawn port only); the front and
   rear tracks (from the 2.21 m width).
   THE STOWED POSE: no photograph of a BM-13N travelling was found.  The rails cannot lie level - their front 2.9 m
   reaches over the cab - so they rest at P3's 13 degrees, the lowest angle any reference shows (P1, P2, P4 are higher).
   Elevation: the rails reach 35 degrees when firing, as ru_bm14_bm21.js (not a published figure), so userData.el is
   the 22 degrees above the stowed 13.
   NOT drawn: the spare wheel and lockers of P3/P4 (not on the PLA vehicle), the rear jacks (not seen), the sight, the
   cables, the museum plate, markings, any canvas covers.

   Mechanisms (as ru_bm14_bm21.js and pla_phl81.js): "turret" is the launcher base (origin on the ring at x -1.08,
   z 1.40), trained by the engine with the rails' front along +X at rest.  A fixed group inside it holds the rails at
   the stowed 13 degrees about the rear pivot (x -1.89, z 1.50 on the hull); inside that, "podelev" is the rails, the
   rockets and the lattice, hinged on the pivot with its +X along the rails, at rotation 0 when stowed; userData.el is
   the raise to the firing angle and userData.cells the sixteen rail mouths [x, y, z, tail x] in the podelev frame
   (render3d.js poseLauncher / launchOffset).  Three "roadwheel" groups, one per axle holding both wheels (the twin
   tyres on the bogie axles), axle along local Y, origin on the axle.
   Materials 5: paint (canvas texture, metre UVs), dark, glass, wheel (vertex colours), C.team (a strip high on each
   door, one across the rails' rear tie).  Draw calls: hull 4 + wheels 3 + base 2 + rails 3 = 12.
   Measured: 7.15 m from the riding rockets' tails (stowed) to the bumper (no published BM-13N length; armour_specs
   6.9); 2.24 m over the rear fenders (published US6 2.21-2.24); 2.21 m to the cab roof (published), 2.37 to the
   shutters' top, 3.34 m to the rails' front ends stowed (P3: 3.34).
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBm13 = (function () {
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

  /* a solid lofted through cross sections [x, [[y, z], ...]] (each convex, the same count of corners) */
  function loftX(bin, S) {
    var V = [], F = [], i, j, n = S[0][1].length, m = S.length, k;
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push([S[i][0], S[i][1][j][0], S[i][1][j][1]]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (j = 1; j < n - 1; j++) { F.push([0, j + 1, j]); F.push([(m - 1) * n, (m - 1) * n + j, (m - 1) * n + j + 1]); }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- the stations
     +X nose, +Y port, +Z up, metres, tyres on z = 0.  P3 read on a pixel grid, scaled by the published 4.115 m
     wheelbase (front axle to the bogie's centre); x = 0 lies 2.80 m behind the front axle. */
  var AX = [2.80, -0.74, -1.89], RT = 0.45;          /* axles (wheelbase 4.115 to the bogie centre -1.315); tyre radius */
  var TF = 0.86, TR = 0.88, TW = 0.095;               /* front tyre centre, rear dual pair centre, tyre half width */
  var XB = 3.52, XG = 3.38, XH = 3.30, XW = 2.04, XC = 0.85;  /* bumper front, grille face, hood front, cowl, cab rear */
  var CW = 0.92, ZR = 2.21, ZW = 1.72, ZS = 0.90;     /* cab half width, roof (published 2.21), windscreen foot, cab sill */
  var ZF = 1.23, ZK = 1.25, ZD = 1.40;                /* front fender top, rear fender top, launcher deck */
  var RX = -1.08, RZ = 1.40;                          /* the base's ring ("turret" origin) */
  var PVX = -1.89 - RX, PVZ = 1.50 - RZ;              /* the rear pivot in the turret frame */
  var STOW = 13 * Math.PI / 180;                      /* the rails' rest angle (P3) */
  var LAUNCH_EL = 22 * Math.PI / 180;                 /* raised to 35 degrees to fire */
  /* the rails in the podelev frame: +X along them, origin on the pivot */
  var RL0 = -1.16, RL1 = 4.00, RH = 0.87, RD = 0.10;  /* rear end, front end, centreline height, half depth */
  var RY = [-0.91, -0.65, -0.39, -0.13, 0.13, 0.39, 0.65, 0.91];
  var MR = 0.066, ML = 1.41;                          /* M-13: radius, length (published) */
  var ZTOP = RH + RD + 0.02 + MR, ZBOT = RH - RD - 0.02 - MR;
  var XTT = RL0 - 0.34, XTB = RL0 + 0.27;             /* tails of the riding and the hanging rockets (P3) */
  var YT = 0.80;                                      /* the lattice's side frames */
  var PAINT = { base: "#525c3a", blots: ["#4a5434", "#5a6442", "#4e5737"], seed: 1351 };

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
     7.50-20 (published): 0.90 m over the tread (drawn), 0.19 wide, on a 20 in disc wheel painted green (P1, P2, P4),
     bar lugs across the crown; the front wheel's big hub with its nut ring (P1, P2) */
  var TYRE = [0.10, 0.105, 0.11], RIMC = [0.30, 0.34, 0.22], HUBC = [0.26, 0.29, 0.19], NUT = [0.18, 0.18, 0.17];
  function tyre(W, yc) {
    var N = 22, h = TW, R = [[-h, 0.26, 0, 0], [-h, 0.37, 0, 0], [-h * 0.8, 0.43, 1, 0], [-h * 0.3, 0.45, 1, 0], [-0.005, 0.45, 1, 1],
                               [0.005, 0.45, 1, 0], [h * 0.3, 0.45, 1, 1], [h * 0.8, 0.43, 1, 1], [h, 0.37, 0, 0], [h, 0.26, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.02;
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
  }
  /* the disc on the outer face (s the side): dished disc, hub, nut ring; big: the front hub */
  function disc(W, yf, s, big) {
    var j, a;
    W.col = RIMC;
    cyl(W, [0, yf - s * 0.02, 0], [0, yf + s * 0.01, 0], 0.26, 0.22, 16, true, false);
    W.col = HUBC;
    cylY(W, 0, yf, yf + s * (big ? 0.12 : 0.035), 0, big ? 0.10 : 0.09, 10);
    W.col = NUT;
    for (j = 0; j < 8; j++) {
      a = j / 8 * TAU;
      cylY(W, 0.13 * Math.cos(a), yf, yf + s * 0.025, 0.13 * Math.sin(a), 0.016, 4);
    }
  }
  /* one axle: both wheels (twin on the bogie) and the axle beam, origin on the axle centre */
  function addAxle(W, twin) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      if (twin) {
        tyre(W, s * (TR - TW - 0.01));
        tyre(W, s * (TR + TW + 0.01));
        disc(W, s * (TR + 2 * TW + 0.01), s, false);
      } else {
        tyre(W, s * TF);
        disc(W, s * (TF + TW - 0.01), s, true);
      }
    }
    W.col = [0.14, 0.15, 0.16];
    cylY(W, 0, -0.70, 0.70, 0, 0.07, 8);
    box(W, -0.17, 0.17, -0.20, 0.20, -0.15, 0.15);
  }

  /* ---------------------------------------------------------------- the front: grille, hood, fenders, bumper
     the US6's front (P1, P2, P4): a tall flat grille of vertical slats between the fender aprons, the hood rounded on
     top and widening back to the cowl, flat wing fenders with a front lip, the headlamps in wire cages on the aprons
     beside the grille, the deep channel bumper well ahead of the grille with a C-hook either side */
  function addFront(B) {
    var s, k, y;
    /* hood: lofted from the grille top back to the cowl (P2, P3) */
    loftX(B.paint, [
      [XW, [[-0.74, 1.10], [0.74, 1.10], [0.74, ZW - 0.10], [0.58, ZW], [-0.58, ZW], [-0.74, ZW - 0.10]]],
      [XH, [[-0.50, 1.10], [0.50, 1.10], [0.50, 1.47], [0.38, 1.55], [-0.38, 1.55], [-0.50, 1.47]]]]);
    box(B.dark, 2.30, 2.32, -0.01, 0.01, 1.62, 1.66);
    /* grille shell and slats, the dark core behind (P1, P2, P4) */
    box(B.paint, XH - 0.02, XG, -0.48, 0.48, 0.92, 1.56);
    box(B.dark, XG, XG + 0.01, -0.42, 0.42, 0.98, 1.50);
    for (k = 0; k < 13; k++) {
      y = -0.39 + k * 0.065;
      box(B.paint, XG, XG + 0.035, y - 0.012, y + 0.012, 0.98, 1.50);
    }
    box(B.paint, XG, XG + 0.04, -0.46, 0.46, 1.50, 1.54);
    box(B.paint, XG, XG + 0.04, -0.46, 0.46, 0.94, 0.98);
    /* the aprons between the grille and the fenders */
    for (s = -1; s <= 1; s += 2) box(B.paint, XW + 0.20, XH, s * 0.48, s * 0.60, 0.92, 1.23);
    for (s = -1; s <= 1; s += 2) {
      /* flat wing fender: the front lip, the flat top, sweeping down behind the wheel to the running board (P1, P3) */
      ribbon(B.paint, [[XH + 0.20, 1.02], [XH + 0.18, 1.16], [XH + 0.10, ZF], [2.40, ZF], [2.18, 1.14], [2.06, 0.96], [2.02, 0.70]],
             s * 0.52, s * 1.10, 0.035);
      box(B.paint, 2.06, 3.32, s * 1.06, s * 1.10, ZF - 0.12, ZF);                 /* the outer edge turned down */
      /* the running board under the door (P3) */
      box(B.dark, 0.95, 2.06, s * 0.88, s * 1.10, 0.64, 0.70);
      box(B.dark, 0.95, 2.06, s * 0.88, s * 0.90, 0.70, 0.90);
      /* the headlamp on the apron in its wire cage (P1, P2, P4) */
      cylX(B.dark, XH - 0.05, XH + 0.08, s * 0.66, 1.36, 0.11, 12);
      cylX(B.glass, XH + 0.08, XH + 0.095, s * 0.66, 1.36, 0.095, 12);
      for (k = 0; k < 3; k++) bar(B.dark, [XH - 0.02, s * (0.56 + k * 0.10), 1.50], [XH + 0.16, s * (0.56 + k * 0.10), 1.42], 0.015);
      bar(B.dark, [XH + 0.16, s * 0.54, 1.42], [XH + 0.16, s * 0.78, 1.42], 0.015);
      bar(B.dark, [XH + 0.16, s * 0.54, 1.42], [XH + 0.16, s * 0.54, ZF + 0.02], 0.015);
      bar(B.dark, [XH + 0.16, s * 0.78, 1.42], [XH + 0.16, s * 0.78, ZF + 0.02], 0.015);
      /* the bumper's C-hook (P1, P2, P4) */
      cylY(B.dark, XB - 0.06, s * 0.52, s * 0.60, 0.98, 0.07, 10);
      box(B.dark, XB - 0.14, XB - 0.02, s * 0.52 - 0.0, s * 0.60, 0.88, 0.96);
      /* the frame horns from the bumper back under the fenders */
      box(B.dark, XH - 0.30, XB - 0.10, s * 0.40, s * 0.48, 0.62, 0.86);
    }
    /* the deep channel bumper (P1, P3, P4) */
    box(B.paint, XB - 0.12, XB, -1.06, 1.06, 0.62, 0.92);
    box(B.dark, XB - 0.16, XB - 0.12, -1.04, 1.04, 0.64, 0.90);
    box(B.dark, XH, XH + 0.06, -0.30, 0.30, 0.66, 0.92);                              /* the front axle's drive housing */
  }

  /* ---------------------------------------------------------------- the cab
     the US6 closed cab (P1, P2, P3): the windscreen leaning back from the cowl, the rounded roof, the door with its
     window; the four armour shutters lowered over the windscreen, standing above the roof (P1, P2) */
  function addCab(B) {
    var s, k, a, U, Wv, Nn, P0, L;
    profY(B.paint, [[XC, ZS], [XW, ZS], [XW, ZW], [XW - 0.26, ZR - 0.06], [XW - 0.36, ZR], [XC + 0.10, ZR], [XC, ZR - 0.10]], -CW, CW);
    /* the roof's crown and rain gutter */
    box(B.paint, XC + 0.10, XW - 0.40, -CW + 0.10, CW - 0.10, ZR, ZR + 0.03);
    for (s = -1; s <= 1; s += 2) sideBox(B.dark, s, CW, 0.015, XC + 0.08, XW - 0.36, ZR - 0.07, ZR - 0.05);
    /* the windscreen plane and the shutters on it: four plates, two rows of two, hinge straps (P1, P2) */
    a = Math.atan2(0.26, ZR - 0.06 - ZW);
    U = [-Math.sin(a), 0, Math.cos(a)]; Wv = [0, 1, 0]; Nn = [Math.cos(a), 0, Math.sin(a)];
    P0 = [XW, 0, ZW]; L = (ZR + 0.16 - ZW) / Math.cos(a);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.paint, P0, U, Wv, Nn, 0.02, L * 0.52, s > 0 ? 0.01 : -CW - 0.02, s > 0 ? CW + 0.02 : -0.01, 0.01, 0.03);
      planeBox(B.paint, P0, U, Wv, Nn, L * 0.53, L, s > 0 ? 0.01 : -CW - 0.02, s > 0 ? CW + 0.02 : -0.01, 0.01, 0.03);
      for (k = 0; k < 2; k++) {
        planeBox(B.dark, P0, U, Wv, Nn, L * 0.45, L * 0.60, s * (0.25 + k * 0.40) - 0.04, s * (0.25 + k * 0.40) + 0.04, 0.03, 0.04);
      }
    }
    /* the doors: seams, window and glass, handle, hinges; the team strip high on the door */
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, CW, 0.008, 1.08, 1.10, ZS + 0.02, ZR - 0.12);
      sideBox(B.dark, s, CW, 0.008, 1.92, 1.94, ZS + 0.02, ZW - 0.02);
      sideBox(B.dark, s, CW, 0.008, 1.10, 1.94, ZS + 0.02, ZS + 0.04);
      sideBox(B.dark, s, CW, 0.010, 1.18, 1.86, 1.68, 2.08);
      sideBox(B.glass, s, CW + 0.004, 0.010, 1.21, 1.83, 1.71, 2.05);
      sideBox(B.dark, s, CW, 0.03, 1.18, 1.30, 1.56, 1.59);
      for (k = 0; k < 2; k++) sideBox(B.dark, s, CW, 0.03, 1.90, 1.95, 1.05 + k * 0.45, 1.17 + k * 0.45);
      sideBox(B.team, s, CW, 0.012, 1.14, 1.88, 2.11, 2.15);
    }
    box(B.glass, XC - 0.01, XC, -0.42, 0.42, 1.72, 2.02);                              /* rear window */
  }

  /* ---------------------------------------------------------------- frame, tank boxes, deck, the rear fender */
  function addRear(B) {
    var s, k, y;
    box(B.dark, -2.62, XH - 0.30, -0.46, 0.46, 0.72, 0.92);                             /* frame rails */
    for (k = 0; k < 3; k++) box(B.dark, AX[k] - 0.42, AX[k] + 0.42, -0.62, 0.62, 0.56, 0.66);  /* springs */
    box(B.dark, AX[1] + 0.25, AX[2] - 0.25, -0.58, 0.58, 0.52, 0.62);                    /* bogie trunnion */
    /* the launcher's subframe on the truck frame, the deep side member (P3) */
    for (s = -1; s <= 1; s += 2) box(B.paint, -2.45, XC - 0.05, s * 0.46, s * 0.62, 0.92, 1.12);
    box(B.paint, -2.45, -0.20, -0.55, 0.55, 1.12, ZD - 0.08);                             /* under the deck */
    /* the tank box with its filler cap behind each door (P1 starboard, P2 port) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.22, 0.80, s * 0.62, s * 1.04, 0.70, 1.15);
      cylZ(B.dark, 0.40, s * 0.86, 1.15, 1.19, 0.06, 10);
      box(B.dark, 0.20, 0.82, s * 0.62, s * 1.06, 0.82, 0.84);
    }
    /* the deck the base stands on, between the rear fenders */
    box(B.paint, -2.45, -0.15, -0.70, 0.70, ZD - 0.08, ZD);
    for (s = -1; s <= 1; s += 2) {
      y = s > 0 ? [0.56, 1.12] : [-1.12, -0.56];
      /* one fender over both bogie wheels: flat top, the front swept down, the rear rolled down to the tail (P1, P3, P4) */
      ribbon(B.paint, [[-0.16, 0.70], [-0.26, 1.00], [-0.42, 1.20], [-0.58, ZK], [-2.30, ZK], [-2.50, 1.16], [-2.60, 0.98]],
             y[0], y[1], 0.035);
      box(B.paint, -2.36, -0.50, s * 1.08, s * 1.12, ZK - 0.16, ZK);                   /* outer skirt (P3) */
      box(B.dark, -2.62, -2.58, y[0] + 0.05, y[1] - 0.05, 0.42, 0.98);                  /* mud flap (P4) */
    }
    /* the rear crossmember and the tail lamps (P3) */
    box(B.paint, -2.70, -2.56, -0.96, 0.96, 0.78, 0.98);
    for (s = -1; s <= 1; s += 2) box(B.dark, -2.73, -2.70, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.84, 0.92);
    /* the locker on the rear deck, port side only (P3) */
    box(B.paint, -2.65, -1.98, 0.62, 1.08, 1.02, 1.42);
    box(B.dark, -2.63, -2.00, 1.08, 1.09, 1.34, 1.37);
  }

  /* ------------------------------------------------- the launcher
     the base on the deck ("turret", origin on the ring): a turntable, the frame out to the pivot brackets at the rear
     and to the gearbox of the elevating screw at the front, the screw's sleeve, the hand cranks (P3) */
  function addBase(B) {
    var s, sx = -0.27 - RX;                                                              /* the screw's foot (P3) */
    cyl(B.dark, [0, 0, 0], [0, 0, 0.06], 0.60, 0.60, 24);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, PVX - 0.15, sx + 0.10, s * 0.62, s * 0.74, 0.04, 0.16);               /* side beams */
      /* the pivot bracket: a gusset plate up to the pivot, the boss (P3) */
      profY(B.paint, [[PVX - 0.22, 0.04], [PVX + 0.40, 0.04], [PVX + 0.10, PVZ + 0.10], [PVX - 0.14, PVZ + 0.10]], s * YT - 0.02 * s, s * (YT + 0.06));
      box(B.paint, PVX - 0.15, PVX + 0.30, s * 0.62, s * (YT + 0.06), 0.04, 0.16);
    }
    box(B.paint, PVX - 0.15, PVX + 0.10, -0.74, 0.74, 0.04, 0.16);
    box(B.paint, sx - 0.15, sx + 0.15, -0.74, 0.74, 0.04, 0.16);
    /* the gearbox and the screw's sleeve; the cranks (P3) */
    box(B.dark, sx - 0.14, sx + 0.14, -0.20, 0.20, 0.16, 0.36);
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, sx, s * YT, 0.10, 0.42, 0.05, 10);
    for (s = -1; s <= 1; s += 2) box(B.paint, sx - 0.08, sx + 0.08, s * 0.20, s * (YT + 0.05), 0.10, 0.16);
    bar(B.dark, [sx - 0.20, 0.30, 0.30], [sx - 0.20, 0.30, 0.55], 0.02);
    bar(B.dark, [sx - 0.20, 0.30, 0.55], [sx - 0.08, 0.30, 0.62], 0.02);
    bar(B.dark, [sx - 0.30, -0.30, 0.26], [sx - 0.30, -0.50, 0.40], 0.02);
  }

  /* the eight rails (P1, P2, P3): a deep web with a row of round lightening holes (drawn as open bays between posts),
     a T head along the top and the bottom on which the rockets' studs run; two tie tubes across with a collar at each
     rail (P2, P3); side plates at the rear ends (P3) */
  function addRails(B) {
    var r, i, y, x, n = 36, pitch = (RL1 - RL0 - 0.12) / n, hw = 0.006;
    for (r = 0; r < 8; r++) {
      y = RY[r];
      box(B.paint, RL0, RL1, y - hw, y + hw, RH + RD - 0.045, RH + RD - 0.015);         /* web: top strip */
      box(B.paint, RL0, RL1, y - hw, y + hw, RH - RD + 0.015, RH - RD + 0.045);         /* web: bottom strip */
      for (i = 0; i <= n; i++) {
        x = RL0 + 0.06 + i * pitch;
        box(B.paint, x - 0.025, x + 0.025, y - hw, y + hw, RH - RD + 0.045, RH + RD - 0.045);   /* posts between holes */
      }
      box(B.paint, RL0, RL0 + 0.06, y - hw, y + hw, RH - RD + 0.045, RH + RD - 0.045);
      box(B.paint, RL1 - 0.06, RL1, y - hw, y + hw, RH - RD + 0.045, RH + RD - 0.045);
      box(B.paint, RL0, RL1, y - 0.028, y + 0.028, RH + RD - 0.015, RH + RD);           /* T heads */
      box(B.paint, RL0, RL1, y - 0.028, y + 0.028, RH - RD, RH - RD + 0.015);
      box(B.dark, RL1 - 0.005, RL1 + 0.01, y - 0.03, y + 0.03, RH - RD, RH + RD);       /* the front ends */
    }
    /* the tie tubes with collars (P2, P3: about 1.23 m and 3.21 m ahead of the pivot) */
    var TX = [1.23, 3.21];
    for (i = 0; i < 2; i++) {
      cylY(B.dark, TX[i], -1.00, 1.00, RH, 0.03, 8);
      for (r = 0; r < 8; r++) cylY(B.paint, TX[i], RY[r] - 0.045, RY[r] + 0.045, RH, 0.05, 10);
    }
    /* the rear: a tie tube, the side plates over the outer rails' rear ends (P3) */
    cylY(B.dark, RL0 + 0.25, -1.00, 1.00, RH, 0.03, 8);
    for (y = -1; y <= 1; y += 2) {
      box(B.paint, RL0, RL0 + 0.55, y * 0.96, y * 0.99, RH - RD - 0.02, RH + RD);
      cylY(B.dark, RL0 + 0.25, y * 0.99, y * 1.03, RH, 0.07, 10);
    }
    box(B.team, RL0 + 0.18, RL0 + 0.32, -0.88, 0.88, RH + 0.03, RH + 0.05);
  }

  /* the M-13 (1.41 m, 132 mm, published): the ogive head, the body, the tail with four fins at 45 degrees (P3);
     tail at xt, along +X, on the axis (y, z) */
  function rocket(B, xt, y, z) {
    var k, a, c, s, f = 0.15;
    cyl(B.dark, [xt + 0.10, y, z], [xt + ML - 0.32, y, z], MR, MR, 10, false, true);
    cyl(B.dark, [xt + ML - 0.32, y, z], [xt + ML - 0.12, y, z], MR, MR * 0.62, 10, true, true);
    cyl(B.dark, [xt + ML - 0.12, y, z], [xt + ML, y, z], MR * 0.62, 0.012, 10, true, false);
    cyl(B.dark, [xt, y, z], [xt + 0.10, y, z], MR * 0.85, MR, 10, false, true);
    for (k = 0; k < 4; k++) {
      a = (k + 0.5) * Math.PI / 2; c = Math.cos(a); s = Math.sin(a);
      planeBox(B.dark, [xt, y, z], [1, 0, 0], [0, c, s], [0, -s, c], 0.0, 0.26, MR * 0.8, f, -0.004, 0.004);
    }
  }
  /* sixteen rounds: one riding on each rail, one hanging under it; their mouths for the engine */
  function addRockets(B, cells) {
    var r;
    for (r = 0; r < 8; r++) {
      rocket(B, XTT, RY[r], ZTOP);
      rocket(B, XTB, RY[r], ZBOT);
      cells.push([RL1 + 0.05, RY[r], ZTOP, XTT]);
      cells.push([RL1 + 0.05, RY[r], ZBOT, XTB]);
    }
  }

  /* the lattice under the rails, pivoted at the rear (P3): in each side frame the lower chord from the pivot forward,
     two struts from the pivot up to the cradle beam, two from the forward node; the screw's rod down from the cradle
     (it rises out of its sleeve as the rails go up); the cradle beam along the underside of the pack */
  function addCradle(B) {
    var s, y, N2 = [1.37, -0.165], N3 = [1.62, -0.17];
    for (s = -1; s <= 1; s += 2) {
      y = s * YT;
      box(B.paint, -0.20, 3.40, y - 0.04, y + 0.04, 0.47, 0.57);                          /* cradle beam */
      cylY(B.dark, 0, y - s * 0.10, y + s * 0.10, 0, 0.09, 12);                            /* pivot boss */
      bar(B.paint, [0, y, 0], [N2[0], y, N2[1]], 0.06);
      bar(B.paint, [0.12, y, 0.05], [0.95, y, 0.52], 0.05);
      bar(B.paint, [0.30, y, 0.07], [1.50, y, 0.52], 0.05);
      bar(B.paint, [N2[0], y, N2[1]], [1.27, y, 0.52], 0.05);
      bar(B.paint, [N2[0], y, N2[1]], [2.15, y, 0.52], 0.05);
      bar(B.paint, [N2[0], y, N2[1]], [N3[0], y, N3[1]], 0.05);
      cylY(B.dark, N2[0], y - 0.05, y + 0.05, N2[1], 0.05, 8);
      /* the screw's rod from the cradle down into its sleeve */
      cyl(B.dark, [1.795, y, 0.52], [N3[0] - 0.10, y, -0.55], 0.03, 0.03, 8);
    }
    /* the cross members under the pack, from the cradle beams up to the rails' feet */
    for (s = 0; s < 3; s++) box(B.paint, [0.95, 1.95, 3.00][s] - 0.04, [0.95, 1.95, 3.00][s] + 0.04, -1.00, 1.00, 0.47, RH - RD);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, wg, WB;
    addFront(HB);
    addCab(HB);
    addRear(HB);
    flush(THREE, g, HB);
    /* three axles, each one "roadwheel" group holding both wheels (twin on the bogie), origin on the axle centre */
    for (i = 0; i < 3; i++) {
      WB = new Bin(T.wheel, false, true);
      addAxle(WB, i > 0);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, RT);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    /* the launcher: "turret" (the base, trains on the ring) holding the fixed stow tilt about the rear pivot, holding
       "podelev" (the rails, rockets and lattice; at rotation 0 stowed, raised by userData.el in render3d.js poseLauncher) */
    var tur = new THREE.Group(), MB = bins(T), EB = bins(T), tilt = new THREE.Group(), el = new THREE.Group(), cells = [];
    addBase(MB);
    flush(THREE, tur, MB);
    addRails(EB);
    addRockets(EB, cells);
    addCradle(EB);
    flush(THREE, el, EB);
    el.name = "podelev";
    el.userData.el = LAUNCH_EL;
    el.userData.cells = cells;
    tilt.position.set(PVX, 0, PVZ);
    tilt.rotation.y = -STOW;
    tilt.add(el);
    tur.add(tilt);
    tur.name = "turret";
    tur.position.set(RX, 0, RZ);
    g.add(tur);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the riding rockets' tails at the stowed angle to the bumper */
UNIT_MODELS["pla_e50_mlrs"] = { len: 7.15, build: HeroBm13.build };
