/* ============================================================================
   destroyer_n.js -- HERO reference model: DDG-51 Arleigh Burke, Flight IIA.
   Style and period anchor for the e20 NATO surface roster.

   What has to read at a glance, measured off the reference photographs
   (a broadside line profile, USS Nitze from the starboard bow, and USS
   Preble from the port quarter):

     - ONE continuous faceted block, not a stack of 1950s deckhouses. Every
       vertical surface on this ship leans inboard six to ten degrees and
       every corner is a chamfer, because the whole superstructure is shaped
       for radar cross-section. Nothing on it is a plain upright box.
     - FOUR flat octagonal SPY-1D arrays, all four on the FORWARD deckhouse:
       two on the forward chamfers looking out over the bows at about
       45 degrees, two on the after chamfers of the same block looking aft.
       They are the single most legible thing about the class.
     - TWO Mk 41 hatch fields: a short 32-cell field on a low deckhouse
       between the gun and the bridge front, and a long 64-cell field aft,
       between the after deckhouse and the hangars.
     - The 5-inch Mk 45 on the forecastle, well forward, its house a low
       angular wedge rather than a rounded turret.
     - Flight IIA's tell: TWO helicopter hangars side by side with a flight
       deck abaft them, the after Phalanx and an illuminator on the roof.
     - A very tall mast. Masthead measures 45 m above the waterline against
       a 7 m midships freeboard -- nearly a third of the ship's length. Get
       that ratio wrong and the ship reads as a frigate.

   Model space: +X bow, +Y port, +Z up. Real metres, waterline at z = 0.
   render3d.js stands the model up with rotation.x = -PI/2, so authoring
   +Y up here would lay the ship on its side.

   Materials are the house three tiers only: SKIN (painted steel carrying a
   procedural CanvasTexture), METAL (bare fittings) and GLASS (pilothouse).
   ASCII only -- a stray byte in a hex literal has broken this project.

   Two things measured while building this, for whoever tunes warship3d.js
   to match:

   1. M.loft's superellipse section cannot give both a sharp deck edge and a
      rounded bilge at the same time. On a full-depth hull loft 12.8 m deep,
      the sq that squares the deck edge off (about 0.10) also flattens the
      bottom into a barge, and the sq that rounds the bilge (about 0.5)
      rounds 0.9 m off the deck edge. This hull is therefore lofted from an
      explicit station OUTLINE -- twelve points from deck edge to keel,
      blended between a full midship section and a fine V for the entry --
      which costs no more triangles than a 26-segment superellipse and gives
      a knuckle, real flare forward and a proper bilge turn.
   2. M.loft winds its quads inward, so a lofted hull under a FrontSide
      material shows you the inside of its far side. The loft below winds
      outward.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBurkeDDG = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA  = 155.3;          /* length overall                                */
  var XB   = LOA * 0.5;      /* stem at +XB, transom at -XB                    */
  var HB   = 10.05;          /* half beam                                     */
  var DR   = 6.30;           /* hull draught; the sonar dome hangs below it   */
  var ZTOP = 12.5, ZBOT = -9.5;   /* vertical span the hull texture covers    */

  /* Every fore-and-aft position that two parts have to agree about lives
     here. Values are metres from midships, taken off the profile drawing
     at 8.02 px/m.                                                          */
  var X_STEM   =  XB;
  var X_BULW   =  69.0;      /* solid bow bulwark ends here, railings begin   */
  var X_GUN    =  51.5;      /* Mk 45 ring centre                             */
  var X_VF0    =  34.6, X_VF1 = 44.4;    /* forward VLS deckhouse            */
  var X_S1F    =  33.5, X_S1A = -13.0;   /* 01 level, forward deckhouse      */
  var X_S2F    =  33.0, X_S2A =  -6.0;   /* 02 level                          */
  var X_S3F    =  32.4, X_S3A =   9.0;   /* 03 level: the SPY array block     */
  var X_PHF    =  31.0, X_PHA =  20.5;   /* pilothouse                        */
  var X_MAST   =  15.5;                  /* mast centre                       */
  var X_FUN1   =   4.0;                  /* forward funnel centre             */
  var X_FUN2   = -17.0;                  /* after funnel centre               */
  var X_A1F    = -12.0, X_A1A = -34.2;   /* after deckhouse, 01 level         */
  var X_A2F    = -13.0, X_A2A = -30.5;   /* after deckhouse, 02 level         */
  var X_VA0    = -46.6, X_VA1 = -34.4;   /* aft 64-cell field                 */
  var X_HGF    = -46.9, X_HGA = -59.3;   /* hangar block                      */
  var X_FDA    = -76.4;                  /* flight deck after edge            */

  /* deck levels (metres above the waterline) */
  var Z_01 =  9.50, Z_02 = 12.90, Z_03 = 18.50, Z_PH = 21.90, Z_04 = 23.10;
  var Z_A1 =  9.90, Z_A2 = 13.20;
  var Z_HGR = 11.70;                     /* hangar roof                       */
  var Z_VA  =  9.90;                     /* aft VLS hatch deck                */
  var Z_VF  =  8.80;                     /* forward VLS hatch deck            */
  var Z_ARR = 15.80;                     /* SPY array centre height           */
  var Z_MHD = 45.20;                     /* masthead                          */

  /* ============================================================ hull curves */
  function tOf(x) { return (x + XB) / LOA; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

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

  var HW_K = [[0.000, 0.628], [0.030, 0.700], [0.070, 0.790], [0.130, 0.878],
              [0.210, 0.944], [0.310, 0.984], [0.420, 1.000], [0.545, 1.000],
              [0.625, 0.991], [0.700, 0.963], [0.775, 0.902], [0.832, 0.812],
              [0.880, 0.722], [0.925, 0.578], [0.958, 0.398], [0.982, 0.207],
              [1.000, 0.026]];
  function hullHW(t) { return HB * tbl(HW_K, t); }

  /* sheer: flat aft, lifting hard over the forward third to an 11.7 m stem */
  function deckZ(t) {
    var u = Math.max(0, (t - 0.60) / 0.40);
    return 6.15 + 0.70 * t + 4.55 * Math.pow(u, 1.44);
  }
  function keelZ(t) {
    if (t < 0.10) return -3.35 - 2.95 * (t / 0.10);
    if (t < 0.78) return -DR;
    return -DR + 6.55 * Math.pow((t - 0.78) / 0.22, 1.85);
  }
  /* 0 = full midship box section, 1 = fine V. Fills the entry and lets the
     transom stay boxy without dragging the amidships shape round with it. */
  var VB_K = [[0.00, 0.16], [0.09, 0.05], [0.20, 0.00], [0.60, 0.00],
              [0.70, 0.09], [0.80, 0.30], [0.870, 0.56], [0.930, 0.79],
              [1.000, 1.00]];
  function vBlend(t) { return tbl(VB_K, t); }

  /* half-outline, deck edge (kd = 1) down to keel (kd = 0) */
  var SEC_FULL = [[1.000, 1.000], [1.004, 0.800], [1.000, 0.620], [0.990, 0.470],
                  [0.970, 0.350], [0.928, 0.250], [0.858, 0.168], [0.748, 0.100],
                  [0.588, 0.050], [0.398, 0.018], [0.198, 0.004], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.928, 0.800], [0.846, 0.620], [0.754, 0.470],
                  [0.654, 0.350], [0.552, 0.250], [0.444, 0.168], [0.336, 0.100],
                  [0.228, 0.050], [0.138, 0.018], [0.062, 0.004], [0.000, 0.000]];
  var CAMBER = [[0.560, 1.008], [0.000, 1.013], [-0.560, 1.008]];

  function ringOf(b) {
    var i, ky, kd, r = [];
    function pt(i) {
      return [SEC_FULL[i][0] + (SEC_FINE[i][0] - SEC_FULL[i][0]) * b,
              SEC_FULL[i][1] + (SEC_FINE[i][1] - SEC_FULL[i][1]) * b];
    }
    r.push(pt(0));
    for (i = 0; i < CAMBER.length; i++) r.push([CAMBER[i][0], CAMBER[i][1]]);
    for (i = 0; i < SEC_FULL.length; i++) { var p = pt(i); r.push([-p[0], p[1]]); }
    for (i = SEC_FULL.length - 2; i >= 1; i--) r.push(pt(i));
    return r;                                    /* 26 points, closed ring */
  }

  /* the stem rakes forward: points low on the section sit further aft */
  var RAKE_K = [[0.000, 0.0], [0.800, 0.0], [0.880, 1.5], [0.940, 4.0],
                [1.000, 8.2]];
  function rakeOf(t) { return tbl(RAKE_K, t); }

  var STATION_T = [0, 0.018, 0.048, 0.088, 0.140, 0.205, 0.275, 0.350, 0.430,
                   0.510, 0.585, 0.655, 0.720, 0.780, 0.832, 0.876, 0.913,
                   0.944, 0.969, 0.987, 1.000];

  /* ================================================================ helpers */
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function rng(seed) {
    var s = (seed >>> 0) || 11;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function tex(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = rep ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* ================================================================ textures
     One hull skin, one tiling superstructure plate, one non-skid, one flight
     deck, one sooted funnel casing and one launcher lid field per hatch
     count. Everything else takes its colour from the material.            */

  /* PAINT: PAINT.haze off warship3d.js, pulled a shade flatter and darker
     the way a 2020s ship reads against a 1950s one. No new palette.      */
  var P_HULL = 0x636b72, P_SUP = 0x6e767d, P_DECK = 0x43484d;

  function hullTex(THREE, team) {
    var W = 2048, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(51947), i, j, x, z, y0, y1;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    function dz(xx) { return deckZ(tOf(xx)); }

    g.fillStyle = hex(P_HULL); g.fillRect(0, 0, W, H);

    /* plate patchwork: adjacent strakes never weather to the same tone */
    for (i = 0; i < 110; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.6), 50 + R() * 210, 9 + R() * 26);
    }
    g.globalAlpha = 1;

    /* anti-fouling below the waterline, then the boot topping band over it */
    g.fillStyle = "#38211d"; g.fillRect(0, Y(-0.85), W, H - Y(-0.85));
    for (i = 0; i < 70; i++) {
      g.globalAlpha = 0.022 + R() * 0.035;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, Y(-0.85) + R() * (H - Y(-0.85)), 80 + R() * 240, 14 + R() * 34);
    }
    g.globalAlpha = 1;
    g.fillStyle = "#15181b"; g.fillRect(0, Y(0.95), W, Y(-0.85) - Y(0.95));

    /* horizontal strake seams, in real height so they stay level */
    g.lineWidth = 1.5;
    var STR = [-5.6, -4.2, -2.8, -1.5, 0.95, 2.35, 3.75, 5.15, 6.55, 7.95,
               9.35, 10.75, 12.1];
    for (i = 0; i < STR.length; i++) {
      y0 = Y(STR[i]);
      g.strokeStyle = "rgba(0,0,0,0.32)";
      g.beginPath(); g.moveTo(0, y0); g.lineTo(W, y0); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.10)";
      g.beginPath(); g.moveTo(0, y0 + 1.6); g.lineTo(W, y0 + 1.6); g.stroke();
    }
    /* vertical butts, staggered strake to strake */
    g.lineWidth = 1.2; g.strokeStyle = "rgba(0,0,0,0.13)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 18; j++) {
        x = ((j + st) / 18) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }

    /* freeing ports and scuppers along the deck edge, each weeping rust */
    for (i = 0; i < 46; i++) {
      x = -XB + 6 + (i / 45) * (LOA - 20);
      z = dz(x) - 0.95;
      g.globalAlpha = 0.34; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 5, Y(z) - 3, 10, 6);
      if (R() < 0.55) continue;
      g.globalAlpha = 0.045 + R() * 0.05; g.fillStyle = "#6d4526";
      var len = (1.0 + R() * 2.6) * (H / (ZTOP - ZBOT));
      g.fillRect(U(x) - 3, Y(z) + 3, 5, len);
      g.globalAlpha = 0.026; g.fillRect(U(x) - 7, Y(z) + 3, 13, len * 0.6);
    }
    /* anchor gear on both bows bleeds a much heavier streak */
    for (i = 0; i < 2; i++) {
      x = 62.5 - i * 2.0; z = dz(x) - 2.4;
      g.globalAlpha = 0.50; g.fillStyle = "#1c2125";
      g.beginPath(); g.arc(U(x), Y(z), 9, 0, 6.2832); g.fill();
      g.globalAlpha = 0.13; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 8, Y(z), 15, 4.5 * (H / (ZTOP - ZBOT)));
      g.globalAlpha = 0.06;
      g.fillRect(U(x) - 15, Y(z), 29, 3.0 * (H / (ZTOP - ZBOT)));
    }
    g.globalAlpha = 1;

    /* exhaust staining, streaming AFT from each funnel along the upper hull */
    var FUN = [X_FUN1, X_FUN2];
    for (i = 0; i < FUN.length; i++) {
      for (j = 0; j < 220; j++) {
        var f = R();
        x = FUN[i] - f * 34 - 2;
        z = dz(x) - 0.4 - R() * 3.4;
        g.globalAlpha = 0.045 * (1 - f) + 0.010;
        g.fillStyle = "#2a2d30";
        g.fillRect(U(x), Y(z), 10 + R() * 40, 5 + R() * 16);
      }
    }
    g.globalAlpha = 1;

    /* draught marks fore and aft, and a shadow line under the deck edge */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 70.5 : -70.5;
      for (j = 0; j <= 12; j++) {
        g.fillRect(U(x) - 7, Y(-1.4 + j * 0.52), j % 2 ? 8 : 14, 2.4);
      }
    }
    g.globalAlpha = 0.30; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = -XB + (i / W) * LOA;
      g.fillRect(i, Y(dz(x)) - 1, 4, 7);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, false);
  }

  /* tiling superstructure plating: 4 m of steel per tile */
  function supTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(30157), i;
    g.fillStyle = hex(P_SUP); g.fillRect(0, 0, W, H);
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.014 + R() * 0.024;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 60 + R() * 190, 40 + R() * 130);
    }
    g.globalAlpha = 1; g.lineWidth = 1.6;
    for (i = 1; i < 4; i++) {
      g.strokeStyle = "rgba(0,0,0,0.26)";
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
      g.beginPath(); g.moveTo(0, i * H / 4 + 2); g.lineTo(W, i * H / 4 + 2); g.stroke();
    }
    /* watertight doors and scuttles: small enough to belong in the paint */
    for (i = 0; i < 5; i++) {
      g.globalAlpha = 0.16; g.fillStyle = "#252a2e";
      g.fillRect(30 + R() * (W - 90), 40 + R() * (H - 150), 30, 66);
    }
    for (i = 0; i < 20; i++) {
      g.globalAlpha = 0.16; g.fillStyle = "#1f2327";
      g.beginPath(); g.arc(R() * W, R() * H, 2.5 + R() * 2.5, 0, 6.2832); g.fill();
    }
    /* rust weeping downward off fittings */
    g.fillStyle = "#6d4526";
    for (i = 0; i < 34; i++) {
      g.globalAlpha = 0.025 + R() * 0.04;
      g.fillRect(R() * W, R() * H, 3 + R() * 4, 14 + R() * 60);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* weather deck: non-skid, tie-down grid, panel joints */
  function deckTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(9931), i;
    g.fillStyle = hex(P_DECK); g.fillRect(0, 0, W, H);
    for (i = 0; i < 22; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 60 + R() * 170, 40 + R() * 120);
    }
    g.globalAlpha = 0.26; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 2600; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* funnel casing: same plate, blackened round the uptake mouth */
  function funnelTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(7717), i;
    g.fillStyle = hex(P_SUP); g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.24; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 4; i++) {
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
    }
    for (i = 0; i < 260; i++) {
      g.globalAlpha = 0.02 + R() * 0.10;
      g.fillStyle = "#25282b";
      g.fillRect(R() * W, R() * H * 0.44, 8 + R() * 40, 6 + R() * 34);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* a Mk 41 field reads as a grid of lids sunk flush in the deck */
  function vlsTex(THREE, nx, ny) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var cw = W / nx, ch = H / ny, i, j;
    g.fillStyle = "#40454a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < nx; i++) for (j = 0; j < ny; j++) {
      var px = i * cw, py = j * ch;
      g.fillStyle = "#22262a";
      g.fillRect(px + cw * 0.07, py + ch * 0.07, cw * 0.86, ch * 0.86);
      g.fillStyle = "#5d656b";
      g.fillRect(px + cw * 0.07, py + ch * 0.07, cw * 0.86, ch * 0.10);
      g.fillStyle = "#14171a";
      g.fillRect(px + cw * 0.47, py + ch * 0.12, cw * 0.06, ch * 0.76);
      g.fillStyle = "rgba(255,255,255,0.10)";
      g.fillRect(px + cw * 0.12, py + ch * 0.20, cw * 0.30, ch * 0.06);
    }
    return tex(THREE, cv, false);
  }

  /* flight deck: dark non-skid, landing circle, line-up line, tramlines */
  function padTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(2179), i;
    g.fillStyle = "#33383d"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 34; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#262a2e" : "#454b51";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.34; g.fillStyle = "#000000";
    for (i = 0; i < 2400; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    /* u runs athwart, v runs fore-and-aft on the deck slab */
    g.strokeStyle = "#d6dbdd"; g.lineWidth = 9;
    g.beginPath(); g.arc(W * 0.5, H * 0.62, W * 0.25, 0, 6.2832); g.stroke();
    g.lineWidth = 6;
    g.beginPath(); g.moveTo(W * 0.5, H * 0.06); g.lineTo(W * 0.5, H * 0.32); g.stroke();
    g.fillStyle = "#d6dbdd";
    g.save(); g.translate(W * 0.5, H * 0.62); g.rotate(-PI / 2);
    g.font = "bold 150px Arial"; g.textAlign = "center";
    g.fillText("H", 0, 53); g.restore();
    g.strokeStyle = "rgba(220,228,232,0.45)"; g.lineWidth = 4;
    for (i = 0; i < 2; i++) {
      var xx = W * (0.20 + i * 0.60);
      g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, H); g.stroke();
    }
    return tex(THREE, cv, false);
  }

  /* pennant number, in the team colour so ownership reads on a busy map */
  function pennantTex(THREE, team) {
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    g.clearRect(0, 0, W, H);
    g.font = "bold 210px Arial"; g.textAlign = "center";
    g.lineWidth = 16; g.strokeStyle = "rgba(10,13,16,0.90)";
    g.strokeText("51", W * 0.5, 196);
    g.fillStyle = hex(team); g.fillText("51", W * 0.5, 196);
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var M = {};
    /* --- tier 1: SKIN, painted steel, every one procedurally textured --- */
    M.hull  = new THREE.MeshStandardMaterial({ map: hullTex(THREE, team),
                 roughness: 0.87, metalness: 0.07 });
    M.sup   = new THREE.MeshStandardMaterial({ map: supTex(THREE),
                 roughness: 0.88, metalness: 0.06 });
    M.supF  = new THREE.MeshStandardMaterial({ map: supTex(THREE),
                 roughness: 0.88, metalness: 0.06, flatShading: true });
    M.deck  = new THREE.MeshStandardMaterial({ map: deckTex(THREE),
                 roughness: 0.95, metalness: 0.04 });
    M.pad   = new THREE.MeshStandardMaterial({ map: padTex(THREE),
                 roughness: 0.95, metalness: 0.04 });
    M.funn  = new THREE.MeshStandardMaterial({ map: funnelTex(THREE),
                 roughness: 0.89, metalness: 0.06 });
    M.vlsF  = new THREE.MeshStandardMaterial({ map: vlsTex(THREE, 8, 4),
                 roughness: 0.86, metalness: 0.08 });
    M.vlsA  = new THREE.MeshStandardMaterial({ map: vlsTex(THREE, 8, 8),
                 roughness: 0.86, metalness: 0.08 });
    M.rad   = new THREE.MeshStandardMaterial({ color: 0xd2d5cf,
                 roughness: 0.90, metalness: 0.03 });   /* radomes, SPY faces */
    M.arr   = new THREE.MeshStandardMaterial({ color: 0xcbcfc8,
                 roughness: 0.88, metalness: 0.04, flatShading: true });
    M.undr  = new THREE.MeshStandardMaterial({ color: 0x4a2c26,
                 roughness: 0.92, metalness: 0.04 });   /* anti-fouling      */
    M.dark  = new THREE.MeshStandardMaterial({ color: 0x373b40,
                 roughness: 0.90, metalness: 0.05 });   /* recesses, uptakes  */
    M.team  = new THREE.MeshStandardMaterial({ color: team,
                 roughness: 0.84, metalness: 0.06 });
    M.penn  = new THREE.MeshStandardMaterial({ map: pennantTex(THREE, team),
                 transparent: true, roughness: 0.85, metalness: 0.05 });
    /* --- tier 2: METAL, bare fittings ---------------------------------- */
    M.metal = new THREE.MeshStandardMaterial({ color: 0x8b9298,
                 roughness: 0.55, metalness: 0.50 });
    M.steel = new THREE.MeshStandardMaterial({ color: 0x5a6167,
                 roughness: 0.50, metalness: 0.60 });   /* barrels, screws    */
    /* --- tier 3: GLASS -------------------------------------------------- */
    M.glass = new THREE.MeshPhysicalMaterial({ color: 0x2b3a44,
                 roughness: 0.10, metalness: 0.0, transparent: true,
                 opacity: 0.84, clearcoat: 0.7 });

    /* Colour space. render3d.js runs prepModel() over every template and
       converts each material colour sRGB -> linear, guarded by a
       userData._srgbDone flag. cmp.html does NOT, so an untextured colour
       comes out roughly 0.45 gamma too bright there: 0x38211d anti-fouling
       rendered as salmon pink. Do the conversion here and set the flag, and
       the same hex reads the same in the comparison page and in the game.
       Textures already carry sRGBEncoding, which is why the painted hull was
       the only thing on the model that looked right before this.          */
    for (var k in M) {
      if (!M.hasOwnProperty(k)) continue;
      if (M[k].color && M[k].color.convertSRGBToLinear) M[k].color.convertSRGBToLinear();
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ============================================================== geometry */
  /* hull: an explicit-outline loft, wound outward, textured in real height */
  function hullMesh(THREE, mtl) {
    var pos = [], uv = [], idx = [], rings = [], i, j;
    for (i = 0; i < STATION_T.length; i++) {
      var t = STATION_T[i], r = ringOf(vBlend(t));
      var w = hullHW(t), kz = keelZ(t), dz = deckZ(t), dep = dz - kz;
      var x = -XB + t * LOA, rk = rakeOf(t);
      for (j = 0; j < r.length; j++) {
        var y = w * r[j][0], z = kz + dep * r[j][1];
        pos.push(x + rk * (r[j][1] - 1.0), y, z);
        uv.push(t, (z - ZBOT) / (ZTOP - ZBOT));
      }
      rings.push(r.length);
    }
    var R = rings[0];
    for (i = 0; i < STATION_T.length - 1; i++) {
      for (j = 0; j < R; j++) {
        var a = i * R + j, b = i * R + (j + 1) % R;
        var c = a + R, d = b + R;
        idx.push(a, b, d, a, d, c);
      }
    }
    /* transom and stem caps */
    function cap(sIdx, flip) {
      var base = sIdx * R, k;
      var cx = 0, cy = 0, cz = 0;
      for (k = 0; k < R; k++) {
        cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1];
        cz += pos[(base + k) * 3 + 2];
      }
      cx /= R; cy /= R; cz /= R;
      var ci = pos.length / 3;
      pos.push(cx, cy, cz);
      uv.push(sIdx ? 1 : 0, (cz - ZBOT) / (ZTOP - ZBOT));
      for (k = 0; k < R; k++) {
        var p = base + k, q = base + (k + 1) % R;
        if (flip) idx.push(ci, q, p); else idx.push(ci, p, q);
      }
    }
    cap(0, false);
    cap(STATION_T.length - 1, true);

    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* the weather deck: a cambered ribbon laid on the hull top, sheer and all */
  function deckRibbon(THREE, mtl, x0, x1) {
    var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
    var pos = [], uv = [], idx = [], i, j, n = 22;
    for (i = 0; i <= n; i++) {
      var x = x0 + (x1 - x0) * (i / n), t = tOf(x);
      var r = ringOf(vBlend(t)), w = hullHW(t), kz = keelZ(t), dz = deckZ(t);
      var dep = dz - kz;
      for (j = 0; j < KY.length; j++) {
        var ky = KY[j], ak = Math.abs(ky);
        /* height of the deck at this fraction of the half beam */
        var kd = 1.0;
        if (ak > 0.995) kd = r[0][1];
        else kd = 1.0 + (1.013 - 1.0) * (1 - ak * ak);
        pos.push(x, w * ky, kz + dep * kd + 0.05);
        uv.push(x / 5.5, ky * w / 5.5);
      }
    }
    var R = KY.length;
    for (i = 0; i < n; i++) for (j = 0; j < R - 1; j++) {
      var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* ---- faceted deckhouse: a plan polygon extruded with an inboard lean ---
     The taper is given in METRES of inset, not as a scale factor, because a
     deckhouse 46 m long and 17 m wide has to lose the same 0.6 m off each
     side; scaling it uniformly shortens the block instead of leaning it. */
  function bboxOf(poly) {
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, i;
    for (i = 0; i < poly.length; i++) {
      x0 = Math.min(x0, poly[i][0]); x1 = Math.max(x1, poly[i][0]);
      y0 = Math.min(y0, poly[i][1]); y1 = Math.max(y1, poly[i][1]);
    }
    return { x0: x0, x1: x1, y0: y0, y1: y1, cx: (x0 + x1) * 0.5,
             cy: (y0 + y1) * 0.5, w: x1 - x0, h: y1 - y0 };
  }
  function shrinkAt(poly, inX, inY, f) {
    var b = bboxOf(poly);
    return { cx: b.cx, cy: b.cy,
             sx: (b.w - 2 * inX * f) / b.w,
             sy: (b.h - 2 * inY * f) / b.h };
  }
  function polyAt(poly, inX, inY, f) {
    var s = shrinkAt(poly, inX, inY, f), out = [], i;
    for (i = 0; i < poly.length; i++)
      out.push([s.cx + (poly[i][0] - s.cx) * s.sx,
                s.cy + (poly[i][1] - s.cy) * s.sy]);
    return out;
  }
  function prism(THREE, poly, z0, z1, inX, inY, mtl, uvs) {
    var s = shrinkAt(poly, inX, inY, 1), n = poly.length, i;
    var pos = [], uv = [], per = 0;
    var US = uvs || 4.0;
    function push(x, y, z, u, v) { pos.push(x, y, z); uv.push(u, v); }
    for (i = 0; i < n; i++) {
      var a = poly[i], b = poly[(i + 1) % n];
      var at = [s.cx + (a[0] - s.cx) * s.sx, s.cy + (a[1] - s.cy) * s.sy];
      var bt = [s.cx + (b[0] - s.cx) * s.sx, s.cy + (b[1] - s.cy) * s.sy];
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy);
      var u0 = per / US, u1 = (per + L) / US;
      per += L;
      push(a[0], a[1], z0, u0, z0 / US);
      push(b[0], b[1], z0, u1, z0 / US);
      push(bt[0], bt[1], z1, u1, z1 / US);
      push(a[0], a[1], z0, u0, z0 / US);
      push(bt[0], bt[1], z1, u1, z1 / US);
      push(at[0], at[1], z1, u0, z1 / US);
    }
    /* caps, fanned from the bbox centre (all these plans are convex) */
    for (i = 0; i < n; i++) {
      var p = poly[i], q = poly[(i + 1) % n];
      var pt = [s.cx + (p[0] - s.cx) * s.sx, s.cy + (p[1] - s.cy) * s.sy];
      var qt = [s.cx + (q[0] - s.cx) * s.sx, s.cy + (q[1] - s.cy) * s.sy];
      push(s.cx, s.cy, z1, s.cx / US, s.cy / US);
      push(pt[0], pt[1], z1, pt[0] / US, pt[1] / US);
      push(qt[0], qt[1], z1, qt[0] / US, qt[1] / US);
      push(s.cx, s.cy, z0, s.cx / US, s.cy / US);
      push(q[0], q[1], z0, q[0] / US, q[1] / US);
      push(p[0], p[1], z0, p[0] / US, p[1] / US);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }
  /* mid-height position and outward heading of one wall of a prism */
  function faceAt(poly, i, z0, z1, inX, inY, z) {
    var f = (z - z0) / (z1 - z0);
    var s = shrinkAt(poly, inX, inY, f), n = poly.length;
    var a = poly[i], b = poly[(i + 1) % n];
    var ax = s.cx + (a[0] - s.cx) * s.sx, ay = s.cy + (a[1] - s.cy) * s.sy;
    var bx = s.cx + (b[0] - s.cx) * s.sx, by = s.cy + (b[1] - s.cy) * s.sy;
    var dx = bx - ax, dy = by - ay;
    return { x: (ax + bx) * 0.5, y: (ay + by) * 0.5,
             len: Math.sqrt(dx * dx + dy * dy), yaw: Math.atan2(-dx, dy) };
  }

  function box(THREE, mtl, lx, ly, lz) {
    return new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), mtl);
  }
  /* cylinder about the vertical (+Z) axis */
  function cylZ(THREE, mtl, r0, r1, h, seg) {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(r0, r1, h, seg || 8).rotateX(PI / 2), mtl);
  }
  /* cylinder about the fore-and-aft (+X) axis */
  function cylX(THREE, mtl, r0, r1, h, seg) {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(r0, r1, h, seg || 8).rotateZ(-PI / 2), mtl);
  }
  function strut(THREE, mtl, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4), mtl);
    m.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }
  function octagon(r) {
    var p = [], i;
    for (i = 0; i < 8; i++) {
      var a = (i + 0.5) * PI / 4;
      p.push([r * Math.cos(a), r * Math.sin(a)]);
    }
    return p;
  }

  /* stanchion-and-wire railing: a warship without these does not read as one */
  function railRun(THREE, G, mtl, pts, h) {
    var i, k, n = pts.length;
    for (i = 0; i < n; i++) {
      var s = cylZ(THREE, mtl, 0.045, 0.045, h, 4);
      s.position.set(pts[i][0], pts[i][1], pts[i][2] + h * 0.5);
      G.add(s);
    }
    for (i = 0; i < n - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      for (k = 1; k <= 2; k++) {
        var zz = h * (k === 1 ? 0.55 : 1.0);
        var w = new THREE.Mesh(new THREE.BoxGeometry(L, 0.05, 0.05), mtl);
        w.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5,
                       (a[2] + b[2]) * 0.5 + zz);
        w.rotation.z = Math.atan2(dy, dx);
        G.add(w);
      }
    }
  }
  /* sample the hull deck edge between two stations, both sides */
  function deckEdge(x0, x1, n, inset) {
    var out = [], i;
    for (i = 0; i <= n; i++) {
      var x = x0 + (x1 - x0) * (i / n), t = tOf(x);
      var w = hullHW(t) - (inset || 0.25);
      out.push([x, w, deckZ(t) + 0.10]);
    }
    return out;
  }

  /* =============================================================== assembly */
  function build(THREE, MOD, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var M = makeMats(THREE, team);
    var G = new THREE.Group();
    var i, j, s, m, p;

    /* ---------------------------------------------------------- hull ---- */
    G.add(hullMesh(THREE, M.hull));
    G.add(deckRibbon(THREE, M.deck, -XB + 0.6, XB - 1.2));

    /* SQS-53C bow sonar dome: it is what the underwater profile is about */
    var dome = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 8), M.undr);
    dome.scale.set(9.6, 2.10, 2.05);
    dome.position.set(55.0, 0, -4.85);
    G.add(dome);

    /* shafts, struts, screws and rudders */
    for (s = -1; s <= 1; s += 2) {
      var sh = strut(THREE, M.metal, [-52.0, s * 2.6, -5.10],
                                     [-65.2, s * 3.30, -5.95], 0.30, 6);
      G.add(sh);
      G.add(strut(THREE, M.metal, [-61.0, s * 1.2, -3.4],
                                  [-63.6, s * 3.25, -5.85], 0.24, 4));
      G.add(strut(THREE, M.metal, [-66.6, s * 1.2, -3.2],
                                  [-64.4, s * 3.28, -5.90], 0.24, 4));
      var hub = cylX(THREE, M.steel, 0.62, 0.30, 1.5, 8);
      hub.position.set(-66.1, s * 3.32, -5.98); G.add(hub);
      for (j = 0; j < 5; j++) {
        var bl = box(THREE, M.steel, 0.32, 0.55, 2.30);
        bl.position.set(-66.0, s * 3.32, -5.98);
        var grp = new THREE.Group();
        grp.position.set(-66.0, s * 3.32, -5.98);
        bl.position.set(0, 0, 1.30);
        bl.rotation.x = 0.42 * s; bl.rotation.y = 0.30;
        grp.add(bl);
        grp.rotation.x = j * PI * 2 / 5;
        G.add(grp);
      }
      var rud = box(THREE, M.undr, 3.10, 0.42, 4.30);
      rud.position.set(-70.4, s * 3.05, -4.20); G.add(rud);
      /* bilge keel: a thin strake that makes the underbody read as a hull */
      var bk = box(THREE, M.undr, 32.0, 0.16, 0.62);
      bk.position.set(-6.0, s * 8.40, -4.62);
      bk.rotation.x = s * 0.75; G.add(bk);
    }

    /* pennant numbers, team coloured, one on each bow */
    for (s = -1; s <= 1; s += 2) {
      var pn = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.1), M.penn);
      var tp = tOf(59.0);
      pn.position.set(59.0, s * (hullHW(tp) * 0.960 + 0.30), deckZ(tp) - 2.35);
      if (s > 0) pn.rotation.set(-PI / 2, 0, PI);
      else       pn.rotation.set(PI / 2, 0, 0);
      G.add(pn);
    }

    /* ------------------------------------------------- bow: bulwark, gear */
    var bwT = tOf(X_BULW);
    var bw = [];
    for (i = 0; i <= 8; i++) {
      var xx = X_BULW + (XB - 1.5 - X_BULW) * (i / 8), tt = tOf(xx);
      bw.push([xx, hullHW(tt) - 0.10]);
    }
    for (i = 8; i >= 0; i--) bw.push([bw[i][0], -bw[i][1]]);
    /* the bulwark is a thin wall, so build it as two leaning strips */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 8; i++) {
        var xa = bw[i][0], xb2 = bw[i + 1][0];
        var ya = bw[i][1] * s, yb = bw[i + 1][1] * s;
        var za = deckZ(tOf(xa)), zb = deckZ(tOf(xb2));
        var seg = new THREE.Mesh(new THREE.BoxGeometry(
          Math.sqrt((xb2 - xa) * (xb2 - xa) + (yb - ya) * (yb - ya)), 0.16, 1.15), M.sup);
        seg.position.set((xa + xb2) * 0.5, (ya + yb) * 0.5, (za + zb) * 0.5 + 0.62);
        seg.rotation.z = Math.atan2(yb - ya, xb2 - xa);
        G.add(seg);
      }
    }
    /* anchors, sitting in their hawses on each bow */
    for (s = -1; s <= 1; s += 2) {
      var tA = tOf(62.5);
      var an = box(THREE, M.steel, 2.30, 0.45, 1.55);
      an.position.set(62.5, s * (hullHW(tA) - 0.05), deckZ(tA) - 2.45);
      G.add(an);
    }
    /* jackstaff and ensign staff */
    var jack = cylZ(THREE, M.metal, 0.08, 0.05, 4.4, 4);
    jack.position.set(XB - 1.4, 0, deckZ(1) + 1.6); G.add(jack);
    var ens = cylZ(THREE, M.metal, 0.09, 0.05, 5.0, 4);
    ens.position.set(-XB + 1.2, 0, deckZ(0) + 2.2); G.add(ens);

    /* ------------------------------------------------ 5-inch Mk 45 mount --
       Named "turret": render3d.js finds it by name and trains it on the
       target. Its contents sit about its OWN ring centre so it swings on
       its own axis, not the ship's.                                       */
    var tGun = tOf(X_GUN), zGun = deckZ(tGun) + 0.02;
    var turret = new THREE.Group();
    turret.name = "turret";
    turret.position.set(X_GUN, 0, zGun);
    G.add(turret);
    var ring = cylZ(THREE, M.sup, 2.35, 2.55, 0.95, 14);
    ring.position.z = 0.42; turret.add(ring);
    var GH = [[ 3.65, 0.50], [ 1.55, 1.95], [-2.55, 1.95], [-3.75, 1.10],
              [-3.75, -1.10], [-2.55, -1.95], [ 1.55, -1.95], [ 3.65, -0.50]];
    turret.add(prism(THREE, GH, 0.86, 3.55, 0.20, 0.26, M.supF, 3.0));
    /* the near-flat roof plate that gives the mount its wedge in elevation */
    turret.add(prism(THREE, [[1.20, 1.55], [-2.30, 1.55], [-2.30, -1.55],
                             [1.20, -1.55]], 3.55, 3.95, 0.55, 0.55, M.supF, 3.0));
    /* the sloped shield face the barrel comes through */
    var slide = box(THREE, M.steel, 2.30, 1.30, 1.05);
    slide.position.set(3.95, 0, 2.35); turret.add(slide);
    /* thermal sleeve off the mantlet, then the bare tube, then the muzzle */
    var shr = cylX(THREE, M.steel, 0.295, 0.325, 2.60, 10);
    shr.position.set(6.20, 0, 2.35); turret.add(shr);
    var brl = cylX(THREE, M.steel, 0.185, 0.225, 5.40, 10);
    brl.position.set(10.05, 0, 2.35); turret.add(brl);
    var muz = cylX(THREE, M.steel, 0.275, 0.275, 0.80, 10);
    muz.position.set(12.55, 0, 2.35); turret.add(muz);

    /* ------------------------------------------- forward 32-cell Mk 41 --- */
    var VF = [[X_VF1, 3.2], [X_VF1 - 1.4, 5.55], [X_VF0 + 1.4, 5.75],
              [X_VF0, 3.4], [X_VF0, -3.4], [X_VF0 + 1.4, -5.75],
              [X_VF1 - 1.4, -5.55], [X_VF1, -3.2]];
    G.add(prism(THREE, VF, 5.6, Z_VF, 0.28, 0.34, M.supF));
    var vfp = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 5.2), M.vlsF);
    vfp.position.set((X_VF0 + X_VF1) * 0.5 - 0.2, 0, Z_VF + 0.03);
    vfp.rotation.z = PI / 2; G.add(vfp);
    /* coaming so the field reads as sunk in, not painted on */
    for (s = -1; s <= 1; s += 2) {
      m = box(THREE, M.sup, 5.6, 0.34, 0.36);
      m.position.set((X_VF0 + X_VF1) * 0.5 - 0.2, s * 4.95, Z_VF + 0.15); G.add(m);
      m = box(THREE, M.sup, 0.34, 10.2, 0.36);
      m.position.set((X_VF0 + X_VF1) * 0.5 - 0.2 + s * 2.9, 0, Z_VF + 0.15); G.add(m);
    }

    /* =============================================== forward deckhouse ====
       Three tiers, every wall leaning inboard, every corner chamfered.    */
    var S1 = [[X_S1F, 3.30], [X_S1F - 3.2, 6.90], [X_S1F - 8.0, 8.55],
              [-6.0, 8.60], [X_S1A + 4.0, 8.40], [X_S1A, 5.00],
              [X_S1A, -5.00], [X_S1A + 4.0, -8.40], [-6.0, -8.60],
              [X_S1F - 8.0, -8.55], [X_S1F - 3.2, -6.90], [X_S1F, -3.30]];
    G.add(prism(THREE, S1, 5.20, Z_01, 0.42, 0.62, M.supF));

    var S2 = [[X_S2F, 2.95], [X_S2F - 3.6, 6.60], [X_S2F - 9.0, 7.95],
              [X_S2A + 8.0, 7.95], [X_S2A, 4.20], [X_S2A, -4.20],
              [X_S2A + 8.0, -7.95], [X_S2F - 9.0, -7.95],
              [X_S2F - 3.6, -6.60], [X_S2F, -2.95]];
    G.add(prism(THREE, S2, Z_01, Z_02, 0.40, 0.58, M.supF));

    /* the array block. Walls 0 and 8 carry the forward pair of SPY-1D
       faces, walls 3 and 5 the after pair.                               */
    var S3 = [[X_S3F, 2.50], [X_S3F - 4.8, 7.20], [22.0, 7.60], [15.0, 7.60],
              [X_S3A, 3.60], [X_S3A, -3.60], [15.0, -7.60], [22.0, -7.60],
              [X_S3F - 4.8, -7.20], [X_S3F, -2.50]];
    var IN3X = 0.72, IN3Y = 0.56;
    G.add(prism(THREE, S3, Z_02, Z_03, IN3X, IN3Y, M.supF));

    var ARRAY_WALLS = [0, 3, 5, 8];
    for (i = 0; i < ARRAY_WALLS.length; i++) {
      var fi = faceAt(S3, ARRAY_WALLS[i], Z_02, Z_03, IN3X, IN3Y, Z_ARR);
      var ag = new THREE.Group();
      ag.position.set(fi.x + Math.cos(fi.yaw) * 0.14,
                      fi.y + Math.sin(fi.yaw) * 0.14, Z_ARR);
      ag.rotation.z = fi.yaw + PI / 2;
      /* backing frame, then the octagonal face standing proud of it */
      var frm = prism(THREE, octagon(2.28), 0, 0.30, 0.02, 0.02, M.supF, 2.5);
      frm.rotation.x = PI / 2 - 0.13;
      ag.add(frm);
      var pan = prism(THREE, octagon(2.02), 0.30, 0.52, 0.02, 0.02, M.arr, 2.5);
      pan.rotation.x = PI / 2 - 0.13;
      ag.add(pan);
      G.add(ag);
    }

    for (s = -1; s <= 1; s += 2) {
      var ew = prism(THREE, [[26.5, 0.1], [26.5, 2.5], [22.3, 2.5], [22.3, 0.1]],
                     0, 2.20, 0.30, 0.35, M.supF, 3.0);
      ew.position.set(0, s * 7.35, Z_01 + 0.9);
      ew.rotation.x = s > 0 ? -0.22 : 0.22;
      if (s < 0) ew.scale.y = -1;
      G.add(ew);
    }

    /* pilothouse and the bridge wings */
    var PH = [[X_PHF, 2.10], [X_PHF - 2.4, 4.85], [X_PHA + 1.6, 5.55],
              [X_PHA, 5.10], [X_PHA, -5.10], [X_PHA + 1.6, -5.55],
              [X_PHF - 2.4, -4.85], [X_PHF, -2.10]];
    G.add(prism(THREE, PH, Z_03, Z_PH, 0.40, 0.46, M.supF));
    /* window band: front, both forward chamfers, both sides */
    var WW = [0, 1, 6, 7];
    for (i = 0; i < WW.length; i++) {
      var fw = faceAt(PH, WW[i], Z_03, Z_PH, 0.40, 0.46, 20.05);
      var gl = box(THREE, M.glass, 0.20, fw.len * 0.94, 2.05);
      gl.position.set(fw.x + Math.cos(fw.yaw) * 0.14,
                      fw.y + Math.sin(fw.yaw) * 0.14, 20.05);
      gl.rotation.z = fw.yaw; G.add(gl);
    }
    for (s = -1; s <= 1; s += 2) {
      var gs = box(THREE, M.glass, 5.6, 0.20, 1.90);
      gs.position.set(X_PHA + 3.6, s * 4.96, 20.05); G.add(gs);
      /* bridge wing platform */
      var wg = box(THREE, M.sup, 3.4, 2.0, 0.22);
      wg.position.set(X_PHA + 2.4, s * 6.0, Z_03 + 0.15); G.add(wg);
      railRun(THREE, G, M.metal, [[X_PHA + 0.9, s * 6.9, Z_03 + 0.25],
                                  [X_PHA + 3.9, s * 6.9, Z_03 + 0.25]], 1.05);
    }
    /* 04 level and the forward SPG-62 illuminator */
    var L4 = [[28.6, 1.9], [26.9, 3.9], [21.9, 3.9], [20.9, 2.2],
              [20.9, -2.2], [21.9, -3.9], [26.9, -3.9], [28.6, -1.9]];
    G.add(prism(THREE, L4, Z_PH, Z_04, 0.24, 0.28, M.supF));

    function illuminator(x, y, z) {
      var q = new THREE.Group();
      q.position.set(x, y, z);
      var ped = cylZ(THREE, M.sup, 0.85, 1.00, 0.90, 10);
      ped.position.z = 0.45; q.add(ped);
      var dish = new THREE.Mesh(
        new THREE.CylinderGeometry(1.70, 1.25, 0.60, 14).rotateX(PI / 2), M.rad);
      dish.position.z = 1.30; dish.rotation.y = -0.26; q.add(dish);
      var fd = cylX(THREE, M.metal, 0.10, 0.14, 1.10, 6);
      fd.position.set(0.80, 0, 1.72); q.add(fd);
      return q;
    }
    G.add(illuminator(24.6, 0, Z_04));

    /* SATCOM radomes flanking the array block */
    for (s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.SphereGeometry(1.15, 10, 7), M.rad);
      rd.position.set(9.4, s * 4.2, Z_03 + 1.55); G.add(rd);
      var rp = cylZ(THREE, M.sup, 0.85, 0.95, 1.4, 8);
      rp.position.set(9.4, s * 4.2, Z_03 + 0.70); G.add(rp);
      var rd2 = new THREE.Mesh(new THREE.SphereGeometry(0.88, 10, 7), M.rad);
      rd2.position.set(19.0, s * 5.4, Z_PH + 0.85); G.add(rd2);
    }

    /* ------------------------------------------------------- funnels ---- */
    function funnel(xc, zb, zt, hl, hw2, rake) {
      var q = new THREE.Group();
      var poly = [[hl, hw2 * 0.55], [hl * 0.55, hw2], [-hl * 0.55, hw2],
                  [-hl, hw2 * 0.55], [-hl, -hw2 * 0.55], [-hl * 0.55, -hw2],
                  [hl * 0.55, -hw2], [hl, -hw2 * 0.55]];
      q.add(prism(THREE, poly, zb, zt, hl * 0.30, hw2 * 0.26, M.funn));
      /* uptake grille and the four pipe mouths that stand proud of it */
      var cap = box(THREE, M.dark, hl * 1.15, hw2 * 1.5, 0.30);
      cap.position.set(0, 0, zt + 0.15); q.add(cap);
      for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2) {
        var pipe = cylZ(THREE, M.steel, 0.44, 0.44, 1.15, 8);
        pipe.position.set(a * hl * 0.28, b * hw2 * 0.42, zt + 0.72);
        q.add(pipe);
      }
      /* a narrow team-colour band round the casing, the way a squadron
         funnel band works: it reads from any angle without shouting */
      var f0 = (zt - 2.20 - zb) / (zt - zb), f1 = (zt - 1.70 - zb) / (zt - zb);
      q.add(prism(THREE, polyAt(poly, hl * 0.30, hw2 * 0.26, f0),
                  zt - 2.20, zt - 1.70,
                  hl * 0.30 * (f1 - f0), hw2 * 0.26 * (f1 - f0), M.team, 3.0));
      q.position.x = xc; q.rotation.y = rake;
      return q;
    }
    var CS1 = [[9.6, 5.10], [7.2, 6.55], [-5.2, 6.55], [-7.6, 4.80],
               [-7.6, -4.80], [-5.2, -6.55], [7.2, -6.55], [9.6, -5.10]];
    G.add(prism(THREE, CS1, Z_02, 16.40, 0.40, 0.52, M.supF));
    var CS2 = [[-13.2, 4.20], [-15.0, 5.60], [-21.4, 5.60], [-23.0, 4.10],
               [-23.0, -4.10], [-21.4, -5.60], [-15.0, -5.60], [-13.2, -4.20]];
    G.add(prism(THREE, CS2, Z_A2, 16.20, 0.36, 0.46, M.supF));
    G.add(funnel(X_FUN1 - 1.0, 16.40, 21.60, 3.70, 4.00, -0.055));
    G.add(funnel(X_FUN2 - 1.2, 16.20, 21.20, 3.40, 3.70, -0.055));

    /* ---------------------------------------------------------- mast -----
       Four legs raked aft, three braced bays, a wide yard, the SPS-49 flat
       and a pole to 45 m. The height against a 7 m freeboard is the whole
       reason a Burke reads as a destroyer and not a frigate.              */
    var mz0 = Z_03, mz1 = 31.0;
    var LEGS = [[X_MAST + 3.9, 2.55], [X_MAST + 3.9, -2.55],
                [X_MAST - 4.1, 2.35], [X_MAST - 4.1, -2.35]];
    var TOPS = [[X_MAST + 1.05, 0.72], [X_MAST + 1.05, -0.72],
                [X_MAST - 1.35, 0.68], [X_MAST - 1.35, -0.68]];
    var base = prism(THREE, [[X_MAST + 4.6, 3.1], [X_MAST + 4.6, -3.1],
                             [X_MAST - 4.8, -3.0], [X_MAST - 4.8, 3.0]],
                     mz0 - 0.2, mz0 + 1.5, 0.35, 0.30, M.supF);
    G.add(base);
    function lerp3(a, b, u) {
      return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u,
              mz0 + 1.4 + (mz1 - mz0 - 1.4) * u];
    }
    for (i = 0; i < 4; i++) {
      G.add(strut(THREE, M.metal, [LEGS[i][0], LEGS[i][1], mz0 + 1.4],
                  [TOPS[i][0], TOPS[i][1], mz1], 0.24, 5));
    }
    var BAYS = [0.0, 0.30, 0.60, 0.85, 1.0];
    var PAIRS = [[0, 1], [2, 3], [0, 2], [1, 3]];
    for (i = 0; i < BAYS.length; i++) {
      for (j = 0; j < PAIRS.length; j++) {
        var pa = lerp3(LEGS[PAIRS[j][0]], TOPS[PAIRS[j][0]], BAYS[i]);
        var pb = lerp3(LEGS[PAIRS[j][1]], TOPS[PAIRS[j][1]], BAYS[i]);
        G.add(strut(THREE, M.metal, pa, pb, 0.115, 4));
      }
    }
    for (i = 0; i < BAYS.length - 1; i++) {
      for (j = 0; j < PAIRS.length; j++) {
        var qa = lerp3(LEGS[PAIRS[j][0]], TOPS[PAIRS[j][0]], BAYS[i]);
        var qb = lerp3(LEGS[PAIRS[j][1]], TOPS[PAIRS[j][1]], BAYS[i + 1]);
        G.add(strut(THREE, M.metal, qa, qb, 0.095, 3));
      }
    }
    /* the big yard, with whip antennas standing off it */
    var yz = 27.2;
    var yard = box(THREE, M.metal, 0.42, 17.0, 0.42);
    yard.position.set(X_MAST - 0.4, 0, yz); G.add(yard);
    for (s = -1; s <= 1; s += 2) {
      G.add(strut(THREE, M.metal, [X_MAST - 0.4, s * 8.2, yz],
                  [X_MAST - 1.2, s * 1.4, yz + 3.6], 0.11, 4));
      for (i = 0; i < 3; i++) {
        var wh = cylZ(THREE, M.metal, 0.07, 0.04, 3.2, 4);
        wh.position.set(X_MAST - 0.4, s * (3.0 + i * 2.5), yz + 1.6); G.add(wh);
      }
    }
    var yard2 = box(THREE, M.metal, 0.32, 9.0, 0.32);
    yard2.position.set(X_MAST - 1.1, 0, 33.6); G.add(yard2);
    /* SPS-49 air search flat on its rotating pedestal */
    var apl = box(THREE, M.sup, 5.4, 5.0, 0.28);
    apl.position.set(X_MAST - 1.0, 0, 23.4); G.add(apl);
    var aped = cylZ(THREE, M.metal, 0.90, 1.05, 1.10, 10);
    aped.position.set(X_MAST - 1.0, 0, 24.05); G.add(aped);
    var sps = box(THREE, M.metal, 0.45, 7.30, 3.90);
    sps.position.set(X_MAST - 1.2, 0, 26.6);
    sps.rotation.set(0, -0.16, 1.02); G.add(sps);
    var spsf = box(THREE, M.metal, 0.22, 7.30, 0.34);
    spsf.position.set(X_MAST - 1.2, 0, 28.5); spsf.rotation.z = 1.02; G.add(spsf);
    /* upper pole, SPQ-9B radome and the topmast */
    var pole = cylZ(THREE, M.metal, 0.30, 0.16, 10.6, 6);
    pole.position.set(X_MAST - 1.6, 0, mz1 + 5.3); G.add(pole);
    var spq = new THREE.Mesh(new THREE.SphereGeometry(1.45, 10, 7), M.rad);
    spq.position.set(X_MAST - 1.5, 0, 32.4); G.add(spq);
    var whip = cylZ(THREE, M.metal, 0.12, 0.05, 4.0, 4);
    whip.position.set(X_MAST - 1.9, 0, 43.2); G.add(whip);
    var tband = cylZ(THREE, M.team, 0.20, 0.20, 1.0, 6);
    tband.position.set(X_MAST - 1.75, 0, 40.2); G.add(tband);

    /* ============================================== after superstructure == */
    var A1 = [[X_A1F, 6.60], [X_A1F - 3.0, 8.30], [X_A1A + 3.4, 8.20],
              [X_A1A, 5.60], [X_A1A, -5.60], [X_A1A + 3.4, -8.20],
              [X_A1F - 3.0, -8.30], [X_A1F, -6.60]];
    G.add(prism(THREE, A1, 5.20, Z_A1, 0.42, 0.60, M.supF));
    var A2 = [[X_A2F, 4.40], [X_A2F - 2.6, 6.70], [X_A2A + 3.0, 6.60],
              [X_A2A, 4.10], [X_A2A, -4.10], [X_A2A + 3.0, -6.60],
              [X_A2F - 2.6, -6.70], [X_A2F, -4.40]];
    G.add(prism(THREE, A2, Z_A1, Z_A2, 0.36, 0.50, M.supF));
    G.add(illuminator(-28.0, 0, Z_A2));

    /* after mast: short plated tripod carrying the nav radar bar */
    var AL = [[-24.2, 2.10], [-24.2, -2.10], [-28.8, -2.00], [-28.8, 2.00]];
    var AT = [[-25.4, 0.72], [-25.4, -0.72], [-27.2, -0.70], [-27.2, 0.70]];
    var az0 = Z_A2 + 0.6, az1 = 25.6;
    G.add(prism(THREE, AL, Z_A2 - 0.3, az0, 0.30, 0.30, M.supF));
    function alerp(a, b, u) {
      return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u,
              az0 + (az1 - az0) * u];
    }
    for (i = 0; i < 4; i++)
      G.add(strut(THREE, M.metal, [AL[i][0], AL[i][1], az0],
                  [AT[i][0], AT[i][1], az1], 0.20, 5));
    var APR = [[0, 1], [2, 3], [0, 3], [1, 2]], ABY = [0.0, 0.34, 0.68, 1.0];
    for (i = 0; i < ABY.length; i++) for (j = 0; j < APR.length; j++)
      G.add(strut(THREE, M.metal, alerp(AL[APR[j][0]], AT[APR[j][0]], ABY[i]),
                  alerp(AL[APR[j][1]], AT[APR[j][1]], ABY[i]), 0.10, 4));
    for (i = 0; i < ABY.length - 1; i++) for (j = 0; j < APR.length; j++)
      G.add(strut(THREE, M.metal, alerp(AL[APR[j][0]], AT[APR[j][0]], ABY[i]),
                  alerp(AL[APR[j][1]], AT[APR[j][1]], ABY[i + 1]), 0.085, 3));
    var navy = box(THREE, M.metal, 0.30, 11.0, 0.30);
    navy.position.set(-26.6, 0, 20.6); G.add(navy);
    for (s = -1; s <= 1; s += 2) {
      G.add(strut(THREE, M.metal, [-26.6, s * 5.3, 20.6],
                                  [-26.4, s * 1.1, 23.4], 0.10, 4));
      var wp = cylZ(THREE, M.metal, 0.07, 0.04, 3.0, 4);
      wp.position.set(-26.6, s * 3.7, 22.1); G.add(wp);
    }
    /* SPS-67 surface search bar on its pedestal at the masthead */
    var navr = box(THREE, M.metal, 0.34, 4.30, 0.70);
    navr.position.set(-26.3, 0, 26.5); G.add(navr);

    /* RHIBs on their davits, port and starboard, and a handling crane */
    for (s = -1; s <= 1; s += 2) {
      var boat = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 6), M.sup);
      boat.scale.set(3.85, 1.15, 0.95);
      boat.position.set(-22.5, s * 9.05, 8.55); G.add(boat);
      var cdy = box(THREE, M.dark, 7.2, 0.55, 0.35);
      cdy.position.set(-22.5, s * 9.05, 7.85); G.add(cdy);
      G.add(strut(THREE, M.metal, [-19.2, s * 7.9, Z_A1],
                                  [-19.2, s * 9.4, 8.2], 0.16, 4));
      G.add(strut(THREE, M.metal, [-25.8, s * 7.9, Z_A1],
                                  [-25.8, s * 9.4, 8.2], 0.16, 4));
      /* Mk 32 triple torpedo tubes, tucked against the deckhouse */
      var tt = new THREE.Group();
      tt.position.set(-33.0, s * 7.4, 6.90);
      tt.rotation.z = s * 0.55;
      for (i = 0; i < 3; i++) {
        var tube = cylX(THREE, M.sup, 0.36, 0.36, 3.30, 8);
        tube.position.set(0, (i - 1) * 0.78, i === 1 ? 0.62 : 0);
        tt.add(tube);
      }
      G.add(tt);
      /* deck crane on the after deckhouse */
      G.add(strut(THREE, M.metal, [-31.0, s * 5.6, Z_A1],
                                  [-31.0, s * 5.6, Z_A1 + 2.6], 0.22, 6));
      G.add(strut(THREE, M.metal, [-31.0, s * 5.6, Z_A1 + 2.5],
                                  [-31.0, s * 9.6, Z_A1 + 1.3], 0.18, 5));
    }

    /* --------------------------------------------- aft 64-cell Mk 41 ---- */
    var VA = [[X_VA1, 5.10], [X_VA1 - 1.6, 7.30], [X_VA0 + 1.6, 7.35],
              [X_VA0, 5.20], [X_VA0, -5.20], [X_VA0 + 1.6, -7.35],
              [X_VA1 - 1.6, -7.30], [X_VA1, -5.10]];
    G.add(prism(THREE, VA, 5.20, Z_VA, 0.32, 0.40, M.supF));
    var vap = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 10.4), M.vlsA);
    vap.position.set((X_VA0 + X_VA1) * 0.5, 0, Z_VA + 0.03);
    vap.rotation.z = PI / 2; G.add(vap);
    for (s = -1; s <= 1; s += 2) {
      m = box(THREE, M.sup, 10.8, 0.34, 0.36);
      m.position.set((X_VA0 + X_VA1) * 0.5, s * 4.95, Z_VA + 0.15); G.add(m);
      m = box(THREE, M.sup, 0.34, 10.2, 0.36);
      m.position.set((X_VA0 + X_VA1) * 0.5 + s * 5.5, 0, Z_VA + 0.15); G.add(m);
    }

    /* -------------------------------------------- twin hangars, IIA tell - */
    var HG = [[X_HGF, 6.00], [X_HGF - 2.4, 7.45], [X_HGA + 1.2, 7.55],
              [X_HGA, 6.90], [X_HGA, -6.90], [X_HGA + 1.2, -7.55],
              [X_HGF - 2.4, -7.45], [X_HGF, -6.00]];
    G.add(prism(THREE, HG, 5.20, Z_HGR, 0.40, 0.55, M.supF));
    for (s = -1; s <= 1; s += 2) {
      /* the two doors, recessed, with a lintel and a coaming */
      var door = box(THREE, M.dark, 0.95, 3.90, 5.30);
      door.position.set(X_HGA + 0.05, s * 2.65, 8.15); G.add(door);
      var lint = box(THREE, M.sup, 1.10, 4.70, 0.70);
      lint.position.set(X_HGA - 0.05, s * 2.65, 11.15); G.add(lint);
      var jamb = box(THREE, M.sup, 1.10, 0.60, 5.90);
      jamb.position.set(X_HGA - 0.05, s * 4.75, 8.45); G.add(jamb);
      var sill = box(THREE, M.sup, 1.10, 4.70, 0.35);
      sill.position.set(X_HGA - 0.05, s * 2.65, 5.55); G.add(sill);
    }
    var cpil = box(THREE, M.sup, 1.10, 1.40, 5.90);
    cpil.position.set(X_HGA - 0.05, 0, 8.45); G.add(cpil);
    /* hangar roof: after illuminator forward, Phalanx aft */
    G.add(illuminator(-49.6, 0, Z_HGR));
    var ciwsBase = prism(THREE, [[-53.4, 2.1], [-53.4, -2.1],
                                 [-57.6, -2.0], [-57.6, 2.0]],
                         Z_HGR, Z_HGR + 1.30, 0.35, 0.35, M.supF);
    G.add(ciwsBase);
    var cw = new THREE.Group();
    cw.position.set(-55.5, 0, Z_HGR + 1.30);
    var cwb = cylZ(THREE, M.sup, 1.05, 1.15, 0.75, 12);
    cwb.position.z = 0.38; cw.add(cwb);
    var cwd = new THREE.Mesh(new THREE.CylinderGeometry(0.80, 0.92, 1.70, 12)
                               .rotateX(PI / 2), M.rad);
    cwd.position.z = 1.60; cw.add(cwd);
    var cwc = new THREE.Mesh(new THREE.SphereGeometry(0.80, 10, 5), M.rad);
    cwc.position.z = 2.45; cw.add(cwc);
    var cwg = new THREE.Group();
    cwg.position.set(-0.95, 0, 1.05); cwg.rotation.y = 0.32;
    for (i = 0; i < 4; i++) {
      var gb = cylX(THREE, M.steel, 0.075, 0.075, 1.75, 5);
      gb.position.set(-0.55, Math.cos(i * PI / 2) * 0.17,
                      Math.sin(i * PI / 2) * 0.17);
      cwg.add(gb);
    }
    var gsh = cylX(THREE, M.steel, 0.30, 0.30, 0.90, 8);
    gsh.position.set(0.20, 0, 0); cwg.add(gsh);
    cw.add(cwg);
    G.add(cw);
    /* exhaust uptakes and the gas turbine intake boxes on the roof */
    for (s = -1; s <= 1; s += 2) {
      var upt = box(THREE, M.dark, 2.2, 1.5, 1.1);
      upt.position.set(-58.0, s * 4.4, Z_HGR + 0.55); G.add(upt);
    }

    /* ------------------------------------------------------ flight deck -- */
    var fdW0 = hullHW(tOf(X_HGA)) - 0.35, fdW1 = hullHW(tOf(X_FDA)) - 0.30;
    var fpos = [], fuv = [], fidx = [];
    var FN = 6;
    for (i = 0; i <= FN; i++) {
      var u = i / FN, fx = X_HGA + (X_FDA - X_HGA) * u;
      var fw = fdW0 + (fdW1 - fdW0) * u;
      var fz = deckZ(tOf(fx)) + 0.30;
      fpos.push(fx, fw, fz); fuv.push(0, u);
      fpos.push(fx, -fw, fz); fuv.push(1, u);
    }
    for (i = 0; i < FN; i++) {
      var fa = i * 2, fb = fa + 1, fc = fa + 2, fd2 = fa + 3;
      fidx.push(fa, fc, fb, fb, fc, fd2);
    }
    var fg = new THREE.BufferGeometry();
    fg.setAttribute("position", new THREE.Float32BufferAttribute(fpos, 3));
    fg.setAttribute("uv", new THREE.Float32BufferAttribute(fuv, 2));
    fg.setIndex(fidx); fg.computeVertexNormals();
    G.add(new THREE.Mesh(fg, M.pad));
    /* RAST rails down the centreline of the deck */
    for (s = -1; s <= 1; s += 2) {
      var rail = box(THREE, M.steel, 15.0, 0.28, 0.16);
      rail.position.set(-67.5, s * 0.95, deckZ(tOf(-67.5)) + 0.42); G.add(rail);
    }
    /* transom: towed array and Nixie fairleads */
    for (s = -1; s <= 1; s += 2) {
      var fl = cylX(THREE, M.dark, 0.55, 0.55, 0.7, 8);
      fl.position.set(-XB + 0.2, s * 1.5, deckZ(0) - 3.4); G.add(fl);
    }

    /* ---------------------------------------------------------- railings - */
    /* main deck, both sides, from the flight deck forward to the bulwark */
    for (s = -1; s <= 1; s += 2) {
      var pts = deckEdge(X_HGA, X_BULW, 26, 0.30);
      for (i = 0; i < pts.length; i++) pts[i][1] *= s;
      railRun(THREE, G, M.metal, pts, 1.10);
      /* flight deck edge */
      var fpts = deckEdge(X_FDA + 0.6, X_HGA - 0.4, 7, 0.28);
      for (i = 0; i < fpts.length; i++) fpts[i][1] *= s;
      railRun(THREE, G, M.metal, fpts, 1.05);
      /* 01 level and hangar roof edges, which is where a ship gets busy */
      railRun(THREE, G, M.metal,
        [[X_HGF - 1.0, s * 6.9, Z_HGR], [X_HGA + 1.0, s * 7.1, Z_HGR]], 1.00);
      railRun(THREE, G, M.metal,
        [[X_VA1, s * 6.6, Z_VA], [X_VA0 + 0.8, s * 6.8, Z_VA]], 1.00);
      railRun(THREE, G, M.metal,
        [[X_A1F - 1.0, s * 7.6, Z_A1], [X_A1A + 2.0, s * 7.5, Z_A1]], 1.00);
      railRun(THREE, G, M.metal,
        [[X_S1F - 6.0, s * 7.9, Z_01], [-4.0, s * 7.9, Z_01],
         [X_S1A + 3.0, s * 7.7, Z_01]], 1.00);
      railRun(THREE, G, M.metal,
        [[X_S3F - 5.4, s * 7.1, Z_03], [16.0, s * 7.0, Z_03]], 1.00);
    }
    /* transom rail */
    railRun(THREE, G, M.metal,
      [[X_FDA + 0.5, -fdW1, deckZ(0) + 0.10], [X_FDA + 0.5, fdW1, deckZ(0) + 0.10]],
      1.05);

    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["destroyer_n"] = {
  len: 155.3,
  build: function (THREE, M, C) { return HeroBurkeDDG.build(THREE, M, C); }
};
