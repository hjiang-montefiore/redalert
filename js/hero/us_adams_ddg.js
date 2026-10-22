/* ============================================================================
   us_adams_ddg.js -- HERO model: USS Charles F. Adams (DDG-2), lead ship of
   the Charles F. Adams class of guided missile destroyers, as she ran her
   trials and served in the 1960s (row nato_e60_destroyer).

   Her fit is the one the early ships carried, DDG-2 to DDG-14: the TWIN-ARM
   Mk 11 Tartar launcher on the after deckhouse (DDG-15 on had the single-arm
   Mk 13). With it two 5-inch/54 Mk 42, the Mk 112 ASROC "matchbox" between
   the stacks, two Mk 32 triple torpedo tubes, the SPS-37 "bedspring" air
   search radar on the foremast, the SPS-39 3-D radar on the mainmast, two
   SPG-51 Tartar illuminators and the Mk 68 gun director with its SPG-53.

   References (Wikimedia Commons; no scale drawing of the class is on
   Commons, so the shapes rest on near-orthogonal photographs and the
   published dimensions, as the brief allows):
     p1  DDG-2 at speed on trials, 31 Aug 1960, starboard bow (NH 106724)
     p4  DDG-2 firing ASROC, 18 Nov 1960, port waist close-up (KN-1916)
     p6  the two SPG-51s aboard DDG-2, c.1960
     p7  DDG-2 firing Tartar, April 1962, starboard side from above
     p8  DDG-2 at speed c.1960, port bow from above
     p9  DDG-2 in 1966, starboard broadside
     p10 DDG-2 bows-on at Charleston c.1962
     p11 USS Buchanan (DDG-14, also a Mk 11 ship), vertical view: the plan
     p12 USS Robison (DDG-12, Mk 11), 10 Jun 1967, port bow from above
     p13 USS Towers (DDG-9, Mk 11), 25 Feb 1964, colour, starboard side
     p14 USS Buchanan, stern view from above
   Published figures (en.wikipedia class article, Jane's 1970/71): 437 ft
   (133.2 m) overall, 47 ft (14.3 m) beam, 15 ft (4.6 m) draught, 3,277 t
   standard and 4,526 t full load.

   RECOGNITION LIST (what this model must show; the reference under it):
     1. Flush deck with a long low run aft and a strong sheer up to a high,
        flared, raked bow (p9, p13, p12).
     2. Two 5-inch/54 Mk 42 mounts, rounded gun houses with two sight hoods
        on the roof: one on the forecastle, one on the after deckhouse
        trained aft (p11 plan, p12, p7).
     3. The twin-arm Mk 11 launcher at the after end of the after deckhouse,
        abaft the after 5-inch, two Tartars on its arms (p1, p7, p12, p11).
     4. Two SPG-51 dishes abaft the after stack: a low one on the house roof
        and a high one on a round tower ahead of it (p1, p6, p7, p13).
     5. The ASROC box on its own raised deck between the stacks (p4, p11).
     6. Two tall raked stacks with black caps, the forward one with louvres
        in its side (p4, p1, p12).
     7. A tall lattice foremast just abaft the bridge with the SPS-37
        bedspring at its head, yards below, and raked struts aft past the
        forward stack (p1, p10, p13, p4).
     8. The short lattice mainmast against the after stack carrying the
        SPS-39 3-D antenna (p4, p12, p1).
     9. The bridge: the 01 deckhouse flush with the hull sides from the
        bridge to the forward stack with its curved sweep down to the
        forecastle, the pilot house and open bridge above, the Mk 68 director
        and SPG-53 on top (p8, p12, p13, p1).
    10. Two 26-ft motor whaleboats in davits abreast the after stack, and the
        Mk 32 triple torpedo tubes on the waist (p11, p12, p1).
    11. 1960s haze grey over a black boot topping, dark decks (p13 colour).

   STATION TABLE (from the stern, metres; x in model space = m - 66.6).
   Half-breadth at the deck edge (fraction of 7.15 m) read off the vertical
   view p11 after levelling it, deck height over the waterline from the
   broadsides p9 and p13:
       m     0    5   10   20   30   40   50   58   65-75  82   88   95
       hb  .66  .72  .76  .83  .88  .92  .96  .99   1.0  .985 .95  .87
       m   100  105  110  115  120  125  130  133.2
       hb  .79  .74  .68  .60  .50  .36  .22  .03
       deck: 4.15 at the transom, 4.5 at 55 m, 4.7 at 72 m, rising through
       5.45 (90 m), 6.75 (106 m), 8.2 (122 m) to 9.0 m at the stem head.
   Positions read off p11: Mk 11 launcher 16.8 m, after Mk 42 32.4 m, SPG-51s
   41.5 and 45.5 m, whaleboats 49-57 m, after stack 53-58 m, ASROC 65.8-71.3
   m, forward stack 73.5-79 m, foremast 79.6-83.6 m, bridge front 97-98 m, forward
   Mk 42 109.6 m, stem 133.2 m.

   NOT CONFIRMED, and drawn as the photographs suggest: every height (the
   freeboards, the stack tops at 22.0 and 20.4 m, the SPS-37 at 32-35.8 m,
   the SPG-51 dishes at about 13.5 and 17 m) is read off the broadsides at
   perhaps ten per cent, there being no drawing; the Mk 32 mounts' place on
   the waist rests on p1 alone; the SQS-23 dome's size and depth; the Mk 11
   is shown trained aft with its arms at 11 degrees, a choice.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -4.6.
   render3d.js scales by the X extent, so nothing stands past the stem or
   the transom: both 5-inch barrels and the launcher's missiles are inside.

   Paint. 1960s haze grey (5-H). The Towers colour print (p13) samples the
   sunlit hull at #bac5a7 and the deckhouse at #95a18b: the print has gone
   green, so the colour is not usable as it stands; neutralised it is the
   5-H level the Enterprise hero took (#878b8f), and by the house rule (the
   renderer's ACES pass lifts mid greys about 1.8x) it goes in at 0.9 of
   that: hull #7a7d81, deckhouses a shade lighter #7f8387, as the
   photographs show them. Decks are the dark deck grey every print shows,
   the boot topping black, the bottom red. No hull number, name or flag.

   Materials (9): hull, deckhouse, deck, dark, metal, light (missiles and
   life rafts), glass, mesh (radar screens) and team, which is exactly C.team.
   Every static part is merged into one mesh per material; the forward
   5-inch is the "turret" node (row turret:true) with its own three meshes.
   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAdamsDDG = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 133.2, XB = LOA * 0.5;
  var HB = 7.15;                /* half beam                                  */
  var DR = 4.6;                 /* draught                                    */
  var ZTOP = 10.0, ZBOT = -1.5; /* vertical span the hull texture covers      */

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
  function X(m) { return m - XB; }

  /* weather deck height by x (the station table above) */
  var DK = [[X(0), 4.15], [X(15), 4.20], [X(35), 4.35], [X(55), 4.50], [X(72), 4.70],
            [X(82), 5.00], [X(90), 5.45], [X(98), 6.05], [X(106), 6.75], [X(114), 7.50],
            [X(122), 8.20], [X(128), 8.65], [X(133.2), 9.00]];
  function deckZ(x) { return tbl(DK, x); }

  var HW_K = [[0.000, 0.660], [0.038, 0.720], [0.075, 0.760], [0.150, 0.828],
              [0.225, 0.880], [0.300, 0.920], [0.375, 0.960], [0.435, 0.990],
              [0.488, 1.000], [0.563, 1.000], [0.616, 0.985], [0.661, 0.950],
              [0.713, 0.870], [0.751, 0.790], [0.788, 0.737], [0.826, 0.680],
              [0.863, 0.600], [0.901, 0.500], [0.938, 0.360], [0.976, 0.220],
              [1.000, 0.030]];
  function hullHW(x) { return HB * tbl(HW_K, tOf(x)); }
  /* the keel: the run rises to a transom just in the water; forward it
     sweeps up through the forefoot into the raked stem                    */
  function keelZ(t) {
    if (t < 0.15) return -0.6 - (DR - 0.6) * Math.pow(t / 0.15, 0.75);
    if (t < 0.82) return -DR;
    return -DR + (DR + 0.5) * Math.pow((t - 0.82) / 0.18, 1.9);
  }
  /* 0 = full midship section, 1 = the fine flared V of the entry */
  var VB_K = [[0.00, 0.18], [0.08, 0.08], [0.18, 0.00], [0.58, 0.00],
              [0.68, 0.10], [0.78, 0.32], [0.86, 0.58], [0.93, 0.80],
              [1.000, 1.00]];
  var SEC_FULL = [[1.000, 1.000], [1.002, 0.800], [1.000, 0.620], [0.990, 0.470],
                  [0.968, 0.350], [0.925, 0.250], [0.855, 0.168], [0.745, 0.100],
                  [0.585, 0.050], [0.395, 0.018], [0.196, 0.004], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.915, 0.800], [0.826, 0.620], [0.732, 0.470],
                  [0.634, 0.350], [0.536, 0.250], [0.432, 0.168], [0.328, 0.100],
                  [0.224, 0.050], [0.136, 0.018], [0.060, 0.004], [0.000, 0.000]];
  var CAMBER = [[0.560, 1.008], [0.000, 1.014], [-0.560, 1.008]];
  /* the stem: 5.2 m of rake from the stem head to the forefoot (p9) */
  var RAKE_K = [[0.000, 0.0], [0.840, 0.0], [0.900, 1.0], [0.950, 2.6], [1.000, 5.2]];

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

  /* the stations: close together at the ends */
  var XS = [0, 2, 5, 9, 14, 20, 27, 35, 43, 51, 59, 66, 73, 80, 87, 93, 99, 104,
            109, 113, 117, 121, 124.5, 127.5, 130, 132, 133.2].map(X);

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
    _tx = { hull: hullTex(THREE), sup: supTex(THREE), deck: deckTex(THREE) };
    return _tx;
  }

  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(60902), i, j, x, z;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    var PXM = H / (ZTOP - ZBOT);
    g.fillStyle = "#7a7d81"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* red below the waterline, the black boot topping the 1960s prints show
       from just under the water to about half a metre above it            */
    g.fillStyle = "#4e2a24"; g.fillRect(0, Y(-0.35), W, H - Y(-0.35));
    g.fillStyle = "#16181b"; g.fillRect(0, Y(0.55), W, Y(-0.35) - Y(0.55));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.55) - 1, W, 1.5);
    /* strake seams, level in real height */
    g.lineWidth = 1.2;
    var STR = [1.6, 2.9, 4.2, 5.5, 6.8, 8.1, 9.4];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
      g.beginPath(); g.moveTo(0, Y(STR[i]) + 1.4); g.lineTo(W, Y(STR[i]) + 1.4); g.stroke();
    }
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.12)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 20; j++) {
        x = ((j + st) / 20) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }
    /* scuttles: a row under the forecastle deck edge (crew spaces forward)
       and a shorter one aft, following the sheer (p1, p12)               */
    g.fillStyle = "#1a1d20";
    for (x = X(100); x < X(124); x += 2.1) {
      z = deckZ(x) - 1.25;
      g.beginPath(); g.arc(U(x), Y(z), 2.6, 0, 2 * PI); g.fill();
    }
    for (x = X(4); x < X(30); x += 2.4) {
      z = deckZ(x) - 1.2;
      g.beginPath(); g.arc(U(x), Y(z), 2.4, 0, 2 * PI); g.fill();
    }
    /* freeing ports under the deck edge, weeping rust */
    for (i = 0; i < 40; i++) {
      x = -XB + 4 + (i / 39) * (LOA - 16);
      z = deckZ(x) - 0.5;
      g.globalAlpha = 0.32; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 4, Y(z) - 2, 8, 4);
      if (R() < 0.6) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 3, 4, (0.8 + R() * 2.2) * PXM);
    }
    /* soot streaming aft of both stacks */
    var FUN = [X(76), X(55)];
    for (i = 0; i < FUN.length; i++) {
      for (j = 0; j < 140; j++) {
        var f = R();
        x = FUN[i] - f * 26 - 2;
        z = deckZ(x) - 0.3 - R() * 2.6;
        g.globalAlpha = 0.035 * (1 - f) + 0.008; g.fillStyle = "#2a2d30";
        g.fillRect(U(x), Y(z), 8 + R() * 30, 4 + R() * 12);
      }
    }
    /* rust under each hawse */
    g.globalAlpha = 0.14; g.fillStyle = "#6d4526";
    g.fillRect(U(X(123)) - 5, Y(deckZ(X(123)) - 2.6), 10, 3.4 * PXM);
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? X(127.5) : X(2.5);
      for (j = 0; j <= 8; j++) g.fillRect(U(x) - 6, Y(-0.3 + j * 0.5), j % 2 ? 7 : 12, 2);
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
    var R = rng(41771), i;
    g.fillStyle = "#7f8387"; g.fillRect(0, 0, W, H);
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
    for (i = 0; i < 18; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillRect(R() * W, R() * H, 2 + R() * 3, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* weather decks and deckhouse roofs: dark non-skid with plate joints */
  function deckTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(5113), i;
    g.fillStyle = "#46484a"; g.fillRect(0, 0, W, H);
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

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var T = textures(THREE), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.dark  = S({ color: 0x24282c, roughness: 0.90, metalness: 0.05 });
    M.metal = S({ color: 0x7c8186, roughness: 0.55, metalness: 0.45 });
    M.mesh  = S({ color: 0x5c6166, roughness: 0.70, metalness: 0.30, side: THREE.DoubleSide });
    M.light = S({ color: 0xc4c7c2, roughness: 0.80, metalness: 0.05 });
    M.team  = S({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
    M.glass = S({ color: 0x2b3a44, roughness: 0.12, metalness: 0.25,
                  transparent: true, opacity: 0.86 });
    return M;
  }

  /* ================================================================ batching
     Parts are plain triangles appended to one Batch per material. A stamp
     (position and yaw) moves everything built while it is set.            */
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

  /* ---- plan polygons: convex, counter-clockwise ------------------------ */
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
    cap(0, true); cap(XS.length - 1, false);
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
    var KEYS = ["sup", "deck", "dark", "metal", "mesh", "light", "team", "glass"];
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
    /* a closed round tube between two points (a missile body, a torpedo tube) */
    function rod(k, ax, ay, az, bx2, by, bz, r, seg) {
      if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var g = new THREE.CylinderGeometry(r, r, L, seg || 8, 1, false);
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
       metres all round. z1 may be a function of x (a roof that follows the
       sheer). The roof goes to batch `rk` ("deck" for a walked-on roof) or
       is left open when rk is null.                                        */
    function prism(k, poly, z0, z1, ins, US, rk) {
      var bb = bboxOf(poly), n = poly.length, B = cur[k], q;
      var sx = (bb.w - 2 * ins) / bb.w, sy = (bb.h - 2 * ins) / bb.h, per = 0;
      var zt = typeof z1 === "function" ? z1 : function () { return z1; };
      US = US || 4.0;
      function top(p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; }
      for (q = 0; q < n; q++) {
        var a = poly[q], b = poly[(q + 1) % n], at = top(a), bt = top(b);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var za = zt(at[0]), zb = zt(bt[0]);
        var u0 = per / US, u1 = (per + L) / US;
        per += L;
        var A0 = [a[0], a[1], z0, u0, z0 / US], B0 = [b[0], b[1], z0, u1, z0 / US];
        var B1 = [bt[0], bt[1], zb, u1, zb / US], A1 = [at[0], at[1], za, u0, za / US];
        B.tri(A0, B0, B1); B.tri(A0, B1, A1);
      }
      if (rk === undefined) rk = k;
      if (rk) {
        var RB = cur[rk], RS = rk === "deck" ? 5.5 : US, zc = zt(bb.cx);
        for (q = 0; q < n; q++) {
          var p = top(poly[q]), r = top(poly[(q + 1) % n]);
          RB.tri([bb.cx, bb.cy, zc, bb.cx / RS, bb.cy / RS], [p[0], p[1], zt(p[0]), p[0] / RS, p[1] / RS],
                 [r[0], r[1], zt(r[0]), r[0] / RS, r[1] / RS]);
        }
      }
    }
    /* a frame on wall `ei` of a prism(poly, z0, z1, ins): origin on the wall
       at fraction u along it and height zc; t along, w up, n out          */
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
      var q, n = poly.length, zf = typeof z === "function" ? z : function () { return z; };
      for (q = 0; q < n; q++) {
        if (skip && skip.indexOf(q) >= 0) continue;
        var a = poly[q], b = poly[(q + 1) % n];
        railRun("metal", [[a[0], a[1], zf(a[0])], [b[0], b[1], zf(b[0])]], 1.0, step || 1.8);
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
      var t = tOf(x), dz = deckZ(x), dep = dz - keelZ(t);
      var ak = Math.min(1, Math.abs(y) / hullHW(x));
      return dz + dep * 0.014 * (1 - ak * ak) + 0.07;
    }
    /* a four-legged tapered lattice tower, X-braced on every face; above
       zs it is painted black, as US masts were above the stack tops      */
    function tower(k, x0, x1, y0, tx0, tx1, ty0, z0, z1, lv, rl, rb, zs, kHi) {
      if (zs === undefined) { zs = 1e9; kHi = k; }
      function c(u, sx, sy) {
        var xb = sx < 0 ? x0 : x1, xt = sx < 0 ? tx0 : tx1;
        return [xb + (xt - xb) * u, sy * (y0 + (ty0 - y0) * u), z0 + (z1 - z0) * u];
      }
      var CR = [[-1, -1], [1, -1], [1, 1], [-1, 1]], q, e;
      for (q = 0; q < 4; q++) {
        var a = c(0, CR[q][0], CR[q][1]), b = c(1, CR[q][0], CR[q][1]);
        if (zs > z0 && zs < z1) {
          var us = (zs - z0) / (z1 - z0), m0 = c(us, CR[q][0], CR[q][1]);
          tube(k, a[0], a[1], a[2], m0[0], m0[1], m0[2], rl, rl * (1 - 0.2 * us), 6);
          tube(kHi, m0[0], m0[1], m0[2], b[0], b[1], b[2], rl * (1 - 0.2 * us), rl * 0.8, 6);
        } else tube(z0 >= zs ? kHi : k, a[0], a[1], a[2], b[0], b[1], b[2], rl, rl * 0.8, 6);
      }
      for (e = 1; e < lv.length; e++) {
        for (q = 0; q < 4; q++) {
          var p0 = c(lv[e], CR[q][0], CR[q][1]), p1 = c(lv[e], CR[(q + 1) % 4][0], CR[(q + 1) % 4][1]);
          var d0 = c(lv[e - 1], CR[q][0], CR[q][1]), d1 = c(lv[e - 1], CR[(q + 1) % 4][0], CR[(q + 1) % 4][1]);
          var kk = (p0[2] + d0[2]) * 0.5 > zs ? kHi : k;
          bar(p0[2] > zs ? kHi : k, p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], rb * 1.2);
          bar(kk, d0[0], d0[1], d0[2], p1[0], p1[1], p1[2], rb);
          bar(kk, d1[0], d1[1], d1[2], p0[0], p0[1], p0[2], rb);
        }
      }
      return c;
    }
    /* a square platform with a rail round it */
    function platform(x, y, z, hx, hy, skip, k) {
      bx(k || "metal", hx * 2, hy * 2, 0.14, x, y, z);
      var q, P = [[x - hx, y - hy], [x + hx, y - hy], [x + hx, y + hy], [x - hx, y + hy]];
      for (q = 0; q < 4; q++) {
        if (skip && skip.indexOf(q) >= 0) continue;
        railRun(k || "metal", [[P[q][0], P[q][1], z + 0.07], [P[(q + 1) % 4][0], P[(q + 1) % 4][1], z + 0.07]], 1.0, 1.3);
      }
    }

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);

    /* the weather deck: a cambered ribbon on the hull top, into the deck batch */
    (function () {
      var KY = [-0.995, -0.94, -0.60, 0, 0.60, 0.94, 0.995];
      var XR = [0.5, 3, 7, 12, 18, 25, 33, 41, 49, 57, 65, 73, 80, 87, 93, 99, 104,
                109, 113, 117, 121, 124.5, 127.5, 130, 131.9].map(X);
      var rows = [], q, m, R = KY.length;
      for (q = 0; q < XR.length; q++) {
        var x = XR[q], t = tOf(x), r = ringOf(tbl(VB_K, t)), w = hullHW(x);
        var kz = keelZ(t), dz = deckZ(x), dep = dz - kz, row = [];
        for (m = 0; m < R; m++) {
          var ky = KY[m], ak = Math.abs(ky);
          var kd = ak > 0.995 ? r[0][1] : 1.0 + 0.014 * (1 - ak * ak);
          row.push([x, w * ky, kz + dep * kd + 0.07, x / 5.5, ky * w / 5.5]);
        }
        rows.push(row);
      }
      for (q = 0; q < XR.length - 1; q++) for (m = 0; m < R - 1; m++) {
        var a = rows[q][m], b = rows[q][m + 1], c = rows[q + 1][m], d = rows[q + 1][m + 1];
        Bt.deck.tri(a, c, b); Bt.deck.tri(b, c, d);
      }
    })();

    /* the SQS-23 dome under the forefoot and a bilge keel each side */
    var dome = new THREE.SphereGeometry(1, 14, 8);
    dome.scale(4.6, 1.5, 1.4);
    cur.dark.add(place(THREE, dome, X(112), 0, -4.9));
    for (s = -1; s <= 1; s += 2)
      bx("dark", 30.0, 0.14, 0.5, X(55), s * (hullY(X(55), -3.5) + 0.05), -3.5, s * 0.8, 0, 0);
    /* twin shafts, struts, screws and rudders under the run */
    for (s = -1; s <= 1; s += 2) {
      tube("metal", X(40), s * 2.6, -3.9, X(8), s * 2.6, -2.6, 0.22, 0.2, 8);
      bar("metal", X(13), s * 2.6, -2.75, X(13), s * 2.2, -1.2, 0.12);
      cx("dark", 0.5, 0.2, 0.8, 10, X(6.6), s * 2.6, -2.55);
      for (j = 0; j < 4; j++) {
        var an = j * PI / 2 + 0.4;
        bx("metal", 0.12, 2.6, 0.7, X(7.2), s * 2.6 + Math.cos(an) * 0.75, -2.55 + Math.sin(an) * 0.75,
           an, 0, 0);
      }
      bx("dark", 2.6, 0.22, 2.4, X(3.6), s * 1.55, -1.75);
    }

    /* two bower anchors in hawse pipes high on the bows, cables aft to the
       wildcats and the windlass between them                               */
    for (s = -1; s <= 1; s += 2) {
      var AX = X(123.2), AZ = deckZ(AX) - 2.0, ay0 = hullY(AX + 0.6, AZ);
      var slope = (hullY(AX + 1.6, AZ) - hullY(AX - 0.4, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.05), AZ, -slope, s);
      plate("dark", FA, rectPts(-0.7, -1.6, 0.7, 0.5), 0, 0.05);
      plate("metal", FA, rectPts(-0.12, -1.25, 0.12, 0.3), 0.05, 0.32);
      plate("metal", FA, rectPts(-0.38, -1.5, 0.38, -1.22), 0.05, 0.36);
      plate("metal", FA, [[-0.38, -1.5], [-0.38, -1.22], [-0.8, -0.95]], 0.05, 0.3);
      plate("metal", FA, [[0.38, -1.5], [0.8, -0.95], [0.38, -1.22]], 0.05, 0.3);
      cz("dark", 0.38, 0.38, 0.08, 10, X(122.6), s * 2.0, topZ(X(122.6), 2.0) - 0.03);
      var cxa = X(122.6), cya = s * 2.0, cxb = X(118.0), cyb = s * 0.9;
      bx("dark", Math.sqrt((cxa - cxb) * (cxa - cxb) + (cya - cyb) * (cya - cyb)), 0.3, 0.12,
         (cxa + cxb) * 0.5, (cya + cyb) * 0.5, topZ(X(120.3), 1.5) + 0.03, 0, 0, Math.atan2(cya - cyb, cxa - cxb));
      cz("metal", 0.5, 0.56, 0.7, 12, X(118.0), s * 0.9, topZ(X(118.0), 0.9) - 0.02);
    }
    bx("sup", 1.3, 1.2, 0.7, X(116.6), 0, topZ(X(116.6), 0) + 0.3);
    cz("metal", 0.4, 0.5, 0.85, 10, X(114.6), 0, topZ(X(114.6), 0) - 0.02);

    /* ---------------------------------------------------- deckhouses ---- */
    /* the after deckhouse (01 level) from the round end under the Mk 11 to the
       after stack, inboard of a walkway each side (p11, p7, p12)            */
    var Z1A = 7.0;
    var AFT = [[X(60), -4.8], [X(60), 4.8], [X(44), 4.75], [X(30), 4.55], [X(20), 4.3]];
    (function () {
      var c0 = X(17.6), r0 = 4.3, q;
      for (q = 1; q < 8; q++) {
        var an = PI / 2 + q * PI / 8;
        AFT.push([c0 + Math.cos(an) * r0 * 0.95, Math.sin(an) * r0]);
      }
      AFT.push([X(20), -4.3]); AFT.push([X(30), -4.55]); AFT.push([X(44), -4.75]);
    })();
    prism("sup", AFT, 3.9, Z1A, 0, 4.0, "deck");
    /* the ASROC deck between the stacks: raised, with a walkway each side */
    var ASR = [[X(60), -5.55], [X(72.4), -5.6], [X(72.4), 5.6], [X(60), 5.55]];
    prism("sup", ASR, 4.1, 7.1, 0, 4.0, "deck");
    /* the forward deckhouse: flush with the hull sides from the forward stack
       to the bridge front, its roof following the sheer a little           */
    function z01(x) { return 7.45 + (x - X(72)) * 0.024; }
    var FWD = [], xx;
    var FXS = [72.0, 76, 81, 86, 90, 93.5, 96.0];
    for (i = 0; i < FXS.length; i++) FWD.push([X(FXS[i]), -(hullHW(X(FXS[i])) - 0.03)]);
    FWD.push([X(97.4), -3.9]); FWD.push([X(98.2), -1.6]); FWD.push([X(98.2), 1.6]); FWD.push([X(97.4), 3.9]);
    for (i = FXS.length - 1; i >= 0; i--) FWD.push([X(FXS[i]), hullHW(X(FXS[i])) - 0.03]);
    prism("sup", FWD, 4.3, z01, 0, 4.0, "deck");
    /* scuttles in the flush sides of the forward deckhouse (p1, p4) */
    for (s = -1; s <= 1; s += 2) {
      for (xx = X(74.5); xx < X(95); xx += 1.9) {
        if (Math.abs(xx - X(84.5)) < 1.2) continue;
        var FS = frameN(xx, s * (hullHW(xx) - 0.02), z01(xx) - 1.2, 0, s);
        plate("dark", FS, [[-0.17, -0.17], [0.17, -0.17], [0.17, 0.17], [-0.17, 0.17]], -0.01, 0.03);
      }
      /* a watertight door aft in each side */
      var FD = frameN(X(84.5), s * (hullHW(X(84.5)) - 0.02), deckZ(X(84.5)), 0, s);
      plate("dark", FD, rectPts(-0.45, 0.05, 0.45, 1.95), -0.01, 0.05);
    }
    /* the sweep: the side plating curves down from the 01 roof to the
       forecastle ahead of the bridge front (p1, p8, p12)                    */
    for (s = -1; s <= 1; s += 2) {
      var SW0 = X(96.0), SW1 = X(100.2), NSW = 7, sw = [];
      for (j = 0; j <= NSW; j++) {
        var f = j / NSW, xs = SW0 + (SW1 - SW0) * f;
        var zb = deckZ(xs), zt0 = z01(SW0);
        var zt = zb + (zt0 - zb) * Math.sqrt(Math.max(0, 1 - f * f));
        sw.push([xs, s * (hullHW(xs) - 0.03), zb, zt]);
      }
      for (j = 0; j < NSW; j++) {
        var a = sw[j], b = sw[j + 1], th = -s * 0.16;
        var Cn = [(a[0] + b[0]) * 0.5, 0, a[2]];
        var o0 = [a[0], a[1], a[2], a[0] / 4, a[2] / 4], o1 = [b[0], b[1], b[2], b[0] / 4, b[2] / 4];
        var o2 = [b[0], b[1], b[3], b[0] / 4, b[3] / 4], o3 = [a[0], a[1], a[3], a[0] / 4, a[3] / 4];
        Bt.sup.triOut(o0, o1, o2, Cn); Bt.sup.triOut(o0, o2, o3, Cn);
        var i0 = [a[0], a[1] + th, a[2], 0, 0], i1 = [b[0], b[1] + th, b[2], 0, 0];
        var i2 = [b[0], b[1] + th, b[3], 0, 0], i3 = [a[0], a[1] + th, a[3], 0, 0];
        var Ci = [(a[0] + b[0]) * 0.5, s * 10, a[2]];
        Bt.sup.triOut(i0, i1, i2, Ci); Bt.sup.triOut(i0, i2, i3, Ci);
        Bt.sup.triOut(o3, o2, i2, [Cn[0], s * (hullHW(Cn[0]) - 0.1), a[2] - 3]);
        Bt.sup.triOut(o3, i2, i3, [Cn[0], s * (hullHW(Cn[0]) - 0.1), a[2] - 3]);
      }
    }
    /* the 01-level rails: round the forward deckhouse roof, the ASROC deck
       and the after deckhouse (the camera looks down on all of them)      */
    for (s = -1; s <= 1; s += 2) {
      var rp = [];
      for (i = 0; i < FXS.length; i++) rp.push([X(FXS[i]), s * (hullHW(X(FXS[i])) - 0.12), z01(X(FXS[i]))]);
      railRun("metal", rp, 1.0, 1.9);
      railRun("metal", [[X(60.2), s * 5.45, 7.1], [X(72.2), s * 5.5, 7.1]], 1.0, 1.9);
      railRun("metal", [[X(20.5), s * 4.2, Z1A], [X(30), s * 4.45, Z1A], [X(37), s * 4.55, Z1A]], 1.0, 1.9);
    }

    /* ---------------------------------------------- the bridge structure -- */
    var Z2 = 10.55, Z3 = 12.9;
    var B2 = [[X(78.4), -4.4], [X(95.0), -4.6], [X(96.8), -2.7], [X(96.8), 2.7], [X(95.0), 4.6], [X(78.4), 4.4]];
    prism("sup", B2, 7.6, Z2, 0.1, 4.0, "deck");
    var B3 = [[X(85.2), -3.7], [X(93.6), -3.7], [X(95.2), -2.1], [X(95.2), 2.1], [X(93.6), 3.7], [X(85.2), 3.7]];
    prism("sup", B3, Z2, Z3, 0.1, 4.0, "deck");
    /* the pilot house windows round the front of the 02 level, and the open
       bridge's windscreen on the front of the 03 level                     */
    function winRow(F, ss, hw, hh, brow) {
      ss.forEach(function (sv) { plate("glass", F, rectPts(sv - hw, -hh, sv + hw, hh), -0.02, 0.05); });
      if (brow) plate("sup", F, rectPts(brow[0], hh + 0.08, brow[1], hh + 0.2), 0, 0.45);
    }
    var WZ = 9.45;
    winRow(face(B2, 2, 7.6, Z2, 0.1, 0.5, WZ), [-2.0, -1.0, 0, 1.0, 2.0], 0.4, 0.45, [-2.6, 2.6]);
    winRow(face(B2, 1, 7.6, Z2, 0.1, 0.5, WZ), [-0.6, 0.6], 0.4, 0.45, [-1.25, 1.25]);
    winRow(face(B2, 3, 7.6, Z2, 0.1, 0.5, WZ), [-0.6, 0.6], 0.4, 0.45, [-1.25, 1.25]);
    winRow(face(B2, 0, 7.6, Z2, 0.1, 0.9, WZ), [-0.8, 0.4], 0.38, 0.42, null);
    winRow(face(B2, 4, 7.6, Z2, 0.1, 0.1, WZ), [-0.4, 0.8], 0.38, 0.42, null);
    winRow(face(B3, 2, Z2, Z3, 0.1, 0.5, 12.0), [-1.5, -0.5, 0.5, 1.5], 0.38, 0.32, null);
    railRoof(roofOf(B3, 0.1, 0.1), Z3, null, 1.6);
    railRoof(roofOf(B2, 0.1, 0.1), Z2, [2], 1.7);
    /* the bridge wings, open platforms abreast the pilot house */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 2.6, 1.7, 0.2, X(94.0), s * 5.4, Z2 - 0.1);
      bx("sup", 2.6, 0.1, 1.05, X(94.0), s * 6.2, Z2 + 0.45);
      bx("sup", 0.1, 1.7, 1.05, X(95.25), s * 5.4, Z2 + 0.45);
      bar("sup", X(94.0), s * 4.6, Z2 - 1.6, X(94.0), s * 6.0, Z2 - 0.15, 0.1);
    }
    /* doors in the 02 sides */
    [[0, 0.62], [4, 0.38], [0, 0.2], [4, 0.8]].forEach(function (d) {
      plate("dark", face(B2, d[0], 7.6, Z2, 0.1, d[1], 7.6), rectPts(-0.42, 0.1, 0.42, 1.95), -0.02, 0.06);
    });

    /* the Mk 68 gun director with the SPG-53 dish on its roof, on a drum on
       the open bridge (p8, p12, p13)                                       */
    var DX = X(89.2);
    cz("sup", 0.85, 0.95, 0.9, 14, DX, 0, Z3);
    stamp(DX, 0, Z3 + 0.9, 0, function () {
      loftX("sup", [[-1.5, 1.05, 0, 1.55], [-1.2, 1.2, 0, 1.75], [0.6, 1.2, 0, 1.8],
                    [1.4, 1.05, 0, 1.55], [1.75, 0.7, 0.15, 1.2]], 12, 0.45);
      bx("dark", 0.06, 1.2, 0.3, 1.66, 0, 0.85);
      for (var q = -1; q <= 1; q += 2) bx("sup", 0.7, 0.55, 0.45, -0.6, q * 1.35, 0.95);
      cz("sup", 0.3, 0.35, 0.5, 10, 0.1, 0, 1.75);
      var g = new THREE.CylinderGeometry(0.95, 0.3, 0.4, 16, 1, false);
      g.rotateZ(-PI / 2); g.rotateY(-0.12); g.translate(0.35, 0, 2.75);
      cur.sup.add(g);
      bar("metal", 0.6, 0, 2.75, 1.25, 0, 2.8, 0.05);
      bx("dark", 0.2, 0.25, 0.25, 1.3, 0, 2.8);
    });
    /* searchlights on the 03 level wings */
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.22, 0.28, 0.6, 8, X(86.4), s * 3.0, Z3);
      cx("dark", 0.36, 0.36, 0.55, 10, X(86.15), s * 3.0, Z3 + 0.95);
    }
    /* whips at the bridge front */
    bar("metal", X(95.0), -3.6, Z3, X(95.4), -4.0, Z3 + 7.0, 0.04);
    bar("metal", X(95.0), 3.6, Z3, X(95.4), 4.0, Z3 + 7.0, 0.04);

    /* -------------------------------------------------- the stacks ---- */
    /* a raked stack: rounded plan, its centre running aft with height, the
       black cap flared a little at the top (p4, p1, p12)                  */
    function stackR(xb, ax, ay, z0, z1, rake, louv) {
      var NS = 16, capH = 1.9, lv = [z0, z1 - capH, z1 - capH, z1 - 0.15, z1];
      var grow = [0, 0, 0.1, 0.16, 0.16], key = ["sup", "sup", "dark", "dark", "dark"];
      var rings = [], q, m;
      for (q = 0; q < lv.length; q++) {
        var off = -rake * (lv[q] - z0) / (z1 - z0);
        /* tapered a little from the base up, the cap's top sloping down aft */
        var tp = 1.08 - 0.08 * Math.min(1, (lv[q] - z0) / (z1 - capH - z0));
        var xq = xb + off, sl = q >= 3 ? 0.14 : 0;
        rings.push(rounded((ax + grow[q]) * tp, (ay + grow[q]) * tp, 0.7, NS, xq).map(function (p) {
          return [p[0], p[1], lv[q] + sl * (p[0] - xq)];
        }));
      }
      for (q = 0; q < rings.length - 1; q++) {
        if (lv[q + 1] - lv[q] < 1e-3) {
          /* the step out to the cap lip: a flat ring facing down */
        }
        var A = rings[q], B = rings[q + 1], K = cur[key[q + 1] === "dark" && q >= 1 ? "dark" : "sup"];
        var zc = (lv[q] + lv[q + 1]) * 0.5, xc = xb - rake * (zc - z0) / (z1 - z0);
        for (m = 0; m < NS; m++) {
          var m2 = (m + 1) % NS;
          var a0 = [A[m][0], A[m][1], A[m][2], m / 4, A[m][2] / 4], a1 = [A[m2][0], A[m2][1], A[m2][2], (m + 1) / 4, A[m2][2] / 4];
          var b0 = [B[m][0], B[m][1], B[m][2], m / 4, B[m][2] / 4], b1 = [B[m2][0], B[m2][1], B[m2][2], (m + 1) / 4, B[m2][2] / 4];
          var Cc = [xc, 0, lv[q + 1] + 50];
          if (lv[q + 1] - lv[q] > 1e-3) Cc = [xc, 0, zc];
          K.triOut(a0, a1, b1, Cc); K.triOut(a0, b1, b0, Cc);
        }
      }
      /* the open top: sooted, a little below the rim */
      var T = rings[rings.length - 1], xt = xb - rake, ct = [xt, 0, z1 - 0.35, 0, 0];
      for (m = 0; m < NS; m++) {
        var q0 = T[m], q1 = T[(m + 1) % NS];
        var p0 = [q0[0] * 0.94 + xt * 0.06, q0[1] * 0.94, q0[2] - 0.35, 0, 0];
        var p1 = [q1[0] * 0.94 + xt * 0.06, q1[1] * 0.94, q1[2] - 0.35, 0, 0];
        Bt.dark.tri(ct, p0, p1);
        /* the inside of the rim down to the sooted floor */
        var Co = [xt + ((q0[0] + q1[0]) * 0.5 - xt) * 3, (q0[1] + q1[1]) * 1.5, z1];
        Bt.dark.triOut([q0[0], q0[1], q0[2], 0, 0], [q1[0], q1[1], q1[2], 0, 0], p1, Co);
        Bt.dark.triOut([q0[0], q0[1], q0[2], 0, 0], p1, p0, Co);
      }
      if (louv) {
        for (var sd = -1; sd <= 1; sd += 2) {
          for (q = 0; q < 4; q++) {
            var lz = z1 - capH - 2.2, lx = xb + (q - 1.5) * ax * 0.3;
            var lo = -rake * (lz - z0) / (z1 - z0);
            var F = frameN(lx + lo, sd * (ay - 0.02), lz, 0, sd);
            plate("dark", F, rectPts(-0.22, -1.1, 0.22, 1.1), -0.1, 0.04);
          }
        }
      }
    }
    stackR(X(76.2), 2.7, 1.85, z01(X(76.2)) - 0.1, 22.0, 1.0, true);
    stackR(X(55.2), 2.4, 1.7, Z1A - 0.1, 20.4, 1.4, false);
    /* steam pipes up the after faces */
    for (s = -1; s <= 1; s += 2) {
      tube("metal", X(73.35), s * 0.7, z01(X(73.35)), X(72.4), s * 0.7, 21.6, 0.09, 0.09, 6);
      tube("metal", X(52.65), s * 0.6, Z1A, X(51.4), s * 0.6, 20.0, 0.08, 0.08, 6);
    }

    /* -------------------------------------------------- the foremast ---- */
    /* a four-legged lattice stepped on the 01 roof close abaft the bridge,
       two raked struts aft past the forward stack, platforms and yards, the
       SPS-37 bedspring at its head and the topmast pole (p1, p10, p13, p4) */
    var FZ0 = Z2, FZ1 = 31.0, ZBLK = 21.0;
    var fm = tower("metal", X(79.6), X(83.6), 2.0, X(80.9), X(82.3), 0.6, FZ0, FZ1,
                   [0, 0.15, 0.3, 0.44, 0.57, 0.69, 0.8, 0.9, 1.0], 0.17, 0.05, ZBLK, "dark");
    for (s = -1; s <= 1; s += 2) {
      var sa = fm((24.0 - FZ0) / (FZ1 - FZ0), -1, s);
      var sm = [sa[0] + (X(72.6) - sa[0]) * 0.11, sa[1] + (s * 3.5 - sa[1]) * 0.11, 24.0 + (z01(X(72.6)) - 24.0) * 0.11];
      tube("dark", sa[0], sa[1], 24.0, sm[0], sm[1], sm[2], 0.15, 0.152, 6);
      tube("metal", sm[0], sm[1], sm[2], X(72.6), s * 3.5, z01(X(72.6)), 0.152, 0.17, 6);
    }
    /* the plated trunk at the mast's foot, inside the legs, up to the first
       platform: the solid mass under the lattice in p10, p13 and p1        */
    var FT = [[X(80.15), -1.75], [X(83.05), -1.75], [X(83.05), 1.75], [X(80.15), 1.75]];
    prism("sup", FT, Z2 - 0.05, 18.15, 0.3, 4.0, "sup");
    [[0, 0.5], [2, 0.5]].forEach(function (d) {
      plate("dark", face(FT, d[0], Z2, 18.15, 0.3, d[1], Z2), rectPts(-0.4, 0.05, 0.4, 1.9), -0.02, 0.05);
    });
    /* platforms: the searchlight/ECM level, the SPS-10 level, the head */
    platform(X(81.6), 0, 18.2, 2.0, 2.0, null);
    platform(X(82.2), 0, 26.0, 1.6, 1.4, null, "dark");
    platform(X(81.6), 0, FZ1, 1.6, 1.6, null, "dark");
    /* two yards: a long one and a short one above it, with their arms */
    var YA = 23.6, YB = 28.4, YX = X(81.9);
    bar("dark", YX, -6.4, YA, YX, 6.4, YA, 0.08);
    bar("dark", YX, -4.4, YB, YX, 4.4, YB, 0.065);
    for (s = -1; s <= 1; s += 2) {
      bar("dark", YX, s * 6.2, YA, YX, s * 6.2, YA + 1.5, 0.035);
      bar("dark", YX, s * 4.5, YA, YX, s * 4.5, YA - 1.2, 0.03);
      bar("dark", YX, s * 1.4, YA - 2.0, YX, s * 4.0, YA, 0.05);
      bar("dark", YX, s * 4.2, YB, YX, s * 4.2, YB + 1.2, 0.03);
      /* the ECM pods and lamps on the lower platform's ends */
      cz("sup", 0.3, 0.3, 0.7, 8, X(81.6), s * 1.6, 18.27);
      sph("sup", 0.32, 8, 6, X(81.6), s * 1.6, 19.25);
    }
    /* the SPS-10 surface search: a small cheese antenna on the middle level */
    cz("dark", 0.2, 0.25, 0.6, 8, X(83.1), 0, 26.07);
    stamp(X(83.1), 0, 26.7, 0, function () {
      var NS = 8, q, Bm = cur.sup, AW = 1.35, AH = 0.55;
      function rx(y) { return -0.25 + 0.3 * (y / AW) * (y / AW); }
      for (q = 0; q < NS; q++) {
        var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
        var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
        var a1 = [rx(ya), ya, AH, 0, 1], b1 = [rx(yb), yb, AH, 1, 1];
        Bm.triOut(a0, b0, b1, [-3, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [-3, 0, AH * 0.5]);
        var a2 = [a0[0] - 0.04, a0[1], a0[2], 0, 0], b2 = [b0[0] - 0.04, b0[1], b0[2], 1, 0];
        var a3 = [a1[0] - 0.04, a1[1], a1[2], 0, 1], b3 = [b1[0] - 0.04, b1[1], b1[2], 1, 1];
        Bm.triOut(a2, b2, b3, [3, 0, AH * 0.5]); Bm.triOut(a2, b3, a3, [3, 0, AH * 0.5]);
      }
      bar("metal", -0.25, 0, AH * 0.5, 0.55, 0, AH * 0.45, 0.04);
      bx("dark", 0.2, 0.25, 0.2, 0.6, 0, AH * 0.45);
    });
    /* the SPS-37 "bedspring": a dipole curtain about 5.4 m by 3.4 m on its
       drive at the masthead, with the reflector screen behind it          */
    cz("dark", 0.35, 0.45, 0.9, 10, X(81.7), 0, FZ1 + 0.07);
    stamp(X(81.7), 0, FZ1 + 1.0, 0, function () {
      var AW = 3.0, AH = 3.8, q;
      bar("metal", 0, -AW, 0, 0, AW, 0, 0.07);
      bar("metal", 0, -AW, AH, 0, AW, AH, 0.07);
      for (q = 1; q < 7; q++) bar("metal", 0.05, -AW, q * AH / 7, 0.05, AW, q * AH / 7, 0.035);
      for (q = 0; q <= 12; q++) bar("metal", 0.06, -AW + q * AW / 6, 0, 0.06, -AW + q * AW / 6, AH, 0.035);
      /* the screen: a dark mesh panel a little behind the dipoles */
      var B = cur.mesh;
      B.tri([-0.45, -AW, 0.1, 0, 0], [-0.45, AW, 0.1, 1, 0], [-0.45, AW, AH - 0.1, 1, 1]);
      B.tri([-0.45, -AW, 0.1, 0, 0], [-0.45, AW, AH - 0.1, 1, 1], [-0.45, -AW, AH - 0.1, 0, 1]);
      for (q = -1; q <= 1; q += 2) {
        bar("metal", 0, q * AW, 0, -0.5, q * AW * 0.6, AH * 0.5, 0.04);
        bar("metal", 0, q * AW, AH, -0.5, q * AW * 0.6, AH * 0.5, 0.04);
      }
      bar("metal", 0, 0, 0, -0.5, 0, AH * 0.5, 0.06);
    });
    /* the topmast pole behind the antenna */
    tube("dark", X(81.15), 0, FZ1, X(81.15), 0, 38.8, 0.1, 0.05, 6);
    bar("dark", X(81.15), -1.2, 37.3, X(81.15), 1.2, 37.3, 0.035);

    /* ------------------------------------------- the mainmast (SPS-39) -- */
    var MZ1 = 23.2;
    tower("metal", X(57.9), X(60.0), 1.35, X(57.9), X(58.9), 0.55, Z1A, MZ1,
          [0, 0.2, 0.4, 0.6, 0.8, 1.0], 0.14, 0.045, 20.4, "dark");
    for (s = -1; s <= 1; s += 2)
      tube("metal", X(57.95), s * 0.62, 19.0, X(50.6), s * 2.9, Z1A, 0.12, 0.14, 6);
    platform(X(58.2), 0, MZ1, 1.4, 1.4, null, "dark");
    bar("dark", X(58.4), -3.6, 21.6, X(58.4), 3.6, 21.6, 0.06);
    cz("dark", 0.32, 0.4, 0.8, 10, X(57.9), 0, MZ1 + 0.07);
    /* the SPS-39: a tall slightly curved reflector leaning back, its
       serpentine feed down one edge, facing forward (p4, p12)            */
    stamp(X(58.0), 0, MZ1 + 0.9, 0, function () {
      var NS = 8, q, AW = 1.25, AH = 3.0, lean = 0.26;
      function P(y, h, d) {
        var bx2 = -0.35 * (y / AW) * (y / AW) + d;
        return [bx2 - Math.sin(lean) * h, y, Math.cos(lean) * h];
      }
      for (q = 0; q < NS; q++) {
        var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
        var a0 = P(ya, 0, 0), b0 = P(yb, 0, 0), a1 = P(ya, AH, 0), b1 = P(yb, AH, 0);
        var c0 = P(ya, 0, -0.08), d0 = P(yb, 0, -0.08), c1 = P(ya, AH, -0.08), d1 = P(yb, AH, -0.08);
        cur.sup.triOut(a0.concat([0, 0]), b0.concat([1, 0]), b1.concat([1, 1]), [-4, 0, AH * 0.5]);
        cur.sup.triOut(a0.concat([0, 0]), b1.concat([1, 1]), a1.concat([0, 1]), [-4, 0, AH * 0.5]);
        cur.sup.triOut(c0.concat([0, 0]), d0.concat([1, 0]), d1.concat([1, 1]), [4, 0, AH * 0.5]);
        cur.sup.triOut(c0.concat([0, 0]), d1.concat([1, 1]), c1.concat([0, 1]), [4, 0, AH * 0.5]);
      }
      var e0 = P(-AW, 0, 0.12), e1 = P(-AW, AH, 0.12);
      bar("dark", e0[0], e0[1], e0[2], e1[0], e1[1], e1[2], 0.12);
      var f0 = P(AW, 0, 0.02), f1 = P(AW, AH, 0.02);
      bar("metal", f0[0], f0[1], f0[2], f1[0], f1[1], f1[2], 0.06);
      bx("sup", 0.6, 0.8, 0.4, -0.2, 0, -0.05);
    });

    /* ------------------------------------------ the SPG-51 illuminators -- */
    /* the low one on the house roof aft, the high one on its round tower
       ahead of it, both on the 02-level house abaft the after stack (p1,
       p6, p7, p13). Each: pedestal, yoke, the 2.4 m dish and its feed boom */
    var SH = [[X(37.6), -3.0], [X(47.2), -3.0], [X(47.2), 3.0], [X(37.6), 3.0]], ZS = 10.9;
    prism("sup", SH, Z1A, ZS, 0.1, 4.0, "deck");
    railRoof(roofOf(SH, 0.1, 0.1), ZS, null, 1.6);
    function spg51(x, y, z, yaw, el) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.55, 0.65, 0.55, 12, 0, 0, 0);
        bx("sup", 0.75, 2.0, 0.3, 0, 0, 0.7);
        bx("sup", 0.5, 0.18, 1.3, 0, 0.92, 1.45);
        bx("sup", 0.5, 0.18, 1.3, 0, -0.92, 1.45);
        cx("sup", 0.3, 0.3, 1.9, 8, -0.95, 0, 1.95);
        var ce = Math.cos(el), se = Math.sin(el);
        var g = new THREE.CylinderGeometry(1.2, 0.4, 0.5, 18, 1, false);
        g.rotateZ(-PI / 2); g.rotateY(-el); g.translate(0.1, 0, 1.95);
        cur.sup.add(g);
        /* the boom from the dish's back up and over to the feed at the focus */
        var fx = 0.35 + 1.1 * ce, fz = 1.95 + 1.1 * se;
        bar("metal", -0.2, 0, 1.95 + 1.1, fx - 0.2, 0, fz + 1.5, 0.06);
        bar("metal", fx - 0.2, 0, fz + 1.5, fx, 0, fz, 0.045);
        bx("dark", 0.3, 0.25, 0.3, fx, 0, fz);
        bar("metal", 0.35 - se * 1.15, 0, 1.95 + ce * 1.15, fx, 0, fz, 0.025);
      });
    }
    cz("sup", 0.5, 0.6, 0.6, 12, X(39.6), 0, ZS);
    spg51(X(39.6), 0, ZS + 0.6, -0.55, 0.22);
    cz("sup", 1.25, 1.3, 4.2, 18, X(45.2), 0, ZS);
    cz("sup", 1.55, 1.55, 0.14, 18, X(45.2), 0, ZS + 4.2);
    railRing(X(45.2), 0, ZS + 4.34, 1.48, 10);
    spg51(X(45.2), 0, ZS + 4.34, -0.4, 0.18);

    /* ------------------------------------------ the 5-inch/54 Mk 42s ---- */
    /* the rounded gun house about 6.2 m by 4.5 m (p11), the barrel low in the
       front, two sight hoods on the roof's front corners (p12)              */
    function gun() {
      cz("sup", 2.3, 2.4, 0.25, 24, 0, 0, 0);
      loftX("sup", [[-2.95, 1.85, 0.25, 2.7], [-2.75, 2.15, 0.25, 3.1], [-1.2, 2.25, 0.25, 3.3],
                    [0.6, 2.2, 0.25, 3.27], [1.75, 1.98, 0.25, 3.0], [2.6, 1.55, 0.25, 2.45],
                    [3.15, 0.9, 0.3, 1.75]], 18, 0.36);
      cx("dark", 0.5, 0.3, 0.7, 12, 2.55, 0, 1.25);
      cx("metal", 0.17, 0.13, 4.6, 12, 3.1, 0, 1.25);
      cx("metal", 0.155, 0.155, 0.25, 12, 7.45, 0, 1.25);
      for (var q = -1; q <= 1; q += 2) hemi("sup", 0.42, 10, 4, 0.9, q * 1.3, 3.12);
      bx("sup", 0.9, 1.0, 0.1, -1.4, 0, 3.27);
      bx("dark", 0.06, 0.8, 1.4, -2.98, 0, 1.2);
    }
    /* the forward mount trains: the node the renderer aims */
    var X_GUN = X(109.6), tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_GUN, 0, topZ(X_GUN, 0));
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    /* the after mount on the after deckhouse, trained aft (p7, p11) */
    stamp(X(32.4), 0, Z1A, PI, gun);

    /* ------------------------------------------- the Mk 11 launcher ---- */
    /* the twin-arm launcher on the round after end of the after deckhouse,
       trained aft, a Tartar slung under each arm (p1, p7, p12)              */
    function tartar(px, pz, e, y) {
      var ce = Math.cos(e), se = Math.sin(e);
      function P(d, h) { return [px + d * ce - h * se, y, pz + d * se + h * ce]; }
      var a = P(-0.75, -0.62), b = P(3.25, -0.62), n0 = P(3.25, -0.62), n1 = P(3.9, -0.62);
      rod("light", a[0], a[1], a[2], b[0], b[1], b[2], 0.17, 10);
      var g = new THREE.ConeGeometry(0.17, 0.65, 10);
      g.rotateZ(-PI / 2); g.rotateY(-e);
      cur.light.add(place(THREE, g, (n0[0] + n1[0]) * 0.5, y, (n0[2] + n1[2]) * 0.5));
      /* four long strakes and four tail fins */
      for (var q = 0; q < 4; q++) {
        var an = PI / 4 + q * PI / 2, oy = Math.cos(an), oz = Math.sin(an);
        var s0 = P(0.1, -0.62), s1 = P(2.3, -0.62), t0 = P(-0.75, -0.62), t1 = P(-0.3, -0.62);
        bar("light", s0[0], y + oy * 0.27, s0[2] + oz * 0.27, s1[0], y + oy * 0.27, s1[2] + oz * 0.27, 0.07);
        bar("light", t0[0], y + oy * 0.36, t0[2] + oz * 0.36, t1[0], y + oy * 0.3, t1[2] + oz * 0.3, 0.09);
      }
    }
    stamp(X(16.8), 0, Z1A, PI, function () {
      cz("sup", 1.75, 1.9, 0.45, 22, 0, 0, 0);
      cz("sup", 1.2, 1.35, 1.0, 18, 0, 0, 0.45);
      bx("sup", 1.5, 1.35, 1.1, -0.1, 0, 1.95);
      var e = 0.2, pz = 2.35, q;
      for (q = -1; q <= 1; q += 2) {
        var y = q * 0.98, ce = Math.cos(e), se = Math.sin(e);
        bx("sup", 3.9, 0.36, 0.42, 0.2 + 1.6 * ce, y, pz + 1.6 * se, 0, -e, 0);
        bx("metal", 3.7, 0.14, 0.12, 0.2 + 1.7 * ce + 0.3 * se, y, pz + 1.7 * se - 0.3 * ce, 0, -e, 0);
        bx("sup", 0.5, 0.5, 0.7, -0.75 + 0.1 * ce, y, pz - 0.05, 0, -e, 0);
        tartar(0.2, pz, e, y);
      }
    });

    /* ------------------------------------------------ the ASROC box ---- */
    /* the Mk 112 "matchbox": eight cells in two halves on a training stand,
       stowed level, on its raised deck between the stacks (p4, p11)        */
    stamp(X(68.5), 0, 7.1, 0, function () {
      cz("sup", 1.5, 1.6, 0.4, 18, 0, 0, 0);
      bx("sup", 1.8, 2.8, 0.8, -0.3, 0, 0.8);
      for (var q = -1; q <= 1; q += 2) {
        bx("sup", 1.1, 0.25, 1.2, -0.3, q * 1.9, 1.3);
        bx("sup", 5.2, 1.75, 1.3, 0.2, q * 0.94, 1.87);
        for (var a = 0; a < 2; a++) for (var b = 0; b < 2; b++)
          bx("dark", 0.06, 0.68, 0.52, 2.81, q * 0.94 + (a - 0.5) * 0.78, 1.56 + b * 0.62);
        bx("sup", 0.12, 1.55, 0.08, -2.4, q * 0.94, 2.55);
      }
    });

    /* --------------------------------------------- the Mk 32 torpedo tubes */
    /* a triple mount each side on the waist abreast the ASROC deck, the
       tubes stacked one over another and trained forward and out (p1)      */
    function mk32(x, y, side) {
      stamp(x, y, topZ(x, y) - 0.02, side * 0.32, function () {
        cz("sup", 0.4, 0.5, 0.55, 10, 0, 0, 0);
        bx("sup", 0.6, 0.9, 1.0, -0.1, 0, 1.0);
        for (var q = 0; q < 3; q++) {
          var zq = 0.75 + q * 0.42, yq = (q === 1 ? 0.18 : -0.08) * side;
          rod("sup", -1.55, yq, zq, 1.6, yq, zq, 0.2, 8);
          cz("dark", 0.15, 0.15, 0.02, 8, 1.6, yq, zq);
          cx("dark", 0.16, 0.16, 0.03, 8, 1.6, yq, zq);
        }
        bx("sup", 0.2, 0.55, 1.25, -1.62, 0.05 * side, 1.15);
      });
    }
    mk32(X(64.0), 6.2, 1); mk32(X(64.0), -6.2, -1);

    /* ------------------------------------------- the whaleboats ---- */
    /* two 26-ft motor whaleboats in davits abreast the after stack (p11,
       p12): the hull, the canopy over the after half, and gravity davits */
    function boat(xc, yc, zk) {
      stamp(xc, yc, zk, 0, function () {
        var L = 3.95, B = 1.18;
        loftX("sup", [[-L, B * 0.75, 0.35, 1.12], [-L + 0.45, B * 0.95, 0.08, 1.15],
                      [-L * 0.3, B, 0.0, 1.15], [L * 0.35, B * 0.93, 0.06, 1.18],
                      [L * 0.72, B * 0.62, 0.25, 1.22], [L * 0.94, B * 0.22, 0.6, 1.25],
                      [L, 0.01, 0.9, 1.25]], 12, 0.55);
        bx("sup", 2.6, 1.7, 0.7, -1.0, 0, 1.5);
        var cg = new THREE.CylinderGeometry(0.85, 0.85, 2.6, 10, 1, false, 0, PI);
        cg.rotateZ(PI / 2); cg.rotateX(PI / 2);
        cur.sup.add(place(THREE, cg, -1.0, 0, 1.85));
        bx("dark", 0.5, 0.06, 0.3, 1.2, 1.12, 0.95);
        bx("dark", 0.5, 0.06, 0.3, 1.2, -1.12, 0.95);
      });
    }
    for (s = -1; s <= 1; s += 2) {
      var BY = s * 6.0, BX = X(53.4);
      boat(BX, BY, 6.05);
      for (j = -1; j <= 1; j += 2) {
        var DXb = BX + j * 4.3, base = s * 5.2;
        bx("sup", 0.5, 1.2, 0.4, DXb, s * 5.3, topZ(DXb, 5.3) + 0.2);
        tube("metal", DXb, base, topZ(DXb, 5.3), DXb, s * 5.6, 8.9, 0.16, 0.12, 6);
        tube("metal", DXb, s * 5.6, 8.9, DXb, BY + s * 0.35, 9.35, 0.12, 0.1, 6);
        bar("metal", DXb, BY + s * 0.3, 9.3, DXb, BY, 7.4, 0.02);
      }
    }

    /* ------------------------------------------------ deck gear ---- */
    /* life rafts in canisters along the 01-level edges (p12) */
    function raft(x, y, z) {
      var g = new THREE.CylinderGeometry(0.3, 0.3, 1.25, 8, 1, false);
      g.rotateZ(PI / 2);
      cur.light.add(place(THREE, g, x, y, z + 0.34));
      bx("dark", 1.0, 0.5, 0.08, x, y, z + 0.04);
    }
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 4; j++) raft(X(86.5) + j * 1.45, s * (hullHW(X(86.5) + j * 1.45) - 0.7), z01(X(86.5) + j * 1.45));
      for (j = 0; j < 3; j++) raft(X(22.5) + j * 1.45, s * 3.7, Z1A);
    }
    /* vent trunks and lockers on the roofs */
    [[X(62.0), 4.4], [X(62.0), -4.4], [X(48.6), 3.8], [X(48.6), -3.8], [X(40.0), 3.9], [X(40.0), -3.9]].forEach(function (p) {
      var zz = p[0] > X(60) ? 7.1 : Z1A;
      bx("sup", 1.1, 0.8, 0.8, p[0], p[1], zz + 0.4);
      bx("dark", 0.06, 0.6, 0.45, p[0] + 0.58, p[1], zz + 0.45);
    });
    [[X(74.4), 5.0], [X(74.4), -5.0], [X(72.9), 3.6], [X(72.9), -3.6]].forEach(function (p) {
      bx("sup", 1.4, 0.9, 0.9, p[0], p[1], z01(p[0]) + 0.45);
      bx("dark", 0.06, 0.7, 0.5, p[0] + 0.72, p[1], z01(p[0]) + 0.5);
    });
    /* watertight doors in the after deckhouse sides */
    for (s = -1; s <= 1; s += 2) {
      [X(26.0), X(41.0), X(57.0)].forEach(function (x) {
        var hw = x > X(44) ? 4.8 : (x > X(30) ? 4.65 : 4.45);
        plate("dark", frameN(x, s * (hw + 0.01), deckZ(x), 0, s), rectPts(-0.42, 0.1, 0.42, 1.95), -0.01, 0.05);
      });
    }
    /* the deck-edge lifelines all round */
    for (s = -1; s <= 1; s += 2) {
      var ep = [], ex = X(0.8);
      while (ex < X(131.6)) {
        if (ex > X(71.6) && ex < X(100.4)) { ex = X(100.4); continue; }
        ep.push([ex, s * (hullHW(ex) - 0.12), deckZ(ex) + 0.08]);
        ex += (ex > X(30) && ex < X(110)) ? 5.0 : 3.0;
      }
      ep.push([X(131.6), s * (hullHW(X(131.6)) - 0.1), deckZ(X(131.6)) + 0.08]);
      var aftRun = ep.filter(function (p) { return p[0] <= X(71.7); });
      var fwdRun = ep.filter(function (p) { return p[0] >= X(100.3); });
      railRun("metal", aftRun, 1.0, 2.0);
      railRun("metal", fwdRun, 1.0, 2.0);
    }
    railRun("metal", [[X(0.8), -(hullHW(X(0.8)) - 0.12), deckZ(X(0.8)) + 0.08],
                      [X(0.8), hullHW(X(0.8)) - 0.12, deckZ(X(0.8)) + 0.08]], 1.0, 2.0);
    /* bitts along the sides, on the fantail and the forecastle */
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      bx("sup", 1.4, 0.55, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.18, 0.2, 0.55, 8, x - 0.42, y, z0);
      cz("metal", 0.18, 0.2, 0.55, 8, x + 0.42, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(X(3.5), s * 4.0); bitts(X(12.0), s * 5.0); bitts(X(46.0), s * 6.2);
      bitts(X(104.0), s * 4.6); bitts(X(126.0), s * 1.9);
    }
    /* ensign staff and jackstaff, bare */
    bar("metal", X(0.6), 0, deckZ(X(0.6)), X(0.6), 0, deckZ(X(0.6)) + 4.4, 0.06);
    bar("metal", X(132.4), 0, deckZ(X(132.4)) + 0.04, X(132.4), 0, deckZ(X(132.4)) + 3.4, 0.055);
    /* tall whips: at the forecastle's sides and on the after deckhouse */
    for (s = -1; s <= 1; s += 2) {
      bar("metal", X(101.5), s * (hullHW(X(101.5)) - 0.3), deckZ(X(101.5)),
          X(101.6), s * (hullHW(X(101.5)) + 0.1), deckZ(X(101.5)) + 9.0, 0.045);
      bar("metal", X(36.0), s * 4.2, Z1A, X(36.1), s * 4.5, Z1A + 8.0, 0.045);
    }
    /* team colour, modest: a stripe lying on the forecastle ahead of the gun,
       where the camera looks down on it                                    */
    flat("team", X(116.0), -1.9, X(120.0), 1.9, topZ(X(118.0), 0) + 0.05, 0, 0, 1, 1);

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e60_destroyer"] = {
  len: 133.2,
  build: function (THREE, M, C) { return HeroAdamsDDG.build(THREE, M, C); }
};
