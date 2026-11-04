/* ============ pla_retry.js - HERO models: held PLA rows retried with Wikipedia's own images ============
   Keys registered here (rules.js rows):
     lt_c      "ZTQ-15 Light Tank"        - buildZtq15
     awacs_c   "Shaanxi KJ-500 AEW&C"     - buildKj500 (the Y-9 airframe, built new: see below)
   Still HELD (generic models stay), each with its reason and the searches tried at the foot of the file:
     atgmv_c (AFT-10), pla_e60_sam (HQ-2 self-propelled), pla_e90_tel (DF-15 / M-9), pla_e80_lst (Type 072 Yukan),
     ewv_c (CHL-906), radarv_c (SLC-2).
   Self-contained: calls no other hero module.  js/hero/pla_y8g.js (the Y-8G) was NOT called for the KJ-500: it
   exports one merged build with the Y-8G's cheek fairings, fin-top pod, four-blade props and 34 m fuselage baked
   in, none of which the KJ-500 has (policy 5: reuse only where honest).  Its header's D1 measurements of the Y-8
   wing and plan (the Y-9 keeps the Y-8 wing: the same published 121.9 m2) are used as data, cited below.
   Network note: zh.wikipedia.org (and de/ja) are refused by this machine's proxy (HTTP 403 at CONNECT), so the
   Chinese Wikipedia could not be searched; en.wikipedia and ru.wikipedia were.

   ------------------------------------------------------------------------------------------- ZTQ-15 (lt_c)
   References (Wikimedia Commons files, cached in scratchpad/q_plagm_ref):
     Z1  "Type 15 tank 20221020.jpg" (the photograph en.wikipedia "Type 15 tank" uses) - Beijing, head-on from a
         little left and above: the flat glacis with the driver's periscope block, the lamp clusters in the
         fenders' front corners, the turret's cheek modules swept back from beside the mantlet, the mantlet, the
         thick-sleeved 105 mm with its bore evacuator, the gunner's sight box beside the mantlet, the tall remote
         weapon station on the port roof.
     Z2  the video still in Commons Category:Type 15 tank (China News Service, 1360 x 768; its title is not
         ASCII) - port side from the front left, a little above, on the move: THE MEASURING PHOTO.  Six small road
         wheels, the raised idler at the FRONT and the sprocket at the REAR, no skirts (the side plate ends just
         above the wheel tops), the long shallow glacis, the flat deck, the turret with its steeply raked front,
         the tall block on the roof, the stowage box at the end of the bustle, the drum across the rear deck, two
         whips.
     Z3  "VT-5 light tank of Bangladesh Army.jpg" (the export VT-5, the other photograph en.wikipedia uses) -
         head-on: the fender lamp grilles, the tow cable across the nose, the towing eyes, the turret's flat cheek
         faces, the hatches.  Width ratios only (low camera).
   Published: ru.wikipedia "Tip 15 (tank)" (Cyrillic title; the Type 15 article), infobox: length 7500 mm, with
     the gun 9200 mm, width 3300 mm, height 2500 mm.  en.wikipedia "Type 15 tank": the infobox length, width and
     height are blank; 105 mm rifled gun.
   MEASURED off Z2.  Z2 is an oblique view, so a 1-D projective map x_img = (a u + b) / (c u + 1) was fitted to
     the six road-wheel centres (image x 477, 537, 597, 650, 693, 737, taken as evenly pitched u = 0..5; residuals
     under 2.5 px): a 94.52, b 475.94, c 0.0575.  It puts the nose (x 345) at u -1.753 and the rear plate (x 812) at
     u 7.020: the hull is 8.77 pitches, so the published 7.50 m makes the pitch 0.855 m.  Through the same map: the
     idler 0.19 m aft of the nose, the sprocket 6.80 m, the turret's lower front 1.36 m, the roof's front edge
     2.25 m, the tall roof block 3.27 m, the bustle box's end 5.63 m, the rear drum 6.20 to 7.82 m.  The wheels
     read 0.92 of their width-to-height (the view is about 24 deg off the beam): the true horizontal scale at the
     first wheel is 86 px/m, used for heights (scaled by the map's depth factor along the hull): deck 1.22 m, side
     plate's lower edge 0.57-0.60 m, road wheels 0.50 m across (38 px), turret roof 1.85-1.87 m, the roof block's
     top 2.59-2.66 m.
   Size: drawn 9.55 x 3.32 m: the hull 7.50 m nose to rear plate (the published length), the muzzle 9.20 m from
     the rear plate (the published length with the gun, used for the barrel, which Z2 shows elevated and
     foreshortened), the rear drum 0.35 m beyond the plate (Z2).  Width 3.30 m over the fenders (published), 3.32 m
     at the lamp boxes.  HEIGHT, not fitted: turret roof 1.87 m and the roof block 2.59 m, against the published
     2.50 m; the published figure is likely to the sights (2.59 m here); the oblique, low-resolution still may
     also read the roof low.  Aerial tips 3.51 m.
   Recognition list:
     1. long low hull, flat deck, long shallow glacis, plain side plate with no skirts - Z2: ztqHull
     2. six small road wheels, front idler, rear sprocket - Z2: XW, ztqRunning
     3. wedge cheek modules swept back beside the mantlet, steeply raked turret front - Z1, Z2: ztqTurret
     4. the long 105 mm with its thick sleeve and bore evacuator - Z1, Z3
     5. the tall weapon station on the port roof, the sight box to starboard - Z1, Z2
     6. the long bustle with its end box; the drum across the rear deck - Z2
   Paint: PLA green #525c3a, plain (Z1 and Z2 wear digital and disruptive camouflage: not drawn; no stars or
   numbers).  Team colour (C.team): a strip each side of the engine deck and on each turret side.
   NOT CONFIRMED: the turret's plan (half-widths 1.06 m body, 1.15 m over the cheeks, from Z1/Z3 ratios); every
     height (no side drawing: one oblique video still); the track width (0.46 m) and centres (1.42 m); the belly
     (0.42 m); the cheek wedge's exact shape; the roof block's form (drawn as the weapon station of Z1 on a
     pedestal); the engine-deck grilles (not visible in Z2; drawn as six plain slats); the rear drum's diameter
     (0.48 m) and its fixing; the hatches; the gun length (from the published overall length, not measured).
   Materials: paint (canvas texture), dark, glass, wheel (vertex colours), team.  Nodes: "turret" (origin on the
   ring centre at x 0.55 on the deck, gun along +X), six "roadwheel" groups (both sides in each).
   Triangles 10,432; 14 draw calls.

   ------------------------------------------------------------------------------------------- KJ-500 (awacs_c)
   References (Wikimedia Commons files that en.wikipedia "Shaanxi KJ-500" and "Shaanxi Y-9" use; cached in
   scratchpad/q_plaretry_ref):
     K1  "PLANAF KJ-500 - 1.jpg" (Japan MoD; en.wikipedia "Shaanxi KJ-500", captioned KJ-500H) at 1920 px -
         broadside from a little above, nose right: THE MEASURING PHOTO.  The aircraft is 5.2 deg nose-up in the
         frame (the roof at s 4.3 and s 22, within 0.2 m of level on the Y-8's D1, sits 30 px apart in 365): levelled by
         that angle (x2), then about 1480 px from the radome tip to the tail cone's tip = the published 36.065 m:
         41.15 px/m (+-0.5 %).  Every station below is read off
         it: the fuselage roof and belly row by row (a sky mask, column by column), the dish and pylon, the fin,
         fillet and fin-top fairing, the endplates and ventral strakes, the pod on the aft side, the gear
         sponsons, the roof aerials, the windows, the spinners (10.2 m aft for the inner pair).  The fuselage
         depth reads 3.99 m at s 7 (the Y-8's D1 4.0 m: the scale checks).
     K2  "KJ-500 (cropped).jpg" (en.wikipedia infobox) - starboard front 3/4, gear down: the dish on its slab
         pylon, its dark lower half, the dark nose cap, the six-blade props, the endplate fins at the tailplane
         tips (dark tipped), the two ventral strakes raked down and out under the tail, the long pod on the aft
         side, the row of blade aerials, the flight-deck windows.
     K3  "Shaanxi Y-9 2021 cropped.jpg" (en.wikipedia "Shaanxi Y-9" infobox) - the Y-9 landing: two tandem
         main-gear pairs a side in sponsons, the nose gear, the high wing and deep nacelles.
   Published (en.wikipedia "Shaanxi Y-9"): length 36.065 m, span 38 m, height 11.3 m, wing area 121.9 m2, four
     WJ-6C turboprops, six-bladed JL-4 composite propellers.  en.wikipedia "Shaanxi KJ-500": developed from the
     Y-9; no dimensions.
   From js/hero/pla_y8g.js's header (D1, the Commons Y-8 two-view, measured there): the wing (LE 12.7 m aft of
     the Y-8's nose at the root to 15.3 m at the tip, TE straight at 17.0 m, 19 m semi-span; here moved 0.7 m aft,
     the shift K1's inner spinner shows), the nacelles 4.7 and 9.57 m out, the fuselage's plan widths, the
     tailplane's 12.8 m span, the An-12/Y-8 gear arrangement and tyre sizes.
   Size: 36.02 x 38.00 x 11.91 m (ground to the fin-top fairing, gear down).  Published 36.065 x 38 x 11.3 m.  The
     height is NOT fitted: the fin top is read off K1 (9.53 m over the levelled reference line, 9.76 m to the top
     of the fairing), and the gear height under the belly is the Y-8's (0.9 m, not seen on a Y-9): the 0.6 m over
     the published figure is that guess, the 10 deg view from above in K1, or both.
   Recognition list:
     1. the dish on the tall slab pylon over the wing's trailing edge, dark below - K1, K2: kjDish
     2. high straight wing, four deep nacelles, six-blade props - K1, K2, K3: kjWing, kjNacelles
     3. the long Y-9 fuselage with the upswept rear and the dark nose cap - K1: KFUS, kjFuselage
     4. the tall fin with its long dorsal fillet and the fin-top fairing - K1: kjTail
     5. the endplate fins at the tailplane tips and the two ventral strakes - K1, K2: kjTail
     6. gear sponsons, the long pod on the aft side, the roof aerials - K1, K2: kjDetails
   Paint: light grey #c3c8cb, the dish's lower half and the nose cap dark grey (K1, K2).  No stars, bars or
   numbers (K1 and K2 carry them), no wavy two-tone belly (K2).  Team colour: a strip on each wing tip's upper skin.
   NOT CONFIRMED: the fuselage's plan widths (the Y-8's, no Y-9 plan); the wing's planform and its height on the
     roof (the Y-8's, shifted); dihedral (drawn flat, no front view); the nacelle hubs 0.8 m under the wing's mean
     line and the nacelles' shapes; the propeller diameter 4.5 m (K1's blade tips, 92 px); the tailplane planform
     and height; the endplate and strake outlines; the dish's thickness (K1's rim ellipse, from above); the pylon's
     thickness (0.6 m); the gear stations, track and the ground line (the Y-8's figures, see Size); the far-side
     pod (K1, K2 show the starboard one only).
   Materials: paint (light grey canvas texture), dark, glass, team, blur (prop discs); the "gear" group (dark,
   tyre).  Triangles 10,096; 8 draw calls.
   Model space: +X nose, +Y port, +Z up, metres; x 0 at mid-length; z 0 is the K1 reference line, 2.15 m above
   the ground with the gear down; the gear is the group "gear".

   Model space (lt_c): +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.
   ========================================================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaRetry = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
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

  /* ----------------------------------------------------------- materials */

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, PAINT) {
    if (_tex[PAINT.seed] !== undefined) return _tex[PAINT.seed];
    _tex[PAINT.seed] = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      _tex[PAINT.seed] = t;
    } catch (e) { _tex[PAINT.seed] = null; }
    return _tex[PAINT.seed];
  }
  function materials(THREE, C, PAINT) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: PAINT.rough, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.15, metalness: 0.5 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
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

  /* ======================================================================== ZTQ-15 light tank (lt_c)
     Stations (x, m) measured off Z2 through the 1-D projective fit set out in the header; heights off Z2's
     column at the turret sight and the front road wheel (vertical scale = the true horizontal scale there). */
  var TK = {
    NOSE: 3.75, REAR: -3.75, BELLY: 0.42, SP: 0.60, DECK: 1.22, GL: 2.85, NZ: 1.00,
    TY: 1.42, TW: 0.23, HW: 1.65, LW: 1.12,
    XW: [2.25, 1.395, 0.54, -0.315, -1.17, -2.025], ZW: 0.31, RW: 0.25,
    IDL: { x: 3.42, z: 0.50, r: 0.24 }, SPR: { x: -3.05, z: 0.52, r: 0.28 },
    TX: 0.55, TR: 0.65, MUZ: 5.45
  };
  var TPAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 1515, rough: 0.9 };

  function ztqHull(B) {
    var F = TK, s, i;
    /* the lower hull between the tracks: belly, the lower nose plate leaning back, the rear plate (Z2) */
    prismY(B.paint, [[F.REAR, 0.72], [F.REAR + 0.30, F.BELLY], [F.NOSE - 0.45, F.BELLY], [F.NOSE, F.NZ - 0.06],
                     [F.NOSE, F.SP], [F.REAR, F.SP]], -F.LW, F.LW);
    /* the upper hull to the full width over the tracks: the side plate coming down to just above the wheel tops
       (Z2: no skirts, the wheels in full view); the long shallow glacis from the nose to x 2.85 (Z2); the flat
       deck; the vertical rear plate */
    function sec(x, top, nose) {
      var w = F.HW - (nose ? 0.04 : 0);
      return [[x, -w, F.SP], [x, w, F.SP], [x, w, top], [x, -w, top]];
    }
    loftN(B.paint, [sec(F.REAR, F.DECK - 0.03), sec(F.REAR + 0.04, F.DECK), sec(F.GL, F.DECK), sec(F.NOSE - 0.04, F.NZ, true),
                    sec(F.NOSE, F.NZ - 0.04, true)]);
    /* the edge line of the deck (Z2's light strip along the side top) */
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, F.HW, 0.012, F.REAR + 0.05, F.GL, F.DECK - 0.07, F.DECK - 0.05);
      /* the headlamp clusters in the front corners of the fenders (Z1, Z3), their dark faces */
      box(B.paint, F.NOSE - 0.32, F.NOSE - 0.02, s * 1.18 - 0.20, s * 1.18 + 0.20, F.NZ - 0.04, F.NZ + 0.12);
      box(B.dark, F.NOSE - 0.02, F.NOSE + 0.005, s * 1.18 - 0.17, s * 1.18 + 0.17, F.NZ - 0.01, F.NZ + 0.09);
      /* the mudguard turned down over the idler (Z2, Z3) */
      belt(B.paint, F.NOSE - 0.30, F.SP, F.NOSE + 0.02, F.SP + 0.10, s > 0 ? F.TY - F.TW : -F.TY - F.TW, s > 0 ? F.TY + F.TW : -F.TY + F.TW, 0.03);
      /* the towing eyes low on the nose plate (Z3) */
      box(B.dark, F.NOSE - 0.30, F.NOSE + 0.05, s * 0.70 - 0.06, s * 0.70 + 0.06, 0.62, 0.74);
      /* the tow cable along the nose (Z3: the loop across the front) */
      cyl(B.dark, [F.NOSE + 0.02, s * 0.20, 0.82], [F.NOSE + 0.02, s * 0.62, 0.86], 0.02, 0.02, 6);
    }
    /* driver's hatch on the glacis (Z1, Z3: the periscope block ahead of the turret, centre) */
    box(B.paint, 2.95, 3.25, -0.25, 0.25, 0, 0.001);
    var gz = function (x) { return F.DECK - (x - F.GL) * (F.DECK - F.NZ) / (F.NOSE - F.GL); };
    box(B.paint, 2.70, 3.05, -0.30, 0.30, gz(3.05) - 0.02, gz(2.70) + 0.07);
    box(B.glass, 3.04, 3.06, -0.24, 0.24, gz(3.05) + 0.02, gz(3.05) + 0.06);
    /* the engine deck: louvred grilles behind the turret (NOT CONFIRMED, see the header), the rear drum */
    for (i = 0; i < 6; i++) box(B.dark, -2.95 + i * 0.16, -2.88 + i * 0.16, -1.05, 1.05, F.DECK, F.DECK + 0.02);
    cyl(B.paint, [-3.86, -0.80, 1.56], [-3.86, 0.80, 1.56], 0.24, 0.24, 16);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.dark, [-3.86, s * 0.80, 1.56], [-3.86, s * 0.83, 1.56], 0.20, 0.20, 14);
      box(B.dark, -3.80, -3.70, s * 0.55 - 0.04, s * 0.55 + 0.04, 1.20, 1.50);
    }
    /* rear plate: tail lamps (Z2 shows the plate edge only) */
    for (s = -1; s <= 1; s += 2) box(B.dark, F.REAR - 0.04, F.REAR, s * 1.30 - 0.08, s * 1.30 + 0.08, 1.02, 1.12);
    /* team colour: a strip each side of the engine deck */
    for (s = -1; s <= 1; s += 2) box(B.team, -3.40, -2.10, s * 1.30 - 0.10, s * 1.30 + 0.10, F.DECK, F.DECK + 0.015);
  }
  function sideBox(bin, s, y, t, x0, x1, z0, z1) { box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1); }

  function ztqRunning(B) {
    var F = TK, C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < F.XW.length; i++) C.push([F.XW[i], F.ZW, F.RW + 0.06]);
    C.push([F.IDL.x, F.IDL.z, F.IDL.r + 0.06], [F.SPR.x, F.SPR.z, F.SPR.r + 0.06]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.17); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * F.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - F.TW, y + F.TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the rubber-padded shoe's grouser and the centre guide horn (Z2: the horns along the front run) */
        belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - F.TW - 0.01, y + F.TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the toothed drive sprocket at the REAR (Z2: the raised wheel behind the sixth road wheel) */
      cylY(B.dark, F.SPR.x, y - 0.12, y + 0.12, F.SPR.z, F.SPR.r - 0.05, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [F.SPR.x + ca * (F.SPR.r - 0.02), y, F.SPR.z + sa * (F.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, F.SPR.x, y + s * 0.12, y + s * 0.17, F.SPR.z, 0.14, 14);
      /* the idler at the front (Z2) */
      cylY(B.paint, F.IDL.x, y - 0.17, y + 0.17, F.IDL.z, F.IDL.r, 18);
      cylY(B.dark, F.IDL.x, y + s * 0.17, y + s * 0.21, F.IDL.z, 0.07, 10);
    }
  }
  /* road wheel (Z2: small, dished, a dark rubber tyre; the pair per station at the track centre) */
  function ztqWheel(W) {
    var F = TK, s, y, i, a, c = TPAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var TYRE = [0.13, 0.135, 0.125], BODY = [rr * 1.1, gg * 1.1, bb * 1.1], HOLE = [0.17, 0.18, 0.15], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * F.TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.18, y + 0.18, 0, F.RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.18, 0], [0, y + s * 0.21, 0], F.RW - 0.045, 0.09, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.135, y + s * 0.198, Math.sin(a) * 0.135], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.04, 0.010, 0.035);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.20, y + s * 0.23, 0, 0.07, 10);
    }
  }

  /* the turret, in the "turret" group's frame: origin on the ring centre at deck height, gun along +X.
     Plan (Z1, Z3): the cheek modules sweep back from beside the mantlet to the full width; slab sides; the long
     bustle with the stowage box at its end.  Side (Z2): the front of the cheeks raked steeply, the roof from local
     x 0.95 back. */
  function ztqTurret(B) {
    var F = TK, R = F.TR, s, i, x;
    var P = function (x, hw, z0, z1) { return [[x, -hw, z0], [x, hw, z0], [x, hw, z1], [x, -hw, z1]]; };
    /* the main body and bustle */
    loftN(B.paint, [P(-2.05, 0.92, 0.02, R - 0.04), P(-1.95, 0.98, 0.0, R), P(-0.90, 1.06, 0.0, R), P(0.80, 1.06, 0.0, R),
                    P(0.95, 0.98, 0.0, R)]);
    /* the cheek modules: a wedge each side of the mantlet, raked in side view from the roof's front edge down to
       the lower front corner at local x 1.84 (Z2), swept in plan from 0.40 beside the mantlet to 1.15 (Z1, Z3) */
    for (s = -1; s <= 1; s += 2) {
      var yi = s * 0.36, yo = s * 1.15;
      var V = [[0.70, yi, 0.02], [1.84, yi, 0.02], [1.84, s * 0.62, 0.02], [0.70, yo, 0.02],
               [0.70, yi, R + 0.02], [0.98, yi, R + 0.02], [0.98, s * 0.62, R + 0.02], [0.70, yo, R + 0.02]];
      hexa(B.paint, V);
    }
    /* the mantlet and the gun (published 105 mm; the muzzle 9.2 m from the tail with the gun forward) */
    box(B.paint, 0.80, 1.62, -0.36, 0.36, 0.10, 0.62);
    box(B.dark, 1.62, 1.66, -0.30, 0.30, 0.16, 0.56);
    var Lm = F.MUZ - F.TX;
    cyl(B.paint, [1.60, 0, 0.38], [2.40, 0, 0.38], 0.12, 0.11, 14);
    cyl(B.paint, [2.40, 0, 0.38], [Lm - 0.20, 0, 0.38], 0.085, 0.078, 14);
    cyl(B.paint, [2.95, 0, 0.38], [3.50, 0, 0.38], 0.115, 0.115, 14);          /* bore evacuator (Z1, Z3) */
    for (x = 2.0; x < Lm - 0.6; x += 0.80) cyl(B.dark, [x, 0, 0.38], [x + 0.03, 0, 0.38], 0.10, 0.10, 12);   /* sleeve bands */
    cyl(B.paint, [Lm - 0.20, 0, 0.38], [Lm, 0, 0.38], 0.088, 0.088, 14);
    cyl(B.dark, [Lm, 0, 0.38], [Lm + 0.005, 0, 0.38], 0.05, 0.05, 10);
    /* the gunner's sight box on the starboard roof front (Z1: the box beside the mantlet) */
    box(B.paint, 0.55, 0.92, -0.70, -0.42, R, R + 0.22);
    box(B.glass, 0.92, 0.93, -0.66, -0.46, R + 0.06, R + 0.18);
    /* the remote weapon station / commander's sight on the port roof (Z1: the tall mount; Z2: the tall dark block
       over the turret middle, its top 2.66 m off the ground) */
    cylZ(B.paint, -0.10, 0.50, R, R + 0.26, 0.20, 14);
    box(B.paint, -0.32, 0.18, 0.30, 0.70, R + 0.26, R + 0.72);
    box(B.glass, 0.18, 0.19, 0.38, 0.62, R + 0.48, R + 0.66);
    cyl(B.dark, [0.10, 0.36, R + 0.40], [1.05, 0.36, R + 0.40], 0.025, 0.025, 8);
    box(B.dark, -0.30, 0.10, 0.18, 0.30, R + 0.30, R + 0.46);
    /* hatches: the loader's to starboard rear (Z1) */
    cylZ(B.paint, -0.55, -0.45, R, R + 0.05, 0.28, 16);
    cylZ(B.dark, -0.55, -0.45, R + 0.05, R + 0.065, 0.22, 14);
    /* the bustle stowage box (Z2: the dark-edged box at the turret's end) and its rails */
    box(B.paint, -2.40, -2.03, -0.90, 0.90, 0.10, R - 0.08);
    for (s = -1; s <= 1; s += 2) box(B.dark, -2.40, -0.95, s * 1.07 - 0.015, s * 1.07 + 0.015, R - 0.12, R - 0.08);
    /* aerial bases at the rear corners (Z2: two whips) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, -1.75, s * 0.75, R, R + 0.10, 0.04, 8);
      cylZ(B.dark, -1.75, s * 0.75, R + 0.10, R + 1.60, 0.008, 5);
    }
    /* team colour: a strip down each turret side */
    for (s = -1; s <= 1; s += 2) sideBox(B.team, s, 1.06, 0.012, -1.70, -0.90, R - 0.22, R - 0.14);
  }
  function buildZtq15(THREE, M, C) {
    var F = TK, T = materials(THREE, C, TPAINT), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    ztqHull(HB);
    ztqRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < F.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      ztqWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(F.XW[i], 0, F.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    ztqTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(F.TX, 0, F.DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    g.name = "lt_c";
    return g;
  }

  /* ======================================================================== KJ-500 on the Y-9 (awacs_c)
     s = metres aft of the nose tip, h = metres above the photograph's reference line (K1 levelled, row 420 at
     41.15 px/m); model x = 18.03 - s (x 0 at mid-length), z = h.  The ground is at z = -2.15 (gear: see header). */
  var KJ = { L: 36.065, XM: 18.0325, ZG: -2.15 };
  function kx(s) { return KJ.XM - s; }
  var KPAINT = { base: "#c3c8cb", blots: ["#bcc1c5", "#c9ced1"], seed: 500, rough: 0.7 };
  /* fuselage rows off K1 (levelled): s, roof h, belly h.  Rows 7 to 19.5 are the parallel section (the roof under the
     nacelles and the dish pylon read where the sky shows; the belly between the gear sponsons) */
  var KFUS = [
    [0.00, -0.25, -0.25], [0.12, 0.10, -0.62], [0.30, 0.40, -0.88], [0.60, 0.66, -1.02], [0.90, 0.85, -1.08],
    [1.50, 1.17, -1.12], [2.11, 1.45, -1.12], [2.72, 2.10, -1.12], [3.33, 2.40, -1.13], [3.94, 2.58, -1.13],
    [4.54, 2.66, -1.14], [5.76, 2.75, -1.18], [7.00, 2.77, -1.22], [19.5, 2.74, -1.25], [20.95, 2.74, -1.17],
    [21.56, 2.75, -1.07], [22.77, 2.77, -0.83], [23.99, 2.79, -0.66], [25.20, 2.82, -0.34], [26.42, 2.86, -0.07],
    [27.63, 2.90, 0.17], [28.85, 2.94, 0.56], [30.06, 2.98, 0.95], [31.28, 3.02, 1.35], [32.49, 3.05, 1.75],
    [33.70, 3.05, 2.15], [34.90, 3.00, 2.45], [35.60, 2.92, 2.62], [35.95, 2.84, 2.74], [36.065, 2.80, 2.80]
  ];
  /* half-widths: the Y-8 plan (D1 rows in js/hero/pla_y8g.js's header and FUS table), the parallel section 2.05 m,
     its aft taper stretched over the Y-9's longer tail (NOT CONFIRMED: no plan view of a Y-9) */
  var KHW = [[0.00, 0.08], [0.12, 0.34], [0.30, 0.52], [0.65, 0.66], [1.20, 0.88], [2.20, 1.26], [3.00, 1.56],
             [4.00, 1.80], [5.00, 1.93], [6.50, 2.02], [8.00, 2.05], [21.0, 2.05], [24.3, 2.00], [26.6, 1.90],
             [28.4, 1.76], [30.3, 1.55], [32.1, 1.30], [33.6, 1.06], [34.9, 0.80], [35.6, 0.52], [35.95, 0.28], [36.065, 0.06]];
  function lerpTab(T, s) {
    var i = 0, n = T.length, k, out = [];
    if (s <= T[0][0]) return T[0].slice(1);
    if (s >= T[n - 1][0]) return T[n - 1].slice(1);
    while (T[i + 1][0] < s) i++;
    var t = (s - T[i][0]) / (T[i + 1][0] - T[i][0]);
    for (k = 1; k < T[i].length; k++) out.push(T[i][k] + (T[i + 1][k] - T[i][k]) * t);
    return out;
  }
  /* one fuselage ring: a superellipse (exponent 0.86, js/hero/pla_y8g.js's) about the widest line at mid-depth */
  function kRing(s, n, grow) {
    var r = lerpTab(KFUS, s), hw = lerpTab(KHW, s)[0] + (grow || 0), top = r[0] + (grow || 0), bot = r[1] - (grow || 0);
    var hc = (top + bot) / 2, ext = (top - bot) / 2, P = [], i, a, sa, ca;
    for (i = 0; i < n; i++) {
      a = i / n * TAU; sa = Math.sin(a); ca = Math.cos(a);
      P.push([kx(s), hw * (sa < 0 ? -Math.pow(-sa, 0.86) : Math.pow(sa, 0.86)), hc + ext * (ca < 0 ? -Math.pow(-ca, 0.86) : Math.pow(ca, 0.86))]);
    }
    return P;
  }
  /* a smooth-shaded loft through rings (open ends closed with fans), normals averaged at shared vertices */
  function loftS(bin, L, capA, capB) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k, Nv = [], f, fn, q;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    var cen = function (R) { var c = [0, 0, 0]; R.forEach(function (p) { c[0] += p[0] / n; c[1] += p[1] / n; c[2] += p[2] / n; }); return c; };
    if (capA) { V.push(cen(L[0])); for (i = 0; i < n; i++) F.push([V.length - 1, (i + 1) % n, i]); }
    if (capB) { V.push(cen(L[m - 1])); for (i = 0; i < n; i++) F.push([V.length - 1, (m - 1) * n + i, (m - 1) * n + (i + 1) % n]); }
    /* orient: every face away from its ring pair's axis point */
    var vol = 0;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    if (vol < 0) for (i = 0; i < F.length; i++) { q = F[i][1]; F[i][1] = F[i][2]; F[i][2] = q; }
    for (i = 0; i < V.length; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; fn = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += fn[0]; Nv[f[k]][1] += fn[1]; Nv[f[k]][2] += fn[2]; }
    }
    for (i = 0; i < Nv.length; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      fn = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      if (dot(fn, fn) < 1e-14) continue;
      bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
    }
  }
  /* a symmetric section ring: LE at s0, chord c, thickness ratio t, mean line z (frame "w": span along y);
     frame "f": a vertical surface, thickness along y about yo, at height z (a fin section) */
  function foilT(u) { return 1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u; }
  function secW(s0, c, t, y, z, K) {
    var up = [], lo = [], j, u, h;
    for (j = 0; j <= K; j++) {
      u = 0.5 - 0.5 * Math.cos(j / K * Math.PI); h = Math.max(foilT(u) * t * c * 0.5, 0.004);
      up.push([kx(s0 + u * c), y, z + h]); lo.push([kx(s0 + u * c), y, z - h]);
    }
    return up.concat(lo.slice(1, K).reverse());
  }
  function secF(s0, c, t, yo, z, K) {
    var a = [], b = [], j, u, h;
    for (j = 0; j <= K; j++) {
      u = 0.5 - 0.5 * Math.cos(j / K * Math.PI); h = Math.max(foilT(u) * t * c * 0.5, 0.004);
      a.push([kx(s0 + u * c), yo + h, z]); b.push([kx(s0 + u * c), yo - h, z]);
    }
    return a.concat(b.slice(1, K).reverse());
  }

  /* --- the Y-9 airframe --- */
  var KW = { Z: 3.12, LE0: 13.4, LE1: 16.0, TE: 17.7, TIP: 19.0, FUS: 1.95 };
  function kjFuselage(B) {
    var R = [], s, st = [0, 0.04, 0.12, 0.22, 0.30, 0.45, 0.60, 0.90, 1.2, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5, 5.2, 6.0, 7.0, 10, 13, 16,
                         19.5, 20.95, 21.6, 22.8, 24.0, 25.2, 26.4, 27.6, 28.8, 30.0, 31.3, 32.5, 33.7, 34.5, 34.9, 35.3,
                         35.6, 35.8, 35.95, 36.02];
    st.forEach(function (q) { R.push(kRing(q, 28)); });
    loftS(B.paint, R, false, true);
    /* the dark radome cap on the nose (K1, K2: dark from the tip to about 1.0 m aft) */
    var Rr = [];
    [0, 0.04, 0.12, 0.22, 0.30, 0.45, 0.60, 0.80, 0.98].forEach(function (q) { Rr.push(kRing(q, 28, 0.012)); });
    loftS(B.dark, Rr, true, false);
  }
  function kjGlass(B) {
    /* the flight-deck windows (K1: the band 2.0-3.2 m aft, a little below the roof's start); four panes a side, the
       windscreen pair */
    var s, i, k, s0, s1;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) {
        s0 = 2.05 + i * 0.32; s1 = s0 + 0.26;
        var p = [], q;
        [[s0, 1.32], [s1, 1.32], [s1, 1.62 + 0.10 * i / 3], [s0 + 0.05, 1.62 + 0.10 * i / 3]].forEach(function (c) {
          var w = lerpTab(KHW, c[0])[0], rr = lerpTab(KFUS, c[0]), hc = (rr[0] + rr[1]) / 2, ext = (rr[0] - rr[1]) / 2;
          var ca = (c[1] - hc) / ext, sa = Math.sqrt(Math.max(0, 1 - ca * ca));
          q = [kx(c[0]), s * (w * Math.pow(sa, 0.86) + 0.012), c[1]]; p.push(q);
        });
        hexa(B.glass, [p[0], p[1], p[2], p[3], [p[0][0], p[0][1] - s * 0.02, p[0][2]], [p[1][0], p[1][1] - s * 0.02, p[1][2]],
                                       [p[2][0], p[2][1] - s * 0.02, p[2][2]], [p[3][0], p[3][1] - s * 0.02, p[3][2]]]);
      }
      /* three round cabin windows and the door outline (K1: s 8.4-9.6, mid-depth) */
      for (k = 0; k < 3; k++) cyl(B.dark, [kx(7.85 + k * 1.10), s * 2.03, 0.55], [kx(7.85 + k * 1.10), s * 2.07, 0.55], 0.14, 0.14, 12);
      box(B.dark, kx(9.95), kx(9.25), s > 0 ? 2.03 : -2.06, s > 0 ? 2.06 : -2.03, -0.35, 1.25);
    }
    /* the windscreen: two panes on the nose slope (K2) */
    for (s = -1; s <= 1; s += 2)
      slab(B.glass, [kx(1.98), s * 0.42, 1.52], unit([-0.55, 0, 1]), [0, 1, 0], unit([1, 0, 0.55]), 0.30, 0.34, 0.015);
  }
  function kjWing(B) {
    var W = KW, R = [], y, a, K = 14;
    /* the Y-8 wing (D1 via js/hero/pla_y8g.js: LE 12.7 m at the root to 15.3 m at the tip, TE straight at 17.0 m,
       19 m semi-span) moved 0.7 m aft to K1's nacelle and root stations; flat (no front view); thickness 18 % at the
       root to 14 % at the tip */
    for (a = -W.TIP; a <= W.TIP + 1e-6; a += W.TIP / 6) {
      y = a; var f = Math.abs(y) / W.TIP, le = W.LE0 + (W.LE1 - W.LE0) * f, c = W.TE - le;
      R.push(secW(le, c, 0.18 - 0.04 * f, y, W.Z, K));
    }
    loftS(B.paint, R, true, true);
    /* the wing-root fairing on the roof (K1: the swelling over the roof ahead of the dish pylon) */
    var Rf = [];
    [12.6, 13.2, 14.5, 16.5, 18.2, 19.3].forEach(function (q, i) {
      var h = [0.05, 0.35, 0.52, 0.52, 0.35, 0.05][i], w = [0.6, 1.2, 1.5, 1.5, 1.2, 0.6][i], P = [], j, t;
      for (j = 0; j < 12; j++) { t = j / 12 * TAU; P.push([kx(q), Math.cos(t) * w, 2.62 + h * (Math.sin(t) > 0 ? Math.sin(t) : 0.2 * Math.sin(t)) + 0.15]); }
      Rf.push(P);
    });
    loftS(B.paint, Rf, true, true);
    /* team colour: a strip on each wing's upper skin near the tip */
    for (var s = -1; s <= 1; s += 2) box(B.team, kx(17.3), kx(16.4), s * 15.5 - 0.6, s * 15.5 + 0.6, W.Z + 0.10, W.Z + 0.13);
  }
  /* the nacelles: 4.7 and 9.57 m out (D1), spinners 10.2 and 10.9 m aft (K1), hubs 0.8 m under the wing's mean line
     (NOT CONFIRMED), deep under the wing to the trailing edge; six-blade props 4.5 m across (K1, published six blades) */
  var KNAC = [[4.70, 10.2], [9.57, 10.9]];
  function kjNacelles(B, BL) {
    var s, k, y, s0, i, zh = KW.Z - 0.80;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      y = s * KNAC[k][0]; s0 = KNAC[k][1];
      var R = [];
      [[0, 0.30, 0.30, 0], [0.25, 0.46, 0.50, 0], [0.9, 0.58, 0.66, 0.05], [2.4, 0.60, 0.72, 0.12], [4.5, 0.58, 0.70, 0.18],
       [6.4, 0.46, 0.56, 0.30], [7.6, 0.25, 0.30, 0.42], [8.0, 0.06, 0.06, 0.50]].forEach(function (r) {
        var P = [], j, t;
        for (j = 0; j < 16; j++) { t = j / 16 * TAU; P.push([kx(s0 + r[0]), y + Math.sin(t) * r[1], zh + r[3] + Math.cos(t) * r[2]]); }
        R.push(P);
      });
      loftS(B.paint, R, true, true);
      /* the spinner and the six blades, and a faint disc */
      cyl(B.paint, [kx(s0 - 0.70), y, zh], [kx(s0 - 0.05), y, zh], 0.02, 0.30, 14);
      cyl(B.dark, [kx(s0 + 0.05), y, zh], [kx(s0 + 0.15), y, zh], 0.30, 0.30, 14);
      for (i = 0; i < 6; i++) {
        var a = (i + 0.25) / 6 * TAU, dy = Math.cos(a), dz = Math.sin(a);
        slab(BL.dark, [kx(s0 - 0.20), y + dy * 1.25, zh + dz * 1.25], [1, 0, 0], [0, dy, dz], [0, -dz, dy], 0.03, 1.0, 0.11);
      }
      cyl(BL.blur, [kx(s0 - 0.21), y, zh], [kx(s0 - 0.19), y, zh], 2.25, 2.25, 28);
    }
  }
  function kjTail(B) {
    var R = [], z, f;
    /* the fin: LE from s 29.94 at h 5.35 to s 31.76 at h 9.43, TE from s 34.31 at h 9.0 to s 34.92 at h 3.1 (K1); the
       root inside the tail cone at h 2.9 */
    var fin = function (h) {
      var t = (h - 2.9) / (9.43 - 2.9);
      var le = h < 5.35 ? 29.94 + (5.35 - h) * 0.4 : 29.94 + (h - 5.35) / (9.43 - 5.35) * (31.76 - 29.94);
      var te = 34.92 - (h - 3.1) / (9.0 - 3.1) * (34.92 - 34.31);
      return secF(le, te - le, 0.13 - 0.03 * t, 0, h, 12);
    };
    [2.9, 3.6, 4.5, 5.35, 6.5, 7.6, 8.6, 9.43].forEach(function (h) { R.push(fin(h)); });
    loftS(B.paint, R, false, true);
    /* the dorsal fillet from the roof at s 22.8 to the fin at h 5.35 (K1) */
    var D = [];
    [[22.6, 2.80, 0.15], [24.0, 3.13, 0.30], [25.2, 3.60, 0.32], [26.4, 4.01, 0.32], [27.6, 4.50, 0.30], [28.85, 4.96, 0.28],
     [29.94, 5.35, 0.25]].forEach(function (r) {
      D.push([[kx(r[0]), -r[2], 2.75], [kx(r[0]), 0, r[1]], [kx(r[0]), r[2], 2.75], [kx(r[0]), 0, 2.70]]);
    });
    loftN(B.paint, D);
    /* the bullet fairing along the fin top (K1, K2: s 31.6 to 34.6) */
    var Bt = [];
    [[31.4, 0.04], [31.7, 0.20], [32.3, 0.26], [34.0, 0.26], [34.5, 0.18], [34.7, 0.04]].forEach(function (r) {
      var P = [], j, t;
      for (j = 0; j < 12; j++) { t = j / 12 * TAU; P.push([kx(r[0]), Math.cos(t) * r[1], 9.50 + Math.sin(t) * r[1]]); }
      Bt.push(P);
    });
    loftS(B.paint, Bt, true, true);
    /* the tailplane: 12.8 m span (D1), LE 31.4 at the root to 32.7 at the tip, TE straight at 34.0; at h 2.95 */
    var T = [], a;
    for (a = -6.4; a <= 6.41; a += 1.6) {
      f = Math.abs(a) / 6.4;
      T.push(secW(31.4 + 1.3 * f, 34.0 - 31.4 - 1.3 * f, 0.12, a, 2.95, 10));
    }
    loftS(B.paint, T, true, true);
    /* the endplate fins at the tailplane tips (K1: s 32.6-34.0, h 0.7-3.2; K2: mostly below the tailplane, dark
       tipped) */
    for (var s = -1; s <= 1; s += 2) {
      var E = [];
      [[0.7, 33.15, 0.95], [1.4, 32.95, 1.15], [2.95, 32.65, 1.35], [3.6, 32.70, 1.25], [3.9, 32.85, 1.05]].forEach(function (r) {
        E.push(secF(r[1], r[2], 0.10, s * 6.42, r[0], 8));
      });
      loftS(B.paint, E, true, true);
      /* the ventral strakes under the tail, raked down and out (K1: s 29.8-33.5, the lower edge at h 0.24; K2: two,
         at about 45 degrees) */
      var A = [kx(29.8), s * 0.95, 1.00], Bq = [kx(33.4), s * 0.60, 2.15];
      var o = [0, s * 0.72, -0.72];
      hexa(B.paint, [A, Bq, [Bq[0], Bq[1] + o[1] * 0.8, Bq[2] + o[2] * 0.8], [A[0] - 1.2, A[1] + o[1] * 1.0, A[2] + o[2] * 1.0],
                     [A[0], A[1], A[2] + 0.05], [Bq[0], Bq[1], Bq[2] + 0.05], [Bq[0], Bq[1] + o[1] * 0.8 + 0.0, Bq[2] + o[2] * 0.8 + 0.05],
                     [A[0] - 1.2, A[1] + o[1] * 1.0, A[2] + o[2] * 1.0 + 0.05]]);
    }
  }
  function kjDish(B) {
    /* the dish: 7.8 m across (K1: 321 px), its mid-plane at h 6.95 (the rim's two ends), centre s 17.74; thick at the
       middle, a thin rim; the lower half dark (K1, K2); the small dome on top (K1) */
    var xc = kx(17.74), zc = 6.95, R = 3.9, Up = [], Dn = [], k, j, t;
    var prof = [[0, 0.42], [0.35, 0.40], [0.7, 0.34], [0.9, 0.22], [1.0, 0.04]];
    for (k = 0; k < prof.length; k++) {
      var Pu = [], Pd = [];
      for (j = 0; j < 32; j++) {
        t = j / 32 * TAU;
        var r = Math.max(prof[k][0] * R, 0.02);
        Pu.push([xc + Math.cos(t) * r, Math.sin(t) * r, zc + prof[k][1]]);
        Pd.push([xc + Math.cos(t) * r, Math.sin(t) * r, zc - prof[k][1]]);
      }
      Up.push(Pu); Dn.push(Pd);
    }
    /* upper half paint, lower half dark, meeting at the rim */
    loftS(B.paint, Up.concat([Up[Up.length - 1].map(function (p) { return [p[0], p[1], zc]; })]), true, false);
    loftS(B.dark, Dn.concat([Dn[Dn.length - 1].map(function (p) { return [p[0], p[1], zc]; })]), true, false);
    var Dm = [];
    [[0.0, 0.70], [0.12, 0.66], [0.22, 0.50], [0.28, 0.25], [0.30, 0.02]].forEach(function (r) {
      var P = [];
      for (j = 0; j < 16; j++) { t = j / 16 * TAU; P.push([xc + 0.6 + Math.cos(t) * r[1], Math.sin(t) * r[1], zc + 0.42 + r[0]]); }
      Dm.push(P);
    });
    loftS(B.paint, Dm, true, true);
    /* the pylon: a thick slab, 2.2 m chord at the top to 2.4 m at the roof (K1), 0.6 m thick, its edges rounded */
    var Py = [];
    [[2.65, 16.55, 2.45], [4.6, 16.70, 2.30], [6.6, 16.75, 2.20]].forEach(function (r) { Py.push(secF(r[1], r[2], 0.27, 0, r[0], 10)); });
    loftS(B.paint, Py, true, true);
  }
  function kjDetails(B) {
    var s, k;
    for (s = -1; s <= 1; s += 2) {
      /* the main-gear sponsons low on the sides (K1: s 13.4-17.1, to h -1.35) */
      var Sp = [];
      [[12.9, 0.05, 0.10], [13.5, 0.30, 0.45], [14.5, 0.42, 0.55], [16.3, 0.42, 0.55], [17.2, 0.28, 0.40], [17.7, 0.05, 0.10]].forEach(function (r) {
        var P = [], j, t;
        for (j = 0; j < 14; j++) { t = j / 14 * TAU; P.push([kx(r[0]), s * (1.85 + Math.cos(t) * r[1]), -0.80 + Math.sin(t) * r[2]]); }
        Sp.push(P);
      });
      loftS(B.paint, Sp, true, true);
      /* the long pod on the aft fuselage side (K1: s 24.0-27.3, h 0.6-1.45; K2: the same on the other side) */
      var Pd = [];
      [[24.0, 0.05], [24.25, 0.30], [24.7, 0.40], [26.7, 0.40], [27.1, 0.30], [27.3, 0.05]].forEach(function (r) {
        var P = [], j, t;
        for (j = 0; j < 12; j++) { t = j / 12 * TAU; P.push([kx(r[0]), s * (lerpTab(KHW, r[0])[0] - 0.08 + Math.cos(t) * r[1] * 0.55), 1.03 + Math.sin(t) * r[1]]); }
        Pd.push(P);
      });
      loftS(B.paint, Pd, true, true);
    }
    /* the blade aerials on the roof (K1: five, s 5.3-9.5, 0.45 m tall) and two under the belly */
    for (k = 0; k < 5; k++) slab(B.paint, [kx(5.3 + k * 1.05), 0, 2.95], unit([-1, 0, 0.35]), [0, 1, 0], [0, 0, 1], 0.12, 0.02, 0.22);
    for (k = 0; k < 2; k++) slab(B.paint, [kx(9.6 + k * 1.5), 0, -1.40], unit([-1, 0, -0.3]), [0, 1, 0], [0, 0, 1], 0.10, 0.02, 0.16);
  }
  /* the gear: two tandem twin-wheel legs a side and the twin nose wheel (the An-12 / Y-8 arrangement of
     js/hero/pla_y8g.js, K3 shows the Y-9's two tandem pairs a side); stations NOT CONFIRMED (no ground photograph) */
  function kjGear(G) {
    var s, k, x, zg = KJ.ZG;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      x = kx(14.3 + k * 1.35);
      bar(G.dark, [x, s * 1.85, -1.10], [x, s * 1.85, zg + 0.52], 0.09);
      cylY(G.tyre, x, s * 1.55, s * 1.80, zg + 0.52, 0.52, 18);
      cylY(G.tyre, x, s * 1.90, s * 2.15, zg + 0.52, 0.52, 18);
    }
    x = kx(5.0);
    bar(G.dark, [x, 0, -1.10], [x, 0, zg + 0.45], 0.08);
    cylY(G.tyre, x, -0.38, -0.12, zg + 0.45, 0.45, 16);
    cylY(G.tyre, x, 0.12, 0.38, zg + 0.45, 0.45, 16);
  }
  function bar(bin, A, B2, r) { cyl(bin, A, B2, r, r, 8); }
  function buildKj500(THREE, M, C) {
    var T = materials(THREE, C, KPAINT), g = new THREE.Group(), B = bins(T), G, BL, gear;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x4e555c, roughness: 0.6, metalness: 0.2 });
    B.dark = new Bin(T.dark, false);
    T.blur = new THREE.MeshStandardMaterial({ color: 0x9aa4b0, roughness: 0.6, metalness: 0.0, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1b1d1e, roughness: 0.92, metalness: 0.02 });
    BL = { dark: new Bin(T.dark, false), blur: new Bin(T.blur, false) };
    kjFuselage(B);
    kjGlass(B);
    kjWing(B);
    kjNacelles(B, BL);
    kjTail(B);
    kjDish(B);
    kjDetails(B);
    flush(THREE, g, B);
    flush(THREE, g, BL);
    G = { dark: new Bin(T.dark, false), tyre: new Bin(T.tyre, false) };
    kjGear(G);
    gear = new THREE.Group();
    gear.name = "gear";
    flush(THREE, gear, G);
    g.add(gear);
    g.name = "awacs_c";
    return g;
  }

  return { buildZtq15: buildZtq15, buildKj500: buildKj500 };
})();

