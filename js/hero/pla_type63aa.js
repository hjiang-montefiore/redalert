/* ============ pla_type63aa.js - HERO model: Type 63 twin 37 mm SPAAG (T-34-85 chassis) ============
   Key: pla_e60_spaag  "Type 63 twin 37mm self-propelled AA gun" (row service 1965, turret:true).
   A T-34-85 hull with its turret removed and the ring plated over, carrying a large open-topped
   welded box turret with the twin 37 mm Type 65 (61-K copy) on its field mounting.  The only
   surviving example (and the only photographs found) is the vehicle captured in Vietnam in 1972,
   shown at Aberdeen Proving Ground (en.wikipedia "Type 63/65 self-propelled anti-aircraft gun");
   this model follows it.

   START: js/hero/pla_t3485.js (HeroT3485), itself built on ru_su100.js's measured T-34 hull.
   Copied unchanged: the geometry kit, materials, paint, the hull-lower station table and every
   hull number (6.10 m hull, belly 0.40, sponson floor 1.03, nose joint 0.70, tail joint 0.90,
   60 deg glacis, 40 deg sides, 48 deg rear plate, flat roof at 1.58), the track (72 links),
   sprocket, idler, the five 830 mm wheel stations, the driver's hatch, headlamp, engine deck,
   exhaust cowls and rear plate.  CHANGED (each from the references below):
     - the cast turret is gone; the ring is closed by a flat plate held by 27 bolts (en.wiki,
       citing Steuard 1979) on which the gun's traversing base stands;
     - the open-topped welded box turret (P1, P2): vertical walls, a lower band sloping inward to
       the base, chamfered corners, a full-height slot in the front for the guns;
     - the twin 37 mm on its top carriage (P1, P2, P3);
     - the hull ball MG is removed, its collar left open (P1, P2; en.wiki "missing the hull
       machine gun");
     - one long ammunition bin on each side of the hull, outside (en.wiki: "the only ammunition
       stowage was two metal bins, one located on each side of the outside of the hull"; P1, P2
       show the left one, sloped ends, latches);
     - a channel-iron travel lock on the engine deck (en.wiki; P1, P2 show it above the deck);
     - no cylindrical fuel tanks on the rear hull sides (P1, P2: the rear side plate is bare but
       for small brackets); no front mudguards (P1, P2: the track runs bare to the idler); no
       spare links on the glacis (P1: two empty claw brackets only);
     - the road wheels are plain dished discs with a bolted hub and rubber tyre (P1, P2), not the
       starfish pattern.

   Comments in the copied hull and running-gear code that cite D1, P1-P3 "of pla_t3485" (or
   just D1) refer to pla_t3485.js's own references (a T-34-85 drawing and photographs).

   References, Wikimedia Commons, cached in scratchpad/q_pla_e60_spaag_ref:
     P1  "Type 65 37mm Air Defense Gun.jpg" (DoD photo, Aberdeen) - front left 3/4 of the vehicle:
         the box turret (vertical upper walls, the lower band sloping in, the front-left chamfer,
         the long left side, the rear chamfer), the front slot with the guns, the handwheels and
         the sight's ball collimator on its post; the plated hull, the empty MG collar, the
         driver's hatch, two claw brackets on the glacis, the left ammunition bin, the travel
         lock above the engine deck, the dished wheels.  MEASURED off it, scaled from the
         830 mm wheel (200 px over the tyre, 241 px/m at the first wheel) with a projective fit
         of the five wheel hubs to their stations (residual < 0.3 px), the lateral shift of
         points inboard of the wheels taken from the near and far track noses (~130 px a metre):
         the turret's wall top at 2.98 m (published height 2.99), the bend from vertical to the
         sloping band at 2.15 m, the base at 1.84 m; the side wall's front crease at x 1.75 and
         its rear crease near x 0.3; the front at about 2.15 (the turret overhangs the glacis);
         the muzzles at about x 3.6, z 3.2; the sight's ball near x 1.2, z 3.25; the bin from
         about 1.85 to -0.65 m.
     P2  "Type 65 DN-ST-87-07905.jpg" - the same vehicle from almost the same place: confirms P1.
     P3  "Twin-37-mm-M1939-hatzerim-1.jpg" - the towed twin 37 mm (the gun the Type 65 copies):
         the two barrels side by side, the thicker sleeve ahead of the receivers, the flared
         flash hiders, the boxy receivers with clip guides on top, the gunners' handwheel pairs
         at the sides, the handwheel on a stalk, the sight post.
   Published: SPAAG (en.wiki): length 6.432 m, width 2.99 m, height 2.99 m, 32 t, crew 6; the
   guns loaded by hand with 5-round clips.  Gun (en.wiki 61-K): 37 mm, barrel 2.73 m (L/73),
   elevation -5 to +85 deg.  Hull (ru.wiki T-34-85, via pla_t3485.js): 6.10 m, 3.00 m wide,
   clearance 0.40 m, 830 mm wheels, 500 mm track.

   CORRECTIONS against the generic model (armour_specs "ww2" hull, "opentop" turret, 2.6 m high):
   the hull is the measured T-34 hull (sloped sides, 60 deg glacis, Christie wheels); the turret
   is a tall box 2.25 m long and 2.5 m wide standing 1.4 m above the hull roof, its walls up to
   2.98 m (the generic 2.6 m is low); twin side-by-side 37 mm barrels with flash hiders through a
   front slot; ammunition bins on the hull sides; travel lock on the deck.

   Recognition list (what makes it read at game zoom, and its source):
     1. the big tall open-topped box turret with chamfered corners and an inward-sloping lower
        band, overhanging the glacis - P1, P2
     2. two long thin 37 mm barrels side by side, flared flash hiders, through a front slot - P1, P3
     3. the T-34 hull: 60 deg glacis, sloped sides, five big wheels, rear sprocket - P1, P2
     4. the long ammunition bin on each hull side - P1, P2, en.wiki
     5. the sight's ball on its post and the handwheels over the wall - P1, P3
     6. the travel lock over the engine deck - P1, en.wiki
     7. the empty MG collar and the driver's hatch on the glacis - P1
   Paint: the reference is a museum vehicle painted near-black green with a star, number and
   stencils; the PLA row takes the PLA set's green (pla_t3485.js, #505a39).  No stars, numbers or
   stencils drawn.
   NOT CONFIRMED, judgement calls (only one viewpoint exists, the front left): the turret's WIDTH
   (2.50 m at the walls, 1.90 m at the base, chosen to stay inside the published 2.99 m and to
   overhang the 1.96 m hull roof as P1 suggests), its plan behind the left side (drawn
   symmetric: the right side, rear face and rear chamfers are unseen), its rear (about -0.10 m,
   from the rear crease and silhouette), the front slot's width (0.60 m) and the front face's
   (to +-0.75 m), the chamfer sizes; the base collar under the turret (P1 shows a dark band, its
   size is guessed); the guns' trunnion (x 1.0, z 2.50) and their 0.30 m spacing; the receiver,
   cradle and carriage shapes (from P3, simplified); the right-hand gunner's handwheels (drawn
   to match the left, unseen); the right-hand ammunition bin (described, unseen; mirrored); the
   bins' section; the travel lock's exact form (a bar on two posts with a cradle and a strut);
   the vision port on the right cheek (P1 shows one on the far cheek; none drawn on the left);
   the side-wall handle; the rear hull (unseen: kept as the T-34-85's).  The ELEVATION is a
   choice: 15 deg, a modest travelling-to-firing angle (P1 shows about 20-25 deg).
   NOT DRAWN: seats, ammunition clips, crew, tools, aerial, stencils, the turret floor's bolts.

   TURRET: the node "turret" (row turret:true) holds the box turret, its base collar, the gun
   carriage and the guns; origin on the old ring's centre at the hull roof (x 0.62, z 1.58), gun
   along +X.  Nodes: "turret", five "roadwheel" groups (axle along local Y, both sides).
   Materials: PAINT (canvas texture), DARK (track, fittings, bores, handwheels), WHEEL (vertex
   colours), and the team colour exactly as handed in (C.team): a plate on the engine hatch and
   a strip along the turret's rear wall.
   Draw calls: hull 3 + turret 3 + 5 wheels = 11.
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType63Aa = (function () {
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
  var PAINT = { base: "#505a39", blots: ["#465031", "#5a6441"], seed: 6365 };

  /* running gear (D1, SU-100; published 830 mm wheels, 500 mm track, 3.00 m over the tracks) */
  var TY = 1.25, TW = 0.25;
  var XW = [1.95, 1.02, -0.01, -0.94, -1.87], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.66, z: 0.665, r: 0.28 }, SPR = { x: -2.70, z: 0.59, r: 0.33 };
  /* the turret (P1): the old ring centre (D1 of pla_t3485.js); turret heights above the hull
     roof: the base 1.84, the bend 2.15, the wall top 2.98 (P1; published height 2.99) */
  var TX = 0.62, ZTB = 1.84 - ROOF, ZTK = 2.15 - ROOF, ZTT = 2.98 - ROOF;
  /* the guns: trunnion (turret frame), elevation (a CHOICE, 15 deg), barrel spacing */
  var GT = [1.00 - TX, 0, 2.50 - ROOF], GEL = 15 * Math.PI / 180, GY = 0.15;

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
    return canvasTex(THREE, "type63aa" + P.base + P.seed, 512, function (q, S) {
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
      /* no front mudguards: P1/P2 show the track bare up to the idler */
      /* the rear mudguard, flat and drooping aft (pla_t3485 P2; unseen here, kept) */
      belt(B.paint, -2.90, ZS + 0.01, -3.24, 0.86, ylo, yhi, 0.025);
      /* grab handles on the side plates (D1 shows the marks forward and aft) */
      var nE = unit([0, s * 1, S40]), uE = unit([0, -s * S40, 1]);
      [1.05, 0.05].forEach(function (xh) {
        var zc = ZS + 0.30, yc = s * (WS - 0.30 * S40);
        slab(B.dark, add([xh, yc, zc], mul(nE, 0.05)), [1, 0, 0], uE, nE, 0.16, 0.012, 0.012);
        slab(B.dark, add([xh - 0.15, yc, zc], mul(nE, 0.025)), [1, 0, 0], uE, nE, 0.012, 0.012, 0.03);
        slab(B.dark, add([xh + 0.15, yc, zc], mul(nE, 0.025)), [1, 0, 0], uE, nE, 0.012, 0.012, 0.03);
      });
      /* no external fuel tanks (P1, P2: the rear side plate is bare); their strap brackets
         stay as small hooks */
      var tz = ZS + 0.36, ty = WS - 0.36 * S40;
      [-1.30, -2.00].forEach(function (xs) {
        slab(B.dark, add([xs, s * ty, tz], mul(nE, 0.02)), [1, 0, 0], uE, nE, 0.03, 0.06, 0.03);
      });
      /* the ammunition bin along the side plate (en.wiki; P1, P2): a wedge filling the slope
         from the sponson ledge to the roof edge, the outer face almost vertical, the ends
         sloped (bottom 1.85 to -0.65, top 1.55 to -0.40), a lid line and two latches */
      var BI = [[WS + 0.03, ZS + 0.012], [WS - 0.05, ROOF + 0.02], [WR + 0.02, ROOF + 0.02], [WR + 0.02, ROOF - 0.03], [WS - 0.02, ZS + 0.012]];
      var bx0 = [1.85, -0.65], bx1 = [1.55, -0.40], bl = [], bk;
      [0, 1].forEach(function (e) {
        var ring2 = [];
        for (bk = 0; bk < BI.length; bk++) {
          var tt = (BI[bk][1] - ZS) / (ROOF + 0.02 - ZS), xx = e === 0 ? bx0[0] + (bx1[0] - bx0[0]) * tt : bx0[1] + (bx1[1] - bx0[1]) * tt;
          ring2.push([xx, s * BI[bk][0], BI[bk][1]]);
        }
        bl.push(ring2);
      });
      loftN(B.paint, bl);
      box(B.dark, 1.52, -0.37, s > 0 ? WS - 0.08 : -(WS - 0.04), s > 0 ? WS - 0.04 : -(WS - 0.08), ROOF + 0.005, ROOF + 0.025);
      [1.05, 0.10].forEach(function (xl) {
        box(B.dark, xl - 0.04, xl + 0.04, s > 0 ? WS - 0.03 : -(WS - 0.01), s > 0 ? WS - 0.01 : -(WS - 0.03), ROOF - 0.10, ROOF - 0.02);
      });
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
    /* the ball MG's armoured collar on the right, the gun removed and the hole open (P1) */
    var PB = onFront(1.18, -0.48, 0);
    dome(B.paint, PB, NF, UF, 0.17, 0.17, 0.06, 16, 3);
    cyl(B.dark, add(PB, mul(NF, 0.055)), add(PB, mul(NF, 0.065)), 0.10, 0.10, 14);
    /* two empty spare-link claw brackets on the lower glacis (P1) */
    for (s = -1; s <= 1; s += 2) {
      slab(B.dark, onFront(0.92, s * 0.40, 0.03), UF, HV, NF, 0.10, 0.025, 0.03);
      slab(B.dark, onFront(0.99, s * 0.40, 0.07), UF, HV, NF, 0.025, 0.025, 0.05);
    }
    /* towing hooks at the nose */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, NOSE - 0.12, NOSE + 0.05, s * 0.62 - 0.05, s * 0.62 + 0.05, NZ - 0.10, NZ + 0.02);
      box(B.dark, NOSE + 0.00, NOSE + 0.07, s * 0.62 - 0.05, s * 0.62 + 0.05, NZ - 0.16, NZ - 0.06);
    }
    /* the glacis-to-roof weld and the roof's edge strips */
    box(B.dark, XDK + 0.01, XRF - 0.01, WR - 0.03, WR - 0.01, ROOF, ROOF + 0.012);
    box(B.dark, XDK + 0.01, XRF - 0.01, -WR + 0.01, -WR + 0.03, ROOF, ROOF + 0.012);
    /* the plate bolted over the old turret ring with 27 bolts (en.wiki, Steuard 1979) */
    cylZ(B.paint, TX, 0, ROOF - 0.01, ROOF + 0.03, 1.00, 32);
    for (k = 0; k < 27; k++) {
      var ba = k / 27 * TAU;
      cylZ(B.dark, TX + Math.cos(ba) * 0.94, Math.sin(ba) * 0.94, ROOF + 0.03, ROOF + 0.05, 0.022, 6);
    }

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

    /* the channel-iron travel lock over the engine deck (en.wiki; P1, P2 show a bar on posts
       above the deck and a strut behind it): two posts, the fore-and-aft channel, the barrel
       cradle at its front, the strut to the rear deck.  Form NOT CONFIRMED. */
    [-0.75, -1.70].forEach(function (xp) {
      box(B.dark, xp - 0.04, xp + 0.04, -0.05, 0.05, ROOF + 0.05, ROOF + 0.40);
      box(B.dark, xp - 0.10, xp + 0.10, -0.10, 0.10, ROOF + 0.05, ROOF + 0.07);
    });
    box(B.dark, -1.80, -0.55, -0.04, 0.04, ROOF + 0.40, ROOF + 0.46);
    box(B.dark, -0.62, -0.52, -0.30, 0.30, ROOF + 0.40, ROOF + 0.45);
    for (s = -1; s <= 1; s += 2) box(B.dark, -0.62, -0.52, s * 0.30 - 0.025, s * 0.30 + 0.025, ROOF + 0.45, ROOF + 0.60);
    box(B.dark, -0.62, -0.52, -0.025, 0.025, ROOF + 0.45, ROOF + 0.60);
    cyl(B.dark, [-1.75, 0, ROOF + 0.43], [-2.20, 0, ROOF + 0.07], 0.025, 0.025, 6);

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

  /* road wheel pair (P1, P2): a wide rubber tyre, a plain pressed disc dished in to the hub
     (no spokes, no holes), a raised ring part way in, the hub cap with six bolts; the guide
     horns run in the gap between the two wheels */
  var TYRE = [0.13, 0.135, 0.125];
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
      /* the outer disc: the rim ring, the dish down to the hub, the raised ring */
      W.col = RIM;
      cyl(W, [0, y + s * 0.205, 0], [0, y + s * 0.218, 0], 0.32, 0.31, 22, true);
      W.col = BODY;
      cyl(W, [0, y + s * 0.214, 0], [0, y + s * 0.180, 0], 0.315, 0.12, 22, true);
      W.col = RIM;
      cyl(W, [0, y + s * 0.198, 0], [0, y + s * 0.204, 0], 0.235, 0.225, 22, true);
      W.col = BODY;
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
  /* turret frame: origin on the old ring centre at the hull roof, gun along +X; z above the
     hull roof.  The welded box's plan at the walls (P1: the front near 2.15 m, the side wall's
     creases at 1.75 and 0.3, the rear near -0.10; the width 2.50 m NOT CONFIRMED), CCW from the
     left edge of the front slot; the slot (between the last and first vertex) is open */
  var PL = [[1.53, 0.30], [1.53, 0.75], [1.13, 1.25], [-0.32, 1.25], [-0.72, 0.85],
            [-0.72, -0.85], [-0.32, -1.25], [1.13, -1.25], [1.53, -0.75], [1.53, -0.30]];
  var INSET = 0.30;                          /* the lower band slopes in 0.30 m to the base */
  function inset(P, d) {
    var n = P.length, out = [], i, p0, p1, p2, n1, n2, k;
    function nrm(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy); return [-dy / l, dx / l]; }
    for (i = 0; i < n; i++) {
      p0 = P[(i + n - 1) % n]; p1 = P[i]; p2 = P[(i + 1) % n];
      n1 = nrm(p0, p1); n2 = nrm(p1, p2);
      k = d / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
      out.push([p1[0] + (n1[0] + n2[0]) * k, p1[1] + (n1[1] + n2[1]) * k]);
    }
    return out;
  }
  /* a sheet-metal panel through the quad a b c d, th thick toward the inside point q */
  function panel(bin, a, b, c, d, th, q) {
    var n = unit(cross(sub(b, a), sub(d, a))), m = mul(add(add(a, b), add(c, d)), 0.25);
    if (dot(n, sub(q, m)) < 0) n = mul(n, -1);
    var o = mul(n, th);
    hexa(bin, [a, b, c, d, add(a, o), add(b, o), add(c, o), add(d, o)]);
  }
  function along(P, t) { return [GT[0] + Math.cos(GEL) * t + P[0], P[1], GT[2] + Math.sin(GEL) * t + P[2]]; }
  function handwheel(bin, C, ax, r) {
    var u = Math.abs(ax[2]) < 0.9 ? unit(cross(ax, [0, 0, 1])) : [1, 0, 0], v = cross(ax, u), i, a0, a1, p0, p1;
    for (i = 0; i < 12; i++) {
      a0 = i / 12 * TAU; a1 = (i + 1) / 12 * TAU;
      p0 = add(C, add(mul(u, Math.cos(a0) * r), mul(v, Math.sin(a0) * r)));
      p1 = add(C, add(mul(u, Math.cos(a1) * r), mul(v, Math.sin(a1) * r)));
      cyl(bin, p0, p1, 0.012, 0.012, 5, true);
    }
    for (i = 0; i < 3; i++) {
      a0 = i / 3 * TAU;
      cyl(bin, C, add(C, add(mul(u, Math.cos(a0) * r), mul(v, Math.sin(a0) * r))), 0.008, 0.008, 4, true);
    }
    cyl(bin, add(C, mul(ax, -0.03)), add(C, mul(ax, 0.03)), 0.025, 0.025, 8);
  }
  function addTurret(B) {
    var top = [], bend = [], base, i, j, n = PL.length, q = [0.4, 0, ZTK], th = 0.02, s, k, p;
    base = inset(PL, INSET);
    for (i = 0; i < n; i++) {
      top.push([PL[i][0], PL[i][1], ZTT]); bend.push([PL[i][0], PL[i][1], ZTK]);
      base[i] = [base[i][0], base[i][1], ZTB];
    }
    /* the walls: a vertical upper panel and a sloping lower panel on each edge; the edge
       between the last and first vertex is the open front slot (P1) */
    for (i = 0; i + 1 < n; i++) {
      j = i + 1;
      panel(B.paint, bend[i], bend[j], top[j], top[i], th, q);
      panel(B.paint, base[i], base[j], bend[j], bend[i], th, q);
    }
    /* the rolled rim along the wall tops */
    for (i = 0; i + 1 < n; i++) cyl(B.paint, top[i], top[i + 1], 0.018, 0.018, 6);
    /* the floor plate on the base (the turret is bolted to the gun mount's floor, en.wiki) */
    var fl = base.map(function (v) { return [v[0], v[1], ZTB + 0.01]; });
    loftN(B.paint, [fl, fl.map(function (v) { return [v[0], v[1], ZTB + 0.04]; })]);
    /* the traversing base under it, standing on the bolted plate (P1: a dark band) */
    cylZ(B.dark, 0, 0, 0.05, ZTB + 0.01, 0.80, 28);
    cylZ(B.paint, 0, 0, 0.05, 0.10, 0.86, 28);
    /* the vision port in the right cheek (P1) */
    box(B.dark, 1.53 - 0.005, 1.53 + 0.004, -0.62, -0.44, ZTT - 0.32, ZTT - 0.12);
    /* the handle on each side wall over a flap (P1, left side; mirrored) and lifting eyes */
    for (s = -1; s <= 1; s += 2) {
      var yh0 = s * 1.29, yh1 = s * 1.31;
      box(B.dark, -0.02, 0.40, Math.min(yh0, yh1), Math.max(yh0, yh1), ZTT - 0.20, ZTT - 0.18);
      [0.0, 0.38].forEach(function (xh) { box(B.dark, xh - 0.012, xh + 0.012, s > 0 ? 1.25 : -1.31, s > 0 ? 1.31 : -1.25, ZTT - 0.20, ZTT - 0.17); });
      box(B.dark, 0.20, 0.26, s * 1.24 - 0.01, s * 1.24 + 0.01, ZTT, ZTT + 0.05);
    }
    /* the team strip along the rear wall's top */
    box(B.team, -0.73 - 0.012, -0.72, -0.60, 0.60, ZTT - 0.16, ZTT - 0.08);

    /* --- the twin 37 mm on its top carriage (P1, P3) --------------------------------------- */
    /* the pedestal on the floor (the traversing gearbox, en.wiki) and the two carriage cheeks
       carrying the trunnions */
    cylZ(B.dark, GT[0] - 0.10, 0, ZTB + 0.04, ZTB + 0.30, 0.40, 18);
    for (s = -1; s <= 1; s += 2) {
      hexa(B.paint, [[GT[0] - 0.45, s * 0.36, ZTB + 0.30], [GT[0] + 0.30, s * 0.36, ZTB + 0.30], [GT[0] + 0.30, s * 0.42, ZTB + 0.30], [GT[0] - 0.45, s * 0.42, ZTB + 0.30],
                     [GT[0] - 0.10, s * 0.36, GT[2] + 0.06], [GT[0] + 0.12, s * 0.36, GT[2] + 0.06], [GT[0] + 0.12, s * 0.42, GT[2] + 0.06], [GT[0] - 0.10, s * 0.42, GT[2] + 0.06]]);
      cylY(B.dark, GT[0], s * 0.34, s * 0.46, GT[2], 0.07, 12);
    }
    var E = [Math.cos(GEL), 0, Math.sin(GEL)], W = [0, 1, 0], Uz = [-Math.sin(GEL), 0, Math.cos(GEL)];
    /* the cradle between the cheeks */
    slab(B.paint, along([0, 0, 0], 0.05), E, W, Uz, 0.40, 0.33, 0.12);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * GY;
      /* the receiver, the clip guide on top, the sleeve ahead, the tube, the flared flash hider */
      slab(B.paint, along([0, y0, 0], -0.25), E, W, Uz, 0.55, 0.10, 0.15);
      slab(B.dark, add(along([0, y0, 0], -0.30), mul(Uz, 0.22)), E, W, Uz, 0.10, 0.06, 0.07);
      slab(B.dark, add(along([0, y0, 0], -0.12), mul(Uz, 0.22)), E, W, Uz, 0.02, 0.06, 0.07);
      cyl(B.paint, along([0, y0, 0], 0.30), along([0, y0, 0], 0.95), 0.065, 0.06, 14);
      cyl(B.paint, along([0, y0, 0], 0.95), along([0, y0, 0], 2.56), 0.036, 0.031, 12);
      cyl(B.paint, along([0, y0, 0], 2.56), along([0, y0, 0], 2.82), 0.038, 0.062, 14);
      cyl(B.dark, along([0, y0, 0], 2.815), along([0, y0, 0], 2.825), 0.022, 0.022, 10);
    }
    /* the left gunner's pair of handwheels at the side of the carriage (P1, P3) and the
       right gunner's (mirrored, unseen) */
    for (s = -1; s <= 1; s += 2) {
      handwheel(B.dark, [GT[0] + 0.20, s * 0.55, GT[2] - 0.12], [0, 1, 0], 0.11);
      handwheel(B.dark, [GT[0] - 0.08, s * 0.55, GT[2] - 0.12], [0, 1, 0], 0.11);
      cylY(B.dark, GT[0] + 0.20, s * 0.42, s * 0.55, GT[2] - 0.12, 0.015, 6);
      cylY(B.dark, GT[0] - 0.08, s * 0.42, s * 0.55, GT[2] - 0.12, 0.015, 6);
    }
    /* the sight post at the left of the guns with its ball collimator (P1, P3) */
    p = [GT[0] + 0.20, 0.40, GT[2] + 0.06];
    cylZ(B.dark, p[0], p[1], p[2], ZTT + 0.12, 0.035, 8);
    box(B.dark, p[0] - 0.08, p[0] + 0.08, p[1] - 0.05, p[1] + 0.05, ZTT + 0.06, ZTT + 0.16);
    ellip(B.dark, [p[0], p[1], ZTT + 0.24], 0.08, 0.08, 0.09, 12, 6);
    box(B.dark, p[0] - 0.02, p[0] + 0.12, p[1] - 0.06, p[1] + 0.06, ZTT + 0.32, ZTT + 0.34);
    /* the handwheel on a stalk on the right (P1, P3) */
    cyl(B.dark, [GT[0] + 0.10, -0.36, GT[2] + 0.06], [GT[0] + 0.05, -0.36, ZTT + 0.22], 0.025, 0.025, 6);
    handwheel(B.dark, [GT[0] + 0.05, -0.36, ZTT + 0.22], unit([0.3, 0, 1]), 0.10);
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
   muzzles at +3.74 m with the guns at the chosen 15 deg (the published 6.432 m matches neither
   the 6.10 m hull nor any gun position; not used) */
UNIT_MODELS["pla_e60_spaag"] = { len: 6.99, build: HeroType63Aa.build };
