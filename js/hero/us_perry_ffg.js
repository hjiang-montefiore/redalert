/* ============================================================================
   us_perry_ffg.js -- HERO model: the Oliver Hazard Perry class guided
   missile frigate (FFG-7), in the two periods the roster draws her.

     nato_e80_corvette  USS Oliver Hazard Perry (FFG-7) herself: the 445 ft
                        SHORT hull she kept all her life (she is not among
                        the long-hull ships FFG 8, 28, 29, 32, 33 and 36-61),
                        the plain vertical transom and a LAMPS I deck with
                        no RAST track. No Phalanx: she is photographed
                        without one in 1977, 1979 and 1982 and the row's
                        weapons carry none.
     nato_e90_corvette  the class in the 1990s, drawn as the long hull that
                        made up most of the active ships (thirty of the 51;
                        twenty-five short hulls went to the reserve, to allies
                        or to the breakers after about 18 years): the stern
                        lengthened 8 ft with a raked transom, the RAST track
                        down the flight deck, the capstan in a well a step
                        below it, and the Mk 15 Phalanx on the hangar roof
                        (on the 1987 FFG-60 plan; Stark had hers in 1987).

   References: the NAVSHIPS outboard profile and main deck plan of FFG-60
   (long hull, 1/8 in = 1 ft, with heights above the baseline: main deck
   41'-10" at the stem, 02 level 50'-8 3/4", 03 level 59'-6 3/4", SPS-49
   platform 79'-10", mainmast platform 106'-6", design waterline 14'-4");
   the Polish Navy class silhouette; the vertical photograph of USS Carr
   (FFG-52) on builder's trials and her stern view; USS Reuben James (FFG-57)
   from the starboard beam; FFG-7 underway in late 1977 (starboard beam),
   on Lake Erie in 1979 (starboard bow) and alongside Luetjens in 1994 (bow
   on); FFG-7, Antrim and Jack Williams in 1982 (port bows); Flatley
   (FFG-21) on acceptance trials (starboard quarter). Published figures:
   445 ft (135.6 m) short hull, 453 ft (138.1 m) long hull, 45 ft (13.7 m)
   beam.

   RECOGNITION (each one checked against the references above):
     1. a long low flush hull with a sharply raked straight stem and a
        strongly flared, narrow forecastle (profile, plan, 1982 bows);
     2. the single-arm Mk 13 launcher alone on the forecastle, on its round
        magazine top (profile "MK 13 GMLS LCHR", plan, every bow photo);
     3. the boxy deckhouse running from the forecastle break to the flight
        deck, flush with the hull sides at the hangar and pinched in at the
        waist where the boat and torpedo tubes sit (plan, 1982 port bow);
     4. the pilot house with its window band and the Mk 92 CAS radome on a
        short lattice tower on its roof (profile "CAS ANTENNA", 1994 bow);
     5. the SPS-49 on its own slim lattice foremast (profile "FOREMAST
        (SPS49 SPRT)", 1979 and 1982 photographs);
     6. the tall tapered lattice mainmast with its platforms, yards and the
        TACAN at the top (profile, every photograph);
     7. the STIR dish on its lattice pedestal abaft the mainmast (profile
        "STIR ANT", 1982 zoom);
     8. the OTO Melara 76 mm Mk 75 on the deckhouse roof amidships (profile
        "76 MM SINGLE MT", Carr overhead, 1979 bow);
     9. the single squat, round-ended stack abaft the gun, its top dark with
        the two uptakes (profile "STACK", Carr overhead and stern);
    10. the full-width twin hangar with two roller doors over a flight deck
        that runs to the stern, nets along its edges (Carr stern, Flatley);
    11. the Phalanx on the hangar roof in the 1990s (FFG-60 plan "CIWS",
        Carr stern) and not in the early 1980s (1977, 1979, 1982 photos);
    12. the boat in davits on the port side of the waist (1982 port bow,
        Carr stern; the 1979 starboard view shows none on that side).

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -4.36
   (the sonar dome a little below it). Distances on the plan are read in
   feet aft of the forward perpendicular (f) and set down with X(f) and
   Z(ft above baseline) below, so the numbers can be checked against the
   drawing. render3d.js scales the model by its X extent: nothing stands
   past the stem or the transom.

   Paint: US haze grey. Sampled off the sunlit 1982 photograph: hull about
   (177,178,179), deckhouse (199,200,202), the hull 0.89 of the house; the
   house is set at 0x737a81, the level the accepted US flat-tops sit at
   after the 0.9 rule, and the hull at 0.89 of it. No hull numbers, names
   or flags.

   Materials (9): hull, weather deck, deckhouse plate, flight deck, radome
   white, dark, bare metal, glass and the team material (exactly C.team,
   kept to the landing circle and a stripe on the forecastle). Every static
   part is merged into one mesh per material; the 76 mm is the one mount
   named "turret", its origin on the ring centre, the barrel along +X.
   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPerryFFG = (function () {
  "use strict";

  var PI = Math.PI, FT = 0.3048, F0 = 195;
  /* f = feet aft of the forward perpendicular, ft = feet above baseline */
  function X(f) { return (F0 - f) * FT; }
  function Z(ft) { return (ft - 14.3) * FT; }
  function fOf(x) { return F0 - x / FT; }
  var XSTEM = X(-31.5);                       /* 69.04: the stem head          */
  var ZTOP = 9.0, ZBOT = -1.5;                /* the span the hull canvas covers */

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
     All read off the FFG-60 plan. The main deck: "curved sheer forward of
     FR 410, parallel to baseline aft, no camber"; heights in feet above
     the baseline at the deck edge.                                        */
  var DK_F = [[-31.5, 42.0], [0, 40.3], [30, 38.6], [60, 36.8], [100, 35.0],
              [150, 33.6], [200, 32.3], [260, 31.0], [330, 30.1], [430, 30.1]];
  function deckZ(x) { return Z(tbl(DK_F, fOf(x))); }
  /* deck half breadth in feet: the plan's deck edge                       */
  var W_F = [[-31.5, 0.15], [-27, 1.0], [-22, 1.6], [-16, 2.5], [-10, 3.5],
             [-4, 4.4], [0, 5.0], [10, 7.5], [20, 10.0], [30, 12.0], [40, 14.0],
             [50, 16.0], [60, 17.5], [80, 20.0], [100, 21.3], [130, 22.2],
             [150, 22.5], [330, 22.5], [360, 22.3], [390, 21.6], [410, 20.8],
             [414, 20.5], [418, 20.0], [422, 18.8]];
  function halfB(x) { return tbl(W_F, fOf(x)) * FT; }
  /* 0 = the full midship section, 1 = the fine flared entry              */
  var VB_F = [[-31.5, 1.0], [-10, 0.95], [9, 0.8], [26, 0.6], [50, 0.35],
              [80, 0.15], [120, 0.0], [280, 0.0], [330, 0.05], [430, 0.12]];
  /* the stations: [f at the deck edge, rake aft of the low points (ft),
     keel height (ft above the waterline)]. The bow stations lean so their
     feet trace the cut-away forefoot from the FP at the waterline down to
     the keel at frame 30; the stem is the first station, straight from the
     stem head to the FP, as drawn. The keel runs up from frame 270 to the
     transom, which meets the waterline.                                   */
  var ST_BOW = [[-31.5, 31.5, 0.0], [-27, 28.0, -3.7], [-22, 26.0, -7.15],
                [-16, 24.8, -10.1], [-10, 25.0, -12.4], [-4, 26.2, -13.8],
                [2, 28.0, -14.3], [9, 24.0, -14.3], [17, 18.0, -14.3],
                [26, 12.0, -14.3], [36, 6.0, -14.3], [48, 0, -14.3],
                [62, 0, -14.3], [80, 0, -14.3], [100, 0, -14.3], [125, 0, -14.3],
                [155, 0, -14.3], [190, 0, -14.3], [230, 0, -14.3], [270, 0, -14.3],
                [300, 0, -13.2], [330, 0, -10.8], [355, 0, -8.0], [375, 0, -5.6],
                [392, 0, -3.4], [404, 0, -1.9]];
  /* the short hull ends square at frame 414; the long hull's 8 ft runs on
     to 422 over a transom raked forward to the waterline at frame 410    */
  var ST_SHORT = [[414, 0, -1.0]];
  var ST_LONG = [[410, -1.0, -1.3], [416, -6.0, -1.15], [422, -11.0, -1.0]];

  var SEC_FULL = [[1.000, 1.000], [1.000, 0.800], [0.998, 0.620], [0.990, 0.470],
                  [0.972, 0.350], [0.935, 0.250], [0.868, 0.168], [0.760, 0.100],
                  [0.600, 0.050], [0.410, 0.018], [0.205, 0.004], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.900, 0.800], [0.790, 0.620], [0.680, 0.470],
                  [0.575, 0.350], [0.475, 0.250], [0.380, 0.168], [0.285, 0.100],
                  [0.195, 0.050], [0.115, 0.018], [0.050, 0.004], [0.000, 0.000]];
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
     Painted once per page and hull length.                                */
  var _tx = {};
  function textures(THREE, longHull) {
    var k = longHull ? "L" : "S";
    if (_tx[k]) return _tx[k];
    var base = _tx.S || _tx.L;
    _tx[k] = { hull: hullTex(THREE, longHull),
               sup: base ? base.sup : supTex(THREE),
               deck: base ? base.deck : deckTex(THREE),
               pad: padTex(THREE, longHull) };
    return _tx[k];
  }

  /* the hull canvas: u runs along her length, v is real height           */
  function hullTex(THREE, longHull) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(70707), i, j, x, z;
    var XA = longHull ? X(422) : X(414), L = XSTEM - XA;
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx - XA) / L * W; }
    g.fillStyle = "#666d73"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 80; i++) {
      g.globalAlpha = 0.018 + R() * 0.028;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 200, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling under the boot topping, the black band at the waterline */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.4), W, H - Y(-0.4));
    g.fillStyle = "#16191c"; g.fillRect(0, Y(0.7), W, Y(-0.4) - Y(0.7));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.7) - 1, W, 1.5);
    /* strake seams at real heights, and the butts staggered along them */
    var STR = [1.6, 2.9, 4.2, 5.5, 6.8, 8.1];
    g.lineWidth = 1.2;
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
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
    /* scuppers under the deck edge, some weeping rust                    */
    for (i = 0; i < 40; i++) {
      x = XA + 4 + (i / 39) * (L - 12);
      z = deckZ(x) - 0.7;
      g.globalAlpha = 0.32; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 3, Y(z) - 2, 6, 4);
      if (R() < 0.5) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 2, 4, (0.8 + R() * 2.0) * (H / (ZTOP - ZBOT)));
    }
    /* exhaust staining streaming aft from the stack                      */
    for (j = 0; j < 140; j++) {
      var fr = R();
      x = X(276) - fr * 28;
      z = deckZ(x) - 0.3 - R() * 2.6;
      g.globalAlpha = 0.035 * (1 - fr) + 0.006; g.fillStyle = "#2a2d30";
      g.fillRect(U(x), Y(z), 8 + R() * 28, 4 + R() * 10);
    }
    g.globalAlpha = 1;
    /* draught marks at bow and stern                                     */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? X(4) : XA + 2.5;
      for (j = 0; j <= 8; j++) g.fillRect(U(x) - 5, Y(-0.3 + j * 0.5), j % 2 ? 6 : 10, 2);
    }
    /* the shadow line under the deck edge                                */
    g.globalAlpha = 0.26; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = XA + (i / W) * L;
      g.fillRect(i, Y(deckZ(x)) - 1, 4, 5);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, false);
  }

  /* deckhouse plating, 4 m a tile. Haze grey 0x737a81                   */
  function supTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(31337), i;
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
    var R = rng(8811), i;
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

  /* the flight deck, u from the hangar face (0) to the deck's after edge
     (1), v across from starboard (0) to port (1). Carr's vertical and
     stern photographs: the white deck-edge outline, the lineup line from
     the hangar doors to the stern, the landing circle crossed by a dashed
     athwart line, a second dashed line nearer the hangar; on the long hull
     the RAST traversing track runs down the middle from the hangar       */
  function padTex(THREE, longHull) {
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(longHull ? 4021 : 4022), i, j;
    var LEN = longHull ? (422 - 329.5) : (414 - 329.5);
    function U(ft) { return ft / LEN * W; }            /* feet aft of the hangar */
    function V(ft) { return H * 0.5 - ft / 45 * H; }   /* feet to port            */
    g.fillStyle = "#43484d"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#33383c" : "#53595e";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 2600; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.55; g.fillStyle = "#1c1f22";
    for (i = 1; i < 14; i++) for (j = 1; j < 7; j++) g.fillRect(W * i / 14 - 3, H * j / 7 - 3, 6, 6);
    g.globalAlpha = 1;
    g.strokeStyle = "#d8dbd4"; g.fillStyle = "#d8dbd4";
    /* deck-edge outline, inset a foot or two                             */
    g.lineWidth = 5;
    g.strokeRect(U(2.5), V(19.5), U(LEN - 6) - U(2.5), V(-19.5) - V(19.5));
    /* RAST traversing track (long hull): its steel rails either side of
       the centreline from the hangar door to the landing area            */
    if (longHull) {
      g.fillStyle = "#2a2e31";
      g.fillRect(U(0), V(1.9), U(52) - U(0), V(1.0) - V(1.9));
      g.fillRect(U(0), V(-1.0), U(52) - U(0), V(-1.9) - V(-1.0));
      g.fillStyle = "#d8dbd4";
    }
    /* lineup line, hangar to stern (Carr's vertical)                     */
    g.fillRect(U(0), V(0.5), U(LEN - 3) - U(0), V(-0.5) - V(0.5));
    /* landing circle and its dashed athwart line                         */
    var CX = longHull ? 46 : 42;
    g.lineWidth = 6; g.beginPath();
    g.ellipse(U(CX), V(0), U(CX + 12) - U(CX), (V(-12) - V(12)) * 0.5, 0, 0, 2 * PI);
    g.stroke();
    for (i = -9; i <= 9; i++) if (i % 2 === 0) g.fillRect(U(CX) - 3, V(i * 2 + 1.4), 6, V(i * 2 - 1.4) - V(i * 2 + 1.4));
    for (i = -9; i <= 9; i++) if (i % 2 === 0) g.fillRect(U(CX - 22) - 3, V(i * 2 + 1.4), 6, V(i * 2 - 1.4) - V(i * 2 + 1.4));
    return tex(THREE, cv, false);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team, longHull) {
    var T = textures(THREE, longHull), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.pad   = S({ map: T.pad, roughness: 0.95, metalness: 0.04,
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
  function mv(poly, dx, dy) {
    return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; });
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }
  /* a plan polygon given in (f, feet to port), turned into model metres  */
  function plan(pts) { return pts.map(function (p) { return [X(p[0]), p[1] * FT]; }); }

  /* ================================================================ the hull */
  function stations(longHull) {
    return ST_BOW.concat(longHull ? ST_LONG : ST_SHORT);
  }
  function hullMesh(THREE, mtl, longHull) {
    var ST = stations(longHull), pos = [], uv = [], idx = [], i, j, R = 0;
    var XA = longHull ? X(422) : X(414), L = XSTEM - XA;
    for (i = 0; i < ST.length; i++) {
      var f = ST[i][0], x0 = X(f), r = ringOf(tbl(VB_F, f));
      var w = halfB(x0), kz = ST[i][2] * FT, dz = deckZ(x0), dep = dz - kz;
      var rk = ST[i][1] * FT;
      for (j = 0; j < r.length; j++) {
        var z = kz + dep * r[j][1];
        pos.push(x0 - rk * (1.0 - r[j][1]), w * r[j][0], z);
        uv.push((x0 - XA) / L, (z - ZBOT) / (ZTOP - ZBOT));
      }
      R = r.length;
    }
    /* rings run stern to bow, so (a, d, b) winds outward                 */
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
      pos.push(cx, cy, cz); uv.push(sIdx ? 1 : 0, (cz - ZBOT) / (ZTOP - ZBOT));
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
    return new THREE.Mesh(g, mtl);
  }

  /* =============================================================== assembly */
  function build(THREE, MOD, C, V) {
    V = V || {};
    var LH = !!V.longHull;
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var M = makeMats(THREE, team, LH);
    var G = new THREE.Group();
    var KEYS = ["deck", "sup", "pad", "rad", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, j, s;
    var FSTERN = LH ? 422 : 414, XA = X(FSTERN);

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
    /* a faceted block: plan polygon (convex, counter-clockwise) from z0 to
       a roof whose height is zt(x) -- a plane, so the roof can follow the
       sheer -- the top inset `ins` metres so the walls lean in             */
    function prism(k, poly, z0, zt, ins, US, noCap) {
      var bb = bboxOf(poly), n = poly.length, B = cur[k], q, per = 0;
      var sx = (bb.w - 2 * (ins || 0)) / bb.w, sy = (bb.h - 2 * (ins || 0)) / bb.h;
      var ZT = typeof zt === "function" ? zt : function () { return zt; };
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
        B.tri(A0, B0, B1); B.tri(A0, B1, A1);
      }
      if (!noCap) {
        var zc = ZT(bb.cx);
        for (q = 0; q < n; q++) {
          var p = top(poly[q]), r = top(poly[(q + 1) % n]);
          B.tri([bb.cx, bb.cy, zc, bb.cx / US, bb.cy / US], [p[0], p[1], ZT(p[0]), p[0] / US, p[1] / US],
                [r[0], r[1], ZT(r[0]), r[0] / US, r[1] / US]);
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
    function railRing(x, y, z, r, n) {
      var pts = [], q;
      for (q = 0; q <= n; q++) {
        var an = 2 * PI * q / n;
        pts.push([x + r * Math.cos(an), y + r * Math.sin(an), z]);
      }
      railRun("metal", pts, 0.95, 9);
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
    function topZ(x) { return deckZ(x) + 0.05; }

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull, LH); hull.name = "hull"; G.add(hull);

    /* the weather deck, flat across (no camber), from the stem head to the
       hangar face; the flight deck aft of it is the pad                   */
    (function () {
      var FR = [-31.0, -27, -22, -16, -10, -4, 2, 9, 17, 26, 36, 48, 62, 80, 100,
                125, 155, 190, 230, 270, 300, 329.5], KY = [-1, -0.55, 0, 0.55, 1];
      for (i = 0; i < FR.length - 1; i++) {
        var xa = X(FR[i]), xb = X(FR[i + 1]), wa = halfB(xa) - 0.03, wb = halfB(xb) - 0.03;
        var za = topZ(xa), zb = topZ(xb);
        for (j = 0; j < KY.length - 1; j++) {
          var A0 = [xa, wa * KY[j], za, xa / 5.5, wa * KY[j] / 5.5];
          var A1 = [xa, wa * KY[j + 1], za, xa / 5.5, wa * KY[j + 1] / 5.5];
          var B0 = [xb, wb * KY[j], zb, xb / 5.5, wb * KY[j] / 5.5];
          var B1 = [xb, wb * KY[j + 1], zb, xb / 5.5, wb * KY[j + 1] / 5.5];
          cur.deck.tri(A0, A1, B1); cur.deck.tri(A0, B1, B0);
        }
      }
    })();

    /* the flight deck: ONE flat level pad, hangar face to the after edge.
       render3d's deckOf reads her deck level off her after eighth and
       padSpot takes the largest level stretch reaching into her after
       fifth -- this pad, walled off from the waist by the full-width
       hangar. Nothing on it stands proud but the low capstan.             */
    var ZP = Z(30.1) + 0.06, FH = 329.5;
    (function () {
      var FS = [FH, 345, 360, 375, 390, 400, 410, FSTERN - 0.5];
      var LEN = FSTERN - FH;
      for (i = 0; i < FS.length - 1; i++) {
        var xa = X(FS[i]), xb = X(FS[i + 1]);
        var wa = halfB(xa) - 0.02, wb = halfB(xb) - 0.02;
        var ua = (FS[i] - FH) / LEN, ub = (FS[i + 1] - FH) / LEN;
        var A0 = [xa, -wa, ZP, ua, 0.5 - wa / (45 * FT)], A1 = [xa, wa, ZP, ua, 0.5 + wa / (45 * FT)];
        var B0 = [xb, -wb, ZP, ub, 0.5 - wb / (45 * FT)], B1 = [xb, wb, ZP, ub, 0.5 + wb / (45 * FT)];
        cur.pad.tri(A0, A1, B1); cur.pad.tri(A0, B1, B0);
      }
    })();
    /* the landing circle in the team colour, lying on the deck            */
    var CXF = FH + (LH ? 46 : 42);
    cur.team.add(place(THREE, new THREE.RingGeometry(3.35, 3.75, 36), X(CXF), 0, ZP + 0.05));
    /* the capstan: in a well a step below the deck on the long hull, on the
       deck at the stern on the short one                                  */
    if (LH) {
      flat("dark", X(421.2), -1.8, X(415.0), 1.8, ZP + 0.012, 0, 0, 1, 1);
      cz("metal", 0.32, 0.38, 0.3, 10, X(418.3), 0, ZP - 0.05);
    } else {
      cz("metal", 0.32, 0.38, 0.55, 10, X(410.5), 0, ZP - 0.05);
    }
    /* safety nets hinged out from the deck edge, along both sides and
       round the stern, and the stern rail posts folded flat              */
    function nets(x0, y0, x1, y1, ox, oy) {
      var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      var n = Math.max(1, Math.round(L / 2.4)), q, w = 1.1;
      for (q = 0; q <= n; q++) {
        var f = q / n, x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
        bar("metal", x, y, ZP - 0.04, x + ox * w, y + oy * w, ZP + 0.02, 0.035);
      }
      bar("metal", x0 + ox * w, y0 + oy * w, ZP + 0.02, x1 + ox * w, y1 + oy * w, ZP + 0.02, 0.04);
      var Cn = [(x0 + x1) * 0.5, (y0 + y1) * 0.5, ZP - 6];
      var A0 = [x0, y0, ZP - 0.06, 0, 0], A1 = [x1, y1, ZP - 0.06, 1, 0];
      var B0 = [x0 + ox * w, y0 + oy * w, ZP - 0.01, 0, 1], B1 = [x1 + ox * w, y1 + oy * w, ZP - 0.01, 1, 1];
      cur.dark.triOut(A0, A1, B1, Cn); cur.dark.triOut(A0, B1, B0, Cn);
    }
    var NS = [FH + 1, 360, 390, FSTERN - 1];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < NS.length - 1; i++) {
        var xa = X(NS[i]), xb = X(NS[i + 1]);
        var ya = s * halfB(xa), yb = s * halfB(xb);
        nets(xa, ya, xb, yb, 0, s);
      }
    }
    /* (the stern nets fold inboard here: past the transom they would set the
       model's scale)                                                      */

    /* SQS-56 sonar dome under the forefoot (frames 40-65 on the plan) and
       the single shaft's skeg, propeller and rudder aft                   */
    var dome = new THREE.SphereGeometry(1, 14, 8);
    dome.scale(3.9, 1.0, 1.05);
    cur.dark.add(place(THREE, dome, X(52), 0, -4.25));
    tube("metal", X(330), 0, -3.0, X(384), 0, Z(8.5), 0.22, 0.22, 8);
    bar("metal", X(372), 0, Z(8.8), X(372), 0, -1.0, 0.09);
    (function () {
      var hx = X(386), hz = Z(8.5), q;
      cx("metal", 0.45, 0.3, 1.2, 10, hx - 0.6, 0, hz);
      for (q = 0; q < 5; q++) {
        var an = q * 2 * PI / 5;
        var g = new THREE.BoxGeometry(0.25, 0.9, 2.3);
        g.translate(0, 0, 1.3); g.rotateX(an); g.rotateY(0.25);
        cur.metal.add(place(THREE, g, hx, 0, hz));
      }
      bx("dark", 1.8, 0.3, 3.1, X(401), 0, Z(9.0));
    })();
    /* two bilge keels                                                     */
    for (s = -1; s <= 1; s += 2) bx("dark", 26.0, 0.14, 0.5, X(220), s * 6.2, -3.2, s * 0.8, 0, 0);

    /* the anchor in its pocket on the starboard bow (the plan's oval at
       frames 15-23; FFG-7's 1979 starboard bow photograph)                */
    (function () {
      var ax = X(19), az = Z(26.5), w = halfB(ax) * 0.80;
      var FA = frameN(ax, -w, az, 0.35, -1);
      plate("dark", FA, rounded(1.25, 0.62, 0.6, 12), -0.05, 0.03);
      plate("metal", FA, rectPts(-0.12, -0.5, 0.12, 0.35), 0.03, 0.25);
      plate("metal", FA, rectPts(-0.5, -0.55, 0.5, -0.35), 0.03, 0.28);
    })();
    /* the anchor windlass and the bitts on the forecastle                  */
    cz("metal", 0.5, 0.58, 0.65, 12, X(22), -0.9, topZ(X(22)) - 0.02);
    cz("metal", 0.36, 0.42, 0.55, 10, X(10), 0, topZ(X(10)) - 0.02);
    function bitts(x, y) {
      var z0 = topZ(x) - 0.02;
      bx("sup", 1.3, 0.5, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.17, 0.19, 0.5, 8, x - 0.38, y, z0);
      cz("metal", 0.17, 0.19, 0.5, 8, x + 0.38, y, z0);
    }
    for (s = -1; s <= 1; s += 2) { bitts(X(35), s * 3.0); bitts(X(95), s * 5.7); }
    /* the VERTREP square painted on the forecastle (Carr overhead)        */
    (function () {
      var x0 = X(55), x1 = X(38), z = topZ(X(46)) + 0.03, w = 2.6, t = 0.16;
      flat("rad", x0, -w, x1, -w + t, z, 0, 0, 1, 1);
      flat("rad", x0, w - t, x1, w, z, 0, 0, 1, 1);
      flat("rad", x0, -w, x0 + t, w, z, 0, 0, 1, 1);
      flat("rad", x1 - t, -w, x1, w, z, 0, 0, 1, 1);
      flat("rad", (x0 + x1) * 0.5 - t * 0.5, -w, (x0 + x1) * 0.5 + t * 0.5, w, z, 0, 0, 1, 1);
    })();
    /* team stripe lying across the forecastle, ahead of the launcher      */
    flat("team", X(62), -1.6, X(59), 1.6, topZ(X(60)) + 0.04, 0, 0, 1, 1);

    /* the forecastle bulwark from frame 30 to the stem, rising forward     */
    for (s = -1; s <= 1; s += 2) {
      var BF = [30, 20, 10, 0, -10, -20, -30];
      for (i = 0; i < BF.length - 1; i++) {
        var xa2 = X(BF[i]), xb2 = X(BF[i + 1]);
        var ya2 = s * (halfB(xa2) - 0.08), yb2 = s * (halfB(xb2) - 0.08);
        var ha = 0.55 + (30 - BF[i]) / 60 * 0.6, hb = 0.55 + (30 - BF[i + 1]) / 60 * 0.6;
        var za2 = deckZ(xa2), zb2 = deckZ(xb2);
        /* outer face on the deck edge, inner face 8 cm inboard, a cap */
        var A0 = [xa2, ya2, za2 - 0.1, 0, 0], B0 = [xb2, yb2, zb2 - 0.1, 1, 0];
        var A1 = [xa2, ya2, za2 + ha, 0, 1], B1 = [xb2, yb2, zb2 + hb, 1, 1];
        var ia = ya2 - s * 0.08, ib = yb2 - s * 0.08;
        var a0 = [xa2, ia, za2 - 0.1, 0, 0], b0 = [xb2, ib, zb2 - 0.1, 1, 0];
        var a1 = [xa2, ia, za2 + ha, 0, 1], b1 = [xb2, ib, zb2 + hb, 1, 1];
        var Ci = [(xa2 + xb2) * 0.5, 0, za2], Co = [(xa2 + xb2) * 0.5, s * 20, za2];
        cur.sup.triOut(A0, B0, B1, Ci); cur.sup.triOut(A0, B1, A1, Ci);
        cur.sup.triOut(a0, b0, b1, Co); cur.sup.triOut(a0, b1, a1, Co);
        var Cu = [(xa2 + xb2) * 0.5, s * (halfB(xa2) - 0.04), za2 - 5];
        cur.sup.triOut(A1, B1, b1, Cu); cur.sup.triOut(A1, b1, a1, Cu);
      }
      /* lifelines along the main deck from the break to the deckhouse   */
      var ep = [];
      [30, 45, 60, 75, 99].forEach(function (f) {
        var xx = X(f); ep.push([xx, s * (halfB(xx) - 0.1), deckZ(xx) + 0.05]);
      });
      railRun("metal", ep, 1.0, 2.0);
      /* and along the side decks of the forward house and the waist      */
      var ep2 = [];
      [100, 140, 180, 220, 262].forEach(function (f) {
        var xx = X(f); ep2.push([xx, s * (halfB(xx) - 0.1), deckZ(xx) + 0.05]);
      });
      railRun("metal", ep2, 1.0, 2.1);
    }
    /* jackstaff on the stem head, ensign staff at the stern               */
    bar("metal", XSTEM - 0.35, 0, deckZ(XSTEM) + 0.4, XSTEM - 0.35, 0, deckZ(XSTEM) + 5.4, 0.05);
    bar("metal", XA + 0.6, 0, ZP, XA + 0.6, 0, ZP + 4.0, 0.05);

    /* ------------------------------------------------ the deckhouse ------ */
    /* the 02 level roof follows the sheer: 48 ft 4 in over the hangar door,
       50 ft 9 in at the bridge front                                       */
    function roofZ(x) { var f = fOf(x); return Z(48.35 + (329.5 - f) * (51.0 - 48.35) / 229.5); }
    var ZD0 = Z(29.0);
    /* the hangar: full width, flush with the hull sides (Carr's stern)    */
    var hHW = halfB(X(330)) - 0.01;
    var HANG = [[X(329.5), -hHW], [X(288), -hHW], [X(288), hHW], [X(329.5), hHW]];
    prism("sup", HANG, ZD0, roofZ, 0, 4.0);
    /* the intake and uptake trunks below the stack: full width to the 01
       level from frame 288 to 263 (the profile's three grilles), then in to
       the waist on the plan's diagonal; their roofs are the decks the
       vertical photograph shows either side of the stack and the gun      */
    var Z01 = Z(44.5);
    prism("sup", plan([[288, -22.45], [263, -22.45], [263, 22.45], [288, 22.45]]), ZD0, Z01, 0, 4.0);
    prism("sup", plan([[263, -22.45], [236, -12.4], [236, 12.4], [263, 22.45]]), ZD0, Z01, 0, 4.0);
    /* the upper tier pinches in just abaft the stack (Carr's vertical) and
       stays narrow over the boat and torpedo deck, widening again to the
       forward house                                                        */
    prism("sup", plan([[288, -22.45], [279, -12.4], [279, 12.4], [288, 22.45]]), ZD0, roofZ, 0, 4.0);
    prism("sup", plan([[279, -12.4], [207, -12.4], [207, 12.4], [279, 12.4]]), ZD0, roofZ, 0, 4.0);
    prism("sup", plan([[207, -12.4], [180, -18.6], [180, 18.6], [207, 12.4]]), ZD0, roofZ, 0, 4.0);
    /* the forward house to the bridge front, a narrow side deck outboard   */
    var FWD = plan([[180, -18.6], [102.5, -18.6], [100, -16.6], [100, 16.6], [102.5, 18.6], [180, 18.6]]);
    prism("sup", FWD, Z(32), roofZ, 0, 4.0);
    /* the pilot house on the 02 level, its roof the 03 level              */
    var ZR = roofZ(X(118)), Z03 = Z(59.6);
    var PH = plan([[135, -15.5], [104, -15.5], [101, -12.8], [101, 12.8], [104, 15.5], [135, 15.5]]);
    prism("sup", PH, ZR - 0.1, Z03, 0, 4.0);
    /* its window band round the front and the forward ends of the sides,
       under the wind deflector                                             */
    (function () {
      var zc = Z(55.6), q;
      var Ff = frameN(X(101), 0, zc, 1, 0);
      for (q = -5; q <= 5; q++) plate("glass", Ff, rectPts(q * 0.72 - 0.3, -0.42, q * 0.72 + 0.3, 0.42), -0.02, 0.04);
      for (s = -1; s <= 1; s += 2) {
        var Fc = frameN((X(101) + X(104)) * 0.5, s * 13.6 * FT * 1.06, zc, 0.67, s * 0.74);
        plate("glass", Fc, rectPts(-0.3, -0.42, 0.3, 0.42), -0.02, 0.04);
        var Fs = frameN(X(110), s * 15.5 * FT, zc, 0, s);
        for (q = -2; q <= 2; q++) plate("glass", Fs, rectPts(q * 0.75 - 0.3, -0.42, q * 0.75 + 0.3, 0.42), -0.02, 0.04);
      }
      /* the wind deflector along the front of the roof                    */
      bx("sup", 0.9, 8.0, 0.14, X(101) + 0.25, 0, Z03 + 0.25, 0, -0.45, 0);
    })();
    /* the open bridge wings either side, on the 02 level roof             */
    for (s = -1; s <= 1; s += 2) {
      railRun("metal", [[X(101.5), s * 16.2 * FT, ZR], [X(101.5), s * 18.4 * FT, ZR],
                        [X(112), s * 18.4 * FT, ZR]], 1.0, 1.6);
    }
    /* the 03 level: the Mk 24 TDT forward, the CAS tower and radome, the
       antenna array boxes either side of it                               */
    bx("sup", 1.4, 2.4, 1.0, X(109), 0, Z03 + 0.5);
    cz("sup", 0.45, 0.5, 0.7, 10, X(109), 0, Z03 + 1.0);
    bx("dark", 0.6, 0.8, 0.5, X(109) + 0.1, 0, Z03 + 1.95);
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 1.6, 1.0, 1.1, X(128), s * 3.1, Z03 + 0.55);
      bx("rad", 0.08, 0.8, 0.8, X(128) + 0.82, s * 3.1, Z03 + 0.6);
    }
    var ZCAS = Z(68.5);
    tower("metal", X(125), X(113), 1.25, X(122.5), X(116.5), 0.55, Z03, ZCAS,
          [0, 0.5, 1.0], 0.1, 0.035);
    bx("metal", 2.3, 2.3, 0.14, X(119.5), 0, ZCAS);
    railRing(X(119.5), 0, ZCAS + 0.07, 1.1, 10);
    cz("rad", 0.75, 0.9, 0.5, 14, X(119.5), 0, ZCAS + 0.07);
    sph("rad", 1.3, 18, 12, X(119.5), 0, Z(74.4));
    /* rails round the 03 level                                            */
    (function () {
      var a = X(134.5), b = X(101.5), w = 15.2 * FT;
      railRun("metal", [[b, -w, Z03], [a, -w, Z03], [a, w, Z03], [b, w, Z03]], 1.0, 1.8);
    })();

    /* -------------------------------------- the foremast and the SPS-49 -- */
    var ZM0 = roofZ(X(143)), ZFM = Z(80.0);
    tower("metal", X(146.3), X(139.5), 1.07, X(145.8), X(140.0), 0.9, ZM0, ZFM,
          [0, 0.26, 0.52, 0.77, 1.0], 0.13, 0.045);
    bx("metal", 2.9, 2.6, 0.14, X(142.9), 0, ZFM);
    railRing(X(142.9), 0, ZFM + 0.07, 1.25, 10);
    cz("metal", 0.4, 0.5, 0.7, 10, X(142.9), 0, ZFM + 0.07);
    stamp(X(142.9), 0, ZFM + 0.9, 0.35, function () {
      var NSg = 8, q, Bm = cur.sup, AW = 3.65, AH = 4.3;
      function rx(y) { return -0.6 + 0.85 * (y / AW) * (y / AW); }
      for (q = 0; q < NSg; q++) {
        var ya = -AW + 2 * AW * q / NSg, yb = -AW + 2 * AW * (q + 1) / NSg;
        var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
        var a1 = [rx(ya), ya, AH, 0, 1], b1 = [rx(yb), yb, AH, 1, 1];
        Bm.triOut(a0, b0, b1, [-6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [-6, 0, AH * 0.5]);
        var c0 = [rx(ya) - 0.07, ya, 0, 0, 0], d0 = [rx(yb) - 0.07, yb, 0, 1, 0];
        var c1 = [rx(ya) - 0.07, ya, AH, 0, 1], d1 = [rx(yb) - 0.07, yb, AH, 1, 1];
        Bm.triOut(c0, d0, d1, [6, 0, AH * 0.5]); Bm.triOut(c0, d1, c1, [6, 0, AH * 0.5]);
      }
      bar("dark", rx(-AW), -AW, 0, rx(AW), AW, 0, 0.06);
      bar("dark", rx(-AW), -AW, AH, rx(AW), AW, AH, 0.06);
      /* the open mesh: ribs up the face and stringers across it          */
      for (q = 1; q < NSg; q++) {
        var yr = -AW + 2 * AW * q / NSg;
        bar("dark", rx(yr) + 0.04, yr, 0.05, rx(yr) + 0.04, yr, AH - 0.05, 0.025);
      }
      for (q = 1; q < 4; q++) {
        var zr = AH * q / 4, yq;
        for (yq = 0; yq < NSg; yq++) {
          var y0 = -AW + 2 * AW * yq / NSg, y1 = -AW + 2 * AW * (yq + 1) / NSg;
          bar("dark", rx(y0) + 0.04, y0, zr, rx(y1) + 0.04, y1, zr, 0.02);
        }
      }
      bar("metal", -0.62, 0, 0.3, -0.62, 0, AH - 0.3, 0.12);
      bar("metal", -0.6, 0, AH * 0.5, 1.75, 0, AH * 0.42, 0.08);
      bx("dark", 0.45, 0.75, 0.55, 1.9, 0, AH * 0.42);
      bar("metal", -0.55, 0, 0.35, 1.7, 0, AH * 0.38, 0.05);
    });

    /* -------------------------------------------- the lattice mainmast ---- */
    var MB = roofZ(X(176)), MT = Z(106.5);
    tower("metal", X(188), X(164), 2.13, X(178.5), X(169.2), 0.95, MB, MT,
          [0, 0.2, 0.39, 0.57, 0.73, 0.87, 1.0], 0.17, 0.055);
    /* the platform at 96 ft 6 in reaching aft, and the top at 106 ft 6 in */
    var ZP2 = Z(96.5), u2 = (ZP2 - MB) / (MT - MB);
    var xa9 = X(188) + (X(178.5) - X(188)) * u2, xf9 = X(164) + (X(169.2) - X(164)) * u2;
    /* both platforms reach out fore and aft nearly the length of the
       mast's foot, on struts from the legs (the profile)                  */
    bx("metal", X(162) - X(191), 2.6, 0.12, (X(191) + X(162)) * 0.5, 0, ZP2);
    railRoof2(X(191), X(162), 1.25, ZP2 + 0.06);
    bx("metal", X(165) - X(189), 2.9, 0.14, (X(189) + X(165)) * 0.5, 0, MT);
    railRoof2(X(189), X(165), 1.4, MT + 0.07);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", xa9, s * 0.9, ZP2 - 1.6, X(190), s * 1.1, ZP2, 0.05);
      bar("metal", xf9, s * 0.9, ZP2 - 1.6, X(163), s * 1.1, ZP2, 0.05);
      bar("metal", X(178.5), s * 0.9, MT - 1.4, X(188), s * 1.2, MT, 0.05);
      bar("metal", X(169.2), s * 0.9, MT - 1.4, X(166), s * 1.2, MT, 0.05);
    }
    function railRoof2(xa, xb, w, z) {
      railRun("metal", [[xa, -w, z], [xb, -w, z], [xb, w, z], [xa, w, z], [xa, -w, z]], 1.0, 1.4);
    }
    /* the main yard across the top with its antennas, a second lower one   */
    var XM = (X(178.5) + X(169.2)) * 0.5;
    bar("metal", XM + 0.2, -5.6, MT - 0.6, XM + 0.2, 5.6, MT - 0.6, 0.08);
    bar("metal", XM + 0.2, -4.2, Z(90), XM + 0.2, 4.2, Z(90), 0.06);
    for (s = -1; s <= 1; s += 2) {
      bar("metal", XM + 0.2, s * 5.3, MT - 0.6, XM + 0.2, s * 5.3, MT + 0.7, 0.035);
      bar("metal", XM + 0.2, s * 3.9, MT - 0.6, XM + 0.2, s * 3.9, MT - 1.6, 0.03);
      bar("metal", XM + 0.2, s * 4.0, Z(90), XM + 0.2, s * 4.0, Z(90) + 1.0, 0.03);
      bar("metal", XM + 0.2, s * 1.9, MT - 0.6, XM, s * 0.9, MT - 1.8, 0.05);
    }
    /* the topmast, the TACAN dome at its head (129 ft) and its whip       */
    tube("metal", XM, 0, MT, XM, 0, Z(124.5), 0.16, 0.09, 6);
    bar("metal", XM, -1.6, Z(116), XM, 1.6, Z(116), 0.05);
    cz("sup", 0.48, 0.48, 0.75, 12, XM, 0, Z(124.5));
    cz("dark", 0.5, 0.5, 0.12, 12, XM, 0, Z(124.5) + 0.75);
    bar("metal", XM, 0, Z(127.5), XM, 0, Z(130), 0.025);
    /* the gaff off the after legs                                          */
    bar("metal", xa9 - 0.2, 0, ZP2 - 1.0, xa9 - 3.6, 0, ZP2 + 1.6, 0.05);

    /* ------------------------------------------- the STIR on its pedestal  */
    var ZST = Z(55.5), XS0 = X(207.8);
    tower("metal", X(211.5), X(204), 1.1, X(210.8), X(204.7), 0.85, roofZ(XS0), ZST,
          [0, 0.5, 1.0], 0.1, 0.04);
    bx("metal", 2.6, 2.3, 0.12, XS0, 0, ZST);
    railRing(XS0, 0, ZST + 0.06, 1.15, 10);
    stamp(XS0, 0, ZST + 0.06, 0.5, function () {
      cz("sup", 0.45, 0.55, 0.7, 12, 0, 0, 0);
      bx("sup", 0.7, 1.9, 0.25, -0.1, 0, 0.8);
      bx("sup", 0.5, 0.18, 1.6, -0.1, 0.86, 1.6);
      bx("sup", 0.5, 0.18, 1.6, -0.1, -0.86, 1.6);
      var g = new THREE.CylinderGeometry(1.05, 0.38, 0.5, 18, 1, false);
      g.rotateZ(-PI / 2); g.rotateY(-0.15); g.translate(0.1, 0, 1.95);
      cur.rad.add(g);
      cx("metal", 0.15, 0.15, 0.12, 8, 1.05, 0, 2.1);
      bar("metal", 0.25, 0, 2.95, 1.05, 0, 2.12, 0.03);
      bar("metal", 0.35, -0.85, 1.2, 1.05, 0, 2.08, 0.03);
      bar("metal", 0.35, 0.85, 1.2, 1.05, 0, 2.08, 0.03);
      bx("sup", 0.8, 0.8, 0.7, -0.75, 0, 1.4);
    });

    /* ------------------------------------------------------ the stack ---- */
    /* squat and round-ended, its after end sloping down to the roof (the
       plan's "STACK", frames 264-288); the top dark with the two uptakes  */
    var ZSK = Z(56.2), sb = roofZ(X(276)) - 0.25;
    loftX("sup", [[X(288.5), 1.75, sb, sb + 0.6], [X(286.5), 2.05, sb, ZSK - 0.9],
                  [X(283.5), 2.15, sb, ZSK - 0.05], [X(270), 2.15, sb, ZSK],
                  [X(265), 2.05, sb, ZSK], [X(263.5), 1.7, sb, ZSK - 0.25]], 18, 0.42);
    /* the louvred panels round its sides                                  */
    for (s = -1; s <= 1; s += 2) {
      var FSK = frameN(X(274), s * 2.16, (sb + ZSK) * 0.5 + 0.25, 0, s);
      for (j = -3; j <= 3; j++) plate("dark", FSK, rectPts(j * 0.95 - 0.32, -0.55, j * 0.95 + 0.32, 0.55), -0.02, 0.03);
    }
    /* the dark top, the rim round it and the two uptake mouths            */
    (function () {
      var g = new THREE.CylinderGeometry(1, 1, 0.08, 18, 1, false);
      g.rotateX(PI / 2); g.scale(2.4, 1.85, 1);
      cur.dark.add(place(THREE, g, X(275), 0, ZSK + 0.02));
      cz("dark", 0.75, 0.82, 0.45, 12, X(279), 0, ZSK);
      cz("dark", 0.65, 0.72, 0.4, 12, X(270.5), 0, ZSK);
      cz("metal", 0.6, 0.6, 0.05, 12, X(279), 0, ZSK + 0.45);
      cz("metal", 0.5, 0.5, 0.05, 12, X(270.5), 0, ZSK + 0.4);
    })();
    railRun("metal", [[X(266), -1.9, ZSK + 0.05], [X(266), 1.9, ZSK + 0.05]], 0.6, 1.0);

    /* the gas turbine intakes: three louvred grilles each side of the
       hangar block, frames 268-290 (the profile)                          */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 3; j++) {
        var fx = 268.5 + j * 7.5, Fi = frameN(X(fx), s * (hHW + 0.005), Z(41.2), 0, s);
        plate("dark", Fi, rectPts(-1.0, -0.72, 1.0, 0.72), -0.02, 0.03);
        for (i = 0; i < 4; i++) {
          var p0 = fp(Fi, -0.95, -0.55 + i * 0.37, 0.05), p1 = fp(Fi, 0.95, -0.55 + i * 0.37, 0.05);
          bar("metal", p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], 0.035);
        }
      }
      /* a pair of scuttles and a door in the hangar side                   */
      var Fd = frameN(X(320), s * (hHW + 0.005), ZD0, 0, s);
      plate("dark", Fd, rectPts(-0.42, 1.65, 0.42, 3.45), -0.02, 0.05);
      [300, 310].forEach(function (f) {
        plate("dark", frameN(X(f), s * (hHW + 0.005), Z(44.5), 0, s), rounded(0.3, 0.2, 0.6, 8), -0.02, 0.04);
      });
    }

    /* ---------------------------------------- the hangar's after face ----- */
    (function () {
      var FHA = frameN(X(329.5), 0, ZP, -1, 0);
      for (s = -1; s <= 1; s += 2) {
        var c0 = s * 3.25;
        plate("dark", FHA, rectPts(c0 - 2.35, 0.0, c0 + 2.35, 4.25), -0.02, 0.05);
        for (j = 1; j < 9; j++) {
          var d0 = fp(FHA, c0 - 2.3, j * 0.47, 0.06), d1 = fp(FHA, c0 + 2.3, j * 0.47, 0.06);
          bar("metal", d0[0], d0[1], d0[2], d1[0], d1[1], d1[2], 0.03);
        }
        plate("sup", FHA, rectPts(c0 - 2.6, 4.25, c0 + 2.6, 4.55), 0, 0.14);
      }
      /* the centre post between the doors, the RAST/landing-signal station
         window high on it                                                  */
      plate("sup", FHA, rectPts(-0.75, 0, 0.75, 5.0), 0, 0.22);
      plate("glass", FHA, rectPts(-0.5, 3.6, 0.5, 4.3), 0.22, 0.26);
    })();
    railRun("metal", [[X(329.2), -hHW + 0.1, roofZ(X(329.2))], [X(329.2), hHW - 0.1, roofZ(X(329.2))]], 1.0, 1.9);
    for (s = -1; s <= 1; s += 2) {
      railRun("metal", [[X(329.2), s * (hHW - 0.1), roofZ(X(329.2))], [X(288.2), s * (hHW - 0.1), roofZ(X(288.2))],
                        [X(279.3), s * 12.2 * FT, roofZ(X(279.3))]], 1.0, 2.0);
      railRun("metal", [[X(287.8), s * (hHW - 0.1), Z01], [X(263), s * (hHW - 0.1), Z01],
                        [X(236.3), s * 12.2 * FT, Z01]], 1.0, 2.0);
    }

    /* the FAS station kingposts on the hangar roof, frame 310             */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 1.0, 1.0, 0.9, X(310), s * 4.6, roofZ(X(310)) + 0.45);
      bar("metal", X(310), s * 4.6, roofZ(X(310)) + 0.9, X(310), s * 4.6, roofZ(X(310)) + 2.2, 0.08);
    }

    /* the hangar roof: ventilator trunks, the helicopter control station's
       bubble at its after edge and mushroom vents (Carr's vertical)       */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 2.4, 1.1, 0.9, X(300), s * 4.9, roofZ(X(300)) + 0.45);
      bx("dark", 0.06, 0.8, 0.5, X(300) + 1.22, s * 4.9, roofZ(X(300)) + 0.5);
      bx("sup", 1.6, 1.0, 0.7, X(316), s * 2.6, roofZ(X(316)) + 0.35);
      cz("sup", 0.22, 0.26, 0.5, 8, X(294), s * 2.2, roofZ(X(294)));
      cz("sup", 0.36, 0.3, 0.12, 8, X(294), s * 2.2, roofZ(X(294)) + 0.5);
    }
    bx("sup", 1.6, 2.0, 1.4, X(326.5), -4.6, roofZ(X(326.5)) + 0.7);
    plate("glass", frameN(X(327.3), -4.6, roofZ(X(326.5)) + 0.9, -1, 0), rectPts(-0.8, -0.3, 0.8, 0.3), 0, 0.04);
    /* lockers, ladders and the searchlights on the forward house           */
    for (s = -1; s <= 1; s += 2) {
      [[128, 1.4], [152, 1.1], [174, 1.6]].forEach(function (l) {
        var xx = X(l[0]);
        bx("sup", l[1], 0.45, 1.3, xx, s * (18.6 * FT + 0.22), deckZ(xx) + 0.65);
      });
      var lx2 = X(140), lyy = s * (18.6 * FT + 0.18);
      bar("metal", lx2 - 0.25, lyy, deckZ(lx2), lx2 - 0.25, lyy, roofZ(lx2) + 1.0, 0.03);
      bar("metal", lx2 + 0.25, lyy, deckZ(lx2), lx2 + 0.25, lyy, roofZ(lx2) + 1.0, 0.03);
      for (j = 1; j < 9; j++) {
        var zl = deckZ(lx2) + j * (roofZ(lx2) - deckZ(lx2)) / 9;
        bar("metal", lx2 - 0.25, lyy, zl, lx2 + 0.25, lyy, zl, 0.02);
      }
      cz("sup", 0.12, 0.16, 0.5, 8, X(106), s * 17.2 * FT, ZR);
      cx("rad", 0.32, 0.32, 0.55, 10, X(106) - 0.2, s * 17.2 * FT, ZR + 0.75);
      /* the sidelight boxes on the bridge wings                           */
      bx("sup", 0.6, 0.3, 0.5, X(113), s * 18.3 * FT, ZR + 0.95);
    }
    /* fairleads and chocks along the forecastle edge                      */
    for (s = -1; s <= 1; s += 2) {
      [15, 45, 75].forEach(function (f) {
        var xx = X(f);
        bx("metal", 0.6, 0.25, 0.3, xx, s * (halfB(xx) - 0.3), deckZ(xx) + 0.15);
      });
    }

    /* ---------------------------------- the Phalanx on the hangar roof ---- */
    if (V.ciws) {
      cz("sup", 0.95, 1.1, 1.5, 16, X(323.3), 0, roofZ(X(323.3)));
      bx("sup", 2.6, 2.6, 0.12, X(323.3), 0, roofZ(X(323.3)) + 1.44);
      stamp(X(323.3), 0, roofZ(X(323.3)) + 1.5, PI, function () {
        cz("sup", 0.82, 0.88, 0.45, 14, 0, 0, 0);
        cz("sup", 0.62, 0.68, 0.55, 14, 0, 0, 0.45);
        bx("sup", 0.9, 0.2, 0.95, -0.05, 0.52, 1.5);
        bx("sup", 0.9, 0.2, 0.95, -0.05, -0.52, 1.5);
        cx("sup", 0.4, 0.4, 1.25, 12, -0.95, 0, 1.3);
        cx("metal", 0.17, 0.15, 1.95, 8, 0.3, 0, 1.4);
        cx("dark", 0.19, 0.19, 0.16, 8, 2.1, 0, 1.4);
        cx("dark", 0.2, 0.2, 0.12, 8, 0.85, 0, 1.4);
        cz("rad", 0.56, 0.56, 1.0, 16, -0.2, 0, 1.88);
        hemi("rad", 0.56, 16, 5, -0.2, 0, 2.88);
        bx("rad", 0.42, 0.55, 0.42, 0.25, 0, 2.1);
      });
      railRing(X(323.3), 0, roofZ(X(323.3)) + 1.5, 1.25, 10);
    }

    /* ------------------------------------------------ the waist ---------- */
    /* the boat on the port side in its davits, a 26-ft motor whaleboat     */
    (function () {
      var bxc = X(214), byc = 5.1, bzk = deckZ(bxc) + 0.95;
      stamp(bxc, byc, bzk, 0, function () {
        var L = 3.95, B = 1.15;
        loftX("rad", [[-L, B * 0.82, 0.32, 1.12], [-L + 0.45, B * 0.96, 0.06, 1.15],
                      [-L * 0.3, B, 0.0, 1.15], [L * 0.35, B * 0.93, 0.06, 1.18],
                      [L * 0.72, B * 0.62, 0.25, 1.22], [L * 0.94, B * 0.22, 0.6, 1.25],
                      [L, 0.01, 0.9, 1.25]], 12, 0.55);
        bx("rad", 2.6, 1.7, 0.7, -0.9, 0, 1.5);
        var cg = new THREE.CylinderGeometry(0.85, 0.85, 2.6, 10, 1, false, 0, PI);
        cg.rotateZ(PI / 2); cg.rotateX(PI / 2);
        cur.rad.add(place(THREE, cg, -0.9, 0, 1.85));
      });
      bx("dark", 0.3, 1.8, 0.5, bxc - 2.0, byc, bzk - 0.25 + 0.0);
      bx("dark", 0.3, 1.8, 0.5, bxc + 2.0, byc, bzk - 0.25);
      for (j = -1; j <= 1; j += 2) {
        var DX = bxc + j * 2.7;
        tube("metal", DX, 3.95, deckZ(DX), DX, 3.95, bzk + 3.2, 0.12, 0.1, 6);
        bar("metal", DX, 3.95, bzk + 3.1, DX, byc, bzk + 3.5, 0.08);
        bar("metal", DX, byc, bzk + 3.45, DX, byc, bzk + 1.3, 0.02);
      }
    })();
    /* Mk 32 triple torpedo tubes on the waist deck, both sides            */
    function mk32(x, y, side) {
      stamp(x, y, deckZ(x), side > 0 ? 0.35 + PI / 2 : -0.35 - PI / 2, function () {
        cz("sup", 0.35, 0.45, 0.7, 10, 0, 0, 0);
        for (var q = -1; q <= 1; q++) {
          var g = new THREE.CylinderGeometry(0.2, 0.2, 2.8, 8, 1, false);
          g.rotateZ(-PI / 2); g.translate(0.2, q * 0.42, 0.95 + Math.abs(q) * 0.05);
          cur.metal.add(g);
        }
        bx("sup", 0.6, 1.4, 0.25, -0.2, 0, 0.82);
      });
    }
    mk32(X(229), 4.7, 1);
    mk32(X(222), -4.7, -1);
    /* life raft canisters along the roof edges of the waist and the forward
       house                                                                */
    function raft(x, y, z) {
      var g = new THREE.CylinderGeometry(0.27, 0.27, 1.15, 8, 1, false);
      g.rotateZ(PI / 2);
      cur.rad.add(place(THREE, g, x, y, z + 0.32));
      bx("dark", 1.0, 0.5, 0.08, x, y, z + 0.04);
    }
    for (s = -1; s <= 1; s += 2) {
      [150, 156, 162, 168, 250, 255, 260].forEach(function (f) {
        var xx = X(f), yy = f < 180 ? 18.0 : 11.8;
        raft(xx, s * (yy * FT - 0.1), roofZ(xx));
      });
    }
    /* rails round the waist and forward-house roof edges                   */
    for (s = -1; s <= 1; s += 2) {
      var RR = [[279, 12.2], [207, 12.2], [180, 18.4], [102.5, 18.4]];
      var rp = RR.map(function (p) { var xx = X(p[0]); return [xx, s * p[1] * FT, roofZ(xx)]; });
      railRun("metal", rp, 1.0, 2.0);
    }
    /* doors and scuttles in the deckhouse sides                           */
    for (s = -1; s <= 1; s += 2) {
      [[118, 18.6], [146, 18.6], [170, 18.6], [222, 12.4]].forEach(function (d) {
        var Fw = frameN(X(d[0]), s * (d[1] * FT + 0.005), deckZ(X(d[0])), 0, s);
        plate("dark", Fw, rectPts(-0.42, 0.12, 0.42, 1.95), -0.02, 0.05);
      });
      [[126, 18.6], [134, 18.6], [158, 18.6], [228, 12.4], [262, 12.4]].forEach(function (d) {
        var Fw = frameN(X(d[0]), s * (d[1] * FT + 0.005), Z(44.5), 0, s);
        plate("dark", Fw, rounded(0.28, 0.2, 0.6, 8), -0.02, 0.04);
      });
    }
    /* the deep alcove either side under the bridge (FFG-7 1979 and 1982)  */
    for (s = -1; s <= 1; s += 2) {
      var Fa = frameN(X(112), s * (18.6 * FT + 0.005), deckZ(X(112)), 0, s);
      plate("dark", Fa, rectPts(-1.8, 0.0, 1.8, 3.4), -0.02, 0.03);
    }
    /* the bridge front: doors and scuttles on the forward face             */
    (function () {
      var Ffw = frameN(X(100), 0, deckZ(X(100)), 1, 0);
      plate("dark", Ffw, rectPts(-3.4, 0.12, -2.6, 1.95), -0.02, 0.05);
      plate("dark", Ffw, rectPts(2.6, 0.12, 3.4, 1.95), -0.02, 0.05);
      [-1.4, 1.4].forEach(function (yy) {
        plate("dark", Ffw, rounded(0.28, 0.2, 0.6, 8).map(function (p) { return [p[0] + yy, p[1] + 3.6]; }), -0.02, 0.04);
      });
    })();
    /* whips and the SATCOM antenna on the 02 level (the 1987 plan)       */
    bar("metal", X(150), -4.9, ZR, X(150), -4.9, ZR + 9.5, 0.05);
    bar("metal", X(150), 4.9, ZR, X(150), 4.9, ZR + 9.5, 0.05);
    bar("metal", X(276), 5.4, roofZ(X(276)), X(276), 5.4, roofZ(X(276)) + 10.0, 0.05);
    bar("metal", X(316), -5.4, roofZ(X(316)), X(316), -5.4, roofZ(X(316)) + 10.0, 0.05);
    cz("sup", 0.3, 0.35, 0.9, 8, X(156), 3.8, ZR);
    bx("dark", 0.5, 0.8, 0.9, X(156), 3.8, ZR + 1.35);

    /* ----------------------------------------------- the Mk 13 launcher -- */
    (function () {
      var lx = X(70), lz = topZ(lx) - 0.02;
      cz("dark", 2.2, 2.2, 0.06, 22, lx, 0, lz);
      cz("sup", 1.55, 1.75, 0.5, 20, lx, 0, lz + 0.02);
      stamp(lx, 0, lz + 0.52, 0, function () {
        cz("sup", 0.85, 1.0, 1.3, 14, 0, 0, 0);
        bx("sup", 1.5, 1.7, 0.8, -0.05, 0, 1.65);
        /* the single guide arm, elevated, its rail underneath, the blast
           deflector at its root                                            */
        var EL = 0.55, g;
        g = new THREE.BoxGeometry(5.0, 0.55, 0.62);
        g.translate(1.6, 0, 0); g.rotateY(-EL); g.translate(0.0, 0, 2.15);
        cur.sup.add(g);
        g = new THREE.BoxGeometry(4.6, 0.14, 0.14);
        g.translate(1.75, 0, -0.38); g.rotateY(-EL); g.translate(0.0, 0, 2.15);
        cur.metal.add(g);
        g = new THREE.BoxGeometry(0.2, 0.9, 1.0);
        g.translate(-0.95, 0, -0.1); g.rotateY(-EL); g.translate(0.0, 0, 2.15);
        cur.metal.add(g);
        bx("sup", 0.7, 0.3, 1.1, 0.0, 0.62, 1.95);
        bx("sup", 0.7, 0.3, 1.1, 0.0, -0.62, 1.95);
      });
    })();

    /* --------------------------------------------- the 76 mm Mk 75 ------- */
    function gun() {
      cz("sup", 1.45, 1.55, 0.25, 22, 0, 0, 0);
      /* the rounded fibreglass shield, 8 1/2 ft long on the plan and 6 ft
         over the roof, highest just abaft the trunnions                   */
      loftX("sup", [[-1.5, 0.85, 0.25, 1.2], [-1.35, 1.2, 0.25, 1.65], [-0.75, 1.33, 0.25, 1.92],
                    [0.15, 1.3, 0.25, 1.92], [0.85, 1.12, 0.25, 1.68], [1.32, 0.85, 0.25, 1.28],
                    [1.5, 0.52, 0.25, 0.92]], 18, 0.62);
      /* the slot, the 62-calibre barrel with its muzzle brake, the hatch  */
      cx("dark", 0.32, 0.18, 0.5, 12, 1.2, 0, 1.2);
      cx("metal", 0.11, 0.085, 3.3, 12, 1.6, 0, 1.2);
      cx("metal", 0.13, 0.13, 0.32, 10, 4.85, 0, 1.2);
      bx("sup", 0.65, 0.65, 0.08, -0.5, 0.38, 1.93);
    }
    var XG = X(239.5), tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(XG, 0, roofZ(XG));
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    /* the red-ringed gun circle is paint; the mount sits on a low ring     */
    cz("sup", 1.8, 1.9, 0.1, 22, XG, 0, roofZ(XG) - 0.05);

    /* the hull and deck first, then one mesh per material                 */
    var dkm = Bt.deck.mesh(THREE, M.deck); if (dkm) { dkm.name = "deck"; G.add(dkm); }
    KEYS.forEach(function (k) {
      if (k === "deck") return;
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = XSTEM - XA;
    return G;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e80_corvette"] = {
  len: 135.6,
  build: function (THREE, M, C) {
    return HeroPerryFFG.build(THREE, M, C, { longHull: false, ciws: false });
  }
};
UNIT_MODELS["nato_e90_corvette"] = {
  len: 138.1,
  build: function (THREE, M, C) {
    return HeroPerryFFG.build(THREE, M, C, { longHull: true, ciws: true });
  }
};
