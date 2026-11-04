/* ===== eu_sams.js - HERO models: British and French surface-to-air missile launchers =====
   Seven rows, six launchers, one module each (all share the geometry kit HeroEuSamKit at the top):
     gbr_e50_sam   Bloodhound Mk 1 ground launcher, one round          HeroBloodhound      turret, deploy
     gbr_e60_sam   Rapier (FSA/FSB) towed launcher, four rounds         HeroRapierTowed     turret, deploy
     gbr_e80_sam   Tracked Rapier on the RCM 748 (M548-derived), eight  HeroTrackedRapier   turret, deploy
     gbr_e90_sam   Rapier FSC towed launcher, eight rounds              HeroRapierFsc       turret, deploy
     gbr_e00_sam   the same FSC launcher (in service to 2021)           HeroRapierFsc
     fra_e80_sam   Roland 2 on the AMX-30R chassis                      HeroRoland          turret, deploy
     fra_e00_sam   SAMP/T "Mamba" launcher on the Renault Kerax 8x8     HeroSampT           NOT turret, deploy
   Before this file every one of these rows borrowed the Patriot (js/hero/us_patriot.js, row sam_n):
   render3d modelKeyFor fell through to the first "sam" peer with a model.

   WHAT EACH IS BUILT ON (searched js/hero for rapier|bloodhound|roland|samp|aster|m548):
     Bloodhound, towed Rapier, Rapier FSC, SAMP/T: nothing in js/hero; built from the photographs.
     Tracked Rapier: the M548 lower hull, the five-wheel running gear with the FRONT sprocket and no
       return rollers, the station table and the track rope are COPIED from js/hero/us_m548_family.js
       (that file untouched); the armoured cab and the launcher are new.
     Roland: fra_e90_spaag ("AMX-30 Roland") has NO hero file - armour_specs.js draws it with the
       generic tank builder - so there was nothing to build on; the published 6.915 x 3.24 x 2.92 m
       of that spec row is the figure checked here.
   The geometry kit is the one of js/hero/us_m548_family.js (itself the M113 redo's): Bin, solid,
   box, bar, cyl, loft, profY, gear, flush, the canvas paint, plus XF (a rotated, moved Bin) for
   parts built along +X and then laid where they ride.

   REFERENCES (Wikimedia Commons at width 960, cached in scratchpad q_eusam_ref; text from the
   en.wikipedia articles "Bloodhound (missile)", "Rapier (missile)", "Roland (missile)", "SAMP/T",
   "Aster (missile family)", "Renault Kerax", "AMX-30"):
     BLOODHOUND
     B1 "Bristol Bloodhound Mk 1 Surface-to-Air Missile on display at the RAAF Museum.jpg" - Mk 1 on
        its trolley: white body, black radome, the upper ramjet ABOVE the body.
     B2 "Bristol Bloodhound Mk.1, NELSAM, 27 June 2015.JPG" - nose-on three-quarter: ramjets above
        and below the body, the mid wings level, four boosters at the diagonals with red caps, the
        tail fin standing up.
     B3 "Bloodhound SAMs Reforger82.jpeg" (RAF Germany 1982) - launchers raised in service: the
        pedestal, the long outrigger with its screw jack, the beam under the round, about 40 deg.
     B4 "Bristol Bloodhound Newark Museum.jpg" - near side-on on its trolley, boosters racked
        beside it: the ramjet 0.33 of the round's length and 0.67 of the body across (one station).
     B5 "Bloodhound surface-to-air missile at RAF Air Defence Radar Museum.jpg" (Neatishead) - THE
        LAUNCHER: olive pedestal and turntable, the launch beam under the rear of the round, the
        round almost level, the pedestal 0.18 of the round's length from its tail; ramjets top and
        bottom, boosters between them, the two tail fins up and down.
     B6/B7 "Bristol Bloodhound Mk.1 ... Duxford ... 2012" and "... Duxford ... 2018" - Mk 1 on a
        trolley: white body, brown radome, polished ramjets, the wing level at the side.
     RAPIER (towed)
     R2 "BAC Rapier (28135054737).jpg" (museum, set up): the four jacks splayed, the command dish
        on the starboard front, two rounds a side, the radar cover open.
     R3 "Towed Rapier SAM.jpg" (Singapore, march order behind its Land Rover): the drum with the
        domed radar cover, two rounds a side on arms raised about 15 deg, the dish, one axle.
     R4 "Duxford Imperial War Museum, Rapier guided missile system - geograph 4591515.jpg" -
        near side-on from starboard: THE TOWED TABLE below is scaled off it.
     RAPIER FSC
     F1 "Rapier missile system - Field Standard C - National Army Museum.jpg" - near side-on: low
        trailer body with chamfered ends, one big wheel, the turret: a box with the tracker ball on
        top, four rounds 2 x 2 a side on arms, the jacks.  THE FSC TABLE below.
     F3 "Rapier Field Standard C (FSC) MOD 45114028.jpg" - head on, firing: the ball, the packs.
     F4 "Soldiers Load a Rapier Missile System During London Olympics ... .jpg" - end on: the body
        about as wide as over the wheels, jacks at the corners, the ball 0.33 of the body width.
     TRACKED RAPIER
     T1 "RAF Museum Cosford - DSC08518.JPG", T2 "Tracked Rapier (50122651947).jpg" - front left:
        the full-width armoured cab over the front 55 % of the hull, the raked four-pane front, the
        armoured visor box over it, the tracker head on the roof, the smoke dischargers, the
        launcher on the rear deck with its two long missile boxes and the radar dome.
     T3 "Tracked Rapier, Tankfest 2009.jpg" - from behind: the launcher drum, the boxes with their
        doors, the dish, the dome; the hull is the M548's.
     ROLAND
     O1 "AMX-30 Roland img 2306.jpg" (Saumur) - ORTHOGONAL left side: THE ROLAND TABLE.
     O2 "AMX-30 Roland SAM, Tanks in the Musee des Blindes, France, pic-1.JPG" - right rear.
     O3 "Roland 010.jpg" (in service, head on) - the tracking dish beside the right tube, the
        search antenna standing on top.
     SAMP/T
     S1 "Systeme SAMP-T (14 juillet 2021) (1).jpg" - French launcher, front left: Renault Kerax 8x8
        (two front, two rear axles), the eight canisters 2 high x 4 wide lying over the bed with
        white caps at the front.
     S2 "2011 - BA116 Luxeuil - 02.jpg" - rear left, travelling: caps at the rear too, the pack's top
        a little over the cab roof.
     S3 "MAMBA system in Romania.jpg" - set up: the pack ERECT at the rear on its hinge, jacks down
        at the rear corners and behind the cab, the mast.

   PUBLISHED FIGURES used (en.wikipedia):
     Bloodhound Mk 1 7.7 m long; body 0.546 m; wing span 2.83 m; 2 Thor ramjets, 4 Gosling boosters
       "held together ... by a metal ring at the rear"; "the engines were mounted above and below".
     Rapier missile 2.235 m long, 0.133 m body.  The towed launcher is "a vertical cylindrical unit
       carrying two missiles on each side, the surveillance radar dish and IFF ... under a radome
       on top"; Tracked Rapier: "eight (protected) missile rails", "the optical tracker was placed
       inside the armoured cab ..., elevating through the roof for operation", on the M548 ("RCM
       748"); FSC: "The Surveillance radar was removed from the launcher ... each launcher now
       carried eight missiles".  No launcher dimensions are published there.
     Roland 2 on AMX-30R: 6.915 x 3.24 x 2.92 m (armour_specs.js fra_e90_spaag / generations.js);
       the missile 2.40 m; "two ready rounds and eight in the magazine" (eras.js).
     SAMP/T: "launchers holding eight vertically-launched Aster 30"; Aster 30 4.9 m long.  Kerax:
       "three cab options, all of which are 2300 mm wide ... between 1600 and 2200 mm long".
     M548 (Tracked Rapier): the D1 drawing figures of js/hero/us_m548_family.js.

   WHERE A DRAWING OR TEXT AND THE PHOTOS DISAGREE (settled from the photos, ratios at one station):
     Bloodhound ramjets: the brief named them "on the sides"; B1, B2, B5, B6 and B7 all show them
       ABOVE AND BELOW the body with the wings level between them, on the launcher (B5) as on the
       trolleys, and the Wikipedia text says the same.  Drawn above and below.
     Roland height: the published 2.92 m is met with the tubes level and the antenna folded (deck
       2.05 + turret 0.55 + level tubes to 2.84, O1 at 127 px/m from the published 6.915 m length,
       which O1 measures to within 0.5 %); every photograph (O1, O2, O3) shows the search antenna
       STANDING, so it is drawn standing, to 4.30 m.  The tubes rest level (O3, in service) and
       raise to the 28 deg of O1.
     Rapier wing span: the infobox gives 0.138 m, less than the 0.133 m body plus any fin; F3 (the
       round in flight) shows the wings standing out about one body diameter: drawn 0.40 m.

   TOWED TABLE (R4 at 188 px/m on the centreline, from the near missile: 401 px long and 25 px across
     agree with 2.235 x 0.133 m; the wheel plane 0.9 m nearer at 218 px/m; heights over a horizon
     read from the hangar floor):  drum centre X 0; axle X -0.73, tyre 0.78 m; drawbar eye X +3.05;
     rear frame X -1.15; drum 1.0 m across, lower drum 0.55-1.10 m, rotating head 1.10-1.75, radome
     to 2.43; at the trunnion the lower pair's axes 1.36 m and the upper pair's 1.72 m (R4's near
     lower round 1.39); rounds' tails 0.7 m behind the drum centre, laid 14 deg up at rest (R3, R4).
   FSC TABLE (F1, wheel 225 px across; F4 end on):  ball / wheel 0.82 (F1), ball / body width 0.33
     (F4), ball / body length 0.228 (F1), height / wheel 2.89 (F1) and 2.97 (F4).  Taking the
     tyre as 0.92 m: ball 0.75, body 3.3 x 2.2 m, deck 1.20, overall 2.67 m.
   TRACKED TABLE (M548 stations; T2 and T3 by the road-wheel pitch and the 2.69 m track width):
     cab from the nose to X -0.25 (T2: between the third and fourth road wheels), roof 2.45, the
     sill of the raked front 2.05; launcher turntable X -1.65; boxes 2.35 m long (the 2.235 m round
     inside), outer faces at the hull sides; dome to 2.58 (T3: 1.43 m over the deck).
   ROLAND TABLE (O1, 127 px/m; X from the hull middle, + forward):  nose 3.43, rear exhaust -3.46;
     idler X 2.57 z 0.63 r 0.33; road wheels 1.62 0.67 -0.28 -1.23 -2.18, r 0.38; sprocket -2.99
     z 0.75 r 0.30; return rollers 1.02 0.16 -0.75 -1.61 -2.40 at z 0.86; deck 1.93; the upper
     glacis from X 2.68 down to the nose at 1.22; turret box X -0.31..1.54 to 2.48; trunnion X 0.51
     z 2.24, the tube axes 0.43 m above it, the tubes 2.79 m long from 0.66 m behind it; search
     antenna 3.35-4.37 m over X +-0.35.
   SAMP/T: no published size for the launcher vehicle.  The Kerax cab's published 2.30 m width
     scales S1 (cab and pack at one station: pack width / cab width 0.96) and the pack's 1.1 m
     depth; the pack is 5.5 m long to hold the 4.9 m round; its stowed top 3.85 m (S2: 0.6 m over
     the cab roof, held under 4 m).  Axles 3.90 / 2.45 / -1.55 / -2.95, tyres 1.16 m.

   RECOGNITION LIST (drawn; where):
     Bloodhound: the long white round level on the beam; ramjets above and below, four boosters at
       the diagonals with the ring at the tail, level mid wings, two tail fins up and down (B2, B5);
       the olive pedestal and turntable, four outriggers with jacks (B3, B5).
     Rapier: the drum with the domed radome, two rounds a side, the command dish on the starboard
       front, one axle, the A drawbar, four jacks (R2, R3, R4).
     FSC: the low box trailer, one big wheel a side, the turret box with the tracker ball on top,
       four rounds 2 x 2 a side (F1, F3, F4).
     Tracked Rapier: the tall armoured cab with the raked four-pane front and the visor box, the
       tracker on the roof (raised when set up), the M548 running gear, the launcher with two long
       boxes and the dome on the rear deck (T1, T2, T3).
     Roland: the AMX-30 running gear (front idler, five wheels, five return rollers, rear sprocket),
       the raised box hull, the low turret with a tube each side, the standing search antenna, the
       tracking dish (O1, O2, O3).
     SAMP/T: the Kerax 8x8 with its square cab, the 2 x 4 canister pack lying over the bed with the
       white caps, erect at the rear to fire, the jacks (S1, S2, S3).

   POSES and NODES:
     "turret" (every row but SAMP/T, which is turret:false): the trained part, origin on its ring,
       rounds along +X.  "podelev" inside it (SAMP/T: a direct child of the root): the rounds and
       their arms or boxes, hinged at the trunnion, raised by render3d poseLauncher to userData.el
       about local Y; userData.cells = [mouth x, y, z, rear x] of every round in its frame.
     "deploypose" / "travelpose" (render3d shows one by e.deployed): towed Rapier and FSC jacks down
       / up; Tracked Rapier tracker up through the roof / down; SAMP/T jacks down / up.  Bloodhound
       and Roland put nothing out that a reference shows, so they have no pose groups.
     "roadwheel": one group per axle (wheeled) or per wheel station with both sides (tracked).
   PAINT: plain, no markings, no camouflage pattern (T1-T3, R4, O1, S1 wear disruptive patterns:
     not drawn).  The photographs are lit too unevenly to sample a base (R4 #343533 in shade, F1
     #847552 under display lamps, T3 #747c6f and O1 #94a27c in sun), so the bases are plain dark
     service greens chosen to sit with the other hero files: British #4c5236 (towed), #4d5338
     (tracked), #565c41 (FSC, a shade lighter as F1 and F4 are), RAF launcher green #4c5a3e (B5);
     Bloodhound Mk 1 round white #dcdcd4 with a dark radome (B1, B6, B7), polished ramjets, light
     boosters with red caps (B2); Rapier rounds olive #4f5434 (R4, F2); French #545a3c (Roland),
     #4d5539 (SAMP/T), Roland tubes khaki #8f8f62 (O1, O2), canister caps white (S1, S2).
     Team colour: C.team exactly, on one small plate per vehicle (the Bloodhound head, the towed
     frame's rear, the FSC deck, the Tracked Rapier and Kerax cab roofs, the Roland engine deck).
   NOT CONFIRMED (estimated from proportions, no drawing found): every launcher dimension of the
     Bloodhound beyond the round's length, body and span (pedestal 1.3 x 1.1 m, outriggers 1.7 m,
     the round's axis 2.55 m up; ramjet 2.54 x 0.37 m and booster 2.7 x 0.28 m by ratio to the body
     in B4/B5); that the Mk 1 launcher is the one of B3/B5 (B3 is RAF Germany 1982, a Mk 2 unit; B5's mark is
     not stated; no Mk 1 round on its launcher was found);
     the towed Rapier drawbar and jack positions (R4 only); the FSC tyre size (the whole FSC scales
     with it); the Tracked Rapier cab's plan chamfers, visor box, tracker head and the command dish
     (put on the housing's starboard front as on the towed launcher; T3 shows the dish, trained); the Roland turret width (1.7 m), the
     tracking dish's place (O3 only); the SAMP/T axle spacing, cab length (2.2 m, the longest Kerax
     cab) and jack places (S3 by eye); the SAMP/T pack is erected about its rear lower edge and so
     stands 1.1 m higher than S3 shows (the real arm lowers it).
   NOT DRAWN: tractors (Land Rover 101 for Rapier, the Blindfire and Dagger trailers, the radars
     and generators, the Bloodhound Type 83/86 radars), crews, cables, nets, markings, numbers.
   AS DRAWN (tools/model3d/dump.js, template pose; L x W x H, triangles, draw calls):
     gbr_e50_sam  8.09 x 3.58 x 3.44 m (the 7.7 m round plus booster nozzles; 3.58 over the
                  outriggers, the 2.83 m span inside it), 2444, 12; raised 6.65 m high.
     gbr_e60_sam  4.35 x 2.14 x 2.43 m, 4068, 12.
     gbr_e80_sam  6.04 x 2.69 x 2.67 m (the M548's 5.75 m hull plus the smoke dischargers and the
                  exhausts; 2.69 m the M548's published width over the fenders), 9772, 14.
     gbr_e90/e00  3.98 x 2.72 x 2.78 m (body 3.3 x 2.2 m; drawbar and jacks outside it), 5100, 13.
     fra_e80_sam  6.94 x 3.12 x 4.37 m against the published 6.915 x 3.24 x 2.92 m: length within
                  0.4 %; width 3.7 % under (the AMX-30's 3.10 m hull is drawn as published and
                  nothing was widened to meet the figure); 2.93 m to the sight head with the tubes
                  level, the standing antenna to 4.37 (above).  14426, 13.
     fra_e00_sam  9.27 x 3.14 x 3.88 m (3.14 over the mirrors, the cab 2.30 m), 6784, 13; the pack
                  erect 8.28 m high.
     len = the measured X extent.
   Model space: +X front (the drawbar of a trailer), +Y left, +Z up, metres, ground at z = 0.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ======================================================================= geometry kit */
