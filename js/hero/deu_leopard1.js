/* ========== deu_leopard1.js - HERO models: Leopard 1A1 and Flakpanzer Gepard ==========
   One Leopard 1 hull, two modules:
     deu_e60_mbt     HeroLeopard1  Kampfpanzer Leopard 1A1 (the 1971-74 standard: the FIRST cast
                     turret with the round rangefinder housings, the thermal sleeve, the metal-rubber
                     skirts; WITHOUT the 1975-77 bolt-on turret armour of the 1A1A1).  The row's
                     era is the 1960s; the 1A1 is the first standard with the parts this row names
                     (sleeve, skirts) and is the drawing measured below.
     deu_e60_spaag   HeroGepard    Flakpanzer Gepard 1A1 (B2 turret, 1976).
   References (Wikimedia Commons, cached in scratchpad/q_leo1_ref):
     D1  "Leopard 1 A1.JPG" - a scale side line drawing of a Leopard 1A1 from the LEFT (nose
         left), 10000 px wide, read at 1800 px: seven dual road wheels, front idler, raised rear
         sprocket, the skirts in four panels, the cast turret with the round TEM housing on its
         side, the four smoke dischargers, the XSW-30-U searchlight over the mantlet, the MG3 over
         the loader's hatch, the bustle basket, the louvred radiator grilles high on the rear hull
         side, the hatched engine deck, the thermal sleeve with its clamp bands and the fume
         extractor.  SCALE: 183 px/m.  Three published figures agree on it: hull 7.09 m = nose to
         rear towing eyes 1298 px (177.7 px/m if taken to the rear plate: no), height 2.39 m to the
         turret roof = 437 px (183.0), 9.54 m gun forward = 1759 px (184.4).  All coordinates of
         the hull, running gear and turret below are D1 pixels at this scale: X = (1134 - px)/183,
         Z = (621 - py)/183.
     P1  "Leopard-1-latrun-2.jpg" (Latrun, Leopard 1 with later turret armour, dead side-on): the
         ratios at ONE station, the road-wheel row: wheel diameter / pitch 92 / 100 px = 0.92,
         D1 120 / 130.25 = 0.92; sprocket centre 2.0 wheel radii up (D1 2.17).  So D1's running
         gear stands; the wheels come out 0.656 m (120 px), the pitch 0.712 m.
     P2  "Bundesarchiv B 145 Bild-F027415-0001, Kampfpanzer Leopard I.jpg" - a column from the
         front above, period colour: plain olive, the front mudguard boxes over the track ends, the
         headlamps with guards near the glacis corners, the cast turret seen from the front (its
         width: 228 / 287 px of the hull at the same station = 0.79 -> 2.6 m), driver front right.
     P3  "Leopard 1 Tank REFORGER 77 (CC 109969).jpg" - a 1A1 in 1977: plain olive, skirts, the
         thermal sleeve, the searchlight box on the mantlet, the grousers on the glacis.
     G1  "Gepard 1a2 sideview.jpg" - Gepard from the left, guns up, radar raised: NO skirts, the
         four return rollers (1-2, 2-3, 4-5, 6-7; with P4), the turret front between wheels 2 and
         3, the big gun housings on the turret sides, the search antenna on its column at the
         turret rear, the boxes on the roof, the louvred radiator grille and BEHIND it the
         battery box on the rear fender (0.58 m long, 110 px at the 0.712 m pitch's 135 px).
     G2  "Gepard 1a2 overview.jpg", G3 "010_FZD_030.jpg" - front left 3/4: the tracking radar's
         round housing on the turret front, the guns outboard, the smoke dischargers low on the
         front cheeks, the search antenna's elliptical dish (width / height 1.85 in G3).
     G4  "FLAK-Panzer Gepard Praesentation Eschweiler 1986.jpg" - 1986, guns level, plain olive.
   Published: en.wikipedia "Leopard 1": 9.54 m gun forward, 3.37 m wide, 2.39 m to the turret
   roof (2.7 m absolute), 7 dual rubber-tyred road wheels, rear sprocket, front idler, FOUR
   return rollers a side; MG3 on a skate rail over the loader's hatch; two banks of four smoke
   dischargers; the TEM rangefinder's heads in armoured housings on both turret sides; the
   XSW-30-U searchlight above the gun, offset left; the 1A1 added the skirts and the sleeve.
   en.wikipedia "Flakpanzer Gepard": 7.68 m overall, 3.71 m wide, 3.29 m radar retracted, 47.5 t;
   chassis and track "taken directly from the Leopard 1", "8 cm increased distance between the
   third and fourth roadwheel" and "additional batteries in battery boxes at the rear".  So the
   Gepard hull is NOT a new long hull: it is this one, stretched 0.08 m between wheels 3 and 4
   (everything aft of that moves back), plus the rear battery boxes (G1): drawn 7.80 m over the battery boxes and level muzzles.
   Brief's 7.09 m hull: D1 reaches it only to the towing eyes, so it is drawn so.

   Recognition list (each drawn; source):
     1. seven dual road wheels, front idler, raised rear sprocket - D1, P1, G1
     2. Leopard 1A1: skirts in four panels over the track with the bolted rail on top - D1, P3
     3. the long flat hull, the shallow upper glacis, the boxy front mudguards - D1, P2
     4. the rounded cast turret, low front, the rear basket - D1, P2
     5. the round rangefinder housings on the turret sides, the four smoke dischargers - D1
     6. the 105 mm L7 with the thermal sleeve's bands and the fume extractor - D1, P3
     7. the searchlight box over the mantlet, offset left; the MG3 over the loader - D1, P3
     8. louvred radiator grilles high on the rear hull sides; the engine deck grilles - D1, P1
     Gepard: 9. the tall box turret, the two 35 mm KDA guns in big housings outboard - G1-G4;
     10. the round tracking radar on the turret front - G2, G3; 11. the search antenna on its
     column at the turret rear, drawn RAISED (G1-G4 all show it raised; it folds down behind
     the turret for transit) - 12. no skirts, the rollers visible - G1, G4.
   Paint: P2 (faded, purple cast) and P3 (washed out) show plain single-colour olive on every
   tank; G4 (1986) plain olive too (shade #2b3e34).  No hue survives in these prints, so the
   Bundeswehr's single colour of the period, RAL 6014 Gelboliv, is taken as the other German
   heroes take it (nato_launchers_eu.js "gelb", #4c4b36).  G1/G2/G3 wear the post-1984 three
   colour: not this row's period, not drawn.  No crosses, numbers or tactical signs.
   NOT CONFIRMED (proportion or judgement, no drawing): the hull and turret WIDTHS (hull 3.25 m
   over the sponsons, the skirts at 3.37 published; turret 2.6 m from P2's ratio); the wheel
   diameter (0.656 m from D1's scale; no published figure was reachable); belly 0.44 m; the
   mantlet's 1.0 m width; the hatch and cupola sizes; the Gepard turret's size and heights (from
   G1 ratios and the published 3.71 m / 3.29 m: roof 2.86 m, gun axis 2.55 m, housings out to
   +-1.85 m, trunnion X -0.9), the search antenna's size (1.65 x 0.9 m, top 4.2 m from G1), the
   Gepard muzzles at X 3.78 (7.80 m over guns and battery boxes vs 7.68 published: not forced),
   the left battery box (only the right is photographed square on; drawn both), roof boxes.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team): strips
   on the rear deck and the turret roof.  Nodes: "turret" (origin on the turret ring at the deck,
   gun / guns along +X) and seven "roadwheel" groups (axle along local Y, both sides).
   Drawn: Leopard 1A1 9.62 x 3.37 x 2.72 m (MG3 top; turret roof 2.39 m); Gepard 7.80 x 3.71 x
   4.20 m with the antenna raised (published 3.29 m is retracted; the roof boxes reach 3.18 m).
   Draw calls: hull 3 + running gear 2 + 7 wheels + turret 3 = 15.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLeopard1 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4c4b36", blots: ["#55543c", "#44432f"], seed: 1965 };
  /* running gear (D1): even pitch 0.712 m, wheels 0.656 m, idler front, sprocket rear raised */
  var TY = 1.35, TW = 0.275;
  var XW0 = [2.246, 1.534, 0.822, 0.110, -0.602, -1.314, -2.026], ZW = 0.40, RW = 0.328;
  var IDL0 = { x: 2.956, z: 0.508, r: 0.28 }, SPR0 = { x: -2.749, z: 0.71, r: 0.295 };
  var RR0 = [1.89, 1.18, -0.25, -1.67], RRZ = 0.71, RRR = 0.10;
  /* hull (D1): nose, rear plate, belly, upper hull bottom, deck, sponson half width */
  var NOSE = 3.546, REAR = -3.339, BELLY = 0.44, SB = 0.97, DECK = 1.60, HW = 1.60, LW = 1.05;
  var SPLIT = 0.466;          /* between wheels 3 and 4: the Gepard's 8 cm stretch */
  var TX = 0.25;              /* turret ring centre (D1: midway along the turret's foot) */

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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
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
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams and plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
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
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
  /* f(x, y, z) -> [x, y, z] remaps every vertex before upload (the stretch, the turret offset) */
  function flush(THREE, group, B, f) {
    var k, b, geo, j, q;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (f) for (j = 0; j < b.P.length; j += 3) { q = f(b.P[j], b.P[j + 1], b.P[j + 2]); b.P[j] = q[0]; b.P[j + 1] = q[1]; b.P[j + 2] = q[2]; }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* drawn in the Leopard's coordinates; the Gepard's 8 cm stretch is applied at flush */
  function gz(x) { return 0.99 + (NOSE - x) * (DECK - 0.99) / (NOSE - 2.26); }   /* upper glacis */
  function addHull(B, gep) {
    var s, i, x, y, P = B.paint, D = B.dark;
    /* lower hull between the tracks: belly 0.44 m, the lower nose plate, the rear plate */
    prismY(P, [[REAR, 1.02], [REAR, 0.80], [REAR + 0.22, BELLY], [3.00, BELLY], [3.50, 0.95], [3.50, 1.02]], -LW, LW);
    /* upper hull over the tracks to the sponson sides (D1: deck 1.60 m; the bottom raised over
       the sprocket); the long shallow upper glacis from the nose up to the deck (D1, P2) */
    function sec(x, zb, zt) {
      return [[x, -HW, zb], [x, HW, zb], [x, HW, zt - 0.03], [x, HW - 0.03, zt], [x, -HW + 0.03, zt], [x, -HW, zt - 0.03]];
    }
    loftN(P, [sec(NOSE, SB, 1.03), sec(3.20, SB, gz(3.20)), sec(2.26, SB, DECK), sec(-2.35, SB, DECK),
              sec(-2.60, 1.12, DECK), sec(REAR, 1.12, DECK)]);
    /* the raised engine deck from the turret rear to the rear plate, rising aft (D1) */
    prismY(P, [[-1.05, DECK - 0.02], [-1.05, 1.66], [-3.22, 1.71], [REAR, 1.64], [REAR, DECK - 0.02]], -1.52, 1.52);
    /* engine deck grilles (D1 hatched deck; P1): two panels of slats either side of the centre */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) {
        x = -1.35 - i * 0.205;
        var zt = 1.66 + (-1.05 - x) * 0.05 / 2.17;
        box(D, x - 0.075, x + 0.075, s > 0 ? 0.12 : -1.38, s > 0 ? 1.38 : -0.12, zt - 0.01, zt + 0.018);
      }
      box(P, -3.20, -1.25, s > 0 ? 0.04 : -0.04 - 0.08, s > 0 ? 0.12 : -0.04, 1.66, 1.73);
    }
    /* the two rear towing / lifting eyes at the top corners of the rear plate (D1) */
    for (s = -1; s <= 1; s += 2) {
      cylY(D, REAR - 0.13, s * 1.22 - 0.04, s * 1.22 + 0.04, 1.71, 0.08, 12);
      box(P, REAR - 0.12, REAR + 0.02, s * 1.22 - 0.05, s * 1.22 + 0.05, 1.58, 1.68);
      /* the rear plate's lamp clusters and towing hooks low down */
      box(D, REAR - 0.06, REAR, s * 1.30 - 0.10, s * 1.30 + 0.10, 1.40, 1.52);
      box(D, REAR - 0.14, REAR, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.82, 0.94);
    }
    /* the louvred radiator grilles high on the rear hull sides (D1 px 1520-1740, P1, G1) */
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      box(D, REAR + 0.06, -2.14, s > 0 ? y : y - 0.012, s > 0 ? y + 0.012 : y, 1.28, 1.60);
      for (i = 0; i < 7; i++) {
        var zl = 1.31 + i * 0.042;
        box(P, REAR + 0.08, -2.16, s > 0 ? y + 0.012 : y - 0.03, s > 0 ? y + 0.03 : y - 0.012, zl, zl + 0.016);
      }
    }
    /* the front mudguard boxes over the track ends, standing proud of the glacis (D1, P2) */
    for (s = -1; s <= 1; s += 2) {
      prismY(P, [[2.85, 1.00], [3.56, 1.00], [3.56, 1.06], [3.28, 1.31], [2.85, 1.31]], s > 0 ? 1.07 : -HW - 0.03, s > 0 ? HW + 0.03 : -1.07);
      /* the headlamps in their guards at the glacis corners (P2) */
      var hx = 3.05, hy = s * 0.86, hz = gz(hx);
      cyl(P, [hx - 0.08, hy, hz + 0.10], [hx + 0.04, hy, hz + 0.10], 0.075, 0.08, 12);
      cyl(D, [hx + 0.04, hy, hz + 0.10], [hx + 0.05, hy, hz + 0.10], 0.065, 0.065, 12);
      box(D, hx - 0.10, hx + 0.08, hy - 0.13, hy - 0.11, hz, hz + 0.20);
      box(D, hx - 0.10, hx + 0.08, hy + 0.11, hy + 0.13, hz, hz + 0.20);
      box(D, hx + 0.06, hx + 0.08, hy - 0.13, hy + 0.13, hz + 0.18, hz + 0.20);
      /* the towing eyes on the lower nose */
      box(D, 3.42, 3.60, s * 0.70 - 0.05, s * 0.70 + 0.05, 0.80, 0.92);
    }
    /* the grouser racks across the glacis (P3: X grousers stowed on the front hull, 1A1) */
    for (i = 0; i < 4; i++) {
      x = 2.55 + i * 0.22;
      box(D, x - 0.02, x + 0.02, -0.80, 0.80, gz(x), gz(x) + 0.05);
    }
    /* driver's hatch front right (P2), the turret ring guard */
    box(P, 1.95, 2.35, -0.95, -0.50, DECK, DECK + 0.05);
    box(D, 2.22, 2.30, -0.88, -0.58, DECK + 0.05, DECK + 0.11);
    /* the hull side above the skirt / track: the tow cable and tool boxes on the sides (D1) */
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      cyl(D, [1.80, y + s * 0.03, 1.48], [-1.90, y + s * 0.03, 1.42], 0.022, 0.022, 6);
      box(P, -0.10, 0.60, s > 0 ? y : y - 0.06, s > 0 ? y + 0.06 : y, 1.30, 1.50);
    }
    if (!gep) {
      /* Leopard 1A1: the metal-rubber skirts in four panels (joints at D1 px 605, 885, 1170,
         1460) on a bolted rail, over the whole track run; outer face at 3.37 m */
      for (s = -1; s <= 1; s += 2) {
        var yo = s * 1.685, yi = s * 1.655, ya = Math.min(yo, yi), yb = Math.max(yo, yi);
        box(P, -3.30, 3.30, ya, yb, 0.83, 1.26);
        box(D, -3.30, 3.30, s > 0 ? yb - 0.006 : ya - 0.002, s > 0 ? yb + 0.002 : ya + 0.006, 1.21, 1.25);
        box(P, -3.30, 3.30, s > 0 ? HW : -1.685, s > 0 ? 1.685 : -HW, 1.24, 1.27);
        [2.89, 1.36, -0.20, -1.78].forEach(function (jx) {
          box(D, jx - 0.012, jx + 0.012, s > 0 ? yb - 0.006 : ya - 0.002, s > 0 ? yb + 0.002 : ya + 0.006, 0.84, 1.21);
        });
      }
    } else {
      /* Gepard: no skirts (G1, G4); the perforated bin lids along the hull sides (G1) */
      for (s = -1; s <= 1; s += 2) {
        y = s * HW;
        box(D, -1.90, 2.70, s > 0 ? y : y - 0.012, s > 0 ? y + 0.012 : y, 1.18, 1.36);
        for (i = 0; i < 6; i++) {
          x = 2.65 - i * 0.76;
          box(P, x - 0.015, x + 0.015, s > 0 ? y : y - 0.02, s > 0 ? y + 0.02 : y, 1.16, 1.38);
        }
        box(P, -1.95, 2.75, s > 0 ? y : y - 0.025, s > 0 ? y + 0.025 : y, 1.36, 1.40);
        /* the battery boxes on the rear fenders, behind the rear plate (en.wiki; G1: 0.58 m
           long, the lower rear face slanted) */
        prismY(P, [[REAR + 0.02, 1.08], [REAR - 0.45, 1.08], [REAR - 0.58, 1.30], [REAR - 0.58, 1.62], [REAR + 0.02, 1.62]],
               s > 0 ? 0.95 : -HW, s > 0 ? HW : -0.95);
        box(D, REAR - 0.60, REAR - 0.58, s * 1.28 - 0.08, s * 1.28 + 0.08, 1.40, 1.52);
      }
    }
    /* team colour: a plate on the rear deck */
    box(B.team, -2.95, -2.55, -0.55, 0.55, 1.70, 1.725);
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
  function gear(gep) {
    var dl = gep ? 0.08 : 0;
    function sx(x) { return x < SPLIT ? x - dl : x; }
    return { XW: XW0.map(sx), IDL: IDL0, SPR: { x: sx(SPR0.x), z: SPR0.z, r: SPR0.r }, RR: RR0.map(sx) };
  }
  function addRunning(B, G) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], TO = 0.035;
    for (i = 0; i < G.XW.length; i++) C.push([G.XW[i], ZW, RW + TO]);
    for (i = 0; i < G.RR.length; i++) C.push([G.RR[i], RRZ, RRR + TO]);
    C.push([G.IDL.x, G.IDL.z, G.IDL.r + TO], [G.SPR.x, G.SPR.z, G.SPR.r + TO]);
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
    cnt = Math.round(tot / 0.19); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the D640A track: double pins, the rubber pads, the centre guide horns */
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.03 - dz * 0.06, pz - dz * 0.03 + dx * 0.06, px + dx * 0.03 - dz * 0.06, pz + dz * 0.03 + dx * 0.06, y - 0.03, y + 0.03, 0.05);
      }
      /* the toothed drive sprocket at the REAR, raised (D1, G1) */
      cylY(B.dark, G.SPR.x, y - 0.13, y + 0.13, G.SPR.z, G.SPR.r - 0.05, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [G.SPR.x + ca * (G.SPR.r - 0.02), y, G.SPR.z + sa * (G.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.045, 0.12, 0.03);
      }
      cylY(B.paint, G.SPR.x, y + s * 0.13, y + s * 0.19, G.SPR.z, 0.17, 14);
      cylY(B.dark, G.SPR.x, y + s * 0.19, y + s * 0.22, G.SPR.z, 0.07, 10);
      /* the idler at the front (D1) */
      [-0.13, 0.13].forEach(function (dy) { cylY(B.paint, G.IDL.x, y + dy - 0.08, y + dy + 0.08, G.IDL.z, G.IDL.r, 18); });
      cylY(B.dark, G.IDL.x, y - 0.06, y + 0.06, G.IDL.z, G.IDL.r - 0.06, 14);
      cylY(B.dark, G.IDL.x, y + s * 0.21, y + s * 0.25, G.IDL.z, 0.08, 10);
      /* the four return rollers (en.wiki; G1/G4: over the gaps 1-2, 2-3, 4-5, 6-7) */
      for (i = 0; i < G.RR.length; i++) {
        cylY(B.paint, G.RR[i], y - 0.20, y + 0.20, RRZ, RRR, 12);
        cylY(B.dark, G.RR[i], y + s * 0.20, y + s * 0.24, RRZ, 0.045, 8);
      }
      /* the hull's swing-arm bosses behind each wheel */
      for (i = 0; i < G.XW.length; i++) cylY(B.dark, G.XW[i] + 0.22, s * 1.04, s * 1.12, ZW + 0.12, 0.08, 8);
    }
  }
  /* road wheel (D1, P1, G1): dual rubber-tyred discs, the dished face with the bolt circle and
     the hub; axle along Y, both sides */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addWheel(W) {
    var s, y, i, a, dy, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (dy = -1; dy <= 1; dy += 2) {
        var yc = y + dy * 0.135;
        W.col = TYRE;
        cylY(W, 0, yc - 0.085, yc + 0.085, 0, RW, 18);
        W.col = BODY;
        cylY(W, 0, yc - 0.09, yc + 0.09, 0, RW - 0.05, 18);
      }
      var yf = y + s * 0.225;
      W.col = BODY;
      cyl(W, [0, yf, 0], [0, yf + s * 0.025, 0], RW - 0.05, 0.16, 22);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        box(W, Math.cos(a) * 0.19 - 0.016, Math.cos(a) * 0.19 + 0.016, Math.min(yf + s * 0.018, yf + s * 0.028), Math.max(yf + s * 0.018, yf + s * 0.028), Math.sin(a) * 0.19 - 0.016, Math.sin(a) * 0.19 + 0.016);
      }
      W.col = RIB;
      cylY(W, 0, yf + s * 0.02, yf + s * 0.05, 0, 0.10, 12);
      W.col = HOLE;
      cylY(W, 0, yf + s * 0.05, yf + s * 0.065, 0, 0.045, 8);
    }
  }

  /* ------------------------------------------------------ Leopard 1A1 turret */
  /* built in model coordinates, moved onto the ring at flush.  Plan rings along X from D1's
     side view [x, foot z, roof z, half width]; widths from P2 (2.6 m) */
  var LT = [[1.83, 1.63, 1.80, 0.86], [1.62, 1.64, 2.15, 1.12], [1.39, 1.65, 2.36, 1.25], [0.90, 1.67, 2.39, 1.30],
            [0.00, 1.72, 2.39, 1.30], [-0.60, 1.76, 2.39, 1.22], [-0.91, 1.80, 2.37, 1.08], [-1.18, 1.83, 2.20, 0.92],
            [-1.37, 1.86, 1.98, 0.62]];
  var RING = [[-0.82, 0], [0.82, 0], [0.98, 0.2], [1, 0.42], [0.92, 0.72], [0.72, 0.94], [0.5, 1],
              [-0.5, 1], [-0.72, 0.94], [-0.92, 0.72], [-1, 0.42], [-0.98, 0.2]];
  function tsec(r) {
    var h = r[2] - r[1];
    return RING.map(function (p) { return [r[0], p[0] * r[3], r[1] + p[1] * h]; });
  }
  /* the turret's half width at (x, z), for parts on its side */
  function lside(x, z) {
    var i = 0, r0, r1, t, zb, zt, hw, f, k;
    while (i < LT.length - 2 && LT[i + 1][0] > x) i++;
    r0 = LT[i]; r1 = LT[i + 1]; t = (r0[0] - x) / (r0[0] - r1[0]);
    zb = r0[1] + (r1[1] - r0[1]) * t; zt = r0[2] + (r1[2] - r0[2]) * t; hw = r0[3] + (r1[3] - r0[3]) * t;
    f = Math.max(0, Math.min(1, (z - zb) / (zt - zb)));
    for (k = 1; k < 7; k++) if (RING[k][1] >= f) break;
    var a = RING[k - 1], b = RING[k], u = (f - a[1]) / ((b[1] - a[1]) || 1);
    return hw * (a[0] + (b[0] - a[0]) * u);
  }
  var GZ = 1.93;                /* gun axis (D1 py 267) */
  function addLeoTurret(B) {
    var P = B.paint, D = B.dark, s, i, x, y;
    loftN(P, LT.map(tsec));
    /* the cast mantlet: front face at X 2.13, its top sloping back to the roof (D1) */
    prismY(P, [[1.70, 1.62], [1.86, 1.63], [2.13, 1.80], [2.13, 2.03], [2.02, 2.13], [1.66, 2.27]], -0.50, 0.50);
    /* the 105 mm L7A3: the collar, the thermal sleeve's sections and bands, the fume extractor,
       the muzzle (D1 px 24-745; radii from D1's line widths) */
    cylX(D, 2.10, 2.81, 0, GZ, 0.115, 0.11, 16);
    cylX(D, 2.81, 3.30, 0, GZ, 0.095, 0.095, 14);
    cylX(D, 3.28, 3.85, 0, GZ, 0.135, 0.135, 16);
    cyl(D, [3.85, 0, GZ], [3.93, 0, GZ], 0.135, 0.09, 16);
    cylX(D, 3.93, 5.79, 0, GZ, 0.085, 0.085, 14);
    cylX(D, 5.79, 6.07, 0, GZ, 0.072, 0.072, 14);
    [5.66, 5.40, 5.10, 4.70, 4.40, 4.12].forEach(function (bx) { cylX(D, bx - 0.025, bx + 0.025, 0, GZ, 0.097, 0.097, 12); });
    box(D, 3.96, 4.08, -0.11, 0.11, GZ - 0.11, GZ + 0.11);
    /* the XSW-30-U searchlight box over the mantlet, offset LEFT (en.wiki; D1 px 700-835) */
    box(P, 1.63, 2.35, 0.05, 0.55, 2.25, 2.57);
    box(D, 2.35, 2.37, 0.09, 0.51, 2.29, 2.53);
    box(D, 1.80, 1.92, 0.24, 0.36, 2.10, 2.25);
    /* the TEM rangefinder's armoured heads, round, on both turret sides (en.wiki; D1 px 938,215) */
    for (s = -1; s <= 1; s += 2) {
      y = lside(1.07, 2.22);
      cylY(P, 1.07, s * (y - 0.18), s * (y + 0.07), 2.22, 0.165, 18);
      cylY(D, 1.07, s * (y + 0.07), s * (y + 0.085), 2.22, 0.12, 14);
      /* two banks of four smoke dischargers on the turret sides, firing forward and up (D1) */
      for (i = 0; i < 4; i++) {
        x = -0.36 - i * 0.15;
        var yb = s * (lside(x, 2.12) + 0.04);
        box(D, x - 0.06, x + 0.06, yb - 0.05, yb + 0.05, 2.04, 2.12);
        cyl(D, [x, yb, 2.12], [x + 0.11, yb + s * 0.08, 2.30], 0.045, 0.045, 8);
      }
      box(D, -0.88, -0.30, s * (lside(-0.6, 2.06) - 0.02) - 0.02, s * (lside(-0.6, 2.06) - 0.02) + 0.02, 2.02, 2.06);
      /* grab rails along the turret sides (D1 px 910-1240, py 270-290) */
      y = lside(0.0, 1.98);
      box(D, -0.60, 0.95, s > 0 ? y : -y - 0.03, s > 0 ? y + 0.03 : -y, 1.97, 1.99);
    }
    /* roof: the commander's cupola on the RIGHT with its periscope ring and the TRP periscope
       ahead of it (en.wiki); the loader's hatch on the LEFT with the MG3 on its skate rail */
    cylZ(P, -0.35, -0.50, 2.38, 2.50, 0.38, 20);
    for (i = 0; i < 8; i++) {
      var pa = i / 8 * TAU;
      box(D, -0.35 + Math.cos(pa) * 0.33 - 0.04, -0.35 + Math.cos(pa) * 0.33 + 0.04, -0.50 + Math.sin(pa) * 0.33 - 0.04, -0.50 + Math.sin(pa) * 0.33 + 0.04, 2.50, 2.56);
    }
    cylZ(P, -0.35, -0.50, 2.50, 2.56, 0.26, 16);
    box(P, 0.08, 0.30, -0.62, -0.38, 2.38, 2.58);
    box(D, 0.30, 0.31, -0.58, -0.42, 2.46, 2.55);
    cylZ(P, -0.35, 0.50, 2.38, 2.44, 0.36, 18);
    cylZ(P, -0.35, 0.50, 2.44, 2.47, 0.30, 16);
    cylZ(D, -0.35, 0.50, 2.44, 2.62, 0.035, 8);
    /* MG3 (D1 px 1000-1180): receiver, butt, barrel jacket, belt box */
    box(D, -0.55, 0.05, 0.47, 0.53, 2.62, 2.72);
    box(D, -0.75, -0.55, 0.48, 0.52, 2.60, 2.70);
    cylX(D, 0.05, 0.62, 0.50, 2.69, 0.03, 0.03, 8);
    cylX(D, 0.62, 0.78, 0.50, 2.69, 0.014, 0.014, 6);
    box(D, -0.30, -0.12, 0.53, 0.64, 2.56, 2.68);
    /* the radio antenna bases on the rear roof */
    cylZ(D, -0.78, 0.82, 2.37, 2.50, 0.04, 8);
    cylZ(D, -0.78, -0.82, 2.37, 2.50, 0.04, 8);
    /* the bustle basket (D1 px 1305-1480): floor, rails, posts */
    box(P, -1.88, -1.12, -0.95, 0.95, 1.88, 1.91);
    [[2.08, 0.025], [2.29, 0.03]].forEach(function (rz) {
      box(D, -1.88, -1.86, -0.95, 0.95, rz[0] - rz[1], rz[0] + rz[1]);
      box(D, -1.88, -1.05, 0.93, 0.95, rz[0] - rz[1], rz[0] + rz[1]);
      box(D, -1.88, -1.05, -0.95, -0.93, rz[0] - rz[1], rz[0] + rz[1]);
    });
    [[-1.87, 0.94], [-1.87, -0.94], [-1.50, 0.94], [-1.50, -0.94], [-1.87, 0], [-1.15, 0.94], [-1.15, -0.94]].forEach(function (p) {
      box(D, p[0] - 0.015, p[0] + 0.015, p[1] - 0.015, p[1] + 0.015, 1.89, 2.31);
    });
    box(P, -1.85, -1.20, -0.90, 0.90, 1.91, 2.06);   /* the stowage in it */
    /* team colour: two strips on the roof */
    box(B.team, -1.00, -0.75, -0.95, -0.25, 2.385, 2.40);
    box(B.team, -1.00, -0.75, 0.25, 0.95, 2.385, 2.40);
  }

  /* ---------------------------------------------------- Gepard turret (B2) */
  /* in model coordinates of the stretched hull; front between wheels 2 and 3 (G1), roof 2.86 m,
     gun axis 2.55 m, the gun housings out to the published 3.71 m width */
  var GR = 2.86, GA = 2.55, GPY = 1.575;
  function addGepTurret(B) {
    var P = B.paint, D = B.dark, s, i, x, y;
    /* the body: a tall box narrowing to the ring at its foot, the front face leaning back */
    function gs(xf, xb, hwT) {
      return [[xb, -1.00, 1.66], [xb, 1.00, 1.66], [xb + 0.02, hwT, 1.98], [xf, hwT, GR - 0.06], [xf - 0.05, hwT - 0.06, GR],
              [xf - 0.05, -hwT + 0.06, GR], [xf, -hwT, GR - 0.06], [xb + 0.02, -hwT, 1.98]];
    }
    var fr = gs(1.17, 1.02, 1.25), rr = gs(-1.89, -1.89, 1.25);
    loftN(P, [fr, rr]);
    /* the tracking radar on the turret front: round radome on a short neck (G2, G3, G1) */
    cylX(P, 1.05, 1.30, 0, 2.42, 0.20, 0.20, 14);
    cylX(P, 1.28, 1.62, 0, 2.42, 0.33, 0.34, 22);
    cyl(P, [1.62, 0, 2.42], [1.74, 0, 2.42], 0.34, 0.24, 22);
    cylX(D, 1.74, 1.76, 0, 2.42, 0.22, 0.22, 18);
    /* the gun housings and the 35 mm Oerlikon KDA guns outboard on both sides (G1-G4):
       housing X -1.60 to 0.60, trunnion X -0.9, barrels 3.15 m (90 cal, en.wiki) */
    for (s = -1; s <= 1; s += 2) {
      y = s * GPY;
      var hs = function (x, h) {
        return [[x, y - s * 0.27, GA - h], [x, y + s * 0.28, GA - h], [x, y + s * 0.28, GA + h * 0.8], [x, y + s * 0.18, GA + h],
                [x, y - s * 0.27, GA + h]];
      };
      loftN(P, [hs(0.60, 0.16), hs(0.30, 0.30), hs(-1.20, 0.30), hs(-1.60, 0.22)]);
      /* the trunnion boss joining it to the turret side */
      cylY(P, -0.90, s * 1.20, s * 1.32, GA - 0.02, 0.24, 16);
      /* barrel: cooled breech end, the tube, the muzzle velocity sensor ring and its frame */
      cylX(D, 0.55, 1.20, y, GA, 0.075, 0.065, 12);
      cylX(D, 1.20, 3.50, y, GA, 0.048, 0.042, 10);
      cylX(D, 3.50, 3.75, y, GA, 0.075, 0.075, 12);
      box(D, 3.42, 3.78, y - 0.012, y + 0.012, GA - 0.10, GA + 0.10);
      /* the AP ammunition feed box on the housing (G1) */
      box(P, -1.10, -0.40, y - 0.20, y + 0.20, GA + 0.24, GA + 0.40);
      /* four smoke dischargers low on each front cheek (G1, G2) */
      for (i = 0; i < 4; i++) {
        x = 0.92 - i * 0.12;
        cyl(D, [x, s * 1.18, 2.06], [x + 0.10, s * 1.24, 2.24], 0.045, 0.045, 8);
      }
      box(D, 0.45, 1.02, s * 1.22 - 0.06, s * 1.22 + 0.06, 1.98, 2.06);
      /* boxes at the turret's rear corners (G1, G3) */
      box(P, -2.42, -1.88, s > 0 ? 0.55 : -1.15, s > 0 ? 1.15 : -0.55, 2.05, 2.58);
      /* hatches */
      cylZ(P, -0.20, s * 0.55, GR, GR + 0.06, 0.30, 16);
      box(D, 0.05, 0.25, s * 0.55 - 0.18, s * 0.55 + 0.18, GR, GR + 0.14);
    }
    /* the stowage boxes on the roof (G1) */
    box(P, -1.55, -0.62, -0.35, 0.35, GR, GR + 0.32);
    box(D, -1.55, -0.62, -0.36, 0.36, GR + 0.14, GR + 0.16);
    /* the search radar: housing and column at the turret rear, the MPDR 12 antenna RAISED on
       its arm (G1-G4), its elliptical dish facing forward, the feed on its arm (G1, G3) */
    box(P, -2.38, -1.85, -0.42, 0.42, 1.95, GR + 0.10);
    cylZ(P, -2.12, 0, GR + 0.10, 3.30, 0.17, 14);
    box(P, -2.30, -1.95, -0.22, 0.22, 3.18, 3.36);
    var DW = 0.825, DH = 0.45, DZ = 3.75, DX = -2.05;
    for (i = -6; i < 6; i++) {
      var y0 = i / 6 * DW, y1 = (i + 1) / 6 * DW, ym = (y0 + y1) / 2, e = Math.sqrt(Math.max(0.05, 1 - (ym / DW) * (ym / DW)));
      var xo = DX + 0.30 * (ym / DW) * (ym / DW);
      box(P, xo - 0.04, xo + 0.02, y0, y1, DZ - DH * e, DZ + DH * e);
    }
    cylZ(P, -2.12, 0, 3.30, DZ - 0.30, 0.10, 10);
    cyl(P, [-2.05, 0, DZ - 0.38], [-1.60, 0, DZ - 0.25], 0.04, 0.04, 8);
    cyl(P, [-1.60, 0, DZ - 0.25], [-1.55, 0, DZ], 0.04, 0.04, 8);
    box(P, -1.65, -1.45, -0.10, 0.10, DZ - 0.08, DZ + 0.10);
    /* team colour: strips on the roof */
    box(B.team, 0.40, 0.75, -0.95, -0.25, GR, GR + 0.015);
    box(B.team, 0.40, 0.75, 0.25, 0.95, GR, GR + 0.015);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var gep = which === "gepard", T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    var G = gear(gep), dl = gep ? 0.08 : 0, tx = gep ? TX - dl : TX;
    addHull(HB, gep);
    flush(THREE, g, HB, function (x, y, z) { return [x < SPLIT ? x - dl : x, y, z]; });
    var RB = bins(T);
    addRunning(RB, G);
    flush(THREE, g, RB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (gep) addGepTurret(TB); else addLeoTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(tx, 0, DECK);
    /* the Leopard turret is drawn at the hull's X; the Gepard's in the stretched hull's */
    flush(THREE, tg, TB, function (x, y, z) { return [x - tx, y, z - DECK]; });
    g.add(tg);
    return g;
  }

  return { build: function (THREE, M, C) { return build(THREE, M, C, "leo1a1"); }, _build: build };
})();

var HeroGepard = (function () {
  "use strict";
  return { build: function (THREE, M, C) { return HeroLeopard1._build(THREE, M, C, "gepard"); } };
})();

/* len: the measured X extent of each build */
UNIT_MODELS["deu_e60_mbt"] = { len: 9.62, build: HeroLeopard1.build };
UNIT_MODELS["deu_e60_spaag"] = { len: 7.80, build: HeroGepard.build };
