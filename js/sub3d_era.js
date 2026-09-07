/* ============ sub3d_era.js -- parametric era submarines ============
   units3d_subs.js owns the ten generic boats the original roster shipped
   with. This file is the era layer: one builder that grows a named class
   out of the numbers a recognition manual actually prints -- length and
   beam, what the body section does between them, which of six fairwater
   architectures sits on top and how far aft, where the diving planes are,
   whether the tail is a cruciform or an X, how many shafts turn and
   whether they end in a screw or a shrouded pumpjet, and whether the
   casing carries a gun or a missile.

   Model space follows models3d.js and warship3d.js: +X bow, +Y to port
   (left), +Z up, real metres, hull axis on z = 0. render3d.js stands the
   model up with rotation.x = -PI/2 and renormalises it from
   UNIT_MODELS[id].len, so len below MUST be real metres.

   Nothing here rotates the finished group. units3d_subs.js was authored
   Y-up and had to be patched twice to undo that; this file is authored in
   the shared convention from the first line, so a mesh built pointing at
   +X is a bow and a mesh built pointing at +Z is a sail.

   The spec table lives in sub_specs.js and is keyed by unit id.          */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof SUBS === "undefined") { var SUBS = {}; }

var Sub3D = (function () {
  "use strict";

  var PI = Math.PI;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function sgn(v) { return v < 0 ? -1 : 1; }

  /* --------------------------------------------------------------- paint
     Submarines only ever wear two schemes. The scheme is painted INTO the
     canvas rather than carried on the material colour, because a canvas map
     is sRGB-decoded identically by the comparison harness and by the game,
     while a material colour is only converted to linear inside render3d --
     a near-black hull tinted through material.color comes out pale grey in
     any tool that does not run that conversion. A plate boat is a shade
     lighter and harder than a tiled one: painted steel catches a highlight,
     anechoic rubber does not.                                             */
  var CAMO = {
    black:    { plate: "#32373d", tiles: "#262b30" },
    darkgrey: { plate: "#383f46", tiles: "#2e343a" }
  };

  var TEX = {};
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }

  /* The hull loft's U runs along the length and its V runs around the
     girth, and the loft tells us where the girth is: v = 0 is port at the
     waterline, 0.25 is the keel-up centreline, 0.5 starboard, 0.75 the
     keel. So a row of limber holes just under the deck edge is a dashed
     line at v = 0.115 and its mirror at v = 0.385.                       */
  function skinTex(THREE, kind, camo) {
    var key = kind + "_" + camo;
    if (TEX[key]) return TEX[key];
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rngOf(key.length * 7717 + 53), i;
    g.fillStyle = (CAMO[camo] || CAMO.black)[kind === "tiles" ? "tiles" : "plate"];
    g.fillRect(0, 0, W, H);

    if (kind === "smooth") {
      /* Faired painted steel: the strakes are there if you look, and nothing
         else is. No limber-hole dashes, no rust runs - a boat whose casing
         was built flush and kept painted. */
      var sy;
      g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
      for (i = 1; i < 7; i++) { sy = i * H / 7; g.beginPath(); g.moveTo(0, sy); g.lineTo(W, sy); g.stroke(); }
      for (i = 0; i < 40; i++) {
        g.globalAlpha = 0.012 + R() * 0.022;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, R() * H, 40 + R() * 130, 8 + R() * 20);
      }
      g.globalAlpha = 1;
    } else if (kind === "tiles") {
      /* anechoic rubber: a faint rectangular panel grid, a few tiles a
         shade off, the odd one lost and patched. Nothing shiny.         */
      var tw = 17, th = 21, x, y;
      for (y = 0; y < H; y += th) {
        for (x = 0; x < W; x += tw) {
          g.fillStyle = (R() < 0.5 ? "rgba(255,255,255," : "rgba(0,0,0,") +
                        (0.006 + R() * 0.020).toFixed(3) + ")";
          g.fillRect(x + 1, y + 1, tw - 2, th - 2);
        }
      }
      g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;
      for (y = 0; y <= H; y += th) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      for (x = 0; x <= W; x += tw) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      g.fillStyle = "rgba(122,116,104,0.09)";
      for (i = 0; i < 10; i++)
        g.fillRect(((R() * W / tw) | 0) * tw + 1, ((R() * H / th) | 0) * th + 1, tw - 2, th - 2);
      g.globalAlpha = 0.07; g.fillStyle = "#07090a";
      for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 20 + R() * 90, 6 + R() * 18);
      g.globalAlpha = 1;
    } else {
      /* welded plate: strake seams along her, frame butts around her,
         patchwork so no two strakes weather alike, limber holes, rust.
         V runs around the girth -- 0 is port at the waterline, 0.25 the
         deck centreline -- so a row of limber holes just under the deck
         edge is a dashed line at v = 0.115 and its mirror at 0.385.     */
      var yy, xx;
      g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.7;
      for (i = 1; i < 9; i++) { yy = i * H / 9; g.beginPath(); g.moveTo(0, yy); g.lineTo(W, yy); g.stroke(); }
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.1;
      for (i = 1; i < 26; i++) { xx = i * W / 26; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, H); g.stroke(); }
      for (i = 0; i < 95; i++) {
        g.globalAlpha = 0.022 + R() * 0.038;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, R() * H, 24 + R() * 90, 6 + R() * 16);
      }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(0,0,0,0.72)";
      var rows = [0.115, 0.385], r2, hx;
      for (r2 = 0; r2 < rows.length; r2++) {
        yy = rows[r2] * H;
        for (hx = 8; hx < W; hx += 26) g.fillRect(hx, yy, 12, 8);
      }
      g.globalAlpha = 0.09; g.fillStyle = "#4a3324";
      for (i = 0; i < 70; i++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 10 + R() * 42);
      g.globalAlpha = 1;
    }

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    TEX[key] = t; return t;
  }
  function skinMap(THREE, kind, camo, ru, rv) {
    var t = skinTex(THREE, kind, camo).clone();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(ru, rv);
    t.needsUpdate = true;
    return t;
  }

  /* ==================================================== body sections
     [u, halfWidth, halfHeight, centreOffset, squareness] with u measured
     BACK FROM THE BOW and every fraction taken on the half-beam. These
     are five genuinely different curves, not one curve with a knob on it:
     where the maximum beam sits and how long the run aft is, is most of
     what separates a 1950s boat from an Albacore hull at a distance.    */
  var HULL = {
    /* parallel-sided with a blunt rounded forefoot -- Whiskey, Romeo,
       Ming, Foxtrot: maximum beam by 30 percent and held to 62 percent */
    cigar: [
      [0.000, 0.055, 0.055,  0.100, 1.00],
      [0.018, 0.300, 0.300,  0.090, 1.00],
      [0.045, 0.520, 0.530,  0.078, 1.00],
      [0.085, 0.720, 0.740,  0.060, 1.00],
      [0.140, 0.880, 0.900,  0.040, 1.00],
      [0.210, 0.970, 0.980,  0.020, 1.00],
      [0.300, 1.000, 1.000,  0.000, 1.00],
      [0.480, 1.000, 1.000,  0.000, 1.00],
      [0.620, 0.990, 0.990,  0.000, 1.00],
      [0.720, 0.940, 0.950,  0.000, 1.00],
      [0.810, 0.830, 0.860, -0.010, 1.00],
      [0.880, 0.680, 0.720, -0.020, 1.00],
      [0.935, 0.490, 0.540, -0.020, 1.00],
      [0.972, 0.300, 0.340, -0.010, 1.00],
      [1.000, 0.090, 0.100,  0.000, 1.00]
    ],
    /* Albacore: bluff round bow, maximum beam about a third back, then a
       long fine run -- Sturgeon, 688, Seawolf, Virginia, Yuan, Hai Lung */
    teardrop: [
      [0.000, 0.070, 0.070,  0.020, 1.00],
      [0.016, 0.290, 0.290,  0.018, 1.00],
      [0.042, 0.490, 0.490,  0.012, 1.00],
      [0.082, 0.680, 0.680,  0.006, 1.00],
      [0.140, 0.850, 0.850,  0.000, 1.00],
      [0.215, 0.950, 0.950,  0.000, 1.00],
      [0.310, 1.000, 1.000,  0.000, 1.00],
      [0.430, 0.995, 0.995,  0.000, 1.00],
      [0.545, 0.960, 0.960,  0.000, 1.00],
      [0.660, 0.880, 0.880,  0.000, 1.00],
      [0.760, 0.760, 0.760,  0.000, 1.00],
      [0.850, 0.600, 0.600,  0.000, 1.00],
      [0.920, 0.420, 0.420,  0.000, 1.00],
      [0.968, 0.250, 0.250,  0.000, 1.00],
      [1.000, 0.075, 0.075,  0.000, 1.00]
    ],
    /* Kilo: nearly bulbous forward, full beam carried from 27 to 47
       percent, a short blunt run aft on one very big screw            */
    fat: [
      [0.000, 0.120, 0.120,  0.020, 1.00],
      [0.012, 0.380, 0.380,  0.016, 1.00],
      [0.032, 0.600, 0.600,  0.010, 1.00],
      [0.065, 0.790, 0.790,  0.005, 1.00],
      [0.110, 0.920, 0.920,  0.000, 1.00],
      [0.175, 0.985, 0.985,  0.000, 1.00],
      [0.270, 1.000, 1.000,  0.000, 1.00],
      [0.470, 1.000, 1.000,  0.000, 1.00],
      [0.590, 0.975, 0.975,  0.000, 1.00],
      [0.700, 0.905, 0.905,  0.000, 1.00],
      [0.795, 0.790, 0.790,  0.000, 1.00],
      [0.870, 0.630, 0.630,  0.000, 1.00],
      [0.928, 0.455, 0.455,  0.000, 1.00],
      [0.972, 0.270, 0.270,  0.000, 1.00],
      [1.000, 0.100, 0.100,  0.000, 1.00]
    ],
    /* WW2 fleet boat: a fine knife entry with real sheer, so the stem
       stands clear of the water and the casing walks aft off it        */
    fleetboat: [
      [0.000, 0.030, 0.090,  0.660, 0.80],
      [0.030, 0.190, 0.310,  0.520, 0.86],
      [0.070, 0.400, 0.520,  0.380, 0.92],
      [0.130, 0.650, 0.720,  0.250, 0.97],
      [0.200, 0.855, 0.880,  0.140, 1.00],
      [0.290, 0.970, 0.970,  0.052, 1.00],
      [0.380, 1.000, 1.000,  0.000, 1.00],
      [0.560, 1.000, 1.000,  0.000, 1.00],
      [0.680, 0.960, 0.960,  0.000, 1.00],
      [0.780, 0.860, 0.880, -0.010, 1.00],
      [0.860, 0.700, 0.740, -0.020, 1.00],
      [0.920, 0.510, 0.570, -0.020, 1.00],
      [0.965, 0.310, 0.360, -0.010, 1.00],
      [0.985, 0.200, 0.235,  0.000, 1.00],
      [1.000, 0.100, 0.120,  0.000, 1.00]
    ],
    /* Sang-o: a short plain cylinder, blunt at both ends           */
    midget: [
      [0.000, 0.140, 0.140,  0.020, 1.00],
      [0.020, 0.400, 0.400,  0.016, 1.00],
      [0.050, 0.620, 0.620,  0.010, 1.00],
      [0.090, 0.790, 0.790,  0.005, 1.00],
      [0.140, 0.910, 0.910,  0.000, 1.00],
      [0.200, 0.975, 0.975,  0.000, 1.00],
      [0.280, 1.000, 1.000,  0.000, 1.00],
      [0.450, 1.000, 1.000,  0.000, 1.00],
      [0.600, 1.000, 1.000,  0.000, 1.00],
      [0.700, 0.955, 0.955,  0.000, 1.00],
      [0.790, 0.865, 0.865,  0.000, 1.00],
      [0.860, 0.720, 0.720,  0.000, 1.00],
      [0.915, 0.545, 0.545,  0.000, 1.00],
      [0.960, 0.355, 0.355,  0.000, 1.00],
      [1.000, 0.130, 0.130,  0.000, 1.00]
    ]
  };

  /* casing: the flat walking deck laid over the pressure hull. A fleet
     boat has a real ship's deck; a Virginia barely has one at all.     */
  var CASING = {
    cigar:     { u0: 0.045, u1: 0.860, wMid: 0.60, wEnd: 0.30, sq: 0.38, proud: 0.070 },
    fleetboat: { u0: 0.018, u1: 0.870, wMid: 0.68, wEnd: 0.22, sq: 0.30, proud: 0.120 },
    fat:       { u0: 0.090, u1: 0.800, wMid: 0.42, wEnd: 0.20, sq: 0.55, proud: 0.030 },
    teardrop:  { u0: 0.110, u1: 0.760, wMid: 0.34, wEnd: 0.16, sq: 0.62, proud: 0.026 },
    midget:    { u0: 0.070, u1: 0.840, wMid: 0.46, wEnd: 0.22, sq: 0.45, proud: 0.042 }
  };

  function sample(tbl, u) {
    var i, a, b, f;
    if (u <= tbl[0][0]) return tbl[0];
    for (i = 1; i < tbl.length; i++) {
      if (u <= tbl[i][0]) {
        a = tbl[i - 1]; b = tbl[i];
        f = (u - a[0]) / Math.max(1e-6, b[0] - a[0]);
        return [u, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f,
                a[3] + (b[3] - a[3]) * f, a[4] + (b[4] - a[4]) * f];
      }
    }
    return tbl[tbl.length - 1];
  }

  /* ======================================================= fairwaters
     Six architectures. Each level is {t, c, a, w, e}: t up the fin as a
     fraction of sailH, c the fore-aft shift of that level's centre as a
     fraction of sailLen, a its half chord, w its half width, e the plan
     exponent -- below 1 squares the section off, 1 keeps it elliptical.
     They are drawn as six different shapes on purpose. One box scaled
     six ways is exactly why the old boats all read alike.               */
  var SAIL = {
    /* long low slab with the bridge raised forward of centre and a
       lower gun/access step running aft -- Whiskey, Nautilus, GUPPY   */
    step: {
      main: [
        { t: 0.00, c: 0.000, a: 0.500, w: 0.500, e: 0.55 },
        { t: 0.30, c: 0.005, a: 0.489, w: 0.492, e: 0.52 },
        { t: 0.56, c: 0.010, a: 0.474, w: 0.476, e: 0.50 },
        { t: 0.62, c: 0.012, a: 0.462, w: 0.462, e: 0.50 }
      ],
      extra: [
        { t: 0.28, c: 0.130, a: 0.240, w: 0.452, e: 0.55 },
        { t: 0.72, c: 0.135, a: 0.228, w: 0.432, e: 0.52 },
        { t: 1.00, c: 0.142, a: 0.204, w: 0.392, e: 0.50 }
      ],
      shears: 0.0, windows: true
    },
    /* tall flat-sided square-topped box with a raked leading edge --
       Sturgeon, 688, Foxtrot, Ming, Yuan, Hai Lung, Sinpo             */
    slab: {
      main: [
        { t: 0.00, c:  0.000, a: 0.500, w: 0.500, e: 0.48 },
        { t: 0.30, c: -0.008, a: 0.492, w: 0.485, e: 0.46 },
        { t: 0.66, c: -0.020, a: 0.478, w: 0.462, e: 0.45 },
        { t: 0.90, c: -0.030, a: 0.455, w: 0.437, e: 0.45 },
        { t: 1.00, c: -0.035, a: 0.440, w: 0.425, e: 0.45 }
      ],
      extra: null, shears: 0.0, windows: false
    },
    /* short upright conning tower with the periscope shears standing
       clear in a round column at the after end -- Romeo               */
    tower: {
      main: [
        { t: 0.00, c: 0.000, a: 0.500, w: 0.500, e: 0.60 },
        { t: 0.35, c: 0.000, a: 0.492, w: 0.480, e: 0.58 },
        { t: 0.72, c: 0.005, a: 0.478, w: 0.455, e: 0.56 },
        { t: 1.00, c: 0.010, a: 0.452, w: 0.422, e: 0.55 }
      ],
      extra: null, shears: 1.62, windows: true
    },
    /* broad low fin blended into the casing on a long swept fillet,
       rounded along the top -- Seawolf, Virginia                      */
    faired: {
      main: [
        { t: 0.00, c: -0.100, a: 0.660, w: 0.500, e: 0.85 },
        { t: 0.12, c: -0.045, a: 0.565, w: 0.492, e: 0.88 },
        { t: 0.38, c: -0.005, a: 0.505, w: 0.470, e: 0.90 },
        { t: 0.68, c:  0.000, a: 0.470, w: 0.428, e: 0.92 },
        { t: 0.88, c: -0.005, a: 0.425, w: 0.360, e: 0.95 },
        { t: 1.00, c: -0.022, a: 0.330, w: 0.250, e: 1.00 }
      ],
      extra: null, shears: 0.0, windows: false
    },
    /* short, very broad, and keeping nearly all its girth to a flat
       top, with the leading edge raked well back -- Kilo              */
    fat: {
      main: [
        { t: 0.00, c:  0.000, a: 0.500, w: 0.500, e: 0.72 },
        { t: 0.28, c: -0.010, a: 0.492, w: 0.492, e: 0.70 },
        { t: 0.62, c: -0.024, a: 0.478, w: 0.478, e: 0.68 },
        { t: 0.88, c: -0.038, a: 0.458, w: 0.458, e: 0.66 },
        { t: 1.00, c: -0.046, a: 0.442, w: 0.440, e: 0.65 }
      ],
      extra: null, shears: 0.0, windows: true
    },
    /* a stubby stepped tower barely taller than it is long -- Sang-o  */
    low: {
      main: [
        { t: 0.00, c: 0.000, a: 0.500, w: 0.500, e: 0.62 },
        { t: 0.46, c: 0.010, a: 0.470, w: 0.470, e: 0.58 },
        { t: 0.54, c: 0.100, a: 0.330, w: 0.400, e: 0.55 },
        { t: 1.00, c: 0.120, a: 0.300, w: 0.352, e: 0.55 }
      ],
      extra: null, shears: 0.0, windows: true
    }
  };

  var SAILW = { step: 0.36, slab: 0.36, tower: 0.34, faired: 0.34, fat: 0.46, low: 0.44 };

  /* ------------------------------------------------------- fin solid
     A stack of superelliptic plan rings, stitched and capped. Genuinely
     tapered in both chord and width, which a prism cannot be, and about
     240 triangles at NSEG 20 -- cheap enough to spend on the one feature
     that identifies the boat.                                          */
  function finGeom(THREE, levels, NSEG) {
    var pos = [], uv = [], idx = [], i, j, lv, t, ct, st, e, nL = levels.length;
    for (i = 0; i < nL; i++) {
      lv = levels[i];
      for (j = 0; j <= NSEG; j++) {
        t = j / NSEG * PI * 2; ct = Math.cos(t); st = Math.sin(t); e = lv.e;
        pos.push(lv.cx + lv.a * sgn(ct) * Math.pow(Math.abs(ct), e),
                 lv.hw * sgn(st) * Math.pow(Math.abs(st), e), lv.z);
        uv.push(j / NSEG, i / (nL - 1));
      }
    }
    var ring = NSEG + 1, a, b, c, d;
    for (i = 0; i < nL - 1; i++) {
      for (j = 0; j < NSEG; j++) {
        a = i * ring + j; b = a + 1; c = a + ring; d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var base = (nL - 1) * ring, top = levels[nL - 1];
    pos.push(top.cx, 0, top.z); uv.push(0.5, 1);
    var ci = (pos.length / 3) - 1;
    for (j = 0; j < NSEG; j++) idx.push(base + j, base + j + 1, ci);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* ==================================================== the builder */
  function build(THREE, M, C, P) {
    var T = THREE, G = new T.Group();
    var L = P.len, B = P.beam, HB = B * 0.5;
    var hullKey = HULL[P.hull] ? P.hull : "cigar";
    var tbl = HULL[hullKey], cas = CASING[hullKey];
    var tiled = P.skin === "tiles";
    var teamCol = (C && C.team) || 0x3f7fd0;

    function halfW(u) { return sample(tbl, u)[1] * HB; }
    function hullTop(u) { var s = sample(tbl, u); return (s[3] + s[2]) * HB; }
    function deckTop(u) {
      return (u >= cas.u0 && u <= cas.u1) ? hullTop(u) + HB * cas.proud : hullTop(u);
    }
    function xOf(u) { return L * 0.5 - u * L; }

    /* ------------------------------------------------------ materials
       One texture per skin-and-scheme pair, cloned per surface so each gets
       its own repeat: one canvas covers 45 m of hull, which puts the frame
       butts about 1.7 m apart and the anechoic tiles at about 0.8 m. The
       fins and planes are extruded outlines whose UVs are raw metres, so
       they take a repeat of one texture per 15 m instead.               */
    var kind = tiled ? "tiles" : (P.skin === "smooth" ? "smooth" : "plate");
    var lenRep = Math.max(1.1, L / 45);
    var white = 0xffffff;
    var rough = tiled ? 0.93 : 0.86, metal = tiled ? 0.03 : 0.075;
    var skinMat = new T.MeshStandardMaterial({
      color: white, roughness: rough, metalness: metal,
      map: skinMap(T, kind, P.camo, lenRep, tiled ? 2 : 1) });
    var deckMat = new T.MeshStandardMaterial({
      color: 0xb2b8bc, roughness: 0.96, metalness: 0.03,
      map: skinMap(T, kind, P.camo, lenRep * 1.4, 1) });
    var sailPer = Math.max(0.25, 2 * (P.sailLen + B * 0.4) / 45);
    var sailMat = new T.MeshStandardMaterial({
      color: white, roughness: rough, metalness: metal,
      map: skinMap(T, kind, P.camo, sailPer, Math.max(0.25, P.sailH / 12)) });
    var trimMat = new T.MeshStandardMaterial({
      color: white, roughness: rough, metalness: metal,
      map: skinMap(T, kind, P.camo, 1 / 15, 1 / 15) });
    var ductMat = new T.MeshStandardMaterial({
      color: white, roughness: rough, metalness: metal,
      map: skinMap(T, kind, P.camo, 2.5, 0.6) });
    var metalMat = new T.MeshStandardMaterial({
      color: 0x5e666d, roughness: 0.55, metalness: 0.50 });
    var darkMat = new T.MeshStandardMaterial({
      color: 0x2b3034, roughness: 0.62, metalness: 0.38 });
    var propMat = new T.MeshStandardMaterial({
      color: 0x7d6a48, roughness: 0.48, metalness: 0.62 });
    var glassMat = new T.MeshStandardMaterial({
      color: 0x0e1418, roughness: 0.26, metalness: 0.42 });
    var teamMat = new T.MeshStandardMaterial({
      color: teamCol, roughness: 0.58, metalness: 0.20 });

    /* ------------------------------------------------ pressure hull */
    var secs = [], i, j, k, s;
    for (i = tbl.length - 1; i >= 0; i--) {            /* loft wants increasing x */
      s = tbl[i];
      secs.push({ x: xOf(s[0]), w: Math.max(0.04, s[1] * HB),
                  h: Math.max(0.04, s[2] * HB), zc: s[3] * HB, sq: s[4] });
    }
    G.add(new T.Mesh(M.loft(T, secs, 34), skinMat));

    /* ------------------------------------------------------- casing */
    var csec = [], NC = 14, u, sp;
    for (i = 0; i < NC; i++) {
      sp = i / (NC - 1);
      u = cas.u0 + (cas.u1 - cas.u0) * sp;
      var wf = cas.wEnd + (cas.wMid - cas.wEnd) * Math.pow(Math.sin(PI * sp), 0.42);
      csec.push({ x: xOf(u), w: Math.max(0.05, wf * HB),
                  h: HB * (0.05 + cas.proud), zc: hullTop(u) - HB * 0.05, sq: cas.sq });
    }
    csec.reverse();
    G.add(new T.Mesh(M.loft(T, csec, 26), deckMat));

    /* ================================================ the fairwater */
    var style = SAIL[P.sail] ? P.sail : "slab";
    var SD = SAIL[style];
    var SL = P.sailLen, SH = P.sailH, SW = B * SAILW[style];
    var uS = clamp(P.sailFrac, 0.05, 0.95);
    var cxS = xOf(uS), baseZ = deckTop(uS) - HB * 0.04;

    function toLevels(list, flare) {
      var out = [], n;
      if (flare) {
        n = list[0];
        out.push({ z: baseZ - HB * 0.05, cx: cxS + n.c * SL, a: n.a * SL * 1.06,
                   hw: n.w * SW * 1.22, e: n.e });
      }
      for (var q = 0; q < list.length; q++) {
        n = list[q];
        out.push({ z: baseZ + n.t * SH, cx: cxS + n.c * SL, a: n.a * SL,
                   hw: n.w * SW, e: n.e });
      }
      return out;
    }
    G.add(new T.Mesh(finGeom(T, toLevels(SD.main, true), 22), sailMat));
    if (SD.extra) G.add(new T.Mesh(finGeom(T, toLevels(SD.extra, false), 16), sailMat));

    /* periscope shears standing clear in a column of their own */
    if (SD.shears > 0) {
      var sh = new T.Mesh(new T.CylinderGeometry(SW * 0.34, SW * 0.38, SH * SD.shears, 10),
                          sailMat);
      sh.rotation.x = PI / 2;
      sh.position.set(cxS - SL * 0.34, 0, baseZ + SH * SD.shears * 0.5);
      G.add(sh);
    }

    /* bridge windows on the forward face, where a boat has an open one */
    if (SD.windows) {
      for (i = 0; i < 3; i++) {
        var win = new T.Mesh(new T.BoxGeometry(SL * 0.035, SW * 0.20, SH * 0.085), glassMat);
        win.position.set(cxS + SL * 0.30, (i - 1) * SW * 0.26,
                         baseZ + SH * (style === "step" ? 0.86 : 0.80));
        G.add(win);
      }
    }

    if (SD.windows) {
      var ckp = new T.Mesh(new T.BoxGeometry(SL * 0.20, SW * 0.52, SH * 0.10), darkMat);
      ckp.position.set(cxS + SL * (style === "step" ? 0.15 : 0.20), 0, baseZ + SH * 0.965);
      G.add(ckp);
    }

    /* team flash: a band round the fin, which is the only part of a
       submarine anybody ever sees, so it is the only place ownership
       can read from                                                  */
    var flash = new T.Mesh(new T.BoxGeometry(SL * 0.13, SW * 1.06, SH * 0.115), teamMat);
    flash.position.set(cxS - SL * 0.27, 0, baseZ + SH * 0.55);
    G.add(flash);

    /* masts above the fin top */
    var mtop = baseZ + SH;
    for (i = 0; i < 3; i++) {
      var mh = SH * (0.30 + i * 0.15);
      var mst = new T.Mesh(new T.CylinderGeometry(HB * 0.030, HB * 0.042, mh, 6), metalMat);
      mst.rotation.x = PI / 2;
      mst.position.set(cxS - SL * 0.08 + (i - 1) * SL * 0.11, 0, mtop + mh * 0.5);
      G.add(mst);
    }

    /* ================================================ diving planes */
    function planePair(cx, span, cRoot, cTip, sweep, thick, z, mtl) {
      var rf = cRoot * 0.5, ra = -cRoot * 0.5;
      var tf = cTip * 0.5 - sweep, ta = -cTip * 0.5 - sweep;
      var pts = [[cx + tf, -span], [cx + rf, 0], [cx + tf, span],
                 [cx + ta, span], [cx + ra, 0], [cx + ta, -span]];
      var g2 = M.slab(T, pts, thick);
      g2.translate(0, 0, -thick * 0.5);
      var msh = new T.Mesh(g2, mtl);
      msh.position.z = z;
      return msh;
    }
    if (P.planes === "sail") {
      G.add(planePair(cxS + SL * 0.02, B * 1.18, SL * 0.34, SL * 0.24, SL * 0.05,
                      HB * 0.075, baseZ + SH * 0.48, trimMat));
    } else {
      var uB = hullKey === "fleetboat" ? 0.155 : 0.235;
      G.add(planePair(xOf(uB), B * 1.12, L * 0.048, L * 0.034, L * 0.010,
                      HB * 0.075, hullTop(uB) - HB * 1.02, trimMat));
    }

    /* =============================================== stern and tail */
    var multi = (P.screws | 0) > 1;
    var uF = multi ? 0.945 : 0.882;                 /* rudders sit abaft the screws
                                                       on a twin-shaft boat        */
    var fx = xOf(uF);
    function tailFin(ang, R, rc, tc) {
      var swp = rc * 0.38;
      var pts = [[fx - rc * 0.5, 0], [fx + rc * 0.5, 0],
                 [fx + tc * 0.5 - swp, R], [fx - tc * 0.5 - swp, R]];
      var th = HB * 0.10;
      var g2 = M.slab(T, pts, th, "xz");
      g2.translate(0, th * 0.5, 0);
      var msh = new T.Mesh(g2, trimMat);
      msh.rotation.x = ang;
      G.add(msh);
    }
    var rc0 = L * 0.082, tc0 = L * 0.030;
    if (P.stern === "xtail") {                      /* four surfaces at 45 degrees */
      for (k = 0; k < 4; k++) tailFin(PI / 4 + k * PI / 2, HB * 1.34, rc0, tc0);
    } else {                                        /* four at 90 */
      tailFin(0, HB * 1.62, rc0, tc0);              /* upper rudder, the tall one */
      tailFin(PI, HB * 1.14, rc0, tc0);             /* lower rudder, draft-limited */
      tailFin(PI / 2, HB * 1.42, rc0, tc0);
      tailFin(-PI / 2, HB * 1.42, rc0, tc0);
    }

    /* ------------------------------------------------- propulsors */
    function screwAt(px, py, rad, nb) {
      var hub = new T.Mesh(new T.ConeGeometry(rad * 0.30, rad * 0.95, 12), propMat);
      hub.rotation.z = PI / 2;                       /* apex aft, along -X */
      hub.position.set(px - rad * 0.30, py, 0);
      G.add(hub);
      for (var q = 0; q < nb; q++) {
        var bg = new T.BoxGeometry(rad * 0.09, rad * 0.62, rad * 0.80);
        bg.rotateZ(0.55);
        bg.translate(0, 0, rad * 0.28 + rad * 0.40);
        var bm = new T.Mesh(bg, propMat);
        bm.rotation.x = q * PI * 2 / nb;
        bm.position.set(px, py, 0);
        G.add(bm);
      }
    }
    if (P.prop === "pumpjet") {
      var du = 0.955, dx = xOf(du), dr = HB * 0.60;
      var duct = new T.Mesh(new T.CylinderGeometry(dr, dr * 0.90, L * 0.075, 20, 1, true),
                            ductMat);
      duct.rotation.z = PI / 2;
      duct.position.set(dx, 0, 0);
      G.add(duct);
      var lip = new T.Mesh(new T.TorusGeometry(dr * 0.90, HB * 0.045, 6, 18), darkMat);
      lip.rotation.y = PI / 2;
      lip.position.set(dx - L * 0.037, 0, 0);
      G.add(lip);
      var jh = new T.Mesh(new T.ConeGeometry(HB * 0.26, L * 0.055, 10), darkMat);
      jh.rotation.z = PI / 2;
      jh.position.set(dx - L * 0.010, 0, 0);
      G.add(jh);
    } else {
      var nb0 = tiled ? 7 : (multi ? 5 : 6);
      if ((P.screws | 0) === 1) {
        screwAt(xOf(0.972), 0, HB * 0.62, nb0);
      } else {
        var uP = 0.905, px0 = xOf(uP), off = halfW(uP) * 1.02 + HB * 0.16;
        var rad0 = HB * 0.44;
        for (k = 0; k < 2; k++) {
          var sy = (k ? 1 : -1) * off;
          screwAt(px0, sy, rad0, nb0);
          var shaft = new T.Mesh(
            new T.CylinderGeometry(HB * 0.055, HB * 0.055, L * 0.085, 8), trimMat);
          shaft.rotation.z = PI / 2;
          shaft.position.set(px0 + L * 0.042, sy, 0);
          G.add(shaft);
          var brk = new T.Mesh(new T.BoxGeometry(L * 0.018, HB * 0.06, off * 1.05), trimMat);
          brk.position.set(px0 + L * 0.030, sy * 0.55, 0);
          brk.rotation.x = k ? -0.9 : 0.9;
          G.add(brk);
        }
        if ((P.screws | 0) >= 3) screwAt(xOf(0.972), 0, HB * 0.46, nb0);
      }
    }

    /* ------------------------------------------- torpedo shutters */
    var uT = hullKey === "fleetboat" ? 0.135 : 0.165;
    var sT = sample(tbl, uT), wT = sT[1] * HB, hT = sT[2] * HB, zT = sT[3] * HB;
    var fracs = [0.20, 0.50, 0.76];
    for (k = 0; k < 6; k++) {
      var side = k < 3 ? -1 : 1, lvl = k % 3;
      var zz = zT - hT * fracs[lvl];
      /* the section is a circle, so the flank at that height is where the
         shutter has to sit -- dropped straight down the beam it ends up
         buried inside the hull and invisible                            */
      var yy2 = wT * Math.sqrt(Math.max(0.05, 1 - fracs[lvl] * fracs[lvl]));
      var sd = new T.Mesh(new T.CylinderGeometry(HB * 0.14, HB * 0.14, HB * 0.06, 12), darkMat);
      sd.rotation.z = PI / 2;
      sd.position.set(xOf(uT + lvl * 0.011), side * yy2 * 0.99, zz);
      G.add(sd);
    }

    /* --------------------------------------------- casing fittings */
    for (k = 0; k < 4; k++) {
      var uh = cas.u0 + (cas.u1 - cas.u0) * (0.12 + k * 0.24);
      if (Math.abs(uh - uS) < P.sailLen / L * 0.6) continue;
      var ht = new T.Mesh(new T.CylinderGeometry(HB * 0.11, HB * 0.11, HB * 0.05, 10), darkMat);
      ht.rotation.x = PI / 2;
      ht.position.set(xOf(uh), 0, deckTop(uh) + HB * 0.01);
      G.add(ht);
    }

    /* ---------------------------------------------------- deck gun */
    if (P.deckGun) {
      var ug = clamp(uS - (SL / L) * 0.62 - 0.075, 0.14, 0.90);
      var gx = xOf(ug), gz = deckTop(ug);
      var ped = new T.Mesh(new T.CylinderGeometry(HB * 0.26, HB * 0.30, HB * 0.30, 10), darkMat);
      ped.rotation.x = PI / 2;
      ped.position.set(gx, 0, gz + HB * 0.15); G.add(ped);
      var shl = new T.Mesh(new T.BoxGeometry(HB * 0.34, HB * 0.52, HB * 0.36), metalMat);
      shl.position.set(gx - HB * 0.06, 0, gz + HB * 0.46); G.add(shl);
      for (k = 0; k < 2; k++) {
        var brl = new T.Mesh(
          new T.CylinderGeometry(HB * 0.045, HB * 0.055, L * 0.048, 8), metalMat);
        brl.rotation.z = PI / 2;
        brl.position.set(gx + L * 0.026, (k ? 1 : -1) * HB * 0.10, gz + HB * 0.50);
        G.add(brl);
      }
    }

    /* ----------------------------------------------- missile fit
       The one boat in this set that carries a missile carries it in the
       fairwater, not in a turtleback abaft it, so the tube hatch goes on
       top of the fin and the raised casing behind it stays low.       */
    if (P.missileDeck) {
      var mdU0 = uS + (SL / L) * 0.42, mdU1 = Math.min(0.80, mdU0 + 0.17);
      var msec = [], NM = 6;
      for (i = 0; i < NM; i++) {
        sp = i / (NM - 1);
        u = mdU0 + (mdU1 - mdU0) * sp;
        var mw = 0.30 + 0.16 * Math.pow(Math.sin(PI * sp), 0.5);
        msec.push({ x: xOf(u), w: mw * HB, h: HB * 0.20,
                    zc: hullTop(u) - HB * 0.06, sq: 0.55 });
      }
      msec.reverse();
      G.add(new T.Mesh(M.loft(T, msec, 16), deckMat));
      var hatch = new T.Mesh(
        new T.CylinderGeometry(SW * 0.30, SW * 0.30, SH * 0.035, 14), darkMat);
      hatch.rotation.x = PI / 2;
      hatch.position.set(cxS - SL * 0.04, 0, baseZ + SH + SH * 0.018);
      G.add(hatch);
    }

    return G;
  }

  /* ============================================================ registry */
  function registerAll(override) {
    var made = 0, kept = 0, id;
    for (id in SUBS) {
      if (!Object.prototype.hasOwnProperty.call(SUBS, id)) continue;
      if (!override && UNIT_MODELS[id] && !UNIT_MODELS[id].crude) { kept++; continue; }
      (function (Q, key) {
        UNIT_MODELS[key] = {
          len: Q.len || 80,
          build: function (THREE, M, C) { return build(THREE, M, C, Q); }
        };
      })(SUBS[id], id);
      made++;
    }
    return { made: made, kept: kept };
  }

  return { build: build, registerAll: registerAll, HULL: HULL, SAIL: SAIL, CAMO: CAMO };
})();