UNIT_MODELS["lt_c"] = { len: 9.55, build: HeroPlaRetry.buildZtq15 };
UNIT_MODELS["awacs_c"] = { len: 36.02, build: HeroPlaRetry.buildKj500 };

/* HELD - not registered; the generic models stay (policy 1: no usable photograph or drawing found).
   Searches made for this retry (2026-11-04), one request at a time; zh.wikipedia.org could not be reached (the
   proxy refuses it with HTTP 403), so the Chinese Wikipedia's locally hosted files were NOT searched:
   atgmv_c      AFT-10 on the ZBD-04A chassis.  en.wikipedia "HJ-10" carries one image, "Red Arrow 10 Anti-tank
                missile.jpg" (the round on a stand, no vehicle; the text confirms the ZBD-04A AT carries eight
                rounds and a sensor mast, but shows none); en search "AFT-10 HJ-10 vehicle" found no article;
                Commons search "AFT-10" returns unrelated files.  Nothing shows the launcher on the hull, so the
                ZBD-04A builder (js/hero/pla_zbd04.js) is not called.
   pla_e60_sam  HQ-2 self-propelled (HQ-2B on a tracked chassis).  en.wikipedia "HQ-2" carries one image, "HQ-2
                Missile in China Industrial Museum.JPG" (a round on a fixed rail, no vehicle); ru.wikipedia "HQ-2"
                carries "HQ-2 missiles, China Aviation Museum.jpg" (rounds only).  js/sam3d.js keeps
                drawing the row.
   pla_e90_tel  DF-15 (M-9) and its original TEL.  en.wikipedia "DF-15" carries one image, "Dongfeng-15B.JPG" -
                the DF-15B, already drawn by js/hero/pla_ground_modern.js for pla_e00_tel, not the M-9 round or
                its 1990s launcher; ru.wikipedia's DF-15 article carries the same file.  js/tel3d.js keeps drawing
                the row.
   pla_e80_lst  Type 072 (Yukan).  en.wikipedia "Type 072 landing ship" carries one image, "Type 072A landing ship -
                2.jpg" - the later 072A (Yuting III), a different ship; Commons search "Yukan landing ship" returns only the
                072A and a 072A with a Type 071; ru.wikipedia search for the class found no article.  No photograph
                or drawing of a Yukan.
   ewv_c        CHL-906.  en.wikipedia search "CHL-906" finds no article on it (only an Algerian equipment list);
                Commons search "CHL-906" returns nothing related.
   radarv_c     SLC-2.  en.wikipedia search "SLC-2 radar" finds no article.  Commons holds four photographs of the
                Bangladesh Army's export SLC-2 ("Bangladesh Army SLC-2 radar on Volvo FM400 chassis. (31715708712).jpg"
                and three more), all on a Volvo FM400 truck, not the PLA's vehicle; the array alone is not enough
                to draw the row honestly, so it is not attempted.
UNIT_MODELS["atgmv_c"] = ...; UNIT_MODELS["pla_e60_sam"] = ...; UNIT_MODELS["pla_e90_tel"] = ...;
UNIT_MODELS["pla_e80_lst"] = ...; UNIT_MODELS["ewv_c"] = ...; UNIT_MODELS["radarv_c"] = ...;
*/