var HeroEuSamKit = (function () {
  "use strict";
  var TAU = Math.PI * 2;
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
  /* a Bin seen through a rotation R (rows) and a move t: parts built along +X, then laid in place */
  function XF(bin, R, t) { this.b = bin; this.R = R; this.t = t || [0, 0, 0]; }
  XF.prototype.p = function (q) {
    var R = this.R, t = this.t;
    return [R[0][0] * q[0] + R[0][1] * q[1] + R[0][2] * q[2] + t[0],
            R[1][0] * q[0] + R[1][1] * q[1] + R[1][2] * q[2] + t[1],
            R[2][0] * q[0] + R[2][1] * q[1] + R[2][2] * q[2] + t[2]];
  };
  XF.prototype.n = function (q) {
    if (!q) return q;
    var R = this.R;
    return [R[0][0] * q[0] + R[0][1] * q[1] + R[0][2] * q[2], R[1][0] * q[0] + R[1][1] * q[1] + R[1][2] * q[2],
            R[2][0] * q[0] + R[2][1] * q[1] + R[2][2] * q[2]];
  };
  XF.prototype.tri = function (a, b, c, na, nb, nc) { this.b.tri(this.p(a), this.p(b), this.p(c), this.n(na), this.n(nb), this.n(nc)); };
  /* a vertex-coloured Bin seen in one colour (the wheel groups: one draw call each) */
  function Tint(bin, col) { this.b = bin; this.c = col; }
  Tint.prototype.tri = function (a, b, c, na, nb, nc) { this.b.col = this.c; this.b.tri(a, b, c, na, nb, nc); };
  /* nose-up pitch (X towards +Z), yaw (X towards +Y), roll about X (Y towards +Z) */
  function pitch(a) { var c = Math.cos(a), s = Math.sin(a); return [[c, 0, -s], [0, 1, 0], [s, 0, c]]; }
  function yaw(a) { var c = Math.cos(a), s = Math.sin(a); return [[c, -s, 0], [s, c, 0], [0, 0, 1]]; }
  function roll(a) { var c = Math.cos(a), s = Math.sin(a); return [[1, 0, 0], [0, c, -s], [0, s, c]]; }
  function mul(A, B) {
    var C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], i, j, k;
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) for (k = 0; k < 3; k++) C[i][j] += A[i][k] * B[k][j];
    return C;
  }
  function apply(R, t, q) {
    return [R[0][0] * q[0] + R[0][1] * q[1] + R[0][2] * q[2] + t[0], R[1][0] * q[0] + R[1][1] * q[1] + R[1][2] * q[2] + t[1],
            R[2][0] * q[0] + R[2][1] * q[1] + R[2][2] * q[2] + t[2]];
  }

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
  /* a square bar of width w from A to B */
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
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
      if (r0 > 1e-6 || r1 > 1e-6) {
        if (r0 > 1e-6) bin.tri(pa, pb, pc, n0, n1, n1);
        if (r1 > 1e-6) bin.tri(pa, pc, pd, n0, n1, n0);
      }
      if (!nocapA && r0 > 1e-6) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB && r1 > 1e-6) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a lathe along +X: prof = [[x, r], ...] (r may be 0 at the ends) */
  function lathe(bin, prof, seg) {
    for (var i = 0; i + 1 < prof.length; i++)
      cyl(bin, [prof[i][0], 0, 0], [prof[i + 1][0], 0, 0], prof[i][1], prof[i + 1][1], seg, i > 0, i + 2 < prof.length);
  }
  /* a toothed wheel standing on the Y axis */
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
  /* a skin lofted along X through cross-section rings ([x, y, z], same count each), capped */
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
  /* a thin flat fin in the local XZ plane (y = 0 mid), points [[x, z], ...], thickness th */
  function fin(bin, pts, th) { profY(bin, pts, -th / 2, th / 2); }

  /* ------------------------------------------------------------------ tracks (us_m548_family.js) */
  /* C: the circles the belt runs round, in order along the belt (counter-clockwise seen from +Y:
     the bottom run front-wards, the front wheel, the top run rear-wards, the rear wheel) */
  function trackPath(C) {
    var k, p = [], i, A, B, d, L, rp, ph, n, a0, a1, da, s, m, T = [];
    for (i = 0; i < C.length; i++) {
      A = C[i]; B = C[(i + 1) % C.length];
      d = [B.x - A.x, B.z - A.z]; L = Math.sqrt(d[0] * d[0] + d[1] * d[1]); d = [d[0] / L, d[1] / L];
      rp = [d[1], -d[0]];
      ph = Math.asin((A.r - B.r) / L);
      n = [rp[0] * Math.cos(ph) + d[0] * Math.sin(ph), rp[1] * Math.cos(ph) + d[1] * Math.sin(ph)];
      T.push({ n: n, a: [A.x + A.r * n[0], A.z + A.r * n[1]], b: [B.x + B.r * n[0], B.z + B.r * n[1]] });
    }
    function line(P, Q) {
      var l = Math.sqrt((Q[0] - P[0]) * (Q[0] - P[0]) + (Q[1] - P[1]) * (Q[1] - P[1])), j, nn = Math.max(1, Math.round(l / 0.08));
      for (j = 1; j <= nn; j++) p.push([P[0] + (Q[0] - P[0]) * j / nn, P[1] + (Q[1] - P[1]) * j / nn]);
    }
    for (i = 0; i < C.length; i++) {
      var tin = T[(i + C.length - 1) % C.length], tout = T[i], c = C[i];
      a0 = Math.atan2(tin.n[1], tin.n[0]); a1 = Math.atan2(tout.n[1], tout.n[0]);
      da = a1 - a0;
      while (da > Math.PI) da -= TAU;
      while (da < -Math.PI) da += TAU;
      m = Math.max(1, Math.round(Math.abs(da) * c.r / 0.08));
      if (da > -1e-6) for (s = 0; s <= m; s++) p.push([c.x + c.r * Math.cos(a0 + da * s / m), c.z + c.r * Math.sin(a0 + da * s / m)]);
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

  /* ------------------------------------------------------------------ paint and materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* a plain finish with soft tonal blots, panel seams and weathering; one tile is 2.94 m */
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
        q.globalAlpha = 0.40;
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
      q.strokeStyle = "rgba(18,20,14,0.26)"; q.lineWidth = 1.1;
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
  /* paint (textured), dark (metal), rub (tyres), glass, team (C.team exactly) and any extras */
  function materials(THREE, C, P, extra) {
    var T = {}, tx = paintTex(THREE, P), k;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1c1d1d, roughness: 0.92, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08,
      vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.base = P.base;
    for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k))
      T[k] = new THREE.MeshStandardMaterial({ color: extra[k][0], roughness: extra[k][1], metalness: extra[k][2] });
    return T;
  }
  /* one Bin per material named in `names` */
  function bins(T, names) {
    var B = {}, i;
    for (i = 0; i < names.length; i++) B[names[i]] = new Bin(T[names[i]], names[i] === "paint");
    return B;
  }
  /* the wheel group's Bins: one vertex-coloured Bin seen as paint (the hull's base colour), dark, rub */
  function wheelBins(T) {
    var c = T.base, W = new Bin(T.wheel, false, true);
    var pc = [parseInt(c.substr(1, 2), 16) / 255 * 1.08, parseInt(c.substr(3, 2), 16) / 255 * 1.08, parseInt(c.substr(5, 2), 16) / 255 * 1.08];
    return { w: W, paint: new Tint(W, pc), dark: new Tint(W, [0.145, 0.153, 0.165]), rub: new Tint(W, [0.11, 0.113, 0.113]) };
  }
  function flush(THREE, group, B) {
    var k, b, geo, seen = [];
    for (k in B) {
      b = B[k];
      if (!b.P || !b.P.length || seen.indexOf(b) >= 0) continue;   /* an alias (B.red = B.glass) once */
      seen.push(b);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  function group(THREE, name, x, y, z) {
    var g = new THREE.Group();
    if (name) g.name = name;
    g.position.set(x || 0, y || 0, z || 0);
    return g;
  }
  /* a wheel with its tyre on the local Y axis at y: tyre r, width w, the rim/hub disc in paint */
  function tyre(B, y, r, w, s, rim) {
    var h = w / 2, k, a;
    cyl(B.rub, [0, y - h, 0], [0, y + h, 0], r, r, 22);
    cyl(B.rub, [0, y - h - 0.012, 0], [0, y - h, 0], r - 0.03, r - 0.012, 22);
    cyl(B.rub, [0, y + h, 0], [0, y + h + 0.012, 0], r - 0.012, r - 0.03, 22);
    cyl(B.paint, [0, y + s * (h - 0.04), 0], [0, y + s * (h + 0.016), 0], rim, rim, 18);
    cyl(B.dark, [0, y + s * (h + 0.016), 0], [0, y + s * (h + 0.05), 0], rim * 0.42, rim * 0.32, 10);
    for (k = 0; k < 8; k++) {
      a = k / 8 * TAU;
      cyl(B.dark, [Math.cos(a) * rim * 0.62, y + s * (h + 0.016), Math.sin(a) * rim * 0.62],
          [Math.cos(a) * rim * 0.62, y + s * (h + 0.03), Math.sin(a) * rim * 0.62], 0.018, 0.018, 6);
    }
  }
  function shadows(g) { g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); }

  return {
    TAU: TAU, Bin: Bin, XF: XF, pitch: pitch, yaw: yaw, roll: roll, mul: mul, apply: apply,
    solid: solid, hexa: hexa, box: box, bar: bar, cyl: cyl, cylX: cylX, cylY: cylY, cylZ: cylZ,
    lathe: lathe, gear: gear, loft: loft, profY: profY, fin: fin,
    trackPath: trackPath, belt: belt, materials: materials, bins: bins, wheelBins: wheelBins, flush: flush, group: group,
    tyre: tyre, shadows: shadows
  };
})();

