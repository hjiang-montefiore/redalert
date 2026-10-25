/* ===== us_m548_family.js - HERO models: the carriers on the M548 chassis ======
   Two rows, one chassis (REDO 2026-10-24, full-quality procedure; keys and the
   HeroUsM548 name kept, rows registered in the loop at the foot):
     nato_e60_sam    M727 Self-Propelled HAWK (1969): three MIM-23 rounds on the
                     launcher on the open rear deck of an M548-family carrier,
                     olive drab                                   turret:true, deploy:true
     nato_e80_ewveh  AN/MLQ-34 TACJAM on the M1015 carrier (1985): an S-595/G
                     shelter on the cargo bed of an M548, MERDC woodland on the
                     carrier, the shelter plain green             turret:true

   REFERENCES (Wikimedia Commons at width 960, cached in scratchpad q_m548_ref;
   US Army photographs and TM figures, public domain):
     D1 "M548 dimensions.jpg" - the TM side and rear view in inches: 226.5 long,
        105.8 wide over all, 100 over the body, cab roof 105.5, cargo rail 76,
        track centres 85, track 15, clearance 16, approach 22.5 deg, departure
        13.5 deg, sprocket 29.3 behind the nose, first road wheel 26.9 behind
        that, four gaps of 27.75 (111), the idler about 195 from the nose; the
        cab 57 long (to its rear wall), a lower box behind it to 85; the rear
        view's cab 93.6 across over a 100 in body.  THE STATION TABLE.
     P1 "Right side view of a US Army M-727 self-propelled Hawk ... DPLA" (Black
        Forest, FRG, 1 Dec 1973) - near-orthographic starboard side, the rounds
        stowed: scaled at 116 px a metre off the road-wheel pitch (the 5.03 m
        round measures 5.04).  THE M727 TABLE.
     P2 "M727-Hawk-hatzerim-1.jpg", P3 "-2.jpg" (Israeli AF Museum, 2006) - the
        launcher RAISED, front-right and port-rear: the three rounds abreast,
        the centre one higher, the wings in an X, the arms under the rounds,
        the pedestal over the rear deck, the cab's three-pane windscreen and
        round lamp housings, the frames against the cab's rear wall.
     P4 "Self-propelled Hawk platoon in march order.jpg" (before 1970) - on the
        march the rounds lie forward over the cab, near level.
     P5 "Self-propelled Hawk with towed antenna array.jpg" (1960s test platoon)
        - starboard side, the same launcher and cab.
     P6 "U.S. M548 at Nui Dat.jpg" (Vietnam) - the 1960s cab: three-pane
        windscreen, door window, round lamp housings on the front plate, the
        fender over the track, olive drab.
     T1 "M1015 Electronic Warfare Shelter Carrier major components.jpg" (TM) -
        port front: the cab, the box and canister between cab and shelter, the
        shelter with its side door, the five panels of the bed wall, the
        ground-rod driver on the starboard bow, the roof frame (antenna
        shroud) reaching forward over the cab.
     T2 "M1015 ... other components.jpg" (TM) - port rear: the shroud round the
        roof; the log-periodic antenna (LPA) and its mast STOWED lying on the
        roof, the antenna positioner, the pneumatic component box (front port),
        the data-link mast and cone antenna (rear port), the BITE antenna and
        the WRC-46 whip (rear starboard), the shelter's rear door, the four
        panels of the tailgate, the tow pintles.
     T3 "140328-A-XX000-003.jpg" (Army, 13 Jul 2011, an AN/MLQ-34 moved to a
        museum) - port front: MERDC woodland on the carrier, the shelter plain
        green, the shelter roof 0.6 m over the cab, the canister on the box.

   RECOGNITION LIST (each drawn; where):
     1  the cab-forward aluminium carrier: a tall full-width cab on the bow, the
        low hull behind it (D1, P1, P6)                        -> hull(), cab()
     2  five road wheels a side, NO return rollers, the track lying on the
        wheel tops, the sprocket at the FRONT, the idler at the rear (D1, P1,
        T3)                                                    -> running(), "roadwheel"
     3  the cab front: a raked three-pane windscreen over a front plate with a
        round lamp housing at each corner, tow eyes low (P2, P6, T3) -> cabFront()
     4  the fender ledge over the track from end to end (D1, P6, T3)
     5  M727: the cab's roof falling away aft to a rear wall 2.0 m behind the
        nose, a louvred panel on its side behind the door (P1, P5) -> cab()
     6  M727: the open rear deck, the box on it, the two frames against the
        cab's rear wall (P1, P3)                               -> m727Deck()
     7  M727: three rounds abreast on their arms, the centre one 0.36 m higher,
        X-wings, a 5.03 m round with a long ogive and long-chord clipped-delta
        wings to the tail (P1-P3)                              -> "podelev"
     8  M727: stowed pointing forward toward the cab at 6 deg, tails 1.2 m
        past the hull (P1, P4); raised to fire (P2, P3)       -> podelev, userData.el
     9  M727: the pedestal and turntable over the rear deck (P1, P3) -> "turret"
     10 M727: the reel on its arms behind the tail (P1, P3)
     11 M1015: the S-595/G shelter on the bed, inside the bed walls with their
        five panels, stopping short of the tail; the box and the canister
        between cab and shelter (T1, T3)                       -> m1015Body()
     12 M1015: the tubular antenna shroud over the roof and forward over the
        cab, the LPA stowed inside it on its positioner, the data-link cone,
        the whip, the ground-rod driver on the bow (T1, T2)   -> shroud(), "turret"
     13 paint by period (below).

   STATION TABLE (D1 in inches from the nose; model X = 2.877 - in * 0.0254,
   heights above the ground):
        in      X      what
       0.0    2.877   nose, the tow-eye face (lower front plate 1.10-1.60 m)
      13.6    2.53    windscreen sill 1.93 m; windscreen raked 14 deg to the
                      roof front 2.64 m (D1 21.7 in)
      29.3    2.133   sprocket, z 0.55
      56.2    1.449   road wheels 1.449, 0.744, 0.039, -0.666, -1.371, r 0.29
      57      1.43    M548 cab rear wall (M1015)
      78      0.89    M727 cab rear wall, roof falling 2.68 -> 2.20 from X 1.80
                      (P1: 1.08 m and 1.98 m behind the nose)
     195     -2.05    idler, z 0.45
     226.5   -2.877   tail
     Belly 0.41 (16 in), lower nose 1.10 at the bow to 0.50 at X 2.25; hull
     side top / deck 1.06 (P1 1.08); fender 0.86-0.90 out to 1.345; body
     sides 1.27 (100 in); cab 1.24, its windows' frame 1.20 (93.6 in);
     cab roof 2.68 (105.5 in); bed rail 1.93 (76 in).
     M727 (P1): turntable centre X -2.08 on the deck, trunnion 1.85 m up; the
     outer rounds' axes 2.47 m and the centre's 2.83 m at the trunnion; round
     tail 2.00 behind the trunnion, nose 3.03 ahead; deck box X -0.83..-1.85
     to 1.47; reel X -3.42, z 0.50, r 0.45.
     M1015 (T1-T3): box X 0.62-1.43 to 2.36, canister 0.42 x 1.0 m on its
     port half; shelter X -2.48..0.50, sides 1.22, roof 3.30 (T3 0.6 m over
     the cab roof by the road-wheel scale); shroud top rail 0.38 m over the
     roof from X 2.40 to -2.52.
   AS DRAWN (tools/model3d/dump.js): M727 7.18 x 2.70 x 3.23 m stowed (the
     reel and the rounds' tails past the 5.75 m hull, as P1), 13,416
     triangles, 16 draw calls, 5 materials; M1015 6.15 x 2.70 x 3.84 m (to
     the data-link cone; shroud 3.68, shelter roof 3.30), 12,804 triangles,
     14 draw calls, 5 materials.  len is the measured X extent.

   POSES.  M727: "turret" is the launcher on its turntable (ring centre on the
     deck, rounds along +X); "podelev" (inside it, its origin on the trunnion)
     holds the arms and the three rounds, baked at the 6 deg stow of P1 and
     raised by userData.el = 18 deg to the 24 deg P2 and P3 show (P2 reads
     24 and P3 21 once the camera's angle to the hull is taken out; no
     published launch angle was found, and the real launcher lays to the
     target).  cells: one per round, mouth at the nose, rear at the tail
     (the launch direction is the pod's X, 6 deg under the rounds' axes).
     Raised, the X extent is 7.34 m (stowed 7.18): render3d sizes from the
     template, which is stowed.  The row is deploy:true,
     but no reference shows anything put out when it sets up (no jacks, no
     mast), so no "deploypose"/"travelpose" groups are drawn.
   M1015: the row has no deploy flag, so the LPA is drawn STOWED as T2 shows
     it; "turret" is the antenna positioner with the LPA on it (T2 items 2
     and 3: the part of the set that points), lying fore-and-aft on the
     roof, boresight +X; trained abeam, its rear elements reach 0.2 m past
     the shroud (the row has no weapon, so it seldom trains).
     CORRECTED from the old file: the old turret was the canister behind the
     cab, which no reference names; the LPA, positioner, data-link cone,
     whip and BITE antenna of T2 were missing; the shelter's rear door (T2)
     was missing.  The old reading of the canister as "the stowed mast" is
     withdrawn: T2 shows the mast on the roof.  The centre round rides
     HIGHER than the outer two (P1, P4; the old file had it the other way
     up); the launcher is over the rear deck at X -2.08 (P1; old -1.75); the
     rounds rest at 6 deg and now RAISE to fire (old: fixed, no podelev);
     the frames against the cab's rear are two ladder frames (P1), not one
     ladder; the idler is at 195 in (D1).  Kept: every D1 figure of the old
     header, the round's 5.03 m / 0.37 m / 1.21 m, the X-wing, the reel, the
     M1015's box, canister, door and rod driver, olive drab for 1969 and
     MERDC for 1985.
   NOT CONFIRMED, drawn by judgement: the frames against the M727 cab's rear
     wall (seen, not named: read as the travel rests); the deck box's port
     twin (P3 shows a box low on the port side); the shroud's rail height and
     post spacing (T1/T2 by eye); the LPA's element lengths; the canister's
     purpose (not named).  NOT DRAWN: crew, stowage, markings, numbers,
     bumper codes, the towed trailers of P5.
   PAINT (sampled colours taken to about 0.8 of their level; US redo family):
     e60 olive drab #4a5235, the M113 redo's; P6 (Vietnam) and P4/P5 (1960s)
       show the plain drab; P1 (1973) already wears camouflage patches and is
       later than the row.  The rounds a lighter drab (P1, US).
     e80 MERDC woodland on the carrier as the M113 redo draws it (forest
       green, field drab, sand, black), T3; the shelter plain green #525c48
       (T3 #66735a).  No markings.
   Team colour: exactly C.team, modest: the cab roof panel; the M727's deck-box
   tops; the M1015's shelter roof between the shroud rails.
   Nodes: "turret" (both rows), "podelev" (M727, inside the turret), seven
   "roadwheel" groups (five wheel stations, the sprocket, the idler, both
   sides each).  The geometry kit, the track rope and the wheel discs are the
   M113 redo's (js/hero/us_m113.js): the M548 runs on M113 parts.
   Model space: +X nose, +Y left (port), +Z up, metres, tracks on z = 0.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsM548 = (function () {
  "use strict";

  var ROWS = {
    nato_e60_sam:   { veh: "m727",  paint: "od",    turret: true },
    nato_e80_ewveh: { veh: "m1015", paint: "merdc", turret: true }
  };

  var TAU = Math.PI * 2, D2R = Math.PI / 180;
  var XN = 2.877, XT = -2.877;
  var XW = [1.449, 0.744, 0.039, -0.666, -1.371], RW = 0.29, ZB = 0.06, ZW = ZB + RW;
  var SPR = { x: 2.133, z: 0.55, r: 0.23 }, IDL = { x: -2.05, z: 0.45, r: 0.25 };
  var TYC = 1.08, THW = 0.19, HB = 0.86, HW = 1.27, FW = 1.345, ZD = 1.06;
  var CW = 1.24, GW = 1.20, ZS = 1.93, ZR = 2.68;

  /* -------------------------------------------------------- geometry kit (ru_shturm.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };
  /* a closed solid: the signed volume says whether the faces point out, and they are turned if not */
  function solid(bin, V, F, smooth) {
    var vol = 0, i, f, a, b, c, N = null, fn, k, q;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var flip = vol < 0;
    if (smooth) {
      N = [];
      for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
        q = [a, b, c];
        for (k = 0; k < 3; k++) { N[q[k]][0] += fn[0]; N[q[k]][1] += fn[1]; N[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < N.length; i++) N[i] = unit(N[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
  }
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  function prism(bin, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }
  /* a toothed wheel standing on the Y axis: nt teeth between radii rr and rt */
  function gear(bin, cx, y0, y1, cz, rr, rt, nt) {
    var n = nt * 4, V = [], F = [], i, t, step = TAU / nt, a, r, kk, ph = [0.05, 0.30, 0.55, 0.80], rd = [rr, rt, rt, rr];
    for (i = 0; i < n; i++) {
      t = (i / 4) | 0; kk = i % 4; a = (t + ph[kk]) * step; r = rd[kk];
      V.push([cx + r * Math.cos(a), y0, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < n; i++) V.push([V[i][0], y1, V[i][2]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (i = 0; i < n; i++) {
      t = (i + 1) % n;
      F.push([i, n + i, t], [t, n + i, n + t], [2 * n, i, t], [2 * n + 1, n + t, n + i]);
    }
    solid(bin, V, F);
  }
  function inTri(p, a, b, c) {
    var d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
    var d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
    var d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
    var neg = (d1 < -1e-12) || (d2 < -1e-12) || (d3 < -1e-12), pos = (d1 > 1e-12) || (d2 > 1e-12) || (d3 > 1e-12);
    return !(neg && pos);
  }
  function earclip(P) {
    var n = P.length, idx = [], out = [], i, k, m, area = 0, a, b, c, i0, i1, i2, ok, found, guard = 0, q;
    for (i = 0; i < n; i++) { a = P[i]; b = P[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; idx.push(i); }
    if (area < 0) idx.reverse();
    while (idx.length > 3 && guard++ < 400) {
      m = idx.length; found = false;
      for (i = 0; i < m && !found; i++) {
        i0 = idx[(i + m - 1) % m]; i1 = idx[i]; i2 = idx[(i + 1) % m];
        a = P[i0]; b = P[i1]; c = P[i2];
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-12) continue;
        ok = true;
        for (k = 0; k < m; k++) {
          q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          if (inTri(P[q], a, b, c)) { ok = false; break; }
        }
        if (ok) { out.push([i0, i1, i2]); idx.splice(i, 1); found = true; }
      }
      if (!found) break;
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    else for (i = 1; i < idx.length - 1; i++) out.push([idx[0], idx[i], idx[i + 1]]);
    return out;
  }
  /* a skin lofted through cross-section rings (same point count each), capped at both ends */
  function loft(bin, rings) {
    var m = rings.length, n = rings[0].length, V = [], F = [], i, j, k, R = [], area = 0, a, b, T, b0, ri, tr;
    for (j = 0; j < n; j++) { a = rings[0][j]; b = rings[0][(j + 1) % n]; area += a[1] * b[2] - b[1] * a[2]; }
    for (i = 0; i < m; i++) R.push(area < 0 ? rings[i].slice().reverse() : rings[i]);
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (ri = 0; ri < 2; ri++) {
      T = earclip(R[ri ? m - 1 : 0].map(function (p) { return [p[1], p[2]]; }));
      b0 = V.length;
      for (j = 0; j < n; j++) V.push(R[ri ? m - 1 : 0][j]);
      for (tr = 0; tr < T.length; tr++) {
        if (ri) F.push([b0 + T[tr][0], b0 + T[tr][1], b0 + T[tr][2]]);
        else F.push([b0 + T[tr][0], b0 + T[tr][2], b0 + T[tr][1]]);
      }
    }
    solid(bin, V, F);
  }
  /* a side profile in (x, z) thickened between y0 and y1 (need not be convex) */
  function profY(bin, pts, y0, y1) {
    var n, V = [], F = [], i, k, T, ar = 0, a, b;
    for (i = 0; i < pts.length; i++) { a = pts[i]; b = pts[(i + 1) % pts.length]; ar += a[0] * b[1] - b[0] * a[1]; }
    if (ar < 0) pts = pts.slice().reverse();
    n = pts.length;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    T = earclip(pts);
    for (i = 0; i < T.length; i++) { F.push([T[i][0], T[i][2], T[i][1]]); F.push([n + T[i][0], n + T[i][1], n + T[i][2]]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }


  function trackPath() {
    var C = [], k, p = [], i, A, B, d, L, rp, ph, n, n0 = null, nIn, a0, a1, da, s, m;
    for (k = XW.length - 1; k >= 0; k--) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: SPR.x, z: SPR.z, r: SPR.r + 0.02 });
    for (k = 0; k < XW.length; k++) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: IDL.x, z: IDL.z, r: IDL.r });
    var T = [];
    for (i = 0; i < C.length; i++) {
      A = C[i]; B = C[(i + 1) % C.length];
      d = [B.x - A.x, B.z - A.z]; L = Math.sqrt(d[0] * d[0] + d[1] * d[1]); d = [d[0] / L, d[1] / L];
      rp = [d[1], -d[0]];                                   /* right of travel = outside, for a CCW loop */
      ph = Math.asin((A.r - B.r) / L);
      n = [rp[0] * Math.cos(ph) + d[0] * Math.sin(ph), rp[1] * Math.cos(ph) + d[1] * Math.sin(ph)];
      T.push({ n: n, a: [A.x + A.r * n[0], A.z + A.r * n[1]], b: [B.x + B.r * n[0], B.z + B.r * n[1]] });
    }
    function line(P, Q) {
      var l = Math.sqrt((Q[0] - P[0]) * (Q[0] - P[0]) + (Q[1] - P[1]) * (Q[1] - P[1])), j, nn = Math.max(1, Math.round(l / 0.076));
      for (j = 1; j <= nn; j++) p.push([P[0] + (Q[0] - P[0]) * j / nn, P[1] + (Q[1] - P[1]) * j / nn]);
    }
    for (i = 0; i < C.length; i++) {
      var tin = T[(i + C.length - 1) % C.length], tout = T[i], c = C[i];
      a0 = Math.atan2(tin.n[1], tin.n[0]); a1 = Math.atan2(tout.n[1], tout.n[0]);
      da = a1 - a0;
      while (da > Math.PI) da -= TAU;
      while (da < -Math.PI) da += TAU;
      m = Math.max(1, Math.round(Math.abs(da) * c.r / 0.076));
      for (s = 0; s <= m; s++) p.push([c.x + c.r * Math.cos(a0 + da * s / m), c.z + c.r * Math.sin(a0 + da * s / m)]);
      line(tout.a, tout.b);
      p.pop();
    }
    return p;
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.035, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;
      to = (i % 2) ? 0.030 : 0.060;
      V.push([b[0] + nx * to, y1, b[1] + nz * to], [b[0] + nx * to, y0, b[1] + nz * to],
             [b[0] - nx * ti, y0, b[1] - nz * ti], [b[0] - nx * ti, y1, b[1] - nz * ti]);
    }
    for (i = 0; i < n; i++) {
      A = i * 4; B = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        a0 = A + k; a1 = A + (k + 1) % 4; b0 = B + k; b1 = B + (k + 1) % 4;
        F.push([a0, b0, a1], [a1, b0, b1]);
      }
    }
    solid(bin, V, F);
  }

  function running(B) {
    var s, k, path = trackPath();
    /* the path runs through the wheel rims: shift it so the grousers stand on z = 0 */
    belt(B.dark, path, TYC - THW, TYC + THW);
    belt(B.dark, path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      /* the road wheels' rubber tyres (the discs turn in the roadwheel groups), the axle arms */
      for (k = 0; k < XW.length; k++) {
        cylY(B.dark, XW[k], s * (TYC - 0.17), s * (TYC - 0.03), ZW, RW, 18);
        cylY(B.dark, XW[k], s * (TYC + 0.03), s * (TYC + 0.17), ZW, RW, 18);
        cylY(B.dark, XW[k], s * HB, s * (TYC - 0.17), ZW, 0.06, 8);
        bar(B.dark, [XW[k], s * (HB + 0.04), ZW], [XW[k] + 0.32, s * (HB + 0.04), ZW + 0.12], 0.07);
      }
      /* sprocket hub to the final drive, idler arm */
      cylY(B.dark, SPR.x, s * (HB - 0.02), s * (TYC - 0.12), SPR.z, 0.13, 12);
      bar(B.dark, [IDL.x, s * (HB + 0.04), IDL.z], [IDL.x + 0.34, s * (HB + 0.04), IDL.z + 0.14], 0.08);
    }
  }
  /* a road-wheel station: both wheels' outer and inner discs with hub and bolts (A2, T4) */
  function wheelDiscs(bin) {
    var s, k, a, o, side;
    for (s = -1; s <= 1; s += 2) {
      for (side = -1; side <= 1; side += 2) {
        o = s * TYC + side * 0.17;
        cyl(bin, [0, o, 0], [0, o + side * 0.02, 0], RW - 0.035, RW - 0.06, 18, false, false);
        cyl(bin, [0, o + side * 0.02, 0], [0, o + side * 0.05, 0], 0.13, 0.11, 12, true, false);
      }
      o = s * (TYC + 0.17);
      cyl(bin, [0, o + s * 0.05, 0], [0, o + s * 0.08, 0], 0.065, 0.05, 8, true, false);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        box(bin, 0.18 * Math.cos(a) - 0.016, 0.18 * Math.cos(a) + 0.016, o + s * 0.015 - 0.01, o + s * 0.035,
            0.18 * Math.sin(a) - 0.016, 0.18 * Math.sin(a) + 0.016);
      }
    }
  }
  function sprocketDiscs(bin) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      gear(bin, 0, s * TYC - 0.15, s * TYC - 0.07, 0, SPR.r - 0.03, SPR.r + 0.035, 10);
      gear(bin, 0, s * TYC + 0.07, s * TYC + 0.15, 0, SPR.r - 0.03, SPR.r + 0.035, 10);
      cyl(bin, [0, s * (TYC - 0.07), 0], [0, s * (TYC + 0.07), 0], 0.15, 0.15, 14);
      cyl(bin, [0, s * (TYC + 0.15), 0], [0, s * (TYC + 0.21), 0], 0.10, 0.08, 10);
    }
  }
  function idlerDiscs(bin) {
    var s, k, a, side, o;
    for (s = -1; s <= 1; s += 2) {
      for (side = -1; side <= 1; side += 2) {
        o = s * TYC + side * 0.17;
        cyl(bin, [0, o - side * 0.10, 0], [0, o, 0], IDL.r - 0.01, IDL.r - 0.01, 18);
        for (k = 0; k < 6; k++) {
          a = (k + 0.5) / 6 * TAU;
          box(bin, 0.15 * Math.cos(a) - 0.045, 0.15 * Math.cos(a) + 0.045, side > 0 ? o : o - 0.006, side > 0 ? o + 0.006 : o,
              0.15 * Math.sin(a) - 0.045, 0.15 * Math.sin(a) + 0.045);
        }
      }
      cyl(bin, [0, s * (TYC + 0.17), 0], [0, s * (TYC + 0.22), 0], 0.08, 0.065, 8);
    }
  }

  /* ------------------------------------------------------------------ paint */
  var PAINT = {
    od:    { key: "m548_od", base: "#4a5235", blots: [["#525a3c", 9, 55], ["#40472e", 9, 45]], seed: 1969, soft: true },
    merdc: { key: "m548_merdc", base: "#4a5537", blots: [["#6b5b40", 9, 34], ["#a7946c", 7, 20], ["#1d1d19", 9, 10]], seed: 1985 }
  };
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* one tile is 2.94 m of surface (UVs are 0.34 per metre), as the M113 redo */
  function paintTex(THREE, P) {
    if (_tex[P.key] !== undefined) return _tex[P.key];
    var t = null;
    try {
      var W = 256, cv = document.createElement("canvas");
      cv.width = W; cv.height = W;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, a, x, y, rr, ang, rd, j, ox, oy;
      q.fillStyle = P.base; q.fillRect(0, 0, W, W);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k][0];
        q.globalAlpha = P.soft ? 0.40 : 1;
        for (i = 0; i < P.blots[k][1]; i++) {
          x = R() * W; y = R() * W; rr = P.blots[k][2] * (0.7 + R() * 0.6);
          for (ox = -W; ox <= W; ox += W) for (oy = -W; oy <= W; oy += W) {
            if (x + ox < -rr * 2 || x + ox > W + rr * 2 || y + oy < -rr * 2 || y + oy > W + rr * 2) continue;
            q.beginPath();
            for (a = 0; a < 9; a++) {
              ang = a / 9 * TAU; rd = rr * (0.6 + ((Math.sin(a * 2.3 + i * 1.7 + k) + 1) * 0.3));
              j = [x + ox + Math.cos(ang) * rd * 1.5, y + oy + Math.sin(ang) * rd];
              if (a === 0) q.moveTo(j[0], j[1]); else q.lineTo(j[0], j[1]);
            }
            q.closePath(); q.fill();
          }
        }
      }
      q.globalAlpha = 1;
      /* panel seams, rain streaks, chips */
      q.strokeStyle = "rgba(18,20,14,0.28)"; q.lineWidth = 1.1;
      for (i = 0; i < 3; i++) { q.beginPath(); q.moveTo(i * 85 + 30.5, 0); q.lineTo(i * 85 + 30.5, W); q.stroke(); }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * W, R() * W, 1 + R() * 3, 8 + R() * 36);
      }
      for (i = 0; i < 40; i++) { q.fillStyle = "rgba(10,10,8,0.18)"; q.fillRect(R() * W, R() * W, 2, 2); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.key] = t;
    return t;
  }
  function materials(THREE, C, V) {
    var T = {}, P = PAINT[V.paint], tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    /* the M727's rounds, a lighter drab than the carrier (P1); the M1015's shelter, plain green (T3) */
    if (V.veh === "m727") T.round = new THREE.MeshStandardMaterial({ color: 0x5f6248, roughness: 0.6, metalness: 0.12 });
    else T.shel = new THREE.MeshStandardMaterial({ color: 0x525c48, roughness: 0.86, metalness: 0.05 });
    return T;
  }
  function bins(T) {
    var B = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
    if (T.shel) B.shel = new Bin(T.shel, false);
    return B;
  }

  /* ------------------------------------------------------------------ hull */
  /* a station ring: the belly between the tracks, up the tunnel wall to the fender line, out to
     the body side, up to the deck */
  function ring(x, zb, zf, zt) {
    var half = [[HB, zb], [HB, zf], [HW - 0.02, zf], [HW, zf + 0.03], [HW, zt - 0.02], [HW - 0.02, zt]], r = [], i;
    for (i = 0; i < half.length; i++) r.push([x, -half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, half[i][0], half[i][1]]);
    return r;
  }
  /* D1: the bow (lower front plate down to 1.10, the lower glacis under it to the sprocket), the
     flat belly at 16 in, the 13.5 deg departure up to the tail */
  var STATIONS = [[XT, 0.62, 0.84, ZD], [-2.70, 0.52, 0.84, ZD], [-2.40, 0.42, 0.84, ZD], [1.95, 0.41, 0.84, ZD],
                  [2.25, 0.50, 0.86, ZD], [2.55, 0.68, 0.92, ZD], [2.78, 0.90, 0.98, ZD + 0.02], [XN, 0.96, 1.00, ZD + 0.04]];
  function hull(B) {
    var s, k, i, st = [], x;
    for (i = 0; i < STATIONS.length; i++) st.push(ring(STATIONS[i][0], STATIONS[i][1], STATIONS[i][2], STATIONS[i][3]));
    loft(B.paint, st);
    running(B);
    for (s = -1; s <= 1; s += 2) {
      /* the fender ledge over the track from end to end (D1, P6, T3), its lip */
      box(B.paint, -2.80, 2.60, s > 0 ? HW - 0.01 : -FW, s > 0 ? FW : -HW + 0.01, 0.86, 0.90);
      box(B.dark, -2.78, 2.58, s > 0 ? FW - 0.004 : -FW - 0.006, s > 0 ? FW + 0.006 : -FW + 0.004, 0.865, 0.885);
      /* fender ends turned down at the sprocket and the tail */
      box(B.paint, 2.50, 2.62, s > 0 ? HW : -FW, s > 0 ? FW : -HW, 0.80, 0.90);
      box(B.paint, -2.84, -2.74, s > 0 ? HW : -FW, s > 0 ? FW : -HW, 0.72, 0.90);
      /* bolt heads along the hull side over the fender */
      for (k = 0; k < 14; k++) {
        x = -2.55 + k * 0.38;
        box(B.dark, x - 0.02, x + 0.02, s > 0 ? HW : -HW - 0.012, s > 0 ? HW + 0.012 : -HW, 0.94, 0.97);
      }
      /* tail: lamp, tow pintle plates, the lifting eye (D1, T2) */
      box(B.dark, XT - 0.03, XT + 0.01, s * 1.10 - 0.08, s * 1.10 + 0.08, 0.92, 1.02);
      box(B.glass, XT - 0.04, XT - 0.02, s * 1.10 - 0.05, s * 1.10 + 0.05, 0.95, 0.99);
      box(B.dark, XT - 0.09, XT, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.70, 0.84);
      cylY(B.dark, XT - 0.06, s * 0.55 - 0.075, s * 0.55 + 0.075, 0.77, 0.04, 8);
    }
    /* the tail plate's seam and the departure plate's weld line */
    box(B.dark, XT - 0.012, XT + 0.002, -HW + 0.05, HW - 0.05, 0.84, 0.855);
  }

  /* ------------------------------------------------------------------- cab */
  /* side profile (X, Z) of the cab: front plate, windscreen raked 14 deg to the roof, then the
     roof and rear wall the variant has */
  function cabProfile(V) {
    var p = [[XN - 0.02, ZD], [XN - 0.02, 1.60], [XN - 0.10, ZS], [XN - 0.24, ZR]];
    if (V.veh === "m727") p.push([1.80, ZR], [0.89, 2.20], [0.89, ZD]);
    else p.push([1.43, ZR], [1.43, ZD]);
    return p;
  }
  /* a point on the windscreen plane: t 0 at the sill, 1 at the roof */
  function wsPt(t, y, h) {
    var x0 = XN - 0.10, x1 = XN - 0.24, dx = x1 - x0, dz = ZR - ZS, l = Math.sqrt(dx * dx + dz * dz);
    return [x0 + dx * t + (dz / l) * h, y, ZS + dz * t - (dx / l) * h];
  }
  function onWs(bin, t0, t1, y0, y1, h0, h1) {
    hexa(bin, [wsPt(t0, y0, h0), wsPt(t0, y1, h0), wsPt(t0, y1, h1), wsPt(t0, y0, h1),
               wsPt(t1, y0, h0), wsPt(t1, y1, h0), wsPt(t1, y1, h1), wsPt(t1, y0, h1)]);
  }
  function cab(B, V) {
    var p = cabProfile(V), s, k, hi = [], i, big = V.veh !== "m727", xr = p[p.length - 1][0];
    /* the body below the window line full width, the greenhouse above it a step in (D1 rear view) */
    profY(B.paint, [[XN - 0.02, ZD], [XN - 0.02, 1.60], [XN - 0.10, ZS], [xr, ZS], [xr, ZD]], -CW, CW);
    for (i = 0; i < p.length; i++) if (p[i][1] >= ZS - 1e-6) hi.push(p[i]);
    hi.push([hi[hi.length - 1][0], ZS - 0.01]);
    hi.unshift([p[2][0], ZS - 0.01]);
    profY(B.paint, hi, -GW, GW);
    /* the drip rail round the roof edge */
    box(B.dark, (V.veh === "m727" ? 1.80 : 1.43), XN - 0.24, -GW - 0.02, GW + 0.02, ZR - 0.03, ZR - 0.005);
    /* the windscreen: three panes in frames (P2, P6, T3) */
    var ys = [[-1.10, -0.40], [-0.35, 0.35], [0.40, 1.10]];
    for (k = 0; k < 3; k++) {
      onWs(B.dark, 0.05, 0.94, ys[k][0] - 0.03, ys[k][1] + 0.03, 0.0, 0.012);
      onWs(B.glass, 0.07, 0.92, ys[k][0], ys[k][1], 0.012, 0.02);
    }
    /* wipers over the two outer panes */
    for (s = -1; s <= 1; s += 2) bar(B.dark, wsPt(0.85, s * 0.75, 0.03), wsPt(0.25, s * 0.60, 0.03), 0.015);
    /* the front plate: a lamp housing in each corner, a lens and a blackout lamp (P2, P6, T3) */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, XN - 0.04, XN + 0.07, s * 0.98, 1.40, 0.15, 16);
      cylX(B.dark, XN + 0.07, XN + 0.09, s * 0.98, 1.40, 0.13, 16);
      cylX(B.glass, XN + 0.09, XN + 0.10, s * 0.98 + s * 0.04, 1.42, 0.065, 12);
      cylX(B.glass, XN + 0.09, XN + 0.10, s * 0.98 - s * 0.06, 1.35, 0.035, 8);
      /* tow eyes low on the nose and the shackles */
      box(B.dark, XN - 0.04, XN + 0.06, s * 0.55 - 0.06, s * 0.55 + 0.06, 1.06, 1.18);
      cylY(B.dark, XN + 0.03, s * 0.55 - 0.07, s * 0.55 + 0.07, 1.12, 0.04, 8);
      /* lifting eyes on the cab front corners (D1 "lifting prov") */
      box(B.dark, XN - 0.20, XN - 0.10, s * (CW - 0.12) - 0.04, s * (CW - 0.12) + 0.04, ZS, ZS + 0.09);
    }
    /* the horizontal stiffener across the front plate, the hinge line of the cab's front panel */
    box(B.paint, XN - 0.02, XN + 0.04, -CW + 0.30, CW - 0.30, 1.50, 1.56);
    box(B.dark, XN - 0.02, XN + 0.01, -CW + 0.05, CW - 0.05, 1.60, 1.625);
    /* the doors: outline, the window, handle and step (P1, P6, T1) */
    var wx0 = big ? 1.70 : 1.84, wx1 = big ? 2.52 : 2.58, wz0 = big ? 1.98 : 2.07, wz1 = big ? 2.58 : 2.56;
    for (s = -1; s <= 1; s += 2) {
      var yo = s * GW, yd = s * CW;
      box(B.dark, wx0 - 0.04, wx1 + 0.04, yo - 0.012, yo + 0.012, wz0 - 0.04, wz1 + 0.04);
      box(B.glass, wx0, wx1, yo - 0.018, yo + 0.018, wz0, wz1);
      /* door seams fore and aft, and the sill */
      box(B.dark, wx0 - 0.06, wx0 - 0.04, yd - 0.01, yd + 0.01, 1.12, ZS);
      box(B.dark, wx1 + 0.04, wx1 + 0.06, yd - 0.01, yd + 0.01, 1.12, ZS);
      box(B.dark, wx0 - 0.06, wx1 + 0.06, yd - 0.01, yd + 0.01, 1.11, 1.13);
      box(B.dark, wx0 + 0.05, wx0 + 0.22, yd - 0.035, yd + 0.035, 1.70, 1.73);
      box(B.dark, wx0 + 0.10, wx1 - 0.10, s * (FW - 0.02), s * FW, 0.90, 0.93);
      if (V.veh === "m727") {
        /* the louvred panel behind the door (P1, P5) and its frame */
        box(B.dark, 0.94, 1.71, yd - 0.012, yd + 0.012, 1.42, 1.94);
        for (k = 0; k < 7; k++) box(B.paint, 0.97, 1.68, yd - 0.03, yd + 0.03, 1.47 + k * 0.066, 1.49 + k * 0.066);
      } else {
        /* the cab's rear quarter: a small grille low behind the door (T3) */
        box(B.dark, 1.50, 1.62, yd - 0.012, yd + 0.012, 1.25, 1.45);
      }
    }
    /* team panel on the flat of the roof */
    box(B.team, 2.00, 2.55, -0.55, 0.55, ZR, ZR + 0.012);
    /* a whip base on the right front corner of the roof (P1) */
    cylZ(B.dark, 2.45, -1.05, ZR, ZR + 0.08, 0.04, 8);
    cylZ(B.dark, 2.45, -1.05, ZR + 0.08, ZR + 0.55, 0.012, 5);
  }

  /* ------------------------------------------------------------- the M727 */
  /* the open rear deck and what stands on it (P1, P3) */
  function m727Deck(B) {
    var s, k, x;
    /* the deck plate, treadplate dark, and a raised rim at the tail */
    box(B.dark, XT + 0.02, 0.89, -HW + 0.02, HW - 0.02, ZD, ZD + 0.012);
    box(B.paint, XT, XT + 0.10, -HW, HW, ZD, ZD + 0.14);
    /* the equipment boxes either side, short of the turntable (P1 starboard, P3 port) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.85, -0.83, s > 0 ? 0.62 : -HW + 0.02, s > 0 ? HW - 0.02 : -0.62, ZD, 1.47);
      box(B.dark, -1.84, -0.84, s > 0 ? 0.63 : -HW + 0.03, s > 0 ? HW - 0.03 : -0.63, 1.47, 1.48);
      box(B.team, -1.70, -0.98, s > 0 ? 0.80 : -1.10, s > 0 ? 1.10 : -0.80, 1.48, 1.49);
      /* hasps on the lids */
      for (k = 0; k < 2; k++) box(B.dark, -1.55 + k * 0.5, -1.47 + k * 0.5, s * (HW - 0.02) - 0.012, s * (HW - 0.02) + 0.012, 1.36, 1.44);
      /* the two ladder frames standing on the deck against the cab's rear, each two rails 0.42 m
         apart leaning forward to tops 2.5 m up, rungs between (P1, P3) */
      var yy = s * 0.55, xf = [-0.30, 0.12], xt = [0.30, 0.72], ZT = 2.50;
      for (k = 0; k < 2; k++) bar(B.dark, [xf[k], yy, ZD + 0.01], [xt[k], yy, ZT], 0.05);
      for (k = 1; k < 7; k++) {
        var f = k / 7, zz = ZD + (ZT - ZD) * f;
        bar(B.dark, [xf[0] + (xt[0] - xf[0]) * f, yy, zz], [xf[1] + (xt[1] - xf[1]) * f, yy, zz], 0.035);
      }
      /* the stay from the frame's top to the cab's rear wall */
      bar(B.dark, [xt[1], yy, ZT - 0.05], [0.90, yy, 2.20], 0.04);
    }
    /* the cab's rear wall: a hatch and its hinges */
    box(B.dark, 0.875, 0.89, -0.40, 0.40, 1.25, 1.95);
    /* the reel behind the tail on two arms, axle across (P1, P3) */
    var RX = -3.42, RZ = 0.50;
    cylY(B.dark, RX, -0.30, 0.30, RZ, 0.045, 10);
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [XT, s * 0.32, 0.78], [RX, s * 0.32, RZ], 0.08);
      bar(B.dark, [XT, s * 0.32, 0.50], [RX + 0.12, s * 0.32, RZ - 0.04], 0.06);
      cyl(B.paint, [RX, s * 0.22, RZ], [RX, s * 0.26, RZ], 0.45, 0.45, 24);
      cyl(B.dark, [RX, s * 0.26, RZ], [RX, s * 0.29, RZ], 0.12, 0.10, 12);
    }
    cyl(B.dark, [RX, -0.22, RZ], [RX, 0.22, RZ], 0.33, 0.33, 20);
    /* the deck's tie-down rings */
    for (x = -2.6; x < 0.6; x += 1.0) for (s = -1; s <= 1; s += 2) box(B.dark, x - 0.04, x + 0.04, s * (HW - 0.10) - 0.04, s * (HW - 0.10) + 0.04, ZD, ZD + 0.03);
  }

  /* One MIM-23 round in the pod's frame: axis along +X from the tail (x0) to the nose, through
     (y, z); 5.03 m, 0.37 m body, a boat-tail, a long ogive radome, four long-chord clipped-delta
     wings in an X from 0.47 m to 2.92 m ahead of the tail, 1.21 m span (P1-P3, en.wikipedia
     "MIM-23 Hawk").  rot: the stow pitch about the pod's origin. */
  function hawk(RB, D, x0, y, z, rot) {
    var c = Math.cos(rot), sn = Math.sin(rot);
    function P(x, yy, zz) { var xa = x0 + x, za = z + zz; return [xa * c - za * sn, y + yy, xa * sn + za * c]; }
    var prof = [[0.0, 0.0], [0.0, 0.14], [0.30, 0.185], [3.30, 0.185], [3.60, 0.180], [3.95, 0.160],
                [4.30, 0.125], [4.62, 0.080], [4.88, 0.035], [5.03, 0.004], [5.03, 0.0]];
    var seg = 12, i, j, rings = [];
    for (i = 1; i < prof.length - 1; i++) {
      var r = [];
      for (j = 0; j < seg; j++) {
        var a = j / seg * TAU;
        r.push(P(prof[i][0], Math.cos(a) * prof[i][1], Math.sin(a) * prof[i][1]));
      }
      rings.push(r);
    }
    /* the lofted body, capped by the tail disc and at the radome's point */
    loft(RB, rings);
    /* the nozzle ring at the tail */
    cyl(D, P(-0.02, 0, 0), P(0.06, 0, 0), 0.10, 0.12, 10);
    /* the wings: root 0.47-2.92, tip chord 0.40 at 0.605 from the axis, 2 cm thick */
    for (j = 0; j < 4; j++) {
      var a2 = Math.PI / 4 + j * Math.PI / 2, ca = Math.cos(a2), sa = Math.sin(a2);
      var pts = [[0.47, 0.17], [2.92, 0.17], [0.87, 0.605], [0.47, 0.605]], V = [], k;
      for (k = 0; k < 4; k++) {
        var q = pts[k];
        V.push(P(q[0], ca * q[1] - sa * 0.01, sa * q[1] + ca * 0.01));
      }
      for (k = 0; k < 4; k++) {
        var q2 = pts[k];
        V.push(P(q2[0], ca * q2[1] + sa * 0.01, sa * q2[1] - ca * 0.01));
      }
      hexa(RB, V);
    }
    /* the joint ring behind the radome and the band at the motor's front */
    cyl(D, P(3.28, 0, 0), P(3.32, 0, 0), 0.188, 0.188, 12, true, true);
    cyl(D, P(2.30, 0, 0), P(2.33, 0, 0), 0.188, 0.188, 12, true, true);
  }

  /* the launcher over the rear deck: turntable, pedestal and trunnion housing (the turret,
     origin the ring centre on the deck), the yoke, arms and rounds (the pod, origin the trunnion) */
  var TRN = 0.79, STOW = 6 * D2R, EL = 18 * D2R;
  var RY = [0.70, -0.70, 0.0], RZ = [0.62, 0.62, 0.98], RTAIL = -2.00;
  function m727Turret(TB) {
    var s, k, a;
    cyl(TB.dark, [0, 0, 0], [0, 0, 0.10], 0.62, 0.62, 24);
    cyl(TB.paint, [0, 0, 0.10], [0, 0, 0.32], 0.55, 0.50, 20);
    for (k = 0; k < 12; k++) {
      a = k / 12 * TAU;
      box(TB.dark, 0.52 * Math.cos(a) - 0.03, 0.52 * Math.cos(a) + 0.03, 0.52 * Math.sin(a) - 0.03, 0.52 * Math.sin(a) + 0.03, 0.10, 0.14);
    }
    /* the pedestal: a column with the trunnion housing on it, a control box on its port side */
    box(TB.paint, -0.75, 0.55, -0.52, 0.52, 0.32, 0.66);
    box(TB.dark, -0.76, 0.56, -0.53, 0.53, 0.44, 0.46);
    prism(TB.paint, [[-0.50, -0.30], [0.30, -0.30], [0.42, -0.18], [0.42, 0.18], [0.30, 0.30], [-0.50, 0.30]], 0.66, TRN - 0.06);
    /* the launcher's electronics boxes on the head's rear, under the rounds' tails (P1) */
    box(TB.dark, -1.05, -0.75, -0.42, 0.42, 0.36, 0.60);
    box(TB.dark, 0.0, 0.32, 0.40, 0.58, 0.36, 0.62);
    box(TB.dark, -0.40, -0.10, -0.58, -0.40, 0.40, 0.58);
    for (s = -1; s <= 1; s += 2) {
      /* trunnion cheeks and bearings */
      box(TB.paint, -0.16, 0.16, s * 0.30, s * 0.42, TRN - 0.20, TRN + 0.10);
      cylY(TB.dark, 0, s * 0.42, s * 0.50, TRN, 0.10, 12);
      /* elevating ram from the column to the yoke, its body (the rod is on the pod) */
      bar(TB.dark, [0.30, s * 0.22, 0.40], [0.36, s * 0.22, TRN - 0.10], 0.09);
    }
  }
  function m727Pod(PB) {
    var i, s, cells = [], c = Math.cos(STOW), sn = Math.sin(STOW);
    function P(x, y, z) { return [x * c - z * sn, y, x * sn + z * c]; }
    /* the yoke round the trunnion and the cross-beam the outer arms ride on */
    var yoke = [[-0.25, -0.38, -0.10], [0.25, -0.38, -0.10], [0.25, 0.38, -0.10], [-0.25, 0.38, -0.10],
                [-0.25, -0.38, 0.16], [0.25, -0.38, 0.16], [0.25, 0.38, 0.16], [-0.25, 0.38, 0.16]];
    hexa(PB.paint, yoke.map(function (q) { return P(q[0], q[1], q[2]); }));
    function slab(bin, x0, x1, y0, y1, z0, z1) {
      hexa(bin, [P(x0, y0, z0), P(x1, y0, z0), P(x1, y1, z0), P(x0, y1, z0), P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]);
    }
    slab(PB.paint, -0.18, 0.18, -0.90, 0.90, 0.12, 0.30);
    /* the spine from the yoke back under the rounds, the arms' rear cross-beam rides on it (P1) */
    slab(PB.dark, -1.30, 0.25, -0.22, 0.22, -0.05, 0.14);
    slab(PB.dark, -1.30, -1.18, -0.90, 0.90, 0.12, 0.28);
    for (i = 0; i < 3; i++) {
      var y = RY[i], zr = RZ[i] - 0.185;
      /* the arm (launch beam) under the round, with its two shoes, and its post to the cross-beam */
      slab(PB.dark, -1.40, 1.55, y - 0.07, y + 0.07, zr - 0.17, zr - 0.05);
      slab(PB.paint, -1.25, -1.05, y - 0.09, y + 0.09, zr - 0.06, zr);
      slab(PB.paint, 0.95, 1.15, y - 0.09, y + 0.09, zr - 0.06, zr);
      slab(PB.dark, -0.12, 0.12, y - 0.06, y + 0.06, 0.28, zr - 0.15);
      slab(PB.dark, -1.29, -1.19, y - 0.05, y + 0.05, 0.26, zr - 0.15);
      /* the umbilical box at the arm's front */
      slab(PB.paint, 0.20, 0.55, y - 0.10, y + 0.10, zr - 0.30, zr - 0.15);
      hawk(PB.round, PB.dark, RTAIL, y, RZ[i], STOW);
      var m = P(RTAIL + 5.03, y, RZ[i]);
      cells.push([m[0], m[1], m[2], P(RTAIL, y, RZ[i])[0]]);
    }
    /* the ram rods to the yoke */
    for (s = -1; s <= 1; s += 2) bar(PB.dark, P(0.36, s * 0.22, -0.10), P(0.30, s * 0.22, 0.14), 0.05);
    return cells;
  }

  /* ------------------------------------------------------------- the M1015 */
  var SF = 0.50, SR = -2.48, SW = 1.22, SZ = 3.30;
  function m1015Body(B) {
    var s, k, x;
    /* the bed floor, the walls with their five panels (T1), the tailgate with four (T2) */
    box(B.dark, XT + 0.02, 1.43, -HW + 0.02, HW - 0.02, ZD, ZD + 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, XT, 1.43, s > 0 ? HW - 0.04 : -HW, s > 0 ? HW : -HW + 0.04, ZD, ZS);
      box(B.paint, XT, 1.43, s > 0 ? HW - 0.06 : -HW - 0.02, s > 0 ? HW + 0.02 : -HW + 0.06, ZS - 0.05, ZS);
      for (k = 0; k < 5; k++) {
        x = 0.30 - k * 0.60;
        box(B.dark, x - 0.27, x + 0.27, s * HW - 0.006, s * HW + 0.006, 1.48, 1.84);
        box(B.paint, x - 0.25, x + 0.25, s * HW - 0.012, s * HW + 0.012, 1.50, 1.82);
      }
      /* the bed's lifting eye and a hasp */
      box(B.dark, -2.70, -2.58, s * HW - 0.03, s * HW + 0.03, ZS - 0.12, ZS);
    }
    box(B.paint, XT, XT + 0.05, -HW, HW, ZD, ZS);
    for (k = 0; k < 4; k++) {
      var y0 = -1.12 + k * 0.57;
      box(B.dark, XT - 0.006, XT + 0.01, y0, y0 + 0.50, 1.48, 1.84);
      box(B.paint, XT - 0.012, XT + 0.01, y0 + 0.02, y0 + 0.48, 1.50, 1.82);
    }
    /* the box between the cab and the shelter, the canister on its port half with two straps (T1, T3) */
    box(B.shel, 0.56, 1.43, -1.18, 1.18, ZD, 2.36);
    box(B.dark, 0.58, 1.41, -1.19, 1.19, 2.36, 2.38);
    cylX(B.shel, 0.52, 1.50, 0.42, 2.60, 0.21, 16);
    cylX(B.dark, 1.50, 1.53, 0.42, 2.60, 0.17, 14);
    for (k = 0; k < 2; k++) cylX(B.dark, 0.72 + k * 0.56, 0.78 + k * 0.56, 0.42, 2.60, 0.215, 16);
    box(B.dark, 0.60, 1.40, 0.24, 0.60, 2.38, 2.42);
    /* the shelter (T1-T3) */
    box(B.shel, SR, SF, -SW, SW, ZD, SZ);
    box(B.dark, SR - 0.01, SF + 0.01, -SW - 0.01, SW + 0.01, SZ - 0.04, SZ - 0.02);
    /* side door on the port side with its hatch and handles (T1, T3) */
    box(B.dark, -1.45, -0.80, SW, SW + 0.012, 1.98, 3.05);
    box(B.shel, -1.42, -0.83, SW + 0.012, SW + 0.02, 2.01, 3.02);
    box(B.dark, -1.30, -0.95, SW + 0.02, SW + 0.026, 2.40, 2.85);
    for (k = 0; k < 2; k++) box(B.dark, -1.40, -1.36, SW + 0.02, SW + 0.05, 2.25 + k * 0.55, 2.35 + k * 0.55);
    /* the rear door, its hatch, hinges and handle (T2) */
    box(B.dark, SR - 0.012, SR, -0.17, 1.00, 1.96, 3.12);
    box(B.shel, SR - 0.02, SR - 0.012, -0.14, 0.97, 1.99, 3.09);
    box(B.dark, SR - 0.026, SR - 0.02, 0.05, 0.70, 2.35, 2.85);
    for (k = 0; k < 2; k++) box(B.dark, SR - 0.05, SR, 0.92, 0.99, 2.15 + k * 0.75, 2.27 + k * 0.75);
    box(B.dark, SR - 0.06, SR, -0.10, 0.10, 2.20, 2.24);
    /* corner castings on the shelter and two cable entries on its front */
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      x = k ? SR : SF;
      box(B.dark, x - 0.05, x + 0.05, s * SW - 0.05, s * SW + 0.05, SZ - 0.10, SZ + 0.01);
    }
    cylX(B.dark, SF, SF + 0.08, -0.60, 2.70, 0.06, 8);
    cylX(B.dark, SF, SF + 0.08, -0.85, 2.70, 0.06, 8);
    /* a grille low on the hull side behind the cab (T3) */
    box(B.dark, 0.70, 1.05, -HW - 0.012, -HW, 1.20, 1.45);
    /* the ground-rod driver on the starboard bow: mount, mast, hammer, rod (T1, T3) */
    box(B.paint, XN - 0.06, XN + 0.22, -1.12, -0.86, 1.06, 1.30);
    box(B.dark, XN + 0.14, XN + 0.26, -1.05, -0.93, 0.70, 3.00);
    box(B.paint, XN + 0.10, XN + 0.30, -1.10, -0.88, 1.60, 2.05);
    cylZ(B.dark, XN + 0.20, -0.99, 0.30, 0.70, 0.025, 6);
    /* team panel on the shelter roof, behind the stowed antenna */
    box(B.team, -2.35, -1.95, -0.90, 0.90, SZ, SZ + 0.012);
  }
  /* the antenna shroud: tube rails on posts round the roof, reaching forward over the cab on
     braces from the shelter's front wall (T1, T2); the fixed antennas inside it (T2) */
  function shroud(B) {
    var s, k, x, Z1 = SZ + 0.38, Z0 = SZ + 0.20, X0 = SR - 0.04, X1 = 2.40, Y = SW + 0.02;
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, X0, X1, s * Y, Z1, 0.03, 6);
      cylX(B.dark, X0, X1, s * Y, Z0, 0.025, 6);
      for (k = 0; k < 6; k++) {
        x = X0 + 0.02 + k * (SF - X0 - 0.04) / 3;
        if (x > SF + 0.01) x = SF + (k - 3) * 0.95;
        if (x <= SF + 0.01) cylZ(B.dark, x, s * Y, SZ, Z1, 0.025, 6);
        else cylZ(B.dark, x, s * Y, Z0, Z1, 0.02, 6);
      }
      /* braces from the shelter's front top corners forward and up to the rails over the cab */
      bar(B.dark, [SF, s * Y, SZ - 0.30], [SF + 1.10, s * Y, Z0], 0.05);
    }
    for (k = 0; k < 7; k++) {
      x = X0 + k * (X1 - X0) / 6;
      cylY(B.dark, x, -Y, Y, Z1, 0.025, 6);
    }
    /* the pneumatic component box at the front port corner (T2 1) */
    box(B.shel, 0.00, 0.45, 0.55, 1.10, SZ, SZ + 0.32);
    box(B.dark, 0.00, 0.45, 0.55, 1.10, SZ + 0.32, SZ + 0.34);
    /* the stowed mast lying on the roof from its foot near the rear (T2 5) */
    box(B.dark, -2.40, -2.20, -0.12, 0.12, SZ, SZ + 0.16);
    cylX(B.paint, -2.30, -1.05, 0.0, SZ + 0.10, 0.07, 10);
    cylX(B.dark, -1.05, -0.95, 0.0, SZ + 0.10, 0.075, 10);
    /* the data-link mast and its cone at the rear port corner (T2 8, 9) */
    cylZ(B.dark, -2.25, 1.00, SZ, SZ + 0.12, 0.07, 10);
    cyl(B.shel, [-2.25, 1.00, SZ + 0.12], [-2.25, 1.00, SZ + 0.52], 0.24, 0.04, 16);
    cylZ(B.dark, -2.25, 1.00, SZ + 0.52, SZ + 0.54, 0.12, 12);
    /* the BITE antenna and the WRC-46 whip at the rear starboard corner (T2 6, 7) */
    box(B.dark, -2.10, -1.80, -0.90, -0.84, SZ, SZ + 0.05);
    cylZ(B.dark, -2.30, -1.02, SZ, SZ + 0.14, 0.05, 8);
    cylZ(B.dark, -2.30, -1.02, SZ + 0.14, SZ + 0.50, 0.012, 5);
  }
  /* the LPA on its positioner, stowed: the positioner on the end of the lying mast, the array
     lying fore-and-aft, its short elements forward (boresight +X) */
  function lpaTurret(TB) {
    var k, x, h;
    box(TB.dark, -0.20, 0.20, -0.18, 0.18, -0.02, 0.14);
    cylZ(TB.paint, 0, 0, 0.14, 0.22, 0.16, 12);
    /* the boom pair and the elements */
    for (k = -1; k <= 1; k += 2) cylX(TB.dark, -1.10, 1.25, k * 0.035, 0.27, 0.025, 6);
    for (k = 0; k < 11; k++) {
      x = -1.05 + k * 0.225;
      h = 0.95 - k * 0.07;
      cylY(TB.paint, x, -h, h, 0.27 + ((k & 1) ? 0.03 : -0.03), 0.02, 6);
    }
    box(TB.dark, -0.12, 0.12, -0.08, 0.08, 0.20, 0.30);
  }

  /* ----------------------------------------------------------------- build */
  function build(key, THREE, M, C) {
    var V = ROWS[key], T = materials(THREE, C, V), g = new THREE.Group(), B = bins(T), i, k, b, pos, wg, tg, TB, PB, E, cells;
    g.name = key;
    hull(B);
    cab(B, V);
    if (V.veh === "m727") m727Deck(B);
    else { m1015Body(B); shroud(B); }
    var hg = new THREE.Group(); hg.name = "hull";
    flush(THREE, hg, B);
    g.add(hg);
    /* the road-wheel stations, the sprocket and the idler: each both sides, spun about their axles */
    pos = XW.map(function (x) { return [x, ZW, 0]; }).concat([[SPR.x, SPR.z, 1], [IDL.x, IDL.z, 2]]);
    for (i = 0; i < pos.length; i++) {
      var WB = { w: new Bin(pos[i][2] === 1 ? T.dark : T.paint, pos[i][2] !== 1) };
      if (pos[i][2] === 0) wheelDiscs(WB.w); else if (pos[i][2] === 1) sprocketDiscs(WB.w); else idlerDiscs(WB.w);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(pos[i][0], 0, pos[i][1]);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    tg = new THREE.Group();
    if (V.turret) tg.name = "turret";
    if (V.veh === "m727") {
      m727Turret(TB);
      tg.position.set(-2.08, 0, ZD);
      flush(THREE, tg, TB);
      PB = { round: new Bin(T.round, false), dark: new Bin(T.dark, false), paint: new Bin(T.paint, true) };
      cells = m727Pod(PB);
      E = new THREE.Group();
      E.name = "podelev";
      E.position.set(0, 0, TRN);
      flush(THREE, E, PB);
      E.userData.cells = cells;
      E.userData.el = EL;
      tg.add(E);
    } else {
      lpaTurret(TB);
      tg.position.set(-0.95, 0, SZ + 0.02);
      flush(THREE, tg, TB);
    }
    g.add(tg);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, rows: ROWS };
})();

(function () {
  var k, rows = HeroUsM548.rows;
  /* len: the measured X extent of each build over both poses (tools/model3d/dump.js) */
  var LEN = { m727: 7.18, m1015: 6.15 };
  function reg(key, len) {
    UNIT_MODELS[key] = { len: len, build: function (THREE, M, C) { return HeroUsM548.build(key, THREE, M, C); } };
  }
  for (k in rows) if (Object.prototype.hasOwnProperty.call(rows, k)) reg(k, LEN[rows[k].veh]);
})();
