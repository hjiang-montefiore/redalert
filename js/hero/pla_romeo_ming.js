/* ============ pla_romeo_ming.js -- HERO model: Type 033 Romeo and Type 035 Ming (PLAN) ============
   Chinese diesel-electric submarines, two screws, surfaced. Full-quality redo, 2026-10-30.
   One builder, two variants (VARIANTS below), each row drawn as the boat it names:
     pla_e60_sub  "Type 033 Romeo" (eras.js, service 1962) -> Project 633 / Type 033, 76.6 m.
     pla_e80_sub  "Type 035 Ming"  (eras.js, service 1974) -> Type 035 (the 035 series), 76.0 m.
   The Romeo is the Project 613 Whiskey's successor and the Ming the Romeo's Chinese development,
   so the kit, the hull method (station tables read column by column off a side elevation, a
   lofted hull with a knife or cone run aft and a full bow), the texture and the merge machinery
   are those of js/hero/ru_whiskey.js. No other file reads these keys or HeroRomeoMing.

   References (Wikimedia Commons, cached in scratchpad/q_romeo_ref; measured on gridded crops):
     dR    "Romeo class SS.svg" at width 1600: colour side elevation, bow right (starboard side),
           also the en-wiki infobox drawing. THE source for every Romeo station: the hull runs
           columns 1-1598 = 1597 px over the published 76.6 m (20.849 px/m). The drawn white
           waterline slopes from row 241 aft to 255 forward; z = 0 is taken at its midlength row
           249. Keel row 351 (4.9 m under it), forefoot row 358 (5.2 m: the published draught
           5.2 m). Casing deck row 205 amidships (2.1 m), fin top row 130 (5.7 m), periscope
           housing top row 79 (8.2 m).
     dM    "Ming class SS.svg" at width 1600: colour side elevation, bow right (starboard side),
           also the en-wiki infobox drawing. THE source for every Ming station: columns 3-1597 =
           1594 px over the published 76.0 m (20.974 px/m). Keel row 344; z = 0 put at row 237.5
           so that the keel lies at the published 5.1 m draught (the drawn boot line, level at
           row 232, then sits 0.26 m over the water: a boot top). Casing deck row 181 (2.7 m),
           fin top row 107.5 (6.2 m), housing top row 51 (8.9 m).
     pM    "Type 035 Submarine Great Wall-175.jpg": a Ming afloat, port side, bow right:
           confirms dM's upper rudder over the stern, the blunt round bow, the long dark hull
           awash, the casing hole row, the fin with its tall mast housing; uniform dark paint
           (sampled about (35,41,53) in shade, a blue haze cast).
     en-wiki "Romeo-class submarine": 76.6 x 6.7 x 5.2 m, 1,475 t surfaced; the Type 033 and its
           Chinese sonars. en-wiki "Type 035 submarine": 76 x 7.6 x 5.1 m.
     (A Romeo photograph -- the Qingdao museum boat -- was asked for and Commons rate-limited it;
      no Romeo photograph is used, so the Romeo's paint is the Whiskey's period grey, below.)

   Recognition list (each one shows on the final sheets):
     Romeo
     1 the long narrow cigar, 76.6 x 6.7 m, its casing deck rising from the stern to row 196 at
       the bow, the keel straight to the forefoot (dR TOP/KEEL tables).
     2 the knife stern with a counter over the rudder and a sole piece under it, as the Whiskey's
       (dR cols 1-62); the stern-tube shutter lens over the rudder (dR 45-120, rows 243-256).
     3 the double-bulb bow: an upper bulb to the stem at row 212 and a lower forefoot bulb to
       row 332, a waist between them at row 300 (dR stem table), with the light sonar windows
       on both bulbs (dR 1515-1596 rows 203-225; 1528-1597 rows 312-350).
     4 the bow sonar dome on the casing forward: a squat round housing and its small stub on top
       (dR 1545-1576, rows 167-196).
     5 the fin: flat-topped, its upper part overhanging the lower at the front (dR 1010 over
       996), the bridge windows across the front top, the flared lip of the after platform, the
       periscope housing box on top with its two periscopes and the radar box between them,
       four masts on the open after part (dR 786-1011, rows 19-205).
     6 three torpedo-tube shutter lenses a side, in two columns (dR 1500-1578, rows 238-290).
     7 the casing free-flood slot row, 2 px slots on a 6 px pitch (dR row 218-224, 126 slots);
       grated openings low on the hull; the grated oval on the flank (dR 433-457).
     8 two screws on lens bossings at shaft row 297; bollards, the vent post forward, rescue
       buoys; the anchor in its recess on the starboard bow (dR 1458-1484).
     Ming
     9 the hull a metre fatter (7.6 m) and deeper, the afterbody a cone: the casing falls aft
       from col 500 (row 181) to the stern tip (row 230) and the keel rises from col 580 (row
       344) to the tip (row 240) (dM TOP/KEEL tables; pM).
    10 the upper rudder over the stern (dM 14-66, rows 181-228; pM) and the big lower rudder and
       skeg under it (dM 8-110, rows 238-335).
    11 the blunt bow: a near-upright stem (col 1597 from row 232 to 308) with round corners top
       and bottom, the outline of the sonar panels on it (dM 1501-1597 rows 293-344 and 1527-
       1597 rows 184-212), a stub post on the casing forward (dM 1561-1570, rows 154-181).
    12 the taller fin: a flat top at row 107.5 (6.2 m), the after edge raked, a low ledge at
       the front foot (dM 1019 over 1029), the bridge windows, the long flared lip of the after
       platform (dM 796-937), a taller wider mast housing (to row 51) with two masts on it,
       three masts on the open after part, the tallest a white whip to row 6.
    13 three tube-shutter lenses a side (dM 1500-1592), the casing hole rows at two heights
       (dM rows 206-208 aft, 199-201 forward, a row of 22 under the fin at 211-213), grated
       openings low on the hull, the grated oval, rescue buoys (tan as drawn), the anchor.
    14 paint: Romeo dark grey over red-brown under the drawn (sloping) boot line, light-grey sonar
       windows; Ming dark green-grey over red-brown under the level boot line.

   Paint, taken to about 0.75-0.85 of level: Romeo dark grey 0x46494c (no Romeo photograph: the
   Whiskey's period grey, ru_whiskey.js; dR draws mid grey), red-brown 0x48281a (dR (120,64,47)
   at 0.6), sonar windows 0x8e8a86 (dR (190,185,180) at 0.75); Ming dark green-grey 0x353a35 (dM
   (52,60,49); pM reads a near-black dark grey), red-brown 0x52291c (dM (121,64,44) at 0.68).
   Not followed: dM's emblem-like white anchor figure (drawn as a plain anchor), its green ring on
   the fin and the white trident shape (markings or artist's colour: not drawn).

   Not confirmed, and so drawn plainly or not at all:
     - the hull plans (no plan drawing): beam 6.7 / 7.6 m (en-wiki) at about 0.7 m / 0.4 m under
       the waterline; casing deck 2.4 / 2.6 m wide; the bow and stern plan curves;
     - the fin plans: 2.7 m (Romeo) and 3.0 m (Ming) wide, round fronted; the housings 1.5 m
       and 1.8 m wide (side views only);
     - the stern planes: drawn behind the screws at shaft height as on the Whiskey (its museum
       model); dR and dM draw a long lens there that is read as the shaft bossing, and do not
       show the planes' span (drawn to +-3.0 / +-3.3 m);
     - the shaft spacing (+-1.6 m) and screws of four blades (radius from the drawn discs:
       1.15 m Romeo, 0.95 m Ming; blade count not countable);
     - the bow planes: dR and dM show only a slot on the casing side (dR 1328-1363, dM 1334-1396)
       -- drawn as a closed plate in its slot;
     - the anchor is drawn on the starboard bow only (the side both drawings show);
     - the Ming's rectangle and oval under the casing edge aft (dM 20-75, rows 228-248) are not
       identified and not drawn;
     - sub_specs.js calls both sterns "cruciform" and gives the Ming "len:76, beam:7.6", the Romeo
       "76.6, 6.7": the lengths and beams agree; the Romeo has no upper rudder in dR (not drawn),
       the Ming has one (dM, pM).
   No hull number, name, flag, star, ensign or text.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. render3d scales a submarine by
   its measured X extent to UNIT_MODELS[key].len, so nothing reaches past the hull ends; it reads
   no named node and the rows are not turret:true, so nothing is named "turret". Merged per
   material (one draw call each). ASCII only in code. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRomeoMing = (function () {
  "use strict";

  var PI = Math.PI;
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* ------------------------------------------------------------------ the two boats
     Tables in drawing px: TOP/KEEL [column, row], STEM [row, forward-most column]. */
  var VARIANTS = {
    romeo: {
      L: 76.6, C0: 1, C1: 1598, WLY: 249, KR: 351, BEAM: 3.35, DECK: 1.20,
      TOP: [[1, 242], [5, 241], [8, 239], [12, 234], [16, 232], [20, 230], [25, 229], [30, 227], [40, 225],
        [50, 223], [60, 222], [80, 219.5], [100, 217.5], [120, 216], [140, 214], [160, 213], [180, 212],
        [200, 211], [250, 208.5], [300, 207], [350, 206], [400, 205], [1050, 205], [1100, 204], [1150, 203],
        [1200, 202], [1250, 200.5], [1300, 199], [1350, 197.5], [1420, 196], [1576, 196], [1581, 200],
        [1592, 204], [1596, 208], [1597.5, 212]],
      KEEL: [[62, 343], [100, 344], [140, 345], [180, 346], [250, 348], [300, 349], [350, 350], [400, 351],
        [1450, 351], [1480, 352], [1500, 354], [1520, 357], [1540, 358], [1560, 357], [1575, 354],
        [1585, 352], [1590, 349], [1594, 344], [1597, 338], [1598, 332]],
      STEM: [[196, 1576], [200, 1581], [204, 1592], [208, 1596], [212, 1597.5], [216, 1596.5], [220, 1595],
        [228, 1592.5], [236, 1590], [244, 1588], [252, 1586.5], [260, 1584], [268, 1582], [276, 1580],
        [284, 1578], [292, 1576], [298, 1575.5], [304, 1579], [308, 1585], [312, 1591], [316, 1594],
        [320, 1596], [326, 1597.5], [334, 1597.5], [340, 1596], [344, 1594], [348, 1591], [352, 1585],
        [356, 1569], [358, 1545]],
      UAP: 62, CTR: 262,                          /* the rudder post column; counter bottom row */
      AFT: 26, AFTP: 1.4, BOW0: 16, BOWDZ: 6, BOWP: [1.6, 0.9],
      ZLO: -5.5, ZHI: 2.7,
      BOOT: [241, 255],                           /* drawn boot line row, stern -> bow */
      PAINT: { hull: 0x46494c, below: 0x48281a, panel: 0x8e8a86, deck: 0x3e4042, buoy: 0x8e2a20 },
      HOLES: [252, 252, 257, 257, 276, 277, 282, 283, 288, 289, 295, 295, 301, 301, 307, 308, 326, 326, 332, 332,
        338, 339, 344, 345, 350, 351, 357, 357, 363, 364, 369, 370, 375, 376, 382, 382, 391, 391, 400, 401, 406, 407,
        413, 413, 419, 419, 425, 426, 431, 432, 437, 438, 444, 444, 450, 451, 455, 456, 466, 466, 475, 475, 479, 480,
        486, 486, 491, 491, 497, 497, 502, 502, 508, 509, 514, 515, 520, 521, 527, 527, 533, 534, 539, 540, 558, 558,
        564, 565, 570, 571, 576, 577, 583, 583, 589, 589, 595, 595, 601, 602, 607, 608, 614, 614, 620, 620, 626, 626,
        644, 645, 651, 651, 657, 658, 662, 662, 668, 669, 674, 675, 681, 681, 687, 687, 696, 696, 705, 706, 712, 712,
        718, 718, 724, 725, 730, 731, 736, 737, 743, 743, 749, 749, 755, 756, 761, 762, 780, 780, 786, 786, 1003, 1004,
        1013, 1013, 1022, 1022, 1028, 1029, 1034, 1035, 1040, 1041, 1047, 1047, 1053, 1053, 1059, 1060, 1065, 1066,
        1071, 1072, 1078, 1078, 1084, 1084, 1090, 1091, 1109, 1109, 1115, 1115, 1121, 1122, 1127, 1128, 1133, 1134,
        1140, 1140, 1146, 1146, 1152, 1153, 1158, 1159, 1164, 1165, 1183, 1184, 1189, 1190, 1195, 1196, 1202, 1202,
        1208, 1209, 1214, 1215, 1220, 1221, 1227, 1227, 1236, 1236, 1245, 1246, 1251, 1252, 1258, 1258, 1264, 1264,
        1270, 1271, 1276, 1277, 1282, 1283, 1288, 1289, 1295, 1295, 1301, 1302, 1307, 1308, 1313, 1314, 1323, 1323,
        1395, 1395, 1417, 1417, 1422, 1422, 1429, 1430, 1434, 1435],
      HOLEROWS: [[0, 9999, 218, 224]],            /* [first col, last col, top row, bottom row] */
      GRATES: [[127, 185, 283, 292], [197, 253, 283, 292], [1340, 1350, 262, 268], [1360, 1370, 262, 268],
        [1386, 1405, 262, 268], [1420, 1510, 341, 350]],
      PANELS: [[1515, 1597, 205, 225], [1528, 1598, 312, 351]],      /* light sonar windows */
      OUTLINES: [],
      OVAL: [445, 247.5, 12, 7.5],                /* grated oval: centre col, row, half-length, half-height */
      SHUTTERS: [[245, 7, 1500, 1530], [263, 7, 1500, 1530], [283, 7, 1500, 1530],
        [245, 7, 1545, 1578], [263, 7, 1545, 1578], [283, 7, 1545, 1576]],
      STUBE: [82, 249.5, 37, 6.5],                /* stern-tube shutter lens: col, row, half-len, half-h px */
      ANCHOR: [1458, 1484, 228, 252],
      BPSLOT: [1328, 1363, 213.5, 217.5],
      SCREW: { col: 98, row: 297, y: 1.6, r: 1.15, boss: [104, 170, 260], br: 0.32, plane: [30, 86], span: 3.0 },
      FIN: { hw: 1.35, ra: 0.5, rings: [[212, 791, 996], [205, 791, 996], [204, 791, 995], [200, 799, 996],
        [196, 802, 996], [188, 805, 996], [180, 806, 996], [173, 807, 997], [171, 807, 1010], [160, 809, 1010],
        [140, 811, 1010], [133, 812, 1009], [130, 812, 1008]],
        lip: [131, 128, 786, 843, 0.15], hous: [130.5, 79, 903, 950, 0.75, 0.30, 0.35],
        win: [988, 1010, 133, 137.5], well: [955, 1001], door: [954, 969, 171, 202], ladder: [855, 132, 190],
        strake: [176, 808, 995], footholes: [[855, 864], [866, 875], [877, 886], [888, 897]], footrow: [190, 200] }
    },
    ming: {
      L: 76.0, C0: 3, C1: 1597, WLY: 237.5, KR: 344, BEAM: 3.80, DECK: 1.30,
      TOP: [[3, 231], [6, 229.5], [16, 227], [40, 222], [70, 217], [100, 212], [130, 208], [160, 203.5],
        [190, 200], [220, 197], [250, 194.5], [300, 190], [350, 186.5], [400, 184], [450, 182], [500, 181],
        [1560, 181], [1572, 181.5], [1582, 182.5], [1589, 184], [1593, 188], [1595, 196], [1596, 204],
        [1597, 232]],
      KEEL: [[3, 236], [8, 240], [40, 252], [80, 264], [110, 274], [130, 279], [160, 282], [190, 285],
        [220, 291], [250, 297], [280, 303], [310, 309], [340, 315], [370, 320], [400, 325], [430, 329],
        [460, 333], [490, 337], [520, 341], [550, 343], [580, 344], [1560, 344], [1574, 340], [1582, 336],
        [1587, 332], [1590, 328], [1593, 324], [1594, 320], [1596, 312], [1597, 300]],
      STEM: [[181, 1560], [184, 1589], [188, 1593], [192, 1594], [196, 1595], [200, 1596], [232, 1597],
        [308, 1597], [312, 1596], [316, 1596], [320, 1594], [324, 1593], [328, 1590], [332, 1587],
        [336, 1582], [340, 1574], [344, 1557]],
      UAP: 0, CTR: 0,
      AFT: 22, AFTP: 1.5, BOW0: 11, BOWDZ: 4, BOWP: [2.3, 1.0],
      ZLO: -5.3, ZHI: 2.9,
      BOOT: [232, 232],
      PAINT: { hull: 0x353a35, below: 0x52291c, panel: 0x353a35, deck: 0x303430, buoy: 0x9a8a68 },
      HOLES: [212, 215, 217, 220, 223, 226, 229, 231, 240, 243, 259, 262, 264, 267, 270, 273, 276, 279, 293, 296,
        298, 301, 317, 320, 323, 326, 334, 337, 340, 342, 345, 348, 351, 354, 357, 359, 375, 378, 381, 384, 387, 389,
        392, 395, 499, 503, 505, 508, 511, 515, 518, 520, 524, 527,
        568, 571, 574, 577, 580, 583, 587, 590, 592, 596, 612, 615, 618, 621, 624, 627, 631, 633, 637, 640, 643, 646,
        649, 652, 655, 658, 661, 665, 668, 671, 687, 690, 693, 696, 699, 702, 705, 708, 711, 715, 718, 720, 724, 727,
        730, 733, 749, 752, 755, 759, 761, 765, 768, 771, 774, 777, 780, 783, 786, 789, 1039, 1042, 1045, 1048, 1051,
        1054, 1057, 1060, 1064, 1067, 1070, 1073, 1090, 1093, 1096, 1099, 1103, 1105, 1108, 1112, 1115, 1118, 1121,
        1124, 1141, 1144, 1147, 1151, 1153, 1156, 1160, 1163, 1166, 1169, 1172, 1175, 1205, 1208, 1211, 1214, 1217,
        1220, 1223, 1226, 1229, 1232, 1235, 1239, 1241, 1245, 1248, 1251, 1268, 1271, 1274, 1277, 1280, 1283, 1287,
        1289,
        847, 850, 852, 855, 858, 860, 863, 866, 869, 872, 875, 878, 881, 885, 887, 891, 894, 897, 899, 902, 905, 907,
        910, 913, 916, 918, 921, 924, 926, 929, 932, 934, 937, 941, 944, 947, 950, 954, 956, 960, 963, 966, 969, 972],
      HOLEROWS: [[0, 540, 205.5, 208.5], [541, 840, 198.5, 201.5], [1000, 1460, 198.5, 201.5], [841, 999, 210.5, 213.5]],
      GRATES: [[237, 298, 259, 272], [368, 452, 297, 308], [1330, 1340, 264, 270], [1360, 1370, 264, 270],
        [1388, 1397, 264, 270], [1348, 1358, 286, 292], [1373, 1383, 286, 292], [1401, 1410, 286, 292],
        [1421, 1497, 331, 342]],
      PANELS: [],
      OUTLINES: [[1501, 1598, 293, 345], [1527, 1598, 184, 212]],   /* sonar panel outlines as drawn */
      OVAL: [438, 236, 13, 8],
      SHUTTERS: [[221, 6, 1500, 1540], [242, 6, 1500, 1540], [263, 6, 1500, 1540],
        [221, 6, 1560, 1592], [242, 6, 1560, 1592], [263, 6, 1560, 1592]],
      STUBE: [110, 256, 40, 6],
      ANCHOR: [1467, 1493, 203, 218],
      BPSLOT: [1334, 1396, 187, 192],
      SCREW: { col: 110, row: 277, y: 1.6, r: 0.95, boss: [118, 175, 235], br: 0.30, plane: [36, 96], span: 3.3 },
      FIN: { hw: 1.50, ra: 0.6, rings: [[188, 793, 1029], [180, 793, 1029], [172, 795, 1029], [164, 798, 1029],
        [156, 800, 1029], [154.5, 800, 1019], [140, 803, 1019], [120, 804, 1016], [107.5, 805, 1018]],
        lip: [114.5, 108, 796, 937, 0.18], hous: [107.8, 51, 907, 963, 0.90, 0.35, 0.60],
        win: [993, 1019, 111, 119], well: [968, 1012], door: [956, 967, 150, 177.5], ladder: null,
        strake: [160, 800, 1028], footholes: [], footrow: null }
    }
  };

  /* ------------------------------------------------- per-boat geometry: the Whiskey's hull method */
  function geo(V) {
    var L = V.L, PXM = (V.C1 - V.C0) / L, WLY = V.WLY;
    function U(x) { return (x - V.C0) / PXM; }       /* drawing column -> metres from the stern */
    function Z(y) { return (WLY - y) / PXM; }        /* drawing row -> metres over the waterline */
    function X(u) { return u - L / 2; }              /* metres from the stern -> model x */
    function mk(tab, fx, fy) { return tab.map(function (p) { return [fx(p[0]), fy(p[1])]; }); }
    var TOP = mk(V.TOP, U, Z), KEEL = mk(V.KEEL, U, Z);
    var STEM = mk(V.STEM, Z, U).reverse();            /* [z, u] by rising z */
    function lerpTab(t, a) {
      var i;
      if (a <= t[0][0]) return t[0][1];
      for (i = 1; i < t.length; i++) if (a <= t[i][0]) {
        var p = t[i - 1], q = t[i]; return p[1] + (q[1] - p[1]) * (a - p[0]) / (q[0] - p[0]);
      }
      return t[t.length - 1][1];
    }
    var UAP = V.UAP ? U(V.UAP) : -1;
    function zTop(u) { return lerpTab(TOP, u); }
    function zKeel(u) {
      if (u < UAP) return Z(V.CTR);                  /* the counter bottom over the rudder */
      return lerpTab(KEEL, u);
    }
    function xStem(z) { return lerpTab(STEM, z); }
    var BEAM = V.BEAM, DECK = V.DECK, ZKR = Z(V.KR + 0.5);
    function planAft(u) { return u >= V.AFT ? 1 : Math.max(0.06, 1 - Math.pow((V.AFT - u) / V.AFT, V.AFTP)); }
    function planBow(u, z) {
      var u0 = L - V.BOW0 + V.BOWDZ * clamp((z + 3) / 4.5, 0, 1);
      if (u <= u0) return 1;
      var p = V.BOWP[0] + V.BOWP[1] * clamp((z + 4) / 5.5, 0, 1), r = clamp((u - u0) / Math.max(0.05, xStem(z) - u0), 0, 1);
      return Math.max(0.004, Math.pow(1 - Math.pow(r, p), 1 / p));
    }
    var NL = 9, NU = 8;
    function section(u) {
      var zt = zTop(u), zk = zKeel(u), zkb = Math.max(zk, ZKR), zb = zkb + 0.6 * (zt - zkb);
      var fa = planAft(u);
      var pts = [], k, t, y, z;
      for (k = 0; k <= NL; k++) {
        t = (PI / 2) * (1 - k / NL);
        y = BEAM * Math.pow(Math.cos(t), 2 / 2.2); z = zb - (zb - zk) * Math.pow(Math.sin(t), 2 / 2.2);
        pts.push([y, z]);
      }
      for (k = 1; k <= NU; k++) {
        t = (PI / 2) * (k / NU);
        y = DECK + (BEAM - DECK) * Math.pow(Math.cos(t), 2 / 2.1); z = zb + (zt - zb) * Math.pow(Math.sin(t), 2 / 2.1);
        pts.push([y, z]);
      }
      pts.push([DECK * 0.5, zt], [0, zt]);
      for (k = 0; k < pts.length; k++) pts[k][0] *= fa * planBow(u, pts[k][1]);
      return pts;
    }
    function hullY(u, z) {
      var s = section(u), k;
      for (k = 1; k < s.length - 2; k++) {
        var a = s[k - 1], b = s[k];
        if ((z - a[1]) * (z - b[1]) <= 0 && a[1] !== b[1]) return a[0] + (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]);
      }
      return 0;
    }
    function hullNA(u, z) {
      var y0 = hullY(u, z - 0.1), y1 = hullY(u, z + 0.1);
      return Math.atan2(y0 - y1, 0.2);
    }
    function vOf(z, port) { var v = clamp((z - V.ZLO) / (V.ZHI - V.ZLO), 0, 1) * 0.5; return port ? v : 1 - v; }
    return { L: L, PXM: PXM, U: U, Z: Z, X: X, zTop: zTop, zKeel: zKeel, xStem: xStem, planAft: planAft,
      planBow: planBow, section: section, hullY: hullY, hullNA: hullNA, vOf: vOf, UAP: UAP };
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function hex(c) { var s = c.toString(16); while (s.length < 6) s = "0" + s; return "#" + s; }

  /* ---------------------------------------------------------------- hull canvas
     u = metres from the stern / L; v by height: port rows run keel (v 0) to the top (v 0.5),
     starboard mirrors it -- so each row is one height. 2048 wide: the casing slots are 0.1 m. */
  var _tex = {};
  function hullTex(THREE, id, V, G) {
    if (_tex[id]) return _tex[id];
    var W = 2048, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(id === "romeo" ? 633 : 35), i, r, k;
    var P = V.PAINT, L = G.L;
    function rowOf(z) { return (1 - G.vOf(z, true)) * H; }
    function colOf(px) { return G.U(px) / L * W; }
    function rect(c0, c1, z1, z0, col) {                         /* both halves */
      var a = rowOf(z1), b = rowOf(z0);
      g.fillStyle = col; g.fillRect(c0, a, c1 - c0, b - a); g.fillRect(c0, H - b, c1 - c0, b - a);
    }
    g.fillStyle = hex(P.hull); g.fillRect(0, 0, W, H);
    /* red-brown under the drawn boot line */
    for (i = 0; i < W; i += 2) rect(i, i + 2, G.Z(V.BOOT[0] + (V.BOOT[1] - V.BOOT[0]) * i / W), V.ZLO - 1, hex(P.below));
    /* plating: faint frame lines and strakes, a mottle of weathering */
    for (i = 0; i < 2600; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.08)";
      g.fillRect(R1() * W, R1() * H, 10 + R1() * 46, 2 + R1() * 5);
    }
    g.fillStyle = "rgba(0,0,0,0.24)";
    for (i = 0; i < W; i += 2.4 / L * W) g.fillRect(Math.round(i), 0, 1, H);
    var ST = [0.45, -1.5, -3.2];
    for (k = 0; k < ST.length; k++) { r = rowOf(ST[k]); g.fillRect(0, r, W, 1); g.fillRect(0, H - r, W, 1); }
    /* grated openings low on the hull: squares about 0.5 m on a 0.62 m pitch */
    for (k = 0; k < V.GRATES.length; k++) {
      var gr = V.GRATES[k], c0 = colOf(gr[0]), c1 = colOf(gr[1]), pitch = 0.62 / L * W, w = 0.50 / L * W;
      for (var c = c0; c + w <= c1 + 0.5; c += pitch) {
        rect(c, c + w, G.Z(gr[2]), G.Z(gr[3]), "rgba(12,9,8,0.62)");
        rect(c + w * 0.45, c + w * 0.55, G.Z(gr[2]), G.Z(gr[3]), "rgba(80,60,50,0.35)");
      }
    }
    /* the grated oval on the flank, as drawn (both sides) */
    var ov = V.OVAL, ocx = colOf(ov[0]), orx = ov[2] / G.PXM / L * W, ocz = G.Z(ov[1]), ozr = ov[3] / G.PXM;
    for (i = -orx; i <= orx; i += 1) {
      var f = Math.sqrt(Math.max(0, 1 - (i * i) / (orx * orx))) * ozr;
      rect(ocx + i, ocx + i + 1, ocz + f, ocz - f, (Math.round(i) % 4 === 0) ? "rgba(70,55,45,0.6)" : "rgba(8,6,5,0.75)");
    }
    /* rust streaks running down from the slot row, sparse */
    for (i = 0; i < 90; i++) {
      var x = 60 + R1() * 1920, z0 = G.zTop(L / 2) - 0.9 - R1() * 0.3, len = 0.3 + R1() * 0.8, hl = len / (V.ZHI - V.ZLO) * H / 2;
      g.fillStyle = "rgba(105,70,49," + (0.06 + R1() * 0.08).toFixed(3) + ")";
      r = rowOf(z0); g.fillRect(x, r, 2, hl); g.fillRect(x, H - r - hl, 2, hl);
    }
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex[id] = t;
    return t;
  }
  /* 4 x 4 m repeat tiles: the casing deck and the fin plating */
  var _tt = {};
  function tileTex(THREE, id, col) {
    if (_tt[id]) return _tt[id];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(id.length * 977 + 33), i;
    var deck = id.indexOf("deck") === 0;
    g.fillStyle = hex(col); g.fillRect(0, 0, W, H);
    if (deck) {
      for (i = 0; i < 70; i++) {
        g.fillStyle = "rgba(105,70,49," + (0.06 + R1() * 0.12).toFixed(3) + ")";
        var w = 6 + R1() * 40; g.fillRect(R1() * W, R1() * H, w, w * (0.3 + R1() * 0.7));
      }
      g.fillStyle = "rgba(0,0,0,0.30)";
      for (i = 0; i < W; i += 32) g.fillRect(i, 0, 1, H);          /* deck plating, 0.5 m slats */
    } else {
      for (i = 0; i < 500; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.08)";
        g.fillRect(R1() * W, R1() * H, 4 + R1() * 18, 2 + R1() * 4);
      }
      g.fillStyle = "rgba(0,0,0,0.32)";                       /* weld seams: 1.0 m courses, 1.6 m plates */
      for (i = 0; i < 4; i++) {
        g.fillRect(0, i * 64, W, 1);
        for (var x = (i & 1) ? 51 : 0; x < W; x += 102) g.fillRect(x, i * 64, 1, 64);
      }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tt[id] = t;
    return t;
  }

  /* ------------------------------------------------------ merge machinery (ru_whiskey.js) */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function put(mat, geo) {
      if (geo.index) geo = geo.toNonIndexed();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        put(mat, geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        put(mat, geo);
      },
      done: function (T, g) {
        var k;
        for (k in by) {
          var list = by[k], n = 0, i, j;
          for (i = 0; i < list.length; i++) n += list[i].attributes.position.count;
          var P = new Float32Array(n * 3), N = new Float32Array(n * 3), UV = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { P[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) UV[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(P, 3));
          G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
          G.setAttribute("uv", new THREE.BufferAttribute(UV, 2));
          var mesh = new THREE.Mesh(G, T[k]);
          mesh.name = "m_" + k;
          mesh.castShadow = true; mesh.receiveShadow = true;
          g.add(mesh);
        }
      }
    };
  }

  /* rings of [y, z] points at increasing x, wound outward; uv per point; optional fan caps */
  function ringLoft(THREE, rings, capA, capB) {
    var N = rings[0].pts.length, pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < rings.length; i++)
      for (j = 0; j < N; j++) {
        pos.push(rings[i].x, rings[i].pts[j][0], rings[i].pts[j][1]);
        uv.push(rings[i].uv[j][0], rings[i].uv[j][1]);
      }
    for (i = 0; i < rings.length - 1; i++)
      for (j = 0; j < N - 1; j++) {
        var a = i * N + j, b = a + N, c = a + 1, d = b + 1;
        idx.push(a, c, b, c, d, b);
      }
    function cap(ri, fwd) {
      var base = pos.length / 3, cy = 0, cz = 0, k, R = rings[ri];
      for (k = 0; k < N - 1; k++) { cy += R.pts[k][0]; cz += R.pts[k][1]; }
      pos.push(R.x, cy / (N - 1), cz / (N - 1)); uv.push(R.uv[0][0], 0.25);
      for (k = 0; k < N; k++) { pos.push(R.x, R.pts[k][0], R.pts[k][1]); uv.push(R.uv[k][0], R.uv[k][1]); }
      for (k = 0; k < N - 1; k++) {
        if (fwd) idx.push(base, base + 1 + k, base + 2 + k); else idx.push(base, base + 2 + k, base + 1 + k);
      }
    }
    if (capA) cap(0, false);
    if (capB) cap(rings.length - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* vertical shell over plan outlines (CCW from above), top capped; uv in 4 m tiles */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, Lr = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < Lr; i++) {
      var arc = 0;
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        if (j > 0) { var o = rings[i].pts[j - 1]; arc += Math.hypot(p[0] - o[0], p[1] - o[1]); }
        pos.push(p[0], p[1], rings[i].z); uv.push(arc / 4, rings[i].z / 4);
      }
    }
    for (i = 0; i < Lr - 1; i++)
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    var base = pos.length / 3, cx = 0, cy = 0, k, top = rings[Lr - 1];
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    pos.push(cx / N, cy / N, top.z); uv.push(cx / N / 4, cy / N / 4);
    for (k = 0; k < N; k++) { p = top.pts[k]; pos.push(p[0], p[1], top.z); uv.push(p[0] / 4, p[1] / 4); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* rounded-rectangle plan from x0 (aft) to x1 (fore), half-width hw, after corner radius ra,
     fore corner radius rf (rf = hw gives a round front, kept 4 mm short of it so every ring
     has the same 28 points); CCW from above */
  function rplan(x0, x1, hw, ra, rf) {
    var pts = [], n = 6, i, a;
    ra = Math.min(ra, hw - 0.004); rf = Math.min(rf, hw - 0.004);   /* same point count on every ring */
    var cs = [[x1 - rf, -(hw - rf), -PI / 2, rf], [x1 - rf, hw - rf, 0, rf],
              [x0 + ra, hw - ra, PI / 2, ra], [x0 + ra, -(hw - ra), PI, ra]];
    for (var k = 0; k < 4; k++) {
      for (i = 0; i <= n; i++) {
        a = cs[k][2] + (PI / 2) * i / n;
        pts.push([cs[k][0] + cs[k][3] * Math.cos(a), cs[k][1] + cs[k][3] * Math.sin(a)]);
      }
    }
    return pts;
  }
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);                     /* y -> z, thickness toward -y */
    g.computeVertexNormals();
    return g;
  }
  function strut(THREE, A, mat, r, a, b, seg, r2) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg || 8, 1, false), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function box(THREE, A, mat, sx, sy, sz, x, y, z, rx, rz) {
    A.add(mat, new THREE.BoxGeometry(sx, sy, sz), x, y, z, rx || 0, 0, rz || 0);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  function materials(THREE, C, id, V, G) {
    var team = (C && C.team) || 0x3f7fd0, P = V.PAINT;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, id, V, G), roughness: 0.82, metalness: 0.08 }),
      deck:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, "deck_" + id, P.deck), roughness: 0.92, metalness: 0.05 }),
      plate:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, "plate_" + id, P.hull), roughness: 0.82, metalness: 0.08 }),
      below:  std(P.below, 0.85, 0.05),       /* rudders, planes, bossings: anti-fouling */
      panel:  std(id === "romeo" ? P.panel : P.hull, 0.70, 0.05),  /* the Romeo's light sonar dome */
      dark:   std(0x0b0c0d, 0.85, 0.10),      /* holes, windows, shutters, recesses */
      metal:  std(0x34373a, 0.55, 0.40),      /* posts, fittings, the anchor */
      mastlt: std(0x8c9195, 0.45, 0.45),      /* bright periscopes and masts (both drawings draw them light) */
      screw:  std(0x8a7140, 0.42, 0.70),      /* bronze */
      buoy:   std(P.buoy, 0.70, 0.05),        /* rescue buoy domes (red dR, tan dM) */
      team:   std(team, 0.86, 0.06)
    };
  }

  function build(THREE, M, C, id) {
    var V = VARIANTS[id], G = geo(V);
    var U = G.U, Z = G.Z, X = G.X, L = G.L, zTop = G.zTop, hullY = G.hullY, hullNA = G.hullNA;
    var g = new THREE.Group();
    var T = materials(THREE, C || {}, id, V, G);
    var A = Acc(THREE);
    var i, j, k, u;

    /* ---- hull loft: finer toward the ends, at the counter step and through the bow bulbs ---- */
    var us = [0.0, 0.05, 0.12, 0.2, 0.3, 0.45, 0.7, 1.0, 1.4, 1.8, 2.2, 3.0, 3.6, 4.3];
    if (G.UAP > 0) us.push(G.UAP - 0.01, G.UAP + 0.01);
    u = 5.0;
    while (u < L - 0.05) {
      us.push(u);
      var ub = L - u;
      u += u < 14 ? 1.0 : (ub > 22 ? 2.5 : (ub > 12 ? 1.0 : (ub > 4 ? 0.6 : (ub > 1.5 ? 0.3 : (ub > 0.5 ? 0.12 : 0.06)))));
    }
    us.push(L - 0.03, L);
    us.sort(function (a, b) { return a - b; });
    var rings = [], last = -1;
    for (i = 0; i < us.length; i++) {
      if (us[i] - last < 0.02) continue;
      last = us[i];
      var s = G.section(us[i]), pts = [], uvs = [], uu = us[i] / L;
      for (j = 0; j < s.length; j++) { pts.push([s[j][0], s[j][1]]); uvs.push([uu, G.vOf(s[j][1], true)]); }
      for (j = s.length - 2; j >= 0; j--) { pts.push([-s[j][0], s[j][1]]); uvs.push([uu, G.vOf(s[j][1], false)]); }
      rings.push({ x: X(us[i]), pts: pts, uv: uvs });
    }
    A.add("skin", ringLoft(THREE, rings, true, true), 0, 0, 0);

    /* ---- casing deck: a flat strip 2 cm over the hull's deck, stern to the bow nose ---- */
    var dps = [], dix = [], duv = [], n = 0, uEnd = U(V.STEM[0][1]) - 0.3;
    for (u = 1.2; u <= uEnd + 0.01; u += (u > uEnd - 3 ? 0.3 : 1.0)) {
      var hw = V.DECK * G.planAft(u) * G.planBow(u, zTop(u)) - 0.04;
      if (hw < 0.05) break;
      var zd = zTop(u) + 0.02;
      dps.push(X(u), hw, zd, X(u), -hw, zd); duv.push(u / 4, hw / 4, u / 4, -hw / 4);
      if (n > 0) { var b0 = (n - 1) * 2; dix.push(b0, b0 + 1, b0 + 2, b0 + 1, b0 + 3, b0 + 2); }
      n++;
    }
    var dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(dps, 3));
    dg.setAttribute("uv", new THREE.Float32BufferAttribute(duv, 2));
    dg.setIndex(dix); dg.computeVertexNormals();
    A.add("deck", dg, 0, 0, 0);

    /* ---- patches laid 1-2 cm proud of the hull side, both sides: [u0, u1] x [z0, z1] ---- */
    function hullPatch(mat, ua, ub, za, zb, nu, nz, off) {
      var pos = [], idx = [], side, a2, b2, r0, c0;
      for (side = -1; side <= 1; side += 2) {
        var base = pos.length / 3;
        for (a2 = 0; a2 <= nu; a2++) for (b2 = 0; b2 <= nz; b2++) {
          var pu = ua + (ub - ua) * a2 / nu, pz = za + (zb - za) * b2 / nz;
          pos.push(X(pu), side * (hullY(pu, pz) + off), pz);
        }
        for (a2 = 0; a2 < nu; a2++) for (b2 = 0; b2 < nz; b2++) {
          r0 = base + a2 * (nz + 1) + b2; c0 = r0 + nz + 1;          /* r0 (u0,z0), c0 (u1,z0) */
          if (side > 0) idx.push(r0, c0 + 1, c0, r0, r0 + 1, c0 + 1);
          else idx.push(r0, c0, c0 + 1, r0, c0 + 1, r0 + 1);
        }
      }
      var pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      pg.setIndex(idx); pg.computeVertexNormals();
      A.add(mat, pg, 0, 0, 0);
    }
    /* the casing free-flood slots, column by column as drawn (dR / dM hole rows) */
    for (k = 0; k < V.HOLES.length; k += 2) {
      var h0 = V.HOLES[k], h1 = V.HOLES[k + 1], hr = null;
      for (i = 0; i < V.HOLEROWS.length; i++) if (h0 >= V.HOLEROWS[i][0] && h0 <= V.HOLEROWS[i][1]) { hr = V.HOLEROWS[i]; break; }
      if (!hr) continue;
      var hua = U(h0 - 0.5), hub = Math.max(U(h1 + 0.5), hua + 0.09);
      hullPatch("dark", hua, hub, Z(hr[3]), Z(hr[2]), 1, 1, 0.012);
    }
    /* the Romeo's light sonar windows on both bow bulbs (dR), the Ming's drawn panel outlines (dM) */
    for (k = 0; k < V.PANELS.length; k++) {
      var pn = V.PANELS[k];
      hullPatch("panel", U(pn[0]), Math.min(U(pn[1]), L - 0.02), Z(pn[3]), Z(pn[2]), 24, 10, 0.08);
    }
    for (k = 0; k < V.OUTLINES.length; k++) {
      var ol = V.OUTLINES[k], oa = U(ol[0]), ob = Math.min(U(ol[1]), L - 0.02), oz0 = Z(ol[3]), oz1 = Z(ol[2]);
      hullPatch("dark", oa, ob, oz1 - 0.07, oz1, 28, 1, 0.03);
      hullPatch("dark", oa, ob, oz0, oz0 + 0.07, 28, 1, 0.03);
      hullPatch("dark", oa, oa + 0.07, oz0, oz1, 1, 10, 0.03);
    }

    /* ---- the bow: three torpedo-tube shutter lenses a side, two columns as drawn ---- */
    for (k = 0; k < V.SHUTTERS.length; k++) {
      var SH = V.SHUTTERS[k], sz = Z(SH[0]), sa = U(SH[2]), sb = Math.min(U(SH[3]), G.xStem(sz) - 0.3), nsg = 5;
      if (sb - sa < 0.3) continue;
      for (j = 0; j < nsg; j++) {
        var s0 = sa + (sb - sa) * j / nsg, s1 = sa + (sb - sa) * (j + 1) / nsg, smid = (s0 + s1) / 2;
        var sy0 = hullY(s0, sz), sy1 = hullY(s1, sz), syy = hullY(smid, sz), yaw = Math.atan2(sy0 - sy1, s1 - s0);
        var hh = (SH[1] / G.PXM) * Math.sin(PI * (j + 0.5) / nsg) + 0.04;
        for (i = -1; i <= 1; i += 2) {
          A.add("dark", new THREE.BoxGeometry(Math.hypot(s1 - s0, sy1 - sy0), 0.05, 0.05), X(smid), i * (syy + 0.035), sz + hh, 0, 0, -i * yaw);
          A.add("dark", new THREE.BoxGeometry(Math.hypot(s1 - s0, sy1 - sy0), 0.05, 0.05), X(smid), i * (syy + 0.035), sz - hh, 0, 0, -i * yaw);
        }
      }
    }
    /* ---- the bow-plane slot on the casing side, its plane closed in it ---- */
    var bs = V.BPSLOT, bpa = U(bs[0]), bpb = U(bs[1]), bpm = (bpa + bpb) / 2, bpz = Z((bs[2] + bs[3]) / 2);
    for (i = -1; i <= 1; i += 2) {
      box(THREE, A, "dark", bpb - bpa, 0.05, (bs[3] - bs[2]) / G.PXM, X(bpm), i * (hullY(bpm, bpz) + 0.005), bpz, i * hullNA(bpm, bpz));
      box(THREE, A, "plate", (bpb - bpa) * 0.8, 0.06, (bs[3] - bs[2]) / G.PXM * 0.5, X(bpm + 0.1), i * (hullY(bpm, bpz) + 0.03), bpz, i * hullNA(bpm, bpz));
    }
    /* ---- the anchor in its recess on the starboard bow (the side both drawings show) ---- */
    var an = V.ANCHOR, au = U((an[0] + an[1]) / 2), az = Z((an[2] + an[3]) / 2), ay = hullY(au, az), aN = hullNA(au, az);
    box(THREE, A, "dark", (an[1] - an[0]) / G.PXM, 0.06, (an[3] - an[2]) / G.PXM, X(au), -(ay + 0.01), az, -aN);
    box(THREE, A, "metal", 0.10, 0.10, (an[3] - an[2]) / G.PXM * 0.6, X(au), -(ay + 0.04), az + 0.05, -aN);
    box(THREE, A, "metal", (an[1] - an[0]) / G.PXM * 0.7, 0.10, 0.12, X(au), -(ay + 0.04), az - (an[3] - an[2]) / G.PXM * 0.25, -aN);

    /* ---- stern: the stern-tube shutter lens a side (2 stern tubes on both types) ---- */
    var stb = V.STUBE;
    for (i = -1; i <= 1; i += 2) {
      var tu = U(stb[0]), tz = Z(stb[1]), ty = hullY(tu, tz);
      if (ty < 0.3) continue;
      A.add("dark", new THREE.SphereGeometry(1.0, 12, 6), X(tu), i * (ty + 0.01), tz, i * hullNA(tu, tz), 0, 0, [stb[2] / G.PXM, 0.05, stb[3] / G.PXM]);
      A.add("below", new THREE.SphereGeometry(1.0, 12, 6), X(tu), i * (ty + 0.03), tz, i * hullNA(tu, tz), 0, 0, [stb[2] / G.PXM * 0.9, 0.05, stb[3] / G.PXM * 0.78]);
    }

    function plateXZ(mat, list, th) {
      var pg = ext(THREE, list.map(function (p) { return [X(U(p[0])), Z(p[1])]; }), th, true);
      pg.translate(0, th / 2, 0);
      A.add(mat, pg, 0, 0, 0);
    }
    if (id === "romeo") {
      /* ---- rudder under the counter, sole piece under it (dR 7-57, rows 262-331; 331-344) ---- */
      plateXZ("below", [[7, 262], [57, 262], [57, 331], [7, 331]], 0.36);
      plateXZ("below", [[9, 331], [9, 336.5], [60, 343.5], [96, 344.5], [96, 341], [62, 331]], 0.40);
    } else {
      /* ---- the big lower rudder and skeg (dM 8-110, rows 238-335) ---- */
      plateXZ("below", [[8, 238], [8, 330], [13, 335], [72, 335], [86, 324], [95, 302], [101, 288], [112, 275],
        [80, 262], [40, 250]], 0.42);
      /* the upper rudder over the stern (dM 14-80, rows 181-229; pM) */
      plateXZ("plate", [[23, 181], [62, 181], [64, 198], [66, 212], [80, 218.5], [14, 229.5], [17, 214], [21, 194]], 0.40);
    }

    /* ---- two screws on lens bossings, the stern planes behind them ---- */
    var bl = [[-0.10, 0.20], [-0.26, 0.45], [-0.34, 0.72], [-0.24, 0.93], [0.02, 1.0], [0.22, 0.86], [0.24, 0.58], [0.10, 0.22]];
    function screw(ux, y, z, rad) {
      cylX(THREE, A, "screw", 0.22, 0.13, 0.6, 14, X(ux), y, z);
      A.add("screw", new THREE.SphereGeometry(0.13, 10, 6), X(ux - 0.30), y, z);
      for (var b = 0; b < 4; b++) {
        var gb = ext(THREE, bl.map(function (p) { return [p[0] * rad, p[1] * rad]; }), 0.05);
        gb.translate(0, 0, -0.025);
        gb.rotateY(0.8);
        A.add("screw", gb, X(ux), y, z, b * PI / 2 + 0.4, 0, 0);
      }
    }
    var SC = V.SCREW, SZ = Z(SC.row), SY = SC.y;
    var bq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0));
    for (i = -1; i <= 1; i += 2) {
      var bA = U(SC.boss[0]), bM = U(SC.boss[1]), bB = U(SC.boss[2]);
      A.addQ("below", new THREE.CylinderGeometry(SC.br, 0.20, bM - bA, 14, 1, false), X((bA + bM) / 2), i * SY, SZ, bq);
      A.addQ("below", new THREE.CylinderGeometry(0.12, SC.br, bB - bM, 14, 1, false), X((bM + bB) / 2), i * SY, SZ, bq);
      cylX(THREE, A, "metal", 0.10, 0.10, 0.6, 10, X(U(SC.col) + 0.2), i * SY, SZ);
      screw(U(SC.col), i * SY, SZ, SC.r);
      var pA = U(SC.plane[0]), pB = U(SC.plane[1]), pm2 = (pA + pB) / 2;
      var y0 = Math.max(0.2, hullY(pm2, SZ) - 0.1), sp = [[X(pA), i * y0], [X(pB), i * y0], [X(pB - 0.4), i * SC.span], [X(pA + 0.5), i * SC.span]];
      if (i < 0) sp.reverse();
      var spg = ext(THREE, sp, 0.16); spg.translate(0, 0, SZ - 0.08);
      A.add("below", spg, 0, 0, 0);
    }

    /* ---- the fin: level rings read off the drawing, top capped ---- */
    var F = V.FIN, fr = [];
    for (i = 0; i < F.rings.length; i++) {
      var fz = F.rings[i];
      fr.push({ z: Z(fz[0]), pts: rplan(X(U(fz[1])), X(U(fz[2])), F.hw, F.ra, F.hw) });
    }
    A.add("plate", shell(THREE, fr), 0, 0, 0);
    var ZT = Z(F.rings[F.rings.length - 1][0]);
    /* the flared lip of the after platform */
    var lp = F.lip;
    A.add("plate", shell(THREE, [{ z: Z(lp[0]), pts: rplan(X(U(lp[2])), X(U(lp[3])), F.hw + 0.02, F.hw, 0.3) },
      { z: Z(lp[1]), pts: rplan(X(U(lp[2])), X(U(lp[3])), F.hw + lp[4], F.hw + lp[4], 0.3) }]), 0, 0, 0);
    /* the periscope housing on top */
    var ho = F.hous;
    A.add("plate", shell(THREE, [{ z: Z(ho[0]), pts: rplan(X(U(ho[2])), X(U(ho[3])), ho[4], ho[5], ho[6]) },
      { z: Z(ho[1]), pts: rplan(X(U(ho[2])), X(U(ho[3])), ho[4] - 0.02, ho[5], ho[6]) }]), 0, 0, 0);
    /* the bridge well in the forward part of the top (open, men stand in it) */
    box(THREE, A, "dark", U(F.well[1]) - U(F.well[0]), F.hw * 1.3, 0.04, X((U(F.well[1]) + U(F.well[0])) / 2), 0, ZT + 0.02);
    /* fin side details: bridge windows, the door, the strake, foot holes, ladder */
    function finY(uu, zz) {
      var xf = U(F.rings[F.rings.length - 2][2]) - F.hw;
      if (uu <= xf) return F.hw;
      return Math.sqrt(Math.max(0, F.hw * F.hw - (uu - xf) * (uu - xf)));
    }
    var wi = F.win, wz = Z((wi[2] + wi[3]) / 2), wh = (wi[3] - wi[2]) / G.PXM, wa = U(wi[0]), wb = U(wi[1]);
    for (k = 0; k < 3; k++) {
      var wu = wa + (wb - wa) * (k + 0.5) / 3, wy = finY(wu, wz), wyaw = Math.atan2(finY(wu + 0.05, wz) - finY(wu - 0.05, wz), 0.1);
      for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", (wb - wa) / 3 * 0.8, 0.05, wh, X(wu), i * (wy + 0.01), wz, 0, i * wyaw);
    }
    box(THREE, A, "dark", 0.05, F.hw * 1.1, wh, X(U(F.rings[F.rings.length - 2][2])) + 0.01, 0, wz);    /* the front windows */
    var dr = F.door, du = (U(dr[0]) + U(dr[1])) / 2;
    for (i = -1; i <= 1; i += 2) {
      box(THREE, A, "dark", U(dr[1]) - U(dr[0]), 0.04, (dr[3] - dr[2]) / G.PXM, X(du), i * (F.hw + 0.005), Z((dr[2] + dr[3]) / 2));
      box(THREE, A, "plate", U(dr[1]) - U(dr[0]) - 0.1, 0.05, (dr[3] - dr[2]) / G.PXM - 0.1, X(du), i * (F.hw + 0.012), Z((dr[2] + dr[3]) / 2));
      var sk = F.strake;
      box(THREE, A, "dark", U(sk[2]) - U(sk[1]) - F.hw, 0.04, 0.05, X((U(sk[1]) + U(sk[2]) - F.hw) / 2), i * (F.hw + 0.01), Z(sk[0]));
      for (k = 0; k < F.footholes.length; k++) {
        var fh = F.footholes[k], fhu = (U(fh[0]) + U(fh[1])) / 2;
        A.add("dark", new THREE.SphereGeometry(1.0, 10, 6), X(fhu), i * (F.hw + 0.01), Z((F.footrow[0] + F.footrow[1]) / 2), 0, 0, 0,
          [(U(fh[1]) - U(fh[0])) / 2, 0.04, (F.footrow[1] - F.footrow[0]) / G.PXM / 2]);
      }
      if (F.ladder) for (k = 0; k * 4.5 + F.ladder[1] < F.ladder[2]; k++)
        box(THREE, A, "metal", 0.30, 0.08, 0.04, X(U(F.ladder[0])), i * (F.hw + 0.04), Z(F.ladder[1] + k * 4.5));
    }

    /* ---- masts as drawn (columns, tops by row), all on the centreline ---- */
    var ZH = Z(ho[1]) - 0.05, ZF = ZT - 0.05;
    function mc(c) { return X(U(c)); }
    if (id === "romeo") {
      strut(THREE, A, "mastlt", 0.12, [mc(851.5), 0, ZF], [mc(851.5), 0, Z(60)], 8, 0.10);          /* the tall whip aerial */
      strut(THREE, A, "metal", 0.05, [mc(851.5), 0, Z(60)], [mc(851.5), 0, Z(19)], 6, 0.025);
      strut(THREE, A, "mastlt", 0.09, [mc(864), 0, ZF], [mc(864), 0, Z(108)], 8);                   /* short mast */
      A.add("mastlt", new THREE.SphereGeometry(0.09, 8, 4), mc(864), 0, Z(108));
      strut(THREE, A, "mastlt", 0.12, [mc(877), 0, ZF], [mc(877), 0, Z(74)], 8);                    /* the flame-headed mast */
      A.add("mastlt", new THREE.ConeGeometry(0.24, Z(64) - Z(74), 10), mc(877), 0, (Z(64) + Z(74)) / 2, PI / 2, 0, 0);
      strut(THREE, A, "mastlt", 0.17, [mc(892.5), 0, ZF], [mc(892.5), 0, Z(62)], 10);              /* snorkel head */
      cylZ(THREE, A, "metal", 0.21, 0.21, Z(51) - Z(62), 10, mc(892.5), 0, (Z(51) + Z(62)) / 2);
      A.add("metal", new THREE.SphereGeometry(0.21, 10, 5, 0, 2 * PI, 0, PI / 2), mc(892.5), 0, Z(51), PI / 2, 0, 0);
      var PS = [912.5, 942];                                                                         /* the two periscopes */
      for (k = 0; k < 2; k++) {
        strut(THREE, A, "mastlt", 0.10, [mc(PS[k]), 0, ZH], [mc(PS[k]), 0, Z(50)], 10);
        strut(THREE, A, "metal", 0.05, [mc(PS[k]), 0, Z(50)], [mc(PS[k]), 0, Z(37)], 6, 0.035);
      }
      strut(THREE, A, "metal", 0.12, [mc(927), 0, ZH], [mc(927), 0, Z(74)], 8);                     /* radar box on its stalk */
      box(THREE, A, "metal", U(936) - U(919), 0.62, Z(60) - Z(74), mc(927.5), 0, (Z(60) + Z(74)) / 2);
    } else {
      strut(THREE, A, "mastlt", 0.18, [mc(856), 0, ZF], [mc(856), 0, Z(6)], 10, 0.15);              /* the tall white whip */
      strut(THREE, A, "mastlt", 0.12, [mc(880.5), 0, ZF], [mc(880.5), 0, Z(46)], 8);                /* the hooked mast */
      A.add("metal", new THREE.TorusGeometry(0.22, 0.04, 6, 12, PI * 1.3), mc(880.5) + 0.05, 0, Z(38), PI / 2, 0, 0);
      strut(THREE, A, "mastlt", 0.17, [mc(895.5), 0, ZF], [mc(895.5), 0, Z(37)], 10);               /* the lamp bar mast */
      box(THREE, A, "metal", U(902.5) - U(887.5), 0.16, Z(34) - Z(37), mc(895), 0, (Z(34) + Z(37)) / 2);
      cylZ(THREE, A, "metal", 0.15, 0.15, Z(28) - Z(34), 10, mc(895.5), 0, (Z(28) + Z(34)) / 2);
      A.add("metal", new THREE.SphereGeometry(0.15, 10, 5, 0, 2 * PI, 0, PI / 2), mc(895.5), 0, Z(28), PI / 2, 0, 0);
      strut(THREE, A, "mastlt", 0.09, [mc(919), 0, ZH], [mc(919), 0, Z(36)], 10);                   /* on the housing */
      strut(THREE, A, "metal", 0.04, [mc(919), 0, Z(36)], [mc(919), 0, Z(9)], 6, 0.025);
      strut(THREE, A, "mastlt", 0.08, [mc(950), 0, ZH], [mc(950), 0, Z(32)], 10);
      strut(THREE, A, "metal", 0.04, [mc(950), 0, Z(32)], [mc(950), 0, Z(22)], 6, 0.025);
    }

    /* ---- casing fittings ---- */
    function bollards(c) {
      var bu = U(c), zb0 = zTop(bu);
      for (var s2 = -1; s2 <= 1; s2 += 2) {
        cylZ(THREE, A, "metal", 0.10, 0.10, 0.38, 8, X(bu), s2 * 0.62, zb0 + 0.19);
        cylZ(THREE, A, "metal", 0.15, 0.15, 0.05, 8, X(bu), s2 * 0.62, zb0 + 0.38);
      }
    }
    function rescueBuoy(c, r) {
      var bu = U(c), zr = zTop(bu) + 0.03;
      A.add("metal", new THREE.CylinderGeometry(r + 0.14, r + 0.17, 0.10, 20), X(bu), 0, zr, PI / 2, 0, 0);
      A.add("buoy", new THREE.SphereGeometry(r, 14, 6, 0, 2 * PI, 0, PI / 2), X(bu), 0, zr + 0.05, PI / 2, 0, 0, [1, 0.6, 1]);
    }
    if (id === "romeo") {
      /* the bow sonar dome: a squat round housing and its stub (dR 1545-1576, rows 167-196) */
      var du2 = U(1560.5), dz0 = zTop(du2) - 0.1;
      cylZ(THREE, A, "panel", 0.68, 0.74, Z(180) - dz0, 22, X(du2), 0, (Z(180) + dz0) / 2);
      A.add("panel", new THREE.SphereGeometry(0.68, 22, 4, 0, 2 * PI, 0, PI / 2), X(du2), 0, Z(180), PI / 2, 0, 0, [1, 0.12, 1]);
      cylZ(THREE, A, "panel", 0.19, 0.20, Z(170) - Z(180), 12, X(U(1568)), 0, (Z(170) + Z(180)) / 2);
      A.add("panel", new THREE.SphereGeometry(0.19, 12, 5, 0, 2 * PI, 0, PI / 2), X(U(1568)), 0, Z(170), PI / 2, 0, 0, [1, 0.8, 1]);
      bollards(197); bollards(203); bollards(1473); bollards(1479);
      rescueBuoy(255, 0.30); rescueBuoy(1237, 0.30);
      cylZ(THREE, A, "metal", 0.14, 0.15, Z(188) - zTop(U(1403)) + 0.05, 8, X(U(1403)), 0, (Z(188) + zTop(U(1403))) / 2);  /* vent post */
      A.add("metal", new THREE.SphereGeometry(0.15, 8, 4, 0, 2 * PI, 0, PI / 2), X(U(1403)), 0, Z(188), PI / 2, 0, 0);
    } else {
      rescueBuoy(283, 0.40); rescueBuoy(1247.5, 0.27);
      box(THREE, A, "metal", U(318) - U(308), 0.7, 0.16, X(U(313)), 0, zTop(U(313)) + 0.06);       /* low hatch hump */
      strut(THREE, A, "metal", 0.20, [X(U(1565.5)), 0, zTop(U(1565.5)) - 0.05], [X(U(1565.5)), 0, Z(154)], 8, 0.12);  /* bow stub post */
      bollards(1440); bollards(1452);
    }

    /* ---- modest team strips: two flat panels on the casing, 2 cm over the deck strip ---- */
    box(THREE, A, "team", 2.6, 0.9, 0.04, X(0.84 * L), 0, zTop(0.84 * L) + 0.05);
    box(THREE, A, "team", 2.6, 0.9, 0.04, X(0.29 * L), 0, zTop(0.29 * L) + 0.05);

    A.done(T, g);
    return g;
  }

  return { build: build, VARIANTS: VARIANTS };
})();

/* len is each boat's true length: render3d scales a submarine by its measured X extent to it. */
UNIT_MODELS["pla_e60_sub"] = {
  len: 76.6,
  build: function (THREE, M, C) { return HeroRomeoMing.build(THREE, M, C, "romeo"); }
};
UNIT_MODELS["pla_e80_sub"] = {
  len: 76.0,
  build: function (THREE, M, C) { return HeroRomeoMing.build(THREE, M, C, "ming"); }
};
