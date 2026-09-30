/* ============================================================================
   navalyard_building_slip.js -- HERO model: the Naval Yard, a warship
   building slip with its cranes, hall and fitting-out quay.
   Registered as BLD_MODELS["navalyard"], the one def every faction builds in
   every era (rules.js: 3 x 3 tiles, shore:true). It replaces the salvage
   model in units3d_salvage.js, which loads before the heroes.

   What a naval building berth is, from the photographs read for this file
   (Wikimedia Commons unless said otherwise):
     - "'Tarkash' being launched at Yantar Shipyard, Kaliningrad, Russia on
       June 23, 2010": a frigate standing on keel blocks and steel cradle
       trestles on its berth, the hall it came out of behind it, and the
       yard's level-luffing portal cranes either side with their yellow
       upper jibs over the hull.
     - "Sudostroitelny zavod Yantar" (2008, from the water): the same cranes
       in a row along the quay in front of the construction hall.
     - "Sevastopol. Portal crane" (2012) and "Portalny kran - panoramio"
       (2009): the Soviet double-link level-luffing portal crane seen side
       on - four splayed portal legs, the slewing machinery house with its
       counterweight, the pyramid mast behind the jib foot, the main jib,
       the upper jib (the "trunk") pivoted on its head with the rear link
       back to the mast, and the balance lever with its weight.
     - "Aerial view of General Dynamics Bath Iron Works on the Kennebec
       River" (2026): the big clad construction hall, the rail-mounted
       luffing cranes along the fitting-out pier.
     - "'200 Ton Level Luffing Cranes in Assembly/Integration areas' 2-27-70"
       (Ingalls West Bank, Pascagoula): portal cranes on their own rails
       between the assembly lanes, crane rails let into a concrete apron
       ruled into slabs.
     - "Spb 06-2017 img27 Northern Shipyard" (Severnaya Verf from the air):
       long halls with rooflights down their ridges, quay walls, cranes on
       the quay edges.
   and three texts:
     - ru.wikipedia "Stapel (sudostroenie)": a longitudinal inclined slip
       falls toward the water at 1:12 to 1:24, usually 1:21 to 1:24; it
       carries two to four ground ways; it is served by portal, tower or
       goliath cranes; the hull is built on it parallel to the slope.
     - ru.wikipedia "Kozlovoy kran": a goliath's two supports are each two
       legs, one support rigid and one hinged, box girders below 25 m of
       span and lattice above.
     - en.wikipedia "Level luffing crane": the hook kept level by a horse-
       head (trunk) on the jib head, the gear used where loads are placed
       with care, "such as in construction or shipbuilding".

   Corrections to the survey that commissioned this file:
     - The water is not usually to the west, nor on any one side. Every
       legal 3 x 3 shoreline plot within 40 tiles of each commander's home
       on the fourteen theatres was walked (G.canPlace under jsc, the box
       of the AI's own search) and classed by the plot edge with the most
       water tiles on it. At the seed the 3D checks use, "btest", 761 plots
       on eleven theatres (none on normandy, fulda or donbas): +X 79, -X 51,
       +Y 131, -Y 79, and 421 with no one wettest edge - water on a
       corner, or on two sides. Two other seeds gave 777 and 852 plots and
       the same picture. The plots the AI takes (findShoreSpot, the nearest
       on odd tiles) are corners more often still: of its 18 at each seed,
       13 to 17 have no wettest edge and 8 or 9 touch the water with one
       corner tile. No side can be designed for, and render3d never turns a
       building, so the yard stands on a quay platform walled on ALL four
       sides with bollards, fenders and a ladder on every face: a quay wall
       reads right whether water or a beach meets it, and whichever side a
       ship lies against is a berth. Nothing of the model hangs out past
       the plot edge but the fenders.
     - The ground under a yard is not level, and often not ground. render3d
       sets a building at the height of its plot centre; over those plots
       that runs from the -7 m seabed to hillsides 10 to 18 m up, the
       median is 0.28 m, and 52 per cent are at or under the 0.35 m water
       plane. The AI's picks sit at a median of 2.2 m, the beach crest, and
       that is the plot this model is drawn for: the water plane about
       1.9 m below its z = 0, the apron at +1.0, the quay walls down to
       -8 m, and the fenders and the weed line about that water level. But
       4 to 6 of the 18 picks at each seed are at or under the water (at
       "btest" -7.0, -4.8, -4.0, -2.4, -1.6 and 0.0 m), and on taiwan, the
       default theatre, both are, at every seed: -4.0 and -4.8 m, which
       puts the apron 3.25 and 4.05 m under water and the yard reads as
       sunk (the model this replaces went under entirely). No apron height
       serves both -7 m and +18 m; seating a shore building at the water,
       or on its land tiles, is render3d's to do.
     - A slip is gentle: 1:21 here, from the ru.wikipedia range, not a ramp.
       Over the 37 m it has on the plot it falls 1.76 m.
     - The Ganz cranes of the port of Tallinn are plain luffing lattice
       jibs. The double-link level-luffing jib (main jib, trunk, rear link,
       balance lever) is what the Sevastopol and Yantar photographs show,
       and the "horse-head" gear en.wikipedia ("Level luffing crane") gives
       as the usual level-luffing mechanism; it is the one drawn.
     - Bath Iron Works now assembles its destroyers on a land-level transfer
       facility and floats them off a dry dock; its photographs give the
       hall and the quay cranes, not an inclined slip.

   The layout, in model axes (+X, +Y, +Z up, metres; the plot is 58 m square,
   x and y -29..29, and render3d scales it by CFG.BLD_SCALE, 1.10):
     - the SLIP along X in the -Y half, centreline y -13.5, a 14 m concrete
       slab in a walled trough falling 1:21 from its head at x +8 to the quay
       at x -29, with two ground ways, and on it a 38 x 7.4 m hull in primer
       on keel blocks and cradle trestles, staged along both sides. It is
       built stern down the slip, as a ship launched stern first is. One
       superstructure block is landed on her deck and the next hangs from
       the goliath;
     - the GOLIATH straddling the slip on rails 25.6 m apart: two legs a
       side, one support rigid and braced, the other a plain A; a team-
       coloured box girder, the trolley on it, the cab under it;
     - the PORTAL JIB CRANE on the fitting-out quay (-X edge, +Y half), on
       rails along the quay, its jib slewed out over her stern, lowering her
       propeller to the shaft line;
     - the CONSTRUCTION HALL in the +X +Y quadrant, 28 x 22 m, 18.5 m to the
       eaves, a ridge lantern, sliding doors onto the quay and onto the slip
       head, an office annex; the next hull block, plate stock and site
       cabins on the slip-head apron;
     - on EVERY quay face, not only the -X one the slip runs to: bollards
       along the coping, fenders on chains, a ladder (quayKit, below).

   HEIGHT IS BUDGETED. render3d.js sets the faction's rooftop kit
   (archFixture) at the TOP of the model's bounding box, at fixed spots on
   the plot, and the period's kit (eraFixture) at roofHeightOf(), which on
   a model merged into eight plot-wide meshes is the same top. So the
   hall's lantern is the highest thing here, 21.87 m, and the goliath's
   trolley (20.45 m) and the jib crane's trunk (19.9 m) stay under it:
   every kit piece is set at the height of the lantern on the hall's
   ridge, and stands on the hall only where its spot is over the hall. As
   the review of this file measured it in the real renderer (hormuz, e20
   to e00): the NATO radome and the Pact stack, over the +X +Y quarter,
   stand on the roof; the NATO mast, the Pact banner board, the e20 and
   e00 radome and the e50 chimney, over the -X -Y quarter, stand in the
   air over the slip beside the goliath's trolley; the e80 net and PLA's
   eave slabs, sized to the plot, roof the whole yard at that height.
   Standing each piece on what is under it is render3d's to do; a roof
   over an open slip would be one invented for the engine.
     The same budget keeps the portal crane squat. Its 15.5 m main jib is
   luffed to 30 degrees to reach the propeller 22 m out, so the jib is 1.7
   times the portal's height where the Sevastopol photograph's is about
   three. A jib nearer that, 22 m luffed to 50 degrees, would put its head
   at 28 m, over the lantern, and lift every kit piece 6 m with it. Once
   the renderer stands the kit on what is under it, that is the jib to
   draw.

   COLOUR. Structural surfaces are authored as neutral greys so render3d's
   restyle() gives them the faction's concrete and cladding: the apron and
   quay walls read as "wall2", the cladding as "wall", the roofs as "roof".
   The crane steel is dark enough (linear lightness under 0.08) that neither
   restyle() nor the era tint touches it. The hull's primer is not a
   building material either; its map is multiplied by a warm white whose
   HSL saturation is 1.0, which both passes leave alone, so a ship on the
   slip is primer red and grey in every period. The team colour is exactly
   C.team: the goliath's girder (seen from above along its whole length),
   the band round the hall under its eaves, and the roof of the jib crane's
   machinery house.

   Eight materials, one merged mesh each: eight draw calls. Nothing moves
   (the yard has no weapon for render3d to train), so no part carries a
   name the renderer looks for ("turret", "mountwrap"). Colours are sRGB,
   linearised by prepModel(); canvases are painted once per page and
   shared by every team's build and by icons3d.
   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroNavalYard = (function () {
  "use strict";

  var PI = Math.PI;
  var V = null;                         /* the THREE build() is handed       */

  /* ------------------------------------------------------------- datums */
  var PL = 29.0;                        /* half the plot: 58 m square        */
  var DECK = 1.0;                       /* apron top above the plot origin   */
  var QB = -8.0;                        /* foot of the quay walls            */
  var WL = -1.9;                        /* the water, for an AI-picked plot  */
  /* the slip: centreline, half width of the slab, its head, its fall      */
  var SY = -13.5, SW = 7.0, X_HEAD = 8.0, SLOPE = 1 / 21;
  var TH = Math.atan(SLOPE);
  function slipZ(x) { return x >= X_HEAD ? DECK : DECK - (X_HEAD - x) * SLOPE; }
  /* the ground anywhere on the slip slab or the head apron                */
  function groundZ(x, y) {
    if (Math.abs(y - SY) <= SW && x < X_HEAD) return slipZ(x);
    return DECK;
  }
  /* the hull: transom at x -25, keel blocks 1.3 m high                     */
  var XT = -25.0, KB = 1.3, HL = 38.0;
  /* goliath: centre x, rails either side of the slip (25.6 m gauge)       */
  var GX = -15.0, GR1 = SY - 12.8, GR2 = SY + 12.8;
  var G_Z0 = 16.5, G_Z1 = 18.9;         /* girder underside, top              */
  /* portal jib crane: centre, rails 10.5 m apart along the quay, heading   */
  var JX = -21.4, JY = 8.0, JG = 5.25;
  /* where its hook is: 1.6 m abaft the transom on the centreline, lowering
     her propeller to the shaft. The slew and the luff are worked out from
     it in jibCrane(), so the hook and the propeller cannot part company. */
  var PROP_X = XT - 1.6, PROP_Y = SY;
  /* the hall                                                               */
  var HX0 = 0.0, HX1 = 28.0, HY0 = 6.0, HY1 = 28.0, HE = 18.5;
  var HYC = (HY0 + HY1) / 2, HPITCH = 10 * PI / 180;
  var HR = HE + (HY1 - HYC) * Math.tan(HPITCH);      /* ridge, 20.44 m    */

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ============================================================ canvases
     All four are painted once per page (textures(), below).              */
  var _cv = null;

  /* --- CONCRETE. One 1024 canvas in two parts. Rows 0..799 are the plan
     of the whole plot (top faces sample it by x, y, so every line sits where
     it was ruled); the bottom fifth is the quay-wall elevation (vertical
     faces sample it by height, repeating every 12 m along the wall).      */
  var PW = 1024, PH = 1024, PLAN_V0 = 0.22, WALL_V1 = 0.195;
  function pcol(x) { return (x + PL) / (2 * PL) * PW; }
  function prow(y) { return PH * (1 - PLAN_V0) * (PL - y) / (2 * PL); }
  function wallRow(z) { return PH * (1 - (0.005 + (WALL_V1 - 0.005) * clamp((z - QB) / (DECK + 0.6 - QB), 0, 1))); }
  function concCanvas() {
    var cv = mkCv(PW, PH), g = cv.getContext("2d"), R = rngOf(4417), i, x, y, w;
    var SX = PW / (2 * PL), SYp = PH * (1 - PLAN_V0) / (2 * PL);
    g.fillStyle = "#dedfd9"; g.fillRect(0, 0, PW, PH);
    /* weathering patches, then the slab joints on a 6 m grid             */
    for (i = 0; i < 220; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.55 ? "#8f918a" : "#f4f4ee";
      g.fillRect(R() * PW, R() * PH * 0.8, 20 + R() * 120, 12 + R() * 70);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(40,42,40,0.30)";
    for (x = -PL; x <= PL; x += 6) g.fillRect(pcol(x) - 0.8, 0, 1.6, prow(-PL));
    for (y = -PL; y <= PL; y += 6) g.fillRect(0, prow(y) - 0.8, PW, 1.6);
    /* the roadway between the hall and the goliath rail: tyre-darkened   */
    g.fillStyle = "rgba(60,60,56,0.16)";
    g.fillRect(pcol(-26), prow(5.0), pcol(29) - pcol(-26), prow(0.4) - prow(5.0));
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(40,40,36," + (0.05 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(pcol(-26 + R() * 54), prow(4.2 - R() * 3.2), (4 + R() * 12) * SX, 1.2 + R() * 2);
    }
    /* the slip slab: darker, wet and green toward the toe, grease on the
       ground ways, scorch where the welders work                         */
    var sx0 = pcol(-PL), sx1 = pcol(X_HEAD), sy0 = prow(SY + SW), sy1 = prow(SY - SW);
    g.fillStyle = "#b9bab3"; g.fillRect(sx0, sy0, sx1 - sx0, sy1 - sy0);
    var gr = g.createLinearGradient(sx0, 0, pcol(-10), 0);
    gr.addColorStop(0, "rgba(58,70,54,0.55)"); gr.addColorStop(1, "rgba(58,70,54,0)");
    g.fillStyle = gr; g.fillRect(sx0, sy0, pcol(-10) - sx0, sy1 - sy0);
    [SY - 2.4, SY + 2.4].forEach(function (yy) {
      g.fillStyle = "rgba(34,30,24,0.35)";
      g.fillRect(sx0, prow(yy + 0.9), sx1 - sx0, (1.8) * SYp);
    });
    for (i = 0; i < 70; i++) {
      x = lerp(-26, 7, R()); y = SY + (R() - 0.5) * 12;
      g.fillStyle = "rgba(30,28,24," + (0.10 + R() * 0.18).toFixed(3) + ")";
      g.beginPath(); g.arc(pcol(x), prow(y), 1 + R() * 3.5, 0, 2 * PI); g.fill();
    }
    g.fillStyle = "rgba(20,20,18,0.35)";
    for (x = X_HEAD - 1; x > -PL; x -= 6) g.fillRect(pcol(x) - 0.6, sy0, 1.2, sy1 - sy0);
    /* oil under the crane stations, rust under the plate stacks         */
    function blot(cx, cy, r, col, n) {
      for (var k = 0; k < n; k++) {
        g.fillStyle = col;
        g.beginPath(); g.arc(pcol(cx + (R() - 0.5) * r), prow(cy + (R() - 0.5) * r), (0.3 + R() * 0.8) * SX, 0, 2 * PI); g.fill();
      }
    }
    blot(JX, JY, 9, "rgba(24,22,20,0.10)", 30);
    blot(GX, GR1, 7, "rgba(24,22,20,0.10)", 14);
    blot(GX, GR2, 7, "rgba(24,22,20,0.10)", 14);
    blot(24, -23, 6, "rgba(120,62,30,0.14)", 26);
    blot(13, -23.5, 6, "rgba(120,62,30,0.12)", 20);
    blot(18, -13.5, 9, "rgba(120,62,30,0.08)", 20);
    /* painted lines: yellow walk lines either side of every crane rail,
       a hazard band along the quay edge and the trough edges             */
    g.fillStyle = "#d6ad2a";
    [GR1, GR2].forEach(function (yy) {
      [-1.4, 1.4].forEach(function (d) { g.fillRect(pcol(-PL + 0.6), prow(yy + d) - 1.4, pcol(X_HEAD - 0.5) - pcol(-PL + 0.6), 2.8); });
    });
    [JX - JG, JX + JG].forEach(function (xx) {
      [-1.3, 1.3].forEach(function (d) { g.fillRect(pcol(xx + d) - 1.4, prow(PL - 0.6), 2.8, prow(1.4) - prow(PL - 0.6)); });
    });
    /* a hazard band: yellow and black in 0.6 m blocks along its length   */
    function hazard(x0, y0, x1, y1) {
      var a = pcol(x0), b = prow(y1), c = pcol(x1), d = prow(y0), q;
      g.fillStyle = "#d6ad2a"; g.fillRect(a, b, c - a, d - b);
      g.fillStyle = "#1d1e1c";
      if (c - a > d - b) for (q = a; q < c; q += 1.2 * SX) g.fillRect(q, b, Math.min(0.6 * SX, c - q), d - b);
      else for (q = b; q < d; q += 1.2 * SYp) g.fillRect(a, q, c - a, Math.min(0.6 * SYp, d - q));
    }
    hazard(-PL, SY + SW, -PL + 0.45, PL);
    hazard(-PL, -PL, -PL + 0.45, SY - SW);
    hazard(-PL, SY + SW, X_HEAD, SY + SW + 0.35);
    hazard(-PL, SY - SW - 0.35, X_HEAD, SY - SW);
    /* and along the other three quay edges, any of which may be the berth */
    hazard(PL - 0.45, -PL, PL, PL);
    hazard(-PL, PL - 0.45, PL, PL);
    hazard(-PL, -PL, PL, -PL + 0.45);
    /* a zebra crossing over the goliath rail from the hall door          */
    g.fillStyle = "rgba(236,236,230,0.85)";
    for (i = 0; i < 6; i++) g.fillRect(pcol(10 + i * 1.2), prow(5.6), 0.6 * SX, prow(-3.5) - prow(5.6));
    /* the berth number at the slip head, reading from the head          */
    g.save(); g.translate(pcol(4.6), prow(SY)); g.rotate(PI / 2);
    g.font = "bold " + Math.round(6.5 * SX) + "px Arial"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = "rgba(238,238,232,0.8)"; g.fillText("1", 0, 0);
    g.restore();
    /* drain gratings along the quays, where the apron is open            */
    g.fillStyle = "rgba(20,20,18,0.55)";
    for (y = -2; y < 28; y += 6) g.fillRect(pcol(-27.6), prow(y + 0.4), 0.7 * SX, 0.8 * SYp);
    for (y = -26; y < 0; y += 6) g.fillRect(pcol(26.9), prow(y + 0.4), 0.7 * SX, 0.8 * SYp);
    for (x = -26; x < -1; x += 6) g.fillRect(pcol(x - 0.4), prow(27.6), 0.8 * SX, 0.7 * SYp);
    for (x = -26; x < 18; x += 6) g.fillRect(pcol(x - 0.4), prow(-27.9), 0.8 * SX, 0.55 * SYp);

    /* ---- the quay-wall elevation band: formwork panels, lift joints,
       a weed and tide zone below the water line, rust from the coping    */
    var r0 = wallRow(DECK + 0.6), r1 = PH;
    g.fillStyle = "#d4d4cd"; g.fillRect(0, r0 - 18, PW, r1 - r0 + 18);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.6 ? "#7f817a" : "#f2f2ec";
      g.fillRect(R() * PW, r0 + R() * (r1 - r0), 20 + R() * 90, 4 + R() * 20);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(30,30,28,0.30)";
    for (x = 0; x < PW; x += PW / 4) g.fillRect(x, r0, 2, r1 - r0);
    [DECK - 0.5, -2.5, -5.0].forEach(function (zz) { g.fillRect(0, wallRow(zz), PW, 1.5); });
    var tz = wallRow(WL + 0.9), tb = wallRow(WL - 0.8);
    var tg = g.createLinearGradient(0, tz, 0, tb);
    tg.addColorStop(0, "rgba(64,70,52,0)"); tg.addColorStop(1, "rgba(52,60,40,0.70)");
    g.fillStyle = tg; g.fillRect(0, tz, PW, tb - tz);
    g.fillStyle = "rgba(40,48,32,0.72)"; g.fillRect(0, tb, PW, r1 - tb);
    for (i = 0; i < 60; i++) {
      w = 1.5 + R() * 3; x = R() * PW;
      var rg = g.createLinearGradient(0, r0, 0, r0 + 20 + R() * 60);
      rg.addColorStop(0, "rgba(110,62,32,0.30)"); rg.addColorStop(1, "rgba(110,62,32,0)");
      g.fillStyle = rg; g.fillRect(x, r0, w, 80);
    }
    return cv;
  }

  /* --- CLADDING. Two bands, each repeating every 12 m along a wall. The
     upper three quarters is the hall: a concrete plinth to 1.2 m, profiled
     sheeting, a continuous clerestory at 13-15 m. The bottom quarter is the
     office annex: two storeys of punched windows.                          */
  var CLW = 512, CLH = 512, CL_TILE = 12;
  function hallRow(z) { return CLH * (1 - (0.25 + 0.745 * clamp(z / 20, 0, 1))); }
  function annexRow(z) { return CLH * (1 - (0.01 + 0.22 * clamp(z / 8, 0, 1))); }
  function cladCanvas() {
    var cv = mkCv(CLW, CLH), g = cv.getContext("2d"), R = rngOf(9311), i, x;
    var PX = CLW / CL_TILE;
    g.fillStyle = "#e4e5e0"; g.fillRect(0, 0, CLW, CLH);
    /* profiled sheeting: a shadowed and a lit line every 0.3 m           */
    for (x = 0; x < CLW; x += 0.3 * PX) {
      g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(x, 0, 1.2, CLH);
      g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(x + 2, 0, 1, CLH);
    }
    /* the hall band                                                       */
    g.fillStyle = "#a9aaa3"; g.fillRect(0, hallRow(1.2), CLW, hallRow(0) - hallRow(1.2));
    g.fillStyle = "rgba(0,0,0,0.3)"; g.fillRect(0, hallRow(1.2), CLW, 2);
    [6.0, 12.0, 16.5].forEach(function (zz) { g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, hallRow(zz), CLW, 1.5); });
    g.fillStyle = "#2b3640"; g.fillRect(0, hallRow(15.0), CLW, hallRow(13.0) - hallRow(15.0));
    g.fillStyle = "rgba(170,190,200,0.22)"; g.fillRect(0, hallRow(15.0), CLW, (hallRow(13.0) - hallRow(15.0)) * 0.4);
    g.fillStyle = "#c9cbc6";
    for (x = 0; x < CLW; x += 1.5 * PX) g.fillRect(x, hallRow(15.0), 2.5, hallRow(13.0) - hallRow(15.0));
    g.fillRect(0, hallRow(14.0), CLW, 1.5);
    /* streaks from the gutters and dirt splashed up the plinth           */
    for (i = 0; i < 50; i++) {
      x = R() * CLW;
      var sg = g.createLinearGradient(0, hallRow(18.4), 0, hallRow(18.4 - 3 - R() * 8));
      sg.addColorStop(0, "rgba(70,66,58,0.22)"); sg.addColorStop(1, "rgba(70,66,58,0)");
      g.fillStyle = sg; g.fillRect(x, hallRow(18.4), 1.5 + R() * 3, hallRow(6) - hallRow(18.4));
    }
    var dg = g.createLinearGradient(0, hallRow(3), 0, hallRow(0));
    dg.addColorStop(0, "rgba(80,74,62,0)"); dg.addColorStop(1, "rgba(80,74,62,0.35)");
    g.fillStyle = dg; g.fillRect(0, hallRow(3), CLW, hallRow(0) - hallRow(3));
    /* the annex band: panels and two rows of windows, 3 m pitch          */
    var a0 = annexRow(8), a1 = CLH;
    g.fillStyle = "#e8e8e2"; g.fillRect(0, a0 - 4, CLW, a1 - a0 + 4);
    g.fillStyle = "rgba(0,0,0,0.14)";
    for (x = 0; x < CLW; x += 1.5 * PX) g.fillRect(x, a0, 1.2, a1 - a0);
    g.fillRect(0, annexRow(3.9), CLW, 1.5);
    [[1.4, 2.8], [4.8, 6.2]].forEach(function (b) {
      for (x = 0.8; x < CL_TILE; x += 3) {
        g.fillStyle = "#56585a"; g.fillRect(x * PX - 2, annexRow(b[1]) - 2, 1.6 * PX + 4, annexRow(b[0]) - annexRow(b[1]) + 4);
        g.fillStyle = "#26313b"; g.fillRect(x * PX, annexRow(b[1]), 1.6 * PX, annexRow(b[0]) - annexRow(b[1]));
        g.fillStyle = "rgba(180,200,210,0.25)"; g.fillRect(x * PX, annexRow(b[1]), 0.7 * PX, (annexRow(b[0]) - annexRow(b[1])) * 0.5);
      }
    });
    g.fillStyle = "#9b9c96"; g.fillRect(0, annexRow(0.5), CLW, a1 - annexRow(0.5));
    return cv;
  }

  /* --- ROOF: standing seams across the slope every 0.5 m, rooflight
     panels in rows, rust at the laps, a few patches. 16 m a tile.         */
  var RF_TILE = 16;
  function roofCanvas() {
    var cv = mkCv(256, 256), g = cv.getContext("2d"), R = rngOf(5503), i, y;
    var PX = 256 / RF_TILE;
    g.fillStyle = "#b9bbb8"; g.fillRect(0, 0, 256, 256);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.6 ? "#6e706c" : "#e2e3df";
      g.fillRect(R() * 256, R() * 256, 10 + R() * 60, 10 + R() * 60);
    }
    g.globalAlpha = 1;
    for (y = 0; y < 256; y += 0.5 * PX) {
      g.fillStyle = "rgba(0,0,0,0.16)"; g.fillRect(0, y, 256, 1);
      g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, y + 1.5, 256, 1);
    }
    /* rooflights: translucent sheets, 1 m by 3 m, every 4 m               */
    for (var x = 1; x < RF_TILE; x += 4) for (y = 2; y < RF_TILE; y += 8) {
      g.fillStyle = "rgba(206,214,210,0.85)"; g.fillRect(x * PX, y * PX, 1.0 * PX, 3.0 * PX);
      g.fillStyle = "rgba(0,0,0,0.2)"; g.strokeStyle = "rgba(0,0,0,0.25)"; g.strokeRect(x * PX, y * PX, 1.0 * PX, 3.0 * PX);
    }
    for (i = 0; i < 26; i++) {
      g.fillStyle = "rgba(118,70,40," + (0.08 + R() * 0.12).toFixed(3) + ")";
      g.fillRect(R() * 256, R() * 256, 2 + R() * 8, 1 + R() * 3);
    }
    return cv;
  }

  /* --- HULL: primer by blocks. The side band (v 0.01..0.61) is 0..8 m above
     the keel: red-brown anti-fouling primer to the 2.3 m line, grey shop
     primer above, blocks 6 m long in slightly different shades, their weld
     seams, chalk marks. v 0.66..0.96 is the deck, dark green-grey primer.
     Two flat patches for parts that point their UVs at one texel: timber
     (keel block caps, planks) along the top, rust (plate stock) under the
     deck band.                                                            */
  var HU_L = 40, HU_X0 = XT - 1.0;
  function hullCanvas() {
    var cv = mkCv(512, 512), g = cv.getContext("2d"), R = rngOf(2216), i, bx;
    function row(h) { return 512 * (1 - (0.01 + 0.60 * clamp(h / 8, 0, 1))); }
    function col(x) { return (x - HU_X0) / HU_L * 512; }
    var PX = 512 / HU_L;
    g.fillStyle = "#838986"; g.fillRect(0, 0, 512, 512);
    for (bx = HU_X0; bx < HU_X0 + HU_L; bx += 6) {
      [[2.3, 4.6], [4.6, 8]].forEach(function (b) {
        var t = R();
        g.fillStyle = t < 0.3 ? "#8f9793" : t < 0.55 ? "#7b817e" : t < 0.7 ? "#9aa29a" : "#858b88";
        g.fillRect(col(bx), row(b[1]), 6 * PX, row(b[0]) - row(b[1]));
      });
    }
    g.fillStyle = "#6f3024"; g.fillRect(0, row(2.3), 512, row(0) - row(2.3));
    for (bx = HU_X0; bx < HU_X0 + HU_L; bx += 6) {
      g.fillStyle = R() < 0.5 ? "rgba(140,64,44,0.35)" : "rgba(60,24,18,0.25)";
      g.fillRect(col(bx), row(2.3), 6 * PX, row(0) - row(2.3));
    }
    /* weld seams on the block grid, butts staggered                      */
    g.fillStyle = "rgba(30,30,28,0.42)";
    [1.2, 2.3, 3.5, 4.6, 6.2].forEach(function (h) { g.fillRect(0, row(h), 512, 1.5); });
    for (bx = HU_X0; bx < HU_X0 + HU_L; bx += 6) g.fillRect(col(bx), row(8), 1.5, row(0) - row(8));
    /* touch-up primer over the seams, chalk marks, drips                  */
    for (i = 0; i < 30; i++) {
      g.fillStyle = "rgba(150,70,48,0.35)";
      g.fillRect(R() * 512, row(2.3 + R() * 5), 3 + R() * 10, 2 + R() * 3);
    }
    g.fillStyle = "rgba(235,235,225,0.55)";
    for (i = 0; i < 26; i++) g.fillRect(R() * 512, row(1 + R() * 6), 6 + R() * 12, 1);
    for (i = 0; i < 20; i++) {
      var dx = R() * 512, dy = row(3 + R() * 5);
      var dgr = g.createLinearGradient(0, dy, 0, dy + 30);
      dgr.addColorStop(0, "rgba(90,46,30,0.25)"); dgr.addColorStop(1, "rgba(90,46,30,0)");
      g.fillStyle = dgr; g.fillRect(dx, dy, 2, 30);
    }
    /* the deck                                                            */
    var d0 = 512 * (1 - 0.96), d1 = 512 * (1 - 0.66);
    g.fillStyle = "#5b655c"; g.fillRect(0, d0, 512, d1 - d0);
    g.fillStyle = "rgba(0,0,0,0.25)";
    for (bx = HU_X0; bx < HU_X0 + HU_L; bx += 3) g.fillRect(col(bx), d0, 1.2, d1 - d0);
    g.fillRect(0, (d0 + d1) / 2, 512, 1.2);
    for (i = 0; i < 18; i++) {
      g.fillStyle = "rgba(160,80,50,0.25)";
      g.fillRect(R() * 512, d0 + R() * (d1 - d0), 6 + R() * 16, 3 + R() * 6);
    }
    /* timber and rust patches                                              */
    g.fillStyle = "#8b6b45"; g.fillRect(0, 0, 512, 512 * 0.03);
    g.fillStyle = "rgba(60,40,20,0.3)"; for (i = 0; i < 512; i += 9) g.fillRect(i, 0, 1, 512 * 0.03);
    g.fillStyle = "#7a4631"; g.fillRect(0, 512 * (1 - 0.655), 512, 512 * 0.03);
    return cv;
  }

  function tex(cv, rep) {
    var t = new V.CanvasTexture(cv);
    t.wrapS = rep ? V.RepeatWrapping : V.ClampToEdgeWrapping;
    t.wrapT = V.ClampToEdgeWrapping;
    /* r148: encoding is the switch that works; colorSpace does nothing */
    if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  /* The paintings depend on nothing but the yard, so the textures are made
     once and every build shares them, as the Ford's are: render3d builds
     this key once per team and era, icons3d once more, and each would
     otherwise hold its own 1.4 M texels. Nothing in the game disposes a map. */
  var _tx = null;
  function textures() {
    if (_tx) return _tx;
    if (!_cv) _cv = { conc: concCanvas(), clad: cladCanvas(), roof: roofCanvas(), hull: hullCanvas() };
    _tx = { conc: tex(_cv.conc, true), clad: tex(_cv.clad, true), roof: tex(_cv.roof, true), hull: tex(_cv.hull, true) };
    return _tx;
  }

  /* ================================================================ UVs
     Each batch lays its UVs from each triangle's own facing, so a part only
     has to be put in the right batch. A part can instead point every UV at
     one texel (an [u, v] pair).                                           */
  function uvConc(x, y, z, nx, ny, nz) {
    if (nz > 0.55) return [(x + PL) / (2 * PL), PLAN_V0 + (1 - PLAN_V0) * clamp((y + PL) / (2 * PL), 0, 1)];
    var along = Math.abs(nx) > Math.abs(ny) ? y : x;
    return [along / 12, 0.005 + (WALL_V1 - 0.005) * clamp((z - QB) / (DECK + 0.6 - QB), 0, 1)];
  }
  function uvHall(x, y, z, nx, ny, nz) {
    var along = Math.abs(nx) > Math.abs(ny) ? y : x;
    return [along / CL_TILE, 0.25 + 0.745 * clamp((z - DECK) / 20, 0, 1)];
  }
  function uvAnnex(x, y, z, nx, ny, nz) {
    var along = Math.abs(nx) > Math.abs(ny) ? y : x;
    return [along / CL_TILE, 0.01 + 0.22 * clamp((z - DECK) / 8, 0, 1)];
  }
  function uvRoof(x, y, z, nx, ny, nz) {
    if (Math.abs(nz) > 0.5) return [x / RF_TILE, y / RF_TILE];
    return [(Math.abs(nx) > Math.abs(ny) ? y : x) / RF_TILE, z / RF_TILE];
  }
  /* the hull is mapped in the slip's frame: height above the keel line   */
  function keelZ(x) { return slipZ(XT) + KB + (x - XT) * SLOPE; }
  function uvHull(x, y, z, nx, ny, nz) {
    var u = (x - HU_X0) / HU_L;
    if (nz > 0.7) return [u, 0.66 + 0.30 * clamp((y - SY + 5) / 10, 0, 1)];
    return [u, 0.01 + 0.60 * clamp((z - keelZ(Math.min(x, X_HEAD + 2))) / 8, 0, 1)];
  }
  var UV_TIMBER = [0.5, 0.985], UV_RUST = [0.5, 0.64];

  /* ============================================================= batching
     One Batch per material, out as one mesh. add() takes any three.js
     geometry already placed in model space; normals are kept (a cylinder
     stays smooth, a box stays crisp), the UVs are laid by the batch's rule
     from each triangle's face normal.                                     */
  function Batch(uvf) { this.p = []; this.n = []; this.u = []; this.uvf = uvf; }
  Batch.prototype.add = function (geo, uvf) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position").array, N = g.getAttribute("normal").array;
    var f = uvf || this.uvf, t, k;
    for (t = 0; t + 8 < P.length; t += 9) {
      var ux = P[t + 3] - P[t], uy = P[t + 4] - P[t + 1], uz = P[t + 5] - P[t + 2];
      var vx = P[t + 6] - P[t], vy = P[t + 7] - P[t + 1], vz = P[t + 8] - P[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (l < 1e-10) continue;                                /* degenerate */
      nx /= l; ny /= l; nz /= l;
      for (k = 0; k < 3; k++) {
        var o = t + k * 3;
        this.p.push(P[o], P[o + 1], P[o + 2]);
        this.n.push(N[o], N[o + 1], N[o + 2]);
        var uv = typeof f === "function" ? f(P[o], P[o + 1], P[o + 2], nx, ny, nz) : (f || [0, 0]);
        this.u.push(uv[0], uv[1]);
      }
    }
    return this;
  };
  Batch.prototype.mesh = function (mtl, name) {
    if (!this.p.length) return null;
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    var m = new V.Mesh(g, mtl);
    m.name = name;
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* A flat triangle soup for the hand-laid surfaces (the platform, the
     hull, the hall). tri() turns each face to face AWAY from a hint point,
     which settles the winding without having to think about it.          */
  function Soup() { this.p = []; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-12) return;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0], cy = (a[1] + b[1] + c[1]) / 3 - away[1], cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
  };
  /* a face given its outward direction instead of a hint point            */
  Soup.prototype.quadN = function (a, b, c, d, n) {
    var m = [(a[0] + c[0]) / 2 - n[0], (a[1] + c[1]) / 2 - n[1], (a[2] + c[2]) / 2 - n[2]];
    this.tri(a, b, c, m); this.tri(a, c, d, m);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.geo = function () {
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(this.p, 3));
    g.computeVertexNormals();                      /* non-indexed: flat    */
    return g;
  };

  /* ------------------------------------------------------ part helpers */
  var _o = null;
  function place(geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new V.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }
  function box(lx, ly, lz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz);
  }
  /* box from its corners                                                   */
  function bb(x0, x1, y0, y1, z0, z1) {
    return box(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  }
  /* vertical cylinder standing on z0                                       */
  function cylZ(rt, rb, h, seg, x, y, z0, open) {
    var g = new V.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(g, x, y, z0 + h / 2);
  }
  /* a bar from a to b: round, or square with seg 4                         */
  var _v0 = null, _v1 = null;
  function strut(a, b, r, seg, r2, open) {
    if (!_v0) { _v0 = new V.Vector3(0, 1, 0); _v1 = new V.Vector3(); }
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 6, 1, !!open);
    if (seg === 4) g.rotateY(PI / 4);                /* faces, not edges, square */
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize()));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* a rectangular bar from a to b, w x h across it. Without its end caps
     unless asked: rails, planks, poles and ties have ends that are buried
     or too small to see; a beam whose end shows is capped.               */
  function rod(a, b, w, h, capped) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    /* a unit square tube, rescaled to w x h across its axis                */
    var g = new V.CylinderGeometry(Math.SQRT1_2, Math.SQRT1_2, L, 4, 1, !capped);
    g.rotateY(PI / 4);
    g.scale(w, 1, h);
    /* the tube's across-axes: local x (w) and local z (h); lay it along
       the segment with local z kept as near up as the segment allows      */
    var d = new V.Vector3(dx, dy, dz).normalize();
    var up = Math.abs(d.z) > 0.95 ? new V.Vector3(1, 0, 0) : new V.Vector3(0, 0, 1);
    var sx = new V.Vector3().crossVectors(d, up).normalize();
    var sz = new V.Vector3().crossVectors(sx, d).normalize();
    var m = new V.Matrix4().makeBasis(sx, d, sz);
    g.applyMatrix4(m);
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }

  /* =============================================================== parts */

  /* ---- the platform: apron, the slip trough, quay walls on four sides */
  function platform(B) {
    var S = new Soup(), sw0 = SY - SW, sw1 = SY + SW, zt = slipZ(-PL);
    var UP = [0, 0, 1];
    /* the apron, around the trough                                       */
    S.quadN([-PL, -PL, DECK], [PL, -PL, DECK], [PL, sw0, DECK], [-PL, sw0, DECK], UP);
    S.quadN([-PL, sw1, DECK], [PL, sw1, DECK], [PL, PL, DECK], [-PL, PL, DECK], UP);
    S.quadN([X_HEAD, sw0, DECK], [PL, sw0, DECK], [PL, sw1, DECK], [X_HEAD, sw1, DECK], UP);
    /* the slip slab, in four lengths so the 1:21 fall reads in the plan   */
    var xs = [-PL, -20, -10, 0, X_HEAD];
    for (var i = 0; i < xs.length - 1; i++) {
      S.quadN([xs[i], sw0, slipZ(xs[i])], [xs[i + 1], sw0, slipZ(xs[i + 1])],
              [xs[i + 1], sw1, slipZ(xs[i + 1])], [xs[i], sw1, slipZ(xs[i])], UP);
      /* the trough walls, facing into the trough                          */
      S.quadN([xs[i], sw0, slipZ(xs[i])], [xs[i + 1], sw0, slipZ(xs[i + 1])],
              [xs[i + 1], sw0, DECK], [xs[i], sw0, DECK], [0, 1, 0]);
      S.quadN([xs[i], sw1, slipZ(xs[i])], [xs[i + 1], sw1, slipZ(xs[i + 1])],
              [xs[i + 1], sw1, DECK], [xs[i], sw1, DECK], [0, -1, 0]);
    }
    /* quay walls: the four outer faces, down to QB. The -X face is cut
       down to the slip where the trough meets it.                         */
    var C = 0.3;                                    /* coping overhang       */
    S.quadN([-PL, -PL, QB], [PL, -PL, QB], [PL, -PL, DECK - 0.55], [-PL, -PL, DECK - 0.55], [0, -1, 0]);
    S.quadN([-PL, PL, QB], [PL, PL, QB], [PL, PL, DECK - 0.55], [-PL, PL, DECK - 0.55], [0, 1, 0]);
    S.quadN([PL, -PL, QB], [PL, PL, QB], [PL, PL, DECK - 0.55], [PL, -PL, DECK - 0.55], [1, 0, 0]);
    S.quadN([-PL, -PL, QB], [-PL, sw0, QB], [-PL, sw0, DECK - 0.55], [-PL, -PL, DECK - 0.55], [-1, 0, 0]);
    S.quadN([-PL, sw1, QB], [-PL, PL, QB], [-PL, PL, DECK - 0.55], [-PL, sw1, DECK - 0.55], [-1, 0, 0]);
    S.quadN([-PL, sw0, QB], [-PL, sw1, QB], [-PL, sw1, zt - 0.4], [-PL, sw0, zt - 0.4], [-1, 0, 0]);
    B.conc.add(S.geo());
    /* the coping: a cap beam 0.3 m proud all round, its top flush with
       the apron. Along the trough mouth it steps down to the slip.        */
    var cz0 = DECK - 0.55, cz1 = DECK;
    B.conc.add(bb(-PL - C, PL + C, -PL - C, -PL, cz0, cz1));
    B.conc.add(bb(-PL - C, PL + C, PL, PL + C, cz0, cz1));
    B.conc.add(bb(PL, PL + C, -PL, PL, cz0, cz1));
    B.conc.add(bb(-PL - C, -PL, -PL, sw0, cz0, cz1));
    B.conc.add(bb(-PL - C, -PL, sw1, PL, cz0, cz1));
    B.conc.add(bb(-PL - C, -PL, sw0, sw1, zt - 0.4, zt));
  }

  /* ---- rails, ways and the railings along the trough ----------------- */
  function railsAndWays(B) {
    /* goliath rails, either side of the slip, with buffer stops           */
    [GR1, GR2].forEach(function (ry) {
      B.dark.add(rod([-PL + 0.4, ry, DECK + 0.07], [X_HEAD - 0.6, ry, DECK + 0.07], 0.22, 0.14));
      [-PL + 0.9, X_HEAD - 1.1].forEach(function (bx) {
        B.yellow.add(bb(bx - 0.4, bx + 0.4, ry - 0.5, ry + 0.5, DECK, DECK + 0.9));
      });
    });
    /* the jib crane's rails along the quay                                */
    [JX - JG, JX + JG].forEach(function (rx) {
      B.dark.add(rod([rx, 1.4, DECK + 0.07], [rx, PL - 0.4, DECK + 0.07], 0.22, 0.14));
      B.yellow.add(bb(rx - 0.5, rx + 0.5, 1.5, 2.3, DECK, DECK + 0.9));
      B.yellow.add(bb(rx - 0.5, rx + 0.5, PL - 1.2, PL - 0.4, DECK, DECK + 0.9));
    });
    /* two ground ways on the slip, timber on concrete, 4.8 m apart        */
    [SY - 2.4, SY + 2.4].forEach(function (wy) {
      var a = [-PL + 0.2, wy, slipZ(-PL + 0.2) + 0.12], b = [X_HEAD - 0.5, wy, slipZ(X_HEAD - 0.5) + 0.12];
      B.hull.add(rod(a, b, 0.9, 0.24, true), UV_TIMBER);
    });
    /* safety rails along both trough edges, 1.1 m, posts every 3.7 m     */
    [SY - SW - 0.25, SY + SW + 0.25].forEach(function (ry) {
      [1.1, 0.55].forEach(function (h) {
        B.yellow.add(rod([-PL + 0.3, ry, DECK + h], [X_HEAD - 0.3, ry, DECK + h], 0.06, 0.06));
      });
      for (var x = -PL + 0.3; x <= X_HEAD; x += 3.7)
        B.yellow.add(rod([x, ry, DECK], [x, ry, DECK + 1.13], 0.07, 0.07));
    });
  }

  /* ---- the hull on the slip ------------------------------------------
     Built in its own frame (x from the transom forward, z up from the keel
     line, y to port) and laid on the slip at its declivity. A patrol-ship
     sized hull, 38 m by 7.4 m, 4.6 m deep amidships with a sheer rising to
     5.85 m at the stem: round bilge, a raked stem with flare, a transom.
     Warships this long are about five beams long - en.wikipedia gives the
     Osa (Pr.205) 38.6 x 7.64 m, the Shershen (Pr.206) 34.08 x 6.72 m, the
     Island class 110 x 21 ft (33.5 x 6.4 m), the Svetlyak 49.2 x 9.2 m -
     so she is 5.1: the first cut, 8.4 m in the beam (4.5), looked from
     above like a tug. Every half-breadth below is that cut's times 0.88;
     the keel blocks and cradles are laid off the table and came in with
     it, and the staging was brought in to match.
     Stations: x, half-breadth at the deck edge, at the bilge, bilge height,
     deck height, and the rise of the bottom centreline off the keel line
     (the run aft, the forefoot forward).                                   */
  var HST = [
    [0.0, 3.12, 2.82, 1.40, 4.72, 1.05], [2.5, 3.38, 3.10, 1.12, 4.64, 0.58],
    [6.0, 3.59, 3.31, 0.96, 4.59, 0.18], [11.0, 3.70, 3.40, 0.90, 4.58, 0.0],
    [17.0, 3.70, 3.38, 0.92, 4.60, 0.0], [22.0, 3.64, 3.20, 1.00, 4.70, 0.0],
    [26.5, 3.40, 2.66, 1.18, 4.88, 0.0], [30.0, 2.90, 1.87, 1.48, 5.12, 0.02],
    [32.8, 2.31, 1.14, 1.95, 5.38, 0.22], [34.8, 1.64, 0.55, 2.55, 5.58, 0.80],
    [36.4, 0.95, 0.19, 3.30, 5.73, 1.95], [37.4, 0.40, 0.05, 4.20, 5.81, 3.20],
    [38.0, 0.04, 0.02, 5.00, 5.85, 4.70]
  ];
  function hsec(s) {
    /* keel, bottom, bilge, lower side, upper side, deck edge; y >= 0     */
    var x = s[0], hbD = s[1], hbC = s[2], zC = Math.max(s[3], s[5] + 0.05), zD = s[4], zK = s[5];
    return [[0, zK], [0.55 * hbC, zK + 0.28 * (zC - zK)], [hbC, zC],
            [lerp(hbC, hbD, 0.6), lerp(zC, zD, 0.35)], [lerp(hbC, hbD, 0.9), lerp(zC, zD, 0.7)], [hbD, zD]];
  }
  function stationAt(xl) {
    for (var i = 0; i < HST.length - 1; i++) {
      var a = HST[i], b = HST[i + 1];
      if (xl >= a[0] && xl <= b[0]) {
        var t = (xl - a[0]) / (b[0] - a[0]), o = [xl];
        for (var k = 1; k < 6; k++) o.push(lerp(a[k], b[k], t));
        return o;
      }
    }
    return HST[xl < 0 ? 0 : HST.length - 1];
  }
  /* the underside of the hull at station xl, half-breadth y              */
  function bottomAt(xl, y) {
    var p = hsec(stationAt(xl)), ay = Math.abs(y);
    for (var i = 0; i < p.length - 1; i++)
      if (ay >= p[i][0] && ay <= p[i + 1][0] && p[i + 1][0] > p[i][0])
        return lerp(p[i][1], p[i + 1][1], (ay - p[i][0]) / (p[i + 1][0] - p[i][0]));
    return p[p.length - 1][1];
  }
  function hullParts() {
    var P = { hull: [], dark: [], steel: [] }, i, j, s;
    var S = new Soup(), D = new Soup();
    var secs = HST.map(hsec);
    for (i = 0; i < HST.length - 1; i++) {
      var x0 = HST[i][0], x1 = HST[i + 1][0];
      for (s = -1; s <= 1; s += 2) {
        for (j = 0; j < secs[i].length - 1; j++) {
          var a = [x0, s * secs[i][j][0], secs[i][j][1]], b = [x1, s * secs[i + 1][j][0], secs[i + 1][j][1]];
          var c = [x1, s * secs[i + 1][j + 1][0], secs[i + 1][j + 1][1]], d = [x0, s * secs[i][j + 1][0], secs[i][j + 1][1]];
          /* outward: away from the centreline at the face's own height. A
             half-section is convex, so every outward normal leans away from
             the centreline; a fixed hint point low in the hull turned the
             faces of the tall narrow forefoot inside out                   */
          var hint = [(x0 + x1) / 2, 0, (a[2] + b[2] + c[2] + d[2]) / 4];
          S.quad(a, b, c, d, hint);
        }
      }
      /* the deck, flat between the deck edges                             */
      var e0 = secs[i][5], e1 = secs[i + 1][5];
      D.quad([x0, -e0[0], e0[1]], [x1, -e1[0], e1[1]], [x1, e1[0], e1[1]], [x0, e0[0], e0[1]], [(x0 + x1) / 2, 0, -20]);
    }
    /* the transom: a fan over the stern section, facing aft               */
    var t0 = secs[0], cz = 0, ring = [];
    for (j = t0.length - 1; j >= 0; j--) ring.push([0, t0[j][0], t0[j][1]]);
    for (j = 1; j < t0.length; j++) ring.push([0, -t0[j][0], t0[j][1]]);
    ring.forEach(function (q) { cz += q[2]; });
    var ctr = [0, 0, cz / ring.length];
    for (j = 0; j < ring.length - 1; j++) S.tri(ctr, ring[j], ring[j + 1], [5, 0, ctr[2]]);
    /* and the fan's last blade, from the -Y deck edge back to the +Y one:
       without it the transom had a 7 m by 2.2 m hole under the deck edge */
    S.tri(ctr, ring[ring.length - 1], ring[0], [5, 0, ctr[2]]);
    /* the stem head: the last station closed with a sliver facing forward */
    var tl = secs[secs.length - 1];
    for (j = 0; j < tl.length - 1; j++)
      S.quad([HL, tl[j][0], tl[j][1]], [HL, tl[j + 1][0], tl[j + 1][1]], [HL, -tl[j + 1][0], tl[j + 1][1]], [HL, -tl[j][0], tl[j][1]], [HL - 3, 0, 3]);
    P.hull.push(S.geo(), D.geo());
    /* the bulwark at the bow, 0.9 m, standing on the deck edge from 31.5 m
       to the stem head in three straight runs that follow its curve       */
    var bw = [31.5, 34.0, 36.3, 37.6].map(function (xl) {
      var st = stationAt(xl);
      return [xl, st[1] - 0.04, st[4]];
    });
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < bw.length - 1; j++)
        P.hull.push(rod([bw[j][0], s * bw[j][1], bw[j][2]], [bw[j + 1][0], s * bw[j + 1][1], bw[j + 1][2]], 0.08, 0.9).translate(0, 0, 0.45));
    }
    /* deck openings not yet closed: dark hatches and a machinery-space
       opening aft, where the engines will go in                           */
    [[7.0, 11.5, -1.4, 1.4], [24.0, 26.0, -0.88, 0.88], [28.4, 29.8, -0.7, 0.7], [3.0, 4.4, 1.4, 2.3]].forEach(function (h) {
      P.dark.push(bb(h[0], h[1], h[2], h[3], 4.56, 4.66));
    });
    /* the first superstructure block, landed amidships: primer, its door
       openings dark, a lifting lug on each corner. 5.6 m across, leaving
       the 0.9 m side decks a hull of this beam has                         */
    P.hull.push(bb(14.6, 20.8, -2.8, 2.8, 4.58, 7.25));
    [[16.2, 2.81], [19.0, -2.81]].forEach(function (d) {
      P.dark.push(bb(d[0] - 0.45, d[0] + 0.45, d[1] - 0.04, d[1] + 0.04, 4.8, 6.6));
    });
    P.dark.push(bb(20.79, 20.86, -1.9, 1.9, 6.2, 6.9));
    [[14.8, 2.6], [14.8, -2.6], [20.6, 2.6], [20.6, -2.6]].forEach(function (d) {
      P.steel.push(bb(d[0] - 0.12, d[0] + 0.12, d[1] - 0.06, d[1] + 0.06, 7.25, 7.6));
    });
    return P;
  }
  function hullMatrix() {
    var m = new V.Matrix4().makeRotationY(-TH);
    m.setPosition(XT, SY, slipZ(XT) + KB);
    return m;
  }
  function hull(B) {
    var P = hullParts(), m = hullMatrix();
    P.hull.forEach(function (g) { B.hull.add(g.applyMatrix4(m)); });
    P.dark.forEach(function (g) { B.dark.add(g.applyMatrix4(m)); });
    P.steel.forEach(function (g) { B.steel.add(g.applyMatrix4(m)); });
    var i, s, xl, wx, gz, bz;
    /* keel blocks every 1.8 m: a steel stand and a timber cap, ground to
       the bottom of the keel, where the keel runs straight                */
    for (xl = 3.6; xl < 34; xl += 1.8) {
      var zk = bottomAt(xl, 0);
      if (zk > 0.5) continue;
      wx = XT + xl * Math.cos(TH);
      gz = groundZ(wx, SY);
      bz = keelZ(wx) + zk;
      B.steel.add(bb(wx - 0.45, wx + 0.45, SY - 0.75, SY + 0.75, gz, bz - 0.32));
      B.hull.add(bb(wx - 0.5, wx + 0.5, SY - 0.8, SY + 0.8, bz - 0.32, bz), UV_TIMBER);
    }
    /* cradle trestles under the bilges every 5.4 m, on the ground ways:
       steel frames with a timber cap cut to the hull                       */
    for (xl = 5.4; xl < 32; xl += 5.4) {
      wx = XT + xl * Math.cos(TH);
      for (s = -1; s <= 1; s += 2) {
        var yy = s * 2.4;
        /* forward her bilge comes in over the way: the frame, its brace and
           the cap stop at the turn of the bilge, not out in the air past it */
        var yo = Math.min(3.3, stationAt(xl)[2] - 0.05);
        gz = groundZ(wx, SY + yy);
        bz = keelZ(wx) + bottomAt(xl, yy);
        B.steel.add(bb(wx - 0.35, wx + 0.35, SY + s * 1.85, SY + s * Math.min(2.95, yo), gz + 0.24, bz - 0.25));
        B.steel.add(strut([wx - 0.3, SY + s * 2.0, gz + 0.3], [wx - 0.3, SY + s * yo, bz - 0.35], 0.07, 4));
        B.hull.add(bb(wx - 0.4, wx + 0.4, SY + s * 1.8, SY + s * Math.min(3.0, yo), bz - 0.25, bz + 0.05), UV_TIMBER);
      }
    }
    /* staging along both sides: poles every 3.3 m, planks at three lifts
       following the slope, a ladder of lifts to the deck. The planks' inner
       edge is 0.15 m off her widest point, the deck edge amidships         */
    for (s = -1; s <= 1; s += 2) {
      var py = SY + s * 4.8;
      for (wx = XT + 0.8; wx < X_HEAD + 1; wx += 3.3) {
        gz = groundZ(wx, py);
        B.steel.add(rod([wx, py, gz], [wx, py, keelZ(wx) + 7.0], 0.12, 0.12));
        B.steel.add(rod([wx, py, gz], [wx, py - s * 0.9, keelZ(wx) + 6.2], 0.1, 0.1));
      }
      [1.7, 3.6, 5.5].forEach(function (h) {
        B.hull.add(rod([XT + 0.6, py - s * 0.45, keelZ(XT + 0.6) + h], [X_HEAD + 0.8, py - s * 0.45, keelZ(X_HEAD + 0.8) + h], 1.0, 0.08), UV_TIMBER);
        B.steel.add(rod([XT + 0.6, py + s * 0.1, keelZ(XT + 0.6) + h + 1.0], [X_HEAD + 0.8, py + s * 0.1, keelZ(X_HEAD + 0.8) + h + 1.0], 0.06, 0.06));
      });
    }
  }

  /* ---- the goliath ------------------------------------------------------
     25.6 m between rails, the girder underside at 16.5 m. Each support is
     two legs on a sill beam over two bogies. The rigid support (on the -Y
     rail) is braced by two ties and a diagonal; the hinged one is a plain
     A with one tie, as the ru.wikipedia description has it.             */
  function goliath(B) {
    [GR1, GR2].forEach(function (ry, side) {
      var zr = DECK + 0.14;
      /* bogies and wheels                                                  */
      [-3.3, 3.3].forEach(function (bx) {
        B.steel.add(bb(GX + bx - 1.3, GX + bx + 1.3, ry - 0.5, ry + 0.5, zr + 0.35, zr + 1.05));
        [-0.75, 0.75].forEach(function (wx) {
          B.dark.add(place(new V.CylinderGeometry(0.36, 0.36, 0.34, 10), GX + bx + wx, ry, zr + 0.36));
        });
      });
      /* the sill beam and the two legs, 0.95 m square to 0.7 m           */
      B.steel.add(bb(GX - 4.5, GX + 4.5, ry - 0.55, ry + 0.55, zr + 1.05, zr + 2.1));
      [-1, 1].forEach(function (k) {
        B.steel.add(strut([GX + k * 3.2, ry, zr + 2.0], [GX + k * 1.15, ry, G_Z0 - 0.2], 0.67, 4, 0.5));
      });
      /* ties between the legs; the rigid support has two and a diagonal  */
      var ties = side === 0 ? [6.0, 11.5] : [9.5];
      ties.forEach(function (tz) {
        var f = (tz - zr - 2.0) / (G_Z0 - 0.2 - zr - 2.0), hx = lerp(3.2, 1.15, f);
        B.steel.add(rod([GX - hx, ry, tz], [GX + hx, ry, tz], 0.4, 0.5));
      });
      if (side === 0) B.steel.add(strut([GX - 2.55, ry, 6.0], [GX + 1.75, ry, 11.5], 0.16, 4));
      /* the head the girder sits on                                        */
      B.steel.add(bb(GX - 1.9, GX + 1.9, ry - 0.9, ry + 0.9, G_Z0 - 0.45, G_Z0));
      /* a caged ladder up the outboard leg of the rigid support           */
      if (side === 0) {
        B.yellow.add(rod([GX + 3.6, ry - 0.2, zr + 2.1], [GX + 1.6, ry - 0.2, G_Z0 - 0.4], 0.06, 0.06));
        B.yellow.add(rod([GX + 3.6, ry + 0.5, zr + 2.1], [GX + 1.6, ry + 0.5, G_Z0 - 0.4], 0.06, 0.06));
      }
    });
    /* the girder: one box, 3 m wide and 2.4 m deep, 2.4 m past each rail.
       It is the team-coloured part: painted girders carry a yard's colours
       and from the RTS camera it is a 30 m bar across the slip.           */
    var y0 = GR1 - 2.4, y1 = GR2 + 2.4;
    B.team.add(bb(GX - 1.5, GX + 1.5, y0, y1, G_Z0, G_Z1));
    /* trolley rails, the walkway and its hand rail on the +X side        */
    [-1.0, 1.0].forEach(function (d) { B.dark.add(rod([GX + d, y0 + 0.3, G_Z1 + 0.06], [GX + d, y1 - 0.3, G_Z1 + 0.06], 0.14, 0.12)); });
    B.steel.add(bb(GX + 1.5, GX + 2.4, y0, y1, G_Z0 + 0.05, G_Z0 + 0.2));
    [G_Z0 + 1.2, G_Z0 + 0.65].forEach(function (h) { B.yellow.add(rod([GX + 2.35, y0, h], [GX + 2.35, y1, h], 0.05, 0.05)); });
    for (var py = y0 + 0.5; py < y1; py += 3.1) B.yellow.add(rod([GX + 2.35, py, G_Z0 + 0.2], [GX + 2.35, py, G_Z0 + 1.23], 0.06, 0.06));
    /* the trolley over the hull, hoist drum across it. Dark steel, not
       yellow: PLA's team amber is within a shade of safety yellow, and a
       yellow trolley vanished into their girder                            */
    B.steel.add(bb(GX - 1.45, GX + 1.45, SY - 1.9, SY + 1.9, G_Z1 + 0.12, G_Z1 + 1.3));
    B.dark.add(place(new V.CylinderGeometry(0.55, 0.55, 2.3, 12), GX, SY - 0.6, G_Z1 + 0.95, 0, 0, PI / 2));
    B.yellow.add(bb(GX - 1.5, GX + 1.5, SY - 1.95, SY - 1.85, G_Z1 + 0.12, G_Z1 + 1.0));
    B.yellow.add(bb(GX - 1.5, GX + 1.5, SY + 1.85, SY + 1.95, G_Z1 + 0.12, G_Z1 + 1.0));
    B.dark.add(bb(GX - 1.0, GX + 1.0, SY + 0.8, SY + 1.7, G_Z1 + 1.3, G_Z1 + 1.55));
    /* the operator's cab slung under the girder by the rigid support     */
    B.steel.add(bb(GX - 1.2, GX + 1.2, GR1 + 2.2, GR1 + 4.6, G_Z0 - 2.6, G_Z0));
    B.dark.add(bb(GX + 1.2, GX + 1.26, GR1 + 2.4, GR1 + 4.4, G_Z0 - 2.3, G_Z0 - 1.0));
    B.dark.add(bb(GX - 1.1, GX + 1.1, GR1 + 4.6, GR1 + 4.66, G_Z0 - 2.3, G_Z0 - 1.0));
    /* hoist ropes through the girder slot to the hook block, slings to
       the next superstructure block, hanging 2.6 m over her deck          */
    var HZ = 11.3;
    [[-0.35, -0.4], [0.35, -0.4], [-0.35, 0.4], [0.35, 0.4]].forEach(function (d) {
      B.dark.add(strut([GX + d[0], SY + d[1], G_Z1 + 0.2], [GX + d[0] * 0.6, SY + d[1] * 0.6, HZ + 0.9], 0.04, 4));
    });
    B.yellow.add(bb(GX - 0.5, GX + 0.5, SY - 0.6, SY + 0.6, HZ, HZ + 0.95));
    var BZ0 = 8.05, BZ1 = 10.55, bx0 = GX - 2.5, bx1 = GX + 2.5, by0 = SY - 2.65, by1 = SY + 2.65;
    [[bx0, by0], [bx1, by0], [bx0, by1], [bx1, by1]].forEach(function (c) {
      B.dark.add(strut([GX, SY, HZ], [c[0] + (GX - c[0]) * 0.06, c[1] + (SY - c[1]) * 0.06, BZ1 + 0.3], 0.035, 4));
    });
    B.hull.add(bb(bx0, bx1, by0, by1, BZ0, BZ1));
    B.dark.add(bb(bx0 - 0.04, bx0, SY - 1.6, SY + 1.6, BZ0 + 0.9, BZ0 + 1.6));
    B.dark.add(bb(bx0 + 1.0, bx0 + 1.9, by1, by1 + 0.04, BZ0 + 0.2, BZ1 - 0.5));
  }

  /* ---- the portal jib crane ---------------------------------------------
     A double-link level-luffing crane of the Soviet portal type: four
     splayed box legs on bogies, the portal head and slewing ring at 9 m, the
     machinery house with its counterweight, the pyramid mast, the box main
     jib pivoted at the front of the house, the upper jib (the trunk) on its
     head with the rear link back to the mast top, and the balance lever
     with its weight. Luffed out to 30 deg, its jib head at 19.2 m and the
     trunk's tail at 19.9 m, under the hall's lantern. Built with the jib along local +X, then
     slewed and luffed onto the propeller it is lowering.                  */
  function jibCrane(B) {
    var zr = DECK + 0.14, i;
    /* portal: bogies on the rails, splayed legs, the head ring            */
    [-1, 1].forEach(function (sx) {
      [-1, 1].forEach(function (sy) {
        var fx = JX + sx * JG, fy = JY + sy * 4.6;
        B.steel.add(bb(fx - 0.55, fx + 0.55, fy - 1.4, fy + 1.4, zr + 0.35, zr + 1.1));
        [-0.8, 0.8].forEach(function (wy) {
          B.dark.add(place(new V.CylinderGeometry(0.33, 0.33, 0.3, 10), fx, fy + wy, zr + 0.34, 0, 0, PI / 2));
        });
        B.steel.add(strut([fx, fy, zr + 1.0], [JX + sx * 1.75, JY + sy * 1.75, 8.35], 0.55, 4, 0.42));
      });
      /* the portal's side frames: a tie between each pair of legs        */
      var f = (4.6 - zr - 1.0) / (8.35 - zr - 1.0);
      B.steel.add(rod([JX + sx * lerp(JG, 1.75, f), JY - lerp(4.6, 1.75, f), 4.6],
                      [JX + sx * lerp(JG, 1.75, f), JY + lerp(4.6, 1.75, f), 4.6], 0.36, 0.42));
    });
    B.steel.add(cylZ(2.55, 2.4, 0.95, 16, JX, JY, 8.2));
    B.dark.add(cylZ(2.15, 2.15, 0.45, 16, JX, JY, 9.15));
    /* the slewing part, built with its jib along +X                       */
    var L = { steel: [], yellow: [], team: [], dark: [] };
    L.steel.push(bb(-5.8, 2.3, -2.25, 2.25, 9.6, 10.0));
    L.steel.push(bb(-5.1, 0.9, -2.05, 2.05, 10.0, 13.6));
    L.team.push(bb(-5.15, 0.95, -2.1, 2.1, 13.6, 13.78));
    L.dark.push(bb(-5.14, -5.1, -1.2, 1.2, 11.2, 12.6));                 /* louvres */
    L.steel.push(bb(-6.8, -5.1, -2.4, 2.4, 9.35, 12.2));                 /* counterweight */
    L.yellow.push(bb(-6.84, -6.8, -2.4, 2.4, 9.35, 9.8));
    /* the cab on the front corner, glazed to the front and side           */
    L.steel.push(bb(0.9, 3.0, 0.7, 2.45, 10.3, 12.7));
    L.dark.push(bb(3.0, 3.05, 0.85, 2.3, 11.1, 12.5));
    L.dark.push(bb(1.05, 2.85, 2.45, 2.5, 11.1, 12.5));
    /* the mast: a four-legged pyramid over the house to the apex         */
    var A = [-1.3, 0, 19.3];
    [[-3.9, 1.7], [-3.9, -1.7], [0.3, 1.6], [0.3, -1.6]].forEach(function (p) {
      L.steel.push(strut([p[0], p[1], 13.6], A, 0.26, 4, 0.2));
    });
    L.steel.push(bb(A[0] - 0.5, A[0] + 0.5, -0.5, 0.5, A[2] - 0.4, A[2] + 0.35));
    /* the main jib: heel at the front of the platform, 15.5 m long, luffed
       to put the trunk tip over the propeller                               */
    var H = [1.6, 0, 11.3], LJ = 15.5, be = -6 * PI / 180, TR = 7.2;
    var reach = Math.sqrt((PROP_X - JX) * (PROP_X - JX) + (PROP_Y - JY) * (PROP_Y - JY));
    var al = Math.acos(clamp((reach - H[0] - TR * Math.cos(be)) / LJ, 0.2, 0.99));
    var psi = Math.atan2(PROP_Y - JY, PROP_X - JX);
    var J = [H[0] + LJ * Math.cos(al), 0, H[2] + LJ * Math.sin(al)];
    L.steel.push(bb(0.9, 2.3, -1.1, 1.1, 10.0, 11.6));
    /* a box jib, 1.3 m deep at the heel and 0.7 m at the head, its two
       heel lugs either side of the platform front                         */
    L.steel.push(rod(H, J, 1.25, 1.1, true));
    L.steel.push(strut([H[0] + 3.0 * Math.cos(al), 0, H[2] + 3.0 * Math.sin(al)], J, 0.6, 4, 0.42));
    [-0.8, 0.8].forEach(function (dy) { L.steel.push(bb(H[0] - 0.6, H[0] + 0.6, dy - 0.2, dy + 0.2, H[2] - 0.8, H[2] + 0.5)); });
    /* the trunk through the jib head: 7.2 m forward, 3.4 m back          */
    var T = [J[0] + TR * Math.cos(be), 0, J[2] + TR * Math.sin(be)];
    var Rr = [J[0] - 3.4 * Math.cos(be), 0, J[2] - 3.4 * Math.sin(be)];
    L.yellow.push(strut(Rr, T, 0.42, 4, 0.26));
    L.yellow.push(place(new V.CylinderGeometry(0.45, 0.45, 0.5, 12), T[0], 0, T[2]));
    /* the rear link from the trunk's tail to the mast top                 */
    L.steel.push(strut(Rr, A, 0.14, 6));
    /* the balance lever with its weight, and the rod down to the jib      */
    var LF = [0.9, 0, 19.75], LB = [-5.6, 0, 18.1];
    L.steel.push(strut(LF, LB, 0.2, 4));
    L.steel.push(bb(LB[0] - 0.9, LB[0] + 0.6, -0.8, 0.8, LB[2] - 0.9, LB[2] + 0.5));
    L.steel.push(strut(LF, [lerp(H[0], J[0], 0.42), 0, lerp(H[2], J[2], 0.42)], 0.1, 6));
    /* the hoist rope from the trunk tip to the hook over the propeller    */
    var HK = 3.75;
    L.dark.push(strut([T[0], 0, T[2] - 0.3], [T[0], 0, HK + 0.8], 0.05, 4));
    L.yellow.push(bb(T[0] - 0.35, T[0] + 0.35, -0.3, 0.3, HK, HK + 0.8));
    L.dark.push(place(new V.TorusGeometry(0.28, 0.07, 4, 8, PI * 1.4), T[0], 0, HK - 0.25, PI / 2, 0, 0));
    /* slew and place                                                       */
    var m = new V.Matrix4().makeRotationZ(psi);
    m.setPosition(JX, JY, 0);
    Object.keys(L).forEach(function (k) { L[k].forEach(function (g) { B[k].add(g.applyMatrix4(m)); }); });
    /* The propeller on the hook: five blades, 1.9 m across, its shaft axis
       fore and aft, slung by the hub from the hook, coming down to the
       shaft line under the stern. Drawn in the yellow material, which at
       this size is near enough the colour of propeller bronze. Built in the model's own axes, so
       it hangs square to the hull whatever the crane's slew.              */
    var PZ = 2.1, k;
    B.dark.add(strut([PROP_X, PROP_Y, HK], [PROP_X, PROP_Y, PZ + 0.3], 0.05, 4));
    B.yellow.add(place(new V.CylinderGeometry(0.26, 0.32, 0.7, 10), PROP_X, PROP_Y, PZ, 0, 0, -PI / 2));
    for (k = 0; k < 5; k++) {
      var bl = new V.BoxGeometry(0.07, 0.58, 0.72);
      bl.translate(0, 0, 0.62);
      bl.rotateZ(0.62);
      bl.rotateX(k * 2 * PI / 5 + 0.3);
      bl.translate(PROP_X, PROP_Y, PZ);
      B.yellow.add(bl);
    }
  }

  /* ---- the construction hall and its office annex -------------------- */
  function hall(B) {
    var W = new Soup(), Rf = new Soup(), z0 = DECK, e = HE, r = HR;
    var inside = [(HX0 + HX1) / 2, HYC, (z0 + e) / 2];
    /* the -Y long wall, cut by the 12 m door onto the slip head           */
    var DX0 = 8.0, DX1 = 20.0, DZ = 13.0;
    W.quad([HX0, HY0, z0], [DX0, HY0, z0], [DX0, HY0, e], [HX0, HY0, e], inside);
    W.quad([DX1, HY0, z0], [HX1, HY0, z0], [HX1, HY0, e], [DX1, HY0, e], inside);
    W.quad([DX0, HY0, DZ], [DX1, HY0, DZ], [DX1, HY0, e], [DX0, HY0, e], inside);
    /* the +Y long wall                                                     */
    W.quad([HX0, HY1, z0], [HX1, HY1, z0], [HX1, HY1, e], [HX0, HY1, e], inside);
    /* the +X gable, whole, and the -X gable cut by the 10 m quay door     */
    W.quad([HX1, HY0, z0], [HX1, HY1, z0], [HX1, HY1, e], [HX1, HY0, e], inside);
    W.tri([HX1, HY0, e], [HX1, HY1, e], [HX1, HYC, r], inside);
    var GY0 = 12.0, GY1 = 22.0, GZ = 14.0;
    W.quad([HX0, HY0, z0], [HX0, GY0, z0], [HX0, GY0, e], [HX0, HY0, e], inside);
    W.quad([HX0, GY1, z0], [HX0, HY1, z0], [HX0, HY1, e], [HX0, GY1, e], inside);
    W.quad([HX0, GY0, GZ], [HX0, GY1, GZ], [HX0, GY1, e], [HX0, GY0, e], inside);
    W.tri([HX0, HY0, e], [HX0, HY1, e], [HX0, HYC, r], inside);
    /* door reveals, 0.6 m deep, and the dark hall beyond                   */
    var dp = 0.6;
    W.quadN([DX0, HY0, z0], [DX0, HY0 + dp, z0], [DX0, HY0 + dp, DZ], [DX0, HY0, DZ], [1, 0, 0]);
    W.quadN([DX1, HY0, z0], [DX1, HY0 + dp, z0], [DX1, HY0 + dp, DZ], [DX1, HY0, DZ], [-1, 0, 0]);
    W.quadN([DX0, HY0, DZ], [DX1, HY0, DZ], [DX1, HY0 + dp, DZ], [DX0, HY0 + dp, DZ], [0, 0, -1]);
    W.quadN([HX0, GY0, z0], [HX0 + dp, GY0, z0], [HX0 + dp, GY0, GZ], [HX0, GY0, GZ], [0, 1, 0]);
    W.quadN([HX0, GY1, z0], [HX0 + dp, GY1, z0], [HX0 + dp, GY1, GZ], [HX0, GY1, GZ], [0, -1, 0]);
    W.quadN([HX0, GY0, GZ], [HX0, GY1, GZ], [HX0 + dp, GY1, GZ], [HX0 + dp, GY0, GZ], [0, 0, -1]);
    B.clad.add(W.geo(), uvHall);
    B.dark.add(bb(DX0, DX1, HY0 + dp, HY0 + dp + 0.1, z0, DZ));
    B.dark.add(bb(HX0 + dp, HX0 + dp + 0.1, GY0, GY1, z0, GZ));
    /* the doors are sliding leaves on a track over the opening, outside
       the wall: the slip-head door has one leaf run back over the wall and
       one shut, the quay door one leaf part open                           */
    B.steel.add(bb(HX0 - 0.45, HX0 - 0.15, GY1 - 1.0, GY1 + 4.2, z0, GZ + 0.3));
    B.steel.add(bb(HX0 - 0.5, HX0, GY0 - 0.6, GY1 + 4.6, GZ + 0.3, GZ + 0.8));
    B.steel.add(bb(DX0 + 6.0, DX1 + 0.2, HY0 - 0.25, HY0 - 0.05, z0, DZ + 0.3));
    B.steel.add(bb(DX0 - 6.0, DX0 + 0.2, HY0 - 0.5, HY0 - 0.3, z0, DZ + 0.3));
    B.steel.add(bb(DX0 - 6.4, DX1 + 0.6, HY0 - 0.55, HY0, DZ + 0.3, DZ + 0.8));
    /* the frame shows through the cladding as pilasters every 6 m on the
       long walls, stopping under the team band                             */
    [0.15, 6, 12, 18, 24, 27.85].forEach(function (px) {
      B.steel.add(bb(px - 0.2, px + 0.2, HY1, HY1 + 0.25, z0, e - 2.35));
      if (px < DX0 - 1 || px > DX1 + 1 && px < 20) B.steel.add(bb(px - 0.2, px + 0.2, HY0 - 0.25, HY0, z0, e - 2.35));
    });
    /* the roof: two planes to the ridge, 0.5 m eaves, verges at the gables */
    var ov = 0.5, ez = e - ov * Math.tan(HPITCH);
    var ra = [HX0 - 0.4, HY0 - ov, ez], rb = [HX1 + 0.4, HY0 - ov, ez], rc = [HX1 + 0.4, HYC, r], rd = [HX0 - 0.4, HYC, r];
    Rf.quadN(ra, rb, rc, rd, [0, -Math.sin(HPITCH), Math.cos(HPITCH)]);
    Rf.quadN([HX0 - 0.4, HY1 + ov, ez], [HX1 + 0.4, HY1 + ov, ez], rc, rd, [0, Math.sin(HPITCH), Math.cos(HPITCH)]);
    /* the roof's edges, 0.35 m deep, facing out                            */
    Rf.quadN([HX0 - 0.4, HY0 - ov, ez - 0.35], [HX1 + 0.4, HY0 - ov, ez - 0.35], rb, ra, [0, -1, 0]);
    Rf.quadN([HX0 - 0.4, HY1 + ov, ez - 0.35], [HX1 + 0.4, HY1 + ov, ez - 0.35], [HX1 + 0.4, HY1 + ov, ez], [HX0 - 0.4, HY1 + ov, ez], [0, 1, 0]);
    [HX0 - 0.4, HX1 + 0.4].forEach(function (gx, k) {
      var n = [k ? 1 : -1, 0, 0];
      Rf.quadN([gx, HY0 - ov, ez - 0.35], [gx, HYC, r - 0.35], [gx, HYC, r], [gx, HY0 - ov, ez], n);
      Rf.quadN([gx, HYC, r - 0.35], [gx, HY1 + ov, ez - 0.35], [gx, HY1 + ov, ez], [gx, HYC, r], n);
    });
    /* the ridge lantern: louvred sides, its own shallow roof on top       */
    var LX0 = 2.0, LX1 = 26.0, LW = 1.6, LZ = 21.55;
    var lz0 = r - LW * Math.tan(HPITCH) - 0.1;
    B.dark.add(bb(LX0, LX1, HYC - LW, HYC + LW, lz0, LZ));
    B.roof.add(Rf.geo(), uvRoof);
    /* its cap is sheet steel, darker than the roof: from above the lantern
       is the dark line down the ridge that every aerial photograph shows  */
    var Lc = new Soup();
    Lc.quadN([LX0 - 0.3, HYC - LW - 0.4, LZ], [LX1 + 0.3, HYC - LW - 0.4, LZ], [LX1 + 0.3, HYC, LZ + 0.32], [LX0 - 0.3, HYC, LZ + 0.32], [0, -0.2, 1]);
    Lc.quadN([LX0 - 0.3, HYC + LW + 0.4, LZ], [LX1 + 0.3, HYC + LW + 0.4, LZ], [LX1 + 0.3, HYC, LZ + 0.32], [LX0 - 0.3, HYC, LZ + 0.32], [0, 0.2, 1]);
    [LX0 - 0.3, LX1 + 0.3].forEach(function (gx, k) {
      Lc.tri([gx, HYC - LW - 0.4, LZ], [gx, HYC + LW + 0.4, LZ], [gx, HYC, LZ + 0.32], [gx - (k ? 1 : -1), HYC, LZ]);
    });
    B.steel.add(Lc.geo());
    /* lantern end frames, so it does not read as a slot in the roof       */
    [LX0, LX1].forEach(function (gx) { B.clad.add(bb(gx - 0.15, gx + 0.15, HYC - LW, HYC + LW, lz0, LZ), uvHall); });
    /* the team band round the hall under the eaves, 0.12 m proud          */
    var tz0 = e - 2.3, tz1 = e - 0.3;
    B.team.add(bb(HX0 - 0.12, HX1 + 0.12, HY0 - 0.12, HY0, tz0, tz1));
    B.team.add(bb(HX0 - 0.12, HX1 + 0.12, HY1, HY1 + 0.12, tz0, tz1));
    B.team.add(bb(HX0 - 0.12, HX0, HY0, HY1, tz0, tz1));
    B.team.add(bb(HX1, HX1 + 0.12, HY0, HY1, tz0, tz1));
    /* gutters and downpipes at the corners                                */
    [HY0 - ov + 0.15, HY1 + ov - 0.15].forEach(function (gy) {
      B.steel.add(rod([HX0 - 0.4, gy, ez - 0.45], [HX1 + 0.4, gy, ez - 0.45], 0.28, 0.24, true));
    });
    [[HX0 + 0.2, HY0 - 0.18], [HX1 - 0.2, HY0 - 0.18], [HX0 + 0.2, HY1 + 0.18], [HX1 - 0.2, HY1 + 0.18]].forEach(function (p) {
      B.steel.add(rod([p[0], p[1], z0], [p[0], p[1], ez - 0.5], 0.18, 0.18));
    });
    /* roof vents in a row either side of the lantern                      */
    [6.0, 14.0, 22.0].forEach(function (vx) {
      [HYC - 5.5, HYC + 5.5].forEach(function (vy) {
        var vz = r - 5.5 * Math.tan(HPITCH);
        B.steel.add(cylZ(0.45, 0.5, 1.1, 8, vx, vy, vz - 0.2));
        B.steel.add(cylZ(0.7, 0.7, 0.18, 8, vx, vy, vz + 0.9));
      });
    });
    /* the office annex on the -Y side at the +X end: two storeys, a
       parapet, windows from its own band of the cladding canvas           */
    var AX0 = 20.5, AX1 = HX1, AY0 = 1.4, AZ = 7.6;
    var A = new Soup(), ai = [(AX0 + AX1) / 2, (AY0 + HY0) / 2, 4];
    A.quad([AX0, AY0, z0], [AX1, AY0, z0], [AX1, AY0, AZ], [AX0, AY0, AZ], ai);
    A.quad([AX0, AY0, z0], [AX0, HY0, z0], [AX0, HY0, AZ], [AX0, AY0, AZ], ai);
    A.quad([AX1, AY0, z0], [AX1, HY0, z0], [AX1, HY0, AZ], [AX1, AY0, AZ], ai);
    B.clad.add(A.geo(), uvAnnex);
    B.roof.add(bb(AX0 + 0.3, AX1 - 0.3, AY0 + 0.3, HY0 - 0.05, AZ - 0.1, AZ + 0.05));
    B.conc.add(bb(AX0 - 0.1, AX1 + 0.1, AY0 - 0.1, AY0 + 0.3, AZ, AZ + 0.7));
    B.conc.add(bb(AX0 - 0.1, AX0 + 0.3, AY0 + 0.3, HY0, AZ, AZ + 0.7));
    B.conc.add(bb(AX1 - 0.3, AX1 + 0.1, AY0 + 0.3, HY0, AZ, AZ + 0.7));
    /* its entrance canopy and door                                        */
    B.steel.add(bb(22.6, 25.4, AY0 - 1.3, AY0, 3.2, 3.4));
    B.dark.add(bb(23.2, 24.8, AY0 - 0.06, AY0, z0, 2.8));
    /* a plant box on the annex roof                                        */
    B.steel.add(bb(24.0, 26.8, 2.6, 4.6, AZ, AZ + 1.4));
  }

  /* ---- the quay: bollards along every coping, fenders on every face ----
     render3d neither turns a building nor asks which side its water is on
     (see the header), so all four quay faces are fitted out as berths and
     whichever one a ship lies against reads as the waterfront: a bollard
     every 7 to 12 m, 0.75 m in from the face of the coping, its head
     painted; a rubber fender hung on chains beside each; a ladder in each
     face. On a face that meets a beach they are buried with the wall. The
     stations dodge what stands at each edge: the hall and its annex 1 m in
     from +X and +Y (between the pilasters), the cabins, plate stacks and
     floodlight masts, the crane rails and their buffers. For each face,
     its outward direction, the bollard stations along it and the ladder. */
  var QUAYS = [
    { n: [-1, 0], at: [-25.0, 2.5, 9.5, 16.5, 23.5], ladder: 6.0 },
    { n: [1, 0], at: [-19.5, -8.5, 3.5, 14.0, 24.5], ladder: -12.0 },
    { n: [0, 1], at: [-22.0, -11.0, -1.0, 9.0, 21.0], ladder: 4.0 },
    { n: [0, -1], at: [-24.0, -14.0, -4.0, 6.0, 14.5], ladder: 1.0 }
  ];
  function quayKit(B) {
    QUAYS.forEach(function (q) {
      /* the point t metres along the face and o metres out from the plot  */
      function pt(t, o) { return q.n[0] ? [q.n[0] * (PL + o), t] : [t, q.n[1] * (PL + o)]; }
      q.at.forEach(function (t) {
        var b = pt(t, -0.45);
        B.dark.add(cylZ(0.27, 0.33, 0.76, 8, b[0], b[1], DECK, true));
        B.yellow.add(cylZ(0.4, 0.33, 0.16, 8, b[0], b[1], DECK + 0.76));
        /* a cylindrical rubber fender hung on chains down the face          */
        var f = pt(t + 1.8, 0.8), c = pt(t + 1.8, 0.1);
        B.dark.add(cylZ(0.5, 0.5, 3.4, 8, f[0], f[1], WL - 1.4));
        B.steel.add(rod([f[0], f[1], WL + 2.0], [c[0], c[1], DECK - 0.1], 0.05, 0.05));
      });
      /* a ladder recessed in the face, under the coping                     */
      [-0.35, 0.35].forEach(function (d) {
        var l = pt(q.ladder + d, 0.12);
        B.yellow.add(rod([l[0], l[1], WL - 1.5], [l[0], l[1], DECK], 0.07, 0.07));
      });
    });
  }

  /* ---- stores on the aprons ------------------------------------------ */
  function props(B) {
    var i;
    /* the next hull block on its stands at the slip head: a bottom block,
       open on top, its frames and floors showing, as broad as her hull
       is 2.6 m over the keel                                               */
    [[15.9, SY - 3.1], [15.9, SY + 3.1], [22.7, SY - 3.1], [22.7, SY + 3.1]].forEach(function (p) {
      B.steel.add(bb(p[0] - 0.45, p[0] + 0.45, p[1] - 0.45, p[1] + 0.45, DECK, DECK + 0.7));
    });
    var X0 = 14.9, X1 = 23.7, Y0 = SY - 3.6, Y1 = SY + 3.6, Z0 = DECK + 0.7, Z1 = DECK + 3.3;
    B.hull.add(bb(X0, X1, Y0, Y1, Z0, Z0 + 0.3));
    B.hull.add(bb(X0, X1, Y0, Y0 + 0.2, Z0, Z1));
    B.hull.add(bb(X0, X1, Y1 - 0.2, Y1, Z0, Z1));
    B.hull.add(bb(X0, X0 + 0.2, Y0 + 0.2, Y1 - 0.2, Z0, Z1));
    B.hull.add(bb(X1 - 0.2, X1, Y0 + 0.2, Y1 - 0.2, Z0, Z1));
    for (i = 1; i < 6; i++) B.dark.add(bb(X0 + i * 1.47 - 0.06, X0 + i * 1.47 + 0.06, Y0 + 0.2, Y1 - 0.2, Z0 + 0.3, Z0 + 1.6));
    B.dark.add(bb(X0 + 0.2, X1 - 0.2, SY - 0.06, SY + 0.06, Z0 + 0.3, Z0 + 1.8));
    /* steel plate stacks, primed, on dunnage clear of the quay edge          */
    [[24.5, -23.5, 0.3], [13.0, -24.0, -0.2], [24.9, -16.0, 0.1]].forEach(function (p) {
      for (var k = 0; k < 3; k++) {
        var g = box(7.0 - k * 0.2, 2.4, 0.32, 0, 0, 0);
        g.rotateZ(p[2] + k * 0.03);
        g.translate(p[0], p[1], DECK + 0.2 + k * 0.34);
        B.hull.add(g, UV_RUST);
      }
      B.hull.add(bb(p[0] - 2.8, p[0] - 2.5, p[1] - 1.3, p[1] + 1.3, DECK, DECK + 0.2), UV_TIMBER);
      B.hull.add(bb(p[0] + 2.5, p[0] + 2.8, p[1] - 1.3, p[1] + 1.3, DECK, DECK + 0.2), UV_TIMBER);
    });
    /* a pipe bundle and cable reels on the fitting-out quay                */
    for (i = 0; i < 6; i++) {
      var row = i < 3 ? 0 : i < 5 ? 1 : 2, col = i < 3 ? i : i < 5 ? i - 3 : 0;
      var py = 25.2 + col * 0.5 + row * 0.25, pz = DECK + 0.25 + row * 0.43;
      B.steel.add(place(new V.CylinderGeometry(0.25, 0.25, 7.0, 8), -9.5, py, pz, 0, 0, PI / 2));
    }
    [[-12.0, 5.0], [-9.5, 5.0]].forEach(function (p) {
      [-0.6, 0.6].forEach(function (d) { B.hull.add(place(new V.CylinderGeometry(1.15, 1.15, 0.14, 12), p[0], p[1] + d, DECK + 1.15), UV_TIMBER); });
      B.dark.add(place(new V.CylinderGeometry(0.75, 0.75, 1.1, 12), p[0], p[1], DECK + 1.15));
    });
    /* site cabins at the slip head                                          */
    B.clad.add(bb(19.5, 25.6, -28.4, -26.0, DECK, DECK + 2.6), uvAnnex);
    B.roof.add(bb(19.4, 25.7, -28.5, -25.9, DECK + 2.6, DECK + 2.75));
    B.clad.add(bb(19.5, 25.6, -28.4, -26.0, DECK + 2.75, DECK + 5.35), uvAnnex);
    B.roof.add(bb(19.4, 25.7, -28.5, -25.9, DECK + 5.35, DECK + 5.5));
    B.steel.add(rod([19.2, -25.8, DECK], [19.2, -25.8 + 0.01, DECK + 2.75], 0.1, 0.1));
    B.steel.add(rod([19.2, -25.8, DECK + 2.75], [16.6, -25.8, DECK], 0.9, 0.12));
    /* a gas bottle cage by the slip head                                   */
    B.yellow.add(bb(9.6, 11.8, -4.4, -3.4, DECK, DECK + 0.1));
    for (i = 0; i < 5; i++) B.steel.add(cylZ(0.13, 0.13, 1.5, 6, 9.9 + i * 0.45, -3.9, DECK + 0.1));
    B.yellow.add(rod([9.6, -4.4, DECK + 1.2], [11.8, -4.4, DECK + 1.2], 0.06, 0.06));
    /* flood light masts at three corners                                   */
    [[27.6, -27.6], [-27.6, 27.6], [27.6, 0.4]].forEach(function (p) {
      B.conc.add(bb(p[0] - 0.6, p[0] + 0.6, p[1] - 0.6, p[1] + 0.6, DECK, DECK + 0.5));
      B.steel.add(strut([p[0], p[1], DECK + 0.5], [p[0], p[1], 16.8], 0.28, 8, 0.12));
      B.steel.add(bb(p[0] - 1.2, p[0] + 1.2, p[1] - 0.12, p[1] + 0.12, 16.8, 17.1));
      [-0.8, 0, 0.8].forEach(function (d) { B.dark.add(bb(p[0] + d - 0.3, p[0] + d + 0.3, p[1] - 0.35, p[1] + 0.05, 17.1, 17.6)); });
    });
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    V = THREE;
    var TX = textures();
    var team = C && C.team !== undefined ? C.team : "#4b8fe0";
    var T = {};
    /* concrete, cladding and roofing: neutral greys over their canvases,
       so restyle() gives them the faction's "wall2", "wall" and "roof"     */
    T.conc = new V.MeshStandardMaterial({ color: 0xbfc0bb, map: TX.conc, roughness: 0.92, metalness: 0.02 });
    T.clad = new V.MeshStandardMaterial({ color: 0xd2d3cf, map: TX.clad, roughness: 0.74, metalness: 0.12 });
    T.roof = new V.MeshStandardMaterial({ color: 0x8b8d8b, map: TX.roof, roughness: 0.8, metalness: 0.15 });
    /* crane and yard steel: dark enough to stay what it is in every period */
    T.steel = new V.MeshStandardMaterial({ color: 0x464d52, roughness: 0.6, metalness: 0.35 });
    T.yellow = new V.MeshStandardMaterial({ color: 0xd9a51f, roughness: 0.55, metalness: 0.2 });
    /* the hull's primer: a warm white multiplier with HSL saturation 1.0,
       which restyle() and the era tint both pass over                      */
    T.hull = new V.MeshStandardMaterial({ color: 0xfff4ee, map: TX.hull, roughness: 0.82, metalness: 0.06 });
    T.dark = new V.MeshStandardMaterial({ color: 0x1c1f22, roughness: 0.8, metalness: 0.2 });
    T.team = new V.MeshStandardMaterial({ color: new V.Color(team), roughness: 0.55, metalness: 0.15 });
    var B = {
      conc: new Batch(uvConc), clad: new Batch(uvHall), roof: new Batch(uvRoof),
      steel: new Batch([0, 0]), yellow: new Batch([0, 0]), hull: new Batch(uvHull),
      dark: new Batch([0, 0]), team: new Batch([0, 0])
    };
    platform(B);
    railsAndWays(B);
    hull(B);
    goliath(B);
    jibCrane(B);
    hall(B);
    quayKit(B);
    props(B);
    var root = new V.Group();
    root.name = "navalyard";
    Object.keys(B).forEach(function (k) {
      var m = B[k].mesh(T[k], "yard_" + k);
      if (m) root.add(m);
    });
    return root;
  }

  return { build: build };
})();

/* Registration: the def itself (rules.js BUILDINGS.navalyard). render3d.js
   getBuildingModel() and icons3d.js both call BLD_MODELS[def.id].build, so
   nothing else in the roster resolves here.                                 */
BLD_MODELS["navalyard"] = {
  build: function (THREE, M, C) { return HeroNavalYard.build(THREE, M, C); }
};