/* ======================================================= the Rapier round (towed, tracked, FSC) */
/* built along +X from the tail (x 0) to the nose (2.235): body 0.133 m, the ogive from 1.85, the
   four cropped-delta wings at 0.55-1.05 (F3: they stand out one body diameter), the four small tail
   fins in line with them (F3, R4), the dark band behind the ogive (R4, F2); "+" set (F2) */
var HeroRapierRound = (function () {
  "use strict";
  var K = HeroEuSamKit, L = 2.235, R = 0.0665;
  function round(B, X) {
    var q = X, k, Rr;
    K.lathe(new K.XF(B.rnd, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [0, 0, 0]), [[0, R * 0.8], [0.04, R], [1.84, R], [2.0, R * 0.78], [2.15, R * 0.42], [L, 0.004]], 12);
    K.cyl(B.dark, [1.70, 0, 0], [1.78, 0, 0], R + 0.003, R + 0.003, 12, true, true);
    for (k = 0; k < 4; k++) {
      Rr = K.roll(k * Math.PI / 2);
      K.fin(new K.XF(B.rnd, Rr, [0, 0, 0]), [[0.55, R], [1.05, R], [0.98, R + 0.133], [0.80, R + 0.133]], 0.012);
      K.fin(new K.XF(B.rnd, Rr, [0, 0, 0]), [[0.0, R], [0.16, R], [0.12, R + 0.06], [0.02, R + 0.06]], 0.008);
    }
    return q;
  }
  /* lay a round with its tail at t and its axis along the rotation Rm (a Bin pair rnd/dark) */
  function place(B, Rm, t) {
    round({ rnd: new K.XF(B.rnd, Rm, t), dark: new K.XF(B.dark, Rm, t) });
  }
  return { L: L, R: R, place: place };
})();

