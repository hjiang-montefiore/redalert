/* ============ us_f104.js - HERO model: Lockheed F-104G Starfighter ==========
   Two rows, one builder (VARIANTS at the foot):
     deu_e60_fighter  "F-104G Starfighter"  Luftwaffe, Norm 62 grey/green    1961
     roc_e60_fighter  "F-104G Starfighter"  ROCAF, overall silver             1960
   Neither row had a model of its own before this file (grep -i
   "104\|starfighter" js/hero: nothing; deu_e60_fighter had no UNIT_MODELS
   entry and was drawn as a same-role peer, roc_e60_fighter by the
   air3d_era silhouette from its air_specs row). No other F-104 row exists
   in js/eras.js or js/rules.js (the roc_e80_fighter text mentions
   F-104Gs, but that row is the F-5E). Nothing here is built on the old
   models.

   References (Wikimedia Commons / Wikipedia, fetched for this file):
     A "Lockheed F-104B Starfighter 3-view line drawing.png" (NASA,
       dimensioned in inches; 1600 px render). The F-104B airframe with the
       enlarged fin, rudder and ventral fin that the F-104G took over (G).
       Its scan is not square: fuselage stations (FS) fit px = 1.848 * FS
       - 4.6 along the side view, the 161.92 in height gives 1.921 px/in
       up it, the 143.00 in tailplane span 1.881 px/in across the plan, so
       each axis is read at its own scale. The side view is measured at
       72.76 px/m from the nose tip (px 171) with heights x 0.962; the plan
       at 72.76 px/m along and its half-breadths x 0.9725, the factor at
       which A's wing tips (y 3.27 m raw) give the published 6.36 m span.
       A's nose tip to rudder trailing edge (FS 90 to FS 746.03, 656.03 in)
       is the published 16.66 m; drawn it runs 16.75 m, so x is scaled by
       0.9946 at the end (XS). Read off A: the whole side profile behind the
       cockpit, the spine, the fin with its dorsal fillet, the rudder, the
       fin-top fairing and the stabilator on it, the jet pipe end and the
       fin-root overhang above it, the ventral fin, the wing and tailplane
       planforms, the tip tanks (centres 263.23 in apart, the front view),
       the 10 deg anhedral (front view, dimensioned), the main gear track
       105.44 in (front view) and the wheel places and sizes (side view).
     B "Lockheed F-104C Starfighter.svg" (1600 px render): the single-seat
       forward fuselage, A being a two-seater. Read at 71.4 px/m from its
       nose tip (px 88), heights less 0.135 m to sit on A's datum: the
       nose and radome profile and breadths, the single-seat windscreen and
       canopy (frames at x 5.15 and 4.0, rear edge 3.5), the half-cone
       intakes (lip x 1.53, cone tip 1.97, semicircle radius 0.37), the
       oval on the port side under the cockpit, and the ventral fin (which
       agrees with A's place). B's own span is 5% wider than A's and is
       not used.
     C "Lockheed F-104G Starfighter Luftwaffe 22+49 RSide SATM" (museum,
       suspended): the Luftwaffe camouflage on a G, dark grey and green on
       the upper surfaces and sides, the light grey radome, the tip tanks.
     D "F-104G MFG2 Ramstein 1984.jpg" (Marineflieger, port side, in
       service): the tall narrow main gear and the single nose wheel, the
       fin, the stabilator on top, the tip tanks with their fins standing
       up behind the wing, the overall proportions. Its overall grey is the
       later Marine scheme and is not used.
     E "Luftwaffe Lockheed F-104 20+37 Volandia 2024 (01).jpg" (port
       side, on its wheels, early silver): the gear stance, clean wing tips,
       the plain pointed radome without a nose boom, the jet pipe.
     F "F-104G Starfighter ZELL.jpg" (gate guard, port side, outdoors):
       the Norm 62 grey/green splinter camouflage over the upper surfaces,
       sides, tip tanks and fin; the light underside; the half-cone intake;
       the jet pipe under the fin-root overhang. Sampled: green #556448 to
       #728160, grey #6a7579 to #86979f (weathered), radome #a6b0ba.
     H "F-104 Starfighter Republic of China Air Force 342-C-KE-40094.jpg"
       (ROCAF F-104G taking off, 1969): overall silver, the polished bare-
       metal rear fuselage from about the fin leading edge back, the tip
       tank's upright tail fin, the jet pipe. The ROC variant's paint.
     G en.wikipedia "Lockheed F-104 Starfighter": F-104G length 54 ft 8 in
       (16.66 m), span 21 ft 9 in, height 13 ft 6 in (4.11 m); biconvex
       3.36% wing, 10 deg anhedral; stabilator atop the fin; side intakes
       with fixed inlet cones; the F-104G "the larger vertical fin ... as
       used on the two-seat versions", "larger tires"; the F-104B "enlarged
       rudder and ventral fin"; AIM-9 on the tip stations "which could also
       be used for fuel tanks"; the downward-firing C-1 seat of the early
       aircraft. Published figures used: length 16.66 m, span 6.36 m
       without the tip tanks, height 4.09 m.

   Recognition list (each in the model, with the reference it rests on):
     1. the long slim fuselage and the sharp conical radome, light grey,
        the joint at x 6.25 (A, B; C, E, F for its colour)
     2. small single-seat canopy: windscreen, the frames, the dorsal spine
        running from the canopy back into the fin (A, B, E)
     3. half-cone side intakes, the cone standing out of each lip, the duct
        fairings running back along the fuselage into the wing root (A, B,
        F; G)
     4. tiny thin straight-tapered wing, LE 30 deg, set at mid-fuselage with
        10 deg anhedral; leading- and trailing-edge flaps and the aileron
        drawn as lines (A; G)
     5. tip tanks on the wing tips, with their tail fins (A, C, D, F, H)
     6. T-tail: the tall swept fin with its long dorsal fillet, the rudder,
        the fin-top fairing and the all-moving tailplane on top (A, D, H; G)
     7. ventral fin under the rear fuselage (A, B; G)
     8. the jet pipe ending under the fin-root overhang (A, F, H)
     9. tall, narrow gear: single nose wheel, two main legs splayed out to
        a 2.68 m track (A front view, D, E)
    10. paint: Luftwaffe Norm 62 grey and green splinter over the upper
        surfaces and sides, light silver-grey underneath (C, F); ROC
        overall silver with a bare-metal rear fuselage (H). No crosses,
        roundels, codes, serials or unit badges.
   Team colour exactly C.team, on two small strips on the upper outer wings.

   NOT CONFIRMED (estimated from proportions or from photographs, not
   measured or published):
     - the camouflage pattern itself: the colours are sampled off F and C,
       the splinter shapes are drawn to look like them, not copied from a
       pattern drawing; where the upper colours stop on the sides (z -0.40)
       is judged off F.
     - the fuselage half-breadths behind the wing (A's plan, x 0.9725) and
       the jet pipe's radius (0.36), which A's plan hides under the
       tailplane; the cross-section shapes between the views.
     - the fin, rudder, tailplane and fairing thicknesses; the wing at the
       published 3.36% (G) with a 0.03 m floor at the tip.
     - the tip tanks' fins: A's plan shows a pair sticking out sideways, H
       one standing up; drawn as a cross of four, not confirmed.
     - the gear legs and braces between the wheels and the fuselage (A's
       front view shows the main legs' slant, its side view two struts);
       the wheel sizes are A's (the F-104B's): the G's larger tyres (G) are
       not measured. The gear doors, torque links and brake lines (detail
       pass) are drawn to photographs D and E, not measured.
     - detail pass: the blade aerials, beacons, position lights, static
       dischargers, nozzle flaps, speed-brake panels and the painted seams,
       fastener rows and streaks are placed from photographs C-F and H,
       not measured.
     - the standing height: A's drawn wheels stand 4.09 m below the fin-top
       fairing after its heights are taken at 0.962, matching the
       published figure; the ground is set from the published 4.09 m.
     - the port-side oval under the cockpit (A, B) is painted dark as the
       gun-port fairing; the gun muzzle itself is not drawn.
   Not drawn: underwing tanks and pylons (C, D, F show them; the row is a
   fighter), the AIM-9 tip alternative (no reference photograph of it was
   fetched), the arrestor hook, the airbrakes, aerials, the boundary-layer
   ducting, the zero-length launch rocket of F.

   Materials: skin (painted canvas, projected top / port / starboard /
   belly), radome, dark, metal (jet pipe), glass, team, and in "gear":
   metal and tyres.
   Nodes: "gear" (the landing gear; hidden in flight).
   Model space: +X nose, +Y port, +Z up, metres. z = 0 is A's datum line
   (px row 1062 of its side view) through the wing root; the tyres at
   z -1.31 so the fin-top fairing at 2.78 stands the published 4.09 m.
   x = 0 is midway between the nose tip (8.33) and the rudder trailing
   edge (-8.33) after the XS scale.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF104 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -1.31;                 /* 4.09 m under the fin top (G) */
  var FIN_TOP = 2.78;                 /* A */
  var XS = 0.9946, XOFF = 0.045;      /* A's 16.75 m drawn to the published 16.66 m */

  /* ---- canvas layout for the projected skin (drawing coordinates) */
  var PXM = 40, XMIN = -8.7, TW = 704;
  var PYM = 40, YMAX = 3.8;
  var TOPH = 304, SIDEH = 176, TH = TOPH + 2 * SIDEH + TOPH;
  var ZTOP = 2.95, ZSPAN = 4.4;

  /* paints. deu: Norm 62 off F (sunlit, weathered) and C (indoors),
     taken a little darker and richer for the renderer's ACES lift; the
     underside light silver-grey (F). roc: silver (H), the bare-metal rear
     section darker and bluer (H). */
  var VARIANTS = {
    deu: { name: "deu", base: "#6b7980", camo: "#566840", belly: "#a2a8aa", demarc: -0.40,
           rear: null, radome: 0x9ea8ae },
    roc: { name: "roc", base: "#a9adae", camo: null, belly: "#b0b4b5", demarc: -9,
           rear: "#878b8e", radome: 0xb8bcbc }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PYM; }

  /* ------------------------------------------------------------ planform --
     Wing (A plan, half-breadths x 0.9725): leading edge from (-0.55, 1.13)
     at the intake fairing out to the tip corner (-1.70, 3.18), 29.4 deg;
     trailing edge from (-3.63, 0.96) at the root to (-3.18, 3.18), swept
     slightly forward. 10 deg anhedral from the root at z 0.067 (A side,
     front view; G). Thickness 3.36% (G). */
  var WTIP = 3.18;
  function wLE(y) { return -0.55 - 0.5625 * (y - 1.128); }
  function wTE(y) { return -3.63 + 0.202 * (y - 0.963); }
  function wZ(y)  { return 0.067 - 0.1763 * (y - 0.55); }
  function wT(y)  { return Math.max(0.03, (wLE(y) - wTE(y)) * 0.0336); }

  /* stabilator (A plan): root LE -6.55, TE -8.39; tip at y 1.80 (A's
     71.50 in half-span x 0.9725 gives 1.80 against 1.816 dimensioned), LE
     -7.23, TE -7.96; at z 2.48 on the fin top (A side) */
  var TZ = 2.48, TTIP = 1.80;
  function tLE(y) { return -6.55 - (y / TTIP) * 0.68; }
  function tTE(y) { return -8.39 + (y / TTIP) * 0.43; }

  /* fin (A side, heights x 0.962): leading edge out of the spine and up the
     dorsal fillet; the trailing edge is the rudder hinge, and below the
     rudder the fin root runs back over the jet pipe */
  var FLE = [[0.70, -3.20], [0.885, -3.60], [0.92, -4.00], [1.24, -4.50], [1.46, -5.00],
             [1.78, -5.50], [2.13, -6.00], [2.48, -6.40], [2.62, -6.55]];
  var FTE = [[0.70, -7.50], [0.96, -7.78], [2.40, -7.62], [2.62, -7.66]];
  function interp(t, z) {
    if (z <= t[0][0]) return t[0][1];
    for (var i = 0; i < t.length - 1; i++)
      if (z <= t[i + 1][0]) return t[i][1] + (t[i + 1][1] - t[i][1]) * (z - t[i][0]) / (t[i + 1][0] - t[i][0]);
    return t[t.length - 1][1];
  }
  function finLE(z) { return interp(FLE, z); }
  function finTE(z) { return interp(FTE, z); }
  function finT(z)  { return 0.14 - (z - 0.70) / (FIN_TOP - 0.70) * 0.08; }

  /* ---- station tables, nose to tail.
     Radome and forward fuselage off B (z - 0.135), breadths off B's plan;
     behind the cockpit off A (heights x 0.962, breadths x 0.9725).
       x      top    bottom  half-width  e                                */
  var NOSE = [[8.33, -0.125, -0.145, 0.004, 1.0], [8.10, -0.04, -0.21, 0.07, 1.0],
              [7.50, 0.175, -0.315, 0.165, 1.0], [7.00, 0.275, -0.375, 0.26, 1.0],
              [6.50, 0.365, -0.405, 0.36, 1.0], [6.25, 0.40, -0.425, 0.395, 1.0]];
  var FUS = [[6.25, 0.40, -0.425, 0.395, 1.0], [6.00, 0.435, -0.445, 0.43, 0.98],
             [5.50, 0.50, -0.48, 0.50, 0.96], [5.00, 0.56, -0.515, 0.55, 0.94],
             [4.00, 0.64, -0.565, 0.59, 0.92], [3.00, 0.66, -0.595, 0.59, 0.92],
             [2.00, 0.67, -0.61, 0.59, 0.92], [1.00, 0.67, -0.60, 0.60, 0.92],
             [0.00, 0.67, -0.59, 0.63, 0.92], [-1.00, 0.67, -0.58, 0.68, 0.92],
             [-2.00, 0.67, -0.58, 0.71, 0.92], [-3.00, 0.67, -0.57, 0.72, 0.92],
             [-4.00, 0.67, -0.50, 0.70, 0.92], [-5.00, 0.68, -0.43, 0.66, 0.92],
             [-6.00, 0.70, -0.21, 0.60, 0.94], [-6.70, 0.72, -0.08, 0.53, 0.96],
             [-7.28, 0.74, 0.02, 0.42, 1.0]];
  /* intake duct fairings [x, outer half-breadth, half-height]: lip at 1.53
     (outer 0.97, B plan and A), out to 1.10 under the wing root, merging
     into the body at -3.6; centred on y 0.60, z 0.12 */
  var DUCT = [[1.53, 0.97, 0.37], [1.00, 1.00, 0.36], [0.00, 1.06, 0.34], [-1.00, 1.08, 0.30],
              [-2.00, 1.00, 0.26], [-3.00, 0.86, 0.20], [-3.60, 0.74, 0.12]];
  var IY = 0.60, IZ = 0.12;
  /* canopy glass [x, zc, w, h] (B) and the spine behind it (A, B) */
  var CAN = [[5.98, 0.44, 0.30, 0.02], [5.60, 0.50, 0.34, 0.15], [5.15, 0.52, 0.37, 0.30],
             [4.60, 0.55, 0.38, 0.395], [4.00, 0.57, 0.37, 0.325], [3.50, 0.60, 0.33, 0.265]];
  var SPINE = [[3.52, 0.62, 0.30, 0.245], [3.20, 0.66, 0.22, 0.21], [2.60, 0.70, 0.17, 0.17],
               [0.00, 0.70, 0.16, 0.17], [-2.00, 0.70, 0.15, 0.175], [-3.60, 0.70, 0.13, 0.18],
               [-4.20, 0.70, 0.09, 0.20]];

  var _cv = {};
  function paint(P) {
    if (_cv[P.name]) return _cv[P.name];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 1041, i, b, x, y;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = P.base; g.fillRect(0, 0, TW, TOPH + 2 * SIDEH);
    /* the Norm 62 splinter: straight-edged green patches over the grey
       field, across the top and down the sides (C, F); the shapes are
       drawn, not copied (NOT CONFIRMED) */
    if (P.camo) {
      g.fillStyle = P.camo;
      for (b = 0; b < 3; b++) {
        var y0 = bandY[b], h = bandH[b];
        for (i = 0; i < 16; i++) {
          var cx = (i + 0.2 + R() * 0.6) * TW / 16, cy = y0 + h * (0.15 + R() * 0.7);
          var w = 26 + R() * 36, hh = h * (0.25 + R() * 0.35), sk = (R() - 0.5) * 50;
          g.beginPath();
          g.moveTo(cx - w + sk, cy - hh); g.lineTo(cx + w * 0.6 + sk, cy - hh * 0.8);
          g.lineTo(cx + w - sk * 0.5, cy + hh * 0.7); g.lineTo(cx - w * 0.7 - sk, cy + hh);
          g.closePath(); g.fill();
        }
      }
    }
    /* the light underside, and on the sides below the demarcation */
    g.fillStyle = P.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    for (b = 1; b <= 2; b++) {
      var zy = sideZ(P.demarc, b);
      g.fillRect(0, zy, TW, bandY[b] + SIDEH - zy);
    }
    /* ROC: the bare-metal rear section from the fin leading edge back (H) */
    if (P.rear) {
      g.fillStyle = P.rear;
      for (b = 0; b < 4; b++) {
        var rx = pxX(-4.6);
        if (b === 0 || b === 3) g.fillRect(0, bandY[b] + pxY(0.75), rx, pxY(-0.75) - pxY(0.75));
        else g.fillRect(0, sideZ(0.62, b), rx, sideZ(-0.6, b) - sideZ(0.62, b));
      }
    }
    /* fuselage frames */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [6.25, 5.20, 3.45, 2.40, 1.20, 0.10, -1.30, -2.60, -3.60, -4.60, -5.80, -6.80];
    for (b = 0; b < 4; b++) for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i]);
      g.beginPath(); g.moveTo(x, bandY[b] + (b === 0 || b === 3 ? pxY(0.6) : 0));
      g.lineTo(x, bandY[b] + (b === 0 || b === 3 ? pxY(-0.6) : bandH[b])); g.stroke();
    }
    /* the wing's leading-edge flap hinge, the trailing-edge flap and the
       aileron (A plan), both wings, top and belly */
    g.strokeStyle = "rgba(0,0,0,0.26)";
    for (b = 0; b <= 3; b += 3) for (var sg = -1; sg <= 1; sg += 2) {
      var Yb = function (yy) { return bandY[b] + clamp(pxY(sg * yy), 2, TOPH - 2); };
      g.beginPath(); g.moveTo(pxX(wLE(1.15) - 0.28), Yb(1.15)); g.lineTo(pxX(wLE(3.05) - 0.20), Yb(3.05)); g.stroke();
      g.beginPath(); g.moveTo(pxX(wTE(1.0) + 0.62), Yb(1.0)); g.lineTo(pxX(wTE(1.92) + 0.60), Yb(1.92));
      g.lineTo(pxX(wTE(1.92)), Yb(1.92)); g.stroke();
      g.beginPath(); g.moveTo(pxX(wTE(1.95) + 0.42), Yb(1.95)); g.lineTo(pxX(wTE(3.10) + 0.40), Yb(3.10));
      g.stroke();
    }
    /* the rudder hinge (A) */
    g.strokeStyle = "rgba(0,0,0,0.28)";
    for (b = 1; b <= 2; b++) {
      g.beginPath(); g.moveTo(pxX(finTE(1.0)), sideZ(1.0, b));
      g.lineTo(pxX(finTE(2.36)), sideZ(2.36, b)); g.stroke();
    }
    /* the oval fairing on the port side under the cockpit (A, B), dark */
    g.fillStyle = "rgba(20,22,22,0.70)";
    g.beginPath();
    var ox0 = pxX(5.25), ox1 = pxX(4.40), oy = sideZ(-0.27, 1), oh = 0.05 / ZSPAN * SIDEH;
    g.moveTo(ox0, oy); g.quadraticCurveTo((ox0 + ox1) / 2, oy - oh * 2, ox1, oy);
    g.quadraticCurveTo((ox0 + ox1) / 2, oy + oh * 2, ox0, oy); g.fill();
    /* access panels on the sides */
    g.strokeStyle = "rgba(0,0,0,0.13)";
    for (b = 1; b <= 2; b++) for (i = 0; i < 18; i++) {
      x = pxX(5.6 - i * 0.70 + R() * 0.3); y = sideZ(0.45 - R() * 0.9, b);
      g.strokeRect(x, y, 0.36 * PXM + R() * 8, 0.22 * SIDEH / ZSPAN + R() * 4);
    }
    /* the detail pass: seams with a light lip under them and fastener rows
       along the fuselage frames and the wing spars, the speed-brake and
       gun-bay panel outlines, rain streaks down the sides, oil and grime
       aft of the wing root and under the belly (C, F: a weathered G) */
    function seam(x0, y0, x1, y1) {
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.10)";
      g.beginPath(); g.moveTo(x0 + 1, y0 + 1); g.lineTo(x1 + 1, y1 + 1); g.stroke();
    }
    function rivets(x0, y0, x1, y1, n) {
      g.fillStyle = "rgba(0,0,0,0.20)";
      for (var q = 0; q <= n; q++) g.fillRect(x0 + (x1 - x0) * q / n, y0 + (y1 - y0) * q / n, 1, 1);
    }
    for (b = 1; b <= 2; b++) {
      seam(pxX(6.3), sideZ(0.25, b), pxX(-7.3), sideZ(0.25, b));
      seam(pxX(6.3), sideZ(-0.30, b), pxX(-7.3), sideZ(-0.30, b));
      rivets(pxX(6.2), sideZ(0.30, b), pxX(-7.2), sideZ(0.30, b), 160);
      rivets(pxX(6.2), sideZ(-0.25, b), pxX(-7.2), sideZ(-0.25, b), 160);
      for (i = 0; i < FR.length; i++) rivets(pxX(FR[i]) + 2, sideZ(0.65, b), pxX(FR[i]) + 2, sideZ(-0.55, b), 20);
      g.strokeStyle = "rgba(0,0,0,0.32)";
      g.strokeRect(pxX(-4.55), sideZ(0.24, b), 0.60 * PXM, 0.30 / ZSPAN * SIDEH);          /* speed brake */
      g.strokeRect(pxX(5.4), sideZ(-0.05, b), 1.1 * PXM, 0.25 / ZSPAN * SIDEH);            /* gun / avionics bay */
      g.strokeRect(pxX(2.6), sideZ(0.55, b), 0.9 * PXM, 0.18 / ZSPAN * SIDEH);
      for (i = 0; i < 26; i++) {
        var rx0 = R() * TW, ry0 = sideZ(0.6 - R() * 0.8, b);
        var rg = g.createLinearGradient(0, ry0, 0, ry0 + 18 + R() * 20);
        rg.addColorStop(0, "rgba(30,28,24,0.10)"); rg.addColorStop(1, "rgba(30,28,24,0)");
        g.fillStyle = rg; g.fillRect(rx0, ry0, 1 + R() * 2, 38);
      }
    }
    for (b = 0; b <= 3; b += 3) for (var sg2 = -1; sg2 <= 1; sg2 += 2) {
      var Yq = function (yy) { return bandY[b] + clamp(pxY(sg2 * yy), 2, TOPH - 2); };
      /* front and rear spars, a span-wise access-panel row, root fairing */
      seam(pxX(wLE(1.10) - 0.35), Yq(1.10), pxX(wLE(3.10) - 0.25), Yq(3.10));
      seam(pxX(wTE(1.00) + 0.70), Yq(1.00), pxX(wTE(3.10) + 0.48), Yq(3.10));
      rivets(pxX(wLE(1.10) - 0.40), Yq(1.10), pxX(wLE(3.10) - 0.30), Yq(3.10), 60);
      rivets(pxX(wTE(1.00) + 0.75), Yq(1.00), pxX(wTE(3.10) + 0.53), Yq(3.10), 60);
      for (i = 0; i < 4; i++) {
        var yy = 1.30 + i * 0.42;
        g.strokeStyle = "rgba(0,0,0,0.20)";
        g.strokeRect(pxX((wLE(yy) + wTE(yy)) / 2 + 0.15), Yq(yy) - 4, 0.30 * PXM, 8);
      }
      /* the tip tank's seam and fuel cap */
      seam(pxX(-0.6), Yq(TTY), pxX(-2.6), Yq(TTY));
      g.fillStyle = "rgba(0,0,0,0.30)"; g.fillRect(pxX(-1.1), Yq(TTY) - 2, 4, 4);
    }
    /* spine and belly: the centre seam, the fuel caps, oil streaks and grime
       running back from the wing root and the gear wells */
    seam(pxX(3.4), pxY(0), pxX(-6.8), pxY(0));
    g.fillStyle = "rgba(0,0,0,0.32)"; g.fillRect(pxX(1.6), pxY(0) - 3, 6, 6); g.fillRect(pxX(-0.6), pxY(0) - 3, 6, 6);
    var by = TOPH + 2 * SIDEH;
    seam(pxX(6.0), by + pxY(0), pxX(-6.8), by + pxY(0));
    for (i = 0; i < 18; i++) {
      var ox = pxX(-0.8 - R() * 1.6), oy2 = by + pxY((R() - 0.5) * 1.0);
      var og = g.createLinearGradient(ox, 0, ox - 90 - R() * 80, 0);
      og.addColorStop(0, "rgba(26,22,16,0.22)"); og.addColorStop(1, "rgba(26,22,16,0)");
      g.fillStyle = og; g.fillRect(ox - 170, oy2, 170, 2 + R() * 3);
    }
    g.strokeStyle = "rgba(0,0,0,0.30)";
    g.strokeRect(pxX(3.3), by + pxY(0.15), 1.0 * PXM, 0.30 * PYM);            /* nose well doors */
    g.strokeRect(pxX(-1.0), by + pxY(0.62), 0.9 * PXM, 0.30 * PYM);           /* main wells */
    g.strokeRect(pxX(-1.0), by + pxY(-0.32), 0.9 * PXM, 0.30 * PYM);
    /* soot at the tail and light weathering */
    var sx = pxX(-7.6), gr = g.createLinearGradient(sx, 0, pxX(-6.2), 0);
    gr.addColorStop(0, "rgba(22,18,14,0.40)"); gr.addColorStop(1, "rgba(22,18,14,0)");
    g.fillStyle = gr; g.fillRect(sx, TOPH, pxX(-6.2) - sx, 2 * SIDEH);
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.03 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 40, 2 + R() * 6);
    }
    _cv[P.name] = cv;
    return cv;
  }

  var _tex = {};
  function skinTexture(P) {
    if (_tex[P.name] !== undefined) return _tex[P.name];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(P));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[P.name] = t;
    return t;
  }

  /* each face takes the band its normal looks into: top, port, starboard,
     belly (in drawing coordinates, before XS) */
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
      var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === 0) { U = pxX(x); W = clamp(pxY(y), 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp(pxY(y), 2, TOPH - 2); }
        else {
          U = pxX(endOn ? x + y : x);
          W = TOPH + (band - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 2, SIDEH - 2);
        }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, P) {
    var tex = skinTexture(P), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: P.camo ? 0.74 : 0.45,
                                          metalness: P.camo ? 0.15 : 0.45 });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.base);
    m.radome = new V.MeshStandardMaterial({ color: P.radome, roughness: 0.55, metalness: 0.10 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5c5f61, roughness: 0.42, metalness: 0.70 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x34505a, roughness: 0.10, metalness: 0.30 });
    m.navr  = new V.MeshStandardMaterial({ color: 0xc81e1e, roughness: 0.25, metalness: 0.10,
                                           emissive: new V.Color(0xc81e1e), emissiveIntensity: 0.35 });
    m.navg  = new V.MeshStandardMaterial({ color: 0x1fae4a, roughness: 0.25, metalness: 0.10,
                                           emissive: new V.Color(0x1fae4a), emissiveIntensity: 0.35 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (gb_lightning.js's kit; mesh() applies the XS length scale) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a cylinder along model x, y or z; r0 is the end toward +axis */
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
    geo.scale(XS, 1, 1);
    geo.translate(XOFF, 0, 0);
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
  /* a convex solid from its faces, each wound away from the centre */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0], fc = [0, 0, 0];
      for (j = 0; j < f.length; j++) { fc[0] += f[j][0] / f.length; fc[1] += f[j][1] / f.length; fc[2] += f[j][2] / f.length; }
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (fc[0] - c[0]) * nx + (fc[1] - c[1]) * ny + (fc[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }
  function ls(x, yc, zc, w, h, e) { return { x: x, yc: yc, zc: zc, w: w, h: h, e: e || 1 }; }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      o.push([s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), s.e), s.zc + s.h * sgn(sn) * Math.pow(Math.abs(sn), s.e)]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
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
    function cap(k, dx, front) {
      var s = secs[k], rr = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cy += rr[j][0]; cz += rr[j][1]; }
      var o = [s.x + dx, cy / n, cz / n];
      for (j = 0; j < n; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % n][0], rr[(j + 1) % n][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null && noseDx !== undefined) cap(0, noseDx, true);
    if (tailDx !== null && tailDx !== undefined) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function revolve(prof, len, r, x, y, z, n, capNose, capTail) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, capNose === undefined ? 0 : capNose, capTail === undefined ? 0 : capTail);
  }
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.11) / 2, d = (x0 - x1) * 0.12;
    list.push(convex([
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1, y + h, zTop], [x0, y + h, zTop]],
      [[x0 - d, y - h, zBot], [x1 + d * 0.5, y - h, zBot], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]],
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x0, y + h, zTop], [x0 - d, y + h, zBot], [x0 - d, y - h, zBot]],
      [[x1, y - h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x1 + d * 0.5, y - h, zBot]]
    ]));
  }
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th, r0) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a), q0 = r0 || 0, q1 = span;
      var A = [x, y + cy * q0, z + cz * q0], B = [x - chordR, y + cy * q0, z + cz * q0];
      var Cc = [x - sweep - chordT, y + cy * q1, z + cz * q1], D = [x - sweep, y + cy * q1, z + cz * q1];
      var nY = -cz * th, nZ = cy * th;
      list.push(solid([[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                      [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]));
    }
  }
  function aftDisc(r, seg, x, y, z) {
    var g = new V.CircleGeometry(r, seg);
    g.rotateY(-PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function secAt(secs, x) {
    for (var i = 0; i < secs.length - 1; i++) {
      var a = secs[i], b = secs[i + 1];
      if (x <= a.x && x >= b.x) {
        var t = (a.x - x) / ((a.x - b.x) || 1);
        var L = function (p, q) { return p + (q - p) * t; };
        return ls(x, L(a.yc, b.yc), L(a.zc, b.zc), L(a.w, b.w), L(a.h, b.h), L(a.e, b.e));
      }
    }
    return secs[secs.length - 1];
  }
  /* a frame bar over the canopy at x, above the sill */
  function arch(list, CAN, x, zMin, r) {
    var s = secAt(CAN, x), q = ls(s.x, s.yc, s.zc, s.w * 1.015, s.h * 1.015, s.e), ring = ringOf(q, 32), j, prev = null;
    for (j = 0; j <= 16; j++) {
      var p = ring[j % 32];
      if (p[1] < zMin) { prev = null; continue; }
      var P = [x, p[0], p[1]];
      if (prev) list.push(bar(prev, P, r, 6));
      prev = P;
    }
  }

  /* ---- detail kit (the fittings pass): a flat plate between two edge
     points p0, p1 with chord w along +x and thickness t; a swept blade
     aerial standing on (x, y, z) along unit d; an annulus facing +x */
  function plate(p0, p1, w, t, nrm) {
    var h = w / 2, A = [], B = [], k;
    var c = [[p0[0] + h, p0[1], p0[2]], [p0[0] - h, p0[1], p0[2]], [p1[0] - h, p1[1], p1[2]], [p1[0] + h, p1[1], p1[2]]];
    for (k = 0; k < 4; k++) {
      A.push([c[k][0] - nrm[0] * t / 2, c[k][1] - nrm[1] * t / 2, c[k][2] - nrm[2] * t / 2]);
      B.push([c[k][0] + nrm[0] * t / 2, c[k][1] + nrm[1] * t / 2, c[k][2] + nrm[2] * t / 2]);
    }
    return solid(A, B);
  }
  function blade(x, y, z, h, chord, sweep, dz, th) {
    var t = th || 0.012, d = dz < 0 ? -1 : 1;
    return solid([[x, y + t, z], [x - chord, y + t, z], [x - chord - sweep + chord * 0.45, y + t, z + d * h], [x - sweep, y + t, z + d * h]],
                 [[x, y - t, z], [x - chord, y - t, z], [x - chord - sweep + chord * 0.45, y - t, z + d * h], [x - sweep, y - t, z + d * h]]);
  }
  function annulus(r0, r1, seg, x, y, z, back) {
    var g = new V.RingGeometry(r0, r1, seg);
    g.rotateY(back ? -PI / 2 : PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function lamp(r, x, y, z) {
    var g = new V.OctahedronGeometry(r, 1);
    g.scale(1.6, 1, 0.8);
    return place(g, x, y, z);
  }

  function wSec(y, s) {
    return foil([wLE(y), s * y, wZ(y)], [wTE(y), s * y, wZ(y)], wT(y), [0, 0, 1]);
  }
  function tSec(y, s, t) {
    return foil([tLE(y), s * y, TZ], [tTE(y), s * y, TZ], t, [0, 0, 1]);
  }
  function finSec(z, le, te, t) {
    return foil([le, 0, z], [te, 0, z], t === undefined ? finT(z) : t, [0, 1, 0]);
  }
  function tab(t) {
    var out = [];
    for (var i = 0; i < t.length; i++) {
      var r = t[i];
      out.push(ls(r[0], 0, (r[1] + r[2]) / 2, r[3], (r[1] - r[2]) / 2, r[4]));
    }
    return out;
  }

  /* tip tank (A plan: x 1.18 to -4.44, 0.57 m across; centres 263.23 in
     apart, A front view); the profile is read off A's plan outline */
  var P_TT = [[0.50, 0.02], [0.46, 0.35], [0.40, 0.62], [0.32, 0.83], [0.22, 0.96], [0.10, 1.0],
              [-0.10, 1.0], [-0.22, 0.95], [-0.32, 0.82], [-0.40, 0.62], [-0.46, 0.38], [-0.50, 0.06]];
  var TTY = 3.343, TTL = 5.62, TTX = -1.63, TTR = 0.285;

  function buildAirframe(THREE, C, P) {
    V = THREE;
    var T = makeMats(C, P);
    var g = new V.Group();
    g.name = "f104";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], radome: [], navr: [], navg: [] };
    var G = { metal: [], tyre: [] };
    var s, i;

    /* ---- radome, fuselage, intake fairings, canopy, spine (A, B) */
    push(K.radome, loft(tab(NOSE), 32, 0, null));
    push(K.skin, loft(tab(FUS), 36, null, null));
    var cs = [], sp = [];
    for (i = 0; i < CAN.length; i++) cs.push(ls(CAN[i][0], 0, CAN[i][1], CAN[i][2], CAN[i][3], 1));
    for (i = 0; i < SPINE.length; i++) sp.push(ls(SPINE[i][0], 0, SPINE[i][1], SPINE[i][2], SPINE[i][3], 0.9));
    push(K.glass, loft(cs, 28, 0.02, null));
    push(K.skin, loft(sp, 20, null, 0.30));
    /* windscreen frame, the arch at 5.15 and the frame at 4.0 (B) */
    arch(K.dark, cs, 5.15, 0.52, 0.022);
    arch(K.dark, cs, 4.00, 0.58, 0.022);
    arch(K.dark, cs, 3.53, 0.62, 0.022);
    for (s = -1; s <= 1; s += 2)
      K.dark.push(bar([5.97, s * 0.20, 0.45], [5.15, s * 0.26, 0.81], 0.018, 6));

    /* ---- the half-cone intakes (A, B, F): the duct fairing, the dark duct
       in the lip and the cone standing forward out of it */
    for (s = -1; s <= 1; s += 2) {
      var dsec = [];
      for (i = 0; i < DUCT.length; i++)
        dsec.push(ls(DUCT[i][0], s * IY, IZ, DUCT[i][1] - IY, DUCT[i][2], 1));
      push(K.skin, loft(dsec, 24, null, 0.25));
      push(K.dark, loft([ls(1.535, s * IY, IZ, 0.33, 0.335, 1), ls(1.20, s * IY, IZ, 0.30, 0.31, 1)], 24, null, 0));
      push(K.metal, revolve([[0.5, 0.0], [-0.5, 1.0]], 0.62, 0.22, 1.66, s * IY, IZ, 16, 0, null));
    }

    /* ---- wing (A): root inside the duct fairing, 10 deg anhedral */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wSec(0.55, s), wSec(1.90, s)));
      K.skin.push(solid(wSec(1.90, s), wSec(WTIP, s)));
      /* team strips on the upper outer wings */
      var tb = function (yy) {
        var le = wLE(yy), te = wTE(yy), zz = wZ(yy), h = wT(yy) * 0.47 + 0.012;
        return blk([le, s * yy, zz], [te, s * yy, zz], 0.30, 0.62, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(2.35), tb(2.75)));
      /* tip tank with its tail fins */
      var tz = wZ(TTY);
      push(K.skin, revolve(P_TT, TTL, TTR, TTX, s * TTY, tz, 20, 0, 0));
      fins(K.skin, -3.72, s * TTY, tz, 0.60, 0.28, 0.32, 0.46, 0, 0.012, 0.14);
    }

    /* ---- stabilator on the fin top (A) and the fin-top fairing */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(tSec(0.02, s, 0.065), tSec(TTIP, s, 0.028)));
    }
    push(K.skin, loft([ls(-6.30, 0, 2.58, 0.02, 0.02, 1), ls(-6.50, 0, 2.62, 0.06, 0.10, 1),
                       ls(-6.80, 0, 2.62, 0.08, 0.16, 1), ls(-7.20, 0, 2.60, 0.08, 0.18, 1),
                       ls(-7.60, 0, 2.55, 0.06, 0.12, 1), ls(-7.95, 0, 2.50, 0.02, 0.03, 1)], 16, 0, 0));

    /* ---- fin with its dorsal fillet (A), and the rudder */
    var FZ = [0.70, 0.885, 0.96, 1.24, 1.46, 1.78, 2.13, 2.48, 2.62];
    for (i = 0; i < FZ.length - 1; i++)
      K.skin.push(solid(finSec(FZ[i], finLE(FZ[i]), finTE(FZ[i])),
                        finSec(FZ[i + 1], finLE(FZ[i + 1]), finTE(FZ[i + 1]))));
    function rTE(z) { return -8.42 + (z - 0.96) / (2.37 - 0.96) * 0.44; }
    K.skin.push(solid(foil([finTE(0.96), 0, 0.96], [rTE(0.96), 0, 0.96], 0.075, [0, 1, 0]),
                      foil([finTE(2.37), 0, 2.37], [rTE(2.37), 0, 2.37], 0.045, [0, 1, 0])));

    /* ---- ventral fin under the rear fuselage (A, B) */
    var vt = 0.022;
    K.skin.push(solid([[-2.55, vt, -0.50], [-4.95, vt, -0.38], [-4.85, vt, -0.635], [-2.75, vt, -0.895]],
                      [[-2.55, -vt, -0.50], [-4.95, -vt, -0.38], [-4.85, -vt, -0.635], [-2.75, -vt, -0.895]]));

    /* ---- the jet pipe (A, F, H): the nozzle ring at the end of the body,
       the dark pipe and the turbine face inside */
    var JZ = 0.37;
    push(K.metal, loft([ls(-7.20, 0, JZ, 0.39, 0.37, 1), ls(-7.45, 0, JZ, 0.36, 0.35, 1)], 28, null, null));
    K.dark.push(aftDisc(0.355, 24, -7.40, 0, JZ));
    K.metal.push(aftDisc(0.15, 14, -7.42, 0, JZ));


    /* ---- fittings (the detail pass; C, D, E, F, H show them):
       the intake lip ring that closes the duct's open front, the seat
       headrest and the rear-view mirror in the canopy, the UHF blade on the
       spine and the IFF / TACAN blades under the belly, the anti-collision
       beacons, the position lights on the tip tanks and the white tail
       light, static dischargers on the stabilator and rudder, the speed-
       brake fairings on the rear sides, the jet pipe's nozzle flaps, ribs
       and flameholder ring */
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(annulus(0.325, 0.375, 24, 1.535, s * IY, IZ));
      K.dark.push(annulus(0.06, 0.26, 18, 1.22, s * IY, IZ));                 /* compressor face */
      K.skin.push(plate([1.30, s * 0.235, 0.40], [1.30, s * 0.235, -0.16], 0.40, 0.02, [0, 1, 0]));  /* splitter */
      K.dark.push(box(0.70, 0.02, 0.10, -5.15, s * 0.655, 0.10));             /* speed brake hinge */
      K.skin.push(plate([-4.85, s * 0.665, 0.24], [-4.85, s * 0.665, -0.06], 0.60, 0.018, [0, 1, 0]));
      /* tip-tank position lights, port red / starboard green */
      (s > 0 ? K.navr : K.navg).push(lamp(0.035, -0.60, s * (TTY + TTR * 0.92), wZ(TTY) + 0.04));
      /* static dischargers: stabilator tip, rudder */
      for (i = 0; i < 2; i++)
        K.dark.push(bar([tTE(TTIP - 0.05 - i * 0.25) + 0.02, s * (TTIP - 0.05 - i * 0.25), TZ],
                        [tTE(TTIP - 0.05 - i * 0.25) - 0.16, s * (TTIP - 0.05 - i * 0.25), TZ], 0.007, 4));
    }
    K.dark.push(box(0.14, 0.40, 0.30, 4.05, 0, 0.78));                          /* seat headrest */
    K.dark.push(box(0.10, 0.30, 0.10, 4.20, 0, 0.62));
    K.metal.push(box(0.03, 0.10, 0.04, 5.10, 0, 0.90));                         /* mirror */
    K.skin.push(blade(1.20, 0, 0.865, 0.24, 0.26, 0.12, 1));                    /* UHF */
    K.skin.push(blade(-0.40, 0, -0.585, 0.20, 0.20, 0.10, -1));                 /* TACAN */
    K.skin.push(blade(3.40, 0, -0.575, 0.12, 0.14, 0.05, -1));                  /* IFF */
    K.navr.push(lamp(0.05, -1.80, 0, 0.88));                                    /* beacons */
    K.navr.push(lamp(0.05, 0.80, 0, -0.605));
    K.glass.push(lamp(0.03, -7.98, 0, 2.50));                                   /* tail light */
    for (i = 0; i < 3; i++) {
      var dzr = 1.50 + i * 0.38, dxr = -8.42 + (dzr - 0.96) / (2.37 - 0.96) * 0.44;
      K.dark.push(bar([dxr + 0.06, 0, dzr], [dxr - 0.11, 0, dzr], 0.008, 4));
    }
    /* nozzle flaps and their ribs, the flameholder ring */
    push(K.metal, loft([ls(-7.45, 0, JZ, 0.36, 0.35, 1), ls(-7.62, 0, JZ, 0.33, 0.325, 1)], 24, null, null));
    for (i = 0; i < 12; i++) {
      var pa = 2 * PI * i / 12, cy = Math.cos(pa), sz = Math.sin(pa);
      K.dark.push(bar([-7.22, cy * 0.39, JZ + sz * 0.375], [-7.60, cy * 0.335, JZ + sz * 0.33], 0.012, 4));
    }
    var fh = new V.TorusGeometry(0.21, 0.018, 4, 20);
    fh.rotateY(PI / 2); fh.translate(-7.30, 0, JZ);
    K.metal.push(fh);

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.navr, T.navr, "nav_red");
    mesh(g, K.navg, T.navg, "nav_green");

    /* ---- landing gear (A side and front views; D, E): single nose wheel
       0.36 m at x 2.76; mains 0.58 m at x -1.53 on a 2.68 m track, the legs
       slanting out from the fuselage sides; group "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 2.76, nr = 0.18, nz = GROUND + nr;
    G.metal.push(bar([2.92, 0, -0.58], [nx + 0.03, 0, nz + 0.05], 0.050, 10));
    G.metal.push(bar([nx, 0.09, nz], [nx, -0.09, nz], 0.030, 8));
    G.metal.push(bar([nx + 0.03, 0.07, nz + 0.05], [nx + 0.03, -0.07, nz + 0.05], 0.025, 6));
    G.tyre.push(cyl(nr, nr, 0.13, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.14, 12, "y", nx, 0, nz));
    var mx = -1.53, mr = 0.29, mz = GROUND + mr, my = 1.34;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([-1.45, s * 0.62, -0.52], [mx, s * 1.22, mz + 0.04], 0.065, 10));     /* leg */
      G.metal.push(bar([-1.80, s * 0.60, -0.50], [mx - 0.05, s * 1.12, mz + 0.40], 0.035, 6)); /* strut */
      G.metal.push(bar([mx, s * 1.20, mz], [mx, s * 1.24, mz], 0.05, 8));
      G.metal.push(bar([mx, s * 1.20, mz], [mx, s * (my + 0.02), mz], 0.035, 8));            /* axle */
      G.tyre.push(cyl(mr, mr, 0.19, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.20, 14, "y", mx, s * my, mz));
    }
    /* gear fittings (D, E): the chromed oleo, the torque links, the brake
       lines, the hub caps, the nose leg's taxi light, and the doors - the
       nose well's two side doors and each main leg's door on the leg */
    G.metal.push(bar([nx + 0.03, 0, nz + 0.05], [2.86, 0, nz + 0.36], 0.036, 8));
    G.metal.push(bar([nx + 0.10, 0, nz + 0.12], [2.98, 0, nz + 0.27], 0.012, 4));
    G.metal.push(bar([2.98, 0, nz + 0.27], [2.92, 0, nz + 0.42], 0.012, 4));
    G.metal.push(lamp(0.04, 2.98, 0, nz + 0.55));
    G.tyre.push(cyl(0.05, 0.05, 0.15, 10, "y", nx, 0, nz));
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(solid([[3.45, s * 0.14, -0.58], [2.45, s * 0.14, -0.58], [2.55, s * 0.17, -0.93], [3.35, s * 0.17, -0.93]],
                         [[3.45, s * 0.16, -0.58], [2.45, s * 0.16, -0.58], [2.55, s * 0.19, -0.93], [3.35, s * 0.19, -0.93]]));
      var lt = [-1.45, s * 0.62, -0.52], lb = [mx, s * 1.22, mz + 0.04];
      var ld = [lb[0] - lt[0], lb[1] - lt[1], lb[2] - lt[2]], ll = Math.sqrt(ld[0] * ld[0] + ld[1] * ld[1] + ld[2] * ld[2]);
      var dn = [0, -ld[2] / ll * s, ld[1] / ll * s];                              /* outboard of the leg */
      var o = 0.09, f = 0.62;
      G.metal.push(plate([lt[0] + dn[0] * o, lt[1] + dn[1] * o, lt[2] + dn[2] * o],
                         [lt[0] + ld[0] * f + dn[0] * o, lt[1] + ld[1] * f + dn[1] * o, lt[2] + ld[2] * f + dn[2] * o],
                         0.58, 0.022, dn));
      G.metal.push(bar([mx + 0.02, s * 1.15, mz + 0.10], [mx + 0.12, s * 1.08, mz + 0.30], 0.014, 4));  /* torque link */
      G.metal.push(bar([mx + 0.12, s * 1.08, mz + 0.30], [mx + 0.03, s * 1.00, mz + 0.48], 0.014, 4));
      G.tyre.push(bar([-1.47, s * 0.66, -0.55], [mx - 0.04, s * 1.20, mz + 0.06], 0.008, 4));         /* brake line */
      G.tyre.push(cyl(0.10, 0.10, 0.21, 10, "y", mx, s * my, mz));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    return g;
  }

  return {
    VARIANTS: VARIANTS,
    build: function (THREE, M, C, v) { return buildAirframe(THREE, C, VARIANTS[v] || VARIANTS.deu); }
  };
})();

/* len is the measured x extent: the nose tip (8.33) to the rudder trailing
   edge (-8.33), the published 16.66 m */
UNIT_MODELS["deu_e60_fighter"] = { len: 16.66, build: function (THREE, M, C) { return HeroF104.build(THREE, M, C, "deu"); } };
UNIT_MODELS["roc_e60_fighter"] = { len: 16.66, build: function (THREE, M, C) { return HeroF104.build(THREE, M, C, "roc"); } };
