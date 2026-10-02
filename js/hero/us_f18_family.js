/* ============ us_f18_family.js -- F/A-18 HORNET, SUPER HORNET, GROWLER (HERO MODEL) ============

   The McDonnell Douglas / Boeing twin-fin carrier fighter, drawn for the four
   rows that fly it:
     nato_e90_cfighter  F/A-18C Hornet (1987), the legacy airframe
     cfighter_n         F/A-18E Super Hornet (2001; the e00 and e20 decks)
     nato_e00_ewair     EA-18G Growler (2009), ALQ-99 jamming pods
     ew_n               EA-18G Growler of the 2020s, NGJ-MB pods
   No other row draws any of them: there is no F/A-18A and no two-seat D or F
   in the roster. The e50-e80 carrier-fighter rows (Cougar, Phantom, Tomcat)
   have no model of their own and borrow the first same-role peer, which stays
   cfighter_n; they are not touched here.

   TWO AIRFRAMES, NOT ONE. The Super Hornet is not a stretched Hornet from the
   outside, and the two are told apart at once from the game camera:
     legacy   17.07 m long, 11.43 m span as the Navy quotes it (see THE SPAN),
              4.66 m high;
              a small LEX (half-width 1.32 m where it meets the wing), a wing
              with 26.5 degrees of leading-edge sweep, rounded D-shaped intakes
     super    18.31 m, 13.62 m published (drawn 12.84, see THE SPAN), 4.88 m;
              a LEX half again as wide (1.94 m, with a straight shoulder
              running aft to the wing), a larger wing, a horizontal tail 20
              per cent wider, rectangular caret intakes
   Both keep the twin fins canted 20 degrees outward and the twin F404 / F414
   nozzles, and both land on a tricycle gear with twin nose wheels.

   Published figures (Boeing and Navy fact sheets as commonly quoted): F/A-18C
   56 ft 0 in x 37 ft 6 in x 15 ft 4 in; F/A-18E 60 ft 1 in x 44 ft 8.5 in x
   16 ft. The Hornet's 37 ft 6 in (11.43 m) is the figure the Navy and the
   maker quote; with AIM-9s on the wingtip LAU-7 launchers the span is 40 ft
   5 in (12.3 m), which is the Wikipedia infobox's figure and the width the
   Commons three-view draws over its missile fins (about 12.2 m at this
   length). The Super Hornet's 13.62 m is the width over its tip launchers
   (the F/A-18F silhouette measures 13.6 m over them). Here the legacy
   airframe is drawn to the 11.43 m figure over its missile tips, with the
   three-view's wing (10.9 m tip to tip) inside it, and the Super Hornet to
   12.84 m; both are cut to fit the revetments, see THE SPAN. Wheel track
   3.1 m and 3.2 m (the Growler photograph below measures it), wheelbase 5.4 m
   and, as drawn, 5.75 m.

   THE SPAN. The game scales an aircraft by its length (render3d.js: r x
   2.24), and all four rows have r 16: the legacy Hornet is drawn 2.10 times
   its real size, the Super Hornet 1.96. The airbase's revetment walls stand
   25.1 m apart and tools/jsc/parked3d_check.js B holds an aircraft to 0.15 m
   of them. The legacy Hornet at the quoted 11.43 m is 24.0 m wide and fits;
   over its AIM-9s at 12.3 m it would be 25.8 m, 0.35 m into each wall, so
   its missiles stay at the quoted figure. The
   Super Hornet at 13.62 m would be 26.7 m, 0.8 m through each wall, so its
   wing is cut at 6.20 m from the centreline: 12.84 m over the rail and
   missile (12.86 m over the Growler's tip pod), 25.2 m in the game. The
   planform, the stations and the tip chord are the drawing's, the wing just
   ends 0.4 m sooner (its tip chord is 1.7 m, not 1.4 m). Measured 17.07 x
   11.44 x 4.68 m (legacy) and 18.31 x 12.86 x 4.90 m (super).

   Drawings and photographs (Wikimedia Commons; the planforms were read off
   them as silhouettes and fixed to the published lengths and spans; the
   drawn model was laid over the legacy three-view and the F/A-18F silhouette
   and the side profile matches the three-view to 0.1 m at sixteen stations
   from the radome to the nozzles, canopy, spine, fin and belly alike):
     "McDonnell Douglas F-A-18 Hornet 3-view line drawing.png"  the legacy
        airframe. Top view: the LEX edge 0.66 m off the centreline 3.85 m aft
        of the nose and 1.32 m at 8.5 m; the wing leading edge meeting the LEX
        at 8.86 m and running out at 27 degrees; the trailing edge swept
        forward 7 degrees to 12.3 m at the tip; stabilators 5.98 m across with
        leading edges swept 51 degrees; the fins' leading edge raking from
        12.2 m at the deck to 14.0 m at the tip, the tip 4.66 m up. Side
        view: the canopy crown 3.34 m up at 5.4 m aft, the spine 3.04 m, the
        belly 1.36 m ahead of the engine bays and 1.0 m under them.
     "Northrop YF-17 McDonnell Douglas FA-18 Boeing FA-18EF Super Hornet.png"
        three silhouettes at the same angle: the Super Hornet LEX growing from
        0.55 m at 3.7 m to a 1.94 m shoulder at 7.75 m, the wing leading edge
        starting again at 8.9 m and sweeping 29 degrees to a 1.4 m tip, and
        the horizontal tail tip 3.6 m off the centreline at 17.1 m.
     "F18 schem 02.gif"  the Super Hornet's own three-view, for the fin and
        the canopy.
     "EA-18G pair of NGJ-MB pods and a single TJS pod on centerline.jpg"
        (VAQ-138 at RED FLAG-Alaska, April 2026, a Marine Corps photograph):
        head-on. The tank pair on the inboard stations 2.3 m off the
        centreline and a pair of fat NGJ-MB pods on the mid-board stations
        3.5 m out, a TJS (ALQ-99) pod on the centreline, ALQ-218 pods on the
        wingtips where the Hornet's AIM-9 rails would be, the fins painted in
        squadron colours, the wing flat, the main wheels 3.2 m apart.

   What reads as a Hornet and not as "a twin-fin jet", at RTS zoom:
     1. Twin fins canted out, with the stabilators low under them and the
        nozzles set wide apart behind a broad flat engine deck.
     2. The LEX: a thin blade running forward from the wing root to the
        cockpit side, wide on the Super Hornet.
     3. A single long bubble canopy (two seats in tandem on the Growler), the
        dark anti-glare panel ahead of it, and the intakes under the LEX
        with their lips about under the canopy's rear half.
     4. The loads: AIM-9 on the wingtip rails, a missile on each cheek, tanks
        inboard. The Growler has pods in place of every one of those: ALQ-218
        receivers on the tips, jammers mid-wing and on the centreline.

   VARIANTS (what each row hangs on the wing, from its row in eras.js/rules.js)
     C   AIM-9L tips, a Mk 83 on each outboard pylon, a 330 gal tank on each
         inboard pylon, the AAS-38 NITE Hawk pod on the port cheek station and
         an AIM-120 on the starboard (the weapons row names both); the gun is
         in the nose.
     E   AIM-9X tips, AIM-120 on the outboard stations, a GBU-32 mid-wing and
         a 480 gal tank inboard (the row carries "aam" and "jdam"), an ATFLIR
         on the port cheek and an AIM-120 on the starboard.
     G1  the 2009 Growler: ALQ-218 tip pods, HARM outboard, ALQ-99 on both
         mid-wing stations and the centreline (the row's "three ALQ-99 pods"),
         tanks inboard, no gun.
     G2  the 2020s Growler: the same with NGJ-MB pods on the mid-wing stations
         (the photograph above), AARGM outboard, the TJS pod kept on the
         centreline.

   Budget: 8,008 (C), 8,672 (E), 9,444 (G1) and 9,348 (G2) triangles; 12 draw
   calls and 9 materials on each (the old cfighter_n was 5,860 triangles in
   113 meshes, 21.0 m long for an 18.3 m aeroplane). The gear is the lowest
   opaque part on all four: the tanks hang 0.78 m above the tyres, the
   centreline pod on the Growler 0.39 m, the hook and the doors higher.

   Model space: +X nose, +Y left (port), +Z up, metres. Stations s are metres
   aft of the radome tip, heights h are metres above the ground; the model is
   centred on X and the gear stands on z = ZG. Nothing sticks out along X: the
   radome tip and the nozzle ends are the two extremes. Paint: one projected
   sheet for the airframe (four plan views at 52 px to the metre), so panel
   lines, control surfaces and insignia lie where they do on the aeroplane.
   Every material is one merged mesh; the gear is its own named group.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF18 = (function () {
  "use strict";

  var V = null;                 /* THREE, set by build()                     */
  var D2R = Math.PI / 180;
  var AF = null;                /* the airframe table being built            */
  var VR = null;                /* the variant being built                   */

  function X(s) { return AF.L / 2 - s; }
  function Z(h) { return h + AF.ZG; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lin(tab, x) {
    var n = tab.length, i;
    if (x <= tab[0][0]) return tab[0][1];
    for (i = 1; i < n; i++) {
      if (x <= tab[i][0]) {
        var t = (x - tab[i - 1][0]) / (tab[i][0] - tab[i - 1][0]);
        return tab[i - 1][1] + t * (tab[i][1] - tab[i - 1][1]);
      }
    }
    return tab[n - 1][1];
  }

  /* ================================================== the legacy airframe ==
     Body stations [s, half-width, centre h, top h, belly h, top exponent,
     belly exponent]; the exponent squares a section (1 an ellipse, 0.5 a
     rounded box). bodyA ends at the intake lip; bodyB starts 0.10 m behind
     it at the full width of fuselage and intakes, so the step between is
     the lip face and the dark mouth plates sit on it. */
  var LEG = {
    id: "legacy", L: 17.07, ZG: -1.85, semi: 5.45, tipY: 5.57,
    bodyA: [
      [ 0.00, 0.030, 1.77, 1.80, 1.74, 1.00, 1.00],
      [ 0.45, 0.270, 1.82, 2.05, 1.58, 1.00, 1.00],
      [ 1.00, 0.400, 1.84, 2.22, 1.47, 0.90, 0.90],
      [ 1.80, 0.460, 1.90, 2.38, 1.41, 0.85, 0.85],
      [ 2.80, 0.480, 2.00, 2.60, 1.40, 0.80, 0.80],
      [ 3.60, 0.520, 2.07, 2.72, 1.41, 0.80, 0.80],
      [ 4.60, 0.580, 2.10, 2.76, 1.43, 0.75, 0.75],
      [ 5.60, 0.620, 2.10, 2.80, 1.42, 0.70, 0.70],
      [ 5.95, 0.630, 2.10, 2.82, 1.40, 0.70, 0.70]
    ],
    bodyB: [
      [ 6.05, 1.10, 2.00, 2.84, 1.30, 0.55, 0.60],
      [ 7.20, 1.16, 1.98, 3.04, 1.30, 0.50, 0.55],
      [ 8.40, 1.20, 1.98, 3.04, 1.27, 0.50, 0.55],
      [ 9.30, 1.24, 1.96, 3.00, 1.08, 0.50, 0.55],
      [10.40, 1.30, 1.94, 2.90, 1.06, 0.50, 0.55],
      [11.80, 1.36, 1.92, 2.78, 1.10, 0.50, 0.55],
      [13.20, 1.38, 1.90, 2.66, 1.08, 0.50, 0.55],
      [14.40, 1.32, 1.88, 2.50, 1.02, 0.52, 0.55],
      [15.40, 1.22, 1.84, 2.38, 1.16, 0.55, 0.60],
      [16.20, 1.10, 1.82, 2.28, 1.40, 0.60, 0.60]
    ],
    lip: 6.0,
    mouth: { y0: 0.65, y1: 1.07, h0: 1.22, h1: 2.12, sq: 0.7 },
    /* canopy [s, half-width, base h, crown h] */
    canopy: [
      [3.45, 0.18, 2.70, 2.74], [3.80, 0.34, 2.72, 3.02], [4.30, 0.46, 2.74, 3.22],
      [4.90, 0.52, 2.76, 3.33], [5.50, 0.53, 2.78, 3.34], [6.10, 0.50, 2.80, 3.26],
      [6.70, 0.42, 2.84, 3.14], [7.10, 0.30, 2.90, 3.05]
    ],
    /* wing and LEX in one surface: leading edge as [y, s]; the trailing edge
       is a straight line swept forward; thickness [y, metres]; plane height */
    leTab: [[0.40, 2.50], [0.66, 3.85], [1.32, 8.50], [1.62, 8.86], [5.45, 10.85]],
    teS0: 12.90, teK: 0.125, y0: 0.40,
    thTab: [[0.40, 0.16], [1.00, 0.14], [1.32, 0.14], [1.62, 0.30], [3.00, 0.22], [5.45, 0.08]],
    zTab: [[0.40, 2.46], [0.70, 2.40], [1.00, 2.28], [1.32, 2.12], [1.62, 1.98], [2.10, 1.95], [5.45, 1.95]],
    wingYs: [0.40, 0.66, 1.00, 1.32, 1.62, 2.40, 3.40, 4.40, 5.45],
    flashY: [4.20, 4.85],
    /* stabilator: leading edge s = le0 + (y - le1) * leK, trailing edge
       straight; plane height */
    stab: { y0: 0.95, tip: 2.99, le0: 14.63, le1: 1.91, leK: 1.255, te: 17.07, h: 1.78, th0: 0.22, th1: 0.06 },
    fin: { y0: 0.80, h0: 2.72, H: 1.94, le0: 12.20, le1: 13.97, te0: 15.20, te1: 15.02, cant: 20, th0: 0.17, th1: 0.05, hMin: 2.10 },
    noz: { y: 0.62, s0: 15.55, s1: 16.80, r0: 0.50, r1: 0.42, h: 1.82 },
    gear: { ns: 3.65, ms: 9.00, track: 1.55, nr: 0.28, mr: 0.40 },
    sta: { inb: 2.20, mid: 3.10, out: 3.90, cheek: 0.95 },
    flashFin: 0.42
  };

  /* ===================================================== the Super Hornet ==
     Scaled from the legacy tables where the aeroplane is (length 1.073,
     height 1.047, width 1.10), then the planform tables overwritten from the
     silhouette. */
  function scaleBody(tab, ks, kh, kw) {
    return tab.map(function (r) {
      return [r[0] * ks, r[1] * kw, r[2] * kh, r[3] * kh, r[4] * kh, r[5], r[6]];
    });
  }
  var SUP = {
    id: "super", L: 18.31, ZG: -1.90, semi: 6.20, tipY: 6.27,
    bodyA: scaleBody(LEG.bodyA, 1.073, 1.047, 1.10),
    bodyB: scaleBody(LEG.bodyB, 1.073, 1.047, 1.10),
    lip: 6.45,
    mouth: { y0: 0.74, y1: 1.28, h0: 1.20, h1: 2.24, sq: 0.45 },
    canopy: scaleBody(LEG.canopy.map(function (r) { return [r[0], r[1], r[2], r[3], 0, 1, 1]; }), 1.073, 1.047, 1.04)
      .map(function (r) { return [r[0], r[1], r[2], r[3]]; }),
    canopy2: [
      [3.70, 0.20, 2.80, 2.86], [4.10, 0.36, 2.82, 3.14], [4.65, 0.48, 2.84, 3.36],
      [5.25, 0.55, 2.86, 3.48], [5.95, 0.57, 2.88, 3.50], [6.70, 0.57, 2.92, 3.50],
      [7.30, 0.56, 2.98, 3.52], [7.95, 0.52, 3.04, 3.50], [8.55, 0.42, 3.10, 3.42],
      [9.05, 0.30, 3.14, 3.30], [9.40, 0.18, 3.16, 3.20]
    ],
    leTab: [[0.45, 2.90], [0.58, 3.74], [0.97, 4.81], [1.42, 5.88], [1.74, 6.95], [1.94, 7.75],
            [2.00, 8.82], [2.26, 9.09], [6.20, 11.305]],
    teS0: 13.77, teK: 0.133, y0: 0.45,
    thTab: [[0.45, 0.20], [1.50, 0.20], [2.00, 0.34], [3.50, 0.26], [6.20, 0.09]],
    zTab: [[0.45, 2.56], [0.80, 2.46], [1.30, 2.30], [1.70, 2.10], [2.00, 2.02], [2.30, 2.00], [6.20, 2.00]],
    wingYs: [0.45, 0.58, 0.97, 1.42, 1.80, 2.00, 2.26, 3.20, 4.40, 5.40, 6.20],
    flashY: [5.05, 5.75],
    stab: { y0: 1.00, tip: 3.62, le0: 15.24, le1: 2.13, leK: 1.176, te: 18.31, h: 1.86, th0: 0.26, th1: 0.07 },
    fin: { y0: 0.90, h0: 2.82, H: 2.06, le0: 13.10, le1: 15.00, te0: 16.30, te1: 16.10, cant: 20, th0: 0.19, th1: 0.055, hMin: 2.20 },
    noz: { y: 0.72, s0: 16.70, s1: 18.05, r0: 0.56, r1: 0.48, h: 1.90 },
    gear: { ns: 4.00, ms: 9.75, track: 1.60, nr: 0.29, mr: 0.42 },
    sta: { inb: 2.30, mid: 3.50, out: 4.50, cheek: 1.02 },
    flashFin: 0.48
  };

  /* what each row carries: [type, station, sides]. Sides: "b" both, "p" port,
     "s" starboard, "c" centre */
  var VARS = {
    C:  { af: LEG, seats: 1, gun: true, seed: 1991, tex: "C", top: "#77828a", belly: "#a2abb0", tone: "#5f6a72",
          loads: [["aim9", "tip", "b"], ["mk83", "out", "b"], ["tank330", "inb", "b"],
                  ["flir", "cheek", "p"], ["aim120", "cheek", "s"]] },
    E:  { af: SUP, seats: 1, gun: true, seed: 2001, tex: "E", top: "#8b959b", belly: "#a9b2b7", tone: "#68737a",
          loads: [["aim9", "tip", "b"], ["aim120", "out", "b"], ["jdam", "mid", "b"], ["tank480", "inb", "b"],
                  ["flir", "cheek", "p"], ["aim120", "cheek", "s"]] },
    G1: { af: SUP, seats: 2, gun: false, seed: 2009, tex: "G", top: "#88939a", belly: "#a7b0b5", tone: "#66717a",
          loads: [["alq218", "tip", "b"], ["harm", "out", "b"], ["alq99", "mid", "b"], ["tank480", "inb", "b"],
                  ["alq99", "ctr", "c"], ["aim120", "cheek", "b"]] },
    G2: { af: SUP, seats: 2, gun: false, seed: 2009, tex: "G", top: "#88939a", belly: "#a7b0b5", tone: "#66717a",
          loads: [["alq218", "tip", "b"], ["harm", "out", "b"], ["ngj", "mid", "b"], ["tank480", "inb", "b"],
                  ["alq99", "ctr", "c"], ["aim120", "cheek", "b"]] }
  };

  /* store dimensions: length, diameter, nose fraction, nose sharpness, tail
     fraction, material */
  var STORE = {
    aim9:    { L: 2.87, D: 0.127, nf: 0.12, np: 0.85, tf: 0.10, m: "store" },
    aim120:  { L: 3.66, D: 0.178, nf: 0.12, np: 0.80, tf: 0.06, m: "store" },
    harm:    { L: 4.17, D: 0.254, nf: 0.16, np: 0.80, tf: 0.05, m: "store" },
    mk83:    { L: 3.00, D: 0.36,  nf: 0.20, np: 0.55, tf: 0.22, m: "ord" },
    jdam:    { L: 3.10, D: 0.37,  nf: 0.20, np: 0.55, tf: 0.22, m: "ord" },
    tank330: { L: 4.10, D: 0.74,  nf: 0.22, np: 0.50, tf: 0.26, m: "store" },
    tank480: { L: 4.60, D: 0.84,  nf: 0.22, np: 0.50, tf: 0.26, m: "store" },
    alq99:   { L: 4.50, D: 0.56,  nf: 0.14, np: 0.60, tf: 0.20, m: "store" },
    ngj:     { L: 4.90, D: 0.70,  nf: 0.22, np: 0.65, tf: 0.20, m: "store" },
    alq218:  { L: 2.40, D: 0.32,  nf: 0.25, np: 0.60, tf: 0.20, m: "store" },
    flir:    { L: 2.20, D: 0.33,  nf: 0.18, np: 0.55, tf: 0.12, m: "store" }
  };

  /* ============================================================ helpers == */
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
      + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  /* Catmull-Rom through a station table, so the body is not a stack of cones */
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++) {
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c],
                     tab[Math.min(m - 1, k + 2)][c], t));
      }
      out.push(row);
    }
    return out;
  }

  /* One body section: N points anticlockwise seen from ahead, a superellipse
     above and below the widest line. */
  function ringAt(st, N) {
    var P = [], i, a, c, s, e, y, z;
    for (i = 0; i < N; i++) {
      a = i / N * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      e = s >= 0 ? st[5] : st[6];
      y = st[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);
      z = s >= 0 ? st[2] + (st[3] - st[2]) * Math.pow(s, e)
                 : st[2] - (st[2] - st[4]) * Math.pow(-s, e);
      P.push([X(st[0]), y, Z(z)]);
    }
    return P;
  }

  /* Bridge rings of equal length with quads; caps are fans. orient() turns a
     closed part outward whichever way round it was wound. */
  function bridge(rings, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    var lim = open ? N - 1 : N;
    for (i = 0; i < nr - 1; i++) {
      for (j = 0; j < lim; j++) {
        var a = i * N + j, b = i * N + (j + 1) % N, c = a + N, d = b + N;
        idx.push(a, c, b, b, c, d);
      }
    }
    function cap(r, first) {
      var cx = 0, cy = 0, cz = 0, base = pos.length / 3, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) pos.push(r[k][0], r[k][1], r[k][2]);
      for (k = 0; k < N; k++) {
        var p = base + 1 + k, q = base + 1 + (k + 1) % N;
        if (first) idx.push(base, p, q); else idx.push(base, q, p);
      }
    }
    if (capA) cap(rings[0], true);
    if (capB) cap(rings[nr - 1], false);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* a closed shell wound outward: positive signed volume */
  function orient(g) {
    var p = g.attributes.position.array, ix = g.index.array, v = 0, t;
    for (t = 0; t < ix.length; t += 3) {
      var a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
         - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
         + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
    }
    if (v < 0) {
      for (t = 0; t < ix.length; t += 3) { var s = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = s; }
      g.index.needsUpdate = true;
      g.computeVertexNormals();
    }
    return g;
  }
  function closed(rings) { return orient(bridge(rings, true, true)); }

  /* NACA four-digit half thickness */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f
               + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring at span station y: TE over the top to the LE and back under;
     th is the thickest point in metres; grow fattens it for a flash sleeve */
  function foil(sLE, sTE, y, h, th, m, grow) {
    var p = [], i, f, g = grow || 0, pad = g ? 0.022 : 0;
    var c = sTE - sLE, tc = th / c, xl = X(sLE) + g;
    c += 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, Z(h) + yt(f, tc) * c + (i === 0 ? 0.004 : 0) + pad]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, Z(h) - yt(f, tc) * c - pad]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  /* rounded rectangle in the y-z plane, anticlockwise from ahead */
  function rrect(x, cy, cz, hw, hh, n, e) {
    var p = [], i, a, c, s;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      p.push([x, cy + hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e),
                 cz + hh * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e)]);
    }
    return p;
  }

  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  /* cylinder between two points */
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  /* wheel: CylinderGeometry's own axis is Y, the axle across the aircraft */
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }

  /* ============================================================= paint ==
     One sheet for the airframe: four plan views at 52 px to the metre, from
     above, from port, from starboard, from below. Every skin triangle takes
     its UVs by projection into the band its normal faces (projUV). */
  var PXM = 52, TW = 1024, TH = 2048, YMAX = 7.0, TOPH = 728, SIDEH = 270;
  var B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  var XMIN = -9.4, ZTOP = 3.2;
  function cu(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZTOP - z) * PXM, 1, SIDEH - 1); }
  function cs(s) { return cu(X(s)); }

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function line(g, x0, y0, x1, y1) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
  function zig(g, x0, y0, x1, y1, amp, wave) {
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy);
    if (L < 1) return;
    var ux = dx / L, uy = dy / L, nx = -uy, ny = ux, n = Math.max(2, Math.round(L / wave)), i;
    g.beginPath();
    for (i = 0; i <= n; i++) {
      var t = i / n * L, s = (i === 0 || i === n) ? 0 : (i % 2 ? amp : -amp);
      if (i === 0) g.moveTo(x0 + ux * t + nx * s, y0 + uy * t + ny * s);
      else g.lineTo(x0 + ux * t + nx * s, y0 + uy * t + ny * s);
    }
    g.stroke();
  }
  function poly(g, pts, fill) {
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath();
    g.fillStyle = fill; g.fill();
  }
  /* low-visibility insignia: a disc with the bar, a shade darker than the skin */
  function star(g, cx, cy, r, col) {
    g.fillStyle = col;
    g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.closePath(); g.fill();
    g.fillRect(cx - r * 2.0, cy - r * 0.32, r * 4.0, r * 0.64);
    g.fillStyle = "rgba(160,168,172,0.55)";
    g.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.38 : r * 0.92;
      if (i === 0) g.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      else g.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }

  function wingLE(y) { return lin(AF.leTab, y); }
  function wingTE(y) { return AF.teS0 - (y - AF.y0) * AF.teK; }
  function stabLE(y) { return AF.stab.le0 + (y - AF.stab.le1) * AF.stab.leK; }

  function paintSheet() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), R = rngFor(VR.seed), i, k, y, b, s;
    var tone = VR.tone, semi = AF.semi, st = AF.stab, fin = AF.fin;

    g.fillStyle = VR.top; g.fillRect(0, 0, TW, TH);
    g.fillStyle = VR.belly; g.fillRect(0, B_BOT, TW, TOPH);

    /* 1. panel mottle: neighbouring panels weather to slightly different greys */
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#4f585e" : "#b3bcc0";
      g.fillRect(R() * TW, R() * TH, 20 + R() * 80, 8 + R() * 40);
    }
    g.globalAlpha = 1;

    /* 2. radome (a different grey from the skin), the black anti-glare panel
          ahead of the windscreen, and the gun ports in the nose */
    g.fillStyle = tone;
    g.fillRect(cs(1.75), rTop(0.55), cs(0) - cs(1.75), rTop(-0.55) - rTop(0.55));
    for (k = 0; k < 2; k++) g.fillRect(cs(1.75), rSide(Z(2.7), k), cs(0) - cs(1.75), rSide(Z(1.2), k) - rSide(Z(2.7), k));
    g.fillStyle = "rgba(24,28,32,0.86)";
    var scl = AF.L / 17.07;
    g.fillRect(cs(3.60 * scl), rTop(0.40), cs(1.95 * scl) - cs(3.60 * scl), rTop(-0.40) - rTop(0.40));
    if (VR.gun) {
      g.fillStyle = "rgba(14,16,18,0.85)";
      for (k = -1; k <= 1; k++) g.fillRect(cs(1.50), rTop(k * 0.13 + 0.05), 0.10 * PXM, 0.07 * PXM);
    }

    /* 3. fuselage frames and stringers, saw-toothed seams */
    g.lineWidth = 1.2; g.strokeStyle = "rgba(26,30,34,0.34)";
    var fr = [1.75, 2.5, 6.4, 7.6, 8.8, 10.0, 11.2, 12.4, 13.6, 14.8, 16.0], sc = AF.L / 17.07;
    for (i = 0; i < fr.length; i++) {
      s = fr[i] * sc;
      zig(g, cs(s), rTop(0.9), cs(s), rTop(-0.9), 2.4, 8);
      zig(g, cs(s), rBot(1.2), cs(s), rBot(-1.2), 2.4, 8);
    }
    for (k = -1; k <= 1; k += 2) {
      zig(g, cs(7.4 * sc), rTop(k * 0.50), cs(15.6 * sc), rTop(k * 0.50), 2.0, 9);
      zig(g, cs(8.0 * sc), rTop(k * 1.00), cs(15.0 * sc), rTop(k * 1.00), 2.0, 9);
    }
    /* the heat-darkened aft deck and belly round the nozzles */
    g.globalAlpha = 0.40; g.fillStyle = "#4b4642";
    g.fillRect(0, rTop(1.3), cs(AF.noz.s0 - 1.4), rTop(-1.3) - rTop(1.3));
    g.fillRect(0, rBot(1.3), cs(AF.noz.s0 - 1.0), rBot(-1.3) - rBot(1.3));
    g.globalAlpha = 1;

    /* 4. the LEX edge, the leading-edge flap on every wing, the flaperon and
          aileron hinge lines, rib seams, both skins */
    g.strokeStyle = "rgba(20,24,28,0.55)"; g.lineWidth = 1.6;
    var yTip = semi - 0.05, yI = 1.6, yA = semi * 0.62;
    for (k = -1; k <= 1; k += 2) {
      var rows = [rTop, rBot];
      for (b = 0; b < 2; b++) {
        var row = rows[b];
        line(g, cs(wingLE(yI) + 0.62), row(k * yI), cs(wingLE(yTip) + 0.40), row(k * yTip));
        g.beginPath();
        g.moveTo(cs(wingTE(yI) - 1.15), row(k * yI));
        g.lineTo(cs(wingTE(yA) - 1.00), row(k * yA));
        g.lineTo(cs(wingTE(yTip) - 0.62), row(k * yTip)); g.stroke();
        line(g, cs(wingTE(yA) - 1.00), row(k * yA), cs(wingTE(yA)), row(k * yA));
        g.strokeStyle = "rgba(24,28,32,0.26)"; g.lineWidth = 1.0;
        for (y = yI + 0.8; y < yTip - 0.3; y += 0.85) {
          zig(g, cs(wingLE(y) + 0.1), row(k * y), cs(wingTE(y) - 0.1), row(k * y), 1.6, 8);
        }
        g.strokeStyle = "rgba(20,24,28,0.55)"; g.lineWidth = 1.6;
        /* stabilator seams */
        line(g, cs(stabLE(st.tip - 0.3) + 0.8), row(k * (st.tip - 0.3)), cs(st.te - 0.7), row(k * (st.tip - 0.3)));
        line(g, cs(stabLE(st.y0 + 0.9) + 0.4), row(k * (st.y0 + 0.9)), cs(st.te - 0.3), row(k * (st.y0 + 0.9)));
      }
    }

    /* 5. intake lips and ducts: a darker rim, and on the super the long LEX
          vent slot beside each cockpit */
    g.fillStyle = "rgba(30,34,38,0.55)";
    for (k = 0; k < 2; k++) {
      g.fillRect(cs(AF.lip + 0.15), rSide(Z(AF.mouth.h1 + 0.05), k), 0.10 * PXM, rSide(Z(AF.mouth.h0 - 0.05), k) - rSide(Z(AF.mouth.h1 + 0.05), k));
    }
    if (AF === SUP) {
      g.fillStyle = "rgba(30,34,38,0.70)";
      for (k = -1; k <= 1; k += 2) g.fillRect(cs(6.6), rTop(k * 1.18 + 0.05), 1.3 * PXM, 0.10 * PXM);
    }

    /* 6. fins: the rudder hinge, a squadron stripe in a darker grey, and the
          lower aft corner, on both sides of each */
    for (k = 0; k < 2; k++) {
      g.fillStyle = "rgba(40,46,52,0.55)";
      g.fillRect(cs(fin.te1 + 0.05), rSide(Z(fin.h0 + fin.H - 0.62), k), (fin.te1 - fin.le1 + 0.40) * PXM, 0.30 * PXM);
      g.strokeStyle = "rgba(20,24,28,0.5)"; g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(cs(fin.te0 - 0.95), rSide(Z(fin.h0 - 0.05), k));
      g.lineTo(cs(fin.te1 - 0.62), rSide(Z(fin.h0 + fin.H - 0.12), k)); g.stroke();
    }

    /* 7. the weapon stations and gear doors on the belly, and the arrestor
          hook's housing between the nozzles */
    g.strokeStyle = "rgba(16,20,24,0.55)"; g.lineWidth = 1.4;
    var gr = AF.gear;
    function box(s0, s1, ya, yb) {
      g.beginPath(); g.moveTo(cs(s0), rBot(ya)); g.lineTo(cs(s1), rBot(ya)); g.lineTo(cs(s1), rBot(yb));
      g.lineTo(cs(s0), rBot(yb)); g.closePath(); g.stroke();
    }
    for (k = -1; k <= 1; k += 2) box(gr.ms - 0.9, gr.ms + 1.2, k * 0.70, k * (gr.track + 0.25));
    box(gr.ns - 0.1, gr.ns + 1.3, 0.34, -0.34);
    g.fillStyle = "rgba(16,20,24,0.45)";
    g.fillRect(cs(AF.noz.s0 - 1.9), rBot(0.18), 1.8 * PXM, 0.36 * PXM);

    /* 8. insignia: upper port wing, lower starboard wing, both fuselage sides
          under the canopy */
    var ym = semi * 0.60, sm = wingLE(ym) + 0.55 * (wingTE(ym) - wingLE(ym));
    star(g, cs(sm), rTop(ym), 0.40 * PXM, "rgba(82,90,96,0.85)");
    star(g, cs(sm), rBot(-ym), 0.40 * PXM, "rgba(82,90,96,0.85)");
    for (k = 0; k < 2; k++) star(g, cs(AF.lip + 1.8), rSide(Z(1.95), k), 0.20 * PXM, "rgba(82,90,96,0.85)");

    /* 9. stencils and walkway lines: unreadable, they read as markings */
    for (i = 0; i < 80; i++) {
      g.fillStyle = R() < 0.88 ? "rgba(214,218,220,0.34)" : "rgba(170,48,38,0.42)";
      g.fillRect(R() * TW, R() * TH, 4 + R() * 12, 2);
    }
    /* 10. belly grime and streaks running aft */
    g.fillStyle = "rgba(34,32,30,0.12)";
    for (i = 0; i < 60; i++) g.fillRect(R() * TW * 0.9, B_BOT + R() * TOPH, 20 + R() * 70, 2 + R() * 4);
    return cv;
  }

  var _tex = {};
  function sheet() {
    var key = VR.tex;
    if (_tex[key] !== undefined) return _tex[key];
    try {
      var t = new V.CanvasTexture(paintSheet());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;   /* r148 */
      _tex[key] = t;
    } catch (e) { _tex[key] = false; }
    return _tex[key];
  }

  /* projected UVs: each triangle into the band its normal faces. Faces that
     look fore or aft would collapse to a line under an x projection, so they
     are laid out along x plus the cross coordinate. */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > 0.8;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + y : x);
        if (band === 0) Rr = rTop(y);
        else if (band === 3) Rr = rBot(y);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials ==
     SKIN: the painted sheet. METAL: gear legs, pylons, the cockpit frame.
     INK: flat black for ducts, wells and the cockpit tub. HOT: the burnt
     titanium of the nozzles. STORE: tanks, pods and missiles; ORD: bombs and
     fins. GLASS: the canopy. The team colour is exactly C.team, so eraPaint's
     team test leaves it alone; the emissive keeps it from greying under ACES. */
  function makeMats(C) {
    var tex = sheet(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x7a858b);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.hot = new V.MeshStandardMaterial({ color: 0x45484a, roughness: 0.55, metalness: 0.50, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.store = new V.MeshStandardMaterial({ color: 0xaeb4b7, roughness: 0.62, metalness: 0.12 });
    m.ord = new V.MeshStandardMaterial({ color: 0x59604c, roughness: 0.74, metalness: 0.14 });
    m.glass = new V.MeshStandardMaterial({ color: 0x4a5a58, roughness: 0.12, metalness: 0.55,
                                           transparent: true, opacity: 0.80, side: V.DoubleSide });
    return m;
  }

  /* ============================================================ airframe = */
  function addBody(K) {
    var i, rings = [], sec, N = 24;
    sec = resample(AF.bodyA, 15);
    for (i = 0; i < sec.length; i++) rings.push(ringAt(sec[i], N));
    sec = resample(AF.bodyB, 17);
    for (i = 0; i < sec.length; i++) rings.push(ringAt(sec[i], N));
    K.skin.push(closed(rings));

    /* the intake mouths: a dark rounded slab on each lip face, and the duct
       behind it as a short dark tube so the opening has depth */
    var mo = AF.mouth, hw = (mo.y1 - mo.y0) / 2, cy = (mo.y0 + mo.y1) / 2;
    var hh = (mo.h1 - mo.h0) / 2, ch = (mo.h0 + mo.h1) / 2, side;
    for (side = -1; side <= 1; side += 2) {
      var a = rrect(X(AF.lip - 0.02), side * cy, Z(ch), hw, hh, 16, mo.sq);
      var b = rrect(X(AF.lip + 0.30), side * cy, Z(ch), hw * 0.92, hh * 0.92, 16, mo.sq);
      K.ink.push(bridge([a, b], true, true));
    }
  }

  /* the canopy: an open glass shell on the cockpit sills, frame bows, a tub,
     seats and helmets */
  function arcRing(st, n, up) {
    var p = [], k, a;
    for (k = 0; k <= n; k++) {
      a = Math.PI * k / n;
      p.push([X(st[0]), st[1] * Math.cos(a), Z(st[2] + (st[3] + (up || 0) - st[2]) * Math.pow(Math.sin(a), 0.85))]);
    }
    return p;
  }
  function addCanopy(K) {
    var tab = (VR.seats === 2 && AF.canopy2) ? AF.canopy2 : AF.canopy, i, r = [], n = tab.length;
    var sec = resample(tab, 16);
    for (i = 0; i < sec.length; i++) r.push(arcRing(sec[i], 14));
    K.glass.push(bridge(r, false, false, true));
    /* frame bows: the windscreen base, the arch behind the glass and the rear */
    var bows = VR.seats === 2 ? [1, 3, 6, n - 2] : [1, 3, n - 2];
    for (i = 0; i < bows.length; i++) {
      var st = tab[bows[i]];
      var a0 = arcRing([st[0] - 0.04, st[1], st[2], st[3]], 14, 0.012);
      var a1 = arcRing([st[0] + 0.05, st[1], st[2], st[3]], 14, 0.012);
      K.ink.push(bridge([a0, a1], false, false, true));
    }
    /* tub, coaming, seats, helmets */
    var s0 = tab[1][0], s1 = tab[n - 1][0], hb = tab[1][2];
    K.ink.push(boxG(Math.min(2.0, s1 - s0) * 0.85, 0.80, 0.30, X((s0 + s1) / 2), 0, Z(hb - 0.10)));
    var s3 = tab[3][0], seatS = VR.seats === 2 ? [s3, s3 + 1.6] : [s3 + 0.15];
    for (i = 0; i < seatS.length; i++) {
      K.ink.push(boxG(0.30, 0.46, 0.46, X(seatS[i]), 0, Z(hb + 0.22)));
      var helm = new V.SphereGeometry(0.15, 10, 7);
      helm.translate(X(seatS[i] - 0.02), 0, Z(hb + 0.40));
      K.metal.push(helm);
    }
    K.ink.push(boxG(0.30, 0.50, 0.20, X(tab[2][0] + 0.15), 0, Z(hb + 0.18)));
  }

  /* wing and LEX: one lofted surface per side, sections at fixed y */
  function addWings(K) {
    var ys = AF.wingYs, i, r = [];
    for (i = 0; i < ys.length; i++) {
      var y = ys[i];
      r.push(foil(wingLE(y), wingTE(y), y, lin(AF.zTab, y), lin(AF.thTab, y), 10));
    }
    K.skin.push(closed(r));
    K.skin.push(closed(mirrorRings(r)));
  }

  function addTails(K) {
    var st = AF.stab, i, r = [], n = 6;
    for (i = 0; i <= n; i++) {
      var y = st.y0 + (st.tip - st.y0) * i / n, f = i / n;
      r.push(foil(stabLE(y), st.te, y, st.h, st.th0 + (st.th1 - st.th0) * f, 8));
    }
    K.skin.push(closed(r));
    K.skin.push(closed(mirrorRings(r)));

    /* fins: canted, the section taken in the canted plane. u runs up the fin */
    var fn = AF.fin, ca = Math.cos(fn.cant * D2R), sa = Math.sin(fn.cant * D2R);
    function finRing(u, side, grow) {
      var hh = u * fn.H, sLE = fn.le0 + (fn.le1 - fn.le0) * u, sTE = fn.te0 + (fn.te1 - fn.te0) * u;
      var th = fn.th0 + (fn.th1 - fn.th0) * clamp(u, 0, 1), c = sTE - sLE, tc = th / c;
      var g = grow || 0, pad = g ? 0.02 : 0, xl = X(sLE) + g, m = 8, p = [], i2, f, cc = c + 2 * g;
      var y0 = fn.y0 + hh * sa / ca, z0 = Z(fn.h0) + hh;
      function pt(x, t) { return [x, side * (y0 + t * ca), z0 - t * sa]; }
      for (i2 = 0; i2 <= m; i2++) {
        f = 0.5 * (1 + Math.cos(Math.PI * i2 / m));
        p.push(pt(xl - f * cc, yt(f, tc) * c + (i2 === 0 ? 0.003 : 0) + pad));
      }
      for (i2 = m - 1; i2 >= 1; i2--) {
        f = 0.5 * (1 + Math.cos(Math.PI * i2 / m));
        p.push(pt(xl - f * cc, -yt(f, tc) * c - pad));
      }
      return p;
    }
    var u0 = (fn.hMin - fn.h0) / fn.H, us = [u0, u0 * 0.45, 0.0, 0.33, 0.66, 0.9, 1.0], side;
    for (side = -1; side <= 1; side += 2) {
      r = us.map(function (u) { return finRing(u, side); });
      K.skin.push(closed(r));
      /* the squadron colour: a cap round the top of each fin */
      var top = [1.0 - AF.flashFin / fn.H, 1.0 - AF.flashFin / fn.H * 0.45, 1.0];
      r = top.map(function (u) { return finRing(u, side, 0.02); });
      K.team.push(closed(r));
    }
  }

  /* the twin nozzles: convergent petals, a dark throat set back inside */
  function addNozzles(K) {
    var nz = AF.noz, side, i, r, n = 4;
    for (side = -1; side <= 1; side += 2) {
      r = [];
      for (i = 0; i <= n; i++) {
        var f = i / n, rad = nz.r0 + (nz.r1 - nz.r0) * f;
        var ring = [], k;
        for (k = 0; k < 20; k++) {
          var a = k / 20 * Math.PI * 2;
          ring.push([X(nz.s0 + (nz.s1 - nz.s0) * f), side * nz.y + rad * Math.cos(a), Z(nz.h) + rad * Math.sin(a)]);
        }
        r.push(ring);
      }
      K.hot.push(bridge(r, false, false));
      var th = [], k2;
      for (k2 = 0; k2 < 20; k2++) {
        var a2 = k2 / 20 * Math.PI * 2;
        th.push([X(nz.s1 - 0.12), side * nz.y + (nz.r1 - 0.03) * Math.cos(a2), Z(nz.h) + (nz.r1 - 0.03) * Math.sin(a2)]);
      }
      K.ink.push(bridge([th, th.map(function (q) { return [q[0] + 0.01, q[1], q[2]]; })], true, false));
    }
    /* the arrestor hook, stowed between the nozzles */
    K.metal.push(rod([X(nz.s0 - 1.7), 0, Z(AF.bodyB[AF.bodyB.length - 2][4] + 0.05)],
                     [X(nz.s1 - 0.10), 0, Z(nz.h - 0.34)], 0.045, 6));
  }

  /* team colour: a band round each wing outboard, upper surface and lower, so
     ownership reads from above as well as at the tail */
  function addFlash(K) {
    var yb = AF.flashY, i, r = [], ys = [yb[0], (yb[0] + yb[1]) / 2, yb[1]];
    for (i = 0; i < ys.length; i++) {
      var y = ys[i];
      r.push(foil(wingLE(y), wingTE(y), y, lin(AF.zTab, y), lin(AF.thTab, y) * 1.10, 10, 0.02));
    }
    K.team.push(closed(r));
    K.team.push(closed(mirrorRings(r)));
  }

  /* ============================================================== stores == */
  function storeBody(T, s0, y, h, seg) {
    var rings = [], n = 11, i, k, t, r, R = T.D / 2, a, x, ring;
    for (i = 0; i <= n; i++) {
      t = i / n;
      if (t < T.nf) r = R * Math.pow(t / T.nf, T.np * 0.55);
      else if (t > 1 - T.tf) r = R * (1 - 0.80 * Math.pow((t - (1 - T.tf)) / T.tf, 1.5));
      else r = R;
      r = Math.max(r, R * 0.05);
      x = X(s0 + t * T.L);
      ring = [];
      for (k = 0; k < seg; k++) { a = k / seg * Math.PI * 2; ring.push([x, y + r * Math.cos(a), Z(h) + r * Math.sin(a)]); }
      rings.push(ring);
    }
    return closed(rings);
  }
  function underH(y) { return lin(AF.zTab, y) - lin(AF.thTab, y) * 0.5; }
  /* the underside of the body at station s, y off the centreline */
  function bellyY(s, y) {
    var tab = AF.bodyA.concat(AF.bodyB), i, r;
    for (i = 1; i < tab.length - 1 && s > tab[i][0]; i++) { }
    var a = tab[i - 1], b = tab[i], t = clamp((s - a[0]) / (b[0] - a[0]), 0, 1);
    function q(c) { return a[c] + t * (b[c] - a[c]); }
    var w = q(1), zc = q(2), zb = q(4), e = q(6), f = Math.abs(y) / w;
    r = f >= 1 ? 0 : Math.pow(1 - Math.pow(f, 1 / e), e);
    return zc - (zc - zb) * r;
  }
  function addStore(K, type, sta, side) {
    var T = STORE[type], y, s0, h, seg = T.D < 0.2 ? 8 : 12, ys = AF.sta, mat = K[T.m];
    var chordMid;
    if (sta === "tip") {
      y = side * AF.tipY; h = lin(AF.zTab, AF.semi);
      var sTe = wingTE(AF.semi);
      if (type === "aim9") {
        s0 = sTe + 0.12 - T.L;
        mat.push(storeBody(T, s0, y, h, seg));
        K.metal.push(boxG(2.20, 0.06, 0.10, X(sTe - 1.05), y, Z(h - 0.12)));
        K.ord.push(boxG(0.42, 0.30, 0.012, X(s0 + T.L - 0.30), y, Z(h)));
        K.ord.push(boxG(0.42, 0.012, 0.30, X(s0 + T.L - 0.30), y, Z(h)));
        K.ord.push(boxG(0.22, 0.20, 0.010, X(s0 + 0.62), y, Z(h)));
        K.ord.push(boxG(0.22, 0.010, 0.20, X(s0 + 0.62), y, Z(h)));
      } else {                                  /* the Growler's ALQ-218 pod replaces the rail */
        s0 = sTe + 0.15 - T.L;
        mat.push(storeBody(T, s0, y, h, seg));
        K.metal.push(boxG(0.9, 0.08, 0.10, X(s0 + T.L * 0.55), y, Z(h - 0.14)));
        K.ord.push(boxG(0.34, 0.012, 0.28, X(s0 + T.L - 0.30), y, Z(h)));
      }
      return;
    }
    if (sta === "cheek") {
      y = side * ys.cheek;
      var sc = AF.L / 17.07;
      s0 = AF.lip + (type === "flir" ? 0.90 : 0.55) * sc;
      h = bellyY(s0 + T.L * 0.5, y) - 0.14 - T.D / 2;
      mat.push(storeBody(T, s0, y, h, seg));
      K.metal.push(boxG(Math.min(T.L, 1.6), 0.09, 0.22, X(s0 + T.L * 0.5), y, Z(h + T.D / 2 + 0.07)));
      if (type === "aim120") {
        K.ord.push(boxG(0.36, 0.30, 0.012, X(s0 + T.L - 0.25), y, Z(h)));
        K.ord.push(boxG(0.36, 0.012, 0.30, X(s0 + T.L - 0.25), y, Z(h)));
        K.ord.push(boxG(0.30, 0.26, 0.010, X(s0 + T.L * 0.45), y, Z(h)));
        K.ord.push(boxG(0.30, 0.010, 0.26, X(s0 + T.L * 0.45), y, Z(h)));
      }
      return;
    }
    if (sta === "ctr") {
      y = 0; s0 = AF.lip + 2.20 * (AF.L / 17.07);
      h = bellyY(s0 + T.L * 0.5, 0) - 0.16 - T.D / 2;
      mat.push(storeBody(T, s0, y, h, seg));
      K.metal.push(boxG(1.5, 0.12, 0.24, X(s0 + T.L * 0.5), y, Z(h + T.D / 2 + 0.08)));
      return;
    }
    /* wing pylons: inb, mid, out; the store hangs on the leading-edge-side
       third of the chord and is centred on the pylon */
    y = side * ys[sta];
    chordMid = wingLE(ys[sta]) + 0.42 * (wingTE(ys[sta]) - wingLE(ys[sta]));
    h = underH(ys[sta]) - 0.22 - T.D / 2;
    s0 = chordMid - T.L * 0.5;
    mat.push(storeBody(T, s0, y, h, seg));
    K.metal.push(boxG(1.40, 0.11, 0.30 + T.D * 0.5, X(chordMid), y, Z(underH(ys[sta]) - 0.10 - T.D * 0.25)));
    if (type === "aim120" || type === "harm") {
      var fs = type === "harm" ? 0.55 : 0.36;
      K.ord.push(boxG(fs, fs * 0.8, 0.012, X(s0 + T.L - 0.25), y, Z(h)));
      K.ord.push(boxG(fs, 0.012, fs * 0.8, X(s0 + T.L - 0.25), y, Z(h)));
      K.ord.push(boxG(fs * 0.8, fs * 0.7, 0.010, X(s0 + T.L * 0.42), y, Z(h)));
      K.ord.push(boxG(fs * 0.8, 0.010, fs * 0.7, X(s0 + T.L * 0.42), y, Z(h)));
    } else if (type === "mk83" || type === "jdam") {
      K.ord.push(boxG(0.5, 0.012, 0.52, X(s0 + T.L - 0.3), y, Z(h)));
      K.ord.push(boxG(0.5, 0.52, 0.012, X(s0 + T.L - 0.3), y, Z(h)));
    } else if (type === "alq99") {
      var rat = new V.CylinderGeometry(0.17, 0.17, 0.05, 12);
      rat.rotateZ(Math.PI / 2); rat.translate(X(s0 + 0.25), y, Z(h));
      K.metal.push(rat);
    }
  }
  function addLoads(K) {
    var i, L = VR.loads;
    for (i = 0; i < L.length; i++) {
      var ld = L[i];
      if (ld[2] === "b") { addStore(K, ld[0], ld[1], 1); addStore(K, ld[0], ld[1], -1); }
      else if (ld[2] === "p") addStore(K, ld[0], ld[1], 1);
      else if (ld[2] === "s") addStore(K, ld[0], ld[1], -1);
      else addStore(K, ld[0], ld[1], 0);
    }
  }

  /* ================================================================ gear ==
     Tricycle: twin nose wheels under the cockpit, the mains under the wing
     root, retracting forward. Each leg's top is let into the belly where it
     stands. */
  function bellyAt(s) {
    var tab = AF.bodyA.concat(AF.bodyB), i;
    for (i = 1; i < tab.length; i++) {
      if (s <= tab[i][0]) {
        var t = (s - tab[i - 1][0]) / (tab[i][0] - tab[i - 1][0]);
        return tab[i - 1][4] + t * (tab[i][4] - tab[i - 1][4]);
      }
    }
    return tab[tab.length - 1][4];
  }
  function addGear(G) {
    var gr = AF.gear, n = gr.ns, m = gr.ms, nr = gr.nr, mr = gr.mr, hn = bellyAt(n) + 0.10, k, s;
    /* nose leg, fork, twin wheels, launch bar, doors */
    G.metal.push(rod([X(n - 0.10), 0, Z(hn)], [X(n + 0.10), 0, Z(0.46)], 0.075, 8));
    G.metal.push(rod([X(n + 0.10), 0.16, Z(0.50)], [X(n + 0.14), 0.16, Z(nr)], 0.035, 6));
    G.metal.push(rod([X(n + 0.10), -0.16, Z(0.50)], [X(n + 0.14), -0.16, Z(nr)], 0.035, 6));
    G.metal.push(rod([X(n - 0.40), 0, Z(hn)], [X(n + 0.05), 0, Z(0.62)], 0.03, 6));
    G.metal.push(rod([X(n + 0.30), 0, Z(0.55)], [X(n + 0.90), 0, Z(0.38)], 0.025, 6));
    for (k = -1; k <= 1; k += 2) {
      G.tyre.push(wheelG(nr, 0.20, X(n + 0.14), k * 0.22, Z(nr), 18));
      G.metal.push(wheelG(0.13, 0.21, X(n + 0.14), k * 0.22, Z(nr), 10));
      G.skin.push(boxG(0.95, 0.03, 0.50, X(n + 0.05), k * 0.31, Z(hn - 0.28)));
    }
    G.ink.push(boxG(1.20, 0.56, 0.04, X(n + 0.35), 0, Z(hn - 0.04)));

    /* mains: leg, side brace, axle, wheel, the door hanging outboard, the well */
    var hm = Math.max(bellyAt(m) + 0.55, 1.45);
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(rod([X(m - 0.10), s * 1.12, Z(hm)], [X(m + 0.05), s * (gr.track - 0.12), Z(mr + 0.08)], 0.09, 8));
      G.metal.push(rod([X(m + 0.70), s * 0.95, Z(hm - 0.12)], [X(m + 0.05), s * (gr.track - 0.18), Z(0.66)], 0.045, 6));
      G.metal.push(rod([X(m + 0.05), s * (gr.track - 0.12), Z(mr)], [X(m + 0.05), s * (gr.track + 0.10), Z(mr)], 0.06, 8));
      G.tyre.push(wheelG(mr, 0.28, X(m + 0.05), s * (gr.track + 0.02), Z(mr), 20));
      G.metal.push(wheelG(0.22, 0.29, X(m + 0.05), s * (gr.track + 0.02), Z(mr), 12));
      G.skin.push(boxG(1.55, 0.035, 0.70, X(m + 0.05), s * (gr.track + 0.24), Z(0.98)));
      G.ink.push(boxG(2.10, 0.62, 0.04, X(m + 0.05), s * 0.95, Z(1.37)));
    }
  }

  /* ============================================================== build == */
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      var geo = merge(lists[key]);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  function build(THREE, M, C, key, opts) {
    V = THREE;
    VR = VARS[key]; VR.key = key; AF = VR.af;
    XMIN = -(AF.L / 2 + 0.25);
    ZTOP = AF.ZG + 5.10;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: [], team: [], metal: [], hot: [], ink: [], store: [], ord: [], glass: [] };
    var G = { skin: [], metal: [], tyre: [], ink: [] };
    addBody(K);
    addCanopy(K);
    addWings(K);
    addTails(K);
    addNozzles(K);
    addFlash(K);
    if (!(opts && opts.bare)) { addLoads(K); addGear(G); }

    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "hot", "ink", "metal", "store", "ord", "glass"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["skin", "metal", "tyre", "ink"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* len is the measured X extent: radome tip to the aftmost point (the nozzles
   on the legacy airframe, the stabilator trailing edge and nozzles on the
   Super Hornet). The two Growler rows differ only in the jammer on the
   mid-wing stations. */
UNIT_MODELS["nato_e90_cfighter"] = {
  len: 17.07,
  build: function (THREE, M, C) { return HeroF18.build(THREE, M, C, "C"); }
};
UNIT_MODELS["cfighter_n"] = {
  len: 18.31,
  build: function (THREE, M, C) { return HeroF18.build(THREE, M, C, "E"); }
};
UNIT_MODELS["nato_e00_ewair"] = {
  len: 18.31,
  build: function (THREE, M, C) { return HeroF18.build(THREE, M, C, "G1"); }
};
UNIT_MODELS["ew_n"] = {
  len: 18.31,
  build: function (THREE, M, C) { return HeroF18.build(THREE, M, C, "G2"); }
};
