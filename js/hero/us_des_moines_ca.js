/* ============================================================================
   us_des_moines_ca.js -- HERO model: the Des Moines-class heavy cruiser,
   USS Des Moines (CA-134), in the fit the late-1950s photographs show her in
   (nato_e50_cruiser).

   References (Wikimedia Commons, fetched 2026-10-22). No scale drawing of the
   class is on Commons, so the hull and the stations were measured off two
   near-orthogonal photographs and checked against published dimensions:
     - "USS Newport News (CA-148) Port side view" (undated): a sister, flat
       broadside at anchor, almost no perspective (4.46 px per metre). The deck line, the
       freeboard, the stacks, the masts, the after director tower, No. 3
       turret and the crane were measured off it.
     - "USS Newport News (CA-148) underway c1960": a low port broadside; its
       perspective was fitted (three known stations) and the turrets, the
       5-inch mounts, the bridge and the forecastle 3-inch read off it.
     - "Overhead view of USS Newport News (CA-148) underway c1949": the deck
       plan from above the stern: the square transom nearly full beam, the
       turret width against the beam, the wing mounts at the deck edge.
     - "USS Des Moines (CA-134) underway on 15 December 1959" (starboard bow,
       from above), "... underway at sea, circa in the late 1950s" (two port
       bow views) and "... underway, circa in 1954" (starboard broadside):
       her own fit -- the slim forward stack with its searchlight platform,
       the wide after stack with its black top, the foremast between the
       stacks with its air search antenna, the mainmast with the SPS-8
       height finder, the after director on its tower, the open 3-inch tubs
       round the waist, the forecastle 3-inch, the boats and the crane on
       the fantail.
     - "76 mm gun mount aboard USS Salem (CA-139) in 1953": the open twin
       3-inch/50 mount.
   Published figures: 218.4 m (716 ft 6 in) overall, 23.3 m beam, 7.9 m
   draught; nine 8-inch/55 Mk 16 in three triple turrets; six twin 5-inch/38.

   RECOGNITION (what must read at game zoom, and where it rests):
     1. the long flush hull, the deck rising from 6.4 m amidships to 8.8 m at
        the stem (NN broadside), the raked stem and the wide square transom
        (overhead, NN broadside)
     2. three big boxy triple 8-inch turrets with sloped faces and black gun
        bloomers: two forward, No. 2 superfiring on a tall barbette, No. 3 aft
        on a low one (every photograph)
     3. the high, square bridge block with two rows of windows and the main
        battery director on top (Dec 1959, NN 1960)
     4. the slim, tall forward stack with its searchlight platform, and the
        wide after stack with the black top (every photograph)
     5. the foremast between the stacks carrying the air search antenna, the
        mainmast abaft the after stack carrying the SPS-8 (late 1950s photos)
     6. the after main battery director standing on its own round tower
        (Dec 1959, NN broadside)
     7. six twin 5-inch mounts: one on the centreline before the bridge, one
        on the centreline aft over No. 3, two a side in the waist (NN 1960,
        overhead, Dec 1959)
     8. the open twin 3-inch mounts in round tubs along the waist, one on the
        forecastle (Dec 1959, late 1950s port bow)
     9. the fantail: the tall lattice crane at the transom and the boats
        (Dec 1959, 1954, NN broadside)
    10. the teak deck in a long tan run, haze grey everywhere else

   NOT CONFIRMED, drawn from the nearest evidence:
     - the 3-inch tub stations: the Dec 1959 photograph shows four tubs on
       the starboard waist and the forecastle mount; they are mirrored to
       port, and none is drawn where no photograph shows one
     - the exact athwartship spread of the 01 and 02 levels and the bridge,
       read off the c1949 overhead taken from astern at an angle
     - the Mk 56 directors on their pedestals amid the tubs and the after
       secondary director ahead of No. 3: shapes from the photographs at
       their resolution
     - the foremast antenna is drawn as the air search grid and the mainmast
       one as the SPS-8 reflector, following the game row's own note (SPS-8
       and SPS-12); the photographs show the shapes, not the designations
   Materials (8): hull, deckhouse, teak, white (boats), black, bare metal,
   glass and the team material, exactly C.team. 14,696 triangles in 10 draw
   calls: every static part is merged into one mesh per material, and No. 1
   turret carries its own three.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -7.9.
   render3d.js scales the model by its X extent, so nothing passes the stem
   or the transom: No. 1's muzzles end 33 m short of the stem.
   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroDesMoinesCA = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 218.4, XB = LOA * 0.5;
  var HB = 11.65;               /* half beam                                  */
  var ZTOP = 11.0, ZBOT = -2.0; /* the span the hull texture covers           */

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

  /* the weather deck by x, off the flat broadside: 6.9 m at the transom,
     6.4 m amidships, the sheer forward of No. 1 up to 8.8 m at the stem   */
  var DK = [[-109.2, 6.90], [-90.0, 6.70], [-60.0, 6.50], [-20.0, 6.40],
            [20.0, 6.45], [45.0, 6.60], [60.0, 6.85], [75.0, 7.25],
            [88.0, 7.75], [100.0, 8.30], [109.2, 8.80]];
  function deckZ(x) { return tbl(DK, x); }

  /* the deck edge in plan, a fraction of the half beam by t (transom 0,
     stem 1): the square transom about four fifths of the beam (overhead),
     the parallel body from a quarter of her length to near No. 2, the fine
     entry: No. 1 fills about half the deck's breadth (c1949 overhead)                          */
  var HW_K = [[0.000, 0.790], [0.006, 0.820], [0.020, 0.860], [0.045, 0.905],
              [0.080, 0.940], [0.130, 0.968], [0.200, 0.990], [0.270, 1.000],
              [0.560, 1.000], [0.630, 0.985], [0.680, 0.955], [0.740, 0.895],
              [0.800, 0.810], [0.850, 0.710], [0.890, 0.600], [0.930, 0.460],
              [0.960, 0.330], [0.980, 0.210], [0.993, 0.100], [1.000, 0.035]];
  function hullHW(x) { return HB * tbl(HW_K, tOf(x)); }
  /* the keel: the transom's foot just clear of the water, flat for most of
     her length at the 7.9 m draught, rising into the cut-away forefoot    */
  var KZ = [[0.000, 0.25], [0.006, -1.10], [0.030, -3.90], [0.070, -6.50],
            [0.110, -7.70], [0.140, -7.90], [0.860, -7.90], [0.930, -7.55],
            [0.970, -6.40], [1.000, -4.60]];
  function keelZ(t) { return tbl(KZ, t); }
  /* 0 = the full midship section, 1 = the fine flared V of the entry; the
     run aft stays full and flat-floored into the transom                  */
  var VB_K = [[0.00, 0.10], [0.05, 0.06], [0.15, 0.00], [0.58, 0.00],
              [0.66, 0.12], [0.74, 0.32], [0.82, 0.58], [0.89, 0.82], [0.95, 0.95],
              [1.00, 1.00]];
  var SEC_FULL = [[1.000, 1.000], [1.000, 0.750], [1.000, 0.500], [1.000, 0.300],
                  [0.995, 0.200], [0.980, 0.140], [0.955, 0.095], [0.910, 0.055],
                  [0.830, 0.025], [0.680, 0.008], [0.400, 0.001], [0.000, 0.000]];
  var SEC_FINE = [[1.000, 1.000], [0.930, 0.850], [0.840, 0.720], [0.740, 0.600],
                  [0.620, 0.480], [0.500, 0.370], [0.380, 0.270], [0.270, 0.180],
                  [0.170, 0.110], [0.090, 0.050], [0.030, 0.015], [0.000, 0.000]];
  /* the hull's own top is flat: the cambered deck ribbon lies over it */
  var CAMBER = [[0.600, 0.950], [0.000, 0.940], [-0.600, 0.950]];
  /* the raked stem: how far aft each height of the last rings is set, by
     depth below the deck as a fraction (both broadsides: about 5 m from the
     deck to the forefoot, a gentle convex curve)                          */
  var RAKE_K = [[0.000, 0.0], [0.955, 0.0], [0.978, 2.2], [0.991, 3.8], [1.000, 5.2]];
  var STEM_F = [[0.00, 0.00], [0.10, 0.10], [0.20, 0.21], [0.35, 0.40], [0.50, 0.58],
                [0.70, 0.80], [1.00, 1.00]];
  /* the transom leans aft at the top: its foot sits 1.2 m forward of the
     deck edge (NN broadside)                                              */
  var SRAKE = 1.2;

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

  var XS = [-109.2, -108.6, -107.6, -106.0, -103.5, -100.0, -95.0, -88.0,
            -80.0, -70.0, -58.0, -45.0, -30.0, -15.0, 0.0, 15.0, 30.0, 42.0,
            52.0, 61.0, 69.0, 76.0, 82.0, 87.5, 92.5, 97.0, 100.8, 103.8,
            106.0, 107.6, 108.6, 109.2];

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
     Painted once per page. The photographs are black and white, so the
     greys are the same 1950s US haze grey the Iowa hero uses for that
     decade, already taken to about 0.9 of the sampled level for the
     renderer's tone mapping: the hull 0x6b737a, the deckhouses 0x757d84.  */
  var _tx = null;
  function textures(THREE) {
    if (_tx) return _tx;
    _tx = { hull: hullTex(THREE), sup: supTex(THREE), teak: teakTex(THREE) };
    return _tx;
  }

  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(13407), i, j, x, z;
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
    g.fillStyle = "#16191c"; g.fillRect(0, Y(0.90), W, Y(-0.55) - Y(0.90));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.90) - 1, W, 1.5);
    /* plating strakes, level in real height */
    g.lineWidth = 1.2;
    var STR = [2.1, 3.7, 5.3, 6.9, 8.5];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.24)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(0, Y(STR[i]) + 1.4); g.lineTo(W, Y(STR[i]) + 1.4); g.stroke();
    }
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.11)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 30; j++) {
        x = ((j + st) / 30) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }
    /* a row of scuttles under the deck edge, forward and aft of the belt */
    g.fillStyle = "#1c2125";
    for (i = 0; i < 80; i++) {
      x = -84 + i * 2.4;
      if (x > 96) break;
      if (x > -38 && x < 34) continue;
      if (R() < 0.35) continue;
      z = deckZ(x) - 1.5;
      g.globalAlpha = 0.55; g.fillRect(U(x) - 1.5, Y(z) - 1.5, 3, 3);
      if (R() < 0.3) { g.globalAlpha = 0.06; g.fillStyle = "#6d4526";
        g.fillRect(U(x) - 1, Y(z) + 2, 2, 10 + R() * 18); g.fillStyle = "#1c2125"; }
    }
    g.globalAlpha = 1;
    /* hawse rust under the anchors and soot along the waist */
    g.globalAlpha = 0.13; g.fillStyle = "#6d4526";
    g.fillRect(U(99.0) - 5, Y(deckZ(99) - 3.6), 10, 3.4 * (H / (ZTOP - ZBOT)));
    for (i = 0; i < 110; i++) {
      x = -16 + R() * 34; z = deckZ(x) - 0.4 - R() * 2.4;
      g.globalAlpha = 0.03; g.fillStyle = "#2a2d30";
      g.fillRect(U(x), Y(z), 8 + R() * 30, 3 + R() * 9);
    }
    /* draught marks fore and aft */
    g.globalAlpha = 1; g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 103.0 : -104.0;
      for (j = 0; j <= 9; j++) g.fillRect(U(x) - 6, Y(-0.4 + j * 0.62), j % 2 ? 6 : 11, 2);
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
    var R = rng(52211), i;
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
     staggered, the seams paid with dark pitch; a little paler than the
     Iowa's, as the scrubbed decks read in the 1959 photographs           */
  function teakTex(THREE) {
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(9917), i, j;
    g.fillStyle = "#93806a"; g.fillRect(0, 0, W, H);
    var PW = H / (8 / 0.15);                     /* a 15 cm plank, in pixels */
    for (j = 0; j * PW < H; j++) {
      var off = R() * W;
      for (i = -1; i < 4; i++) {
        var x0 = off + i * W / 3.2, L = W / 3.2;
        g.globalAlpha = 0.10 + R() * 0.12;
        g.fillStyle = R() < 0.5 ? "#a8916f" : "#71604a";
        g.fillRect(((x0 % W) + W) % W, j * PW, L, PW);
        g.fillRect(((x0 % W) + W) % W - W, j * PW, L, PW);
      }
    }
    g.globalAlpha = 0.40; g.fillStyle = "#3a2e22";
    for (j = 0; j * PW < H; j++) g.fillRect(0, Math.round(j * PW), W, 1);
    for (j = 0; j * PW < H; j++) {
      for (i = 0; i < 3; i++) {
        var bx = ((j * 0.37 + i / 3) % 1) * W;
        g.fillRect(bx, j * PW, 1, PW);
      }
    }
    for (i = 0; i < 20; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#cbb696" : "#3f3326";
      g.fillRect(R() * W, R() * H, 30 + R() * 120, 20 + R() * 60);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var T = textures(THREE), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    M.teak  = S({ map: T.teak, roughness: 0.93, metalness: 0.02,
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
      var rk = tbl(RAKE_K, t), sk = i === 0 ? SRAKE : (i === 1 ? SRAKE * 0.75 : 0);
      for (j = 0; j < r.length; j++) {
        var z = kz + dep * r[j][1];
        var dd = Math.max(0, Math.min(1, 1 - r[j][1]));
        pos.push(x0 - rk * tbl(STEM_F, dd) + sk * dd, w * r[j][0], z);
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

  /* the weather deck between x0 and x1: a cambered ribbon on the hull top,
     its uv in metres for the teak's repeat                                 */
  function deckRibbon(THREE, mtl, x0, x1) {
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
        uv.push(x / 8.0, ky * w / 8.0);
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
    var KEYS = ["sup", "rad", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, s;

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
    /* an open bulwark ring, both faces and the rim: the 3-inch tubs and the
       platforms read as rings from the game camera, not as solid drums     */
    function ringWall(k, x, y, z0, z1, r, n, th) {
      var B = cur[k], q, ri = r - (th || 0.08);
      for (q = 0; q < n; q++) {
        var a = 2 * PI * q / n, b = 2 * PI * (q + 1) / n;
        var ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
        var A0 = [x + r * ca, y + r * sa, z0, q / n, 0], B0 = [x + r * cb, y + r * sb, z0, (q + 1) / n, 0];
        var A1 = [x + r * ca, y + r * sa, z1, q / n, 1], B1 = [x + r * cb, y + r * sb, z1, (q + 1) / n, 1];
        var a0 = [x + ri * ca, y + ri * sa, z0, q / n, 0], b0 = [x + ri * cb, y + ri * sb, z0, (q + 1) / n, 0];
        var a1 = [x + ri * ca, y + ri * sa, z1, q / n, 1], b1 = [x + ri * cb, y + ri * sb, z1, (q + 1) / n, 1];
        B.tri(A0, B0, B1); B.tri(A0, B1, A1);
        B.tri(a0, b1, b0); B.tri(a0, a1, b1);
        B.tri(a1, A1, B1); B.tri(a1, B1, b1);
      }
    }
    /* the inside of an open casing: the band facing inward and the rim
       joining it to the outer face, so an open stack top has a wall to see  */
    function bandIn(k, outer, inner, z0, z1) {
      var B = cur[k], n = inner.length, q;
      for (q = 0; q < n; q++) {
        var a = inner[q], b = inner[(q + 1) % n], A = outer[q], Bo = outer[(q + 1) % n];
        var a0 = [a[0], a[1], z0, 0, 0], b0 = [b[0], b[1], z0, 1, 0];
        var a1 = [a[0], a[1], z1, 0, 1], b1 = [b[0], b[1], z1, 1, 1];
        B.tri(a0, b1, b0); B.tri(a0, a1, b1);
        var A1 = [A[0], A[1], z1, 0, 1], B1 = [Bo[0], Bo[1], z1, 1, 1];
        B.tri(a1, A1, B1); B.tri(a1, B1, b1);
      }
    }
    /* a thin curved sheet seen from both sides: the geometry and its mirror
       winding, so the dish reads from in front and behind                  */
    function both(k, g) {
      var h = g.index ? g.toNonIndexed() : g, P = h.getAttribute("position");
      cur[k].add(h);
      var q, B = cur[k];
      for (q = 0; q < P.count; q += 3) {
        B.tri([P.getX(q), P.getY(q), P.getZ(q), 0, 0], [P.getX(q + 2), P.getY(q + 2), P.getZ(q + 2), 0, 1],
              [P.getX(q + 1), P.getY(q + 1), P.getZ(q + 1), 1, 0]);
      }
    }
    /* a curved radar grid on the stamp's +x face: AW half width, AH tall,
       `bow` the depth of its curve                                          */
    function grid(k, AW, AH, bow, NS) {
      var q, Bm = cur[k];
      function rx(y) { return bow * (1 - (y / AW) * (y / AW)); }
      for (q = 0; q < NS; q++) {
        var ya = -AW + 2 * AW * q / NS, yb = -AW + 2 * AW * (q + 1) / NS;
        var a0 = [rx(ya), ya, 0, 0, 0], b0 = [rx(yb), yb, 0, 1, 0];
        var a1 = [rx(ya), ya, AH, 0, 1], b1 = [rx(yb), yb, AH, 1, 1];
        Bm.triOut(a0, b0, b1, [8, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [8, 0, AH * 0.5]);
        var c0 = [rx(ya) + 0.07, ya, 0, 0, 0], d0 = [rx(yb) + 0.07, yb, 0, 1, 0];
        var c1 = [rx(ya) + 0.07, ya, AH, 0, 1], d1 = [rx(yb) + 0.07, yb, AH, 1, 1];
        Bm.triOut(c0, d0, d1, [-8, 0, AH * 0.5]); Bm.triOut(c0, d1, c1, [-8, 0, AH * 0.5]);
      }
    }

    /* ------------------------------------------------------------ hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    var dk = deckRibbon(THREE, M.teak, -109.1, 109.0); dk.name = "deck"; G.add(dk);
    /* bilge keels, to hold the underwater body together for the moment the
       camera dips under the surface                                       */
    for (s = -1; s <= 1; s += 2) bx("dark", 52.0, 0.2, 0.8, -4.0, s * 11.0, -6.6, s * 0.8, 0, 0);

    /* anchors in their hawses on both bows, the shank up the pipe */
    for (s = -1; s <= 1; s += 2) {
      var AX = 99.5, AZ = deckZ(AX) - 2.3, ay0 = hullY(AX, AZ);
      var slope = (hullY(AX + 1.0, AZ) - hullY(AX - 1.0, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.04), AZ, -slope, s);
      plate("dark", FA, rectPts(-0.9, -1.9, 0.9, 0.65), 0, 0.06);
      plate("metal", FA, rectPts(-0.15, -1.5, 0.15, 0.4), 0.06, 0.38);
      plate("metal", FA, rectPts(-0.45, -1.8, 0.45, -1.45), 0.06, 0.42);
      plate("metal", FA, [[-0.45, -1.8], [-0.45, -1.45], [-0.95, -1.1]], 0.06, 0.36);
      plate("metal", FA, [[0.45, -1.8], [0.95, -1.1], [0.45, -1.45]], 0.06, 0.36);
      /* deck end of the hawse, the cable aft to its wildcat */
      var hx = 100.0, hy = s * 2.6, wx = 91.0, wy = s * 1.5;
      cz("dark", 0.45, 0.45, 0.08, 10, hx, hy, topZ(hx, hy) - 0.03);
      bx("dark", Math.sqrt((hx - wx) * (hx - wx) + (hy - wy) * (hy - wy)), 0.36, 0.12,
         (hx + wx) * 0.5, (hy + wy) * 0.5, topZ((hx + wx) * 0.5, 2) + 0.04, 0, 0, Math.atan2(hy - wy, hx - wx));
      cz("metal", 0.65, 0.72, 0.7, 12, wx, wy, topZ(wx, wy) - 0.02);
      bx("sup", 1.6, 1.0, 0.6, wx - 1.2, wy, topZ(wx, wy) + 0.28);
      bx("dark", 3.4, 0.36, 0.12, wx - 2.8, wy, topZ(wx - 2.8, wy) + 0.04);
      cz("dark", 0.42, 0.42, 0.06, 10, wx - 4.6, wy, topZ(wx - 4.6, wy) - 0.02);
    }
    /* the capstans and the bullnose fairlead at the stem */
    for (s = -1; s <= 1; s += 2) cz("metal", 0.45, 0.55, 0.8, 10, 86.0, s * 2.4, topZ(86, 2.4) - 0.02);
    cz("sup", 0.8, 0.8, 0.8, 12, 108.2, 0, deckZ(108.2) - 0.2);
    /* lifelines along the deck edge, from the fantail to the stem. None on
       the fantail's after eighth: render3d.js reads the deck height there */
    for (s = -1; s <= 1; s += 2) {
      var ep = [], ex = -80.0;
      while (ex < 107.0) {
        ep.push([ex, s * (hullHW(ex) - 0.15), deckZ(ex) + 0.06]);
        ex += (ex > -46 && ex < 36) ? 8.0 : 5.5;
      }
      ep.push([107.6, s * (hullHW(107.6) - 0.12), deckZ(107.6) + 0.06]);
      railRun("metal", ep, 1.0, 5.5);
    }

    /* ========================================================= turrets ===== */
    /* The Mk 16 gunhouse: about 12 m long and 10 m wide (about half the deck's
       breadth at No. 1 and No. 2 in the c1949 overhead), 3.35 m high, the roof flat nearly to the front and
       the face a steep slope with three big black bloomers (1959 photos); the guns 2.4 m
       apart and their muzzles 16.7 m before the turret's centre. Built about
       its own centre on the base ring, guns along +X.                      */
    function turret8() {
      loftX("sup", [[-6.60, 4.55, 0.0, 2.95], [-6.35, 5.00, 0.0, 3.35], [4.30, 5.00, 0.0, 3.35],
                    [4.62, 4.94, 0.0, 3.05], [5.55, 4.78, 0.0, 0.25]], 16, 0.10);
      /* the sighting hoods across the roof, the hatches and the rear plate */
      for (var q = -1; q <= 1; q++) bx("sup", 1.3, 0.9, 0.5, 2.0, q * 2.4, 3.57);
      for (var e = -1; e <= 1; e += 2) {
        bx("dark", 1.0, 0.8, 0.06, -3.2, e * 2.6, 3.37);
        bx("sup", 1.6, 0.9, 0.7, -5.2, e * 3.8, 3.65);
      }
      bx("dark", 0.08, 6.0, 0.4, -6.62, 0, 1.1);
      /* the three guns in their black canvas bloomers on the sloped face */
      for (q = -1; q <= 1; q++) {
        var gy = q * 2.4;
        cx("dark", 0.95, 0.62, 1.15, 12, 4.70, gy, 1.70);
        cx("sup", 0.37, 0.25, 11.0, 10, 5.70, gy, 1.70);
        cx("dark", 0.24, 0.24, 0.05, 8, 16.68, gy, 1.70);
      }
    }
    var X_T1 = 59.0, X_T2 = 46.5, X_T3 = -52.0;
    var Z_T1 = 7.55, Z_T2 = 10.60, Z_T3 = 7.35;
    /* No. 1 trains: it is the node the renderer aims */
    var tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X_T1, 0, Z_T1);
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; turret8(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    stamp(X_T2, 0, Z_T2, 0, turret8);
    stamp(X_T3, 0, Z_T3, PI, turret8);
    /* the barbettes: a low ring under No. 1, No. 2 a full turret height
       clear of the deck to fire over No. 1, a low one under No. 3          */
    cz("sup", 4.3, 4.3, Z_T1 - deckZ(X_T1) + 0.1, 32, X_T1, 0, deckZ(X_T1) - 0.1);
    cz("sup", 4.3, 4.3, Z_T2 - deckZ(X_T2) + 0.1, 32, X_T2, 0, deckZ(X_T2) - 0.1);
    cz("sup", 4.3, 4.3, Z_T3 - deckZ(X_T3) + 0.1, 32, X_T3, 0, deckZ(X_T3) - 0.1);
    for (s = -1; s <= 1; s += 2) bx("metal", 0.08, 0.7, 3.4, X_T2 + 1.2, s * 4.36, deckZ(X_T2) + 1.9);

    /* ==================================================== superstructure == */
    /* Levels (flat broadside): main deck about 6.4, 01 to 9.2, 02 to 11.8,
       the 03 to 14.7 and the bridge 04 to 17.6                             */
    var Z1 = 9.2, Z2 = 11.8, Z3 = 14.7, Z4 = 17.6;
    /* the 01 level: from No. 3's barbette forward round No. 2's (the block
       under No. 2 in the 1959 photographs), nearly full width in the waist
       where the wing mounts and the tubs stand at its edge                 */
    var P1 = sym([[-45.0, 2.8], [-42.5, 5.2], [-36.0, 9.0], [-30.0, 10.8], [22.0, 10.8],
                  [28.0, 8.8], [33.0, 7.2], [42.0, 6.0], [48.5, 5.4], [50.6, 3.6], [51.2, 1.2]]);
    prism("sup", P1, 6.2, Z1, 0.15, 4.0);
    railRoof(roofOf(P1, 0.15, 0.1), Z1, null, 3.2);
    /* the 02 level, narrower so the wing mounts clear it */
    var P2 = sym([[-36.5, 2.4], [-33.0, 5.2], [-24.0, 6.2], [10.0, 6.2], [30.0, 6.6],
                  [36.0, 5.0], [40.0, 3.0]]);
    prism("sup", P2, Z1, Z2, 0.18, 4.0);
    /* the bridge block: the 03 and the 04 levels, square and high, their
       fronts nearly flush in one tall face (late-1950s port bow views), the
       bridge wings out at the 03 level                                     */
    var P3F = sym([[5.0, 6.6], [30.5, 6.6], [33.0, 4.6]]);
    prism("sup", P3F, Z2, Z3, 0.15, 4.0);
    var P4 = sym([[9.0, 6.3], [29.6, 6.3], [32.0, 4.4]]);
    prism("sup", P4, Z3, Z4, 0.15, 4.0);
    railRoof(roofOf(P4, 0.15, 0.1), Z4, null, 1.8);
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 4.4, 2.2, 0.25, 25.0, s * 7.6, Z3 + 0.1);
      railRun("metal", [[22.8, s * 8.65, Z3 + 0.22], [27.2, s * 8.65, Z3 + 0.22]], 1.0, 1.5);
    }
    /* two rows of windows: the flag bridge on the 03 level, the navigating
       bridge on the 04 (Dec 1959)                                          */
    function winRow(F, ss, hh) {
      ss.forEach(function (sv) { plate("glass", F, rectPts(sv - 0.4, -hh, sv + 0.4, hh), -0.02, 0.05); });
    }
    var WF = [-2.8, -1.8, -0.8, 0.2, 1.2, 2.2];
    winRow(face(P4, 2, Z3, Z4, 0.15, 0.5, 16.4), [-2.6, -1.6, -0.6, 0.4, 1.4, 2.4], 0.42);
    winRow(face(P4, 1, Z3, Z4, 0.15, 0.5, 16.4), [-1.0, 0.0, 1.0], 0.42);
    winRow(face(P4, 3, Z3, Z4, 0.15, 0.5, 16.4), [-1.0, 0.0, 1.0], 0.42);
    winRow(face(P4, 0, Z3, Z4, 0.15, 0.8, 16.4), [-2.2, -1.2, -0.2, 0.8, 1.8], 0.42);
    winRow(face(P4, 4, Z3, Z4, 0.15, 0.2, 16.4), [-1.8, -0.8, 0.2, 1.2, 2.2], 0.42);
    winRow(face(P3F, 2, Z2, Z3, 0.15, 0.5, 13.6), WF, 0.38);
    winRow(face(P3F, 1, Z2, Z3, 0.15, 0.5, 13.6), [-1.2, 0.0, 1.2], 0.38);
    winRow(face(P3F, 3, Z2, Z3, 0.15, 0.5, 13.6), [-1.2, 0.0, 1.2], 0.38);
    /* the after 03 level round the after director tower and the mainmast,
       and the casing round the after stack's foot                          */
    var P3A = sym([[-31.0, 3.2], [-28.0, 4.8], [-18.0, 4.8], [-15.0, 3.4]]);
    prism("sup", P3A, Z2, Z3, 0.15, 4.0);
    railRoof(roofOf(P3A, 0.15, 0.1), Z3, null, 2.2);
    var P3S = sym([[-10.5, 4.4], [0.6, 4.4]]);
    prism("sup", P3S, Z2, Z3 - 0.6, 0.12, 4.0);

    /* ---------------------------------------------- the directors -------- */
    /* the Mk 54 main battery director: its housing, the rangefinder ears and
       the Mk 13 reflector on top                                           */
    function mk54(x, z, yaw) {
      stamp(x, 0, z, yaw, function () {
        cz("sup", 1.3, 1.45, 0.5, 14, 0, 0, 0);
        loftX("sup", [[-2.0, 1.25, 0.5, 2.2], [-1.7, 1.55, 0.5, 2.6], [1.3, 1.55, 0.5, 2.6],
                      [2.0, 1.3, 0.5, 2.0]], 12, 0.3);
        bar("sup", -0.3, -2.9, 1.75, -0.3, 2.9, 1.75, 0.26);
        for (var e = -1; e <= 1; e += 2) bx("sup", 0.6, 0.45, 0.7, -0.3, e * 2.9, 1.75);
        bx("metal", 0.22, 0.22, 0.7, 0.3, 0, 2.95);
        var g = new THREE.CylinderGeometry(2.2, 2.2, 0.8, 10, 1, true, -0.55, 1.1);
        g.rotateX(PI / 2); g.rotateZ(-PI / 2); g.translate(2.2 + 0.55, 0, 3.4);
        both("dark", g);
      });
    }
    /* the Mk 56 directors of the 3-inch battery: a box with its round dish */
    function mk56(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.75, 0.85, 0.4, 10, 0, 0, 0);
        bx("sup", 2.0, 1.5, 1.1, -0.1, 0, 0.95);
        bx("glass", 0.05, 1.1, 0.3, 0.92, 0, 1.25);
        var g = new THREE.CylinderGeometry(0.85, 0.35, 0.35, 14, 1, false);
        g.rotateZ(-PI / 2); g.translate(0.4, 0, 2.25);
        cur.dark.add(g);
        bx("metal", 0.2, 0.2, 0.5, 0.1, 0, 1.75);
      });
    }
    mk54(23.5, Z4 + 1.2, 0);
    cz("sup", 1.5, 1.6, 1.3, 14, 23.5, 0, Z4 - 0.1);
    /* the after director stands on its own round tower over the 03 level */
    cz("sup", 1.55, 1.65, 21.6 - Z3 + 0.1, 16, -26.0, 0, Z3 - 0.1);
    prism("sup", rounded(2.5, 2.5, 0.7, 16, -26.0), 21.4, 21.6, 0, 3.0);
    railRoof(rounded(2.4, 2.4, 0.7, 10, -26.0), 21.6, null, 1.8);
    mk54(-26.0, 21.6, PI);
    /* the Mk 56s on their pedestals amid the waist tubs, and the after one
       on its house ahead of No. 3                                          */
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.9, 1.0, 14.8 - Z2 + 0.1, 12, -6.0, s * 6.6, Z2 - 0.1);
      mk56(-6.0, s * 6.6, 14.8, s * 0.5);
    }
    var PH = sym([[-36.0, 2.2], [-31.5, 2.6]]);
    prism("sup", PH, Z2, Z2 + 1.4, 0.1, 3.0);
    mk56(-33.6, 0, Z2 + 1.4, PI);

    /* --------------------------------------------------------- the stacks -- */
    /* the forward stack: slim and tall out of the bridge block, the black
       cap above its searchlight platform (every photograph)                */
    var FSX = 12.4;
    cz("sup", 1.9, 1.95, 26.0 - Z3, 20, FSX, 0, Z3);
    cz("dark", 2.0, 1.95, 2.0, 20, FSX, 0, 26.0);
    prism("sup", rounded(3.6, 2.3, 0.45, 18, FSX), 25.7, 26.0, 0, 3.0);
    railRoof(rounded(3.5, 2.2, 0.45, 12, FSX), 26.0, null, 1.6);
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.35, 0.4, 0.5, 8, FSX + s * 2.7, 0, 26.0);
      cx("dark", 0.55, 0.55, 0.9, 10, FSX + s * 2.7 - 0.45, 0, 26.95);
      bx("sup", 0.3, 1.1, 0.5, FSX + s * 2.7, 0, 26.6);
    }
    /* the after stack: wide, round, the black top and the louvred casing on
       its forward foot (Dec 1959)                                          */
    var ASX = -5.2;
    prism("sup", rounded(3.9, 3.3, 0.75, 22, ASX), Z2, 22.0, 0.05, 4.0, true);
    prism("dark", rounded(3.92, 3.32, 0.75, 22, ASX), 22.0, 25.0, 0.0, 4.0, true);
    bandIn("dark", rounded(3.92, 3.32, 0.75, 22, ASX), rounded(3.62, 3.02, 0.75, 22, ASX), 23.6, 25.0);
    prism("dark", rounded(3.7, 3.1, 0.75, 18, ASX), 23.9, 23.95, 0, 4.0);
    bx("sup", 1.6, 4.0, 2.6, ASX + 4.2, 0, Z3 - 0.6 + 1.3);
    for (i = 0; i < 5; i++) bx("dark", 0.05, 3.4, 0.08, ASX + 5.02, 0, Z3 - 0.2 + i * 0.45);
    bar("metal", ASX - 1.0, 3.45, Z3, ASX - 1.0, 3.45, 24.8, 0.05);

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
    /* No. 51 on the centreline before the bridge, raised to fire over No. 2;
       Nos. 52-55 in the waist on the 01 level; No. 56 aft over No. 3       */
    cz("sup", 2.6, 2.8, 13.6 - Z2 + 0.1, 18, 37.0, 0, Z2 - 0.1);
    stamp(37.0, 0, 13.6, 0, gun5);
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 2.35, 2.45, 0.4, 12, 18.0, s * 9.1, Z1 - 0.1);
      stamp(18.0, s * 9.1, Z1 + 0.3, s * 0.30, gun5);
      cz("sup", 2.35, 2.45, 0.4, 12, -27.0, s * 8.8, Z1 - 0.1);
      stamp(-27.0, s * 8.8, Z1 + 0.3, s * (PI - 0.35), gun5);
    }
    cz("sup", 2.5, 2.7, 0.8, 16, -40.0, 0, Z1 - 0.1);
    stamp(-40.0, 0, Z1 + 0.7, PI, gun5);

    /* ------------------------------------------ the 3-inch/50 twin mounts -- */
    /* open twin mounts in round tubs: one on the forecastle, four a side
       round the waist (Dec 1959 starboard, mirrored); guns trained out     */
    function gun3(x, y, z, yaw) {
      ringWall("sup", x, y, z, z + 1.1, 2.2, 14, 0.09);
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.8, 0.95, 0.75, 10, 0, 0, 0);
        for (var q = -1; q <= 1; q += 2) {
          bx("sup", 1.6, 0.5, 0.9, -0.15, q * 0.52, 1.2);
          bar("sup", 0.6, q * 0.52, 1.35, 4.0, q * 0.52, 1.75, 0.085);
        }
        bx("sup", 0.9, 0.55, 0.45, -1.05, 0, 0.95);
      });
    }
    gun3(82.0, 0, topZ(82.0, 0) - 0.05, 0);
    for (s = -1; s <= 1; s += 2) {
      gun3(9.0, s * 9.0, Z1, s * 0.9);
      gun3(1.0, s * 9.2, Z1, s * 1.2);
      gun3(-13.0, s * 9.1, Z1, s * 1.6);
      gun3(-19.5, s * 9.0, Z1, s * 2.0);
    }

    /* ------------------------------------------------------------- masts --- */
    /* Measured off the late-1950s port bow view against the after stack's
       25 m: both masts grey to about the stack tops, black above, as the
       photographs show them.
       The foremast between the stacks: the pole, the lattice platform at
       29 m, the wide yard at 32.5 m, the air search grid at its head from
       34.4 to 37.2 m, the small surface search over it, the topmast.       */
    var FMX = 4.2;
    tube("metal", FMX, 0, Z2, FMX, 0, 26.0, 0.42, 0.33, 8);
    tube("dark", FMX, 0, 26.0, FMX, 0, 37.6, 0.33, 0.22, 8);
    tube("dark", FMX, 0, 37.6, FMX, 0, 42.0, 0.15, 0.06, 6);
    for (s = -1; s <= 1; s += 2) bar("metal", FMX - 2.6, s * 2.2, Z2, FMX - 0.2, s * 0.25, 26.0, 0.14);
    tower("dark", FMX - 0.9, FMX + 1.3, 1.0, FMX - 0.8, FMX + 1.2, 0.9, 27.2, 29.2, [0, 0.5, 1.0], 0.06, 0.03);
    prism("dark", rounded(1.9, 1.7, 0.5, 12, FMX + 0.2), 29.1, 29.3, 0, 3.0);
    railRoof(rounded(1.85, 1.65, 0.5, 8, FMX + 0.2), 29.3, null, 1.4);
    bar("dark", FMX, -4.8, 32.5, FMX, 4.8, 32.5, 0.09);
    for (s = -1; s <= 1; s += 2) bar("dark", FMX, s * 4.2, 32.5, FMX, s * 4.2, 31.4, 0.03);
    cz("dark", 0.3, 0.3, 0.8, 8, FMX + 0.4, 0, 33.6);
    stamp(FMX + 0.9, 0, 34.4, 0, function () { grid("dark", 2.7, 2.8, 0.5, 8); });
    bar("dark", FMX + 0.5, 0, 35.8, FMX + 2.1, 0, 35.8, 0.06);
    bx("dark", 0.35, 2.6, 0.45, FMX + 0.5, 0, 38.4);
    bar("dark", FMX, -2.2, 40.2, FMX, 2.2, 40.2, 0.04);
    /* the mainmast abaft the after stack: the yard at 30.8 m with its ECM
       boxes, the SPS-8 height finder at the head from 34.4 to 38.3 m with
       its feed on an arm before it, the topmast over it                     */
    var MMX = -14.0;
    tube("metal", MMX, 0, Z3, MMX, 0, 25.0, 0.45, 0.36, 8);
    tube("dark", MMX, 0, 25.0, MMX, 0, 38.6, 0.36, 0.22, 8);
    tube("dark", MMX, 0, 38.6, MMX, 0, 41.7, 0.15, 0.06, 6);
    for (s = -1; s <= 1; s += 2) bar("metal", MMX - 2.8, s * 2.4, Z3, MMX - 0.2, s * 0.25, 25.0, 0.14);
    bar("dark", MMX, -4.4, 30.8, MMX, 4.4, 30.8, 0.09);
    for (s = -1; s <= 1; s += 2) bx("dark", 0.9, 0.8, 0.9, MMX, s * 3.6, 31.3);
    prism("dark", rounded(1.5, 1.4, 0.5, 10, MMX + 0.3), 33.4, 33.6, 0, 3.0);
    cz("dark", 0.32, 0.32, 0.8, 8, MMX + 0.3, 0, 33.6);
    stamp(MMX + 1.0, 0, 34.4, 0, function () {
      grid("dark", 2.1, 3.9, 0.7, 7);
      bar("dark", 0.6, 0, 1.9, 2.6, 0, 1.9, 0.07);
      bx("dark", 0.5, 0.7, 1.1, 2.7, 0, 1.9);
    });

    /* ------------------------------------------------------ the fantail --- */
    /* the aircraft crane at the transom: pedestal, house and the lattice
       jib raised steeply forward (Dec 1959, 1954)                          */
    var CX = -105.5, cz0 = topZ(CX, 0) - 0.05;
    cz("sup", 1.2, 1.4, 2.4, 14, CX, 0, cz0);
    bx("sup", 2.8, 2.3, 1.7, CX + 0.2, 0, cz0 + 3.15);
    tower("metal", CX + 0.4, CX + 1.4, 0.75, CX + 6.0, CX + 6.6, 0.25, cz0 + 3.3, cz0 + 16.5,
          [0, 0.2, 0.4, 0.6, 0.8, 1.0], 0.1, 0.04);
    bar("metal", CX - 0.6, 0, cz0 + 5.2, CX + 6.3, 0, cz0 + 16.5, 0.05);
    bar("metal", CX + 6.4, 0, cz0 + 16.3, CX + 6.4, 0, cz0 + 10.0, 0.02);
    /* the boats beside the crane, one under its canvas */
    function boat(xc, yc, zk, cover) {
      stamp(xc, yc, zk, 0, function () {
        var L = 4.3, B = 1.3;
        loftX(cover ? "rad" : "sup", [[-L, B * 0.82, 0.32, 1.10], [-L + 0.5, B * 0.96, 0.06, 1.13],
                      [-L * 0.3, B, 0.0, 1.13], [L * 0.35, B * 0.93, 0.06, 1.16],
                      [L * 0.72, B * 0.62, 0.25, 1.20], [L * 0.94, B * 0.22, 0.6, 1.23],
                      [L, 0.01, 0.9, 1.23]], 10, 0.55);
        if (cover) loftX("rad", [[-L + 0.4, B * 0.8, 1.1, 1.75], [L * 0.6, B * 0.8, 1.1, 1.8],
                                 [L * 0.85, B * 0.4, 1.1, 1.6]], 8, 0.6);
        else bx("rad", 2.6, 1.7, 0.8, -1.0, 0, 1.5);
        bx("dark", 0.5, 1.9, 0.4, -2.5, 0, -0.05);
        bx("dark", 0.5, 1.9, 0.4, 2.0, 0, -0.05);
      });
    }
    boat(-101.0, 5.5, topZ(-101.0, 5.5) + 0.25, false);
    boat(-101.0, -5.5, topZ(-101.0, -5.5) + 0.25, true);
    /* the hangar hatch let into the fantail ahead of them (overhead c1949,
       Dec 1959): painted steel in the teak, its coaming dark               */
    var HZ = topZ(-88.0, 0) + 0.03;
    flat("sup", -95.0, -4.2, -81.0, 4.2, HZ, 0, 0, 3.5, 2.1);
    bx("dark", 14.2, 0.12, 0.08, -88.0, 4.26, HZ);
    bx("dark", 14.2, 0.12, 0.08, -88.0, -4.26, HZ);
    bx("dark", 0.12, 8.6, 0.08, -95.05, 0, HZ);
    bx("dark", 0.12, 8.6, 0.08, -80.95, 0, HZ);
    /* bitts, the ensign staff at the transom and the jackstaff at the stem */
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      cz("metal", 0.2, 0.22, 0.55, 6, x - 0.45, y, z0);
      cz("metal", 0.2, 0.22, 0.55, 6, x + 0.45, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(-103.0, s * 8.6); bitts(-75.0, s * 10.6); bitts(-30.0, s * 11.0);
      bitts(55.0, s * 10.0); bitts(80.0, s * 7.8);
    }
    bar("metal", -108.8, 0, deckZ(-108.8), -108.8, 0, deckZ(-108.8) + 4.0, 0.06);
    bar("metal", 108.5, 0, deckZ(108.5) + 0.4, 108.5, 0, deckZ(108.5) + 3.4, 0.05);
    /* ventilators and hatches on the forecastle and the quarterdeck */
    [[94.0, 3.6], [94.0, -3.6], [77.0, 5.8], [77.0, -5.8], [70.0, 0.0], [-70.0, 6.4],
     [-70.0, -6.4], [-64.0, 0.0], [-76.0, 3.0]].forEach(function (p) {
      cz("sup", 0.5, 0.55, 0.5, 6, p[0], p[1], topZ(p[0], p[1]) - 0.03);
    });
    /* team identification lying on the forecastle and on No. 3's roof,
       where the camera looks down on them                                */
    flat("team", 90.0, -2.2, 95.0, 2.2, topZ(92.5, 0) + 0.06, 0, 0, 1, 1);
    stamp(X_T3, 0, Z_T3 + 3.37, PI, function () { flat("team", -5.8, -1.8, -3.4, 1.8, 0.0, 0, 0, 1, 1); });

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e50_cruiser"] = {
  len: 218.4,
  build: function (THREE, M, C) { return HeroDesMoinesCA.build(THREE, M, C); }
};
