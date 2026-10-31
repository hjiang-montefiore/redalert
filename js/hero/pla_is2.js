/* ============ pla_is2.js - HERO model: IS-2 heavy tank (Soviet-supplied, PLA) ============
   Key: pla_e50_heavy  "IS-2 heavy tank (Soviet-supplied)" (row service 1950, turret:true).
   Drawn as the tanks the PLA received with the Korean War aid: the 1944-45 production IS-2
   (the "1944 model") - the straightened one-piece upper glacis with the driver's slit (no
   stepped front, no visor plug), the cast turret with the commander's cupola at the rear
   left, the 122 mm D-25T with its double-baffle muzzle brake, the 12.7 mm DShK on the
   loader's hatch ring (fitted from early 1945 on, carried by the PLA tanks in P1), the ball
   DT in the turret's rear boss, six double road wheels and three return rollers a side, the
   front idler the same as a road wheel, the rear sprocket, the cylindrical external fuel
   tanks on the rear fenders.  BEFORE the IS-2M rebuild (no T-10M wheels, no side boxes).

   START: js/hero/pla_t3485.js (HeroT3485): its geometry kit, materials, flush, the hull's
   station-table loft and the track wrap are copied; the numbers below are all new.

   References (Wikimedia Commons, cached in scratchpad/q_pla_e50_heavy_ref):
     D1  "IS-2 scheme.jpg" (1600 x 446) - side elevation (port side, nose LEFT) and front
         elevation of the straightened-glacis IS-2, the one drawing measured from.  Ground
         at y 442.  The drawing is NOT quite isotropic against the published figures: the
         hull 772..1595 px (823 px) and the front view's track span 22..397 px (375 px)
         give 0.00823 / 0.00819 m a pixel from the 6.77 m hull and 3.07 m width, while the
         550 mm road wheel (70 px across) and the 2.63-2.73 m height (340 px to the cupola)
         give 0.00786.  Taken: lengths and widths at 0.0082 m/px, heights at 0.00786 m/px
         (so the wheels are 550 mm and the height lands between the two published values).
         Measured off it (model x = (1183.5 - px) * 0.0082, z = (442 - py) * 0.00786):
         road wheel centres 916, 1019, 1128, 1236, 1347, 1443 px -> x 2.20, 1.35, 0.46,
         -0.43, -1.34, -2.14, axle z 0.33; idler (825, 346) -> 2.95 / 0.755; sprocket
         (1522, 350) -> -2.78 / 0.72, teeth to r 0.37; return rollers 965, 1186, 1393 px
         -> 1.80, -0.02, -1.72 at z 0.86, r 0.18; fenders at z 1.19, the front mudguard
         drooping from x 2.78 to the nose at z 1.07; hull roof z 1.58; the upper rear plate
         from (1495, 235) to (1595, 325) = 49 deg from the vertical, its foot (the tail) at
         z 0.92; the turret body from px 975 to 1290 (2.6 m), roof z 2.36, its foot at
         z 1.67 forward and 1.76 aft; the rounded cast mantlet from px 902 to 975 (0.6 m
         deep), 0.86 m wide and 0.65 m tall in the front view; the gun's armoured collar
         0.41 m across, 882..902 px; gun axis z 1.95; the cupola 0.9 m across over its base
         ring, centred 0.39 m behind the ring centre and 0.47 m left (front view), top at
         2.65; the ventilator dome on the roof centre-line 0.55 m ahead of the ring centre;
         the loader's periscope at the right front; the rear DT boss at z 1.98; the two
         tandem cylindrical fuel tanks on each rear fender (side view rectangles px 1243..
         1370 and 1370..1493 with strap lines; the front view shows them as circles
         overhanging the track edge), centre z 1.42; front view: turret 2.30 m wide at its
         foot, 1.84 m over the roof edge (sides 20 deg); hull roof 2.30 m wide; the upper
         glacis 2.30 m wide at the roof narrowing to 1.58 m at the nose joint (the cast
         nose's cheeks); the nose joint at about fender height (z 1.10); belly between the
         tracks 1.68 m wide; spare links on the lower nose; the headlamp on the left of the
         glacis; the driver's slit on the centre-line.  The drawing's muzzle (px 425) puts
         the gun 0.2 m short of the published 9.83 m: the tube is taken from the figure.
     P1  "IS-2 in China Anniversary Parade.jpg" - PLA IS-2s on Tiananmen Square (1950s
         parade), front left 3/4: the straightened glacis between the mudguards, the
         rounded cast turret, the long tube and the box double-baffle brake with its
         windows, the DShK raised on its mount at the rear of the turret roof, the
         cupola, the six wheels; plain green (numbers and stars NOT drawn).
     P2  "IS-2 heavy tank, Polish Army open-air Museum, Warsaw, Poland.jpg" - a 1944-model
         IS-2, front right 3/4: the flat upper glacis wedge with its cheeks narrowing to
         the nose, the spare links across the lower plate, the flat mudguards and their
         ends, the cylindrical fuel tank on the rear fender, the turret's sloped sides and
         rounded rear, the mantlet's curve, the brake's two windows a side.
   Published (ru.wikipedia IS-2, en.wikipedia IS-2): hull 6.77 m, 9.83 m with the gun
   (en: 9.90); width 3.07 m (en 3.09); height 2.63 m (en 2.73); clearance 0.42 m; upper
   glacis 120 mm at 60 deg, lower plate 100 mm at -30 deg; upper sides 90-120 mm at 15 deg;
   upper rear plate at 49 deg, lower at -41 deg; turret sides 20 deg, rear 30 deg; turret
   ring 1800 mm; D-25T 122 mm L/48; six cast double road wheels of 550 mm a side on
   torsion bars, the idler identical to them, three return rollers, rear sprocket; DShK on
   the loader's hatch from 1945; DT coaxial and in the turret rear ball; driver central.

   CORRECTIONS against the generic model (armour_specs "ww2" hull, "cast" turret, 6
   christie wheels of 0.6 m, no return rollers): the hull is 6.77 m with the cast nose
   and its straight 60 deg upper glacis and narrowing cheeks, the 15 deg upper sides and
   the 49 deg upper rear plate; six small 550 mm wheels at the measured pitch with three
   return rollers, the idler at the front and the sprocket at the rear; the long cast
   turret 2.6 m with the big rounded mantlet; the 122 mm tube with the box double-baffle
   brake; the DShK on the loader's ring; the external tanks are cylinders on the rear
   fenders, not drums on the deck.

   Recognition list (what makes it read at game zoom, and its source):
     1. the long rounded cast turret with the deep curved mantlet, set at mid-hull -
        D1, P1, P2
     2. the very long 122 mm tube with the box double-baffle brake - D1, P1, P2
     3. the straight upper glacis wedge with cheeks narrowing to the nose - D1, P2
     4. six small double road wheels a side, three return rollers, the idler like a road
        wheel, the big rear sprocket - D1
     5. the commander's cupola at the rear left, the DShK on the loader's ring - D1, P1
     6. the two tandem cylindrical fuel tanks on each rear fender - D1, P2
     7. flat fenders the length of the hull, the front mudguard drooping to the nose - D1, P2
     8. the 49 deg upper rear plate with the exhaust cowls - D1
     9. spare links on the lower nose, the headlamp on the left of the glacis - D1, P2
   Paint: the PLA set's green as in pla_t3485.js (#505a39); P1 is black and white.  No
   stars, numbers, slogans or museum markings (P1 carries turret numbers and stars, P2 a
   museum finish: none drawn).
   NOT CONFIRMED, judgement calls: the scale split above (0.0082 / 0.00786 m a px); the
   nose joint's height (D1's front view, z 1.10; the 60 deg glacis then reaches the roof
   at x 2.55) and the cheeks' run (from the roof's front edge); the turret's plan (no top
   view: half widths 0.80 at the face behind the mantlet, 1.15 over the ring, 0.60 at the
   rear boss; only the front-view widths are measured); the turret ring centre (0.52 m
   ahead of mid-hull, from the turret body's middle); the loader's hatch position (right,
   level with the cupola) and the DShK's elevation (P1 shows it raised; drawn at 18 deg);
   the brake's width (0.30 m) and window count (two a side); the road wheel's cast pattern
   (D1's ring of radial slots, 16 drawn); the engine deck's louvres and hatch (no view of
   the deck: generic); the exhaust cowls' shape; the track link count (86 a side); the
   long fender box and tow cable along the side (D1 shows a long item, read as a box);
   the driver's roof periscopes.  NOT DRAWN: radio aerial, unditching log, tools, spare
   barrel-cleaning rods, the fender rubber flaps.

   TURRET: the node "turret" holds the turret, mantlet, gun, cupola, hatches and the DShK;
   origin on the turret ring's centre at the hull roof (x 0.52, z 1.58), gun along +X.
   Nodes: "turret", six "roadwheel" groups (axle along local Y, both sides).
   Materials: PAINT (canvas texture: base, mottling, weld seams, grime; metre UVs), DARK
   (track, fittings, bores, lenses, the DShK), WHEEL (road wheels, idler, rollers and
   sprocket: discs, slots, rims, hubs by vertex colour), and the team colour exactly as handed in (C.team): two small plates (engine
   hatch, loader's hatch).
   Draw calls: hull 3 + the static gear (idler, return rollers, sprocket) 1 + turret 3 +
   6 wheels = 13.
   Size as built: 9.95 m long (tow hooks to muzzle; 9.83 m published from the tail joint);
   3.07 m over the tracks, 3.26 m over the fuel tanks, which overhang the track edge as in
   D1's front view; 2.66 m to the cupola's periscope (published 2.63 / 2.73 m), 3.23 m to
   the raised DShK's muzzle.
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroIs2 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---------------------------------------------------------- dimensions
     hull 6.77 m between the nose and tail joints (published); belly at the 0.42 m
     clearance; fenders / sponson floor ZS; the nose joint NZ (D1 front view); the tail
     joint TZ (D1); the hull roof (D1) */
  var NOSE = 3.385, TAIL = -3.385, ZB = 0.42, ZS = 1.19, NZ = 1.10, TZ = 0.92, ROOF = 1.58;
  var WB = 0.84, WS = 1.25, WN = 0.80;
  var TG = Math.tan(60 * Math.PI / 180), T30 = Math.tan(30 * Math.PI / 180);
  var T49 = Math.tan(49 * Math.PI / 180), T41 = Math.tan(41 * Math.PI / 180), S15 = Math.tan(15 * Math.PI / 180);
  var XRF = NOSE - (ROOF - NZ) * TG;          /* front edge of the roof, 2.55 */
  var XDK = TAIL + (ROOF - TZ) * T49;         /* rear edge of the roof, -2.63 (D1 -2.56) */
  var WR = WS - (ROOF - ZS) * S15;            /* roof half width, 1.15 (D1 front view 1.15) */
  var PAINT = { base: "#505a39", blots: ["#465031", "#5a6441"], seed: 240 };

  /* running gear (D1; published 550 mm wheels, 650 mm track, 3.07 m over the tracks) */
  var TY = 1.21, TW = 0.325;
  var XW = [2.20, 1.35, 0.46, -0.43, -1.34, -2.14], ZW = 0.33, RW = 0.275;
  var IDL = { x: 2.95, z: 0.755, r: 0.275 }, SPR = { x: -2.78, z: 0.72, r: 0.34 };
  var XROLL = [1.80, -0.02, -1.72], ZROLL = 0.86, RROLL = 0.18;
  /* the turret (D1): ring centre, roof above the hull roof, gun axis; the muzzle at the
     published 9.83 m from the tail */
  var TX = 0.52, RZ = 2.36 - ROOF, GZ = 1.95 - ROOF, MUZ = TAIL + 9.83 - TX;

  /* ------------------------------------------------------------ geometry kit */
  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (dot(cr, cr) < 1e-14) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
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
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* an ellipsoid about C with semi axes rx, ry, rz (polar axis X), smooth; xcut trims the
     back at C[0] + xcut * rx so a boss can sit on a plate */
  function ellip(bin, C, rx, ry, rz, seg, stk, xcut) {
    var V = [], N = [], F = [], i, j, th, ph, nv, rows = [], lo = xcut === undefined ? -1 : xcut;
    var t0 = Math.acos(Math.max(-1, Math.min(1, lo)));
    V.push([C[0] + rx, C[1], C[2]]); N.push([1, 0, 0]);
    for (i = 1; i <= stk; i++) {
      th = t0 * i / stk; rows.push(V.length);
      for (j = 0; j < seg; j++) {
        ph = j / seg * TAU;
        nv = [Math.cos(th), Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph)];
        V.push([C[0] + nv[0] * rx, C[1] + nv[1] * ry, C[2] + nv[2] * rz]);
        N.push(unit([nv[0] / rx, nv[1] / ry, nv[2] / rz]));
      }
    }
    for (j = 0; j < seg; j++) F.push([0, rows[0] + (j + 1) % seg, rows[0] + j]);
    for (i = 0; i + 1 < rows.length; i++) for (j = 0; j < seg; j++) {
      var a = rows[i] + j, b = rows[i] + (j + 1) % seg, c = rows[i + 1] + (j + 1) % seg, d = rows[i + 1] + j;
      F.push([a, b, c], [a, c, d]);
    }
    var last = rows[rows.length - 1], cc = V.length;
    V.push([C[0] + rx * Math.cos(t0), C[1], C[2]]); N.push([-1, 0, 0]);
    for (j = 0; j < seg; j++) F.push([last + j, last + (j + 1) % seg, cc]);
    solid(bin, V, F, N);
  }
  /* a dome standing on a plane: base centre C, axis N (unit), base radius R across the
     in-plane axis U and the axis V = N x U, height H; smooth, base capped */
  function dome(bin, C, N, U, R, R2, H, seg, stk) {
    var V2 = cross(N, U), V = [], Nn = [], F = [], i, j, t, h, r, ph, rows = [];
    for (i = 0; i <= stk; i++) {
      t = i / stk * Math.PI / 2; h = Math.sin(t) * H; r = Math.cos(t);
      rows.push(V.length);
      for (j = 0; j < seg; j++) {
        ph = j / seg * TAU;
        var cu = Math.cos(ph) * R * r, cv = Math.sin(ph) * R2 * r;
        V.push([C[0] + N[0] * h + U[0] * cu + V2[0] * cv, C[1] + N[1] * h + U[1] * cu + V2[1] * cv, C[2] + N[2] * h + U[2] * cu + V2[2] * cv]);
        var gn = add(mul(N, Math.sin(t) / H), add(mul(U, Math.cos(ph) * Math.cos(t) / R), mul(V2, Math.sin(ph) * Math.cos(t) / R2)));
        Nn.push(unit(gn));
      }
    }
    for (i = 0; i < stk; i++) for (j = 0; j < seg; j++) {
      var a = rows[i] + j, b = rows[i] + (j + 1) % seg, c = rows[i + 1] + (j + 1) % seg, d = rows[i + 1] + j;
      F.push([a, b, c], [a, c, d]);
    }
    var cb = V.length; V.push(C.slice()); Nn.push(mul(N, -1));
    for (j = 0; j < seg; j++) F.push([cb, rows[0] + (j + 1) % seg, rows[0] + j]);
    solid(bin, V, F, Nn);
  }
  /* a closed solid lofted through rings of [x, y, z] points (same count, each convex); ends capped */
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
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* hull paint: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling of the brushed 4BO green,
     weld seams with their bead highlight, rain streaks and grime (P1, P2) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "is2" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 7; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and chipped wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
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
  /* the upper glacis: one straightened plate at 60 deg from the vertical, nose joint to
     the roof (ru.wiki, D1, P2) */
  var UF = unit([-TG, 0, 1]), NF = unit([1, 0, TG]);
  function glacisZ(x) { return NZ + (NOSE - x) / TG; }
  function onFront(z, y, h) { var x = NOSE - (z - NZ) * TG; return add([x, y, z], mul(NF, h || 0)); }
  /* the lower nose plate at 30 deg, leaning back from the joint (ru.wiki) */
  var UL = unit([T30, 0, 1]), NL = unit([1, 0, -T30]);
  function onLow(z, y, h) { var x = NOSE - (NZ - z) * T30; return add([x, y, z], mul(NL, h || 0)); }
  /* the upper rear plate at 49 deg (ru.wiki, D1) */
  var UR = unit([T49, 0, 1]), NR = unit([-1, 0, T49]);
  function rearZ(x) { return TZ + (x - TAIL) / T49; }
  function onRear(z, y, h) { var x = TAIL + (z - TZ) * T49; return add([x, y, z], mul(NR, h || 0)); }
  var XBF = NOSE - (NZ - ZB) * T30, XBR = TAIL + (TZ - ZB) * T41;
  function bellyZ(x) {
    if (x > XBF) return ZB + (x - XBF) / T30;
    if (x < XBR) return ZB + (XBR - x) / T41;
    return ZB;
  }
  function topZ(x) {
    if (x >= XRF) return glacisZ(x);
    if (x >= XDK) return ROOF;
    return rearZ(x);
  }
  /* the cast nose's cheeks: the side plates turn in from the roof's front edge to the
     nose joint (D1 front view: 2.30 m at the roof, 1.58 m at the joint; P2) */
  var XFS = NOSE - (ZS - NZ) * TG, XRS = TAIL + (ZS - TZ) * T49;
  function wSide(x) {
    if (x <= XRF) return WS;
    return WS + (WN - WS) * Math.min(1, (x - XRF) / (XFS - XRF));
  }
  /* station table: x where the glacis and the rear plate cross the sponson floor are
     doubled so the sponsons close cleanly */
  var ST = [[NOSE], [3.31], [XFS, 1], [XFS, 2], [3.10], [XBF], [2.85], [2.70], [XRF],
            [1.50], [0.50], [-0.50], [-1.50], [-2.30], [XDK], [-2.80], [XBR], [XRS, 2], [XRS, 1], [-3.24], [TAIL]];
  function ring(x, mode) {
    var zT = topZ(x), zB = bellyZ(x), w, ws, zs;
    if (mode === 1 || (mode !== 2 && zT <= ZS + 1e-6)) {
      zs = Math.max(zB, Math.min(zT, ZS));
      return [[x, WB, zB], [x, WB, zs], [x, WB, zs], [x, WB, zT], [x, -WB, zT], [x, -WB, zs], [x, -WB, zs], [x, -WB, zB]];
    }
    zT = Math.max(zT, ZS);
    ws = wSide(x);
    w = ws - (zT - ZS) * S15;
    return [[x, WB, zB], [x, WB, ZS], [x, ws, ZS], [x, w, zT], [x, -w, zT], [x, -ws, ZS], [x, -WB, ZS], [x, -WB, zB]];
  }
  function addHull(B) {
    var R = [], i, k, k1, a, b, c, d, e, dy, dz, n, s, y, p, P0;
    for (i = 0; i < ST.length; i++) R.push(ring(ST[i][0], ST[i][1]));
    n = R[0].length;
    for (i = 0; i + 1 < R.length; i++) {
      var flat = Math.abs(R[i][0][0] - R[i + 1][0][0]) < 1e-6;
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        e = flat ? [-1, 0, 0] : [0, dz, -dy];
        if (!flat && Math.abs(dy) + Math.abs(dz) < 1e-6) { dy = c[1] - d[1]; dz = c[2] - d[2]; e = [0, dz, -dy]; }
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    }
    for (k = 1; k + 1 < n; k++) {
      triN(B.paint, R[0][0], R[0][k], R[0][k + 1], [1, 0, 0]);
      triN(B.paint, R[R.length - 1][0], R[R.length - 1][k], R[R.length - 1][k + 1], [-1, 0, 0]);
    }

    for (s = -1; s <= 1; s += 2) {
      var yo = s * (TY + TW), yi = s * (WB + 0.01), ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      var ye0 = s > 0 ? TY + TW - 0.03 : -(TY + TW), ye1 = s > 0 ? TY + TW : -(TY + TW) + 0.03;
      /* the flat fender the length of the hull, its turned-down outer lip (D1, P2) */
      belt(B.paint, -3.00, ZS + 0.01, 2.78, ZS + 0.01, ylo, yhi, 0.025);
      belt(B.paint, -3.00, ZS - 0.03, 2.78, ZS - 0.03, ye0, ye1, 0.08);
      /* the front mudguard drooping to the nose (D1: x 2.78 to 3.39, down to z 1.07) */
      belt(B.paint, 2.78, ZS + 0.01, 3.12, ZS - 0.03, ylo, yhi, 0.025);
      belt(B.paint, 3.12, ZS - 0.03, 3.40, 1.07, ylo, yhi, 0.025);
      belt(B.paint, 2.78, ZS - 0.03, 3.12, ZS - 0.07, ye0, ye1, 0.08);
      belt(B.paint, 3.12, ZS - 0.07, 3.40, 1.03, ye0, ye1, 0.08);
      /* the rear mudguard, a short droop at the tail */
      belt(B.paint, -3.00, ZS + 0.01, -3.22, 1.08, ylo, yhi, 0.025);
      /* the side plate's foot strip along the fender */
      var nE = unit([0, s * 1, S15]), uE = unit([0, -s * S15, 1]);
      /* the two tandem cylindrical fuel tanks on each rear fender, straps and brackets
         (D1 side and front views, P2) */
      var ty = s * 1.41, tz = 1.42;
      [[-0.49, -1.53], [-1.57, -2.55]].forEach(function (q) {
        cylX(B.paint, q[1], q[0], ty, tz, 0.21, 0.21, 18);
        cylX(B.paint, q[0] - 0.02, q[0] + 0.01, ty, tz, 0.19, 0.17, 16);
        cylX(B.paint, q[1] - 0.01, q[1] + 0.02, ty, tz, 0.17, 0.19, 16);
        [q[0] - 0.22, q[1] + 0.22].forEach(function (xs) {
          cylX(B.dark, xs - 0.02, xs + 0.02, ty, tz, 0.218, 0.218, 18);
          box(B.dark, xs - 0.03, xs + 0.03, Math.min(ty, s * 1.20), Math.max(ty, s * 1.20), ZS, ZS + 0.06);
        });
        cylZ(B.dark, (q[0] + q[1]) / 2, ty, tz + 0.18, tz + 0.25, 0.045, 8);
      });
      /* the long stowage box on the front fender against the side (D1) */
      box(B.paint, -0.35, 1.45, Math.min(s * 1.28, s * 1.50), Math.max(s * 1.28, s * 1.50), ZS, ZS + 0.19);
      box(B.dark, -0.33, 1.43, Math.min(s * 1.29, s * 1.49), Math.max(s * 1.29, s * 1.49), ZS + 0.19, ZS + 0.205);
      [0.10, 1.00].forEach(function (xh) {
        box(B.dark, xh - 0.04, xh + 0.04, s > 0 ? 1.50 : -1.515, s > 0 ? 1.515 : -1.50, ZS + 0.08, ZS + 0.15);
      });
      /* the tow cable along the upper side plate, its eyes forward */
      p = add([1.95, s * (WS - 0.28 * S15), ZS + 0.28], mul(nE, 0.035));
      P0 = add([-0.30, s * (WS - 0.28 * S15), ZS + 0.28], mul(nE, 0.035));
      cyl(B.dark, p, P0, 0.024, 0.024, 6);
      cyl(B.dark, add(p, [0, 0, -0.06]), add(P0, [0, 0, -0.06]), 0.024, 0.024, 6);
      for (k = 0; k < 3; k++) {
        var xc = 1.70 - k * 0.95;
        slab(B.dark, add([xc, s * (WS - 0.25 * S15), ZS + 0.25], mul(nE, 0.03)), [1, 0, 0], uE, nE, 0.03, 0.07, 0.03);
      }
      /* bump stops over each road wheel and the torsion arms trailing from pivots ahead of
         the axles (D1) */
      var ya = s * (WB + 0.03), yb = s * (WB + 0.09);
      for (i = 0; i < XW.length; i++) {
        box(B.paint, XW[i] - 0.08, XW[i] + 0.08, Math.min(ya, yb), Math.max(ya, yb), 0.63, 0.76);
        box(B.dark, XW[i] - 0.06, XW[i] + 0.06, Math.min(ya, yb) - 0.005, Math.max(ya, yb) + 0.005, 0.61, 0.635);
        var pv = [XW[i] + 0.36, s * 0.92, 0.53], hb = [XW[i], s * 0.92, ZW];
        var ua = unit(sub(pv, hb));
        slab(B.paint, mul(add(pv, hb), 0.5), ua, [0, 1, 0], unit(cross(ua, [0, 1, 0])), 0.22, 0.045, 0.06);
        cylY(B.paint, pv[0], s * WB, s * 0.98, pv[2], 0.085, 12);
        cylY(B.dark, hb[0], s * WB, s * 0.99, hb[2], 0.06, 10);
      }
      /* the idler's crank and the final drive housing */
      box(B.dark, IDL.x - 0.32, IDL.x, s > 0 ? WB - 0.01 : -WB - 0.05, s > 0 ? WB + 0.05 : -WB + 0.01, IDL.z - 0.05, IDL.z + 0.05);
      cylY(B.paint, SPR.x, s * WB, s * (TY - 0.22), SPR.z, 0.22, 16);
    }

    /* --- the glacis ------------------------------------------------------------ */
    var HV = [0, 1, 0];
    /* the driver's vision slit on the centre-line with its armoured lip (D1 front view; the
       1944 plate has no visor plug, ru.wiki) */
    slab(B.paint, onFront(1.43, 0, 0.03), UF, HV, NF, 0.06, 0.22, 0.03);
    slab(B.dark, onFront(1.39, 0, 0.012), UF, HV, NF, 0.025, 0.15, 0.012);
    /* the headlamp on the left of the glacis on a bracket (D1, P2) and the horn right */
    P0 = onFront(1.40, 0.62, 0);
    box(B.dark, P0[0] - 0.04, P0[0] + 0.04, P0[1] - 0.03, P0[1] + 0.03, P0[2] - 0.02, P0[2] + 0.12);
    cylX(B.paint, P0[0] - 0.08, P0[0] + 0.08, P0[1], P0[2] + 0.17, 0.085, 0.09, 14);
    cylX(B.dark, P0[0] + 0.08, P0[0] + 0.092, P0[1], P0[2] + 0.17, 0.075, 0.075, 14);
    P0 = onFront(1.36, -0.55, 0.04);
    cylX(B.dark, P0[0] - 0.04, P0[0] + 0.08, P0[1], P0[2] + 0.04, 0.04, 0.06, 10);
    /* the cast nose's weld bead at the glacis' foot */
    slab(B.dark, onFront(NZ + 0.01, 0, 0.005), UF, HV, NF, 0.01, WN - 0.04, 0.01);
    /* spare links across the lower plate, two rows of four (D1 front view, P2) */
    for (k = 0; k < 8; k++) {
      y = -0.39 + (k % 4) * 0.26;
      var zl = k < 4 ? 0.93 : 0.68;
      slab(B.dark, onLow(zl, y, 0.025), UL, HV, NL, 0.11, 0.12, 0.022);
      slab(B.dark, onLow(zl, y, 0.055), UL, HV, NL, 0.09, 0.022, 0.016);
      slab(B.dark, onLow(zl, y + 0.07, 0.07), UL, HV, NL, 0.04, 0.03, 0.04);
    }
    slab(B.dark, onLow(0.81, 0, 0.05), UL, HV, NL, 0.015, 0.55, 0.015);
    /* towing hooks on the lower plate */
    for (s = -1; s <= 1; s += 2) {
      p = onLow(0.55, s * 0.62, 0);
      box(B.dark, p[0] - 0.08, p[0] + 0.10, s * 0.62 - 0.05, s * 0.62 + 0.05, p[2] - 0.05, p[2] + 0.05);
      box(B.dark, p[0] + 0.04, p[0] + 0.12, s * 0.62 - 0.05, s * 0.62 + 0.05, p[2] - 0.12, p[2] - 0.02);
    }
    /* the driver's two roof periscopes behind the glacis */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 2.30, 2.46, s * 0.22 - 0.08, s * 0.22 + 0.08, ROOF, ROOF + 0.06);
      box(B.paint, 2.34, 2.46, s * 0.22 - 0.06, s * 0.22 + 0.06, ROOF + 0.06, ROOF + 0.12);
      box(B.dark, 2.46, 2.47, s * 0.22 - 0.045, s * 0.22 + 0.045, ROOF + 0.07, ROOF + 0.11);
    }
    /* the roof's edge strips and the turret ring's collar */
    box(B.dark, XDK + 0.01, XRF - 0.01, WR - 0.03, WR - 0.01, ROOF, ROOF + 0.012);
    box(B.dark, XDK + 0.01, XRF - 0.01, -WR + 0.01, -WR + 0.03, ROOF, ROOF + 0.012);
    cylZ(B.dark, TX, 0, ROOF - 0.01, ROOF + 0.02, 1.00, 28);

    /* --- engine deck behind the turret: central access hatch, louvred intakes both sides,
       the transverse rear grille (generic: no deck view, see NOT CONFIRMED) --- */
    box(B.paint, -1.95, -1.05, -0.42, 0.42, ROOF, ROOF + 0.05);
    box(B.dark, -1.12, -1.02, -0.06, 0.06, ROOF + 0.05, ROOF + 0.09);
    box(B.team, -1.82, -1.58, -0.26, 0.26, ROOF + 0.05, ROOF + 0.058);
    for (s = -1; s <= 1; s += 2) {
      var yl0 = s * 0.52, yl1 = s * 0.98;
      box(B.dark, -2.22, -1.00, Math.min(yl0, yl1), Math.max(yl0, yl1), ROOF - 0.01, ROOF + 0.02);
      for (k = 0; k < 9; k++) box(B.paint, -2.19 + k * 0.135, -2.13 + k * 0.135, Math.min(yl0, yl1) + 0.02, Math.max(yl0, yl1) - 0.02, ROOF + 0.02, ROOF + 0.05);
    }
    box(B.dark, XDK + 0.02, -2.30, -0.98, 0.98, ROOF - 0.01, ROOF + 0.05);
    for (k = 0; k < 10; k++) box(B.paint, XDK + 0.03, -2.31, -0.96 + k * 0.21, -0.94 + k * 0.21, ROOF + 0.05, ROOF + 0.065);

    /* --- the upper rear plate: two armoured exhaust cowls, the round transmission hatch,
       bolts, tow hooks at the tail joint (D1) --- */
    for (s = -1; s <= 1; s += 2) {
      slab(B.dark, onRear(1.22, s * 0.62, 0.006), UR, [0, 1, 0], NR, 0.24, 0.14, 0.008);
      slab(B.paint, onRear(1.24, s * 0.62, 0.10), UR, [0, 1, 0], NR, 0.20, 0.12, 0.09);
      var po = onRear(1.10, s * 0.62, 0.11);
      cyl(B.paint, add(po, mul(UR, 0.08)), add(po, [-0.14, 0, -0.18]), 0.07, 0.065, 12);
      cyl(B.dark, add(po, [-0.14, 0, -0.18]), add(po, [-0.148, 0, -0.19]), 0.05, 0.05, 10);
      box(B.dark, TAIL - 0.08, TAIL + 0.04, s * 0.68 - 0.05, s * 0.68 + 0.05, TZ - 0.08, TZ + 0.06);
      box(B.dark, TAIL - 0.12, TAIL - 0.04, s * 0.68 - 0.05, s * 0.68 + 0.05, TZ - 0.14, TZ - 0.02);
    }
    p = onRear(1.26, 0, 0);
    cyl(B.paint, p, add(p, mul(NR, 0.04)), 0.26, 0.25, 20);
    cyl(B.dark, add(p, mul(NR, 0.04)), add(p, mul(NR, 0.06)), 0.05, 0.05, 8);
    for (k = 0; k < 12; k++) {
      p = onRear(1.50, -0.99 + k * 0.18, 0.0);
      cyl(B.dark, p, add(p, mul(NR, 0.025)), 0.02, 0.018, 6);
    }
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    for (i = 0; i < XROLL.length; i++) C.push([XROLL[i], ZROLL, RROLL + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
    pts = [];
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
    /* 86 cast links of 650 mm a side, a horned link then a plain one */
    cnt = 86; step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.01, y + TW - 0.01, 0.035);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.068, pz - dz * 0.068, px + dx * 0.068, pz + dz * 0.068, y - TW, y + TW, 0.05);
        belt(B.dark, px - dx * 0.02 + dz * 0.025, pz - dz * 0.02 - dx * 0.025, px + dx * 0.02 + dz * 0.025, pz + dz * 0.02 - dx * 0.025, y - TW + 0.03, y + TW - 0.03, 0.02);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.035 - dz * 0.07, pz - dz * 0.035 + dx * 0.07, px + dx * 0.035 - dz * 0.07, pz + dz * 0.035 + dx * 0.07, y - 0.035, y + 0.035, 0.09);
      }
    }
  }

  /* the static running gear in the wheel material, so it reads against the hull: return
     rollers (D1: three small double rollers on stub axles) and the rear drive sprocket
     (two toothed rings of 14 teeth on removable rims, ru.wiki; the drum between them, the
     outer hub cover and its bolts, D1) */
  function addGear(W) {
    var s, y, i, j, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIM = [rr * 0.78, gg * 0.78, bb * 0.80], TREAD = [0.30, 0.30, 0.29],
        DK = [0.12, 0.125, 0.11], LIP = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < XROLL.length; i++) {
        W.col = TREAD;
        cylY(W, XROLL[i], y - 0.21, y - 0.06, ZROLL, RROLL, 16);
        cylY(W, XROLL[i], y + 0.06, y + 0.21, ZROLL, RROLL, 16);
        W.col = BODY;
        cylY(W, XROLL[i], y + s * 0.21, y + s * 0.22, ZROLL, RROLL - 0.03, 16);
        W.col = LIP;
        cylY(W, XROLL[i], y + s * 0.22, y + s * 0.245, ZROLL, 0.07, 10);
        W.col = DK;
        cylY(W, XROLL[i], y - 0.06, y + 0.06, ZROLL, RROLL - 0.05, 12);
        cylY(W, XROLL[i], s * WB, y - s * 0.21, ZROLL, 0.05, 8);
      }
      [[y - 0.20, y - 0.13], [y + 0.13, y + 0.20]].forEach(function (yy) {
        W.col = BODY;
        cylY(W, SPR.x, yy[0], yy[1], SPR.z, SPR.r - 0.03, 20);
        W.col = RIM;
        for (j = 0; j < 14; j++) {
          var ra = (j + 0.5) / 14 * TAU, u = [Math.cos(ra), 0, Math.sin(ra)], w = [-Math.sin(ra), 0, Math.cos(ra)];
          slab(W, [SPR.x + u[0] * (SPR.r + 0.005), (yy[0] + yy[1]) / 2, SPR.z + u[2] * (SPR.r + 0.005)], u, [0, 1, 0], w, 0.04, 0.035, 0.035);
        }
      });
      W.col = DK;
      cylY(W, SPR.x, y - 0.13, y + 0.13, SPR.z, 0.20, 12);
      W.col = LIP;
      cylY(W, SPR.x, y + s * 0.20, y + s * 0.235, SPR.z, 0.16, 14);
      for (i = 0; i < 8; i++) {
        var rb = i / 8 * TAU;
        cylY(W, SPR.x + Math.cos(rb) * 0.12, y + s * 0.235, y + s * 0.25, SPR.z + Math.sin(rb) * 0.12, 0.02, 6);
      }
      W.col = BODY;
      cylY(W, SPR.x, y + s * 0.235, y + s * 0.255, SPR.z, 0.06, 8);
    }
  }

  /* road wheel pair (D1: cast double wheels, a ring of radial slots, a raised hub with
     eight bolts, steel rims; the idler is the same wheel, ru.wiki); cx, cz offset it */
  function addWheel(W, cx, cz) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIM = [rr * 0.78, gg * 0.78, bb * 0.80], TREAD = [0.30, 0.30, 0.29],
        SLOT = [0.07, 0.075, 0.06], HUB = [rr * 0.92, gg * 0.92, bb * 0.92], LIP = [rr * 1.3, gg * 1.3, bb * 1.3];
    function C3(p) { return [p[0] + cx, p[1], p[2] + cz]; }
    function cy3(A, B, r0, r1, seg, nocap) { cyl(W, C3(A), C3(B), r0, r1, seg, nocap); }
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      [[y - 0.245, y - 0.075, -1], [y + 0.075, y + 0.245, 1]].forEach(function (wq) {
        /* out: the face away from the pair's centre (the outer wheel's outside face, the
           inner wheel's hull-side face) */
        var y0 = wq[0], y1 = wq[1], out = (y0 + y1) / 2 > y ? 1 : -1, j;
        /* the steel rim and its worn tread */
        W.col = TREAD;
        cy3([0, y0 + 0.02, 0], [0, y1 - 0.02, 0], RW, RW, 20, true);
        W.col = RIM;
        cy3([0, y0, 0], [0, y0 + 0.02, 0], RW - 0.01, RW, 20, true);
        cy3([0, y1 - 0.02, 0], [0, y1, 0], RW, RW - 0.01, 20, true);
        /* the face: a lip ring, the dish down to the hub, both sides of the pair */
        [[y0, -1], [y1, 1]].forEach(function (fq) {
          var yy = fq[0], o = fq[1];
          W.col = LIP;
          cy3([0, yy, 0], [0, yy + o * 0.01, 0], RW - 0.005, RW - 0.03, 20, true);
          W.col = BODY;
          cy3([0, yy + o * 0.01, 0], [0, yy - o * 0.03, 0], RW - 0.03, 0.12, 20, true);
        });
        /* sixteen radial slots on the outer face of each wheel (D1) */
        var yfc = out > 0 ? y1 : y0, show = out === s;
        W.col = SLOT;
        for (j = 0; j < (show ? 16 : 0); j++) {
          a = (j + 0.5) / 16 * TAU;
          var u = [Math.cos(a), 0, Math.sin(a)], w = [-Math.sin(a), 0, Math.cos(a)], rm = 0.19;
          slab(W, C3([u[0] * rm, yfc - out * (0.03 * (rm - 0.12) / (RW - 0.15)) + out * 0.004, u[2] * rm]), u, [0, 1, 0], w, 0.045, 0.006, 0.011);
        }
        /* the hub boss, bolts, cap */
        W.col = HUB;
        cy3([0, yfc - out * 0.03, 0], [0, yfc + out * 0.02, 0], 0.12, 0.10, 16);
        W.col = LIP;
        for (j = 0; j < (show ? 8 : 0); j++) {
          a = j / 8 * TAU;
          cy3([Math.cos(a) * 0.08, yfc + out * 0.015, Math.sin(a) * 0.08], [Math.cos(a) * 0.08, yfc + out * 0.03, Math.sin(a) * 0.08], 0.013, 0.013, 5);
        }
        W.col = HUB;
        cy3([0, yfc + out * 0.02, 0], [0, yfc + out * 0.045, 0], 0.06, 0.045, 10);
      });
      /* the axle between the pair */
      W.col = SLOT;
      cy3([0, y - 0.075, 0], [0, y + 0.075, 0], 0.09, 0.09, 10, true);
    }
  }

  /* ------------------------------------------------------------- the turret */
  /* turret frame: origin on the ring centre at the hull roof, gun along +X.  Stations from
     D1 (x ahead of the ring centre, foot and roof heights absolute), the half widths from
     the front view's 2.30 m and the photographs' plan (see NOT CONFIRMED) */
  var TS = [
    [1.20, 1.72, 2.20, 0.80], [1.12, 1.68, 2.31, 0.98], [0.95, 1.67, 2.36, 1.10],
    [0.50, 1.67, 2.36, 1.15], [0.00, 1.68, 2.36, 1.15], [-0.50, 1.70, 2.36, 1.11],
    [-0.95, 1.72, 2.35, 1.00], [-1.18, 1.74, 2.27, 0.88], [-1.32, 1.76, 2.10, 0.74],
    [-1.38, 1.78, 1.92, 0.58]];
  /* the cast section: 20 deg sides (ru.wiki; front view 2.30 m at the foot, 1.84 m over
     the roof's edge) rolling into a flat roof */
  var SEC = [[0.96, 0], [1.0, 0.12], [0.92, 0.55], [0.84, 0.82], [0.72, 0.95], [0.45, 1.0],
             [-0.45, 1.0], [-0.72, 0.95], [-0.84, 0.82], [-0.92, 0.55], [-1.0, 0.12], [-0.96, 0]];
  function tw(x) {
    for (var i = 0; i + 1 < TS.length; i++) if (x <= TS[i][0] && x >= TS[i + 1][0]) {
      var t = (x - TS[i + 1][0]) / (TS[i][0] - TS[i + 1][0]);
      return TS[i + 1][3] + (TS[i][3] - TS[i + 1][3]) * t;
    }
    return 0.8;
  }
  function addTurret(B) {
    var L = [], i, k, s, a, t, zb, zt, w, p, CX, CY;
    for (i = 0; i < TS.length; i++) {
      t = TS[i]; zb = t[1] - ROOF; zt = t[2] - ROOF; w = t[3];
      L.push(SEC.map(function (q) { return [t[0], q[0] * w, zb + q[1] * (zt - zb)]; }));
    }
    loftN(B.paint, L);
    /* the ring housing under it, standing on the roof */
    cylZ(B.paint, 0, 0, -0.005, 0.11, 0.95, 32);
    /* the deep rounded cast mantlet across the front (D1: 0.6 m deep, 0.72 m tall;
       front view 0.86 m wide) */
    var MZ = 2.01 - ROOF;
    cyl(B.paint, [1.43, -0.43, MZ], [1.43, 0.43, MZ], 0.36, 0.36, 24);
    /* the gun's armoured collar (D1: 0.41 m across, 0.2 m proud) and its flange */
    cylX(B.paint, 1.66, 1.95, 0, GZ, 0.205, 0.19, 20);
    cylX(B.paint, 1.86, 1.90, 0, GZ, 0.215, 0.215, 20);
    /* the coaxial DT's port right of the gun, the sight's aperture left */
    cylX(B.dark, 1.74, 1.82, -0.27, GZ + 0.03, 0.03, 0.03, 8);
    box(B.dark, 1.70, 1.78, 0.22, 0.31, GZ + 0.10, GZ + 0.16);
    /* the D-25T tube: thicker at the collar, tapering, the muzzle swell, the box
       double-baffle brake with two windows a side (D1, P1, P2) */
    var XB = MUZ - 0.42;
    cylX(B.paint, 1.95, 3.20, 0, GZ, 0.095, 0.085, 18);
    cylX(B.paint, 3.20, XB - 0.10, 0, GZ, 0.082, 0.072, 18);
    cylX(B.paint, XB - 0.10, XB, 0, GZ, 0.072, 0.085, 18);
    slab(B.paint, [XB + 0.21, 0, GZ], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.21, 0.14, 0.115);
    [XB + 0.015, XB + 0.20, MUZ - 0.02].forEach(function (xb) {
      slab(B.paint, [xb, 0, GZ], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.022, 0.155, 0.13);
    });
    for (s = -1; s <= 1; s += 2) {
      [XB + 0.11, XB + 0.30].forEach(function (xw) {
        box(B.dark, xw - 0.065, xw + 0.065, s > 0 ? 0.135 : -0.145, s > 0 ? 0.145 : -0.135, GZ - 0.085, GZ + 0.085);
      });
    }
    cylX(B.dark, MUZ - 0.001, MUZ + 0.003, 0, GZ, 0.062, 0.062, 12);

    /* the commander's cupola at the rear left (D1 side and front views): base ring, the
       drum with six vision blocks, the two-piece hatch, its periscope */
    CX = -0.39; CY = 0.47;
    cylZ(B.paint, CX, CY, RZ - 0.14, RZ + 0.03, 0.42, 26);
    cylZ(B.paint, CX, CY, RZ + 0.03, RZ + 0.19, 0.36, 26);
    for (k = 0; k < 6; k++) {
      a = (k / 6) * TAU + 0.26;
      slab(B.dark, [CX + Math.cos(a) * 0.362, CY + Math.sin(a) * 0.362, RZ + 0.12], [-Math.sin(a), Math.cos(a), 0], [Math.cos(a), Math.sin(a), 0], [0, 0, 1], 0.08, 0.008, 0.022);
      slab(B.paint, [CX + Math.cos(a) * 0.37, CY + Math.sin(a) * 0.37, RZ + 0.165], [-Math.sin(a), Math.cos(a), 0], [Math.cos(a), Math.sin(a), 0], [0, 0, 1], 0.10, 0.025, 0.012);
    }
    dome(B.paint, [CX, CY, RZ + 0.19], [0, 0, 1], [1, 0, 0], 0.33, 0.33, 0.07, 22, 4);
    box(B.dark, CX - 0.30, CX + 0.30, CY - 0.008, CY + 0.008, RZ + 0.19, RZ + 0.25);
    box(B.paint, CX + 0.05, CX + 0.17, CY + 0.06, CY + 0.16, RZ + 0.22, RZ + 0.30);
    box(B.dark, CX + 0.17, CX + 0.18, CY + 0.08, CY + 0.14, RZ + 0.23, RZ + 0.28);

    /* the loader's hatch on the right with the DShK on its ring (ru.wiki: from 1945; P1),
       the team plate on the hatch */
    var LX = -0.30, LY = -0.47;
    cylZ(B.paint, LX, LY, RZ - 0.10, RZ + 0.04, 0.33, 24);
    cylZ(B.dark, LX, LY, RZ + 0.04, RZ + 0.07, 0.34, 24);
    cylZ(B.paint, LX, LY, RZ + 0.04, RZ + 0.08, 0.27, 20);
    box(B.team, LX - 0.10, LX + 0.10, LY - 0.14, LY + 0.14, RZ + 0.08, RZ + 0.088);
    box(B.dark, LX - 0.30, LX - 0.22, LY - 0.12, LY + 0.12, RZ + 0.05, RZ + 0.11);
    /* the DShK: pintle at the rear of the ring, cradle, receiver, ribbed barrel, muzzle
       brake, the ammunition box on the left, spade grips, the K-8T collimator */
    var PV = [LX - 0.30, LY, RZ + 0.42], el = 18 * Math.PI / 180, dG = [Math.cos(el), 0, Math.sin(el)], nG = [-Math.sin(el), 0, Math.cos(el)];
    cylZ(B.dark, PV[0], PV[1], RZ + 0.05, PV[2] - 0.04, 0.035, 8);
    box(B.dark, PV[0] - 0.05, PV[0] + 0.05, PV[1] - 0.07, PV[1] + 0.07, PV[2] - 0.06, PV[2] - 0.01);
    slab(B.dark, add(PV, mul(dG, 0.12)), dG, [0, 1, 0], nG, 0.30, 0.055, 0.07);
    cyl(B.dark, add(PV, mul(dG, 0.42)), add(PV, mul(dG, 1.20)), 0.030, 0.028, 8);
    for (k = 0; k < 5; k++) cyl(B.dark, add(PV, mul(dG, 0.46 + k * 0.05)), add(PV, mul(dG, 0.48 + k * 0.05)), 0.042, 0.042, 8);
    cyl(B.dark, add(PV, mul(dG, 1.20)), add(PV, mul(dG, 1.30)), 0.045, 0.040, 8);
    slab(B.paint, add(add(PV, mul(dG, 0.10)), [0, 0.13, 0]), dG, [0, 1, 0], nG, 0.13, 0.065, 0.10);
    slab(B.dark, add(PV, mul(dG, -0.22)), dG, [0, 1, 0], nG, 0.04, 0.09, 0.05);
    box(B.dark, PV[0] + 0.10, PV[0] + 0.18, PV[1] - 0.02, PV[1] + 0.02, PV[2] + 0.07, PV[2] + 0.15);

    /* the ventilator dome on the centre-line ahead of the hatches (D1) */
    cylZ(B.paint, 0.55, -0.02, RZ - 0.01, RZ + 0.03, 0.20, 18);
    dome(B.paint, [0.55, -0.02, RZ + 0.03], [0, 0, 1], [1, 0, 0], 0.18, 0.18, 0.09, 18, 4);
    /* MK-4 periscopes: the loader's right front (D1 front view), the gunner's left front */
    [[0.84, -0.41], [0.80, 0.36]].forEach(function (q) {
      box(B.paint, q[0] - 0.10, q[0] + 0.10, q[1] - 0.09, q[1] + 0.09, RZ - 0.02, RZ + 0.06);
      box(B.paint, q[0] - 0.05, q[0] + 0.09, q[1] - 0.07, q[1] + 0.07, RZ + 0.06, RZ + 0.14);
      box(B.dark, q[0] + 0.09, q[0] + 0.10, q[1] - 0.05, q[1] + 0.05, RZ + 0.07, RZ + 0.13);
    });
    /* the rear DT in its ball in the boss at the turret's rear (ru.wiki, D1) */
    var RB = [-1.33, -0.18, 1.98 - ROOF];
    ellip(B.paint, RB, 0.14, 0.17, 0.17, 14, 6);
    ellip(B.paint, add(RB, [-0.10, 0, 0]), 0.09, 0.09, 0.09, 12, 5);
    cylX(B.dark, RB[0] - 0.36, RB[0] - 0.14, RB[1], RB[2], 0.022, 0.028, 8);
    /* lifting eyes at the roof's corners */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.95, 1.03, s * 0.72 - 0.015, s * 0.72 + 0.015, RZ - 0.02, RZ + 0.07);
      box(B.dark, -1.02, -0.94, s * 0.62 - 0.015, s * 0.62 + 0.015, RZ - 0.03, RZ + 0.06);
    }
    /* the grab rails along each side under the roof's edge and the pistol-port plugs (D1) */
    for (s = -1; s <= 1; s += 2) {
      var zr = 2.25 - ROOF;
      for (k = 0; k < 5; k++) {
        var x0 = 0.25 - k * 0.15, x1 = x0 - 0.15;
        cyl(B.dark, [x0, s * (tw(x0) * 0.86 + 0.05), zr], [x1, s * (tw(x1) * 0.86 + 0.05), zr], 0.013, 0.013, 6, true);
      }
      [0.25, -0.50].forEach(function (xp) {
        cyl(B.dark, [xp, s * (tw(xp) * 0.86 - 0.02), zr], [xp, s * (tw(xp) * 0.86 + 0.055), zr], 0.012, 0.012, 6);
      });
      p = [0.10, s * tw(0.10) * 0.985, 1.92 - ROOF];
      cyl(B.paint, p, add(p, [0, s * 0.05, 0]), 0.07, 0.06, 12);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), i, wg, WB2, tg;
    var HB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) };
    addHull(HB);
    addRunning(HB);
    flush(THREE, g, HB);
    /* the front idler (the road wheel itself, ru.wiki), the return rollers and the sprocket:
       static, one mesh */
    WB2 = new Bin(T.wheel, false, true);
    addWheel(WB2, IDL.x, IDL.z);
    addGear(WB2);
    flush(THREE, g, { wheel: WB2 });
    for (i = 0; i < XW.length; i++) {
      WB2 = new Bin(T.wheel, false, true);
      addWheel(WB2, 0, 0);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB2 });
      g.add(wg);
    }
    var TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) };
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

/* len: the measured X extent of the build (dump.js): the tail's tow hooks at -3.50 m to the
   muzzle at +6.45 m (the published 9.83 m runs from the hull's tail joint at -3.385 m) */
UNIT_MODELS["pla_e50_heavy"] = { len: 9.95, build: HeroIs2.build };
