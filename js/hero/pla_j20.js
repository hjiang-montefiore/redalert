/* ============ pla_j20.js - HERO model: Chengdu J-20 "Mighty Dragon" ============
   Registers pla_e00_stealthfighter ("J-20", eras.js: service 2017). One key,
   one variant: the series J-20 as seen at the 2025 open days (A, B below),
   bays closed, no pitot boom. stealth_c (the present-day J-20A row) keeps
   its own model in models3d_east.js and is NOT registered here.

   Published figures (en.wikipedia "Chengdu J-20", specification box citing
   Tsinghua University): length 21.2 m, span 13.01 m, height 4.69 m, wing
   area 73 m2. Chengdu has published no drawing; these are the figures the
   scale is set by.

   Model space: +X nose, +Y left (port), +Z up, metres. The tables below are
   written in DRAWING units and converted once: s is metres aft of the nose
   tip, y is metres off the centreline, h is metres above the ground.
   X = 10.6 - s, Y = y * 0.919, Z = h - 2.30 (the ground at Z = -2.30).

   References (Wikimedia Commons, fetched for this file):
     D "Chengdu J-20.svg" - top, side and front line drawing (1600 px).
       Scaled to 21.2 m from the radome tip to the fin tips (1172 px) it
       gives 55.28 px/m; at that scale its height, fin tip over the ground
       line, is 4.63 m against the published 4.69 (inside 1.3 per cent),
       but its span is 14.15 m against the published 13.01. The drawing's
       span is the one figure out of step with all three published ones,
       so every y is taken at 0.919 (13.01 / 14.15), as ru_su57.js does;
       the drawn wing area then comes to about 72 m2 against the published
       73. The planform, the side profile, the front view (it is drawn
       turned 90 degrees, top to the left) and the wheel stations were read
       off it by a pixel scan (tools in scratchpad/q_j20_tools). It draws a
       prototype (the nose pitot boom of "2001"): the boom is left off.
     A "J-20 at Changchun Air Show 20250921.jpg" - a series J-20 parked,
       from the starboard bow: the chined nose, the light grey radome, the
       raked trapezoid intake with the light grey DSI bump on its inner
       wall, the canard on the trunk's top edge, the faceted EOTS fairing
       under the nose, the single nose wheel, the canopy's front bow, the
       wing's slight droop, the colour.
     B "J-20 at China's Air Force Aviation Open Activity 20250921.jpg" -
       parked, port side, low: the long fuselage, the gear stations, the
       fin's cropped tip, the ventral fin under the tail boom, the dark
       grey paint and the lighter radome (the fin carries a number and a
       painted emblem: not drawn).
     C "J-20 fighter (44040541250).jpg" - from below in a bank at Zhuhai
       2018 (bays open there): two flap-actuator fairings under each wing,
       the ventral fins, the nozzles close together, the plain underside.
     E "Chengdu J-20 flying at the 2025 China Victory Day Parade.jpg" -
       five in profile: the canard, the canted fins, the long body.

   Recognition list (what makes it a J-20 at RTS zoom; each shows here):
     1. The LONG body: 21.2 m, the cockpit far forward, the wing far aft
        (D: wing root leading edge 12.0 m aft of the nose).
     2. All-moving canards on the intake trunks, 6.8-9.4 m aft of the nose
        at the root, set 9 degrees up (D front view).
     3. A cranked delta: the LERX runs from the canard root out to the wing
        root at 2.58 m (D), the wing's leading edge swept 46 degrees, its
        trailing edge swept FORWARD (tip 18.3 m, root 19.3 m aft), cropped
        tips, a slight anhedral (D front view: about 4.5 degrees).
     4. Raked trapezoid intakes right behind the cockpit, the top lip ahead
        of the bottom (D side), the DSI bump on the inner wall (A).
     5. Two all-moving fins canted 27 degrees out (D front, after the span
        correction), on short booms outboard of the nozzles, cropped tips
        (D, B).
     6. Two short, deep ventral fins under the booms, canted out 20 degrees
        (D side and front, B, C).
     7. Two engines close together: nozzle centres 0.72 m off the centre-
        line (D top), the tail booms reaching past them (D).
     8. A chined nose, a lighter radome, the EOTS fairing under it (A, B).
     9. A one-piece bubble canopy with a front bow (D, A).
    10. Bays closed: nothing hangs under it; the main and side bay doors
        are painted (D side and top).
   Paint, sampled off A and B in shade and taken to about 0.85: a dark
   grey (92,96,100) all over, the lower surfaces a touch lighter, the
   radome a light grey (129,143,150), the DSI bump a light grey
   (128,132,122). No star, no number, no fin emblem.
   Gear: it RETRACTS, so the group is named "gear". D side view puts the
   nose wheel 6.51 m and the mains 13.52 m aft of the nose tip, tyres 0.54
   and 0.92 m across; D front view puts the main wheels 1.65 m out (after
   the span correction). A and B show a single nose wheel.
   Team colour exactly C.team: one modest strip on each upper outer wing.

   NOT CONFIRMED (estimated, not measured or published):
     - the span correction itself: D is uniformly narrowed to the published
       span; whether its fuselage or its wing is the part drawn too wide is
       not known, so both are narrowed.
     - the cross sections: the side and plan outlines are D's, the shape
       between them (the chine's lean, the boxy trunks, the flat belly) is
       read from A and B by eye.
     - the radome joint (2.2 m aft of the nose) and the EOTS fairing (2.2-
       3.0 m, 0.36 m wide), from A and B by eye.
     - the underwing actuator fairings (C shows two a side; their stations,
       y 3.9 and 5.6 m, are placed by eye).
     - the DSI bump's size; the intake's inner wall; the canopy bow station;
       the gear legs, doors and their angles (A, B by eye).
     - the nozzle: a plain petal nozzle 1.1-1.24 m across (D top; D side
       shows 1.0 m behind the boom). The series serrated "sawtooth" nozzle
       of the later WS-10C jets is not drawn.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJ20 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var KY = 0.919;
  function X(s) { return 10.6 - s; }
  function Y(y) { return y * KY; }
  function Z(h) { return h - 2.30; }
  var GROUND = Z(0);

  /* ------------------------------------------------------- the tables -- */
  /* centre body (nose, cockpit, spine, engine bay): [s, half-width at the
     chine, chine h, crown h, keel h, upper exp, lower exp, side exp].
     Widths: D top (the chine forward, the spine/engine-bay line aft);
     heights: D side (crown, belly, the forebody chine line) */
  var BODY = [
    [0.00, 0.02, 2.17, 2.19, 2.15, 1.3, 1.2, 1.0],
    [0.30, 0.13, 2.18, 2.27, 2.06, 1.3, 1.2, 1.0],
    [0.67, 0.30, 2.20, 2.36, 1.95, 1.35, 1.2, 1.0],
    [1.03, 0.45, 2.24, 2.47, 1.82, 1.4, 1.2, 1.0],
    [1.57, 0.59, 2.28, 2.63, 1.70, 1.4, 1.15, 1.0],
    [2.30, 0.71, 2.33, 2.82, 1.56, 1.35, 1.1, 1.0],
    [2.84, 0.79, 2.38, 2.96, 1.48, 1.3, 1.0, 1.0],
    [3.38, 0.84, 2.41, 3.00, 1.41, 1.2, 0.95, 1.0],
    [4.29, 0.93, 2.47, 3.04, 1.32, 1.1, 0.9, 1.0],
    [5.19, 1.04, 2.53, 3.10, 1.26, 1.0, 0.8, 1.0],
    [5.70, 1.03, 2.55, 3.18, 1.24, 0.9, 0.7, 0.9],
    [6.10, 1.02, 2.54, 3.26, 1.22, 0.85, 0.6, 0.8],
    [7.00, 1.01, 2.52, 3.14, 1.19, 0.8, 0.5, 0.7],
    [8.80, 1.01, 2.50, 3.08, 1.11, 0.8, 0.45, 0.7],
    [10.60, 1.03, 2.48, 3.04, 1.08, 0.8, 0.45, 0.7],
    [12.00, 1.08, 2.47, 3.01, 1.07, 0.8, 0.45, 0.7],
    [13.30, 1.23, 2.46, 2.98, 1.08, 0.75, 0.45, 0.7],
    [14.20, 1.37, 2.45, 2.95, 1.08, 0.7, 0.45, 0.7],
    [15.10, 1.50, 2.44, 2.92, 1.09, 0.7, 0.45, 0.7],
    [16.05, 1.55, 2.42, 2.89, 1.10, 0.7, 0.45, 0.7],
    [17.30, 1.56, 2.38, 2.84, 1.11, 0.7, 0.5, 0.7],
    [18.00, 1.56, 2.30, 2.80, 1.14, 0.75, 0.55, 0.75],
    [18.70, 1.54, 2.20, 2.70, 1.25, 0.8, 0.65, 0.8],
    [19.30, 1.50, 2.08, 2.58, 1.40, 0.9, 0.8, 0.85],
    [19.62, 1.45, 2.00, 2.52, 1.45, 0.95, 0.9, 0.9]
  ];
  /* intake trunks: [s, centre y, half-width, bottom h, top h]. D side: the
     lip top 5.70 m at h 2.62, the bottom 5.97 m at h 1.39 (raked 0.27 m);
     D top: the lip's outer corner 1.65 m out, the trunk wall 1.94 m out
     from 6.8 to 9.4 m; aft of 12 m the trunks run into the engine bay */
  var TRUNK = [
    [5.70, 1.36, 0.36, 1.40, 2.60],
    [6.10, 1.40, 0.39, 1.30, 2.58],
    [6.82, 1.46, 0.47, 1.20, 2.56],
    [8.00, 1.47, 0.48, 1.13, 2.53],
    [9.40, 1.46, 0.48, 1.10, 2.50],
    [11.00, 1.40, 0.45, 1.08, 2.48],
    [12.50, 1.25, 0.40, 1.08, 2.45],
    [13.60, 1.10, 0.32, 1.09, 2.40],
    [14.60, 0.95, 0.25, 1.12, 2.30]
  ];
  var RAKE = 0.27;
  /* LERX and blended plate: [s, half-width (the planform edge, D top),
     mid-plane h, upper and lower thickness at the centre]. D: the lip
     corner 5.70/1.65, the trunk edge 1.94 to 9.4 m, the crank out to the
     wing root 12.03/2.58, the wing root trailing edge 19.34 */
  var PLATE = [
    [5.70, 1.66, 2.60, 0.06, 0.06],
    [6.10, 1.76, 2.59, 0.30, 0.20],
    [6.82, 1.92, 2.57, 0.40, 0.30],
    [8.00, 1.94, 2.55, 0.45, 0.38],
    [9.00, 1.97, 2.53, 0.48, 0.42],
    [9.71, 2.12, 2.52, 0.50, 0.45],
    [10.62, 2.41, 2.50, 0.50, 0.45],
    [11.40, 2.54, 2.49, 0.50, 0.45],
    [12.03, 2.58, 2.48, 0.50, 0.45],
    [14.00, 2.58, 2.46, 0.46, 0.42],
    [16.00, 2.58, 2.44, 0.40, 0.38],
    [18.00, 2.55, 2.42, 0.32, 0.30],
    [19.00, 2.40, 2.40, 0.20, 0.20],
    [19.62, 2.10, 2.38, 0.06, 0.06]
  ];
  /* tail booms carrying fin and ventral fin (D top: the outer edge 2.58 m
     to 20.9 m, the inner edge from the nacelle at 19.2 m/1.50 to 21.0 m/
     2.13; D side: top h 2.47, bottom 2.0, the sting at 21.04 m, h 2.17):
     [s, centre y, half-width, centre h, half-height] */
  var BOOM = [
    [17.60, 2.15, 0.42, 2.25, 0.12],
    [18.40, 2.08, 0.50, 2.24, 0.22],
    [19.20, 2.05, 0.53, 2.24, 0.24],
    [20.20, 2.25, 0.33, 2.23, 0.22],
    [20.75, 2.36, 0.20, 2.20, 0.13],
    [21.04, 2.40, 0.03, 2.17, 0.02]
  ];
  /* canopy glass: [s, sill h, half-width, height above the sill] (D side:
     windscreen foot 2.84 m at h 2.98, the top 3.60 at 4.3-4.6 m, faired
     into the spine at 6.1 m; D top: glass 0.48-0.50 m half-width) */
  var CANOPY = [
    [2.84, 2.98, 0.20, 0.03], [3.10, 2.99, 0.40, 0.18], [3.38, 3.00, 0.47, 0.30],
    [3.74, 3.01, 0.50, 0.45], [4.29, 3.02, 0.50, 0.58], [4.65, 3.03, 0.50, 0.57],
    [5.19, 3.04, 0.47, 0.46], [5.55, 3.06, 0.40, 0.35], [5.82, 3.08, 0.30, 0.25],
    [6.10, 3.10, 0.15, 0.16], [6.30, 3.12, 0.04, 0.10]
  ];
  /* wing (D top): leading edge 12.03 m at y 2.58 to 16.71 m at the tip,
     y 7.07 (46 deg); trailing edge 19.34 m at the root to 18.31 m at the
     tip (swept forward); D front: h 2.50 at the root, 2.15 at the tip */
  function wLE(y) { return 12.03 + (y - 2.58) * 1.0423; }
  function wTE(y) { return 19.34 - (y - 2.58) * 0.2294; }
  function wH(y) { return 2.50 - (y - 2.58) * 0.078; }
  function wT(y) { return Math.max(0.05, 0.24 - 0.040 * (y - 2.58)); }
  var TIP = 7.07;
  /* canard (D top): root 6.82-9.39 m at y 1.94, tip 9.08-9.71 m at y 4.09;
     D front: h 2.57 at the root, 2.91 at the tip */
  var CAN = { rLE: 6.82, rTE: 9.39, tLE: 9.08, tTE: 9.71, ry: 1.94, ty: 4.09, rh: 2.57, th: 2.91 };
  /* fins (D side and front): root y 2.25 h 2.47, LE 17.35 TE 20.06; tip
     y 3.42 h 4.63, LE 19.88 TE 21.20 */
  var FIN = { rLE: 17.35, rTE: 20.06, tLE: 19.88, tTE: 21.20, ry: 2.25, ty: 3.42, rh: 2.47, th: 4.63 };
  /* ventral fins (D side and front): root on the boom, y 2.33 h 1.97,
     18.15-20.55 m; tip y 2.64, LE 19.17 m at h 1.10, TE 20.24 m at h 1.28 */
  var VEN = { rLE: 18.15, rTE: 20.55, ry: 2.33, rh: 1.97, tLE: 19.17, tTE: 20.24, ty: 2.64, tlh: 1.10, tth: 1.28 };
  /* nozzles (D top: centres 0.78 m out, 1.30 m across the outer flaps;
     D side: centre h 1.98, exit 20.39 m) */
  var NZ = { y: 0.78, h: 1.98, s0: 19.55, s1: 20.39, r0: 0.62, r1: 0.55 };

  /* ------------------------------------------------------------- paint -- */
  var PXM = 40, XMIN = -10.9, TW = 880;
  var TOPH = 560, SIDEH = 180, TEXH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.0, ZTOP = 2.45, ZSPAN = 4.9;
  var COL = { base: "#5c6064", belly: "#64686c", radome: "#818f96", panel: "#555a5e" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TEXH;
    var g = cv.getContext("2d"), i, b, sg, sd = 20112;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    var BAND = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    g.fillStyle = COL.base; g.fillRect(0, 0, TW, TOPH + 2 * SIDEH);
    g.fillStyle = COL.belly; g.fillRect(0, BAND[3], TW, TOPH);
    /* a few slightly lighter or darker panels, as B shows on the body */
    for (i = 0; i < 26; i++) {
      var px0 = pxX(X(3 + R() * 16)), w0 = (0.6 + R() * 1.6) * PXM;
      g.fillStyle = (i & 1) ? "rgba(120,126,130,0.16)" : "rgba(40,42,46,0.14)";
      g.fillRect(px0, R() * TEXH, w0, (0.4 + R() * 1.0) * PXM);
    }
    /* the light grey radome, 2.2 m long, on every band (A, B) */
    g.fillStyle = COL.radome;
    g.fillRect(pxX(X(2.2)), 0, TW - pxX(X(2.2)), TEXH);

    function line(pts, band, col, lw) {
      g.strokeStyle = col; g.lineWidth = lw; g.beginPath();
      for (var k = 0; k < pts.length; k++) {
        var u = pxX(X(pts[k][0])), w = BAND[band] + pxY(Y(pts[k][1]));
        if (k) g.lineTo(u, w); else g.moveTo(u, w);
      }
      g.stroke();
    }
    function sline(pts, band, col, lw) {
      /* on a side band: pts are [s, h] */
      g.strokeStyle = col; g.lineWidth = lw; g.beginPath();
      for (var k = 0; k < pts.length; k++) {
        var u = pxX(X(pts[k][0])), w = BAND[band] + clamp((ZTOP - Z(pts[k][1])) / ZSPAN * SIDEH, 0, SIDEH);
        if (k) g.lineTo(u, w); else g.moveTo(u, w);
      }
      g.stroke();
    }
    var HINGE = "rgba(16,18,20,0.55)", PANEL = "rgba(18,20,22,0.25)";
    for (b = 0; b <= 3; b += 3) for (sg = -1; sg <= 1; sg += 2) {
      /* wing: the leading-edge flap 0.5 m behind the edge, the flaperon
         hinge (D: 18.10 m at the root to 17.50 at the tip) and the split
         between flaperon and aileron at y 5.05 */
      line([[wLE(3.0) + 0.5, sg * 3.0], [wLE(6.9) + 0.45, sg * 6.9]], b, HINGE, 1.5);
      line([[18.10, sg * 2.6], [17.50, sg * 7.0]], b, HINGE, 1.5);
      line([[18.10 - (5.05 - 2.6) * 0.136, sg * 5.05], [wTE(5.05), sg * 5.05]], b, HINGE, 1.5);
      /* the frame joints and the long seam of D top */
      for (i = 0; i < 8; i++) line([[8.2 + i * 1.45, sg * 0.15], [8.2 + i * 1.45, sg * 2.55]], b, PANEL, 1);
      line([[5.4, sg * 1.0], [19.4, sg * 1.5]], b, PANEL, 1);
    }
    /* a panel joint across the nose top (D top: 1.45 m aft of the tip) */
    line([[1.45, -0.55], [1.45, 0.55]], 0, PANEL, 1);
    /* belly: the main bay between the trunks (D top: 8.6-12.6 m, its ends
       serrated) and its centre split */
    function bay(s0, s1, y0, y1, band) {
      var p = [[s0, y0], [s0 + 0.22, (y0 + y1) / 2], [s0, y1], [s1, y1], [s1 + 0.22, (y0 + y1) / 2], [s1, y0], [s0, y0]];
      line(p, band, "rgba(14,16,18,0.6)", 2);
    }
    bay(8.6, 12.6, -0.85, 0.85, 3);
    line([[8.6, 0], [12.6, 0]], 3, "rgba(14,16,18,0.45)", 1.5);
    /* side bays on the trunk sides (D side: 7.7-11.2 m, h 1.50-1.92) and
       the nose gear doors (6.0-7.4 m) */
    for (b = 1; b <= 2; b++) {
      sline([[7.7, 1.50], [7.85, 1.71], [7.7, 1.92], [11.2, 1.92], [11.35, 1.71], [11.2, 1.50], [7.7, 1.50]], b, "rgba(14,16,18,0.55)", 2);
      sline([[2.2, 1.45], [2.2, 2.90]], b, "rgba(14,16,18,0.35)", 1.5);
    }
    line([[5.9, -0.32], [7.4, -0.32], [7.4, 0.32], [5.9, 0.32], [5.9, -0.32]], 3, "rgba(14,16,18,0.5)", 1.5);
    /* soot behind the nozzles, on the booms' inner faces and the belly */
    g.fillStyle = "rgba(30,26,22,0.25)";
    for (sg = -1; sg <= 1; sg += 2) g.fillRect(pxX(X(20.4)), BAND[3] + pxY(Y(sg * NZ.y + 0.55)), (X(19.2) - X(20.4)) * PXM, 1.1 * KY * PXM);
    /* light grime */
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(20,20,24," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TEXH, 10 + R() * 40, 2 + R() * 6);
    }
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.10, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x5c6064);
    m.light = new V.MeshStandardMaterial({ color: 0x80847a, roughness: 0.78, metalness: 0.10 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x141618, roughness: 0.74, metalness: 0.22, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6e70, roughness: 0.45, metalness: 0.62, side: V.DoubleSide });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2a3840, roughness: 0.10, metalness: 0.45 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
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
  function box(sx, sy, sz, x, y, z, rx) {
    var g = new V.BoxGeometry(sx, sy, sz);
    if (rx) g.rotateX(rx);
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
    return tris(out);
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
  /* a lifting surface between two edge points, in model space, with its
     thickness normal; returns a closed solid */
  function surface(sts, nrm) {
    var rs = [], i;
    for (i = 0; i < sts.length; i++) rs.push(foil(sts[i][0], sts[i][1], sts[i][2], nrm));
    return smooth(bridge(rs, true, true));
  }

  /* ------------------------------------------------------------- build -- */
  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "j20";
    var K = { skin: [], light: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], dark: [], door: [] };
    var s, i, k, rings, f;

    /* ---- centre body: chined nose, cockpit, spine, engine bay (rec. 1, 8) */
    var bt = fair(BODY, 2);
    rings = [];
    for (i = 0; i < bt.length; i++) {
      var b = bt[i];
      rings.push(ring(X(b[0]), 0, Y(b[1]), Z(b[2]), b[3] - b[2], b[2] - b[4], b[5], b[6], b[7], 32));
    }
    K.skin.push(smooth(bridge(rings, true, true)));

    /* ---- LERX / blended plate out to the wing root (recognition 3) */
    rings = [];
    for (i = 0; i < PLATE.length; i++) {
      var q = PLATE[i];
      rings.push(ring(X(q[0]), 0, Y(q[1]), Z(q[2]), q[3], q[4], 1.7, 1.7, 0.55, 32));
    }
    K.skin.push(smooth(bridge(rings, true, true)));

    for (s = -1; s <= 1; s += 2) {
      /* ---- intake trunk, open at the raked lip (recognition 4) */
      var tt = fair(TRUNK, 2);
      rings = [];
      for (i = 0; i < tt.length; i++) {
        var a = tt[i], hc = (a[3] + a[4]) / 2, hh = (a[4] - a[3]) / 2;
        var rg = ring(X(a[0]), s * Y(a[1]), Y(a[2]), Z(hc), hh, hh, 0.35, 0.35, 0.3, 24);
        if (i === 0) {
          /* the lip: the top 0.27 m ahead of the bottom (D side) */
          for (k = 0; k < rg.length; k++) rg[k][0] = X(a[0] + RAKE * (Z(a[4]) - rg[k][2]) / (2 * hh));
        }
        rings.push(rg);
      }
      K.skin.push(smooth(bridge(rings, false, true)));
      /* the dark throat 0.45 m inside the lip */
      var th = TRUNK[1];
      K.dark.push(bridge([ring(X(6.25), s * Y(th[1]), Y(th[2]) - 0.03, Z((th[3] + th[4]) / 2), (th[4] - th[3]) / 2 - 0.03, (th[4] - th[3]) / 2 - 0.03, 0.35, 0.35, 0.3, 24),
                          ring(X(6.32), s * Y(th[1]), Y(th[2]) - 0.03, Z((th[3] + th[4]) / 2), (th[4] - th[3]) / 2 - 0.03, (th[4] - th[3]) / 2 - 0.03, 0.35, 0.35, 0.3, 24)], true, true));
      /* the DSI bump on the inner wall, light grey (A) */
      var BUMP = [[4.95, 0.02, 0.05], [5.35, 0.16, 0.34], [5.80, 0.27, 0.48], [6.20, 0.24, 0.44], [6.60, 0.10, 0.26], [6.90, 0.02, 0.06]];
      rings = [];
      for (i = 0; i < BUMP.length; i++)
        rings.push(ring(X(BUMP[i][0]), s * Y(0.90), Y(BUMP[i][1]) + 0.06, Z(1.98), BUMP[i][2], BUMP[i][2], 1, 1, 1, 18));
      for (i = 0; i < rings.length; i++) for (k = 0; k < rings[i].length; k++)
        rings[i][k][1] = s * Y(0.90) + (rings[i][k][1] - s * Y(0.90)) * (s * (rings[i][k][1] - s * Y(0.90)) > 0 ? 1 : 0.2);
      K.light.push(smooth(bridge(rings, true, true)));

      /* ---- tail boom (recognition 5, 7) */
      rings = [];
      for (i = 0; i < BOOM.length; i++) {
        var bm = BOOM[i];
        rings.push(ring(X(bm[0]), s * Y(bm[1]), Y(bm[2]), Z(bm[3]), bm[4], bm[4], 0.7, 0.7, 0.6, 16));
      }
      K.skin.push(smooth(bridge(rings, true, true)));

      /* ---- nozzle: sixteen petals, a dark bore, a hot ring inside */
      var ny = s * Y(NZ.y), nz = Z(NZ.h);
      for (i = 0; i < 16; i++) {
        var a0 = i * 2 * PI / 16, a1 = (i + 0.9) * 2 * PI / 16;
        var np = function (r, ang, x) { return [x, ny + Math.cos(ang) * r, nz + Math.sin(ang) * r]; };
        var pet = bridge([[np(NZ.r0, a0, X(NZ.s0)), np(NZ.r0, a1, X(NZ.s0)), np(NZ.r0 - 0.04, a1, X(NZ.s0)), np(NZ.r0 - 0.04, a0, X(NZ.s0))],
                          [np(NZ.r1, a0, X(NZ.s1)), np(NZ.r1, a1, X(NZ.s1)), np(NZ.r1 - 0.04, a1, X(NZ.s1)), np(NZ.r1 - 0.04, a0, X(NZ.s1))]], true, true);
        if (i & 1) K.metal.push(pet); else K.dark.push(pet);
      }
      K.dark.push(bridge([ring(X(NZ.s0 + 0.05), ny, NZ.r0 - 0.05, nz, NZ.r0 - 0.05, NZ.r0 - 0.05, 1, 1, 1, 20),
                          ring(X(NZ.s1 - 0.40), ny, NZ.r1 - 0.06, nz, NZ.r1 - 0.06, NZ.r1 - 0.06, 1, 1, 1, 20)], true, true));
      K.metal.push(bridge([ring(X(NZ.s1 - 0.45), ny, 0.30, nz, 0.30, 0.30, 1, 1, 1, 12),
                           ring(X(NZ.s1 - 0.40), ny, 0.30, nz, 0.30, 0.30, 1, 1, 1, 12)], true, true));

      /* ---- wing: one solid a side (recognition 3), team strip */
      var wy = [2.20, 2.58, 3.4, 4.3, 5.2, 6.1, 6.7, TIP], wl = [];
      for (i = 0; i < wy.length; i++) {
        var yy = wy[i];
        wl.push([[X(wLE(yy)), s * Y(yy), Z(wH(yy))], [X(wTE(yy)), s * Y(yy), Z(wH(yy))], wT(yy)]);
      }
      K.skin.push(surface(wl, [0, 0, 1]));
      var f0 = 0.22, f1 = 0.50, ya = 5.4, yb = 6.1;
      var tb = function (y, kk) {
        var le = wLE(y), te = wTE(y), c = te - le, hz = wT(y) * 0.5 + 0.02;
        return [[X(le + c * f0), s * Y(y), Z(wH(y)) + kk * hz], [X(le + c * f1), s * Y(y), Z(wH(y)) + kk * hz]];
      };
      var ta = tb(ya, 1), tb2 = tb(yb, 1), tc = tb(ya, 0.7), td = tb(yb, 0.7);
      K.team.push(bridge([[ta[0], ta[1], tc[1], tc[0]], [tb2[0], tb2[1], td[1], td[0]]], true, true));

      /* the flap-actuator fairings under the wing (C; stations by eye) */
      var FY = [3.9, 5.6];
      for (k = 0; k < FY.length; k++) {
        var fy = FY[k], fs0 = wTE(fy) - 1.7, fs1 = wTE(fy) + 0.35, fz = Z(wH(fy)) - wT(fy) * 0.35;
        K.skin.push(smooth(bridge([ring(X(fs0), s * Y(fy), 0.01, fz, 0.01, 0.01, 1, 1, 1, 10),
                                   ring(X(fs0 + 0.5), s * Y(fy), 0.10, fz, 0.02, 0.13, 1, 1, 1, 10),
                                   ring(X(fs1 - 0.5), s * Y(fy), 0.10, fz, 0.02, 0.13, 1, 1, 1, 10),
                                   ring(X(fs1), s * Y(fy), 0.02, fz - 0.03, 0.01, 0.02, 1, 1, 1, 10)], true, true)));
      }

      /* ---- canard: all-moving, set 9 degrees up (recognition 2) */
      var cl = [], cy = [1.80, CAN.ry, 3.0, CAN.ty];
      for (i = 0; i < cy.length; i++) {
        f = Math.max(0, (cy[i] - CAN.ry) / (CAN.ty - CAN.ry));
        var cle = CAN.rLE + (CAN.tLE - CAN.rLE) * f, cte = CAN.rTE + (CAN.tTE - CAN.rTE) * f;
        var chh = CAN.rh + (CAN.th - CAN.rh) * (cy[i] - CAN.ry) / (CAN.ty - CAN.ry);
        cl.push([[X(cle), s * Y(cy[i]), Z(chh)], [X(cte), s * Y(cy[i]), Z(chh)], 0.15 - 0.10 * f]);
      }
      var cang = Math.atan2(CAN.th - CAN.rh, Y(CAN.ty - CAN.ry));
      K.skin.push(surface(cl, [0, -s * Math.sin(cang), Math.cos(cang)]));
      K.metal.push(cyl(0.06, 0.06, 0.14, 10, "y", X(8.0), s * Y(1.86), Z(2.58)));

      /* ---- fin: all-moving, canted 27 degrees out (recognition 5) */
      var fl = [];
      for (i = -1; i <= 4; i++) {
        f = i / 4;
        var fyy = FIN.ry + (FIN.ty - FIN.ry) * f, fh = FIN.rh + (FIN.th - FIN.rh) * f;
        var fle = FIN.rLE + (FIN.tLE - FIN.rLE) * Math.max(0, f), fte = FIN.rTE + (FIN.tTE - FIN.rTE) * Math.max(0, f);
        fl.push([[X(fle), s * Y(fyy), Z(fh)], [X(fte), s * Y(fyy), Z(fh)], 0.17 - 0.12 * Math.max(0, f)]);
      }
      var cant = Math.atan2(Y(FIN.ty - FIN.ry), FIN.th - FIN.rh);
      K.skin.push(surface(fl, [0, s * Math.cos(cant), -Math.sin(cant)]));
      /* the pivot gap at the fin root */
      K.dark.push(bar([X(FIN.rLE + 0.2), s * Y(FIN.ry + 0.04), Z(FIN.rh + 0.07)], [X(FIN.rTE - 0.1), s * Y(FIN.ry + 0.04), Z(FIN.rh + 0.07)], 0.025, 5));

      /* ---- ventral fin, canted 20 degrees out (recognition 6) */
      var vl = [];
      for (i = -1; i <= 3; i++) {
        f = Math.max(0, i / 3);
        var vy = VEN.ry + (VEN.ty - VEN.ry) * (i / 3);
        var vle = VEN.rLE + (VEN.tLE - VEN.rLE) * f, vte = VEN.rTE + (VEN.tTE - VEN.rTE) * f;
        var vhl = VEN.rh + (VEN.tlh - VEN.rh) * (i / 3), vht = VEN.rh + (VEN.tth - VEN.rh) * (i / 3);
        vl.push([[X(vle), s * Y(vy), Z(vhl)], [X(vte), s * Y(vy), Z(vht)], 0.10 - 0.05 * f]);
      }
      var vc = Math.atan2(Y(VEN.ty - VEN.ry), VEN.rh - VEN.tlh);
      K.skin.push(surface(vl, [0, s * Math.cos(vc), Math.sin(vc)]));
    }

    /* the small fairing between the nozzles (D top: to 20.1 m) */
    K.skin.push(smooth(bridge([ring(X(19.4), 0, 0.22, Z(1.98), 0.30, 0.30, 1, 1, 1, 12),
                               ring(X(19.9), 0, 0.12, Z(1.98), 0.18, 0.18, 1, 1, 1, 12),
                               ring(X(20.15), 0, 0.02, Z(1.98), 0.03, 0.03, 1, 1, 1, 12)], true, true)));

    /* ---- canopy (recognition 9): glass, the front bow, sill rails */
    rings = [];
    var ct = fair(CANOPY, 2);
    for (i = 0; i < ct.length; i++) {
      var cq = ct[i];
      rings.push(ring(X(cq[0]), 0, Y(cq[2]), Z(cq[1]), cq[3], 0.12, 0.85, 1, 1, 22));
    }
    K.glass.push(smooth(bridge(rings, true, true)));
    function canopyAt(sx) {
      for (var qq = 0; qq < CANOPY.length - 1; qq++) {
        var A0 = CANOPY[qq], B0 = CANOPY[qq + 1];
        if (sx >= A0[0] && sx <= B0[0]) {
          var u = (sx - A0[0]) / (B0[0] - A0[0]);
          return [A0[1] + (B0[1] - A0[1]) * u, A0[2] + (B0[2] - A0[2]) * u, A0[3] + (B0[3] - A0[3]) * u];
        }
      }
      return CANOPY[0].slice(1);
    }
    var arc = canopyAt(3.45), prev = null;
    for (k = 0; k <= 14; k++) {
      var ta2 = PI * k / 14, cur = [X(3.45), Math.cos(ta2) * (Y(arc[1]) + 0.015), Z(arc[0]) + Math.pow(Math.sin(ta2), 0.85) * (arc[2] + 0.015)];
      if (prev) K.dark.push(bar(prev, cur, 0.035, 5));
      prev = cur;
    }
    for (s = -1; s <= 1; s += 2) {
      var sill = [];
      for (k = 0; k <= 6; k++) {
        var sx2 = 2.9 + k * (6.0 - 2.9) / 6, cr = canopyAt(sx2);
        sill.push([X(sx2), s * (Y(cr[1]) + 0.01), Z(cr[0]) + 0.02]);
      }
      for (k = 0; k < sill.length - 1; k++) K.dark.push(bar(sill[k], sill[k + 1], 0.025, 4));
    }
    /* ---- EOTS fairing under the nose, faceted, dark window (A, B) */
    K.skin.push(bridge([ring(X(2.20), 0, 0.10, Z(1.62), 0.02, 0.04, 1, 1, 1, 8),
                        ring(X(2.45), 0, Y(0.36), Z(1.60), 0.04, 0.16, 1, 1, 1, 8),
                        ring(X(2.85), 0, Y(0.36), Z(1.52), 0.04, 0.12, 1, 1, 1, 8),
                        ring(X(3.05), 0, 0.10, Z(1.46), 0.02, 0.03, 1, 1, 1, 8)], true, true));
    K.glass.push(box(0.10, 0.36, 0.12, X(2.36), 0, Z(1.50)));
    /* the dorsal aerial behind the canopy */
    K.dark.push(bar([X(7.4), 0, Z(3.12)], [X(7.75), 0, Z(3.42)], 0.02, 5));

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.light, T.light, "light");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");

    /* ---- landing gear (D side, A, B): it retracts, so the group is
       "gear"; tyres are its lowest part */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    /* nose: single wheel 6.51 m aft of the nose, the leg raked forward */
    var nx = X(6.51), nr = 0.28, nzz = GROUND + nr;
    G.metal.push(bar([nx - 0.30, 0, Z(1.20)], [nx, 0, nzz + 0.06], 0.06, 10));
    G.metal.push(bar([nx - 0.27, 0, Z(1.15)], [nx - 0.09, 0, nzz + 0.40], 0.08, 12));
    G.metal.push(bar([nx + 0.55, 0, Z(1.18)], [nx - 0.14, 0, nzz + 0.72], 0.03, 6));
    for (s = -1; s <= 1; s += 2) G.metal.push(bar([nx - 0.02, s * 0.11, nzz + 0.30], [nx, s * 0.11, nzz], 0.03, 6));
    G.tyre.push(cyl(nr, nr, 0.18, 18, "y", nx, 0, nzz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.19, 14, "y", nx, 0, nzz));
    for (s = -1; s <= 1; s += 2) G.door.push(box(1.30, 0.04, 0.42, X(6.7), s * Y(0.34), Z(1.0), s * 0.15));
    /* mains: 13.52 m aft, 1.65 m out, tyres 0.92 m */
    var mx = X(13.52), mr = 0.46, mzz = GROUND + mr, my = 1.65;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.05, s * (my - 0.25), Z(1.10)], [mx, s * (my - 0.04), mzz + 0.05], 0.075, 10));
      G.metal.push(bar([mx + 0.06, s * (my - 0.24), Z(1.05)], [mx + 0.03, s * (my - 0.10), mzz + 0.38], 0.10, 12));
      G.tyre.push(cyl(mr, mr, 0.32, 24, "y", mx, s * my, mzz));
      G.metal.push(cyl(mr * 0.58, mr * 0.58, 0.33, 16, "y", mx, s * my, mzz));
      G.dark.push(cyl(mr * 0.30, mr * 0.30, 0.35, 10, "y", mx, s * my, mzz));
      G.metal.push(bar([mx - 0.8, s * (my - 0.30), Z(1.08)], [mx - 0.02, s * (my - 0.10), mzz + 0.40], 0.035, 6));
      /* the leg door outboard and the bay door under the trunk */
      G.door.push(box(1.10, 0.05, 0.62, mx - 0.10, s * (my + 0.30), Z(0.72), -s * 0.10));
      G.door.push(box(1.30, 0.05, 0.38, mx - 0.25, s * (my - 0.75), Z(0.90), s * 0.45));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(gr, G.door, T.skin, "gear_doors", true);
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the x extent: radome tip (10.6) to the fin tips' trailing corner
   (-10.6) */
UNIT_MODELS["pla_e00_stealthfighter"] = { len: 21.2, build: HeroJ20.build };
