/* ============================================================================
   us_ticonderoga_cg.js -- HERO model: the Ticonderoga-class guided missile
   cruiser, CG-47 and her sisters, in the three periods the roster draws her.

     cruiser_n         the class today (the VLS ships, CG-52 and on)
     nato_e80_cruiser  USS Ticonderoga (CG-47) as built: Mk 26 twin-arm
                       launchers fore and aft (CG-47 to CG-51)
     nato_e90_cruiser  the class from CG-52 on: two Mk 41 vertical launching
                       systems in the same hull, 1990s and 2000s

   Taken off the US Navy line drawing "Ticonderoga class cruiser with weapons
   and sensors" (1994), the Commons profile of the class, and the 1982 sea
   trials photograph of CG-47 from her port bow (DN-SC-84-00167). Published
   figures: 172.8 m (567 ft) overall, 16.8 m (55 ft) beam, 9.5 m (31 ft)
   draught to the bottom of the sonar dome, 9,600 to 9,800 tons full load.

   What has to read at a glance:

     - The Spruance hull, flush-decked, with a long low fantail: the deck
       steps DOWN about 2.5 m aft of the hangar block, and the aft 5-inch
       and the two Harpoon launchers stand on that lower deck at the very
       stern. The forecastle sheers up to 10.7 m at the stem.
     - A raised flight deck. The profile shows a 22 m block with a railed
       roof one deck above the weather deck, abutting the foot of the after
       deckhouse, and the hangar doors in that deckhouse's after face. The
       aft VLS (or aft Mk 26) is on the weather deck just abaft it.
     - TWO deckhouses with a lattice mast and a boat deck between them: the
       forward block with the bridge and two SPY-1 faces on its forward
       chamfers, the after block with two more on its after chamfers. Three
       dark uptake boxes on each, the tall pole mast and the radome ahead of
       the forward ones, the SPS-49 on the lattice tower in the waist.
     - Two Mk 45 mounts, two Phalanx (one on the bridge roof, one on the
       forward deckhouse roof), two Harpoon quad launchers.

   Mk 26 or Mk 41 is the one thing the periods change: CG-47 to CG-51 have a
   twin-arm launcher on the forecastle in front of the bridge and another
   abaft the flight deck, its two arms stowed upright; from CG-52 on both are
   flush 61-cell hatch fields, with the crane stowage cells left blank.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -6.4
   and the dome to -9.5. render3d.js stands the model up with
   rotation.x = -PI/2 and scales it by its measured X extent, so nothing may
   stand past the stem or the transom: the barrels are inside both.

   Materials (10): painted hull, non-skid deck, deckhouse plate, flight deck,
   VLS lids, radome grey, black, bare metal, glass and the team material, which
   is exactly C.team because this key stands in for every cruiser that has no
   model of its own and eraPaint only spares a material that matches the
   team colour. No colour is converted here for the same reason: prepModel
   does it, once, for the whole model.

   Every static part is merged into one mesh per material (twelve draws in
   all: the hull, the deck, eight batches, and the forward 5-inch's two).
   ASCII only -- a stray byte in a hex literal has broken this project.
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
      g.fillRect(R() * W, R() * Y(0.5), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling below the waterline and the dark boot topping over it */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.35), W, H - Y(-0.35));
    g.fillStyle = "#171a1d"; g.fillRect(0, Y(0.45), W, Y(-0.35) - Y(0.45));
    /* strake seams, in real height so they stay level */
    g.lineWidth = 1.2;
    var STR = [0.45, 1.9, 3.4, 4.9, 6.4, 7.9, 9.4, 10.9];
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
    g.globalAlpha = 1;
    /* the torpedo tube shutters abeam the hangar block, both sides */
    g.fillStyle = "#1c2024";
    g.fillRect(U(-44.5), Y(6.6), 20, 8);
    /* hawsepipes and anchor streaks on the bows */
    for (i = 0; i < 2; i++) {
      x = 76.0 - i * 1.8; z = deckZ(x) - 2.2;
      g.globalAlpha = 0.45; g.fillStyle = "#1c2125";
      g.beginPath(); g.arc(U(x), Y(z), 6, 0, 6.2832); g.fill();
      g.globalAlpha = 0.12; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 6, Y(z), 11, 3.5 * (H / (ZTOP - ZBOT)));
    }
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 72.0 : -80.5;
      for (j = 0; j <= 10; j++) g.fillRect(U(x) - 6, Y(-0.3 + j * 0.55), j % 2 ? 7 : 12, 2);
    }
    /* hull number, bow quarter, white with a dark edge. cruiser_n carries
       none: it also stands in for other navies' cruisers.                */
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
    g.fillStyle = "#252a2e";
    for (i = 0; i < 4; i++) {
      g.globalAlpha = 0.15; g.fillRect(20 + R() * (W - 60), 24 + R() * (H - 90), 16, 34);
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

  /* the flight deck: u runs fore-and-aft, v runs athwart; a pale edge line
     inside the nets, and a plain corner the other 01-level decks borrow    */
  function padTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(2179), i;
    g.fillStyle = "#3b4045"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.06; g.fillStyle = i % 2 ? "#2a2e32" : "#4b5157";
      g.fillRect(R() * W, R() * H, 40 + R() * 130, 26 + R() * 90);
    }
    g.globalAlpha = 0.32; g.fillStyle = "#000000";
    for (i = 0; i < 2200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.strokeStyle = "#d3d6cf"; g.lineWidth = 4;
    g.strokeRect(W * 0.04, H * 0.05, W * 0.92, H * 0.90);
    g.lineWidth = 3;
    for (i = 0; i < 2; i++) {
      var yy = H * (0.40 + i * 0.20);
      g.beginPath(); g.moveTo(W * 0.06, yy); g.lineTo(W * 0.18, yy); g.stroke();
      g.beginPath(); g.moveTo(W * 0.82, yy); g.lineTo(W * 0.94, yy); g.stroke();
    }
    /* plain non-skid patch for the other decks: u, v in 0.2 .. 0.3 */
    g.fillStyle = "#3b4045"; g.fillRect(W * 0.19, H * 0.19, W * 0.12, H * 0.12);
    return tex(THREE, cv, false);
  }

  /* a 61-cell Mk 41 field: 8 x 8 lids, the crane stowage cells left blank */
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
  /* superellipse outline, counter-clockwise: a rounded gun house */
  function rounded(a, b, p, n, dx) {
    var out = [], k;
    for (k = 0; k < n; k++) {
      var an = 2 * PI * k / n, c = Math.cos(an), s = Math.sin(an);
      out.push([(dx || 0) + a * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p)]);
    }
    return out;
  }
  function octagon(r) {
    var p = [], i;
    for (i = 0; i < 8; i++) { var a = (i + 0.5) * PI / 4; p.push([r * Math.cos(a), r * Math.sin(a)]); }
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
    /* a round bar between two points */
    function st(k, ax, ay, az, bx2, by, bz, r, seg) {
      if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      var g = new THREE.CylinderGeometry(r, r, L, seg || 4, 1, false);
      _v1.set(dx, dy, dz).normalize();
      var q = new THREE.Quaternion().setFromUnitVectors(_v0, _v1);
      g.applyQuaternion(q);
      g.translate((ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
      cur[k].add(g);
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
    /* stanchions every step and a top rail along a run of points */
    function rail(k, pts, h) {
      var q, a, b, dx, dy, L;
      for (q = 0; q < pts.length; q++)
        st(k, pts[q][0], pts[q][1], pts[q][2], pts[q][0], pts[q][1], pts[q][2] + h, 0.04, 4);
      for (q = 0; q < pts.length - 1; q++) {
        a = pts[q]; b = pts[q + 1]; dx = b[0] - a[0]; dy = b[1] - a[1];
        L = Math.sqrt(dx * dx + dy * dy);
        bx(k, L, 0.05, 0.05, (a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5,
           (a[2] + b[2]) * 0.5 + h, 0, 0, Math.atan2(dy, dx));
      }
    }
    /* height of the cambered weather deck under a point, ribbon and all */
    function topZ(x, y) {
      var t = tOf(x), dz = deckZ(x), dep = dz - keelZ(t);
      var ak = Math.min(1, Math.abs(y) / hullHW(x));
      return dz + dep * 0.013 * (1 - ak * ak) + 0.07;
    }
    function edge(x0, x1, step, inset, side) {
      var out = [], x;
      for (x = x0; x < x1 + 0.01; x += step)
        out.push([x, side * (hullHW(x) - inset), deckZ(x) + 0.08]);
      return out;
    }

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    var dk = deckRibbon(THREE, M.deck); dk.name = "deck"; G.add(dk);

    /* SQS-53 bow sonar dome: black rubber under the forefoot */
    var dome = new THREE.SphereGeometry(1, 14, 8);
    dome.scale(5.4, 2.1, 2.1);
    cur.dark.add(place(THREE, dome, 66.5, 0, -7.4));

    /* ------------------------------------------------ the flight deck ---- */
    var FD0 = -51.5, FD1 = -29.3, FDW = 7.4, ZF = 10.2;
    prism("sup", [[FD0, -FDW], [FD1, -FDW], [FD1, FDW], [FD0, FDW]], 7.45, ZF, 0, 4.0, true);
    flat("pad", FD0, -FDW, FD1, FDW, ZF, 0, 0, 1, 1);
    /* the waist: the boat deck between the two deckhouses, same level */
    prism("sup", [[FD1, -FDW], [-2.0, -FDW], [-2.0, FDW], [FD1, FDW]], 7.45, ZF, 0, 4.0, true);
    flat("pad", FD1, -FDW, -2.0, FDW, ZF, 0.2, 0.2, 0.3, 0.3);
    /* the landing ring and the H, in the team colour, lying on the deck */
    var rg = new THREE.RingGeometry(5.5, 6.2, 30);
    cur.team.add(place(THREE, rg, -40.4, 0, ZF + 0.06));
    bx("team", 3.8, 0.5, 0.05, -40.4, -1.6, ZF + 0.07);
    bx("team", 3.8, 0.5, 0.05, -40.4, 1.6, ZF + 0.07);
    bx("team", 0.5, 3.2, 0.05, -40.4, 0, ZF + 0.07);
    /* safety nets: posts round three edges of the deck, a top rail along them */
    rail("metal", [[FD0 + 0.3, -FDW + 0.2, ZF], [FD0 + 3.3, -FDW + 0.2, ZF], [FD0 + 6.3, -FDW + 0.2, ZF],
                   [FD0 + 9.3, -FDW + 0.2, ZF], [FD0 + 12.3, -FDW + 0.2, ZF], [FD0 + 15.3, -FDW + 0.2, ZF],
                   [FD0 + 18.3, -FDW + 0.2, ZF], [FD1 - 0.3, -FDW + 0.2, ZF]], 1.0);
    rail("metal", [[FD0 + 0.3, FDW - 0.2, ZF], [FD0 + 3.3, FDW - 0.2, ZF], [FD0 + 6.3, FDW - 0.2, ZF],
                   [FD0 + 9.3, FDW - 0.2, ZF], [FD0 + 12.3, FDW - 0.2, ZF], [FD0 + 15.3, FDW - 0.2, ZF],
                   [FD0 + 18.3, FDW - 0.2, ZF], [FD1 - 0.3, FDW - 0.2, ZF]], 1.0);
    rail("metal", [[FD0 + 0.3, -FDW + 0.2, ZF], [FD0 + 0.3, -3.7, ZF], [FD0 + 0.3, 0, ZF],
                   [FD0 + 0.3, 3.7, ZF], [FD0 + 0.3, FDW - 0.2, ZF]], 1.0);

    /* ------------------------------------------------ the after deckhouse -- */
    var ZA1 = 16.3, ZA2 = 22.4;
    prism("sup", [[FD1, -6.9], [-9.0, -6.9], [-9.0, 6.9], [FD1, 6.9]], ZF, ZA1, 0.3, 4.0);
    /* the two hangar doors in its after face, onto the flight deck */
    bx("dark", 0.12, 6.0, 4.3, FD1 - 0.04, -3.45, ZF + 2.2);
    bx("dark", 0.12, 6.0, 4.3, FD1 - 0.04, 3.45, ZF + 2.2);
    bx("metal", 0.14, 0.3, 4.4, FD1 - 0.05, 0, ZF + 2.2);
    /* the upper tower, its after corners cut for the two after SPY-1 faces */
    prism("sup", [[-24.4, -5.7], [-14.6, -5.7], [-14.6, 5.7], [-24.4, 5.7],
                  [-29.0, 2.2], [-29.0, -2.2]], ZA1, ZA2, 0.35, 4.0);
    /* the forward end of the after deckhouse stands a deck higher */
    prism("sup", [[-14.8, -4.2], [-12.4, -4.2], [-12.4, 4.2], [-14.8, 4.2]], ZA1, 19.7, 0.15, 4.0);
    /* three uptake boxes with their sooted lids, a team plate on each */
    var ST_A = [[-23.6, 3.6], [-19.8, 5.4], [-16.2, 1.2]];
    for (i = 0; i < ST_A.length; i++) {
      bx("dark", 2.3, 3.7, ST_A[i][1], ST_A[i][0], 0, ZA2 + ST_A[i][1] * 0.5);
      bx("metal", 2.6, 4.0, 0.14, ST_A[i][0], 0, ZA2 + ST_A[i][1]);
      bx("team", 1.9, 3.0, 0.05, ST_A[i][0], 0, ZA2 + ST_A[i][1] + 0.1);
    }
    /* the second pair of SPG-62 illuminators and the ESM masts on the tower roof */
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.28, 0.28, 1.3, 6, -19.0, s * 4.5, ZA2);
      stamp(-19.0, s * 4.5, ZA2 + 1.5, 0, function () {
        var g = new THREE.CylinderGeometry(1.0, 0.18, 0.5, 10); g.rotateZ(-PI / 2); g.rotateY(-0.5);
        cur.rad.add(g);
      });
    }
    st("metal", -26.0, 0, ZA2, -26.0, 0, ZA2 + 6.0, 0.07, 4);
    st("metal", -15.4, 4.6, ZA2, -15.4, 4.6, ZA2 + 4.2, 0.06, 4);
    st("metal", -15.4, -4.6, ZA2, -15.4, -4.6, ZA2 + 3.4, 0.06, 4);
    /* SPY-1 faces on the two after chamfers of the tower */
    function spy(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        var g = new THREE.CylinderGeometry(1.95, 1.95, 0.20, 8); g.rotateY(PI / 8); g.rotateZ(-PI / 2);
        cur.rad.add(g);
        var h = new THREE.CylinderGeometry(1.62, 1.62, 0.06, 8); h.rotateY(PI / 8); h.rotateZ(-PI / 2);
        h.translate(0.12, 0, 0); cur.metal.add(h);
      });
    }
    spy(-26.59, 3.81, 19.4, 2.22);
    spy(-26.59, -3.81, 19.4, -2.22);

    /* -------------------------------------------- the lattice mast (SPS-49) */
    var MX0 = -8.4, MX1 = -1.8, MY = 3.0, MZ0 = ZF, MZ1 = 36.0;
    var MTX0 = -3.8, MTX1 = -2.4, MTY = 0.6;
    function mp(u, sx, sy) {         /* a point on leg (sx, sy) at fraction u */
      var xb = sx < 0 ? MX0 : MX1, xt = sx < 0 ? MTX0 : MTX1;
      return [xb + (xt - xb) * u, sy * (MY + (MTY - MY) * u), MZ0 + (MZ1 - MZ0) * u];
    }
    var lv = [0, 0.22, 0.46, 0.68, 0.86, 1.0], a, b;
    for (j = -1; j <= 1; j += 2) for (s = -1; s <= 1; s += 2) {
      a = mp(0, j, s); b = mp(1, j, s);
      st("metal", a[0], a[1], a[2], b[0], b[1], b[2], 0.20, 4);
    }
    for (i = 0; i < lv.length; i++) {
      var c0 = mp(lv[i], -1, -1), c1 = mp(lv[i], 1, -1), c2 = mp(lv[i], 1, 1), c3 = mp(lv[i], -1, 1);
      if (i > 0) {
        st("metal", c0[0], c0[1], c0[2], c1[0], c1[1], c1[2], 0.09, 4);
        st("metal", c1[0], c1[1], c1[2], c2[0], c2[1], c2[2], 0.09, 4);
        st("metal", c2[0], c2[1], c2[2], c3[0], c3[1], c3[2], 0.09, 4);
        st("metal", c3[0], c3[1], c3[2], c0[0], c0[1], c0[2], 0.09, 4);
      }
      if (i < lv.length - 1) {
        var d0 = mp(lv[i + 1], -1, -1), d1 = mp(lv[i + 1], 1, -1), d2 = mp(lv[i + 1], 1, 1), d3 = mp(lv[i + 1], -1, 1);
        st("metal", c0[0], c0[1], c0[2], d1[0], d1[1], d1[2], 0.08, 4);
        st("metal", c1[0], c1[1], c1[2], d2[0], d2[1], d2[2], 0.08, 4);
        st("metal", c2[0], c2[1], c2[2], d3[0], d3[1], d3[2], 0.08, 4);
        st("metal", c3[0], c3[1], c3[2], d0[0], d0[1], d0[2], 0.08, 4);
      }
    }
    bx("metal", 2.8, 2.8, 0.18, -3.1, 0, MZ1);
    st("metal", -3.1, 0, MZ1, -3.1, 0, 41.6, 0.12, 4);
    /* the SPS-49 on its pedestal arm, its face turned aft */
    bx("metal", 3.4, 0.45, 0.45, -6.4, 0, 28.0);
    bx("rad", 0.30, 7.3, 3.5, -9.6, 0, 28.6, 0, 0, 0.7);
    bx("metal", 0.34, 7.4, 0.14, -9.6, 0, 30.4, 0, 0, 0.7);
    bx("metal", 0.34, 7.4, 0.14, -9.6, 0, 26.8, 0, 0, 0.7);
    bx("metal", 0.34, 0.14, 3.6, -9.6, 0, 28.6, 0, 0, 0.7);
    /* a boat on each side of the waist, on its chocks */
    for (s = -1; s <= 1; s += 2) {
      bx("dark", 6.2, 2.0, 1.0, -6.2, s * 5.5, ZF + 0.5);
      bx("rad", 5.2, 1.5, 0.12, -6.4, s * 5.5, ZF + 1.05);
    }

    /* ---------------------------------------------- the forward deckhouse -- */
    var ZB = 19.4, ZBR = 22.4;
    prism("sup", [[-2.0, -7.1], [32.2, -7.1], [35.6, -3.7], [35.6, 3.7], [32.2, 7.1], [-2.0, 7.1]],
          7.55, ZB, 0.55, 4.0);
    /* the bridge */
    prism("sup", [[21.5, -5.3], [33.0, -5.3], [34.8, -3.5], [34.8, 3.5], [33.0, 5.3], [21.5, 5.3]],
          ZB, ZBR, 0.25, 4.0);
    bx("sup", 14.2, 11.8, 0.30, 28.2, 0, ZBR + 0.15);
    bx("glass", 0.12, 7.0, 1.1, 34.78, 0, 20.9);
    bx("glass", 2.5, 0.12, 1.1, 33.95, 4.45, 20.9, 0, 0, -PI / 4);
    bx("glass", 2.5, 0.12, 1.1, 33.95, -4.45, 20.9, 0, 0, PI / 4);
    bx("glass", 10.5, 0.12, 1.1, 27.5, 5.33, 20.9);
    bx("glass", 10.5, 0.12, 1.1, 27.5, -5.33, 20.9);
    /* two SPY-1 faces on the forward chamfers, the forward block's big octagons */
    spy(33.64, 5.14, 15.6, PI / 4);
    spy(33.64, -5.14, 15.6, -PI / 4);
    /* three uptake boxes, the funnel group, and two exhaust pipes above them */
    var ST_F = [[10.7, 6.5], [13.4, 6.5], [16.0, 4.6]];
    for (i = 0; i < ST_F.length; i++) {
      bx("dark", 2.3, 3.8, ST_F[i][1], ST_F[i][0], 0, ZB + ST_F[i][1] * 0.5);
      bx("metal", 2.6, 4.1, 0.14, ST_F[i][0], 0, ZB + ST_F[i][1]);
      bx("team", 1.9, 3.1, 0.05, ST_F[i][0], 0, ZB + ST_F[i][1] + 0.1);
    }
    cz("metal", 0.22, 0.22, 3.3, 6, 11.9, 0.9, ZB + 6.5);
    cz("metal", 0.22, 0.22, 3.3, 6, 14.6, -0.9, ZB + 6.5);
    /* the pole mast, its yardarm, the SPS-55 and the radome ahead of it */
    cz("metal", 0.17, 0.30, 17.6, 6, 19.8, 0, ZB);
    bx("metal", 0.14, 8.2, 0.16, 19.8, 0, 31.0);
    bx("metal", 0.30, 3.2, 0.9, 19.8, 0, 33.2);
    st("metal", 19.8, 4.0, 31.0, 19.8, 4.0, 35.6, 0.04, 4);
    st("metal", 19.8, -4.0, 31.0, 19.8, -4.0, 34.4, 0.04, 4);
    cz("metal", 0.55, 0.65, 2.9, 8, 22.8, 0, ZBR);
    var ball = new THREE.SphereGeometry(1.9, 12, 8);
    cur.rad.add(place(THREE, ball, 22.8, 0, 27.3));
    /* the forward illuminators on the bridge roof */
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.28, 0.28, 1.4, 6, 25.2, s * 4.4, ZBR + 0.3);
      stamp(25.2, s * 4.4, ZBR + 2.0, 0, function () {
        var g = new THREE.CylinderGeometry(1.0, 0.18, 0.5, 10); g.rotateZ(-PI / 2); g.rotateY(-0.5);
        cur.rad.add(g);
      });
    }

    /* --------------------------------------- the Phalanx close-in guns ---- */
    function phalanx(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.80, 0.90, 0.6, 10, 0, 0, 0);
        cz("sup", 0.70, 0.70, 0.9, 10, 0, 0, 0.6);
        cz("rad", 0.58, 0.58, 1.0, 10, -0.15, 0, 1.5);
        var dm = new THREE.SphereGeometry(0.58, 10, 5, 0, PI * 2, 0, PI / 2);
        dm.rotateX(PI / 2); dm.translate(-0.15, 0, 2.5);
        cur.rad.add(dm);
        bx("sup", 1.0, 0.95, 0.8, 0.5, 0, 1.0);
        cx("metal", 0.12, 0.12, 1.8, 6, 0.9, 0, 1.05);
        if (V.flir) bx("dark", 0.5, 0.4, 0.45, 0.2, 0.95, 2.1);
      });
    }
    phalanx(28.7, 0, ZBR + 0.3, 0);
    phalanx(4.6, 0, ZB, 0);

    /* --------------------------------------------- the 5-inch Mk 45 mounts */
    function gun() {
      cz("sup", 2.3, 2.5, 0.9, 14, 0, 0, 0);
      prism("sup", rounded(2.35, 1.95, 0.62, 16, -0.15), 0.8, 3.05, 0.40, 3.0);
      bx("sup", 1.3, 1.5, 1.0, 2.3, 0, 2.2);
      cx("metal", 0.30, 0.30, 2.0, 10, 2.8, 0, 2.2);
      cx("metal", 0.19, 0.19, 3.0, 10, 4.8, 0, 2.2);
    }
    /* the forward mount trains: it is the node the renderer aims */
    var X_GUN = 55.4, tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_GUN, 0, topZ(X_GUN, 0));
    var TB = { sup: new Batch(), metal: new Batch() };
    cur = TB; gun(); cur = Bt;
    var tm1 = TB.sup.mesh(THREE, M.sup), tm2 = TB.metal.mesh(THREE, M.metal);
    if (tm1) tw.add(tm1);
    if (tm2) tw.add(tm2);
    G.add(tw);
    /* the after mount stands on the fantail and points aft: both drawings put
       its house centre 73 m abaft amidships, two metres aft of the step up
       to the weather deck, with its barrel over the Harpoon launchers      */
    stamp(-73.0, 0, topZ(-73.0, 0), PI, gun);

    /* ------------------------------------------------------ launchers ---- */
    function vlsField(xc) {
      var z0 = topZ(xc, 0) - 0.04;
      cur.vls.add(place(THREE, new THREE.BoxGeometry(6.4, 6.4, 0.2), xc, 0, z0 + 0.1, 0, 0, PI / 2));
    }
    function mk26(xc) {
      var z0 = topZ(xc, 0) - 0.02;
      bx("sup", 5.6, 4.8, 0.7, xc, 0, z0 + 0.35);
      bx("dark", 2.4, 2.4, 0.2, xc, 0, z0 + 0.8);
      cz("sup", 1.5, 1.7, 0.6, 12, xc, 0, z0 + 0.7);
      for (s = -1; s <= 1; s += 2) {
        bx("metal", 0.5, 0.45, 4.6, xc - 0.2, s * 1.3, z0 + 3.2);
        bx("metal", 0.7, 0.55, 0.3, xc - 0.2, s * 1.3, z0 + 5.6);
      }
      bx("sup", 1.8, 1.8, 2.2, xc + 2.9, 0, z0 + 1.1);
    }
    if (V.mk26) { mk26(41.0); mk26(-56.2); }
    else { vlsField(41.0); vlsField(-56.6); }

    /* two Harpoon quad launchers at the stern, tubes elevated outboard */
    function harpoon(x, y, side) {
      var z0 = topZ(x, y) - 0.02;
      bx("metal", 1.3, 1.6, 1.5, x, y, z0 + 0.75);
      stamp(x, y, z0 + 2.2, side > 0 ? PI / 2 : -PI / 2, function () {
        var k, l;
        for (k = -1; k <= 1; k += 2) for (l = -1; l <= 1; l += 2) {
          var g = new THREE.CylinderGeometry(0.27, 0.27, 4.6, 8);
          g.rotateZ(-PI / 2); g.rotateY(-0.61);
          g.translate(1.5, k * 0.33, l * 0.33);
          cur.dark.add(g);
          cur.metal.add(place(THREE, new THREE.BoxGeometry(0.1, 0.6, 0.6), 3.3, k * 0.33, 1.4 + l * 0.33));
        }
      });
    }
    harpoon(-83.6, 4.7, 1);
    harpoon(-80.8, -4.7, -1);

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
      rail("metal", edge(-62.0, 56.0, 3.1, 0.15, s), 1.0);
    }
    /* ensign staff and jackstaff */
    st("metal", -85.2, 0, deckZ(-85.2), -85.2, 0, deckZ(-85.2) + 4.6, 0.07, 4);
    st("metal", 85.4, 0, deckZ(85.4) + 0.6, 85.4, 0, deckZ(85.4) + 3.6, 0.06, 4);
    /* the capstan and the anchor windlass on the forecastle */
    cz("metal", 0.5, 0.6, 1.1, 8, 66.0, 0, topZ(66.0, 0) - 0.02);
    cz("metal", 0.5, 0.6, 1.1, 8, 70.0, 0, topZ(70.0, 0) - 0.02);
    /* team stripe lying on the forecastle, where the camera looks down on it */
    flat("team", 60.0, -2.2, 64.2, 2.2, topZ(62.0, 0) + 0.05, 0, 0, 1, 1);
    /* a bilge keel each side, to hold the underwater shape together */
    for (s = -1; s <= 1; s += 2)
      bx("dark", 30.0, 0.16, 0.55, -17.0, s * 7.3, -3.9, s * 0.75, 0, 0);

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
  build: function (THREE, M, C) { return HeroTiconderogaCG.build(THREE, M, C, { mk26: false, num: "", flir: true }); }
};
UNIT_MODELS["nato_e90_cruiser"] = {
  len: 172.9,
  build: function (THREE, M, C) { return HeroTiconderogaCG.build(THREE, M, C, { mk26: false, num: "52" }); }
};
UNIT_MODELS["nato_e80_cruiser"] = {
  len: 172.9,
  build: function (THREE, M, C) { return HeroTiconderogaCG.build(THREE, M, C, { mk26: true, num: "47" }); }
};
