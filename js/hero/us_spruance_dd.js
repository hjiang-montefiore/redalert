/* ============================================================================
   us_spruance_dd.js -- HERO model: the Spruance-class destroyer, USS Spruance
   (DD-963) herself, for nato_e80_destroyer, in the fit she wore between her
   1983 yard period and the overhaul of 1986-87 that gave her the Mk 41.

   THE FIT, and why. The row is "USS Spruance (DD-963)", service 1975, era e80,
   weapons two 5-inch/54 Mk 45 and Sea Sparrow. Her own record (en.wikipedia,
   USS Spruance (DD-963)): Phalanx and the Mk 23 TAS in a brief yard period in
   1983, the Mk 41 VLS in the overhaul she entered after May 1985 (the Naval
   History and Heritage Command print NH 96851 dates the VLS ship to about
   June 1987), Harpoon "after several years of service" (the class got its
   quadruple Harpoons amidships in the early 1980s). The armored box launchers
   went to seven OTHER ships - Comte de Grasse, Merrill, Conolly, John Rodgers,
   Leftwich, Deyo and Ingersoll (class article) - never to DD-963, so none are
   drawn. Her photographs of 1975, February 1983 and November 1986 all show
   the Mk 16 ASROC box on the forecastle, so that is her decade's fit up to
   the VLS overhaul: ASROC forward, Sea Sparrow aft, two quadruple Harpoons
   amidships, two Phalanx. The Mk 23 TAS of 1983 is NOT drawn: none of these
   photographs shows where it stood.

   References (Wikimedia Commons, US Navy / NHHC photographs):
     r02  USS Spruance (DD-963) in Feb 1983 (330-CFD-DN-SC-84-00619): her
          starboard bow from above - ASROC, both masts black above the stack
          tops, the staggered stacks, the boat, the Harpoons;
     r03  bow view of Spruance and Ticonderoga at Norfolk, 8 October 1983:
          the forecastle lifelines (CG-47 beside her has a bulwark), the slab
          front of the bridge block, the foremast's platforms and heights;
     r05  running trials, Gulf of Mexico, February 1975: the plan from above;
     r06  underway, 20 November 1986: her port side nearly square on, the
          station table's x positions are measured off it (5.52 px/m);
     r10  NH 96851, June 1987, after the VLS, port bow: the mast detail;
     r11  her port profile, Atlantic, 11 June 2004: heights and profile;
     r08  USS Oldendorf (DD-972), early 1980s, port quarter: hangar door,
          Harpoons, the Sea Sparrow aft, the whaleboat, the Mk 95;
     r07  USS Conolly (DD-979) port quarter, 1993: the flight deck's plan,
          the Sea Sparrow house and the after gun on the open fantail;
     r01  Kidd (993) and Peterson (969) at Norfolk: the bridge block front.
   No general-arrangement drawing could be found on Commons; the hull is the
   Ticonderoga hero's (us_ticonderoga_cg.js), measured off the 1994 Navy
   drawing of the same Ingalls hull, cut to the Spruance's length and with
   her flush main deck (r07, r08 and r11 show no step at the fantail).
   Published figures: 171.7 m (563 ft) overall, 16.8 m (55 ft) beam, 8.8 m
   (29 ft) draught to the bottom of the sonar dome; warship_specs.js agrees.

   RECOGNITION - what makes her a Spruance at game zoom, and where it rests:
     1. the long flush hull, the raked clipper stem and the knuckle down the
        bow flare (r03, r11), lifelines and no bulwark on the forecastle (r03);
     2. the high slab-sided superstructure: one tall bridge block with a row
        of windows under its roof, and the 01 level run unbroken aft to the
        hangar (r01, r06, r11);
     3. the staggered twin stacks: the forward one to PORT, the after one to
        STARBOARD, broad casings with black tops and round uptakes (r02, r06,
        r08, r10);
     4. two 5-inch Mk 45 mounts, one on the forecastle and one on the fantail
        pointing aft (r06, r07, r11);
     5. two tall four-legged lattice masts, grey to the stack tops and black
        above (r02, r03, r06, r10): the foremast with the SPQ-9A radome on a
        forward platform, the SPG-60 dish over it and the SPS-55 at the top
        (the Mk 86 fire control), the mainmast with the SPS-40B on a forward
        platform and the TACAN at its head;
     6. the Mk 16 ASROC box on the forecastle just ahead of the bridge (r02,
        r05, r06);
     7. the hangar with its wide roller door and the flight deck on the 01
        level, its after corners cut (r07, r08);
     8. the Mk 29 Sea Sparrow on its own round-fronted house abaft the flight
        deck (r07, r08), the Mk 95 director on the hangar roof (r08);
     9. two quadruple Harpoons trained outboard abaft the forward stack (r02,
        r07, r08);
    10. Phalanx (from 1983): one on a sponson off the port forward corner
        of the bridge block at the 02 level (r11, her own 2004 profile), the
        other on the starboard side of the hangar roof, diagonally opposite
        as the Navy sited its pairs - that side is inferred, not seen;
    11. a 26-ft motor whaleboat in davits each side under the mainmast (r02,
        r06, r07, r08).

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -6.4
   and the sonar dome to -8.8. render3d.js stands the model up with
   rotation.x = -PI/2 and scales it by its measured X extent, so nothing may
   stand past the stem or the transom: both barrels are inside both.

   Paint: US haze grey (5-H, FS 26270). The 1983-86 colour photographs carry
   a warm film cast (sunlit hull #8f8977 to #afa28c, shade #534e49); the
   paint is the haze grey neutralised and taken to 0.9 of its level, because
   the renderer's ACES pass lifts mid greys about 1.8x: hull canvas #6b7177,
   deckhouses #747a80, the same level as the accepted Ticonderoga. Masts
   black above the stack tops. No hull number, name or flag.

   Materials (9): painted hull, non-skid deck, deckhouse plate, flight deck,
   radome white, black, bare metal, glass and the team material, exactly
   C.team. Every static part is merged into one mesh per material; the
   forward 5-inch is the named "turret" with its own three. The flight deck
   is marked for render3d's deckOf by a hidden "helipad" node: her after
   eighth is the open fantail, not the pad. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSpruanceDD = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 171.7, XB = LOA * 0.5;
  var HB = 8.4;                 /* half beam                                 */
  var DR = 6.4;                 /* hull draught, the dome hangs below it     */
  var ZTOP = 12.0, ZBOT = -1.5; /* vertical span the hull texture covers     */

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

  /* weather deck height by x: FLUSH from the transom to the break of the
     forecastle, then sheering up to the stem (r11's profile, r07's fantail) */
  var DK = [[-85.85, 6.90], [-60.0, 7.10], [-20.0, 7.30], [28.0, 7.55],
            [48.0, 8.30], [66.0, 9.45], [85.85, 10.70]];
  function deckZ(x) { return tbl(DK, x); }

  /* station table - half breadth at the deck edge as a fraction of the half
     beam, by fraction of the length from the transom (the Ingalls hull)    */
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
  /* 0 = full midship box section, 1 = the fine flared entry with its knuckle */
  var VB_K = [[0.00, 0.14], [0.09, 0.05], [0.20, 0.00], [0.58, 0.00],
              [0.68, 0.10], [0.78, 0.32], [0.860, 0.58], [0.930, 0.80],
              [1.000, 1.00]];
  /* sections as [half breadth, height] fractions, deck edge first. The fine
     section carries the KNUCKLE at 0.79 of the depth: steep above it, the
     flare opening out below it, as the bow of r03 shows                    */
  var SEC_FULL = [[1.000, 1.000], [1.004, 0.890], [1.003, 0.790], [0.995, 0.640],
                  [0.982, 0.500], [0.950, 0.370], [0.890, 0.260], [0.790, 0.165],
                  [0.640, 0.095], [0.440, 0.045], [0.220, 0.012], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.972, 0.890], [0.942, 0.790], [0.800, 0.640],
                  [0.695, 0.500], [0.595, 0.370], [0.492, 0.260], [0.384, 0.165],
                  [0.276, 0.095], [0.170, 0.045], [0.076, 0.012], [0.000, 0.000]];
  var CAMBER = [[0.560, 1.008], [0.000, 1.013], [-0.560, 1.008]];
  var RAKE_K = [[0.000, 0.0], [0.800, 0.0], [0.880, 1.5], [0.940, 4.0], [1.000, 8.2]];
  var KNUCKLE = 0.79;

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
    return r;
  }
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

  /* the stations: close together at the ends, where the lines change */
  var XS = [-85.85, -84.0, -80.0, -75.0, -70.0, -64.0, -57.0, -49.0, -41.0,
            -33.0, -25.0, -17.0, -9.0, 0.0, 9.0, 18.0, 27.0, 35.0, 43.0,
            50.0, 56.0, 62.0, 67.5, 72.5, 76.8, 80.2, 82.8, 84.5, 85.85];

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
    if (!_tx) _tx = { hull: hullTex(THREE), sup: supTex(THREE), deck: deckTex(THREE), pad: padTex(THREE) };
    return _tx;
  }

  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(96301), i, j, x, z;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    g.fillStyle = "#6b7177"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling below the waterline and the black boot topping over it */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.45), W, H - Y(-0.45));
    g.fillStyle = "#15181b"; g.fillRect(0, Y(0.80), W, Y(-0.45) - Y(0.80));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.80) - 1, W, 1.5);
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
    /* the knuckle down the bow flare: a lit edge over a shadowed one,
       following its real height, fading out where the section goes full */
    for (i = 0; i < 60; i++) {
      var xa = 18 + i * 1.12, xb2 = xa + 1.12;
      var fa = tbl(VB_K, tOf(xa));
      if (fa < 0.02) continue;
      var za = keelZ(tOf(xa)) + (deckZ(xa) - keelZ(tOf(xa))) * KNUCKLE;
      var zb = keelZ(tOf(xb2)) + (deckZ(xb2) - keelZ(tOf(xb2))) * KNUCKLE;
      g.lineWidth = 3; g.strokeStyle = "rgba(255,255,255," + (0.22 * Math.min(1, fa * 2.5)).toFixed(3) + ")";
      g.beginPath(); g.moveTo(U(xa), Y(za) - 1); g.lineTo(U(xb2), Y(zb) - 1); g.stroke();
      g.lineWidth = 3; g.strokeStyle = "rgba(0,0,0," + (0.30 * Math.min(1, fa * 2.5)).toFixed(3) + ")";
      g.beginPath(); g.moveTo(U(xa), Y(za) + 2); g.lineTo(U(xb2), Y(zb) + 2); g.stroke();
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
    /* exhaust staining streaming aft from both stacks */
    var FUN = [7.0, -22.0];
    for (i = 0; i < FUN.length; i++) {
      for (j = 0; j < 150; j++) {
        var f = R();
        x = FUN[i] - f * 28 - 2;
        z = deckZ(x) - 0.4 - R() * 3.0;
        g.globalAlpha = 0.036 * (1 - f) + 0.008; g.fillStyle = "#2a2d30";
        g.fillRect(U(x), Y(z), 8 + R() * 30, 4 + R() * 12);
      }
    }
    /* rust weeping from the hawse under each anchor */
    g.globalAlpha = 0.14; g.fillStyle = "#6d4526";
    g.fillRect(U(74.5) - 5, Y(deckZ(74.5) - 3.4), 10, 3.6 * (H / (ZTOP - ZBOT)));
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 71.5 : -80.0;
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
    var R = rng(30157), i;
    g.fillStyle = "#747a80"; g.fillRect(0, 0, W, H);
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

  /* the flight deck: u runs fore-and-aft (0 at its after edge), v athwart.
     The tie-down grid, the deck-edge line, the lineup line down the middle
     to the hangar door and the cross line r07 shows; a plain corner the
     other decks borrow                                                    */
  function padTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(2179), i, j;
    g.fillStyle = "#3d4247"; g.fillRect(0, 0, W, H);
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
    g.beginPath();
    g.moveTo(W * 0.03 + 50, H * 0.04); g.lineTo(W * 0.97, H * 0.04); g.lineTo(W * 0.97, H * 0.96);
    g.lineTo(W * 0.03 + 50, H * 0.96); g.lineTo(W * 0.03, H * 0.96 - 50); g.lineTo(W * 0.03, H * 0.04 + 50);
    g.closePath(); g.stroke();
    g.lineWidth = 6;
    g.beginPath(); g.moveTo(W * 0.03, H * 0.5); g.lineTo(W * 0.97, H * 0.5); g.stroke();
    g.lineWidth = 4;
    g.beginPath(); g.moveTo(W * 0.50, H * 0.12); g.lineTo(W * 0.50, H * 0.88); g.stroke();
    /* plain non-skid patch for the other decks: u, v in 0.2 .. 0.3 */
    g.fillStyle = "#3d4247"; g.fillRect(W * 0.19, H * 0.19, W * 0.12, H * 0.12);
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
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.rad   = S({ color: 0xc9ccc6, roughness: 0.90, metalness: 0.03 });
    M.dark  = S({ color: 0x24272b, roughness: 0.88, metalness: 0.06 });
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

  /* ---- plan polygons: always convex and counter-clockwise ------------- */
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
  function mv(poly, dx, dy) {
    return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; });
  }
  function roofOf(poly, ins, more) {
    var bb = bboxOf(poly), e = ins + (more || 0);
    var sx = (bb.w - 2 * e) / bb.w, sy = (bb.h - 2 * e) / bb.h;
    return poly.map(function (p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; });
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }
  /* a rectangle with its corners cut by c, counter-clockwise */
  function chamf(x0, y0, x1, y1, c) {
    return [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1],
            [x0, y1 - c], [x0, y0 + c]];
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

  /* the weather deck: a cambered ribbon on the hull top, sheer and all */
  function deckRibbon(THREE, mtl) {
    var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
    var XR = [-85.3, -82.0, -78.0, -74.0, -70.0, -64.0, -57.0, -49.0, -41.0, -33.0,
              -25.0, -17.0, -9.0, 0.0, 9.0, 18.0, 27.0, 35.0, 43.0, 50.0,
              56.0, 62.0, 67.5, 72.5, 76.8, 80.2, 82.8, 84.6];
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
  function build(THREE, MOD, C) {
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var M = makeMats(THREE, team);
    var G = new THREE.Group();
    var KEYS = ["sup", "pad", "rad", "dark", "metal", "team", "glass"];
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
    /* a frame on wall `ei` of a prism(poly, z0, z1, ins) */
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
        bar(k, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.045);
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
        railRun("metal", [[a[0], a[1], z], [b[0], b[1], z]], 1.0, Math.max(step || 0, 3.0));
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
    function topZ(x, y) {
      var t = tOf(x), dz = deckZ(x), dep = dz - keelZ(t);
      var ak = Math.min(1, Math.abs(y) / hullHW(x));
      return dz + dep * 0.013 * (1 - ak * ak) + 0.07;
    }
    /* a four-legged tapered lattice tower, X bracing on every face, drawn
       from u0 to u1 of its height in material k (a mast grey below the
       stack tops and black above them is two calls)                       */
    function tower(k, x0, x1, y0, tx0, tx1, ty0, z0, z1, lv, rl, rb, u0, u1) {
      function c(u, sx, sy) {
        var xb = sx < 0 ? x0 : x1, xt = sx < 0 ? tx0 : tx1;
        return [xb + (xt - xb) * u, sy * (y0 + (ty0 - y0) * u), z0 + (z1 - z0) * u];
      }
      var CR = [[-1, -1], [1, -1], [1, 1], [-1, 1]], q, e;
      u0 = u0 || 0; u1 = (u1 === undefined) ? 1 : u1;
      for (q = 0; q < 4; q++) {
        var a = c(u0, CR[q][0], CR[q][1]), b = c(u1, CR[q][0], CR[q][1]);
        tube(k, a[0], a[1], a[2], b[0], b[1], b[2], rl * (1 - 0.2 * u0), rl * (1 - 0.2 * u1), 6);
      }
      for (e = 1; e < lv.length; e++) {
        if (lv[e - 1] < u0 - 1e-6 || lv[e] > u1 + 1e-6) continue;
        for (q = 0; q < 4; q++) {
          var p0 = c(lv[e], CR[q][0], CR[q][1]), p1 = c(lv[e], CR[(q + 1) % 4][0], CR[(q + 1) % 4][1]);
          var d0 = c(lv[e - 1], CR[q][0], CR[q][1]), d1 = c(lv[e - 1], CR[(q + 1) % 4][0], CR[(q + 1) % 4][1]);
          bar(k, p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], rb * 1.2);
          bar(k, d0[0], d0[1], d0[2], p1[0], p1[1], p1[2], rb);
          bar(k, d1[0], d1[1], d1[2], p0[0], p0[1], p0[2], rb);
        }
      }
      return c;
    }
    /* a grating platform with a rail round it */
    function platform(k, x0, y0, x1, y1, z, skip) {
      bx(k, x1 - x0, y1 - y0, 0.24, (x0 + x1) * 0.5, (y0 + y1) * 0.5, z - 0.05);
      railRoof([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], z + 0.07, skip, 1.3);
    }

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    var dk = deckRibbon(THREE, M.deck); dk.name = "deck"; G.add(dk);

    /* SQS-53 bow sonar dome: black rubber under the forefoot, its bottom at
       the published 8.8 m (29 ft) */
    var dome = new THREE.SphereGeometry(1, 16, 9);
    dome.scale(4.9, 2.05, 2.55);
    dome.rotateY(-0.10);
    cur.dark.add(place(THREE, dome, 64.6, 0, -6.30));
    for (s = -1; s <= 1; s += 2)
      bx("dark", 30.0, 0.16, 0.55, -17.0, s * 7.3, -3.9, s * 0.75, 0, 0);

    /* two anchors in hawses on the bows */
    for (s = -1; s <= 1; s += 2) {
      var AX = 74.5, AZ = deckZ(74.5) - 2.3, ay0 = hullY(AX + 0.6, AZ);
      var slope = (hullY(AX + 1.6, AZ) - hullY(AX - 0.4, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.05), AZ, -slope, s);
      plate("dark", FA, rectPts(-0.8, -1.9, 0.8, 0.55), 0, 0.05);
      plate("metal", FA, rectPts(-0.14, -1.45, 0.14, 0.35), 0.05, 0.36);
      plate("metal", FA, rectPts(-0.42, -1.75, 0.42, -1.42), 0.05, 0.40);
      plate("metal", FA, [[-0.42, -1.75], [-0.42, -1.42], [-0.9, -1.12]], 0.05, 0.34);
      plate("metal", FA, [[0.42, -1.75], [0.9, -1.12], [0.42, -1.42]], 0.05, 0.34);
      cz("dark", 0.42, 0.42, 0.08, 10, 73.9, s * 2.5, topZ(73.9, 2.5) - 0.03);
      var cxa = 73.9, cya = s * 2.5, cxb = 68.2, cyb = s * 1.1;
      bx("dark", Math.sqrt((cxa - cxb) * (cxa - cxb) + (cya - cyb) * (cya - cyb)), 0.32, 0.12,
         (cxa + cxb) * 0.5, (cya + cyb) * 0.5, topZ(71.0, 1.8) + 0.03, 0, 0, Math.atan2(cya - cyb, cxa - cxb));
      cz("metal", 0.55, 0.62, 0.75, 12, 68.2, s * 1.1, topZ(68.2, 1.1) - 0.02);
      bx("sup", 1.4, 0.9, 0.6, 67.2, s * 1.1, topZ(67.2, 1.1) + 0.28);
    }
    cz("metal", 0.45, 0.55, 0.95, 10, 65.2, 0, topZ(65.2, 0) - 0.02);

    /* ------------------------------------------- levels and the flight deck */
    var Z01 = 10.5, Z02 = 13.1, Z03 = 15.6, Z3F = 16.3, ZBR = 19.6, ZF = 10.7;
    var FD0 = -58.6, FD1 = -36.0, FDW = 7.4;
    /* the flight deck block: the 01 level from the hangar aft, its after
       corners cut (r07), the pad on its roof                              */
    var FDP = [[FD0, -FDW + 2.2], [FD0 + 2.2, -FDW], [FD1, -FDW], [FD1, FDW], [FD0 + 2.2, FDW], [FD0, FDW - 2.2]];
    prism("sup", FDP, 6.9, ZF, 0, 4.0, true);
    (function () {
      var c0 = [(FD0 + FD1) * 0.5, 0], q;
      function UV(p) { return [p[0], p[1], ZF, (p[0] - FD0) / (FD1 - FD0), (p[1] + FDW) / (2 * FDW)]; }
      for (q = 0; q < FDP.length; q++) {
        var a = FDP[q], b = FDP[(q + 1) % FDP.length];
        cur.pad.tri(UV(c0), UV(a), UV(b));
      }
    })();
    /* the landing circle in the team colour, lying on the deck */
    var rg = new THREE.RingGeometry(5.0, 5.65, 36);
    cur.team.add(place(THREE, rg, -48.6, 0, ZF + 0.03));
    /* safety nets along both sides and the after edge */
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
    nets(FD0 + 2.4, -FDW, FD1 - 0.6, -FDW, 0, -1);
    nets(FD0 + 2.4, FDW, FD1 - 0.6, FDW, 0, 1);
    nets(FD0, -FDW + 2.4, FD0, FDW - 2.4, -1, 0);
    /* the Mk 32 tubes behind shutters in the side of the flight deck block */
    for (s = -1; s <= 1; s += 2) {
      var FT = frameN(-43.0, s * FDW, 7.3, 0, s);
      plate("dark", FT, rectPts(-1.4, 0.3, 1.4, 2.3), -0.02, 0.05);
      plate("sup", FT, rectPts(-1.6, 2.3, 1.6, 2.5), 0, 0.14);
      for (j = -1; j <= 1; j++) {
        var m0 = fp(FT, j * 0.72, 1.3, 0.0), m1 = fp(FT, j * 0.72, 1.3, 0.22);
        tube("metal", m0[0], m0[1], m0[2], m1[0], m1[1], m1[2], 0.21, 0.21, 8);
      }
      /* doors and a cut-out walkway port along the block's side */
      plate("dark", frameN(-52.0, s * FDW, 7.2, 0, s), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
      plate("dark", frameN(-38.4, s * FDW, 7.2, 0, s), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    }

    /* ---------------------------------------------- the hangar and aft ---- */
    /* the hangar block, one face from the main deck to its roof */
    var HG = [[FD1, -7.0], [-17.4, -7.0], [-17.4, 7.0], [FD1, 7.0]];
    prism("sup", HG, 7.0, Z03, 0.2, 4.0);
    railRoof(roofOf(HG, 0.2, 0.12), Z03, null, 1.9);
    /* the wide roller door in its after face (r08: three leaves) */
    (function () {
      var FH = face(HG, 3, 7.0, Z03, 0.2, 0.47, ZF);
      plate("dark", FH, rectPts(-4.8, 0.0, 4.8, 4.75), -0.02, 0.05);
      plate("sup", FH, rectPts(-5.15, 0.0, -4.8, 5.1), 0, 0.16);
      plate("sup", FH, rectPts(4.8, 0.0, 5.15, 5.1), 0, 0.16);
      plate("sup", FH, rectPts(-4.8, 4.75, 4.8, 5.1), 0, 0.16);
      for (j = 1; j < 10; j++) {
        var d0 = fp(FH, -4.75, j * 0.47, 0.06), d1 = fp(FH, 4.75, j * 0.47, 0.06);
        bar("metal", d0[0], d0[1], d0[2], d1[0], d1[1], d1[2], 0.035);
      }
      [-1.6, 1.6].forEach(function (sv) {
        var a0 = fp(FH, sv, 0.05, 0.07), a1 = fp(FH, sv, 4.7, 0.07);
        bar("dark", a0[0], a0[1], a0[2], a1[0], a1[1], a1[2], 0.05);
      });
      /* a watertight door beside it */
      plate("dark", face(HG, 3, 7.0, Z03, 0.2, 0.06, ZF), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    })();
    [[0, 0.30], [0, 0.72], [2, 0.28], [2, 0.70]].forEach(function (d) {
      plate("dark", face(HG, d[0], 7.0, Z03, 0.2, d[1], 7.0), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });

    /* an uptake: a broad casing with round corners, its black top, and the
       round exhausts standing in it (r07, r10)                            */
    function stack(x, y, ax, ay, z0, zb, z1) {
      prism("sup", mv(rounded(ax, ay, 0.35, 16), x, y), z0, zb, 0.12, 3.0, true);
      prism("dark", mv(rounded(ax - 0.10, ay - 0.10, 0.35, 16), x, y), zb, z1, 0.05, 3.0, false);
      [[-0.45, -0.42], [-0.45, 0.42], [0.45, -0.42], [0.45, 0.42]].forEach(function (p) {
        var px = x + p[0] * ax * 1.15, py = y + p[1] * ay * 1.15;
        cz("dark", 0.62, 0.66, 0.55, 12, px, py, z1 - 0.05);
        cz("metal", 0.50, 0.50, 0.02, 12, px, py, z1 + 0.49);
      });
    }
    /* the after stack, to STARBOARD, rising off the hangar's forward end */
    stack(-22.4, -2.85, 4.1, 2.5, Z03, 22.4, 24.0);
    /* two whips on its sides (r08, r11) */
    bar("metal", -20.0, -5.55, 21.0, -20.0, -5.65, 33.0, 0.06);
    bar("metal", -24.4, -5.55, 21.0, -24.4, -5.65, 32.4, 0.06);
    /* the small house on the hangar roof to port of it */
    var H3 = [[-27.0, 0.6], [-17.6, 0.6], [-17.6, 6.2], [-27.0, 6.2]];
    prism("sup", H3, Z03, 18.0, 0.15, 4.0);
    railRoof(roofOf(H3, 0.15, 0.1), 18.0, null, 1.6);

    /* the Mk 95 director for the Sea Sparrow, twin dishes on a column, at
       the after end of the hangar roof (r08; the side is not certain)     */
    stamp(-33.4, 4.7, Z03, PI, function () {
      cz("sup", 0.55, 0.65, 1.1, 12, 0, 0, 0);
      bx("sup", 0.9, 2.3, 0.5, 0, 0, 1.35);
      for (var q = -1; q <= 1; q += 2) {
        var g = new THREE.CylinderGeometry(0.62, 0.62, 0.9, 14, 1, false);
        g.rotateZ(-PI / 2); g.translate(0.1, q * 0.72, 2.1);
        cur.rad.add(g);
        cx("dark", 0.5, 0.5, 0.05, 14, 0.55, q * 0.72, 2.1);
      }
    });
    railRing(-33.4, 4.7, Z03, 1.6, 10);

    /* the Sea Sparrow: its round-fronted house on the main deck abaft the
       flight deck (r07) and the Mk 29 octuple launcher on it, two boxes of
       four on a trainable stand, laid fore and aft, its boxes no higher
       than the flight deck's edge (r08). The house is kept that low on
       purpose too: the game draws an escort's helicopter about three and a
       half times her scale, its tail wheel reaches past the pad, and
       render3d's settle() stands it on anything up to 2.5 m over the pad
       (parked3d C measured +1.24 m with the launcher a metre higher)      */
    var XN = -62.6, ZN = 8.2;
    var NS = mv(rounded(3.0, 3.3, 0.55, 20), XN, 0);
    prism("sup", NS, topZ(XN, 0) - 0.1, ZN, 0.2, 4.0);
    railRoof(roofOf(rectPts(XN - 2.8, -3.0, XN + 2.8, 3.0), 0, 0.0), ZN, [1], 1.5);
    stamp(XN, 0, ZN, PI, function () {
      cz("sup", 1.05, 1.2, 0.5, 14, 0, 0, 0);
      bx("sup", 1.2, 1.4, 0.8, 0, 0, 0.9);
      for (var q = -1; q <= 1; q += 2) {
        bx("sup", 3.9, 1.25, 1.45, 0.4, q * 0.9, 1.55, 0, -0.06, 0);
        /* the frangible covers, four a box, at the muzzle end */
        for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2)
          bx("dark", 0.06, 0.48, 0.55, 2.38, q * 0.9 + a * 0.29, 1.69 + b * 0.31, 0, -0.06, 0);
      }
    });

    /* ---------------------------------------------------- the 01 house ---- */
    /* the long 01-level house from the hangar to the bridge, walkways
       outboard of it on the main deck                                     */
    var A01 = [[-9.4, -7.1], [16.2, -7.1], [16.2, 7.1], [-9.4, 7.1]];
    prism("sup", A01, 7.1, Z01, 0.12, 4.0);
    railRoof(roofOf(A01, 0.12, 0.05), Z01, [1], 1.9);
    /* the boat bays: the 01 house drawn in between the hangar and the
       mainmast, the whaleboats hanging in its notch (r07, r08)            */
    var A01B = [[-17.4, -5.3], [-9.4, -5.3], [-9.4, 5.3], [-17.4, 5.3]];
    prism("sup", A01B, 7.1, Z01, 0.1, 4.0);
    [[0, 0.15], [0, 0.52], [0, 0.86], [2, 0.12], [2, 0.48], [2, 0.84]].forEach(function (d) {
      plate("dark", face(A01, d[0], 7.1, Z01, 0.12, d[1], 7.3), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    /* the 02 level under the forward stack, the Harpoons and the mainmast */
    var A02 = [[-9.2, -6.0], [16.2, -6.0], [16.2, 6.0], [-9.2, 6.0]];
    prism("sup", A02, Z01, Z02, 0.15, 4.0);
    railRoof(roofOf(A02, 0.15, 0.08), Z02, [1], 1.9);
    /* the 03 house the forward stack rises from */
    var A03 = [[1.5, -5.4], [16.2, -5.4], [16.2, 6.0], [1.5, 6.0]];
    prism("sup", A03, Z02, Z3F, 0.15, 4.0);
    railRoof(roofOf(A03, 0.15, 0.08), Z3F, [1], 1.8);
    /* to starboard of the stack the 03 house runs on aft to the Harpoon
       deck (r05, r10)                                                      */
    var A03S = [[-0.6, -5.4], [1.6, -5.4], [1.6, -0.4], [-0.6, -0.4]];
    prism("sup", A03S, Z02, Z3F, 0.1, 4.0);
    /* the forward stack, to PORT */
    stack(7.4, 2.85, 4.3, 2.55, Z3F, 22.9, 24.6);
    bar("metal", 5.0, 5.6, 21.5, 5.0, 5.7, 31.0, 0.05);

    /* ------------------------------------------------ the bridge block ---- */
    /* one tall slab from the main deck to the pilot house roof, its walls
       leaning in a little, the front corners eased (r01, r03, r11)         */
    var FB = chamf(16.2, -7.6, 30.8, 7.6, 0.9);
    prism("sup", FB, 7.4, ZBR, 0.35, 4.0);
    railRoof(roofOf(FB, 0.35, 0.12), ZBR, null, 1.9);
    /* the pilot house windows across the front and round the corners, a
       brow over them                                                       */
    var WZ = 18.35;
    (function () {
      var Ff = face(FB, 2, 7.4, ZBR, 0.35, 0.5, WZ), q;
      for (q = -6; q <= 6; q++) plate("glass", Ff, rectPts(q * 0.98 - 0.4, -0.45, q * 0.98 + 0.4, 0.45), -0.02, 0.05);
      plate("sup", Ff, rectPts(-7.1, 0.58, 7.1, 0.72), 0, 0.45);
      [1, 3].forEach(function (e) {
        var Fc = face(FB, e, 7.4, ZBR, 0.35, 0.5, WZ);
        plate("glass", Fc, rectPts(-0.38, -0.45, 0.38, 0.45), -0.02, 0.05);
      });
      [0, 4].forEach(function (e) {
        var Fs = face(FB, e, 7.4, ZBR, 0.35, e === 0 ? 0.84 : 0.16, WZ);
        for (var r = -1; r <= 1; r++) plate("glass", Fs, rectPts(r * 0.98 - 0.4, -0.45, r * 0.98 + 0.4, 0.45), -0.02, 0.05);
      });
    })();
    /* doors low in the block's sides and in its after face */
    [[0, 0.2], [0, 0.55], [4, 0.45], [4, 0.8]].forEach(function (d) {
      plate("dark", face(FB, d[0], 7.4, ZBR, 0.35, d[1], 7.6), rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.06);
    });
    /* short bridge wings either side at the window level */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 2.6, 1.0, 0.22, 27.6, s * 7.85, 17.5);
      bx("sup", 2.6, 0.1, 1.0, 27.6, s * 8.32, 18.1);
      bar("sup", 27.6, s * 7.3, 16.3, 27.6, s * 8.2, 17.4, 0.12);
      /* the white pedestal-mounted covers on the forward corners of the
         pilot house roof (r02, r06, r10, r11); not identified           */
      cz("sup", 0.32, 0.4, 0.9, 10, 29.4, s * 6.1, ZBR);
      cz("rad", 0.48, 0.48, 1.05, 12, 29.4, s * 6.1, ZBR + 0.9);
      hemi("rad", 0.48, 12, 4, 29.4, s * 6.1, ZBR + 1.95);
    }
    /* scuttles and vent trunks on the roofs the camera looks down on */
    [[2.6, -3.6], [-6.0, 4.4], [-6.0, -4.4], [12.5, -3.6]].forEach(function (p) {
      bx("dark", 0.9, 0.9, 0.06, p[0], p[1], (p[0] > 1.6 ? Z3F : Z02) + 0.03);
    });
    [[-14.0, 3.0], [-14.0, -3.0]].forEach(function (p) {
      bx("sup", 1.6, 1.0, 0.8, p[0], p[1], Z01 + 0.4);
      bx("dark", 0.06, 0.8, 0.5, p[0] + 0.82, p[1], Z01 + 0.45);
    });
    /* life rafts in their cradles along the 02 and hangar roof edges */
    function raft(x, y, z, alongX) {
      var g = new THREE.CylinderGeometry(0.27, 0.27, 1.2, 6, 1, false);
      if (alongX) g.rotateZ(PI / 2);
      cur.rad.add(place(THREE, g, x, y, z + 0.31));
      bx("dark", alongX ? 1.0 : 0.5, alongX ? 0.5 : 1.0, 0.08, x, y, z + 0.04);
    }
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 4; j++) raft(-6.0 + j * 1.35, s * 6.45, Z01, true);
      for (j = 0; j < 4; j++) raft(9.0 + j * 1.35, s * 5.35, Z02, true);
    }
    /* the SLQ-32 houses on sponsons either side, abaft the bridge block */
    function slq32(x, y, side) {
      stamp(x, y, Z02, side > 0 ? PI / 2 : -PI / 2, function () {
        bx("sup", 1.3, 3.3, 0.2, 0.55, 0, -0.1);
        bx("sup", 0.9, 2.9, 2.0, 0.5, 0, 1.0);
        bx("rad", 0.1, 2.5, 1.6, 0.99, 0, 1.05, 0, -0.2, 0);
        bx("sup", 0.7, 1.3, 0.8, 0.4, 0.5, 2.4);
      });
    }
    for (s = -1; s <= 1; s += 2) slq32(14.4, s * 6.0, s);

    /* --------------------------------------------------- the foremast ---- */
    /* four legs off the pilot house roof, grey to the stack tops and black
       above (r02, r03); the SPQ-9A radome on its forward platform, the
       SPG-60 dish over it on the next, the yards and the SPS-55 at the top
       (the Mk 86 fire control and the surface search)                     */
    var FLV = [0, 0.18, 0.34, 0.5, 0.64, 0.77, 0.89, 1.0], FZ1 = 37.4, FUg = (24.2 - ZBR) / (FZ1 - ZBR);
    var fm = tower("sup", 20.4, 27.4, 3.7, 22.9, 25.1, 1.1, ZBR, FZ1, FLV, 0.32, 0.1, 0, FUg);
    tower("dark", 20.4, 27.4, 3.7, 22.9, 25.1, 1.1, ZBR, FZ1, FLV, 0.32, 0.1, FUg, 1);
    function fAt(z, sx, sy) { return fm((z - ZBR) / (FZ1 - ZBR), sx, sy); }
    /* the SPQ-9A: platform out ahead of the forward legs, the radome on it */
    var q9 = fAt(28.9, 1, 1);
    platform("dark", q9[0] - 0.4, -1.8, q9[0] + 3.3, 1.8, 28.9, null);
    bar("dark", q9[0] + 3.2, 1.7, 28.8, fAt(25.8, 1, 1)[0], 1.7, 25.8, 0.08);
    bar("dark", q9[0] + 3.2, -1.7, 28.8, fAt(25.8, 1, 1)[0], -1.7, 25.8, 0.08);
    cz("dark", 0.4, 0.5, 0.4, 10, q9[0] + 1.6, 0, 28.97);
    sph("rad", 1.32, 16, 10, q9[0] + 1.6, 0, 30.6);
    /* the SPG-60 tracker on the next platform, its dish looking forward */
    var g60 = fAt(32.6, 1, 1);
    platform("dark", g60[0] - 2.4, -5.0, g60[0] + 2.3, 5.0, 32.6, null);
    stamp(g60[0] + 1.1, 0.4, 32.67, 0, function () {
      cz("sup", 0.45, 0.55, 1.3, 10, 0, 0, 0);
      bx("sup", 0.7, 1.0, 0.6, 0, 0, 1.5);
      var g = new THREE.CylinderGeometry(1.05, 0.35, 0.5, 18, 1, false);
      g.rotateZ(-PI / 2); g.translate(0.55, 0, 2.15);
      cur.rad.add(g);
      cx("dark", 0.16, 0.16, 0.5, 8, 0.8, 0, 2.15);
    });
    /* whips standing on the platform's ends */
    for (s = -1; s <= 1; s += 2) bar("dark", g60[0] + 0.2, s * 4.3, 32.6, g60[0] + 0.2, s * 4.3, 34.4, 0.05);
    /* the top platform with its yard arms and whips */
    platform("dark", 22.4, -5.6, 25.6, 5.6, FZ1, null);
    bar("dark", 24.0, -5.3, FZ1 - 0.1, 24.0, 5.3, FZ1 - 0.1, 0.09);
    for (s = -1; s <= 1; s += 2) {
      bar("dark", 24.0, s * 5.5, FZ1 - 0.1, 24.0, s * 5.5, FZ1 + 1.9, 0.06);
      bar("dark", 24.0, s * 2.0, FZ1 - 0.1, 24.0, s * 0.9, FZ1 - 1.6, 0.06);
      bar("dark", 24.0, s * 3.6, FZ1 - 0.1, 24.0, s * 3.6, FZ1 - 1.0, 0.03);
    }
    /* the topmast, the SPS-55 on its own platform near the head */
    tube("dark", 24.0, 0, FZ1, 24.0, 0, 44.2, 0.2, 0.08, 6);
    bx("dark", 1.4, 1.4, 0.12, 24.0, 0, 39.9);
    bx("dark", 0.4, 2.0, 0.65, 24.3, 0, 40.45);
    cz("dark", 0.14, 0.18, 0.4, 6, 24.0, 0, 39.96);
    bar("dark", 24.0, -1.1, 42.4, 24.0, 1.1, 42.4, 0.04);

    /* --------------------------------------------------- the mainmast ---- */
    /* on the 01 roof between the stacks, its lower lattice haze grey and
       the rest black (r02, r10); the SPS-40B on a platform out ahead of
       it, a lower platform, the top yard and the TACAN at the head        */
    var MLV = [0, 0.14, 0.28, 0.42, 0.55, 0.67, 0.78, 0.89, 1.0], MZ1 = 37.2, MUg = (22.8 - Z01) / (MZ1 - Z01);
    var mm = tower("sup", -13.1, -6.5, 3.6, -10.8, -8.6, 1.1, Z01, MZ1, MLV, 0.33, 0.1, 0, MUg);
    tower("dark", -13.1, -6.5, 3.6, -10.8, -8.6, 1.1, Z01, MZ1, MLV, 0.33, 0.1, MUg, 1);
    function mAt(z, sx, sy) { return mm((z - Z01) / (MZ1 - Z01), sx, sy); }
    var m24 = mAt(24.6, 1, 1);
    platform("dark", mAt(24.6, -1, 1)[0] - 0.4, -m24[1] - 0.5, m24[0] + 0.5, m24[1] + 0.5, 24.6, null);
    var p40 = mAt(28.4, 1, 1);
    platform("dark", p40[0] - 0.3, -1.9, p40[0] + 2.6, 1.9, 28.4, null);
    bar("dark", p40[0] + 2.5, 1.8, 28.3, mAt(25.4, 1, 1)[0], 1.6, 25.4, 0.07);
    bar("dark", p40[0] + 2.5, -1.8, 28.3, mAt(25.4, 1, 1)[0], -1.6, 25.4, 0.07);
    cz("dark", 0.38, 0.48, 0.7, 10, p40[0] + 1.3, 0, 28.47);
    /* the SPS-40B: an open-mesh truncated paraboloid, 5.4 m across, its
       feed on a boom ahead of it, turned a little off the bow             */
    stamp(p40[0] + 1.3, 0, 29.2, 0.35, function () {
      var NSL = 9, AW = 2.7, AH = 2.9, q, Bm = cur.dark;
      function rx(y) { return 0.45 - 0.75 * (y / AW) * (y / AW); }
      for (q = 0; q < NSL; q++) {
        var ya = -AW + 2 * AW * q / NSL, yb = -AW + 2 * AW * (q + 1) / NSL;
        var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
        var a1 = [rx(ya), ya, AH, 0, 1], b1 = [rx(yb), yb, AH, 1, 1];
        /* each slat narrower than its pitch: the open mesh the light comes
           through, still a dark shape at game zoom                         */
        var ym = (ya + yb) * 0.5, hw = (yb - ya) * 0.36;
        a0 = [rx(ym - hw), ym - hw, 0, 0, 0]; b0 = [rx(ym + hw), ym + hw, 0, 1, 0];
        a1 = [rx(ym - hw), ym - hw, AH, 0, 1]; b1 = [rx(ym + hw), ym + hw, AH, 1, 1];
        Bm.triOut(a0, b0, b1, [6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [6, 0, AH * 0.5]);
        Bm.triOut(a0, b0, b1, [-6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [-6, 0, AH * 0.5]);
      }
      bar("dark", rx(-AW), -AW, 0, 0.45, 0, 0, 0.06);
      bar("dark", 0.45, 0, 0, rx(AW), AW, 0, 0.06);
      bar("dark", rx(-AW), -AW, AH, 0.45, 0, AH, 0.06);
      bar("dark", 0.45, 0, AH, rx(AW), AW, AH, 0.06);
      for (q = -2; q <= 2; q++) bar("dark", rx(q * AW / 2.5), q * AW / 2.5, 0, rx(q * AW / 2.5), q * AW / 2.5, AH, 0.04);
      bar("dark", 0.5, 0, AH * 0.45, 2.1, 0, AH * 0.42, 0.07);
      bx("dark", 0.4, 0.6, 0.5, 2.2, 0, AH * 0.42);
      bar("dark", 0.45, 0, 0.2, 2.0, 0, AH * 0.38, 0.04);
    });
    platform("dark", -11.2, -5.3, -8.2, 5.3, MZ1, null);
    bar("dark", -9.7, -5.0, MZ1 - 0.1, -9.7, 5.0, MZ1 - 0.1, 0.09);
    for (s = -1; s <= 1; s += 2) {
      bar("dark", -9.7, s * 5.2, MZ1 - 0.1, -9.7, s * 5.2, MZ1 + 1.8, 0.06);
      bar("dark", -9.7, s * 2.0, MZ1 - 0.1, -9.7, s * 0.9, MZ1 - 1.6, 0.06);
    }
    tube("dark", -9.7, 0, MZ1, -9.7, 0, 43.2, 0.2, 0.09, 6);
    bx("dark", 1.3, 1.3, 0.12, -9.7, 0, 40.3);
    /* the URN-25 TACAN at the masthead */
    cz("dark", 0.42, 0.42, 1.1, 10, -9.7, 0, 41.2);
    cz("rad", 0.48, 0.48, 0.25, 10, -9.7, 0, 42.3);

    /* ------------------------------------------------- Harpoons (2 x 4) -- */
    /* abaft the forward stack on the 02 roof, canisters elevated and trained
       outboard and a little forward, one launcher each side (r02, r07, r08) */
    function harpoon(x, y, side) {
      stamp(x, y, Z02, side > 0 ? PI / 2 - 0.45 : -PI / 2 + 0.45, function () {
        bx("sup", 2.4, 1.7, 0.2, 0.3, 0, 0.1);
        bx("metal", 0.22, 1.5, 1.85, -0.75, 0, 1.0);
        bx("metal", 0.22, 1.5, 0.75, 1.15, 0, 0.45);
        bar("metal", -0.75, 0.7, 1.9, 1.15, 0.7, 0.8, 0.07);
        bar("metal", -0.75, -0.7, 1.9, 1.15, -0.7, 0.8, 0.07);
        for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2) {
          var g = new THREE.CylinderGeometry(0.27, 0.27, 4.6, 8, 1, false);
          g.rotateZ(-PI / 2); g.rotateY(-0.61); g.translate(0.6, a * 0.36, 2.2 + b * 0.36);
          cur.sup.add(g);
          for (var r = -1; r <= 1; r += 2) {
            var h = new THREE.CylinderGeometry(0.31, 0.31, 0.16, 8, 1, true);
            h.rotateZ(-PI / 2); h.rotateY(-0.61);
            h.translate(0.6 + r * 1.35 * Math.cos(0.61), a * 0.36, 2.2 + b * 0.36 + r * 1.35 * Math.sin(0.61));
            cur.metal.add(h);
          }
          cur.dark.add(place(THREE, new THREE.BoxGeometry(0.08, 0.5, 0.5),
                             0.6 + 2.31 * Math.cos(0.61), a * 0.36, 2.2 + b * 0.36 + 2.31 * Math.sin(0.61), 0, -0.61, 0));
        }
      });
    }
    harpoon(-2.6, 3.0, 1);
    harpoon(-2.6, -3.0, -1);

    /* --------------------------------------------- the Phalanx (two) ---- */
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
    /* forward: a sponson off the port forward corner of the bridge block
       at the 02 level (r11, her port profile of 2004)                      */
    bx("sup", 3.4, 2.7, 0.25, 31.9, 5.6, Z02 - 0.12);
    bar("sup", 30.7, 5.6, 10.4, 32.9, 5.6, Z02 - 0.25, 0.14);
    railRun("metal", [[30.9, 4.2, Z02], [33.55, 4.2, Z02], [33.55, 6.95, Z02], [30.9, 6.95, Z02]], 1.0, 1.4);
    phalanx(32.0, 5.6, Z02, 0.25);
    /* aft: on the starboard side of the hangar roof abaft the after stack,
       diagonally opposite the forward one as the Navy sited its pairs; the
       side is not confirmed by a photograph                              */
    cz("sup", 1.45, 1.45, 0.9, 16, -29.6, -4.6, Z03);
    railRing(-29.6, -4.6, Z03 + 0.9, 1.38, 12);
    phalanx(-29.6, -4.6, Z03 + 0.9, PI + 0.5);

    /* boats in davits either side under the mainmast: the 26-ft motor
       whaleboats of the 1980s, canopied aft                               */
    function boat(xc, yc, zk) {
      stamp(xc, yc, zk, 0, function () {
        var L = 3.95, B = 1.18;
        loftX("sup", [[-L, B * 0.82, 0.32, 1.12], [-L + 0.45, B * 0.96, 0.06, 1.15],
                      [-L * 0.3, B, 0.0, 1.15], [L * 0.35, B * 0.93, 0.06, 1.18],
                      [L * 0.72, B * 0.62, 0.25, 1.22], [L * 0.94, B * 0.22, 0.6, 1.25],
                      [L, 0.01, 0.9, 1.25]], 12, 0.55);
        bx("sup", 2.6, 1.7, 0.75, -0.9, 0, 1.55);
        var cg = new THREE.CylinderGeometry(0.85, 0.85, 2.6, 10, 1, false, 0, PI);
        cg.rotateZ(PI / 2); cg.rotateX(PI / 2);
        cur.sup.add(place(THREE, cg, -0.9, 0, 1.92));
      });
    }
    for (s = -1; s <= 1; s += 2) {
      var BY = s * 6.75;
      boat(-13.5, BY, Z01 - 0.35);
      bx("dark", 0.3, 0.6, 0.9, -15.5, s * 5.0, Z01 - 0.45);
      bx("dark", 0.3, 0.6, 0.9, -11.5, s * 5.0, Z01 - 0.45);
      for (j = -1; j <= 1; j += 2) {
        var DX = -13.5 + j * 2.6;
        tube("metal", DX, s * 5.0, Z01, DX, s * 5.3, 13.6, 0.13, 0.11, 6);
        bar("metal", DX, s * 5.3, 13.5, DX, BY, 13.9, 0.09);
        bar("metal", DX, BY, 13.85, DX, BY, 11.4, 0.02);
      }
    }

    /* --------------------------------------------- the 5-inch Mk 45 mounts */
    function gun() {
      cz("sup", 2.45, 2.55, 0.25, 24, 0, 0, 0);
      loftX("sup", [[-2.55, 1.30, 0.25, 2.30], [-2.35, 1.62, 0.25, 2.55], [-1.2, 1.75, 0.25, 2.65],
                    [0.6, 1.72, 0.25, 2.62], [1.55, 1.55, 0.25, 2.30], [2.35, 1.20, 0.25, 1.55],
                    [2.75, 0.85, 0.25, 1.05]], 18, 0.32);
      cx("dark", 0.45, 0.22, 0.75, 12, 2.0, 0, 1.3);
      cx("metal", 0.17, 0.13, 5.35, 12, 2.65, 0, 1.3);
      bx("sup", 0.9, 1.0, 0.1, -1.2, 0, 2.68);
      bx("dark", 0.06, 0.8, 1.3, -2.58, 0, 1.2);
    }
    /* the forward mount trains: it is the node the renderer aims, origin on
       its ring centre, the barrel along +X                                */
    var X_GUN = 51.0, tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_GUN, 0, topZ(X_GUN, 0));
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    /* the after mount on the open fantail, pointing aft (r06, r07, r11) */
    stamp(-71.3, 0, topZ(-71.3, 0), PI, gun);

    /* ----------------------------------------------------------- ASROC ---- */
    /* the Mk 16 launcher on the forecastle ahead of the bridge: two boxes of
       four cells side by side on a trainable stand, laid level and pointing
       forward (r02, r05, r06)                                              */
    var XA = 35.0, ZA = topZ(XA, 0);
    stamp(XA, 0, ZA, 0, function () {
      cz("sup", 1.6, 1.75, 0.3, 18, 0, 0, -0.02);
      cz("sup", 1.0, 1.15, 0.9, 14, 0, 0, 0.28);
      bx("sup", 1.8, 3.3, 0.8, -0.2, 0, 1.5);
      for (var q = -1; q <= 1; q += 2) {
        bx("sup", 5.4, 1.5, 1.7, 0.4, q * 0.88, 2.4);
        /* the cell doors, two by two, at the forward end */
        for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2)
          bx("dark", 0.06, 0.6, 0.66, 3.11, q * 0.88 + a * 0.36, 2.4 + b * 0.4);
        bx("dark", 5.2, 0.05, 0.04, 0.4, q * 0.88 + q * 0.76, 2.4);
      }
    });

    /* ------------------------------------------------- weather deck gear -- */
    /* lifelines along the deck edge, the forecastle included: she has no
       bulwark there (r03)                                                  */
    for (s = -1; s <= 1; s += 2) {
      var ep = [], ex = -84.6;
      while (ex < 83.0) {
        ep.push([ex, s * (hullHW(ex) - 0.15), deckZ(ex) + 0.08]);
        ex += (ex > -40 && ex < 30) ? 6.0 : 3.0;
      }
      ep.push([83.6, s * (hullHW(83.6) - 0.15), deckZ(83.6) + 0.08]);
      railRun("metal", ep, 1.0, 3.4);
    }
    railRun("metal", [[-85.3, -hullHW(-85.3) + 0.15, deckZ(-85.3) + 0.08],
                      [-85.3, hullHW(-85.3) - 0.15, deckZ(-85.3) + 0.08]], 1.0, 2.1);
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      bx("sup", 1.5, 0.6, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.2, 0.22, 0.6, 8, x - 0.45, y, z0);
      cz("metal", 0.2, 0.22, 0.6, 8, x + 0.45, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(79.0, s * 2.4); bitts(45.0, s * 6.9); bitts(-64.0, s * 6.6); bitts(-79.5, s * 5.6);
    }
    /* the VERTREP boxes painted on the forecastle and the fantail: a white
       outline with its diagonal (r06, r10, r11)                           */
    function vertrep(x0, x1, hw) {
      var z = topZ((x0 + x1) * 0.5, 0) + 0.04, L = x1 - x0, D = Math.sqrt(L * L + 4 * hw * hw);
      bx("rad", L, 0.22, 0.03, (x0 + x1) * 0.5, hw, z);
      bx("rad", L, 0.22, 0.03, (x0 + x1) * 0.5, -hw, z);
      bx("rad", 0.22, 2 * hw, 0.03, x0, 0, z);
      bx("rad", 0.22, 2 * hw, 0.03, x1, 0, z);
      bx("rad", D, 0.2, 0.03, (x0 + x1) * 0.5, 0, z, 0, 0, Math.atan2(2 * hw, L));
    }
    vertrep(58.5, 64.5, 2.3);
    vertrep(-83.6, -77.6, 2.6);
    /* ensign staff and jackstaff */
    bar("metal", -85.3, 0, deckZ(-85.3), -85.3, 0, deckZ(-85.3) + 4.4, 0.07);
    bar("metal", 84.6, 0, deckZ(84.6) + 0.04, 84.6, 0, deckZ(84.6) + 3.4, 0.06);
    /* team stripe lying on the forecastle ahead of the VERTREP box */
    flat("team", 66.4, -1.8, 69.6, 1.8, topZ(68.0, 0) + 0.05, 0, 0, 1, 1);

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    /* the middle of the pad's surface, for render3d's deckOf: her after
       eighth is the open fantail with the 5-inch on it, 3.4 m below the
       pad, so the pad is marked (hidden, no geometry)                     */
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(-47.6, 0, ZF); G.add(hp);
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e80_destroyer"] = {
  len: 171.7,
  build: function (THREE, M, C) { return HeroSpruanceDD.build(THREE, M, C); }
};
