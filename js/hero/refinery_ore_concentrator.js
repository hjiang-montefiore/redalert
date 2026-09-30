/* ===== refinery_ore_concentrator.js - HERO model: the Ore Refinery as a mine's concentrator =====
   BUILDINGS.refinery (rules.js): every faction, every era, a 3 x 2 plot,
   60 x 40 m of model space that render3d.js draws 1.1 times life size.
   The card says it "processes raw ore into credits", ships with the Ore
   Hauler, stores cash, imports crude and takes delivery of fuel bought on
   the market. The model it replaces (units3d_salvage.js) was an oil
   refinery's burning flare stack standing among ore hoppers: two
   industries at once, 407 meshes and 23 materials.

   What the ore actually goes into at a mine is a CONCENTRATOR, and this
   draws a small one at real scale, sized to the hero hauler it serves
   (js/hero/harvester_ore_hauler.js, a Caterpillar 777F: 10.53 m long,
   6.05 m over the canopy, a 5.52 m body, 2.70 m tyres). The ore runs
   round the plot the way it runs round a real plant:

     truck dump pocket (south edge) -> primary crusher house -> covered
     conveyor gallery at 15 degrees -> head house over a conical coarse-ore
     stockpile -> reclaim tunnel under the pile -> second gallery -> mill
     building -> thickener; and, for the card's crude and fuel, two
     vertical fuel tanks in a bund with a tanker unloading point.

   Photographs, all on Wikimedia Commons, looked at for this model:
     - "Facilities at the Continental Mine (Butte, Montana, USA) 5" (James
       St. John, 2010): tall steel-clad crusher and mill buildings, a long
       enclosed conveyor gallery climbing on braced steel trestle bents.
     - "Facilities at the Continental Mine ... 1": thickeners under
       construction, a round tank wall, the centre column and the bridge.
     - "Bluewater mill, thickeners & tailings pond" (c. 1968): bridge
       thickeners from the air, the bridge and the drive at the centre.
     - "Dorr thickener at mine. Buckeye Coal Company, Nemacolin Mine" (NARA
       540270, 1946): a shallow round tank at grade, a walkway bridge out
       to the drive over the feedwell, and behind it covered conveyor
       galleries climbing on steel trestle bents to a steel-clad plant -
       the whole arrangement here, twenty years before the hauler.
     - "Snap Lake Diamond Mine Processing Plant" (2008): steel-clad process
       blocks, covered conveyors on lattice bents, ore heaped at the foot.
     - "Sunrise Dam Gold Mine ROM" (2009) and the "Sunrise Dam Gold Mine
       processing plant" series 02-22: a gold plant of this size seen from
       its crusher's ROM pad; the pile under the stacking conveyor, the
       grinding mills, the thickeners on their bridges.
     - "Crusher Plant - panoramio" (2007): conveyor-built cones of crushed
       rock at the angle of repose.
     - "94th Engineer Detachment Euclid dump truck dumps rock into crusher
       at Vung Tau" (NARA, 1969): a rear-dump truck backed against a stop
       at the hopper's lip, tipping over it.

   Corrections to the survey's reference notes, and what fixed each figure:
     - "gyratory or jaw": a JAW station. A gyratory is tipped into direct,
       with no grizzly, and needs a crusher building 25-30 m tall for its
       mainshaft; a dump hopper with a static grizzly on top and an apron
       feeder under it feeding a jaw is the arrangement of a plant this
       size (the Sunrise Dam ROM pad), and it is what the survey's own
       "pocket with a steel grizzly" describes.
     - No rock breaker, though every modern grizzly has one beside it: the
       hydraulic pedestal breaker dates from the 1970s, build() is never
       told the era, and the refinery stands in every era from e50. The
       oversize on the bars is left to the hoist over the pocket and the
       crusher operator, whose cabin looks down on it; both are as old as
       truck dumps.
     - "thickener, real ones 20-40 m, here 12-16 m": 20-40 m is the
       tailings thickener of a big copper mill. A small mill has run
       conventional bridge thickeners of 30 to 50 ft (9-15 m) since Dorr's
       first ones before the First World War, so 14 m is a true size in
       every era the refinery stands in. This is that design - a shallow
       tank, a bridge right across it, the drive and feedwell at the centre
       (the Nemacolin photograph) - and not a modern high-rate thickener.
     - The truck stop is 1.35 m high: the mid-axle height of the 777's
       2.70 m tyres, the height MSHA sets for haul-road berms (30 CFR
       56.9300) and the usual rule for a bumper block at a dump point.
       The pocket mouth is 9 m across and 7.2 m deep, so a 5.52 m body
       tips inside it with a metre and a half each side, and the grizzly
       bars are 0.9 m apart, under a jaw's ~1 m gape. It is built to the
       real truck, not to the drawn one: render3d draws a vehicle about
       2.4 times life size (from def.r) and a structure 1.1 times, and the
       structures are all built to their real size.
     - Fuel tanks: API 650 style, 5.0 m across and 6.0 m tall (118 m3,
       740 bbl each), 2.0 m apart shell to shell (NFPA 30 asks a sixth of
       the two diameters, 1.67 m). The bund holds 110% of one tank, the
       rule most jurisdictions set: 73 m2 of free floor behind 1.8 m walls
       is 132 m3 against 130.
     - Belt conveyors of crushed ore are held to 15-18 degrees or the lumps
       roll back; both galleries climb at 15. Crushed rock stands at about
       37 degrees, and the pile is built to it.
     - What the plot cannot hold at real scale: the pile is 15 m across
       and 5.6 m high, some 600 t, where a real one holds half a day of
       mill feed; the mill building is 23 x 16 m and 15.8 m to the ridge,
       room for a pair of grinding mills (rod and ball in the 1950s, SAG
       and ball today) under a crane. Nothing inside it shows, so nothing
       in it dates the model.
     - No flare stack: a concentrator burns nothing. The fuel role is the
       two tanks and the unloading point.

   What the engine does with a building, and what that asks of the model:
     - render3d.js puts the faction's rooftop kit (archFixture) at the
       model's bounding-box TOP, and the era's (eraFixture) at the tallest
       broad mesh, at fixed spots: north-east (x +14..17, y +8..10) and
       south-west (x -17..-12, y -12..-9). So the two roofs ARE the top of
       the model, both at 15.8 m, the mill roof over the north-east spots
       and the crusher house's over the south-west ones, and nothing stands
       above them; the kit then sits on a roof instead of hanging in the
       air, as it hung 25 m up off the old flare stack. The kit is laid flat
       at that height, so on the mill's 8.5-degree slopes the NATO dome and
       the Pact stack show at most 0.9 m of daylight under their downhill
       rims (0.7 m on the side the camera sees). The gable stays: a flat
       patch put under a fixed kit spot would be a roof invented for the
       engine.
     - Where the haulers really unload (entities.js dockFor and the return
       leg of updateHarvester): a hauler makes for the nearest free tile
       round the plot - the south row wins only a tie - and delivers the
       moment it is within 1.6 tiles of the footprint or close to that
       tile, then turns back for the field; nothing tips, the load is
       booked. Run in the real renderer under jsc, haulers coming in from
       eight directions stopped 31 to 49 m off the plot, on the face that
       looks at their field. The pocket is on the south edge all the same,
       centred on the plot's middle column: the column the refinery's own
       hauler is delivered on (game.js placeBuilding), the dock the game
       prefers, and the line a hauler from a field to the south drives in
       on (it stopped at x = +0.3 m, 47 m out). So the pocket shows where
       the trucks tip, and faces them whenever the field lies south.
     - The default camera looks from the north-east (render3d's yaw of -45
       degrees) and the build icon from the south-east, so nothing tall
       stands north-east of the pocket: the crusher house stands WEST of
       it.
     - The building stands on the terrain, so anything below z = 0 is under
       the ground and never drawn. The pocket's depth is therefore painted:
       its floor is a picture of the hopper's four sloping faces and the
       feeder slot under the real grizzly bars, laid 0.2 m up, just below
       the 0.3 m hardstand, because render3d seats a building at the
       ground height of its centre and does not level the plot: a floor
       at 4 cm let the first rise of the ground show through the pocket.
     - restyle() recolours the desaturated mid tones into the faction's
       palette: the cladding (walls), the roofs and the steelwork are
       authored as greys in the three bands it sorts by, so a NATO,
       Warsaw Pact or PLA plant comes out in its own colours. Concrete and
       ore are textures on white and keep their own; yellow, near-black and
       the team colour are left alone.
     - damage3d.js burns a building through its roofs of 3 m and more: the
       mill roof and the crusher house roof are the two broad ones.
     - Every static part is baked into ONE mesh per material: eight
       materials, eight meshes, eight draws (and eight shadow draws), where
       the old model took 412. Nothing on a refinery moves, so there are no
       named nodes.

   Model space: +X east, +Y north, +Z up, metres, the plot's centre at the
   origin, the ground at z = 0 and the hardstand's top at 0.3. Colours are
   authored in sRGB and left to prepModel() to linearise, as the hero
   hauler does; no material sets _srgbDone. ASCII only: a stray byte
   inside a hex literal has broken this project before.                    */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroOreConcentrator = (function () {
  "use strict";

  var PI = Math.PI, T15 = Math.tan(15 * PI / 180);
  var V = null;                                  /* the THREE build() is handed */

  /* ---------------------------------------------------------------- plan */
  var APRON = 0.3;                /* top of the concrete hardstand            */
  var RTOP = 15.8;                /* both roofs: the model's highest point     */
  /* primary crusher house, west of the pocket                             */
  var CH = { x0: -24.0, x1: -9.0, y0: -19.0, y1: -7.0, wall: 15.0 };
  /* the dump pocket's mouth, centred on the plot's middle column (x = 0,
     the south dock and the line the haulers come in on), its painted floor
     just under the hardstand, and the truck stop along the south edge
     across the mouth and both wing walls */
  var PK = { x0: -4.5, x1: 4.5, y0: -18.6, y1: -11.4, back: -9.9, top: 3.5, floor: 0.2 };
  var KERB = { x0: -6.3, x1: 6.3, y0: -19.9, y1: -18.6, top: 1.35 };
  /* coarse-ore stockpile, 37 degrees                                       */
  var PILE = { x: -16.5, y: 10.0, R: 7.5, H: 5.6 };
  /* gallery A: crusher house north wall to the head house over the pile   */
  var GA = { x: -16.5, y0: -7.0, z0: 4.2 };
  var HH = { x0: -18.5, x1: -14.5, y0: 8.9, y1: 12.1, z0: 8.2, z1: 11.9 };
  /* gallery B: reclaim tunnel portal at the pile's toe to the mill        */
  var GB = { y: 10.0, x0: -8.0, z0: 1.1 };
  /* mill building, ridge east-west                                        */
  var ML = { x0: 6.0, x1: 29.0, y0: 3.0, y1: 19.0, ridge: 11.0, eave: 14.6 };
  /* thickener                                                              */
  var TK = { x: 21.0, y: -11.5, R: 7.0, rim: 3.2, water: 2.95 };
  /* fuel bund and its two tanks                                            */
  var BD = { x0: -8.2, x1: 5.8, y0: -8.0, y1: 1.0, top: 2.1 };
  var TANK = { R: 2.5, z1: 6.3, cone: 0.5, at: [[-4.7, -3.5], [2.3, -3.5]] };

  function gaFloor(y) { return GA.z0 + (y - GA.y0) * T15; }
  function gbFloor(x) { return GB.z0 + (x - GB.x0) * T15; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ============================================================ textures
     Four canvases, painted once per page and shared by every team's copy
     and the sidebar icon (the paint depends on nothing but the plant). */
  var _cv = {}, _tx = null;

  /* The hardstand. The top two thirds of the canvas is a plan of the whole
     plot (north up, 17 px a metre), sampled by every upward face of the
     concrete material at its own position, so the ruts, the stains, the
     painted lines, the hopper and the thickener's water land where they
     belong and none of them costs a triangle. The bottom third is cast
     concrete for the walls, u along the wall and v up it (0-5 m). */
  var PLAN_V0 = 1 / 3;
  function concCanvas() {
    if (_cv.conc) return _cv.conc;
    var W = 1024, H = 1024, PH = 683, R = rng(33011), i, k, x, y, a, rr, g;
    var cv = mkCv(W, H), q = cv.getContext("2d");
    var SX = W / 60, SY = PH / 40;
    function X(v) { return (v + 30) * SX; }
    function Y(v) { return (20 - v) * SY; }
    function rect(x0, y0, x1, y1) { q.fillRect(X(x0), Y(y1), (x1 - x0) * SX, (y1 - y0) * SY); }
    function line(x0, y0, x1, y1, w) {
      q.lineWidth = Math.max(1, w * SX);
      q.beginPath(); q.moveTo(X(x0), Y(y0)); q.lineTo(X(x1), Y(y1)); q.stroke();
    }
    function poly(p, fill) {
      q.fillStyle = fill; q.beginPath(); q.moveTo(X(p[0][0]), Y(p[0][1]));
      for (var j = 1; j < p.length; j++) q.lineTo(X(p[j][0]), Y(p[j][1]));
      q.closePath(); q.fill();
    }
    function blot(cx, cy, r, col, al) {
      var gr = q.createRadialGradient(X(cx), Y(cy), 0, X(cx), Y(cy), r * SX);
      gr.addColorStop(0, "rgba(" + col + "," + al + ")");
      gr.addColorStop(1, "rgba(" + col + ",0)");
      q.fillStyle = gr; q.fillRect(X(cx - r), Y(cy + r), 2 * r * SX, 2 * r * SY);
    }
    function chips(x0, y0, x1, y1, n, glint) {
      for (var j = 0; j < n; j++) {
        var v = 26 + Math.floor(R() * 50);
        q.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.9) + "," + Math.floor(v * 0.72) + ",0.85)";
        q.fillRect(X(x0 + R() * (x1 - x0)), Y(y0 + R() * (y1 - y0)), 2 + R() * 4, 2 + R() * 3);
      }
      q.fillStyle = "rgba(230,180,60,0.8)";
      for (j = 0; j < glint; j++) q.fillRect(X(x0 + R() * (x1 - x0)), Y(y0 + R() * (y1 - y0)), 2, 2);
    }

    /* ---- the hardstand: dusty cast concrete, saw-cut into 6 m bays ---- */
    q.fillStyle = "#8b877e"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 620; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(206,200,188,0.07)" : "rgba(44,40,34,0.07)";
      q.fillRect(R() * W, R() * PH, 8 + R() * 80, 6 + R() * 50);
    }
    q.strokeStyle = "rgba(40,36,32,0.38)";
    for (x = -30; x <= 30; x += 6) line(x, -20, x, 20, 0.07);
    for (y = -20; y <= 20; y += 6) line(-30, y, 30, y, 0.07);
    q.strokeStyle = "rgba(30,27,24,0.42)";
    for (i = 0; i < 16; i++) {
      x = -28 + R() * 56; y = -18 + R() * 36;
      q.lineWidth = 1; q.beginPath(); q.moveTo(X(x), Y(y));
      for (k = 0; k < 5; k++) { x += (R() - 0.5) * 3; y += (R() - 0.5) * 3; q.lineTo(X(x), Y(y)); }
      q.stroke();
    }
    /* ore dust where it is tipped and where it is stacked, oil at the
       tanker bay and the pump skid, slurry splash at the underflow pump */
    blot(0, -15.2, 12, "50,41,30", 0.55);
    blot(-16.5, 10, 11.5, "48,40,30", 0.5);
    blot(-16.5, -3, 5, "52,42,30", 0.35);
    blot(9.6, -4.4, 3.2, "22,20,18", 0.35);
    blot(7.6, -6.9, 2.2, "20,18,16", 0.45);
    blot(12.9, -11.5, 2.6, "150,140,120", 0.35);
    blot(24, 11, 9, "58,50,40", 0.18);
    /* tyre tracks: the fuel tanker's lane in from the south edge, and the
       front-end loader that works round the pile toe */
    q.strokeStyle = "rgba(28,25,21,0.24)";
    [7.9, 8.8, 10.7, 11.6].forEach(function (tx) { line(tx, -20, tx, -8.3, 0.35); });
    for (i = 0; i < 3; i++) {
      q.lineWidth = 0.45 * SX; q.beginPath();
      q.arc(X(PILE.x), Y(PILE.y), (PILE.R + 1.2 + i * 0.8) * SX, -0.2 - i * 0.3, 1.9 + i * 0.2); q.stroke();
    }
    /* painted walkways and the tanker bay */
    q.strokeStyle = "rgba(227,194,40,0.8)";
    line(8.4, -0.3, 21.6, -0.3, 0.12);
    line(-8.6, 1.5, 5.6, 1.5, 0.12);
    line(-8.6, -8.5, -8.6, 1.5, 0.12);
    q.lineWidth = 0.15 * SX; q.strokeRect(X(6.6), Y(-0.2), 5.9 * SX, 7.7 * SY);
    q.save(); q.beginPath(); q.rect(X(6.6), Y(-0.2), 1.6 * SX, 7.7 * SY); q.clip();
    q.strokeStyle = "rgba(227,194,40,0.55)";
    for (y = -9; y < 1; y += 0.8) line(6.6, y, 8.2, y + 1.6, 0.1);
    q.restore();
    /* inside the bund: a darker, oilier floor falling to a sump */
    q.fillStyle = "rgba(40,37,33,0.2)"; rect(BD.x0 + 0.3, BD.y0 + 0.3, BD.x1 - 0.3, BD.y1 - 0.3);
    blot(-4.7, -3.5, 3.4, "30,28,24", 0.3); blot(2.3, -3.5, 3.4, "30,28,24", 0.3);
    q.fillStyle = "#1c1a18"; rect(4.5, -0.4, 5.3, 0.4);
    /* the covered cable trench from the transformers to the switchroom */
    q.fillStyle = "#5e5b55"; rect(-4.6, 15.85, -0.3, 16.25);
    q.strokeStyle = "rgba(30,28,26,0.6)";
    for (x = -4.4; x < -0.3; x += 0.6) line(x, 15.85, x, 16.25, 0.03);
    q.strokeStyle = "rgba(120,116,108,0.7)";
    for (x = 4.6; x < 5.3; x += 0.15) line(x, -0.4, x, 0.4, 0.03);
    /* ---- the dump pocket, looked down into: four sloping faces, lit from
       the north-west, closing on the dark slot of the apron feeder ---- */
    var o = [[PK.x0, PK.y0], [PK.x1, PK.y0], [PK.x1, PK.y1], [PK.x0, PK.y1]];
    var s = [[-1.4, -16.1], [1.4, -16.1], [1.4, -13.9], [-1.4, -13.9]];
    poly([o[0], o[1], s[1], s[0]], "#4b4239");
    poly([o[1], o[2], s[2], s[1]], "#3a332c");
    poly([o[2], o[3], s[3], s[2]], "#5c5247");
    poly([o[3], o[0], s[0], s[3]], "#554b41");
    g = q.createRadialGradient(X(0), Y(-15), 0.5 * SX, X(0), Y(-15), 5.2 * SX);
    g.addColorStop(0, "rgba(8,7,6,0.85)"); g.addColorStop(0.45, "rgba(12,10,8,0.5)"); g.addColorStop(1, "rgba(12,10,8,0)");
    q.fillStyle = g; rect(PK.x0, PK.y0, PK.x1, PK.y1);
    chips(PK.x0 + 0.2, PK.y0 + 0.2, PK.x1 - 0.2, PK.y1 - 0.2, 260, 18);
    poly(s, "#0c0b0a");
    /* ore knocked off the lip and round the wing walls */
    chips(PK.x0 - 1.5, PK.y1, PK.x1 + 3.0, PK.back + 1.6, 90, 6);
    chips(PK.x1 + 1.3, PK.y0, PK.x1 + 3.0, PK.y1, 70, 4);
    /* the truck stop's top: yellow and black */
    q.save(); q.beginPath(); q.rect(X(KERB.x0), Y(KERB.y1), (KERB.x1 - KERB.x0) * SX, (KERB.y1 - KERB.y0) * SY); q.clip();
    q.fillStyle = "#e2c020"; rect(KERB.x0, KERB.y0, KERB.x1, KERB.y1);
    for (x = KERB.x0 - 1.4; x < KERB.x1; x += 1.1)
      poly([[x, KERB.y0], [x + 0.5, KERB.y0], [x + 1.8, KERB.y1], [x + 1.3, KERB.y1]], "#1b1a17");
    q.restore();
    /* ---- the thickener's water: clear at the rim where it overflows into
       the launder, turbid over the settling bed, darkest at the feedwell */
    var tx = X(TK.x), ty = Y(TK.y);
    g = q.createRadialGradient(tx, ty, 0, tx, ty, TK.R * SX);
    g.addColorStop(0, "#433d33"); g.addColorStop(0.3, "#57503f"); g.addColorStop(0.7, "#66624f");
    g.addColorStop(0.9, "#737160"); g.addColorStop(1, "#7a7968");
    q.fillStyle = g; q.beginPath(); q.arc(tx, ty, TK.R * SX, 0, 2 * PI); q.fill();
    q.strokeStyle = "rgba(255,255,240,0.07)";
    for (i = 0; i < 5; i++) { q.lineWidth = 1.5; q.beginPath(); q.arc(tx, ty, (2.4 + i * 0.85) * SX, 0, 2 * PI); q.stroke(); }
    q.strokeStyle = "rgba(34,32,28,0.85)"; q.lineWidth = 0.5 * SX;
    q.beginPath(); q.arc(tx, ty, (TK.R - 0.35) * SX, 0, 2 * PI); q.stroke();
    /* crushed ore spilled round the pile's toe */
    for (i = 0; i < 320; i++) {
      a = R() * 2 * PI; rr = PILE.R - 0.4 + R() * 1.9;
      var v = 28 + Math.floor(R() * 44);
      q.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.9) + "," + Math.floor(v * 0.72) + ",0.8)";
      q.fillRect(X(PILE.x + Math.cos(a) * rr), Y(PILE.y + Math.sin(a) * rr), 2 + R() * 3, 2 + R() * 3);
    }

    /* ---- cast concrete for the walls: rows PH..H, v 0.31 (5 m) .. 0.01 */
    var B0 = PH;
    q.fillStyle = "#96928a"; q.fillRect(0, B0, W, H - B0);
    for (i = 0; i < 160; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(220,214,202,0.08)" : "rgba(40,36,30,0.07)";
      q.fillRect(R() * W, B0 + R() * (H - B0), 20 + R() * 90, 8 + R() * 30);
    }
    function rowZ(z) { return (1 - (0.01 + 0.30 * z / 5)) * H; }
    q.fillStyle = "rgba(50,46,40,0.35)";
    for (x = 0; x < W; x += 205) q.fillRect(x, B0, 2, H - B0);
    for (y = 0; y <= 5; y += 1.2) q.fillRect(0, rowZ(y), W, 2);
    q.fillStyle = "rgba(34,30,26,0.45)";
    for (x = 51; x < W; x += 102) for (y = 0.6; y < 5; y += 1.2) q.fillRect(x, rowZ(y), 3, 3);
    for (i = 0; i < 50; i++) {
      x = R() * W; y = rowZ(4.8 - R() * 1.5);
      var gs = q.createLinearGradient(0, y, 0, y + 60);
      gs.addColorStop(0, "rgba(46,40,32,0.25)"); gs.addColorStop(1, "rgba(46,40,32,0)");
      q.fillStyle = gs; q.fillRect(x, y, 2 + R() * 4, 60);
    }
    g = q.createLinearGradient(0, rowZ(1.0), 0, rowZ(0));
    g.addColorStop(0, "rgba(64,52,38,0)"); g.addColorStop(1, "rgba(64,52,38,0.6)");
    q.fillStyle = g; q.fillRect(0, rowZ(1.0), W, rowZ(0) - rowZ(1.0) + 12);
    _cv.conc = cv;
    return cv;
  }

  /* Profiled steel cladding (rows 0-511: u 8 m a tile, v 0 .. 16.5 m up
     the wall), plain welded plate for the tanks and the thickener (rows
     512-767), and a roller door and a louvre panel (rows 768-1023, left
     and right halves). Near white, so restyle()'s faction colour is what
     the eye reads and the paint only adds the ribs and the weather. */
  function wallCanvas() {
    if (_cv.wall) return _cv.wall;
    var W = 1024, H = 1024, R = rng(51207), i, x, y, len, gr, rc;
    var cv = mkCv(W, H), q = cv.getContext("2d");
    /* ---- cladding ---- */
    q.fillStyle = "#e2e3e0"; q.fillRect(0, 0, W, 512);
    for (i = 0; i < 8; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)";
      q.fillRect(i * 128, 0, 128, 512);
    }
    /* trapezoidal ribs every 250 mm: a lit crown and a shadowed flank */
    for (x = 0; x < W; x += 32) {
      q.fillStyle = "rgba(255,255,255,0.55)"; q.fillRect(x, 0, 4, 512);
      q.fillStyle = "rgba(60,62,60,0.32)"; q.fillRect(x + 5, 0, 3, 512);
    }
    q.fillStyle = "rgba(40,42,40,0.28)";
    for (x = 30; x < W; x += 128) q.fillRect(x, 0, 2, 512);
    /* fastener rows on the girts, every 1.5 m */
    q.fillStyle = "rgba(50,50,48,0.35)";
    for (y = 466; y > 0; y -= 46) for (x = 2; x < W; x += 32) q.fillRect(x, y, 2, 2);
    for (i = 0; i < 90; i++) {
      x = R() * W; y = R() * 380; len = 20 + R() * 120;
      gr = q.createLinearGradient(0, y, 0, y + len);
      rc = R() < 0.35 ? "110,70,40" : "70,70,64";
      gr.addColorStop(0, "rgba(" + rc + ",0.22)"); gr.addColorStop(1, "rgba(" + rc + ",0)");
      q.fillStyle = gr; q.fillRect(x, y, 2 + R() * 3, len);
    }
    /* plant dust up the lowest 2.5 m */
    gr = q.createLinearGradient(0, 430, 0, 512);
    gr.addColorStop(0, "rgba(120,100,76,0)"); gr.addColorStop(1, "rgba(120,100,76,0.55)");
    q.fillStyle = gr; q.fillRect(0, 430, W, 82);
    /* ---- welded plate: courses and staggered butt welds ---- */
    q.fillStyle = "#e4e4df"; q.fillRect(0, 512, W, 256);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.05)";
      q.fillRect(R() * W, 512 + R() * 256, 60 + R() * 200, 20 + R() * 60);
    }
    var course = 0;
    for (y = 758; y > 522; y -= 62) {
      q.fillStyle = "rgba(60,60,56,0.35)"; q.fillRect(0, y, W, 2);
      q.fillStyle = "rgba(255,255,255,0.3)"; q.fillRect(0, y + 2, W, 1);
      for (x = (course & 1) * 150; x < W; x += 300) { q.fillStyle = "rgba(60,60,56,0.3)"; q.fillRect(x, y - 62, 2, 62); }
      course++;
    }
    for (i = 0; i < 50; i++) {
      x = R() * W; y = 520 + R() * 150; len = 20 + R() * 80;
      gr = q.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(96,64,40,0.2)"); gr.addColorStop(1, "rgba(96,64,40,0)");
      q.fillStyle = gr; q.fillRect(x, y, 2 + R() * 3, len);
    }
    gr = q.createLinearGradient(0, 725, 0, 768);
    gr.addColorStop(0, "rgba(110,94,72,0)"); gr.addColorStop(1, "rgba(110,94,72,0.45)");
    q.fillStyle = gr; q.fillRect(0, 725, W, 43);
    /* ---- roller door: slats, guides, hood and bottom rail ---- */
    q.fillStyle = "#c8c9c5"; q.fillRect(0, 768, 512, 256);
    for (y = 792; y < 1004; y += 8) {
      q.fillStyle = "rgba(40,40,38,0.45)"; q.fillRect(0, y, 492, 1);
      q.fillStyle = "rgba(255,255,255,0.35)"; q.fillRect(0, y + 1, 492, 1);
    }
    q.fillStyle = "#5a5b58"; q.fillRect(0, 768, 492, 24);
    q.fillStyle = "#3a3b39"; q.fillRect(0, 1000, 492, 24);
    q.fillRect(0, 768, 8, 256); q.fillRect(484, 768, 8, 256);
    /* ---- louvre panel: dark gaps under lit blades ---- */
    q.fillStyle = "#9a9c98"; q.fillRect(512, 768, 512, 256);
    for (y = 782; y < 1010; y += 16) {
      q.fillStyle = "rgba(18,20,20,0.88)"; q.fillRect(532, y, 492, 9);
      q.fillStyle = "rgba(255,255,255,0.4)"; q.fillRect(532, y + 9, 492, 2);
    }
    q.fillStyle = "#4a4c4a"; q.fillRect(532, 768, 492, 10); q.fillRect(532, 1012, 492, 12);
    _cv.wall = cv;
    return cv;
  }

  /* Roof sheeting, 8 m a tile: ribs running down the slope, a line of
     rooflight sheets, dust blown up off the plant */
  function roofCanvas() {
    if (_cv.roof) return _cv.roof;
    var W = 512, H = 512, R = rng(7219), i, x, y;
    var cv = mkCv(W, H), q = cv.getContext("2d");
    q.fillStyle = "#d6d7d3"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
      q.fillRect(R() * W, R() * H, 30 + R() * 120, 30 + R() * 120);
    }
    for (x = 0; x < W; x += 16) {
      q.fillStyle = "rgba(255,255,255,0.5)"; q.fillRect(x, 0, 3, H);
      q.fillStyle = "rgba(50,52,50,0.3)"; q.fillRect(x + 4, 0, 2, H);
    }
    q.fillStyle = "rgba(40,42,40,0.3)";
    for (x = 62; x < W; x += 64) q.fillRect(x, 0, 2, H);
    q.fillRect(0, 384, W, 2);
    q.fillStyle = "rgba(242,236,204,0.75)"; q.fillRect(192, 40, 64, 256);
    for (x = 192; x < 256; x += 16) { q.fillStyle = "rgba(255,255,240,0.5)"; q.fillRect(x, 40, 3, 256); }
    for (i = 0; i < 26; i++) {
      q.fillStyle = "rgba(120,100,72," + (0.06 + R() * 0.1).toFixed(3) + ")";
      q.fillRect(R() * W, R() * H, 20 + R() * 90, 10 + R() * 60);
    }
    for (i = 0; i < 30; i++) {
      q.fillStyle = "rgba(110,70,40,0.25)";
      q.fillRect(Math.floor(R() * 32) * 16 + 4, R() * H, 2, 6 + R() * 20);
    }
    _cv.roof = cv;
    return cv;
  }

  /* the ore: the hero hauler's own load, dark broken rock with the glints
     of the game's ore field, so the pile is the stuff the trucks bring */
  function oreCanvas() {
    if (_cv.ore) return _cv.ore;
    var R = rng(4410233), i, x, y, r, v;
    var cv = mkCv(256, 256), q = cv.getContext("2d");
    q.fillStyle = "#2a241a"; q.fillRect(0, 0, 256, 256);
    for (i = 0; i < 420; i++) {
      v = 26 + Math.floor(R() * 56);
      q.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.9) + "," + Math.floor(v * 0.72) + ",0.8)";
      q.fillRect(R() * 252, R() * 252, 2 + R() * 6, 2 + R() * 5);
    }
    for (i = 0; i < 50; i++) {
      x = 8 + R() * 240; y = 8 + R() * 240; r = 2 + R() * 5;
      var g = q.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,208,60,0.95)");
      g.addColorStop(0.6, "rgba(210,150,30,0.55)");
      g.addColorStop(1, "rgba(120,80,10,0)");
      q.fillStyle = g;
      q.beginPath(); q.arc(x, y, r, 0, Math.PI * 2); q.fill();
    }
    _cv.ore = cv;
    return cv;
  }

  function canvasTex(THREE, cv, clampT) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = clampT ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
      /* r148: encoding is the switch that works; colorSpace does nothing */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }
  function textures(THREE) {
    if (_tx && _tx.T === THREE) return _tx;
    _tx = { T: THREE,
            conc: canvasTex(THREE, concCanvas(), true),
            wall: canvasTex(THREE, wallCanvas(), true),
            roof: canvasTex(THREE, roofCanvas(), false),
            ore:  canvasTex(THREE, oreCanvas(), false) };
    return _tx;
  }

  /* ========================================================== materials
     Eight, the ceiling for this key, and one mesh each. restyle() sorts a
     desaturated colour by its (linear) lightness: over 0.55 it becomes the
     faction's wall colour, over 0.33 its second wall colour, below that
     its roof colour. So the cladding is authored light (wall), the steel
     mid (wall2) and the roof sheeting darker (roof); concrete and ore are
     textures on white, which restyle() leaves alone. */
  function makeMats(THREE, C) {
    var X = textures(THREE), M = {};
    M.conc = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.93, metalness: 0.02 });
    if (X.conc) M.conc.map = X.conc; else M.conc.color.setHex(0x8b877e);
    M.wall = new THREE.MeshStandardMaterial({ color: 0xd2d4d2, roughness: 0.62, metalness: 0.22 });
    if (X.wall) M.wall.map = X.wall;
    M.roof = new THREE.MeshStandardMaterial({ color: 0x8e9092, roughness: 0.58, metalness: 0.3 });
    if (X.roof) M.roof.map = X.roof;
    M.steel = new THREE.MeshStandardMaterial({ color: 0xa2a6a8, roughness: 0.52, metalness: 0.45 });
    M.dark = new THREE.MeshStandardMaterial({ color: 0x1d1f20, roughness: 0.8, metalness: 0.2 });
    /* safety yellow, ANSI Z535.1's (Munsell 5.0Y 8/12) a shade weathered:
       a true lemon yellow, so it stays apart from a gold team colour - 25
       CIELAB units from PLA's #e0a33c, where a mustard #d6a21c was 10 and
       read as the team's own coping on the handrails */
    M.yellow = new THREE.MeshStandardMaterial({ color: 0xe3c21c, roughness: 0.55, metalness: 0.2 });
    /* the team colour, exactly the owner's, as the hero hauler has it */
    M.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.15 });
    /* flat shaded: averaged normals turn a rock pile into a soft pudding */
    M.ore = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.18, flatShading: true });
    if (X.ore) M.ore.map = X.ore; else M.ore.color.setHex(0x3a3222);
    return M;
  }

  /* ================================================================ UVs
     Every UV is worked out per triangle from its position and its facing,
     as it goes into the bake (so a part never needs UVs of its own). */
  function uvConc(P, o, nx, ny, nz) {
    var out = [], top = Math.abs(nz) >= 0.6, alongX = Math.abs(ny) >= Math.abs(nx);
    for (var k = 0; k < 3; k++) {
      var x = P[o + 3 * k], y = P[o + 3 * k + 1], z = P[o + 3 * k + 2];
      if (top) out.push(clamp((x + 30) / 60, 0.001, 0.999), PLAN_V0 + (1 - PLAN_V0) * clamp((y + 20) / 40, 0.002, 0.998));
      else out.push((alongX ? x : y) / 12, 0.01 + 0.30 * clamp(z / 5, 0, 1));
    }
    return out;
  }
  function uvWall(P, o, nx, ny, nz) {
    var out = [], top = Math.abs(nz) >= 0.7, alongX = Math.abs(ny) >= Math.abs(nx);
    for (var k = 0; k < 3; k++) {
      var x = P[o + 3 * k], y = P[o + 3 * k + 1], z = P[o + 3 * k + 2];
      if (top) out.push(x / 8, 0.75);
      else out.push((alongX ? x : y) / 8, 0.5 + 0.49 * clamp(z / 16.5, 0, 1));
    }
    return out;
  }
  /* welded plate round a vertical axis: u is arc length (8 m a tile), each
     triangle kept on one side of the seam; the cone roof takes the upper
     part of the plate band by radius */
  function uvTank(cx, cy, R, z0, h) {
    return function (P, o, nx, ny, nz) {
      var out = [], k;
      var am = Math.atan2((P[o + 1] + P[o + 4] + P[o + 7]) / 3 - cy, (P[o] + P[o + 3] + P[o + 6]) / 3 - cx);
      for (k = 0; k < 3; k++) {
        var dx = P[o + 3 * k] - cx, dy = P[o + 3 * k + 1] - cy, z = P[o + 3 * k + 2];
        var rr = Math.sqrt(dx * dx + dy * dy), ak = rr < 1e-3 ? am : Math.atan2(dy, dx);
        while (ak - am > PI) ak -= 2 * PI;
        while (am - ak > PI) ak += 2 * PI;
        var v = nz > 0.5 ? 0.27 + 0.2 * clamp(rr / R, 0, 1) : 0.26 + 0.23 * clamp((z - z0) / h, 0, 1);
        out.push(ak * R / 8, v);
      }
      return out;
    };
  }
  /* roof sheeting, ribs down the slope: across a roof whose ridge runs
     east-west they run north-south, so u follows x; swap for a roof that
     runs north-south (gallery A) */
  function uvRoofBy(swap) {
    return function (P, o, nx, ny, nz) {
      var out = [], top = Math.abs(nz) >= 0.5, alongX = Math.abs(ny) >= Math.abs(nx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + 3 * k], y = P[o + 3 * k + 1], z = P[o + 3 * k + 2];
        if (top) out.push((swap ? y : x) / 8, (swap ? x : y) / 8);
        else out.push((alongX ? x : y) / 8, z / 8);
      }
      return out;
    };
  }
  var uvRoof = uvRoofBy(false), uvRoofY = uvRoofBy(true);
  function uvOre(P, o, nx, ny, nz) {
    var out = [], top = Math.abs(nz) >= 0.4, alongX = Math.abs(ny) >= Math.abs(nx);
    for (var k = 0; k < 3; k++) {
      var x = P[o + 3 * k], y = P[o + 3 * k + 1], z = P[o + 3 * k + 2];
      if (top) out.push(x / 5, y / 5); else out.push((alongX ? x : y) / 5, z / 5);
    }
    return out;
  }
  /* a rectangle of the wall canvas stretched over one panel on a wall:
     nrm is the axis the wall faces along */
  function uvRect(nrm, a0, a1, z0, z1, u0, u1, v0, v1) {
    return function (P, o) {
      var out = [];
      for (var k = 0; k < 3; k++) {
        var a = nrm === "y" ? P[o + 3 * k] : P[o + 3 * k + 1], z = P[o + 3 * k + 2];
        out.push(u0 + (u1 - u0) * clamp((a - a0) / (a1 - a0), 0, 1), v0 + (v1 - v0) * clamp((z - z0) / (z1 - z0), 0, 1));
      }
      return out;
    };
  }
  var UVF = { conc: uvConc, wall: uvWall, roof: uvRoof, ore: uvOre };

  /* ============================================================== baker
     Collects positioned geometry per material and emits ONE mesh per
     material. Parts go in as plain triangle lists, so a box keeps its hard
     edges and a cylinder its smooth sides; zero-area triangles are left
     out on the way in. */
  var ORDER = ["conc", "wall", "roof", "steel", "dark", "yellow", "team", "ore"];
  function Baker() { this.B = {}; }
  Baker.prototype.add = function (key, geo, uvf) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.attributes.normal) g.computeVertexNormals();
    var P = g.attributes.position.array, N = g.attributes.normal.array;
    var b = this.B[key] || (this.B[key] = { p: [], n: [], u: [] });
    var f = uvf === undefined ? UVF[key] : uvf;
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ax = P[o + 3] - P[o], ay = P[o + 4] - P[o + 1], az = P[o + 5] - P[o + 2];
      var bx = P[o + 6] - P[o], by = P[o + 7] - P[o + 1], bz = P[o + 8] - P[o + 2];
      var nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (l < 1e-8) continue;
      nx /= l; ny /= l; nz /= l;
      var uv = f ? f(P, o, nx, ny, nz) : null;
      for (var k = 0; k < 3; k++) {
        b.p.push(P[o + 3 * k], P[o + 3 * k + 1], P[o + 3 * k + 2]);
        b.n.push(N[o + 3 * k], N[o + 3 * k + 1], N[o + 3 * k + 2]);
        if (uv) b.u.push(uv[2 * k], uv[2 * k + 1]); else b.u.push(0, 0);
      }
    }
  };
  Baker.prototype.flush = function (group, T) {
    for (var i = 0; i < ORDER.length; i++) {
      var key = ORDER[i], b = this.B[key];
      if (!b || !b.p.length) continue;
      var geo = new V.BufferGeometry();
      geo.setAttribute("position", new V.Float32BufferAttribute(b.p, 3));
      geo.setAttribute("normal", new V.Float32BufferAttribute(b.n, 3));
      geo.setAttribute("uv", new V.Float32BufferAttribute(b.u, 2));
      geo.computeBoundingSphere();
      var mesh = new V.Mesh(geo, T[key]);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.B = {};
  };

  /* ========================================================== primitives */
  /* A flat triangle soup. tri() turns every face AWAY from a hint point,
     which for a convex part is its own middle, so there is never a doubt
     about winding; triN() winds to follow the normals it is given. */
  function Soup() { this.p = []; this.n = []; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0], cy = (a[1] + b[1] + c[1]) / 3 - away[1], cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.triN = function (a, b, c, na, nb, nc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-18) return;
    if (nx * (na[0] + nb[0] + nc[0]) + ny * (na[1] + nb[1] + nc[1]) + nz * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
  };
  Soup.prototype.geo = function () {
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(this.n, 3));
    return g;
  };

  /* box from its min/max corners */
  function bb(x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    var g = new V.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    return g;
  }
  /* a box with the faces listed in 'skip' left off, where they are buried
     or hidden: BoxGeometry lays its faces out +x, -x, +y, -y, +z, -z
     (0-5), six vertices each once it is not indexed */
  function bbx(x0, x1, y0, y1, z0, z1, skip) {
    var g = bb(x0, x1, y0, y1, z0, z1).toNonIndexed();
    var P = g.attributes.position.array, N = g.attributes.normal.array, pp = [], nn = [], k, i;
    for (k = 0; k < 6; k++) {
      if (skip.indexOf(k) >= 0) continue;
      for (i = k * 6; i < k * 6 + 6; i++) {
        pp.push(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
        nn.push(N[i * 3], N[i * 3 + 1], N[i * 3 + 2]);
      }
    }
    var b = new V.BufferGeometry();
    b.setAttribute("position", new V.Float32BufferAttribute(pp, 3));
    b.setAttribute("normal", new V.Float32BufferAttribute(nn, 3));
    return b;
  }
  var UNDER = [5];                      /* stands on something: no underside */
  /* a box turned about z: sx along its heading */
  function boxR(sx, sy, sz, x, y, z, rz) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.rotateZ(rz || 0);
    g.translate(x, y, z);
    return g;
  }
  /* a thin bar from its corners, leaving off the end faces across its long
     axis that are BURIED: "lo", "hi" or "both". An open end that can be
     seen is a hole, so only buried ends go. */
  function bar(x0, x1, y0, y1, z0, z1, drop) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    var sx = x1 - x0, sy = y1 - y0, sz = z1 - z0;
    var ax = sx >= sy && sx >= sz ? 0 : (sy >= sz ? 1 : 2);
    var g = new V.BoxGeometry(sx, sy, sz).toNonIndexed();
    /* BoxGeometry lays its faces out +x, -x, +y, -y, +z, -z, six vertices each */
    var k, i, P = g.attributes.position.array, N = g.attributes.normal.array, pp = [], nn = [];
    for (k = 0; k < 6; k++) {
      if ((k >> 1) === ax && (drop === "both" || (drop === "hi" && !(k & 1)) || (drop === "lo" && (k & 1)))) continue;
      for (i = k * 6; i < k * 6 + 6; i++) {
        pp.push(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
        nn.push(N[i * 3], N[i * 3 + 1], N[i * 3 + 2]);
      }
    }
    var b = new V.BufferGeometry();
    b.setAttribute("position", new V.Float32BufferAttribute(pp, 3));
    b.setAttribute("normal", new V.Float32BufferAttribute(nn, 3));
    b.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    return b;
  }
  /* vertical cylinder (or frustum) standing on z0: r0 at the foot, r1 at
     the top */
  function cylZ(r0, r1, h, seg, x, y, z0, open) {
    var g = new V.CylinderGeometry(r1, r0, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    g.translate(x, y, z0 + h / 2);
    return g;
  }
  /* a round (or, with seg 4, square) bar from a to b */
  function rod(a, b, r, seg, open) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 8, 1, !!open);
    if (seg === 4) g.rotateY(PI / 4);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* a closed solid between two plan rectangles: along 'axis' ("x" or "y")
     from a0 to a1, across from c0 to c1, its bottom and top each rising
     linearly along the axis. Every side stays vertical: a conveyor
     gallery, a roof slope, a verge board. */
  function incl(axis, a0, a1, c0, c1, zb0, zb1, zt0, zt1) {
    function P(a, c, z) { return axis === "y" ? [c, a, z] : [a, c, z]; }
    var A0 = P(a0, c0, zb0), A1 = P(a1, c0, zb1), A2 = P(a1, c1, zb1), A3 = P(a0, c1, zb0);
    var B0 = P(a0, c0, zt0), B1 = P(a1, c0, zt1), B2 = P(a1, c1, zt1), B3 = P(a0, c1, zt0);
    var m = P((a0 + a1) / 2, (c0 + c1) / 2, (zb0 + zb1 + zt0 + zt1) / 4), S = new Soup();
    S.quad(A0, A1, A2, A3, m); S.quad(B0, B1, B2, B3, m);
    S.quad(A0, A1, B1, B0, m); S.quad(A3, A2, B2, B3, m);
    S.quad(A0, A3, B3, B0, m); S.quad(A1, A2, B2, B1, m);
    return S.geo();
  }
  /* a convex outline in the YZ plane, extruded along x */
  function prismX(x0, x1, prof) {
    var S = new Soup(), n = prof.length, cy = 0, cz = 0, i;
    for (i = 0; i < n; i++) { cy += prof[i][0]; cz += prof[i][1]; }
    var m = [(x0 + x1) / 2, cy / n, cz / n];
    for (i = 0; i < n; i++) {
      var p = prof[i], q = prof[(i + 1) % n];
      S.quad([x0, p[0], p[1]], [x1, p[0], p[1]], [x1, q[0], q[1]], [x0, q[0], q[1]], m);
    }
    for (i = 1; i < n - 1; i++) {
      S.tri([x0, prof[0][0], prof[0][1]], [x0, prof[i][0], prof[i][1]], [x0, prof[i + 1][0], prof[i + 1][1]], m);
      S.tri([x1, prof[0][0], prof[0][1]], [x1, prof[i][0], prof[i][1]], [x1, prof[i + 1][0], prof[i + 1][1]], m);
    }
    return S.geo();
  }
  /* a square frustum: half-width h0 at z0, h1 at z1 (hoppers, chutes) */
  function frustumSq(cx, cy, z0, z1, h0, h1) {
    var S = new Soup(), m = [cx, cy, (z0 + z1) / 2];
    var A = [[cx - h0, cy - h0, z0], [cx + h0, cy - h0, z0], [cx + h0, cy + h0, z0], [cx - h0, cy + h0, z0]];
    var B = [[cx - h1, cy - h1, z1], [cx + h1, cy - h1, z1], [cx + h1, cy + h1, z1], [cx - h1, cy + h1, z1]];
    S.quad(A[0], A[1], A[2], A[3], m); S.quad(B[0], B[1], B[2], B[3], m);
    for (var i = 0; i < 4; i++) S.quad(A[i], A[(i + 1) % 4], B[(i + 1) % 4], B[i], m);
    return S.geo();
  }
  /* a thick-walled ring standing on z0: outer and inner faces smooth, the
     top a flat annulus (thickener shell, launder lip, feedwell) */
  function ringWall(cx, cy, ro, ri, z0, z1, seg) {
    var S = new Soup(), up = [0, 0, 1];
    for (var k = 0; k < seg; k++) {
      var a0 = k / seg * 2 * PI, a1 = (k + 1) / seg * 2 * PI;
      var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      var n0 = [c0, s0, 0], n1 = [c1, s1, 0], m0 = [-c0, -s0, 0], m1 = [-c1, -s1, 0];
      var O00 = [cx + ro * c0, cy + ro * s0, z0], O10 = [cx + ro * c1, cy + ro * s1, z0];
      var O01 = [cx + ro * c0, cy + ro * s0, z1], O11 = [cx + ro * c1, cy + ro * s1, z1];
      var I00 = [cx + ri * c0, cy + ri * s0, z0], I10 = [cx + ri * c1, cy + ri * s1, z0];
      var I01 = [cx + ri * c0, cy + ri * s0, z1], I11 = [cx + ri * c1, cy + ri * s1, z1];
      S.triN(O00, O10, O11, n0, n1, n1); S.triN(O00, O11, O01, n0, n1, n0);
      S.triN(I00, I10, I11, m0, m1, m1); S.triN(I00, I11, I01, m0, m1, m0);
      S.triN(O01, O11, I11, up, up, up); S.triN(O01, I11, I01, up, up, up);
    }
    return S.geo();
  }
  /* an (x, z) polygon clipped to xa <= x <= xb (Sutherland-Hodgman) */
  function clipX(poly, xa, xb) {
    function cut(P, keep, xc) {
      var out = [];
      for (var i = 0; i < P.length; i++) {
        var a = P[i], b = P[(i + 1) % P.length], ia = keep(a[0]), ib = keep(b[0]);
        if (ia) out.push(a);
        if (ia !== ib) { var t = (xc - a[0]) / (b[0] - a[0]); out.push([xc, a[1] + (b[1] - a[1]) * t]); }
      }
      return out;
    }
    var P = cut(poly, function (x) { return x >= xa; }, xa);
    return P.length ? cut(P, function (x) { return x <= xb; }, xb) : P;
  }
  /* a flat disc facing up */
  function disc(cx, cy, r, z, seg) {
    var S = new Soup(), up = [0, 0, 1];
    for (var k = 0; k < seg; k++) {
      var a0 = k / seg * 2 * PI, a1 = (k + 1) / seg * 2 * PI;
      S.triN([cx, cy, z], [cx + r * Math.cos(a0), cy + r * Math.sin(a0), z], [cx + r * Math.cos(a1), cy + r * Math.sin(a1), z], up, up, up);
    }
    return S.geo();
  }
  /* a rock: an icosahedron flattened and turned at random */
  var _bs = 0;
  function boulder(K, x, y, r, z) {
    var R = rng(9001 + (_bs++) * 97);
    var g = new V.IcosahedronGeometry(r, 0);
    g.applyMatrix4(new V.Matrix4().compose(new V.Vector3(x, y, z),
      new V.Quaternion().setFromEuler(new V.Euler(R() * 3, R() * 3, R() * 3)), new V.Vector3(1, 0.85, 0.66)));
    K.add("ore", g);
  }
  /* a spill heap on the hardstand */
  function heap(K, x, y, r, h) {
    var g = new V.ConeGeometry(r, h, 7, 1, true);
    g.rotateX(PI / 2);
    g.translate(x, y, APRON + h / 2 - 0.03);
    K.add("ore", g);
  }

  /* a panel laid on a wall: the wall faces along nrm ("x" or "y") at
     coordinate 'at', 'out' is +1 or -1, the panel spans a0..a1 along the
     wall and z0..z1, and stands th proud of it */
  function panel(K, key, nrm, at, out, a0, a1, z0, z1, th, uvf) {
    K.add(key, nrm === "y" ? bb(a0, a1, at, at + out * th, z0, z1) : bb(at, at + out * th, a0, a1, z0, z1), uvf);
  }
  /* a roller door in its dark steel frame */
  function rollerDoor(K, nrm, at, out, a0, a1, z1) {
    panel(K, "wall", nrm, at, out, a0, a1, APRON, z1, 0.1, uvRect(nrm, a0, a1, APRON, z1, 0.006, 0.474, 0.012, 0.238));
    panel(K, "dark", nrm, at, out, a0 - 0.25, a0, APRON, z1 + 0.4, 0.16);
    panel(K, "dark", nrm, at, out, a1, a1 + 0.25, APRON, z1 + 0.4, 0.16);
    panel(K, "dark", nrm, at, out, a0, a1, z1, z1 + 0.4, 0.18);
  }
  function door(K, nrm, at, out, a0, a1, zb) { panel(K, "dark", nrm, at, out, a0, a1, zb, zb + 2.1, 0.06); }
  function louvre(K, nrm, at, out, a0, a1, z0, z1) {
    panel(K, "wall", nrm, at, out, a0, a1, z0, z1, 0.06, uvRect(nrm, a0, a1, z0, z1, 0.53, 0.995, 0.02, 0.232));
  }

  /* ============================================================ the plot */
  /* the hardstand, open over the pocket's mouth */
  function apron(K) {
    var X0 = -29.7, X1 = 29.7, Y0 = -19.9, Y1 = 19.9;
    K.add("conc", bbx(X0, X1, PK.y1, Y1, 0, APRON, UNDER));
    K.add("conc", bbx(X0, X1, Y0, PK.y0, 0, APRON, UNDER));
    K.add("conc", bbx(X0, PK.x0, PK.y0, PK.y1, 0, APRON, UNDER));
    K.add("conc", bbx(PK.x1, X1, PK.y0, PK.y1, 0, APRON, UNDER));
  }

  /* ------------------------------------------------------ the dump pocket
     A concrete hopper let into the hardstand on the plot's south edge. The
     trucks back up to the stop, which runs along the edge, and tip over
     it; wing walls step up from the stop to a 3.5 m back wall so nothing
     tipped leaves the pocket. Across the mouth, the static grizzly: ten
     bars, 0.9 m apart, on two bearers let into the wing walls. */
  function pocket(K) {
    var i, x, F = PK.floor;
    K.add("conc", bb(PK.x0, PK.x1, PK.y0, PK.y1, 0, F));
    var prof = [[KERB.y1, F], [PK.back, F], [PK.back, PK.top], [-14.6, PK.top], [KERB.y1, KERB.top]];
    K.add("conc", prismX(PK.x0 - 1.3, PK.x0, prof));
    K.add("conc", prismX(PK.x1, PK.x1 + 1.3, prof));
    K.add("conc", bb(PK.x0, PK.x1, PK.y1, PK.back, F, PK.top));
    K.add("conc", bb(KERB.x0, KERB.x1, KERB.y0, KERB.y1, 0, KERB.top));
    /* the stop's face: a steel wear plate painted in yellow and black
       bands. The bands are pieces of the plate's own face, side by side
       and flush: laid on it they would sit millimetres proud and z-fight
       at map zoom. */
    var xa = KERB.x0 + 0.15, xb = KERB.x1 - 0.15, yf = KERB.y0 - 0.05, zb = APRON, zt = KERB.top - 0.1;
    K.add("yellow", bbx(xa, xb, yf, KERB.y0, zb, zt, [3]));
    var SY = new Soup(), SD = new Soup(), bw = 0.55, sh = zt - zb, k = 0, away = [0, yf + 1, 0.8];
    for (x = xa - sh - bw; x < xb; x += bw, k++) {
      var poly = clipX([[x, zb], [x + bw, zb], [x + bw + sh, zt], [x + sh, zt]], xa, xb);
      for (i = 1; i < poly.length - 1; i++)
        (k & 1 ? SD : SY).tri([poly[0][0], yf, poly[0][1]], [poly[i][0], yf, poly[i][1]], [poly[i + 1][0], yf, poly[i + 1][1]], away);
    }
    K.add("yellow", SY.geo());
    K.add("dark", SD.geo());
    for (i = 0; i < 10; i++) {
      var xk = PK.x0 + 0.45 + 0.9 * i;
      K.add("steel", bar(xk - 0.1, xk + 0.1, PK.y0, PK.y1, F, F + 0.38, "both"));
    }
    K.add("steel", bar(PK.x0 - 0.3, PK.x1 + 0.3, -16.35, -16.05, F, F + 0.26, "both"));
    K.add("steel", bar(PK.x0 - 0.3, PK.x1 + 0.3, -13.95, -13.65, F, F + 0.26, "both"));
    /* oversize left on the bars, the biggest under the hook */
    boulder(K, -0.75, -15.85, 0.62, F + 0.74);
    boulder(K, -3.2, -12.5, 0.5, F + 0.66);
    boulder(K, 3.5, -17.5, 0.44, F + 0.62);
    heap(K, 6.6, -17.4, 0.8, 0.35);
    heap(K, 7.0, -13.0, 0.6, 0.28);
    heap(K, 0.8, -9.25, 0.62, 0.3);
    /* the tipping signal at the east end of the stop, where a driver backing
       in sees it in his mirror */
    K.add("steel", cylZ(0.09, 0.07, 3.2, 8, KERB.x1 + 0.6, KERB.y0 + 0.5, APRON, false));
    K.add("dark", bb(KERB.x1 + 0.35, KERB.x1 + 0.85, KERB.y0 + 0.2, KERB.y0 + 0.5, APRON + 2.5, APRON + 3.5));
    K.add("yellow", bb(KERB.x1 + 0.3, KERB.x1 + 0.9, KERB.y0 + 0.14, KERB.y0 + 0.2, APRON + 2.45, APRON + 3.55));
  }

  /* ------------------------------------------------ primary crusher house
     A steel-clad box over the jaw, 15 m to the eaves for the crane that
     lifts its pitman, on a concrete upstand. The apron feeder runs to it
     under the ground from the pocket's slot, so what shows is the house:
     a roller door for the crane's loads, louvres under the eaves, and the
     hoist beam run out over the pocket to lift the grizzly bars and the
     oversize off them. The coping round its flat roof is the team colour. */
  function crusherHouse(K) {
    var x0 = CH.x0, x1 = CH.x1, y0 = CH.y0, y1 = CH.y1, WT = CH.wall, o = 0.06, w = 0.56;
    K.add("conc", bbx(x0 - 0.08, x1 + 0.08, y0 - 0.08, y1 + 0.08, 0, 1.5, UNDER));
    K.add("wall", bbx(x0, x1, y0, y1, 1.5, WT, [4, 5]));
    K.add("team", bb(x0 - o, x1 + o, y0 - o, y0 - o + w, WT, RTOP));
    K.add("team", bb(x0 - o, x1 + o, y1 + o - w, y1 + o, WT, RTOP));
    K.add("team", bb(x0 - o, x0 - o + w, y0 - o + w, y1 + o - w, WT, RTOP));
    K.add("team", bb(x1 + o - w, x1 + o, y0 - o + w, y1 + o - w, WT, RTOP));
    K.add("roof", bb(x0 - o + w, x1 + o - w, y0 - o + w, y1 + o - w, RTOP - 0.3, RTOP));
    /* south */
    rollerDoor(K, "y", y0, -1, x0 + 1.2, x0 + 5.7, 6.6);
    door(K, "y", y0, -1, x0 + 7.2, x0 + 8.2, APRON);
    K.add("steel", bb(x0 + 6.9, x0 + 8.5, y0 - 1.0, y0, 2.75, 2.85));
    louvre(K, "y", y0, -1, x0 + 2.0, x1 - 1.5, 11.2, 12.4);
    /* east, toward the pocket: louvres, and the hoist's runway beam out of
       the wall, braced off it, across the pocket to a column standing on
       the far wing wall; its trolley waits over the biggest lump */
    louvre(K, "x", x1, 1, y0 + 1.5, y1 - 1.5, 11.2, 12.4);
    var wc = PK.x1 + 0.65;
    K.add("steel", bar(x1, wc + 0.3, -15.2, -14.8, 13.0, 13.6, "lo"));
    K.add("steel", bar(wc - 0.15, wc + 0.15, -15.15, -14.85, 3.1, 13.0, "both"));
    K.add("steel", rod([x1, -15.0, 10.4], [-6.3, -15.0, 13.0], 0.1, 6));
    K.add("yellow", bb(-1.6, -0.6, -15.35, -14.65, 12.45, 13.0));
    K.add("steel", bar(-1.2, -1.12, -15.04, -14.96, 9.3, 12.45, "both"));
    K.add("steel", bar(-1.08, -1.0, -15.04, -14.96, 9.3, 12.45, "both"));
    K.add("yellow", bb(-1.35, -0.75, -15.2, -14.8, 8.7, 9.3));
    /* the crusher operator's cabin, hung off the wall beside the pocket's
       north-west corner, looking along the grizzly at the trucks tipping */
    var cb = { x1: x1 + 1.9, y0: -13.3, y1: -10.3, z0: 6.0, z1: 8.9 };
    K.add("wall", bbx(x1, cb.x1, cb.y0, cb.y1, cb.z0, cb.z1, [1]));
    K.add("roof", bbx(x1, cb.x1 + 0.2, cb.y0 - 0.2, cb.y1 + 0.2, cb.z1, cb.z1 + 0.16, [1]));
    K.add("dark", bb(cb.x1, cb.x1 + 0.06, cb.y0 + 0.25, cb.y1 - 0.25, cb.z0 + 0.95, cb.z1 - 0.45));
    K.add("dark", bb(x1 + 0.25, cb.x1 - 0.2, cb.y0 - 0.06, cb.y0, cb.z0 + 0.95, cb.z1 - 0.45));
    K.add("steel", rod([x1, cb.y0 + 0.3, cb.z0 - 1.6], [cb.x1 - 0.2, cb.y0 + 0.3, cb.z0], 0.08, 4));
    K.add("steel", rod([x1, cb.y1 - 0.3, cb.z0 - 1.6], [cb.x1 - 0.2, cb.y1 - 0.3, cb.z0], 0.08, 4));
    K.add("steel", bbx(x1 + 0.3, x1 + 1.1, cb.y1 - 1.0, cb.y1 - 0.3, cb.z1 + 0.16, cb.z1 + 0.7, UNDER));
    /* north */
    louvre(K, "y", y1, 1, x0 + 1.0, x0 + 5.5, 11.2, 12.4);
    louvre(K, "y", y1, 1, x1 - 4.5, x1 - 1.0, 11.2, 12.4);
    door(K, "y", y1, 1, x1 - 3.2, x1 - 2.2, APRON);
    /* west: the switchroom lean-to, its ventilation louvre and cable tray */
    K.add("wall", bb(-28.4, x0, -17.0, -10.0, APRON, 4.4));
    K.add("roof", bb(-28.6, x0, -17.2, -9.8, 4.4, 4.62));
    door(K, "y", -17.0, -1, -27.2, -26.2, APRON);
    louvre(K, "x", -28.4, -1, -13.2, -12.0, 1.2, 2.2);
    K.add("steel", bb(-26.5, x0, -12.3, -11.7, 4.62, 4.85));
    [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(function (c) {
      K.add("steel", bar(c[0] - 0.12, c[0] + 0.12, c[1] - 0.12, c[1] + 0.12, 1.5, WT, "both"));
    });
  }

  /* The crusher's dust collector on the house's north side: a bag house on
     four legs over its hopper and rotary valve, the fan and stack on top,
     the duct from the crusher into its side. */
  function dustCollector(K) {
    var cx = -11.5, cy = -4.7, e = 1.15;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
      K.add("steel", bar(cx + c[0] * e - 0.13, cx + c[0] * e + 0.13, cy + c[1] * e - 0.13, cy + c[1] * e + 0.13, APRON, 5.4, "both"));
    });
    K.add("steel", rod([cx - e, cy + e, APRON + 0.3], [cx + e, cy + e, 3.4], 0.06, 4, true));
    K.add("steel", rod([cx + e, cy - e, APRON + 0.3], [cx + e, cy + e, 3.4], 0.06, 4, true));
    K.add("steel", frustumSq(cx, cy, 3.6, 5.4, 0.35, 1.3));
    K.add("dark", bb(cx - 0.3, cx + 0.3, cy - 0.3, cy + 0.3, 3.0, 3.6));
    K.add("wall", bb(cx - 1.3, cx + 1.3, cy - 1.3, cy + 1.3, 5.4, 9.4));
    K.add("steel", bb(cx - 1.4, cx + 1.4, cy - 1.4, cy + 1.4, 9.4, 9.9));
    K.add("steel", cylZ(0.7, 0.7, 0.8, 14, cx + 0.4, cy + 0.4, 9.9));
    K.add("dark", bb(cx - 0.9, cx - 0.1, cy + 0.2, cy + 0.8, 9.9, 10.5));
    K.add("steel", cylZ(0.34, 0.3, 3.6, 12, cx + 0.4, cy + 0.4, 10.7));
    K.add("steel", rod([cx, CH.y1, 7.6], [cx, cy - 1.3, 7.6], 0.36, 10));
  }

  /* ------------------------------------------------------------ galleries
     An enclosed truss gallery: a steel deck on two bottom chords, clad
     sides with the ventilation gap under the eaves, a sheeted roof. */
  function gallery(K, axis, c, a0, a1, fz, hw, h, uvr) {
    var z0 = fz(a0), z1 = fz(a1), s;
    K.add("steel", incl(axis, a0, a1, c - hw - 0.1, c + hw + 0.1, z0 - 0.35, z1 - 0.35, z0, z1));
    for (s = -1; s <= 1; s += 2) {
      K.add("wall", incl(axis, a0, a1, c + s * hw - 0.05, c + s * hw + 0.05, z0, z1, z0 + h, z1 + h));
      var cs = c + s * (hw + 0.05);
      K.add("dark", incl(axis, a0, a1, Math.min(cs, cs + s * 0.06), Math.max(cs, cs + s * 0.06),
                         z0 + h - 0.5, z1 + h - 0.5, z0 + h - 0.2, z1 + h - 0.2));
      var cc = c + s * (hw - 0.05);
      K.add("steel", incl(axis, a0, a1, cc - 0.13, cc + 0.13, z0 - 0.65, z1 - 0.65, z0 - 0.35, z1 - 0.35));
    }
    K.add("roof", incl(axis, a0, a1, c - hw - 0.25, c + hw + 0.25, z0 + h, z1 + h, z0 + h + 0.15, z1 + h + 0.15), uvr);
  }
  /* a trestle bent: two columns on concrete piers, a cap beam, X bracing */
  function bent(K, axis, c, a, hw, zTop) {
    function P(cc, z) { return axis === "y" ? [cc, a, z] : [a, cc, z]; }
    function box2(c0, c1, a0, a1, z0, z1, drop) {
      return axis === "y" ? bar(c0, c1, a0, a1, z0, z1, drop) : bar(a0, a1, c0, c1, z0, z1, drop);
    }
    for (var s = -1; s <= 1; s += 2) {
      var cc = c + s * hw;
      K.add("steel", box2(cc - 0.17, cc + 0.17, a - 0.17, a + 0.17, APRON + 0.3, zTop - 0.35, "both"));
      K.add("conc", axis === "y" ? bb(cc - 0.4, cc + 0.4, a - 0.4, a + 0.4, 0, APRON + 0.3)
                                 : bb(a - 0.4, a + 0.4, cc - 0.4, cc + 0.4, 0, APRON + 0.3));
    }
    K.add("steel", axis === "y" ? bb(c - hw - 0.3, c + hw + 0.3, a - 0.2, a + 0.2, zTop - 0.35, zTop)
                                : bb(a - 0.2, a + 0.2, c - hw - 0.3, c + hw + 0.3, zTop - 0.35, zTop));
    if (zTop - APRON > 2.4) {
      K.add("steel", rod(P(c - hw, APRON + 0.8), P(c + hw, zTop - 0.45), 0.07, 4, true));
      K.add("steel", rod(P(c + hw, APRON + 0.8), P(c - hw, zTop - 0.45), 0.07, 4, true));
    }
  }

  /* Gallery A: out of the crusher house's north wall at 4.2 m, up at 15
     degrees to the head house over the pile, on one bent short of the pile
     and a four-legged tower standing in it. The discharge chute hangs from
     the head house over the apex. */
  function galleryA(K) {
    var i, j, hw = 1.7;
    gallery(K, "y", GA.x, GA.y0, HH.y0, gaFloor, hw, 2.8, uvRoofY);
    bent(K, "y", GA.x, -0.5, hw + 0.3, gaFloor(-0.5) - 0.65);
    K.add("wall", bb(HH.x0, HH.x1, HH.y0, HH.y1, HH.z0, HH.z1));
    K.add("roof", bb(HH.x0 - 0.2, HH.x1 + 0.2, HH.y0 - 0.2, HH.y1 + 0.2, HH.z1, HH.z1 + 0.18), uvRoofY);
    door(K, "x", HH.x1, 1, 10.0, 11.0, HH.z0);
    var lx = [HH.x0 + 0.2, HH.x1 - 0.2], ly = [HH.y0 + 0.2, HH.y1 - 0.2];
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++)
      K.add("steel", bar(lx[i] - 0.17, lx[i] + 0.17, ly[j] - 0.17, ly[j] + 0.17, 2.4, HH.z0, "both"));
    var zb = 4.6, zt = HH.z0 - 0.3;
    for (i = 0; i < 2; i++) {
      K.add("steel", rod([lx[0], ly[i], zb], [lx[1], ly[i], zt], 0.06, 4, true));
      K.add("steel", rod([lx[1], ly[i], zb], [lx[0], ly[i], zt], 0.06, 4, true));
      K.add("steel", rod([lx[i], ly[0], zb], [lx[i], ly[1], zt], 0.06, 4, true));
      K.add("steel", rod([lx[i], ly[1], zb], [lx[i], ly[0], zt], 0.06, 4, true));
    }
    K.add("steel", frustumSq(GA.x, 10.3, 6.5, HH.z0, 0.35, 0.7));
  }

  /* Gallery B: the reclaim conveyor comes up out of the tunnel under the
     pile through a concrete portal at the toe and climbs at 15 degrees into
     the mill building's west gable, 4.85 m up at the wall. */
  function galleryB(K) {
    var hw = 1.4;
    K.add("conc", bb(-10.2, GB.x0, GB.y - 1.9, GB.y + 1.9, 0, 4.0));
    gallery(K, "x", GB.y, GB.x0, ML.x0, gbFloor, hw, 2.5);
    bent(K, "x", GB.y, -1.0, hw + 0.3, gbFloor(-1.0) - 0.65);
  }

  /* ------------------------------------------------------ the stockpile
     A cone of the hauler's ore at 37 degrees under the chute, built as a
     jittered polar grid and flat shaded so it reads as rock; the biggest
     lumps roll to the toe, as they do off every conveyor-built pile. */
  function stockpile(K) {
    var R = rng(7713), S = new Soup(), NR = 6, NA = 30, i, j, k;
    var cx = PILE.x, cy = PILE.y, Rb = PILE.R, H = PILE.H, lumps = [];
    for (i = 0; i < 9; i++) {
      var la = R() * 2 * PI, lr = 1.5 + R() * 4.8;
      lumps.push([cx + Math.cos(la) * lr, cy + Math.sin(la) * lr, 0.6 + R() * 0.9, 0.12 + R() * 0.25]);
    }
    function hz(x, y) {
      var dx = x - cx, dy = y - cy, r = Math.sqrt(dx * dx + dy * dy);
      var z = APRON + H * Math.max(0, 1 - r / Rb), f = Math.min(1, (Rb - r) / 1.5);
      for (k = 0; k < lumps.length; k++) {
        var L = lumps[k], ex = x - L[0], ey = y - L[1];
        z += f * L[3] * Math.exp(-(ex * ex + ey * ey) / (L[2] * L[2]));
      }
      return z;
    }
    var rings = [];
    for (i = 0; i <= NR; i++) {
      var t = i / (NR + 1), ring = [];
      for (j = 0; j < NA; j++) {
        var a = j / NA * 2 * PI;
        var rr = Rb * (1 - t) * (1 + (i === 0 ? 0.04 : 0.07) * (R() - 0.5));
        var x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        ring.push([x, y, i === 0 ? APRON - 0.02 : hz(x, y) + (R() - 0.5) * 0.28]);
      }
      rings.push(ring);
    }
    var apex = [cx + 0.1, cy - 0.05, APRON + H + 0.08], below = [cx, cy, -6];
    for (i = 0; i < NR; i++) for (j = 0; j < NA; j++) {
      var a0 = rings[i][j], a1 = rings[i][(j + 1) % NA], b0 = rings[i + 1][j], b1 = rings[i + 1][(j + 1) % NA];
      if ((i + j) & 1) { S.tri(a0, a1, b1, below); S.tri(a0, b1, b0, below); }
      else { S.tri(a0, a1, b0, below); S.tri(a1, b1, b0, below); }
    }
    for (j = 0; j < NA; j++) S.tri(rings[NR][j], rings[NR][(j + 1) % NA], apex, below);
    K.add("ore", S.geo());
    for (i = 0; i < 7; i++) {
      var ba = 0.4 + i * 0.83 + R() * 0.4, br = Rb * (0.92 + R() * 0.14), rb = 0.3 + R() * 0.28;
      boulder(K, cx + Math.cos(ba) * br, cy + Math.sin(ba) * br, rb, APRON + rb * 0.4);
    }
  }

  /* --------------------------------------------------- the mill building
     The high bay over the grinding mills: steel-clad on a concrete
     upstand, a gable roof at 8.5 degrees from 14.6 m eaves to the 15.8 m
     ridge, both verges and the eave band in the team colour. The relining
     door is in the east gable, the switchroom and control room lean
     against the south wall, and a stair climbs the north wall to the
     operating floor. */
  function mill(K) {
    var x0 = ML.x0, x1 = ML.x1, y0 = ML.y0, y1 = ML.y1, ry = ML.ridge;
    var SL = (RTOP - ML.eave) / (ry - y0), RT = 0.15, ov = 0.4, e0 = y0 - ov, e1 = y1 + ov;
    function roofZ(y) { return RTOP - Math.abs(y - ry) * SL; }
    K.add("conc", bbx(x0 - 0.08, x1 + 0.08, y0 - 0.08, y1 + 0.08, 0, 1.5, UNDER));
    K.add("wall", prismX(x0, x1, [[y0, 1.5], [y1, 1.5], [y1, roofZ(y1) - RT], [ry, RTOP - RT], [y0, roofZ(y0) - RT]]));
    K.add("roof", incl("y", e0, ry, x0 - ov, x1 + ov, roofZ(e0) - RT, RTOP - RT, roofZ(e0), RTOP));
    K.add("roof", incl("y", ry, e1, x0 - ov, x1 + ov, RTOP - RT, roofZ(e1) - RT, RTOP, roofZ(e1)));
    [[x0 - ov - 0.45, x0 - ov], [x1 + ov, x1 + ov + 0.45]].forEach(function (b) {
      K.add("team", incl("y", e0, ry, b[0], b[1], roofZ(e0) - 0.4, RTOP - 0.4, roofZ(e0), RTOP));
      K.add("team", incl("y", ry, e1, b[0], b[1], RTOP - 0.4, roofZ(e1) - 0.4, RTOP, roofZ(e1)));
    });
    var fz0 = ML.eave - 0.95, fz1 = ML.eave - RT;
    K.add("team", bb(x0 - 0.06, x1 + 0.06, y0 - 0.06, y0, fz0, fz1));
    K.add("team", bb(x0 - 0.06, x1 + 0.06, y1, y1 + 0.06, fz0, fz1));
    K.add("team", bb(x0 - 0.06, x0, y0, y1, fz0, fz1));
    K.add("team", bb(x1, x1 + 0.06, y0, y1, fz0, fz1));
    /* gutters and downpipes */
    K.add("steel", bb(x0 - ov, x1 + ov, e0 - 0.22, e0, roofZ(e0) - 0.4, roofZ(e0) - 0.08));
    K.add("steel", bb(x0 - ov, x1 + ov, e1, e1 + 0.22, roofZ(e1) - 0.4, roofZ(e1) - 0.08));
    [[7.2, e0 + 0.12], [28.3, e0 + 0.12], [7.2, e1 - 0.12], [28.3, e1 - 0.12]].forEach(function (d) {
      K.add("steel", cylZ(0.09, 0.09, roofZ(e0) - 0.4 - APRON, 8, d[0], d[1], APRON, true));
    });
    [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(function (c) {
      K.add("steel", bar(c[0] - 0.12, c[0] + 0.12, c[1] - 0.12, c[1] + 0.12, 1.5, fz0, "both"));
    });
    /* roof ventilators, low on both slopes: nothing may stand above the
       ridge (see the header: the faction kit sits on the top) */
    [10.5, 17.5, 24.5].forEach(function (vx) {
      [6.0, 16.0].forEach(function (vy) {
        K.add("steel", bbx(vx - 0.35, vx + 0.35, vy - 0.35, vy + 0.35, roofZ(vy) - 0.1, roofZ(vy) + 0.45, UNDER));
      });
    });
    var LV = [[8, 12], [13.5, 17.5], [19, 23], [24.5, 28.5]];
    /* north wall, the side the default camera sees */
    LV.forEach(function (l) { louvre(K, "y", y1, 1, l[0], l[1], 11.0, 12.4); });
    door(K, "y", y1, 1, 8.4, 9.4, APRON);
    millStair(K);
    /* east gable: the relining door */
    rollerDoor(K, "x", x1, 1, 8.0, 14.0, 8.0);
    door(K, "x", x1, 1, 15.6, 16.6, APRON);
    louvre(K, "x", x1, 1, 9.0, 13.0, 10.2, 11.4);
    /* south wall, over the lean-to */
    LV.forEach(function (l) { louvre(K, "y", y0, -1, l[0], l[1], 11.0, 12.4); });
    door(K, "y", y0, -1, 24.0, 25.0, APRON);
    K.add("wall", bb(9.0, 21.0, 0.2, y0, APRON, 5.0));
    K.add("roof", bb(8.8, 21.2, 0.0, y0, 5.0, 5.22));
    K.add("dark", bb(14.6, 20.4, 0.14, 0.2, 2.3, 3.3));
    door(K, "y", 0.2, -1, 10.4, 11.4, APRON);
    K.add("steel", bbx(11.0, 12.2, 0.9, 1.8, 5.22, 5.95, UNDER));
    K.add("steel", bbx(16.0, 17.2, 0.9, 1.8, 5.22, 5.95, UNDER));
    /* west gable, where gallery B comes in */
    louvre(K, "x", x0, -1, 13.5, 17.5, 10.2, 11.4);
    door(K, "x", x0, -1, 4.5, 5.5, APRON);
  }
  /* the stair up the north wall to a door at the operating floor, 6.2 m */
  function millStair(K) {
    var y0 = ML.y1 + 0.1, y1 = ML.y1 + 0.85, xa = 17.0, xb = 25.4, zt = 6.2, xl = 27.8, k;
    K.add("yellow", rod([xa, y0 + 0.05, APRON], [xb, y0 + 0.05, zt], 0.09, 4));
    K.add("yellow", rod([xa, y1 - 0.05, APRON], [xb, y1 - 0.05, zt], 0.09, 4));
    for (k = 0; k < 14; k++) {
      var t = (k + 0.5) / 14, x = lerp(xa, xb, t), z = lerp(APRON, zt, t);
      K.add("steel", bb(x - 0.15, x + 0.15, y0 + 0.1, y1 - 0.1, z - 0.04, z + 0.02));
    }
    K.add("yellow", rod([xa + 0.3, y1 - 0.03, APRON + 1.0], [xb, y1 - 0.03, zt + 1.0], 0.04, 4, true));
    [0.05, 0.5, 0.95].forEach(function (t) {
      var x = lerp(xa, xb, t), z = lerp(APRON, zt, t);
      K.add("yellow", bar(x - 0.03, x + 0.03, y1 - 0.06, y1, z, z + 1.02, "lo"));
    });
    K.add("steel", bb(xb, xl, y0, y1, zt - 0.12, zt));
    K.add("yellow", bar(xb, xl, y1 - 0.06, y1, zt + 0.98, zt + 1.04));
    K.add("yellow", bar(xl - 0.06, xl, y0, y1 - 0.06, zt + 0.98, zt + 1.04, "hi"));
    K.add("yellow", bar(xl - 0.06, xl, y1 - 0.06, y1, zt, zt + 1.04, "lo"));
    K.add("yellow", bar(xl - 0.06, xl, y0, y0 + 0.06, zt, zt + 1.04, "lo"));
    K.add("steel", bar(xl - 0.3, xl - 0.1, y0 + 0.2, y0 + 0.4, APRON, zt - 0.12, "both"));
    K.add("steel", bar(21.0, 21.2, y0 + 0.2, y0 + 0.4, APRON, lerp(APRON, zt, (21.1 - xa) / (xb - xa)) - 0.05, "lo"));
    door(K, "y", ML.y1, 1, 26.1, 27.1, zt);
  }

  /* ---------------------------------------------------------- thickener
     A 14 m bridge thickener: a welded steel tank on a ring footing, its
     overflow launder inside the rim, and a beam bridge right across it
     carrying the walkway, the feed pipe and the rake drive over the
     feedwell. The underflow pump stands at its foot. */
  function thickener(K) {
    var cx = TK.x, cy = TK.y, R = TK.R, dz = 4.1, k;
    K.add("conc", cylZ(R + 0.3, R + 0.3, 0.3, 40, cx, cy, APRON));
    K.add("wall", ringWall(cx, cy, R, R - 0.1, 0.6, TK.rim, 40), uvTank(cx, cy, R, 0.6, TK.rim - 0.6));
    K.add("conc", disc(cx, cy, R - 0.1, TK.water, 40));
    K.add("steel", ringWall(cx, cy, R - 0.55, R - 0.65, 2.6, TK.water + 0.1, 40));
    K.add("steel", ringWall(cx, cy, 1.4, 1.3, 2.4, 3.5, 20));
    K.add("dark", disc(cx, cy, 1.3, 3.25, 20));
    /* the bridge, north-south, and a landing off its north end */
    var bx0 = cx - 0.9, bx1 = cx + 0.9, by0 = cy - R - 0.25, by1 = cy + R + 0.3;
    K.add("steel", bb(bx0, bx0 + 0.3, by0, by1, 3.3, dz));
    K.add("steel", bb(bx1 - 0.3, bx1, by0, by1, 3.3, dz));
    K.add("steel", bb(bx0, bx1, by0, by1, dz, dz + 0.08));
    K.add("steel", bb(bx0 - 0.2, bx1 + 0.2, by0, cy - R + 0.35, TK.rim, 3.3));
    K.add("steel", bb(bx0 - 0.2, bx1 + 0.2, cy + R - 0.35, by1, TK.rim, 3.3));
    K.add("steel", bb(bx1, cx + 2.1, by1 - 0.6, by1, dz, dz + 0.08));
    [bx0 + 0.04, bx1 - 0.04].forEach(function (rx) {
      K.add("yellow", bar(rx - 0.03, rx + 0.03, by0, by1, dz + 1.02, dz + 1.08));
      K.add("yellow", bar(rx - 0.03, rx + 0.03, by0, by1, dz + 0.52, dz + 0.57));
      for (var py = by0 + 0.1; py < by1; py += 1.75)
        K.add("yellow", bar(rx - 0.03, rx + 0.03, py - 0.03, py + 0.03, dz + 0.08, dz + 1.08, "lo"));
    });
    /* the drive head and its motor over the feedwell */
    K.add("steel", cylZ(0.72, 0.65, 0.85, 18, cx, cy, dz + 0.08));
    K.add("yellow", bb(cx - 0.42, cx + 0.3, cy + 0.12, cy + 0.66, dz + 0.93, dz + 1.5));
    K.add("dark", cylZ(0.3, 0.3, 0.25, 10, cx - 0.1, cy - 0.25, dz + 0.93));
    /* feed from the mill: along the bridge and down into the feedwell */
    var px = cx + 0.55;
    K.add("steel", rod([px, ML.y0, 4.6], [px, cy + 1.25, 4.6], 0.17, 8));
    K.add("steel", rod([px, cy + 1.25, 4.6], [px, cy + 1.05, 3.4], 0.17, 8));
    K.add("steel", bar(px - 0.1, px + 0.1, -1.0, -0.8, APRON, 4.42, "lo"));
    K.add("steel", bb(px - 0.35, px + 0.35, -1.05, -0.75, 4.25, 4.43));
    /* ladder from the ground to the landing */
    var lx0 = cx + 1.45, lx1 = cx + 1.95, ly = by1 + 0.1;
    K.add("yellow", bar(lx0 - 0.03, lx0 + 0.03, ly - 0.03, ly + 0.03, APRON, dz + 1.08, "lo"));
    K.add("yellow", bar(lx1 - 0.03, lx1 + 0.03, ly - 0.03, ly + 0.03, APRON, dz + 1.08, "lo"));
    for (k = 0; k < 6; k++) K.add("yellow", bar(lx0, lx1, ly - 0.02, ly + 0.02, 0.9 + k * 0.6, 0.94 + k * 0.6, "both"));
    /* the launder's outlet box on the rim and its overflow pipe down */
    K.add("steel", bbx(cx + R - 0.2, cx + R + 0.7, cy - 0.45, cy + 0.45, 2.4, TK.rim + 0.15, UNDER));
    K.add("steel", cylZ(0.17, 0.17, 2.4 - APRON, 8, cx + R + 0.3, cy, APRON, true));
    /* underflow pump, motor and suction line on the tank's west side */
    K.add("steel", bb(12.2, 13.6, -12.4, -10.6, APRON, 0.5));
    K.add("dark", rod([12.75, cy, 0.95], [13.45, cy, 0.95], 0.35, 12));
    K.add("steel", rod([12.3, cy, 0.9], [12.75, cy, 0.9], 0.3, 12));
    K.add("steel", rod([13.45, cy, 0.95], [cx - R + 0.05, cy, 0.95], 0.14, 8));
  }

  /* --------------------------------------------------------- fuel farm
     The card's crude and fuel: two vertical fuel tanks in a concrete bund,
     their bottom header over the bund wall to the pump skid, and a hose on
     a swing arm over the tanker bay. */
  function fuelFarm(K) {
    var t = 0.3, x0 = BD.x0, x1 = BD.x1, y0 = BD.y0, y1 = BD.y1, zt = BD.top, hy = y0 + 0.9;
    K.add("conc", bb(x0, x1, y0, y0 + t, 0, zt));
    K.add("conc", bb(x0, x1, y1 - t, y1, 0, zt));
    K.add("conc", bb(x0, x0 + t, y0 + t, y1 - t, 0, zt));
    K.add("conc", bb(x1 - t, x1, y0 + t, y1 - t, 0, zt));
    TANK.at.forEach(function (c) { tank(K, c[0], c[1]); });
    TANK.at.forEach(function (c) {
      K.add("steel", rod([c[0], c[1] - TANK.R + 0.05, 0.9], [c[0], hy, 0.9], 0.12, 8));
    });
    K.add("steel", rod([TANK.at[0][0] - 0.12, hy, 0.9], [x1 - 0.6, hy, 0.9], 0.12, 8));
    K.add("steel", rod([x1 - 0.6, hy, 0.78], [x1 - 0.6, hy, zt + 0.52], 0.12, 8));
    K.add("steel", rod([x1 - 0.72, hy, zt + 0.4], [7.12, hy, zt + 0.4], 0.12, 8));
    K.add("steel", rod([7.0, hy, zt + 0.52], [7.0, hy, 0.95], 0.12, 8));
    K.add("steel", bb(6.3, 9.0, -7.9, -5.9, APRON, 0.5));
    [-7.35, -6.45].forEach(function (yy) {
      K.add("dark", rod([6.6, yy, 0.85], [7.4, yy, 0.85], 0.28, 10));
      K.add("steel", rod([7.4, yy, 0.85], [8.2, yy, 0.85], 0.26, 10));
    });
    K.add("steel", cylZ(0.35, 0.35, 1.3, 12, 8.6, -6.9, 0.5));
    K.add("steel", cylZ(0.14, 0.12, 3.4, 8, 9.5, -5.0, APRON));
    K.add("steel", rod([9.5, -5.0, 3.62], [11.6, -3.9, 3.42], 0.1, 6));
    K.add("dark", rod([11.6, -3.9, 3.42], [11.7, -3.8, 1.0], 0.09, 6));
    /* the stile over the bund's north wall */
    var sx0 = -1.4, sx1 = -0.5, wy0 = y1 - t, wy1 = y1, k;
    K.add("yellow", bb(sx0, sx1, wy0 - 0.1, wy1 + 0.1, zt, zt + 0.08));
    [[wy1 + 0.1, wy1 + 1.5], [wy0 - 0.1, wy0 - 1.5]].forEach(function (f) {
      K.add("yellow", rod([sx0 + 0.05, f[1], APRON], [sx0 + 0.05, f[0], zt], 0.05, 4, true));
      K.add("yellow", rod([sx1 - 0.05, f[1], APRON], [sx1 - 0.05, f[0], zt], 0.05, 4, true));
      for (k = 1; k <= 3; k++) {
        var yy = lerp(f[1], f[0], k / 4), zz = lerp(APRON, zt, k / 4);
        K.add("steel", bb(sx0 + 0.05, sx1 - 0.05, yy - 0.12, yy + 0.12, zz - 0.04, zz + 0.02));
      }
      K.add("yellow", rod([sx1 - 0.03, f[1], APRON + 0.95], [sx1 - 0.03, f[0], zt + 0.95], 0.03, 4, true));
    });
  }
  /* one tank: shell and cone roof in welded plate, a team band under the
     eaves, a caged ladder and a length of roof rail on the north-east
     quarter (the side the camera sees), a breather vent at the crown */
  function tank(K, cx, cy) {
    var R = TANK.R, z0 = APRON, z1 = TANK.z1, uvt = uvTank(cx, cy, R, z0, z1 - z0), k;
    K.add("wall", cylZ(R, R, z1 - z0, 28, cx, cy, z0, true), uvt);
    var cone = new V.ConeGeometry(R + 0.06, TANK.cone, 28, 1, true);
    cone.rotateX(PI / 2); cone.translate(cx, cy, z1 + TANK.cone / 2);
    K.add("wall", cone, uvt);
    K.add("team", cylZ(R + 0.06, R + 0.06, 0.75, 28, cx, cy, z1 - 0.95, true));
    K.add("steel", cylZ(0.16, 0.16, 0.55, 8, cx, cy, z1 + TANK.cone - 0.05));
    K.add("steel", cylZ(0.28, 0.28, 0.08, 8, cx, cy, z1 + TANK.cone + 0.5));
    var a = PI / 4, ca = Math.cos(a), sa = Math.sin(a), tx = -sa, ty = ca;
    var r0 = R + 0.22, lx = cx + ca * r0, ly = cy + sa * r0, hw = 0.23;
    var L = [lx - tx * hw, ly - ty * hw], Rr = [lx + tx * hw, ly + ty * hw];
    K.add("steel", rod([L[0], L[1], z0], [L[0], L[1], z1 + 0.5], 0.035, 4, true));
    K.add("steel", rod([Rr[0], Rr[1], z0], [Rr[0], Rr[1], z1 + 0.5], 0.035, 4, true));
    for (k = 0; k < 8; k++) {
      var zr = z0 + 0.6 + k * 0.72;
      K.add("steel", rod([L[0], L[1], zr], [Rr[0], Rr[1], zr], 0.02, 4, true));
    }
    var ox = ca * 0.7, oy = sa * 0.7;
    var cL = [L[0] + ox, L[1] + oy], cR = [Rr[0] + ox, Rr[1] + oy], cM = [lx + ca * 0.78, ly + sa * 0.78];
    [2.6, 3.9, 5.2, 6.4].forEach(function (zh) {
      K.add("steel", rod([L[0], L[1], zh], [cL[0], cL[1], zh], 0.025, 4, true));
      K.add("steel", rod([cL[0], cL[1], zh], [cR[0], cR[1], zh], 0.025, 4, true));
      K.add("steel", rod([cR[0], cR[1], zh], [Rr[0], Rr[1], zh], 0.025, 4, true));
    });
    [cL, cM, cR].forEach(function (c) { K.add("steel", rod([c[0], c[1], 2.5], [c[0], c[1], z1 + 0.4], 0.025, 4, true)); });
    var rp = [];
    for (k = -1; k <= 1; k++) {
      var ra = a + k * 0.38, rx = cx + Math.cos(ra) * (R - 0.15), ryy = cy + Math.sin(ra) * (R - 0.15);
      var zc = z1 + TANK.cone * 0.15 / (R + 0.06);
      rp.push([rx, ryy, zc]);
      K.add("yellow", rod([rx, ryy, zc - 0.05], [rx, ryy, zc + 1.0], 0.03, 4, true));
    }
    K.add("yellow", rod([rp[0][0], rp[0][1], rp[0][2] + 1.0], [rp[1][0], rp[1][1], rp[1][2] + 1.0], 0.03, 4, true));
    K.add("yellow", rod([rp[1][0], rp[1][1], rp[1][2] + 1.0], [rp[2][0], rp[2][1], rp[2][2] + 1.0], 0.03, 4, true));
  }

  /* ------------------------------------------------ substation and lights
     Power comes in to a switchroom and two transformers north of gallery
     B; three floodlight masts light the pocket, the thickener and the pile,
     their heads below the roofs. */
  function substation(K) {
    K.add("wall", bb(-9.0, -4.5, 13.6, 15.4, APRON, 3.6));
    K.add("roof", bb(-9.15, -4.35, 13.45, 15.55, 3.6, 3.82));
    door(K, "y", 15.4, 1, -6.4, -5.4, APRON);
    K.add("steel", bb(-8.5, -7.5, 15.4, 15.75, 1.6, 2.4));
    [-2.6, 1.8].forEach(function (cx) {
      var cy = 17.5, k;
      K.add("conc", bb(cx - 1.7, cx + 1.7, cy - 1.3, cy + 1.3, 0, APRON + 0.25));
      K.add("steel", bb(cx - 1.15, cx + 1.15, cy - 0.6, cy + 0.6, APRON + 0.25, 2.75));
      K.add("dark", bb(cx - 1.0, cx + 1.0, cy - 1.15, cy - 0.6, 0.85, 2.5));
      K.add("dark", bb(cx - 1.0, cx + 1.0, cy + 0.6, cy + 1.15, 0.85, 2.5));
      K.add("steel", rod([cx - 0.8, cy - 0.35, 3.25], [cx + 0.8, cy - 0.35, 3.25], 0.28, 10));
      K.add("steel", bb(cx + 0.55, cx + 0.7, cy - 0.42, cy - 0.28, 2.75, 3.0));
      for (k = -1; k <= 1; k++) K.add("steel", cylZ(0.11, 0.07, 0.75, 8, cx + k * 0.55, cy + 0.3, 2.75));
    });
  }
  function mast(K, x, y, h, face) {
    var zt = 0.45 + h, fx = Math.cos(face), fy = Math.sin(face);
    K.add("conc", cylZ(0.45, 0.45, 0.45, 8, x, y, 0));
    K.add("steel", cylZ(0.2, 0.11, h, 8, x, y, 0.45));
    K.add("steel", boxR(0.16, 2.2, 0.16, x, y, zt - 0.04, face));
    [-0.8, 0, 0.8].forEach(function (d) {
      K.add("dark", boxR(0.35, 0.56, 0.4, x - fy * d + fx * 0.22, y + fx * d + fy * 0.22, zt - 0.3, face));
    });
  }

  /* =========================================================== ASSEMBLY  */
  function build(THREE, M, C) {
    V = THREE;
    _bs = 0;
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "ore_concentrator";
    var K = new Baker();
    apron(K);
    pocket(K);
    crusherHouse(K);
    dustCollector(K);
    galleryA(K);
    stockpile(K);
    galleryB(K);
    mill(K);
    thickener(K);
    fuelFarm(K);
    substation(K);
    mast(K, 6.9, -9.3, 13.6, -2.2);
    mast(K, 28.4, -18.9, 13.6, 2.4);
    mast(K, -28.6, 18.7, 13.6, -0.6);
    K.flush(g, T);
    return g;
  }

  return { build: build };
})();

/* Replaces the flare-stack refinery in units3d_salvage.js; heroes load
   after it, so the plain assignment wins. icons3d.js builds the same
   model for the sidebar's build icon. */
BLD_MODELS["refinery"] = { build: HeroOreConcentrator.build };
