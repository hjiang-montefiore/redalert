/* ========== deu_leopard2.js - HERO family: Kampfpanzer Leopard 2 (Krauss-Maffei) ==========
   One hull, one turret body, a VARIANTS table; build() takes the variant name:
     deu_e80_mbt  "a4"   Leopard 2 / 2A4 (1979-1992): the vertical-faced turret, EMES 15 window
                         in the face, the L/44 gun.
     deu_e90_mbt  "a5"   Leopard 2A5 (1995): + the wedge (arrowhead) add-on armour on the turret
                         front, the side cheek modules, the gunner's sight moved into a box on
                         the roof, the large bustle stowage box, the heavier front skirts.
     deu_e00_mbt  "a6"   Leopard 2A6 (2001): the 2A5 turret with the 120 mm L/55.
     mbt_g        "a7v"  Leopard 2A7V (rules.js; it had no model of its own and was drawn as a
                         borrowed same-role peer): the 2A6 + the two 2A7V tells P9 shows, the
                         thick add-on block across the hull nose and the louvred box on the left
                         rear of the engine deck.  Everything else 2A7-specific is NOT drawn.

   References, Wikimedia Commons, cached in scratchpad/q_leo2_ref:
     D1  "Leopard2A4.jpg" (B. Huber 2006) - side line drawing of a 2A4, left side: seven road
         wheels, rear sprocket, front idler, the turret, the gun with the fume extractor.  Used
         for shapes and HEIGHTS only (scaled to the published 2.48 m roof, see the note below);
         its lengths disagree with the photographs and were not used.
     P1  "Munster 2022 - Panzermuseum - Leopard 2A4 - by-RaBoe 137.jpg" - a German 2A4 from the
         left: skirts down to the wheel tops, the darker heavy front skirt panels, the bustle,
         2 x 4 smoke dischargers on the turret's rear flank, three-colour paint.
     P2  "Leopard 2 A4 (25379260508).jpg" - 2A4 dead ahead (Munster): width over the skirts,
         turret face and its EMES 15 window on the right, PERI R17 behind it, the headlamps in
         their guards, the X-shaped ice grousers stowed on the nose, the mirrors.
     P3  "Leopard 2 A4 Dresden.JPG" - 2A4 from the front left: turret side and face, the grab
         rail, the long gun with the fume extractor, two whip aerials, the paint.
     P4  "Leopard 2 A6 (54316256903).jpg" - a German 2A6 dead side-on on a rail wagon (right
         side, turret reversed, gun in its travel lock): THE measuring photograph.
     P5  "Leopard 2 A5 der Bundeswehr.jpg" - 2A5s from the left, gun forward: the wedge, the side
         cheek module, the roof sight box, the bustle box.
     P6  "Leopard 2A5 front view.jpg" - the wedge from the front, the grousers, the A5 skirts.
     P7  "Leopard 2A4 Dutch army 12002 KU-84-01 pic-6.JPG" and P8 "Leopard 2A4 Koninklijke
         Landmacht 60 42 pic3.JPG" (Dutch 2A4s, plain green) - the rear: the full-width louvred
         grille on the upper rear plate, the small louvre on the hull side, the rear lights.
     P9  "Leopard 2 A7V 313 Bad Frankenhausen 2024.JPG" - the 2A7V: the nose armour block and
         the louvred box on the left rear of the deck.
   Published: en.wikipedia "Leopard 2" (Technical data, after Lobitz 2009) - 2A4 length gun
   forward 9.67 m, 2A6 10.97 m, width 3.70 m (2A4) / 3.76 m (2A5/A6), height 2.79 m (2A4) /
   3.03 m (2A5/A6), ground clearance 0.54 m; "seven dual rubber-tired road wheels and four
   return rollers per side, with the idler wheel at the front and drive sprocket at the rear";
   "two groups of four" 76 mm smoke mortars; ice grousers "stored in the vehicle's bow".  The
   Munster museum's sign (thumbnail, P-series): 9.67 x 3.75 x 2.79 m.  Brief: hull 7.72 m,
   height 2.48 m (to the turret roof).

   MEASURED, P4 at one station (the hull side; the camera is square to the wagon), scale from
   the published hull length 7.72 m = 748 px from the tail plate (x 450) to the nose (x 1198):
   0.01032 m/px, ground at y 767.
     road wheels: seven, even pitch 79.7 px = 0.823 m, centres x 2.733 ... -2.205 m; diameter
       72 px = 0.74 m (drawn 0.71: tyre edges are soft in P4), centre height 0.46 m;
     drive sprocket: x -3.09, z 0.76, about 0.66 m over the teeth;
     hull side top 1.80-1.83 m; turret roof y 527 -> 2.48 m (the published 2.48 m, an
       independent check of the scale); turret lower edge 1.75-1.82 m;
     turret axis: from the two published gun-forward lengths and P4's reversed muzzle (x 278):
       axis + L44 - tail = 9.67 m, axis + L55 - tail = 10.97 m, axis - L55 = 278 px, which puts
       the axis at px 895 (x +0.733 m), the L/55 muzzle 6.37 m and the L/44 muzzle 5.07 m ahead
       of it.  Cross-check: 6.37 - 5.07 = 1.30 m against the 1.32 m the extra 11 calibres are.
     fume extractor (L/55): 2.63-3.37 m ahead of the axis, 0.31 m across; D1 puts the L/44's at
       the same distance (2.63-3.31 m), as it should be: the L/55 is longer at the muzzle end.
     2A5/A6 wedge: tip 2.63 m ahead of the axis at 2.05 m; its top meets the roof 1.13 m ahead
       of the axis, its underside the face 1.65 m ahead at 1.72 m.
     2A6 bustle: turret rear plate 2.48 m behind the axis, the stowage box to 3.27 m.
     2A5/A6 skirts: rear panels bottom 0.89 m; the heavy front section x 2.23-3.47 m, z 0.66-1.60.
     hull side louvre: x -1.07 to -0.82, z 1.37-1.60 (D1 puts it at -0.88 to -1.14: agrees).
   DISAGREEMENT, settled from photographs: D1's wheel pitch is 1/8.8 of its hull, P4's 1/9.4,
   and D1 puts the sprocket 0.65 pitch behind the last wheel against 1.08 in P4 and 1.1 in P1
   (P1 measured at its own rear station).  The photographs agree with each other; D1 is drawn
   long in the running gear and short in height (its roof is 2.26 m at the hull-length scale),
   so only its heights, rescaled to the 2.48 m roof (0.0070 m/px), and its shapes are used.
   Width: P2 at the station of the skirt fronts, 950 px = 3.75 m.  Turret face width from P2's
   face aspect (505 x 125 px, one plane) and the 0.70 m face height of P4: 2.83 m.

   Recognition list (what makes it read at game zoom, and its source):
     1. seven road wheels, rear sprocket, high front idler, skirts down to the wheel tops with
        the heavy front third - P1, P4, published
     2. the long slab-sided turret, flat roof, vertical face (2A4) - D1, P2, P3
     3. the 2A5/A6 arrowhead wedge on the turret front, the roof sight box - P4, P5, P6
     4. the long gun, thermal sleeve, fume extractor; the L/55 1.3 m longer - D1, P3, P4
     5. 2 x 4 smoke dischargers on each rear flank of the turret - D1, P1, P3, P4
     6. the PERI R17 standing up on the right of the roof, the loader's MG3 on the left - P2, P3
     7. the long shallow glacis with the stowed X-shaped grousers and the headlamp guards - P2, P6
     8. the louvred exhaust grille across the upper rear plate - P8
   Paint: Bundeswehr three-colour (bronze green, leather brown, tar black) as photographed:
   P1/P3/P5 hull sides, per-hue means #424c41 to #6b7159 green, #4c3c35 to #896f61 brown,
   #141412 to #20231f black; drawn as large hard-edged patches, green #4f5a3e, brown #5d4636,
   black #23261f.  No crosses, numbers, plates or unit signs (every photograph carries them).

   NOT CONFIRMED (judgement calls, estimated from proportions, no drawing or figure):
     - the turret plan: sides parallel from the face back to 0.6 m behind the axis, then
       tapering to 2.44 m at the rear plate; face chamfers.  P2 shows no side wall from the
       front, so the sides do not flare; the taper is not measured.
     - the gun's bore height above the deck (0.37 m: P2 and P3 ratios; D1 says 0.24 m; P4's
       gun is depressed in its travel lock and cannot say);
     - the four return rollers' positions (behind the skirts in every photograph; published
       count), the idler's position (behind the heavy skirt in P4; D1 and P4's track run agree
       within 0.1 m), the road wheel tyre and disc detail;
     - roof layout: the PERI R17 (P2: 0.78 m right of the centreline; D1 and P5: about 0.3-0.5
       m behind the axis), the commander's and loader's hatches, the MG3 mount, the driver's
       hatch on the right front of the glacis;
     - 2A5/A6 height: the published 3.03 m is not reached; P4's PERI with its cover tops out
       at 2.89 m and the drawn one at about 2.82 m.  The PERI was not stretched to meet it.
     - the 2A4 bustle basket's depth (0.25 m: D1 and P8 show a shallow rear rack only);
     - the 2A7V: only its nose block and the rear-left box are drawn; its roof armour, PERI
       R17A3, the turret-side boxes and the rest are not.
   NOT DRAWN: engine-deck grilles (no photograph here shows the deck from above), the
   snorkel, the hull escape hatch, tow cables, crew stowage.

   Materials: PAINT (canvas texture: the three-colour patches, plate seams, grime), DARK
   (tracks, gun bore, vision blocks, louvres, rubber), WHEEL (vertex colours: tyres, discs,
   hubs) and the team colour exactly as handed in (C.team): small strips on the turret sides,
   the bustle roof and the hull rear plate.
   Nodes: "turret" (trains; origin on the turret axis at the deck, z 1.78, gun along +X),
   seven "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 3 + 7 wheels = 13.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLeopard2 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* --------------------------------------------------------- variant table
     wedge: the 2A5 add-on armour; muz: muzzle ahead of the axis; box: bustle stowage box
     depth; peri: PERI x on the roof; skirt: "a4" or "a5"; nose/apu: the 2A7V tells (P9) */
  var VARIANTS = {
    a4:  { wedge: false, muz: 5.07, box: 0.25, peri: -0.35, skirt: "a4" },
    a5:  { wedge: true,  muz: 5.07, box: 0.79, peri: -0.45, skirt: "a5" },
    a6:  { wedge: true,  muz: 6.37, box: 0.79, peri: -0.45, skirt: "a5" },
    a7v: { wedge: true,  muz: 6.37, box: 0.79, peri: -0.45, skirt: "a5", nose: true, apu: true }
  };
  var PAINT = { base: "#4f5a3e", brown: "#5d4636", black: "#23261f", seed: 1979 };

  /* hull (P4, scale 0.01032 m/px; brief 7.72 m) */
  var NOSE = 3.86, TAIL = -3.86, DECK = 1.78, SPON = 1.17, BELLY = 0.54, HW = 1.76, LW = 1.04;
  var GLX = 2.05, NZT = 1.22;           /* glacis break (deck level) and the nose top (D1) */
  /* running gear (P4): seven wheels at 0.823 m, rear sprocket, front idler */
  var XW = [2.733, 1.910, 1.087, 0.264, -0.559, -1.382, -2.205], ZW = 0.46, RW = 0.355;
  var TY = 1.40, TW = 0.3175;           /* track centres, half of the 635 mm track */
  var SPR = { x: -3.09, z: 0.76, r: 0.30 }, IDL = { x: 3.38, z: 0.80, r: 0.30 };
  var RET = [2.32, 0.68, -0.97, -2.62], RZ = 0.88, RR = 0.10;   /* four return rollers */
  var SKO = 1.875;                      /* outer face of the skirts: 3.75 m */
  /* turret: axis (P4), roof 0.70 above the deck = 2.48 m, bore 0.37 */
  var TX = 0.733, ROOF = 0.70, BORE = 0.37, FACE = 1.45, TRP = -2.48;

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
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.30, q[1] * 0.30);
        else if (ay >= ax) this.U.push(q[0] * 0.30, q[2] * 0.30);
        else this.U.push(q[1] * 0.30, q[2] * 0.30);
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
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
  var _tex;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* the Bundeswehr three-colour: large hard-edged brown and black patches over bronze green
     (P1, P3, P5), about a quarter brown and a quarter black; one tile is 3.3 m of plate */
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w, n, a;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      function patch(col, cx, cy, rx, ry, rr) {
        q.fillStyle = col; q.beginPath();
        for (k = 0; k < rr.length; k++) {
          a = k / rr.length * TAU;
          var px = cx + Math.cos(a) * rx * rr[k], py = cy + Math.sin(a) * ry * rr[k];
          if (k === 0) q.moveTo(px, py); else q.lineTo(px, py);
        }
        q.closePath(); q.fill();
      }
      /* each patch is drawn at the tile wraps too, so the pattern repeats without seams */
      var cols = [PAINT.brown, PAINT.black, PAINT.brown, PAINT.black, PAINT.black, PAINT.brown, PAINT.black];
      for (i = 0; i < 7; i++) {
        var cx = R() * S, cy = R() * S, rx = 70 + R() * 70, ry = 38 + R() * 46, dx, dy, rr = [];
        n = 7 + ((R() * 4) | 0);
        for (k = 0; k < n; k++) rr.push(0.65 + R() * 0.45);
        for (dx = -1; dx <= 1; dx++) for (dy = -1; dy <= 1; dy++) patch(cols[i], cx + dx * S, cy + dy * S, rx, ry, rr);
      }
      for (i = 0; i < 5; i++) {                 /* plate seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(15,16,12,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
      }
      for (i = 0; i < 130; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(200,190,160,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 30, 2 + R() * 20);
      }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
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

  /* ---------------------------------------------------------------- hull */
  function glz(x) { return x <= GLX ? DECK : DECK - (x - GLX) / (NOSE - GLX) * (DECK - NZT); }
  function addHull(B, V) {
    var s, i, x, y, z;
    /* the tub between the tracks: belly at the published 0.54 m clearance, the lower nose
       plate leaning back under the glacis, the rear plate */
    prismY(B.paint, [[TAIL, SPON], [TAIL, 0.78], [TAIL + 0.32, BELLY], [3.25, BELLY], [NOSE, 1.02], [NOSE, SPON]], -LW, LW);
    /* the upper hull over the sponsons: vertical sides, flat deck, the long shallow glacis
       (D1 heights: deck 1.78 m, nose top 1.22 m) and the sloped upper rear plate (P8) */
    function sec(x, top, zb) {
      var e = 0.05;
      return [[x, -HW, zb], [x, HW, zb], [x, HW, top - e], [x, HW - e, top], [x, -HW + e, top], [x, -HW, top - e]];
    }
    loftN(B.paint, [sec(TAIL, 1.56, SPON), sec(TAIL + 0.26, DECK, SPON), sec(GLX, DECK, SPON),
                    sec(NOSE, NZT, 1.02)]);
    /* --- rear (P8): the louvred grille across the sloped upper rear plate, rear lights,
       tow eyes --- */
    box(B.dark, TAIL - 0.02, TAIL, -1.50, 1.50, 1.20, 1.52);
    for (i = 0; i < 7; i++) box(B.paint, TAIL - 0.05, TAIL, -1.48, 1.48, 1.23 + i * 0.042, 1.25 + i * 0.042);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, TAIL - 0.04, TAIL, s * 1.55 - 0.10, s * 1.55 + 0.10, 1.00, 1.14);
    }
    /* --- the small louvre on each hull side behind the turret (P4, P8, D1) --- */
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      for (i = 0; i < 6; i++) box(B.dark, -1.07 + i * 0.045, -1.05 + i * 0.045, s > 0 ? y : y - 0.012, s > 0 ? y + 0.012 : y, 1.40, 1.60);
    }
    /* --- glacis (P2, P6): driver's hatch and periscopes on the right, the headlamps in their
       guards, the X-shaped ice grousers stowed across the nose, mirrors, tow eyes --- */
    z = glz(2.45);
    box(B.paint, 2.25, 2.70, -0.70, -0.20, z - 0.02, z + 0.05);
    for (i = 0; i < 3; i++) box(B.dark, 2.10, 2.20, -0.62 + i * 0.16, -0.50 + i * 0.16, glz(2.15), glz(2.15) + 0.09);
    var ga = Math.atan2(DECK - NZT, NOSE - GLX), gu = [Math.cos(ga), 0, -Math.sin(ga)], gw = [Math.sin(ga), 0, Math.cos(ga)];
    for (s = -1; s <= 1; s += 2) {
      /* headlamp in its guard (P2: 1.05 m off the centreline) */
      y = s * 1.05; z = glz(3.62);
      cylX(B.paint, 3.52, 3.66, y, z + 0.13, 0.085, 0.09, 12);
      cylX(B.dark, 3.66, 3.68, y, z + 0.13, 0.075, 0.075, 12);
      box(B.dark, 3.48, 3.70, y - 0.13, y - 0.11, z, z + 0.25);
      box(B.dark, 3.48, 3.70, y + 0.11, y + 0.13, z, z + 0.25);
      box(B.dark, 3.69, 3.71, y - 0.13, y + 0.13, z + 0.22, z + 0.25);
      /* the grousers: rows of X-shaped links on the nose, each side of the centre (P2, P6) */
      for (i = 0; i < 4; i++) {
        var gy = s * (0.36 + i * 0.13), gx = 3.70;
        slab(B.dark, [gx, gy, glz(gx) + 0.04], [0, 0.6, 0.8], gu, [1, 0, 0], 0.14, 0.02, 0.025);
        slab(B.dark, [gx, gy, glz(gx) + 0.04], [0, -0.6, 0.8], gu, [1, 0, 0], 0.14, 0.02, 0.025);
      }
      /* mirror on its stalk at the front corner (P2, P3, P7) */
      box(B.dark, 3.30, 3.33, s * 1.50 - 0.015, s * 1.50 + 0.015, glz(3.3), glz(3.3) + 0.30);
      box(B.dark, 3.28, 3.34, s * 1.50 - 0.09, s * 1.50 + 0.09, glz(3.3) + 0.28, glz(3.3) + 0.44);
      /* tow eyes on the lower nose plate */
      box(B.dark, NOSE - 0.05, NOSE + 0.10, s * 0.62 - 0.07, s * 0.62 + 0.07, 0.86, 0.98);
      box(B.dark, TAIL - 0.06, TAIL + 0.02, s * 1.10 - 0.07, s * 1.10 + 0.07, 0.86, 0.98);
    }
    /* the nose plate's lip (P2) */
    slab(B.paint, [NOSE - 0.04, 0, NZT - 0.08], [0, 0, 1], [0, 1, 0], [1, 0, 0], 0.08, HW - 0.05, 0.04);
    /* --- the 2A7V's nose armour block (P9): a thick slab laid on the front of the glacis --- */
    if (V.nose) {
      slab(B.paint, [3.42, 0, glz(3.42) + 0.09], gu, [0, 1, 0], gw, 0.42, 1.30, 0.09);
      box(B.paint, NOSE - 0.02, NOSE + 0.10, -1.30, 1.30, 0.98, NZT + 0.05);
    }
    /* --- the 2A7V's louvred box on the left rear corner of the deck (P9) --- */
    if (V.apu) {
      box(B.paint, -3.55, -2.85, 1.20, 1.72, DECK, DECK + 0.42);
      for (i = 0; i < 6; i++) box(B.dark, -3.50 + i * 0.11, -3.45 + i * 0.11, 1.72, 1.735, DECK + 0.06, DECK + 0.36);
    }
    /* team strip on the rear plate */
    box(B.team, TAIL - 0.03, TAIL, -0.45, 0.45, 1.56, 1.64);
  }

  /* --------------------------------------------------------------- skirts */
  function addSkirts(B, V) {
    var s, i, yo, yi, x0, x1;
    for (s = -1; s <= 1; s += 2) {
      yo = s * (SKO - 0.03); yi = s * HW;
      var ya = Math.min(yo, yi), yb = Math.max(yo, yi);
      if (V.skirt === "a4") {
        /* rubber and steel panels, top at the deck edge, bottom just above the wheel tops
           (P1, P3); the one over the sprocket stops higher (P8) */
        x0 = -3.55; x1 = 1.62;
        for (i = 0; i < 6; i++) {
          var a = x0 + (x1 - x0) * i / 6, b = x0 + (x1 - x0) * (i + 1) / 6;
          box(B.paint, a + 0.01, b - 0.01, ya, yb, i === 0 ? 1.12 : 0.86, DECK + 0.01);
          box(B.dark, b - 0.012, b + 0.012, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, i === 0 ? 1.12 : 0.88, DECK);
        }
        /* the heavy ballistic front third (published): thicker, its lower edge rising
           steeply to a short front face (P2: 0.28 m) */
        prismY(B.paint, [[1.62, 0.80], [2.90, 0.80], [3.66, 1.50], [3.66, DECK + 0.02], [1.62, DECK + 0.02]],
               s > 0 ? HW : -SKO, s > 0 ? SKO : -HW);
        for (i = 1; i < 3; i++) box(B.dark, 1.62 + i * 0.68 - 0.012, 1.62 + i * 0.68 + 0.012, s > 0 ? SKO : -SKO - 0.01, s > 0 ? SKO + 0.01 : -SKO, 0.84, DECK);
      } else {
        /* 2A5/A6 (P4): panels to 0.89 m, then the new heavy front section, deeper and set
           lower (0.66-1.60 m), the hull side showing above it */
        x0 = -3.55; x1 = 2.23;
        for (i = 0; i < 7; i++) {
          var c = x0 + (x1 - x0) * i / 7, d = x0 + (x1 - x0) * (i + 1) / 7;
          box(B.paint, c + 0.01, d - 0.01, ya, yb, i === 0 ? 1.12 : 0.89, DECK + 0.01);
          box(B.dark, d - 0.012, d + 0.012, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, i === 0 ? 1.12 : 0.90, DECK);
        }
        box(B.paint, 2.23, 3.47, s > 0 ? HW - 0.02 : -SKO - 0.005, s > 0 ? SKO + 0.005 : -HW + 0.02, 0.66, 1.60);
        box(B.dark, 2.85 - 0.012, 2.85 + 0.012, s > 0 ? SKO + 0.005 : -SKO - 0.015, s > 0 ? SKO + 0.015 : -SKO - 0.005, 0.70, 1.56);
        /* the mudguard over the idler ahead of it */
        box(B.paint, 3.47, NOSE - 0.04, s > 0 ? 1.06 : -HW, s > 0 ? HW : -1.06, 1.48, 1.60);
      }
    }
  }

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
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.05]);
    for (i = 0; i < RET.length; i++) C.push([RET[i], RZ, RR + 0.05]);
    C.push([IDL.x, IDL.z, IDL.r + 0.05], [SPR.x, SPR.z, SPR.r + 0.05]);
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
    cnt = Math.round(tot / 0.184); step = tot / cnt;      /* 82 links a side (published) */
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.07);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the rubber pad on each link, and the end connectors at the track edges */
        belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TW + 0.06, y + TW - 0.06, 0.10);
        belt(B.dark, px - dx * 0.03, pz - dz * 0.03, px + dx * 0.03, pz + dz * 0.03, y - TW - 0.01, y + TW + 0.01, 0.09);
      }
      /* the rear drive sprocket: hub and teeth (P4, P8) */
      cylY(B.dark, SPR.x, y - 0.20, y + 0.20, SPR.z, SPR.r - 0.04, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.20, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.25, SPR.z, 0.17, 14);
      /* the front idler (dual disc) and the four return rollers */
      cylY(B.paint, IDL.x, y - 0.27, y - 0.04, IDL.z, IDL.r, 18);
      cylY(B.paint, IDL.x, y + 0.04, y + 0.27, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.27, y + s * 0.31, IDL.z, 0.09, 10);
      for (i = 0; i < RET.length; i++) cylY(B.dark, RET[i], y - 0.25, y + 0.25, RZ, RR, 12);
      /* final drive housing */
      cylY(B.paint, SPR.x, s * (LW + 0.01), s * (TY - TW - 0.02), SPR.z, 0.22, 12);
    }
  }
  /* a road wheel pair: dual rubber tyres, dished disc, a ring of bolts, hub (P1, P4) */
  var TYRE = [0.15, 0.155, 0.15], DISC = [0.36, 0.40, 0.29], RIM = [0.30, 0.34, 0.24], HUB = [0.40, 0.44, 0.33];
  function addWheel(W) {
    var s, y, i, a, e;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.29, y - 0.03, 0, RW, 16);
      cylY(W, 0, y + 0.03, y + 0.29, 0, RW, 16);
      W.col = DISC;
      cylY(W, 0, y - 0.03, y + 0.03, 0, RW - 0.06, 12);
      e = y + s * 0.29;
      cyl(W, [0, e, 0], [0, e + s * 0.025, 0], RW - 0.065, RW - 0.10, 16);
      cyl(W, [0, e + s * 0.02, 0], [0, e + s * 0.05, 0], 0.20, 0.13, 12);
      W.col = RIM;
      for (i = 0; i < 10; i++) {
        a = i / 10 * TAU;
        box(W, Math.cos(a) * 0.17 - 0.018, Math.cos(a) * 0.17 + 0.018, Math.min(e, e + s * 0.045), Math.max(e, e + s * 0.045), Math.sin(a) * 0.17 - 0.018, Math.sin(a) * 0.17 + 0.018);
      }
      W.col = HUB;
      cylY(W, 0, e + s * 0.04, e + s * 0.09, 0, 0.075, 10);
    }
  }

  /* -------------------------------------------------------------- turret */
  /* turret-local: x forward of the axis, z above the deck (DECK).  Plan: face 2.83 m (P2),
     sides parallel to 0.6 m behind the axis then tapering to the rear plate (NOT CONFIRMED);
     roof 0.70 (2.48 m, P4); the underside rises toward the bustle so it clears the deck */
  function twid(x) { return x >= -0.60 ? 1.40 : 1.40 - (-0.60 - x) / (-0.60 - TRP) * 0.18; }
  function addTurret(B, V) {
    var s, i, j, y, x, z;
    function sec(x, w, zb, zt) {
      var e = 0.06;
      return [[x, -w, zb], [x, w, zb], [x, w, zt - e], [x, w - e, zt], [x, -w + e, zt], [x, -w, zt - e]];
    }
    loftN(B.paint, [sec(TRP, twid(TRP), 0.10, ROOF - 0.02), sec(-0.60, 1.40, 0.02, ROOF), sec(FACE - 0.08, 1.40, 0.0, ROOF),
                    sec(FACE, 1.32, 0.0, ROOF)]);
    /* ring collar under the turret */
    cylZ(B.dark, 0, 0, -0.03, 0.02, 1.05, 24);

    /* --- smoke dischargers: two rows of four on each rear flank (D1, P1, P3, P4),
       tubes pointing out, up and a little forward --- */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) for (i = 0; i < 4; i++) {
        x = -1.38 - i * 0.24 - j * 0.10; y = s * (twid(x) + 0.05); z = 0.50 - j * 0.20;
        var D = unit([0.25, s * 0.75, 0.55 - j * 0.15]);
        cyl(B.dark, [x, y, z], [x + D[0] * 0.30, y + D[1] * 0.30, z + D[2] * 0.30], 0.048, 0.048, 8);
      }
      box(B.paint, -2.25, -1.25, s > 0 ? twid(-1.75) - 0.02 : -twid(-1.75) - 0.06, s > 0 ? twid(-1.75) + 0.06 : -twid(-1.75) + 0.02, 0.22, 0.58);
      /* grab rail along the side (D1, P3) */
      box(B.dark, -1.10, 0.90, s > 0 ? 1.40 : -1.46, s > 0 ? 1.46 : -1.40, 0.43, 0.46);
      /* team strip on the side, behind the dischargers */
      box(B.team, -2.45, -2.30, s > 0 ? twid(-2.38) - 0.01 : -twid(-2.38) - 0.015, s > 0 ? twid(-2.38) + 0.015 : -twid(-2.38) + 0.01, 0.30, 0.55);
    }

    /* --- bustle stowage: a shallow rack on the 2A4, the deep box on the 2A5/A6 (P4) --- */
    if (V.box > 0.5) {
      box(B.paint, TRP - V.box, TRP + 0.02, -1.10, 1.10, 0.05, 0.56);
      box(B.dark, TRP - V.box - 0.01, TRP - V.box + 0.01, -1.05, 1.05, 0.08, 0.53);
    } else {
      box(B.dark, TRP - V.box, TRP, -1.05, -1.01, 0.12, 0.50);
      box(B.dark, TRP - V.box, TRP, 1.01, 1.05, 0.12, 0.50);
      box(B.dark, TRP - V.box - 0.02, TRP - V.box + 0.02, -1.05, 1.05, 0.12, 0.50);
      box(B.dark, TRP - V.box, TRP, -1.05, 1.05, 0.10, 0.13);
    }
    box(B.team, TRP - 0.55, TRP - 0.05, -0.50, 0.50, ROOF - 0.02, ROOF + 0.005);

    /* --- roof: PERI R17 on the right (P2, P3), commander's hatch behind it, the loader's hatch
       and MG3 on the left (D1), periscopes, two whip aerials at the rear corners (P3, P5) --- */
    var px = V.peri, py = -0.72;
    cylZ(B.paint, px, py, ROOF, ROOF + 0.08, 0.17, 12);
    box(B.paint, px - 0.17, px + 0.19, py - 0.15, py + 0.15, ROOF + 0.08, ROOF + 0.32);
    box(B.dark, px + 0.19, px + 0.20, py - 0.11, py + 0.11, ROOF + 0.14, ROOF + 0.28);
    cylZ(B.paint, -1.05, -0.62, ROOF, ROOF + 0.06, 0.36, 16);
    cylZ(B.paint, -1.05, -0.62, ROOF + 0.06, ROOF + 0.10, 0.30, 16);
    for (i = 0; i < 6; i++) {
      var aa = i / 6 * TAU + 0.3;
      box(B.dark, -1.05 + Math.cos(aa) * 0.33 - 0.04, -1.05 + Math.cos(aa) * 0.33 + 0.04, -0.62 + Math.sin(aa) * 0.33 - 0.04, -0.62 + Math.sin(aa) * 0.33 + 0.04, ROOF + 0.06, ROOF + 0.13);
    }
    var lx = -0.40, ly = 0.66;
    cylZ(B.paint, lx, ly, ROOF, ROOF + 0.06, 0.34, 16);
    cylZ(B.dark, lx + 0.30, ly - 0.05, ROOF + 0.06, ROOF + 0.30, 0.025, 6);
    box(B.dark, lx + 0.18, lx + 0.66, ly - 0.08, ly - 0.02, ROOF + 0.28, ROOF + 0.36);
    cylX(B.dark, lx + 0.66, lx + 1.20, ly - 0.05, ROOF + 0.33, 0.022, 0.022, 6);
    box(B.dark, lx + 0.10, lx + 0.30, ly - 0.04, ly + 0.10, ROOF + 0.22, ROOF + 0.34);
    box(B.dark, 0.45, 0.60, 0.40, 0.62, ROOF, ROOF + 0.10);
    for (s = -1; s <= 1; s += 2) {
      /* the aerial bases; the whips (P3: two, well over 2 m) are not drawn, as on the other
         tank heroes, so they do not set the model's height */
      cylZ(B.dark, -2.15, s * 1.00, ROOF - 0.02, ROOF + 0.12, 0.07, 8);
      cylZ(B.dark, -2.15, s * 1.00, ROOF + 0.12, ROOF + 0.30, 0.02, 5);
    }

    /* --- the face: the 2A4's EMES 15 window on the right (P2), mantlet; or the 2A5/A6
       wedge, cheek modules and the sight box on the roof (P4, P5, P6) --- */
    if (!V.wedge) {
      box(B.paint, FACE - 0.40, FACE + 0.06, -0.88, -0.30, ROOF - 0.04, ROOF + 0.06);
      box(B.dark, FACE + 0.02, FACE + 0.07, -0.78, -0.38, 0.44, 0.66);
      box(B.paint, FACE, FACE + 0.22, -0.34, 0.34, 0.14, 0.60);
      cylX(B.dark, FACE + 0.22, FACE + 0.24, 0.20, BORE, 0.05, 0.05, 8);
    } else {
      for (s = -1; s <= 1; s += 2) {
        var yi = s * 0.30, yo = s * 1.48;
        var IN = [[2.63, 0.29], [1.13, ROOF + 0.02], [1.13, ROOF - 0.06], [FACE, -0.02], [1.65, -0.02]];
        var OUT = [[1.70, 0.556], [1.13, ROOF + 0.02], [1.13, ROOF - 0.06], [FACE, -0.02], [1.70, 0.0]];
        var ri = [], ro = [];
        for (i = 0; i < 5; i++) { ri.push([IN[i][0], yi, IN[i][1]]); ro.push([OUT[i][0], yo, OUT[i][1]]); }
        loftN(B.paint, s > 0 ? [ri, ro] : [ro, ri]);
        /* the side cheek module: its front edge raked like the wedge (P4, P5) */
        prismY(B.paint, [[0.25, 0.0], [FACE, 0.0], [1.70, 0.30], [1.30, ROOF], [0.25, ROOF]],
               s > 0 ? 1.38 : -1.48, s > 0 ? 1.48 : -1.38);
      }
      /* the gun's mantlet housing between the wedge halves */
      box(B.paint, FACE, 2.30, -0.30, 0.30, 0.16, 0.58);
      /* the gunner's sight in its box on the roof front right, window forward (P5) */
      box(B.paint, 0.85, 1.42, -0.92, -0.38, ROOF, ROOF + 0.30);
      box(B.dark, 1.42, 1.44, -0.84, -0.46, ROOF + 0.08, ROOF + 0.24);
    }

    /* --- the gun: thermal sleeve with clamp bands, the fume extractor 2.63-3.31 m out
       (D1, P4), the muzzle reference box on top at the muzzle --- */
    var m = V.muz, gz = BORE;
    if (!V.wedge) cylX(B.paint, FACE + 0.22, 1.95, 0, gz, 0.21, 0.15, 16);
    cylX(B.paint, 1.95, 2.60, 0, gz, 0.125, 0.125, 14);
    cylX(B.paint, 2.60, 2.70, 0, gz, 0.125, 0.155, 14);
    cylX(B.paint, 2.70, 3.25, 0, gz, 0.155, 0.155, 16);
    cylX(B.paint, 3.25, 3.37, 0, gz, 0.155, 0.11, 14);
    cylX(B.paint, 3.37, m - 0.16, 0, gz, 0.108, 0.100, 14);
    for (x = 2.25; x < m - 0.5; x += 1.15) cylX(B.dark, x, x + 0.05, 0, gz, 0.135, 0.135, 12);
    cylX(B.paint, m - 0.16, m, 0, gz, 0.115, 0.115, 14);
    cylX(B.dark, m - 0.01, m + 0.005, 0, gz, 0.07, 0.07, 10);
    box(B.dark, m - 0.20, m - 0.06, -0.05, 0.05, gz + 0.10, gz + 0.17);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.a4, T = materials(THREE, C), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB, V);
    addSkirts(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB, V);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of the build (tail plate to muzzle, gun forward) */
UNIT_MODELS["deu_e80_mbt"] = { len: 9.67, build: function (THREE, M, C) { return HeroLeopard2.build(THREE, M, C, "a4"); } };
UNIT_MODELS["deu_e90_mbt"] = { len: 9.67, build: function (THREE, M, C) { return HeroLeopard2.build(THREE, M, C, "a5"); } };
UNIT_MODELS["deu_e00_mbt"] = { len: 10.97, build: function (THREE, M, C) { return HeroLeopard2.build(THREE, M, C, "a6"); } };
/* mbt_g (rules.js, Leopard 2A7V) had no model of its own: drawn as the 2A6 plus the 2A7V's
   nose block and rear-left deck box (P9); see the header for what is not drawn */
UNIT_MODELS["mbt_g"] = { len: 10.97, build: function (THREE, M, C) { return HeroLeopard2.build(THREE, M, C, "a7v"); } };
