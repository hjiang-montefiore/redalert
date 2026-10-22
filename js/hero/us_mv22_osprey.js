/* ======= us_mv22_osprey.js - HERO model: the Bell Boeing MV-22B Osprey (USMC) =======
   One def: nato_e00_mv22 (eras.js), the Marines' tiltrotor, role assaulthelo,
   which flies from the Wasps, the Tarawas and the Americas (rules.js lha_n
   deckTakes; eras.js USMC). Until now js/rotor_specs.js drew it as a
   stand-in, the CH-46E, because the parametric rotorcraft builder makes no
   tiltrotor; this file replaces that.

   DRAWN IN HELICOPTER MODE. The game flies it with the helicopter hover
   machinery and render3d.js cannot tilt a nacelle, so the nacelles stand
   VERTICAL, as the aircraft is seen hovering, landing and parked on a deck,
   with the two proprotors turning in the horizontal plane.

   REFERENCES, and what each gave
     Drawing: Wikimedia Commons "Bell Boeing MV-22 Osprey line drawing.svg"
       (CC BY 3.0), six views. Its helicopter-mode side, front and top views
       were read by a background flood fill at 26.0 px to the metre (455 px
       from the probe tip to the fin trailing edge = the published 17.48 m;
       the front view's nacelle centres then stand 14.08 m apart against the
       14.17 m the published width with rotors gives). The station table, the
       sponson, wing, nacelle, H-tail and fin outlines below come from it.
       Its heights do not all agree with the published ones (its nacelle is
       some 7% too tall against its own fin): the fuselage heights are the
       drawing's above the belly, times 0.955, on the 0.50 m belly clearance
       the side photographs show, which puts the fin top at the published
       17 ft 7.8 in; the nacelle is set to the published 22 ft 1 in.
     Text: en.wikipedia "Bell Boeing V-22 Osprey" (specification after
       Norton, Boeing, the Bell guide and NAVAIR; read 2026-10-22): length
       57 ft 4 in (17.48 m), span 45 ft 10 in, width with rotors turning
       84 ft 6.8 in (25.78 m), height 22 ft 1 in with the nacelles vertical
       and 17 ft 7.8 in to the top of the fins, two three-bladed proprotors
       of 38 ft 1 in (11.61 m); for storage "its rotors fold in 90 seconds and
       its wing rotates to align, front-to-back, with the fuselage"; armament
       one M240 or M2 on the ramp, the GAU-17 belly turret an option.
     Photographs (Commons, small downloads): 168290 of VMM-166 side on at
       Miramar, 2014 (gear, ramp line, heights, the starboard probe); the
       MV-22 MAGTF demonstration at Miramar 2014, hovering, starboard front
       three-quarter (nacelles, inlet, probe, FLIR ball, nose gear, door);
       164940 at the Patuxent River museum (nacelle and blade close up);
       JGSDF 91705 port side (profile, the port side's windows); HMX-1
       168284 at Mildenhall, 2016 (gear); VMM-263 on USS Iwo Jima, 2025
       (front three-quarter on deck, dihedral, sponsons); VMM-263 at
       Twentynine Palms, 2019 (rear: ramp, H-tail, twin fins); the first
       production Osprey with its wing rotated, 2002 (the stowed shape).

   RECOGNITION FEATURES (each drawn; where it rests)
     1. A boxy fuselage, flat-sided and flat-bellied with a rounded roof,
        2.6 m across, on a belly 0.5 m off the ground (drawing top and side
        views; VMM-166 side photograph).
     2. The big sponsons low on both sides, 4.7 m across them, from the
        crew door to the ramp, the main gear in them (drawing top and front
        views; Iwo Jima and Miramar photographs).
     3. A high shoulder wing on a fairing over the cabin, swept FORWARD
        4.5 deg at constant 2.5 m chord, with 5.9 deg of dihedral (drawing
        top and front views; Iwo Jima and Twentynine Palms photographs).
     4. The wingtip nacelles standing vertical, slab-sided, with the round
        engine inlet on the forward face at wing height and the V-shaped
        panel on each face (drawing; Miramar, VMM-166 and museum photos).
     5. Two big three-bladed proprotors, 11.61 m across, on black spinners,
        counter-rotating (published diameter; every photograph).
     6. The H-tail: a horizontal stabilizer on the tail with the twin fins
        at its tips, standing above and below it (drawing side, top and
        front views; Twentynine Palms photograph).
     7. The cockpit glazing: the raked windshield, the side windows and
        the chin windows (drawing side view; Miramar photograph).
     8. The refuelling probe along the lower starboard side of the nose,
        reaching past the radome (Miramar and VMM-166 photographs; the
        drawing puts the probe tip 0.1 m ahead of the radome).
     9. The rear ramp: the belly sweeping up from the sponsons' end to the
        tail, its doors outlined on the skin (drawing side view; VMM-166 and
        Twentynine Palms photographs). Drawn shut.
    10. The FLIR ball under the nose and the twin-wheel nose gear just
        behind the radome (Miramar photograph).
    11. The long dorsal fairing from the wing to the tail with its blade
        aerials (drawing top and side views).

   NOT DRAWN, and why
     - No gun and nothing named "turret": the row carries no weapon
       (weapons:[]); the M240 or M2 rides inside on the ramp, and the GAU-17
       belly turret was an option that retracts into the belly.
     - No "wingfold". The real stowage folds the blades along the wing,
       tilts the nacelles forward and turns the whole wing fore-and-aft on a
       ring over the cabin. render3d.js leaves a stopped rotor at whatever
       angle it stopped, so a blade fold - which needs the blades indexed -
       cannot be drawn honestly; and tools/jsc/wingfold_check.js holds that
       only the listed folding-wing types carry fold groups. On a deck it
       stands spread, as it does on the spot while it loads and launches.
     - No serials, squadron marks or "MARINES"; the low-visibility
       star-and-bar on the aft fuselage sides only, painted the way
       us_f35_family.js paints its insignia.

   ROTORS. Each proprotor head is a node named "rotor", hung the way the
   hero helicopters hang theirs (m3d_round2 conventions, section 4): a mount
   group turned +PI/2 about X puts the rotor's local +Y up the shaft, and a
   head group turned -PI/2 inside it lets the head be built in model axes.
   render3d.js turns the FIRST head positively about its local axis nearest
   the machine's up and every next head the other way. The port head is
   built first with that axis up, so it turns anti-clockwise seen from
   above and the starboard head clockwise: the blades sweep forward on the
   inboard side, which is the V-22's "inboard-down" sense in aeroplane mode
   (left proprotor clockwise and right anticlockwise seen from behind). That
   sense rests on the museum blades' swept tips (the trailing edge reaches
   further) and on a forum statement, not on a manual: see the report. The
   blades are built pitched for that sense, leading edge up.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent: probe tip
   +6.80 to the fin trailing edges -10.68, 17.48 m, the published length.
   The proprotor hubs stand on the conversion axis 6.80 m behind the probe
   tip, so a blade reaches 5.81 m either way and never sets it.

   DRAWN SIZE. The game draws an aircraft r x 2.24 m long (render3d.js):
   this row (r 15) 33.6 m, 1.92 times its real size, so the 15.5 m across
   the nacelles stands 29.8 m across, against an airbase revetment's 22.8 m
   between its walls. At its real proportions it reaches through a wall
   there, as the types on tools/jsc/parked3d_check.js's OVERSIZE list do.
   On the assault ships' decks it parks clear of the island and of the
   machines beside it (the same check, section C).

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. x = 6.80 - d,
   d measured aft from the probe tip; the hubs are at x = 0. Heights are
   written above the ground: the origin stands 2.0 m above it (GROUND).
   Materials: SKIN (one 1024 x 2048 CanvasTexture in four projected bands),
   GLASS, DARK fittings, TEAM (exactly C.team), the ROTOR head's paint per
   vertex, the rotor DISC, METAL and TYRE in the gear group. The airframe
   is one mesh per material; each rotor two; the gear three. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMV22 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  var GROUND = -2.0;
  function Z(h) { return GROUND + h; }
  var XR = 6.80;                           /* probe tip ahead of the hubs */
  function D(d) { return XR - d; }
  var NAC_Y = 7.085;                       /* (84 ft 6.8 in - 38 ft 1 in) / 2 */
  var ROTOR_R = 5.805;                     /* 38 ft 1 in                  */
  var HUB_H = 6.12;                        /* blade plane above the ground */
  var SPIN_TOP = 6.73;                     /* 22 ft 1 in, nacelles vertical */
  /* the wing: constant 2.5 m chord, root leading edge at d 5.88 where it
     meets the fuselage side (y 1.28), swept forward 4.45 deg to the tip;
     its chord plane 3.36 m up at the root, rising 5.9 deg outboard */
  var W_Y0 = 1.28, W_LE0 = D(5.88), W_CH = 2.50, W_SW = 0.078, W_DH = Math.tan(5.9 * D2R);
  var W_Z0 = 3.36, W_T = 0.56;
  function wLE(y) { return W_LE0 + Math.max(0, Math.abs(y) - W_Y0) * W_SW; }
  function wZ(y) { return Z(W_Z0 + Math.max(0, Math.abs(y) - W_Y0) * W_DH); }
  /* the H-tail: the stabilizer 2.95 m up, the fins at its tips */
  var ST_H = 2.95, ST_Y = 2.62, FIN_Y = 2.62;

  /* ------------------------------------------------------ paint scheme
     The Marines' tactical grey as the sunlit photographs show it: the
     museum's 164940 samples #8c9199 and the hovering Miramar machine
     #838391; taken to 0.9 of their mean, as the brief asks, it is the
     #727882 below, beside the accepted US flat-tops' #737a81. */
  var SC = { base: "#727882", light: "#7c828c", dark: "#666c75", belly: "#6e747d", seed: 2207 };

  /* =================================================== the painted skin ===
     One 1024 x 2048 sheet in four bands, each a projection of the airframe
     in model metres:
        band 0  TOP        rows    0 -  640: x across, y down (port at top)
        band 1  PORT side  rows  640 - 1024: x across, z down
        band 2  STARBOARD  rows 1024 - 1408: x across, z down
        band 3  BELLY      rows 1408 - 2048: x across, y down
     The top and belly bands reach the wingtips (|y| 7.9). */
  var TW = 1024, TH = 2048;
  var B0 = [0, 640], B1 = [640, 1024], B2 = [1024, 1408], B3 = [1408, 2048];
  var UX0 = -10.95, UX1 = 7.05;
  var QY = 7.9;
  var QZ0 = Z(-0.1), QZ1 = Z(7.0);
  var SX = TW / (UX1 - UX0);
  function pxX(x)        { return (x - UX0) * SX; }
  function pyTop(y)      { return B0[0] + (QY - y) / (2 * QY) * (B0[1] - B0[0]); }
  function pyBelly(y)    { return B3[0] + (QY - y) / (2 * QY) * (B3[1] - B3[0]); }
  function pySide(z, b)  { var B = b === 1 ? B1 : B2; return B[0] + (QZ1 - z) / (QZ1 - QZ0) * (B[1] - B[0]); }
  var SYT = (B0[1] - B0[0]) / (2 * QY);    /* px per metre across, top    */
  var SZS = (B1[1] - B1[0]) / (QZ1 - QZ0); /* px per metre up, the sides  */

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* the low-visibility star-and-bar, a shade off the skin, drawn as
     us_f35_family.js draws it (insignia(), the US branch) */
  function insignia(g, u, v, r, sy) {
    var i, a;
    g.save(); g.translate(u, v); g.scale(1, sy);
    g.fillStyle = "rgba(92,102,110,0.72)";
    g.beginPath(); g.arc(0, 0, r, 0, PI * 2); g.closePath(); g.fill();
    g.fillRect(-r * 2.0, -r * 0.32, r * 4.0, r * 0.64);
    g.fillStyle = "rgba(152,160,166,0.60)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -PI / 2 + i * PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.92;
      if (i === 0) g.moveTo(rr * Math.cos(a), rr * Math.sin(a));
      else g.lineTo(rr * Math.cos(a), rr * Math.sin(a));
    }
    g.closePath(); g.fill();
    g.restore();
  }

  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed);
    var i, b, x, y, s;

    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);
    /* repainted panels a shade off their neighbours */
    for (i = 0; i < 260; i++) {
      var pw = (0.4 + R() * 1.5) * SX, ph = 8 + R() * 34;
      g.fillStyle = (i & 1) ? SC.light : SC.dark;
      g.globalAlpha = 0.18 + R() * 0.26;
      g.fillRect(4 + R() * (TW - 60), 4 + R() * (TH - 60), pw, ph);
    }
    g.globalAlpha = 1;
    /* a sun-faded top, grime down the sides, a dirtier belly */
    g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(0, B0[0], TW, B0[1] - B0[0]);
    for (i = 0; i < 240; i++) {
      g.fillStyle = "rgba(20,20,18," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, B1[0] + R() * (B2[1] - B1[0]), 2 + R() * 4, 10 + R() * 40);
    }
    g.fillStyle = SC.belly; g.globalAlpha = 0.6; g.fillRect(0, B3[0], TW, B3[1] - B3[0]); g.globalAlpha = 1;
    for (i = 0; i < 140; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.04 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, B3[0] + R() * (B3[1] - B3[0]), 20 + R() * 90, 6 + R() * 20);
    }

    function line(pts, w, a) {
      g.strokeStyle = "rgba(0,0,0," + (a || 0.32) + ")"; g.lineWidth = w || 1.4;
      g.beginPath();
      for (var k = 0; k < pts.length; k++) { if (k) g.lineTo(pts[k][0], pts[k][1]); else g.moveTo(pts[k][0], pts[k][1]); }
      g.stroke();
    }
    function sd(xx, h, bb) { return [pxX(xx), pySide(Z(h), bb)]; }
    function tp(xx, yy) { return [pxX(xx), pyTop(yy)]; }
    function bl(xx, yy) { return [pxX(xx), pyBelly(yy)]; }

    /* ---- fuselage frames at stations: across the sides, the top over the
       cabin and the belly ---- */
    var frames = [1.0, 1.55, 2.30, 2.85, 3.50, 4.45, 5.20, 6.10, 7.00, 7.90, 8.80,
                  9.70, 10.60, 11.50, 12.40, 13.30, 14.20, 15.10];
    /* The side bands are shared with the nacelles' faces (x -0.65 to 1.25,
       above 1.25 m), so nothing of the fuselage's side is drawn there above
       the sponson. */
    var NX0 = -0.75, NX1 = 1.35;
    function clearOfNacelle(xx) { return xx < NX0 || xx > NX1; }
    for (i = 0; i < frames.length; i++) {
      x = pxX(D(frames[i]));
      if (clearOfNacelle(D(frames[i])))
        for (b = 1; b <= 2; b++) line([[x, pySide(Z(0.55), b)], [x, pySide(Z(2.95), b)]], 1.3, 0.26);
      line([[x, pyTop(1.3)], [x, pyTop(-1.3)]], 1.2, 0.24);
      line([[x, pyBelly(1.3)], [x, pyBelly(-1.3)]], 1.2, 0.24);
    }
    /* stringers along the sides and the roof */
    [0.75, 1.30, 2.10, 2.65].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        if (h < 1.2) { line([sd(D(1.6), h, bb), sd(D(15.0), h, bb)], 1.1, 0.20); continue; }
        line([sd(D(1.6), h, bb), sd(NX1, h, bb)], 1.1, 0.20);
        line([sd(NX0, h, bb), sd(D(15.0), h, bb)], 1.1, 0.20);
      }
    });
    [-0.75, 0.75].forEach(function (q) { line([tp(D(2.4), q), tp(D(15.2), q)], 1.1, 0.22); });

    /* ---- the crew door, starboard, forward of the wing: the upper half
       slides up, the lower drops as steps (Miramar, Iwo Jima) ---- */
    var dx0 = D(3.45), dx1 = D(4.45);
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.4;
    g.strokeRect(pxX(dx1), pySide(Z(2.62), 2), pxX(dx0) - pxX(dx1), pySide(Z(0.92), 2) - pySide(Z(2.62), 2));
    line([sd(dx1, 1.72, 2), sd(dx0, 1.72, 2)], 1.6, 0.45);

    /* ---- the ramp: the lower ramp from the cabin floor's end at d 11.0
       to d 13.9, the upper door on to the tail; their edges up the sides
       just above the ramp line ---- */
    line([bl(D(11.0), 1.05), bl(D(11.0), -1.05)], 2.4, 0.55);
    line([bl(D(11.0), 1.05), bl(D(13.9), 1.0)], 2.2, 0.5);
    line([bl(D(11.0), -1.05), bl(D(13.9), -1.0)], 2.2, 0.5);
    line([bl(D(13.9), 1.0), bl(D(13.9), -1.0)], 2.0, 0.5);
    line([bl(D(13.9), 0.95), bl(D(15.2), 0.9)], 1.8, 0.45);
    line([bl(D(13.9), -0.95), bl(D(15.2), -0.9)], 1.8, 0.45);
    line([bl(D(12.4), 0.0), bl(D(13.85), 0.0)], 1.2, 0.3);
    for (b = 1; b <= 2; b++) {
      line([sd(D(11.0), 0.62, b), sd(D(12.4), 1.18, b), sd(D(13.9), 1.98, b), sd(D(15.2), 2.62, b)], 2.0, 0.48);
      line([sd(D(13.9), 1.98, b), sd(D(13.9), 2.30, b)], 1.6, 0.4);
    }

    /* ---- the sponsons: fuel bay panels along their sides and the main
       gear doors under them ---- */
    for (b = 1; b <= 2; b++) {
      line([sd(D(5.4), 1.10, b), sd(D(12.2), 1.10, b)], 1.2, 0.26);
      for (s = 1; s < 4; s++) {
        var sx0 = D(6.0 + s * 1.5);
        g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.2;
        g.strokeRect(pxX(sx0 - 1.1), pySide(Z(1.70), b), 1.0 * SX, 0.45 * SZS);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2.0;
      var gy0 = pyBelly(s * 2.15), gy1 = pyBelly(s * 1.62);
      g.strokeRect(pxX(D(9.0)), Math.min(gy0, gy1), 2.0 * SX, Math.abs(gy1 - gy0));
    }
    /* nose gear doors */
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 1.8;
    g.strokeRect(pxX(D(2.10)), pyBelly(0.30), 1.05 * SX, 0.60 * SYT);

    /* ---- the wing: flaperons over the after 26% of the chord from the
       root fairing to the tip, their hinge brackets, the walkway and the
       spar lines; the same lines underneath ---- */
    function wingLines(P, sgnY) {
      var y0 = sgnY * 1.45, y1 = sgnY * 6.35;
      var le0 = wLE(y0), le1 = wLE(y1);
      line([P(le0 - W_CH * 0.74, y0), P(le1 - W_CH * 0.74, y1)], 2.0, 0.5);
      line([P(le0 - W_CH * 0.74, y0), P(le0 - W_CH, y0)], 1.6, 0.45);
      line([P(le0 - W_CH * 0.74, sgnY * 3.95), P(le0 - W_CH, sgnY * 3.95)], 1.6, 0.45);
      line([P(le0 - 0.18, y0), P(le1 - 0.18, y1)], 1.2, 0.30);
      line([P(le0 - W_CH * 0.58, y0), P(le1 - W_CH * 0.58, y1)], 1.0, 0.22);
      for (var k = 0; k < 6; k++) {
        var yy = y0 + (y1 - y0) * (k + 0.5) / 6, xx = wLE(yy) - W_CH * 0.74;
        g.fillStyle = "rgba(0,0,0,0.45)";
        var p = P(xx - 0.15, yy); g.fillRect(p[0] - 2, p[1] - 2, 0.30 * SX, 4);
      }
    }
    wingLines(tp, 1); wingLines(tp, -1); wingLines(bl, 1); wingLines(bl, -1);
    /* the stow ring under the wing's middle, seen from above */
    g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = 1.6;
    g.beginPath(); g.ellipse(pxX(D(6.9)), pyTop(0), 1.05 * SX, 0.95 * SYT, 0, 0, PI * 2); g.stroke();

    /* ---- the nacelles: the big V on every face, the cowl seams ---- */
    for (b = 1; b <= 2; b++) {
      line([sd(-0.45, 5.30, b), sd(0.32, 3.90, b), sd(1.08, 5.30, b)], 2.6, 0.55);
      line([sd(-0.30, 5.30, b), sd(0.32, 4.15, b), sd(0.94, 5.30, b)], 1.2, 0.30);
      line([sd(-0.58, 2.30, b), sd(1.20, 2.30, b)], 1.4, 0.35);
      line([sd(-0.58, 4.90, b), sd(1.20, 4.90, b)], 1.2, 0.30);
    }
    /* exhaust soot at the nacelle feet */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(0, pySide(Z(1.25), b), 0, pySide(Z(2.2), b));
      sg.addColorStop(0, "rgba(16,15,13,0.45)"); sg.addColorStop(1, "rgba(16,15,13,0)");
      g.fillStyle = sg;
      g.fillRect(pxX(-0.2), pySide(Z(2.2), b), 1.3 * SX, pySide(Z(1.25), b) - pySide(Z(2.2), b));
    }

    /* ---- the H-tail: the stabilizer's elevator line, the fins' rudders */
    for (s = -1; s <= 1; s += 2) {
      line([tp(D(16.85), s * 0.30), tp(D(16.85), s * 2.50)], 1.8, 0.45);
      line([bl(D(16.85), s * 0.30), bl(D(16.85), s * 2.50)], 1.8, 0.45);
    }
    for (b = 1; b <= 2; b++) {
      line([sd(D(16.95), 3.05, b), sd(D(16.95), 5.25, b)], 1.6, 0.42);
      line([sd(D(16.95), 2.10, b), sd(D(16.95), 2.80, b)], 1.6, 0.42);
    }

    /* access hatches here and there */
    for (i = 0; i < 90; i++) {
      var hx = 10 + R() * (TW - 50), hy = 10 + R() * (TH - 50), hw = 8 + R() * 26, hh = 6 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.1; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- the national insignia: the low-visibility star-and-bar on the
       aft fuselage sides, above the sponsons' end (VMM-166, Miramar and the
       2002 photograph). Nothing else. ---- */
    for (b = 1; b <= 2; b++) insignia(g, pxX(D(12.0)), pySide(Z(2.28), b), 0.34 * SZS, 1);

    /* keep the edges plain: clamped and unmapped texels read the base */
    g.fillStyle = SC.base;
    g.fillRect(0, 0, 3, TH); g.fillRect(TW - 3, 0, 3, TH); g.fillRect(0, TH - 3, TW, 3); g.fillRect(0, 0, TW, 3);
    return cv;
  }

  var _cv = null, _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    try {
      if (!_cv) _cv = skinCanvas();
      var t = new V.CanvasTexture(_cv);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;   /* r148 */
      _tex = t;
    } catch (e) { _tex = false; }
    return _tex;
  }

  /* Face-normal projection into the four bands. A face looking mostly fore
     or aft is laid out along x + y on a side band. */
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
      var B = band === 0 ? B0 : band === 1 ? B1 : band === 2 ? B2 : B3;
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W;
        if (band === 0)      { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else {
          /* the nacelles' and the wing's end faces keep plain x: their
             columns of the side bands are kept clear (skinCanvas) */
          var sh = endOn && Math.abs(y) < 3 ? (band === 1 ? y : -y) * 0.15 : 0;
          U = pxX(x + sh); W = pySide(z, band);
        }
        U = Math.max(4, Math.min(TW - 4, U));
        W = Math.max(B[0] + 4, Math.min(B[1] - 4, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials == */
  function makeMats(C) {
    var tex = skinTexture();
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.66, metalness: 0.30 });
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.46, metalness: 0.62 });
    /* tyres: near-black, which eraPaint leaves alone */
    m.tyre   = new V.MeshStandardMaterial({ color: 0x0b0c0c, roughness: 0.95, metalness: 0.02 });
    /* the rotor heads: black spinners and hubs, dark grey composite blades,
       painted per vertex (one draw call a head) */
    m.rotor  = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.74, metalness: 0.14 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x080d10, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
    /* exactly C.team, so eraPaint's team test leaves it alone; the
       emissive keeps it from greying out under ACES */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ====================================================== geometry kit ==
     (the hero helicopters' kit: hero/h60_hawk_family.js) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function bar2(p, q, r0, r1, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r1, r0, L, seg, 1, true);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function disc(r, seg, c, n) {
    var g = new V.CircleGeometry(r, seg);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1),
      new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function inward(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, n = g.attributes.normal.array, t, k, tmp;
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
    }
    for (t = 0; t < n.length; t++) n[t] = -n[t];
    return g;
  }
  /* the starboard twin of a port part (corners swapped back) */
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var u = g.attributes.uv ? g.attributes.uv.array : null;
    var c = g.attributes.color ? g.attributes.color.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) {
      for (k = 0; k < 3; k++) {
        tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
        if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
        if (c) { tmp = c[t * 9 + 3 + k]; c[t * 9 + 3 + k] = c[t * 9 + 6 + k]; c[t * 9 + 6 + k] = tmp; }
      }
      if (u) for (k = 0; k < 2; k++) {
        tmp = u[t * 6 + 2 + k]; u[t * 6 + 2 + k] = u[t * 6 + 4 + k]; u[t * 6 + 4 + k] = tmp;
      }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
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
  /* one mesh painted per vertex from [geometry, sRGB hex] pairs; colours
     stored linear (render3d.js converts material colours only) */
  function linRGB(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  function vcGeo(list) {
    var pos = [], nor = [], col = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i][0]), c = linRGB(list[i][1]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3; j++) col.push(c[0], c[1], c[2]);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("color", new V.Float32BufferAttribute(col, 3));
    return out;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var out1 = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (out1 >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  function pod(secs) {
    var faces = [secs[0], secs[secs.length - 1]], q, j, n = secs[0].length;
    for (q = 0; q < secs.length - 1; q++)
      for (j = 0; j < n; j++)
        faces.push([secs[q][j], secs[q][(j + 1) % n], secs[q + 1][(j + 1) % n], secs[q + 1][j]]);
    return convex(faces);
  }
  /* A tube through rings of 3D points (same count, convex), each quad wound
     away from the middle of its two rings; the ends capped from their
     centroids unless asked not to. */
  function tube(rings, capA, capB) {
    var out = [], q, j, n = rings[0].length;
    function cen(r) { var c = [0, 0, 0]; for (var k = 0; k < r.length; k++) { c[0] += r[k][0]; c[1] += r[k][1]; c[2] += r[k][2]; } return [c[0] / r.length, c[1] / r.length, c[2] / r.length]; }
    function push(a, b, c, o) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      if (nx * (a[0] - o[0]) + ny * (a[1] - o[1]) + nz * (a[2] - o[2]) >= 0) out.push(a, b, c); else out.push(a, c, b);
    }
    for (q = 0; q < rings.length - 1; q++) {
      var A = rings[q], B = rings[q + 1], ca = cen(A), cb = cen(B);
      var o = [(ca[0] + cb[0]) / 2, (ca[1] + cb[1]) / 2, (ca[2] + cb[2]) / 2];
      for (j = 0; j < n; j++) {
        var j2 = (j + 1) % n;
        push(A[j], B[j], A[j2], o);
        push(A[j2], B[j], B[j2], o);
      }
    }
    /* a cap is wound away from the neighbouring ring's middle */
    function cap(R, Rn) {
      var c = cen(R), cn = cen(Rn);
      for (var k = 0; k < R.length; k++) push(c, R[k], R[(k + 1) % R.length], cn);
    }
    if (capA) cap(rings[0], rings[1]);
    if (capB) cap(rings[rings.length - 1], rings[rings.length - 2]);
    return tris(out);
  }
  /* an aerofoil ring: leading edge le, trailing edge te ([x, z] in a
     plane), thickness t; at(x, z) places a chord-plane point in model
     space. Upper surface LE to TE, lower back. */
  var FOIL = [[0, 0], [0.02, 0.36], [0.07, 0.68], [0.16, 0.92], [0.30, 1.0], [0.48, 0.92], [0.66, 0.70], [0.84, 0.40], [1, 0.04]];
  function foilRing(le, te, t, at) {
    var r = [], k, f, h;
    for (k = 0; k < FOIL.length; k++) {
      f = FOIL[k][0]; h = FOIL[k][1] * t / 2;
      r.push(at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f + h));
    }
    for (k = FOIL.length - 2; k >= 1; k--) {
      f = FOIL[k][0]; h = FOIL[k][1] * t / 2;
      r.push(at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f - h));
    }
    return r;
  }

  /* ---- the loft (hero/h60_hawk_family.js): a section is a trapezoid
     with superelliptic corners; heights above ground; sections run nose to
     tail (decreasing x), wound outward. */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e) + s.yc, z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([2 * s.yc - pts[i][0], pts[i][1]]);
    return pts;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], rl = 2 * n, i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], r = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += r[j][0]; cz += r[j][1]; }
      var o = [s.x + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function latheZ(prof, seg, x, y) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateX(PI / 2);
    g.translate(x, y, 0);
    return g;
  }

  /* ---- surface patches cut from the loft and laid a few centimetres
     proud (hero/h60_hawk_family.js surfPt, patch) */
  function surfPt(secs, x, th) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x + 1e-9 && x >= B.x - 1e-9) {
        var f = (A.x - x) / (A.x - B.x);
        if (!secs.n) {
          var pa = ringPt(A, th), pb = ringPt(B, th);
          return [x, pa[0] + (pb[0] - pa[0]) * f, pa[1] + (pb[1] - pa[1]) * f];
        }
        var n = secs.n, u = (th + PI / 2) / (PI / n), j = Math.max(0, Math.min(n - 1, Math.floor(u))), g = u - j;
        var t0 = -PI / 2 + PI * j / n, t1 = t0 + PI / n;
        var a = ringPt(A, t0), b = ringPt(A, t1), c = ringPt(B, t0), d = ringPt(B, t1);
        if (f + g <= 1)
          return [x, a[0] + f * (c[0] - a[0]) + g * (b[0] - a[0]), a[1] + f * (c[1] - a[1]) + g * (b[1] - a[1])];
        return [x, d[0] + (1 - f) * (b[0] - d[0]) + (1 - g) * (c[0] - d[0]),
                   d[1] + (1 - f) * (b[1] - d[1]) + (1 - g) * (c[1] - d[1])];
      }
    }
    return null;
  }
  function thAtZ(secs, x, z) {
    var lo = -PI / 2, hi = PI / 2, i, m;
    for (i = 0; i < 40; i++) { m = (lo + hi) / 2; if (surfPt(secs, x, m)[2] < z) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function thAtY(secs, x, y) {
    var lo = 0, hi = PI / 2, i, m;
    for (i = 0; i < 40; i++) { m = (lo + hi) / 2; if (surfPt(secs, x, m)[1] > y) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function surfN(secs, x, th, x0, x1) {
    var e = 1e-3, dx = 0.01;
    var xa = Math.min(x0, x + dx), xb = Math.max(x1, x - dx);
    var pt = surfPt(secs, x, Math.min(PI / 2, th + e)), pm = surfPt(secs, x, Math.max(-PI / 2, th - e));
    var pa = surfPt(secs, xa, th), pb = surfPt(secs, xb, th);
    var t = [pt[0] - pm[0], pt[1] - pm[1], pt[2] - pm[2]], u = [pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]];
    var n = [t[1] * u[2] - t[2] * u[1], t[2] * u[0] - t[0] * u[2], t[0] * u[1] - t[1] * u[0]];
    var l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]) || 1;
    return [n[0] / l, n[1] / l, n[2] / l];
  }
  function patch(secs, xa, xb, t0, t1, nx, nt, off) {
    var P = [], N = [], i, j, pos = [], nor = [];
    var x0 = Math.max(xa, xb), x1 = Math.min(xa, xb);
    for (i = 0; i <= nx; i++) {
      var x = xa + (xb - xa) * i / nx, a = t0(x), b = t1(x);
      P.push([]); N.push([]);
      for (j = 0; j <= nt; j++) {
        var th = a + (b - a) * j / nt, p = surfPt(secs, x, th), n = surfN(secs, x, th, x0, x1);
        P[i].push([p[0] + n[0] * off, p[1] + n[1] * off, p[2] + n[2] * off]); N[i].push(n);
      }
    }
    function push(p, q, r, np, nq, nr) {
      var ux = q[0] - p[0], uy = q[1] - p[1], uz = q[2] - p[2], vx = r[0] - p[0], vy = r[1] - p[1], vz = r[2] - p[2];
      var fx = uy * vz - uz * vy, fy = uz * vx - ux * vz, fz = ux * vy - uy * vx;
      if (fx * (np[0] + nq[0] + nr[0]) + fy * (np[1] + nq[1] + nr[1]) + fz * (np[2] + nq[2] + nr[2]) < 0) {
        var t = q; q = r; r = t; t = nq; nq = nr; nr = t;
      }
      pos.push(p[0], p[1], p[2], q[0], q[1], q[2], r[0], r[1], r[2]);
      nor.push(np[0], np[1], np[2], nq[0], nq[1], nq[2], nr[0], nr[1], nr[2]);
    }
    for (i = 0; i < nx; i++) for (j = 0; j < nt; j++) {
      push(P[i][j], P[i + 1][j], P[i][j + 1], N[i][j], N[i + 1][j], N[i][j + 1]);
      push(P[i + 1][j], P[i + 1][j + 1], P[i][j + 1], N[i + 1][j], N[i + 1][j + 1], N[i][j + 1]);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    return g;
  }
  function lin(xa, va, xb, vb) { return function (x) { return va + (vb - va) * (x - xa) / (xb - xa); }; }
  function cnst(v) { return function () { return v; }; }

  /* ========================================================= the build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "mv22";
    var i, k, s;
    var skin = [], dark = [], team = [], glass = [];

    /* --------------------------------------------------- the fuselage ----
       The drawing's side and top views. The blunt radome with the FLIR ball
       under it; the windshield raked about 40 degrees from the radome's top
       at 1.8 m to the cockpit roof at 2.95 m; the cabin a box 2.56 m across
       with flat sides, a flat belly 0.50 m up and a rounded roof 3.0 m up,
       to the cabin floor's end at d 11.0; then the ramp, the belly sweeping
       up in a straight line to the tail at d 15.3, under a roof falling to
       2.8 m and rising again into the stabilizer.
                    d       zb    zt    zm    wb    wm    wt    e           */
    var FT = [
      [ 0.10, 1.30, 1.50, 1.40, 0.08, 0.11, 0.07, 0.85],
      [ 0.28, 1.04, 1.74, 1.38, 0.26, 0.34, 0.24, 0.74],
      [ 0.52, 0.88, 1.80, 1.32, 0.46, 0.56, 0.40, 0.64],
      [ 0.78, 0.76, 1.83, 1.30, 0.62, 0.74, 0.52, 0.56],
      [ 1.04, 0.67, 1.90, 1.29, 0.76, 0.88, 0.60, 0.50],
      [ 1.30, 0.60, 2.10, 1.30, 0.88, 1.00, 0.66, 0.45],
      [ 1.56, 0.55, 2.37, 1.34, 0.97, 1.08, 0.72, 0.41],
      [ 1.82, 0.52, 2.63, 1.42, 1.03, 1.14, 0.78, 0.38],
      [ 2.10, 0.50, 2.84, 1.50, 1.09, 1.19, 0.84, 0.35],
      [ 2.42, 0.50, 2.94, 1.56, 1.13, 1.24, 0.89, 0.33],
      [ 2.85, 0.50, 2.98, 1.60, 1.17, 1.27, 0.92, 0.31],
      [ 4.00, 0.50, 3.00, 1.62, 1.18, 1.28, 0.93, 0.30],
      [ 6.20, 0.50, 3.00, 1.62, 1.18, 1.28, 0.93, 0.30],
      [ 8.60, 0.50, 3.00, 1.62, 1.18, 1.28, 0.93, 0.30],
      [10.20, 0.50, 2.96, 1.62, 1.18, 1.28, 0.93, 0.30],
      [11.00, 0.50, 2.94, 1.62, 1.18, 1.28, 0.93, 0.30],
      [11.70, 0.74, 2.90, 1.74, 1.16, 1.27, 0.92, 0.30],
      [12.50, 1.06, 2.86, 1.92, 1.13, 1.25, 0.92, 0.30],
      [13.30, 1.43, 2.82, 2.13, 1.10, 1.23, 0.92, 0.30],
      [14.10, 1.85, 2.84, 2.36, 1.06, 1.19, 0.92, 0.32],
      [14.75, 2.18, 2.94, 2.56, 1.00, 1.13, 0.90, 0.34],
      [15.30, 2.47, 3.04, 2.76, 0.88, 1.02, 0.82, 0.38],
      [15.85, 2.62, 3.06, 2.85, 0.64, 0.78, 0.62, 0.46],
      [16.40, 2.76, 3.02, 2.89, 0.30, 0.40, 0.30, 0.60]
    ];
    var FUS = FT.map(function (r) { return sec(D(r[0]), r[1], r[2], r[3], r[4], r[5], r[6], r[7]); });
    var FUS_N = 14;
    FUS.n = FUS_N;
    var fl = loft(FUS, FUS_N, 0.04, 0.05);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), o = {};
          ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (kk) { o[kk] = A[kk] + (B[kk] - A[kk]) * f; });
          return o;
        }
      }
      return null;
    }

    /* ------------------------------------------------- the sponsons ----
       Low on both sides from the crew door (d 4.7) to the ramp (d 12.8):
       2.36 m out from the centreline at their widest (d 9.0), their top
       sloping down from 1.95 m at the cabin side, their belly level with
       the fuselage's and rising with the ramp at the back. A loft of its
       own per side, its inner half buried in the cabin side.
                d      outer  zb    zt    zm                                */
    var ST = [
      [ 4.70, 1.22, 0.70, 1.62, 1.12],
      [ 5.05, 1.56, 0.56, 1.86, 1.12],
      [ 5.55, 1.87, 0.53, 1.94, 1.12],
      [ 6.30, 2.12, 0.53, 1.96, 1.12],
      [ 7.20, 2.27, 0.53, 1.96, 1.12],
      [ 8.20, 2.34, 0.53, 1.96, 1.12],
      [ 9.10, 2.36, 0.53, 1.95, 1.12],
      [10.00, 2.22, 0.55, 1.94, 1.14],
      [10.90, 1.97, 0.60, 1.92, 1.18],
      [11.70, 1.70, 0.74, 1.90, 1.26],
      [12.30, 1.46, 0.92, 1.86, 1.36],
      [12.80, 1.20, 1.14, 1.76, 1.46]
    ];
    var SPN = ST.map(function (r) {
      var inner = 0.90, yc = (inner + r[1]) / 2, wm = (r[1] - inner) / 2;
      return sec(D(r[0]), r[2], r[3], r[4], wm * 0.86, wm, wm * 0.62, 0.55, yc);
    });
    var sp = loft(SPN, 8, 0.05, 0.05);
    for (i = 0; i < sp.length; i++) both(skin, sp[i]);

    /* ----------------------------------- the wing fairing and the spine --
       Over the cabin: the fairing rising from the cockpit roof to cover the
       wing's middle and its stow ring, then the dorsal fairing, 1.1 m wide,
       falling to the tail (drawing side and top views). */
    var DT = [
      [ 4.35, 2.86, 3.00, 2.93, 0.20, 0.24, 0.14, 0.70],
      [ 4.80, 2.86, 3.16, 2.96, 0.78, 0.84, 0.54, 0.50],
      [ 5.30, 2.86, 3.38, 3.00, 1.04, 1.10, 0.76, 0.46],
      [ 5.85, 2.86, 3.58, 3.06, 1.14, 1.18, 0.86, 0.46],
      [ 6.80, 2.86, 3.71, 3.10, 1.17, 1.20, 0.90, 0.46],
      [ 7.90, 2.86, 3.67, 3.10, 1.14, 1.18, 0.86, 0.46],
      [ 8.55, 2.86, 3.52, 3.06, 0.96, 1.00, 0.66, 0.48],
      [ 9.20, 2.84, 3.37, 3.02, 0.66, 0.70, 0.46, 0.52],
      [10.20, 2.80, 3.17, 2.98, 0.54, 0.57, 0.40, 0.55],
      [11.20, 2.76, 3.03, 2.92, 0.52, 0.55, 0.38, 0.56],
      [12.30, 2.70, 2.96, 2.86, 0.52, 0.55, 0.38, 0.56],
      [13.30, 2.66, 2.92, 2.82, 0.52, 0.55, 0.38, 0.56],
      [14.20, 2.68, 2.95, 2.84, 0.50, 0.53, 0.37, 0.56],
      [14.95, 2.78, 3.05, 2.93, 0.44, 0.47, 0.33, 0.58],
      [15.35, 2.90, 3.09, 3.00, 0.16, 0.20, 0.12, 0.70]
    ];
    var DORS = DT.map(function (r) { return sec(D(r[0]), r[1], r[2], r[3], r[4], r[5], r[6], r[7]); });
    var dl = loft(DORS, 8, 0.03, 0.03);
    for (i = 0; i < dl.length; i++) skin.push(dl[i]);
    /* blade aerials along the spine and on the cabin roof */
    function dorsTop(x) {
      for (var q = 0; q < DORS.length - 1; q++) {
        var A = DORS[q], B = DORS[q + 1];
        if (x <= A.x && x >= B.x) return A.zt + (B.zt - A.zt) * (A.x - x) / (A.x - B.x);
      }
      return Z(3.0);
    }
    [10.6, 12.4].forEach(function (dd) {
      var x = D(dd), zt = dorsTop(x);
      dark.push(convex([[[x + 0.12, -0.02, zt - 0.02], [x - 0.16, -0.02, zt - 0.02], [x - 0.22, -0.02, zt + 0.30], [x - 0.08, -0.02, zt + 0.30]],
                        [[x + 0.12, 0.02, zt - 0.02], [x - 0.16, 0.02, zt - 0.02], [x - 0.22, 0.02, zt + 0.30], [x - 0.08, 0.02, zt + 0.30]]]));
    });
    dark.push(box(0.22, 0.04, 0.22, D(3.25), 0, Z(3.10), 0, -0.25, 0));

    /* ----------------------------------------------------- the wing ------
       Shoulder-mounted on the fairing: a 2.5 m chord all the way out,
       swept forward 4.45 deg, 22% thick, its middle flat over the cabin and
       each half rising 5.9 deg from the cabin side (drawing front view)
       into the nacelle, where it ends inside it at 6.95 m. */
    function wingAt(y) {
      var le = wLE(y), zc = wZ(y);
      return foilRing([le, zc], [le - W_CH, zc], W_T, function (x, z) { return [x, y, z]; });
    }
    skin.push(tube([-6.95, -5.4, -4.0, -2.6, -W_Y0, W_Y0, 2.6, 4.0, 5.4, 6.95].map(wingAt), true, true));

    /* ---------------------------------------------------- the H-tail -----
       The stabilizer across the tail at 2.95 m, 5.24 m over the fins and
       about 2 m chord, its trailing edge level with the fins'; the fins at
       its tips, swept 23 deg above it and running on below it to 1.96 m,
       their trailing edges upright at the tail (drawing side, top and front
       views; the Twentynine Palms photograph). */
    var STLE0 = D(15.20), STLE1 = D(15.40), STTE = D(17.42);
    function stabAt(y) {
      var le = y === 0 ? STLE0 : STLE0 + (STLE1 - STLE0) * Math.abs(y) / ST_Y;
      return foilRing([le, Z(ST_H)], [STTE, Z(ST_H)], 0.20, function (x, z) { return [x, y, z]; });
    }
    var stR = [stabAt(0), stabAt(1.3), stabAt(ST_Y + 0.08)];
    skin.push(tube(stR, false, true));
    skin.push(mirrorY(tube(stR, false, true)));
    var FIN_TE = D(17.48);
    function finAt(h, le, te) {
      return foilRing([le, 0], [te, 0], 0.20 * (te - le) / 1.8 + 0.04, function (x, yy) { return [x, FIN_Y + yy, Z(h)]; });
    }
    /* lower fin: the bottom at 1.96 m from d 15.86, up to the stabilizer */
    var finLo = [finAt(1.96, D(15.86), FIN_TE + 0.02), finAt(ST_H, D(15.25), FIN_TE)];
    var finHi = [finAt(ST_H, D(15.25), FIN_TE), finAt(4.30, D(15.85), FIN_TE), finAt(5.38, D(16.40), FIN_TE + 0.03)];
    var fLo = tube(finLo, true, false), fHi = tube(finHi, false, true);
    both(skin, fLo); both(skin, fHi);

    /* ---------------------------------------------------- the nacelles ---
       Vertical. Each a slab-sided rounded box, 1.85 m fore-and-aft and 1.32 m
       across, mostly forward of the conversion axis, from its exhaust end
       1.25 m off the ground to the proprotor gearbox 5.55 m up; its lower
       part (the after end in aeroplane mode) narrower and further forward.
       The round inlet on the forward face at the wing; the gearbox drum and
       the spinner over it. Built for the port side and mirrored.
               h      cx    a     b     e                                   */
    var NT = [
      [1.25, 0.48, 0.46, 0.38, 0.70],
      [1.40, 0.48, 0.56, 0.47, 0.60],
      [2.05, 0.45, 0.63, 0.52, 0.55],
      [2.38, 0.33, 0.90, 0.62, 0.50],
      [3.30, 0.30, 0.93, 0.66, 0.48],
      [4.40, 0.29, 0.92, 0.66, 0.48],
      [5.00, 0.20, 0.80, 0.62, 0.55],
      [5.36, 0.08, 0.62, 0.57, 0.70],
      [5.56, 0.02, 0.52, 0.52, 0.85]
    ];
    var NSEG = 24;
    var nRings = NT.map(function (r) {
      var out = [], j;
      for (j = 0; j < NSEG; j++) {
        var a = 2 * PI * j / NSEG, c = Math.cos(a), sn = Math.sin(a);
        out.push([r[1] + r[2] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), r[4]),
                  NAC_Y + r[3] * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), r[4]), Z(r[0])]);
      }
      return out;
    });
    var nac = [tube(nRings, true, true)];
    /* the gearbox drum under the spinner */
    nac.push(cyl(0.50, 0.52, 0.34, 22, "z", 0, NAC_Y, Z(5.70), false));
    /* the inlet: a round lipped mouth standing proud of the forward face */
    var INL_H = 3.45, INL_X = 1.18;
    nac.push(cyl(0.34, 0.36, 0.30, 18, "x", INL_X + 0.12, NAC_Y, Z(INL_H), true));
    nac.push(place(new V.TorusGeometry(0.31, 0.05, 4, 14), INL_X + 0.27, NAC_Y, Z(INL_H), 0, PI / 2, 0));
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    both(dark, disc(0.29, 18, [INL_X + 0.22, NAC_Y, Z(INL_H)], [1, 0, 0]));
    both(dark, sph(0.10, 10, 6, INL_X + 0.24, NAC_Y, Z(INL_H), 1.2, 1, 1));
    /* the exhaust at the nacelle's foot */
    both(dark, disc(0.30, 16, [0.48, NAC_Y, Z(1.24)], [0, 0, -1]));

    /* --------------------------------------------------- the glazing -----
       Cut from the loft 3 cm proud: the two big windshield panes either
       side of the centre post, a side window pair each side behind the
       windshield, the chin windows low on the nose; the cabin's windows;
       the window in the crew door, starboard. */
    var OFF = 0.04;
    both(glass, patch(FUS, D(1.08), D(2.28), function (x) { return thAtY(FUS, x, lin(D(1.08), 0.62, D(2.28), 0.86)(x)); },
                      function (x) { return thAtY(FUS, x, 0.06); }, 10, 8, OFF));
    both(glass, patch(FUS, D(1.30), D(2.24), function (x) { return thAtZ(FUS, x, Z(lin(D(1.30), 1.62, D(2.24), 1.82)(x))); },
                      function (x) { return Math.min(thAtZ(FUS, x, Z(2.62)), thAtY(FUS, x, 0.90)); }, 8, 6, OFF));
    both(glass, patch(FUS, D(2.34), D(2.92), function (x) { return thAtZ(FUS, x, Z(1.86)); },
                      function (x) { return thAtZ(FUS, x, Z(2.62)); }, 5, 5, OFF));
    both(glass, patch(FUS, D(0.92), D(1.52), function (x) { return thAtZ(FUS, x, Z(lin(D(0.92), 1.02, D(1.52), 0.80)(x))); },
                      function (x) { return thAtZ(FUS, x, Z(lin(D(0.92), 1.30, D(1.52), 1.42)(x))); }, 6, 4, OFF));
    function sideWin(list, d0, d1, h0, h1, side) {
      var p = patch(FUS, D(d0), D(d1), function (x) { return thAtZ(FUS, x, Z(h0)); },
                    function (x) { return thAtZ(FUS, x, Z(h1)); }, 2, 2, OFF);
      if (side === 0) both(list, p); else list.push(side < 0 ? mirrorY(p) : p);
    }
    /* the round windows: aft of the wing on both sides (the drawing;
       VMM-166 to starboard), ahead of the nacelle on the port side (the
       drawing; JGSDF 91705), and the crew door's on the starboard side */
    sideWin(glass, 8.66, 9.00, 2.04, 2.38, 0);
    sideWin(glass, 5.05, 5.39, 2.04, 2.38, 1);
    sideWin(glass, 3.75, 4.15, 1.98, 2.42, -1);

    /* ---------------------------------------------- nose kit -------------
       The FLIR ball on its neck under the radome; the refuelling probe in
       its fairing along the lower starboard side of the nose, its nozzle
       0.1 m ahead of the radome. */
    dark.push(sph(0.19, 14, 10, D(0.58), 0, Z(0.73)));
    skin.push(cyl(0.12, 0.14, 0.16, 12, "z", D(0.58), 0, Z(0.90)));
    glass.push(sph(0.10, 10, 6, D(0.43), 0, Z(0.72), 0.6, 1, 1));
    var pr0 = [D(1.75), -0.98, Z(1.06)], pr1 = [D(0.62), -0.60, Z(1.20)], pr2 = [D(0.05), -0.47, Z(1.30)];
    skin.push(bar(pr0, pr1, 0.11, 10, true));
    skin.push(sph(0.11, 10, 6, pr0[0], pr0[1], pr0[2], 1.6, 1, 1));
    dark.push(bar(pr1, pr2, 0.055, 8, true));
    dark.push(bar2([pr2[0] + 0.01, pr2[1], pr2[2]], [pr2[0] - 0.05, pr2[1], pr2[2]], 0.085, 0.06, 10));
    dark.push(bar2([D(0.00), pr2[1], pr2[2]], [pr2[0] + 0.01, pr2[1], pr2[2]], 0.04, 0.085, 10));

    /* -------------------------------------------------- team colour -----
       Modest, on upper surfaces: a plate over the middle of each half of
       the stabilizer between 20% and 72% chord, and a band round the top
       of each fin. */
    /* the aerofoil's half-thickness at chord fraction f, from FOIL */
    function foilHalf(f, t) {
      for (var q = 0; q < FOIL.length - 1; q++)
        if (f >= FOIL[q][0] && f <= FOIL[q + 1][0])
          return t / 2 * (FOIL[q][1] + (FOIL[q + 1][1] - FOIL[q][1]) * (f - FOIL[q][0]) / (FOIL[q + 1][0] - FOIL[q][0]));
      return 0;
    }
    var FR = [0.20, 0.30, 0.40, 0.48, 0.57, 0.66, 0.72], tpl = [];
    for (s = -1; s <= 1; s += 2) {
      var rowA = [], rowB = [];
      FR.forEach(function (f) {
        [[0.95, rowA], [2.35, rowB]].forEach(function (yr) {
          var le = STLE0 + (STLE1 - STLE0) * yr[0] / ST_Y;
          yr[1].push([le + (STTE - le) * f, s * yr[0], Z(ST_H) + foilHalf(f, 0.20) + 0.022]);
        });
      });
      for (k = 0; k < FR.length - 1; k++) tpl.push(rowA[k], rowB[k], rowA[k + 1], rowA[k + 1], rowB[k], rowB[k + 1]);
    }
    /* wound to face up */
    for (k = 0; k < tpl.length; k += 3) {
      var p0 = tpl[k], p1 = tpl[k + 1], p2 = tpl[k + 2];
      var nzz = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
      if (nzz < 0) { tpl[k + 1] = p2; tpl[k + 2] = p1; }
    }
    team.push(tris(tpl));
    /* its edges 12 mm outside the fin's own at those heights, never aft
       of the fin's trailing edge at d 17.48 */
    var tb = tube([finAt(5.04, D(16.215), FIN_TE + 0.009), finAt(5.40, D(16.398), FIN_TE + 0.018)].map(function (r) {
      return r.map(function (p) { var dy = p[1] - FIN_Y; return [p[0], FIN_Y + dy * 1.15 + (dy > 0 ? 0.01 : -0.01), p[2]]; });
    }), true, true);
    both(team, tb);

    /* ------------------------------------------------ airframe meshes -- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, team, T.team, "team");

    /* ======================================================= proprotors ==
       Each head hangs in the hero mount: the mount +PI/2 about X points the
       rotor's local +Y up the shaft, the head undoes it so the head is built
       in model axes, its origin at the hub in the blade plane. Port first
       (anti-clockwise from above), then starboard (the renderer turns it the
       other way: clockwise). Three blades, 5.81 m long, 0.86 m chord at the
       root cuff tapering to 0.52 at the tip, twisted from 34 deg at the
       root to 4 at the tip, leading edge up, coned 2 deg; the black spinner
       over the hub. The port head's blades lead on their +Y side when they
       point along +X (anti-clockwise); the starboard head is its mirror
       image, so its blades lead the other way, as it turns. */
    var headParts = [];
    headParts.push([latheZ([[-0.30, 0.0005], [-0.30, 0.36], [-0.18, 0.46], [0.02, 0.54], [0.16, 0.54],
                            [0.30, 0.50], [0.44, 0.40], [0.54, 0.24], [SPIN_TOP - HUB_H, 0.0005]], 16, 0, 0), 0x1b1d20]);
    headParts.push([cyl(0.20, 0.24, 0.26, 14, "z", 0, 0, -0.40), 0x2a2d31]);
    /* radius, chord, pitch (deg), the section's shift aft of the pitch
       axis: the tip tapers and sweeps back over its last 0.5 m, as the
       museum aircraft's blades show */
    var BL = [[0.62, 0.86, 34, 0], [1.30, 0.84, 28, 0], [2.40, 0.74, 19, 0], [3.60, 0.65, 12, 0], [4.80, 0.58, 7, 0],
              [5.30, 0.55, 5, 0.02], [ROTOR_R, 0.30, 4, 0.20]];
    for (k = 0; k < 3; k++) {
      var ang = (90 + 120 * k) * D2R;
      /* the cuff and grip from the hub out to the blade root */
      var cuff = box(0.40, 0.30, 0.20, 0.42, 0, 0.0);
      cuff.rotateZ(ang); headParts.push([cuff, 0x25282c]);
      var rings = BL.map(function (b) {
        var r = b[0], c = b[1], th = b[2] * D2R, tt = c * 0.10;
        var lead = 0.28 * c - b[3], trail = -0.72 * c - b[3];
        var ring = [];
        FOIL.forEach(function (f) { var yy = lead + (trail - lead) * f[0]; ring.push([yy, f[1] * tt / 2]); });
        for (var q = FOIL.length - 2; q >= 1; q--) { var yy2 = lead + (trail - lead) * FOIL[q][0]; ring.push([yy2, -FOIL[q][1] * tt / 2]); }
        var cone = r * Math.tan(2 * D2R);
        return ring.map(function (p) {
          var yy = p[0] * Math.cos(th) - p[1] * Math.sin(th), zz = p[0] * Math.sin(th) + p[1] * Math.cos(th);
          return [r * Math.cos(ang) - yy * Math.sin(ang), r * Math.sin(ang) + yy * Math.cos(ang), zz + cone];
        });
      });
      headParts.push([tube(rings, true, true), 0x3b4046]);
    }
    var headGeoP = vcGeo(headParts);
    var discGeo = place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.06);
    function hang(y, geo) {
      var mnt = new V.Group();
      mnt.position.set(0, y, Z(HUB_H));
      mnt.rotation.x = PI / 2;
      g.add(mnt);
      var rotor = new V.Group();
      rotor.name = "rotor";
      mnt.add(rotor);
      var head = new V.Group();
      head.rotation.x = -PI / 2;
      rotor.add(head);
      var hm = new V.Mesh(geo, T.rotor); hm.name = "proprotor"; head.add(hm);
      var dm = new V.Mesh(discGeo, T.disc); dm.name = "rotordisc"; head.add(dm);
    }
    hang(NAC_Y, headGeoP);
    hang(-NAC_Y, mirrorY(headGeoP));

    /* =========================================================== gear ====
       Tricycle, retracting: the nose unit's twin wheels side by side 1.2 m
       behind the radome's tip; each main unit's two wheels in tandem, 1.0 m
       apart, on a trailing arm under the sponson with its door hanging
       outboard of them (VMM-166, JGSDF 91705 and the 2002 photograph). One
       group named "gear", which render3d.js hides above 18 m. */
    var gear = new V.Group();
    gear.name = "gear";
    var gm = [], gt = [], gs = [];
    var NW_X = D(1.32), NW_R = 0.22, NW_W = 0.16;
    gm.push(bar([NW_X + 0.04, 0, Z(0.70)], [NW_X, 0, Z(NW_R)], 0.06, 8, true));
    gm.push(cyl(0.035, 0.035, 0.46, 8, "y", NW_X, 0, Z(NW_R)));
    gm.push(box(0.10, 0.10, 0.18, NW_X + 0.06, 0, Z(0.52)));
    for (s = -1; s <= 1; s += 2) {
      gt.push(cyl(NW_R, NW_R, NW_W, 16, "y", NW_X, s * 0.15, Z(NW_R)));
      gm.push(cyl(0.11, 0.11, NW_W + 0.01, 10, "y", NW_X, s * 0.15, Z(NW_R)));
    }
    var MW_R = 0.35, MW_W = 0.24, MWY = 1.92;
    var MX = [D(7.85), D(8.85)];
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * MWY;
      for (k = 0; k < 2; k++) {
        gt.push(cyl(MW_R, MW_R, MW_W, 14, "y", MX[k], y0, Z(MW_R)));
        gm.push(cyl(0.16, 0.16, MW_W + 0.012, 12, "y", MX[k], y0, Z(MW_R)));
      }
      /* the trailing arm, the axle beam and the oleo up into the sponson */
      gm.push(bar([MX[0], y0 - s * 0.16, Z(MW_R)], [MX[1], y0 - s * 0.16, Z(MW_R)], 0.06, 8, true));
      gm.push(bar([MX[0] + 0.15, y0 - s * 0.16, Z(MW_R + 0.05)], [(MX[0] + MX[1]) / 2, y0 - s * 0.20, Z(0.62)], 0.08, 8, true));
      gm.push(bar([(MX[0] + MX[1]) / 2, y0 - s * 0.20, Z(0.62)], [(MX[0] + MX[1]) / 2 - 0.10, y0 - s * 0.24, Z(0.80)], 0.07, 8, true));
      /* the gear door, hanging outboard of the wheels */
      gs.push(box(1.70, 0.04, 0.34, (MX[0] + MX[1]) / 2, s * (MWY + MW_W / 2 + 0.09), Z(0.66), s * 0.12, 0, 0));
    }
    mesh(gear, gs, T.skin, "gear_doors", true);
    mesh(gear, gm, T.metal, "gear_legs");
    mesh(gear, gt, T.tyre, "tyres");
    g.add(gear);
    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent: probe tip to the fins' trailing edges */
UNIT_MODELS["nato_e00_mv22"] = { len: 17.48, build: function (THREE, M, C) { return HeroMV22.build(THREE, M, C); } };
