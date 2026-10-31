/* ============ pla_t3485.js - HERO model: T-34-85 medium tank (Soviet-supplied, PLA) ============
   Key: pla_e50_mbt  "T-34-85 medium tank (Soviet-supplied)" (row service 1950, era e50 only).
   Drawn as the tanks the PLA received from 1950: the late-war standard T-34-85 of 1944-46
   production (the wide cast turret with the 85 mm ZiS-S-53, the two-piece commander's cupola
   at the rear left of the roof, two ventilator domes at the rear of the roof, the ball DT in
   the glacis, the cylindrical external fuel tanks on the rear hull sides, the rubber-tyred
   "starfish" spoked road wheels), BEFORE the 1960s overhauls (no T-54 type wheels, no IR light).
   The PLA's own Type 58 copy is not this row.

   START: js/hero/ru_su100.js (HeroSU100).  The SU-100 is the T-34-85's hull and running gear
   (ru.wikipedia: 72 % of its parts are the T-34-85's), so this file copies its geometry kit,
   materials, hull-lower station table, running gear (track, sprocket, idler) and its measured
   numbers: hull 6.10 m, NOSE/TAIL +-3.05, belly 0.40, sponson floor ZS 1.03, the nose joint
   NZ 0.70, rear joint TZ 0.90, the 48 deg upper rear plate, the 40 deg engine-bay sides, the
   five 830 mm wheels at 0.93/1.03/0.93/0.93 m, raised front idler, rear sprocket, 72 links.
   CHANGED from the SU-100: the casemate is gone.  The front plate is the T-34's upper glacis
   at 60 deg (not the SU-100's 50 deg) from the nose joint to a flat hull roof; the 40 deg side
   plates run the whole length; the roof is one plane from the glacis to the rear plate at
   ROOF 1.58 m; the turret ring is cut into it; the wheels are the starfish pattern.

   References, Wikimedia Commons, cached in scratchpad/q_pla_e50_mbt_ref:
     D1  "T-34-85 nva.svg" (rendered 1600 px wide) - a T-34-85 side elevation (port side,
         nose left), the same drawing the SU-100 hull was measured from.  Scale from the 830 mm
         road wheel (172 px over the tyre): 0.00483 m a pixel, ground at y 605.  Cross checks:
         wheel pitch 194 px = 0.94 m (SU-100 0.93), axle 102 px = 0.49 m (ZW 0.49), hull
         1273 px = 6.15 m (published 6.10), roof's rear edge at -2.27 m (the 48 deg plate from
         the SU-100 numbers gives -2.29), cupola top 2.72 m (published height 2.70).  Measured
         off it: the turret ring centre 0.62 m ahead of mid-hull (the ring housing seen under
         the turret from 0.95 ahead to 0.92 behind it); the turret from 1.30 m ahead of the
         ring centre (the mantlet's face) to 1.42 m behind it (the rear wall), its roof at
         2.47 m, its underside at 1.75 m ahead of and behind the ring housing (the bustle),
         the front lower face curving up from 1.75 to 1.94 m, the front upper face from the
         roof down to 2.33 m; the gun collar 0.32 m in diameter, 0.23 m long; the gun axis at
         2.07 m; the cupola 0.68 m across over its base, its centre 0.23 m behind the ring
         centre; the ventilator domes 1.0 m behind it; the hull roof at 1.58-1.63 m; the
         side fuel tank from -1.32 to -2.26 m; the headlamp on the left at 1.72 m; the grab
         rail on the turret side.  The drawing's GUN IS SHORT (muzzle 7.45 m from the tail):
         the tube length is taken from the published 8.10 m instead.
     P1  "T-34-85 model 1944 in Korolyov.JPG" - front right 3/4 of a 1944 tank: the turret's
         plan (narrowing to a rounded front, widest at the ring, the flat roof), the wide
         curved mantlet and the gun collar, the starfish road wheels (dished, broad spokes,
         round holes between them, rubber tyre), the flat front mudguards drooping ahead of
         the nose, a short run of spare links on the lower glacis, the ball MG on the right.
     P2  "T-34-85 rear-right 2016 Military Museum Beijing.jpg" - two PLA T-34-85s at the
         Military Museum, rear right: the 48 deg rear plate with the two armoured exhaust cowls
         and bolts, the long cylindrical fuel tank with its straps lying on the sloped rear
         hull side, the rear mudguards, the turret's rear wall and the two roof domes, the
         cupola standing on the left of the roof.  (Its wheels are later discs: overhauled.)
     P3  "T-34-85 Pavlodar tank front view.JPG" - front left: the cupola at the rear left,
         the round loader's hatch on the right, the cylindrical tanks both sides, the glacis
         with the driver's hatch on the left and the ball MG on the right.
   Published (ru.wikipedia T-34-85): hull 6.10 m, 8.10 m with the gun, width 3.00 m, height
   2.70 m, clearance 0.40 m, track 500 mm; upper glacis 45 mm at 60 deg, lower at 53 deg;
   sides 45 mm at 40 deg; turret ring 1600 mm; ZiS-S-53 L/54.6 (tube 4.645 m), no muzzle
   brake; crew 5, commander in the cupola at the rear left.

   CORRECTIONS against the generic model (armour_specs "ww2" hull, "cast" turret): the hull
   roof is one flat plane on 40 deg side plates (the generic box sides); the turret is the
   long low T-34-85 cast turret with its overhanging bustle, 2.7 m long, not a dome; the gun
   is the long 85 mm without a brake, from a cylindrical collar on a curved mantlet; five
   830 mm starfish wheels at the measured pitch with the raised front idler; cylindrical
   tanks on the rear hull sides (not drums on the deck); turret roof at 2.47 m, cupola 2.72 m.

   Recognition list (what makes it read at game zoom, and its source):
     1. the long low cast turret set forward, flat roof, bustle overhanging the engine deck
        - D1, P1, P2
     2. the long 85 mm, no muzzle brake, from a collar on a curved mantlet - D1, P1
     3. the commander's cupola at the rear left, two domes at the rear of the roof - D1, P2, P3
     4. the T-34 hull: 60 deg glacis, sloped sides, flat roof, 48 deg rear plate - D1, P2
     5. five big starfish wheels with rubber tyres, no return rollers, raised front idler,
        rear sprocket - D1, P1
     6. the cylindrical fuel tanks on the rear hull sides - D1, P2, P3
     7. the two exhaust cowls on the rear plate - P2
     8. the flat front mudguards drooping ahead of the nose - P1
     9. the ball MG and driver's hatch on the glacis - P1, P3
   Paint: P2 (PLA tanks indoors, overcast, grey-green #7d8270 in flat light) taken to the PLA
   set's level (pla_type63_apc.js #525c3a) -> base #505a39.  No stars, numbers, slogans or
   museum markings (P1 and P2 carry numbers and badges, D1 a GDR roundel: none drawn).
   NOT CONFIRMED, judgement calls: the turret's WIDTH and plan (no top view found; half widths
   0.30 at the mantlet face to 1.04 m at the ring, from P1/P3's proportions, giving 2.08 m);
   the section's lean and rounding; the mantlet's width (0.84 m); the cupola's place across
   the roof (0.45 m left of centre); the loader's hatch, periscopes and dome positions across
   the roof; the starfish wheel's spoke count (six drawn); one fuel tank a side 1.22 m long
   (D1 shows 0.94 m; P2 looks longer, perhaps two in tandem); the engine deck louvre counts;
   the spare-link count on the glacis; the hull roof height (D1 1.58-1.63 against the
   SU-100's 1.52 deck: 1.58 taken).  NOT DRAWN: radio aerial, tow cables, unditching log,
   smoke canisters, stowage boxes, tools.

   TURRET: the node "turret" (row turret:true, tturn 1.4) holds the turret, mantlet, gun and
   roof fittings; origin on the turret ring's centre at the hull roof (x 0.62, z 1.58), gun
   along +X.  Nodes: "turret", five "roadwheel" groups (axle along local Y, both sides).
   Materials: PAINT (canvas texture: base, mottling, weld seams, grime; metre UVs), DARK
   (track, fittings, bores, lenses), WHEEL (tyres, discs, hubs by vertex colour), and the team
   colour exactly as handed in (C.team): two small plates (engine hatch, loader's hatch).
   Draw calls: hull 3 + turret 3 + 5 wheels = 11.
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT3485 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---------------------------------------------------------- dimensions
     hull 6.10 m between the nose and tail joints; belly at the 0.40 m clearance; sponson
     floor over the track; the flat hull roof (D1); the SU-100's nose and tail joints */
  var NOSE = 3.05, TAIL = -3.05, ZB = 0.40, ZS = 1.03, NZ = 0.70, TZ = 0.90;
  var WB = 0.96, WS = 1.44, ROOF = 1.58;
  var TG = Math.tan(60 * Math.PI / 180), T53 = Math.tan(53 * Math.PI / 180), T48 = Math.tan(48 * Math.PI / 180);
  var S40 = Math.tan(40 * Math.PI / 180);
  var XRF = NOSE - (ROOF - NZ) * TG;          /* front edge of the roof, 1.53 (D1 1.48) */
  var XDK = TAIL + (ROOF - TZ) * T48;         /* rear edge of the roof, -2.29 (D1 -2.27) */
  var PAINT = { base: "#505a39", blots: ["#465031", "#5a6441"], seed: 3485 };

  /* running gear (D1, SU-100; published 830 mm wheels, 500 mm track, 3.00 m over the tracks) */
  var TY = 1.25, TW = 0.25;
  var XW = [1.95, 1.02, -0.01, -0.94, -1.87], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.66, z: 0.665, r: 0.28 }, SPR = { x: -2.70, z: 0.59, r: 0.33 };
  /* the turret (D1): ring centre, roof height above the hull roof, gun axis, the muzzle at
     8.10 m from the tail (published) */
  var TX = 0.62, RZ = 2.47 - ROOF, GZ = 2.07 - ROOF, MUZ = TAIL + 8.10 - TX;

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
    return canvasTex(THREE, "t3485" + P.base + P.seed, 512, function (q, S) {
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
  /* the upper glacis: one plane at 60 deg from the vertical, nose joint to roof (ru.wiki) */
  var UF = unit([-TG, 0, 1]), NF = unit([1, 0, TG]);
  function glacisZ(x) { return NZ + (NOSE - x) / TG; }
  function onFront(z, y, h) { var x = NOSE - (z - NZ) * TG; return add([x, y, z], mul(NF, h || 0)); }
  /* the upper rear plate at 48 deg (SU-100, P2) */
  var UR = unit([T48, 0, 1]), NR = unit([-1, 0, T48]);
  function rearZ(x) { return TZ + (x - TAIL) / T48; }
  function onRear(z, y, h) { var x = TAIL + (z - TZ) * T48; return add([x, y, z], mul(NR, h || 0)); }
  function bellyZ(x) {
    var xf = NOSE - (NZ - ZB) * T53, xr = TAIL + (TZ - ZB);
    if (x > xf) return ZB + (x - xf) / T53;
    if (x < xr) return ZB + (xr - x);
    return ZB;
  }
  function topZ(x) {
    if (x >= XRF) return glacisZ(x);
    if (x >= XDK) return ROOF;
    return rearZ(x);
  }
  /* station table (the SU-100's, without the casemate): x where the glacis and the rear plate
     cross the sponson floor are doubled so the sponsons close cleanly */
  var XFS = NOSE - (ZS - NZ) * TG, XRS = TAIL + (ZS - TZ) * T48;
  var ST = [[NOSE], [2.98], [2.90], [2.75], [2.62], [XFS, 1], [XFS, 2], [2.30], [2.05], [1.80], [XRF],
            [0.80], [-0.20], [-1.20], [XDK], [-2.45], [-2.65], [XRS, 2], [XRS, 1], [-2.95], [TAIL]];
  function ring(x, mode) {
    var zT = topZ(x), zB = bellyZ(x), w, zs;
    if (mode === 1 || (mode !== 2 && zT <= ZS + 1e-6)) {
      zs = Math.max(zB, Math.min(zT, ZS));
      return [[x, WB, zB], [x, WB, zs], [x, WB, zs], [x, WB, zT], [x, -WB, zT], [x, -WB, zs], [x, -WB, zs], [x, -WB, zB]];
    }
    zT = Math.max(zT, ZS);
    w = WS - (zT - ZS) * S40;
    return [[x, WB, zB], [x, WB, ZS], [x, WS, ZS], [x, w, zT], [x, -w, zT], [x, -WS, ZS], [x, -WB, ZS], [x, -WB, zB]];
  }
  var WR = WS - (ROOF - ZS) * S40;            /* roof half width, 0.98 */
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
      var yi = s * WB, yo = s * (TY + TW), ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* the ledge along the sponson's foot over the track (SU-100, D1) */
      box(B.paint, XRS - 0.02, XFS - 0.02, s > 0 ? WS - 0.04 : -(TY + TW), s > 0 ? TY + TW : -(WS - 0.04), ZS - 0.025, ZS + 0.012);
      /* the front mudguard: flat, then drooping ahead of the nose (P1) */
      belt(B.paint, 2.45, ZS + 0.01, 2.98, ZS + 0.01, ylo, yhi, 0.025);
      belt(B.paint, 2.98, ZS + 0.01, 3.26, 0.80, ylo, yhi, 0.025);
      belt(B.paint, 2.45, ZS - 0.04, 2.98, ZS - 0.04, s > 0 ? TY + TW - 0.02 : -(TY + TW), s > 0 ? TY + TW : -(TY + TW) + 0.02, 0.10);
      belt(B.paint, 2.98, ZS - 0.04, 3.26, 0.76, s > 0 ? TY + TW - 0.02 : -(TY + TW), s > 0 ? TY + TW : -(TY + TW) + 0.02, 0.10);
      /* the rear mudguard, flat and drooping aft (P2) */
      belt(B.paint, -2.90, ZS + 0.01, -3.24, 0.86, ylo, yhi, 0.025);
      /* grab handles on the side plates (D1 shows the marks forward and aft) */
      var nE = unit([0, s * 1, S40]), uE = unit([0, -s * S40, 1]);
      [1.05, 0.05].forEach(function (xh) {
        var zc = ZS + 0.30, yc = s * (WS - 0.30 * S40);
        slab(B.dark, add([xh, yc, zc], mul(nE, 0.05)), [1, 0, 0], uE, nE, 0.16, 0.012, 0.012);
        slab(B.dark, add([xh - 0.15, yc, zc], mul(nE, 0.025)), [1, 0, 0], uE, nE, 0.012, 0.012, 0.03);
        slab(B.dark, add([xh + 0.15, yc, zc], mul(nE, 0.025)), [1, 0, 0], uE, nE, 0.012, 0.012, 0.03);
      });
      /* the cylindrical external fuel tank on each rear side plate, two straps (D1, P2, P3) */
      var tz = ZS + 0.36, ty = WS - 0.36 * S40, tc = add([0, s * ty, tz], mul(nE, 0.20));
      cylX(B.paint, -2.27, -1.05, tc[1], tc[2], 0.19, 0.19, 18);
      cylX(B.dark, -1.06, -1.04, tc[1], tc[2], 0.15, 0.15, 14);
      [-1.30, -2.00].forEach(function (xs) {
        cylX(B.dark, xs - 0.025, xs + 0.025, tc[1], tc[2], 0.198, 0.198, 18);
        slab(B.dark, [xs, s * (ty - 0.02), tz], [1, 0, 0], uE, nE, 0.03, 0.06, 0.03);
      });
      cylZ(B.paint, -1.25, tc[1], tc[2] + 0.17, tc[2] + 0.23, 0.05, 8);
    }
    /* the headlamp on the left front of the roof edge (D1), lamp on a short bracket */
    P0 = [1.72, WR - 0.10, ROOF];
    box(B.dark, P0[0] - 0.03, P0[0] + 0.03, P0[1] - 0.03, P0[1] + 0.03, ROOF, ROOF + 0.10);
    cylX(B.paint, P0[0] - 0.06, P0[0] + 0.10, P0[1], ROOF + 0.17, 0.09, 0.095, 14);
    cylX(B.dark, P0[0] + 0.10, P0[0] + 0.112, P0[1], ROOF + 0.17, 0.078, 0.078, 14);

    /* --- the glacis ------------------------------------------------------------ */
    var HV = [0, 1, 0];
    /* the driver's hatch on the left with two periscopes at its head (P1, P3) */
    slab(B.paint, onFront(1.26, 0.42, 0.02), UF, HV, NF, 0.29, 0.27, 0.02);
    slab(B.paint, onFront(1.26, 0.42, 0.05), UF, HV, NF, 0.22, 0.21, 0.015);
    slab(B.dark, onFront(1.42, 0.32, 0.08), UF, HV, NF, 0.05, 0.07, 0.05);
    slab(B.dark, onFront(1.42, 0.54, 0.08), UF, HV, NF, 0.05, 0.07, 0.05);
    slab(B.dark, onFront(1.12, 0.42, 0.075), UF, HV, NF, 0.02, 0.10, 0.02);
    /* the ball-mounted DT on the right: armoured collar, ball, the barrel jacket (P1, P3) */
    var PB = onFront(1.18, -0.48, 0);
    dome(B.paint, PB, NF, UF, 0.17, 0.17, 0.06, 16, 3);
    ellip(B.paint, add(PB, mul(NF, 0.05)), 0.11, 0.11, 0.11, 12, 6);
    cylX(B.dark, PB[0] + 0.10, PB[0] + 0.42, PB[1], PB[2] + 0.02, 0.028, 0.022, 8);
    /* four spare links across the lower glacis, guide horns out (P1) */
    for (k = 0; k < 4; k++) {
      y = -0.26 + k * 0.172;
      slab(B.dark, onFront(0.90, y, 0.025), UF, HV, NF, 0.25, 0.080, 0.022);
      slab(B.dark, onFront(0.90, y, 0.055), UF, HV, NF, 0.20, 0.018, 0.016);
      if (k % 2 === 0) slab(B.dark, onFront(0.91, y, 0.09), UF, HV, NF, 0.06, 0.05, 0.045);
    }
    slab(B.dark, onFront(1.02, 0.0, 0.05), UF, HV, NF, 0.02, 0.38, 0.02);
    /* towing hooks at the nose */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, NOSE - 0.12, NOSE + 0.05, s * 0.62 - 0.05, s * 0.62 + 0.05, NZ - 0.10, NZ + 0.02);
      box(B.dark, NOSE + 0.00, NOSE + 0.07, s * 0.62 - 0.05, s * 0.62 + 0.05, NZ - 0.16, NZ - 0.06);
    }
    /* the glacis-to-roof weld and the roof's edge strips */
    box(B.dark, XDK + 0.01, XRF - 0.01, WR - 0.03, WR - 0.01, ROOF, ROOF + 0.012);
    box(B.dark, XDK + 0.01, XRF - 0.01, -WR + 0.01, -WR + 0.03, ROOF, ROOF + 0.012);
    /* the turret ring's armoured collar on the roof (under the turret's housing) */
    cylZ(B.dark, TX, 0, ROOF - 0.01, ROOF + 0.02, 0.96, 28);

    /* --- engine deck behind the turret: the central engine hatch, louvred intakes both
       sides, the transverse rear grille (D1, P2) --- */
    box(B.paint, -1.95, -0.95, -0.46, 0.46, ROOF, ROOF + 0.05);
    box(B.dark, -1.10, -0.98, -0.06, 0.06, ROOF + 0.05, ROOF + 0.09);
    box(B.team, -1.82, -1.58, -0.28, 0.28, ROOF + 0.05, ROOF + 0.058);
    for (s = -1; s <= 1; s += 2) {
      var yl0 = s * 0.56, yl1 = s * 0.90;
      box(B.dark, -2.08, -0.88, Math.min(yl0, yl1), Math.max(yl0, yl1), ROOF - 0.01, ROOF + 0.02);
      for (k = 0; k < 9; k++) box(B.paint, -2.05 + k * 0.13, -1.995 + k * 0.13, Math.min(yl0, yl1) + 0.02, Math.max(yl0, yl1) - 0.02, ROOF + 0.02, ROOF + 0.05);
    }
    box(B.dark, XDK + 0.02, -2.12, -0.92, 0.92, ROOF - 0.01, ROOF + 0.06);
    for (k = 0; k < 9; k++) box(B.paint, XDK + 0.03, -2.13, -0.90 + k * 0.225, -0.88 + k * 0.225, ROOF + 0.06, ROOF + 0.075);
    box(B.paint, XDK + 0.03, -2.13, -0.92, 0.92, ROOF + 0.06, ROOF + 0.065);

    /* --- the upper rear plate: two armoured exhaust cowls, bolts, tow hooks (P2) --- */
    for (s = -1; s <= 1; s += 2) {
      slab(B.dark, onRear(1.22, s * 0.50, 0.006), UR, [0, 1, 0], NR, 0.30, 0.15, 0.008);
      slab(B.paint, onRear(1.24, s * 0.50, 0.12), UR, [0, 1, 0], NR, 0.24, 0.12, 0.11);
      slab(B.paint, onRear(1.42, s * 0.50, 0.07), UR, [0, 1, 0], NR, 0.06, 0.12, 0.06);
      var po = onRear(1.06, s * 0.50, 0.13);
      cyl(B.paint, add(po, mul(UR, 0.10)), add(po, [-0.16, 0, -0.20]), 0.075, 0.07, 12);
      cyl(B.dark, add(po, [-0.16, 0, -0.20]), add(po, [-0.168, 0, -0.21]), 0.055, 0.055, 10);
      box(B.dark, TAIL - 0.08, TAIL + 0.04, s * 0.62 - 0.05, s * 0.62 + 0.05, TZ - 0.08, TZ + 0.06);
      box(B.dark, TAIL - 0.12, TAIL - 0.04, s * 0.62 - 0.05, s * 0.62 + 0.05, TZ - 0.14, TZ - 0.02);
    }
    for (k = 0; k < 12; k++) {
      p = onRear(1.46, -0.88 + k * 0.16, 0.0);
      cyl(B.dark, p, add(p, mul(NR, 0.025)), 0.02, 0.018, 6);
      p = onRear(0.96, -0.88 + k * 0.16, 0.0);
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
    /* 72 cast links of 500 mm a side, a horned link then a plain one (ru.wiki) */
    cnt = 72; step = tot / cnt;
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
        /* the link, its cast cross ribs on the outside (P1, P2), the guide horn inside */
        belt(B.dark, px - dx * 0.078, pz - dz * 0.078, px + dx * 0.078, pz + dz * 0.078, y - TW, y + TW, 0.05);
        belt(B.dark, px - dx * 0.02 + dz * 0.025, pz - dz * 0.02 - dx * 0.025, px + dx * 0.02 + dz * 0.025, pz + dz * 0.02 - dx * 0.025, y - TW + 0.03, y + TW - 0.03, 0.02);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.035 - dz * 0.07, pz - dz * 0.035 + dx * 0.07, px + dx * 0.035 - dz * 0.07, pz + dz * 0.035 + dx * 0.07, y - 0.035, y + 0.035, 0.09);
      }
      /* rear drive sprocket: two discs, six rollers between them (ridge engagement; SU-100) */
      cylY(B.paint, SPR.x, y - 0.20, y - 0.14, SPR.z, SPR.r, 20);
      cylY(B.paint, SPR.x, y + 0.14, y + 0.20, SPR.z, SPR.r, 20);
      cylY(B.dark, SPR.x, y - 0.14, y + 0.14, SPR.z, 0.12, 10);
      for (i = 0; i < 6; i++) {
        var ra = i / 6 * TAU;
        cylY(B.dark, SPR.x + Math.cos(ra) * (SPR.r - 0.07), y - 0.14, y + 0.14, SPR.z + Math.sin(ra) * (SPR.r - 0.07), 0.045, 8);
        cylY(B.dark, SPR.x + Math.cos(ra + 0.52) * 0.19, y + s * 0.20, y + s * 0.205, SPR.z + Math.sin(ra + 0.52) * 0.19, 0.055, 8);
      }
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.235, SPR.z, 0.13, 12);
      cylY(B.dark, SPR.x, y + s * 0.235, y + s * 0.25, SPR.z, 0.07, 8);
      /* front idler, a smaller double disc, and its crank (D1, SU-100) */
      cylY(B.paint, IDL.x, y - 0.20, y - 0.05, IDL.z, IDL.r, 18);
      cylY(B.paint, IDL.x, y + 0.05, y + 0.20, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y - 0.05, y + 0.05, IDL.z, IDL.r - 0.08, 12);
      cylY(B.dark, IDL.x, y + s * 0.20, y + s * 0.245, IDL.z, 0.09, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, s > 0 ? WB - 0.01 : -WB - 0.04, s > 0 ? WB + 0.04 : -WB + 0.01, IDL.z - 0.05, IDL.z + 0.05);
    }
  }

  /* road wheel pair, the "starfish" pattern (P1): a wide rubber tyre, a dished pressed disc
     with six broad raised spokes and round holes between them, the hub cap with its bolt
     ring; the guide horns run in the gap between the two wheels */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.05, 0.055, 0.045];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIM = [rr * 1.3, gg * 1.3, bb * 1.3], HUB = [rr * 0.9, gg * 0.9, bb * 0.9];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.21, y - 0.06, 0, RW, 22);
      cylY(W, 0, y + 0.06, y + 0.21, 0, RW, 22);
      W.col = BODY;
      cyl(W, [0, y - 0.06, 0], [0, y + 0.06, 0], 0.30, 0.30, 12, true);
      /* the outer disc: the rim ring, the dish down to the hub */
      W.col = RIM;
      cyl(W, [0, y + s * 0.205, 0], [0, y + s * 0.218, 0], 0.32, 0.31, 22, true);
      W.col = BODY;
      cyl(W, [0, y + s * 0.214, 0], [0, y + s * 0.180, 0], 0.315, 0.12, 22, true);
      /* the holes between the spokes and the raised spokes over the dish */
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        W.col = HOLE;
        var hr = 0.215, hy = y + s * (0.214 - (0.315 - hr) / 0.195 * 0.034) + s * 0.004;
        cyl(W, [Math.cos(a) * hr, hy - s * 0.003, Math.sin(a) * hr], [Math.cos(a) * hr, hy + s * 0.003, Math.sin(a) * hr], 0.055, 0.055, 10);
        a = i / 6 * TAU;
        W.col = BODY;
        var u = [Math.cos(a), 0, Math.sin(a)], w = [-Math.sin(a), 0, Math.cos(a)];
        slab(W, [u[0] * 0.215, y + s * 0.205, u[2] * 0.215], u, [0, 1, 0], w, 0.10, 0.012, 0.045);
      }
      cyl(W, [0, y + s * 0.180, 0], [0, y + s * 0.225, 0], 0.13, 0.115, 14);
      W.col = HUB;
      cyl(W, [0, y + s * 0.225, 0], [0, y + s * 0.25, 0], 0.09, 0.07, 10);
      W.col = RIM;
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        cyl(W, [Math.cos(a) * 0.10, y + s * 0.222, Math.sin(a) * 0.10], [Math.cos(a) * 0.10, y + s * 0.236, Math.sin(a) * 0.10], 0.015, 0.015, 5);
      }
      /* the inner disc face, seen through the gap */
      W.col = BODY;
      cyl(W, [0, y - s * 0.21, 0], [0, y - s * 0.225, 0], 0.32, 0.29, 14);
    }
  }

  /* ------------------------------------------------------------- the turret */
  /* turret frame: origin on the ring centre at the hull roof, gun along +X; z is above the
     hull roof.  Stations measured off D1 (x ahead of the ring centre, underside, roof), the
     half widths estimated (see NOT CONFIRMED). */
  var TS = [
    [1.31, 2.00, 2.28, 0.30], [1.27, 1.95, 2.34, 0.55], [1.20, 1.92, 2.38, 0.72],
    [1.08, 1.86, 2.44, 0.88], [0.95, 1.76, 2.46, 0.97], [0.75, 1.75, 2.47, 1.02],
    [0.30, 1.75, 2.47, 1.04], [-0.30, 1.75, 2.47, 1.02], [-0.90, 1.76, 2.47, 0.96],
    [-1.25, 1.76, 2.44, 0.88], [-1.37, 1.76, 2.38, 0.82], [-1.42, 1.78, 2.30, 0.78]];
  /* the cast section: (half width fraction, height fraction), sides bulging low and rolling
     into the flat roof (P1, P2) */
  var SEC = [[0.93, 0], [1.0, 0.35], [0.97, 0.65], [0.88, 0.85], [0.72, 0.96], [0.5, 1.0],
             [-0.5, 1.0], [-0.72, 0.96], [-0.88, 0.85], [-0.97, 0.65], [-1.0, 0.35], [-0.93, 0]];
  function tw(x) {                       /* half width at x, linear between stations */
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
    /* the ring housing under it, standing on the roof (D1) */
    cylZ(B.paint, 0, 0, -0.005, 0.20, 0.93, 32);
    /* the curved cast mantlet across the front, on the trunnion axis (P1) */
    cyl(B.paint, [1.01, -0.42, GZ], [1.01, 0.42, GZ], 0.30, 0.30, 22);
    /* the gun collar and its flange (D1: 0.32 m across, 1.30 to 1.53 m) */
    cylX(B.paint, 1.24, 1.53, 0, GZ, 0.165, 0.150, 20);
    cylX(B.paint, 1.30, 1.34, 0, GZ, 0.178, 0.178, 20);
    /* the coaxial DT's port right of the gun, the sight's aperture left (P1) */
    cylX(B.dark, 1.27, 1.33, -0.24, GZ + 0.02, 0.03, 0.03, 8);
    box(B.dark, 1.25, 1.32, 0.19, 0.27, GZ + 0.04, GZ + 0.10);
    /* the ZiS-S-53 tube: thicker near the collar, a long taper, plain muzzle, no brake */
    cylX(B.paint, 1.53, 2.70, 0, GZ, 0.088, 0.080, 18);
    cylX(B.paint, 2.70, MUZ - 0.12, 0, GZ, 0.074, 0.064, 18);
    cylX(B.paint, MUZ - 0.12, MUZ, 0, GZ, 0.070, 0.070, 18);
    cylX(B.dark, MUZ - 0.004, MUZ + 0.002, 0, GZ, 0.045, 0.045, 12);

    /* the commander's cupola at the rear left (D1, P2, P3): base ring, the drum with five
       vision slots, the two-piece hatch with the MK-4 periscope */
    CX = -0.23; CY = 0.45;
    cylZ(B.paint, CX, CY, RZ - 0.06, RZ + 0.03, 0.34, 24);
    cylZ(B.paint, CX, CY, RZ + 0.03, RZ + 0.17, 0.30, 24);
    cyl(B.paint, [CX, CY, RZ + 0.17], [CX, CY, RZ + 0.20], 0.30, 0.27, 24);
    for (k = 0; k < 5; k++) {
      a = (k / 5) * TAU + 0.3;
      slab(B.dark, [CX + Math.cos(a) * 0.302, CY + Math.sin(a) * 0.302, RZ + 0.11], [-Math.sin(a), Math.cos(a), 0], [Math.cos(a), Math.sin(a), 0], [0, 0, 1], 0.07, 0.008, 0.016);
    }
    box(B.dark, CX - 0.27, CX + 0.27, CY - 0.008, CY + 0.008, RZ + 0.20, RZ + 0.212);
    box(B.paint, CX + 0.03, CX + 0.16, CY + 0.04, CY + 0.15, RZ + 0.20, RZ + 0.25);
    box(B.dark, CX + 0.16, CX + 0.17, CY + 0.06, CY + 0.13, RZ + 0.21, RZ + 0.24);
    box(B.dark, CX - 0.22, CX - 0.12, CY - 0.18, CY - 0.10, RZ + 0.20, RZ + 0.23);
    /* the loader's round hatch on the right (P3), its hinge, the team plate */
    cylZ(B.paint, 0.05, -0.42, RZ - 0.01, RZ + 0.04, 0.25, 20);
    box(B.dark, -0.24, -0.16, -0.52, -0.32, RZ + 0.02, RZ + 0.07);
    box(B.team, -0.04, 0.14, -0.58, -0.26, RZ + 0.04, RZ + 0.048);
    /* MK-4 periscopes: the gunner's left front, the loader's right front */
    [[0.62, 0.32], [0.48, -0.70]].forEach(function (q) {
      box(B.paint, q[0] - 0.10, q[0] + 0.10, q[1] - 0.09, q[1] + 0.09, RZ - 0.01, RZ + 0.06);
      box(B.paint, q[0] - 0.05, q[0] + 0.09, q[1] - 0.07, q[1] + 0.07, RZ + 0.06, RZ + 0.13);
      box(B.dark, q[0] + 0.09, q[0] + 0.10, q[1] - 0.05, q[1] + 0.05, RZ + 0.07, RZ + 0.12);
    });
    /* two ventilator domes at the rear of the roof (D1, P2) */
    [[-0.98, 0.08], [-0.98, -0.40]].forEach(function (q) {
      cylZ(B.paint, q[0], q[1], RZ - 0.01, RZ + 0.03, 0.19, 16);
      dome(B.paint, [q[0], q[1], RZ + 0.03], [0, 0, 1], [1, 0, 0], 0.17, 0.17, 0.11, 16, 4);
    });
    /* lifting eyes at the roof's front corners and on the rear wall */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.88, 0.96, s * 0.70 - 0.015, s * 0.70 + 0.015, RZ - 0.01, RZ + 0.07);
      box(B.dark, -1.44, -1.40, s * 0.50 - 0.05, s * 0.50 + 0.05, RZ - 0.30, RZ - 0.25);
    }
    /* the grab rail along each side and the pistol-port plugs (D1) */
    for (s = -1; s <= 1; s += 2) {
      var zr = 2.20 - ROOF, yr;
      for (k = 0; k < 6; k++) {
        var x0 = -0.17 - k * 0.12, x1 = x0 - 0.12;
        cyl(B.dark, [x0, s * (tw(x0) * 0.975 + 0.05), zr], [x1, s * (tw(x1) * 0.975 + 0.05), zr], 0.013, 0.013, 6, true);
      }
      [-0.17, -0.89].forEach(function (xp) {
        yr = tw(xp) * 0.975;
        cyl(B.dark, [xp, s * (yr - 0.02), zr], [xp, s * (yr + 0.055), zr], 0.012, 0.012, 6);
      });
      p = [0.35, s * tw(0.35) * 0.985, 1.97 - ROOF];
      cyl(B.paint, p, add(p, [0, s * 0.045, 0]), 0.06, 0.05, 10);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), i, wg, WB2, tg;
    var HB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) };
    addHull(HB);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB2 = new Bin(T.wheel, false, true);
      addWheel(WB2);
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

/* len: the measured X extent of the build (dump.js): the rear mudguards at -3.25 m to the
   muzzle at +5.05 m (the published 8.10 m runs from the hull's tail plate at -3.05 m) */
UNIT_MODELS["pla_e50_mbt"] = { len: 8.30, build: HeroT3485.build };
