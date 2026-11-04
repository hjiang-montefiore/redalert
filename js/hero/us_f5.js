/* ============ us_f5.js - HERO model: Northrop F-5E Tiger II ================
   Registers one row:
     roc_e80_fighter  "F-5E Tiger II"  Northrop F-5E/F Tiger II (AIDC-built)
   No other row in js/eras.js or js/rules.js names the F-5 (grep "F-5",
   "Tiger II", "Freedom Fighter": only this row, its radarQ line and its
   generations.js weapons line). The row had no UNIT_MODELS entry before
   this file: it was drawn by the air3d_era silhouette from its air_specs
   row, which is the "before" of the comparison sheet. us_f104.js (the
   ROCAF F-104G) mentions this row only to say it is the F-5E, not an F-104.
   Nothing here is built on the old model, and no hero file draws an F-5.

   Full-quality redo, 2026-11-04. Model space: +X nose, +Y left (port), +Z
   up, metres. Everything is read off A on a pixel grid (1600 px render):
     X = (627 - px) / 82.93    side and plan views
     Z = (218.5 - py) / 82.93  side view (Z = 0 is the jet pipe axis)
     Y = (737.5 - py) / 82.93  plan view (py 737.5 is the centreline)
   82.93 px/m makes A's pitot tip (px 18) to nozzle exit (px 1236), 1218
   px, the published 14.69 m (48 ft 2.25 in, Jane's 1976-77, which counts
   the nose probe). Two independent checks of the one scale: the tip
   launch rails' outer edges (py 400 and 1075, 675 px) give 8.14 m against
   the published span 8.13 m (26 ft 8 in), and the nose to main wheel
   centres (px 375 and 805) give a wheelbase of 5.19 m against Jane's
   5.17 m (16 ft 11.5 in, a remembered figure, see NOT CONFIRMED).

   References (Wikimedia Commons, cached in scratchpad/q_f5_ref; Wikipedia
   for the figures):
     A "Northrop F-5E Tiger II 3-view.svg" (1600 px render) - side, plan and
       head-on views of a single-seat F-5E with tip AIM-9s, underwing
       stores and a centreline tank. Measured off it: the whole side
       profile (nose probe, the flattened "shark" nose, the windscreen
       foot px 358 and arch px 437, the canopy top py 149..150, the sill py
       211, the spine falling from py 152 at px 580 to py 199 at px 1225,
       the forward keel py 276, the rear keel py 241), the plan outline
       (nose half-width 41.5 px from px 320 to 520, the intake lips at px
       520..548, the outer contour 81 px at px 600 narrowing to the 63 px
       waist at px 780..860, 66.5 px at px 960, 43 px at the tail), the
       LERX (px 548..705), the wing (LE 28.7 deg from (709, 615) to the tip
       (820, 409), TE (918, 674) to (891, 409), tip chord 0.86 m, the LE
       flap split at Y 2.44), the tip launch rails and AIM-9s (2.89 m
       long), the stabilator (LE 32.4 deg, tip half-span 177.5 px = 2.14 m,
       TE px 1153..1160; its tip drawn 10 px below its root in side view,
       about 4.5 deg anhedral), the fin (LE 35 deg, (1065, 20) to (969,
       156); TE (1132, 20) to (1180, 188); top py 14..15; the dorsal
       fillet from the spine at px 900; the rudder hinge px 1113..1119),
       the two jet pipes (exit px 1236, Y +-0.235, r 0.225), the nose wheel
       (centre (375, 342.5), r 19.5) and main wheel (centre (805, 337), r
       21), the ground lines (py 362 under the nose wheel, py 358 under the
       mains), the centreline tank (px 480..910, py 295..345), the gun
       troughs on the nose top (plan px 225..262 at half-width 24 px).
       The head-on view gives the cross-section shapes (the flattened nose,
       the D-shaped intakes on the lower half of the body, the canopy
       half-width 37.5 px = 0.45 m, the wing with no dihedral) and the
       intake mouth height (67 px = 0.81 m); its heights do not register
       with the side view (it is 15 px short between keel and fin tip), so
       Z is never read off it.
     B "ROCAF F-5E 5267 Display at Ching Chuang Kang AFB Apron 20140719.jpg"
       (port side, 3/4 from ahead, on its wheels) - an AIDC-built ROCAF
       F-5E with the shark nose, the tall single nose leg with its
       drag brace, the main legs coming down from under the wing with
       their doors, the centreline tank and tip AIM-9 rails; the overall
       grey scheme. Paint sampled off it (overcast, blue-tinted): sides
       #627e8a..#7094a4, nose #80a3b5; taken to a neutral blue-grey
       #77898f, belly #98a5aa. Its markings, serials and badges are NOT
       drawn. It also settles the intake height: the intake cover is
       about half the body depth at that station, as A's head-on view has
       it, not the 95 px of A's slanted side lip.
     C "ROCAF F-5E 5288, 737th Wing Display at Ching Chuang Kang Air Force
       Base 20161126Fa.jpg" (port side, near side-on, silver anniversary
       scheme, not used for paint) - the gear: the nose leg straight down
       under the cockpit, the main leg and its large door hanging from the
       wing at mid-chord, the main wheel outboard of the leg.
     D "ROCAF F-5E 5272 Display at Chih Hang Air Force Base Apron
       20130601a.jpg" (3/4 from ahead, aggressor camouflage, not used for
       paint) - the shark nose in plan, the canopy and windscreen, the
       LERX blending into the wing, the tip rails.
     en.wikipedia "Northrop F-5" (Jane's 1976-77 specification): length
       48 ft 2.25 in (14.69 m), span 26 ft 8 in (8.13 m), 27 ft 11.875 in
       (8.53 m) with tip missiles, height 13 ft 4.5 in (4.08 m), wing area
       186 sq ft (17.3 m2), NACA 65A004.8 aerofoil, two J85-GE-21, 2x M39A2
       20 mm in the nose, 2x AIM-9 on the tip rails, up to 3x 275 US gal
       tanks; 308 F-5E/F built by AIDC as "Chung Cheng".
   As drawn: 14.69 x 8.75 x 4.18 m over the probe, the AIM-9 fins and the
   nose tyre (published 14.69 x 8.53 x 4.08). The span over the tip rails
   is 8.14 m (published 8.13); over the AIM-9 bodies 8.43; the 8.75 m
   extent is A's AIM-9 tail fins (A: py 375 to 1099 = 8.73 m), so the
   published 8.53 m "with wing-tip missiles" is taken to stop short of the
   fins. Height: fin top py 14 to the main-wheel ground line py 358 is
   4.15 m, to the nose-wheel line py 362 4.20 m; the wheels are where A
   draws them (not fitted). The published 4.08 m is 0.07 m less than A's
   main-wheel figure: A's wheels are drawn on their unloaded radius and
   the oleos uncompressed; nothing is squashed to meet it. A draws the
   nose wheel 4 px (0.05 m) lower than the mains, i.e. the aircraft sits
   0.6 deg nose-up on its wheels relative to the fuselage datum; kept.
   Wing area as drawn (trapezoid to the centreline, tips to the rails)
   about 16.9 m2 against the published 17.3.

   Recognition list:
     1. Long, flattened "shark" nose with a nose probe (A, B, D).
     2. Small bubble canopy on a slim forebody; the spine runs straight
        back from the canopy to the fin (A).
     3. D-shaped side intakes low on the body behind the cockpit, with the
        leading-edge root extensions (LERX) running from their lips into
        the wing roots (A, B, D).
     4. Small thin low-set trapezoidal wing, LE 28.7 deg, no dihedral, with
        launch rails and AIM-9s on the tips (A, B).
     5. Area-ruled "coke bottle" body: the waist at the wing, swelling
        again over the engines (A, plan).
     6. Swept fin with a large dorsal fillet; low-set all-moving
        stabilator with anhedral (A).
     7. Two small jet pipes side by side under the fin root (A).
     8. Tall, narrow nose leg; main legs under the wings; the centreline
        tank (A, B, C).

   NOT CONFIRMED (estimated, not measured):
     - the keel between px 700 and 940: A's centreline tank, its pylon and
       the underwing stores hide it; a smooth rise from py 287 to py 241
       is drawn, following the lines visible between the stores.
     - the intake height and place: 0.80 m tall (A head-on, B) on its
       lower edge at the keel, rather than A's slanted side lip (py 197 to
       292); the duct depth behind the lip.
     - the cross-section exponents (how boxy the body is), the canopy
       sill width, the LERX and wing-root fairing thickness.
     - the main gear track 3.80 m (Jane's 12 ft 5.5 in, remembered, not in
       the fetched sources; its wheelbase figure agrees with A), the leg
       rake, the drag braces, the door sizes (C shows them only from the
       side). A draws the wheels but no legs.
     - the fin, stabilator and wing thickness (4.8 % per the published
       aerofoil; fin and stabilator guessed at 4 %).
     - the paint for the e80 era: the photographs are 2013-2016; the
       ROCAF's 1980s scheme is not shown by any fetched source. Plain grey
       sampled off B is used.
     - the stabilator anhedral (A's side view only; B and C are too
       oblique to confirm it).
   Not drawn: national markings, serials, badges, tiger or aggressor
   schemes (forbidden); the underwing stores A shows (the row's weapons
   are the tip AIM-9s and the guns); the gun muzzles' blast panels beyond
   the two troughs; the small antennas on the fin and belly; the tank's
   tail fins; open airbrakes; the brake chute.

   Materials: SKIN (one painted canvas, projected), RADOME, UNDER (lighter
   grey: the tank, pylons, rails), DARK (intake ducts, gun troughs,
   frames), METAL, NOZZLE, GLASS, MISSILE (white AIM-9 bodies), TEAM (one
   strip on each upper outer wing, exactly C.team); gear: METAL, TYRE,
   UNDER. Nodes: "gear". Model space line: +X nose, +Y port, +Z up,
   metres; the tyres touch Z -1.68 (mains) and -1.73 (nose).
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF5 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;

  /* ------------------------------------------------- A's pixel grid -- */
  var KPX = 82.93, PX0 = 627, PY0 = 218.5;
  function X(px) { return (PX0 - px) / KPX; }
  function Z(py) { return (PY0 - py) / KPX; }
  function M(p) { return p / KPX; }

  /* ------------------------------------------------------- the tables -- */
  /* body, all in A's pixels:
     [px, half-width, crown py, keel py, py of max width, upper exp, lower exp]
     crown and keel off the side view, half-widths off the plan. The first
     four rows are the radome (A: joint at px 167). */
  var BODY = [
    [78, 2, 256.5, 262.5, 259.5, 1.0, 1.0],
    [100, 10.5, 252, 266.5, 259.5, 1.0, 1.0],
    [140, 20.5, 243.5, 271.5, 258, 1.0, 1.0],
    [167, 25.7, 238, 274, 257, 1.0, 0.95],            /* radome joint */
    [180, 28, 235, 274.5, 256, 0.95, 0.9],
    [220, 33.5, 226.5, 276, 254, 0.9, 0.85],
    [260, 38, 218.5, 276, 252, 0.9, 0.85],
    [300, 40, 210, 276.5, 250, 0.9, 0.8],
    [340, 41.5, 201.5, 276, 248, 0.9, 0.8],
    [358, 41.5, 199, 276, 247, 0.9, 0.8],             /* windscreen foot */
    [380, 41.5, 207, 276, 246, 0.85, 0.8],
    [400, 41.5, 211, 276, 245, 0.8, 0.8],             /* canopy sill */
    [530, 42.5, 211, 277, 245, 0.8, 0.8],
    [545, 44, 190, 280, 245, 0.95, 0.8],
    [560, 47, 162, 284, 244, 1.0, 0.8],
    [580, 50, 152, 288, 243, 1.0, 0.8],
    [640, 55, 156, 290, 240, 1.0, 0.8],
    [700, 59, 160.5, 287, 238, 1.0, 0.8],
    [760, 62.5, 165, 284, 236, 1.0, 0.8],
    [800, 63, 167.5, 283, 234, 1.0, 0.8],
    [860, 63, 172.5, 272, 230, 1.0, 0.8],
    [920, 65.5, 176.5, 252, 225, 0.95, 0.8],
    [960, 66.5, 179.5, 242, 220, 0.95, 0.8],
    [1000, 65, 182.5, 241, 218, 0.9, 0.8],
    [1060, 61, 187, 241, 217, 0.85, 0.8],
    [1100, 57, 190, 241, 217, 0.8, 0.8],
    [1140, 53, 192.5, 244, 218, 0.8, 0.8],
    [1180, 48, 195, 244, 219, 0.8, 0.8],
    [1225, 43, 199, 238, 218.5, 0.8, 0.8]            /* jet pipe shroud end */
  ];
  var RADOME_N = 4;
  /* canopy glass on the sill (py 211): [px, half-width px, top py]
     (A: windscreen px 358..437, canopy top py 149..150, aft edge px 540) */
  var CANOPY = [[358, 30, 200], [380, 34, 190], [400, 36, 181], [437, 37, 163],
                [460, 37.5, 153], [500, 37.5, 149.5], [540, 36, 150], [560, 28, 156]];
  var SILL = 211;
  var FRAMES = [437, 540];
  /* intake trunks, each side: [px, centre Y px, half-width px, centre py,
     half-height px, exp]; the outer edge follows the plan contour (81 px
     at px 600, 72.5 at px 700), the height is the 0.80 m mouth of A's
     head-on view and B, its foot on the keel */
  var TRUNK = [
    [540, 62, 18, 254, 33, 0.7],
    [600, 64, 17, 254, 33, 0.7],
    [640, 63, 16.5, 254, 32, 0.75],
    [700, 60, 12.5, 254, 30, 0.8],
    [760, 52, 10, 252, 26, 0.9]
  ];
  /* LERX plan outline (A): [px, half-width px] from the intake lip to where
     the wing LE takes over */
  var LERX = [[548, 70], [560, 78.5], [600, 92.5], [620, 104.5], [640, 109], [660, 112], [680, 113.5], [705, 117], [740, 117]];
  /* wing (A plan): LE px = 709 + (hw - 122.5) * 0.5475, TE px = 918 -
     (hw - 63.5) * 0.1019; tip edge at half-width 328.5 px (3.96 m), the
     rails to 337.5 px (4.07 m). Chord plane Z -0.38 (A side: the tip rail
     py 250). No dihedral (A head-on). */
  var WTIP = 3.96, WZ = Z(250), LESPLIT = 2.44;
  function wLE(y) { return -0.180 - 0.5475 * y; }
  function wTE(y) { return -3.587 + 0.1019 * y; }
  function wT(y) { return (wLE(y) - wTE(y)) * 0.048; }
  /* stabilator (A plan): LE 32.4 deg, TE nearly straight; Z off A side:
     root py 244 at Y 0.85, tip py 254 at Y 2.14 */
  var STIP = 2.14;
  function sLE(y) { return -4.458 - 0.635 * y; }
  function sTE(y) { return -6.43 + 0.04 * y; }
  function sZ(y) { return Z(244) - (y - 0.85) * (M(10) / 1.29); }
  /* fin (A side): LE X = -3.592 - 0.706 Z, TE X = -6.773 + 0.2857 Z, top
     Z 2.45 (py 15) */
  var FTOP = Z(15);
  function fLE(z) { return -3.592 - 0.706 * z; }
  function fTE(z) { return -6.773 + 0.2857 * z; }
  /* jet pipes (A: shroud px 1225, exit px 1236, centres Y +-0.235) */
  var NOZ = { x0: X(1225), x1: X(1230), x2: X(1236), y: 0.235, z: Z(218.5), r0: 0.235, r1: 0.228, r2: 0.218 };
  /* gear (A): nose wheel centre (375, 342.5) r 19.5 px, main (805, 337)
     r 21 px; track 3.80 m (NOT CONFIRMED) */
  var GEAR = { nx: X(375), nz: Z(342.5), nr: M(19.5), mx: X(805), mz: Z(337), mr: M(21), my: 1.90 };

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -7.6, TW = 456;
  var YMAX = 4.5, TOPH = 270, ZTOP = 2.6, SIDEH = 135;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  /* B sampled (overcast, blue-tinted), neutralised */
  var P = { base: "#77898f", belly: "#98a5aa", radome: 0x7f9096 };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 1974, i, b, k, x, y;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = P.base; g.fillRect(0, 0, TW, TH);
    g.fillStyle = P.belly; g.fillRect(0, B_BEL, TW, TOPH);
    /* the sides lighten below the wing line (B) */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      var gr = g.createLinearGradient(0, bd + pxZ(-0.30), 0, bd + pxZ(-0.60));
      gr.addColorStop(0, P.base); gr.addColorStop(1, P.belly);
      g.fillStyle = gr; g.fillRect(0, bd + pxZ(-0.30), TW, SIDEH - pxZ(-0.30));
    }
    /* panel lines: frames (A) */
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
    var FR = [167, 300, 358, 540, 700, 860, 1000, 1125, 1180];
    for (i = 0; i < FR.length; i++) {
      x = pxX(X(FR[i]));
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    /* wing: the LE flap hinge (A: 12 px behind the LE), its split, the
       aileron hinge at 78 % chord outboard of Y 2.44 */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.3;
        g.beginPath(); g.moveTo(pxX(wLE(0.95) - 0.15), ob + pxY(k * 0.95)); g.lineTo(pxX(wLE(WTIP) - 0.15), ob + pxY(k * WTIP)); g.stroke();
        g.beginPath(); g.moveTo(pxX(wLE(LESPLIT)), ob + pxY(k * LESPLIT)); g.lineTo(pxX(wLE(LESPLIT) - 0.15), ob + pxY(k * LESPLIT)); g.stroke();
        var a0 = wLE(LESPLIT) + (wTE(LESPLIT) - wLE(LESPLIT)) * 0.78, a1 = wLE(WTIP) + (wTE(WTIP) - wLE(WTIP)) * 0.78;
        g.beginPath(); g.moveTo(pxX(a0), ob + pxY(k * LESPLIT)); g.lineTo(pxX(a1), ob + pxY(k * WTIP)); g.stroke();
        g.beginPath(); g.moveTo(pxX(a0), ob + pxY(k * LESPLIT)); g.lineTo(pxX(wTE(LESPLIT)), ob + pxY(k * LESPLIT)); g.stroke();
        /* flap hinge inboard */
        var f0 = wLE(0.95) + (wTE(0.95) - wLE(0.95)) * 0.78;
        g.beginPath(); g.moveTo(pxX(f0), ob + pxY(k * 0.95)); g.lineTo(pxX(a0), ob + pxY(k * LESPLIT)); g.stroke();
      }
    }
    /* fin: rudder hinge (A: px 1113..1119 from py 188 up to py 44) */
    for (b = 0; b < 3; b++) {
      var bs = [B_PORT, B_STBD, B_IN][b];
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(pxX(X(1116)), bs + pxZ(Z(188))); g.lineTo(pxX(X(1116)), bs + pxZ(Z(44))); g.stroke();
      g.beginPath(); g.moveTo(pxX(X(1116)), bs + pxZ(Z(44))); g.lineTo(pxX(fTE(Z(44))), bs + pxZ(Z(44))); g.stroke();
    }
    /* rivet rows, light weathering */
    g.fillStyle = "rgba(0,0,0,0.08)";
    for (i = 0; i < 60; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 20) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(30,34,38," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 30, 2 + R() * 5);
    }
    /* exhaust staining over the jet pipes */
    var hs = g.createLinearGradient(pxX(-6.4), 0, pxX(-7.3), 0);
    hs.addColorStop(0, "rgba(40,36,32,0)"); hs.addColorStop(1, "rgba(40,36,32,0.35)");
    g.fillStyle = hs; g.fillRect(pxX(-7.3), 0, 0.9 * PXM, TH);
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

  /* each face takes the band its normal looks into (as fr_mirage3.js) */
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.10 });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.base);
    m.radome = new V.MeshStandardMaterial({ color: P.radome, roughness: 0.60, metalness: 0.05 });
    m.under = new V.MeshStandardMaterial({ color: 0x98a5aa, roughness: 0.60, metalness: 0.18 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.75, metalness: 0.20 });
    m.metal = new V.MeshStandardMaterial({ color: 0x8a8e90, roughness: 0.40, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x4f5250, roughness: 0.42, metalness: 0.60 });
    m.glass = new V.MeshStandardMaterial({ color: 0x26353c, roughness: 0.10, metalness: 0.35 });
    m.missile = new V.MeshStandardMaterial({ color: 0xdcdcd8, roughness: 0.50, metalness: 0.15 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (fr_mirage3.js's kit: place, box, cyl, bar, merge, sloft, foil, loft) */
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
      var Pp = S[k], Q = S[k + 1];
      for (i = 0; i < n; i++) {
        var j = (i + 1) % n;
        var d1 = (Pp[i][0] - Q[j][0]) * (Pp[i][0] - Q[j][0]) + (Pp[i][1] - Q[j][1]) * (Pp[i][1] - Q[j][1]) + (Pp[i][2] - Q[j][2]) * (Pp[i][2] - Q[j][2]);
        var d2 = (Pp[j][0] - Q[i][0]) * (Pp[j][0] - Q[i][0]) + (Pp[j][1] - Q[i][1]) * (Pp[j][1] - Q[i][1]) + (Pp[j][2] - Q[i][2]) * (Pp[j][2] - Q[i][2]);
        if (d1 <= d2) { q3(Pp[i], Pp[j], Q[j]); q3(Pp[i], Q[j], Q[i]); }
        else { q3(Pp[i], Pp[j], Q[i]); q3(Pp[j], Q[j], Q[i]); }
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
  function sec(x, yc, zc, w, hu, hl, eu, el) {
    return { x: x, yc: yc, zc: zc, w: w, hu: hu, hl: hl, eu: eu || 1, el: el || eu || 1 };
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, e, z;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      e = sn >= 0 ? s.eu : s.el;
      z = s.zc + (sn >= 0 ? s.hu : s.hl) * sgn(sn) * Math.pow(Math.abs(sn), e);
      o.push([s.x, s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), e), z]);
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
  /* four fins in a cross at angle ang (0: + seen head-on) */
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

  /* ----------------------------------------------------------- stores -- */
  /* 275 US gal tank (A: px 480..910, py 295..345) */
  var P_TANK = [[0.50, 0.03], [0.44, 0.50], [0.33, 0.90], [0.20, 1.0], [-0.20, 1.0], [-0.38, 0.70], [-0.50, 0.10]];
  /* AIM-9 (A: px 690..930, 2.89 m, body 0.127 m) */
  var P_AIM9 = [[0.50, 0.05], [0.47, 0.55], [0.44, 0.95], [0.42, 1.0], [-0.50, 1.0]];

  /* the two J85 jet pipes: shroud ring, nozzle, dark bore */
  function jetpipes(K) {
    for (var s = -1; s <= 1; s += 2) {
      var y = s * NOZ.y, z = NOZ.z;
      push(K.metal, loft([sec(NOZ.x0 + 0.05, y, z, NOZ.r0, NOZ.r0, NOZ.r0), sec(NOZ.x1, y, z, NOZ.r1, NOZ.r1, NOZ.r1)], 20, null, null));
      push(K.nozzle, loft([sec(NOZ.x1, y, z, NOZ.r1, NOZ.r1, NOZ.r1), sec(NOZ.x2, y, z, NOZ.r2, NOZ.r2, NOZ.r2)], 20, null, null));
      push(K.dark, loft([sec(NOZ.x2, y, z, NOZ.r2 - 0.015, NOZ.r2 - 0.015, NOZ.r2 - 0.015), sec(NOZ.x2 + 0.4, y, z, 0.17, 0.17, 0.17)], 16, null, null));
      K.dark.push(capOf(sec(NOZ.x2 + 0.4, y, z, 0.17, 0.17, 0.17), 16, 0, false));
    }
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "f5e";
    var K = { skin: [], radome: [], under: [], dark: [], metal: [], glass: [], team: [], missile: [], nozzle: [] };
    var G = { metal: [], tyre: [], door: [] };
    var s, i, y, r;

    /* ---- radome and body */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      var zc = Z(r[4]);
      var sc = sec(X(r[0]), 0, zc, M(r[1]), Z(r[2]) - zc, zc - Z(r[3]), r[5], r[6]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 32, 0, null));
    push(K.skin, loft(bs, 32, null, 0));
    /* nose probe (A: px 18..78, py 257..262) */
    K.metal.push(cyl(0.022, 0.026, X(18) - X(78), 8, "x", (X(18) + X(78)) / 2, 0, Z(259.5)));

    /* ---- the two gun troughs on the nose top (A plan: px 225..262 at
       half-width 24 px) */
    for (s = -1; s <= 1; s += 2)
      K.dark.push(cyl(0.03, 0.03, X(225) - X(262), 8, "x", (X(225) + X(262)) / 2, s * M(24), Z(224)));

    /* ---- canopy glass on its sill, frames */
    var cs = [], zs = Z(SILL);
    for (i = 0; i < CANOPY.length; i++)
      cs.push(sec(X(CANOPY[i][0]), 0, zs, M(CANOPY[i][1]), Math.max(0.02, Z(CANOPY[i][2]) - zs), 0.06, 1.0, 1.0));
    push(K.glass, loft(cs, 24, 0.03, 0.02));
    function canAt(px) {
      for (var j = 0; j < CANOPY.length - 1; j++)
        if (px >= CANOPY[j][0] && px <= CANOPY[j + 1][0]) {
          var f = (px - CANOPY[j][0]) / (CANOPY[j + 1][0] - CANOPY[j][0]);
          return [M(CANOPY[j][1] + (CANOPY[j + 1][1] - CANOPY[j][1]) * f), Z(CANOPY[j][2] + (CANOPY[j + 1][2] - CANOPY[j][2]) * f)];
        }
      return [M(CANOPY[0][1]), Z(CANOPY[0][2])];
    }
    for (i = 0; i < FRAMES.length; i++) {
      var tp = canAt(FRAMES[i]);
      var rr = ringOf(sec(X(FRAMES[i]), 0, zs, tp[0] + 0.012, tp[1] - zs + 0.012, 0.06), 24);
      for (var j = 0; j < 12; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 24], 0.02, 4));
    }
    for (s = -1; s <= 1; s += 2) K.dark.push(bar([X(358), s * M(30), zs + 0.01], [X(540), s * M(36), zs + 0.01], 0.016, 4));

    /* ---- intake trunks and ducts */
    for (s = -1; s <= 1; s += 2) {
      var ts = [];
      for (i = 0; i < TRUNK.length; i++) {
        r = TRUNK[i];
        ts.push(sec(X(r[0]), s * M(r[1]), Z(r[3]), M(r[2]), M(r[4]), M(r[4]), r[5], r[5]));
      }
      push(K.skin, loft(ts, 20, null, 0.2));
      var m0 = TRUNK[0], mx0 = X(m0[0]), my0 = s * M(m0[1]), mz0 = Z(m0[3]), mw = M(m0[2]), mh = M(m0[4]);
      push(K.dark, loft([sec(mx0 - 0.45, my0, mz0, mw - 0.05, mh - 0.05, mh - 0.05, m0[5], m0[5]),
                         sec(mx0 + 0.004, my0, mz0, mw - 0.012, mh - 0.012, mh - 0.012, m0[5], m0[5])], 20, null, null));
      K.dark.push(capOf(sec(mx0 - 0.44, my0, mz0, mw - 0.06, mh - 0.06, mh - 0.06, m0[5], m0[5]), 20, 0, true));
      var lip = ringOf(sec(mx0 + 0.005, my0, mz0, mw + 0.002, mh + 0.002, mh + 0.002, m0[5], m0[5]), 20);
      for (i = 0; i < 20; i++) K.skin.push(bar(lip[i], lip[(i + 1) % 20], 0.018, 4));
    }

    /* ---- LERX: a thin plate at the wing plane from the intake lip to the
       wing root (A plan) */
    for (s = -1; s <= 1; s += 2) {
      var top = [], bot = [], lz = WZ;
      for (i = 0; i < LERX.length; i++) {
        top.push([X(LERX[i][0]), s * M(LERX[i][1]), lz + 0.03]);
        bot.push([X(LERX[i][0]), s * M(LERX[i][1]), lz - 0.03]);
      }
      top.push([X(760), s * 0.60, lz + 0.05]); bot.push([X(760), s * 0.60, lz - 0.05]);
      top.push([X(548), s * 0.60, lz + 0.05]); bot.push([X(548), s * 0.60, lz - 0.05]);
      K.skin.push(sloft([top, bot]));
    }

    /* ---- wing: a loft of 4.8 % aerofoil sections, root (inside the body)
       to tip, no dihedral */
    for (s = -1; s <= 1; s += 2) {
      var ws = [], WST = [0.35, 0.80, 1.4, 2.0, 2.8, 3.5, WTIP];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        ws.push(foil([wLE(y), s * y, WZ], [wTE(y), s * y, WZ], wT(y), [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      var plate = function (yy) {
        var zz = WZ + wT(yy) * 0.47 + 0.012;
        return blk([wLE(yy), s * yy, zz], [wTE(yy), s * yy, zz], 0.35, 0.72, 0.012, [0, 0, 1]);
      };
      K.team.push(sloft([plate(3.05), plate(3.45)]));
      /* tip launch rail (A: px 718..925, the wing tip to half-width 337.5) */
      K.under.push(box(X(718) - X(925), 0.11, 0.07, (X(718) + X(925)) / 2, s * 4.015, WZ));
    }

    /* ---- stabilator, low on the rear body, with anhedral */
    for (s = -1; s <= 1; s += 2) {
      var ss = [], SST = [0.45, 0.85, 1.5, STIP];
      for (i = 0; i < SST.length; i++) {
        y = SST[i];
        ss.push(foil([sLE(y), s * y, sZ(y)], [sTE(y), s * y, sZ(y)], (sLE(y) - sTE(y)) * 0.04, [0, 0, 1]));
      }
      K.skin.push(sloft(ss));
    }

    /* ---- fin, its dorsal fillet */
    function finSec(z, t) { return foil([fLE(z), 0, z], [fTE(z), 0, z], t, [0, 1, 0]); }
    K.skin.push(sloft([finSec(0.28, 0.13), finSec(0.70, 0.12), finSec(1.5, 0.09), finSec(2.2, 0.06), finSec(FTOP, 0.05)]));
    /* the fin tip cap (A: py 14..15 flat from px 1068 to 1131) */
    var fill = [[895, 178], [942, 172], [962, 164], [977, 145], [1000, 185]];
    var fa = [], fb = [];
    for (i = 0; i < fill.length; i++) {
      var w = i === fill.length - 1 ? 0.07 : 0.035 + 0.02 * i / fill.length;
      fa.push([X(fill[i][0]), w, Z(fill[i][1])]); fb.push([X(fill[i][0]), -w, Z(fill[i][1])]);
    }
    K.skin.push(sloft([fa, fb]));

    jetpipes(K);

    /* ---- stores: centreline tank on a short pylon, tip AIM-9s */
    var tx0 = X(480), tx1 = X(910), tz = Z(320);
    pylon(K.under, X(620), X(800), 0, Z(284), tz + 0.27, 0.10);
    push(K.under, revolve(P_TANK, tx0 - tx1, M(25), (tx0 + tx1) / 2, 0, tz, 18));
    var ax0 = X(690), ax1 = X(930), az = Z(248);
    for (s = -1; s <= 1; s += 2) {
      push(K.missile, revolve(P_AIM9, ax0 - ax1, 0.0635, (ax0 + ax1) / 2, s * M(737.5 - 393), az, 12));
      /* canards (A plan: px 718..735, 0.36 m across) and tail fins (px
         880..925, 0.44 m across, A py 375 at their tips) */
      fins(K.missile, X(722), s * M(737.5 - 393), az, 0.10, 0.05, 0.06, 0.18, 0, 0.006);
      fins(K.missile, X(880), s * M(737.5 - 393), az, 0.40, 0.10, 0.25, 0.22, 0, 0.006);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.under, T.under, "under");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzle");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.missile, T.missile, "aim9");

    /* ---- landing gear (A wheels; B, C legs and doors): it retracts, so
       "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = GEAR.nx, nr = GEAR.nr, nz = GEAR.nz, kz = Z(276);
    G.metal.push(bar([nx + 0.06, 0, kz + 0.05], [nx + 0.03, 0, nz + 0.30], 0.06, 10));          /* nose leg */
    G.metal.push(bar([nx + 0.03, 0, nz + 0.36], [nx + 0.03, 0, nz + 0.18], 0.045, 8));
    for (s = -1; s <= 1; s += 2) G.metal.push(bar([nx + 0.03, s * 0.10, nz + 0.20], [nx, s * 0.10, nz], 0.028, 6));   /* fork */
    G.metal.push(cyl(0.03, 0.03, 0.22, 6, "y", nx + 0.03, 0, nz + 0.20));
    G.metal.push(bar([nx - 0.75, 0, kz + 0.02], [nx + 0.04, 0, nz + 0.65], 0.03, 6));           /* drag brace */
    G.tyre.push(cyl(nr, nr, 0.16, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.17, 12, "y", nx, 0, nz));
    for (s = -1; s <= 1; s += 2) G.door.push(box(0.9, 0.02, 0.22, nx - 0.15, s * 0.20, kz - 0.08));   /* bay doors */
    var mx = GEAR.mx, mr = GEAR.mr, mz = GEAR.mz, my = GEAR.my, wb = WZ - 0.06;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.05, s * (my - 0.14), wb], [mx, s * (my - 0.14), mz + 0.10], 0.065, 10));   /* main leg */
      G.metal.push(bar([mx + 0.75, s * (my - 0.30), wb], [mx + 0.03, s * (my - 0.15), mz + 0.55], 0.03, 6)); /* brace */
      G.metal.push(cyl(0.05, 0.05, 0.22, 8, "y", mx, s * (my - 0.06), mz));
      G.tyre.push(cyl(mr, mr, 0.21, 24, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.22, 14, "y", mx, s * my, mz));
      /* the leg door (C: hung inboard of the leg, from the wing to just
         above the wheel) */
      G.door.push(box(0.60, 0.02, (wb - (mz + mr + 0.05)), mx + 0.10, s * (my - 0.24), (wb + mz + mr + 0.05) / 2));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.door, T.under, "gear_doors");
    return g;
  }

  return { build: function (THREE, M2, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured X extent: probe tip (7.34) to the nozzle exit (-7.35) */
UNIT_MODELS["roc_e80_fighter"] = { len: 14.69, build: HeroF5.build };