/* ================================================================ Bloodhound Mk 1 (gbr_e50_sam) */
var HeroBloodhound = (function () {
  "use strict";
  var K = HeroEuSamKit, TAU = K.TAU;
  var PAINT = { key: "eusam_bh", base: "#4c5a3e", blots: [["#55613f", 9, 50], ["#434f36", 9, 45]], seed: 1958 };
  /* the round (published 7.7 x 0.546, span 2.83): x from the tail */
  var LM = 7.7, RB = 0.273;
  var RJ = { x0: 0.46, x1: 3.00, r: 0.185, off: 0.56 };           /* ramjets (B4 0.33 of the length, 0.67 of the body) */
  var BO = { x0: -0.08, x1: 2.62, r: 0.14, off: 0.42 };           /* boosters at the diagonals (B5) */
  var WG = { x0: 2.10, x1: 3.30, tip0: 2.55, tip1: 3.20, semi: 1.415 }; /* mid wings, span 2.83 */
  /* the launcher (B3, B5): turret ring 1.15 up; trunnion 0.4 behind the ring centre, 0.45 over it;
     the round's axis 0.95 over the trunnion, its tail 1.0 behind it */
  var ZR = 1.15, TRX = -0.40, TRZ = 0.45, AX = 0.95, TAIL = -1.00, EL = 0.70;
  var OFF = -2.30;                                                 /* ring X: centres the X extent */

  function missile(B) {
    var k, R;
    /* body: black radome (B1), white fuselage, boat tail */
    K.lathe(B.mis, [[0, 0.20], [0.25, RB], [5.85, RB]], 16);
    K.lathe(B.nose, [[5.85, RB], [6.6, 0.20], [7.3, 0.09], [LM, 0.01]], 16);
    K.cyl(B.dark, [5.20, 0, 0], [5.26, 0, 0], RB + 0.004, RB + 0.004, 16, true, true);
    for (k = -1; k <= 1; k += 2) {
      /* ramjets above and below on short pylons: intake cone, polished duct, nozzle */
      var z = k * RJ.off;
      K.cyl(B.jet, [RJ.x0, 0, z], [RJ.x1, 0, z], RJ.r * 0.85, RJ.r, 14, false, true);
      K.cyl(B.jet, [RJ.x1, 0, z], [RJ.x1 + 0.12, 0, z], RJ.r, RJ.r * 0.93, 14, true, false);
      K.cyl(B.dark, [RJ.x1 + 0.12, 0, z], [RJ.x1 + 0.34, 0, z], 0.11, 0.02, 10);
      K.cyl(B.dark, [RJ.x0 - 0.02, 0, z], [RJ.x0, 0, z], RJ.r * 0.86, RJ.r * 0.86, 14, true, true);
      K.box(B.mis, RJ.x0 + 0.5, RJ.x1 - 0.3, -0.03, 0.03, k > 0 ? RB - 0.02 : -RJ.off + RJ.r - 0.02, k > 0 ? RJ.off - RJ.r + 0.02 : -RB + 0.02);
      /* the two tail fins, up and down (B2, B5) */
      K.fin(new K.XF(B.mis, K.roll(k > 0 ? 0 : Math.PI), [0, 0, 0]), [[0.05, RB - 0.02], [0.75, RB - 0.02], [0.30, RB + 0.62], [0.05, RB + 0.62]], 0.03);
    }
    /* the level mid wings, cropped trapezoids (B2, B6) */
    for (k = -1; k <= 1; k += 2) {
      K.hexa(B.mis, [[WG.x0, k * RB, -0.025], [WG.x1, k * RB, -0.025], [WG.x1, k * RB, 0.025], [WG.x0, k * RB, 0.025],
                     [WG.tip0, k * WG.semi, -0.012], [WG.tip1, k * WG.semi, -0.012], [WG.tip1, k * WG.semi, 0.012], [WG.tip0, k * WG.semi, 0.012]]);
    }
    /* four boosters at the diagonals: rounded fronts, red caps (B2), the ring at the tail */
    for (k = 0; k < 4; k++) {
      R = K.roll(Math.PI / 4 + k * Math.PI / 2);
      var to = K.apply(R, [0, 0, 0], [0, 0, BO.off]);
      K.lathe(new K.XF(B.boo, R, to), [[BO.x0, 0.10], [BO.x0 + 0.06, BO.r], [BO.x1 - 0.32, BO.r], [BO.x1 - 0.05, 0.05], [BO.x1, 0.01]], 12);
      K.cyl(new K.XF(B.red, R, to), [BO.x1 - 0.33, 0, 0], [BO.x1 - 0.20, 0, 0], BO.r + 0.004, BO.r * 0.75, 12);
      K.cyl(new K.XF(B.dark, R, to), [BO.x0 - 0.12, 0, 0], [BO.x0, 0, 0], 0.08, 0.11, 10);
    }
    /* the rear ring holding the boosters (published) */
    for (k = 0; k < 4; k++) {
      R = K.roll(k * Math.PI / 2);
      K.box(new K.XF(B.dark, R, [0, 0, 0]), -0.02, 0.10, -0.33, 0.33, BO.off - 0.04, BO.off + 0.01);
    }
  }
  /* the turntable head (trained): the housing with its rams (B5) */
  function head(B) {
    K.cylZ(B.paint, 0, 0, 0, 0.10, 0.72, 20);
    K.box(B.paint, -0.75, 0.55, -0.48, 0.48, 0.10, 0.42);
    K.box(B.paint, -0.62, 0.30, -0.40, 0.40, 0.42, 0.55);
    K.box(B.dark, -0.70, -0.40, -0.55, -0.48, 0.15, 0.38);
    K.box(B.dark, 0.15, 0.50, 0.48, 0.55, 0.15, 0.36);
    /* trunnion cheeks */
    K.box(B.paint, TRX - 0.15, TRX + 0.15, 0.30, 0.42, 0.30, TRZ + 0.10);
    K.box(B.paint, TRX - 0.15, TRX + 0.15, -0.42, -0.30, 0.30, TRZ + 0.10);
    /* the elevating ram's cylinder (its rod is in the pod) */
    K.cyl(B.dark, [0.45, 0, 0.42], [0.62, 0, 0.62], 0.09, 0.09, 10);
    K.box(B.team, -0.55, -0.20, -0.30, 0.30, 0.55, 0.565);
  }
  /* the beam and the round (raised by el about the trunnion) */
  function pod(B) {
    K.box(B.paint, -0.30, 2.60, -0.16, 0.16, 0.0, 0.17);
    K.box(B.paint, 0.20, 2.40, -0.10, 0.10, 0.17, AX - RJ.off - RJ.r - 0.01);
    K.cylY(B.dark, 0, -0.30, 0.30, 0.05, 0.09, 12);
    K.cyl(B.dark, [1.30, 0, 0.0], [1.12, 0, -0.30], 0.05, 0.05, 8);
    /* the shoe on the beam under the round, two holding claws */
    K.box(B.dark, 1.30, 1.60, -0.10, 0.10, AX - RJ.off - RJ.r - 0.02, AX - RB + 0.02);
    missile({ mis: new K.XF(B.mis, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [TAIL, 0, AX]), nose: new K.XF(B.nose, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [TAIL, 0, AX]),
              jet: new K.XF(B.jet, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [TAIL, 0, AX]), boo: new K.XF(B.boo, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [TAIL, 0, AX]),
              red: new K.XF(B.red, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [TAIL, 0, AX]), dark: new K.XF(B.dark, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [TAIL, 0, AX]) });
    return [[TAIL + LM, 0, AX, TAIL]];
  }
  /* the fixed base: pedestal and four outriggers with screw jacks and pads (B3, B5) */
  function base(B) {
    var k, a, c, s;
    K.box(B.paint, -0.65, 0.65, -0.55, 0.55, 0.12, ZR - 0.15);
    K.cylZ(B.paint, 0, 0, ZR - 0.15, ZR, 0.62, 20);
    K.box(B.dark, -0.66, 0.66, -0.56, 0.56, 0.12, 0.18);
    for (k = 0; k < 4; k++) {
      a = k * Math.PI / 2; c = Math.cos(a); s = Math.sin(a);
      var X = new K.XF(B.paint, K.yaw(a), [0, 0, 0]), D = new K.XF(B.dark, K.yaw(a), [0, 0, 0]);
      K.box(X, 0.5, 1.70, -0.13, 0.13, 0.16, 0.42);
      K.cylZ(D, 1.62, 0, 0.04, 0.50, 0.045, 8);
      K.cylZ(D, 1.62, 0, 0.0, 0.04, 0.17, 12);
      K.cylZ(D, 1.62, 0, 0.50, 0.58, 0.06, 8);
    }
    /* the cable box on the pedestal side */
    K.box(B.paint, -0.30, 0.30, 0.55, 0.75, 0.30, 0.80);
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, {
      mis: [0xdcdcd4, 0.55, 0.08], nose: [0x2a2622, 0.5, 0.1], jet: [0xa3a7aa, 0.32, 0.75],
      boo: [0xc8c8c0, 0.6, 0.1], red: [0xa8322a, 0.6, 0.05] });
    var g = K.group(THREE, "gbr_e50_sam"), B, tg, pg, cells;
    B = K.bins(T, ["paint", "dark"]);
    base(B);
    var bg = K.group(THREE, null, OFF, 0, 0);
    K.flush(THREE, bg, B); g.add(bg);
    tg = K.group(THREE, "turret", OFF, 0, ZR);
    B = K.bins(T, ["paint", "dark", "team"]);
    head(B); K.flush(THREE, tg, B);
    pg = K.group(THREE, "podelev", TRX, 0, TRZ);
    B = K.bins(T, ["paint", "dark", "mis", "nose", "jet", "boo", "red"]);
    cells = pod(B); K.flush(THREE, pg, B);
    pg.userData.el = EL; pg.userData.cells = cells;
    tg.add(pg); g.add(tg);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* ===================================================== Rapier towed launcher (gbr_e60_sam) */
var HeroRapierTowed = (function () {
  "use strict";
  var K = HeroEuSamKit, TAU = K.TAU, RR = HeroRapierRound;
  var PAINT = { key: "eusam_rapa", base: "#4c5236", blots: [["#555b3d", 9, 50], ["#43482f", 9, 45]], seed: 1971 };
  var AXL = -0.73, RT = 0.39, YT = 0.92, WT = 0.20;        /* axle, tyre, track (R4) */
  var ZH = 1.10, TRZ = 0.32, REST = 14 * Math.PI / 180, EL = 0.42; /* head ring, trunnion, the R3/R4 rest, +24 deg to fire */
  var JK = [[0.80, 0.78], [-1.12, 0.80]];                   /* jack stations x, |y| */

  function chassis(B) {
    var s;
    /* the frame under the drum, the A drawbar to the eye (R4) */
    K.box(B.paint, -1.15, 0.80, -0.50, 0.50, 0.42, 0.58);
    K.box(B.dark, -1.15, 0.80, -0.52, 0.52, 0.40, 0.43);
    for (s = -1; s <= 1; s += 2) {
      K.bar(B.paint, [0.75, s * 0.42, 0.50], [2.85, s * 0.05, 0.47], 0.10);
      /* mudguard over the wheel, the lamp cluster at the rear (R3, R4) */
      K.box(B.paint, AXL - 0.42, AXL + 0.42, s > 0 ? YT - 0.14 : -YT - 0.14, s > 0 ? YT + 0.14 : -YT + 0.14, RT + 0.30, RT + 0.33);
      K.box(B.paint, AXL - 0.45, AXL - 0.40, s > 0 ? YT - 0.14 : -YT - 0.14, s > 0 ? YT + 0.14 : -YT + 0.14, RT + 0.05, RT + 0.33);
      K.box(B.paint, AXL - 0.10, AXL + 0.10, s * 0.50, s * (YT - 0.15), 0.40, 0.52);
      K.box(B.dark, -1.20, -1.15, s * 0.40 - 0.08, s * 0.40 + 0.08, 0.60, 0.70);
      K.cylX(B.red, -1.22, -1.20, s * 0.40, 0.65, 0.035, 8);
    }
    K.cylY(B.dark, AXL, -YT + 0.15, YT - 0.15, RT, 0.05, 8);
    /* drawbar head and eye */
    K.box(B.paint, 2.80, 2.98, -0.07, 0.07, 0.42, 0.52);
    K.cyl(B.dark, [3.05, -0.03, 0.47], [3.05, 0.03, 0.47], 0.07, 0.07, 12);
    /* the lower drum: electronics cylinder 1.0 m across (R4), its access panels */
    K.cylZ(B.paint, 0, 0, 0.55, ZH, 0.50, 24);
    K.box(B.paint, -0.30, 0.30, -0.56, -0.44, 0.62, 0.98);
    K.box(B.paint, -0.30, 0.30, 0.44, 0.56, 0.62, 0.98);
    K.box(B.dark, 0.40, 0.56, -0.12, 0.12, 0.62, 0.95);
    K.box(B.team, -1.10, -0.90, -0.30, 0.30, 0.58, 0.595);
  }
  /* the four jacks: splayed down on pads (set up, R2) or wound up (march, R3) */
  function jacks(B, down) {
    var i, s, x, y, zb = down ? 0.0 : 0.28;
    for (i = 0; i < JK.length; i++) for (s = -1; s <= 1; s += 2) {
      x = JK[i][0]; y = s * JK[i][1];
      K.box(B.paint, x - 0.05, x + 0.05, Math.min(s * 0.45, y), Math.max(s * 0.45, y), 0.45, 0.53);
      K.cylZ(B.dark, x, y, zb + 0.03, 0.62, 0.04, 8);
      K.cylZ(B.paint, x, y, 0.30, 0.66, 0.06, 8);
      K.cylZ(B.dark, x, y, zb, zb + 0.03, 0.12, 10);
    }
    K.cylZ(B.dark, 2.55, 0, down ? 0.0 : 0.20, 0.45, 0.035, 8);
  }
  /* the rotating head: drum ring, housing, radome (R3, R4), the command dish (R2, R4: starboard front) */
  function head(B) {
    K.cylZ(B.paint, 0, 0, 0, 0.30, 0.50, 24);
    K.box(B.paint, -0.42, 0.40, -0.40, 0.40, 0.30, 0.65);
    K.cylZ(B.paint, 0, 0, 0.65, 1.10, 0.48, 24);
    K.cyl(B.paint, [0, 0, 1.10], [0, 0, 1.22], 0.48, 0.40, 24, true, false);
    K.cylZ(B.paint, 0, 0, 1.22, 1.30, 0.40, 20);
    K.cylZ(B.dark, 0, 0, 1.30, 1.33, 0.12, 10);
    K.cylZ(B.dark, 0, 0, 1.08, 1.11, 0.485, 24);
    /* trunnion bosses each side */
    K.cylY(B.dark, 0.05, 0.38, 0.52, TRZ, 0.11, 12);
    K.cylY(B.dark, 0.05, -0.52, -0.38, TRZ, 0.11, 12);
    /* command dish on its arm, facing forward */
    K.bar(B.dark, [0.30, -0.36, 0.45], [0.55, -0.62, 0.48], 0.05);
    K.cyl(B.paint, [0.55, -0.68, 0.48], [0.68, -0.68, 0.48], 0.04, 0.28, 16, false, true);
    K.cyl(B.dark, [0.68, -0.68, 0.48], [0.69, -0.68, 0.48], 0.28, 0.28, 16);
    K.cyl(B.dark, [0.68, -0.68, 0.48], [0.88, -0.68, 0.48], 0.02, 0.02, 6);
  }
  /* the arms and the four rounds, two a side (published), upper inboard and lower outboard (R3) */
  var POS = [[0.62, 0.30], [0.80, -0.06]];
  function pod(B) {
    var cells = [], s, i, y, z, Rm = K.pitch(REST), t, nose, tail;
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, -0.25, 0.30, s > 0 ? 0.50 : -0.92, s > 0 ? 0.92 : -0.50, -0.10, 0.06);
      K.cylY(B.dark, 0.05, s * 0.52, s * 0.56, 0, 0.09, 10);
      for (i = 0; i < POS.length; i++) {
        y = s * POS[i][0]; z = POS[i][1];
        t = [-0.70, y, z];
        /* the launch beam under the round */
        K.bar(B.paint, K.apply(Rm, [0, 0, 0], [-0.70, y, z - 0.10]), K.apply(Rm, [0, 0, 0], [0.70, y, z - 0.10]), 0.06);
        K.bar(B.paint, [0.05, s * 0.55, -0.02], K.apply(Rm, [0, 0, 0], [0.05, y, z - 0.10]), 0.06);
        RR.place(B, Rm, K.apply(Rm, [0, 0, 0], t));
        nose = K.apply(Rm, [0, 0, 0], [t[0] + RR.L, y, z]);
        tail = K.apply(Rm, [0, 0, 0], t);
        cells.push([nose[0], nose[1], nose[2], tail[0]]);
      }
    }
    return cells;
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { rnd: [0x4f5434, 0.62, 0.1], red: [0x8a2a22, 0.5, 0.1] });
    var g = K.group(THREE, "gbr_e60_sam"), B, tg, pg, wg, dp, tp, s;
    B = K.bins(T, ["paint", "dark", "team", "red"]);
    chassis(B);
    var hg = K.group(THREE, null); K.flush(THREE, hg, B); g.add(hg);
    dp = K.group(THREE, "deploypose"); dp.visible = false;
    B = K.bins(T, ["paint", "dark"]); jacks(B, true); K.flush(THREE, dp, B); g.add(dp);
    tp = K.group(THREE, "travelpose");
    B = K.bins(T, ["paint", "dark"]); jacks(B, false); K.flush(THREE, tp, B); g.add(tp);
    wg = K.group(THREE, "roadwheel", AXL, 0, RT);
    B = K.wheelBins(T);
    for (s = -1; s <= 1; s += 2) K.tyre(B, s * YT, RT, WT, s, 0.22);
    K.flush(THREE, wg, B); g.add(wg);
    tg = K.group(THREE, "turret", 0, 0, ZH);
    B = K.bins(T, ["paint", "dark"]); head(B); K.flush(THREE, tg, B);
    pg = K.group(THREE, "podelev", 0.05, 0, TRZ);
    B = K.bins(T, ["paint", "dark", "rnd"]);
    var cells = pod(B); K.flush(THREE, pg, B);
    pg.userData.el = EL; pg.userData.cells = cells;
    tg.add(pg); g.add(tg);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* ===================================================== Rapier FSC launcher (gbr_e90_sam, gbr_e00_sam) */
var HeroRapierFsc = (function () {
  "use strict";
  var K = HeroEuSamKit, TAU = K.TAU, RR = HeroRapierRound;
  var PAINT = { key: "eusam_fsc", base: "#565c41", blots: [["#5e6447", 9, 50], ["#4c5239", 9, 45]], seed: 1996 };
  var AXL = -0.15, RT = 0.46, YT = 0.95, WT = 0.30;          /* one axle, the 0.92 m tyre (F1, F4) */
  var XF0 = 1.65, XR0 = -1.65, ZB = 0.52, ZD = 1.20, HW = 1.10; /* body 3.3 x 2.2, belly, deck (FSC table) */
  var TRZ = 0.40, REST = 10 * Math.PI / 180, EL = 0.45;

  function body(B) {
    var s, k;
    /* the low trailer body with chamfered ends (F1), wheel boxes */
    K.profY(B.paint, [[XR0, ZB + 0.20], [XR0 + 0.20, ZB], [XF0 - 0.25, ZB], [XF0, ZB + 0.30], [XF0, ZD - 0.05], [XF0 - 0.05, ZD], [XR0 + 0.05, ZD], [XR0, ZD - 0.05]], -0.78, 0.78);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.78 : -HW, y1 = s > 0 ? HW : -0.78;
      K.profY(B.paint, [[XR0, ZB + 0.40], [XR0 + 0.15, ZB + 0.25], [AXL - 0.62, ZB + 0.25], [AXL - 0.62, RT + 0.52], [AXL + 0.62, RT + 0.52], [AXL + 0.62, ZB + 0.25],
                        [XF0 - 0.20, ZB + 0.25], [XF0, ZB + 0.45], [XF0, ZD - 0.05], [XF0 - 0.05, ZD], [XR0 + 0.05, ZD], [XR0, ZD - 0.05]], y0, y1);
      /* side doors and panels, the side lamp strip (F1, F4) */
      K.box(B.paint, 0.55, 1.35, s > 0 ? HW : -HW - 0.02, s > 0 ? HW + 0.02 : -HW, 0.80, 1.10);
      K.box(B.paint, -1.40, -0.85, s > 0 ? HW : -HW - 0.02, s > 0 ? HW + 0.02 : -HW, 0.80, 1.10);
      K.box(B.dark, 0.70, 0.80, s > 0 ? HW + 0.02 : -HW - 0.03, s > 0 ? HW + 0.03 : -HW - 0.02, 0.92, 0.98);
      K.box(B.dark, -1.25, -1.15, s > 0 ? HW + 0.02 : -HW - 0.03, s > 0 ? HW + 0.03 : -HW - 0.02, 0.92, 0.98);
      K.box(B.red, -1.20, -1.10, s > 0 ? HW : -HW - 0.012, s > 0 ? HW + 0.012 : -HW, 1.12, 1.16);
      K.box(B.red, 0.90, 1.00, s > 0 ? HW : -HW - 0.012, s > 0 ? HW + 0.012 : -HW, 1.12, 1.16);
      /* rear lamps and the jerrycan bracket at the rear (F4) */
      K.box(B.red, XR0 - 0.02, XR0, s * 0.85 - 0.08, s * 0.85 + 0.08, 0.80, 0.90);
    }
    K.box(B.paint, XR0 - 0.18, XR0, -0.20, 0.10, 0.62, 1.05);
    K.box(B.dark, XR0 - 0.19, XR0 - 0.17, -0.18, 0.08, 0.68, 0.98);
    /* the folded drawbar on the front plate */
    K.bar(B.dark, [XF0, -0.35, 0.70], [XF0 + 0.35, 0, 0.62], 0.08);
    K.bar(B.dark, [XF0, 0.35, 0.70], [XF0 + 0.35, 0, 0.62], 0.08);
    K.cyl(B.dark, [XF0 + 0.42, -0.03, 0.62], [XF0 + 0.42, 0.03, 0.62], 0.07, 0.07, 10);
    /* deck: the turret ring, hatch lines, team plate */
    K.cylZ(B.dark, 0, 0, ZD, ZD + 0.04, 0.62, 20);
    for (k = 0; k < 4; k++) K.box(B.dark, [-1.40, -0.85, 0.90, 1.45][k] - 0.01, [-1.40, -0.85, 0.90, 1.45][k] + 0.01, -0.85, 0.85, ZD, ZD + 0.012);
    K.box(B.team, -1.30, -0.95, -0.30, 0.30, ZD + 0.012, ZD + 0.025);
  }
  function jacks(B, down) {
    var xs = [XF0 - 0.12, XR0 + 0.12], i, s, x, y, zb = down ? 0.0 : 0.35;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      x = xs[i]; y = s * (HW + 0.10);
      K.box(B.paint, x - 0.06, x + 0.06, s > 0 ? HW : -HW - 0.12, s > 0 ? HW + 0.12 : -HW, 0.85, 1.00);
      K.cylZ(B.paint, x, y, 0.55, 1.02, 0.07, 10);
      K.cylZ(B.dark, x, y, zb + 0.03, 0.60, 0.045, 8);
      K.cylZ(B.dark, x, y, zb, zb + 0.03, 0.16, 12);
    }
  }
  /* the turret: base box (F1 0.95 m) with the tracker ball on its yoke (F1, F3, F4) */
  function head(B) {
    K.cylZ(B.paint, 0, 0, 0, 0.10, 0.55, 20);
    K.box(B.paint, -0.50, 0.45, -0.46, 0.46, 0.10, 0.70);
    K.box(B.dark, 0.45, 0.47, -0.40, 0.40, 0.18, 0.64);
    K.box(B.paint, -0.30, 0.30, -0.30, 0.30, 0.70, 0.80);
    /* the yoke and the ball: window, lens, the side boxes */
    K.box(B.paint, -0.12, 0.12, 0.30, 0.40, 0.75, 1.17);
    K.box(B.paint, -0.12, 0.12, -0.40, -0.30, 0.75, 1.17);
    var zc = 1.17, r = 0.375;
    K.lathe(new K.XF(B.paint, [[0, 0, -1], [0, 1, 0], [1, 0, 0]], [0, 0, zc]), [[-r, 0.01], [-r * 0.8, r * 0.6], [-r * 0.4, r * 0.92], [0, r], [r * 0.4, r * 0.92], [r * 0.8, r * 0.6], [r, 0.01]], 18);
    K.cyl(B.glass, [r - 0.03, 0, zc + 0.12], [r + 0.01, 0, zc + 0.12], 0.10, 0.10, 14);
    K.cyl(B.dark, [r - 0.02, 0.17, zc + 0.12], [r + 0.005, 0.17, zc + 0.12], 0.05, 0.05, 10);
    K.box(B.dark, r - 0.08, r - 0.02, -0.12, 0.12, zc - 0.10, zc - 0.02);
    K.cylY(B.dark, 0, -0.42, 0.42, zc, 0.06, 10);
  }
  /* eight rounds, four a side in 2 x 2 on the arm frames (published; F1, F3) */
  function pod(B) {
    var cells = [], s, i, j, y, z, Rm = K.pitch(REST), t, nose, tail;
    for (s = -1; s <= 1; s += 2) {
      K.cylY(B.dark, 0, s * 0.46, s * 0.58, 0, 0.10, 12);
      K.box(B.paint, -0.20, 0.20, s > 0 ? 0.56 : -1.04, s > 0 ? 1.04 : -0.56, -0.08, 0.08);
      K.box(B.paint, -0.10, 0.10, s > 0 ? 0.80 : -0.84, s > 0 ? 0.84 : -0.80, -0.30, 0.40);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        y = s * (0.66 + i * 0.30); z = -0.16 + j * 0.34;
        t = [-0.55, y, z];
        K.bar(B.paint, K.apply(Rm, [0, 0, 0], [-0.30, y, z - 0.085]), K.apply(Rm, [0, 0, 0], [0.70, y, z - 0.085]), 0.04);
        RR.place(B, Rm, K.apply(Rm, [0, 0, 0], t));
        nose = K.apply(Rm, [0, 0, 0], [t[0] + RR.L, y, z]);
        tail = K.apply(Rm, [0, 0, 0], t);
        cells.push([nose[0], nose[1], nose[2], tail[0]]);
      }
    }
    return cells;
  }
  function build(key) {
    return function (THREE, M, C) {
      var T = K.materials(THREE, C, PAINT, { rnd: [0x50563a, 0.62, 0.1], red: [0x9a3326, 0.5, 0.1] });
      var g = K.group(THREE, key), B, tg, pg, wg, dp, tp, s;
      B = K.bins(T, ["paint", "dark", "team", "red"]);
      body(B);
      var hg = K.group(THREE, null); K.flush(THREE, hg, B); g.add(hg);
      dp = K.group(THREE, "deploypose"); dp.visible = false;
      B = K.bins(T, ["paint", "dark"]); jacks(B, true); K.flush(THREE, dp, B); g.add(dp);
      tp = K.group(THREE, "travelpose");
      B = K.bins(T, ["paint", "dark"]); jacks(B, false); K.flush(THREE, tp, B); g.add(tp);
      wg = K.group(THREE, "roadwheel", AXL, 0, RT);
      B = K.wheelBins(T);
      for (s = -1; s <= 1; s += 2) K.tyre(B, s * YT, RT, WT, s, 0.25);
      K.cylY(B.dark, 0, -YT + 0.15, YT - 0.15, 0, 0.05, 8);
      K.flush(THREE, wg, B); g.add(wg);
      tg = K.group(THREE, "turret", 0, 0, ZD + 0.04);
      B = K.bins(T, ["paint", "dark", "glass"]); head(B); K.flush(THREE, tg, B);
      pg = K.group(THREE, "podelev", 0, 0, TRZ);
      B = K.bins(T, ["paint", "dark", "rnd"]);
      var cells = pod(B); K.flush(THREE, pg, B);
      pg.userData.el = EL; pg.userData.cells = cells;
      tg.add(pg); g.add(tg);
      K.shadows(g);
      return g;
    };
  }
  return { build: build };
})();

