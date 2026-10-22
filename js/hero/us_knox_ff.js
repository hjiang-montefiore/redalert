/* ============================================================================
   us_knox_ff.js -- HERO model: USS Knox (FF-1052), the lead ship of the
   Knox class, as she was in the later 1970s -- the period the row draws her
   in (e60, "1960s-70s") under the hull number it names (DE-1052 became
   FF-1052 on 30 June 1975), with the Seasprite the game puts on her deck.

   The fit, each later addition dated before it was drawn:
     - the enlarged LAMPS I hangar and flight deck: DASH was withdrawn in
       1973 and the class's helicopter facilities were then enlarged for the
       SH-2 (Wikipedia, class and ship articles); SH-2s are photographed on
       Bagley (c1973) and Connole (c1974); Knox herself shows the hangar of
       the 1974 drawing in her 9 December 1981 photographs. Her own yard
       date is not confirmed.
     - the Mk 25 BPDMS (Sea Sparrow) box on the fantail: DE-1052 is in the
       list of the 31 ships fitted (Wikipedia, "early 1970s"); it is on the
       1974 USN drawing and on Whipple on 1 October 1974, and Knox carries it
       in 1981. Her own installation date is not confirmed.
     - Harpoon from the ASROC launcher: fired from two of the eight cells,
       nothing to draw.
     - NOT drawn: the Phalanx (1980s, in place of the BPDMS; the 1990 USN
       drawing) and the raised "hurricane bow" (from Bagley in 1979; Knox's
       1981 photographs still show the plain sheer).

   References: the USN class drawing of 1974 (profile, measured at 0.1442 m
   a pixel, stern at px 34, stem head px 960, waterline py 264) and the
   1990 drawing; USS Knox underway in 1969 (port bow, high), off the
   cruiser Chicago in March 1971 (bow), off Luzon on 9 December 1981 (port
   beam, colour) and in the Makassar Strait in 1985 (high); USS Whipple
   (DE-1062) off Hawaii, 1 October 1974 (port bow, high); USS Lang
   (FF-1060) off Subic Bay, 14 July 1975 (bow on, a little to starboard);
   USS Meyerkord (DE-1058)
   20 October 1972 (port bow); USS Bagley (DE-1069) c1974 (vertical, the
   plan) and her SH-2F on deck c1973; the SH-2D on Connole c1974; Badger
   1978; two macks at Norfolk (the mast detail). Published: 438 ft
   (133.5 m) overall, 46 ft 9 in (14.25 m) beam, 15 ft (4.6 m) hull draught,
   24 ft 9 in (7.5 m) to the sonar dome.

   RECOGNITION (each with the reference it rests on):
     1. a long flush hull with a strong sheer and a high, flared, plain
        forecastle, the stem raked and the anchor in the stem (1974 drawing,
        Whipple 1974, Meyerkord 1972, Knox 1981);
     2. the big SQS-26 bow dome under the forefoot (1974 drawing);
     3. the single 5-inch/54 Mk 42 forward, its big square gunhouse (all);
     4. the ASROC Mk 16 box on its pedestal ahead of the bridge (all);
     5. slab hull sides running straight up to the 01 level from the bridge
        to the hangar (Knox 1981, Bagley overhead);
     6. the bridge block with its window band and the Mk 68 director and
        SPG-53 dish on its roof (Lang 1975, Knox 1981, two macks);
     7. the cylindrical "mack" amidships, the uptake drum flaring out over
        the band, the platform on it and everything above black: the
        lattice with the SPS-40 on its pedestal forward, the ECM domes, the
        SPS-10 and the pole topmast (two macks, Whipple 1974, Lang 1975,
        Knox 1981, 1974 drawing);
     8. the boats in gravity davits either side of the waist over the open
        bay (Knox 1981, Whipple 1974, the drawing px 368-438), the twin
        Mk 32 tubes in it (two twin mounts, Wikipedia; their place under
        the boats is read off the dark machinery in that bay on the photos,
        not off a plan);
     9. the hangar aft of the boats, its telescoping section run in, its
        after face at s 33.2 (1974 drawing px 264, Bagley's vertical 33.4);
    10. the raised flight deck over the quarterdeck, open gallery under its
        edges, the landing circle crossed by the X (Bagley overhead and deck
        photographs, Knox 1981);
    11. the Mk 25 BPDMS box on its pedestal at the stern (1974 drawing,
        Whipple 1974, Knox 1981);
    12. the single big rudder and propeller under the counter (drawings).

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0. The plan
   is set out in metres from the stern, s, and X(s) = s - 66.75. Heights are
   read off the 1974 drawing. render3d.js scales the model by its X extent:
   nothing stands past the stem head or the transom.

   Paint: US haze grey. Sampled off Knox's 9 December 1981 colour photo:
   sunlit hull side (158,162,152), the flush 01-level side (151,154,145) --
   the same paint. Set with the accepted US level: the deckhouses 0x737a81
   and the hull 0.94 of it; decks dark non-skid; the mack top, the lattice
   and the masts black above the stack as photographed. No hull numbers,
   names or flags.

   Materials (10): hull, weather deck, deckhouse plate, the shaded
   bulkheads of the gallery and boat bay, flight deck, white, dark, bare
   metal, glass and the team material (exactly C.team: the
   landing circle and a stripe across the forecastle). Every static part is
   merged into one mesh per material; the 5-inch is the one mount named
   "turret", its origin on the ring centre, the barrel along +X. The flight
   deck is marked for render3d's deckOf by a hidden "helipad" node: her
   after eighth is the quarterdeck with the Sea Sparrow box on it, 2.3 m
   below the pad. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKnoxFF = (function () {
  "use strict";

  var PI = Math.PI, HALF = 66.75, KP = 0.1442;
  /* s = metres forward of the stern; the drawing's own pixels via PX/PY  */
  function X(s) { return s - HALF; }
  function PX(px) { return (px - 34) * KP; }            /* -> s            */
  function PY(py) { return (264 - py) * KP; }           /* -> z            */
  var LOA = 133.5, XSTEM = X(LOA), XA = X(0);
  var ZTOP = 8.0, ZBOT = -1.5;                          /* hull canvas span */

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

  /* ------------------------------------------------------------ the lines
     The main deck edge off the 1974 profile (py of the sheer line at each
     px): 5.5 m at the transom, 4.5 m amidships, 7.5 m at the stem head.  */
  var SHEER = [[0, 5.45], [2.3, 5.2], [9.5, 5.05], [16.7, 4.9], [31, 4.76],
               [36, 4.62], [58, 4.5], [80, 4.62], [88, 4.95], [93, 5.3],
               [98.9, 5.6], [103.2, 5.77], [107.5, 5.92], [110.4, 6.12],
               [113.3, 6.27], [117.7, 6.48], [122, 6.66], [124.8, 6.78],
               [127.7, 6.95], [130.6, 7.2], [132.8, 7.38], [133.5, 7.5]];
  function deckZ(x) { return tbl(SHEER, x + HALF); }
  /* deck half breadth: 14.25 m beam; the entry off Bagley's vertical    */
  var HB = [[0, 6.35], [7, 6.62], [14, 6.88], [22, 7.03], [30, 7.12],
            [85, 7.12], [92, 7.03], [99, 6.8], [105, 6.45], [111, 5.95],
            [116, 5.35], [120, 4.65], [123.5, 3.85], [126.5, 2.95],
            [129, 2.0], [131, 1.2], [132.5, 0.55], [133.5, 0.12]];
  function halfB(x) { return tbl(HB, x + HALF); }
  /* 0 = the full midship section, 1 = the fine flared entry              */
  var VB = [[0, 0.1], [12, 0.08], [40, 0.02], [50, 0.0], [88, 0.0],
            [97, 0.06], [104, 0.14], [110, 0.25], [115, 0.38], [119, 0.52],
            [122.5, 0.66], [125.5, 0.78], [128, 0.86], [130, 0.92],
            [132, 0.97], [133.5, 1.0]];
  /* stations, bow to stern: [s at the deck edge, rake of the low points
     aft (m), keel height (m)]. The stem is the first, straight from the
     head to the waterline at s 128.2 and on into the forefoot; the keel
     runs level at -4.6 and rises from s 45.6 to the transom, which rakes
     forward from the deck to the waterline (the 1974 profile).          */
  var ST = [[133.5, 6.0, -1.0], [132, 5.4, -2.0], [130, 4.4, -3.0],
            [128, 3.3, -3.7], [125.5, 2.2, -4.2], [122.5, 1.1, -4.5],
            [119, 0.35, -4.6], [115, 0, -4.6], [110, 0, -4.6], [104, 0, -4.6],
            [97, 0, -4.6], [88, 0, -4.6], [75, 0, -4.6], [62, 0, -4.6],
            [50, 0, -4.6], [45.6, 0, -4.6], [40, 0, -3.97], [34, 0, -3.3],
            [28, 0, -2.64], [22, 0, -1.97], [16, 0, -1.3], [10, 0, -0.66],
            [5, -0.7, -0.45], [0, -1.5, -0.3]];

  var SEC_FULL = [[1.000, 1.000], [1.000, 0.800], [0.998, 0.620], [0.990, 0.470],
                  [0.972, 0.350], [0.935, 0.250], [0.868, 0.168], [0.760, 0.100],
                  [0.600, 0.050], [0.410, 0.018], [0.205, 0.004], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.920, 0.800], [0.810, 0.620], [0.690, 0.470],
                  [0.580, 0.350], [0.475, 0.250], [0.375, 0.168], [0.280, 0.100],
                  [0.190, 0.050], [0.110, 0.018], [0.048, 0.004], [0.000, 0.000]];
  function ringOf(b) {
    var i, r = [];
    function pt(i) {
      return [SEC_FULL[i][0] + (SEC_FINE[i][0] - SEC_FULL[i][0]) * b,
              SEC_FULL[i][1] + (SEC_FINE[i][1] - SEC_FULL[i][1]) * b];
    }
    r.push(pt(0));
    r.push([0.5, 1.0]); r.push([0, 1.0]); r.push([-0.5, 1.0]);
    for (i = 0; i < SEC_FULL.length; i++) { var p = pt(i); r.push([-p[0], p[1]]); }
    for (i = SEC_FULL.length - 2; i >= 1; i--) r.push(pt(i));
    return r;
  }

  /* ---------------------------------------------- the plan, s from stern */
  var S_FD0 = 13.3;            /* flight deck after edge (px 126)          */
  var S_HG = 33.2;             /* hangar after face, the telescoping part
                                  run in (px 264; Bagley's vertical 33.4)  */
  var S_HG0 = 35.9;            /* the step up to the fixed block (px 283)  */
  var S_HG1 = 44.1;            /* hangar forward end (px 340)              */
  var S_BB0 = 48.2, S_BB1 = 58.3;   /* the boat bay (px 368-438)          */
  var S_MH1 = 73.7;            /* the mack house's forward end (px 545)    */
  var S_BR = 92.4;             /* the bridge face (px 675)                 */
  var S_01F = 93.6;            /* the 01 level's forward face (px 683)     */
  var Z01 = 7.5;               /* the 01 level and the flight deck         */

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

  /* ================================================================ textures */
  var _tx = null;
  function textures(THREE) {
    if (_tx) return _tx;
    _tx = { hull: hullTex(THREE), sup: supTex(THREE), deck: deckTex(THREE), pad: padTex(THREE) };
    return _tx;
  }

  /* the hull canvas: u runs along her length, v is real height; it also
     covers the flush 01-level sides, which are the same plating           */
  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(10521), i, j, x, z;
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx - XA) / LOA * W; }
    g.fillStyle = "#6c737a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.016 + R() * 0.026;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 200, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling under the black boot topping                          */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.35), W, H - Y(-0.35));
    g.fillStyle = "#17191b"; g.fillRect(0, Y(0.65), W, Y(-0.35) - Y(0.65));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.65) - 1, W, 1.5);
    /* strake seams, the butts staggered                                   */
    var STR = [1.6, 2.9, 4.2, 5.6, 6.7];
    g.lineWidth = 1.2;
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.26)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(0, Y(STR[i]) + 1.4); g.lineTo(W, Y(STR[i]) + 1.4); g.stroke();
    }
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.12)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 22; j++) {
        x = ((j + st) / 22) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }
    /* the main deck edge where it shows (forecastle, waist, quarterdeck):
       a shadow under the gunwale                                          */
    g.globalAlpha = 0.24; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = XA + (i / W) * LOA; var s = x + HALF;
      if ((s > 30.5 && s < S_BB0) || (s > S_BB1 && s < S_01F)) continue;
      g.fillRect(i, Y(deckZ(x)) - 1, 4, 5);
    }
    /* scuppers along the deck edge, some weeping rust                    */
    for (i = 0; i < 46; i++) {
      x = XA + 3 + (i / 45) * (LOA - 8);
      z = deckZ(x) - 0.55;
      g.globalAlpha = 0.30; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 3, Y(z) - 2, 6, 4);
      if (R() < 0.5) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 2, 4, (0.8 + R() * 2.0) * (H / (ZTOP - ZBOT)));
    }
    /* the scuttles of the flush side, two rows under the 01 level        */
    g.globalAlpha = 0.55; g.fillStyle = "#1b1f22";
    [[60, 6.4], [63, 6.4], [77, 6.4], [80, 6.4], [36, 6.3], [40, 6.3],
     [60, 5.6], [77, 5.6], [86, 6.4]].forEach(function (p) {
      g.beginPath(); g.ellipse(U(X(p[0])), Y(p[1]), 3, 4, 0, 0, 2 * PI); g.fill();
    });
    /* exhaust staining down aft of the mack                              */
    for (j = 0; j < 120; j++) {
      var fr = R();
      x = X(64) - fr * 22;
      z = 6.8 - R() * 2.0;
      g.globalAlpha = 0.03 * (1 - fr) + 0.006; g.fillStyle = "#2a2d30";
      g.fillRect(U(x), Y(z), 8 + R() * 28, 4 + R() * 10);
    }
    g.globalAlpha = 1;
    /* draught marks at bow and stern                                     */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? X(127.2) : XA + 2.2;
      for (j = 0; j <= 8; j++) g.fillRect(U(x) - 5, Y(-0.3 + j * 0.5), j % 2 ? 6 : 10, 2);
    }
    return tex(THREE, cv, false);
  }

  /* deckhouse plating, 4 m a tile. Haze grey 0x737a81                   */
  function supTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(31338), i;
    g.fillStyle = "#737a81"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 18; i++) {
      g.globalAlpha = 0.016 + R() * 0.024;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 100, 30 + R() * 70);
    }
    g.globalAlpha = 1; g.lineWidth = 1.2;
    for (i = 1; i < 4; i++) {
      g.strokeStyle = "rgba(0,0,0,0.22)";
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(0, i * H / 4 + 1.5); g.lineTo(W, i * H / 4 + 1.5); g.stroke();
    }
    g.fillStyle = "#6d4526";
    for (i = 0; i < 16; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillRect(R() * W, R() * H, 2 + R() * 3, 10 + R() * 36);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* weather deck: dark non-skid with plate joints, 5.5 m a tile          */
  function deckTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(8812), i;
    g.fillStyle = "#4a5055"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 16; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 90, 20 + R() * 60);
    }
    g.globalAlpha = 0.24; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 4; i++) {
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
    }
    g.globalAlpha = 0.28; g.fillStyle = "#000000";
    for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* the flight deck, u from the hangar face (0) to the after edge (1), v
     across from starboard (0) to port (1). Bagley's vertical and her
     SH-2F on deck: the white deck-edge outline, the landing circle, an X
     from corner to corner of the outline through it, and the lineup line */
  var PAD_W = 13.0;                       /* the pad's full width, m       */
  function padTex(THREE) {
    var W = 1024, H = 768, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(4052), i, j;
    var LEN = S_HG - S_FD0;
    function U(m) { return m / LEN * W; }                 /* m aft of the hangar */
    function V(m) { return H * 0.5 - m / PAD_W * H; }     /* m to port           */
    g.fillStyle = "#43484d"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#33383c" : "#53595e";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 2600; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.55; g.fillStyle = "#1c1f22";
    for (i = 1; i < 10; i++) for (j = 1; j < 8; j++) g.fillRect(W * i / 10 - 3, H * j / 8 - 3, 6, 6);
    g.globalAlpha = 1;
    g.strokeStyle = "#d8dbd4"; g.fillStyle = "#d8dbd4";
    var a0 = 0.8, a1 = LEN - 0.8, hw = 6.05;
    g.lineWidth = 6;
    g.strokeRect(U(a0), V(hw), U(a1) - U(a0), V(-hw) - V(hw));
    /* the X, corner to corner                                            */
    g.lineWidth = 6;
    g.beginPath(); g.moveTo(U(a0), V(hw)); g.lineTo(U(a1), V(-hw)); g.stroke();
    g.beginPath(); g.moveTo(U(a0), V(-hw)); g.lineTo(U(a1), V(hw)); g.stroke();
    /* the lineup line from the hangar door to the after edge             */
    g.fillRect(U(0), V(0.18), U(a1) - U(0), V(-0.18) - V(0.18));
    /* the landing circle, white, its team-coloured ring laid on top      */
    var CX = (a0 + a1) * 0.5;
    g.lineWidth = 7; g.beginPath();
    g.ellipse(U(CX), V(0), U(CX + 3.6) - U(CX), (V(-3.6) - V(3.6)) * 0.5, 0, 0, 2 * PI);
    g.stroke();
    return tex(THREE, cv, false);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var T = textures(THREE), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.pad   = S({ map: T.pad, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.rad   = S({ color: 0xc9ccc6, roughness: 0.90, metalness: 0.03 });
    M.dark  = S({ color: 0x24282c, roughness: 0.90, metalness: 0.05 });
    /* the bulkheads deep in the gallery and the boat bay: grey paint that
       is always in shadow (the dark band of the 1981 port beam)           */
    M.shade = S({ color: 0x3f454b, roughness: 0.92, metalness: 0.04 });
    M.metal = S({ color: 0x80878d, roughness: 0.55, metalness: 0.50 });
    M.team  = S({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
    M.glass = S({ color: 0x2b3a44, roughness: 0.12, metalness: 0.25,
                  transparent: true, opacity: 0.86 });
    return M;
  }

  /* ================================================================ batching
     Parts are plain triangles appended to one Batch per material. A stamp
     (position and yaw) moves everything built while it is set.           */
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
  function bboxOf(poly) {
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, i;
    for (i = 0; i < poly.length; i++) {
      x0 = Math.min(x0, poly[i][0]); x1 = Math.max(x1, poly[i][0]);
      y0 = Math.min(y0, poly[i][1]); y1 = Math.max(y1, poly[i][1]);
    }
    return { cx: (x0 + x1) * 0.5, cy: (y0 + y1) * 0.5, w: x1 - x0, h: y1 - y0 };
  }
  function rounded(a, b, p, n, dx) {
    var out = [], k;
    for (k = 0; k < n; k++) {
      var an = 2 * PI * k / n, c = Math.cos(an), s = Math.sin(an);
      out.push([(dx || 0) + a * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p)]);
    }
    return out;
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }
  /* a plan box in s (metres from the stern) and half width              */
  function sBox(s0, s1, hw) { return [[X(s1), -hw], [X(s1), hw], [X(s0), hw], [X(s0), -hw]].reverse(); }

  /* ================================================================ the hull */
  function hullGeo(THREE) {
    var pos = [], uv = [], idx = [], i, j, R = 0;
    for (i = 0; i < ST.length; i++) {
      var s = ST[i][0], x0 = X(s), r = ringOf(tbl(VB, s));
      var w = halfB(x0), kz = ST[i][2], dz = deckZ(x0), dep = dz - kz;
      var rk = ST[i][1];
      for (j = 0; j < r.length; j++) {
        var z = kz + dep * r[j][1];
        var xx = x0 - rk * (1.0 - r[j][1]);
        pos.push(xx, w * r[j][0], z);
        uv.push((xx - XA) / LOA, (z - ZBOT) / (ZTOP - ZBOT));
      }
      R = r.length;
    }
    for (i = 0; i < ST.length - 1; i++) {
      for (j = 0; j < R; j++) {
        var a = i * R + j, b = i * R + (j + 1) % R, c = a + R, d = b + R;
        idx.push(a, d, b, a, c, d);
      }
    }
    function cap(sIdx, flip) {
      var base = sIdx * R, k, cx = 0, cy = 0, cz = 0;
      for (k = 0; k < R; k++) {
        cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2];
      }
      cx /= R; cy /= R; cz /= R;
      var ci = pos.length / 3;
      pos.push(cx, cy, cz); uv.push((cx - XA) / LOA, (cz - ZBOT) / (ZTOP - ZBOT));
      for (k = 0; k < R; k++) {
        var p = base + k, q = base + (k + 1) % R;
        if (flip) idx.push(ci, q, p); else idx.push(ci, p, q);
      }
    }
    cap(ST.length - 1, true); cap(0, false);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return g;
  }

  /* =============================================================== assembly */
  function build(THREE, MOD, C) {
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var M = makeMats(THREE, team);
    var G = new THREE.Group();
    var KEYS = ["hull", "deck", "sup", "shade", "pad", "rad", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, j, s;

    function bx(k, lx, ly, lz, x, y, z, rx, ry, rz) {
      cur[k].add(place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz));
    }
    function cz(k, rt, rb, h, seg, x, y, z0) {
      var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
      g.rotateX(PI / 2);
      cur[k].add(place(THREE, g, x, y, z0 + h * 0.5));
    }
    function cx(k, r0, r1, L, seg, x0, y, z) {
      var g = new THREE.CylinderGeometry(r1, r0, L, seg, 1, false);
      g.rotateZ(-PI / 2);
      cur[k].add(place(THREE, g, x0 + L * 0.5, y, z));
    }
    function sph(k, r, ws, hs, x, y, z) {
      cur[k].add(place(THREE, new THREE.SphereGeometry(r, ws, hs), x, y, z));
    }
    function tube(k, ax, ay, az, bx2, by, bz, r0, r1, seg) {
      if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      var g = new THREE.CylinderGeometry(r1, r0, L, seg || 6, 1, false);
      _v1.set(dx, dy, dz).normalize();
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_v0, _v1));
      g.translate((ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
      cur[k].add(g);
    }
    /* a thin three-sided bar: rails, struts, braces                       */
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
    /* a faceted block: plan polygon (convex) from z0 to a roof at zt (a
       number or a function of x), the top inset `ins` so the walls lean   */
    function prism(k, poly, z0, zt, ins, US, noCap) {
      var bb = bboxOf(poly), n = poly.length, B = cur[k], q, per = 0;
      var sx = (bb.w - 2 * (ins || 0)) / bb.w, sy = (bb.h - 2 * (ins || 0)) / bb.h;
      var ZT = typeof zt === "function" ? zt : function () { return zt; };
      var Cc = [bb.cx, bb.cy, (z0 + ZT(bb.cx)) * 0.5];
      US = US || 4.0;
      function top(p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; }
      for (q = 0; q < n; q++) {
        var a = poly[q], b = poly[(q + 1) % n], at = top(a), bt = top(b);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var za = ZT(at[0]), zb = ZT(bt[0]);
        var u0 = per / US, u1 = (per + L) / US;
        per += L;
        var A0 = [a[0], a[1], z0, u0, z0 / US], B0 = [b[0], b[1], z0, u1, z0 / US];
        var B1 = [bt[0], bt[1], zb, u1, zb / US], A1 = [at[0], at[1], za, u0, za / US];
        B.triOut(A0, B0, B1, Cc); B.triOut(A0, B1, A1, Cc);
      }
      if (!noCap) {
        var zc = ZT(bb.cx), Cd = [bb.cx, bb.cy, zc - 50];
        for (q = 0; q < n; q++) {
          var p = top(poly[q]), r = top(poly[(q + 1) % n]);
          B.triOut([bb.cx, bb.cy, zc, bb.cx / US, bb.cy / US], [p[0], p[1], ZT(p[0]), p[0] / US, p[1] / US],
                   [r[0], r[1], ZT(r[0]), r[0] / US, r[1] / US], Cd);
        }
      }
    }
    /* a frame on a vertical surface whose outward normal is (nx, ny)      */
    function frameN(x, y, z, nx, ny) {
      var l = Math.sqrt(nx * nx + ny * ny); nx /= l; ny /= l;
      return { o: [x, y, z], t: [-ny, nx, 0], w: [0, 0, 1], n: [nx, ny, 0] };
    }
    function fp(F, s1, r1, d) {
      return [F.o[0] + F.t[0] * s1 + F.w[0] * r1 + F.n[0] * d,
              F.o[1] + F.t[1] * s1 + F.w[1] * r1 + F.n[1] * d,
              F.o[2] + F.t[2] * s1 + F.w[2] * r1 + F.n[2] * d];
    }
    /* a plate on a frame: convex outline (along, up), d0..d1 off the wall  */
    function plate(k, F, pts, d0, d1) {
      var B = cur[k], n = pts.length, q;
      function P(p, d) { var w = fp(F, p[0], p[1], d); return [w[0], w[1], w[2], p[0] * 0.25, p[1] * 0.25]; }
      for (q = 1; q < n - 1; q++) B.tri(P(pts[0], d1), P(pts[q], d1), P(pts[q + 1], d1));
      for (q = 0; q < n; q++) {
        var a = pts[q], b = pts[(q + 1) % n];
        B.tri(P(a, d0), P(b, d0), P(b, d1)); B.tri(P(a, d0), P(b, d1), P(a, d1));
      }
    }
    /* a loft along x of rounded sections [x, half width, bottom, top]     */
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
    function flat(k, x0, y0, x1, y1, z, u0, v0, u1, v1) {
      cur[k].tri([x0, y0, z, u0, v0], [x1, y0, z, u1, v0], [x1, y1, z, u1, v1]);
      cur[k].tri([x0, y0, z, u0, v0], [x1, y1, z, u1, v1], [x0, y1, z, u0, v1]);
    }
    function stamp(x, y, z, yaw, fn) {
      Batch.xf = { x: x, y: y, z: z, c: Math.cos(yaw), s: Math.sin(yaw) };
      fn();
      Batch.xf = null;
    }
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
    function railBox(x0, x1, w, z) {
      railRun("metal", [[x0, -w, z], [x1, -w, z], [x1, w, z], [x0, w, z], [x0, -w, z]], 1.0, 1.4);
    }
    /* a four-legged tapered tower with X bracing on every face            */
    function tower(k, x0, x1, y0, tx0, tx1, ty0, z0, z1, lv, rl, rb) {
      function c(u, sx, sy) {
        var xb = sx < 0 ? x0 : x1, xt = sx < 0 ? tx0 : tx1;
        return [xb + (xt - xb) * u, sy * (y0 + (ty0 - y0) * u), z0 + (z1 - z0) * u];
      }
      var CR = [[-1, -1], [1, -1], [1, 1], [-1, 1]], q, e;
      for (q = 0; q < 4; q++) {
        var a = c(0, CR[q][0], CR[q][1]), b = c(1, CR[q][0], CR[q][1]);
        tube(k, a[0], a[1], a[2], b[0], b[1], b[2], rl, rl * 0.8, 6);
      }
      for (e = 1; e < lv.length; e++) {
        for (q = 0; q < 4; q++) {
          var p0 = c(lv[e], CR[q][0], CR[q][1]), p1 = c(lv[e], CR[(q + 1) % 4][0], CR[(q + 1) % 4][1]);
          var d0 = c(lv[e - 1], CR[q][0], CR[q][1]), d1 = c(lv[e - 1], CR[(q + 1) % 4][0], CR[(q + 1) % 4][1]);
          bar(k, p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], rb * 1.2);
          bar(k, d0[0], d0[1], d0[2], p1[0], p1[1], p1[2], rb);
          bar(k, d1[0], d1[1], d1[2], p0[0], p0[1], p0[2], rb);
        }
      }
    }
    /* a vertical wall in the hull batch, so the flush 01-level sides carry
       the same canvas as the hull plating below them                       */
    function hwall(xa, ya, za0, za1, xb, yb, zb0, zb1, Cc) {
      function V(x, y, z) { return [x, y, z, (x - XA) / LOA, (z - ZBOT) / (ZTOP - ZBOT)]; }
      var A0 = V(xa, ya, za0), B0 = V(xb, yb, zb0), B1 = V(xb, yb, zb1), A1 = V(xa, ya, za1);
      cur.hull.triOut(A0, B0, B1, Cc); cur.hull.triOut(A0, B1, A1, Cc);
    }
    function topZ(x) { return deckZ(x) + 0.05; }

    /* ----------------------------------------------------------- hull ---- */
    cur.hull.add(hullGeo(THREE));

    /* the weather deck at the sheer, flat across, stem to transom (the
       houses stand on it)                                                 */
    (function () {
      var FR = [133.2, 132, 130, 128, 125.5, 122.5, 119, 115, 110, 104, 97, 92,
                88, 80, 70, 58, 50, 45, 36, 28, 20, 12, 6, 0.2], KY = [-1, -0.5, 0, 0.5, 1];
      for (i = 0; i < FR.length - 1; i++) {
        var xa = X(FR[i]), xb = X(FR[i + 1]), wa = halfB(xa) - 0.03, wb = halfB(xb) - 0.03;
        var za = topZ(xa), zb = topZ(xb);
        for (j = 0; j < KY.length - 1; j++) {
          var A0 = [xa, wa * KY[j], za, xa / 5.5, wa * KY[j] / 5.5];
          var A1 = [xa, wa * KY[j + 1], za, xa / 5.5, wa * KY[j + 1] / 5.5];
          var B0 = [xb, wb * KY[j], zb, xb / 5.5, wb * KY[j] / 5.5];
          var B1 = [xb, wb * KY[j + 1], zb, xb / 5.5, wb * KY[j + 1] / 5.5];
          cur.deck.triOut(A0, A1, B1, [xa, 0, za - 9]); cur.deck.triOut(A0, B1, B0, [xa, 0, za - 9]);
        }
      }
    })();

    /* ------------------------------------------- the 01 level, flush ----- */
    /* The hull sides run straight up to the 01 level from the hangar to
       the bridge (Knox 1981, Bagley's vertical), broken only by the boat
       bay. Sides in the hull canvas, the roof a weather deck at Z01.     */
    function flushSide(s0, s1, n) {
      var q, sd;
      for (sd = -1; sd <= 1; sd += 2) {
        for (q = 0; q < n; q++) {
          var xa = X(s0 + (s1 - s0) * q / n), xb = X(s0 + (s1 - s0) * (q + 1) / n);
          var ya = sd * (halfB(xa) - 0.004), yb = sd * (halfB(xb) - 0.004);
          hwall(xa, ya, deckZ(xa) - 0.06, Z01, xb, yb, deckZ(xb) - 0.06, Z01, [(xa + xb) * 0.5, 0, 5]);
        }
      }
      /* the roof                                                          */
      for (q = 0; q < n; q++) {
        var xa2 = X(s0 + (s1 - s0) * q / n), xb2 = X(s0 + (s1 - s0) * (q + 1) / n);
        var wa = halfB(xa2) - 0.004, wb = halfB(xb2) - 0.004;
        cur.deck.triOut([xa2, -wa, Z01, xa2 / 5.5, -wa / 5.5], [xb2, -wb, Z01, xb2 / 5.5, -wb / 5.5],
                        [xb2, wb, Z01, xb2 / 5.5, wb / 5.5], [xa2, 0, 0]);
        cur.deck.triOut([xa2, -wa, Z01, xa2 / 5.5, -wa / 5.5], [xb2, wb, Z01, xb2 / 5.5, wb / 5.5],
                        [xa2, wa, Z01, xa2 / 5.5, wa / 5.5], [xa2, 0, 0]);
      }
    }
    flushSide(S_HG - 0.6, S_BB0, 4);
    flushSide(S_BB1, S_01F, 8);
    /* the end walls: the bay's after and forward faces, the 01 front     */
    function endWall(s0, w0, w1, z0, z1, nx) {
      var xx = X(s0), sd;
      for (sd = -1; sd <= 1; sd += 2) {
        cur.sup.triOut([xx, sd * w0, z0, sd * w0 / 4, z0 / 4], [xx, sd * w1, z0, sd * w1 / 4, z0 / 4],
                       [xx, sd * w1, z1, sd * w1 / 4, z1 / 4], [xx - nx * 5, sd * (w0 + w1) * 0.5, (z0 + z1) * 0.5]);
        cur.sup.triOut([xx, sd * w0, z0, sd * w0 / 4, z0 / 4], [xx, sd * w1, z1, sd * w1 / 4, z1 / 4],
                       [xx, sd * w0, z1, sd * w0 / 4, z1 / 4], [xx - nx * 5, sd * (w0 + w1) * 0.5, (z0 + z1) * 0.5]);
      }
    }
    var BBW = 4.2;                                       /* bay house half width */
    endWall(S_BB0, BBW, halfB(X(S_BB0)) - 0.004, deckZ(X(S_BB0)), Z01, 1);
    endWall(S_BB1, BBW, halfB(X(S_BB1)) - 0.004, deckZ(X(S_BB1)), Z01, -1);
    endWall(S_01F, 0, halfB(X(S_01F)) - 0.004, deckZ(X(S_01F)) - 0.05, Z01, 1);
    /* the house between the boats, set in from the sides; its roof is the
       open 01 deck between the boats (the early ships)                    */
    prism("shade", sBox(S_BB0, S_BB1, BBW), deckZ(X(53)) - 0.05, Z01, 0, 4.0, true);
    flat("deck", X(S_BB0), -BBW, X(S_BB1), BBW, Z01, 0, 0, 2, 1.5);

    /* ---------------------------------- the flight deck and its gallery --- */
    var ZP = Z01 + 0.03;
    (function () {
      var FS = [S_FD0, 16, 19, 22, 25, 28, 31, S_HG];
      for (i = 0; i < FS.length - 1; i++) {
        var xa = X(FS[i]), xb = X(FS[i + 1]);
        var wa = Math.min(PAD_W * 0.5, halfB(xa) - 0.02), wb = Math.min(PAD_W * 0.5, halfB(xb) - 0.02);
        var ua = (S_HG - FS[i]) / (S_HG - S_FD0), ub = (S_HG - FS[i + 1]) / (S_HG - S_FD0);
        var A0 = [xa, -wa, ZP, ua, 0.5 - wa / PAD_W], A1 = [xa, wa, ZP, ua, 0.5 + wa / PAD_W];
        var B0 = [xb, -wb, ZP, ub, 0.5 - wb / PAD_W], B1 = [xb, wb, ZP, ub, 0.5 + wb / PAD_W];
        cur.pad.triOut(A0, A1, B1, [xa, 0, 0]); cur.pad.triOut(A0, B1, B0, [xa, 0, 0]);
      }
      /* the slab's edge and underside                                     */
      var xa0 = X(S_FD0), xb0 = X(S_HG), w0 = PAD_W * 0.5;
      bx("sup", xb0 - xa0, 0.2, 0.42, (xa0 + xb0) * 0.5, -w0 + 0.1, Z01 - 0.2);
      bx("sup", xb0 - xa0, 0.2, 0.42, (xa0 + xb0) * 0.5, w0 - 0.1, Z01 - 0.2);
      bx("sup", 0.2, PAD_W, 0.42, xa0 + 0.1, 0, Z01 - 0.2);
      flat("dark", xb0, -w0, xa0, w0, Z01 - 0.41, 0, 0, 1, 1);
      /* the house under it, set in so the deck's edges stand on posts over
         an open gallery (the dark band of the 1981 port beam)              */
      prism("shade", sBox(S_FD0 + 0.9, S_HG, 4.8), deckZ(X(20)) - 0.1, Z01 - 0.4, 0, 4.0, true);
      endWall(S_FD0 + 0.9, 0, 4.8, deckZ(X(S_FD0)) - 0.05, Z01 - 0.4, -1);
      for (s = -1; s <= 1; s += 2) {
        for (j = 0; j <= 6; j++) {
          var xp = X(S_FD0 + 0.4 + j * (S_HG - S_FD0 - 0.8) / 6);
          bx("sup", 0.32, 0.32, Z01 - 0.4 - deckZ(xp), xp, s * (w0 - 0.25), (Z01 - 0.4 + deckZ(xp)) * 0.5);
        }
        /* safety nets hinged out from the deck edge                         */
        var n = 7, q;
        for (q = 0; q <= n; q++) {
          var xq = X(S_FD0 + 0.3 + q * (S_HG - S_FD0 - 0.6) / n);
          bar("metal", xq, s * w0, ZP - 0.04, xq, s * (w0 + 0.9), ZP + 0.05, 0.035);
        }
        bar("metal", X(S_FD0 + 0.3), s * (w0 + 0.9), ZP + 0.05, X(S_HG - 0.3), s * (w0 + 0.9), ZP + 0.05, 0.04);
        var Cn = [X(20), s * (w0 + 0.45), ZP - 6];
        cur.dark.triOut([X(S_FD0 + 0.3), s * w0, ZP - 0.06, 0, 0], [X(S_HG - 0.3), s * w0, ZP - 0.06, 1, 0],
                        [X(S_HG - 0.3), s * (w0 + 0.9), ZP + 0.02, 1, 1], Cn);
        cur.dark.triOut([X(S_FD0 + 0.3), s * w0, ZP - 0.06, 0, 0], [X(S_HG - 0.3), s * (w0 + 0.9), ZP + 0.02, 1, 1],
                        [X(S_FD0 + 0.3), s * (w0 + 0.9), ZP + 0.02, 0, 1], Cn);
        /* lifelines along the gallery and the quarterdeck                   */
        var ep = [];
        [0.6, 5, 10, 13.5].forEach(function (ss) { var xx = X(ss); ep.push([xx, s * (halfB(xx) - 0.1), deckZ(xx) + 0.05]); });
        railRun("metal", ep, 1.0, 1.8);
      }
      /* the landing circle in the team colour, lying on the deck           */
      var CXs = S_HG - (0.8 + (S_HG - S_FD0 - 1.6) * 0.5);
      cur.team.add(place(THREE, new THREE.RingGeometry(3.25, 3.75, 40), X(CXs), 0, ZP + 0.05));
      /* the deck's after edge: ladder down to the quarterdeck, the rail     */
      railRun("metal", [[xa0 + 0.1, -w0 + 0.3, ZP], [xa0 + 0.1, -1.0, ZP]], 0.9, 1.2);
      railRun("metal", [[xa0 + 0.1, 1.0, ZP], [xa0 + 0.1, w0 - 0.3, ZP]], 0.9, 1.2);
    })();

    /* -------------------------------------- the quarterdeck and BPDMS ---- */
    /* the Mk 25 launcher, 8 cells, on its trainable pedestal (1974 drawing
       px 69-103, box 7.35-9.2 m; Whipple 1974; Knox 1981)                  */
    (function () {
      var bs = 7.5, xc = X(bs), zd = deckZ(xc);
      cz("sup", 1.25, 1.45, 0.5, 18, xc, 0, zd - 0.02);
      cz("sup", 0.85, 1.0, 1.15, 14, xc, 0, zd + 0.45);
      bx("sup", 1.6, 2.9, 0.5, xc, 0, zd + 1.75);
      for (s = -1; s <= 1; s += 2) bx("sup", 1.2, 0.25, 1.1, xc, s * 1.35, zd + 2.3);
      stamp(xc, 0, zd + 2.95, 0, function () {
        /* the cell box, its front face the cell covers                     */
        bx("sup", 4.5, 2.6, 1.85, 0, 0, 0);
        bx("sup", 4.3, 2.75, 0.12, 0, 0, 0.96);
        var Ff = frameN(2.25, 0, -0.92, 1, 0), r, c2;
        for (r = 0; r < 2; r++) for (c2 = 0; c2 < 4; c2++) {
          plate("dark", Ff, rounded(0.28, 0.36, 0.8, 10).map(function (p) {
            return [p[0] - 0.96 + c2 * 0.64, p[1] + 0.46 + r * 0.92];
          }), -0.02, 0.04);
        }
        bx("dark", 0.06, 2.4, 1.6, -2.27, 0, 0);
      });
      /* bitts, the stern rail, the ensign staff on the transom              */
      for (s = -1; s <= 1; s += 2) {
        [2.5, 11.5].forEach(function (ss) {
          var xx = X(ss), z0 = topZ(xx) - 0.02, yy = s * (halfB(xx) - 0.9);
          bx("sup", 1.3, 0.5, 0.1, xx, yy, z0 + 0.05);
          cz("metal", 0.17, 0.19, 0.5, 8, xx - 0.38, yy, z0);
          cz("metal", 0.17, 0.19, 0.5, 8, xx + 0.38, yy, z0);
        });
      }
      railRun("metal", [[X(0.5), -halfB(XA) + 0.3, deckZ(XA) + 0.05], [X(0.5), halfB(XA) - 0.3, deckZ(XA) + 0.05]], 1.0, 1.6);
      bar("metal", XA + 0.45, 0, deckZ(XA), XA + 0.45, 0, deckZ(XA) + 4.0, 0.05);
      /* a deck hatch in the quarterdeck                                    */
      flat("dark", X(1.5), -1.6, X(4.6), 1.6, topZ(X(3)) + 0.012, 0, 0, 1, 1);
    })();

    /* ----------------------------------------------------- the hangar ---- */
    /* on the 01 level from its after face to frame px 340, 4.6-5.2 m high;
       the after part lower (the 1974 drawing's step at px 283)            */
    var HW = 5.0;
    /* the telescoping section run in over the hangar's after end: a sleeve
       a little proud of the fixed walls (it runs out aft to px 237 to take
       the Seasprite in, as the 1974 drawing shows it)                     */
    prism("sup", sBox(S_HG, S_HG0, HW + 0.15), Z01 - 0.02, 12.2, 0, 4.0);
    prism("sup", sBox(S_HG0 - 0.3, S_HG1, HW), Z01 - 0.02, 12.7, 0, 4.0);
    (function () {
      var xh = X(S_HG) - 0.004, FH = frameN(xh, 0, Z01, -1, 0), q;
      /* the roller door, its slats; the hangar's corner posts              */
      plate("dark", FH, rectPts(-2.3, 0.05, 2.3, 4.0), -0.02, 0.04);
      for (q = 1; q < 9; q++) {
        var d0 = fp(FH, -2.25, q * 0.44, 0.05), d1 = fp(FH, 2.25, q * 0.44, 0.05);
        bar("metal", d0[0], d0[1], d0[2], d1[0], d1[1], d1[2], 0.025);
      }
      plate("sup", FH, rectPts(-2.6, 4.0, 2.6, 4.35), 0, 0.12);
      for (s = -1; s <= 1; s += 2) {
        plate("sup", FH, rectPts(s * 2.45 - 0.15, 0, s * 2.45 + 0.15, 4.0), 0, 0.12);
        /* the hangar sides: a door and scuttles                             */
        var Fs = frameN(X(40), s * (HW + 0.004), Z01, 0, s);
        plate("dark", Fs, rectPts(-0.42, 0.1, 0.42, 1.95), -0.02, 0.05);
        [37.5, 40, 42.5].forEach(function (ss) {
          plate("dark", frameN(X(ss), s * (HW + 0.004), Z01 + 2.6, 0, s), rounded(0.28, 0.2, 0.6, 8), -0.02, 0.04);
        });
        /* the walkways outboard of the hangar, their rails                  */
        railRun("metal", [[X(S_HG), s * (halfB(X(S_HG)) - 0.1), Z01], [X(S_BB0), s * (halfB(X(S_BB0)) - 0.1), Z01]], 1.0, 2.0);
      }
      /* the hangar roof: rails, vents, the director the 1974 drawing shows
         on it at px 296-306 (the Sea Sparrow's, by its place), a whip      */
      railBox(X(S_HG0), X(S_HG1 - 0.2), HW - 0.12, 12.7);
      for (s = -1; s <= 1; s += 2) {
        bx("sup", 1.6, 1.0, 0.7, X(38.5), s * 3.4, 13.05);
        cz("sup", 0.22, 0.26, 0.5, 8, X(41), s * 2.2, 12.7);
        /* the sleeve's guide rails along its roof edges                   */
        bx("metal", S_HG0 - S_HG, 0.16, 0.14, X((S_HG + S_HG0) * 0.5), s * (HW - 0.1), 12.27);
      }
      var xd = X(PX(301));
      cz("sup", 0.45, 0.55, 0.9, 12, xd, 1.4, 12.7);
      bx("sup", 1.2, 1.0, 0.9, xd, 1.4, 14.05);
      stamp(xd + 0.6, 1.4, 14.1, 0, function () {
        var g = new THREE.CylinderGeometry(0.62, 0.22, 0.32, 14, 1, false);
        g.rotateZ(-PI / 2); g.translate(0.05, 0, 0.25); cur.rad.add(g);
      });
      bar("metal", X(PX(285)), -2.2, 12.7, X(PX(285)), -2.2, PY(97), 0.05);
      bar("metal", X(PX(310)), 3.6, 12.7, X(PX(310)), 3.6, PY(110), 0.05);
    })();
    /* whips along the 01 deck edges abreast the hangar and the bay, and
       the lockers and ventilators there (Meyerkord 1972, Whipple 1974)    */
    for (s = -1; s <= 1; s += 2) {
      [35.5, 41.5, 47.0].forEach(function (ss, q) {
        var xx = X(ss), yy = s * (halfB(xx) - 0.35);
        bx("sup", 0.4, 0.4, 0.5, xx, yy, Z01 + 0.25);
        bar("metal", xx, yy, Z01 + 0.5, xx, yy, Z01 + 8.5 + q * 0.8, 0.045);
      });
      bx("sup", 1.8, 0.8, 1.4, X(38.6), s * 6.1, Z01 + 0.7);
      bx("sup", 1.1, 0.8, 1.0, X(45.2), s * 6.2, Z01 + 0.5);
      cz("sup", 0.3, 0.34, 0.8, 8, X(43.2), s * 6.3, Z01);
      cz("sup", 0.42, 0.36, 0.14, 8, X(43.2), s * 6.3, Z01 + 0.8);
    }
    /* the upper house over the after deckhouse, px 340-368 (10.2 m)      */
    prism("sup", sBox(S_HG1, S_BB0, 4.6), Z01 - 0.02, 10.2, 0, 4.0);
    bar("metal", X(PX(361)), -3.6, 10.2, X(PX(361)), -3.6, PY(115), 0.05);
    railBox(X(S_HG1 + 0.2), X(S_BB0 - 0.2), 4.45, 10.2);
    cz("sup", 0.35, 0.4, 0.9, 10, X(46.5), 2.4, 10.2);
    bx("sup", 1.3, 1.6, 1.0, X(46.2), -1.8, 10.7);

    /* -------------------------------------------------- the boat bay ----- */
    /* the open main deck either side of the house between the boats, the
       Mk 32 twin tubes in it, the boats over it in gravity davits          */
    (function () {
      var bxc = X(52.9), zk = 7.15;
      for (s = -1; s <= 1; s += 2) {
        var by = s * 5.75;
        /* a 26-ft motor whaleboat, white canopy                           */
        stamp(bxc, by, zk, 0, function () {
          var L = 3.95, B = 1.2;
          loftX("sup", [[-L, B * 0.82, 0.32, 1.12], [-L + 0.45, B * 0.96, 0.06, 1.15],
                        [-L * 0.3, B, 0.0, 1.15], [L * 0.35, B * 0.93, 0.06, 1.18],
                        [L * 0.72, B * 0.62, 0.25, 1.22], [L * 0.94, B * 0.22, 0.6, 1.25],
                        [L, 0.01, 0.9, 1.25]], 12, 0.55);
          bx("rad", 2.8, 1.75, 0.6, -0.7, 0, 1.45);
          var cg = new THREE.CylinderGeometry(0.88, 0.88, 2.8, 10, 1, false, 0, PI);
          cg.rotateZ(PI / 2); cg.rotateX(PI / 2);
          cur.rad.add(place(THREE, cg, -0.7, 0, 1.75));
        });
        /* the gravity davits: two curved arms from the deck to over the boat */
        for (j = -1; j <= 1; j += 2) {
          var DX = bxc + j * 2.9, yb = s * 4.4;
          tube("metal", DX, yb, deckZ(DX), DX, yb, Z01 + 0.2, 0.14, 0.12, 6);
          tube("metal", DX, yb, Z01 + 0.2, DX, s * 5.2, Z01 + 2.4, 0.12, 0.1, 6);
          tube("metal", DX, s * 5.2, Z01 + 2.4, DX, s * 5.9, Z01 + 2.7, 0.1, 0.09, 6);
          bar("metal", DX, s * 5.9, Z01 + 2.7, DX, by, zk + 1.2, 0.02);
          bx("dark", 0.3, 1.9, 0.45, DX, by - s * 0.2, zk - 0.25);
        }
        /* twin Mk 32 tubes on the bay deck, trained outboard               */
        var tx = X(51.6);
        stamp(tx, s * 5.2, deckZ(tx), s > 0 ? PI * 0.62 : -PI * 0.62, function () {
          cz("sup", 0.32, 0.42, 0.75, 10, 0, 0, 0);
          for (var q = -1; q <= 1; q += 2) {
            var g = new THREE.CylinderGeometry(0.21, 0.21, 2.8, 8, 1, false);
            g.rotateZ(-PI / 2); g.translate(0.25, q * 0.26, 0.98);
            cur.metal.add(g);
          }
          bx("sup", 0.6, 0.95, 0.25, -0.2, 0, 0.82);
        });
        /* the bay's lifelines, the bulwark rail at the deck edge          */
        var ep = [];
        [S_BB0 + 0.2, 53, S_BB1 - 0.2].forEach(function (ss) {
          var xx = X(ss); ep.push([xx, s * (halfB(xx) - 0.1), deckZ(xx) + 0.05]);
        });
        railRun("metal", ep, 1.0, 1.7);
        railRun("metal", [[X(S_BB0 + 0.2), s * (BBW - 0.1), Z01], [X(S_BB1 - 0.2), s * (BBW - 0.1), Z01]], 1.0, 2.0);
        /* doors into the house from the bay                               */
        plate("dark", frameN(X(55.5), s * (BBW + 0.004), deckZ(X(55.5)), 0, s), rectPts(-0.42, 0.1, 0.42, 1.95), -0.02, 0.05);
      }
    })();

    /* ------------------------------------------- the mack house ---------- */
    /* on the 01 level from the boat bay to px 545, 9.8 m (py 196)        */
    var ZMH = 9.8;
    prism("sup", sBox(S_BB1, S_MH1, 5.4), Z01 - 0.02, ZMH, 0, 4.0);
    for (s = -1; s <= 1; s += 2) {
      railRun("metal", [[X(S_BB1 - 0.3), s * 7.0, Z01], [X(S_01F - 0.2), s * 6.9, Z01]], 1.0, 2.0);
      railRun("metal", [[X(S_BB1 + 0.2), s * 5.3, ZMH], [X(63.0), s * 5.3, ZMH]], 1.0, 1.8);
      [60.5, 71.5].forEach(function (ss) {
        plate("dark", frameN(X(ss), s * 5.404, Z01, 0, s), rectPts(-0.42, 0.1, 0.42, 1.95), -0.02, 0.05);
      });
      /* life raft canisters on the 01 deck edge                          */
      [76, 78, 80, 82].forEach(function (ss) {
        var g = new THREE.CylinderGeometry(0.27, 0.27, 1.15, 8, 1, false);
        g.rotateZ(PI / 2);
        cur.rad.add(place(THREE, g, X(ss), s * 6.55, Z01 + 0.32));
        bx("dark", 1.0, 0.5, 0.08, X(ss), s * 6.55, Z01 + 0.04);
      });
    }

    /* ------------------------------------------------------- the mack ---- */
    /* a round tower on the mack house (px 481-525 at its foot), the band
       and ledge at 17.9 m (py 140), the black exhaust housing to 21.1 m
       (py 118), then the lattice and the radars (two macks, Lang 1975)    */
    var XM = X(PX(503)), ZB = 17.9, ZH = 21.1;
    (function () {
      /* the round lower mack, narrowing a little to the band              */
      var g = new THREE.CylinderGeometry(2.85, 3.2, ZB - ZMH, 24, 3, true);
      g.rotateX(PI / 2); g.translate(XM, 0, (ZB + ZMH) * 0.5);
      cur.sup.add(g);
      /* the apron where it meets the house roof                           */
      cz("sup", 3.2, 3.55, 0.5, 24, XM, 0, ZMH - 0.02);
      /* the ledge at the band, its rail                                   */
      cz("dark", 3.45, 3.45, 0.14, 24, XM, 0, ZB - 0.07);
      var ring = [], q;
      for (q = 0; q <= 16; q++) { var an = 2 * PI * q / 16; ring.push([XM + 3.35 * Math.cos(an), 3.35 * Math.sin(an), ZB + 0.07]); }
      railRun("metal", ring, 0.9, 9);
      /* the uptake drum above the band, flaring out wider than the mack
         below it, grey with its stiffeners (Whipple 1974, Knox 1981; the
         1974 drawing has it 7.2 m across against 6.3 m below)             */
      cz("sup", 3.5, 3.05, ZH - ZB - 0.3, 24, XM, 0, ZB);
      for (q = 0; q < 14; q++) {
        var an2 = 2 * PI * (q + 0.5) / 14, c2 = Math.cos(an2), s2 = Math.sin(an2);
        bar("sup", XM + 3.1 * c2, 3.1 * s2, ZB + 0.1, XM + 3.55 * c2, 3.55 * s2, ZH - 0.35, 0.06);
      }
      /* the black platform on top, the uptakes' casing and mouths on it   */
      cz("dark", 3.7, 3.6, 0.3, 24, XM, 0, ZH - 0.3);
      bx("dark", 2.6, 3.6, 1.1, XM + 0.9, 0, ZH + 0.55);
      cz("dark", 0.85, 0.9, 0.35, 12, XM + 0.9, 0.9, ZH + 1.1);
      cz("dark", 0.85, 0.9, 0.35, 12, XM + 0.9, -0.9, ZH + 1.1);
      railRun("metal", (function () {
        var r2 = [], q2;
        for (q2 = 0; q2 <= 16; q2++) { var a3 = 2 * PI * q2 / 16; r2.push([XM + 3.6 * Math.cos(a3), 3.6 * Math.sin(a3), ZH]); }
        return r2;
      })(), 0.9, 9);
      /* the ladders up its sides and the vertical pipes                   */
      for (s = -1; s <= 1; s += 2) {
        var xl = XM - 1.0;
        bar("metal", xl - 0.22, s * 3.15, ZMH + 0.5, xl - 0.22, s * 2.82, ZB, 0.03);
        bar("metal", xl + 0.22, s * 3.15, ZMH + 0.5, xl + 0.22, s * 2.82, ZB, 0.03);
        bar("metal", XM + 2.3, s * 2.3, ZMH + 0.5, XM + 2.05, s * 2.05, ZB, 0.06);
      }
      /* the door in its after side                                        */
      plate("dark", frameN(XM - 2.95, 1.35, ZMH + 0.5, -0.91, 0.41), rectPts(-0.42, 0.0, 0.42, 1.85), -0.08, 0.04);
    })();
    /* the lattice mast on the after part of the housing (px 481-497)      */
    var XL = X(PX(489)), ZT = 27.5;
    tower("dark", XL - 1.2, XL + 1.2, 1.3, XL - 0.75, XL + 0.75, 0.8, ZH, ZT,
          [0, 0.33, 0.66, 1.0], 0.12, 0.045);
    bx("dark", 3.4, 3.2, 0.14, XL, 0, ZT);
    railBox(XL - 1.6, XL + 1.6, 1.5, ZT + 0.07);
    /* the yards: the wide lower one on the housing top, the upper one with
       the two ECM domes at its ends (Lang 1975, 1969)                     */
    bar("dark", XL + 0.3, -5.4, ZH + 0.4, XL + 0.3, 5.4, ZH + 0.4, 0.09);
    bx("dark", 3.0, 7.4, 0.14, XL + 0.5, 0, ZH + 0.1);
    bar("dark", XL, -3.0, ZT - 0.2, XL, 3.0, ZT - 0.2, 0.07);
    for (s = -1; s <= 1; s += 2) {
      cz("dark", 0.38, 0.38, 1.3, 12, XL - 0.2, s * 2.6, ZT - 0.2);
      sph("dark", 0.38, 12, 6, XL - 0.2, s * 2.6, ZT + 1.1);
      bar("dark", XL + 0.3, s * 5.2, ZH + 0.4, XL + 0.3, s * 5.2, ZH + 1.5, 0.03);
      bar("dark", XL + 0.3, s * 3.2, ZH + 0.4, XL - 0.2, s * 1.1, ZH + 2.3, 0.05);
    }
    /* the SPS-40 on its pedestal forward of the lattice (px 521-530,
       antenna centre 25.3 m), trained a little to port                    */
    var XS40 = X(PX(525));
    tube("dark", XS40, 0, ZH, XS40, 0, 24.0, 0.3, 0.26, 10);
    bar("dark", XS40, 0, ZH + 1.6, XL + 0.8, 0, ZH + 3.2, 0.06);
    stamp(XS40, 0, 24.1, 0.3, function () {
      var NS = 8, q, AW = 2.5, AH = 2.1, Bm = cur.dark;
      function rx(y) { return 0.25 - 0.55 * (y / AW) * (y / AW); }
      for (q = 0; q < NS; q++) {
        var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
        var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
        var a1 = [rx(ya) + 0.15, ya, AH, 0, 1], b1 = [rx(yb) + 0.15, yb, AH, 1, 1];
        Bm.triOut(a0, b0, b1, [-6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [-6, 0, AH * 0.5]);
        var c0 = [rx(ya) - 0.06, ya, 0, 0, 0], d0 = [rx(yb) - 0.06, yb, 0, 1, 0];
        var c1 = [rx(ya) + 0.09, ya, AH, 0, 1], d1 = [rx(yb) + 0.09, yb, AH, 1, 1];
        Bm.triOut(c0, d0, d1, [6, 0, AH * 0.5]); Bm.triOut(c0, d1, c1, [6, 0, AH * 0.5]);
      }
      bar("dark", rx(-AW), -AW, 0, rx(AW), AW, 0, 0.05);
      bar("dark", rx(-AW) + 0.15, -AW, AH, rx(AW) + 0.15, AW, AH, 0.05);
      /* the feed horn on its boom                                         */
      bar("dark", 0.0, 0, 0.3, 1.5, 0, AH * 0.45, 0.06);
      bx("dark", 0.35, 0.6, 0.45, 1.55, 0, AH * 0.45);
      bx("dark", 0.6, 0.8, 0.5, -0.25, 0, -0.1);
    });
    /* the SPS-10 on the top platform, and the pole topmast (to 35.8 m)    */
    var XS10 = X(PX(493));
    tube("dark", XS10, 0, ZT, XS10, 0, 29.8, 0.16, 0.14, 8);
    stamp(XS10, 0, 29.8, 0.6, function () {
      bx("dark", 0.5, 0.6, 0.4, 0, 0, 0.2);
      var NS = 6, q, AW = 1.55, AH = 0.62, Bm = cur.dark;
      function rx(y) { return 0.18 - 0.3 * (y / AW) * (y / AW); }
      for (q = 0; q < NS; q++) {
        var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
        var a0 = [rx(ya), ya, 0.4, 0, 0], b0 = [rx(yb), yb, 0.4, 1, 0];
        var a1 = [rx(ya), ya, 0.4 + AH, 0, 1], b1 = [rx(yb), yb, 0.4 + AH, 1, 1];
        Bm.triOut(a0, b0, b1, [-6, 0, 0.7]); Bm.triOut(a0, b1, a1, [-6, 0, 0.7]);
        var c0 = [a0[0] - 0.05, ya, 0.4, 0, 0], d0 = [b0[0] - 0.05, yb, 0.4, 1, 0];
        var c1 = [a1[0] - 0.05, ya, 0.4 + AH, 0, 1], d1 = [b1[0] - 0.05, yb, 0.4 + AH, 1, 1];
        Bm.triOut(c0, d0, d1, [6, 0, 0.7]); Bm.triOut(c0, d1, c1, [6, 0, 0.7]);
      }
    });
    tube("dark", XL - 0.3, 0, ZT, XL - 0.3, 0, 35.6, 0.13, 0.06, 6);
    bar("dark", XL - 0.3, -1.4, 32.8, XL - 0.3, 1.4, 32.8, 0.04);
    cz("dark", 0.22, 0.22, 0.5, 8, XL - 0.3, 0, 33.6);
    /* the stays from the yard ends to the house roof                      */
    for (s = -1; s <= 1; s += 2) {
      bar("metal", XL + 0.3, s * 5.3, ZH + 0.4, X(61), s * 5.2, ZMH, 0.015);
      bar("metal", XL, s * 3.0, ZT - 0.2, X(S_BB1 + 0.5), s * 4.2, Z01, 0.012);
    }

    /* ------------------------------------- the forward house and bridge --- */
    /* the 02/03 house from px 545 to the bridge face, 11.6 m; the pilot
       house over its forward end to 12.1 m with the window band; the
       Mk 68 director on its roof (px 617-639)                              */
    var ZFH = 10.5, ZPH = 12.15;
    var S_PH = S_BR - 8.8;     /* the bridge block's after end, under the director */
    prism("sup", sBox(S_MH1, S_PH + 0.3, 5.6), Z01 - 0.02, ZFH, 0, 4.0);
    /* the bridge block nearly the full beam, its window band right across
       (Lang 1975 bow on, Whipple 1974)                                     */
    var PHP = [[X(S_BR), -5.6], [X(S_BR), 5.6], [X(S_BR - 0.7), 6.3], [X(S_PH), 6.3],
               [X(S_PH), -6.3], [X(S_BR - 0.7), -6.3]];
    prism("sup", PHP, Z01 - 0.02, ZPH, 0, 4.0);
    (function () {
      var zc = 11.05, q, xf = X(S_BR);
      var Ff = frameN(xf, 0, zc, 1, 0);
      for (q = -7; q <= 7; q++) plate("glass", Ff, rectPts(q * 0.72 - 0.28, -0.42, q * 0.72 + 0.28, 0.42), -0.02, 0.04);
      for (s = -1; s <= 1; s += 2) {
        var Fc = frameN(xf - 0.35, s * 5.95, zc, 0.71, s * 0.71);
        plate("glass", Fc, rectPts(-0.28, -0.42, 0.28, 0.42), -0.02, 0.04);
        var Fs = frameN(X(S_BR - 3.0), s * 6.3, zc, 0, s);
        for (q = -2; q <= 2; q++) plate("glass", Fs, rectPts(q * 0.85 - 0.3, -0.42, q * 0.85 + 0.3, 0.42), -0.02, 0.04);
        /* the open bridge wings out to the side, on brackets              */
        bx("sup", 2.6, 0.75, 0.18, X(S_BR - 1.6), s * 6.66, 9.5);
        railRun("metal", [[X(S_BR - 0.3), s * 6.3, 9.6], [X(S_BR - 0.3), s * 6.98, 9.6],
                          [X(S_BR - 2.9), s * 6.98, 9.6], [X(S_BR - 2.9), s * 6.3, 9.6]], 1.0, 1.0);
      }
      /* the wind deflector along the roof edge, the roof rail             */
      bx("sup", 0.8, 11.0, 0.12, xf + 0.2, 0, ZPH + 0.2, 0, -0.45, 0);
      railRun("metal", [[xf - 0.2, -6.1, ZPH], [X(S_PH + 0.2), -6.1, ZPH]], 1.0, 1.6);
      railRun("metal", [[xf - 0.2, 6.1, ZPH], [X(S_PH + 0.2), 6.1, ZPH]], 1.0, 1.6);
      /* the front of the house below: doors, scuttles, the ASROC reload
         door in the 01 face and its low box (px 675-691)                   */
      var F1 = frameN(X(S_01F), 0, deckZ(X(S_01F)), 1, 0);
      plate("dark", F1, rectPts(-4.6, 0.12, -3.8, 1.95), -0.02, 0.05);
      plate("dark", F1, rectPts(3.8, 0.12, 4.6, 1.95), -0.02, 0.05);
      prism("sup", sBox(S_01F - 0.2, PX(691), 2.0), deckZ(X(S_01F)) - 0.05, deckZ(X(S_01F)) + 2.5, 0, 4.0);
      plate("dark", frameN(X(PX(691)), 0, deckZ(X(S_01F)), 1, 0), rectPts(-1.5, 0.15, 1.5, 2.2), -0.02, 0.04);
      var F2 = frameN(X(S_BR), 0, Z01, 1, 0);
      [-2.5, 2.5].forEach(function (yy) {
        plate("dark", F2, rounded(0.28, 0.2, 0.6, 8).map(function (p) { return [p[0] + yy, p[1] + 1.4]; }), -0.02, 0.04);
      });
      /* side doors and scuttles on the 02 house                           */
      for (s = -1; s <= 1; s += 2) {
        [75.5, 81].forEach(function (ss) {
          plate("dark", frameN(X(ss), s * 5.604, Z01, 0, s), rectPts(-0.42, 0.1, 0.42, 1.95), -0.02, 0.05);
        });
        [77.5, 79].forEach(function (ss) {
          plate("dark", frameN(X(ss), s * 5.604, Z01 + 2.6, 0, s), rounded(0.28, 0.2, 0.6, 8), -0.02, 0.04);
        });
      }
    })();
    /* the Mk 68 director: base house, director, SPG-53 dish (1974 drawing
       px 617-639: base to 14.2 m, dish top 18.5 m)                         */
    var XD = X(PX(628));
    bx("sup", 2.9, 2.9, 2.1, XD, 0, ZPH + 1.05);
    railBox(XD - 1.7, XD + 1.7, 1.7, ZPH + 2.1);
    stamp(XD, 0, ZPH + 2.1, 0, function () {
      cz("sup", 0.85, 0.95, 0.5, 14, 0, 0, 0);
      loftX("sup", [[-1.1, 0.75, 0.5, 1.6], [-0.7, 0.95, 0.5, 2.15], [0.4, 0.95, 0.5, 2.15],
                    [0.95, 0.8, 0.5, 1.8], [1.15, 0.55, 0.5, 1.3]], 12, 0.45);
      for (var q = -1; q <= 1; q += 2) {
        cx("sup", 0.2, 0.2, 0.7, 8, 0.6, q * 1.1, 1.75);
        bx("sup", 0.6, 0.25, 0.5, -0.3, q * 1.05, 2.2);
      }
      /* the SPG-53 dish on its yoke over the director                     */
      bx("sup", 0.4, 1.2, 0.3, 0, 0, 2.3);
      var g = new THREE.CylinderGeometry(0.85, 0.3, 0.42, 18, 1, false);
      g.rotateZ(-PI / 2); g.rotateY(-0.25); g.translate(0.35, 0, 3.15);
      cur.rad.add(g);
      bar("metal", 0.35, 0, 3.15, 1.15, 0, 3.4, 0.03);
      bx("dark", 0.25, 0.25, 0.25, 1.2, 0, 3.42);
    });
    /* the signal mast at the bridge (px 668-672, to 17.7 m) with its yard  */
    var XSM = X(PX(670));
    tube("metal", XSM, 0, ZPH, XSM, 0, PY(141), 0.1, 0.06, 6);
    bar("metal", XSM, -2.6, 15.6, XSM, 2.6, 15.6, 0.045);
    bar("metal", XSM, 0, 16.6, XSM - 3.0, 0, ZPH + 0.2, 0.02);
    /* sidelights, searchlights and the 02-house roof gear                   */
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.12, 0.16, 0.5, 8, X(S_BR - 3.5), s * 4.6, ZPH);
      cx("rad", 0.32, 0.32, 0.55, 10, X(S_BR - 3.5) - 0.2, s * 4.6, ZPH + 0.75);
      bx("sup", 0.6, 0.3, 0.5, X(S_BR - 1.6), s * 6.9, 10.05);
      railRun("metal", [[X(S_MH1 + 0.2), s * 5.45, ZFH], [X(S_PH - 0.1), s * 5.45, ZFH]], 1.0, 1.8);
      /* the forward 01 deck edge rails each side of the house              */
      bx("sup", 1.4, 0.45, 1.3, X(85), s * 6.65, Z01 + 0.65);
    }
    railRun("metal", [[X(S_MH1 + 0.2), -5.45, ZFH], [X(S_MH1 + 0.2), 5.45, ZFH]], 1.0, 1.8);
    bx("sup", 2.2, 2.6, 1.3, X(77), 0, ZFH + 0.65);
    bar("metal", X(PX(580)), 3.0, ZFH, X(PX(580)), 3.0, PY(118), 0.05);
    bar("metal", X(PX(580)), -3.0, ZFH, X(PX(580)), -3.0, PY(118) - 1.0, 0.05);
    cz("sup", 0.35, 0.4, 0.9, 10, X(80.5), -2.4, ZFH);
    bx("dark", 0.6, 0.9, 1.0, X(80.5), -2.4, ZFH + 1.4);

    /* ----------------------------------------------- the forecastle ------ */
    /* the ASROC Mk 16 box on its trainable pedestal (px 699-736, box top
       9.95 m), cells forward                                                */
    (function () {
      var xa = X(PX(717)), zd = deckZ(xa);
      cz("sup", 1.65, 1.85, 0.45, 20, xa, 0, zd - 0.02);
      cz("sup", 1.1, 1.25, 1.25, 16, xa, 0, zd + 0.42);
      for (s = -1; s <= 1; s += 2) bx("sup", 1.5, 0.3, 1.0, xa - 0.1, s * 1.15, zd + 2.0);
      stamp(xa + 0.1, 0, zd + 3.2, 0, function () {
        bx("sup", 4.9, 3.3, 1.85, 0, 0, 0);
        bx("sup", 0.2, 3.45, 2.0, -2.4, 0, 0);
        bx("dark", 4.9, 0.08, 1.7, 0, 0, 0);
        var Ff = frameN(2.45, 0, -0.92, 1, 0), r, c2;
        for (r = 0; r < 2; r++) for (c2 = 0; c2 < 4; c2++) {
          plate("rad", Ff, rectPts(-1.55 + c2 * 0.79, 0.08 + r * 0.9, -0.85 + c2 * 0.79, 0.84 + r * 0.9), -0.02, 0.03);
        }
      });
    })();
    /* the team stripe lying across the forecastle, abaft the gun           */
    flat("team", X(104.4), -1.8, X(105.8), 1.8, topZ(X(105)) + 0.04, 0, 0, 1, 1);
    /* the anchor in the stem (Whipple 1974, Meyerkord 1972)                 */
    (function () {
      var sz = 5.7, sx = XSTEM - 6.0 * (7.5 - sz) / 8.5 - 0.1;
      cx("dark", 0.75, 0.75, 0.5, 14, sx - 0.35, 0, sz);
      cx("metal", 0.5, 0.5, 0.28, 12, sx - 0.12, 0, sz);
      bx("metal", 0.3, 0.9, 0.25, sx + 0.1, 0, sz - 0.35);
    })();
    /* the windlass, capstan, bitts and chocks (1974 drawing px 860-920)     */
    cz("metal", 0.5, 0.58, 0.65, 12, X(125.5), -0.9, topZ(X(125.5)) - 0.02);
    cz("metal", 0.5, 0.58, 0.65, 12, X(125.5), 0.9, topZ(X(125.5)) - 0.02);
    cz("metal", 0.36, 0.42, 0.55, 10, X(129.4), 0, topZ(X(129.4)) - 0.02);
    bar("dark", X(130.2), 0, topZ(X(130.2)) + 0.05, X(124.6), -0.9, topZ(X(124.6)) + 0.05, 0.08);
    bar("dark", X(130.2), 0, topZ(X(130.2)) + 0.05, X(124.6), 0.9, topZ(X(124.6)) + 0.05, 0.08);
    function bitts(x, y) {
      var z0 = topZ(x) - 0.02;
      bx("sup", 1.3, 0.5, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.17, 0.19, 0.5, 8, x - 0.38, y, z0);
      cz("metal", 0.17, 0.19, 0.5, 8, x + 0.38, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(X(121), s * 2.9); bitts(X(103), s * 5.0);
      [127, 117, 97].forEach(function (ss) {
        var xx = X(ss);
        bx("metal", 0.6, 0.25, 0.3, xx, s * (halfB(xx) - 0.3), deckZ(xx) + 0.15);
      });
      /* lifelines from the stem to the 01 face                              */
      var ep = [];
      [132.6, 129, 124, 118, 110, 102, S_01F + 0.2].forEach(function (ss) {
        var xx = X(ss); ep.push([xx, s * (halfB(xx) - 0.1), deckZ(xx) + 0.05]);
      });
      railRun("metal", ep, 1.0, 2.0);
    }
    /* the jackstaff on the stem head                                       */
    bar("metal", XSTEM - 0.4, 0, deckZ(XSTEM) + 0.2, XSTEM - 0.4, 0, deckZ(XSTEM) + 5.2, 0.05);

    /* ---------------------------------------------- under water ---------- */
    /* the SQS-26 bow dome under the forefoot (px 790-910 on the drawing),
       its bottom at the published 7.5 m                                    */
    loftX("dark", [[X(107.5), 0.25, -4.6, -4.3], [X(110), 1.25, -5.9, -3.6], [X(114), 1.95, -7.0, -3.2],
                   [X(118.5), 2.2, -7.5, -2.9], [X(122.5), 2.05, -7.4, -2.6], [X(125.3), 1.6, -6.8, -2.4],
                   [X(127.0), 0.9, -5.8, -2.6], [X(127.7), 0.2, -5.0, -3.4]], 14, 0.6);
    /* the single shaft, its strut, propeller and the big rudder            */
    tube("metal", X(8.0), 0, -3.1, X(40), 0, -3.9, 0.26, 0.3, 8);
    loftX("dark", [[X(14), 0.05, -3.6, -3.2], [X(16), 0.45, -3.6, -2.4], [X(26), 0.5, -3.95, -2.9],
                   [X(31), 0.3, -4.1, -3.4]], 8, 0.6);
    bar("metal", X(11.5), 0, -3.2, X(11.5), 0, -0.7, 0.1);
    (function () {
      var hx = X(7.1), hz = -3.1, q;
      cx("metal", 0.42, 0.28, 1.1, 10, hx - 0.55, 0, hz);
      for (q = 0; q < 5; q++) {
        var an = q * 2 * PI / 5;
        var g = new THREE.BoxGeometry(0.25, 0.9, 2.15);
        g.translate(0, 0, 1.25); g.rotateX(an); g.rotateY(0.25);
        cur.metal.add(place(THREE, g, hx, 0, hz));
      }
      bx("dark", 2.0, 0.34, 4.6, X(PX(56)), 0, -2.8);
    })();
    /* two bilge keels                                                      */
    for (s = -1; s <= 1; s += 2) bx("dark", 20.0, 0.14, 0.5, X(54), s * 6.25, -3.3, s * 0.8, 0, 0);

    /* --------------------------------------------- the 5-inch Mk 42 ------ */
    function gun() {
      cz("sup", 2.0, 2.1, 0.32, 24, 0, 0, 0);
      /* the big square gunhouse, its front sloped, its corners rounded,
         4.9 m long on the 1974 drawing (px 793-827), 3.4 m over the deck   */
      loftX("sup", [[-2.6, 1.55, 0.32, 3.15], [-2.4, 1.82, 0.32, 3.45], [-1.85, 1.88, 0.32, 3.55],
                    [1.0, 1.88, 0.32, 3.55], [1.75, 1.82, 0.32, 3.42], [2.25, 1.66, 0.32, 2.9],
                    [2.42, 1.5, 0.32, 2.3]], 20, 0.25);
      /* the sight hoods on the roof, the slot and the 54-calibre barrel    */
      for (var q = -1; q <= 1; q += 2) bx("sup", 1.0, 0.55, 0.3, 0.4, q * 1.1, 3.65);
      bx("dark", 0.2, 0.75, 1.2, 2.35, 0, 1.85);
      cx("sup", 0.3, 0.26, 0.45, 12, 2.27, 0, 1.85);
      cx("metal", 0.14, 0.1, 5.2, 12, 2.62, 0, 1.85);
      cx("metal", 0.12, 0.12, 0.25, 10, 7.6, 0, 1.85);
      bx("dark", 0.8, 0.6, 0.06, -1.2, 0.5, 3.56);
    }
    var XG = X(PX(808)), tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(XG, 0, deckZ(XG) + 0.02);
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    cz("dark", 2.4, 2.4, 0.06, 24, XG, 0, topZ(XG) - 0.02);

    /* one mesh per material                                                */
    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    /* the middle of the pad's surface, for render3d's deckOf: her after
       eighth is the quarterdeck with the Sea Sparrow box on it, 2.3 m
       below the pad, so the pad is marked (hidden, no geometry)           */
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(X((S_FD0 + S_HG) * 0.5), 0, ZP); G.add(hp);
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e60_corvette"] = {
  len: 133.5,
  build: function (THREE, M, C) { return HeroKnoxFF.build(THREE, M, C); }
};
