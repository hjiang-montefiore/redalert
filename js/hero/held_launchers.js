/* ===== held_launchers.js - HERO models for four rows held in earlier rounds ("no reference found") =====
   Held-rows retry (2026-11-12) with the newly reachable sources: ko/zh/ja.wikipedia and the US Army TRADOC
   Worldwide Equipment Guide (ODIN, odin.tradoc.army.mil, served from odin.t2com.army.mil).  The wikis gave
   nothing new; the WEG cards carry photographs of four of the five rows.
     ROW            VEHICLE                                              HOW
     kpa_e00_mlrs   KN-09 (M2010) 300 mm guided MLRS, 8 tubes, 6x6     NEW  kn09    (no hero draws this truck)
     atgmv_k        Bulsae-4 (M-2018) ATGM carrier, 6x6 M2010 hull      NEW  bulsae  (ru_btr8x8.js draws only the
                                                                        four-axle BTRs; this hull has three)
     atgmv_c        AFT-10: HJ-10 launcher on the ZBD-04A               REUSED HeroZbd04.build (js/hero/pla_zbd04.js)
                                                                        for hull, tracks and wheels, its IFV turret
                                                                        taken off; NEW launcher (aft10)
     ewv_c          CHL-906 jammer on its 8x8 truck                     NEW  chl906
   HELD (left on js/tel3d.js's model; registration commented out at the foot):
     tel_k          KN-23 / Hwasong-11Ga TRACKED TEL.  The WEG's KN-23 card shows the 8x8 WHEELED TEL (a parade-ground
                    side view, a good reference for a wheeled row, not this one), a launch photograph cut off at the
                    deck (no running gear) and a missile drawing.  Nothing shows the tracked launcher's tracks.

   SOURCES AND WHOSE WORK THEY ARE.  The images are on the WEG cards (US Army TRADOC), but each card's "Image
   Sources" field credits them to other publishers - mostly North Korean (KCNA) and Chinese state-media
   photographs - so they are NOT US-government public-domain work.  They were used only to measure and draw
   from.  No image is copied into the repo.  Cached in scratchpad held_tel/ref/.
     [N1-N4]  WEG "KN-09 North Korean 300mm Rocket Artillery System" (card id 4b1fef7427ecce027aee2ad36d9ddf19).
              Credited to armyrecognition.com, reddit r/MilitaryPorn and defence-blog.com.
              N1 two launchers on parade, front-left three-quarters (the measuring photo; the right-hand truck);
              N2 a column on parade, head-on (cab face, grille, guard post, the 4 x 2 tube caps); N3 and N4 firing,
              from the side: the pack raised about 50 deg, firing forward over the cab.
     [B1-B5]  WEG "Bulsae 4 (M-2018) North Korean 6x6 Anti-Tank Guided Missile (ATGM) Combat Vehicle"
              (02cad1626d206c9df953369faba2e4c9).  Credited to nknews.org, x.com/front_ukrainian, odessa-journal.com
              and the War Thunder forum.  B1 front-right three-quarters, night parade (hull, lamps, door,
              housing, sights, smoke dischargers, the raised hood over 8 orange caps); B2 head-on (the 4 x 2 caps,
              windscreens, the centre lamp); B3 three launchers on parade, near side-on (the axle spacing);
              B4 firing, the block raised; B5 a parade column from the front.
              [B0] the card's text: length 7.65 m, width 2.9 m, 14.2 t, an M-2010 6x6 "essentially a shorter BTR-80
              with the second set of wheels removed", 8 containers on a rotary launcher, smoke grenade launchers
              either side of the turret.
     [A1-A3]  WEG "Red Arrow AFT-10 Chinese Anti-Tank Guided Missile Carrier" (9fb74cd13b52abfaf06b15043061299f).
              Credited to sturgeonshouse.ipbhost.com, militarytoday.com and chinadefense.sastind.gov.cn.
              A1 2015 Beijing parade, near (starboard) side, pods stowed: THE MEASURING PHOTO; A2 port side, pods
              raised about 15 deg and the sensor mast extended; A3 rear-left, raised: two pods of 2 x 2 canisters
              either side of the mast.  [A0] the card's text: carrier 7.52 x 3.4 x 2.7 m, 24 t, eight canisters,
              a mast-mounted TV/IR sight, "a bank of seven ... smoke grenade launchers mounted in front of the
              canister turret", engine front right.
     [C1]     WEG "CHL-906 Chinese Surface-to-Air Electronic Jamming System" (77e8b992ae585dfe506aa1ce7aab807e).
              Credited to defensetalks.com, tacticalreport.com and defensa.com.  One photograph, starboard side
              from a little ahead, deployed: the 8x8 forward-control truck, the shelter with three ladders down the
              side, the tall telescopic mast at the shelter's front, the curved reflector on its arm over the
              middle with log-periodic arrays at its head.  The card gives no dimensions (all "INA").
     Searched and empty this round: ko.wikipedia "KN-09" (its one photo is a Russian 9A52-2 Smerch, Commons
     "Army2016demo-067.jpg"), "Hwasong-11Ga-hyeong" (in Hangul) (Russian Iskander photos and the KN-23 diagram), "Bulsae" (Hangul), "daegugyeong bangsapo" (large-calibre MRL, Hangul),
     "KPA Ground Force" (Hangul); zh.wikipedia "Hongjian-10 anti-tank missile" (Chinese title) (the round only), "ZBD-04 IFV" (Chinese title) (63 images: the IFV, no
     AFT-10), "CHL-906", "communications jamming vehicle", "EW vehicle" (both Chinese), "KN-23"; ja.wikipedia "KN-23" (two missile diagrams),
     "KN-09"; en.wikipedia "Bulsae-4", "KN-09 (multiple rocket launcher)", "Hwasong-11A" (no new images);
     Commons file and category search "CHL-906", "jammer Zhuhai Airshow", "electronic warfare vehicle China".

   ---------------------------------------------------------------- KN-09 (kpa_e00_mlrs)
   Measured off N1 (right-hand truck): the near front tyre 36 px high, taken as 1.20 m (NOT published; a
     14.00-20 class tyre) -> 30 px a metre at the front axle; the side runs off at about 33 deg, so lengths
     along it are read at 0.84 of that.  Front axle to the tandem's first axle 5.0 m, tandem 1.40 m; cab face
     1.40 m ahead of the front axle, cab 2.15 m deep, roof 3.15 m; frame end 0.8 m behind the last axle;
     tubes about 6.4 m long, their muzzles just behind the cab; two rows of four (N2).
   The model: 9.04 m (bumper to tube tails) x 2.54 m over the cab (3.38 m over the mirrors) x 3.53 m to the pack's
     top (5.27 m to the cab whip).  No published length, width or height (the WEG card gives "INA").
   Recognition list: the square cab-over cab with its big two-pane windscreen and slatted grille, the centre
     guard post (N1, N2); three axles, the long gap to the rear tandem (N1); the lockers under the deck (N1);
     two rows of four long tubes banded together on a cradle on a slewing base over the tandem (N1, N2);
     the tube caps in a 4 x 2 block seen head-on (N2); jacks at the deck corners.
   Nodes: "turret" (the slewing base over the tandem); in it "podelev" (the tube pack, hinged at its tail,
     level at rest, userData.el 50 deg from N3/N4; cells at the eight muzzles, top row first).  No `ord`.
   NOT CONFIRMED: every length (scaled from an assumed tyre); the tube length and diameter (0.49 m drawn);
     the REST pose - N1 shows the pack tilted up about 20 deg on parade, drawn level at rest by the podelev
     rule; the slewing base and rams (hidden in N1); the far side (mirrored); the rear end; the cab interior.

   ---------------------------------------------------------------- BULSAE-4 (atgmv_k)
   Measured: the hull to [B0]'s 7.65 x 2.9 m; the axles off B3 (front tyre 60 px for 1.10 m): front to middle
     130 px, middle to rear 60 px, foreshortened alike - the ratio 2.2 matches the BTR-80's 3.05 / 1.35 m with
     the second axle out, so 3.00 and 1.35 m are drawn.  Roof 1.95 m (the BTR-80's); the launcher housing on
     the roof aft of the middle, the hood's top 2.3 m over the roof (B1: 330 px over a 280 px hull side).
   The model: 7.77 m (tow hooks; hull 7.65) x 2.96 m (over the strakes; hull 2.90) x 4.04 m to the hood (4.62 m
     to the whips).  Published 7.65 x 2.9 m, height not given.
   Recognition list: the BTR boat hull with the wedge nose and the long upper glacis, two windscreens with raised
     armoured covers, the lamps on posts at the glacis corners and a big centre lamp (B1, B2); three axles, one
     forward and a close pair aft (B3); the side door between the first two axles (B1); the faceted housing,
     its sights on posts at the front corners, three smoke dischargers a side (B1, B2); the 4 x 2 block of
     orange-capped canisters under a raised hood (B1, B2, B5); two tall whips aft (B1).
   Nodes: "turret" (the housing); in it "podelev" (the canister block and the hood, hinged at the block's rear,
     userData.el 0.55 rad, about 32 deg, from B4; cells at the eight caps).  No `ord`.
   Paint: plain KPA olive.  B1/B4/B5 show the 2020 parade sand camouflage, B3 plain green: green drawn, no
     camouflage or numbers.  The orange caps are drawn (B1, B2, B5 all show them).
   NOT CONFIRMED: the hull detail is BTR-80 practice where the photos are dark (rear deck, stern, belly); the
     hood's exact shape and its struts; the housing's rear; the raised angle; the port side (mirrored).

   ---------------------------------------------------------------- AFT-10 (atgmv_c)
   Measured off A1: the ZBD-04A hull's 7.24 m spans 500 px (69 px a metre): the pod stack 2.9 m long and
     0.83 m high in two rows, its foot 0.6 m over the roof, its tail 0.7 m ahead of the stern; A3: two pods of
     2 x 2 canisters with the mast between them.
   The model: 7.28 x 3.25 x 3.58 m (to the sensor head; pods 3.42 m).  [A0] gives 7.52 x 3.4 x 2.7 m: the
     length and width are the reused ZBD-04A hull's (its own header: 7.2 x 3.2 m published); 2.7 m cannot hold
     A1's pods 0.6 m over a 1.98 m roof - read as the hull height, not the launcher's.
   Recognition list: the ZBD-04A hull and running gear (reused); two long ribbed pods of four canisters on a low
     pedestal aft of the middle (A1, A2, A3); the sensor mast between them with its EO head (A1-A3); the bank
     of seven smoke dischargers ahead of the mount [A0].
   Nodes: the hull's six "roadwheel" groups (HeroZbd04); "turret" on the hull's own ring (x -0.75, roof 1.98);
     in it "podelev" (both pods, hinged at their tails, userData.el 0.30 rad, about 17 deg, from A2; cells at the
     eight mouths).  The mast is drawn retracted (A1) on the turret.  No `ord`.
   Paint: the ZBD-04A's own PLA green (#56613a, the hull module's); A1-A3 show digital camouflage, not drawn.
   NOT CONFIRMED: whether the AFT-10's hull differs from the IFV's (none seen at this resolution); the pedestal
     and rams (hidden); the mast's stowed height; the smoke bank's place (text only); the pods' far faces.

   ---------------------------------------------------------------- CHL-906 (ewv_c)
   Measured off C1: the front tyre, 50 px high, taken as 1.25 m (NOT published; a 14.00R20-class tyre) gives
     41.7 px a metre upright; the cab's face shows the side turned about 32 deg, so lengths along it are read at
     35.4 px a metre.  Axles 1.75, 4.10 and 1.45 m apart (the last spacing hidden by ladders: assumed), cab face
     1.45 m ahead of the front axle, cab 2.25 m deep, roof 3.70 m with the rack to 4.25 m; shelter 8.0 m long,
     1.62 to 3.60 m high; the mast's foot 1.15 m behind the shelter's front, its head 9.7 m up; the reflector
     arm's foot 3.6 m behind the shelter's front, its head 6.7 m up and 1.7 m further aft.
   The model: 10.89 m (bumper to tail) x 2.50 m body (3.85 m over the ladders' feet) x 9.72 m to the mast's top.
     No published figures (the card's dimensions are all "INA"; armour_specs.js's 8 x 2.6 x 3.3 m 6x6 was
     not taken from a photo: C1 shows four axles).
   Recognition list: the tall forward-control cab with the big windscreen, the barred grille and bull bar, the
     roof rack (C1); four axles, two forward and a pair aft (C1); the long shelter with corner posts, a louvred
     vent, three ladders down the side, the rail round the rear roof (C1); the tall telescopic mast at the
     shelter's front with its raking struts, the small dish and the head (C1); the curved reflector on its
     hinged arm with the log-periodic arrays at its head (C1).
   Nodes: four "roadwheel" axle groups; "turret" = the reflector's turntable and arm (the row trains, tturn 0.9),
     its face along +X.  The mast stands fixed, erected as in C1 (the old model also drew it raised).
   Paint: plain PLA green; C1 shows desert digital camouflage and a placard: neither drawn.
   NOT CONFIRMED: the tyre size and so every dimension; the rear tandem spacing; the port side (mirrored, no
     ladders drawn there); the reflector's width and curvature (seen edge-on in C1); the arrays at its head;
     the travel pose (not photographed - the old model was also drawn deployed).

   LOAD ORDER: after js/units3d.js and js/units3d_ew.js (whose atgmv_c and ewv_c this replaces), after the
     files registering kpa_e00_mlrs and atgmv_k's generic models (js/armour_specs.js / js/units3d.js), and after
     js/hero/pla_zbd04.js (HeroZbd04; atgmv_c is registered only if it is loaded).  Tested loaded last, after
     js/hero/held_ships.js.
   ENGINE (js/damage3d.js, not edited): atgmv_c's role tankdestroyer defaults to "rear", but the ZBD-04A's engine is
     front right ([A0], and pla_zbd04.js) - it needs ENGINE_AT atgmv_c: "front".  atgmv_k ("rear", the BTR-80
     pattern's engine aft), kpa_e00_mlrs and ewv_c ("front", under the cab) are right by default.
   Materials (one mesh per material per group): paint (the detail canvas texture), metal (the tubes, canisters,
     pods and reflector, their own canvas texture), dark, glass, kit (vertex-coloured lamps, lenses, caps),
     wheel (vertex colours), C.team (small roof strips).  +X nose, +Y port, +Z up, metres, ground at z 0.
     ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHeldLaunchers = (function () {
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
  var ORANGE = [0.86, 0.42, 0.10], OPTIC = [0.10, 0.13, 0.16];

  /* ------------------------------------------------------------ shared: a truck or APC tyre pair
     R radius, TY half track to the tyre middle, TW half tread width, lugs across the crown, a rim, a hub
     and its studs.  Built round the axle (local Y), both sides in one bin. */
  function tyrePair(W, R, TY, TW, rimR, lugs) {
    var BODY = [0.15, 0.155, 0.15], RIM = [0.30, 0.33, 0.27], HUB = [0.18, 0.19, 0.17], s, y, i, a, n = lugs || 22;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = BODY; cylY(W, 0, y - TW, y + TW, 0, R - 0.035, 24);
      cylY(W, 0, y - TW + 0.035, y + TW - 0.035, 0, R, 24);
      for (i = 0; i < n; i++) {
        a = i / n * TAU;
        slab(W, [Math.cos(a) * (R - 0.005), y + (i % 2 ? 0.055 : -0.055), Math.sin(a) * (R - 0.005)], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.024, TW * 0.55, 0.045);
      }
      W.col = RIM; cyl(W, [0, y + s * TW, 0], [0, y + s * (TW + 0.012), 0], rimR, rimR * 0.82, 18);
      W.col = HUB; cylY(W, 0, y + s * (TW + 0.012), y + s * (TW + 0.07), 0, rimR * 0.42, 14);
      for (i = 0; i < 8; i++) { a = i / 8 * TAU; cylY(W, Math.cos(a) * rimR * 0.62, y + s * (TW + 0.006), y + s * (TW + 0.03), Math.sin(a) * rimR * 0.62, 0.022, 6); }
    }
  }
  function wheels(THREE, g, T, AX, R, TY, TW, rimR, lugs) {
    for (var i = 0; i < AX.length; i++) {
      var W = new Bin(T.wheel, false, true); tyrePair(W, R, TY, TW, rimR, lugs);
      var wg = group(THREE, "roadwheel", AX[i], 0, R); flush(THREE, wg, { wheel: W }); g.add(wg);
    }
  }
  /* a fender arc of n belts over a wheel at x, radius r, from y0 to y1 */
  function fender(bin, x, zc, r, y0, y1, a0, a1, n) {
    for (var i = 0; i < n; i++) {
      var p = a0 + i / n * (a1 - a0), q = a0 + (i + 1) / n * (a1 - a0);
      belt(bin, x + Math.cos(p) * r, zc + Math.sin(p) * r, x + Math.cos(q) * r, zc + Math.sin(q) * r, y0, y1, 0.035);
    }
  }
  /* a ladder of two stiles and rungs from A to B, rungs across Y half width hw */
  function ladder(bin, A, B, hw, n) {
    var s, i, t;
    for (s = -1; s <= 1; s += 2) bar(bin, [A[0], A[1] + s * hw, A[2]], [B[0], B[1] + s * hw, B[2]], 0.02);
    for (i = 0; i <= n; i++) {
      t = i / n;
      bar(bin, [A[0] + (B[0] - A[0]) * t, A[1] - hw, A[2] + (B[2] - A[2]) * t], [A[0] + (B[0] - A[0]) * t, A[1] + hw, A[2] + (B[2] - A[2]) * t], 0.014);
    }
  }
  /* a guard rail along a polyline at height h over it: posts every ~0.6 m, a top rail and a mid rail */
  function rail(bin, P, h) {
    var i, k, n, A, B, t;
    for (i = 0; i + 1 < P.length; i++) {
      A = P[i]; B = P[i + 1];
      n = Math.max(1, Math.round(Math.sqrt(dot(sub(B, A), sub(B, A))) / 0.6));
      for (k = 0; k <= n; k++) {
        if (k === 0 && i > 0) continue;
        t = k / n;
        bar(bin, [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2]], [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + h], 0.018);
      }
      bar(bin, [A[0], A[1], A[2] + h], [B[0], B[1], B[2] + h], 0.02);
      bar(bin, [A[0], A[1], A[2] + h * 0.5], [B[0], B[1], B[2] + h * 0.5], 0.015);
    }
  }

  /* ======================================================= KN-09 (M2010) 300 mm guided MLRS */
  /* Stations off [N1] (the right-hand launcher, a front-left three-quarter): the near front tyre (36 px
     high) taken as 1.20 m gives 30 px a metre at the front axle; the side runs off at about 33 deg, so
     lengths along it are read at 0.84 of that and the rear tandem's 30 px is 1.40 m.  Origin at the
     middle of the wheelbase, +X to the bumper. */
  var KN = {
    P: { base: "#4b5236", blots: ["#424a2f", "#575e40"], seed: 9009 },
    Q: { base: "#4e5539", blots: ["#454c32", "#5a6144"], seed: 9019 },
    AX: [2.90, -2.10, -3.50], RT: 0.60, TY: 0.98, TW: 0.19,
    FACE: 4.30, CAB0: 2.15, CABZ0: 1.18, ROOF: 3.15, W: 1.25,
    FR0: 0.95, FR1: 1.22, DECK: 1.38, REAR: -4.30,
    TX: -2.90, RING: 1.62,                    /* the slewing ring over the rear tandem */
    PX: -0.40, PZ: 0.70,                      /* the trunnion in the turret frame */
    T0: -1.00, T1: 5.40, TR: 0.245, ROWZ: [0.32, 0.82], COLY: [0.81, 0.27, -0.27, -0.81],
    EL: 50 * Math.PI / 180
  };
  function knCab(B) {
    var s, i, y, F = KN.FACE, C0 = KN.CAB0, W = KN.W, Z0 = KN.CABZ0, ZR = KN.ROOF;
    /* the HOWO-pattern cab ([N1][N2]): a tall square cab, the windscreen leaning back, a deep visor-less roof */
    prismY(B.paint, [[C0, Z0], [F, Z0], [F + 0.02, 2.12], [F - 0.14, 3.02], [F - 0.26, ZR], [C0, ZR]], -W, W);
    box(B.paint, C0 + 0.10, F - 0.40, -W + 0.10, W - 0.10, ZR, ZR + 0.10);       /* the raised roof panel */
    /* the windscreen, two panes ([N2]), its centre post and wipers */
    var wa = Math.atan2(0.16, 0.90);
    slab(B.glass, [F - 0.06 + 0.012, 0, 2.57], [Math.sin(wa), 0, Math.cos(wa)], [0, 1, 0], [Math.cos(wa), 0, -Math.sin(wa)], 0.38, W - 0.12, 0.012);
    slab(B.paint, [F - 0.06 + 0.03, 0, 2.57], [Math.sin(wa), 0, Math.cos(wa)], [0, 1, 0], [Math.cos(wa), 0, -Math.sin(wa)], 0.40, 0.04, 0.02);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [F + 0.03, s * 0.55 - 0.32, 2.22], [F + 0.03, s * 0.55 + 0.25, 2.30], 0.012);
    /* the face: the grille panel of vertical slats in a frame ([N2]), the centre guard post, the badge */
    box(B.dark, F, F + 0.03, -0.92, 0.92, 1.52, 2.08);
    for (i = 0; i < 15; i++) box(B.paint, F + 0.02, F + 0.05, -0.90 + i * 0.128, -0.87 + i * 0.128, 1.54, 2.06);
    for (s = -1; s <= 1; s += 2) box(B.paint, F + 0.02, F + 0.08, s * 0.92 - 0.04, s * 0.92 + 0.04, 1.48, 2.12);
    box(B.paint, F + 0.02, F + 0.08, -0.96, 0.96, 2.08, 2.14);
    box(B.paint, F + 0.02, F + 0.08, -0.96, 0.96, 1.46, 1.52);
    box(B.paint, F + 0.08, F + 0.14, -0.06, 0.06, 1.30, 2.10);                    /* the guard post [N2] */
    box(B.paint, F + 0.08, F + 0.14, -0.40, 0.40, 1.92, 1.98);
    /* the bumper, its lamps, the tow pin, the step plates */
    box(B.paint, F - 0.12, F + 0.14, -W - 0.02, W + 0.02, 0.86, 1.30);
    box(B.dark, F + 0.13, F + 0.15, -0.45, 0.45, 0.94, 1.02);
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.98;
      B.kit.col = LENS; box(B.kit, F + 0.13, F + 0.16, y - 0.14, y + 0.14, 1.06, 1.20);
      B.kit.col = AMBER; box(B.kit, F + 0.13, F + 0.16, s * 0.62, s * 0.74, 1.08, 1.18);
      B.kit.col = LENS; cylX(B.kit, F + 0.13, F + 0.17, s * 0.40, 0.98, 0.05, 0.05, 10);
      poly(B.dark, [[F + 0.10, s * 0.62, 0.88], [F + 0.22, s * 0.62, 0.76], [F + 0.22, s * 0.62, 0.62], [F + 0.08, s * 0.62, 0.58]], 0.025);
      /* the door: seams, the window, the handle, the step boxes, the mirror arms and mirrors */
      var Y = s * W;
      box(B.dark, C0 + 0.32, C0 + 0.35, Y, Y + s * 0.01, Z0 + 0.25, ZR - 0.10);
      box(B.dark, F - 0.42, F - 0.39, Y, Y + s * 0.01, Z0 + 0.25, 2.20);
      box(B.glass, C0 + 0.40, F - 0.42, Y, Y + s * 0.012, 2.25, 2.95);
      box(B.dark, C0 + 0.40, F - 0.42, Y, Y + s * 0.008, 2.20, 2.25);
      box(B.dark, C0 + 0.50, C0 + 0.70, Y, Y + s * 0.04, 2.02, 2.06);
      for (i = 0; i < 2; i++) box(B.paint, F - 1.05, F - 0.35, Y - s * 0.06, Y + s * 0.08, 0.70 + i * 0.34, 0.74 + i * 0.34);
      for (i = 0; i < 2; i++) bar(B.dark, [F - 1.05 + i * 0.7, Y + s * 0.04, 0.68], [F - 1.05 + i * 0.7, Y + s * 0.04, 1.20], 0.015);
      poly(B.dark, [[F - 0.20, Y, 2.85], [F - 0.05, Y + s * 0.20, 2.92], [F + 0.02, Y + s * 0.34, 2.92]], 0.018);
      bar(B.dark, [F - 0.20, Y, 2.30], [F + 0.02, Y + s * 0.34, 2.38], 0.016);
      box(B.dark, F - 0.06, F + 0.04, Y + s * 0.28, Y + s * 0.44, 2.36, 2.98);
      box(B.glass, F + 0.04, F + 0.05, Y + s * 0.29, Y + s * 0.43, 2.39, 2.95);
      /* the front fender over the wheel and its flap */
      fender(B.paint, KN.AX[0], KN.RT, KN.RT + 0.13, s * 0.78, s * (W + 0.02), 0.20, Math.PI - 0.20, 8);
      box(B.dark, KN.AX[0] - 0.80, KN.AX[0] - 0.77, s * 0.80, s * 1.18, 0.30, 1.05);
      /* amber marker lamps at the cab's top corners */
      B.kit.col = AMBER; box(B.kit, F - 0.30, F - 0.18, s * (W - 0.20), s * (W - 0.08), ZR + 0.02, ZR + 0.08);
    }
    box(B.dark, C0 - 0.02, C0, -W, W, Z0 + 0.10, ZR - 0.02);                       /* the cab's rear wall seam */
    /* the roof: a whip on the port rear corner, a beacon */
    cylZ(B.dark, C0 + 0.25, W - 0.20, ZR, ZR + 0.12, 0.05, 8);
    cylZ(B.dark, C0 + 0.25, W - 0.20, ZR + 0.12, ZR + 2.10, 0.008, 5);
    B.kit.col = LENS;
    box(B.team, C0 + 0.40, C0 + 1.10, 0.45, 0.70, ZR + 0.10, ZR + 0.112);
    box(B.team, C0 + 0.40, C0 + 1.10, -0.70, -0.45, ZR + 0.10, ZR + 0.112);
  }
  function knChassis(B) {
    var s, i, x, y, W = KN.W;
    /* the frame rails, the cross members, the axles and the drive shafts */
    for (s = -1; s <= 1; s += 2) box(B.dark, KN.REAR, KN.FACE - 0.10, s * 0.42, s * 0.55, KN.FR0, KN.FR1);
    for (x = KN.REAR + 0.1; x < KN.FACE - 0.3; x += 0.9) box(B.dark, x, x + 0.08, -0.42, 0.42, KN.FR0 + 0.04, KN.FR1 - 0.04);
    KN.AX.forEach(function (ax) {
      cylY(B.dark, ax, -0.80, 0.80, KN.RT, 0.08, 10);
      box(B.dark, ax - 0.22, ax + 0.22, -0.24, 0.24, KN.RT - 0.22, KN.RT + 0.22);
    });
    cylX(B.dark, KN.AX[2], KN.AX[0], 0, KN.RT + 0.12, 0.05, 0.05, 8);
    for (s = -1; s <= 1; s += 2) for (i = 1; i < 3; i++) {
      box(B.dark, KN.AX[i] - 0.55, KN.AX[i] + 0.55, s * 0.50, s * 0.60, KN.RT + 0.10, KN.RT + 0.26);   /* springs */
    }
    /* the deck behind the cab: a plated platform from the cab to the tail */
    box(B.paint, KN.REAR, KN.CAB0 - 0.15, -W, W, KN.DECK - 0.10, KN.DECK);
    for (s = -1; s <= 1; s += 2) {
      y = s * W;
      box(B.paint, KN.REAR, KN.CAB0 - 0.15, y - s * 0.04, y + s * 0.02, KN.DECK - 0.30, KN.DECK);    /* the deck's side member */
      /* the lockers between the front wheel and the tandem ([N1]: a tall box with doors), the fuel tank */
      box(B.paint, -1.25, 1.40, y - s * 0.55, y - s * 0.02, KN.DECK - 0.88, KN.DECK - 0.12);
      for (i = 0; i < 3; i++) {
        x = -1.25 + i * 0.88;
        box(B.dark, x + 0.86, x + 0.89, y - s * 0.02, y + s * 0.002, KN.DECK - 0.84, KN.DECK - 0.16);
        box(B.dark, x + 0.40, x + 0.56, y - s * 0.02, y + s * 0.02, KN.DECK - 0.52, KN.DECK - 0.48);
      }
      /* the rear mudguards over the tandem, their flaps */
      box(B.paint, KN.AX[2] - 0.75, KN.AX[1] + 0.75, y - s * 0.40, y + s * 0.02, KN.DECK - 0.14, KN.DECK - 0.10);
      box(B.dark, KN.AX[2] - 0.74, KN.AX[2] - 0.71, y - s * 0.38, y, 0.32, 1.00);
      /* the hydraulic jacks: at the rear corners, behind the cab */
      [KN.REAR + 0.20, KN.CAB0 - 0.45].forEach(function (xj) {
        box(B.paint, xj - 0.12, xj + 0.12, y - s * 0.12, y + s * 0.12, KN.DECK - 0.70, KN.DECK - 0.10);
        cylZ(B.dark, xj, y, 0.30, KN.DECK - 0.70, 0.06, 10);
        cylZ(B.dark, xj, y, 0.22, 0.30, 0.18, 12);
      });
      /* tail lamps, reflectors */
      B.kit.col = TAIL; box(B.kit, KN.REAR - 0.02, KN.REAR, y - s * 0.30, y - s * 0.08, KN.DECK - 0.24, KN.DECK - 0.14);
      B.kit.col = AMBER; box(B.kit, KN.REAR - 0.02, KN.REAR, y - s * 0.40, y - s * 0.32, KN.DECK - 0.24, KN.DECK - 0.14);
    }
    /* the battery box behind the cab, the travel lock cradle the tube muzzles rest on ([N1]) */
    box(B.paint, KN.CAB0 - 0.95, KN.CAB0 - 0.20, -W + 0.05, -0.45, KN.DECK, KN.DECK + 0.70);
    var LX = 1.55, LZ = KN.RING + KN.PZ + KN.ROWZ[0] - KN.TR - 0.05;
    for (s = -1; s <= 1; s += 2) bar(B.paint, [LX - 0.35, s * 0.95, KN.DECK], [LX, s * 0.70, LZ - 0.05], 0.05);
    box(B.paint, LX - 0.15, LX + 0.15, -1.05, 1.05, LZ - 0.10, LZ);
    box(B.dark, LX - 0.17, LX + 0.17, -1.05, 1.05, LZ - 0.02, LZ + 0.03);
    /* the rear: the light bar, tow hitch, a ladder at the tail */
    box(B.paint, KN.REAR - 0.05, KN.REAR, -W, W, KN.DECK - 0.30, KN.DECK);
    box(B.dark, KN.REAR - 0.20, KN.REAR, -0.15, 0.15, 0.82, 0.98);
    ladder(B.dark, [KN.REAR - 0.04, 0.0, 0.45], [KN.REAR - 0.02, 0.0, KN.DECK - 0.30], 0.22, 3);
  }
  /* the slewing base: the ring, the turntable and the two trunnion cheeks ("turret" frame) */
  function knBase(B) {
    var s, i, a;
    cylZ(B.dark, 0, 0, -0.05, 0.08, 1.05, 28);
    cylZ(B.paint, 0, 0, 0.08, 0.26, 0.98, 28);
    for (i = 0; i < 24; i++) { a = i / 24 * TAU; cylZ(B.dark, Math.cos(a) * 0.92, Math.sin(a) * 0.92, 0.26, 0.29, 0.025, 6); }
    box(B.paint, -0.95, 0.70, -0.85, 0.85, 0.26, 0.40);
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[-0.80, 0.40], [0.10, 0.40], [-0.18, KN.PZ + 0.14], [-0.62, KN.PZ + 0.14]], s * 1.16, s * 1.30);
      cylY(B.dark, KN.PX, s * 1.08, s * 1.40, KN.PZ, 0.13, 14);
      /* the elevating rams, lying from the base forward to the cradle */
      cyl(B.dark, [0.45, s * 1.05, 0.40], [1.60, s * 1.05, KN.PZ + 0.12], 0.08, 0.08, 10);
      cyl(B.paint, [0.40, s * 1.05, 0.40], [0.95, s * 1.05, 0.58], 0.11, 0.11, 10);
    }
    /* the layer's sight box and the junction boxes on the turntable */
    box(B.paint, 0.20, 0.60, 0.55, 0.85, 0.40, 0.75);
    box(B.glass, 0.60, 0.61, 0.60, 0.80, 0.58, 0.70);
    box(B.paint, -0.70, -0.30, -0.80, -0.50, 0.40, 0.62);
  }
  /* the eight tubes in two rows of four on their cradle ("podelev" frame: origin on the trunnion) */
  function knPack(B) {
    var r, c, y, z, x, i, M = B.metal, R = KN.TR;
    /* the cradle: two side girders, cross beams, the trunnion sleeve */
    box(B.dark, KN.T0 + 0.20, KN.T1 - 0.60, -1.12, 1.12, -0.08, 0.06);
    for (i = 0; i < 4; i++) { x = KN.T0 + 0.6 + i * 1.6; box(B.dark, x, x + 0.14, -1.15, 1.15, 0.04, 0.12); }
    cylY(B.dark, 0, -1.10, 1.10, 0, 0.10, 12);
    for (r = 0; r < 2; r++) for (c = 0; c < 4; c++) {
      y = KN.COLY[c]; z = KN.ROWZ[r];
      cylX(M, KN.T0, KN.T0 + 0.10, y, z, R - 0.03, R - 0.03, 18);
      cylX(M, KN.T0 + 0.10, KN.T1 - 0.08, y, z, R, R, 18);
      cylX(M, KN.T1 - 0.08, KN.T1, y, z, R + 0.02, R + 0.02, 18);   /* the muzzle ring */
      cylX(B.dark, KN.T1, KN.T1 + 0.005, y, z, R - 0.04, R - 0.04, 16);
    }
    /* the bands round the bundle, top and bottom straps between them */
    [KN.T0 + 0.35, 0.90, 2.45, 3.95, KN.T1 - 0.35].forEach(function (xb) {
      box(M, xb - 0.06, xb + 0.06, -1.10, 1.10, KN.ROWZ[0] - R - 0.05, KN.ROWZ[0] - R);
      box(M, xb - 0.06, xb + 0.06, -1.10, 1.10, KN.ROWZ[1] + R, KN.ROWZ[1] + R + 0.05);
      box(M, xb - 0.06, xb + 0.06, -1.10, -1.05, KN.ROWZ[0] - R - 0.05, KN.ROWZ[1] + R + 0.05);
      box(M, xb - 0.06, xb + 0.06, 1.05, 1.10, KN.ROWZ[0] - R - 0.05, KN.ROWZ[1] + R + 0.05);
      for (var c2 = 0; c2 < 3; c2++) box(B.dark, xb - 0.02, xb + 0.02, (KN.COLY[c2] + KN.COLY[c2 + 1]) / 2 - 0.03, (KN.COLY[c2] + KN.COLY[c2 + 1]) / 2 + 0.03, KN.ROWZ[1] + R + 0.05, KN.ROWZ[1] + R + 0.09);
    });
    /* the firing-circuit cable run along the top, the lifting eyes */
    cylX(B.dark, KN.T0 + 0.4, KN.T1 - 0.6, 0, KN.ROWZ[1] + R + 0.08, 0.03, 0.03, 6);
    for (i = 0; i < 2; i++) for (var s = -1; s <= 1; s += 2) cylY(B.dark, 0.9 + i * 3.05, s * 1.02, s * 1.12, KN.ROWZ[1] + R + 0.10, 0.05, 8);
    box(B.team, KN.T0 + 0.8, KN.T0 + 1.6, -0.15, 0.15, KN.ROWZ[1] + R + 0.05, KN.ROWZ[1] + R + 0.062);
  }
  function kn09(THREE, M, C) {
    var T = mats(THREE, C, KN.P, KN.Q), g = new THREE.Group(), HB = binsM(T), TB = binsM(T), EB = binsM(T);
    HB.kit.col = LENS; TB.kit.col = LENS; EB.kit.col = LENS;
    knCab(HB); knChassis(HB); flush(THREE, g, HB);
    wheels(THREE, g, T, KN.AX, KN.RT, KN.TY, KN.TW, 0.36, 22);
    var tur = group(THREE, "turret", KN.TX, 0, KN.RING);
    knBase(TB); flush(THREE, tur, TB);
    var pe = group(THREE, "podelev", KN.PX, 0, KN.PZ);
    pe.userData.el = KN.EL;
    var cells = [], r, c;
    for (r = 1; r >= 0; r--) for (c = 0; c < 4; c++) cells.push([KN.T1, KN.COLY[c], KN.ROWZ[r], KN.T0]);
    pe.userData.cells = cells;
    knPack(EB); flush(THREE, pe, EB);
    tur.add(pe); g.add(tur);
    return g;
  }

  /* ======================================================= BULSAE-4 (M-2018) on the 6x6 M2010 hull */
  /* Stations: the published 7.65 x 2.90 m ([B0]) for the hull; the axles read off [B3] (a near side-on
     parade view, front tyre 60 px for 1.10 m): front to middle 130 px, middle to rear 60 px, foreshortened
     alike - the BTR-80's rear pair (1.35 m apart) with its second axle taken out, as [B0] describes it.
     Origin at mid-length, +X to the bow. */
  var BU = {
    P: { base: "#4d5538", blots: ["#444c31", "#59613f"], seed: 4018 },
    Q: { base: "#53593d", blots: ["#4a5035", "#5f6545"], seed: 4028 },
    AX: [1.75, -1.25, -2.60], RT: 0.56, TY: 1.18, TW: 0.18,
    BOW: 3.83, STERN: -3.82, ROOF: 1.95,
    TX: -0.70,
    PX: -1.40, PZ: 0.85,                    /* the pack's hinge in the turret frame */
    CY: [0.51, 0.17, -0.17, -0.51], CZ: [0.13, 0.45], CS: 0.155, C0: 0.0, C1: 2.20,
    EL: 0.55
  };
  function ring6(x, wb, zb, wc, zc, wt, zt) { return [[x, -wb, zb], [x, wb, zb], [x, wc, zc], [x, wt, zt], [x, -wt, zt], [x, -wc, zc]]; }
  function buHull(B) {
    var s, i, x, y, a, R = BU.RT;
    loftN(B.paint, [ring6(BU.BOW, 0.55, 0.84, 0.80, 1.00, 0.60, 1.08), ring6(3.15, 0.78, 0.50, 1.38, 1.12, 1.00, 1.45),
                    ring6(2.25, 0.80, 0.48, 1.45, 1.15, 1.05, 1.95), ring6(-3.30, 0.80, 0.48, 1.45, 1.15, 1.05, 1.95),
                    ring6(BU.STERN, 0.76, 0.70, 1.38, 1.15, 1.00, 1.85)]);
    /* the wheel wells, the axles and the drive line under the belly */
    BU.AX.forEach(function (ax) {
      for (s = -1; s <= 1; s += 2) box(B.dark, ax - 0.62, ax + 0.62, s * 0.79, s * 1.30, 0.46, 1.10);
      cylY(B.dark, ax, -1.00, 1.00, R, 0.07, 10);
    });
    cylX(B.dark, BU.AX[2], BU.AX[0], 0, 0.45, 0.06, 0.06, 8);
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.45;
      /* the rubbing strake along the chine, the mudguard lips over each wheel */
      box(B.paint, BU.STERN + 0.30, 3.05, y - s * 0.04, y + s * 0.03, 1.12, 1.18);
      BU.AX.forEach(function (ax) { fender(B.paint, ax, R, R + 0.10, s * 1.20, s * 1.46, 0.35, Math.PI - 0.35, 6); });
      /* the side door between the front and middle axles ([B1][B3]): the two-leaf door and its step */
      slab(B.dark, [0.15, s * 1.30, 1.50], [1, 0, 0], [0, s * Math.cos(0.36), Math.sin(0.36)], [0, -s * Math.sin(0.36), Math.cos(0.36)], 0.48, 0.01, 0.30);
      slab(B.paint, [0.15, s * 1.31, 1.50], [1, 0, 0], [0, s * Math.cos(0.36), Math.sin(0.36)], [0, -s * Math.sin(0.36), Math.cos(0.36)], 0.44, 0.012, 0.27);
      box(B.dark, 0.10, 0.20, s * 1.30, s * 1.36, 1.55, 1.60);
      box(B.paint, -0.25, 0.55, s * 1.30, s * 1.48, 0.95, 1.00);
      /* firing ports and vision blocks along the upper side */
      [2.0, 1.2, -0.65, -1.40, -2.10].forEach(function (xp) {
        cyl(B.dark, [xp, s * 1.27, 1.55], [xp, s * 1.30, 1.56], 0.06, 0.06, 10);
        box(B.glass, xp - 0.08, xp + 0.08, s * 1.10, s * 1.13, 1.80, 1.86);
      });
      /* grab handles on the upper side */
      for (i = 0; i < 4; i++) { x = 1.8 - i * 1.4; poly(B.dark, [[x, s * 1.20, 1.72], [x, s * 1.26, 1.74], [x + 0.30, s * 1.26, 1.74], [x + 0.30, s * 1.20, 1.72]], 0.012); }
      /* the bow: the headlamps on their posts at the glacis corners ([B1][B2]), their guards */
      cylZ(B.dark, 3.10, s * 0.92, 1.40, 1.62, 0.03, 6);
      B.kit.col = LENS; cylX(B.kit, 3.05, 3.20, s * 0.92, 1.70, 0.10, 0.11, 14);
      cylX(B.dark, 2.95, 3.05, s * 0.92, 1.70, 0.10, 0.10, 12);
      poly(B.dark, [[3.22, s * 0.80, 1.60], [3.26, s * 0.92, 1.82], [3.22, s * 1.04, 1.60]], 0.012);
      B.kit.col = AMBER; box(B.kit, 3.30, 3.36, s * 0.70, s * 0.80, 1.36, 1.42);
      /* the tow hooks at the nose, the tow cable looped over the glacis ([B1]) */
      poly(B.dark, [[3.70, s * 0.35, 0.92], [3.90, s * 0.35, 0.88], [3.90, s * 0.35, 0.78], [3.72, s * 0.35, 0.74]], 0.03);
      poly(B.dark, [[3.70, s * 0.35, 1.00], [3.40, s * 0.80, 1.30], [2.90, s * 1.00, 1.60], [2.40, s * 0.40, 1.92]], 0.02);
      /* the stern: tail lamps, the engine-deck grilles, the exhaust boxes, the whips on the rear corners */
      B.kit.col = TAIL; box(B.kit, BU.STERN - 0.02, BU.STERN + 0.01, s * 0.80, s * 1.00, 1.45, 1.55);
      box(B.dark, -3.50, -3.00, s * 1.15, s * 1.30, 1.55, 1.75);
      cylZ(B.dark, -3.15, s * 0.85, 1.85, 2.00, 0.06, 8);
      cylZ(B.dark, -3.15, s * 0.85, 2.00, 4.60, 0.01, 5);
    }
    /* the driver's and commander's windscreens at the top of the glacis, their armoured covers raised */
    var ga = Math.atan2(0.50, 0.90);
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [2.48, s * 0.42, 1.80], [Math.cos(ga), 0, -Math.sin(ga)], [0, 1, 0], [Math.sin(ga), 0, Math.cos(ga)], 0.17, 0.30, 0.015);
      plate(B.paint, [[2.34, s * 0.10, 1.95], [2.34, s * 0.74, 1.95], [2.46, s * 0.74, 2.30], [2.46, s * 0.10, 2.30]], 0.03);
      box(B.dark, 2.30, 2.36, s * 0.10, s * 0.74, 1.93, 1.97);
    }
    /* the big centre lamp on the roof front ([B2]) */
    B.kit.col = LENS; cylX(B.kit, 2.20, 2.32, 0, 2.06, 0.12, 0.13, 14);
    cylX(B.dark, 2.08, 2.20, 0, 2.06, 0.12, 0.12, 12);
    /* roof: the commander's hatch ring and the open lid on the port side ahead of the turret, the engine
       deck louvres aft, the water-jet cover on the stern */
    cylZ(B.dark, 1.20, 0.55, 1.95, 2.02, 0.36, 18);
    plate(B.paint, [[0.86, 0.85, 2.02], [1.54, 0.85, 2.02], [1.54, 0.95, 2.55], [0.86, 0.95, 2.55]], 0.04);
    cylZ(B.paint, 1.20, -0.50, 1.95, 2.00, 0.32, 16);
    for (i = 0; i < 6; i++) box(B.dark, -3.20 + i * 0.18, -3.12 + i * 0.18, -0.85, 0.85, 1.95, 1.965);
    box(B.paint, -3.30, -2.10, -0.90, 0.90, 1.95, 1.97);
    box(B.dark, BU.STERN - 0.02, BU.STERN + 0.02, -0.30, 0.30, 0.85, 1.25);
    box(B.team, -2.0, -1.6, 0.70, 0.92, 1.95, 1.962);
    box(B.team, -2.0, -1.6, -0.92, -0.70, 1.95, 1.962);
  }
  /* the launcher housing on the roof ("turret" frame): faceted walls round the canister block, the sights
     on their posts and the smoke dischargers at the front corners ([B1][B2][B4]) */
  function buHousing(B) {
    var s, i, x, a;
    cylZ(B.dark, 0, 0, -0.02, 0.10, 1.00, 26);
    loftN(B.paint, [[[-1.45, -1.15, 0.10], [-1.45, 1.15, 0.10], [-1.45, 0.98, 0.78], [-1.45, -0.98, 0.78]],
                    [[0.95, -1.15, 0.10], [0.95, 1.15, 0.10], [0.95, 0.98, 0.78], [0.95, -0.98, 0.78]],
                    [[1.42, -1.05, 0.10], [1.42, 1.05, 0.10], [1.42, 0.88, 0.36], [1.42, -0.88, 0.36]]]);
    for (s = -1; s <= 1; s += 2) {
      /* the cheeks rising beside the block, sloped inward ([B1]) */
      plate(B.paint, [[-1.45, s * 0.98, 0.78], [0.95, s * 0.98, 0.78], [0.80, s * 0.86, 1.30], [-1.45, s * 0.86, 1.30]], 0.05);
      /* the sight: a cylinder with a dark window on a post at each front corner ([B1][B2]) */
      cylZ(B.dark, 1.00, s * 0.98, 0.78, 1.05, 0.04, 8);
      cylZ(B.paint, 1.00, s * 0.98, 1.05, 1.42, 0.10, 14);
      cylZ(B.paint, 1.00, s * 0.98, 1.42, 1.46, 0.12, 14);
      B.kit.col = OPTIC; box(B.kit, 1.08, 1.11, s * 0.98 - 0.05, s * 0.98 + 0.05, 1.18, 1.30);
      /* the three smoke dischargers below it, pointing forward and out */
      box(B.paint, 0.95, 1.20, s * 0.70, s * 1.05, 0.52, 0.62);
      for (i = 0; i < 3; i++) {
        var yy = s * (0.76 + i * 0.12);
        cyl(B.dark, [1.05, yy, 0.62], [1.42, yy + s * 0.06, 0.72], 0.045, 0.045, 10);
      }
      /* the struts that hold the hood up ([B1]: two posts each side) */
      bar(B.dark, [-1.20, s * 0.90, 1.30], [-1.20, s * 0.90, 1.55], 0.025);
      /* lifting eyes, a stowage box on the rear corners */
      box(B.paint, -1.40, -1.00, s * 0.95, s * 1.12, 0.10, 0.45);
      cylY(B.dark, 0.30, s * 0.96, s * 1.05, 0.70, 0.04, 8);
    }
    /* the front of the block: the bolted face plate under the caps */
    box(B.paint, 1.05, 1.15, -0.85, 0.85, 0.36, 0.80);
    for (i = 0; i < 6; i++) cylX(B.dark, 1.15, 1.17, -0.75 + i * 0.30, 0.70, 0.02, 0.02, 6);
    box(B.team, -1.30, -0.80, -0.20, 0.20, 0.78, 0.792);
  }
  /* the eight canisters, four across in two rows, and the hood over them ("podelev": origin on the hinge
     at the rear of the block) */
  function buPack(B) {
    var r, c, y, z, M = B.metal, S = BU.CS;
    for (r = 0; r < 2; r++) for (c = 0; c < 4; c++) {
      y = BU.CY[c]; z = BU.CZ[r];
      box(M, BU.C0, BU.C1 - 0.06, y - S, y + S, z - S, z + S);
      B.kit.col = ORANGE; box(B.kit, BU.C1 - 0.06, BU.C1, y - S + 0.01, y + S - 0.01, z - S + 0.01, z + S - 0.01);
      box(B.dark, BU.C1 - 0.01, BU.C1 + 0.005, y - 0.04, y + 0.04, z - 0.04, z + 0.04);
    }
    /* the frame round the block: four straps */
    [0.25, 0.95, 1.65].forEach(function (xs) {
      box(B.dark, xs, xs + 0.06, -0.69, 0.69, BU.CZ[0] - S - 0.03, BU.CZ[0] - S);
      box(B.dark, xs, xs + 0.06, -0.69, 0.69, BU.CZ[1] + S, BU.CZ[1] + S + 0.03);
      box(B.dark, xs, xs + 0.06, -0.69, -0.66, BU.CZ[0] - S, BU.CZ[1] + S);
      box(B.dark, xs, xs + 0.06, 0.66, 0.69, BU.CZ[0] - S, BU.CZ[1] + S);
    });
    box(B.dark, -0.05, 0.05, -0.80, 0.80, -0.05, 0.05);
    /* the hood ([B1][B2][B4]): a shallow inverted tray raised over the block, its front edge flared up */
    plate(M, [[-0.05, -1.10, 0.72], [-0.05, 1.10, 0.72], [2.30, 1.10, 1.08], [2.30, -1.10, 1.08]], 0.05);
    plate(M, [[2.30, -1.10, 1.08], [2.30, 1.10, 1.08], [2.55, 1.05, 1.22], [2.55, -1.05, 1.22]], 0.04);
    var s;
    for (s = -1; s <= 1; s += 2) {
      plate(M, [[-0.05, s * 1.10, 0.72], [2.30, s * 1.10, 1.08], [2.10, s * 1.10, 0.80], [0.10, s * 1.10, 0.48]], 0.04);
      poly(B.dark, [[0.30, s * 1.00, 0.70], [1.60, s * 1.00, 0.88]], 0.015);
    }
  }
  function bulsae(THREE, M, C) {
    var T = mats(THREE, C, BU.P, BU.Q), g = new THREE.Group(), HB = binsM(T), TB = binsM(T), EB = binsM(T);
    HB.kit.col = LENS; TB.kit.col = LENS; EB.kit.col = LENS;
    buHull(HB); flush(THREE, g, HB);
    wheels(THREE, g, T, BU.AX, BU.RT, BU.TY, BU.TW, 0.30, 20);
    var tur = group(THREE, "turret", BU.TX, 0, BU.ROOF);
    buHousing(TB); flush(THREE, tur, TB);
    var pe = group(THREE, "podelev", BU.PX, 0, BU.PZ);
    pe.userData.el = BU.EL;
    var cells = [], r, c;
    for (r = 1; r >= 0; r--) for (c = 0; c < 4; c++) cells.push([BU.C1, BU.CY[c], BU.CZ[r], BU.C0]);
    pe.userData.cells = cells;
    buPack(EB); flush(THREE, pe, EB);
    tur.add(pe); g.add(tur);
    return g;
  }

  /* ======================================================= AFT-10 on the ZBD-04A hull */
  /* The hull, running gear and wheels are js/hero/pla_zbd04.js's (HeroZbd04.build, called unchanged); its
     IFV turret is taken off and the launcher put on the same ring (x -0.75, roof 1.98).  Stations off [A1]
     (near side, travelling): the hull's 7.24 m spans 500 px, 69 px a metre; the pod stack 2.9 m long,
     0.83 m high, its foot 0.6 m over the roof, its tail 0.7 m ahead of the stern. */
  var AF = {
    P: { base: "#56613a", blots: ["#4c5633", "#606b42"], seed: 1010 },
    Q: { base: "#5a653d", blots: ["#505a36", "#646f45"], seed: 1020 },
    PX: -2.15, PZ: 0.55,                         /* the pods' hinge in the turret frame */
    L: 2.90, CY: [0.82, 0.42, -0.42, -0.82], CZ: [0.25, 0.65], CS: 0.18,
    EL: 0.30
  };
  /* the turntable, the pedestal and its arms, the smoke bank, the retracted sensor mast ("turret" frame) */
  function afBase(B) {
    var s, i, a;
    cylZ(B.dark, 0, 0, -0.02, 0.08, 0.80, 26);
    cylZ(B.paint, 0, 0, 0.08, 0.18, 0.74, 26);
    for (i = 0; i < 20; i++) { a = i / 20 * TAU; cylZ(B.dark, Math.cos(a) * 0.68, Math.sin(a) * 0.68, 0.18, 0.20, 0.022, 6); }
    /* the pedestal box on the turntable */
    prismY(B.paint, [[-1.00, 0.18], [0.70, 0.18], [0.55, 0.40], [-1.00, 0.40]], -0.62, 0.62);
    for (s = -1; s <= 1; s += 2) {
      /* the trunnion cheeks at the rear, the elevating rams forward of them ([A2] raised) */
      prismY(B.paint, [[-2.25, 0.30], [-1.00, 0.18], [-1.00, 0.40], [-1.95, AF.PZ + 0.12], [-2.30, AF.PZ + 0.12]], s * 0.18, s * 0.26);
      cylY(B.dark, AF.PX, s * 0.14, s * 0.30, AF.PZ, 0.08, 12);
      cyl(B.dark, [-0.20, s * 0.22, 0.40], [-0.70, s * 0.22, 0.68], 0.06, 0.06, 10);
      cyl(B.paint, [-0.05, s * 0.22, 0.38], [-0.40, s * 0.22, 0.55], 0.085, 0.085, 10);
      /* the sloped skid plate under the pods' front */
      box(B.paint, 0.20, 0.75, s * 0.25, s * 1.00, 0.18, 0.26);
    }
    /* the bank of seven smoke dischargers across the front of the mount ([W]) */
    box(B.paint, 0.55, 0.85, -0.62, 0.62, 0.18, 0.30);
    for (i = 0; i < 7; i++) cyl(B.dark, [0.70, -0.54 + i * 0.18, 0.30], [0.98, -0.54 + i * 0.18, 0.48], 0.05, 0.05, 10);
    /* the sensor mast between the pods, retracted ([A1]): column, the coiled cable, the EO head */
    cylZ(B.dark, -0.55, 0, 0.40, 1.30, 0.11, 14);
    cylZ(B.paint, -0.55, 0, 0.40, 0.70, 0.15, 14);
    for (i = 0; i < 7; i++) cylZ(B.dark, -0.55, 0, 0.72 + i * 0.08, 0.745 + i * 0.08, 0.135, 12);
    box(B.paint, -0.73, -0.37, -0.17, 0.17, 1.30, 1.60);
    cylY(B.paint, -0.55, -0.20, 0.20, 1.45, 0.15, 16);
    B.kit.col = OPTIC; box(B.kit, -0.38, -0.36, -0.09, 0.09, 1.38, 1.54);
    B.kit.col = LENS; cylX(B.kit, -0.37, -0.34, 0.11, 1.52, 0.035, 0.035, 10);
    box(B.team, -0.95, -0.60, -0.55, -0.30, 0.40, 0.412);
    box(B.team, -0.95, -0.60, 0.30, 0.55, 0.40, 0.412);
  }
  /* the two pods of four canisters ("podelev": origin on the hinge at the tail) */
  function afPods(B) {
    var s, i, r, c, y, z, x, M = B.metal, S = AF.CS, L = AF.L;
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 0.22, y1 = s * 1.02, yc = s * 0.62;
      /* the pod body: a box with the canisters' ribbed covers ([A1][A2]) */
      box(M, 0.0, L - 0.08, Math.min(y0, y1), Math.max(y0, y1), 0.05, 0.86);
      for (i = 0; i < 7; i++) {
        x = 0.18 + i * 0.42;
        box(M, x, x + 0.05, Math.min(y0, y1) - 0.02, Math.max(y0, y1) + 0.02, 0.03, 0.88);
      }
      box(M, 0.0, L - 0.08, Math.min(y0, y1) - 0.02, Math.max(y0, y1) + 0.02, 0.44, 0.47);   /* the row seam */
      /* the latches and handles on the outer face ([A1]) */
      for (i = 0; i < 6; i++) {
        x = 0.35 + i * 0.42;
        box(B.dark, x, x + 0.12, y1, y1 + s * 0.03, 0.22, 0.28);
        box(B.dark, x, x + 0.12, y1, y1 + s * 0.03, 0.62, 0.68);
      }
      /* the front frame and the four mouths, their dark covers */
      box(M, L - 0.08, L, Math.min(y0, y1), Math.max(y0, y1), 0.05, 0.86);
      for (r = 0; r < 2; r++) for (c = 0; c < 2; c++) {
        y = c === 0 ? AF.CY[s > 0 ? 0 : 3] : AF.CY[s > 0 ? 1 : 2]; z = AF.CZ[r];
        box(B.dark, L, L + 0.01, y - S + 0.03, y + S - 0.03, z - S + 0.03, z + S - 0.03);
        cylX(B.dark, L + 0.01, L + 0.04, y, z, 0.085, 0.085, 14);
      }
      /* lifting eyes on top, the cable to the rear */
      cylY(B.dark, 0.45, yc - 0.05, yc + 0.05, 0.92, 0.05, 8);
      cylY(B.dark, L - 0.50, yc - 0.05, yc + 0.05, 0.92, 0.05, 8);
      cylX(B.dark, -0.10, 0.20, yc, 0.20, 0.04, 0.04, 6);
    }
    /* the cross tube between the pods at the hinge */
    cylY(B.dark, 0, -1.02, 1.02, 0, 0.09, 12);
    box(B.dark, 0.0, 0.30, -0.22, 0.22, -0.05, 0.10);
  }
  function aft10(THREE, M, C) {
    var g = HeroZbd04.build(THREE, M, C), old = null, i, ox = -0.75, oz = 1.98;
    for (i = 0; i < g.children.length; i++) if (g.children[i].name === "turret") old = g.children[i];
    if (old) { ox = old.position.x; oz = old.position.z; g.remove(old); }
    var T = mats(THREE, C, AF.P, AF.Q), TB = binsM(T), EB = binsM(T);
    TB.kit.col = LENS; EB.kit.col = LENS;
    var tur = group(THREE, "turret", ox, 0, oz);
    afBase(TB); flush(THREE, tur, TB);
    var pe = group(THREE, "podelev", AF.PX, 0, AF.PZ);
    pe.userData.el = AF.EL;
    var cells = [], r, c;
    for (r = 1; r >= 0; r--) for (c = 0; c < 4; c++) cells.push([AF.L + 0.04, AF.CY[c], AF.CZ[r], 0]);
    pe.userData.cells = cells;
    afPods(EB); flush(THREE, pe, EB);
    tur.add(pe); g.add(tur);
    return g;
  }

  /* ======================================================= CHL-906 jammer on its 8x8 truck */
  /* Stations off [C1] (one photograph, the starboard side from a little ahead): the front tyre, 50 px high,
     taken as 1.25 m (a 14.00R20-class tyre - NOT published) gives 41.7 px a metre up the side; the cab's
     front face shows the side turned about 32 deg off square, so lengths along the side are read at 0.85
     of that, 35.4 px a metre.  Origin at mid-wheelbase, +X to the bumper. */
  var CH = {
    P: { base: "#56613a", blots: ["#4c5633", "#606b42"], seed: 9060 },
    Q: { base: "#4f5a36", blots: ["#465031", "#5a653f"], seed: 9070 },
    AX: [3.80, 2.05, -2.05, -3.50], RT: 0.625, TY: 1.02, TW: 0.21,
    FACE: 5.25, CAB0: 3.02, CABZ0: 1.30, ROOF: 3.70, W: 1.25,
    B0: -5.15, B1: 2.85, BZ0: 1.62, BZ1: 3.60, DECK: 1.50,
    MX: 1.70, MTOP: 9.70,
    TX: -0.78
  };
  function chCab(B) {
    var s, i, y, F = CH.FACE, C0 = CH.CAB0, W = CH.W, Z0 = CH.CABZ0, ZR = CH.ROOF;
    /* the forward-control cab ([C1]): tall, a big one-piece windscreen leaning back, a roof rack */
    prismY(B.paint, [[C0, Z0], [F, Z0], [F + 0.03, 2.38], [F - 0.16, 3.48], [F - 0.30, ZR], [C0, ZR]], -W, W);
    var wa = Math.atan2(0.19, 1.10);
    slab(B.glass, [F - 0.065 + 0.013, 0, 2.93], [Math.sin(wa), 0, Math.cos(wa)], [0, 1, 0], [Math.cos(wa), 0, -Math.sin(wa)], 0.48, W - 0.10, 0.012);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [F + 0.03, s * 0.55 - 0.35, 2.50], [F + 0.03, s * 0.55 + 0.25, 2.58], 0.012);
    /* the grille of horizontal bars in its frame ([C1]), the badge, the bull bar */
    box(B.dark, F, F + 0.03, -0.90, 0.90, 1.62, 2.30);
    for (i = 0; i < 7; i++) box(B.paint, F + 0.02, F + 0.06, -0.88, 0.88, 1.66 + i * 0.09, 1.70 + i * 0.09);
    box(B.paint, F + 0.02, F + 0.07, -0.08, 0.08, 1.62, 2.30);
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [F + 0.10, s * 1.10, 1.30], [F + 0.10, s * 1.10, 2.35], 0.03);
      bar(B.dark, [F + 0.03, s * 1.10, 2.35], [F + 0.10, s * 1.10, 2.35], 0.03);
    }
    bar(B.dark, [F + 0.10, -1.10, 2.00], [F + 0.10, 1.10, 2.00], 0.025);
    /* the bumper, lamps, tow pins, the step */
    box(B.paint, F - 0.10, F + 0.16, -W - 0.03, W + 0.03, 0.92, 1.34);
    box(B.dark, F + 0.15, F + 0.17, -0.50, 0.50, 1.00, 1.08);
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.00;
      B.kit.col = LENS; box(B.kit, F + 0.15, F + 0.18, y - 0.16, y + 0.12, 1.12, 1.26);
      B.kit.col = AMBER; box(B.kit, F + 0.15, F + 0.18, s * 0.62, s * 0.74, 1.14, 1.24);
      B.kit.col = LENS; cylX(B.kit, F + 0.15, F + 0.19, s * 0.42, 1.02, 0.055, 0.055, 10);
      poly(B.dark, [[F + 0.12, s * 0.65, 0.94], [F + 0.26, s * 0.65, 0.80], [F + 0.26, s * 0.65, 0.66], [F + 0.10, s * 0.65, 0.62]], 0.028);
      var Y = s * W;
      /* the door and its window, the grab handle, the three-step ladder under it */
      box(B.dark, C0 + 0.30, C0 + 0.33, Y, Y + s * 0.01, Z0 + 0.20, ZR - 0.12);
      box(B.dark, F - 0.45, F - 0.42, Y, Y + s * 0.01, Z0 + 0.20, 2.60);
      box(B.glass, C0 + 0.40, F - 0.48, Y, Y + s * 0.012, 2.55, 3.40);
      box(B.dark, C0 + 0.40, F - 0.48, Y, Y + s * 0.008, 2.50, 2.55);
      box(B.dark, C0 + 0.50, C0 + 0.72, Y, Y + s * 0.04, 2.25, 2.29);
      bar(B.dark, [F - 0.38, Y + s * 0.05, 1.70], [F - 0.38, Y + s * 0.05, 2.60], 0.015);
      for (i = 0; i < 3; i++) box(B.paint, F - 1.20, F - 0.50, Y - s * 0.05, Y + s * 0.07, 0.62 + i * 0.30, 0.66 + i * 0.30);
      for (i = 0; i < 2; i++) bar(B.dark, [F - 1.20 + i * 0.70, Y + s * 0.03, 0.60], [F - 1.20 + i * 0.70, Y + s * 0.03, 1.30], 0.015);
      /* the mirrors */
      poly(B.dark, [[F - 0.22, Y, 3.25], [F - 0.05, Y + s * 0.22, 3.32], [F + 0.02, Y + s * 0.36, 3.32]], 0.018);
      bar(B.dark, [F - 0.22, Y, 2.70], [F + 0.02, Y + s * 0.36, 2.78], 0.016);
      box(B.dark, F - 0.06, F + 0.04, Y + s * 0.30, Y + s * 0.46, 2.76, 3.38);
      box(B.glass, F + 0.04, F + 0.05, Y + s * 0.31, Y + s * 0.45, 2.79, 3.35);
      /* the front fenders over both front axles */
      fender(B.paint, CH.AX[0], CH.RT, CH.RT + 0.12, s * 0.80, s * (W + 0.02), 0.25, Math.PI - 0.25, 8);
      fender(B.paint, CH.AX[1], CH.RT, CH.RT + 0.12, s * 0.80, s * (W + 0.02), 0.25, Math.PI - 0.25, 8);
      /* amber markers on the roof front */
      B.kit.col = AMBER; box(B.kit, F - 0.36, F - 0.24, s * (W - 0.22), s * (W - 0.10), ZR + 0.01, ZR + 0.07);
    }
    box(B.dark, C0 - 0.02, C0, -W, W, Z0 + 0.10, ZR - 0.02);
    /* the roof rack: a rail all round on posts ([C1]) */
    rail(B.dark, [[C0 + 0.10, -W + 0.08, ZR], [F - 0.40, -W + 0.08, ZR], [F - 0.40, W - 0.08, ZR], [C0 + 0.10, W - 0.08, ZR], [C0 + 0.10, -W + 0.08, ZR]], 0.55);
    B.kit.col = LENS;
  }
  function chChassis(B) {
    var s, i, x, y, W = CH.W;
    for (s = -1; s <= 1; s += 2) box(B.dark, CH.B0, CH.FACE - 0.12, s * 0.42, s * 0.56, 1.00, 1.30);
    for (x = CH.B0 + 0.1; x < CH.FACE - 0.3; x += 0.95) box(B.dark, x, x + 0.08, -0.42, 0.42, 1.04, 1.26);
    CH.AX.forEach(function (ax) {
      cylY(B.dark, ax, -0.82, 0.82, CH.RT, 0.08, 10);
      box(B.dark, ax - 0.22, ax + 0.22, -0.25, 0.25, CH.RT - 0.22, CH.RT + 0.22);
      for (s = -1; s <= 1; s += 2) box(B.dark, ax - 0.50, ax + 0.50, s * 0.50, s * 0.60, CH.RT + 0.12, CH.RT + 0.28);
    });
    cylX(B.dark, CH.AX[3], CH.AX[0], 0, CH.RT + 0.10, 0.05, 0.05, 8);
    /* the subframe the shelter sits on */
    box(B.paint, CH.B0, CH.B1, -W, W, CH.DECK - 0.20, CH.DECK);
    box(B.paint, CH.B0 + 0.05, CH.B1 - 0.05, -W + 0.05, W - 0.05, CH.DECK, CH.BZ0);
    for (s = -1; s <= 1; s += 2) {
      y = s * W;
      /* mudguards over the rear tandem, their flaps */
      box(B.paint, CH.AX[3] - 0.78, CH.AX[2] + 0.78, y - s * 0.42, y + s * 0.02, CH.DECK - 0.24, CH.DECK - 0.20);
      box(B.dark, CH.AX[3] - 0.78, CH.AX[3] - 0.75, y - s * 0.40, y, 0.32, 1.10);
      /* the stowage lockers and the fuel tank between the axles */
      box(B.paint, -1.30, 1.20, y - s * 0.48, y - s * 0.02, 0.62, 1.28);
      for (i = 0; i < 3; i++) box(B.dark, -1.30 + i * 0.83 + 0.80, -1.30 + i * 0.83 + 0.83, y - s * 0.02, y + s * 0.002, 0.66, 1.24);
      cylX(B.paint, -1.05, 0.95, y - s * 0.30, 0.60, 0.26, 0.26, 16);
      /* the levelling jacks at the shelter's corners */
      [CH.B0 + 0.25, CH.B1 - 0.05].forEach(function (xj) {
        box(B.paint, xj - 0.12, xj + 0.12, y - s * 0.14, y + s * 0.10, CH.DECK - 0.70, CH.DECK - 0.20);
        cylZ(B.dark, xj, y, 0.25, CH.DECK - 0.70, 0.06, 10);
        cylZ(B.dark, xj, y, 0.18, 0.25, 0.18, 12);
      });
      B.kit.col = TAIL; box(B.kit, CH.B0 - 0.02, CH.B0, y - s * 0.30, y - s * 0.08, CH.DECK - 0.18, CH.DECK - 0.08);
      B.kit.col = AMBER; box(B.kit, CH.B0 - 0.02, CH.B0, y - s * 0.40, y - s * 0.32, CH.DECK - 0.18, CH.DECK - 0.08);
    }
    box(B.dark, CH.B0 - 0.20, CH.B0, -0.15, 0.15, 0.90, 1.05);
    B.kit.col = LENS;
  }
  /* the shelter: a tall box with doors, vents, ladders down the side, a rail round the rear roof, the
     generator and its louvres low at the front ([C1]) */
  function chBody(B) {
    var s, i, x, y, W = CH.W, Z0 = CH.BZ0, Z1 = CH.BZ1;
    box(B.paint, CH.B0, CH.B1, -W, W, Z0, Z1);
    box(B.paint, CH.B0 + 0.04, CH.B1 - 0.04, -W + 0.04, W - 0.04, Z1, Z1 + 0.06);
    for (s = -1; s <= 1; s += 2) {
      y = s * W;
      /* corner posts and the drip rail */
      [CH.B0, CH.B1].forEach(function (xc) { box(B.paint, xc - 0.05, xc + 0.05, y - 0.05, y + 0.05, Z0, Z1); });
      box(B.paint, CH.B0, CH.B1, y, y + s * 0.03, Z1 - 0.07, Z1 - 0.03);
      /* panel seams up the side */
      for (x = CH.B0 + 1.0; x < CH.B1 - 0.2; x += 1.0) box(B.dark, x, x + 0.02, y, y + s * 0.006, Z0 + 0.05, Z1 - 0.08);
      /* the louvred vent at the rear and the air-conditioner hoods */
      box(B.dark, CH.B0 + 0.30, CH.B0 + 0.75, y, y + s * 0.02, 2.10, 3.00);
      for (i = 0; i < 9; i++) box(B.paint, CH.B0 + 0.30, CH.B0 + 0.75, y + s * 0.01, y + s * 0.05, 2.14 + i * 0.095, 2.17 + i * 0.095);
      box(B.paint, -1.00, -0.30, y, y + s * 0.30, 2.80, 3.30);
      for (i = 0; i < 5; i++) box(B.dark, -0.98 + i * 0.14, -0.92 + i * 0.14, y + s * 0.30, y + s * 0.31, 2.85, 3.25);
      /* the generator compartment low at the front: louvres */
      for (i = 0; i < 6; i++) box(B.dark, 1.50, 2.70, y, y + s * 0.02, CH.DECK - 0.15 + i * 0.03, CH.DECK - 0.14 + i * 0.03);
    }
    /* the door on the starboard side with its handle and step, the cable entry box */
    box(B.dark, -2.10, -2.07, -W - 0.006, -W, Z0 + 0.10, 3.25);
    box(B.dark, -1.27, -1.24, -W - 0.006, -W, Z0 + 0.10, 3.25);
    box(B.dark, -2.10, -1.24, -W - 0.006, -W, 3.22, 3.25);
    box(B.dark, -1.42, -1.32, -W - 0.04, -W, 2.30, 2.34);
    box(B.paint, 0.80, 1.40, -W - 0.25, -W, 1.70, 2.20);
    /* the three ladders down the starboard side ([C1]), leaning out to the ground */
    [-4.45, -2.75, 0.21].forEach(function (xl) { ladder(B.dark, [xl - 0.25, -W - 0.65, 0.02], [xl, -W - 0.02, Z0], 0.22, 5); });
    /* the roof: the rail round the rear platform ([C1]), the antenna boxes, cable trays */
    rail(B.dark, [[CH.B0 + 0.08, -W + 0.06, Z1 + 0.06], [CH.B0 + 1.50, -W + 0.06, Z1 + 0.06], [CH.B0 + 1.50, W - 0.06, Z1 + 0.06], [CH.B0 + 0.08, W - 0.06, Z1 + 0.06], [CH.B0 + 0.08, -W + 0.06, Z1 + 0.06]], 0.70);
    box(B.paint, -3.40, -2.20, -0.90, -0.10, Z1 + 0.06, Z1 + 0.42);
    box(B.paint, 0.30, 1.10, 0.20, 1.05, Z1 + 0.06, Z1 + 0.36);
    box(B.dark, -2.00, 1.40, 0.95, 1.10, Z1 + 0.06, Z1 + 0.14);
    /* the tall mast at the front of the shelter ([C1]): three telescopic sections, its head, the raking
       struts at its foot, the small dish two-thirds up */
    var X = CH.MX;
    cylZ(B.paint, X, 0, Z1, Z1 + 0.40, 0.30, 16);
    cylZ(B.paint, X, 0, Z1 + 0.40, 6.00, 0.17, 14);
    cylZ(B.dark, X, 0, 5.98, 6.08, 0.20, 14);
    cylZ(B.paint, X, 0, 6.08, 8.20, 0.13, 14);
    cylZ(B.dark, X, 0, 8.18, 8.26, 0.16, 14);
    cylZ(B.paint, X, 0, 8.26, 9.20, 0.10, 12);
    box(B.paint, X - 0.26, X + 0.26, -0.22, 0.22, 9.20, 9.62);
    cylZ(B.paint, X, 0, 9.62, CH.MTOP, 0.18, 14);
    box(B.paint, X + 0.10, X + 0.40, -0.18, 0.18, 7.75, 8.05);
    cylX(B.paint, X + 0.40, X + 0.48, 0, 7.90, 0.22, 0.20, 16);
    for (s = -1; s <= 1; s += 2) {
      bar(B.paint, [X - 1.10, s * 0.55, Z1 + 0.06], [X - 0.05, s * 0.10, 5.60], 0.05);
      bar(B.paint, [X + 1.00, s * 0.60, Z1 + 0.06], [X + 0.05, s * 0.10, 5.20], 0.04);
    }
    cylZ(B.dark, X + 0.25, -0.18, Z1 + 0.40, 7.70, 0.02, 5);          /* the cable down the mast */
    /* a whip at the shelter's front corner */
    cylZ(B.dark, CH.B1 - 0.20, 1.05, Z1, Z1 + 0.12, 0.05, 8);
    cylZ(B.dark, CH.B1 - 0.20, 1.05, Z1 + 0.12, Z1 + 2.40, 0.01, 5);
    box(B.team, -4.40, -3.80, 0.55, 0.80, Z1 + 0.06, Z1 + 0.072);
    box(B.team, -4.40, -3.80, -0.80, -0.55, Z1 + 0.06, Z1 + 0.072);
  }
  /* the jamming antenna: a curved reflector panel on a hinged arm, raised over the rear of the shelter,
     with the log-periodic arrays at its head ("turret" frame: the turntable on the shelter roof) */
  var CHA = [[0.00, 0.40], [-0.18, 1.20], [-0.55, 2.00], [-1.00, 2.60], [-1.45, 2.95], [-1.70, 3.12]];
  function chArray(B) {
    var s, i, A, Bp, M = B.metal, dx, dz, l, nx, nz;
    cylZ(B.dark, 0, 0, 0.0, 0.10, 0.72, 24);
    cylZ(B.paint, 0, 0, 0.10, 0.30, 0.62, 24);
    box(B.paint, -0.55, 0.45, -0.50, 0.50, 0.10, 0.40);
    /* the hinge brackets and the elevating ram */
    for (s = -1; s <= 1; s += 2) prismY(B.paint, [[-0.30, 0.30], [0.30, 0.30], [0.10, 0.62], [-0.15, 0.62]], s * 0.32, s * 0.42);
    cyl(B.dark, [0.35, -0.20, 0.35], [-0.55, -0.20, 1.95], 0.06, 0.06, 10);
    cyl(B.paint, [0.35, -0.20, 0.35], [0.05, -0.20, 0.95], 0.09, 0.09, 10);
    /* the panel: segments along the arc, a ribbed back, the reflector face */
    for (i = 0; i + 1 < CHA.length; i++) {
      A = CHA[i]; Bp = CHA[i + 1];
      dx = Bp[0] - A[0]; dz = Bp[1] - A[1]; l = Math.sqrt(dx * dx + dz * dz); nx = dz / l; nz = -dx / l;
      slab(M, [(A[0] + Bp[0]) / 2, 0, (A[1] + Bp[1]) / 2], [dx / l, 0, dz / l], [0, 1, 0], [nx, 0, nz], l / 2 + 0.02, 0.50, 0.06);
      slab(B.dark, [(A[0] + Bp[0]) / 2 + nx * 0.07, 0, (A[1] + Bp[1]) / 2 + nz * 0.07], [dx / l, 0, dz / l], [0, 1, 0], [nx, 0, nz], l / 2, 0.44, 0.012);
      for (s = -1; s <= 1; s += 2) slab(M, [(A[0] + Bp[0]) / 2 - nx * 0.10, s * 0.30, (A[1] + Bp[1]) / 2 - nz * 0.10], [dx / l, 0, dz / l], [0, 1, 0], [nx, 0, nz], l / 2, 0.04, 0.10);
      /* the cross ribs on the back and the bolt rows on the face */
      slab(M, [A[0] - nx * 0.10, 0, A[1] - nz * 0.10], [dx / l, 0, dz / l], [0, 1, 0], [nx, 0, nz], 0.04, 0.50, 0.10);
    }
    /* the head: a block, a short post, the boom with the log-periodic elements, the second array */
    var H = CHA[CHA.length - 1];
    box(M, H[0] - 0.18, H[0] + 0.18, -0.20, 0.20, H[1] - 0.05, H[1] + 0.28);
    cylZ(B.dark, H[0], 0, H[1] + 0.28, H[1] + 1.10, 0.04, 8);
    cylX(B.dark, H[0] - 0.40, H[0] + 1.30, 0, H[1] + 0.55, 0.03, 0.03, 6);
    for (i = 0; i < 9; i++) {
      var ex = H[0] - 0.30 + i * 0.18, ew = 0.55 - i * 0.04;
      bar(B.dark, [ex, -ew, H[1] + 0.55], [ex, ew, H[1] + 0.55], 0.008);
    }
    cylY(B.dark, H[0] - 0.05, -0.90, 0.90, H[1] + 0.90, 0.025, 6);
    for (i = 0; i < 6; i++) {
      var ey = -0.75 + i * 0.30;
      bar(B.dark, [H[0] - 0.30, ey, H[1] + 0.90], [H[0] + 0.30, ey, H[1] + 0.90], 0.008);
    }
  }
  function chl906(THREE, M, C) {
    var T = mats(THREE, C, CH.P, CH.Q), g = new THREE.Group(), HB = binsM(T), TB = binsM(T);
    HB.kit.col = LENS; TB.kit.col = LENS;
    chCab(HB); chChassis(HB); chBody(HB); flush(THREE, g, HB);
    wheels(THREE, g, T, CH.AX, CH.RT, CH.TY, CH.TW, 0.38, 24);
    var tur = group(THREE, "turret", CH.TX, 0, CH.BZ1 + 0.06);
    chArray(TB); flush(THREE, tur, TB);
    g.add(tur);
    return g;
  }

  return { kn09: kn09, bulsae: bulsae, aft10: aft10, chl906: chl906 };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of each build (tools/model3d/dump.js). */
UNIT_MODELS["kpa_e00_mlrs"] = { len: 9.04, build: HeroHeldLaunchers.kn09 };
UNIT_MODELS["atgmv_k"] = { len: 7.77, build: HeroHeldLaunchers.bulsae };
if (typeof HeroZbd04 !== "undefined" && typeof HeroZbd04.build === "function") {
  UNIT_MODELS["atgmv_c"] = { len: 7.28, build: HeroHeldLaunchers.aft10 };
}
UNIT_MODELS["ewv_c"] = { len: 10.89, build: HeroHeldLaunchers.chl906 };
/* held, rule 1 (see the header): the only photographs show the WHEELED KN-23 TEL or none of the running gear.
   UNIT_MODELS["tel_k"] = ...;   KN-23 tracked TEL: no reference found. */
