/* ============ roc_artillery.js - HERO models: ROC Army artillery, rocket launchers and air defence ============
   Fourteen rows.  NEW = drawn here; REUSED = another hero's builder, repainted on that build's own
   materials (no module edited).

   ROW               VEHICLE                              HOW                                         PAINT
   roc_e50_spg       M7B1 Priest 105 mm HMC               NEW  priest()                                od
   roc_e50_spaag     M16 MGMC (M3 half-track, M45 mount)  NEW  m16()                                   od
   roc_e60_spg       M110A2 203 mm SPH (the row's name;   NEW  m110()                                  od
                     its "full" also names the M108)
   roc_e60_mlrs      Kung Feng IV, 2 x 20 126 mm, on the  REUSED HeroM113.build (js/hero/us_m113.js)   the module's olive drab
                     M113A1                                    with a variant of this file's own (below),
                                                               its turret meshes replaced by the launcher
   roc_e80_mlrs      Kung Feng VI, 45 x 117 mm, M54 5-ton NEW  kf6(..., "od")                          od
   roc_e90_mlrs      Kung Feng VI (same vehicle)          NEW  kf6(..., "roc")                         roc
   roc_e00_mlrs      RT-2000 (Mk15 pack) on the MAN HX 8x8 NEW rt2000()                                roc (pack rocg)
   roc_e80_spaag     M730A1 Chaparral                     NEW  chaparral()                             od
   roc_e00_coastssm  Hsiung Feng II mobile launcher       NEW  hf2()                                   roc (boxes rocg)
                     (6x4 tractor and erector semitrailer)
   roc_e80_spg       M109A1B / M109A2                     REUSED HeroPaladin.build(..., "e80")          od   (map swapped)
   roc_e90_spg       M109A2 / M109A5                      REUSED HeroPaladin.build(..., "e80")          roc  (map swapped)
   roc_e00_spg       M109A2 / M109A5                      REUSED HeroPaladin.build(..., "e80")          roc  (map swapped)
   roc_e90_spaag     AN/TWQ-1 Avenger on the M1097        REUSED HeroHumvee.make("av")                  roc  (map swapped)
   roc_e00_sam       Patriot PAC-2 GEM+ (M983, M860, M901) REUSED HeroUsPatriot.build(THREE, C,         rocg, canisters rocgb
                                                                { gen: "pac2", paint: "camo" })
   Not registered: roc_e00_spaag (Antelope, not in this brief), roc_e60_spaag (M42, js/hero/roc_kpa_reuse.js),
   roc_e60_sam / roc_e80_sam (HAWK, roc_kpa_reuse.js).

   PAINT METHOD for the reused rows: the module builds as it always does; every material of THAT build
   that carries the module's paint texture gets a fresh CanvasTexture of this file's canvas for the same
   tile size (HeroPaladin's bins map 0.30 per metre; the HMMWV skin is mapped by world position at 4.6 m,
   the Patriot's at 8.0 m), colour reset to white (reskin()).  The modules make their materials fresh per
   build and their cached canvases are not touched, so the US and German rows they draw do not change
   (js/hero/deu_us_pattern.js repaints HeroPaladin the same way, on per-build materials).  The Patriot's
   canister stack ("podelev") gets its own copy of the skin material first, so it can carry the two-colour
   scheme while the trailer and tractor are plain.  Kung Feng IV: HeroM113.variants gains one entry,
   "kf4_roc" ({ kind: "kf4", the ACAV's olive drab }), added at the first build - an exposed table, as
   deu_us_pattern.js adds a row to HeroUsMlrs.rows; kind "kf4" is none of the module's kinds, so it draws
   the plain M113A1 hull and a turret group at the M163 ring station (X -0.50 on the roof); this file
   removes that group's meshes and puts the launcher in it.  Variants used: HeroPaladin "e80" is the
   module's M109A2 (39-calibre M185, M178 mount, bustle rack); the M109A1B and M109A5 are drawn as it: the
   A5's M284 tube and M182A1 mount are the same length and outline at game scale (en.wikipedia "M109
   howitzer": the A5 "M284 cannon and M182A1 mount"), so no separate A5 is drawn - NOT CONFIRMED in detail.

   REFERENCES (Wikimedia Commons, width 960, cached in scratchpad/q_rocart_ref; thumbnails through
   commons.wikimedia.org/w/thumb.php):
     T1  "Thunderbolt 2000 MLRS Side View 20111105a.jpg" - RT-2000 from the LEFT, near square on: THE
         RT-2000 STATION TABLE, at 96 px a metre from the front tyre (119 px = the HX's standard 14.00 R 20,
         1.24 m; en.wikipedia "RMMV HX range": standard tyre 14.00 R 20, width 2.5 m).  The cab, the box
         and the upright spare behind it, the folded loader crane, the pod frame with its X-braced sides
         and the closed box over its front 1.15 m, the turntable and trunnion at the pod's rear.
     T2  "Thunderbolt 2000 MLRS Right View 20111105.jpg" - right rear: the pack's capped rear ends, the
         plain dark green frame, the stabiliser legs behind the last axle, the camouflaged truck.
     T3  "M1097 Avenger and Thunderbolt 2000 MLRS Display at Chengkungling Ground 20131012.jpg" - the
         pack RAISED about a hinge at its rear, mouths up toward the cab; an Avenger in the ROC three-colour.
     K1  "Kung Feng VI MLRS at Chengkungling Left View 20131012.jpg" - from the LEFT: the bonneted M54-
         series cab with the air cleaner drum on the left fender, the hard top, the spare behind the cab,
         the cargo body with its stake racks, the 45-tube pack in the bed, mouths forward, slightly raised;
         dual rear tandem; camouflage.  Strong perspective (front tyre 96 px, rear 132 px): used for
         proportions at the rear station only; lengths come from the published figures below.
     K2  "Kung Feng VI MLRS Side View Oct2011a.jpg" - the other fit (a flat deck with stabiliser legs and a
         rear platform): the pack raised, hinged at its rear on a turntable, tube bands and the handwheels.
     F1  "Kung Feng IV MLRS Trailer Display at Chengkungling 20131012a.jpg" - the Kung Feng IV launcher (on
         its trailer): two blocks of 5 rows x 4 tubes either side of a centre plate with a handwheel.
     C1  "M730A1 Display at Tainan Air Force Base with Soldiers 20130810.jpg" - ROC M730A1 from the rear:
         the launch station (the gunner's cab between two arms, two missiles a side, one over the other),
         the low hull, ROC camouflage; an ROC M110A2 behind it (long tube, three-colour).
     C2  "M730A1 Display in ROCA Infantry School 20120211a.jpg" (left rear), C3 "...20120211b.jpg" (right
         side): the LOW cab at hull-top height with the bows of its canvas top, the launcher at the rear,
         the missiles level and forward, five road wheels, front sprocket.
     H1  "A M16 MGMC.jpg" - an M16 from the RIGHT, near square on: THE M16 STATION TABLE, at 109 px a metre
         from the published 6.5 m over the front roller and the rear plate.
     P1  "M7 Priest at APG.jpg" (front right), P2 "American tank M7 105-MM - JPG1.jpg" (right side 3/4),
         P3 "M7 Priest at the HGM.jpg" (left front): the rounded nose, the pulpit right front, the open box,
         the side stowage trays, three VVSS bogies a side with their return rollers, the howitzer right of
         the centre line.
     E1  "ROCA M110A2 Display at ORDC Yue Kang Road Side View 20121013a.jpg" - ROC M110A2 from the RIGHT,
         near square on: THE M110A2 STATION TABLE (below).
     N1  "ROCN Hsiung Feng II & Hsiung Feng III Anti-Ship Missile Launchers Truck Display at Zuoying Naval
         Base Ground 20151024.jpg" - left front 3/4: the 6x4 forward-control tractor, the semitrailer with
         two shelters and rails on its raised front deck, the mast with a small dish, the four-box erector
         raised at the tail, mouths up and forward.  N2 "Rear View of Covered ... Truck 20141123.jpg": the
         boxes two columns of two, light end plates.  N3 "Covered ... 20141123a.jpg": the same under nets.
     R1  "Patriot PAC-2 Launcher with HEMTT Display at Sidewalk of Section 2, Xianmin Blvd Right Side View
         20140906.jpg" - the ROC launcher: canisters green with black patches, trailer and M983 plain green.
     Colour-sampled only (not used for shape): "ROCA M1097 Avenger Display at CKS Memorial Hall Square
     20140607.jpg" (A1: green #768668, brown #735f54, black), "M109A2 howitzer Side View 20110813.jpg" (ROC
     M109A2; us_paladin.js's own [D] samples green, brown and black), "ROCA M108 howitzer in Armor School
     Side View 20130302.jpg" (an ROC M108, plain olive), "Kung Feng VI ..." K1 and T1 (median cut).
   PUBLISHED (en.wikipedia): "Kung Feng multiple launch rocket system": KF IV 2 x 20 126 mm on the M113 (army)
     from 1976, rocket 0.91 m; KF VI 45 x 117 mm, rocket 2.166 m, "on M52A1 truck" (variants) / "M809 five
     tonne" (history).  "M39 series 5-ton 6x6 truck": M54 cargo wheelbase 179 in (4.55 m), 26 ft 2 in with
     the winch (15.5 in), so 7.58 m without, 8 ft 1 in (2.46 m) wide, 9 ft 8 in (2.95 m) high; 11.00x20
     tyres, dual rear.  "Thunderbolt-2000": MAN HX 8x8, Mk15 60 rounds in 3 pods of 20.  "M48 Chaparral":
     M730 238.5 x 105.75 x 105.5 in (6.06 x 2.69 x 2.68 m); MIM-72 2.90 m, 127 mm, span 0.63 m.  "M16
     Multiple Gun Motor Carriage": 6.5 x 2.16 x 2.34 m.  "M7 Priest": 19 ft 9 in x 9 ft 5 in (with
     sandshields) x 8 ft 4 in, 9 ft 8 in over the AA MG (6.02 x 2.87 x 2.54 / 2.95 m).  "M110 howitzer":
     10.8 x 3.1 x 3.1 m, the M110A2's double muzzle brake.  "Hsiung Feng II": missile 4.80 m, 0.40 m; mobile
     launcher accepted 2005.  us_m548_family.js D1 (the M548 TM drawing, which the M730 shares): the hull
     and running-gear stations used for the M730A1.

   STATION TABLES (model X + forward, metres; z above ground)
     RT-2000 (T1, X = (487 - px) / 96): axles 3.30, 1.51, -2.11, -3.47 (tyre r 0.62); bumper 4.57, tail
       -4.55; cab face 4.45 to its rear wall 2.83, roof 3.44, windscreen 2.40-3.12; box 2.70..0.85 to 2.47;
       spare centre 1.86 / 2.24; crane column 0.05 to 2.95; deck 1.55; pack X -0.58 (mouths) to -4.55,
       z 2.20-3.20; trunnion -3.90 / 2.15; turntable -2.60.
     M16 (H1, X = (px - 495) / 109): front roller 3.08, rear plate -3.26; front axle 1.74 (r 0.50); track:
       sprocket -0.92 / 0.57 r 0.33, idler -2.66 / 0.59, bogie wheels -2.34 -1.97 -1.61 -1.28 (r 0.20);
       hood 2.42 to 0.85 (top 1.62), windscreen plate 2.23, body sides 2.00; M45 ring -2.06.
     M110A2 (E1): the photograph's two depths settled by ratios at one station each - the hull side at
       100 px a metre (its 640 px over the hull = 6.42 m, the published length of the M578 that shares the
       chassis is not in hand: NOT CONFIRMED; the hull scale is the one that puts the published 10.8 m on the
       spade-tip-to-muzzle span measured on the centre line at 85 px a metre - both ends are on the centre
       line, so that ratio holds at one depth); road wheels -2.85 -1.72 -0.62 0.46 1.52 (r 0.47, the rear
       one the grounded idler), sprocket 2.48 / 0.70; hull nose 2.90, rear -3.50, deck 1.55; mount -1.41;
       gun axis 2.45; muzzle 5.24 (centre-line scale); breech -4.0; spade tip -5.45 / 2.45.
     KF VI: front axle 2.60, tandem -1.265 / -2.635 (the 4.55 m wheelbase, 1.37 m tandem K1 measures at
       the rear station: 167 px / 120 px a metre); bumper 3.65, body tail -3.925 (7.58 m published, the
       overhangs proportioned to it); hood top 1.66, cab roof 2.54; bed floor 1.30, sides 1.98, racks 2.52;
       pack 3.2 m of tube (NOT CONFIRMED: K1's proportion; the rocket is 2.166 m), trunnion -3.70 / 2.20.
     M7B1: bogies 1.15, -0.30, -1.75 (wheels +-0.29, r 0.254), sprocket 2.42 / 0.90, idler -2.72 (P2's
       proportions against the published 6.02 m - P2 is a 3/4 view: NOT CONFIRMED).
     M730A1: D1's M548 table (hull 5.75 m, wheels 1.449 ... -1.371, sprocket 2.133, idler -2.05, deck 1.06);
       the low cab to 1.62 and the bows to 2.24 from C2/C3's proportions; launcher at X -1.35.
     HF-2: N1 is a steep 3/4 view (front tyre 105 px, trailer tyres 50 px); no station can be measured and
       no published launcher figure was found: tractor axles 7.30 / 4.20 / 2.85, trailer axles -6.30 -7.30
       -8.30, boxes 0.72 m square and 5.90 m long (the 4.80 m missile), all NOT CONFIRMED.

   WHERE A DRAWING AND A FIGURE DISAGREE (evidence; nothing reshaped to a figure)
     M16 height: published 2.34 m; H1 at the published-length scale puts the body sides at 2.00 m, the
       windscreen plate at 2.23 m and the M45's ammunition chests at about 3.0 m.  The 2.34 m matches the
       armoured body, not the mount, so the mount is drawn as H1 shows it (drawn 3.02 m).
     M730A1 length: published 6.06 m; the hull is drawn on the M548's TM drawing (5.75 m), measured 5.84 m.
       C3 is a 3/4 view and gives no station ratio to settle the 0.2 m; left as drawn.
     M110A2: E1's hull-side scale (100 px/m) and centre-line scale (85 px/m) differ by the depth between
       them; the published 10.8 m, 3.1 m and 3.1 m come out 10.79 x 3.16 x 3.04 m.
     KF VI height: published 2.95 m for the M54 cargo to the top of the cab and bows; the pack stands
       above it (K1), drawn to 3.28 m.
     RT-2000 width: body 2.50 m (published HX width); 2.96 m over the mirrors.
     M7B1 length: 6.09 m drawn (6.02 published): the muzzle and the idler's track 0.03-0.04 m past each end.

   RECOGNITION (what reads at game zoom; source)
     RT-2000: forward-control cab with deep side windows, the box and upright spare behind it, the folded
       crane, a long boxy pod frame over the rear two axles, mouths forward (T1-T3).
     KF VI: the bonneted M54 cab, the air-cleaner drum, the stake-rack cargo body, a 5 x 9 pack in the bed,
       mouths forward (K1, K2).  KF IV: the M113 box with the two 20-tube blocks on a pedestal (F1, text).
     M730A1: the low M548 hull, the bows, the launch station with two missiles each side (C1-C3).
     M16: the half-track: front wheels and the short rear track unit, the armoured hood and windscreen,
       the M45 with four .50s and tall ammunition chests (H1).
     M7B1: the Sherman running gear, rounded nose, the round pulpit right front, the open-topped box (P1-P3).
     M110A2: the long 203 mm tube with its double brake on an open mount at the rear, the raised spade, five
       big road wheels and the round side vents (E1, C1).
     HF-2: the tractor-semitrailer, two shelters and rails on the front deck, the mast, the four boxes at
       the tail (N1-N3).
   PAINT (sampled, taken to about 0.8 of the sunlit level; no markings, numbers, roundels, plates or
     slogans - C1's missiles carry characters and N1/T1 unit numbers: not drawn):
     od    US olive drab as delivered (#4b4e32) for the e50/e60 rows and the e80 rows.  The ROC three-colour
           is photographed only from 2011 on; when it replaced plain olive is NOT CONFIRMED, so the e80
           rows (1981-) stay olive and the e90/e00 rows take the camouflage.
     roc   green #55654b with brown #5e4b40 and black #232421 patches (T1, K1, A1, us_paladin.js [D]).
     rocg  plain dark green #4a5541: the RT-2000 pod frame (T1, T2), the Chaparral launch station (C1),
           the HF-2 boxes, the Patriot trailer and tractor (R1).
     rocgb green with black patches only: the Patriot canisters (R1).
   NOT CONFIRMED (proportion or judgement, beyond the tables' own notes): the RT-2000 pack's 3 pods of
     4 x 5 tubes (only the round count is published) and its width (2.16 m); the KF VI pack's 5 x 9 tube
     arrangement and the turntable's place; the KF IV's place and pedestal height on the M113 (no
     photograph of the self-propelled fit was found: the launcher is F1's, the M113 is the module's); the
     M730A1 bows' heights and the launch station's sizes; the M45's sizes; the M7's bogie stations and
     the M7B1's (M4A3) hull details (the photographs are M7s); the M110A2's deck fittings, mount struts and
     rear rails; everything dimensional on the HF-2 (see its table), its mast cut at 4.6 m (N1 shows it
     raised far higher; render3d's era kit sits on the highest point) and the erector's ram; the launch
     elevations (RT-2000 0.65, KF VI 0.55 above its 0.10 stow, KF IV 0.60, Chaparral 0.45, HF-2 1.00 rad).
   NOT DRAWN: crews, nets, the KF VI's K2 fit (flat deck, legs), the RT-2000's ammunition carrier, the HF-2's
     separate radar and command vehicles, the M16's winch (H1 shows the roller), the Patriot radar.
   LAUNCHERS: "turret" (the turntable, origin on its ring on the deck, launch direction +X) holding
     "podelev" (origin on the trunnion; userData.el, userData.cells = [mouth x, y, z, rear x] in its frame):
     RT-2000 60 cells, KF VI 45, KF IV 40, Chaparral 4 (the rails elevate), HF-2 4 (row turret:false: its
     "podelev" hangs on the root and the vehicle turns to lay).  No row here names its round with "ord"
     (tools/jsc/launcher3d_check.js's list is unchanged).  The reused Patriot keeps its module's turret and
     podelev.
   ENGINE (js/damage3d.js ENGINE_AT, not edited): every row matches - roc_e50_spg "rear" (listed: the
     Priest's radial at the back); roc_e50_spaag, roc_e80_spaag, roc_e90_spaag "front" (listed); the spg
     rows default "front" (M110 and M109 engines front right: right); the mlrs rows default "front" (the
     trucks; the M113's engine front right: right); roc_e00_sam and roc_e00_coastssm default "front" (the
     tractors: right).  No mismatch to report.
   LOAD ORDER: after js/armour_specs.js, js/sam3d.js and js/tel3d.js (their generic registrations of these
     keys are replaced) and after js/hero/us_m113.js, us_paladin.js, us_humvee.js and us_patriot.js (whose
     builders the reused rows call; each such row is registered only if its module is loaded).  Nothing
     else reads this file.
   Materials: PAINT (canvas texture per scheme), DARK, RUB (spare tyres), GLASS, TEAM (exactly C.team: thin
     strips on cab roofs, decks and pod tops), WHEEL (vertex colours, one draw call per wheel group),
     TUBE / FRAME / ROUND / PLATE where a row needs them.  Nodes: "turret", "podelev" (launchers),
     "roadwheel" (tracked: one per station, both sides; wheeled: one per axle).
   Model space: +X nose, +Y left (port), +Z up, metres, ground at z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocArtillery = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* ------------------------------------------------------------ geometry kit (pla_type63_apc.js) */
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
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.30, q[1] * 0.30);
        else if (ay >= ax) this.U.push(q[0] * 0.30, q[2] * 0.30);
        else this.U.push(q[1] * 0.30, q[2] * 0.30);
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
  /* a box on both sides: y0 < y1 on +Y, mirrored */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
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
  /* a box turned about Y by angle a (radians, + raises its +X end), centre c, half sizes */
  function boxP(bin, c, a, hu, hv, hw) { slab(bin, c, [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], hu, hv, hw); }

  /* ---------------------------------------------------------------- paint */
  /* "od": US olive drab as delivered (FS 24087, #4b4e32: the US redo family's, us_paladin.js e60);
     "roc": the ROC Army three-colour - a green field with big hard-edged brown and black patches,
     sampled off [T1] (sunlit cab side, median cut: green #6a7e5e, brown #765f55, black #1a1a19)
     and [K1], taken to about 0.8 of the sunlit level; "rocg": the plain dark green of the RT-2000
     launcher frame and the Chaparral launcher [T1][T2][C1].  One canvas per scheme and tile size
     (metres), every patch drawn nine times so the tile repeats. */
  var PAINTS = {
    od:   { base: "#4b4e32", tone: ["#52553a", "#44472d"], seed: 1951, camo: false },
    roc:  { base: "#55654b", tone: ["#5e4b40", "#232421"], seed: 1981, camo: true },
    rocg: { base: "#4a5541", tone: ["#515c47", "#434c3a"], seed: 2012, camo: false },
    rocgb: { base: "#4d5944", tone: ["#4d5944", "#20221f"], seed: 1997, camo: true }
  };
  var _cv = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintCanvas(kind, tile) {
    var key = kind + "_" + tile;
    if (_cv[key] !== undefined) return _cv[key];
    var P = PAINTS[kind], cv = null;
    try {
      cv = document.createElement("canvas");
      var S = 256, q, R = rng(P.seed), i, k, x, y, w, pm = S / tile, ox, oy, j, n, a, r, pts;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      if (P.camo) {
        /* brown, then black over it, in patches 0.6-1.4 m across (T1, K1, A1) */
        for (k = 0; k < 2; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < Math.max(3, Math.round(tile * tile * (k ? 0.30 : 0.42))); i++) {
            x = R() * S; y = R() * S; w = (k ? 0.30 : 0.42) * pm * (0.7 + R() * 0.7);
            n = 9; pts = [];
            for (j = 0; j < n; j++) { a = j / n * TAU; r = 0.6 + R() * 0.5; pts.push([Math.cos(a) * w * 1.5 * r, Math.sin(a) * w * 0.8 * r]); }
            for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
              q.beginPath(); q.moveTo(x + ox + pts[0][0], y + oy + pts[0][1]);
              for (j = 1; j < n; j++) q.lineTo(x + ox + pts[j][0], y + oy + pts[j][1]);
              q.closePath(); q.fill();
            }
          }
        }
      } else {
        for (k = 0; k < P.tone.length; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < 7; i++) {
            x = R() * S; y = R() * S; w = 30 + R() * 60;
            q.globalAlpha = 0.45; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
          }
        }
        q.globalAlpha = 1;
      }
      for (i = 0; i < 80; i++) {          /* rain streaks, rubbed paint */
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 8 + R() * 36);
      }
      for (i = 0; i < 40; i++) { q.fillStyle = "rgba(10,10,8,0.15)"; q.fillRect(R() * S, R() * S, 2, 2); }
    } catch (e) { cv = null; }
    _cv[key] = cv;
    return cv;
  }
  function tex(THREE, kind, tile) {
    var cv = paintCanvas(kind, tile), t;
    if (!cv) return null;
    try {
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    return t;
  }
  function paintMat(THREE, kind) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 }), t = tex(THREE, kind, 1 / 0.30);
    if (t) m.map = t; else m.color.set(PAINTS[kind].base);
    return m;
  }
  function materials(THREE, C, kind) {
    var T = {};
    T.paint = paintMat(THREE, kind);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1c1d1e, roughness: 0.95, metalness: 0.03 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.04, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rub: new Bin(T.rub, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b || !b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); if (name) g.name = name; g.position.set(x || 0, y || 0, z || 0); return g; }
  function shadows(g) { g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; }
  function hexc(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }

  /* ----------------------------------------------------------- running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* a track rope round the convex hull of circles [x, z, r], both sides at +-ty, half width tw,
     with a shoe every `pitch` metres and a guide horn on each */
  function track(bin, C, ty, tw, pitch) {
    var pts = [], i, k, n, a, b, l, segs = [], tot = 0, cnt, step, s, y, q, rem, d, t, dx, dz, px, pz;
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts); n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l > 1e-4) { segs.push([a, b, l]); tot += l; }
    }
    n = segs.length; cnt = Math.round(tot / (pitch || 0.17)); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(bin, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - tw, y + tw, 0.045);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2]; a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(bin, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - tw - 0.01, y + tw + 0.01, 0.065);
        belt(bin, px - dx * 0.02 - dz * 0.06, pz - dz * 0.02 + dx * 0.06, px + dx * 0.02 - dz * 0.06, pz + dz * 0.02 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
    }
  }
  /* a toothed sprocket pair at (x, z), both sides */
  function sprocket(bin, x, z, r, ty, n) {
    var s, y, i, ta;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      cylY(bin, x, y - 0.10, y + 0.10, z, r - 0.05, 18);
      for (i = 0; i < n; i++) {
        ta = i / n * TAU;
        slab(bin, [x + Math.cos(ta) * (r - 0.02), y, z + Math.sin(ta) * (r - 0.02)], [Math.cos(ta), 0, Math.sin(ta)], [0, 1, 0], [-Math.sin(ta), 0, Math.cos(ta)], 0.035, 0.085, 0.03);
      }
    }
  }
  /* a road-wheel pair in a "roadwheel" group's own frame (axle centre at the origin):
     rubber tyre, painted dished disc, hub; vertex colours (one draw call) */
  function wheelPair(W, base, ty, r, w, dual) {
    var s, y, k, TY = [0.13, 0.135, 0.125], D = hexc(base, 1.1), H = hexc(base, 1.3);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < (dual ? 2 : 1); k++) {
        y = s * (ty + (dual ? (k ? 1 : -1) * (w * 0.5 + 0.02) : 0));
        W.col = TY; cylY(W, 0, y - w / 2, y + w / 2, 0, r, 20);
        W.col = D; cyl(W, [0, y + s * w / 2, 0], [0, y + s * (w / 2 + 0.025), 0], r - 0.05, r * 0.42, 20);
        W.col = H; cylY(W, 0, y + s * (w / 2 + 0.02), y + s * (w / 2 + 0.06), 0, r * 0.22, 10);
      }
    }
  }
  /* a truck tyre pair (singles or duals) for a wheel group: tread, sidewall, rim, hub */
  function tyrePair(W, base, ty, r, w, dual) {
    var s, y, k, a, TY = [0.11, 0.115, 0.11], SW = [0.15, 0.15, 0.145], RM = hexc(base, 1.0), H = hexc(base, 1.2);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < (dual ? 2 : 1); k++) {
        y = s * (ty + (dual ? (k ? 1 : -1) * (w * 0.5 + 0.015) : 0));
        W.col = TY; cylY(W, 0, y - w / 2, y + w / 2, 0, r, 22);
        for (a = 0; a < 16; a++) {   /* tread lugs */
          var ta = a / 16 * TAU;
          slab(W, [Math.cos(ta) * (r + 0.008), y, Math.sin(ta) * (r + 0.008)], [Math.cos(ta), 0, Math.sin(ta)], [0, 1, 0], [-Math.sin(ta), 0, Math.cos(ta)], 0.012, w * 0.42, r * 0.09);
        }
        if (dual && k === 0) continue;
        W.col = SW; cylY(W, 0, y + s * w / 2, y + s * (w / 2 + 0.012), 0, r * 0.93, 22);
        W.col = RM; cyl(W, [0, y + s * (w / 2 + 0.01), 0], [0, y + s * (w / 2 + 0.03), 0], r * 0.56, r * 0.50, 18);
        W.col = H; cylY(W, 0, y + s * (w / 2 + 0.02), y + s * (w / 2 + 0.09), 0, r * 0.20, 10);
      }
    }
  }
  function wheelGroups(THREE, g, T, list) {
    /* list: [x, z, fn(W)] - one "roadwheel" group per station/axle, both sides */
    for (var i = 0; i < list.length; i++) {
      var W = new Bin(T.wheel, false, true), wg = group(THREE, "roadwheel", list[i][0], 0, list[i][1]);
      list[i][2](W);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
  }

  /* ===================================================================== tube packs */
  /* a rectangular nest of tubes in a pod frame, in the pod's own frame: rear end x0, mouths at
     x1, rows nr x cols nc about (y=0, z=zc), pitch p, tube radius r.  Returns the cells
     [mouth x, y, z, rear x].  frame: plain plates top and bottom, side plates of length fl
     from the mouth (0 = none) */
  function tubeNest(B, x0, x1, zc, nr, nc, p, r, yc, cells, opt) {
    var i, j, y, z, W = nc * p, H = nr * p, o = opt || {};
    yc = yc || 0;
    box(B.dark, x0 + 0.02, x1 - 0.02, yc - W / 2 + 0.01, yc + W / 2 - 0.01, zc - H / 2 + 0.01, zc + H / 2 - 0.01);
    for (i = 0; i < nr; i++) for (j = 0; j < nc; j++) {
      y = yc - W / 2 + p * (j + 0.5); z = zc - H / 2 + p * (i + 0.5);
      cylX(B.tube, x0, x1, y, z, r, r, 10);
      cylX(B.dark, x1 - 0.004, x1 + 0.002, y, z, r * 0.78, r * 0.78, 8);
      if (cells) cells.push([x1, y, z, x0]);
    }
    if (o.bands) for (i = 0; i < o.bands.length; i++) {
      var bx = o.bands[i];
      box(B.frame, bx - 0.04, bx + 0.04, yc - W / 2 - 0.02, yc + W / 2 + 0.02, zc + H / 2, zc + H / 2 + 0.025);
      box(B.frame, bx - 0.04, bx + 0.04, yc - W / 2 - 0.02, yc + W / 2 + 0.02, zc - H / 2 - 0.025, zc - H / 2);
      box(B.frame, bx - 0.04, bx + 0.04, yc + W / 2, yc + W / 2 + 0.025, zc - H / 2 - 0.02, zc + H / 2 + 0.02);
      box(B.frame, bx - 0.04, bx + 0.04, yc - W / 2 - 0.025, yc - W / 2, zc - H / 2 - 0.02, zc + H / 2 + 0.02);
    }
  }
  /* bake a pod's bins turned by angle a about the pod origin (stowed angle), cells too */
  function tilt(B, cells, a) {
    var k, b, i, c = Math.cos(a), s = Math.sin(a), x, z;
    for (k in B) {
      b = B[k];
      for (i = 0; i < b.P.length; i += 3) { x = b.P[i]; z = b.P[i + 2]; b.P[i] = x * c - z * s; b.P[i + 2] = x * s + z * c; }
      for (i = 0; i < b.N.length; i += 3) { x = b.N[i]; z = b.N[i + 2]; b.N[i] = x * c - z * s; b.N[i + 2] = x * s + z * c; }
    }
    if (cells) for (i = 0; i < cells.length; i++) {
      var m = cells[i], mx = m[0] * c - m[2] * s, mz = m[0] * s + m[2] * c, rx = m[3] * c - m[2] * s;
      cells[i] = [mx, m[1], mz, rx];
    }
  }
  function podBins(T) {
    return { tube: new Bin(T.tube || T.paint, !T.tube), frame: new Bin(T.frame || T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) };
  }

  /* =========================================================== RT-2000 (roc_e00_mlrs) [T1-T4] */
  var RT = { AX: [3.30, 1.51, -2.11, -3.47], R: 0.62, TW: 0.37, TY: 1.00, XB: 4.57, XT: -4.55,
             CF: 4.45, CR: 2.83, CROOF: 3.44, ZD: 1.55, TX: -2.60, TRX: -3.90, TRZ: 2.15, EL: 0.65 };
  function rt2000(THREE, M, C) {
    var T = materials(THREE, C, "roc"), g = group(THREE, "roc_e00_mlrs"), B = bins(T), s, i, y;
    T.frame = paintMat(THREE, "rocg"); T.tube = new THREE.MeshStandardMaterial({ color: 0x2e3330, roughness: 0.6, metalness: 0.3 });
    B.frame = new Bin(T.frame, true);
    /* chassis: frame rails, the deck under the launcher, mudguards over each axle pair (T1, T2) */
    box2(B.dark, 3.95, RT.XT + 0.05, 0.36, 0.50, 1.02, 1.38);
    for (i = 0; i < 6; i++) box(B.dark, 3.4 - i * 1.5, 3.3 - i * 1.5, -0.50, 0.50, 1.10, 1.30);
    box(B.frame, 0.90, RT.XT, -1.25, 1.25, 1.40, RT.ZD);
    box(B.frame, RT.XT + 0.10, RT.XT, -1.25, 1.25, 0.80, 1.40);         /* tail plate with the lamps */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, RT.XT - 0.02, RT.XT, s * 0.95 - 0.08, s * 0.95 + 0.08, 0.90, 1.08);
      box(B.paint, 2.45, 0.95, s > 0 ? 1.05 : -1.25, s > 0 ? 1.25 : -1.05, 1.10, 1.45);    /* side lockers behind the front pair */
      belt(B.dark, 2.42, 1.33, 0.95, 1.33, s * 1.25 - 0.004, s * 1.25 + 0.004, 0.05);
      box(B.dark, -1.30, -4.30, s > 0 ? 0.98 : -1.27, s > 0 ? 1.27 : -0.98, 1.40, 1.44);    /* rear mudguard ledge */
      belt(B.dark, -1.30, 1.42, -1.30, 0.95, s > 0 ? 0.98 : -1.27, s > 0 ? 1.27 : -0.98, 0.04);
      belt(B.dark, -4.30, 1.42, -4.30, 0.95, s > 0 ? 0.98 : -1.27, s > 0 ? 1.27 : -0.98, 0.04);
      box(B.dark, 0.55, -0.05, s > 0 ? 0.90 : -1.22, s > 0 ? 1.22 : -0.90, 0.55, 1.05);   /* tanks under the deck (T1) */
      cylX(B.paint, 0.20, -1.10, s * 0.75, 0.80, 0.24, 0.24, 14);
      /* stabiliser jack at the tail corner (T2: the leg behind the last axle) */
      box(B.dark, -4.25, -4.45, s * 1.05 - 0.10, s * 1.05 + 0.10, 0.55, 1.35);
      cylZ(B.dark, -4.35, s * 1.05, 0.30, 0.55, 0.06, 8);
      box(B.dark, -4.20, -4.50, s * 1.05 - 0.15, s * 1.05 + 0.15, 0.27, 0.31);
    }
    /* cab: the forward-control HX cab, flat face, roof visor, deep side windows (T1, T2) */
    loftN(B.paint, [[[RT.CR, -1.24, 1.00], [RT.CR, 1.24, 1.00], [RT.CR, 1.24, RT.CROOF], [RT.CR, -1.24, RT.CROOF]],
                    [[RT.CF, -1.24, 1.00], [RT.CF, 1.24, 1.00], [RT.CF - 0.12, 1.20, RT.CROOF], [RT.CF - 0.12, -1.20, RT.CROOF]]]);
    box(B.paint, RT.CF + 0.10, RT.CF - 0.05, -1.20, 1.20, RT.CROOF - 0.10, RT.CROOF - 0.02);   /* the visor over the windscreen */
    box(B.dark, RT.XB, RT.CF - 0.10, -1.25, 1.25, 0.62, 1.02);                            /* bumper */
    box(B.dark, RT.XB + 0.01, RT.XB - 0.05, -0.80, 0.80, 1.02, 1.55);                       /* grille */
    for (i = 0; i < 6; i++) box(B.paint, RT.XB + 0.015, RT.XB - 0.02, -0.78, 0.78, 1.07 + i * 0.08, 1.10 + i * 0.08);
    box(B.glass, RT.CF + 0.005 - 0.02, RT.CF - 0.10, -1.10, 1.10, 2.40, 3.12);               /* windscreen */
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, 4.30, 3.70, s > 0 ? 1.24 : -1.25, s > 0 ? 1.25 : -1.24, 2.35, 3.05);   /* door window */
      box(B.glass, 3.55, 3.05, s > 0 ? 1.24 : -1.25, s > 0 ? 1.25 : -1.24, 2.55, 3.05);
      box(B.dark, 3.70, 3.66, s > 0 ? 1.24 : -1.255, s > 0 ? 1.255 : -1.24, 1.10, 3.30);    /* door seam */
      box(B.dark, RT.XB - 0.02, RT.XB - 0.10, s * 1.0 - 0.18, s * 1.0 + 0.18, 0.80, 0.92); /* lamps */
      cylZ(B.dark, 4.42, s * 1.36, 2.30, 3.05, 0.02, 6);                                   /* mirror arms and heads */
      box(B.dark, 4.48, 4.38, s * 1.42 - 0.06, s * 1.42 + 0.06, 2.55, 2.95);
      box(B.dark, 4.25, 3.70, s > 0 ? 1.20 : -1.40, s > 0 ? 1.40 : -1.20, 0.55, 0.60);    /* steps */
      box(B.dark, 4.25, 3.70, s > 0 ? 1.20 : -1.40, s > 0 ? 1.40 : -1.20, 0.85, 0.90);
      box(B.paint, 4.20, 2.75, s > 0 ? 1.08 : -1.30, s > 0 ? 1.30 : -1.08, 1.30, 1.36);   /* front mudguard */
    }
    /* behind the cab: the equipment boxes, the upright spare, the stack, the crane (T1, T2) */
    box(B.paint, 2.70, 0.85, -1.15, 1.15, 1.48, 2.47);
    box(B.dark, 2.10, 1.40, 1.15, 1.16, 1.70, 2.30);
    box(B.dark, 1.30, 0.95, 1.15, 1.16, 1.70, 2.30);
    var SP = new Bin(T.rub, false);
    cylX(SP, 1.68, 2.05, 0.35, 2.24, 0.62, 0.62, 22);
    cylX(B.dark, 1.66, 2.07, 0.35, 2.24, 0.34, 0.34, 14);
    cylZ(B.dark, 2.62, -0.95, 1.50, 3.25, 0.07, 10);
    box(B.frame, 0.45, -0.25, -0.35, 0.35, RT.ZD, 1.75);                                   /* crane base */
    cylZ(B.frame, 0.05, 0.0, 1.75, 2.75, 0.20, 14);
    boxP(B.frame, [0.10, 0.0, 2.85], 1.35, 0.28, 0.18, 0.14);
    box(B.frame, 0.25, -0.10, -0.15, 0.15, 2.70, 3.00);
    cylZ(B.dark, -0.12, 0.25, 1.80, 2.80, 0.05, 8);
    /* team colour: a strip on the cab roof and on the box behind it */
    box(B.team, 3.80, 3.10, -0.08, 0.08, RT.CROOF, RT.CROOF + 0.01);
    box(B.team, 2.40, 1.20, -0.08, 0.08, 2.47, 2.48);
    var hg = group(THREE, "hull"); flush(THREE, hg, B); flush(THREE, hg, { sp: SP }); g.add(hg);
    wheelGroups(THREE, g, T, RT.AX.map(function (x) { return [x, RT.R, function (W) { tyrePair(W, "#4a5541", RT.TY, RT.R, RT.TW, false); }]; }));
    /* the launcher: turntable on the deck ("turret"), the pod frame hinged at its rear ("podelev") */
    var tg = group(THREE, "turret", RT.TX, 0, RT.ZD), TB = { frame: new Bin(T.frame, true), dark: new Bin(T.dark, false) };
    cylZ(TB.frame, 0, 0, 0, 0.18, 0.95, 24);
    box(TB.frame, 0.95, -1.45, -0.85, 0.85, 0.18, 0.42);
    for (s = -1; s <= 1; s += 2) {
      box(TB.frame, -0.95, -1.45, s * 0.70 - 0.12, s * 0.70 + 0.12, 0.42, RT.TRZ - RT.ZD + 0.10);   /* trunnion cheeks */
      cyl(TB.dark, [0.75, s * 0.55, 0.30], [-0.40, s * 0.55, 0.62], 0.08, 0.08, 10);              /* elevating rams */
    }
    box(TB.dark, 0.95, 0.70, -0.85, 0.85, 0.42, 0.55);
    flush(THREE, tg, TB);
    var pe = group(THREE, "podelev", RT.TRX - RT.TX, 0, RT.TRZ - RT.ZD), PB = podBins(T), cells = [], L0 = -0.65, L1;
    L1 = -0.58 - RT.TRX;                         /* the mouths: X -0.58 (T1) */
    for (i = -1; i <= 1; i++) tubeNest(PB, L0 + 0.05, L1 - 0.02, 0.52, 5, 4, 0.148, 0.062, i * 0.66, cells, { bands: [L0 + 0.6, (L0 + L1) / 2, L1 - 1.3] });
    /* the pod frame: top and bottom plates, the X-braced side frames, the closed box over the
       front 1.15 m (T1, T2) */
    box(PB.frame, L0, L1, -1.08, 1.08, 1.02, 1.06);
    box(PB.frame, L0, L1, -1.08, 1.08, -0.02, 0.02);
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.06;
      box(PB.frame, L1 - 1.15, L1, s > 0 ? 1.00 : -1.08, s > 0 ? 1.08 : -1.00, 0.0, 1.04);
      box(PB.frame, L0, L1 - 1.15, s > 0 ? 1.02 : -1.08, s > 0 ? 1.08 : -1.02, 0.94, 1.04);
      box(PB.frame, L0, L1 - 1.15, s > 0 ? 1.02 : -1.08, s > 0 ? 1.08 : -1.02, 0.0, 0.10);
      for (i = 0; i < 3; i++) {
        var xa = L0 + i * (L1 - 1.15 - L0) / 3, xb = xa + (L1 - 1.15 - L0) / 3;
        box(PB.frame, xa, xa + 0.07, s > 0 ? 1.02 : -1.08, s > 0 ? 1.08 : -1.02, 0.0, 1.04);
        belt(PB.frame, xa, 0.08, xb, 0.96, y - 0.025, y + 0.025, 0.06);
        belt(PB.frame, xa, 0.96, xb, 0.08, y - 0.025, y + 0.025, 0.06);
      }
    }
    box(PB.dark, L0 + 0.02, L0, -1.0, 1.0, 0.05, 0.98);
    box(PB.team, L0 + 0.5, L0 + 1.4, -0.08, 0.08, 1.06, 1.07);
    flush(THREE, pe, PB);
    pe.userData.el = RT.EL; pe.userData.cells = cells;
    tg.add(pe); g.add(tg);
    return shadows(g);
  }


  /* ============================================== Kung Feng VI on the M54 5-ton (roc_e80/e90_mlrs) [K1-K4] */
  var KF = { XF: 2.60, XA: [-1.265, -2.635], R: 0.55, TW: 0.28, XB: 3.65, XT: -3.925, ZF: 1.30,
             TX: -2.45, TRX: -3.70, TRZ: 2.20, STOW: 0.10, EL: 0.55 };
  function kf6(THREE, M, C, paint) {
    var T = materials(THREE, C, paint), g = group(THREE, "kf6"), B = bins(T), s, i, x;
    T.tube = new THREE.MeshStandardMaterial({ color: 0x3a4036, roughness: 0.7, metalness: 0.2 });
    /* frame rails, bumper with the tow hooks, the radiator and hood (K1, K2) */
    box2(B.dark, 3.55, KF.XT + 0.10, 0.38, 0.50, 0.80, 1.05);
    box(B.dark, KF.XB, KF.XB - 0.18, -1.15, 1.15, 0.55, 0.82);
    for (s = -1; s <= 1; s += 2) box(B.dark, KF.XB + 0.06, KF.XB - 0.02, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.60, 0.78);
    loftN(B.paint, [[[3.48, -0.52, 0.85], [3.48, 0.52, 0.85], [3.48, 0.52, 1.55], [3.48, -0.52, 1.55]],
                    [[2.20, -0.58, 0.85], [2.20, 0.58, 0.85], [2.20, 0.58, 1.66], [2.20, -0.58, 1.66]]]);
    box(B.dark, 3.50, 3.47, -0.45, 0.45, 0.92, 1.50);                                      /* grille */
    for (i = 0; i < 7; i++) box(B.paint, 3.505, 3.49, -0.44 + i * 0.13, -0.40 + i * 0.13, 0.92, 1.50);
    for (s = -1; s <= 1; s += 2) {
      /* the flat front fender, its front turned down, the headlamp on it (K1, K3) */
      box(B.paint, 3.45, 1.75, s > 0 ? 0.55 : -1.20, s > 0 ? 1.20 : -0.55, 1.12, 1.17);
      belt(B.paint, 3.45, 1.15, 3.62, 0.88, s > 0 ? 0.55 : -1.20, s > 0 ? 1.20 : -0.55, 0.04);
      belt(B.paint, 1.80, 1.15, 1.75, 0.62, s > 0 ? 0.85 : -1.20, s > 0 ? 1.20 : -0.85, 0.04);
      cylX(B.paint, 3.30, 3.48, s * 0.80, 1.28, 0.10, 0.10, 12);
      cylX(B.glass, 3.48, 3.50, s * 0.80, 1.28, 0.08, 0.08, 12);
      /* cab: doors, the windscreen in its frame, hard top (K1, K3) */
      box(B.glass, 2.12, 1.40, s > 0 ? 1.00 : -1.005, s > 0 ? 1.005 : -1.00, 1.98, 2.40);
    }
    /* the air cleaner on the left fender, the drum lying fore and aft (K1) */
    cylX(B.paint, 3.30, 2.45, 0.88, 1.48, 0.22, 0.22, 16);
    cylX(B.dark, 2.45, 2.25, 0.88, 1.48, 0.10, 0.10, 10);
    box(B.paint, 2.20, 1.20, -1.00, 1.00, 1.15, 1.95);
    box(B.paint, 2.20, 2.14, -1.00, 1.00, 1.95, 2.48);
    box(B.glass, 2.215, 2.19, -0.92, -0.06, 2.00, 2.42);
    box(B.glass, 2.215, 2.19, 0.06, 0.92, 2.00, 2.42);
    box(B.paint, 1.38, 1.20, -1.00, 1.00, 1.95, 2.48);
    box(B.paint, 2.22, 1.18, -1.02, 1.02, 2.48, 2.54);
    box(B.dark, 1.80, 1.76, -1.005, 1.005, 1.20, 1.95);
    /* the fuel tank and steps under the left door, the battery box (K1) */
    box(B.paint, 1.10, 0.20, 0.92, 1.18, 0.70, 1.12);
    box(B.dark, 1.85, 1.35, 1.00, 1.20, 0.62, 0.66);
    /* the cargo body: floor, sides, front board, tailgate, the stake racks (K1, K3) */
    box(B.paint, 1.05, KF.XT, -1.22, 1.22, KF.ZF - 0.12, KF.ZF);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 1.05, KF.XT, s > 0 ? 1.16 : -1.22, s > 0 ? 1.22 : -1.16, KF.ZF, 1.98);
      box(B.dark, 1.05, KF.XT, s > 0 ? 1.22 : -1.235, s > 0 ? 1.235 : -1.22, 1.62, 1.66);
      for (i = 0; i < 6; i++) {
        x = 0.95 - i * (0.95 - KF.XT - 0.10) / 5;
        box(B.paint, x, x - 0.08, s > 0 ? 1.15 : -1.23, s > 0 ? 1.23 : -1.15, KF.ZF, 2.52);
      }
      box(B.paint, 1.05, KF.XT, s > 0 ? 1.15 : -1.23, s > 0 ? 1.23 : -1.15, 2.30, 2.36);
      box(B.paint, 1.05, KF.XT, s > 0 ? 1.15 : -1.23, s > 0 ? 1.23 : -1.15, 2.46, 2.52);
      box(B.dark, KF.XT - 0.01, KF.XT - 0.05, s * 0.95 - 0.10, s * 0.95 + 0.10, 0.85, 1.05);   /* rear lamps, hooks */
    }
    box(B.paint, 1.05, 0.98, -1.22, 1.22, KF.ZF, 2.20);
    box(B.paint, KF.XT + 0.07, KF.XT, -1.22, 1.22, KF.ZF, 1.98);
    /* the spare wheel upright behind the cab (K1) */
    var SP = new Bin(T.rub, false);
    cylY(SP, 0.62, -0.40, -0.12, 2.00, KF.R, 20);
    cylY(B.dark, 0.62, -0.42, -0.10, 2.00, 0.28, 12);
    /* mudguards over the tandem */
    for (s = -1; s <= 1; s += 2) box(B.dark, -0.55, -3.30, s > 0 ? 0.55 : -1.15, s > 0 ? 1.15 : -0.55, KF.ZF - 0.16, KF.ZF - 0.12);
    box(B.team, 2.05, 1.40, -0.08, 0.08, 2.54, 2.55);
    var hg = group(THREE, "hull"); flush(THREE, hg, B); flush(THREE, hg, { sp: SP }); g.add(hg);
    var wl = [[KF.XF, KF.R, function (W) { tyrePair(W, PAINTS[paint].base, 0.94, KF.R, KF.TW, false); }]];
    KF.XA.forEach(function (x) { wl.push([x, KF.R, function (W) { tyrePair(W, PAINTS[paint].base, 0.86, KF.R, KF.TW, true); }]); });
    wheelGroups(THREE, g, T, wl);
    /* launcher: turntable on the bed ("turret"), the 45-tube pack hinged at its rear ("podelev") */
    var tg = group(THREE, "turret", KF.TX, 0, KF.ZF), TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    cylZ(TB.dark, 0, 0, 0, 0.12, 0.75, 22);
    box(TB.paint, 0.55, -1.35, -0.55, 0.55, 0.12, 0.42);
    for (s = -1; s <= 1; s += 2) {
      box(TB.paint, -0.95, -1.40, s * 0.50 - 0.08, s * 0.50 + 0.08, 0.42, KF.TRZ - KF.ZF + 0.08);
      cyl(TB.dark, [0.45, s * 0.35, 0.35], [-0.20, s * 0.35, 0.62], 0.06, 0.06, 8);
    }
    cylY(TB.dark, -0.10, 0.55, 0.62, 0.40, 0.12, 12);                       /* handwheels (K2) */
    flush(THREE, tg, TB);
    var pe = group(THREE, "podelev", KF.TRX - KF.TX, 0, KF.TRZ - KF.ZF), PB = podBins(T), cells = [];
    tubeNest(PB, -0.20, 3.00, 0.40, 5, 9, 0.145, 0.060, 0, cells, { bands: [0.15, 1.40, 2.70] });
    box(PB.frame, -0.20, 2.60, -0.67, 0.67, 0.0, 0.03);
    box(PB.frame, 0.05, 0.75, -0.72, 0.72, 0.06, 0.78);
    box(PB.team, 0.90, 1.60, -0.08, 0.08, 0.81, 0.82);
    tilt(PB, cells, KF.STOW);
    flush(THREE, pe, PB);
    pe.userData.el = KF.EL; pe.userData.cells = cells;
    tg.add(pe); g.add(tg);
    return shadows(g);
  }

  /* ========================================= M730A1 Chaparral (roc_e80_spaag) [C1-C4, D1 of us_m548_family.js] */
  var CH = { XN: 2.877, XT: -2.877, XW: [1.449, 0.744, 0.039, -0.666, -1.371], RW: 0.29, ZW: 0.35,
             SPR: [2.133, 0.55, 0.23], IDL: [-2.05, 0.45, 0.25], TY: 1.08, TW: 0.19, HW: 1.27, FW: 1.345, ZD: 1.06,
             TX: -1.35, ZT: 1.40, EL: 0.45 };
  function chaparral(THREE, M, C) {
    var T = materials(THREE, C, "od"), g = group(THREE, "roc_e80_spaag"), B = bins(T), s, i, k;
    T.round = new THREE.MeshStandardMaterial({ color: 0xd8d8d2, roughness: 0.5, metalness: 0.1 });
    T.frame = paintMat(THREE, "rocg");
    /* the M548 hull: belly 0.41, the nose sloping from 1.10 at the bow to 0.50, the sides and the
       fender ledge over the track (D1) */
    prismY(B.paint, [[CH.XT, 0.50], [CH.XT + 0.15, 0.41], [2.25, 0.41], [CH.XN, 1.10], [CH.XN, CH.ZD], [CH.XT, CH.ZD]], -CH.HW, CH.HW);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, CH.XN - 0.05, CH.XT, s > 0 ? CH.HW : -CH.FW, s > 0 ? CH.FW : -CH.HW, 0.86, 0.90);
      box(B.dark, CH.XN - 0.05, CH.XT, s > 0 ? CH.FW - 0.01 : -CH.FW - 0.005, s > 0 ? CH.FW + 0.005 : -CH.FW + 0.01, 0.84, 0.92);
    }
    /* the low M730 cab (C2, C3): an armoured box over the driver and the engine, its roof at the
       hull's top line, the windscreen frame, and the bows for the canvas top */
    loftN(B.paint, [[[0.95, -1.27, CH.ZD], [0.95, 1.27, CH.ZD], [0.95, 1.27, 1.62], [0.95, -1.27, 1.62]],
                    [[2.35, -1.27, CH.ZD], [2.35, 1.27, CH.ZD], [2.10, 1.24, 1.62], [2.10, -1.24, 1.62]],
                    [[CH.XN, -1.27, 1.10], [CH.XN, 1.27, 1.10], [2.35, 1.27, 1.30], [2.35, -1.27, 1.30]]]);
    box(B.dark, 2.10, 1.90, -1.10, 1.10, 1.62, 1.66);
    box(B.glass, 2.02, 1.98, -1.05, -0.05, 1.66, 1.98);
    box(B.glass, 2.02, 1.98, 0.05, 1.05, 1.66, 1.98);
    box(B.dark, 2.05, 1.95, -1.12, 1.12, 1.98, 2.02);
    for (i = 0; i < 2; i++) {
      var bx = 1.72 - i * 0.70, n = 9, a0, a1;
      for (k = 0; k < n; k++) {
        a0 = k / n * Math.PI; a1 = (k + 1) / n * Math.PI;
        cyl(B.dark, [bx, Math.cos(a0) * 1.18, 1.62 + Math.sin(a0) * 0.62], [bx, Math.cos(a1) * 1.18, 1.62 + Math.sin(a1) * 0.62], 0.025, 0.025, 6, true);
      }
    }
    cylX(B.dark, 1.02, 1.72, 0, 2.24, 0.022, 0.022, 6);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, CH.XN - 0.10, CH.XN + 0.02, s * 1.00, 1.18, 0.09, 0.09, 12);              /* lamp housings */
      cylX(B.glass, CH.XN + 0.02, CH.XN + 0.03, s * 1.00, 1.18, 0.07, 0.07, 12);
      box(B.dark, CH.XN + 0.04, CH.XN - 0.04, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.70, 0.82);   /* tow eyes */
    }
    /* the rear deck: the launcher's well, side lockers, tailgate up (C1, C2) */
    box(B.paint, 0.95, CH.XT, -1.27, 1.27, CH.ZD, 1.30);
    for (s = -1; s <= 1; s += 2) box(B.paint, 0.80, -0.25, s > 0 ? 0.85 : -1.27, s > 0 ? 1.27 : -0.85, 1.30, 1.55);
    box(B.paint, CH.XT + 0.06, CH.XT - 0.02, -1.20, 1.20, 0.60, 1.48);
    box(B.dark, CH.XT - 0.02, CH.XT - 0.05, -1.10, 1.10, 1.40, 1.45);
    box(B.team, 0.70, -0.10, 1.05, 1.15, 1.55, 1.56);
    box(B.team, 0.70, -0.10, -1.15, -1.05, 1.55, 1.56);
    track(B.dark, CH.XW.map(function (x) { return [x, CH.ZW, CH.RW + 0.035]; }).concat([[CH.SPR[0], CH.SPR[1], CH.SPR[2] + 0.035], [CH.IDL[0], CH.IDL[1], CH.IDL[2] + 0.035]]), CH.TY, CH.TW, 0.155);
    sprocket(B.dark, CH.SPR[0], CH.SPR[1], CH.SPR[2], CH.TY, 10);
    for (s = -1; s <= 1; s += 2) cylY(B.paint, CH.IDL[0], s * CH.TY - 0.14, s * CH.TY + 0.14, CH.IDL[1], CH.IDL[2], 18);
    var hg = group(THREE, "hull"); flush(THREE, hg, B); g.add(hg);
    wheelGroups(THREE, g, T, CH.XW.map(function (x) { return [x, CH.ZW, function (W) { wheelPair(W, PAINTS.od.base, CH.TY, CH.RW, 0.25, false); }]; }));
    /* the M54 launch station: turntable, the gunner's cab with its front window, the two arms
       with two rails each (C1-C4) */
    var tg = group(THREE, "turret", CH.TX, 0, CH.ZT), TB = { paint: new Bin(T.frame, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
    cylZ(TB.dark, 0, 0, 0, 0.10, 0.80, 22);
    box(TB.paint, 0.60, -0.70, -0.50, 0.50, 0.10, 1.05);
    loftN(TB.paint, [[[0.60, -0.50, 1.05], [0.60, 0.50, 1.05], [0.35, 0.45, 1.30], [0.35, -0.45, 1.30]],
                     [[-0.70, -0.50, 1.05], [-0.70, 0.50, 1.05], [-0.70, 0.45, 1.30], [-0.70, -0.45, 1.30]]]);
    box(TB.glass, 0.61, 0.58, -0.32, 0.32, 0.70, 0.98);
    for (s = -1; s <= 1; s += 2) cylY(TB.dark, -0.10, s * 0.50, s * 0.62, 0.80, 0.16, 14);
    flush(THREE, tg, TB);
    var pe = group(THREE, "podelev", -0.10, 0, 0.80), PB = { round: new Bin(T.round, false), dark: new Bin(T.dark, false), paint: new Bin(T.frame, true) }, cells = [];
    for (s = -1; s <= 1; s += 2) {
      box(PB.paint, 0.35, -0.35, s > 0 ? 0.62 : -0.80, s > 0 ? 0.80 : -0.62, -0.42, 0.42);       /* arm */
      for (k = -1; k <= 1; k += 2) {
        var y = s * 0.95, z = k * 0.30;
        box(PB.dark, 1.10, -1.30, y - 0.04, y + 0.04, z - 0.10, z - 0.07);                     /* rail */
        box(PB.paint, 0.20, -0.20, s > 0 ? 0.78 : -0.95, s > 0 ? 0.95 : -0.78, z - 0.06, z + 0.02);
        /* MIM-72: 2.91 m, 0.127 m, the nose cone, canards and tail fins in an X */
        cylX(PB.round, -1.35, 1.25, y, z, 0.064, 0.064, 12);
        cyl(PB.round, [1.25, y, z], [1.56, y, z], 0.064, 0.012, 12);
        for (i = 0; i < 4; i++) {
          var a = (i + 0.5) * Math.PI / 2, cy = Math.cos(a), cz = Math.sin(a);
          slab(PB.round, [-1.20, y + cy * 0.16, z + cz * 0.16], [1, 0, 0], [0, cy, cz], [0, -cz, cy], 0.14, 0.10, 0.006);
          slab(PB.round, [0.95, y + cy * 0.10, z + cz * 0.10], [1, 0, 0], [0, cy, cz], [0, -cz, cy], 0.06, 0.04, 0.005);
        }
        cells.push([1.56, y, z, -1.35]);
      }
    }
    flush(THREE, pe, PB);
    pe.userData.el = CH.EL; pe.userData.cells = cells;
    tg.add(pe); g.add(tg);
    return shadows(g);
  }

  /* ================================================= M16 MGMC (roc_e50_spaag) [H1-H3] */
  var HT = { XF: 1.74, RF: 0.50, XN: 3.26, XR: -3.26, SPR: [-0.92, 0.57, 0.33], IDL: [-2.66, 0.59, 0.30],
             BW: [-2.34, -1.97, -1.61, -1.28], RB: 0.20, ZB: 0.25, TY: 0.83, TW: 0.15, HW: 1.07, ZF: 1.05, TX: -2.06 };
  function m16(THREE, M, C) {
    var T = materials(THREE, C, "od"), g = group(THREE, "roc_e50_spaag"), B = bins(T), s, i, x;
    /* chassis rails, the front unditching roller and bumper (H1) */
    box2(B.dark, 2.95, HT.XR + 0.10, 0.38, 0.50, 0.75, 0.95);
    cylY(B.dark, 3.08, -0.80, 0.80, 1.12, 0.17, 16);
    box(B.dark, 3.26, 2.90, -1.00, 1.00, 0.95, 1.02);
    for (s = -1; s <= 1; s += 2) box(B.dark, 3.26, 2.85, s * 0.92 - 0.06, s * 0.92 + 0.06, 0.95, 1.30);
    /* the armoured hood: radiator louvres at the front, sloping sides (H1) */
    loftN(B.paint, [[[2.42, -0.48, 0.95], [2.42, 0.48, 0.95], [2.42, 0.42, 1.52], [2.42, -0.42, 1.52]],
                    [[0.85, -0.55, 0.95], [0.85, 0.55, 0.95], [0.85, 0.48, 1.62], [0.85, -0.48, 1.62]]]);
    for (i = 0; i < 6; i++) box(B.dark, 2.43, 2.41, -0.40, 0.40, 1.02 + i * 0.08, 1.06 + i * 0.08);
    for (s = -1; s <= 1; s += 2) {
      /* the curved front fender, the headlamp on its top (H1) */
      var F = [];
      for (i = 0; i <= 6; i++) { var a = Math.PI * (0.10 + 0.80 * i / 6); F.push([HT.XF + Math.cos(a) * 0.72, 0.58 + Math.sin(a) * 0.72]); }
      for (i = 0; i < 6; i++) belt(B.paint, F[i][0], F[i][1], F[i + 1][0], F[i + 1][1], s > 0 ? 0.55 : -1.07, s > 0 ? 1.07 : -0.55, 0.04);
      box(B.paint, 1.10, 0.85, s > 0 ? 0.55 : -1.07, s > 0 ? 1.07 : -0.55, 0.95, 1.30);
      cylX(B.paint, 2.15, 2.35, s * 0.72, 1.40, 0.09, 0.09, 12);
      cylX(B.glass, 2.35, 2.36, s * 0.72, 1.40, 0.07, 0.07, 12);
    }
    /* cab: the armoured windscreen plate with its vision slits, the door cut-outs (H1) */
    box(B.paint, 0.85, 0.80, -HT.HW, HT.HW, 1.25, 2.23);
    for (s = -1; s <= 1; s += 2) box(B.dark, 0.86, 0.85, s > 0 ? 0.15 : -0.85, s > 0 ? 0.85 : -0.15, 1.95, 2.02);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 0.80, 0.20, s > 0 ? HT.HW - 0.01 : -HT.HW, s > 0 ? HT.HW : -HT.HW + 0.01, 0.95, 1.55);
      /* the fighting compartment's sides, the hinged upper panels raised (H1) */
      box(B.paint, 0.20, HT.XR, s > 0 ? HT.HW - 0.01 : -HT.HW, s > 0 ? HT.HW : -HT.HW + 0.01, 0.95, 1.62);
      box(B.paint, 0.20, HT.XR, s > 0 ? HT.HW - 0.02 : -HT.HW, s > 0 ? HT.HW : -HT.HW + 0.02, 1.62, 2.00);
      box(B.dark, 0.20, HT.XR, s > 0 ? HT.HW : -HT.HW - 0.01, s > 0 ? HT.HW + 0.01 : -HT.HW, 1.60, 1.63);
      box(B.dark, -0.30, -0.36, s > 0 ? HT.HW : -HT.HW - 0.01, s > 0 ? HT.HW + 0.01 : -HT.HW, 0.95, 2.00);
      /* the track's mudguard ledge */
      box(B.paint, -0.55, HT.XR + 0.05, s > 0 ? 0.68 : -HT.HW, s > 0 ? HT.HW : -0.68, 0.93, 0.97);
    }
    box(B.paint, HT.XR + 0.04, HT.XR, -HT.HW, HT.HW, 0.95, 2.00);
    box(B.dark, HT.XR - 0.01, HT.XR - 0.02, -0.40, 0.40, 1.05, 1.80);
    box(B.paint, 0.80, HT.XR, -HT.HW, HT.HW, 0.92, HT.ZF);        /* floor */
    box(B.team, -0.40, -1.20, HT.HW - 0.02, HT.HW + 0.005, 1.92, 1.98);
    box(B.team, -0.40, -1.20, -HT.HW - 0.005, -HT.HW + 0.02, 1.92, 1.98);
    /* the track unit: front sprocket, rear idler, four bogie wheels in two bogies (H1) */
    track(B.dark, HT.BW.map(function (x) { return [x, HT.ZB, HT.RB + 0.03]; }).concat([[HT.SPR[0], HT.SPR[1], HT.SPR[2] + 0.03], [HT.IDL[0], HT.IDL[1], HT.IDL[2] + 0.03]]), HT.TY, HT.TW, 0.15);
    sprocket(B.dark, HT.SPR[0], HT.SPR[1], HT.SPR[2], HT.TY, 9);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.paint, HT.IDL[0], s * HT.TY - 0.10, s * HT.TY + 0.10, HT.IDL[1], HT.IDL[2], 16);
      box(B.dark, -1.55, -2.10, s * HT.TY - 0.08, s * HT.TY + 0.08, 0.30, 0.62);             /* bogie frame */
    }
    var hg = group(THREE, "hull"); flush(THREE, hg, B); g.add(hg);
    var wl = [[HT.XF, HT.RF, function (W) { tyrePair(W, PAINTS.od.base, 0.80, HT.RF, 0.24, false); }]];
    HT.BW.forEach(function (x) { wl.push([x, HT.ZB, function (W) { wheelPair(W, PAINTS.od.base, HT.TY, HT.RB, 0.20, false); }]); });
    wheelGroups(THREE, g, T, wl);
    /* the M45 Maxson mount: pedestal, the gunner's armour, two .50s a side one over the other,
       the tall ammunition chests outboard of them (H1, H2) */
    var tg = group(THREE, "turret", HT.TX, 0, HT.ZF), TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    cylZ(TB.dark, 0, 0, 0, 0.75, 0.30, 16);
    cylZ(TB.paint, 0, 0, 0.75, 0.95, 0.55, 20);
    loftN(TB.paint, [[[0.30, -0.40, 0.95], [0.30, 0.40, 0.95], [0.40, 0.40, 1.80], [0.40, -0.40, 1.80]],
                     [[0.35, -0.40, 0.95], [0.35, 0.40, 0.95], [0.45, 0.40, 1.80], [0.45, -0.40, 1.80]]]);
    box(TB.dark, -0.40, 0.10, -0.25, 0.25, 0.95, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(TB.paint, 0.35, -0.35, s > 0 ? 0.48 : -0.78, s > 0 ? 0.78 : -0.48, 1.15, 1.95);   /* ammunition chests */
      box(TB.dark, 0.36, -0.36, s > 0 ? 0.62 : -0.64, s > 0 ? 0.64 : -0.62, 1.15, 1.95);
      for (i = 0; i < 2; i++) {
        var gz = 1.40 + i * 0.25, gy = s * 0.40;
        box(TB.dark, 0.35, -0.55, gy - 0.06, gy + 0.06, gz - 0.07, gz + 0.07);
        cylX(TB.dark, 0.35, 1.05, gy, gz, 0.04, 0.04, 8);
        cylX(TB.dark, 1.05, 1.50, gy, gz, 0.022, 0.022, 6);
      }
    }
    flush(THREE, tg, TB);
    g.add(tg);
    return shadows(g);
  }

  /* ================================================= M7B1 Priest (roc_e50_spg) [P1-P3] */
  var PR = { XN: 3.01, XR: -3.01, BOG: [1.15, -0.30, -1.75], DW: 0.29, RW: 0.254, ZW: 0.30, SPR: [2.42, 0.90, 0.33],
             IDL: [-2.72, 0.55, 0.26], TY: 1.10, TW: 0.21, HW: 1.31, ZD: 1.60, TX: 0.75, TZ: 1.55 };
  function priest(THREE, M, C) {
    var T = materials(THREE, C, "od"), g = group(THREE, "roc_e50_spg"), B = bins(T), s, i, k, a;
    /* the Sherman lower hull and the rounded final-drive housing at the nose (P1, P3) */
    prismY(B.paint, [[PR.XR, 0.62], [PR.XR + 0.10, 0.48], [2.30, 0.48], [2.95, 0.70], [PR.XN, 1.00], [2.70, 1.30], [PR.XR, 1.30]], -1.03, 1.03);
    var NZ = [];
    for (i = 0; i <= 6; i++) { a = -Math.PI / 2 + Math.PI * 0.62 * i / 6; NZ.push([2.55 + Math.cos(a) * 0.48, 0.98 + Math.sin(a) * 0.48]); }
    NZ.push([2.30, 1.40]); NZ.push([2.30, 0.50]);
    prismY(B.paint, NZ, -1.05, 1.05);
    for (k = 0; k < 3; k++) box(B.dark, 2.50 + k * 0.17, 2.52 + k * 0.17, -1.06, 1.06, 0.62 + k * 0.10, 0.66 + k * 0.10);
    /* the superstructure: sponsons over the tracks, the upper front plate rising to the open
       fighting compartment, the high sides, the engine deck behind (P1-P3) */
    box(B.paint, 2.30, PR.XR, -PR.HW, PR.HW, 1.10, 1.30);
    loftN(B.paint, [[[2.30, -PR.HW, 1.30], [2.30, PR.HW, 1.30], [1.30, PR.HW, 2.05], [1.30, -PR.HW, 2.05]],
                    [[1.25, -PR.HW, 1.30], [1.25, PR.HW, 1.30], [1.25, PR.HW, 2.05], [1.25, -PR.HW, 2.05]]]);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 1.30, -0.95, s > 0 ? PR.HW - 0.05 : -PR.HW, s > 0 ? PR.HW : -PR.HW + 0.05, 1.30, 2.20);
      box(B.dark, 1.30, -0.95, s > 0 ? PR.HW : -PR.HW - 0.008, s > 0 ? PR.HW + 0.008 : -PR.HW, 1.80, 1.83);
      /* the folding ammunition boxes on the sides (P1) */
      box(B.paint, 0.60, 0.05, s > 0 ? PR.HW : -PR.HW - 0.12, s > 0 ? PR.HW + 0.12 : -PR.HW, 1.70, 2.00);
      box(B.paint, -0.15, -0.70, s > 0 ? PR.HW : -PR.HW - 0.12, s > 0 ? PR.HW + 0.12 : -PR.HW, 1.70, 2.00);
      /* sandshields along the track */
      box(B.paint, 2.20, -2.75, s > 0 ? PR.HW : -1.43, s > 0 ? 1.43 : -PR.HW, 1.08, 1.13);
      box(B.paint, 2.20, -2.75, s > 0 ? 1.41 : -1.43, s > 0 ? 1.43 : -1.41, 0.85, 1.10);
    }
    box(B.paint, -0.95, -1.05, -PR.HW, PR.HW, 1.30, 2.20);
    box(B.paint, -1.05, PR.XR, -PR.HW, PR.HW, 1.30, PR.ZD);                                  /* engine deck */
    box(B.dark, -1.40, -2.60, -0.70, 0.70, PR.ZD, PR.ZD + 0.02);
    box(B.paint, -1.15, -1.95, -1.15, -0.55, PR.ZD, PR.ZD + 0.30);                            /* stowage bin */
    box(B.paint, 1.25, -0.95, -PR.HW, PR.HW, 1.30, 1.36);                                    /* floor */
    /* the pulpit: the round AA ring right front with the .50 (P1, P2) */
    cylZ(B.paint, 1.05, -0.78, 1.30, 2.38, 0.42, 20);
    cylZ(B.dark, 1.05, -0.78, 2.38, 2.42, 0.44, 20);
    cylZ(B.dark, 1.05, -0.78, 2.42, 2.62, 0.03, 6);
    box(B.dark, 1.30, 0.85, -0.83, -0.73, 2.58, 2.70);
    cylX(B.dark, 1.30, 2.30, -0.78, 2.66, 0.03, 0.03, 8);
    box(B.team, -1.30, -2.70, 0.95, 1.10, PR.ZD, PR.ZD + 0.01);
    box(B.team, -1.30, -2.70, -1.10, -0.95, PR.ZD, PR.ZD + 0.01);
    /* VVSS running gear: three bogies a side, two wheels each, a return roller over each (P2) */
    var CIR = [[PR.SPR[0], PR.SPR[1], PR.SPR[2] + 0.04], [PR.IDL[0], PR.IDL[1], PR.IDL[2] + 0.04]];
    PR.BOG.forEach(function (b) { CIR.push([b + PR.DW, PR.ZW, PR.RW + 0.04], [b - PR.DW, PR.ZW, PR.RW + 0.04], [b - 0.10, 0.88, 0.08]); });
    track(B.dark, CIR, PR.TY, PR.TW, 0.16);
    sprocket(B.dark, PR.SPR[0], PR.SPR[1], PR.SPR[2], PR.TY, 13);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.paint, PR.IDL[0], s * PR.TY - 0.12, s * PR.TY + 0.12, PR.IDL[1], PR.IDL[2], 16);
      PR.BOG.forEach(function (b) {
        box(B.paint, b + 0.12, b - 0.12, s * PR.TY - 0.12, s * PR.TY + 0.12, 0.30, 0.78);       /* the volute bogie */
        cylY(B.dark, b - 0.10, s * PR.TY - 0.09, s * PR.TY + 0.09, 0.88, 0.07, 10);
        box(B.paint, b + 0.20, b - 0.28, s * PR.TY - 0.10, s * PR.TY + 0.10, 0.78, 0.84);
      });
    }
    var hg = group(THREE, "hull"); flush(THREE, hg, B); g.add(hg);
    var wl = [];
    PR.BOG.forEach(function (b) { wl.push([b + PR.DW, PR.ZW, null], [b - PR.DW, PR.ZW, null]); });
    wl.forEach(function (w) { w[2] = function (W) { wheelPair(W, PAINTS.od.base, PR.TY, PR.RW, 0.17, true); }; });
    wheelGroups(THREE, g, T, wl);
    /* the M2A1 105 mm on its carriage, offset right, its mantlet in the front plate; the M7's
       limited traverse is drawn as a "turret" pivoting on the carriage (P1, P3) */
    var tg = group(THREE, "turret", PR.TX, -0.10, PR.TZ), TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    box(TB.paint, 0.40, -0.70, -0.40, 0.40, 0.0, 0.35);
    box(TB.paint, 0.70, 0.45, -0.30, 0.30, 0.20, 0.75);
    cylX(TB.paint, -0.70, 0.80, 0, 0.55, 0.15, 0.15, 14);                                    /* recoil cylinders */
    cylX(TB.paint, -0.50, 0.85, 0, 0.32, 0.08, 0.08, 10);
    cylX(TB.dark, 0.80, 2.25, 0, 0.55, 0.075, 0.068, 14);                                    /* the tube, L/22 */
    cylX(TB.dark, -0.95, -0.70, 0, 0.55, 0.16, 0.16, 12);                                    /* breech */
    flush(THREE, tg, TB);
    g.add(tg);
    return shadows(g);
  }

  /* ================================================= M110A2 (roc_e60_spg) [E1-E3] */
  var MH = { XN: 2.90, XR: -3.50, XW: [-2.85, -1.72, -0.62, 0.46, 1.52], RW: 0.47, ZW: 0.55, SPR: [2.48, 0.70, 0.30],
             TY: 1.28, TW: 0.26, HW: 1.30, ZD: 1.55, TX: -1.41, GZ: 0.90, BR: -2.60, MZ: 6.65 };
  function m110(THREE, M, C, paint) {
    var T = materials(THREE, C, paint), g = group(THREE, "roc_e60_spg"), B = bins(T), s, i, a;
    /* hull: the glacis, the flat deck, the sides over the track, the round vents on the side (E1) */
    prismY(B.paint, [[MH.XR, 0.62], [MH.XR + 0.20, 0.45], [2.30, 0.45], [MH.XN, 0.95], [MH.XN, 1.05], [2.20, MH.ZD], [MH.XR, MH.ZD]], -MH.HW, MH.HW);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 2.75, MH.XR, s > 0 ? MH.HW : -1.56, s > 0 ? 1.56 : -MH.HW, 1.02, 1.07);       /* fenders */
      box(B.dark, 2.75, MH.XR, s > 0 ? 1.55 : -1.565, s > 0 ? 1.565 : -1.55, 1.00, 1.08);
      for (i = 0; i < 9; i++) cylY(B.dark, -0.95 + i * 0.25, s * MH.HW, s * (MH.HW + 0.01), 1.36, 0.10, 12);
    }
    /* the driver's hood at the front left, the engine grilles behind it (E1-E3) */
    loftN(B.paint, [[[2.25, 0.20, MH.ZD - 0.05], [2.25, 1.20, MH.ZD - 0.05], [2.10, 1.15, 1.95], [2.10, 0.25, 1.95]],
                    [[1.40, 0.20, MH.ZD], [1.40, 1.20, MH.ZD], [1.40, 1.15, 1.95], [1.40, 0.25, 1.95]]]);
    box(B.glass, 2.17, 2.14, 0.35, 1.05, 1.78, 1.88);
    box(B.dark, 1.30, 0.20, -1.15, -0.10, MH.ZD, MH.ZD + 0.03);
    for (i = 0; i < 8; i++) box(B.paint, 1.25 - i * 0.13, 1.20 - i * 0.13, -1.10, -0.15, MH.ZD + 0.03, MH.ZD + 0.05);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, 2.70, 2.86, s * 1.05, 1.15, 0.09, 0.09, 12);
      cylX(B.glass, 2.86, 2.87, s * 1.05, 1.15, 0.07, 0.07, 12);
    }
    /* the rear: the crew's platforms, the stowage rack, the big recoil spade raised (E1) */
    box(B.paint, -2.70, MH.XR, -MH.HW, MH.HW, MH.ZD, MH.ZD + 0.05);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) cylZ(B.dark, -2.75 - i * 0.30, s * 1.20, MH.ZD, 2.05, 0.025, 6);
      cylX(B.dark, -2.70, -3.40, s * 1.20, 2.05, 0.025, 0.025, 6);
      /* the spade's arms from the hull's rear corners */
      cyl(B.dark, [MH.XR + 0.05, s * 1.00, 0.70], [-4.70, s * 0.95, 1.85], 0.07, 0.07, 10);
    }
    belt(B.paint, -4.55, 1.70, -5.45, 2.45, -1.20, 1.20, 0.10);
    belt(B.paint, -4.40, 1.62, -4.55, 1.70, -1.20, 1.20, 0.06);
    for (s = -1; s <= 1; s += 2) belt(B.paint, -4.50, 1.72, -5.40, 2.45, s * 1.18 - 0.03, s * 1.18 + 0.03, 0.40);
    box(B.team, 0.80, -0.40, 0.95, 1.20, MH.ZD, MH.ZD + 0.01);
    box(B.team, 0.80, -0.40, -1.20, -0.95, MH.ZD, MH.ZD + 0.01);
    /* running gear: five road wheels, the rear one an idler on the ground, front sprocket, no
       return rollers (E1) */
    var CIR = MH.XW.map(function (x) { return [x, MH.ZW, MH.RW + 0.05]; }).concat([[MH.SPR[0], MH.SPR[1], MH.SPR[2] + 0.05]]);
    track(B.dark, CIR, MH.TY, MH.TW, 0.17);
    sprocket(B.dark, MH.SPR[0], MH.SPR[1], MH.SPR[2], MH.TY, 11);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 5; i++) box(B.dark, MH.XW[i] + 0.10, MH.XW[i] + 0.55, s * 1.06 - 0.06, s * 1.06 + 0.06, 0.62, 0.72);
    var hg = group(THREE, "hull"); flush(THREE, hg, B); g.add(hg);
    wheelGroups(THREE, g, T, MH.XW.map(function (x) { return [x, MH.ZW, function (W) { wheelPair(W, PAINTS[paint].base, MH.TY, MH.RW, 0.22, true); }]; }));
    /* the mount: carriage on the deck, the cradle with the recoil and recuperator cylinders, the
       M201A1 tube and its double-baffle brake (E1-E3) */
    var tg = group(THREE, "turret", MH.TX, 0, MH.ZD), TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    cylZ(TB.dark, 0, 0, 0, 0.12, 0.85, 22);
    for (s = -1; s <= 1; s += 2) prismY(TB.paint, [[-0.80, 0.12], [0.70, 0.12], [0.30, MH.GZ + 0.25], [-0.40, MH.GZ + 0.25]], s * 0.32, s * 0.48);
    cylY(TB.dark, 0.0, -0.55, 0.55, MH.GZ, 0.14, 12);
    cylX(TB.paint, MH.BR, 0.95, 0, MH.GZ, 0.30, 0.30, 18);                                   /* cradle and sleigh */
    cylX(TB.paint, MH.BR + 0.20, 0.70, 0.22, MH.GZ - 0.22, 0.10, 0.10, 10);
    cylX(TB.paint, MH.BR + 0.20, 0.70, -0.22, MH.GZ - 0.22, 0.10, 0.10, 10);
    cylX(TB.dark, MH.BR - 0.35, MH.BR, 0, MH.GZ, 0.26, 0.26, 14);                             /* breech ring */
    cyl(TB.paint, [0.95, 0, MH.GZ], [MH.MZ - 0.62, 0, MH.GZ], 0.185, 0.155, 18);
    cylX(TB.paint, MH.MZ - 0.62, MH.MZ - 0.50, 0, MH.GZ, 0.20, 0.20, 16);
    for (i = 0; i < 3; i++) cylX(TB.paint, MH.MZ - 0.50 + i * 0.22, MH.MZ - 0.42 + i * 0.22, 0, MH.GZ, 0.24, 0.24, 16);
    cylX(TB.dark, MH.MZ - 0.42, MH.MZ, 0, MH.GZ, 0.13, 0.13, 12);
    /* the two arms of the elevating gear (the tall struts of E1) and the loader's rammer */
    for (s = -1; s <= 1; s += 2) cyl(TB.dark, [0.55, s * 0.40, 0.20], [-0.30, s * 0.30, MH.GZ + 0.55], 0.06, 0.06, 8);
    flush(THREE, tg, TB);
    g.add(tg);
    return shadows(g);
  }

  /* ========================================== Kung Feng IV on the M113 (roc_e60_mlrs) [F1-F3] */
  /* The M113A1 of js/hero/us_m113.js, its own olive drab, through a variant of this file's own
     ("kf4": no row-specific fittings - its builder draws the plain hull and a turret group at
     the M163's ring station (X -0.50 on the roof), whose meshes are replaced here by the
     launcher: a pedestal and the two 20-round blocks of the trailer launcher [F1][F2]. */
  function kf4(THREE, M, C) {
    if (!HeroM113.variants.kf4_roc) HeroM113.variants.kf4_roc = { kind: "kf4", paint: HeroM113.variants.ACAV.paint, vane80: false };
    var g = HeroM113.build(THREE, M, C, "kf4_roc"), tg = null, i, s, P = null, D = null;
    g.traverse(function (o) { if (!tg && o.name === "turret") tg = o; });
    if (!tg) return g;
    for (i = tg.children.length - 1; i >= 0; i--) {
      var m = tg.children[i];
      if (m.isMesh) { if (m.material.map && !P) P = m.material; else if (!m.material.map && m.material.color && m.material.color.r < 0.2 && !D) D = m.material; tg.remove(m); }
    }
    var T = { paint: P || paintMat(THREE, "od"), dark: D || new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 }),
              team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 }) };
    T.tube = T.paint;
    var TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    cylZ(TB.dark, 0, 0, 0, 0.10, 0.45, 18);
    box(TB.paint, 0.30, -0.30, -0.25, 0.25, 0.10, 0.30);
    for (s = -1; s <= 1; s += 2) box(TB.paint, 0.15, -0.15, s * 0.20 - 0.04, s * 0.20 + 0.04, 0.30, 0.45);
    flush(THREE, tg, TB);
    var pe = group(THREE, "podelev", 0, 0, 0.45), PB = podBins(T), cells = [];
    /* two blocks of 5 x 4 tubes either side of the centre plate with its handwheel (F1, F2) */
    for (s = -1; s <= 1; s += 2) tubeNest(PB, -0.50, 0.55, 0.40, 5, 4, 0.15, 0.066, s * 0.36, cells, { bands: [-0.30, 0.35] });
    box(PB.frame, -0.40, 0.45, -0.05, 0.05, 0.0, 0.80);
    cylY(PB.dark, 0.0, 0.05, 0.08, 0.45, 0.10, 10);
    box(PB.frame, -0.40, 0.40, -0.70, 0.70, -0.03, 0.02);
    box(PB.team, -0.30, 0.30, -0.04, 0.04, 0.80, 0.81);
    flush(THREE, pe, PB);
    pe.userData.el = 0.60; pe.userData.cells = cells;
    tg.add(pe);
    return g;
  }

  /* ============================================ Hsiung Feng II mobile launcher (roc_e00_coastssm) [N1-N4] */
  var HF = { XB: 8.40, AXT: [7.30, 4.20, 2.85], RT: 0.54, AXL: [-6.30, -7.30, -8.30], RL: 0.50, XT: -8.70,
             HX: -8.45, HZ: 1.95, CL: 5.90, CW: 0.72, EL: 1.00 };
  function hf2(THREE, M, C) {
    var T = materials(THREE, C, "roc"), g = group(THREE, "roc_e00_coastssm"), B = bins(T), s, i, k, x;
    T.frame = paintMat(THREE, "rocg");
    T.plate = new THREE.MeshStandardMaterial({ color: 0xb4b19f, roughness: 0.7, metalness: 0.1 });
    B.frame = new Bin(T.frame, true);
    /* the 6x4 tractor: forward-control cab, frame, fifth wheel, the box behind the cab (N1) */
    box2(B.dark, 8.20, 2.30, 0.38, 0.50, 0.85, 1.20);
    box(B.dark, HF.XB, 8.18, -1.25, 1.25, 0.50, 0.95);
    loftN(B.paint, [[[6.20, -1.24, 1.00], [6.20, 1.24, 1.00], [6.20, 1.24, 3.25], [6.20, -1.24, 3.25]],
                    [[8.30, -1.24, 1.00], [8.30, 1.24, 1.00], [8.12, 1.20, 3.25], [8.12, -1.20, 3.25]]]);
    box(B.glass, 8.29, 8.20, -1.12, 1.12, 2.25, 3.00);
    box(B.dark, 8.31, 8.29, -0.85, 0.85, 1.10, 1.70);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, 8.10, 7.40, s > 0 ? 1.24 : -1.25, s > 0 ? 1.25 : -1.24, 2.20, 2.95);
      box(B.dark, 8.38, 8.30, s * 0.95 - 0.15, s * 0.95 + 0.15, 0.80, 0.92);
      box(B.dark, 8.45, 8.35, s * 1.40 - 0.05, s * 1.40 + 0.05, 2.45, 2.90);
      box(B.paint, 8.10, 6.70, s > 0 ? 1.05 : -1.28, s > 0 ? 1.28 : -1.05, 1.25, 1.30);
      box(B.paint, 5.00, 2.10, s > 0 ? 1.00 : -1.25, s > 0 ? 1.25 : -1.00, 1.18, 1.23);    /* rear mudguards */
      box(B.dark, 6.10, 4.90, s > 0 ? 0.90 : -1.20, s > 0 ? 1.20 : -0.90, 0.60, 1.10);    /* tanks */
    }
    box(B.paint, 6.15, 5.35, -1.15, 1.15, 1.20, 2.40);
    box(B.dark, 3.85, 3.15, -0.60, 0.60, 1.20, 1.38);
    box(B.team, 7.80, 6.60, -0.08, 0.08, 3.25, 3.26);
    /* the semitrailer: the raised front deck over the tractor with the two shelters and the rails,
       the main deck, the lockers under it, the tail (N1, N2) */
    box(B.frame, 4.60, 0.20, -1.25, 1.25, 1.45, 1.75);
    box(B.frame, 0.20, HF.XT, -1.25, 1.25, 1.15, 1.45);
    box2(B.frame, 0.20, HF.XT + 0.2, 0.35, 0.50, 0.75, 1.15);
    box(B.paint, 4.40, 1.90, -1.15, 1.15, 1.75, 3.45);
    box(B.paint, 1.80, 0.40, -1.10, 1.10, 1.75, 3.30);
    box(B.dark, 4.41, 4.40, -0.50, 0.50, 2.00, 3.10);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.60, 2.60, s > 0 ? 1.15 : -1.16, s > 0 ? 1.16 : -1.15, 2.00, 3.20);
      for (k = 0; k < 2; k++) cylX(B.dark, 1.85, 0.35, s * 1.22, 2.30 + k * 0.40, 0.02, 0.02, 6);
      for (i = 0; i < 6; i++) cylZ(B.dark, 1.85 - i * 0.30, s * 1.22, 1.75, 2.70, 0.02, 6);
      box(B.frame, -0.80, -5.30, s > 0 ? 0.70 : -1.22, s > 0 ? 1.22 : -0.70, 0.60, 1.15);   /* lockers */
      box(B.dark, -1.00, -1.04, s > 0 ? 1.22 : -1.225, s > 0 ? 1.225 : -1.22, 0.65, 1.10);
      box(B.dark, -3.00, -3.04, s > 0 ? 1.22 : -1.225, s > 0 ? 1.225 : -1.22, 0.65, 1.10);
      box(B.dark, 0.40, 0.00, s * 1.05 - 0.10, s * 1.05 + 0.10, 0.25, 1.15);             /* landing legs */
      box(B.dark, -5.70, -8.70, s > 0 ? 0.95 : -1.25, s > 0 ? 1.25 : -0.95, 1.10, 1.15);
      box(B.dark, HF.XT + 0.02, HF.XT - 0.02, s * 0.95 - 0.12, s * 0.95 + 0.12, 0.90, 1.08);
    }
    /* the mast at the trailer's front with the small dish, cut at its lowest section (N1) */
    cylZ(B.dark, 4.75, -0.95, 1.75, 4.40, 0.06, 8);
    cylZ(B.dark, 4.75, -0.95, 4.40, 4.60, 0.03, 6);
    cyl(B.dark, [4.75, -0.95, 4.62], [4.95, -0.95, 4.70], 0.22, 0.05, 12);
    box(B.team, 4.20, 2.10, -0.08, 0.08, 3.45, 3.46);
    var hg = group(THREE, "hull"); flush(THREE, hg, B); g.add(hg);
    var wl = [[HF.AXT[0], HF.RT, function (W) { tyrePair(W, PAINTS.roc.base, 1.02, HF.RT, 0.32, false); }]];
    [HF.AXT[1], HF.AXT[2]].forEach(function (x) { wl.push([x, HF.RT, function (W) { tyrePair(W, PAINTS.roc.base, 0.86, HF.RT, 0.30, true); }]); });
    HF.AXL.forEach(function (x) { wl.push([x, HF.RL, function (W) { tyrePair(W, PAINTS.roc.base, 1.00, HF.RL, 0.38, false); }]); });
    wheelGroups(THREE, g, T, wl);
    /* the erector: four box launchers, two columns of two, hinged at the trailer's tail, lying
       level forward in travel and raised to fire forward over the tractor (N1-N3) */
    var pe = group(THREE, "podelev", HF.HX, 0, HF.HZ), PB = { frame: new Bin(T.frame, true), plate: new Bin(T.plate, false), dark: new Bin(T.dark, false) }, cells = [];
    box(PB.dark, -0.10, HF.CL, -0.85, 0.85, -0.10, 0.02);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var y = s * (HF.CW / 2 + 0.02), z = 0.05 + HF.CW / 2 + k * (HF.CW + 0.02);
      box(PB.frame, -0.08, HF.CL - 0.02, y - HF.CW / 2, y + HF.CW / 2, z - HF.CW / 2, z + HF.CW / 2);
      for (i = 0; i < 5; i++) { x = 0.30 + i * 1.30; box(PB.dark, x, x + 0.06, y - HF.CW / 2 - 0.01, y + HF.CW / 2 + 0.01, z - HF.CW / 2 - 0.01, z + HF.CW / 2 + 0.01); }
      box(PB.plate, -0.10, -0.08, y - HF.CW / 2 + 0.02, y + HF.CW / 2 - 0.02, z - HF.CW / 2 + 0.02, z + HF.CW / 2 - 0.02);
      box(PB.plate, HF.CL - 0.02, HF.CL, y - HF.CW / 2 + 0.02, y + HF.CW / 2 - 0.02, z - HF.CW / 2 + 0.02, z + HF.CW / 2 - 0.02);
      cells.push([HF.CL, y, z, -0.10]);
    }
    cyl(PB.dark, [3.20, 0, -0.10], [3.60, 0, -0.65], 0.12, 0.12, 10);
    flush(THREE, pe, PB);
    pe.userData.el = HF.EL; pe.userData.cells = cells;
    g.add(pe);
    return shadows(g);
  }

  /* ======================================================== reused heroes, repainted */
  /* The paint of a build the reused module returns is swapped on that build's own materials:
     every material carrying the module's paint texture gets this file's ROC canvas for the
     same tile size instead (a fresh CanvasTexture per build).  The module's materials are made
     fresh for every build, so the US rows drawn by the same modules do not change; the
     modules' cached canvases are never touched. */
  function reskin(THREE, g, kind, tile, test) {
    var seen = [];
    g.traverse(function (o) {
      if (!o.isMesh) return;
      var m = o.material;
      if (!m || seen.indexOf(m) >= 0 || !m.map || (test && !test(m))) return;
      seen.push(m);
      var t = tex(THREE, kind, tile);
      if (t) { m.map = t; m.color.setRGB(1, 1, 1); } else { m.map = null; m.color.set(PAINTS[kind].base); }
      m.needsUpdate = true;
    });
    return g;
  }
  /* M109A1B / A2 / A5: HeroPaladin "e80" (the M109A2: 39-calibre M185, M178 mount, bustle rack)
     with the ROC paint (its paint bins map 0.30 per metre) */
  function m109(THREE, M, C, kind) { return reskin(THREE, HeroPaladin.build(THREE, M, C, "e80"), kind, 1 / 0.30); }
  /* the Avenger on the M1097: HeroHumvee "av" (its skin is mapped by world position, 4.6 m) */
  function avenger(THREE, M, C) {
    return reskin(THREE, HeroHumvee.make("av")(THREE, M, C), "roc", 4.6, function (m) { return m.userData && m.userData.worldUV; });
  }
  /* Patriot PAC-2 GEM+: HeroUsPatriot "pac2" (M983 + M860 + M901, four canisters), its skin
     mapped by world position at 8.0 m */
  function patriot(THREE, M, C) {
    var g = HeroUsPatriot.build(THREE, C, { gen: "pac2", paint: "camo" }), pe = null;
    g.traverse(function (o) { if (!pe && o.name === "podelev") pe = o; });
    /* [R1]: the canisters green with black patches, the trailer and tractor plain green - the
       canister stack gets its own copy of the skin */
    if (pe) {
      var cp = null;
      pe.traverse(function (o) {
        if (!o.isMesh || !o.material || !o.material.map || !(o.material.userData && o.material.userData.worldUV)) return;
        if (!cp) { cp = o.material.clone(); cp.userData = { worldUV: o.material.userData.worldUV }; var t = tex(THREE, "rocgb", cp.userData.worldUV); if (t) { cp.map = t; cp.color.setRGB(1, 1, 1); } else { cp.map = null; cp.color.set(PAINTS.rocgb.base); } }
        o.material = cp;
      });
    }
    return reskin(THREE, g, "rocg", 8.0, function (m) { return m.userData && m.userData.worldUV && (!pe || !isPod(pe, m)); });
  }
  function isPod(pe, m) { var r = false; pe.traverse(function (o) { if (o.isMesh && o.material === m) r = true; }); return r; }

  return { rt2000: rt2000, kf6: kf6, chaparral: chaparral, m16: m16, priest: priest, m110: m110, kf4: kf4, hf2: hf2,
           m109: m109, avenger: avenger, patriot: patriot };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of each build (tools/model3d/dump.js).  The reused rows are
   registered only when their module has loaded (see the load order in the header). */
