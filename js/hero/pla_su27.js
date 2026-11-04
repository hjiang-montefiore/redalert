/* ============ pla_su27.js - HERO model: Sukhoi Su-27SK "Flanker-B" ============
   Registers pla_e90_fighter ("Su-27SK", "Sukhoi Su-27SK Flanker (Russian
   purchase)", service 1992). One key, one variant: the single-seat Su-27SK
   as delivered to the PLAAF from 1992, in its blue-grey camouflage, with
   no national markings. No other def registers or is changed by this file.

   Full-quality redo, 2026-10-30. Model space: +X nose, +Y left (port), +Z
   up, metres. The tables are written in DRAWING units: s is metres aft of
   the radome tip, y metres off the centreline, h metres above a datum line
   through the nacelle tops at the intakes. X = 10.97 - s, Y = y, Z = h.
   The forebody, canopy, nacelle, beam and wing tables are the Flanker
   airframe of js/hero/ru_su35.js (read there off drawing A below, which is
   a drawing of the Su-27); everything the Su-27SK does differently is
   re-read here off A, at 1280 px, and the photographs.

   References (Wikimedia Commons, fetched for this file; Wikipedia for the
   figures; cached in scratchpad/q_pla_e90_fighter_ref and _svg):
     A "Sukhoi Su-27 3-view line drawing.svg" (1280 px render) - underside
       plan, head-on and side views of the Su-27. Side view: 722 px radome
       tip to sting tip = the published 21.935 m (32.92 px/m); plan view:
       710 px = 21.935 m (32.37 px/m), its y read at x0.991 so that the
       wingtip rails come to the published 14.698 m. Read off it here:
       - NO nose probe: the radome ends in a plain point;
       - the long tail sting: 1.8 m beyond the nozzle exits, tapering to a
         tail cone from s 20.9 (plan) to a point at s 21.93 (side, plan);
       - the spine airbrake: its side edge along the spine from the canopy
         rear frame (s 7.45) to s 9.75, a box outline in the side view;
       - the fins: leading edge s 15.2 (h 0.8) -> 17.75 (h 4.45), the tip
         cut back and down to the trailing edge at s 18.6, h 4.0; a cap
         line across the fin at h 3.5 and, on it, an antenna rod running
         forward of the leading edge to s 16.2 (the Su-27's fin-tip
         antenna fairings); the rudder hinge s 17.45 h 1.15 -> 18.1 h 3.25;
       - the AL-31F nozzles: s 19.2 -> 20.15, short, plain, with the
         petals drawn as stripes in the plan;
       - the tailplanes: leading edge from s 16.9 at the beam (y 2.0) to the
         tip at y 4.69, s 19.7; tip edge back to y 4.18, s 20.45; 9.4 m;
       - the wing pylons at y 4.27 and 6.05; the empty wingtip rails;
       - head-on: the IRST drawn as a small "T" on the centreline in front
         of the windscreen (see NOT CONFIRMED).
     B "An air-to-air right side view of a Soviet Su-27 Flanker aircraft
       DD-ST-88-09314.jpg" (1280 px) - a Soviet Su-27 from starboard, 1988:
       the dark dielectric fin caps over the top fifth of each fin, cut
       obliquely as A draws them, the antenna rods at their lower edge;
       the long pale sting; missiles under the wings; no canards.
     C "Su-27UBK at Changchun Air Show 20250921.jpg" - a PLAAF Su-27UBK on
       show: the SINGLE nose wheel with its mudguard on a trailing-link leg
       (ru.wikipedia: one KN-27 wheel, 680 x 260 mm), the IRST ball on its
       fairing ahead of the windscreen, the main legs outboard. Its plain
       light grey museum paint and black radome are NOT the delivery scheme
       and are not used.
     D "Chinese Su-27.JPG" - a PLAAF Flanker (a later J-11 with wingtip pods,
       single-tone grey; not used for paint or tips) from below: the sting
       running well aft of the nozzles to its pointed cone.
     E "Defense.gov News Photo 110712-N-TT977-054 ... PLAAF airman after a
       tour of a Sukhoi.jpg" - a PLAAF Flanker parked: the gear doors and
       bays red inside (as ru.wikipedia says of the Su-27), not seen in
       flight; the gear is drawn without them.
     ru.wikipedia "Su-27" (in Cyrillic), table for the Su-27SK: length 21.935 m, span
       14.698 m, height 5.932 m, wing 62.04 m2, 42 deg, wheelbase 5.8 m,
       track 4.34 m; main wheels KT-156D 1030 x 350 mm; the airbrake "behind
       the pilot's cabin", red
       inside; Su-27 paint "standardised: the lower fuselage and wings
       light blue, the upper a camouflage of shades of blue"; radomes and
       antenna covers green dielectric on early aircraft, later white.
       Su-27SK: export Su-27S, from 1991, R-27 and R-73.
     en.wikipedia "Sukhoi Su-27" (Specifications, Su-27SK): 21.9 x 14.7 x
       5.92 m; N001 Myech radar; OLS-27 IRST "in the nose just forward of
       the cockpit"; wingtips "cropped for missile rails".

   Recognition list (what makes it a PLAAF Su-27SK at RTS zoom):
     1. The Flanker planform without canards: ogival LERX into a 42 deg
        wing, EMPTY wingtip launch rails (no ECM pods) giving 14.70 m (A).
     2. Two widely spaced nacelles under the wing, big raked square
        intakes under the LERX (A, C) - as ru_su35.js.
     3. The LONG tail sting with its pointed tail cone, 1.8 m beyond the
        nozzles (A, B, D) - STING.
     4. The large spine AIRBRAKE behind the canopy, closed, s 7.45-9.75
        (A, ru.wikipedia) - drawn as a raised panel with its outline.
     5. Twin fins with the tip cut obliquely and a dark dielectric cap,
        the antenna rods at the cap line (A, B) - FIN, finCap.
     6. Short plain AL-31F nozzles, not the long vectoring cans (A).
     7. The IRST ball ahead of the windscreen (A, C, en.wikipedia).
     8. A single nose wheel (C, ru.wikipedia).
     9. The blue-grey camouflage, light blue-grey below (ru.wikipedia).
   Paint: base pale blue-grey (150,170,182), patches of a darker grey-blue
   (98,121,139) above and on the sides, light blue-grey belly
   (170,186,196), dark grey-green dielectric radome and fin caps (B). The
   PLAAF delivery scheme could not be checked against a photograph of a
   PLAAF Su-27SK (none could be fetched; see NOT CONFIRMED); the two tones
   and the pattern follow ru.wikipedia's description of the standard
   Su-27 scheme and B.
   Markings: NONE drawn (no stars, bort numbers, serials or flags).
   Gear: it RETRACTS, so the group is named "gear". Mains at s 14.0 (as
   ru_su35.js measured them), nose wheel at s 8.2 for the published 5.8 m
   wheelbase; track 4.34 m. Tyres 1.03 m mains, 0.68 m nose.
   Stores (the row's R-27 and R-73; ru.wikipedia): an R-27R on each pylon
   at y 4.27 and an R-73 on each pylon at y 6.05 (A's pylon stations),
   the tip rails left empty so the span is the published one.
   Corrected from the generic model it replaces: 25.2 m long against the
   published 21.94 (now 21.94), its 107 draw calls (now 12), no Flanker
   recognition features.
   NOT CONFIRMED (judgement calls, not measured or published):
     - the paint: tones, the patch pattern and the radome colour are
       not from a photograph of a PLAAF Su-27SK;
     - the IRST's lateral place: A draws it on the centreline, which is
       how it is drawn here; ru_su35.js / ru_su33.js photographs show the
       later Flankers' ball offset to starboard;
     - the airbrake's width (0.86 m, the spine's width there) and its
       panel lines; A gives only its length;
     - the nose wheel station (from the published wheelbase, not seen);
     - the antenna rod's thickness (0.12 m) and the fin cap's depth (h 3.5
       up, from A's cap line);
     - the R-27R/R-73 load: a typical one, not from a PLAAF photograph.
   Team colour exactly C.team: one modest strip on each upper outer wing.
   Materials: skin (canvas texture), radome/caps, dark, metal, nozzle,
   glass, stores, team; gear: metal, tyres, dark. Nodes: "gear".
   ASCII only.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu27 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var XN = 10.97;                      /* radome tip; the sting tip is at s 21.94 */
  function X(s) { return XN - s; }
  var GROUND = -1.48;                  /* fin tip h 4.45: 5.93 m height */

  /* ------------------------------------------------------- the tables -- */
  /* forebody and centre body: [s, half-width, crown h, keel h, upper exp, lower exp] (A side and plan, as ru_su35.js) */
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
  var RADOME_N = 7;                          /* the first 7 rows are the dielectric radome */
  /* the long tail sting (A side and plan): [s, half-width, top h, bottom h].
     Side: top h 1.0 at s 19 falling to 0.62 at the cone joint (s 21.4),
     bottom h 0.27 at s 20.1 rising to 0.42; plan: +-0.33 to s 20.6, the
     cone from s 20.9 (+-0.15) to the point */
  var STING = [[18.8, 0.36, 1.01, 0.44], [19.6, 0.34, 0.97, 0.32], [20.3, 0.32, 0.90, 0.28],
               [20.8, 0.22, 0.82, 0.32], [20.95, 0.15, 0.78, 0.35], [21.4, 0.09, 0.64, 0.43],
               [21.94, 0.01, 0.56, 0.54]];
  var CONE_I = 4;                            /* rows 4.. are the tail cone */
  /* canopy (A side): [s, half-width, top h]; the glazing sits on a sill at h 1.70 */
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
  var WST = [0.70, 0.85, 0.95, 1.15, 1.43, 1.76, 2.04, 2.9, 3.8, 4.7, 5.6, 6.4, 7.04];
  var TIPY = 7.04;
  function wLE(y) {
    for (var i = 0; i < WLE.length - 1; i++) {
      if (y <= WLE[i + 1][0]) { var f = (y - WLE[i][0]) / (WLE[i + 1][0] - WLE[i][0]); return WLE[i][1] + f * (WLE[i + 1][1] - WLE[i][1]); }
    }
    return WLE[WLE.length - 1][1];
  }
  function wTE(y) { return y <= 2.14 ? 16.0 : 16.0 + (y - 2.14) * 0.299; }       /* tip 17.47 */
  function wH(y) { return y <= 2.04 ? 0.95 : 0.95 - (y - 2.04) * 0.035; }        /* 2 deg anhedral */
  function wT(y) { return y <= 2.04 ? 0.30 : 0.30 - (y - 2.04) / (TIPY - 2.04) * 0.21; }
  /* tailplanes (A plan): [y, le s, te s, thickness] */
  var TP = [[2.14, 17.0, 20.22, 0.17], [4.18, 19.25, 20.45, 0.09], [4.69, 19.70, 19.80, 0.04]];
  /* fins (A side): root s 15.2 -> 18.5 at h 0.80; leading-edge tip s 17.75 at
     h 4.45; the tip cut down to the trailing edge at h 4.0; cap from h 3.5 */
  var FIN_Y = 2.12, FIN_R = 0.80, FIN_T = 4.45, FIN_TE = 4.0, FIN_CAP = 3.5;
  /* the spine airbrake (A side): s 7.45 -> 9.75 */
  var AB0 = 7.45, AB1 = 9.75, ABW = 0.43;

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -11.2, TW = 680;
  var YMAX = 8.0, TOPH = 480, ZTOP = 4.7, SIDEH = 190;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var PAL = { pale: "#96aab6", dark: "#62798b", belly: "#aabac4", glare: "#4a565e", cap: "#3a4440" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxS(s) { return pxX(X(s)); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 27192, i, b, x, y, k;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    /* a soft-edged patch: a lumpy closed curve round (cx, cy) (as ru_su33.js) */
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
    /* upper surfaces: broad darker grey-blue patches on the pale ground,
       one pattern mirrored roughly side to side as the standard scheme is */
    g.fillStyle = PAL.dark;
    var TOPB = [[5.6, 0.0, 1.0, 0.55], [9.0, 0.2, 1.3, 0.7], [12.4, -0.2, 1.6, 0.75], [16.2, 0.1, 1.5, 0.6],
                [9.3, 1.8, 1.0, 0.7], [9.6, -1.7, 0.9, 0.6], [11.8, 2.9, 1.4, 1.0], [12.8, -3.2, 1.5, 1.0],
                [14.3, 5.0, 1.4, 0.9], [15.2, -5.4, 1.3, 0.8], [16.6, 3.2, 0.9, 0.7], [16.4, -2.7, 0.8, 0.6],
                [19.4, 3.4, 0.9, 0.8], [19.6, -3.9, 0.8, 0.7], [20.3, 0.0, 0.8, 0.25]];
    for (i = 0; i < TOPB.length; i++) blob(pxS(TOPB[i][0]), pxY(TOPB[i][1]), TOPB[i][2] * PXM, TOPB[i][3] * PXM);
    /* the side bands: patches above the wing line, the belly colour below */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.fillStyle = PAL.dark;
      var SB = [[4.4, 1.55, 1.0, 0.35], [7.6, 1.45, 1.3, 0.40], [11.2, 1.20, 1.7, 0.45], [14.6, 1.00, 1.3, 0.40],
                [19.6, 0.80, 0.9, 0.30]];
      for (i = 0; i < SB.length; i++) blob(pxS(SB[i][0] + b * 0.3), bd + pxZ(SB[i][1]), SB[i][2] * PXM, SB[i][3] * PXM);
      g.fillStyle = PAL.belly;
      g.fillRect(0, bd + pxZ(0.45), TW, SIDEH - pxZ(0.45));
      /* fins: the two tones, a dark patch on the fin's lower half */
      g.save();
      g.beginPath();
      g.moveTo(pxS(15.15), bd + pxZ(0.70)); g.lineTo(pxS(17.80), bd + pxZ(4.55));
      g.lineTo(pxS(18.70), bd + pxZ(4.05)); g.lineTo(pxS(18.65), bd + pxZ(0.70)); g.closePath();
      g.clip();
      g.fillStyle = PAL.pale; g.fillRect(pxS(15.0), bd, pxS(18.8) - pxS(15.0) + 2, SIDEH);
      g.fillStyle = PAL.dark;
      blob(pxS(16.9), bd + pxZ(1.5), 1.0 * PXM, 0.55 * PXM);
      blob(pxS(17.6), bd + pxZ(2.9), 0.6 * PXM, 0.45 * PXM);
      g.restore();
    }
    /* dark anti-glare panel ahead of the windscreen, round the IRST */
    g.fillStyle = PAL.glare;
    g.beginPath();
    g.moveTo(pxS(3.3), pxY(0.30)); g.lineTo(pxS(4.35), pxY(0.55)); g.lineTo(pxS(4.35), pxY(-0.55)); g.lineTo(pxS(3.3), pxY(-0.30));
    g.closePath(); g.fill();
    /* panel lines: frames on every band, the airbrake outline, the flap and flaperon hinges */
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
    var FR = [3.1, 4.3, 5.9, 7.7, 9.0, 10.4, 11.8, 13.2, 14.6, 16.0, 17.3, 18.8, 20.0];
    for (i = 0; i < FR.length; i++) {
      x = pxS(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.beginPath();
        g.moveTo(pxS(15.25), ob + pxY(k * 2.14)); g.lineTo(pxS(16.75), ob + pxY(k * 7.0)); g.stroke();
        g.beginPath();
        g.moveTo(pxS(16.25), ob + pxY(k * 5.5)); g.lineTo(pxS(17.0), ob + pxY(k * 5.5)); g.stroke();
        g.beginPath();
        g.moveTo(pxS(10.95), ob + pxY(k * 2.3)); g.lineTo(pxS(15.0), ob + pxY(k * 6.85)); g.stroke();
      }
      g.beginPath(); g.moveTo(pxS(4.5), ob + pxY(0)); g.lineTo(pxS(19), ob + pxY(0)); g.stroke();
    }
    /* rivet rows and a little weathering */
    g.fillStyle = "rgba(0,0,0,0.10)";
    for (i = 0; i < 90; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 24) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 50; i++) {
      g.fillStyle = "rgba(30,34,38," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 40, 2 + R() * 6);
    }
    /* no stars, numbers or flags */
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x96aab6);
    m.radome = new V.MeshStandardMaterial({ color: 0x3a4440, roughness: 0.70, metalness: 0.06 });   /* B: dark dielectric */
    m.dark  = new V.MeshStandardMaterial({ color: 0x1a1d1f, roughness: 0.70, metalness: 0.25 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6c6f71, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x6e675d, roughness: 0.42, metalness: 0.60 });  /* ru.wikipedia: heat-tinted bare panels */
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
     corners, wound from the sections' own Newell normal */
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
    if (kind === "r27") {              /* R-27R: 4.08 m, 0.23 m body, butterfly controls, tail wings */
      len = 4.08; r = 0.115; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R27, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.20, y, zc, 0.50, 0.12, 0.28, 0.30, PI / 4, 0.006);
      fins(K.pale, x - len * 0.36, y, zc, 0.55, 0.28, 0.22, 0.28, PI / 4, 0.006);
    } else {                           /* R-73: 2.9 m, 0.17 m, canards and tail fins */
      len = 2.9; r = 0.085; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R73, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.30, y, zc, 0.18, 0.08, 0.06, 0.19, PI / 4, 0.006);
      fins(K.pale, x - len * 0.38, y, zc, 0.30, 0.16, 0.10, 0.27, PI / 4, 0.006);
    }
  }

  /* the AL-31F nozzle (A: s 19.2 -> 20.15, short and plain): the bare
     afterburner can, a shroud ring, a short petal cone with dark seams, a
     pale lining and a dark bore */
  function nozzle(K, y, h) {
    var s0 = 19.15, s1 = 19.35, s2 = 20.15;
    push(K.nozzle, loft([sec(X(18.55), y, h - 0.06, 0.612, 0.612, 0.612), sec(X(s0), y, h, 0.585, 0.585, 0.585)], 20, null, null));
    push(K.metal, loft([sec(X(s0), y, h, 0.575, 0.575, 0.575), sec(X(s1), y, h, 0.565, 0.565, 0.565)], 20, null, null));
    push(K.nozzle, loft([sec(X(s1), y, h, 0.565, 0.565, 0.565), sec(X(s1 + 0.02), y, h, 0.545, 0.545, 0.545), sec(X(s2), y, h, 0.49, 0.49, 0.49)], 20, null, null));
    push(K.pale, loft([sec(X(s2), y, h, 0.48, 0.48, 0.48), sec(X(s2 - 0.50), y, h, 0.41, 0.41, 0.41)], 20, null, null));
    K.dark.push(capOf(sec(X(s2 - 0.50), y, h, 0.41, 0.41, 0.41), 20, 0, false));
    for (var i = 0; i < 14; i++) {
      var a = (i + 0.5) * 2 * PI / 14;
      K.dark.push(bar([X(s1 + 0.04), y + Math.cos(a) * 0.548, h + Math.sin(a) * 0.548],
                      [X(s2 - 0.02), y + Math.cos(a) * 0.493, h + Math.sin(a) * 0.493], 0.010, 3));
    }
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "su27sk";
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y, r;

    /* ---- radome (dielectric, no probe: A) and body, then the long sting
       with its tail cone in the dielectric colour */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      var sc = sec(X(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, r[4], r[5]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 40, 0, null));
    push(K.skin, loft(bs, 40, null, null));
    var st = [], cn = [];
    for (i = 0; i < STING.length; i++) {
      r = STING[i];
      var ss = sec(X(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, i ? 1 : 0.95, i ? 1 : 0.9);
      if (i <= CONE_I) st.push(ss);
      if (i >= CONE_I) cn.push(ss);
    }
    push(K.skin, loft(st, 32, null, null));
    push(K.skin, loft(cn, 32, null, 0));
    /* the joint ring of the tail cone (A side: a line across the sting at s 21.4) */
    var jr = ringOf(sec(X(21.4), 0, 0.535, 0.095, 0.115, 0.115), 16);
    for (i = 0; i < 16; i++) K.dark.push(bar(jr[i], jr[(i + 1) % 16], 0.008, 3));

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

    /* ---- the spine airbrake (A side, ru.wikipedia): a big panel lying on
       the spine fairing from the canopy's rear frame to s 9.75, closed, its
       outline a dark seam. Its top follows the fairing crown (h 2.28 at
       s 7.45 falling to 1.96 at s 9.75), the panel 4 cm proud of it */
    function spineTop(sv) {
      var f = (sv - 7.35) / (9.8 - 7.35);
      return 1.80 + 0.48 + f * (0.18 - 0.48);
    }
    var abS = [AB0, (AB0 + AB1) / 2, AB1], abQ = [];
    for (i = 0; i < abS.length; i++) {
      var hz = spineTop(abS[i]) + 0.035, w = ABW * (1 - i * 0.04);
      abQ.push([[X(abS[i]), w, hz - 0.10], [X(abS[i]), 0, hz + 0.02], [X(abS[i]), -w, hz - 0.10], [X(abS[i]), 0, hz - 0.04]]);
    }
    K.skin.push(sloft(abQ));
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([X(AB0), s * ABW, spineTop(AB0) - 0.06], [X(AB1), s * ABW * 0.92, spineTop(AB1) - 0.06], 0.012, 3));
    }
    K.dark.push(bar([X(AB1), ABW * 0.92, spineTop(AB1) - 0.06], [X(AB1), -ABW * 0.92, spineTop(AB1) - 0.06], 0.012, 3));
    K.dark.push(bar([X(AB1 - 0.02), ABW * 0.5, spineTop(AB1) + 0.02], [X(AB1 - 0.02), -ABW * 0.5, spineTop(AB1) + 0.02], 0.012, 3));

    /* ---- the IRST ball ahead of the windscreen (A head-on: on the
       centreline; C, en.wikipedia) on its fairing */
    K.glass.push(new V.SphereGeometry(0.16, 14, 8).translate(X(3.95), 0, 1.80));
    push(K.dark, loft([sec(X(3.30), 0, 1.66, 0.06, 0.04, 0.04), sec(X(3.80), 0, 1.74, 0.19, 0.08, 0.06),
                       sec(X(4.15), 0, 1.74, 0.19, 0.08, 0.06), sec(X(4.30), 0, 1.76, 0.10, 0.05, 0.05)], 12, 0, 0));
    /* gun port on the starboard LERX root (GSh-30-1, ru.wikipedia) */
    K.dark.push(box(0.30, 0.10, 0.08, X(7.35), -1.00, 0.97));
    /* small blade aerials on the spine and under the nose */
    K.dark.push(box(0.30, 0.02, 0.18, X(10.4), 0, 1.98));
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
      push(K.dark, loft([sec(X(m0[0] + 0.15), s * m0[1], m0[2], m0[3] - 0.01, m0[4] - 0.01, m0[5] - 0.01, m0[6], m0[6], RAKE),
                         sec(X(m0[0]) + 0.005, s * m0[1], m0[2], m0[3] - 0.01, m0[4] - 0.01, m0[5] - 0.01, m0[6], m0[6], RAKE)], 28, null, null));
      K.dark.push(capOf(sec(X(m0[0] + 0.14), s * m0[1], m0[2], m0[3] - 0.03, m0[4] - 0.03, m0[5] - 0.03, m0[6], m0[6], RAKE), 28, 0, true));
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

    /* ---- wing and LERX: one loft of aerofoil sections, root to tip */
    for (s = -1; s <= 1; s += 2) {
      var ws = [];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        ws.push(foil([X(wLE(y)), s * y, wH(y)], [X(wTE(y)), s * y, wH(y)], wT(y), [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      var yA = 2.3, yB = 6.85;
      K.dark.push(bar([X(wLE(yA) + 0.35), s * yA, wH(yA) + wT(yA) * 0.33], [X(wLE(yB) + 0.30), s * yB, wH(yB) + wT(yB) * 0.36], 0.012, 3));
      /* the wingtip launch rail, empty (A plan s 14.0 -> 17.4): its outer
         face sets the 14.70 m span (as ru_su33.js) */
      var tz = wH(TIPY), ry = TIPY + 0.20;
      K.skin.push(sloft([[[X(14.0), s * ry, tz + 0.02], [X(14.0), s * ry, tz - 0.02], [X(14.0), s * (ry - 0.02), tz]],
                         [[X(14.6), s * (ry + 0.11), tz + 0.08], [X(14.6), s * (ry + 0.11), tz - 0.10], [X(14.6), s * (ry - 0.11), tz - 0.01]],
                         [[X(17.1), s * (ry + 0.11), tz + 0.08], [X(17.1), s * (ry + 0.11), tz - 0.10], [X(17.1), s * (ry - 0.11), tz - 0.01]],
                         [[X(17.4), s * ry, tz + 0.02], [X(17.4), s * ry, tz - 0.06], [X(17.4), s * (ry - 0.03), tz]]]));
      K.skin.push(box(2.6, 0.22, 0.06, X(15.9), s * (TIPY + 0.05), tz));
      /* the team strip: a thin plate lying ON the upper skin of the outer wing */
      var ya = 5.30, yb = 5.95;
      function plate(yy) {
        var le = wLE(yy), te = wTE(yy), zc = wH(yy) + wT(yy) * 0.47 + 0.02;
        return blk([X(le), s * yy, zc], [X(te), s * yy, zc], 0.30, 0.62, 0.02, [0, 0, 1]);
      }
      K.team.push(sloft([plate(ya), plate(yb)]));
    }

    /* ---- tailplanes: low, all-moving, on the beams (A plan) */
    for (s = -1; s <= 1; s += 2) {
      var tps = [];
      for (i = 0; i < TP.length; i++) {
        var hz2 = 0.48 - (TP[i][0] - 2.14) * 0.02;
        tps.push(foil([X(TP[i][1]), s * TP[i][0], hz2], [X(TP[i][2]), s * TP[i][0], hz2], TP[i][3], [0, 0, 1]));
      }
      K.skin.push(sloft(tps));
      K.metal.push(cyl(0.09, 0.09, 0.22, 10, "y", X(18.9), s * 2.20, 0.48));
    }

    /* ---- fins on the beams: the tip cut down to the trailing edge, the
       dark dielectric cap above h 3.5 and the antenna rod on its lower
       edge running forward of the leading edge (A, B); ventral fins */
    for (s = -1; s <= 1; s += 2) {
      function finLE(h) { return 15.2 + (h - FIN_R) / (FIN_T - FIN_R) * 2.55; }
      function finSec(h) {
        var fr = (h - FIN_R) / (FIN_T - FIN_R);
        var le = finLE(h), te = 18.5 + fr * 0.1, th = 0.19 - fr * 0.11;
        if (h > FIN_TE) te = Math.max(le + 0.08, 18.6 - (h - FIN_TE) / (FIN_T - FIN_TE) * 0.85);
        return foil([X(le), s * FIN_Y, h], [X(te), s * FIN_Y, h], th, [0, 1, 0]);
      }
      K.skin.push(sloft([finSec(FIN_R), finSec(2.2), finSec(FIN_CAP)]));
      K.radome.push(sloft([finSec(FIN_CAP), finSec(FIN_TE), finSec(4.30), finSec(FIN_T)]));
      /* the antenna rod: a slim fairing from s 16.2 back along the cap line */
      var rodS = [16.2, 16.45, finLE(FIN_CAP) + 0.6];
      var rodR = [0.015, 0.06, 0.06];
      var rodSecs = [];
      for (i = 0; i < rodS.length; i++) rodSecs.push(sec(X(rodS[i]), s * FIN_Y, FIN_CAP - 0.02, rodR[i], rodR[i], rodR[i]));
      push(K.radome, loft(rodSecs, 8, 0, 0));
      /* rudder hinge line (A: s 17.45 h 1.15 -> 18.1 h 3.25) and its top */
      K.dark.push(bar([X(17.45), s * (FIN_Y + 0.05), 1.15], [X(18.1), s * (FIN_Y + 0.035), 3.25], 0.012, 3));
      K.dark.push(bar([X(18.1), s * (FIN_Y + 0.035), 3.25], [X(18.6), s * (FIN_Y + 0.03), 3.25], 0.012, 3));
      K.skin.push(sloft([foil([X(14.7), s * FIN_Y, 0.95], [X(15.6), s * FIN_Y, 0.95], 0.16, [0, 1, 0]),
                         foil([X(15.05), s * FIN_Y, 1.30], [X(15.6), s * FIN_Y, 1.30], 0.12, [0, 1, 0])]));
      var vy0 = s * 1.98, ca = 0.17 * s;
      function vSec(h, le, te, th) {
        return foil([X(le), vy0 + ca * (0.30 - h), h], [X(te), vy0 + ca * (0.30 - h), h], th, [0, 1, 0]);
      }
      K.skin.push(sloft([vSec(0.32, 16.1, 17.75, 0.10), vSec(-0.20, 16.6, 17.65, 0.07), vSec(-0.64, 16.95, 17.55, 0.05)]));
    }

    /* ---- stores: R-27R on the y 4.27 pylons, R-73 on the y 6.05 pylons (A) */
    for (s = -1; s <= 1; s += 2) {
      var y1 = 4.27, y2 = 6.05, z1 = wH(y1) - wT(y1) * 0.45, z2 = wH(y2) - wT(y2) * 0.45;
      pylon(K.skin, X(13.1), X(15.7), s * y1, z1 + 0.02, z1 - 0.28, 0.10);
      store(K, "r27", X(14.5), s * y1, z1 - 0.28);
      pylon(K.skin, X(14.5), X(16.5), s * y2, z2 + 0.02, z2 - 0.22, 0.09);
      store(K, "r73", X(15.6), s * y2, z2 - 0.22);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzles");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- landing gear: it retracts, so the group is "gear". The single
       nose wheel (C, ru.wikipedia 680 x 260 mm) on a trailing-link leg with
       its mudguard at s 8.2; the mains (1030 x 350 mm) at s 14.0 outboard
       of the nacelles, 4.34 m track */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nxs = X(8.2), nr = 0.34, nz = GROUND + nr;
    G.metal.push(bar([nxs + 0.10, 0, 0.45], [nxs + 0.10, 0, nz + 0.45], 0.075, 10));       /* strut */
    G.metal.push(bar([nxs + 0.10, 0.10, nz + 0.45], [nxs, 0.10, nz], 0.04, 6));             /* trailing link, both sides */
    G.metal.push(bar([nxs + 0.10, -0.10, nz + 0.45], [nxs, -0.10, nz], 0.04, 6));
    G.metal.push(cyl(0.04, 0.04, 0.26, 6, "y", nxs, 0, nz));
    G.tyre.push(cyl(nr, nr, 0.26, 24, "y", nxs, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.27, 12, "y", nxs, 0, nz));
    G.dark.push(box(0.70, 0.36, 0.03, nxs + 0.03, 0, nz + nr + 0.07));                     /* mudguard (C) */
    G.metal.push(bar([nxs - 1.0, 0, 0.50], [nxs + 0.10, 0, -0.40], 0.035, 6));             /* drag brace */
    G.dark.push(box(1.6, 0.03, 0.40, nxs - 0.6, 0.28, 0.20));                              /* bay doors */
    G.dark.push(box(1.6, 0.03, 0.40, nxs - 0.6, -0.28, 0.20));
    var mxs = X(14.0), mr = 0.515, mz = GROUND + mr, my = 2.17;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mxs + 0.15, s * 1.70, 0.82], [mxs, s * (my - 0.22), mz + 0.12], 0.085, 10));
      G.metal.push(cyl(0.06, 0.06, 0.30, 8, "y", mxs, s * (my - 0.10), mz));
      G.tyre.push(cyl(mr, mr, 0.35, 28, "y", mxs, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.36, 14, "y", mxs, s * my, mz));
      G.metal.push(bar([mxs - 0.9, s * 1.70, 0.80], [mxs - 0.02, s * (my - 0.22), mz + 0.45], 0.04, 6));
      G.dark.push(box(1.3, 0.03, 0.55, mxs + 0.25, s * 1.60, 0.02));                       /* leg door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: radome tip (10.97) to the sting tip (-10.97) */
UNIT_MODELS["pla_e90_fighter"] = { len: 21.94, build: HeroSu27.build };
