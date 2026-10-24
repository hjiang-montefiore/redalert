/* ============ ru_su33.js - HERO model: Sukhoi Su-33 "Flanker-D" ============
   Registers cfighter_p ("Su-33 Flanker-D", "Sukhoi Su-33", accepted 1998,
   the Kuznetsov's air group). One key, one variant: the series Su-33 of
   the Russian Navy's 279th shipborne fighter regiment in its two-tone
   grey-blue scheme. It replaces the generic parametric fighter
   units3d_air2.js registered for this key (that file loads earlier in
   index.html and assigns unconditionally, so this later assignment wins).

   Model space: +X nose, +Y left (port), +Z up, metres. The tables are in
   DRAWING units: s is metres aft of the radome tip, y metres off the
   centreline, h metres above a datum line through the nacelle tops at the
   intakes. X = 10.215 - s, Y = y, Z = h.

   The Flanker airframe is lofted from the same drawing and stations as
   js/hero/ru_su35.js (the Commons "Sukhoi Su-27 3-view line drawing.svg",
   read on a metre grid); what is the Su-33's own is drawn from:
     ru.wikipedia "Су-33" (after Fomin): length 21.18 m; span 14.7 m, 7.40 m
       with the wings folded, 14.948 m with missiles on the tip rails;
       tailplane span 9.9 m, 7.40 m folded; height 5.72 m; wing 67.84 m2,
       42.4 deg leading edge; all-moving canards of 53.5 deg sweep, 6.43 m
       span, 2.99 m2; fins of 40 deg sweep, not canted; folding wings and
       tailplanes; strengthened gear; a tailhook under the central beam
       ("центральная балка", the sting), whose tip hinges up to save deck
       room; a retractable refuelling probe; the spine airbrake kept.
     Wikimedia Commons, fetched at 960 px for this file:
     A "Sukhoi Su-33, Russia - Navy AN1789063.jpg" - parked, port side: the
       profile, canards on the LERX ahead of the wing, the short sting, white
       radome and white fin caps, the two-tone blue upper surfaces, the
       ventral fins, the twin nose wheels.
     B "Russian Navy Sukhoi Su-33.jpg" - side-on in flight, gear up: the
       canard, the nose pitot, the cropped fin with its white cap, the short
       sting ending just aft of the nozzles.
     C "Sukhoi Su-33 in 2010.jpg" - from below, front three-quarter: the long
       twin-wheel nose leg, the single-wheel main legs, light grey under-
       surfaces, red stars under the wings.
     D "Sukhoi Su-33 in 2010 (3).jpg" and E "Russian Air Force Sukhoi Su-33
       Bubin-1.jpg" - from below: the planform with canards, the tip rails,
       the tailplanes, the AL-31F3 nozzles, the sting and stowed hook.
     F "Sukhoi Su-33 77 RED (30268117476).jpg" - front three-quarter from
       below: the canards, the empty wingtip rails, the white fin caps.
     G "Su-33Seite.jpg" (ru.wikipedia's "Су-33 со сложенным крылом и ГО") -
       wings and tailplanes folded: the outer wing panels stand about
       upright with their pylons, the tailplane tips stand upright by the fins.
     H "Sukhoi Su-33 on Admiral Kuznetsov-1/-2/-3.jpg" - on her deck: the
       paint in grey light, the rear view with the nozzles and sting.
   Not drawn because nothing here confirms its shape: the sting tip's
   hinge-up (drawn down, as it flies); the probe extended (drawn stowed, as
   every photograph has it).

   Recognition list (what makes it a Su-33 at RTS zoom; each shows here):
     1. All-moving CANARDS on the LERX just ahead of the wing root, 53.5 deg
        swept, 6.43 m over the tips (ru.wikipedia, A, B, D, E) - canards.
     2. The Flanker planform: ogival LERX into a 42 deg wing, wingtip launch
        rails (no pods), 14.7 m span (A-F, drawing) - wing, rails.
     3. FOLDING outer wings: four "wingfold" groups (two wing, two tailplane)
        that render3d folds on a deck to the published 7.40 m (G). G shows
        the outer wings about upright; the exact angle is not published,
        drawn at 96 deg, the hinge placed so the width is 7.40 m.
     4. FOLDING tailplanes: the outer tailplane stands up beside the fin (G).
     5. The SHORT tail sting ending 0.9 m aft of the nozzles, with the
        stowed TAILHOOK along its underside (A, B, D, E, H) - sting, hook.
     6. The strengthened TWIN-WHEEL nose leg, long, with its drag brace (A, C).
     7. Twin cropped fins (5.72 m height) with white caps, ventral fins (A, B, F).
     8. Two nacelles with big raked square intakes under the LERX, AL-31F3
        nozzles with dark-bronze petals (A, D, E, H).
     9. The stowed refuelling probe (ru.wikipedia: retractable), drawn as
        a fairing with the probe head on the port side ahead of the
        windscreen - the place is the Flanker family's; its exact outline is
        not confirmed in these photographs. The IRST ball ahead of the
        windscreen, the 0.75 m nose pitot (A, B, F: a quarter of the radome).
    10. The grey-blue Russian Navy scheme: pale blue-grey with mid blue
        patches above, light grey below, white radome and fin caps (A, C, H).
   Paint sampled from A (sun) and H-2 (overcast), taken to about 0.8 of its
   level: pale (128,154,170), blue (66,118,142), belly (154,166,172),
   radome and fin caps (190,188,182).
   Markings: red stars with a white edge on the outer faces of the fins and
   under the wings (A, B, C, E). No bort number, flag, ensign, badge or text.
   Gear: it RETRACTS, so its group is named "gear" (A, B in flight gear up).
   Stores: the row names R-27ER and R-73 (generations.js): an R-27ER under
   each intake, an R-73 on each inner-wing pylon (inboard of the fold); the
   tip rails empty as F and D show them.
   Team colour exactly C.team: one modest strip on each inner wing.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu33 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI, D2R = PI / 180;
  var XN = 10.215;
  function X(s) { return XN - s; }
  var GROUND = -1.45;                  /* fin cap h 4.27: 5.72 m height */

  /* ------------------------------------------------------- the tables -- */
  /* forebody and centre body: [s, half-width, crown h, keel h, upper exp, lower exp] (drawing side and plan) */
  var BODY = [
    [0.00, 0.02, 0.57, 0.53, 1.0, 1.0],
    [0.30, 0.14, 0.71, 0.43, 1.0, 1.0],
    [0.70, 0.25, 0.86, 0.37, 1.0, 1.0],
    [1.20, 0.36, 1.03, 0.30, 1.0, 1.0],
    [1.80, 0.47, 1.22, 0.24, 1.0, 1.0],
    [2.50, 0.56, 1.43, 0.19, 1.0, 0.95],
    [3.10, 0.60, 1.60, 0.16, 1.0, 0.9],      /* radome joint */
    [3.70, 0.63, 1.72, 0.13, 0.95, 0.85],
    [4.30, 0.66, 1.79, 0.12, 0.9, 0.8],      /* windscreen base */
    [5.00, 0.70, 1.82, 0.14, 0.85, 0.8],
    [6.00, 0.78, 1.86, 0.18, 0.85, 0.75],
    [7.00, 0.86, 1.93, 0.25, 0.85, 0.75],
    [8.00, 0.93, 2.04, 0.33, 0.85, 0.7],
    [9.00, 0.98, 2.05, 0.42, 0.85, 0.7],
    [10.0, 1.02, 1.95, 0.48, 0.85, 0.7],
    [11.0, 1.05, 1.81, 0.50, 0.85, 0.7],
    [12.0, 1.05, 1.66, 0.52, 0.85, 0.7],
    [13.0, 1.02, 1.51, 0.52, 0.85, 0.7],
    [14.0, 0.98, 1.39, 0.52, 0.85, 0.7],
    [15.0, 0.92, 1.28, 0.52, 0.85, 0.7],
    [16.0, 0.84, 1.20, 0.52, 0.85, 0.7],
    [17.0, 0.72, 1.13, 0.52, 0.85, 0.75],
    [18.0, 0.52, 1.06, 0.50, 0.9, 0.8],
    [18.8, 0.36, 1.01, 0.44, 0.95, 0.9]
  ];
  /* the SHORT sting (A, B, D): 21.18 m overall, 0.75 m shorter than the
     Su-27's; deeper aft for the hook and the brake-chute can */
  var STING = [[18.8, 0.36, 1.01, 0.44], [19.5, 0.32, 0.96, 0.38], [20.2, 0.27, 0.90, 0.38],
               [20.7, 0.21, 0.83, 0.42], [21.0, 0.14, 0.76, 0.48], [21.18, 0.05, 0.68, 0.56]];
  /* canopy (drawing side): [s, half-width, top h]; the glazing sits on a sill at h 1.70 */
  var CANOPY = [[4.30, 0.30, 1.86], [4.70, 0.45, 2.20], [5.20, 0.50, 2.45], [5.80, 0.51, 2.57],
                [6.50, 0.50, 2.55], [7.10, 0.46, 2.42], [7.60, 0.38, 2.25]];
  /* nacelles, each side: [s, centre y, centre h, half-width, upper, lower, exp]; the first row is the raked mouth */
  var NAC = [
    [9.60, 0.97, -0.07, 0.59, 0.53, 0.53, 0.30],
    [10.8, 0.97, 0.00, 0.60, 0.75, 0.60, 0.40],
    [13.0, 0.97, 0.05, 0.62, 0.75, 0.65, 0.50],
    [15.0, 0.97, 0.10, 0.62, 0.70, 0.70, 0.60],
    [16.5, 0.97, 0.20, 0.62, 0.65, 0.72, 0.75],
    [17.5, 0.97, 0.27, 0.61, 0.62, 0.67, 0.85],
    [18.5, 0.97, 0.35, 0.59, 0.58, 0.60, 0.95],
    [19.15, 0.97, 0.42, 0.57, 0.56, 0.56, 1.0]
  ];
  var RAKE = 1.45;
  /* tail beams carrying fins and tailplanes: [s, centre y, centre h, half-width, half-height] */
  var BEAM = [[14.5, 1.95, 0.72, 0.30, 0.28], [16.5, 1.95, 0.60, 0.30, 0.32], [18.5, 1.97, 0.55, 0.26, 0.30],
              [19.8, 1.98, 0.50, 0.19, 0.22], [20.5, 1.98, 0.48, 0.11, 0.13], [20.85, 1.98, 0.47, 0.03, 0.04]];
  /* wing planform: the LERX edge, then the 42 degree leading edge */
  var WLE = [[0.70, 5.0], [0.85, 6.15], [0.95, 7.0], [1.15, 8.0], [1.43, 9.0], [1.76, 10.0], [2.04, 10.6], [7.04, 15.0]];
  var TIPY = 7.04;
  /* the fold line (G, and the published 7.40 m folded): the outer panel
     hinges on the upper skin at y 3.465 and stands up past the vertical */
  var WFY = 3.465, WFOLD = 96;
  var WST_IN = [0.70, 0.85, 0.95, 1.15, 1.43, 1.76, 2.04, 2.8, WFY];
  var WST_OUT = [WFY, 4.3, 5.2, 6.1, 7.04];
  function wLE(y) {
    for (var i = 0; i < WLE.length - 1; i++) {
      if (y <= WLE[i + 1][0]) { var f = (y - WLE[i][0]) / (WLE[i + 1][0] - WLE[i][0]); return WLE[i][1] + f * (WLE[i + 1][1] - WLE[i][1]); }
    }
    return WLE[WLE.length - 1][1];
  }
  function wTE(y) { return y <= 2.14 ? 16.0 : 16.0 + (y - 2.14) * 0.299; }       /* tip 17.47 */
  function wH(y) { return y <= 2.04 ? 0.95 : 0.95 - (y - 2.04) * 0.035; }        /* 2 deg anhedral */
  function wT(y) { return y <= 2.04 ? 0.30 : 0.30 - (y - 2.04) / (TIPY - 2.04) * 0.21; }
  /* tailplanes: [y, le s, te s, thickness]; 9.9 m span, the outer part
     folds up about a hinge at y 3.58 (7.40 m folded) */
  var TP = [[2.14, 17.0, 20.7, 0.17], [3.62, 18.45, 20.85, 0.12], [4.95, 19.65, 20.15, 0.05]];
  var TFY = 3.58, TFOLD = 90;
  function tpAt(y) {
    var a = y <= TP[1][0] ? TP[0] : TP[1], b = y <= TP[1][0] ? TP[1] : TP[2], f = (y - a[0]) / (b[0] - a[0]);
    return [y, a[1] + f * (b[1] - a[1]), a[2] + f * (b[2] - a[2]), a[3] + f * (b[3] - a[3])];
  }
  function tpH(y) { return 0.48 - (y - 2.14) * 0.02; }
  /* canards (ru.wikipedia: 53.5 deg, 6.43 m over the tips, 2.99 m2; A, B, E place them on the LERX) */
  /* B side-on (34.5 px/m off the radome): the root leading edge at s 8.9, the tip
     at s 11.6, close ahead of the wing leading edge; the root on the LERX edge */
  var CAN = { y0: 1.40, y1: 3.215, le0: 8.95, c0: 1.40, c1: 0.27, h: 1.12 };
  /* fins: root s 15.2 -> 18.5 at h 0.88; cropped to a 4.27 m cap (5.72 m height) */
  var FIN_Y = 2.12, FIN_R = 0.80, FIN_T = 4.27;

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -11.2, TW = 680;
  var YMAX = 8.0, TOPH = 480, ZTOP = 4.7, SIDEH = 190;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var PAL = { pale: "#809aaa", blue: "#42768e", belly: "#9aa6ac", white: "#bebcb6", glare: "#4a575e" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxS(s) { return pxX(X(s)); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  /* the Russian star: red with a white edge (as ru_su35.js) */
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

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 33101, i, b, x, y, k;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    /* a soft-edged patch: a lumpy closed curve round (cx, cy) */
    function blob(cx, cy, rx, ry) {
      var n = 9, pts = [];
      for (var j = 0; j < n; j++) {
        var a = 2 * PI * j / n, q = 0.70 + R() * 0.45;
        pts.push([cx + Math.cos(a) * rx * q, cy + Math.sin(a) * ry * q]);
      }
      g.beginPath();
      g.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2);
      for (j = 0; j < n; j++) {
        var p = pts[j], q2 = pts[(j + 1) % n];
        g.quadraticCurveTo(p[0], p[1], (p[0] + q2[0]) / 2, (p[1] + q2[1]) / 2);
      }
      g.closePath(); g.fill();
    }
    g.fillStyle = PAL.pale; g.fillRect(0, 0, TW, B_BEL);
    g.fillStyle = PAL.belly; g.fillRect(0, B_BEL, TW, TOPH);
    /* upper surfaces: mid blue patches on the pale ground (A, H): the nose
       behind the radome and the spine blue, patches over the wings, LERX,
       tailplanes and canards */
    g.fillStyle = PAL.blue;
    g.fillRect(pxS(3.1), pxY(0.75), pxS(5.2) - pxS(3.1), pxY(-0.75) - pxY(0.75));
    g.fillRect(pxS(10.4), pxY(0.7), pxS(5.2) - pxS(10.4), pxY(-0.7) - pxY(0.7));
    blob(pxS(11.6), pxY(0.1), 2.0 * PXM, 0.85 * PXM);
    blob(pxS(15.2), pxY(-0.2), 1.9 * PXM, 0.75 * PXM);
    blob(pxS(9.4), pxY(1.6), 1.2 * PXM, 0.6 * PXM);
    blob(pxS(9.6), pxY(-1.5), 1.0 * PXM, 0.6 * PXM);
    var TOPB = [[11.2, 2.3, 1.3, 0.9], [13.6, 4.4, 1.5, 1.0], [15.8, 6.3, 1.1, 0.8], [12.4, -2.6, 1.4, 1.0],
                [14.6, -4.9, 1.6, 0.9], [16.4, -2.9, 0.9, 0.7], [8.6, 1.9, 0.9, 0.7], [9.2, -2.0, 1.0, 0.6],
                [19.1, 3.3, 0.9, 0.9], [19.6, -4.0, 0.8, 0.7], [16.9, 4.0, 0.7, 0.6], [17.2, -6.4, 0.6, 0.5]];
    for (i = 0; i < TOPB.length; i++) blob(pxS(TOPB[i][0]), pxY(TOPB[i][1]), TOPB[i][2] * PXM, TOPB[i][3] * PXM);
    /* the side bands: camouflage above the wing line, light grey below (A) */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.fillStyle = PAL.blue;
      g.fillRect(pxS(3.1), bd + pxZ(2.0), pxS(5.4) - pxS(3.1), pxZ(0.75) - pxZ(2.0));
      g.fillRect(pxS(9.8), bd + pxZ(2.2), pxS(5.4) - pxS(9.8), pxZ(1.15) - pxZ(2.2));
      var SB = [[7.0, 0.95, 1.2, 0.40], [10.8, 1.45, 1.9, 0.55], [13.6, 1.1, 1.5, 0.45], [16.6, 0.85, 1.2, 0.40]];
      for (i = 0; i < SB.length; i++) blob(pxS(SB[i][0] + b * 0.4), bd + pxZ(SB[i][1]), SB[i][2] * PXM, SB[i][3] * PXM);
      /* a pale patch under the canopy (A) */
      g.fillStyle = PAL.pale;
      blob(pxS(4.6), bd + pxZ(1.05), 0.75 * PXM, 0.30 * PXM);
      g.fillStyle = PAL.belly;
      g.fillRect(0, bd + pxZ(0.55), TW, SIDEH - pxZ(0.55));
      /* fins: mid blue with a pale blotch, the cropped cap white (A, B, F) */
      g.save();
      g.beginPath();
      g.moveTo(pxS(15.15), bd + pxZ(0.70)); g.lineTo(pxS(17.50), bd + pxZ(4.32));
      g.lineTo(pxS(18.58), bd + pxZ(4.08)); g.lineTo(pxS(18.58), bd + pxZ(0.70)); g.closePath();
      g.clip();
      g.fillStyle = PAL.blue; g.fillRect(pxS(15.0), bd, pxS(18.7) - pxS(15.0) + 2, SIDEH);
      g.fillStyle = PAL.pale;
      blob(pxS(17.6), bd + pxZ(1.6), 0.65 * PXM, 0.55 * PXM);
      blob(pxS(16.6), bd + pxZ(2.9), 0.45 * PXM, 0.35 * PXM);
      g.fillStyle = PAL.white;
      g.beginPath();
      g.moveTo(pxS(16.9), bd + pxZ(3.90)); g.lineTo(pxS(18.7), bd + pxZ(3.70)); g.lineTo(pxS(18.7), 0 + bd); g.lineTo(pxS(16.9), bd); g.closePath();
      g.fill();
      g.restore();
    }
    /* the radome, white on every band (A-F) */
    g.fillStyle = PAL.white;
    for (b = 0; b < 5; b++) {
      var y0 = [B_TOP, B_PORT, B_STBD, B_IN, B_BEL][b];
      g.fillRect(pxS(3.1), y0, TW - pxS(3.1), b === 0 || b === 4 ? TOPH : SIDEH);
    }
    /* dark anti-glare panel ahead of the windscreen */
    g.fillStyle = PAL.glare;
    g.beginPath();
    g.moveTo(pxS(3.6), pxY(0.30)); g.lineTo(pxS(4.35), pxY(0.55)); g.lineTo(pxS(4.35), pxY(-0.55)); g.lineTo(pxS(3.6), pxY(-0.30));
    g.closePath(); g.fill();
    /* panel lines: frames on every band, the spine airbrake outline, the flap and flaperon hinges */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [3.1, 4.3, 5.9, 7.7, 9.0, 10.4, 11.8, 13.2, 14.6, 16.0, 17.3, 18.8, 20.0];
    for (i = 0; i < FR.length; i++) {
      x = pxS(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.30)";
    g.strokeRect(pxS(11.7), pxY(0.42), pxS(9.4) - pxS(11.7), pxY(-0.42) - pxY(0.42));   /* spine airbrake */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.beginPath();
        g.moveTo(pxS(15.35), ob + pxY(k * 2.14)); g.lineTo(pxS(16.55), ob + pxY(k * WFY)); g.stroke();      /* double-slotted flap */
        g.beginPath();
        g.moveTo(pxS(16.65), ob + pxY(k * (WFY + 0.15))); g.lineTo(pxS(17.0), ob + pxY(k * 6.9)); g.stroke();  /* flaperon */
        g.beginPath();
        g.moveTo(pxS(10.95), ob + pxY(k * 2.3)); g.lineTo(pxS(15.0), ob + pxY(k * 6.85)); g.stroke();      /* leading-edge flap */
        g.beginPath();
        g.moveTo(pxS(wLE(WFY) - 0.05), ob + pxY(k * WFY)); g.lineTo(pxS(wTE(WFY) + 0.05), ob + pxY(k * WFY)); g.stroke();   /* the fold joint */
      }
      g.beginPath(); g.moveTo(pxS(4.5), ob + pxY(0)); g.lineTo(pxS(19), ob + pxY(0)); g.stroke();
    }
    /* rivet rows and a little salt weathering */
    g.fillStyle = "rgba(0,0,0,0.10)";
    for (i = 0; i < 90; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 24) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 50; i++) {
      g.fillStyle = "rgba(30,34,38," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 40, 2 + R() * 6);
    }
    /* stars: the outer face of each fin (A, B), under each wing (C, E) */
    star(g, pxS(17.35), B_PORT + pxZ(2.55), 0.34 * PXM, 0.34 * PXM);
    star(g, pxS(17.35), B_STBD + pxZ(2.55), 0.34 * PXM, 0.34 * PXM);
    star(g, pxS(14.9), B_BEL + pxY(5.0), 0.42 * PXM, 0.42 * PXM);
    star(g, pxS(14.9), B_BEL + pxY(-5.0), 0.42 * PXM, 0.42 * PXM);
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
     inner (a side face turned toward the centreline), belly */
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
      var cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3;
      var band;
      if (nz > 0.55) band = B_TOP;
      else if (nz < -0.55) band = B_BEL;
      else if (Math.abs(cy) > 0.3 && ny * cy < 0) band = B_IN;
      else band = ny >= 0 ? B_PORT : B_STBD;
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === B_TOP || band === B_BEL) { U = pxX(x); W = band + clamp(pxY(y), 1, TOPH - 1); }
        else { U = pxX(endOn ? x + y : x); W = band + clamp(pxZ(z), 1, SIDEH - 1); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x809aaa);
    m.dark  = new V.MeshStandardMaterial({ color: 0x1a1d1f, roughness: 0.70, metalness: 0.25 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6c6f71, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x6a5c4c, roughness: 0.42, metalness: 0.60 });   /* D, E: dark-bronze petals */
    m.glass = new V.MeshStandardMaterial({ color: 0x24363d, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xbfc4c3, roughness: 0.55, metalness: 0.15 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit -- */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a cylinder along model x, y or z */
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  /* a round bar from p to q */
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
  /* one buffer per material: a single draw call for what would otherwise be dozens */
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
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a closed solid through a run of sections with the same number of
     corners, wound from the sections' own Newell normal (thin swept panels
     fool a centroid test) */
  function sloft(S) {
    var A = S[0], B = S[1], n = A.length, i, k, nx = 0, ny = 0, nz = 0, ax = 0, ay = 0, az = 0, out = [];
    for (i = 0; i < n; i++) {
      var p = A[i], q = A[(i + 1) % n];
      nx += (p[1] - q[1]) * (p[2] + q[2]); ny += (p[2] - q[2]) * (p[0] + q[0]); nz += (p[0] - q[0]) * (p[1] + q[1]);
      ax += B[i][0] - A[i][0]; ay += B[i][1] - A[i][1]; az += B[i][2] - A[i][2];
    }
    var sg = (nx * ax + ny * ay + nz * az) >= 0 ? 1 : -1;
    function q3(a, b, c) { if (sg > 0) out.push(a, b, c); else out.push(a, c, b); }
    var L = S[S.length - 1];
    for (i = 1; i < n - 1; i++) { q3(A[0], A[i + 1], A[i]); q3(L[0], L[i], L[i + 1]); }
    for (k = 0; k < S.length - 1; k++) {
      var P = S[k], Q = S[k + 1];
      for (i = 0; i < n; i++) {
        var j = (i + 1) % n;
        var d1 = (P[i][0] - Q[j][0]) * (P[i][0] - Q[j][0]) + (P[i][1] - Q[j][1]) * (P[i][1] - Q[j][1]) + (P[i][2] - Q[j][2]) * (P[i][2] - Q[j][2]);
        var d2 = (P[j][0] - Q[i][0]) * (P[j][0] - Q[i][0]) + (P[j][1] - Q[i][1]) * (P[j][1] - Q[i][1]) + (P[j][2] - Q[i][2]) * (P[j][2] - Q[i][2]);
        if (d1 <= d2) { q3(P[i], P[j], Q[j]); q3(P[i], Q[j], Q[i]); }
        else { q3(P[i], P[j], Q[i]); q3(P[j], Q[j], Q[i]); }
      }
    }
    return tris(out);
  }
  /* aerofoil section: leading edge, crest 15% back, after-body at 75%,
     sharp trailing edge; thickness t along the unit normal nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.06, t * 0.36), p(0.18, t / 2), p(0.45, t * 0.48), p(0.75, t * 0.32), p(1, 0),
            p(0.75, -t * 0.32), p(0.45, -t * 0.48), p(0.18, -t / 2), p(0.06, -t * 0.36)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft. A section is a superellipse with separate upper and
     lower half-heights and exponents (1 is round, lower is boxier). rake
     shifts each ring point along x by rake * (z - zc). Sections run nose to
     tail (decreasing x); the quads (a, c, b) then face outward. */
  function sec(x, yc, zc, w, hu, hl, eu, el, rake) {
    return { x: x, yc: yc, zc: zc, w: w, hu: hu, hl: hl, eu: eu || 1, el: el || eu || 1, rake: rake || 0 };
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, e, z;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      e = sn >= 0 ? s.eu : s.el;
      z = s.zc + (sn >= 0 ? s.hu : s.hl) * sgn(sn) * Math.pow(Math.abs(sn), e);
      o.push([s.x + s.rake * (z - s.zc), s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), e), z]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(r[j][0], r[j][1], r[j][2]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    if (noseDx !== null && noseDx !== undefined) out.push(capOf(secs[0], n, noseDx, true));
    if (tailDx !== null && tailDx !== undefined) out.push(capOf(secs[secs.length - 1], n, -tailDx, false));
    return out;
  }
  /* a cone (or flat disc, dx 0) closing a ring, facing forward or aft */
  function capOf(s, n, dx, front) {
    var rr = ringOf(s, n), t = [], cx = 0, cy = 0, cz = 0, j;
    for (j = 0; j < n; j++) { cx += rr[j][0]; cy += rr[j][1]; cz += rr[j][2]; }
    var o = [cx / n + dx, cy / n, cz / n];
    for (j = 0; j < n; j++) {
      var p0 = rr[j], p1 = rr[(j + 1) % n];
      if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
    }
    return tris(t);
  }
  /* a round body of revolution along x from [xFraction, radiusFraction], nose first */
  function revolve(prof, len, r, x, y, z, n) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(sec(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], r * prof[i][1], 1, 1));
    return loft(secs, n, 0, 0);
  }

  /* a pylon: a slim blade from the wing (zTop) down to zBot */
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.11) / 2, d = (x0 - x1) * 0.12;
    list.push(sloft([
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]]
    ]));
  }
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a);
      var A = [x, y, z], B = [x - chordR, y, z];
      var Cc = [x - sweep - chordT, y + cy * span, z + cz * span], D = [x - sweep, y + cy * span, z + cz * span];
      var nY = -cz * th, nZ = cy * th;
      list.push(sloft([[[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                       [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]]));
    }
  }
  var P_R27 = [[0.50, 0.03], [0.45, 0.42], [0.38, 0.85], [0.30, 1.0], [-0.46, 1.0], [-0.50, 0.92]];
  var P_R73 = [[0.50, 0.05], [0.42, 0.50], [0.32, 0.90], [0.22, 1.0], [-0.44, 1.0], [-0.50, 0.85]];
  function store(K, kind, x, y, zTop) {
    var len, r, zc;
    if (kind === "r27") {              /* R-27ER: 4.78 m, 0.26 m motor, butterfly controls, tail wings */
      len = 4.78; r = 0.13; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R27, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.22, y, zc, 0.55, 0.12, 0.30, 0.30, PI / 4, 0.006);
      fins(K.pale, x - len * 0.36, y, zc, 0.60, 0.30, 0.25, 0.30, PI / 4, 0.006);
    } else {                           /* R-73: 2.9 m, 0.17 m, canards and tail fins */
      len = 2.9; r = 0.085; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R73, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.30, y, zc, 0.18, 0.08, 0.06, 0.19, PI / 4, 0.006);
      fins(K.pale, x - len * 0.38, y, zc, 0.30, 0.16, 0.10, 0.27, PI / 4, 0.006);
    }
  }

  /* the AL-31F3 nozzle (D, E, H): the bare afterburner can, a shroud ring,
     a short petal cone with dark seams, a pale lining and a dark bore */
  function nozzle(K, y, h) {
    var s0 = 19.15, s1 = 19.40, s2 = 20.25;
    push(K.nozzle, loft([sec(X(18.55), y, h - 0.06, 0.612, 0.612, 0.612), sec(X(s0), y, h, 0.585, 0.585, 0.585)], 20, null, null));
    push(K.metal, loft([sec(X(s0), y, h, 0.575, 0.575, 0.575), sec(X(s1), y, h, 0.565, 0.565, 0.565)], 20, null, null));
    push(K.nozzle, loft([sec(X(s1), y, h, 0.565, 0.565, 0.565), sec(X(s1 + 0.02), y, h, 0.545, 0.545, 0.545), sec(X(s2), y, h, 0.485, 0.485, 0.485)], 20, null, null));
    push(K.pale, loft([sec(X(s2), y, h, 0.475, 0.475, 0.475), sec(X(s2 - 0.50), y, h, 0.41, 0.41, 0.41)], 20, null, null));
    K.dark.push(capOf(sec(X(s2 - 0.50), y, h, 0.41, 0.41, 0.41), 20, 0, false));
    for (var i = 0; i < 14; i++) {
      var a = (i + 0.5) * 2 * PI / 14;
      K.dark.push(bar([X(s1 + 0.04), y + Math.cos(a) * 0.548, h + Math.sin(a) * 0.548],
                      [X(s2 - 0.02), y + Math.cos(a) * 0.488, h + Math.sin(a) * 0.488], 0.010, 3));
    }
  }

  /* a "wingfold" group: the geometry, UV-painted where it lies spread, is
     moved into a frame whose origin is the hinge (x0, y0, z0); render3d.js
     turns it about +X through angle on a ship's deck */
  function foldGroup(root, list, mat, name, y0, z0, angle) {
    var geo = projUV(merge(list));
    geo.translate(0, -y0, -z0);
    var fg = new V.Group();
    fg.name = "wingfold";
    fg.position.set(0, y0, z0);
    fg.userData.fold = { axis: [1, 0, 0], angle: angle };
    var fm = new V.Mesh(geo, mat);
    fm.name = name;
    fg.add(fm);
    root.add(fg);
    return fg;
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "su33";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [] };
    var G = { metal: [], tyre: [] };
    var FW = { "-1": [], "1": [] }, FT = { "-1": [], "1": [] };
    var s, i, y, r;

    /* ---- radome and body (one skin: the radome is painted white), the
       short sting, the nose pitot (A, B, F) */
    var bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      bs.push(sec(X(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, r[4], r[5]));
    }
    push(K.skin, loft(bs, 40, 0, null));
    var st = [];
    for (i = 0; i < STING.length; i++) {
      r = STING[i];
      st.push(sec(X(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, i ? 1 : 0.95, i ? 1 : 0.9));
    }
    push(K.skin, loft(st, 32, null, 0));
    K.metal.push(cyl(0.022, 0.045, 0.75, 8, "x", X(-0.375), 0, 0.55));
    /* the tailhook, stowed along the sting's underside (ru.wikipedia, D, E) */
    K.metal.push(bar([X(19.0), 0, 0.36], [X(20.75), 0, 0.40], 0.05, 6));
    K.dark.push(box(0.26, 0.16, 0.10, X(20.80), 0, 0.40));
    K.dark.push(box(1.9, 0.14, 0.04, X(19.9), 0, 0.39));

    /* ---- canopy on its sill, frames, the aft fairing */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) {
      r = CANOPY[i];
      cs.push(sec(X(r[0]), 0, 1.70, r[1], r[2] - 1.70, 0.12, 1.0, 1.0));
    }
    push(K.glass, loft(cs, 28, 0.04, 0.0));
    push(K.skin, loft([sec(X(7.35), 0, 1.80, 0.43, 0.48, 0.10, 0.9), sec(X(7.9), 0, 1.80, 0.44, 0.38, 0.10, 0.85),
                       sec(X(8.8), 0, 1.80, 0.46, 0.28, 0.10, 0.8), sec(X(9.8), 0, 1.78, 0.47, 0.18, 0.10, 0.8)], 24, null, 0));
    function arch(sv, rad) {
      var rr = ringOf(sv, 28);
      for (var j = 0; j < 14; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 28], rad, 4));
    }
    arch(sec(X(5.0), 0, 1.70, 0.495, 2.40 - 1.70 + 0.012, 0.12), 0.026);   /* windscreen arch */
    arch(sec(X(7.30), 0, 1.70, 0.44, 2.37 - 1.70 + 0.012, 0.12), 0.030);    /* canopy rear frame */
    /* IRST ball ahead of the windscreen, offset to starboard (F, H) */
    K.glass.push(new V.SphereGeometry(0.16, 14, 8).translate(X(3.95), -0.20, 1.80));
    push(K.dark, loft([sec(X(3.70), -0.20, 1.72, 0.08, 0.06, 0.04), sec(X(3.85), -0.20, 1.74, 0.19, 0.08, 0.06),
                       sec(X(4.20), -0.20, 1.74, 0.19, 0.08, 0.06), sec(X(4.30), -0.20, 1.76, 0.10, 0.05, 0.05)], 12, 0, 0));
    /* the retractable refuelling probe, stowed: its long fairing on the
       port side ahead of the windscreen, the probe head at its front */
    push(K.skin, loft([sec(X(3.30), 0.50, 1.50, 0.03, 0.03, 0.03), sec(X(3.55), 0.53, 1.51, 0.10, 0.09, 0.08),
                       sec(X(4.60), 0.58, 1.55, 0.12, 0.10, 0.09), sec(X(5.30), 0.61, 1.57, 0.06, 0.05, 0.05)], 12, 0, 0));
    K.metal.push(cyl(0.05, 0.07, 0.16, 10, "x", X(3.40), 0.515, 1.50));
    /* gun port on the starboard LERX root (GSh-30-1) */
    K.dark.push(box(0.30, 0.10, 0.08, X(7.35), -1.00, 0.97));
    /* blade aerials on the spine and under the nose */
    K.dark.push(box(0.30, 0.02, 0.18, X(10.2), 0, 2.02));
    K.dark.push(box(0.26, 0.02, 0.15, X(5.2), 0, 0.08));

    /* ---- nacelles: raked intake mouth, dark duct face, splitter, nozzle */
    for (s = -1; s <= 1; s += 2) {
      var ns = [];
      for (i = 0; i < NAC.length; i++) {
        r = NAC[i];
        ns.push(sec(X(r[0]), s * r[1], r[2], r[3], r[4], r[5], r[6], r[6], i ? 0 : RAKE));
      }
      push(K.skin, loft(ns, 28, null, null));
      var m0 = NAC[0];
      /* the duct: skin-coloured walls 0.65 m deep (F shows the mouths pale
         inside, not black), a dark face at the back */
      push(K.skin, loft([sec(X(m0[0] + 0.65), s * m0[1], m0[2], m0[3] - 0.02, m0[4] - 0.02, m0[5] - 0.02, m0[6], m0[6], RAKE),
                         sec(X(m0[0]) + 0.005, s * m0[1], m0[2], m0[3] - 0.01, m0[4] - 0.01, m0[5] - 0.01, m0[6], m0[6], RAKE)], 28, null, null));
      K.dark.push(capOf(sec(X(m0[0] + 0.64), s * m0[1], m0[2], m0[3] - 0.03, m0[4] - 0.03, m0[5] - 0.03, m0[6], m0[6], RAKE), 28, 0, true));
      K.skin.push(box(1.8, 0.10, 0.36, X(9.75), s * 0.97, 0.66));
      var lip = ringOf(sec(X(m0[0]) + 0.01, s * m0[1], m0[2], m0[3] + 0.005, m0[4] + 0.005, m0[5] + 0.005, m0[6], m0[6], RAKE), 28);
      for (i = 0; i < 28; i += 2) K.dark.push(bar(lip[i], lip[(i + 2) % 28], 0.018, 3));
      nozzle(K, s * 0.97, 0.42);
    }

    /* ---- tail beams */
    for (s = -1; s <= 1; s += 2) {
      var be = [];
      for (i = 0; i < BEAM.length; i++) { r = BEAM[i]; be.push(sec(X(r[0]), s * r[1], r[2], r[3], r[4], r[4], 0.7, 0.8)); }
      push(K.skin, loft(be, 16, 0.7, 0));
    }

    /* ---- wing: the inner wing and LERX in the static skin, the outer
       panel from the fold joint out in its fold group */
    function wsec(yy, sd) { return foil([X(wLE(yy)), sd * yy, wH(yy)], [X(wTE(yy)), sd * yy, wH(yy)], wT(yy), [0, 0, 1]); }
    for (s = -1; s <= 1; s += 2) {
      var wi = [], wo = [];
      for (i = 0; i < WST_IN.length; i++) wi.push(wsec(WST_IN[i], s));
      for (i = 0; i < WST_OUT.length; i++) wo.push(wsec(WST_OUT[i], s));
      K.skin.push(sloft(wi));
      FW[s].push(sloft(wo));
      /* the wingtip launch rail, empty (D, F): its outer face sets the 14.7 m span */
      var tz = wH(TIPY), ry = TIPY + 0.20;
      FW[s].push(sloft([[[X(14.55), s * ry, tz + 0.02], [X(14.55), s * ry, tz - 0.02], [X(14.55), s * (ry - 0.02), tz]],
                        [[X(15.2), s * (ry + 0.11), tz + 0.08], [X(15.2), s * (ry + 0.11), tz - 0.10], [X(15.2), s * (ry - 0.11), tz - 0.01]],
                        [[X(17.7), s * (ry + 0.11), tz + 0.08], [X(17.7), s * (ry + 0.11), tz - 0.10], [X(17.7), s * (ry - 0.11), tz - 0.01]],
                        [[X(18.0), s * ry, tz + 0.02], [X(18.0), s * ry, tz - 0.06], [X(18.0), s * (ry - 0.03), tz]]]));
      FW[s].push(box(2.6, 0.22, 0.06, X(16.2), s * (TIPY + 0.05), tz));
      /* the team strip: a thin plate on the upper skin of the inner wing */
      var ya = 2.55, yb = 3.10;
      function plate(yy) {
        var le = wLE(yy), te = wTE(yy), zc = wH(yy) + wT(yy) * 0.47 + 0.02;
        return blk([X(le), s * yy, zc], [X(te), s * yy, zc], 0.40, 0.62, 0.02, [0, 0, 1]);
      }
      K.team.push(sloft([plate(ya), plate(yb)]));
      /* the leading-edge flap gap on the inner wing */
      K.dark.push(bar([X(wLE(2.3) + 0.35), s * 2.3, wH(2.3) + wT(2.3) * 0.33], [X(wLE(WFY) + 0.33), s * WFY, wH(WFY) + wT(WFY) * 0.34], 0.012, 3));
    }

    /* ---- canards on the LERX (ru.wikipedia, A, B, E) */
    for (s = -1; s <= 1; s += 2) {
      var tan = Math.tan(53.5 * D2R), cnr = [];
      var CY = [CAN.y0, (CAN.y0 + CAN.y1) / 2, CAN.y1];
      for (i = 0; i < CY.length; i++) {
        var f = (CY[i] - CAN.y0) / (CAN.y1 - CAN.y0), le = CAN.le0 + (CY[i] - CAN.y0) * tan, ch = CAN.c0 + f * (CAN.c1 - CAN.c0);
        cnr.push(foil([X(le), s * CY[i], CAN.h], [X(le + ch), s * CY[i], CAN.h], 0.09 - f * 0.06, [0, 0, 1]));
      }
      K.skin.push(sloft(cnr));
      K.metal.push(cyl(0.07, 0.07, 0.16, 10, "y", X(CAN.le0 + 0.75), s * (CAN.y0 - 0.04), CAN.h));
    }

    /* ---- tailplanes: low, all-moving, on the beams; the outer part folds */
    function tsec(yy, sd) {
      var t = tpAt(yy);
      return foil([X(t[1]), sd * yy, tpH(yy)], [X(t[2]), sd * yy, tpH(yy)], t[3], [0, 0, 1]);
    }
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(sloft([tsec(2.14, s), tsec(2.9, s), tsec(TFY, s)]));
      FT[s].push(sloft([tsec(TFY, s), tsec(4.3, s), tsec(4.95, s)]));
      K.metal.push(cyl(0.09, 0.09, 0.22, 10, "y", X(18.9), s * 2.20, 0.48));
    }

    /* ---- fins on the beams, cropped, with their fillets; ventral fins */
    for (s = -1; s <= 1; s += 2) {
      function finSec(h) {
        var fr = (h - FIN_R) / (4.45 - FIN_R);
        var le = 15.2 + fr * 2.4, te = 18.5 - Math.max(0, h - 4.02) * 1.6, th = 0.19 - fr * 0.11;
        return foil([X(le), s * FIN_Y, h], [X(te), s * FIN_Y, h], th, [0, 1, 0]);
      }
      K.skin.push(sloft([finSec(FIN_R), finSec(2.2), finSec(3.4), finSec(4.02), finSec(FIN_T)]));
      K.dark.push(bar([X(17.4), s * (FIN_Y + 0.05), 1.3], [X(17.9), s * (FIN_Y + 0.035), 3.6], 0.012, 3));
      K.skin.push(sloft([foil([X(14.7), s * FIN_Y, 0.95], [X(15.6), s * FIN_Y, 0.95], 0.16, [0, 1, 0]),
                         foil([X(15.05), s * FIN_Y, 1.30], [X(15.6), s * FIN_Y, 1.30], 0.12, [0, 1, 0])]));
      var vy0 = s * 1.98, ca = 0.17 * s;
      function vSec(h, le, te, th) {
        return foil([X(le), vy0 + ca * (0.30 - h), h], [X(te), vy0 + ca * (0.30 - h), h], th, [0, 1, 0]);
      }
      K.skin.push(sloft([vSec(0.32, 16.1, 17.75, 0.10), vSec(-0.20, 16.6, 17.65, 0.07), vSec(-0.64, 16.95, 17.55, 0.05)]));
    }

    /* ---- stores: R-27ER under each intake, R-73 on each inner-wing pylon */
    for (s = -1; s <= 1; s += 2) {
      var zn = NAC[2][2] - NAC[2][5];
      pylon(K.skin, X(11.6), X(14.6), s * 0.97, zn + 0.06, zn - 0.16, 0.10);
      store(K, "r27", X(13.0), s * 0.97, zn - 0.16);
      var y1 = 3.0, z1 = wH(y1) - wT(y1) * 0.45;
      pylon(K.skin, X(12.6), X(14.9), s * y1, z1 + 0.02, z1 - 0.26, 0.09);
      store(K, "r73", X(13.7), s * y1, z1 - 0.26);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzles");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- the fold groups (G): outer wings up through WFOLD about the
       joint on the upper skin, outer tailplanes up through TFOLD */
    for (s = -1; s <= 1; s += 2) {
      foldGroup(g, FW[s], T.skin, "skin_wingfold", s * WFY, wH(WFY) + wT(WFY) * 0.5, s * WFOLD * D2R);
      var tt = tpAt(TFY);
      foldGroup(g, FT[s], T.skin, "skin_tailfold", s * TFY, tpH(TFY) + tt[3] * 0.5, s * TFOLD * D2R);
    }

    /* ---- landing gear (A, C): it retracts, so the group is "gear"; the
       strengthened twin-wheel nose leg, single-wheel main legs. Stations
       read off A (side-on, parked): the nose wheels 1.2 m behind the canopy
       glazing (s 8.3), the main wheels 1 m ahead of the fin roots (s 14.2);
       5.9 m wheelbase, 4.34 m track (the Flanker figures) */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nxs = X(8.3), nr = 0.31, nz = GROUND + nr;
    G.metal.push(bar([nxs + 0.10, 0, 0.20], [nxs, 0, nz + 0.10], 0.085, 10));
    G.metal.push(cyl(0.11, 0.11, 0.55, 10, "z", nxs + 0.06, 0, -0.35));
    G.metal.push(bar([nxs, -0.18, nz], [nxs, 0.18, nz], 0.045, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.18, 24, "y", nxs, s * 0.19, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.19, 12, "y", nxs, s * 0.19, nz));
    }
    G.metal.push(bar([nxs - 1.1, 0, 0.20], [nxs + 0.02, 0, -0.45], 0.045, 6));           /* drag brace */
    G.metal.push(box(1.7, 0.03, 0.40, nxs - 0.6, 0.28, 0.00));                            /* bay doors */
    G.metal.push(box(1.7, 0.03, 0.40, nxs - 0.6, -0.28, 0.00));
    var mxs = X(14.2), mr = 0.515, mz = GROUND + mr, my = 2.17;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mxs + 0.15, s * 1.62, 0.40], [mxs, s * (my - 0.22), mz + 0.12], 0.095, 10));
      G.metal.push(cyl(0.06, 0.06, 0.30, 8, "y", mxs, s * (my - 0.10), mz));
      G.tyre.push(cyl(mr, mr, 0.35, 28, "y", mxs, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.36, 14, "y", mxs, s * my, mz));
      G.metal.push(bar([mxs - 0.9, s * 1.62, 0.45], [mxs - 0.02, s * (my - 0.22), mz + 0.45], 0.045, 6));
      G.metal.push(box(1.3, 0.03, 0.55, mxs + 0.25, s * 1.60, 0.02));                     /* leg door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: the pitot tip (10.965) to the sting end (-10.965) */
UNIT_MODELS["cfighter_p"] = { len: 21.93, build: HeroSu33.build };
