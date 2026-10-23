/* ===== airbase_runway.js - HERO model: the runway airbase ==================
   rules.js airbase: 12 x 4 tiles, 240 x 80 m - a runway 40 m wide along the
   south side and four revetments in a row along the north, 60 m of it each
   (owner 2026-10-23: "the airport model should be re-design and we should
   see the aircraft taking off and landing and then put the base"; "3d models
   for airbase"). One model for every faction and every period: build() is
   handed only the team colour. Nothing national, no text, and no runway
   designation numbers: the base will turn (R when placing), and a number
   would then read wrong.

   RECOGNITION LIST - what makes it read as a military runway field at game
   zoom, each with the reference it rests on:
     1. A dark asphalt runway the whole length of the plot, its paint white
        (FAA AIM 2-3-2: "Markings for runways are white"; RAF Coningsby from
        the air, geograph 6233941: dark runway, white piano keys).
     2. Threshold "piano keys" at both ends: ten stripes, 1.8 m wide on 1.8 m
        gaps, 30 m long, starting 6 m in from the threshold. UK MAA RA 3514
        para 18 (it follows ICAO Annex 14): stripes start 6 m from the
        threshold and reach to within 3 m of the edge; 30 m -> 8 stripes,
        45 m -> 12 (also FAA AIM TBL 2-3-3). Ten is what reaches to within
        3 m of a 40 m runway's edges at 1.8 m + 1.8 m. Stripe size: see
        "not sourced" below.
     3. The centreline: 30 m stripes on 20 m gaps (stripe + gap 50 m), 0.9 m
        wide (RA 3514: stripe + gap 50-75 m, stripes at least 30 m, 0.45-0.90
        m wide).
     4. Aiming point and touchdown zone marks past each threshold (RA 3514
        Tables 2 and 3, the 800-1,199 m landing-distance row, the one whose
        sizes fit a 240 m strip): aiming point bars 30 m x 6 m with 9 m
        between their inner edges; one touchdown-zone pair of three 1.8 m
        stripes on 1.5 m gaps, 22.5 m long, on the same 9 m inner spacing.
        The second pair would reach the middle: FAA AIM 2-3-3 drops pairs
        that come within 270 m of the midpoint.
     5. Side stripes, 0.9 m, along both edges (RA 3514: 0.9 m on runways 30 m
        or wider).
     6. Rubber in the touchdown zones: dark streaks along the runway where the
        main wheels run, thick past the aiming point and thinning toward the
        middle, laid over the paint too ("Rubber removed to ensure flight
        safety", USAF 161101-F-BF612-1115; "Runway-rubber-removal.jpg").
     7. Lights: white elevated edge lights every 20 m both sides (Annex 14
        5.3.9.6 via ICAO APAC WP25 2024: no more than 60 m apart), flush
        where the four lead-ins cross; a row of combined threshold / end
        fittings across each end, 3 m apart, green toward the approach and
        red toward the runway (en.wikipedia "Runway": "green when viewed by
        approaching aircraft and red when seen from the runway"; the 3 m
        spacing is not sourced, see below).
     8. Four revetments of earth-filled corrugated steel bins, 3.66 m high
        and 1.68 m thick (R.P. Fox, "Air Base Defense in the Republic of
        Vietnam", 1979, p.70; Prime BEEF history: 10 ft sections bolted to
        steel columns), set as straight parallel walls open at both ends with
        one machine between each pair (Da Nang, Bien Hoa; Dong Tam and Vung
        Tau, July 1968, Wikimedia Commons), a row of bays sharing their walls
        (the Bien Hoa aerial: "a row of fighters parked between straight
        walls"). Pale fill along the tops (Kunsan 2013, USAF
        130815-F-MF529-068).
     9. Yellow lead-in lines with a black keyline from every bay to the
        runway edge (Kunsan 2013), and a runway-holding-position marking
        across each, two solid and two dashed yellow lines, the solid ones on
        the side where the aircraft holds (FAA AIM 2-3-5).
    10. The small tower: a two-storey block with a glazed cab, the glass
        leaning out in three panes a face, a railed balcony, the owner's
        colour on the cab fascia (RAF Linton-on-Ouse, geograph 430535).
    11. The T-rib Quonset (16 x 36 ft on an 8 ft radius, en.wikipedia
        "Quonset hut"), the 3,000 US gal fuel bladder in its berm, two ground
        power carts, wheeled extinguishers at the bay mouths.
    12. The ICAO windsock: a truncated cone 3.6 m long, 0.9 m across the
        throat, five bands with orange first and last (Annex 14 5.1.1, as
        hero/airbase_revetments.js gives it).

   LAYOUT, MEASURED (2026-10-23). Every one of the 389 aircraft types was
   parked on a pad of the flat interim field in the real renderer and its
   drawn solid parts measured in the base's frame: per half metre along the
   pad's axis, the farthest any part reaches across it below 1.4, 2.6, 3.8,
   7.0 and 11.5 m (tools/jsc/ab_measure.js in the modeller's tree); then
   tools/jsc/parked3d_check.js section B on this model.
     - THE WALLS ON THE BAY LINES. Each revetment is the 60 m of its bay:
       the walls stand on the lines between the bays (x -60, 0, +60, shared,
       as in the Bien Hoa row) and on the plot's east and west edges: 58.3 m
       between the faces of an inner bay, 57.5 m in an end bay. Of the 389
       types only the 1980s B-52G/H row touches a wall, 0.18 m into a face
       1.6 m up (parked3d OVERSIZE); the 110 other types the old 22.8 m bays
       could not hold - the B-2, five B-52 rows, the E-3s, tankers and
       airlifters - stand clear, their wings over the bins where they are
       wider than the bay.
     - THE WALLS' LENGTH. They run from 9 m north of the runway edge to
       34.8 m, 25.8 m: the Tan Son Nhut revetment Prime BEEF designed in 1966
       was 27 m long. The 9 m strip in front of the bay mouths is kept clear,
       paint only: the take-off and landing pieces taxi there.
     - THE SERVICE BAND along the north edge, y 35.65 to 40, behind the
       walls: below 11.5 m only tails stand over it - nothing but the B-2's
       wingtips reaches more than 19 m from its pad there, and nothing at
       all south of y 35.5 does (the RAF E-3D's wing reaches 29.7 m at y
       35.0; a first tower 4.2 m square, its balcony at 34.9, was 0.53 m
       inside it). So the buildings stand in it, each centred on a wall
       line: the Quonset on the x -60 line, the tower, 3.5 m square, on the
       centre line, the fuel point on the +60 line (its berm from y 32.3,
       where below 1.4 m nothing reaches past 10.2 m), the power carts in
       the north-west corner and the windsock in the north-east, its sock
       streaming west along the band.
     - Nothing stands over a pad: straight down over each, the first thing of
       the base is the slab.

   NOT SOURCED, and drawn as stated: the threshold stripes' length and width
   (RA 3514 gives them only in a figure; 30 m x 1.8 m is the ICAO figure as
   commonly drawn); the edge lights' height (0.35 m, under the 26 in a
   clearway allows a threshold light, en.wikipedia "Runway"); the 3 m
   between the threshold / end fittings; the holding
   marking's dash length (1 m); the asphalt and concrete tones (sampled off
   the Coningsby aerial and the USAF rubber-removal photograph, taken to
   about 0.75 of their level). The distances along the runway are
   compressed: a real aiming point is 250 m past the threshold, here 76 m.
   Left out: a fire / crash station and arrestor gear (UFC 3-260-01 3-17
   names the BAK-12 and others but not where they stand; FC 3-260-18F is not
   public), and a PAPI (no fetched source); there is no clear ground for a
   station anyway.

   Model frame as every structure's: +X east, +Y north, +Z up, world metres
   over BLD_SCALE (1.10), the origin at the footprint's middle. Everything
   below is written in WORLD metres and scaled by S as it is emitted.
   Materials, one mesh each: GROUND (one CanvasTexture: the plot in plan
   with every marking, and a strip of flat colours the small painted parts
   take their UVs from), STEEL (bins and hut), FILL (bin tops and berm),
   DARK, GLASS, TEAM (exactly C.team: the end bins' bands and the tower's
   cab fascia) and LAMP (the lights, emissive, their colours from a small
   canvas). ASCII only.                                                     */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroAirbaseRunway = (function () {
  "use strict";

  var PI = Math.PI;
  var S = 1 / 1.1;                       /* world metres -> model             */

  /* ------------------------------------------------------------- datums
     world metres, x east, y north, origin at the plot's middle */
  var HX = 120, HY = 40;                 /* the plot, 240 x 80 m              */
  var Z0 = 0.33;                         /* the slab's top (model 0.30)       */
  var RWN = 0, RWS = -40, RWC = -20;     /* runway north and south edges, centreline (rules.js runway y 3, half 1) */
  var PADS = [-90, -30, 30, 90], PADY = 22;   /* rules.js padPts, 0.9 tile from the north edge */
  var WH = 3.66, WT = 1.68, ZW = Z0 + WH;     /* bin wall: 12 ft high, 5.5 ft thick */
  var WY0 = 9.0;                         /* the walls' south ends, 9 m north of the runway edge */
  var WALLS = [                          /* x0, x1, north end, edge side      */
    [-HX, -HX + WT, 34.8, -1],
    [-60 - WT / 2, -60 + WT / 2, 34.8, 0],
    [-WT / 2, WT / 2, 34.8, 0],
    [60 - WT / 2, 60 + WT / 2, 31.9, 0],
    [HX - WT, HX, 34.8, 1]
  ];
  var CAP = 2.1;                         /* the end bin, painted in bands     */
  var ZF = ZW - 0.04;                    /* the fill, just under the bins' top edge */
  var TX = 0, TY = 37.8;                 /* the tower, on the centre line in the service band */
  var QR = 2.44, QX0 = -65.5, QX1 = -54.5, QY = 37.5;   /* Quonset, axis east-west on the x -60 line */
  var FX = 60, FY = 35.95;               /* the fuel point on the +60 line    */
  var BH = 0.6;                          /* berm height                       */
  var WSX = 117.6, WSY = 38.2;           /* the windsock, north-east corner   */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, clamp) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  /* ============================================================ the ground
     2048 x 1024. Rows 64..1023 are the plot in plan: 8.53 px a metre along
     it, 12 across, x -120 at the left, y +40 at row 64. Rows 0..63 are the
     colour strip: twenty-four 64 px swatches, then the windsock's five bands
     over the last 512 px. */
  var GW = 2048, GH = 1024, PLAN0 = 64, PXX = GW / 240, PXY = 960 / 80;
  var SW = { white: 0, render: 1, roof: 2, edge: 3, orange: 4, red: 5, olive: 6, endwall: 7,
             yellow: 8, black: 9, door: 10, alu: 11, conc: 12, frame: 13, steel: 14 };
  var SWC = ["#e6e6df", "#c3bfb2", "#62645f", "#7b7c75", "#e0601c", "#b0231c", "#565838", "#7c7f70",
             "#d6a52b", "#1e1f1d", "#3d4a3b", "#b4b7b3", "#8d8e87", "#3a3c3a", "#8f938e"];
  function swUV(name) { return [(SW[name] * 64 + 32) / GW, 1 - 32 / GH]; }
  function sockUV(k) { return [(1536 + (k + 0.5) * 102.4) / GW, 1 - 32 / GH]; }
  function GX(x) { return (x + HX) * PXX; }
  function GY(y) { return PLAN0 + (HY - y) * PXY; }
  function planUV(x, y) { return [(x + HX) / (2 * HX), 1 - GY(y) / GH]; }

  var PAINT = "#e4e4dc", YEL = "#d6a52b", KEY = "#1c1c1a";

  function groundCanvas() {
    var cv = mkCv(GW, GH), g = cv.getContext("2d"), R = rng(19651), i, j, k;
    function rect(x0, x1, y0, y1) {          /* a plan rectangle, metres */
      var a = Math.min(x0, x1), b = Math.max(x0, x1), c = Math.min(y0, y1), d = Math.max(y0, y1);
      g.fillRect(GX(a), GY(d), (b - a) * PXX, (d - c) * PXY);
    }
    /* ---- the colour strip ---- */
    for (i = 0; i < SWC.length; i++) { g.fillStyle = SWC[i]; g.fillRect(i * 64, 0, 64, 64); }
    g.fillStyle = SWC[SW.conc]; g.fillRect(SWC.length * 64, 0, 1536 - SWC.length * 64, 64);
    for (i = 0; i < 5; i++) { g.fillStyle = (i % 2) ? "#ecebe4" : "#e0601c"; g.fillRect(1536 + i * 102.4, 0, 103, 64); }

    /* ---- the apron and the bays: rigid pavement in 7.5 m panels (25 ft,
       the USAF joint spacing), each pour its own tone ---- */
    g.fillStyle = "#87867e"; rect(-HX, HX, RWN, HY);
    var P = 7.5;
    for (i = 0; i < 32; i++) for (j = 0; j < 6; j++) {
      var t = R();
      g.fillStyle = t < 0.5 ? "rgba(255,255,250," + (0.03 + R() * 0.05).toFixed(3) + ")"
                            : "rgba(20,20,16," + (0.03 + R() * 0.06).toFixed(3) + ")";
      rect(-HX + i * P, -HX + (i + 1) * P, HY - j * P, HY - (j + 1) * P);
    }
    for (i = 0; i < 14000; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(40,40,36,0.16)" : "rgba(210,210,200,0.14)";
      g.fillRect(R() * GW, GY(HY) + R() * (GY(RWN) - GY(HY)), 1.5, 1.5);
    }
    for (i = 0; i < 90; i++) {
      g.fillStyle = R() < 0.6 ? "rgba(30,30,26,0.045)" : "rgba(235,235,225,0.04)";
      g.fillRect(R() * GW, GY(HY) + R() * (GY(RWN) - GY(HY)) - 20, 40 + R() * 160, 20 + R() * 60);
    }
    g.fillStyle = "rgba(38,38,34,0.55)";
    for (i = 1; i < 32; i++) rect(-HX + i * P - 0.1, -HX + i * P + 0.1, RWN, HY);
    for (j = 1; j < 6; j++) rect(-HX, HX, HY - j * P - 0.07, HY - j * P + 0.07);
    g.strokeStyle = "rgba(34,34,30,0.45)"; g.lineWidth = 1;
    for (i = 0; i < 24; i++) {
      var cx = R() * GW, cy = GY(HY) + R() * (GY(RWN) - GY(HY)), ca = R() * PI * 2;
      g.beginPath(); g.moveTo(cx, cy);
      for (k = 0; k < 4; k++) { ca += (R() - 0.5) * 0.8; cx += Math.cos(ca) * 14; cy += Math.sin(ca) * 14; g.lineTo(cx, cy); }
      g.stroke();
    }
    /* what aircraft leave on a stand: drips under the airframe, and soot on
       the slab behind it from engines run up (the tails point north) */
    PADS.forEach(function (px) {
      for (var q = 0; q < 18; q++) {
        var ox = px + (R() - 0.5) * 8, oy = PADY + (R() - 0.5) * 14, rr = 0.4 + R() * 1.8;
        var gr = g.createRadialGradient(GX(ox), GY(oy), 0, GX(ox), GY(oy), rr * PXY);
        gr.addColorStop(0, "rgba(22,20,16,0.30)"); gr.addColorStop(1, "rgba(22,20,16,0)");
        g.fillStyle = gr; g.fillRect(GX(ox) - rr * PXY, GY(oy) - rr * PXY, 2 * rr * PXY, 2 * rr * PXY);
      }
      g.save(); g.translate(GX(px), GY(PADY + 13)); g.scale(1.0, 1.25);
      var r = 4.2 * PXY, gs = g.createRadialGradient(0, 0, 0, 0, 0, r);
      gs.addColorStop(0, "rgba(18,17,15,0.36)"); gs.addColorStop(1, "rgba(18,17,15,0)");
      g.fillStyle = gs; g.fillRect(-r, -r, 2 * r, 2 * r);
      g.restore();
      /* tie-down and grounding points */
      g.fillStyle = "rgba(24,24,22,0.8)";
      [[-3.4, -2.6], [3.4, -2.6], [-3.4, 3.6], [3.4, 3.6], [0, -7.5], [0, 7.8], [-9, 1], [9, 1]].forEach(function (o) {
        g.fillRect(GX(px + o[0]) - 2.5, GY(PADY + o[1]) - 2.5, 5, 5);
      });
    });
    /* the fuel point's floor: a black liner inside the berm */
    g.fillStyle = "rgba(26,27,24,0.92)"; rect(FX - 2.55, FX + 2.55, FY - 2.3, FY + 2.3);

    /* ---- the runway: asphalt, mottled, darker where it has been sealed ---- */
    g.fillStyle = "#58595a"; rect(-HX, HX, RWS, RWN);
    for (i = 0; i < 26000; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(20,20,22,0.22)" : "rgba(170,170,165,0.16)";
      g.fillRect(R() * GW, GY(RWN) + R() * (GY(RWS) - GY(RWN)), 1.2, 1.2);
    }
    for (i = 0; i < 120; i++) {
      g.fillStyle = R() < 0.55 ? "rgba(25,25,28,0.05)" : "rgba(200,200,195,0.035)";
      g.fillRect(R() * GW, GY(RWN) + R() * (GY(RWS) - GY(RWN)) - 30, 60 + R() * 220, 20 + R() * 70);
    }
    /* crack sealant, black and wandering */
    g.strokeStyle = "rgba(14,14,16,0.5)"; g.lineWidth = 1.4;
    for (i = 0; i < 30; i++) {
      var sx = R() * GW, sy = GY(RWN) + R() * (GY(RWS) - GY(RWN)), sa = (R() < 0.5 ? 0 : PI / 2) + (R() - 0.5) * 0.6;
      g.beginPath(); g.moveTo(sx, sy);
      for (k = 0; k < 6; k++) { sa += (R() - 0.5) * 0.5; sx += Math.cos(sa) * 12; sy += Math.sin(sa) * 12; g.lineTo(sx, sy); }
      g.stroke();
    }
    /* the seam between the asphalt and the apron's concrete */
    g.fillStyle = "rgba(20,20,18,0.6)"; rect(-HX, HX, RWN - 0.08, RWN + 0.08);

    /* ---- runway paint ---- */
    g.fillStyle = PAINT;
    /* side stripes, 0.9 m, their outer edge 1.2 m in (the edge lights stand outside them) */
    rect(-HX, HX, RWN - 2.1, RWN - 1.2);
    rect(-HX, HX, RWS + 1.2, RWS + 2.1);
    [-1, 1].forEach(function (e) {
      /* x measured from this end's threshold, inward */
      function X(d) { return e * (HX - d); }
      /* threshold stripes: 10, 1.8 m on 1.8 m, from 6 m to 36 m */
      for (var s = 0; s < 10; s++) {
        var off = -17.1 + s * 3.6;            /* stripe's lower edge from the centreline */
        rect(X(6), X(36), RWC + off, RWC + off + 1.8);
      }
      /* touchdown zone pair: three 1.8 m stripes on 1.5 m, 22.5 m long, inner edges 9 m apart */
      for (var q = 0; q < 3; q++) {
        var o = 4.5 + q * 3.3;
        rect(X(46), X(68.5), RWC + o, RWC + o + 1.8);
        rect(X(46), X(68.5), RWC - o - 1.8, RWC - o);
      }
      /* aiming point: two bars 30 m x 6 m, 9 m between their inner edges */
      rect(X(76), X(106), RWC + 4.5, RWC + 10.5);
      rect(X(76), X(106), RWC - 10.5, RWC - 4.5);
    });
    /* centreline: 30 m stripes on 20 m gaps, 0.9 m wide, symmetric about the middle */
    [[-65, -35], [-15, 15], [35, 65]].forEach(function (s) { rect(s[0], s[1], RWC - 0.45, RWC + 0.45); });
    /* paint wears: a few chips and the aggregate showing through */
    for (i = 0; i < 9000; i++) {
      g.fillStyle = "rgba(70,70,72," + (0.12 + R() * 0.2).toFixed(3) + ")";
      g.fillRect(R() * GW, GY(RWN) + R() * (GY(RWS) - GY(RWN)), 1.3, 1.3);
    }

    /* ---- rubber in the touchdown zones: streaks along the runway where the
       main wheels run, thick from the touchdown marks to past the aiming
       point, thinning toward the middle; over the paint, as on the real ones.
       Soft-edged throughout: every streak is a short run of low alpha. ---- */
    [-1, 1].forEach(function (e) {
      for (var n = 0; n < 2200; n++) {
        var d = 38 + Math.pow(R(), 1.5) * 90;              /* from the threshold */
        var side = R() < 0.5 ? -1 : 1, u = R();
        /* the main-gear tracks either side, and the nose wheels on the centreline */
        var lat = u < 0.16 ? (R() + R() - 1) * 1.2 : side * (3.5 + (R() + R() + R() - 1.5) * 4.0);
        var len = 3 + R() * 18, fade = Math.max(0, 1 - (d - 38) / 100);
        var a = (0.035 + R() * 0.09) * fade * fade;
        var x = e * (HX - d);
        g.fillStyle = "rgba(12,12,13," + a.toFixed(3) + ")";
        g.fillRect(GX(Math.min(x, x - e * len)), GY(RWC + lat) - 0.5, len * PXX, 0.8 + R() * 1.6);
      }
      /* the general darkening of the touchdown area, built of wide soft runs */
      for (var m = 0; m < 260; m++) {
        var d2 = 40 + Math.pow(R(), 1.3) * 80, w = 1.5 + R() * 4, lat2 = (R() + R() - 1) * 9;
        var x2 = e * (HX - d2), len2 = 8 + R() * 25;
        g.fillStyle = "rgba(14,14,16," + (0.018 * Math.max(0, 1 - (d2 - 40) / 90)).toFixed(4) + ")";
        g.fillRect(GX(Math.min(x2, x2 - e * len2)), GY(RWC + lat2 + w / 2), len2 * PXX, w * PXY);
      }
    });

    /* ---- yellow on a black keyline: the lead-ins and the holding positions ---- */
    function yrect(x0, x1, y0, y1) {
      g.fillStyle = KEY; rect(x0 - 0.08, x1 + 0.08, y0 - 0.08, y1 + 0.08);
      g.fillStyle = YEL; rect(x0, x1, y0, y1);
    }
    PADS.forEach(function (px) {
      /* the lead-in: from the back of the bay down its middle and out to the runway edge */
      yrect(px - 0.15, px + 0.15, RWN - 1.2, PADY + 12.0);
      /* runway-holding position, Pattern A: solid lines on the bay side, dashed on the runway side */
      var hw = 9.0, yh = 4.6;
      yrect(px - hw, px + hw, yh, yh + 0.3);
      yrect(px - hw, px + hw, yh - 0.6, yh - 0.3);
      for (var dx = -hw; dx < hw - 0.5; dx += 2.0) {
        yrect(px + dx, px + dx + 1.0, yh - 1.2, yh - 0.9);
        yrect(px + dx, px + dx + 1.0, yh - 1.8, yh - 1.5);
      }
    });
    /* rubber on the lead-ins and across the strip, where they taxi out */
    for (i = 0; i < 220; i++) {
      var lx = PADS[i % 4] + (R() - 0.5) * 7, ly = RWN + R() * (PADY + 4);
      g.fillStyle = "rgba(16,16,14," + (0.04 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(GX(lx), GY(ly), 1.5 + R() * 2, (3 + R() * 9) * PXY);
    }
    return cv;
  }

  /* STEEL: 512 x 512. Top half: a bin wall, two bays across, full height
     down; eleven corrugation bands, a column at each bay line, dust up the
     foot, rust from the bolts. Bottom half: the hut's sheet. */
  function steelCanvas() {
    var W = 512, cv = mkCv(W, W), g = cv.getContext("2d"), R = rng(1965), i, k;
    g.fillStyle = "#9a9d98"; g.fillRect(0, 0, W, 256);
    var bh = 256 / 11;
    for (i = 0; i < 11; i++) {
      var y0 = i * bh;
      g.fillStyle = "rgba(255,255,250,0.20)"; g.fillRect(0, y0 + 1, W, bh * 0.28);
      g.fillStyle = "rgba(20,22,20,0.22)"; g.fillRect(0, y0 + bh * 0.70, W, bh * 0.30);
      g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(0, y0 + bh - 1, W, 1);
    }
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,245,0.05)" : "rgba(30,30,24,0.06)";
      g.fillRect(R() * W, R() * 256, 30 + R() * 120, bh * (1 + Math.floor(R() * 3)));
    }
    [0, 256].forEach(function (x) {
      g.fillStyle = "#7c7f7a"; g.fillRect(x - 10, 0, 20, 256);
      g.fillStyle = "rgba(255,255,250,0.25)"; g.fillRect(x - 10, 0, 3, 256);
      g.fillStyle = "rgba(20,20,18,0.5)";
      for (k = 0; k < 22; k++) { g.fillRect(x - 15, k * 11.6 + 4, 3, 3); g.fillRect(x + 12, k * 11.6 + 4, 3, 3); }
    });
    g.fillStyle = "#7c7f7a"; g.fillRect(W - 10, 0, 10, 256);
    for (i = 0; i < 24; i++) {
      var rx = R() * W, ry = R() * 200, len = 10 + R() * 40;
      var gr = g.createLinearGradient(0, ry, 0, ry + len);
      gr.addColorStop(0, "rgba(112,66,34,0.22)"); gr.addColorStop(1, "rgba(112,66,34,0)");
      g.fillStyle = gr; g.fillRect(rx, ry, 1.5 + R() * 2.5, len);
    }
    var gf = g.createLinearGradient(0, 256, 0, 210);
    gf.addColorStop(0, "rgba(96,84,62,0.55)"); gf.addColorStop(1, "rgba(96,84,62,0)");
    g.fillStyle = gf; g.fillRect(0, 210, W, 46);
    g.fillStyle = "rgba(255,255,250,0.35)"; g.fillRect(0, 0, W, 2);
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
     the 1.68 m width; bottom half: the berm's earth. */
  function fillCanvas() {
    var W = 256, cv = mkCv(W, W), g = cv.getContext("2d"), R = rng(7707), i;
    g.fillStyle = "#b6af9b"; g.fillRect(0, 0, W, 128);
    for (i = 0; i < 2600; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(70,64,52,0.30)" : "rgba(235,230,215,0.30)";
      g.fillRect(R() * W, R() * 128, 1 + R() * 2, 1 + R() * 2);
    }
    for (i = 0; i < 12; i++) { g.fillStyle = "rgba(90,82,64,0.10)"; g.fillRect(R() * W, R() * 128, 20 + R() * 50, 10 + R() * 30); }
    g.fillStyle = "rgba(60,58,52,0.55)"; g.fillRect(0, 0, 3, 128); g.fillRect(127, 0, 3, 128);
    g.fillStyle = "rgba(60,58,52,0.35)"; g.fillRect(0, 0, W, 2); g.fillRect(0, 126, W, 2);
    g.fillStyle = "#88775a"; g.fillRect(0, 128, W, 128);
    for (i = 0; i < 1800; i++) {
      var t = R();
      g.fillStyle = t < 0.35 ? "rgba(96,110,60,0.45)" : t < 0.7 ? "rgba(60,50,34,0.35)" : "rgba(180,160,120,0.30)";
      g.fillRect(R() * W, 128 + R() * 128, 1 + R() * 3, 1 + R() * 3);
    }
    return cv;
  }

  /* LAMP: 64 x 8, the lenses' colours: white, green, red, yellow */
  var LAMPC = { white: 0, green: 1, red: 2, yellow: 3 };
  function lampCanvas() {
    var cv = mkCv(64, 8), g = cv.getContext("2d");
    ["#fff8e8", "#3ee07a", "#ff3a2a", "#ffc23a"].forEach(function (c, i) { g.fillStyle = c; g.fillRect(i * 16, 0, 16, 8); });
    return cv;
  }
  function lampUV(name) { return [(LAMPC[name] * 16 + 8) / 64, 0.5]; }

  /* made once per page and shared by every build (see airbase_revetments.js:
     a new CanvasTexture per build would be a new upload every time) */
  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      ground: finish(THREE, groundCanvas(), true),
      steel: finish(THREE, steelCanvas(), false),
      fill: finish(THREE, fillCanvas(), false),
      lamp: finish(THREE, lampCanvas(), true)
    };
    return _tex;
  }

  /* ============================================================ batching
     One Batch per material, emitted as one mesh, positions given in world
     metres and scaled by S. Faces are wound to agree with the outward
     normal given, so nothing is inside out. */
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
    this.p.push(a[0] * S, a[1] * S, a[2] * S, b[0] * S, b[1] * S, b[2] * S, c[0] * S, c[1] * S, c[2] * S);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    this.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
  };
  Batch.prototype.quad = function (a, b, c, d, ua, ub, uc, ud, N) {
    this.tri(a, b, c, ua, ub, uc, N); this.tri(a, c, d, ua, uc, ud, N);
  };
  Batch.prototype.triS = function (a, b, c, na, nb, nc, ua, ub, uc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-18) return;
    if (nx * (na[0] + nb[0] + nc[0]) + ny * (na[1] + nb[1] + nc[1]) + nz * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t; t = ub; ub = uc; uc = t;
    }
    this.p.push(a[0] * S, a[1] * S, a[2] * S, b[0] * S, b[1] * S, b[2] * S, c[0] * S, c[1] * S, c[2] * S);
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

  var FACES = { px: [1, 0, 0], nx: [-1, 0, 0], py: [0, 1, 0], ny: [0, -1, 0], pz: [0, 0, 1], nz: [0, 0, -1] };
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
      B.quad(P[0], P[1], P[2], P[3], U[0], U[1], U[2], U[3], FACES[f]);
    }
  }
  function flat(q) { return function () { return q; }; }
  function sbox(B, name, x0, x1, y0, y1, z0, z1, skip) {
    box(B, Math.min(x0, x1), Math.max(x0, x1), Math.min(y0, y1), Math.max(y0, y1),
        Math.min(z0, z1), Math.max(z0, z1), flat(swUV(name)), skip);
  }
  var NOUV = [0, 0];
  function nobox(B, x0, x1, y0, y1, z0, z1, skip) {
    box(B, Math.min(x0, x1), Math.max(x0, x1), Math.min(y0, y1), Math.max(y0, y1),
        Math.min(z0, z1), Math.max(z0, z1), flat(NOUV), skip);
  }
  /* a round bar from a to b, n sides, capped unless open; one flat UV */
  function rod(B, a, b, r, n, uv, r2, open) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz), ax = [dx / L, dy / L, dz / L];
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
        B.tri(a, A, Bq, uv, uv, uv, [-ax[0], -ax[1], -ax[2]]);
        B.tri(b, D, C, uv, uv, uv, ax);
      }
    }
  }

  /* ============================================================ the walls
     A straight run of bins along y, from y0 to y1, between x = c0 and c1,
     open at both ends. Long faces in corrugated steel, u along the wall so
     the painted columns fall on the built ones; the top is the fill; each
     end bin in bands of the owner's colour and white, top and end panel. */
  var BANDS = [0.5, 0.3, 0.5, 0.3, 0.5];
  function binWall(K, y0, y1, c0, c1, edge) {
    var St = K.steel, F = K.fill, i;
    var L = y1 - y0, NC = Math.max(2, Math.round(L / 2.4)), BAYC = L / NC;
    function P(a, c, z) { return [c, a, z]; }
    function suv(a, z) { return [(a - y0) / (2 * BAYC), 0.5 + 0.5 * (z - Z0) / WH]; }
    /* the long faces, corrugated: eleven bands over the height (Da Nang
       1966), each a ridge 35 mm proud, panel by panel between the columns */
    var NBD = 11, RID = 0.035;
    [[c0, -1], [c1, 1]].forEach(function (fc) {
      /* the face on the plot's edge stays in it: flat, its bands painted */
      if (fc[1] === edge) {
        St.quad(P(y0, fc[0], Z0), P(y1, fc[0], Z0), P(y1, fc[0], ZW), P(y0, fc[0], ZW),
                suv(y0, Z0), suv(y1, Z0), suv(y1, ZW), suv(y0, ZW), [fc[1], 0, 0]);
        return;
      }
      for (var pi = 0; pi < NC; pi++) {
        var pa = y0 + pi * BAYC, pb = pa + BAYC;
        for (var bi = 0; bi < NBD; bi++) {
          var za = Z0 + WH * bi / NBD, zb = za + WH / NBD, zm = (za + zb) / 2, cm = fc[0] + fc[1] * RID;
          St.quad(P(pa, fc[0], za), P(pb, fc[0], za), P(pb, cm, zm), P(pa, cm, zm),
                  suv(pa, za), suv(pb, za), suv(pb, zm), suv(pa, zm), [fc[1] * 0.75, 0, -0.66]);
          St.quad(P(pa, cm, zm), P(pb, cm, zm), P(pb, fc[0], zb), P(pa, fc[0], zb),
                  suv(pa, zm), suv(pb, zm), suv(pb, zb), suv(pa, zb), [fc[1] * 0.75, 0, 0.66]);
        }
      }
    });
    var wuv = swUV("white");
    function endFace(a, N) {
      var z = Z0, hs = WH / BANDS.length;
      for (var k = 0; k < BANDS.length; k++) {
        var M = (k % 2) ? K.ground : K.team, q = (k % 2) ? wuv : NOUV;
        M.quad(P(a, c0, z), P(a, c1, z), P(a, c1, z + hs), P(a, c0, z + hs), q, q, q, q, N);
        z += hs;
      }
    }
    endFace(y0, [0, -1, 0]);
    endFace(y1, [0, 1, 0]);
    var t0 = y0 + CAP, t1 = y1 - CAP;
    function fuv(a, c) { return [(a - y0) / (2 * BAYC), 0.5 + 0.5 * (c - c0) / WT]; }
    /* the fill: crowned a little along the middle, as earth tamped into a bin */
    var cm = (c0 + c1) / 2, crown = 0.03;
    F.quad(P(t0, c0, ZF), P(t1, c0, ZF), P(t1, cm, ZF + crown), P(t0, cm, ZF + crown),
           fuv(t0, c0), fuv(t1, c0), fuv(t1, cm), fuv(t0, cm), [0, 0, 1]);
    F.quad(P(t0, cm, ZF + crown), P(t1, cm, ZF + crown), P(t1, c1, ZF), P(t0, c1, ZF),
           fuv(t0, cm), fuv(t1, cm), fuv(t1, c1), fuv(t0, c1), [0, 0, 1]);
    /* the joint at every bin across the fill: a steel diaphragm edge */
    for (i = 1; i < NC; i++) {
      var aj = y0 + i * BAYC;
      if (aj < t0 + 0.2 || aj > t1 - 0.2) continue;
      var qj = suv(aj, ZW);
      St.quad(P(aj - 0.025, c0 + 0.02, ZF + 0.035), P(aj + 0.025, c0 + 0.02, ZF + 0.035),
              P(aj + 0.025, c1 - 0.02, ZF + 0.035), P(aj - 0.025, c1 - 0.02, ZF + 0.035), qj, qj, qj, qj, [0, 0, 1]);
    }
    function lip(pA, pB, N) {
      var q0 = suv(y0, ZF), q1 = suv(y0, ZW);
      St.quad([pA[0], pA[1], ZF], [pB[0], pB[1], ZF], [pB[0], pB[1], ZW], [pA[0], pA[1], ZW], q0, q0, q1, q1, N);
    }
    var e = 0.012;
    lip(P(y0, c0 + e, 0), P(y1, c0 + e, 0), [1, 0, 0]);
    lip(P(y0, c1 - e, 0), P(y1, c1 - e, 0), [-1, 0, 0]);
    lip(P(y0 + e, c0, 0), P(y0 + e, c1, 0), [0, 1, 0]);
    lip(P(y1 - e, c0, 0), P(y1 - e, c1, 0), [0, -1, 0]);
    function bands(aEnd, dir) {
      var a = aEnd, sc = CAP / 2.1;
      for (var k = 0; k < BANDS.length; k++) {
        var b = a + dir * BANDS[k] * sc;
        var M = (k % 2) ? K.ground : K.team, q = (k % 2) ? wuv : NOUV;
        M.quad(P(a, c0, ZF), P(b, c0, ZF), P(b, c1, ZF), P(a, c1, ZF), q, q, q, q, [0, 0, 1]);
        a = b;
      }
    }
    bands(y0, 1);
    bands(y1, -1);
    /* the columns: a steel H at every bay line, proud of both faces and a
       hand's breadth over the fill (Da Nang, Vung Tau) - but not on a face
       on the plot's edge, where they would stand out of it */
    for (i = 0; i <= NC; i++) {
      var a = y0 + i * BAYC;
      [[c0, -1], [c1, 1]].forEach(function (fc) {
        if (fc[1] === edge) return;
        var cA = fc[0] - fc[1] * 0.01, cB = fc[0] + fc[1] * 0.07;
        var aa = Math.max(y0, a - 0.10), ab = Math.min(y1, a + 0.10);
        box(St, Math.min(cA, cB), Math.max(cA, cB), aa, ab, Z0, ZW + 0.08, function (f, p) {
          return [0.005 + 0.02 * (p[1] - aa), 0.5 + 0.5 * Math.min(1, (p[2] - Z0) / WH)];
        }, ["nz"]);
        /* the flange edges: the H reads at the zoom-out limit */
        if (a - 0.16 >= y0)
          box(St, Math.min(cA, cB + fc[1] * 0.03), Math.max(cA, cB + fc[1] * 0.03), a - 0.16, a - 0.10, Z0, ZW + 0.08,
              function () { return [0.005, 0.75]; }, ["nz"]);
        if (a + 0.16 <= y1)
          box(St, Math.min(cA, cB + fc[1] * 0.03), Math.max(cA, cB + fc[1] * 0.03), a + 0.10, a + 0.16, Z0, ZW + 0.08,
              function () { return [0.005, 0.75]; }, ["nz"]);
      });
    }
  }

  /* ============================================================ the tower
     RAF Linton-on-Ouse's, kept small: a 3.5 m two-storey block, a glazed
     cab leaning out 8 degrees, a railed balcony; its door to the east,
     along the service band. */
  function octo(cx, cy, h, ch) {
    return [[cx + h - ch, cy - h], [cx + h, cy - h + ch], [cx + h, cy + h - ch], [cx + h - ch, cy + h],
            [cx - h + ch, cy + h], [cx - h, cy + h - ch], [cx - h, cy - h + ch], [cx - h + ch, cy - h]];
  }
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
      B.tri([pts[0][0], pts[0][1], z], [pts[i][0], pts[i][1], z], [pts[i + 1][0], pts[i + 1][1], z], uv, uv, uv, [0, 0, up ? 1 : -1]);
  }
  function railing(K, pts, z, h) {
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i], q = pts[(i + 1) % pts.length];
      rod(K.dark, [p[0], p[1], z], [p[0], p[1], z + h], 0.03, 4, NOUV, undefined, true);
      rod(K.dark, [p[0], p[1], z + h], [q[0], q[1], z + h], 0.03, 4, NOUV, undefined, true);
      rod(K.dark, [p[0], p[1], z + h * 0.5], [q[0], q[1], z + h * 0.5], 0.022, 4, NOUV, undefined, true);
    }
  }
  function buildTower(K) {
    /* 3.5 m square: the whole of it, balcony and cab included, inside the
       4.4 m of the service band no aircraft reaches */
    var h = 1.75, z1 = Z0 + 6.4;
    sbox(K.ground, "render", TX - h, TX + h, TY - h, TY + h, Z0, z1, ["nz", "pz"]);
    var rUV = swUV("render"), dUV = swUV("roof");
    box(K.ground, TX - h - 0.3, TX + h + 0.3, TY - h - 0.3, TY + h + 0.3, z1, z1 + 0.25,
        function (f) { return f === "pz" || f === "nz" ? dUV : rUV; });
    var zu0 = Z0 + 3.9, zu1 = Z0 + 5.3, zl0 = Z0 + 1.1, zl1 = Z0 + 2.2, e = 0.10, w = 1.25;
    /* a band of glass on every face upstairs; below, a window on three faces
       and the door on the east, onto the service band */
    nobox(K.glass, TX - w, TX + w, TY - h - e, TY - h, zu0, zu1, ["py"]);
    nobox(K.glass, TX - w, TX + w, TY + h, TY + h + e, zu0, zu1, ["ny"]);
    nobox(K.glass, TX + h, TX + h + e, TY - w, TY + w, zu0, zu1, ["nx"]);
    nobox(K.glass, TX - h - e, TX - h, TY - w, TY + w, zu0, zu1, ["px"]);
    nobox(K.glass, TX - 0.85, TX + 0.85, TY - h - e, TY - h, zl0, zl1, ["py"]);
    nobox(K.glass, TX - 0.85, TX + 0.85, TY + h, TY + h + e, zl0, zl1, ["ny"]);
    nobox(K.glass, TX - h - e, TX - h, TY - 0.85, TY + 0.85, zl0, zl1, ["px"]);
    sbox(K.ground, "door", TX + h, TX + h + e, TY - 0.5, TY + 0.5, Z0, Z0 + 2.1, ["nx", "nz"]);
    sbox(K.ground, "roof", TX + h, TX + h + 0.8, TY - 0.7, TY + 0.7, Z0 + 2.35, Z0 + 2.5);
    /* a split air-conditioning unit on the north wall, as at Linton */
    sbox(K.ground, "alu", TX + 0.6, TX + 1.2, TY + h, TY + h + 0.3, Z0 + 0.1, Z0 + 0.7, ["ny", "nz"]);
    /* the cab: a sill in render, the glass leaning out 8 degrees all round,
       mullions at the corners and two on each long face, a roof with a
       fascia in the owner's colour */
    var zs = z1 + 0.25, zg0 = zs + 0.75, zg1 = zg0 + 2.3, zr = zg1 + 0.42;
    var o0 = octo(TX, TY, 1.62, 0.46), o1 = octo(TX, TY, 1.9, 0.53);
    band(K.ground, o0, zs, o0, zg0, swUV("render"), TX, TY);
    band(K.glass, o0, zg0, o1, zg1, NOUV, TX, TY);
    for (var i = 0; i < o0.length; i++) {
      rod(K.dark, [o0[i][0], o0[i][1], zg0], [o1[i][0], o1[i][1], zg1], 0.07, 4, NOUV, undefined, true);
      if (i % 2 === 1) {
        var j2 = (i + 1) % o0.length;
        [1 / 3, 2 / 3].forEach(function (f) {
          rod(K.dark, [o0[i][0] + (o0[j2][0] - o0[i][0]) * f, o0[i][1] + (o0[j2][1] - o0[i][1]) * f, zg0],
                      [o1[i][0] + (o1[j2][0] - o1[i][0]) * f, o1[i][1] + (o1[j2][1] - o1[i][1]) * f, zg1], 0.05, 4, NOUV, undefined, true);
        });
      }
    }
    band(K.dark, octo(TX, TY, 1.45, 0.42), zg0 - 0.05, octo(TX, TY, 1.45, 0.42), zg0 + 0.35, NOUV, TX, TY);
    var o2 = octo(TX, TY, 2.15, 0.6);
    band(K.team, o2, zg1, o2, zr, NOUV, TX, TY);
    cap(K.ground, o2, zg1, false, dUV);
    cap(K.ground, o2, zr, true, dUV);
    var bh = h + 0.25;
    railing(K, [[TX - bh, TY - bh], [TX + bh, TY - bh], [TX + bh, TY + bh], [TX - bh, TY + bh]], zs, 1.0);
    railing(K, octo(TX, TY, 2.02, 0.57), zr, 0.9);
    /* the roof: two whips, the anemometer mast, the red obstruction light */
    rod(K.dark, [TX - 1.2, TY + 1.2, zr], [TX - 1.2, TY + 1.2, zr + 2.6], 0.03, 4, NOUV, 0.015);
    rod(K.dark, [TX + 1.2, TY - 1.2, zr], [TX + 1.2, TY - 1.2, zr + 2.2], 0.03, 4, NOUV, 0.015);
    rod(K.dark, [TX + 1.1, TY + 1.1, zr], [TX + 1.1, TY + 1.1, zr + 1.9], 0.05, 5, NOUV);
    rod(K.dark, [TX + 0.8, TY + 1.1, zr + 1.9], [TX + 1.4, TY + 1.1, zr + 1.9], 0.025, 4, NOUV);
    rod(K.lamp, [TX + 1.1, TY + 1.1, zr + 1.9], [TX + 1.1, TY + 1.1, zr + 2.15], 0.09, 6, lampUV("red"));
    /* the outside stair to the balcony, up the west face (Linton's is a
       spiral; a straight flight here) */
    var sx0 = TX - h - 0.95, sx1 = TX - h - 0.05;
    for (var st = 0; st < 14; st++) {
      var zt = Z0 + 0.46 * (st + 1), yy = TY - h + 0.1 + 0.24 * st;
      sbox(K.ground, "frame", sx0, sx1, yy, yy + 0.28, zt - 0.06, zt);
    }
    rod(K.dark, [sx0, TY - h + 0.1, Z0 + 1.0], [sx0, TY - h + 3.5, z1 + 1.0], 0.03, 4, NOUV);
  }

  /* ========================================================= the Quonset
     The T-rib hut, 16 x 36 ft on its 8 ft radius, its axis east-west in the
     service band on the x -60 line; the door in its east end. */
  function buildQuonset(K) {
    var n = 18, i, x0 = QX0, x1 = QX1;
    for (i = 0; i < n; i++) {
      var a0 = i / n * PI, a1 = (i + 1) / n * PI;
      var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      var A = [x0, QY + QR * c0, Z0 + QR * s0], Bq = [x0, QY + QR * c1, Z0 + QR * s1];
      var C = [x1, QY + QR * c1, Z0 + QR * s1], D = [x1, QY + QR * c0, Z0 + QR * s0];
      var nA = [0, c0, s0], nB = [0, c1, s1];
      var u0 = i / n, u1 = (i + 1) / n, v0 = 0.01, v1 = 0.49;
      K.steel.triS(A, Bq, C, nA, nB, nB, [u0, v0], [u1, v0], [u1, v1]);
      K.steel.triS(A, C, D, nA, nB, nA, [u0, v0], [u1, v1], [u0, v1]);
    }
    /* the T-ribs: a raised batten over the arch every 4 ft */
    for (var xr = x0 + 1.22; xr < x1 - 0.5; xr += 1.22) {
      for (i = 0; i < n; i++) {
        var b0 = i / n * PI, b1 = (i + 1) / n * PI, r = QR + 0.03;
        var p0 = [xr, QY + r * Math.cos(b0), Z0 + r * Math.sin(b0)], p1 = [xr, QY + r * Math.cos(b1), Z0 + r * Math.sin(b1)];
        var nn = [0, Math.cos((b0 + b1) / 2), Math.sin((b0 + b1) / 2)];
        K.steel.quad([p0[0] - 0.04, p0[1], p0[2]], [p0[0] + 0.04, p0[1], p0[2]], [p1[0] + 0.04, p1[1], p1[2]], [p1[0] - 0.04, p1[1], p1[2]],
                     [0.02, 0.3], [0.03, 0.3], [0.03, 0.3], [0.02, 0.3], nn);
      }
    }
    var ew = swUV("endwall");
    [[x0, -1], [x1, 1]].forEach(function (e) {
      for (var k = 0; k < n; k++) {
        var b0 = k / n * PI, b1 = (k + 1) / n * PI, r = QR - 0.02;
        K.ground.tri([e[0], QY, Z0], [e[0], QY + r * Math.cos(b0), Z0 + r * Math.sin(b0)],
                     [e[0], QY + r * Math.cos(b1), Z0 + r * Math.sin(b1)], ew, ew, ew, [e[1], 0, 0]);
      }
    });
    sbox(K.ground, "door", x1 - 0.02, x1 + 0.08, QY - 0.8, QY + 0.8, Z0, Z0 + 2.1, ["nx", "nz"]);
    sbox(K.ground, "frame", x1 - 0.02, x1 + 0.12, QY - 0.95, QY + 0.95, Z0 + 2.1, Z0 + 2.22, ["nx"]);
    [-1.45, 1.45].forEach(function (dy) {
      var y = QY + dy;
      nobox(K.glass, x1 - 0.02, x1 + 0.08, y - 0.28, y + 0.28, Z0 + 1.0, Z0 + 1.6, ["nx"]);
      nobox(K.glass, x0 - 0.08, x0 + 0.02, y - 0.3, y + 0.3, Z0 + 1.0, Z0 + 1.7, ["px"]);
    });
    rod(K.dark, [x1 - 2.6, QY + 0.7, Z0 + QR - 0.2], [x1 - 2.6, QY + 0.7, Z0 + QR + 0.9], 0.1, 6, NOUV);
    rod(K.dark, [x1 - 2.6, QY + 0.7, Z0 + QR + 0.9], [x1 - 2.6, QY + 0.7, Z0 + QR + 1.0], 0.18, 6, NOUV);
  }

  /* ======================================================== the fuel point
     A 3,000 US gal collapsible tank (4.6 x 4.1 m, 0.65 m high filled) in a
     0.6 m earth berm, its long side east-west; the pump and filter skid on
     the east side, the hose over the bank. */
  function buildFuel(K) {
    var lx = [3.9, 3.35, 3.0, 2.55], ly = [3.65, 3.1, 2.75, 2.3], lz = [Z0, Z0 + BH, Z0 + BH, Z0];
    function ring(k) { return [[FX - lx[k], FY - ly[k], lz[k]], [FX + lx[k], FY - ly[k], lz[k]], [FX + lx[k], FY + ly[k], lz[k]], [FX - lx[k], FY + ly[k], lz[k]]]; }
    function euv(p) { return [(p[0] - FX) / 6, 0.25 + (p[1] - FY) / 26]; }
    for (var k = 0; k < 3; k++) {
      var A = ring(k), Bq = ring(k + 1);
      for (var i = 0; i < 4; i++) {
        var j = (i + 1) % 4;
        var mx = (A[i][0] + A[j][0]) / 2 - FX, my = (A[i][1] + A[j][1]) / 2 - FY;
        var out = k === 0 ? 1 : k === 2 ? -1 : 0;
        K.fill.quad(A[i], A[j], Bq[j], Bq[i], euv(A[i]), euv(A[j]), euv(Bq[j]), euv(Bq[i]), [mx * out * 0.2, my * out * 0.2, 1]);
      }
    }
    var a = 2.3, b = 2.05, c = 0.325, zc = Z0 + c + 0.01, NU = 20, NV = 8, u, v, V = [];
    function sg(t, e) { var s = t < 0 ? -1 : 1; return s * Math.pow(Math.abs(t), e); }
    for (v = 0; v <= NV; v++) {
      var row = [], th = -PI / 2 + PI * v / NV;
      for (u = 0; u < NU; u++) {
        var ph = u / NU * 2 * PI;
        row.push([FX + sg(Math.cos(th), 0.45) * sg(Math.cos(ph), 0.3) * a,
                  FY + sg(Math.cos(th), 0.45) * sg(Math.sin(ph), 0.3) * b,
                  zc + sg(Math.sin(th), 0.45) * c]);
      }
      V.push(row);
    }
    function nrm(vv, uu) {
      var p = V[vv][uu], pu = V[vv][(uu + 1) % NU], pm = V[vv][(uu + NU - 1) % NU];
      var pv = V[Math.min(NV, vv + 1)][uu], pn = V[Math.max(0, vv - 1)][uu];
      var tu = [pu[0] - pm[0], pu[1] - pm[1], pu[2] - pm[2]], tv = [pv[0] - pn[0], pv[1] - pn[1], pv[2] - pn[2]];
      var n = [tu[1] * tv[2] - tu[2] * tv[1], tu[2] * tv[0] - tu[0] * tv[2], tu[0] * tv[1] - tu[1] * tv[0]];
      var l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
      if (l < 1e-9) return [0, 0, vv > NV / 2 ? 1 : -1];
      n = [n[0] / l, n[1] / l, n[2] / l];
      var o = [p[0] - FX, p[1] - FY, p[2] - zc];
      if (n[0] * o[0] + n[1] * o[1] + n[2] * o[2] < 0) n = [-n[0], -n[1], -n[2]];
      return n;
    }
    for (v = 1; v < NV - 1; v++) for (u = 0; u < NU; u++) {
      var u1 = (u + 1) % NU, p00 = V[v][u], p10 = V[v][u1], p01 = V[v + 1][u], p11 = V[v + 1][u1];
      K.dark.triS(p00, p10, p11, nrm(v, u), nrm(v, u1), nrm(v + 1, u1), NOUV, NOUV, NOUV);
      K.dark.triS(p00, p11, p01, nrm(v, u), nrm(v + 1, u1), nrm(v + 1, u), NOUV, NOUV, NOUV);
    }
    var top = V[NV - 1], bot = V[1];
    for (u = 1; u < NU - 1; u++) {
      K.dark.tri(top[0], top[u], top[u + 1], NOUV, NOUV, NOUV, [0, 0, 1]);
      K.dark.tri(bot[0], bot[u], bot[u + 1], NOUV, NOUV, NOUV, [0, 0, -1]);
    }
    rod(K.dark, [FX - 0.9, FY + 0.6, zc + c - 0.02], [FX - 0.9, FY + 0.6, zc + c + 0.12], 0.14, 8, NOUV);
    var hose = [[FX + a - 0.05, FY, Z0 + 0.3], [FX + 2.75, FY, Z0 + 0.55], [FX + 3.2, FY, Z0 + BH + 0.08],
                [FX + 3.6, FY, Z0 + 0.45], [FX + 3.95, FY, Z0 + 0.1], [FX + 4.3, FY, Z0 + 0.4]];
    for (var h = 0; h < hose.length - 1; h++) rod(K.dark, hose[h], hose[h + 1], 0.07, 6, NOUV, undefined, true);
    var px = FX + 4.3;
    sbox(K.ground, "olive", px, px + 1.1, FY - 0.8, FY + 0.8, Z0, Z0 + 0.25, ["nz"]);
    sbox(K.ground, "olive", px + 0.1, px + 1.0, FY - 0.7, FY + 0.2, Z0 + 0.25, Z0 + 0.95, ["nz"]);
    rod(K.ground, [px + 0.15, FY + 0.45, Z0 + 0.25], [px + 0.15, FY + 0.45, Z0 + 1.15], 0.22, 8, swUV("olive"));
    rod(K.ground, [px + 0.75, FY + 0.45, Z0 + 0.25], [px + 0.75, FY + 0.45, Z0 + 1.15], 0.22, 8, swUV("olive"));
    extinguisher(K, FX + 5.0, FY + 2.6, PI / 2);
  }

  /* a ground power cart, olive drab, 2.3 x 1.2 m, on four small wheels */
  function powerCart(K, x, y) {
    sbox(K.ground, "olive", x - 1.15, x + 1.15, y - 0.6, y + 0.6, Z0 + 0.32, Z0 + 1.25);
    sbox(K.ground, "frame", x - 1.0, x - 0.2, y - 0.62, y + 0.62, Z0 + 1.25, Z0 + 1.32, ["nz"]);
    [-0.8, 0.8].forEach(function (dx) {
      rod(K.dark, [x + dx, y - 0.66, Z0 + 0.2], [x + dx, y - 0.5, Z0 + 0.2], 0.2, 8, NOUV);
      rod(K.dark, [x + dx, y + 0.5, Z0 + 0.2], [x + dx, y + 0.66, Z0 + 0.2], 0.2, 8, NOUV);
    });
    rod(K.dark, [x + 1.15, y, Z0 + 0.5], [x + 1.5, y, Z0 + 1.3], 0.04, 4, NOUV);
    nobox(K.dark, x + 0.2, x + 0.9, y - 0.62, y + 0.62, Z0 + 0.55, Z0 + 1.05);
  }
  /* a 150 lb wheeled extinguisher: red bottle, two wheels, a handle */
  function extinguisher(K, x, y, hdg) {
    var c = Math.cos(hdg), s = Math.sin(hdg);
    function P(dx, dy, z) { return [x + dx * c - dy * s, y + dx * s + dy * c, z]; }
    rod(K.ground, P(0, 0, Z0 + 0.12), P(0, 0, Z0 + 1.15), 0.18, 8, swUV("red"));
    rod(K.dark, P(0, -0.3, Z0 + 0.22), P(0, 0.3, Z0 + 0.22), 0.22, 8, NOUV);
    rod(K.dark, P(-0.1, 0, Z0 + 1.15), P(-0.1, 0, Z0 + 1.28), 0.06, 5, NOUV);
    rod(K.dark, P(-0.22, -0.2, Z0 + 0.3), P(-0.4, -0.2, Z0 + 1.1), 0.02, 4, NOUV);
    rod(K.dark, P(-0.22, 0.2, Z0 + 0.3), P(-0.4, 0.2, Z0 + 1.1), 0.02, 4, NOUV);
    rod(K.dark, P(-0.4, -0.2, Z0 + 1.1), P(-0.4, 0.2, Z0 + 1.1), 0.02, 4, NOUV);
  }

  /* ========================================================== the windsock
     A 6 m mast in the north-east corner, the sock streaming west along the
     service band and 20 degrees down; open at both ends, inside and out. */
  function buildWindsock(K) {
    var zt = Z0 + 6.0;
    sbox(K.ground, "conc", WSX - 0.4, WSX + 0.4, WSY - 0.4, WSY + 0.4, Z0, Z0 + 0.18, ["nz"]);
    rod(K.ground, [WSX, WSY, Z0 + 0.18], [WSX, WSY, zt], 0.11, 8, swUV("white"), 0.07);
    /* the mast's stays */
    [[1.6, 0], [-0.8, 1.2], [-0.8, -1.2]].forEach(function (o) {
      rod(K.dark, [WSX + o[0], WSY + Math.max(-1.6, Math.min(1.6, o[1])), Z0 + 0.05], [WSX, WSY, Z0 + 4.2], 0.012, 3, NOUV, undefined, true);
    });
    rod(K.dark, [WSX, WSY, zt], [WSX, WSY, zt + 0.35], 0.06, 6, NOUV);
    rod(K.lamp, [WSX, WSY, zt + 0.35], [WSX, WSY, zt + 0.55], 0.1, 6, lampUV("red"));
    var dip = 20 * PI / 180, d = [-Math.cos(dip), 0, -Math.sin(dip)];
    var up = [-Math.sin(dip), 0, Math.cos(dip)], side = [0, 1, 0];
    var o = [WSX - 0.25, WSY, zt + 0.12];
    rod(K.dark, [WSX, WSY, zt + 0.12], o, 0.03, 4, NOUV);
    var LEN = 3.6, R0 = 0.45, R1 = 0.2, NS = 14, NB = 5, i, k;
    function Nn(a) { var cc = Math.cos(a), ss = Math.sin(a); return [side[0] * cc + up[0] * ss, side[1] * cc + up[1] * ss, side[2] * cc + up[2] * ss]; }
    function Q(a, t, r) { var n = Nn(a); return [o[0] + d[0] * LEN * t + n[0] * r, o[1] + d[1] * LEN * t + n[1] * r, o[2] + d[2] * LEN * t + n[2] * r]; }
    for (k = 0; k < NB; k++) {
      var t0 = k / NB, t1 = (k + 1) / NB, r0 = R0 + (R1 - R0) * t0, r1 = R0 + (R1 - R0) * t1, uvb = sockUV(k);
      for (i = 0; i < NS; i++) {
        var a0 = i / NS * 2 * PI, a1 = (i + 1) / NS * 2 * PI;
        var A = Q(a0, t0, r0), B1 = Q(a1, t0, r0), C = Q(a1, t1, r1), D = Q(a0, t1, r1);
        var n0 = Nn(a0), n1 = Nn(a1), m0 = [-n0[0], -n0[1], -n0[2]], m1 = [-n1[0], -n1[1], -n1[2]];
        K.ground.triS(A, B1, C, n0, n1, n1, uvb, uvb, uvb);
        K.ground.triS(A, C, D, n0, n1, n0, uvb, uvb, uvb);
        var Ai = Q(a0, t0, r0 - 0.015), Bi = Q(a1, t0, r0 - 0.015), Ci = Q(a1, t1, r1 - 0.015), Di = Q(a0, t1, r1 - 0.015);
        K.ground.triS(Ai, Ci, Bi, m0, m1, m1, uvb, uvb, uvb);
        K.ground.triS(Ai, Di, Ci, m0, m0, m1, uvb, uvb, uvb);
      }
    }
    for (i = 0; i < NS; i++) rod(K.dark, Q(i / NS * 2 * PI, 0, R0), Q((i + 1) / NS * 2 * PI, 0, R0), 0.03, 4, NOUV, undefined, true);
  }

  /* ============================================================ the lights */
  /* an elevated edge light: a base can, a frangible stem, a clear dome */
  function edgeLight(K, x, y) {
    rod(K.dark, [x, y, Z0], [x, y, Z0 + 0.08], 0.13, 8, NOUV);
    rod(K.dark, [x, y, Z0 + 0.08], [x, y, Z0 + 0.26], 0.035, 6, NOUV, undefined, true);
    rod(K.lamp, [x, y, Z0 + 0.26], [x, y, Z0 + 0.35], 0.085, 8, lampUV("white"), 0.05);
  }
  /* an inset (flush) light, where a lead-in crosses the edge */
  function insetLight(K, x, y) {
    rod(K.dark, [x, y, Z0 - 0.01], [x, y, Z0 + 0.025], 0.2, 10, NOUV);
    nobox(K.lamp, x - 0.05, x + 0.05, y - 0.07, y + 0.07, Z0 + 0.02, Z0 + 0.045, ["nz"]);
  }
  /* a combined threshold / runway-end fitting across an end: green toward
     the approach (outward, e), red toward the runway */
  function endLight(K, x, y, e) {
    rod(K.dark, [x, y, Z0], [x, y, Z0 + 0.08], 0.14, 8, NOUV);
    rod(K.dark, [x, y, Z0 + 0.08], [x, y, Z0 + 0.22], 0.035, 6, NOUV, undefined, true);
    nobox(K.dark, x - 0.11, x + 0.11, y - 0.14, y + 0.14, Z0 + 0.22, Z0 + 0.42);
    var g = lampUV("green"), r = lampUV("red");
    box(K.lamp, Math.min(x + e * 0.11, x + e * 0.13), Math.max(x + e * 0.11, x + e * 0.13), y - 0.1, y + 0.1, Z0 + 0.26, Z0 + 0.38,
        flat(g), [e > 0 ? "nx" : "px"]);
    box(K.lamp, Math.min(x - e * 0.11, x - e * 0.13), Math.max(x - e * 0.11, x - e * 0.13), y - 0.1, y + 0.1, Z0 + 0.26, Z0 + 0.38,
        flat(r), [e > 0 ? "px" : "nx"]);
  }
  function buildLights(K) {
    for (var x = -110; x <= 110; x += 20) {
      var lead = PADS.some(function (p) { return Math.abs(p - x) < 1; });
      if (lead) insetLight(K, x, RWN - 0.6); else edgeLight(K, x, RWN - 0.6);
      edgeLight(K, x, RWS + 0.6);
    }
    [-1, 1].forEach(function (e) {
      for (var y = RWS + 2; y <= RWN - 2 + 1e-6; y += 3) endLight(K, e * (HX - 0.5), y, e);
    });
  }

  /* =============================================================== build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "airbase";
    var X = textures(THREE);
    var T = {
      ground: new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.ground, roughness: 0.93, metalness: 0.02 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.steel, roughness: 0.62, metalness: 0.18 }),
      fill: new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.fill, roughness: 0.97, metalness: 0.0 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x2b2d2b, roughness: 0.62, metalness: 0.25 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x1b2a31, roughness: 0.14, metalness: 0.35,
                                              emissive: 0x0b171d, emissiveIntensity: 0.6 }),
      /* exactly the owner's colour */
      team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x4b8fe0,
                                             roughness: 0.6, metalness: 0.1 }),
      lamp: new THREE.MeshStandardMaterial({ color: 0xffffff, map: X.lamp, emissive: 0xffffff, emissiveMap: X.lamp,
                                             emissiveIntensity: 1.1, roughness: 0.3, metalness: 0.0 })
    };
    var K = {};
    Object.keys(T).forEach(function (k) { K[k] = new Batch(); });

    /* the slab: the whole plot, one quad, every marking in its texture */
    var s0 = planUV(-HX, -HY), s1 = planUV(HX, HY);
    K.ground.quad([-HX, -HY, Z0], [HX, -HY, Z0], [HX, HY, Z0], [-HX, HY, Z0],
                  [s0[0], s0[1]], [s1[0], s0[1]], [s1[0], s1[1]], [s0[0], s1[1]], [0, 0, 1]);
    sbox(K.ground, "edge", -HX, HX, -HY, HY, 0, Z0 - 0.001, ["pz", "nz"]);

    /* the revetments: five walls on the bay lines and the plot's edges */
    WALLS.forEach(function (w) { binWall(K, WY0, w[2], w[0], w[1], w[3]); });
    /* an extinguisher in the mouth of every bay, against its west wall */
    PADS.forEach(function (px) { extinguisher(K, px - 27.4, WY0 + 1.2, 0); });
    /* two power carts in the north-west corner of the service band */
    powerCart(K, -116.4, 37.0);
    powerCart(K, -112.6, 37.0);

    buildTower(K);
    buildQuonset(K);
    buildFuel(K);
    buildWindsock(K);
    buildLights(K);

    Object.keys(T).forEach(function (k) {
      var m = K[k].mesh(THREE, T[k], "airbase_" + k);
      if (m) root.add(m);
    });
    return root;
  }

  return { build: build };
})();
BLD_MODELS["airbase"] = { build: HeroAirbaseRunway.build };
/* The base turned a quarter clockwise (rules.js BUILDING_LEGACY airbase_r, R
   when placing): the same field turned about its middle, the runway along
   the west side and the revetments facing it from the east. */
BLD_MODELS["airbase_r"] = { build: function (THREE, M, C) {
  var g = new THREE.Group(), m = HeroAirbaseRunway.build(THREE, M, C);
  m.rotation.z = -Math.PI / 2;
  g.add(m); g.name = "airbase";
  return g;
} };
