/* ============================================================================
   us_iowa_bb.js -- HERO model: the Iowa-class battleship, in the four fits
   the roster draws her.

     nato_e50_battleship  USS Iowa (BB-61) in her Korea commission (1951-52):
                          ten twin 5-inch, the 40 mm quads in their tubs, the
                          aircraft crane on the fantail, a pole foremast over
                          the tower and the tripod mainmast abaft the after
                          stack
     nato_e60_battleship  USS New Jersey (BB-62) at her 1968 recommissioning:
                          every 40 mm and 20 mm mount gone, ECM on the masts,
                          the crane kept, a pole mast on the bow
     nato_e80_battleship  New Jersey after the 1982 reactivation: four 5-inch
                          mounts landed, eight armored box launchers, four
                          quad Harpoon canisters, four Phalanx, the lattice
                          foremast with the SPS-49, no crane and a painted
                          helicopter deck on the fantail
     nato_e90_battleship  USS Missouri (BB-63), Desert Storm: the 1980s fit
                          plus the SATCOM domes the 1991-92 photographs show

   References (Wikimedia Commons, fetched 2026-10-22):
     - "Iowa classe battleships drawing.jpg": a profile and plan of the class
       in its 1945 fit at one scale. The hull, the deck plan, the sheer, the
       turrets, the barbettes, the tower, both stacks, the directors and the
       ten 5-inch mounts were measured off it (4.59 px per metre).
     - ONI 54-B "Iowa class (BB)" (11/43): bow 36 ft, stern 22 ft, bridge
       65 ft, stack 98 ft, mast 134 ft, 887 ft overall.
     - "USS Iowa (BB-61) underway at sea c1952": the Korea fit, port side.
     - "USS New Jersey (BB-62) at sea off Vietnam in 1968": bow quarter; ECM
       yards on the foremast, the bow pole mast, the stern crane.
     - "USS New Jersey (BB-62) underway in 1983" (port broadside) and "An
       aerial port view of ... NEW JERSEY (BB-62)" (port bow, 1980s); "A
       port beam view of ... NEW JERSEY (BB 62)" (near-overhead, from the
       port quarter): teak forward and amidships, the fantail grey with the
       landing spot, no crane.
     - "An aerial starboard side view of ... MISSOURI (BB-63)" after the Gulf
       War, and "USS Wisconsin (BB-64) underway at sea, circa 1988-1991 (NH
       97206-KN)", bow on from above: the SATCOM domes beside the after stack.
     - "Missouri Modernized" (BB-63 in dry dock, 1985): the flare of the bow.
   Published figures: 270.4 m (887 ft 3 in) overall, 262 m on the waterline,
   32.97 m (108 ft 2 in) beam, 11 m draught; 16-inch guns 3.05 m apart.

   RECOGNITION (what must read at game zoom, and what fixed it):
     1. the long, fine hull: the deck plan narrows from full beam at the after
        stack to about 6 m nine metres from the stem (drawing plan), with
        flare forward (dry dock photo) and the sheer rising from 7 m
        amidships to 12.6 m at the stem (drawing profile, ONI bow 36 ft)
     2. the clipper stem, convex, 6.7 m of rake from the waterline to the
        deck (drawing profile) and the round cruiser stern
     3. three triple 16-inch turrets: two forward, No. 2 superfiring on a
        3.4 m barbette, No. 3 aft on a low one (drawing profile)
     4. the tower foremast with the main battery director on top, and the
        armoured conning tower ahead of the bridge (drawing, 1980s photos)
     5. two stacks with black caps, the forward one hard against the tower
        (drawing; every photograph)
     6. the 5-inch twin mounts in two staggered rows, five a side to 1969,
        three a side from 1982 (drawing plan; 1983 overhead)
     7. the era's masts: pole foremast and tripod mainmast (1952), ECM yards
        (1968), the black lattice foremast with SPS-49 (1980s)
     8. the eight armored box launchers and four Harpoon quads round the
        after stack, the four Phalanx (1980s photographs)
     9. the fantail: the crane (1952, 1968), the grey landing spot (1980s)
    10. the teak deck, in a long tan run from stem to stern

   NOT CONFIRMED, drawn from the nearest evidence:
     - the exact stations of the eight box launchers and four Harpoon quads:
       placed round the after stack from the 1983 overhead and broadside at
       their resolution (pairs between the stacks, pairs abaft them)
     - the 1952 40 mm tubs: stations from the 1945 drawing; the 1952 photo
       shows the tubs but not each one
     - the 1952 tripod mainmast and the 1968 ECM houses and mainmast: one
       photograph each, both soft
     - the Mk 12/22 aerials on the Mk 37s in 1952 (the Mk 25 dish from 1968)
     - the boats amidships, the small tripod on No. 2's roof (1983 photos
       only, so e80 only), and the SATCOM dome off the tower, seen only on
       Missouri's starboard side and drawn there alone
   Materials (9): hull, deckhouse, teak, painted fantail (1980s), white
   domes, black, bare metal, glass and the team material, exactly C.team.
   15,568 / 14,928 / 15,440 / 15,864 triangles (e50/e60/e80/e90), 10 or 12
   draw calls: every static part is merged into one mesh per material, and
   No. 1 turret carries its own three.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -11.
   render3d.js scales the model by its X extent, so nothing passes the stem
   or the stern: the forward barrels end 57 m short of the stem.
   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroIowaBB = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 270.4, XB = LOA * 0.5;
  var HB = 16.48;               /* half beam                                  */
  var DR = 11.0;                /* draught                                    */
  var ZTOP = 16.0, ZBOT = -2.0; /* the span the hull texture covers           */

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

  /* the weather deck by x, off the drawing's profile: level at about 7 m
     from the stern to No. 1 turret, then the long sheer up to the stem    */
  var DK = [[-135.2, 7.30], [-110.0, 7.10], [-60.0, 7.00], [0.0, 6.95],
            [40.0, 7.05], [55.0, 7.20], [65.0, 7.65], [80.0, 8.45],
            [97.0, 9.60], [112.0, 10.70], [124.0, 11.70], [135.2, 12.60]];
  function deckZ(x) { return tbl(DK, x); }

  /* the deck edge in plan, a fraction of the half beam by t (stern 0, stem
     1), measured off the drawing's plan view                              */
  var HW_K = [[0.000, 0.060], [0.003, 0.220], [0.0074, 0.310], [0.016, 0.400],
              [0.032, 0.459], [0.048, 0.548], [0.064, 0.618], [0.081, 0.688],
              [0.097, 0.745], [0.113, 0.790], [0.129, 0.840], [0.145, 0.873],
              [0.161, 0.904], [0.177, 0.924], [0.193, 0.949], [0.209, 0.962],
              [0.226, 0.968], [0.258, 0.980], [0.290, 0.987], [0.354, 1.000],
              [0.500, 1.000], [0.515, 0.985], [0.548, 0.975], [0.580, 0.955],
              [0.612, 0.917], [0.644, 0.873], [0.676, 0.815], [0.709, 0.739],
              [0.741, 0.650], [0.773, 0.548], [0.805, 0.459], [0.837, 0.395],
              [0.869, 0.338], [0.902, 0.293], [0.934, 0.242], [0.966, 0.191],
              [0.982, 0.166], [0.994, 0.120], [1.000, 0.060]];
  function hullHW(x) { return HB * tbl(HW_K, tOf(x)); }
  /* the keel: the counter clear of the water at the stern, flat for most of
     her length, rising into the forefoot                                   */
  var KZ = [[0.000, 2.4], [0.0074, 0.0], [0.030, -3.6], [0.070, -8.2],
            [0.120, -10.5], [0.160, -11.0], [0.850, -11.0], [0.930, -10.1],
            [0.970, -8.8], [1.000, -7.0]];
  function keelZ(t) { return tbl(KZ, t); }
  /* 0 = the full midship section, 1 = the fine flared V of the entry */
  var VB_K = [[0.00, 0.30], [0.03, 0.22], [0.10, 0.08], [0.20, 0.00], [0.55, 0.00],
              [0.64, 0.10], [0.72, 0.30], [0.80, 0.55], [0.88, 0.80], [0.94, 0.94],
              [1.00, 1.00]];
  var SEC_FULL = [[1.000, 1.000], [1.000, 0.750], [1.000, 0.500], [1.000, 0.300],
                  [0.995, 0.200], [0.980, 0.140], [0.955, 0.095], [0.910, 0.055],
                  [0.830, 0.025], [0.680, 0.008], [0.400, 0.001], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.930, 0.850], [0.840, 0.720], [0.740, 0.600],
                  [0.620, 0.480], [0.500, 0.370], [0.380, 0.270], [0.270, 0.180],
                  [0.170, 0.110], [0.090, 0.050], [0.030, 0.015], [0.000, 0.000]];
  /* the hull's own top is flat: the cambered deck ribbon lies over it */
  var CAMBER = [[0.600, 0.950], [0.000, 0.940], [-0.600, 0.950]];
  /* the convex clipper stem: how far aft each height of the last rings is
     set, by depth below the deck as a fraction, read off the profile      */
  var RAKE_K = [[0.000, 0.0], [0.950, 0.0], [0.975, 3.5], [0.988, 5.6], [1.000, 8.0]];
  var STEM_F = [[0.00, 0.00], [0.10, 0.13], [0.20, 0.24], [0.33, 0.55], [0.44, 0.77],
                [0.64, 0.84], [1.00, 1.00]];

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

  var XS = [-135.2, -134.6, -133.6, -132.0, -129.6, -126.0, -121.0, -114.0,
            -106.0, -97.0, -87.0, -76.0, -64.0, -50.0, -36.0, -20.0, -4.0,
            12.0, 26.0, 38.0, 50.0, 62.0, 74.0, 86.0, 97.0, 107.0, 115.0,
            121.5, 126.5, 130.5, 133.4, 135.2];

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
     Painted once per page. The greys are the US haze grey of the photographs
     taken to about 0.9 of the sampled level, because the renderer's tone
     mapping lifts mid greys: the hull 0x6b737a, the deckhouses 0x757d84,
     beside the accepted flat-tops at 0x737a81.                             */
  var _tx = null;
  function textures(THREE) {
    if (_tx) return _tx;
    _tx = { hull: hullTex(THREE), sup: supTex(THREE), teak: teakTex(THREE),
            pad: padTex(THREE) };
    return _tx;
  }

  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(61043), i, j, x, z;
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    g.fillStyle = "#6b737a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 110; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 6 + R() * 18);
    }
    g.globalAlpha = 1;
    /* anti-fouling red below, the black boot topping over the waterline */
    g.fillStyle = "#4d2b25"; g.fillRect(0, Y(-0.55), W, H - Y(-0.55));
    g.fillStyle = "#16191c"; g.fillRect(0, Y(0.95), W, Y(-0.55) - Y(0.95));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.95) - 1, W, 1.5);
    /* plating strakes, level in real height */
    g.lineWidth = 1.2;
    var STR = [2.2, 4.0, 5.8, 7.6, 9.4, 11.2];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.26)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(0, Y(STR[i]) + 1.4); g.lineTo(W, Y(STR[i]) + 1.4); g.stroke();
    }
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.11)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 34; j++) {
        x = ((j + st) / 34) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }
    /* a row of scuttles along the side under the deck edge amidships */
    g.fillStyle = "#1c2125";
    for (i = 0; i < 70; i++) {
      x = -95 + i * 2.9;
      if (x > 92) break;
      if (R() < 0.35) continue;
      z = deckZ(x) - 1.7;
      g.globalAlpha = 0.55; g.fillRect(U(x) - 1.5, Y(z) - 1.5, 3, 3);
      if (R() < 0.3) { g.globalAlpha = 0.06; g.fillStyle = "#6d4526";
        g.fillRect(U(x) - 1, Y(z) + 2, 2, 10 + R() * 18); g.fillStyle = "#1c2125"; }
    }
    g.globalAlpha = 1;
    /* hawse rust under the anchors and soot along the waist */
    g.globalAlpha = 0.13; g.fillStyle = "#6d4526";
    g.fillRect(U(117.0) - 5, Y(deckZ(117) - 3.8), 10, 3.6 * (H / (ZTOP - ZBOT)));
    for (i = 0; i < 120; i++) {
      x = -40 + R() * 36; z = deckZ(x) - 0.4 - R() * 2.6;
      g.globalAlpha = 0.03; g.fillStyle = "#2a2d30";
      g.fillRect(U(x), Y(z), 8 + R() * 30, 3 + R() * 9);
    }
    /* draught marks fore and aft */
    g.globalAlpha = 1; g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 126.0 : -128.0;
      for (j = 0; j <= 12; j++) g.fillRect(U(x) - 6, Y(-0.4 + j * 0.62), j % 2 ? 6 : 11, 2);
    }
    /* the shadow line under the deck edge */
    g.globalAlpha = 0.26; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = -XB + (i / W) * LOA;
      g.fillRect(i, Y(deckZ(x)) - 1, 4, 5);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, false);
  }

  /* deckhouse plating: 4 m of steel per tile */
  function supTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(30311), i;
    g.fillStyle = "#757d84"; g.fillRect(0, 0, W, H);
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
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillRect(R() * W, R() * H, 2 + R() * 3, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* the teak deck: planks run fore and aft (u is x in metres / 8), butts
     staggered, the seams paid with dark pitch                              */
  function teakTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(8807), i, j;
    g.fillStyle = "#8c7558"; g.fillRect(0, 0, W, H);
    var PW = H / (8 / 0.15);                     /* a 15 cm plank, in pixels */
    for (j = 0; j * PW < H; j++) {
      var off = R() * W;
      for (i = -1; i < 4; i++) {
        var x0 = off + i * W / 3.2, L = W / 3.2;
        g.globalAlpha = 0.10 + R() * 0.12;
        g.fillStyle = R() < 0.5 ? "#a58b69" : "#6f5b44";
        g.fillRect(((x0 % W) + W) % W, j * PW, L, PW);
        g.fillRect(((x0 % W) + W) % W - W, j * PW, L, PW);
      }
    }
    g.globalAlpha = 0.42; g.fillStyle = "#3a2e22";
    for (j = 0; j * PW < H; j++) g.fillRect(0, Math.round(j * PW), W, 1);
    for (j = 0; j * PW < H; j++) {
      for (i = 0; i < 3; i++) {
        var bx = ((j * 0.37 + i / 3) % 1) * W;
        g.fillRect(bx, j * PW, 1, PW);
      }
    }
    for (i = 0; i < 20; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#c9b392" : "#3f3326";
      g.fillRect(R() * W, R() * H, 30 + R() * 120, 20 + R() * 60);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* the fantail of the 1980s: painted grey, the landing spot in white (a box
     with the circle, the diagonal and the line-up lines) and the red foul
     line, as the near-overhead 1983 photograph shows. u runs x from -128 to
     -74, v the breadth from -16.5 to +16.5                                 */
  var PAD0 = -128.0, PAD1 = -73.0, PADW = 16.5;
  function padTex(THREE) {
    var W = 1024, H = 640, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(4421), i;
    function U(x) { return (x - PAD0) / (PAD1 - PAD0) * W; }
    function V(y) { return H - (y + PADW) / (2 * PADW) * H; }
    g.fillStyle = "#454a4f"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#2f3337" : "#575d62";
      g.fillRect(R() * W, R() * H, 40 + R() * 160, 26 + R() * 90);
    }
    g.globalAlpha = 0.28; g.fillStyle = "#000000";
    for (i = 0; i < 3000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.strokeStyle = "#d9dcd6"; g.lineWidth = 5;
    g.strokeRect(U(-127.0), V(10.4), U(-104.0) - U(-127.0), V(-10.4) - V(10.4));
    g.beginPath(); g.arc(U(-115.5), V(0), (U(-111.5) - U(-115.5)), 0, 2 * PI); g.stroke();
    g.beginPath(); g.moveTo(U(-124.0), V(-8.6)); g.lineTo(U(-107.0), V(8.6)); g.stroke();
    g.lineWidth = 4;
    g.setLineDash([14, 12]);
    g.beginPath(); g.moveTo(U(-127.0), V(5.2)); g.lineTo(U(-104.0), V(5.2)); g.stroke();
    g.beginPath(); g.moveTo(U(-127.0), V(-5.2)); g.lineTo(U(-104.0), V(-5.2)); g.stroke();
    g.beginPath(); g.moveTo(U(-100.0), V(0)); g.lineTo(U(-80.0), V(0)); g.stroke();
    g.setLineDash([]);
    g.strokeStyle = "#a8463c"; g.lineWidth = 4;
    g.beginPath(); g.moveTo(U(-95.0), V(-14.5)); g.lineTo(U(-92.0), V(14.5)); g.stroke();
    g.beginPath(); g.moveTo(U(-82.0), V(-13.0)); g.lineTo(U(-80.0), V(-4.0)); g.stroke();
    return tex(THREE, cv, false);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var T = textures(THREE), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    M.teak  = S({ map: T.teak, roughness: 0.93, metalness: 0.02,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.pad   = S({ map: T.pad, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.rad   = S({ color: 0xc9ccc6, roughness: 0.90, metalness: 0.03 });
    M.dark  = S({ color: 0x24282c, roughness: 0.90, metalness: 0.05 });
    M.metal = S({ color: 0x7d848a, roughness: 0.55, metalness: 0.45 });
    M.team  = S({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
    M.glass = S({ color: 0x2b3a44, roughness: 0.12, metalness: 0.25,
                  transparent: true, opacity: 0.86 });
    return M;
  }

  /* ================================================================ batching */
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
  function mv(poly, dx, dy) {
    return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; });
  }
  /* a symmetric plan outline from [x, half width] pairs, stern to bow,
     returned counter-clockwise                                           */
  function sym(pts) {
    var out = [], i;
    for (i = 0; i < pts.length; i++) out.push([pts[i][0], -pts[i][1]]);
    for (i = pts.length - 1; i >= 0; i--) out.push([pts[i][0], pts[i][1]]);
    return out;
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
        var dd = Math.max(0, Math.min(1, 1 - r[j][1]));
        pos.push(x0 - rk * tbl(STEM_F, dd), w * r[j][0], z);
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
    cap(0, true); cap(XS.length - 1, false);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* the weather deck between x0 and x1: a cambered ribbon on the hull top.
     uvMode "m" maps metres for the teak's repeat, "pad" the fantail canvas */
  function deckRibbon(THREE, mtl, x0, x1, uvMode) {
    var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
    var XR = [], i, j, R = KY.length;
    for (i = 0; i < XS.length; i++) if (XS[i] > x0 && XS[i] < x1) XR.push(XS[i]);
    XR.unshift(x0); XR.push(x1);
    var pos = [], uv = [], idx = [];
    for (i = 0; i < XR.length; i++) {
      var x = XR[i], t = tOf(x), r = ringOf(tbl(VB_K, t)), w = hullHW(x);
      var kz = keelZ(t), dz = deckZ(x), dep = dz - kz;
      for (j = 0; j < R; j++) {
        var ky = KY[j], ak = Math.abs(ky);
        var kd = ak > 0.99 ? r[0][1] : 1.0 + 0.010 * (1 - ak * ak);
        /* the outermost row comes down onto the hull's edge: no gap to see
           the ribbon's underside through                                  */
        pos.push(x, w * ky, kz + dep * kd + (ak > 0.99 ? 0.02 : 0.10));
        if (uvMode === "pad") uv.push((x - PAD0) / (PAD1 - PAD0), (w * ky + PADW) / (2 * PADW));
        else uv.push(x / 8.0, ky * w / 8.0);
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
    var M = makeMats(THREE, team);
    var G = new THREE.Group();
    var KEYS = ["sup", "rad", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, j, s;
    var E80 = V.era >= 80;

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
    /* a faceted block: plan polygon extruded z0..z1, the top inset by `ins` */
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
      var prev = Batch.xf;
      Batch.xf = { x: x, y: y, z: z, c: Math.cos(yaw), s: Math.sin(yaw) };
      fn();
      Batch.xf = prev;
    }
    function railRun(k, pts, h, step) {
      var q, jj;
      for (q = 0; q < pts.length - 1; q++) {
        var a = pts[q], b = pts[q + 1];
        bar(k, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.04);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var n = Math.max(1, Math.round(L / Math.max(step, 3.2)));
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
        railRun("metal", [[a[0], a[1], z], [b[0], b[1], z]], 1.0, step || 2.2);
      }
    }
    function topZ(x, y) {
      var t = tOf(x), dz = deckZ(x), dep = dz - keelZ(t);
      var ak = Math.min(1, Math.abs(y) / hullHW(x));
      return dz + dep * 0.010 * (1 - ak * ak) + 0.10;
    }
    /* a four-legged tapered lattice with X bracing on every face */
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

    /* ------------------------------------------------------------ hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    if (V.pad) {
      var d1 = deckRibbon(THREE, M.teak, -134.6, PAD0, "m"); d1.name = "deck"; G.add(d1);
      var d2 = deckRibbon(THREE, M.pad, PAD0, PAD1, "pad"); d2.name = "deck_pad"; G.add(d2);
      var d3 = deckRibbon(THREE, M.teak, PAD1, 134.9, "m"); d3.name = "deck_fwd"; G.add(d3);
    } else {
      var dk = deckRibbon(THREE, M.teak, -134.6, 134.9, "m"); dk.name = "deck"; G.add(dk);
    }
    /* bilge keels and the four shafts' skegs, to hold the underwater body
       together for the moment the camera dips under the surface         */
    for (s = -1; s <= 1; s += 2) {
      bx("dark", 60.0, 0.2, 0.9, -10.0, s * 15.6, -9.2, s * 0.8, 0, 0);
    }
    /* the bulb in the forefoot */
    var bulb = new THREE.SphereGeometry(1, 14, 8);
    bulb.scale(7.0, 2.2, 2.8);
    cur.dark.add(place(THREE, bulb, 124.0, 0, -7.6));

    /* anchors in their hawses on both bows, the shank up the pipe */
    for (s = -1; s <= 1; s += 2) {
      var AX = 117.0, AZ = deckZ(AX) - 2.6, ay0 = hullY(AX, AZ);
      var slope = (hullY(AX + 1.0, AZ) - hullY(AX - 1.0, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.04), AZ, -slope, s);
      plate("dark", FA, rectPts(-1.1, -2.3, 1.1, 0.75), 0, 0.06);
      plate("metal", FA, rectPts(-0.18, -1.8, 0.18, 0.45), 0.06, 0.45);
      plate("metal", FA, rectPts(-0.55, -2.15, 0.55, -1.75), 0.06, 0.5);
      plate("metal", FA, [[-0.55, -2.15], [-0.55, -1.75], [-1.15, -1.35]], 0.06, 0.42);
      plate("metal", FA, [[0.55, -2.15], [1.15, -1.35], [0.55, -1.75]], 0.06, 0.42);
      /* deck end of the hawse, the cable aft to its wildcat */
      var hx = 117.6, hy = s * 2.9, wx = 106.5, wy = s * 1.6;
      cz("dark", 0.55, 0.55, 0.08, 10, hx, hy, topZ(hx, hy) - 0.03);
      bx("dark", Math.sqrt((hx - wx) * (hx - wx) + (hy - wy) * (hy - wy)), 0.42, 0.14,
         (hx + wx) * 0.5, (hy + wy) * 0.5, topZ((hx + wx) * 0.5, 2) + 0.04, 0, 0, Math.atan2(hy - wy, hx - wx));
      cz("metal", 0.75, 0.82, 0.8, 12, wx, wy, topZ(wx, wy) - 0.02);
      bx("sup", 1.8, 1.1, 0.7, wx - 1.4, wy, topZ(wx, wy) + 0.32);
      /* the chain on to its pipe */
      bx("dark", 4.0, 0.42, 0.14, wx - 3.2, wy, topZ(wx - 3.2, wy) + 0.04);
      cz("dark", 0.5, 0.5, 0.06, 10, wx - 5.4, wy, topZ(wx - 5.4, wy) - 0.02);
    }
    /* the capstans and the bullnose fairlead at the stem */
    for (s = -1; s <= 1; s += 2) cz("metal", 0.5, 0.6, 0.9, 10, 101.0, s * 2.6, topZ(101, 2.6) - 0.02);
    cz("sup", 1.0, 1.0, 0.9, 12, 134.2, 0, deckZ(134.2) - 0.2);

    /* the stem bulwark and its platform, and the deck-edge rails */
    for (s = -1; s <= 1; s += 2) {
      var bp = [], xx;
      for (xx = 126.0; xx <= 134.6; xx += 2.15) bp.push([xx, s * (hullHW(xx) - 0.1)]);
      for (i = 0; i < bp.length - 1; i++) {
        var za = deckZ(bp[i][0]), zb = deckZ(bp[i + 1][0]);
        var Lb = Math.sqrt((bp[i + 1][0] - bp[i][0]) * (bp[i + 1][0] - bp[i][0]) + (bp[i + 1][1] - bp[i][1]) * (bp[i + 1][1] - bp[i][1]));
        bx("sup", Lb, 0.18, 1.0, (bp[i][0] + bp[i + 1][0]) * 0.5, (bp[i][1] + bp[i + 1][1]) * 0.5,
           (za + zb) * 0.5 + 0.55, 0, 0, Math.atan2(bp[i + 1][1] - bp[i][1], bp[i + 1][0] - bp[i][0]));
      }
      /* lifelines along the deck edge, stern to the bulwark. None on the
         fantail's after eighth: render3d.js reads the deck height there   */
      var ep = [], ex = -100.0;
      while (ex < 126.0) {
        ep.push([ex, s * (hullHW(ex) - 0.15), deckZ(ex) + 0.06]);
        ex += (ex > -50 && ex < 30) ? 9.0 : 6.0;
      }
      ep.push([126.0, s * (hullHW(126.0) - 0.15), deckZ(126.0) + 0.06]);
      railRun("metal", ep, 1.0, 6.0);
    }

    /* ========================================================= turrets ===== */
    /* The Mk 7 gunhouse: 15.4 m long, 3.4 m high, the face sloped back, the
       rangefinder hoods out of the after corners; the guns 3.05 m apart and
       their muzzles 21 m before the turret's centre. Built about its own
       centre on the base ring, guns along +X.                              */
    function turret16() {
      loftX("sup", [[-7.40, 5.85, 0.0, 3.05], [-7.15, 6.30, 0.0, 3.40], [-2.0, 6.25, 0.0, 3.40],
                    [5.60, 5.85, 0.0, 3.40], [6.85, 5.70, 0.0, 1.95], [8.00, 5.55, 0.0, 0.35]], 16, 0.10);
      /* the roof's sighting hoods, the rangefinder ears and the roof hatches */
      for (var q = -1; q <= 1; q++) bx("sup", 1.5, 1.0, 0.55, 3.6, q * 3.05, 3.55);
      for (var e = -1; e <= 1; e += 2) {
        bx("sup", 2.8, 0.9, 1.1, -5.1, e * 6.55, 2.55);
        cx("dark", 0.36, 0.36, 0.12, 8, -3.72, e * 6.7, 2.55);
        bx("dark", 1.1, 0.8, 0.06, -3.0, e * 2.2, 3.43);
      }
      bx("dark", 0.08, 7.0, 0.45, -7.42, 0, 1.0);
      /* the three guns in their bloomers */
      for (q = -1; q <= 1; q++) {
        var gy = q * 3.05;
        cx("dark", 0.95, 0.72, 0.9, 10, 6.0, gy, 1.75);
        cx("sup", 0.64, 0.42, 14.2, 10, 6.8, gy, 1.75);
        cx("dark", 0.43, 0.43, 0.06, 8, 20.95, gy, 1.75);
      }
    }
    var X_T1 = 57.0, X_T2 = 36.4, X_T3 = -65.3;
    var Z_T1 = 7.55, Z_T2 = 10.6, Z_T3 = 7.85;
    /* No. 1 trains: it is the node the renderer aims */
    var tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_T1, 0, Z_T1);
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; turret16(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    stamp(X_T2, 0, Z_T2, 0, turret16);
    stamp(X_T3, 0, Z_T3, PI, turret16);
    /* the barbettes: No. 1 shows a low ring, No. 2 stands 3.4 m clear of the
       deck for the superfiring guns, No. 3 a little over a metre (profile) */
    cz("sup", 6.3, 6.3, Z_T1 - 6.9, 32, X_T1, 0, 6.9);
    cz("sup", 6.3, 6.3, Z_T2 - 6.6, 32, X_T2, 0, 6.6);
    cz("sup", 6.3, 6.3, Z_T3 - 6.6, 32, X_T3, 0, 6.6);
    for (s = -1; s <= 1; s += 2) {
      /* the ladders up No. 2's barbette */
      bx("metal", 0.08, 0.7, 3.2, X_T2 + 1.5, s * 6.35, 8.9);
    }

    /* ==================================================== superstructure == */
    /* Levels: main deck about 7.0, 01 to 9.9, 02 to 12.5, 03 to 15.0, the
       bridge 04 to 17.6 and the pilot house to 20.4 ("bridge 65 ft").      */
    var Z1 = 9.9, Z2 = 12.5, Z3 = 15.0, Z4 = 17.6, Z5 = 20.4;
    /* the 01 level: pointed at both ends, full width amidships where the
       outer 5-inch mounts stand on its edge (drawing plan)                */
    var P1 = sym([[-56.6, 1.2], [-40.0, 12.8], [-30.0, 13.2], [11.0, 13.2], [22.0, 8.6], [29.0, 4.6]]);
    prism("sup", P1, 6.6, Z1, 0.15, 4.0);
    var P2 = sym([[-51.0, 2.4], [-38.0, 10.3], [-14.0, 10.6], [12.0, 10.6], [22.0, 6.4], [27.0, 3.6]]);
    prism("sup", P2, Z1, Z2, 0.18, 4.0);
    railRoof(roofOf(P1, 0.15, 0.1), Z1, null, 2.4);
    /* the 03 level: forward block round the tower, the after block round the
       after stack and the after director                                 */
    var P3F = sym([[-12.0, 7.6], [20.0, 7.6], [27.0, 4.2]]);
    prism("sup", P3F, Z2, Z3, 0.2, 4.0);
    var P3A = sym([[-49.0, 3.4], [-44.0, 6.4], [-22.0, 6.4], [-18.0, 5.0]]);
    prism("sup", P3A, Z2, Z3, 0.2, 4.0);
    /* the bridge: 04 level and the pilot house ahead of the tower */
    var P4 = sym([[9.5, 7.0], [22.5, 7.0], [26.0, 4.4]]);
    prism("sup", P4, Z3, Z4, 0.15, 4.0);
    var P5 = sym([[10.0, 6.0], [21.5, 6.0], [24.6, 3.8]]);
    prism("sup", P5, Z4, Z5, 0.15, 4.0);
    railRoof(roofOf(P5, 0.15, 0.1), Z5, null, 1.8);
    /* the pilot house windows, front and sides */
    function winRow(F, ss) {
      ss.forEach(function (sv) { plate("glass", F, rectPts(sv - 0.42, -0.45, sv + 0.42, 0.45), -0.02, 0.05); });
    }
    winRow(face(P5, 2, Z4, Z5, 0.15, 0.5, 19.2), [-1.6, -0.5, 0.5, 1.6]);
    winRow(face(P5, 1, Z4, Z5, 0.15, 0.5, 19.2), [-2.4, -1.3, -0.2, 0.9, 2.0]);
    winRow(face(P5, 3, Z4, Z5, 0.15, 0.5, 19.2), [-2.4, -1.3, -0.2, 0.9, 2.0]);
    winRow(face(P5, 0, Z4, Z5, 0.15, 0.75, 19.2), [-1.6, -0.5, 0.6, 1.7]);
    winRow(face(P5, 4, Z4, Z5, 0.15, 0.25, 19.2), [-1.7, -0.6, 0.5, 1.6]);
    /* the bridge wings */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 3.2, 2.0, 0.25, 18.0, s * 6.9, Z4 + 0.1);
      railRun("metal", [[16.4, s * 7.85, Z4 + 0.22], [19.6, s * 7.85, Z4 + 0.22]], 1.0, 1.6);
    }
    /* the armoured conning tower ahead of the bridge, its vision slits
       under the roof                                                      */
    var CT = rounded(3.6, 3.2, 0.62, 18, 24.6);
    prism("sup", CT, Z1, Z4, 0.0, 3.0);
    for (i = 0; i < CT.length; i++) {
      var ca = CT[i], cb = CT[(i + 1) % CT.length];
      if ((ca[0] + cb[0]) * 0.5 < 25.6) continue;
      var nxv = (cb[1] - ca[1]), nyv = -(cb[0] - ca[0]), nl = Math.sqrt(nxv * nxv + nyv * nyv);
      var mx = (ca[0] + cb[0]) * 0.5, my = (ca[1] + cb[1]) * 0.5;
      plate("dark", frameN(mx, my, 16.6, nxv / nl, nyv / nl), rectPts(-0.4, -0.12, 0.4, 0.12), -0.02, 0.04);
    }

    /* the tower foremast: a rounded tower from the 03 level to 29.5 m, its
       galleries, the platform on top and the Mk 38 main battery director  */
    /* the lower tower is eleven metres fore and aft (drawing profile), the
       upper tower narrower, the galleries round both                      */
    var TWR = rounded(5.2, 4.3, 0.5, 18, 5.2);
    prism("sup", TWR, Z3, 26.5, 0.3, 4.0);
    prism("sup", rounded(5.7, 4.8, 0.5, 18, 5.2), 22.35, 22.6, 0, 4.0);
    railRoof(rounded(5.6, 4.7, 0.5, 10, 5.2), 22.6, null, 2.4);
    /* the open bridge: a deck at the pilot house roof wrapping the tower */
    prism("sup", rounded(6.6, 5.6, 0.45, 18, 6.6), Z5 - 0.3, Z5, 0, 4.0);
    railRoof(rounded(6.5, 5.5, 0.45, 12, 6.6), Z5, null, 2.4);
    prism("sup", rounded(5.4, 4.6, 0.5, 18, 5.4), 24.55, 24.8, 0, 4.0);
    var TU = rounded(4.2, 3.5, 0.5, 16, 5.6);
    prism("sup", TU, 26.5, 31.0, 0.2, 4.0);
    prism("sup", rounded(4.9, 4.1, 0.5, 16, 5.6), 28.75, 29.0, 0, 4.0);
    railRoof(rounded(4.8, 4.0, 0.5, 10, 5.6), 29.0, null, 2.4);
    var TT = rounded(4.4, 3.6, 0.5, 14, 5.8);
    prism("sup", TT, 31.0, 33.4, 0.15, 4.0);
    railRoof(roofOf(TT, 0.15, 0.08), 33.4, null, 2.4);
    function mk38(x, z, yaw) {
      stamp(x, 0, z, yaw, function () {
        cz("sup", 1.5, 1.7, 0.6, 14, 0, 0, 0);
        loftX("sup", [[-2.3, 1.3, 0.6, 2.4], [-2.0, 1.65, 0.6, 2.8], [1.5, 1.65, 0.6, 2.8],
                      [2.3, 1.4, 0.6, 2.2]], 12, 0.3);
        cx("sup", 0.36, 0.36, 1.2, 10, -1.3, 0, 1.8);
        bar("sup", -0.4, -5.3, 1.75, -0.4, 5.3, 1.75, 0.34);
        for (var e = -1; e <= 1; e += 2) bx("sup", 0.8, 0.5, 0.9, -0.4, e * 5.3, 1.75);
        /* the Mk 13 "orange peel" on top */
        bx("metal", 0.25, 0.25, 0.7, 0.4, 0, 3.1);
        var g = new THREE.CylinderGeometry(2.1, 2.1, 1.0, 14, 1, true, -0.55, 1.1);
        g.translate(-1.6, 0, 3.75);
        cur.dark.add(g);
      });
    }
    mk38(6.0, 33.4, 0);

    /* the Mk 37 secondary battery directors, forward on the pilot house
       roof and aft on the after superstructure                             */
    function mk37(x, z, yaw) {
      stamp(x, 0, z, yaw, function () {
        cz("sup", 1.1, 1.3, 1.2, 12, 0, 0, 0);
        loftX("sup", [[-2.3, 1.55, 1.2, 3.3], [-2.0, 1.85, 1.2, 3.5], [1.6, 1.85, 1.2, 3.5],
                      [2.4, 1.6, 1.2, 2.6]], 12, 0.25);
        bar("sup", -0.6, -2.5, 2.9, -0.6, 2.5, 2.9, 0.22);
        if (V.mk25) {
          /* the Mk 25's round dish on its yoke */
          bx("metal", 0.3, 0.3, 0.9, 0.2, 0, 3.9);
          var g = new THREE.CylinderGeometry(1.15, 0.55, 0.45, 16, 1, false);
          g.rotateZ(-PI / 2); g.translate(0.6, 0, 4.9);
          cur.dark.add(g);
        } else {
          /* the Mk 12 grid and the Mk 22 orange peel beside it */
          bx("metal", 0.3, 0.3, 0.6, 0.2, 0, 3.8);
          bx("dark", 0.25, 2.6, 1.5, 0.4, 0, 4.7);
          bx("dark", 0.25, 0.7, 1.9, 0.4, 1.7, 4.8);
        }
      });
    }
    mk37(16.4, Z5, 0);
    /* the after superstructure: the after Mk 38 on its round tower, and the
       after Mk 37 lower down at the end of the 02 level                   */
    prism("sup", rounded(2.6, 2.6, 0.7, 16, -45.6), Z3, 22.4, 0.15, 3.0);
    railRoof(rounded(2.9, 2.9, 0.7, 10, -45.6), 22.4, null, 1.8);
    prism("sup", rounded(2.9, 2.9, 0.7, 16, -45.6), 22.2, 22.4, 0, 3.0);
    mk38(-45.6, 22.4, PI);
    mk37(-51.2, Z2, PI);

    /* --------------------------------------------------------- the stacks -- */
    /* elliptical casings with their black caps; the forward one stands hard
       against the tower, the after one higher off the 03 level (drawing)   */
    /* a band of a rounded outline whose bottom and top both rise toward
       the bow by `sl` per metre: the raked cap of an Iowa stack          */
    function rakeBand(k, poly, xc, z0, z1, sl, cap) {
      var n = poly.length, q, B = cur[k];
      for (q = 0; q < n; q++) {
        var a = poly[q], b = poly[(q + 1) % n];
        var za0 = z0 + sl * (a[0] - xc), zb0 = z0 + sl * (b[0] - xc);
        var za1 = z1 + sl * (a[0] - xc), zb1 = z1 + sl * (b[0] - xc);
        B.tri([a[0], a[1], za0, q / n, 0], [b[0], b[1], zb0, (q + 1) / n, 0], [b[0], b[1], zb1, (q + 1) / n, 1]);
        B.tri([a[0], a[1], za0, q / n, 0], [b[0], b[1], zb1, (q + 1) / n, 1], [a[0], a[1], za1, q / n, 1]);
        if (cap) B.tri([xc, 0, z1, 0.5, 0.5], [a[0], a[1], za1, 0, 0], [b[0], b[1], zb1, 1, 0]);
      }
    }
    function stack(x, a, b, z0, z1) {
      var zc = z1 - 2.2, SL = 0.16;
      rakeBand("sup", rounded(a, b, 0.75, 20, x), x, z0 - 4.0 * SL * 0 , zc, SL, false);
      rakeBand("dark", rounded(a + 0.06, b + 0.06, 0.75, 20, x), x, zc, z1, SL, false);
      rakeBand("dark", rounded(a - 0.6, b - 0.6, 0.75, 16, x), x, z1 - 0.6, z1 - 0.1, SL, true);
      rakeBand("dark", rounded(a + 0.06, b + 0.06, 0.75, 20, x), x, z1, z1 + 0.02, SL, false);
      /* the lip between the casing and the opening */
      var lip = rounded(a + 0.06, b + 0.06, 0.75, 20, x), inn = rounded(a - 0.6, b - 0.6, 0.75, 20, x), q;
      for (q = 0; q < 20; q++) {
        var p0 = lip[q], p1 = lip[(q + 1) % 20], i0 = inn[q], i1 = inn[(q + 1) % 20];
        cur.dark.tri([p0[0], p0[1], z1 + SL * (p0[0] - x), 0, 0], [p1[0], p1[1], z1 + SL * (p1[0] - x), 1, 0],
                     [i1[0], i1[1], z1 - 0.1 + SL * (i1[0] - x), 1, 1]);
        cur.dark.tri([p0[0], p0[1], z1 + SL * (p0[0] - x), 0, 0], [i1[0], i1[1], z1 - 0.1 + SL * (i1[0] - x), 1, 1],
                     [i0[0], i0[1], z1 - 0.1 + SL * (i0[0] - x), 0, 1]);
      }
    }
    stack(-4.3, 4.25, 3.9, Z3, 29.4);
    stack(-31.2, 4.5, 4.0, Z3, 28.6);
    /* the trunk below the after stack, and the house between the stacks */
    prism("sup", sym([[-36.0, 4.0], [-26.0, 4.0]]), Z3, 18.6, 0.1, 4.0);
    prism("sup", sym([[-22.0, 4.8], [-9.0, 4.8]]), Z3, 17.4, 0.12, 4.0);
    railRoof(roofOf(sym([[-22.0, 4.8], [-9.0, 4.8]]), 0.12, 0.1), 17.4, null, 2.0);

    /* --------------------------------------------- the 5-inch twin mounts -- */
    function gun5() {
      loftX("sup", [[-2.70, 1.55, 0.0, 2.45], [-2.35, 2.15, 0.0, 2.85], [1.40, 2.25, 0.0, 2.85],
                    [2.35, 2.05, 0.0, 1.70], [2.75, 1.85, 0.0, 0.65]], 10, 0.30);
      for (var q = -1; q <= 1; q += 2) {
        cx("dark", 0.36, 0.26, 0.5, 6, 1.85, q * 0.72, 1.35);
        bar("sup", 2.2, q * 0.72, 1.35, 6.6, q * 0.72, 1.35, 0.15);
      }
      bx("sup", 1.4, 1.6, 0.14, -1.0, 0, 2.9);
    }
    /* positions and the way the drawing trains each one: outer mounts on
       the 01 edge, inner ones on the 02 level, staggered                 */
    var FIVE = [[1, 8.9, 10.1, Z2, 0.25], [2, -0.6, 13.6, Z1, 0.35], [3, -11.5, 10.1, Z2, PI - 0.35],
                [4, -25.0, 13.6, Z1, 0.30], [5, -34.4, 9.7, Z2, PI - 0.25]];
    FIVE.forEach(function (m) {
      if (V.five.indexOf(m[0]) < 0) return;
      for (var sd = -1; sd <= 1; sd += 2) {
        cz("sup", 2.35, 2.45, 0.5, 12, m[1], sd * m[2], m[3] - 0.2);
        stamp(m[1], sd * m[2], m[3] + 0.3, sd * m[4], gun5);
      }
    });

    /* ------------------------------------------------- boats amidships ---- */
    function boat(xc, yc, zk) {
      stamp(xc, yc, zk, 0, function () {
        var L = 4.4, B = 1.35;
        loftX("rad", [[-L, B * 0.82, 0.32, 1.12], [-L + 0.5, B * 0.96, 0.06, 1.15],
                      [-L * 0.3, B, 0.0, 1.15], [L * 0.35, B * 0.93, 0.06, 1.18],
                      [L * 0.72, B * 0.62, 0.25, 1.22], [L * 0.94, B * 0.22, 0.6, 1.25],
                      [L, 0.01, 0.9, 1.25]], 10, 0.55);
        bx("sup", 3.0, 1.9, 0.8, -1.0, 0, 1.55);
        bx("dark", 0.5, 2.0, 0.4, -2.6, 0, -0.05);
        bx("dark", 0.5, 2.0, 0.4, 2.0, 0, -0.05);
      });
    }
    for (s = -1; s <= 1; s += 2) {
      boat(-17.6, s * 11.6, Z1 + 0.25);
      if (!E80) boat(-17.6, s * 8.4, Z2 + 0.25);
    }

    /* ---------------------------------------------- era: 40 mm quads (1952) */
    function quad40(x, y, z) {
      var g = new THREE.CylinderGeometry(2.0, 2.0, 1.1, 12, 1, true);
      g.rotateX(PI / 2); cur.sup.add(place(THREE, g, x, y, z + 0.55));
      stamp(x, y, z + 0.2, y >= 0 ? 0.6 : -0.6, function () {
        bx("sup", 1.6, 1.9, 0.9, -0.2, 0, 0.9);
        for (var q = 0; q < 4; q++) bar("metal", 0.4, -0.75 + q * 0.5, 1.15, 3.0, -0.75 + q * 0.5, 1.15, 0.07);
      });
    }
    if (V.aa40) {
      [[84.0, 4.6, topZ(84, 4.6) - 0.05], [9.2, 5.7, Z3], [-45.0, 4.6, Z3 + 0.3],
       [-38.0, 7.4, Z2], [-16.6, 12.0, Z1], [-51.5, 14.4, topZ(-51.5, 14.4) - 0.05],
       [-131.0, 3.4, topZ(-131.0, 3.4) - 0.05]].forEach(function (q) {
        quad40(q[0], q[1], q[2]); quad40(q[0], -q[1], q[2]);
      });
      /* the quads that rode the roofs of No. 2 and No. 3 */
      quad40(X_T2 - 3.0, 0, Z_T2 + 3.4);
      quad40(X_T3 + 3.0, 0, Z_T3 + 3.4);
    }

    /* ---------------------------------------- era: the 1980s weapon fit ---- */
    if (E80) {
      /* the Mk 143 armored box launchers, four a side round the after stack:
         a pair on the 02 level between the stacks and a pair on the 01 level
         abaft the after stack, where Nos. 4 and 5 stood                     */
      var ablZ = function (x, y, z, yaw) {
        stamp(x, y, z, yaw, function () {
          bx("sup", 6.4, 1.9, 2.0, 0, 0, 1.0);
          bx("dark", 6.5, 0.14, 0.14, 0, 0.0, 2.04);
          bx("sup", 1.0, 2.0, 0.4, -2.6, 0, 2.2);
        });
      };
      for (s = -1; s <= 1; s += 2) {
        ablZ(-17.4, s * 7.6, Z2, 0); ablZ(-17.4, s * 9.8, Z2, 0);
        ablZ(-41.5, s * 9.0, Z1, 0.05 * s); ablZ(-41.5, s * 11.4, Z1, 0.05 * s);
      }
      /* four quad Harpoon canisters beside the after stack, angled out */
      var harpoon = function (x, y, side) {
        stamp(x, y, Z3, side > 0 ? PI / 2 : -PI / 2, function () {
          bx("sup", 2.4, 1.7, 0.2, 0.3, 0, 0.1);
          bx("metal", 0.22, 1.5, 1.85, -0.75, 0, 1.0);
          bx("metal", 0.22, 1.5, 0.75, 1.15, 0, 0.45);
          for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2)
            bx("sup", 4.6, 0.6, 0.6, 0.6, a * 0.36, 2.2 + b * 0.36, 0, -0.61, 0);
        });
      };
      for (s = -1; s <= 1; s += 2) { harpoon(-36.2, s * 5.0, s); harpoon(-39.4, s * 5.0, s); }
      /* four Phalanx: a pair on sponsons beside the forward stack, a pair
         ahead of the after stack                                            */
      var phalanx = function (x, y, z, yaw) {
        stamp(x, y, z, yaw, function () {
          cz("sup", 0.72, 0.86, 1.0, 10, 0, 0, 0);
          bx("sup", 0.9, 1.25, 0.95, -0.05, 0, 1.4);
          cx("sup", 0.4, 0.4, 1.25, 8, -0.95, 0, 1.2);
          cx("metal", 0.17, 0.15, 1.95, 6, 0.3, 0, 1.3);
          cz("rad", 0.56, 0.56, 1.0, 10, -0.2, 0, 1.78);
          hemi("rad", 0.56, 10, 4, -0.2, 0, 2.78);
          bx("rad", 0.42, 0.55, 0.42, 0.25, 0, 2.0);
        });
      };
      for (s = -1; s <= 1; s += 2) {
        prism("sup", sym([[-4.0, 4.0], [-0.4, 4.0]]).map(function (p) { return [p[0], p[1] + s * 2.4]; }), Z3, 19.2, 0.1, 4.0);
        cz("sup", 1.45, 1.45, 0.2, 14, -2.2, s * 6.3, 19.2);
        phalanx(-2.2, s * 6.3, 19.4, s * 0.6);
        prism("sup", sym([[-25.6, 1.6], [-22.4, 1.6]]).map(function (p) { return [p[0], p[1] + s * 5.6]; }), Z3, 17.4, 0.1, 4.0);
        phalanx(-24.0, s * 5.6, 17.4, s * 0.5);
      }
    }

    /* ------------------------------------------------------------- masts --- */
    if (V.fore === "e80") {
      /* the black lattice over the tower top and the forward stack, the
         SPS-49 at its head, the pole topmast with the TACAN               */
      tower("dark", -7.6, 3.0, 4.5, -2.4, 0.9, 1.2, 27.0, 43.4, [0, 0.25, 0.5, 0.75, 1.0], 0.2, 0.06);
      bx("dark", 4.0, 3.6, 0.18, -0.75, 0, 43.4);
      railRoof([[-2.7, -1.8], [1.2, -1.8], [1.2, 1.8], [-2.7, 1.8]], 43.5, null, 1.6);
      bar("dark", -1.4, -7.8, 40.8, -1.4, 7.8, 40.8, 0.11);
      for (s = -1; s <= 1; s += 2) {
        bar("dark", -1.4, s * 7.2, 40.8, -1.4, s * 7.2, 42.3, 0.035);
        bar("dark", -1.4, s * 4.8, 40.8, -1.4, s * 4.8, 39.4, 0.03);
      }
      bar("dark", -2.4, -5.4, 37.4, -2.4, 5.4, 37.4, 0.08);
      /* the SPS-49: a curved grid on its pedestal */
      cz("dark", 0.4, 0.5, 0.8, 10, -0.75, 0, 43.5);
      stamp(-0.75, 0, 44.3, PI * 0.18, function () {
        var NS = 8, q, Bm = cur.dark, AW = 3.65, AH = 4.3;
        function rx(y) { return 0.3 - 0.85 * (y / AW) * (y / AW); }
        for (q = 0; q < NS; q++) {
          var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
          var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
          var a1 = [rx(ya), ya, AH, 0, 1], b1 = [rx(yb), yb, AH, 1, 1];
          Bm.triOut(a0, b0, b1, [6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [6, 0, AH * 0.5]);
          var c0 = [rx(ya) + 0.07, ya, 0, 0, 0], d0 = [rx(yb) + 0.07, yb, 0, 1, 0];
          var c1 = [rx(ya) + 0.07, ya, AH, 0, 1], d1b = [rx(yb) + 0.07, yb, AH, 1, 1];
          Bm.triOut(c0, d0, d1b, [-6, 0, AH * 0.5]); Bm.triOut(c0, d1b, c1, [-6, 0, AH * 0.5]);
        }
        bar("dark", 0.3, 0, AH * 0.5, -1.6, 0, AH * 0.45, 0.08);
        bx("dark", 0.45, 0.6, 0.5, -1.75, 0, AH * 0.45);
      });
      tube("dark", 0.4, 0, 43.5, 0.4, 0, 55.0, 0.17, 0.08, 6);
      bar("dark", 0.4, -2.6, 50.6, 0.4, 2.6, 50.6, 0.05);
      cz("dark", 0.55, 0.55, 0.9, 12, 0.4, 0, 52.2);
      /* the SPS-67 and the ECM houses on the tower's sides */
      bx("dark", 0.6, 2.4, 0.5, 1.4, 0, 41.8);
      for (s = -1; s <= 1; s += 2) {
        bx("sup", 1.4, 1.2, 1.8, 5.0, s * 5.0, 24.4);
        bx("rad", 0.08, 0.9, 1.3, 5.75, s * 5.0, 24.4);
      }
      /* the small pole on the after stack's face */
      tube("metal", -26.4, 0, 22.0, -26.4, 0, 36.5, 0.14, 0.07, 6);
      bar("metal", -26.4, -2.6, 34.0, -26.4, 2.6, 34.0, 0.05);
      /* the little tripod on No. 2's roof (1983 photographs) */
      if (V.era === 80) {
        stamp(X_T2 - 2.4, 0, Z_T2 + 3.4, 0, function () {
          bar("metal", 0, -0.9, 0, 0, 0, 2.4, 0.05);
          bar("metal", 0, 0.9, 0, 0, 0, 2.4, 0.05);
          bar("metal", -1.0, 0, 0, 0, 0, 2.4, 0.05);
        });
      }
    } else if (V.fore === "e60") {
      /* 1968: a tripod over the tower top, its yards hung with the ECM
         houses, and a tall pole above                                     */
      for (s = -1; s <= 1; s += 2) bar("metal", 5.0, s * 2.4, 33.4, 2.0, s * 0.3, 43.0, 0.16);
      bar("metal", -1.5, 0, 30.0, 2.0, 0, 43.0, 0.18);
      tube("metal", 2.0, 0, 43.0, 2.0, 0, 51.5, 0.2, 0.08, 6);
      bx("metal", 2.8, 2.6, 0.15, 2.0, 0, 43.0);
      railRoof([[0.6, -1.3], [3.4, -1.3], [3.4, 1.3], [0.6, 1.3]], 43.07, null, 1.4);
      bar("metal", 2.0, -6.0, 40.4, 2.0, 6.0, 40.4, 0.1);
      bar("metal", 2.0, -4.4, 46.0, 2.0, 4.4, 46.0, 0.07);
      for (s = -1; s <= 1; s += 2) {
        bx("dark", 1.6, 1.4, 1.2, 2.0, s * 5.0, 41.2);
        bx("dark", 1.2, 1.1, 0.9, 2.0, s * 3.6, 46.6);
        bar("metal", 2.0, s * 5.8, 40.4, 2.0, s * 5.8, 39.2, 0.03);
      }
      /* the surface search reflector at the head */
      bx("dark", 0.4, 3.2, 0.9, 2.6, 0, 48.4);
      cz("dark", 0.35, 0.35, 0.8, 8, 2.0, 0, 43.15);
      /* the mainmast: a pole at the after stack's after side, ECM boxes */
      tube("metal", -36.6, 0, 18.6, -36.6, 0, 45.0, 0.3, 0.1, 6);
      for (s = -1; s <= 1; s += 2) bar("metal", -34.2, s * 2.6, 18.6, -36.5, 0, 32.0, 0.12);
      bar("metal", -36.6, -4.2, 37.0, -36.6, 4.2, 37.0, 0.08);
      for (s = -1; s <= 1; s += 2) bx("dark", 1.2, 1.0, 1.0, -36.6, s * 3.5, 37.6);
      bx("dark", 0.4, 2.6, 0.8, -36.4, 0, 41.0);
    } else {
      /* 1952: a pole foremast from the tower top, its platform with the air
         search mattress, the surface search at the head; the tripod
         mainmast abaft the after stack with its boom                       */
      for (s = -1; s <= 1; s += 2) bar("metal", 5.0, s * 2.2, 33.4, 2.0, s * 0.2, 39.6, 0.13);
      tube("metal", -1.0, 0, 30.0, 2.0, 0, 42.0, 0.2, 0.12, 6);
      tube("metal", 2.0, 0, 42.0, 2.0, 0, 46.0, 0.12, 0.06, 6);
      bx("metal", 2.4, 2.2, 0.14, 2.0, 0, 39.6);
      bar("metal", 2.0, -4.2, 41.4, 2.0, 4.2, 41.4, 0.07);
      /* the SPS-6 mattress */
      bx("dark", 0.35, 4.6, 1.5, 2.6, 0, 40.9);
      bx("metal", 0.25, 0.25, 0.8, 2.2, 0, 40.0);
      /* the surface search at the masthead */
      bx("dark", 0.3, 2.2, 0.6, 2.4, 0, 44.6);
      /* the tripod mainmast and its boom */
      tube("metal", -37.4, 0, 18.6, -37.4, 0, 40.0, 0.32, 0.12, 6);
      for (s = -1; s <= 1; s += 2) bar("metal", -40.6, s * 2.8, Z3, -37.5, 0, 33.0, 0.16);
      bx("metal", 2.2, 2.0, 0.14, -37.4, 0, 33.0);
      bar("metal", -37.0, 0, 20.0, -27.0, 0, 33.0, 0.13);
      bar("metal", -37.4, -3.4, 36.0, -37.4, 3.4, 36.0, 0.07);
      bx("dark", 0.35, 2.6, 1.6, -37.0, 0, 38.0);
    }

    /* ------------------------------- the SATCOM domes of 1991 (Missouri) -- */
    if (V.satcom) {
      for (s = -1; s <= 1; s += 2) {
        bar("sup", -28.2, s * 3.8, 26.6, -27.4, s * 5.4, 28.2, 0.12);
        cz("sup", 0.35, 0.4, 0.6, 8, -27.4, s * 5.4, 28.0);
        sph("rad", 1.15, 10, 7, -27.4, s * 5.4, 29.6);
      }
      /* the starboard dome on its bracket off the tower (Missouri only) */
      bar("sup", 4.5, -3.4, 27.0, 4.6, -5.4, 27.6, 0.12);
      sph("rad", 0.95, 10, 7, 4.6, -5.4, 28.7);
    }

    /* ------------------------------------------------------ the fantail --- */
    if (V.crane) {
      /* the aircraft crane at the stern: pedestal, house and the lattice
         jib raised forward (drawing; 1968 photograph)                      */
      var CX = -131.0, cz0 = topZ(CX, 0) - 0.05;
      cz("sup", 1.3, 1.5, 2.6, 14, CX, 0, cz0);
      bx("sup", 3.0, 2.4, 1.8, CX + 0.4, 0, cz0 + 3.4);
      tower("metal", CX + 0.8, CX + 1.8, 0.8, CX + 9.0, CX + 9.6, 0.25, cz0 + 3.4, cz0 + 16.4,
            [0, 0.25, 0.5, 0.75, 1.0], 0.1, 0.04);
      bar("metal", CX - 0.4, 0, cz0 + 6.0, CX + 9.3, 0, cz0 + 16.4, 0.05);
      bar("metal", CX + 9.4, 0, cz0 + 16.2, CX + 9.4, 0, cz0 + 9.0, 0.02);
    }
    /* bitts, fairleads and the ensign staff on the fantail edge */
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      cz("metal", 0.22, 0.24, 0.6, 6, x - 0.48, y, z0);
      cz("metal", 0.22, 0.24, 0.6, 6, x + 0.48, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(-122.0, s * 9.0); bitts(-96.0, s * 14.8); bitts(-20.0, s * 15.4);
      bitts(70.0, s * 13.0); bitts(95.0, s * 9.0);
    }
    bar("metal", -134.2, 0, deckZ(-134.2), -134.2, 0, deckZ(-134.2) + 4.5, 0.07);
    /* the bow: a jackstaff (1952), the pole mast with its yard (1968 on) */
    if (V.bowmast) {
      cz("sup", 1.1, 1.2, 0.5, 10, 127.0, 0, deckZ(127.0) - 0.1);
      tube("metal", 127.0, 0, deckZ(127.0) + 0.4, 127.0, 0, deckZ(127.0) + 14.0, 0.15, 0.06, 6);
      bar("metal", 127.0, -2.8, deckZ(127.0) + 11.6, 127.0, 2.8, deckZ(127.0) + 11.6, 0.05);
      railRun("metal", [[125.6, -1.8, deckZ(125.6) + 0.05], [128.6, -1.4, deckZ(128.6) + 0.05],
                        [128.6, 1.4, deckZ(128.6) + 0.05], [125.6, 1.8, deckZ(125.6) + 0.05]], 1.0, 1.4);
    } else {
      bar("metal", 134.4, 0, deckZ(134.4) + 0.5, 134.4, 0, deckZ(134.4) + 3.8, 0.06);
    }
    /* deck fittings: ventilators, hatches, the stowed ammunition hoist
       covers round the forecastle                                        */
    [[88.0, 5.0], [88.0, -5.0], [92.0, 0.0], [78.0, 8.0], [78.0, -8.0], [-92.0, 6.0], [-92.0, -6.0],
     [-106.0, 0], [-80.0, 10.0], [-80.0, -10.0]].forEach(function (p) {
      cz("sup", 0.55, 0.6, 0.5, 6, p[0], p[1], topZ(p[0], p[1]) - 0.03);
    });
    /* team identification lying on the forecastle and on No. 3's roof,
       where the camera looks down on them                                */
    flat("team", 96.0, -2.4, 101.0, 2.4, topZ(98.5, 0) + 0.06, 0, 0, 1, 1);
    stamp(X_T3, 0, Z_T3 + 3.42, PI, function () { flat("team", -6.4, -2.0, -3.4, 2.0, 0.0, 0, 0, 1, 1); });

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e50_battleship"] = {
  len: 270.4,
  build: function (THREE, M, C) {
    return HeroIowaBB.build(THREE, M, C, { era: 50, five: [1, 2, 3, 4, 5], aa40: true,
      crane: true, fore: "e50", mk25: false });
  }
};
UNIT_MODELS["nato_e60_battleship"] = {
  len: 270.4,
  build: function (THREE, M, C) {
    return HeroIowaBB.build(THREE, M, C, { era: 60, five: [1, 2, 3, 4, 5], crane: true,
      fore: "e60", mk25: true, bowmast: true });
  }
};
UNIT_MODELS["nato_e80_battleship"] = {
  len: 270.4,
  build: function (THREE, M, C) {
    return HeroIowaBB.build(THREE, M, C, { era: 80, five: [1, 2, 3], pad: true,
      fore: "e80", mk25: true, bowmast: true });
  }
};
UNIT_MODELS["nato_e90_battleship"] = {
  len: 270.4,
  build: function (THREE, M, C) {
    return HeroIowaBB.build(THREE, M, C, { era: 90, five: [1, 2, 3], pad: true,
      fore: "e80", mk25: true, bowmast: true, satcom: true });
  }
};
