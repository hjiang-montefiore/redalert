/* ===== nato_launchers_eu.js - HERO models: missile launchers in German and British service =====
   Rows (registered at the foot; this file must load after js/hero/us_early_rockets.js):
     deu_e60_sam  HAWK (1965)            M192 towed triple launcher, three MIM-23A    NEW   turret, deploy
     deu_e80_sam  Improved HAWK (1978)   the same M192, three MIM-23B                 NEW   turret, deploy
     deu_e90_sam  Patriot PAC-2 (1989)   M901 launching station on the MAN Kat I A1   NEW   turret, deploy
                                         8x8 (NOT the US M983/M860: see below)
     deu_e80_tel  MGM-52 Lance           M752 tracked launcher (M667 carrier)         NEW   deploy
     gbr_e60_tel  Lance (1976)           the same M752, British paint                 NEW   deploy
     gbr_e90_tel  Lance (MGM-52C)        the same M752, British paint                 NEW   deploy
     deu_e60_tel  MGM-29 Sergeant        erector-launcher semitrailer, 5-ton tractor  NEW   deploy
                                         (no US Sergeant model exists to reuse)
     gbr_e50_tel  Corporal (1957)        REUSED: HeroUsEarlyRockets.buildCorporal (the
                                         US rig), the round recoloured olive    deploy
   No HAWK launcher existed (js/hero/us_m548_family.js draws the M727 SP-HAWK; its rounds ride
   ON their arms, the M192 photographs below show them HANGING UNDER the beams, so its pod was
   not copied), no Lance and no Sergeant.

   REFERENCES (Wikimedia Commons at width 960, cached in scratchpad q_natoeu_ref):
     HAWK
     [LW]  "MIM-23 Hawk launcher Luftwaffe 1981.jpeg" - a Luftwaffe M192 head-on, raised:
           the centre round highest, the outer two lower and abreast, the X wings.
     [GT]  "MIM-23 HAWK launcher Gatow 2022.jpg" - a German M192 at the Luftwaffe museum,
           3/4 front, raised: the box carriage, one wheel a side under a fender toward the
           rear, the A-frame drawbar, splayed lattice outriggers on square pads, the column
           and its boxes, the beams OVER the rounds.
     [LK]  "A view of an M-192 Hawk missile launcher rebuilt at Letterkenny Army Depot" -
           the bare launcher: the A-frame drawbar and lunette, the front jack, the box body,
           the wheel at the rear, the launcher head with the three beams.
     [ER]  "US Army personnel erect an MIM-23B Hawk missile launcher after it has been towed
           into position" - the rounds hang under their launch beams; frames above the
           centre round.
     [CK]  "Hawk Missile Launcher in Chengkungling Oct2011a.jpg" - from the tail, the
           launcher trained abeam, the rounds LEVEL and side-on: THE HEIGHTS (scaled at
           147 px a metre off the 5.08 m round: outer axes 2.0 m, the centre 0.35 m
           higher, wing tips 2.8 m, carriage top 1.1 m, wheels 0.95 m, 2.24 m over the
           tyres); the rear outriggers splayed to pads about 2.3 m out each side.
     [GS]  "Hawk Missile Launcher Display at Gangshan Air Force Base 20111015.jpg" - rear
           quarter: lamps on the end face, the wheel close to it, the rear legs.
     [V65] "Hawk Missile Launcher, Vietnam, September 1965.jpg" - a Basic HAWK launcher
           near side-on: WHITE rounds with dark wings and a dark band; the carriage
           (box about 2.6 x 0.65 m by the 0.95 m wheel), the wheel near the end.
     Wikipedia "MIM-23 Hawk": MIM-23A 5.08 m, MIM-23B 5.03 m, 0.37 m, span 1.21 m; "the
       M192 towed triple-missile launcher".
     PATRIOT (DE)
     [S17] "Patriot Startgeraett@20170610.jpg" - a German launcher near side-on, set up,
           stack raised: THE STATION TABLE, each pair of axles scaled off its own tyre
           (taken as the Kat I's 14.00 R 20, 1.24 m): front pair 1.95 m apart, middle gap
           3.35 m, rear pair 1.37 m; the bumper 1.52 m ahead of axle 1; the cab roof
           2.88 m; the spare wheel standing behind the cab; the operator's box with its
           panel (top 3.5 m) and the railed platform; the LEM box; the hinge 0.85 m
           behind the turntable and 2.4 m up; the screw jacks with square feet, a pair
           behind axle 2 and a pair at the tail; the ram leaning forward.  Raised: the
           canister top edge reads 31 deg and the underside 37: drawn at 34 deg (the
           US hero's [S] also reads 34).
     [RS]  "MIM-104 Patriot LS prepared to move Rostock 2016.JPG" - travel: the stack of
           2 x 2 canisters lying level from just behind the box behind the cab to the
           tail, 8x8 MAN, three-colour paint.
     [PS2] "Patriot System 2.jpg" (MAN Kat I A1 with Patriot), [D24] "Blue Light Mile
           Dresden ... Side view one.jpg" (2024) - the forward-control cab with its cut
           corners, the screen covered, the spare wheel, the railing.
     Wikipedia "MAN KAT1": the Kat I A1 (from 1987) added "an extra wide 8x8 version for
       the Patriot and Roland systems" and "extra-wide (2.9 m)" chassis; height under
       2.9 m for rail; "cut-away corners" of the cab.  So the German launcher sits ON a
       MAN truck, not on the US tractor and semitrailer: js/hero/us_patriot.js was not
       reused.
     LANCE
     [D2]  "M667 dimensions.jpg" (TM drawing, inches) - 258 long, 106 wide, body 102,
           track centres 87, track 15, clearance 16, side top 76, cab 107.2, first road
           wheel 26.9 behind the sprocket, five wheels over 111: THE STATION TABLE; the
           raked tail (bottom 218 in from the bow), the bow upright to 44 in, the 22.5 deg
           lower glacis; the narrow cab at the front LEFT (rear view: 29 in wide).
     [MC]  "M752 Self-Propelled Launcher major components.jpg" (TM) - the open box hull,
           the launch fixture over the rear half.
     [HT]  "M667-Lance-beyt-hatotchan-2.jpg" - port side: the round lying nose forward,
           its tail at the rear top corner, the cab's frame (canvas off) at the front, the
           black skirt over the tracks, the ribbed sides, the plate on the ground at the
           tail.  The round measures 6.38 m once its centre-line depth is taken out of the
           near-side hull scale: the published 21 ft (6.40 m) is drawn.
     [NL]  "Een FMC M752 lanceervoertuig ... (2001 516-79-I11).jpg" (Dutch Army, 129 Afd)
           - set up: the round raised on its beam from a pivot at the TAIL, leaning
           forward over the hull, the stabiliser plate lowered from the tail to the
           ground, lamps at the rear corners.
     [LS]  "Lance missile system tracked self-propelled.png" (early artwork) - only the
           narrow cab's place at the front left is taken from it.
     Wikipedia "MGM-52 Lance": 21 ft, 22 in; "M752 launchers (one missile each)".
     SERGEANT
     [XM]  "Sergeant Guided Missile Launcher XM-97 - DPLA" (Watertown Arsenal 1962) - the
           travelling position: a bonneted 6x6 tractor (the 5-ton M52 family) towing the
           erector-launcher semitrailer, gooseneck over the tandem, the boom lying from a
           pivot behind the gooseneck back over the trailer, the trailer's two axles at the
           tail.  It travels EMPTY.
     [S04] "MGM-29 Sergeant 04.jpg" - raised: the round on the boom's upper face, its tail
           at the pivot, leaning about 65 deg toward the trailer's tail; clamp collars;
           olive drab round and launcher.
     Wikipedia "MGM-29 Sergeant": 10.52 m, 790 mm, fin span 1.80 m.
     CORPORAL (GB)
     [IWM] "ROCKETS AND MISSILES R20468.jpg" ("Corporal of the Royal Artillery in West
           Germany", Wikipedia's caption): the round upright on the US-pattern launch
           table, painted dark overall (not the US white with a black tail); Wikipedia
           "MGM-5 Corporal": "the Corporal II system was sold to the United Kingdom".
           The rig itself is the US one, so it is reused; only the round's paint differs.

   RECOGNITION LIST (each drawn; where):
     HAWK  1 the low box carriage on ONE axle near its rear end, fenders over the wheels,
             the A-frame drawbar and lunette [LK][GT][GS][V65]: hawkCarriage
           2 the launcher on a turntable mid-carriage: the column with its boxes and the
             trunnion [GT][CK]: hawkTurret, "turret"
           3 three rounds hanging under three beams, the centre one 0.35 m higher, frames
             carrying the centre beam over the outer two [ER][LW][CK][V65]: hawkPod, "podelev"
           4 the 5 m round: long ogive, long-chord clipped-delta wings in an X [LW][GT]
           5 four lattice outriggers on square pads when set up, the drawbar jack [GT][CK][GS]
     PATRIOT 6 the MAN Kat I A1 8x8: forward-control cab with cut upper corners, two pairs of
             axles far apart [S17][RS][PS2]: patTruck
           7 the spare wheel standing behind the cab, the operator's box and panel, the
             LEM box [S17][PS2]
           8 the 2 x 2 canister stack lying level from behind the box to the tail, raised
             forward from a hinge over the rear axle by a long ram [RS][S17]: patPod, "podelev"
           9 four screw jacks on square feet [S17]: travelpose/deploypose
     LANCE 10 the long open-topped box hull over M113-type running gear, five wheels, front
             sprocket, the raked tail [D2][HT]: lnHull, lnRunning
          11 the narrow cab at the front left [D2][HT][LS]
          12 the round lying nose-forward along the hull on its beam, raised from a pivot at
             the tail [HT][NL]: lnPod, "podelev"
          13 the stabiliser plate down on the ground behind the tail when set up [NL][HT]
     SERGEANT 14 bonneted 6x6 tractor, semitrailer with the boom pivoted behind the
             gooseneck [XM]: sgTractor, sgTrailer
          15 the fat 10.5 m round, long ogive, four fins at the tail, on the boom's upper
             face with clamp collars; raised toward the tail [S04]: sgPod, "podelev"

   AS DRAWN (tools/model3d/dump.js; len is the visible X extent, the hidden pose inside it):
     HAWK      5.13 x 2.36 x 2.79 m; 3,548 tris, 13 draw calls
     PATRIOT  10.00 x 3.10 x 4.44 m (travel); 5,220 tris, 14 draw calls
     LANCE     6.61 x 2.65 x 2.73 m; 9,592 tris, 16 draw calls (D2: 6.55 x 2.69 x 2.72)
     SERGEANT 17.22 x 2.44 x 3.14 m; 5,440 tris, 14 draw calls
     CORPORAL 16.48 x 3.20 x 4.44 m (the US build; len 16.65 kept from its file)

   POSES ("podelev" raised to userData.el by render3d.poseLauncher; userData.cells = mouth
     x, y, z and rear x in its frame; "deploypose" shown while set up, "travelpose" not):
     HAWK: the rounds lie level [CK]; raised 30 deg (NOT CONFIRMED: the real launcher lays to
       the target; [GT] and [LW] read about 30-35).  Travel: legs folded, the drawbar jack's
       wheel clear of the ground; set up: the four legs out, the jack's foot down.
     PATRIOT: the stack level in travel [RS]; raised 34 deg [S17].  The railing stands only
       when set up: on the march the stack lies over the platform [RS].
     LANCE: the beam rests 5 deg nose-up [HT]; raised to 60 deg in all (userData.el 55)
       (NOT CONFIRMED: [NL] reads about 64 through the camera's angle; Lance was laid in
       elevation for range).  The stabiliser plate: folded up the tail on the march, down
       when set up.
     SERGEANT: the boom rests 2 deg; raised to 65 deg [S04].  The boom points AFT, so a
       fixed "boombase" turned 180 deg about Z holds it and the game's raise lifts its tail
       end.  Jacks down when set up.
   DELIBERATE DEPARTURES: render3d sizes a model by both poses, so the hidden set-up parts are
     kept inside the travel outline: the HAWK's rear pads stand 0.45 m behind the carriage
     (about 0.75 in [CK]); the Lance's stabiliser plate is drawn 1.15 m long, reaching the
     hull's tail line (about 1.5 m and past it in [NL]).  The Sergeant travels EMPTY in [XM];
     the round is drawn on the boom throughout, as the US Corporal and Pershing heroes do.
     The Patriot's ram is true when the stack is raised; laid level it is drawn through the
     LMA base (as js/hero/us_patriot.js).
   NOT CONFIRMED (estimated from proportions, no drawing or figure found):
     HAWK: the carriage's length (2.75 m) and the drawbar's (1.5 m) from [V65][LK]; the beams'
       length and the frames over the centre round; the legs' stowage on the march; the
       turntable's place; Basic and Improved rounds drawn alike but for the length.
     PATRIOT: the truck's length (9.6 m) and axle spacing (measured, no published figure in
       hand); the canister length (5.95 m with the end frames: [S17] reads shorter through its
       perspective, [RS] puts the front just behind the box; the 5.31 m missile and the US
       hero's 5.9 m settle it); widths (2.5 m body, tyres to 2.9 m: the Kat I A1 extra-wide
       figure); the LEM's size; the jacks' stowed height; the three-colour for 1989 (every
       dated photograph is 2016 or later).
     LANCE: the beam's form; the cab drawn as a closed box (its frame stands bare in [HT]);
       the pivot's place (from [NL]); the fins' size; plain Gelboliv for the German row
       (Lance served 1976-1992, across the change to the three-colour).
     SERGEANT: the tractor's figures (the M52's 4.24 m wheelbase to the tandem centre is
       memory, not fetched; [XM] is too oblique to measure); the trailer's length and
       axle places ([S04] shows a close tandem, used); the pivot place; the 3.9 m
       overhang of the round behind the trailer that follows from them; whether the
       Bundeswehr towed it with the M52 at all; the A-frame erecting gear of [S04] is NOT
       drawn (it could not follow the boom).
     CORPORAL: the British rig's tractor is taken to be the US one (no British photograph of
       the rig on the march was found).
   PAINT (no markings, numbers or insignia): Gelboliv RAL 6014 on the German HAWK, Lance and
     Sergeant rows; the Bundeswehr three-colour on the Patriot ([S17][RS][PS2][D24]); NATO
     green with black on the British Lance.  Rounds: Basic HAWK white with dark wings [V65],
     Improved HAWK olive [LW][GT]; Lance olive [NL]; Sergeant olive [S04]; Corporal (GB) olive
     [IWM].  Team colour C.team: a strip along each HAWK carriage side, the Patriot cab roof
     panel and tail boards, the Lance cab roof, the Sergeant cab roof and trailer sides.
   Model space: +X forward (the HAWK carriage's drawbar end), +Y left, +Z up, metres, wheels
     and tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNatoLaunchersEu = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* -------------------------------------------------------- geometry kit (js/hero/us_m548_family.js) */
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
  /* a closed solid: the signed volume says whether the faces point out, and they are turned if not */
  function solid(bin, V, F) {
    var vol = 0, i, f, a, b, c, fn;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;
      bin.tri(V[a], V[b], V[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      r0v = [u[0] * Math.cos(a0) + v[0] * Math.sin(a0), u[1] * Math.cos(a0) + v[1] * Math.sin(a0), u[2] * Math.cos(a0) + v[2] * Math.sin(a0)];
      r1v = [u[0] * Math.cos(a1) + v[0] * Math.sin(a1), u[1] * Math.cos(a1) + v[1] * Math.sin(a1), u[2] * Math.cos(a1) + v[2] * Math.sin(a1)];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA && r0 > 0) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB && r1 > 0) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  /* a square bar of side w from A to B */
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
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
  /* a skin lofted through cross-section rings (same point count each, rings in planes of
     constant x), capped at both ends */
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
  /* a fender: an arc of plate round (xc, zc), radius r, angles a0..a1 (0 = +X), y0..y1 */
  function arcPlate(bin, xc, zc, r, a0, a1, y0, y1, th, n) {
    for (var i = 0; i < n; i++) {
      var p = a0 + (a1 - a0) * i / n, q = a0 + (a1 - a0) * (i + 1) / n;
      var cp = Math.cos(p), sp = Math.sin(p), cq = Math.cos(q), sq = Math.sin(q), ro = r + th;
      hexa(bin, [[xc + cp * r, y0, zc + sp * r], [xc + cq * r, y0, zc + sq * r], [xc + cq * r, y1, zc + sq * r], [xc + cp * r, y1, zc + sp * r],
                 [xc + cp * ro, y0, zc + sp * ro], [xc + cq * ro, y0, zc + sq * ro], [xc + cq * ro, y1, zc + sq * ro], [xc + cp * ro, y1, zc + sp * ro]]);
    }
  }
  /* a slab in a frame: P0 origin, U/W/N axes, extents */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h, P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
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

  /* ------------------------------------------------------------------ paint */
  /* gelb: Bundeswehr RAL 6014 Gelboliv, the single colour to the mid 1980s; de3: the Bundeswehr
     three-colour (RAL 6031 bronze green, 8027 leather brown, 9021 tar black) of every dated
     photograph of a German Patriot; uk: British Army NATO green with black disruptive bands */
  var PAINT = {
    gelb: { key: "eu_gelb", base: "#4c4b36", blots: [["#55543c", 9, 55], ["#44432f", 9, 45]], seed: 1965, soft: true },
    de3:  { key: "eu_de3", base: "#3c4838", blots: [["#4d3d2e", 10, 36], ["#1f2220", 9, 20]], seed: 1989 },
    uk:   { key: "eu_uk", base: "#4a5234", blots: [["#1e201b", 11, 26]], seed: 1976 }
  };
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
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
      q.strokeStyle = "rgba(18,20,14,0.28)"; q.lineWidth = 1.1;
      for (i = 0; i < 3; i++) { q.beginPath(); q.moveTo(i * 85 + 30.5, 0); q.lineTo(i * 85 + 30.5, W); q.stroke(); }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * W, R() * W, 1 + R() * 3, 8 + R() * 36);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.key] = t;
    return t;
  }
  function std(THREE, hex, r, m) { return new THREE.MeshStandardMaterial({ color: hex, roughness: r, metalness: m }); }
  function materials(THREE, C, paint) {
    var T = {}, P = PAINT[paint], tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = std(THREE, 0x25272a, 0.78, 0.3);
    T.glass = std(THREE, 0x1d2a33, 0.14, 0.35);
    T.team = std(THREE, (C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06);
    /* the wheels: tyre and rim in one mesh, by vertex colour; the rim is the paint's base */
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.06, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.rim = [parseInt(P.base.substr(1, 2), 16) / 255 * 1.1, parseInt(P.base.substr(3, 2), 16) / 255 * 1.1, parseInt(P.base.substr(5, 2), 16) / 255 * 1.1];
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
  function group(THREE, name, B, x, y, z) {
    var g = new THREE.Group();
    if (name) g.name = name;
    g.position.set(x || 0, y || 0, z || 0);
    if (B) flush(THREE, g, B);
    return g;
  }
  /* a wheeled axle: both tyres (dark), their rims and hubs (paint), the group's origin on the
     axle centre, axle along Y */
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.10, 0.10, 0.09];
  function axleGroup(THREE, T, x, r, w, yc, rim) {
    var W = new Bin(T.wheel, false, true), B = { w: W }, s, k, a, yo;
    for (s = -1; s <= 1; s += 2) {
      W.col = TYRE;
      cyl(W, [0, s * (yc - w / 2), 0], [0, s * (yc + w / 2), 0], r, r, 22);
      yo = s * (yc + w / 2);
      W.col = T.rim;
      cyl(W, [0, yo - s * 0.01, 0], [0, yo + s * 0.012, 0], r * rim, r * rim, 18);
      cyl(W, [0, yo, 0], [0, yo + s * 0.06, 0], r * 0.30, r * 0.24, 12);
      W.col = NUT;
      for (k = 0; k < 8; k++) {
        a = k / 8 * TAU;
        box(W, r * 0.40 * Math.cos(a) - 0.02, r * 0.40 * Math.cos(a) + 0.02, Math.min(yo, yo + s * 0.03), Math.max(yo, yo + s * 0.03),
            r * 0.40 * Math.sin(a) - 0.02, r * 0.40 * Math.sin(a) + 0.02);
      }
    }
    return group(THREE, "roadwheel", B, x, 0, r);
  }

  /* =================================================================== HAWK
     the M192 towed triple launcher.  Model X = the carriage's drawbar end; the launcher trains. */
  var HK = { XB0: -1.45, XB1: 1.30, HWB: 0.78, ZB0: 0.42, ZB1: 1.10, XA: -1.02, RW: 0.48, YW: 0.98, TW: 0.28,
             XT: -0.10, TRN: 0.64, EL: 30 * D2R };
  /* the rounds in the pod frame (origin the trunnion): outer pair low, the centre one higher,
     each hanging under its launch beam; tails aligned */
  var HKR = { Y: [0.70, -0.70, 0.0], Z: [0.27, 0.27, 0.62], TAIL: -1.95 };
  function hawkRound(RB, WB, D, L, x0, y, z) {
    var prof = [[0.0, 0.14], [0.30, 0.185], [L - 1.78, 0.185], [L - 1.48, 0.180], [L - 1.13, 0.160],
                [L - 0.78, 0.125], [L - 0.46, 0.080], [L - 0.20, 0.035], [L - 0.04, 0.008]];
    var seg = 12, i, j, rings = [];
    for (i = 0; i < prof.length; i++) {
      var r = [];
      for (j = 0; j < seg; j++) {
        var a = j / seg * TAU;
        r.push([x0 + prof[i][0], y + Math.cos(a) * prof[i][1], z + Math.sin(a) * prof[i][1]]);
      }
      rings.push(r);
    }
    loft(RB, rings);
    cyl(D, [x0 - 0.03, y, z], [x0 + 0.04, y, z], 0.10, 0.12, 10);
    /* the four long-chord clipped-delta wings in an X, root 0.47-2.92 from the tail, span 1.21 m */
    for (j = 0; j < 4; j++) {
      var a2 = Math.PI / 4 + j * Math.PI / 2, ca = Math.cos(a2), sa = Math.sin(a2), V = [], k;
      var pts = [[0.47, 0.17], [2.92, 0.17], [0.87, 0.605], [0.47, 0.605]];
      for (k = 0; k < 4; k++) V.push([x0 + pts[k][0], y + ca * pts[k][1] - sa * 0.01, z + sa * pts[k][1] + ca * 0.01]);
      for (k = 0; k < 4; k++) V.push([x0 + pts[k][0], y + ca * pts[k][1] + sa * 0.01, z + sa * pts[k][1] - ca * 0.01]);
      hexa(WB, V);
    }
    /* the joint ring behind the radome and the band at the motor's front (dark in [V65]) */
    cyl(D, [x0 + L - 1.80, y, z], [x0 + L - 1.74, y, z], 0.188, 0.188, 12, true, true);
    cyl(D, [x0 + 2.30, y, z], [x0 + 2.34, y, z], 0.188, 0.188, 12, true, true);
  }
  function hawkCarriage(B) {
    var s, k, x;
    /* the box body, its deck, the doors and hasps along the sides [LK][GT][GS] */
    box(B.paint, HK.XB0, HK.XB1, -HK.HWB, HK.HWB, HK.ZB0, HK.ZB1);
    box(B.dark, HK.XB0 + 0.05, HK.XB1 - 0.05, -HK.HWB + 0.04, HK.HWB - 0.04, HK.ZB1, HK.ZB1 + 0.012);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * HK.HWB;
      for (k = 0; k < 3; k++) {
        x = -0.38 + k * 0.56;
        box(B.dark, x - 0.24, x + 0.24, yo - 0.008, yo + 0.008, 0.52, 1.00);
        box(B.paint, x - 0.22, x + 0.22, yo - 0.014, yo + 0.014, 0.54, 0.98);
        box(B.dark, x + 0.12, x + 0.18, yo - 0.03, yo + 0.03, 0.74, 0.80);
      }
      /* the team colour strip along the deck edge */
      box(B.team, -0.70, 0.90, yo - 0.02, yo + 0.02, HK.ZB1 - 0.08, HK.ZB1 - 0.02);
      /* the fender over the wheel [GT][V65] */
      arcPlate(B.paint, HK.XA, HK.RW, HK.RW + 0.08, 0.12, Math.PI - 0.12, s > 0 ? HK.HWB : -HK.YW - 0.18, s > 0 ? HK.YW + 0.18 : -HK.HWB, 0.03, 9);
      /* the rear lamps on the end face [GS][CK] */
      box(B.glass, HK.XB0 - 0.02, HK.XB0, s * 0.58 - 0.05, s * 0.58 + 0.05, 0.86, 0.94);
      box(B.dark, HK.XB0 - 0.015, HK.XB0, s * 0.58 - 0.08, s * 0.58 + 0.08, 0.82, 0.98);
    }
    /* the end face's equipment panel and cable reels [CK] */
    box(B.dark, HK.XB0 - 0.03, HK.XB0, -0.35, 0.35, 0.55, 0.95);
    /* the axle and its springs */
    cylY(B.dark, HK.XA, -HK.YW + 0.10, HK.YW - 0.10, HK.RW, 0.07, 10);
    for (s = -1; s <= 1; s += 2) box(B.dark, HK.XA - 0.45, HK.XA + 0.45, s * 0.66 - 0.05, s * 0.66 + 0.05, HK.RW + 0.02, HK.ZB0);
    /* the A-frame drawbar and the lunette [LK][GT] */
    var L0 = [HK.XB1 + 1.50, 0, 0.66];
    for (s = -1; s <= 1; s += 2) bar(B.paint, [HK.XB1 - 0.05, s * 0.60, 0.62], L0, 0.09);
    bar(B.paint, [HK.XB1 + 0.55, -0.40, 0.64], [HK.XB1 + 0.55, 0.40, 0.64], 0.07);
    bar(B.paint, [HK.XB1 + 0.55, 0.40, 0.64], [HK.XB1 + 1.05, -0.18, 0.65], 0.06);
    cyl(B.dark, [L0[0], 0, L0[2]], [L0[0] + 0.10, 0, L0[2]], 0.06, 0.06, 8);
    cyl(B.dark, [L0[0] + 0.15, 0, L0[2] - 0.035], [L0[0] + 0.15, 0, L0[2] + 0.035], 0.10, 0.10, 14);
  }
  /* an outrigger: two tubes from the body to the pad, rungs between [GT][GS][CK][V65] */
  function outrigger(bin, pad, P0, P1, Q, down) {
    var k, f;
    bar(bin, P0, Q, 0.07);
    bar(bin, P1, Q, 0.07);
    for (k = 1; k < 4; k++) {
      f = k / 4;
      bar(bin, [P0[0] + (Q[0] - P0[0]) * f, P0[1] + (Q[1] - P0[1]) * f, P0[2] + (Q[2] - P0[2]) * f],
               [P1[0] + (Q[0] - P1[0]) * f * 0.92, P1[1] + (Q[1] - P1[1]) * f * 0.92, P1[2] + (Q[2] - P1[2]) * f * 0.92], 0.04);
    }
    if (down) {
      box(pad, Q[0] - 0.22, Q[0] + 0.22, Q[1] - 0.22, Q[1] + 0.22, 0.0, 0.07);
      cylZ(pad, Q[0], Q[1], 0.07, Q[2] + 0.04, 0.06, 8);
    } else box(pad, Q[0] - 0.10, Q[0] + 0.10, Q[1] - 0.10, Q[1] + 0.10, Q[2] - 0.05, Q[2] + 0.05);
  }
  function hawkLegs(B, down) {
    var s, xf = HK.XB1 - 0.10, xr = HK.XB0 + 0.08;
    for (s = -1; s <= 1; s += 2) {
      var yb = s * (HK.HWB + 0.02);
      if (down) {
        /* set up: four legs splayed to pads about 2.1 m out [CK][GS][GT] */
        outrigger(B.paint, B.dark, [xf, yb, 0.95], [xf - 0.35, yb, 0.55], [xf + 0.80, s * 2.10, 0.10], true);
        outrigger(B.paint, B.dark, [xr, yb, 0.95], [xr + 0.35, yb, 0.55], [xr - 0.45, s * 2.10, 0.10], true);
      } else {
        /* on the march: the front pair folded aft along the body sides, the rear pair across the
           end face (NOT CONFIRMED: no reference shows the legs stowed) */
        outrigger(B.paint, B.dark, [xf, yb, 0.95], [xf, yb, 0.55], [xf - 1.30, s * (HK.HWB + 0.08), 0.76], false);
        outrigger(B.paint, B.dark, [xr, yb, s > 0 ? 0.98 : 0.80], [xr, yb, s > 0 ? 0.84 : 0.66],
                  [HK.XB0 - 0.10, s * 0.12, s > 0 ? 0.92 : 0.74], false);
      }
    }
    /* the drawbar jack: wheel up on the march, foot down when set up [LK] */
    var xj = HK.XB1 + 0.95;
    cylZ(B.dark, xj, 0, down ? 0.06 : 0.40, 0.80, 0.045, 8);
    if (down) box(B.dark, xj - 0.14, xj + 0.14, -0.14, 0.14, 0.0, 0.06);
    else cylY(B.dark, xj, -0.04, 0.04, 0.34, 0.09, 12);
  }
  function hawkTurret(TB) {
    var s, k, a;
    cyl(TB.dark, [0, 0, 0], [0, 0, 0.08], 0.60, 0.60, 24);
    cyl(TB.paint, [0, 0, 0.08], [0, 0, 0.30], 0.52, 0.46, 20);
    for (k = 0; k < 12; k++) {
      a = k / 12 * TAU;
      box(TB.dark, 0.50 * Math.cos(a) - 0.03, 0.50 * Math.cos(a) + 0.03, 0.50 * Math.sin(a) - 0.03, 0.50 * Math.sin(a) + 0.03, 0.08, 0.12);
    }
    /* the column and its boxes [GT][GS][CK] */
    box(TB.paint, -0.38, 0.38, -0.28, 0.28, 0.30, HK.TRN - 0.10);
    box(TB.dark, -0.80, -0.38, -0.34, 0.34, 0.30, 0.66);
    box(TB.dark, 0.38, 0.62, -0.22, 0.22, 0.32, 0.52);
    for (s = -1; s <= 1; s += 2) {
      box(TB.paint, -0.16, 0.16, s * 0.28, s * 0.40, HK.TRN - 0.24, HK.TRN + 0.10);
      cylY(TB.dark, 0, s * 0.40, s * 0.46, HK.TRN, 0.11, 12);
      bar(TB.dark, [0.26, s * 0.20, 0.34], [0.40, s * 0.20, HK.TRN - 0.10], 0.08);
    }
  }
  function hawkPod(PB, V) {
    var i, s, cells = [], L = V.hawkL, zb;
    /* the yoke round the trunnion, run forward under the rounds as a spine */
    box(PB.paint, -0.30, 0.30, -0.27, 0.27, -0.12, 0.16);
    box(PB.dark, -0.30, 1.45, -0.16, 0.16, 0.0, 0.16);
    /* the side arms from the spine up to the outer beams, ahead of the wings [GT][CK] */
    for (s = -1; s <= 1; s += 2) {
      zb = HKR.Z[0] + 0.215;
      for (i = 0; i < 2; i++) {
        var xa = i ? 1.05 : -1.80, xb = xa + 0.30;
        if (!i) { box(PB.dark, -1.85, -0.30, s * 0.10, s * 0.20, 0.0, 0.10); }
        hexa(PB.paint, [[xa, s * 0.14, 0.04], [xb, s * 0.14, 0.04], [xb, s * 0.14, 0.18], [xa, s * 0.14, 0.18],
                        [xa, s * 0.60, zb], [xb, s * 0.60, zb], [xb, s * 0.60, zb + 0.13], [xa, s * 0.60, zb + 0.13]]);
      }
    }
    /* the three launch beams over the rounds, the hangers, and the frames that carry the centre
       beam over the outer two [ER][GT][V65] */
    for (i = 0; i < 3; i++) {
      var y = HKR.Y[i];
      zb = HKR.Z[i] + 0.215;
      box(PB.dark, -1.85, 1.55, y - 0.075, y + 0.075, zb, zb + 0.13);
      box(PB.paint, -1.70, 1.40, y - 0.05, y + 0.05, zb + 0.13, zb + 0.16);
      box(PB.dark, -1.20, -1.08, y - 0.045, y + 0.045, zb - 0.035, zb);
      box(PB.dark, 0.95, 1.07, y - 0.045, y + 0.045, zb - 0.035, zb);
      hawkRound(PB.round, PB.wing, PB.dark, L, HKR.TAIL, y, HKR.Z[i]);
      cells.push([HKR.TAIL + L, y, HKR.Z[i], HKR.TAIL]);
    }
    var zo = HKR.Z[0] + 0.345, zc = HKR.Z[2] + 0.215;
    [-1.75, 1.25].forEach(function (x) {
      for (s = -1; s <= 1; s += 2) bar(PB.paint, [x, s * 0.66, zo], [x, s * 0.08, zc + 0.02], 0.07);
    });
    return cells;
  }
  function buildHawk(THREE, C, V) {
    var T = materials(THREE, C, V.paint), g = new THREE.Group(), B = bins(T);
    T.round = std(THREE, V.roundCol, 0.55, 0.08);
    T.wing = V.wingCol === V.roundCol ? T.round : std(THREE, V.wingCol, 0.6, 0.1);
    g.name = "hawk_m192";
    hawkCarriage(B);
    g.add(group(THREE, "hull", B));
    g.add(axleGroup(THREE, T, HK.XA, HK.RW, HK.TW, HK.YW, 0.62));
    var TR = bins(T), DP = bins(T);
    hawkLegs(TR, false); hawkLegs(DP, true);
    g.add(group(THREE, "travelpose", TR));
    var dp = group(THREE, "deploypose", DP); dp.visible = false; g.add(dp);
    var TB = bins(T);
    hawkTurret(TB);
    var tg = group(THREE, "turret", TB, HK.XT, 0, HK.ZB1);
    var PB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), round: new Bin(T.round, false), wing: new Bin(T.wing, false) };
    var cells = hawkPod(PB, V);
    var E = group(THREE, "podelev", PB, 0, 0, HK.TRN);
    E.userData.el = HK.EL;
    E.userData.cells = cells;
    tg.add(E);
    g.add(tg);
    return g;
  }

  /* ============================================================ PATRIOT (DE)
     the M901 launching station on the MAN Kat I A1 8x8.  Stations are metres aft of the bumper
     face (d); model X = PT.X0 - d. */
  var PT = { X0: 4.85, AX: [1.52, 3.47, 6.82, 8.19], RW: 0.62, TW: 0.38, YW: 1.17, CW: 1.25,
             DT: 7.95, ZDK: 1.95, HX: -0.85, HZ: 0.45, SL0: -0.80, SL1: 5.15, SZ0: 0.15, CH: 0.92, CWD: 1.10, EL: 34 * D2R };
  function PX(d) { return PT.X0 - d; }
  function patTruck(B) {
    var s, k, i, x;
    /* the chassis rails and cross members */
    for (s = -1; s <= 1; s += 2) box(B.dark, PX(9.55), PX(0.30), s * 0.42, s * 0.56, 0.92, 1.22);
    for (k = 0; k < 7; k++) { x = PX(1.0 + k * 1.4); box(B.dark, x - 0.05, x + 0.05, -0.56, 0.56, 0.98, 1.16); }
    /* the forward-control cab with its cut-away upper corners [D24][S17][RS] */
    var rings = [], dd = [0.05, 0.14, 1.55], i2;
    for (i2 = 0; i2 < dd.length; i2++) {
      var d = dd[i2], top = i2 === 0 ? 2.72 : 2.88, w = PT.CW, wt = i2 === 0 ? 0.90 : 1.00;
      rings.push([[PX(d), -w, 1.10], [PX(d), w, 1.10], [PX(d), w, 2.42], [PX(d), wt, top], [PX(d), -wt, top], [PX(d), -w, 2.42]]);
    }
    loft(B.paint, rings);
    /* the windscreen: two panes in a frame, the screen covered in [S17][D24] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, PX(0.07), PX(0.03), s * 0.06, s * 1.02, 1.93, 2.52);
      box(B.glass, PX(0.04), PX(0.02), s * 0.10, s * 0.98, 1.97, 2.48);
    }
    /* the grille panel and lamps on the front, the bumper with its towing jaw [D24][S17] */
    box(B.dark, PX(0.06), PX(0.03), -0.80, 0.80, 1.30, 1.80);
    for (k = 0; k < 6; k++) box(B.paint, PX(0.08), PX(0.04), -0.78, 0.78, 1.34 + k * 0.08, 1.37 + k * 0.08);
    box(B.paint, PX(0.10), PX(-0.10), -1.25, 1.25, 0.72, 1.02);
    box(B.dark, PX(-0.10), PX(-0.13), -1.25, 1.25, 0.76, 0.98);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, PX(-0.14), PX(-0.13), s * 0.95 - 0.10, s * 0.95 + 0.10, 0.82, 0.94);
      box(B.dark, PX(-0.14), PX(-0.10), s * 0.25 - 0.07, s * 0.25 + 0.07, 0.62, 0.78);
      /* doors, their windows, steps and mirrors */
      var yo = s * PT.CW;
      box(B.dark, PX(1.40), PX(0.30), yo - 0.01, yo + 0.01, 1.20, 2.38);
      box(B.glass, PX(1.30), PX(0.40), yo - 0.016, yo + 0.016, 1.95, 2.34);
      box(B.dark, PX(1.20), PX(0.50), yo - 0.04, yo + 0.04, 1.62, 1.66);
      box(B.dark, PX(1.20), PX(0.60), s * (PT.CW - 0.18), s * (PT.CW + 0.02), 0.62, 0.68);
      box(B.dark, PX(1.20), PX(0.60), s * (PT.CW - 0.18), s * (PT.CW + 0.02), 0.90, 0.96);
      bar(B.dark, [PX(0.25), yo, 2.30], [PX(-0.05), s * (PT.CW + 0.25), 2.35], 0.035);
      box(B.dark, PX(0.0), PX(-0.06), s * (PT.CW + 0.18), s * (PT.CW + 0.30), 2.05, 2.40);
      /* fenders over the four axles */
      for (i = 0; i < 4; i++) {
        var xa = PX(PT.AX[i]);
        if (i < 2) box(B.paint, xa - 0.72, xa + 0.72, s * (PT.YW - 0.25), s * (PT.YW + 0.24), 1.38, 1.42);
        else box(B.dark, xa - 0.72, xa + 0.72, s * (PT.YW - 0.25), s * (PT.YW + 0.24), 1.38, 1.41);
      }
    }
    /* the cab roof hatch and team panel */
    box(B.team, PX(1.25), PX(0.55), -0.45, 0.45, 2.88, 2.895);
    cylZ(B.dark, PX(0.95), 0.55, 2.88, 2.96, 0.28, 14);
    /* behind the cab: the spare wheel standing on its carrier [S17][PS2] */
    box(B.dark, PX(2.70), PX(1.60), -1.10, 0.40, 1.22, 1.98);
    cyl(B.dark, [PX(2.12), -0.62, 2.64], [PX(2.12), -0.24, 2.64], 0.62, 0.62, 22);
    cyl(B.paint, [PX(2.12), -0.23, 2.64], [PX(2.12), -0.20, 2.64], 0.36, 0.30, 16);
    /* the operator's box with its panel on top, and the railed platform behind it [S17][PS2][D24] */
    box(B.paint, PX(3.55), PX(2.75), -1.25, 1.25, 1.22, 3.00);
    box(B.dark, PX(3.50), PX(2.85), -0.75, 0.25, 3.00, 3.48);
    box(B.glass, PX(2.86), PX(2.84), -0.65, 0.15, 3.05, 3.40);
    for (k = 0; k < 3; k++) box(B.dark, PX(3.45), PX(2.85), 1.252, 1.262, 1.60 + k * 0.40, 1.62 + k * 0.40);
    box(B.paint, PX(4.55), PX(3.55), -1.25, 1.25, 1.22, 2.20);
    box(B.dark, PX(4.55), PX(3.55), -1.25, 1.25, 2.20, 2.24);
    /* the launcher electronics module and the box slung under it [S17][RS] */
    box(B.paint, PX(6.50), PX(4.60), -1.25, 1.10, 1.22, 2.20);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) {
      x = PX(4.75 + k * 0.62);
      box(B.dark, x - 0.27, x + 0.27, s * 1.25 - 0.008, s * 1.25 + 0.008, 1.32, 2.10);
    }
    box(B.paint, PX(6.40), PX(4.70), -1.25, -0.60, 0.68, 1.22);
    /* the rear body under the launcher: the deck, the lamp bar and its hazard boards [RS][S17] */
    box(B.paint, PX(9.62), PX(6.50), -1.25, 1.25, 1.22, PT.ZDK);
    box(B.dark, PX(9.66), PX(9.60), -1.25, 1.25, 0.95, 1.30);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, PX(9.67), PX(9.65), s * 1.00 - 0.12, s * 1.00 + 0.12, 1.02, 1.12);
      box(B.team, PX(9.68), PX(9.66), s * 0.55 - 0.18, s * 0.55 + 0.18, 1.14, 1.26);
      for (k = 0; k < 3; k++) box(B.dark, PX(8.80 - k * 0.75) - 0.30, PX(8.80 - k * 0.75) + 0.30, s * 1.25 - 0.008, s * 1.25 + 0.008, 1.32, 1.85);
      /* the jacks' housings on the chassis sides [S17][PS2] */
      box(B.dark, PX(3.95), PX(3.75), s * 1.27, s * 1.40, 1.05, 1.80);
      box(B.dark, PX(9.80), PX(9.60), s * 1.27, s * 1.40, 1.05, 1.80);
    }
  }
  /* four screw jacks hanging off the chassis sides: down on their feet when set up [S17][PS2] */
  function patJacks(B, down) {
    var s;
    /* the platform's railing: up when set up [S17][PS2]; folded flat under the stack on the march
       (NOT CONFIRMED: the stack lies over the platform, so it cannot stand) */
    for (s = -1; s <= 1; s += 2) {
      if (down) {
        [3.60, 4.05, 4.50].forEach(function (d) { cylZ(B.dark, PX(d), s * 1.20, 2.24, 3.08, 0.025, 6); });
        bar(B.dark, [PX(3.60), s * 1.20, 3.08], [PX(4.50), s * 1.20, 3.08], 0.04);
        bar(B.dark, [PX(3.60), s * 1.20, 2.66], [PX(4.50), s * 1.20, 2.66], 0.03);
      } else bar(B.dark, [PX(3.60), s * 1.20, 2.27], [PX(4.50), s * 1.20, 2.27], 0.04);
    }
    if (down) bar(B.dark, [PX(4.50), -1.20, 3.08], [PX(4.50), 1.20, 3.08], 0.04);
    [3.85, 9.70].forEach(function (d) {
      for (s = -1; s <= 1; s += 2) {
        var x = PX(d), y = s * 1.335;
        cylZ(B.paint, x, y, down ? 0.35 : 0.95, 1.75, 0.09, 10);
        cylZ(B.dark, x, y, down ? 0.07 : 0.67, down ? 0.40 : 1.00, 0.05, 8);
        if (down) box(B.dark, x - 0.25, x + 0.25, y - 0.25, y + 0.25, 0.0, 0.07);
        else box(B.dark, x - 0.16, x + 0.16, y - 0.16, y + 0.16, 0.62, 0.68);
      }
    });
  }
  /* the launcher mechanics assembly on its turntable (the turret; origin on the deck) */
  function patTurret(TB) {
    var s;
    cyl(TB.dark, [0, 0, 0], [0, 0, 0.10], 0.80, 0.80, 24);
    box(TB.paint, -1.55, 1.45, -1.12, 1.12, 0.10, 0.34);
    box(TB.dark, -1.56, 1.46, -1.13, 1.13, 0.20, 0.22);
    for (s = -1; s <= 1; s += 2) {
      /* the hinge brackets at the rear, the ram's foot ahead */
      box(TB.paint, PT.HX - 0.25, PT.HX + 0.25, s * 0.80, s * 1.00, 0.34, PT.HZ + 0.12);
      cylY(TB.dark, PT.HX, s * 0.78, s * 1.04, PT.HZ, 0.12, 12);
      box(TB.dark, 0.70, 1.00, s * 0.30, s * 0.50, 0.34, 0.50);
    }
    /* the ram, true when the stack is raised [S17] */
    var c = Math.cos(PT.EL), sn = Math.sin(PT.EL), ax = 2.45, az = PT.SZ0 - 0.06;
    var top = [PT.HX + ax * c - az * sn, 0, PT.HZ + ax * sn + az * c];
    for (s = -1; s <= 1; s += 2) {
      cyl(TB.dark, [0.85, s * 0.40, 0.44], [0.85 + (top[0] - 0.85) * 0.55, s * 0.40, 0.44 + (top[2] - 0.44) * 0.55], 0.10, 0.10, 10);
      cyl(TB.paint, [0.85 + (top[0] - 0.85) * 0.5, s * 0.40, 0.44 + (top[2] - 0.44) * 0.5], [top[0], s * 0.40, top[2]], 0.06, 0.06, 8);
    }
  }
  /* the stack of four PAC-2 canisters, 2 x 2, ribbed, with X-braced end frames (podelev; origin
     the hinge) [RS][PS2][S17] */
  function patPod(PB) {
    var cells = [], i, j, k, y, z, s;
    box(PB.dark, PT.SL0 + 0.10, PT.SL1 - 0.20, -1.05, 1.05, 0.0, PT.SZ0);
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      y = (i ? 1 : -1) * PT.CWD / 2; z = PT.SZ0 + PT.CH * (j + 0.5);
      box(PB.can, PT.SL0 + 0.15, PT.SL1 - 0.15, y - PT.CWD / 2 + 0.02, y + PT.CWD / 2 - 0.02, z - PT.CH / 2 + 0.02, z + PT.CH / 2 - 0.02);
      for (k = 0; k < 10; k++) {
        var x = PT.SL0 + 0.45 + k * 0.62;
        box(PB.can, x - 0.03, x + 0.03, y - PT.CWD / 2, y + PT.CWD / 2, z - PT.CH / 2, z + PT.CH / 2);
      }
      cells.push([PT.SL1, y, z, PT.SL0]);
    }
    /* the end frames, both ends: a frame round the stack and the diagonal braces on the sides */
    [PT.SL0, PT.SL1 - 0.25].forEach(function (x0) {
      box(PB.dark, x0, x0 + 0.25, -1.14, -1.06, 0.0, PT.SZ0 + 2 * PT.CH + 0.06);
      box(PB.dark, x0, x0 + 0.25, 1.06, 1.14, 0.0, PT.SZ0 + 2 * PT.CH + 0.06);
      box(PB.dark, x0, x0 + 0.25, -1.14, 1.14, PT.SZ0 + 2 * PT.CH, PT.SZ0 + 2 * PT.CH + 0.06);
      box(PB.dark, x0, x0 + 0.25, -1.14, 1.14, PT.SZ0 + PT.CH - 0.03, PT.SZ0 + PT.CH + 0.03);
      for (s = -1; s <= 1; s += 2) {
        bar(PB.dark, [x0 + 0.12, s * 1.15, PT.SZ0 + 0.05], [x0 + 0.12 + (x0 < 0 ? 0.70 : -0.70), s * 1.15, PT.SZ0 + PT.CH - 0.05], 0.05);
        bar(PB.dark, [x0 + 0.12, s * 1.15, PT.SZ0 + PT.CH + 0.05], [x0 + 0.12 + (x0 < 0 ? 0.70 : -0.70), s * 1.15, PT.SZ0 + 2 * PT.CH - 0.05], 0.05);
      }
    });
    /* the hinge lugs under the stack's rear */
    for (s = -1; s <= 1; s += 2) box(PB.dark, -0.20, 0.20, s * 0.70, s * 0.78, -0.12, 0.05);
    cylY(PB.dark, 0, -0.78, 0.78, 0, 0.08, 10);
    return cells;
  }
  function buildPatriot(THREE, C, V) {
    var T = materials(THREE, C, V.paint), g = new THREE.Group(), B = bins(T), i;
    g.name = "deu_patriot_man";
    patTruck(B);
    g.add(group(THREE, "hull", B));
    for (i = 0; i < PT.AX.length; i++) g.add(axleGroup(THREE, T, PX(PT.AX[i]), PT.RW, PT.TW, PT.YW, 0.58));
    var TR = bins(T), DP = bins(T);
    patJacks(TR, false); patJacks(DP, true);
    g.add(group(THREE, "travelpose", TR));
    var dp = group(THREE, "deploypose", DP); dp.visible = false; g.add(dp);
    var TB = bins(T);
    patTurret(TB);
    var tg = group(THREE, "turret", TB, PX(PT.DT), 0, PT.ZDK);
    var PB = { can: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    var cells = patPod(PB);
    var E = group(THREE, "podelev", PB, PT.HX, 0, PT.HZ);
    E.userData.el = PT.EL;
    E.userData.cells = cells;
    tg.add(E);
    g.add(tg);
    return g;
  }

  /* ================================================================ LANCE
     the M752 self-propelled launcher on the M667 carrier (inches from the bow, D2; model
     X = LN.XN - in * 0.0254) */
  var LN = { XN: 3.277, XT: -3.277, XW: [], RW: 0.29, ZW: 0.35, TYC: 1.105, THW: 0.19, HW: 1.295, HB: 0.86,
             ZS: 1.93, ZF: 0.86, ZC: 2.72, ML: 6.40, MR: 0.28, PX: -2.95, PZ: 1.50, REST: 5 * D2R, EL: 55 * D2R };
  (function () { for (var k = 0; k < 5; k++) LN.XW.push(LN.XN - (50.5 + k * 27.75) * 0.0254); })();
  LN.SPR = { x: LN.XN - 23.6 * 0.0254, z: 0.56, r: 0.23 };
  LN.IDL = { x: LN.XN - 191 * 0.0254, z: 0.50, r: 0.25 };
  function lnIn(i) { return LN.XN - i * 0.0254; }
  /* the track loop round sprocket, wheels and idler (js/hero/us_m548_family.js) */
  function trackPath() {
    var C = [], k, p = [], i, A, B, d, L, rp, ph, n, a0, a1, da, s, m;
    for (k = LN.XW.length - 1; k >= 0; k--) C.push({ x: LN.XW[k], z: LN.ZW, r: LN.RW });
    C.push({ x: LN.SPR.x, z: LN.SPR.z, r: LN.SPR.r + 0.02 });
    for (k = 0; k < LN.XW.length; k++) C.push({ x: LN.XW[k], z: LN.ZW, r: LN.RW });
    C.push({ x: LN.IDL.x, z: LN.IDL.z, r: LN.IDL.r });
    var T = [];
    for (i = 0; i < C.length; i++) {
      A = C[i]; B = C[(i + 1) % C.length];
      d = [B.x - A.x, B.z - A.z]; L = Math.sqrt(d[0] * d[0] + d[1] * d[1]); d = [d[0] / L, d[1] / L];
      rp = [d[1], -d[0]];
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
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.035, A, B;
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
      for (k = 0; k < 4; k++) F.push([A + k, B + k, A + (k + 1) % 4], [A + (k + 1) % 4, B + k, B + (k + 1) % 4]);
    }
    solid(bin, V, F);
  }
  function lnRunning(B) {
    var s, k, path = trackPath();
    belt(B.dark, path, LN.TYC - LN.THW, LN.TYC + LN.THW);
    belt(B.dark, path, -LN.TYC - LN.THW, -LN.TYC + LN.THW);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < LN.XW.length; k++) {
        cylY(B.dark, LN.XW[k], s * (LN.TYC - 0.17), s * (LN.TYC - 0.03), LN.ZW, LN.RW, 18);
        cylY(B.dark, LN.XW[k], s * (LN.TYC + 0.03), s * (LN.TYC + 0.17), LN.ZW, LN.RW, 18);
        cylY(B.dark, LN.XW[k], s * LN.HB, s * (LN.TYC - 0.17), LN.ZW, 0.06, 8);
      }
      cylY(B.dark, LN.SPR.x, s * (LN.HB - 0.02), s * (LN.TYC - 0.12), LN.SPR.z, 0.13, 12);
    }
  }
  function gearDisc(bin, y0, y1, rr, rt, nt) {
    var n = nt * 4, V = [], F = [], i, t, kk, a, r, ph = [0.05, 0.30, 0.55, 0.80], rd = [rr, rt, rt, rr], step = TAU / nt;
    for (i = 0; i < n; i++) { t = (i / 4) | 0; kk = i % 4; a = (t + ph[kk]) * step; r = rd[kk]; V.push([r * Math.cos(a), y0, r * Math.sin(a)]); }
    for (i = 0; i < n; i++) V.push([V[i][0], y1, V[i][2]]);
    V.push([0, y0, 0], [0, y1, 0]);
    for (i = 0; i < n; i++) { t = (i + 1) % n; F.push([i, n + i, t], [t, n + i, n + t], [2 * n, i, t], [2 * n + 1, n + t, n + i]); }
    solid(bin, V, F);
  }
  function lnWheelDiscs(bin, kind) {
    var s, side, o, k, a, r = kind === 2 ? LN.IDL.r : LN.RW;
    for (s = -1; s <= 1; s += 2) {
      if (kind === 1) {
        gearDisc(bin, s * LN.TYC - 0.15, s * LN.TYC - 0.07, LN.SPR.r - 0.03, LN.SPR.r + 0.035, 10);
        gearDisc(bin, s * LN.TYC + 0.07, s * LN.TYC + 0.15, LN.SPR.r - 0.03, LN.SPR.r + 0.035, 10);
        cyl(bin, [0, s * (LN.TYC - 0.07), 0], [0, s * (LN.TYC + 0.07), 0], 0.15, 0.15, 14);
        continue;
      }
      for (side = -1; side <= 1; side += 2) {
        o = s * LN.TYC + side * 0.17;
        cyl(bin, [0, o, 0], [0, o + side * 0.02, 0], r - 0.035, r - 0.06, 18);
        cyl(bin, [0, o + side * 0.02, 0], [0, o + side * 0.05, 0], 0.13, 0.11, 12, true, false);
      }
      o = s * (LN.TYC + 0.17);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        box(bin, 0.18 * Math.cos(a) - 0.016, 0.18 * Math.cos(a) + 0.016, Math.min(o, o + s * 0.035), Math.max(o, o + s * 0.035),
            0.18 * Math.sin(a) - 0.016, 0.18 * Math.sin(a) + 0.016);
      }
    }
  }
  /* the M667 hull: the full-width box over the tracks, the raked tail, the bow's lower plates,
     the rubber skirt over the wheels, the ribbed sides [D2][HT][NL] */
  function lnHull(B) {
    var s, k, x, xr = lnIn(218), zr = 0.45;
    /* the hull box in side profile: bow upright to 1.12 m, the nose bevel, the 22.5 deg lower
       glacis toward the sprocket, the belly, the raked tail plate up to the rear top corner */
    profY(B.paint, [[LN.XN, LN.ZS], [LN.XN, 1.12], [LN.XN - 0.20, 0.80], [LN.SPR.x - 0.10, LN.ZF], [LN.IDL.x, LN.ZF],
                    [xr + 0.20, LN.ZF], [LN.XT, LN.ZS]], -LN.HW, LN.HW);
    /* the lower hull between the tracks, down to the belly at 16 in */
    profY(B.paint, [[LN.XN - 0.20, 0.82], [LN.SPR.x - 0.25, 0.42], [xr + 0.15, 0.42], [xr, zr + 0.10], [xr + 0.25, LN.ZF]], -LN.HB, LN.HB);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * LN.HW;
      /* the black rubber skirt over the upper run, sprocket to idler [HT] */
      box(B.dark, LN.IDL.x - 0.15, LN.SPR.x + 0.10, s > 0 ? LN.HW - 0.02 : -LN.HW - 0.03, s > 0 ? LN.HW + 0.03 : -LN.HW + 0.02, 0.44, LN.ZF);
      /* the vertical ribs and the six panels along the upper side [D2][HT][NL] */
      for (k = 0; k < 8; k++) {
        x = lnIn(100 + k * 20);
        box(B.paint, x - 0.025, x + 0.025, yo - 0.025, yo + 0.025, LN.ZF + 0.12, LN.ZS - 0.02);
      }
      box(B.paint, LN.IDL.x - 0.2, LN.SPR.x, yo - 0.03, yo + 0.03, LN.ZF + 0.10, LN.ZF + 0.16);
      box(B.dark, LN.XT + 0.40, LN.XN - 0.10, yo - 0.012, yo + 0.012, LN.ZS - 0.06, LN.ZS - 0.02);
      /* lifting eyes and tie-down rings along the rim [HT] */
      [2.6, 0.2, -2.4].forEach(function (xe) { box(B.dark, xe - 0.05, xe + 0.05, yo - 0.03, yo + 0.03, LN.ZS - 0.20, LN.ZS - 0.10); });
      /* the bow lamps and the tow eyes */
      box(B.dark, LN.XN, LN.XN + 0.05, s * 0.95 - 0.12, s * 0.95 + 0.12, 1.42, 1.62);
      box(B.glass, LN.XN + 0.05, LN.XN + 0.06, s * 0.95 - 0.05, s * 0.95 + 0.05, 1.48, 1.56);
      box(B.dark, LN.XN - 0.12, LN.XN + 0.04, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.92, 1.04);
      /* the tail lamps at the rear corners [NL] */
      box(B.glass, LN.XT + 0.04, LN.XT + 0.10, s * 1.20 - 0.05, s * 1.20 + 0.05, 1.80, 1.90);
    }
    /* the open top: a dark well inside the rim, and the deck down in it */
    box(B.dark, LN.XT + 0.35, LN.XN - 0.08, -LN.HW + 0.06, LN.HW - 0.06, LN.ZS - 0.01, LN.ZS + 0.002);
    /* the driver's cab at the front left [D2][LS][HT], its windows above the rim */
    var cx0 = LN.XN - 1.95, cx1 = LN.XN - 0.05, cy0 = 0.52, cy1 = LN.HW - 0.02;
    box(B.paint, cx0, cx1, cy0, cy1, LN.ZS, LN.ZC);
    box(B.dark, cx0 - 0.02, cx1 + 0.02, cy0 - 0.02, cy1 + 0.02, LN.ZC - 0.03, LN.ZC);
    box(B.glass, cx1, cx1 + 0.015, cy0 + 0.08, cy1 - 0.10, 2.10, 2.55);
    box(B.dark, cx1 + 0.005, cx1 + 0.02, (cy0 + cy1) / 2 - 0.02, (cy0 + cy1) / 2 + 0.02, 2.08, 2.57);
    for (k = 0; k < 2; k++) {
      box(B.glass, cx1 - 0.10 - (k + 1) * 0.85 + 0.05, cx1 - 0.10 - k * 0.85, cy1, cy1 + 0.015, 2.10, 2.55);
      box(B.glass, cx1 - 0.10 - (k + 1) * 0.85 + 0.05, cx1 - 0.10 - k * 0.85, cy0 - 0.015, cy0, 2.10, 2.55);
    }
    box(B.team, cx0 + 0.55, cx1 - 0.55, cy0 + 0.20, cy1 - 0.20, LN.ZC, LN.ZC + 0.012);
  }
  /* the stabiliser plate at the tail: folded up the raked tail plate on the march, down on the
     ground behind the hull when set up [NL][HT] */
  function lnPlate(B, down) {
    var xr = lnIn(218), A = [xr + 0.05, 0, 0.47], Q;
    if (down) Q = [LN.XT + 0.02, 0, 0.03];
    else Q = [LN.XT + 0.30, 0, LN.ZS - 0.25];
    var U = unit(sub(Q, A)), W = [0, 1, 0], N = cross(U, W), L = Math.sqrt(dot(sub(Q, A), sub(Q, A)));
    planeBox(B.paint, A, U, W, N, 0, L, -1.15, 1.15, down ? 0 : 0.04, down ? 0.06 : 0.10);
    for (var s = -1; s <= 1; s += 2) planeBox(B.dark, A, U, W, N, 0.05, L - 0.05, s * 0.95 - 0.04, s * 0.95 + 0.04, down ? 0.06 : 0.10, down ? 0.10 : 0.14);
    cylY(B.dark, A[0], -1.10, 1.10, A[2], 0.05, 8);
  }
  /* the launch fixture at the tail (fixed): pivot brackets, the support posts [NL][LS][MC] */
  function lnFixture(B) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, LN.PX - 0.22, LN.PX + 0.22, s * 0.45, s * 0.60, LN.ZS - 0.40, LN.PZ + 0.10);
      cylY(B.dark, LN.PX, s * 0.42, s * 0.64, LN.PZ, 0.09, 12);
      /* the rest the beam lies on at the front, beside the cab [HT] */
      box(B.dark, 0.95, 1.10, s * 0.40, s * 0.48, LN.ZS - 0.30, 1.86);
    }
    box(B.dark, 0.95, 1.10, -0.48, 0.48, 1.80, 1.86);
  }
  /* MGM-52 Lance on the launch beam (podelev, origin the pivot): 6.40 m, 0.56 m, the long
     ogive, four clipped-delta fins at the tail [NL][HT] */
  function lanceRound(RB, D, x0, z) {
    var L = LN.ML, R = LN.MR, seg = 16, i, j, rings = [];
    var prof = [[0.0, R * 0.80], [0.10, R], [L - 1.95, R], [L - 1.55, R * 0.94], [L - 1.10, R * 0.80],
                [L - 0.70, R * 0.60], [L - 0.35, R * 0.36], [L - 0.10, R * 0.12], [L - 0.01, 0.01]];
    for (i = 0; i < prof.length; i++) {
      var r = [];
      for (j = 0; j < seg; j++) { var a = j / seg * TAU; r.push([x0 + prof[i][0], Math.cos(a) * prof[i][1], z + Math.sin(a) * prof[i][1]]); }
      rings.push(r);
    }
    loft(RB, rings);
    cyl(D, [x0 - 0.04, 0, z], [x0 + 0.02, 0, z], 0.16, 0.20, 12);
    cyl(D, [x0 + L - 1.98, 0, z], [x0 + L - 1.92, 0, z], R + 0.004, R + 0.004, 16, true, true);
    for (j = 0; j < 4; j++) {
      var a2 = Math.PI / 4 + j * Math.PI / 2, ca = Math.cos(a2), sa = Math.sin(a2), V = [], k;
      var pts = [[0.05, R - 0.02], [1.05, R - 0.02], [0.40, 0.71], [0.08, 0.71]];
      for (k = 0; k < 4; k++) V.push([x0 + pts[k][0], ca * pts[k][1] - sa * 0.012, z + sa * pts[k][1] + ca * 0.012]);
      for (k = 0; k < 4; k++) V.push([x0 + pts[k][0], ca * pts[k][1] + sa * 0.012, z + sa * pts[k][1] - ca * 0.012]);
      hexa(RB, V);
    }
  }
  function lnPod(PB) {
    var s, k, x, zt = 0.42;
    /* the launch beam: two rails with cross members, a saddle under the round [NL] */
    for (s = -1; s <= 1; s += 2) box(PB.dark, -0.10, 4.20, s * 0.20, s * 0.30, 0.0, 0.14);
    for (k = 0; k < 6; k++) { x = 0.10 + k * 0.80; box(PB.dark, x - 0.04, x + 0.04, -0.30, 0.30, 0.02, 0.12); }
    for (k = 0; k < 3; k++) {
      x = 0.40 + k * 1.6;
      box(PB.paint, x - 0.10, x + 0.10, -0.26, 0.26, 0.12, zt - LN.MR + 0.06);
    }
    lanceRound(PB.round, PB.dark, -0.15, zt);
    return [[-0.15 + LN.ML, 0, zt, -0.15]];
  }
  function buildLance(THREE, C, V) {
    var T = materials(THREE, C, V.paint), g = new THREE.Group(), B = bins(T), i;
    T.round = std(THREE, V.roundCol, 0.6, 0.1);
    g.name = "m752_lance";
    lnHull(B); lnRunning(B); lnFixture(B);
    g.add(group(THREE, "hull", B));
    var pos = LN.XW.map(function (x) { return [x, LN.ZW, 0]; }).concat([[LN.SPR.x, LN.SPR.z, 1], [LN.IDL.x, LN.IDL.z, 2]]);
    for (i = 0; i < pos.length; i++) {
      var WB = { w: new Bin(pos[i][2] === 1 ? T.dark : T.paint, pos[i][2] !== 1) };
      lnWheelDiscs(WB.w, pos[i][2]);
      g.add(group(THREE, "roadwheel", WB, pos[i][0], 0, pos[i][1]));
    }
    var TR = bins(T), DP = bins(T);
    lnPlate(TR, false); lnPlate(DP, true);
    g.add(group(THREE, "travelpose", TR));
    var dp = group(THREE, "deploypose", DP); dp.visible = false; g.add(dp);
    var base = group(THREE, "beambase", null, LN.PX, 0, LN.PZ);
    base.rotation.y = -LN.REST;
    var PB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), round: new Bin(T.round, false) };
    var cells = lnPod(PB);
    var E = group(THREE, "podelev", PB);
    E.userData.el = LN.EL;
    E.userData.cells = cells;
    base.add(E);
    g.add(base);
    return g;
  }

  /* ============================================================== SERGEANT
     the erector-launcher semitrailer behind a 5-ton 6x6 tractor.  Stations d are metres aft of the
     tractor's bumper; model X = SG.X0 - d. */
  var SG = { X0: 8.55, TF: 1.10, TA: [4.70, 5.98], RT: 0.56, TWT: 0.30, YT: 0.92, KP: 5.34,
             TRA: [11.65, 12.95], TRR: 13.55, PIV: 6.90, PZ: 1.78, ML: 10.52, MR: 0.395, EL: 63 * D2R, REST: 2 * D2R };
  function SX(d) { return SG.X0 - d; }
  function sgTractor(B) {
    var s, k;
    /* the frame */
    for (s = -1; s <= 1; s += 2) box(B.dark, SX(6.85), SX(0.20), s * 0.38, s * 0.50, 0.78, 1.02);
    /* the bumper, the grille and the long bonnet [XM] */
    box(B.paint, SX(0.10), SX(-0.05), -1.20, 1.20, 0.62, 0.90);
    box(B.dark, SX(0.40), SX(0.30), -0.55, 0.55, 0.95, 1.62);
    for (k = 0; k < 7; k++) box(B.paint, SX(0.32), SX(0.29), -0.50 + k * 0.165 - 0.02, -0.50 + k * 0.165 + 0.02, 1.00, 1.58);
    box(B.paint, SX(1.90), SX(0.40), -0.58, 0.58, 0.95, 1.70);
    for (s = -1; s <= 1; s += 2) {
      /* the flat front fenders, the lamps in them, the step [XM] */
      box(B.paint, SX(1.75), SX(0.25), s * 0.58, s * 1.22, 1.18, 1.24);
      box(B.paint, SX(0.45), SX(0.25), s * 0.58, s * 1.22, 0.95, 1.18);
      cylX(B.dark, SX(0.30), SX(0.22), s * 0.85, 1.32, 0.10, 12);
      cylX(B.glass, SX(0.22), SX(0.20), s * 0.85, 1.32, 0.08, 12);
      box(B.dark, SX(2.30), SX(1.90), s * 1.00, s * 1.20, 0.70, 0.76);
    }
    /* the cab: the scuttle, the split windscreen, the hard top, the door windows [XM] */
    box(B.paint, SX(2.95), SX(1.90), -1.05, 1.05, 0.95, 1.85);
    box(B.paint, SX(2.95), SX(2.08), -1.05, 1.05, 1.85, 2.55);
    box(B.paint, SX(3.00), SX(1.98), -1.10, 1.10, 2.55, 2.62);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, SX(2.09), SX(2.07), s * 0.06, s * 0.95, 1.92, 2.45);
      box(B.glass, SX(2.75), SX(2.20), s * 1.05 - 0.01, s * 1.05 + 0.01, 1.95, 2.40);
      box(B.dark, SX(2.90), SX(2.12), s * 1.05 - 0.008, s * 1.05 + 0.008, 1.00, 2.48);
    }
    box(B.team, SX(2.85), SX(2.15), -0.50, 0.50, 2.62, 2.635);
    /* the fuel tanks, the battery box, the fifth wheel over the tandem [XM] */
    for (s = -1; s <= 1; s += 2) cylX(B.paint, SX(4.20), SX(3.15), s * 0.80, 0.72, 0.26, 14);
    box(B.dark, SX(5.70), SX(4.95), -0.70, 0.70, 1.02, 1.30);
    box(B.paint, SX(6.60), SX(4.30), -1.20, 1.20, 1.14, 1.18);
    box(B.dark, SX(6.70), SX(6.62), -1.10, 1.10, 0.70, 1.10);
  }
  function sgTrailer(B) {
    var s, k, x;
    /* the gooseneck over the tractor and the long frame dropping behind it [XM] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, SX(6.40), SX(4.10), s * 0.40, s * 0.60, 1.32, 1.68);
      bar(B.paint, [SX(6.30), s * 0.50, 1.50], [SX(7.20), s * 0.50, 1.15], 0.30);
      box(B.paint, SX(SG.TRR), SX(7.10), s * 0.42, s * 0.62, 0.95, 1.30);
    }
    box(B.paint, SX(4.30), SX(4.10), -1.20, 1.20, 1.30, 1.70);
    for (k = 0; k < 6; k++) { x = SX(7.4 + k * 1.15); box(B.dark, x - 0.05, x + 0.05, -1.15, 1.15, 1.00, 1.24); }
    /* the deck outriggers and the equipment boxes along the sides, the A-frame foot [XM][S04] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, SX(10.30), SX(7.40), s * 0.62, s * 1.20, 0.90, 1.30);
      for (k = 0; k < 3; k++) box(B.dark, SX(7.55 + k * 0.92) - 0.40, SX(7.55 + k * 0.92) + 0.40, s * 1.20 - 0.008, s * 1.20 + 0.008, 0.96, 1.24);
      box(B.team, SX(10.2), SX(7.5), s * 1.20 - 0.012, s * 1.20 + 0.012, 1.26, 1.30);
      /* the fenders over the two trailer axles */
      for (k = 0; k < 2; k++) arcPlate(B.paint, SX(SG.TRA[k]), SG.RT, SG.RT + 0.10, 0.25, Math.PI - 0.25, s > 0 ? SG.YT - 0.20 : -SG.YT - 0.20, s > 0 ? SG.YT + 0.20 : -SG.YT + 0.20, 0.03, 7);
      /* the springs */
      box(B.dark, SX(SG.TRA[1] + 0.5), SX(SG.TRA[0] - 0.5), s * 0.50, s * 0.60, SG.RT, 0.96);
      /* the pivot brackets [S04] */
      box(B.paint, SX(SG.PIV + 0.30), SX(SG.PIV - 0.30), s * 0.55, s * 0.72, 1.20, SG.PZ + 0.12);
      cylY(B.dark, SX(SG.PIV), s * 0.52, s * 0.76, SG.PZ, 0.10, 12);
    }
    box(B.dark, SX(SG.TRR + 0.05), SX(SG.TRR), -1.10, 1.10, 0.80, 1.20);
    for (s = -1; s <= 1; s += 2) box(B.glass, SX(SG.TRR + 0.06), SX(SG.TRR + 0.04), s * 0.95 - 0.06, s * 0.95 + 0.06, 0.95, 1.05);
    /* the boom's rest at the trailer's tail [XM] */
    for (s = -1; s <= 1; s += 2) box(B.dark, SX(12.95), SX(12.80), s * 0.40, s * 0.50, 1.30, 1.70);
    box(B.dark, SX(12.95), SX(12.80), -0.50, 0.50, 1.62, 1.70);
  }
  function sgJacks(B, down) {
    var s;
    [7.30, 13.10].forEach(function (d) {
      for (s = -1; s <= 1; s += 2) {
        var x = SX(d), y = s * 1.15;
        cylZ(B.paint, x, y, down ? 0.30 : 0.70, 1.20, 0.07, 8);
        cylZ(B.dark, x, y, down ? 0.06 : 0.50, down ? 0.34 : 0.74, 0.045, 8);
        if (down) box(B.dark, x - 0.20, x + 0.20, y - 0.20, y + 0.20, 0.0, 0.06);
      }
    });
  }
  /* MGM-29 Sergeant on the boom: 10.52 m, 0.79 m, the long ogive, four fins of 1.80 m span at the
     tail [S04][S05] */
  function sergeantRound(RB, D, x0, z) {
    var L = SG.ML, R = SG.MR, seg = 18, i, j, rings = [];
    var prof = [[0.0, R * 0.85], [0.12, R], [L - 3.10, R], [L - 2.50, R * 0.93], [L - 1.90, R * 0.80], [L - 1.30, R * 0.62],
                [L - 0.75, R * 0.40], [L - 0.30, R * 0.17], [L - 0.02, 0.012]];
    for (i = 0; i < prof.length; i++) {
      var r = [];
      for (j = 0; j < seg; j++) { var a = j / seg * TAU; r.push([x0 + prof[i][0], Math.cos(a) * prof[i][1], z + Math.sin(a) * prof[i][1]]); }
      rings.push(r);
    }
    loft(RB, rings);
    cyl(D, [x0 - 0.05, 0, z], [x0 + 0.02, 0, z], 0.24, 0.30, 14);
    cyl(D, [x0 + L - 3.12, 0, z], [x0 + L - 3.06, 0, z], R + 0.004, R + 0.004, 18, true, true);
    cyl(D, [x0 + 3.0, 0, z], [x0 + 3.05, 0, z], R + 0.004, R + 0.004, 18, true, true);
    for (j = 0; j < 4; j++) {
      var a2 = Math.PI / 4 + j * Math.PI / 2, ca = Math.cos(a2), sa = Math.sin(a2), V = [], k;
      var pts = [[0.05, R - 0.02], [1.50, R - 0.02], [0.75, 0.90], [0.10, 0.90]];
      for (k = 0; k < 4; k++) V.push([x0 + pts[k][0], ca * pts[k][1] - sa * 0.015, z + sa * pts[k][1] + ca * 0.015]);
      for (k = 0; k < 4; k++) V.push([x0 + pts[k][0], ca * pts[k][1] + sa * 0.015, z + sa * pts[k][1] - ca * 0.015]);
      hexa(RB, V);
    }
  }
  /* the erector boom (podelev, origin the pivot, +X toward the trailer's tail) with the round on
     its upper face and the clamp collars [S04][XM] */
  function sgPod(PB) {
    var s, k, x, zm = 0.70;
    box(PB.dark, 0.0, 6.30, -0.22, 0.22, -0.12, 0.18);
    for (s = -1; s <= 1; s += 2) box(PB.paint, 0.20, 6.10, s * 0.22, s * 0.30, -0.10, 0.16);
    for (k = 0; k < 3; k++) {
      x = 0.60 + k * 2.6;
      box(PB.paint, x - 0.12, x + 0.12, -0.40, 0.40, 0.18, zm - 0.20);
      for (s = -1; s <= 1; s += 2) bar(PB.dark, [x, s * 0.40, zm - 0.20], [x, s * 0.36, zm + 0.20], 0.09);
    }
    sergeantRound(PB.round, PB.dark, -0.20, zm);
    return [[-0.20 + SG.ML, 0, zm, -0.20]];
  }
  function buildSergeant(THREE, C, V) {
    var T = materials(THREE, C, V.paint), g = new THREE.Group(), B = bins(T);
    T.round = std(THREE, V.roundCol, 0.6, 0.1);
    g.name = "sergeant_launcher";
    sgTractor(B); sgTrailer(B);
    g.add(group(THREE, "hull", B));
    g.add(axleGroup(THREE, T, SX(SG.TF), SG.RT, SG.TWT, SG.YT, 0.6));
    SG.TA.forEach(function (d) { g.add(axleGroup(THREE, T, SX(d), SG.RT, SG.TWT, SG.YT, 0.6)); });
    SG.TRA.forEach(function (d) { g.add(axleGroup(THREE, T, SX(d), SG.RT, SG.TWT, SG.YT, 0.6)); });
    var TR = bins(T), DP = bins(T);
    sgJacks(TR, false); sgJacks(DP, true);
    g.add(group(THREE, "travelpose", TR));
    var dp = group(THREE, "deploypose", DP); dp.visible = false; g.add(dp);
    /* the boom points aft: a fixed frame turned about Z holds the elevating group, so the game's
       raise (about the group's own Y) lifts the boom's tail end */
    var base = group(THREE, "boombase", null, SX(SG.PIV), 0, SG.PZ);
    base.rotation.z = Math.PI;
    var inner = group(THREE, null, null);
    inner.rotation.y = -SG.REST;
    var PB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), round: new Bin(T.round, false) };
    var cells = sgPod(PB);
    var E = group(THREE, "podelev", PB);
    E.userData.el = SG.EL;
    E.userData.cells = cells;
    inner.add(E); base.add(inner); g.add(base);
    return g;
  }

  /* ============================================================== CORPORAL (GB)
     the US Corporal rig of js/hero/us_early_rockets.js; the round in olive, as the Royal
     Artillery's in [IWM] */
  function buildCorporalGb(THREE, M, C) {
    var g = HeroUsEarlyRockets.buildCorporal(THREE, M, C), olive = null;
    g.traverse(function (o) {
      if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === 0xc9c7bd) {
        if (!olive) { olive = o.material.clone(); olive.color.setHex(0x535a3e); }
        o.material = olive;
      }
    });
    g.name = "gb_corporal";
    return g;
  }

  return { buildHawk: buildHawk, buildPatriot: buildPatriot, buildLance: buildLance, buildSergeant: buildSergeant,
           buildCorporalGb: buildCorporalGb };
})();

