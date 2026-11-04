/* ============ eu_typhoon.js - HERO model: Eurofighter Typhoon ============
   Registers four rows, one builder with a VARIANTS table:
     gbr_e00_fighter  "Typhoon FGR4"          (eras.js, service 2003)
     fighter_b        "Typhoon FGR4"          (rules.js, present-day gbr)
     bomber_b         "Typhoon (strike fit)"  (rules.js, present-day gbr cas)
     fighter_g        "Eurofighter"           (rules.js, present-day deu,
                                               "Eurofighter Typhoon Tranche 3")
   eras.js holds no other Typhoon row (there is no deu_e00_fighter; the
   German e90 fighter is the F-4F). There was no Typhoon model in js/hero/
   before this file (grep -i "typhoon|eurofighter" found only ru_typhoon.js,
   the Project 941 submarine): until now these rows borrowed a role peer.

   Full-quality redo, 2026-11-04. Model space: +X nose, +Y left (port), +Z
   up, metres. Every table is read off D on a pixel grid (D rendered from
   its SVG at 3000 x 1800 px):
     side view  X = (2150 - px) / 99.6,   Z = (405 - py) / 99.6
     plan view  X = (2168.6 - px) / 99.4, Y = |1194 - py| / 100.9
     head-on    Y = (px - 921.5) / 101.1, Z = (1470 - py) / 101.1
   99.6 px/m makes D's side view, radome tip (px 1354) to fin-tip trailing
   corner (px 2943), the published 15.96 m - the published length is to the
   fin tip, which overhangs the nozzles by 1.1 m (D side and plan agree);
   99.4 does the same for D's plan; 100.9 makes D's span over the wing-tip
   pods (1105 px) the published 10.95 m (D's plan is 1.4 % wider than its
   length allows: the published span is followed). Z = 0 is the radome tip.

   ATTITUDE. D draws the airframe on a level datum and its wheels on two
   ground lines: the nose wheel's 0.23 m below the main wheels' over 4.14 m,
   i.e. the aeroplane sits 3.2 deg nose-up on its gear. Built in D's frame
   and pitched 3.2 deg nose-up once (PITCH), the fin tip stands 5.23 m above
   the ground (published 5.28 m) and all three tyres touch Z = GROUND. P4
   (side-on) agrees: radome tip 2.4 m and canopy top 3.7 m above the ground
   in the photo, 2.58 / 3.83 m in the model.

   References (Wikimedia Commons, cached in scratchpad/q_typhoon_ref;
   Wikipedia for the figures):
     D "Eurofighter Typhoon line drawing.svg" - plan, underside, side (port)
       and head-on, with stores in red. Read off it: the radome and body
       (side top/bottom contours, plan half-widths), the long sloping
       windscreen and the one-piece canopy, the chin intake (its upper lip
       forward at X 3.50, the lower lip raked back to X 2.94, Z -1.05 -
       the lowest point of the body, the lower lip bulging to Z -1.08 just
       behind it), the canards (root LE X 5.67 at Y 0.50, tip Y 1.91,
       forward-swept trailing edge; head-on: anhedral, root Z 0.15 to tip
       -0.17), the wing (LE 52.4 deg from (1.85, 1.13) to (-3.56, 5.30), the
       trailing edge nearly straight across X -5.00..-4.82, flaperon hinges
       X -4.09 / -4.24 split at Y 3.41, the slat line), the wing-tip pods
       (X -2.93..-5.35, Y 5.38), the fin (LE 54 deg, tip Z 3.51, TE from
       (-6.53, 0.40) to the tip corner (-7.97, 3.41)), the fairing at the
       fin root's leading edge (X -3.07..-3.55, top Z 1.09), the twin
       nozzles (exit X -6.86, centres Y +-0.50, Z -0.13, r 0.38), the gear
       (nose wheel X 2.57 r 0.22; main wheels X -1.57 r 0.34; head-on main
       track 3.80 m), and the stores (underside view): a missile half
       sunk under each corner of the belly at X 2.88..-0.66 and -1.87..
       -5.39, a finned tank at Y 2.81 (X 1.38..-3.68, 0.59 m across), a
       short missile on a rail at Y 4.61 (X -1.32..-4.27); empty pylons at
       Y 2.05 and 3.73.
     P1 "Eurofighter Typhoon FGR4 ZJ927 AE (7050396467).jpg" - an RAF FGR4
       taxiing, port side: the canard under the windscreen, the PIRATE ball
       ahead of the windscreen, tall single-wheel nose leg behind the
       intake, the main wheels, a wing tank and a missile under the rear
       fuselage, the fairing at the fin root, the twin nozzles.
     P2 "Eurofighter Typhoon FGR.4, United Kingdom - Royal Air Force (RAF)
       JP7410655.jpg" - an FGR4 head-on from starboard: the chin intake's
       two openings either side of a central divider and the curved
       ("smiling") lower lip, the starboard-side fairing of the retracted
       refuelling probe beside the windscreen, the PIRATE ball seen over
       the port side, the nose leg, the main legs and their big outer
       doors, wing tanks, a Paveway IV on the inner wing pylon inboard of
       the tank, a short missile on the outer pylon, the wing-tip pods.
     P3 "Eurofighter Typhoon FGR4 'ZK305 - DE' (11718821565).jpg" - an FGR4
       from port, front quarter: the PIRATE window on the upper port side
       just aft of the radome joint, the canard and its root, the nose leg
       and wheel under the intake, wing tanks; and the paint.
     P4 "Royal Air Force (RAF) Typhoon FGR4 ZJ936 'QO-C' ... (8581632937).jpg"
       - an FGR4 side-on from starboard on static display: the attitude
       check above, the gear positions (nose wheel 5.3 m and main wheels
       9.9 m behind the radome tip; D: 5.4 / 9.6), the fin-root fairing,
       wing tank and under-fuselage missiles. Its special tail paint is NOT
       used.
     en.wikipedia "Eurofighter Typhoon": length 15.96 m, span 10.95 m,
       height 5.28 m, wing area 51.2 m2; "53-degree leading edge sweepback";
       "the wing leading edges are fitted with automatic movable slats";
       PIRATE "mounted on the port side of the fuselage, forward of the
       windscreen"; Paveway IV, Meteor, ASRAAM, Brimstone in RAF service.
   As drawn: 15.95 m nose to fin tip on D's datum (16.14 m X extent once
   pitched, the fin tip swinging down and back), span 10.95 m over the
   pods, height 5.23 m.

   Recognition list (what makes it a Typhoon at RTS zoom):
     1. Canard delta: big all-moving canards set well forward, under the
        windscreen, with anhedral; a 52 deg delta behind them (its leading edge straight
        from a small root glove to the tip: D shows no crank)
        with pods on the tips (D, P1-P3) - CANARD, wing().
     2. The wide "smiling" chin intake under the cockpit: upper lip forward,
        lower lip raked back and curved (D side and head-on, P2) - TRUNK.
     3. One tall swept fin with the fairing at its root (D, P1, P4).
     4. Twin EJ200 nozzles side by side under the fin, which overhangs
        them (D, P1).
     5. Long pointed radome, long sloping windscreen, bubble canopy (D, P3).
     6. Tall gear: a long single-wheel nose leg behind the intake, main
        wheels well outboard on legs with big outer doors (D, P2, P3).
     7. The PIRATE ball on the port side ahead of the windscreen (P1-P3)
        and the probe fairing on the starboard side (P2).
   Paint (P3 sunlit #c6d0d1, P4 overcast #9a9ea4, taken to about the middle):
   one light grey #a9afb4 all over, radome the same grey. No roundels, fin
   flashes, codes, squadron badges or tail art (P1-P4 carry them: not drawn).
   Team colour exactly C.team: one strip on each upper outer wing.
   Stores (D's underside view; the rows name AMRAAM/Meteor and ASRAAM, the
   strike row Paveway IV and Brimstone):
     fighter rows: a 1000 l tank on each Y 2.81 pylon (D, P1-P4), four
       medium-range missiles half sunk under the belly corners (D, P1, P4;
       Meteor and AMRAAM are not told apart in my photographs - drawn with
       D's AMRAAM outline), a short missile on each outer rail (D, P2).
     bomber_b: the tanks, a Paveway IV on each inner pylon (P2), the two rear
       belly missiles and the outer short missiles. Brimstone is NOT drawn:
       no reference I fetched shows it on a Typhoon.
   Gear: it retracts, so it is the group "gear".

   NOT CONFIRMED (estimated, not measured):
     - the cross-section shapes (superellipse exponents); the body's width
       at canopy-sill height and the canopy's own half-width at each station
       (D's plan gives the outline, not the section).
     - the probe fairing's size and path (P2 in perspective: Y -0.40, Z 0.66,
       X 5.55..4.05) and the PIRATE ball's size (r 0.09) and place (P3).
     - the lower lip's droop: drawn in D's position, not deflected.
     - the stores' fore-and-aft places on the photographs (taken from D);
       the Paveway IV station's X; the tank's fins (D draws three).
     - the gear legs' rake, the brace, the main doors' sizes (P2 in
       perspective); the nose wheel size (D: 0.44 m across).
     - fighter_g: drawn exactly as the RAF FGR4 (same grey). No Luftwaffe
       photograph was fetched; its paint and fit are not checked.
     - D's head-on view puts the intake bottom 0.12 m higher than its side
       view; the side view is followed.
   Not drawn (no reference shows it, or the row forbids it): the gun port,
   the dorsal airbrake (closed and flush), the probe extended, Brimstone,
   national markings, codes, a centreline tank.

   Materials: SKIN (one painted canvas, projected; also the tanks and
   pylons), RADOME, DARK, METAL, NOZZLE, GLASS, PALE (missiles), ORD (the
   Paveway IV), TEAM; the gear group METAL, TYRE, DARK.
   Nodes: "gear". Model space line: +X nose, +Y port, +Z up, metres; the
   tyres touch Z GROUND (-2.13) after the pitch.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTyphoon = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;

  /* ------------------------------------------------------ the variants -- */
  var VARIANTS = {
    gbr_e00_fighter: { key: "fgr4",   load: "aa" },
    fighter_b:       { key: "fgr4b",  load: "aa" },
    bomber_b:        { key: "strike", load: "strike" },
    fighter_g:       { key: "deu",    load: "aa" }
  };

  /* --------------------------------------------------------- attitude -- */
  /* D's ground lines: nose wheel bottom (X 2.570, Z -2.279), main wheel
     bottom (X -1.566, Z -2.048) -> 3.2 deg; pitched about the origin both
     land on Z -2.132 */
  var PITCH = Math.atan2(2.279 - 2.048, 2.570 + 1.566);
  var GROUND = -1.566 * Math.sin(PITCH) - 2.048 * Math.cos(PITCH);

  /* ------------------------------------------------------- the tables -- */
  /* body: [X, half-width, crown Z, keel Z, Z of max width, upper exp, lower exp]
     (D side contours for crown and keel; D plan for the half-width; under
     the canopy the crown is the sill + 0.06). The first seven rows are the
     radome (joint at D side px 1576). Aft of X 3.2 the chin-intake trunk
     (TRUNK) forms the underside down to the belly. */
  var BODY = [
    [8.00, 0.015, 0.02, -0.02, 0.00, 1.0, 1.0],
    [7.75, 0.10, 0.12, -0.10, 0.01, 1.0, 1.0],
    [7.37, 0.20, 0.24, -0.19, 0.02, 1.0, 1.0],
    [6.97, 0.28, 0.38, -0.26, 0.05, 1.0, 1.0],
    [6.57, 0.35, 0.50, -0.30, 0.08, 1.0, 1.0],
    [6.16, 0.41, 0.60, -0.32, 0.11, 1.0, 1.0],
    [5.76, 0.47, 0.70, -0.33, 0.13, 1.0, 0.95],      /* radome joint */
    [5.20, 0.53, 0.82, -0.34, 0.15, 0.80, 0.85],
    [4.50, 0.60, 0.89, -0.36, 0.16, 0.70, 0.75],
    [3.75, 0.66, 0.96, -0.42, 0.14, 0.65, 0.70],
    [3.00, 0.72, 1.04, -0.50, 0.10, 0.65, 0.65],
    [2.30, 0.76, 1.12, -0.55, 0.05, 0.70, 0.60],
    [1.90, 0.80, 1.17, -0.57, 0.02, 0.75, 0.60],     /* canopy ends, spine begins */
    [1.20, 0.85, 1.09, -0.60, -0.03, 0.75, 0.60],
    [0.50, 0.90, 1.00, -0.62, -0.08, 0.75, 0.60],
    [-0.50, 0.96, 0.91, -0.70, -0.12, 0.70, 0.60],
    [-1.50, 1.01, 0.85, -0.80, -0.16, 0.70, 0.55],
    [-2.50, 1.04, 0.78, -0.90, -0.20, 0.70, 0.55],
    [-3.33, 1.05, 0.72, -0.88, -0.20, 0.70, 0.55],
    [-4.34, 1.03, 0.68, -0.83, -0.18, 0.70, 0.55],
    [-5.34, 0.98, 0.64, -0.78, -0.16, 0.70, 0.60],
    [-6.00, 0.93, 0.62, -0.70, -0.14, 0.75, 0.65],
    [-6.40, 0.88, 0.60, -0.62, -0.12, 0.80, 0.70]
  ];
  var RADOME_N = 7;
  /* canopy on its sill: [X, half-width, top Z] (D side top contour px
     1596..1956, D plan canopy outline); one frame at X 4.25 (D plan arcs) */
  var CANOPY = [[5.72, 0.20, 0.74], [5.56, 0.27, 0.80], [5.16, 0.35, 0.99], [4.76, 0.40, 1.19],
                [4.36, 0.43, 1.37], [3.96, 0.44, 1.47], [3.55, 0.44, 1.50], [3.15, 0.43, 1.47],
                [2.75, 0.40, 1.39], [2.35, 0.33, 1.30], [1.95, 0.14, 1.21]];
  var SILL = [[5.72, 0.70], [4.50, 0.83], [3.50, 0.92], [2.50, 1.02], [1.95, 1.10]];
  var FRAME_X = 4.25;
  /* chin-intake trunk: [X, half-width, centre Z, half-height, upper exp,
     lower exp, rake] (D side: upper lip X 3.50 Z -0.445, lower lip X 2.94
     Z -1.045; D plan and head-on: the mouth about 1.7 m across, flat on
     top, its lower edge curving up at the sides - the "smile") */
  var TRUNK = [
    [3.22, 0.84, -0.745, 0.30, 0.30, 0.60, 0.93],
    [2.35, 0.85, -0.76, 0.32, 0.40, 0.60, 0],
    [1.50, 0.88, -0.71, 0.30, 0.45, 0.60, 0],
    [0.00, 0.93, -0.67, 0.30, 0.50, 0.60, 0],
    [-1.50, 0.97, -0.63, 0.30, 0.55, 0.55, 0],
    [-2.80, 0.98, -0.60, 0.30, 0.60, 0.55, 0],
    [-3.50, 0.90, -0.56, 0.25, 0.70, 0.60, 0]
  ];
  /* canard (D plan; head-on for the anhedral): root LE 5.67 / TE 4.23 at
     Y 0.50, Z 0.15; tip LE 4.26 / TE 3.76 at Y 1.91, Z -0.17 */
  var CANARD = { ry: 0.45, rle: 5.67, rte: 4.23, rz: 0.15, ty: 1.91, tle: 4.26, tte: 3.76, tz: -0.17 };
  /* wing (D plan): glove LE X 2.30 to Y 0.98, then to (1.85, 1.13), then
     straight at 52.4 deg to the tip (Y 5.30); TE -5.00 at the root to
     -4.82 at the tip; head-on: Z -0.22 at the root, 0.1 m lower at the tip */
  var WROOT = 0.70, WTIP = 5.30;
  function wLE(y) {
    if (y <= 0.98) return 2.30;
    if (y <= 1.13) return 2.30 - (y - 0.98) / 0.15 * 0.45;
    return 1.85 - (y - 1.13) * 1.297;
  }
  function wTE(y) { return -5.00 + Math.max(0, y - 1.13) * 0.0438; }
  function wZ(y) { return -0.22 - Math.max(0, y - 0.98) * 0.023; }
  function wT(y) { return 0.32 - Math.max(0, y - WROOT) / (WTIP - WROOT) * 0.26; }
  /* fin (D side): LE X = -2.184 - 1.39 Z, TE X = -6.335 - 0.48 Z, tip Z 3.51 */
  function finLE(z) { return -2.184 - 1.39 * z; }
  function finTE(z) { return -6.335 - 0.48 * z; }
  /* nozzles (D side px 2830: Z +0.24..-0.49; plan px 2835: Y 0.49 / 0.51) */
  var NOZ = { y: 0.50, z: -0.13, x0: -6.25, x1: -6.40, x2: -6.86, r0: 0.43, r1: 0.42, r2: 0.38 };
  /* gear (D side wheels, head-on track; drawing frame, before the pitch) */
  var NOSE_W = { x: 2.57, r: 0.22, z: -2.279 + 0.22, w: 0.19 };
  var MAIN_W = { x: -1.566, r: 0.34, z: -2.048 + 0.34, y: 1.90, w: 0.27 };

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -8.3, TW = 498;
  var YMAX = 5.6, TOPH = 336, ZTOP = 3.7, SIDEH = 180;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var BASE = "#a9afb4", RADOME_C = 0xa6acb1;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 1994, i, b, k, x, y;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    function line(x0, y0, x1, y1) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);
    /* faint tonal panels (P3, P4: the one grey with slightly different panels) */
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(" + (R() < 0.5 ? "255,255,255," : "40,44,48,") + (0.02 + R() * 0.03).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 40, 6 + R() * 22);
    }
    /* frames on every band: radome joint, intake hinge, body frames */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [5.76, 2.60, 1.90, 0.50, -1.50, -3.33, -5.34];
    for (i = 0; i < FR.length; i++) { x = pxX(FR[i]); line(x, 0, x, TH); }
    /* wing (top and belly): flaperon hinges X -4.09 (Y 1.13..3.41) and
       -4.24 (3.41..5.2), the split at 3.41, the slat line 0.32 m behind the LE */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.5;
        line(pxX(-4.09), ob + pxY(k * 1.15), pxX(-4.09), ob + pxY(k * 3.41));
        line(pxX(-4.24), ob + pxY(k * 3.41), pxX(-4.24), ob + pxY(k * 5.20));
        line(pxX(-4.09), ob + pxY(k * 3.41), pxX(-4.88), ob + pxY(k * 3.41));
        g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
        line(pxX(wLE(1.6) - 0.32), ob + pxY(k * 1.6), pxX(wLE(5.1) - 0.32), ob + pxY(k * 5.1));
      }
    }
    /* rivet rows and light weathering */
    g.fillStyle = "rgba(0,0,0,0.08)";
    for (i = 0; i < 70; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 20) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    /* heat staining ahead of the nozzles */
    var hs = g.createLinearGradient(pxX(-5.4), 0, pxX(-6.4), 0);
    hs.addColorStop(0, "rgba(40,36,32,0)"); hs.addColorStop(1, "rgba(40,36,32,0.28)");
    g.fillStyle = hs; g.fillRect(pxX(-6.4), 0, 1.0 * PXM, TH);
    _cv = cv;
    return cv;
  }

  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
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

  /* each face takes the band its normal looks into (as fr_mirage2000.js) */
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(BASE);
    m.radome = new V.MeshStandardMaterial({ color: RADOME_C, roughness: 0.62, metalness: 0.06 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.75, metalness: 0.20 });
    m.metal = new V.MeshStandardMaterial({ color: 0x8a8e92, roughness: 0.45, metalness: 0.55 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x5e5953, roughness: 0.42, metalness: 0.60 });
    m.glass = new V.MeshStandardMaterial({ color: 0x26353c, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xd4d6d4, roughness: 0.55, metalness: 0.12 });
    m.ord   = new V.MeshStandardMaterial({ color: 0x55606a, roughness: 0.65, metalness: 0.12 });   /* P2: blue-grey Paveway IV */
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (the fr_mirage2000.js kit: place, box, cyl, bar, merge, sloft, foil,
     loft, revolve, pylon, fins) */
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
  /* one mesh per material; the UVs are projected in D's frame, then the
     whole part is pitched (ATTITUDE in the header) */
  var _pitchM = null;
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    if (!_pitchM) _pitchM = new V.Matrix4().makeRotationY(-PITCH);
    geo.applyMatrix4(_pitchM);
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
  /* a pylon: a slim blade from the skin (zTop) down to zBot */
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.10) / 2, d = (x0 - x1) * 0.12;
    list.push(sloft([
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]]
    ]));
  }
  /* four (or n) fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th, nf) {
    nf = nf || 4;
    for (var k = 0; k < nf; k++) {
      var a = ang + k * 2 * PI / nf, cy = Math.cos(a), cz = Math.sin(a);
      var A = [x, y, z], B = [x - chordR, y, z];
      var Cc = [x - sweep - chordT, y + cy * span, z + cz * span], D = [x - sweep, y + cy * span, z + cz * span];
      var nY = -cz * th, nZ = cy * th;
      list.push(sloft([[[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                       [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]]));
    }
  }

  /* ----------------------------------------------------------- stores --
     profiles: [fraction of length from the nose (+0.5) to the tail (-0.5),
     fraction of radius]. Lengths from D's underside view; diameters as
     commonly published: AMRAAM 3.66 m x 0.178 m; ASRAAM 2.90 m x 0.166 m;
     Paveway IV about 3.1 m on a 0.273 m Mk 82 body; the tank 5.06 x 0.59 m
     (D). x is the store's centre. */
  var P_MISSILE = [[0.50, 0.04], [0.45, 0.50], [0.38, 0.90], [0.30, 1.0], [-0.48, 1.0], [-0.50, 0.85]];
  var P_TANK = [[0.50, 0.03], [0.42, 0.45], [0.30, 0.85], [0.18, 1.0], [-0.18, 1.0], [-0.36, 0.72], [-0.50, 0.18]];
  var P_MK82 = [[0.50, 0.30], [0.36, 0.80], [0.20, 1.0], [-0.12, 1.0], [-0.34, 0.62], [-0.50, 0.50]];
  function store(K, kind, x, y, zc) {
    var len, r;
    if (kind === "amraam") {
      len = 3.66; r = 0.089;
      push(K.pale, revolve(P_MISSILE, len, r, x, y, zc, 12));
      fins(K.pale, x + 0.25, y, zc, 0.50, 0.25, 0.18, 0.22, PI / 4, 0.006);          /* mid-body wings (D) */
      fins(K.pale, x - len * 0.38, y, zc, 0.30, 0.16, 0.12, 0.21, PI / 4, 0.006);    /* tail (D) */
    } else if (kind === "asraam") {
      len = 2.90; r = 0.083;
      push(K.pale, revolve(P_MISSILE, len, r, x, y, zc, 12));
      fins(K.pale, x - len * 0.38, y, zc, 0.30, 0.14, 0.14, 0.16, PI / 4, 0.006);    /* tail fins only (D) */
    } else if (kind === "tank") {
      len = 5.06; r = 0.295;
      push(K.skin, revolve(P_TANK, len, r, x, y, zc, 18));
      fins(K.skin, x - len * 0.30, y, zc, 0.55, 0.30, 0.20, 0.42, -PI / 2, 0.01, 3);  /* three fins (D) */
    } else if (kind === "pwiv") {
      r = 0.137;
      push(K.ord, revolve(P_MK82, 2.20, r, x, y, zc, 14));
      K.ord.push(cyl(0.065, 0.065, 0.55, 10, "x", x + 1.36, y, zc));                 /* guidance section */
      K.pale.push(cyl(0.03, 0.065, 0.12, 10, "x", x + 1.69, y, zc));                 /* seeker head */
      fins(K.ord, x + 1.40, y, zc, 0.18, 0.10, 0.06, 0.11, PI / 4, 0.006);           /* canards */
      fins(K.ord, x - 0.98, y, zc, 0.40, 0.25, 0.14, 0.20, PI / 4, 0.008);           /* tail kit */
    }
  }

  /* one EJ200 nozzle: shroud ring, petals, dark seams, bore */
  function nozzle(K, y, z) {
    push(K.metal, loft([sec(NOZ.x0, y, z, NOZ.r0, NOZ.r0, NOZ.r0), sec(NOZ.x1, y, z, NOZ.r1, NOZ.r1, NOZ.r1)], 24, null, null));
    push(K.nozzle, loft([sec(NOZ.x1, y, z, NOZ.r1, NOZ.r1, NOZ.r1), sec(NOZ.x2, y, z, NOZ.r2, NOZ.r2, NOZ.r2)], 24, null, null));
    push(K.dark, loft([sec(NOZ.x2, y, z, NOZ.r2 - 0.015, NOZ.r2 - 0.015, NOZ.r2 - 0.015), sec(NOZ.x2 + 0.5, y, z, 0.30, 0.30, 0.30)], 20, null, null));
    K.dark.push(capOf(sec(NOZ.x2 + 0.5, y, z, 0.30, 0.30, 0.30), 20, 0, false));
    for (var i = 0; i < 16; i++) {
      var a = (i + 0.5) * 2 * PI / 16;
      K.dark.push(bar([NOZ.x1 - 0.02, y + Math.cos(a) * (NOZ.r1 + 0.002), z + Math.sin(a) * (NOZ.r1 + 0.002)],
                      [NOZ.x2 + 0.02, y + Math.cos(a) * (NOZ.r2 + 0.002), z + Math.sin(a) * (NOZ.r2 + 0.002)], 0.010, 3));
    }
  }

  function lerpT(T, x) {
    if (x >= T[0][0]) return T[0][1];
    for (var j = 0; j < T.length - 1; j++)
      if (x <= T[j][0] && x >= T[j + 1][0]) {
        var f = (T[j][0] - x) / (T[j][0] - T[j + 1][0]);
        return T[j][1] + (T[j + 1][1] - T[j][1]) * f;
      }
    return T[T.length - 1][1];
  }

  function buildAirframe(THREE, C, VT) {
    V = THREE;
    _pitchM = null;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "typhoon_" + VT.key;
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [], ord: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, j, y, r;

    /* ---- radome and body */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      var sc = sec(r[0], 0, r[4], r[1], r[2] - r[4], r[4] - r[3], r[5], r[6]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 40, 0, null));
    push(K.skin, loft(bs, 40, null, 0));

    /* ---- canopy on its sill, the windscreen frame */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) {
      var sl = lerpT(SILL, CANOPY[i][0]);
      cs.push(sec(CANOPY[i][0], 0, sl, CANOPY[i][1], CANOPY[i][2] - sl, 0.10, 1.0, 1.0));
    }
    push(K.glass, loft(cs, 28, 0.03, 0.03));
    var fw = lerpT(CANOPY.map(function (q) { return [q[0], q[1]]; }), FRAME_X);
    var ft = lerpT(CANOPY.map(function (q) { return [q[0], q[2]]; }), FRAME_X);
    var fs = lerpT(SILL, FRAME_X);
    var rr = ringOf(sec(FRAME_X, 0, fs, fw + 0.012, ft - fs + 0.012, 0.10), 28);
    for (j = 0; j < 14; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 28], 0.026, 4));

    /* ---- PIRATE, port side ahead of the windscreen (P1-P3) */
    push(K.skin, loft([sec(5.70, 0.30, 0.62, 0.05, 0.05, 0.05), sec(5.58, 0.31, 0.63, 0.10, 0.08, 0.08),
                       sec(5.25, 0.30, 0.64, 0.08, 0.06, 0.06)], 12, null, 0.12));
    K.glass.push(place(new V.SphereGeometry(0.075, 12, 8), 5.62, 0.33, 0.69));

    /* ---- the retracted refuelling probe's fairing, starboard (P2) */
    push(K.skin, loft([sec(5.55, -0.40, 0.66, 0.03, 0.03, 0.03), sec(5.35, -0.41, 0.66, 0.07, 0.07, 0.07),
                       sec(4.30, -0.42, 0.72, 0.07, 0.07, 0.07), sec(4.05, -0.42, 0.74, 0.04, 0.04, 0.04)], 12, 0.02, 0.05));
    K.dark.push(cyl(0.022, 0.022, 0.03, 8, "x", 5.565, -0.40, 0.66));

    /* ---- chin intake: the trunk, the dark duct, the divider, the lip */
    var ts = [];
    for (i = 0; i < TRUNK.length; i++) {
      r = TRUNK[i];
      ts.push(sec(r[0], 0, r[2], r[1], r[3], r[3], r[4], r[5], r[6]));
    }
    push(K.skin, loft(ts, 32, null, 0.2));
    var m0 = TRUNK[0];
    function mouth(dx, inset) {
      return sec(m0[0] + dx, 0, m0[2], m0[1] - inset, m0[3] - inset, m0[3] - inset, m0[4], m0[5], m0[6]);
    }
    push(K.dark, loft([mouth(-0.60, 0.06), mouth(0.004, 0.015)], 32, null, null));
    K.dark.push(capOf(mouth(-0.59, 0.07), 32, 0, true));
    /* the divider between the two openings (head-on, P2) */
    var mt = m0[2] + m0[3] - 0.02, mb = m0[2] - m0[3] + 0.02, rk = m0[6];
    K.skin.push(sloft([
      [[m0[0] + rk * (mt - m0[2]) - 0.02, 0.025, mt], [m0[0] + rk * (mb - m0[2]) - 0.02, 0.025, mb], [m0[0] - 0.62, 0.025, mb], [m0[0] - 0.62, 0.025, mt]],
      [[m0[0] + rk * (mt - m0[2]) - 0.02, -0.025, mt], [m0[0] + rk * (mb - m0[2]) - 0.02, -0.025, mb], [m0[0] - 0.62, -0.025, mb], [m0[0] - 0.62, -0.025, mt]]]));
    /* the lip round the mouth; the lower half heavier - the variable lower lip */
    var lip = ringOf(mouth(0.005, -0.002), 32);
    for (i = 0; i < 32; i++) {
      var lo = i >= 16;
      K.skin.push(bar(lip[i], lip[(i + 1) % 32], lo ? 0.035 : 0.02, 4));
    }

    /* ---- canards: all-moving, under the windscreen, anhedral (D) */
    for (s = -1; s <= 1; s += 2) {
      var CN = CANARD;
      var cr = foil([CN.rle, s * CN.ry, CN.rz], [CN.rte, s * CN.ry, CN.rz], 0.08, [0, 0, 1]);
      var cm = foil([CN.rle - (CN.rle - CN.tle) * 0.5, s * (CN.ry + (CN.ty - CN.ry) * 0.5), (CN.rz + CN.tz) / 2],
                    [CN.rte - (CN.rte - CN.tte) * 0.5, s * (CN.ry + (CN.ty - CN.ry) * 0.5), (CN.rz + CN.tz) / 2], 0.05, [0, 0, 1]);
      var ct = foil([CN.tle, s * CN.ty, CN.tz], [CN.tte, s * CN.ty, CN.tz], 0.02, [0, 0, 1]);
      K.skin.push(sloft([cr, cm, ct]));
    }

    /* ---- wing: one loft of aerofoil sections, root (inside the body) to tip */
    for (s = -1; s <= 1; s += 2) {
      var ws = [], WST = [WROOT, 0.98, 1.13, 2.0, 2.8, 3.6, 4.4, 5.0, WTIP];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        ws.push(foil([wLE(y), s * y, wZ(y)], [wTE(y), s * y, wZ(y)], wT(y), [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      /* the team strip: a thin plate lying ON the upper skin of the outer wing */
      var plate = function (yy) {
        var zz = wZ(yy) + wT(yy) * 0.47 + 0.02;
        return blk([wLE(yy), s * yy, zz], [wTE(yy), s * yy, zz], 0.35, 0.75, 0.02, [0, 0, 1]);
      };
      K.team.push(sloft([plate(3.9), plate(4.45)]));
      /* the wing-tip pod (D plan X -2.93..-5.35, Y 5.38; P2) */
      push(K.skin, revolve([[0.50, 0.05], [0.36, 0.75], [0.20, 1.0], [-0.25, 1.0], [-0.42, 0.65], [-0.50, 0.10]],
                           2.42, 0.10, -4.14, s * 5.38, wZ(WTIP), 12));
    }

    /* ---- fin, its tip, the fairing at its root */
    function finSec(z, t) { return foil([finLE(z), 0, z], [finTE(z), 0, z], t, [0, 1, 0]); }
    K.skin.push(sloft([finSec(0.45, 0.26), finSec(0.75, 0.26), finSec(1.5, 0.21), finSec(2.5, 0.14), finSec(3.30, 0.09),
                       finSec(3.41, 0.08),
                       foil([-7.20, 0, 3.51], [-7.80, 0, 3.51], 0.05, [0, 1, 0])]));
    /* the fairing at the fin root's leading edge (D side px 2456..2520, top Z 1.09; P1, P4) */
    push(K.skin, loft([sec(-3.07, 0, 0.88, 0.03, 0.03, 0.03), sec(-3.13, 0, 0.90, 0.11, 0.15, 0.15),
                       sec(-3.25, 0, 0.91, 0.14, 0.18, 0.18), sec(-3.60, 0, 0.90, 0.14, 0.18, 0.18)], 14, 0.02, null));

    /* ---- twin EJ200 nozzles */
    for (s = -1; s <= 1; s += 2) nozzle(K, s * NOZ.y, NOZ.z);

    /* ---- stores, per variant (see the header) */
    function wingPylon(yy, x0, x1, depth) {
      var zb = wZ(yy) - wT(yy) * 0.40;
      for (s = -1; s <= 1; s += 2) pylon(K.skin, x0, x1, s * yy, zb + 0.02, zb - depth, 0.09);
      return zb - depth;
    }
    var zt = wingPylon(2.81, 0.0, -2.0, 0.26);                      /* tank pylon */
    for (s = -1; s <= 1; s += 2) store(K, "tank", -1.15, s * 2.81, zt - 0.02 - 0.295);
    var za = wingPylon(4.61, -1.9, -3.9, 0.12);                     /* outer rail */
    for (s = -1; s <= 1; s += 2) store(K, "asraam", -2.80, s * 4.61, za - 0.02 - 0.083);
    if (VT.load === "strike") {
      var zp = wingPylon(2.05, 0.5, -1.7, 0.22);                    /* inner pylon */
      for (s = -1; s <= 1; s += 2) store(K, "pwiv", -1.00, s * 2.05, zp - 0.02 - 0.137);
    }
    /* the belly missiles, half sunk under the corners of the belly (D, P1, P4) */
    for (s = -1; s <= 1; s += 2) {
      if (VT.load === "aa") store(K, "amraam", 1.11, s * 0.88, -0.90);
      store(K, "amraam", -3.63, s * 0.88, -0.80);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzle");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");
    mesh(g, K.ord, T.ord, "bombs");

    /* ---- landing gear (D wheels and head-on track; P1-P4): it retracts, so "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = NOSE_W.x, nr = NOSE_W.r, nz = NOSE_W.z;
    G.metal.push(bar([nx + 0.16, 0, -0.98], [nx, 0, nz + 0.06], 0.06, 10));               /* nose leg */
    G.metal.push(bar([nx, -0.13, nz], [nx, 0.13, nz], 0.035, 6));                          /* axle */
    G.tyre.push(cyl(nr, nr, NOSE_W.w, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, NOSE_W.w + 0.01, 12, "y", nx, 0, nz));
    var mx = MAIN_W.x, mr = MAIN_W.r, mz = MAIN_W.z, my = MAIN_W.y;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.20, s * 1.35, -0.55], [mx, s * (my - 0.17), mz + 0.10], 0.075, 10));   /* main leg */
      G.metal.push(bar([mx - 0.70, s * 1.30, -0.62], [mx - 0.02, s * (my - 0.19), mz + 0.55], 0.035, 6)); /* brace */
      G.metal.push(cyl(0.05, 0.05, 0.20, 8, "y", mx, s * (my - 0.10), mz));
      G.tyre.push(cyl(mr, mr, MAIN_W.w, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, MAIN_W.w + 0.01, 14, "y", mx, s * my, mz));
      /* the big door on the outer side of the leg (P2) */
      G.dark.push(place(new V.BoxGeometry(0.95, 0.025, 0.85), mx + 0.10, s * (my - 0.32), -1.05, s * 0.22, 0, 0));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  var out = { VARIANTS: VARIANTS, GROUND: GROUND, PITCH: PITCH };
  Object.keys(VARIANTS).forEach(function (id) {
    out[id] = function (THREE, M, C) { return buildAirframe(THREE, C, VARIANTS[id]); };
  });
  return out;
})();

/* len is the measured X extent of the pitched airframe: the radome tip to
   the fin tip's trailing corner. */
UNIT_MODELS["gbr_e00_fighter"] = { len: 16.14, build: HeroTyphoon.gbr_e00_fighter };
UNIT_MODELS["fighter_b"]       = { len: 16.14, build: HeroTyphoon.fighter_b };
UNIT_MODELS["bomber_b"]        = { len: 16.14, build: HeroTyphoon.bomber_b };
UNIT_MODELS["fighter_g"]       = { len: 16.14, build: HeroTyphoon.fighter_g };