/* ===================================================== Tracked Rapier on the RCM 748 (gbr_e80_sam) */
var HeroTrackedRapier = (function () {
  "use strict";
  var K = HeroEuSamKit, TAU = K.TAU, RR = HeroRapierRound;
  var PAINT = { key: "eusam_trap", base: "#4d5338", blots: [["#565c3f", 9, 50], ["#444a31", 9, 45]], seed: 1981 };
  /* the M548 station table (js/hero/us_m548_family.js, D1) */
  var XN = 2.877, XT = -2.877;
  var XW = [1.449, 0.744, 0.039, -0.666, -1.371], RW = 0.29, ZB = 0.06, ZW = ZB + RW;
  var SPR = { x: 2.133, z: 0.55, r: 0.23 }, IDL = { x: -2.05, z: 0.45, r: 0.25 };
  var TYC = 1.08, THW = 0.19, HB = 0.86, HW = 1.27, FW = 1.345, ZD = 1.06;
  /* the armoured cab and the launcher (TRACKED TABLE) */
  var XC = -0.25, ZCR = 2.45, ZSL = 2.05, XTT = -1.65, TRX = 0.0, TRZ = 0.62, EL = 0.55;

  function ring(x, zb, zf, zt) {
    var half = [[HB, zb], [HB, zf], [HW - 0.02, zf], [HW, zf + 0.03], [HW, zt - 0.02], [HW - 0.02, zt]], r = [], i;
    for (i = 0; i < half.length; i++) r.push([x, -half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, half[i][0], half[i][1]]);
    return r;
  }
  var STATIONS = [[XT, 0.62, 0.84, ZD], [-2.70, 0.52, 0.84, ZD], [-2.40, 0.42, 0.84, ZD], [1.95, 0.41, 0.84, ZD],
                  [2.25, 0.50, 0.86, ZD], [2.55, 0.68, 0.92, ZD], [2.78, 0.90, 0.98, ZD + 0.02], [XN, 0.96, 1.00, ZD + 0.04]];
  function hull(B) {
    var s, k, i, st = [], x, C = [];
    for (i = 0; i < STATIONS.length; i++) st.push(ring(STATIONS[i][0], STATIONS[i][1], STATIONS[i][2], STATIONS[i][3]));
    K.loft(B.paint, st);
    /* the track: bottom run front-wards, the front sprocket, back along the wheel tops (no return
       rollers, D1), the idler */
    for (k = XW.length - 1; k >= 0; k--) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: SPR.x, z: SPR.z, r: SPR.r + 0.02 });
    for (k = 0; k < XW.length; k++) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: IDL.x, z: IDL.z, r: IDL.r });
    var path = K.trackPath(C);
    K.belt(B.dark, path, TYC - THW, TYC + THW);
    K.belt(B.dark, path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < XW.length; k++) {
        K.cylY(B.dark, XW[k], s * HB, s * (TYC - 0.17), ZW, 0.06, 8);
        K.bar(B.dark, [XW[k], s * (HB + 0.04), ZW], [XW[k] + 0.32, s * (HB + 0.04), ZW + 0.12], 0.07);
      }
      K.cylY(B.dark, SPR.x, s * (HB - 0.02), s * (TYC - 0.12), SPR.z, 0.13, 12);
      K.bar(B.dark, [IDL.x, s * (HB + 0.04), IDL.z], [IDL.x + 0.34, s * (HB + 0.04), IDL.z + 0.14], 0.08);
      /* fender ledge, its ends (D1) */
      K.box(B.paint, -2.80, 2.60, s > 0 ? HW - 0.01 : -FW, s > 0 ? FW : -HW + 0.01, 0.86, 0.90);
      K.box(B.paint, 2.50, 2.62, s > 0 ? HW : -FW, s > 0 ? FW : -HW, 0.80, 0.90);
      K.box(B.paint, -2.84, -2.74, s > 0 ? HW : -FW, s > 0 ? FW : -HW, 0.72, 0.90);
      /* tail lamps, tow pintles; the exhaust stubs on the tail (T3) */
      K.box(B.red, XT - 0.03, XT + 0.01, s * 1.00 - 0.08, s * 1.00 + 0.08, 0.72, 0.82);
      K.box(B.dark, XT - 0.09, XT, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.70, 0.84);
    }
    for (k = 0; k < 4; k++) K.cyl(B.dark, [XT + 0.05, 0.40 + k * 0.17, ZD + 0.08], [XT - 0.12, 0.40 + k * 0.17, ZD + 0.12], 0.05, 0.05, 8);
  }
  /* a road-wheel station (both sides): rubber-tyred discs as the M548's */
  function wheelDiscs(B) {
    var s, side, o, k, a;
    for (s = -1; s <= 1; s += 2) {
      K.cylY(B.rub, 0, s * (TYC - 0.17), s * (TYC - 0.03), 0, RW, 18);
      K.cylY(B.rub, 0, s * (TYC + 0.03), s * (TYC + 0.17), 0, RW, 18);
      for (side = -1; side <= 1; side += 2) {
        o = s * TYC + side * 0.17;
        K.cyl(B.paint, [0, o, 0], [0, o + side * 0.02, 0], RW - 0.035, RW - 0.06, 18, false, false);
        K.cyl(B.paint, [0, o + side * 0.02, 0], [0, o + side * 0.05, 0], 0.13, 0.11, 12, true, false);
      }
      o = s * (TYC + 0.17);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        K.box(B.dark, 0.18 * Math.cos(a) - 0.016, 0.18 * Math.cos(a) + 0.016, o + s * 0.015 - 0.01, o + s * 0.035,
              0.18 * Math.sin(a) - 0.016, 0.18 * Math.sin(a) + 0.016);
      }
    }
  }
  function sprocketDiscs(B) {
    for (var s = -1; s <= 1; s += 2) {
      K.gear(B.dark, 0, s * TYC - 0.15, s * TYC - 0.07, 0, SPR.r - 0.03, SPR.r + 0.035, 10);
      K.gear(B.dark, 0, s * TYC + 0.07, s * TYC + 0.15, 0, SPR.r - 0.03, SPR.r + 0.035, 10);
      K.cyl(B.dark, [0, s * (TYC - 0.07), 0], [0, s * (TYC + 0.07), 0], 0.15, 0.15, 14);
    }
  }
  function idlerDiscs(B) {
    for (var s = -1; s <= 1; s += 2) {
      K.cylY(B.paint, 0, s * TYC - 0.17, s * TYC + 0.17, 0, IDL.r - 0.01, 18);
      K.cylY(B.dark, 0, s * (TYC + 0.17), s * (TYC + 0.22), 0, 0.08, 8);
    }
  }
  /* the armoured cab: full width (T3), raked four-pane front over a front plate (T1, T2), the
     upper sides bevelled in, the mesh panel at the rear of the side, the visor box over the front */
  function cabRing(x, zt, wt, zm) {
    return [[x, -HW, ZD], [x, HW, ZD], [x, HW, zm], [x, wt, zt], [x, -wt, zt], [x, -HW, zm]];
  }
  function cab(B) {
    var s, k;
    K.loft(B.paint, [cabRing(XC, ZCR, 1.05, 2.05), cabRing(2.40, ZCR, 1.05, 2.05), cabRing(2.86, ZSL + 0.02, 1.16, ZSL), cabRing(2.95, 1.70, 1.20, 1.69)]);
    /* four panes on the raked front (T1 T2): the face from the sill (2.86, 2.07) to the roof (2.40, 2.45) */
    /* the face's normal is +X pitched up by its rake: a frame with X out of the face, Z up it */
    var A = [2.86, 0, ZSL + 0.02], L = Math.sqrt(0.46 * 0.46 + 0.38 * 0.38), Pf = new K.XF(B.glass, K.pitch(Math.atan2(0.46, 0.38)), A);
    for (k = 0; k < 4; k++) K.box(Pf, -0.01, 0.035, -0.92 + k * 0.47, -0.54 + k * 0.47, 0.06, L - 0.07);
    for (s = -1; s <= 1; s += 2) {
      /* side door with its vision block and the mesh panel behind it (T1, T2) */
      K.box(B.paint, 1.10, 1.95, s > 0 ? HW : -HW - 0.02, s > 0 ? HW + 0.02 : -HW, 1.25, 2.00);
      K.box(B.dark, 1.12, 1.20, s > 0 ? HW + 0.02 : -HW - 0.03, s > 0 ? HW + 0.03 : -HW - 0.02, 1.45, 1.55);
      K.box(B.glass, 1.75, 1.90, s > 0 ? HW + 0.012 : -HW - 0.02, s > 0 ? HW + 0.02 : -HW - 0.012, 1.80, 1.95);
      K.box(B.dark, -0.15, 0.75, s > 0 ? HW : -HW - 0.015, s > 0 ? HW + 0.015 : -HW, 1.65, 2.02);
      /* the smoke dischargers at the front corners (T1), lamps */
      for (k = 0; k < 4; k++) K.cyl(B.dark, [2.80, s * (1.05 + (k % 2) * 0.12), 1.30 + (k >> 1) * 0.12], [3.02, s * (1.05 + (k % 2) * 0.12), 1.36 + (k >> 1) * 0.12], 0.045, 0.045, 8);
      K.cyl(B.dark, [2.95, s * 0.75, 1.45], [3.00, s * 0.75, 1.45], 0.09, 0.09, 12);
      K.cyl(B.glass, [3.00, s * 0.75, 1.45], [3.01, s * 0.75, 1.45], 0.07, 0.07, 12);
    }
    /* the visor box over the front panes (T2), the roof hatch ring, the team plate */
    K.box(B.paint, 2.05, 2.62, -0.95, 0.55, ZCR - 0.10, ZCR + 0.22);
    K.box(B.dark, 2.62, 2.64, -0.90, 0.50, ZCR - 0.05, ZCR + 0.17);
    K.cylZ(B.dark, 0.95, 0.55, ZCR, ZCR + 0.06, 0.32, 16);
    K.box(B.team, 0.20, 0.70, -0.40, 0.20, ZCR, ZCR + 0.03);
    /* the cab's rear wall (T2): the launcher compartment's front */
    K.box(B.dark, XC - 0.02, XC, -1.10, 1.10, ZD + 0.10, ZCR - 0.10);
  }
  /* the optical tracker through the starboard roof (published): its hatch closed on the march, raised
     with its head when set up (T2) */
  function tracker(B, up) {
    var x = 1.55, y = -0.45;
    K.cylZ(B.paint, x, y, ZCR, ZCR + 0.08, 0.36, 18);
    if (!up) { K.cylZ(B.dark, x, y, ZCR + 0.08, ZCR + 0.12, 0.30, 16); return; }
    K.cylZ(B.paint, x, y, ZCR + 0.08, ZCR + 0.30, 0.26, 16);
    K.box(B.paint, x - 0.22, x + 0.28, y - 0.20, y + 0.20, ZCR + 0.30, ZCR + 0.62);
    K.box(B.glass, x + 0.28, x + 0.30, y - 0.14, y + 0.14, ZCR + 0.40, ZCR + 0.55);
    K.box(B.paint, x - 0.40, x - 0.30, y - 0.36, y + 0.36, ZCR + 0.08, ZCR + 0.70);
  }
  /* the launcher: the drum, the housing, the radar dome (T2, T3), the command dish */
  function head(B) {
    K.cylZ(B.paint, 0, 0, 0, TRZ - 0.05, 0.56, 24);
    K.box(B.paint, -0.62, 0.62, -0.56, 0.56, TRZ - 0.05, 1.00);
    K.cylZ(B.paint, 0, 0, 1.00, 1.36, 0.50, 24);
    K.cyl(B.paint, [0, 0, 1.36], [0, 0, 1.48], 0.50, 0.40, 24, true, false);
    K.cylZ(B.dark, 0, 0, 1.48, 1.52, 0.10, 10);
    K.cylY(B.dark, TRX, -0.64, 0.64, TRZ, 0.10, 12);
    K.cyl(B.paint, [0.62, -0.34, 0.80], [0.74, -0.34, 0.80], 0.04, 0.27, 16, false, true);
    K.cyl(B.dark, [0.74, -0.34, 0.80], [0.75, -0.34, 0.80], 0.27, 0.27, 16);
  }
  /* the two armoured boxes, four rounds each (published: eight protected rails), doors at the ends */
  function pod(B) {
    var cells = [], s, i, j, y, z, t, x0 = -0.95, x1 = 1.40;
    for (s = -1; s <= 1; s += 2) {
      var ya = s > 0 ? 0.64 : -1.28, yb = s > 0 ? 1.28 : -0.64;
      K.box(B.paint, x0, x1, ya, yb, -0.30, 0.32);
      K.box(B.paint, x0 + 0.05, x1 - 0.05, ya + 0.03, yb - 0.03, 0.32, 0.38);
      K.box(B.dark, x1, x1 + 0.02, ya + 0.04, yb - 0.04, -0.26, 0.28);
      K.box(B.dark, x0 - 0.02, x0, ya + 0.04, yb - 0.04, -0.26, 0.28);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        y = s * (0.80 + i * 0.32); z = -0.14 + j * 0.30;
        t = [x0 + 0.06, y, z];
        cells.push([t[0] + RR.L, y, z, t[0]]);
      }
    }
    return cells;
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, {});
    var g = K.group(THREE, "gbr_e80_sam"), B, i, wg, tg, pg, dp, tp;
    B = K.bins(T, ["paint", "dark", "glass", "team"]);
    B.red = B.glass;
    hull(B); cab(B);
    sprocketDiscs({ paint: new K.XF(B.paint, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [SPR.x, 0, SPR.z]), dark: new K.XF(B.dark, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [SPR.x, 0, SPR.z]) });
    idlerDiscs({ paint: new K.XF(B.paint, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [IDL.x, 0, IDL.z]), dark: new K.XF(B.dark, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [IDL.x, 0, IDL.z]) });
    var hg = K.group(THREE, "hull"); K.flush(THREE, hg, B); g.add(hg);
    dp = K.group(THREE, "deploypose"); dp.visible = false;
    B = K.bins(T, ["paint", "dark"]); B.glass = B.dark; tracker(B, true); K.flush(THREE, dp, B); g.add(dp);
    tp = K.group(THREE, "travelpose");
    B = K.bins(T, ["paint"]); B.dark = B.paint; tracker(B, false); K.flush(THREE, tp, B); g.add(tp);
    for (i = 0; i < XW.length; i++) {
      B = K.wheelBins(T); wheelDiscs(B);
      wg = K.group(THREE, "roadwheel", XW[i], 0, ZW);
      K.flush(THREE, wg, B); g.add(wg);
    }
    tg = K.group(THREE, "turret", XTT, 0, ZD);
    B = K.bins(T, ["paint", "dark"]); head(B); K.flush(THREE, tg, B);
    pg = K.group(THREE, "podelev", TRX, 0, TRZ);
    B = K.bins(T, ["paint", "dark"]);
    var cells = pod(B); K.flush(THREE, pg, B);
    pg.userData.el = EL; pg.userData.cells = cells;
    tg.add(pg); g.add(tg);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* ===================================================== Roland 2 on the AMX-30R (fra_e80_sam) */
