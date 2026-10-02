/* ===== airbase_revetments.js - HERO model: a revetted aircraft dispersal ====
   BUILDINGS.airbase: "Hardened strip with four revetments. Aircraft must
   return here to rearm and refuel", pads 4, 3 x 3 tiles, every faction and
   every era. One model serves all of them: build() is handed only the team
   colour, never the faction or the period.

   What it replaces. units3d_salvage.js drew one big arched hangar, a 13 m
   control tower with a 7 m mast on it and a painted runway. The hangar roof
   stood over one of the four pads, and until render3d stood its rooftop kit
   on roofs, that kit (a radome, a stack, netting) floated over the parked
   aircraft at the height of the mast, 25 m up. The def says four
   revetments, and four open revetments are what fit: a third-generation
   NATO shelter is 38 m long, one of them fills the plot.

   The revetment is the one the US Air Force erected at every base in South
   Vietnam from August 1965 and still has on its ramps: prefabricated
   corrugated steel bins filled with earth, standing on the hardstand.
     - R.P. Fox, "Air Base Defense in the Republic of Vietnam 1961-1973",
       Office of Air Force History, 1979, p.70: "earth-filled corrugated steel
       bins 12 feet high and 5.5 feet wide". So 3.66 m high and 1.68 m thick.
     - The Air Force civil engineers' Prime BEEF history (AFCEC): a kit made
       "240 lineal feet of revetment 5 1/2 feet thick and 12 feet high",
       erected in 10-foot sections of 16-gauge steel panels bolted to steel
       columns. "The Transformation of Bien Hoa" has bins "up to 16 feet
       high": kits came in more than one size, and Fox's is the one used.
     - "ARMCO Revetment at Da Nang Airfield, March 1966" (USMC archives,
       Wikimedia Commons): the bin face is corrugated in eleven horizontal
       bands over its height, and the steel columns stand 2.1-2.6 m apart.
     - "High Angle View of HH-53 and HH-3E Helicopters Parked in Revetments,
       Da Nang Air Base" (NARA 342-C-KE-41404) and "37th ARRSq Revetments,
       DaNang, RVN 1970-71" (both Wikimedia Commons): the same bins set as
       PAIRS OF PARALLEL WALLS, each a straight run open at both ends with one
       machine between them, the fill showing pale along the tops. The Bien
       Hoa aerial of the same years ("Bien Hoa Air Base revetments") has a row
       of fighters parked between straight walls the same way. That is the
       revetment here.
     - "F-4s in revetments at Ubon RTAFB" (c.1967) and "Korat RTAFB F-4
       Revetments": the other layout of the war, side walls run out from a
       long spine wall. It was this model's first layout, and why it is not
       the layout now is below.
     - "F-16s in their revetments at Kunsan AB, 2013" (USAF
       130815-F-MF529-068), taken straight down: yellow lead-in lines off the
       taxilane into every bay, the pale fill along every top.

   The layout is fixed by the game, not chosen. entities.js parks four
   aircraft on a 2 x 2 grid at world x +-18.6 m and z -14.88 / +22.32 m from
   the centre, noses to world -z; after BLD_SCALE (1.10) that is model
   (+-16.91, +13.53) and (+-16.91, -20.29), noses to model +Y. They are drawn
   at about twice their real size - an F-16 parks 33.6 m long and 19.8 m
   across, an Apache's disc is 30 m - and the pads are 33.8 m apart, so no
   wall can be built round a drawn aircraft: the walls are sized for the real
   aircraft, as a real revetment is, and stand where the drawn ones are not.
   Measured by parking four of every one of the 372 aircraft types the game
   has, one on each pad, in the real renderer (tools/jsc/parked3d_check.js,
   section B, holds it):
     - NO BACK WALL. The spine of this model's first layout went into 161 of
       the types, 89 of them right through it, and was the only thing 78 of
       them touched: a front-row gunship's tail and a back-row fighter's nose
       overlap in the gap between the rows, so no wall across the pads' axis
       can stand anywhere in it. Each revetment is two parallel walls, open at
       both ends, as at Da Nang.
     - THE BAY AS WIDE AS THE PLOT ALLOWS. The outer walls stand on the
       plot's edge (x +-28.32 .. 30.00) and the inner ones at +-3.82 .. 5.50:
       22.82 m between the faces, centred on the pad. (The revetment the
       Prime BEEF team designed at Tan Son Nhut in 1966 was 105 ft wide and
       90 ft long, 32 x 27 m: a real one is wider than this plot allows.)
     - THE WALLS AS LONG AS THE AIRCRAFT THEY WERE BUILT FOR. Each pair runs
       from 9.41 m behind its pad to 6.40 m ahead of it, 15.81 m, about the
       length of a real fighter; the drawn aircraft overhangs it at both ends.
       Two metres further forward the E-2's propellers go 0.6 m into them.
     - So the rows stand apart: the front pair from y 4.12 to 19.93, the back
       pair from -29.70 to -13.89, and between them an 18 m apron where the
       front row's tails and the back row's noses are.
     - What that holds: 305 of the 372 types clear every wall and everything
       else of the base on every pad, or come within 0.15 m of a face or a
       top (a wingtip on a wall, a wing skimming it); 284 touch nothing.
       Every fighter, stealth fighter, gunship, transport and ASW helicopter,
       tanker and airlifter of the eight present-day rosters is among them,
       but the KPA's transport, an An-2, and the Royal Navy's F-35B. The
       first layout held 181, the hangar none. The other 67 are drawn wider
       than 22.8 m below the wall tops: the A-10 and the twelve CAS types
       drawn with it (35.9 m of wing), the Su-25, the A-1, Il-10, F-84G and
       AT-3, the F-86F, the E-3 family, the transport-EW stand-in and the
       EA-6B, the F-35B, the An-2, Po-2 and C-46, and the H-6, Tu-160 and
       B-2. Nothing short of moving the pads fixes that.
     - Nothing stands over a pad. render3d.js padTop() finds each pad with a
       ray from 3 m, and the first thing under it is the hardstand.
     - A field holding more aircraft than it has revetments parks them on a
       bigger grid (entities.js): five or six on 3 x 2, the extra ones at
       (0, +13.53) and (0, -20.29), in the lane between the inner walls, 7.6
       m wide. Nothing else stands in the lane, so a helicopter there touches
       nothing; the wings of anything else go through the inner walls. Seven
       to nine go on 3 x 3, whose middle row is on the apron: its middle one
       stands on the fuel point, the western one's wing reaches the hut.

   The rest, from photographs of small military airfields:
     - the TOWER: a two-storey block with a glazed cab on its roof, the glass
       leaning out and a railed balcony round it, as at RAF Linton-on-Ouse
       ("Air Traffic Control, RAF Linton-on-Ouse", geograph 430535). Kept
       small: 4.2 m square, 10.4 m to the cab roof. It stands on the north
       edge beside the lane, between the front row's noses: the one place on
       the plot a 10 m block is clear of every type the revetments hold -
       anywhere between the rows the wings of the B-52 and the Vulcan, which
       pass over the walls, sweep through it - and of an extra aircraft
       parked in the lane.
     - the MAINTENANCE HUT: a Quonset, the original T-rib, 16 x 36 ft (4.9 x
       11.0 m) on an 8 ft radius, a semicircle of corrugated steel with
       framed end walls and a door (Wikipedia, "Quonset hut"), at the west
       end of the apron between the rows, its door to the north.
     - the FUEL POINT: a 3,000 US gal collapsible fuel tank, about 4.1 x 4.6
       m and 0.65 m high filled (the makers' 3,000 gal fill size, 13.5 x 15 ft
       x 2 ft), in a 0.6 m earth berm that holds more than it does, a pump
       skid and a hose over the bank, on the apron between the rows where the
       aircraft come out of their revetments.
     - the WINDSOCK: ICAO's aerodrome size, 3.6 m long and 0.9 m across the
       throat, five bands, orange first and last, on a 6 m mast in the north-
       east corner.
     - two ground power carts on the apron and a wheeled extinguisher at the
       mouth of every revetment and at the pump: the ground equipment that
       stands between the walls in the Ubon photograph.

   What is NOT here, and why:
     - a runway. The plot is 60 m square; a runway is 45 m wide on its own.
       The front row's lead-in lines run off the north edge to the taxiway,
       the back row's off a taxilane painted along the apron to its east
       edge.
     - hardened shelters, and floodlight towers: a tall mast is exactly what
       the rooftop kit used to be, standing over a parked aircraft.
     - the Warsaw Pact's earth-banked stands (the "kaponir"). An earth bank
       3.7 m high needs 6-8 m of base; there is none to spare here. The bin
       wall's descendant, the earth-filled wire gabion, is what revetments
       are built of today (the RAF Cosford Jaguar, 2018, on Wikimedia
       Commons). Before 1965 the steel bin is an anachronism, which one model
       for every period cannot help.
     - markings to the letter. The end bins are painted in bands of the
       owner's colour and white, on their tops and their end panels: real
       revetment ends are marked on the end panels, in yellow and black or red
       and white; the team colour is the game's stylisation, so a field reads
       as someone's from above.

   The army's and the period's rooftop kit (render3d.js dressKit) stands
   each piece on a roof a storey up with a 3 m pad under it, and on this
   plot the only such roof is the tower's cab: the NATO aerial mast and its
   yagis, the PLA's pair of masts, and the period's whip, lattice mast,
   brick chimney, dish or array face go there; what no 5 m roof can carry -
   the radome, the Pact stack and banner board, the PLA eaves, the 1980s
   net - is left off. Nothing of it stands over a pad or on a wall. There is
   nothing here for restyle() to repaint (the painted materials are white
   under their maps, the dark ones below its band, the owner's colour
   tagged); eraRestyle() tints the period.

   Model space: +X east, +Y north (the way the parked aircraft point), +Z up,
   metres; the hardstand's top at z 0.30, on which the aircraft are parked.
   Materials: seven, one mesh each. PAINT carries one CanvasTexture: the
   hardstand's plan (joints, lines, numbers, stains) with a strip of flat
   colours above it that the small painted parts (render, doors, the windsock
   bands, the extinguishers) take their UVs from, so they cost no material of
   their own; STEEL (the bins and the hut, one canvas), FILL (the tops of the
   bins and the berm, one canvas), DARK, GLASS, TEAM (exactly C.team: the
   bands on the bins' ends and the tower's roof fascia) and LAMP. The three
   textures depend on nothing but this model, so they are made once per page
   and every build shares them (_tex, below). Colours are authored in sRGB
   and left to prepModel() to linearise.
   ASCII only: a stray byte inside a hex literal has broken this before.    */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroAirbase = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------- datums */
  var HALF = 30.0;                 /* the plot, 60 m square                    */
  var Z0 = 0.30;                   /* top of the hardstand                     */
  var WH = 3.66, WT = 1.68;        /* bin wall: 12 ft high, 5.5 ft thick       */
  var ZW = Z0 + WH;                /* 3.96: top of the bins                    */
  /* the pads, entities.js's 2 x 2 grid in the model frame (see the header) */
  var PAD_X = 18.6 / 1.1, PAD_F = 14.88 / 1.1, PAD_B = -22.32 / 1.1;
  var FO1 = HALF, FO0 = FO1 - WT;  /* outer walls: on the plot's edge          */
  var HB = FO0 - PAD_X;            /* half the bay, 11.41: the pad in its middle */
  var FI1 = PAD_X - HB, FI0 = FI1 - WT; /* inner walls: 3.82 .. 5.50           */
  var WA = -9.41, WB = 6.40;       /* a wall from 9.41 m behind its pad to 6.40 ahead */
  var ROWS = [PAD_F, PAD_B];
  var NCOL = 7;                    /* seven bays of columns along a wall        */
  var CAP = 2.1;                   /* the end bin, painted in bands             */
  var ZF = ZW - 0.04;              /* the fill, just under the bins' top edge  */
  var TAXI_M = -10.0;              /* the taxilane across the apron between the rows */
  var TX = -5.0, TY = 27.4;        /* the tower, at the north edge by the lane   */
  var QR = 2.44, QX = -HALF + 0.66 + QR;   /* Quonset, T-rib 16 x 36 ft, at the  */
  var QY1 = -0.5, QY0 = QY1 - 11.0;        /* west edge between the rows          */
  var FY = -1.0;                   /* fuel point: berm y -5.3 .. 3.3            */
  var BH = 0.6;                    /* berm height                              */
  var WSX = 26.4, WSY = 27.6;      /* the windsock, north-east corner           */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, clamp) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    /* r148: encoding is the switch that works; colorSpace does nothing */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  /* ============================================================ the paint
     1024 x 1152. The bottom 1024 rows are the hardstand in plan, 17 px a
     metre, x -30 at the left, y +30 at row 128. The top 128 rows are the
     colour strip: sixteen 64 px swatches, then the windsock's five bands. */
  var PW = 1024, PH = 1152, PLAN0 = 128, PXM = 1024 / 60;
  var SW = { white: 0, render: 1, roof: 2, edge: 3, orange: 4, red: 5, olive: 6,
             endwall: 7, yellow: 8, black: 9, door: 10, alu: 11, conc: 12, frame: 13 };
  var SWC = ["#e6e6df", "#c3bfb2", "#62645f", "#7b7c75", "#e0601c", "#b0231c", "#565838",
             "#7c7f70", "#d6a52b", "#1e1f1d", "#3d4a3b", "#b4b7b3", "#8d8e87", "#3a3c3a"];
  function swUV(name) {
    var i = SW[name];
    return [(i * 64 + 32) / PW, 1 - 32 / PH];
  }
  /* the windsock strip: u 0..1 runs throat to tail over the five bands */
  var SOCK_V = 1 - 96 / PH;
  function planUV(x, y) { return [(x + HALF) / (2 * HALF), (y + HALF) / (2 * HALF) * (1024 / PH)]; }

  function paintCanvas() {
    var cv = mkCv(PW, PH), g = cv.getContext("2d"), R = rng(60601), i, j, k;
    function X(x) { return (x + HALF) * PXM; }
    function Y(y) { return PLAN0 + (HALF - y) * PXM; }
    /* ---- the colour strip ---- */
    for (i = 0; i < SWC.length; i++) { g.fillStyle = SWC[i]; g.fillRect(i * 64, 0, 64, 64); }
    g.fillStyle = SWC[SW.conc]; g.fillRect(SWC.length * 64, 0, PW - SWC.length * 64, 64);
    for (i = 0; i < 5; i++) {
      g.fillStyle = (i % 2) ? "#ecebe4" : "#e0601c";
      g.fillRect(i * PW / 5, 64, PW / 5 + 1, 64);
    }
    /* ---- the hardstand ----
       Rigid pavement in 7.5 m panels (25 ft, the USAF joint spacing), each
       its own tone: pours never match. */
    g.fillStyle = "#86877f"; g.fillRect(0, PLAN0, PW, 1024);
    var P = 7.5, np = 8;
    for (i = 0; i < np; i++) for (j = 0; j < np; j++) {
      var t = R();
      g.fillStyle = t < 0.5 ? "rgba(255,255,250," + (0.03 + R() * 0.05).toFixed(3) + ")"
                            : "rgba(20,20,16," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(X(-HALF + i * P), Y(HALF - j * P), P * PXM, P * PXM);
    }
    /* aggregate speckle and soft weathering */
    for (i = 0; i < 9000; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(40,40,36,0.16)" : "rgba(210,210,200,0.14)";
      g.fillRect(R() * PW, PLAN0 + R() * 1024, 1.5, 1.5);
    }
    for (i = 0; i < 60; i++) {
      g.fillStyle = R() < 0.6 ? "rgba(30,30,26,0.045)" : "rgba(235,235,225,0.04)";
      g.fillRect(R() * PW, PLAN0 + R() * 1024, 40 + R() * 160, 30 + R() * 120);
    }
    /* sealed joints, and a few cracks running off them */
    g.fillStyle = "rgba(38,38,34,0.55)";
    for (i = 1; i < np; i++) {
      g.fillRect(X(-HALF + i * P) - 0.8, PLAN0, 1.6, 1024);
      g.fillRect(0, Y(HALF - i * P) - 0.8, PW, 1.6);
    }
    g.strokeStyle = "rgba(34,34,30,0.45)"; g.lineWidth = 1;
    for (i = 0; i < 12; i++) {
      var cx = R() * PW, cy = PLAN0 + R() * 1024;
      g.beginPath(); g.moveTo(cx, cy);
      var ca = R() * PI * 2;
      for (k = 0; k < 4; k++) { ca += (R() - 0.5) * 0.8; cx += Math.cos(ca) * 14; cy += Math.sin(ca) * 14; g.lineTo(cx, cy); }
      g.stroke();
    }
    /* what aircraft leave on a stand: oil and hydraulic drips under the
       middle of the airframe, and a darker patch at each pad */
    var pads = [[PAD_X, PAD_F], [-PAD_X, PAD_F], [PAD_X, PAD_B], [-PAD_X, PAD_B]];
    pads.forEach(function (p) {
      for (var q = 0; q < 14; q++) {
        var ox = (R() - 0.5) * 7, oy = (R() - 0.5) * 12, rr = (0.4 + R() * 1.6) * PXM;
        var gr = g.createRadialGradient(X(p[0] + ox), Y(p[1] + oy), 0, X(p[0] + ox), Y(p[1] + oy), rr);
        gr.addColorStop(0, "rgba(22,20,16,0.30)"); gr.addColorStop(1, "rgba(22,20,16,0)");
        g.fillStyle = gr; g.fillRect(X(p[0] + ox) - rr, Y(p[1] + oy) - rr, rr * 2, rr * 2);
      }
    });
    /* the front row turns its tail to the apron between the rows: soot on
       the slab there from engines run up before the aircraft taxies out (the
       back row's exhausts are off the plot's south edge) */
    [PAD_X, -PAD_X].forEach(function (x) {
      g.save(); g.translate(X(x), Y(PAD_F - 15.2)); g.scale(1.4, 1.0);
      var r = 3.4 * PXM, gr = g.createRadialGradient(0, 0, 0, 0, 0, r);
      gr.addColorStop(0, "rgba(18,17,15,0.42)"); gr.addColorStop(1, "rgba(18,17,15,0)");
      g.fillStyle = gr; g.fillRect(-r, -r, 2 * r, 2 * r);
      g.restore();
    });
    /* ---- markings: yellow on a black keyline, as on the Kunsan ramp ---- */
    function yline(pts, w) {
      g.lineJoin = "round"; g.lineCap = "butt";
      [["#1c1c1a", w + 0.16], ["#d6a52b", w]].forEach(function (st) {
        g.strokeStyle = st[0]; g.lineWidth = st[1] * PXM;
        g.beginPath(); g.moveTo(X(pts[0][0]), Y(pts[0][1]));
        for (var q = 1; q < pts.length; q++) g.lineTo(X(pts[q][0]), Y(pts[q][1]));
        g.stroke();
      });
    }
    function arcPts(cx, cy, r, a0, a1) {
      var out = [];
      for (var q = 0; q <= 12; q++) { var a = a0 + (a1 - a0) * q / 12; out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
      return out;
    }
    var LW = 0.22, RF = 5.0;
    /* the back row's taxilane, east along the apron between the rows and
       off the field's east edge (the hut stands at its west end) */
    yline([[-PAD_X + RF, TAXI_M], [HALF, TAXI_M]], LW);
    [PAD_X, -PAD_X].forEach(function (x) {
      /* front row: a lead-in off the north edge, where the taxiway runs,
         down the middle of the revetment to its far end */
      yline([[x, HALF], [x, PAD_F + WA + 1.0]], LW);
      /* back row: a fillet off the taxilane, then down between the walls */
      yline([[x, TAXI_M - RF], [x, PAD_B + WA + 1.0]], LW);
      yline(arcPts(x + RF, TAXI_M - RF, RF, PI / 2, PI), LW);
      if (x > 0) yline(arcPts(x - RF, TAXI_M - RF, RF, PI / 2, 0), LW);
    });
    /* rubber on the lead-ins */
    for (i = 0; i < 160; i++) {
      var px = pads[i % 4][0] + (R() - 0.5) * 1.6, py = pads[i % 4][1] + (R() - 0.5) * 22;
      g.fillStyle = "rgba(16,16,14," + (0.05 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(X(px), Y(py), 1.5 + R() * 2, 8 + R() * 30);
    }
    /* stand numbers at each mouth, 2.4 m tall, reading from the north, the
       way an aircraft comes in */
    function num(txt, x, y, rot) {
      g.save(); g.translate(X(x), Y(y)); g.rotate(rot);
      g.font = "bold " + Math.round(2.4 * PXM) + "px Arial";
      g.textAlign = "center"; g.textBaseline = "middle";
      g.lineWidth = 0.16 * PXM; g.strokeStyle = "#1c1c1a"; g.strokeText(txt, 0, 0);
      g.fillStyle = "#d6a52b"; g.fillText(txt, 0, 0);
      g.restore();
    }
    num("1", -PAD_X - 3.6, PAD_F + WB - 1.8, PI); num("2", PAD_X - 3.6, PAD_F + WB - 1.8, PI);
    num("3", -PAD_X - 3.6, PAD_B + WB - 1.8, PI); num("4", PAD_X - 3.6, PAD_B + WB - 1.8, PI);
    /* tie-down and grounding points round every pad */
    g.fillStyle = "rgba(24,24,22,0.8)";
    pads.forEach(function (p) {
      [[-3.4, -2.6], [3.4, -2.6], [-3.4, 3.6], [3.4, 3.6], [0, -7.5], [0, 7.8]].forEach(function (o) {
        g.fillRect(X(p[0] + o[0]) - 2.5, Y(p[1] + o[1]) - 2.5, 5, 5);
      });
    });
    /* the fuel point's floor: a black liner inside the berm */
    g.fillStyle = "rgba(26,27,24,0.92)";
    g.fillRect(X(-2.35), Y(FY + 2.6), 4.7 * PXM, 5.2 * PXM);
    /* the service lane between the revetments, swept, a shade lighter */
    g.fillStyle = "rgba(230,230,220,0.06)";
    ROWS.forEach(function (py) { g.fillRect(X(-FI0), Y(py + WB), 2 * FI0 * PXM, (WB - WA) * PXM); });
    return cv;
  }

  /* STEEL: 512 x 512. Top half: a bin wall, two bays across, full height
     down; eleven corrugation bands, a column at each bay line, dust
     splashed up the foot, rust weeping from the bolts. Bottom half: the
     hut's sheet, its ribs running across the canvas. */
  function steelCanvas() {
    var W = 512, H = 512, cv = mkCv(W, H), g = cv.getContext("2d"), R = rng(1965), i, k;
    g.fillStyle = "#9a9d98"; g.fillRect(0, 0, W, 256);
    var bh = 256 / 11;
    for (i = 0; i < 11; i++) {
      var y0 = i * bh;
      g.fillStyle = "rgba(255,255,250,0.20)"; g.fillRect(0, y0 + 1, W, bh * 0.28);
      g.fillStyle = "rgba(20,22,20,0.22)"; g.fillRect(0, y0 + bh * 0.70, W, bh * 0.30);
      g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(0, y0 + bh - 1, W, 1);
    }
    /* panel lots weather differently */
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,245,0.05)" : "rgba(30,30,24,0.06)";
      g.fillRect(R() * W, R() * 256, 30 + R() * 120, bh * (1 + Math.floor(R() * 3)));
    }
    /* columns on the bay lines, and their bolt rows */
    [0, 256].forEach(function (x) {
      g.fillStyle = "#7c7f7a"; g.fillRect(x - 10, 0, 20, 256);
      g.fillStyle = "rgba(255,255,250,0.25)"; g.fillRect(x - 10, 0, 3, 256);
      g.fillStyle = "rgba(20,20,18,0.5)";
      for (k = 0; k < 22; k++) { g.fillRect(x - 15, k * 11.6 + 4, 3, 3); g.fillRect(x + 12, k * 11.6 + 4, 3, 3); }
    });
    g.fillStyle = "#7c7f7a"; g.fillRect(W - 10, 0, 10, 256);
    /* rust from the bolts */
    for (i = 0; i < 24; i++) {
      var rx = R() * W, ry = R() * 200, len = 10 + R() * 40;
      var gr = g.createLinearGradient(0, ry, 0, ry + len);
      gr.addColorStop(0, "rgba(112,66,34,0.22)"); gr.addColorStop(1, "rgba(112,66,34,0)");
      g.fillStyle = gr; g.fillRect(rx, ry, 1.5 + R() * 2.5, len);
    }
    /* the foot: dust and splash up the lowest half metre */
    var gf = g.createLinearGradient(0, 256, 0, 210);
    gf.addColorStop(0, "rgba(96,84,62,0.55)"); gf.addColorStop(1, "rgba(96,84,62,0)");
    g.fillStyle = gf; g.fillRect(0, 210, W, 46);
    /* the lip along the top edge */
    g.fillStyle = "rgba(255,255,250,0.35)"; g.fillRect(0, 0, W, 2);
    /* ---- the Quonset sheet ---- */
    g.fillStyle = "#8f928d"; g.fillRect(0, 256, W, 256);
    for (i = 0; i < 256; i += 4) {
      g.fillStyle = "rgba(255,255,250,0.10)"; g.fillRect(0, 256 + i, W, 1);
      g.fillStyle = "rgba(20,20,18,0.14)"; g.fillRect(0, 256 + i + 2, W, 1);
    }
    for (i = 0; i < 256; i += 24) { g.fillStyle = "rgba(20,20,18,0.22)"; g.fillRect(0, 256 + i, W, 2); }
    for (i = 0; i < 30; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,245,0.05)" : "rgba(60,48,30,0.08)";
      g.fillRect(R() * W, 256 + R() * 256, 20 + R() * 100, 20 + R() * 80);
    }
    return cv;
  }

  /* FILL: 256 x 256. Top half: the fill along a wall top, two bays along by
     the 1.68 m width, a joint at every bin; bottom half: the berm's earth. */
  function fillCanvas() {
    var W = 256, cv = mkCv(W, W), g = cv.getContext("2d"), R = rng(7707), i;
    g.fillStyle = "#b6af9b"; g.fillRect(0, 0, W, 128);
    for (i = 0; i < 2600; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(70,64,52,0.30)" : "rgba(235,230,215,0.30)";
      g.fillRect(R() * W, R() * 128, 1 + R() * 2, 1 + R() * 2);
    }
    for (i = 0; i < 12; i++) {
      g.fillStyle = "rgba(90,82,64,0.10)"; g.fillRect(R() * W, R() * 128, 20 + R() * 50, 10 + R() * 30);
    }
    g.fillStyle = "rgba(60,58,52,0.55)"; g.fillRect(0, 0, 3, 128); g.fillRect(127, 0, 3, 128);
    g.fillStyle = "rgba(60,58,52,0.35)"; g.fillRect(0, 0, W, 2); g.fillRect(0, 126, W, 2);
    /* the berm: dry earth with thin grass */
    g.fillStyle = "#88775a"; g.fillRect(0, 128, W, 128);
    for (i = 0; i < 1800; i++) {
      var t = R();
      g.fillStyle = t < 0.35 ? "rgba(96,110,60,0.45)" : t < 0.7 ? "rgba(60,50,34,0.35)" : "rgba(180,160,120,0.30)";
      g.fillRect(R() * W, 128 + R() * 128, 1 + R() * 3, 1 + R() * 3);
    }
    return cv;
  }

  /* The three textures depend on nothing but this model, never the team or
     the period, so they are made once per page and every build shares them,
     as nato_e20_carrier_ford.js does with its _tex. render3d builds this key
     once per team colour and era, and icons3d once more for the sidebar: a
     new CanvasTexture per build is a new upload of the 1024 x 1152 paint
     (4.7 MB, 6.3 MB with its mipmaps) every time, the canvas cache
     notwithstanding - three.js keys the GPU copy on the Texture's Source, and
     each new CanvasTexture gets a Source of its own. Nothing in the game
     disposes a map (loading.js relies on the same sharing). */
  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      paint: finish(THREE, paintCanvas(), true),
      steel: finish(THREE, steelCanvas(), false),
      fill:  finish(THREE, fillCanvas(), false)
    };
    return _tex;
  }

  /* ============================================================ batching
     One Batch per material, emitted as one mesh. Faces are written with an
     outward normal given, and wound to agree with it, so nothing here is
     inside out whichever order its corners were listed in.               */
  function Batch() { this.p = []; this.n = []; this.u = []; }
  Batch.prototype.tri = function (a, b, c, ua, ub, uc, N) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    if (nx * N[0] + ny * N[1] + nz * N[2] < 0) {
      var t = b; b = c; c = t; t = ub; ub = uc; uc = t; nx = -nx; ny = -ny; nz = -nz;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    this.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
  };
  Batch.prototype.quad = function (a, b, c, d, ua, ub, uc, ud, N) {
    this.tri(a, b, c, ua, ub, uc, N); this.tri(a, c, d, ua, uc, ud, N);
  };
  /* smooth triangle: winding follows the vertex normals */
  Batch.prototype.triS = function (a, b, c, na, nb, nc, ua, ub, uc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-18) return;
    if (nx * (na[0] + nb[0] + nc[0]) + ny * (na[1] + nb[1] + nc[1]) + nz * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t; t = ub; ub = uc; uc = t;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
    this.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
  };
  Batch.prototype.mesh = function (THREE, mat, name) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    var m = new THREE.Mesh(g, mat);
    m.name = name;
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* An axis-aligned box. uv(face, point) gives each corner's UV; faces are
     "px","nx","py","ny","pz","nz" and `skip` lists the ones that are buried
     (a wall's foot on the slab, an end inside another wall).             */
  var FACES = {
    px: [1, 0, 0], nx: [-1, 0, 0], py: [0, 1, 0], ny: [0, -1, 0], pz: [0, 0, 1], nz: [0, 0, -1]
  };
  function box(B, x0, x1, y0, y1, z0, z1, uv, skip) {
    var f, P;
    for (f in FACES) {
      if (skip && skip.indexOf(f) >= 0) continue;
      if (f === "px") P = [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]];
      else if (f === "nx") P = [[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]];
      else if (f === "py") P = [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]];
      else if (f === "ny") P = [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]];
      else if (f === "pz") P = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
      else P = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]];
      var U = P.map(function (p) { return uv(f, p); });
      (B.pick ? B.pick(f) : B).quad(P[0], P[1], P[2], P[3], U[0], U[1], U[2], U[3], FACES[f]);
    }
  }
  function flat(name) { var q = swUV(name); return function () { return q; }; }
  /* a box painted one flat colour of the strip */
  function sbox(B, name, x0, x1, y0, y1, z0, z1, skip) {
    box(B, Math.min(x0, x1), Math.max(x0, x1), Math.min(y0, y1), Math.max(y0, y1),
        Math.min(z0, z1), Math.max(z0, z1), flat(name), skip);
  }
  var NOUV = [0, 0];
  function nobox(B, x0, x1, y0, y1, z0, z1, skip) {
    box(B, Math.min(x0, x1), Math.max(x0, x1), Math.min(y0, y1), Math.max(y0, y1),
        Math.min(z0, z1), Math.max(z0, z1), function () { return NOUV; }, skip);
  }
  /* a round bar from a to b, n sides, capped; one flat UV */
  function rod(B, a, b, r, n, uv, r2, open) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz), ax = [dx / L, dy / L, dz / L];
    /* two perpendiculars */
    var t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var e1 = [ax[1] * t[2] - ax[2] * t[1], ax[2] * t[0] - ax[0] * t[2], ax[0] * t[1] - ax[1] * t[0]];
    var l1 = Math.sqrt(e1[0] * e1[0] + e1[1] * e1[1] + e1[2] * e1[2]);
    e1 = [e1[0] / l1, e1[1] / l1, e1[2] / l1];
    var e2 = [ax[1] * e1[2] - ax[2] * e1[1], ax[2] * e1[0] - ax[0] * e1[2], ax[0] * e1[1] - ax[1] * e1[0]];
    var rb = r, rt = r2 === undefined ? r : r2, i;
    uv = uv || NOUV;
    for (i = 0; i < n; i++) {
      var a0 = i / n * 2 * PI, a1 = (i + 1) / n * 2 * PI;
      var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      var n0 = [e1[0] * c0 + e2[0] * s0, e1[1] * c0 + e2[1] * s0, e1[2] * c0 + e2[2] * s0];
      var n1 = [e1[0] * c1 + e2[0] * s1, e1[1] * c1 + e2[1] * s1, e1[2] * c1 + e2[2] * s1];
      var A = [a[0] + n0[0] * rb, a[1] + n0[1] * rb, a[2] + n0[2] * rb];
      var Bq = [a[0] + n1[0] * rb, a[1] + n1[1] * rb, a[2] + n1[2] * rb];
      var C = [b[0] + n1[0] * rt, b[1] + n1[1] * rt, b[2] + n1[2] * rt];
      var D = [b[0] + n0[0] * rt, b[1] + n0[1] * rt, b[2] + n0[2] * rt];
      B.triS(A, Bq, C, n0, n1, n1, uv, uv, uv);
      B.triS(A, C, D, n0, n1, n0, uv, uv, uv);
      if (!open) {
        var na = [-ax[0], -ax[1], -ax[2]];
        B.tri(a, A, Bq, uv, uv, uv, na);
        B.tri(b, D, C, uv, uv, uv, ax);
      }
    }
  }

  /* ============================================================ the walls
     A straight run of bins along y, from y0 to y1, between x = c0 and c1,
     open at both ends. Its long faces carry the corrugated steel, u along
     the wall from its own start, so the painted columns fall on the
     columns built over them; its top is the fill, jointed at every bin. Each
     end bin is painted in bands of the owner's colour and white, across its
     top and down its end panel. */
  var BANDS = [0.5, 0.3, 0.5, 0.3, 0.5];     /* team, white, team, white, team */
  function binWall(K, y0, y1, c0, c1, edge) {
    var S = K.steel, F = K.fill, i;
    var L = y1 - y0, BAYC = L / NCOL;
    function P(a, c, z) { return [c, a, z]; }
    function suv(a, z) { return [(a - y0) / (2 * BAYC), 0.5 + 0.5 * (z - Z0) / WH]; }
    /* the two long faces */
    [[c0, [-1, 0, 0]], [c1, [1, 0, 0]]].forEach(function (fc) {
      S.quad(P(y0, fc[0], Z0), P(y1, fc[0], Z0), P(y1, fc[0], ZW), P(y0, fc[0], ZW),
             suv(y0, Z0), suv(y1, Z0), suv(y1, ZW), suv(y0, ZW), fc[1]);
    });
    /* the end panels, banded from the foot up: team at the foot and the head */
    var wuv = swUV("white");
    function endFace(a, N) {
      var z = Z0, hs = WH / BANDS.length;
      for (var k = 0; k < BANDS.length; k++) {
        var M = (k % 2) ? K.paint : K.team, q = (k % 2) ? wuv : NOUV;
        M.quad(P(a, c0, z), P(a, c1, z), P(a, c1, z + hs), P(a, c0, z + hs), q, q, q, q, N);
        z += hs;
      }
    }
    endFace(y0, [0, -1, 0]);
    endFace(y1, [0, 1, 0]);
    /* the top: fill between the painted end bands, 40 mm down inside the
       top edge of the bins, the steel lip showing all round it */
    var t0 = y0 + CAP, t1 = y1 - CAP;
    function fuv(a, c) { return [(a - y0) / (2 * BAYC), 0.5 + 0.5 * (c - c0) / WT]; }
    F.quad(P(t0, c0, ZF), P(t1, c0, ZF), P(t1, c1, ZF), P(t0, c1, ZF),
           fuv(t0, c0), fuv(t1, c0), fuv(t1, c1), fuv(t0, c1), [0, 0, 1]);
    function lip(pA, pB, N) {
      var q0 = suv(y0, ZF), q1 = suv(y0, ZW);
      S.quad([pA[0], pA[1], ZF], [pB[0], pB[1], ZF], [pB[0], pB[1], ZW], [pA[0], pA[1], ZW], q0, q0, q1, q1, N);
    }
    /* (a centimetre inside the outer faces, so no face is coplanar with
       the back of another) */
    var e = 0.012;
    lip(P(y0, c0 + e, 0), P(y1, c0 + e, 0), [1, 0, 0]);
    lip(P(y0, c1 - e, 0), P(y1, c1 - e, 0), [-1, 0, 0]);
    lip(P(y0 + e, c0, 0), P(y0 + e, c1, 0), [0, 1, 0]);
    lip(P(y1 - e, c0, 0), P(y1 - e, c1, 0), [0, -1, 0]);
    /* the end bin's top in the same bands, the owner's colour first */
    function bands(aEnd, dir) {
      var a = aEnd, sc = CAP / 2.1;
      for (var k = 0; k < BANDS.length; k++) {
        var b = a + dir * BANDS[k] * sc;
        var M = (k % 2) ? K.paint : K.team, q = (k % 2) ? wuv : NOUV;
        M.quad(P(a, c0, ZF), P(b, c0, ZF), P(b, c1, ZF), P(a, c1, ZF), q, q, q, q, [0, 0, 1]);
        a = b;
      }
    }
    bands(y0, 1);
    bands(y1, -1);
    /* the columns: a steel H at every bay line, proud of both faces and
       standing a hand's breadth over the fill, as the Da Nang photograph
       shows them - but for the face on the plot's edge (`edge`, -1 or +1),
       where they would stand out of the plot; that face shows them painted */
    for (i = 0; i <= NCOL; i++) {
      var a = y0 + i * BAYC;
      [[c0, -1], [c1, 1]].forEach(function (fc) {
        if (fc[1] === edge) return;
        /* its back sunk a centimetre into the wall, closed above the fill */
        var cA = fc[0] - fc[1] * 0.01, cB = fc[0] + fc[1] * 0.07;
        var aa = Math.max(y0, a - 0.10), ab = Math.min(y1, a + 0.10);
        box(S, Math.min(cA, cB), Math.max(cA, cB), aa, ab, Z0, ZW + 0.08, function (f, p) {
          return [0.005 + 0.02 * (p[1] - aa), 0.5 + 0.5 * Math.min(1, (p[2] - Z0) / WH)];
        }, ["nz"]);
      });
    }
  }

  /* ============================================================ the tower */
  function octo(cx, cy, h, ch) {
    /* a square of half-width h with its corners cut by ch, counter-clockwise */
    return [[cx + h - ch, cy - h], [cx + h, cy - h + ch], [cx + h, cy + h - ch], [cx + h - ch, cy + h],
            [cx - h + ch, cy + h], [cx - h, cy + h - ch], [cx - h, cy - h + ch], [cx - h + ch, cy - h]];
  }
  /* the band between two plan outlines at two heights, faces outward */
  function band(B, lo, zb, hi, zt, uv, cx, cy) {
    for (var i = 0; i < lo.length; i++) {
      var j = (i + 1) % lo.length;
      var mx = (lo[i][0] + lo[j][0]) / 2 - cx, my = (lo[i][1] + lo[j][1]) / 2 - cy;
      B.quad([lo[i][0], lo[i][1], zb], [lo[j][0], lo[j][1], zb], [hi[j][0], hi[j][1], zt], [hi[i][0], hi[i][1], zt],
             uv, uv, uv, uv, [mx, my, 0]);
    }
  }
  function cap(B, pts, z, up, uv) {
    for (var i = 1; i < pts.length - 1; i++)
      B.tri([pts[0][0], pts[0][1], z], [pts[i][0], pts[i][1], z], [pts[i + 1][0], pts[i + 1][1], z],
            uv, uv, uv, [0, 0, up ? 1 : -1]);
  }
  /* a hand rail round a closed outline at height z: posts and two rails */
  function railing(K, pts, z, h) {
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i], q = pts[(i + 1) % pts.length];
      rod(K.dark, [p[0], p[1], z], [p[0], p[1], z + h], 0.03, 4, NOUV, undefined, true);
      rod(K.dark, [p[0], p[1], z + h], [q[0], q[1], z + h], 0.03, 4, NOUV, undefined, true);
      rod(K.dark, [p[0], p[1], z + h * 0.5], [q[0], q[1], z + h * 0.5], 0.022, 4, NOUV, undefined, true);
    }
  }
  function buildTower(K) {
    var h = 2.1, z1 = Z0 + 6.4;
    /* the block: two storeys of 3.2 m in pale render, a dark roof */
    sbox(K.paint, "render", TX - h, TX + h, TY - h, TY + h, Z0, z1, ["nz", "pz"]);
    /* the balcony slab round the cab: its edge in render, its deck dark */
    var rUV = swUV("render"), dUV = swUV("roof");
    box(K.paint, TX - h - 0.35, TX + h + 0.35, TY - h - 0.35, TY + h + 0.35, z1, z1 + 0.25,
        function (f) { return f === "pz" || f === "nz" ? dUV : rUV; });
    /* windows 0.1 m proud (at 40 mm they were under one depth step at the
       zoom-out limit): a band of glass on every face upstairs, below a
       window on three faces and the door on the south, onto the lane */
    var zu0 = Z0 + 3.9, zu1 = Z0 + 5.3, zl0 = Z0 + 1.1, zl1 = Z0 + 2.2, e = 0.10;
    nobox(K.glass, TX - 1.5, TX + 1.5, TY - h - e, TY - h, zu0, zu1, ["py"]);
    nobox(K.glass, TX - 1.5, TX + 1.5, TY + h, TY + h + e, zu0, zu1, ["ny"]);
    nobox(K.glass, TX + h, TX + h + e, TY - 1.5, TY + 1.5, zu0, zu1, ["nx"]);
    nobox(K.glass, TX - h - e, TX - h, TY - 1.5, TY + 1.5, zu0, zu1, ["px"]);
    nobox(K.glass, TX + h, TX + h + e, TY - 1.0, TY + 1.0, zl0, zl1, ["nx"]);
    nobox(K.glass, TX - h - e, TX - h, TY - 1.0, TY + 1.0, zl0, zl1, ["px"]);
    nobox(K.glass, TX - 1.2, TX + 1.2, TY + h, TY + h + e, zl0, zl1, ["ny"]);
    sbox(K.paint, "door", TX - 0.5, TX + 0.5, TY - h - e, TY - h, Z0, Z0 + 2.1, ["py", "nz"]);
    /* a split air-conditioning unit on the east wall, as at Linton */
    sbox(K.paint, "alu", TX + h, TX + h + 0.35, TY + 1.55, TY + 1.95, Z0 + 0.1, Z0 + 0.75, ["nx", "nz"]);
    /* the cab: a sill in render, the glass leaning out 8 degrees all round,
       a mullion at every corner, a roof with a team-coloured fascia */
    var zs = z1 + 0.25, zg0 = zs + 0.75, zg1 = zg0 + 2.3, zr = zg1 + 0.42;
    var o0 = octo(TX, TY, 1.95, 0.55), o1 = octo(TX, TY, 2.28, 0.64);
    band(K.paint, o0, zs, o0, zg0, swUV("render"), TX, TY);
    band(K.glass, o0, zg0, o1, zg1, NOUV, TX, TY);
    for (var i = 0; i < o0.length; i++)
      rod(K.dark, [o0[i][0], o0[i][1], zg0], [o1[i][0], o1[i][1], zg1], 0.07, 4, NOUV, undefined, true);
    var o2 = octo(TX, TY, 2.55, 0.72);
    band(K.team, o2, zg1, o2, zr, NOUV, TX, TY);
    cap(K.paint, o2, zg1, false, swUV("roof"));
    cap(K.paint, o2, zr, true, swUV("roof"));
    /* balcony rail on the block's edge, and a rail on the cab roof */
    var bh = h + 0.28;
    railing(K, [[TX - bh, TY - bh], [TX + bh, TY - bh], [TX + bh, TY + bh], [TX - bh, TY + bh]], zs, 1.0);
    railing(K, octo(TX, TY, 2.4, 0.68), zr, 0.9);
    /* the roof: two whips, the anemometer mast, the red obstruction light */
    rod(K.dark, [TX - 1.4, TY + 1.4, zr], [TX - 1.4, TY + 1.4, zr + 2.6], 0.03, 4, NOUV, 0.015);
    rod(K.dark, [TX + 1.4, TY - 1.4, zr], [TX + 1.4, TY - 1.4, zr + 2.2], 0.03, 4, NOUV, 0.015);
    rod(K.dark, [TX + 1.3, TY + 1.3, zr], [TX + 1.3, TY + 1.3, zr + 1.9], 0.05, 5, NOUV);
    rod(K.dark, [TX + 1.0, TY + 1.3, zr + 1.9], [TX + 1.6, TY + 1.3, zr + 1.9], 0.025, 4, NOUV);
    rod(K.lamp, [TX + 1.3, TY + 1.3, zr + 1.9], [TX + 1.3, TY + 1.3, zr + 2.15], 0.09, 6, NOUV);
    /* a canopy over the door */
    sbox(K.paint, "roof", TX - 0.75, TX + 0.75, TY - h - 0.9, TY - h, Z0 + 2.35, Z0 + 2.5);
  }

  /* ========================================================= the Quonset
     The T-rib hut, 16 x 36 ft with its 8 ft radius, the semicircle standing
     on the slab, its axis north-south; the end walls framed and sheeted.
     The door is in the north end, onto the apron between the rows. */
  function buildQuonset(K) {
    var n = 18, i, y0 = QY0, y1 = QY1;
    for (i = 0; i < n; i++) {
      var a0 = i / n * PI, a1 = (i + 1) / n * PI;
      var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      var A = [QX + QR * c0, y0, Z0 + QR * s0], Bq = [QX + QR * c1, y0, Z0 + QR * s1];
      var C = [QX + QR * c1, y1, Z0 + QR * s1], D = [QX + QR * c0, y1, Z0 + QR * s0];
      var nA = [c0, 0, s0], nB = [c1, 0, s1];
      var u0 = i / n, u1 = (i + 1) / n, v0 = 0.01, v1 = 0.49;
      K.steel.triS(A, Bq, C, nA, nB, nB, [u0, v0], [u1, v0], [u1, v1]);
      K.steel.triS(A, C, D, nA, nB, nA, [u0, v0], [u1, v1], [u0, v1]);
    }
    /* end walls, flush with the ends of the arch */
    var ew = swUV("endwall");
    [[y0, -1], [y1, 1]].forEach(function (e) {
      for (var k = 0; k < n; k++) {
        var b0 = k / n * PI, b1 = (k + 1) / n * PI, r = QR - 0.02;
        K.paint.tri([QX, e[0], Z0], [QX + r * Math.cos(b0), e[0], Z0 + r * Math.sin(b0)],
                    [QX + r * Math.cos(b1), e[0], Z0 + r * Math.sin(b1)], ew, ew, ew, [0, e[1], 0]);
      }
    });
    /* the door and its head, a window either side of it and two in the
       far end, all inside the arch */
    sbox(K.paint, "door", QX - 0.8, QX + 0.8, y1 - 0.02, y1 + 0.08, Z0, Z0 + 2.1, ["ny", "nz"]);
    sbox(K.paint, "frame", QX - 0.95, QX + 0.95, y1 - 0.02, y1 + 0.12, Z0 + 2.1, Z0 + 2.22, ["ny"]);
    [-1.45, 1.45].forEach(function (dx) {
      var x = QX + dx;
      nobox(K.glass, x - 0.28, x + 0.28, y1 - 0.02, y1 + 0.08, Z0 + 1.0, Z0 + 1.6, ["ny"]);
      nobox(K.glass, x - 0.3, x + 0.3, y0 - 0.08, y0 + 0.02, Z0 + 1.0, Z0 + 1.7, ["py"]);
    });
    /* a stove pipe off the ridge */
    rod(K.dark, [QX + 0.7, y1 - 2.6, Z0 + QR - 0.2], [QX + 0.7, y1 - 2.6, Z0 + QR + 0.9], 0.1, 6, NOUV);
    rod(K.dark, [QX + 0.7, y1 - 2.6, Z0 + QR + 0.9], [QX + 0.7, y1 - 2.6, Z0 + QR + 1.0], 0.18, 6, NOUV);
  }

  /* ======================================================== the fuel point */
  function buildFuel(THREE, K) {
    /* the berm: outer toe, outer crest, inner crest, inner toe; 0.6 m high,
       1:1 slopes, a 0.5 m crest. Its floor, 4.7 x 5.2 m, holds 14.6 m3 to
       the crest: more than the 110% of the tank's 11.4 m3 a containment
       has to hold. */
    var lv = [[4.05, 4.3, Z0], [3.45, 3.7, Z0 + BH], [2.95, 3.2, Z0 + BH], [2.35, 2.6, Z0]];
    function ring(l) { return [[-l[0], FY - l[1], l[2]], [l[0], FY - l[1], l[2]], [l[0], FY + l[1], l[2]], [-l[0], FY + l[1], l[2]]]; }
    function euv(p) { return [p[0] / 6, 0.25 + (p[1] - FY) / 26]; }
    for (var k = 0; k < 3; k++) {
      var A = ring(lv[k]), Bq = ring(lv[k + 1]);
      for (var i = 0; i < 4; i++) {
        var j = (i + 1) % 4;
        /* every face of the bank faces up: outward and up, the crest up,
           inward and up */
        var mx = (A[i][0] + A[j][0]) / 2, my = (A[i][1] + A[j][1]) / 2 - FY;
        var out = k === 0 ? 1 : k === 2 ? -1 : 0;
        K.fill.quad(A[i], A[j], Bq[j], Bq[i], euv(A[i]), euv(A[j]), euv(Bq[j]), euv(Bq[i]),
                    [mx * out * 0.2, my * out * 0.2, 1]);
      }
    }
    /* the tank: a pillow, boxy in plan, rounded at its edges */
    var a = 2.05, b = 2.3, c = 0.325, zc = Z0 + c + 0.01, NU = 20, NV = 8, u, v;
    var V = [];
    function sg(t, e) { var s = t < 0 ? -1 : 1; return s * Math.pow(Math.abs(t), e); }
    for (v = 0; v <= NV; v++) {
      var row = [], th = -PI / 2 + PI * v / NV;
      for (u = 0; u < NU; u++) {
        var ph = u / NU * 2 * PI;
        row.push([sg(Math.cos(th), 0.45) * sg(Math.cos(ph), 0.3) * a,
                  FY + sg(Math.cos(th), 0.45) * sg(Math.sin(ph), 0.3) * b,
                  zc + sg(Math.sin(th), 0.45) * c]);
      }
      V.push(row);
    }
    /* normals from the grid's own neighbours, so the rounded edge shades
       round and the flat top stays flat */
    function nrm(vv, uu) {
      var p = V[vv][uu];
      var pu = V[vv][(uu + 1) % NU], pm = V[vv][(uu + NU - 1) % NU];
      var pv = V[Math.min(NV, vv + 1)][uu], pn = V[Math.max(0, vv - 1)][uu];
      var tu = [pu[0] - pm[0], pu[1] - pm[1], pu[2] - pm[2]], tv = [pv[0] - pn[0], pv[1] - pn[1], pv[2] - pn[2]];
      var n = [tu[1] * tv[2] - tu[2] * tv[1], tu[2] * tv[0] - tu[0] * tv[2], tu[0] * tv[1] - tu[1] * tv[0]];
      var l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
      if (l < 1e-9) return [0, 0, vv > NV / 2 ? 1 : -1];
      n = [n[0] / l, n[1] / l, n[2] / l];
      var o = [p[0], p[1] - FY, p[2] - zc];
      if (n[0] * o[0] + n[1] * o[1] + n[2] * o[2] < 0) n = [-n[0], -n[1], -n[2]];
      return n;
    }
    for (v = 1; v < NV; v++) for (u = 0; u < NU; u++) {
      var u1 = (u + 1) % NU;
      var p00 = V[v][u], p10 = V[v][u1], p01 = V[v + 1 > NV ? NV : v + 1][u], p11 = V[v + 1 > NV ? NV : v + 1][u1];
      if (v + 1 <= NV - 1) {
        K.dark.triS(p00, p10, p11, nrm(v, u), nrm(v, u1), nrm(v + 1, u1), NOUV, NOUV, NOUV);
        K.dark.triS(p00, p11, p01, nrm(v, u), nrm(v + 1, u1), nrm(v + 1, u), NOUV, NOUV, NOUV);
      }
    }
    /* close the top and the bottom rings with flat caps */
    var top = V[NV - 1], bot = V[1];
    for (u = 1; u < NU - 1; u++) {
      K.dark.tri(top[0], top[u], top[u + 1], NOUV, NOUV, NOUV, [0, 0, 1]);
      K.dark.tri(bot[0], bot[u], bot[u + 1], NOUV, NOUV, NOUV, [0, 0, -1]);
    }
    /* filler cap on the top, and the hose out over the south bank to the
       pump skid in front of it */
    rod(K.dark, [0.6, FY + 1.2, zc + c - 0.02], [0.6, FY + 1.2, zc + c + 0.12], 0.14, 8, NOUV);
    var hose = [[0.0, FY - b + 0.05, Z0 + 0.3], [0.0, FY - 2.9, Z0 + 0.55], [0.0, FY - 3.45, Z0 + BH + 0.08],
                [0.0, FY - 3.95, Z0 + 0.45], [0.0, FY - 4.35, Z0 + 0.1], [0.0, FY - 4.6, Z0 + 0.4]];
    for (var h = 0; h < hose.length - 1; h++) rod(K.dark, hose[h], hose[h + 1], 0.07, 6, NOUV, undefined, true);
    /* pump and filter-separator skid, olive drab */
    var py = FY - 4.6;
    sbox(K.paint, "olive", -0.8, 0.8, py - 1.1, py, Z0, Z0 + 0.25, ["nz"]);
    sbox(K.paint, "olive", -0.7, 0.2, py - 1.0, py - 0.1, Z0 + 0.25, Z0 + 0.95, ["nz"]);
    rod(K.paint, [0.45, py - 0.15, Z0 + 0.25], [0.45, py - 0.15, Z0 + 1.15], 0.22, 8, swUV("olive"));
    rod(K.paint, [0.45, py - 0.75, Z0 + 0.25], [0.45, py - 0.75, Z0 + 1.15], 0.22, 8, swUV("olive"));
    rod(K.dark, [-0.25, py - 1.0, Z0 + 0.6], [-0.25, py - 1.4, Z0 + 0.6], 0.06, 6, NOUV);
    extinguisher(K, 1.9, FY - 5.2, 0.4);
  }

  /* a ground power cart, olive drab, on four small wheels with its tow bar
     folded up: 2.3 x 1.2 m */
  function powerCart(K, x, y) {
    sbox(K.paint, "olive", x - 0.6, x + 0.6, y - 1.15, y + 1.15, Z0 + 0.32, Z0 + 1.25);
    sbox(K.paint, "frame", x - 0.62, x + 0.62, y - 1.0, y - 0.2, Z0 + 1.25, Z0 + 1.32, ["nz"]);
    [-0.8, 0.8].forEach(function (dy) {
      rod(K.dark, [x - 0.66, y + dy, Z0 + 0.2], [x - 0.5, y + dy, Z0 + 0.2], 0.2, 8, NOUV);
      rod(K.dark, [x + 0.5, y + dy, Z0 + 0.2], [x + 0.66, y + dy, Z0 + 0.2], 0.2, 8, NOUV);
    });
    rod(K.dark, [x, y + 1.15, Z0 + 0.5], [x, y + 1.5, Z0 + 1.3], 0.04, 4, NOUV);
    nobox(K.dark, x - 0.62, x + 0.62, y + 0.2, y + 0.9, Z0 + 0.55, Z0 + 1.05);
  }

  /* a 150 lb wheeled extinguisher: red bottle, two wheels, a handle */
  function extinguisher(K, x, y, hdg) {
    var c = Math.cos(hdg), s = Math.sin(hdg);
    function P(dx, dy, z) { return [x + dx * c - dy * s, y + dx * s + dy * c, z]; }
    rod(K.paint, P(0, 0, Z0 + 0.12), P(0, 0, Z0 + 1.15), 0.18, 8, swUV("red"));
    rod(K.dark, P(0, -0.3, Z0 + 0.22), P(0, 0.3, Z0 + 0.22), 0.22, 8, NOUV);
    rod(K.dark, P(-0.1, 0, Z0 + 1.15), P(-0.1, 0, Z0 + 1.28), 0.06, 5, NOUV);
    rod(K.dark, P(-0.22, -0.2, Z0 + 0.3), P(-0.4, -0.2, Z0 + 1.1), 0.02, 4, NOUV);
    rod(K.dark, P(-0.22, 0.2, Z0 + 0.3), P(-0.4, 0.2, Z0 + 1.1), 0.02, 4, NOUV);
    rod(K.dark, P(-0.4, -0.2, Z0 + 1.1), P(-0.4, 0.2, Z0 + 1.1), 0.02, 4, NOUV);
  }

  /* ========================================================== the windsock
     A 6 m mast, the sock hung off a swivel at its head, streaming west and
     20 degrees down in a moderate easterly, over the plot rather than off
     its edge. The sock is a truncated cone open at both ends, drawn inside
     and out. */
  function buildWindsock(THREE, K) {
    var zt = Z0 + 6.0;
    sbox(K.paint, "conc", WSX - 0.4, WSX + 0.4, WSY - 0.4, WSY + 0.4, Z0, Z0 + 0.18, ["nz"]);
    rod(K.paint, [WSX, WSY, Z0 + 0.18], [WSX, WSY, zt], 0.11, 8, swUV("white"), 0.07);
    rod(K.dark, [WSX, WSY, zt], [WSX, WSY, zt + 0.35], 0.06, 6, NOUV);
    rod(K.lamp, [WSX, WSY, zt + 0.35], [WSX, WSY, zt + 0.55], 0.1, 6, NOUV);
    var dip = 20 * PI / 180, d = [-Math.cos(dip), 0, -Math.sin(dip)];
    var up = [-Math.sin(dip), 0, Math.cos(dip)], side = [0, 1, 0];
    var o = [WSX - 0.25, WSY, zt + 0.12];
    rod(K.dark, [WSX, WSY, zt + 0.12], o, 0.03, 4, NOUV);
    var LEN = 3.6, R0 = 0.45, R1 = 0.2, NS = 14, NB = 5, i, k;
    function Nn(a) {
      var cc = Math.cos(a), ss = Math.sin(a);
      return [side[0] * cc + up[0] * ss, side[1] * cc + up[1] * ss, side[2] * cc + up[2] * ss];
    }
    function Q(a, t, r) {
      var n = Nn(a);
      return [o[0] + d[0] * LEN * t + n[0] * r, o[1] + d[1] * LEN * t + n[1] * r, o[2] + d[2] * LEN * t + n[2] * r];
    }
    for (k = 0; k < NB; k++) {
      var t0 = k / NB, t1 = (k + 1) / NB;
      var r0 = R0 + (R1 - R0) * t0, r1 = R0 + (R1 - R0) * t1;
      /* each band samples its own stripe of the strip */
      var uvb = [(k + 0.5) / NB, SOCK_V];
      for (i = 0; i < NS; i++) {
        var a0 = i / NS * 2 * PI, a1 = (i + 1) / NS * 2 * PI;
        var A = Q(a0, t0, r0), B1 = Q(a1, t0, r0), C = Q(a1, t1, r1), D = Q(a0, t1, r1);
        var n0 = Nn(a0), n1 = Nn(a1), m0 = [-n0[0], -n0[1], -n0[2]], m1 = [-n1[0], -n1[1], -n1[2]];
        K.paint.triS(A, B1, C, n0, n1, n1, uvb, uvb, uvb);
        K.paint.triS(A, C, D, n0, n1, n0, uvb, uvb, uvb);
        /* the inside, 15 mm in: the cloth has a thickness */
        var Ai = Q(a0, t0, r0 - 0.015), Bi = Q(a1, t0, r0 - 0.015), Ci = Q(a1, t1, r1 - 0.015), Di = Q(a0, t1, r1 - 0.015);
        K.paint.triS(Ai, Ci, Bi, m0, m1, m1, uvb, uvb, uvb);
        K.paint.triS(Ai, Di, Ci, m0, m0, m1, uvb, uvb, uvb);
      }
    }
    /* the throat hoop */
    for (i = 0; i < NS; i++) rod(K.dark, Q(i / NS * 2 * PI, 0, R0), Q((i + 1) / NS * 2 * PI, 0, R0), 0.03, 4, NOUV, undefined, true);
  }

  /* =============================================================== build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "airbase";
    var X = textures(THREE);
    var T = {
      paint: new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.paint, roughness: 0.92, metalness: 0.02 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.steel, roughness: 0.62, metalness: 0.18 }),
      fill:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.fill, roughness: 0.97, metalness: 0.0 }),
      dark:  new THREE.MeshStandardMaterial({ color: 0x2b2d2b, roughness: 0.62, metalness: 0.25 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x1b2a31, roughness: 0.14, metalness: 0.35,
                                              emissive: 0x0b171d, emissiveIntensity: 0.6 }),
      /* exactly the owner's colour */
      team:  new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x4b8fe0,
                                              roughness: 0.6, metalness: 0.1 }),
      lamp:  new THREE.MeshStandardMaterial({ color: 0xd8342a, emissive: 0xd8342a, emissiveIntensity: 0.9,
                                              roughness: 0.4, metalness: 0.1 }),
    };
    var K = {};
    Object.keys(T).forEach(function (k) { K[k] = new Batch(); });

    /* ------------------------------------------------------ the hardstand */
    var s0 = planUV(-HALF, -HALF), s1 = planUV(HALF, HALF);
    K.paint.quad([-HALF, -HALF, Z0], [HALF, -HALF, Z0], [HALF, HALF, Z0], [-HALF, HALF, Z0],
                 [s0[0], s0[1]], [s1[0], s0[1]], [s1[0], s1[1]], [s0[0], s1[1]], [0, 0, 1]);
    sbox(K.paint, "edge", -HALF, HALF, -HALF, HALF, 0, Z0 - 0.001, ["pz", "nz"]);

    /* ------------------------------------------------------ the revetments
       Four, each a pair of parallel walls open at both ends: per row, the
       outer and inner wall of the west and of the east bay. */
    ROWS.forEach(function (py) {
      var y0 = py + WA, y1 = py + WB;
      [1, -1].forEach(function (s) {
        binWall(K, y0, y1, s > 0 ? FI0 : -FI1, s > 0 ? FI1 : -FI0, 0);
        binWall(K, y0, y1, s > 0 ? FO0 : -FO1, s > 0 ? FO1 : -FO0, s);
        /* an extinguisher in the mouth of each bay, by its outer wall */
        extinguisher(K, s * (FO0 - 1.0), y1 - 0.9, s > 0 ? PI : 0);
      });
    });
    /* two power carts on the apron between the rows, beside the lane */
    powerCart(K, 7.4, -2.0);
    powerCart(K, -7.4, -2.0);

    /* ------------------------------------------ the lane and the apron */
    buildTower(K);
    buildQuonset(K);
    buildFuel(THREE, K);
    buildWindsock(THREE, K);

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(T).forEach(function (k) {
      var m = K[k].mesh(THREE, T[k], "airbase_" + k);
      if (m) root.add(m);
    });
    return root;
  }

  return { build: build };
})();

/* Registration: BLD_MODELS is looked up by the def's own id, and this file
   loads after units3d_salvage.js, so the plain assignment replaces the
   hangar model; icons3d.js draws the same build() for the sidebar. */
BLD_MODELS["airbase"] = { build: HeroAirbase.build };
