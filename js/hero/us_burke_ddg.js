/* ============================================================================
   us_burke_ddg.js -- HERO model: the Arleigh Burke class guided missile
   destroyer, in the three rows the roster draws: two flights, three periods.

     nato_e90_destroyer  USS Arleigh Burke (DDG-51), Flight I as built (1991):
                         no hangar, the low flight deck aft, the 5-inch/54
                         Mk 45 Mod 1 in its rounded house, two Phalanx, two
                         Harpoon quads, the 29-cell and 61-cell Mk 41 fields
                         with their strikedown cranes, the upper mast black
     nato_e00_destroyer  DDG-51 Flight IIA as USS Winston S. Churchill
                         (DDG-81) wore her in the 2000s: twin hangars in the
                         block carried up from the hull sides, the 64-cell
                         field on its roof, the 5-inch/62 Mk 45 Mod 4 in the
                         faceted house (DDG-81 on), the after SPY-1D faces a
                         deck higher, both Phalanx kept (DDG-79 to 84 only:
                         McCampbell, DDG-85, came without them), no Harpoon,
                         the exhaust pipes standing out of the stack tops,
                         four SATCOM domes about the mast and a grey mast
     destroyer_n         a Flight IIA of DDG-89 on as photographed in
                         2018-2021 (DDG-116 off Bath 2018, DDG-105 in the
                         Pacific 2021): the stacks shrouded flat-topped round
                         their pipes, the forward Phalanx ledge empty and one
                         Phalanx abaft the after stack (Gravely, DDG-107, on,
                         and the retrofits), no Harpoon, the four domes, a
                         second radome under the masthead and small domes on
                         the lower yard. Not Flight III: SPY-1D faces.

   References (Wikimedia Commons, US Navy, public domain):
     - "Arleigh Burke (DDG 51 - Flight I)" -- the USN coloured profile, the
       scale drawing this hull and every height are measured from
       (8.19 px/m, 153.9 m between the transom and the stem head);
     - "Arleigh Burke (Flight IIA)" -- the USN rendered profile, for the
       hangar block, the stacks and the IIA's after faces;
     - "Arleigh Burke class destroyer Flight 1 line drawing" (USN, 1995);
     - DDG-51 from her port quarter off New England, 22 June 1991 (Bath Iron
       Works): the stepped-down flight deck, the Harpoon quads crossing the
       deck, the black upper mast;
     - DDG-51 on sea trials, 1991, bow on: the flare, the knuckle, the stem
       anchor, the Phalanx on the deckhouse front;
     - DDG-51 port beam, Norfolk, 18 September 1999; DDG-51 in heavy seas;
     - DDG-81 Persian Gulf, 11 February 2008, bow on (Mod 4 gun, forward
       Phalanx, four domes); DDG-81 breakaway from CVN-75, 23 January 2008
       (the hangar roof, the stacks' pipes, the after Phalanx white dome
       abaft the after stack); DDG-81 in the Indian Ocean, January 2006;
     - USS Preble (DDG-88) from her starboard quarter, about 2002: the
       hangar doors, the hangar block flush with the hull, the 64 cells on
       its roof, the two RHIBs to starboard; USS Nitze (DDG-94), 2006;
     - USS Thomas Hudner (DDG-116) on builder's trials, 28 March 2018, and
       USS Dewey (DDG-105) in the Pacific, 13 June 2021, starboard beam.
   Wikipedia, "Arleigh Burke-class destroyer": Phalanx deleted from DDG-85,
   the Mod 4 gun from DDG-81, the stacks shrouded from DDG-89, the IIA
   after arrays one deck (2.4 m) higher, 155.3 m and the hangars outboard of
   the after VLS. Published: 153.9 m (Flight I) / 155.3 m (IIA) overall,
   20.1 m beam, 6.3 m draught, 9.3 m to the bottom of the sonar dome.

   RECOGNITION -- what has to read at game zoom, and the reference for each:
     1. the wide hull, its sides flaring out from the waterline to the deck
        edge, with a hard KNUCKLE along the forward third (1991 bow-on);
     2. the raked stem, nearly ten metres of rake from the waterline to the
        stem head (the Flight I profile);
     3. the flight deck a deck LOWER than the main deck, stepped down abaft
        the after VLS (Flight I profile, the 1991 quarter photograph);
     4. one raked, leaning, chamfered superstructure block, every wall in
        and every corner cut (all photographs);
     5. the FOUR SPY-1D octagons, all on the forward block, two forward and
        two aft on its chamfers (the profile, both bow-on photographs);
     6. the raked tripod mast with its two big yards (profile, bow-ons);
     7. the TWO trapezoid stacks, sooted tops (Flight I) or the exhaust pipes
        standing out of them (DDG-81, 2008);
     8. the forward and after Mk 41 fields (profile, DDG-81 and DDG-88);
     9. the 5-inch: the rounded Mod 1 house (DDG-51) or the faceted Mod 4
        and its longer barrel (DDG-81 2008 bow-on);
    10. the Phalanx white domes, forward on the deckhouse front and aft at
        the after end of the after house (profile, 2008 breakaway photograph);
    11. the Harpoon quads crossing the deck abaft the after house (Flight I);
    12. the two RHIBs in their davits in the starboard recess of the after
        house (the Flight I profile, DDG-88 2002, DDG-105 2021) and, for
        the IIA, the hangar block with its two doors onto the flight deck.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0. The stem
   head is at x = +76.95 in both flights; the IIA's extra 1.4 m is in her
   stern. render3d.js stands the model up with rotation.x = -PI/2 and scales
   it by its X extent, so nothing stands past the stem or the transom.

   Materials (10): hull, non-skid deck, deckhouse plate, flight deck, VLS
   lids, radome white, black, bare metal, glass and the team colour (exactly
   C.team, a ring on the flight deck and a patch on the forecastle). Paint:
   the sunlit hull and house samples off the 2006 Nitze and 2008 Churchill
   photographs (0x96938b, 0x897f66 with the haze taken out) at 0.9 of their
   level, the US Navy haze grey the Ticonderoga hero wears: hull 0x69717a,
   house 0x737a81. No hull numbers, names or flags.

   Every static part is merged into one mesh per material (ten) and the
   5-inch, the one mount that trains, is the "turret" group with three:
   thirteen draws. No two surfaces lie on one another: a deckhouse roof is
   the non-skid itself, the hull's deck underlay sits 0.45 m under the deck
   and the flight deck, and the hangar walls rise from the deck edge. ASCII only -- a stray byte in a hex literal has broken
   this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBurkeFlights = (function () {
  "use strict";

  var PI = Math.PI;
  var XF = 76.95;               /* the stem head, both flights                */
  var ZTOP = 12.0, ZBOT = -1.6; /* vertical span the hull texture covers      */

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
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* Stations are in the Flight I frame (transom -76.95, stem head +76.95);
     the IIA carries the transom table 1.4 m further aft. Read off the
     Flight I profile at 8.19 px/m, waterline at its red boot line.        */
  /* deck edge half breadth: 20.1 m over the deck edge amidships          */
  var HD_K = [[-78.4, 8.30], [-76.95, 8.45], [-70.0, 9.05], [-60.0, 9.60], [-50.0, 9.92],
              [-40.0, 10.05], [15.0, 10.05], [25.0, 9.92], [35.0, 9.60], [45.0, 8.95],
              [55.0, 7.95], [62.0, 6.95], [68.0, 5.60], [72.0, 4.40], [75.0, 2.90], [76.95, 0.55]];
  /* waterline half breadth: 18 m on the waterline amidships, so the sides
     flare out a metre each side between the water and the deck edge      */
  var HW_K = [[-78.4, 7.00], [-76.95, 7.20], [-70.0, 8.00], [-60.0, 8.60], [-50.0, 8.90],
              [-40.0, 9.00], [10.0, 9.00], [20.0, 8.85], [30.0, 8.45], [40.0, 7.60],
              [50.0, 6.30], [57.0, 5.00], [63.0, 3.60], [68.0, 2.30], [72.0, 1.30],
              [75.0, 0.60], [76.95, 0.12]];
  var KL_K = [[-78.4, -0.90], [-76.95, -1.00], [-72.0, -2.80], [-66.0, -4.40], [-58.0, -5.70],
              [-48.0, -6.30], [50.0, -6.30], [58.0, -6.00], [64.0, -5.20], [70.0, -3.60],
              [74.0, -2.00], [76.95, -1.20]];
  /* the knuckle: how far below the deck edge it runs, and how much of the
     flare is left below it (1 = a straight flared side, no knuckle)       */
  var KN_K = [[-78.4, 0.0], [12.0, 0.0], [26.0, 1.25], [40.0, 1.75], [76.95, 1.95]];
  var KS_K = [[-78.4, 1.0], [12.0, 1.0], [30.0, 0.62], [50.0, 0.40], [76.95, 0.36]];
  /* 0 = the full midship section, 1 = the fine V of the entry */
  var VB_K = [[-78.4, 0.08], [-62.0, 0.0], [22.0, 0.0], [40.0, 0.25], [55.0, 0.55],
              [65.0, 0.80], [76.95, 1.00]];
  /* the raked stem: x of the stem at height z (the profile: 67.1 on the
     waterline, 70.8 at 3.7 m, 74.4 at 6.6 m, the head at 76.95)          */
  var STEM_K = [[-6.0, 66.2], [-2.0, 66.5], [0.0, 67.1], [3.7, 70.8], [6.6, 74.4], [10.3, 76.95]];

  function hdOf(x) { return tbl(HD_K, x); }
  function hwOf(x) { return tbl(HW_K, x); }
  function rakeW(x) { var u = clamp((x - 48.0) / (XF - 48.0), 0, 1); return Math.pow(u, 1.5); }

  /* the main deck, flat aft to the step, sheering up over the forward
     third to the 10.3 m stem head; the flight deck a deck lower           */
  function deckZF(x, V) {
    if (x < V.step) return V.zfd;
    if (x < V.step + 0.6) return V.zfd + (6.45 - V.zfd) * (x - V.step) / 0.6;
    return tbl([[V.step + 0.6, 6.45], [26.0, 6.45], [33.0, 6.55], [45.0, 7.15], [56.0, 8.20],
                [66.0, 9.25], [72.0, 9.85], [76.95, 10.30]], x);
  }

  /* half section at station x: points from the deck edge to the keel,
     [y, z, xshift] -- the rake pulls the low points of the bow sections
     aft onto the stem line                                                 */
  function section(x, V) {
    var zd = deckZF(x, V), hd = hdOf(x), hw = hwOf(x), zk0 = tbl(KL_K, x);
    var kn = tbl(KN_K, x), ks = tbl(KS_K, x), vb = tbl(VB_K, x);
    var zk = kn > 0 ? zd - kn : zd * 0.55;
    /* below the knuckle the side flares at what is left of the slope     */
    var hk = hw + (hd - hw) * (zk / zd) * ks;
    if (kn <= 0) hk = hw + (hd - hw) * (zk / zd);
    var D = -zk0, F = [[0.985, 0.35], [0.935, 0.70], [0.80, 0.90], [0.55, 0.985]];
    var N = [[0.80, 0.35], [0.55, 0.70], [0.33, 0.90], [0.15, 0.985]];
    var pts = [[hd, zd], [hk, zk], [hw + (hk - hw) * 0.5, zk * 0.5], [hw, 0]], i;
    for (i = 0; i < 4; i++) {
      var fy = F[i][0] + (N[i][0] - F[i][0]) * vb, fz = F[i][1] + (N[i][1] - F[i][1]) * vb;
      pts.push([hw * fy, -D * fz]);
    }
    pts.push([0, -D]);
    /* the deck edge stays where the deck is; every point under it is
       pulled aft by the stem's rake at its own height                       */
    var w = rakeW(x);
    return pts.map(function (p, k) {
      return [p[0], p[1], k === 0 ? 0 : w * (tbl(STEM_K, clamp(p[1], -6.0, 10.3)) - XF)];
    });
  }

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
     Painted once per page and flight.                                      */
  var _tx = {};
  function textures(THREE, V) {
    var k = V.flight;
    if (_tx[k]) return _tx[k];
    _tx[k] = { hull: hullTex(THREE, V), sup: supTex(THREE), deck: deckTex(THREE),
               pad: padTex(THREE, V), vls: vlsTex(THREE, V) };
    return _tx[k];
  }

  function hullTex(THREE, V) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(51091), i, j, x, z, XA = V.xa, LL = XF - XA;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx - XA) / LL * W; }
    g.fillStyle = "#69717a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling red to the waterline; the IIA profile and the 2000s
       photographs add the black boot topping over it, the 1991 Flight I
       profile shows the red running up to a thin line at the water        */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(V.boot ? -0.45 : 0.05), W, H);
    if (V.boot) { g.fillStyle = "#15181b"; g.fillRect(0, Y(0.8), W, Y(-0.45) - Y(0.8)); }
    g.fillStyle = "rgba(255,255,255,0.12)"; g.fillRect(0, Y(V.boot ? 0.8 : 0.05) - 1, W, 1.5);
    /* strake seams, in real height so they stay level */
    g.lineWidth = 1.2;
    var STR = [1.7, 3.1, 4.5, 5.9, 7.3, 8.7, 10.1];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.28)";
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
    /* freeing ports under the deck edge, weeping rust, following the sheer */
    for (i = 0; i < 44; i++) {
      x = XA + 4 + (i / 43) * (LL - 14);
      z = deckZF(x, V) - 0.8;
      g.globalAlpha = 0.32; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 4, Y(z) - 2, 8, 5);
      if (R() < 0.55) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 3, 4, (1.0 + R() * 2.4) * (H / (ZTOP - ZBOT)));
    }
    /* exhaust staining streaming aft from both stacks */
    var FUN = [5.0, -11.0];
    for (i = 0; i < FUN.length; i++) {
      for (j = 0; j < 150; j++) {
        var f = R();
        x = FUN[i] - f * 28 - 2;
        z = deckZF(x, V) - 0.4 - R() * 2.6;
        g.globalAlpha = 0.036 * (1 - f) + 0.008; g.fillStyle = "#2a2d30";
        g.fillRect(U(x), Y(z), 8 + R() * 30, 4 + R() * 12);
      }
    }
    /* rust from the stem anchor's hawse */
    g.globalAlpha = 0.14; g.fillStyle = "#6d4526";
    g.fillRect(U(73.5) - 5, Y(5.6), 10, 3.4 * (H / (ZTOP - ZBOT)));
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 66.0 : XA + 3.5;
      for (j = 0; j <= 8; j++) g.fillRect(U(x) - 6, Y(-0.3 + j * 0.55), j % 2 ? 7 : 12, 2);
    }
    /* the shadow line under the deck edge */
    g.globalAlpha = 0.26; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = XA + (i / W) * LL;
      g.fillRect(i, Y(deckZF(x, V)) - 1, 4, 6);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, false);
  }

  /* deckhouse plating: 4 m of steel per tile */
  function supTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(30941), i;
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
    for (i = 0; i < 20; i++) {
      g.globalAlpha = 0.022 + R() * 0.03;
      g.fillRect(R() * W, R() * H, 2 + R() * 3, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* weather deck: non-skid with panel joints */
  function deckTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(9137), i;
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

  /* the flight deck: u runs fore-and-aft (0 at the transom), v athwart.
     The landing circle and the lineup line down the middle (the DDG-88
     photograph), the deck-edge lines; on the IIA the RAST track          */
  function padTex(THREE, V) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(2203), i, j;
    g.fillStyle = "#3b4045"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#2a2e32" : "#4b5157";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.32; g.fillStyle = "#000000";
    for (i = 0; i < 2200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.55; g.fillStyle = "#1b1e21";
    for (i = 1; i < 10; i++) for (j = 1; j < 8; j++) g.fillRect(W * i / 10 - 3, H * j / 8 - 3, 6, 6);
    g.globalAlpha = 1;
    g.strokeStyle = "#d3d6cf"; g.lineWidth = 4;
    g.strokeRect(W * 0.03, H * 0.04, W * 0.94, H * 0.92);
    g.lineWidth = 5;
    g.beginPath(); g.moveTo(W * 0.03, H * 0.5); g.lineTo(W * 0.97, H * 0.5); g.stroke();
    /* the touchdown circle, a little forward of the middle of the deck */
    g.lineWidth = 5;
    g.beginPath(); g.ellipse(W * 0.52, H * 0.5, W * 0.17, H * 0.22, 0, 0, 2 * PI); g.stroke();
    if (V.hangar) {
      g.fillStyle = "#24282b"; g.fillRect(W * 0.25, H * 0.485, W * 0.75, H * 0.03);
    }
    return tex(THREE, cv, false);
  }

  /* a Mk 41 field of 8-cell modules, 8 lids across. With `crane` the
     strikedown crane's three-cell space is left blank (Flight I)          */
  function vlsTex(THREE, V) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var n = 8, cw = W / n, ch = H / n, i, j;
    g.fillStyle = "#3f454a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
      var px = i * cw, py = j * ch;
      if (V.crane && j === 7 && i >= 3 && i <= 5) {
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
  function makeMats(THREE, team, V) {
    var T = textures(THREE, V), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    /* the surfaces that lie on another surface are pulled toward the camera
       a couple of depth steps, or they shimmer at the zoom-out limit        */
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.pad   = S({ map: T.pad, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.vls   = S({ map: T.vls, roughness: 0.86, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
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
  /* superellipse outline, counter-clockwise: a rounded stack or a pipe */
  function rounded(a, b, p, n) {
    var out = [], k;
    for (k = 0; k < n; k++) {
      var an = 2 * PI * k / n, c = Math.cos(an), s = Math.sin(an);
      out.push([a * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p)]);
    }
    return out;
  }
  function mv(poly, dx, dy) {
    return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; });
  }
  function roofOf(poly, ins, more) {
    var bb = bboxOf(poly), e = ins + (more || 0);
    var sx = (bb.w - 2 * e) / bb.w, sy = (bb.h - 2 * e) / bb.h;
    return poly.map(function (p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; });
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }
  /* an octagon with flats top, bottom and sides: an SPY-1D face */
  function octPts(R) {
    var p = [], q;
    for (q = 0; q < 8; q++) { var an = (q + 0.5) * PI / 4; p.push([R * Math.cos(an), R * Math.sin(an)]); }
    return p;
  }
  /* a plan outline with its corners cut: x0..x1, half width hw, cuts
     [aft corner, fore corner] in metres along each axis                    */
  function chamfered(x0, x1, hw, ca, cf) {
    var p = [];
    if (ca > 0) { p.push([x0, -hw + ca]); p.push([x0 + ca, -hw]); } else p.push([x0, -hw]);
    if (cf > 0) { p.push([x1 - cf, -hw]); p.push([x1, -hw + cf]); p.push([x1, hw - cf]); p.push([x1 - cf, hw]); }
    else { p.push([x1, -hw]); p.push([x1, hw]); }
    if (ca > 0) { p.push([x0 + ca, hw]); p.push([x0, hw - ca]); } else p.push([x0, hw]);
    return p;
  }

  /* ================================================================ the hull
     A closed loft over the station table: three bands (the deck crown, the
     flared topside above the knuckle, and everything below it), each
     smoothed on its own so the deck edge and the knuckle stay hard.       */
  function hullMesh(THREE, mtl, V, XS) {
    var pos = [], nrm = [], uvs = [], idx = [];
    var LL = XF - V.xa;
    function stationPts(x) {
      var s = section(x, V), out = { p: [], d: deckZF(x, V), hd: hdOf(x) }, i;
      for (i = 0; i < s.length; i++) out.p.push([x + s[i][2], s[i][0], s[i][1]]);
      return out;
    }
    var ST = XS.map(stationPts);
    /* ring indices (port side 0..8 is deck edge..keel); a band is a list
       of [point index, side] pairs that runs round the hull               */
    function bandGeo(list, out) {
      var g = new THREE.BufferGeometry(), P = [], Uv = [], I = [], i, j, R = list.length;
      for (i = 0; i < ST.length; i++) {
        var st = ST[i];
        for (j = 0; j < R; j++) {
          var e = list[j], x, y, z;
          if (e[0] === "c") {       /* the deck's underlay: flat, a little under
                                       the deck edge, so the non-skid ribbon and
                                       the flight deck lie clear of it */
            var hdv = st.p[0][1], ky = e[1];
            x = XS[i]; y = hdv * ky; z = st.d - 0.45;
          } else {
            var q = st.p[e[0]]; x = q[0]; y = q[1] * e[1]; z = q[2];
          }
          P.push(x, y, z);
          Uv.push((XS[i] - V.xa) / LL, (z - ZBOT) / (ZTOP - ZBOT));
        }
      }
      for (i = 0; i < ST.length - 1; i++) for (j = 0; j < R - 1; j++) {
        var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
        I.push(a, b, d, a, d, c);
      }
      g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(Uv, 2));
      g.setIndex(I);
      /* wind it outward: the band's first quad amidships must face `out` */
      var A = Math.floor(ST.length / 2) * R, B = A + 1, Cc = A + R + 1;
      var ax = P[A * 3], ay = P[A * 3 + 1], az = P[A * 3 + 2];
      var ux = P[B * 3] - ax, uy = P[B * 3 + 1] - ay, uz = P[B * 3 + 2] - az;
      var vx = P[Cc * 3] - ax, vy = P[Cc * 3 + 1] - ay, vz = P[Cc * 3 + 2] - az;
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      if (nx * out[0] + ny * out[1] + nz * out[2] < 0) flip(I);
      g.setIndex(I);
      g.computeVertexNormals();
      return g;
    }
    function flip(I) { for (var k = 0; k < I.length; k += 3) { var t = I[k + 1]; I[k + 1] = I[k + 2]; I[k + 2] = t; } }
    function append(g) {
      var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
      var base = pos.length / 3, k, I = g.getIndex().array;
      for (k = 0; k < P.count; k++) {
        pos.push(P.getX(k), P.getY(k), P.getZ(k)); nrm.push(N.getX(k), N.getY(k), N.getZ(k));
        uvs.push(U.getX(k), U.getY(k));
      }
      for (k = 0; k < I.length; k++) idx.push(I[k] + base);
    }
    /* topside, port then starboard, each its own band */
    append(bandGeo([[0, 1], [1, 1]], [0, 1, 0]));
    append(bandGeo([[1, -1], [0, -1]], [0, -1, 0]));
    /* below the knuckle, port round the keel to starboard */
    append(bandGeo([[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1],
                    [7, -1], [6, -1], [5, -1], [4, -1], [3, -1], [2, -1], [1, -1]], [0, 1, 0]));
    /* the deck crown */
    append(bandGeo([[0, -1], ["c", -0.6], ["c", 0], ["c", 0.6], [0, 1]], [0, 0, 1]));
    /* transom and stem caps */
    function cap(i, sgn) {
      var st = ST[i], ring = [], k;
      for (k = 0; k <= 8; k++) ring.push([st.p[k][0], st.p[k][1], st.p[k][2]]);
      for (k = 7; k >= 0; k--) ring.push([st.p[k][0], -st.p[k][1], st.p[k][2]]);
      [-0.6, 0, 0.6].forEach(function (ky) {
        /* the transom's top edge meets the flight deck laid over it */
        ring.push([XS[i], st.hd * ky, sgn < 0 ? st.d + 0.16 : st.d - 0.45]);
      });
      var cx = 0, cz = 0;
      for (k = 0; k < ring.length; k++) { cx += ring[k][0]; cz += ring[k][2]; }
      cx /= ring.length; cz /= ring.length;
      var base = pos.length / 3;
      pos.push(cx, 0, cz); nrm.push(sgn, 0, 0); uvs.push(sgn > 0 ? 1 : 0, (cz - ZBOT) / (ZTOP - ZBOT));
      for (k = 0; k < ring.length; k++) {
        pos.push(ring[k][0], ring[k][1], ring[k][2]); nrm.push(sgn, 0, 0);
        uvs.push(sgn > 0 ? 1 : 0, (ring[k][2] - ZBOT) / (ZTOP - ZBOT));
      }
      for (k = 0; k < ring.length; k++) {
        var a = base + 1 + k, b = base + 1 + (k + 1) % ring.length;
        /* ring runs port deck edge -> keel -> starboard deck edge: seen from
           astern (sgn -1) that is counter-clockwise                        */
        if (sgn < 0) idx.push(base, a, b); else idx.push(base, b, a);
      }
    }
    cap(0, -1); cap(ST.length - 1, 1);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(idx);
    return new THREE.Mesh(g, mtl);
  }

  /* =============================================================== assembly */
  function build(THREE, MOD, C, V) {
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var IIA = !!V.hangar;
    var M = makeMats(THREE, team, V);
    var G = new THREE.Group();
    var KEYS = ["sup", "deck", "pad", "vls", "rad", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, j, s;

    /* ---- primitives, all into cur[key] ------------------------------- */
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
    function hemi(k, r, ws, hs, x, y, z) {
      var g = new THREE.SphereGeometry(r, ws, hs, 0, 2 * PI, 0, PI / 2);
      g.rotateX(PI / 2);
      cur[k].add(place(THREE, g, x, y, z));
    }
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
       metres all round so every wall leans in. Roof capped unless noCap.   */
    function prism(k, poly, z0, z1, ins, US, noCap, insX) {
      var bb = bboxOf(poly), n = poly.length, B = cur[k], q;
      var ix = insX === undefined ? ins : insX;
      var sx = (bb.w - 2 * ix) / bb.w, sy = (bb.h - 2 * ins) / bb.h, per = 0;
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
    /* a roof of non-skid laid on a prism's top */
    function roofDeck(poly, ins, z, insX) {
      var bb0 = bboxOf(poly), ix = insX === undefined ? ins : insX;
      var sx = (bb0.w - 2 * ix) / bb0.w, sy = (bb0.h - 2 * ins) / bb0.h;
      var p = poly.map(function (v) { return [bb0.cx + (v[0] - bb0.cx) * sx, bb0.cy + (v[1] - bb0.cy) * sy]; });
      var bb = bboxOf(p), q;
      for (q = 0; q < p.length; q++) {
        var a = p[q], b = p[(q + 1) % p.length];
        cur.deck.tri([bb.cx, bb.cy, z, bb.cx / 5.5, bb.cy / 5.5], [a[0], a[1], z, a[0] / 5.5, a[1] / 5.5],
                     [b[0], b[1], z, b[0] / 5.5, b[1] / 5.5]);
      }
    }
    /* a deckhouse: leaning walls, its roof the non-skid itself (one
       surface, not a painted cap with a deck laid on it)                  */
    function house(poly, z0, z1, ins, insX) {
      prism("sup", poly, z0, z1, ins, 4.0, true, insX);
      roofDeck(poly, ins, z1, insX);
    }
    /* a frame on wall `ei` of a prism(poly, z0, z1, ins) */
    function face(poly, ei, z0, z1, ins, u, zc, insX) {
      var bb = bboxOf(poly), n = poly.length, ix = insX === undefined ? ins : insX;
      var sx = (bb.w - 2 * ix) / bb.w, sy = (bb.h - 2 * ins) / bb.h;
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
    function frameN(x, y, z, nx, ny) {
      var l = Math.sqrt(nx * nx + ny * ny); nx /= l; ny /= l;
      return { o: [x, y, z], t: [-ny, nx, 0], w: [0, 0, 1], n: [nx, ny, 0] };
    }
    function fp(F, s1, r1, d) {
      return [F.o[0] + F.t[0] * s1 + F.w[0] * r1 + F.n[0] * d,
              F.o[1] + F.t[1] * s1 + F.w[1] * r1 + F.n[1] * d,
              F.o[2] + F.t[2] * s1 + F.w[2] * r1 + F.n[2] * d];
    }
    function plate(k, F, pts, d0, d1) {
      var B = cur[k], n = pts.length, q;
      function P(p, d) { var w = fp(F, p[0], p[1], d); return [w[0], w[1], w[2], p[0] * 0.25, p[1] * 0.25]; }
      for (q = 1; q < n - 1; q++) B.tri(P(pts[0], d1), P(pts[q], d1), P(pts[q + 1], d1));
      for (q = 0; q < n; q++) {
        var a = pts[q], b = pts[(q + 1) % n];
        B.tri(P(a, d0), P(b, d0), P(b, d1)); B.tri(P(a, d0), P(b, d1), P(a, d1));
      }
    }
    /* a loft along x of sections [x, half width, bottom, top]; p is the
       superellipse power: 0.1 is a faceted box, 1 an ellipse              */
    function loftX(k, secs, n, p) {
      var rings = [], q, m, B = cur[k], sxs = 0, szs = 0;
      for (q = 0; q < secs.length; q++) {
        var S = secs[q], zc = (S[2] + S[3]) * 0.5, hh = (S[3] - S[2]) * 0.5, ring = [];
        for (m = 0; m < n; m++) {
          var an = 2 * PI * (m + 0.5) / n, c = Math.cos(an), sn = Math.sin(an);
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
    function railRoof(poly, z, skip, step) {
      var q, n = poly.length;
      for (q = 0; q < n; q++) {
        if (skip && skip.indexOf(q) >= 0) continue;
        var a = poly[q], b = poly[(q + 1) % n];
        railRun("metal", [[a[0], a[1], z], [b[0], b[1], z]], 1.0, step || 1.9);
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
    /* height of the cambered weather deck under a point */
    function topZ(x, y) {
      var hd = hdOf(x), ak = Math.min(1, Math.abs(y) / hd);
      return deckZF(x, V) + 0.10 * (1 - ak * ak) + 0.07;
    }

    /* ----------------------------------------------------------- hull ---- */
    var XS = [V.xa, V.xa + 0.9, V.xa + 2.5, -72.0, -68.0, -64.0, -60.0, -57.0,
              V.step, V.step + 0.6, V.step + 3.0, -46.0, -40.0, -32.0, -24.0, -16.0, -8.0,
              0.0, 8.0, 16.0, 24.0, 30.0, 36.0, 42.0, 47.0, 52.0, 56.0, 60.0, 63.5,
              66.5, 69.0, 71.2, 73.0, 74.5, 75.6, 76.4, 76.95];
    XS.sort(function (a, b) { return a - b; });
    XS = XS.filter(function (x, k) { return x >= V.xa && (k === 0 || x - XS[k - 1] > 0.3); });
    var hull = hullMesh(THREE, M.hull, V, XS); hull.name = "hull"; G.add(hull);

    /* the main deck: a cambered ribbon of non-skid from the step forward */
    (function () {
      var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
      /* from the step (its first row held up at the main deck) to the stem */
      var XR = [V.step].concat(XS.filter(function (x) { return x >= V.step + 0.6 && x <= 76.0; }));
      XR.push(76.6); XR.push(76.92);
      var a, q, m;
      for (q = 0; q < XR.length - 1; q++) {
        for (m = 0; m < KY.length - 1; m++) {
          var P = [];
          [[q, m], [q + 1, m], [q + 1, m + 1], [q, m + 1]].forEach(function (e) {
            var x = XR[e[0]], ky = KY[e[1]], hd = hdOf(x);
            P.push([x, hd * ky, deckZF(Math.max(x, V.step + 0.6), V) + 0.10 * (1 - ky * ky) + 0.06, x / 5.5, ky * hd / 5.5]);
          });
          a = cur.deck;
          a.triOut(P[0], P[1], P[2], [P[0][0], 0, P[0][2] - 5]);
          a.triOut(P[0], P[2], P[3], [P[0][0], 0, P[0][2] - 5]);
        }
      }
    })();

    /* SQS-53 bow sonar dome under the forefoot, to the published 9.3 m */
    var dome = new THREE.SphereGeometry(1, 16, 9);
    dome.scale(5.6, 2.0, 2.9);
    dome.rotateY(-0.08);
    cur.dark.add(place(THREE, dome, 62.4, 0, -6.4));
    /* bilge keels, two shafts on their struts, the screws and the rudders */
    for (s = -1; s <= 1; s += 2) {
      bx("dark", 30.0, 0.16, 0.6, -14.0, s * 7.6, -4.3, s * 0.75, 0, 0);
      tube("metal", -30.0, s * 2.9, -6.1, -67.3, s * 3.3, -4.9, 0.32, 0.30, 8);
      bar("metal", -63.0, s * 3.2, -5.0, -61.5, s * 2.2, -4.0, 0.16);
      bar("metal", -63.0, s * 3.2, -5.0, -62.5, s * 4.0, -3.6, 0.16);
      cx("dark", 0.55, 0.35, 1.4, 10, -69.0, s * 3.35, -4.9);
      for (j = 0; j < 5; j++) {
        var ba = j * 2 * PI / 5;
        bx("dark", 0.25, 0.9, 1.8, -68.6, s * 3.35 + Math.cos(ba) * 1.05, -4.9 + Math.sin(ba) * 1.05, ba, 0, 0);
      }
      bx("dark", 3.6, 0.32, 3.0, -72.4, s * 3.4, -3.2);
    }

    /* the stem anchor in its hawse right at the stem (both bow-ons) */
    (function () {
      var AZ = 6.3, AX = tbl(STEM_K, AZ) - 0.45;
      var FA = frameN(AX, 0, AZ, 1, 0);
      plate("dark", FA, rectPts(-0.75, -0.9, 0.75, 0.7), -0.3, 0.05);
      plate("metal", FA, rectPts(-0.13, -1.2, 0.13, 0.5), 0.0, 0.32);
      plate("metal", FA, [[-0.85, -1.15], [0.85, -1.15], [0.5, -0.8], [-0.5, -0.8]], 0.0, 0.34);
      cz("dark", 0.42, 0.42, 0.08, 10, 73.4, 0, topZ(73.4, 0) - 0.03);
      bx("dark", 6.0, 0.32, 0.12, 70.4, 0, topZ(70.4, 0) + 0.03);
      cz("metal", 0.55, 0.62, 0.75, 12, 67.4, 0, topZ(67.4, 0) - 0.02);
      /* the port anchor's gear and the capstan aft of it */
      cz("metal", 0.55, 0.62, 0.75, 12, 64.5, 1.4, topZ(64.5, 1.4) - 0.02);
      cz("metal", 0.45, 0.55, 0.95, 10, 61.8, -1.2, topZ(61.8, 1.2) - 0.02);
    })();

    /* ------------------------------------------------ the flight deck ---- */
    /* flat, one deck down from the main deck, the full width of the stern:
       render3d.js finds it as the commonest level of the after eighth     */
    var ZP = V.zfd + 0.16, FD0 = V.xa + 0.02, FD1 = V.step - 0.02;
    (function () {
      var NX = 6, q, ya, yb;
      for (q = 0; q < NX; q++) {
        var x0 = FD0 + (FD1 - FD0) * q / NX, x1 = FD0 + (FD1 - FD0) * (q + 1) / NX;
        ya = hdOf(x0) - 0.04; yb = hdOf(x1) - 0.04;
        var u0 = q / NX, u1 = (q + 1) / NX;
        cur.pad.tri([x0, -ya, ZP, u0, 0], [x1, -yb, ZP, u1, 0], [x1, yb, ZP, u1, 1]);
        cur.pad.tri([x0, -ya, ZP, u0, 0], [x1, yb, ZP, u1, 1], [x0, ya, ZP, u0, 1]);
      }
    })();
    /* the landing circle, in the team colour, lying on the deck */
    var rg = new THREE.RingGeometry(4.6, 5.1, 36);
    cur.team.add(place(THREE, rg, FD0 + (FD1 - FD0) * 0.52, 0, ZP + 0.04));
    /* the safety nets: outriggers along both sides and the transom */
    function nets(x0, y0, x1, y1, ox, oy) {
      var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      var n = Math.max(1, Math.round(L / 2.2)), q, w = 0.98;
      for (q = 0; q <= n; q++) {
        var f = q / n, x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
        bar("metal", x, y, ZP - 0.05, x + ox * w, y + oy * w, ZP + 0.2, 0.04);
      }
      bar("metal", x0 + ox * w, y0 + oy * w, ZP + 0.2, x1 + ox * w, y1 + oy * w, ZP + 0.2, 0.045);
      var Cn = [(x0 + x1) * 0.5, (y0 + y1) * 0.5, ZP - 6];
      var A0 = [x0, y0, ZP - 0.02, 0, 0], A1 = [x1, y1, ZP - 0.02, 1, 0];
      var B0 = [x0 + ox * w, y0 + oy * w, ZP + 0.17, 0, 1], B1 = [x1 + ox * w, y1 + oy * w, ZP + 0.17, 1, 1];
      cur.dark.triOut(A0, A1, B1, Cn); cur.dark.triOut(A0, B1, B0, Cn);
    }
    for (s = -1; s <= 1; s += 2) {
      var NXS = [FD0 + 0.6, FD0 + (FD1 - FD0) * 0.5, FD1 - 0.4];
      for (j = 0; j < NXS.length - 1; j++) {
        var xa_ = NXS[j], xb_ = NXS[j + 1];
        nets(xa_, s * hdOf(xa_), xb_, s * hdOf(xb_), 0, s);
      }
    }
    /* none across the transom: they would stand past it and set the scale */

    /* the step: a plumb bulkhead across the ship from the flight deck up
       to the main deck (on the IIA, up to the hangar block, whose after face
       carries on above it); on the Flight I its doors (the 1991 quarter)   */
    (function () {
      var FB = frameN(V.step - 0.01, 0, V.zfd - 0.05, -1, 0), hw = hdOf(V.step) - 0.03;
      var ZM = deckZF(V.step + 0.6, V);     /* the main deck at the step */
      plate("sup", FB, rectPts(-hw, 0, hw, (IIA ? ZM - 0.1 : ZM + 0.05) - V.zfd + 0.05), 0, 0.01);
      if (!IIA) for (s = -1; s <= 1; s += 2)
        plate("dark", FB, rectPts(s * 3.2 - 0.5, 0.2, s * 3.2 + 0.5, 2.0), 0.0, 0.05);
    })();

    /* ---------------------------------------------------- superstructure -- */
    var Z0 = 6.45;                 /* main deck amidships                    */
    var Z1 = 9.60, Z2 = 12.90;     /* 01 and 02 levels                       */
    var ZPH = 17.40;               /* pilot house roof                       */
    var ZMH = 18.85;               /* the mast house on it                   */

    /* -- the forward block: 01 level, 02 level, the SPY block ----------- */
    var F01 = chamfered(0.8, 33.6, 8.25, 0, 3.4);
    house(F01, Z0 - 0.1, Z1, 0.35);
    /* the 02 level: a ledge forward of the SPY block for the Phalanx */
    var F02 = chamfered(9.0, 32.2, 7.5, 0, 3.0);
    house(F02, Z1, Z2, 0.3);
    /* the SPY block from the 01 level to the pilot house roof: corners cut
       at 45 degrees for the four arrays, every wall leaning in            */
    /* the 2008 bow-on puts the forward faces' centres some 5.5 m either
       side of the centreline and the pilot house front between them      */
    var SPY = [[10.6, -3.8], [14.4, -7.6], [25.0, -7.6], [29.4, -3.2],
               [29.4, 3.2], [25.0, 7.6], [14.4, 7.6], [10.6, 3.8]];
    house(SPY, Z1, ZPH, 0.85);
    /* the IIA carries her after arrays a deck higher: a tier on the after
       half of the roof with its own cut corners                            */
    var SPY2 = [[11.45, -3.37], [14.9, -6.75], [18.0, -6.75], [18.0, 6.75], [14.9, 6.75], [11.45, 3.37]];
    if (V.highAft) house(SPY2, ZPH, ZPH + 2.4, 0.3);
    function spyFace(F) {
      plate("sup", F, octPts(1.98), 0, 0.14);
      plate("rad", F, octPts(1.80), 0.14, 0.21);
    }
    var ZSPY = 14.25;
    spyFace(face(SPY, 2, Z1, ZPH, 0.85, 0.5, ZSPY));
    spyFace(face(SPY, 4, Z1, ZPH, 0.85, 0.5, ZSPY));
    if (V.highAft) {
      /* one deck (2.4 m) higher, on the plane of the block's after
         chamfers carried up by the tier                                   */
      spyFace(face(SPY, 0, Z1, ZPH, 0.85, 0.5, ZSPY + 2.4));
      spyFace(face(SPY, 6, Z1, ZPH, 0.85, 0.5, ZSPY + 2.4));
    } else {
      spyFace(face(SPY, 0, Z1, ZPH, 0.85, 0.5, ZSPY));
      spyFace(face(SPY, 6, Z1, ZPH, 0.85, 0.5, ZSPY));
    }
    /* the pilot house windows across the front and the forward chamfers,
       just under the roof (both bow-on photographs), under a brow        */
    var WZ = 16.45;
    function winRow(F, ss, brow) {
      ss.forEach(function (sv) { plate("glass", F, rectPts(sv - 0.36, -0.42, sv + 0.36, 0.42), -0.02, 0.05); });
      if (brow) plate("sup", F, rectPts(brow[0], 0.52, brow[1], 0.64), 0, 0.42);
    }
    winRow(face(SPY, 3, Z1, ZPH, 0.85, 0.5, WZ), [-2.0, -1.2, -0.4, 0.4, 1.2, 2.0], [-2.5, 2.5]);
    winRow(face(SPY, 2, Z1, ZPH, 0.85, 0.5, WZ), [-1.6, -0.8, 0, 0.8, 1.6], [-2.1, 2.1]);
    winRow(face(SPY, 4, Z1, ZPH, 0.85, 0.5, WZ), [-1.6, -0.8, 0, 0.8, 1.6], [-2.1, 2.1]);
    winRow(face(SPY, 1, Z1, ZPH, 0.85, 0.86, WZ), [-1.3, -0.5, 0.3], [-1.8, 0.8]);
    winRow(face(SPY, 5, Z1, ZPH, 0.85, 0.14, WZ), [-0.3, 0.5, 1.3], [-0.8, 1.8]);
    /* the bridge wings out to the deck edge either side, open, on struts */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 3.4, 2.6, 0.22, 24.0, s * 7.65, 15.75);
      bx("sup", 3.4, 0.1, 1.05, 24.0, s * 8.9, 16.35);
      bx("sup", 0.1, 2.5, 1.05, 25.65, s * 7.65, 16.35);
      bar("sup", 24.0, s * 6.6, 13.6, 24.0, s * 8.6, 15.6, 0.12);
      /* the SLQ-32 house on its sponson under each wing (2008 bow-on) */
      stamp(22.4, s * 7.7, Z2, s > 0 ? PI / 2 : -PI / 2, function () {
        bx("sup", 1.6, 3.2, 0.2, 0.4, 0, -0.1);
        bx("sup", 0.9, 2.7, 1.9, 0.5, 0, 0.95);
        bx("rad", 0.1, 2.3, 1.5, 0.97, 0, 1.0, 0, -0.2, 0);
      });
    }
    /* doors low on the block and along the 01 level */
    [[1, 0.3], [5, 0.7]].forEach(function (d) {
      plate("dark", face(SPY, d[0], Z1, ZPH, 0.85, d[1], Z1), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    [[0, 0.30], [0, 0.62], [4, 0.38], [4, 0.70]].forEach(function (d) {
      plate("dark", face(F01, d[0], Z0, Z1, 0.35, d[1], Z0), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    railRoof(roofOf(F01, 0.35, 0.1), Z1, null, 2.0);
    railRoof(roofOf(SPY, 0.85, 0.1), ZPH, V.highAft ? [0, 6, 7] : null, 2.0);

    /* the mast house on the roof and the forward SPG-62 ahead of it */
    var MH = chamfered(13.2, 23.4, 3.3, 1.2, 1.4);
    prism("sup", MH, ZPH, ZMH, 0.2, 4.0);
    function spg62(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.5, 0.6, 0.45, 12, 0, 0, 0);
        bx("sup", 0.45, 1.95, 0.22, -0.15, 0, 0.56);
        bx("sup", 0.4, 0.16, 1.1, -0.15, 0.9, 1.12);
        bx("sup", 0.4, 0.16, 1.1, -0.15, -0.9, 1.12);
        var g = new THREE.CylinderGeometry(1.2, 0.42, 0.55, 18, 1, false);
        g.rotateZ(-PI / 2); g.rotateY(-0.2); g.translate(0.05, 0, 1.45);
        cur.rad.add(g);
        cx("metal", 0.2, 0.2, 0.12, 8, 1.12, 0, 1.69);
        bar("metal", 0.10, 0, 2.59, 1.14, 0, 1.71, 0.03);
        bar("metal", 0.43, -0.95, 0.98, 1.14, 0, 1.67, 0.03);
        bar("metal", 0.43, 0.95, 0.98, 1.14, 0, 1.67, 0.03);
      });
    }
    cz("sup", 0.6, 0.75, 1.0, 12, 25.6, 0, ZPH);
    spg62(25.6, 0, ZPH + 1.0, 0);
    /* SATCOM: the four domes about the mast foot (DDG-81, 2008); the 1991
       ship has only the two small dishes on the roof's after corners     */
    if (V.domes) {
      [[20.6, 4.6], [20.6, -4.6], [15.2, 5.0], [15.2, -5.0]].forEach(function (p) {
        var zb = p[0] < 18 && V.highAft ? ZPH + 2.4 : ZPH;
        cz("sup", 0.55, 0.65, 0.9, 10, p[0], p[1], zb);
        cz("rad", 1.05, 1.05, 0.9, 16, p[0], p[1], zb + 0.9);
        hemi("rad", 1.05, 16, 6, p[0], p[1], zb + 1.8);
      });
    } else {
      for (s = -1; s <= 1; s += 2) {
        cz("sup", 0.22, 0.26, 1.1, 8, 21.0, s * 5.0, ZPH);
        stamp(21.0, s * 5.0, ZPH + 1.2, s > 0 ? 0.9 : -0.9, function () {
          var dg = new THREE.CylinderGeometry(0.75, 0.25, 0.3, 14, 1, false);
          dg.rotateZ(-PI / 2); dg.translate(0.2, 0, 0.35); cur.rad.add(dg);
        });
      }
    }

    /* -- the mast: a plated trunk raked aft, two splayed legs to the roof
       sides, two great yards, the platform with the SPS-67 dome and a
       topmast. The Flight I profile and the 1991 photographs paint it
       black from the lower yard up; the 2008 ship is grey to the top     */
    var MB = [19.2, 0, ZMH], MT = [12.7, 0, 37.3];
    function mastAt(z) { var f = (z - MB[2]) / (MT[2] - MB[2]); return MB[0] + (MT[0] - MB[0]) * f; }
    var KL = V.blackMast ? "dark" : "metal";
    (function () {
      /* the trunk: square tapering sections leaning aft, as a run of prisms */
      var NZ = 6, q, zA, zB;
      for (q = 0; q < NZ; q++) {
        zA = MB[2] + (MT[2] - MB[2]) * q / NZ; zB = MB[2] + (MT[2] - MB[2]) * (q + 1) / NZ;
        var fa = q / NZ, fb = (q + 1) / NZ, wa = 1.30 - 0.70 * fa, wb = 1.30 - 0.70 * fb;
        var xa2 = mastAt(zA), xb2 = mastAt(zB), k = (zA > 20.0 && V.blackMast) ? "dark" : "sup";
        var B = cur[k], C0 = [(xa2 + xb2) * 0.5, 0, (zA + zB) * 0.5];
        var A = [[xa2 - wa, -wa * 0.8], [xa2 + wa, -wa * 0.8], [xa2 + wa, wa * 0.8], [xa2 - wa, wa * 0.8]];
        var Bb = [[xb2 - wb, -wb * 0.8], [xb2 + wb, -wb * 0.8], [xb2 + wb, wb * 0.8], [xb2 - wb, wb * 0.8]];
        for (var e = 0; e < 4; e++) {
          var e2 = (e + 1) % 4;
          B.triOut([A[e][0], A[e][1], zA, 0, 0], [A[e2][0], A[e2][1], zA, 1, 0], [Bb[e2][0], Bb[e2][1], zB, 1, 1], C0);
          B.triOut([A[e][0], A[e][1], zA, 0, 0], [Bb[e2][0], Bb[e2][1], zB, 1, 1], [Bb[e][0], Bb[e][1], zB, 0, 1], C0);
        }
      }
    })();
    for (s = -1; s <= 1; s += 2) {
      /* the two legs from the roof's sides abaft the domes to the trunk */
      tube("sup", 14.6, s * 3.0, ZMH, mastAt(29.5) + 0.3, s * 0.55, 29.5, 0.42, 0.28, 8);
      bar("metal", 14.8, s * 2.7, 23.0, mastAt(23.0), 0, 23.0, 0.08);
    }
    /* platforms on the trunk: the lower with its rail, the yards above */
    var PZ1 = 25.4, PZ2 = 30.8, PZ3 = 35.0;
    bx(KL, 3.4, 3.8, 0.16, mastAt(PZ1) + 0.6, 0, PZ1);
    railRoof([[mastAt(PZ1) - 1.1, -1.9], [mastAt(PZ1) + 2.3, -1.9], [mastAt(PZ1) + 2.3, 1.9], [mastAt(PZ1) - 1.1, 1.9]], PZ1 + 0.08, null, 1.4);
    /* the two great yards are trusses (both bow-ons): two chords and a
       zigzag between them, the lower reaching out over the deck edges    */
    function yard(x, z, half, dz) {
      bar(KL, x, -half, z, x, half, z, 0.09);
      bar(KL, x + 0.1, -half + 0.6, z - dz, x + 0.1, half - 0.6, z - dz, 0.07);
      var n = Math.round((2 * half - 1.2) / 1.3), q;
      for (q = 0; q < n; q++) {
        var y0 = -half + 0.6 + (2 * half - 1.2) * q / n, y1 = -half + 0.6 + (2 * half - 1.2) * (q + 1) / n;
        bar(KL, x + 0.1, q % 2 ? y0 : y1, z - dz, x, q % 2 ? y1 : y0, z, 0.04);
      }
    }
    yard(mastAt(PZ2) + 0.4, PZ2, 8.6, 0.7);
    bx(KL, 2.6, 4.4, 0.14, mastAt(PZ2) + 0.4, 0, PZ2 - 0.75);
    railRoof([[mastAt(PZ2) - 0.9, -2.2], [mastAt(PZ2) + 1.7, -2.2], [mastAt(PZ2) + 1.7, 2.2], [mastAt(PZ2) - 0.9, 2.2]], PZ2 - 0.68, null, 1.4);
    yard(mastAt(PZ3) + 0.3, PZ3, 6.8, 0.55);
    bx(KL, 2.2, 3.2, 0.12, mastAt(PZ3) + 0.3, 0, PZ3 - 0.6);
    for (s = -1; s <= 1; s += 2) {
      /* braces under the yards and the antennas standing on their arms */
      bar(KL, mastAt(PZ2 - 2.6), s * 0.5, PZ2 - 2.6, mastAt(PZ2) + 0.4, s * 5.6, PZ2, 0.06);
      bar(KL, mastAt(PZ3 - 2.0), s * 0.4, PZ3 - 2.0, mastAt(PZ3) + 0.3, s * 4.6, PZ3, 0.05);
      bar(KL, mastAt(PZ2) + 0.4, s * 8.0, PZ2, mastAt(PZ2) + 0.4, s * 8.0, PZ2 + 1.5, 0.04);
      bar(KL, mastAt(PZ2) + 0.4, s * 6.3, PZ2, mastAt(PZ2) + 0.4, s * 6.3, PZ2 + 1.1, 0.04);
      bar(KL, mastAt(PZ3) + 0.3, s * 6.4, PZ3, mastAt(PZ3) + 0.3, s * 6.4, PZ3 + 1.3, 0.04);
      bar(KL, mastAt(PZ2) + 0.4, s * 3.6, PZ2, mastAt(PZ2) + 0.4, s * 3.6, PZ2 - 1.0, 0.03);
    }
    /* the SPS-67 dome on its platform at the trunk's head, the topmast */
    bx(KL, 2.0, 2.0, 0.14, MT[0], 0, MT[2]);
    cz(KL, 0.35, 0.4, 0.5, 8, MT[0], 0, MT[2] + 0.07);
    sph("rad", 0.78, 14, 9, MT[0], 0, MT[2] + 1.25);
    tube(KL, MT[0] - 0.2, 0, MT[2] + 2.0, MT[0] - 1.0, 0, 42.9, 0.13, 0.06, 6);
    bar(KL, MT[0] - 0.5, -1.2, 40.0, MT[0] - 0.5, 1.2, 40.0, 0.04);
    /* the present-day mast (DDG-116 2018, DDG-105 2021): a second white
       radome on its own platform under the head, small domes standing on
       the lower yard's arms                                               */
    if (V.mastKit) {
      bx(KL, 1.6, 1.6, 0.12, mastAt(PZ3 + 1.5) + 0.5, 0, PZ3 + 1.5);
      sph("rad", 0.55, 12, 8, mastAt(PZ3 + 1.5) + 0.5, 0, PZ3 + 2.2);
      for (s = -1; s <= 1; s += 2) {
        cz(KL, 0.12, 0.14, 0.5, 6, mastAt(PZ2) + 0.4, s * 7.2, PZ2);
        sph("rad", 0.32, 10, 6, mastAt(PZ2) + 0.4, s * 7.2, PZ2 + 0.75);
      }
    }
    /* the SPS-73 navigation radar on the lower platform's front */
    bx("metal", 0.3, 2.4, 0.35, mastAt(PZ1) + 1.6, 0, PZ1 + 0.9);
    cz("metal", 0.15, 0.2, 0.6, 6, mastAt(PZ1) + 1.6, 0, PZ1 + 0.08);

    /* -- the stacks ---------------------------------------------------- */
    /* trapezoid casings, every face leaning in. Flight I: the open top
       sooted black with its louvres; DDG-81: the casing roofed over and
       the exhaust pipes (two turbines and the generator) standing out    */
    function stack(xc, z0, z1) {
      var base = chamfered(xc - 4.7, xc + 4.7, 3.3, 1.1, 1.1);
      prism("sup", base, z0, z1, 0.75, 4.0, true);
      var tp = roofOf(base, 0.75, 0);
      if (V.shrouded) {
        /* DDG-89 on: the casing carried up flat-topped round the pipes
           (the 2021 DDG-105 broadside), the exhaust a dark grille in it */
        prism("sup", tp, z1, z1 + 1.3, 0.12, 4.0, true);
        var tt = roofOf(tp, 0.12, 0);
        prism("sup", tt, z1 + 1.3, z1 + 1.31, 0.0, 4.0);
        prism("dark", roofOf(tt, 0.0, 0.55), z1 + 1.31, z1 + 1.33, 0.0, 4.0);
      } else if (V.pipes) {
        prism("sup", tp, z1, z1 + 0.01, 0.0, 4.0);
        [[xc + 2.1, 0.0, 0.95], [xc - 0.1, 0.0, 0.95], [xc - 2.2, 0.15, 0.62]].forEach(function (p) {
          cz("dark", p[2], p[2], 1.45, 14, p[0], p[1], z1 - 0.05);
          cz("dark", p[2] * 0.82, p[2] * 0.82, 0.02, 14, p[0], p[1], z1 + 1.41);
        });
      } else {
        prism("dark", tp, z1, z1 + 1.35, 0.06, 4.0, true);
        /* the inside of the open top: the same walls wound inward */
        prism("dark", roofOf(tp, 0.06, 0.12).slice().reverse(), z1 + 0.4, z1 + 1.33, 0.06, 4.0, true);
        prism("dark", roofOf(tp, 0.06, 0.22), z1 + 0.4, z1 + 0.41, 0.0, 4.0);
        /* the louvre bars across the open top */
        for (var q = -2; q <= 2; q++) bx("dark", 0.12, 4.0, 0.12, xc + q * 1.5, 0, z1 + 1.25);
      }
    }
    stack(5.85, Z1, 18.85);
    stack(-10.6, Z2 - 0.1, 18.7);

    /* -- the after house: 01 level, 02 level, the illuminator house ---- */
    /* the 01 level of the after house is cut back on the starboard side,
       where the two RHIBs ride in their davits (the Flight I profile, the
       DDG-88 quarter and the 2021 broadside of DDG-105); to port it runs
       out to the side deck with the life raft cradles (DDG-81, 2008)       */
    var A01 = [[-28.8, -4.4], [-27.6, -5.6], [-5.6, -5.6], [-5.6, 8.25], [-26.6, 8.25], [-28.8, 6.05]];
    house(A01, Z0 - 0.1, Z1, 0.35);
    /* the waist between the houses: the 01 level drawn in narrower        */
    var W01 = [[-6.0, -5.3], [1.2, -5.3], [1.2, 5.3], [-6.0, 5.3]];
    house(W01, Z0 - 0.1, Z1, 0.2);
    var A02 = chamfered(-24.4, -3.6, 5.6, 1.8, 0.8);
    house(A02, Z1, Z2, 0.3);
    var A03 = chamfered(-20.2, -15.2, 3.4, 1.0, 0);
    prism("sup", A03, Z2, 15.0, 0.25, 4.0);
    railRoof(roofOf(A01, 0.35, 0.1), Z1, IIA ? [5] : null, 2.0);
    railRoof(roofOf(A02, 0.3, 0.1), Z2, null, 2.0);
    /* the after pair of SPG-62s: the low one on the 02 roof, the high one
       on its house (both profiles)                                        */
    cz("sup", 0.55, 0.65, 0.9, 12, -22.2, 0, Z2);
    spg62(-22.2, 0, Z2 + 0.9, PI);
    cz("sup", 0.55, 0.65, 0.7, 12, -18.0, 0, 15.0);
    spg62(-18.0, 0, 15.7, PI);
    [[1, 0.3], [1, 0.7], [5, 0.4]].forEach(function (d) {
      plate("dark", face(A02, d[0], Z1, Z2, 0.3, d[1], Z1), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    /* scuttles and vents on the roofs the camera looks down on */
    [[-14.0, 4.2], [-14.0, -4.2], [-26.0, 4.6], [-26.0, -4.6], [4.0, 5.4], [4.0, -5.4]].forEach(function (p) {
      bx("dark", 0.9, 0.9, 0.06, p[0], p[1], (p[0] > 0 ? Z1 : (p[0] < -24 ? Z1 : Z2)) + 0.05);
    });
    /* SRBOC launchers on the 01 level abreast the forward stack */
    function srboc(x, y, side) {
      stamp(x, y, Z1, side > 0 ? PI / 2 : -PI / 2, function () {
        bx("sup", 0.85, 0.95, 0.45, 0, 0, 0.22);
        for (var a = -1; a <= 1; a++) for (var b = 0; b < 2; b++) {
          var el = b ? 1.05 : 0.79, g = new THREE.CylinderGeometry(0.075, 0.075, 1.15, 6, 1, false);
          g.rotateZ(-PI / 2); g.rotateY(-el);
          g.translate(0.15 - b * 0.18, a * 0.22, 0.85 + b * 0.12);
          cur.metal.add(g);
        }
      });
    }
    for (s = -1; s <= 1; s += 2) { srboc(3.0, s * 7.1, s); srboc(-1.5, s * 6.9 - s * 1.6, s); }

    /* -- the boats: two RHIBs in davits in the starboard recess --------- */
    function rhib(xc, yc, zk) {
      stamp(xc, yc, zk, 0, function () {
        var L = 3.6, B = 1.25;
        loftX("sup", [[-L, B * 0.82, 0.32, 0.92], [-L + 0.45, B * 0.96, 0.06, 0.95],
                      [-L * 0.3, B, 0.0, 0.95], [L * 0.35, B * 0.93, 0.06, 0.98],
                      [L * 0.72, B * 0.62, 0.25, 1.02], [L * 0.94, B * 0.22, 0.6, 1.06],
                      [L, 0.01, 0.9, 1.06]], 10, 0.55);
        var CP = [[-L, 0.95], [-L * 0.3, 1.25], [L * 0.35, 1.18], [L * 0.72, 0.8], [L * 0.97, 0.12]];
        for (var q = 0; q < CP.length - 1; q++) {
          bar("dark", CP[q][0], CP[q][1], 1.0, CP[q + 1][0], CP[q + 1][1], 1.0, 0.24);
          bar("dark", CP[q][0], -CP[q][1], 1.0, CP[q + 1][0], -CP[q + 1][1], 1.0, 0.24);
        }
        bar("dark", -L, -0.95, 1.0, -L, 0.95, 1.0, 0.22);
        bx("sup", 0.75, 0.85, 0.85, 0.2, 0, 1.35);
        bx("glass", 0.08, 0.75, 0.35, 0.6, 0, 1.92);
        bx("dark", 0.5, 0.55, 0.75, -L - 0.15, 0, 1.0);
      });
    }
    [-24.8, -15.6].forEach(function (BX) {
      var BY = -7.55;
      rhib(BX, BY, Z0 + 1.0);
      bx("dark", 0.3, 1.9, 0.55, BX - 2.0, BY, Z0 + 0.7);
      bx("dark", 0.3, 1.9, 0.55, BX + 2.0, BY, Z0 + 0.7);
      for (j = -1; j <= 1; j += 2) {
        var DX = BX + j * 2.7;
        tube("metal", DX, -5.45, Z1, DX, -5.45, Z1 + 1.9, 0.13, 0.11, 6);
        bar("metal", DX, -5.45, Z1 + 1.8, DX, BY, Z1 + 2.1, 0.09);
      }
    });
    /* life raft canisters along the port side of the after house */
    for (j = 0; j < 6; j++) {
      var rg2 = new THREE.CylinderGeometry(0.3, 0.3, 1.25, 8, 1, false);
      cur.rad.add(place(THREE, rg2, -21.5 + j * 1.5, 7.35, Z1 + 0.33));
    }

    /* --------------------------------------- the Phalanx close-in guns ---- */
    function phalanx(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.78, 0.86, 0.45, 14, 0, 0, 0);
        cz("sup", 0.62, 0.66, 0.55, 14, 0, 0, 0.45);
        bx("sup", 0.9, 0.2, 0.95, -0.05, 0.52, 1.4);
        bx("sup", 0.9, 0.2, 0.95, -0.05, -0.52, 1.4);
        cx("sup", 0.4, 0.4, 1.25, 12, -0.95, 0, 1.2);
        cx("metal", 0.17, 0.15, 1.95, 8, 0.3, 0, 1.3);
        cx("dark", 0.19, 0.19, 0.16, 8, 2.1, 0, 1.3);
        cx("dark", 0.2, 0.2, 0.12, 8, 0.85, 0, 1.3);
        cz("rad", 0.56, 0.56, 1.0, 16, -0.2, 0, 1.78);
        hemi("rad", 0.56, 16, 5, -0.2, 0, 2.78);
        bx("rad", 0.42, 0.55, 0.42, 0.25, 0, 2.0);
      });
    }
    /* forward: on the 02 level's ledge before the bridge, on its tub */
    cz("sup", 1.5, 1.6, 0.6, 16, 30.6, 0, Z2);
    railRing(30.6, 0, Z2 + 0.6, 1.45, 12);
    /* the present-day IIAs (DDG-116 2018, DDG-105 2021) show the ledge
       empty: Phalanx went from DDG-85 and came back aft only              */
    if (V.fwdCiws) phalanx(30.6, 0, Z2 + 0.6, 0);
    /* after: on the after end of the after house (the Flight I profile,
       the 2008 breakaway photograph)                                       */
    cz("sup", 1.5, 1.6, 0.9, 16, -26.6, 0, Z1);
    railRing(-26.6, 0, Z1 + 0.9, 1.45, 12);
    phalanx(-26.6, 0, Z1 + 0.9, PI);

    /* ------------------------------------------- the after VLS and aft end */
    function vlsField(xc, z0, lx, ly) {
      var g = new THREE.PlaneGeometry(lx, ly);
      /* PlaneGeometry lies in XY facing +Z: the lids look up, u along x */
      cur.vls.add(place(THREE, g, xc, 0, z0 + 0.13));
      for (s = -1; s <= 1; s += 2) {
        bx("sup", lx + 0.5, 0.25, 0.3, xc, s * (ly * 0.5 + 0.12), z0 + 0.12);
        bx("sup", 0.25, ly, 0.3, xc + s * (lx * 0.5 + 0.12), 0, z0 + 0.12);
      }
      bx("metal", lx, 0.1, 0.2, xc, 0, z0 + 0.1);
    }
    if (!IIA) {
      /* Flight I: the 61-cell field on the main deck before the step */
      vlsField(-38.9, topZ(-38.9, 0) - 0.02, 7.2, 6.6);
      /* the two Harpoon quads abaft the after house, crossing the deck:
         each fires over the far side (the 1991 quarter view, and the two
         end-on frames the profile shows)                                  */
      var harpoon = function (x, side) {
        var z0 = topZ(x, 0) - 0.02;
        stamp(x, 0, z0, side > 0 ? PI / 2 : -PI / 2, function () {
          bx("sup", 2.4, 1.7, 0.2, 0.0, 0, 0.1);
          bx("metal", 0.22, 1.5, 1.85, -1.05, 0, 1.0);
          bx("metal", 0.22, 1.5, 0.75, 0.85, 0, 0.45);
          bar("metal", -1.05, 0.7, 1.9, 0.85, 0.7, 0.8, 0.07);
          bar("metal", -1.05, -0.7, 1.9, 0.85, -0.7, 0.8, 0.07);
          for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2) {
            var g = new THREE.CylinderGeometry(0.27, 0.27, 4.6, 10, 1, false);
            g.rotateZ(-PI / 2); g.rotateY(-0.61); g.translate(0.3, a * 0.36, 2.2 + b * 0.36);
            cur.sup.add(g);
            for (var r = -1; r <= 1; r += 2) {
              var h = new THREE.CylinderGeometry(0.31, 0.31, 0.16, 10, 1, false);
              h.rotateZ(-PI / 2); h.rotateY(-0.61);
              h.translate(0.3 + r * 1.35 * Math.cos(0.61), a * 0.36, 2.2 + b * 0.36 + r * 1.35 * Math.sin(0.61));
              cur.metal.add(h);
            }
          }
        });
      };
      harpoon(-32.6, -1);
      harpoon(-30.4, 1);
      /* the helicopter control booth at the step's port corner, and its
         fairing to starboard (the 1991 quarter view; the profile's hump) */
      (function () {
        var HB0 = V.step - 0.2, HB1 = V.step + 5.2, hy = hdOf(V.step + 2) - 0.25;
        var BP = [[HB0, hy - 2.4], [HB1, hy - 1.2], [HB1, hy], [HB0, hy]];
        prism("sup", BP, V.zfd, Z0 + 2.2, 0.25, 4.0);
        var FH = frameN(HB0 + 0.05, hy - 1.2, V.zfd, -1, 0);
        plate("glass", FH, rectPts(-0.8, 2.7, 0.8, 3.5), -0.02, 0.05);
        plate("dark", FH, rectPts(-0.45, 0.1, 0.45, 2.0), -0.02, 0.05);
      })();
      /* the transom's mooring gear and the stern flap's absence: plain */
    } else {
      /* -- IIA: the hangar block, its sides the hull's carried up, the two
         hangars outboard of the 64-cell field on its roof (DDG-88)        */
      var HX0 = V.step + 0.0, HX1 = -28.8, ZH = Z1;
      var hA = hdOf(HX0) - 0.05, hB = hdOf(-40.0) - 0.05;
      var HG = [[HX0, -hA], [-40.0, -hB], [HX1, -hdOf(HX1) + 0.05], [HX1, hdOf(HX1) - 0.05], [-40.0, hB], [HX0, hA]];
      /* the side walls rise from the hull's deck edge and lean in; below
         the deck edge the hull itself is the side (a wall started at the
         flight deck stood out through the flared hull side, the torn band
         a side render showed)                                              */
      house(HG, Z0 - 0.08, ZH, 0.55, 0.0);
      /* the two roller doors on the plumb after face, the ladder between */
      for (s = -1; s <= 1; s += 2) {
        var FHd = frameN(V.step - 0.02, s * 4.6, V.zfd + 0.16, -1, 0);
        plate("dark", FHd, rectPts(-2.25, 0.0, 2.25, 4.35), -0.02, 0.05);
        plate("sup", FHd, rectPts(-2.55, 0.0, -2.25, 4.65), 0, 0.14);
        plate("sup", FHd, rectPts(2.25, 0.0, 2.55, 4.65), 0, 0.14);
        plate("sup", FHd, rectPts(-2.25, 4.35, 2.25, 4.65), 0, 0.14);
        for (j = 1; j < 9; j++) {
          var d0 = fp(FHd, -2.2, j * 0.48, 0.06), d1 = fp(FHd, 2.2, j * 0.48, 0.06);
          bar("metal", d0[0], d0[1], d0[2], d1[0], d1[1], d1[2], 0.035);
        }
      }
      var FL = frameN(V.step - 0.02, 0, V.zfd + 0.16, -1, 0);
      for (j = -1; j <= 1; j += 2) {
        var l0 = fp(FL, j * 0.5, 0.0, 0.5), l1 = fp(FL, j * 0.5, 5.0, 0.12);
        bar("metal", l0[0], l0[1], l0[2], l1[0], l1[1], l1[2], 0.05);
      }
      /* Mk 32 tube shutters and doors on the hangar sides */
      for (s = -1; s <= 1; s += 2) {
        var FS = face(HG, s > 0 ? 4 : 0, Z0 - 0.08, ZH, 0.55, 0.5, Z0 + 0.4, 0.0);
        plate("dark", FS, rectPts(-1.5, 0.0, 1.5, 1.6), -0.02, 0.05);
      }
      vlsField(-40.6, ZH, 7.4, 6.6);
      /* the deck lockers along the roof's after end and the low house on
         its centre aft (DDG-88 and DDG-81)                                */
      [[-51.0, 5.6], [-48.6, 5.6], [-46.2, 5.6]].forEach(function (p) {
        bx("sup", 2.1, 1.5, 1.1, p[0], p[1], ZH + 0.55);
        bx("dark", 1.6, 1.0, 0.04, p[0], p[1], ZH + 1.14);
      });
      prism("sup", chamfered(-52.2, -48.2, 1.6, 0.6, 0.6), ZH, ZH + 1.2, 0.15, 4.0);
      cz("sup", 0.45, 0.45, 0.9, 10, -50.2, -3.2, ZH);
      railRoof(roofOf(HG, 0.55, 0.1), ZH, [2], 2.0);
    }

    /* ------------------------------------------------------ the fwd VLS -- */
    vlsField(39.5, topZ(39.5, 0) - 0.02, 4.5, 6.6);

    /* ------------------------------------------------- weather deck gear -- */
    /* the short solid bulwark round the stem head, rails aft of it */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) {
        var xa = 68.5 + i * 2.1, xb = Math.min(xa + 2.1, 76.6);
        var ya = s * (hdOf(xa) - 0.1), yb = s * (hdOf(xb) - 0.1);
        var za = deckZF(xa, V), zb = deckZF(xb, V);
        bx("sup", Math.sqrt((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya)), 0.14, 0.95,
           (xa + xb) * 0.5, (ya + yb) * 0.5, (za + zb) * 0.5 + 0.5, 0, 0, Math.atan2(yb - ya, xb - xa));
      }
      var ep = [], ex = IIA ? -28.0 : V.step + 0.7;
      while (ex < 68.5) {
        ep.push([ex, s * (hdOf(ex) - 0.15), deckZF(ex, V) + 0.08]);
        ex += (ex > -30 && ex < 30) ? 6.0 : 3.0;
      }
      ep.push([68.5, s * (hdOf(68.5) - 0.15), deckZF(68.5, V) + 0.08]);
      railRun("metal", ep, 1.0, 2.1);
    }
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      bx("sup", 1.5, 0.6, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.2, 0.22, 0.6, 8, x - 0.45, y, z0);
      cz("metal", 0.2, 0.22, 0.6, 8, x + 0.45, y, z0);
    }
    for (s = -1; s <= 1; s += 2) { bitts(58.0, s * 5.2); bitts(36.0, s * 8.4); bitts(-20.0, s * 8.9); }
    bar("metal", 76.2, 0, deckZF(76.2, V) + 0.04, 76.2, 0, deckZF(76.2, V) + 3.4, 0.06);
    /* team patch lying on the forecastle, where the camera looks down */
    flat("team", 55.6, -2.0, 59.4, 2.0, topZ(57.5, 0) + 0.05, 0, 0, 1, 1);

    /* --------------------------------------------- the 5-inch Mk 45 ------ */
    /* Mod 1 (DDG-51): the rounded house; Mod 4 (DDG-81 on): the faceted
       house with its wedge nose and the 62-calibre barrel                   */
    function gun() {
      cz("sup", 2.25, 2.35, 0.25, 24, 0, 0, 0);
      if (V.mod4) {
        loftX("sup", [[-2.6, 1.10, 0.25, 2.15], [-2.45, 1.55, 0.25, 2.50], [0.7, 1.62, 0.25, 2.50],
                      [1.9, 1.30, 0.25, 2.05], [2.75, 0.62, 0.25, 1.45], [2.95, 0.46, 0.25, 1.25]], 8, 0.08);
        cx("dark", 0.36, 0.2, 0.55, 10, 2.7, 0, 1.15);
        cx("metal", 0.16, 0.12, 6.2, 12, 3.1, 0, 1.15);
      } else {
        loftX("sup", [[-2.55, 1.30, 0.25, 2.30], [-2.35, 1.62, 0.25, 2.55], [-1.2, 1.75, 0.25, 2.65],
                      [0.6, 1.72, 0.25, 2.62], [1.55, 1.55, 0.25, 2.30], [2.35, 1.20, 0.25, 1.55],
                      [2.75, 0.85, 0.25, 1.05]], 18, 0.32);
        cx("dark", 0.45, 0.22, 0.75, 12, 2.0, 0, 1.3);
        cx("metal", 0.17, 0.13, 5.2, 12, 2.65, 0, 1.3);
      }
      bx("sup", 0.9, 1.0, 0.1, -1.2, 0, V.mod4 ? 2.53 : 2.68);
      bx("dark", 0.06, 0.8, 1.2, -2.6, 0, 1.2);
    }
    var X_GUN = 48.0, tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_GUN, 0, topZ(X_GUN, 0));
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = XF - V.xa;
    return G;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e90_destroyer"] = {
  len: 153.9,
  build: function (THREE, M, C) {
    return HeroBurkeFlights.build(THREE, M, C, {
      flight: 1, xa: -76.95, step: -51.0, zfd: 4.25, hangar: false, highAft: false,
      mod4: false, pipes: false, domes: false, blackMast: true, crane: true, boot: false,
      fwdCiws: true });
  }
};
UNIT_MODELS["nato_e00_destroyer"] = {
  len: 155.3,
  build: function (THREE, M, C) {
    return HeroBurkeFlights.build(THREE, M, C, {
      flight: 2, xa: -78.35, step: -55.8, zfd: 4.25, hangar: true, highAft: true,
      mod4: true, pipes: true, domes: true, blackMast: false, crane: false, boot: true,
      fwdCiws: true });
  }
};
/* the present-day Flight IIA (DDG-89 on, as photographed 2018-2021): the
   shrouded stacks, one Phalanx abaft the after stack and the forward ledge
   empty, no Harpoon, the domes and the busier masthead                     */
UNIT_MODELS["destroyer_n"] = {
  len: 155.3,
  build: function (THREE, M, C) {
    return HeroBurkeFlights.build(THREE, M, C, {
      flight: 3, xa: -78.35, step: -55.8, zfd: 4.25, hangar: true, highAft: true,
      mod4: true, pipes: false, shrouded: true, domes: true, blackMast: false, crane: false,
      boot: true, fwdCiws: false, mastKit: true });
  }
};
