/* ======= nato_f16_family.js - HERO model: General Dynamics / Lockheed Martin F-16 Fighting Falcon =======
   One airframe for the eight rows that fly an F-16, each a closure of its
   own because the rows differ in the things a camera can see: the size of
   the chin inlet, the paint, the IFF antennas ahead of the windscreen, the
   dispensers on the fin root and the stores.
     fighter_n         F-16C Block 52, NATO, the present day: small inlet,
                       Have Glass V grey, AIM-120 and AIM-9X, wing tanks,
                       ALQ-184 on the centreline, a Sniper pod on the right
                       intake station
     nato_e90_fighter  F-16C Block 50, 1991: the F110-GE-129 and its enlarged
                       ("big mouth") inlet, Hill Gray II, AIM-120 and AIM-9M,
                       tanks and an ALQ-131
     sead_n            F-16CJ Block 50, the present day: big mouth, HARM on
                       stations 3 and 7, the AN/ASQ-213 HARM Targeting System
                       on the LEFT intake station and a Sniper on the right
     nato_e90_sead     F-16CJ Block 50D, 1993: the same with the HTS alone,
                       Hill Gray II, AIM-9M
     nato_e00_sead     F-16CM Block 50 with HTS and AGM-88: as sead_n
     fighter_r         F-16V Block 70, ROCAF: the new-build Viper with the
                       F110 and the big mouth, AIM-120 and AIM-9X
     roc_e90_fighter   F-16A Block 20, ROCAF, delivered from 1997: small
                       inlet, Hill Gray II, the dispenser rows along the
                       fin-root fairing, AIM-7M and AIM-9M, wing tanks
     roc_e00_fighter   the same airframes rebuilt to F-16V standard from
                       2016: one light grey, a plain fin-root fairing,
                       AIM-120 and AIM-9M, tanks and a centreline ECM pod
   Before this file fighter_n was models3d_hd.js's buildF16 (no "gear" node,
   so a parked F-16 stood on its lowest store, 1.29 m below its origin) and
   the other seven were one air_specs.js parametric row, a cropped delta
   17.2 m long that was not an F-16 planform. fighter_n is also drawn,
   repainted by ERA_KIT, for the European fighters that have no model of
   their own, and sead_n for six European SEAD rows: the team flash is
   exactly C.team, so the repaint leaves it alone.

   Reference, and what each gave:
     Published figures (Jane's, the USAF fact sheet, Lockheed Martin):
       wing span 9.144 m (30 ft) on the reference trapezoid, 9.45 m over the
       wingtip launchers, 9.96 m with wingtip missiles; wing area 27.87 m2;
       leading edge 40 degrees, the trailing edge unswept; NACA 64A204
       aerofoil, 4 per cent thick; height 5.09 m; wheel track 2.36 m,
       wheelbase 4.00 m; fuselage 14.52 m from the radome tip to the
       nozzle, 15.03 m overall with the nose probe. Main tyres 27.75 x 8.75
       in on Block 40 and later, 25.5 x 8.0 in before; nose tyre 18 x 5.7 in.
     NASA TP-1538 (Nguyen et al., 1979) Table I: span 9.144 m, area 27.87 m2,
       mean aerodynamic chord 3.45 m. Root chord 4.96 m and tip chord 1.12 m
       follow from the span, the area and the chord, and with the leading
       edge where the line drawing has it the mean chord starts 7.46 m
       behind the radome tip, 1.81 m out; the centre of mass is put at 35
       per cent of it, 8.66 m behind the radome tip, which is this model's
       origin.
     The USAF three-view line drawing (af.mil line art, Wikimedia Commons
       "General Dynamics F-16 Fighting Falcon 3-view line drawing.svg"):
       the strake outline, the wing, tailplane and fin planforms, the
       stations of the gear, the inlet and the ventral fins. Scaled on the
       14.52 m fuselage it gives a 4.96 m root chord on the reference wing,
       which is how that length was checked.
     Wikimedia Commons photographs, measured on a grid:
       Dutch F-16AM J-136 taxiing at Twente (a level side view: 70.2 px/m on
       the fuselage, 5.10 m tall to the fin tip, wheelbase 4.09 m; at full
       size, 126 px/m, the radome's top and belly line, its joint 1.80 m
       back and the angle-of-attack probes 0.29 m up, 2.03-2.42 m back);
       Norwegian F-16AM 681 taxiing in at Kleine-Brogel (three-quarter from
       the front: the radome smooth in section, the same probes); F-16C
       Block 30 86-0328 taxiing at Langley (2010); an F-16CJ of the 522nd FS
       from directly below (2002: the planform, the radome's ogive in plan,
       the stores stations and the 370 US gal tanks, 5.4 m long); F-16CM of
       the 480th FS head-on at Spangdahlem (2022: track, station spacing,
       the big-mouth inlet, the four IFF "bird slicer" blades standing on
       the skin ahead of the windscreen in the airframe's grey, the HTS's
       pale nose on the left intake station and the Sniper's dark window on
       the right); F-16C Block 50D 91-0415 (1992: wingtip AMRAAM, AIM-9 on
       2 and 8, HARM, the HTS pod) and 00-0225 (2003); the HTS close up under a
       Langley F-16CJ (2009) and on a 169th FW F-16CM at Fallon (2014): both
       from the left, the pod on its plate under the intake beside the red
       position light, so on the LEFT station (the survey had it on the
       right); a 480th FS F-16CM landing (2020); ROCAF F-16A 6672 at Hualien
       (2019), 6659 at Songshan (2011)
       and 93-0721 at Luke (2014: small inlet, the long fin-root fairing with
       its dispenser rows, the IFF fairing); ROCAF F-16V 6613 (2021:
       missiles on the tips and stations 2 and 3, tanks, a long ECM pod on
       the centreline between the main legs) and 6666 (2023: one light grey,
       the fin-root fairing plain, with no dispensers); ROCAF F-16C Block 70
       6727 at Greenville (2026: big mouth, no conformal tanks, no dorsal
       spine, the gun port on the left).
   No conformal tanks and no dorsal spine on any of them: no USAF block has
   them, and the ROCAF Block 70 photographed has none.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   the centre of mass, 8.66 m behind the radome tip, at the height of the
   radome tip; the wheels stand 1.80 m below it on GROUND. Stations along the
   airframe are written d, metres aft of the radome tip, and turned into x by
   S(d). render3d.js stands the model up with rotation.x = -PI/2, scales it
   by its measured X extent and parks it on its lowest drawn point, which is
   the tyres: everything else is 0.37 m or more above the ground.

   WHAT SETS THE SCALE. The X extent runs from the tip of the nose probe,
   0.51 m ahead of the radome, to the fin cap's trailing edge, which stands
   0.44 m behind the nozzle in every side view. len is that measured extent.

   NAMED NODES: "gear", the undercarriage with its doors and wells, which the
   renderer shows only below 18 m. Nothing else here is animated.

   Materials are the house tiers: SKIN (one procedural CanvasTexture per
   paint scheme, projected from model space by face normal), METAL, DARK
   (ducts, burnt nozzle, wells), RUBBER, GLASS, the white STORES of the
   missiles, the grey PODS and the TEAM flash. Eight, with one mesh each for
   the airframe and four for the gear.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF16 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  var XO = 8.66;                           /* radome tip, ahead of the CG  */
  function S(d) { return XO - d; }         /* station d -> model x         */
  var GROUND = -1.80;                      /* tyre contact                 */
  var NOZ_D = 14.52;                       /* nozzle exit                  */
  var PROBE = 0.51;                        /* nose probe ahead of the tip  */
  /* the wing: reference trapezoid, 40 degree leading edge, straight
     trailing edge 10.90 m behind the radome tip */
  var WLE0 = 5.94, WTAN = Math.tan(40 * D2R), WTE = 10.90, WTIP = 4.572;
  function wingLE(y) { return WLE0 + WTAN * y; }
  /* the strake (LERX) edge, traced off the line drawing: (y, d) from the
     chine below the windscreen to the corner where it meets the wing. It
     leaves the forebody with a small corner 2.84 m back and widens
     steadily, 0.66 m out at 2.98 and 0.71 m at 3.30, as the 522nd FS jet
     from below and the drawing show it, not in one step */
  var LERX = [[0.30, 2.84], [0.60, 2.84], [0.66, 2.98], [0.71, 3.30], [0.79, 3.80], [0.86, 4.30],
              [0.95, 4.75], [1.07, 5.24], [1.19, 5.71], [1.31, 6.18], [1.39, 6.55],
              [1.44, 6.92], [1.46, 7.16]];
  /* mid-plane of the strake and wing: the strake starts as a chine at the
     height of the radome joint and runs down into the wing */
  function wingZ(d) { return 0.05 + 0.11 * Math.max(0, Math.min(1, (6.5 - d) / 3.4)); }
  /* store stations (half-span), measured head-on on the Spangdahlem CM */
  var ST_TIP = 4.68, ST2 = 3.92, ST3 = 3.03, ST4 = 1.81;

  /* =========================================================== variants */
  /* inlet: "nsi" the normal-shock inlet of the F100 blocks, "mcid" the
     Modular Common Inlet Duct of the F110 blocks; paint: see PAINTS;
     tyres: "big" for Block 40 and later; iff: the bird-slicer blades;
     fin: "roc" the ROCAF Block 20's fin-root fairing, a little deeper to
     carry its dispensers; tip, st2, st3: the missiles on the wingtips and
     on stations 2/8 and 3/7 (STORE); tank: the 370 US gal tanks on 4/6;
     ctr: the centreline ECM pod; left, right: the intake stations */
  var VARIANTS = {
    fighter_n:        { key: "c52",  inlet: "nsi",  paint: "hg5",   tyres: "big",   iff: true,  fin: "c",
                        tip: "a120", st2: "a9x", st3: "a120", tank: true, ctr: "alq184", left: null, right: "sniper" },
    nato_e90_fighter: { key: "c50",  inlet: "mcid", paint: "hg2",   tyres: "big",   iff: false, fin: "c",
                        tip: "a120", st2: "a9m", st3: "a120", tank: true, ctr: "alq131", left: null, right: null },
    sead_n:           { key: "cj20", inlet: "mcid", paint: "hg5",   tyres: "big",   iff: true,  fin: "c",
                        tip: "a120", st2: "a9x", st3: "harm", tank: true, ctr: "alq184", left: "hts", right: "sniper" },
    nato_e90_sead:    { key: "cj90", inlet: "mcid", paint: "hg2",   tyres: "big",   iff: false, fin: "c",
                        tip: "a120", st2: "a9m", st3: "harm", tank: true, ctr: "alq184", left: "hts", right: null },
    nato_e00_sead:    { key: "cm00", inlet: "mcid", paint: "hg5",   tyres: "big",   iff: true,  fin: "c",
                        tip: "a120", st2: "a9x", st3: "harm", tank: true, ctr: "alq184", left: "hts", right: "sniper" },
    fighter_r:        { key: "b70",  inlet: "mcid", paint: "roc70", tyres: "big",   iff: true,  fin: "c",
                        tip: "a120", st2: "a9x", st3: "a120", tank: true, ctr: null, left: null, right: null },
    roc_e90_fighter:  { key: "a20",  inlet: "nsi",  paint: "roc20", tyres: "small", iff: true,  fin: "roc",
                        tip: "a9m",  st2: "a9m", st3: "a7m",  tank: true, ctr: null, left: null, right: null },
    roc_e00_fighter:  { key: "a20v", inlet: "nsi",  paint: "rocv",  tyres: "small", iff: true,  fin: "roc",
                        tip: "a120", st2: "a9m", st3: "a120", tank: true, ctr: "alq184", left: null, right: null }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet per scheme in four bands, each a projection of
     the airframe in model metres:
        TOP        rows   0-400  x across, y down the band (port at the top)
        PORT side  rows 400-592  x across, z down the band
        STARBOARD  rows 592-784  x across, z down the band
        BELLY      rows 784-1024 x across, y down the band
     The top band is the largest because the RTS camera looks down. The
     hexes sit darker than the paint chips: the ACES pass lifts them. */
  var TW = 1024, TH = 1024;
  var BT0 = 0, BT1 = 400, BP0 = 400, BP1 = 592, BS0 = 592, BS1 = 784, BB0 = 784, BB1 = 1024;
  var UX0 = -7.0, UX1 = 9.0;               /* model x across the sheet     */
  var QY = 5.0;                            /* |y| covered by top and belly */
  var QZ0 = -1.85, QZ1 = 3.45;             /* z covered by the side bands  */
  var SX = TW / (UX1 - UX0);
  function pxX(x)        { return (x - UX0) * SX; }
  function pxD(d)        { return pxX(S(d)); }
  function pyTop(y)      { return BT0 + (QY - y) / (2 * QY) * (BT1 - BT0); }
  function pySide(z, pt) { var a = pt ? BP0 : BS0, b = pt ? BP1 : BS1; return a + (QZ1 - z) / (QZ1 - QZ0) * (b - a); }
  function pyBelly(y)    { return BB0 + (QY - y) / (2 * QY) * (BB1 - BB0); }

  /* The schemes. Hill Gray II, the F-16's paint from 1986: FS 36118 over
     the spine, the strakes and the inner wing, FS 36270 on the outer wing,
     the tail and the sides, FS 36375 underneath. Have Glass V, the USAF's
     radar-absorbent finish of the 2000s: one darker grey all over, with a
     metallic sheen. The ROCAF's Block 20s wore Hill Gray II with low-
     visibility grey roundels (6659 at Songshan, 2011; 6672 in 2019) and
     carry their dispenser rows on the fin root; rebuilt as F-16Vs they are
     one light grey all over (6613 in 2021, 6666 in 2023). The new Block 70
     is grey over grey with its spine a shade darker (6727, 2026). */
  var PAINTS = {
    hg2:   { base: "#727a80", crown: "#4d555b", belly: "#959ca0", rough: 0.80, metal: 0.10, two: true,  roc: false },
    hg5:   { base: "#646c72", crown: "#5e666c", belly: "#737b80", rough: 0.62, metal: 0.24, two: false, roc: false },
    roc20: { base: "#737b81", crown: "#50585e", belly: "#979ea2", rough: 0.80, metal: 0.10, two: true,  roc: true, disp: true },
    rocv:  { base: "#838b91", crown: "#838b91", belly: "#99a0a4", rough: 0.78, metal: 0.10, two: false, roc: true, disp: false },
    roc70: { base: "#7a8288", crown: "#62696f", belly: "#9aa1a5", rough: 0.76, metal: 0.12, two: true,  roc: true, disp: false }
  };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* a closed path through model (d, y) points on the top or belly band */
  function polyTop(g, pts, belly) {
    g.beginPath();
    for (var i = 0; i < pts.length; i++) {
      var u = pxD(pts[i][0]), v = belly ? pyBelly(pts[i][1]) : pyTop(pts[i][1]);
      if (i) g.lineTo(u, v); else g.moveTo(u, v);
    }
    g.closePath();
    g.fill();
  }
  /* the low-visibility ROCAF roundel: the white sun in a blue disc, both
     greyed out */
  function roundel(g, cx, cy, rx, ry) {
    g.fillStyle = "#5c656c"; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, PI * 2); g.fill();
    g.fillStyle = "#8a9399";
    g.beginPath();
    for (var i = 0; i < 24; i++) {
      var a = i / 24 * PI * 2, r = (i & 1) ? 0.50 : 0.80;
      var x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath(); g.fill();
    g.fillStyle = "#5c656c"; g.beginPath(); g.ellipse(cx, cy, rx * 0.40, ry * 0.40, 0, 0, PI * 2); g.fill();
  }

  function skinCanvas(key) {
    var P = PAINTS[key];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(key === "hg5" ? 5016 : key === "hg2" ? 1991 : key === "roc70" ? 6727 : key === "rocv" ? 6613 : 6672);
    var i, b, x, y, d;

    g.fillStyle = P.base; g.fillRect(0, 0, TW, BB0);
    g.fillStyle = P.belly; g.fillRect(0, BB0, TW, BB1 - BB0);
    /* the sides go to the lighter belly grey below the strake line */
    for (b = 0; b < 2; b++) {
      var s0 = pySide(-0.30, !b), s1 = pySide(-1.85, !b);
      var gr = g.createLinearGradient(0, pySide(0.05, !b), 0, s0);
      gr.addColorStop(0, P.base); gr.addColorStop(1, P.belly);
      g.fillStyle = gr; g.fillRect(0, pySide(0.05, !b), TW, s0 - pySide(0.05, !b));
      g.fillStyle = P.belly; g.fillRect(0, s0, TW, s1 - s0);
    }

    /* ---- the dark crown of Hill Gray II: the spine from the windscreen
       back to the fin, out over the strakes and the inner wing ---- */
    if (P.two) {
      g.fillStyle = P.crown;
      var crown = [[2.55, 0.42], [3.4, 0.62], [4.6, 0.92], [5.8, 1.30], [6.9, 1.80], [7.9, 2.25],
                   [9.3, 2.30], [10.7, 2.05], [10.9, 1.05], [12.6, 0.98], [13.9, 0.62], [14.2, 0.0]];
      var full = crown.slice();
      for (i = crown.length - 1; i >= 0; i--) full.push([crown[i][0], -crown[i][1]]);
      polyTop(g, full, false);
      /* and down the upper sides of the spine and over the fin root */
      for (b = 0; b < 2; b++) {
        g.beginPath();
        g.moveTo(pxD(2.6), pySide(0.66, !b));
        g.lineTo(pxD(6.0), pySide(0.84, !b));
        g.lineTo(pxD(9.0), pySide(0.56, !b));
        g.lineTo(pxD(12.4), pySide(0.52, !b));
        g.lineTo(pxD(14.7), pySide(0.62, !b));
        g.lineTo(pxD(14.7), pySide(1.10, !b));
        g.lineTo(pxD(2.6), pySide(1.10, !b));
        g.closePath(); g.fill();
      }
    }

    /* ---- panel-to-panel colour: repainted panels come up a shade off ---- */
    for (i = 0; i < 130; i++) {
      g.fillStyle = (i & 1) ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
      g.fillRect(R() * TW, R() * TH, (0.3 + R() * 1.1) * SX, 6 + R() * 22);
    }

    /* ---- frames at real stations, on every band ---- */
    var frames = [1.80, 2.60, 3.45, 4.30, 5.10, 5.95, 6.80, 7.65, 8.50, 9.35, 10.20, 11.05,
                  11.90, 12.75, 13.55];
    /* (on the top and belly bands only across the body, 1.0 m either side
       of the centreline: the wing has ribs, drawn below, not frames) */
    g.lineWidth = 1.3;
    var spans = [[pyTop(1.0), pyTop(-1.0)], [BP0, BS1], [pyBelly(1.0), pyBelly(-1.0)]];
    for (i = 0; i < frames.length; i++) {
      x = pxD(frames[i]);
      for (b = 0; b < spans.length; b++) {
        var r0 = spans[b][0], r1 = spans[b][1];
        g.strokeStyle = "rgba(0,0,0,0.30)";
        g.beginPath(); g.moveTo(x, r0); g.lineTo(x, r1); g.stroke();
        g.strokeStyle = "rgba(255,255,255,0.05)";
        g.beginPath(); g.moveTo(x + 2, r0); g.lineTo(x + 2, r1); g.stroke();
        g.fillStyle = "rgba(0,0,0,0.18)";
        for (y = r0 + 3; y < r1; y += 7) g.fillRect(x - 4, y, 1.4, 1.4);
      }
    }
    /* the radome joint, a hard line all round */
    g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(pxD(1.80), 0); g.lineTo(pxD(1.80), TH); g.stroke();
    /* stringers along the spine and the sides */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.1;
    [-0.30, 0.30, -0.62, 0.62].forEach(function (q) {
      g.beginPath(); g.moveTo(pxD(5.9), pyTop(q)); g.lineTo(pxD(13.6), pyTop(q)); g.stroke();
    });
    [0.40, -0.10, -0.50].forEach(function (h) {
      for (var bb = 0; bb < 2; bb++) {
        g.beginPath(); g.moveTo(pxD(2.0), pySide(h, !bb)); g.lineTo(pxD(13.5), pySide(h, !bb)); g.stroke();
      }
    });

    /* ---- the wing, upper and lower: leading-edge flap and flaperon
       hinge lines, ribs, access panels ---- */
    var wl = function (dd, yy, belly) { return [pxD(dd), belly ? pyBelly(yy) : pyTop(yy)]; };
    for (b = 0; b < 2; b++) {
      var lower = b === 1;
      /* leading-edge flap: 0.32 m back from the edge, strake corner to tip */
      for (var side = -1; side <= 1; side += 2) {
        var p0 = wl(wingLE(1.5) + 0.32, side * 1.5, lower), p1 = wl(wingLE(WTIP) + 0.22, side * WTIP, lower);
        g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.6;
        g.beginPath(); g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.stroke();
        /* flaperon: the inboard trailing edge, 0.95 m deep, out to 3.4 m */
        var f0 = wl(WTE - 0.95, side * 1.0, lower), f1 = wl(WTE - 0.62, side * 3.4, lower), f2 = wl(WTE, side * 3.4, lower);
        g.beginPath(); g.moveTo(f0[0], f0[1]); g.lineTo(f1[0], f1[1]); g.lineTo(f2[0], f2[1]); g.stroke();
        /* ribs */
        g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;
        for (y = 1.8; y < WTIP; y += 0.55) {
          var q0 = wl(wingLE(y) + 0.1, side * y, lower), q1 = wl(WTE - 0.05, side * y, lower);
          g.beginPath(); g.moveTo(q0[0], q0[1]); g.lineTo(q1[0], q1[1]); g.stroke();
        }
        for (i = 0; i < 6; i++) {
          var yy0 = 1.8 + R() * 2.4, dd0 = wingLE(yy0) + 0.4 + R() * 1.2, q = wl(dd0, side * yy0, lower);
          g.strokeStyle = "rgba(0,0,0,0.30)";
          g.strokeRect(q[0], q[1] - 4, 10 + R() * 14, 6 + R() * 6);
        }
      }
    }
    /* access hatches everywhere else */
    g.lineWidth = 1.1;
    for (i = 0; i < 90; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 8 + R() * 20, hh = 6 + R() * 14;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- the air-refuelling receptacle door on the spine, 0.7 m behind
       the canopy, outlined, with its lit-up throat when open (closed here) */
    g.strokeStyle = "rgba(0,0,0,0.50)"; g.lineWidth = 1.5;
    g.strokeRect(pxD(6.95), pyTop(0.13), pxD(6.45) - pxD(6.95), pyTop(-0.13) - pyTop(0.13));
    g.fillStyle = "rgba(0,0,0,0.10)";
    g.fillRect(pxD(6.95), pyTop(0.13), pxD(6.45) - pxD(6.95), pyTop(-0.13) - pyTop(0.13));

    /* ---- the rudder: its hinge line up the fin, a hand's breadth inside
       the trailing edge, and its foot above the fin-root fairing ---- */
    for (b = 0; b < 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.6;
      g.beginPath();
      g.moveTo(pxD(13.42), pySide(1.12, !b)); g.lineTo(pxD(14.32), pySide(3.00, !b));
      g.moveTo(pxD(13.42), pySide(1.12, !b)); g.lineTo(pxD(14.13), pySide(1.12, !b));
      g.stroke();
    }

    /* ---- the M61 port on the LEFT strake root, and the gun gas that
       blackens the skin behind it (top band and the port side) ---- */
    var gg = g.createLinearGradient(pxD(5.75), 0, pxD(7.6), 0);
    gg.addColorStop(0, "rgba(20,20,18,0.55)"); gg.addColorStop(1, "rgba(20,20,18,0)");
    g.fillStyle = gg;
    g.fillRect(pxD(7.6), pyTop(0.80), pxD(5.75) - pxD(7.6), pyTop(0.48) - pyTop(0.80));
    g.fillRect(pxD(7.6), pySide(0.36, true), pxD(5.75) - pxD(7.6), pySide(0.08, true) - pySide(0.36, true));

    /* ---- exhaust soot on the rear fuselage, the booms and the tail ---- */
    var so = g.createLinearGradient(pxD(12.2), 0, pxD(14.6), 0);
    so.addColorStop(0, "rgba(22,20,18,0)"); so.addColorStop(1, "rgba(22,20,18,0.40)");
    g.fillStyle = so; g.fillRect(pxD(14.6), 0, pxD(12.2) - pxD(14.6), TH);

    /* ---- weathering heavier low down: streaks on the sides, a dirty belly ---- */
    for (i = 0; i < 140; i++) {
      g.fillStyle = "rgba(24,22,20," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, BP0 + R() * (BS1 - BP0), 2 + R() * 4, 8 + R() * 30);
    }
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, BB0 + R() * (BB1 - BB0), 16 + R() * 70, 4 + R() * 12);
    }
    /* hydraulic weep under the gear bays */
    var hw2 = g.createLinearGradient(pxD(7.6), 0, pxD(11.5), 0);
    hw2.addColorStop(0, "rgba(28,26,22,0.26)"); hw2.addColorStop(1, "rgba(28,26,22,0)");
    g.fillStyle = hw2; g.fillRect(pxD(11.5), BB0, pxD(7.6) - pxD(11.5), BB1 - BB0);

    /* ---- the radome: a different material, a different grey ---- */
    g.fillStyle = "rgba(255,255,255,0.05)";
    g.fillRect(pxD(1.80), 0, TW - pxD(1.80), TH);

    /* ---- stencils, unreadable at range: the RESCUE arrows and the red
       canopy-release markings below the windscreen ---- */
    for (b = 0; b < 2; b++) {
      g.fillStyle = "rgba(220,224,226,0.55)";
      g.fillRect(pxD(3.9), pySide(0.36, !b), pxD(2.9) - pxD(3.9), 2);
      g.fillStyle = "rgba(170,40,32,0.55)";
      g.fillRect(pxD(4.1), pySide(0.52, !b), 7, 3);
    }
    g.fillStyle = "rgba(220,224,226,0.30)";
    for (i = 0; i < 40; i++) g.fillRect(R() * TW, R() * TH, 4 + R() * 10, 2);

    /* ---- ROCAF: low-visibility roundels on the upper left and lower
       right wing and on the rear fuselage sides; the Block 20's chaff and
       flare cartridge rows along the fin-root fairing ---- */
    if (P.roc) {
      var rw = 0.40;
      roundel(g, pxD(wingLE(3.6) + 0.75), pyTop(3.6), rw * SX, rw * (BT1 - BT0) / (2 * QY));
      roundel(g, pxD(wingLE(3.6) + 0.75), pyBelly(-3.6), rw * SX, rw * (BB1 - BB0) / (2 * QY));
      for (b = 0; b < 2; b++)
        roundel(g, pxD(12.2), pySide(0.22, !b), 0.26 * SX, 0.26 * (BP1 - BP0) / (QZ1 - QZ0));
      if (P.disp) {
        for (b = 0; b < 2; b++) {
          g.fillStyle = "rgba(14,15,16,0.75)";
          for (d = 12.95; d < 14.65; d += 0.085) {
            g.beginPath(); g.arc(pxD(d), pySide(0.86, !b), 1.6, 0, PI * 2); g.fill();
            g.beginPath(); g.arc(pxD(d + 0.04), pySide(0.76, !b), 1.6, 0, PI * 2); g.fill();
          }
        }
      }
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope, per scheme     */
  function skinTexture(key) {
    if (_tex[key] !== undefined) return _tex[key];
    try {
      if (!_cv[key]) _cv[key] = skinCanvas(key);
      var t = new V.CanvasTexture(_cv[key]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[key] = t;
    } catch (e) { _tex[key] = false; }
    return _tex[key];
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft (the inlet lip, wing leading edges) would collapse to a line
     under an x projection, so they are laid out along x + y. */
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
      var lo = band === 0 ? BT0 : band === 1 ? BP0 : band === 2 ? BS0 : BB0;
      var hi = band === 0 ? BT1 : band === 1 ? BP1 : band === 2 ? BS1 : BB1;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W;
        if (band === 0)      { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else                 { U = pxX(endOn ? x + y : x); W = pySide(z, band === 1); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo + 2, Math.min(hi - 2, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials == */
  function makeMats(C, VR) {
    var P = PAINTS[VR.paint], tex = skinTexture(VR.paint);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: P.rough, metalness: P.metal });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.base);
    /* gear legs, actuator rings and the nose probe: bright alloy */
    m.metal  = new V.MeshStandardMaterial({ color: 0x8a9095, roughness: 0.40, metalness: 0.62 });
    /* the inside of the inlet and the exhaust, the burnt nozzle petals,
       the wheel wells: as near a hole as a lit surface gets */
    m.dark   = new V.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.66, metalness: 0.30 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* missiles: white and light grey */
    m.store  = new V.MeshStandardMaterial({ color: 0xc4c8c4, roughness: 0.52, metalness: 0.08 });
    /* the pods: a mid grey, near the airframe's (the ALQ-184 and the HTS
       at Fallon in 2014) */
    m.pod    = new V.MeshStandardMaterial({ color: 0x687075, roughness: 0.68, metalness: 0.16 });
    /* The F-16's canopy carries a gold film against radar and sun: dark
       bronze from outside, with one hard highlight. Both faces drawn. */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x3b3322, roughness: 0.08, metalness: 0.40,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05,
                                            transparent: true, opacity: 0.88, side: V.DoubleSide });
    /* The flash is exactly C.team, so eraPaint's team test leaves it alone
       when fighter_n or sead_n stands in for another def. The emissive
       keeps it from greying out under ACES. */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ====================================================== geometry kit == */
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
  /* a round bar from p to q */
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* a flat disc facing along the unit normal n */
  function disc(r, seg, c, n) {
    var g = new V.CircleGeometry(r, seg);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1),
      new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  /* a flat annulus facing along n */
  function ring(r0, r1, seg, c, n) {
    var g = new V.RingGeometry(r0, r1, seg, 1);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1),
      new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  /* the same surface wound to face the other way: the lining of a duct */
  function inward(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, n = g.attributes.normal.array, t, k, tmp;
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
      tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp;
    }
    for (t = 0; t < n.length; t++) n[t] = -n[t];
    return g;
  }
  /* The starboard twin of a port part. Negating y turns the part inside
     out, so each triangle's last two corners are swapped back. */
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var u = g.attributes.uv ? g.attributes.uv.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) {
      for (k = 0; k < 3; k++) {
        tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
        if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
      }
      if (u) for (k = 0; k < 2; k++) {
        tmp = u[t * 6 + 2 + k]; u[t * 6 + 2 + k] = u[t * 6 + 4 + k]; u[t * 6 + 4 + k] = tmp;
      }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  /* one buffer per material and assembly: a single draw call (and one
     shadow draw) for what would otherwise be dozens */
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
  /* flat-shaded triangles from a list of corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex solid from its faces (each a convex polygon of corners). Each
     face is wound so its normal points away from the solid's centre, so
     the caller does not have to get the order right. */
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
  /* a closed solid between two convex sections with the same corner count */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* Rings of corners across the span, root to tip, bridged with flat
     quads and the last ring closed with a fan. The first `up` segments of
     every ring are the upper surface and face up, the rest face down, and
     the tip cap faces along `out`: a wing whose sections are cambered and
     whose strake is a long thin wedge cannot be wound by a centroid test,
     and one skin has no faces left inside it, as a chain of solids does. */
  function spanSkin(rings, up, out) {
    var pts = [], i, j, m = rings[0].length;
    function push(a, b, c, w) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      if (nx * w[0] + ny * w[1] + nz * w[2] >= 0) pts.push(a, b, c); else pts.push(a, c, b);
    }
    for (i = 0; i < rings.length - 1; i++) {
      var A = rings[i], B = rings[i + 1];
      for (j = 0; j < m; j++) {
        var w = j < up ? [0, 0, 1] : [0, 0, -1];
        var a = A[j], b = A[(j + 1) % m], c = B[(j + 1) % m], d = B[j];
        push(a, b, c, w); push(a, c, d, w);
      }
    }
    var T = rings[rings.length - 1], ct = [0, 0, 0];
    for (j = 0; j < m; j++) { ct[0] += T[j][0] / m; ct[1] += T[j][1] / m; ct[2] += T[j][2] / m; }
    for (j = 0; j < m; j++) push(ct, T[j], T[(j + 1) % m], out);
    return tris(pts);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [u, v] in the
     chord plane; at(u, v, k) turns them and a thickness offset k into a
     model-space point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     box-like where e is low, round where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
     Sections run from nose to tail (decreasing x) and the quads are wound
     (a, c, b), which for that order puts every normal outward
     (hero/nato_e20_gunship_ah64e.js). */
  function sec(d, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: S(d), d: d, zb: zb, zt: zt, zm: zm, wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
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
  /* rings of [x, y, z] points (belly, up the port side, over the top and
     down the starboard side), nose to tail, bridged into one smooth skin */
  function skinRings(rings, capFront, capBack) {
    var pos = [], idx = [], rl = rings[0].length, i, j;
    for (i = 0; i < rings.length; i++)
      for (j = 0; j < rl; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < rings.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var r = rings[k], t = [], cx = 0, cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cx += r[j][0]; cy += r[j][1]; cz += r[j][2]; }
      var o = [cx / rl + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = r[j], p1 = r[(j + 1) % rl];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (capFront !== null && capFront !== undefined) cap(0, capFront, true);
    if (capBack !== null && capBack !== undefined) cap(rings.length - 1, -capBack, false);
    return out;
  }
  function secRings(secs, n) {
    var rings = [], i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n), ring = [];
      for (j = 0; j < r.length; j++) ring.push([secs[i].x, r[j][0], r[j][1]]);
      rings.push(ring);
    }
    return rings;
  }
  function interpSecs(secs, d) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (d >= A.d && d <= B.d) {
        var f = (d - A.d) / (B.d - A.d), o = {};
        ["x", "d", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (k) {
          o[k] = A[k] + (B[k] - A[k]) * f;
        });
        return o;
      }
    }
    return null;
  }
  /* a solid of revolution about model x from an (x, r) profile, front to
     back; LatheGeometry turns about Y, so it is built there and laid down */
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);
    g.translate(0, y, z);
    return g;
  }
  function lerp(a, b, f) { return a + (b - a) * f; }
  function interp(tab, v) {
    if (v <= tab[0][0]) return tab[0][1];
    for (var i = 0; i < tab.length - 1; i++)
      if (v <= tab[i + 1][0]) return lerp(tab[i][1], tab[i + 1][1], (v - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    return tab[tab.length - 1][1];
  }

  /* ============================================================ stores ===
     Each is built where it hangs, nose forward. len, r: body length and
     radius; nose: the length of the nose taper; wing and tail: see
     missile(). The fins stand in an X, as every missile on an F-16's rails
     and launchers hangs. */
  var STORE = {
    /* AIM-120: 3.65 m, 178 mm, mid-body wings 0.53 m across, tail 0.45 m */
    a120: { len: 3.65, r: 0.089, nose: 0.45, wing: [1.55, 0.36, 0.18, 0.05], tail: [0.12, 0.26, 0.135] },
    /* AIM-9M: 2.87 m, 127 mm, canards at the seeker, rollerons aft */
    a9m:  { len: 2.87, r: 0.0635, nose: 0.14, dome: true, wing: [0.30, 0.20, 0.22, 0.02], tail: [0.10, 0.30, 0.24] },
    /* AIM-9X: 3.02 m; no canards, its forward fins are small fixed
       strakes and only the short tail fins are drawn */
    a9x:  { len: 3.02, r: 0.0635, nose: 0.14, dome: true, wing: null, tail: [0.08, 0.20, 0.16] },
    /* AIM-7M: 3.66 m, 203 mm, big mid wings */
    a7m:  { len: 3.66, r: 0.1015, nose: 0.55, wing: [1.75, 0.60, 0.40, 0.12], tail: [0.10, 0.36, 0.30] },
    /* AGM-88: 4.17 m, 254 mm, mid wings 1.13 m across */
    harm: { len: 4.17, r: 0.127, nose: 0.70, wing: [1.60, 0.62, 0.44, 0.16], tail: [0.10, 0.30, 0.22] }
  };
  /* parts of one missile into the store and dark lists, centred on (x, y, z) */
  function missile(type, x, y, z, store, dark) {
    var M = STORE[type], L = M.len, r = M.r, f = x + L / 2, a = x - L / 2;
    var prof = [[f, 0.0], [f - M.nose * 0.35, r * 0.55], [f - M.nose * 0.7, r * 0.88],
                [f - M.nose, r], [a + 0.06, r], [a + 0.02, r * 0.85], [a, r * 0.6], [a, 0.0]];
    store.push(latheX(prof, 10, y, z));
    if (M.dome) dark.push(sph(r * 0.92, 8, 4, f - 0.06, y, z, 1.4, 1, 1));
    var k, s;
    /* wings: [station from the nose, root chord, span out from the body,
       tip chord inset] */
    if (M.wing) {
      var wx = f - M.wing[0];
      for (k = 0; k < 4; k++) {
        s = PI / 4 + k * PI / 2;
        var root = M.wing[1], span = M.wing[2];
        var pl = [[wx, 0], [wx - root, 0], [wx - root + 0.02, span], [wx - M.wing[3] - 0.08, span]];
        store.push(finPlate(pl, 0.012, x, y, z, s, r));
      }
    }
    var tw = M.tail;
    for (k = 0; k < 4; k++) {
      s = PI / 4 + k * PI / 2;
      var tx = a + tw[0] + tw[1];
      var tp = [[tx, 0], [a + tw[0], 0], [a + tw[0], tw[2]], [a + tw[0] + tw[1] * 0.45, tw[2]]];
      store.push(finPlate(tp, 0.012, x, y, z, s, r));
    }
  }
  /* a thin fin plate from an outline in (x, outward) coordinates, turned
     to angle s about the body axis through (y, z), starting at radius r */
  function finPlate(pl, th, x0, y, z, s, r) {
    var A = [], B = [], i, c = Math.cos(s), sn = Math.sin(s);
    for (i = 0; i < pl.length; i++) {
      var rr = r * 0.9 + pl[i][1];
      /* the plate's thickness is laid across it, at right angles */
      A.push([pl[i][0], y + rr * c - th * sn, z + rr * sn + th * c]);
      B.push([pl[i][0], y + rr * c + th * sn, z + rr * sn - th * c]);
    }
    return solid(A, B);
  }
  /* the launcher rail under a pylon or on a wingtip: a slim box with a
     tapered front */
  function rail(x0, x1, y, z, list) {
    list.push(box(x0 - x1, 0.07, 0.07, (x0 + x1) / 2, y, z));
    list.push(box(0.20, 0.05, 0.05, x0 + 0.08, y, z - 0.01, 0, -0.35, 0));
  }
  /* a pylon: a deep slab under the wing, its top buried in the skin */
  function pylon(x0, x1, y, zTop, zBot, list, th) {
    var t = th || 0.09, A = [], B = [];
    var pts = [[x0, zTop + 0.04], [x1, zTop + 0.04], [x1 + 0.10, zBot], [x0 - 0.25, zBot + 0.02]];
    for (var i = 0; i < pts.length; i++) { A.push([pts[i][0], y + t / 2, pts[i][1]]); B.push([pts[i][0], y - t / 2, pts[i][1]]); }
    list.push(solid(A, B));
  }
  /* a pod: a rounded cylinder with a window or radome, d along x */
  function pod(x, y, z, len, r, list, nose, tailR) {
    var f = x + len / 2, a = x - len / 2;
    list.push(latheX([[f, 0], [f - nose * 0.4, r * 0.7], [f - nose, r], [a + 0.15, r],
                      [a + 0.02, (tailR || r * 0.7)], [a, 0]], 12, y, z));
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "f16_" + VR.key;
    var i, k, s, d, y;
    var skin = [], metal = [], dark = [], glass = [], store = [], pods = [], team = [];
    var big = VR.inlet === "mcid";

    /* --------------------------------------------------- the fuselage ----
       The upper body, radome tip to nozzle. The radome is a full ogive,
       wider than it is deep and smooth in section (Norwegian F-16AM 681
       at Kleine-Brogel, three-quarter from the front); its joint is
       1.80 m back in the side and underside views. Its edges were read
       off three references at the same 14.52 m scale: the half-width in
       plan, 0.22 / 0.36 / 0.46 / 0.52 / 0.58 m at 0.5 / 1.0 / 1.5 / 1.95 /
       2.6 m back, from the 522nd FS jet photographed from below and the
       USAF line drawing (they agree within 1.5 cm); the top and the belly,
       +0.27 / -0.17 at 0.75 m and +0.40 / -0.19 at 1.25 m, from J-136's
       side view at Twente. The nose droops: its belly runs nearly level,
       0.20 m under the radome tip, while the top climbs to the windscreen
       at 0.68 m. Behind the joint the sides crease into the chine that
       runs back into the strake. From the intake back, the belly is buried
       in the intake trunk below (TRUNK). Behind the canopy the spine falls
       to the fin, and the body tapers into the nozzle 14.52 m back.
                d      zb     zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 0.00, -0.004, 0.004, 0.000, 0.004, 0.006, 0.004, 1.0),
      sec( 0.10, -0.045, 0.042, 0.000, 0.072, 0.075, 0.072, 1.0),
      sec( 0.25, -0.087, 0.104, 0.008, 0.134, 0.140, 0.134, 0.98),
      sec( 0.45, -0.135, 0.180, 0.025, 0.198, 0.208, 0.198, 0.97),
      sec( 0.70, -0.162, 0.258, 0.048, 0.275, 0.290, 0.274, 0.96),
      sec( 1.00, -0.184, 0.340, 0.075, 0.343, 0.364, 0.340, 0.95),
      sec( 1.35, -0.193, 0.424, 0.105, 0.398, 0.428, 0.395, 0.93),
      sec( 1.80, -0.198, 0.522, 0.140, 0.450, 0.497, 0.440, 0.90),
      sec( 2.20, -0.200, 0.612, 0.170, 0.440, 0.540, 0.400, 0.80),
      sec( 2.60, -0.195, 0.680, 0.195, 0.390, 0.572, 0.300, 0.70),
      sec( 3.30, -0.190, 0.755, 0.200, 0.390, 0.580, 0.330, 0.66),
      sec( 4.00, -0.215, 0.795, 0.180, 0.41, 0.580, 0.35, 0.63),
      sec( 4.60, -0.330, 0.825, 0.140, 0.45, 0.600, 0.36, 0.62),
      sec( 5.40, -0.360, 0.880, 0.120, 0.47, 0.620, 0.35, 0.62),
      sec( 5.95, -0.380, 0.950, 0.110, 0.49, 0.640, 0.33, 0.64),
      sec( 7.00, -0.400, 0.860, 0.100, 0.51, 0.660, 0.35, 0.66),
      sec( 8.00, -0.400, 0.780, 0.090, 0.52, 0.670, 0.37, 0.66),
      sec( 9.00, -0.400, 0.720, 0.080, 0.52, 0.670, 0.39, 0.68),
      sec(10.00, -0.420, 0.700, 0.080, 0.52, 0.650, 0.41, 0.70),
      sec(11.00, -0.560, 0.680, 0.070, 0.50, 0.620, 0.42, 0.72),
      sec(12.00, -0.580, 0.660, 0.060, 0.48, 0.590, 0.42, 0.78),
      sec(12.90, -0.540, 0.620, 0.050, 0.47, 0.565, 0.42, 0.84),
      sec(13.55, -0.500, 0.580, 0.040, 0.46, 0.545, 0.42, 0.90)
    ];
    /* closed at the back too: the nozzle hangs on that face, and at the
       diagonals the body is a touch wider than the petals */
    var fr = skinRings(secRings(FUS, 12), 0.0, 0.0);
    for (i = 0; i < fr.length; i++) skin.push(fr[i]);
    function fusAt(dd) { return interpSecs(FUS, dd); }

    /* ---------------------------------------------- the intake trunk ----
       The chin inlet and the duct under the body that carries its air back
       to the engine: the F-16's lower fuselage. The lip is raked, the lower
       edge 0.17 m behind the upper. The F110 blocks' Modular Common Inlet
       Duct is wider and deeper, its lower lip lower. */
    var IN = big ? { w: 0.640, wi: 0.570, zb: -0.915, zbi: -0.860, zt: -0.20, zti: -0.255 }
                 : { w: 0.600, wi: 0.530, zb: -0.815, zbi: -0.760, zt: -0.20, zti: -0.255 };
    var LIP = 4.10, RAKE = 0.17;
    var TRUNK = [
      sec(LIP,  IN.zb,  IN.zt, (IN.zb + IN.zt) / 2, IN.w - 0.10, IN.w, IN.w - 0.06, 0.42),
      sec(4.40, big ? -0.90 : -0.83, -0.10, -0.47, 0.52, 0.625, 0.52, 0.46),
      sec(5.20, big ? -0.87 : -0.85, -0.05, -0.46, 0.55, 0.645, 0.52, 0.48),
      sec(6.50, -0.860, 0.00, -0.45, 0.56, 0.665, 0.52, 0.50),
      sec(8.00, -0.860, 0.00, -0.45, 0.56, 0.670, 0.52, 0.50),
      sec(9.30, -0.855, 0.00, -0.45, 0.55, 0.660, 0.52, 0.52),
      sec(10.30, -0.830, 0.00, -0.42, 0.50, 0.620, 0.48, 0.56),
      sec(11.20, -0.720, 0.00, -0.38, 0.42, 0.550, 0.45, 0.62),
      sec(11.95, -0.600, 0.00, -0.32, 0.34, 0.460, 0.40, 0.70)
    ];
    function rakeX(z) { return -RAKE * Math.max(0, Math.min(1, (IN.zt - z) / (IN.zt - IN.zb))); }
    var trR = secRings(TRUNK, 10);
    for (k = 0; k < trR[0].length; k++) trR[0][k][0] += rakeX(trR[0][k][2]);
    var tr = skinRings(trR, null, 0.05);
    for (i = 0; i < tr.length; i++) skin.push(tr[i]);
    /* the lip: a rolled edge from the outer ring in to the opening, then
       the duct lining, dark, running back to a dark face that hides the
       body's own lines inside */
    var lipIn = sec(LIP + 0.03, IN.zbi, IN.zti, (IN.zbi + IN.zti) / 2, IN.wi - 0.09, IN.wi, IN.wi - 0.05, 0.42);
    var ductB = sec(LIP + 0.55, IN.zbi + 0.06, IN.zti - 0.02, (IN.zbi + IN.zti) / 2 + 0.03,
                    IN.wi - 0.14, IN.wi - 0.05, IN.wi - 0.10, 0.45);
    var ri = secRings([lipIn, ductB], 10);
    for (k = 0; k < ri[0].length; k++) { ri[0][k][0] += rakeX(ri[0][k][2]); ri[1][k][0] += rakeX(ri[1][k][2]) * 0.5; }
    skin.push(skinRings([ri[0], trR[0]], null, null)[0]);
    var duct = skinRings(ri, null, 0.0);
    dark.push(inward(duct[0]));
    dark.push(inward(duct[1]));

    /* --------------------------------------- strake (LERX) and wing ----
       One skin from inside the body to the tip, through chordwise sections
       at stations across the span. Each section runs from the strake edge (or
       the wing's own leading edge, outboard of the strake corner) to the
       straight trailing edge. The strake is a thin sharp plate, 70 mm
       thick; behind the wing's own leading-edge line the section is the
       4 per cent aerofoil of the wing proper. */
    function wingSec(yy) {
      var le = yy <= LERX[LERX.length - 1][0] ? interp(LERX, yy) : wingLE(yy);
      var lw = Math.max(wingLE(yy), le), cw = WTE - lw, t = 0.04 * cw;
      var p1d, p1h;
      if (lw - le > 0.05) { p1d = lw; p1h = 0.035; }
      else { p1d = lw + 0.07 * cw; p1h = 0.55 * t / 2; }
      var pts = [[le, 0], [p1d, p1h], [lw + 0.30 * cw, t / 2], [lw + 0.66 * cw, 0.70 * t / 2], [WTE, 0]];
      var up = [], lo = [], j;
      for (j = 0; j < pts.length; j++) {
        var dd = pts[j][0], zc = wingZ(dd);
        up.push([S(dd), yy, zc + pts[j][1]]);
        if (j > 0 && j < pts.length - 1) lo.push([S(dd), yy, zc - pts[j][1]]);
      }
      return up.concat(lo.reverse());
    }
    var WST = [0.30, 0.60, 0.66, 0.71, 0.79, 0.86, 0.95, 1.07, 1.19, 1.31, 1.39, 1.44, 1.46, 2.45, 3.40, WTIP];
    var wr = [];
    for (i = 0; i < WST.length; i++) wr.push(wingSec(WST[i]));
    both(skin, spanSkin(wr, 4, [0, 1, 0]));

    /* ------------------------------------------------ tail booms ----
       The flat fairings either side of the engine, from the wing's
       trailing edge back to the speed brakes beside the nozzle; the
       tailplanes pivot on their outer faces. */
    function boomSec(dd, yo, zt, zb) {
      return [[S(dd), 0.42, zb], [S(dd), 0.78, zb - 0.02], [S(dd), yo, (zb + zt) / 2 - 0.03],
              [S(dd), yo, (zb + zt) / 2 + 0.03], [S(dd), 0.78, zt], [S(dd), 0.42, zt + 0.05]];
    }
    var BOOM = [boomSec(10.55, 1.13, 0.13, -0.05), boomSec(11.75, 1.10, 0.14, -0.07),
                boomSec(12.00, 0.98, 0.15, -0.08), boomSec(13.60, 0.96, 0.17, -0.10),
                boomSec(14.20, 0.90, 0.10, -0.04)];
    for (i = 0; i < BOOM.length - 1; i++) both(skin, solid(BOOM[i], BOOM[i + 1]));
    /* the split speed brakes at the end of each boom, beside the nozzle:
       upper and lower petals, closed, with the seam between them */
    both(dark, box(0.78, 0.40, 0.016, S(13.86), 0.74, 0.035));

    /* --------------------------------------------------- tailplanes ----
       All-moving, 5.6 m across, 10 degrees of anhedral; leading edge swept
       40 degrees, trailing edge straight (the Block 15 enlargement every
       airframe here carries). */
    var ST_Y0 = 0.96, ST_Y1 = 2.80, ST_Z0 = 0.03, ANH = Math.tan(10 * D2R);
    function stabAt(yy) { return function (u, v, kk) { return [S(u), yy, ST_Z0 - (yy - ST_Y0) * ANH + kk]; }; }
    var stRoot = foil([11.90, 0], [14.45, 0], 0.13, stabAt(ST_Y0));
    var stTip = foil([13.35, 0], [14.45, 0], 0.045, stabAt(ST_Y1));
    both(skin, solid(stRoot, stTip));

    /* ----------------------------------------------------------- fin ----
       Leading edge swept 48 degrees from the dorsal fillet to the tip, its
       cap 3.29 m up (5.09 m off the ground); the trailing edge leans back
       20 degrees, so the cap overhangs the nozzle by 0.44 m. The root
       aerofoil is buried in the spine. */
    function finAt(u, v, kk) { return [S(u), kk, v]; }
    var finRoot = foil([10.97, 0.62], [13.99, 0.62], 0.20, finAt);
    var finTip = foil([13.94, 3.24], [14.94, 3.24], 0.07, finAt);
    skin.push(solid(finRoot, finTip));
    /* the cap: the antenna fairing along the tip */
    skin.push(solid([[S(13.94), 0.035, 3.22], [S(14.96), 0.030, 3.22], [S(14.96), -0.030, 3.22], [S(13.94), -0.035, 3.22]],
                    [[S(13.98), 0.025, 3.29], [S(14.94), 0.022, 3.28], [S(14.94), -0.022, 3.28], [S(13.98), -0.025, 3.29]]));
    /* the dorsal fillet: a low wedge running up the spine into the fin's
       leading edge */
    var dz0 = fusAt(9.3).zt;
    skin.push(convex([
      [[S(9.3), 0.13, dz0 - 0.06], [S(11.6), 0.13, 0.60], [S(11.6), -0.13, 0.60], [S(9.3), -0.13, dz0 - 0.06]],
      [[S(9.3), 0.13, dz0 - 0.06], [S(11.6), 0.13, 0.60], [S(11.4), 0, 1.02], [S(9.3), 0, dz0 + 0.03]],
      [[S(9.3), -0.13, dz0 - 0.06], [S(11.6), -0.13, 0.60], [S(11.4), 0, 1.02], [S(9.3), 0, dz0 + 0.03]],
      [[S(9.3), 0.13, dz0 - 0.06], [S(9.3), 0, dz0 + 0.03], [S(9.3), -0.13, dz0 - 0.06]],
      [[S(11.6), 0.13, 0.60], [S(11.4), 0, 1.02], [S(11.6), -0.13, 0.60]]]));
    /* the fin-root fairing behind it, the long box every block here has
       under the rudder, ending in a blunt round tail level with the nozzle
       exit (91-0379 in 2023, 6672 in 2019, 6666 in 2023); on the ROCAF
       Block 20 it is a little deeper and carries the dispenser rows */
    var roc = VR.fin === "roc", fEnd = 14.62;
    var FAIR = [
      sec(12.45, 0.58, 0.66, 0.62, 0.05, 0.08, 0.05, 0.6),
      sec(12.85, 0.56, 1.00, 0.78, 0.13, 0.165, 0.12, 0.55),
      sec(fEnd - 0.40, 0.56, roc ? 1.02 : 0.98, 0.78, 0.13, 0.17, 0.12, 0.55),
      sec(fEnd - 0.08, 0.58, roc ? 0.98 : 0.94, 0.78, 0.11, 0.15, 0.10, 0.6)
    ];
    var fa = skinRings(secRings(FAIR, 6), null, 0.07);
    for (i = 0; i < fa.length; i++) skin.push(fa[i]);

    /* --------------------------------------------------- ventral fins ----
       Two, under the rear fuselage ahead of the tailplanes, canted 15
       degrees outward; 0.37 m off the ground at their lowest. */
    var cant = 15 * D2R;
    function ventAt(u, v, kk) {
      /* v: distance down the fin from its buried root */
      return [S(u), 0.40 + v * Math.sin(cant) + kk * Math.cos(cant), -0.62 - v * Math.cos(cant) + kk * Math.sin(cant)];
    }
    var vRoot = foil([10.40, 0], [11.72, 0], 0.07, ventAt);
    var vTip = foil([11.00, 0.84], [11.78, 0.84], 0.04, ventAt);
    both(skin, solid(vRoot, vTip));

    /* ---------------------------------------------------- the nozzle ----
       Convergent petals in burnt steel, from the body's end to the exit
       14.52 m back. A bright actuator ring at the base, a dark throat and
       the afterburner liner inside. */
    var NZ = 0.08, nb = 13.50;
    /* closed at its front, where it meets the body's end, so the crescent
       between the body's top and the petals' never shows the pipe */
    dark.push(latheX([[S(nb), 0.0005], [S(nb), 0.555], [S(nb + 0.25), 0.545], [S(13.95), 0.50],
                      [S(14.25), 0.445], [S(NOZ_D), 0.405]], 16, 0, NZ));
    metal.push(cyl(0.565, 0.565, 0.08, 16, "x", S(nb + 0.02), 0, NZ, true));
    dark.push(inward(cyl(0.40, 0.38, 0.55, 16, "x", S(NOZ_D - 0.27), 0, NZ, true)));
    /* the turbine face at the bottom of the pipe, looking aft */
    dark.push(disc(0.39, 16, [S(NOZ_D - 0.52), 0, NZ], [-1, 0, 0]));
    /* the flameholder ring, just visible down the pipe, and the lip that
       closes the gap between the petals and the liner at the exit */
    metal.push(ring(0.17, 0.24, 16, [S(NOZ_D - 0.49), 0, NZ], [-1, 0, 0]));
    dark.push(ring(0.37, 0.402, 16, [S(NOZ_D) - 0.002, 0, NZ], [-1, 0, 0]));

    /* -------------------------------------------------- the canopy ----
       The one-piece bubble: from the windscreen base 2.60 m back to the
       spine 5.95 m back, 0.86 m across and its top 1.28 m above the radome
       tip (3.08 m off the ground). Gold-filmed, dark from outside. */
    var CAN = [[2.60, 0.06, 0.680, 0.70], [2.78, 0.24, 0.690, 0.84], [3.05, 0.34, 0.700, 0.99],
               [3.45, 0.40, 0.720, 1.13], [3.95, 0.43, 0.740, 1.23], [4.45, 0.43, 0.770, 1.28],
               [4.95, 0.41, 0.800, 1.27], [5.35, 0.36, 0.840, 1.19], [5.70, 0.25, 0.880, 1.06],
               [5.95, 0.08, 0.930, 0.97]];
    function domeRing(c, grow) {
      var p = [], j, a;
      for (j = 0; j <= 12; j++) {
        a = PI * j / 12;
        p.push([S(c[0]), c[1] * grow * Math.cos(a), c[2] + (c[3] - c[2]) * (1 + (grow - 1) * 1.5) * Math.sin(a)]);
      }
      return p;
    }
    var cr = [];
    for (i = 0; i < CAN.length; i++) cr.push(domeRing(CAN[i], 1));
    /* an open shell: bridge the rings without closing under the floor */
    (function () {
      var pos = [], idx = [], rl = 13, a;
      for (i = 0; i < cr.length; i++) for (k = 0; k < rl; k++) pos.push(cr[i][k][0], cr[i][k][1], cr[i][k][2]);
      for (i = 0; i < cr.length - 1; i++) for (k = 0; k < rl - 1; k++) {
        a = i * rl + k;
        idx.push(a, a + rl, a + 1, a + 1, a + rl, a + rl + 1);
      }
      var cg = new V.BufferGeometry();
      cg.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      cg.setIndex(idx);
      cg.computeVertexNormals();
      glass.push(cg);
    })();
    /* the canopy sills and the aft frame where the glass meets the spine */
    for (s = -1; s <= 1; s += 2) {
      var sl = [];
      for (i = 1; i < CAN.length - 1; i++) sl.push([S(CAN[i][0]), s * (CAN[i][1] + 0.012), CAN[i][2] + 0.01]);
      for (i = 0; i < sl.length - 1; i++) dark.push(bar(sl[i], sl[i + 1], 0.022, 4, true));
    }
    var bow = CAN[7];
    for (k = 0; k < 12; k++) {
      var a0 = PI * k / 12, a1 = PI * (k + 1) / 12;
      dark.push(bar([S(bow[0]), bow[1] * 1.02 * Math.cos(a0), bow[2] + (bow[3] - bow[2]) * 1.02 * Math.sin(a0)],
                    [S(bow[0]), bow[1] * 1.02 * Math.cos(a1), bow[2] + (bow[3] - bow[2]) * 1.02 * Math.sin(a1)], 0.025, 4, true));
    }
    /* inside: the ACES II seat and the pilot's helmet, and the head-up
       display on the coaming ahead of him */
    dark.push(box(0.50, 0.46, 0.55, S(4.95), 0, 0.86, 0, -0.30, 0));
    dark.push(box(0.16, 0.30, 0.28, S(5.12), 0, 1.03, 0, -0.30, 0));
    metal.push(sph(0.14, 10, 6, S(4.70), 0, 1.10));
    /* the coaming narrows to the front, as the windscreen does over it,
       and the head-up display stands on it with its top 4 cm under the
       glass */
    dark.push(solid([[S(3.03), 0.17, 0.72], [S(3.03), -0.17, 0.72], [S(3.03), -0.17, 0.84], [S(3.03), 0.17, 0.84]],
                    [[S(3.47), 0.30, 0.72], [S(3.47), -0.30, 0.72], [S(3.47), -0.30, 0.88], [S(3.47), 0.30, 0.88]]));
    dark.push(box(0.10, 0.20, 0.13, S(3.14), 0, 0.895, 0, 0.35, 0));

    /* ------------------------------------------------ small kit ---- */
    /* the nose probe: 0.51 m ahead of the radome */
    metal.push(cyl(0.022, 0.032, PROBE - 0.10, 8, "x", S(-(PROBE - 0.10) / 2), 0, 0.0));
    metal.push(cyl(0.016, 0.022, 0.10, 8, "x", S(-PROBE + 0.05), 0, 0.0));
    /* the skin of the forebody at station dd: its half-width at height
       zz, and the height of its upper surface yy out from the centreline,
       each found by solving the section for its angle */
    function fusSolve(dd, f, want, lo, hi) {
      var sc = fusAt(dd), q, mid;
      for (q = 0; q < 40; q++) { mid = (lo + hi) / 2; if (f(ringPt(sc, mid)) < want) lo = mid; else hi = mid; }
      return ringPt(sc, (lo + hi) / 2);
    }
    function fusHalfW(dd, zz) { return fusSolve(dd, function (p) { return p[1]; }, zz, -PI / 2, PI / 2)[0]; }
    function fusTopZ(dd, yy) { return fusSolve(dd, function (p) { return -p[0]; }, -Math.abs(yy), 0, PI / 2)[1]; }
    /* the angle-of-attack probes, one each side just behind the radome
       joint, 0.29 m above the radome tip (J-136 at Twente) */
    var pw = fusHalfW(2.22, 0.29);
    for (s = -1; s <= 1; s += 2) {
      metal.push(latheX([[S(2.03), 0.0], [S(2.07), 0.018], [S(2.13), 0.025], [S(2.34), 0.021], [S(2.42), 0.0]],
                        8, s * (pw + 0.035), 0.29));
      metal.push(box(0.10, 0.06, 0.02, S(2.24), s * (pw + 0.005), 0.29));
    }
    /* the IFF interrogator's four "bird slicer" blades ahead of the
       windscreen, on the blocks that carry the combined interrogator: each
       stands straight on the skin, its root sunk into it, in the airframe's
       paint (the 480th FS jets at Spangdahlem, 2022) */
    if (VR.iff) {
      for (k = 0; k < 4; k++) {
        var by = -0.18 + k * 0.12, ba = fusTopZ(2.10, by), bb = fusTopZ(2.36, by);
        var bt0 = lerp(ba, bb, 0.27) + 0.075, bt1 = lerp(ba, bb, 0.77) + 0.075;
        skin.push(solid([[S(2.10), by + 0.006, ba - 0.03], [S(2.36), by + 0.006, bb - 0.03], [S(2.30), by + 0.006, bt1], [S(2.17), by + 0.006, bt0]],
                        [[S(2.10), by - 0.006, ba - 0.03], [S(2.36), by - 0.006, bb - 0.03], [S(2.30), by - 0.006, bt1], [S(2.17), by - 0.006, bt0]]));
      }
    }
    /* the M61A1 muzzle port in the LEFT strake root, and its gas vents */
    dark.push(box(0.34, 0.07, 0.09, S(5.75), 0.585, 0.24, 0, 0, 0.30));
    dark.push(box(0.30, 0.04, 0.05, S(6.25), 0.60, 0.20, 0, 0, 0.30));
    /* blade aerials: on the spine behind the canopy and under the trunk */
    dark.push(box(0.26, 0.02, 0.16, S(6.70), 0, fusAt(6.7).zt + 0.06, 0, 0.30, 0));
    dark.push(box(0.24, 0.02, 0.15, S(6.20), 0, -0.93, 0, -0.30, 0));
    dark.push(box(0.20, 0.02, 0.12, S(10.6), 0, -0.88, 0, -0.30, 0));

    /* ------------------------------------------------------ stores ----
       Stations measured head-on: tips 4.68 m out, 2 and 8 at 3.92, 3 and
       7 at 3.03, the tanks on 4 and 6 at 1.81; the intake stations on the
       lower corners of the trunk; the centreline between the main gear.
       Every rail and pylon is painted with the airframe. */
    function wingBot(yy, dd) { var cw = WTE - wingLE(yy); return wingZ(dd) - 0.30 * 0.04 * cw; }
    function hang(type, yy, dd, drop) {
      for (s = -1; s <= 1; s += 2) {
        var zb = wingBot(yy, dd);
        var xm = S(dd);
        pylon(xm + 0.85, xm - 0.75, s * yy, zb, zb - drop + 0.10, skin);
        rail(xm + 0.95, xm - 0.95, s * yy, zb - drop + 0.06, skin);
        missile(type, xm - 0.10, s * yy, zb - drop - STORE[type].r - 0.02, store, dark);
      }
    }
    /* the wingtip launchers, missile on the outboard face */
    for (s = -1; s <= 1; s += 2) {
      rail(S(8.62), S(11.07), s * ST_TIP, 0.05, skin);
      skin.push(box(2.3, 0.10, 0.05, S(9.87), s * (WTIP + 0.04), 0.05));
    }
    if (VR.tip) for (s = -1; s <= 1; s += 2) missile(VR.tip, S(9.77), s * (ST_TIP + 0.04 + STORE[VR.tip].r), 0.05, store, dark);
    if (VR.st2) hang(VR.st2, ST2, 9.67, 0.24);
    if (VR.st3) hang(VR.st3, ST3, 9.42, VR.st3 === "harm" ? 0.34 : 0.30);
    /* 370 US gal tanks: 5.4 m long, 0.70 m across, nose well ahead of the
       wing; their bottoms 0.60 m off the ground */
    if (VR.tank) {
      for (s = -1; s <= 1; s += 2) {
        var tz = -0.85, tx = S(7.85);
        skin.push(latheX([[tx + 2.70, 0.0], [tx + 2.30, 0.12], [tx + 1.75, 0.26], [tx + 1.10, 0.34],
                          [tx + 0.40, 0.35], [tx - 0.60, 0.35], [tx - 1.40, 0.30], [tx - 2.20, 0.17],
                          [tx - 2.70, 0.03], [tx - 2.72, 0.0]], 14, s * ST4, tz));
        pylon(tx + 0.95, tx - 1.05, s * ST4, wingBot(ST4, 7.85), tz + 0.33, skin, 0.10);
      }
    }
    /* centreline ECM pod: ALQ-131 (shallow) or ALQ-184 */
    if (VR.ctr) {
      var cl = VR.ctr === "alq184" ? 3.90 : 2.95, cz = -1.12;
      pod(S(8.55), 0, cz, cl, 0.155, pods, 0.45, 0.10);
      pods.push(box(cl * 0.55, 0.24, 0.10, S(8.55), 0, cz + 0.06));
      pylon(S(8.0), S(9.0), 0, -0.84, cz + 0.12, skin, 0.10);
    }
    /* intake stations: the HTS (1.42 m, its pale radome nose) on the left
       and a Sniper (2.39 m, its dark window ball) on the right */
    function chin(type, side) {
      var py = side * 0.50, pz = -0.98;
      if (type === "hts") {
        pod(S(5.85), py, pz, 1.42, 0.10, pods, 0.25);
        store.push(sph(0.085, 8, 5, S(5.85) + 0.71, py, pz, 1.2, 1, 1));
      } else {
        pod(S(6.05), py, pz - 0.03, 2.39, 0.15, pods, 0.30);
        dark.push(sph(0.13, 10, 6, S(6.05) + 1.12, py, pz - 0.03));
      }
      skin.push(box(0.70, 0.07, 0.16, S(5.95), side * 0.47, -0.86));
    }
    if (VR.left) chin(VR.left, 1);
    if (VR.right) chin(VR.right, -1);

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: a band across each
       outer wing and the outer tops of the tailplanes, laid 1.2 cm clear of
       their own surfaces so they cannot z-fight at map distance, and a band
       round the fin under its cap that reads from the side. */
    function wingFlash(y0, y1) {
      function top(yy, f, kk) {
        var lw = wingLE(yy), cw = WTE - lw, dd = lw + f * cw;
        /* the aerofoil's upper surface between the 7% and 66% corners */
        var h = f < 0.30 ? lerp(0.55, 1.0, (f - 0.07) / 0.23) : lerp(1.0, 0.70, (f - 0.30) / 0.36);
        return [S(dd), yy, wingZ(dd) + h * 0.02 * cw + kk];
      }
      /* two plates, meeting on the crest line, so each lies parallel to
         the facet under it */
      var f = [0.10, 0.30, 0.30, 0.62], q, out2 = [];
      for (q = 0; q < 4; q += 2) {
        var lo = [top(y0, f[q], 0.012), top(y0, f[q + 1], 0.012), top(y1, f[q + 1], 0.012), top(y1, f[q], 0.012)];
        var hi = [top(y0, f[q], 0.022), top(y0, f[q + 1], 0.022), top(y1, f[q + 1], 0.022), top(y1, f[q], 0.022)];
        out2.push(solid(lo, hi));
      }
      return out2;
    }
    var wf = wingFlash(3.30, 3.80);
    both(team, wf[0]); both(team, wf[1]);
    function stabFlash(y0, y1) {
      function top(yy, f, kk) {
        var le = lerp(11.90, 13.35, (yy - ST_Y0) / (ST_Y1 - ST_Y0)), dd = le + f * (14.45 - le);
        var tt = lerp(0.13, 0.045, (yy - ST_Y0) / (ST_Y1 - ST_Y0));
        /* the foil's upper facet runs from half the thickness at 15 per
           cent to 0.38 of it at 75 */
        return [S(dd), yy, ST_Z0 - (yy - ST_Y0) * ANH + tt * lerp(0.5, 0.38, (f - 0.15) / 0.60) + kk];
      }
      var lo = [top(y0, 0.15, 0.010), top(y0, 0.72, 0.010), top(y1, 0.72, 0.010), top(y1, 0.15, 0.010)];
      var hi = [top(y0, 0.15, 0.020), top(y0, 0.72, 0.020), top(y1, 0.72, 0.020), top(y1, 0.15, 0.020)];
      return solid(lo, hi);
    }
    both(team, stabFlash(1.85, 2.65));
    function finLE(zz) { return lerp(10.97, 13.94, (zz - 0.62) / (3.24 - 0.62)); }
    function finTE(zz) { return lerp(13.99, 14.94, (zz - 0.62) / (3.24 - 0.62)); }
    function finT(zz) { return lerp(0.20, 0.07, (zz - 0.62) / (3.24 - 0.62)); }
    team.push(solid(foil([finLE(2.70) - 0.02, 2.70], [finTE(2.70) + 0.01, 2.70], finT(2.70) + 0.03, finAt),
                    foil([finLE(3.02) - 0.02, 3.02], [finTE(3.02) + 0.01, 3.02], finT(3.02) + 0.03, finAt)));

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "canopy");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "missiles");
    mesh(g, pods, T.pod, "pods");
    mesh(g, team, T.team, "team");

    /* ================================================ undercarriage ====
       Named "gear": render3d.js shows it only below 18 m. Tricycle: the
       nose leg behind the inlet, 4.00 m ahead of the main legs, which
       stand 2.36 m apart under the strake roots. The C's Block 40 and
       later gear rides on 27.75 in main tyres, the F-16A/B's on 25.5 in.
       The big door
       beside the nose leg hangs on the right; the main legs carry their
       outer doors. The wells are in the group, so they close with it. */
    var gear = new V.Group();
    gear.name = "gear";
    var gM = [], gR = [], gS = [], gD = [];
    var MR = VR.tyres === "big" ? 0.352 : 0.324, MW = VR.tyres === "big" ? 0.222 : 0.203;
    var NR = 0.229, NW = 0.145;
    var NX = S(5.00), MX = S(9.00), MY = 1.18;
    /* nose leg */
    gM.push(bar([NX + 0.08, 0, -0.84], [NX, 0, GROUND + NR + 0.10], 0.065, 8, true));
    gM.push(bar([NX, 0, GROUND + NR + 0.16], [NX, 0, GROUND + NR], 0.050, 8, true));
    gM.push(box(0.10, 0.20, 0.06, NX, 0, GROUND + NR + 0.10));
    gM.push(bar([NX + 0.10, 0.06, -0.95], [NX + 0.22, 0.06, -1.15], 0.025, 6, true));
    gR.push(cyl(NR, NR, NW, 16, "y", NX, 0, GROUND + NR));
    gM.push(cyl(0.11, 0.11, NW + 0.01, 10, "y", NX, 0, GROUND + NR));
    /* taxi and landing lights on the nose leg */
    gM.push(box(0.10, 0.18, 0.08, NX + 0.08, 0, -1.08));
    gS.push(box(1.20, 0.03, 0.52, NX - 0.20, -0.21, -1.12, 0.10, 0, 0));
    gD.push(box(1.05, 0.34, 0.03, NX - 0.05, 0, -0.87));
    /* main legs */
    for (s = -1; s <= 1; s += 2) {
      var ax = [MX, s * (MY - MW / 2 - 0.02), GROUND + MR];
      gM.push(bar([MX + 0.10, s * 0.58, -0.62], [MX + 0.02, s * (MY - 0.16), GROUND + MR + 0.10], 0.075, 8, true));
      gM.push(bar([MX + 0.02, s * (MY - 0.16), GROUND + MR + 0.12], ax, 0.060, 8, true));
      gM.push(bar([MX + 0.90, s * 0.60, -0.70], [MX + 0.05, s * (MY - 0.20), GROUND + MR + 0.22], 0.040, 6, true));
      gM.push(cyl(0.05, 0.05, 0.22, 8, "y", MX, s * (MY - 0.12), GROUND + MR));
      gR.push(cyl(MR, MR, MW, 18, "y", MX, s * MY, GROUND + MR));
      gM.push(cyl(0.17, 0.17, MW + 0.01, 12, "y", MX, s * MY, GROUND + MR));
      /* the outer door, carried on the leg */
      gS.push(box(1.20, 0.03, 0.50, MX + 0.15, s * 0.88, -1.02, s * 0.30, 0, 0));
      /* the well, a dark recess in the trunk's lower corner */
      gD.push(box(1.30, 0.34, 0.03, MX + 0.25, s * 0.46, -0.865));
    }
    mesh(gear, gM, T.metal, "gear_legs");
    mesh(gear, gR, T.rubber, "tyres");
    mesh(gear, gS, T.skin, "gear_doors", true);
    mesh(gear, gD, T.dark, "gear_wells");
    g.add(gear);

    return g;
  }

  var out = {};
  Object.keys(VARIANTS).forEach(function (id) {
    out[id] = function (THREE, M, C) { return build(THREE, M, C, VARIANTS[id]); };
  });
  return out;
})();

/* len is the MEASURED x extent, nose probe tip to the fin cap's trailing
   edge; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["fighter_n"]        = { len: 15.47, build: HeroF16.fighter_n };
UNIT_MODELS["nato_e90_fighter"] = { len: 15.47, build: HeroF16.nato_e90_fighter };
UNIT_MODELS["sead_n"]           = { len: 15.47, build: HeroF16.sead_n };
UNIT_MODELS["nato_e90_sead"]    = { len: 15.47, build: HeroF16.nato_e90_sead };
UNIT_MODELS["nato_e00_sead"]    = { len: 15.47, build: HeroF16.nato_e00_sead };
UNIT_MODELS["fighter_r"]        = { len: 15.47, build: HeroF16.fighter_r };
UNIT_MODELS["roc_e90_fighter"]  = { len: 15.47, build: HeroF16.roc_e90_fighter };
UNIT_MODELS["roc_e00_fighter"]  = { len: 15.47, build: HeroF16.roc_e00_fighter };
