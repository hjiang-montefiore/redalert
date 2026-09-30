/* ===== conyard_engineer_yard.js - HERO model: the Construction Yard =======
   BUILDINGS.conyard, every faction in every era: "Mobile HQ, deployed ...
   press D to fold it back into its rig".  The mcv drives in as a crane
   truck with container modules on its deck; this is what it sets down.
   3 x 3 tiles, a 60 x 60 m plot, drawn at CFG.BLD_SCALE.

   The old model (units3d_salvage.js) was an industrial hall, a scaffold and
   a 38.9 m lattice tower crane in a group named "turret".  render3d.js
   turns a non-weapon structure's "turret" to rotation.z = -(tang), and
   entities.js pins tang at -PI/2, so its crane always stood 90 degrees off
   how it was drawn; and archFixture() is set on the bounding-box top, so
   the faction radome rode the crane tip 39 m up.  Nothing here is named
   "turret", or anything else render3d animates: the twelve meshes are
   named for their group and material (yard_box, tall_yellow ...), the
   crane is merged with the batching plant into the TALL meshes (below),
   and no code turns them.

   What a military engineer construction yard is (Seabee NMCB and USAF
   RED HORSE detachments, and the engineer battalions of every army that
   pours its own concrete): a graded, fenced gravel pad; a site office and
   stores made of ISO containers; a covered maintenance bay; a mobile
   batching plant with its cement silo; a fast-erecting tower crane; and
   rows of precast product and material waiting to go out.  All of it is
   here, each piece a real item drawn from its maker's figures.

   THE CRANE - Liebherr 34 K, the fast-erecting (bottom-slewing) crane that
   folds down onto its own transport axles: the "rig" the yard folds back
   into.  Liebherr data sheet "Turmdrehkran 34 K" (Liebherr-Werk Biberach,
   120 P-5808, 01.10/6, as issued by the hire firms) and the Liebherr
   "Tower Cranes" brochure (K series table: 4,000 kg, 1,100 kg at 33.0 m):
     support base              3.8 x 3.8 m
     slewing (tail) radius     2.5 m, the ballast stack
     jib                       25.5 / 30.0 / 33.0 m radius; the 25.5 m jib
                               is drawn, the one that stays over the plot
     hook height, jib level    11.7 / 15.0 / 17.0 / 20.0 (standard, tower
                               telescoped) / 22.0 / 24.0 / 26.0 m; 20.0 m
                               is drawn
     tower head                4.8 m over the hook height (the sheet's
                               16.5 m minimum and 30.8 m maximum tower top
                               against its 11.7 and 26.0 m hook heights)
     jib fold joint            13.8 m radius, with its tie strut
     rear guy frame            2.0 m behind the slewing axis
     tower section             0.85 x 0.88 m; jib section 0.80 x 0.70 m
     ballast                   10,400 kg, +1,050 kg for the 26 m tower:
                               a 1.2 x 1.2 x 3.3 m stack of concrete blocks
                               is 11.4 t, on a 0.5 m steel carrier
     transport axles           front 3.65-4.15 x 1.45 x 1.10 m,
                               rear 1.90 x 2.50 x 1.05 m (packing list)
   and the photograph "Liebherr 34K (50136794797)" (Wuppertal, 17 July
   2020, Wikimedia Commons) for what the drawing does not say: the grey
   tower head and rear guy frame, the yellow triangular jib with its name
   board by the heel, the pale ballast stack behind the tower, the yellow
   raking strut at the tower foot and the dark outrigger cross.  Its hook
   carries a 1 m3 concrete skip, 2.75 t, at 13 m radius on four falls: the
   load chart gives 3,250 kg there.  Parked, the jib is left weathervaned
   along the plant, and its unhooked transport axles stand beside it.

   THE BATCHING PLANT - MEKA MB-60M mobile plant, the single-chassis kind
   engineer units tow.  MEKA "MB-60M technical details" (2018): 54-63 m3/h,
   a 1 m3 mixer, 4 x 10 m3 aggregate bins, an 800 mm x 13.71 m belt; its
   general settlement plan: 28.29 m overall, bins 2 x 3.2 m long and
   5.66 m high, the chassis on jacks at 1.45 / 6.475 / 12.58 m, a 3.28 m
   drive-through under the mixer, an 11.5 m cement screw at 40 degrees and
   a silo 3.065 m across whose filter tops out at 12.9 m, on a 6.46 m
   steel foundation.  Sand and 20 mm stone stand in heaps by the bins.

   CONTAINERS - ISO 668 1CC, 6.058 x 2.438 x 2.591 m, and 1AA at 12.192 m,
   stacked on their corner castings.  The site office is four 20 ft boxes
   side by side, three high but for the west one, with a walkway and a
   stair at each level, windows, doors and split air conditioners, and a
   guyed antenna mast 8 m over its roof.  The stores and plant laboratory
   are four more, cargo doors below, the middle pair three high.  A 20 ft
   generator set stands by the crane.  Two walls of 40 ft boxes, two high
   and two long, 10 m apart, carry a curved-truss fabric canopy over the
   maintenance bay and the rebar shop, its trusses clamped to the walls'
   outer top rails so the roof covers the boxes too: 14.9 m across, 5.3 m
   to the eaves and 2.54 m of rise to the crown.

   PRECAST - reinforced concrete culvert pipe, the product every road and
   airfield an engineer unit builds has needed since the 1940s: 48 in
   (1.219 m) bore, 5 in (0.127 m) wall, 8 ft (2.44 m) laying lengths
   (ASTM C76, wall B), and a stack of 36 in (0.914 m) bore, 4 in wall;
   three wet-cast pipe moulds under the jib, the steel jacket round a core,
   the kind the crane's skip fills from above, as the big sizes are still
   made; and New Jersey barriers, 32 in (0.81 m) tall, 24 in base, 6 in
   top, the slope breaking at 13 in, in 10 ft lengths.  Rebar in 12 m
   bundles, universal beams, plywood and sawn timber packs sit on dunnage.

   CORRECTED against the survey's leads: the silo is 3.07 m across, a
   little over its 2.5-3 m; the Jersey barrier is 0.81 m, not the 0.91 m
   some summaries give; the perimeter is a 7 ft chain-link fence on line
   posts at 10 ft with a top rail and a double gate, not a HESCO line (the
   yard stands inside a base that has its own perimeter, a fence is what
   the photographed engineer yards have, and HESCO only exists from 1990);
   and the precast is pipe, not T-walls, for the reason below.  Nothing is
   invented to balance the factions: a yard is a yard.

   ERAS.  build() is handed only the team colour, never the era, so one
   yard stands in every period, and it is kept to what an engineer yard
   has had since about 1980: ISO containers came into military service in
   the 1970s, a fast-erecting crane and a towed mobile plant of this shape
   are older still, and concrete pipe and the Jersey barrier far older.
   So the Bremer T-wall (2003) and a VSAT terminal (the 1990s) are left
   out; in the 1950s and 1960s the boxes are still ahead of their time.
   The period is carried by render3d: eraRestyle() tints every material
   with saturation under 0.45 - the white-tinted gravel, timber and fence
   canvases too, the pad 42% toward brick in e50 - and eraFixture() sets
   the period's rooftop kit.

   RENDERER CONTRACTS this file is built around, all measured in render3d's
   own groups under JavaScriptCore (tools/jsc/damage3d_check.py with a
   probe body):
     - restyle() recolours every material whose colour is desaturated and
       mid-grey into the faction's palette.  The container paint and the
       concrete are tints over neutral canvases, so they take it; the
       gravel, the fence and the timber are white-tinted canvases
       (lightness 1), which restyle() leaves alone; the crane is saturated.
     - roofHeightOf() stands eraFixture() on the tallest MESH at least 15 m
       across both ways, and every static part here is merged by material.
       So everything taller than the container roofs is kept in meshes that
       are narrow one way: the crane's jib and the plant lie along one line
       at the back of the plot (the TALL meshes), the mast has a mesh of its
       own, and the canopy's crown stays just under the top roofs.  It also
       counts render3d's own archFixture, whose matrix is still identity at
       that moment: the NATO radome (15.6 m across, 7.8 m high) reads as a
       roof at 7.8 m, which the top roofs, three containers at 7.92 m, clear.
       The era kit then stands on a third-storey roof in every period: the
       array and the lattice, dish and whip on the office's, the radome and
       the brick stack on the stores' (the e80 net is plot-sized by design).
     - archFixture() is set on the bounding-box top instead, the crane's
       head, and it is sized to the whole plot (a 15.6 m dome, a 13 x 33 m
       stack, a 43 m eave), so an open yard has no roof that can carry it.
       The registration below says so (openPlot) for render3d to leave it
       off; until render3d reads that, it floats as it did on the old
       model, if lower: its foot 27.7 m up in the scene instead of 42.8.
     - damage3d.js burns a building on the broad level tops of a height map
       cast at 3 m (2.73 m of model), a roof taking its next fire while its
       cells per fire beat every other roof's, and it counts the floating
       archFixture too: the NATO dome's top is 9 cells, the Pact stack's 13,
       the PLA eave 256.  The canopy, sprung from the outer rails, is one
       region of 45 cells (5 by 9), so all three roof fires of a NATO or a
       Pact yard burn on it (the third at 15 cells a fire against the
       stack's 13) and the fire at the foot of a wall on the gravel; the
       PLA eave takes all three, as it did the old model's hall.  (Sprung
       from mid-wall, its west column split off as a lower region, the
       canopy was 36 cells, and the Pact stack took the third fire, 64 m
       up.)  Keep the canopy one region and over 39 cells.
   Model space: +X east, +Y north (port), +Z up, metres, the pad on z = 0.
   Colours are authored sRGB and left to prepModel() to linearise.  Every
   static part is merged into one mesh per material and group: twelve
   draws, eight materials.  ASCII only.                                     */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroEngineerYard = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------- the plot */
  var PAD = 0.15;               /* graded gravel over the ground            */
  var FEN = 29.3;               /* fence line                               */
  var GATE = 4.0;               /* half width of the vehicle gate (north)  */

  /* ISO 668 1CC */
  var CL = 6.058, CW = 2.438, CH = 2.591;

  /* Liebherr 34 K: slewing axis, tower, jib (data sheet) */
  var CX = 21.0, CY = -24.5;
  var TX = CX - 1.5;            /* tower centre, ahead of the slewing axis  */
  var TWH = 0.45;               /* tower half width                         */
  var HOOK = 20.0;
  var ZJ0 = HOOK + 1.0;         /* jib bottom chords at the heel            */
  var ZJ1 = HOOK + 1.8;         /* ... and at the tip: the jib rises        */
  var JD = 0.70, JWH = 0.40;    /* jib depth, half width                    */
  var JR = 25.5;                /* radius                                   */
  var XJH = TX + TWH, XJT = CX - JR;
  var APEX = HOOK + 4.8;
  var XFOLD = CX - 13.8;
  var XHOOK = CX - 13.0;        /* the trolley, 13 m out                    */

  /* MEKA MB-60M: plant x from its loading end, on the line y = PY */
  var PX0 = -27.6, PY = -24.5;
  function px(x) { return PX0 + x; }
  var SIX = px(25.06), SIR = 1.5325;

  /* container blocks */
  var AX0 = 10.6, AY0 = 9.9;              /* site office: long axis north   */
  var BX0 = -19.0, BY0 = -18.1;           /* stores: long axis east         */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ============================================================ canvases
     Painted once per page and shared by every team's copy (render3d builds
     this key once per team and era, icons3d once more). */
  var _cv = {};
  function mk(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* The yard: one plan painting of the whole pad in the top 768 rows (60 m
     each way), and an atlas of four 256-pixel swatches in the bottom 256
     rows: sawn timber, sand, crushed gravel, plywood. */
  var YD = 1024;
  var ATLAS = { timber: 0, sand: 1, gravel: 2, ply: 3 };
  function yardCanvas() {
    if (_cv.yard) return _cv.yard;
    var cv = mk(YD, YD), g = cv.getContext("2d"), R = rng(34051), i, x, y, w, h;
    var SX = YD / 60, SY = 768 / 60;
    function cx(X) { return (X + 30) * SX; }
    function cy(Y) { return (30 - Y) * SY; }
    /* crushed stone, graded and rolled */
    g.fillStyle = "#8d8575"; g.fillRect(0, 0, YD, 768);
    for (i = 0; i < 4200; i++) {
      var v = 96 + Math.floor(R() * 70);
      g.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.95) + "," + Math.floor(v * 0.86) + ",0.55)";
      g.fillRect(R() * YD, R() * 768, 1 + R() * 2.5, 1 + R() * 2.5);
    }
    for (i = 0; i < 60; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(230,220,196,0.06)" : "rgba(40,36,28,0.07)";
      g.fillRect(R() * YD, R() * 768, 40 + R() * 160, 30 + R() * 120);
    }
    /* the running lanes, packed darker by wheels: gate to the plant, and
       along the plant's front to the mixer and the crane */
    function lane(x0, y0, x1, y1, a) {
      g.fillStyle = "rgba(58,52,42," + a + ")";
      g.fillRect(Math.min(cx(x0), cx(x1)), Math.min(cy(y0), cy(y1)), Math.abs(cx(x1) - cx(x0)), Math.abs(cy(y1) - cy(y0)));
    }
    lane(-4.2, 30, 4.2, -20.5, 0.20);
    lane(-15.5, -17.4, 17.5, -20.6, 0.18);
    lane(-14.2, -21.2, -10.8, -26.8, 0.22);
    /* tyre tracks in pairs down the lanes */
    g.strokeStyle = "rgba(44,38,30,0.30)";
    for (i = 0; i < 6; i++) {
      var o = -2.6 + i * 1.05 + (R() - 0.5) * 0.4;
      g.lineWidth = 3 + R() * 3;
      g.beginPath(); g.moveTo(cx(o), cy(30)); g.bezierCurveTo(cx(o), cy(0), cx(o + 0.5), cy(-14), cx(o - 3 - i), cy(-19.6)); g.stroke();
    }
    for (i = 0; i < 4; i++) {
      var oy = -19.0 - i * 0.6;
      g.lineWidth = 3 + R() * 2;
      g.beginPath(); g.moveTo(cx(15.5), cy(oy)); g.lineTo(cx(-12.5), cy(oy + (R() - 0.5) * 0.5)); g.stroke();
    }
    /* cement dust round the silo and the mixer, washout under the mixer */
    var dg = g.createRadialGradient(cx(SIX), cy(PY), 4, cx(SIX), cy(PY), 7 * SX);
    dg.addColorStop(0, "rgba(196,196,188,0.55)"); dg.addColorStop(1, "rgba(196,196,188,0)");
    g.fillStyle = dg; g.fillRect(cx(SIX) - 8 * SX, cy(PY) - 8 * SY, 16 * SX, 16 * SY);
    var wg = g.createRadialGradient(cx(px(15)), cy(PY), 2, cx(px(15)), cy(PY), 3.2 * SX);
    wg.addColorStop(0, "rgba(120,122,118,0.75)"); wg.addColorStop(1, "rgba(120,122,118,0)");
    g.fillStyle = wg; g.fillRect(cx(px(15)) - 4 * SX, cy(PY) - 4 * SY, 8 * SX, 8 * SY);
    /* oil under the generator and the crane's winch */
    [[24.5, -20.0, 1.6], [CX + 0.4, CY, 1.2], [26.2, -15.4, 0.9], [13.0, -8.0, 2.4]].forEach(function (s) {
      var og = g.createRadialGradient(cx(s[0]), cy(s[1]), 1, cx(s[0]), cy(s[1]), s[2] * SX);
      og.addColorStop(0, "rgba(22,20,18,0.55)"); og.addColorStop(1, "rgba(22,20,18,0)");
      g.fillStyle = og; g.fillRect(cx(s[0]) - s[2] * SX, cy(s[1]) - s[2] * SY, 2 * s[2] * SX, 2 * s[2] * SY);
    });
    /* standing water in the ruts */
    for (i = 0; i < 9; i++) {
      x = cx(-3 + R() * 6); y = cy(-6 + R() * 30); w = 6 + R() * 16; h = 4 + R() * 8;
      g.fillStyle = "rgba(70,72,68,0.35)";
      g.beginPath(); g.ellipse ? g.ellipse(x, y, w, h, 0, 0, 2 * PI) : g.arc(x, y, w, 0, 2 * PI); g.fill();
    }
    /* ---- the atlas band ---- */
    var B0 = 768;
    /* sawn timber: boards along u, their edges and the odd darker one */
    g.fillStyle = "#b08f5e"; g.fillRect(0, B0, 256, 256);
    for (i = 0; i < 16; i++) {
      g.fillStyle = "rgba(" + (150 + Math.floor(R() * 40)) + "," + (118 + Math.floor(R() * 30)) + ",70,0.5)";
      g.fillRect(0, B0 + i * 16, 256, 15);
      g.fillStyle = "rgba(60,44,24,0.55)"; g.fillRect(0, B0 + i * 16 + 15, 256, 1.5);
    }
    for (i = 0; i < 40; i++) { g.fillStyle = "rgba(80,58,30,0.25)"; g.fillRect(R() * 256, B0 + R() * 256, 20 + R() * 60, 1); }
    /* sand */
    g.fillStyle = "#b59d72"; g.fillRect(256, B0, 256, 256);
    for (i = 0; i < 1800; i++) { g.fillStyle = R() < 0.5 ? "rgba(214,194,150,0.35)" : "rgba(120,100,68,0.3)"; g.fillRect(256 + R() * 256, B0 + R() * 256, 1.5, 1.5); }
    /* 20 mm crushed stone */
    g.fillStyle = "#7c7a74"; g.fillRect(512, B0, 256, 256);
    for (i = 0; i < 1400; i++) {
      var q = 70 + Math.floor(R() * 90);
      g.fillStyle = "rgba(" + q + "," + q + "," + Math.floor(q * 0.94) + ",0.7)";
      g.fillRect(512 + R() * 252, B0 + R() * 252, 2 + R() * 3, 2 + R() * 3);
    }
    /* plywood formwork faces, oiled and grey-brown */
    g.fillStyle = "#8a7a5c"; g.fillRect(768, B0, 256, 256);
    for (i = 0; i < 30; i++) { g.fillStyle = "rgba(60,50,34,0.2)"; g.fillRect(768 + R() * 256, B0 + R() * 256, 30 + R() * 80, 3 + R() * 10); }
    g.fillStyle = "rgba(40,32,20,0.5)"; g.fillRect(768, B0 + 127, 256, 2); g.fillRect(895, B0, 2, 256);
    _cv.yard = cv;
    return cv;
  }

  /* Container paint: one storey of corrugated side, 4 m along by 2.591 m
     up, the top and bottom rails, rust at the seams and dirt at the foot.
     Neutral light grey, so the material's tint - which restyle() sets to
     the faction's palette - is the colour. */
  function boxCanvas() {
    if (_cv.box) return _cv.box;
    var cv = mk(256, 256), g = cv.getContext("2d"), R = rng(668), i;
    g.fillStyle = "#c9c9c6"; g.fillRect(0, 0, 256, 256);
    /* 16 corrugations in 4 m: lit face, shade face */
    for (i = 0; i < 16; i++) {
      var gr = g.createLinearGradient(i * 16, 0, i * 16 + 16, 0);
      gr.addColorStop(0, "rgba(255,255,255,0.10)"); gr.addColorStop(0.45, "rgba(255,255,255,0.02)");
      gr.addColorStop(0.55, "rgba(0,0,0,0.10)"); gr.addColorStop(1, "rgba(0,0,0,0.20)");
      g.fillStyle = gr; g.fillRect(i * 16, 0, 16, 256);
    }
    /* top and bottom side rails */
    g.fillStyle = "rgba(0,0,0,0.28)"; g.fillRect(0, 0, 256, 9); g.fillRect(0, 246, 256, 10);
    g.fillStyle = "rgba(255,255,255,0.12)"; g.fillRect(0, 9, 256, 2);
    /* rust weeping from the top rail, dust up the bottom */
    for (i = 0; i < 26; i++) {
      var x = R() * 256, l = 20 + R() * 90;
      var rg = g.createLinearGradient(0, 10, 0, 10 + l);
      rg.addColorStop(0, "rgba(120,64,30,0.30)"); rg.addColorStop(1, "rgba(120,64,30,0)");
      g.fillStyle = rg; g.fillRect(x, 10, 2 + R() * 3, l);
    }
    var dg = g.createLinearGradient(0, 200, 0, 246);
    dg.addColorStop(0, "rgba(130,112,84,0)"); dg.addColorStop(1, "rgba(130,112,84,0.35)");
    g.fillStyle = dg; g.fillRect(0, 200, 256, 46);
    _cv.box = cv;
    return cv;
  }

  /* Concrete: a 3 m tile of form-faced precast, the tie holes, the joints
     of the steel forms and some curing stain. */
  function concCanvas() {
    if (_cv.conc) return _cv.conc;
    var cv = mk(256, 256), g = cv.getContext("2d"), R = rng(1203), i;
    g.fillStyle = "#d2d0ca"; g.fillRect(0, 0, 256, 256);
    for (i = 0; i < 50; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.06)" : "rgba(60,56,48,0.06)";
      g.fillRect(R() * 256, R() * 256, 20 + R() * 90, 14 + R() * 60);
    }
    g.fillStyle = "rgba(40,38,34,0.35)";
    for (i = 0; i < 4; i++) for (var j = 0; j < 4; j++) g.fillRect(28 + i * 64, 28 + j * 64, 3, 3);
    g.fillStyle = "rgba(40,38,34,0.16)"; g.fillRect(0, 127, 256, 1.5); g.fillRect(127, 0, 1.5, 256);
    for (i = 0; i < 16; i++) {
      var x = R() * 256, l = 10 + R() * 50;
      var rg = g.createLinearGradient(0, 0, 0, l);
      rg.addColorStop(0, "rgba(80,76,66,0.18)"); rg.addColorStop(1, "rgba(80,76,66,0)");
      g.fillStyle = rg; g.fillRect(x, R() * 200, 2 + R() * 4, l);
    }
    _cv.conc = cv;
    return cv;
  }

  /* chain-link fabric: 50 mm diamonds are far below a pixel, so the canvas
     draws them at 0.1 m and lets the mip chain average them into the grey
     haze a fence is from any distance */
  function linkCanvas() {
    if (_cv.link) return _cv.link;
    var cv = mk(64, 64), g = cv.getContext("2d");
    g.clearRect(0, 0, 64, 64);
    g.strokeStyle = "rgba(176,180,182,0.95)"; g.lineWidth = 2;
    for (var i = -64; i < 128; i += 16) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke();
      g.beginPath(); g.moveTo(i, 64); g.lineTo(i + 64, 0); g.stroke();
    }
    _cv.link = cv;
    return cv;
  }

  /* The textures are kept too, not just their canvases: render3d builds
     this key once per team and era and icons3d once more, none of them
     depends on the team, and a CanvasTexture made per build is uploaded
     per build (the 1024 yard painting is 5.6 MB with its mips).  Nothing
     in the game disposes a map (nato_e20_carrier_ford.js keeps its the
     same way). */
  var _tex = {};
  function texOf(THREE, name, cv, clamp) {
    if (!_tex[name]) _tex[name] = canvasTex(THREE, cv, clamp);
    return _tex[name];
  }
  function canvasTex(THREE, cv, clamp) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
      /* r148: encoding is the switch that works; colorSpace does nothing */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* ============================================================ materials
     Eight: GROUND (the pad, stockpiles, aggregate, timber: a white tint on
     the yard painting), CONC (precast and ballast), BOX (container paint),
     STEEL (fence posts, frames, silo, moulds), DARK (rubber, belts, rope,
     rebar, window glass), YELLOW (the crane and the mixer), TEAM and
     FENCE (the chain-link fabric). */
  function makeMats(THREE, C) {
    var T = {}, t;
    T.ground = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.96, metalness: 0.0 });
    t = texOf(THREE, "yard", yardCanvas(), true);
    if (t) T.ground.map = t; else T.ground.color.setHex(0x8d8575);
    T.conc = new THREE.MeshStandardMaterial({ color: 0xb8b6ae, roughness: 0.92, metalness: 0.0 });
    t = texOf(THREE, "conc", concCanvas(), false);
    if (t) T.conc.map = t;
    /* a tint the restyle can take: mid grey-green, the paint most armies'
       containers leave the depot in */
    T.box = new THREE.MeshStandardMaterial({ color: 0x8e968a, roughness: 0.78, metalness: 0.12 });
    t = texOf(THREE, "box", boxCanvas(), false);
    if (t) T.box.map = t;
    T.steel = new THREE.MeshStandardMaterial({ color: 0x8e9398, roughness: 0.52, metalness: 0.45 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x252422, roughness: 0.62, metalness: 0.22 });
    /* Liebherr's yellow, a little worn */
    T.yellow = new THREE.MeshStandardMaterial({ color: 0xc99a24, roughness: 0.58, metalness: 0.18 });
    /* exactly the owner's colour; pulled toward the camera because the
       panels lie on the roofs */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    T.team = new THREE.MeshStandardMaterial({ color: new THREE.Color(tc), roughness: 0.56, metalness: 0.12,
                                              emissive: new THREE.Color(tc), emissiveIntensity: 0.08,
                                              polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    /* see-through, so it writes no depth: damage3d's smoke and fire (drawn
       after it, renderOrder 11 and 12) behind the fence are not clipped by
       the 2.1 m band its mipmapped alpha covers */
    T.fence = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.5,
                                               transparent: true, alphaTest: 0.05, depthWrite: false,
                                               side: THREE.DoubleSide });
    t = texOf(THREE, "link", linkCanvas(), false);
    if (t) T.fence.map = t; else { T.fence.color.setHex(0xa8acae); T.fence.opacity = 0.3; }
    return T;
  }

  /* ============================================================ batching
     Every static part lands in one Batch per material and group and goes
     out as one mesh.  A part's UVs are made when it is added, from where
     it ends up, by one of the projections below. */
  function Batch() { this.p = []; this.n = []; this.u = []; }
  Batch.prototype.add = function (geo, uvf) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var base = this.p.length / 3, i;
    for (i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
      this.u.push(U ? U.getX(i) : 0, U ? U.getY(i) : 0);
    }
    if (uvf) uvf(this.p, this.u, base, P.count);
  };
  Batch.prototype.mesh = function (THREE, mtl, name) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    var m = new THREE.Mesh(g, mtl);
    m.name = name;
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* face of a triangle: 0 up/down, 1 facing x, 2 facing y */
  function facing(p, o) {
    var ux = p[o + 3] - p[o], uy = p[o + 4] - p[o + 1], uz = p[o + 5] - p[o + 2];
    var vx = p[o + 6] - p[o], vy = p[o + 7] - p[o + 1], vz = p[o + 8] - p[o + 2];
    var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
    return nz >= nx && nz >= ny ? 0 : (nx >= ny ? 1 : 2);
  }
  /* box projection in metres: sides take (along, height / vS) so a canvas
     band lands at a fixed height; tops take the plan */
  function uvBox(S, vS, z0) {
    z0 = z0 || 0;
    return function (p, u, base, count) {
      for (var t = base; t < base + count; t += 3) {
        var f = facing(p, t * 3);
        for (var k = 0; k < 3; k++) {
          var i = t + k, x = p[i * 3], y = p[i * 3 + 1], z = p[i * 3 + 2];
          if (f === 0) { u[i * 2] = x / S; u[i * 2 + 1] = y / S; }
          else if (f === 1) { u[i * 2] = y / S; u[i * 2 + 1] = (z - z0) / vS; }
          else { u[i * 2] = x / S; u[i * 2 + 1] = (z - z0) / vS; }
        }
      }
    };
  }
  /* the pad painting, in plan */
  function uvYard(p, u, base, count) {
    for (var i = base; i < base + count; i++) {
      u[i * 2] = Math.min(0.999, Math.max(0.001, (p[i * 3] + 30) / 60));
      u[i * 2 + 1] = Math.min(0.999, Math.max(0.262, 0.25 + 0.75 * (p[i * 3 + 1] + 30) / 60));
    }
  }
  /* one atlas swatch stretched over the part's own box, each face on its
     own two axes: a timber pack shows its boards on every face */
  function uvSwatch(k) {
    var e = 6 / 1024, u0 = k * 0.25 + e, u1 = (k + 1) * 0.25 - e, v0 = e, v1 = 0.25 - e;
    return function (p, u, base, count) {
      var lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9], i, a;
      for (i = base; i < base + count; i++) for (a = 0; a < 3; a++) {
        lo[a] = Math.min(lo[a], p[i * 3 + a]); hi[a] = Math.max(hi[a], p[i * 3 + a]);
      }
      function nrm(a, v) { return hi[a] - lo[a] > 1e-6 ? (v - lo[a]) / (hi[a] - lo[a]) : 0.5; }
      /* the swatch's grain runs along u: put u on the part's longest axis */
      var long = (hi[0] - lo[0]) >= (hi[1] - lo[1]) ? 0 : 1;
      for (var t = base; t < base + count; t += 3) {
        var f = facing(p, t * 3);
        for (var q = 0; q < 3; q++) {
          i = t + q;
          var ax, ay;
          if (f === 0) { ax = long; ay = 1 - long; }
          else if (f === 1) { ax = 1; ay = 2; }
          else { ax = 0; ay = 2; }
          u[i * 2] = lerp(u0, u1, nrm(ax, p[i * 3 + ax]));
          u[i * 2 + 1] = lerp(v0, v1, nrm(ay, p[i * 3 + ay]));
        }
      }
    };
  }

  /* ============================================================ builder */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var root = new THREE.Group();
    root.name = "conyard";
    var i, j, k, s;
    var R = rng(20220);

    /* the batches: YARD meshes are the broad ones, nothing in them taller
       than the container roofs; TALL holds the crane and the plant, all on
       the line y ~ -24.5, never more than 7 m across; MAST the office mast */
    var GRP = { yard: {}, tall: {}, mast: {} };
    function bt(grp, key) { return GRP[grp][key] || (GRP[grp][key] = new Batch()); }
    /* a part with no UVs of its own takes its material's projection */
    var DEFUV = {};
    function put(grp, key, geo, uvf) {
      if (!uvf && !geo.getAttribute("uv") && DEFUV[key]) uvf = DEFUV[key];
      bt(grp, key).add(geo, uvf || null);
      return geo;
    }
    function setUV(geo, fn) {
      var P = geo.getAttribute("position"), U = new Float32Array(P.count * 2);
      for (var q = 0; q < P.count; q++) {
        var r = fn(P.getX(q), P.getY(q), P.getZ(q));
        U[q * 2] = r[0]; U[q * 2 + 1] = r[1];
      }
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      return geo;
    }

    /* ---- geometry kit ---- */
    var _o = new THREE.Object3D();
    function place(geo, x, y, z, rx, ry, rz) {
      _o.position.set(x || 0, y || 0, z || 0);
      _o.rotation.set(rx || 0, ry || 0, rz || 0);
      _o.scale.set(1, 1, 1);
      _o.updateMatrix();
      geo.applyMatrix4(_o.matrix);
      return geo;
    }
    function box(sx, sy, sz, x, y, z, rz) { return place(new THREE.BoxGeometry(sx, sy, sz), x, y, z, 0, 0, rz || 0); }
    /* a box from its corners */
    function bb(x0, x1, y0, y1, z0, z1) {
      var t;
      if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
      if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
      if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
      return box(x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    }
    /* vertical cylinder standing on z0 */
    function cylZ(rt, rb, h, seg, x, y, z0, open) {
      var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
      g.rotateX(PI / 2);
      return place(g, x, y, z0 + h / 2);
    }
    /* a member from p to q: a lattice chord, a strut, a rope */
    var _v0 = new THREE.Vector3(0, 1, 0), _v1 = new THREE.Vector3();
    function bar(p, q, r, seg, capped, r2) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 4, 1, !capped);
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx / L, dy / L, dz / L)));
      g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      return g;
    }
    /* A convex solid from its faces, each wound to face away from the
       solid's centre, so no caller has to get an order right. */
    function convex(faces) {
      var c = [0, 0, 0], n = 0, f, a, b, d, out = [];
      for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
        c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
      }
      c[0] /= n; c[1] /= n; c[2] /= n;
      for (i = 0; i < faces.length; i++) {
        f = faces[i]; a = f[0];
        for (j = 1; j < f.length - 1; j++) {
          b = f[j]; d = f[j + 1];
          var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
          var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
          var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
          if ((a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz >= 0) out.push(a, b, d);
          else out.push(a, d, b);
        }
      }
      var pos = [];
      for (i = 0; i < out.length; i++) pos.push(out[i][0], out[i][1], out[i][2]);
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      return g;
    }
    /* a closed solid between two rings with the same corner count */
    function loft2(A, B) {
      var faces = [A.slice(), B.slice()], n = A.length;
      for (var q = 0; q < n; q++) faces.push([A[q], A[(q + 1) % n], B[(q + 1) % n], B[q]]);
      return convex(faces);
    }
    /* a convex section in the YZ plane, [y, z], run along X from x0 to x1 */
    function prismX(sec, x0, x1) {
      return loft2(sec.map(function (q) { return [x0, q[0], q[1]]; }), sec.map(function (q) { return [x1, q[0], q[1]]; }));
    }
    function prismY(sec, y0, y1) {       /* section [x, z] run along Y */
      return loft2(sec.map(function (q) { return [q[0], y0, q[1]]; }), sec.map(function (q) { return [q[0], y1, q[1]]; }));
    }
    /* a single-sided quad facing along n: windows, louvres, door panels */
    function quad(a, b, c, d, n) {
      var pos = [a, b, c, a, c, d], ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      if ((uy * vz - uz * vy) * n[0] + (uz * vx - ux * vz) * n[1] + (ux * vy - uy * vx) * n[2] < 0) pos = [a, c, b, a, d, c];
      var arr = [];
      pos.forEach(function (q) { arr.push(q[0], q[1], q[2]); });
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      g.computeVertexNormals();
      return g;
    }
    function tri3(a, b, c, n) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      if ((uy * vz - uz * vy) * n[0] + (uz * vx - ux * vz) * n[1] + (ux * vy - uy * vx) * n[2] < 0) { var t = b; b = c; c = t; }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]], 3));
      g.computeVertexNormals();
      return g;
    }
    /* a panel on a wall: the wall faces along axis ("x" or "y") with sign
       sg, at coordinate w; the panel spans a..b along the wall, z0..z1 */
    function wallPanel(axis, sg, w, a, b, z0, z1, off) {
      var o = w + sg * (off === undefined ? 0.025 : off);
      if (axis === "x") return quad([o, a, z0], [o, b, z0], [o, b, z1], [o, a, z1], [sg, 0, 0]);
      return quad([a, o, z0], [b, o, z0], [b, o, z1], [a, o, z1], [0, sg, 0]);
    }
    var BOXUV = uvBox(4.0, CH, PAD), CONCUV = uvBox(3.0, 3.0, PAD);
    DEFUV.box = BOXUV; DEFUV.conc = CONCUV;

    /* ================================================== the graded pad */
    (function () {
      var H = 29.85, E = 30.0;
      var top = quad([-H, -H, PAD], [H, -H, PAD], [H, H, PAD], [-H, H, PAD], [0, 0, 1]);
      put("yard", "ground", top, uvYard);
      /* the graded edge, falling to the ground outside */
      var c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      for (k = 0; k < 4; k++) {
        var a = c[k], b = c[(k + 1) % 4];
        var nx = (a[0] + b[0]) / 2, ny = (a[1] + b[1]) / 2;
        put("yard", "ground", quad([a[0] * H, a[1] * H, PAD], [b[0] * H, b[1] * H, PAD],
                                   [b[0] * E, b[1] * E, 0], [a[0] * E, a[1] * E, 0], [nx, ny, 1]), uvYard);
      }
    })();

    /* ====================================================== the fence
       7 ft (2.13 m) of chain-link on line posts at 10 ft (3.05 m), heavier
       posts at the ends and the gate, a top rail; a double swing gate,
       open, in the north side. */
    (function () {
      var FH = 2.13, zt = PAD + FH;
      var sides = [
        { a: [-FEN, -FEN], b: [FEN, -FEN], o: [0, -1] },
        { a: [FEN, -FEN], b: [FEN, FEN], o: [1, 0] },
        { a: [FEN, FEN], b: [GATE, FEN], o: [0, 1] },
        { a: [-GATE, FEN], b: [-FEN, FEN], o: [0, 1] },
        { a: [-FEN, FEN], b: [-FEN, -FEN], o: [-1, 0] },
      ];
      sides.forEach(function (sd) {
        var dx = sd.b[0] - sd.a[0], dy = sd.b[1] - sd.a[1], L = Math.sqrt(dx * dx + dy * dy);
        var n = Math.max(1, Math.ceil(L / 3.05));
        for (var q = 0; q <= n; q++) {
          var t = q / n, x = sd.a[0] + dx * t, y = sd.a[1] + dy * t;
          var end = q === 0 || q === n;
          put("yard", "steel", cylZ(end ? 0.07 : 0.05, end ? 0.07 : 0.05, FH + 0.08, 3, x, y, PAD, true));
        }
        /* the top rail, one member per side */
        put("yard", "steel", bar([sd.a[0], sd.a[1], zt], [sd.b[0], sd.b[1], zt], 0.03, 4));
        /* the fabric, one quad each way, u along the run in 0.4 m tiles */
        var fab = quad([sd.a[0], sd.a[1], PAD + 0.05], [sd.b[0], sd.b[1], PAD + 0.05],
                       [sd.b[0], sd.b[1], zt], [sd.a[0], sd.a[1], zt], [sd.o[0], sd.o[1], 0]);
        var U = fab.getAttribute("uv") ? null : new Float32Array(12), P = fab.getAttribute("position");
        for (q = 0; q < P.count; q++) {
          var along = Math.abs(P.getX(q) - sd.a[0]) + Math.abs(P.getY(q) - sd.a[1]);
          U[q * 2] = along / 0.4; U[q * 2 + 1] = (P.getZ(q) - PAD) / 0.4;
        }
        fab.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        put("yard", "fence", fab);
      });
      /* the gate: two 4 m leaves standing open, swung in against the lane */
      for (s = -1; s <= 1; s += 2) {
        var gx = s * GATE, y0 = FEN, y1 = FEN - 3.9;
        put("yard", "steel", bar([gx, y0, PAD + 0.1], [gx, y1, PAD + 0.1], 0.03, 4));
        put("yard", "steel", bar([gx, y0, zt - 0.05], [gx, y1, zt - 0.05], 0.03, 4));
        put("yard", "steel", bar([gx, y1, PAD + 0.1], [gx, y1, zt - 0.05], 0.03, 4));
        put("yard", "steel", bar([gx, y1, PAD + 0.1], [gx, y0, zt - 0.05], 0.02, 3));
        var lf = quad([gx, y0, PAD + 0.1], [gx, y1, PAD + 0.1], [gx, y1, zt - 0.05], [gx, y0, zt - 0.05], [s, 0, 0]);
        var LU = new Float32Array(12), LP = lf.getAttribute("position");
        for (var q2 = 0; q2 < LP.count; q2++) { LU[q2 * 2] = (y0 - LP.getY(q2)) / 0.4; LU[q2 * 2 + 1] = (LP.getZ(q2) - PAD) / 0.4; }
        lf.setAttribute("uv", new THREE.BufferAttribute(LU, 2));
        put("yard", "fence", lf);
      }
    })();

    /* rebar: 12 m bundles on three dunnage timbers, along x or along y */
    function rebar(x0, y0, n, alongY) {
      [0.6, 6.0, 11.4].forEach(function (d) {
        if (alongY) put("yard", "ground", bb(x0 - 0.3, x0 + n * 0.46 + 0.1, y0 + d - 0.1, y0 + d + 0.1, PAD, PAD + 0.2), uvSwatch(ATLAS.timber));
        else put("yard", "ground", bb(x0 + d - 0.1, x0 + d + 0.1, y0 - 0.3, y0 + n * 0.46 + 0.1, PAD, PAD + 0.2), uvSwatch(ATLAS.timber));
      });
      for (var q = 0; q < n; q++) {
        var o = q * 0.46 + 0.1;
        if (alongY) put("yard", "dark", bar([x0 + o, y0, PAD + 0.38], [x0 + o, y0 + 12.0, PAD + 0.38], 0.19, 6, true));
        else put("yard", "dark", bar([x0, y0 + o, PAD + 0.38], [x0 + 12.0, y0 + o, PAD + 0.38], 0.19, 6, true));
      }
    }

    /* ============================================ container blocks
       A container as a box with its corrugated paint box-projected, the
       corner posts a shade proud so the stack reads as boxes on boxes. */
    function container(x0, y0, z0, alongX, len) {
      var L = len || CL, lx = alongX ? L : CW, ly = alongX ? CW : L;
      /* 15 mm short each way: a dark line between neighbours.  The side
         rails and corner posts are in the paint: posts as boxes cost more
         than the container */
      put("yard", "box", bb(x0 + 0.015, x0 + lx - 0.015, y0 + 0.015, y0 + ly - 0.015, z0, z0 + CH), BOXUV);
    }
    /* windows and doors are flush panels 25 mm off the wall */
    function win(axis, sg, w, a, z0, wd, ht) { put("yard", "dark", wallPanel(axis, sg, w, a, a + wd, z0, z0 + ht)); }
    function door(axis, sg, w, a, z0) {
      put("yard", "steel", wallPanel(axis, sg, w, a, a + 0.92, z0 + 0.05, z0 + 2.05));
      put("yard", "dark", wallPanel(axis, sg, w, a + 0.3, a + 0.62, z0 + 1.35, z0 + 1.85, 0.035));
    }
    /* split air conditioner outdoor unit on a wall bracket, fan to the air */
    function aircon(axis, sg, w, a, z) {
      var d = 0.34, cxw = w + sg * (d / 2 + 0.06);
      if (axis === "x") {
        put("yard", "steel", box(d, 0.86, 0.62, cxw, a, z));
        put("yard", "dark", place(new THREE.CircleGeometry(0.22, 10), cxw + sg * (d / 2 + 0.005), a - 0.12, z, 0, sg * PI / 2, 0));
      } else {
        put("yard", "steel", box(0.86, d, 0.62, a, cxw, z));
        put("yard", "dark", place(new THREE.CircleGeometry(0.22, 10), a - 0.12, cxw + sg * (d / 2 + 0.005), z, -sg * PI / 2, 0, 0));
      }
    }
    /* a steel walkway on posts, with its handrail */
    function rail(pts, z) {
      for (var q = 0; q < pts.length - 1; q++) {
        var a = pts[q], b = pts[q + 1];
        put("yard", "steel", bar([a[0], a[1], z + 1.05], [b[0], b[1], z + 1.05], 0.025, 3));
        put("yard", "steel", bar([a[0], a[1], z + 0.55], [b[0], b[1], z + 0.55], 0.018, 3));
        var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), n = Math.max(1, Math.round(L / 2.0));
        for (var r = 0; r <= n; r++) {
          if (q > 0 && r === 0) continue;
          put("yard", "steel", bar([a[0] + dx * r / n, a[1] + dy * r / n, z], [a[0] + dx * r / n, a[1] + dy * r / n, z + 1.07], 0.025, 3));
        }
      }
    }
    /* a straight steel stair from (a, z1) down to (b, z0), w wide across,
       treads every 0.2 m of rise */
    function stair(ax, ay, bx, by, z1, z0, w) {
      var dx = bx - ax, dy = by - ay, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
      var nx = -uy * w / 2, ny = ux * w / 2, n = Math.round((z1 - z0) / 0.2), s;
      for (s = -1; s <= 1; s += 2) {
        put("yard", "steel", bar([ax + s * nx, ay + s * ny, z1], [bx + s * nx, by + s * ny, z0], 0.07, 4, true));
        put("yard", "steel", bar([ax + s * nx, ay + s * ny, z1 + 1.0], [bx + s * nx, by + s * ny, z0 + 1.0], 0.025, 3));
        put("yard", "steel", bar([bx + s * nx, by + s * ny, z0], [bx + s * nx, by + s * ny, z0 + 1.0], 0.025, 3));
      }
      /* the treads, top faces only: from a camera above the underside
         of a tread is never seen */
      for (var q = 1; q < n; q++) {
        var t = q / n, cxq = ax + dx * t, cyq = ay + dy * t, zq = lerp(z1, z0, t) - 0.01;
        var hx = Math.abs(ux) > 0.5 ? 0.13 : w / 2, hy = Math.abs(ux) > 0.5 ? w / 2 : 0.13;
        put("yard", "steel", quad([cxq - hx, cyq - hy, zq], [cxq + hx, cyq - hy, zq], [cxq + hx, cyq + hy, zq], [cxq - hx, cyq + hy, zq], [0, 0, 1]));
      }
    }

    /* ---- the site office (A): four containers side by side, long axis
       north, three high but for the west one.  Doors on the north ends
       open onto a walkway at each level; a stair runs down to the east
       from the first, and a flight climbs back west from a bay on the
       first to the second; windows in the long sides, air conditioners
       on them.  The third storey is where render3d stands its period kit
       (see the header): every spot of it on this block is on that roof. */
    (function () {
      var z0 = PAD, z1 = PAD + CH, z2 = PAD + 2 * CH, z3 = PAD + 3 * CH, yN = AY0 + CL, xE = AX0 + 4 * CW;
      var xm0 = AX0 + CW, xm1 = xE, xs = xm1 - 0.9 - 2 * CW + 0.9;
      for (k = 0; k < 4; k++) for (j = 0; j < 3; j++) {
        if (j === 2 && k === 0) continue;
        container(AX0 + k * CW, AY0, z0 + j * CH, false);
      }
      for (j = 0; j < 3; j++) {
        var zb = z0 + j * CH;
        for (k = 0; k < 4; k++) {
          if (j === 2 && k === 0) continue;
          var xa = AX0 + k * CW;
          if (j) door("y", 1, yN, xa + 0.22, zb);
          else win("y", 1, yN, xa + 0.3, zb + 1.0, 0.85, 0.95);
          win("y", 1, yN, xa + 1.35, zb + 1.0, 0.85, 0.95);
          win("y", -1, AY0, xa + 0.62, zb + 1.0, 1.2, 0.95);
        }
        win("x", 1, xE, AY0 + 0.9, zb + 1.0, 1.4, 1.0);
        win("x", 1, xE, AY0 + 3.6, zb + 1.0, 1.4, 1.0);
        aircon("x", 1, xE, AY0 + 2.95, zb + 0.75);
        var xw = j < 2 ? AX0 : xm0;
        win("x", -1, xw, AY0 + 1.2, zb + 1.0, 1.4, 1.0);
        win("x", -1, xw, AY0 + 3.9, zb + 1.0, 1.4, 1.0);
        aircon("x", -1, xw, AY0 + 0.55, zb + 0.75);
      }
      /* the ground-floor offices open on the east long side */
      door("x", 1, xE, AY0 + 5.0, z0);
      /* walkway at the first floor, the full width and out over the stair
         head, with the bay the upper flight lands on at its west end */
      put("yard", "steel", bb(AX0, xE + 1.2, yN, yN + 1.2, z1 - 0.1, z1));
      put("yard", "steel", bb(xs - 1.2, xs, yN + 1.2, yN + 2.4, z1 - 0.1, z1));
      [AX0 + 0.1, xs - 1.1, xs - 0.1, xE + 1.1].forEach(function (x, q) {
        var yp = yN + (q === 1 || q === 2 ? 2.3 : 1.12);
        put("yard", "steel", bar([x, yp, z0], [x, yp, z1 - 0.1], 0.06, 4));
      });
      rail([[AX0 + 0.02, yN], [AX0 + 0.02, yN + 1.15], [xs - 1.2, yN + 1.15], [xs - 1.2, yN + 2.35], [xs - 0.05, yN + 2.35]], z1);
      rail([[xs + 0.1, yN + 1.15], [xE + 1.2, yN + 1.15]], z1);
      stair(xE + 1.2, yN + 0.6, xE + 5.4, yN + 0.6, z1, z0, 1.0);
      /* the second floor: its walkway, the landing at its east end, and
         the flight down to the first floor's bay */
      put("yard", "steel", bb(xm0, xm1, yN, yN + 1.2, z2 - 0.1, z2));
      put("yard", "steel", bb(xm1 - 0.9, xm1, yN + 1.2, yN + 2.4, z2 - 0.1, z2));
      put("yard", "steel", bar([xm1 - 0.1, yN + 2.3, z1], [xm1 - 0.1, yN + 2.3, z2 - 0.1], 0.06, 4));
      rail([[xm0 + 0.02, yN], [xm0 + 0.02, yN + 1.15], [xm1 - 0.9, yN + 1.15]], z2);
      rail([[xm1 - 0.02, yN + 0.05], [xm1 - 0.02, yN + 2.35]], z2);
      stair(xm1 - 0.9, yN + 1.8, xs, yN + 1.8, z2, z1, 1.0);
      /* team: a recognition panel pegged out on the east box's roof, where
         the camera looks and clear of the era kit render3d stands on the
         west half of this roof (x 12-16.6: the array, the lattice mast, the
         dish; the e50 whip is at x 18.0, just west of the panel) */
      var cxp = AX0 + 3.5 * CW;
      put("yard", "team", bb(cxp - 0.9, cxp + 0.9, AY0 + 0.6, AY0 + CL - 0.6, z3, z3 + 0.04));
    })();

    /* ---- the stores and plant laboratory (B): four containers side by
       side, long axis east.  Below, cargo doors on the east ends with their
       locking bars; above, office containers for the lab and the plant
       office, and the middle pair a third storey, each floor with its
       walkway on the east ends: a stair down to the north from the first,
       a flight from the second down to the first's bay at its south end. */
    (function () {
      var z0 = PAD, z1 = PAD + CH, z2 = PAD + 2 * CH, z3 = PAD + 3 * CH, xE = BX0 + CL, yN = BY0 + 4 * CW;
      var ym0 = BY0 + CW, ym1 = BY0 + 3 * CW;
      for (k = 0; k < 4; k++) for (j = 0; j < 3; j++) {
        if (j === 2 && (k === 0 || k === 3)) continue;
        container(BX0, BY0 + k * CW, z0 + j * CH, true);
      }
      for (k = 0; k < 4; k++) {
        var ya = BY0 + k * CW;
        /* cargo doors: the door seam and four locking bars */
        put("yard", "dark", wallPanel("x", 1, xE, ya + CW / 2 - 0.02, ya + CW / 2 + 0.02, z0 + 0.12, z0 + CH - 0.12, 0.03));
        [0.3, 0.75, 1.69, 2.14].forEach(function (o) {
          put("yard", "steel", bar([xE + 0.05, ya + o, z0 + 0.15], [xE + 0.05, ya + o, z0 + CH - 0.15], 0.025, 3));
        });
        for (j = 1; j < 3; j++) {
          if (j === 2 && (k === 0 || k === 3)) continue;
          var zb = z0 + j * CH;
          door("x", 1, xE, ya + 0.2, zb);
          win("x", 1, xE, ya + 1.35, zb + 1.0, 0.85, 0.95);
          win("x", -1, BX0, ya + 0.6, zb + 1.0, 1.2, 0.95);
        }
      }
      win("y", 1, yN, BX0 + 1.0, z1 + 1.0, 1.4, 1.0);
      win("y", 1, yN, BX0 + 3.7, z1 + 1.0, 1.4, 1.0);
      win("y", -1, BY0, BX0 + 1.4, z1 + 1.0, 1.4, 1.0);
      aircon("y", 1, yN, BX0 + 2.9, z1 + 0.75);
      aircon("y", 1, yN, BX0 + 5.3, z1 + 0.75);
      aircon("y", -1, BY0, BX0 + 4.4, z1 + 0.75);
      /* first floor: walkway on the east ends, the bay at the south end
         for the upper flight, the stair down to the north */
      put("yard", "steel", bb(xE, xE + 1.2, BY0, yN + 1.2, z1 - 0.1, z1));
      put("yard", "steel", bb(xE + 1.2, xE + 2.4, BY0, ym0, z1 - 0.1, z1));
      [BY0 + 0.1, ym1, yN + 1.1].forEach(function (y) {
        put("yard", "steel", bar([xE + 1.12, y, z0], [xE + 1.12, y, z1 - 0.1], 0.06, 4));
      });
      put("yard", "steel", bar([xE + 2.3, BY0 + 0.1, z0], [xE + 2.3, BY0 + 0.1, z1 - 0.1], 0.06, 4));
      rail([[xE, BY0 + 0.02], [xE + 2.35, BY0 + 0.02], [xE + 2.35, ym0 - 0.05]], z1);
      rail([[xE + 1.15, ym0 + 0.1], [xE + 1.15, yN + 1.2]], z1);
      stair(xE + 0.6, yN + 1.2, xE + 0.6, yN + 5.4, z1, z0, 1.0);
      /* second floor walkway, its north landing, the flight down south */
      put("yard", "steel", bb(xE, xE + 1.2, ym0, ym1, z2 - 0.1, z2));
      put("yard", "steel", bb(xE + 1.2, xE + 2.4, ym1 - 0.9, ym1, z2 - 0.1, z2));
      put("yard", "steel", bar([xE + 2.3, ym1 - 0.1, z1], [xE + 2.3, ym1 - 0.1, z2 - 0.1], 0.06, 4));
      rail([[xE, ym1 - 0.02], [xE + 2.35, ym1 - 0.02]], z2);
      rail([[xE + 1.15, ym0 + 0.02], [xE + 1.15, ym1 - 0.9]], z2);
      stair(xE + 1.8, ym1 - 0.9, xE + 1.8, ym0, z2, z1, 1.0);
      /* team: a recognition panel on the north box's roof, a storey down
         from the one the era kit stands on (the radome, the brick stack)
         and in front of it from the camera */
      var cyp = BY0 + 3.5 * CW;
      put("yard", "team", bb(BX0 + 1.1, BX0 + CL - 1.1, cyp - 0.9, cyp + 0.9, z2, z2 + 0.04));
    })();

    /* ---- the generator set: a 20 ft container genset beside the crane
       it powers, radiator louvres at its west end and down its sides, the
       exhaust out of the roof, its cable laid across to the crane */
    (function () {
      var x0 = 21.5, y0 = -21.2;
      container(x0, y0, PAD, true);
      put("yard", "dark", wallPanel("x", -1, x0, y0 + 0.3, y0 + CW - 0.3, PAD + 0.4, PAD + CH - 0.4));
      for (s = 0; s < 2; s++) {
        var yw = s ? y0 + CW : y0, sg = s ? 1 : -1;
        put("yard", "dark", wallPanel("y", sg, yw, x0 + 0.5, x0 + 1.9, PAD + 0.8, PAD + 2.0));
        put("yard", "dark", wallPanel("y", sg, yw, x0 + 4.2, x0 + 5.6, PAD + 0.8, PAD + 2.0));
        door("y", sg, yw, x0 + 2.6, PAD);
      }
      put("yard", "dark", cylZ(0.12, 0.12, 1.25, 8, x0 + 5.2, y0 + 1.22, PAD + CH, true));
      /* and a recognition panel on its roof, forward of the exhaust */
      put("yard", "team", bb(x0 + 0.6, x0 + 4.4, y0 + 0.32, y0 + CW - 0.32, PAD + CH, PAD + CH + 0.04));
      put("yard", "dark", cylZ(0.2, 0.2, 0.3, 8, x0 + 5.2, y0 + 1.22, PAD + CH));
      /* the power cable to the crane, laid on the ground */
      put("yard", "dark", bar([x0 + 0.4, y0 + 0.6, PAD + 0.04], [CX - 0.6, CY + 1.2, PAD + 0.04], 0.04, 3));
    })();

    /* ---- the plant workshop: a fabric canopy on curved trusses, roofed
       across two walls of 40 ft (12.192 m) containers stacked two high and
       two long, the way engineer units cover a maintenance bay and a rebar
       shop without putting up a building: the containers are its walls and
       its stores.  10 m clear between the walls, 5.3 m to the eaves; the
       trusses are clamped to the walls' outer top rails, so the fabric
       keeps the sun and the rain off the boxes too, and the roof rises
       2.54 m over its 14.9 m, its crown just under the office's
       third-storey roof (see the header).  Its gable is closed at the north
       end, against the office; the south end is open to the lane along the
       plant; the fabric is drawn inside and out.  It is the broadest roof
       in the yard, which is where damage3d.js burns a building: sprung from
       the outer rails it is one region on damage3d's height map, where
       sprung from mid-wall its west third was a separate, lower one. */
    (function () {
      var L40 = 12.192, xw = 5.0, xe = xw + CW + 10.0, y0 = -16.9, y1 = y0 + 2 * L40;
      for (k = 0; k < 2; k++) for (j = 0; j < 2; j++) {
        container(xw, y0 + k * L40, PAD + j * CH, false, L40);
        container(xe, y0 + k * L40, PAD + j * CH, false, L40);
      }
      [xw, xe].forEach(function (x) {
        put("yard", "dark", wallPanel("y", -1, y0, x + CW / 2 - 0.02, x + CW / 2 + 0.02, PAD + 0.12, PAD + CH - 0.12, 0.03));
        [0.3, 0.75, 1.69, 2.14].forEach(function (o) {
          put("yard", "steel", bar([x + o, y0 - 0.05, PAD + 0.15], [x + o, y0 - 0.05, PAD + CH - 0.15], 0.025, 3));
        });
      });
      var xc = (xw + xe + CW) / 2, a = (xe + CW - xw) / 2, h = 2.54, zb = PAD + 2 * CH + 0.04, n = 12, ya = y0 - 0.3, yb = y1 + 0.15;
      /* the trusses every 2.25 m are the paint's bands: u runs along the
         canopy, v round the arch, clear of the paint's rails */
      function fuv(x, y, z) { return [(y - y0) / 36, 0.15 + 0.7 * Math.max(0, Math.min(1, (z - zb) / h))]; }
      for (var q = 0; q < n; q++) {
        var t0 = q / n * PI, t1 = (q + 1) / n * PI;
        for (var side = 0; side < 2; side++) {
          var aa = side ? a - 0.05 : a, hh = side ? h - 0.05 : h, sg = side ? -1 : 1;
          var x0 = xc - aa * Math.cos(t0), z0 = zb + hh * Math.sin(t0), x1 = xc - aa * Math.cos(t1), z1 = zb + hh * Math.sin(t1);
          var tm = (t0 + t1) / 2, nrm = [sg * -Math.cos(tm) / a, 0, sg * Math.sin(tm) / h];
          put("yard", "box", setUV(quad([x0, ya, z0], [x1, ya, z1], [x1, yb, z1], [x0, yb, z0], nrm), fuv));
        }
        /* the closed north end, both faces */
        [[0, 1, 0, 0], [0, -1, 0, -0.05]].forEach(function (nn) {
          var yy = yb + nn[3], e0 = [xc - a * Math.cos(t0), yy, zb + h * Math.sin(t0)], e1 = [xc - a * Math.cos(t1), yy, zb + h * Math.sin(t1)];
          var g = tri3([xc, yy, zb], e0, e1, nn);
          put("yard", "box", setUV(g, function (x, y, z) { return [(x - xc) / 36 + 0.5, 0.15 + 0.7 * (z - zb) / h]; }));
        });
      }
      /* the spring beams along each wall's outer top rail */
      for (var sd = -1; sd <= 1; sd += 2)
        put("yard", "steel", bb(xc + sd * (a - 0.24), xc + sd * a, ya, yb, PAD + 2 * CH, zb + 0.02));
      /* under it, the rebar shop: 12 m bundles on dunnage, and the bending
         bench with its cutter */
      rebar(xw + CW + 1.6, y0 + 6.0, 4, true);
      put("yard", "steel", bb(xc + 1.2, xc + 3.8, y0 + 9.5, y0 + 10.6, PAD, PAD + 0.9));
      put("yard", "dark", bb(xc + 1.6, xc + 2.4, y0 + 9.7, y0 + 10.4, PAD + 0.9, PAD + 1.2));
    })();

    /* ================================================= the batching plant
       MEKA MB-60M on its single chassis along the back of the plot, bins at
       the west end, the belt up to the mixer tower, the cement screw down
       to the silo.  Tall, so all of it goes in the TALL meshes. */
    (function () {
      var y = PY;
      /* chassis beams and the jack legs */
      for (s = -1; s <= 1; s += 2) put("tall", "steel", bb(px(0.3), px(12.9), y + s * 0.85, y + s * 1.05, PAD + 0.55, PAD + 0.95));
      [1.45, 6.475, 12.58].forEach(function (x) {
        for (s = -1; s <= 1; s += 2) {
          put("tall", "steel", bb(px(x) - 0.12, px(x) + 0.12, y + s * 1.2, y + s * 1.44, PAD, PAD + 0.95));
          put("tall", "steel", bb(px(x) - 0.25, px(x) + 0.25, y + s * 1.08, y + s * 1.56, PAD, PAD + 0.06));
        }
        put("tall", "steel", bb(px(x) - 0.1, px(x) + 0.1, y - 1.44, y + 1.44, PAD + 0.62, PAD + 0.88));
      });
      /* the travelling axles under the bins, tandem, wheels on the ground */
      [4.4, 5.45].forEach(function (x) {
        for (s = -1; s <= 1; s += 2) {
          var wg = new THREE.CylinderGeometry(0.5, 0.5, 0.36, 10);
          put("tall", "dark", place(wg, px(x), y + s * 1.15, PAD + 0.5));
        }
      });
      /* the bins: two hoppers along the chassis, each split in two across,
         an open box on top of a funnel, 5.66 m to the rim; open-topped, so
         the stone inside is seen from above */
      var ZR = PAD + 5.66, ZV = PAD + 4.6, ZO = PAD + 2.45, HW = 1.6;
      for (k = 0; k < 2; k++) {
        var x0 = px(0.2 + k * 3.2), x1 = x0 + 3.2, xc = (x0 + x1) / 2;
        var ring = [[x0, y - HW], [x1, y - HW], [x1, y + HW], [x0, y + HW]];
        var out = [[xc - 0.35, y - 0.3], [xc + 0.35, y - 0.3], [xc + 0.35, y + 0.3], [xc - 0.35, y + 0.3]];
        for (var e = 0; e < 4; e++) {
          var a = ring[e], b = ring[(e + 1) % 4], oa = out[e], ob = out[(e + 1) % 4];
          var ex = (a[0] + b[0]) / 2 - xc, ey = (a[1] + b[1]) / 2 - y, el = Math.sqrt(ex * ex + ey * ey);
          var nrm = [ex / el, ey / el, 0];
          /* upright walls, outside and in: the lining 40 mm inside the
             skin, the plate's thickness, so neither face sits on the other */
          var ia = [a[0] - nrm[0] * 0.04, a[1] - nrm[1] * 0.04], ib = [b[0] - nrm[0] * 0.04, b[1] - nrm[1] * 0.04];
          put("tall", "steel", quad([a[0], a[1], ZV], [b[0], b[1], ZV], [b[0], b[1], ZR], [a[0], a[1], ZR], nrm));
          put("tall", "steel", quad([ia[0], ia[1], ZV + 0.03], [ib[0], ib[1], ZV + 0.03], [ib[0], ib[1], ZR], [ia[0], ia[1], ZR], [-nrm[0], -nrm[1], 0]));
          /* the funnel, outside (down and out) and in (up and in) */
          put("tall", "steel", quad([a[0], a[1], ZV], [b[0], b[1], ZV], [ob[0], ob[1], ZO], [oa[0], oa[1], ZO], [nrm[0], nrm[1], -0.8]));
          put("tall", "steel", quad([ia[0], ia[1], ZV + 0.03], [ib[0], ib[1], ZV + 0.03], [ob[0], ob[1], ZO + 0.04], [oa[0], oa[1], ZO + 0.04], [-nrm[0], -nrm[1], 0.8]));
        }
        /* rim angle and the divider across */
        put("tall", "steel", bb(x0 - 0.05, x1 + 0.05, y - HW - 0.05, y + HW + 0.05, ZR - 0.12, ZR).translate(0, 0, 0));
        put("tall", "steel", bb(x0, x1, y - 0.03, y + 0.03, ZV - 0.4, ZR - 0.05));
        /* the gate and weigh hopper under each outlet */
        put("tall", "dark", bb(xc - 0.35, xc + 0.35, y - 0.3, y + 0.3, ZO - 0.3, ZO));
        /* the stone: sand in one half, gravel in the other, loaded a metre
           under the rim and heaped where the loader tipped it */
        for (s = -1; s <= 1; s += 2) {
          var hz = ZR - 1.25 + R() * 0.15;
          var sw = uvSwatch(s < 0 ? ATLAS.sand : ATLAS.gravel);
          var pk = [xc + (R() - 0.5) * 1.2, y + s * 0.8, hz + 0.38];
          var c4 = [[x0 + 0.05, y + (s < 0 ? -HW + 0.05 : 0.05), hz], [x1 - 0.05, y + (s < 0 ? -HW + 0.05 : 0.05), hz],
                    [x1 - 0.05, y + (s < 0 ? -0.05 : HW - 0.05), hz], [x0 + 0.05, y + (s < 0 ? -0.05 : HW - 0.05), hz]];
          var pos = [];
          for (e = 0; e < 4; e++) { var p0 = c4[e], p1 = c4[(e + 1) % 4]; pos.push(p0, p1, pk); }
          /* under the container roofs, so in the broad ground mesh */
          put("yard", "ground", convexTop(pos), sw);
        }
        /* legs down to the chassis */
        for (var cx2 = 0; cx2 < 2; cx2++) for (s = -1; s <= 1; s += 2)
          put("tall", "steel", bb((cx2 ? x1 : x0) - 0.1, (cx2 ? x1 : x0) + 0.1, y + s * (HW - 0.1) - 0.1, y + s * (HW - 0.1) + 0.1, PAD + 0.95, ZV));
      }
      /* the weigh belt under the bins and the inclined belt up to the mixer,
         side channels, the dark belt, a walkway rail up one side */
      var B0 = [px(0.6), PAD + 1.75], B1 = [px(5.2), PAD + 1.75], B2 = [px(15.0), PAD + 7.35];
      [[B0, B1], [B1, B2]].forEach(function (sg) {
        for (s = -1; s <= 1; s += 2)
          put("tall", "steel", bar([sg[0][0], y + s * 0.5, sg[0][1]], [sg[1][0], y + s * 0.5, sg[1][1]], 0.13, 4, true));
        put("tall", "dark", bar([sg[0][0], y, sg[0][1] + 0.12], [sg[1][0], y, sg[1][1] + 0.12], 0.36, 4, true));
      });
      put("tall", "steel", bar([B1[0], y + 0.62, B1[1] + 1.0], [B2[0] - 0.4, y + 0.62, B2[1] + 0.8], 0.03, 3));
      /* the A-frame under the belt */
      var zA = lerp(B1[1], B2[1], (px(10.6) - B1[0]) / (B2[0] - B1[0]));
      for (s = -1; s <= 1; s += 2) {
        put("tall", "steel", bar([px(10.0), y + s * 1.3, PAD], [px(10.6), y + s * 0.5, zA - 0.1], 0.08, 4));
        put("tall", "steel", bar([px(11.2), y + s * 1.3, PAD], [px(10.6), y + s * 0.5, zA - 0.1], 0.08, 4));
      }
      /* the mixer tower: four columns, a deck at 4.5 m with its rail, the
         twin-shaft mixer (MEKA yellow) on it, the cement and water weigh
         hoppers over it, and the chute down to 3.4 m for the truck */
      var MX0 = px(12.6), MX1 = px(17.4), ZD = PAD + 4.5, ZT = PAD + 7.0, MH = 1.45;
      for (s = -1; s <= 1; s += 2) for (var ce = 0; ce < 2; ce++)
        put("tall", "steel", bb((ce ? MX1 : MX0) - 0.11, (ce ? MX1 : MX0) + 0.11, y + s * MH - 0.11, y + s * MH + 0.11, PAD, ZT));
      put("tall", "steel", bb(MX0 - 0.2, MX1 + 0.2, y - MH - 0.2, y + MH + 0.2, ZD - 0.15, ZD));
      for (s = -1; s <= 1; s += 2) {
        put("tall", "steel", bb(MX0, MX1, y + s * MH - 0.08, y + s * MH + 0.08, ZT - 0.2, ZT));
        put("tall", "steel", bar([MX0 - 0.2, y + s * (MH + 0.18), ZD + 1.05], [MX1 + 0.2, y + s * (MH + 0.18), ZD + 1.05], 0.025, 3));
        var xe = s > 0 ? MX1 : MX0;
        put("tall", "steel", bb(xe - 0.08, xe + 0.08, y - MH, y + MH, ZT - 0.2, ZT));
      }
      put("tall", "yellow", bb(px(13.7), px(16.3), y - 0.9, y + 0.9, ZD, ZD + 1.25));
      put("tall", "yellow", bb(px(16.3), px(16.95), y - 0.75, y - 0.15, ZD + 0.35, ZD + 0.95));
      put("tall", "yellow", bb(px(16.3), px(16.95), y + 0.15, y + 0.75, ZD + 0.35, ZD + 0.95));
      put("tall", "steel", cylZ(0.62, 0.16, 0.9, 12, px(15.0), y - 0.45, ZD + 1.35));
      put("tall", "steel", cylZ(0.62, 0.62, 0.45, 12, px(15.0), y - 0.45, ZD + 2.25));
      put("tall", "steel", bb(px(13.6), px(14.7), y + 0.2, y + 1.1, ZD + 1.4, ZD + 2.1));
      put("tall", "steel", cylZ(0.42, 0.26, ZD - (PAD + 3.4), 10, px(15.0), y, PAD + 3.4));
      /* the cement screw, 11.5 m at 40 degrees, silo outlet to mixer top,
         its drive at the top end */
      var S0 = [SIX - 0.9, y, PAD + 1.3], S1 = [px(16.1), y - 0.45, PAD + 8.0];
      put("tall", "steel", bar(S0, S1, 0.15, 8, true));
      put("tall", "dark", bb(S1[0] - 0.3, S1[0] + 0.3, S1[1] - 0.25, S1[1] + 0.25, S1[2] - 0.25, S1[2] + 0.25));
      put("tall", "steel", bar([S1[0] + 0.1, S1[1], S1[2] - 0.2], [px(15.2), y - 0.45, ZD + 2.7], 0.12, 6, true));
      /* the silo: 3.065 m across, legs to the cone's shoulder at 4.4 m, the
         barrel to 11.4, the roof rail, the filter to 12.9; the ladder and the
         fill pipe up the side; the 6.46 m steel foundation frame */
      var SZ0 = PAD + 4.4, SZ1 = PAD + 11.4;
      put("tall", "steel", cylZ(SIR, SIR, SZ1 - SZ0, 14, SIX, y, SZ0, true));
      put("tall", "steel", cylZ(SIR, 0.22, SZ0 - (PAD + 1.6), 14, SIX, y, PAD + 1.6, true));
      put("tall", "steel", cylZ(0.22, 0.22, 0.4, 8, SIX, y, PAD + 1.2));
      put("tall", "steel", cylZ(0.3, SIR + 0.05, 0.28, 14, SIX, y, SZ1));
      /* two bands round the barrel: a pale silo is otherwise a tube */
      put("tall", "steel", cylZ(SIR + 0.04, SIR + 0.04, 0.16, 14, SIX, y, PAD + 7.9, true));
      put("tall", "dark", cylZ(SIR + 0.03, SIR + 0.03, 0.12, 14, SIX, y, SZ0 - 0.06, true));
      for (k = 0; k < 8; k++) {
        var aa = k * PI / 4, ab = (k + 1) * PI / 4, rr = SIR - 0.05;
        put("tall", "steel", bar([SIX + rr * Math.cos(aa), y + rr * Math.sin(aa), SZ1 + 1.1], [SIX + rr * Math.cos(ab), y + rr * Math.sin(ab), SZ1 + 1.1], 0.025, 3));
        put("tall", "steel", bar([SIX + rr * Math.cos(aa), y + rr * Math.sin(aa), SZ1], [SIX + rr * Math.cos(aa), y + rr * Math.sin(aa), SZ1 + 1.1], 0.025, 3));
      }
      put("tall", "steel", bb(SIX - 0.4, SIX + 0.4, y - 0.4, y + 0.4, SZ1 + 0.2, PAD + 12.6));
      put("tall", "steel", cylZ(0.2, 0.2, 0.3, 8, SIX, y, PAD + 12.6));
      for (k = 0; k < 4; k++) {
        var al = PI / 4 + k * PI / 2, lx = SIX + 1.12 * Math.cos(al), ly = y + 1.12 * Math.sin(al);
        put("tall", "steel", bar([lx, ly, PAD + 0.2], [lx, ly, SZ0 + 0.2], 0.12, 4, true));
        var al2 = al + PI / 2, mx = SIX + 1.12 * Math.cos(al2), my = y + 1.12 * Math.sin(al2);
        put("tall", "steel", bar([lx, ly, PAD + 0.5], [mx, my, SZ0 - 0.4], 0.05, 3));
        put("tall", "steel", bar([lx, ly, SZ0 - 0.4], [mx, my, PAD + 0.5], 0.05, 3));
      }
      for (s = -1; s <= 1; s += 2) put("tall", "steel", bar([SIX + SIR + 0.25, y + s * 0.22, PAD + 0.3], [SIX + SIR + 0.25, y + s * 0.22, SZ1 + 1.1], 0.03, 3));
      put("tall", "steel", bar([SIX - 0.5, y + SIR + 0.12, PAD + 0.9], [SIX - 0.5, y + SIR + 0.12, SZ1 + 0.3], 0.06, 4));
      var FH2 = 3.23;
      for (s = -1; s <= 1; s += 2) {
        put("tall", "steel", bb(SIX - FH2, SIX + FH2, y + s * FH2 - 0.12, y + s * FH2 + 0.12, PAD, PAD + 0.25));
        put("tall", "steel", bb(SIX + s * FH2 - 0.12, SIX + s * FH2 + 0.12, y - FH2, y + FH2, PAD, PAD + 0.25));
        put("tall", "steel", bar([SIX - FH2, y + s * FH2, PAD + 0.13], [SIX + FH2, y - s * FH2, PAD + 0.13], 0.1, 4));
      }
      /* the control cabin beside the belt, its window toward the mixer */
      var cb0 = px(10.2), cb1 = px(12.4), cy0 = y + 1.55, cy1 = y + 3.35;
      put("yard", "box", bb(cb0, cb1, cy0, cy1, PAD, PAD + 2.45), BOXUV);
      put("yard", "dark", wallPanel("x", 1, cb1, cy0 + 0.3, cy1 - 0.3, PAD + 1.2, PAD + 2.1));
      put("yard", "dark", wallPanel("y", 1, cy1, cb0 + 0.3, cb0 + 1.1, PAD + 1.0, PAD + 1.9));
      door("y", 1, cy1, cb0 + 1.25, PAD);
      aircon("x", -1, cb0, cy0 + 0.9, PAD + 1.6);
    })();

    /* a heap: a fan of triangles from its peak, faces up, flat shaded */
    function convexTop(tris) {
      var pos = [];
      for (var q = 0; q < tris.length; q += 3) {
        var a = tris[q], b = tris[q + 1], c = tris[q + 2];
        var ux = b[0] - a[0], uy = b[1] - a[1], vx = c[0] - a[0], vy = c[1] - a[1];
        if (ux * vy - uy * vx < 0) { var t = b; b = c; c = t; }
        pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      return g;
    }
    /* a stockpile: a ring of points round an elongated base, two rings up
       and a ridge, jittered; wound up and out */
    function stockpile(xc, yc, rx, ry, h, sw, seed) {
      var Rr = rng(seed), n = 14, rings = [[1.0, 0], [0.72, 0.45], [0.38, 0.82]], pts = [], q, r;
      for (r = 0; r < rings.length; r++) {
        var row = [];
        for (q = 0; q < n; q++) {
          var a = q / n * 2 * PI, j2 = r ? 1 + (Rr() - 0.5) * 0.18 : 1;
          row.push([xc + Math.cos(a) * rx * rings[r][0] * j2, yc + Math.sin(a) * ry * rings[r][0] * j2,
                    PAD + h * rings[r][1] + (r ? (Rr() - 0.5) * 0.15 : 0)]);
        }
        pts.push(row);
      }
      var peak = [xc + (Rr() - 0.5) * 0.4, yc, PAD + h];
      var tris = [];
      for (r = 0; r < rings.length - 1; r++) for (q = 0; q < n; q++) {
        var a0 = pts[r][q], a1 = pts[r][(q + 1) % n], b0 = pts[r + 1][q], b1 = pts[r + 1][(q + 1) % n];
        tris.push(a0, a1, b1, a0, b1, b0);
      }
      for (q = 0; q < n; q++) tris.push(pts[2][q], pts[2][(q + 1) % n], peak);
      /* wind every facet to face up: the loft rings run anticlockwise */
      var pos = [];
      for (q = 0; q < tris.length; q += 3) {
        var A = tris[q], B = tris[q + 1], Cc = tris[q + 2];
        var ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = Cc[0] - A[0], vy = Cc[1] - A[1], vz = Cc[2] - A[2];
        var nz = ux * vy - uy * vx, nx = uy * vz - uz * vy, ny = uz * vx - ux * vz;
        var mxp = (A[0] + B[0] + Cc[0]) / 3 - xc, myp = (A[1] + B[1] + Cc[1]) / 3 - yc;
        if (nx * mxp + ny * myp + nz * 0.5 < 0) { var t = B; B = Cc; Cc = t; }
        pos.push(A[0], A[1], A[2], B[0], B[1], B[2], Cc[0], Cc[1], Cc[2]);
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      put("yard", "ground", g, sw);
    }
    /* sand and 20 mm stone for the loader, west of the stores, beside
       the bins they feed */
    stockpile(-26.2, -18.4, 2.9, 2.4, 2.5, uvSwatch(ATLAS.sand), 7);
    stockpile(-22.4, -19.2, 2.5, 2.2, 2.2, uvSwatch(ATLAS.gravel), 11);

    /* ============================================ the tower crane (34 K)
       In the TALL meshes with the plant; parked, the jib weathervaned
       along the plant, the way it was left at the end of the shift. */
    (function () {
      var y = CY, zP = PAD;
      /* timber mats and the outrigger cross, 3.8 x 3.8 m on the pads */
      for (var sx = -1; sx <= 1; sx += 2) for (var sy = -1; sy <= 1; sy += 2) {
        put("yard", "ground", bb(CX + sx * 1.9 - 0.5, CX + sx * 1.9 + 0.5, y + sy * 1.9 - 0.5, y + sy * 1.9 + 0.5, zP, zP + 0.14), uvSwatch(ATLAS.timber));
        put("tall", "dark", bb(CX + sx * 1.9 - 0.3, CX + sx * 1.9 + 0.3, y + sy * 1.9 - 0.3, y + sy * 1.9 + 0.3, zP + 0.14, zP + 0.22));
        put("tall", "steel", bar([CX + sx * 0.5, y + sy * 0.45, zP + 0.62], [CX + sx * 1.9, y + sy * 1.9, zP + 0.36], 0.14, 4, true));
        put("tall", "steel", cylZ(0.09, 0.09, 0.2, 6, CX + sx * 1.9, y + sy * 1.9, zP + 0.2));
      }
      put("tall", "steel", bb(CX - 1.7, CX + 1.7, y - 0.55, y + 0.55, zP + 0.35, zP + 0.8));
      put("tall", "dark", cylZ(0.9, 0.9, 0.2, 16, CX, y, zP + 0.8));
      /* the slewing platform, yellow, the tower on its front and the
         ballast on its back, the winch between them */
      var ZS = zP + 1.0, ZSP = ZS + 0.32;
      put("tall", "yellow", bb(CX - 2.0, CX + 2.5, y - 0.72, y + 0.72, ZS, ZSP));
      put("tall", "dark", place(new THREE.CylinderGeometry(0.32, 0.32, 0.9, 12), CX + 0.35, y, ZSP + 0.34));
      put("tall", "yellow", bb(CX - 0.35, CX - 0.05, y - 0.55, y + 0.55, ZSP, ZSP + 0.85));
      /* ballast: nine blocks, 1.2 x 1.2 x 0.37, each a shade inset over
         the next, on the steel carrier box at the platform's tail.
         Concrete, and under the container roofs, so it can go in the broad
         concrete mesh. */
      put("tall", "steel", bb(CX + 1.25, CX + 2.45, y - 0.6, y + 0.6, ZSP, ZSP + 0.5));
      for (k = 0; k < 9; k++) {
        var zb = ZSP + 0.5 + k * 0.37;
        put("yard", "conc", bb(CX + 1.25, CX + 2.45, y - 0.6, y + 0.6, zb + 0.02, zb + 0.35), CONCUV);
        put("yard", "conc", bb(CX + 1.29, CX + 2.41, y - 0.56, y + 0.56, zb, zb + 0.02), CONCUV);
      }
      /* the tower: 0.9 m square, four chords and zig-zag lacing on each
         face, from the platform to the jib heel */
      var z0 = ZSP, z1 = ZJ0, corners = [[TX - TWH, y - TWH], [TX + TWH, y - TWH], [TX + TWH, y + TWH], [TX - TWH, y + TWH]];
      for (k = 0; k < 4; k++) put("tall", "yellow", bar([corners[k][0], corners[k][1], z0], [corners[k][0], corners[k][1], z1], 0.065, 4));
      var np = Math.round((z1 - z0) / 0.9), pz = (z1 - z0) / np;
      for (k = 0; k < 4; k++) {
        var ca = corners[k], cb = corners[(k + 1) % 4];
        for (var q = 0; q < np; q++) {
          var za = z0 + q * pz, zc = za + pz, pA = q % 2 ? ca : cb, pB = q % 2 ? cb : ca;
          put("tall", "yellow", bar([pA[0], pA[1], za], [pB[0], pB[1], zc], 0.03, 3));
        }
      }
      /* the raking struts at the tower foot, from the platform up to the
         tower 3 m up, and the pivot boss */
      for (s = -1; s <= 1; s += 2) put("tall", "yellow", bar([CX + 0.45, y + s * 0.62, ZSP], [TX + TWH, y + s * TWH, ZSP + 3.0], 0.11, 4));
      put("tall", "yellow", bb(TX - TWH - 0.1, TX + TWH + 0.1, y - TWH - 0.1, y + TWH + 0.1, ZSP, ZSP + 0.9));

      /* the jib: triangular, apex up, bottom chords 0.8 m apart that the
         trolley runs on, 0.7 m deep, rising 0.8 m heel to tip */
      function zb2(x) { return lerp(ZJ0, ZJ1, (XJH - x) / (XJH - XJT)); }
      function Lc(x) { return [x, y - JWH, zb2(x)]; }
      function Rc(x) { return [x, y + JWH, zb2(x)]; }
      function Tc(x) { return [x, y, zb2(x) + JD]; }
      put("tall", "yellow", bar(Lc(XJH), Lc(XJT), 0.06, 4));
      put("tall", "yellow", bar(Rc(XJH), Rc(XJT), 0.06, 4));
      put("tall", "yellow", bar(Tc(XJH), Tc(XJT + 0.4), 0.06, 4));
      var nj = Math.round((XJH - XJT) / 1.2), pj = (XJH - XJT) / nj;
      for (q = 0; q < nj; q++) {
        var xa = XJH - q * pj, xb = xa - pj, xm = (xa + xb) / 2;
        put("tall", "yellow", bar(Lc(xa), Tc(xm), 0.028, 3));
        put("tall", "yellow", bar(Tc(xm), Lc(xb), 0.028, 3));
        put("tall", "yellow", bar(Rc(xa), Tc(xm), 0.028, 3));
        put("tall", "yellow", bar(Tc(xm), Rc(xb), 0.028, 3));
        /* the bottom face is laced only every other panel: from above it
           is seen through the sides, and it is the trolley's track */
        if (q % 2) put("tall", "yellow", bar(Lc(xa), Rc(xb), 0.025, 3));
      }
      put("tall", "yellow", bar(Lc(XJT), Rc(XJT), 0.04, 3));
      put("tall", "yellow", bar(Lc(XJT), Tc(XJT + 0.4), 0.04, 3));
      put("tall", "yellow", bar(Rc(XJT), Tc(XJT + 0.4), 0.04, 3));
      /* the heel box over the tower top */
      put("tall", "yellow", bb(TX - TWH - 0.05, TX + TWH + 0.2, y - JWH - 0.05, y + JWH + 0.05, ZJ0 - 0.45, ZJ0 + 0.05));
      /* the owner's board on both faces by the heel, where the name of the
         hire firm goes: in the team colour */
      for (s = -1; s <= 1; s += 2)
        put("tall", "team", bb(TX - 6.2, TX - 1.2, y + s * (JWH + 0.02), y + s * (JWH + 0.06), zb2(TX - 3.7) + 0.08, zb2(TX - 3.7) + 0.62));
      /* the fold joint's tie strut, grey, 2.2 m over the top chord */
      var tf = Tc(XFOLD), st = [XFOLD, y, tf[2] + 2.2];
      put("tall", "steel", bar([XFOLD - 0.55, y, tf[2]], st, 0.05, 4));
      put("tall", "steel", bar([XFOLD + 0.55, y, tf[2]], st, 0.05, 4));
      /* the tower head and the rear guy frame (grey): front legs from the
         heel to the apex, rear legs down to a point 2.0 m behind the
         slewing axis, a bottom member back from the heel, and the hanger
         down from that point with the guy rope on to the platform */
      var AP = [TX + 0.3, y, APEX], RP = [CX + 2.0, y, ZJ0 + 1.4];
      for (s = -1; s <= 1; s += 2) {
        put("tall", "steel", bar([TX - 0.1, y + s * 0.38, ZJ0 + 0.1], AP, 0.075, 4, true));
        put("tall", "steel", bar(AP, [RP[0], y + s * 0.3, RP[2]], 0.06, 4, true));
        put("tall", "steel", bar([TX + TWH, y + s * 0.38, ZJ0 - 0.3], [RP[0], y + s * 0.3, RP[2]], 0.055, 4, true));
      }
      put("tall", "steel", bar(RP, [RP[0], y, RP[2] - 5.3], 0.07, 4, true));
      put("tall", "dark", bar([RP[0], y, RP[2] - 5.3], [CX + 2.3, y, ZSP + 0.2], 0.025, 3));
      /* the ties: apex to the tie strut and to the inner jib, the strut
         to the outer jib */
      put("tall", "dark", bar(AP, st, 0.03, 3));
      put("tall", "dark", bar(st, Tc(CX - 24.0), 0.03, 3));
      put("tall", "dark", bar(AP, Tc(CX - 7.0), 0.03, 3));
      put("tall", "steel", cylZ(0.06, 0.06, 0.4, 5, AP[0], y, APEX, true));
      /* the trolley 13 m out, four falls down to the hook block, and the
         1 m3 concrete skip on its slings, its gate half a metre over the
         first of the pipe moulds */
      var zt = zb2(XHOOK), zh = PAD + 6.4;
      put("tall", "yellow", bb(XHOOK - 0.45, XHOOK + 0.45, y - 0.55, y + 0.55, zt - 0.35, zt - 0.05));
      for (s = -1; s <= 1; s += 2) for (var f4 = -1; f4 <= 1; f4 += 2)
        put("tall", "dark", bar([XHOOK + s * 0.18, y + f4 * 0.1, zt - 0.35], [XHOOK + s * 0.18, y + f4 * 0.1, zh + 0.55], 0.02, 3));
      put("tall", "steel", bb(XHOOK - 0.3, XHOOK + 0.3, y - 0.14, y + 0.14, zh, zh + 0.6));
      put("tall", "dark", bar([XHOOK, y, zh], [XHOOK, y, zh - 0.35], 0.05, 4));
      var zs = PAD + 3.4;
      for (k = 0; k < 4; k++) {
        var ak = PI / 4 + k * PI / 2;
        put("tall", "dark", bar([XHOOK, y, zh - 0.35], [XHOOK + 0.55 * Math.cos(ak), y + 0.55 * Math.sin(ak), zs + 1.3], 0.015, 3));
      }
      put("tall", "steel", cylZ(0.62, 0.36, 1.3, 12, XHOOK, y, zs));
      put("tall", "dark", cylZ(0.18, 0.18, 0.25, 8, XHOOK, y, zs - 0.2));
    })();

    /* the transport axles the crane travelled on, unhooked and parked
       beside it: the front unit with its drawbar, the rear unit */
    (function () {
      function wheel(x, y) { put("yard", "dark", place(new THREE.CylinderGeometry(0.47, 0.47, 0.34, 10), x, y, PAD + 0.47)); }
      var ax = 25.4, ay = -16.0;
      put("yard", "steel", bb(ax - 0.35, ax + 0.35, ay - 0.62, ay + 0.62, PAD + 0.55, PAD + 1.05));
      wheel(ax, ay - 0.9); wheel(ax, ay + 0.9);
      put("yard", "steel", bar([ax + 0.35, ay, PAD + 0.8], [ax + 3.2, ay, PAD + 0.5], 0.07, 4, true));
      put("yard", "steel", cylZ(0.08, 0.08, 0.5, 6, ax + 3.1, ay, PAD));
      var bx2 = 25.9, by2 = -12.6;
      put("yard", "steel", bb(bx2 - 0.9, bx2 + 0.9, by2 - 0.85, by2 + 0.85, PAD + 0.55, PAD + 1.05));
      wheel(bx2, by2 - 1.05); wheel(bx2, by2 + 1.05);
      put("yard", "steel", cylZ(0.08, 0.08, 0.55, 6, bx2 + 0.8, by2, PAD));
    })();

    /* ============================================= the pipe moulds
       Three wet-cast moulds for 48 in pipe under the jib, where the skip
       pours: each a steel jacket stood on its pallet round a core, 2.7 m
       for an 8 ft pipe and its joint, a stiffening band, the fresh
       concrete showing in the annulus between them and the core's cone
       that turns the pour into it. */
    (function () {
      for (k = 0; k < 3; k++) {
        var x = XHOOK + k * 2.1, y = CY, zm = PAD + 2.7;
        put("yard", "steel", cylZ(0.80, 0.80, 2.7, 12, x, y, PAD, true));
        put("yard", "steel", cylZ(0.84, 0.84, 0.14, 12, x, y, PAD + 1.3, true));
        put("yard", "conc", place(new THREE.RingGeometry(0.61, 0.80, 12, 1), x, y, zm), CONCUV);
        put("yard", "steel", cylZ(0.04, 0.61, 0.3, 12, x, y, zm, true));
      }
    })();

    /* ============================================= precast and stock
       Culvert pipe, cured and waiting to go out, lying on dunnage with its
       axis north-south so its bores face the gate: two rows of 48 in pipe
       (1.219 m bore, 1.473 m outside, 2.44 m long) and a stack of 36 in
       (0.914 m bore, 1.117 m outside), three and two.  Eight-sided, and
       each end a concrete face with the dark bore in it rather than a
       modelled inside: from above the bore reads as a hole either way. */
    function pipe(x, zc, yc, bore, od) {
      var L = 2.44, ro = od / 2;
      put("yard", "conc", place(new THREE.CylinderGeometry(ro, ro, L, 8, 1, true), x, yc, zc), CONCUV);
      for (var e = -1; e <= 1; e += 2) {
        var face = new THREE.CircleGeometry(ro, 8), hole = new THREE.CircleGeometry(bore / 2, 8);
        face.rotateX(-e * PI / 2); hole.rotateX(-e * PI / 2);
        put("yard", "conc", place(face, x, yc + e * L / 2, zc), CONCUV);
        put("yard", "dark", place(hole, x, yc + e * (L / 2 + 0.005), zc));
      }
    }
    function dunnage(x0, x1, yc) {
      for (var e = -1; e <= 1; e += 2)
        put("yard", "ground", bb(x0, x1, yc + e * 0.8 - 0.08, yc + e * 0.8 + 0.08, PAD, PAD + 0.1), uvSwatch(ATLAS.timber));
    }
    [24.2, 20.4].forEach(function (yc) {
      dunnage(-27.6, -15.5, yc);
      for (k = 0; k < 7; k++) pipe(-26.6 + k * 1.68, PAD + 0.1 + 0.737, yc, 1.219, 1.473);
    });
    dunnage(-26.0, -21.6, 16.7);
    for (k = 0; k < 3; k++) pipe(-25.0 + k * 1.2, PAD + 0.1 + 0.559, 16.7, 0.914, 1.117);
    for (k = 0; k < 2; k++) pipe(-24.4 + k * 1.2, PAD + 0.1 + 0.559 + 1.039, 16.7, 0.914, 1.117);
    /* New Jersey barriers, 3.05 m, the NJ profile in two convex pieces */
    function jersey(x, y, alongX) {
      var lo = [[-0.305, 0], [0.305, 0], [0.305, 0.076], [0.127, 0.33], [-0.127, 0.33], [-0.305, 0.076]];
      var up = [[-0.127, 0.33], [0.127, 0.33], [0.076, 0.813], [-0.076, 0.813]];
      var L = 3.0;
      [lo, up].forEach(function (sec) {
        if (alongX) put("yard", "conc", prismX(sec.map(function (q) { return [y + q[0], PAD + q[1]]; }), x - L / 2, x + L / 2), CONCUV);
        else put("yard", "conc", prismY(sec.map(function (q) { return [x + q[0], PAD + q[1]]; }), y - L / 2, y + L / 2), CONCUV);
      });
    }
    for (k = 0; k < 4; k++) { jersey(23.4, -7.6 + k * 3.06, false); jersey(25.6, -7.6 + k * 3.06, false); }

    /* rebar: 12 m bundles on three dunnage timbers */

    rebar(-27.0, 6.6, 3);
    /* sawn timber packs and a stack of plywood form panels */
    function pack(x, y, lx, ly, h, sw) { put("yard", "ground", bb(x - lx / 2, x + lx / 2, y - ly / 2, y + ly / 2, PAD + 0.1, PAD + 0.1 + h), sw); }
    for (k = 0; k < 4; k++) {
      var tx = -14.2 + k * 1.6;
      [0.6, 3.9].forEach(function (d) { put("yard", "ground", bb(tx - 0.65, tx + 0.65, 19.6 + d - 0.08, 19.6 + d + 0.08, PAD, PAD + 0.1), uvSwatch(ATLAS.timber)); });
      pack(tx, 21.85, 1.2, 4.9, k === 3 ? 0.8 : 1.15, uvSwatch(ATLAS.timber));
    }
    pack(-10.8, 15.8, 2.44, 1.22, 0.9, uvSwatch(ATLAS.ply));
    pack(-10.8, 13.9, 2.44, 1.22, 0.6, uvSwatch(ATLAS.ply));
    /* structural steel: 6 m universal beams, three layers on dunnage */
    [0.5, 5.5].forEach(function (d) { put("yard", "ground", bb(-12.4 + d - 0.1, -12.4 + d + 0.1, 2.0, 4.6, PAD, PAD + 0.18), uvSwatch(ATLAS.timber)); });
    for (k = 0; k < 3; k++) for (j = 0; j < 4 - k; j++)
      put("yard", "steel", bb(-12.4, -6.4, 2.15 + (j + k * 0.5) * 0.6, 2.15 + (j + k * 0.5) * 0.6 + 0.3, PAD + 0.18 + k * 0.32, PAD + 0.18 + k * 0.32 + 0.3));

    /* ============================================== the office mast
       A guyed sectional antenna mast off the site office roof, 8 m over it,
       whips at its head.  Its own mesh: nothing broad may stand taller than
       the roofs.  (No satellite terminal: a VSAT is a 1990s item, and in
       e90 render3d's era kit brings a dish of its own.) */
    (function () {
      var mx = AX0 + CW / 2, my = AY0 + 1.6, z0 = PAD + 2 * CH, z1 = z0 + 8.0;
      put("mast", "box", bar([mx, my, z0], [mx, my, z1], 0.07, 5, true, 0.045));
      put("mast", "box", bar([mx, my, z1], [mx + 0.3, my, z1 + 1.8], 0.012, 3));
      put("mast", "box", bar([mx, my, z1], [mx - 0.3, my + 0.2, z1 + 1.6], 0.012, 3));
      put("mast", "box", bar([mx - 0.5, my, z1 - 0.4], [mx + 0.5, my, z1 - 0.4], 0.02, 3));
      /* three guys at 120 degrees, to the corners of the west roof */
      [[mx, my + 2.4], [mx - 1.1, my - 1.3], [mx + 1.1, my - 1.3]].forEach(function (g) {
        put("mast", "box", bar([mx, my, z1 - 1.2], [g[0], g[1], z0 + 0.02], 0.01, 3));
      });
    })();

    /* ================================================ out, one mesh each */
    var order = ["ground", "conc", "box", "steel", "dark", "yellow", "team", "fence"];
    ["yard", "tall", "mast"].forEach(function (grp) {
      order.forEach(function (key) {
        var b = GRP[grp][key];
        if (!b) return;
        var m = b.mesh(THREE, T[key], grp + "_" + key);
        if (m) root.add(m);
      });
    });
    return root;
  }

  return { build: build };
})();

/* Replaces the hall-and-tower in units3d_salvage.js; heroes load after it,
   so this assignment wins.  icons3d draws the same build().
   openPlot: an open yard has no roof for render3d's plot-sized faction kit
   (archFixture) to stand on - its tallest part is a crane head - so the kit
   should be left off it.  render3d does not read this yet; it is the one
   condition the render3d follow-up adds (see the header). */
BLD_MODELS["conyard"] = { openPlot: true,
  build: function (THREE, M, C) { return HeroEngineerYard.build(THREE, M, C); } };
