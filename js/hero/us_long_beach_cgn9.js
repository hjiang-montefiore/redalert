/* ============================================================================
   us_long_beach_cgn9.js -- HERO model: USS Long Beach (CGN-9), the first
   nuclear-powered surface warship, as the photographs of 1962-1968 show her.
   Row nato_e60_cruiser. Replaces the parametric warship3d.js stand-in.

   She is drawn in her 1960s fit: two Mk 10 Terrier twin launchers forward,
   the Mk 12 Talos twin launcher aft with its two SPG-49 trackers, the Mk 16
   ASROC amidships, the SCANFAR box with both its arrays (the AN/SPS-33 were
   added "in mid-1962", Commons caption of the c1961 radar photograph) and
   the two single 5-inch/38 Mk 30 mounts amidships, which were not in the
   design and came in 1962-63 (Navypedia, "1963: + 2 x 1 - 127/38 Mk 30").
   The row's period is the 1960s and its first weapon is the 127 mm gun, so
   the guns are drawn. The SPS-12 of 1968 is not.

   References:
     - Navypedia "Long Beach 1963" scale profile and plan (us_cr_109.gif),
       read at 0.3124 m a pixel (704 px stern to stem = 219.9 m; the 71.5 px
       beam = 22.3 m agrees). The station table, the deck line, the house
       outlines and every height below are measured off it.
     - "USS Long Beach (CGN-9) radar arrangement c1961" (from ahead, above):
       the box's forward face with only its SPS-32 (port end), the four
       SPG-55 places, the mast and yard, the forecastle bulwark, breakwater
       and anchors.
     - "... underway in April 1963" (starboard bow, from above): the whole
       ship, the box with both arrays, boats under the box, the aft tower.
     - "... at anchor, circa in 1962" (colour, port bow): the forward face's
       SPS-33 at the starboard end and SPS-32 at the port end, the haze grey.
     - "Bow view of USS Long Beach (CGN-9) c1965": the box's forward face,
       the two window rows, the mast's yards and cans, the SPG-55 faces.
     - "USS Long Beach (CGN-9) docked at Long Beach ... 2 January 1968"
       (starboard): the starboard face, SPS-32 forward and SPS-33 aft.
     - "CGN-9 PIRAZ MarApr1967" (colour, port quarter): the square transom,
       the fantail, the Talos launcher, the SPG-49 pair, the aft tower.
     - "Overhead view of USS Long Beach (CGN-9), circa 1990": the plan, the
       helicopter square on the fantail, and where the 5-inch mounts stand
       (abreast each other on the 01 deck abaft the ASROC; they were never
       moved) -- the 1960s views do not show that area clearly.

   RECOGNITION LIST (each must read at game zoom):
     1. Long, low, flush hull, W/L 0.10, freeboard 6.6 m amidships rising
        to a bulwarked forecastle, raked stem, square raked transom
        (drawing; 1962 and 1967 photographs).
     2. The SCANFAR "box" bridge: a tall square block 20 x 19.6 m from
        17 to 30.4 m over the water, overhanging the house under it
        (drawing; every photograph).
     3. On every face of the box one wide AN/SPS-32 and one tall AN/SPS-33
        array, pinwheel-fashion as on the 1960s Enterprise: forward face
        SPS-33 to starboard, starboard face SPS-33 aft (1962, 1965, 1968).
     4. The pilot-house window band round the box top, a second window row
        under the arrays (1965 bow view).
     5. The tall pole mast on the box with its wide yard, platform, upper
        yard and TACAN, and two SPG-55s stacked in front of it (c1961,
        1965).
     6. Two Mk 10 Terrier twin launchers forward, one on the main deck,
        one superfiring on the 01 house, missiles on the arms (1961, 1963).
     7. Two more SPG-55s stepped up in front of the box (all bow views).
     8. The long 01 deckhouse from the aft tower to the forward launcher.
     9. The aft superstructure: two big SPG-49 Talos trackers stepped one
        above the other, the plated aft tower and its pole mast (1963,
        1967).
    10. The Mk 12 Talos twin launcher on the quarterdeck and the helicopter
        square on the fantail (drawing; 1967; 1989 plan).
    11. The Mk 16 ASROC eight-cell launcher amidships, and the two 5-inch/38
        Mk 30 single mounts abreast each other abaft it.
    12. Whaleboats under the box's overhang and abreast the aft tower.
    13. 1960s haze grey all over; dark deck; nothing white but missiles.

   Published figures: 219.9 m (721 ft 3 in) overall, 22.3 m beam, 7.3 m
   draught, 16,602 t full load (Navypedia). Measured on the model: 219.83 m
   X extent, 22.3 m beam at the deck edge, 21.65 m on the waterline, about
   18,000 t displaced at 7.3 m, masthead 62.2 m (drawing 62.4 m).

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -7.3,
   the SQS-23 bow dome to -8.4. render3d.js stands the model up and scales
   it by its X extent: the stem head of the forecastle bulwark is the
   foremost point and the deck edge at the transom the aftmost; every
   barrel and rail is inside them.

   Paint: US haze grey. The 1967 colour photograph under overcast gives
   hull (82,84,88) and house (97,98,99) against a (239,238,242) sky, hull
   0.85 of the house; the 1962 slide has a green cast and is not used for
   level. House plate is set at 0x737a81, the level the accepted US heroes
   sit at after the 0.9 rule, the hull at 0.9 of it; the SCANFAR faces at
   0x8e9296 as on the Enterprise hero. No hull numbers, names or flags.

   Materials (10): hull, weather deck, deckhouse plate, helicopter square,
   array faces, white (missiles, boat covers), dark, bare metal, glass and
   the team material, exactly C.team (a stripe on the forecastle and the
   landing circle). Every static part is merged into one mesh per material.
   ONE mount trains, the port 5-inch/38: the row's first weapon is the
   127 mm gun, and the renderer's recoil is a gun's. Its group sits on its
   ring centre, rotation zero, barrel along +X. The other 5-inch, the three
   launchers and all directors are baked. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLongBeachCGN9 = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 219.9, XB = LOA * 0.5;
  var XSTEM = 109.55;           /* the hull's stem at the deck edge; the
                                   bulwark's head stands to 109.95          */
  var DR = 7.3;                 /* draught, the dome hangs below it          */
  var ZTOP = 11.0, ZBOT = -1.5; /* vertical span the hull texture covers     */
  var Z01 = 10.3;               /* the 01 deckhouse roof (drawing)           */

  /* ----------------------------------------------------------- hull curves */
  function tbl(k, t) {
    var i;
    if (t <= k[0][0]) return k[0][1];
    for (i = 1; i < k.length; i++) {
      if (t <= k[i][0]) {
        var u = (t - k[i - 1][0]) / (k[i][0] - k[i - 1][0]);
        return k[i - 1][1] + (k[i][1] - k[i - 1][1]) * u;
      }
    }
    return k[k.length - 1][1];
  }
  function tOf(x) { return (x + XB) / LOA; }

  /* STATION TABLE, off the 1963 plan and profile (x metres from amidships,
     + forward). Deck at side: the flush deck sits 6.6 m over the water
     amidships, a little higher at the transom, and sheers up under the
     forecastle bulwark to 9.2 m at the stem.                              */
  var DK = [[-109.95, 6.95], [-95.0, 6.85], [-70.0, 6.70], [-40.0, 6.60],
            [0.0, 6.60], [40.0, 6.65], [62.0, 6.85], [78.0, 7.20],
            [90.0, 7.80], [100.0, 8.50], [109.95, 9.20]];
  function deckZ(x) { return tbl(DK, x); }

  /* half breadth at the deck edge, read column by column off the plan */
  var HWX = [[-109.95, 7.20], [-107.5, 7.95], [-102.5, 8.35], [-96.3, 8.65],
             [-88.8, 9.10], [-81.3, 9.55], [-73.8, 9.95], [-66.3, 10.30],
             [-58.8, 10.60], [-51.3, 10.80], [-43.8, 11.00], [-30.0, 11.15],
             [-12.0, 11.15], [0.0, 11.00], [10.0, 10.70], [20.0, 10.30],
             [28.5, 9.95], [38.5, 9.50], [48.5, 8.95], [58.5, 8.15],
             [68.5, 7.35], [78.5, 6.45], [88.5, 5.40], [96.0, 4.50],
             [100.5, 3.95], [103.0, 3.40], [105.4, 2.65], [107.9, 1.45],
             [109.55, 0.05]];
  function hullHW(x) { return tbl(HWX, x); }
  function keelZ(t) {
    if (t < 0.22) return -1.4 - (DR - 1.4) * Math.pow(t / 0.22, 0.6);
    if (t < 0.80) return -DR;
    return -DR + (DR + 0.5) * Math.pow((t - 0.80) / 0.1995, 1.9);
  }
  /* 0 = full midship box section, 1 = the fine flared entry */
  var VB_K = [[0.00, 0.32], [0.06, 0.28], [0.16, 0.16], [0.28, 0.00],
              [0.48, 0.00], [0.60, 0.12], [0.70, 0.34], [0.80, 0.60],
              [0.90, 0.83], [1.000, 1.00]];
  /* sections as [half breadth, height] fractions, deck edge first. She is
     near flat-sided amidships (every broadside), the side leaning out a
     little to the deck edge (21.7 m on the waterline under the 22.3 m
     beam); forward the flare opens above a fine waterline (1965 bow view).
     With these the hull displaces about 18,000 t at the 7.3 m draught,
     against 16,602 t full load published: 8% heavy, inside what the
     draught figure (not tied to a loading) allows                         */
  var SEC_FULL = [[1.000, 1.000], [0.997, 0.880], [0.991, 0.760], [0.983, 0.620],
                  [0.965, 0.480], [0.920, 0.360], [0.840, 0.255], [0.700, 0.165],
                  [0.520, 0.095], [0.330, 0.045], [0.150, 0.012], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.940, 0.880], [0.860, 0.760], [0.760, 0.620],
                  [0.665, 0.480], [0.575, 0.360], [0.480, 0.255], [0.375, 0.165],
                  [0.268, 0.095], [0.165, 0.045], [0.072, 0.012], [0.000, 0.000]];
  var CAMBER = [[0.560, 1.008], [0.000, 1.012], [-0.560, 1.008]];
  /* the rake: the transom leans forward 3.9 m from deck to waterline, the
     stem aft about as much; points shift with their depth below the deck */
  var RAKE_K = [[0.000, -5.3], [0.012, -1.6], [0.030, 0.0], [0.840, 0.0],
                [0.910, 1.4], [0.960, 3.6], [1.000, 6.9]];

  function ringOf(b) {
    var i, r = [];
    function pt(i) {
      return [SEC_FULL[i][0] + (SEC_FINE[i][0] - SEC_FULL[i][0]) * b,
              SEC_FULL[i][1] + (SEC_FINE[i][1] - SEC_FULL[i][1]) * b];
    }
    r.push(pt(0));
    for (i = 0; i < CAMBER.length; i++) r.push([CAMBER[i][0], CAMBER[i][1]]);
    for (i = 0; i < SEC_FULL.length; i++) { var p = pt(i); r.push([-p[0], p[1]]); }
    for (i = SEC_FULL.length - 2; i >= 1; i--) r.push(pt(i));
    return r;                                   /* 26 points, closed ring */
  }
  /* the half breadth of the moulded hull at station x and height z */
  function hullY(x, z) {
    var t = tOf(x), b = tbl(VB_K, t), w = hullHW(x), kz = keelZ(t);
    var zf = (z - kz) / (deckZ(x) - kz), i;
    for (i = 0; i < SEC_FULL.length - 1; i++) {
      var y0 = SEC_FULL[i][0] + (SEC_FINE[i][0] - SEC_FULL[i][0]) * b;
      var z0 = SEC_FULL[i][1] + (SEC_FINE[i][1] - SEC_FULL[i][1]) * b;
      var y1 = SEC_FULL[i + 1][0] + (SEC_FINE[i + 1][0] - SEC_FULL[i + 1][0]) * b;
      var z1 = SEC_FULL[i + 1][1] + (SEC_FINE[i + 1][1] - SEC_FULL[i + 1][1]) * b;
      if (zf <= z0 && zf >= z1) return w * (y0 + (y1 - y0) * (z0 - zf) / ((z0 - z1) || 1));
    }
    return w;
  }

  /* the stations: close at the ends, where the shape changes */
  var XS = [-109.95, -108.6, -106.0, -102.0, -96.5, -89.0, -80.0, -70.0, -58.0,
            -45.0, -32.0, -18.0, -4.0, 10.0, 24.0, 36.0, 47.0, 57.0, 66.0,
            74.0, 81.0, 87.0, 92.0, 96.5, 100.0, 103.0, 105.4, 107.3, 108.7,
            109.55];

  /* ================================================================ helpers */
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function rng(seed) {
    var s = (seed >>> 0) || 11;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function tex(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = rep ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* ================================================================ textures
     Painted once per page: they depend on nothing but the ship.            */
  var _tx = null;
  function textures(THREE) {
    if (_tx) return _tx;
    _tx = { hull: hullTex(THREE), sup: supTex(THREE), deck: deckTex(THREE),
            pad: padTex(THREE) };
    return _tx;
  }

  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(19611), i, j, x, z;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    g.fillStyle = "#686e75"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling below the waterline and the black boot topping over it */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.45), W, H - Y(-0.45));
    g.fillStyle = "#15181b"; g.fillRect(0, Y(0.75), W, Y(-0.45) - Y(0.75));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.75) - 1, W, 1.5);
    /* strake seams, in real height so they stay level */
    g.lineWidth = 1.2;
    var STR = [1.9, 3.4, 4.9, 6.2, 7.6, 9.0];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
      g.beginPath(); g.moveTo(0, Y(STR[i]) + 1.4); g.lineTo(W, Y(STR[i]) + 1.4); g.stroke();
    }
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.12)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 26; j++) {
        x = ((j + st) / 26) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }
    /* scuttles in a row under the deck edge, following the sheer, and the
       freeing ports' rust streaks                                         */
    for (i = 0; i < 70; i++) {
      x = -100 + (i / 69) * 190;
      z = deckZ(x) - 1.3;
      g.globalAlpha = 0.45; g.fillStyle = "#1a1f23";
      g.fillRect(U(x) - 2, Y(z) - 2, 4, 4);
      if (R() < 0.6) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 3, 3, (0.8 + R() * 2.0) * (H / (ZTOP - ZBOT)));
    }
    g.globalAlpha = 1;
    /* rust weeping from the hawse under each anchor */
    g.globalAlpha = 0.14; g.fillStyle = "#6d4526";
    g.fillRect(U(101.0) - 5, Y(deckZ(101.0) - 3.0), 10, 3.4 * (H / (ZTOP - ZBOT)));
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 104.5 : -104.0;
      for (j = 0; j <= 10; j++) g.fillRect(U(x) - 6, Y(-0.3 + j * 0.55), j % 2 ? 7 : 12, 2);
    }
    /* the shadow line under the deck edge */
    g.globalAlpha = 0.28; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = -XB + (i / W) * LOA;
      g.fillRect(i, Y(deckZ(x)) - 1, 4, 6);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, false);
  }

  /* deckhouse plating: 4 m of steel per tile */
  function supTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(30961), i;
    g.fillStyle = "#737a81"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 18; i++) {
      g.globalAlpha = 0.016 + R() * 0.024;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 100, 30 + R() * 70);
    }
    g.globalAlpha = 1; g.lineWidth = 1.2;
    for (i = 1; i < 4; i++) {
      g.strokeStyle = "rgba(0,0,0,0.24)";
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(0, i * H / 4 + 1.5); g.lineTo(W, i * H / 4 + 1.5); g.stroke();
    }
    g.fillStyle = "#6d4526";
    for (i = 0; i < 20; i++) {
      g.globalAlpha = 0.025 + R() * 0.035;
      g.fillRect(R() * W, R() * H, 2 + R() * 3, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* weather deck: dark deck grey, non-skid with plate joints */
  function deckTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(7719), i;
    g.fillStyle = "#474c51"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 16; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 90, 20 + R() * 60);
    }
    g.globalAlpha = 0.26; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 4; i++) {
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* the fantail's helicopter square as the 1963 plan draws it: a square
     outline, its two diagonals and a circle. u runs fore-and-aft, v
     athwart; the circle itself is laid in the team colour on top          */
  function padTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(4417), i;
    g.fillStyle = "#43484d"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#33373b" : "#52585e";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 2200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.strokeStyle = "#d6d8d2"; g.lineWidth = 9;
    g.strokeRect(W * 0.03, H * 0.03, W * 0.94, H * 0.94);
    g.lineWidth = 6;
    g.beginPath(); g.moveTo(W * 0.03, H * 0.03); g.lineTo(W * 0.97, H * 0.97); g.stroke();
    g.beginPath(); g.moveTo(W * 0.97, H * 0.03); g.lineTo(W * 0.03, H * 0.97); g.stroke();
    return tex(THREE, cv, false);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var T = textures(THREE), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    /* the surfaces that lie on another surface are pulled toward the camera
       a couple of depth steps, or they shimmer at the zoom-out limit        */
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.pad   = S({ map: T.pad, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -3 });
    /* the SCANFAR faces: smooth flat plate, a touch lighter than the box
       walls round them, as the Enterprise hero draws the same arrays      */
    M.ary   = S({ color: 0x8e9296, roughness: 0.70, metalness: 0.06 });
    M.rad   = S({ color: 0xc9ccc6, roughness: 0.90, metalness: 0.03 });
    M.dark  = S({ color: 0x24272b, roughness: 0.88, metalness: 0.06 });
    M.metal = S({ color: 0x80878d, roughness: 0.55, metalness: 0.50 });
    M.team  = S({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -5 });
    M.glass = S({ color: 0x2b3a44, roughness: 0.12, metalness: 0.25,
                  transparent: true, opacity: 0.86 });
    return M;
  }

  /* ================================================================ batching
     Parts are plain triangles appended to one Batch per material. A stamp
     (position and yaw) moves everything built while it is set, so a mount
     is drawn once about its own origin and set down where it stands.      */
  function Batch() { this.p = []; this.n = []; this.u = []; }
  Batch.xf = null;
  Batch.prototype.vert = function (x, y, z, nx, ny, nz, u, v) {
    var t = Batch.xf;
    if (t) {
      var px = x * t.c - y * t.s + t.x, py = x * t.s + y * t.c + t.y;
      var qx = nx * t.c - ny * t.s, qy = nx * t.s + ny * t.c;
      x = px; y = py; z += t.z; nx = qx; ny = qy;
    }
    this.p.push(x, y, z); this.n.push(nx, ny, nz); this.u.push(u, v);
  };
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    for (var i = 0; i < P.count; i++)
      this.vert(P.getX(i), P.getY(i), P.getZ(i), N.getX(i), N.getY(i), N.getZ(i),
                U ? U.getX(i) : 0, U ? U.getY(i) : 0);
    return this;
  };
  /* one flat triangle; a, b, c are [x, y, z, u, v] */
  Batch.prototype.tri = function (a, b, c) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= l; ny /= l; nz /= l;
    this.vert(a[0], a[1], a[2], nx, ny, nz, a[3], a[4]);
    this.vert(b[0], b[1], b[2], nx, ny, nz, b[3], b[4]);
    this.vert(c[0], c[1], c[2], nx, ny, nz, c[3], c[4]);
  };
  /* the same, turned to face away from the point C */
  Batch.prototype.triOut = function (a, b, c, C) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var mx = (a[0] + b[0] + c[0]) / 3 - C[0], my = (a[1] + b[1] + c[1]) / 3 - C[1];
    var mz = (a[2] + b[2] + c[2]) / 3 - C[2];
    if (nx * mx + ny * my + nz * mz < 0) this.tri(a, c, b); else this.tri(a, b, c);
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    return new THREE.Mesh(g, mtl);
  };

  var _o = null, _v0 = null, _v1 = null;
  function place(THREE, geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }

  /* ---- plan polygons: always convex and counter-clockwise ------------- */
  function bboxOf(poly) {
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, i;
    for (i = 0; i < poly.length; i++) {
      x0 = Math.min(x0, poly[i][0]); x1 = Math.max(x1, poly[i][0]);
      y0 = Math.min(y0, poly[i][1]); y1 = Math.max(y1, poly[i][1]);
    }
    return { cx: (x0 + x1) * 0.5, cy: (y0 + y1) * 0.5, w: x1 - x0, h: y1 - y0 };
  }
  function roofOf(poly, ins, more) {
    var bb = bboxOf(poly), e = ins + (more || 0);
    var sx = (bb.w - 2 * e) / bb.w, sy = (bb.h - 2 * e) / bb.h;
    return poly.map(function (p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; });
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }

  /* ================================================================ the hull */
  function hullMesh(THREE, mtl) {
    var pos = [], uv = [], idx = [], i, j, R = 0;
    for (i = 0; i < XS.length; i++) {
      var x0 = XS[i], t = tOf(x0), r = ringOf(tbl(VB_K, t));
      var w = hullHW(x0), kz = keelZ(t), dz = deckZ(x0), dep = dz - kz;
      var rk = tbl(RAKE_K, t);
      for (j = 0; j < r.length; j++) {
        var z = kz + dep * r[j][1];
        pos.push(x0 + rk * (Math.min(1.0, r[j][1]) - 1.0), w * r[j][0], z);
        uv.push(t, (z - ZBOT) / (ZTOP - ZBOT));
      }
      R = r.length;
    }
    for (i = 0; i < XS.length - 1; i++) {
      for (j = 0; j < R; j++) {
        var a = i * R + j, b = i * R + (j + 1) % R, c = a + R, d = b + R;
        idx.push(a, b, d, a, d, c);
      }
    }
    function cap(sIdx, flip) {
      var base = sIdx * R, k, cx = 0, cy = 0, cz = 0;
      for (k = 0; k < R; k++) {
        cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2];
      }
      cx /= R; cy /= R; cz /= R;
      var ci = pos.length / 3;
      pos.push(cx, cy, cz); uv.push(sIdx ? 1 : 0, (cz - ZBOT) / (ZTOP - ZBOT));
      for (k = 0; k < R; k++) {
        var p = base + k, q = base + (k + 1) % R;
        if (flip) idx.push(ci, q, p); else idx.push(ci, p, q);
      }
    }
    cap(0, true); cap(XS.length - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* the weather deck: a cambered ribbon on the hull top, sheer and all.
     It stops short of the helicopter square, which lies on it            */
  function deckRibbon(THREE, mtl) {
    var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
    var XR = [-109.7, -108.6, -106.0, -102.0, -96.5, -89.0, -80.0, -70.0, -58.0,
              -45.0, -32.0, -18.0, -4.0, 10.0, 24.0, 36.0, 47.0, 57.0, 66.0,
              74.0, 81.0, 87.0, 92.0, 96.5, 100.0, 103.0, 105.4, 107.3, 108.6];
    var pos = [], uv = [], idx = [], i, j, R = KY.length;
    for (i = 0; i < XR.length; i++) {
      var x = XR[i], t = tOf(x), r = ringOf(tbl(VB_K, t)), w = hullHW(x);
      var kz = keelZ(t), dz = deckZ(x), dep = dz - kz;
      for (j = 0; j < R; j++) {
        var ky = KY[j], ak = Math.abs(ky);
        var kd = ak > 0.995 ? r[0][1] : 1.0 + 0.012 * (1 - ak * ak);
        pos.push(x, w * ky, kz + dep * kd + 0.07);
        uv.push(x / 5.5, ky * w / 5.5);
      }
    }
    for (i = 0; i < XR.length - 1; i++) for (j = 0; j < R - 1; j++) {
      var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* =============================================================== assembly */
  function build(THREE, MOD, C) {
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var M = makeMats(THREE, team);
    var G = new THREE.Group();
    var KEYS = ["sup", "deck", "pad", "ary", "rad", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, j, s;

    /* ---- primitives, all into cur[key] ------------------------------- */
    function bx(k, lx, ly, lz, x, y, z, rx, ry, rz) {
      cur[k].add(place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz));
    }
    /* vertical cylinder (axis +Z) standing on z0 */
    function cz(k, rt, rb, h, seg, x, y, z0) {
      var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
      g.rotateX(PI / 2);
      cur[k].add(place(THREE, g, x, y, z0 + h * 0.5));
    }
    /* cylinder along +X from x0 (radius r1 at the far end) */
    function cx(k, r0, r1, L, seg, x0, y, z) {
      var g = new THREE.CylinderGeometry(r1, r0, L, seg, 1, false);
      g.rotateZ(-PI / 2);
      cur[k].add(place(THREE, g, x0 + L * 0.5, y, z));
    }
    function sph(k, r, ws, hs, x, y, z) {
      cur[k].add(place(THREE, new THREE.SphereGeometry(r, ws, hs), x, y, z));
    }
    /* an open or closed round tube between two points, r0 at a, r1 at b */
    function tube(k, ax, ay, az, bx2, by, bz, r0, r1, seg, closed) {
      if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      var g = new THREE.CylinderGeometry(r1, r0, L, seg || 6, 1, !closed);
      _v1.set(dx, dy, dz).normalize();
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_v0, _v1));
      g.translate((ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
      cur[k].add(g);
    }
    /* a thin three-sided bar between two points: rails, struts, braces */
    function bar(k, ax, ay, az, bx2, by, bz, r) {
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      dx /= L; dy /= L; dz /= L;
      var px, py, pz;
      if (Math.abs(dz) < 0.95) { px = -dy; py = dx; pz = 0; } else { px = 1; py = 0; pz = 0; }
      var pd = px * dx + py * dy + pz * dz;
      px -= pd * dx; py -= pd * dy; pz -= pd * dz;
      var pl = Math.sqrt(px * px + py * py + pz * pz); px /= pl; py /= pl; pz /= pl;
      var qx = dy * pz - dz * py, qy = dz * px - dx * pz, qz = dx * py - dy * px;
      var o = [], q, B = cur[k];
      for (q = 0; q < 3; q++) {
        var an = PI / 2 + q * 2 * PI / 3, c = Math.cos(an) * r, sn = Math.sin(an) * r;
        o.push([px * c + qx * sn, py * c + qy * sn, pz * c + qz * sn]);
      }
      var Cm = [(ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5];
      for (q = 0; q < 3; q++) {
        var a = o[q], b = o[(q + 1) % 3];
        var A0 = [ax + a[0], ay + a[1], az + a[2], 0, 0], A1 = [ax + b[0], ay + b[1], az + b[2], 0, 0];
        var B0 = [bx2 + a[0], by + a[1], bz + a[2], 0, 1], B1 = [bx2 + b[0], by + b[1], bz + b[2], 0, 1];
        B.triOut(A0, A1, B1, Cm); B.triOut(A0, B1, B0, Cm);
      }
    }
    /* a faceted block: plan polygon extruded z0..z1, the top inset by `ins`
       metres all round so every wall leans in. Roof capped unless noCap;
       roofK lays the roof in another material (the dark deck)            */
    function prism(k, poly, z0, z1, ins, US, noCap, roofK) {
      var bb = bboxOf(poly), n = poly.length, B = cur[k], q;
      var sx = (bb.w - 2 * ins) / bb.w, sy = (bb.h - 2 * ins) / bb.h, per = 0;
      US = US || 4.0;
      function top(p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; }
      for (q = 0; q < n; q++) {
        var a = poly[q], b = poly[(q + 1) % n], at = top(a), bt = top(b);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var u0 = per / US, u1 = (per + L) / US, v0 = z0 / US, v1 = z1 / US;
        per += L;
        var A0 = [a[0], a[1], z0, u0, v0], B0 = [b[0], b[1], z0, u1, v0];
        var B1 = [bt[0], bt[1], z1, u1, v1], A1 = [at[0], at[1], z1, u0, v1];
        B.tri(A0, B0, B1); B.tri(A0, B1, A1);
      }
      if (!noCap) {
        var RB = roofK ? cur[roofK] : B, RU = roofK ? 5.5 : US;
        for (q = 0; q < n; q++) {
          var p = top(poly[q]), r = top(poly[(q + 1) % n]);
          RB.tri([bb.cx, bb.cy, z1, bb.cx / RU, bb.cy / RU], [p[0], p[1], z1, p[0] / RU, p[1] / RU],
                 [r[0], r[1], z1, r[0] / RU, r[1] / RU]);
        }
      }
    }
    /* a frame on a vertical surface whose outward normal is (nx, ny) */
    function frameN(x, y, z, nx, ny) {
      var l = Math.sqrt(nx * nx + ny * ny); nx /= l; ny /= l;
      return { o: [x, y, z], t: [-ny, nx, 0], w: [0, 0, 1], n: [nx, ny, 0] };
    }
    function fp(F, s1, r1, d) {
      return [F.o[0] + F.t[0] * s1 + F.w[0] * r1 + F.n[0] * d,
              F.o[1] + F.t[1] * s1 + F.w[1] * r1 + F.n[1] * d,
              F.o[2] + F.t[2] * s1 + F.w[2] * r1 + F.n[2] * d];
    }
    /* a plate on a frame: a convex outline in (along, up) wall metres,
       counter-clockwise seen from outside, standing d0..d1 off the wall    */
    function plate(k, F, pts, d0, d1) {
      var B = cur[k], n = pts.length, q;
      function P(p, d) { var w = fp(F, p[0], p[1], d); return [w[0], w[1], w[2], p[0] * 0.25, p[1] * 0.25]; }
      for (q = 1; q < n - 1; q++) B.tri(P(pts[0], d1), P(pts[q], d1), P(pts[q + 1], d1));
      for (q = 0; q < n; q++) {
        var a = pts[q], b = pts[(q + 1) % n];
        B.tri(P(a, d0), P(b, d0), P(b, d1)); B.tri(P(a, d0), P(b, d1), P(a, d1));
      }
    }
    /* one outward-facing rectangle on a frame, d metres off the wall */
    function quad(k, F, s0, r0, s1, r1, d) {
      var a = fp(F, s0, r0, d), b = fp(F, s1, r0, d), c = fp(F, s1, r1, d), e = fp(F, s0, r1, d);
      cur[k].tri([a[0], a[1], a[2], 0, 0], [b[0], b[1], b[2], 1, 0], [c[0], c[1], c[2], 1, 1]);
      cur[k].tri([a[0], a[1], a[2], 0, 0], [c[0], c[1], c[2], 1, 1], [e[0], e[1], e[2], 0, 1]);
    }
    /* a loft along x of rounded sections [x, half width, bottom, top] */
    function loftX(k, secs, n, p) {
      var rings = [], q, m, B = cur[k], sxs = 0, szs = 0;
      for (q = 0; q < secs.length; q++) {
        var S = secs[q], zc = (S[2] + S[3]) * 0.5, hh = (S[3] - S[2]) * 0.5, ring = [];
        for (m = 0; m < n; m++) {
          var an = 2 * PI * m / n, c = Math.cos(an), sn = Math.sin(an);
          ring.push([S[0], S[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                     zc + hh * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), p), m / n, S[0] * 0.25]);
        }
        rings.push(ring); sxs += S[0]; szs += zc;
      }
      var Cs = [sxs / secs.length, 0, szs / secs.length];
      for (q = 0; q < rings.length - 1; q++) {
        var A = rings[q], Bq = rings[q + 1];
        var Cq = [(secs[q][0] + secs[q + 1][0]) * 0.5, 0,
                  (secs[q][2] + secs[q][3] + secs[q + 1][2] + secs[q + 1][3]) * 0.25];
        for (m = 0; m < n; m++) {
          var m2 = (m + 1) % n;
          B.triOut(A[m], A[m2], Bq[m2], Cq); B.triOut(A[m], Bq[m2], Bq[m], Cq);
        }
      }
      [0, rings.length - 1].forEach(function (e) {
        var Rg = rings[e], S = secs[e], cc = [S[0], 0, (S[2] + S[3]) * 0.5, 0.5, 0.5];
        if (S[1] < 0.02) return;
        for (m = 0; m < n; m++) B.triOut(cc, Rg[m], Rg[(m + 1) % n], Cs);
      });
    }
    /* a horizontal rectangle facing up, uv (u0,v0)-(u1,v1) */
    function flat(k, x0, y0, x1, y1, z, u0, v0, u1, v1) {
      cur[k].tri([x0, y0, z, u0, v0], [x1, y0, z, u1, v0], [x1, y1, z, u1, v1]);
      cur[k].tri([x0, y0, z, u0, v0], [x1, y1, z, u1, v1], [x0, y1, z, u0, v1]);
    }
    function stamp(x, y, z, yaw, fn) {
      var prev = Batch.xf;
      Batch.xf = { x: x, y: y, z: z, c: Math.cos(yaw), s: Math.sin(yaw) };
      fn();
      Batch.xf = prev;
    }
    /* a railing along a run of points: a top rail and a middle rail, and a
       stanchion every `step` metres                                       */
    function railRun(k, pts, h, step) {
      var q, jj;
      for (q = 0; q < pts.length - 1; q++) {
        var a = pts[q], b = pts[q + 1];
        bar(k, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.04);
        bar(k, a[0], a[1], a[2] + h * 0.52, b[0], b[1], b[2] + h * 0.52, 0.028);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var n = Math.max(1, Math.round(L / step));
        for (jj = (q === 0 ? 0 : 1); jj <= n; jj++) {
          var f = jj / n, x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f;
          var z = a[2] + (b[2] - a[2]) * f;
          bar(k, x, y, z, x, y, z + h, 0.035);
        }
      }
    }
    function railRoof(poly, z, skip, step) {
      var q, n = poly.length;
      for (q = 0; q < n; q++) {
        if (skip && skip.indexOf(q) >= 0) continue;
        var a = poly[q], b = poly[(q + 1) % n];
        railRun("metal", [[a[0], a[1], z], [b[0], b[1], z]], 1.0, step || 2.4);
      }
    }
    function railRing(x, y, z, r, n) {
      var pts = [], q;
      for (q = 0; q <= n; q++) {
        var an = 2 * PI * q / n;
        pts.push([x + r * Math.cos(an), y + r * Math.sin(an), z]);
      }
      railRun("metal", pts, 0.95, 9);
    }
    /* height of the cambered weather deck under a point, ribbon and all */
    function topZ(x, y) {
      var t = tOf(x), dz = deckZ(x), dep = dz - keelZ(t);
      var ak = Math.min(1, Math.abs(y) / hullHW(x));
      return dz + dep * 0.012 * (1 - ak * ak) + 0.07;
    }

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    var dk = deckRibbon(THREE, M.deck); dk.name = "deck"; G.add(dk);

    /* the SQS-23 bow dome under the forefoot, and a bilge keel each side */
    var dome = new THREE.SphereGeometry(1, 16, 9);
    dome.scale(7.0, 1.7, 1.9);
    dome.rotateY(-0.12);
    cur.dark.add(place(THREE, dome, 95.0, 0, -4.4));
    for (s = -1; s <= 1; s += 2) {
      /* on the turn of the bilge, standing out square to the plating */
      var byk = hullY(-12.0, -4.6);
      bx("dark", 52.0, 0.18, 0.75, -12.0, s * (byk + 0.25), -4.75, s * 0.75, 0, 0);
    }
    /* the twin shafts' skegs and rudders under the counter */
    for (s = -1; s <= 1; s += 2) {
      bx("dark", 14.0, 0.5, 1.6, -92.0, s * 4.2, -5.6);
      bx("dark", 4.2, 0.35, 4.6, -101.5, s * 3.0, -3.6);
    }

    /* ------------------------------------------------ the forecastle ---- */
    /* the solid bulwark round the bow, from abreast the windlasses to the
       stem head, its top rising from 8.4 m to 10.3 m (drawing, c1961
       photograph), leaning out with the flare                            */
    var BW = [[89.0, 8.40], [93.0, 9.10], [98.0, 9.55], [104.0, 9.95], [107.6, 10.20], [109.82, 10.30]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < BW.length - 1; i++) {
        var xa = BW[i][0], xb2 = Math.min(BW[i + 1][0], XSTEM);
        var ya = s * Math.max(0.05, hullHW(xa) - 0.06), yb = s * Math.max(0.0, hullHW(xb2) - 0.06);
        if (i === BW.length - 2) { xb2 = 109.82; yb = 0; }
        var za = deckZ(xa), zb = deckZ(Math.min(xb2, XSTEM));
        var oa = s * 0.22 * (BW[i][1] - za), ob = s * 0.22 * (BW[i + 1][1] - zb);
        var Cb = [(xa + xb2) * 0.5, 0, (za + zb) * 0.5];
        /* outer face in hull paint, inner face in plate */
        var P0 = [xa, ya, za - 0.1, 0, 0], P1 = [xb2, yb, zb - 0.1, 1, 0];
        var P2 = [xb2, yb + ob, BW[i + 1][1], 1, 1], P3 = [xa, ya + oa, BW[i][1], 0, 1];
        cur.sup.triOut(P0, P1, P2, Cb); cur.sup.triOut(P0, P2, P3, Cb);
        var Q0 = [xa, ya - s * 0.18, za, 0, 0], Q1 = [xb2, yb - s * 0.18 * (yb ? 1 : 0), zb, 1, 0];
        var Q2 = [xb2, yb + ob - s * 0.18 * (yb ? 1 : 0), BW[i + 1][1] - 0.05, 1, 1], Q3 = [xa, ya + oa - s * 0.18, BW[i][1] - 0.05, 0, 1];
        var Ci = [(xa + xb2) * 0.5, s * 12, (za + zb) * 0.5];
        cur.sup.triOut(Q0, Q1, Q2, Ci); cur.sup.triOut(Q0, Q2, Q3, Ci);
        /* the capping rail along its top */
        bar("sup", xa, ya + oa - s * 0.09, BW[i][1], xb2, yb + ob - s * 0.09 * (yb ? 1 : 0), BW[i + 1][1], 0.13);
      }
    }
    /* the V breakwater across the forecastle ahead of the lower launcher */
    for (s = -1; s <= 1; s += 2) {
      var bwA = [85.6, 0], bwB = [82.6, s * 5.4];
      var bl = Math.sqrt(9.0 + 5.4 * 5.4);
      bx("sup", bl, 0.14, 1.2, (bwA[0] + bwB[0]) * 0.5, (bwA[1] + bwB[1]) * 0.5, topZ(84.1, s * 2.7) + 0.55,
         0, 0, Math.atan2(bwB[1] - bwA[1], bwB[0] - bwA[0]));
      for (j = 1; j < 4; j++) {
        var fx = 85.6 - 3.0 * j / 4, fy = s * 5.4 * j / 4;
        bx("sup", 0.6, 0.1, 1.0, fx - 0.3, fy, topZ(fx, fy) + 0.5, 0, 0, 0);
      }
    }
    /* two anchors in hawses on the bows, the cable aft to the windlasses */
    for (s = -1; s <= 1; s += 2) {
      var AX = 101.0, AZ = deckZ(101.0) - 2.4, ay0 = hullY(AX + 0.6, AZ);
      var slope = (hullY(AX + 1.6, AZ) - hullY(AX - 0.4, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.05), AZ, -slope, s);
      plate("dark", FA, rectPts(-0.9, -2.0, 0.9, 0.6), 0, 0.05);
      plate("metal", FA, rectPts(-0.16, -1.55, 0.16, 0.4), 0.05, 0.4);
      plate("metal", FA, rectPts(-0.48, -1.9, 0.48, -1.52), 0.05, 0.44);
      plate("metal", FA, [[-0.48, -1.9], [-0.48, -1.52], [-1.0, -1.18]], 0.05, 0.38);
      plate("metal", FA, [[0.48, -1.9], [1.0, -1.18], [0.48, -1.52]], 0.05, 0.38);
      cz("dark", 0.48, 0.48, 0.08, 10, 100.2, s * 2.4, topZ(100.2, 2.4) - 0.03);
      var cxa = 100.2, cya = s * 2.4, cxb = 94.6, cyb = s * 1.5;
      bx("dark", Math.sqrt((cxa - cxb) * (cxa - cxb) + (cya - cyb) * (cya - cyb)), 0.34, 0.12,
         (cxa + cxb) * 0.5, (cya + cyb) * 0.5, topZ(97.4, 2.0) + 0.03, 0, 0, Math.atan2(cya - cyb, cxa - cxb));
      cz("metal", 0.62, 0.7, 0.8, 12, 94.6, s * 1.5, topZ(94.6, 1.5) - 0.02);
      bx("sup", 1.6, 1.0, 0.65, 93.4, s * 1.5, topZ(93.4, 1.5) + 0.3);
    }
    cz("metal", 0.5, 0.6, 1.0, 10, 90.2, 0, topZ(90.2, 0) - 0.02);
    /* team stripe lying on the forecastle, where the camera looks down */
    flat("team", 88.0, -2.3, 92.6 - 0.2, 2.3, topZ(90.2, 0) + 0.04, 0, 0, 1, 1);
    /* jackstaff at the stem head, inside the bulwark's point */
    bar("metal", 108.4, 0, deckZ(108.4), 108.4, 0, deckZ(108.4) + 4.0, 0.06);

    /* ------------------------------------------- the long 01 deckhouse ---- */
    /* one continuous house from the aft tower to the forward launcher, the
       side decks clear outboard of it (plan); widest under the box        */
    var H01 = [
      [[-69.3, -4.6], [-66.0, -7.4], [-44.0, -7.8], [-44.0, 7.8], [-66.0, 7.4], [-69.3, 4.6]],
      [[-44.2, -6.8], [-16.8, -6.8], [-16.8, 6.8], [-44.2, 6.8]],
      [[-17.0, -8.8], [30.2, -8.8], [30.2, 8.8], [-17.0, 8.8]],
      [[30.0, -7.6], [62.0, -6.9], [72.6, -5.8], [72.6, 5.8], [62.0, 6.9], [30.0, 7.6]]
    ];
    H01.forEach(function (p) { prism("sup", p, 6.3, Z01, 0.12, 4.0, false, "deck"); });
    railRoof(roofOf(H01[0], 0.12, 0.1), Z01, [0, 2, 5], 3.2);
    railRoof(roofOf(H01[3], 0.12, 0.1), Z01, [5], 3.2);
    /* watertight doors and scuttles along the house sides */
    for (s = -1; s <= 1; s += 2) {
      [-60.0, -50.0, -38.0, -28.0, -10.0, 4.0, 26.0, 40.0, 55.0, 66.0].forEach(function (x) {
        var hw = x < -44 ? 7.75 : (x < -17 ? 6.75 : (x < 30 ? 8.75 : (7.6 - (x - 30) * 0.035)));
        bx("dark", 0.9, 0.06, 1.95, x, s * (hw + 0.02), deckZ(x) + 1.1);
        for (j = 1; j <= 2; j++) bx("dark", 0.3, 0.05, 0.3, x + j * 2.2, s * (hw + 0.02), deckZ(x) + 2.2);
      });
    }

    /* ------------------------------------------ the forward superstructure */
    /* the 02 level ahead of the box, the 03 block that carries SPG-55 no. 2
       and runs back under the box, and the box's own lower levels          */
    var F02 = [[21.0, -6.6], [49.7, -6.0], [49.7, 6.0], [21.0, 6.6]], ZF2 = 13.0;
    prism("sup", F02, Z01, ZF2, 0.15, 4.0, false, "deck");
    railRoof(roofOf(F02, 0.15, 0.1), ZF2, [3], 3.2);
    var F03 = [[2.5, -6.9], [36.2, -5.2], [36.2, 5.2], [2.5, 6.9]], ZF3 = 17.1;
    prism("sup", F03, ZF2 - 0.1, ZF3, 0.1, 4.0, false, "deck");
    var FB = [[1.6, -7.6], [21.2, -7.6], [21.2, 7.6], [1.6, 7.6]];
    prism("sup", FB, Z01, ZF2, 0.08, 4.0, true);
    /* the level under the box carries a row of windows round its front */
    [-4.6, -3.0, -1.4, 1.4, 3.0, 4.6].forEach(function (y) {
      bx("glass", 0.08, 0.9, 0.7, 36.25, y * 0.95, 15.7);
    });

    /* ------------------------------------------------------- the box ---- */
    var BX0 = 0.8, BX1 = 20.8, BHW = 9.8, ZB0 = 17.1, ZB1 = 30.4;
    var BOX = [[BX0, -BHW], [BX1, -BHW], [BX1, BHW], [BX0, BHW]];
    prism("sup", BOX, ZB0, ZB1, 0.0, 4.0, false, "deck");
    /* the soffit of the overhang, facing down */
    flat("sup", BX0, BHW, BX1, -BHW, ZB0 - 0.02, 0, 0, 5, 5);
    /* SCANFAR. On each face one AN/SPS-33 (tall) at one end and one wide
       AN/SPS-32 (13 m) at the other, pinwheel-fashion as on the 1960s
       Enterprise: the forward face has its SPS-33 at the starboard end
       (1962 and 1965 photographs), the starboard face at the after end
       (1968 photograph, drawing), so the after face has it at the port end
       and the port face at the forward end. The tops line up at 28.0 m;
       the SPS-33 hangs 2 m lower than the SPS-32 (1962, 1965, 1968).     */
    var ZAT = 28.2;
    function arrayPanel(face, u0, u1, z0, z1) {
      /* face: 0 fwd (+x), 1 port (+y), 2 aft (-x), 3 stbd (-y); u along the
         face, left to right as seen from outside                          */
      var nx = [1, 0, -1, 0][face], ny = [0, 1, 0, -1][face];
      var ox = (BX0 + BX1) * 0.5 + nx * (BX1 - BX0) * 0.5, oy = ny * BHW;
      /* frameN's t is the viewer's right as seen from outside */
      var F = frameN(ox, oy, 0, nx, ny);
      /* a smooth slab standing 0.55 m proud of the box wall: its edges
         throw the shadow lines the photographs show between the arrays  */
      plate("ary", F, rectPts(u0, z0, u1, z1), 0, 0.55);
    }
    /* fore and aft faces 19.6 m: SPS-33 6.2 m, SPS-32 12.7 m; the side
       faces 20.0 m: SPS-33 6.4 m, SPS-32 13.0 m                          */
    arrayPanel(0, -9.6, -3.4, ZAT - 8.8, ZAT);
    arrayPanel(0, -3.1, 9.6, ZAT - 6.8, ZAT);
    arrayPanel(3, -9.85, -3.45, ZAT - 8.8, ZAT);
    arrayPanel(3, -3.15, 9.85, ZAT - 6.8, ZAT);
    arrayPanel(2, -9.6, -3.4, ZAT - 8.8, ZAT);
    arrayPanel(2, -3.1, 9.6, ZAT - 6.8, ZAT);
    arrayPanel(1, -9.85, -3.45, ZAT - 8.8, ZAT);
    arrayPanel(1, -3.15, 9.85, ZAT - 6.8, ZAT);
    /* the pilot-house window band round the top of the box, under a brow,
       and the lower row of windows under the arrays on the forward face
       and the sides (1965 bow view)                                       */
    function windowBand(z0, z1, faces, n) {
      faces.forEach(function (fc) {
        var nx = [1, 0, -1, 0][fc], ny = [0, 1, 0, -1][fc];
        var L = (fc % 2 === 0) ? 2 * BHW : (BX1 - BX0);
        var ox = (BX0 + BX1) * 0.5 + nx * (BX1 - BX0) * 0.5, oy = ny * BHW;
        var F = frameN(ox, oy, 0, nx, ny), q;
        plate("dark", F, rectPts(-L * 0.5 + 0.4, z0, L * 0.5 - 0.4, z1), -0.02, 0.03);
        for (q = 0; q < n; q++) {
          var u = -L * 0.5 + 0.6 + (q + 0.5) * (L - 1.2) / n;
          quad("glass", F, u - 0.32, z0 + 0.12, u + 0.32, z1 - 0.12, 0.05);
        }
      });
    }
    windowBand(28.75, 29.95, [0, 1, 2, 3], 20);
    windowBand(17.55, 18.45, [0, 1, 3], 18);
    /* the brow over the pilot house, all round */
    prism("sup", [[BX0 - 0.45, -BHW - 0.45], [BX1 + 0.45, -BHW - 0.45], [BX1 + 0.45, BHW + 0.45], [BX0 - 0.45, BHW + 0.45]],
          30.05, 30.35, 0.0, 4.0, false, "deck");
    railRoof(roofOf(BOX, 0.0, -0.3), ZB1 - 0.05, null, 3.2);
    /* the platform deckhouse on the roof round the mast foot */
    var TOPH = [[2.6, -5.6], [17.6, -5.6], [17.6, 5.6], [2.6, 5.6]], ZBT = 32.6;
    prism("sup", TOPH, ZB1, ZBT, 0.15, 4.0, false, "deck");
    railRoof(roofOf(TOPH, 0.15, 0.1), ZBT, null, 2.2);
    for (s = -1; s <= 1; s += 2) bx("dark", 0.9, 0.06, 1.9, 8.0, s * 5.57, ZB1 + 1.0);

    /* ------------------------------------------------------- directors ---- */
    /* SPG-55 (Terrier): a drum on a pedestal, the big dish behind a dark
       circular cover on its face (the black disc of every bow view)       */
    function spg55(x, y, z, yaw, ped) {
      if (ped > 0) cz("sup", 1.05, 1.2, ped, 14, x, y, z);
      stamp(x, y, z + ped, yaw, function () {
        cz("sup", 1.25, 1.35, 0.6, 16, 0, 0, 0);
        bx("sup", 2.2, 2.6, 0.9, -0.2, 0, 1.05);
        cx("sup", 1.35, 1.35, 2.0, 18, -1.0, 0, 2.7);
        cx("dark", 1.38, 1.38, 0.18, 18, 1.0, 0, 2.7);
        var g = new THREE.SphereGeometry(1.36, 18, 8, 0, 2 * PI, 0, PI / 2);
        g.scale(1, 1, 0.35); g.rotateY(PI / 2); g.translate(1.18, 0, 2.7);
        cur.dark.add(g);
        bx("sup", 0.5, 0.3, 0.9, -1.1, 1.45, 2.7);
        bx("sup", 0.5, 0.3, 0.9, -1.1, -1.45, 2.7);
      });
    }
    /* no. 1 low and forward, no. 2 stepped up on the 03 block in front of
       the box; nos. 3 and 4 on the box roof, no. 4 raised before the mast */
    spg55(39.9, 0, ZF2, 0, 1.2);
    spg55(33.3, 0, ZF3, 0, 0.6);
    spg55(15.5, 0, ZBT, 0, 0.7);
    prism("sup", [[7.6, -1.7], [11.6, -1.7], [11.6, 1.7], [7.6, 1.7]], ZBT, 36.8, 0.1, 4.0);
    railRoof([[7.3, -2.0], [11.9, -2.0], [11.9, 2.0], [7.3, 2.0]], 36.8, [2], 1.6);
    bx("metal", 4.6, 4.0, 0.12, 9.6, 0, 36.8);
    spg55(9.6, 0, 36.8, 0, 0.0);

    /* SPG-49 (Talos): two big trackers aft, stepped, looking aft, each a
       deep round dish on a heavy drum                                     */
    function spg49(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 1.5, 1.7, 0.9, 18, 0, 0, 0);
        bx("sup", 2.6, 3.2, 1.3, 0.0, 0, 1.5);
        cx("sup", 1.8, 2.1, 1.8, 20, -0.6, 0, 3.7);
        cx("rad", 2.1, 2.35, 0.75, 24, 1.2, 0, 3.7);
        cx("metal", 0.3, 0.2, 1.1, 8, 1.95, 0, 3.7);
        bx("sup", 0.7, 0.35, 1.8, -0.3, 2.2, 3.1);
        bx("sup", 0.7, 0.35, 1.8, -0.3, -2.2, 3.1);
      });
    }

    /* ------------------------------------------------ the aft superstructure */
    var A02 = [[-68.6, -3.4], [-64.5, -6.4], [-44.6, -6.6], [-44.6, 6.6], [-64.5, 6.4], [-68.6, 3.4]], ZA2 = 14.4;
    prism("sup", A02, Z01, ZA2, 0.2, 4.0, false, "deck");
    railRoof(roofOf(A02, 0.2, 0.1), ZA2, null, 3.2);
    cz("sup", 1.4, 1.6, 1.1, 16, -62.2, 0, ZA2);
    spg49(-62.2, 0, ZA2 + 1.1, PI);
    var A03 = [[-58.2, -2.9], [-52.4, -2.9], [-52.4, 2.9], [-58.2, 2.9]];
    prism("sup", A03, ZA2, 20.2, 0.2, 4.0, false, "deck");
    railRoof(roofOf(A03, 0.2, 0.1), 20.2, null, 1.8);
    spg49(-55.6, 0, 20.2, PI);
    /* the plated aft tower, tapering, the pole mast out of its top        */
    var AT = [[-52.0, -5.0], [-44.6, -5.0], [-44.6, 5.0], [-52.0, 5.0]];
    prism("sup", AT, ZA2, 21.8, 1.4, 4.0, false, "deck");
    var AT2 = [[-49.6, -2.2], [-45.4, -2.2], [-45.4, 2.2], [-49.6, 2.2]];
    prism("sup", AT2, 21.8, 24.6, 0.25, 4.0, false, "deck");
    railRoof(roofOf(AT2, 0.25, 0.1), 24.6, null, 1.6);
    tube("metal", -46.0, 0, 24.6, -46.0, 0, 41.0, 0.32, 0.12, 8);
    bx("metal", 2.0, 2.0, 0.12, -46.0, 0, 33.0);
    bar("metal", -46.0, -4.6, 38.8, -46.0, 4.6, 38.8, 0.07);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", -46.0, s * 4.2, 38.8, -46.0, s * 4.2, 40.0, 0.03);
      bar("metal", -46.0, s * 2.2, 24.6, -46.0, s * 0.3, 33.0, 0.07);
    }
    sph("rad", 0.45, 10, 7, -46.0, 0, 41.3);
    /* the boat derrick abaft the tower, its boom raised forward (drawing) */
    tube("metal", -44.0, -4.6, Z01, -44.0, -4.6, 22.0, 0.25, 0.16, 8);
    bar("metal", -44.0, -4.6, 15.0, -37.0, -4.6, 24.5, 0.14);
    bar("metal", -44.0, -4.6, 22.0, -37.0, -4.6, 24.5, 0.03);
    /* the after edge of the tower block: doors and vent louvres */
    for (s = -1; s <= 1; s += 2) {
      bx("dark", 0.9, 0.06, 1.9, -60.0, s * 6.4, ZA2 - 2.9);
      bx("dark", 1.6, 0.06, 0.6, -50.0, s * 6.55, ZA2 - 1.2);
    }

    /* ------------------------------------------------------------ boats --- */
    function boat(xc, yc, zk, L, B) {
      stamp(xc, yc, zk, 0, function () {
        loftX("sup", [[-L, B * 0.82, 0.32, 1.12], [-L + 0.45, B * 0.96, 0.06, 1.15],
                      [-L * 0.3, B, 0.0, 1.15], [L * 0.35, B * 0.93, 0.06, 1.18],
                      [L * 0.72, B * 0.62, 0.25, 1.22], [L * 0.94, B * 0.22, 0.6, 1.25],
                      [L, 0.01, 0.9, 1.25]], 12, 0.55);
        /* the white canvas cover over the boat (1963 photograph) */
        bx("rad", L * 1.3, B * 1.6, 0.5, -L * 0.15, 0, 1.4);
      });
    }
    for (s = -1; s <= 1; s += 2) {
      /* under the box's overhang, in its after corners */
      boat(6.8, s * 8.65, Z01 + 0.35, 3.9, 1.15);
      for (j = -1; j <= 1; j += 2) {
        tube("metal", 6.8 + j * 2.6, s * 7.7, Z01, 6.8 + j * 2.6, s * 7.7, 15.6, 0.12, 0.1, 6);
        bar("metal", 6.8 + j * 2.6, s * 7.7, 15.5, 6.8 + j * 2.6, s * 8.65, 15.8, 0.09);
      }
      /* abreast the aft tower, in davits at the 01 deck edge             */
      boat(-53.6, s * 9.5, 8.0, 3.8, 1.15);
      for (j = -1; j <= 1; j += 2) {
        tube("metal", -53.6 + j * 2.7, s * 7.8, Z01, -53.6 + j * 2.7, s * 7.8, 13.6, 0.13, 0.1, 6);
        bar("metal", -53.6 + j * 2.7, s * 7.8, 13.5, -53.6 + j * 2.7, s * 9.5, 13.7, 0.09);
        bar("metal", -53.6 + j * 2.7, s * 9.5, 13.6, -53.6 + j * 2.7, s * 9.5, 9.6, 0.02);
      }
    }

    /* ----------------------------------------------------- the fore mast -- */
    /* the tall pole on the box with its wide yard, the platform under it,
       the upper yard, the TACAN and the whip (c1961, 1965, 1968)          */
    var FMX = 5.6;
    tube("metal", FMX, 0, ZBT, FMX, 0, 54.0, 0.55, 0.22, 10, true);
    tube("metal", FMX, 0, 56.2, FMX, 0, 62.2, 0.1, 0.04, 6);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", FMX + 2.6, s * 5.2, ZBT, FMX + 0.2, s * 0.3, 44.0, 0.09);
      bar("metal", FMX - 2.6, s * 5.2, ZBT, FMX - 0.2, s * 0.3, 44.0, 0.09);
    }
    bx("metal", 3.0, 3.0, 0.14, FMX, 0, 41.5);
    railRoof([[FMX - 1.45, -1.45], [FMX + 1.45, -1.45], [FMX + 1.45, 1.45], [FMX - 1.45, 1.45]], 41.57, null, 1.4);
    cz("rad", 0.7, 0.7, 1.0, 12, FMX + 0.6, 0, 41.6);
    bar("metal", FMX, -8.6, 45.5, FMX, 8.6, 45.5, 0.11);
    bar("metal", FMX + 0.05, -8.0, 44.8, FMX + 0.05, 8.0, 44.8, 0.03);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", FMX, s * 8.2, 45.5, FMX, s * 8.2, 47.0, 0.04);
      bar("metal", FMX, s * 6.6, 45.5, FMX, s * 6.6, 44.2, 0.035);
      cz("rad", 0.32, 0.32, 0.8, 8, FMX, s * 4.6, 45.6);
      cz("rad", 0.32, 0.32, 0.8, 8, FMX, s * 2.6, 45.6);
      bar("metal", FMX, s * 3.0, 50.5, FMX, s * 3.0, 51.6, 0.03);
      cz("rad", 0.28, 0.28, 0.7, 8, FMX, s * 1.7, 50.6);
    }
    bar("metal", FMX, -3.2, 50.5, FMX, 3.2, 50.5, 0.08);
    cz("metal", 0.65, 0.65, 1.3, 12, FMX, 0, 54.0);
    cz("rad", 0.55, 0.55, 0.9, 10, FMX, 0, 55.3);
    /* the stays down to the box roof's corners */
    for (s = -1; s <= 1; s += 2) {
      bar("metal", FMX, 0, 52.0, BX0 + 0.5, s * (BHW - 0.6), ZB1 + 0.1, 0.025);
      bar("metal", FMX, 0, 52.0, BX1 - 0.5, s * (BHW - 0.6), ZB1 + 0.1, 0.025);
    }

    /* the two AS-466/SR antenna poles at the box roof's forward corners,
       each with its cross-arm (c1961 labels; 1960s bow view)              */
    for (s = -1; s <= 1; s += 2) {
      tube("metal", 18.6, s * 8.6, ZB1, 18.6, s * 8.6, 36.4, 0.09, 0.06, 6);
      bar("metal", 18.6, s * 7.6, 35.2, 18.6, s * 9.4, 35.2, 0.05);
      bar("metal", 18.6, s * 8.6, 35.2, 18.0, s * 8.6, 36.0, 0.03);
    }

    /* ------------------------------------------------------- the 5-inch --- */
    /* the 5-inch/38 Mk 30 single, enclosed: a slab-sided house with a raked
       front and a rounded back on its base ring, the barrel out of the
       front port. Built about its ring centre, barrel along +X            */
    function gun5() {
      cz("sup", 1.55, 1.65, 0.3, 20, 0, 0, 0);
      loftX("sup", [[-2.2, 1.35, 0.3, 2.35], [-1.9, 1.55, 0.3, 2.55], [-0.6, 1.6, 0.3, 2.62],
                    [0.9, 1.58, 0.3, 2.55], [1.7, 1.45, 0.3, 2.1], [2.15, 1.3, 0.3, 1.25]], 14, 0.25);
      cx("dark", 0.36, 0.2, 0.5, 10, 1.85, 0, 1.25);
      cx("metal", 0.14, 0.11, 4.4, 10, 2.15, 0, 1.25);
      bx("sup", 0.8, 0.9, 0.1, -1.0, 0.4, 2.62);
      bx("dark", 0.06, 0.7, 1.2, -2.21, 0, 1.15);
    }
    var XG = -22.0, YG = 4.3;
    var tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(XG, YG, Z01);
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun5(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    /* the starboard mount, baked, trained fore and aft as at rest */
    stamp(XG, -YG, Z01, 0, gun5);

    /* --------------------------------------------------------- ASROC ------ */
    /* the Mk 16 eight-cell launcher on the 01 deck abaft the box: two
       boxes of four on a trainable stand, laid level, pointing forward     */
    var XA = -9.5;
    stamp(XA, 0, Z01, 0, function () {
      cz("sup", 1.6, 1.75, 0.3, 18, 0, 0, -0.02);
      cz("sup", 1.0, 1.15, 0.9, 14, 0, 0, 0.28);
      bx("sup", 1.8, 3.3, 0.8, -0.2, 0, 1.5);
      for (var q = -1; q <= 1; q += 2) {
        bx("sup", 5.4, 1.5, 1.7, 0.4, q * 0.88, 3.2);
        for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2)
          bx("dark", 0.06, 0.6, 0.66, 3.11, q * 0.88 + a * 0.36, 2.4 + b * 0.4);
        bx("dark", 5.2, 0.05, 0.04, 0.4, q * 0.88 + q * 0.76, 3.2);
      }
    });
    /* the kingpost and boat boom between the ASROC and the guns (drawing) */
    tube("metal", -15.5, 0, Z01, -15.5, 0, 26.0, 0.26, 0.12, 8);
    bar("metal", -15.5, 0, 11.6, -18.6, 2.4, 15.8, 0.12);
    bar("metal", -15.5, 0, 25.0, -18.6, 2.4, 15.8, 0.025);

    /* ------------------------------------------------------ launchers ---- */
    /* a missile lying under its rail: body, nose, the booster and its fins */
    function missile(len, r, rb, fins, xb, z) {
      var lb = len * 0.42;
      cx("rad", rb, rb, lb, 10, xb, 0, z);
      cx("rad", r, r, len - lb - 1.2, 10, xb + lb, 0, z);
      cx("rad", r, 0.03, 1.2, 10, xb + len - 1.2, 0, z);
      for (var f = 0; f < 4; f++) {
        var an = f * PI / 2 + PI / 4;
        bx("rad", 0.9, 0.04, fins, xb + 0.5, Math.cos(an) * (rb + fins * 0.5), z + Math.sin(an) * (rb + fins * 0.5),
           an - PI / 2, 0, 0);
      }
    }
    /* the Mk 10 Terrier twin: a big round stand, the trunnion carriage, two
       guide arms elevated forward, a Terrier hung under each arm           */
    function mk10(xc, zc, el) {
      stamp(xc, 0, zc, 0, function () {
        cz("dark", 2.6, 2.6, 0.06, 22, 0, 0, 0);
        cz("sup", 2.15, 2.35, 0.9, 20, 0, 0, 0.02);
        cz("sup", 1.7, 1.85, 0.8, 18, 0, 0, 0.92);
        bx("sup", 2.4, 2.6, 1.3, -0.3, 0, 2.3);
        for (var q = -1; q <= 1; q += 2) {
          bx("sup", 1.0, 0.45, 2.1, -0.1, q * 1.55, 2.7);
          /* the arm and its missile, rotated up about the trunnion */
          var g = new THREE.BoxGeometry(6.4, 0.42, 0.5);
          g.translate(1.6, 0, 0.0); g.rotateY(-el); g.translate(-0.2, q * 1.55, 3.4);
          cur.sup.add(g);
          var Bm = new Batch(), keep = cur.rad, xf = Batch.xf;
          cur.rad = Bm; Batch.xf = null;
          missile(8.0, 0.18, 0.24, 0.5, -2.6, -0.6);
          cur.rad = keep; Batch.xf = xf;
          var P = Bm.p, ce = Math.cos(el), se = Math.sin(el), k;
          for (k = 0; k < P.length; k += 9) {
            var vv = [];
            for (var m = 0; m < 3; m++) {
              var x = P[k + m * 3], y = P[k + m * 3 + 1], z = P[k + m * 3 + 2];
              vv.push([x * ce - z * se - 0.2, y + q * 1.55, x * se + z * ce + 3.4, 0, 0]);
            }
            cur.rad.tri(vv[0], vv[1], vv[2]);
          }
        }
      });
    }
    mk10(77.8, topZ(77.8, 0) - 0.02, 0.46);
    mk10(52.0, Z01, 0.46);
    /* the loading doors on deck abaft each launcher */
    for (s = -1; s <= 1; s += 2) {
      bx("dark", 1.6, 1.0, 0.06, 74.0, s * 1.55, topZ(74.0, 1.5) + 0.02);
      bx("dark", 1.6, 1.0, 0.06, 48.2, s * 1.55, Z01 + 0.03);
    }
    /* the Mk 12 Talos twin on the quarterdeck, elevated aft, a Talos hung
       under each arm (drawing; 1967 colour)                                */
    function mk12(xc, zc, el) {
      stamp(xc, 0, zc, PI, function () {
        cz("dark", 3.0, 3.0, 0.06, 24, 0, 0, 0);
        cz("sup", 2.5, 2.7, 1.1, 22, 0, 0, 0.02);
        cz("sup", 2.0, 2.15, 0.9, 20, 0, 0, 1.12);
        bx("sup", 2.9, 3.4, 1.6, -0.4, 0, 2.8);
        for (var q = -1; q <= 1; q += 2) {
          bx("sup", 1.2, 0.55, 2.5, -0.2, q * 2.0, 3.3);
          var g = new THREE.BoxGeometry(7.6, 0.5, 0.6);
          g.translate(2.0, 0, 0.0); g.rotateY(-el); g.translate(-0.2, q * 2.0, 4.2);
          cur.sup.add(g);
          var Bm = new Batch(), keep = cur.rad, xf = Batch.xf;
          cur.rad = Bm; Batch.xf = null;
          missile(9.4, 0.36, 0.38, 0.75, -3.4, -0.9);
          cur.rad = keep; Batch.xf = xf;
          var P = Bm.p, ce = Math.cos(el), se = Math.sin(el), k;
          for (k = 0; k < P.length; k += 9) {
            var vv = [];
            for (var m = 0; m < 3; m++) {
              var x = P[k + m * 3], y = P[k + m * 3 + 1], z = P[k + m * 3 + 2];
              vv.push([x * ce - z * se - 0.2, y + q * 2.0, x * se + z * ce + 4.2, 0, 0]);
            }
            cur.rad.tri(vv[0], vv[1], vv[2]);
          }
        }
      });
    }
    mk12(-75.6, topZ(-75.6, 0) - 0.02, 0.32);

    /* ---------------------------------------------- the helicopter square */
    var PX0 = -100.7, PX1 = -85.4, PY = 7.6;
    flat("pad", PX0, -PY, PX1, PY, topZ(-93.0, 0) + 0.02, 0, 0, 1, 1);
    var rg = new THREE.RingGeometry(4.2, 4.75, 40);
    cur.team.add(place(THREE, rg, (PX0 + PX1) * 0.5, 0, topZ(-93.0, 0) + 0.06));

    /* ------------------------------------------------- weather deck gear -- */
    /* lifelines along the deck edge from abreast the Talos to the bulwark.
       None on the fantail: render3d.js takes the level a deck machine
       stands at from the commonest height of the aft eighth's plan        */
    for (s = -1; s <= 1; s += 2) {
      var ep = [], ex = -82.0;
      while (ex < 89.0) {
        ep.push([ex, s * (hullHW(ex) - 0.15), deckZ(ex) + 0.08]);
        ex += (ex > -60 && ex < 60) ? 8.0 : 4.0;
      }
      ep.push([89.0, s * (hullHW(89.0) - 0.15), deckZ(89.0) + 0.08]);
      railRun("metal", ep, 1.0, 3.6);
    }
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      bx("sup", 1.5, 0.6, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.2, 0.22, 0.6, 8, x - 0.45, y, z0);
      cz("metal", 0.2, 0.22, 0.6, 8, x + 0.45, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(80.5, s * 5.6); bitts(40.0, s * 9.0); bitts(-30.0, s * 10.3); bitts(-70.0, s * 9.4);
      bitts(-104.0, s * 6.9);
    }
    /* whips: two on the forward house, two on the fantail edge (drawing,
       1967 photograph)                                                    */
    for (s = -1; s <= 1; s += 2) {
      bar("metal", 54.0, s * 7.0, Z01, 54.0, s * 7.1, 21.8, 0.05);
      bar("metal", 66.1, s * 6.5, Z01, 66.1, s * 6.6, 21.8, 0.05);
      bar("metal", -80.0, s * 9.5, deckZ(-80.0), -80.0, s * 9.6, 19.0, 0.05);
    }

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e60_cruiser"] = {
  len: 219.83,
  build: function (THREE, M, C) { return HeroLongBeachCGN9.build(THREE, M, C); }
};
