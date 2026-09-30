/* ===== barracks_block.js - HERO model: a company barracks and its square =====
   BUILDINGS.barracks, "Trains infantry": every faction, every era from 1950
   to 2025, a 2 x 2 plot (40 x 40 m). render3d.js repaints a building to
   its army (restyle) and its decade (eraRestyle), so this draws the one
   thing every army of the period built alike: a two-storey masonry block
   with a flat roof, windows in a steady bay rhythm, covered entrances,
   facing a paved square with a flagpole and a saluting dais, a short
   obstacle course beside it, and a fenced gate with a guard post.

   References, and what each gave:
     - Office of the Quartermaster General, Construction Division, plans
       800-443 and 800-444 (30 July 1941), "Mobilization Buildings: 74 &
       63 Man Barracks, Types BKS-74 & BKS-63" (HABS WIS,41-SPAR.V,1-A-18
       and -19, Fort McCoy; on Wikimedia Commons). The two-storey barracks
       every US post of the 1940s-50s had: 29 ft 6 in (9.0 m) deep, 80 ft
       (24.4 m) long for 63 men and 90 ft (27.4 m) for 74, storeys of 9 ft
       1 in and 8 ft 4 in, 5:12 gable, ladders and a stair hall at the
       ends. The survey this file was briefed from called it "roughly 29 x
       8 m"; the drawings say 24.4 or 27.4 x 9.0 m. It gives the depth and
       the size of a company block; its timber frame and gable are not
       drawn here, because the def runs to 2025 and the renderer's roof kit
       needs a flat roof (see THE PLOT AND THE ENGINE, below).
     - "Old 82nd Division 'Hammerhead' Barracks" and "Fort Bragg
       Hammerhead Barracks" (Fort Bragg, Commons, 1950s blocks): the
       masonry barracks that replaced them. They are three storeys, and
       the perpendicular "head" at the end of each long block is a lower,
       shorter wing, so they are NOT the source of this equal-height L
       (the renderer's roof kit is: below). What they give is the flat
       roof finished with no more than a thin coping at its edge, the
       plant on it, the downpipes down the face and windows in bays
       between the stair halls.
     - "ROKA 102nd Replacement Battalion Parade Ground and Barracks
       Buildings" (Commons): two-storey blocks with regular window bays,
       a projecting entrance canopy on columns, the flagpole in front of
       a bare parade square. Its main block has a low-pitched blue metal
       roof: it gives the square and the entrance, not the roof.
     - "Parade Ground and Barracks Buildings in ROKA 306th Replacement
       Battalion" (Commons): two-storey red-brick blocks with flat roofs
       and a thin edge, and a saluting stand at the edge of the square.
   Nothing here is one army's: no insignia, no lettering, no national
   pattern of window or roof.

   THE PLOT AND THE ENGINE. What the renderer does to a building decided the
   plan as much as the photographs did:
     - archFixture() stands the faction's roof kit (the NATO radome and
       mast, the Pact stack and board, the PLA eave slabs) at the height of
       the model's bounding box, at fixed places on the plot: about
       (+10, +10), (-10, +10) and (-11, -9) metres, and (-8, -12) for the
       Pact board. eraFixture() puts the period kit (chimney, lattice mast,
       dish, array) at the top of the tallest broad mesh, at about the same
       places. So the ROOF COPING IS THE HIGHEST THING IN THE MODEL, 7.70 m,
       and the flagpole, lamps and everything else stay under it: a 12 m
       pole would lift every fixture 4 m clear of the roof. The deck is
       only 0.10 m under the coping, a kerb and not a parapet, as on the
       Fort Bragg and 306th blocks: with a 0.45 m parapet every kit stood
       on air 0.45 m over the deck. The same rule keeps the hatches, the
       rooflights and the vents on the roof to 0.10 m or less, and leaves
       out the plant room a real roof might carry.
     - The block is an L, a north wing and a west wing, so the roof sites
       are roof: the old model's two huts left the Pact stack and the NATO
       mast standing in the air over the parade ground. The north wing is
       12.8 m deep so its roof takes the whole NATO radome (5.2 m round
       (10.4, 10.4)) and the Pact stack (4.4 m round (11.2, 9.6)). What no
       plan short of a full plot can carry: the east third of the Pact
       board past the west wing, the e80 netting's two south poles and the
       PLA eave slabs, all sized to the plot, not to a building.
     - Infantry come out on the tile just south of the plot, the one east
       of its middle (game.js spawnUnit: column tx + 1, row ty + 2), whose
       centre is model (+10, -30). The gate is on the south fence at x +10,
       and the square is the open south-east quarter behind it.
     - The default camera sits north-east (render3d cam.yaw -PI/4), so the
       north face and the east end are the faces a player sees first; they
       carry the rear doors, canopies and downpipes, not a blank back wall.
     - restyle() recolours a building by the LIGHTNESS of each material
       after prepModel linearises it: over 0.55 is the army's wall colour,
       0.33 to 0.55 its second wall colour, 0.12 to 0.33 its roof colour.
       WALL, TRIM and ROOF are authored grey in those three bands, so the
       render takes the army's colour and the trim its second; eraRestyle
       then warms them to brick in e50 and greys them to concrete in e60.
       Their canvases are near white and carry only relative detail. Paint
       that must keep its colour (the square, the windows, the timber, the
       team) is either white-tinted or saturated, which restyle leaves
       alone.
     - damage3d.js ray-casts the roof for its fires and wants a broad roof
       over 3 m: the deck is at 7.60 m and one level all over.

   DIMENSIONS (model metres, +X east, +Y north, +Z up; plot centre at 0,0):
     pad             38 x 38 m, 0.10 m thick
     north wing      36.0 x 12.8 m, x -18.4..17.6, y 5.0..17.8
     west wing       11.6 x 18.0 m more, x -18.4..-6.8, y -13.0..5.0
                     (plan 800-443's 9.0 m is one open bay; 11.6 m takes
                     rooms either side of a central corridor)
     floors          ground floor 0.62 m up (a plinth and four risers),
                     3.30 m storeys, roof deck 7.60 m inside a 0.35 m
                     coping, its top 7.70 m
     windows         1.5 x 1.5 m on 3.0 m bays, sills 0.9 m over each floor,
                     set 0.16 m into the wall with a projecting sill
     stair halls     one in each wing, a double door under a 3.6 x 2.0 m
                     canopy on the square and a tall landing window over it
     flagpole        7.7 m to the ball, level with the coping and no more
                     (see above), a 1.5 x 2.6 m flag. The ROKA photographs
                     show poles well over the roof: a liberty the renderer
                     forces, like the low roof edge.
     obstacle course two lanes, 17 m: low crawl under wire, zigzag balance
                     log, horizontal ladder at 2.2 m, a 2.0 m wall, a pair
                     of 0.9 m hurdles
     gate            7.0 m clear between the pillars, a boom barrier with a
                     6.5 m arm, a 2.4 m guard booth inside it
     yard            two car bays, 2.55 m on centres and 4.8 m deep, the
                     refuse skip on the paving beside them

   Draw calls: two of these stand in a mid-game base and every mesh casts a
   shadow too, so everything is baked into ONE mesh per material, eight in
   all: WALL, TRIM, ROOF, GROUND, OPEN (windows, doors, rooflights, the
   booth's glazing, lamp lenses: one atlas; the barrier
   arm on a white swatch of it), METAL, WOOD and TEAM. Nothing on a
   barracks moves, so no node is named for the renderer. Every face is
   wound to face out (tri() orients to a stated normal), and the flag is
   two single-sided sheets back to back, 12 mm apart.

   Colours are authored in sRGB and left to prepModel() to linearise, as
   the rest of the building packs do; no material sets _srgbDone.
   ASCII only: a stray byte inside a hex literal has broken this before.  */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroBarracksBlock = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------- datums */
  var PAD = 19.0, PAD_Z = 0.10;
  var FL0 = 0.62, STY = 3.30;
  var FL1 = FL0 + STY;                    /* 3.92: first floor             */
  /* the deck a kerb's height under the coping, so the renderer's roof kit,
     which stands at the coping, stands on the roof (THE PLOT AND THE
     ENGINE); PARA is the top of the wall under the coping              */
  var DECK = 7.60, PARA = 7.62, COPE = 7.70;
  var PT = 0.25;                          /* the coping's reach inboard    */
  /* the building outline, counter-clockwise from above: the south end of
     the west wing, up its east face, along the north wing's south face,
     the east end, back along the north face and down the west face */
  var OUT = [[-18.4, -13.0], [-6.8, -13.0], [-6.8, 5.0], [17.6, 5.0], [17.6, 17.8], [-18.4, 17.8]];
  var WIN_W = 1.5, WIN_H = 1.5, SILL0 = FL0 + 0.9, SILL1 = FL1 + 0.9, REV = 0.16;
  /* the bays of each face, by the model x or y of each window's centre.
     The north wing's grid runs 3.0 m from its east end, the west wing's
     3.0 m from its south end, so both faces of a wing line up.          */
  var FACES = [
    { bays: [-16.5, -12.6, -8.7] },
    /* no window within a bay of the inside corner, where the rooms of
       the two wings meet                                                */
    { bays: [-11.5, -8.5, -5.5, -2.5, 0.5], door: -2.5, dw: 1.8, canopy: 1 },
    { bays: [-4.9, -1.9, 1.1, 4.1, 7.1, 10.1, 13.1, 16.1], door: 7.1, dw: 1.8, canopy: 1 },
    { bays: [7.5, 11.4, 15.3] },
    { bays: [16.1, 13.1, 10.1, 7.1, 4.1, 1.1, -1.9, -4.9, -7.9, -10.9, -13.9, -16.9], door: 7.1, dw: 1.2, canopy: 2 },
    /* the west face is the plot edge, 0.6 m from the pad's end: its stair
       bay has a landing window but no door                              */
    { bays: [15.5, 12.5, 9.5, 6.5, 3.5, 0.5, -2.5, -5.5, -8.5, -11.5], stair: -2.5 }
  ];
  /* the square */
  var DRILL = [-5.6, 11.4, -13.6, 1.2];          /* x0 x1 y0 y1, asphalt   */
  var LANE = [12.2, 18.3, -13.4, 3.6];           /* the obstacle course    */
  var LX = [13.8, 16.7];                         /* its two lanes          */
  var GATE0 = 6.0, GATE1 = 13.6, FENCE_Y = -18.55, FENCE_X = 18.55;
  var POLE = [2.1, 2.9];

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ============================================================ canvases
     Built once per page and shared by every team's copy. WALL, TRIM and
     ROOF are near white: restyle() puts the army's colour into the
     material and the canvas multiplies it with render, weather and seams. */
  var _cv = {};
  function mk(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* rendered masonry, 8 m to the canvas across and up: v is height, so the
     bottom of the canvas is the foot of every wall, where the splash and
     the dirt are                                                          */
  function wallCanvas() {
    if (_cv.wall) return _cv.wall;
    var W = 512, H = 512, cv = mk(W, H), q = cv.getContext("2d"), R = rng(7301), i, x, y, g;
    q.fillStyle = "#f2efe8"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 70; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.10)" : "rgba(60,54,44,0.05)";
      q.fillRect(R() * W, R() * H, 30 + R() * 140, 20 + R() * 90);
    }
    q.fillStyle = "rgba(40,36,30,0.10)";
    for (i = 0; i < 2600; i++) q.fillRect(R() * W, R() * H, 1.5, 1.5);
    /* rain run off the parapet and down from each sill: streaks 0.5-2 m */
    for (i = 0; i < 46; i++) {
      x = R() * W; y = R() * H * 0.62; var len = 30 + R() * 110;
      g = q.createLinearGradient(0, y, 0, y + len);
      g.addColorStop(0, "rgba(70,64,54,0.16)"); g.addColorStop(1, "rgba(70,64,54,0)");
      q.fillStyle = g; q.fillRect(x, y, 2 + R() * 5, len);
    }
    /* the foot of the wall: splash and dirt over the lowest metre */
    g = q.createLinearGradient(0, H - 64, 0, H);
    g.addColorStop(0, "rgba(84,74,58,0)"); g.addColorStop(1, "rgba(84,74,58,0.34)");
    q.fillStyle = g; q.fillRect(0, H - 64, W, 64);
    for (i = 0; i < 90; i++) {
      q.fillStyle = "rgba(70,60,46," + (0.08 + R() * 0.12).toFixed(3) + ")";
      q.fillRect(R() * W, H - R() * 40, 2 + R() * 6, 1 + R() * 3);
    }
    _cv.wall = cv;
    return cv;
  }

  /* cast concrete for the trim, 4 m to the canvas: board marks and pores */
  function trimCanvas() {
    if (_cv.trim) return _cv.trim;
    var W = 256, cv = mk(W, W), q = cv.getContext("2d"), R = rng(5512), i;
    q.fillStyle = "#f0ede6"; q.fillRect(0, 0, W, W);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.12)" : "rgba(50,46,40,0.06)";
      q.fillRect(R() * W, R() * W, 20 + R() * 80, 10 + R() * 50);
    }
    q.fillStyle = "rgba(40,36,30,0.16)";
    for (i = 0; i < 900; i++) q.fillRect(R() * W, R() * W, 1.2, 1.2);
    q.fillStyle = "rgba(40,36,30,0.10)";
    for (i = 1; i < 8; i++) q.fillRect(0, i * 32, W, 1);
    _cv.trim = cv;
    return cv;
  }

  /* the flat roof: torch-on bitumen felt in 1 m strips with lapped seams,
     patched, ponding stains where the deck has settled. 16 m to the
     canvas.                                                               */
  function roofCanvas() {
    if (_cv.roof) return _cv.roof;
    var W = 512, cv = mk(W, W), q = cv.getContext("2d"), R = rng(4471), i, x;
    q.fillStyle = "#eeeeec"; q.fillRect(0, 0, W, W);
    for (i = 0; i < 16; i++) {
      q.fillStyle = "rgba(" + (R() < 0.5 ? "255,255,255,0.10" : "40,40,38,0.06") + ")";
      q.fillRect(0, i * 32, W, 32);
      q.fillStyle = "rgba(20,20,18,0.22)"; q.fillRect(0, i * 32, W, 1.5);
      q.fillStyle = "rgba(255,255,255,0.18)"; q.fillRect(0, i * 32 + 2, W, 1);
      for (x = (i % 2) * 90; x < W; x += 180) { q.fillStyle = "rgba(20,20,18,0.14)"; q.fillRect(x, i * 32, 1.5, 32); }
    }
    for (i = 0; i < 12; i++) {
      q.fillStyle = "rgba(30,30,28,0.10)";
      q.fillRect(R() * W, R() * W, 30 + R() * 60, 20 + R() * 40);
    }
    for (i = 0; i < 9; i++) {
      var cx = R() * W, cy = R() * W, r = 20 + R() * 40;
      var g = q.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, "rgba(40,40,36,0.20)"); g.addColorStop(1, "rgba(40,40,36,0)");
      q.fillStyle = g; q.beginPath(); q.arc(cx, cy, r, 0, PI * 2); q.fill();
    }
    q.fillStyle = "rgba(30,30,28,0.14)";
    for (i = 0; i < 2200; i++) q.fillRect(R() * W, R() * W, 1.5, 1.5);
    _cv.roof = cv;
    return cv;
  }

  /* The ground's weathering, 6 m to the canvas and repeated: near white,
     so the colours of the square (below, as vertex colours on its own
     tiles) come through, with stains, patching and grit over them.      */
  function groundCanvas() {
    if (_cv.ground) return _cv.ground;
    var W = 512, cv = mk(W, W), q = cv.getContext("2d"), R = rng(9127), i;
    q.fillStyle = "#f2f1ee"; q.fillRect(0, 0, W, W);
    for (i = 0; i < 90; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.10)" : "rgba(50,46,40,0.06)";
      q.fillRect(R() * W, R() * W, 20 + R() * 120, 20 + R() * 120);
    }
    for (i = 0; i < 14; i++) {
      var cx = R() * W, cy = R() * W, r = 10 + R() * 34;
      var g = q.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, "rgba(30,28,24,0.22)"); g.addColorStop(1, "rgba(30,28,24,0)");
      q.fillStyle = g; q.beginPath(); q.arc(cx, cy, r, 0, PI * 2); q.fill();
    }
    q.fillStyle = "rgba(30,28,24,0.12)";
    for (i = 0; i < 4000; i++) q.fillRect(R() * W, R() * W, 1.5, 1.5);
    q.strokeStyle = "rgba(30,28,24,0.16)"; q.lineWidth = 1.2;
    for (i = 0; i < 10; i++) {
      var x = R() * W, y = R() * W;
      q.beginPath(); q.moveTo(x, y);
      for (var k = 0; k < 5; k++) { x += (R() - 0.5) * 40; y += (R() - 0.5) * 40; q.lineTo(x, y); }
      q.stroke();
    }
    _cv.ground = cv;
    return cv;
  }

  /* The openings atlas: windows, doors, the stair window, the guard booth's
     glazing, the barrier's stripes and a lamp lens. Absolute colours;
     the material is white. Regions are [u0, u1, v0, v1] and each is drawn
     with a margin so the mip levels do not bleed one into another.      */
  var R_WIN = [0, 0.5, 0.5, 1], R_DOOR = [0.5, 0.75, 0.5, 1], R_STAIR = [0.75, 1, 0.5, 1];
  var R_BOOTH = [0, 0.5, 0.25, 0.5], R_RDOOR = [0.5, 0.75, 0.25, 0.5], R_STRIPE = [0.75, 1, 0.25, 0.5];
  var R_LAMP = [0, 0.25, 0, 0.25], R_BDOOR = [0.25, 0.5, 0, 0.25];
  var AW = 512;
  function openCanvas() {
    if (_cv.open) return _cv.open;
    var cv = mk(AW, AW), q = cv.getContext("2d"), i;
    q.fillStyle = "#6d7070"; q.fillRect(0, 0, AW, AW);
    function reg(r) { return { x: r[0] * AW, y: (1 - r[3]) * AW, w: (r[1] - r[0]) * AW, h: (r[3] - r[2]) * AW }; }
    function pane(x, y, w, h) {
      var g = q.createLinearGradient(x, y, x + w, y + h);
      g.addColorStop(0, "#56656d"); g.addColorStop(0.45, "#2c3840"); g.addColorStop(1, "#1d262c");
      q.fillStyle = g; q.fillRect(x, y, w, h);
      q.fillStyle = "rgba(220,235,240,0.10)";
      q.beginPath(); q.moveTo(x + w * 0.15, y + h); q.lineTo(x + w * 0.55, y); q.lineTo(x + w * 0.75, y); q.lineTo(x + w * 0.35, y + h); q.fill();
    }
    var FR = "#dcdfdc";
    /* window: a white frame, a mullion, a transom a third of the way down,
       four panes                                                          */
    var r = reg(R_WIN), f = r.w * 0.06;
    q.fillStyle = FR; q.fillRect(r.x, r.y, r.w, r.h);
    var tw = r.h * 0.30;
    pane(r.x + f, r.y + f, (r.w - 3 * f) / 2, tw - f);
    pane(r.x + 2 * f + (r.w - 3 * f) / 2, r.y + f, (r.w - 3 * f) / 2, tw - f);
    pane(r.x + f, r.y + tw + f, (r.w - 3 * f) / 2, r.h - tw - 2 * f);
    pane(r.x + 2 * f + (r.w - 3 * f) / 2, r.y + tw + f, (r.w - 3 * f) / 2, r.h - tw - 2 * f);
    /* double door: a transom light over two leaves, glazed above the lock
       rail, dark kick panels                                              */
    function door(rr, leaves, fanlight) {
      var R2 = reg(rr), e = R2.w * 0.07, top = fanlight ? R2.h * 0.18 : 0;
      q.fillStyle = "#4a4f4f"; q.fillRect(R2.x, R2.y, R2.w, R2.h);
      if (fanlight) pane(R2.x + e, R2.y + e, R2.w - 2 * e, top - e);
      var lw = (R2.w - e * (leaves + 1)) / leaves;
      for (var k = 0; k < leaves; k++) {
        var lx = R2.x + e + k * (lw + e), ly = R2.y + top + e, lh = R2.h - top - e;
        q.fillStyle = "#6a5a44"; q.fillRect(lx, ly, lw, lh);
        pane(lx + lw * 0.14, ly + lh * 0.08, lw * 0.72, lh * 0.42);
        q.fillStyle = "#3a3024"; q.fillRect(lx + lw * 0.14, ly + lh * 0.62, lw * 0.72, lh * 0.30);
        q.fillStyle = "#c8c8c0"; q.fillRect(lx + (k ? lw * 0.08 : lw * 0.86), ly + lh * 0.55, lw * 0.06, lh * 0.03);
      }
    }
    door(R_DOOR, 2, true);
    door(R_RDOOR, 1, true);
    door(R_BDOOR, 1, false);
    /* the stair hall's tall landing window: frame, three transoms */
    r = reg(R_STAIR); f = r.w * 0.08;
    q.fillStyle = FR; q.fillRect(r.x, r.y, r.w, r.h);
    for (i = 0; i < 4; i++) pane(r.x + f, r.y + f + i * (r.h - f) / 4, r.w - 2 * f, (r.h - f) / 4 - f);
    /* the guard booth: glass nearly all round, three panes a face */
    r = reg(R_BOOTH); f = r.h * 0.07;
    q.fillStyle = FR; q.fillRect(r.x, r.y, r.w, r.h);
    for (i = 0; i < 3; i++) pane(r.x + f + i * (r.w - f) / 3, r.y + f, (r.w - f) / 3 - f, r.h - 2 * f);
    /* a plain white swatch: the barrier arm's paint, coloured red and
       white by its vertex colours, band by band                           */
    r = reg(R_STRIPE);
    q.fillStyle = "#f2f2ee"; q.fillRect(r.x, r.y, r.w, r.h);
    /* lamp lens */
    r = reg(R_LAMP);
    var lg = q.createRadialGradient(r.x + r.w / 2, r.y + r.h / 2, 2, r.x + r.w / 2, r.y + r.h / 2, r.w / 2);
    lg.addColorStop(0, "#fffbe8"); lg.addColorStop(1, "#d8d2b8");
    q.fillStyle = lg; q.fillRect(r.x, r.y, r.w, r.h);
    _cv.open = cv;
    return cv;
  }
  /* a point inside a region, from (a, b) in 0..1 across and up it, pulled
     in by a margin so a sample never reaches the neighbour              */
  function ruv(r, a, b) {
    var m = 2 / AW;
    return [r[0] + m + (r[1] - r[0] - 2 * m) * a, r[2] + m + (r[3] - r[2] - 2 * m) * b];
  }

  function tex(THREE, cv, clamp) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
      /* r148: encoding is the switch that works; colorSpace does nothing */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* ========================================================== materials
     Eight. WALL, TRIM and ROOF are the restyled three: their colours sit
     in restyle()'s wall, second-wall and roof bands once linearised (0.64,
     0.41 and 0.25). GROUND and OPEN are white under their own paint and
     vertex colours; METAL
     is dark enough (0.05) that neither restyle nor eraRestyle touches it,
     WOOD saturated enough (0.64); TEAM is exactly the owner's colour.   */
  function makeMats(THREE, C) {
    var T = {};
    function std(col, rough, metal, cv, clamp) {
      var m = new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: metal });
      if (cv) { var t = tex(THREE, cv, clamp); if (t) m.map = t; }
      return m;
    }
    T.wall = std(0xd8d4cc, 0.92, 0.02, wallCanvas());
    T.trim = std(0xb2aea6, 0.90, 0.02, trimCanvas());
    T.roof = std(0x8c8a86, 0.95, 0.02, roofCanvas());
    T.ground = std(0xffffff, 0.95, 0.0, groundCanvas());
    T.open = std(0xffffff, 0.30, 0.20, openCanvas(), true);
    T.metal = std(0x3d4145, 0.50, 0.55);
    T.wood = std(0x7b5d3c, 0.90, 0.0);
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    T.team = new THREE.MeshStandardMaterial({ color: new THREE.Color(tc), roughness: 0.60, metalness: 0.10,
                                              emissive: new THREE.Color(tc), emissiveIntensity: 0.08 });
    return T;
  }

  /* ============================================================ batches
     One per material. tri() winds each triangle to face along the normal
     it is given, so nothing can come out inside out. UVs come three ways:
     "world" box projection in metres / S (the restyled masonry), "plan"
     in metres / S (the roof and the ground's weathering), and "given"
     (the atlas). GROUND and OPEN also carry a colour per vertex.        */
  function Batch(mode, S) {
    this.p = []; this.n = []; this.u = []; this.c = []; this.mode = mode; this.S = S || 1;
    this.col = null; this.vc = false;
  }
  Batch.prototype.tri = function (a, b, c, nh, ua, ub, uc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-10) return;
    nx /= l; ny /= l; nz /= l;
    if (nx * nh[0] + ny * nh[1] + nz * nh[2] < 0) {
      var t = b; b = c; c = t; t = ub; ub = uc; uc = t; nx = -nx; ny = -ny; nz = -nz;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    if (ua) this.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    else this.u.push(0, 0, 0, 0, 0, 0);
    var q = this.col || WHITE;
    this.c.push(q[0], q[1], q[2], q[0], q[1], q[2], q[0], q[1], q[2]);
  };
  Batch.prototype.quad = function (a, b, c, d, nh, uv) {
    if (uv) { this.tri(a, b, c, nh, uv[0], uv[1], uv[2]); this.tri(a, c, d, nh, uv[0], uv[2], uv[3]); }
    else { this.tri(a, b, c, nh); this.tri(a, c, d, nh); }
  };
  /* a three.js geometry already placed in model space: its own winding */
  Batch.prototype.geo = function (g) {
    var q = g.index ? g.toNonIndexed() : g;
    if (!q.attributes.normal) q.computeVertexNormals();
    var P = q.attributes.position.array, N = q.attributes.normal.array, U = q.attributes.uv ? q.attributes.uv.array : null;
    for (var i = 0; i < P.length; i++) { this.p.push(P[i]); this.n.push(N[i]); }
    var q2 = this.col || WHITE;
    for (i = 0; i < P.length / 3; i++) {
      if (U) this.u.push(U[i * 2], U[i * 2 + 1]); else this.u.push(0, 0);
      this.c.push(q2[0], q2[1], q2[2]);
    }
  };
  Batch.prototype.mesh = function (THREE, mat) {
    if (!this.p.length) return null;
    var P = this.p, U = this.u, S = this.S, t, k;
    if (this.mode === "world" || this.mode === "plan") {
      for (t = 0; t < P.length / 9; t++) {
        var o = t * 9;
        var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
        var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
        var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
        for (k = 0; k < 3; k++) {
          var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], uu, vv;
          if (this.mode === "plan" || (nz >= nx && nz >= ny)) { uu = x / S; vv = y / S; }
          else if (nx >= ny) { uu = y / S; vv = z / S; }
          else { uu = x / S; vv = z / S; }
          U[t * 6 + k * 2] = uu; U[t * 6 + k * 2 + 1] = vv;
        }
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
    if (this.vc) { g.setAttribute("color", new THREE.Float32BufferAttribute(this.c, 3)); mat.vertexColors = true; }
    g.computeBoundingSphere();
    var m = new THREE.Mesh(g, mat);
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* ============================================================= kit */
  var K = null, V = null;           /* the batches and THREE, per build */
  var WHITE = [1, 1, 1];
  /* a vertex colour: authored as sRGB hex like everything else, stored
     linear, because three reads a colour attribute as it stands and
     prepModel() converts only material colours                          */
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var UP = [0, 0, 1], DN = [0, 0, -1];

  /* an axis-aligned box. faces: which of "xXyYzZ" to draw (-x, +x, ...);
     top (and each other face) may go to another batch                   */
  function box(B, x0, x1, y0, y1, z0, z1, faces, top) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    var f = faces || "xXyYZ";
    if (f.indexOf("x") >= 0) B.quad([x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1], [-1, 0, 0]);
    if (f.indexOf("X") >= 0) B.quad([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [1, 0, 0]);
    if (f.indexOf("y") >= 0) B.quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0]);
    if (f.indexOf("Y") >= 0) B.quad([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], [0, 1, 0]);
    if (f.indexOf("Z") >= 0) (top || B).quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], UP);
    if (f.indexOf("z") >= 0) B.quad([x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], DN);
  }
  /* a box turned about its own centre (three.js order XYZ) */
  function obox(B, cx, cy, cz, sx, sy, sz, rx, ry, rz) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    g.translate(cx, cy, cz);
    B.geo(g);
  }
  /* a round bar from a to b */
  var _y = null;
  function bar(B, a, b, r, seg, open) {
    if (!_y) _y = new V.Vector3(0, 1, 0);
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !!open);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(_y, new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    B.geo(g);
  }
  function post(B, x, y, z0, z1, r, seg) { bar(B, [x, y, z0], [x, y, z1], r, seg || 6, false); }

  /* the outline offset outward by d (inward for d < 0), mitred */
  function offset(pts, d) {
    var n = pts.length, out = [];
    for (var i = 0; i < n; i++) {
      var a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n];
      var e1 = [b[0] - a[0], b[1] - a[1]], e2 = [c[0] - b[0], c[1] - b[1]];
      var l1 = Math.sqrt(e1[0] * e1[0] + e1[1] * e1[1]), l2 = Math.sqrt(e2[0] * e2[0] + e2[1] * e2[1]);
      var n1 = [e1[1] / l1, -e1[0] / l1], n2 = [e2[1] / l2, -e2[0] / l2];
      var k = 1 + n1[0] * n2[0] + n1[1] * n2[1];
      out.push([b[0] + d * (n1[0] + n2[0]) / k, b[1] + d * (n1[1] + n2[1]) / k]);
    }
    return out;
  }
  function enorm(pts, i) {
    var a = pts[i], b = pts[(i + 1) % pts.length], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy);
    return [dy / l, -dx / l, 0];
  }
  /* A band round the outline, d proud of it, zb..zt: its faces, its top
     ledge and (if it is off the ground) its underside                  */
  function band(pts, d, zb, zt, B, Btop, under) {
    var o = offset(pts, d), n = pts.length;
    for (var i = 0; i < n; i++) {
      var j = (i + 1) % n, nn = enorm(pts, i);
      B.quad([o[i][0], o[i][1], zb], [o[j][0], o[j][1], zb], [o[j][0], o[j][1], zt], [o[i][0], o[i][1], zt], nn);
      if (Btop) Btop.quad([pts[i][0], pts[i][1], zt], [pts[j][0], pts[j][1], zt], [o[j][0], o[j][1], zt], [o[i][0], o[i][1], zt], UP);
      if (under) B.quad([pts[i][0], pts[i][1], zb], [pts[j][0], pts[j][1], zb], [o[j][0], o[j][1], zb], [o[i][0], o[i][1], zb], DN);
    }
  }
  /* a flat polygon (any simple outline) at height z, facing nh */
  function flat(B, pts, z, nh) {
    var c = pts.map(function (p) { return new V.Vector2(p[0], p[1]); });
    var tris = V.ShapeUtils.triangulateShape(c, []);
    for (var i = 0; i < tris.length; i++) {
      var f = tris[i];
      B.tri([pts[f[0]][0], pts[f[0]][1], z], [pts[f[1]][0], pts[f[1]][1], z], [pts[f[2]][0], pts[f[2]][1], z], nh);
    }
  }

  /* ============================================================ facades
     One wall plane from A to B with its openings cut out of it (three's
     earcut), each opening lined with reveals REV deep and closed by an
     atlas pane at the back. Openings are { s0, s1, zb, zt, r (region),
     d (depth), sill }. s runs from A along the wall; the outward normal
     is on the right of A->B, which for a counter-clockwise outline is
     outside.                                                              */
  function facade(A, Bp, z0, z1, holes) {
    var dx = Bp[0] - A[0], dy = Bp[1] - A[1], L = Math.sqrt(dx * dx + dy * dy);
    var d = [dx / L, dy / L], n = [d[1], -d[0], 0];
    function P(s, z, o) { return [A[0] + d[0] * s + n[0] * o, A[1] + d[1] * s + n[1] * o, z]; }
    var cont = [new V.Vector2(0, z0), new V.Vector2(L, z0), new V.Vector2(L, z1), new V.Vector2(0, z1)];
    var hs = holes.map(function (h) {
      return [new V.Vector2(h.s0, h.zb), new V.Vector2(h.s1, h.zb), new V.Vector2(h.s1, h.zt), new V.Vector2(h.s0, h.zt)];
    });
    var all = cont.slice();
    hs.forEach(function (h) { all = all.concat(h); });
    var tris = V.ShapeUtils.triangulateShape(cont, hs);
    for (var i = 0; i < tris.length; i++) {
      var f = tris[i];
      K.wall.tri(P(all[f[0]].x, all[f[0]].y, 0), P(all[f[1]].x, all[f[1]].y, 0), P(all[f[2]].x, all[f[2]].y, 0), n);
    }
    holes.forEach(function (h) {
      var r = h.d || REV, s0 = h.s0, s1 = h.s1, zb = h.zb, zt = h.zt;
      var dn = [d[0], d[1], 0], dm = [-d[0], -d[1], 0];
      K.wall.quad(P(s0, zb, 0), P(s0, zt, 0), P(s0, zt, -r), P(s0, zb, -r), dn);
      K.wall.quad(P(s1, zb, 0), P(s1, zt, 0), P(s1, zt, -r), P(s1, zb, -r), dm);
      K.wall.quad(P(s0, zt, 0), P(s1, zt, 0), P(s1, zt, -r), P(s0, zt, -r), DN);
      (h.sill ? K.trim : K.wall).quad(P(s0, zb, 0), P(s1, zb, 0), P(s1, zb, -r), P(s0, zb, -r), UP);
      /* the pane, its atlas region read left to right from outside */
      K.open.quad(P(s0, zb, -r), P(s1, zb, -r), P(s1, zt, -r), P(s0, zt, -r), n,
                  [ruv(h.r, 0, 0), ruv(h.r, 1, 0), ruv(h.r, 1, 1), ruv(h.r, 0, 1)]);
      if (h.sill) {
        /* the precast sill: 70 mm out, 60 mm past each jamb, drip under */
        var a = s0 - 0.06, b = s1 + 0.06, o = 0.07, zs = zb - 0.07;
        K.trim.quad(P(a, zb, 0), P(b, zb, 0), P(b, zb, o), P(a, zb, o), UP);
        K.trim.quad(P(a, zs, o), P(b, zs, o), P(b, zb, o), P(a, zb, o), n);
        K.trim.quad(P(a, zs, 0), P(b, zs, 0), P(b, zs, o), P(a, zs, o), DN);
        K.trim.quad(P(a, zs, 0), P(a, zb, 0), P(a, zb, o), P(a, zs, o), dm);
        K.trim.quad(P(b, zs, 0), P(b, zb, 0), P(b, zb, o), P(b, zs, o), dn);
      }
    });
    return { P: P, n: n, d: d, L: L };
  }

  /* ======================================================== the block */
  function buildBlock() {
    var i;
    for (i = 0; i < OUT.length; i++) {
      var A = OUT[i], Bp = OUT[(i + 1) % OUT.length], F = FACES[i];
      var alongX = Math.abs(Bp[0] - A[0]) > Math.abs(Bp[1] - A[1]);
      var a0 = alongX ? A[0] : A[1], sgn = (alongX ? Bp[0] - A[0] : Bp[1] - A[1]) > 0 ? 1 : -1;
      var holes = [];
      F.bays.forEach(function (c) {
        var s = (c - a0) * sgn;
        if (F.door === c) {
          var hw = F.dw / 2;
          holes.push({ s0: s - hw, s1: s + hw, zb: FL0, zt: FL0 + 2.4, r: F.dw > 1.5 ? R_DOOR : R_RDOOR, d: 0.24 });
          holes.push({ s0: s - 0.6, s1: s + 0.6, zb: 4.45, zt: 6.55, r: R_STAIR, sill: true });
        } else if (F.stair === c) {
          holes.push({ s0: s - 0.6, s1: s + 0.6, zb: 1.9, zt: 3.0, r: R_WIN, sill: true });
          holes.push({ s0: s - 0.6, s1: s + 0.6, zb: 4.45, zt: 6.55, r: R_STAIR, sill: true });
        } else {
          holes.push({ s0: s - WIN_W / 2, s1: s + WIN_W / 2, zb: SILL0, zt: SILL0 + WIN_H, r: R_WIN, sill: true });
          holes.push({ s0: s - WIN_W / 2, s1: s + WIN_W / 2, zb: SILL1, zt: SILL1 + WIN_H, r: R_WIN, sill: true });
        }
      });
      var fc = facade(A, Bp, PAD_Z, PARA, holes);
      if (F.door !== undefined) entrance(fc, (F.door - a0) * sgn, F.dw, F.canopy);
    }
    /* plinth to the ground-floor level, 50 mm proud, and the band of the
       first-floor slab edge, 60 mm proud: both mitred round every corner */
    band(OUT, 0.05, PAD_Z, FL0, K.trim, K.trim, false);
    band(OUT, 0.06, FL1 - 0.12, FL1 + 0.10, K.trim, K.trim, true);
    /* the coping, a precast kerb 0.35 m wide lapping 50 mm over the
       wall, its top in the team colour, a line round the whole roof from
       above, and the roof deck inside it 0.10 m down                     */
    var cin = offset(OUT, -PT - 0.05), cout = offset(OUT, 0.05);
    for (i = 0; i < OUT.length; i++) {
      var j = (i + 1) % OUT.length, nn = enorm(OUT, i), ni = [-nn[0], -nn[1], 0];
      K.team.quad([cout[i][0], cout[i][1], COPE], [cout[j][0], cout[j][1], COPE], [cin[j][0], cin[j][1], COPE], [cin[i][0], cin[i][1], COPE], UP);
      K.trim.quad([cout[i][0], cout[i][1], PARA], [cout[j][0], cout[j][1], PARA], [cout[j][0], cout[j][1], COPE], [cout[i][0], cout[i][1], COPE], nn);
      K.trim.quad([cin[i][0], cin[i][1], DECK], [cin[j][0], cin[j][1], DECK], [cin[j][0], cin[j][1], COPE], [cin[i][0], cin[i][1], COPE], ni);
      K.trim.quad([OUT[i][0], OUT[i][1], PARA], [OUT[j][0], OUT[j][1], PARA], [cout[j][0], cout[j][1], PARA], [cout[i][0], cout[i][1], PARA], DN);
    }
    flat(K.roof, cin, DECK, UP);
    /* on the roof, nothing over the coping (THE PLOT AND THE ENGINE): two
       access hatches on 80 mm kerbs                                       */
    box(K.trim, 1.9, 3.1, 11.4, 12.6, DECK, DECK + 0.08);
    box(K.trim, -13.2, -12.0, 1.4, 2.6, DECK, DECK + 0.08);
    /* a rooflight over each stair hall: a low kerb and a shallow glazed hip */
    [[7.1, 12.0], [-12.6, -2.5]].forEach(function (c) {
      box(K.trim, c[0] - 0.9, c[0] + 0.9, c[1] - 0.9, c[1] + 0.9, DECK, DECK + 0.04);
      var z0 = DECK + 0.04, z1 = COPE - 0.01, h = 0.25, e = 0.8;
      var q = [[c[0] - e, c[1] - e, z0], [c[0] + e, c[1] - e, z0], [c[0] + e, c[1] + e, z0], [c[0] - e, c[1] + e, z0]];
      var r0 = [c[0] - h, c[1], z1], r1 = [c[0] + h, c[1], z1];
      var gw = [ruv(R_STAIR, 0, 0), ruv(R_STAIR, 1, 0), ruv(R_STAIR, 1, 0.5), ruv(R_STAIR, 0, 0.5)];
      K.open.quad(q[0], q[1], r1, r0, [0, -1, 1], gw);
      K.open.quad(q[2], q[3], r0, r1, [0, 1, 1], gw);
      K.open.tri(q[1], q[2], r1, [1, 0, 1], gw[0], gw[1], gw[2]);
      K.open.tri(q[3], q[0], r0, [-1, 0, 1], gw[0], gw[1], gw[2]);
    });
    /* the ablutions' extract fan, a low steel cowl where a taller roof
       would carry a plant room, and the soil and vent pipes under
       mushroom caps                                                       */
    box(K.metal, -3.6, -2.4, 14.1, 15.3, DECK, DECK + 0.09, "xXyYZ");
    [[-14.0, 12.0], [-8.0, 12.0], [8.6, 14.2], [14.0, 12.0], [-12.6, -9.0], [-12.6, 3.0]].forEach(function (v) {
      post(K.metal, v[0], v[1], DECK, DECK + 0.05, 0.08, 6);
      box(K.metal, v[0] - 0.12, v[0] + 0.12, v[1] - 0.12, v[1] + 0.12, DECK + 0.05, DECK + 0.09);
    });
    /* downpipes from rainwater heads under the coping, at the outside
       corners and along the long faces                                    */
    [[-18.52, -12.88], [-6.68, -12.88], [17.72, 6.32], [17.72, 17.68], [-18.28, 17.92], [-0.4, 17.92],
     [-18.52, 2.0], [3.1, 4.88]].forEach(function (v) {
      post(K.metal, v[0], v[1], PAD_Z, PARA - 0.55, 0.055, 6);
      box(K.metal, v[0] - 0.14, v[0] + 0.14, v[1] - 0.14, v[1] + 0.14, PARA - 0.55, PARA - 0.25);
    });
  }

  /* An entrance: landing and steps up to the ground floor, a flat canopy
     over it, team-coloured on top. kind 1 is the stair hall on the square,
     3.6 x 2.0 m on two posts; kind 2 the back door, a 2.4 x 1.2 m hood with
     the steps turned along the wall, because the pad ends 1.2 m out.    */
  function entrance(fc, s, dw, kind) {
    var P = fc.P, n = fc.n, dd = [fc.d[0], fc.d[1], 0], dm = [-fc.d[0], -fc.d[1], 0];
    /* a box in facade coordinates: s0..s1 along, o0..o1 out, z0..z1 */
    function fbox(B, s0, s1, o0, o1, z0, z1, top, skipBack) {
      B.quad(P(s0, z0, o1), P(s1, z0, o1), P(s1, z1, o1), P(s0, z1, o1), n);
      B.quad(P(s0, z0, o0), P(s0, z1, o0), P(s0, z1, o1), P(s0, z0, o1), dm);
      B.quad(P(s1, z0, o0), P(s1, z1, o0), P(s1, z1, o1), P(s1, z0, o1), dd);
      (top || B).quad(P(s0, z1, o0), P(s1, z1, o0), P(s1, z1, o1), P(s0, z1, o1), UP);
      if (z0 > PAD_Z + 0.01) B.quad(P(s0, z0, o0), P(s1, z0, o0), P(s1, z0, o1), P(s0, z0, o1), DN);
      if (!skipBack) B.quad(P(s0, z0, o0), P(s1, z0, o0), P(s1, z1, o0), P(s0, z1, o0), [-n[0], -n[1], 0]);
    }
    var k, rise = (FL0 - PAD_Z) / 4;
    if (kind === 1) {
      fbox(K.trim, s - 1.5, s + 1.5, 0, 1.8, PAD_Z, FL0, null, true);
      for (k = 1; k <= 3; k++) fbox(K.trim, s - 1.5, s + 1.5, 1.8 + (k - 1) * 0.3, 1.8 + k * 0.3, PAD_Z, FL0 - k * rise, null, true);
      /* the canopy slab and its fascia, the two posts at its outer corners */
      fbox(K.trim, s - 1.8, s + 1.8, 0, 2.0, FL0 + 2.48, FL0 + 2.68, K.team, true);
      var pa = P(s - 1.68, 0, 1.88), pb = P(s + 1.68, 0, 1.88);
      post(K.metal, pa[0], pa[1], PAD_Z, FL0 + 2.48, 0.06, 8);
      post(K.metal, pb[0], pb[1], PAD_Z, FL0 + 2.48, 0.06, 8);
      /* the wall lamp over the door */
      fbox(K.metal, s - 0.15, s + 0.15, 0, 0.18, FL0 + 2.30, FL0 + 2.44, null, true);
    } else {
      fbox(K.trim, s - 1.1, s + 1.1, 0, 1.0, PAD_Z, FL0, null, true);
      for (k = 1; k <= 3; k++) fbox(K.trim, s + 1.1 + (k - 1) * 0.3, s + 1.1 + k * 0.3, 0, 1.0, PAD_Z, FL0 - k * rise, null, true);
      fbox(K.trim, s - 1.2, s + 1.2, 0, 1.2, FL0 + 2.50, FL0 + 2.64, K.team, true);
      fbox(K.metal, s - 0.15, s + 0.15, 0, 0.18, FL0 + 2.30, FL0 + 2.44, null, true);
    }
  }

  /* ================================================ the square and kit */
  /* The ground is tiled, not painted: every surface of the square is its
     own flat piece with its own colour, cut on a grid through all their
     edges and merged along each row, so an edge is as crisp at the
     closest zoom as at the farthest and the square reads in any light.
     Nothing is laid under the block. tools/model3d/dump.js reads a colour
     attribute as if it were sRGB, so its sheets show these darker than
     the game does (the asphalt nearly black); the game draws #525352.
     Colours, first match wins:                                           */
  var C_PAVE = 0xb2afa7, C_ASPH = 0x525352, C_SAND = 0xb9a17a, C_GRASS = 0x677a4a, C_LINE = 0xe6e6de;
  var ZONES = [
    [DRILL[0], DRILL[1], DRILL[2], DRILL[3], C_ASPH],               /* drill square        */
    [GATE0 + 0.4, GATE1 - 0.4, -PAD, DRILL[2], C_ASPH],             /* road from the gate  */
    [-12.2, -6.6, -18.3, -13.25, C_ASPH],                           /* yard, parking       */
    [LANE[0], LANE[1], LANE[2], LANE[3], C_SAND],                   /* obstacle course     */
    [-18.4, 17.6, 18.05, PAD, C_GRASS], [17.85, PAD, 5.25, PAD, C_GRASS],
    [-18.2, -12.4, -18.3, -13.25, C_GRASS], [11.6, 12.0, LANE[2], LANE[3], C_GRASS]
  ];
  function inBlock(x, y) {
    return (x > OUT[0][0] && x < OUT[3][0] && y > OUT[2][1] && y < OUT[4][1]) ||
           (x > OUT[0][0] && x < OUT[1][0] && y > OUT[0][1] && y < OUT[2][1]);
  }
  function zoneAt(x, y) {
    if (inBlock(x, y)) return -1;
    for (var i = 0; i < ZONES.length; i++) {
      var z = ZONES[i];
      if (x > z[0] && x < z[1] && y > z[2] && y < z[3]) return z[4];
    }
    return C_PAVE;
  }
  function buildGround() {
    var G = K.ground, xs = [-PAD, PAD], ys = [-PAD, PAD], i, j;
    function cut(a, v) { if (v > -PAD && v < PAD && a.indexOf(v) < 0) a.push(v); }
    OUT.forEach(function (p) { cut(xs, p[0]); cut(ys, p[1]); });
    ZONES.forEach(function (z) { cut(xs, z[0]); cut(xs, z[1]); cut(ys, z[2]); cut(ys, z[3]); });
    xs.sort(function (a, b) { return a - b; }); ys.sort(function (a, b) { return a - b; });
    for (j = 0; j < ys.length - 1; j++) {
      var y0 = ys[j], y1 = ys[j + 1], ym = (y0 + y1) / 2, run = null;
      for (i = 0; i <= xs.length - 1; i++) {
        var zc = i < xs.length - 1 ? zoneAt((xs[i] + xs[i + 1]) / 2, ym) : null;
        if (run && zc !== run.c) {
          if (run.c !== -1) { G.col = lin(run.c); G.quad([run.x, y0, PAD_Z], [xs[i], y0, PAD_Z], [xs[i], y1, PAD_Z], [run.x, y1, PAD_Z], UP); }
          run = null;
        }
        if (!run && zc !== null) run = { x: xs[i], c: zc };
      }
    }
    /* the pad's edge, a hand's breadth of concrete */
    G.col = lin(C_PAVE);
    box(G, -PAD, PAD, -PAD, PAD, 0, PAD_Z, "xXyY");
    /* The markings, 50 mm proud: at the farthest zoom (1,200 m, near
       plane 2, a 24-bit depth buffer) one depth step is 43 mm, so flush
       paint would flicker there. The drill square's border and centre
       line, the rows of markers the platoons dress on, the saluting base
       in front of the dais, the stop line at the barrier, the road's
       centre dashes and the parking bays.                                 */
    G.col = lin(C_LINE);
    var zl = PAD_Z + 0.05, d = DRILL, w = 0.12;
    function paint(x0, x1, y0, y1) { G.quad([x0, y0, zl], [x1, y0, zl], [x1, y1, zl], [x0, y1, zl], UP); }
    paint(d[0] + 0.4, d[1] - 0.4, d[2] + 0.4, d[2] + 0.4 + w);
    paint(d[0] + 0.4, d[1] - 0.4, d[3] - 0.4 - w, d[3] - 0.4);
    paint(d[0] + 0.4, d[0] + 0.4 + w, d[2] + 0.4 + w, d[3] - 0.4 - w);
    paint(d[1] - 0.4 - w, d[1] - 0.4, d[2] + 0.4 + w, d[3] - 0.4 - w);
    var mx = (d[0] + d[1]) / 2;
    paint(mx - 0.05, mx + 0.05, d[2] + 0.4 + w, d[3] - 0.4 - w);
    for (var x = d[0] + 2.0; x < d[1] - 1.5; x += 1.5) {
      if (Math.abs(x - mx) < 0.3) continue;
      for (var y = d[2] + 2.0; y < d[3] - 3.0; y += 2.0) paint(x - 0.1, x + 0.1, y - 0.1, y + 0.1);
    }
    paint(-2.08, -1.92, d[3] - 1.6, d[3] - 0.8);
    paint(-2.6, -1.4, d[3] - 0.8, d[3] - 0.66);
    paint(GATE0 + 0.6, GATE1 - 0.6, -17.3, -17.05);
    for (y = -16.4; y < d[2] - 0.6; y += 1.6) paint(9.75, 9.85, y, y + 0.8);
    /* two car bays, 2.55 m on centres and 4.8 m deep */
    for (i = 0; i < 3; i++) paint(-12.1 + i * 2.55, -12.0 + i * 2.55, -18.15, -13.35);
    G.col = null;
    /* the obstacle course's timber edging, and the kerbs of the square */
    var L = LANE;
    box(K.wood, L[0], L[1], L[2] - 0.12, L[2], PAD_Z, PAD_Z + 0.12);
    box(K.wood, L[0], L[1], L[3], L[3] + 0.12, PAD_Z, PAD_Z + 0.12);
    box(K.wood, L[0] - 0.12, L[0], L[2] - 0.12, L[3] + 0.12, PAD_Z, PAD_Z + 0.12);
    box(K.wood, L[1], L[1] + 0.12, L[2] - 0.12, L[3] + 0.12, PAD_Z, PAD_Z + 0.12);
  }

  /* the saluting dais and the flagpole at the head of the square */
  function buildDais() {
    var x0 = -4.6, x1 = 0.6, y0 = 1.7, y1 = 4.1, zt = 1.10;
    box(K.trim, x0, x1, y0, y1, PAD_Z, zt);
    /* steps up at the east end, four risers */
    for (var k = 1; k <= 3; k++) box(K.trim, x1 + (k - 1) * 0.3, x1 + k * 0.3, y0 + 0.4, y1 - 0.4, PAD_Z, zt - k * 0.25, "XyYZ");
    /* the front balustrade and its ends, the banner in the team colour */
    box(K.trim, x0, x1, y0, y0 + 0.2, zt, zt + 1.0, "xXyYZ");
    box(K.trim, x0, x0 + 0.2, y0 + 0.2, y1, zt, zt + 1.0, "xXYZ");
    box(K.team, x0 + 0.4, x1 - 0.4, y0 - 0.06, y0, zt + 0.15, zt + 0.85, "xXyYZz");
    /* the flagpole: a stepped concrete base, a tapered pole, a ball; its
       top is 7.70 m, level with the coping and not a hair over (see THE
       PLOT AND THE ENGINE)                                                */
    var fx = POLE[0], fy = POLE[1];
    box(K.trim, fx - 0.45, fx + 0.45, fy - 0.45, fy + 0.45, PAD_Z, 0.30);
    box(K.trim, fx - 0.25, fx + 0.25, fy - 0.25, fy + 0.25, 0.30, 0.45);
    var pg = new V.CylinderGeometry(0.045, 0.075, 7.14, 10, 1, false);
    pg.rotateX(PI / 2); pg.translate(fx, fy, 0.45 + 3.57);
    K.metal.geo(pg);
    var ball = new V.SphereGeometry(0.08, 10, 6);
    ball.translate(fx, fy, COPE - 0.08);
    K.metal.geo(ball);
    /* the flag: 1.5 x 2.6 m on the halyard, flying east in a moderate
       breeze - rippled, its fly a little low. Two single-sided sheets back
       to back, so each face is lit as its own side.                      */
    var NX = 10, NZ = 2, hz0 = 5.90, hz1 = 7.40, FL = 2.6, pts = [];
    for (var i = 0; i <= NX; i++) {
      var t = i / NX, col = [];
      for (var j = 0; j <= NZ; j++) {
        var zz = hz0 + (hz1 - hz0) * j / NZ - 0.22 * t * t;
        var yy = 0.20 * Math.sin(t * PI * 2.2 - 0.3) * Math.pow(t, 0.7);
        col.push([fx + 0.07 + FL * t * (1 - 0.03 * t), fy + yy, zz]);
      }
      pts.push(col);
    }
    for (i = 0; i < NX; i++) for (j = 0; j < NZ; j++) {
      var a = pts[i][j], b = pts[i + 1][j], c = pts[i + 1][j + 1], d = pts[i][j + 1];
      /* the face toward +y, then the face toward -y, 12 mm apart so the
         one seen from behind is never level with the one in front       */
      var ny = [0, 1, 0], sy = [0, -1, 0];
      var ap = [a[0], a[1] + 0.006, a[2]], bp = [b[0], b[1] + 0.006, b[2]], cp = [c[0], c[1] + 0.006, c[2]], dp = [d[0], d[1] + 0.006, d[2]];
      var am = [a[0], a[1] - 0.006, a[2]], bm = [b[0], b[1] - 0.006, b[2]], cm = [c[0], c[1] - 0.006, c[2]], dm = [d[0], d[1] - 0.006, d[2]];
      K.team.tri(ap, bp, cp, triN(a, b, c, ny)); K.team.tri(ap, cp, dp, triN(a, c, d, ny));
      K.team.tri(am, bm, cm, triN(a, b, c, sy)); K.team.tri(am, cm, dm, triN(a, c, d, sy));
    }
  }
  /* the facet's own normal, turned to the side wanted */
  function triN(a, b, c, side) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var n = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
    if (n[0] * side[0] + n[1] * side[1] + n[2] * side[2] < 0) n = [-n[0], -n[1], -n[2]];
    return n;
  }

  /* The obstacle course: two lanes run south to north, the paired start
     every army's course uses. Low crawl under wire, a zigzag balance log,
     a horizontal ladder, a 2.0 m wall, two 0.9 m hurdles.               */
  function buildCourse() {
    var W = K.wood, M = K.metal;
    LX.forEach(function (lx) {
      var i, y;
      /* low crawl: stakes 0.45 m high in three rows, wire along and across */
      [-12.8, -11.9, -11.0].forEach(function (yy) {
        [-1.0, 0, 1.0].forEach(function (dx) { post(M, lx + dx, yy, PAD_Z, 0.55, 0.03, 4); });
        bar(M, [lx - 1.0, yy, 0.52], [lx + 1.0, yy, 0.52], 0.012, 3, true);
      });
      [-1.0, 0, 1.0].forEach(function (dx) { bar(M, [lx + dx, -12.8, 0.52], [lx + dx, -11.0, 0.52], 0.012, 3, true); });
      /* balance log: two legs of a zigzag, 0.9 m up on trestles */
      var z = [[lx - 0.7, -9.9], [lx + 0.7, -8.5], [lx - 0.7, -7.1]];
      for (i = 0; i < 2; i++) bar(W, [z[i][0], z[i][1], 0.9], [z[i + 1][0], z[i + 1][1], 0.9], 0.11, 8, false);
      z.forEach(function (p) {
        box(W, p[0] - 0.09, p[0] + 0.09, p[1] - 0.25, p[1] - 0.12, PAD_Z, 0.82);
        box(W, p[0] - 0.09, p[0] + 0.09, p[1] + 0.12, p[1] + 0.25, PAD_Z, 0.82);
        box(W, p[0] - 0.12, p[0] + 0.12, p[1] - 0.3, p[1] + 0.3, 0.72, 0.80);
      });
      /* horizontal ladder: steel, rails 2.2 m up, 3.0 m long, rungs 0.4 m */
      var y0 = -6.0, y1 = -3.0;
      [[-0.3, y0], [0.3, y0], [-0.3, y1], [0.3, y1]].forEach(function (p) { post(M, lx + p[0], p[1], PAD_Z, 2.25, 0.04, 6); });
      bar(M, [lx - 0.3, y0, 2.2], [lx - 0.3, y1, 2.2], 0.03, 5, false);
      bar(M, [lx + 0.3, y0, 2.2], [lx + 0.3, y1, 2.2], 0.03, 5, false);
      for (y = y0 + 0.2; y < y1; y += 0.4) bar(M, [lx - 0.3, y, 2.2], [lx + 0.3, y, 2.2], 0.02, 4, true);
      /* the wall: planked, 2.0 m, braced behind, a capping rail */
      box(W, lx - 1.1, lx + 1.1, -1.1, -0.9, PAD_Z, 2.0);
      box(W, lx - 1.15, lx + 1.15, -1.15, -0.85, 2.0, 2.08);
      [-0.8, 0.8].forEach(function (dx) { obox(W, lx + dx, -0.45, 1.0, 0.12, 0.12, 2.1, 0.45, 0, 0); });
      /* hurdles: a log rail 0.9 m up on two posts, twice */
      [1.4, 2.6].forEach(function (yy) {
        [-1.0, 1.0].forEach(function (dx) { box(W, lx + dx - 0.07, lx + dx + 0.07, yy - 0.07, yy + 0.07, PAD_Z, 0.98); });
        bar(W, [lx - 1.08, yy, 0.90], [lx + 1.08, yy, 0.90], 0.08, 8, false);
      });
    });
  }

  /* The fence, the gate and the guard post. A low concrete kerb wall with
     a steel fence on it, 2.3 m in all, pillars at the gate; a boom
     barrier across the road; the guard's booth just inside, glazed on
     the three sides that watch the gate and the road.                   */
  function buildGate() {
    var M = K.metal;
    function run(a, b) {
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
      var px = -uy * 0.125, py = ux * 0.125;
      box(K.trim, Math.min(a[0], b[0]) - Math.abs(px), Math.max(a[0], b[0]) + Math.abs(px),
          Math.min(a[1], b[1]) - Math.abs(py), Math.max(a[1], b[1]) + Math.abs(py), PAD_Z, 0.55);
      var np = Math.max(1, Math.round(L / 2.8));
      for (var i = 0; i <= np; i++) {
        var x = a[0] + dx * i / np, y = a[1] + dy * i / np;
        box(M, x - 0.04, x + 0.04, y - 0.04, y + 0.04, 0.55, 2.30, "xXyYZ");
      }
      [1.35, 2.22].forEach(function (z) {
        box(M, Math.min(a[0], b[0]) - (ux ? 0 : 0.025), Math.max(a[0], b[0]) + (ux ? 0 : 0.025),
            Math.min(a[1], b[1]) - (uy ? 0 : 0.025), Math.max(a[1], b[1]) + (uy ? 0 : 0.025), z, z + 0.05, "xXyYzZ");
      });
    }
    run([-18.4, FENCE_Y], [GATE0 - 0.3, FENCE_Y]);
    run([GATE1 + 0.3, FENCE_Y], [FENCE_X, FENCE_Y]);
    run([FENCE_X, FENCE_Y], [FENCE_X, 5.0]);
    run([FENCE_X, 5.0], [17.6, 5.0]);
    run([-18.4, FENCE_Y], [-18.4, -13.0]);
    /* gate pillars */
    [GATE0, GATE1].forEach(function (x) {
      box(K.trim, x - 0.3, x + 0.3, FENCE_Y - 0.3, FENCE_Y + 0.3, PAD_Z, 2.4);
      box(K.trim, x - 0.36, x + 0.36, FENCE_Y - 0.36, FENCE_Y + 0.36, 2.4, 2.52);
    });
    /* boom barrier: pivot housing west of the road, the striped arm 6.5 m
       across it, its counterweight, and the rest post on the far side.
       The pillars' faces are 7.0 m apart, a two-lane gate               */
    var bx = GATE0 + 0.75, by = FENCE_Y + 0.75;
    box(M, bx - 0.22, bx + 0.22, by - 0.22, by + 0.22, PAD_Z, 1.05);
    box(M, bx - 0.75, bx - 0.2, by - 0.12, by + 0.12, 0.92, 1.22);
    /* the arm in seven bands, red and white alternately, each band a box
       of four long faces on the white swatch                              */
    var ax0 = bx, ax1 = GATE1 - 0.35, az0 = 1.05, az1 = 1.17, ay0 = by - 0.06, ay1 = by + 0.06, NB = 7;
    var sw = [ruv(R_STRIPE, 0.2, 0.2), ruv(R_STRIPE, 0.8, 0.2), ruv(R_STRIPE, 0.8, 0.8), ruv(R_STRIPE, 0.2, 0.8)];
    for (var k = 0; k < NB; k++) {
      var xa = ax0 + (ax1 - ax0) * k / NB, xb = ax0 + (ax1 - ax0) * (k + 1) / NB;
      K.open.col = lin(k % 2 ? 0xf0f0ea : 0xc8261e);
      K.open.quad([xa, ay0, az0], [xb, ay0, az0], [xb, ay0, az1], [xa, ay0, az1], [0, -1, 0], sw);
      K.open.quad([xa, ay1, az0], [xb, ay1, az0], [xb, ay1, az1], [xa, ay1, az1], [0, 1, 0], sw);
      K.open.quad([xa, ay0, az1], [xb, ay0, az1], [xb, ay1, az1], [xa, ay1, az1], UP, sw);
      K.open.quad([xa, ay0, az0], [xb, ay0, az0], [xb, ay1, az0], [xa, ay1, az0], DN, sw);
    }
    K.open.quad([ax1, ay0, az0], [ax1, ay1, az0], [ax1, ay1, az1], [ax1, ay0, az1], [1, 0, 0], sw);
    K.open.col = null;
    box(M, GATE1 - 0.4, GATE1 - 0.28, by - 0.06, by + 0.06, PAD_Z, 1.02);
    /* the guard booth: 2.4 m square, walls to 2.55 m, glazed south, east
       and north with the door on the north, a flat roof slab with a
       200 mm overhang, team-coloured on top                               */
    var b0 = [3.3, -18.3], b1 = [5.7, -15.9], zr = 2.55;
    var bo = [[b0[0], b0[1]], [b1[0], b0[1]], [b1[0], b1[1]], [b0[0], b1[1]]];
    var gl = function (s0, s1) { return { s0: s0, s1: s1, zb: 1.05, zt: 2.2, r: R_BOOTH, d: 0.08 }; };
    facade(bo[0], bo[1], PAD_Z, zr, [gl(0.3, 2.1)]);
    facade(bo[1], bo[2], PAD_Z, zr, [gl(0.3, 2.1)]);
    facade(bo[2], bo[3], PAD_Z, zr, [{ s0: 0.3, s1: 1.2, zb: 0.2, zt: 2.2, r: R_BDOOR, d: 0.08 }, gl(1.45, 2.1)]);
    facade(bo[3], bo[0], PAD_Z, zr, []);
    box(K.trim, b0[0] - 0.2, b1[0] + 0.2, b0[1] - 0.2, b1[1] + 0.2, zr, zr + 0.2, "xXyYZz", K.team);
  }

  /* lamp standards round the square, and the refuse skip beside the yard */
  function buildLamps() {
    var M = K.metal;
    [[-5.9, -14.3, 1], [11.8, -14.3, -1], [11.8, 4.1, -1]].forEach(function (L) {
      var x = L[0], y = L[1], s = L[2];
      box(K.trim, x - 0.25, x + 0.25, y - 0.25, y + 0.25, PAD_Z, 0.35);
      post(M, x, y, 0.35, 6.2, 0.07, 8);
      bar(M, [x, y, 6.1], [x + s * 0.9, y, 6.25], 0.04, 5, false);
      box(M, x + s * 0.9 - 0.3, x + s * 0.9 + 0.3, y - 0.14, y + 0.14, 6.14, 6.32, "xXyYZ");
      var lx0 = x + s * 0.9 - 0.26, lx1 = x + s * 0.9 + 0.26;
      K.open.quad([lx0, y - 0.11, 6.14], [lx1, y - 0.11, 6.14], [lx1, y + 0.11, 6.14], [lx0, y + 0.11, 6.14], DN,
                  [ruv(R_LAMP, 0, 0), ruv(R_LAMP, 1, 0), ruv(R_LAMP, 1, 1), ruv(R_LAMP, 0, 1)]);
    });
    box(M, -5.7, -3.9, -17.9, -16.8, PAD_Z, 1.25);
    box(M, -5.8, -3.8, -18.0, -16.7, 1.25, 1.33);
  }

  /* =========================================================== assembly */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(THREE, C);
    K = {
      wall: new Batch("world", 8), trim: new Batch("world", 4), roof: new Batch("plan", 16),
      ground: new Batch("plan", 6), open: new Batch("given"), metal: new Batch("none"),
      wood: new Batch("none"), team: new Batch("none")
    };
    K.ground.vc = true; K.open.vc = true;
    buildGround();
    buildBlock();
    buildDais();
    buildCourse();
    buildGate();
    buildLamps();
    var g = new THREE.Group();
    g.name = "barracks_block";
    ["ground", "wall", "trim", "roof", "open", "metal", "wood", "team"].forEach(function (k) {
      var m = K[k].mesh(THREE, T[k]);
      if (m) { m.name = k; g.add(m); }
    });
    K = null;
    return g;
  }

  return { build: build };
})();

/* Replaces the two huts of units3d_salvage.js; heroes load after it, so the
   plain assignment wins. icons3d draws the sidebar icon from this build. */
BLD_MODELS["barracks"] = { build: HeroBarracksBlock.build };