UNIT_MODELS["roc_e50_spg"] = { len: 6.09, build: HeroRocArtillery.priest };
/* roc_e50_spaag is registered by roc_ground.js, whose M16 matches the published
   2.34 m height; this build (3.02 m) is kept but not registered. */
/* UNIT_MODELS["roc_e50_spaag"] = { len: 6.54, build: HeroRocArtillery.m16 }; */
UNIT_MODELS["roc_e60_spg"] = { len: 10.79, build: function (THREE, M, C) { return HeroRocArtillery.m110(THREE, M, C, "od"); } };
UNIT_MODELS["roc_e80_mlrs"] = { len: 7.69, build: function (THREE, M, C) { return HeroRocArtillery.kf6(THREE, M, C, "od"); } };
UNIT_MODELS["roc_e90_mlrs"] = { len: 7.69, build: function (THREE, M, C) { return HeroRocArtillery.kf6(THREE, M, C, "roc"); } };
UNIT_MODELS["roc_e00_mlrs"] = { len: 9.16, build: HeroRocArtillery.rt2000 };
UNIT_MODELS["roc_e80_spaag"] = { len: 5.84, build: HeroRocArtillery.chaparral };
UNIT_MODELS["roc_e00_coastssm"] = { len: 17.27, build: HeroRocArtillery.hf2 };
if (typeof HeroM113 !== "undefined" && HeroM113.variants) {
  /* roc_e60_mlrs (Kung Feng IV) is NOT registered: the only photos are of
     the trailer launcher, and none shows it on an M113, so the pairing
     would be invented; the row keeps its stand-in. */
  /* UNIT_MODELS["roc_e60_mlrs"] = { len: 4.92, build: HeroRocArtillery.kf4 }; */
}
if (typeof HeroPaladin !== "undefined") {
  UNIT_MODELS["roc_e80_spg"] = { len: 9.12, build: function (THREE, M, C) { return HeroRocArtillery.m109(THREE, M, C, "od"); } };
  UNIT_MODELS["roc_e90_spg"] = { len: 9.12, build: function (THREE, M, C) { return HeroRocArtillery.m109(THREE, M, C, "roc"); } };
  UNIT_MODELS["roc_e00_spg"] = { len: 9.12, build: function (THREE, M, C) { return HeroRocArtillery.m109(THREE, M, C, "roc"); } };
}
if (typeof HeroHumvee !== "undefined") UNIT_MODELS["roc_e90_spaag"] = { len: 4.99, build: HeroRocArtillery.avenger };
if (typeof HeroUsPatriot !== "undefined") UNIT_MODELS["roc_e00_sam"] = { len: 17.19, build: HeroRocArtillery.patriot };
