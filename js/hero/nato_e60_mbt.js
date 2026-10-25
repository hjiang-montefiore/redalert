/* ========== nato_e60_mbt.js - HERO model: M60A1 Patton (nato_e60_mbt) ===========
   The US Army's main battle tank of the 1960s and 70s, drawn as the M60A1 the row names
   (service 1962): the long hull with its cast nose, six dual road wheels and three return
   rollers a side, the rear drive sprocket, the long "needle nose" cast turret of the A1
   with its bustle rack, the M68 105 mm gun with its bore evacuator and plain muzzle, the
   M19 commander's cupola with the M85 .50 cal on the right, and the AN/VSS-1 xenon
   searchlight over the gun.  NOT the M60A2 (152 mm) nor the M60A3 (laser rangefinder,
   thermal sleeve, smoke grenade launchers - 1979 on); NOT the 1980s RISE/ERA tanks.

   REDO 2026-10-24 (full-quality procedure).  Still the style anchor of the e60 roster;
   nothing outside this file reads its builder (grep js/ and tools/jsc/: only the key).
   References, Wikimedia Commons, width 960, cached in scratchpad/q_m60_ref:
     P1  "Tank, Combat, FT, 105 mm Gun, M60A1.jpg" (US Army, March 1970), port front 3/4:
         the AN/VSS-1 searchlight on its bracket over the gun shield, the canvas mantlet
         cover, the bore evacuator about a fifth of the way out, the bustle rack, the
         cupola on the right, six dual road wheels, the raised idler, the flat fenders.
     P2  "M60A1 tank of the US Army in 1975.jpg" (Germany, 1975), head on: the cast nose
         rounded in plan, the driver's hatch centred at the top of the glacis, the
         headlight groups in their guards on the glacis corners, the front fenders with
         their down-turned ends, the searchlight (canvas covered) over the gun, the
         turret's narrow front, period olive drab.
     P3  "M60A1.png" (pilot tank, 1960s, starboard front 3/4): the turret plan - widest
         a little behind the ring, tapering to a narrow nose - the M19 cupola with the
         M85, the bustle rack, the two whip antennas at the turret rear, olive drab, no
         searchlight yet (the pilot).
     P4  "US Army M60A1 tank turret top details.jpg" (1975): the rangefinder end housing
         on the turret side, the grab handle, the loader's side of the roof.
     P5  "M60A1 P5250338.JPG" (Fort Knox), starboard front 3/4, measured on a 2x crop
         against the 0.66 m road wheel (about 96 px/m): the HIGH upper track run on its
         three support rollers well above the wheel tops (top run about 1.4 m), the fender
         on it, the deck only about 0.3 m higher (turret base about 1.75 m), the turret
         about 0.95 m tall at the side, the cupola top 3.2 m; the wedge nose; the rear
         sprocket; the rangefinder boss on the turret side; the rubber-padded T142 track.
     P6  "M60 Tank Driving up Dusty Road, Fort Carson Colorado, 1969 (CC 63535).jpg"
         (starboard front 3/4): olive drab in 1969, the wheel spacing, the track run.
     P7  "M60A1-Patton-latrun-1.jpg" (Latrun museum), head on: the cast nose shape, the
         round headlight guards, the tow eyes low on the nose, the turret front.
     P8  "A M-60A1 tank,located in the Battleship Memorial Park..." (starboard front 3/4):
         the searchlight bracket on the gun shield, the cupola and its vision blocks.
     P9  "105 mm Gun Full Tracked Combat Tank M60A1-M60A3 Texas Military Forces Museum":
         the running gear and fenders from the port front (the M60A3's smoke
         launchers there are NOT drawn).
   No scale drawing could be fetched (Commons holds no M60 three-view); the station
   tables are built from the published figures below and the near-orthogonal P2/P7 (front)
   and P1/P5 (sides), as the brief's fallback allows.
   Published figures (en.wikipedia M60 Patton; Hunnicutt, Patton, 1984): hull 6.946 m,
   9.436 m gun forward, width 3.631 m, height 3.213 m to the cupola top, ground clearance
   0.46 m, track 0.71 m (T142) on a 2.92 m tread, six 0.66 m road wheels and three track
   support rollers a side, rear drive, turret ring 2.16 m (85 in), M68 105 mm L/52.
   The old header's figures are kept (hull 6.946, 9.436 gun forward, 3.631 wide, 0.71
   track, 0.66 wheels, rear sprocket).
   CORRECTIONS against the previous model:
   - smoke grenade launchers on the turret sides: the M239 came with the M60A3 and the
     1980s RISE refits; P1, P2, P3, P6 (1960s-1975) show none.  Removed.
   - spare track links on the glacis and the turret cheek: no 1960s-70s reference shows
     them.  Removed.
   - road-wheel pitch 0.92 m -> 0.83 m (the published 4.2 m ground contact; P1, P5, P6
     show the wheels nearly touching); the support rollers raised from 0.95-1.0 m to
     1.20 m and the fender lowered from 1.65 m to 1.42 m so the Patton's high top run
     and the hull wall over it show (P5); the deck kept at about 1.72 m and the cupola
     top on the published 3.21 m; the glacis steepened to the cast nose (P5); the
     needle-nose turret narrowed at the roof (P2, P3); the cupola moved to the right
     rear of the roof (P3, P8); the searchlight and mantlet re-proportioned (P1, P5).
   - "roadwheel" groups added (render3d spins them); len is now the measured X extent.

   Recognition list (what makes it read at game zoom, and its source):
     1. long flat hull, the long shallow glacis falling to a cast wedge nose - P5, P2, P7
     2. six dual road wheels nearly touching, three return rollers, raised front idler
        and rear sprocket, the rubber-padded T142 track - P1, P5, P6, P9
     3. flat fenders at track-top level the full length, turned down at the front with
        rubber flaps - P2, P5, P7
     4. the long needle-nose cast turret, widest just behind the ring, flat roof - P3, P5
     5. the M68 105 mm with the bore evacuator about a fifth of the way out, plain muzzle
        with a thin collar - P1, P3, P5
     6. the AN/VSS-1 xenon searchlight box over the gun shield - P1, P2, P8
     7. the M19 cupola on the right rear of the roof, the M85 .50 in its front - P3, P8
     8. the bustle rack around the turret rear and the two whip antennas - P1, P3, P5
     9. the rangefinder end housings on the turret sides - P4, P5
    10. headlight groups in round guards on the glacis corners, driver's hatch centred
        at the top of the glacis - P2, P7
   Paint: US Army olive drab, the colour of every 1960s-1975 photograph (P1-P3, P6);
   MERDC came in 1975-76 (P4's 1975 tank already wears it) and is not drawn for a 1962
   row.  Sampled: P3 hull side #495244 (a faded 1960s print), P2 lit plate #646b69 and
   shadow #4c5353; drawn as #4f5436, about 0.8 of a lit olive drab.  No markings, numbers,
   bumper codes or stars.
   NOT CONFIRMED, drawn as judgement calls: the engine-deck grille and access-plate
   layout; the fender stowage boxes (one each side ahead of the air cleaners); the
   air-cleaner boxes on the rear fenders; the return-roller spacing; the exact turret
   plan (no drawing); the rangefinder housings' size.
   NOT DRAWN (no 1960s-70s reference): smoke launchers, spare track, a dozer blade,
   stowage in the bustle rack (the crews' loads vary), the IR periscope.

   Materials: PAINT (canvas texture: base, mottling, cast pitting, weld seams, grime;
   metre UVs), DARK (track, rubber, fittings), LENS (vision blocks, lamps, by vertex
   colour), WHEEL (tyres, discs, hubs by vertex colour) and the team colour exactly as
   handed in (C.team): two small strips (engine deck, turret roof).
   Nodes: "turret" (trains, origin on the ring centre, gun along +X), six "roadwheel"
   groups (axle along local Y, each holding both sides).  Draw calls: hull 4 + turret 4
   + 6 wheels = 14.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM60 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A1: { paint: { base: "#4f5436", blots: ["#474b30", "#59603e"], seed: 601 }, searchlight: true }
  };

  /* hull and running gear (published: 6.946 m hull, 2.92 m tread, 0.71 m track, 0.66 m
     wheels, 0.46 m clearance; wheel pitch from the 4.2 m ground contact, P5, P6) */
  var NOSE = 3.473, TAIL = -3.473;
  var TY = 1.46, TW = 0.355;
  var XW = [2.03, 1.198, 0.366, -0.466, -1.298, -2.13], ZW = 0.42, RW = 0.33;
  var IDL = { x: 2.98, z: 0.80, r: 0.31 }, SPR = { x: -3.07, z: 0.86, r: 0.32 };
  var ROL = [1.55, -0.05, -1.70], ZR = 1.20, RR = 0.12;
  var DECK = 1.72, FEND = 1.42, FW = 1.815, WB = 1.06, WS = 1.50, GL0 = 1.75, GK = 0.50;
  var TX = 0.20;                                /* turret ring centre */
  var MUZ = TAIL + 9.436 - TX;                  /* muzzle in the turret frame: 9.436 m gun forward */
  var GZ = 0.42;                                /* gun axis over the ring (P1, P5) */

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (Math.abs(cr[0]) + Math.abs(cr[1]) + Math.abs(cr[2]) < 1e-9) return;
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
    if (nocap) {
      /* an open tube has no volume to orient by: wind each face away from the axis */
      for (i = 0; i < seg; i++) {
        j = (i + 1) % seg;
        var h = [N[2 * i][0] + N[2 * j][0], N[2 * i][1] + N[2 * j][1], N[2 * i][2] + N[2 * j][2]];
        var f1 = cross(sub(V[2 * j], V[2 * i]), sub(V[2 * j + 1], V[2 * i]));
        if (dot(f1, h) >= 0) { bin.tri(V[2 * i], V[2 * j], V[2 * j + 1], N[2 * i], N[2 * j], N[2 * j + 1]); bin.tri(V[2 * i], V[2 * j + 1], V[2 * i + 1], N[2 * i], N[2 * j + 1], N[2 * i + 1]); }
        else { bin.tri(V[2 * i], V[2 * j + 1], V[2 * j], N[2 * i], N[2 * j + 1], N[2 * j]); bin.tri(V[2 * i], V[2 * i + 1], V[2 * j + 1], N[2 * i], N[2 * i + 1], N[2 * j + 1]); }
      }
      return;
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg, nocap) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocap); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through LEVELS, each a convex ring of [x, y, z] with the same count */
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
  /* a cast body: rings along x (each convex in y-z, same count) with smoothed normals,
     the end rings capped flat; normals pointed away from the ring's own centre */
  function castLoft(bin, L) {
    var n = L[0].length, m = L.length, NA = [], k, i, a, b, c, d;
    var ctr = L.map(function (R) { var s = [0, 0, 0]; R.forEach(function (p) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; }); return [s[0] / n, s[1] / n, s[2] / n]; });
    for (k = 0; k < m; k++) { NA.push([]); for (i = 0; i < n; i++) NA[k].push([0, 0, 0]); }
    function acc(k, i, f) { NA[k][i][0] += f[0]; NA[k][i][1] += f[1]; NA[k][i][2] += f[2]; }
    var Q = [];
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var i1 = (i + 1) % n;
        a = L[k][i]; b = L[k][i1]; c = L[k + 1][i1]; d = L[k + 1][i];
        var f = cross(sub(c, a), sub(d, b)), mid = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2];
        var cc = [(ctr[k][0] + ctr[k + 1][0]) / 2, (ctr[k][1] + ctr[k + 1][1]) / 2, (ctr[k][2] + ctr[k + 1][2]) / 2];
        if (dot(f, sub(mid, cc)) < 0) f = [-f[0], -f[1], -f[2]];
        f = unit(f);
        acc(k, i, f); acc(k, i1, f); acc(k + 1, i1, f); acc(k + 1, i, f);
        Q.push([k, i, i1, f]);
      }
    Q.forEach(function (q) {
      var k = q[0], i = q[1], i1 = q[2], f = q[3];
      var A = L[k][i], B = L[k][i1], Cc = L[k + 1][i1], Dd = L[k + 1][i];
      var nA = unit(NA[k][i]), nB = unit(NA[k][i1]), nC = unit(NA[k + 1][i1]), nD = unit(NA[k + 1][i]);
      var t = cross(sub(B, A), sub(Cc, A));
      if (dot(t, f) >= 0) { bin.tri(A, B, Cc, nA, nB, nC); bin.tri(A, Cc, Dd, nA, nC, nD); }
      else { bin.tri(A, Cc, B, nA, nC, nB); bin.tri(A, Dd, Cc, nA, nD, nC); }
    });
    [0, m - 1].forEach(function (k) {
      var hint = k === 0 ? [-1, 0, 0] : [1, 0, 0], R = L[k];
      for (i = 1; i + 1 < n; i++) triN(bin, R[0], R[i], R[i + 1], hint);
    });
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
  /* paint: one tile is 1 / 0.34 = 2.9 m. Olive drab base, soft mottling, the orange-peel
     pitting of the cast turret and nose, weld seams with bolt rows, dust and rain streaks
     (P1, P2, P6) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "m60" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.28 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 1100; i++) {
        q.fillStyle = (i % 2) ? "rgba(18,20,12,0.15)" : "rgba(230,232,205,0.07)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 2);
      }
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(200,190,160,0.06)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), VC = THREE.VertexColors !== undefined ? THREE.VertexColors : true;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x252623, roughness: 0.8, metalness: 0.28 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: VC });
    T.lens = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.2, vertexColors: VC });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), lens: new Bin(T.lens, false, true), team: new Bin(T.team, false) }; }
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
  var GLASS = [0.30, 0.42, 0.46], LAMP = [0.80, 0.78, 0.66], RED = [0.55, 0.12, 0.08];

  /* ---------------------------------------------------------------- hull */
  /* deck height along the hull: flat to the glacis break, then the long upper glacis at
     about 22 deg (P5) down to the cast nose */
  function deckZ(x) { return x <= GL0 ? DECK : DECK - GK * (x - GL0); }
  /* station table (published 6.946 m hull and 0.46 m clearance; P5 side, P2/P7 front):
     x, lower-hull half width, belly z, sponson half width.  The sponson floor and the
     fender sit at track-top level (FEND); forward of the glacis crossing it the hull is the
     narrow cast nose, rounded in plan (P2, P7); the belly rises in the lower nose plate. */
  var HS = [
    [-3.473, 1.02, 0.68, 1.47],
    [-3.43, 1.05, 0.56, 1.49],
    [-3.36, 1.06, 0.48, 1.50],
    [-3.20, 1.06, 0.46, 1.50],
    [-1.50, 1.06, 0.46, 1.50],
    [ 0.20, 1.06, 0.46, 1.50],
    [ 1.75, 1.06, 0.46, 1.50],
    [ 2.05, 1.06, 0.46, 1.49],
    [ 2.32, 1.06, 0.46, 1.45],
    [ 2.38, 1.06, 0.46, 1.06],
    [ 2.75, 1.06, 0.47, 1.06],
    [ 2.85, 1.05, 0.50, 1.05],
    [ 3.05, 1.02, 0.56, 1.02],
    [ 3.22, 0.97, 0.62, 0.97],
    [ 3.36, 0.88, 0.69, 0.88],
    [ 3.44, 0.78, 0.74, 0.78],
    [ 3.473, 0.66, 0.78, 0.66]
  ];
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = Math.max(deckZ(x), zB + 0.06), e = Math.min(0.03, (zT - zB) / 4);
    var zS = Math.min(FEND, zT - 2 * e);
    if (x < -3.40) zT = Math.min(zT, DECK - (x < -3.45 ? 0.08 : 0.025));
    return [[x, wb, zB], [x, wb, zS], [x, ws, zS], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, zS], [x, -wb, zS], [x, -wb, zB]];
  }

  function addHull(B, V) {
    var R = HS.map(hullRing), i, j, k, k1, a, b, c, d, e, dy, dz, s, x, n = R[0].length;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) { dy = c[1] - d[1]; dz = c[2] - d[2]; }
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    /* end caps: the lower hull box and the sponson band, each a convex quad */
    [[0, -1], [R.length - 1, 1]].forEach(function (q) {
      var r = R[q[0]], h = [q[1], 0, 0];
      triN(B.paint, r[0], r[1], r[8], h); triN(B.paint, r[0], r[8], r[9], h);
      triN(B.paint, r[2], r[3], r[6], h); triN(B.paint, r[2], r[6], r[7], h);
      triN(B.paint, r[3], r[4], r[5], h); triN(B.paint, r[3], r[5], r[6], h);
    });

    for (s = -1; s <= 1; s += 2) {
      var yi = s * 1.02, yo = s * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* the flat fender at track-top level, the full length (P5), its turned-down outer
         lip, and forward of the hull's sponson the front fender over the idler, falling at
         its end, with the rubber mud flap hanging off it (P2, P7) */
      box(B.paint, -3.43, 2.95, s > 0 ? WS - 0.02 : -FW, s > 0 ? FW : -(WS - 0.02), FEND, FEND + 0.035);
      box(B.paint, -3.43, 2.95, s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -FW + 0.025, FEND - 0.06, FEND + 0.035);
      box(B.paint, 2.28, 2.95, ylo, yhi, FEND, FEND + 0.035);
      belt(B.paint, 2.95, FEND + 0.018, 3.36, FEND - 0.05, ylo, yhi, 0.035);
      belt(B.paint, 3.36, FEND - 0.05, 3.46, FEND - 0.34, ylo + 0.01, yhi - 0.01, 0.045);
      box(B.paint, 3.12, 3.44, ylo + 0.01, ylo + 0.045, FEND - 0.30, FEND - 0.02);
      box(B.paint, 3.12, 3.44, yhi - 0.045, yhi - 0.01, FEND - 0.30, FEND - 0.02);
      belt(B.dark, 3.46, FEND - 0.34, 3.48, FEND - 0.56, ylo + 0.06, yhi - 0.06, 0.03);
      /* rear fender end and its flap */
      belt(B.paint, -3.43, FEND + 0.018, -3.56, FEND - 0.05, s > 0 ? WS : -FW, s > 0 ? FW : -WS, 0.035);
      belt(B.dark, -3.56, FEND - 0.05, -3.58, FEND - 0.32, s > 0 ? WS + 0.04 : -FW + 0.04, s > 0 ? FW - 0.04 : -WS - 0.04, 0.03);
      /* fender brackets down to the hull side under the shelf */
      for (i = 0; i < 4; i++) box(B.dark, -2.6 + i * 1.6, -2.55 + i * 1.6, s > 0 ? 1.05 : -1.12, s > 0 ? 1.12 : -1.05, FEND - 0.16, FEND);

      /* headlight group in its round brush guard on the glacis corner (P2, P7) */
      x = 2.16; var yh = s * 1.17, zh = deckZ(x);
      box(B.paint, x - 0.14, x + 0.10, yh - 0.17, yh + 0.17, zh - 0.06, zh + 0.12);
      B.lens.col = LAMP;
      cylX(B.lens, x + 0.10, x + 0.13, yh - 0.07, zh + 0.05, 0.065, 0.065, 12);
      cylX(B.lens, x + 0.10, x + 0.13, yh + 0.07, zh + 0.05, 0.05, 0.05, 10);
      var NG = 10, prev = null, gg;
      for (gg = 0; gg <= NG; gg++) {
        var ang = Math.PI * gg / NG, P = [x + 0.20, yh + Math.cos(ang) * 0.24, zh + 0.03 + Math.sin(ang) * 0.24];
        if (prev) cyl(B.dark, prev, P, 0.018, 0.018, 5, true);
        prev = P;
      }
      cyl(B.dark, [x - 0.05, yh - 0.24, zh + 0.0], [x + 0.20, yh - 0.24, zh + 0.03], 0.018, 0.018, 5, true);
      cyl(B.dark, [x - 0.05, yh + 0.24, zh + 0.0], [x + 0.20, yh + 0.24, zh + 0.03], 0.018, 0.018, 5, true);
      /* tow eyes low on the nose (P7) and the rear tow hooks */
      box(B.dark, 3.30, 3.48, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.70, 0.84);
      cylY(B.dark, 3.44, s * 0.55 - 0.10, s * 0.55 + 0.10, 0.77, 0.035, 8);
      box(B.dark, -3.56, -3.46, s * 0.72 - 0.07, s * 0.72 + 0.07, 0.72, 0.88);
      /* lifting eyes on the glacis edge */
      x = 2.20; box(B.dark, x - 0.06, x + 0.06, s * 1.30 - 0.02, s * 1.30 + 0.02, deckZ(x), deckZ(x) + 0.08);
      /* rear taillight groups on the rear plate corners */
      box(B.paint, -3.54, -3.47, s * 1.28 - 0.10, s * 1.28 + 0.10, 1.46, 1.64);
      B.lens.col = RED;
      box(B.lens, -3.555, -3.54, s * 1.28 - 0.07, s * 1.28 + 0.07, 1.50, 1.60);
    }

    /* driver's hatch at the top of the glacis, centred, with its three periscopes (P2) */
    x = 1.86;
    cylZ(B.paint, x, 0, deckZ(x) - 0.02, deckZ(x) + 0.05, 0.36, 18);
    cylZ(B.paint, x, 0, deckZ(x) + 0.05, deckZ(x) + 0.08, 0.30, 16);
    for (i = -1; i <= 1; i++) {
      var px = 2.16 - Math.abs(i) * 0.04, py = i * 0.20;
      box(B.paint, px - 0.06, px + 0.06, py - 0.08, py + 0.08, deckZ(px) - 0.02, deckZ(px) + 0.08);
      B.lens.col = GLASS;
      box(B.lens, px + 0.06, px + 0.075, py - 0.06, py + 0.06, deckZ(px) + 0.01, deckZ(px) + 0.06);
    }
    /* the welded joint between the cast nose and the rolled hull, and the nose casting's
       parting line (P5) */
    slab(B.dark, [2.79, 0, deckZ(2.79) + 0.004], unit([1, 0, -GK]), [0, 1, 0], unit([GK, 0, 1]), 0.012, 1.04, 0.006);

    /* --- fender stowage (P1, P5): a box on each fender ahead of the turret line, and the
       big air-cleaner boxes on the rear fenders --- */
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? WS + 0.02 : -FW + 0.03, y1 = s > 0 ? FW - 0.03 : -(WS + 0.02);
      box(B.paint, 0.55, 1.55, y0, y1, FEND + 0.035, FEND + 0.30);
      box(B.dark, 0.55, 1.55, y0 - 0.005, y1 + 0.005, FEND + 0.29, FEND + 0.305);
      box(B.dark, 0.95, 1.05, s > 0 ? y1 : y0 - 0.01, s > 0 ? y1 + 0.01 : y0, FEND + 0.15, FEND + 0.22);
      /* air cleaner: a tall box with a domed lid and the duct into the hull wall */
      box(B.paint, -3.30, -2.30, y0, y1, FEND + 0.035, FEND + 0.30);
      box(B.paint, -3.26, -2.34, y0 + 0.02, y1 - 0.02, FEND + 0.30, FEND + 0.33);
      box(B.dark, -2.95, -2.65, s > 0 ? WS - 0.04 : -(WS + 0.04), s > 0 ? WS + 0.04 : -(WS - 0.04), FEND + 0.10, FEND + 0.24);
      for (i = 0; i < 2; i++) box(B.dark, -3.31, -2.29, s > 0 ? y1 - 0.005 : y0 - 0.005, s > 0 ? y1 + 0.005 : y0 + 0.005, FEND + 0.08 + i * 0.13, FEND + 0.10 + i * 0.13);
      /* tool stowage clamped to the hull wall above the fender (P5) */
      cylX(B.dark, -2.10, -0.20, s * (WS + 0.04), FEND + 0.17, 0.022, 0.022, 6);
      box(B.paint, -1.95, -0.35, s > 0 ? WS : -(WS + 0.06), s > 0 ? WS + 0.06 : -WS, FEND + 0.06, FEND + 0.13);
    }

    /* --- engine deck (judgement: the louvred grille doors across the rear, the access
       plates ahead of them, the fuel caps); team strip on the plate --- */
    box(B.dark, -3.40, -2.62, -1.30, 1.30, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 8; i++) box(B.paint, -3.38 + i * 0.096, -3.33 + i * 0.096, -1.28, 1.28, DECK + 0.012, DECK + 0.04);
    box(B.paint, -3.40, -3.36, -1.30, 1.30, DECK, DECK + 0.05);
    box(B.paint, -2.56, -1.42, -1.25, -0.05, DECK, DECK + 0.03);
    box(B.paint, -2.56, -1.42, 0.05, 1.25, DECK, DECK + 0.03);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.50, -2.40, s * 0.62 - 0.12, s * 0.62 + 0.12, DECK + 0.03, DECK + 0.05);
      cylZ(B.paint, -1.62, s * 1.30, DECK, DECK + 0.05, 0.09, 10);
    }
    box(B.team, -2.30, -1.70, -0.14, 0.14, DECK + 0.03, DECK + 0.05);

    /* --- rear plate: the exhaust grille doors across its top, the towing pintle, the
       infantry phone box on the right (P5, judgement on the detail) --- */
    box(B.dark, -3.50, -3.47, -1.10, 1.10, 1.30, 1.62);
    for (i = 0; i < 6; i++) box(B.paint, -3.53, -3.47, -1.08, 1.08, 1.32 + i * 0.054, 1.34 + i * 0.054);
    box(B.paint, -3.58, -3.47, -0.13, 0.13, 0.86, 1.04);
    cylZ(B.dark, -3.62, 0, 0.84, 1.04, 0.05, 8);
    box(B.paint, -3.56, -3.47, -1.00, -0.76, 1.00, 1.22);
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
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    var TH = 0.045;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + TH]);
    for (i = 0; i < ROL.length; i++) C.push([ROL[i], ZR, RR + TH]);
    C.push([IDL.x, IDL.z, IDL.r + TH], [SPR.x, SPR.z, SPR.r + TH]);
    pts = [];
    for (i = 0; i < C.length; i++) for (k = 0; k < 28; k++) pts.push([C[i][0] + Math.cos(k / 28 * TAU) * C[i][2], C[i][1] + Math.sin(k / 28 * TAU) * C[i][2]]);
    pts = hull2(pts);
    /* the top run droops a little between the support rollers (P5) */
    pts = pts.map(function (pt) {
      if (pt[1] < ZR) return pt;
      var j, sag = 0, X = [SPR.x].concat(ROL.slice().reverse(), [IDL.x]);
      for (j = 0; j + 1 < X.length; j++) {
        var x0 = X[j], x1 = X[j + 1];
        if (pt[0] > x0 + 0.15 && pt[0] < x1 - 0.15) { var u = (pt[0] - x0) / (x1 - x0); sag = 0.035 * 4 * u * (1 - u); }
      }
      return [pt[0], pt[1] - sag];
    });
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.176); step = tot / cnt;          /* T142: 6.94 in pitch */
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      /* the inner web of the track, then each T142 link: two rubber-padded shoes either
         side of the centre guide, the end connectors outboard, the guide horn inside */
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.05, y + TW - 0.05, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.074, pz - dz * 0.074, px + dx * 0.074, pz + dz * 0.074, y - TW, y + TW, 0.085);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.03 - dz * 0.07, pz - dz * 0.03 + dx * 0.07, px + dx * 0.03 - dz * 0.07, pz + dz * 0.03 + dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* rear drive sprocket: two toothed rings on a hub (P5) */
      for (k = -1; k <= 1; k += 2) {
        var yr0 = y + k * 0.12, yr1 = y + k * 0.21;
        cylY(B.dark, SPR.x, Math.min(yr0, yr1), Math.max(yr0, yr1), SPR.z, SPR.r - 0.03, 18);
        for (i = 0; i < 11; i++) {
          var ta = (i + 0.5 * (k + 1)) / 11 * TAU;
          slab(B.dark, [SPR.x + Math.cos(ta) * (SPR.r - 0.005), (yr0 + yr1) / 2, SPR.z + Math.sin(ta) * (SPR.r - 0.005)],
               [Math.cos(ta), 0, Math.sin(ta)], [0, 1, 0], [-Math.sin(ta), 0, Math.cos(ta)], 0.035, 0.045, 0.035);
        }
      }
      cylY(B.paint, SPR.x, y - 0.12, y + 0.12, SPR.z, 0.22, 14);
      cylY(B.paint, SPR.x, y + s * 0.21, y + s * 0.27, SPR.z, 0.17, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.30, SPR.z, 0.07, 8);
      /* final drive housing into the hull */
      cylY(B.paint, SPR.x, s * 1.02, s * 1.20, SPR.z, 0.20, 12);
      /* front compensating idler: a dual wheel like the road wheels, on its arm */
      cylY(B.dark, IDL.x, y - 0.27, y - 0.10, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + 0.10, y + 0.27, IDL.z, IDL.r, 18);
      cylY(B.paint, IDL.x, y - 0.10, y + 0.10, IDL.z, IDL.r - 0.06, 14);
      cyl(B.paint, [IDL.x, y + s * 0.27, IDL.z], [IDL.x, y + s * 0.29, IDL.z], IDL.r - 0.04, 0.12, 16);
      cylY(B.dark, IDL.x, y + s * 0.29, y + s * 0.32, IDL.z, 0.07, 8);
      box(B.dark, IDL.x - 0.40, IDL.x, s * 1.06 - 0.04, s * 1.06 + 0.04, IDL.z - 0.05, IDL.z + 0.05);
      /* the three track support rollers on their brackets (P5) */
      for (i = 0; i < ROL.length; i++) {
        cylY(B.dark, ROL[i], y - 0.26, y - 0.04, ZR, RR, 12);
        cylY(B.dark, ROL[i], y + 0.04, y + 0.26, ZR, RR, 12);
        cylY(B.paint, ROL[i], s * 1.06, y + s * 0.27, ZR, 0.04, 8);
      }
      /* road-wheel arms (torsion bar) and the bump stops, shock absorbers at wheels 1, 2, 6 */
      for (i = 0; i < XW.length; i++) {
        box(B.dark, XW[i] - 0.02, XW[i] + 0.40, s > 0 ? 1.06 : -1.16, s > 0 ? 1.16 : -1.06, ZW - 0.05, ZW + 0.05);
        box(B.paint, XW[i] + 0.30, XW[i] + 0.44, s > 0 ? 1.06 : -1.12, s > 0 ? 1.12 : -1.06, ZW + 0.30, ZW + 0.42);
      }
      [0, 1, 5].forEach(function (w) {
        cyl(B.dark, [XW[w] + 0.10, s * 1.10, ZW + 0.06], [XW[w] + 0.42, s * 1.10, FEND - 0.08], 0.04, 0.04, 8);
      });
    }
  }

  /* road wheel (P1, P5): dual 0.66 m wheels, black rubber tyres, dished discs in body
     colour, a hub cap with its bolt ring */
  var TYRE = [0.10, 0.10, 0.095], HUB = [0.16, 0.16, 0.14];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], DISH = [rr * 0.85, gg * 0.85, bb * 0.85];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.29, y - 0.13, 0, RW, 18);
      cylY(W, 0, y + 0.13, y + 0.29, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.13, y + 0.13, 0, 0.26, 12);
      cyl(W, [0, y + s * 0.29, 0], [0, y + s * 0.305, 0], 0.27, 0.20, 16);
      cyl(W, [0, y - s * 0.29, 0], [0, y - s * 0.305, 0], 0.27, 0.20, 16);
      W.col = DISH;
      cylY(W, 0, Math.min(y + s * 0.305, y + s * 0.32), Math.max(y + s * 0.305, y + s * 0.32), 0, 0.14, 14);
      W.col = HUB;
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        box(W, Math.cos(a) * 0.10 - 0.015, Math.cos(a) * 0.10 + 0.015, s > 0 ? y + 0.32 : y - 0.335, s > 0 ? y + 0.335 : y - 0.32, Math.sin(a) * 0.10 - 0.015, Math.sin(a) * 0.10 + 0.015);
      }
      cylY(W, 0, Math.min(y + s * 0.32, y + s * 0.345), Math.max(y + s * 0.32, y + s * 0.345), 0, 0.06, 10);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* The A1's long cast "needle nose" turret (P3 plan, P5 side, P2 front).  Stations:
     x over the ring centre, bottom z, half width at the bottom, greatest half width and its
     height, roof-edge half width and roof z.  Widest a little behind the ring, the sides
     running nearly straight to a narrow nose at the gun shield; the roof flat at 1.0 m
     over the deck and falling to the shield; the bustle narrower with a flat rear face. */
  var TS = [
    [-1.80, 0.20, 0.92, 0.98, 0.40, 0.66, 0.80],
    [-1.70, 0.12, 1.00, 1.08, 0.38, 0.76, 0.87],
    [-1.40, 0.05, 1.10, 1.24, 0.34, 0.88, 0.92],
    [-0.90, 0.00, 1.18, 1.36, 0.30, 0.98, 0.95],
    [-0.30, 0.00, 1.21, 1.41, 0.30, 1.02, 0.95],
    [ 0.25, 0.00, 1.16, 1.36, 0.30, 0.95, 0.95],
    [ 0.75, 0.02, 1.00, 1.18, 0.30, 0.78, 0.92],
    [ 1.15, 0.04, 0.80, 0.95, 0.32, 0.58, 0.86],
    [ 1.42, 0.06, 0.64, 0.73, 0.34, 0.42, 0.79],
    [ 1.56, 0.10, 0.56, 0.62, 0.36, 0.34, 0.73]
  ];
  function tRing(S) {
    var x = S[0], zb = S[1], wl = S[2], wm = S[3], zm = S[4], wt = S[5], zt = S[6], R = [], i, t;
    var arc = [];
    for (i = 1; i <= 3; i++) { t = i / 4 * Math.PI / 2; arc.push([wt + (wm - wt) * Math.cos(t), zm + (zt - zm) * Math.sin(t)]); }
    R.push([x, wl, zb], [x, wm, zm]);
    arc.forEach(function (p) { R.push([x, p[0], p[1]]); });
    R.push([x, wt, zt], [x, -wt, zt]);
    arc.slice().reverse().forEach(function (p) { R.push([x, -p[0], p[1]]); });
    R.push([x, -wm, zm], [x, -wl, zb]);
    return R;
  }
  /* the turret's half width at (x, z) by interpolating the stations - fittings use it to
     sit on the skin */
  function tHalf(x, z) {
    var k, S0, S1, u, w0, w1;
    function wAt(S, z) {
      if (z <= S[4]) return S[2] + (S[3] - S[2]) * Math.max(0, (z - S[1]) / ((S[4] - S[1]) || 1));
      var v = Math.min(1, (z - S[4]) / ((S[6] - S[4]) || 1));
      return S[5] + (S[3] - S[5]) * Math.cos(Math.asin(Math.min(1, v)));
    }
    for (k = 0; k + 1 < TS.length; k++) if (x >= TS[k][0] && x <= TS[k + 1][0]) break;
    if (k + 1 >= TS.length) k = TS.length - 2;
    S0 = TS[k]; S1 = TS[k + 1]; u = Math.max(0, Math.min(1, (x - S0[0]) / (S1[0] - S0[0])));
    w0 = wAt(S0, z); w1 = wAt(S1, z);
    return w0 + (w1 - w0) * u;
  }
  function roofAt(x) {
    var k, u;
    for (k = 0; k + 1 < TS.length; k++) if (x >= TS[k][0] && x <= TS[k + 1][0]) { u = (x - TS[k][0]) / (TS[k + 1][0] - TS[k][0]); return TS[k][6] + (TS[k + 1][6] - TS[k][6]) * u; }
    return x < TS[0][0] ? TS[0][6] : TS[TS.length - 1][6];
  }

  function addGun(B) {
    var M = MUZ;
    /* the gun shield: a cast block across the nose, rounded in section, under the canvas
       mantlet cover (P1, P2, P5) */
    var MS = [[1.40, 0.56, 0.00, 0.83], [1.70, 0.55, 0.02, 0.81], [1.93, 0.46, 0.08, 0.75], [2.07, 0.30, 0.18, 0.65]];
    castLoft(B.paint, MS.map(function (S) {
      var R = [], i, a, c, sn, zc = (S[2] + S[3]) / 2, hz = (S[3] - S[2]) / 2;
      for (i = 0; i < 16; i++) {
        a = i / 16 * TAU; c = Math.cos(a); sn = Math.sin(a);
        R.push([S[0], S[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 0.6), zc + hz * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 0.6)]);
      }
      return R;
    }));
    /* the canvas cover's boot round the tube */
    cylX(B.paint, 2.04, 2.18, 0, GZ, 0.19, 0.125, 16);
    /* M68 105 mm: the tube, the bore evacuator about a fifth of the way out (P1, P3, P5:
       0.15-0.34 of the exposed length), the plain muzzle with its thin collar */
    var L = M - 2.10, e0 = 2.10 + 0.17 * L, e1 = 2.10 + 0.36 * L;
    cylX(B.paint, 2.12, e0, 0, GZ, 0.112, 0.104, 18);
    cylX(B.paint, e0, e0 + 0.08, 0, GZ, 0.104, 0.150, 18);
    cylX(B.paint, e0 + 0.08, e1 - 0.08, 0, GZ, 0.150, 0.150, 18);
    cylX(B.paint, e1 - 0.08, e1, 0, GZ, 0.150, 0.098, 18);
    cylX(B.dark, e0 + 0.20, e0 + 0.23, 0, GZ, 0.153, 0.153, 16);
    cylX(B.paint, e1, M - 0.10, 0, GZ, 0.098, 0.088, 16);
    cylX(B.paint, M - 0.10, M, 0, GZ, 0.100, 0.100, 16);
    cylX(B.dark, M - 0.005, M + 0.002, 0, GZ, 0.062, 0.062, 12);
    /* coaxial M73 port left of the gun in the shield face */
    cylX(B.dark, 1.95, 2.08, 0.30, GZ + 0.06, 0.03, 0.03, 8);
  }

  function addTurret(B, V) {
    var s, i, a, x, y, z, P, k;
    /* the cast body */
    castLoft(B.paint, TS.map(tRing));
    /* ring skirt down onto the deck */
    cylZ(B.paint, 0, 0, -0.05, 0.03, 1.12, 36);
    addGun(B);

    /* AN/VSS-1 xenon searchlight on its bracket over the gun shield (P1, P2, P8): a deep
       box, the big round lens forward, the bracket legs down to the shield */
    if (V.searchlight) {
      var SX = 1.72, SZ = 1.05;
      box(B.paint, SX - 0.26, SX + 0.20, -0.32, 0.32, SZ - 0.27, SZ + 0.27);
      cylX(B.paint, SX + 0.20, SX + 0.27, 0, SZ, 0.27, 0.27, 22);
      B.lens.col = LAMP;
      cylX(B.lens, SX + 0.27, SX + 0.285, 0, SZ, 0.235, 0.235, 22);
      box(B.dark, SX - 0.30, SX - 0.26, -0.22, 0.22, SZ - 0.18, SZ + 0.18);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, SX - 0.10, SX + 0.06, s * 0.28 - 0.035, s * 0.28 + 0.035, 0.78, SZ - 0.26);
        cylY(B.dark, SX - 0.02, s * 0.31, s * 0.36, SZ, 0.06, 8);
      }
      box(B.dark, SX - 0.18, SX + 0.10, -0.30, 0.30, 0.79, 0.84);
      cyl(B.dark, [SX - 0.20, -0.05, SZ - 0.28], [0.95, -0.25, roofAt(0.95)], 0.02, 0.02, 6);
    }

    /* M19 commander's cupola, right rear of the roof (P3, P8): the base ring, the drum with
       its eight vision blocks, the hatch dome, the M85 .50 cal in its front housing */
    var CX = -0.38, CY = -0.62, CZ = roofAt(CX);
    cylZ(B.paint, CX, CY, CZ - 0.04, CZ + 0.08, 0.50, 24);
    cyl(B.paint, [CX, CY, CZ + 0.08], [CX, CY, CZ + 0.36], 0.47, 0.44, 24);
    B.lens.col = GLASS;
    for (i = 0; i < 8; i++) {
      a = (i + 0.5) / 8 * TAU;
      if (Math.cos(a) > 0.8) continue;
      slab(B.lens, [CX + Math.cos(a) * 0.455, CY + Math.sin(a) * 0.455, CZ + 0.22], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.02, 0.09, 0.055);
      slab(B.paint, [CX + Math.cos(a) * 0.47, CY + Math.sin(a) * 0.47, CZ + 0.29], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.04, 0.11, 0.015);
    }
    cyl(B.paint, [CX - 0.02, CY, CZ + 0.36], [CX - 0.02, CY, CZ + 0.47], 0.42, 0.30, 22);
    cylZ(B.paint, CX - 0.04, CY, CZ + 0.47, CZ + 0.52, 0.24, 16);
    box(B.dark, CX - 0.48, CX - 0.38, CY - 0.10, CY + 0.10, CZ + 0.36, CZ + 0.44);
    /* the M85's armoured front housing and barrel (P3, P8) */
    box(B.paint, CX + 0.30, CX + 0.58, CY - 0.13, CY + 0.13, CZ + 0.12, CZ + 0.38);
    cylX(B.dark, CX + 0.58, CX + 1.12, CY, CZ + 0.26, 0.032, 0.026, 8);
    cylX(B.dark, CX + 1.00, CX + 1.12, CY, CZ + 0.26, 0.04, 0.04, 8);
    box(B.dark, CX + 0.20, CX + 0.42, CY + 0.13, CY + 0.30, CZ + 0.12, CZ + 0.28);

    /* gunner's periscope head ahead of the cupola (P3) */
    x = 0.40; y = -0.62; z = roofAt(x);
    box(B.paint, x - 0.14, x + 0.12, y - 0.13, y + 0.13, z - 0.02, z + 0.16);
    B.lens.col = GLASS;
    box(B.lens, x + 0.12, x + 0.13, y - 0.09, y + 0.09, z + 0.04, z + 0.13);
    /* loader's hatch on the left with its periscope (P4) */
    x = -0.45; y = 0.62; z = roofAt(x);
    cylZ(B.paint, x, y, z - 0.02, z + 0.05, 0.37, 20);
    cylZ(B.paint, x, y, z + 0.05, z + 0.08, 0.31, 18);
    box(B.dark, x - 0.40, x - 0.34, y - 0.12, y + 0.12, z + 0.02, z + 0.10);
    box(B.paint, x + 0.42, x + 0.62, y - 0.10, y + 0.10, z - 0.02, z + 0.10);
    box(B.lens, x + 0.62, x + 0.63, y - 0.07, y + 0.07, z + 0.02, z + 0.08);
    /* roof ventilator and the rear lifting eyes */
    cylZ(B.paint, -1.10, 0.10, roofAt(-1.10) - 0.02, roofAt(-1.10) + 0.08, 0.16, 12);
    cyl(B.paint, [-1.10, 0.10, roofAt(-1.10) + 0.08], [-1.10, 0.10, roofAt(-1.10) + 0.12], 0.17, 0.07, 12);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -1.55, -1.45, s * 0.70 - 0.02, s * 0.70 + 0.02, roofAt(-1.5) - 0.02, roofAt(-1.5) + 0.07);
      box(B.dark, 0.85, 0.95, s * 0.70 - 0.02, s * 0.70 + 0.02, roofAt(0.9) - 0.02, roofAt(0.9) + 0.07);
    }

    /* the M17 rangefinder's end housings on both turret sides (P4, P5): a squat boss with
       its armoured shutter */
    for (s = -1; s <= 1; s += 2) {
      x = 0.62; z = 0.70; var w = tHalf(x, z);
      cyl(B.paint, [x, s * (w - 0.10), z], [x, s * (w + 0.06), z], 0.13, 0.11, 14);
      cyl(B.dark, [x, s * (w + 0.06), z], [x, s * (w + 0.075), z], 0.085, 0.085, 12);
      /* grab rail along the turret side (P4, P5) */
      var NG = 6, prev = null, rx0 = -1.15, rx1 = -0.05, rz = 0.52;
      for (k = 0; k <= NG; k++) {
        var rx = rx0 + (rx1 - rx0) * k / NG;
        P = [rx, s * (tHalf(rx, rz) + 0.07), rz];
        if (prev) cyl(B.dark, prev, P, 0.016, 0.016, 5, true);
        prev = P;
      }
      [rx0, rx1].forEach(function (rx) { cyl(B.dark, [rx, s * (tHalf(rx, rz) - 0.02), rz], [rx, s * (tHalf(rx, rz) + 0.07), rz], 0.015, 0.015, 5, true); });
      /* whip antenna bases at the rear corners, the whips (P3) */
      x = -1.50; y = s * 0.92; z = roofAt(x);
      cylZ(B.dark, x, y, z - 0.03, z + 0.14, 0.06, 8);
      cyl(B.dark, [x, y, z + 0.14], [x, y, z + 1.00], 0.012, 0.006, 4, true);
    }

    /* the bustle rack round the turret rear (P1, P3, P5): a floor, top and bottom rails and
       upright bars, its sides running forward along the bustle */
    var BX0 = -1.78, BX1 = -2.30, BY = 1.02, Z0 = 0.22, Z1 = 0.72;
    box(B.dark, BX1, BX0, -BY, BY, Z0 - 0.02, Z0 + 0.01);
    for (s = -1; s <= 1; s += 2) {
      var xs = -1.10;
      [Z0, (Z0 + Z1) / 2, Z1].forEach(function (zz) {
        cyl(B.dark, [BX1, s * BY, zz], [xs, s * BY, zz], 0.017, 0.017, 5, true);
      });
      for (k = 0; k <= 6; k++) {
        x = BX1 + (xs - BX1) * k / 6;
        cyl(B.dark, [x, s * BY, Z0], [x, s * BY, Z1], 0.014, 0.014, 4, true);
      }
      cyl(B.dark, [xs, s * BY, Z0], [xs, s * (tHalf(xs, Z0) - 0.02), Z0], 0.017, 0.017, 5, true);
    }
    [Z0, (Z0 + Z1) / 2, Z1].forEach(function (zz) { cyl(B.dark, [BX1, -BY, zz], [BX1, BY, zz], 0.017, 0.017, 5, true); });
    for (k = 0; k <= 10; k++) { y = -BY + 2 * BY * k / 10; cyl(B.dark, [BX1, y, Z0], [BX1, y, Z1], 0.014, 0.014, 4, true); }

    /* team colour: a modest strip on the roof behind the cupola */
    box(B.team, -1.30, -0.80, -0.30, 0.30, roofAt(-1.05) - 0.01, roofAt(-1.05) + 0.02);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A1, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V);
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

/* len: the measured X extent of the build (models3d convention, dump.js): 9.635 m, the
   published 9.436 m gun forward plus the rear fender flaps and the tow pintle */
UNIT_MODELS["nato_e60_mbt"] = {
  len: 9.635,
  build: function (THREE, M, C) { return HeroM60.build(THREE, M, C, "A1"); }
};
