/* ============ ru_su57.js - HERO model: Sukhoi Su-57 "Felon" ============
   Registers stealth_p ("Su-57 Felon", present day: rules.js row, air_specs
   20.1 m x 14.1 m). pact_e00_stealthfighter ("none in service") is NOT
   registered here and keeps resolving as before. One key, one variant: the
   series Su-57 as delivered from 2020 (AL-41F1 "izdeliye 117" engines, the
   "digital" camouflage), with the bays closed.

   Model space: +X nose, +Y left (port), +Z up, metres. The tables below are
   written in DRAWING units and converted once: s is metres aft of the nose
   tip, y is metres off the centreline, h is metres above the lowest line of
   the nacelles. X = 10.05 - s, Y = y * 0.983, Z = h - 0.85.

   References (Wikimedia Commons, fetched for this file, 960 px):
     A "Sukhoi T-50 3-view.svg" - top, side and front line drawing. Scaled
       to 20.1 m nose to sting it gives 26.37 px/m; the planform, the side
       profile and the front view below were read off it by a pixel scan at
       half-metre stations. Its span comes out at 14.33 m against the
       published 14.1 m, so every y is taken at 0.983 (the game sizes the
       aircraft by its length; only the proportion survives). Its height,
       fin tip over the nacelle bottoms, is 3.15 m; the published 4.6 m puts
       the nacelles 1.4 m above the ground.
     B "Sukhoi Su-57 RF-81775 Army-2022.jpg" - a series Su-57 parked, seen
       from the starboard bow (the old header said port): the gear, the intakes, the LEVCON, the canopy, the IRST ball, the
       light grey nose and the "digital" camouflage, the red star on the fin.
     C "Sukhoi Su-57 bn058 Kubinka 2020.jpg" - in a bank from below and
       ahead: nothing under the wings or belly, the camouflage on the lower
       surfaces, the nacelle tunnel.
     D "Су57 на макс2021.jpg" - taxiing, side-on (proportions of the gear).
     E "MAKS Airshow 2019 (2019-08-30) 303.jpg" - in a turn, upper surface.
     F "Sukhoi Design Bureau, 054, Sukhoi Su-57 (49581306132).jpg" - from
       below and behind: the widely spaced nozzles, the central sting, the
       red stars near the lower wing tips, the camouflage on the belly.

   Recognition list (what makes it a Su-57 at RTS zoom; each shows here):
     1. Two engines WIDELY spaced (nacelle centres 1.38 m off the centreline,
        A), a flat tunnel between them and a long central tail sting that
        runs 1.3 m past the nozzles (A side and top, F).
     2. A wide, flat lifting body: the LERX runs from the forebody chine at
        6 m straight out to the wing root at 3.1 m (A).
     3. LEVCONs: the movable leading-edge root surfaces at the front of the
        LERX, 6.0-8.3 m aft of the nose, their hinge line painted and gapped
        (A, B).
     4. The 49 degree wing (A: leading edge 10.1 m at the root to 14.7 m at
        the tip), the trailing edge swept forward 10 degrees, cropped tips.
     5. All-moving fins canted 21 degrees out, small and well aft on the
        outboard booms, leading edge swept 45 degrees (A front and side).
     6. All-moving tailplanes level with the wing, on the booms (A).
     7. Raked trapezoid intakes UNDER the LERX, the top lip 1.25 m ahead of
        the bottom lip (A side, B).
     8. The IRST ball ahead of the windscreen, starboard of the centreline
        (A top: 2.45 m aft of the nose, 0.18 m to starboard; B).
     9. A long one-piece canopy behind a framed windscreen, on a chined nose
        (A, B).
    10. Internal bays closed: nothing hangs under it (C, F); the tandem main
        bay doors and the wing-root side bays are painted, with the side-bay
        fairings under the wing roots (A side view).
    11. The "digital" camouflage: light grey with mid and dark grey pixel
        blocks, heaviest on the upper surfaces and fins, the nose ahead of
        the windscreen left plain (B, C, F). The blocks follow no one
        airframe's layout: the pattern is seeded, the density per surface
        is read off B, C and F.
   Paint, sampled from B and taken to about 0.85 of its level: base
   (176,181,194), mid grey (135,144,157), dark grey (111,115,127).
   Markings: the red star with a thin white edge on both sides of both fins
   (B) and under both wing tips (F). No bort number, no serial.
   Gear (B, D): it RETRACTS, so the group is named "gear": a twin-wheel nose
   leg raked forward, single-wheel main legs outboard of the nacelles. The
   stations are read off D, which is side-on (fin and canopy land within
   0.3 m of A at 71.9 px/m): nose wheel 6.5 m, main wheels 12.6 m aft of the
   nose (the old file had 5.0 and 10.65). The track (4.1 m) is estimated.
   Team colour exactly C.team: one modest strip on each upper outer wing.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu57 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var KY = 0.983;
  function X(s) { return 10.05 - s; }
  function Y(y) { return y * KY; }
  function Z(h) { return h - 0.85; }
  var GROUND = Z(-1.40);              /* tyre bottoms: fin tip 4.55 m above */

  /* ------------------------------------------------------- the tables -- */
  /* body (forebody, spine, sting): [s, half-width at the chine, chine h,
     crown h, keel h, upper exponent, lower exponent]; A side and top views */
  var BODY = [
    [0.00, 0.02, 0.70, 0.72, 0.68, 1.3, 1.3],
    [0.25, 0.10, 0.70, 0.80, 0.58, 1.3, 1.3],
    [0.50, 0.19, 0.69, 0.87, 0.49, 1.3, 1.3],
    [1.00, 0.38, 0.68, 1.02, 0.38, 1.25, 1.2],
    [1.50, 0.49, 0.68, 1.18, 0.31, 1.2, 1.1],
    [2.00, 0.61, 0.69, 1.29, 0.28, 1.15, 1.0],
    [2.50, 0.68, 0.70, 1.38, 0.26, 1.1, 0.9],
    [3.00, 0.76, 0.72, 1.46, 0.26, 1.0, 0.85],
    [4.00, 0.83, 0.76, 1.56, 0.27, 0.95, 0.8],
    [5.00, 0.91, 0.82, 1.68, 0.27, 0.9, 0.75],
    [5.75, 0.97, 0.88, 1.84, 0.28, 0.85, 0.7],
    [6.50, 0.98, 0.92, 1.90, 0.29, 0.8, 0.65],
    [7.50, 0.98, 0.95, 1.80, 0.30, 0.8, 0.6],
    [8.50, 0.98, 0.95, 1.68, 0.30, 0.8, 0.6],
    [10.0, 0.95, 0.95, 1.52, 0.30, 0.8, 0.6],
    [11.5, 0.92, 0.95, 1.42, 0.32, 0.8, 0.6],
    [13.0, 0.90, 0.95, 1.38, 0.34, 0.8, 0.6],
    [15.0, 0.88, 0.95, 1.32, 0.36, 0.8, 0.6],
    [17.0, 0.80, 0.93, 1.25, 0.38, 0.85, 0.65],
    [18.0, 0.70, 0.90, 1.20, 0.40, 0.9, 0.7],
    [18.8, 0.52, 0.88, 1.15, 0.48, 0.95, 0.8],
    [19.4, 0.38, 0.87, 1.08, 0.64, 1.0, 0.9],
    [19.8, 0.22, 0.88, 1.02, 0.76, 1.0, 1.0],
    [20.1, 0.04, 0.90, 0.95, 0.86, 1.0, 1.0]
  ];
  /* LERX and blended inner body: [s, half-width (the planform edge, A),
     mid-plane h, upper and lower thickness at the centre]. The edge points
     are A's: forebody kink 6.03/0.96, LEVCON tip 7.80/2.54, wing root
     10.14/3.17. */
  var PLATE = [
    [6.03, 0.96, 0.92, 0.05, 0.05],
    [6.50, 1.37, 0.94, 0.30, 0.16],
    [7.00, 1.86, 0.95, 0.38, 0.16],
    [7.50, 2.28, 0.95, 0.42, 0.16],
    [7.80, 2.54, 0.95, 0.44, 0.16],
    [8.50, 2.73, 0.95, 0.46, 0.16],
    [9.50, 3.00, 0.96, 0.48, 0.18],
    [10.14, 3.17, 0.97, 0.48, 0.26],
    [12.0, 3.20, 0.98, 0.48, 0.36],
    [14.0, 3.20, 0.98, 0.45, 0.38],
    [15.5, 3.15, 0.98, 0.40, 0.36],
    [16.3, 2.95, 0.98, 0.36, 0.33],
    [17.0, 2.70, 0.97, 0.32, 0.30],
    [18.0, 2.30, 0.95, 0.25, 0.24],
    [18.8, 1.90, 0.92, 0.14, 0.14]
  ];
  /* nacelles: [s, centre y, half-width, centre h, half-height, squareness];
     A front view puts the intake bottoms at 0.72-1.82 m out and the nozzle
     centres 1.42 m out (they splay), the side view the nozzles at h 0.85 */
  var NAC = [
    [9.75, 1.30, 0.60, 0.42, 0.42, 0.45],
    [10.5, 1.32, 0.63, 0.58, 0.58, 0.5],
    [11.5, 1.35, 0.64, 0.71, 0.71, 0.55],
    [13.5, 1.38, 0.63, 0.75, 0.75, 0.55],
    [15.5, 1.40, 0.62, 0.76, 0.74, 0.6],
    [16.8, 1.41, 0.60, 0.83, 0.70, 0.75],
    [17.7, 1.42, 0.58, 0.85, 0.60, 0.95]
  ];
  /* outboard booms carrying the fin and tailplane (A): [s, y, h, w, hh] */
  var BOOM = [
    [14.3, 2.48, 1.02, 0.10, 0.08],
    [15.0, 2.48, 1.08, 0.22, 0.28],
    [17.9, 2.46, 1.08, 0.22, 0.28],
    [18.7, 2.44, 1.03, 0.14, 0.18],
    [19.4, 2.42, 1.00, 0.03, 0.03]
  ];
  /* canopy glass: [s, sill h, half-width, height above the sill] (A side) */
  var CANOPY = [
    [2.75, 1.40, 0.10, 0.04], [3.00, 1.42, 0.30, 0.20], [3.50, 1.46, 0.45, 0.45],
    [4.00, 1.50, 0.52, 0.62], [4.50, 1.55, 0.53, 0.65], [5.00, 1.62, 0.50, 0.52],
    [5.50, 1.72, 0.42, 0.33], [5.95, 1.84, 0.22, 0.10]
  ];
  /* wing (A): leading edge 10.14 m at y 3.17 to 14.52 m at y 7.0 (49 deg),
     the cropped tip to 7.17; trailing edge 16.04 m at y 6.5, swept forward
     10 deg inboard, raked to 15.45 m at the tip */
  var WH = 0.98;
  function wLE(y) { return y <= 7.0 ? 10.14 + (y - 3.17) * 1.144 : 14.52 + (y - 7.0) * 1.2; }
  function wTE(y) { return y <= 6.5 ? 16.04 + (6.5 - y) * 0.18 : y <= 7.0 ? 16.04 - (y - 6.5) * 0.76 : 15.66 - (y - 7.0) * 1.2; }
  function wT(y) { return Math.max(0.06, 0.30 - 0.058 * (y - 3.0)); }
  /* tailplane (A): leading edge 17.94 m at y 5.0, 50 deg; trailing edge
     19.30 m at the boom to 18.92 m at y 4.75, tip at 5.08 */
  var TH = 0.88;
  function tLE(y) { return 17.94 - (5.0 - y) * 1.2; }
  function tTE(y) { return y <= 4.75 ? 19.30 - (y - 2.6) * 0.177 : 18.92 - (y - 4.75) * 1.1; }
  /* fin (A): root on the boom at y 2.62, h 1.38; tip y 3.38, h 3.15 (21 deg
     cant); leading edge 15.0 -> 16.56, trailing edge 17.84 -> 17.24 */
  var CANT = 21 * PI / 180;

  /* ------------------------------------------------------------- paint -- */
  var PXM = 40, XMIN = -10.4, TW = 840;
  var TOPH = 600, SIDEH = 170, TEXH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.5, ZTOP = 2.45, ZSPAN = 4.25;
  var COL = { base: "#9ca1ad", belly: "#a2a7b2", mid: "#737a85", dark: "#595d68" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }

  function star(g, cx, cy, rx, ry) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dad6"; path(1.16); g.fill();
    g.fillStyle = "#b3261e"; path(1.0); g.fill();
  }

  /* a smooth seeded field for the pixel camouflage */
  function field(x, y) {
    return 0.55 * Math.sin(x * 0.83 + y * 0.37 + 1.3) * Math.cos(y * 0.71 - x * 0.21 + 0.4)
         + 0.30 * Math.sin(x * 1.91 - y * 1.37 + 2.1) + 0.22 * Math.cos(x * 2.73 + y * 2.29 + 0.7)
         + 0.12 * Math.sin(x * 4.9 + y * 4.1);
  }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TEXH;
    var g = cv.getContext("2d"), i, j, b, x, y, z, v, sd = 57011;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    var BAND = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    function sideV(z, band) { return BAND[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = COL.base; g.fillRect(0, 0, TW, TOPH + 2 * SIDEH);
    g.fillStyle = COL.belly; g.fillRect(0, BAND[3], TW, TOPH);

    /* pixel camouflage in 0.3 m blocks, streaked along the chord as in B
       and F; the nose ahead of the windscreen stays plain (B) */
    var C = 12, NOSE = X(2.7);
    for (i = 0; i < TW; i += C) {
      x = XMIN + (i + C / 2) / PXM;
      if (x > NOSE) continue;
      for (j = 0; j < TOPH; j += C) {
        y = YMAX - (j + C / 2) / PXM;
        v = field(x * 1.1, y * 1.9);
        if (v > 0.50) { g.fillStyle = COL.dark; g.fillRect(i, j, C, C); }
        else if (v > 0.12) { g.fillStyle = COL.mid; g.fillRect(i, j, C, C); }
        /* the lower surfaces carry the pattern too, a little sparser (C, F) */
        v = field(x * 1.1 + 31.7, y * 1.9 - 13.1);
        if (v > 0.58) { g.fillStyle = COL.dark; g.fillRect(i, BAND[3] + j, C, C); }
        else if (v > 0.22) { g.fillStyle = COL.mid; g.fillRect(i, BAND[3] + j, C, C); }
      }
      for (b = 1; b <= 2; b++) for (j = 0; j < SIDEH; j += C) {
        z = ZTOP - (j + C / 2) / SIDEH * ZSPAN;
        v = field(x * 1.1 + b * 7.3, z * 3.4) + (z - 0.6) * 0.18;
        if (v > 0.48) { g.fillStyle = COL.dark; g.fillRect(i, BAND[b] + j, C, C); }
        else if (v > 0.10) { g.fillStyle = COL.mid; g.fillRect(i, BAND[b] + j, C, C); }
      }
    }

    /* panel and hinge lines */
    function line(pts, band, col, lw) {
      g.strokeStyle = col; g.lineWidth = lw; g.beginPath();
      for (var k = 0; k < pts.length; k++) {
        var u = pxX(X(pts[k][0])), w = BAND[band] + pxY(Y(pts[k][1]));
        if (k) g.lineTo(u, w); else g.moveTo(u, w);
      }
      g.stroke();
    }
    var HINGE = "rgba(18,20,24,0.55)", PANEL = "rgba(20,22,26,0.22)";
    for (b = 0; b <= 3; b += 3) for (var sg = -1; sg <= 1; sg += 2) {
      /* LEVCON hinge and tip (A) */
      if (b === 0) {
        line([[7.48, sg * 1.15], [8.31, sg * 2.61]], b, HINGE, 2);
        line([[7.80, sg * 2.54], [8.31, sg * 2.61]], b, HINGE, 1.5);
      }
      /* leading-edge flap, 0.55 m behind the wing leading edge */
      line([[wLE(3.3) + 0.55, sg * 3.3], [wLE(6.8) + 0.45, sg * 6.8]], b, HINGE, 1.5);
      /* flaperon (inboard) and aileron, 0.85 m ahead of the trailing edge */
      line([[wTE(3.3) - 0.85, sg * 3.3], [wTE(5.1) - 0.85, sg * 5.1], [wTE(6.4) - 0.70, sg * 6.4]], b, HINGE, 1.5);
      line([[wTE(5.1) - 0.85, sg * 5.1], [wTE(5.1), sg * 5.1]], b, HINGE, 1.5);
      line([[wTE(6.4) - 0.70, sg * 6.4], [wTE(6.4), sg * 6.4]], b, HINGE, 1.5);
      /* tailplane root gap and the fuselage panel joints */
      line([[tLE(2.75), sg * 2.75], [tTE(2.75), sg * 2.75]], b, HINGE, 1.5);
      for (i = 0; i < 6; i++) line([[6.5 + i * 2.0, sg * 0.2], [6.5 + i * 2.0, sg * 2.9]], b, PANEL, 1);
      line([[3.0, sg * 0.70], [16.5, sg * 0.86]], b, PANEL, 1);
      line([[9.5, sg * 1.95], [17.6, sg * 1.95]], b, PANEL, 1);
    }
    /* belly: the tandem main bays between the nacelles, serrated ends, and
       the side bays in the wing-root fairings (A) */
    function bay(s0, s1, y0, y1) {
      var p = [[s0, y0], [s0 + 0.25, (y0 + y1) / 2], [s0, y1], [s1, y1], [s1 + 0.25, (y0 + y1) / 2], [s1, y0], [s0, y0]];
      line(p, 3, "rgba(16,18,22,0.6)", 2);
    }
    bay(8.9, 12.8, -0.62, 0.62); bay(13.1, 16.8, -0.62, 0.62);
    line([[8.9, 0], [16.8, 0]], 3, "rgba(16,18,22,0.45)", 1.5);
    for (sg = -1; sg <= 1; sg += 2) bay(10.9, 13.9, sg * 2.18, sg * 2.62);
    /* soot behind the nozzles, on the tunnel and the sting */
    g.fillStyle = "rgba(34,30,26,0.22)";
    for (sg = -1; sg <= 1; sg += 2) g.fillRect(pxX(X(18.9)), BAND[3] + pxY(Y(sg * 1.42 + 0.45)), (X(17.2) - X(18.9)) * PXM, 0.9 * PXM);
    /* light grime */
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(24,24,28," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TEXH, 10 + R() * 40, 2 + R() * 6);
    }
    /* stars: fins both sides, low (B); under the wing tips (F) */
    for (b = 1; b <= 2; b++) star(g, pxX(X(16.55)), sideV(Z(1.95), b), 0.24 * PXM, 0.24 * SIDEH / ZSPAN);
    for (sg = -1; sg <= 1; sg += 2) star(g, pxX(X(15.05)), BAND[3] + pxY(Y(sg * 6.15)), 0.36 * PXM, 0.36 * PXM);
    _cv = cv;
    return cv;
  }

  var _tex = null;
  function skinTexture() {
    if (_tex !== null) return _tex;
    var t = false;
    try {
      t = new V.CanvasTexture(paint());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex = t;
    return t;
  }

  /* each face takes the band its normal looks into: top, port, starboard,
     belly; the canvas is laid out in metres, so the UVs land on the skin */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        U = pxX(x);
        if (band === 0) W = clamp(pxY(y), 1, TOPH - 1);
        else if (band === 3) W = TOPH + 2 * SIDEH + clamp(pxY(y), 1, TOPH - 1);
        else W = TOPH + (band - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 1, SIDEH - 1);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TEXH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x9ca1ad);
    m.dark  = new V.MeshStandardMaterial({ color: 0x16181b, roughness: 0.72, metalness: 0.25 });
    m.metal = new V.MeshStandardMaterial({ color: 0x676c70, roughness: 0.45, metalness: 0.62 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2b3a42, roughness: 0.10, metalness: 0.40 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit -- */
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function box(sx, sy, sz, x, y, z, rz) {
    var g = new V.BoxGeometry(sx, sy, sz);
    if (rz) g.rotateX(rz);
    g.translate(x, y, z);
    return g;
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* rings of equal length, nose first, bridged by quads, end caps as fans;
     the whole solid is turned outward by its signed volume */
  function bridge(rings, capA, capB) {
    var n = rings[0].length, out = [], i, k, vol = 0;
    for (k = 0; k < rings.length - 1; k++) for (i = 0; i < n; i++) {
      var j = (i + 1) % n, P = rings[k], Q = rings[k + 1];
      out.push(P[i], P[j], Q[j]); out.push(P[i], Q[j], Q[i]);
    }
    function cap(r) {
      var c = [0, 0, 0];
      for (i = 0; i < n; i++) { c[0] += r[i][0] / n; c[1] += r[i][1] / n; c[2] += r[i][2] / n; }
      for (i = 0; i < n; i++) out.push(c, r[(i + 1) % n], r[i]);
    }
    if (capA) cap(rings[0]);
    if (capB) { var last = rings[rings.length - 1].slice().reverse(); cap(last); }
    for (i = 0; i < out.length; i += 3) {
      var a = out[i], b = out[i + 1], c = out[i + 2];
      vol += a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    }
    if (!capA && !capB) {
      /* an open tube: judge by the first quad against its ring's centre */
      var r0 = rings[0], c0 = [0, 0, 0];
      for (i = 0; i < n; i++) { c0[0] += r0[i][0] / n; c0[1] += r0[i][1] / n; c0[2] += r0[i][2] / n; }
      var A = out[0], B = out[1], D = out[2];
      var ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], wx = D[0] - A[0], wy = D[1] - A[1], wz = D[2] - A[2];
      vol = (uy * wz - uz * wy) * (A[0] - c0[0]) + (uz * wx - ux * wz) * (A[1] - c0[1]) + (ux * wy - uy * wx) * (A[2] - c0[2]);
    }
    if (vol < 0) for (i = 0; i < out.length; i += 3) { var t = out[i + 1]; out[i + 1] = out[i + 2]; out[i + 2] = t; }
    var g = tris(out);
    return g;
  }
  /* smooth the normals of a lofted skin: average by position */
  function smooth(g) {
    var p = g.attributes.position.array, n = g.attributes.normal.array, acc = {}, i, k;
    for (i = 0; i < p.length; i += 3) {
      k = p[i].toFixed(3) + "," + p[i + 1].toFixed(3) + "," + p[i + 2].toFixed(3);
      var a = acc[k] || (acc[k] = [0, 0, 0]);
      a[0] += n[i]; a[1] += n[i + 1]; a[2] += n[i + 2];
    }
    for (i = 0; i < p.length; i += 3) {
      k = p[i].toFixed(3) + "," + p[i + 1].toFixed(3) + "," + p[i + 2].toFixed(3);
      var b = acc[k], l = Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]) || 1;
      n[i] = b[0] / l; n[i + 1] = b[1] / l; n[i + 2] = b[2] / l;
    }
    return g;
  }
  /* split-exponent superellipse ring in the y-z plane at x */
  function ring(x, yc, w, zc, up, dn, eu, el, ey, n) {
    var o = [], j;
    for (j = 0; j < n; j++) {
      var t = 2 * PI * j / n, c = Math.cos(t), s = Math.sin(t);
      var yy = yc + w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), ey);
      var zz = s >= 0 ? zc + up * Math.pow(s, eu) : zc - dn * Math.pow(-s, el);
      o.push([x, yy, zz]);
    }
    return o;
  }
  /* aerofoil: leading edge, crest at 15 %, after-body, sharp trailing edge */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.06, t * 0.34), p(0.18, t / 2), p(0.45, t * 0.46), p(0.75, t * 0.30), p(1, 0),
            p(0.75, -t * 0.26), p(0.45, -t * 0.40), p(0.18, -t * 0.42), p(0.06, -t * 0.30)];
  }

  /* resample a station table by Catmull-Rom for a fair loft */
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function fair(tab, per) {
    var out = [], i, k, c;
    for (i = 0; i < tab.length - 1; i++) for (k = 0; k < per; k++) {
      var t = k / per, row = [];
      for (c = 0; c < tab[0].length; c++)
        row.push(cr1(tab[Math.max(0, i - 1)][c], tab[i][c], tab[i + 1][c], tab[Math.min(tab.length - 1, i + 2)][c], t));
      out.push(row);
    }
    out.push(tab[tab.length - 1].slice());
    return out;
  }

  /* the plate's top skin at (s, y), for parts laid on it */
  function plateTop(sx, y) {
    for (var q = 0; q < PLATE.length - 1; q++) {
      var A0 = PLATE[q], B0 = PLATE[q + 1];
      if (sx >= A0[0] && sx <= B0[0]) {
        var u = (sx - A0[0]) / (B0[0] - A0[0]), w = A0[1] + (B0[1] - A0[1]) * u;
        var zc = A0[2] + (B0[2] - A0[2]) * u, tu = A0[3] + (B0[3] - A0[3]) * u;
        var c = Math.pow(Math.min(1, Math.abs(y) / w), 1 / 0.55), sn = Math.sqrt(Math.max(0, 1 - c * c));
        return zc + tu * Math.pow(sn, 1.7);
      }
    }
    return 0.95;
  }

  /* ------------------------------------------------------------- build -- */
  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "su57";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], dark: [], door: [] };
    var s, i, j, k, R;

    /* ---- body: chined forebody, spine, the sting (recognition 1, 9) */
    var bt = fair(BODY, 2), rings = [];
    for (i = 0; i < bt.length; i++) {
      var b = bt[i];
      rings.push(ring(X(b[0]), 0, Y(b[1]), Z(b[2]), b[3] - b[2], b[2] - b[4], b[5], b[6], 1.0, 28));
    }
    K.skin.push(smooth(bridge(rings, true, true)));

    /* ---- LERX / blended plate (recognition 2) */
    rings = [];
    for (i = 0; i < PLATE.length; i++) {
      var q = PLATE[i];
      rings.push(ring(X(q[0]), 0, Y(q[1]), Z(q[2]), q[3], q[4], 1.7, 1.7, 0.55, 28));
    }
    K.skin.push(smooth(bridge(rings, true, true)));

    /* ---- nacelles, intakes, nozzles, booms (recognition 1, 6, 7) */
    var nt = fair(NAC, 2);
    for (s = -1; s <= 1; s += 2) {
      rings = [];
      for (i = 0; i < nt.length; i++) {
        var a = nt[i];
        rings.push(ring(X(a[0]), s * Y(a[1]), Y(a[2]), Z(a[3]), a[4], a[4], a[5], a[5], a[5], 24));
      }
      K.skin.push(smooth(bridge(rings, false, false)));

      /* the raked intake: top lip under the LERX 1.25 m ahead of the bottom
         lip; outer wall leans out (A front view: 1.82 m at the bottom, 2.05
         m at the top), inner wall 0.72 -> 0.52 */
      var SB = 9.20, ST = 7.95, SBK = 9.75, hB = 0.02, hT = 0.84;
      var oB = 1.82, oT = 2.05, iB = 0.72, iT = 0.52, wt = 0.07;
      function wall(yb, yt, d) {
        var A1 = [[X(ST), s * Y(yt), Z(hT)], [X(SB), s * Y(yb), Z(hB)], [X(SBK), s * Y(yb), Z(hB)], [X(SBK), s * Y(yt), Z(hT)]];
        var A2 = A1.map(function (p) { return [p[0], p[1] + s * d * KY, p[2]]; });
        return bridge([A1, A2], true, true);
      }
      K.skin.push(wall(oB, oT, wt));
      K.skin.push(wall(iB, iT, -wt));
      /* bottom lip */
      K.skin.push(bridge([[[X(SB), s * Y(iB - 0.04), Z(hB)], [X(SB), s * Y(oB + 0.04), Z(hB)], [X(SBK), s * Y(oB + 0.04), Z(hB)], [X(SBK), s * Y(iB - 0.04), Z(hB)]],
                          [[X(SB), s * Y(iB - 0.04), Z(hB + 0.07)], [X(SB), s * Y(oB + 0.04), Z(hB + 0.07)], [X(SBK), s * Y(oB + 0.04), Z(hB + 0.07)], [X(SBK), s * Y(iB - 0.04), Z(hB + 0.07)]]], true, true));
      /* the cowl roof under the LERX */
      K.skin.push(bridge([[[X(ST), s * Y(iT), Z(hT)], [X(ST), s * Y(oT), Z(hT)], [X(SBK + 0.3), s * Y(oT), Z(hT)], [X(SBK + 0.3), s * Y(iT), Z(hT)]],
                          [[X(ST), s * Y(iT), Z(hT + 0.10)], [X(ST), s * Y(oT), Z(hT + 0.10)], [X(SBK + 0.3), s * Y(oT), Z(hT + 0.10)], [X(SBK + 0.3), s * Y(iT), Z(hT + 0.10)]]], true, true));
      /* the duct: a dark throat set back behind the mouth plane, and the
         compression ramp under the roof */
      var d0 = 0.50;
      K.dark.push(bridge([[[X(ST + d0), s * Y(iT + 0.03), Z(hT - 0.02)], [X(ST + d0), s * Y(oT - 0.03), Z(hT - 0.02)], [X(SB + d0), s * Y(oB - 0.03), Z(hB + 0.08)], [X(SB + d0), s * Y(iB + 0.03), Z(hB + 0.08)]],
                          [[X(ST + d0 + 0.05), s * Y(iT + 0.03), Z(hT - 0.02)], [X(ST + d0 + 0.05), s * Y(oT - 0.03), Z(hT - 0.02)], [X(SB + d0 + 0.05), s * Y(oB - 0.03), Z(hB + 0.08)], [X(SB + d0 + 0.05), s * Y(iB + 0.03), Z(hB + 0.08)]]], true, true));
      K.metal.push(bridge([[[X(ST + 0.05), s * Y(iT + 0.05), Z(hT - 0.04)], [X(ST + 0.05), s * Y(oT - 0.05), Z(hT - 0.04)], [X(ST + 0.50), s * Y(oT - 0.08), Z(hT - 0.30)], [X(ST + 0.50), s * Y(iT + 0.08), Z(hT - 0.30)]],
                           [[X(ST + 0.05), s * Y(iT + 0.05), Z(hT - 0.08)], [X(ST + 0.05), s * Y(oT - 0.05), Z(hT - 0.08)], [X(ST + 0.50), s * Y(oT - 0.08), Z(hT - 0.34)], [X(ST + 0.50), s * Y(iT + 0.08), Z(hT - 0.34)]]], true, true));

      /* nozzle: eighteen petals closing from 0.58 m to 0.43 m (A), dark
         bore, a hot ring inside */
      var ny = s * Y(1.42), nz = Z(0.85);
      for (i = 0; i < 18; i++) {
        var a0 = i * 2 * PI / 18, a1 = (i + 0.88) * 2 * PI / 18;
        var np = function (r, ang, x) { return [x, ny + Math.cos(ang) * r, nz + Math.sin(ang) * r]; };
        var pet = bridge([[np(0.585, a0, X(17.66)), np(0.585, a1, X(17.66)), np(0.545, a1, X(17.66)), np(0.545, a0, X(17.66))],
                          [np(0.435, a0, X(18.80)), np(0.435, a1, X(18.80)), np(0.395, a1, X(18.80)), np(0.395, a0, X(18.80))]], true, true);
        if (i & 1) K.metal.push(pet); else K.dark.push(pet);
      }
      /* the bore: a closed dark frustum whose aft face sits 0.45 m inside
         the petal exit, so the nozzle reads as a cavity */
      K.dark.push(bridge([ring(X(17.70), ny, 0.54, nz, 0.54, 0.54, 1, 1, 1, 20), ring(X(18.35), ny, 0.44, nz, 0.44, 0.44, 1, 1, 1, 20)], true, true));
      K.metal.push(bridge([ring(X(18.30), ny, 0.30, nz, 0.30, 0.30, 1, 1, 1, 12), ring(X(18.36), ny, 0.30, nz, 0.30, 0.30, 1, 1, 1, 12)], true, true));

      /* outboard boom */
      rings = [];
      for (i = 0; i < BOOM.length; i++) {
        var bm = BOOM[i];
        rings.push(ring(X(bm[0]), s * Y(bm[1]), Y(bm[3]), Z(bm[2]), bm[4], bm[4] * 0.8, 0.8, 0.8, 0.8, 16));
      }
      K.skin.push(smooth(bridge(rings, true, true)));

      /* side-bay fairing under the wing root (A side view, s 10.6-14.3) */
      rings = [];
      var FB = [[10.6, 0.05, 0.02], [11.2, 0.22, 0.20], [13.6, 0.24, 0.24], [14.3, 0.04, 0.03]];
      for (i = 0; i < FB.length; i++)
        rings.push(ring(X(FB[i][0]), s * Y(2.38), Y(FB[i][1]), Z(0.80), 0.18, FB[i][2] + 0.04, 1, 0.8, 0.8, 14));
      K.skin.push(smooth(bridge(rings, true, true)));
    }

    /* ---- wings: one chained solid a side (recognition 4); team strip */
    for (s = -1; s <= 1; s += 2) {
      var sts = [3.0, 3.6, 4.3, 5.0, 5.7, 6.3, 6.5, 6.8, 7.0, 7.17], wl = [];
      for (i = 0; i < sts.length; i++) {
        var yy = sts[i];
        wl.push(foil([X(wLE(yy)), s * Y(yy), Z(WH)], [X(wTE(yy)), s * Y(yy), Z(WH)], wT(yy), [0, 0, 1]));
      }
      K.skin.push(smooth(bridge(wl, true, true)));
      var f0 = 0.30, f1 = 0.58, ya = 5.55, yb = 6.15;
      function tb(y, k) {
        var le = wLE(y), te = wTE(y), c = le - te, hz = wT(y) * 0.47 + 0.012;
        return [[X(le - c * f0), s * Y(y), Z(WH) + k * hz], [X(le - c * f1), s * Y(y), Z(WH) + k * hz]];
      }
      var ta = tb(ya, 1), tbb = tb(yb, 1), tc = tb(ya, 0.6), td = tb(yb, 0.6);
      K.team.push(bridge([[ta[0], ta[1], tc[1], tc[0]], [tbb[0], tbb[1], td[1], td[0]]], true, true));
    }

    /* ---- tailplanes: all-moving, level with the wing, pivots (rec. 6) */
    for (s = -1; s <= 1; s += 2) {
      var tl = [], ys = [2.55, 3.4, 4.2, 4.75, 5.08];
      for (i = 0; i < ys.length; i++) {
        var y2 = ys[i];
        tl.push(foil([X(Math.max(tLE(y2), 15.1)), s * Y(y2), Z(TH)], [X(tTE(y2)), s * Y(y2), Z(TH)], 0.20 - 0.028 * (y2 - 2.55), [0, 0, 1]));
      }
      K.skin.push(smooth(bridge(tl, true, true)));
      K.metal.push(cyl(0.11, 0.11, 0.30, 12, "y", X(17.6), s * Y(2.60), Z(TH)));
    }

    /* ---- all-moving canted fins (recognition 5) and their root stubs */
    var cc = Math.cos(CANT), sn = Math.sin(CANT);
    for (s = -1; s <= 1; s += 2) {
      var fl = [];
      for (i = 0; i <= 4; i++) {
        var f = i / 4, span = f * (1.77 / cc);
        var fy = 2.62 + span * sn, fh = 1.38 + span * cc;
        var le2 = 15.0 + f * 1.56, te2 = 17.84 - f * 0.60;
        fl.push(foil([X(le2), s * Y(fy), Z(fh)], [X(te2), s * Y(fy), Z(fh)], 0.20 - 0.13 * f, [0, s * cc, -sn]));
      }
      K.skin.push(smooth(bridge(fl, true, true)));
      /* the pivot gap at the root of the moving fin */
      K.dark.push(bar([X(15.1), s * Y(2.66), Z(1.48)], [X(17.75), s * Y(2.66), Z(1.48)], 0.03, 5));
    }

    /* ---- canopy (recognition 9): glass, windscreen arch, sill rails */
    rings = [];
    var ct = fair(CANOPY, 2);
    for (i = 0; i < ct.length; i++) {
      var cq = ct[i];
      rings.push(ring(X(cq[0]), 0, cq[2], Z(cq[1]), cq[3], 0.12, 0.85, 1, 1, 22));
    }
    K.glass.push(smooth(bridge(rings, true, true)));
    function canopyRing(sx) {
      for (var q = 0; q < CANOPY.length - 1; q++) {
        var A0 = CANOPY[q], B0 = CANOPY[q + 1];
        if (sx >= A0[0] && sx <= B0[0]) {
          var u = (sx - A0[0]) / (B0[0] - A0[0]);
          return [A0[1] + (B0[1] - A0[1]) * u, A0[2] + (B0[2] - A0[2]) * u, A0[3] + (B0[3] - A0[3]) * u];
        }
      }
      return CANOPY[0].slice(1);
    }
    var arc = canopyRing(3.70), prev = null;
    for (k = 0; k <= 14; k++) {
      var tt = PI * k / 14, cur = [X(3.70), Math.cos(tt) * (arc[1] + 0.015), Z(arc[0]) + Math.pow(Math.sin(tt), 0.85) * (arc[2] + 0.015)];
      if (prev) K.dark.push(bar(prev, cur, 0.035, 5));
      prev = cur;
    }
    for (s = -1; s <= 1; s += 2) {
      var sill = [];
      for (k = 0; k <= 6; k++) {
        var sx2 = 2.85 + k * (5.85 - 2.85) / 6, cr = canopyRing(sx2);
        sill.push([X(sx2), s * (cr[1] + 0.01), Z(cr[0]) + 0.02]);
      }
      for (k = 0; k < sill.length - 1; k++) K.dark.push(bar(sill[k], sill[k + 1], 0.025, 4));
    }
    /* ---- IRST ball ahead of the windscreen, to starboard (recognition 8) */
    K.skin.push(smooth(bridge([ring(X(2.15), Y(-0.19), 0.03, Z(1.30), 0.02, 0.02, 1, 1, 1, 16),
                               ring(X(2.35), Y(-0.19), 0.13, Z(1.33), 0.08, 0.06, 1, 1, 1, 16),
                               ring(X(2.70), Y(-0.19), 0.15, Z(1.34), 0.06, 0.06, 1, 1, 1, 16)], true, true)));
    K.glass.push(new V.SphereGeometry(0.12, 16, 10).translate(X(2.45), Y(-0.19), Z(1.42)));
    /* the dorsal aerial mast, raked aft, 12.7 m aft of the nose (D, B) */
    K.dark.push(bar([X(12.55), 0, Z(1.36)], [X(12.95), 0, Z(1.86)], 0.022, 5));
    /* the LEVCON hinge gaps on the top skin (recognition 3) */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) {
        var hs0 = 7.48 + k * 0.2075, hy0 = 1.15 + k * 0.365, hs1 = hs0 + 0.2075, hy1 = hy0 + 0.365;
        K.dark.push(bar([X(hs0), s * Y(hy0), Z(plateTop(hs0, hy0) + 0.012)], [X(hs1), s * Y(hy1), Z(plateTop(hs1, hy1) + 0.012)], 0.018, 4));
      }
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");

    /* ---- landing gear (B, D): it retracts, so the group is "gear"; tyres
       are its lowest part */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    /* nose leg raked: the axle 0.4 m ahead of the leg root (D) */
    var nx = X(6.5), nr = 0.31, nzz = GROUND + nr;
    G.metal.push(bar([nx - 0.40, 0, Z(0.30)], [nx, 0, nzz + 0.08], 0.055, 10));
    G.metal.push(bar([nx - 0.36, 0, Z(0.14)], [nx - 0.13, 0, nzz + 0.42], 0.078, 12));
    G.metal.push(bar([nx, -0.16, nzz], [nx, 0.16, nzz], 0.035, 6));
    G.metal.push(bar([nx + 0.55, 0, Z(0.30)], [nx - 0.16, 0, nzz + 0.78], 0.03, 6));
    G.metal.push(box(0.10, 0.08, 0.07, nx - 0.05, 0, nzz + 0.62));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.17, 18, "y", nx, s * 0.16, nzz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.18, 14, "y", nx, s * 0.16, nzz));
      G.door.push(box(0.80, 0.04, 0.30, nx - 0.35, s * 0.26, Z(0.14), s * 0.20));
    }
    var mx = X(12.6), mr = 0.515, mzz = GROUND + mr, my = 2.05;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.05, s * (my - 0.05), Z(0.55)], [mx, s * my, mzz + 0.05], 0.075, 10));
      G.metal.push(bar([mx + 0.06, s * (my - 0.04), Z(0.40)], [mx + 0.03, s * my, mzz + 0.40], 0.10, 12));
      G.tyre.push(cyl(mr, mr, 0.34, 24, "y", mx, s * (my + 0.10), mzz));
      G.metal.push(cyl(mr * 0.58, mr * 0.58, 0.35, 16, "y", mx, s * (my + 0.10), mzz));
      G.dark.push(cyl(mr * 0.30, mr * 0.30, 0.37, 10, "y", mx, s * (my + 0.10), mzz));
      G.metal.push(bar([mx - 0.8, s * (my - 0.05), Z(0.55)], [mx - 0.02, s * my, mzz + 0.40], 0.035, 6));
      G.metal.push(bar([mx + 0.25, s * my, Z(0.2)], [mx - 0.05, s * my, mzz + 0.55], 0.022, 5));
      /* the leg door, outboard of the leg, and the bay door under the
         wing-root fairing */
      G.door.push(box(1.20, 0.05, 0.62, mx - 0.15, s * (my + 0.38), Z(0.25), -s * 0.12));
      G.door.push(box(1.30, 0.05, 0.45, mx - 0.25, s * (my - 0.55), Z(0.18), s * 0.25));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(gr, G.door, T.skin, "gear_doors", true);
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the x extent: nose tip (10.05) to the sting end (-10.05) */
UNIT_MODELS["stealth_p"] = { len: 20.1, build: HeroSu57.build };
