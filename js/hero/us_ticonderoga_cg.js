/* ============================================================================
   us_ticonderoga_cg.js -- HERO model: the Ticonderoga-class guided missile
   cruiser, CG-47 and her sisters, in the three periods the roster draws her.
   The second, detailed build: the hull and the layout of the first are kept,
   the superstructure and every fitting on it are drawn again.

     cruiser_n         the class today (the VLS ships, CG-52 and on), the
                       Phalanx in its Block 1B fit with the FLIR on its side
     nato_e80_cruiser  USS Ticonderoga (CG-47) as built: Mk 26 twin-arm
                       launchers fore and aft (CG-47 to CG-51), whaleboats
     nato_e90_cruiser  the class from CG-52 on: two Mk 41 vertical launching
                       systems in the same hull, 1990s and 2000s

   References: the US Navy line drawing "Ticonderoga class cruiser with
   weapons and sensors" (1994), which names every sensor and where it
   stands; the Commons class profile; the starboard broadside of USS Port
   Royal (CG-73) off California (DVIC); the bow quarters of USS Thomas S.
   Gates (CG-51) at UNITAS 46-05, USS Chancellorsville (CG-62) and USS Bunker
   Hill (CG-52) in the Arabian Gulf (2011); the 1982 sea trials photograph of
   CG-47 from her port bow (DN-SC-84-00167); and the overhead of USS Hue City
   (CG-66) alongside USS Sylvania. Published figures: 172.8 m (567 ft)
   overall, 16.8 m (55 ft) beam, 9.5 m (31 ft) draught to the bottom of the
   sonar dome, 9,600 to 9,800 tons full load.

   What the photographs fixed that the first build had wrong or left out:

     - The forward deckhouse is ONE tall block, flush from the main deck to
       the pilot house roof at about 21.6 m, its walls leaning in. Its two
       forward corners are broad 45-degree faces and the SPY-1 octagons sit
       on them high up, centred 15.6 m up at the 03 level, just under the
       pilot house band. The pilot house windows run round the top
       of the block under a sun brow, on the front, both corners and the
       forward end of the sides; a small open wing stands out each side.
     - Abaft that block the house steps down twice. On its roof stand the
       forward uptakes (a pair of big round exhausts and the generator's
       small one, their tops sooted black), the pole mast with the SPS-55 at
       its head, and the SPQ-9 radome on its own little lattice tower; two
       SPG-62 illuminators on pedestals stand on the pilot house roof.
     - The drawing's leader for "2 MK 15 CIWS (P/S)" ends at the after end of
       the forward deckhouse: the two Phalanx stand there, one each side, on
       raised tubs. The SLQ-32(V)3 houses are on the sides of the same house
       a level lower.
     - The big lattice mast stands in the waist between the deckhouses, its
       after legs raked forward, with a long yard, a platform and radome at
       its head, and the SPS-49 on a bracket out of its after face. A tall
       whip stands on the after uptake casing.
     - The after deckhouse: the hangar block with two roller doors onto the
       flight deck, a narrower tower on it with the two after SPY-1 faces on
       its after corners, the after uptakes with the second pair of SPG-62
       illuminators - one low at the after end, one raised on a column
       among the stacks - and (from the 1990s) a SATCOM dome either side.
     - Boats in davits each side of the waist, life rafts in rows on the
       house sides, the Mk 32 tubes behind shutters in the side of the
       flight deck block (the drawing's leader), four SRBOC launchers, the
       flight deck's safety nets, two anchors in hawses on the bows.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -6.4
   and the dome to -9.5. render3d.js stands the model up with
   rotation.x = -PI/2 and scales it by its measured X extent, so nothing may
   stand past the stem or the transom: the barrels are inside both.

   Materials (10): painted hull, non-skid deck, deckhouse plate, flight deck,
   VLS lids, radome white, black, bare metal, glass and the team material,
   which is exactly C.team because this key stands in for every cruiser that
   has no model of its own and eraPaint only spares a material that matches
   the team colour. No colour is converted here for the same reason: prepModel
   does it, once, for the whole model.

   Every static part is merged into one mesh per material: the hull, the
   deck, eight batches and the forward 5-inch's three, thirteen draws in all.
   The fantail - the aft eighth, where render3d.js reads the level a deck
   machine stands at - carries no rail posts. ASCII only -- a stray byte in a
   hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTiconderogaCG = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 172.8, XB = LOA * 0.5;
  var HB = 8.4;                 /* half beam                                 */
  var DR = 6.4;                 /* hull draught, the dome hangs below it     */
  var ZTOP = 12.0, ZBOT = -1.5; /* vertical span the hull texture covers; below
                                   it the bottom row (anti-fouling) is clamped */

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

  /* weather deck height by x: the low fantail, its step, a flush deck, then
     the forecastle sheering up to the stem (read off the 1994 profile)       */
  var DK = [[-86.4, 5.00], [-68.0, 5.00], [-66.8, 7.50], [34.0, 7.60],
            [54.0, 8.50], [70.0, 9.70], [86.4, 10.70]];
  function deckZ(x) { return tbl(DK, x); }

  var HW_K = [[0.000, 0.790], [0.030, 0.835], [0.070, 0.895], [0.130, 0.945],
              [0.210, 0.975], [0.310, 0.994], [0.420, 1.000], [0.545, 1.000],
              [0.625, 0.991], [0.700, 0.963], [0.775, 0.902], [0.832, 0.812],
              [0.880, 0.722], [0.925, 0.578], [0.958, 0.398], [0.982, 0.207],
              [1.000, 0.026]];
  function hullHW(x) { return HB * tbl(HW_K, tOf(x)); }
  function keelZ(t) {
    if (t < 0.10) return -3.35 - (DR - 3.35) * (t / 0.10);
    if (t < 0.78) return -DR;
    return -DR + (DR + 0.4) * Math.pow((t - 0.78) / 0.22, 1.85);
  }
  /* 0 = full midship box section, 1 = fine V for the entry */
  var VB_K = [[0.00, 0.14], [0.09, 0.05], [0.20, 0.00], [0.60, 0.00],
              [0.70, 0.09], [0.80, 0.30], [0.870, 0.56], [0.930, 0.79],
              [1.000, 1.00]];
  var SEC_FULL = [[1.000, 1.000], [1.004, 0.800], [1.000, 0.620], [0.990, 0.470],
                  [0.970, 0.350], [0.928, 0.250], [0.858, 0.168], [0.748, 0.100],
                  [0.588, 0.050], [0.398, 0.018], [0.198, 0.004], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.928, 0.800], [0.846, 0.620], [0.754, 0.470],
                  [0.654, 0.350], [0.552, 0.250], [0.444, 0.168], [0.336, 0.100],
                  [0.228, 0.050], [0.138, 0.018], [0.062, 0.004], [0.000, 0.000]];
  var CAMBER = [[0.560, 1.008], [0.000, 1.013], [-0.560, 1.008]];
  var RAKE_K = [[0.000, 0.0], [0.800, 0.0], [0.880, 1.5], [0.940, 4.0], [1.000, 8.2]];

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
  /* the half breadth of the moulded hull at station x and height z: where an
     anchor or a shutter has to sit on her side                             */
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

  /* the stations: close together where the deck steps and at the ends */
  var XS = [-86.4, -84.0, -80.0, -75.0, -70.5, -68.0, -66.8, -62.0, -54.0,
            -45.0, -36.0, -27.0, -18.0, -9.0, 0.0, 9.0, 18.0, 27.0, 36.0,
            44.0, 51.0, 57.0, 63.0, 68.5, 73.5, 77.8, 81.2, 83.8, 85.4, 86.4];

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
  function textures(THREE, num) {
    if (_tx && _tx.hull[num]) return _tx;
    if (_tx) { _tx.hull[num] = hullTex(THREE, num); return _tx; }
    _tx = { hull: {}, sup: supTex(THREE), deck: deckTex(THREE),
            pad: padTex(THREE), vls: vlsTex(THREE) };
    _tx.hull[num] = hullTex(THREE, num);
    return _tx;
  }

  function hullTex(THREE, num) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(47033), i, j, x, z;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    g.fillStyle = "#68717a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling below the waterline, and the black boot topping over it:
       the band the photographs show from just under the waterline to most
       of a metre above it, the full length of the ship                    */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.45), W, H - Y(-0.45));
    g.fillStyle = "#15181b"; g.fillRect(0, Y(0.85), W, Y(-0.45) - Y(0.85));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.85) - 1, W, 1.5);
    /* strake seams, in real height so they stay level */
    g.lineWidth = 1.2;
    var STR = [1.9, 3.4, 4.9, 6.4, 7.9, 9.4, 10.9];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
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
    /* freeing ports under the deck edge, weeping rust, following the sheer */
    for (i = 0; i < 44; i++) {
      x = -XB + 4 + (i / 43) * (LOA - 14);
      z = deckZ(x) - 0.9;
      g.globalAlpha = 0.34; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 4, Y(z) - 2, 8, 5);
      if (R() < 0.55) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 3, 4, (1.0 + R() * 2.4) * (H / (ZTOP - ZBOT)));
    }
    /* exhaust staining streaming aft from both uptake groups */
    var FUN = [13.0, -20.0];
    for (i = 0; i < FUN.length; i++) {
      for (j = 0; j < 160; j++) {
        var f = R();
        x = FUN[i] - f * 30 - 2;
        z = deckZ(x) - 0.4 - R() * 3.0;
        g.globalAlpha = 0.040 * (1 - f) + 0.008; g.fillStyle = "#2a2d30";
        g.fillRect(U(x), Y(z), 8 + R() * 30, 4 + R() * 12);
      }
    }
    /* rust weeping from the hawse under each anchor */
    g.globalAlpha = 0.14; g.fillStyle = "#6d4526";
    g.fillRect(U(75.0) - 5, Y(deckZ(75.0) - 3.4), 10, 3.6 * (H / (ZTOP - ZBOT)));
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 72.0 : -80.5;
      for (j = 0; j <= 10; j++) g.fillRect(U(x) - 6, Y(-0.3 + j * 0.55), j % 2 ? 7 : 12, 2);
    }
    /* hull number, bow quarter, white with a dark edge. cruiser_n carries
       none: it also stands in for other navies' cruisers. One texture serves
       both sides (u runs with x), so seen from port the numeral reads
       mirrored; a true fix wants a second half for the port side.        */
    if (num) {
      g.font = "bold 62px Arial"; g.textAlign = "center";
      g.lineWidth = 5; g.strokeStyle = "rgba(10,13,16,0.85)";
      g.strokeText(num, U(66.5), Y(3.4)); g.fillStyle = "#e6e8e8"; g.fillText(num, U(66.5), Y(3.4));
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
    var R = rng(30157), i;
    g.fillStyle = "#737b82"; g.fillRect(0, 0, W, H);
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

  /* weather deck: non-skid with panel joints */
  function deckTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(9931), i;
    g.fillStyle = "#464c51"; g.fillRect(0, 0, W, H);
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

  /* the flight deck: u runs fore-and-aft, v runs athwart. The tie-down
     grid, the deck-edge line and the lineup line down the middle to the
     hangar; a plain corner the other 01-level decks borrow              */
  function padTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(2179), i, j;
    g.fillStyle = "#3b4045"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#2a2e32" : "#4b5157";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.32; g.fillStyle = "#000000";
    for (i = 0; i < 2200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.6; g.fillStyle = "#1b1e21";
    for (i = 1; i < 12; i++) for (j = 1; j < 8; j++) g.fillRect(W * i / 12 - 3, H * j / 8 - 3, 6, 6);
    g.globalAlpha = 1;
    g.strokeStyle = "#d3d6cf"; g.lineWidth = 4;
    g.strokeRect(W * 0.03, H * 0.04, W * 0.94, H * 0.92);
    g.lineWidth = 6;
    g.beginPath(); g.moveTo(W * 0.03, H * 0.5); g.lineTo(W * 0.97, H * 0.5); g.stroke();
    /* plain non-skid patch for the other decks: u, v in 0.2 .. 0.3 */
    g.fillStyle = "#3b4045"; g.fillRect(W * 0.19, H * 0.19, W * 0.12, H * 0.12);
    return tex(THREE, cv, false);
  }

  /* a 61-cell Mk 41 field: 8 x 8 lids, the crane stowage cells left blank,
     a darker uptake hatch along the middle of each 8-cell module          */
  function vlsTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var n = 8, cw = W / n, ch = H / n, i, j;
    g.fillStyle = "#3f454a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
      var px = i * cw, py = j * ch;
      if (j === 7 && i >= 3 && i <= 5) {
        g.fillStyle = "#565d63"; g.fillRect(px, py + 2, cw, ch - 4);
        continue;
      }
      g.fillStyle = "#22262a";
      g.fillRect(px + cw * 0.07, py + ch * 0.07, cw * 0.86, ch * 0.86);
      g.fillStyle = "#5d656b";
      g.fillRect(px + cw * 0.07, py + ch * 0.07, cw * 0.86, ch * 0.10);
      g.fillStyle = "#14171a";
      g.fillRect(px + cw * 0.47, py + ch * 0.12, cw * 0.06, ch * 0.76);
    }
    g.fillStyle = "#16191c";
    for (j = 0; j < 4; j++) g.fillRect(0, (j * 2 + 1) * ch - 3, W, 6);
    return tex(THREE, cv, false);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team, num) {
    var T = textures(THREE, num), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull[num], roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    /* the surfaces that lie on another surface are pulled toward the camera
       a couple of depth steps, or they shimmer at the zoom-out limit        */
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.pad   = S({ map: T.pad, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.vls   = S({ map: T.vls, roughness: 0.86, metalness: 0.08 });
    M.rad   = S({ color: 0xc9ccc6, roughness: 0.90, metalness: 0.03 });
    M.dark  = S({ color: 0x2c3035, roughness: 0.90, metalness: 0.05 });
    M.metal = S({ color: 0x80878d, roughness: 0.55, metalness: 0.50 });
    M.team  = S({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
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
  /* the same, turned to face away from the point C: a loft or a bar never
     has to be wound by hand                                                */
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
  /* superellipse outline, counter-clockwise: a rounded stack or gun house */
  function rounded(a, b, p, n, dx) {
    var out = [], k;
    for (k = 0; k < n; k++) {
      var an = 2 * PI * k / n, c = Math.cos(an), s = Math.sin(an);
      out.push([(dx || 0) + a * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p)]);
    }
    return out;
  }
  function mv(poly, dx, dy) {
    return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; });
  }
  /* the roof outline of a block built with prism(): its top, pulled in a
     further `more` metres for a rail along the edge                        */
  function roofOf(poly, ins, more) {
    var bb = bboxOf(poly), e = ins + (more || 0);
    var sx = (bb.w - 2 * e) / bb.w, sy = (bb.h - 2 * e) / bb.h;
    return poly.map(function (p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; });
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }
  /* an octagon with flats top, bottom and sides: an SPY-1 face */
  function octPts(R) {
    var p = [], q;
    for (q = 0; q < 8; q++) { var an = (q + 0.5) * PI / 4; p.push([R * Math.cos(an), R * Math.sin(an)]); }
    return p;
  }

  /* ================================================================ the hull */
  function hullMesh(THREE, mtl) {
    var pos = [], uv = [], idx = [], i, j, R = 0;
    for (i = 0; i < XS.length; i++) {
      var x0 = XS[i], t = tOf(x0), r = ringOf(tbl(VB_K, t));
      var w = hullHW(x0), kz = keelZ(t), dz = deckZ(x0), dep = dz - kz;
      var rk = tbl(RAKE_K, t);
      for (j = 0; j < r.length; j++) {
        var z = kz + dep * r[j][1];
        pos.push(x0 + rk * (r[j][1] - 1.0), w * r[j][0], z);
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
    cap(0, false); cap(XS.length - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* the weather deck: a cambered ribbon on the hull top, sheer, step and all */
  function deckRibbon(THREE, mtl) {
    var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
    var XR = [-85.6, -82.0, -78.0, -74.0, -70.0, -68.0, -66.8, -62.0, -54.0, -45.0,
              -36.0, -27.0, -18.0, -9.0, 0.0, 9.0, 18.0, 27.0, 36.0, 44.0, 51.0,
              57.0, 63.0, 68.5, 73.5, 77.8, 81.2, 83.8, 85.2];
    var pos = [], uv = [], idx = [], i, j, R = KY.length;
    for (i = 0; i < XR.length; i++) {
      var x = XR[i], t = tOf(x), r = ringOf(tbl(VB_K, t)), w = hullHW(x);
      var kz = keelZ(t), dz = deckZ(x), dep = dz - kz;
      for (j = 0; j < R; j++) {
        var ky = KY[j], ak = Math.abs(ky);
        var kd = ak > 0.995 ? r[0][1] : 1.0 + 0.013 * (1 - ak * ak);
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
  function build(THREE, MOD, C, V) {
    V = V || {};
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var M = makeMats(THREE, team, V.num || "");
    var G = new THREE.Group();
    var KEYS = ["sup", "pad", "vls", "rad", "dark", "metal", "team", "glass"];
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
    /* the upper half of a sphere, standing on z */
    function hemi(k, r, ws, hs, x, y, z) {
      var g = new THREE.SphereGeometry(r, ws, hs, 0, 2 * PI, 0, PI / 2);
      g.rotateX(PI / 2);
      cur[k].add(place(THREE, g, x, y, z));
    }
    /* an open round tube between two points, r0 at a and r1 at b */
    function tube(k, ax, ay, az, bx2, by, bz, r0, r1, seg) {
      if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      var g = new THREE.CylinderGeometry(r1, r0, L, seg || 6, 1, true);
      _v1.set(dx, dy, dz).normalize();
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_v0, _v1));
      g.translate((ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
      cur[k].add(g);
    }
    /* a thin three-sided bar between two points: rails, struts, braces.
       Six triangles a bar, so a railing round a deck costs little        */
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
       metres all round so every wall leans in. Roof capped unless noCap.   */
    function prism(k, poly, z0, z1, ins, US, noCap) {
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
        for (q = 0; q < n; q++) {
          var p = top(poly[q]), r = top(poly[(q + 1) % n]);
          B.tri([bb.cx, bb.cy, z1, bb.cx / US, bb.cy / US], [p[0], p[1], z1, p[0] / US, p[1] / US],
                [r[0], r[1], z1, r[0] / US, r[1] / US]);
        }
      }
    }
    /* a frame on wall `ei` of a prism(poly, z0, z1, ins): its origin on the
       wall at fraction u along it and height zc, t along the wall, w up the
       (leaning) wall, n out of it                                          */
    function face(poly, ei, z0, z1, ins, u, zc) {
      var bb = bboxOf(poly), n = poly.length;
      var sx = (bb.w - 2 * ins) / bb.w, sy = (bb.h - 2 * ins) / bb.h;
      function top(p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; }
      var a = poly[ei], b = poly[(ei + 1) % n], at = top(a), bt = top(b);
      var p0 = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, z0];
      var p1 = [at[0] + (bt[0] - at[0]) * u, at[1] + (bt[1] - at[1]) * u, z1];
      var f = (zc - z0) / (z1 - z0);
      var o = [p0[0] + (p1[0] - p0[0]) * f, p0[1] + (p1[1] - p0[1]) * f, zc];
      var tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.sqrt(tx * tx + ty * ty);
      tx /= tl; ty /= tl;
      var wx = p1[0] - p0[0], wy = p1[1] - p0[1], wz = p1[2] - p0[2];
      var nx = ty * wz, ny = -tx * wz, nz = tx * wy - ty * wx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz); nx /= nl; ny /= nl; nz /= nl;
      return { o: o, t: [tx, ty, 0], w: [-nz * ty, nz * tx, nx * ty - ny * tx], n: [nx, ny, nz], len: tl };
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
      Batch.xf = { x: x, y: y, z: z, c: Math.cos(yaw), s: Math.sin(yaw) };
      fn();
      Batch.xf = null;
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
    /* the same round the edges of a roof outline, leaving out the edges
       listed in `skip` (a wall stands there)                              */
    function railRoof(poly, z, skip, step) {
      var q, n = poly.length;
      for (q = 0; q < n; q++) {
        if (skip && skip.indexOf(q) >= 0) continue;
        var a = poly[q], b = poly[(q + 1) % n];
        railRun("metal", [[a[0], a[1], z], [b[0], b[1], z]], 1.0, step || 1.8);
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
      return dz + dep * 0.013 * (1 - ak * ak) + 0.07;
    }
    /* a four-legged tapered tower with X bracing on every face */
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

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    var dk = deckRibbon(THREE, M.deck); dk.name = "deck"; G.add(dk);

    /* SQS-53 bow sonar dome: black rubber under the forefoot. The hull's keel
       line rises from -5.2 m at x 62 to -3.2 m at x 70, so the bulb is a tall
       ellipsoid pitched up by the bow: its top is buried in the forefoot from
       x 61 to 68 and its bottom is the published 9.5 m draught (an ellipsoid
       only 4.2 m tall, as first drawn, hung a metre clear of the hull)      */
    var dome = new THREE.SphereGeometry(1, 16, 9);
    dome.scale(5.0, 2.1, 2.95);
    dome.rotateY(-0.10);
    cur.dark.add(place(THREE, dome, 65.4, 0, -6.58));
    /* a bilge keel each side, to hold the underwater shape together */
    for (s = -1; s <= 1; s += 2)
      bx("dark", 30.0, 0.16, 0.55, -17.0, s * 7.3, -3.9, s * 0.75, 0, 0);

    /* two anchors, one in a hawse on each bow, the shank up the pipe and
       the flukes lying against the plating                                */
    for (s = -1; s <= 1; s += 2) {
      var AX = 75.0, AZ = deckZ(75.0) - 2.3, ay0 = hullY(AX + 0.6, AZ);
      var slope = (hullY(AX + 1.6, AZ) - hullY(AX - 0.4, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.05), AZ, -slope, s);
      plate("dark", FA, rectPts(-0.8, -1.9, 0.8, 0.55), 0, 0.05);
      plate("metal", FA, rectPts(-0.14, -1.45, 0.14, 0.35), 0.05, 0.36);
      plate("metal", FA, rectPts(-0.42, -1.75, 0.42, -1.42), 0.05, 0.40);
      plate("metal", FA, [[-0.42, -1.75], [-0.42, -1.42], [-0.9, -1.12]], 0.05, 0.34);
      plate("metal", FA, [[0.42, -1.75], [0.9, -1.12], [0.42, -1.42]], 0.05, 0.34);
      /* the deck end of the hawse, and the cable aft to its wildcat */
      cz("dark", 0.42, 0.42, 0.08, 10, 74.4, s * 2.6, topZ(74.4, 2.6) - 0.03);
      var cxa = 74.4, cya = s * 2.6, cxb = 68.6, cyb = s * 1.1;
      bx("dark", Math.sqrt((cxa - cxb) * (cxa - cxb) + (cya - cyb) * (cya - cyb)), 0.32, 0.12,
         (cxa + cxb) * 0.5, (cya + cyb) * 0.5, topZ(71.5, 1.8) + 0.03, 0, 0, Math.atan2(cya - cyb, cxa - cxb));
      /* the wildcat */
      cz("metal", 0.55, 0.62, 0.75, 12, 68.6, s * 1.1, topZ(68.6, 1.1) - 0.02);
      bx("sup", 1.4, 0.9, 0.6, 67.6, s * 1.1, topZ(67.6, 1.1) + 0.28);
    }
    /* the capstan aft of them */
    cz("metal", 0.45, 0.55, 0.95, 10, 65.6, 0, topZ(65.6, 0) - 0.02);

    /* ------------------------------------------------ the flight deck ---- */
    var FD0 = -51.5, FD1 = -29.3, FDW = 7.4, ZF = 10.2;
    var FDP = [[FD0, -FDW], [FD1, -FDW], [FD1, FDW], [FD0, FDW]];
    prism("sup", FDP, 7.45, ZF, 0, 4.0, true);
    flat("pad", FD0, -FDW, FD1, FDW, ZF, 0, 0, 1, 1);
    /* the waist: the 01 deck between the two deckhouses, same level */
    prism("sup", [[FD1, -FDW], [-2.0, -FDW], [-2.0, FDW], [FD1, FDW]], 7.45, ZF, 0, 4.0, true);
    flat("pad", FD1, -FDW, -2.0, FDW, ZF, 0.2, 0.2, 0.3, 0.3);
    /* the landing circle in the team colour, lying on the deck */
    var rg = new THREE.RingGeometry(5.5, 6.2, 36);
    cur.team.add(place(THREE, rg, -40.4, 0, ZF + 0.06));
    /* the safety nets: outriggers along both sides and the after edge, the
       net itself a dark band the camera looks down on                      */
    function nets(x0, y0, x1, y1, ox, oy) {
      var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      var n = Math.max(1, Math.round(L / 2.2)), q, w = 0.98;
      for (q = 0; q <= n; q++) {
        var f = q / n, x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
        bar("metal", x, y, ZF - 0.05, x + ox * w, y + oy * w, ZF + 0.24, 0.04);
      }
      bar("metal", x0 + ox * w, y0 + oy * w, ZF + 0.24, x1 + ox * w, y1 + oy * w, ZF + 0.24, 0.045);
      var Cn = [(x0 + x1) * 0.5, (y0 + y1) * 0.5, ZF - 6];
      var A0 = [x0, y0, ZF - 0.02, 0, 0], A1 = [x1, y1, ZF - 0.02, 1, 0];
      var B0 = [x0 + ox * w, y0 + oy * w, ZF + 0.21, 0, 1], B1 = [x1 + ox * w, y1 + oy * w, ZF + 0.21, 1, 1];
      cur.dark.triOut(A0, A1, B1, Cn); cur.dark.triOut(A0, B1, B0, Cn);
    }
    nets(FD0 + 0.4, -FDW, FD1 - 0.6, -FDW, 0, -1);
    nets(FD0 + 0.4, FDW, FD1 - 0.6, FDW, 0, 1);
    nets(FD0, -FDW + 0.4, FD0, FDW - 0.4, -1, 0);
    /* the Mk 32 tubes: a shutter each side in the flight deck block, the
       three muzzles of the mount showing in it (the drawing's leader)     */
    for (s = -1; s <= 1; s += 2) {
      var FT = frameN(-42.0, s * FDW, 7.45, 0, s);
      plate("dark", FT, rectPts(-1.4, 0.35, 1.4, 2.35), -0.02, 0.05);
      plate("sup", FT, rectPts(-1.6, 2.35, 1.6, 2.55), 0, 0.14);
      for (j = -1; j <= 1; j++) {
        var m0 = fp(FT, j * 0.72, 1.32, 0.0), m1 = fp(FT, j * 0.72, 1.32, 0.22);
        tube("metal", m0[0], m0[1], m0[2], m1[0], m1[1], m1[2], 0.21, 0.21, 8);
        var m2 = fp(FT, j * 0.72, 1.32, 0.23);
        cz("dark", 0.16, 0.16, 0.02, 8, m2[0], m2[1], m2[2] - 0.01);
      }
    }

    /* ------------------------------------------------ the after deckhouse -- */
    /* the hangar block, the narrower house ahead of it where the boats ride,
       and on the hangar the tower with the after SPY-1 faces               */
    var H1 = [[FD1, -6.9], [-16.0, -6.9], [-16.0, 6.9], [FD1, 6.9]], ZH = 15.9;
    prism("sup", H1, ZF, ZH, 0.25, 4.0);
    var H1B = [[-16.4, -5.0], [-9.0, -5.0], [-9.0, 5.0], [-16.4, 5.0]], ZHB = 13.6;
    prism("sup", H1B, ZF, ZHB, 0.2, 4.0);
    var H2 = [[-25.4, -4.4], [-16.2, -4.4], [-16.2, 4.4], [-25.4, 4.4], [-28.9, 0.9], [-28.9, -0.9]];
    var ZT = 20.9;
    prism("sup", H2, ZH, ZT, 0.3, 4.0);
    railRoof(roofOf(H1, 0.25, 0.12), ZH, null, 1.9);
    railRoof(roofOf(H1B, 0.2, 0.12), ZHB, [3], 1.9);
    railRoof(roofOf(H2, 0.3, 0.12), ZT, null, 1.9);
    /* the two roller doors in the hangar's after face, onto the flight deck */
    for (s = -1; s <= 1; s += 2) {
      var FH = face(H1, 3, ZF, ZH, 0.25, 0.5 - s * 0.23, ZF);
      plate("dark", FH, rectPts(-2.3, 0.0, 2.3, 4.5), -0.02, 0.05);
      plate("sup", FH, rectPts(-2.62, 0.0, -2.3, 4.85), 0, 0.16);
      plate("sup", FH, rectPts(2.3, 0.0, 2.62, 4.85), 0, 0.16);
      plate("sup", FH, rectPts(-2.3, 4.5, 2.3, 4.85), 0, 0.16);
      for (j = 1; j < 9; j++) {
        var d0 = fp(FH, -2.25, j * 0.5, 0.06), d1 = fp(FH, 2.25, j * 0.5, 0.06);
        bar("metal", d0[0], d0[1], d0[2], d1[0], d1[1], d1[2], 0.035);
      }
    }
    /* watertight doors in the house sides */
    [[0, 0.22], [0, 0.62], [2, 0.38], [2, 0.78]].forEach(function (d) {
      plate("dark", face(H1, d[0], ZF, ZH, 0.25, d[1], ZF), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    /* the after SPY-1 faces on the tower's two after corners */
    function spyFace(F) {
      plate("sup", F, octPts(2.12), 0, 0.16);
      plate("rad", F, octPts(1.92), 0.16, 0.24);
    }
    spyFace(face(H2, 3, ZH, ZT, 0.3, 0.5, 18.4));
    spyFace(face(H2, 5, ZH, ZT, 0.3, 0.5, 18.4));

    /* an uptake: a rounded stack and its sooted cap */
    function stack(x, y, ax, ay, z0, z1) {
      var zc = z1 - Math.min(1.1, (z1 - z0) * 0.4);
      prism("sup", mv(rounded(ax, ay, 0.8, 16), x, y), z0, zc, 0, 3.0, true);
      prism("dark", mv(rounded(ax + 0.06, ay + 0.06, 0.8, 16), x, y), zc, z1 - 0.12, 0, 3.0, true);
      prism("dark", mv(rounded(ax + 0.16, ay + 0.16, 0.8, 16), x, y), z1 - 0.12, z1, 0, 3.0);
    }
    /* the after uptakes, the raised SPG-62 on its column among them */
    prism("sup", [[-24.4, -2.5], [-17.2, -2.5], [-17.2, 2.5], [-24.4, 2.5]], ZT, 22.1, 0.2, 4.0);
    stack(-22.6, 0, 1.2, 1.2, 22.1, 24.5);
    stack(-18.3, 0, 1.0, 1.0, 22.1, 24.2);
    stack(-20.3, 1.75, 0.55, 0.55, 22.1, 23.6);
    tube("metal", -21.0, -2.1, 22.1, -20.7, -2.1, 30.8, 0.11, 0.05, 6);

    /* -------------------------------------- SPG-62 illuminators (four) ---- */
    function spg62(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.5, 0.6, 0.45, 12, 0, 0, 0);
        bx("sup", 0.45, 1.95, 0.22, -0.15, 0, 0.56);
        bx("sup", 0.4, 0.16, 1.1, -0.15, 0.9, 1.12);
        bx("sup", 0.4, 0.16, 1.1, -0.15, -0.9, 1.12);
        var g = new THREE.CylinderGeometry(1.2, 0.42, 0.55, 18, 1, false);
        g.rotateZ(-PI / 2); g.rotateY(-0.2); g.translate(0.05, 0, 1.45);
        cur.rad.add(g);
        /* the feed held out in front of the dish on three struts */
        cx("metal", 0.2, 0.2, 0.12, 8, 1.12, 0, 1.69);
        bar("metal", 0.10, 0, 2.59, 1.14, 0, 1.71, 0.03);
        bar("metal", 0.43, -0.95, 0.98, 1.14, 0, 1.67, 0.03);
        bar("metal", 0.43, 0.95, 0.98, 1.14, 0, 1.67, 0.03);
      });
    }
    /* the low one on the tower's after end, the raised one on its column */
    cz("sup", 0.45, 0.55, 0.7, 10, -27.0, 0, ZT);
    spg62(-27.0, 0, ZT + 0.7, PI);
    cz("sup", 0.5, 0.6, 2.5, 10, -20.3, 0, 22.1);
    cz("sup", 1.25, 1.25, 0.16, 14, -20.3, 0, 24.6);
    railRing(-20.3, 0, 24.76, 1.18, 10);
    spg62(-20.3, 0, 24.76, PI);

    /* the SATCOM domes either side of the tower (the 1990s on) */
    if (V.satcom) {
      for (s = -1; s <= 1; s += 2) {
        cz("sup", 0.45, 0.55, 0.9, 10, -22.6, s * 5.55, ZH);
        sph("rad", 1.15, 18, 11, -22.6, s * 5.55, ZH + 1.9);
      }
    }
    /* life rafts in their cradles along the hangar roof, lying athwart */
    function raft(x, y, z, alongX) {
      var g = new THREE.CylinderGeometry(0.27, 0.27, 1.2, 8, 1, false);
      if (alongX) g.rotateZ(PI / 2);
      cur.rad.add(place(THREE, g, x, y, z + 0.31));
      bx("dark", alongX ? 1.0 : 0.5, alongX ? 0.5 : 1.0, 0.08, x, y, z + 0.04);
    }
    for (s = -1; s <= 1; s += 2) {
      [-28.2, -27.1, -26.0, -20.0, -18.9, -17.8].forEach(function (x) { raft(x, s * 5.72, ZH, false); });
    }

    /* -------------------------------------------- the lattice mast (SPS-49) */
    var MX0 = -8.4, MX1 = -1.8, MY = 3.0, MZ1 = 33.4, MTX0 = -3.9, MTX1 = -2.3, MTY = 0.7;
    tower("metal", MX0, MX1, MY, MTX0, MTX1, MTY, ZF, MZ1,
          [0, 0.17, 0.34, 0.5, 0.65, 0.79, 0.9, 1.0], 0.2, 0.06);
    function mastAt(u, sx, sy) {
      var xb = sx < 0 ? MX0 : MX1, xt = sx < 0 ? MTX0 : MTX1;
      return [xb + (xt - xb) * u, sy * (MY + (MTY - MY) * u), ZF + (MZ1 - ZF) * u];
    }
    /* the platform at its head, the radome on it and the topmast */
    bx("metal", 3.1, 2.8, 0.15, -3.1, 0, MZ1);
    railRoof([[-4.6, -1.35], [-1.6, -1.35], [-1.6, 1.35], [-4.6, 1.35]], MZ1 + 0.07, null, 1.6);
    cz("metal", 0.25, 0.3, 0.5, 8, -2.0, 0, MZ1 + 0.07);
    sph("rad", 0.72, 14, 9, -2.0, 0, MZ1 + 1.2);
    tube("metal", -3.4, 0, MZ1, -3.4, 0, 40.2, 0.15, 0.07, 6);
    bar("metal", -3.4, -1.9, 37.4, -3.4, 1.9, 37.4, 0.05);
    bar("metal", -3.4, 0, 40.2, -3.4, 0, 41.4, 0.03);
    /* the yard, its footropes and the antennas standing on its arms */
    var YZ = 31.0, ym = mastAt((YZ - ZF) / (MZ1 - ZF), -1, 1), yx = ym[0] + 0.9;
    bar("metal", yx, -6.9, YZ, yx, 6.9, YZ, 0.09);
    bar("metal", yx + 0.05, -6.4, YZ - 0.7, yx + 0.05, 6.4, YZ - 0.7, 0.025);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", yx, s * 6.6, YZ, yx, s * 6.6, YZ + 1.7, 0.04);
      bar("metal", yx, s * 4.7, YZ, yx, s * 4.7, YZ + 1.2, 0.04);
      bar("metal", yx, s * 5.6, YZ, yx, s * 5.6, YZ - 1.3, 0.03);
      bar("metal", yx, s * 2.0, YZ, yx - 0.2, s * 0.9, YZ - 1.4, 0.05);
    }
    var y2 = mastAt((28.4 - ZF) / (MZ1 - ZF), -1, 1);
    bar("metal", y2[0] + 1.0, -4.4, 28.4, y2[0] + 1.0, 4.4, 28.4, 0.07);
    /* the SPS-49: its platform braced off the after legs, the drive and the
       truncated paraboloid with its feed boom                              */
    var PZ = 25.6, la = mastAt((PZ - ZF) / (MZ1 - ZF), -1, 1), lb = mastAt((21.8 - ZF) / (MZ1 - ZF), -1, 1);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", la[0], s * la[1], PZ, -7.7, s * 0.95, PZ, 0.09);
      bar("metal", lb[0], s * lb[1], 21.8, -8.0, s * 0.95, PZ - 0.1, 0.08);
    }
    bx("metal", 2.6, 2.4, 0.15, -8.9, 0, PZ);
    railRoof([[-10.15, -1.15], [-7.65, -1.15], [-7.65, 1.15], [-10.15, 1.15]], PZ + 0.07, [1], 1.4);
    cz("metal", 0.42, 0.52, 0.7, 10, -9.0, 0, PZ + 0.07);
    stamp(-9.0, 0, 26.05, PI * 0.8, function () {
      var NS = 8, q, Bm = cur.sup, AW = 3.65, AH = 4.3;
      function rx(y) { return -0.6 + 0.85 * (y / AW) * (y / AW); }
      for (q = 0; q < NS; q++) {
        var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
        var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
        var a1 = [rx(ya), ya, AH, 0, 1], b1 = [rx(yb), yb, AH, 1, 1];
        Bm.triOut(a0, b0, b1, [-6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [-6, 0, AH * 0.5]);
        var c0 = [rx(ya) - 0.07, ya, 0, 0, 0], d0 = [rx(yb) - 0.07, yb, 0, 1, 0];
        var c1 = [rx(ya) - 0.07, ya, AH, 0, 1], d1 = [rx(yb) - 0.07, yb, AH, 1, 1];
        Bm.triOut(c0, d0, d1, [6, 0, AH * 0.5]); Bm.triOut(c0, d1, c1, [6, 0, AH * 0.5]);
      }
      bar("dark", rx(-AW), -AW, 0, rx(AW), AW, 0, 0.06);
      bar("dark", rx(-AW), -AW, AH, rx(AW), AW, AH, 0.06);
      bar("metal", -0.62, 0, 0.3, -0.62, 0, AH - 0.3, 0.12);
      bar("metal", -0.6, 0, AH * 0.5, 1.75, 0, AH * 0.42, 0.08);
      bx("dark", 0.45, 0.75, 0.55, 1.9, 0, AH * 0.42);
      bar("metal", -0.55, 0, 0.35, 1.7, 0, AH * 0.38, 0.05);
    });

    /* boats in davits either side of the waist: RHIBs, or the 26-ft motor
       whaleboats of the 1980s                                              */
    function boat(xc, yc, zk, rhib) {
      stamp(xc, yc, zk, 0, function () {
        var L = rhib ? 3.5 : 3.95, B = rhib ? 1.25 : 1.18;
        loftX("sup", [[-L, B * 0.82, 0.32, rhib ? 0.92 : 1.12], [-L + 0.45, B * 0.96, 0.06, rhib ? 0.95 : 1.15],
                      [-L * 0.3, B, 0.0, rhib ? 0.95 : 1.15], [L * 0.35, B * 0.93, 0.06, rhib ? 0.98 : 1.18],
                      [L * 0.72, B * 0.62, 0.25, rhib ? 1.02 : 1.22], [L * 0.94, B * 0.22, 0.6, rhib ? 1.06 : 1.25],
                      [L, 0.01, 0.9, rhib ? 1.06 : 1.25]], 12, 0.55);
        if (rhib) {
          /* the black collar round the gunwale, the console, the outboard */
          var CP = [[-L, 0.95], [-L * 0.3, 1.25], [L * 0.35, 1.18], [L * 0.72, 0.8], [L * 0.97, 0.12]];
          for (var q = 0; q < CP.length - 1; q++) {
            bar("dark", CP[q][0], CP[q][1], 1.0, CP[q + 1][0], CP[q + 1][1], 1.0, 0.24);
            bar("dark", CP[q][0], -CP[q][1], 1.0, CP[q + 1][0], -CP[q + 1][1], 1.0, 0.24);
          }
          bar("dark", -L, -0.95, 1.0, -L, 0.95, 1.0, 0.22);
          bx("sup", 0.75, 0.85, 0.85, 0.2, 0, 1.35);
          bx("glass", 0.08, 0.75, 0.35, 0.6, 0, 1.92);
          bx("dark", 0.5, 0.55, 0.75, -L - 0.15, 0, 1.0);
        } else {
          /* the whaleboat's canopy over the after half */
          bx("sup", 2.6, 1.7, 0.75, -0.9, 0, 1.55);
          var cg = new THREE.CylinderGeometry(0.85, 0.85, 2.6, 10, 1, false, 0, PI);
          cg.rotateZ(PI / 2); cg.rotateX(PI / 2);
          cur.sup.add(place(THREE, cg, -0.9, 0, 1.92));
        }
      });
    }
    for (s = -1; s <= 1; s += 2) {
      var BY = s * 6.45;
      boat(-12.0, BY, 10.75, !!V.rhib);
      bx("dark", 0.3, 1.9, 0.55, -14.0, BY, ZF + 0.27);
      bx("dark", 0.3, 1.9, 0.55, -10.0, BY, ZF + 0.27);
      /* two davits, posts on the deck and arms out over the boat */
      for (j = -1; j <= 1; j += 2) {
        var DX = -12.0 + j * 2.6;
        tube("metal", DX, s * 5.3, ZF, DX, s * 5.3, 15.0, 0.13, 0.11, 6);
        bar("metal", DX, s * 5.3, 14.9, DX, BY, 15.3, 0.09);
        bar("metal", DX, BY, 15.25, DX, BY, 12.1, 0.02);
      }
    }
    /* the waist's deck-edge rails */
    for (s = -1; s <= 1; s += 2)
      railRun("metal", [[FD1 + 0.3, s * (FDW - 0.12), ZF], [-2.3, s * (FDW - 0.12), ZF]], 1.0, 1.9);
    /* four SRBOC launchers on the waist deck, two each side, six tubes
       apiece at 45 and 60 degrees, firing outboard                        */
    function srboc(x, y, side) {
      stamp(x, y, ZF, side > 0 ? PI / 2 : -PI / 2, function () {
        bx("sup", 0.85, 0.95, 0.45, 0, 0, 0.22);
        for (var a = -1; a <= 1; a++) for (var b = 0; b < 2; b++) {
          var el = b ? 1.05 : 0.79, g = new THREE.CylinderGeometry(0.075, 0.075, 1.15, 6, 1, false);
          g.rotateZ(-PI / 2); g.rotateY(-el);
          g.translate(0.15 - b * 0.18, a * 0.22, 0.85 + b * 0.12);
          cur.metal.add(g);
        }
      });
    }
    for (s = -1; s <= 1; s += 2) { srboc(-3.4, s * 6.55, s); srboc(-5.2, s * 6.55, s); }

    /* ---------------------------------------------- the forward deckhouse -- */
    /* two stepped levels abaft the tall block, the block itself from the
       main deck to the pilot house roof, its walls leaning in              */
    var F1 = [[-2.0, -7.0], [21.0, -7.0], [21.0, 7.0], [-2.0, 7.0]], ZF1 = 13.0;
    prism("sup", F1, 7.55, ZF1, 0.2, 4.0);
    var F2 = [[0.0, -6.2], [21.0, -6.2], [21.0, 6.2], [0.0, 6.2]], ZF2 = 16.6;
    prism("sup", F2, ZF1, ZF2, 0.25, 4.0);
    var F3 = [[20.0, -7.1], [31.0, -7.1], [35.6, -2.5], [35.6, 2.5], [31.0, 7.1], [20.0, 7.1]];
    var ZF3 = 21.6;
    prism("sup", F3, 7.55, ZF3, 0.55, 4.0);
    railRoof(roofOf(F1, 0.2, 0.04), ZF1, [1], 1.9);
    railRoof(roofOf(F2, 0.25, 0.12), ZF2, [1], 1.9);
    railRoof(roofOf(F3, 0.55, 0.12), ZF3, null, 1.9);
    /* the forward SPY-1 faces on the block's two broad forward corners, high
       on the block just under the pilot house band: the 1994 drawing puts
       their centres at 16.5 m and the CG-51, CG-52 and CG-62 bow-quarter
       photographs at 15 to 16 m (about 70 per cent of the way up the block
       below the windows), 8 m over the main deck, not mid-height           */
    spyFace(face(F3, 1, 7.55, ZF3, 0.55, 0.5, 15.6));
    spyFace(face(F3, 3, 7.55, ZF3, 0.55, 0.5, 15.6));
    /* the pilot house windows round the top of the block, under a brow */
    var WZ = 20.1;
    function winRow(F, ss, brow) {
      ss.forEach(function (sv) { plate("glass", F, rectPts(sv - 0.46, -0.52, sv + 0.46, 0.52), -0.02, 0.05); });
      if (brow) plate("sup", F, rectPts(brow[0], 0.62, brow[1], 0.76), 0, 0.5);
    }
    winRow(face(F3, 1, 7.55, ZF3, 0.55, 0.5, WZ), [-2.4, -1.2, 0, 1.2, 2.4], [-3.1, 3.1]);
    winRow(face(F3, 3, 7.55, ZF3, 0.55, 0.5, WZ), [-2.4, -1.2, 0, 1.2, 2.4], [-3.1, 3.1]);
    winRow(face(F3, 2, 7.55, ZF3, 0.55, 0.5, WZ), [-1.65, -0.55, 0.55, 1.65], [-2.3, 2.3]);
    winRow(face(F3, 0, 7.55, ZF3, 0.55, 8.8 / 11, WZ), [-1.1, 0, 1.1], [-1.75, 1.75]);
    winRow(face(F3, 4, 7.55, ZF3, 0.55, 2.2 / 11, WZ), [-1.1, 0, 1.1], [-1.75, 1.75]);
    /* doors low in the block's sides and along the after levels */
    [[0, 0.12], [4, 0.88]].forEach(function (d) {
      plate("dark", face(F3, d[0], 7.55, ZF3, 0.55, d[1], 7.55), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    [[0, 0.18], [0, 0.55], [2, 0.45], [2, 0.82], [3, 0.5]].forEach(function (d) {
      plate("dark", face(F1, d[0], 7.55, ZF1, 0.2, d[1], 7.55), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    /* the open bridge wings, one each side abaft the windows */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 3.0, 1.45, 0.22, 27.0, s * 7.3, 19.0);
      bx("sup", 3.0, 0.1, 1.1, 27.0, s * 8.0, 19.65);
      bx("sup", 0.1, 1.4, 1.1, 28.45, s * 7.3, 19.65);
      bar("sup", 27.0, s * 6.75, 17.4, 27.0, s * 7.85, 18.9, 0.12);
      tube("metal", 27.4, s * 7.5, 19.1, 27.4, s * 7.5, 20.2, 0.06, 0.06, 6);
      railRun("metal", [[25.55, s * 6.7, 19.1], [25.55, s * 7.95, 19.1]], 1.0, 2);
    }
    /* life rafts on the 01-level ledge either side of the after house */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 7; j++) raft(8.2 + j * 1.35, s * 6.47, ZF1, true);
    }

    /* scuttles and vent trunks on the roofs the camera looks down on */
    [[2.0, 3.2], [2.0, -3.2], [15.0, 4.6], [15.0, -4.6]].forEach(function (p) {
      bx("dark", 0.9, 0.9, 0.06, p[0], p[1], ZF2 + 0.03);
    });
    [[-1.0, 5.6, 0.7], [-1.0, -5.6, 0.7], [18.6, 6.48, 0.5], [18.6, -6.48, 0.5]].forEach(function (p) {
      bx("sup", 1.0, p[2], 0.75, p[0], p[1], ZF1 + 0.37);
      bx("dark", 0.06, p[2] - 0.15, 0.45, p[0] + 0.52, p[1], ZF1 + 0.42);
    });
    [[-25.0, 3.0], [-25.0, -3.0], [-16.9, 5.2], [-16.9, -5.2]].forEach(function (p) {
      bx("dark", 0.9, 0.9, 0.06, p[0], p[1], (p[0] < -24 ? ZT : ZH) + 0.03);
    });
    [[-12.6, 3.4], [-12.6, -3.4]].forEach(function (p) {
      bx("sup", 1.2, 0.8, 0.8, p[0], p[1], ZHB + 0.4);
      bx("dark", 0.06, 0.6, 0.5, p[0] + 0.62, p[1], ZHB + 0.45);
    });

    /* the forward uptakes: a pair of big exhausts and the generator's small
       one on their casing, the tops sooted black                           */
    prism("sup", [[8.4, -2.7], [17.0, -2.7], [17.0, 2.7], [8.4, 2.7]], ZF2, 21.2, 0.35, 4.0);
    stack(15.0, -0.2, 1.25, 1.25, 21.2, 25.0);
    stack(12.2, -0.2, 1.15, 1.15, 21.2, 24.7);
    stack(9.8, 1.0, 0.65, 0.65, 21.2, 23.9);
    bar("metal", 11.0, 2.25, 21.2, 11.3, 2.25, 33.0, 0.05);
    bar("metal", 14.2, -2.25, 21.2, 14.5, -2.25, 33.0, 0.05);

    /* the pole mast close abaft the block, braced to its roof: platform,
       two yards and the SPS-55 at the head                                */
    var FMX = 19.4;
    tube("metal", FMX, 0, ZF2, FMX, 0, 37.6, 0.36, 0.13, 8);
    for (s = -1; s <= 1; s += 2) bar("metal", 21.3, s * 1.4, ZF3, FMX + 0.12, 0, 26.0, 0.1);
    bx("metal", 2.2, 2.2, 0.14, FMX, 0, 29.0);
    railRoof([[FMX - 1.05, -1.05], [FMX + 1.05, -1.05], [FMX + 1.05, 1.05], [FMX - 1.05, 1.05]], 29.07, null, 1.1);
    bar("metal", FMX, -5.0, 31.2, FMX, 5.0, 31.2, 0.07);
    bar("metal", FMX, -2.6, 33.8, FMX, 2.6, 33.8, 0.05);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", FMX, s * 4.7, 31.2, FMX, s * 4.7, 32.5, 0.035);
      bar("metal", FMX, s * 3.4, 31.2, FMX, s * 3.4, 30.0, 0.03);
    }
    cz("metal", 0.25, 0.3, 0.4, 8, FMX + 0.55, 0, 34.9);
    bx("metal", 0.32, 1.9, 0.5, FMX + 0.7, 0, 35.6);
    bx("metal", 0.6, 0.3, 0.12, FMX + 0.28, 0, 34.95);
    bar("metal", FMX, 0, 37.6, FMX, 0, 39.0, 0.03);
    /* the SPQ-9 radome on its own little lattice tower */
    tower("metal", 22.2, 24.4, 1.2, 22.7, 23.9, 0.8, ZF3, 24.6, [0, 0.5, 1.0], 0.12, 0.04);
    bx("metal", 2.8, 2.8, 0.14, 23.3, 0, 24.6);
    railRoof([[21.95, -1.35], [24.65, -1.35], [24.65, 1.35], [21.95, 1.35]], 24.67, null, 1.4);
    cz("rad", 0.8, 0.9, 0.45, 14, 23.3, 0, 24.67);
    sph("rad", 1.45, 18, 12, 23.3, 0, 26.45);
    /* the forward pair of SPG-62s on pedestals on the pilot house roof */
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.55, 0.7, 1.4, 12, 27.6, s * 4.1, ZF3);
      spg62(27.6, s * 4.1, ZF3 + 1.4, 0);
    }
    /* whips at the front of the roof */
    bar("metal", 33.4, -1.6, ZF3, 35.0, -1.9, 27.2, 0.04);
    bar("metal", 33.4, 1.6, ZF3, 35.0, 1.9, 27.2, 0.04);
    /* the SLQ-32(V)3 houses on the sides of the after house, on sponsons */
    function slq32(x, y, side) {
      stamp(x, y, ZF1, side > 0 ? PI / 2 : -PI / 2, function () {
        bx("sup", 1.3, 3.5, 0.2, 0.6, 0, -0.1);
        bx("sup", 0.9, 3.1, 2.1, 0.55, 0, 1.05);
        bx("rad", 0.1, 2.7, 1.7, 1.04, 0, 1.1, 0, -0.2, 0);
        bx("sup", 0.7, 1.4, 0.8, 0.45, 0.6, 2.5);
        bx("dark", 0.08, 1.1, 0.5, 0.82, 0.6, 2.5);
      });
    }
    for (s = -1; s <= 1; s += 2) slq32(2.5, s * 6.25, s);

    /* --------------------------------------- the Phalanx close-in guns ---- */
    function phalanx(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.78, 0.86, 0.45, 14, 0, 0, 0);
        cz("sup", 0.62, 0.66, 0.55, 14, 0, 0, 0.45);
        bx("sup", 0.9, 0.2, 0.95, -0.05, 0.52, 1.4);
        bx("sup", 0.9, 0.2, 0.95, -0.05, -0.52, 1.4);
        /* the ammunition drum under the gun, the six barrels and their clamp */
        cx("sup", 0.4, 0.4, 1.25, 12, -0.95, 0, 1.2);
        cx("metal", 0.17, 0.15, 1.95, 8, 0.3, 0, 1.3);
        cx("dark", 0.19, 0.19, 0.16, 8, 2.1, 0, 1.3);
        cx("dark", 0.2, 0.2, 0.12, 8, 0.85, 0, 1.3);
        /* the radome over it all, the tracking antenna's housing in front */
        cz("rad", 0.56, 0.56, 1.0, 16, -0.2, 0, 1.78);
        hemi("rad", 0.56, 16, 5, -0.2, 0, 2.78);
        bx("rad", 0.42, 0.55, 0.42, 0.25, 0, 2.0);
        /* Block 1B: the FLIR on the left of the radome */
        if (V.flir) {
          bx("sup", 0.2, 0.3, 0.12, -0.1, 0.62, 1.86);
          bx("dark", 0.5, 0.36, 0.42, 0.0, 0.88, 2.08);
          bx("glass", 0.04, 0.24, 0.24, 0.27, 0.88, 2.1);
        }
      });
    }
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 1.55, 1.55, 1.0, 16, 5.6, s * 4.2, ZF2);
      railRing(5.6, s * 4.2, ZF2 + 1.0, 1.48, 12);
      phalanx(5.6, s * 4.2, ZF2 + 1.0, s * 0.5);
    }

    /* --------------------------------------------- the 5-inch Mk 45 mounts */
    function gun() {
      cz("sup", 2.45, 2.55, 0.25, 24, 0, 0, 0);
      loftX("sup", [[-2.55, 1.30, 0.25, 2.30], [-2.35, 1.62, 0.25, 2.55], [-1.2, 1.75, 0.25, 2.65],
                    [0.6, 1.72, 0.25, 2.62], [1.55, 1.55, 0.25, 2.30], [2.35, 1.20, 0.25, 1.55],
                    [2.75, 0.85, 0.25, 1.05]], 18, 0.32);
      /* the canvas bloomer at the gun port, the barrel, the roof hatch */
      cx("dark", 0.45, 0.22, 0.75, 12, 2.0, 0, 1.3);
      cx("metal", 0.17, 0.13, 5.35, 12, 2.65, 0, 1.3);
      bx("sup", 0.9, 1.0, 0.1, -1.2, 0, 2.68);
      bx("dark", 0.06, 0.8, 1.3, -2.58, 0, 1.2);
    }
    /* the forward mount trains: it is the node the renderer aims */
    var X_GUN = 55.4, tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_GUN, 0, topZ(X_GUN, 0));
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    /* the after mount stands on the fantail and points aft: both drawings put
       its house centre 73 m abaft amidships, two metres aft of the step up
       to the weather deck, with its barrel over the Harpoon launchers      */
    stamp(-73.0, 0, topZ(-73.0, 0), PI, gun);

    /* ------------------------------------------------------ launchers ---- */
    function vlsField(xc) {
      var z0 = topZ(xc, 0) - 0.04;
      cur.vls.add(place(THREE, new THREE.BoxGeometry(6.4, 6.4, 0.2), xc, 0, z0 + 0.1, 0, 0, PI / 2));
      /* the coaming round the field and the joints between its modules */
      for (s = -1; s <= 1; s += 2) {
        bx("sup", 6.9, 0.25, 0.32, xc, s * 3.32, z0 + 0.16);
        bx("sup", 0.25, 6.4, 0.32, xc + s * 3.32, 0, z0 + 0.16);
      }
      bx("metal", 6.4, 0.1, 0.24, xc, 0, z0 + 0.13);
    }
    /* the Mk 26 twin-arm launcher: the stand on its ring, the trunnion yoke,
       two guide arms with the rail under each and the deflector at the back
       of each, and the two loading doors on deck on the magazine side      */
    function mk26(xc, dir) {
      var z0 = topZ(xc, 0) - 0.02;
      stamp(xc, 0, z0, dir > 0 ? 0 : PI, function () {
        cz("dark", 2.15, 2.15, 0.06, 22, 0, 0, 0);
        cz("sup", 1.55, 1.75, 0.75, 18, 0, 0, 0.02);
        cz("sup", 1.25, 1.35, 0.6, 16, 0, 0, 0.77);
        bx("sup", 1.6, 3.3, 0.9, -0.25, 0, 1.75);
        for (var q = -1; q <= 1; q += 2) {
          bx("sup", 5.0, 0.42, 0.55, 1.55, q * 1.2, 2.45, 0, -0.26, 0);
          bx("metal", 4.6, 0.14, 0.14, 1.62, q * 1.2, 2.08, 0, -0.26, 0);
          bx("metal", 0.12, 0.85, 1.0, -0.95, q * 1.2, 1.9, 0, 0.45, 0);
          bx("dark", 1.5, 1.05, 0.06, -3.4, q * 1.2, 0.04);
          bx("metal", 1.6, 0.08, 0.1, -3.4, q * 1.2 + q * 0.56, 0.06);
        }
      });
    }
    if (V.mk26) { mk26(41.0, 1); mk26(-56.2, -1); }
    else { vlsField(41.0); vlsField(-56.6); }

    /* two Harpoon quad launchers at the stern, canisters elevated outboard */
    function harpoon(x, y, side) {
      var z0 = topZ(x, y) - 0.02;
      stamp(x, y, z0, side > 0 ? PI / 2 : -PI / 2, function () {
        bx("sup", 2.4, 1.7, 0.2, 0.3, 0, 0.1);
        bx("metal", 0.22, 1.5, 1.85, -0.75, 0, 1.0);
        bx("metal", 0.22, 1.5, 0.75, 1.15, 0, 0.45);
        bar("metal", -0.75, 0.7, 1.9, 1.15, 0.7, 0.8, 0.07);
        bar("metal", -0.75, -0.7, 1.9, 1.15, -0.7, 0.8, 0.07);
        for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2) {
          var g = new THREE.CylinderGeometry(0.27, 0.27, 4.6, 10, 1, false);
          g.rotateZ(-PI / 2); g.rotateY(-0.61); g.translate(0.6, a * 0.36, 2.2 + b * 0.36);
          cur.sup.add(g);
          for (var r = -1; r <= 1; r += 2) {
            var h = new THREE.CylinderGeometry(0.31, 0.31, 0.16, 10, 1, false);
            h.rotateZ(-PI / 2); h.rotateY(-0.61);
            h.translate(0.6 + r * 1.35 * Math.cos(0.61), a * 0.36, 2.2 + b * 0.36 + r * 1.35 * Math.sin(0.61));
            cur.metal.add(h);
          }
          cur.dark.add(place(THREE, new THREE.BoxGeometry(0.08, 0.5, 0.5),
                             0.6 + 2.31 * Math.cos(0.61), a * 0.36, 2.2 + b * 0.36 + 2.31 * Math.sin(0.61), 0, -0.61, 0));
        }
      });
    }
    harpoon(-83.6, 4.2, 1);
    harpoon(-80.8, -4.2, -1);

    /* ------------------------------------------------- weather deck gear -- */
    /* solid bulwark on the forecastle, in short chords along the deck edge */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) {
        var xa = 57.0 + i * 5.0, xb = Math.min(xa + 5.0, 85.6);
        var ya = s * (hullHW(xa) - 0.12), yb = s * (hullHW(xb) - 0.12);
        var za = deckZ(xa), zb = deckZ(xb);
        bx("sup", Math.sqrt((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya)), 0.16, 1.1,
           (xa + xb) * 0.5, (ya + yb) * 0.5, (za + zb) * 0.5 + 0.62, 0, 0, Math.atan2(yb - ya, xb - xa));
      }
      /* lifelines along the weather deck. None on the fantail: render3d.js
         takes the level a deck machine stands at from the commonest height
         of the aft eighth's plan, and a rail post's top is not the deck. */
      var ep = [], ex = -64.0;
      while (ex < 57.0) {
        ep.push([ex, s * (hullHW(ex) - 0.15), deckZ(ex) + 0.08]);
        ex += (ex > -40 && ex < 26) ? 6.0 : 3.0;
      }
      ep.push([57.0, s * (hullHW(57.0) - 0.15), deckZ(57.0) + 0.08]);
      railRun("metal", ep, 1.0, 2.1);
    }
    /* double bitts along the sides and on the fantail */
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      bx("sup", 1.5, 0.6, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.2, 0.22, 0.6, 8, x - 0.45, y, z0);
      cz("metal", 0.2, 0.22, 0.6, 8, x + 0.45, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(80.0, s * 2.4); bitts(47.0, s * 6.9); bitts(-60.5, s * 7.0); bitts(-77.5, s * 5.9);
    }
    /* ensign staff and jackstaff */
    bar("metal", -85.2, 0, deckZ(-85.2), -85.2, 0, deckZ(-85.2) + 4.6, 0.07);
    bar("metal", 85.4, 0, deckZ(85.4) + 0.04, 85.4, 0, deckZ(85.4) + 3.6, 0.06);
    /* team stripe lying on the forecastle, where the camera looks down on it */
    flat("team", 59.6, -2.2, 63.8, 2.2, topZ(61.7, 0) + 0.05, 0, 0, 1, 1);

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["cruiser_n"] = {
  len: 172.9,
  build: function (THREE, M, C) {
    return HeroTiconderogaCG.build(THREE, M, C, { mk26: false, num: "", flir: true, satcom: true, rhib: true });
  }
};
UNIT_MODELS["nato_e90_cruiser"] = {
  len: 172.9,
  build: function (THREE, M, C) {
    return HeroTiconderogaCG.build(THREE, M, C, { mk26: false, num: "52", satcom: true, rhib: true });
  }
};
UNIT_MODELS["nato_e80_cruiser"] = {
  len: 172.9,
  build: function (THREE, M, C) {
    return HeroTiconderogaCG.build(THREE, M, C, { mk26: true, num: "47" });
  }
};
