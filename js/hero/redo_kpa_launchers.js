/* ===== redo_kpa_launchers.js - HERO models: the KPA S-200 launcher and the Pongae-5 (KN-06) launcher =====
   Rough-model rebuild round.  Rows and what they get:
     kpa_e80_sam   S-200 Vega (SA-5 Gammon): the 5P72 single-rail launcher with a 5V28 round     NEW (s200)
     kpa_e00_sam   Pongae-5 (KN-06): the 6x6 launcher with its canisters                           NEW (pongae)
     sam_k         the same Pongae-5 (skirmish row)                                                NEW (pongae)
     pla_e80_sam   NOT an S-200: it has no rules.js / eras.js row (pla_e60_sam runs e60-e80) and its
                   js/armour_specs.js entry says "HQ-2B on a Type 63 tracked chassis"; China never had the
                   S-200.  It is given pla_e60_sam's model (the HQ-2 stand-in on the SM-63 launcher,
                   HeroS75S125.sm63, as js/hero/pla_retry.js does) in place of sam3d.js's tracked HQ2.
   HELD (left on their current models, registrations commented out at the foot; searches below):
     kpa_e00_mlrs  KN-09 300 mm MRL           tel_k  KN-23 / Hwasong-11Ga tracked TEL
     atgmv_k       Bulsae-4 (M-2018) ATGM carrier

   ---------------------------------------------------------------- S-200 (kpa_e80_sam)
   The row ("S-200 Vega (SA-5 Gammon), 5P72 launcher and Square Pair radar", deploy, turret, rounds 1) is
   the unit that trains and fires, so the 5P72 launcher is drawn, loaded; the 5N62 Square Pair is a separate
   site radar and is not drawn (as ru_s75_s125.js leaves out the Fan Song).  The launcher is a fixed one,
   carried on transport bogies: it has no travel pose, which also keeps tools/jsc/deploypose_check.js's use
   of this row as "a deploying row without pose groups" true.
   References (Wikimedia Commons at 1600 px, cached in scratchpad/q_kpal_ref/s200):
     [S1] "ZUR 5V28 na puskovoy ustanovke 5P72V ZRK S-200V Vega - Parka Patriot 01" (Cyrillic title; Vitaly
          Kuzmin): starboard side nearly square on, beam level.  THE SIDE DRAWING: 123.6 px a metre off the
          round's published 10.764 m (nose tip to booster nozzles, 1330 px).
     [S2] the same, "...02": from the rear quarter, beam raised (about 30 deg): the trunnion at the rear of
          the housing roof, the hooked front arms, the cross base and its four jacks.
     [S3] the same, "...03": from the front quarter, beam raised: the housing's bolted X doors, the front
          ram, the four jack pads in a square as seen 45 deg off the arms.
     [S4] "5P72 launcher of S-200 desc table in Perm": the housing's end face (chamfered roof edges, a bolted X
          panel, two rounded door outlines, two steps) and the museum plate (5P72, 11,500 kg).
     Also seen: "ZRK S-200V 2007 G1/G2/G3", "S-200V Vega SAM", "S-200 01/02/03", "S-200-Wega-2008-Peenemunde",
     "SA-5 Gammon", "Boden-Luft-Rakete SA 5 Gammon" (the same launcher and round in other museums).
   Published (en.wikipedia "S-200 missile system", the 5V28 infobox): 10,764 mm with boosters, 752 mm,
     wingspan 2.52 m, 7,018 kg; ru.wikipedia "S-200": six 5P72 a battalion.  [S4]: 5P72 11,500 kg.
   Measured off [S1] (origin on the slewing-ring axis, the ground at z 0): pads +-1.96 m out on a cross;
     slewing ring 0.93 m up, about 2.8 m across; housing x -2.10..3.18, z 1.50..2.87, five doors a side;
     beam z 2.87..3.72, x -2.95..4.65, trunnion at x -2.45 z 3.30; round axis 4.73 m up, nose at x +7.28,
     nozzles at -3.48; boosters 6.3 m long (nozzle to cone tip), wing root 5.1 m.
   The model: 12.18 m (nose to the rear loading arm) x 4.64 m (over the jack pads) x 6.28 m (to the upper
     booster's fin); [S1]'s silhouette tops out at 6.35 m.
   Recognition list: the cross base with four screw jacks on round pads [S1][S2][S3]; the round slewing ring
     and drum [S1]; the long housing with five bolted X doors a side and chamfered roof edges [S1][S3][S4];
     the trunnion brackets at its rear [S2]; the deep launch beam with its side tank and instrument boxes
     [S1][S3]; the hooked front arms and the ram [S1][S3]; the rear loading arm [S1]; the 5V28 with its dark
     ogive radome, four long deltas in an X, four tail controls, four strap-on boosters (top, bottom, sides)
     each with a fin [S1][S3].
   Nodes: "turret" = the housing on the ring (origin on the ring axis at the ring top); inside it "podelev" =
     the beam and the round, hinged on the trunnion, level at rest ([S1]) and raised by userData.el = 30 deg
     (render3d poseLauncher; [S2][S3] show 30-35 deg on display); userData.cells = the round's nose.  No `ord`
     (the round is drawn by FX3D's unnamed missile as before), so tools/jsc/launcher3d_check.js ORDS is unchanged.
   Paint: plain Soviet PVO green #4d5536 (the museums' brown-olive is a display paint), the round in light
     grey #a9aaa3 (sampled [S1] #afa9a1), the radome dark.  No markings.
   NOT CONFIRMED: the far side (taken as the near side's mirror); the beam's top rail and shoes (hidden by the
     round); the raised angle; booster diameter (0.60 m drawn), fin and wing thickness; the KPA paint colour.

   ---------------------------------------------------------------- PONGAE-5 (kpa_e00_sam, sam_k)
   Reference: [K1] "Pon'gae-5 - North Korea Victory Day-2013 01" (Wikimedia Commons, the image of the
     en.wikipedia "Pongae-5" article; at 1600 px in scratchpad/q_kpal_ref/s200/pongae.jpg): a front-left...
     strictly the front-STARBOARD three-quarter (the driver's seat shows at the far end of the windscreen),
     parade, July 2013.  It is the only photograph found, and it shows the launcher travelling, canisters
     lying.  Commons "Category:Pon'gae-5" holds only this file.
   Published (en.wikipedia "Pongae-5"): round 6.8-7.25 m long, 0.45-0.50 m; "launch tubes ... larger in
     diameter, but shorter than the S-300's"; launch platform "6x6 KamAZ-55111 truck (Taebaeksan 96)".
   Measured off [K1] by a projective fit along the near side (the tyre heights against their image positions;
     1/height is linear in depth along a line): scale from the 1.20 m tyre (425/85R21 class) and the rear
     bogie's 1.32 m axle spacing.  Front axle to the middle axle 5.8 m; bumper 1.45 m ahead of the front
     axle; the cabin from 0.45 to 2.95 m behind it, roof 3.80 m; the locker body to 10.3 m behind it, deck
     2.63 m; canister tails 10.96 m behind it, axis 3.26 m up, about 1.2 m across; cab roof 3.09 m; bumper
     0.77-1.20 m.  Overall 12.4 m (sam3d.js's old model was drawn 12.4 m too).
   The model: 12.56 m (12.43 bumper to canister tails, plus the tow hooks) x 2.50 m body (3.28 over the
     mirrors) x 3.89 m to the canister lugs (5.12 to the whip aerial).
   Recognition list ([K1]): the KamAZ-65115-pattern cab-over cab, its big slatted grille, the light grey
     bumper with its lamps, the tall mirrors; the tall control cabin behind the cab with the amber corner
     lamps, the door with its round porthole, the ladder, the red extinguisher; the long locker body with
     louvred doors and the arch over the rear bogie; the screw jacks behind the front wheel and behind the
     bogie; silver canisters with heavy hoops, lifting lugs and a bolted fitting plate, overhanging the rear.
   Nodes: three "roadwheel" axle groups; "podelev" = the canisters and their erector frame, hinged at the
     tails on the deck, raised to userData.el = 90 deg to fire (vertical launch, en.wikipedia: an S-300-like
     system); cells at the two canister mouths.  No "turret": the vertical launcher does not train (the row
     is turret:true; nothing in render3d needs one).
   Paint: plain olive #4a523c (sampled [K1] cab side #404a36 in shade, lockers #535a44 lit), canisters
     silver #b4babc (sampled #bcc4c6), bumper light grey.  No markings, numbers or the cab's maker script.
   NOT CONFIRMED: HOW MANY CANISTERS - [K1] shows one row from the side; two side by side are drawn (each
     hoop carries two lugs in [K1] and two 1.2 m tubes fill the 2.5 m body), the row's rounds:4 is not
     drawn.  The erector, its hinge and the vertical firing pose are not photographed (drawn as the S-300's);
     the port side (lockers mirrored, no door or ladder drawn there); the cabin's rear face; the rear lamps.

   ---------------------------------------------------------------- HELD, with the searches tried
   Wikimedia Commons file and category search ("KN-09", "KN-09 rocket", "300mm rocket launcher North Korea",
   "North Korean multiple rocket launcher", "KN-23", "Hwasong-11", "Bulsae", "Bulsae-4", "North Korea anti-tank
   missile vehicle", "North Korean missile launcher tracked", "KORN Pyonyang", "Pyongyang parade 2020 missile";
   category search "KN-23", "Hwasong-11", "KN-06", "Pongae", "Bulsae", "KN-09 MLRS"); Commons categories
   "Military parades in North Korea" (the 2013 Victory Day set, the 2015 Workers' Party parade set of 66 files
   contact-sheeted: troops and floats only, "Victory Parade in Pyongyang (2023)" 1-3, the Shoigu 2023 files),
   "Military vehicles of North Korea", "Weapons of North Korea", "Self-propelled multiple rocket launchers of
   North Korea", "KN-23" (two missile diagrams only), "Pon'gae-5"; en.wikipedia "KN-09 (multiple rocket
   launcher)", "Hwasong-11A", "Bulsae-4", "List of equipment of the Korean People's Army Ground Force" (the
   KN-09 row shows a civilian Sinotruk HOWO and a ZIL-135, not the launcher; Bulsae-4 has no image);
   ru.wikipedia "KN-23", "KN-09"; ko.wikipedia is refused by this machine's proxy (403).
     kpa_e00_mlrs  KN-09: no photograph or drawing of the launcher (only of trucks it is said to use).
     tel_k         KN-23 tracked TEL: only "Diagram of KN-23.svg" (the missile, not the vehicle).
     atgmv_k       Bulsae-4: no photograph or drawing found.

   LOAD ORDER: after js/sam3d.js (whose kpa_e80_sam / kpa_e00_sam / sam_k / pla_e80_sam registrations these
     replace) and js/hero/ru_s75_s125.js (pla_e80_sam is registered only if HeroS75S125 is loaded).
   ENGINE (js/damage3d.js, not edited): sam rows burn "front" by default: right for the Pongae-5 (engine under
     the cab); the S-200 launcher has no engine (it burns at its front, over the housing).
   Materials (per group, one mesh each): paint (detail canvas texture), metal (the rounds and canisters, their
     own canvas texture), dark, glass, kit (vertex-coloured lamps, lenses, extinguisher), C.team (small roof
     strips).  Draw calls: S-200 8, Pongae-5 11.  +X nose, +Y port, +Z up, metres, ground at z 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaLaunchers = (function () {
  "use strict";
  var TAU = Math.PI * 2;

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
  /* a square bar of half side h between two 3D points (the detail pass) */
  function bar(bin, A, B, h) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t)), v = cross(ax, u);
    var c = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2], l = Math.sqrt(dot(sub(B, A), sub(B, A))) / 2;
    slab(bin, c, ax, u, v, l, h, h);
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 14); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 14); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 14); }
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
  /* rings of a plan (x, y) scaled per level: L = [[z, sx, sy], ...] */
  function planLoft(bin, plan, L, x0) {
    var R = [], k, i;
    for (k = 0; k < L.length; k++) { R.push([]); for (i = 0; i < plan.length; i++) R[k].push([(x0 || 0) + plan[i][0] * L[k][1], plan[i][1] * L[k][2], L[k][0]]); }
    loftN(bin, R);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, P) {
    if (_tex[P.base] !== undefined) return _tex[P.base];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.25 + R() * 0.35; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.base] = t;
    return t;
  }
  var __DTEX = {};
  /* DETAIL PAINT (the detail pass): a 512 px tile over 2.94 m of surface (UVs 0.34 a metre, 174 px a
     metre).  Over the base colour and its soft blots: plate seams with a lit edge, bolt rows along some
     of them, access-panel outlines with corner screws, rain streaks, grime, dust, chipped paint and oil
     spots.  Plain paint - no markings, numbers or camouflage. */
  function detailTex(THREE, P) {
    var key = "detail" + P.seed + P.base;
    if (__DTEX[key] !== undefined) return __DTEX[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, R = rng(P.seed * 7 + 13), i, k, x, y, w, h, ox, oy, a, xs, n;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      /* soft mottling in the base's own shades, drawn wrapped so the tile repeats without a seam */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 20; i++) {
          x = R() * S; y = R() * S; w = 26 + R() * 90; h = 16 + R() * 60; a = R() * Math.PI;
          q.globalAlpha = 0.22 + R() * 0.3;
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
            if (x + ox < -w - 4 || x + ox > S + w + 4 || y + oy < -w - 4 || y + oy > S + w + 4) continue;
            q.beginPath(); q.ellipse(x + ox, y + oy, w, h, a, 0, TAU); q.fill();
          }
        }
      }
      /* plate seams: four vertical butts across the tile, horizontal seams staggered between them */
      xs = [];
      for (i = 0; i < 4; i++) xs.push(Math.floor(i * 128 + 20 + R() * 80) + 0.5);
      for (i = 0; i < 4; i++) {
        q.globalAlpha = 1; q.strokeStyle = "rgba(14,15,10,0.42)"; q.lineWidth = 2;
        q.beginPath(); q.moveTo(xs[i], 0); q.lineTo(xs[i], S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.12)"; q.lineWidth = 1;
        q.beginPath(); q.moveTo(xs[i] + 2, 0); q.lineTo(xs[i] + 2, S); q.stroke();
        y = Math.floor(60 + R() * 120) + 0.5;
        for (k = 0; k < 2; k++) {
          var xa = xs[i], xb = i < 3 ? xs[i + 1] : xs[0] + S;
          q.strokeStyle = "rgba(14,15,10,0.38)"; q.lineWidth = 2;
          q.beginPath(); q.moveTo(xa, y); q.lineTo(xb, y); q.stroke();
          q.beginPath(); q.moveTo(xa - S, y); q.lineTo(xb - S, y); q.stroke();
          q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1;
          q.beginPath(); q.moveTo(xa, y + 2); q.lineTo(xb, y + 2); q.stroke();
          /* a bolt row along every other seam */
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels: outlined, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      q.globalAlpha = 1;
      /* rain streaks down the plates (side faces carry v along z) */
      for (i = 0; i < 260; i++) {
        q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)";
        q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54);
      }
      /* grime and dust patches */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, TAU); q.fill();
      }
      /* chipped paint and scratches */
      for (i = 0; i < 180; i++) {
        q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)";
        n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n);
      }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      /* oil and fuel spots */
      for (i = 0; i < 8; i++) {
        q.fillStyle = "rgba(12,10,6,0.16)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, TAU); q.fill();
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    __DTEX[key] = t;
    return t;
  }
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
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
      m = new THREE.Mesh(geo, b.mat); m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); if (name) g.name = name; g.position.set(x || 0, y || 0, z || 0); return g; }
  function rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }

  /* ------------------------------------------------------------ kit additions */
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a flat convex plate through the 3D points P (in order), th thick about its own plane */
  function plate(bin, P, th) {
    var n = unit(cross(sub(P[1], P[0]), sub(P[2], P[0]))), V = [], F = [], k = P.length, i, j, h = th / 2;
    for (i = 0; i < k; i++) {
      V.push([P[i][0] - n[0] * h, P[i][1] - n[1] * h, P[i][2] - n[2] * h]);
      V.push([P[i][0] + n[0] * h, P[i][1] + n[1] * h, P[i][2] + n[2] * h]);
    }
    for (i = 0; i < k; i++) { j = (i + 1) % k; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < k - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a point at radius r and roll angle a about an axis along X at (y0, z0) */
  function rad(x, r, a, y0, z0) { return [x, (y0 || 0) + Math.cos(a) * r, (z0 || 0) + Math.sin(a) * r]; }
  /* a polyline of square bars */
  function poly(bin, P, h) { for (var i = 0; i + 1 < P.length; i++) bar(bin, P[i], P[i + 1], h); }
  function mats(THREE, C, P, Q) {
    var T = materials(THREE, C, P), dt = detailTex(THREE, P), dq = detailTex(THREE, Q);
    if (dt) T.paint.map = dt;
    T.metal = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.25 });
    if (dq) T.metal.map = dq; else T.metal.color.set(Q.base);
    return T;
  }
  function binsM(T) { var B = bins(T); B.metal = new Bin(T.metal, true); B.kit = new Bin(T.wheel, false, true); return B; }
  var RED = [0.62, 0.08, 0.06], AMBER = [0.95, 0.55, 0.10], LENS = [0.85, 0.86, 0.80], TAIL = [0.55, 0.05, 0.04];

  /* ======================================================= S-200: 5P72 launcher with the 5V28 */
  /* Stations in metres, off [S1] at 123.6 px a metre (the 10.764 m round, nose tip to booster nozzles,
     1330 px); origin on the slewing-ring axis on the ground, +X to the round's nose. */
  var SV = {
    P: { base: "#4d5536", blots: ["#434b2f", "#58603f"], seed: 5272 },
    Q: { base: "#a9aaa3", blots: ["#9c9d96", "#b6b7b0"], seed: 5282 },
    RING: 0.93,                      /* slewing-ring top above the ground                         */
    BX0: -2.10, BX1: 3.18, BW: 1.30, /* the rotating housing: x, half width                       */
    BZ0: 1.50, BZ1: 2.87,            /* its bottom and roof (absolute)                            */
    PIVX: -2.45, PIVZ: 3.30,         /* the launch beam's trunnion (absolute)                     */
    MZ: 1.43, NOSE: 9.73, TAILX: -1.03, R: 0.43,   /* the round in the beam's frame             */
    ARM: 1.96,                       /* the cross-base arms, ring axis to pad centre              */
    EL: 30 * Math.PI / 180           /* raised for the shot (display launchers stand at 30-35 deg) */
  };

  /* the fixed cross base: four box-girder arms on screw jacks, the fixed ring */
  function s200Base(B) {
    var a, k, c, s, u, ex, ey, x, y, R = SV.ARM;
    cylZ(B.paint, 0, 0, 0.30, 0.80, 1.00, 24);                 /* centre pedestal */
    cylZ(B.paint, 0, 0, 0.78, SV.RING - 0.02, 1.45, 32);        /* fixed ring housing */
    cylZ(B.dark, 0, 0, SV.RING - 0.03, SV.RING, 1.40, 32);
    for (k = 0; k < 24; k++) {                                  /* the ring's bolt heads */
      a = k / 24 * TAU; cylZ(B.dark, Math.cos(a) * 1.38, Math.sin(a) * 1.38, SV.RING - 0.06, SV.RING - 0.01, 0.035, 6);
    }
    for (k = 0; k < 4; k++) {
      a = k / 4 * TAU; c = Math.cos(a); s = Math.sin(a);
      /* the arm: deep at the pedestal, tapering down to the jack */
      var prof = [[0.70, 0.30], [R - 0.22, 0.38], [R + 0.12, 0.40], [R + 0.12, 0.62], [R - 0.30, 0.66], [0.90, 0.80], [0.70, 0.80]];
      var V = [], F = [], n = prof.length, i, j, w = 0.21;
      for (i = 0; i < n; i++) {
        u = prof[i][0];
        V.push([c * u - s * w, s * u + c * w, prof[i][1]], [c * u + s * w, s * u - c * w, prof[i][1]]);
      }
      for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
      for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
      solid(B.paint, V, F);
      /* lightening holes along the arm's sides, a top flange strip */
      for (i = 0; i < 3; i++) {
        u = 0.95 + i * 0.30;
        for (j = -1; j <= 1; j += 2) cyl(B.dark, [c * u - s * j * 0.215, s * u + c * j * 0.215, 0.56], [c * u - s * j * 0.225, s * u + c * j * 0.225, 0.56], 0.055, 0.055, 8);
      }
      bar(B.paint, [c * 0.75, s * 0.75, 0.81], [c * (R - 0.32), s * (R - 0.32), 0.67], 0.012);
      /* the jack: pad, screw column, collar on the arm end, hand wheel */
      ex = c * R; ey = s * R;
      cylZ(B.paint, ex, ey, 0, 0.06, 0.36, 20);
      cyl(B.paint, [ex, ey, 0.06], [ex, ey, 0.14], 0.30, 0.12, 16);
      cylZ(B.dark, ex, ey, 0.14, 0.98, 0.075, 10);
      cylZ(B.paint, ex, ey, 0.40, 0.66, 0.13, 12);
      cylZ(B.dark, ex, ey, 0.98, 1.01, 0.17, 14);
      for (i = 0; i < 4; i++) { x = Math.cos(i / 4 * TAU + 0.4) * 0.16; y = Math.sin(i / 4 * TAU + 0.4) * 0.16; bar(B.dark, [ex, ey, 0.995], [ex + x, ey + y, 0.995], 0.012); }
      cylZ(B.dark, ex, ey, 1.01, 1.06, 0.03, 6);
    }
  }

  /* the rotating housing on its slewing ring (the "turret"; frame on the ring axis at the ring top) */
  function s200Housing(B) {
    var Z0 = SV.BZ0 - SV.RING, Z1 = SV.BZ1 - SV.RING, W = SV.BW, s, i, k, a, x, xc, y;
    cylZ(B.dark, 0, 0, 0, 0.10, 1.36, 32);                     /* slewing ring */
    for (k = 0; k < 40; k++) { a = k / 40 * TAU; slab(B.dark, [Math.cos(a) * 1.37, Math.sin(a) * 1.37, 0.05], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.025, 0.04, 0.045); }
    cylZ(B.paint, 0, 0, 0.10, Z0 + 0.02, 1.02, 24);            /* the drum under the housing */
    for (k = 0; k < 16; k++) { a = k / 16 * TAU; slab(B.paint, [Math.cos(a) * 1.04, Math.sin(a) * 1.04, (0.10 + Z0) / 2], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.03, 0.03, (Z0 - 0.10) / 2); }
    cylZ(B.paint, 0, 0, 0.10, 0.18, 1.18, 28);
    /* the housing: flat sides, chamfered roof edges ([S4] end view) */
    prismX(B.paint, [[-W, Z0], [W, Z0], [W, Z1 - 0.26], [W - 0.26, Z1 - 0.02], [W - 0.70, Z1], [-W + 0.70, Z1], [-W + 0.26, Z1 - 0.02], [-W, Z1 - 0.26]], SV.BX0, SV.BX1);
    /* side doors: five a side, each a bolted plate with an X brace and a centre boss [S1][S3] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) {
        xc = -1.55 + i * 1.02; y = s * W;
        var x0 = xc - 0.45, x1 = xc + 0.45, z0 = Z0 + 0.10, z1 = Z1 - 0.32;
        box(B.paint, x0, x1, y, y + s * 0.025, z0, z1);
        bar(B.paint, [x0 + 0.10, y + s * 0.04, z0 + 0.10], [x1 - 0.10, y + s * 0.04, z1 - 0.10], 0.022);
        bar(B.paint, [x0 + 0.10, y + s * 0.04, z1 - 0.10], [x1 - 0.10, y + s * 0.04, z0 + 0.10], 0.022);
        cylY(B.paint, xc, y, y + s * 0.07, (z0 + z1) / 2, 0.08, 12);
        for (k = 0; k < 8; k++) {
          a = k / 8 * TAU + Math.PI / 8;
          cylY(B.dark, xc + Math.cos(a) * 0.40, y + s * 0.02, y + s * 0.055, (z0 + z1) / 2 + Math.sin(a) * 0.40, 0.035, 8);
        }
        box(B.dark, x0 - 0.02, x0 + 0.02, y, y + s * 0.03, z0, z1);          /* the seam between doors */
      }
      /* the upper rim and a hand rail along it */
      box(B.paint, SV.BX0, SV.BX1, s * W, s * (W + 0.03), Z1 - 0.32, Z1 - 0.26);
      for (i = 0; i < 6; i++) { x = -1.9 + i * 0.95; bar(B.dark, [x, s * (W + 0.02), Z1 - 0.20], [x, s * (W + 0.09), Z1 - 0.20], 0.015); }
      bar(B.dark, [-1.9, s * (W + 0.09), Z1 - 0.20], [2.85, s * (W + 0.09), Z1 - 0.20], 0.016);
      /* the skirt under the doors and its drain slots */
      box(B.dark, SV.BX0 + 0.05, SV.BX1 - 0.05, s * (W - 0.05), s * (W + 0.005), Z0 - 0.04, Z0 + 0.02);
    }
    /* the end faces ([S4]): a bolted X panel, two rounded door outlines, two steps */
    for (s = -1; s <= 1; s += 2) {
      x = s > 0 ? SV.BX1 : SV.BX0;
      var xo = x + s * 0.02, zc = (Z0 + Z1) / 2 - 0.08;
      box(B.paint, x, xo, -0.45, 0.45, zc - 0.45, zc + 0.45);
      bar(B.paint, [xo + s * 0.01, -0.36, zc - 0.36], [xo + s * 0.01, 0.36, zc + 0.36], 0.02);
      bar(B.paint, [xo + s * 0.01, -0.36, zc + 0.36], [xo + s * 0.01, 0.36, zc - 0.36], 0.02);
      cylX(B.paint, xo, xo + s * 0.05, 0, zc, 0.08, 0.08, 12);
      for (k = 0; k < 8; k++) { a = k / 8 * TAU + Math.PI / 8; cylX(B.dark, xo, xo + s * 0.04, Math.cos(a) * 0.40, zc + Math.sin(a) * 0.40, 0.035, 0.035, 8); }
      for (i = -1; i <= 1; i += 2) {
        y = i * 0.85;
        bar(B.dark, [xo, y - 0.30, Z0 + 0.12], [xo, y + 0.30, Z0 + 0.12], 0.012);
        bar(B.dark, [xo, y - 0.30, Z1 - 0.40], [xo, y + 0.30, Z1 - 0.40], 0.012);
        bar(B.dark, [xo, y - 0.32, Z0 + 0.14], [xo, y - 0.32, Z1 - 0.42], 0.012);
        bar(B.dark, [xo, y + 0.32, Z0 + 0.14], [xo, y + 0.32, Z1 - 0.42], 0.012);
        box(B.dark, xo, xo + s * 0.16, y - 0.18, y + 0.18, zc - 0.20, zc - 0.17);   /* foot step */
        box(B.dark, xo, xo + s * 0.16, y - 0.18, y - 0.15, zc - 0.20, zc - 0.10);
        box(B.dark, xo, xo + s * 0.16, y + 0.15, y + 0.18, zc - 0.20, zc - 0.10);
      }
    }
    /* trunnion brackets at the rear of the roof for the beam's pivot */
    var PZ = SV.PIVZ - SV.RING;
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[SV.PIVX - 0.45, Z1], [SV.PIVX + 0.70, Z1], [SV.PIVX + 0.25, PZ + 0.10], [SV.PIVX - 0.30, PZ + 0.10]], s * 0.56, s * 0.74);
      cylY(B.dark, SV.PIVX, s * 0.74, s * 0.82, PZ, 0.16, 16);
    }
    /* the elevating ram lying on the front of the roof, its clevis; the cable duct and the pipe elbow */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 2.30, 3.30, s * 0.42, Z1 + 0.15, 0.13, 0.13, 14);
      cylX(B.paint, 2.10, 2.30, s * 0.42, Z1 + 0.15, 0.17, 0.17, 14);
      box(B.paint, 2.00, 2.20, s * 0.30, s * 0.55, Z1, Z1 + 0.18);
      cylX(B.dark, 3.30, 3.70, s * 0.42, Z1 + 0.15, 0.06, 0.06, 10);
    }
    cylZ(B.paint, -1.55, -0.85, Z1 - 0.02, Z1 + 0.65, 0.14, 14);
    cyl(B.paint, [-1.55, -0.85, Z1 + 0.65], [-1.30, -0.85, Z1 + 0.85], 0.14, 0.14, 14);
    cylX(B.paint, -1.30, -0.80, -0.85, Z1 + 0.85, 0.14, 0.14, 14);
    /* roof fittings: two hatches, a junction box, lifting eyes; the team strips */
    for (i = 0; i < 2; i++) {
      x = -0.6 + i * 1.6;
      box(B.paint, x - 0.40, x + 0.40, -0.55, 0.55, Z1, Z1 + 0.04);
      box(B.dark, x - 0.36, x + 0.36, -0.01, 0.01, Z1 + 0.04, Z1 + 0.05);
      cylY(B.dark, x + 0.30, -0.12, 0.12, Z1 + 0.06, 0.02, 6);
    }
    box(B.paint, 1.10, 1.60, 0.70, 1.05, Z1 - 0.04, Z1 + 0.22);
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) cylY(B.dark, i * 2.3, s * 0.95 - 0.02, s * 0.95 + 0.02, Z1 + 0.05, 0.07, 8);
    box(B.team, 0.25, 0.95, 0.70, 0.92, Z1 - 0.01, Z1 + 0.012);
    box(B.team, 0.25, 0.95, -0.92, -0.70, Z1 - 0.01, Z1 + 0.012);
  }

  /* the launch beam and the round, in the "podelev" frame (origin on the trunnion) */
  function s200Beam(B) {
    var s, i, k, x, a, BT = 0.42, BB = -0.43, MZ = SV.MZ;
    /* the beam: a deep box girder, a little narrower at the front */
    prismY(B.paint, [[-0.50, BB + 0.08], [-0.30, BB], [6.95, BB], [7.10, BB + 0.12], [7.10, BT], [-0.50, BT]], -0.50, 0.50);
    cylY(B.paint, 0, -0.74, 0.74, 0, 0.24, 18);                /* the trunnion hub */
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, 0, s * 0.74, s * 0.80, 0, 0.12, 12);
      /* side equipment: the round tank, the long instrument boxes, latches, a conduit */
      cylX(B.paint, 0.95, 1.65, s * 0.64, -0.05, 0.14, 0.14, 14);
      cylX(B.dark, 0.88, 0.95, s * 0.64, -0.05, 0.08, 0.08, 10);
      box(B.paint, 1.70, 4.10, s * 0.50, s * 0.70, -0.30, 0.22);
      for (i = 0; i < 4; i++) {
        x = 1.85 + i * 0.58;
        box(B.dark, x, x + 0.50, s * 0.70, s * 0.715, -0.26, 0.18);
        box(B.paint, x + 0.05, x + 0.45, s * 0.705, s * 0.72, -0.22, 0.14);
        box(B.dark, x + 0.20, x + 0.30, s * 0.715, s * 0.74, 0.02, 0.08);
      }
      box(B.paint, 4.20, 5.50, s * 0.50, s * 0.60, -0.36, -0.10);
      cylX(B.dark, 0.20, 6.80, s * 0.53, 0.30, 0.035, 0.035, 8);
      /* the rib plates along the girder's flanks */
      for (i = 0; i < 12; i++) { x = -0.30 + i * 0.62; if (x > 1.6 && x < 4.2) continue; box(B.paint, x, x + 0.05, s * 0.50, s * 0.54, BB, BT); }
      /* the hooked front arms down to the elevating ram [S1] */
      poly(B.paint, [[7.02, s * 0.42, 0.10], [7.00, s * 0.42, -0.55], [6.70, s * 0.42, -0.80], [6.20, s * 0.42, -0.82], [5.85, s * 0.42, -0.70]], 0.07);
      cylY(B.dark, 5.85, s * 0.34, s * 0.50, -0.70, 0.08, 10);
      /* the rear loading arm up to the tail and back [S1] */
      poly(B.paint, [[-0.45, s * 0.36, 0.35], [-0.80, s * 0.36, 0.95], [-1.30, s * 0.36, 1.12], [-2.35, s * 0.36, 1.18]], 0.06);
      bar(B.paint, [-1.30, s * 0.36, 1.12], [-1.30, s * 0.10, 1.12], 0.05);
    }
    bar(B.paint, [-2.35, -0.36, 1.18], [-2.35, 0.36, 1.18], 0.05);
    box(B.paint, -2.45, -2.20, -0.30, 0.30, 1.05, 1.24);
    /* the rail on the beam's top: cross ribs and two shoe tracks */
    for (i = 0; i < 26; i++) { x = -0.25 + i * 0.28; box(B.dark, x, x + 0.06, -0.46, 0.46, BT, BT + 0.04); }
    for (s = -1; s <= 1; s += 2) box(B.paint, -0.30, 7.05, s * 0.10, s * 0.18, BT, BT + 0.08);
    /* the shoes the round rides on: front post, rear cradle */
    box(B.paint, 6.40, 6.95, -0.16, 0.16, BT, MZ - SV.R + 0.04);
    box(B.dark, 6.45, 6.90, -0.20, 0.20, MZ - SV.R - 0.02, MZ - SV.R + 0.03);
    prismY(B.paint, [[-0.20, BT], [0.60, BT], [0.45, MZ - SV.R - 0.30], [-0.10, MZ - SV.R - 0.30]], -0.62, -0.42);
    prismY(B.paint, [[-0.20, BT], [0.60, BT], [0.45, MZ - SV.R - 0.30], [-0.10, MZ - SV.R - 0.30]], 0.42, 0.62);
    /* --- the 5V28: the sustainer --- */
    var M = B.metal, R = SV.R;
    cylX(B.dark, SV.TAILX + 0.05, -0.55, 0, MZ, 0.24, 0.22, 16);
    cylX(M, -0.55, 0.15, 0, MZ, 0.34, R, 20);
    cylX(M, 0.15, 8.25, 0, MZ, R, R, 22);
    [0.15, 2.05, 4.40, 6.30, 8.00].forEach(function (xr) { cylX(B.dark, xr - 0.02, xr + 0.02, 0, MZ, R + 0.006, R + 0.006, 22); });
    cylX(B.dark, 3.40, 5.80, 0, MZ + R - 0.02, 0.05, 0.05, 8);          /* the cable tunnel on top */
    /* the radome: an ogive, dark grey */
    var ox = 8.25, ol = SV.NOSE - 8.25, n = 8, r0, r1;
    for (k = 0; k < n; k++) {
      r0 = R * Math.pow(Math.cos(k / n * Math.PI / 2), 0.75); r1 = Math.max(0.015, R * Math.pow(Math.cos((k + 1) / n * Math.PI / 2), 0.75));
      cylX(B.dark, ox + ol * k / n, ox + ol * (k + 1) / n, 0, MZ, r0, r1, 20);
    }
    /* four long delta wings in an X [S1][S3]; four tail controls in line with them */
    for (k = 0; k < 4; k++) {
      a = Math.PI / 4 + k * Math.PI / 2;
      plate(M, [rad(1.07, R - 0.02, a, 0, MZ), rad(6.21, R - 0.02, a, 0, MZ), rad(1.62, 1.26, a, 0, MZ), rad(1.35, 1.26, a, 0, MZ)], 0.04);
      plate(M, [rad(-0.62, 0.35, a, 0, MZ), rad(0.42, R - 0.02, a, 0, MZ), rad(0.05, 0.98, a, 0, MZ), rad(-0.50, 0.98, a, 0, MZ)], 0.035);
    }
    /* the four strap-on boosters, top, bottom and sides [S1], each with its fin and its two straps */
    for (k = 0; k < 4; k++) {
      a = k * Math.PI / 2;
      var c = rad(0, 0.76, a, 0, MZ);
      cylX(B.dark, SV.TAILX, -0.55, c[1], c[2], 0.29, 0.21, 16);
      cylX(M, -0.55, 4.30, c[1], c[2], 0.30, 0.30, 18);
      cylX(M, 4.30, 5.24, c[1], c[2], 0.30, 0.03, 18);
      cylX(B.dark, 0.80, 0.86, c[1], c[2], 0.307, 0.307, 18);
      cylX(B.dark, 3.60, 3.66, c[1], c[2], 0.307, 0.307, 18);
      plate(M, [rad(-0.52, 1.03, a, 0, MZ), rad(0.30, 1.03, a, 0, MZ), rad(-0.05, 1.55, a, 0, MZ), rad(-0.45, 1.55, a, 0, MZ)], 0.03);
      bar(B.dark, rad(0.83, R, a, 0, MZ), rad(0.83, 0.47, a, 0, MZ), 0.04);
      bar(B.dark, rad(3.63, R, a, 0, MZ), rad(3.63, 0.47, a, 0, MZ), 0.04);
    }
  }

  function s200(THREE, M, C) {
    var T = mats(THREE, C, SV.P, SV.Q), g = new THREE.Group(), BB = binsM(T), HB = binsM(T), EB = binsM(T);
    s200Base(BB); flush(THREE, g, BB);
    var tur = group(THREE, "turret", 0, 0, SV.RING);
    s200Housing(HB); flush(THREE, tur, HB);
    var pe = group(THREE, "podelev", SV.PIVX, 0, SV.PIVZ - SV.RING);
    pe.userData.el = SV.EL;
    pe.userData.cells = [[SV.NOSE, 0, SV.MZ, SV.TAILX]];
    s200Beam(EB); flush(THREE, pe, EB);
    tur.add(pe); g.add(tur);
    return g;
  }

  /* ======================================================= PONGAE-5 (KN-06): the 6x6 launcher */
  /* Stations scaled off [K1] (a front-left three-quarter view) by a projective fit along the near side:
     the tyre heights give the depth, the 1.32 m rear bogie spacing the scale (see the header).
     Origin at mid-length; the front axle at x = 4.75. */
  var PG = {
    P: { base: "#4a523c", blots: ["#414a35", "#565e46"], seed: 6066 },
    Q: { base: "#b4babc", blots: ["#a7adaf", "#c2c8ca"], seed: 6076 },
    AX: [4.75, -1.05, -2.37], RT: 0.60, TY: 1.02, TW: 0.20,
    BUMP: 6.22, CAB0: 4.15, BOX0: 1.80, BOX1: 4.05, BODY0: -5.55, CT: -6.21, CL: 8.01,
    W: 1.25, DECK: 2.63, CZ: 0.60, CR: 0.60, CY: 0.62
  };
  function tyre(W) {
    var BODY = [0.15, 0.155, 0.15], RIM = [0.30, 0.33, 0.27], HUB = [0.18, 0.19, 0.17], s, y, i, a, R = PG.RT;
    for (s = -1; s <= 1; s += 2) {
      y = s * PG.TY;
      W.col = BODY; cylY(W, 0, y - PG.TW, y + PG.TW, 0, R - 0.03, 24);
      cylY(W, 0, y - PG.TW + 0.03, y + PG.TW - 0.03, 0, R, 24);
      /* tread lugs across the crown */
      for (i = 0; i < 22; i++) {
        a = i / 22 * TAU;
        slab(W, [Math.cos(a) * (R - 0.005), y + (i % 2 ? 0.06 : -0.06), Math.sin(a) * (R - 0.005)], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.025, 0.11, 0.045);
      }
      W.col = RIM; cyl(W, [0, y + s * PG.TW, 0], [0, y + s * (PG.TW + 0.01), 0], 0.36, 0.30, 18);
      W.col = HUB; cylY(W, 0, y + s * (PG.TW + 0.01), y + s * (PG.TW + 0.07), 0, 0.15, 14);
      for (i = 0; i < 8; i++) { a = i / 8 * TAU; cylY(W, Math.cos(a) * 0.22, y + s * (PG.TW + 0.005), y + s * (PG.TW + 0.03), Math.sin(a) * 0.22, 0.025, 6); }
    }
  }
  /* the cab-over cab ([K1]: a KamAZ-65115-pattern cab, the Taebaeksan-96) */
  function pgCab(B) {
    var s, i, y, x, W = PG.W - 0.03, F = PG.BUMP - 0.10, C0 = PG.CAB0;
    prismY(B.paint, [[C0, 1.40], [F, 1.40], [F + 0.02, 2.22], [F - 0.08, 2.86], [F - 0.28, 3.06], [C0, 3.09]], -W, W);
    box(B.paint, C0 + 0.05, F - 0.30, -W + 0.08, W - 0.08, 3.06, 3.13);        /* roof crown */
    box(B.paint, 5.36, F, -W, W, 0.96, 1.40);                                      /* apron ahead of the wheels */
    /* windscreen, wipers, the grille, the face's lower panel */
    var wa = Math.atan2(0.10, 0.64);
    slab(B.glass, [F - 0.03 + 0.012, 0, 2.54], [Math.sin(wa), 0, Math.cos(wa)], [0, 1, 0], [Math.cos(wa), 0, -Math.sin(wa)], 0.27, W - 0.10, 0.012);
    for (i = -1; i <= 1; i++) bar(B.dark, [F + 0.02, i * 0.70 - 0.30, 2.27], [F + 0.02, i * 0.70 + 0.25, 2.33], 0.012);
    box(B.dark, F, F + 0.03, -0.98, 0.98, 1.62, 2.14);
    for (i = 0; i < 6; i++) box(B.paint, F + 0.02, F + 0.05, -0.96, 0.96, 1.66 + i * 0.08, 1.70 + i * 0.08);
    box(B.paint, F + 0.01, F + 0.06, -0.06, 0.06, 1.62, 2.14);
    box(B.paint, F, F + 0.03, -W, W, 2.14, 2.22);
    box(B.dark, F, F + 0.025, -0.80, 0.80, 1.20, 1.50);
    box(B.paint, F + 0.01, F + 0.035, -0.10, 0.10, 2.16, 2.20);                    /* the maker's badge plate (blank) */
    /* the bumper (light grey, [K1]), its lamps, the tow hooks */
    box(B.metal, PG.BUMP - 0.22, PG.BUMP, -W, W, 0.77, 1.20);
    box(B.dark, PG.BUMP - 0.02, PG.BUMP + 0.005, -0.50, 0.50, 0.88, 0.96);
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.92;
      box(B.kit, PG.BUMP - 0.01, PG.BUMP + 0.02, y - 0.17, y + 0.17, 1.00, 1.14);    /* headlamp */
      B.kit.col = AMBER; box(B.kit, PG.BUMP - 0.01, PG.BUMP + 0.02, s * 0.58, s * 0.70, 1.00, 1.12); B.kit.col = LENS;
      box(B.kit, PG.BUMP - 0.01, PG.BUMP + 0.02, s * 0.30, s * 0.45, 0.82, 0.90);    /* fog lamp */
      B.kit.col = AMBER; box(B.kit, F - 0.02, F + 0.03, s * (W - 0.12), s * W, 2.00, 2.10); B.kit.col = LENS;
      /* tow hook loop under the bumper */
      poly(B.dark, [[PG.BUMP - 0.10, s * 0.62, 0.78], [PG.BUMP + 0.02, s * 0.62, 0.62], [PG.BUMP + 0.02, s * 0.62, 0.50], [PG.BUMP - 0.10, s * 0.62, 0.45]], 0.025);
      /* the door: seam, window, handle, steps; the mirrors on their arms */
      var Y = s * W;
      box(B.dark, 4.45, 4.48, Y, Y + s * 0.01, 1.42, 2.85);
      box(B.dark, 5.82, 5.85, Y, Y + s * 0.01, 1.42, 2.20);
      box(B.glass, 4.55, 5.80, Y, Y + s * 0.012, 2.22, 2.82);
      box(B.dark, 4.55, 5.80, Y, Y + s * 0.008, 2.18, 2.22);
      box(B.dark, 4.62, 4.80, Y, Y + s * 0.04, 1.98, 2.02);
      box(B.paint, 4.95, 5.55, Y - s * 0.05, Y + s * 0.06, 1.05, 1.09);
      box(B.paint, 4.95, 5.55, Y - s * 0.05, Y + s * 0.06, 0.72, 0.76);
      for (i = 0; i < 2; i++) bar(B.dark, [4.95 + i * 0.6, Y + s * 0.03, 0.70], [4.95 + i * 0.6, Y + s * 0.03, 1.40], 0.015);
      poly(B.dark, [[F - 0.10, Y, 2.78], [F + 0.05, Y + s * 0.18, 2.84], [F + 0.06, Y + s * 0.30, 2.84]], 0.018);
      bar(B.dark, [F - 0.10, Y, 2.30], [F + 0.06, Y + s * 0.30, 2.36], 0.016);
      box(B.dark, F + 0.02, F + 0.10, Y + s * 0.26, Y + s * 0.42, 2.30, 2.90);
      box(B.glass, F + 0.10, F + 0.11, Y + s * 0.27, Y + s * 0.41, 2.33, 2.87);
      box(B.dark, F + 0.03, F + 0.10, Y + s * 0.22, Y + s * 0.36, 2.06, 2.26);
      /* the front fender round the wheel, its mud flap */
      for (i = 0; i < 7; i++) {
        var a0 = 0.15 + i / 7 * (Math.PI - 0.30), a1 = 0.15 + (i + 1) / 7 * (Math.PI - 0.30), r = PG.RT + 0.12;
        belt(B.paint, PG.AX[0] + Math.cos(a0) * r, PG.RT + Math.sin(a0) * r, PG.AX[0] + Math.cos(a1) * r, PG.RT + Math.sin(a1) * r, s * 0.84, s * W, 0.04);
      }
      box(B.dark, PG.AX[0] - 0.80, PG.AX[0] - 0.77, s * 0.82, s * 1.20, 0.30, 1.05);
    }
    box(B.dark, C0 - 0.02, C0, -W, W, 1.42, 3.05);                                 /* cab rear wall seam */
    B.kit.col = AMBER;
    box(B.kit, 5.55, 5.75, -0.10, 0.10, 3.13, 3.20);                             /* roof marker lamp */
    B.kit.col = LENS;
    box(B.team, 4.40, 5.00, 0.55, 0.75, 3.13, 3.142);
    box(B.team, 4.40, 5.00, -0.75, -0.55, 3.13, 3.142);
  }
  /* the control cabin behind the cab ([K1]): door with a porthole, ladder, extinguisher, lamps, aerial */
  function pgBox(B) {
    var X0 = PG.BOX0, X1 = PG.BOX1, W = PG.W, ZT = 3.80, ZB = 1.25, s, i, x, z;
    box(B.paint, X0, X1, -W, W, ZB, ZT);
    box(B.paint, X0 + 0.05, X1 - 0.05, -W + 0.05, W - 0.05, ZT, ZT + 0.06);
    for (s = -1; s <= 1; s += 2) {
      /* corner posts and drip rail */
      box(B.paint, X1 - 0.06, X1 + 0.02, s * W - 0.04, s * W + 0.04, ZB, ZT);
      box(B.paint, X0 - 0.02, X0 + 0.06, s * W - 0.04, s * W + 0.04, ZB, ZT);
      box(B.paint, X0, X1, s * W, s * (W + 0.03), ZT - 0.06, ZT - 0.02);
      /* amber lamps at the top corners, front and rear [K1] */
      B.kit.col = AMBER;
      cylX(B.kit, X1, X1 + 0.05, s * (W - 0.20), ZT - 0.18, 0.06, 0.06, 10);
      cylY(B.kit, X0 + 0.20, s * W, s * (W + 0.05), ZT - 0.18, 0.06, 10);
      B.kit.col = LENS;
      /* the underframe and skirt */
      box(B.dark, X0, X1, s * (W - 0.10), s * W, ZB - 0.10, ZB);
      /* side panels: two louvred inspection doors low down (both sides) */
      for (i = 0; i < 2; i++) {
        x = X1 - 0.70 - i * 0.70;
        box(B.paint, x - 0.30, x + 0.30, s * W, s * (W + 0.02), ZB + 0.15, ZB + 0.75);
        for (z = 0; z < 3; z++) box(B.dark, x - 0.22, x + 0.22, s * (W + 0.02), s * (W + 0.03), ZB + 0.32 + z * 0.14, ZB + 0.35 + z * 0.14);
      }
    }
    /* starboard (the side [K1] shows): the door and its porthole, hinges, handle; the ladder; the extinguisher */
    var Y = -W;
    box(B.paint, X0 + 0.15, X0 + 1.05, Y - 0.02, Y, ZB + 0.20, ZT - 0.40);
    box(B.dark, X0 + 0.12, X0 + 0.15, Y - 0.025, Y, ZB + 0.20, ZT - 0.40);
    box(B.dark, X0 + 1.05, X0 + 1.08, Y - 0.025, Y, ZB + 0.20, ZT - 0.40);
    cylY(B.paint, X0 + 0.60, Y - 0.05, Y, ZT - 0.80, 0.19, 18);
    cylY(B.glass, X0 + 0.60, Y - 0.055, Y - 0.04, ZT - 0.80, 0.15, 18);
    for (i = 0; i < 2; i++) box(B.dark, X0 + 1.02, X0 + 1.12, Y - 0.06, Y, ZB + 0.55 + i * 1.3, ZB + 0.70 + i * 1.3);
    box(B.dark, X0 + 0.20, X0 + 0.25, Y - 0.07, Y, ZB + 1.10, ZB + 1.35);
    for (i = 0; i < 2; i++) bar(B.dark, [X0 + 0.02 + i * 0.30, Y - 0.10, ZB - 0.40], [X0 + 0.02 + i * 0.30, Y - 0.10, ZT + 0.05], 0.018);
    for (i = 0; i < 12; i++) bar(B.dark, [X0 + 0.02, Y - 0.10, ZB - 0.30 + i * 0.30], [X0 + 0.32, Y - 0.10, ZB - 0.30 + i * 0.30], 0.012);
    B.kit.col = RED;
    cylZ(B.kit, X1 - 0.25, Y - 0.09, ZT - 1.45, ZT - 0.85, 0.075, 12);
    cylZ(B.kit, X1 - 0.25, Y - 0.09, ZT - 0.85, ZT - 0.78, 0.03, 8);
    B.kit.col = LENS;
    box(B.dark, X1 - 0.33, X1 - 0.17, Y - 0.02, Y, ZT - 1.30, ZT - 1.25);
    box(B.dark, X1 - 0.33, X1 - 0.17, Y - 0.02, Y, ZT - 0.95, ZT - 0.90);
    /* roof: the aerial base and whip, a vent, the team strip */
    cylZ(B.dark, X0 + 0.30, -W + 0.25, ZT + 0.06, ZT + 0.20, 0.07, 10);
    cylZ(B.dark, X0 + 0.30, -W + 0.25, ZT + 0.20, ZT + 1.30, 0.012, 5);
    box(B.paint, X1 - 0.80, X1 - 0.30, 0.30, 0.80, ZT + 0.06, ZT + 0.18);
    box(B.dark, X1 - 0.78, X1 - 0.32, 0.32, 0.78, ZT + 0.18, ZT + 0.19);
    box(B.team, X0 + 0.70, X0 + 1.40, 0.45, 0.65, ZT + 0.06, ZT + 0.072);
    box(B.team, X0 + 0.70, X0 + 1.40, -0.65, -0.45, ZT + 0.06, ZT + 0.072);
  }
  /* the locker body, its arch over the rear bogie, the canister saddles, the hinge, jacks and chassis */
  function pgBody(B) {
    var W = PG.W - 0.05, X0 = PG.BODY0, X1 = PG.BOX0, D = PG.DECK, s, i, k, x, y, z, ZA = 1.75;
    var A0 = PG.AX[2] - 0.78, A1 = PG.AX[1] + 1.10;          /* the arch over the rear bogie */
    box(B.paint, X0, X1, -W, W, ZA, D);
    box(B.paint, A1, X1, -W, W, 1.00, ZA);
    box(B.paint, X0, A0, -W, W, 1.00, ZA);
    box(B.paint, X0 - 0.02, X1, -PG.W, PG.W, D, D + 0.04);                        /* deck plate and lip */
    for (s = -1; s <= 1; s += 2) {
      y = s * W;
      /* locker doors: louvred, two latches, hinge line on top ([K1]) */
      var door = function (xa, xb, za, zb) {
        box(B.paint, xa + 0.02, xb - 0.02, y, y + s * 0.025, za + 0.03, zb - 0.03);
        for (k = 0; k < 3; k++) { z = za + (zb - za) * (0.30 + k * 0.22); box(B.dark, xa + 0.10, xb - 0.10, y + s * 0.025, y + s * 0.035, z, z + 0.025); }
        box(B.dark, xa + 0.05, xa + 0.11, y + s * 0.02, y + s * 0.05, zb - 0.12, zb - 0.06);
        box(B.dark, xb - 0.11, xb - 0.05, y + s * 0.02, y + s * 0.05, zb - 0.12, zb - 0.06);
        box(B.dark, xa, xa + 0.02, y, y + s * 0.03, za, zb);
      };
      var n = 10, L = (X1 - X0) / n;
      for (i = 0; i < n; i++) door(X0 + i * L, X0 + (i + 1) * L, ZA, D);
      L = (X1 - A1) / 3; for (i = 0; i < 3; i++) door(A1 + i * L, A1 + (i + 1) * L, 1.02, ZA);
      L = (A0 - X0) / 3; for (i = 0; i < 3; i++) door(X0 + i * L, X0 + (i + 1) * L, 1.02, ZA);
      /* the arch's edge and the mud flap behind the bogie */
      box(B.paint, A0, A1, y - s * 0.02, y + s * 0.04, ZA - 0.05, ZA);
      box(B.paint, A0 - 0.05, A0, y - s * 0.02, y + s * 0.04, 1.00, ZA);
      box(B.paint, A1, A1 + 0.05, y - s * 0.02, y + s * 0.04, 1.00, ZA);
      box(B.dark, A0 + 0.02, A0 + 0.05, s * 0.80, s * 1.18, 0.28, 1.00);
      /* reflectors along the foot, the step at the arch */
      B.kit.col = AMBER;
      for (i = 0; i < 4; i++) box(B.kit, X0 + 0.5 + i * 2.0, X0 + 0.6 + i * 2.0, y + s * 0.03, y + s * 0.045, 1.08, 1.14);
      B.kit.col = LENS;
      /* the hinge brackets at the rear of the deck */
      box(B.paint, X0 - 0.65, X0 + 0.10, s * 0.48, s * 0.70, D - 0.40, D + 0.12);
      box(B.paint, X0 - 0.65, X0 + 0.10, s * 0.48, s * 0.70, D - 0.40, D + 0.12);
      cylY(B.dark, PG.CT, s * 0.42, s * 0.76, D + 0.03, 0.09, 12);
    }
    /* rear face: tail lamps, the under-run bar, the rear jacks */
    box(B.paint, X0 - 0.03, X0, -W, W, 1.00, D);
    for (s = -1; s <= 1; s += 2) {
      B.kit.col = TAIL; box(B.kit, X0 - 0.06, X0 - 0.02, s * 0.85, s * 1.10, 1.10, 1.22);
      B.kit.col = AMBER; box(B.kit, X0 - 0.06, X0 - 0.02, s * 0.62, s * 0.80, 1.10, 1.22); B.kit.col = LENS;
      bar(B.dark, [X0 + 0.30, s * 0.70, 1.00], [X0 + 0.05, s * 0.70, 0.52], 0.04);
      /* the jacks behind the rear bogie and behind the front wheels ([K1]), stowed clear of the road */
      [[-3.85], [PG.AX[0] - 1.50]].forEach(function (q) {
        x = q[0];
        cylZ(B.dark, x, s * 1.05, 0.30, 1.20, 0.09, 12);
        cylZ(B.paint, x, s * 1.05, 0.95, 1.25, 0.13, 12);
        cylZ(B.dark, x, s * 1.05, 0.12, 0.30, 0.05, 8);
        cylZ(B.paint, x, s * 1.05, 0.08, 0.14, 0.30, 16);
      });
    }
    bar(B.dark, [X0 + 0.05, -1.00, 0.52], [X0 + 0.05, 1.00, 0.52], 0.05);
    /* the canister saddles on the deck */
    [-5.10, -2.20, 0.90].forEach(function (xs) {
      for (k = -1; k <= 1; k++) box(B.paint, xs - 0.10, xs + 0.10, k * PG.CY - 0.10, k * PG.CY + 0.10, D, D + (k ? 0.08 : 0.32));
      box(B.paint, xs - 0.08, xs + 0.08, -PG.W + 0.02, -PG.W + 0.20, D, D + 0.32);
      box(B.paint, xs - 0.08, xs + 0.08, PG.W - 0.20, PG.W - 0.02, D, D + 0.32);
    });
    /* chassis: frame rails, axles, differentials, springs, the battery box, air tanks and the fuel tank */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X0 + 0.10, PG.BUMP - 0.25, s * 0.42, s * 0.52, 0.82, 1.08);
      cylX(B.dark, PG.BOX0 + 0.20, PG.BOX0 + 1.60, s * 0.82, 0.92, 0.17, 0.17, 12);
      box(B.dark, PG.AX[1] - 0.95, PG.AX[2] + 0.95, s * 0.82, s * 0.92, 0.68, 0.80);
    }
    box(B.paint, PG.BOX0 + 1.70, PG.BOX0 + 2.20, -1.15, -0.62, 0.70, 1.15);
    PG.AX.forEach(function (ax) {
      cylY(B.dark, ax, -0.85, 0.85, PG.RT, 0.08, 10);
      box(B.dark, ax - 0.22, ax + 0.22, -0.25, 0.25, PG.RT - 0.22, PG.RT + 0.22);
    });
    cylX(B.dark, PG.AX[2], PG.AX[0], 0, PG.RT + 0.10, 0.05, 0.05, 8);
  }
  /* the two canisters lying on the erector, in the "podelev" frame (origin on the hinge at the tail) */
  function pgCans(B) {
    var s, i, k, x, y, M = B.metal, R = PG.CR, Z = PG.CZ;
    /* the erector frame under them */
    for (s = -1; s <= 1; s += 2) box(B.dark, 0.10, PG.CL - 0.30, s * 0.28, s * 0.40, -0.03, 0.07);
    for (i = 0; i < 5; i++) { x = 0.3 + i * 1.8; box(B.dark, x, x + 0.10, -1.05, 1.05, -0.03, 0.06); }
    for (s = -1; s <= 1; s += 2) {
      y = s * PG.CY;
      cylX(M, 0.00, 0.12, y, Z, R - 0.10, R - 0.04, 22);              /* the domed tail cover */
      cylX(M, 0.12, 2.20, y, Z, R - 0.04, R - 0.04, 24);              /* the narrower aft tube */
      cylX(M, 2.20, 2.32, y, Z, R - 0.04, R, 24);
      cylX(M, 2.32, PG.CL - 0.05, y, Z, R, R, 24);
      cylX(M, PG.CL - 0.05, PG.CL, y, Z, R + 0.02, R + 0.02, 24);    /* the front cover's flange */
      cylX(B.dark, PG.CL - 0.01, PG.CL + 0.005, y, Z, R - 0.06, R - 0.06, 20);
      /* the hoops, closer together forward ([K1]), a lifting lug on each */
      [0.40, 1.30, 2.26, 3.15, 4.05, 4.95, 5.85, 6.70, 7.45].forEach(function (xh, j) {
        var rr = (xh < 2.2 ? R - 0.04 : R) + 0.03;
        cylX(M, xh - 0.05, xh + 0.05, y, Z, rr, rr, 24);
        if (j % 2 === 1) { box(M, xh - 0.06, xh + 0.06, y - 0.05, y + 0.05, Z + rr - 0.02, Z + rr + 0.10); cylY(B.dark, xh, y - 0.06, y + 0.06, Z + rr + 0.06, 0.03, 8); }
      });
      /* the bolted fitting plate on the outer side, its rivet rows */
      slab(M, [3.70, y + s * (R - 0.02), Z + 0.12], [1, 0, 0], [0, Math.cos(0.35) * s, Math.sin(0.35)], [0, -Math.sin(0.35) * s, Math.cos(0.35)], 0.35, 0.05, 0.20);
      for (k = 0; k < 10; k++) { x = 2.5 + k * 0.5; cyl(B.dark, rad(x, R - 0.01, s > 0 ? 0.6 : Math.PI - 0.6, y, Z), rad(x, R + 0.012, s > 0 ? 0.6 : Math.PI - 0.6, y, Z), 0.018, 0.018, 6); }
      /* the cable run along the top */
      cylX(B.dark, 2.40, 7.30, y, Z + R + 0.035, 0.025, 0.025, 6);
    }
  }
  function pongae(THREE, M, C) {
    var T = mats(THREE, C, PG.P, PG.Q), g = new THREE.Group(), HB = binsM(T), EB = binsM(T), i, wg, W;
    HB.kit.col = LENS;
    pgCab(HB); pgBox(HB); pgBody(HB);
    flush(THREE, g, HB);
    for (i = 0; i < PG.AX.length; i++) {
      W = new Bin(T.wheel, false, true); tyre(W);
      wg = group(THREE, "roadwheel", PG.AX[i], 0, PG.RT); flush(THREE, wg, { wheel: W }); g.add(wg);
    }
    var pe = group(THREE, "podelev", PG.CT, 0, PG.DECK + 0.03);
    pe.userData.el = Math.PI / 2;
    pe.userData.cells = [[PG.CL, PG.CY, PG.CZ, 0], [PG.CL, -PG.CY, PG.CZ, 0]];
    pgCans(EB); flush(THREE, pe, EB);
    g.add(pe);
    return g;
  }

  return { s200: s200, pongae: pongae };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of each build (tools/model3d/dump.js). */
UNIT_MODELS["kpa_e80_sam"] = { len: 12.18, build: HeroKpaLaunchers.s200 };
UNIT_MODELS["kpa_e00_sam"] = { len: 12.56, build: HeroKpaLaunchers.pongae };
UNIT_MODELS["sam_k"] = { len: 12.56, build: HeroKpaLaunchers.pongae };
/* pla_e80_sam: the HQ-2 stand-in pla_e60_sam draws (see the header) */
if (typeof HeroS75S125 !== "undefined" && typeof HeroS75S125.sm63 === "function") {
  UNIT_MODELS["pla_e80_sam"] = { len: 10.39, build: function (THREE, M, C) { return HeroS75S125.sm63(THREE, C); } };
}
/* held, rule 1 (see the header for the searches):
   UNIT_MODELS["kpa_e00_mlrs"] = ...;   KN-09: no reference found.
   UNIT_MODELS["tel_k"] = ...;          KN-23 tracked TEL: no reference found.
   UNIT_MODELS["atgmv_k"] = ...;        Bulsae-4: no reference found. */
