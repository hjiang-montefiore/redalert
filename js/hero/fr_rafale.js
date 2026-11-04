/* ============ fr_rafale.js - HERO model: Dassault Rafale C (Armee de l'Air) ============
   Registers two rows with one builder and a VARIANTS table:
     fra_e00_fighter  "Rafale" ("Dassault Rafale C / B, standard F3"),
                      weapon w_e00_fra_fighter "MICA EM / MICA IR": the
                      air-to-air fit, MICA on the wingtip rails and the
                      outer wing pylons.
     fra_e00_cas      "Rafale / AASM" ("Rafale F3 with AASM Hammer"), weapon
                      w_e00_fra_cas: the same airframe with an AT730 triple
                      ejector rack of three AASM under each wing, as
                      photograph P3 shows, and MICA as above.
   Both are the single-seat Rafale C (the row's first name). No existing
   Rafale, Typhoon or Gripen model was found in js/hero/ (grep -i rafale,
   typhoon, gripen: only the Soviet Typhoon SUBMARINE matches; eu_tiger.js
   is a helicopter), so nothing was built on: the kit and conventions are
   those of pla_j10.js (canard delta) with the twin-nozzle rear of a twin.

   Full-quality build, 2026-11-04. Model space: +X nose, +Y left (port), +Z
   up, metres. The tables are in model metres read straight off D:
     side view   X = (480.5 - px) / 60.84,  Z = (234 - py) / 60.84
     plan view   X = (480.5 - px) / 60.84,  Y = (688.7 - py) / 60.84
                 (the plan's top half is STARBOARD, i.e. model -Y)
     head-on     Y = (359 - px) / 60.84,    Z = (1212 - py) / 60.84 - 1.627
   60.84 px/m makes D's overall length (px 16 to 945, nose tip to the
   fin-top fairing) the published 15.27 m; at that scale D's span over the
   wingtip rails is 662 px = 10.88 m (published 10.90 m). Z = 0 is the nose
   axis; x0 = 480.5 px puts the origin at mid-length.

   References (Wikimedia Commons at 960 px, cached in
   scratchpad/q_rafale_ref; Wikipedia for the figures):
     D "Dassault Rafale version.svg" (rendered 960 px wide) - side, plan and
       head-on views of a Rafale B, the same drawing as "Dassault Rafale
       3-view line drawing.svg" (also fetched; smaller views). Every station
       table below is read off D on a 10 px grid: the pointed nose and its
       chines, the cockpit sill, the canopy/spine line, the intake mouths
       (side: px 320-330, Z +0.36 to -0.51; head-on: Y 0.38-1.25), the
       canard planform and its dihedral (head-on, 8 deg), the glove and the
       45 deg cropped delta with its dogtooth and its slightly forward-swept
       trailing edge, the wing's anhedral (head-on, about 5 deg), the fin,
       its dorsal fillet, the long fin-top fairing with its rounded rear
       hump, the twin nozzles (plan: centres Y +/-0.75, base 0.90 m, exit
       0.71 m), the starboard refuelling probe (side, plan and head-on),
       the OSF fairing ahead of the windscreen, the nose sensor stubs, the
       wing pylon stations (plan) and the wingtip rails. Its wheel circles
       on a ground line give the wheels: nose X 2.77, 0.39 m, twin (head-on
       Y +/-0.12); mains X -1.98, 0.77 m, track 3.17 m (head-on).
     P1 "Rafale C (7782446466).jpg" - a Rafale C of the solo display from
       below, port side: the single-seat canopy (shorter than D's two-seat
       one: the glazing ends above the canard roots), the medium grey all
       over (lit underside about 165,162,159), the wingtip rails carrying
       missiles, the canards, the cropped delta.
     P2 "Dassault Rafale C, France - Air Force JP6922708.jpg" - a Rafale C
       parked, STARBOARD side on, canopy raised: the fixed probe on the
       starboard side of the nose, curving up and forward ahead of the
       windscreen; the tall gear, a single main wheel on each leg with a
       forward drag strut, the twin nose wheels on a long leg just ahead of
       the intakes; the paint (sunlit 193,198,212; the radome a touch
       darker, 178,180,186); bare grey nozzles. Its ratio of intake-bottom
       clearance to wheel diameter (1.56) agrees with D's (1.52).
     P3 "Dassault Rafale weaponry DSC04186.JPG" - a Rafale at the 2005 Paris
       show with its stores: an AT730 triple ejector rack holding three AASM
       (two on the shoulders, one below) under the wing, a MICA on the
       outer pylon, a drop tank inboard and a Damocles pod.
     P4 "French Air Force Dassault Rafale c-n 107 (113-HJ) at Kleine Brogel
       Air Base.jpg" (special tiger paint, used for SHAPE only) - the C's
       canopy from the front quarter, the probe, the twin nose wheels and
       the long nose leg.
     P5 "Dassault Rafale (16425191208).jpg" - a Rafale B from below: the
       intake mouths under the chines, the probe on the starboard side.
     en.wikipedia "Dassault Rafale": length 15.27 m, span 10.90 m, height
       5.34 m, wing area 45.7 m2; "the OSF is visible above the nose cone,
       below the windscreen and to the side of the refueling probe"; two
       Snecma M88; 14 hardpoints (Rafale B/C); MICA EM/IR, AASM-Hammer.
     en.wikipedia "Armement Air-Sol Modulaire": length 3.1 m, 340 kg.
     en.wikipedia "MICA (missile)": length 3.1 m, diameter 160 mm.
   As drawn: 15.27 m (nose tip 7.62 to the fin-top fairing -7.65), 10.88 m
   over the wingtip rails, 5.34 m high (see the gear note).

   Recognition list (what makes it a Rafale at RTS zoom; each shows here):
     1. Close-coupled canards high on the chines just behind the cockpit,
        swept, with 8 deg of dihedral (D plan and head-on) - CANARD.
     2. The cropped delta: 45 deg LE from a glove at the canard's trailing
        edge, a dogtooth, a broad tip (1.5 m chord) with the long wingtip
        rail; the TE swept slightly forward; about 5 deg anhedral - WING.
     3. The two intakes semi-recessed under the chines, either side of the
        lower fuselage below the cockpit, dark mouths (D side and head-on,
        P5) - TRUNK.
     4. The long pointed nose with chines flaring back into the intakes'
        roofs, the canopy set high (D, P2).
     5. The fixed refuelling probe on the STARBOARD side of the nose (D
        plan and head-on, P2, P4, P5) and the OSF fairing ahead of the
        windscreen (D, en.wikipedia).
     6. One tall swept fin on a curved dorsal fillet, with the long fin-top
        fairing (D side, P2).
     7. Two M88 nozzles side by side, with a tail fairing between them
        under the fin's trailing edge (D, P2).
     8. Tall gear: twin nose wheels on a long leg, single mains (D, P2).
     9. Medium grey all over, the radome a touch darker (P1, P2).
   Paint: P2's sunlit side (193,198,212) and P1's lit underside
   (165,162,159) taken to about 0.8 of level and between the two: #9ca1a8
   above, #a4a8ae below; radome #8d9196. No roundels, no fin flash, no
   squadron badges, no codes (P1 and P2 carry them: not drawn).
   Team colour exactly C.team: one strip on each upper outer wing.

   Gear: it retracts, so it is the group "gear". The published height is
   5.34 m; D's views put the fin-top hump 5.24 m over D's ground line, so
   the ground is set at Z -1.72 (the published figure) rather than D's
   -1.63: the legs are 0.10 m longer than D's circles imply. P2's ratio
   check agrees with D within its own error and cannot decide it.

   NOT CONFIRMED (estimated, not measured):
     - the single-seat canopy's length: D is a two-seater; the C's glazing
       is ended at X 1.82 (px 370) from P1 in perspective, and the spine
       behind it follows D's two-seat canopy line as an opaque fairing.
     - the cross-section shapes (superellipse exponents), the core body's
       widths under the chine shelf and under the wing (hidden in D's
       plan), the chine heights (D's head-on and side, partly hidden).
     - the intake trunks' run aft of the mouth and where they fair in.
     - the radome's length (to X 5.76, from P2's colour change).
     - the main legs' attachment and splay, the doors: P2 and P4 only.
     - the pylon fore-and-aft positions (from D's plan rectangles), the
       AT730's shape and the AASM's diameter (0.30 m, scaled by eye off P3
       against its 3.1 m length); the MICA's fin sizes.
     - D's height (5.24 m) against the published 5.34 m: see the gear note.
   Not drawn (no reference shows it on this airframe, or the row forbids
   it): roundels, fin flash, codes and badges; the gun port; drop tanks and
   the Damocles pod (P3 shows them, but no figure for their size was found);
   the small bar D draws across the fin at Z 2.76 (not identified); open
   airbrakes (the Rafale has none); the fuselage hardpoints' pylons.

   Materials: SKIN (one painted canvas, projected), RADOME, DARK, METAL,
   NOZZLE, GLASS, PALE (stores), TEAM; the gear group METAL, TYRE, DARK.
   Nodes: "gear". Model space line: +X nose, +Y port, +Z up, metres; the
   tyres touch Z -1.72.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRafale = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var D2R = PI / 180;
  var GROUND = -1.72;                       /* published height 5.34 m below the fin-top hump (3.62) */

  /* the two rows: which stores hang under the wings */
  var VARIANTS = {
    fighter: { name: "rafale_c_aa", aasm: false },   /* MICA on tips and outer pylons */
    cas:     { name: "rafale_c_aasm", aasm: true }   /* plus AT730 + 3 AASM on each middle pylon (P3) */
  };

  /* ------------------------------------------------------- the tables -- */
  /* core body: [X, half-width, crown Z, keel Z, Z of max width, upper exp, lower exp]
     (D side for crown and keel, D plan to px 200 for the half-width; aft of
     that the core is the fuselage UNDER the chine shelf and the wing, its
     width judged from D head-on and the nozzles' spacing). Under the
     canopy the crown is the cockpit sill. */
  var BODY = [
    [7.62, 0.020, 0.02, -0.02, 0.00, 1.0, 1.0],    /* px 17, the tip */
    [7.24, 0.12, 0.15, -0.05, 0.04, 1.0, 1.0],     /* px 40 */
    [6.91, 0.20, 0.26, -0.10, 0.07, 1.0, 1.0],     /* px 60 */
    [6.25, 0.33, 0.49, -0.18, 0.12, 1.0, 1.0],     /* px 100 */
    [5.76, 0.41, 0.575, -0.20, 0.15, 1.0, 1.0],    /* px 130, radome joint (P2) */
    [5.27, 0.48, 0.72, -0.25, 0.18, 0.95, 1.05],   /* px 160, windscreen foot */
    [4.61, 0.55, 0.79, -0.28, 0.24, 0.9, 1.1],     /* px 200 */
    [3.95, 0.60, 0.87, -0.31, 0.28, 0.9, 1.15],    /* px 240 */
    [3.30, 0.62, 0.94, -0.33, 0.30, 0.9, 1.2],     /* px 280 */
    [2.64, 0.64, 0.97, -0.36, 0.30, 0.9, 1.2],     /* px 320, intake mouths */
    [1.98, 0.66, 0.99, -0.40, 0.30, 0.9, 1.2],
    [1.16, 0.70, 1.00, -0.42, 0.30, 0.9, 1.2],
    [0.01, 0.82, 1.00, -0.42, 0.28, 0.85, 1.2],
    [-1.31, 1.00, 1.00, -0.42, 0.26, 0.8, 1.1],
    [-2.62, 1.16, 1.05, -0.46, 0.25, 0.8, 1.0],    /* px 640, trunks faired in */
    [-3.61, 1.20, 1.02, -0.38, 0.25, 0.8, 1.0],
    [-4.59, 1.21, 1.02, -0.33, 0.25, 0.8, 1.0],
    [-5.58, 1.20, 1.02, -0.25, 0.25, 0.8, 1.0],
    [-6.07, 1.18, 1.00, -0.18, 0.26, 0.8, 1.0]     /* px 850, nozzle face */
  ];
  var RADOME_N = 5;                           /* the first five rows are the radome */
  /* the chine shelf: a thin edge from the nose back to the glove at the plan
     outline (D plan px 60-490, port side), at the chine height (D head-on,
     side). [X, half-width, Z] */
  var CHINE = [[6.91, 0.21, 0.07], [6.25, 0.35, 0.12], [5.27, 0.52, 0.20], [4.61, 0.63, 0.30],
               [3.95, 0.84, 0.40], [3.30, 1.07, 0.48], [2.64, 1.24, 0.55], [1.98, 1.31, 0.58],
               [1.16, 1.31, 0.58], [0.67, 1.38, 0.48], [-0.16, 1.45, 0.32], [-0.98, 1.45, 0.26]];
  /* canopy (single seat) on the sill, then the opaque spine fairing aft
     (D side; head-on half-width 0.47-0.49): [X, half-width, sill Z, top Z] */
  var CANOPY = [[5.27, 0.30, 0.72, 0.74], [4.94, 0.38, 0.76, 0.95], [4.61, 0.43, 0.79, 1.13],
                [3.95, 0.47, 0.87, 1.46], [3.30, 0.48, 0.94, 1.58], [2.64, 0.48, 0.97, 1.61],
                [1.98, 0.47, 0.99, 1.56], [1.82, 0.47, 0.99, 1.54]];
  var SPINE = [[1.82, 0.47, 0.99, 1.54], [1.32, 0.46, 0.99, 1.48], [0.67, 0.44, 1.00, 1.35],
               [0.01, 0.40, 1.00, 1.20], [-0.65, 0.34, 1.00, 1.08], [-1.31, 0.24, 1.00, 1.02],
               [-1.96, 0.12, 1.00, 1.00]];
  /* intake trunks (D side and head-on): [X, Y centre, half-width, top Z, bottom Z, exp].
     The mouth is at X 2.60 with its lower lip 0.10 forward of the upper. */
  var TRUNK = [
    [2.60, 0.80, 0.42, 0.36, -0.51, 0.45],
    [2.20, 0.80, 0.43, 0.37, -0.51, 0.45],
    [0.80, 0.80, 0.43, 0.34, -0.50, 0.5],
    [-0.80, 0.82, 0.42, 0.30, -0.49, 0.55],
    [-2.40, 0.86, 0.36, 0.26, -0.44, 0.7]
  ];
  var RAKE = -0.115;                          /* X per metre of Z: lower lip ahead */
  /* wing (D plan): LE from the glove (1.16, 1.31) through (0.99, 1.62) and
     (-0.16, 1.87) at 45 deg to the tip (-3.48, 5.21); TE from the body shelf
     (-6.07 inboard of Y 1.51) then (-5.28, 1.51) to (-5.00, 5.21). Chord
     plane Z 0.12 at Y 2.1, 5 deg anhedral (D head-on). */
  var WTIP = 5.21;
  function wLE(y) {
    if (y <= 1.31) return 1.16;
    if (y <= 1.62) return 1.16 - (y - 1.31) / 0.31 * 0.17;
    if (y <= 1.87) return 0.99 - (y - 1.62) / 0.25 * 1.15;
    return -0.16 - (y - 1.87) / (WTIP - 1.87) * 3.32;
  }
  function wTE(y) { return y < 1.51 ? -6.07 : -5.28 + (y - 1.51) / (WTIP - 1.51) * 0.28; }
  function wZ(y) { return 0.12 - (y - 2.1) * Math.tan(5 * D2R); }
  function wT(y) { return y < 1.87 ? 0.36 : 0.36 - (y - 1.87) / (WTIP - 1.87) * 0.29; }   /* 0.36 root, 0.07 tip */
  /* canards (D plan, side, head-on): root Y 1.25 LE 2.31 TE 1.04 Z 0.60;
     tip Y 2.66 LE 1.24 TE 0.70; 8 deg dihedral */
  var CAN = { y0: 1.25, y1: 2.66, le0: 2.36, te0: 1.04, le1: 1.24, te1: 0.70, z0: 0.60, dih: 8 * D2R };
  /* fin (D side): sections [Z, LE, TE]; the first three are the dorsal fillet */
  var FINS = [[0.98, -1.96, -6.40], [1.13, -2.79, -6.47], [1.38, -3.61, -6.59], [2.20, -4.74, -6.98], [2.99, -5.83, -7.34]];
  /* nozzles (D plan and side): centres Y +/-0.75, Z 0.27; base r 0.45 at
     X -6.07, exit r 0.355 at X -6.57 */
  var NOZ = { y: 0.75, z: 0.27, x0: -6.07, x1: -6.13, x2: -6.57, r0: 0.45, r1: 0.44, r2: 0.355 };

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -7.9, TW = 480;
  var YMAX = 5.6, TOPH = 336, ZTOP = 3.8, SIDEH = 168;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var PAL = { body: "#9ca1a8", belly: "#a4a8ae", fin: "#999ea5", walk: "#90959c" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 31337, i, b, x, y, k;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = PAL.body; g.fillRect(0, 0, TW, B_BEL);
    g.fillStyle = PAL.belly; g.fillRect(0, B_BEL, TW, TOPH);
    /* fin: a hair darker (P2 in the same light reads the same; kept small) */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.fillStyle = PAL.fin;
      g.beginPath();
      g.moveTo(pxX(FINS[2][1]), bd + pxZ(FINS[2][0])); g.lineTo(pxX(FINS[4][1]), bd + pxZ(FINS[4][0]));
      g.lineTo(pxX(FINS[4][2]), bd + pxZ(FINS[4][0])); g.lineTo(pxX(FINS[0][2]), bd + pxZ(FINS[0][0]));
      g.closePath(); g.fill();
      /* rudder hinge (D side: the line from px 820,170 to 895,50) */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(pxX(-5.58), bd + pxZ(1.05)); g.lineTo(pxX(-6.81), bd + pxZ(2.96)); g.stroke();
    }
    /* panel lines: frames D draws on the side view */
    g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1;
    var FR = [5.76, 4.10, 2.64, 1.50, 0.40, -0.98, -2.30, -3.60, -4.43, -5.58];
    for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    /* elevon hinge lines (D plan: X -4.43 from Y 1.5 to the tip, split at
       Y 3.4) and the dogtooth's chord line, top and belly */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(pxX(-4.43), ob + pxY(k * 1.55)); g.lineTo(pxX(-4.43), ob + pxY(k * 5.15)); g.stroke();
        g.beginPath(); g.moveTo(pxX(-4.43), ob + pxY(k * 3.40)); g.lineTo(pxX(-5.15), ob + pxY(k * 3.40)); g.stroke();
        g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1;
        g.beginPath(); g.moveTo(pxX(-0.55), ob + pxY(k * 2.25)); g.lineTo(pxX(-4.40), ob + pxY(k * 2.25)); g.stroke();
        /* slat line behind the LE, from the dogtooth outboard */
        g.beginPath(); g.moveTo(pxX(-0.62), ob + pxY(k * 2.15)); g.lineTo(pxX(-3.55), ob + pxY(k * 5.05)); g.stroke();
      }
      g.beginPath(); g.moveTo(pxX(5.6), ob + pxY(0)); g.lineTo(pxX(-6.0), ob + pxY(0)); g.stroke();
    }
    /* walkway-grey on the spine behind the canopy */
    g.fillStyle = PAL.walk; g.globalAlpha = 0.5;
    g.fillRect(pxX(1.6), pxY(0.30), (1.6 + 1.2) * PXM, 0.6 * PXM);
    g.globalAlpha = 1;
    /* rivet rows and a little weathering */
    g.fillStyle = "rgba(0,0,0,0.09)";
    for (i = 0; i < 80; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 22) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 45; i++) {
      g.fillStyle = "rgba(30,34,40," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 36, 2 + R() * 5);
    }
    /* heat staining ahead of the nozzles */
    var hs = g.createLinearGradient(pxX(-5.2), 0, pxX(-6.1), 0);
    hs.addColorStop(0, "rgba(40,36,32,0)"); hs.addColorStop(1, "rgba(40,36,32,0.28)");
    g.fillStyle = hs; g.fillRect(pxX(-6.1), 0, (6.1 - 5.2) * PXM, TH);
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
     inner (a side face turned toward the centreline), belly (as pla_j10.js) */
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
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x9ca1a8);
    m.radome = new V.MeshStandardMaterial({ color: 0x8d9196, roughness: 0.60, metalness: 0.08 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.75, metalness: 0.20 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6d70, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x5e6061, roughness: 0.45, metalness: 0.60 });   /* P2: bare grey petals */
    m.glass = new V.MeshStandardMaterial({ color: 0x2f3a3a, roughness: 0.10, metalness: 0.40 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xc9cbca, roughness: 0.55, metalness: 0.12 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (the pla_j10.js kit: place, box, cyl, bar, merge, sloft, foil, loft) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
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
  /* aerofoil section: thickness t along the unit normal nrm */
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
  function bodySec(r) {
    return sec(r[0], 0, r[4], r[1], r[2] - r[4], r[4] - r[3], r[5], r[6]);
  }

  /* a pylon: a slim blade from the wing (zTop) down to zBot */
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.10) / 2, d = (x0 - x1) * 0.12;
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
  /* MICA: 3.1 m, 0.16 m (en.wikipedia), long low body strakes and four tail
     fins (P3 on its pylon). AASM: 3.1 m (en.wikipedia), body 0.30 m
     (NOT CONFIRMED), ogive guidance nose with small canards, four large
     cropped tail fins on the range-extension kit (P3). */
  var P_MICA = [[0.50, 0.04], [0.45, 0.50], [0.38, 0.88], [0.30, 1.0], [-0.48, 1.0], [-0.50, 0.85]];
  var P_AASM = [[0.50, 0.05], [0.44, 0.50], [0.36, 0.85], [0.26, 1.0], [-0.36, 1.0], [-0.46, 0.82], [-0.50, 0.55]];
  function mica(K, x, y, zc) {
    var len = 3.1, r = 0.08;
    push(K.pale, revolve(P_MICA, len, r, x, y, zc, 12));
    fins(K.pale, x + 0.55, y, zc, 1.40, 1.10, 0.25, 0.08, PI / 4, 0.005);     /* the long strakes */
    fins(K.pale, x - len * 0.37, y, zc, 0.30, 0.18, 0.12, 0.15, PI / 4, 0.006);
  }
  function aasm(K, x, y, zc) {
    var len = 3.1, r = 0.15;
    push(K.pale, revolve(P_AASM, len, r, x, y, zc, 14));
    fins(K.pale, x + len * 0.32, y, zc, 0.16, 0.08, 0.06, 0.12, PI / 4, 0.006);
    fins(K.pale, x - len * 0.24, y, zc, 0.60, 0.40, 0.18, 0.26, PI / 4, 0.007);
  }

  /* one M88 nozzle (D side and plan; P2): the shroud ring, the petal cone
     to a 0.71 m exit, dark seams, the dark bore */
  function nozzle(K, yc) {
    var z = NOZ.z;
    push(K.metal, loft([sec(NOZ.x0, yc, z, NOZ.r0, NOZ.r0, NOZ.r0), sec(NOZ.x1, yc, z, NOZ.r1, NOZ.r1, NOZ.r1)], 22, null, null));
    push(K.nozzle, loft([sec(NOZ.x1, yc, z, NOZ.r1, NOZ.r1, NOZ.r1), sec(NOZ.x1 - 0.02, yc, z, NOZ.r1 - 0.02, NOZ.r1 - 0.02, NOZ.r1 - 0.02),
                         sec(-6.38, yc, z, 0.40, 0.40, 0.40), sec(NOZ.x2, yc, z, NOZ.r2, NOZ.r2, NOZ.r2)], 22, null, null));
    push(K.dark, loft([sec(NOZ.x2, yc, z, NOZ.r2 - 0.015, NOZ.r2 - 0.015, NOZ.r2 - 0.015), sec(NOZ.x2 + 0.45, yc, z, 0.38, 0.38, 0.38)], 18, null, null));
    K.dark.push(capOf(sec(NOZ.x2 + 0.45, yc, z, 0.38, 0.38, 0.38), 18, 0, false));
    for (var i = 0; i < 12; i++) {
      var a = (i + 0.5) * 2 * PI / 12;
      K.dark.push(bar([NOZ.x1 - 0.04, yc + Math.cos(a) * (NOZ.r1 - 0.012), z + Math.sin(a) * (NOZ.r1 - 0.012)],
                      [NOZ.x2 + 0.03, yc + Math.cos(a) * (NOZ.r2 + 0.004), z + Math.sin(a) * (NOZ.r2 + 0.004)], 0.009, 3));
    }
  }

  function build(THREE, M, C, VAR) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = VAR.name;
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y, r;

    /* ---- radome and core body */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      var sc = bodySec(BODY[i]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 40, 0, null));
    push(K.skin, loft(bs, 40, null, 0));          /* closed behind, between the nozzles */
    /* the nose sensor stubs (D side px 90-105: two pairs, upper and lower sides) */
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([6.35, s * 0.27, 0.22], [6.35, s * 0.34, 0.27], 0.012, 4));
      K.dark.push(bar([6.35, s * 0.25, -0.08], [6.35, s * 0.32, -0.12], 0.012, 4));
    }

    /* ---- chine shelf: a thin lens from the nose back onto the glove */
    for (s = -1; s <= 1; s += 2) {
      var cs0 = [];
      for (i = 0; i < CHINE.length; i++) {
        r = CHINE[i];
        var hh = 0.045 + 0.04 * Math.min(1, (6.9 - r[0]) / 5);
        cs0.push([[r[0], s * 0.05, r[2] + hh * 1.6], [r[0], s * r[1], r[2]], [r[0], s * 0.05, r[2] - hh * 1.6]]);
      }
      K.skin.push(sloft(cs0));
    }

    /* ---- canopy on its sill, its frames; the opaque spine behind */
    function canSec(row) { return sec(row[0], 0, row[2], row[1], row[3] - row[2], 0.10, 1.0, 1.0); }
    var cv = [], sp = [];
    for (i = 0; i < CANOPY.length; i++) cv.push(canSec(CANOPY[i]));
    for (i = 0; i < SPINE.length; i++) sp.push(canSec(SPINE[i]));
    push(K.glass, loft(cv, 28, 0.03, null));
    push(K.skin, loft(sp, 28, null, 0.02));
    function arch(sv, rad) {
      var rr = ringOf(sv, 28);
      for (var j = 0; j < 14; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 28], rad, 4));
    }
    arch(sec(4.20, 0, 0.84, 0.465, 1.36 - 0.84 + 0.012, 0.10), 0.024);   /* windscreen arch, D px 225 */
    arch(sec(1.84, 0, 0.99, 0.475, 1.54 - 0.99 + 0.012, 0.10), 0.028);   /* canopy rear frame */

    /* ---- OSF: the sensor fairing ahead of the windscreen (D px 115-150 on
       the centreline; en.wikipedia), a small glazed head on a grey base */
    push(K.skin, loft([sec(5.98, 0, 0.60, 0.04, 0.03, 0.03), sec(5.80, 0, 0.62, 0.11, 0.08, 0.05),
                       sec(5.50, 0, 0.66, 0.12, 0.09, 0.05), sec(5.30, 0, 0.71, 0.08, 0.05, 0.05)], 12, null, 0.02));
    K.glass.push(place(new V.SphereGeometry(0.075, 10, 6), 5.84, 0, 0.66));

    /* ---- refuelling probe, STARBOARD (-Y): out of the nose side ahead of
       the windscreen, up and out, then forward (D side, plan, head-on; P2) */
    var pb0 = [5.02, -0.42, 0.55], pb1 = [5.12, -0.62, 0.86], pb2 = [5.40, -1.08, 1.24], pb3 = [5.85, -1.10, 1.27];
    K.skin.push(bar(pb0, pb1, 0.065, 8));
    K.skin.push(bar(pb1, pb2, 0.055, 8));
    K.skin.push(bar(pb2, pb3, 0.05, 8));
    K.metal.push(cyl(0.05, 0.065, 0.14, 8, "x", 5.92, -1.10, 1.27));
    K.dark.push(cyl(0.045, 0.045, 0.02, 8, "x", 6.0, -1.10, 1.27));

    /* ---- intake trunks: raked mouth under the chine, dark duct */
    for (s = -1; s <= 1; s += 2) {
      var ts = [];
      for (i = 0; i < TRUNK.length; i++) {
        r = TRUNK[i];
        var zc = (r[3] + r[4]) / 2, th = (r[3] - r[4]) / 2;
        ts.push(sec(r[0], s * r[1], zc, r[2], th, th, r[5], r[5], i ? 0 : RAKE));
      }
      push(K.skin, loft(ts, 28, null, null));
      var m0 = TRUNK[0], mzc = (m0[3] + m0[4]) / 2, mhh = (m0[3] - m0[4]) / 2;
      push(K.dark, loft([sec(m0[0] - 0.45, s * m0[1], mzc, m0[2] - 0.05, mhh - 0.05, mhh - 0.05, m0[5], m0[5], RAKE),
                         sec(m0[0] - 0.002, s * m0[1], mzc, m0[2] - 0.004, mhh - 0.004, mhh - 0.004, m0[5], m0[5], RAKE)], 28, null, null));
      K.dark.push(capOf(sec(m0[0] - 0.44, s * m0[1], mzc, m0[2] - 0.06, mhh - 0.06, mhh - 0.06, m0[5], m0[5], RAKE), 28, 0, true));
      var lip = ringOf(sec(m0[0] + 0.004, s * m0[1], mzc, m0[2] + 0.003, mhh + 0.003, mhh + 0.003, m0[5], m0[5], RAKE), 28);
      for (i = 0; i < 28; i++) K.skin.push(bar(lip[i], lip[(i + 1) % 28], 0.02, 4));
    }

    /* ---- wing: one loft of aerofoil sections, root (inside the core) to tip */
    for (s = -1; s <= 1; s += 2) {
      var ws = [], WST = [0.90, 1.31, 1.50, 1.52, 1.62, 1.87, 3.0, 4.2, WTIP];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        ws.push(foil([wLE(y), s * y, wZ(y)], [wTE(y), s * y, wZ(y)], wT(y), [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      /* the team strip: a thin plate lying ON the upper skin of the outer wing */
      function plate(yy) {
        var le = wLE(yy), te = wTE(yy), zz = wZ(yy) + wT(yy) * 0.47 + 0.02;
        return blk([le, s * yy, zz], [te, s * yy, zz], 0.30, 0.68, 0.02, [0, 0, 1]);
      }
      K.team.push(sloft([plate(3.85), plate(4.40)]));
      /* the wingtip launch rail (D plan px 640-810, Y 5.21-5.43) */
      var tz = wZ(WTIP);
      K.metal.push(sloft([[[ -2.55, s * 5.20, tz + 0.05], [-5.42, s * 5.20, tz + 0.05], [-5.42, s * 5.20, tz - 0.07], [-2.70, s * 5.20, tz - 0.07]],
                          [[ -2.55, s * 5.30, tz + 0.05], [-5.42, s * 5.30, tz + 0.05], [-5.42, s * 5.30, tz - 0.07], [-2.70, s * 5.30, tz - 0.07]]]));
      mica(K, -3.85, s * 5.36, tz - 0.06);
    }

    /* ---- canards: all-moving, on the chines, 8 deg dihedral */
    for (s = -1; s <= 1; s += 2) {
      var cn = [], CS = [0, 0.35, 0.7, 1];
      for (i = 0; i < CS.length; i++) {
        var f = CS[i], cy = CAN.y0 + (CAN.y1 - CAN.y0) * f;
        var cz = CAN.z0 + (cy - CAN.y0) * Math.tan(CAN.dih);
        var le = CAN.le0 + (CAN.le1 - CAN.le0) * f, te = CAN.te0 + (CAN.te1 - CAN.te0) * f;
        cn.push(foil([le, s * cy, cz], [te, s * cy, cz], 0.09 - 0.05 * f, [0, -s * Math.sin(CAN.dih), Math.cos(CAN.dih)]));
      }
      K.skin.push(sloft(cn));
    }

    /* ---- fin with its dorsal fillet, the fin-top fairing and its hump */
    function finSec(row, th) { return foil([row[1], 0, row[0]], [row[2], 0, row[0]], th, [0, 1, 0]); }
    K.skin.push(sloft([finSec(FINS[0], 0.34), finSec(FINS[1], 0.30), finSec(FINS[2], 0.24),
                       finSec(FINS[3], 0.16), finSec(FINS[4], 0.10)]));
    /* fairing: X -5.78..-7.67, Z 2.99..3.27, 0.23 wide (D side and head-on) */
    push(K.skin, loft([sec(-5.72, 0, 3.13, 0.03, 0.04, 0.04, 0.6, 0.6), sec(-5.85, 0, 3.13, 0.11, 0.14, 0.14, 0.5, 0.5),
                       sec(-7.55, 0, 3.13, 0.115, 0.14, 0.14, 0.5, 0.5), sec(-7.65, 0, 3.13, 0.10, 0.12, 0.12, 0.5, 0.5)], 16, null, 0));
    /* the rounded hump on its rear half, to Z 3.62 at X -6.90 (D px 865-940) */
    push(K.skin, loft([sec(-6.32, 0, 3.25, 0.06, 0.01, 0.02), sec(-6.55, 0, 3.25, 0.075, 0.25, 0.02),
                       sec(-6.90, 0, 3.25, 0.08, 0.37, 0.02), sec(-7.25, 0, 3.25, 0.075, 0.27, 0.02),
                       sec(-7.55, 0, 3.25, 0.06, 0.02, 0.02)], 14, null, null));
    /* tail fairing between the nozzles under the fin TE (D side px 850-895,
       Z 0.72-1.02) */
    push(K.skin, loft([sec(-5.90, 0, 0.80, 0.20, 0.20, 0.12), sec(-6.40, 0, 0.84, 0.17, 0.17, 0.10),
                       sec(-6.81, 0, 0.90, 0.09, 0.10, 0.06)], 14, null, 0.04));

    nozzle(K, NOZ.y);
    nozzle(K, -NOZ.y);

    /* ---- pylons (D plan: inner Y 2.10, middle 2.85, outer 4.25) and stores */
    var PY = [[2.10, -1.25, -3.55], [2.85, -1.55, -3.95], [4.25, -2.85, -4.30]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < PY.length; i++) {
        var py = PY[i][0], zb = wZ(py) - wT(py) * 0.40;
        pylon(K.skin, PY[i][1], PY[i][2], s * py, zb + 0.02, zb - 0.28, 0.10);
        if (i === 2) mica(K, (PY[i][1] + PY[i][2]) / 2 + 0.25, s * py, zb - 0.28 - 0.10);
        if (i === 1 && VAR.aasm) {
          /* the AT730 triple ejector rack (P3): a beam under the pylon with
             two AASM on its shoulders and one below */
          var bx = (PY[i][1] + PY[i][2]) / 2, rz = zb - 0.28;
          K.metal.push(box(2.10, 0.16, 0.14, bx, s * py, rz - 0.07));
          K.metal.push(box(1.60, 0.42, 0.04, bx, s * py, rz - 0.16));
          aasm(K, bx + 0.20, s * py + 0.20, rz - 0.30);
          aasm(K, bx + 0.20, s * py - 0.20, rz - 0.30);
          aasm(K, bx + 0.30, s * py, rz - 0.50);
        }
      }
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzle");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- landing gear (D's wheel circles and head-on, P2, P4): it
       retracts, so "gear". Twin nose wheels on a long leg just ahead of the
       intakes; single main wheels on tall legs with forward drag struts. */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 2.77, nr = 0.195, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.12, 0, -0.32], [nx, 0, nz + 0.10], 0.06, 10));
    G.metal.push(bar([nx + 0.75, 0, -0.30], [nx + 0.06, 0, nz + 0.70], 0.03, 6));       /* drag brace */
    G.metal.push(cyl(0.035, 0.035, 0.36, 8, "y", nx, 0, nz));                          /* axle */
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.12, 20, "y", nx, s * 0.125, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.13, 12, "y", nx, s * 0.125, nz));
      G.dark.push(box(0.90, 0.025, 0.18, nx + 0.20, s * 0.24, -0.44));              /* bay doors */
    }
    var mx = -1.98, mr = 0.385, mz = GROUND + mr, my = 1.585;
    for (s = -1; s <= 1; s += 2) {
      var top = [mx + 0.05, s * 1.40, wZ(1.40) - 0.12];
      G.metal.push(bar(top, [mx, s * 1.42, mz + 0.05], 0.08, 10));
      G.metal.push(bar([mx + 0.95, s * 1.20, -0.30], [mx + 0.02, s * 1.42, mz + 0.62], 0.04, 6));   /* drag strut, forward (P2) */
      G.metal.push(cyl(0.05, 0.05, 0.20, 8, "y", mx, s * 1.48, mz));
      G.tyre.push(cyl(mr, mr, 0.25, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.26, 14, "y", mx, s * my, mz));
      G.dark.push(place(new V.BoxGeometry(1.30, 0.025, 0.55), mx + 0.10, s * 1.30, -0.48, s * 0.30, 0, 0));   /* leg door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  return {
    fighter: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.fighter); },
    cas: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.cas); }
  };
})();

/* len is the measured X extent: nose tip (7.62) to the end of the fin-top
   fairing (-7.65), the published 15.27 m. */
UNIT_MODELS["fra_e00_fighter"] = { len: 15.27, build: HeroRafale.fighter };
UNIT_MODELS["fra_e00_cas"] = { len: 15.27, build: HeroRafale.cas };