var HeroRoland = (function () {
  "use strict";
  var K = HeroEuSamKit, TAU = K.TAU;
  var PAINT = { key: "eusam_roland", base: "#545a3c", blots: [["#5c6243", 9, 50], ["#4a5035", 9, 45]], seed: 1981 };
  /* ROLAND TABLE (O1) */
  var XNO = 3.43, XRE = -3.23, ZD = 1.93, HW = 1.55, TYC = 1.27, THW = 0.27;
  var XW = [1.62, 0.67, -0.28, -1.23, -2.18], RW = 0.38, ZW = 0.44;
  var IDL = { x: 2.57, z: 0.63, r: 0.33 }, SPR = { x: -2.99, z: 0.75, r: 0.30 };
  var RET = [1.02, 0.16, -0.75, -1.61, -2.40], ZRT = 0.86, RRT = 0.11;
  var XTT = 0.59, TRX = -0.08, TRZ = 0.31, TAX = 0.43, TBK = 0.66, TLEN = 2.79, TR = 0.15, TY = 1.02, EL = 0.50;

  function hull(B) {
    var s, k, C = [];
    /* the hull side profile (O1): lower glacis, upper glacis to the deck, the high box hull of the
       AMX-30R, vertical rear plate */
    K.profY(B.paint, [[XRE, 0.55], [XRE + 0.30, 0.42], [2.55, 0.42], [XNO, 1.22], [2.68, ZD], [XRE, ZD]], -0.98, 0.98);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.98 : -HW, y1 = s > 0 ? HW : -0.98;
      /* the sponson over the track, side plate from 1.10 to the deck */
      K.profY(B.paint, [[XRE, 1.10], [3.28, 1.10], [XNO, 1.22], [2.68, ZD], [XRE, ZD]], y0, y1);
      K.box(B.dark, XRE + 0.05, 3.0, s > 0 ? HW - 0.005 : -HW - 0.01, s > 0 ? HW + 0.01 : -HW + 0.005, 1.09, 1.12);
      /* track guard edge and mud flaps */
      K.box(B.paint, XRE - 0.05, 3.10, s > 0 ? HW - 0.30 : -HW, s > 0 ? HW : -HW + 0.30, 1.04, 1.10);
      /* lamps on the glacis corners, tow hooks */
      K.box(B.dark, 3.02, 3.20, s * 1.25 - 0.10, s * 1.25 + 0.10, 1.40, 1.55);
      K.cyl(B.glass, [3.10, s * 1.25, 1.60], [3.16, s * 1.25, 1.62], 0.06, 0.06, 10);
      K.box(B.dark, XNO - 0.12, XNO + 0.05, s * 0.75 - 0.06, s * 0.75 + 0.06, 1.10, 1.25);
      /* rear: the louvred grille box and the exhaust (O1), lamps */
      K.box(B.red, XRE - 0.03, XRE, s * 1.30 - 0.06, s * 1.30 + 0.06, 1.70, 1.80);
    }
    K.box(B.paint, -3.30, -2.10, -1.30, 1.30, 1.22, 1.93);
    for (k = 0; k < 9; k++) K.box(B.dark, -2.18 - k * 0.12, -2.14 - k * 0.12, -1.31, -1.29, 1.28, 1.58);
    K.box(B.dark, -3.31, -3.29, -1.10, 1.10, 1.30, 1.80);
    K.cyl(B.dark, [-3.25, -0.95, 1.45], [-3.46, -0.95, 1.45], 0.09, 0.09, 10);
    /* deck: driver's hatch front left, the ring of the turret, engine deck grilles, team plate */
    K.cylZ(B.paint, 2.10, 0.60, ZD, ZD + 0.06, 0.30, 14);
    K.box(B.glass, 2.35, 2.42, 0.45, 0.75, ZD + 0.02, ZD + 0.10);
    K.cylZ(B.dark, XTT, 0, ZD, ZD + 0.05, 0.95, 24);
    K.box(B.paint, -2.05, -0.75, -1.05, 1.05, ZD, ZD + 0.03);
    for (k = 0; k < 11; k++) K.box(B.dark, -1.98 + k * 0.115, -1.94 + k * 0.115, -0.98, 0.98, ZD + 0.03, ZD + 0.045);
    K.box(B.team, -2.55, -2.20, -0.50, 0.50, ZD, ZD + 0.035);
    /* the running gear: the belt round the idler (front), the wheels, the sprocket (rear), back over
       the return rollers */
    for (k = XW.length - 1; k >= 0; k--) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: IDL.x, z: IDL.z, r: IDL.r + 0.03 });
    for (k = 0; k < RET.length; k++) C.push({ x: RET[k], z: ZRT, r: RRT + 0.03 });
    C.push({ x: SPR.x, z: SPR.z, r: SPR.r + 0.03 });
    var path = K.trackPath(C);
    K.belt(B.dark, path, TYC - THW, TYC + THW);
    K.belt(B.dark, path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < RET.length; k++) K.cylY(B.dark, RET[k], s * (TYC - 0.12), s * (TYC + 0.12), ZRT, RRT, 12);
      for (k = 0; k < XW.length; k++) K.bar(B.dark, [XW[k], s * (HW - 0.45), ZW], [XW[k] + 0.40, s * (HW - 0.45), ZW + 0.25], 0.09);
    }
  }
  function wheelDiscs(B) {
    var s, side, o, k, a;
    for (s = -1; s <= 1; s += 2) {
      for (side = -1; side <= 1; side += 2) {
        o = s * TYC + side * 0.13;
        K.cylY(B.rub, 0, o - 0.09, o + 0.09, 0, RW, 20);
        K.cyl(B.paint, [0, o + side * 0.09, 0], [0, o + side * 0.11, 0], RW - 0.05, RW - 0.08, 20, false, false);
        for (k = 0; k < 5; k++) {
          a = (k + 0.5) / 5 * TAU;
          K.cyl(B.dark, [Math.cos(a) * 0.20, o + side * 0.105, Math.sin(a) * 0.20], [Math.cos(a) * 0.20, o + side * 0.115, Math.sin(a) * 0.20], 0.06, 0.06, 10);
        }
        K.cyl(B.dark, [0, o + side * 0.11, 0], [0, o + side * 0.16, 0], 0.10, 0.07, 10);
      }
    }
  }
  function idlerDiscs(B) {
    for (var s = -1; s <= 1; s += 2) {
      K.cylY(B.paint, 0, s * TYC - 0.20, s * TYC + 0.20, 0, IDL.r - 0.02, 20);
      K.cylY(B.dark, 0, s * (TYC + 0.20), s * (TYC + 0.26), 0, 0.10, 10);
    }
  }
  function sprocketDiscs(B) {
    for (var s = -1; s <= 1; s += 2) {
      K.gear(B.dark, 0, s * TYC - 0.20, s * TYC - 0.12, 0, SPR.r - 0.03, SPR.r + 0.035, 13);
      K.gear(B.dark, 0, s * TYC + 0.12, s * TYC + 0.20, 0, SPR.r - 0.03, SPR.r + 0.035, 13);
      K.cylY(B.paint, 0, s * TYC - 0.12, s * TYC + 0.12, 0, 0.20, 14);
      K.cylY(B.dark, 0, s * (TYC + 0.20), s * (TYC + 0.28), 0, 0.12, 10);
    }
  }
  /* the turret (O1-O3): a low box on the ring, the trunnion bosses each side, the standing search
     antenna on its mast at the rear (O1 3.35-4.37 m), the tracking dish at the front right (O3) */
  function head(B) {
    K.cylZ(B.paint, 0, 0, 0, 0.12, 0.92, 24);
    K.profY(B.paint, [[-0.90, 0.12], [0.95, 0.12], [0.95, 0.40], [0.70, 0.55], [-0.90, 0.55]], -0.85, 0.85);
    K.cylY(B.paint, TRX, -0.95, -0.85, TRZ, 0.30, 16);
    K.cylY(B.paint, TRX, 0.85, 0.95, TRZ, 0.30, 16);
    K.cylY(B.dark, TRX, -0.97, -0.95, TRZ, 0.16, 12);
    K.cylY(B.dark, TRX, 0.95, 0.97, TRZ, 0.16, 12);
    /* sight head with its window under the antenna (O1) */
    K.box(B.paint, -0.62, -0.12, -0.25, 0.25, 0.55, 0.95);
    K.box(B.glass, -0.12, -0.10, -0.15, 0.15, 0.72, 0.86);
    /* the antenna mast and the reflector: a curved panel 0.8 x 1.0 m facing aft-up, with its feed */
    K.cylZ(B.dark, -0.40, 0, 0.95, 1.40, 0.08, 10);
    var k, a0, a1, rr = 0.75, zc = 2.00;
    for (k = 0; k < 6; k++) {
      a0 = -0.55 + k / 6 * 1.1; a1 = -0.55 + (k + 1) / 6 * 1.1;
      K.hexa(B.paint, [[-0.40 + Math.cos(a0) * rr * 0.55 - 0.28, -0.40, zc + Math.sin(a0) * rr], [-0.40 + Math.cos(a1) * rr * 0.55 - 0.28, -0.40, zc + Math.sin(a1) * rr],
                       [-0.40 + Math.cos(a1) * rr * 0.55 - 0.28, 0.40, zc + Math.sin(a1) * rr], [-0.40 + Math.cos(a0) * rr * 0.55 - 0.28, 0.40, zc + Math.sin(a0) * rr],
                       [-0.40 + Math.cos(a0) * rr * 0.55 - 0.24, -0.40, zc + Math.sin(a0) * rr], [-0.40 + Math.cos(a1) * rr * 0.55 - 0.24, -0.40, zc + Math.sin(a1) * rr],
                       [-0.40 + Math.cos(a1) * rr * 0.55 - 0.24, 0.40, zc + Math.sin(a1) * rr], [-0.40 + Math.cos(a0) * rr * 0.55 - 0.24, 0.40, zc + Math.sin(a0) * rr]]);
    }
    K.bar(B.dark, [-0.40, 0, 1.40], [-0.45, 0, 1.55], 0.08);
    K.box(B.dark, -0.55, -0.35, -0.12, 0.12, 1.40, 1.55);
    K.bar(B.dark, [-0.20, 0, 1.62], [-0.55, 0, 2.00], 0.04);
    K.box(B.dark, -0.66, -0.52, -0.08, 0.08, 1.95, 2.08);
    /* the tracking radar dish (O3: by the right tube), facing forward */
    K.bar(B.dark, [0.70, -0.45, 0.50], [0.85, -0.45, 0.70], 0.08);
    K.cyl(B.paint, [0.82, -0.45, 0.85], [0.98, -0.45, 0.85], 0.05, 0.36, 18, false, true);
    K.cyl(B.dark, [0.98, -0.45, 0.85], [0.99, -0.45, 0.85], 0.36, 0.36, 18);
    K.cyl(B.dark, [0.99, -0.45, 0.85], [1.20, -0.45, 0.85], 0.025, 0.025, 6);
  }
  /* the two launch tubes on their arms, level at rest (O3), raised 28 deg to fire (O1) */
  function pod(B) {
    var cells = [], s, y, z = TAX;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      K.box(B.paint, -0.25, 0.25, s > 0 ? 0.95 : -TY - TR + 0.02, s > 0 ? TY + TR - 0.02 : -0.95, -0.12, 0.10);
      K.box(B.paint, -0.15, 0.15, y - 0.06, y + 0.06, 0.05, z - TR + 0.02);
      K.cylX(B.tube, -TBK, -TBK + TLEN, y, z, TR, 16);
      K.cylX(B.dark, -TBK - 0.01, -TBK, y, z, TR - 0.03, 14);
      K.cylX(B.dark, -TBK + TLEN, -TBK + TLEN + 0.01, y, z, TR - 0.03, 14);
      K.box(B.tube, -TBK + 0.2, -TBK + TLEN - 0.2, y - 0.04, y + 0.04, z + TR - 0.02, z + TR + 0.04);
      cells.push([-TBK + TLEN, y, z, -TBK]);
    }
    return cells;
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { tube: [0x8f8f62, 0.7, 0.05], red: [0x9a3a26, 0.6, 0.05] });
    var g = K.group(THREE, "fra_e80_sam"), B, i, wg, tg, pg;
    B = K.bins(T, ["paint", "dark", "glass", "team"]);
    B.red = B.glass;
    hull(B);
    var I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    idlerDiscs({ paint: new K.XF(B.paint, I3, [IDL.x, 0, IDL.z]), dark: new K.XF(B.dark, I3, [IDL.x, 0, IDL.z]) });
    sprocketDiscs({ paint: new K.XF(B.paint, I3, [SPR.x, 0, SPR.z]), dark: new K.XF(B.dark, I3, [SPR.x, 0, SPR.z]) });
    var hg = K.group(THREE, "hull"); K.flush(THREE, hg, B); g.add(hg);
    for (i = 0; i < XW.length; i++) {
      B = K.wheelBins(T); wheelDiscs(B);
      wg = K.group(THREE, "roadwheel", XW[i], 0, ZW);
      K.flush(THREE, wg, B); g.add(wg);
    }
    tg = K.group(THREE, "turret", XTT, 0, ZD + 0.05);
    B = K.bins(T, ["paint", "dark"]); B.glass = B.dark; head(B); K.flush(THREE, tg, B);
    pg = K.group(THREE, "podelev", TRX, 0, TRZ);
    B = K.bins(T, ["paint", "tube"]); B.dark = B.paint; B.red = B.tube;
    var cells = pod(B); K.flush(THREE, pg, B);
    pg.userData.el = EL; pg.userData.cells = cells;
    tg.add(pg); g.add(tg);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* ===================================================== SAMP/T launcher on the Kerax 8x8 (fra_e00_sam) */
