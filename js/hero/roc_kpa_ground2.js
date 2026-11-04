/* ========== roc_kpa_ground2.js - HERO models: the remaining ROC and KPA ground rows ==========
   ROW                VEHICLE (js/eras.js full name)        HOW
   roc_e50_mbt        M4A3(76) Sherman                      NEW  sherman()      (no Sherman hero exists:
                                                                                 js/hero has the M7B1 and the
                                                                                 Sexton, whole vehicles only)
   roc_e00_lighttank  M41D (M41 Walker Bulldog rebuild)     REUSED HeroM41.build(..., "M41") (js/hero/
                                                                 us_m41.js), with the M41D's parts added
                                                                 and its gun tube replaced (m41d())
   kpa_e50_recon      BA-64B light armoured car             NEW  ba64()
   HELD (registration commented out at the foot, rule 1):
   roc_e00_spaag      Antelope (TC-1L): every photograph found shows the launcher on the Toyota Dyna /
                      Hino truck (A1-A3); none shows it on the HMMWV the row names, so putting it on
                      HeroHumvee would invent the pairing (as roc_artillery.js held the Kung Feng IV).
   kpa_e80_spaag, kpa_e00_spaag (M-1989 twin 37 mm), kpa_e90_spaag (M1992 twin 30 mm), kpa_e90_recon,
   kpa_e00_recon (M-1992 4x4 car): no photograph or drawing found (Commons searches; the DoD North
                      Korea Country Handbook 1997 prints "LINE DIAGRAM UNAVAILABLE" for the M1992 APC,
                      the M-1992 twin 30 mm and the 37 mm SP AA gun).
   kpa_e00_ifv        M2010: one parade photograph of an 8x8 with a turret ("Tank in the DPRK Victory Day
                      Parade.jpg", 2013, front-right 3/4, crowd in front) - its caption does not name the
                      vehicle and no second view ties it to the M2010 row; not drawn.

   REFERENCES (Wikimedia Commons, width 960-1200 through commons.wikimedia.org/w/thumb.php, cached in
   scratchpad/q_rk2_ref):
     S1  "M4A3E8 side view.jpg" - an M4A3(76)W HVSS from the RIGHT, square on: THE SHERMAN STATION TABLE.
         Scale 124.4 px a metre from the hull length over the rear plate and the front sprocket, 780 px =
         6.27 m (en.wikipedia "M4 Sherman": length 5.84-6.27 m by variant; the upper end taken for the
         HVSS M4A3(76)W - NOT CONFIRMED which variant carries it).  x = (px - 542) / 124.4, z = (548 - py)
         / 124.4.
     S2  "TM 9-2800, Tank, medium, M4A3, 76-mm gun (G-104).png" (and G-205, the same plate) - front left
         3/4 of the M4A3(76)W HVSS: the rounded one-piece final-drive nose, the 47-degree glacis with the
         two driver's hoods, the bow MG ball on the right, the T23 turret with its long bustle, the gun
         travel lock, the HVSS bogies with their horizontal springs, return rollers on hull brackets.
     S3  "M4 Sherman Tank Display in Chengkungling 20121006a.JPG" and "...b.JPG" - the ROC Army museum
         Sherman: an M4A1 (cast hull, 75 mm turret, VVSS) in plain olive.  Used for the ROC paint only
         (the row names the M4A3(76); the ROC's subtypes are "poorly documented", eras.js).
     D1  "M41D Side View 20111009.jpg" - M41D from the LEFT, turret traversed toward the camera: the
         add-on side armour boxes over the tracks from nose to tail, top at deck height, chamfered ends;
         the thick segmented thermal sleeve and the fume extractor near the muzzle; the box on the left
         of the mantlet; the box on the bustle rear; the exhaust box and pipe on the left rear.  Scaled on
         HeroM41's road-wheel stations (1.96 / -1.50 m = px 208 / 688, 138.7 px a metre).
     D2  "M41D Display in Yue Kang Road Side View 20121013.jpg" - from the RIGHT, gun raised: the smoke
         discharger cluster on the turret front cheek, the louvred grille on the right side armour's rear
         top (x -1.82 to -0.73 on the wheel stations, 110.7 px a metre), the fume extractor at 0.70 of the
         tube from the mantlet, the small muzzle piece (no T-shaped brake).
     D3  "M41D Front View in Chengkungling Ground 20121006.jpg" - head on: a 2 x 2 smoke cluster on each
         front cheek, the box on the turret roof right front (with a lamp), the box on the left of the
         mantlet, the side armour boxes standing 6 per cent wider than the tracks.
     D4  "M41D Display in Chengkungling Ground 20121006a.JPG" - front left 3/4: the same parts, the side
         armour's vertical panel joints.
     B1  "BA-64 Dresden.jpg" - BA-64B from the RIGHT front quarter: the faceted hull, lower plates leaning
         out to a waist and upper plates leaning in, the long sloped bonnet, the driver's visor hinged up,
         the round vision port, the open eight-sided turret with the DT on its right, the flat front
         mudguards with the headlamps in wire guards, the flared rear mudguards, the spare wheel on the
         rear plate, the exhaust under the right side.
     B2  "Panzerspaehwagen BA-64.JPG" (Commons title with the German umlaut) - left front quarter: the
         louvred lower nose plate, the bonnet grille, the faceted turret, the spare wheel on the tail.
     B3  "BA-64B.jpg" (Commons title in Cyrillic) - right front quarter, a running vehicle.
     A1  "Antelope Air Defense System Display at Armor School 20130302.jpg", A2 "... in Songshan Air Force
         Base 20110813a.jpg", A3 "... Near View 20111015.jpg" - all on the truck (see HELD).
   PUBLISHED (en.wikipedia, fetched): "M4 Sherman" 5.84-6.27 x 2.62-3.00 x 2.74-2.97 m by variant, HVSS
     on the M4A3(76)W from August 1944.  "76 mm gun M1": 52 calibres.  "M41 Walker Bulldog": M41D =
     Detroit Diesel 8V-71T, the M32K1 (a Taiwanese M32, 76 mm) "with a fume extractor and a different
     muzzle brake ... thermal imaging sights", Type 74 coaxial MG (Jane's).  NOTE: the task named a NEW
     90 mm gun; the published text names the 76 mm M32K1, and the length of the tube is not published,
     so the tube keeps HeroM41's 76 mm length (NOT CONFIRMED).  "BA-64": BA-64B 3.66 x 1.74 x 1.9 m
     (hull), 2.4 t, GAZ-67B chassis, open turret with the DT on a pintle to the right.

   SHERMAN STATION TABLE (S1; metres, x forward)
     rear plate -3.13; sprocket 2.76 / z 0.84 r 0.36; idler -2.40 / 0.83 r 0.32; HVSS road wheels -1.70
     -0.76 | -0.14 0.79 | 1.39 2.32 (three bogies, the pairs 0.94 m apart on a bogie), z 0.35, r 0.29;
     return rollers on hull brackets between the bogies -0.48, 1.05 / z 1.05; sponson floor 1.27; hull
     top 1.99 from x -2.70 to the glacis knee 1.95; glacis to 2.95 / 1.31; rounded nose to 3.10 / 0.95;
     belly 0.45; turret bustle -1.33, turret face 0.99, mantlet face 1.25, roof 2.85 (0.86 over the
     hull), gun axis 2.45, muzzle 3.93 (all from the ring at x 0).
   WHERE A FIGURE AND A DRAWING DISAGREE: the Sherman's over-gun length comes out 7.16 m (rear plate fittings to the muzzle) at S1's scale;
     no over-gun figure was found to check it.  The road wheels read r 0.29 (S1 includes the near-side
     magnification of a few per cent; drawn as measured).  M41D: the side armour reaches 2.98 m forward
     and -3.05 m aft (D1's tips, the rear one read short of D1's 3.32 m because D1's rear is nearer the
     camera - NOT CONFIRMED).

   RECOGNITION
     Sherman: tall slab-sided hull, the steep glacis over the big rounded nose, the T23 turret with its
       long bustle and boxy mantlet, the long 76 mm, six dual HVSS wheel stations in three bogies, the
       raised front sprocket and rear idler (S1, S2).
     M41D: the M41 hull and turret (HeroM41), the box armour over both tracks, the fat sleeved gun with
       the fume extractor, the smoke clusters on the cheeks, the LRF box on the mantlet's left, the roof
       box (D1-D4).
     BA-64B: the faceted wedge hull on four big tyres at the corners, the small open turret (B1-B3).
   PAINT: no markings, numbers, unit signs or slogans (D1/D2 numbers and characters, S1's star: not drawn).
     Sherman: ROC olive (S3 in daylight, about 0.8) #4f5236.  M41D: HeroM41's own olive drab; D1-D4 show
     the ROC three-colour, which is a camouflage pattern and is not drawn (policy rule 6).  BA-64B:
     Soviet green as B1/B2's museum repaint at about 0.8, #4a5534.
   NOT CONFIRMED (proportion or judgement): Sherman - the 6.27 m pairing (above), hull width 2.62 m (the
     Army Regulation width in "M4 Sherman") and track spread to the published 3.00 m, the HVSS track width
     0.58 m, turret plan width 1.94 m, the cupola, hatch and periscope places (S2's view), the bogie
     spring sizes.  M41D - every size of the added parts (from D1-D4's proportions on HeroM41's stations),
     the smoke tube count (2 x 2 each side, D3), the bustle-rear box's width.  BA-64B - the 2.10 m
     wheelbase and 1.45 m track (GAZ-67B, not fetched), tyre radius 0.38 m, all plate angles and heights
     (B1-B3 are quarter views), the turret's size.
   NOT DRAWN: crews, antennas (D1's whip), the Sherman's .50 (not in S1/S2), tools, tow cables, the M41D's
     new engine (internal; its grille only).
   ENGINE (js/damage3d.js, not edited): roc_e50_mbt (mbt) and roc_e00_lighttank (lighttank) default to
     "rear" - both engines are at the rear; kpa_e50_recon (recon) defaults to "front" - the BA-64's engine
     is in the front.  All right.  roc_e00_spaag is listed "front" (held here).
   LOAD ORDER: after js/armour_specs.js (whose generic registrations these replace) and js/hero/us_m41.js
     (roc_e00_lighttank is registered only if HeroM41 is loaded).
   Materials: PAINT (canvas texture per vehicle), DARK, GLASS, WHEEL (vertex colours), TEAM (exactly
     C.team, small deck strips).  Nodes: "turret" (origin on the ring, gun along +X), "roadwheel" (one per
     axle position, both sides; axle on local Y).
   Model space: +X nose, +Y left, +Z up, metres, ground at z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocKpaGround2 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
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
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 14); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 14); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 14); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }
  /* rings of a plan (x, y) scaled per level: L = [[z, sx, sy], ...] */
  function planLoft(bin, plan, L, x0) {
    var R = [], k, i;
    for (k = 0; k < L.length; k++) { R.push([]); for (i = 0; i < plan.length; i++) R[k].push([(x0 || 0) + plan[i][0] * L[k][1], plan[i][1] * L[k][2], L[k][0]]); }
    loftN(bin, R);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, P) {
    if (_tex[P.base] !== undefined) return _tex[P.base];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.25 + R() * 0.35; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.base] = t;
    return t;
  }
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
  function flush(THREE, group, B) {
    var k, b, geo, m;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      m = new THREE.Mesh(geo, b.mat); m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); if (name) g.name = name; g.position.set(x || 0, y || 0, z || 0); return g; }
  function rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }

  /* convex hull of 2D points (the track run round its wheels) */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* the track: a belt round the circles C = [[x, z, r]], shoes every `pitch`, a centre guide on
     every other shoe; both sides at +-ty, half width tw */
  function track(bin, C, ty, tw, pitch) {
    var pts = [], i, k, n, a, b, l, segs = [], tot = 0, q, rem, d, t, dx, dz, px, pz, s, y, cnt;
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts); n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length; cnt = Math.round(tot / pitch);
    var step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(bin, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - tw + 0.02, y + tw - 0.02, 0.035);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(bin, px - dx * pitch * 0.38, pz - dz * pitch * 0.38, px + dx * pitch * 0.38, pz + dz * pitch * 0.38, y - tw, y + tw, 0.06);
        if (k % 2 === 0) belt(bin, px - dx * 0.025 + dz * 0.05, pz - dz * 0.025 - dx * 0.05, px + dx * 0.025 + dz * 0.05, pz + dz * 0.025 - dx * 0.05, y - 0.025, y + 0.025, 0.07);
      }
    }
  }
  function sprocket(bin, paint, x, z, r, ty, n) {
    var s, h, k, t, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      for (h = -1; h <= 1; h += 2) {
        cylY(bin, x, y + h * 0.10 - 0.035, y + h * 0.10 + 0.035, z, r - 0.03, 20);
        for (k = 0; k < n; k++) {
          t = k / n * TAU;
          slab(bin, [x + Math.cos(t) * (r - 0.01), y + h * 0.10, z + Math.sin(t) * (r - 0.01)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.04, 0.03, 0.03);
        }
      }
      cyl(paint, [x, y + s * 0.14, z], [x, y + s * 0.20, z], r - 0.06, r - 0.14, 16);
      cylY(bin, x, y + s * 0.20, y + s * 0.24, z, 0.09, 12);
    }
  }

  /* =========================================================== SHERMAN */
  var SH = {
    P: { base: "#4f5236", blots: ["#454830", "#595c40"], seed: 4376 },
    TY: 1.21, TW: 0.29,
    XW: [-1.70, -0.76, -0.14, 0.79, 1.39, 2.32], ZW: 0.35, RW: 0.29,
    SPR: [2.76, 0.84, 0.36], IDL: [-2.40, 0.83, 0.32], RL: [-0.48, 1.05], ZR: 1.05,
    REAR: -3.13, TOP: 1.99, KNEE: 1.95, SPON: 1.27, HW: 1.31, LW: 0.92,
    TX: 0.0, MUZ: 3.93, GZ: 0.46
  };
  function shermanHull(B) {
    var s, i, x, TOPZ = SH.TOP, R = SH.REAR;
    /* lower hull between the tracks with the one-piece rounded final-drive nose (S1, S2) */
    prismY(B.paint, [[-3.00, 0.45], [2.55, 0.45], [2.80, 0.52], [2.98, 0.66], [3.08, 0.85], [3.10, 0.98], [3.05, 1.15], [2.95, 1.30],
                     [R, 1.30], [R, 0.95]], -SH.LW, SH.LW);
    /* the nose casting runs out over the sprockets' inner faces (S2) */
    for (s = -1; s <= 1; s += 2) prismY(B.paint, [[2.70, 0.80], [2.98, 0.88], [3.04, 1.05], [2.95, 1.30], [2.70, 1.30]], s > 0 ? SH.LW : -1.02, s > 0 ? 1.02 : -SH.LW);
    /* upper hull over the tracks: vertical sides, the 47-degree glacis, the sloped upper rear (S1) */
    prismY(B.paint, [[R, SH.SPON], [2.95, SH.SPON], [2.95, 1.31], [SH.KNEE, TOPZ], [-2.70, TOPZ], [R + 0.03, 1.75]], -SH.HW, SH.HW);
    var gang = Math.atan2(TOPZ - 1.31, 2.95 - SH.KNEE), gu = [Math.cos(gang), 0, -Math.sin(gang)], gw = [Math.sin(gang), 0, Math.cos(gang)];
    function gz(xx) { return TOPZ - (xx - SH.KNEE) * Math.tan(gang); }
    /* the two driver's hoods on the glacis top, their hatches and periscopes (S2) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 1.30, 2.12, s * 0.20, s * 0.20 + s * 0.68, TOPZ - 0.05, TOPZ + 0.08);
      box(B.paint, 1.40, 1.90, s * 0.32, s * 0.32 + s * 0.44, TOPZ + 0.08, TOPZ + 0.11);
      box(B.dark, 1.88, 1.96, s * 0.45 - 0.08, s * 0.45 + 0.08, TOPZ + 0.08, TOPZ + 0.17);
      /* headlamp guards at the glacis foot, the lifting rings, the fender ends */
      var hx = 2.85, hy = s * 1.08;
      box(B.dark, hx - 0.03, hx + 0.10, hy - 0.11, hy - 0.09, gz(hx), gz(hx) + 0.20);
      box(B.dark, hx - 0.03, hx + 0.10, hy + 0.09, hy + 0.11, gz(hx), gz(hx) + 0.20);
      cyl(B.dark, [hx - 0.02, hy, gz(hx) + 0.09], [hx + 0.10, hy, gz(hx) + 0.12], 0.06, 0.06, 10);
      cylY(B.dark, 2.30, s * 1.05 - 0.02, s * 1.05 + 0.02, gz(2.30) + 0.08, 0.06, 8);
      belt(B.paint, 2.95, SH.SPON, 3.12, SH.SPON - 0.12, s * (SH.HW - 0.30), s * SH.HW, 0.025);
    }
    /* the bow machine-gun ball on the glacis right (S2) */
    cyl(B.paint, [2.35 - gw[0] * 0.02, -0.55, gz(2.35)], [2.35 + gw[0] * 0.10, -0.55, gz(2.35) + gw[2] * 0.10], 0.13, 0.10, 12);
    cyl(B.dark, [2.40, -0.55, gz(2.35) + 0.05], [2.75, -0.55, gz(2.35) - 0.05], 0.025, 0.02, 8);
    /* glacis weld seam across the knee */
    slab(B.dark, [SH.KNEE + 0.05, 0, gz(SH.KNEE + 0.05) + 0.005], gu, [0, 1, 0], gw, 0.015, SH.HW - 0.02, 0.008);
    /* engine deck: the grille doors, the rear lifting rings, the team strips */
    box(B.paint, -2.65, -1.35, -0.90, 0.90, TOPZ, TOPZ + 0.025);
    for (i = 0; i < 9; i++) { x = -2.55 + i * 0.13; box(B.dark, x, x + 0.04, -0.80, 0.80, TOPZ + 0.025, TOPZ + 0.035); }
    box(B.dark, -2.65, -1.35, -0.01, 0.01, TOPZ + 0.025, TOPZ + 0.04);
    for (s = -1; s <= 1; s += 2) {
      box(B.team, -1.25, -1.05, s > 0 ? 0.60 : -1.20, s > 0 ? 1.20 : -0.60, TOPZ, TOPZ + 0.012);
      cylY(B.dark, -2.60, s * 1.15 - 0.02, s * 1.15 + 0.02, TOPZ + 0.06, 0.06, 8);
      /* the grouser / stowage boxes along the sponson top edge (S1: the row of small brackets) */
      for (i = 0; i < 6; i++) box(B.dark, -2.4 + i * 0.75, -2.32 + i * 0.75, s * SH.HW - 0.02, s * SH.HW + 0.02, 1.62, 1.70);
    }
    /* rear: the plate, the exhaust deflector, the tail lamps, the idler housings */
    box(B.paint, R - 0.10, R, -1.00, 1.00, 1.30, 1.55);
    for (s = -1; s <= 1; s += 2) { box(B.dark, R - 0.06, R, s * 1.05 - 0.07, s * 1.05 + 0.07, 1.62, 1.72); cylY(B.paint, -2.40, s * 0.92, s * 1.00, 0.83, 0.16, 12); }
  }
  /* HVSS bogies (S1, S2): a bracket on the hull, the horizontal volute springs between the two axles,
     the return rollers on their own brackets between the bogies */
  function shermanGear(B) {
    var s, k, b, y, x0, x1;
    var C = SH.XW.map(function (x) { return [x, SH.ZW, SH.RW + 0.04]; });
    C.push([SH.SPR[0], SH.SPR[1], SH.SPR[2] + 0.02], [SH.IDL[0], SH.IDL[1], SH.IDL[2] + 0.04]);
    SH.RL.forEach(function (x) { C.push([x, SH.ZR, 0.12 + 0.03]); });
    track(B.dark, C, SH.TY, SH.TW, 0.16);
    sprocket(B.dark, B.paint, SH.SPR[0], SH.SPR[1], SH.SPR[2], SH.TY, 13);
    for (s = -1; s <= 1; s += 2) {
      y = s * SH.TY;
      /* idler: dual discs */
      cylY(B.dark, SH.IDL[0], y - 0.17, y - 0.04, SH.IDL[1], SH.IDL[2], 18);
      cylY(B.dark, SH.IDL[0], y + 0.04, y + 0.17, SH.IDL[1], SH.IDL[2], 18);
      cylY(B.paint, SH.IDL[0], y + s * 0.17, y + s * 0.20, SH.IDL[1], 0.12, 10);
      for (b = 0; b < 3; b++) {
        x0 = SH.XW[2 * b]; x1 = SH.XW[2 * b + 1];
        var xm = (x0 + x1) / 2;
        box(B.paint, xm - 0.20, xm + 0.20, s * (SH.LW - 0.02), s * (SH.TY - 0.02), 0.62, SH.SPON);
        box(B.paint, xm - 0.30, xm + 0.30, s * (SH.TY - 0.18), s * (SH.TY + 0.02), 0.50, 0.68);
        for (k = -1; k <= 1; k += 2) cylX(B.dark, xm + k * 0.06, xm + k * 0.33, y + 0.0, 0.76, 0.085, 0.075, 12);
        cyl(B.dark, [x0 + 0.12, y + s * 0.20, 0.42], [xm - 0.05, y + s * 0.20, 0.70], 0.035, 0.035, 8);
        cylY(B.dark, x0, s * (SH.TY - 0.20), y + s * 0.20, SH.ZW, 0.05, 8);
        cylY(B.dark, x1, s * (SH.TY - 0.20), y + s * 0.20, SH.ZW, 0.05, 8);
      }
      SH.RL.forEach(function (x) {
        box(B.paint, x - 0.07, x + 0.07, s * SH.LW, s * (SH.TY - 0.12), SH.ZR - 0.05, SH.SPON);
        cylY(B.dark, x, y - 0.12, y + 0.12, SH.ZR, 0.12, 12);
      });
    }
  }
  function shermanWheel(W) {
    var BODY = rgb(SH.P.base, 1.1), RIM = rgb(SH.P.base, 1.25), TYRE = [0.12, 0.125, 0.115], s, y, h, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * SH.TY;
      for (h = -1; h <= 1; h += 2) {
        W.col = TYRE; cylY(W, 0, y + h * 0.04, y + h * 0.20, 0, SH.RW, 18);
        W.col = BODY; cylY(W, 0, y + h * 0.035, y + h * 0.205, 0, SH.RW - 0.055, 14);
      }
      W.col = RIM; cyl(W, [0, y + s * 0.205, 0], [0, y + s * 0.225, 0], SH.RW - 0.07, 0.12, 16);
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; W.col = TYRE; cylY(W, Math.cos(a) * 0.15, y + s * 0.215, y + s * 0.228, Math.sin(a) * 0.15, 0.035, 8); }
      W.col = BODY; cylY(W, 0, y + s * 0.22, y + s * 0.25, 0, 0.065, 10);
    }
  }
  /* the T23 turret (S1, S2): rounded front, straight sides, long bustle; the boxy M62 mantlet; the
     76 mm M1A1 with the thread protector at the muzzle (S1: no brake) */
  var T23 = [[0.99, -0.30], [0.86, -0.80], [0.45, -0.97], [-0.40, -0.97], [-1.10, -0.82], [-1.33, -0.55],
             [-1.33, 0.55], [-1.10, 0.82], [-0.40, 0.97], [0.45, 0.97], [0.86, 0.80], [0.99, 0.30]];
  function shermanTurret(B) {
    var s, k, a, GZ = SH.GZ, ROOF = 0.86;
    planLoft(B.paint, T23, [[0.0, 0.93, 0.95], [0.10, 1.0, 1.0], [0.62, 0.98, 0.98], [0.80, 0.93, 0.90], [ROOF, 0.86, 0.82]]);
    /* the mantlet and its cheeks, the gunner's sight aperture, the coaxial MG on the right */
    box(B.paint, 0.94, 1.25, -0.46, 0.46, GZ - 0.25, GZ + 0.23);
    box(B.paint, 0.86, 0.98, -0.62, 0.62, GZ - 0.28, GZ + 0.26);
    cylX(B.paint, 1.25, 1.42, 0, GZ, 0.15, 0.12, 14);
    box(B.glass, 1.25, 1.26, 0.22, 0.32, GZ + 0.05, GZ + 0.13);
    cylX(B.dark, 1.20, 1.36, -0.25, GZ - 0.02, 0.03, 0.03, 8);
    /* the gun */
    cylX(B.dark, 1.42, SH.MUZ - 0.12, 0, GZ, 0.075, 0.062, 16);
    cylX(B.dark, SH.MUZ - 0.12, SH.MUZ, 0, GZ, 0.075, 0.075, 16);
    /* commander's vision cupola on the right rear, its six blocks and hatch (S2) */
    var cx = -0.45, cy = -0.45;
    cylZ(B.paint, cx, cy, ROOF - 0.05, ROOF + 0.14, 0.33, 18);
    for (k = 0; k < 6; k++) { a = k / 6 * TAU; slab(B.glass, [cx + Math.cos(a) * 0.33, cy + Math.sin(a) * 0.33, ROOF + 0.08], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.012, 0.06, 0.03); }
    cylZ(B.paint, cx, cy, ROOF + 0.14, ROOF + 0.18, 0.26, 16);
    /* loader's hatch on the left, periscopes, the ventilator, the stowage rails on the bustle */
    cylZ(B.paint, -0.30, 0.45, ROOF - 0.03, ROOF + 0.05, 0.27, 16);
    box(B.dark, -0.36, -0.24, 0.20, 0.70, ROOF + 0.05, ROOF + 0.07);
    box(B.paint, 0.35, 0.55, -0.55, -0.35, ROOF - 0.04, ROOF + 0.10);
    box(B.glass, 0.55, 0.56, -0.53, -0.37, ROOF + 0.02, ROOF + 0.08);
    box(B.paint, 0.30, 0.48, 0.28, 0.44, ROOF - 0.04, ROOF + 0.08);
    cylZ(B.dark, -0.95, 0.30, ROOF - 0.04, ROOF + 0.06, 0.10, 10);
    for (s = -1; s <= 1; s += 2) belt(B.dark, -1.30, 0.50, -0.70, 0.50, s * 0.98, s * 1.01, 0.03);
    box(B.team, -1.05, -0.80, -0.35, 0.35, ROOF + 0.0, ROOF + 0.012);
  }
  function sherman(THREE, M, C) {
    var T = materials(THREE, C, SH.P), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, W;
    shermanHull(HB);
    shermanGear(HB);
    flush(THREE, g, HB);
    for (i = 0; i < SH.XW.length; i++) {
      W = new Bin(T.wheel, false, true); shermanWheel(W);
      wg = group(THREE, "roadwheel", SH.XW[i], 0, SH.ZW); flush(THREE, wg, { wheel: W }); g.add(wg);
    }
    shermanTurret(TB);
    wg = group(THREE, "turret", SH.TX, 0, SH.TOP); flush(THREE, wg, TB); g.add(wg);
    return g;
  }

  /* =========================================================== M41D */
  /* HeroM41 "M41" is the M41A1 the M41D was rebuilt from.  Its turret group holds one mesh per
     material; the 76 mm tube with its evacuator and T-brake is the part of the DARK mesh ahead of the
     mantlet collar (x > 1.66 in the turret frame, on the bore line) and the brake's glass inserts - those
     triangles are dropped from copies of the two geometries (the module's own geometry and materials are
     not touched), and the M32K1 is drawn in their place.  M41 turret frame (us_m41.js): ring at x 0.25
     on the deck (z 1.58), gun axis 0.42 up, muzzle 4.89 ahead of the ring. */
  var MD = { GZ: 0.42, MANT: 1.66, MUZ: 4.89, DECK: 1.58 };
  function stripGun(THREE, mesh) {
    var geo = mesh.geometry, P = geo.getAttribute("position"), N = geo.getAttribute("normal"), U = geo.getAttribute("uv"), Cc = geo.getAttribute("color");
    var idx = geo.index, n = idx ? idx.count : P.count, keep = [], t, k, v, x, y, z, gun;
    for (t = 0; t < n; t += 3) {
      gun = true;
      for (k = 0; k < 3; k++) {
        v = idx ? idx.getX(t + k) : t + k;
        x = P.getX(v); y = P.getY(v); z = P.getZ(v);
        if (!(x > MD.MANT - 0.005 && Math.abs(y) < 0.26 && Math.abs(z - MD.GZ) < 0.26)) { gun = false; break; }
      }
      if (!gun) for (k = 0; k < 3; k++) keep.push(idx ? idx.getX(t + k) : t + k);
    }
    function pick(A, w) { if (!A) return null; var o = new Float32Array(keep.length * w), i, j; for (i = 0; i < keep.length; i++) for (j = 0; j < w; j++) o[i * w + j] = A.array[keep[i] * w + j]; return new THREE.BufferAttribute(o, w); }
    var g2 = new THREE.BufferGeometry();
    g2.setAttribute("position", pick(P, 3));
    if (N) g2.setAttribute("normal", pick(N, 3));
    if (U) g2.setAttribute("uv", pick(U, 2));
    if (Cc) g2.setAttribute("color", pick(Cc, 3));
    mesh.geometry = g2;
  }
  function m41dTurret(B) {
    var s, k, i, j, GZ = MD.GZ, ROOF = 0.86, L = MD.MUZ - MD.MANT;
    /* the M32K1 (D1, D2): the thermal sleeve in four segments from the collar, the fume extractor at
       0.70 of the tube, the plain tube, the small muzzle piece */
    var xe = MD.MANT + 0.70 * L;
    cylX(B.dark, MD.MANT, xe - 0.20, 0, GZ, 0.105, 0.10, 16);
    for (k = 1; k < 4; k++) cylX(B.dark, MD.MANT + k * (xe - 0.20 - MD.MANT) / 4 - 0.03, MD.MANT + k * (xe - 0.20 - MD.MANT) / 4 + 0.03, 0, GZ, 0.12, 0.12, 16);
    cylX(B.dark, xe - 0.20, xe - 0.12, 0, GZ, 0.10, 0.145, 16);
    cylX(B.dark, xe - 0.12, xe + 0.22, 0, GZ, 0.145, 0.145, 16);
    cylX(B.dark, xe + 0.22, xe + 0.30, 0, GZ, 0.145, 0.08, 16);
    cylX(B.dark, xe + 0.30, MD.MUZ - 0.16, 0, GZ, 0.075, 0.07, 14);
    cylX(B.dark, MD.MUZ - 0.16, MD.MUZ, 0, GZ, 0.10, 0.10, 14);
    /* the laser rangefinder box on the left of the mantlet (D1, D3) */
    box(B.paint, 1.05, 1.58, 0.50, 0.80, GZ + 0.10, GZ + 0.40);
    box(B.glass, 1.58, 1.59, 0.56, 0.74, GZ + 0.20, GZ + 0.32);
    box(B.dark, 1.05, 1.15, 0.45, 0.50, GZ + 0.12, GZ + 0.30);
    /* the box on the roof right front with its lamp (D3, D4) */
    box(B.paint, 0.15, 0.58, -0.82, -0.26, ROOF, ROOF + 0.22);
    box(B.glass, 0.58, 0.59, -0.74, -0.34, ROOF + 0.06, ROOF + 0.16);
    cylX(B.dark, 0.58, 0.62, -0.30, ROOF + 0.17, 0.035, 0.035, 8);
    /* smoke dischargers: a 2 x 2 cluster on each front cheek, up and outward (D2, D3) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.78, 0.98, s * 0.86, s * 1.06, 0.50, 0.58);
      var dir = unit([0.70, s * 0.35, 0.62]);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        var b = [0.84 + i * 0.10, s * (0.92 + j * 0.10), 0.60];
        cyl(B.dark, b, [b[0] + dir[0] * 0.26, b[1] + dir[1] * 0.26, b[2] + dir[2] * 0.26], 0.042, 0.042, 8);
      }
    }
    /* the box on the bustle's rear face (D1, D2) */
    box(B.paint, -2.25, -1.95, -0.75, 0.75, 0.30, 0.80);
    box(B.dark, -2.27, -2.25, -0.55, 0.55, 0.62, 0.66);
  }
  function m41dHull(B) {
    var s, i, x;
    /* the add-on armour boxes over both tracks (D1-D4): top at the deck, inner face on the hull side,
       outer face 6 per cent outside the tracks, chamfered ends, vertical panel joints */
    var PR = [[-2.80, 0.72], [2.72, 0.72], [2.98, 1.26], [2.80, 1.54], [-2.88, 1.54], [-3.05, 1.16]];
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, PR, s > 0 ? 1.47 : -1.70, s > 0 ? 1.70 : -1.47);
      [-1.85, -0.65, 0.55, 1.75].forEach(function (jx) { box(B.dark, jx - 0.012, jx + 0.012, s > 0 ? 1.70 : -1.712, s > 0 ? 1.712 : -1.70, 0.76, 1.50); });
      box(B.dark, -2.80, 2.72, s > 0 ? 1.70 : -1.712, s > 0 ? 1.712 : -1.70, 1.44, 1.46);
    }
    /* the louvred grille on the right box's rear top (D2) */
    for (i = 0; i < 9; i++) { x = -1.80 + i * 0.12; box(B.dark, x, x + 0.06, -1.725, -1.70, 1.30, 1.50); }
    /* the exhaust box and its pipe on the left rear (D1) */
    box(B.paint, -2.60, -2.40, 1.20, 1.55, MD.DECK, MD.DECK + 0.18);
    cylX(B.dark, -3.05, -2.55, 1.38, MD.DECK + 0.06, 0.09, 0.09, 12);
  }
  /* which of HeroM41's materials a mesh carries: its paint (textured), dark, glass, team */
  function role(m, C) {
    if (!m) return "";
    if (m.map) return "paint";
    if (m.vertexColors) return "wheel";
    if (C && C.team !== undefined && m.color && m.color.getHex() === (new m.color.constructor(C.team)).getHex() && m.roughness > 0.8 && m.metalness < 0.1) return "team";
    if (m.roughness < 0.2) return "glass";
    if (m.color && m.color.r < 0.2 && m.color.g < 0.2 && m.color.b < 0.2) return "dark";
    return "";
  }
  /* append a bin's triangles to the parent's own mesh of the same role (non-indexed geometry, as
     HeroM41's flush makes it), so the added parts cost no draw call; else add a mesh of their own */
  function append(THREE, parent, B, C) {
    var k, b;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      var host = null;
      parent.children.forEach(function (o) { if (!host && o.isMesh && !o.geometry.index && role(o.material, C) === k) host = o; });
      if (!host) { var one = {}; one[k] = b; flush(THREE, parent, one); continue; }
      var g0 = host.geometry, g1 = new THREE.BufferGeometry();
      [["position", b.P, 3], ["normal", b.N, 3], ["uv", b.U, 2], ["color", b.C, 3]].forEach(function (e) {
        var A = g0.getAttribute(e[0]);
        if (!A) return;
        var add = e[1] || [], o = new Float32Array(A.array.length + add.length);
        o.set(A.array, 0); o.set(add, A.array.length);
        g1.setAttribute(e[0], new THREE.BufferAttribute(o, e[2]));
      });
      host.geometry = g1;
    }
  }
  function m41d(THREE, M, C) {
    var g = HeroM41.build(THREE, M, C, "M41"), tg = null;
    g.traverse(function (o) { if (!tg && o.name === "turret") tg = o; });
    if (tg) tg.children.slice().forEach(function (o) {
      var r = o.isMesh ? role(o.material, C) : "";
      if (r === "dark" || r === "glass") stripGun(THREE, o);
    });
    var T = materials(THREE, C, SH.P), HB = bins(T), TB = bins(T);
    m41dHull(HB);
    append(THREE, g, HB, C);
    m41dTurret(TB);
    if (tg) append(THREE, tg, TB, C);
    return g;
  }

  /* =========================================================== BA-64B */
  /* stations (published 3.66 x 1.74 x 1.9 m; the rest from B1-B3's proportions, NOT CONFIRMED):
     axles +-1.05 (2.10 m wheelbase), tyres r 0.38 on a 1.45 m track; the hull from the louvred nose
     plate at x 1.80 (the published 3.66 m over the spare wheel) to the rear plate at -1.62, the spare wheel on it to -1.86; the belly 0.50, the
     waist (where the lower plates leaning out meet the upper plates leaning in) 1.02 m up at 0.80 half
     width, the roof 1.50 at 0.50; the turret ring at x -0.30 on the roof, the turret 0.40 tall. */
  var BA = { P: { base: "#4a5534", blots: ["#414b2e", "#55603d"], seed: 64 },
             XA: [1.05, -1.05], R: 0.38, TY: 0.725, NOSE: 1.80, REAR: -1.62, BEL: 0.50, WZ: 1.02, WH: 0.80,
             RZ: 1.50, RH: 0.50, TX: -0.30 };
  function baHull(B) {
    var s, i, x;
    /* the hull as a loft of cross-sections from the nose to the tail (B1, B2): each section is the belly,
       the waist and the roof line; the bonnet slopes from the nose plate's top up to the driver's plate */
    function sec(x, zb, wb, zw, ww, zt, wt) { return [[x, -wb, zb], [x, wb, zb], [x, ww, zw], [x, wt, zt], [x, -wt, zt], [x, -ww, zw]]; }
    loftN(B.paint, [
      sec(BA.NOSE, BA.BEL + 0.08, 0.50, 0.80, 0.62, 0.86, 0.46),
      sec(1.40, BA.BEL, 0.58, 0.98, 0.76, 1.02, 0.56),
      sec(0.75, BA.BEL, 0.62, BA.WZ, BA.WH, 1.22, 0.62),
      sec(0.45, BA.BEL, 0.62, BA.WZ, BA.WH, BA.RZ, BA.RH),
      sec(-0.90, BA.BEL, 0.62, BA.WZ, BA.WH, BA.RZ, BA.RH),
      sec(-1.40, BA.BEL + 0.04, 0.60, 0.98, 0.74, 1.40, 0.46),
      sec(BA.REAR, BA.BEL + 0.10, 0.52, 0.94, 0.62, 1.30, 0.40)]);
    /* the driver's plate between the bonnet and the roof, with the visor hinged up (B1, B2) */
    var vu = unit([0.30, 0, 0.95]);
    slab(B.paint, [0.70, 0, 1.36], [vu[2], 0, -vu[0]], [0, 1, 0], vu, 0.015, 0.22, 0.12);
    box(B.dark, 0.69, 0.71, -0.18, 0.18, 1.32, 1.42);
    slab(B.paint, [0.62, 0, 1.56], unit([1, 0, 0.35]), [0, 1, 0], unit([-0.35, 0, 1]), 0.20, 0.23, 0.015);
    /* the bonnet's grille slots and the louvred nose plate (B2) */
    for (i = 0; i < 4; i++) box(B.dark, 1.10, 1.30, -0.30 + i * 0.03 - 0.005, -0.30 + i * 0.03 + 0.005, 1.00, 1.02);
    for (i = 0; i < 5; i++) box(B.dark, BA.NOSE - 0.005, BA.NOSE + 0.01, -0.42, 0.42, BA.BEL + 0.14 + i * 0.05, BA.BEL + 0.155 + i * 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* the round vision port on the upper side plate (B1) */
      cyl(B.dark, [0.10, s * 0.66, 1.26], [0.10, s * 0.71, 1.24], 0.07, 0.07, 10);
      /* front mudguards: flat tops at the waist, angled fronts (B1, B2) */
      var y0 = s > 0 ? 0.62 : -0.88, y1 = s > 0 ? 0.88 : -0.62;
      belt(B.paint, 0.62, 0.80, 1.45, 0.80, y0, y1, 0.035);
      belt(B.paint, 1.45, 0.80, 1.62, 0.62, y0, y1, 0.035);
      box(B.paint, 0.62, 0.66, s > 0 ? 0.62 : -0.88, s > 0 ? 0.88 : -0.62, 0.40, 0.82);
      /* the headlamp in its wire guard on the front mudguard (B1, B2) */
      cylX(B.paint, 1.18, 1.32, s * 0.74, 0.96, 0.08, 0.09, 12);
      cylX(B.glass, 1.32, 1.335, s * 0.74, 0.96, 0.075, 0.075, 12);
      box(B.dark, 1.20, 1.36, s * 0.74 - 0.10, s * 0.74 - 0.085, 0.82, 1.06);
      box(B.dark, 1.20, 1.36, s * 0.74 + 0.085, s * 0.74 + 0.10, 0.82, 1.06);
      /* rear mudguards: flared, sloped front and back (B1, B2) */
      y0 = s > 0 ? 0.62 : -0.90; y1 = s > 0 ? 0.90 : -0.62;
      belt(B.paint, -1.50, 0.84, -0.60, 0.84, y0, y1, 0.035);
      belt(B.paint, -0.60, 0.84, -0.48, 0.56, y0, y1, 0.035);
      belt(B.paint, -1.50, 0.84, -1.66, 0.56, y0, y1, 0.035);
      /* the chassis rails and the axle housings under the belly */
      box(B.dark, -1.55, 1.60, s * 0.38, s * 0.46, 0.40, 0.50);
      cylY(B.dark, BA.XA[0], s * 0.10, s * 0.62, BA.R, 0.06, 8);
      cylY(B.dark, BA.XA[1], s * 0.10, s * 0.62, BA.R, 0.06, 8);
    }
    cylY(B.dark, BA.XA[0], -0.12, 0.12, BA.R, 0.10, 10);
    cylY(B.dark, BA.XA[1], -0.12, 0.12, BA.R, 0.10, 10);
    /* the exhaust under the right side (B1) */
    cyl(B.dark, [0.30, -0.66, 0.50], [-0.40, -0.66, 0.46], 0.05, 0.05, 8);
    /* the spare wheel on the rear plate (B1, B2) */
    cyl(B.dark, [BA.REAR - 0.03, 0, 0.98], [BA.REAR - 0.21, 0, 0.98], 0.37, 0.37, 18);
    cyl(B.paint, [BA.REAR - 0.21, 0, 0.98], [BA.REAR - 0.23, 0, 0.98], 0.18, 0.18, 14);
    /* the team strip on the bonnet */
    box(B.team, 0.95, 1.25, -0.20, 0.20, 1.045, 1.06);
  }
  var BAT = [[0.48, -0.20], [0.48, 0.20], [0.20, 0.48], [-0.20, 0.48], [-0.48, 0.20], [-0.48, -0.20], [-0.20, -0.48], [0.20, -0.48]];
  function baTurret(B) {
    /* the open eight-sided turret: walls leaning in, open top; the DT on its pintle to the right (B1-B3) */
    var i, a, b, H = 0.40, K = 0.74;
    for (i = 0; i < BAT.length; i++) {
      a = BAT[i]; b = BAT[(i + 1) % BAT.length];
      var P = [[a[0], a[1], 0], [b[0], b[1], 0], [b[0] * K, b[1] * K, H], [a[0] * K, a[1] * K, H]];
      var c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.sqrt(c[0] * c[0] + c[1] * c[1]), nx = c[0] / l * 0.012, ny = c[1] / l * 0.012;
      hexa(B.paint, [[P[0][0] - nx, P[0][1] - ny, 0], [P[1][0] - nx, P[1][1] - ny, 0], [P[1][0] + nx, P[1][1] + ny, 0], [P[0][0] + nx, P[0][1] + ny, 0],
                     [P[3][0] - nx, P[3][1] - ny, H], [P[2][0] - nx, P[2][1] - ny, H], [P[2][0] + nx, P[2][1] + ny, H], [P[3][0] + nx, P[3][1] + ny, H]]);
    }
    /* vision slits on the front faces */
    box(B.dark, 0.40, 0.43, -0.10, 0.10, 0.22, 0.25);
    /* the DT: pintle, drum magazine, barrel with its cooling-hole jacket, raised at 15 degrees */
    var px = 0.28, py = -0.18;
    cylZ(B.dark, px, py, 0.0, 0.42, 0.025, 8);
    var e = 15 * Math.PI / 180, d = [Math.cos(e), 0, Math.sin(e)];
    box(B.dark, px - 0.30, px + 0.10, py - 0.04, py + 0.04, 0.40, 0.48);
    cylZ(B.dark, px - 0.05, py, 0.48, 0.52, 0.12, 12);
    cyl(B.dark, [px + 0.10, py, 0.44], [px + 0.10 + d[0] * 0.40, py, 0.44 + d[2] * 0.40], 0.03, 0.03, 8);
    cyl(B.dark, [px + 0.10 + d[0] * 0.40, py, 0.44 + d[2] * 0.40], [px + 0.10 + d[0] * 0.62, py, 0.44 + d[2] * 0.62], 0.012, 0.012, 6);
  }
  function baWheel(W) {
    var TYRE = [0.12, 0.12, 0.11], RIM = rgb(BA.P.base, 0.7), HUB = [0.15, 0.15, 0.14], s, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * BA.TY;
      W.col = TYRE; cylY(W, 0, y - 0.09, y + 0.09, 0, BA.R, 20);
      W.col = RIM; cylY(W, 0, y + s * 0.09, y + s * 0.10, 0, 0.22, 16);
      W.col = HUB; cylY(W, 0, y + s * 0.10, y + s * 0.13, 0, 0.07, 10);
    }
  }
  function ba64(THREE, M, C) {
    var T = materials(THREE, C, BA.P), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, W;
    baHull(HB);
    flush(THREE, g, HB);
    for (i = 0; i < BA.XA.length; i++) {
      W = new Bin(T.wheel, false, true); baWheel(W);
      wg = group(THREE, "roadwheel", BA.XA[i], 0, BA.R); flush(THREE, wg, { wheel: W }); g.add(wg);
    }
    baTurret(TB);
    wg = group(THREE, "turret", BA.TX, 0, BA.RZ); flush(THREE, wg, TB); g.add(wg);
    return g;
  }

  return { sherman: sherman, m41d: m41d, ba64: ba64 };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of each build (tools/model3d/dump.js). */
UNIT_MODELS["roc_e50_mbt"] = { len: 7.16, build: HeroRocKpaGround2.sherman };
if (typeof HeroM41 !== "undefined") UNIT_MODELS["roc_e00_lighttank"] = { len: 8.19, build: HeroRocKpaGround2.m41d };
UNIT_MODELS["kpa_e50_recon"] = { len: 3.66, build: HeroRocKpaGround2.ba64 };
/* held, rule 1 (see the header):
   roc_e00_spaag  - Antelope: photographed only on the truck, never on the HMMWV the row names.
   kpa_e80_spaag, kpa_e00_spaag, kpa_e90_spaag, kpa_e90_recon, kpa_e00_recon - no reference found.
   kpa_e00_ifv    - M2010: one uncaptioned parade view of an 8x8, not tied to the row. */
