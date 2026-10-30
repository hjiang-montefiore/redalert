/* ========== pla_zbd04.js - HERO model: ZBD-04A tracked infantry fighting vehicle ==========
   pla_e00_ifv   "ZBD-04 (2006), ZBD-04A (2014) infantry fighting vehicle".  Drawn as the
   ZBD-04A (WZ502G): the armour spec row names it, it is the vehicle in service now, and the
   four best photographs found are all of it.  The ZBD-04 (P5) differs in the bow (a BMP-3
   style trim-vane board, water-jet ports at the stern) and has no add-on armour boxes.

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e00_ifv_ref:
     P1  "ZBD-04A IFV 20170716.jpg" - front right 3/4, a little above: the long low hull, the
         tall add-on armour boxes on the hull side (bolted, flush with the roof), the lower
         skirt band under them with slanted ribs and a scalloped lower edge, SIX road wheels
         at an even pitch (gaps read 95/80/90/90/80 px), the raised drive sprocket at the
         FRONT about 1.35 pitches ahead of the first wheel, the raised spoked idler at the
         rear 0.85 of a pitch behind the last, the shallow glacis with its four blue covers,
         the turret aft of the middle with its rear basket.
     P2  "ZBD-04A Infantry fighting vehicles 20170902.jpg" - front left 3/4: the bow as one
         tall add-on panel face leaning out at the top, the very shallow glacis above it,
         the headlamps at the bow's top corners, the fender corner boxes over the sprockets,
         the toothed front sprocket, the turret's five smoke tubes a side.
     P3  "ZBD-04A rear 20170902.jpg" - rear left 3/4: six wheels and the spoked rear idler,
         the side boxes and the ribbed skirt band, the vertical rear plate with the door and
         the louvred vents low at the corners, the tail-lamp clusters, the big open rail
         basket on the turret rear, the aerials.
     P4  "ZBD-04A Turret front 20170919.jpg" - turret head-on: the low faceted BMP-3 style
         turret, the 100 mm gun-launcher in its thermal sleeve with two bands, the 30 mm
         alongside to STARBOARD tied to it by a bracket, five smoke tubes on each cheek,
         the gunner's sight box on the starboard roof, the square box with the X on the
         port roof (the fire-control radar box), the commander's sight post to port rear.
     P5  "ZBD-04 Infantry fighting vehicle during an anniversary parade.jpg" - the ZBD-04,
         near side-on: confirms six wheels at an even pitch (53/57/55/55/58 px), front
         sprocket, raised rear idler and the turret's place a little aft of the middle.
   Published (en.wikipedia "ZBD-04"): 7.2 x 3.2 x 2.5 m, 24 t (04A); crew 3 + 7; front engine
   (6V150), the driver front left, the turret in the middle, troops in the rear; 100 mm gun
   with the ZPT-99 30 mm coaxial cannon; 04A: applique armour and side skirts, 10 smoke
   dischargers (two more a side than the 04).

   Recognition list (what makes it read at game zoom, and its source):
     1. a long, low, flat-roofed box with tall slab sides (the add-on boxes) - P1, P3
     2. the tall bow panel and the long, very shallow glacis ahead of the turret - P1, P2
     3. six road wheels at an even pitch, raised FRONT sprocket and rear idler - P1, P3, P5
     4. the ribbed skirt band along the bottom of the side boxes - P1, P3
     5. turret aft of the middle, low and faceted, the long 100 mm with the thin 30 mm to
        starboard, five smoke tubes a cheek - P1, P3, P4
     6. the rail basket on the turret rear - P1, P3
     7. the vertical rear plate with the door and the corner vents - P3
   Paint: PLA green.  P4's plain green panels (sunlit #6c7a45) taken to about 0.8 of level ->
   #56613a.  All the photographs show the parade digital camouflage: not drawn.  No stars or
   numbers (P1, P2, P3, P5 carry them).
   NOT CONFIRMED, judgement calls: no side drawing was found, so every length is read from the
   3/4 photographs through their perspective and scaled to the published 7.2 m; the road wheel
   size (0.62 m) and pitch (0.74 m), the hull roof at 1.98 m (the published 2.5 m less the
   turret's 0.5 m), the box and skirt heights, the turret ring's place (x -0.75: P1 and P3
   disagree by about 0.7 m), the gun length (BMP-3 2A70 proportions), the rear door's outline,
   the roof hatches and the engine grille, the return rollers (hidden by the skirts; none
   drawn), the lower nose behind the bow panel.
   Triangles 12,732; 13 draw calls (hull 4, turret 3, six wheels); 5 materials.  Measured
   7.28 x 3.25 x 2.78 m to the sight tops (3.48 m to the whip): hull 7.24 m from the rear plate
   to the bow panel, the tow hooks and lamps add the rest; 3.20 m over the side boxes (bolt
   heads 3.25); turret roof 2.48 m.  Published 7.2 x 3.2 x 2.5 m.
   Materials: PAINT (canvas texture), DARK, GLASS (the glacis covers and sight glasses), WHEEL
   (vertex colours), team colour (C.team): a strip on the rear roof.  Nodes: "turret" (ring
   centre on the roof, guns along +X) and six "roadwheel" groups (both sides in one mesh).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZbd04 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#56613a", blots: ["#4c5633", "#606b42"], seed: 502 };
  /* running gear (P1, P3, P5): six wheels at an even pitch of 0.74 m, front sprocket, rear idler */
  var TY = 1.24, TW = 0.19;
  var XW = [1.35, 0.61, -0.13, -0.87, -1.61, -2.35], ZW = 0.38, RW = 0.31;
  var SPR = { x: 2.33, z: 0.66, r: 0.28 }, IDL = { x: -2.98, z: 0.56, r: 0.26 };
  /* hull: bow panel top, rear plate, belly, skirt band, side box, roof, upper hull half width,
     side box outer face */
  var NOSE = 3.62, REAR = -3.50, BELLY = 0.42, SK0 = 0.80, BX0 = 1.22, ROOF = 1.98, HW = 1.45, BW = 1.60;
  var GL = 1.75;                                  /* the glacis meets the roof */
  var TX = -0.75;                                 /* turret ring centre */

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
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
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
    T.glass = new THREE.MeshStandardMaterial({ color: 0x3a5872, roughness: 0.3, metalness: 0.2 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
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

  /* ---------------------------------------------------------------- hull */
  var GANG = Math.atan2(ROOF - 1.40, NOSE - GL);                 /* glacis slope, about 17 deg */
  function gz(x) { return ROOF - (x - GL) * Math.tan(GANG); }
  var GU = [Math.cos(GANG), 0, -Math.sin(GANG)], GW = [Math.sin(GANG), 0, Math.cos(GANG)];
  function onGlacis(bin, x, y, hu, hv, hw, lift) {
    slab(bin, [x, y, gz(x) + (lift || 0) + hw], GU, [0, 1, 0], GW, hu, hv, hw);
  }
  function addHull(B) {
    var s, i, x, y, ya, yb, yo;
    /* the lower hull between the tracks: belly, the lower nose rising to the bow panel, the
       vertical rear plate */
    prismY(B.paint, [[REAR + 0.25, BELLY], [2.60, BELLY], [3.36, 0.68], [3.36, 1.00], [REAR - 0.04, 1.00], [REAR - 0.04, 0.56]], -1.04, 1.04);
    /* the upper hull over the tracks: flat roof, the long shallow glacis (P1, P2) */
    prismY(B.paint, [[REAR, 1.02], [3.33, 1.02], [NOSE, 1.40], [GL, ROOF], [REAR, ROOF]], -HW, HW);
    /* the bow: one tall add-on panel face leaning out at the top (P2), its seams, and the
       headlamps at its top corners */
    var bA = [3.40, 0.64], bB = [NOSE, 1.40];
    prismY(B.paint, [[3.24, 0.64], bA, bB, [3.42, 1.40]], -HW, HW);
    var bl = Math.sqrt((bB[0] - bA[0]) * (bB[0] - bA[0]) + (bB[1] - bA[1]) * (bB[1] - bA[1]));
    var BU = [(bB[0] - bA[0]) / bl, 0, (bB[1] - bA[1]) / bl], BN = [BU[2], 0, -BU[0]];
    function onBow(bin, t, y, hu, hv, out) {
      var p = [bA[0] + BU[0] * t * bl + BN[0] * out, y, bA[1] + BU[2] * t * bl + BN[2] * out];
      slab(bin, p, BU, [0, 1, 0], BN, hu, hv, Math.abs(out) || 0.01);
    }
    [-0.98, -0.33, 0.33, 0.98].forEach(function (sy) { onBow(B.dark, 0.5, sy, bl * 0.5, 0.012, 0.010); });
    onBow(B.dark, 0.55, 0, 0.012, HW, 0.010);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) { onBow(B.dark, 0.25 + (i % 2) * 0.55, s * (0.15 + 0.62 * Math.floor(i / 2) + 0.15), 0.025, 0.025, 0.02); }
      cyl(B.paint, [NOSE - 0.12, s * 1.25, 1.30], [NOSE + 0.03, s * 1.25, 1.30], 0.09, 0.09, 12);
      cyl(B.glass, [NOSE + 0.03, s * 1.25, 1.30], [NOSE + 0.04, s * 1.25, 1.30], 0.075, 0.075, 12);
      /* towing eyes low on the bow panel */
      box(B.dark, 3.30, 3.48, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.70, 0.80);
    }
    /* the glacis: the four blue covers along its front edge (P1, P2, P4), the driver's
       hatch and periscopes front left, the engine grille front right (front engine) */
    [-1.05, -0.35, 0.35, 1.05].forEach(function (cy) { onGlacis(B.glass, 3.20, cy, 0.14, 0.28, 0.012, 0.0); });
    onGlacis(B.dark, 3.40, 0, 0.015, HW - 0.05, 0.012, 0.0);
    cylZ(B.paint, 1.45, 0.72, ROOF, ROOF + 0.07, 0.30, 16);
    box(B.dark, 1.70, 1.78, 0.62, 0.82, ROOF + 0.07, ROOF + 0.11);
    for (i = -1; i <= 1; i++) onGlacis(B.glass, 1.95, 0.72 + i * 0.18, 0.04, 0.07, 0.03, 0.0);
    onGlacis(B.paint, 2.45, -0.78, 0.55, 0.50, 0.025, 0.0);
    for (i = 0; i < 9; i++) onGlacis(B.dark, 2.00 + i * 0.11, -0.78, 0.018, 0.44, 0.012, 0.05);
    /* small fittings across the glacis and roof (P4): handles, the air intake cap */
    for (s = -1; s <= 1; s += 2) onGlacis(B.dark, 2.85, s * 0.25, 0.02, 0.10, 0.04, 0.0);
    cylZ(B.dark, 0.65, -0.95, ROOF, ROOF + 0.10, 0.11, 10);
    for (s = -1; s <= 1; s += 2) {
      ya = s > 0 ? HW - 0.01 : -BW; yb = s > 0 ? BW : -HW + 0.01; yo = s * BW;
      /* the add-on armour boxes on the hull side, flush with the roof, following the glacis
         at the front (P1, P2, P3); panel seams and bolt rows */
      prismY(B.paint, [[REAR + 0.02, BX0], [3.05, BX0], [3.05, gz(3.05)], [GL, ROOF], [REAR + 0.02, ROOF]], ya, yb);
      [-2.45, -1.35, -0.25, 0.85, 1.95].forEach(function (sx) {
        box(B.dark, sx - 0.012, sx + 0.012, s > 0 ? yo : yo - 0.008, s > 0 ? yo + 0.008 : yo, BX0 + 0.03, Math.min(ROOF, gz(sx)) - 0.03);
      });
      for (x = REAR + 0.25; x < 2.95; x += 0.55) {
        [BX0 + 0.10, ROOF - 0.12].forEach(function (bz) {
          if (bz > gz(x) - 0.08) return;
          box(B.dark, x - 0.025, x + 0.025, s > 0 ? yo : yo - 0.025, s > 0 ? yo + 0.025 : yo, bz - 0.025, bz + 0.025);
        });
      }
      /* the skirt band under the boxes, its slanted ribs leaning forward (P1, P3) */
      var y0 = s > 0 ? HW - 0.01 : -BW + 0.03, y1 = s > 0 ? BW - 0.03 : -HW + 0.01, yr = s * (BW - 0.03);
      prismY(B.paint, [[REAR + 0.12, SK0 + 0.06], [2.70, SK0], [3.05, BX0 - 0.12], [3.05, BX0], [REAR + 0.02, BX0]], y0, y1);
      box(B.dark, REAR + 0.05, 3.02, s > 0 ? yr : yr - 0.02, s > 0 ? yr + 0.02 : yr, BX0 - 0.03, BX0);
      for (i = 0; i < 13; i++) {
        x = -3.15 + i * 0.48;
        belt(B.dark, x, SK0 + 0.10, x + 0.16, BX0 - 0.08, s > 0 ? yr : yr - 0.025, s > 0 ? yr + 0.025 : yr, 0.035);
      }
      /* the front fender over the sprocket and the corner box under the headlamp (P2) */
      belt(B.paint, 2.95, SK0 + 0.10, 3.36, 0.66, s > 0 ? 1.04 : -BW + 0.03, s > 0 ? BW - 0.03 : -1.04, 0.04);
      box(B.paint, 3.05, 3.40, s > 0 ? 1.18 : -BW + 0.03, s > 0 ? BW - 0.03 : -1.18, 0.86, 1.18);
      box(B.dark, 3.40, 3.42, s * 1.38 - 0.10, s * 1.38 + 0.10, 0.95, 1.10);
      /* rear: the tail-lamp clusters on the box ends, the louvred vents low at the corners (P3) */
      box(B.dark, REAR - 0.03, REAR + 0.02, s * 1.50 - 0.08, s * 1.50 + 0.08, ROOF - 0.20, ROOF - 0.10);
      box(B.glass, REAR - 0.035, REAR - 0.03, s * 1.50 - 0.06, s * 1.50 + 0.06, ROOF - 0.18, ROOF - 0.12);
      for (i = 0; i < 4; i++) box(B.dark, REAR - 0.07, REAR - 0.04, s * 0.80 - 0.20, s * 0.80 + 0.20, 0.62 + i * 0.075, 0.64 + i * 0.075);
      box(B.dark, REAR - 0.12, REAR - 0.04, s * 0.45 - 0.06, s * 0.45 + 0.06, 0.58, 0.68);
    }
    /* the rear door in the middle of the rear plate, hinges, vision block, handle (P3) */
    box(B.paint, REAR - 0.05, REAR, -0.50, 0.50, 0.95, ROOF - 0.12);
    [1.15, 1.65].forEach(function (hz) { box(B.dark, REAR - 0.08, REAR, -0.58, -0.46, hz - 0.05, hz + 0.05); });
    box(B.glass, REAR - 0.06, REAR - 0.05, -0.10, 0.10, 1.55, 1.65);
    box(B.dark, REAR - 0.10, REAR - 0.05, 0.30, 0.38, 1.25, 1.40);
    /* rear roof: two troop hatches, the team strip on the rear edge */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.25, -2.55, s * 0.55 - 0.33, s * 0.55 + 0.33, ROOF, ROOF + 0.04);
      box(B.dark, -2.67, -2.61, s * 0.55 - 0.08, s * 0.55 + 0.08, ROOF + 0.04, ROOF + 0.08);
    }
    box(B.team, -3.46, -3.32, -0.95, 0.95, ROOF, ROOF + 0.015);
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
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
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
    cnt = Math.round(tot / 0.20); step = tot / cnt;
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
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the toothed drive sprocket at the FRONT (P1, P2, P5) */
      cylY(B.dark, SPR.x, y - 0.12, y + 0.12, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.12, y + s * 0.17, SPR.z, 0.15, 14);
      /* the spoked idler at the rear (P1, P3): rim, six spokes, hub */
      cylY(B.paint, IDL.x, y - 0.16, y + 0.16, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.16, y + s * 0.17, IDL.z, IDL.r - 0.05, 18);
      for (i = 0; i < 6; i++) {
        var ia = i / 6 * TAU;
        slab(B.paint, [IDL.x + Math.cos(ia) * 0.11, y + s * 0.175, IDL.z + Math.sin(ia) * 0.11], [Math.cos(ia), 0, Math.sin(ia)], [0, 1, 0], [-Math.sin(ia), 0, Math.cos(ia)], 0.10, 0.012, 0.03);
      }
      cylY(B.dark, IDL.x, y + s * 0.16, y + s * 0.22, IDL.z, 0.07, 10);
    }
  }
  /* road wheel (P1, P3): rubber tyre, a dished disc, the hub with its bolt circle */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.17, y + 0.17, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.17, 0], [0, y + s * 0.20, 0], RW - 0.05, 0.13, 20);
      W.col = RIB;
      cylY(W, 0, y + s * 0.19, y + s * 0.22, 0, 0.10, 12);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        box(W, Math.cos(a) * 0.065 - 0.012, Math.cos(a) * 0.065 + 0.012, s > 0 ? y + 0.215 : y - 0.23, s > 0 ? y + 0.23 : y - 0.215, Math.sin(a) * 0.065 - 0.012, Math.sin(a) * 0.065 + 0.012);
      }
      cylY(W, 0, y + s * 0.22, y + s * 0.24, 0, 0.035, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* plan half outlines (x, y) from the ring centre, front to rear: the BMP-3 style faceted
     turret (P4, the gun fit is the BMP-3's), 1.8 m long, 0.50 m over the roof, cheeks 1.0 m
     from the centre line (P4: the smoke tubes stand just inside the hull's box faces) */
  var TPL = [
    { z: -0.02, H: [[0.86, 0.36], [0.72, 0.68], [0.40, 1.00], [-0.55, 1.00], [-0.86, 0.78], [-0.92, 0.38]] },
    { z: 0.26, H: [[0.80, 0.36], [0.66, 0.66], [0.36, 0.96], [-0.55, 0.96], [-0.86, 0.76], [-0.92, 0.37]] },
    { z: 0.50, H: [[0.50, 0.30], [0.40, 0.50], [0.18, 0.74], [-0.52, 0.76], [-0.74, 0.60], [-0.78, 0.30]] }
  ];
  function ringAt(H, z) {
    var Q = [], i;
    for (i = 0; i < H.length; i++) Q.push([H[i][0], H[i][1], z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0], -H[i][1], z]);
    return Q;
  }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  var GZ = 0.25;
  function addTurret(B) {
    var R = [], i, s, q, x, k;
    for (i = 0; i < TPL.length; i++) R.push(ringAt(TPL[i].H, TPL[i].z));
    loftN(B.paint, R);
    /* the mantlet block and its face, the cloth gun cover at its root (P4) */
    box(B.paint, 0.70, 1.00, -0.46, 0.40, 0.04, 0.44);
    belt(B.paint, 1.00, 0.06, 1.08, 0.40, -0.42, 0.36, 0.06);
    cylX(B.dark, 1.06, 1.25, 0.04, GZ, 0.17, 0.13, 14);
    /* 100 mm gun-launcher: thermal sleeve with two bands (P4), barrel, muzzle */
    cylX(B.paint, 1.25, 2.30, 0.04, GZ, 0.095, 0.085, 14);
    cylX(B.dark, 2.30, 3.30, 0.04, GZ, 0.062, 0.058, 14);
    cylX(B.paint, 1.70, 1.80, 0.04, GZ, 0.10, 0.10, 14);
    cylX(B.paint, 2.20, 2.30, 0.04, GZ, 0.10, 0.10, 14);
    cylX(B.dark, 3.18, 3.32, 0.04, GZ, 0.075, 0.075, 14);
    /* the 30 mm alongside to starboard, its muzzle, the bracket tying it to the 100 mm (P4);
       the coaxial machine gun to port */
    cylX(B.dark, 1.06, 1.40, -0.28, GZ - 0.02, 0.055, 0.045, 12);
    cylX(B.paint, 1.40, 2.30, -0.28, GZ - 0.02, 0.040, 0.036, 10);
    cylX(B.dark, 2.30, 2.90, -0.28, GZ - 0.02, 0.026, 0.025, 10);
    cylX(B.dark, 2.85, 2.98, -0.28, GZ - 0.02, 0.038, 0.038, 10);
    box(B.paint, 2.16, 2.26, -0.28, 0.04, GZ - 0.05, GZ + 0.02);
    cylX(B.dark, 1.00, 1.30, 0.30, GZ - 0.06, 0.018, 0.016, 8);
    /* gunner's sight box on the starboard roof, its glass (P4) */
    box(B.paint, 0.02, 0.40, -0.66, -0.32, 0.48, 0.72);
    box(B.glass, 0.40, 0.41, -0.60, -0.38, 0.56, 0.68);
    box(B.paint, 0.10, 0.30, -0.56, -0.42, 0.72, 0.78);
    /* the square box with the X on the port roof (P4), the commander's sight post behind (P4) */
    box(B.paint, 0.02, 0.44, 0.30, 0.72, 0.48, 0.74);
    slab(B.dark, [0.445, 0.51, 0.61], [0, Math.cos(0.55), Math.sin(0.55)], [0, -Math.sin(0.55), Math.cos(0.55)], [1, 0, 0], 0.24, 0.012, 0.006);
    slab(B.dark, [0.445, 0.51, 0.61], [0, Math.cos(0.55), -Math.sin(0.55)], [0, Math.sin(0.55), Math.cos(0.55)], [1, 0, 0], 0.24, 0.012, 0.006);
    cylZ(B.paint, -0.30, 0.55, 0.48, 0.58, 0.10, 12);
    box(B.paint, -0.42, -0.16, 0.44, 0.66, 0.58, 0.72);
    box(B.glass, -0.16, -0.15, 0.48, 0.62, 0.61, 0.69);
    for (s = -1; s <= 1; s += 2) {
      /* hatches: commander to port, gunner to starboard */
      cylZ(B.paint, -0.45, s * 0.38, 0.46, 0.54, 0.24, 16);
      cylZ(B.dark, -0.45, s * 0.38, 0.54, 0.555, 0.20, 14);
      /* five smoke tubes on each front cheek, raked forward and up (P2, P4: 10 in all) */
      box(B.paint, 0.10, 0.74, s * 0.88 - 0.06, s * 0.88 + 0.06, 0.24, 0.32);
      for (q = 0; q < 5; q++) {
        x = 0.14 + q * 0.13;
        cyl(B.dark, [x, s * (0.88 - q * 0.02), 0.30], [x + 0.12, s * (0.92 - q * 0.02), 0.47], 0.040, 0.040, 8);
      }
    }
    /* the open rail basket on the turret rear (P1, P3): two rails round, posts, the floor */
    var BX1 = -0.82, BX2 = -1.55, BY = 0.86;
    box(B.dark, BX2, BX1, -BY, BY, 0.10, 0.13);
    for (k = 0; k < 2; k++) {
      var rz = 0.30 + k * 0.24;
      box(B.dark, BX2, BX1, BY - 0.025, BY, rz, rz + 0.025);
      box(B.dark, BX2, BX1, -BY, -BY + 0.025, rz, rz + 0.025);
      box(B.dark, BX2, BX2 + 0.025, -BY, BY, rz, rz + 0.025);
    }
    for (i = 0; i <= 10; i++) { var py = -BY + i * (2 * BY / 10); box(B.dark, BX2, BX2 + 0.022, py - 0.011, py + 0.011, 0.10, 0.55); }
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i <= 4; i++) { var px = BX2 + i * ((BX1 - BX2) / 4); box(B.dark, px - 0.011, px + 0.011, s > 0 ? BY - 0.022 : -BY, s > 0 ? BY : -BY + 0.022, 0.10, 0.55); }
    /* aerial bases at the turret's rear corners (P3, P4), the whip on the starboard one (P3) */
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, -0.70, s * 0.66, 0.46, 0.58, 0.04, 8);
    cylZ(B.dark, -0.70, -0.66, 0.58, 1.50, 0.008, 5);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB);
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
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, ROOF);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e00_ifv"] = { len: 7.28, build: HeroZbd04.build };
