/* ============ gb_tornado.js - HERO model: Panavia Tornado F.3 ADV, GR1, GR4 ======
   One builder, a VARIANTS table, five British rows:
     gbr_e80_fighter  "Tornado F.3"          F.3 ADV, four Skyflash           1980s
     gbr_e90_fighter  "Tornado F3"           F.3 ADV, Skyflash and AIM-9L     1990s
     gbr_e90_sead     "Tornado GR1 / ALARM"  GR.1 carrying ALARM              1991
     gbr_e00_cas      "Tornado GR4"          GR.4, Brimstone and Paveway IV   2000s
     gbr_e00_sead     "Tornado GR4 / ALARM"  GR.4 carrying ALARM              2000s
   There was no Tornado hero model before this file (grep -i tornado js/hero:
   only a 9A54 "Tornado-S" rocket launcher); the rows were drawn as the
   generic fighter_n, sead_n and bomber_n peers. Nothing here is built on them.

   References (Wikimedia Commons / Wikipedia, fetched for this file):
     A "Panavia Tornado IDS 3-view line drawing.svg" (960 px render): plan
       with the wing at 25 deg and the 67 deg position dashed, front view, side
       view with the wheels drawn below. Measured column by column at
       31.5 px/m, the scale at which BOTH the overall length from the nose
       pitot to the fin-tip trailing edge (528 px) gives the published 16.72 m
       AND the half-span at 25 deg (218.5 px) gives the published 13.91 m; the
       front view at the same scale gives 5.96 m fin tip to ground (5.95
       published). Everything on the IDS airframe below is read off A: the
       radome, the canopy line, the box intakes and their raked lips, the
       glove and its leading edge, the pivot (y 1.51), the outer panel, the
       wing anhedral and the taileron anhedral (front view), the tailerons,
       the fin, its flat-topped root fillet and its two tip fairings, the
       tail end, both wheel sizes and places (nose 0.49 m twins, mains 0.78 m
       x 0.30 m, track 3.04 m, wheelbase 5.27 m) and the swivelling wing
       pylons (y 3.22 and 5.63).
     B "RAF Tornado GR4 MOD 45155235.jpg" - a GR4 from below in flight: the two
       big wing tanks with a ventral fin on the inner pylons, a pod on each
       outer pylon (one plain cylinder, one with small fins), two Paveway IV in
       tandem on one fuselage shoulder station, a Litening pod and a triple
       Brimstone launcher under the fuselage, the two nozzles in their
       reverser shrouds, the tailerons.
     C "Tornado GR4 Prepares for Takeoff ... Libya MOD 45152564.jpg" - GR4 on
       the ground, starboard front quarter: the wing spread at 25 deg as it
       parks, grey radome with the short pitot, the refuelling-probe fairing
       along the starboard canopy sill, the FLIR fairing under the starboard
       nose, the twin nose wheels, the single big main wheels, the raked box
       intake, the triple Brimstone launchers, the wing tanks, and the dorsal
       fillet at the fin root with its forward-facing opening.
     D "An ALARM missile is loaded onto a Tornado. Kuwait. 21-03-2003 MOD
       45142839.jpg" - ALARM: blunt cream radome, grey body, small mid wings
       and tail fins; two carried side by side under the fuselage.
     E "Panavia Tornado GR1.jpg" (USAF Museum) - the GR1 in the 1991 Gulf
       desert pink, all over, with a black radome; the port cannon port under
       the nose.
     F "ZE887 Panavia Tornado F3.jpg" (RAF Museum) - F3, starboard side: the
       long slender radome, the long forward fuselage and spine behind the
       canopy, the wing spread at 25 deg, light grey; the cannon on the
       starboard side only. (Its black fin and spine are a commemorative
       scheme and are not drawn.)
     G en.wikipedia "Panavia Tornado" (GR4): length 16.72 m, span 13.91 m at
       25 deg / 8.60 m at 67 deg, height 5.95 m; RB199 thrust reversers; GR4
       BK-27 under the starboard side (two in the GR1); 3 fuselage and 4 wing
       stations. "Panavia Tornado ADV": 18.68 m; the fuselage lengthened by
       1.36 m, a longer radome, greater glove sweep, the port cannon deleted,
       four Skyflash / AMRAAM semi-recessed under the fuselage, Sidewinders on
       the shoulder rails of the wing pylons. Store figures, en.wikipedia:
       Skyflash 3.68 m x 0.203 m, span 1.02 m; ALARM 4.24 m x 0.23 m, span
       0.73 m; Brimstone 1.8 m x 0.18 m; Litening 2.2 m x 0.406 m; AIM-9 3.02 m
       x 0.127 m.

   Recognition list (each in the model, with the reference it rests on):
     1. tandem two-seat cockpit under one long canopy hinged at the rear,
        windscreen and one arch between the seats (A, C, F)  [glass, dark]
     2. pointed radome with the short nose pitot (A, C); the F.3's longer,
        slimmer radome (F, G)                                [radome]
     3. retractable refuelling probe, drawn stowed: the GR's fairing along the
        starboard canopy sill (C)
     4. the tall box intakes with the lip raked back at the bottom, standing
        off the fuselage, the lower trunk fairings under them (A, C)
     5. variable-sweep shoulder wing at 25 deg, as parked (A, C, F): small
        fixed glove, pivot, outer panel with 4.3 deg anhedral (A front view),
        swivelling inner and outer pylons (A)
     6. the big single fin, its flat-topped root fillet with a forward-facing
        opening (A, C), rudder, two fairings at the tip (A)
     7. all-moving tailerons, highly swept, with anhedral (A, B)
     8. the two RB199 nozzles side by side in their thrust-reverser shrouds,
        bucket seams above and below (A, B)
     9. tall gear: twin small nose wheels, single big main wheels on long
        legs, 5.95 m fin-tip height (A, C)
    10. stores by row: F.3 four semi-recessed Skyflash (G), AIM-9L on the
        pylon shoulder rails for the 1990s row (G); GR rows ALARM pair (D),
        GR4 tanks, outer pods, Paveway IV, Litening, Brimstone (B, C)
    11. paint: F.3 light grey (F), GR1 desert pink with black radome (E), GR4
        grey (C). No roundels, fin flashes, codes or squadron marks.
   Team colour exactly C.team, on two small strips on the upper outer wings.

   The sweep: drawn at 25 deg, the spread position a parked Tornado shows in C
   and F and that the published 13.91 m span refers to. A land-based swing-wing
   gets no "wingfold" group (ru_su24.js explains the house rule).

   NOT CONFIRMED (estimated from proportions or from photographs, not
   measured or published):
     - the F.3 stretch: G gives 1.36 m of fuselage and 18.68 m overall; the
       plug is put behind the rear cockpit (so the canopy, nose gear and
       intake lips move forward and the spine behind the canopy grows, as F
       shows), and the remaining 0.60 m goes into a longer radome. The
       split between the two, and where the plug sits, are not measured: the
       ADV three-view could not be fetched (HTTP 429).
     - the F.3 glove leading edge: G says only "greater sweep"; it is drawn at
       67 deg from the same outer kink.
     - the tandem places of the four Skyflash, how deeply they are recessed.
     - the F.3's nose pitot: F is cut off at the radome tip; the GR's short
       pitot (A, C) is drawn on it too, inside the published 18.68 m.
     - the F.3's port retractable probe is not drawn (no reference shows it).
     - the GR1's starboard probe fairing is taken from the GR4 (C); E shows
       only the port side.
     - store sizes not published: the wing tank (6.3 m x 0.80 m, scaled off B
       against the fuselage), Paveway IV (3.0 m x 0.28 m), the outer pods
       (3.4 m and 3.9 m x 0.38 m), the Brimstone launcher beam; which outer
       pod is on which wing (B does not show which side is which).
     - the GR4 FLIR fairing's exact size; the reverser bucket seam lines.
     - wing, glove, fin and taileron thicknesses.
   Not drawn: AMRAAM/ASRAAM (2000s refits, not these rows), the GR1's LRMTS
   chin fairing and the GR4's Sky Shadow details, the canopy interior.

   Materials: skin (painted canvas, projected top / port / starboard /
   belly), radome, dark, metal, glass, team, stores (grey), pale (white
   seeker heads), and in "gear": metal, tyres, dark, doors.
   Nodes: "gear" (the landing gear and its doors; hidden in flight).
   Model space: +X nose, +Y port, +Z up, metres; z = 0 is the fuselage datum
   of drawing A (its side-view line y = 450), tyres at z = -2.05 so the fin
   tip at 3.90 stands the published 5.95 m. The F.3 is shifted 0.98 m aft so
   that both airframes sit centred on x = 0.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTornado = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.05;                 /* tyre bottoms: 5.95 m under the fin tip (A, G) */
  var FIN_TOP = 3.90;

  /* ---- the rows. adv: the F.3 airframe; paint; stores; flir: GR4 fairing;
     probe: GR fairing on the starboard sill; guns: cannon ports */
  var VARIANTS = {
    gbr_e80_fighter: { adv: true,  paint: "f3",  fit: "skyflash",       flir: false, probe: false, guns: ["s"] },
    gbr_e90_fighter: { adv: true,  paint: "f3",  fit: "skyflash_aim9",  flir: false, probe: false, guns: ["s"] },
    gbr_e90_sead:    { adv: false, paint: "gr1", fit: "alarm",          flir: false, probe: true,  guns: ["p", "s"] },
    gbr_e00_cas:     { adv: false, paint: "gr4", fit: "cas",            flir: true,  probe: true,  guns: ["s"] },
    gbr_e00_sead:    { adv: false, paint: "gr4", fit: "alarm_gr4",      flir: true,  probe: true,  guns: ["s"] }
  };

  /* the F.3 stretch (G): everything ahead of the plug moves forward 1.36 m,
     and the radome grows 0.60 m (the split is NOT CONFIRMED) */
  var PLUG = 1.80, DX_ADV = 1.36, RADOME_ADV = 0.60;
  var ADV = false, XOFF = 0;
  function S(x) { return (ADV && x >= PLUG) ? x + DX_ADV : x; }

  /* ---- canvas layout for the projected skin */
  var PXM = 40, XMIN = -9.2, TW = 840;
  var PYM = 28, YMAX = 7.2;
  var TOPH = 404, SIDEH = 180, TH = TOPH + 2 * SIDEH + TOPH;
  var ZTOP = 4.1, ZSPAN = 6.4;

  /* the finishes, sampled off the photographs and taken to about 0.85 of
     their level for the renderer's ACES lift:
       f3   F (indoors): light grey #8b8f92 - #8f9499; radome the same grey
       gr1  E: desert pink #cebf9e in shade - #e7d9b9 lit; black radome #1c1e23
       gr4  C (overcast): grey #767674 - #8b8b88; radome the same */
  var PALS = {
    f3:  { top: "#8f9497", side: "#959a9d", belly: "#a2a6a8", radome: 0x868b8e },
    gr1: { top: "#b1a283", side: "#b6a788", belly: "#bbac8d", radome: 0x1f2124 },
    gr4: { top: "#6c7073", side: "#727679", belly: "#7b7f81", radome: 0x6f7376 }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PYM; }

  /* ------------------------------------------------------------ planform --
     All in the IDS frame of drawing A (x forward, y port), before S().
     Outer panel at 25 deg (A): leading edge 24.7 deg from x 0.48 at the
     hidden root (y 1.45) to the tip, trailing edge from x -1.97 to -3.39 at
     the tip (y 6.94); 4.3 deg anhedral off the front view (z 0.50 at the
     root, 0.09 at the tip). */
  var WR = 1.45, WT = 6.55, WTIP = 6.94;
  function wLE(y) { return 0.48 - (y - WR) * 0.46; }
  function wTE(y) { return -1.97 - (y - WR) * 0.258; }
  function wZ(y)  { return 0.50 - (y - WR) * 0.075; }
  function wT(y)  { return 0.20 - (y - WR) * 0.022; }
  function wPart(y, s, f0, f1, tk) {
    var le = wLE(y), te = wTE(y), c = le - te;
    return foil([le - c * f0, s * y, wZ(y)], [le - c * f1, s * y, wZ(y)], wT(y) * (tk || 1), [0, 0, 1]);
  }
  /* the glove (A): its leading edge from the intake box corner (1.10, 1.56)
     to the kink with the outer panel (0.05, 2.40), 51 deg; the F.3's at the
     greater sweep G mentions, drawn 67 deg (NOT CONFIRMED). Its aft edge runs
     round the pivot (-0.53, 1.51) from (-1.35, 1.25) to the kink. */
  function gloveLE(y) { return 0.05 + (2.40 - y) * (ADV ? 2.356 : 1.25); }

  /* tailerons (A): root at the fuselage side, leading edge 53 deg from
     (-3.05, 1.10) to (-6.22, 3.45), trailing edge -6.48 to -7.27, anhedral
     from z -0.03 to -0.22 (A front and side views) */
  function tPart(y, s, tk) {
    var f = (y - 1.10) / (3.45 - 1.10);
    var le = -3.05 - f * 3.17, te = -6.48 - f * 0.79, z = -0.03 - f * 0.19;
    return foil([le, s * y, z], [te, s * y, z], (0.22 - f * 0.16) * (tk || 1), [0, 0, 1]);
  }

  /* fin (A): leading edge from (-3.51, 1.68) at 56 deg from the vertical up to
     (-5.77, 3.21), rounding over to the top edge that rises aft to the
     trailing-edge tip (-8.37, 3.90); trailing edge from (-6.43, 0.70) */
  function finLE(z) { return -3.51 - (z - 1.68) * 1.48; }
  function finTE(z) { return -6.43 - (z - 0.70) * 0.606; }
  function finT(z)  { return 0.30 - (z - 0.70) / (FIN_TOP - 0.70) * 0.20; }
  function finPart(z, f0, f1) {
    var le = finLE(z), te = finTE(z), c = le - te;
    return foil([le - c * f0, 0, z], [le - c * f1, 0, z], finT(z), [0, 1, 0]);
  }

  /* ---- station tables, nose to tail, IDS frame. Side profile from A
     (x = 8.36 - (px - 431) / 31.5, z = (450 - py) / 31.5), half-widths from
     A's plan.
       x      top    bottom
      8.36   -0.49           pitot tip
      7.82   -0.47           radome tip
      6.20    0.21   -0.91   radome joint (vertical line in A)
      5.85    0.28   -0.92   windscreen base
      4.45    1.00           windscreen / canopy joint
      3.6-2.6 1.11           canopy roof
      1.85    1.02           canopy rear, into the spine
     -1.5     0.95   -0.87   spine; belly flat to -3.0
     -2.4/-3.3 1.59          flat top of the fin-root fillet
     -5.55    0.71   -0.37   tail end, reverser shrouds behind
     -8.37    3.90           fin-tip trailing edge                       */
  var NOSE_IDS = [[7.82, -0.47, 0.03, 0.03], [7.66, -0.46, 0.10, 0.08], [7.41, -0.44, 0.20, 0.19],
                  [7.15, -0.415, 0.30, 0.285], [6.90, -0.41, 0.40, 0.38], [6.65, -0.38, 0.49, 0.48],
                  [6.39, -0.365, 0.55, 0.525], [6.20, -0.35, 0.58, 0.56]];
  function noseSecs() {
    var out = [], i, k = ADV ? (1.62 + RADOME_ADV) / 1.62 : 1;
    for (i = 0; i < NOSE_IDS.length; i++) {
      var r = NOSE_IDS[i], x = 6.20 + (r[0] - 6.20) * k;
      /* the F.3's radome is slimmer over its length (F): the stretch lengthens
         it without widening it */
      out.push(ls(S(x), 0, r[1], r[2], r[3], 1));
    }
    return out;
  }
  var FUS_IDS = [[6.20, -0.35, 0.58, 0.56, 1.0], [5.85, -0.32, 0.63, 0.60, 0.9],
                 [5.30, -0.29, 0.69, 0.65, 0.8], [4.60, -0.25, 0.74, 0.68, 0.72],
                 [3.60, -0.19, 0.78, 0.73, 0.68], [2.60, -0.13, 0.82, 0.79, 0.65],
                 [2.10, 0.02, 0.84, 0.94, 0.62], [1.85, 0.05, 0.84, 0.97, 0.60],
                 [1.75, 0.05, 0.84, 0.97, 0.60], [1.00, 0.08, 0.86, 0.97, 0.55],
                 [-0.50, 0.06, 0.95, 0.93, 0.50], [-1.50, 0.04, 1.15, 0.91, 0.45],
                 [-2.50, 0.00, 1.22, 0.90, 0.45], [-3.30, -0.01, 1.22, 0.86, 0.45],
                 [-4.50, 0.08, 1.18, 0.70, 0.50], [-5.55, 0.17, 1.10, 0.54, 0.55]];
  /* the canopy, tandem seats under one long transparency (A, C) */
  var CAN_IDS = [[5.90, 0.27, 0.30, 0.02, 1.0], [5.55, 0.30, 0.52, 0.20, 0.85],
                 [5.00, 0.34, 0.60, 0.46, 0.80], [4.45, 0.38, 0.63, 0.62, 0.78],
                 [3.60, 0.40, 0.64, 0.71, 0.78], [2.60, 0.42, 0.63, 0.69, 0.78],
                 [2.10, 0.45, 0.58, 0.62, 0.80], [1.85, 0.50, 0.42, 0.52, 0.85]];
  function tab(t) {
    var out = [];
    for (var i = 0; i < t.length; i++) out.push(ls(S(t[i][0]), 0, t[i][1], t[i][2], t[i][3], t[i][4]));
    return out;
  }

  var _cv = {};
  function paint(per, adv) {
    var key = per + (adv ? "a" : "i");
    if (_cv[key]) return _cv[key];
    var P = PALS[per] || PALS.gr4;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 31337, i, b, x, y;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = P.side; g.fillRect(0, TOPH, TW, 2 * SIDEH);
    g.fillStyle = P.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    /* panel lines: fuselage frames */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [5.85, 4.45, 3.0, 1.75, 0.6, -0.5, -1.5, -2.6, -3.6, -4.6];
    for (b = 0; b < 4; b++) for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i] >= PLUG && adv ? FR[i] + DX_ADV : FR[i]);
      g.beginPath(); g.moveTo(x, bandY[b] + (b === 0 ? TOPH * 0.30 : 0));
      g.lineTo(x, bandY[b] + (b === 0 ? TOPH * 0.70 : bandH[b])); g.stroke();
    }
    if (adv) for (b = 0; b < 4; b++) {               /* the plug's joints */
      x = pxX(PLUG + DX_ADV * 0.5);
      g.beginPath(); g.moveTo(x, bandY[b] + (b === 0 ? TOPH * 0.35 : 0));
      g.lineTo(x, bandY[b] + (b === 0 ? TOPH * 0.65 : bandH[b])); g.stroke();
    }
    /* the wing's slats (13% chord) and full-span flaps (72%) in the top and
       belly bands, both wings; the spoilers ahead of the flaps (A) */
    g.strokeStyle = "rgba(0,0,0,0.20)";
    for (b = 0; b <= 3; b += 3) for (var sg = -1; sg <= 1; sg += 2) {
      var fr = [0.13, 0.72];
      for (var f = 0; f < fr.length; f++) {
        g.beginPath();
        for (y = 2.4; y <= WT; y += 0.5) {
          var xx = wLE(y) - (wLE(y) - wTE(y)) * fr[f];
          var Y = bandY[b] + clamp(pxY(sg * y), 2, TOPH - 2);
          if (y === 2.4) g.moveTo(pxX(xx), Y); else g.lineTo(pxX(xx), Y);
        }
        g.stroke();
      }
      for (y = 2.6; y < 4.6; y += 0.95)
        g.strokeRect(pxX(wLE(y) - (wLE(y) - wTE(y)) * 0.70), bandY[b] + pxY(sg * (y + 0.85)), 0.32 * PXM, 0.85 * PYM);
    }
    /* access panels on the sides */
    g.strokeStyle = "rgba(0,0,0,0.12)";
    for (b = 1; b <= 2; b++) for (i = 0; i < 16; i++) {
      x = pxX(5.6 - i * 0.7 + R() * 0.3 + (adv && 5.6 - i * 0.7 > PLUG ? DX_ADV : 0)); y = sideZ(0.1 - R() * 0.7, b);
      g.strokeRect(x, y, 0.40 * PXM + R() * 10, 0.28 * SIDEH / ZSPAN + R() * 4);
    }
    /* the rudder hinge and the dielectric strip at the fin's leading edge */
    g.strokeStyle = "rgba(0,0,0,0.25)";
    for (b = 1; b <= 2; b++) {
      g.beginPath(); g.moveTo(pxX(finLE(0.9) - (finLE(0.9) - finTE(0.9)) * 0.70), sideZ(0.9, b));
      g.lineTo(pxX(finLE(3.2) - (finLE(3.2) - finTE(3.2)) * 0.70), sideZ(3.2, b)); g.stroke();
    }
    /* soot round the tail and light weathering */
    var sx = pxX(-6.5), gr = g.createLinearGradient(sx, 0, pxX(-4.6), 0);
    gr.addColorStop(0, "rgba(22,18,14,0.40)"); gr.addColorStop(1, "rgba(22,18,14,0)");
    g.fillStyle = gr; g.fillRect(sx, TOPH, pxX(-4.6) - sx, TH - TOPH);
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 7);
    }
    _cv[key] = cv;
    return cv;
  }

  var _tex = {};
  function skinTexture(per, adv) {
    var key = per + (adv ? "a" : "i");
    if (_tex[key] !== undefined) return _tex[key];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(per, adv));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[key] = t;
    return t;
  }

  /* each face takes the band its normal looks into: top, port, starboard,
     belly. The UVs are taken BEFORE the F.3's centring shift. */
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

  function makeMats(C, per, adv) {
    var tex = skinTexture(per, adv), m = {}, P = PALS[per] || PALS.gr4;
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.10 });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.side);
    m.radome = new V.MeshStandardMaterial({ color: P.radome, roughness: 0.62, metalness: 0.08 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5f6467, roughness: 0.46, metalness: 0.62 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x34505a, roughness: 0.10, metalness: 0.30 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xddd8c8, roughness: 0.50, metalness: 0.05 });
    m.msl   = new V.MeshStandardMaterial({ color: 0x8e9396, roughness: 0.48, metalness: 0.35 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (ru_su24.js's kit) */
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
    if (XOFF) geo.translate(XOFF, 0, 0);
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

  /* ---- stores. Profiles nose first, [xFraction, radiusFraction] */
  var P_OGIVE = [[0.50, 0.04], [0.45, 0.55], [0.39, 0.88], [0.32, 1.0], [-0.46, 1.0], [-0.50, 0.80]];
  var P_BLUNT = [[0.50, 0.30], [0.485, 0.75], [0.46, 0.95], [0.43, 1.0], [-0.47, 1.0], [-0.50, 0.75]];
  var P_TANK  = [[0.50, 0.04], [0.42, 0.50], [0.30, 0.86], [0.15, 1.0], [-0.08, 1.0], [-0.30, 0.82], [-0.45, 0.42], [-0.50, 0.10]];
  var P_POD   = [[0.50, 0.20], [0.46, 0.80], [0.40, 1.0], [-0.42, 1.0], [-0.48, 0.80], [-0.50, 0.35]];

  /* Skyflash (G: 3.68 m, 0.203 m, span 1.02 m): mid-body wings and tail fins
     in line; semi-recessed, the centre a little below the belly */
  function skyflash(K, x, y, zc) {
    var len = 3.68, r = 0.1015;
    push(K.msl, revolve(P_OGIVE, len, r, x, y, zc, 16, 0, 0));
    fins(K.msl, x + 0.35, y, zc, 0.62, 0.28, 0.30, 0.51, PI / 4, 0.010, r * 0.9);
    fins(K.msl, x - len * 0.5 + 0.42, y, zc, 0.40, 0.20, 0.18, 0.40, PI / 4, 0.010, r * 0.9);
  }
  /* AIM-9L (G: 3.02 m x 0.127 m); canards and fin span estimated */
  function aim9(K, x, y, zc) {
    var len = 3.02, r = 0.0635;
    push(K.msl, revolve(P_OGIVE, len, r, x, y, zc, 12, 0, 0));
    push(K.pale, revolve([[0.50, 0.05], [0.47, 0.80], [0.45, 1.0], [0.42, 1.0]], len, r * 1.01, x, y, zc, 12, 0, 0));
    fins(K.msl, x + len * 0.5 - 0.40, y, zc, 0.16, 0.08, 0.06, 0.20, PI / 4, 0.006, r * 0.9);
    fins(K.msl, x - len * 0.5 + 0.30, y, zc, 0.30, 0.18, 0.12, 0.30, PI / 4, 0.006, r * 0.9);
  }
  /* ALARM (G: 4.24 m x 0.23 m, span 0.73 m): blunt cream radome, small wings
     at mid-body, tail fins (D) */
  function alarm(K, x, y, zc) {
    var len = 4.24, r = 0.115;
    push(K.msl, revolve(P_BLUNT, len, r, x, y, zc, 18, 0, 0));
    push(K.pale, revolve([[0.50, 0.30], [0.485, 0.75], [0.46, 0.95], [0.43, 1.0], [0.38, 1.0]], len, r * 1.01, x, y, zc, 18, 0, 0));
    fins(K.msl, x + 0.10, y, zc, 0.55, 0.25, 0.25, 0.365, PI / 4, 0.010, r * 0.9);
    fins(K.msl, x - len * 0.5 + 0.40, y, zc, 0.38, 0.20, 0.16, 0.33, PI / 4, 0.010, r * 0.9);
  }
  /* Brimstone (G: 1.8 m x 0.18 m), three on a launcher beam in a triangle (B, C) */
  function brimstoneRack(K, x, y, zTop) {
    var len = 1.8, r = 0.09, i;
    K.skin.push(box(2.40, 0.22, 0.16, x, y, zTop - 0.08));
    var P = [[0, zTop - 0.43], [0.20, zTop - 0.20], [-0.20, zTop - 0.20]];
    for (i = 0; i < 3; i++) {
      push(K.msl, revolve(P_BLUNT, len, r, x - 0.1, y + P[i][0], P[i][1], 12, 0, 0));
      push(K.pale, revolve([[0.50, 0.30], [0.47, 0.85], [0.44, 1.0], [0.40, 1.0]], len, r * 1.01, x - 0.1, y + P[i][0], P[i][1], 12, 0, 0));
      fins(K.msl, x - len * 0.5 + 0.18, y + P[i][0], P[i][1], 0.18, 0.12, 0.06, 0.15, PI / 4, 0.006, r * 0.8);
    }
  }
  /* Paveway IV (B): a slim bomb with a seeker nose and tail fins; its size is
     NOT CONFIRMED (3.0 m x 0.28 m) */
  function paveway4(K, x, y, zc) {
    var len = 3.0, r = 0.14;
    push(K.msl, revolve([[0.50, 0.25], [0.44, 0.45], [0.36, 0.55], [0.30, 0.90], [0.18, 1.0], [-0.20, 1.0], [-0.42, 0.62], [-0.50, 0.55]], len, r, x, y, zc, 14, 0, 0));
    fins(K.msl, x + len * 0.5 - 0.30, y, zc, 0.14, 0.10, 0.03, 0.12, PI / 4, 0.008, r * 0.4);
    fins(K.msl, x - len * 0.5 + 0.42, y, zc, 0.42, 0.24, 0.16, 0.30, PI / 4, 0.008, r * 0.5);
  }
  /* Litening (G: 2.2 m x 0.406 m): cylinder with a domed, windowed nose (B) */
  function litening(K, x, y, zc) {
    var len = 2.2, r = 0.203;
    push(K.msl, revolve([[0.50, 0.30], [0.47, 0.80], [0.42, 1.0], [-0.44, 1.0], [-0.50, 0.55]], len, r, x, y, zc, 18, 0, 0));
    K.dark.push(cyl(r * 0.85, r * 0.85, 0.06, 16, "x", x + len * 0.5 - 0.10, y, zc));
  }
  /* wing tank with its ventral fin (B, C); size NOT CONFIRMED */
  function tank(K, x, y, zc) {
    var len = 6.3, r = 0.40;
    push(K.skin, revolve(P_TANK, len, r, x, y, zc, 22, 0, 0));
    K.skin.push(solid([[x - 2.05, y - 0.02, zc - 0.20], [x - 2.95, y - 0.02, zc - 0.10], [x - 3.02, y - 0.02, zc - 0.55], [x - 2.55, y - 0.02, zc - 0.62]],
                      [[x - 2.05, y + 0.02, zc - 0.20], [x - 2.95, y + 0.02, zc - 0.10], [x - 3.02, y + 0.02, zc - 0.55], [x - 2.55, y + 0.02, zc - 0.62]]));
  }
  /* the two outer-pylon pods of B: one plain, one with small tail fins */
  function pod(K, x, y, zc, len, finned) {
    push(K.msl, revolve(P_POD, len, 0.19, x, y, zc, 16, 0, 0));
    if (finned) fins(K.msl, x - len * 0.5 + 0.40, y, zc, 0.36, 0.20, 0.12, 0.34, PI / 4, 0.010, 0.15);
  }

  function buildAirframe(THREE, C, vk) {
    V = THREE;
    var VT = VARIANTS[vk] || VARIANTS.gbr_e00_cas;
    ADV = !!VT.adv;
    XOFF = ADV ? -0.98 : 0;
    var T = makeMats(C, VT.paint, ADV);
    var g = new V.Group();
    g.name = "tornado";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], msl: [], radome: [] };
    var G = { metal: [], tyre: [], dark: [], skin: [] };
    var s, i, x, z, y;

    /* ---- radome, fuselage, canopy */
    var NOSE = noseSecs(), FUS = tab(FUS_IDS), CAN = tab(CAN_IDS);
    push(K.radome, loft(NOSE, 36, 0.02, null));
    push(K.skin, loft(FUS, 44, null, 0));
    push(K.glass, loft(CAN, 32, 0.02, 0));
    /* the nose pitot (A, C) - drawn on the GR airframe; the F.3's radome tip
       carries the same short probe in this model (F is cut off at the tip) */
    var tip = NOSE[0].x;
    K.metal.push(cyl(0.012, 0.035, 0.54, 8, "x", tip + 0.27, 0, -0.47));
    /* canopy frames: the windscreen arch, the arch between the seats, the
       sills (A, C, F) */
    arch(K.dark, CAN, S(4.45), 0.32, 0.030);
    arch(K.dark, CAN, S(3.10), 0.36, 0.026);
    arch(K.dark, CAN, S(1.95), 0.46, 0.030);
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([S(5.88), s * 0.20, 0.28], [S(4.45), s * 0.55, 0.78], 0.022, 6));
      K.dark.push(bar([S(4.45), s * 0.63, 0.40], [S(1.95), s * 0.58, 0.46], 0.022, 6));
    }
    /* the dorsal fillet at the fin root: flat top at z 1.59 from -2.4 to -3.3
       (A), its forward-facing opening (C) */
    var fillet = [ls(-1.60, 0, 0.95, 0.06, 0.03, 0.8), ls(-2.25, 0, 1.20, 0.17, 0.30, 0.6),
                  ls(-2.45, 0, 1.25, 0.19, 0.34, 0.6), ls(-3.30, 0, 1.24, 0.19, 0.35, 0.6),
                  ls(-4.20, 0, 1.10, 0.15, 0.30, 0.7)];
    push(K.skin, loft(fillet, 16, 0.02, 0.02));
    K.dark.push(cyl(0.10, 0.10, 0.03, 12, "x", -2.27, 0, 1.38));

    /* ---- the box intakes (A, C): the outer box from the fuselage side to
       y 1.56, z -0.27 to 0.69; the lip raked back from x 3.0 at the top to
       2.05 at the bottom; the lower trunk fairing under each (A front view) */
    for (s = -1; s <= 1; s += 2) {
      var yi = s * 0.84, yo = s * 1.56, zt = 0.69, zb = -0.27;
      var xT = S(3.00), xB = S(2.05), xR = S(1.85);
      /* the raked front of the box */
      K.skin.push(convex([
        [[xT, yi, zt], [xT, yo, zt], [xB, yo, zb], [xB, yi, zb]],
        [[xR, yi, zt], [xR, yo, zt], [xR, yo, zb], [xR, yi, zb]],
        [[xT, yi, zt], [xT, yo, zt], [xR, yo, zt], [xR, yi, zt]],
        [[xB, yi, zb], [xB, yo, zb], [xR, yo, zb], [xR, yi, zb]],
        [[xT, yi, zt], [xB, yi, zb], [xR, yi, zb], [xR, yi, zt]],
        [[xT, yo, zt], [xB, yo, zb], [xR, yo, zb], [xR, yo, zt]]]));
      /* the mouth: a dark panel just proud of the raked face, inside the lips */
      var m0 = 0.07, rk = (xT - xB) / (zt - zb);
      var mA = [xT - m0 * rk + 0.012, s * 0.92, zt - m0], mB = [xT - m0 * rk + 0.012, s * 1.48, zt - m0];
      var mC = [xB + m0 * rk + 0.012, s * 1.48, zb + m0], mD = [xB + m0 * rk + 0.012, s * 0.92, zb + m0];
      K.dark.push(solid([mA, mB, mC, mD], [[mA[0] - 0.02, mA[1], mA[2]], [mB[0] - 0.02, mB[1], mB[2]], [mC[0] - 0.02, mC[1], mC[2]], [mD[0] - 0.02, mD[1], mD[2]]]));
      /* the splitter gap between the box and the fuselage */
      K.dark.push(box(0.9, 0.04, 0.80, xT - 0.55, s * 0.86, 0.20));
      /* the box behind the lip, back to the glove */
      push(K.skin, loft([ls(xR, s * 1.20, 0.21, 0.36, 0.48, 0.18), ls(S(1.75), s * 1.20, 0.21, 0.36, 0.48, 0.18),
                         ls(0.40, s * 1.20, 0.21, 0.36, 0.48, 0.20), ls(-1.20, s * 1.12, 0.15, 0.20, 0.40, 0.40)], 24, null, 0.05));
      /* lower trunk fairing (main gear bay) */
      push(K.skin, loft([ls(S(2.20), s * 1.12, -0.30, 0.10, 0.05, 0.6), ls(S(1.90), s * 1.12, -0.52, 0.19, 0.30, 0.5),
                         ls(S(1.75), s * 1.12, -0.53, 0.19, 0.31, 0.5), ls(-0.40, s * 1.14, -0.55, 0.19, 0.32, 0.5),
                         ls(-1.80, s * 1.16, -0.50, 0.15, 0.30, 0.6)], 18, 0.02, 0.05));
    }

    /* ---- the glove, the outer wing at 25 deg, the pivot fairing */
    for (s = -1; s <= 1; s += 2) {
      var gr0 = [gloveLE(1.25), s * 1.25, 0.53], gt0 = [-1.35, s * 1.25, 0.53];
      var gr1 = [gloveLE(2.38), s * 2.38, 0.47], gt1 = [-0.05, s * 2.38, 0.47];
      K.skin.push(solid(foil(gr0, gt0, 0.30, [0, 0, 1]), foil(gr1, gt1, 0.12, [0, 0, 1])));
      if (ADV) {
        /* the F.3's longer glove runs forward along the intake box top */
        var ga = [gloveLE(1.56), s * 1.56, 0.62];
        K.skin.push(solid(foil([gloveLE(1.25) + 0.05, s * 1.25, 0.62], [0.9, s * 1.25, 0.62], 0.12, [0, 0, 1]),
                          foil(ga, [ga[0] - 0.25, s * 1.56, 0.62], 0.04, [0, 0, 1])));
      }
      /* outer panel: main box, slats, flaps (A) */
      K.skin.push(solid(wPart(WR, s, 0, 0.13, 0.85), wPart(WT, s, 0, 0.13, 0.85)));
      K.skin.push(solid(wPart(WR, s, 0.14, 0.72), wPart(WT, s, 0.14, 0.72)));
      K.skin.push(solid(wPart(WR + 0.30, s, 0.725, 1.0, 0.85), wPart(4.2, s, 0.725, 1.0, 0.85)));
      K.skin.push(solid(wPart(4.22, s, 0.725, 1.0, 0.85), wPart(WT, s, 0.725, 1.0, 0.85)));
      /* the rounded tip */
      K.skin.push(solid(wPart(WT, s, 0, 1),
                        foil([wLE(WTIP) - 0.55, s * WTIP, wZ(WTIP)], [wTE(WTIP) + 0.03, s * WTIP, wZ(WTIP)], 0.03, [0, 0, 1])));
      /* team strips on the upper outer wings */
      var tb = function (yy) {
        var le = wLE(yy), te = wTE(yy), zz = wZ(yy), h = wT(yy) * 0.47 + 0.012;
        return blk([le, s * yy, zz], [te, s * yy, zz], 0.30, 0.66, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(5.30), tb(5.85)));
      /* the pivot under the glove (A: y 1.51, x -0.53) */
      K.metal.push(cyl(0.14, 0.14, 0.08, 14, "z", -0.53, s * 1.51, 0.33));
    }

    /* ---- tailerons (A, B) with their pivots */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(tPart(1.10, s), tPart(3.45, s)));
      K.metal.push(cyl(0.13, 0.13, 0.10, 12, "y", -4.70, s * 1.16, -0.03));
    }

    /* ---- fin with rudder, the two tip fairings (A) */
    K.skin.push(solid(foil([-3.30, 0, 0.70], [finTE(0.70), 0, 0.70], finT(0.70), [0, 1, 0]), finPart(1.68, 0, 1)));
    K.skin.push(solid(finPart(1.68, 0, 0.70), finPart(3.21, 0, 0.70)));
    K.skin.push(solid(finPart(1.68, 0.71, 1.0), finPart(3.21, 0.71, 1.0)));
    K.skin.push(solid(finPart(3.21, 0, 1.0),
                      foil([-6.30, 0, 3.66], [-8.37, 0, FIN_TOP], 0.10, [0, 1, 0])));
    push(K.skin, revolve(P_POD, 0.62, 0.075, -5.96, 0, 3.36, 10, 0, 0));
    push(K.skin, revolve(P_POD, 0.70, 0.075, -7.86, 0, 3.32, 10, 0, 0));

    /* ---- the tail: the RB199 nozzles in their reverser shrouds (A, B):
       nozzle centres y 0.60, z 0.22; shroud from -5.55 to -6.35, the
       buckets' seams along the top and bottom; nozzle lip to -6.45 */
    for (s = -1; s <= 1; s += 2) {
      push(K.skin, loft([ls(-5.40, s * 0.60, 0.22, 0.48, 0.48, 0.9), ls(-6.00, s * 0.60, 0.22, 0.48, 0.48, 0.9),
                         ls(-6.35, s * 0.60, 0.22, 0.44, 0.44, 0.95)], 24, null, null));
      K.dark.push(box(0.80, 0.03, 0.03, -5.95, s * 0.60, 0.71));
      K.dark.push(box(0.80, 0.03, 0.03, -5.95, s * 0.60, -0.27));
      K.dark.push(box(0.80, 0.03, 0.03, -5.95, s * 1.085, 0.22));
      push(K.metal, loft([ls(-6.30, s * 0.60, 0.22, 0.40, 0.40), ls(-6.45, s * 0.60, 0.22, 0.37, 0.37)], 24, null, null));
      K.dark.push(aftDisc(0.40, 22, -6.31, s * 0.60, 0.22));
      K.metal.push(aftDisc(0.18, 14, -6.33, s * 0.60, 0.22));
    }
    /* the fairing between the two shrouds under the fin */
    K.skin.push(box(0.85, 0.30, 0.60, -5.95, 0, 0.40));

    /* ---- details on the forward fuselage */
    var gs;
    for (gs = 0; gs < VT.guns.length; gs++) {            /* cannon ports (E, F, G) */
      s = VT.guns[gs] === "p" ? 1 : -1;
      K.dark.push(box(0.55, 0.05, 0.10, S(5.05), s * 0.72, -0.62));
    }
    if (VT.probe) {
      /* the GR's refuelling probe, stowed in its fairing along the starboard
         canopy sill (C) */
      push(K.skin, loft([ls(5.75, -0.70, 0.30, 0.03, 0.03), ls(5.45, -0.72, 0.30, 0.10, 0.09), ls(4.00, -0.73, 0.32, 0.12, 0.10),
                         ls(3.00, -0.73, 0.35, 0.11, 0.09), ls(2.55, -0.72, 0.37, 0.04, 0.03)], 12, 0.02, 0.02));
    }
    if (VT.flir) {
      /* the GR4's FLIR fairing under the starboard nose, window forward (C);
         its size is estimated */
      push(K.skin, loft([ls(5.80, -0.42, -0.86, 0.06, 0.04), ls(5.60, -0.42, -0.91, 0.15, 0.10),
                         ls(5.00, -0.42, -0.91, 0.15, 0.10), ls(4.70, -0.42, -0.88, 0.06, 0.04)], 12, 0.02, 0.02));
      K.dark.push(box(0.03, 0.18, 0.09, 5.61, -0.42, -0.95));
    }
    /* aerials on the spine and under the belly */
    K.skin.push(box(0.30, 0.03, 0.20, -0.40, 0, 1.06));
    K.skin.push(box(0.26, 0.03, 0.16, S(2.4), 0, -1.00));

    /* ---- pylons and stores. Wing pylons swivel with the wing (A: y 3.22
       and 5.63); fuselage shoulder stations at y +-0.55 (B, C, D). */
    var fit = VT.fit, yIn = 3.22, yOut = 5.63;
    var pz = function (yy) { return wZ(yy) - wT(yy) * 0.30; };
    var wmid = function (yy) { return (wLE(yy) + wTE(yy)) / 2; };
    for (s = -1; s <= 1; s += 2) {
      pylon(K.skin, wmid(yIn) + 0.85, wmid(yIn) - 0.85, s * yIn, pz(yIn) + 0.02, pz(yIn) - 0.36, 0.14);
      if (!ADV) pylon(K.skin, wmid(yOut) + 0.70, wmid(yOut) - 0.70, s * yOut, pz(yOut) + 0.02, pz(yOut) - 0.30, 0.12);
    }
    var belly = -0.92;
    if (fit === "skyflash" || fit === "skyflash_aim9") {
      /* four Skyflash semi-recessed in two tandem pairs (G); places estimated */
      for (s = -1; s <= 1; s += 2) {
        skyflash(K, S(2.10) + 0.10, s * 0.50, belly - 0.02);
        skyflash(K, -1.10, s * 0.50, belly + 0.02);
        K.dark.push(box(3.6, 0.26, 0.02, S(2.10) + 0.10, s * 0.50, belly + 0.005));
      }
      if (fit === "skyflash_aim9") for (s = -1; s <= 1; s += 2) {
        /* AIM-9L on the shoulder rails either side of the inner pylon (G) */
        var zr = pz(yIn) - 0.30;
        for (i = -1; i <= 1; i += 2) {
          K.metal.push(box(1.6, 0.05, 0.05, wmid(yIn) + 0.1, s * yIn + i * 0.11, zr));
          aim9(K, wmid(yIn) + 0.4, s * yIn + i * 0.20, zr - 0.07);
        }
      }
    } else {
      for (s = -1; s <= 1; s += 2) {               /* shoulder pylons */
        pylon(K.skin, 2.40, 0.40, s * 0.55, belly + 0.03, belly - 0.14, 0.12);
        pylon(K.skin, -0.40, -2.40, s * 0.55, belly + 0.03, belly - 0.14, 0.12);
      }
      var zs = belly - 0.14;
      if (fit === "alarm" || fit === "alarm_gr4") {
        /* two ALARM side by side under the fuselage (D) */
        for (s = -1; s <= 1; s += 2) alarm(K, 0.70, s * 0.55, zs - 0.125);
      }
      if (fit === "cas") {
        /* B, C: Paveway IV pair in tandem on the port shoulder station,
           Litening ahead of a triple Brimstone launcher on the starboard */
        paveway4(K, 1.45, 0.55, zs - 0.15);
        paveway4(K, -1.55, 0.55, zs - 0.15);
        litening(K, 1.45, -0.55, zs - 0.21);
        brimstoneRack(K, -1.40, -0.55, zs);
      }
      if (fit === "cas" || fit === "alarm_gr4") {
        /* GR4: the big wing tanks on the inner pylons, the two outer pods (B, C) */
        for (s = -1; s <= 1; s += 2) tank(K, wmid(yIn) + 0.30, s * yIn, pz(yIn) - 0.36 - 0.40);
        pod(K, wmid(yOut) + 0.20, yOut, pz(yOut) - 0.30 - 0.19, 3.40, false);
        pod(K, wmid(yOut) + 0.20, -yOut, pz(yOut) - 0.30 - 0.19, 3.90, true);
      }
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.msl, T.msl, "stores");
    mesh(g, K.pale, T.pale, "seekers");

    /* ---- landing gear (A, C): nose twins 0.49 m at x 4.04 (S), mains
       0.78 m x 0.30 m at x -1.23, y +-1.52; the group is named "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = S(4.04), nr = 0.245, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.25, 0, belly + 0.05], [nx + 0.02, 0, nz + 0.08], 0.065, 10));
    G.metal.push(cyl(0.04, 0.04, 0.42, 8, "y", nx, 0, nz));
    G.metal.push(bar([nx - 0.60, 0, belly + 0.05], [nx + 0.05, 0, nz + 0.55], 0.032, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.16, 20, "y", nx, s * 0.17, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.17, 12, "y", nx, s * 0.17, nz));
      G.skin.push(box(1.10, 0.02, 0.36, nx + 0.20, s * 0.30, belly - 0.16));       /* bay doors */
    }
    var mx = -1.23, mr = 0.39, mz = GROUND + mr, my = 1.52;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.35, s * 1.22, -0.70], [mx + 0.02, s * 1.30, mz + 0.05], 0.085, 10));   /* leg */
      G.metal.push(bar([mx + 1.30, s * 1.18, -0.75], [mx + 0.10, s * 1.29, mz + 0.62], 0.040, 6));   /* drag brace */
      G.metal.push(cyl(0.06, 0.06, 0.30, 8, "y", mx, s * 1.40, mz));                              /* axle */
      G.tyre.push(cyl(mr, mr, 0.30, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.31, 14, "y", mx, s * my, mz));
      G.skin.push(box(1.60, 0.025, 0.50, mx + 0.75, s * 1.33, -1.00));              /* main bay door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(gr, G.skin, T.skin, "gear_doors", true);
    return g;
  }

  return { VARIANTS: VARIANTS, build: function (THREE, M, C, vk) { return buildAirframe(THREE, C, vk); } };
})();

/* len is the measured x extent: nose pitot to the fin-tip trailing edge */
UNIT_MODELS["gbr_e80_fighter"] = { len: 18.68, build: function (THREE, M, C) { return HeroTornado.build(THREE, M, C, "gbr_e80_fighter"); } };
UNIT_MODELS["gbr_e90_fighter"] = { len: 18.68, build: function (THREE, M, C) { return HeroTornado.build(THREE, M, C, "gbr_e90_fighter"); } };
UNIT_MODELS["gbr_e90_sead"]    = { len: 16.72, build: function (THREE, M, C) { return HeroTornado.build(THREE, M, C, "gbr_e90_sead"); } };
UNIT_MODELS["gbr_e00_cas"]     = { len: 16.72, build: function (THREE, M, C) { return HeroTornado.build(THREE, M, C, "gbr_e00_cas"); } };
UNIT_MODELS["gbr_e00_sead"]    = { len: 16.72, build: function (THREE, M, C) { return HeroTornado.build(THREE, M, C, "gbr_e00_sead"); } };
