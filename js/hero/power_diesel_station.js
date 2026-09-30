/* ===== power_diesel_station.js - HERO model: medium-speed diesel station ====
   BUILDINGS.power, the Power Plant: "Diesel generator hall. Supplies 120
   MW." One def for every army in every era, restyled by render3d.js
   (restyle() into the faction palette, eraRestyle() toward the period, and
   the rooftop kit of archFixture() and eraFixture()), so the architecture
   here is neutral industrial: a steel-framed hall in profiled cladding,
   concrete bunds and firewalls, painted steel.

   The model it replaces (units3d_salvage.js) was a turbine hall between two
   18 m hyperbolic cooling towers. Cooling towers belong to a steam plant; a
   diesel station cools its engines through fan radiators, and what marks it
   from the air is its row of exhaust stacks. It was also 510 meshes, and it
   is the most numerous building in the game (10.6 standing per commander in
   the AI census, 20.5 built), so it was about 5,500 draw calls a base.

   References, all looked at while this was built:
     - Wartsila 50 generating set leaflet (06/2024): 18V50, 18,434 kW at 50
       Hz, 18,747 x 5,543 x 6,257 mm, 377 t.
     - Wartsila 32 diesel generating set leaflet (05/2022): 20V32, 13,072
       x 3,300 x 4,342 mm, 130 t; and the gas set built on it, the 20V34SG
       (leaflet 09/2023), 13,142 x 3,350 x 4,573 mm, 136 t.
     - Wartsila white paper "Combustion engine power plants" (N. Haga,
       2011): the liquid-fuel 20V32 at 8.9 MW a unit (8.7 MWe in Wartsila
       North America's 2013 figures); photographs of
       Humboldt (10 x 18V50DF: stacks in braced frames, a ground radiator
       field, two bunded tanks), Plains End (a row of intake units along the
       hall wall), Sangachal and Lufussa Pavana III (stack frames).
     - Wikimedia Commons, "ORION Group constructed two 100 MW HFO based
       powerplant...": a braced stack frame holding a row of weathered steel
       flues, a raised field of round radiator fans, bunded tanks with
       yellow stairs and rails, insulated pipe racks, profiled-clad halls.
     - Commons, "Rankin Inlet Diesel Power Station" (fat silencer sections
       under the flues), "Sandavaig Power Station" (a clad hall and its
       stacks), "Bowmore Power Station" and "Springlands diesel station"
       (the older masonry halls that eraRestyle's brick and concrete stand
       for).
     - A 20V34SG plant listing (etruck.fi): "Cooling Radiator (6 x 7.5 kW
       fans per 1 set)".

   What the survey proposed, and what the references changed:
     - 120 MW is seven 18V50s, and their plants run 100 m and more. A 2 x 2
       plot (40 m) holds four sets of the 32 class, 4 x 8.9 = 35.6 MW. The
       def's figure is game balance; the model is the plant that fits.
     - Four sets do not fit a 14 m hall: a 13.1 m genset lies ACROSS the
       hall with its turbocharger at one wall and its generator at the
       other, so the hall is 17 m deep (13.1 m of set and a 2 m aisle at
       each end), 25.2 m long in four 6.3 m bays (3.3 m of set and 3 m
       between sets), 9.8 m to the eaves: room for the overhaul crane over
       a 4.3 m engine.
     - Six radiator fans a set, from the listing: a field of 24.
     - Tanks 6.6 m across and 7.2 m high (246 m3 each: about two and a half
       days at full load between them, at the 32's 190-odd g/kWh), in a
       bund that holds 110% of one with the other standing in it: 2.6 m
       walls round 8.5 x 18.2 m.
     - The plot. render3d.js scales every structure by BLD_SCALE 1.10 and
       never by its extent, so a plant drawn to the plot's 40 m stands 44 m
       and reaches 2 m into each neighbour. The AI builds twenty of these a
       match on the first legal spot near its yard, and nothing keeps two
       apart (ai.js keepsLanes() spares only the doors of barracks,
       factories and refineries), so plants stand side by side; drawn at
       40 m, one's tank would stand 1.7 m inside the next one's hall wall.
       So everything here, the apron included, is inside E = 18.15 m of
       the centre: in the game 19.97 m, on its own plot. The layout is
       packed to fit, not shrunk: every part is at its real size.

   The plan, model metres (+X east, +Y north, +Z up, the plot centred on the
   origin, the apron top at G0):
     - the hall in the middle-west, the engines' turbocharger ends to the
       NORTH, their generators to the south;
     - north of it, along the lane at its wall, the four exhaust ducts
       leaving over the charge-air filter housings, each into the foot of
       its silencer; the silencers and the four flues rising from them in
       one braced stack frame; and beyond them the radiator field on legs;
     - east, the two fuel tanks in their bund, the pipe rack to the hall's
       east gable, and the truck yard in front of the gable's crane door;
     - south, the generator side: two step-up transformers in firewalled
       bays, the switchyard gantry, and the electrical annex.
   render3d's default camera looks from the north-east, so it sees the hall
   roof, the north and east walls, the fans and the tanks; the sidebar icon
   (icons3d.js) looks from the south-east and sees the transformer yard.

   What render3d.js needs of it, and what it gets:
     - Draw calls. Every static part is BAKED, one merged mesh per material
       as in harvester_ore_hauler.js: eight meshes, eight materials. Each
       mesh is a draw and a shadow draw, and there are about ten of these
       in a base.
     - The rooftop kit is render3d's, not this model's, and render3d
       places it. archFixture() sets the army's kit at fixed spots on the
       plot at the TOP of the bounding box, which here is the flue tops,
       20.0 m; eraFixture() sets the period's kit at roofHeightOf(). The
       kit's north-east spots are over the tank farm, where the old model
       had a cooling tower to catch it, and nothing there reaches that
       high. Measured in the game (world metres, BLD_SCALE 1.10), the gap
       under each piece is 11.2 m for the NATO radome over the tanks,
       11.2 m for the Pact stack and 3.7 m for the e20 array face; 11.0 m
       for the NATO mast and 13.0 m for the Pact board over the hall; and
       0.4 to 0.8 m for the period kit on the hall roof (the e20 radome,
       the e50 chimney). This is being fixed in render3d.js, which will
       stand every kit piece on the surface under it, for every building.
       The plant is not laid out, and its flues are not cut down, to suit
       where the kit lands.
     - roofHeightOf() is the top of the tallest mesh that is broad (a
       quarter of the plot, 10 m) in BOTH plan directions. Every baked mesh
       spans the plot, so every one would count, and the flues would lift
       the period's kit 10 m above the roof. So the flues, their ducts and
       their frame are the one mesh that is narrow (5.3 to 10.9 m north,
       5.6 m), and no other mesh stands higher than the ridge cap.
       roofHeightOf() therefore finds the hall roof, 10.46 m.
     - damage3d.js burns its fires on the broad level tops (the hall roof,
       the radiator deck, the tank roofs) and at the foot of the hall's
       wall on the model's own apron, and arcs the switchgear at model
       (-6.5, -15.0): the middle HV bushing of the east transformer is
       there.
     - No part is named: a structure has nothing to train or turn, and a
       "turret" or "rotor" name would be forced round every frame.
   Colours are authored in sRGB and left to prepModel() to linearise; no
   material sets _srgbDone. restyle() reads the LINEAR colour: walls (sRGB
   0xc8, linear 0.58) take the faction's wall colour, the apron, plinths
   and steelwork (0xb4 and 0xa4, linear 0.46 and 0.37) its second wall
   colour, the roof (0x8e, 0.27) its roof colour. The fans, louvres,
   bushings, the stack, the yellow rails and the team flashes keep their
   own colours. eraRestyle() then tints everything that is neither
   saturated nor near black toward the period, the stack included; the
   dark parts, the yellow rails and the team flashes keep their colour.
   (Germany's field grey, #7a8a72, is the one team colour grey enough for
   both passes to repaint; that is render3d's to mend, not this file's.)
   ASCII only: a stray byte inside a hex literal has broken this before.    */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroDieselStation = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------ datums */
  var G0 = 0.15;                     /* apron top                            */
  var E = 18.15;                     /* the plot's half-width, see the header */
  var HX0 = -17.8, HX1 = 7.4;        /* hall: four 6.3 m bays                */
  var HY0 = -11.6, HY1 = 5.4;        /* 17.0 m deep, turbo ends north        */
  var BAY = 6.3;
  var EAVE = 9.8, RIDGE = 10.4;      /* 4.0 degree duo-pitch roof            */
  var RY = -3.1;                     /* ridge line                           */
  var OVX = 0.3, OVY = 0.5;          /* roof overhang at gables and eaves    */
  var ROOF_T = 0.22;
  /* Every door stands 12 cm proud of its wall. On the hall that puts it
     6 cm in front of the plinth course, which is itself 6 cm proud. A door
     flush with the plinth fights it for the same pixels at any zoom. At
     4 cm in front it clears the plinth by only one depth step at the
     zoom-out limit (1,200 m with the near plane at 2 m, where one step is
     about 4.3 cm). */
  var DOOR_T = 0.12;
  function bayX(k) { return HX0 + BAY * (k + 0.5); }   /* -14.65 -8.35 -2.05 4.25 */
  function roofZ(y) {                /* top of the roof sheet at y           */
    var run = y >= RY ? HY1 - RY : RY - HY0;
    return RIDGE - (RIDGE - EAVE) * Math.abs(y - RY) / run;
  }

  /* the stack: four flues in one braced frame north of the hall. Each
     engine's duct enters its silencer (the fat section) at the silencer's
     foot; the gas rises through it and leaves by the flue on its top */
  var FX = [-10.0, -7.4, -4.8, -2.2], FY = 9.5;
  var SIL_R = 0.9, SIL_Z0 = 8.6, SIL_Z1 = 14.4;   /* 5.8 m of silencer   */
  var FLUE_R = 0.6, FLUE_TOP = 20.0;
  var DUCT_Z = 9.3, DUCT_R = 0.45;   /* exhaust ducts clear the filter boxes */
  var FR_X = [-11.2, -6.1, -1.0], FR_Y = [8.4, 10.6];
  var FR_Z = [5.6, 11.4, 16.4], FR_TOP = 16.4;   /* flues stand 3.6 m clear */

  /* the radiator field: eight modules of three fans, on legs */
  var RX0 = -17.6, RX1 = 7.2, RY0 = 11.1, RY1 = 18.0;
  var RZ0 = 4.0, RZ1 = 4.9, RDECK = 5.0;

  /* fuel tanks and bund */
  var TANKS = [[13.75, -0.4], [13.75, 9.0]], TANK_R = 3.3, TANK_Z0 = 0.35, TANK_Z1 = 7.55;
  var BX0 = 9.6, BX1 = 18.1, BY0 = -5.0, BY1 = 13.2, BUND_H = 2.6;
  var PRY = 4.3;                     /* the pipe rack, between the tanks     */

  /* transformers: bushings of the east one on damage3d's switchgear point */
  var TRX = [-13.8, -6.5], TRY = -14.6, BUSH_Y = -15.0;
  var TR_Z0 = 0.45, TR_Z1 = 3.85;
  var FW_X = [-17.45, -10.15, -2.85], GY = -17.5;   /* firewalls, gantry line */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ========================================================== canvases ==
     Painted once per page and shared by every build (render3d builds this
     once per army colour and era, icons3d once per sidebar colour). Each is
     near white with the detail in grey, and the material's own colour is
     the paint: that is what restyle() and eraRestyle() recolour. */
  var CV = null, TX = null;
  function mk(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* profiled cladding, one 4 x 4 m tile at 64 px a metre: a trapezoid rib
     every 0.25 m, the sheet laps every metre, two fastener rows (the girts) */
  function wallCanvas() {
    var R = rng(3201), c = mk(256, 256), q = c.getContext("2d"), i, x;
    q.fillStyle = "#ececea"; q.fillRect(0, 0, 256, 256);
    for (i = 0; i < 26; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.06)" : "rgba(40,40,36,0.05)";
      q.fillRect(R() * 256, R() * 256, 20 + R() * 90, 20 + R() * 120);
    }
    for (x = 0; x < 256; x += 16) {
      q.fillStyle = "rgba(0,0,0,0.10)"; q.fillRect(x, 0, 2, 256);
      q.fillStyle = "rgba(255,255,255,0.10)"; q.fillRect(x + 3, 0, 2, 256);
    }
    q.fillStyle = "rgba(0,0,0,0.16)";
    for (x = 0; x < 256; x += 64) q.fillRect(x, 0, 1.5, 256);
    q.fillStyle = "rgba(0,0,0,0.22)";
    for (x = 4; x < 256; x += 16) { q.fillRect(x, 94, 2, 2); q.fillRect(x, 190, 2, 2); }
    /* rain streaks from the fixings */
    for (i = 0; i < 24; i++) {
      q.fillStyle = "rgba(60,54,44," + (0.04 + R() * 0.06).toFixed(3) + ")";
      q.fillRect(R() * 256, R() * 256, 1.5 + R() * 2, 20 + R() * 60);
    }
    return c;
  }

  /* the hall roof in plan, over its whole footprint and overhang: standing
     seams down the slope every 0.6 m, the ridge, and grime blown off the
     stacks on the north slope (the rooflights are geometry: see buildHall).
     u runs x from HX0 - OVX, v runs y from HY0 - OVY. */
  var RF = { x0: HX0 - OVX, y0: HY0 - OVY, sx: (HX1 - HX0) + 2 * OVX, sy: (HY1 - HY0) + 2 * OVY };
  function roofCanvas() {
    var R = rng(5102), W = 512, H = 352, c = mk(W, H), q = c.getContext("2d"), i, x;
    function px(xm) { return (xm - RF.x0) / RF.sx * W; }
    function py(ym) { return (1 - (ym - RF.y0) / RF.sy) * H; }
    q.fillStyle = "#e4e4e2"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(30,30,26,0.05)";
      q.fillRect(R() * W, R() * H, 30 + R() * 120, 10 + R() * 60);
    }
    for (x = RF.x0 + 0.3; x < RF.x0 + RF.sx; x += 0.6) {
      q.fillStyle = "rgba(0,0,0,0.13)"; q.fillRect(px(x), 0, 1.2, H);
      q.fillStyle = "rgba(255,255,255,0.10)"; q.fillRect(px(x) + 1.4, 0, 1, H);
    }
    q.fillStyle = "rgba(0,0,0,0.30)"; q.fillRect(0, py(RY) - 1, W, 2);
    /* soot settles on the north slope downwind of the flues */
    for (i = 0; i < 140; i++) {
      var sx = px(-12 + R() * 12), sy = py(RY + 1 + R() * 8);
      q.fillStyle = "rgba(24,22,20," + (0.03 + R() * 0.07).toFixed(3) + ")";
      q.fillRect(sx, sy, 2 + R() * 10, 2 + R() * 6);
    }
    /* the eaves gutter line stains */
    q.fillStyle = "rgba(40,36,30,0.18)";
    q.fillRect(0, py(HY1 + 0.2), W, py(HY1 - 0.4) - py(HY1 + 0.2));
    q.fillRect(0, py(HY0 + 0.4), W, py(HY0 - 0.2) - py(HY0 + 0.4));
    return c;
  }

  /* the site in plan, 36.3 m square at 14.1 px a metre: concrete in 5 m
     bays, asphalt on the truck yard by the crane door and the lane past the
     tank farm, gravel in the transformer bays and under the radiators, the
     bund floor with its sump, the covers of the cooling-water trenches,
     oil and soot where they fall. The patch under the hall is plain
     concrete, and every CONC part that is not the apron samples it. */
  var PLAIN_U = (-6 + E) / (2 * E), PLAIN_V = (-2 + E) / (2 * E);
  function siteCanvas() {
    var R = rng(9120), S = 512, c = mk(S, S), q = c.getContext("2d"), i, x, y;
    function px(xm) { return (xm + E) * S / (2 * E); }
    function py(ym) { return (E - ym) * S / (2 * E); }
    function rect(x0, y0, x1, y1, col) { q.fillStyle = col; q.fillRect(px(x0), py(y1), px(x1) - px(x0), py(y0) - py(y1)); }
    function speckle(x0, y0, x1, y1, n, a, b) {
      for (var k = 0; k < n; k++) {
        q.fillStyle = R() < 0.5 ? a : b;
        q.fillRect(px(x0 + R() * (x1 - x0)), py(y0 + R() * (y1 - y0)), 1.5 + R() * 1.5, 1.5 + R() * 1.5);
      }
    }
    q.fillStyle = "#d8d6d0"; q.fillRect(0, 0, S, S);
    for (i = 0; i < 60; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.06)" : "rgba(40,38,32,0.06)";
      q.fillRect(R() * S, R() * S, 20 + R() * 80, 20 + R() * 80);
    }
    q.fillStyle = "rgba(0,0,0,0.16)";
    for (x = -20; x <= 20; x += 5) { q.fillRect(px(x), 0, 1.2, S); q.fillRect(0, py(x), S, 1.2); }
    /* asphalt: the truck yard in the south-east, in front of the crane
       door, and the lane up the east gable past the tank farm */
    rect(HX1, -E, E, BY0, "#9a9a97");
    rect(HX1, BY0, BX0, E, "#9a9a97");
    rect(BX0, BY1, E, E, "#9a9a97");
    speckle(HX1, -E, E, BY0, 500, "rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");
    q.fillStyle = "rgba(245,245,240,0.7)";
    for (y = -16; y < 11; y += 2.4) q.fillRect(px(8.5), py(y + 1.2), 2, py(y) - py(y + 1.2));
    /* gravel in the transformer bays, round the gantry and under the fans */
    rect(HX0, -E, FW_X[2] + 0.4, HY0, "#c2beb4");
    speckle(HX0, -E, FW_X[2] + 0.4, HY0, 1400, "rgba(90,84,74,0.45)", "rgba(250,248,240,0.45)");
    rect(RX0, RY0 - 0.2, RX1, E, "#c2beb4");
    speckle(RX0, RY0 - 0.2, RX1, E, 1400, "rgba(90,84,74,0.45)", "rgba(250,248,240,0.45)");
    /* the cooling water runs to the radiators in covered trenches, one pair
       from under each bay's filter housing */
    for (i = 0; i < 4; i++) {
      x = bayX(i) + 1.75;
      rect(x - 0.5, HY1, x + 0.5, RY0 + 0.6, "#8e8c87");
      q.fillStyle = "rgba(0,0,0,0.22)";
      for (y = HY1 + 1; y < RY0; y += 1) q.fillRect(px(x - 0.5), py(y), px(x + 0.5) - px(x - 0.5), 1);
    }
    /* the bund floor, falling to a sump in its north-west corner */
    rect(BX0, BY0, BX1, BY1, "#cfcdc6");
    rect(BX0 + 0.6, BY1 - 1.6, BX0 + 1.6, BY1 - 0.6, "#5a5956");
    q.fillStyle = "rgba(0,0,0,0.18)";
    q.fillRect(px(BX0 + 0.9), py(BY1 - 1.6), 2, py(BY0 + 0.5) - py(BY1 - 1.6));
    /* oil at the roll-up doors and the tank connections, soot under the
       flues, rust under the transformer radiators */
    for (i = 0; i < 4; i++) {
      var dx = bayX(i) - 1.4;
      for (var k = 0; k < 6; k++) {
        q.fillStyle = "rgba(30,28,24," + (0.05 + R() * 0.10).toFixed(3) + ")";
        q.beginPath(); q.arc(px(dx + (R() - 0.5) * 2.6), py(HY1 + 0.6 + R() * 2.0), 4 + R() * 8, 0, 2 * PI); q.fill();
      }
    }
    for (i = 0; i < 30; i++) {
      q.fillStyle = "rgba(20,18,16," + (0.05 + R() * 0.08).toFixed(3) + ")";
      q.beginPath(); q.arc(px(FR_X[0] + R() * (FR_X[2] - FR_X[0])), py(FR_Y[0] + R() * (FR_Y[1] - FR_Y[0])), 3 + R() * 7, 0, 2 * PI); q.fill();
    }
    TRX.forEach(function (tx) {
      q.fillStyle = "rgba(80,50,30,0.25)";
      q.fillRect(px(tx - 3.3), py(TRY + 1.2), px(tx + 3.3) - px(tx - 3.3), py(TRY - 1.2) - py(TRY + 1.2));
    });
    /* cable trench covers from the hall to the transformers and annex */
    q.fillStyle = "rgba(0,0,0,0.20)";
    [TRX[0], TRX[1], 3.2].forEach(function (tx) { q.fillRect(px(tx - 0.4), py(HY0), px(tx + 0.4) - px(tx - 0.4), py(HY0 - 1.4) - py(HY0)); });
    /* manholes and drain gratings */
    [[8.5, -8], [8.5, 2], [-1, 7], [12, -12]].forEach(function (m) {
      q.fillStyle = "#4e4d4a"; q.beginPath(); q.arc(px(m[0]), py(m[1]), 6, 0, 2 * PI); q.fill();
    });
    /* the plain patch under the hall, which everything else samples */
    rect(-12, -6, 2, 2, "#d8d6d0");
    return c;
  }

  /* louvres, radiator fins and fan guards: slats every 0.15 m, tiled */
  function darkCanvas() {
    var c = mk(64, 64), q = c.getContext("2d"), y;
    q.fillStyle = "#8c9094"; q.fillRect(0, 0, 64, 64);
    for (y = 0; y < 64; y += 16) {
      q.fillStyle = "#e8ecef"; q.fillRect(0, y, 64, 5);
      q.fillStyle = "#26282a"; q.fillRect(0, y + 5, 64, 5);
    }
    return c;
  }

  /* the stack atlas. Left half: weathered steel, the silencer sections in
     its lower third, the flues above with soot on their last metre. The
     right half is plain paint: frame grey across its lower half, then duct
     cladding and soot black. */
  var FL = { steelU: [0.0, 0.5], silV: [0.0, 0.34], flueV: [0.36, 1.0],
             frame: [0.75, 0.25], duct: [0.625, 0.75], soot: [0.875, 0.75] };
  function flueCanvas() {
    var R = rng(7713), c = mk(256, 256), q = c.getContext("2d"), i, y;
    q.fillStyle = "#908a82"; q.fillRect(0, 0, 128, 256);
    for (i = 0; i < 70; i++) {
      q.fillStyle = R() < 0.55 ? "rgba(120,72,40," + (0.10 + R() * 0.18).toFixed(3) + ")"
                              : "rgba(40,38,36," + (0.06 + R() * 0.12).toFixed(3) + ")";
      q.fillRect(R() * 128, R() * 256, 1.5 + R() * 3, 10 + R() * 60);
    }
    q.fillStyle = "rgba(0,0,0,0.25)";
    for (y = 20; y < 256; y += 26) q.fillRect(0, y, 128, 1.5);
    /* soot on the last metre or so of each flue */
    var g = q.createLinearGradient(0, 0, 0, 34);
    g.addColorStop(0, "rgba(18,17,16,0.95)"); g.addColorStop(1, "rgba(18,17,16,0)");
    q.fillStyle = g; q.fillRect(0, 0, 128, 34);
    /* the band between flue and silencer rows, never sampled */
    q.fillStyle = "#908a82"; q.fillRect(0, 164, 128, 6);
    q.fillStyle = "#a4a8ab"; q.fillRect(128, 128, 128, 128);    /* frame  */
    q.fillStyle = "#cdd0d2"; q.fillRect(128, 0, 64, 128);       /* ducts  */
    q.fillStyle = "#26272a"; q.fillRect(192, 0, 64, 128);       /* soot   */
    return c;
  }

  /* the steelwork atlas: plain paint for everything but two cells, the
     louvre (slats in a frame) and the roll-up door (fine ribs), each laid
     over its whole panel by uvPanel() */
  var ST = { plain: [0.25, 0.5], louvre: [0.5, 1.0, 0.5, 1.0], door: [0.5, 1.0, 0.0, 0.5] };
  function steelCanvas() {
    var c = mk(128, 128), q = c.getContext("2d"), y;
    q.fillStyle = "#f0f0ee"; q.fillRect(0, 0, 128, 128);
    /* louvre: rows 0-63 are v 0.5-1 */
    q.fillStyle = "#34373a"; q.fillRect(64, 0, 64, 64);
    for (y = 3; y < 61; y += 4) { q.fillStyle = "#f4f5f6"; q.fillRect(67, y, 58, 2.4); }
    q.fillStyle = "#9a9ea2";
    q.fillRect(64, 0, 64, 3); q.fillRect(64, 61, 64, 3); q.fillRect(64, 0, 3, 64); q.fillRect(125, 0, 3, 64);
    /* roll-up door: rows 64-127 */
    q.fillStyle = "#e6e8e9"; q.fillRect(64, 64, 64, 64);
    for (y = 66; y < 126; y += 3) { q.fillStyle = "#a9adb0"; q.fillRect(64, y, 64, 1); }
    q.fillStyle = "#7c8084"; q.fillRect(64, 64, 2, 64); q.fillRect(126, 64, 2, 64);
    return c;
  }

  function tex(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    /* r148: encoding is the switch that works; colorSpace does nothing */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  function textures(THREE) {
    if (TX) return TX;
    try {
      if (!CV) CV = { wall: wallCanvas(), roof: roofCanvas(), site: siteCanvas(), dark: darkCanvas(),
                      flue: flueCanvas(), steel: steelCanvas() };
      TX = { wall: tex(THREE, CV.wall), roof: tex(THREE, CV.roof), site: tex(THREE, CV.site),
             dark: tex(THREE, CV.dark), flue: tex(THREE, CV.flue), steel: tex(THREE, CV.steel) };
      TX.steel.wrapS = TX.steel.wrapT = THREE.ClampToEdgeWrapping;
      TX.roof.wrapS = TX.roof.wrapT = THREE.ClampToEdgeWrapping;
      TX.site.wrapS = TX.site.wrapT = THREE.ClampToEdgeWrapping;
      TX.flue.wrapS = TX.flue.wrapT = THREE.ClampToEdgeWrapping;
    } catch (e) { TX = {}; }
    return TX;
  }

  /* ========================================================= materials ==
     Eight, one mesh each. WALL cladding and the tanks, ROOF sheeting, CONC
     apron, plinths, bund and firewalls, STEEL for doors, pipework, the
     radiator deck, gantry and transformer tanks, DARK louvres, fins, fans
     and insulators, TEAM (exactly the owner's colour), FLUE the stack atlas,
     and YELLOW safety rails and stairs on the tanks, the bund and the
     radiator deck. */
  function makeMats(THREE, C) {
    var X = textures(THREE), M = {};
    function std(col, map, rough, metal) {
      var m = new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: metal });
      if (map) m.map = map;
      return m;
    }
    M.wall = std(0xc8cbcc, X.wall, 0.80, 0.10);
    M.roof = std(0x8e9194, X.roof, 0.72, 0.18);
    M.conc = std(0xb4b2ae, X.site, 0.94, 0.02);
    M.steel = std(0xa4a8ab, X.steel, 0.62, 0.30);
    /* under 0.08 linear: neither restyle() nor eraRestyle() touches it */
    M.dark = std(0x4a4d50, X.dark, 0.78, 0.20);
    /* A white base under the atlas. restyle() passes over it (it is
       lighter than its band), so the stack keeps its own paint and
       weathering in every army. eraRestyle() tints it with the plant's
       other steel. */
    M.flue = std(X.flue ? 0xffffff : 0x8d8780, X.flue, 0.86, 0.12);
    M.yellow = std(0xd9a92b, null, 0.60, 0.10);
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    /* The flashes lie a few centimetres off their walls and roof: pulled a
       couple of depth steps toward the camera so they never shimmer. */
    M.team = new THREE.MeshStandardMaterial({ color: new THREE.Color(tc), roughness: 0.55, metalness: 0.12,
                                              polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    return M;
  }

  /* ============================================================ geometry ==
     Every part is made from three.js primitives (or a convex solid whose
     faces are turned outward from its own middle), moved into model space,
     given its UVs and handed to the baker by material key. */
  var V = null;                                 /* the THREE build() is handed */

  function flat(g) { return g.index ? g.toNonIndexed() : g; }
  /* keep only some groups of a geometry (a cylinder's torso and caps) */
  function groups(g, keep) {
    g = flat(g);
    if (!g.groups || !g.groups.length) return g;
    var P = g.attributes.position.array, N = g.attributes.normal.array, U = g.attributes.uv.array;
    var p = [], n = [], u = [], i, k;
    for (k = 0; k < g.groups.length; k++) {
      if (keep.indexOf(k) < 0) continue;
      var gr = g.groups[k];
      for (i = gr.start; i < gr.start + gr.count; i++) {
        p.push(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
        n.push(N[i * 3], N[i * 3 + 1], N[i * 3 + 2]);
        u.push(U[i * 2], U[i * 2 + 1]);
      }
    }
    var o = new V.BufferGeometry();
    o.setAttribute("position", new V.Float32BufferAttribute(p, 3));
    o.setAttribute("normal", new V.Float32BufferAttribute(n, 3));
    o.setAttribute("uv", new V.Float32BufferAttribute(u, 2));
    return o;
  }
  /* a box from its corners. drop names the faces left off because nothing
     ever sees them: X/x the +x/-x faces, Y/y, Z/z (top/bottom). */
  function box(x0, x1, y0, y1, z0, z1, drop) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    var g = flat(new V.BoxGeometry(x1 - x0, y1 - y0, z1 - z0));
    if (drop) {
      var names = "XxYyZz", keep = [], i;
      for (i = 0; i < 6; i++) if (drop.indexOf(names[i]) < 0) keep.push(i);
      g.clearGroups();
      for (i = 0; i < 6; i++) g.addGroup(i * 6, 6, i);
      g = groups(g, keep);
    }
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    return g;
  }
  function place(g, x, y, z, rx, ry, rz) {
    if (rx || ry || rz) g.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    g.translate(x || 0, y || 0, z || 0);
    return g;
  }
  /* an upright cylinder from z0 to z1; caps: "t", "b", "tb" or "" */
  function cylZ(r0, r1, z0, z1, x, y, seg, caps) {
    var g = new V.CylinderGeometry(r1, r0, z1 - z0, seg, 1, false);
    var keep = [0];
    if (caps && caps.indexOf("t") >= 0) keep.push(1);
    if (caps && caps.indexOf("b") >= 0) keep.push(2);
    g = groups(g, keep);
    g.rotateX(PI / 2);
    g.translate(x, y, (z0 + z1) / 2);
    return g;
  }
  /* a round bar or pipe from a to b */
  var _up = null;
  function rod(a, b, r, seg, caps) {
    if (!_up) _up = new V.Vector3(0, 1, 0);
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g = groups(g, caps ? [0, 1, 2] : [0]);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(_up, new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* a slim square member from a to b (bracing, rails, posts): four sides */
  function bar(a, b, w) { return rod(a, b, w * 0.7071, 4, false); }
  /* a disc facing up at height z */
  function discZ(r, x, y, z, seg) {
    var g = flat(new V.CircleGeometry(r, seg));
    g.translate(x, y, z);
    return g;
  }
  /* A convex solid from its faces, each a polygon of [x, y, z] corners,
     each wound so its normal points away from the solid's middle. */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, pos = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        if ((a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz >= 0) pos.push(a, b, d);
        else pos.push(a, d, b);
      }
    }
    var arr = [];
    for (i = 0; i < pos.length; i++) arr.push(pos[i][0], pos[i][1], pos[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(arr, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a box of lx x ly x lz centred on c, its x along e1 and y as near e2
     as a right-handed frame allows: a stair flight, a sloping slab */
  function obox(c, e1, e2, lx, ly, lz) {
    var a = new V.Vector3(e1[0], e1[1], e1[2]).normalize();
    var b = new V.Vector3(e2[0], e2[1], e2[2]);
    var n = new V.Vector3().crossVectors(a, b).normalize();
    b.crossVectors(n, a).normalize();
    var m = new V.Matrix4().makeBasis(a, b, n);
    m.setPosition(c[0], c[1], c[2]);
    var g = flat(new V.BoxGeometry(lx, ly, lz));
    g.applyMatrix4(m);
    return g;
  }
  /* the closed solid between two polygons with matching corners */
  function solid(A, B) {
    var f = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) f.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(f);
  }
  /* one flat triangle facing away from a point */
  function tri(a, b, c, away) {
    var g = convex([[a, b, c]]);
    var N = g.attributes.normal.array, P = g.attributes.position.array;
    var mx = (a[0] + b[0] + c[0]) / 3 - away[0], my = (a[1] + b[1] + c[1]) / 3 - away[1], mz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (N[0] * mx + N[1] * my + N[2] * mz < 0) {
      for (var k = 0; k < 3; k++) { var t = P[3 + k]; P[3 + k] = P[6 + k]; P[6 + k] = t; }
      for (k = 0; k < 9; k++) N[k] = -N[k];
    }
    return g;
  }

  /* ---------------------------------------------------------------- UVs */
  /* box projection by each triangle's own facing, S metres to the tile */
  function uvWorld(S) {
    return function (g) {
      var P = g.attributes.position.array, U = g.attributes.uv.array;
      for (var t = 0; t < P.length / 9; t++) {
        var o = t * 9;
        var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
        var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
        var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
        for (var k = 0; k < 3; k++) {
          var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2];
          var u, v;
          if (nz >= nx && nz >= ny) { u = x / S; v = y / S; }
          else if (nx >= ny) { u = y / S; v = z / S; }
          else { u = x / S; v = z / S; }
          U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
        }
      }
    };
  }
  function uvConst(u, v) {
    return function (g) {
      var U = g.attributes.uv.array;
      for (var i = 0; i < U.length; i += 2) { U[i] = u; U[i + 1] = v; }
    };
  }
  /* the geometry's own UVs (a cylinder's: around, along) into a rectangle */
  function uvRect(u0, u1, v0, v1) {
    return function (g) {
      var U = g.attributes.uv.array;
      for (var i = 0; i < U.length; i += 2) {
        U[i] = u0 + U[i] * (u1 - u0);
        U[i + 1] = v0 + U[i + 1] * (v1 - v0);
      }
    };
  }
  /* a panel on a wall laid over one atlas cell: facing x ("x") its u runs
     with y, facing y ("y") with x, and v runs up */
  function uvPanel(face, a0, a1, z0, z1, cell) {
    var e = 0.012;
    return function (g) {
      var P = g.attributes.position.array, U = g.attributes.uv.array;
      for (var i = 0; i < P.length / 3; i++) {
        var a = face === "x" ? P[i * 3 + 1] : P[i * 3];
        var fu = Math.min(1, Math.max(0, (a - a0) / (a1 - a0)));
        var fv = Math.min(1, Math.max(0, (P[i * 3 + 2] - z0) / (z1 - z0)));
        U[i * 2] = cell[0] + e + fu * (cell[1] - cell[0] - 2 * e);
        U[i * 2 + 1] = cell[2] + e + fv * (cell[3] - cell[2] - 2 * e);
      }
    };
  }
  function uvPlan(x0, y0, sx, sy) {
    return function (g) {
      var P = g.attributes.position.array, U = g.attributes.uv.array;
      for (var i = 0; i < P.length / 3; i++) {
        U[i * 2] = (P[i * 3] - x0) / sx;
        U[i * 2 + 1] = (P[i * 3 + 1] - y0) / sy;
      }
    };
  }

  /* ------------------------------------------------------------- baker */
  function solidOnly(g) {
    var P = g.attributes.position.array, N = g.attributes.normal.array, U = g.attributes.uv.array;
    var keep = [], t;
    for (t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
      if (cx * cx + cy * cy + cz * cz > 1e-10) keep.push(t);
    }
    if (keep.length * 9 === P.length) return g;
    var p = new Float32Array(keep.length * 9), n = new Float32Array(keep.length * 9), u = new Float32Array(keep.length * 6);
    for (var k = 0; k < keep.length; k++) {
      p.set(P.subarray(keep[k] * 9, keep[k] * 9 + 9), k * 9);
      n.set(N.subarray(keep[k] * 9, keep[k] * 9 + 9), k * 9);
      u.set(U.subarray(keep[k] * 6, keep[k] * 6 + 6), k * 6);
    }
    var o2 = new V.BufferGeometry();
    o2.setAttribute("position", new V.BufferAttribute(p, 3));
    o2.setAttribute("normal", new V.BufferAttribute(n, 3));
    o2.setAttribute("uv", new V.BufferAttribute(u, 2));
    return o2;
  }
  function Baker() { this.by = {}; this.order = []; }
  Baker.prototype.add = function (key, geo, uv) {
    var g = flat(geo);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (uv) uv(g);
    else if (key === "steel" || key === "yellow" || key === "team") uvConst(ST.plain[0], ST.plain[1])(g);
    if (!this.by[key]) { this.by[key] = []; this.order.push(key); }
    this.by[key].push(g);
  };
  Baker.prototype.flush = function (group, M) {
    for (var q = 0; q < this.order.length; q++) {
      var key = this.order[q], list = this.by[key], n = 0, j;
      /* drop the zero-area triangles (a cone's apex row) before counting */
      for (j = 0; j < list.length; j++) { list[j] = solidOnly(list[j]); n += list[j].attributes.position.count; }
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < list.length; j++) {
        var g = list[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        N.set(g.attributes.normal.array, o * 3);
        U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var geo = new V.BufferGeometry();
      geo.setAttribute("position", new V.BufferAttribute(P, 3));
      geo.setAttribute("normal", new V.BufferAttribute(N, 3));
      geo.setAttribute("uv", new V.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new V.Mesh(geo, M[key]);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
  };

  /* shorthands for the common UV choices */
  var W4 = null, DK = null, PLAIN = null, STK = null, DOOR = null, GLAZE = null, SHELL = null;
  function uvSetup() {
    W4 = uvWorld(4.0);
    DK = uvWorld(0.6);
    PLAIN = uvConst(PLAIN_U, PLAIN_V);
    /* single texels of the slat canvas: a mid grey for doors, the darkest
       for glazing; and a plain texel of the cladding for the tank shells */
    DOOR = uvConst(0.5, 0.06);
    GLAZE = uvConst(0.5, 0.14);
    SHELL = uvConst(0.035, 0.5);
    STK = {
      frame: uvConst(FL.frame[0], FL.frame[1]), duct: uvConst(FL.duct[0], FL.duct[1]),
      soot: uvConst(FL.soot[0], FL.soot[1]),
      sil: uvRect(FL.steelU[0], FL.steelU[1], FL.silV[0], FL.silV[1]),
      flue: uvRect(FL.steelU[0], FL.steelU[1], FL.flueV[0], FL.flueV[1])
    };
  }

  /* ============================================================== site == */
  function buildSite(K) {
    /* the apron: the plot's own hardstanding, which damage3d burns the
       wall-foot fire on. It ends at E, so BLD_SCALE puts its edge 3 cm
       inside the plot, and two plants built side by side meet along a
       seam instead of laying one slab over the other at the same height */
    K.add("conc", box(-E, E, -E, E, 0, G0, "z"), uvPlan(-E, -E, 2 * E, 2 * E));
  }

  /* ============================================================== hall == */
  function buildHall(K) {
    var k, s;
    /* walls: one shell, the roof closes it */
    K.add("wall", box(HX0, HX1, HY0, HY1, G0, EAVE, "Zz"), W4);
    /* the gable triangles over the eaves line */
    var mid = [(HX0 + HX1) / 2, RY, 5];
    [HX0, HX1].forEach(function (x) {
      K.add("wall", tri([x, HY0, EAVE], [x, HY1, EAVE], [x, RY, RIDGE], mid), W4);
    });
    /* a concrete plinth course round the foot */
    K.add("conc", box(HX0 - 0.06, HX1 + 0.06, HY0 - 0.06, HY1 + 0.06, G0, 0.75, "Zz"), PLAIN);
    /* the roof: two slabs meeting on the ridge, their top faces ON the
       roofZ() line, overhanging the walls */
    var xa = HX0 - OVX, xb = HX1 + OVX;
    [[RY, HY1 + OVY], [RY, HY0 - OVY]].forEach(function (sl) {
      var ye = sl[1], ze = roofZ(sl[1] > RY ? HY1 : HY0) - (RIDGE - EAVE) * OVY / (HY1 - RY);
      var A = [[xa, RY, RIDGE], [xb, RY, RIDGE], [xb, ye, ze], [xa, ye, ze]];
      var B = A.map(function (p) { return [p[0], p[1], p[2] - ROOF_T]; });
      /* the face on the ridge line is left off: the other slab's is in the
         same place, facing the other way, under the ridge cap */
      K.add("roof", convex([A, B, [A[1], A[2], B[2], B[1]], [A[2], A[3], B[3], B[2]], [A[3], A[0], B[0], B[3]]]),
            uvPlan(RF.x0, RF.y0, RF.sx, RF.sy));
      /* the eaves gutter, hung under the sheet's edge. The sheet runs
         20 cm out over it and its outer lip stands 8 cm beyond the sheet.
         (Built flush with the edge, the gutter's face lay in the same plane
         as the sheet's edge along the whole eave.) */
      var gs = ye > 0 ? 1 : -1;
      K.add("steel", box(xa, xb, ye - gs * 0.20, ye + gs * 0.08, ze - ROOF_T - 0.22, ze - ROOF_T, ""));
    });
    /* rooflights: translucent GRP sheets laid in the profile, two a bay on
       each slope, stopping short of the extract fans on the north slope.
       They are what gives an industrial roof its scale from the air: pale
       strips in a regular row. As paint on the roof sheet they came out a
       tenth lighter than the steel round them and did not read at all, so
       they are quads in the cladding's own light colour, which restyle()
       turns into the army's wall colour: about 1.8 times the brightness of
       its roof colour. They stand 10 cm proud: at the zoom-out limit (1,200
       m, near plane 2 m) one depth step is 4 cm there. */
    for (k = 0; k < 4; k++) {
      [-1.6, 1.6].forEach(function (d) {
        var x0 = bayX(k) + d - 0.6, x1 = x0 + 1.2;
        [[RY + 1.2, HY1 - 2.5], [HY0 + 1.2, RY - 1.2]].forEach(function (sy) {
          var za = roofZ(sy[0]) + 0.1, zb = roofZ(sy[1]) + 0.1, dn = [x0 + 0.6, (sy[0] + sy[1]) / 2, 0];
          K.add("wall", tri([x0, sy[0], za], [x1, sy[0], za], [x1, sy[1], zb], dn), SHELL);
          K.add("wall", tri([x0, sy[0], za], [x1, sy[1], zb], [x0, sy[1], zb], dn), SHELL);
        });
      });
    }
    /* team: the ridge cap, and a fascia band round the top of the walls */
    [-0.7, 0.7].forEach(function (w) {
      var y1 = RY + w, z1 = roofZ(y1);
      var T0 = [[xa, RY, RIDGE + 0.06], [xb, RY, RIDGE + 0.06], [xb, y1, z1 + 0.06], [xa, y1, z1 + 0.06]];
      var T1 = T0.map(function (p) { return [p[0], p[1], p[2] - 0.08]; });
      K.add("team", convex([T0, T1, [T0[1], T0[2], T1[2], T1[1]], [T0[2], T0[3], T1[3], T1[2]], [T0[3], T0[0], T1[0], T1[3]]]));
    });
    K.add("team", box(HX0, HX1, HY1, HY1 + 0.06, EAVE - 0.75, EAVE - 0.12, "zZy"));
    K.add("team", box(HX0, HX1, HY0 - 0.06, HY0, EAVE - 0.75, EAVE - 0.12, "zZY"));
    K.add("team", box(HX1, HX1 + 0.06, HY0, HY1, EAVE - 0.75, EAVE - 0.12, "zZx"));
    K.add("team", box(HX0 - 0.06, HX0, HY0, HY1, EAVE - 0.75, EAVE - 0.12, "zZX"));

    /* ---- north wall, the turbocharger ends: every bay has a roll-up door
       for pulling a turbocharger or a cylinder unit out onto the lane, and
       over the next 2.5 m of wall the charge-air filter housing, a clad box
       with a louvred face and a drip plate over it. The exhaust leaves
       through the wall above the door. */
    for (k = 0; k < 4; k++) {
      var xc = bayX(k);
      K.add("steel", box(xc - 2.9, xc + 0.1, HY1, HY1 + DOOR_T, G0, 4.3, "zy"), uvPanel("y", xc - 2.9, xc + 0.1, G0, 4.3, ST.door));
      K.add("steel", box(xc - 3.05, xc + 0.25, HY1, HY1 + 0.55, 4.3, 4.85, "y"));
      K.add("wall", box(xc + 0.5, xc + 3.0, HY1, HY1 + 1.2, 4.8, 8.8, "y"), W4);
      K.add("steel", box(xc + 0.7, xc + 2.8, HY1 + 1.2, HY1 + 1.26, 5.1, 8.0, "y"), uvPanel("y", xc + 0.7, xc + 2.8, 5.1, 8.0, ST.louvre));
      K.add("steel", box(xc + 0.6, xc + 2.9, HY1 + 1.2, HY1 + 1.55, 8.02, 8.1));
      /* the extract fans on the north slope, low, near the eaves: nothing
         on this roof is let stand higher than the ridge cap */
      var fy = HY1 - 1.6, fz = roofZ(fy) - 0.1;
      K.add("steel", cylZ(0.62, 0.55, fz, fz + 0.55, xc - 1.4, fy, 10, "t"));
      K.add("dark", discZ(0.5, xc - 1.4, fy, fz + 0.61, 10), DK);
    }
    /* ---- east gable: the crane door the gensets came in by, on the truck
       yard; louvres high, and a door by the pipe rack */
    K.add("steel", box(HX1, HX1 + DOOR_T, -10.4, -5.4, G0, 6.2, "zx"), uvPanel("x", -10.4, -5.4, G0, 6.2, ST.door));
    K.add("steel", box(HX1, HX1 + 0.6, -10.6, -5.2, 6.2, 6.8, "x"));
    [[-1.6, 1.4], [2.0, 4.8]].forEach(function (yy) {
      K.add("steel", box(HX1, HX1 + 0.06, yy[0], yy[1], 6.4, 8.6, "x"), uvPanel("x", yy[0], yy[1], 6.4, 8.6, ST.louvre));
    });
    K.add("dark", box(HX1, HX1 + DOOR_T, -4.4, -3.4, G0, 2.3, "xz"), DOOR);
    /* ---- south wall, the generator ends: ventilation louvres high in
       every bay, the bus ducts out to the transformers, two doors */
    for (k = 0; k < 4; k++) {
      s = bayX(k);
      K.add("steel", box(s - 1.2, s + 1.2, HY0 - 0.06, HY0, 6.6, 8.6, "Y"), uvPanel("y", s - 1.2, s + 1.2, 6.6, 8.6, ST.louvre));
    }
    K.add("dark", box(-2.4, -1.4, HY0 - DOOR_T, HY0, G0, 2.3, "Yz"), DOOR);
    /* ---- west gable */
    [[-8.6, -4.6], [-0.6, 3.4]].forEach(function (yy) {
      K.add("steel", box(HX0 - 0.06, HX0, yy[0], yy[1], 6.4, 8.6, "X"), uvPanel("x", yy[0], yy[1], 6.4, 8.6, ST.louvre));
    });
  }

  /* ============================================================= stack ==
     The one narrow mesh (see the header): ducts, silencers, flues, frame
     and its platforms, rails and ladder, all in the stack atlas. */
  function buildStack(K) {
    var i, k;
    for (i = 0; i < 4; i++) {
      var x = FX[i];
      /* the silencer: the duct comes in at its foot, 25 cm above its
         closed bottom, and the gas leaves at its top through the flue. The
         11.4 m floor of the frame carries it. On the ORION frame the fat
         sections likewise begin where the ducts come in, above the lowest
         bay, and the slimmer flues rise from their tops; at Rankin Inlet
         the silencers stand above the roofline. */
      K.add("flue", cylZ(SIL_R, SIL_R, SIL_Z0, SIL_Z1, x, FY, 14, "b"), STK.sil);
      K.add("flue", cylZ(SIL_R, FLUE_R, SIL_Z1, SIL_Z1 + 0.6, x, FY, 14, ""), STK.sil);
      K.add("flue", cylZ(FLUE_R, FLUE_R, SIL_Z1 + 0.6, FLUE_TOP - 0.35, x, FY, 12, ""), STK.flue);
      /* the rolled lip, and the black throat under it */
      K.add("flue", cylZ(FLUE_R + 0.07, FLUE_R + 0.07, FLUE_TOP - 0.35, FLUE_TOP, x, FY, 12, ""), STK.soot);
      var ring = flat(new V.RingGeometry(FLUE_R - 0.02, FLUE_R + 0.07, 12, 1));
      ring.translate(x, FY, FLUE_TOP);
      K.add("flue", ring, STK.soot);
      /* the throat is closed just under the lip, across the lip's whole
         bore: an open flue's inside is culled, and through it the camera
         would see the sky beyond (at the flue's own radius, a sliver of
         the lip's inside still showed past the ring at the game's pitch) */
      K.add("flue", discZ(FLUE_R + 0.07, x, FY, FLUE_TOP - 0.06, 12), STK.soot);
    }
    /* the exhaust ducts, clad in aluminium: out of the wall above each
       roll-up door, north across the lane, along to their own flue and into
       its silencer. Bays 1 and 4 run 2.3 m off the wall and bays 2 and 3
       1.2 m off it, over the filter housings, so no two runs meet. The
       first two legs run on past their corner by the duct's radius, capped,
       which reads as the elbow; the last starts on the run's axis, so its
       open end is buried in the run (from its surface it showed a hole). */
    for (k = 0; k < 4; k++) {
      var xe = bayX(k) - 0.2, xf = FX[k], ry = HY1 + ((k === 0 || k === 3) ? 2.3 : 1.2);
      var dir = xf > xe ? 1 : -1;
      K.add("flue", rod([xe, HY1 - 0.1, DUCT_Z], [xe, ry + DUCT_R, DUCT_Z], DUCT_R, 10, true), STK.duct);
      K.add("flue", rod([xe - dir * DUCT_R, ry, DUCT_Z], [xf + dir * DUCT_R, ry, DUCT_Z], DUCT_R, 10, true), STK.duct);
      K.add("flue", rod([xf, ry, DUCT_Z], [xf, FY - SIL_R + 0.15, DUCT_Z], DUCT_R, 10, false), STK.duct);
      /* the long runs have a post under them */
      if (k === 0 || k === 3) {
        var px = (xe + xf) / 2;
        K.add("flue", bar([px, ry, G0], [px, ry, DUCT_Z - DUCT_R], 0.3), STK.frame);
        K.add("flue", bar([px, ry - 0.6, DUCT_Z - DUCT_R - 0.1], [px, ry + 0.6, DUCT_Z - DUCT_R - 0.1], 0.2), STK.frame);
      }
    }
    /* the frame: six columns, girts at three levels, single diagonals on
       every face, grating platforms at 11.4 m (the floor that carries the
       silencers) and 16.4 m (on the flues, where the sampling ports are) */
    var c, lv, a, b;
    for (a = 0; a < 3; a++) for (b = 0; b < 2; b++)
      K.add("flue", box(FR_X[a] - 0.18, FR_X[a] + 0.18, FR_Y[b] - 0.18, FR_Y[b] + 0.18, G0, FR_TOP, "z"), STK.frame);
    for (lv = 0; lv < FR_Z.length; lv++) {
      var z = FR_Z[lv];
      for (b = 0; b < 2; b++) K.add("flue", bar([FR_X[0], FR_Y[b], z], [FR_X[2], FR_Y[b], z], 0.24), STK.frame);
      for (a = 0; a < 3; a++) K.add("flue", bar([FR_X[a], FR_Y[0], z], [FR_X[a], FR_Y[1], z], 0.24), STK.frame);
    }
    var ZL = [G0].concat(FR_Z);
    for (lv = 0; lv < FR_Z.length; lv++) {
      for (b = 0; b < 2; b++) for (a = 0; a < 2; a++) {
        var flip = (a + lv) & 1;
        K.add("flue", bar([FR_X[a + flip], FR_Y[b], ZL[lv]], [FR_X[a + 1 - flip], FR_Y[b], ZL[lv + 1]], 0.16), STK.frame);
      }
      for (a = 0; a < 3; a += 2)
        K.add("flue", bar([FR_X[a], FR_Y[lv & 1], ZL[lv]], [FR_X[a], FR_Y[1 - (lv & 1)], ZL[lv + 1]], 0.16), STK.frame);
    }
    /* The hand rails and the ladder are in the frame's own paint, as on
       the ORION frame, where they are red and white with the rest of it.
       They are not in the YELLOW mesh with the rails on the tanks and the
       radiator deck. That mesh spans the plot, so it counts in
       roofHeightOf() (see the header), and rails at 17.5 m in it would lift
       every period's kit from the roof (10.46 m) to 17.55 m. Nor are they
       yellow paint in this atlas: eraRestyle() tints this material, and
       the brick of e50 turned that yellow orange-brown. */
    [FR_Z[1], FR_TOP].forEach(function (zp) {
      K.add("flue", box(FR_X[0] - 0.3, FR_X[2] + 0.3, FR_Y[0] - 0.3, FR_Y[1] + 0.3, zp, zp + 0.1), STK.soot);
      /* the hand rail round each platform */
      var r = zp + 1.1, e = [[FR_X[0] - 0.3, FR_Y[0] - 0.3], [FR_X[2] + 0.3, FR_Y[0] - 0.3],
                             [FR_X[2] + 0.3, FR_Y[1] + 0.3], [FR_X[0] - 0.3, FR_Y[1] + 0.3]];
      for (c = 0; c < 4; c++) {
        var p = e[c], q = e[(c + 1) % 4];
        K.add("flue", bar([p[0], p[1], r], [q[0], q[1], r], 0.07), STK.frame);
        K.add("flue", bar([p[0], p[1], zp + 0.1], [p[0], p[1], r], 0.07), STK.frame);
      }
    });
    /* the ladder up the frame's east end, caged in real life */
    [-0.35, 0.35].forEach(function (d) {
      K.add("flue", bar([FR_X[2] + 0.45, FY + d, G0], [FR_X[2] + 0.45, FY + d, FR_TOP + 1.1], 0.07), STK.frame);
    });
  }

  /* ========================================================= radiators ==
     Eight modules of three fans, each module 3.1 m wide, on a steel deck
     over the finned cores, on legs. From above it is what it is on every
     photograph: rows of dark round fans in a light grid. */
  function buildRadiators(K) {
    var i, j;
    var LX = [], LY = [RY0 + 0.2, (RY0 + RY1) / 2, RY1 - 0.2];
    for (i = 0; i < 5; i++) LX.push(RX0 + 0.2 + (RX1 - RX0 - 0.4) * i / 4);
    for (i = 0; i < LX.length; i++) for (j = 0; j < LY.length; j++)
      K.add("steel", box(LX[i] - 0.15, LX[i] + 0.15, LY[j] - 0.15, LY[j] + 0.15, G0, RZ0, "Zz"));
    for (j = 0; j < LY.length; j++) K.add("steel", box(RX0, RX1, LY[j] - 0.2, LY[j] + 0.2, RZ0 - 0.45, RZ0, "z"));
    /* diagonal bracing on the outer faces */
    for (i = 0; i < LX.length - 1; i++) {
      K.add("steel", bar([LX[i], LY[2], G0], [LX[i + 1], LY[2], RZ0 - 0.45], 0.14));
    }
    K.add("steel", bar([LX[4], LY[0], G0], [LX[4], LY[2], RZ0 - 0.45], 0.14));
    /* the finned cores, then the fan deck on them */
    K.add("dark", box(RX0, RX1, RY0, RY1, RZ0, RZ1, "Zz"), uvWorld(0.45));
    K.add("steel", box(RX0 - 0.05, RX1 + 0.05, RY0 - 0.05, RY1 + 0.05, RZ1, RDECK, "z"));
    var cw = (RX1 - RX0) / 8, cl = (RY1 - RY0) / 3;
    for (i = 0; i < 8; i++) {
      var x = RX0 + cw * (i + 0.5);
      if (i) K.add("dark", box(RX0 + cw * i - 0.06, RX0 + cw * i + 0.06, RY0, RY1, RDECK, RDECK + 0.07, "z"), DK);
      for (j = 0; j < 3; j++) {
        var y = RY0 + cl * (j + 0.5);
        /* the shroud ring and the fan in its guard: a dark disc inside a
           light rim, which is how the photographs read from above. The disc
           stands 6 cm off the cap: 1 cm is under one depth step at the
           zoom-out limit, and the two would flicker */
        K.add("steel", cylZ(1.06, 1.06, RDECK, RDECK + 0.3, x, y, 10, "t"));
        K.add("dark", discZ(0.9, x, y, RDECK + 0.36, 10), DK);
      }
    }
    /* the walkway rails along both long sides, and the stair up */
    [RY0 - 0.02, RY1 + 0.02].forEach(function (y) {
      K.add("yellow", bar([RX0, y, RDECK + 1.05], [RX1, y, RDECK + 1.05], 0.07));
      for (i = 0; i <= 4; i++) {
        var px = RX0 + (RX1 - RX0) * i / 4;
        K.add("yellow", bar([px, y, RDECK], [px, y, RDECK + 1.05], 0.07));
      }
    });
    /* the stair: down the lane from a landing off the deck's east end,
       southward, at 44 degrees */
    var sx0 = RX1 + 1.0, sy1 = RY1 - 1.1, sy0 = sy1 - 5.0;
    K.add("steel", box(RX1 + 0.05, sx0 + 0.56, sy1, sy1 + 0.9, RDECK - 0.12, RDECK));
    K.add("yellow", obox([sx0, (sy0 + sy1) / 2, (G0 + RDECK) / 2], [0, sy1 - sy0, RDECK - G0], [1, 0, 0],
                         Math.sqrt(25 + (RDECK - G0) * (RDECK - G0)), 1.0, 0.22));
    K.add("yellow", bar([sx0 + 0.5, sy0, G0 + 1.0], [sx0 + 0.5, sy1, RDECK + 1.0], 0.07));
    /* the cooling water: a supply and a return from each engine's free
       end come up out of their trench (painted on the apron) and rise to
       the field's header, which runs under the deck */
    for (i = 0; i < 4; i++) for (j = 0; j < 2; j++) {
      var rx = bayX(i) + 1.55 + 0.4 * j;
      K.add("steel", rod([rx, RY0 + 0.55, G0], [rx, RY0 + 0.55, 2.9], 0.16, 8, false));
    }
    K.add("steel", rod([RX0 + 0.3, RY0 + 0.55, 2.9], [RX1 - 0.3, RY0 + 0.55, 2.9], 0.3, 8, true));
  }

  /* =========================================================== tank farm */
  function buildTanks(K) {
    var i, k;
    for (i = 0; i < 2; i++) {
      var tx = TANKS[i][0], ty = TANKS[i][1];
      K.add("conc", cylZ(TANK_R + 0.25, TANK_R + 0.25, G0, TANK_Z0, tx, ty, 16, "t"), PLAIN);
      K.add("wall", cylZ(TANK_R, TANK_R, TANK_Z0, TANK_Z1, tx, ty, 24, ""), SHELL);
      var cone = new V.ConeGeometry(TANK_R + 0.06, 0.42, 24, 1, true);
      cone.rotateX(PI / 2);
      cone.translate(tx, ty, TANK_Z1 + 0.21);
      K.add("wall", cone, SHELL);
      /* team band round the top course */
      K.add("team", cylZ(TANK_R + 0.05, TANK_R + 0.05, TANK_Z1 - 0.75, TANK_Z1 - 0.05, tx, ty, 24, ""));
      /* the stair: four flights round the east side, south to north, each
         a stringer slab with its outer rail, onto the roof by a short rail */
      var R = TANK_R + 0.55, a0 = -75 * PI / 180, da = 36 * PI / 180, h = (TANK_Z1 - TANK_Z0) / 4;
      for (k = 0; k < 4; k++) {
        var aA = a0 + k * da, aB = aA + da, zA = TANK_Z0 + k * h, zB = zA + h;
        var pA = [tx + R * Math.cos(aA), ty + R * Math.sin(aA)], pB = [tx + R * Math.cos(aB), ty + R * Math.sin(aB)];
        var oA = [tx + (R + 0.45) * Math.cos(aA), ty + (R + 0.45) * Math.sin(aA)];
        var oB = [tx + (R + 0.45) * Math.cos(aB), ty + (R + 0.45) * Math.sin(aB)];
        var dx = pB[0] - pA[0], dy = pB[1] - pA[1], L = Math.sqrt(dx * dx + dy * dy + h * h);
        var am = (aA + aB) / 2;
        K.add("yellow", obox([(pA[0] + pB[0]) / 2, (pA[1] + pB[1]) / 2, (zA + zB) / 2 - 0.09],
                             [dx, dy, h], [Math.cos(am), Math.sin(am), 0], L, 0.9, 0.18));
        K.add("yellow", bar([oA[0], oA[1], zA + 1.0], [oB[0], oB[1], zB + 1.0], 0.07));
        K.add("yellow", bar([oA[0], oA[1], zA], [oA[0], oA[1], zA + 1.0], 0.07));
      }
      /* the roof rail at the stair head, and the vent at the crown */
      var aT = a0 + 4 * da;
      for (k = 0; k < 3; k++) {
        var b0 = aT - 0.35 + k * 0.35, b1 = b0 + 0.35;
        K.add("yellow", bar([tx + (TANK_R - 0.1) * Math.cos(b0), ty + (TANK_R - 0.1) * Math.sin(b0), TANK_Z1 + 1.1],
                            [tx + (TANK_R - 0.1) * Math.cos(b1), ty + (TANK_R - 0.1) * Math.sin(b1), TANK_Z1 + 1.1], 0.07));
        K.add("yellow", bar([tx + (TANK_R - 0.1) * Math.cos(b0), ty + (TANK_R - 0.1) * Math.sin(b0), TANK_Z1 + 0.1],
                            [tx + (TANK_R - 0.1) * Math.cos(b0), ty + (TANK_R - 0.1) * Math.sin(b0), TANK_Z1 + 1.1], 0.07));
      }
      K.add("steel", cylZ(0.3, 0.3, TANK_Z1 + 0.35, TANK_Z1 + 0.95, tx, ty, 8, "t"));
      /* the level gauge board down the north-west side */
      var ag = 135 * PI / 180;
      K.add("steel", box(tx + (TANK_R + 0.02) * Math.cos(ag) - 0.08, tx + (TANK_R + 0.02) * Math.cos(ag) + 0.08,
                         ty + (TANK_R + 0.02) * Math.sin(ag) - 0.08, ty + (TANK_R + 0.02) * Math.sin(ag) + 0.08,
                         TANK_Z0 + 0.5, TANK_Z1 - 0.8, "z"));
    }
    /* the bund: (7.9 x 17.6 m inside, less the other tank) x 2.6 m holds
       272 m3, 110% of one tank's 246 */
    K.add("conc", box(BX0, BX0 + 0.3, BY0, BY1, G0, G0 + BUND_H, "z"), PLAIN);
    K.add("conc", box(BX1 - 0.3, BX1, BY0, BY1, G0, G0 + BUND_H, "z"), PLAIN);
    K.add("conc", box(BX0 + 0.3, BX1 - 0.3, BY0, BY0 + 0.3, G0, G0 + BUND_H, "zXx"), PLAIN);
    K.add("conc", box(BX0 + 0.3, BX1 - 0.3, BY1 - 0.3, BY1, G0, G0 + BUND_H, "zXx"), PLAIN);
    /* the step-over from the truck yard: a stair up the south wall and one
       down inside, clear of the tank's foundation */
    [-1, 1].forEach(function (s) {
      K.add("yellow", obox([10.6, BY0 + 0.15 + s * 1.1, G0 + BUND_H / 2], [0, -s * 2.0, BUND_H + 0.1], [1, 0, 0],
                           Math.sqrt(4 + (BUND_H + 0.1) * (BUND_H + 0.1)), 0.8, 0.12));
    });
    /* pipe rack: fuel supply, return and the heating line from the tanks
       across the bund wall to the hall's east gable */
    var PR = [PRY - 0.3, PRY, PRY + 0.3], xr0 = HX1, xr1 = TANKS[0][0];
    PR.forEach(function (y) { K.add("steel", rod([xr0, y, 3.2], [xr1, y, 3.2], 0.12, 6, false)); });
    [8.5, 11.4].forEach(function (x) {
      K.add("steel", bar([x, PRY - 0.7, G0], [x, PRY - 0.7, 3.05], 0.22));
      K.add("steel", bar([x, PRY + 0.7, G0], [x, PRY + 0.7, 3.05], 0.22));
      K.add("steel", bar([x, PRY - 0.8, 3.03], [x, PRY + 0.8, 3.03], 0.2));
    });
    K.add("steel", rod([xr1, PRY, 3.3], [xr1, PRY, 1.0], 0.14, 6, true));
    K.add("steel", rod([xr1, TANKS[0][1] + TANK_R - 0.1, 1.0], [xr1, TANKS[1][1] - TANK_R + 0.1, 1.0], 0.14, 6, false));
  }

  /* ========================================================== switchyard */
  function buildYard(K) {
    var i, k;
    /* firewalls either side of each transformer bay, standing off the
       hall's south wall */
    FW_X.forEach(function (x) { K.add("conc", box(x - 0.18, x + 0.18, -16.6, HY0 - 0.6, G0, 6.2, "z"), PLAIN); });
    for (i = 0; i < 2; i++) {
      var cx = TRX[i];
      K.add("conc", box(cx - 2.6, cx + 2.6, TRY - 1.6, TRY + 1.6, G0, TR_Z0, "z"), PLAIN);
      /* the tank and its cover */
      K.add("steel", box(cx - 2.1, cx + 2.1, TRY - 1.3, TRY + 1.3, TR_Z0, TR_Z1, "z"));
      K.add("steel", box(cx - 2.2, cx + 2.2, TRY - 1.4, TRY + 1.4, TR_Z1, TR_Z1 + 0.12));
      /* radiator banks on both ends */
      [-1, 1].forEach(function (s) {
        K.add("dark", box(cx + s * 2.1, cx + s * 3.0, TRY - 1.05, TRY + 1.05, 0.75, 3.45, "z"), uvWorld(0.4));
      });
      /* the conservator on its stools, over the north edge */
      K.add("steel", rod([cx - 1.8, TRY + 0.95, 4.65], [cx + 0.9, TRY + 0.95, 4.65], 0.45, 10, true));
      [-1.4, 0.5].forEach(function (x) { K.add("steel", bar([cx + x, TRY + 0.95, TR_Z1 + 0.1], [cx + x, TRY + 0.95, 4.3], 0.16)); });
      /* three HV bushings in a row along the south edge, their caps, and
       the LV bus duct north into the hall */
      for (k = -1; k <= 1; k++) {
        var bx = cx + k * 1.05;
        K.add("dark", cylZ(0.2, 0.11, TR_Z1 + 0.12, 5.75, bx, BUSH_Y, 6, "t"));
        K.add("steel", cylZ(0.15, 0.15, 5.75, 5.95, bx, BUSH_Y, 6, "t"));
      }
      K.add("steel", box(cx - 0.45, cx + 0.45, TRY + 1.3, HY0, 2.9, 3.6, "Yz"));
      /* the switchyard gantry over the bay: two columns, a beam, three
       tension strings, and the jumpers down to the bushings */
      var c0 = cx - 3.0, c1 = cx + 3.0, gy = GY, gz = 9.6;
      [c0, c1].forEach(function (x) {
        K.add("steel", rod([x, gy, G0], [x, gy, gz], 0.32, 4, true));
      });
      K.add("steel", box(c0 - 0.3, c1 + 0.3, gy - 0.25, gy + 0.25, gz - 0.5, gz, ""));
      for (k = -1; k <= 1; k++) {
        var sx = cx + k * 1.05;
        K.add("dark", cylZ(0.13, 0.13, gz - 1.4, gz - 0.5, sx, gy + 0.25, 6, "tb"));
        K.add("dark", rod([sx, gy + 0.25, gz - 1.4], [sx, BUSH_Y, 5.95], 0.05, 4, true));
      }
    }
    /* the electrical annex against the hall's south-east corner: switch-
       gear and the control room, with its door, windows and the air
       conditioners on its roof */
    var ax0 = -1.0, ax1 = HX1, ay0 = -17.8, ay1 = HY0;
    K.add("wall", box(ax0, ax1, ay0, ay1, G0, 4.6, "zY"), W4);
    K.add("roof", box(ax0 - 0.15, ax1 + 0.15, ay0 - 0.15, ay1, 4.6, 4.8, ""), uvConst(0.51, 0.35));
    K.add("team", box(ax0 - 0.16, ax1 + 0.16, ay0 - 0.22, ay0 - 0.16, 4.25, 4.8, "Yz"));
    K.add("dark", box(4.2, 5.4, ay0 - DOOR_T, ay0, G0, 2.3, "Yz"), DOOR);
    [0.2, 2.2].forEach(function (x) { K.add("dark", box(x, x + 1.4, ay0 - 0.06, ay0, 1.6, 2.8, "Y"), GLAZE); });
    K.add("dark", box(ax1, ax1 + 0.06, -17.0, -13.4, 1.6, 2.8, "x"), GLAZE);
    [[0.4, -17.2], [3.2, -17.2]].forEach(function (p) {
      K.add("steel", box(p[0], p[0] + 1.8, p[1], p[1] + 1.1, 4.8, 5.8, "z"));
    });
  }

  /* ============================================================== build */
  function build(THREE, Mod, C) {
    V = THREE;
    uvSetup();
    var M = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "diesel_station";
    var K = new Baker();
    buildSite(K);
    buildHall(K);
    buildStack(K);
    buildRadiators(K);
    buildTanks(K);
    buildYard(K);
    K.flush(g, M);
    return g;
  }

  return { build: build };
})();

/* Replaces the turbine hall and cooling towers in units3d_salvage.js. Heroes
   load after it, so this plain assignment is the one render3d and icons3d
   find. */
BLD_MODELS["power"] = { build: HeroDieselStation.build };