(function () {
  var H = HeroNatoLaunchersEu;
  /* len: the measured X extent of each build (tools/model3d/dump.js) */
  var ROWS = {
    deu_e60_sam: { len: 5.13, f: H.buildHawk, v: { paint: "gelb", hawkL: 5.08, roundCol: 0xc6c4b8, wingCol: 0x2e3127 } },
    deu_e80_sam: { len: 5.13, f: H.buildHawk, v: { paint: "gelb", hawkL: 5.03, roundCol: 0x585b40, wingCol: 0x585b40 } },
    deu_e90_sam: { len: 10.00, f: H.buildPatriot, v: { paint: "de3" } },
    deu_e80_tel: { len: 6.61, f: H.buildLance, v: { paint: "gelb", roundCol: 0x4e5338 } },
    gbr_e60_tel: { len: 6.61, f: H.buildLance, v: { paint: "uk", roundCol: 0x4e5338 } },
    gbr_e90_tel: { len: 6.61, f: H.buildLance, v: { paint: "uk", roundCol: 0x4e5338 } },
    deu_e60_tel: { len: 17.22, f: H.buildSergeant, v: { paint: "gelb", roundCol: 0x4f5437 } }
  };
  Object.keys(ROWS).forEach(function (k) {
    var r = ROWS[k];
    UNIT_MODELS[k] = { len: r.len, build: function (THREE, M, C) { return r.f(THREE, C, r.v); } };
  });
  if (typeof HeroUsEarlyRockets !== "undefined")
    UNIT_MODELS["gbr_e50_tel"] = { len: 16.65, build: HeroNatoLaunchersEu.buildCorporalGb };
})();
