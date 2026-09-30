/* ===== derrick_pumping_well.js - HERO model: a producing oil well pad =====
   BUILDINGS.derrick, the "Oil Derrick" ("Pumps crude from a surveyed oil
   node"): every faction, every era, 2 x 2 tiles, standing on an oil node.

   What stands on a producing well is not a derrick. The old model drew a
   27 m lattice drilling derrick over one well AND a pumpjack and tanks on
   the same pad: a drilling rig and a producing well conflated. A drilling
   derrick is the rig's; it leaves with the rig when the well is completed.
   What the lease keeps, and what pumps the crude, is the beam pumping unit
   over the well, the flowline to a separator and a heater-treater, and a
   battery of stock tanks the oil is trucked from. That is what this draws.
   (Standing derricks were left over pumped wells in the oldest fields -
   Baku, Signal Hill, Romania - into the 1950s, but the def runs to 2025
   and the beam pump is right in every one of its eras: Lufkin built its
   first in 1925, and the conventional unit has not changed its shape.)

   Reference.
   The pumping unit is a conventional crank-balanced unit, C-320D-256-120:
   320,000 in-lb double-reduction reducer, 25,600 lb structure, 120 in
   stroke, one of Lufkin's standard sizes (Lufkin Industries, Oilfield
   Products Group pumping unit brochure, "Standard Unit Sizes"). Its API
   11E geometry and overall size, from the SLB "Conventional Pumping Units"
   catalog 2019 (the same API geometry, which is what makes the sizes
   interchangeable):
     A  centre bearing to horsehead (polished rod)  155.00 in  3.937 m
     C  centre bearing to equalizer bearing         111.06 in  2.821 m
     I  centre bearing to crankshaft, horizontal    111.02 in  2.820 m
     P  pitman, crank pin to equalizer              132.01 in  3.353 m
     H  centre bearing above the base               231.97 in  5.892 m
     G  crankshaft above the base                    95.98 in  2.438 m
     R  crank radius, longest stroke hole            42.01 in  1.067 m
     overall length x width x height, TH base  413 x 119 x 305 in
                                               10.49 x 3.02 x 7.75 m
     reducer sheave 44 in; reducer centre height 23.23 in.
   The unit is posed with the horsehead 4 degrees down, a third of the
   stroke above the bottom (the beam swings from 24.8 degrees up to 20.0
   down), and the cranks are SOLVED for that pose from A, C, I, P, H, G
   and R, so the pitmans are their real length and the bridle hangs plumb
   over the well, as it does at every angle on a real unit (the horsehead
   face is an arc of radius A about the centre bearing).
   The parts, from the Lufkin nomenclature drawing and these photographs
   on Wikimedia Commons:
     - "Oil Well Lake Arrowhead State Park Texas 2024": the Samson post
       with its ladder, the walking beam and horsehead, the equalizer and
       two pitmans, the counterweighted cranks, the prime mover behind the
       reducer, the wellhead and polished rod, a guard round the unit.
     - "Oil pumpjack in the Permian Basin": the base on its foundation,
       the reducer up on its sub-base, orange safety paint on the
       counterweight tips, the pump-off controller on its stand, the rail
       guard round the base.
     - "Pump Jack labelled": horsehead, bridle, carrier bar, polished rod,
       stuffing box, pumping tee, V-belt and prime mover.
   The tanks are API 12F welded production tanks, 400 bbl: 12 ft x 20 ft,
   3.66 x 6.10 m (API 12F table as published by Highland Tank), with the
   shallow cone roof 12F specifies (3/4 in 12). The battery, a vertical
   heater-treater (4 ft x 20 ft, 1.22 x 6.10 m, its firetube stack up the
   side: the vertical treater listings of Branabee and Oilfield Logic) and
   a two-phase separator, the walkway along the tank tops with its stair at
   the end, and the flare standing apart, are as in "Oil Tank Battery in a
   Corn Field Saline Township Michigan" and "Williston North Dakota Oil
   Field Tank Batteries".

   Corrected from the survey's leads: a C-320's walking beam is 6.8 m from
   equalizer to horsehead face (C + A), not 7-10 m; only the long-stroke
   units, 168 in and up with A = 210 in, reach 8.4 m. 3.7 x 6.1 m is the
   400 bbl tank, not "400-500" (a 500 bbl 12F tank is 12 ft x 25 ft or
   15 ft 6 in x 16 ft).

   Layout. Model space for a structure: +X east, +Y north, +Z up, real
   metres, the plot centred on the origin, 40 m square. render3d multiplies
   a structure by CFG.BLD_SCALE 1.10, so the pad is 35 m (38.5 m placed)
   and nothing reaches past it. The well is near the middle; the unit lies
   west of it; the battery is along the south side inside its berm; the
   separator and treater are east of the battery; the flare stands in the
   north-west corner, as far from the tanks as the pad allows, its line
   buried; the lease road comes in through a gate and cattle guard in the
   east fence, straight to the wellhead, where a workover rig has to reach,
   and the oil hauler's loop runs round the north side of the unit and back
   past the load line on the berm; the flowline is buried where that lane
   crosses it, as road crossings are. The default camera looks from the
   north-east, so the battery never hides the unit.

   The faction's and the period's kit. render3d's getBuildingModel() puts
   a faction fixture (archFixture: a radome and a mast, a brick stack and a
   banner board, or eave slabs) at the top of the model's bounding box, and
   a period one (eraFixture: a chimney, a lattice mast, a camouflage net, a
   dish or an array) on its highest broad part. On a building that is its
   roof. An oil well has no roof: on this pad both float over the gravel,
   in front of the pumping unit, and damage3d's roof fire burns on them.
   BUILDINGS.derrick is meant to carry bare:true, as the strategic arrays
   do, which turns off restyle(), archFixture() and eraFixture() and leaves
   eraRestyle()'s period tint on; that is a separate one-line edit to
   rules.js, the roadmap's file. Until it lands, nothing here stands higher
   than it has to, so the kit floats as low as it can: the flare, 25 ft
   over the pad, is the top at 7.77 m, and the horsehead reaches 7.7 m.

   Named nodes. render3d's building branch drives two names, "turret"
   (turned to the structure's aim every frame) and "mountwrap". Its rotor
   code, rotorShafts() and the spool-up, runs only in the branch for units,
   so a structure turns neither a "rotor" nor a "tailrotor", whatever it
   is called; the old model's walking beam was a "rotor" that never moved.
   Here the walking beam, horsehead, equalizer and pitmans are one group
   with a plain name, "walkbeam", hung on the centre bearing (walkbeam()
   below says how), ready for a hook to rock; nothing turns it yet, and the
   unit stands in its pose.

   Draw calls. 1.25 of these stand per commander, often the forward-most
   thing it owns, and the old model cost 458 meshes (916 draws with the
   shadow pass). Everything here is baked into ONE mesh per material, as
   js/hero/harvester_ore_hauler.js does it: GROUND (the pad, berm and
   foundations, painted in plan), STEEL (tanks, vessels, walkway, fence),
   JACK (the unit's paint), METAL (pipe, rod, motor), TEAM and HAZARD
   (safety yellow) for the pad and everything that stands still on it, and
   JACK and TEAM once more for the walkbeam group: eight meshes in all.
   Faction restyle: STEEL is a light grey under a near-white detail map, so
   render3d's restyle() repaints the tanks and vessels in the faction's
   wall colour (grey, olive, sand: all real tank paints); with bare:true
   they keep their own grey. GROUND and JACK are white under their
   paintings and METAL is dark, so they keep their own colour; TEAM and
   HAZARD are saturated. (restyle() does take a team colour as dull as the
   German #7a8a72 for structural grey; bare:true keeps that one too.)
   Colours are authored in sRGB for prepModel() to linearise.
   ASCII only: a stray byte inside a hex literal has broken this before.  */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroPumpingWell = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                        /* the THREE build() is handed       */

  /* ------------------------------------------------------------ the pad */
  var PAD = 17.5;                      /* half side: 35 m of gravel          */
  var PAD_Z = 0.15;                    /* gravel top                         */
  var FENCE = 16.9;                    /* pipe fence line                    */
  var GATE0 = 0.6, GATE1 = 5.6;        /* gate opening in the east fence (y) */

  /* ------------------------------------------------- the pumping unit */
  var WX = 4.5, WY = 1.0;              /* the well                          */
  /* The unit is drawn in its own frame, +X toward the well, and turned
     about the well 15 degrees off east-west, the horsehead end to the
     east-south-east. The nodding donkey's profile is what says "oil well"
     at a glance; end-on it is a post. Two cameras look at it: the game's,
     from the north-east, and icons3d's for the sidebar button, from the
     south-east. Turned 45 degrees the unit was dead side-on to the first
     and dead end-on to the second; at 15 the game camera sees it 60
     degrees off its line (87 % of the full profile) and the button 24 (41 %,
     from 10 %), and the player can turn the game camera anyway. */
  var PSI = -15 * D2R, cps = Math.cos(PSI), sps = Math.sin(PSI);
  function rot(x, y) { var dx = x - WX, dy = y - WY; return [WX + dx * cps - dy * sps, WY + dx * sps + dy * cps]; }
  var A = 3.937, C = 2.821, I = 2.820, P = 3.353, H = 5.892, G = 2.438, R = 1.067;
  var FND_Z = 0.45;                    /* foundation top: base bottom       */
  var PX = WX - A, PZ = FND_Z + H;     /* centre bearing                    */
  var CX = WX - A - I, CZ = FND_Z + G; /* crankshaft                        */
  var PHI = -4 * D2R;                  /* beam angle, horsehead down        */
  var BASE_X0 = WX - 10.45, BASE_X1 = PX + 1.30;
  /* the wellhead stack, from the gravel up */
  var Z_SB = PAD_Z + 2.0;              /* stuffing box top                  */

  /* --------------------------------------------------------- the battery */
  var TANK_R = 1.83, TANK_H = 6.10;    /* API 12F 400 bbl: 12 ft x 20 ft     */
  var TANK_Y = -10.6, TANK_X = [-8.1, -3.9, 0.3];
  var TANK_Z = PAD_Z;
  var ROOF_RISE = TANK_R * 0.0625;     /* 3/4 in 12                          */
  var WALK_Z = TANK_Z + TANK_H + ROOF_RISE + 0.10;
  /* the berm round them: inner toe, crest, outer toe */
  var BERM_IN = [-10.95, 3.15, -13.45, -7.75];     /* x0 x1 y0 y1          */
  var BERM_CREST = 0.62, BERM_TOP = 0.5, BERM_SLOPE = 1.1;
  var SEP_X = 8.6, SEP_Y = -4.2, TRT_X = 11.4, TRT_Y = -4.4;
  var FLARE_X = -14.6, FLARE_Y = 14.6, FLARE_H = 7.62;   /* 25 ft */
  var LOAD_X = -3.9;                   /* the truck load line                */
  var LOAD_Y = BERM_IN[3] + 2 * BERM_SLOPE + BERM_TOP + 0.4;

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* =========================================================== paintings
     Painted once per page and shared by every team's copy (render3d builds
     this once per team and era, icons3d once more). */
  var _cv = {};

  /* The pad, in plan: the whole 35 m square on one 1024 sheet, 3.4 cm a
     pixel, mapped by plan position, so every stain, rut and foundation top
     lies where the parts are. Vertical faces sample it at their own plan
     position, which is why each concrete top is painted a little oversize:
     its sides then take the concrete too. */
  function px(x) { return (x + PAD) / (2 * PAD) * 1024; }
  function py(y) { return (PAD - y) / (2 * PAD) * 1024; }
  function pm(m) { return m / (2 * PAD) * 1024; }
  function padCanvas() {
    if (_cv.pad) return _cv.pad;
    var cv = document.createElement("canvas"); cv.width = 1024; cv.height = 1024;
    var q = cv.getContext("2d"), R0 = rng(31337), i, x, y, r, g;
    /* crushed rock over a compacted base: a grey-tan, not the caliche white
       of the Permian or North Dakota's red scoria, so it sits on any map */
    q.fillStyle = "#9b927e"; q.fillRect(0, 0, 1024, 1024);
    for (i = 0; i < 60; i++) {
      q.fillStyle = R0() < 0.5 ? "rgba(70,62,48,0.07)" : "rgba(200,190,168,0.07)";
      q.fillRect(R0() * 1024, R0() * 1024, 40 + R0() * 200, 30 + R0() * 160);
    }
    for (i = 0; i < 5200; i++) {
      var v = R0();
      q.fillStyle = v < 0.45 ? "rgba(58,52,42,0.35)" : (v < 0.8 ? "rgba(196,188,170,0.35)" : "rgba(120,104,84,0.4)");
      q.fillRect(R0() * 1024, R0() * 1024, 1 + R0() * 2.5, 1 + R0() * 2.5);
    }
    /* the graded edge, raked and weedy */
    q.fillStyle = "rgba(92,86,62,0.35)";
    q.fillRect(0, 0, 1024, pm(0.7)); q.fillRect(0, 1024 - pm(0.7), 1024, pm(0.7));
    q.fillRect(0, 0, pm(0.7), 1024); q.fillRect(1024 - pm(0.7), 0, pm(0.7), 1024);
    /* ruts: the pumper's pickup and the workover rig from the gate to the
       wellhead, and the oil haulers' loop to the load line and out */
    function ruts(pts, gauge, a) {
      for (var s = -1; s <= 1; s += 2) {
        q.strokeStyle = "rgba(78,70,56," + a + ")"; q.lineWidth = pm(0.42);
        q.beginPath();
        for (var k = 0; k < pts.length; k++) {
          var p0 = pts[Math.max(0, k - 1)], p1 = pts[Math.min(pts.length - 1, k + 1)];
          var dx = p1[0] - p0[0], dy = p1[1] - p0[1], l = Math.sqrt(dx * dx + dy * dy) || 1;
          var ox = -dy / l * gauge / 2 * s, oy = dx / l * gauge / 2 * s;
          if (k) q.lineTo(px(pts[k][0] + ox), py(pts[k][1] + oy));
          else q.moveTo(px(pts[k][0] + ox), py(pts[k][1] + oy));
        }
        q.stroke();
      }
    }
    ruts([[18, 3.3], [13, 3.2], [9, 2.6], [6.4, 2.1]], 1.8, 0.30);
    /* the hauler comes in along the north side of the unit, swings round
       its west end, pulls up eastbound along the berm with the load line on
       its right, and goes out the way it came, keeping right both ways */
    ruts([[18, 4.6], [11, 4.9], [6.0, 6.4], [0.5, 8.6], [-5.0, 9.4], [-10.2, 8.0], [-12.6, 4.2],
          [-12.4, -0.4], [-9, -3.2], [LOAD_X, -3.5], [2, -3.4], [7, -2.0], [12, 0.4], [18, 2.1]], 1.9, 0.26);
    /* the flowline is buried where the lane crosses it, as a road crossing
       always is: its trench runs from the riser by the wellhead to the
       separator */
    var fr = rot(WX + 1.45, WY);
    q.strokeStyle = "rgba(118,108,88,0.5)"; q.lineWidth = pm(0.6);
    q.beginPath(); q.moveTo(px(fr[0]), py(fr[1])); q.lineTo(px(fr[0]), py(SEP_Y + 0.55));
    q.lineTo(px(SEP_X), py(SEP_Y + 0.55)); q.stroke();
    /* the cattle guard across the gate: a pit framed in steel, pipes on it */
    q.fillStyle = "#2c2a26"; q.fillRect(px(FENCE - 0.9), py(GATE1), pm(1.7), pm(GATE1 - GATE0));
    q.fillStyle = "#6e6c66";
    for (i = 0; i < 9; i++) q.fillRect(px(FENCE - 0.85 + i * 0.2), py(GATE1), pm(0.09), pm(GATE1 - GATE0));
    /* the berm: compacted earth, the crest worn to a path */
    var b = BERM_IN, bo = BERM_SLOPE * 2 + BERM_TOP;
    q.fillStyle = "#857a64";
    q.fillRect(px(b[0] - bo), py(b[3] + bo), pm(b[1] - b[0] + 2 * bo), pm(b[3] - b[2] + 2 * bo));
    q.fillStyle = "#7c725e";
    q.fillRect(px(b[0]), py(b[3]), pm(b[1] - b[0]), pm(b[3] - b[2]));
    q.strokeStyle = "rgba(160,150,128,0.45)"; q.lineWidth = pm(0.3);
    q.strokeRect(px(b[0] - BERM_SLOPE - BERM_TOP / 2), py(b[3] + BERM_SLOPE + BERM_TOP / 2),
                 pm(b[1] - b[0] + 2 * BERM_SLOPE + BERM_TOP), pm(b[3] - b[2] + 2 * BERM_SLOPE + BERM_TOP));
    /* inside the berm: the old spills the berm is there to hold */
    for (i = 0; i < 3; i++) {
      x = TANK_X[i]; y = TANK_Y;
      g = q.createRadialGradient(px(x), py(y), pm(1.6), px(x), py(y), pm(3.2));
      g.addColorStop(0, "rgba(40,34,26,0.45)"); g.addColorStop(1, "rgba(40,34,26,0)");
      q.fillStyle = g; q.fillRect(px(x - 3.3), py(y + 3.3), pm(6.6), pm(6.6));
    }
    /* concrete: the unit's foundation, the vessel slabs, the panel footing */
    function slab(x0, x1, y0, y1) {
      q.fillStyle = "#b7b3a8"; q.fillRect(px(x0 - 0.12), py(y1 + 0.12), pm(x1 - x0 + 0.24), pm(y1 - y0 + 0.24));
      q.fillStyle = "rgba(90,86,76,0.25)";
      for (var k = 0; k < 40; k++) q.fillRect(px(x0) + R0() * pm(x1 - x0), py(y1) + R0() * pm(y1 - y0), 2 + R0() * 5, 2 + R0() * 4);
    }
    /* the unit's foundation, turned with the unit */
    var fc = [rot(BASE_X0 - 0.27, WY - 1.27), rot(BASE_X1 + 0.22, WY - 1.27),
              rot(BASE_X1 + 0.22, WY + 1.27), rot(BASE_X0 - 0.27, WY + 1.27)];
    q.fillStyle = "#b7b3a8"; q.beginPath(); q.moveTo(px(fc[0][0]), py(fc[0][1]));
    for (i = 1; i < 4; i++) q.lineTo(px(fc[i][0]), py(fc[i][1]));
    q.closePath(); q.fill();
    slab(SEP_X - 0.9, SEP_X + 0.9, SEP_Y - 0.9, SEP_Y + 0.9);
    slab(TRT_X - 1.2, TRT_X + 1.3, TRT_Y - 1.2, TRT_Y + 1.2);
    /* crude: round the wellhead, dripped off the rod and the stuffing box,
       under the reducer, and where the hauler's hose comes off the load
       line */
    function stain(x0, y0, r0, a) {
      g = q.createRadialGradient(px(x0), py(y0), 0, px(x0), py(y0), pm(r0));
      g.addColorStop(0, "rgba(22,18,14," + a + ")");
      g.addColorStop(0.55, "rgba(28,23,17," + (a * 0.6).toFixed(3) + ")");
      g.addColorStop(1, "rgba(30,25,18,0)");
      q.fillStyle = g; q.fillRect(px(x0 - r0), py(y0 + r0), pm(2 * r0), pm(2 * r0));
    }
    var rs = rot(CX - 0.5, WY + 0.1);
    stain(WX, WY, 1.9, 0.85); stain(WX + 0.6, WY - 0.6, 1.0, 0.5);
    stain(rs[0], rs[1], 1.3, 0.45);
    stain(LOAD_X, LOAD_Y + 0.3, 1.5, 0.75); stain(LOAD_X + 0.6, LOAD_Y + 0.9, 0.8, 0.5);
    stain(TRT_X + 0.9, TRT_Y, 0.9, 0.35);
    /* the flare line is buried: its backfilled trench shows, from the
       treater up the east side and along the north fence to the flare */
    q.strokeStyle = "rgba(118,108,88,0.55)"; q.lineWidth = pm(0.7);
    q.beginPath(); q.moveTo(px(TRT_X + 1.35), py(TRT_Y + 0.3)); q.lineTo(px(14.2), py(TRT_Y + 0.3));
    q.lineTo(px(14.2), py(15.3)); q.lineTo(px(FLARE_X + 1.1), py(15.3));
    q.lineTo(px(FLARE_X + 1.1), py(FLARE_Y - 2.4)); q.stroke();
    /* the flare's footing, and scorched gravel round it */
    slab(FLARE_X - 0.8, FLARE_X + 0.8, FLARE_Y - 0.8, FLARE_Y + 0.8);
    stain(FLARE_X, FLARE_Y, 1.4, 0.4);
    _cv.pad = cv;
    return cv;
  }

  /* Tank and vessel steel. The top half is a tank shell unrolled, 11.5 m
     round by 6.1 m high: three welded courses, the vertical seams
     staggered, rust run down from the roof angle and the nozzles, crude
     slopped down from the thief hatch, dust up the bottom course. The
     bottom half is plain paint for everything else. Near white: it
     multiplies a grey that render3d repaints in the faction's colour. */
  function steelCanvas() {
    if (_cv.steel) return _cv.steel;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var q = cv.getContext("2d"), R0 = rng(4400), i, x, y, h;
    q.fillStyle = "#eeede8"; q.fillRect(0, 0, 512, 512);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R0() < 0.5 ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.05)";
      q.fillRect(R0() * 512, R0() * 512, 30 + R0() * 120, 10 + R0() * 60);
    }
    /* courses and seams */
    q.fillStyle = "rgba(60,58,52,0.35)";
    for (i = 1; i < 3; i++) q.fillRect(0, 256 * i / 3 - 1, 512, 2);
    for (i = 0; i < 3; i++)
      for (x = (i % 2) * 64; x < 512; x += 128) q.fillRect(x, 256 * i / 3, 2, 256 / 3);
    /* rust from the top angle */
    for (i = 0; i < 38; i++) {
      x = R0() * 512; h = 20 + R0() * 110;
      var gr = q.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, "rgba(120,62,24,0.40)"); gr.addColorStop(1, "rgba(120,62,24,0)");
      q.fillStyle = gr; q.fillRect(x, 0, 1.5 + R0() * 3, h);
    }
    /* crude slopped down the shell below the thief hatch, which is on the
       south side of the roof: u = 0 of the unrolled shell */
    for (i = 0; i < 2; i++) {
      x = i ? 494 : 4 + R0() * 6;
      var go = q.createLinearGradient(0, 0, 0, 150);
      go.addColorStop(0, "rgba(26,22,16,0.8)"); go.addColorStop(1, "rgba(26,22,16,0)");
      q.fillStyle = go; q.fillRect(x, 0, 10 + R0() * 10, 150);
    }
    /* dust and splash up the bottom course */
    var gd = q.createLinearGradient(0, 200, 0, 256);
    gd.addColorStop(0, "rgba(150,128,96,0)"); gd.addColorStop(1, "rgba(130,110,82,0.55)");
    q.fillStyle = gd; q.fillRect(0, 200, 512, 56);
    /* the plain half */
    q.fillStyle = "#ecebe6"; q.fillRect(0, 256, 512, 256);
    _cv.steel = cv;
    return cv;
  }

  /* The unit's paint: oilfield black gone brown, worn through to rust on
     every edge, oil on the lower parts. Tiled in world metres over every
     face of the unit, 2.5 m to the sheet. */
  function jackCanvas() {
    if (_cv.jack) return _cv.jack;
    var cv = document.createElement("canvas"); cv.width = 256; cv.height = 256;
    var q = cv.getContext("2d"), R0 = rng(1925), i;
    q.fillStyle = "#3d3e3a"; q.fillRect(0, 0, 256, 256);
    for (i = 0; i < 70; i++) {
      q.fillStyle = R0() < 0.6 ? "rgba(84,82,74,0.22)" : "rgba(20,20,18,0.25)";
      q.fillRect(R0() * 256, R0() * 256, 8 + R0() * 50, 4 + R0() * 30);
    }
    for (i = 0; i < 45; i++) {
      q.fillStyle = "rgba(112,64,30," + (0.18 + R0() * 0.25).toFixed(3) + ")";
      q.fillRect(R0() * 256, R0() * 256, 3 + R0() * 16, 2 + R0() * 10);
    }
    for (i = 0; i < 20; i++) {
      q.fillStyle = "rgba(110,62,28,0.2)";
      q.fillRect(R0() * 256, R0() * 256, 1.5, 12 + R0() * 50);
    }
    _cv.jack = cv;
    return cv;
  }

  function canvasTex(cv, clampS, clampT) {
    try {
      var t = new V.CanvasTexture(cv);
      t.wrapS = clampS ? V.ClampToEdgeWrapping : V.RepeatWrapping;
      t.wrapT = clampT ? V.ClampToEdgeWrapping : V.RepeatWrapping;
      /* r148: encoding is the switch that works; colorSpace does nothing */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }
  /* one texture per sheet for the page, like the canvases */
  var _tx = {};
  function tex(name, make, cs, ct) {
    if (_tx[name] === undefined) _tx[name] = canvasTex(make(), cs, ct) || false;
    return _tx[name];
  }

  /* ========================================================== materials */
  function makeMats(C0) {
    var T = {}, t;
    T.ground = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.97, metalness: 0.0 });
    t = tex("pad", padCanvas, true, true);
    if (t) T.ground.map = t; else T.ground.color.setHex(0x958c78);
    T.ground.userData.uvMode = "plan";
    T.steel = new V.MeshStandardMaterial({ color: 0xb4b7b1, roughness: 0.74, metalness: 0.18 });
    t = tex("steel", steelCanvas, false, true);
    if (t) T.steel.map = t;
    T.steel.userData.uvMode = "parts";
    T.jack = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.2 });
    t = tex("jack", jackCanvas, false, false);
    if (t) T.jack.map = t; else T.jack.color.setHex(0x3d3e3a);
    T.jack.userData.uvMode = "box";
    T.jack.userData.uvScale = 2.5;
    /* dark enough (linear lightness under 0.08) that neither restyle()
       nor the era tint repaints the pipe work */
    T.metal = new V.MeshStandardMaterial({ color: 0x4a4d50, roughness: 0.5, metalness: 0.55 });
    /* the owner's colour, exactly, as the other heroes carry it */
    T.team = new V.MeshStandardMaterial({ color: (C0 && C0.team !== undefined) ? C0.team : 0x4b8fe0,
                                          roughness: 0.6, metalness: 0.12 });
    T.hazard = new V.MeshStandardMaterial({ color: 0xd8a520, roughness: 0.6, metalness: 0.1 });
    return T;
  }

  /* ============================================================= baker
     Collects positioned geometry per material and emits ONE mesh per
     material. Each part keeps its own normals, so a box keeps its hard
     edges and a cylinder its smooth sides. */
  function Baker() { this.by = []; this.xf = null; }
  Baker.prototype.add = function (mat, geo, uv) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.attributes.normal) g.computeVertexNormals();
    /* a part frame (the unit's, turned about the well) */
    if (this.xf) g.applyMatrix4(this.xf);
    var n = g.attributes.position.count;
    if (mat.userData.uvMode === "parts") {
      var U = new Float32Array(n * 2), src = g.attributes.uv ? g.attributes.uv.array : null, k;
      for (k = 0; k < n; k++) {
        if (uv === "wrap" && src) { U[k * 2] = src[k * 2]; U[k * 2 + 1] = 0.5 + 0.5 * src[k * 2 + 1]; }
        else { U[k * 2] = 0.5; U[k * 2 + 1] = 0.22; }
      }
      g.setAttribute("uv", new V.BufferAttribute(U, 2));
    }
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return g; }
    this.by.push({ mat: mat, g: [g] });
    return g;
  };
  Baker.prototype.flush = function (group) {
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var Pn = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        Pn.set(g.attributes.position.array, o * 3);
        N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var mode = e.mat.userData.uvMode;
      if (mode === "plan") planUV(Pn, U);
      else if (mode === "box") boxUV(Pn, U, e.mat.userData.uvScale || 2.5);
      var geo = new V.BufferGeometry();
      geo.setAttribute("position", new V.BufferAttribute(Pn, 3));
      geo.setAttribute("normal", new V.BufferAttribute(N, 3));
      geo.setAttribute("uv", new V.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new V.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };
  function planUV(Pn, U) {
    for (var k = 0; k < Pn.length / 3; k++) {
      U[k * 2] = (Pn[k * 3] + PAD) / (2 * PAD);
      U[k * 2 + 1] = (Pn[k * 3 + 1] + PAD) / (2 * PAD);
    }
  }
  /* box projection by each triangle's own facing, metres / S */
  function boxUV(Pn, U, S) {
    for (var t = 0; t < Pn.length / 9; t++) {
      var o = t * 9;
      var ux = Pn[o + 3] - Pn[o], uy = Pn[o + 4] - Pn[o + 1], uz = Pn[o + 5] - Pn[o + 2];
      var vx = Pn[o + 6] - Pn[o], vy = Pn[o + 7] - Pn[o + 1], vz = Pn[o + 8] - Pn[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = Pn[o + k * 3], y = Pn[o + k * 3 + 1], z = Pn[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = y / S; }
        else if (nx >= ny) { u = y / S; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* ----------------------------------------------------- geometry kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a box from its corners */
  function bb(x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    return box(x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  }
  /* A box without the faces across its local axis k (0 x, 1 y, 2 z) at
     the "lo" end, the "hi" end or "both": a rung whose ends are in its
     rails, a post whose foot is in the ground. Only buried faces go; an
     open end that can be seen is a hole. BoxGeometry lays its faces out
     +x, -x, +y, -y, +z, -z, six vertices each once unindexed. */
  function trimBox(sx, sy, sz, k, which, under) {
    var g = new V.BoxGeometry(sx, sy, sz).toNonIndexed();
    var P = g.attributes.position.array, N = g.attributes.normal.array, U = g.attributes.uv.array;
    var pp = [], nn = [], uu = [], f, i;
    for (f = 0; f < 6; f++) {
      if ((f >> 1) === k && (which === "both" || (which === "hi" && !(f & 1)) || (which === "lo" && (f & 1)))) continue;
      /* and the underside, for a tread or a rung nothing ever looks up at */
      if (under && f === 5) continue;
      for (i = f * 6; i < f * 6 + 6; i++) {
        pp.push(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
        nn.push(N[i * 3], N[i * 3 + 1], N[i * 3 + 2]);
        uu.push(U[i * 2], U[i * 2 + 1]);
      }
    }
    var b = new V.BufferGeometry();
    b.setAttribute("position", new V.Float32BufferAttribute(pp, 3));
    b.setAttribute("normal", new V.Float32BufferAttribute(nn, 3));
    b.setAttribute("uv", new V.Float32BufferAttribute(uu, 2));
    return b;
  }
  function bbt(x0, x1, y0, y1, z0, z1, k, which, under) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    return trimBox(x1 - x0, y1 - y0, z1 - z0, k, which, under).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  }
  /* a cylinder along a model axis, centred at (x, y, z) */
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  /* a round bar from a to b */
  var _up = null;
  function rod(a, b, r, seg, open) {
    if (!_up) _up = new V.Vector3(0, 1, 0);
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !!open);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(_up, new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* A rectangular bar from a to b, w across (kept level) by h: a leg, a
     rail, a pitman. Its local x runs along the bar. */
  function sbar(a, b, w, h, ends) {
    var d = new V.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var L = d.length(); d.normalize();
    var s = new V.Vector3(0, 0, 1).cross(d);
    if (s.lengthSq() < 1e-8) s.set(0, 1, 0); else s.normalize();
    var u = new V.Vector3().crossVectors(d, s).normalize();
    var g = ends ? trimBox(L, w, h, 0, ends) : new V.BoxGeometry(L, w, h);
    g.applyMatrix4(new V.Matrix4().makeBasis(d, s, u));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* A plate drawn in the XZ plane as [x, z] and extruded across y0..y1.
     THREE.Shape triangulates any simple outline and winds it outward. */
  function xzPlate(pts, y0, y1) {
    var sh = new V.Shape();
    sh.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new V.ExtrudeGeometry(sh, { depth: y1 - y0, bevelEnabled: false, curveSegments: 1 });
    /* shape (x, y) -> model (x, z); the extrusion runs to -y */
    g.rotateX(PI / 2);
    g.translate(0, y1, 0);
    return g;
  }
  /* A flat-shaded triangle soup whose every face is turned to face AWAY
     from a hint point, as harvester_ore_hauler.js does it: for a convex
     part that is its own middle, so the winding is never in doubt. */
  function Soup() { this.p = []; this.n = []; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0];
    var cy = (a[1] + b[1] + c[1]) / 3 - away[1];
    var cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.geo = function () {
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(this.n, 3));
    return g;
  };
  /* a convex hull of 2D points (gift wrap), counter-clockwise */
  function hull2(pts) {
    pts = pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var lo = [], hi = [], i;
    for (i = 0; i < pts.length; i++) {
      while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 0) lo.pop();
      lo.push(pts[i]);
    }
    for (i = pts.length - 1; i >= 0; i--) {
      while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], pts[i]) <= 0) hi.pop();
      hi.push(pts[i]);
    }
    lo.pop(); hi.pop();
    return lo.concat(hi);
  }

  /* ========================================================= the pad */
  function buildPad(K, T) {
    /* a raised gravel pad: flat top, its edge graded down to the ground */
    var S = new Soup(), e = PAD - 0.5, away = [0, 0, -4];
    S.quad([-e, -e, PAD_Z], [e, -e, PAD_Z], [e, e, PAD_Z], [-e, e, PAD_Z], away);
    var c0 = [[-e, -e], [e, -e], [e, e], [-e, e]], c1 = [[-PAD, -PAD], [PAD, -PAD], [PAD, PAD], [-PAD, PAD]];
    for (var i = 0; i < 4; i++) {
      var j = (i + 1) % 4;
      S.quad([c0[i][0], c0[i][1], PAD_Z], [c0[j][0], c0[j][1], PAD_Z],
             [c1[j][0], c1[j][1], 0], [c1[i][0], c1[i][1], 0], away);
    }
    K.add(T.ground, S.geo());
    /* the berm round the battery: a trapezoid wall 0.62 m high, lofted
       round the rectangle as four rings (outer toe, crest, crest, inner
       toe), every face turned away from the middle of its own section */
    var b = BERM_IN, o1 = BERM_SLOPE, o2 = BERM_SLOPE + BERM_TOP, o3 = 2 * BERM_SLOPE + BERM_TOP;
    function ring(off, z) {
      return [[b[0] - off, b[2] - off, z], [b[1] + off, b[2] - off, z],
              [b[1] + off, b[3] + off, z], [b[0] - off, b[3] + off, z]];
    }
    var RG = [ring(0, PAD_Z), ring(o1, PAD_Z + BERM_CREST), ring(o2, PAD_Z + BERM_CREST), ring(o3, PAD_Z)];
    var Sb = new Soup();
    for (i = 0; i < 4; i++) {
      j = (i + 1) % 4;
      var mid = [(RG[0][i][0] + RG[0][j][0] + RG[3][i][0] + RG[3][j][0]) / 4,
                 (RG[0][i][1] + RG[0][j][1] + RG[3][i][1] + RG[3][j][1]) / 4, PAD_Z - 0.5];
      for (var r = 0; r < 3; r++) Sb.quad(RG[r][i], RG[r][j], RG[r + 1][j], RG[r + 1][i], mid);
    }
    K.add(T.ground, Sb.geo());
    /* (the unit's own foundation is laid in buildUnit, in the unit's frame:
       it has to turn with the unit it carries) */
    /* slabs under the separator and the treater */
    K.add(T.ground, bb(SEP_X - 0.9, SEP_X + 0.9, SEP_Y - 0.9, SEP_Y + 0.9, PAD_Z - 0.05, PAD_Z + 0.12));
    K.add(T.ground, bb(TRT_X - 1.2, TRT_X + 1.3, TRT_Y - 1.2, TRT_Y + 1.2, PAD_Z - 0.05, PAD_Z + 0.12));
  }

  /* The pipe fence round the pad: posts every three metres and two rails,
     the oilfield's welded fence of used pipe and sucker rod, broken at the
     east gate. The gate leaf stands open against the fence inside. */
  function buildFence(K, T) {
    var f = FENCE, z0 = PAD_Z, zt = PAD_Z + 1.2, rails = [PAD_Z + 0.55, PAD_Z + 1.12], i, k, n;
    function post(x, y) { K.add(T.steel, bbt(x - 0.045, x + 0.045, y - 0.045, y + 0.045, z0 - 0.1, zt, 2, "lo")); }
    function run(a, b) {
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy);
      n = Math.max(1, Math.round(L / 4.0));
      for (k = 0; k <= n; k++) post(a[0] + dx * k / n, a[1] + dy * k / n);
      for (k = 0; k < rails.length; k++)
        K.add(T.steel, sbar([a[0], a[1], rails[k]], [b[0], b[1], rails[k]], 0.06, 0.06, "both"));
    }
    run([-f, -f], [f, -f]);
    run([f, -f], [f, GATE0]);
    run([f, GATE1], [f, f]);
    run([f, f], [-f, f]);
    run([-f, f], [-f, -f]);
    /* the gate leaf: a pipe frame with a brace, swung back inside */
    var gx = f - 0.25, ga = GATE1 + 0.15, gb = GATE1 + 4.85;
    for (k = 0; k < 2; k++) K.add(T.steel, sbar([gx, ga, rails[k]], [gx, gb, rails[k]], 0.06, 0.06, "both"));
    K.add(T.steel, sbar([gx, ga, rails[0]], [gx, gb, rails[1]], 0.05, 0.05, "both"));
    K.add(T.steel, bb(gx - 0.035, gx + 0.035, ga - 0.035, ga + 0.035, rails[0] - 0.1, rails[1] + 0.05));
    K.add(T.steel, bb(gx - 0.035, gx + 0.035, gb - 0.035, gb + 0.035, rails[0] - 0.1, rails[1] + 0.05));
    /* the lease sign on its posts beside the gate: operator, lease, well
       number and the emergency number, as every state's rules require. The
       board is the owner's colour, facing the road. */
    var sx = f + 0.35, sy = GATE0 - 1.2;
    for (i = -1; i <= 1; i += 2) K.add(T.metal, bb(sx - 0.03, sx + 0.03, sy + i * 0.5 - 0.03, sy + i * 0.5 + 0.03, 0, PAD_Z + 1.9));
    K.add(T.team, bb(sx + 0.03, sx + 0.07, sy - 0.62, sy + 0.62, PAD_Z + 1.05, PAD_Z + 1.85));
  }

  /* ================================================ the pumping unit
     Beam frame: du along the beam toward the well, dz up from the centre
     bearing's axis, dv across (dv = y - WY). bw() turns a beam-frame point
     into model space, beamPut() a beam-frame geometry. */
  var cph = Math.cos(PHI), sph = Math.sin(PHI);
  function bw(du, dv, dz) { return [PX + du * cph - dz * sph, WY + dv, PZ + du * sph + dz * cph]; }
  function beamPut(g) { g.rotateY(-PHI); g.translate(PX, WY, PZ); return g; }
  /* The crank angle for the pose: the crank pin is where a pitman of
     length P reaches from the equalizer bearing; of the two, the one ahead
     of the crankshaft, pin toward the well. */
  function crankAngle() {
    var E = bw(-C, 0, 0), best = null, bestErr = 1e9;
    for (var k = 0; k < 7200; k++) {
      var th = k / 7200 * 2 * PI, cx = CX + R * Math.cos(th), cz = CZ + R * Math.sin(th);
      if (Math.cos(th) < 0) continue;
      var d = Math.abs(Math.sqrt((E[0] - cx) * (E[0] - cx) + (E[2] - cz) * (E[2] - cz)) - P);
      if (d < bestErr) { bestErr = d; best = th; }
    }
    return best;
  }
  /* And the other way round, the linkage itself: the beam angle (horsehead
     up positive) for a crank angle, where the equalizer bearing is a pitman
     from the pin. Over a turn of the crank the beam swings from 24.8 up to
     20.0 down, 3.08 m of polished-rod travel at the long hole against the
     120 in rating: the geometry above checks out. */
  function beamAngle(th) {
    var px0 = CX + R * Math.cos(th), pz0 = CZ + R * Math.sin(th), lo = -0.6, hi = 0.6;
    for (var k = 0; k < 40; k++) {
      var ph = (lo + hi) / 2, ex = PX - C * Math.cos(ph) - px0, ez = PZ - C * Math.sin(ph) - pz0;
      if (Math.sqrt(ex * ex + ez * ez) > P) lo = ph; else hi = ph;
    }
    return (lo + hi) / 2;
  }
  function beamSwing() {
    var top = -9, bot = 9;
    for (var k = 0; k < 360; k++) {
      var ph = beamAngle(k / 360 * 2 * PI);
      if (ph > top) top = ph;
      if (ph < bot) bot = ph;
    }
    return [top, bot];
  }

  function buildUnit(K, KB, T) {
    var s, i, k;
    K.xf = new V.Matrix4().makeTranslation(WX, WY, 0)
      .multiply(new V.Matrix4().makeRotationZ(PSI))
      .multiply(new V.Matrix4().makeTranslation(-WX, -WY, 0));
    /* the walking beam's baker takes the beam's own frame back off what is
       drawn in the unit's, so its parts come out about the centre bearing */
    KB.xf = new V.Matrix4().makeTranslation(PX, WY, PZ)
      .multiply(new V.Matrix4().makeRotationY(-PHI)).invert();
    /* ---- the foundation: one concrete block under the whole base, a
       hand's breadth under the gravel and 0.3 m proud of it. It is laid
       here, in the unit's frame, so it turns with the unit it carries; the
       pad sheet paints its top where rot() puts it, and the plan UVs are
       taken from where the block finally lies, so paint and block agree */
    K.add(T.ground, bb(BASE_X0 - 0.15, BASE_X1 + 0.1, WY - 1.15, WY + 1.15, PAD_Z - 0.05, FND_Z));
    /* ---- base: two wide-flange rails on the foundation, cross members */
    var BZ1 = FND_Z + 0.36;
    for (s = -1; s <= 1; s += 2) {
      K.add(T.jack, bb(BASE_X0, BASE_X1, WY + s * 0.65, WY + s * 0.85, FND_Z, BZ1));
      K.add(T.jack, bb(BASE_X0, BASE_X1, WY + s * 0.6, WY + s * 0.9, BZ1 - 0.04, BZ1));
    }
    [BASE_X1 - 0.15, PX - 0.4, CX + 0.4, CX - 1.7, BASE_X0 + 0.15].forEach(function (x) {
      K.add(T.jack, bb(x - 0.12, x + 0.12, WY - 0.65, WY + 0.65, FND_Z + 0.04, BZ1 - 0.06));
    });

    /* ---- Samson post: four legs, the front pair nearly upright, the
       rear pair raked back, braced at thirds, a cap under the centre
       bearing, and the ladder up its front */
    var ZT = PZ - 0.2;
    var FF = [PX + 0.95, 0.80], FT = [PX + 0.14, 0.30], RF = [PX - 1.45, 0.80], RT = [PX - 0.14, 0.30];
    function leg(f, t, sgn, frac) {
      return [f[0] + (t[0] - f[0]) * frac, WY + sgn * (f[1] + (t[1] - f[1]) * frac), BZ1 + (ZT - BZ1) * frac];
    }
    for (s = -1; s <= 1; s += 2) {
      K.add(T.jack, sbar(leg(FF, FT, s, 0), leg(FF, FT, s, 1), 0.2, 0.2));
      K.add(T.jack, sbar(leg(RF, RT, s, 0), leg(RF, RT, s, 1), 0.2, 0.2));
      [0.33, 0.66].forEach(function (f) {
        K.add(T.jack, sbar(leg(FF, FT, s, f), leg(RF, RT, s, f), 0.1, 0.1));
      });
      /* the side X-braces of the lower bay */
      K.add(T.jack, sbar(leg(FF, FT, s, 0.02), leg(RF, RT, s, 0.33), 0.07, 0.07));
      K.add(T.jack, sbar(leg(RF, RT, s, 0.02), leg(FF, FT, s, 0.33), 0.07, 0.07));
    }
    [0.33, 0.66].forEach(function (f) {
      K.add(T.jack, sbar(leg(RF, RT, -1, f), leg(RF, RT, 1, f), 0.1, 0.1));
    });
    K.add(T.jack, bb(PX - 0.42, PX + 0.42, WY - 0.45, WY + 0.45, ZT - 0.1, ZT + 0.02));
    /* ladder up the front, between the front legs */
    var L0 = [FF[0] + 0.1, BZ1], L1 = [FT[0] + 0.12, ZT - 0.35];
    for (s = -1; s <= 1; s += 2)
      K.add(T.jack, sbar([L0[0], WY + s * 0.22, L0[1]], [L1[0], WY + s * 0.22, L1[1]], 0.05, 0.05));
    var nR = Math.floor((L1[1] - L0[1]) / 0.3);
    for (k = 1; k <= nR; k++) {
      var f0 = k / (nR + 1), rx = L0[0] + (L1[0] - L0[0]) * f0, rz = L0[1] + (L1[1] - L0[1]) * f0;
      K.add(T.jack, bbt(rx - 0.016, rx + 0.016, WY - 0.2, WY + 0.2, rz - 0.016, rz + 0.016, 1, "both"));
    }

    /* ---- the walking beam: a 27 in wide-flange, from behind the
       equalizer to inside the horsehead, sitting on the centre bearing.
       It and everything that rides on it go to KB, the "walkbeam" group,
       in the jack's paint: the equalizer's cross shaft and the face's wear
       strip with it, both dark steel that the paint reads the same as. */
    var B0 = -C - 0.38, B1 = A - 0.95, ZB0 = 0.36, ZB1 = 1.05;
    KB.add(T.jack, beamPut(bb(B0, B1, -0.15, 0.15, ZB1 - 0.05, ZB1)));
    KB.add(T.jack, beamPut(bb(B0, B1, -0.15, 0.15, ZB0, ZB0 + 0.05)));
    KB.add(T.jack, beamPut(bb(B0, B1, -0.02, 0.02, ZB0 + 0.05, ZB1 - 0.05)));
    for (i = 0; i < 7; i++) {
      var sx = B0 + 0.3 + i * (B1 - B0 - 0.6) / 6;
      KB.add(T.jack, beamPut(bb(sx - 0.02, sx + 0.02, -0.13, 0.13, ZB0 + 0.05, ZB1 - 0.05)));
    }
    KB.add(T.jack, beamPut(bb(B0, B0 + 0.03, -0.15, 0.15, ZB0, ZB1)));
    /* centre bearing: the saddle under the beam, rocking with it on its
       pin, which lies on the axis and so stays with the post */
    KB.add(T.jack, beamPut(bb(-0.3, 0.3, -0.34, 0.34, -0.24, ZB0)));
    K.add(T.metal, beamPut(cyl(0.11, 0.11, 0.86, 10, "y", 0, 0, 0)));
    /* equalizer bearing under the beam's tail, and the equalizer across
       to the two pitmans */
    KB.add(T.jack, beamPut(bb(-C - 0.22, -C + 0.22, -0.3, 0.3, 0.02, ZB0)));
    KB.add(T.jack, beamPut(bb(-C - 0.14, -C + 0.14, -1.47, 1.47, -0.2, 0.05)));
    KB.add(T.jack, beamPut(cyl(0.08, 0.08, 3.08, 8, "y", -C, 0, -0.08)));

    /* ---- the horsehead. Its face is an arc of radius A about the centre
       bearing, so the bridle hangs plumb over the well at every angle of
       the beam; it spans +23 to -30 degrees about the beam, room for the
       whole swing (the wireline leaves the face at minus the beam angle).
       The back is straight, down from the beam end to the tip. It wears
       the owner's colour. */
    var HT = 1.55, HB = -1.95, aT = Math.asin(HT / A), aB = Math.asin(HB / A), prof = [];
    for (k = 0; k <= 12; k++) {
      var a = aT + (aB - aT) * k / 12;
      prof.push([A * Math.cos(a), A * Math.sin(a)]);
    }
    prof.push([A * Math.cos(aB) - 0.34, HB + 0.02]);
    prof.push([A - 0.98, ZB0 - 0.25]);
    prof.push([A - 1.22, ZB1 + 0.05]);
    prof.push([A - 0.92, HT]);
    KB.add(T.team, beamPut(xzPlate(prof, -0.28, 0.28)));
    /* the steel wear plate on the face, the wireline's groove */
    var S = new Soup();
    for (k = 0; k < 12; k++) {
      var a0 = aT + (aB - aT) * k / 12, a1 = aT + (aB - aT) * (k + 1) / 12, rr = A + 0.015;
      var p0 = [rr * Math.cos(a0), -0.12, rr * Math.sin(a0)], p1 = [rr * Math.cos(a1), -0.12, rr * Math.sin(a1)];
      var q0 = [rr * Math.cos(a0), 0.12, rr * Math.sin(a0)], q1 = [rr * Math.cos(a1), 0.12, rr * Math.sin(a1)];
      S.quad(p0, p1, q1, q0, [0, 0, 0]);
    }
    KB.add(T.jack, beamPut(S.geo()));

    /* ---- the bridle, carrier bar and polished rod. The wireline leaves
       the face where it is plumb, level with the centre bearing, straight
       over the well. The carrier bar rides 0.5 m over the stuffing box at
       the bottom of the stroke, where the beam is at the low end of its
       swing; at this pose it is A x (PHI - bottom) higher, 1.10 m. */
    var zCB = Z_SB + 0.5 + A * (PHI - beamSwing()[1]);
    for (s = -1; s <= 1; s += 2) K.add(T.metal, rod([WX, WY + s * 0.1, PZ], [WX, WY + s * 0.1, zCB + 0.06], 0.018, 4, true));
    K.add(T.metal, bb(WX - 0.07, WX + 0.07, WY - 0.3, WY + 0.3, zCB - 0.06, zCB + 0.06));
    K.add(T.metal, bb(WX - 0.08, WX + 0.08, WY - 0.08, WY + 0.08, zCB + 0.06, zCB + 0.2));
    K.add(T.metal, rod([WX, WY, Z_SB - 0.05], [WX, WY, zCB + 0.55], 0.025, 6));

    /* ---- cranks, counterweights, pitmans. The pose's crank angle is
       solved from the geometry; each crank carries two counterweights on
       its outboard face, in line with the pin as a crank-balanced unit
       has them, the outer one's end in safety orange. The pitmans run
       outboard of everything, from the pins up to the equalizer ends, and
       hang from the equalizer, so they go to the walkbeam group with their
       bearings; the cranks stay with the base. */
    var th = crankAngle(), ct = Math.cos(th), st = Math.sin(th);
    function cp(r, s2, v) { return [CX + r * ct - s2 * st, v, CZ + r * st + s2 * ct]; }
    function crankPut(g) { g.rotateY(-th); g.translate(CX, 0, CZ); return g; }
    var E = bw(-C, 0, -0.08);
    for (s = -1; s <= 1; s += 2) {
      var vIn = WY + s * 0.85, vOut = WY + s * 0.97;
      K.add(T.jack, crankPut(xzPlate([[-0.5, -0.27], [1.92, -0.2], [1.92, 0.2], [-0.5, 0.27]],
                                     Math.min(vIn, vOut), Math.max(vIn, vOut))));
      K.add(T.jack, crankPut(cyl(0.3, 0.3, 0.2, 10, "y", 0, (vIn + vOut) / 2, 0)));
      var w0 = WY + s * 0.97, w1 = WY + s * 1.23;
      K.add(T.jack, crankPut(bb(1.12, 1.42, Math.min(w0, w1), Math.max(w0, w1), -0.36, 0.36)));
      K.add(T.jack, crankPut(bb(1.45, 1.75, Math.min(w0, w1), Math.max(w0, w1), -0.36, 0.36)));
      K.add(T.hazard, crankPut(bb(1.75, 1.79, Math.min(w0, w1), Math.max(w0, w1), -0.36, 0.36)));
      /* crank pin, the pitman's bearing on it, and the pitman */
      var pin = cp(R, 0, 0);
      K.add(T.metal, cyl(0.07, 0.07, 0.52, 8, "y", pin[0], WY + s * 1.21, pin[2]));
      KB.add(T.jack, bb(pin[0] - 0.16, pin[0] + 0.16, WY + s * 1.3, WY + s * 1.46, pin[2] - 0.16, pin[2] + 0.16));
      KB.add(T.jack, sbar([pin[0], WY + s * 1.38, pin[2]], [E[0], WY + s * 1.38, E[2]], 0.14, 0.2));
    }
    K.add(T.metal, cyl(0.12, 0.12, 2.0, 10, "y", CX, WY, CZ));

    /* ---- gear reducer on its sub-base: the bull gear's big drum over the
       output shaft, the smaller one over the input shaft 37.4 in behind,
       the split line at the shafts */
    var XI = CX - 0.95, SUBZ = CZ - 0.59;
    K.add(T.jack, bb(CX - 1.35, CX + 0.75, WY - 0.55, WY + 0.55, BZ1, SUBZ));
    K.add(T.jack, bb(CX - 1.4, CX + 0.8, WY - 0.6, WY + 0.6, SUBZ - 0.08, SUBZ));
    K.add(T.jack, bb(XI - 0.25, CX + 0.55, WY - 0.42, WY + 0.42, SUBZ, CZ + 0.05));
    K.add(T.jack, cyl(0.64, 0.64, 0.8, 16, "y", CX, WY, CZ));
    K.add(T.jack, cyl(0.42, 0.42, 0.76, 12, "y", XI, WY, CZ));
    K.add(T.jack, bb(XI, CX, WY - 0.38, WY + 0.38, CZ, CZ + 0.5));
    K.add(T.metal, cyl(0.07, 0.07, 1.25, 8, "y", XI, WY - 0.02, CZ));
    /* brake drum on the input shaft, the other side from the belts */
    K.add(T.metal, cyl(0.3, 0.3, 0.12, 12, "y", XI, WY + 0.5, CZ));

    /* ---- prime mover: an electric motor on its stand behind the reducer,
       belted to the 44 in sheave under the belt guard */
    var MX = CX - 2.6, MZ = BZ1 + 0.95, MV = WY - 0.08, MS = MZ - 0.36;
    K.add(T.jack, bb(MX - 0.55, MX + 0.55, WY - 0.62, WY + 0.5, BZ1, MS - 0.1));
    K.add(T.jack, bb(MX - 0.6, MX + 0.6, WY - 0.66, WY + 0.54, MS - 0.1, MS));
    K.add(T.metal, cyl(0.31, 0.31, 0.72, 12, "y", MX, MV, MZ));
    K.add(T.metal, cyl(0.33, 0.33, 0.14, 12, "y", MX, MV + 0.4, MZ));
    K.add(T.metal, bb(MX - 0.25, MX + 0.25, MV - 0.3, MV + 0.3, MS, MZ - 0.1));
    K.add(T.metal, bb(MX - 0.14, MX + 0.14, MV - 0.12, MV + 0.12, MZ + 0.28, MZ + 0.42));
    var hp = [];
    for (k = 0; k < 14; k++) {
      var ag = k / 14 * 2 * PI;
      hp.push([XI + 0.64 * Math.cos(ag), CZ + 0.64 * Math.sin(ag)]);
      hp.push([MX + 0.22 * Math.cos(ag), MZ + 0.22 * Math.sin(ag)]);
    }
    K.add(T.jack, xzPlate(hull2(hp), WY - 0.76, WY - 0.5));

    /* ---- the pump-off controller: a cabinet on two posts north of the
       unit, its conduit down to the motor */
    var CPX = CX - 1.9, CPY = WY + 2.9;
    for (s = -1; s <= 1; s += 2) K.add(T.metal, bb(CPX + s * 0.3 - 0.03, CPX + s * 0.3 + 0.03, CPY - 0.03, CPY + 0.03, PAD_Z - 0.1, PAD_Z + 1.9));
    K.add(T.steel, bb(CPX - 0.38, CPX + 0.38, CPY - 0.2, CPY + 0.12, PAD_Z + 0.85, PAD_Z + 1.75));
    K.add(T.steel, bb(CPX - 0.44, CPX + 0.44, CPY - 0.3, CPY + 0.18, PAD_Z + 1.75, PAD_Z + 1.8));
    K.add(T.metal, rod([CPX, CPY - 0.1, PAD_Z + 0.85], [CPX, CPY - 0.1, PAD_Z + 0.08], 0.03, 4));
    K.add(T.metal, rod([CPX, CPY - 0.1, PAD_Z + 0.08], [MX, WY + 0.6, PAD_Z + 0.08], 0.03, 4));

    /* ---- the guard round the moving parts: a pipe rail in safety yellow
       round the cranks, counterweights and motor, open at the front where
       the base runs on to the Samson post */
    var g0 = CX + 1.75, g1 = BASE_X0 - 0.6, gy = 2.25, zr = [PAD_Z + 0.6, PAD_Z + 1.1];
    function grail(a, b) {
      for (var q = 0; q < 2; q++) K.add(T.hazard, sbar([a[0], a[1], zr[q]], [b[0], b[1], zr[q]], 0.05, 0.05, "both"));
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), n = Math.max(1, Math.ceil(L / 2.2));
      for (var q2 = 0; q2 <= n; q2++) {
        var x = a[0] + dx * q2 / n, y = a[1] + dy * q2 / n;
        K.add(T.hazard, bbt(x - 0.03, x + 0.03, y - 0.03, y + 0.03, PAD_Z - 0.05, zr[1] + 0.03, 2, "lo"));
      }
    }
    grail([g0, WY + gy], [g1, WY + gy]);
    grail([g1, WY + gy], [g1, WY - gy]);
    grail([g1, WY - gy], [g0, WY - gy]);

    /* ---- the wellhead: casing head, tubing head, master valve with its
       handwheel, the pumping tee with the flowline off it, the casing
       valve, the stuffing box and the rod through it */
    var zc = PAD_Z;
    K.add(T.metal, cyl(0.2, 0.2, 0.45, 8, "z", WX, WY, zc + 0.225, true));
    K.add(T.metal, cyl(0.3, 0.3, 0.1, 8, "z", WX, WY, zc + 0.45));
    K.add(T.metal, cyl(0.17, 0.17, 0.3, 8, "z", WX, WY, zc + 0.65, true));
    K.add(T.metal, cyl(0.26, 0.26, 0.08, 8, "z", WX, WY, zc + 0.82));
    K.add(T.metal, bb(WX - 0.17, WX + 0.17, WY - 0.14, WY + 0.14, zc + 0.86, zc + 1.18));
    K.add(T.metal, cyl(0.02, 0.02, 0.3, 4, "y", WX, WY - 0.28, zc + 1.02));
    K.add(T.hazard, cyl(0.17, 0.17, 0.03, 10, "y", WX, WY - 0.44, zc + 1.02));
    K.add(T.metal, cyl(0.1, 0.1, 0.45, 8, "z", WX, WY, zc + 1.38));
    K.add(T.metal, cyl(0.08, 0.08, 0.5, 8, "x", WX + 0.3, WY, zc + 1.4));
    K.add(T.metal, cyl(0.14, 0.12, Z_SB - zc - 1.6, 8, "z", WX, WY, (zc + 1.6 + Z_SB) / 2));
    /* casing gas valve on the casing head */
    K.add(T.metal, cyl(0.05, 0.05, 0.4, 6, "y", WX, WY + 0.38, zc + 0.3));
    K.add(T.metal, bb(WX - 0.07, WX + 0.07, WY + 0.52, WY + 0.66, zc + 0.2, zc + 0.4));

    /* ---- the flowline off the tee: a check valve, then down into the
       ground, buried from there to the separator under the lane */
    K.add(T.metal, rod([WX + 0.5, WY, zc + 1.4], [WX + 1.45, WY, zc + 1.4], 0.045, 6));
    K.add(T.metal, rod([WX + 1.45, WY, zc + 1.4], [WX + 1.45, WY, zc - 0.1], 0.045, 6));
    K.add(T.metal, bb(WX + 0.8, WX + 1.05, WY - 0.1, WY + 0.1, zc + 1.3, zc + 1.52));
    K.add(T.metal, bb(WX + 1.37, WX + 1.53, WY - 0.08, WY + 0.08, zc + 0.3, zc + 0.44));
    K.xf = null;
  }

  /* a line of pipe through its corners, on stands every four and a half
     metres where it runs low */
  function pipeRun(K, T, pts, r) {
    for (var k = 0; k < pts.length - 1; k++) {
      var a = pts[k], b = pts[k + 1];
      K.add(T.metal, rod(a, b, r, 6));
      if (a[2] < 1.0 && b[2] < 1.0 && Math.abs(a[2] - b[2]) < 0.01) {
        var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), n = Math.floor(L / 4.5);
        for (var q = 1; q <= n; q++) {
          var x = a[0] + dx * q / (n + 1), y = a[1] + dy * q / (n + 1);
          var ax = Math.abs(dx) > Math.abs(dy) ? 0.04 : 0.18, ay = 0.22 - ax;
          K.add(T.metal, bbt(x - 0.04, x + 0.04, y - 0.04, y + 0.04, PAD_Z - 0.05, a[2] - r - 0.04, 2, "both"));
          K.add(T.metal, bb(x - ax, x + ax, y - ay, y + ay, a[2] - r - 0.04, a[2] - r));
        }
      }
    }
  }

  /* ======================================================= the battery */
  function buildBattery(K, T) {
    var i, s, k;
    for (i = 0; i < TANK_X.length; i++) {
      var tx = TANK_X[i], ty = TANK_Y;
      /* the shell: its own cylinder UVs, into the unrolled-shell half of
         the steel sheet */
      K.add(T.steel, cyl(TANK_R, TANK_R, TANK_H, 24, "z", tx, ty, TANK_Z + TANK_H / 2, true), "wrap");
      /* the cone roof, 3/4 in 12, a fan from its apex, in the owner's
         colour: the broadest surface on the pad that faces the camera. Its
         eave sits 4 cm out over the shell, the top angle's lip. */
      var rs = new Soup(), rr = TANK_R + 0.04, rz0 = TANK_Z + TANK_H, apex = [tx, ty, rz0 + ROOF_RISE];
      for (k = 0; k < 24; k++) {
        var r0 = k / 24 * 2 * PI, r1 = (k + 1) / 24 * 2 * PI;
        rs.tri(apex, [tx + rr * Math.cos(r0), ty + rr * Math.sin(r0), rz0], [tx + rr * Math.cos(r1), ty + rr * Math.sin(r1), rz0],
               [tx, ty, rz0 - 1]);
      }
      K.add(T.team, rs.geo());
      /* thief hatch and pressure-vacuum vent on the roof, beside the walk */
      K.add(T.metal, bb(tx - 0.2, tx + 0.2, ty - 1.05, ty - 0.65, TANK_Z + TANK_H, TANK_Z + TANK_H + 0.32));
      K.add(T.metal, cyl(0.08, 0.08, 0.5, 6, "z", tx + 0.7, ty + 0.9, TANK_Z + TANK_H + 0.25, true));
      K.add(T.metal, cyl(0.16, 0.16, 0.14, 8, "z", tx + 0.7, ty + 0.9, TANK_Z + TANK_H + 0.55));
      /* clean-out door low on the north side, and the inlet riser from the
         header up the shell to the top course */
      K.add(T.steel, place(cyl(0.42, 0.42, 0.08, 10, "y", 0, 0, 0), tx - 0.9, ty + TANK_R * Math.cos(Math.asin(0.9 / TANK_R)) + 0.02, TANK_Z + 0.7));
      K.add(T.metal, rod([tx + 0.6, ty + 2.95, PAD_Z + 0.42], [tx + 0.6, ty + TANK_R + 0.25, PAD_Z + 0.42], 0.045, 6, true));
      K.add(T.metal, rod([tx + 0.6, ty + TANK_R + 0.25, PAD_Z + 0.42], [tx + 0.6, ty + TANK_R + 0.25, TANK_Z + TANK_H - 0.5], 0.045, 6));
      K.add(T.metal, rod([tx + 0.6, ty + TANK_R + 0.25, TANK_Z + TANK_H - 0.5], [tx + 0.6, ty + TANK_R - 0.3, TANK_Z + TANK_H - 0.5], 0.045, 6, true));
      /* equalizer line to the next tank, high on the shell */
      if (i < TANK_X.length - 1)
        K.add(T.metal, rod([tx + TANK_R - 0.1, ty - 0.6, TANK_Z + TANK_H - 0.9], [TANK_X[i + 1] - TANK_R + 0.1, ty - 0.6, TANK_Z + TANK_H - 0.9], 0.07, 6, true));
    }
    /* the inlet header along the north side, fed from the treater */
    var HY = TANK_Y + 2.95;
    pipeRun(K, T, [[TRT_X - 0.4, TRT_Y - 0.62, PAD_Z + 0.42], [TRT_X - 0.4, HY, PAD_Z + 0.42],
                   [TANK_X[0] + 0.6, HY, PAD_Z + 0.42]], 0.05);
    /* the load line: out of the middle tank low down, over the berm to the
       truck connection on its stand, with the drip bucket under the hose
       valve */
    var LY = LOAD_Y;
    pipeRun(K, T, [[LOAD_X, TANK_Y + TANK_R - 0.1, TANK_Z + 0.6], [LOAD_X, BERM_IN[3] - 0.3, TANK_Z + 0.6],
                   [LOAD_X, BERM_IN[3] + BERM_SLOPE + 0.25, PAD_Z + BERM_CREST + 0.25],
                   [LOAD_X, LY, PAD_Z + BERM_CREST + 0.25]], 0.05);
    K.add(T.metal, bb(LOAD_X - 0.06, LOAD_X + 0.06, LY - 0.06, LY + 0.06, PAD_Z - 0.05, PAD_Z + 0.9));
    K.add(T.hazard, cyl(0.12, 0.12, 0.03, 10, "x", LOAD_X + 0.1, LY, PAD_Z + 1.15));
    K.add(T.metal, cyl(0.06, 0.06, 0.3, 8, "z", LOAD_X, LY + 0.18, PAD_Z + 0.95));
    K.add(T.metal, cyl(0.16, 0.13, 0.28, 10, "z", LOAD_X, LY + 0.25, PAD_Z + 0.14));

    /* ---- the walkway along the tank tops: grating on brackets, a hand
       rail each side, and the landing off the east tank where the stair
       comes up */
    var X0 = TANK_X[0] - 0.4, X1 = TANK_X[TANK_X.length - 1] + TANK_R + 0.85, WZ = WALK_Z, WW = 0.45;
    K.add(T.steel, bb(X0, X1, TANK_Y - WW, TANK_Y + WW, WZ - 0.05, WZ));
    for (s = -1; s <= 1; s += 2) {
      K.add(T.steel, bb(X0, X1, TANK_Y + s * WW - 0.03, TANK_Y + s * WW + 0.03, WZ - 0.18, WZ));
      [0.53, 1.07].forEach(function (h) {
        K.add(T.steel, sbar([X0, TANK_Y + s * (WW - 0.02), WZ + h], [X1, TANK_Y + s * (WW - 0.02), WZ + h], 0.04, 0.04, "both"));
      });
      var n = Math.ceil((X1 - X0) / 2.0);
      for (k = 0; k <= n; k++) {
        var x = X0 + (X1 - X0) * k / n;
        K.add(T.steel, bbt(x - 0.025, x + 0.025, TANK_Y + s * (WW - 0.02) - 0.025, TANK_Y + s * (WW - 0.02) + 0.025, WZ, WZ + 1.09, 2, "lo"));
      }
    }
    K.add(T.steel, bb(X0 - 0.02, X0 + 0.02, TANK_Y - WW, TANK_Y + WW, WZ + 1.05, WZ + 1.09));
    for (i = 0; i < TANK_X.length; i++)
      for (s = -1; s <= 1; s += 2)
        K.add(T.steel, bbt(TANK_X[i] - 0.05 + s * 1.2, TANK_X[i] + 0.05 + s * 1.2, TANK_Y - WW, TANK_Y + WW, TANK_Z + TANK_H, WZ - 0.05, 2, "both"));
    /* the stair: from the landing down to the east over the berm, 46
       degrees, treads every 0.2 m of rise, stringers and rails */
    var SX0 = X1, SX1 = X1 + (WZ - PAD_Z) * 0.96, SZ0 = WZ, SZ1 = PAD_Z;
    for (s = -1; s <= 1; s += 2) {
      K.add(T.steel, sbar([SX0, TANK_Y + s * WW, SZ0 - 0.1], [SX1, TANK_Y + s * WW, SZ1 + 0.05], 0.05, 0.22));
      K.add(T.steel, sbar([SX0, TANK_Y + s * WW, SZ0 + 1.0], [SX1, TANK_Y + s * WW, SZ1 + 1.0], 0.04, 0.04));
      for (k = 0; k <= 4; k++) {
        var f = k / 4, sx2 = SX0 + (SX1 - SX0) * f, sz2 = SZ0 + (SZ1 - SZ0) * f;
        K.add(T.steel, bbt(sx2 - 0.025, sx2 + 0.025, TANK_Y + s * WW - 0.025, TANK_Y + s * WW + 0.025, sz2 - 0.1, sz2 + 1.02, 2, "lo"));
      }
      /* the posts the stair stands on halfway down */
      var mx = SX0 + (SX1 - SX0) * 0.55, mz = SZ0 + (SZ1 - SZ0) * 0.55;
      K.add(T.steel, bb(mx - 0.05, mx + 0.05, TANK_Y + s * WW - 0.05, TANK_Y + s * WW + 0.05, PAD_Z - 0.05, mz - 0.2));
    }
    var nT = Math.round((SZ0 - SZ1) / 0.22);
    for (k = 1; k < nT; k++) {
      var tf = k / nT, tx2 = SX0 + (SX1 - SX0) * tf, tz = SZ0 + (SZ1 - SZ0) * tf;
      K.add(T.steel, bbt(tx2 - 0.13, tx2 + 0.13, TANK_Y - WW + 0.02, TANK_Y + WW - 0.02, tz - 0.03, tz, 1, "both", true));
    }

    /* ---- the separator: a vertical two-phase vessel, 30 in x 10 ft, on
       four legs over its slab, the flowline in and the liquid out */
    var sz0 = PAD_Z + 0.12 + 0.7, SR = 0.38, SH = 3.05;
    K.add(T.steel, cyl(SR, SR, SH, 12, "z", SEP_X, SEP_Y, sz0 + SH / 2, true), "wrap");
    K.add(T.steel, place(new V.SphereGeometry(SR, 12, 3, 0, 2 * PI, 0, PI / 2).rotateX(PI / 2), SEP_X, SEP_Y, sz0 + SH));
    K.add(T.steel, place(new V.SphereGeometry(SR, 12, 2, 0, 2 * PI, PI / 2, PI / 2).rotateX(PI / 2), SEP_X, SEP_Y, sz0));
    for (k = 0; k < 4; k++) {
      var la = PI / 4 + k * PI / 2;
      K.add(T.steel, bb(SEP_X + 0.3 * Math.cos(la) - 0.04, SEP_X + 0.3 * Math.cos(la) + 0.04,
                        SEP_Y + 0.3 * Math.sin(la) - 0.04, SEP_Y + 0.3 * Math.sin(la) + 0.04, PAD_Z + 0.12, sz0 + 0.3));
    }
    K.add(T.metal, rod([SEP_X, SEP_Y + 0.55, PAD_Z - 0.1], [SEP_X, SEP_Y + 0.55, sz0 + 1.9], 0.045, 6));
    K.add(T.metal, rod([SEP_X, SEP_Y + 0.55, sz0 + 1.9], [SEP_X, SEP_Y + SR - 0.05, sz0 + 1.9], 0.045, 6));
    K.add(T.metal, rod([SEP_X + SR - 0.05, SEP_Y, sz0 + 0.4], [TRT_X - 0.55, SEP_Y, sz0 + 0.4], 0.04, 6));
    /* relief valve and the gas line off the top */
    K.add(T.metal, cyl(0.05, 0.05, 0.5, 6, "z", SEP_X, SEP_Y, sz0 + SH + SR + 0.2));

    /* ---- the heater-treater: 4 ft x 20 ft, vertical, on its skirt; the
       burner and fire box low on the east side with the firetube's 8 in
       stack up the side and a little past the top; a ladder on the north */
    var tz0 = PAD_Z + 0.12 + 0.35, TR0 = 0.61, TH0 = 6.1;
    K.add(T.steel, cyl(TR0, TR0, TH0 + 0.35, 16, "z", TRT_X, TRT_Y, tz0 + (TH0 - 0.35) / 2, true), "wrap");
    K.add(T.steel, place(new V.SphereGeometry(TR0, 16, 3, 0, 2 * PI, 0, PI / 2).rotateX(PI / 2).scale(1, 1, 0.5), TRT_X, TRT_Y, tz0 + TH0));
    K.add(T.steel, bb(TRT_X + TR0 - 0.1, TRT_X + TR0 + 0.45, TRT_Y - 0.35, TRT_Y + 0.35, tz0 + 0.3, tz0 + 1.2));
    K.add(T.metal, rod([TRT_X + TR0 + 0.45, TRT_Y, tz0 + 0.75], [TRT_X + TR0 + 0.62, TRT_Y, tz0 + 0.75], 0.1, 8));
    K.add(T.metal, rod([TRT_X + TR0 + 0.2, TRT_Y, tz0 + 1.2], [TRT_X + TR0 + 0.2, TRT_Y, tz0 + TH0 + 0.45], 0.1, 8));
    K.add(T.metal, cyl(0.16, 0.12, 0.25, 8, "z", TRT_X + TR0 + 0.2, TRT_Y, tz0 + TH0 + 0.55));
    for (s = -1; s <= 1; s += 2)
      K.add(T.steel, bb(TRT_X - 0.03 + s * 0.2, TRT_X + 0.03 + s * 0.2, TRT_Y + TR0 + 0.14, TRT_Y + TR0 + 0.2, PAD_Z + 0.12, tz0 + TH0));
    for (k = 1; k < 18; k++) {
      var lz = PAD_Z + 0.12 + k * 0.33;
      K.add(T.steel, bbt(TRT_X - 0.2, TRT_X + 0.2, TRT_Y + TR0 + 0.15, TRT_Y + TR0 + 0.19, lz - 0.015, lz + 0.015, 0, "both", true));
    }
    /* oil out to the tank header, and the gas off the top into the buried
       flare line */
    K.add(T.metal, rod([TRT_X - 0.4, TRT_Y - 0.3, PAD_Z + 0.42 + 1.0], [TRT_X - 0.4, TRT_Y - 0.62, PAD_Z + 0.42 + 1.0], 0.05, 6));
    K.add(T.metal, rod([TRT_X - 0.4, TRT_Y - 0.62, PAD_Z + 0.42 + 1.0], [TRT_X - 0.4, TRT_Y - 0.62, PAD_Z + 0.42], 0.05, 6));
    K.add(T.metal, rod([TRT_X, TRT_Y + 0.3, tz0 + TH0 + 0.2], [TRT_X + 1.1, TRT_Y + 0.3, tz0 + TH0 + 0.2], 0.05, 6));
    K.add(T.metal, rod([TRT_X + 1.1, TRT_Y + 0.3, tz0 + TH0 + 0.2], [TRT_X + 1.1, TRT_Y + 0.3, PAD_Z - 0.1], 0.05, 6));
  }

  /* ======================================================== the flare
     A 25 ft candlestick on a base plate in the north-west corner, its line
     buried from the treater, a knockout pot at its foot and the pilot's
     fuel line up its side */
  function buildFlare(K, T) {
    var x = FLARE_X, y = FLARE_Y;
    K.add(T.ground, bb(x - 0.8, x + 0.8, y - 0.8, y + 0.8, PAD_Z - 0.05, PAD_Z + 0.15));
    K.add(T.metal, bb(x - 0.45, x + 0.45, y - 0.45, y + 0.45, PAD_Z + 0.15, PAD_Z + 0.22));
    K.add(T.metal, cyl(0.11, 0.11, FLARE_H - 0.9, 8, "z", x, y, PAD_Z + 0.22 + (FLARE_H - 0.9) / 2, true));
    K.add(T.metal, cyl(0.17, 0.12, 0.5, 8, "z", x, y, PAD_Z + FLARE_H - 0.9 + 0.22 + 0.25, true));
    K.add(T.metal, cyl(0.19, 0.19, 0.18, 8, "z", x, y, PAD_Z + FLARE_H - 0.9 + 0.22 + 0.59));
    K.add(T.metal, rod([x + 0.16, y, PAD_Z + 0.25], [x + 0.16, y, PAD_Z + FLARE_H - 0.1], 0.02, 4));
    /* gussets at the foot */
    for (var k = 0; k < 4; k++) {
      var a = k * PI / 2;
      K.add(T.metal, sbar([x + 0.12 * Math.cos(a), y + 0.12 * Math.sin(a), PAD_Z + 0.8],
                          [x + 0.42 * Math.cos(a), y + 0.42 * Math.sin(a), PAD_Z + 0.22], 0.02, 0.05));
    }
    /* the knockout pot, a short horizontal drum the line rises out of */
    K.add(T.steel, cyl(0.35, 0.35, 1.3, 12, "y", x + 1.1, y - 1.3, PAD_Z + 0.5), "wrap");
    for (var s = -1; s <= 1; s += 2)
      K.add(T.steel, bb(x + 0.95, x + 1.25, y - 1.3 + s * 0.45 - 0.05, y - 1.3 + s * 0.45 + 0.05, PAD_Z, PAD_Z + 0.2));
    K.add(T.metal, rod([x + 1.1, y - 0.65, PAD_Z + 0.5], [x + 1.1, y - 0.3, PAD_Z + 0.5], 0.06, 6));
    K.add(T.metal, rod([x + 1.1, y - 0.3, PAD_Z + 0.5], [x + 0.1, y - 0.1, PAD_Z + 0.5], 0.06, 6));
    K.add(T.metal, rod([x + 1.1, y - 1.95, PAD_Z + 0.5], [x + 1.1, y - 2.4, PAD_Z - 0.1], 0.06, 6));
  }

  /* The walking beam, horsehead, equalizer and pitmans as one group, so a
     hook can rock them. It hangs on the centre bearing: the outer group
     carries the unit's turn about the well, and "walkbeam" inside it turns
     only about its own y, the bearing's pin, with rotation.y minus the beam
     angle. userData gives the pose it is built in and the two ends of the
     swing, each as a rotation.y; the horsehead's face stays on the bridle
     over the well right through it. The cranks and counterweights are baked
     into the base and the pitmans ride in the beam, so a hook that rocks it
     also needs the cranks turned about the crankshaft (beamAngle() gives
     the beam for a crank angle) and the pitmans split out and laid from
     the equalizer to the pins each frame: three more meshes than the
     eight-draw budget has room for. render3d has no such hook: its
     building branch drives only "turret" and "mountwrap", so the name is
     plain on purpose and nothing turns it. */
  function walkbeam(KB) {
    var sw = beamSwing(), pc = rot(PX, WY);
    var mount = new V.Group();
    mount.position.set(pc[0], pc[1], PZ);
    mount.rotation.z = PSI;
    var wb = new V.Group();
    wb.name = "walkbeam";
    wb.rotation.y = -PHI;
    wb.userData.rest = -PHI;
    wb.userData.top = -sw[0];
    wb.userData.bottom = -sw[1];
    KB.flush(wb);
    mount.add(wb);
    return mount;
  }

  /* =========================================================== ASSEMBLY */
  function build(THREE, M, C0) {
    V = THREE;
    var T = makeMats(C0);
    var g = new V.Group();
    g.name = "pumping_well";
    var K = new Baker(), KB = new Baker();
    buildPad(K, T);
    buildFence(K, T);
    buildUnit(K, KB, T);
    buildBattery(K, T);
    buildFlare(K, T);
    K.flush(g);
    g.add(walkbeam(KB));
    return g;
  }

  return { build: build };
})();

/* Replaces the drilling derrick in units3d_salvage.js. Heroes load after
   it, so the plain assignment wins; icons3d draws the same build() for the
   sidebar button.
   openPlot, as the construction yard declares it: a well pad has no roof
   for render3d's faction kit to stand on. render3d does not read it yet,
   and the follow-up that would read it drops only the faction's fixture;
   bare:true on BUILDINGS.derrick (see the header) drops the period's too,
   and that is what this pad needs. */
BLD_MODELS["derrick"] = { openPlot: true, build: HeroPumpingWell.build };
