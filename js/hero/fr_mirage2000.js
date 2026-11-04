/* ============ fr_mirage2000.js - HERO model: Dassault Mirage 2000 family ============
   Registers three rows, one builder with a VARIANTS table:
     fra_e80_fighter  "Mirage 2000C"   (service 1984; the RDI radar from 1987)
     fra_e90_fighter  "Mirage 2000-5"  ("Dassault Mirage 2000-5F", 1997)
     fra_e90_cas      "Mirage 2000D"   (two-seat conventional strike, 1993)
   No other row is registered or changed. There was no Mirage 2000 model in
   js/hero/ before this file (grep -i mirage found none): until now these
   rows borrowed the role peers fighter_n (an F-16) and bomber_n.

   Full-quality redo, 2026-11-04. Model space: +X nose, +Y left (port), +Z
   up, metres. The tables are in model metres read straight off D:
     plan view   X = (px - 336.5) / 42.13,  Y = (394 - py) / 43.15
     side view   X = (657 - px) / 42.48,    Z = (590 - py) / 42.48
   42.13 px/m makes D's plan length (nose 639 to nozzle 34 px) the
   published 14.36 m; 43.15 px/m makes its span (394 px) the published
   9.13 m (D's plan is 2.4 % wider than its length allows: the published
   span is followed, the sweep changes by under 1 deg). The side view is
   drawn at its own scale (610 px nose to nozzle = 14.36 m). Z = 0 is close
   to the nose axis; the ground is Z -1.47 (D side: ground line py 652.5).
   Front view (head-on): Y and Z = (291 - py) / 42.7 - 1.47, centre px 674.5.

   References (Wikimedia Commons at 960-1000 px, cached in
   scratchpad/q_mirage_ref; Wikipedia for the figures):
     D "Dassault Mirage 2000C 3-view line drawing.gif" (1000 px; captioned
       "3-view of Mirage 2000C/RDI" on en.wikipedia) - plan, side (canopy
       open) and head-on. Every station table below is read off it on a
       pixel grid: nose and radome joint, windscreen and canopy, the spine,
       the half-cone intakes (lip X 2.33, the cone tip 0.37 m ahead of it),
       the small strake over each intake (plan X 1.22..2.15 out to Y 1.13;
       head-on: a spike at Z 0.66), the wing (LE 58.7 deg, TE straight
       across at X -5.03, elevon hinge X -4.19 split at Y 2.29, the slat
       line, the airbrake outline at X -0.9..-1.3), the slight anhedral
       (head-on: 0.12 m drop root to tip), the fin and its forward-leaning
       lower trailing edge with the rudder, the cross-fairing on the fin at
       Z 2.93 (side: X -5.13..-6.95; head-on: 0.56 m wide), the fin-root
       fairing ending in a round tail over the nozzle, the nozzle (r 0.49,
       its centre Z 0.52), and the gear: nose wheels X 3.13, twin
       (head-on), main wheels X -1.79, r 0.375, track 3.64 m (head-on).
     P1 "Dassault Mirage 2000C-RDI 80 103-LI (6773016179).jpg" - a 2000C
       taxiing, port side: the fixed refuelling probe rising from the far
       (starboard) side ahead of the windscreen, the short nose pitot, the
       tall main legs and doors, the twin nose wheels under the cockpit, a
       Magic II on the outer wing pylon. Its Tiger Meet paint is NOT used.
     P2 "French Air Force Dassault Mirage 2000C.jpg" - a 2000C at a tanker:
       the air-defence two-tone grey (pale blue-grey with darker blue-grey
       patches over the fuselage, fin and wings), the darker grey radome
       and its joint, the pitot, the probe, a wing tank inboard and a
       Magic II outboard, the fin cross-fairing.
     P3 "Dassault Mirage 2000-5F, France - Air Force AN0536300.jpg" - a
       2000-5F climbing out, starboard side: the same two-tone grey, the
       probe's base and its bent tip, NO nose pitot, wing tanks and a
       missile on the outer wing pylon.
     P4 "Mirage 2000D (26432497715).jpg" - a 2000D from above: the long
       tandem canopy with its centre frame, the green and grey camouflage
       (radome in the green), no nose pitot, the probe, wing tanks.
     P5 "Dassault Mirage 2000-5 participating in Odyssey Dawn (cropped).jpg"
       - a Qatari 2000-5EDA from below (its paint is NOT used): MICAs on the
       four under-fuselage stations, staggered fore and aft under the
       intake trunks, the front pair's noses level with the intake lips.
     P6 "Dassault Mirage 2000 D PDLCT pod Nellis AFB 29Jan98 RJF.jpg" - the
       PDLCT designation pod of a 2000D on its deep under-fuselage pylon,
       ahead of the main wheel: a bare grey cylinder, rounded sensor head.
     en.wikipedia "Dassault Mirage 2000": length 14.36 m, span 9.13 m,
       height 5.20 m, wing area 41 m2; "twin nosewheels and a single wheel
       on each main gear"; "a removable refueling probe can be attached in
       front of the cockpit, offset slightly to the right of centre"; "an
       airbrake is fitted above and below each wing"; "the small strakes
       mounted along each air intake".
     en.wikipedia "Dassault Mirage 2000N/2000D": crew 2, length 14.55 m,
       span 9.13 m, height 5.15 m; ATLIS II / PDLCT / Damocles on "the
       front-right fuselage hardpoint"; GBU-12 "in pairs on the centerline
       and inboard wing hardpoints and one under each of the four fuselage
       hardpoints".
   As drawn: 2000C 14.78 m over the pitot (airframe 14.36 m: the 2000-5,
   which has no pitot boom, has the same published length, so the figure
   is taken as the airframe's); 2000-5 14.36 m; 2000D 14.55 m. Span 9.13 m.
   Height 5.07 m to the fin tip (D's side view; published 5.20 / 5.15 m,
   the drawing is followed).

   Recognition list (what makes it a Mirage 2000 at RTS zoom):
     1. Tailless delta, LE 58 deg, a straight trailing edge of two elevons a
        side, no tailplane, no canard (D, P2-P4) - wing().
     2. Fixed half-cone ("souris") intakes on the fuselage sides behind the
        cockpit, with a small strake over each (D, P2, P3) - TRUNK, cone,
        strake.
     3. One tall swept fin whose lower trailing edge leans forward, the
        cross-fairing near its top, the fairing at its root running back
        over the nozzle (D, P1, P2).
     4. The fixed refuelling probe on the starboard side ahead of the
        windscreen, rising then bent forward (P1-P4).
     5. A long pointed radome; tall, stalky main gear (D, P1).
     6. One M53 nozzle (D, P1, P3).
   Variant differences CONFIRMED and drawn:
     - 2000C: nose pitot (P1, P2); two-tone grey (P2); stores below.
     - 2000-5: no nose pitot (P3); two-tone grey (P3); MICA load (P5).
     - 2000D: two-seat tandem canopy with a centre frame (P4), no pitot
       (P4), green/grey camouflage with the radome in the green (P4), the
       PDLCT pod (P6, en.wikipedia station), 0.19 m longer (published).
   NOT distinguishable in my references and so drawn alike: the 2000C's RDI
   and the 2000-5's RDY radomes (same outline in P2 and P3); the 2000-5's
   glass cockpit (inside the canopy, not modelled); the 2000D's nose
   outline (P4 matches the single-seaters' within what a photo shows).
   Paint (P2, P3 sampled and taken to about 0.8 of level): grey scheme
   pale #a2abb7, patches #7c8698, underside #b3b9c1, radome #6e737c; D
   scheme (P4) olive #5b5944, grey #868a8b, radome #535140, wraparound.
   No national markings, codes, fin badges or tiger stripes (P1-P4 carry
   roundels, codes and squadron badges: not drawn).
   Team colour exactly C.team: one strip on each upper outer wing.
   Stores: rows name Super 530D + Magic II (2000C), MICA (2000-5), GBU-12
   with PDLCT (2000D) (eras.js weapons):
     2000C: wing tanks inboard and Magic II outboard (P2, P1); a Super 530D
       on each front fuselage station (the stations P5 shows).
     2000-5: MICA on the four fuselage stations (P5), wing tanks (P3), a
       MICA on each outer wing pylon (P3 shows a missile there).
     2000D: wing tanks (P4), PDLCT on the front starboard fuselage station
       (P6, en.wikipedia), a GBU-12 on each rear fuselage station
       (en.wikipedia; no photograph of a 2000D with GBU-12 was fetched).
   Gear: it retracts, so it is the group "gear". Twin nose wheels on a leg
   under the cockpit, single main wheels on tall legs under the wing roots.

   NOT CONFIRMED (estimated, not measured):
     - the probe's exact path and length (P1, P3, P4 in perspective): base
       0.1 m ahead of the windscreen at Y -0.30, elbow at Z 1.05, tip X
       5.80 at Z 1.10.
     - the cross-section shapes (superellipse exponents) and the mid-body
       crown under the canopy; the trunk's fade into the body aft of X 0.
     - the camouflage pattern: the colours are sampled, the blotches are
       laid out to match the photographs' proportions, not traced.
     - the 2000D's stretch: put entirely forward of the intakes (nose,
       windscreen and front cockpit 0.19 m further forward); its canopy end
       (X 0.95) from P4 in perspective.
     - the wing pylon stations (Y 2.45 and 3.55) and every store's fore-
       and-aft position except the fuselage MICAs (P5); the tank size (4.2
       x 0.72 m, from P2 in perspective); the PDLCT size (2.7 x 0.36 m).
     - the nose wheel size: D's side and head-on disagree (r 0.26 / 0.22);
       0.22 is used. The pitot's length (0.43 m, from P1).
     - the gear legs' rake and the doors' sizes (D side, P1).
   Not drawn (no reference shows it, or the row forbids it): wing fences
   (D and the photos show none), the 30 mm gun ports (not visible in any
   reference; the 2000D has no gun), the brake chute, airbrakes open,
   national markings, codes, a centreline tank (P2 shows one; omitted).

   Materials: SKIN (one painted canvas, projected; also the tanks), RADOME,
   DARK, METAL, NOZZLE, GLASS, PALE (missiles), ORD (the 2000D's bombs),
   TEAM; the gear group METAL, TYRE, DARK.
   Nodes: "gear". Model space line: +X nose, +Y port, +Z up, metres; the
   tyres touch Z -1.47.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMirage2000 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -1.47;                       /* D side: ground line py 652.5 */

  /* ------------------------------------------------------ the variants -- */
  var VARIANTS = {
    fra_e80_fighter: { key: "c",  seats: 1, str: 0.00, pitot: true,  scheme: "grey", load: "c" },
    fra_e90_fighter: { key: "m5", seats: 1, str: 0.00, pitot: false, scheme: "grey", load: "m5" },
    fra_e90_cas:     { key: "d",  seats: 2, str: 0.19, pitot: false, scheme: "camo", load: "d" }
  };

  /* ------------------------------------------------------- the tables -- */
  /* body: [X, half-width, crown Z, keel Z, Z of max width, upper exp, lower exp]
     (D side for crown and keel, D plan for the half-width). The first eight
     rows are the radome (joint at D side px 438). Aft of the canopy the
     crown is the spine; the intake trunks stand outside the body forward
     of X 0 and fade into it aft (TRUNK). */
  var BODY = [
    [7.18, 0.02, 0.07, 0.03, 0.05, 1.0, 1.0],
    [6.97, 0.07, 0.13, -0.01, 0.06, 1.0, 1.0],
    [6.73, 0.13, 0.18, -0.05, 0.065, 1.0, 1.0],
    [6.49, 0.19, 0.25, -0.09, 0.07, 1.0, 1.0],
    [6.25, 0.23, 0.31, -0.12, 0.08, 1.0, 1.0],
    [5.78, 0.31, 0.43, -0.18, 0.10, 1.0, 1.0],
    [5.40, 0.36, 0.52, -0.22, 0.12, 1.0, 1.0],
    [5.16, 0.39, 0.56, -0.24, 0.13, 1.0, 0.95],     /* radome joint */
    [4.83, 0.42, 0.66, -0.26, 0.15, 1.0, 0.9],
    [4.45, 0.44, 0.77, -0.26, 0.18, 1.0, 0.85],     /* windscreen foot */
    [3.50, 0.45, 0.80, -0.26, 0.22, 0.9, 0.8],
    [2.40, 0.46, 0.80, -0.26, 0.25, 0.9, 0.8],      /* intake lip station */
    [2.00, 0.48, 0.86, -0.27, 0.27, 0.9, 0.8],
    [1.50, 0.54, 1.22, -0.27, 0.29, 1.1, 0.8],      /* spine begins behind the canopy */
    [1.00, 0.60, 1.25, -0.27, 0.30, 1.15, 0.8],
    [0.30, 0.68, 1.22, -0.27, 0.30, 1.15, 0.8],
    [-0.87, 0.80, 1.18, -0.27, 0.30, 1.15, 0.75],
    [-1.81, 0.76, 1.13, -0.27, 0.32, 1.15, 0.75],
    [-3.24, 0.73, 1.11, -0.25, 0.36, 1.15, 0.75],
    [-4.20, 0.73, 1.14, -0.20, 0.40, 1.1, 0.8],
    [-5.14, 0.68, 1.12, -0.10, 0.45, 1.05, 0.85],
    [-5.85, 0.60, 1.09, -0.02, 0.50, 1.0, 0.9],
    [-6.53, 0.52, 1.04, 0.02, 0.52, 1.0, 1.0]       /* nozzle shroud, D px 935 */
  ];
  var RADOME_N = 8;
  /* the two-seater's crown under its longer canopy (P4): sill height to X 1.5 */
  var BODY_D_CROWN = { "2.00": 0.82, "1.50": 0.84, "1.00": 1.12 };
  /* canopy on a sill at Z 0.76: [X, half-width, top Z]
     single seat (D side: windscreen foot px 468, frame px 512, closed top py 533) */
  var CANOPY1 = [[4.47, 0.30, 0.79], [4.20, 0.37, 0.97], [3.80, 0.41, 1.15], [3.40, 0.42, 1.27],
                 [2.90, 0.42, 1.33], [2.40, 0.41, 1.34], [2.00, 0.37, 1.31], [1.70, 0.28, 1.27],
                 [1.50, 0.18, 1.24]];
  var FRAMES1 = [3.40, 1.74];
  /* two seats in tandem (P4): windscreen 0.19 m further forward, canopy to X 0.95 */
  var CANOPY2 = [[4.66, 0.30, 0.79], [4.39, 0.37, 0.97], [3.99, 0.41, 1.15], [3.59, 0.42, 1.27],
                 [3.00, 0.43, 1.33], [2.20, 0.43, 1.35], [1.60, 0.42, 1.34], [1.20, 0.36, 1.30],
                 [0.95, 0.26, 1.26], [0.75, 0.16, 1.23]];
  var FRAMES2 = [3.59, 2.15, 0.98];
  /* intake trunk, each side: [X, centre Y, half-width, centre Z, half-height, exp]
     (D plan and head-on: the mouth spans Y 0.45..0.99; D side: the lip
     line runs Z -0.12..0.77. D's head-on view does not register vertically
     with its side view, so it is used for widths only) */
  var TRUNK = [
    [2.33, 0.72, 0.27, 0.325, 0.445, 0.75],
    [1.80, 0.72, 0.27, 0.31, 0.44, 0.75],
    [1.00, 0.70, 0.27, 0.28, 0.43, 0.8],
    [0.00, 0.68, 0.27, 0.20, 0.40, 0.85],
    [-1.00, 0.50, 0.28, 0.15, 0.30, 0.9],
    [-1.80, 0.42, 0.20, 0.12, 0.22, 1.0]
  ];
  /* the half cone (D side: tip px 543 = X 2.68, mid-mouth; head-on: axis Y 0.47) */
  var CONE = { tip: 2.70, base: 2.20, y: 0.47, z: 0.33, r: 0.26 };
  /* wing (D plan): LE from the glove (X 2.22, Y 0.97) to (1.27, 1.205), then
     straight at 58.7 deg to (-3.95, 4.38), the tip rounded to Y 4.565; TE
     straight across at X -5.03. Chord plane Z -0.04 at the root, 0.12 m
     lower at the tip (head-on). */
  var WROOT = 0.76, WTIP = 4.565;
  function wLE(y) {
    if (y <= 0.97) return 2.24;
    if (y <= 1.205) return 2.22 - (y - 0.97) / (1.205 - 0.97) * 0.95;
    if (y <= 4.38) return -3.95 + (4.38 - y) / 0.608;
    return -3.95 - (y - 4.38) / (WTIP - 4.38) * 0.65;   /* rounded tip, D px 140-170 */
  }
  function wTE(y) { return y > 4.50 ? -5.03 + (y - 4.50) / (WTIP - 4.50) * 0.15 : -5.03; }
  function wZ(y) { return -0.04 - Math.max(0, y - WROOT) * 0.032; }
  function wT(y) { return 0.32 - Math.max(0, y - WROOT) / (WTIP - WROOT) * 0.26; }
  /* fin (D side): LE straight from (-2.75, 1.12) at 53.6 deg; TE from
     (-6.27, 1.15) leaning back to the tip; tip at Z 3.60 */
  var FIN = { z0: 1.12, z1: 3.60 };
  function finLE(z) { return -2.75 - (z - 1.12) * 1.356; }
  function finTE(z) { return -6.27 - (z - 1.15) * 0.217; }
  /* nozzle (D side and plan): -6.53 .. -7.18, r 0.49 .. 0.45, centre Z 0.52 */
  var NOZ = { x0: -6.53, x1: -6.60, x2: -7.18, r0: 0.50, r1: 0.49, r2: 0.45, z: 0.52 };

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -7.8, TW = 468;
  var YMAX = 4.7, TOPH = 282, ZTOP = 3.8, SIDEH = 159;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var SCHEMES = {
    grey: { base: "#a2abb7", patch: "#7c8698", belly: "#b3b9c1", radome: 0x6e737c, wrap: false, seed: 2000 },
    camo: { base: "#5b5944", patch: "#868a8b", belly: null, radome: 0x535140, wrap: true, seed: 2004 }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = {};
  function paint(VT) {
    var P = SCHEMES[VT.scheme];
    if (_cv[VT.key]) return _cv[VT.key];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = P.seed, i, b, k, x, y;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = P.base; g.fillRect(0, 0, TW, TH);
    if (!P.wrap) { g.fillStyle = P.belly; g.fillRect(0, B_BEL, TW, TOPH); }
    /* the patches: irregular blobs, about a third of the surface (P2, P3
       grey; P4 green with grey). The layout is not traced (see the header). */
    function blob(cx, cy, rx, ry) {
      var n = 9, a0 = R() * PI;
      g.beginPath();
      for (var j = 0; j < n; j++) {
        var a = a0 + j * 2 * PI / n, f = 0.65 + R() * 0.55;
        var px = cx + Math.cos(a) * rx * f, py = cy + Math.sin(a) * ry * f;
        if (j) g.lineTo(px, py); else g.moveTo(px, py);
      }
      g.closePath(); g.fill();
    }
    g.fillStyle = P.patch;
    var bands = P.wrap ? [B_TOP, B_PORT, B_STBD, B_IN, B_BEL] : [B_TOP, B_PORT, B_STBD, B_IN];
    for (b = 0; b < bands.length; b++) {
      var h = (bands[b] === B_TOP || bands[b] === B_BEL) ? TOPH : SIDEH;
      var nb = h === TOPH ? 11 : 6;
      for (i = 0; i < nb; i++) {
        blob(20 + R() * (TW - 40), bands[b] + 10 + R() * (h - 20), 26 + R() * 34, 16 + R() * 26);
      }
    }
    /* panel lines: radome joint, frames, on every band */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [4.83 + VT.str, 2.33, 1.0, -0.87, -1.81, -3.24, -4.20, -5.14, -5.85];
    for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    /* wing (top and belly): elevon hinge X -4.19 split at Y 2.29, the slat
       line (D plan: (-3.71, 3.96) to (1.03, 1.205)), the airbrake outline */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(pxX(-4.19), ob + pxY(k * 0.95)); g.lineTo(pxX(-4.19), ob + pxY(k * 4.40)); g.stroke();
        g.beginPath(); g.moveTo(pxX(-4.19), ob + pxY(k * 2.29)); g.lineTo(pxX(-5.03), ob + pxY(k * 2.29)); g.stroke();
        g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
        g.beginPath(); g.moveTo(pxX(1.03), ob + pxY(k * 1.205)); g.lineTo(pxX(-3.71), ob + pxY(k * 3.96)); g.stroke();
        g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.2;
        g.strokeRect(pxX(-0.87), ob + pxY(k > 0 ? 1.83 : -1.37), 0.47 * PXM, 0.46 * PXM);
      }
    }
    /* fin: rudder hinge (D side: (-6.03, 1.65) to (-6.36, 2.94)) on the side bands */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(pxX(-6.03), bd + pxZ(1.65)); g.lineTo(pxX(-6.36), bd + pxZ(2.94)); g.stroke();
      g.beginPath(); g.moveTo(pxX(-6.03), bd + pxZ(1.65)); g.lineTo(pxX(-6.38), bd + pxZ(1.65)); g.stroke();
    }
    /* rivet rows and light weathering */
    g.fillStyle = "rgba(0,0,0,0.09)";
    for (i = 0; i < 70; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 20) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(30,32,36," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 30, 2 + R() * 5);
    }
    /* heat staining ahead of the nozzle */
    var hs = g.createLinearGradient(pxX(-5.6), 0, pxX(-6.6), 0);
    hs.addColorStop(0, "rgba(40,36,32,0)"); hs.addColorStop(1, "rgba(40,36,32,0.30)");
    g.fillStyle = hs; g.fillRect(pxX(-6.6), 0, 1.0 * PXM, TH);
    _cv[VT.key] = cv;
    return cv;
  }

  var _tex = {};
  function skinTexture(VT) {
    if (_tex[VT.key] !== undefined) return _tex[VT.key];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(VT));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[VT.key] = t;
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

  function makeMats(C, VT) {
    var P = SCHEMES[VT.scheme], tex = skinTexture(VT), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.base);
    m.radome = new V.MeshStandardMaterial({ color: P.radome, roughness: 0.60, metalness: 0.08 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.75, metalness: 0.20 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6d70, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x625c55, roughness: 0.42, metalness: 0.60 });
    m.glass = new V.MeshStandardMaterial({ color: 0x26353c, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xd4d6d4, roughness: 0.55, metalness: 0.12 });
    m.ord   = new V.MeshStandardMaterial({ color: 0x4f5638, roughness: 0.70, metalness: 0.10 });   /* olive drab bombs */
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (the pla_j10.js / ru_su35.js kit: place, box, cyl, bar, merge, sloft,
     foil, loft) */
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

  /* a pylon: a slim blade from the skin (zTop) down to zBot */
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

  /* ----------------------------------------------------------- stores --
     profiles: [fraction of length from the nose (+0.5) to the tail (-0.5),
     fraction of radius]. Published sizes (makers' figures as commonly
     given): Magic II 2.75 m x 0.157 m; MICA 3.10 m x 0.16 m; Super 530D
     3.80 m x 0.263 m; GBU-12 3.27 m on a 0.273 m Mk 82 body. */
  var P_MISSILE = [[0.50, 0.04], [0.45, 0.50], [0.38, 0.90], [0.30, 1.0], [-0.48, 1.0], [-0.50, 0.85]];
  var P_TANK = [[0.50, 0.03], [0.44, 0.50], [0.34, 0.86], [0.22, 1.0], [-0.20, 1.0], [-0.38, 0.75], [-0.50, 0.25]];
  var P_MK82 = [[0.50, 0.30], [0.36, 0.80], [0.20, 1.0], [-0.12, 1.0], [-0.34, 0.62], [-0.50, 0.50]];
  function store(K, kind, x, y, zTop) {
    var len, r, zc;
    if (kind === "magic") {
      len = 2.75; r = 0.0785; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_MISSILE, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.36, y, zc, 0.10, 0.05, 0.04, 0.13, PI / 4, 0.006);   /* double canards */
      fins(K.pale, x + len * 0.29, y, zc, 0.10, 0.05, 0.04, 0.13, 0, 0.006);
      fins(K.pale, x - len * 0.30, y, zc, 0.45, 0.16, 0.28, 0.33, PI / 4, 0.006);   /* big swept tail */
    } else if (kind === "mica") {
      len = 3.10; r = 0.08; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_MISSILE, len, r, x, y, zc, 12));
      fins(K.pale, x + 0.55, y, zc, 1.40, 1.30, 0.10, 0.07, PI / 4, 0.005);         /* long body strakes */
      fins(K.pale, x - len * 0.40, y, zc, 0.28, 0.14, 0.12, 0.17, PI / 4, 0.006);
    } else if (kind === "s530") {
      len = 3.80; r = 0.1315; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_MISSILE, len, r, x, y, zc, 14));
      fins(K.pale, x + 0.60, y, zc, 1.60, 1.50, 0.10, 0.10, PI / 4, 0.006);
      fins(K.pale, x - len * 0.40, y, zc, 0.36, 0.18, 0.14, 0.22, PI / 4, 0.007);
    } else if (kind === "tank") {
      len = 4.2; r = 0.36; zc = zTop - 0.02 - r;
      push(K.skin, revolve(P_TANK, len, r, x, y, zc, 18));
    } else if (kind === "gbu12") {
      r = 0.137; zc = zTop - 0.02 - r;
      push(K.ord, revolve(P_MK82, 2.20, r, x, y, zc, 14));                        /* Mk 82 body */
      K.ord.push(cyl(0.065, 0.065, 0.62, 10, "x", x + 1.40, y, zc));             /* seeker section */
      K.pale.push(cyl(0.03, 0.065, 0.12, 10, "x", x + 1.77, y, zc));             /* seeker head */
      fins(K.ord, x + 1.42, y, zc, 0.20, 0.10, 0.08, 0.12, PI / 4, 0.006);       /* canards */
      fins(K.ord, x - 1.00, y, zc, 0.50, 0.30, 0.18, 0.22, PI / 4, 0.008);       /* folded tail wings */
    } else if (kind === "pdlct") {
      /* P6: a plain cylinder, a rounded sensor head on its front */
      len = 2.7; r = 0.18; zc = zTop - 0.02 - r;
      push(K.metal, loft([sec(x - len / 2, y, zc, r * 0.6, r * 0.6, r * 0.6), sec(x - len / 2 + 0.25, y, zc, r, r, r),
                          sec(x + len / 2 - 0.45, y, zc, r, r, r)], 16, null, 0.05));
      push(K.metal, loft([sec(x + len / 2 - 0.45, y, zc - 0.01, r * 1.08, r * 1.08, r * 1.08),
                          sec(x + len / 2 - 0.15, y, zc - 0.01, r * 1.08, r * 1.08, r * 1.08),
                          sec(x + len / 2, y, zc - 0.01, r * 0.75, r * 0.75, r * 0.75)], 16, null, null));
      K.metal.push(capOf(sec(x + len / 2, y, zc - 0.01, r * 0.75, r * 0.75, r * 0.75), 16, 0.06, true));
      K.dark.push(cyl(0.07, 0.07, 0.02, 10, "y", x + len / 2 - 0.28, y - r * 1.08, zc - 0.02));   /* window */
    }
  }

  /* the M53 nozzle (D side and plan): shroud ring, petals, dark seams, bore */
  function nozzle(K) {
    var z = NOZ.z;
    push(K.metal, loft([sec(NOZ.x0, 0, z, NOZ.r0, NOZ.r0, NOZ.r0), sec(NOZ.x1, 0, z, NOZ.r1, NOZ.r1, NOZ.r1)], 24, null, null));
    push(K.nozzle, loft([sec(NOZ.x1, 0, z, NOZ.r1, NOZ.r1, NOZ.r1), sec(NOZ.x2, 0, z, NOZ.r2, NOZ.r2, NOZ.r2)], 24, null, null));
    push(K.dark, loft([sec(NOZ.x2, 0, z, NOZ.r2 - 0.015, NOZ.r2 - 0.015, NOZ.r2 - 0.015), sec(NOZ.x2 + 0.5, 0, z, 0.38, 0.38, 0.38)], 20, null, null));
    K.dark.push(capOf(sec(NOZ.x2 + 0.5, 0, z, 0.38, 0.38, 0.38), 20, 0, false));
    for (var i = 0; i < 16; i++) {
      var a = (i + 0.5) * 2 * PI / 16;
      K.dark.push(bar([NOZ.x1 - 0.02, Math.cos(a) * (NOZ.r1 + 0.002), z + Math.sin(a) * (NOZ.r1 + 0.002)],
                      [NOZ.x2 + 0.02, Math.cos(a) * (NOZ.r2 + 0.002), z + Math.sin(a) * (NOZ.r2 + 0.002)], 0.010, 3));
    }
  }

  function buildAirframe(THREE, C, VT) {
    V = THREE;
    var T = makeMats(C, VT);
    var g = new V.Group();
    g.name = "mirage2000_" + VT.key;
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [], ord: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y, r, S = VT.str;
    function fx(x) { return x > 2.2 ? x + S : x; }          /* the two-seater's stretch, forward of the intakes */

    /* ---- radome and body */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i].slice();
      r[0] = fx(r[0]);
      if (VT.seats === 2 && BODY_D_CROWN[BODY[i][0].toFixed(2)] !== undefined) r[2] = BODY_D_CROWN[BODY[i][0].toFixed(2)];
      var sc = sec(r[0], 0, r[4], r[1], r[2] - r[4], r[4] - r[3], r[5], r[6]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 40, 0, null));
    push(K.skin, loft(bs, 40, null, 0));
    if (VT.pitot) {                                           /* 2000C: P1, P2 */
      K.metal.push(cyl(0.012, 0.022, 0.43, 6, "x", 7.18 + S + 0.20, 0, 0.05));
    }

    /* ---- canopy on its sill, frames */
    var CT = VT.seats === 2 ? CANOPY2 : CANOPY1, FT = VT.seats === 2 ? FRAMES2 : FRAMES1;
    var cs = [];
    for (i = 0; i < CT.length; i++) cs.push(sec(CT[i][0], 0, 0.76, CT[i][1], CT[i][2] - 0.76, 0.10, 1.0, 1.0));
    push(K.glass, loft(cs, 28, 0.04, 0.03));
    function topAt(x) {
      for (var j = 0; j < CT.length - 1; j++)
        if (x <= CT[j][0] && x >= CT[j + 1][0]) {
          var f = (CT[j][0] - x) / (CT[j][0] - CT[j + 1][0]);
          return [CT[j][1] + (CT[j + 1][1] - CT[j][1]) * f, CT[j][2] + (CT[j + 1][2] - CT[j][2]) * f];
        }
      return [CT[0][1], CT[0][2]];
    }
    for (i = 0; i < FT.length; i++) {
      var tp = topAt(FT[i]);
      var rr = ringOf(sec(FT[i], 0, 0.76, tp[0] + 0.012, tp[1] - 0.76 + 0.012, 0.10), 28);
      for (var j = 0; j < 14; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 28], 0.024, 4));
    }

    /* ---- refuelling probe, starboard, ahead of the windscreen (P1-P4) */
    var pb = [4.55 + S, -0.30, 0.60], pe = [5.15 + S, -0.32, 1.05], pt = [5.80 + S, -0.32, 1.10];
    K.metal.push(bar(pb, pe, 0.045, 8));
    K.metal.push(bar(pe, pt, 0.040, 8));
    K.metal.push(cyl(0.040, 0.025, 0.10, 8, "x", pt[0] + 0.05, pt[1], pt[2]));
    push(K.skin, loft([sec(4.30 + S, -0.31, 0.56, 0.06, 0.05, 0.05), sec(4.62 + S, -0.31, 0.60, 0.07, 0.06, 0.06)], 10, null, 0.05));

    /* ---- intake trunks, the dark ducts, the half cones, the strakes */
    for (s = -1; s <= 1; s += 2) {
      var ts = [];
      for (i = 0; i < TRUNK.length; i++) {
        r = TRUNK[i];
        ts.push(sec(r[0], s * r[1], r[3], r[2], r[4], r[4], r[5], r[5]));
      }
      push(K.skin, loft(ts, 28, null, 0.2));
      var m0 = TRUNK[0];
      push(K.dark, loft([sec(m0[0] - 0.50, s * m0[1], m0[3], m0[2] - 0.05, m0[4] - 0.05, m0[4] - 0.05, m0[5], m0[5]),
                         sec(m0[0] + 0.004, s * m0[1], m0[3], m0[2] - 0.012, m0[4] - 0.012, m0[4] - 0.012, m0[5], m0[5])], 28, null, null));
      K.dark.push(capOf(sec(m0[0] - 0.49, s * m0[1], m0[3], m0[2] - 0.06, m0[4] - 0.06, m0[4] - 0.06, m0[5], m0[5]), 28, 0, true));
      var lip = ringOf(sec(m0[0] + 0.005, s * m0[1], m0[3], m0[2] + 0.002, m0[4] + 0.002, m0[4] + 0.002, m0[5], m0[5]), 28);
      for (i = 0; i < 28; i++) K.skin.push(bar(lip[i], lip[(i + 1) % 28], 0.02, 4));
      /* the half cone (souris): a cone on the inner wall, its inner half buried in the body */
      push(K.skin, loft([sec(CONE.tip, s * CONE.y, CONE.z, 0.01, 0.01, 0.01),
                         sec(CONE.tip - 0.25, s * CONE.y, CONE.z, CONE.r * 0.62, CONE.r * 0.62, CONE.r * 0.62),
                         sec(CONE.base, s * CONE.y, CONE.z, CONE.r, CONE.r, CONE.r),
                         sec(CONE.base - 0.60, s * CONE.y, CONE.z, CONE.r, CONE.r, CONE.r)], 16, 0, null));
      /* the strake over the intake (D plan X 1.22..2.15 to Y 1.13; head-on Z 0.66) */
      K.skin.push(sloft([
        [[2.15, s * 0.94, 0.68], [1.95, s * 1.10, 0.68], [1.22, s * 1.13, 0.68], [1.22, s * 0.94, 0.68]],
        [[2.15, s * 0.94, 0.64], [1.95, s * 1.10, 0.64], [1.22, s * 1.13, 0.64], [1.22, s * 0.94, 0.64]]]));
    }

    /* ---- wing: one loft of aerofoil sections, root (inside the body) to tip */
    for (s = -1; s <= 1; s += 2) {
      var ws = [], WST = [0.50, WROOT, 0.97, 1.205, 2.0, 3.0, 4.0, 4.38, 4.50, WTIP];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        var le = wLE(y), te = wTE(y), th = wT(y);
        if (y === WTIP) th = 0.03;
        ws.push(foil([le, s * y, wZ(y)], [te, s * y, wZ(y)], th, [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      /* the team strip: a thin plate lying ON the upper skin of the outer wing */
      var plate = function (yy) {
        var zz = wZ(yy) + wT(yy) * 0.47 + 0.02;
        return blk([wLE(yy), s * yy, zz], [wTE(yy), s * yy, zz], 0.35, 0.75, 0.02, [0, 0, 1]);
      };
      K.team.push(sloft([plate(3.45), plate(3.95)]));
    }

    /* ---- fin, its tip, the cross-fairing, the root fairing */
    function finSec(z, t) { return foil([finLE(z), 0, z], [finTE(z), 0, z], t, [0, 1, 0]); }
    K.skin.push(sloft([finSec(1.00, 0.24), finSec(FIN.z0, 0.24), finSec(2.2, 0.17), finSec(3.2, 0.10),
                       foil([finLE(3.50) - 0.04, 0, 3.53], [finTE(3.53), 0, 3.53], 0.07, [0, 1, 0]),
                       foil([-6.25, 0, FIN.z1], [finTE(FIN.z1), 0, FIN.z1], 0.05, [0, 1, 0])]));
    /* cross-fairing at Z 2.93 (D side X -5.13..-6.95; head-on 0.56 m wide) */
    var fz = 2.93;
    K.skin.push(sloft([
      [[-5.13, 0.00, fz + 0.035], [-5.40, 0.20, fz + 0.03], [-6.70, 0.25, fz + 0.03], [-6.95, 0.04, fz + 0.03],
       [-6.95, -0.04, fz + 0.03], [-6.70, -0.25, fz + 0.03], [-5.40, -0.20, fz + 0.03], [-5.13, -0.00, fz + 0.035]],
      [[-5.13, 0.00, fz - 0.035], [-5.40, 0.20, fz - 0.03], [-6.70, 0.25, fz - 0.03], [-6.95, 0.04, fz - 0.03],
       [-6.95, -0.04, fz - 0.03], [-6.70, -0.25, fz - 0.03], [-5.40, -0.20, fz - 0.03], [-5.13, -0.00, fz - 0.035]]]));
    /* root fairing over the nozzle (D side: X -4.2 .. -6.66, top Z 1.41, round tail) */
    push(K.skin, loft([sec(-4.20, 0, 1.22, 0.10, 0.12, 0.12), sec(-5.00, 0, 1.27, 0.14, 0.14, 0.14),
                       sec(-6.45, 0, 1.27, 0.14, 0.14, 0.14), sec(-6.66, 0, 1.27, 0.09, 0.09, 0.09)], 14, null, 0.08));

    nozzle(K);

    /* ---- stores, per variant (see the header) */
    var IN = 2.45, OUT = 3.55;
    function wingPylon(yy, x0, x1) {
      var zb = wZ(yy) - wT(yy) * 0.40;
      for (s = -1; s <= 1; s += 2) pylon(K.skin, x0, x1, s * yy, zb + 0.02, zb - 0.24, 0.09);
      return zb - 0.24;
    }
    function fusPylon(yy, x0, x1, depth) {
      pylon(K.skin, x0, x1, yy, -0.20, -0.27 - depth, 0.08);
      return -0.27 - depth;
    }
    var zIn = wingPylon(IN, -1.2, -3.1), zOut;
    for (s = -1; s <= 1; s += 2) store(K, "tank", -1.75, s * IN, zIn);
    if (VT.load === "c" || VT.load === "m5") {
      zOut = wingPylon(OUT, -2.55, -4.15);
      for (s = -1; s <= 1; s += 2) store(K, VT.load === "c" ? "magic" : "mica", -3.05, s * OUT, zOut);
    }
    var FY = 0.55, zf;
    if (VT.load === "c") {
      for (s = -1; s <= 1; s += 2) { zf = fusPylon(s * FY, 1.4, -0.4, 0.10); store(K, "s530", 0.62, s * FY, zf); }
    } else if (VT.load === "m5") {
      for (s = -1; s <= 1; s += 2) {
        zf = fusPylon(s * FY, 1.6, -0.2, 0.10); store(K, "mica", 1.05, s * FY, zf);     /* P5: nose at the lip */
        zf = fusPylon(s * FY, -2.0, -3.6, 0.10); store(K, "mica", -2.85, s * FY, zf);
      }
    } else {
      zf = fusPylon(-FY, 1.9, 0.2, 0.22); store(K, "pdlct", 1.20, -FY, zf);            /* front starboard (P6) */
      for (s = -1; s <= 1; s += 2) { zf = fusPylon(s * FY, -2.0, -3.6, 0.10); store(K, "gbu12", -2.75, s * FY, zf); }
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

    /* ---- landing gear (D side and head-on, P1): it retracts, so "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 3.13 + S, nr = 0.22, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.15, 0, -0.24], [nx, 0, nz + 0.10], 0.055, 10));            /* nose leg */
    G.metal.push(bar([nx + 0.75, 0, -0.25], [nx + 0.06, 0, nz + 0.55], 0.03, 6));       /* drag brace */
    G.metal.push(bar([nx, -0.20, nz], [nx, 0.20, nz], 0.035, 6));                        /* axle */
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.12, 20, "y", nx, s * 0.17, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.13, 12, "y", nx, s * 0.17, nz));
      G.dark.push(box(1.20, 0.025, 0.28, nx - 0.45, s * 0.20, -0.40));                    /* bay doors */
    }
    var mx = -1.79, mr = 0.375, mz = GROUND + mr, my = 1.82;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.08, s * 1.40, -0.12], [mx, s * (my - 0.15), mz + 0.12], 0.075, 10));   /* main leg */
      G.metal.push(bar([mx - 0.75, s * 1.30, -0.14], [mx - 0.02, s * (my - 0.17), mz + 0.55], 0.035, 6));
      G.metal.push(cyl(0.05, 0.05, 0.20, 8, "y", mx, s * (my - 0.10), mz));
      G.tyre.push(cyl(mr, mr, 0.21, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.22, 14, "y", mx, s * my, mz));
      /* leg door, on the outer side of the leg (D side, P1) */
      G.dark.push(place(new V.BoxGeometry(0.85, 0.025, 0.70), mx + 0.05, s * (my - 0.30), -0.55, s * 0.30, 0, 0));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  var out = { VARIANTS: VARIANTS };
  Object.keys(VARIANTS).forEach(function (id) {
    out[id] = function (THREE, M, C) { return buildAirframe(THREE, C, VARIANTS[id]); };
  });
  return out;
})();

/* len is the measured X extent: the nose (pitot tip on the 2000C, radome
   tip on the others) to the fin cross-fairing's trailing end (-6.95) or
   the nozzle exit (-7.18), whichever is further aft. */
UNIT_MODELS["fra_e80_fighter"] = { len: 14.78, build: HeroMirage2000.fra_e80_fighter };
UNIT_MODELS["fra_e90_fighter"] = { len: 14.36, build: HeroMirage2000.fra_e90_fighter };
UNIT_MODELS["fra_e90_cas"]     = { len: 14.55, build: HeroMirage2000.fra_e90_cas };
