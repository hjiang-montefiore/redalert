/* ============ ru_yak38.js - HERO models: Yakovlev Yak-38 "Forger" ============
   Registers, one airframe in two period finishes:
     pact_e60_cfighter   Yak-38 (accepted 1976): R-27V-300 + 2 x RD-36-35FV
     pact_e80_cfighter   Yak-38M (in service 1985): R-28V-300 + 2 x RD-38
   ru.wikipedia "Yak-38M": "externally the Yak-38M practically does not differ
   from the previous model" (new engines, reworked intakes, steerable nose
   leg, drop-tank plumbing). The two rows are therefore the same shape; what
   differs is the paint each period's photographs show.

   Model space: +X nose, +Y left (port), +Z up, metres. The tables are in
   DRAWING units: s is metres aft of the nose-cone tip, h metres above the
   flat belly line. X = 7.80 - s, Z = ZB + h.

   SOURCES
     Text: ru.wikipedia "Yak-38" (construction section after the 1983 Yak-38
       training manual; table after the same manual) and "Yak-38M" (table
       after Gordon 2008): a mid-wing ("sredneplan" in the text), leading edge
       45 deg, anhedral 10 deg, incidence 0; outer wing panels fold UP through
       102 deg on the ship; span 7.022 m spread, 4.40 m (manual) / 4.45 m
       (Gordon) folded; length 16.37 m (Gordon; the manual prints 15.98 m);
       height 4.25 m (Gordon) / 4.4 m (manual); wing area 18.41-18.69 m2;
       wheelbase 6.24 m, track 2.75 m; all three legs single-wheeled, the
       nose wheel 600x155 retracting aft, the main wheels 660x200 retracting
       forward into the fuselage; a fixed LOW-set tailplane with elevators;
       a fin of 53 deg leading-edge sweep running forward into a dorsal
       fillet; a dielectric nose cone; the canopy of windscreen, hinged
       hood and fixed rear glazing; the lift-engine bay behind the cockpit
       (frames 10-14); the R-27V-300's swivelling nozzles in the rear
       fuselage (frames 29-33).
       ru.wikipedia "R-60": 2096 mm (R-60M 2138), 120 mm body, 390 mm span.
       ru.wikipedia "UPK-23-250": 3166 x 340 x 394 mm.
     Drawing: Commons "Yakolev Yak-38M.png" (GvG three-view silhouettes,
       public domain). Profile read at 17.29 px/m (283 px pitot tip to tail
       = 16.37 m): body 15.80 m + a 0.57 m nose boom; the fuselage heights
       below. Plan read at 16.9 px/m fore-and-aft; its span is drawn about
       15% too wide for 7.022 m, so plan WIDTHS are read at the 19.5 px/m
       that the front view and the published span agree on.
     Photographs (Commons, 960 px):
       A "Yak-38 Forger wings folded.jpg" (DoD 1985, starboard side on the
         deck): outer panels standing up with the star on their outer face,
         the side intake, the open lift-engine door, the long tail cone.
       B "Underside view of a Soviet Yak-38.JPEG" (DoD 1985, side-on in
         flight): the nose boom, the white intake lip, the swivelling rear
         nozzle under the wing root, the pale fin cap, the tail RCS pipe.
       C "Yak-38 Forger Gear Down.jpg" (DoD 1986): the louvred lift-engine
         door open behind the canopy, the single-wheel gear, the nose vanes.
       D "Yak-38 Lift Engines NT.PNG" (Commons cutaway): the two lift
         engines behind the cockpit under a door hinged at its aft edge, the
         cruise engine's two side nozzles, the wing-tip and tail RCS valves.
       E "RIAN archive 477421 Yak-38P fighter aircraft.jpg" (RIA Novosti,
         colour, Yak-38s on a carrier deck): the 1970s-80s finish - dark blue
         overall, a dark nose cone with a pale tip, a pale fin cap, a bare
         intake lip.
       F "Yakovlev Yak-38 in 1986.JPEG" (DoD, colour, on the Kiev): the same
         dark blue, the folded panel with its star.
       G "Yakovlev Yak-38M at 1992 Farnborough Airshow.jpg" (an in-service
         Russian Navy Yak-38M): dark blue-grey above, PALE GREEN below with a
         wavy line along the fuselage side, a white nose cone, a pale fin
         cap; the closed lift-engine door as a long raised panel.
       H "Yak-38 aircraft in flight.JPEG" (DoD, from above): the planform,
         two pylons a wing, the fold joint across the wing.

   RECOGNITION LIST (each drawn; where it rests)
     1. A deep, slab-sided fuselage, 1.6 m deep over the lift bay and 1.9 m
        wide over the intakes, on a flat belly (drawing profile and front
        view; A, G).
     2. The narrow pointed nose with its dielectric cone and the 0.57 m boom
        (drawing; B, C, E, G).
     3. A small bubble canopy on the narrow nose: windscreen, hinged hood,
        fixed rear glazing (ru.wikipedia; A, E, G).
     4. Big D-shaped side intakes with a bare lip just aft of the canopy
        front (drawing front view; A, B, E, G).
     5. The LIFT-ENGINE BAY behind the cockpit: the long raised dorsal door
        with its louvres, hinged at its aft edge, drawn shut as it flies and
        stands parked in G (D, G; open in A, C, E); the lift-engine exhaust
        louvres under the belly (D).
     6. The cruise engine's two swivelling nozzles low on the fuselage sides
        under the wing trailing edge, drawn pointing aft as in cruise (B, D;
        drawing profile).
     7. A short mid wing: 45 deg leading edge, a straight trailing edge,
        10 deg anhedral, 7.022 m span, the fold joint across it and the
        wing-tip RCS fairings (ru.wikipedia; drawing plan; H, D).
     8. The outer panels fold UP through 102 deg on a ship's deck, through
        the game's "wingfold" convention: 4.47 m over the folded wing as
        measured (Gordon 4.45, the manual 4.40), the panels standing 2 deg
        past upright as A shows them (ru.wikipedia; A, F).
     9. A tall 53 deg fin with a dorsal fillet and a cropped, pale-capped
        top; a low tailplane; the tail cone ending in the RCS pipe
        (ru.wikipedia; drawing profile; A, B).
    10. Single-wheel tricycle gear: the nose leg under the cockpit, the
        main legs out of the fuselage sides at the wing, 2.75 m track,
        6.24 m wheelbase (ru.wikipedia; drawing; C, E, G).
    11. Two pylons under each fixed inner wing (ru.wikipedia: four points;
        H; drawing plan).

   PAINT BY PERIOD (taken to about 0.85 of the photographs' level)
     Yak-38 (1976): dark blue overall, sampled (54,71,101) on E's sunlit
       side -> #2e3c56; no photograph in colour shows the underside, and the
       black-and-white ones (A, B) show it no lighter than the sides, so it
       is drawn the same colour. Dark nose cone with a pale tip, pale fin cap.
     Yak-38M (1985): G, an in-service aircraft of 1992: blue-grey above
       (70,85,100) -> #3c4855, pale green below, sampled only in shade
       (42,50,30), drawn #56663e; white nose cone, pale fin cap. One
       photograph; the exact line of the demarcation is read from it.
   Markings: red stars with a white edge on both faces of the fin and under
   each outer wing panel, so that they show on the outer face of a folded
   panel (A, F). No bort number, ensign, Guards badge, warning triangle or
   text.
   Gear: it RETRACTS (ru.wikipedia), so its group is named "gear".
   Stores: the rows name 2 x R-60 (R-60M) and a GSh-23L pod: an R-60 on
   each outer pylon, one UPK-23-250 on the starboard inner pylon, the port
   inner pylon empty.
   Team colour exactly C.team: two modest strips on the tailplane tops.
   NOT drawn: the open lift-engine door and the nozzles turned down (the
   game has no hover pose for this key); the brake-chute container (its
   place is not confirmed in these photographs).
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYak38 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI, D2R = PI / 180;
  var XN = 7.80;                      /* nose-cone tip; boom to 8.37, tail pipe to -8.00 */
  function X(s) { return XN - s; }
  var ZB = -0.85;                     /* the flat belly line */
  function Z(h) { return ZB + h; }
  var GROUND = ZB - 0.70;             /* fin top h 3.64: 4.34 m standing */

  /* ------------------------------------------------------- the tables -- */
  /* fuselage: [s, half-width, crown h, keel h, upper exp, lower exp] (drawing profile and plan) */
  var BODY = [
    [0.00, 0.02, 0.40, 0.36, 1.0, 1.0],
    [0.15, 0.09, 0.47, 0.29, 1.0, 1.0],
    [0.40, 0.16, 0.54, 0.20, 1.0, 1.0],
    [0.80, 0.23, 0.66, 0.11, 0.95, 0.95],
    [1.30, 0.30, 0.81, 0.05, 0.9, 0.9],
    [1.80, 0.36, 0.95, 0.02, 0.9, 0.85],
    [2.30, 0.41, 1.06, 0.00, 0.85, 0.8],
    [2.90, 0.45, 1.12, 0.00, 0.85, 0.7],
    [3.50, 0.48, 1.20, 0.00, 0.8, 0.6],
    [4.00, 0.74, 1.38, 0.00, 0.7, 0.5],
    [4.50, 0.92, 1.62, 0.00, 0.6, 0.45],
    [5.20, 0.95, 1.68, 0.00, 0.6, 0.45],
    [6.20, 0.95, 1.68, 0.00, 0.6, 0.45],
    [7.20, 0.94, 1.67, 0.00, 0.6, 0.45],
    [8.00, 0.92, 1.64, 0.00, 0.6, 0.45],
    [9.00, 0.88, 1.66, 0.00, 0.6, 0.45],
    [10.0, 0.83, 1.70, 0.02, 0.65, 0.5],
    [11.0, 0.77, 1.76, 0.05, 0.7, 0.55],
    [11.8, 0.71, 1.80, 0.10, 0.7, 0.6],
    [12.5, 0.63, 1.82, 0.20, 0.75, 0.7],
    [13.2, 0.54, 1.72, 0.36, 0.8, 0.75],
    [13.9, 0.45, 1.60, 0.52, 0.85, 0.8],
    [14.6, 0.36, 1.48, 0.68, 0.9, 0.85],
    [15.2, 0.27, 1.36, 0.80, 0.9, 0.9],
    [15.55, 0.17, 1.26, 0.88, 1.0, 1.0]
  ];
  /* canopy (drawing profile; ru.wikipedia: windscreen, hinged hood, fixed rear part): [s, half-width, top h] on a sill at h 1.08 */
  var CANOPY = [[2.05, 0.20, 1.17], [2.40, 0.29, 1.44], [2.80, 0.32, 1.65], [3.30, 0.33, 1.80],
                [3.85, 0.32, 1.80], [4.35, 0.29, 1.75], [4.80, 0.24, 1.70]];
  var SILL = 1.10;
  /* the wing (ru.wikipedia 45 deg LE, -10 deg, 7.022 m; drawing plan: a straight trailing edge at s 10.70) */
  var TE = 10.70, LE0 = 6.31, TIPY = 3.511, YR = 0.70, YS = 0.85, WH0 = 0.80;
  var YH = 2.08;                       /* the fold joint: 4.47 m over the folded wing (wingfold_check) */
  var WFOLD = 102;
  function wLE(y) { return LE0 + y; }
  function wH(y) { return Z(WH0) - Math.max(0, y - YS) * Math.tan(10 * D2R); }
  function wT(y) { return Math.max(0.05, 0.06 * (TE - wLE(y))); }      /* 6 % section (P-53s-6 root) */
  /* tailplane: low, fixed, 50 deg LE, 3.6 m span (drawing plan) */
  var TPY0 = 0.40, TPY1 = 1.80, TPH = 1.02;
  function tLE(y) { return 13.60 + (y - 0.45) * (1.40 / 1.35); }
  function tTE(y) { return 15.55 + (y - 0.45) * 0.10; }
  /* fin: [h, le s, te s, thickness]; 53 deg LE, cropped top sloping aft (drawing profile; A, B) */
  var FIN = [[1.25, 12.00, 15.55, 0.24], [1.95, 12.91, 15.70, 0.20], [2.60, 13.77, 15.72, 0.15],
             [3.12, 14.46, 15.72, 0.10], [3.64, 15.15, 15.24, 0.05]];
  /* main and nose gear (ru.wikipedia: 6.24 m base, 2.75 m track, 660 and 600 mm wheels) */
  var MS = 9.44, MY = 1.375, MR = 0.33, NS = 3.20, NR = 0.30;
  /* stations of the pylons (inboard of the fold) */
  var PY_IN = 1.30, PY_OUT = 1.85;

  /* ------------------------------------------------------------ paint -- */
  var PXM = 32, XMIN = -8.3, TW = 544;
  var YMAX = 3.8, TOPH = 244, ZTOP = 2.95, SIDEH = 128;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;

  var VARS = {
    y38:  { top: "#2e3c56", under: null, nose: "#222b3a", tip: "#aab0b2", noseLen: 0.90, tipLen: 0.16, cap: "#aeb4b6", lip: 0x9a9fa3 },
    y38m: { top: "#3c4855", under: "#56663e", nose: "#a9b1aa", tip: "#a9b1aa", noseLen: 0.70, tipLen: 0.70, cap: "#aeb4b2", lip: 0x9a9fa3 }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxS(s) { return pxX(X(s)); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  /* the Soviet star: red with a white edge */
  function star(g, cx, cy, r, a0) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = a0 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * r * k, y = cy + Math.sin(a) * q * r * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d6d8d4"; path(1.18); g.fill();
    g.fillStyle = "#a8261e"; path(1.0); g.fill();
  }

  /* the 38M's demarcation on the fuselage side (G): the h of the line at s */
  function demH(s) {
    var P = [[0.0, 0.30], [1.5, 0.30], [3.4, 0.42], [5.0, 0.55], [6.6, 0.70], [7.6, 0.78], [10.8, 0.74], [12.2, 0.62], [14.0, 0.86], [15.6, 1.00]];
    for (var i = 0; i < P.length - 1; i++) if (s <= P[i + 1][0]) {
      var f = (s - P[i][0]) / (P[i + 1][0] - P[i][0]);
      return P[i][1] + f * (P[i + 1][1] - P[i][1]) + 0.04 * Math.sin(s * 2.3);
    }
    return 1.0;
  }

  var _cv = {};
  function paint(key) {
    if (_cv[key]) return _cv[key];
    var P = VARS[key];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 3811, i, b, x, y, k, s;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TH);
    var SIDES = [B_PORT, B_STBD, B_IN];
    if (P.under) {
      /* pale green below (G): the whole belly band, the side bands under the wavy line */
      g.fillStyle = P.under; g.fillRect(0, B_BEL, TW, TOPH);
      for (b = 0; b < 3; b++) {
        g.beginPath();
        g.moveTo(pxS(-0.6), SIDES[b] + SIDEH);
        for (s = -0.6; s <= 16.2; s += 0.2) g.lineTo(pxS(s), SIDES[b] + pxZ(Z(demH(s))));
        g.lineTo(pxS(16.2), SIDES[b] + SIDEH); g.closePath(); g.fill();
      }
    }
    /* the fin cap, pale (A, B, E, G): a band along the cropped top */
    for (b = 0; b < 3; b++) {
      g.fillStyle = P.cap;
      g.beginPath();
      g.moveTo(pxS(14.20), SIDES[b] + pxZ(Z(3.30)));
      g.lineTo(pxS(15.15), SIDES[b] + pxZ(Z(3.70)));
      g.lineTo(pxS(15.80), SIDES[b] + pxZ(Z(3.12)));
      g.lineTo(pxS(15.80), SIDES[b] + pxZ(Z(2.86)));
      g.closePath(); g.fill();
    }
    /* the nose cone and its tip, on every band */
    var BANDS = [[B_TOP, TOPH], [B_PORT, SIDEH], [B_STBD, SIDEH], [B_IN, SIDEH], [B_BEL, TOPH]];
    for (b = 0; b < BANDS.length; b++) {
      g.fillStyle = P.nose; g.fillRect(pxS(P.noseLen), BANDS[b][0], TW - pxS(P.noseLen), BANDS[b][1]);
      g.fillStyle = P.tip; g.fillRect(pxS(P.tipLen), BANDS[b][0], TW - pxS(P.tipLen), BANDS[b][1]);
    }
    /* panel lines: frames on every band */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;
    var FR = [P.noseLen, 2.0, 4.6, 7.2, 8.4, 10.7, 12.0, 13.4, 14.6];
    for (i = 0; i < FR.length; i++) { x = pxS(FR[i]); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke(); }
    /* the lift-engine door, shut (G): a long panel, a shade darker, its louvre slots (drawing plan, D) */
    g.fillStyle = "rgba(0,0,0,0.20)";
    g.fillRect(pxS(7.10), pxY(0.33), pxS(4.70) - pxS(7.10), pxY(-0.33) - pxY(0.33));
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 1.2;
    g.strokeRect(pxS(7.10), pxY(0.33), pxS(4.70) - pxS(7.10), pxY(-0.33) - pxY(0.33));
    g.fillStyle = "rgba(0,0,0,0.45)";
    for (i = 0; i < 4; i++) for (k = -1; k <= 1; k += 2) {
      var s0 = 4.95 + i * 0.32;
      g.fillRect(pxS(s0 + 0.24), pxY(k > 0 ? 0.26 : -0.03), pxS(s0) - pxS(s0 + 0.24), pxY(0.03) - pxY(0.26));
    }
    /* the lift engines' exhaust louvres under the belly (D) */
    g.strokeStyle = "rgba(0,0,0,0.5)";
    for (i = 0; i < 9; i++) {
      x = pxS(4.75 + i * 0.16);
      g.beginPath(); g.moveTo(x, B_BEL + pxY(0.36)); g.lineTo(x, B_BEL + pxY(-0.36)); g.stroke();
    }
    g.strokeRect(pxS(6.20), B_BEL + pxY(0.40), pxS(4.65) - pxS(6.20), pxY(-0.40) - pxY(0.40));
    /* the main-gear bays (G) and the nose-gear doors */
    for (k = -1; k <= 1; k += 2) g.strokeRect(pxS(9.9), B_BEL + pxY(k * 0.90), pxS(7.6) - pxS(9.9), 0.3 * PXM * k);
    g.strokeRect(pxS(4.2), B_BEL + pxY(0.22), pxS(2.6) - pxS(4.2), 0.44 * PXM);
    /* wing: the fold joint, the extending flap on the inner wing, the aileron on the outer panel (ru.wikipedia, H) */
    g.strokeStyle = "rgba(0,0,0,0.38)";
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.beginPath(); g.moveTo(pxS(wLE(YH) - 0.03), ob + pxY(k * YH)); g.lineTo(pxS(TE + 0.03), ob + pxY(k * YH)); g.stroke();
        g.beginPath(); g.moveTo(pxS(TE - 0.55), ob + pxY(k * 0.95)); g.lineTo(pxS(TE - 0.55), ob + pxY(k * (YH - 0.04))); g.stroke();
        g.beginPath(); g.moveTo(pxS(TE - 0.42), ob + pxY(k * (YH + 0.06))); g.lineTo(pxS(TE - 0.42), ob + pxY(k * 3.25)); g.stroke();
        g.beginPath(); g.moveTo(pxS(tTE(0.6) - 0.40), ob + pxY(k * 0.6)); g.lineTo(pxS(tTE(1.75) - 0.30), ob + pxY(k * 1.75)); g.stroke();
      }
    }
    /* rudder hinge on the fin sides */
    for (b = 0; b < 3; b++) { g.beginPath(); g.moveTo(pxS(15.0), SIDES[b] + pxZ(Z(1.6))); g.lineTo(pxS(15.05), SIDES[b] + pxZ(Z(3.0))); g.stroke(); }
    /* the canopy sill line and the intake cowl seam on the sides */
    for (b = 0; b < 3; b++) {
      g.beginPath(); g.moveTo(pxS(1.9), SIDES[b] + pxZ(Z(1.0))); g.lineTo(pxS(8.0), SIDES[b] + pxZ(Z(1.3))); g.stroke();
    }
    /* rivet rows and a little salt weathering */
    g.fillStyle = "rgba(0,0,0,0.10)";
    for (i = 0; i < 80; i++) {
      x = R() * TW * 0.92; y = R() * TH; k = 6 + ((R() * 18) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(200,205,210," + (0.03 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 6 + R() * 30, 2 + R() * 5);
    }
    /* stars: both faces of the fin (A, B, E, G); under each outer panel, which is its
       outer face when folded (A, F) */
    star(g, pxS(14.55), B_PORT + pxZ(Z(2.30)), 0.34 * PXM, -PI / 2);     /* a point up */
    star(g, pxS(14.55), B_STBD + pxZ(Z(2.30)), 0.34 * PXM, -PI / 2);
    star(g, pxS(9.95), B_BEL + pxY(2.80), 0.30 * PXM, 0);                 /* a point forward */
    star(g, pxS(9.95), B_BEL + pxY(-2.80), 0.30 * PXM, 0);
    _cv[key] = cv;
    return cv;
  }

  var _tex = {};
  function skinTexture(key) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(key));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[key] = t;
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
        else { U = pxX(endOn ? x + y * 0.3 : x); W = band + clamp(pxZ(z), 1, SIDEH - 1); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, key) {
    var tex = skinTexture(key), m = {}, P = VARS[key];
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.top);
    m.dark  = new V.MeshStandardMaterial({ color: 0x181b1e, roughness: 0.72, metalness: 0.25 });
    m.metal = new V.MeshStandardMaterial({ color: P.lip, roughness: 0.45, metalness: 0.55 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x5e5850, roughness: 0.45, metalness: 0.60 });
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
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
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
  /* a closed solid through a run of sections with the same number of corners,
     wound from the sections' own Newell normal */
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
  /* aerofoil section along le -> te, thickness t along nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.06, t * 0.36), p(0.18, t / 2), p(0.45, t * 0.48), p(0.75, t * 0.30), p(1, 0),
            p(0.75, -t * 0.30), p(0.45, -t * 0.48), p(0.18, -t / 2), p(0.06, -t * 0.36)];
  }
  /* superellipse sections, lofted nose to tail (decreasing x): faces outward */
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
  function revolve(prof, len, r, x, y, z, n) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(sec(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], r * prof[i][1], 1, 1));
    return loft(secs, n, 0, 0);
  }
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.10) / 2, d = (x0 - x1) * 0.12;
    list.push(sloft([
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]]
    ]));
  }
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
  /* "wingfold" group: the geometry, UV-painted where it lies spread, is moved
     into a frame whose origin is the hinge; render3d turns it about +X */
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

  var P_R60 = [[0.50, 0.04], [0.44, 0.55], [0.36, 0.95], [0.30, 1.0], [-0.48, 1.0], [-0.50, 0.85]];
  var P_UPK = [[0.50, 0.10], [0.44, 0.62], [0.34, 0.92], [0.20, 1.0], [-0.30, 1.0], [-0.44, 0.80], [-0.50, 0.35]];

  function buildAirframe(THREE, C, key) {
    V = THREE;
    var T = makeMats(C, key);
    var g = new V.Group();
    g.name = "yak38";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [] };
    var G = { metal: [], tyre: [] };
    var FW = { "-1": [], "1": [] };
    var s, i, y, r;

    /* ---- fuselage (one skin: the nose cone is painted), the nose boom */
    var bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      bs.push(sec(X(r[0]), 0, Z((r[2] + r[3]) / 2), r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, r[4], r[5]));
    }
    push(K.skin, loft(bs, 36, 0, 0));
    K.metal.push(cyl(0.016, 0.032, 0.57, 8, "x", X(-0.285), 0, Z(0.38)));
    /* the nose vanes (C) */
    for (s = -1; s <= 1; s += 2) K.dark.push(box(0.10, 0.10, 0.012, X(0.75), s * 0.24, Z(0.40), s * 0.5, 0, 0));
    /* the tail RCS pipe (B, D, drawing profile) */
    K.metal.push(cyl(0.065, 0.075, 0.45, 10, "x", X(15.575), 0, Z(1.02)));
    K.dark.push(cyl(0.05, 0.05, 0.02, 10, "x", X(15.785), 0, Z(1.02)));
    K.metal.push(cyl(0.05, 0.05, 0.20, 8, "z", X(15.70), 0, Z(1.02)));

    /* ---- canopy on its sill, windscreen arch and hood frame (ru.wikipedia, A, G) */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) { r = CANOPY[i]; cs.push(sec(X(r[0]), 0, Z(SILL), r[1], r[2] - SILL, 0.10, 1.0, 1.0)); }
    push(K.glass, loft(cs, 24, 0.05, 0.0));
    function arch(sv, rad) {
      var rr = ringOf(sv, 24);
      for (var j = 0; j < 12; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 24], rad, 4));
    }
    arch(sec(X(2.78), 0, Z(SILL), 0.325, 1.645 - SILL + 0.012, 0.10), 0.022);
    arch(sec(X(3.95), 0, Z(SILL), 0.325, 1.80 - SILL + 0.012, 0.10), 0.024);
    K.dark.push(bar([X(2.78), 0, Z(1.66)], [X(2.12), 0, Z(1.21)], 0.018, 4));

    /* ---- the lift-engine bay door, shut (G, D): a long raised panel on the hump, rimmed */
    (function () {
      var hz = Z(1.68), a = 4.70, b = 7.10, w = 0.33;
      K.skin.push(sloft([[[X(a), w, hz - 0.04], [X(a), -w, hz - 0.04], [X(a), -w + 0.03, hz + 0.035], [X(a), w - 0.03, hz + 0.035]],
                         [[X(b), w, hz - 0.06], [X(b), -w, hz - 0.06], [X(b), -w + 0.03, hz + 0.02], [X(b), w - 0.03, hz + 0.02]]]));
      K.dark.push(bar([X(a), w - 0.01, hz + 0.03], [X(b), w - 0.01, hz + 0.015], 0.012, 4));
      K.dark.push(bar([X(a), -w + 0.01, hz + 0.03], [X(b), -w + 0.01, hz + 0.015], 0.012, 4));
      K.dark.push(bar([X(b), w - 0.01, hz + 0.015], [X(b), -w + 0.01, hz + 0.015], 0.014, 4));   /* the hinge at its aft edge */
    })();
    /* small cooling scoops on the spine and the fin root (G); a raked blade aerial (drawing profile) */
    K.skin.push(loft([sec(X(8.9), 0.22, Z(1.63), 0.01, 0.01, 0.01), sec(X(9.05), 0.22, Z(1.66), 0.07, 0.06, 0.02), sec(X(9.5), 0.22, Z(1.65), 0.06, 0.03, 0.02)], 8, 0, 0)[0]);
    K.skin.push(loft([sec(X(11.3), 0, Z(1.78), 0.01, 0.01, 0.01), sec(X(11.45), 0, Z(1.81), 0.07, 0.07, 0.02), sec(X(11.9), 0, Z(1.83), 0.06, 0.03, 0.02)], 8, 0, 0)[0]);
    K.dark.push(sloft([[[X(9.55), 0.012, Z(1.62)], [X(9.80), 0.012, Z(1.63)], [X(10.00), 0.012, Z(2.08)], [X(9.92), 0.012, Z(2.08)]],
                       [[X(9.55), -0.012, Z(1.62)], [X(9.80), -0.012, Z(1.63)], [X(10.00), -0.012, Z(2.08)], [X(9.92), -0.012, Z(2.08)]]]));
    K.dark.push(box(0.24, 0.02, 0.14, X(5.6), 0, Z(-0.05)));

    /* ---- side intakes: D-mouths with a bare lip, the duct dark inside (drawing front view; A, B, E, G) */
    for (s = -1; s <= 1; s += 2) {
      var IN = [[3.55, 0.745, 0.66, 0.25, 0.58, 0.55], [3.95, 0.755, 0.68, 0.25, 0.60, 0.55], [4.50, 0.74, 0.72, 0.24, 0.64, 0.55], [5.30, 0.70, 0.76, 0.21, 0.64, 0.55]];
      var cw = [];
      for (i = 0; i < IN.length; i++) { r = IN[i]; cw.push(sec(X(r[0]), s * r[1], Z(r[2]), r[3], r[4], r[4], r[5], r[5])); }
      push(K.skin, loft(cw, 24, null, 0));
      var m0 = IN[0];
      push(K.skin, loft([sec(X(m0[0]) + 0.004, s * m0[1], Z(m0[2]), m0[3] - 0.03, m0[4] - 0.03, m0[4] - 0.03, m0[5], m0[5]),
                         sec(X(m0[0] + 0.45), s * m0[1], Z(m0[2]), m0[3] - 0.04, m0[4] - 0.04, m0[4] - 0.04, m0[5], m0[5])], 24, null, null));
      K.dark.push(capOf(sec(X(m0[0] + 0.44), s * m0[1], Z(m0[2]), m0[3] - 0.045, m0[4] - 0.045, m0[4] - 0.045, m0[5], m0[5]), 24, 0, true));
      var lip = ringOf(sec(X(m0[0]) + 0.006, s * m0[1], Z(m0[2]), m0[3] - 0.012, m0[4] - 0.012, m0[4] - 0.012, m0[5], m0[5]), 24);
      for (i = 0; i < 24; i++) K.metal.push(bar(lip[i], lip[(i + 1) % 24], 0.024, 4));
    }

    /* ---- the swivelling nozzles, aft as in cruise (B, D; drawing profile) */
    for (s = -1; s <= 1; s += 2) {
      var ny = s * 0.80, nz = Z(0.34);
      push(K.skin, loft([sec(X(10.55), s * 0.70, nz + 0.02, 0.04, 0.06, 0.04), sec(X(10.85), s * 0.74, nz, 0.20, 0.33, 0.30, 0.8, 0.8),
                         sec(X(11.10), s * 0.76, nz, 0.25, 0.35, 0.33, 0.8, 0.8)], 18, 0, null));
      push(K.nozzle, loft([sec(X(11.05), ny, nz, 0.33, 0.33, 0.33), sec(X(11.30), ny, nz, 0.33, 0.33, 0.33),
                           sec(X(11.55), ny, nz, 0.315, 0.315, 0.315), sec(X(12.30), ny, nz, 0.285, 0.285, 0.285)], 22, null, null));
      push(K.metal, loft([sec(X(12.30), ny, nz, 0.29, 0.29, 0.29), sec(X(12.38), ny, nz, 0.285, 0.285, 0.285)], 22, null, null));
      push(K.dark, loft([sec(X(12.38), ny, nz, 0.27, 0.27, 0.27), sec(X(12.00), ny, nz, 0.25, 0.25, 0.25)], 22, null, 0));
      K.dark.push(bar([X(11.30), ny + s * 0.33, nz], [X(11.30), ny - s * 0.33, nz], 0.012, 3));
    }

    /* ---- wing: the fixed inner wing in the static skin, the outer panel in its fold group */
    function wsec(yy, sd) { return foil([X(wLE(yy)), sd * yy, wH(yy)], [X(TE), sd * yy, wH(yy)], wT(yy), [0, 0, 1]); }
    var WIN = [YR, YS, 1.30, 1.70, YH], WOUT = [YH, 2.60, 3.05, 3.43];
    for (s = -1; s <= 1; s += 2) {
      var wi = [], wo = [];
      for (i = 0; i < WIN.length; i++) wi.push(wsec(WIN[i], s));
      for (i = 0; i < WOUT.length; i++) wo.push(wsec(WOUT[i], s));
      K.skin.push(sloft(wi));
      FW[s].push(sloft(wo));
      /* the wing-tip RCS fairing with its downward valve (D, G) */
      var tz = wH(3.43);
      push(FW[s], loft([sec(X(9.55), s * 3.44, tz, 0.01, 0.01, 0.01), sec(X(9.80), s * 3.44, tz, 0.065, 0.06, 0.06),
                        sec(X(10.55), s * 3.44, tz, 0.07, 0.06, 0.06), sec(X(10.85), s * 3.44, tz, 0.03, 0.03, 0.03)], 10, 0, 0));
      FW[s].push(cyl(0.035, 0.045, 0.10, 8, "z", X(10.25), s * 3.44, tz - 0.08));
      /* pylons: two under the inner wing (ru.wikipedia: four points; H) */
      var yi = PY_IN, yo = PY_OUT;
      pylon(K.skin, X(wLE(yi) + 0.45), X(wLE(yi) + 1.75), s * yi, wH(yi) - wT(yi) * 0.3, wH(yi) - wT(yi) * 0.5 - 0.20, 0.10);
      pylon(K.skin, X(wLE(yo) + 0.35), X(wLE(yo) + 1.55), s * yo, wH(yo) - wT(yo) * 0.3, wH(yo) - wT(yo) * 0.5 - 0.18, 0.09);
      /* R-60 / R-60M on its rail under the outer pylon */
      var zr = wH(yo) - wT(yo) * 0.5 - 0.18;
      K.pale.push(box(1.10, 0.06, 0.07, X(wLE(yo) + 0.95), s * yo, zr - 0.035));
      var zc = zr - 0.07 - 0.06, xm = X(wLE(yo) + 1.0);
      push(K.pale, revolve(P_R60, 2.10, 0.06, xm, s * yo, zc, 10));
      fins(K.pale, xm + 0.78, s * yo, zc, 0.09, 0.05, 0.03, 0.10, PI / 4, 0.005);
      fins(K.pale, xm - 0.72, s * yo, zc, 0.28, 0.14, 0.12, 0.19, PI / 4, 0.005);
      K.dark.push(cyl(0.045, 0.045, 0.03, 8, "x", xm + 1.05, s * yo, zc));
      if (s < 0) {
        /* UPK-23-250 on the starboard inner pylon: 3166 x 340 x 394 mm, the GSh-23L barrels under its nose */
        var zu = wH(yi) - wT(yi) * 0.5 - 0.20 - 0.20, xu = X(wLE(yi) + 1.1);
        push(K.pale, loft([sec(xu + 1.58, s * yi, zu + 0.02, 0.02, 0.02, 0.02), sec(xu + 1.35, s * yi, zu + 0.01, 0.12, 0.14, 0.14),
                           sec(xu + 0.95, s * yi, zu, 0.17, 0.197, 0.197, 0.8, 0.8), sec(xu - 1.10, s * yi, zu, 0.17, 0.197, 0.197, 0.8, 0.8),
                           sec(xu - 1.58, s * yi, zu + 0.03, 0.08, 0.10, 0.10)], 14, 0, 0));
        K.dark.push(cyl(0.025, 0.025, 0.55, 6, "x", xu + 1.62, s * yi, zu - 0.15));
        K.dark.push(cyl(0.025, 0.025, 0.55, 6, "x", xu + 1.62, s * yi + 0.06, zu - 0.15));
      }
      /* the team strip: a thin plate on the tailplane top */
      var ta = 0.85, tb = 1.40;
      function plate(yy) { var zt = Z(TPH) + (0.13 - (yy - 0.4) * 0.055) * 0.5 + 0.004; return [[X(tLE(yy) + 0.30), s * yy, zt], [X(tLE(yy) + 0.70), s * yy, zt], [X(tLE(yy) + 0.70), s * yy, zt + 0.012], [X(tLE(yy) + 0.30), s * yy, zt + 0.012]]; }
      K.team.push(sloft([plate(ta), plate(tb)]));
    }

    /* ---- tailplane: low, fixed (ru.wikipedia), with its elevators painted */
    for (s = -1; s <= 1; s += 2) {
      var tp = [];
      var TY = [TPY0, 0.45, 1.10, TPY1];
      for (i = 0; i < TY.length; i++) {
        var yy = TY[i], th = 0.13 - (yy - 0.4) * 0.055;
        tp.push(foil([X(tLE(yy)), s * yy, Z(TPH)], [X(tTE(yy)), s * yy, Z(TPH)], th, [0, 0, 1]));
      }
      K.skin.push(sloft(tp));
    }

    /* ---- fin with its dorsal fillet (ru.wikipedia: 53 deg; drawing profile) */
    var fs = [];
    for (i = 0; i < FIN.length; i++) { r = FIN[i]; fs.push(foil([X(r[1]), 0, Z(r[0])], [X(r[2]), 0, Z(r[0])], r[3], [0, 1, 0])); }
    K.skin.push(sloft(fs));
    K.skin.push(sloft([foil([X(10.70), 0, Z(1.52)], [X(13.6), 0, Z(1.52)], 0.30, [0, 1, 0]),
                       foil([X(11.90), 0, Z(1.80)], [X(13.6), 0, Z(1.80)], 0.26, [0, 1, 0]),
                       foil([X(12.85), 0, Z(1.96)], [X(13.6), 0, Z(1.96)], 0.21, [0, 1, 0])]));

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzles");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- the fold groups: the outer panels up through 102 deg about the joint on the upper skin */
    for (s = -1; s <= 1; s += 2) foldGroup(g, FW[s], T.skin, "skin_wingfold", s * YH, wH(YH) + wT(YH) * 0.5, s * WFOLD * D2R);

    /* ---- landing gear: it retracts (ru.wikipedia), so the group is "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    /* nose leg, half-lever, single wheel 600x155, under the cockpit (ru.wikipedia; C, G) */
    var nx = X(NS), nzw = GROUND + NR;
    G.metal.push(bar([nx + 0.18, 0, Z(0.05)], [nx + 0.12, 0, nzw + 0.30], 0.055, 8));
    G.metal.push(bar([nx + 0.12, 0, nzw + 0.30], [nx, 0.09, nzw], 0.035, 6));
    G.metal.push(bar([nx + 0.12, 0, nzw + 0.30], [nx, -0.09, nzw], 0.035, 6));
    G.metal.push(bar([nx, -0.10, nzw], [nx, 0.10, nzw], 0.03, 6));
    G.tyre.push(cyl(NR, NR, 0.155, 22, "y", nx, 0, nzw));
    G.metal.push(cyl(NR * 0.55, NR * 0.55, 0.16, 12, "y", nx, 0, nzw));
    G.metal.push(box(1.10, 0.025, 0.36, nx - 0.20, 0.20, Z(-0.15)));
    G.metal.push(box(1.10, 0.025, 0.36, nx - 0.20, -0.20, Z(-0.15)));
    /* main legs out of the fuselage sides at the wing, levered, single 660x200 wheels; 2.75 m track (ru.wikipedia; C, E, G) */
    var mx = X(MS), mzw = GROUND + MR;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.45, s * 0.86, Z(0.20)], [mx + 0.30, s * (MY - 0.16), mzw + 0.32], 0.07, 8));
      G.metal.push(bar([mx + 0.30, s * (MY - 0.16), mzw + 0.32], [mx, s * (MY - 0.12), mzw], 0.045, 6));
      G.metal.push(bar([mx - 0.35, s * 0.86, Z(0.25)], [mx + 0.25, s * (MY - 0.16), mzw + 0.40], 0.035, 6));
      G.metal.push(cyl(0.035, 0.035, 0.16, 8, "y", mx, s * (MY - 0.06), mzw));
      G.tyre.push(cyl(MR, MR, 0.20, 24, "y", mx, s * MY, mzw));
      G.metal.push(cyl(MR * 0.55, MR * 0.55, 0.21, 12, "y", mx, s * MY, mzw));
      G.metal.push(box(1.50, 0.025, 0.40, mx + 0.95, s * 0.90, Z(-0.10)));     /* the bay door, hanging */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    return g;
  }

  return {
    build: function (THREE, M, C, key) { return buildAirframe(THREE, C, key); },
    VARS: VARS
  };
})();

/* len is the measured x extent: the boom tip (8.37) to the tail RCS pipe (-8.00) */
UNIT_MODELS["pact_e60_cfighter"] = { len: 16.37, build: function (THREE, M, C) { return HeroYak38.build(THREE, M, C, "y38"); } };
UNIT_MODELS["pact_e80_cfighter"] = { len: 16.37, build: function (THREE, M, C) { return HeroYak38.build(THREE, M, C, "y38m"); } };
