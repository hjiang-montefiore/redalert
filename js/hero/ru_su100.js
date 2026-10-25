/* ============ ru_su100.js - HERO model: SU-100 casemate tank destroyer ============
   Key: pact_e50_spg  "SU-100 Self-Propelled Gun" (row service 1944, era e50 only: the 1950s).
   Drawn as the vehicle served in the 1950s: the standard production SU-100 (Uralmash 1944-46,
   Omsk 1947-48, the Czechoslovak licence build of 1953-56) BEFORE the late-1950s / 1960s
   modernisation.  So: the MK-4 periscope in the commander's cupola (the TPKU-2 came with the
   modernisation), no IR driving light (the BVN / FG-10 came with it), and the plain rubber-tyred
   disc road wheels of the T-34 (the stamped T-44M wheels came "from the second half of the
   1960s", ru.wikipedia).  The modernised vehicle (sometimes called SU-100M) is NOT this row; the
   "SU-100M" on Commons is the unrelated Object 416 prototype.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960, cached
   in scratchpad/q_su100_ref:
     D1  "T-34-85 nva.svg" - a T-34-85 side elevation (port side): the same hull and running
         gear (ru.wikipedia: 72 % of the SU-100's parts came from the T-34-85): five 830 mm road
         wheels with the wider gap between the 2nd and 3rd, front idler raised, rear sprocket,
         no return rollers, the track lying on the wheel tops, the sponson shelf over the track,
         the engine deck height.  Scale from the 830 mm wheel: 0.0085 m a pixel; it puts the
         T-34-85 turret roof at 2.74 m against the published 2.72 m.
     P1  "Czechoslovak-produced SU-100 ... Muzeul Militar National.jpg" - a Czech-built SU-100
         almost dead side-on (port): wheel pitch, idler and sprocket heights, the casemate's
         length against the hull, the casemate side and engine side plates, the ledge over the
         track.  (Its spoked and later wheels are mixed; the wheel TYPE is taken from P3-P5.)
     P2  "Su-100 spatg.jpg" (Kyiv) - front left: the single front plate from the nose to the
         roof, the cast mantlet right of centre with its bolted flange, the driver's hatch with
         two periscopes left of the gun and the pistol port above it, two headlamps at the
         front corners, the spare track on the glacis, the big front mudguards, the
         cylindrical fuel tank high on the left rear.
     P3  "SU-100 spb.JPG" (St Petersburg) - front right: the commander's cupola standing out of
         the right casemate side, the long cylindrical tank on the right rear, the plain tube
         thick near the mantlet, the disc road wheels.
     P4  "SU-100-batey-haosef-1.jpg" / "-2.jpg" (Latrun; an Egyptian SU-100, supplied 1953-56)
         - front right and rear: the mantlet's big cast boss and flange, six spare links across
         the glacis showing three guide horns, the flat front and rear mudguards, the two
         armoured exhaust cowls on the upper rear plate, the two tow hooks, the cylindrical
         tank on the right rear, disc road wheels.
     P5  "Soviet SU100 Tank Destroyer (5781709500).jpg" - rear: the exhaust cowls, the bolted
         upper rear plate, a cylindrical tank each side, disc road wheels.
     P6  "Soviet 100 mm self-propelled gun Mk. 4 pic1.JPG" - right rear from above: the roof
         (the cupola in the front half of the right side, its U-shaped foot where it leaves the
         sloped side plate, a ventilator dome behind it, the rear roof hatch), the engine deck
         (central hatch, louvred intakes, the rear grille), grab handles on the side plates.
   Published (ru.wikipedia SU-100; en.wikipedia): length 9.45 m gun forward, hull 6.10 m,
   width 3.00 m, height 2.245 m, ground clearance 0.40 m; upper front plate 75 mm at 50 deg
   from vertical, lower 45 mm at 55 deg (joined directly, no cast nose beam, on late builds);
   casemate sides at 20 deg, engine-bay sides at 40 deg; upper and lower rear plates at 48 and
   45 deg; the cylindrical commander's cupola set into a cut-out in the RIGHT casemate side;
   driver's hatch in the upper front plate (as the T-34-85); a two-leaf hatch at the front of
   the roof for the gun panorama, the crew hatch at the rear of the roof (single leaf after the
   early builds), two roof fans; the D-10S on twin trunnions in a cast frame, +-8 deg traverse,
   -3..+20 deg elevation; five double 830 mm road wheels with rubber tyres a side, Christie
   suspension, rear sprockets, 72 links of 500 mm a side, horned and plain links alternating.

   CORRECTIONS against the previous model (and its header):
   - the front plate runs in ONE plane from the nose to the roof at 50 deg (ru.wikipedia, P2,
     P4); the old model had a separate glacis at 25-30 deg under a casemate face;
   - the casemate sides lean in at 20 deg and the engine-bay sides at 40 deg; the old casemate
     had vertical-ish sides on a box sponson and the engine deck no sloped sides at all;
   - the commander's cupola is set into the right side plate at mid-length of the casemate
     (P1, P3, P6, ru.wikipedia "right of the gun"), not on the roof at the right rear;
   - the cylindrical fuel tanks lie high on the sloped engine-bay sides (P2, P3, P4, P5), not
     on the fenders; the old "loader's round hatch" is a rectangular rear roof hatch (P6);
   - the front mudguards are flat plates sloping down ahead of the nose (P2, P4);
   - the spare track is ONE run of six links across the glacis (P4: three guide horns), not
     two strips of four;
   - wheel pitch 0.93/1.03/0.93/0.93 m (D1, P1), raised front idler, track centres 2.50 m
     (3.00 m over 500 mm tracks); the old 0.81 m even pitch was too short;
   - measured off P1 with the wheel scale (0.0089 m a pixel over the hull): the front plate
     meets the roof 1.6 m behind the nose and the casemate's rear wall stands between the 3rd
     and 4th wheels, so the roof is 2.1 m long; with the published 50 deg that puts the nose
     (the joint of the two front plates) at 0.70 m, about the idler's hub;
   - kept: gun right of centre, driver left, two headlamps, rear sprocket, no return rollers,
     5 road wheels, no muzzle brake, hull 6.10 m and 9.45 m overall from the hull's tail.

   Recognition list (what makes it read at game zoom, and its source):
     1. the casemate on the T-34 hull: one front plate from the nose to the roof, sides
        leaning in - P1, P2, P4, ru.wikipedia
     2. the long 100 mm D-10S, thick near the mantlet, no muzzle brake, right of centre - P2,
        P3, P4
     3. the big cast mantlet boss and its bolted flange on the front plate - P2, P3, P4
     4. the cylindrical commander's cupola standing out of the right casemate side - P3, P4, P6
     5. five big disc road wheels with rubber tyres a side, no return rollers, the track
        lying on the wheel tops, raised front idler, rear sprocket - D1, P1, P3, P5
     6. the cylindrical fuel tanks high on the rear hull sides - P2, P3, P4, P5
     7. the flat front mudguards sloping down ahead of the nose - P2, P4
     8. six spare links across the glacis; the driver's hatch with two periscopes left of
        the gun - P2, P4
     9. the low engine deck behind the casemate's vertical rear wall: hatch, louvres, grille,
        the sloped rear plate with two armoured exhaust cowls - P4, P5, P6
    10. two headlamps at the front corners - P2
   Paint: Soviet green as photographed (P2 overcast, fresh paint, mean #8b9576; P3 #897849 in
   warm light) taken to the Soviet set's level (ru_t54.js #4c5636, ru_t10.js #505a38) for the
   ACES pass -> base #4e5737.  No numbers, stars, slogans or museum markings (P1 carries a
   painted number, P2 museum white edging: not drawn).
   NOT CONFIRMED, judgement calls: the cupola's fore-and-aft place (P1 reads it near mid-roof,
   P6 in the front half, P3 close to the rear corner; drawn at mid-roof, 1.0 m behind the
   roof's front edge, beside the gun's breech as ru.wikipedia seats the commander); the panorama hatch drawn on the LEFT front of the roof (the
   gunner, who used the panorama, sat left of the gun; no photograph here resolves it); only
   ONE roof ventilator dome is drawn (P6 shows one; the second fan's cap is not resolved); the
   fuel tanks drawn as one 1.6 m cylinder a side with a seam (P3, P5 may show two in tandem);
   the louvre counts; the cupola's vision-slit count (five, ru.wikipedia).  NOT DRAWN: radio
   aerial, tow cables, unditching log, boxes on the fenders, the later IR light and TPKU-2.

   TURRET CHOICE (row turret:true, tturn 0.9; render3d trains the node named "turret" about its
   local Z and pulls it back along X for recoil): the casemate is fixed and the gun traverses
   only +-8 deg, so the "turret" node holds ONLY the moving part of the mantlet (a cast ball)
   and the gun, along +X; its origin is the ball's centre on the gun axis just ahead of the
   front plate, so a training gun swings about its own mount and the casemate never moves.
   The fixed boss and flange are hull.
   Nodes: "turret", five "roadwheel" groups (axle along local Y, each holding both sides).
   Materials: PAINT (canvas texture: base, mottling, weld seams, grime; metre UVs), DARK
   (track, fittings, bores, lenses), WHEEL (tyres, discs, hubs by vertex colour), and the team
   colour exactly as handed in (C.team): two small plates (engine hatch, rear roof hatch).
   Draw calls: hull 3 + turret 2 + 5 wheels = 10.
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSU100 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---------------------------------------------------------- dimensions
     hull 6.10 m between the nose and tail edges; belly at the 0.40 m clearance; sponson
     floor over the track; casemate roof; engine deck; casemate rear wall (P1, D1) */
  var NOSE = 3.05, TAIL = -3.05, ZB = 0.40, ZS = 1.03, NZ = 0.70, TZ = 0.90;
  var WB = 0.96, WS = 1.44, ROOF = 2.06, DECK = 1.52, XR = -0.68;
  var TG = Math.tan(50 * Math.PI / 180), T55 = Math.tan(55 * Math.PI / 180), T48 = Math.tan(48 * Math.PI / 180);
  var S20 = Math.tan(20 * Math.PI / 180), S40 = Math.tan(40 * Math.PI / 180);
  var XRF = NOSE - (ROOF - NZ) * TG;          /* front edge of the roof, 1.43 */
  var XDK = TAIL + (DECK - TZ) * T48;         /* rear edge of the engine deck, -2.36 */
  var PAINT = { base: "#4e5737", blots: ["#454e31", "#58623f"], seed: 100 };

  /* running gear (D1, P1; published 830 mm wheels, 500 mm track, 3.00 m over the tracks) */
  var TY = 1.25, TW = 0.25;
  var XW = [1.95, 1.02, -0.01, -0.94, -1.87], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.66, z: 0.665, r: 0.28 }, SPR = { x: -2.70, z: 0.59, r: 0.33 };
  /* the gun: axis height, offset right of centre (P2, P4), the muzzle 9.45 m from the tail */
  var GZ = 1.55, GY = -0.30, MUZ = TAIL + 9.45;

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
     weld seams with their bead highlight, rain streaks and grime (P2, P3, P6) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "su" + P.base + P.seed, 512, function (q, S) {
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
  /* the front plate: one plane at 50 deg from the vertical, nose to roof (ru.wiki, P2, P4) */
  var UF = unit([-TG, 0, 1]), NF = unit([1, 0, TG]);
  function glacisZ(x) { return NZ + (NOSE - x) / TG; }
  function onFront(z, y, h) { var x = NOSE - (z - NZ) * TG; return add([x, y, z], mul(NF, h || 0)); }
  /* the upper rear plate at 48 deg */
  var UR = unit([T48, 0, 1]), NR = unit([-1, 0, T48]);
  function rearZ(x) { return TZ + (x - TAIL) / T48; }
  function onRear(z, y, h) { var x = TAIL + (z - TZ) * T48; return add([x, y, z], mul(NR, h || 0)); }
  function bellyZ(x) {
    var xf = NOSE - (NZ - ZB) * T55, xr = TAIL + (TZ - ZB);
    if (x > xf) return ZB + (x - xf) / T55;
    if (x < xr) return ZB + (xr - x);
    return ZB;
  }
  function topZ(x) {
    if (x >= XRF) return glacisZ(x);
    if (x >= XR) return ROOF;
    if (x >= XDK) return DECK;
    return rearZ(x);
  }
  /* station table: x and the side-plate slope ("c" casemate 20 deg, "e" engine bay 40 deg).
     x where the front plate and the rear plate cross the sponson floor are doubled so the
     sponsons close cleanly; x = XR is doubled for the casemate's vertical rear wall. */
  var XFS = NOSE - (ZS - NZ) * TG, XRS = TAIL + (ZS - TZ) * T48;
  var ST = [[NOSE, "c"], [2.98, "c"], [2.90, "c"], [XFS, "c", 1], [XFS, "c", 2], [2.62, "c"], [2.40, "c"],
            [2.15, "c"], [1.90, "c"], [XRF, "c"], [0.80, "c"], [XR, "c"], [XR, "e"], [-1.20, "e"], [XDK, "e"],
            [-2.45, "e"], [-2.65, "e"], [XRS, "e", 2], [XRS, "e", 1], [-2.95, "e"], [TAIL, "e"]];
  function ring(x, kind, mode) {
    var zT = topZ(x), zB = bellyZ(x), sl = kind === "c" ? S20 : S40, w, zs;
    if (mode === 1 || (mode !== 2 && zT <= ZS + 1e-6)) {
      zs = Math.max(zB, Math.min(zT, ZS));
      return [[x, WB, zB], [x, WB, zs], [x, WB, zs], [x, WB, zT], [x, -WB, zT], [x, -WB, zs], [x, -WB, zs], [x, -WB, zB]];
    }
    zT = Math.max(zT, ZS);
    w = WS - (zT - ZS) * sl;
    return [[x, WB, zB], [x, WB, ZS], [x, WS, ZS], [x, w, zT], [x, -w, zT], [x, -WS, ZS], [x, -WB, ZS], [x, -WB, zB]];
  }
  function addHull(B) {
    var R = [], i, k, k1, a, b, c, d, e, dy, dz, n, s, x, y, z, p, P0;
    for (i = 0; i < ST.length; i++) R.push(ring(ST[i][0], ST[i][1], ST[i][2]));
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
      /* the ledge along the sponson's foot over the track (P1, P6) */
      box(B.paint, XRS - 0.02, XFS - 0.02, s > 0 ? WS - 0.04 : -(TY + TW), s > 0 ? TY + TW : -(WS - 0.04), ZS - 0.025, ZS + 0.012);
      /* the front mudguard: flat, then sloping down ahead of the nose (P2, P4) */
      belt(B.paint, 2.50, ZS + 0.01, 2.98, ZS + 0.01, ylo, yhi, 0.025);
      belt(B.paint, 2.98, ZS + 0.01, 3.26, 0.80, ylo, yhi, 0.025);
      belt(B.paint, 2.50, ZS - 0.04, 2.98, ZS - 0.04, s > 0 ? TY + TW - 0.02 : -(TY + TW), s > 0 ? TY + TW : -(TY + TW) + 0.02, 0.10);
      belt(B.paint, 2.98, ZS - 0.04, 3.26, 0.76, s > 0 ? TY + TW - 0.02 : -(TY + TW), s > 0 ? TY + TW : -(TY + TW) + 0.02, 0.10);
      /* the rear mudguard, flat and drooping aft (P4, P5) */
      belt(B.paint, -2.90, ZS + 0.01, -3.24, 0.86, ylo, yhi, 0.025);
      /* headlamps at the front corners (P2): lamp body on a short bracket */
      P0 = onFront(1.30, s * 1.22, 0);
      box(B.dark, P0[0] - 0.02, P0[0] + 0.12, s * 1.22 - 0.025, s * 1.22 + 0.025, P0[2] - 0.02, P0[2] + 0.10);
      cylX(B.paint, P0[0] + 0.06, P0[0] + 0.22, s * 1.22, P0[2] + 0.17, 0.095, 0.10, 14);
      cylX(B.dark, P0[0] + 0.22, P0[0] + 0.232, s * 1.22, P0[2] + 0.17, 0.082, 0.082, 14);
      /* grab handles on the engine-bay side plates (P6) */
      var nE = unit([0, s * 1, S40]), uE = unit([0, -s * S40, 1]);
      [-1.05, -1.80].forEach(function (xh) {
        var zc = ZS + 0.22, yc = s * (WS - 0.22 * S40);
        var c0 = add([xh, yc, zc], mul(nE, 0.05));
        slab(B.dark, c0, [1, 0, 0], uE, nE, 0.16, 0.012, 0.012);
        slab(B.dark, add([xh - 0.15, yc, zc], mul(nE, 0.025)), [1, 0, 0], uE, nE, 0.012, 0.012, 0.03);
        slab(B.dark, add([xh + 0.15, yc, zc], mul(nE, 0.025)), [1, 0, 0], uE, nE, 0.012, 0.012, 0.03);
      });
      /* the pistol port plug in each casemate side (ru.wiki; P6) */
      var nC = unit([0, s * 1, S20]);
      z = 1.62; y = s * (WS - (z - ZS) * S20);
      cyl(B.paint, [-0.30, y, z], add([-0.30, y, z], mul(nC, 0.04)), 0.07, 0.06, 10);
      /* the cylindrical fuel tank high on each engine-bay side (P2, P3, P4, P5) */
      var tz = ZS + 0.37, ty = WS - 0.37 * S40, tc = add([0, s * ty, tz], mul(nE, 0.215));
      cylX(B.paint, -2.30, -0.80, tc[1], tc[2], 0.205, 0.205, 18);
      cylX(B.dark, -1.56, -1.54, tc[1], tc[2], 0.209, 0.209, 18);
      [-1.05, -2.05].forEach(function (xs) {
        cylX(B.dark, xs - 0.025, xs + 0.025, tc[1], tc[2], 0.214, 0.214, 18);
        slab(B.dark, add([xs, s * (ty - 0.02), tz], mul(nE, 0.0)), [1, 0, 0], uE, nE, 0.03, 0.06, 0.03);
      });
      cylZ(B.paint, -1.00, tc[1], tc[2] + 0.18, tc[2] + 0.25, 0.05, 8);
    }

    /* --- the front plate ------------------------------------------------------ */
    /* the fixed cast boss of the mantlet and its bolted flange (P2, P3, P4) */
    var PM = onFront(GZ, GY, 0);
    cyl(B.paint, PM, add(PM, mul(NF, 0.045)), 0.50, 0.49, 28);
    for (k = 0; k < 18; k++) {
      var ba = k / 18 * TAU, bp = add(add(PM, mul(UF, Math.cos(ba) * 0.44)), [0, Math.sin(ba) * 0.44, 0]);
      cyl(B.dark, add(bp, mul(NF, 0.04)), add(bp, mul(NF, 0.07)), 0.026, 0.022, 6);
    }
    dome(B.paint, add(PM, mul(NF, 0.03)), NF, UF, 0.42, 0.43, 0.38, 26, 8);
    /* the driver's hatch, left, with two periscopes at its head, the port above it (P2) */
    var HV = [0, 1, 0];
    slab(B.paint, onFront(1.40, 0.58, 0.02), UF, HV, NF, 0.27, 0.29, 0.02);
    slab(B.paint, onFront(1.40, 0.58, 0.05), UF, HV, NF, 0.20, 0.22, 0.015);
    slab(B.dark, onFront(1.56, 0.48, 0.08), UF, HV, NF, 0.05, 0.07, 0.05);
    slab(B.dark, onFront(1.56, 0.70, 0.08), UF, HV, NF, 0.05, 0.07, 0.05);
    box(B.dark, onFront(1.56, 0.48, 0.12)[0] - 0.02, onFront(1.56, 0.48, 0.12)[0] + 0.03, 0.42, 0.54, onFront(1.56, 0.48, 0.12)[2] - 0.03, onFront(1.56, 0.48, 0.12)[2] + 0.01);
    box(B.dark, onFront(1.56, 0.70, 0.12)[0] - 0.02, onFront(1.56, 0.70, 0.12)[0] + 0.03, 0.64, 0.76, onFront(1.56, 0.70, 0.12)[2] - 0.03, onFront(1.56, 0.70, 0.12)[2] + 0.01);
    for (k = 0; k < 2; k++) slab(B.dark, onFront(1.25, 0.42 + k * 0.32, 0.035), UF, HV, NF, 0.03, 0.04, 0.015);
    cyl(B.paint, onFront(1.80, 0.58, 0), onFront(1.80, 0.58, 0.05), 0.075, 0.065, 12);
    /* six spare links in one run across the glacis, three guide horns (P4, P2) */
    for (k = 0; k < 6; k++) {
      y = -0.43 + k * 0.172;
      slab(B.dark, onFront(1.06, y, 0.025), UF, HV, NF, 0.25, 0.080, 0.022);
      slab(B.dark, onFront(1.06, y, 0.055), UF, HV, NF, 0.20, 0.018, 0.016);
      if (k % 2 === 0) slab(B.dark, onFront(1.07, y, 0.09), UF, HV, NF, 0.06, 0.05, 0.045);
    }
    slab(B.dark, onFront(1.21, -0.03, 0.05), UF, HV, NF, 0.02, 0.56, 0.02);
    slab(B.dark, onFront(0.90, -0.03, 0.05), UF, HV, NF, 0.02, 0.56, 0.02);
    /* towing hooks at the nose (P4) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, NOSE - 0.12, NOSE + 0.05, s * 0.62 - 0.05, s * 0.62 + 0.05, NZ - 0.10, NZ + 0.02);
      box(B.dark, NOSE + 0.00, NOSE + 0.07, s * 0.62 - 0.05, s * 0.62 + 0.05, NZ - 0.16, NZ - 0.06);
    }

    /* --- casemate roof -------------------------------------------------------- */
    /* commander's cupola set into the right side plate, front half (P3, P4, P6) */
    var CX = 0.40, CY = -1.00, CR = 0.33;
    cylZ(B.paint, CX, CY, 1.20, ROOF + 0.07, CR, 24);
    cylZ(B.paint, CX, CY, ROOF + 0.07, ROOF + 0.10, CR + 0.025, 24);
    cyl(B.paint, [CX, CY, ROOF + 0.10], [CX, CY, ROOF + 0.15], 0.29, 0.24, 20);
    for (k = 0; k < 5; k++) {
      var va = -Math.PI / 2 + (k - 2) * 0.62;
      slab(B.dark, [CX + Math.cos(va) * (CR + 0.003), CY + Math.sin(va) * (CR + 0.003), ROOF - 0.04], [-Math.sin(va), Math.cos(va), 0], [Math.cos(va), Math.sin(va), 0], [0, 0, 1], 0.07, 0.01, 0.018);
    }
    /* its MK-4 periscope head on the rotating roof and the hatch hinge */
    box(B.paint, CX + 0.05, CX + 0.22, CY - 0.07, CY + 0.07, ROOF + 0.12, ROOF + 0.185);
    box(B.dark, CX + 0.22, CX + 0.23, CY - 0.05, CY + 0.05, ROOF + 0.13, ROOF + 0.175);
    box(B.dark, CX - 0.30, CX - 0.22, CY - 0.10, CY + 0.10, ROOF + 0.10, ROOF + 0.16);
    /* the U grab handle on its outer face (P6) */
    for (k = 0; k < 7; k++) {
      var g0 = -Math.PI / 2 - 0.5 + k / 7 * 1.0, g1 = -Math.PI / 2 - 0.5 + (k + 1) / 7 * 1.0;
      cyl(B.dark, [CX + Math.cos(g0) * (CR + 0.05), CY + Math.sin(g0) * (CR + 0.05), 1.86], [CX + Math.cos(g1) * (CR + 0.05), CY + Math.sin(g1) * (CR + 0.05), 1.86], 0.014, 0.014, 6, true);
    }
    /* the rear roof hatch, single leaf (ru.wiki, P6), its hinges and the team plate */
    box(B.paint, XR + 0.04, XR + 0.62, -0.18, 0.62, ROOF, ROOF + 0.04);
    box(B.dark, XR + 0.06, XR + 0.12, -0.10, 0.06, ROOF + 0.04, ROOF + 0.07);
    box(B.dark, XR + 0.06, XR + 0.12, 0.38, 0.54, ROOF + 0.04, ROOF + 0.07);
    box(B.dark, XR + 0.40, XR + 0.44, 0.10, 0.34, ROOF + 0.04, ROOF + 0.08);
    box(B.team, XR + 0.18, XR + 0.36, -0.10, 0.54, ROOF + 0.04, ROOF + 0.048);
    /* the fan's armoured dome behind the cupola (P6) */
    dome(B.paint, [-0.30, -0.42, ROOF + 0.03], [0, 0, 1], [1, 0, 0], 0.17, 0.17, 0.13, 14, 4);
    cylZ(B.paint, -0.30, -0.42, ROOF - 0.01, ROOF + 0.03, 0.19, 14);
    /* the two-leaf panorama hatch at the front of the roof (ru.wiki), left of the gun */
    box(B.paint, XRF - 0.50, XRF - 0.06, 0.12, 0.70, ROOF, ROOF + 0.045);
    box(B.dark, XRF - 0.50, XRF - 0.06, 0.40, 0.42, ROOF + 0.045, ROOF + 0.055);
    /* the roof's welded edge strips */
    box(B.dark, XR + 0.005, XRF - 0.005, -(WS - (ROOF - ZS) * S20) + 0.01, -(WS - (ROOF - ZS) * S20) + 0.03, ROOF, ROOF + 0.012);
    box(B.dark, XR + 0.005, XRF - 0.005, (WS - (ROOF - ZS) * S20) - 0.03, (WS - (ROOF - ZS) * S20) - 0.01, ROOF, ROOF + 0.012);
    /* pistol port in the casemate's rear wall (ru.wiki) */
    cylX(B.paint, XR - 0.04, XR, 0.45, 1.78, 0.065, 0.075, 10);

    /* --- engine deck (P6): the central hatch, louvred intakes both sides, the rear grille --- */
    box(B.paint, -1.85, -0.80, -0.50, 0.50, DECK, DECK + 0.05);
    box(B.dark, -1.30, -1.10, -0.06, 0.06, DECK + 0.05, DECK + 0.09);
    box(B.team, -1.72, -1.48, -0.30, 0.30, DECK + 0.05, DECK + 0.058);
    for (s = -1; s <= 1; s += 2) {
      var yl0 = s * 0.58, yl1 = s * 0.92;
      box(B.dark, -2.05, -0.78, Math.min(yl0, yl1), Math.max(yl0, yl1), DECK - 0.01, DECK + 0.02);
      for (k = 0; k < 10; k++) box(B.paint, -2.02 + k * 0.125, -1.965 + k * 0.125, Math.min(yl0, yl1) + 0.02, Math.max(yl0, yl1) - 0.02, DECK + 0.02, DECK + 0.05);
    }
    box(B.dark, XDK + 0.02, -2.08, -0.92, 0.92, DECK - 0.01, DECK + 0.07);
    for (k = 0; k < 9; k++) box(B.paint, XDK + 0.03, -2.09, -0.90 + k * 0.225, -0.88 + k * 0.225, DECK + 0.07, DECK + 0.085);
    box(B.paint, XDK + 0.03, -2.09, -0.92, 0.92, DECK + 0.07, DECK + 0.075);

    /* --- the upper rear plate: two armoured exhaust cowls, bolts, tow hooks (P4, P5) --- */
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
        /* the link, its cast cross ribs on the outside (P2, P4), the guide horn inside */
        belt(B.dark, px - dx * 0.078, pz - dz * 0.078, px + dx * 0.078, pz + dz * 0.078, y - TW, y + TW, 0.05);
        belt(B.dark, px - dx * 0.02 + dz * 0.025, pz - dz * 0.02 - dx * 0.025, px + dx * 0.02 + dz * 0.025, pz + dz * 0.02 - dx * 0.025, y - TW + 0.03, y + TW - 0.03, 0.02);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.035 - dz * 0.07, pz - dz * 0.035 + dx * 0.07, px + dx * 0.035 - dz * 0.07, pz + dz * 0.035 + dx * 0.07, y - 0.035, y + 0.035, 0.09);
      }
      /* rear drive sprocket: two discs, six rollers between them (ridge engagement, ru.wiki) */
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
      /* front idler, a smaller double disc, and its crank (D1, P1) */
      cylY(B.paint, IDL.x, y - 0.20, y - 0.05, IDL.z, IDL.r, 18);
      cylY(B.paint, IDL.x, y + 0.05, y + 0.20, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y - 0.05, y + 0.05, IDL.z, IDL.r - 0.08, 12);
      cylY(B.dark, IDL.x, y + s * 0.20, y + s * 0.245, IDL.z, 0.09, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, s > 0 ? WB - 0.01 : -WB - 0.04, s > 0 ? WB + 0.04 : -WB + 0.01, IDL.z - 0.05, IDL.z + 0.05);
    }
  }

  /* road wheel pair (P3, P4, P5): two plain dished discs with rubber tyres, the hub cap
     with its bolt ring; the guide horns run in the gap between them */
  var TYRE = [0.13, 0.135, 0.125];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIM = [rr * 1.3, gg * 1.3, bb * 1.3], HUB = [rr * 0.9, gg * 0.9, bb * 0.9];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.21, y - 0.06, 0, RW, 20);
      cylY(W, 0, y + 0.06, y + 0.21, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y - 0.06, 0], [0, y + 0.06, 0], 0.30, 0.30, 12, true);
      /* the outer disc: a rim ring, then dished in to the hub */
      W.col = RIM;
      cyl(W, [0, y + s * 0.205, 0], [0, y + s * 0.218, 0], 0.335, 0.325, 20, true);
      W.col = BODY;
      cyl(W, [0, y + s * 0.218, 0], [0, y + s * 0.200, 0], 0.33, 0.17, 20, true);
      cyl(W, [0, y + s * 0.200, 0], [0, y + s * 0.232, 0], 0.17, 0.15, 14);
      W.col = HUB;
      cyl(W, [0, y + s * 0.232, 0], [0, y + s * 0.25, 0], 0.11, 0.085, 10);
      W.col = RIM;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        cyl(W, [Math.cos(a) * 0.135, y + s * 0.228, Math.sin(a) * 0.135], [Math.cos(a) * 0.135, y + s * 0.242, Math.sin(a) * 0.135], 0.016, 0.016, 5);
      }
      /* the inner disc face, seen through the gap */
      W.col = BODY;
      cyl(W, [0, y - s * 0.21, 0], [0, y - s * 0.225, 0], 0.33, 0.30, 14);
    }
  }

  /* ------------------------------------------------------------- the gun */
  /* turret frame: origin at the moving ball's centre on the gun axis, gun along +X */
  function addGun(B, len) {
    /* the moving part of the mantlet: a cast ball with the gun's collar (P3, P4) */
    ellip(B.paint, [0, 0, 0], 0.24, 0.25, 0.25, 18, 8);
    cylX(B.paint, 0.10, 0.42, 0, 0, 0.16, 0.15, 20);
    cylX(B.dark, 0.415, 0.43, 0, 0, 0.152, 0.152, 20);
    /* the D-10S tube: thick near the mantlet, a long taper, no muzzle brake (P2, P3, P4) */
    cylX(B.paint, 0.43, 1.25, 0, 0, 0.125, 0.117, 20);
    cylX(B.paint, 1.25, 1.31, 0, 0, 0.117, 0.106, 20);
    cylX(B.paint, 1.31, len - 0.14, 0, 0, 0.106, 0.088, 20);
    cylX(B.paint, len - 0.14, len, 0, 0, 0.094, 0.094, 20);
    cylX(B.dark, len - 0.004, len + 0.002, 0, 0, 0.052, 0.052, 14);
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
    var TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    var PM = onFront(GZ, GY, 0), OX = PM[0] + 0.30;
    addGun(TB, MUZ - OX);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(OX, GY, GZ);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return { build: build };
})();

/* len: the measured X extent of the build (dump.js 9.648 x 3.016 x 2.24 m): the rear
   mudguards at -3.25 m to the muzzle at +6.40 m (the published 9.45 m runs from the hull's
   tail plate at -3.05 m; the 2.24 m height is the published 2.245 m to the cupola) */
UNIT_MODELS["pact_e50_spg"] = { len: 9.648, build: HeroSU100.build };