var HeroSampT = (function () {
  "use strict";
  var K = HeroEuSamKit, TAU = K.TAU;
  var PAINT = { key: "eusam_sampt", base: "#4d5539", blots: [["#566040", 9, 50], ["#444c33", 9, 45]], seed: 2011 };
  var AXL = [3.90, 2.45, -1.55, -2.95], RT = 0.58, YT = 0.98, WT = 0.40;   /* 1.16 m tyres */
  var XB = 5.05, XCB = 2.85, CW = 1.15, ZCF = 1.25, ZCR = 3.15;           /* bumper, cab rear, cab half width (2.30 published) */
  var XRE = -3.95, ZF0 = 0.95, ZF1 = 1.25;
  /* the pack: 5.5 x 2.2 x 1.1 m, eight 0.55 m canisters 4 wide x 2 high; hinged at its rear lower edge */
  var HX = -3.35, HZ = 2.75, PL = 5.50, PC = 0.55, EL = Math.PI / 2;

  function cab(B) {
    var s, k;
    /* the square cab (S1, S3): flat front, the windscreen, a short rake at the top, grille, bumper */
    K.profY(B.paint, [[XCB, ZCF], [XB - 0.10, ZCF], [XB - 0.05, 2.05], [XB - 0.12, 3.00], [XB - 0.30, ZCR], [XCB, ZCR]], -CW, CW);
    K.box(B.glass, XB - 0.10, XB - 0.02, -1.05, 1.05, 2.15, 2.85);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.glass, 3.75, 4.75, s > 0 ? CW - 0.01 : -CW - 0.03, s > 0 ? CW + 0.03 : -CW + 0.01, 2.15, 2.80);
      K.box(B.dark, 3.40, 4.80, s > 0 ? CW : -CW - 0.008, s > 0 ? CW + 0.008 : -CW, 1.30, 2.10);
      /* mirrors on their arms */
      K.bar(B.dark, [XB - 0.35, s * CW, 2.70], [XB - 0.20, s * (CW + 0.30), 2.75], 0.04);
      K.box(B.dark, XB - 0.28, XB - 0.16, s * (CW + 0.24), s * (CW + 0.42), 2.40, 2.90);
      /* steps under the doors, headlamps in the bumper */
      K.box(B.dark, 3.80, 4.60, s > 0 ? CW - 0.25 : -CW, s > 0 ? CW : -CW + 0.25, 0.75, 0.82);
      K.box(B.glass, XB + 0.10, XB + 0.13, s * 0.85 - 0.18, s * 0.85 + 0.18, 1.05, 1.18);
    }
    K.box(B.dark, XB - 0.08, XB - 0.04, -0.85, 0.85, 1.45, 1.95);
    for (k = 0; k < 5; k++) K.box(B.paint, XB - 0.05, XB - 0.02, -0.85, 0.85, 1.50 + k * 0.10, 1.53 + k * 0.10);
    K.box(B.dark, XB - 0.15, XB + 0.15, -1.20, 1.20, 0.85, 1.25);
    K.box(B.team, 3.40, 4.30, -0.50, 0.50, ZCR, ZCR + 0.035);
  }
  function chassis(B) {
    var s, k, i;
    K.box(B.dark, XRE, XCB + 1.8, -0.50, -0.35, ZF0, ZF1);
    K.box(B.dark, XRE, XCB + 1.8, 0.35, 0.50, ZF0, ZF1);
    /* the launcher bed and its equipment boxes (S1, S2), fuel tanks */
    K.box(B.paint, XRE, XCB - 0.15, -1.20, 1.20, ZF1, ZF1 + 0.10);
    K.box(B.paint, XCB - 1.30, XCB - 0.15, -1.05, 1.05, ZF1 + 0.10, 2.40);
    K.box(B.paint, -0.60, 1.35, -1.20, -0.55, ZF1 + 0.10, 1.90);
    K.box(B.paint, -0.60, 1.35, 0.55, 1.20, ZF1 + 0.10, 1.90);
    K.box(B.dark, 0.10, 1.10, -1.21, -1.20, 1.45, 1.80);
    K.box(B.dark, 0.10, 1.10, 1.20, 1.21, 1.45, 1.80);
    /* the pack cradle posts and the hinge block at the rear */
    K.box(B.paint, 0.95, 1.25, -0.95, 0.95, ZF1 + 0.10, HZ - 0.02);
    K.box(B.paint, HX - 0.35, HX + 0.25, -1.00, 1.00, ZF1 + 0.10, HZ - 0.05);
    K.cylY(B.dark, HX, -1.05, 1.05, HZ, 0.10, 12);
    for (s = -1; s <= 1; s += 2) {
      /* mudguards over each axle pair, under-run bars, rear lamps */
      K.box(B.paint, AXL[1] - 0.70, AXL[0] + 0.70, s > 0 ? 0.80 : -1.25, s > 0 ? 1.25 : -0.80, 1.28, 1.34);
      K.box(B.paint, AXL[3] - 0.70, AXL[2] + 0.70, s > 0 ? 0.80 : -1.25, s > 0 ? 1.25 : -0.80, 1.28, 1.34);
      K.box(B.dark, AXL[2] + 0.70, AXL[1] - 0.70, s > 0 ? 1.05 : -1.20, s > 0 ? 1.20 : -1.05, 0.55, 0.65);
      K.box(B.red, XRE - 0.02, XRE, s * 1.00 - 0.10, s * 1.00 + 0.10, 0.90, 1.00);
    }
    K.box(B.dark, XRE - 0.10, XRE, -1.10, 1.10, 0.70, 0.85);
    for (i = 0; i < AXL.length; i++) K.box(B.dark, AXL[i] - 0.10, AXL[i] + 0.10, -0.80, 0.80, RT - 0.10, RT + 0.10);
    /* the mast stowed along the bed (S3 shows it up when set up; stowed it lies here) */
    K.cyl(B.dark, [-0.20, 0.95, 2.00], [2.40, 0.95, 2.05], 0.05, 0.04, 8);
  }
  /* the jacks: two at the rear corners, two behind the cab (S3) */
  function jacks(B, down) {
    var xs = [XRE + 0.10, 0.60], i, s, x, y, zb = down ? 0.0 : 0.45;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      x = xs[i]; y = s * 1.35;
      K.box(B.paint, x - 0.08, x + 0.08, s > 0 ? 0.50 : -1.40, s > 0 ? 1.40 : -0.50, 1.00, 1.15);
      K.cylZ(B.paint, x, y, 0.80, 1.25, 0.08, 10);
      K.cylZ(B.dark, x, y, zb + 0.04, 0.85, 0.05, 8);
      K.cylZ(B.dark, x, y, zb, zb + 0.04, 0.22, 4);
    }
  }
  /* the pack, built lying, mouths forward; x from the hinge */
  function pod(B) {
    var cells = [], i, j, y, z, k;
    for (i = 0; i < 4; i++) for (j = 0; j < 2; j++) {
      y = (i - 1.5) * PC; z = (j + 0.5) * PC;
      K.box(B.paint, 0.05, PL, y - PC / 2 + 0.01, y + PC / 2 - 0.01, z - PC / 2 + 0.01, z + PC / 2 - 0.01);
      for (k = 0; k < 9; k++) K.box(B.dark, 0.45 + k * 0.58, 0.49 + k * 0.58, y - PC / 2 + 0.005, y + PC / 2 - 0.005, z + PC / 2 - 0.012, z + PC / 2 - 0.004);
      K.box(B.cap, PL, PL + 0.03, y - PC / 2 + 0.05, y + PC / 2 - 0.05, z - PC / 2 + 0.05, z + PC / 2 - 0.05);
      K.box(B.cap, 0.02, 0.05, y - PC / 2 + 0.05, y + PC / 2 - 0.05, z - PC / 2 + 0.05, z + PC / 2 - 0.05);
      cells.push([PL + 0.03, y, z, 0.02]);
    }
    /* the frame round the pack: end frames and the side rails */
    K.box(B.dark, 0.0, 0.10, -1.14, 1.14, -0.04, 2 * PC + 0.04);
    K.box(B.dark, PL - 0.10, PL, -1.14, 1.14, -0.04, 2 * PC + 0.04);
    for (j = -1; j <= 1; j += 2) K.box(B.dark, 0.0, PL, j > 0 ? 1.10 : -1.14, j > 0 ? 1.14 : -1.10, PC - 0.05, PC + 0.05);
    K.box(B.dark, 0.0, PL, -1.0, 1.0, -0.06, 0.0);
    return cells;
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { cap: [0xd7d9d4, 0.6, 0.05], red: [0x8a2a22, 0.5, 0.1] });
    var g = K.group(THREE, "fra_e00_sam"), B, i, s, wg, pg, dp, tp;
    B = K.bins(T, ["paint", "dark", "glass", "team"]);
    B.red = B.glass;
    cab(B); chassis(B);
    var hg = K.group(THREE, "hull"); K.flush(THREE, hg, B); g.add(hg);
    dp = K.group(THREE, "deploypose"); dp.visible = false;
    B = K.bins(T, ["paint", "dark"]); jacks(B, true);
    /* the mast raised when set up (S3) */
    K.cylZ(B.dark, -0.20, 0.95, 1.90, 6.20, 0.05, 8);
    K.box(B.dark, -0.30, -0.10, 0.85, 1.05, 5.60, 5.75);
    K.flush(THREE, dp, B); g.add(dp);
    tp = K.group(THREE, "travelpose");
    B = K.bins(T, ["paint", "dark"]); jacks(B, false); K.flush(THREE, tp, B); g.add(tp);
    for (i = 0; i < AXL.length; i++) {
      wg = K.group(THREE, "roadwheel", AXL[i], 0, RT);
      B = K.wheelBins(T);
      for (s = -1; s <= 1; s += 2) K.tyre(B, s * YT, RT, WT, s, 0.30);
      K.flush(THREE, wg, B); g.add(wg);
    }
    pg = K.group(THREE, "podelev", HX, 0, HZ);
    B = K.bins(T, ["paint", "dark", "cap"]);
    var cells = pod(B); K.flush(THREE, pg, B);
    pg.userData.el = EL; pg.userData.cells = cells;
    g.add(pg);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* ===================================================== registration */
/* len: the measured X extent of each build in its template pose (tools/model3d/dump.js) */
UNIT_MODELS["gbr_e50_sam"] = { len: 8.09, build: HeroBloodhound.build };
UNIT_MODELS["gbr_e60_sam"] = { len: 4.35, build: HeroRapierTowed.build };
UNIT_MODELS["gbr_e80_sam"] = { len: 6.04, build: HeroTrackedRapier.build };
UNIT_MODELS["gbr_e90_sam"] = { len: 3.98, build: HeroRapierFsc.build("gbr_e90_sam") };
UNIT_MODELS["gbr_e00_sam"] = { len: 3.98, build: HeroRapierFsc.build("gbr_e00_sam") };
UNIT_MODELS["fra_e80_sam"] = { len: 6.94, build: HeroRoland.build };
UNIT_MODELS["fra_e00_sam"] = { len: 9.27, build: HeroSampT.build };
