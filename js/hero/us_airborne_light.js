/* ============ us_airborne_light.js - HERO models: the US airborne light armour ============
   Three rows, each drawn as its own vehicle and period:
     nato_e50_tankdestroyer   M56 Scorpion (1957)       90 mm M54 gun on an open aluminium chassis,
                                                         four rubber-tyred road wheels a side, the
                                                         driver beside the gun under the shield; no turret
     nato_e60_lighttank       M551 Sheridan (1967)      the Vietnam-era vehicle: olive drab, plain
                                                         commander's cupola with the .50 on its pintle,
                                                         the small gunner's sight hood, IR searchlight
     nato_e80_lighttank       M551A1 Sheridan (TTS)     the late-1980s 82nd Airborne vehicle: the
                                                         thermal-sight housing, the boxed cupola shield,
                                                         NATO three-colour paint, turret stowage
   (nato_e50_tankdestroyer used to borrow atgmv_n, the Stryker ATGM carrier.)

   REDO 2026-10-24 (full-quality procedure).  No line drawing of either vehicle exists on Commons
   (searched "M551", "Sheridan drawing", "M56 Scorpion", "M56 SPAT"), so the procedure's minimum
   is used: near-orthogonal photographs plus the published figures.  References (Wikimedia
   Commons, width 960, generic agent string, cached in scratchpad/q_airborne_ref):
     S9  "M551 Sheridan in Panama.jpg" (US Army, Just Cause, Dec 1989) - RIGHT side square on,
         turret traversed to the rear: the Sheridan side station table is measured off it at
         139.7 px/m on the 6.30 m hull (road wheels, sprocket, idler, side plate, glacis knee,
         rear plate), and its NATO three-colour paint.
     S1  "M551 Sheridan at Fort Lewis Military Museum side view.jpg" (2016, an M551A1) - left
         front 3/4: the toothed sprocket at the FRONT, the idler at the rear, the flat track
         on the wheel tops, the rolled flotation-screen troughs along the hull top edges, the
         searchlight with its round lens left of the gun, the boxed cupola shield.
     S2  "...Fort Lewis Military Museum Front view.jpg" - right front 3/4: glacis, headlamp
         guards, the four smoke dischargers a side, the cupola box, the searchlight.
     S8  "Left front view of M551 Sheridan at Idaho Military History Museum 2018.jpg" - the
         glacis with the folded surfboard and its rim, the driver's hood, the turret's sloped
         front, the jacketed gun, olive drab.
     S5  "Sheridan tank Golden Pheasant.jpg" (3/73 Armor, 82nd Abn, Honduras, 3 Jan 1988, an
         M551A1) - head on: lower nose plate, tow shackles, round lamp guards, driver's hood,
         the canvas-covered searchlight on the left of the gun, smoke dischargers, packs.
     S6  "...offloaded from C-130 during Ocean Venture '84..." (20 Apr 1984) - the 82nd's
         vehicle from the front; MERDC-era paint (dark, not followed: the row is the TTS).
     S3  "M551 Sheridan 3slash4th Cavalry December 1969 (color).jpg" and S7 "Closeup on M551
         turret at Cu Chi.jpg" (27 Jan 1969) - the e60 row: olive drab, four smoke dischargers
         in a ROW on each front flank, the jacketed gun, the plain cupola with the .50 on its
         mount and no ACAV shield (S7), the searchlight under canvas above the gun (S3), the
         driver's hood, bolted plate edges.
     S4  "M551 Sheridan flotation curtain Fort Campbell 1968.jpg" - the screen raised (it is
         drawn stowed).
     M2  "M56 Scorpion.jpg" (45th Inf Div Museum) - left front 3/4: four big rubber-tyred wheels
         nearly touching, the raised front sprocket, the flared front mudguards, the box shield,
         the cradle sleeve, the gun with its cylindrical muzzle brake, the A-frame travel lock,
         the guarded headlamps, the rear stowage box.
     M4  "M-56 Scorpion ... (10469916676).jpg" (82nd Airborne Div Museum) - left front: the
         grilled front slope, the vertical nose plate, the driver's WINDOW in the left of the
         shield and the steering wheel behind it, the rear lockers.
     M1, M3 (Danville, Texas Military Forces Museum) - shield, sleeve, brake, travel lock;
     M5 "M56 SPAT during Operation Toledo 17 Jun 66" and M6 (Korat, May 1962) - in service.
   Text: en.wikipedia "M551 Sheridan" (Hunnicutt 1995 pp.308-309: hull 248 in = 6.30 m, width
   110 in = 2.79 m, height 116 in = 2.95 m, clearance 19 in; flat track, no support rollers;
   folding "surfboard" over the front armour, the screen folding up from compartments lining
   the upper corner of the hull sides; the .50 M2HB on the commander's cupola; M551A1 TTS with
   the AN/VSG-2B thermal sight, standard on the M551A1s in the 1980s; the searchlight) and
   en.wikipedia "M56 Scorpion" (4.55 m without the gun, 5.84 m overall, 2.57 m wide, 2.05 m
   over the gun shield, 0.32 m clearance, 7.1 t, torsion bars, 4 crew).

   CORRECTIONS against the previous model (the references do not support it):
   - the Sheridan gun reached 1.22 m past the nose (7.52 m overall, "unconfirmed"); S9 square on
     and S1/S8 show the muzzle at the bow line: the 152 mm tube ends at the nose (len 6.4 m);
   - road wheels on 0.74 m centres were 18 % too close: S9 gives 0.905 m;
   - the hull deck was 1.40 m and the glacis began at x 1.30 as a short ramp: S9 gives the deck
     at 1.47 m and one long shallow glacis from x 1.36 to the nose at 1.06 m;
   - the smoke dischargers were a 2 x 2 block; S7 (1969) and S2/S8 show four tubes in a ROW;
   - the three-plate cupola shield was on both rows; the e60 row (S7) has the plain cupola, the
     boxed shield is the M551A1's (S1, S2, S8, S5);
   - the flotation-screen troughs along the hull top edges were missing (S1, S9, text);
   - the M56 shield had no driver's window and the gun no muzzle brake (M2, M4, M1).

   Recognition list (what makes each read at game zoom, and its source)
     Sheridan
       1  a long, low aluminium box hull with slab sides over the tracks, the rolled flotation-
          screen troughs along both top edges [S1, S9, S8]
       2  one long shallow glacis from just ahead of the turret to the nose, the folded
          surfboard lying on it with its rim [S8, S5, S7]
       3  FIVE big road wheels a side nearly touching, NO return rollers, the track lying on the
          wheel tops, the toothed sprocket raised at the FRONT, the idler at the rear [S9, S1]
       4  a low wide turret with sloped front faces, sitting at mid hull [S9, S8, S7]
       5  the short fat 152 mm gun/launcher with its thick jacket and muzzle collar, the muzzle at
          the bow line [S7, S8, S9]
       6  four smoke dischargers in a row on each front flank of the turret [S7, S2, S8]
       7  the searchlight box left of the gun on the roof front [S2, S1, S5, S3]
       8  the commander's cupola at the right rear with the .50; the M551A1's boxed shield [S7;
          S1, S2, S8, S5]
       9  the driver's hood on the glacis centre, round lamp guards at the glacis corners, tow
          shackles on the nose plate [S8, S5, S7]
      10  M551A1 (TTS): the thermal-sight housing on the right front of the roof [S5, S2]
     Scorpion
      11  a small low tub on FOUR big rubber-tyred road wheels a side, nearly touching, the
          raised front sprocket [M2, M4, M3]
      12  the flared front mudguards and the grilled front slope over the front engine [M2, M4]
      13  the tall box gun shield on the pedestal, the driver's window in its left side [M4, M1]
      14  the long 90 mm M54 with the cradle sleeve and the cylindrical muzzle brake, the A-frame
          travel lock from the nose to the tube [M2, M1, M3, M4]
      15  open fighting compartment behind the shield, rear lockers [M4, M2]

   Side station tables (metres; x from the hull middle, + forward; z above the ground)
     Sheridan  hull -3.15..3.15 (S9 139.7 px/m); belly 0.48 (19 in); side plate bottom 0.86; deck
               1.47; trough top 1.60; glacis knee x 1.36, nose z 1.06 at x 3.12; nose plate
               down to 0.86, the lower nose to the belly at x 2.65; the deck breaks at x -2.80
               into the sloped upper rear plate, z 1.20 at x -3.15; half width 1.395 (2.79 m).
               road wheels x 1.86 0.955 0.05 -0.855 -1.76, centre z 0.40, r 0.34; sprocket x
               2.90 z 0.70 r 0.25; idler x -2.60 z 0.62 r 0.25; track centre 1.12, 0.44 wide
               (read off S5).  Turret ring x 0.15 (S9: the turret spans x -1.07..1.36 reversed);
               turret 0.62 high, 2.36 long, 2.08 wide; gun axis 0.30 over the deck; muzzle x 3.10.
     Scorpion  hull -2.275..2.275 (4.55 m); belly 0.32; fender shelf 0.97; deck 1.14; front slope
               from x 1.05 to the nose at 0.74; road wheels x 1.20 0.40 -0.40 -1.20, r 0.37
               (they all but touch, M2); sprocket x 1.95 z 0.50; idler x -1.95 z 0.385; shield
               to 2.05 (published); muzzle x 3.565 (5.84 m published).

   Paint.  The period slides carry a strong cast (S3 #292532 in shade, S9 greys #4c4d55 to #85817d),
   so the colours are the standard ones taken to about 0.85: Sheridan e60 and M56 olive drab
   (FS 24087) #4d5138 / #4a4f36; the e80 NATO three-colour CARC of S9 (Dec 1989): green 383 base
   #4a5536, brown 383 #54432f, black #222220 in large hard-edged patches.  No bumper codes,
   numbers, names, the S3 "HARD CORE" or the S9 chevrons.  Team colour exactly C.team on two
   small deck panels per vehicle.
   NOT CONFIRMED (drawn plain or left off): the track width (0.44 m) and the M56's (0.42 m), read
   off photographs; the TTS housing's size (placed from S5 and S2); the AN/VVG-1 laser rangefinder
   (no separate housing told apart in the photographs: not drawn); the Vietnam chain-link screen and
   the ACAV birdcage (field modifications on single vehicles; S7 shows neither); the belly mine
   kit; the M56 recoil-cylinder layout behind the shield (drawn as one cylinder over the breech).
   Materials: PAINT (canvas texture, metre UVs), DARK, GLASS, WHEEL (vertex colours), TEAM.
   Nodes: "turret" (ring centre on the deck, gun along +X) on the Sheridans; "roadwheel" groups
   (axle on local Y, both sides in one mesh) on all three; the Scorpion has no "turret".
   Model space +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAirborneLight = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ variants */
  var VARIANTS = {
    M551: { kind: "sheridan", tts: false, boxShield: false, stow: false,
            paint: { base: "#4d5138", camo: null, seed: 1967, us: 0.34 } },
    A1:   { kind: "sheridan", tts: true, boxShield: true, stow: true,
            paint: { base: "#4a5536", camo: [["#54432f", 5], ["#222220", 4]], seed: 1989, us: 0.22 } },
    M56:  { kind: "scorpion",
            paint: { base: "#4a4f36", camo: null, seed: 1957, us: 0.34 } }
  };

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function sgn(v) { return v < 0 ? -1 : 1; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
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
  /* a box about centre c on axes u, v, w with half sizes */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a slab along a line in the XZ plane, thickness th, spanning y0..y1 */
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
  /* a closed solid lofted through rings of the same count, the end rings capped with fans */
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
  /* smooth-sided loft (averaged normals) with flat caps: the turret bodies */
  function loftS(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1, f, vol = 0;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    var ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var cA = [0, 0, 0], cB = [0, 0, 0];
    for (k = 0; k < n; k++) for (i = 0; i < 3; i++) { cA[i] += V[k][i] / n; cB[i] += V[ns - n + k][i] / n; }
    for (k = 0; k < n; k++) {
      vol += dot(cA, cross(V[(k + 1) % n], V[k]));
      vol += dot(cB, cross(V[ns - n + k], V[ns - n + (k + 1) % n]));
    }
    var sg = vol < 0 ? -1 : 1, Nv = [], t;
    for (i = 0; i < ns; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; t = unit(cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]])));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += t[0] * sg; Nv[f[k]][1] += t[1] * sg; Nv[f[k]][2] += t[2] * sg; }
    }
    for (i = 0; i < ns; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      if (sg > 0) bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
      else bin.tri(V[f[0]], V[f[2]], V[f[1]], Nv[f[0]], Nv[f[2]], Nv[f[1]]);
    }
    for (k = 0; k < n; k++) {
      a = V[k]; b = V[(k + 1) % n]; c0 = V[ns - n + k]; c1 = V[ns - n + (k + 1) % n];
      if (sg > 0) { bin.tri(cA, b, a); bin.tri(cB, c0, c1); } else { bin.tri(cA, a, b); bin.tri(cB, c1, c0); }
    }
  }
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* one tile 1 / us metres: the base colour, the camouflage patches (hard-edged, as the S9 CARC
     pattern is brushed), welded and bolted plate seams (S7 shows the bolt rows of the aluminium
     hull), soft mottling, rain streaks and road grime */
  function paintTex(THREE, P) {
    var key = "abn" + P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512;
      cv.width = S; cv.height = S;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, a, x, y, w, rr, rd, ang, b;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 26; i++) {
        q.globalAlpha = 0.12 + R() * 0.14; q.fillStyle = i % 2 ? "rgba(30,32,22,1)" : "rgba(120,118,96,1)";
        q.beginPath(); q.ellipse ? q.ellipse(R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, R() * 3, 0, TAU) : q.rect(R() * S, R() * S, 60, 40); q.fill();
      }
      q.globalAlpha = 1;
      if (P.camo) {
        for (k = 0; k < P.camo.length; k++) {
          b = P.camo[k]; q.fillStyle = b[0];
          for (i = 0; i < b[1]; i++) {
            x = R() * S; y = R() * S; rr = 60 + R() * 60;
            var pts = [], ox, oy, j;
            for (a = 0; a < 9; a++) { ang = a / 9 * TAU; rd = rr * (0.55 + R() * 0.6); pts.push([Math.cos(ang) * rd * 1.5, Math.sin(ang) * rd * 0.8]); }
            /* each patch is drawn again one tile over, so the wrap shows no seam */
            for (ox = -1; ox <= 1; ox++) for (oy = -1; oy <= 1; oy++) {
              q.beginPath();
              for (j = 0; j < pts.length; j++) {
                if (j === 0) q.moveTo(x + ox * S + pts[j][0], y + oy * S + pts[j][1]); else q.lineTo(x + ox * S + pts[j][0], y + oy * S + pts[j][1]);
              }
              q.closePath(); q.fill();
            }
          }
        }
      }
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 100 + R() * 220;
        q.fillStyle = "rgba(18,18,14,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(16,16,12,0.42)";
        for (k = 6; k < w; k += 18) { if (i % 2) q.fillRect(x + k, y - 6, 3, 3); else q.fillRect(x - 6, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(60,48,30,0.07)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, V) {
    return { paint: new Bin(T.paint, true, false, V.paint.us), dark: new Bin(T.dark, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
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
      m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function rgb(hex, k) {
    return [parseInt(hex.substr(1, 2), 16) / 255 * k, parseInt(hex.substr(3, 2), 16) / 255 * k, parseInt(hex.substr(5, 2), 16) / 255 * k];
  }

  /* --------------------------------------------------------- running gear */
  /* the loop for a flat track: round the FRONT wheel (F) from its top down to the ground run,
     under the road wheels, round the REAR wheel (B) up to its top, then the top run lying on
     the wheel tops back to F (S9, S1: no support rollers) */
  function trackLoop(G) {
    var P = [], i, k, a, n = 10, segs = [], tot = 0, l, b, th = G.th;
    var rF = G.F.r + th, rB = G.B.r + th, rW = G.RW + th;
    for (k = 0; k <= n; k++) { a = Math.PI / 2 - k / n * (Math.PI - 0.45); P.push([G.F.x + Math.cos(a) * rF, G.F.z + Math.sin(a) * rF]); }
    P.push([G.XW[0] + 0.10, th / 2 + 0.012]);
    P.push([G.XW[G.XW.length - 1] - 0.10, th / 2 + 0.012]);
    for (k = 0; k <= n; k++) { a = (-Math.PI / 2 - 0.35) - k / n * (Math.PI - 0.35); P.push([G.B.x + Math.cos(a) * rB, G.B.z + Math.sin(a) * rB]); }
    for (i = G.XW.length - 1; i >= 0; i--) { P.push([G.XW[i] - 0.12, G.ZW + rW - 0.01]); P.push([G.XW[i] + 0.12, G.ZW + rW - 0.01]); }
    for (i = 0; i < P.length; i++) {
      a = P[i]; b = P[(i + 1) % P.length];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    return { segs: segs, tot: tot };
  }
  function addTrack(B, G, s) {
    var L = trackLoop(G), segs = L.segs, n = segs.length, cnt = G.links, step = L.tot / cnt;
    var y = s * G.TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz, tw = G.TW;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - tw, y + tw, 0.03);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      /* the link block with its grouser, wider than the run, and the centre guide */
      belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - tw - 0.006, y + tw + 0.006, G.th);
      /* the centre guide horn, standing inward off the link between the wheel halves */
      if (G.horn) belt(B.dark, px - dx * 0.025 + dz * 0.05, pz - dz * 0.025 - dx * 0.05, px + dx * 0.025 + dz * 0.05, pz + dz * 0.025 - dx * 0.05, y - 0.022, y + 0.022, 0.06);
    }
    /* the toothed sprocket (front on both vehicles): a toothed rim on a dished disc with a hub */
    var F = G.F;
    cylY(B.dark, F.x, y - 0.17, y + 0.17, F.z, F.r - 0.03, 18);
    for (k = 0; k < 12; k++) {
      t = k / 12 * TAU;
      slab(B.dark, [F.x + Math.cos(t) * (F.r - 0.005), y, F.z + Math.sin(t) * (F.r - 0.005)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.035, 0.12, 0.028);
    }
    cylY(B.paint, F.x, y + s * 0.14, y + s * 0.18, F.z, F.r - 0.06, 16);
    cylY(B.dark, F.x, y + s * 0.18, y + s * 0.205, F.z, 0.085, 10);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU + 0.3; cylY(B.dark, F.x + Math.cos(t) * 0.13, y + s * 0.175, y + s * 0.185, F.z + Math.sin(t) * 0.13, 0.045, 8); }
    /* the idler at the rear: a plain dished wheel with a tyre ring */
    var Bk = G.B;
    cylY(B.dark, Bk.x, y - 0.17, y + 0.17, Bk.z, Bk.r, 18);
    cylY(B.paint, Bk.x, y + s * 0.14, y + s * 0.18, Bk.z, Bk.r - 0.05, 16);
    cylY(B.dark, Bk.x, y + s * 0.18, y + s * 0.20, Bk.z, 0.07, 10);
    /* the trailing torsion-bar arms, hull to each wheel */
    for (k = 0; k < G.XW.length; k++) slab(B.dark, [G.XW[k] + 0.17, s * (G.TY - G.TW - 0.06), G.ZW + 0.10], unit([0.85, 0, 0.52]), [0, 1, 0], unit([-0.52, 0, 0.85]), 0.21, 0.04, 0.045);
  }
  /* a road wheel pair (both sides of the axle in one group): two rubber tyres round a dished
     disc, a hub cap with a nut ring; `tyre` sets how round and fat the rubber is */
  function addWheel(W, G, V, tyre) {
    var s, y, i, a, BODY = rgb(V.paint.base, 1.12), RIB = rgb(V.paint.base, 1.3), RUB = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
    var R = G.RW, hw = G.WW, gap = G.WG;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      W.col = RUB;
      if (tyre) {
        /* the M56's pneumatic tyre: a fat rounded section */
        cyl(W, [0, y - hw, 0], [0, y - hw * 0.6, 0], R - 0.05, R, 22, true);
        cylY(W, 0, y - hw * 0.6, y + hw * 0.6, 0, R, 22);
        cyl(W, [0, y + hw * 0.6, 0], [0, y + hw, 0], R, R - 0.05, 22, true);
        W.col = BODY;
        cylY(W, 0, y - hw - 0.005, y + hw + 0.005, 0, R - 0.11, 18);
        W.col = RIB;
        for (i = 0; i < 6; i++) {
          a = i / 6 * TAU;
          slab(W, [Math.cos(a) * (R - 0.20), y + s * (hw + 0.01), Math.sin(a) * (R - 0.20)], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.07, 0.012, 0.035);
        }
      } else {
        cylY(W, 0, y - hw, y - gap, 0, R, 22);
        cylY(W, 0, y + gap, y + hw, 0, R, 22);
        W.col = BODY;
        cylY(W, 0, y - hw - 0.006, y - gap, 0, R - 0.055, 20);
        cylY(W, 0, y + gap, y + hw + 0.006, 0, R - 0.055, 20);
        cyl(W, [0, y + s * (hw + 0.006), 0], [0, y + s * (hw + 0.035), 0], R - 0.06, 0.12, 20);
        W.col = RIB;
        for (i = 0; i < 6; i++) {
          a = i / 6 * TAU + 0.26;
          cylY(W, Math.cos(a) * 0.19, y + s * (hw + 0.02), y + s * (hw + 0.03), Math.sin(a) * 0.19, 0.035, 8);
        }
      }
      W.col = BODY;
      cylY(W, 0, y + s * (hw + 0.02), y + s * (hw + 0.05), 0, 0.10, 14);
      W.col = NUT;
      cylY(W, 0, y + s * (hw + 0.05), y + s * (hw + 0.07), 0, 0.045, 8);
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; cylY(W, Math.cos(a) * 0.075, y + s * (hw + 0.05), y + s * (hw + 0.06), Math.sin(a) * 0.075, 0.014, 6); }
    }
  }

  /* ================================================================ SHERIDAN */
  var SH = {
    HL: 3.15, WS: 1.395, WL: 0.87, SB: 0.86, DECK: 1.47, KNEE: 1.36, NOSEZ: 1.06, TX: 0.15,
    G: { XW: [1.86, 0.955, 0.05, -0.855, -1.76], ZW: 0.40, RW: 0.34, TY: 1.12, TW: 0.22, WW: 0.20, WG: 0.035,
         F: { x: 2.90, z: 0.70, r: 0.25 }, B: { x: -2.60, z: 0.62, r: 0.25 }, th: 0.055, links: 104, horn: true }
  };
  function shTop(x) {
    if (x >= SH.KNEE) return SH.DECK - (SH.DECK - SH.NOSEZ) * (x - SH.KNEE) / (3.12 - SH.KNEE);
    if (x <= -2.80) return SH.DECK - (SH.DECK - 1.20) * (-2.80 - x) / 0.35;
    return SH.DECK;
  }
  /* upper hull: the slab-sided box over the tracks, from the side-plate bottom to the deck */
  function shUpper(x) {
    var zt = shTop(Math.max(-3.15, Math.min(3.12, x))), zb = SH.SB, w = SH.WS, e = 0.03;
    if (x > 3.12) { zt = SH.NOSEZ - 0.03; w = SH.WS - 0.02; }
    return [[x, w, zb], [x, w, zt - e], [x, w - e, zt], [x, -(w - e), zt], [x, -w, zt - e], [x, -w, zb]];
  }
  var SH_UX = [-3.15, -3.10, -2.80, -1.5, 0, 1.36, 1.9, 2.5, 3.0, 3.12, 3.15];
  var SH_BOT = [[-3.12, 0.80], [-2.92, 0.48], [2.62, 0.48], [3.14, 0.88]];
  var SH_LX = [-3.12, -2.92, 0, 2.62, 2.90, 3.14];
  function shLower(x) {
    var zb = pwl(SH_BOT, x), w = SH.WL, wb = w - 0.06, zt = SH.SB + 0.04;
    return [[x, wb, zb], [x, w, Math.min(zb + 0.06, zt - 0.01)], [x, w, zt], [x, -w, zt], [x, -w, Math.min(zb + 0.06, zt - 0.01)], [x, -wb, zb]];
  }
  function addSheridanHull(V, B) {
    var R = [], i, k, s, x, y, z;
    for (i = 0; i < SH_UX.length; i++) R.push(shUpper(SH_UX[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < SH_LX.length; i++) R.push(shLower(SH_LX[i]));
    loftN(B.paint, R);
    /* the nose plate: the vertical face under the glacis edge, then the lower nose to the belly */
    belt(B.paint, 3.15, SH.NOSEZ - 0.02, 3.15, SH.SB, -SH.WS + 0.02, SH.WS - 0.02, 0.04);

    /* the flotation-screen troughs along the top edges of both sides (S1, S9, text): a channel
       with a rolled top, following the deck and down the glacis edge */
    var TR = [[-2.98, 0], [SH.KNEE, 0], [3.06, 0]];
    for (s = -1; s <= 1; s += 2) {
      y = s * (SH.WS - 0.085);
      for (i = 0; i + 1 < TR.length; i++) {
        var xa = TR[i][0], xb = TR[i + 1][0], za = shTop(xa), zb = shTop(xb);
        belt(B.paint, xa, za + 0.045, xb, zb + 0.045, y - 0.085, y + 0.085, 0.09);
        cyl(B.paint, [xa, y + s * 0.02, za + 0.10], [xb, y + s * 0.02, zb + 0.10], 0.06, 0.06, 10);
      }
      /* its rear end cap down the sloped rear plate */
      belt(B.paint, -2.98, shTop(-2.98) + 0.05, -3.13, 1.24, y - 0.08, y + 0.08, 0.07);
    }

    /* the folded surfboard on the glacis (S8, S5, S7): a board the width between the troughs
       with a raised rim, its leading edge a round bar across the nose */
    var gl = function (xx) { return shTop(xx); };
    belt(B.paint, 2.05, gl(2.05) + 0.035, 3.08, gl(3.08) + 0.035, -1.18, 1.18, 0.05);
    for (s = -1; s <= 1; s += 2) belt(B.paint, 2.05, gl(2.05) + 0.07, 3.08, gl(3.08) + 0.07, s * 1.13, s * 1.19, 0.05);
    belt(B.paint, 2.03, gl(2.03) + 0.07, 2.10, gl(2.10) + 0.07, -1.19, 1.19, 0.05);
    cylY(B.paint, 3.11, -1.22, 1.22, SH.NOSEZ + 0.02, 0.05, 10);
    for (k = 0; k < 7; k++) { y = -0.9 + k * 0.3; box(B.dark, 2.30, 2.86, y - 0.006, y + 0.006, gl(2.58) + 0.058, gl(2.58) + 0.066); }
    for (k = 0; k < 14; k++) { x = 2.12 + k * 0.07; box(B.dark, x - 0.01, x + 0.01, 1.150, 1.170, gl(x) + 0.093, gl(x) + 0.103); box(B.dark, x - 0.01, x + 0.01, -1.170, -1.150, gl(x) + 0.093, gl(x) + 0.103); }

    /* the driver's hood on the glacis centre (S8, S5, S7): a raised hatch ring, the domed hood
       and three periscopes facing forward */
    x = 1.72; z = gl(x);
    box(B.paint, 1.45, 2.00, -0.40, 0.40, z - 0.06, z + 0.06);
    cyl(B.paint, [1.50, 0, z + 0.06], [1.95, 0, z + 0.06], 0.33, 0.33, 16);
    box(B.paint, 1.45, 2.00, -0.40, 0.40, z - 0.30, z + 0.06);
    cylZ(B.paint, 1.70, 0, z + 0.30, z + 0.36, 0.22, 16);
    for (k = -1; k <= 1; k++) {
      var ka = k * 0.32;
      slab(B.paint, [1.98 + Math.cos(ka) * 0.02, k * 0.20, z + 0.24], unit([Math.cos(ka), Math.sin(ka), 0]), unit([-Math.sin(ka), Math.cos(ka), 0]), [0, 0, 1], 0.05, 0.08, 0.06);
      slab(B.glass, [2.035 + Math.cos(ka) * 0.02, k * 0.20 + Math.sin(ka) * 0.05, z + 0.25], unit([Math.cos(ka), Math.sin(ka), 0]), unit([-Math.sin(ka), Math.cos(ka), 0]), [0, 0, 1], 0.006, 0.065, 0.03);
    }

    for (s = -1; s <= 1; s += 2) {
      /* lamp clusters in round guards at the glacis corners (S5, S8, S2) */
      x = 2.78; z = gl(x); y = s * 1.04;
      box(B.dark, x - 0.10, x + 0.10, y - 0.10, y + 0.10, z, z + 0.07);
      box(B.dark, x - 0.05, x + 0.07, y - 0.09, y + 0.09, z + 0.07, z + 0.22);
      cylX(B.glass, x + 0.07, x + 0.08, y + 0.04, z + 0.16, 0.045, 0.045, 10);
      cylX(B.glass, x + 0.07, x + 0.08, y - 0.045, z + 0.12, 0.03, 0.03, 8);
      for (k = 0; k < 2; k++) {
        cylX(B.dark, x - 0.12 + k * 0.24 - 0.012, x - 0.12 + k * 0.24 + 0.012, y, z + 0.16, 0.145, 0.145, 16);
      }
      for (k = 0; k < 3; k++) { var ga = 0.6 + k * 0.95; belt(B.dark, x - 0.12, z + 0.16 + Math.sin(ga) * 0.14, x + 0.12, z + 0.16 + Math.sin(ga) * 0.14, y + Math.cos(ga) * 0.14 - 0.012, y + Math.cos(ga) * 0.14 + 0.012, 0.02); }
      /* tow shackles on the nose plate (S5) and the towing eyes low on the corners */
      box(B.dark, 3.15, 3.24, s * 0.72 - 0.07, s * 0.72 + 0.07, 0.94, 1.02);
      cylY(B.dark, 3.24, s * 0.72 - 0.05, s * 0.72 + 0.05, 0.92, 0.055, 8);
      slab(B.dark, [3.02, s * 0.80, 0.66], unit([0.62, 0, -0.78]), [0, 1, 0], unit([0.78, 0, 0.62]), 0.09, 0.05, 0.05);
      /* the bolted plate edge along the side, the side-plate bottom lip over the track */
      box(B.dark, -3.05, 3.05, s * SH.WS - 0.01, s * SH.WS + 0.01, SH.SB - 0.01, SH.SB + 0.02);
      for (k = 0; k < 16; k++) { x = -2.85 + k * 0.38; box(B.dark, x - 0.012, x + 0.012, Math.min(s * SH.WS, s * (SH.WS + 0.008)), Math.max(s * SH.WS, s * (SH.WS + 0.008)), SH.SB + 0.07, SH.SB + 0.095); }
      /* rear lamps and the rear tow hooks on the stern plate */
      box(B.dark, -3.20, -3.13, s * 1.10 - 0.08, s * 1.10 + 0.08, 1.02, 1.14);
      box(B.glass, -3.205, -3.20, s * 1.10 - 0.05, s * 1.10 + 0.05, 1.05, 1.11);
      cylY(B.dark, -3.20, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.84, 0.05, 8);
      box(B.dark, -3.19, -3.12, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.80, 0.90);
      addTrack(B, SH.G, s);
      /* the front mudflap over the sprocket, angled down from the side plate */
      belt(B.paint, 3.05, SH.SB + 0.01, 3.24, 0.80, s * (SH.G.TY - SH.G.TW - 0.02), s * SH.WS, 0.025);
    }
    /* the rear deck over the engine: louvred grille panels, the access plates, the team panels */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.70, -1.55, s > 0 ? 0.12 : -0.98, s > 0 ? 0.98 : -0.12, SH.DECK - 0.01, SH.DECK + 0.02);
      for (k = 0; k < 8; k++) box(B.paint, -2.67 + k * 0.145, -2.61 + k * 0.145, s > 0 ? 0.15 : -0.95, s > 0 ? 0.95 : -0.15, SH.DECK + 0.02, SH.DECK + 0.042);
      box(B.team, -1.40, -1.18, s > 0 ? 0.25 : -1.05, s > 0 ? 1.05 : -0.25, SH.DECK, SH.DECK + 0.014);
    }
    box(B.paint, -1.10, -0.98, -1.15, 1.15, SH.DECK, SH.DECK + 0.025);
    /* the exhaust louvre on the sloped upper rear plate */
    belt(B.dark, -2.86, 1.43, -3.08, 1.28, -0.70, 0.70, 0.03);
  }

  /* turret: origin on the ring centre at deck level, gun along +X.  The welded steel turret, low
     with sloped front faces and in-sloped upper sides (S7, S8, S2), 2.36 m long at the shoulder
     and 2.08 m across; rows: z over the deck, forward, aft, half width */
  var STR = [
    [-0.03, 1.00, 1.04, 0.98],
    [0.00, 1.00, 1.04, 0.98],
    [0.16, 1.14, 1.12, 1.03],
    [0.28, 1.20, 1.16, 1.04],
    [0.38, 1.12, 1.14, 1.00],
    [0.52, 0.92, 1.06, 0.88],
    [0.60, 0.78, 1.00, 0.80],
    [0.62, 0.72, 0.97, 0.76]
  ];
  function sring(r, n) {
    var pts = [], k, c, s, a;
    for (k = 0; k < n; k++) {
      a = k / n * TAU; c = Math.cos(a); s = Math.sin(a);
      pts.push([(c >= 0 ? r[1] : r[2]) * sgn(c) * Math.pow(Math.abs(c), 0.72), r[3] * sgn(s) * Math.pow(Math.abs(s), 0.72), r[0]]);
    }
    return pts;
  }
  /* radius of the turret at height z in direction a, for seating fittings on its face */
  function sR(z, a) {
    var i, t, c = Math.cos(a), s = Math.sin(a);
    for (i = 0; i + 1 < STR.length; i++) if (z <= STR[i + 1][0]) break;
    if (i + 1 >= STR.length) i = STR.length - 2;
    t = Math.max(0, Math.min(1, (z - STR[i][0]) / (STR[i + 1][0] - STR[i][0])));
    function rr(R) {
      var px = (c >= 0 ? R[1] : R[2]) * sgn(c) * Math.pow(Math.abs(c), 0.72), py = R[3] * sgn(s) * Math.pow(Math.abs(s), 0.72);
      return Math.sqrt(px * px + py * py);
    }
    return rr(STR[i]) + (rr(STR[i + 1]) - rr(STR[i])) * t;
  }
  var SGZ = 0.30, SMUZ = 3.10 - 0.15;        /* bore axis over the deck; the muzzle at the bow line */
  function addSheridanTurret(V, B) {
    var R = [], i, k, s, x, y, z, a, r, ROOF = 0.62;
    for (i = 0; i < STR.length; i++) R.push(sring(STR[i], 36));
    loftS(B.paint, R);
    /* the gun shield: a cast block let into the front, the big round collar, the jacket over the
       breech end of the tube, the tube, the muzzle collar (S7, S8) */
    box(B.paint, 0.86, 1.20, -0.36, 0.36, SGZ - 0.24, SGZ + 0.22);
    cylX(B.paint, 1.16, 1.34, 0, SGZ, 0.27, 0.25, 20);
    cylX(B.dark, 1.34, 1.40, 0, SGZ, 0.20, 0.20, 18);
    cylX(B.paint, 1.40, 2.12, 0, SGZ, 0.20, 0.195, 18);
    cylX(B.dark, 2.12, 2.18, 0, SGZ, 0.195, 0.135, 16);
    cylX(B.paint, 2.18, SMUZ - 0.15, 0, SGZ, 0.13, 0.122, 16);
    cylX(B.paint, SMUZ - 0.15, SMUZ, 0, SGZ, 0.142, 0.142, 16);
    cylX(B.dark, SMUZ - 0.005, SMUZ + 0.002, 0, SGZ, 0.085, 0.085, 14);
    /* the coaxial machine gun port right of the gun */
    cylX(B.dark, 1.10, 1.30, -0.30, SGZ + 0.06, 0.03, 0.025, 8);
    /* four smoke dischargers in a row on each front flank, pointing out and up (S7, S2, S8) */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) {
        a = s * (0.62 + k * 0.17); r = sR(0.30, a);
        var ox = Math.cos(a), oy = Math.sin(a), d0 = [ox * (r - 0.02), oy * (r - 0.02), 0.26];
        var dir = unit([0.75 + ox * 0.25, oy * 0.45, 0.50]);
        cyl(B.dark, d0, [d0[0] + dir[0] * 0.30, d0[1] + dir[1] * 0.30, d0[2] + dir[2] * 0.30], 0.045, 0.045, 10);
        cyl(B.dark, [d0[0] + dir[0] * 0.30, d0[1] + dir[1] * 0.30, d0[2] + dir[2] * 0.30], [d0[0] + dir[0] * 0.31, d0[1] + dir[1] * 0.31, d0[2] + dir[2] * 0.31], 0.035, 0.035, 10);
      }
      box(B.dark, 0.55, 0.75, s > 0 ? 0.82 : -1.04, s > 0 ? 1.04 : -0.82, 0.16, 0.24);
    }
    /* the searchlight box on the roof front left of the gun, its round lens forward (S2, S1, S5, S3) */
    box(B.paint, 0.38, 0.80, 0.30, 0.70, ROOF - 0.04, ROOF + 0.34);
    cylX(B.dark, 0.80, 0.83, 0.50, ROOF + 0.15, 0.16, 0.16, 18);
    cylX(B.glass, 0.83, 0.84, 0.50, ROOF + 0.15, 0.135, 0.135, 18);
    box(B.dark, 0.50, 0.62, 0.46, 0.54, ROOF + 0.34, ROOF + 0.38);
    /* the gunner's sight on the right front of the roof: the plain hood (M551, S7) or the
       thermal-sight housing with its armoured window (M551A1 TTS, S5, S2) */
    if (V.tts) {
      box(B.paint, 0.22, 0.86, -0.72, -0.24, ROOF - 0.04, ROOF + 0.28);
      box(B.glass, 0.86, 0.875, -0.62, -0.34, ROOF + 0.08, ROOF + 0.22);
      box(B.dark, 0.86, 0.90, -0.66, -0.30, ROOF + 0.23, ROOF + 0.26);
      box(B.paint, 0.30, 0.78, -0.68, -0.28, ROOF + 0.28, ROOF + 0.30);
    } else {
      box(B.paint, 0.45, 0.84, -0.62, -0.32, ROOF - 0.04, ROOF + 0.16);
      box(B.glass, 0.84, 0.855, -0.57, -0.37, ROOF + 0.04, ROOF + 0.12);
    }
    /* the commander's cupola, right rear: a ring of vision blocks, the hatch, the .50 M2HB */
    var cx = -0.28, cy = -0.42;
    cylZ(B.paint, cx, cy, ROOF - 0.04, ROOF + 0.20, 0.34, 18);
    for (k = 0; k < 8; k++) {
      a = k / 8 * TAU + 0.2;
      slab(B.glass, [cx + Math.cos(a) * 0.335, cy + Math.sin(a) * 0.335, ROOF + 0.12], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.012, 0.05, 0.035);
    }
    cylZ(B.paint, cx, cy, ROOF + 0.20, ROOF + 0.26, 0.28, 16);
    cylZ(B.dark, cx, cy, ROOF + 0.26, ROOF + 0.28, 0.20, 14);
    var mz = ROOF + 0.50, el = 0.12;
    cylZ(B.dark, cx + 0.12, cy, ROOF + 0.26, mz - 0.04, 0.035, 8);
    cyl(B.dark, [cx - 0.25, cy, mz - 0.03], [cx + 0.20, cy, mz + 0.02], 0.065, 0.065, 10);
    cyl(B.dark, [cx + 0.20, cy, mz + 0.02], [cx + 1.20, cy, mz + 0.02 + 1.0 * el], 0.024, 0.024, 8);
    cylX(B.dark, cx + 0.40, cx + 0.55, cy, mz + 0.05, 0.035, 0.035, 8);
    box(B.dark, cx - 0.12, cx + 0.06, cy + 0.07, cy + 0.20, mz - 0.14, mz - 0.02);
    if (V.boxShield) {
      /* the M551A1's boxed cupola shield: front plate with the gun slot, side and rear plates
         standing on the cupola ring (S1, S2, S8; S5 in service) */
      var z0 = ROOF + 0.20, z1 = ROOF + 0.72;
      box(B.paint, cx + 0.34, cx + 0.38, cy - 0.42, cy + 0.42, z0, z1);
      box(B.dark, cx + 0.33, cx + 0.39, cy - 0.06, cy + 0.06, mz - 0.06, mz + 0.10);
      box(B.paint, cx - 0.40, cx + 0.38, cy - 0.44, cy - 0.40, z0, z1 - 0.06);
      box(B.paint, cx - 0.40, cx + 0.38, cy + 0.40, cy + 0.44, z0, z1 - 0.06);
      box(B.paint, cx - 0.44, cx - 0.40, cy - 0.44, cy + 0.44, z0, z1 - 0.18);
      for (s = -1; s <= 1; s += 2) box(B.glass, cx - 0.10, cx + 0.12, cy + s * 0.445 - 0.006, cy + s * 0.445 + 0.006, z0 + 0.30, z0 + 0.40);
      box(B.glass, cx + 0.385, cx + 0.392, cy + 0.14, cy + 0.32, z0 + 0.36, z0 + 0.46);
    }
    /* the loader's hatch, left rear, and its pintle post */
    cylZ(B.paint, -0.36, 0.42, ROOF - 0.04, ROOF + 0.07, 0.30, 16);
    cylZ(B.dark, -0.36, 0.42, ROOF + 0.07, ROOF + 0.09, 0.24, 14);
    cylZ(B.dark, -0.12, 0.66, ROOF, ROOF + 0.28, 0.025, 6);
    /* the ventilator dome, the aerial bases at the rear corners with their whips */
    cylZ(B.paint, -0.70, 0.0, ROOF - 0.03, ROOF + 0.07, 0.14, 14);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, -0.86, s * 0.56, ROOF - 0.10, ROOF + 0.06, 0.05, 8);
      cylZ(B.dark, -0.86, s * 0.56, ROOF + 0.06, ROOF + 0.95, 0.008, 5);
    }
    /* the bustle rack on the turret rear (S1, S9), and the A1's packs and rolls (S5, S9) */
    belt(B.dark, -1.12, 0.30, -1.12, 0.55, -0.70, 0.70, 0.025);
    for (s = -1; s <= 1; s += 2) belt(B.dark, -0.98, 0.55, -1.13, 0.55, s * 0.68, s * 0.72, 0.025);
    if (V.stow) {
      box(B.paint, -1.22, -0.94, -0.62, 0.10, 0.30, 0.62);
      cylY(B.paint, -1.08, 0.12, 0.66, 0.50, 0.12, 12);
      for (s = -1; s <= 1; s += 2) box(B.paint, -0.30, 0.20, s > 0 ? 0.93 : -1.10, s > 0 ? 1.10 : -0.93, 0.18, 0.46);
    }
    /* team colour: a small panel on the roof front */
    box(B.team, -0.10, 0.25, 0.05, 0.28, ROOF, ROOF + 0.012);
  }

  /* ================================================================ SCORPION */
  var SC = {
    HL: 2.275, WT: 0.80, DECK: 1.14, FEND: 0.97, WSC: 1.265, MUZ: 3.565, GZ: 1.76,
    G: { XW: [1.20, 0.40, -0.40, -1.20], ZW: 0.435, RW: 0.37, TY: 1.065, TW: 0.21, WW: 0.15, WG: 0.0,
         F: { x: 1.95, z: 0.52, r: 0.25 }, B: { x: -1.95, z: 0.40, r: 0.27 }, th: 0.05, links: 82 }
  };
  /* the tub: deck at 1.14, the long front slope from x 1.05 to the nose at 0.74 (M2, M4) */
  function scTop(x) { return x <= 1.05 ? SC.DECK : SC.DECK - (SC.DECK - 0.74) * (x - 1.05) / (SC.HL - 1.05); }
  var SC_BOT = [[-2.275, 0.52], [-2.05, 0.32], [1.75, 0.32], [2.275, 0.56]];
  function addScorpionHull(V, B) {
    var R = [], i, k, s, x, y, z, xs = [-2.275, -2.20, -1.0, 0.5, 1.05, 1.60, 2.20, 2.275];
    for (i = 0; i < xs.length; i++) {
      x = xs[i];
      var zt = scTop(x), zb = pwl(SC_BOT, x), w = SC.WT + (x > 1.6 ? -0.03 : 0), e = 0.03;
      R.push([[x, w - 0.06, zb], [x, w, zb + 0.06], [x, w, zt - e], [x, w - e, zt], [x, -(w - e), zt], [x, -w, zt - e], [x, -w, zb + 0.06], [x, -(w - 0.06), zb]]);
    }
    loftN(B.paint, R);
    /* the fender shelves over the tracks, and the flared front mudguards dropping down over the
       sprocket with their sloped faces (M2, M4) */
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * SC.WT, y1 = s * SC.WSC;
      box(B.paint, -2.22, 1.40, Math.min(y0, y1), Math.max(y0, y1), SC.FEND - 0.03, SC.FEND);
      box(B.dark, -2.22, 1.40, Math.min(y1, y1 + s * 0.02), Math.max(y1, y1 + s * 0.02), SC.FEND - 0.08, SC.FEND + 0.01);
      /* the mudguard: a box with a sloped top and a raked front face */
      var mg = [];
      var xsM = [1.40, 1.85, 2.25];
      for (k = 0; k < xsM.length; k++) {
        x = xsM[k];
        var zt2 = k === 0 ? SC.FEND : k === 1 ? 0.92 : 0.70, zb2 = k === 0 ? SC.FEND - 0.03 : k === 1 ? 0.62 : 0.58;
        var wi = s * (SC.WT - 0.02), wo = s * (SC.WSC + (k === 2 ? -0.06 : 0));
        mg.push([[x, wi, zb2], [x, wo, zb2], [x, wo, zt2], [x, wi, zt2]]);
      }
      loftN(B.paint, mg);
      /* the side plate of the tub above the fender, with a vertical stiffener */
      box(B.dark, -0.20, -0.17, s * SC.WT - 0.01, s * SC.WT + 0.01, SC.FEND, SC.DECK - 0.02);
      /* the headlamps with their guards on the front deck corners (M2, M4) */
      x = 1.30; z = SC.FEND; y = s * 1.05;
      box(B.dark, x - 0.08, x + 0.08, y - 0.09, y + 0.09, z, z + 0.06);
      cylX(B.dark, x - 0.08, x + 0.07, y, z + 0.16, 0.085, 0.09, 12);
      cylX(B.glass, x + 0.07, x + 0.08, y, z + 0.16, 0.075, 0.075, 12);
      belt(B.dark, x - 0.10, z + 0.25, x + 0.12, z + 0.25, y - 0.012, y + 0.012, 0.015);
      belt(B.dark, x + 0.12, z + 0.03, x + 0.12, z + 0.25, y - 0.012, y + 0.012, 0.015);
      /* tow shackles on the nose plate (M4) */
      box(B.dark, 2.275, 2.35, s * 0.50 - 0.07, s * 0.50 + 0.07, 0.56, 0.64);
      cylY(B.dark, 2.35, s * 0.50 - 0.05, s * 0.50 + 0.05, 0.56, 0.045, 8);
      addTrack(B, SC.G, s);
    }
    /* the grilled front slope over the engine (M4): two grille panels, a centre strip */
    var phi = Math.atan2(SC.DECK - 0.74, SC.HL - 1.05), cp = Math.cos(phi), sp = Math.sin(phi);
    var U = [cp, 0, -sp], N = [sp, 0, cp];
    for (s = -1; s <= 1; s += 2) {
      var cx = 1.62, cz = scTop(1.62);
      slab(B.dark, [cx + N[0] * 0.01, s * 0.40, cz + N[2] * 0.01], U, [0, 1, 0], N, 0.40, 0.32, 0.012);
      for (k = 0; k < 7; k++) {
        var u = -0.34 + k * 0.11;
        slab(B.paint, [cx + U[0] * u + N[0] * 0.025, s * 0.40, cz + U[2] * u + N[2] * 0.025], U, [0, 1, 0], N, 0.015, 0.31, 0.012);
      }
    }
    slab(B.team, [1.62 + N[0] * 0.02, 0, scTop(1.62) + N[2] * 0.02], U, [0, 1, 0], N, 0.25, 0.05, 0.008);
    /* the open fighting compartment: the dark floor, the side lockers and the rear lockers (M4) */
    box(B.dark, -1.80, 0.60, -0.62, 0.62, SC.DECK - 0.01, SC.DECK + 0.01);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -2.00, 0.20, s > 0 ? 0.58 : -0.80, s > 0 ? 0.80 : -0.58, SC.DECK, SC.DECK + 0.36);
      for (k = 0; k < 3; k++) cylY(B.dark, -1.65 + k * 0.62, s * 0.80, s * 0.815, SC.DECK + 0.20, 0.05, 8);
      /* the crew seats behind the shield */
      box(B.dark, -1.50, -1.20, s * 0.20 - 0.18, s * 0.20 + 0.18, SC.DECK, SC.DECK + 0.30);
    }
    box(B.paint, -2.20, -1.82, -0.80, 0.80, SC.DECK, SC.DECK + 0.48);
    for (k = 0; k < 3; k++) cylX(B.dark, -2.21, -2.20, -0.5 + k * 0.5, SC.DECK + 0.30, 0.05, 0.05, 8);
    box(B.team, -2.15, -1.88, -0.55, 0.55, SC.DECK + 0.48, SC.DECK + 0.492);
    /* rear plate: lamps, the tow pintle */
    for (s = -1; s <= 1; s += 2) { box(B.dark, -2.33, -2.275, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.92, 1.02); box(B.glass, -2.335, -2.33, s * 0.62 - 0.04, s * 0.62 + 0.04, 0.95, 0.99); }
    cylY(B.dark, -2.33, -0.06, 0.06, 0.62, 0.05, 8);

    /* the gun pedestal and the box shield (M2, M4, M1): front face vertical, the cheeks running
       back, open at the rear and below the gun; the driver's window in the left of the face,
       the steering wheel behind it (M4) */
    var sx0 = -0.75, sx1 = 0.40, sw = 0.74, sz0 = 1.40, sz1 = 2.05;
    box(B.paint, sx1 - 0.04, sx1, -sw, sw, sz0, sz1);
    box(B.paint, sx0, sx1, -sw, -sw + 0.04, sz0, sz1);
    box(B.paint, sx0, sx1, sw - 0.04, sw, sz0, sz1);
    box(B.paint, sx0 + 0.05, sx1, -sw, sw, sz1 - 0.04, sz1);
    box(B.dark, sx0, sx1 - 0.04, -sw + 0.04, sw - 0.04, sz1 - 0.045, sz1 - 0.04);
    box(B.glass, sx1, sx1 + 0.008, 0.18, 0.60, 1.66, 1.92);
    box(B.dark, sx1, sx1 + 0.012, 0.16, 0.62, 1.92, 1.95);
    box(B.glass, 0.00, 0.30, sw, sw + 0.006, 1.70, 1.92);
    cyl(B.dark, [0.15, 0.40, 1.46], [0.24, 0.40, 1.62], 0.016, 0.016, 6);
    cyl(B.dark, [0.20, 0.40, 1.62], [0.28, 0.40, 1.54], 0.13, 0.13, 16, true);
    cyl(B.dark, [0.199, 0.40, 1.621], [0.281, 0.40, 1.539], 0.11, 0.11, 16, true);
    /* the pedestal under the shield */
    cylZ(B.paint, -0.05, 0, SC.DECK, sz0 + 0.04, 0.42, 18);
    box(B.paint, -0.30, 0.30, -0.30, 0.30, sz0 - 0.04, sz0 + 0.30);
    /* the 90 mm M54: the cradle sleeve through the shield face, the recoil cylinder over the
       breech behind the shield, the long tube, the travel-lock clamp, the cylindrical muzzle
       brake with its side windows (M2, M1, M3) */
    cylX(B.paint, -0.70, sx1, 0, SC.GZ, 0.13, 0.13, 14);
    cylX(B.paint, -1.15, -0.30, 0, SC.GZ + 0.19, 0.085, 0.085, 12);
    cylX(B.dark, -1.17, -1.15, 0, SC.GZ + 0.19, 0.06, 0.06, 10);
    cylX(B.paint, sx1, 1.10, 0, SC.GZ, 0.15, 0.13, 16);
    cylX(B.dark, 1.10, 1.14, 0, SC.GZ, 0.12, 0.10, 14);
    cylX(B.dark, 1.14, SC.MUZ - 0.36, 0, SC.GZ, 0.085, 0.072, 14);
    cylX(B.dark, 2.48, 2.56, 0, SC.GZ, 0.10, 0.10, 12);
    cylX(B.dark, SC.MUZ - 0.36, SC.MUZ - 0.30, 0, SC.GZ, 0.075, 0.11, 14);
    cylX(B.dark, SC.MUZ - 0.30, SC.MUZ, 0, SC.GZ, 0.115, 0.115, 16);
    for (s = -1; s <= 1; s += 2) box(B.glass, SC.MUZ - 0.24, SC.MUZ - 0.08, s * 0.112 - 0.006, s * 0.112 + 0.006, SC.GZ - 0.06, SC.GZ + 0.06);
    cylX(B.glass, SC.MUZ, SC.MUZ + 0.002, 0, SC.GZ, 0.05, 0.05, 10);
    /* the A-frame travel lock: two legs from the nose corners to the clamp under the tube */
    for (s = -1; s <= 1; s += 2) cyl(B.dark, [2.10, s * 0.60, scTop(2.10) + 0.02], [2.52, s * 0.07, SC.GZ - 0.10], 0.025, 0.025, 6);
    box(B.dark, 2.46, 2.58, -0.10, 0.10, SC.GZ - 0.14, SC.GZ - 0.08);
    cyl(B.dark, [2.12, -0.60, scTop(2.12) + 0.03], [2.12, 0.60, scTop(2.12) + 0.03], 0.02, 0.02, 6);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A1, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T, V), G = V.kind === "scorpion" ? SC.G : SH.G, i, wg, WB, tg, TB;
    g.name = "us_airborne_" + which;
    if (V.kind === "scorpion") addScorpionHull(V, HB); else addSheridanHull(V, HB);
    flush(THREE, g, HB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, G, V, V.kind === "scorpion");
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.XW[i], 0, G.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (V.kind === "sheridan") {
      TB = bins(T, V);
      addSheridanTurret(V, TB);
      tg = new THREE.Group();
      tg.name = "turret";
      tg.position.set(SH.TX, 0, SH.DECK);
      flush(THREE, tg, TB);
      g.add(tg);
    }
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (the M56's gun forward 5.84 m published; the
   Sheridan's track and nose fittings just past the 6.30 m hull, the gun inside it) */
UNIT_MODELS["nato_e50_tankdestroyer"] = {
  len: 5.95,
  build: function (THREE, M, C) { return HeroAirborneLight.build(THREE, M, C, "M56"); }
};
UNIT_MODELS["nato_e60_lighttank"] = {
  len: 6.55,
  build: function (THREE, M, C) { return HeroAirborneLight.build(THREE, M, C, "M551"); }
};
UNIT_MODELS["nato_e80_lighttank"] = {
  len: 6.55,
  build: function (THREE, M, C) { return HeroAirborneLight.build(THREE, M, C, "A1"); }
};
