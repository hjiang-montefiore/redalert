/* ======= pact_hind_mi24.js - HERO model: Mil Mi-24D (Hind-D) and Mi-24V (Hind-E) =======
   Six gunship keys that rotor_specs.js drew with one parametric row of
   2,432 triangles and 52 draw calls: a tube with generic canopies, no
   undercarriage, and the same machine for the D and the V.
     pact_e60_gunship   "Mil Mi-24A / Mi-24D Hind", e60. Built as the Mi-24D,
                        the def's second name: the A's glasshouse cockpit
                        is not drawn.                              -> HeroMi24.d
     pact_e80_gunship   "Mil Mi-24V Hind-E", e80.                  -> HeroMi24.v
     helo_k, kpa_e80_gunship, kpa_e90_gunship, kpa_e00_gunship
                        "Mi-24D" in every row: the D of the 1980s on, with
                        no national marking, because no photograph of a
                        KPA Mi-24 is known (see THE KPA ROWS).    -> HeroMi24.dk

   References, and what each gave:
     ru.wikipedia "Mi-24" (its figures cite the Mi-24V (Mi-24D) technical
       description, Mashinostroenie 1982): length over the swept rotor
       tips 21.35 m; height to the top of the main rotor column 4.73 m
       at 11.5 t; span 6.66 m; ground clearance 0.28 m; track 3.03 m;
       wheelbase 4.39 m; parking attitude +3 deg 32 nose up; tail boom
       4.49 m; the fin boom's inclined part at 42 deg 30; wing incidence
       19 deg, anhedral 12 deg, leading edge swept 8 deg 50, NACA-230 at
       20 %, vertical pylons on the tips; main rotor 17.3 m with a hub
       1,744 mm across, the shaft set 4 deg 30 forward and 2 deg 30 to
       the right; tail rotor 3.91 m, three blades, LEFT of the fin; main
       wheels 720 x 320 mm, a pair of nose wheels, a fixed tail bumper;
       the guidance sight's fairing low on the RIGHT of the nose; the
       pilot's door on the right, the operator's glazed hatch top left;
       troop doors in upper and lower halves, two windows in each upper
       half; and that the dust filters (PZU), flare dispensers, IR jammer
       and exhaust screens (EVU) came with the Afghan war.
     Vertical Flight Society, Vertipedia "Mil Mi-24": five all-metal blades
       of 0.580 m chord turning clockwise; three-blade tail rotor, a
       tractor, "top blade aft"; airframe 17.50 m, wheelbase 4.39 m, track
       3.03 m.
     en.wikipedia "Mil Mi-24", after Gordon and Komissarov, "Mil Mi-24
       Hind Attack Helicopter" (Airlife 2001): the tail rotor moved from
       the right to the left of the tail and reversed, so that it "rotated
       up on the side towards the front of the aircraft"; and that in
       Afghanistan "dusty conditions led to the development of the twin
       PZU air intake filters".
     Czech Ministry of Defence, "Mil Mi-24 - NATO code: HIND": fuselage
       17.51 m, wing span 6.536 m, tail rotor 3.908 m; the D's turret with
       the four-barrel 9A624 (YakB-12.7), UB-32 pods, two 9M17P Falanga at
       each wing tip; the V's two 9M114 Shturm containers at each tip and
       B-8V pods.
     Photographs on Wikimedia Commons: Mi-24V "70 red" (7902809552), all
       but square to its port side; Czech Mi-24V 7353 ("Mi24V Czech.jpg",
       starboard; "Mi-24V HIND, front view.JPG"); Czech 0710 and 0835 (the
       nose kit from the port bow); Monino Mi-24V "44 white" and Mi-24A "50 red"
       ("Mil Mi-24A Hind-B at Central Air Force Museum pic1.JPG"); a Polish
       Mi-24D head on (7964797964); the Cold War Air Museum's Mi-24Ds 118
       and 120 (the nose, the probe, the sight, the "USPU-24" stencil) and
       the ex-NVA Mi-24D at Gatow ("L04 679"); a Soviet Mi-24D in 1991 and
       Russian Mi-24Vs of 1992 and 1993 in Germany (Andre Gerwing
       collection 012164, 022615, 028884); a US DoD photograph of a Mi-24V
       in flight, 1983 ("Mi-24V Soviet1.jpg"); the DoD close-up of the left
       winglet of an Iraqi Mi-24D abandoned in 1991 (DPLA 05180e3b...: the
       Falanga riding on its rail beside the endplate's foot); and the US
       Army recognition three-view ("Mil Mi-24 HIND.svg"), whose spans are
       drawn about a quarter too wide, used only for the tailplane's span
       against the wing's and the lower side fairings' place in the front
       view. The probe, the pylons, the endplates' feet and the side
       fairings were checked by laying the model over "70 red" through a
       pinhole camera fitted to its wheels, hubs and tail rotor.

   Stations, from the nose (model x is 5.80 m minus the station). The
   rotors set them: 21.35 m over both turning discs, a 17.30 m main
   disc leaning 4.5 deg and a 3.908 m tail disc put the tail rotor hub
   10.77 m behind the main hub. A one-dimensional perspective fit of
   the "70 red" and 7353 side views, on the 4.39 m wheelbase and that
   10.77 m, put the nose wheels 3.0 to 3.2 m ahead of the main hub and
   the main wheels 1.2 to 1.4 m behind it, and the hub 5.3 to 5.9 m
   behind the nose; the three-view says 6.1. The hub is at 5.80 m, the
   nose wheels 2.71, the main wheels 7.10, the tail rotor hub 16.57 and
   the fin's top trailing corner 17.51, the fuselage length. Heights
   are from the same fit, the head-on photograph and the 4.73 m column:
   blade plane 4.25 m, cowl 3.66 m, cabin roof 2.62 m, belly 0.77 m; the
   tail rotor hub 3.52 m, which with its 1.954 m blades gives the
   published 5.47 m overall height with the rotors turning. The model was laid over the "70 red"
   photograph through the fit to check every outline.

   Not drawn, and why:
     - the parking attitude. The real Mi-24 sits 3.5 deg nose up on its
       gear; here the datum is level and both wheel sets stand on one
       plane, because the renderer draws a parked aircraft level on its
       lowest point. Nor the shaft's 2.5 deg lean to the right.
     - the exhaust screens (EVU), the L-166V jammer and the ASO-2V flare
       racks: Afghan-theatre kit, and none of the period photographs
       above, the Soviet D of 1991, the Vs of 1983, 1992 and 1993, shows
       them.
     - the dust filters on the e60 D: it is the D as built in 1973-77
       (ru.wikipedia), before the Afghan war brought the PZU, with the
       plain drum intakes the Monino Mi-24A "50 red" still shows. Every
       later photograph wears them - the Vs of 1983, 1992 and 1993, the
       NVA D at Gatow, the CWAM Ds, the Polish D - so the V and the KPA
       Ds of e80 on have them.

   THE KPA ROWS. Every KPA gunship row names the Mi-24D, but no
   photograph of a North Korean Mi-24 is known: Commons has none, and
   Mitzer and Oliemans ("The Armed Forces of North Korea", Helion 2020,
   pp. 99-100, cited by en.wikipedia "Mil Mi-24", which lists North Korea
   only as a possible operator) trace the claim to an error by the US
   Congressional Research Service. So the KPA rows get the Mi-24D as the
   photographs show it from the 1980s on, the rows' periods: the PZU on
   the intakes and the finish of the Soviet D of 1991, with no national
   marking, because none can be drawn from evidence. Reported, not
   changed.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   under the mast, 2.00 m above the wheel contact plane. render3d.js
   stands the model up and rescales it by the measured X extent: the
   main disc 8.62 m ahead of the hub to the tip of the tail rotor blade
   built pointing straight aft, 21.35 m, the published length with the
   rotors turning. Blade phase never sets it: the disc, not a blade, is
   the front of the box, and the tail blade is built where its tip
   reaches furthest aft.

   NAMED NODES, and why each mount is built the way it is:
     rotor      the Mi-28N mount: -PI/2 about X inside a group that leans
                the shaft 4.5 deg forward, so the axis render3d.js turns
                the head about points down the shaft and the head turns
                clockwise from above, as every Mil rotor does
                (tools/jsc/rotor_axes_check.js).
     rotordisc  inside the main rotor, on its own transparent,
                depthWrite:false material, which the renderer fades with
                rpm. The tail rotor has none, as the Mi-28N's and AH-64E's
                have none: three draws a FrontSide material's BACK faces in
                the shadow pass, so an upright disc would lay a solid 3.9 m
                ellipse of shadow whenever the sun was on its far side.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X) on the left
                of the fin: the renderer's turn is then top blade aft,
                clockwise seen from the left, which is Gordon and
                Komissarov's "up on the side towards the front" and
                Vertipedia's "top blade aft". One blade points straight
                aft as built.
     gear       the retractable tricycle undercarriage, struts and tyres:
                the renderer hides it above 18 m, and parked it is the
                lowest thing drawn, so the wheels stand on the ground,
                pad or deck (tools/jsc/parked3d_check.js).
   The chin gun is not named "turret": these defs have no def.turret, so
   the renderer would slew it by whatever heading the machine had turned
   through (as hero/pact_e20_gunship_mi28n.js).

   Materials, nine: SKIN (one procedural CanvasTexture per scheme), METAL
   and DARK fittings, RUBBER, the BLADE metal, a STORES olive, GLASS, the
   TEAM flash (exactly C.team, emissive, as the other heroes) and the
   DISC. Fourteen draw calls. The skin UVs are projected from model space
   by face normal into top, port, starboard and belly bands of one sheet,
   as the Mi-28N and AH-64E do; the pylons, the lower side fairings, the
   sight fairing and the antenna pod take the pale band all over, and the
   endplates are camouflaged to their feet (projUV). The schemes follow the photographs (see
   SCHEMES): the e60 D in the 1970s two greens over light blue (Monino
   Mi-24A "50 red"), the KPA D in khaki-sand and olive-brown over pale
   blue-grey (the Soviet D of 1991), the V in sand, green and brown over
   pale blue ("70 red", "44 white"); the red star on the rear fuselage
   aft of the wing, both sides ("50 red", "70 red", "44 white").
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMi24 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* x is measured from the main rotor hub, forward positive; heights are
     above the wheel contact plane. Every number two parts must agree on
     lives here. */
  var GROUND   = -2.00;
  function Z(h) { return GROUND + h; }
  var X_NOSE   =  5.80;                    /* nose 5.80 m ahead of the hub */
  var HUB_H    =  4.25;                    /* blade plane above ground     */
  var ROTOR_R  =  8.65;                    /* 17.30 m, five blades         */
  var CHORD    =  0.58;
  var MAST_TILT = 4.5 * D2R;               /* shaft leans 4 deg 30 forward */
  var TR_R     =  1.954;                   /* 3.908 m, three blades        */
  var TR_CHORD =  0.25;
  var TR_X = -10.77, TR_Y = 0.42, TR_H = 3.52;
  var X_TAIL   = -11.71;                   /* fin tip trailing edge: 17.51 m */
  /* stub wing: root at the fuselage side, 12 deg anhedral, 19 deg incidence */
  var WR_Y = 0.78, WT_Y = 3.25, WR_C = 1.60, WT_C = 1.15;
  var WR_XLE = -0.45, W_SWEEP = 8.83 * D2R, W_ANH = 12 * D2R, W_INC = 19 * D2R;
  var WR_H = 2.15;                         /* quarter-chord height at the root */
  var PYL_IN = 1.77, PYL_OUT = 2.30;
  /* undercarriage: 4.39 m wheelbase, 3.03 m track */
  var NW_X = 3.09, NW_R = 0.24, NW_W = 0.18, NW_Y = 0.155;
  var MW_X = -1.30, MW_Y = 1.515, MW_R = 0.36, MW_W = 0.32;

  function wingLE(y) { return WR_XLE - (y - WR_Y) * Math.tan(W_SWEEP); }
  function wingC(y)  { return WR_C + (WT_C - WR_C) * (y - WR_Y) / (WT_Y - WR_Y); }
  function wingH(y)  { return WR_H - (y - WR_Y) * Math.tan(W_ANH); }   /* quarter chord */
  function wingT(y)  { return 0.20 * wingC(y); }

  var VARIANTS = {
    /* Mi-24D as built in 1973-77: plain intakes, Falanga, UB-32A, the
       1970s two greens, Soviet stars */
    d:  { key: "d",  v: false, pzu: false, stars: true,  scheme: "d70" },
    /* Mi-24V of the 1980s: PZU dust filters, Shturm tubes, B-8V20, stars */
    v:  { key: "v",  v: true,  pzu: true,  stars: true,  scheme: "v" },
    /* the KPA rows: the Mi-24D of the 1980s on, with the PZU, in the late
       Soviet D's finish and no national marking (see THE KPA ROWS) */
    dk: { key: "dk", v: false, pzu: true,  stars: false, scheme: "d80" }
  };

  /* =================================================== the painted skin === */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -12.2, UX1 = 6.8;
  var QY = 3.7;
  var QZ0 = Z(0.25), QZ1 = Z(4.05);
  var SX = TW / (UX1 - UX0);
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  /* Each a shade darker than the sunlit paint in the photographs, as the
     other heroes' are, because the ACES pass lifts the mid tones:
       d70  grey-green broken with dark green over a light blue underside,
            the 1970s scheme the Monino Mi-24A "50 red" wears
       d80  khaki-sand broken with olive-brown over pale blue-grey, the
            Soviet Mi-24D of 1991 (Gerwing 012164)
       v    sand broken with green and brown over pale blue, "70 red" and
            "44 white" */
  var SCHEMES = {
    d70: { base: "#6d7559", camo: ["#3f4a31"], share: 0.46, belly: "#6f9cb4", seed: 2470 },
    d80: { base: "#8a7a57", camo: ["#5d5440"], share: 0.46, belly: "#7d97a3", seed: 2473 },
    v:   { base: "#8c7b58", camo: ["#4b5734", "#5c4934"], share: 0.52, belly: "#7b96a3", seed: 2476 }
  };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function blob(g, cx, cy, rx, ry, rot, R) {
    var n = 14, i, a, k, pts = [];
    for (i = 0; i < n; i++) {
      a = i / n * PI * 2;
      k = 0.70 + R() * 0.50;
      pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
    }
    var c = Math.cos(rot), s = Math.sin(rot);
    g.beginPath();
    for (i = 0; i < n; i++) {
      var x = cx + pts[i][0] * c - pts[i][1] * s, y = cy + pts[i][0] * s + pts[i][1] * c;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
    g.fill();
  }
  /* the Soviet star: red, a white border and a thin red edge */
  function star(g, cx, cy, rx, ry) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#a8261f"; path(1.24); g.fill();
    g.fillStyle = "#e2e0d8"; path(1.12); g.fill();
    g.fillStyle = "#b22a22"; path(1.0); g.fill();
  }
  /* the pale underside comes up the sides to this height (model z) */
  function demZ(x) {
    if (x > -1.6) return Z(1.08);
    if (x > -4.6) return Z(1.08 + (-1.6 - x) / 3.0 * 0.90);
    return Z(1.98 + (-4.6 - x) / 5.0 * 0.20);
  }

  function skinCanvas(VR) {
    var S = SCHEMES[VR.scheme];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(S.seed);
    var i, b, x, y;
    var SZ = BAND / (QZ1 - QZ0), SQ = BAND / (2 * QY);

    g.fillStyle = S.base; g.fillRect(0, 0, TW, 3 * BAND);
    for (b = 0; b < 3; b++) {
      g.save();
      g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
      var area = (UX1 - UX0) * (b === 0 ? 2 * QY : QZ1 - QZ0);
      var n = Math.round(-Math.log(1 - S.share) * area / 1.6);
      for (i = 0; i < n; i++) {
        var r = 0.55 + R() * 0.75;
        x = UX0 + R() * (UX1 - UX0);
        var cy = b === 0 ? b * BAND + R() * BAND : pySide(QZ0 + R() * (QZ1 - QZ0), b);
        g.fillStyle = S.camo[i % S.camo.length];
        blob(g, pxX(x), cy, r * 1.5 * SX, r * (b === 0 ? SQ : SZ), (R() - 0.5) * 1.1, R);
      }
      g.restore();
    }
    /* the pale underside up the lower sides */
    for (b = 1; b <= 2; b++) {
      g.fillStyle = S.belly;
      g.beginPath();
      g.moveTo(0, (b + 1) * BAND);
      for (x = UX0; x <= UX1 + 0.01; x += 0.25) g.lineTo(pxX(x), pySide(demZ(x), b));
      g.lineTo(TW, (b + 1) * BAND);
      g.closePath(); g.fill();
    }
    g.fillStyle = S.belly; g.fillRect(0, 3 * BAND, TW, BAND);
    /* sun on top, grime down the sides and under */
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 170; i++) {
      g.fillStyle = "rgba(24,22,18," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 40);
    }
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }
    /* exhaust soot: the TV3-117s blow out of each side of the cowl just
       ahead of the mast, and the stain runs aft along the cowl and boom */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(pxX(0.4), 0, pxX(-5.0), 0);
      sg.addColorStop(0, "rgba(20,18,15,0.50)");
      sg.addColorStop(1, "rgba(20,18,15,0)");
      g.fillStyle = sg;
      g.fillRect(pxX(-5.0), pySide(Z(3.45), b), pxX(0.4) - pxX(-5.0), pySide(Z(2.55), b) - pySide(Z(3.45), b));
    }
    var tg = g.createLinearGradient(pxX(0.4), 0, pxX(-5.0), 0);
    tg.addColorStop(0, "rgba(20,18,15,0.35)"); tg.addColorStop(1, "rgba(20,18,15,0)");
    g.fillStyle = tg;
    g.fillRect(pxX(-5.0), pyTop(0.75), pxX(0.4) - pxX(-5.0), pyTop(-0.75) - pyTop(0.75));

    /* panel seams: frames across the airframe */
    var frames = [5.30, 4.90, 4.38, 3.70, 2.98, 2.62, 1.84, 1.10, 0.20, -0.62, -1.40, -2.20,
                  -3.00, -3.80, -4.60, -5.50, -6.40, -7.30, -8.20, -9.00];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.3;
    [1.10, 1.62, 2.10, 2.60, 3.00].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(-4.6), yy); g.lineTo(pxX(5.4), yy); g.stroke();
      }
    });
    g.lineWidth = 1.2;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = R() * 3 * BAND, hw = 10 + R() * 30, hh = 8 + R() * 20;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }
    /* the troop doors, both sides: upper and lower halves that open up and
       down, two windows in the upper half and two more aft of the door; the
       sill 1.21 m up, on the side fairing ("70 red" through the fit) */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.60)"; g.lineWidth = 2.2;
      g.strokeRect(pxX(1.72), pySide(Z(2.42), b), pxX(0.52) - pxX(1.72), pySide(Z(1.21), b) - pySide(Z(2.42), b));
      g.beginPath(); g.moveTo(pxX(1.72), pySide(Z(1.62), b)); g.lineTo(pxX(0.52), pySide(Z(1.62), b)); g.stroke();
      g.fillStyle = "rgba(12,16,18,0.92)";
      [1.50, 0.98, 0.31, -0.40].forEach(function (wx) {
        g.fillRect(pxX(wx + 0.12), pySide(Z(2.00), b), pxX(wx - 0.12) - pxX(wx + 0.12), pySide(Z(1.78), b) - pySide(Z(2.00), b));
      });
    }
    /* the pilot's door on the starboard side, under his canopy */
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2;
    g.strokeRect(pxX(3.80), pySide(Z(2.26), 2), pxX(2.95) - pxX(3.80), pySide(Z(1.50), 2) - pySide(Z(2.26), 2));
    /* national marking: the red star on the rear fuselage aft of the wing,
       both sides, where Soviet Mi-24s carried it */
    if (VR.stars) for (b = 1; b <= 2; b++) star(g, pxX(-2.75), pySide(Z(1.92), b), 0.30 * SX, 0.30 * SZ);
    return cv;
  }

  var _cv = {}, _tex = {};
  function skinTexture(VR) {
    var k = VR.scheme + (VR.stars ? "*" : "");
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(VR);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[k] = t;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

  /* mode: undefined - by face normal into the four bands; "belly" - every
     face into the pale underside band (the pylons and the lower side
     fairings, pale all over in every photograph); "lift" - side faces
     sampled 0.55 m higher, above the pale band, and never end-on (the
     endplates, camouflaged to their feet: the Iraqi D, the CWAM D, "70 red") */
  function projUV(geo, mode) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = mode === "belly" ? 3 : nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = mode !== "lift" && Math.abs(nx) > Math.abs(ny) * 1.4;
      var lift = mode === "lift" ? 0.55 : 0;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0)      { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else                 { U = pxX(endOn ? x + y : x); W = pySide(z + lift, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials == */
  function makeMats(C, VR) {
    var tex = skinTexture(VR);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.07 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SCHEMES[VR.scheme].base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    m.blade  = new V.MeshStandardMaterial({ color: 0x353a36, roughness: 0.78, metalness: 0.14 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.store  = new V.MeshStandardMaterial({ color: 0x4b513e, roughness: 0.80, metalness: 0.10 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1d2c33, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
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
  /* an open cone from p (radius r0) to q (radius r1), on the same facets
     as a bar() along the same line */
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
  function ring(r0, r1, seg, c, n) {
    var g = new V.RingGeometry(r0, r1, seg, 1);
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
  function mesh(parent, list, mat, name) {
    if (!list.length) return null;
    var m = new V.Mesh(merge(list), mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  /* the painted airframe: each [list, mode] group is projected by its own
     rule (projUV), then all of it is merged into one mesh, one draw call */
  function skinMesh(parent, groups, mat, name) {
    var all = [];
    groups.forEach(function (gr) {
      gr[0].forEach(function (q) {
        var f = flat(q);
        if (!f.attributes.normal) f.computeVertexNormals();
        all.push(projUV(f, gr[1]));
      });
    });
    var m = new V.Mesh(merge(all), mat);
    m.name = name;
    parent.add(m);
    return m;
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
  /* a closed solid through a run of convex sections, capped at both ends */
  function pod(secs) {
    var faces = [secs[0], secs[secs.length - 1]], q, j, n = secs[0].length;
    for (q = 0; q < secs.length - 1; q++)
      for (j = 0; j < n; j++)
        faces.push([secs[q][j], secs[q][(j + 1) % n], secs[q + 1][(j + 1) % n], secs[q + 1][j]]);
    return convex(faces);
  }

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
  function secAt(secs, x) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return null;
  }
  /* a solid of revolution about model x from an (x, r) profile, front to back */
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);
    g.translate(0, y, z);
    return g;
  }
  /* an aerofoil section in a plane: le, te are model points, n the unit
     thickness direction; six corners as the other heroes' foil() */
  function foil3(le, te, t, n) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + n[0] * k, le[1] + (te[1] - le[1]) * f + n[1] * k,
              le[2] + (te[2] - le[2]) * f + n[2] * k];
    }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "mi24" + VR.key;
    var i, k, s, a;
    var skin = [], dark = [], metal = [], store = [], team = [], glass = [];
    var skinBelly = [], skinLift = [];          /* painted by their own rule: projUV */
    var gearM = [], gearR = [];

    /* --------------------------------------------------- the fuselage ----
       Sections nose to tail (decreasing x), wound outward by loft(): the
       blunt nose round the gun turret; the crew stations, the gunner's
       sill at 1.74 m and the pilot's 0.45 m higher behind the step at
       x 4.3; the cabin, 1.74 m across and 1.85 m deep over a flat belly
       0.77 m up; then the rear fuselage, whose belly rises into the tail
       boom. The boom is deep and narrow ("oval, narrowing", ru.wikipedia),
       1.7 m at its root and 0.3 m at its end inside the fin, its top
       falling from 2.9 to 2.3 m as the "70 red" side view shows.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 5.78, 1.04, 1.42, 1.22, 0.24, 0.30, 0.22, 0.75),
      sec( 5.68, 0.96, 1.54, 1.20, 0.38, 0.45, 0.34, 0.68),
      sec( 5.45, 0.91, 1.65, 1.22, 0.48, 0.56, 0.45, 0.62),
      sec( 5.00, 0.88, 1.71, 1.25, 0.53, 0.61, 0.51, 0.56),
      sec( 4.42, 0.86, 1.74, 1.30, 0.55, 0.64, 0.53, 0.52),
      sec( 4.28, 0.85, 2.18, 1.40, 0.56, 0.65, 0.51, 0.46),
      sec( 3.70, 0.84, 2.24, 1.45, 0.58, 0.69, 0.52, 0.44),
      sec( 3.00, 0.82, 2.30, 1.50, 0.64, 0.76, 0.56, 0.42),
      sec( 2.72, 0.80, 2.56, 1.55, 0.67, 0.81, 0.62, 0.40),
      sec( 1.80, 0.78, 2.60, 1.58, 0.70, 0.86, 0.66, 0.40),
      sec( 0.00, 0.77, 2.62, 1.60, 0.72, 0.87, 0.68, 0.40),
      sec(-1.30, 0.78, 2.62, 1.62, 0.70, 0.86, 0.66, 0.40),
      sec(-2.40, 0.92, 2.62, 1.70, 0.60, 0.78, 0.60, 0.45),
      sec(-3.40, 1.08, 2.75, 1.85, 0.48, 0.62, 0.48, 0.52),
      sec(-4.50, 1.22, 2.92, 2.02, 0.34, 0.44, 0.34, 0.58),
      sec(-6.00, 1.40, 2.78, 2.08, 0.28, 0.36, 0.27, 0.62),
      sec(-7.20, 1.62, 2.65, 2.14, 0.23, 0.30, 0.22, 0.66),
      sec(-8.20, 1.84, 2.54, 2.20, 0.19, 0.25, 0.18, 0.70),
      sec(-9.00, 1.95, 2.42, 2.19, 0.15, 0.20, 0.14, 0.74),
      sec(-9.80, 2.02, 2.30, 2.16, 0.10, 0.14, 0.09, 0.80),
    ];
    var fl = loft(FUS, 14, 0.07, 0.08);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);
    function fusAt(x) { return secAt(FUS, x); }

    /* ------------------------------------------------ engine cowling ----
       Over the cabin roof: the two TV3-117s side by side ahead of the main
       gearbox, the cowl highest (3.66 m) under the mast and running down
       aft into the top of the boom. */
    var COWL = [
      sec( 2.62, 2.46, 3.22, 2.86, 0.52, 0.60, 0.40, 0.60),
      sec( 2.48, 2.46, 3.40, 2.95, 0.60, 0.68, 0.48, 0.55),
      sec( 2.00, 2.46, 3.50, 3.00, 0.64, 0.71, 0.52, 0.52),
      sec( 1.20, 2.46, 3.58, 3.02, 0.66, 0.72, 0.54, 0.50),
      sec( 0.20, 2.46, 3.64, 3.05, 0.66, 0.72, 0.54, 0.50),
      sec(-0.70, 2.46, 3.66, 3.05, 0.64, 0.70, 0.52, 0.50),
      sec(-1.60, 2.46, 3.62, 3.02, 0.60, 0.66, 0.48, 0.52),
      sec(-2.60, 2.48, 3.45, 2.95, 0.52, 0.58, 0.40, 0.55),
      sec(-3.60, 2.54, 3.16, 2.86, 0.40, 0.44, 0.30, 0.60),
      sec(-4.60, 2.60, 2.93, 2.78, 0.26, 0.30, 0.20, 0.70),
    ];
    var cw = loft(COWL, 12, 0.03, 0.05);
    for (i = 0; i < cw.length; i++) skin.push(cw[i]);

    /* The two engine intakes side by side at the front of the cowl, right
       over the back of the pilot's canopy (the "double air intake"). The D
       as built has the plain drum intake round its centre body, as the
       Monino Mi-24A still shows; from the Afghan war on the intakes wear
       the PZU dust filters, the domes every later photograph shows. */
    var IN_Y = 0.33, IN_H = 3.02, IN_R = 0.29;
    both(skin, cyl(IN_R, IN_R, 0.40, 18, "x", 2.72, IN_Y, Z(IN_H), true));
    if (!VR.pzu) {
      both(skin, place(new V.TorusGeometry(IN_R - 0.02, 0.035, 4, 18), 2.92, IN_Y, Z(IN_H), 0, PI / 2, 0));
      both(dark, disc(IN_R - 0.01, 18, [2.84, IN_Y, Z(IN_H)], [1, 0, 0]));
      both(skin, sph(0.13, 8, 5, 2.86, IN_Y, Z(IN_H), 1.5, 1, 1));
    } else {
      both(skin, cyl(0.32, 0.32, 0.22, 18, "x", 2.96, IN_Y, Z(IN_H)));
      both(skin, sph(0.32, 18, 6, 3.07, IN_Y, Z(IN_H), 0.55, 1, 1));
      both(dark, cyl(0.325, 0.325, 0.04, 18, "x", 2.87, IN_Y, Z(IN_H), true));
    }
    /* the fan intake on the cowl top behind the engine intakes, its round
       mouth facing ahead (the Polish D head on) */
    skin.push(cyl(0.20, 0.20, 0.36, 14, "x", 1.70, 0, Z(3.48)));
    dark.push(disc(0.17, 14, [1.885, 0, Z(3.48)], [1, 0, 0]));
    /* The exhausts: the engines drive the gearbox from in front, so the
       gas leaves sideways, one pipe each side of the cowl just ahead of the
       mast, blowing out and a little aft. The pipe, its dark lining, the blanking face 0.10 m in and the lip,
       all on the same sixteen facets and meeting edge to edge, so no sliver
       of the pipe's culled inside shows at any angle (as hero/gb_lynx.js) */
    var exDir = [-0.30, 0.954, 0];
    function exAt(f) { return [0.70 + exDir[0] * f, 0.50 + exDir[1] * f, Z(3.06)]; }
    both(skin, bar(exAt(0), exAt(0.40), 0.27, 16, false));
    both(dark, inward(bar(exAt(0.30), exAt(0.403), 0.255, 16, false)));
    both(dark, bar2(exAt(0.30), exAt(0.302), 0.255, 0.0005, 16));
    both(skin, bar2(exAt(0.40), exAt(0.403), 0.27, 0.255, 16));

    /* --------------------------------------------------- the cockpits ----
       The "double bubble": the gunner forward and low, the pilot behind and
       0.55 m higher, each under his own glazing, the tops at 2.30 and 2.87 m
       ("70 red" through the fit). */
    var GUN = [
      sec( 5.58, 1.56, 1.72, 1.62, 0.26, 0.30, 0.14, 0.85),
      sec( 5.42, 1.56, 2.00, 1.72, 0.40, 0.45, 0.24, 0.85),
      sec( 5.15, 1.56, 2.22, 1.82, 0.48, 0.53, 0.30, 0.85),
      sec( 4.85, 1.56, 2.30, 1.86, 0.51, 0.56, 0.32, 0.85),
      sec( 4.52, 1.56, 2.26, 1.86, 0.53, 0.57, 0.30, 0.85),
      sec( 4.26, 1.56, 2.10, 1.82, 0.53, 0.56, 0.24, 0.85),
    ];
    var gl = loft(GUN, 10, 0.05, 0.03);
    for (i = 0; i < gl.length; i++) glass.push(gl[i]);
    var PIL = [
      sec( 4.40, 2.05, 2.20, 2.12, 0.30, 0.34, 0.16, 0.85),
      sec( 4.20, 2.05, 2.55, 2.25, 0.46, 0.50, 0.26, 0.85),
      sec( 3.90, 2.05, 2.80, 2.32, 0.52, 0.55, 0.32, 0.85),
      sec( 3.55, 2.05, 2.87, 2.35, 0.54, 0.57, 0.33, 0.85),
      sec( 3.15, 2.05, 2.82, 2.33, 0.54, 0.57, 0.31, 0.85),
      sec( 3.00, 2.05, 2.78, 2.32, 0.54, 0.57, 0.30, 0.85),
    ];
    var pl = loft(PIL, 10, 0.05, null);
    for (i = 0; i < pl.length; i++) glass.push(pl[i]);
    /* behind the pilot's head the canopy is metal, faired up into the
       intakes */
    var FAIR = [
      sec( 3.06, 2.00, 2.76, 2.30, 0.53, 0.57, 0.29, 0.82),
      sec( 2.80, 2.00, 2.82, 2.34, 0.55, 0.59, 0.36, 0.76),
      sec( 2.52, 2.00, 2.86, 2.36, 0.56, 0.60, 0.42, 0.70),
    ];
    var fr = loft(FAIR, 10, null, null);
    skin.push(fr[0]);
    /* frames: a hoop at each armoured windscreen's edge and one half way,
       round both sides of the glazing, open four-sided bars meeting end
       to end */
    function hoop(secs, x, r, list) {
      var S2 = secAt(secs, x), pts = ringOf(S2, 10), n = pts.length, j;
      for (j = 0; j < n; j++) {
        var q0 = pts[j], q1 = pts[(j + 1) % n];
        if (q0[1] < S2.zb + 0.02 && q1[1] < S2.zb + 0.02) continue;
        list.push(bar([x, q0[0] * 1.02, q0[1]], [x, q1[0] * 1.02, q1[1]], r, 4, false));
      }
    }
    hoop(GUN, 5.30, 0.028, skin); hoop(GUN, 4.70, 0.026, skin);
    hoop(PIL, 4.05, 0.028, skin); hoop(PIL, 3.40, 0.026, skin);

    /* ---------------------------------------------------- the nose kit ---- */
    /* USPU-24: the turret in the very front of the nose, under the
       gunner's windscreen, with the four-barrel YakB-12.7 */
    dark.push(sph(0.21, 12, 6, X_NOSE - 0.20, 0, Z(1.06), 1, 1, 0.85));
    var gunDip = -2 * D2R;
    var gp = [box(0.36, 0.15, 0.15, 0.12, 0, 0), cyl(0.065, 0.065, 0.16, 10, "x", 0.36, 0, 0)];
    for (k = 0; k < 4; k++) {
      a = PI / 4 + k * PI / 2;
      gp.push(cyl(0.020, 0.020, 0.62, 6, "x", 0.72, Math.cos(a) * 0.042, Math.sin(a) * 0.042));
    }
    for (i = 0; i < gp.length; i++) { gp[i].rotateY(-gunDip); gp[i].translate(5.66, 0, Z(1.03)); dark.push(gp[i]); }
    /* the guidance sight's fairing under the starboard side of the nose:
       Raduga-F on the D; the larger Raduga-Sh sight on the V, which hangs
       lower. It and the antenna pod are pale all over, as the underside
       (Gerwing 012164 and 028884, Gatow, CWAM 120) */
    var SR = VR.v ? 0.31 : 0.27, SH = VR.v ? 0.64 : 0.68;
    skinBelly.push(latheX([[5.12, 0.0], [5.08, SR * 0.55], [4.96, SR * 0.92], [4.80, SR], [4.40, SR],
                      [4.24, SR * 0.80], [4.14, 0.0]], 16, -0.28, Z(SH)));
    glass.push(disc(SR * 0.42, 12, [5.105, -0.28, Z(SH - 0.02)], [1, 0, -0.25]));
    /* the missile guidance antenna under the port side: a pod with a dark
       dielectric dome in front, as large on the D as on the V (the Soviet
       D of 1991, Gerwing 012164; the NVA D at Gatow; the V of 1993,
       Gerwing 028884) */
    skinBelly.push(latheX([[5.18, 0.10], [5.05, 0.16], [4.70, 0.15], [4.50, 0.06], [4.46, 0.0]], 12, 0.30, Z(0.62)));
    dark.push(sph(0.17, 12, 6, 5.28, 0.30, Z(0.60)));
    /* the air data probe on the starboard side, out of the front frame of
       the gunner's canopy to 1.05 m ahead of the nose ("70 red" through the
       fit: the tip at 6.84 m, 1.95 m up; the vanes at 6.6 m) */
    metal.push(bar([5.00, -0.36, Z(1.88)], [6.85, -0.36, Z(1.95)], 0.028, 6, true));
    metal.push(box(0.12, 0.01, 0.10, 6.60, -0.36, Z(1.98)));
    metal.push(box(0.12, 0.10, 0.01, 6.60, -0.36, Z(1.94)));

    /* --------------------------------------------- main gear fairings ----
       The main legs fold back into a fairing on each side of the lower
       fuselage behind the cabin, above the wheel (0710, 0835). */
    var BL = [
      sec(-0.75, 1.15, 1.70, 1.42, 0.08, 0.12, 0.07, 0.80, 0.80),
      sec(-1.00, 0.98, 1.84, 1.40, 0.20, 0.27, 0.17, 0.70, 0.80),
      sec(-1.90, 0.98, 1.84, 1.42, 0.20, 0.27, 0.17, 0.70, 0.80),
      sec(-2.40, 1.20, 1.76, 1.48, 0.08, 0.12, 0.07, 0.80, 0.80),
    ];
    var bl = loft(BL, 8, 0.10, 0.20);
    for (i = 0; i < bl.length; i++) both(skin, bl[i]);

    /* ------------------------------------------ lower side fairings ----
       The straight, tube-like fairing along each lower side, from beside
       the gun turret back into the main gear fairing, pale all over: the
       strongest line in every side photograph ("70 red", "44 white",
       Gerwing 028884). Through the "70 red" fit its top is 1.30-1.33 m up
       under the cockpits and about 1.2 m under the cabin, where the troop
       door's sill sits on it; its foot is the belly. It stands 0.08 m
       proud of the fuselage side and no wider than the cabin.
                x     bottom  top   half-width                           */
    function fusHW(x, z) {                   /* half-width at model z */
      var S = fusAt(x), zn, W;
      if (z < S.zm) { zn = (S.zm - z) / (S.zm - S.zb); W = S.wm + (S.wb - S.wm) * zn; }
      else          { zn = (z - S.zm) / (S.zt - S.zm); W = S.wm + (S.wt - S.wm) * zn; }
      var sn = Math.pow(Math.min(zn, 1), 1 / S.e);
      return W * Math.pow(Math.sqrt(Math.max(0, 1 - sn * sn)), S.e);
    }
    var SF = [[5.62, 1.02, 1.16, 0.03], [5.50, 0.94, 1.28, 0.10], [5.20, 0.90, 1.32, 0.14],
              [4.40, 0.88, 1.32, 0.16], [3.50, 0.86, 1.30, 0.16], [2.90, 0.84, 1.20, 0.15],
              [1.00, 0.81, 1.18, 0.15], [-0.40, 0.81, 1.18, 0.15], [-0.90, 0.86, 1.10, 0.07]];
    var sfSecs = SF.map(function (r) {
      var zc = (r[1] + r[2]) / 2, yc = fusHW(r[0], Z(zc)) + 0.08 - r[3];
      return sec(r[0], r[1], r[2], zc, r[3] * 0.75, r[3], r[3] * 0.75, 0.55, yc);
    });
    var sf = loft(sfSecs, 6, 0.04, 0.06);
    for (i = 0; i < sf.length; i++) both(skinBelly, sf[i]);

    /* --------------------------------------------------- stub wings ----
       Two tapered panels, 1.60 m chord at the root and 1.15 m at the tip,
       20 % thick, set at 19 deg to the datum (they lift most at speed, when
       the fuselage flies nose down) with 12 deg of anhedral, the leading
       edge swept 8.8 deg. Endplate pylons stand at the tips, 6.59 m over
       them. */
    function wingSec(y, tScale) {
      var c = wingC(y), le = wingLE(y), hq = wingH(y);
      var ci = Math.cos(W_INC), si = Math.sin(W_INC);
      var LE = [le, y, Z(hq + 0.25 * c * si)], TE = [le - c * ci, y, Z(hq + 0.25 * c * si - c * si)];
      return foil3(LE, TE, wingT(y) * (tScale || 1), [si, 0, ci]);
    }
    both(skin, solid(wingSec(WR_Y), wingSec(WT_Y)));
    /* The endplate pylon at each tip, its foot 0.88 m up ("70 red"
       through the fit, 0.88-0.90 m; the Polish D head on, 0.85), and the
       launcher under the foot: a cross frame, and fore and aft under each
       missile a rail level with the foot, 0.30 m either side of the
       endplate. The missile rides ON its rail beside the endplate's lower
       edge, as the DoD photograph of an Iraqi Mi-24D's winglet (1991)
       shows; the Polish D shows the empty frame and rails. */
    var tipLE = wingLE(WT_Y), tipH = wingH(WT_Y), EPZ = 0.88;
    var EP = [[tipLE + 0.05, Z(tipH + 0.05)], [tipLE - 0.95, Z(tipH - 0.22)], [tipLE - 0.95, Z(EPZ)],
              [tipLE - 0.20, Z(EPZ)], [tipLE + 0.02, Z(EPZ + 0.16)]];
    var epA = EP.map(function (p) { return [p[0], WT_Y - 0.045, p[1]]; });
    var epB = EP.map(function (p) { return [p[0], WT_Y + 0.045, p[1]]; });
    both(skinLift, solid(epA, epB));
    var FX = tipLE - 0.55, RAIL = EPZ + 0.005, RAIL_Y = [WT_Y - 0.30, WT_Y + 0.30];
    both(metal, box(0.90, 0.70, 0.07, FX, WT_Y, Z(EPZ - 0.035)));
    RAIL_Y.forEach(function (my) {
      both(metal, box(1.20, 0.06, 0.10, tipLE - 0.80, my, Z(RAIL - 0.05)));
    });
    /* The pylons: a fairing under each station, deep where it leaves the
       wing's leading edge and over the store's front half, its top buried
       along the wing's chord line, pale like the wing's underside. The
       store hangs 0.30 m under the wing's lower surface, 0.5 m under its
       leading edge ("70 red" through the fit: a B-8V20 1.41-1.44 m to its
       top and 0.89 m to its foot; "44 white"; Gerwing 028884). */
    function wingBot(y) { return wingH(y) - wingT(y) * 0.45; }
    function chordPt(y, f) {
      var c = wingC(y), ci = Math.cos(W_INC), si = Math.sin(W_INC);
      return [wingLE(y) - f * c * ci, wingH(y) + 0.25 * c * si - f * c * si];
    }
    function podTop(y) { return wingBot(y) - 0.30; }
    [PYL_IN, PYL_OUT].forEach(function (py) {
      var f0 = chordPt(py, 0.06), f1 = chordPt(py, 0.70), zb = podTop(py) - 0.02;
      var prof = [[f0[0], f0[1]], [f1[0], f1[1]], [f1[0], zb], [f0[0] - 0.25, zb]];
      both(skinBelly, solid(prof.map(function (q) { return [q[0], py - 0.065, Z(q[1])]; }),
                            prof.map(function (q) { return [q[0], py + 0.065, Z(q[1])]; })));
    });

    /* ---------------------------------------------------- the stores ----
       Four pylons, 1.77 and 2.30 m out: the Polish D head on, scaled on
       its endplates, gives 1.70-1.84 m and 2.29-2.32 m (it stands a little
       yawed, so the two sides are averaged). */
    /* inboard and outboard: UB-32A (32 x 57 mm S-5) on the D, B-8V20
       (20 x 80 mm S-8) on the V */
    var PR = VR.v ? 0.26 : 0.23, PL = VR.v ? 1.95 : 2.00;
    [PYL_IN, PYL_OUT].forEach(function (py) {
      var pz = Z(podTop(py) - PR), px = wingLE(py) + 0.25;
      both(store, latheX([[px, 0.0], [px, PR * 0.92], [px - 0.04, PR], [px - PL * 0.78, PR],
                          [px - PL * 0.94, PR * 0.62], [px - PL, PR * 0.25], [px - PL, 0.0]], 14, py, pz));
      both(dark, disc(PR * 0.86, 14, [px + 0.004, py, pz], [1, 0, 0]));
      both(metal, ring(PR * 0.55, PR * 0.66, 14, [px + 0.008, py, pz], [1, 0, 0]));
    });
    /* the wingtip anti-tank missiles, a pair on each tip launcher, one on
       each rail: two Falanga on the D, two Shturm containers on the V
       (Czech MoD) */
    RAIL_Y.forEach(function (my) {
      if (VR.v) {
        /* 9M114 Shturm in its launch tube, on the rail */
        var tz = Z(RAIL + 0.075);
        both(store, cyl(0.075, 0.075, 1.83, 10, "x", FX - 0.25, my, tz));
        both(dark, disc(0.07, 10, [FX - 0.25 + 0.916, my, tz], [1, 0, 0]));
      } else {
        /* 9M17 Falanga on its rail: body, nose, four big wings aft, each
           standing out from the body (0.66 m across). The nose 0.18 m
           behind the endplate's leading edge, the wings clear behind its
           trailing edge (the Iraqi D) */
        var mx = tipLE - 1.10, mz = Z(RAIL + 0.074);
        both(store, cyl(0.074, 0.074, 1.00, 8, "x", mx, my, mz));
        both(store, cyl(0.012, 0.074, 0.22, 8, "x", mx + 0.61, my, mz));
        for (k = 0; k < 4; k++) {
          var wa = PI / 4 + k * PI / 2;
          both(store, box(0.30, 0.26, 0.012, mx - 0.32, my + Math.cos(wa) * 0.20, mz + Math.sin(wa) * 0.20, wa, 0, 0));
        }
      }
    });

    /* ------------------------------------------------ fin and stabiliser --
       The fin boom's inclined part rises at 42.5 deg from the boom end. Its
       root aerofoil lies along the boom's end, from the top at the leading
       edge to the bottom at the trailing edge; its tip carries the tail
       rotor gearbox, with the hub low on the LEFT face near the front. */
    var finRoot = foil3([-8.95, 0, Z(2.42)], [-9.82, 0, Z(2.02)], 0.18, [0, 1, 0]);
    var finTip = foil3([-10.62, 0, Z(3.88)], [X_TAIL, 0, Z(3.80)], 0.13, [0, 1, 0]);
    skin.push(solid(finRoot, finTip));
    /* the tail rotor gearbox fairing on the fin tip, its bulge to port */
    skin.push(latheX([[-10.52, 0.0], [-10.58, 0.08], [-10.75, 0.13], [-11.35, 0.12], [-11.62, 0.06], [-11.70, 0.0]],
                     10, 0, Z(3.80)));
    skin.push(sph(0.20, 12, 6, TR_X, 0.14, Z(TR_H), 1.2, 0.9, 1.1));
    skin.push(cyl(0.09, 0.11, 0.24, 12, "y", TR_X, 0.30, Z(TR_H)));
    /* The stabiliser: all-moving, on the fin boom under the fin. 2.8 m
       across: the three-view draws it 0.43 of the wing's span. */
    var stRoot = foil3([-9.00, 0.12, Z(2.22)], [-9.85, 0.12, Z(2.22)], 0.10, [0, 0, 1]);
    var stTip = foil3([-9.16, 1.40, Z(2.22)], [-9.77, 1.40, Z(2.22)], 0.07, [0, 0, 1]);
    both(skin, solid(stRoot, stTip));
    /* the tail skid: two struts and the heel */
    metal.push(bar([-8.90, 0, Z(1.98)], [-9.50, 0, Z(0.80)], 0.045, 8, true));
    metal.push(bar([-9.80, 0, Z(2.06)], [-9.52, 0, Z(0.82)], 0.035, 8, true));
    metal.push(box(0.30, 0.10, 0.08, -9.52, 0, Z(0.76)));
    /* aerials on the boom */
    dark.push(bar([-4.70, 0, Z(2.90)], [-4.95, 0, Z(3.35)], 0.012, 4, true));
    dark.push(bar([-6.20, 0, Z(2.75)], [-6.45, 0, Z(3.20)], 0.012, 4, true));

    /* ------------------------------------------------- team flashes ---- */
    function wingTop(y, f, lift) {
      var c = wingC(y), le = wingLE(y), hq = wingH(y);
      var ci = Math.cos(W_INC), si = Math.sin(W_INC);
      var lx = le - f * c * ci, lz = hq + 0.25 * c * si - f * c * si;
      var th = wingT(y) * (f < 0.15 ? 0.5 : 0.5 - 0.12 * (f - 0.15) / 0.6);
      return [lx + si * (th + lift), y, Z(lz + ci * (th + lift))];
    }
    var fa = [wingTop(2.45, 0.18, 0.010), wingTop(2.45, 0.70, 0.010), wingTop(3.15, 0.70, 0.010), wingTop(3.15, 0.18, 0.010)];
    var fb = [wingTop(2.45, 0.18, 0.024), wingTop(2.45, 0.70, 0.024), wingTop(3.15, 0.70, 0.024), wingTop(3.15, 0.18, 0.024)];
    both(team, solid(fa, fb));
    var sa = [[-9.10, 0.50, Z(2.22 + 0.045)], [-9.70, 0.50, Z(2.22 + 0.035)], [-9.72, 1.28, Z(2.22 + 0.030)], [-9.20, 1.28, Z(2.22 + 0.038)]];
    var sb2 = sa.map(function (p) { return [p[0], p[1], p[2] + 0.014]; });
    both(team, solid(sa, sb2));
    var bandSecs = [], bx = [-7.00, -7.60];
    for (i = 0; i < 2; i++) {
      var B0 = fusAt(bx[i]), zm = B0.zm;
      bandSecs.push({ x: bx[i], zm: zm, zb: zm - (zm - B0.zb) * 1.03, zt: zm + (B0.zt - zm) * 1.03,
                      wb: B0.wb * 1.03, wm: B0.wm * 1.03, wt: B0.wt * 1.03, e: B0.e, yc: 0 });
    }
    team.push(loft(bandSecs, 14, null, null)[0]);

    /* --------------------------------------------- the undercarriage ----
       Retractable tricycle: a pair of nose wheels on a lever (trailing
       link) leg, and one 720 x 320 mm wheel each side on a V-shaped lever
       from the lower fuselage with its shock strut rising into the fairing
       ("pyramidal", ru.wikipedia): 4.39 m wheelbase, 3.03 m track. All of
       it is in the "gear" group, which the renderer hides in flight. */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    /* nose: twin wheels on a trailing link */
    both(gearR, cyl(NW_R, NW_R, NW_W, 16, "y", NW_X, NW_Y, Z(NW_R)));
    both(gearM, cyl(0.10, 0.10, NW_W + 0.01, 10, "y", NW_X, NW_Y, Z(NW_R)));
    gearM.push(cyl(0.035, 0.035, 2 * NW_Y, 8, "y", NW_X, 0, Z(NW_R)));
    gearM.push(bar([NW_X + 0.20, 0, Z(0.92)], [NW_X + 0.22, 0, Z(0.40)], 0.055, 8, true));
    gearM.push(bar([NW_X + 0.22, 0, Z(0.42)], [NW_X, 0, Z(NW_R)], 0.045, 8, true));
    /* main: one wheel each side, a V-shaped lever to the fuselage and the
       shock strut up into the fairing above */
    both(gearR, cyl(MW_R, MW_R, MW_W, 18, "y", MW_X, MW_Y, Z(MW_R)));
    both(gearM, cyl(0.17, 0.17, MW_W + 0.01, 12, "y", MW_X, MW_Y, Z(MW_R)));
    var ax = [MW_X, MW_Y - MW_W / 2 - 0.06, Z(MW_R)];
    both(gearM, bar(ax, [MW_X, MW_Y - MW_W / 2 + 0.02, Z(MW_R)], 0.06, 8, true));
    both(gearM, bar(ax, [MW_X + 0.80, 0.70, Z(0.90)], 0.05, 8, true));
    both(gearM, bar(ax, [MW_X - 0.75, 0.70, Z(0.90)], 0.05, 8, true));
    both(gearM, bar([MW_X + 0.04, MW_Y - MW_W / 2 - 0.08, Z(MW_R + 0.10)], [MW_X + 0.10, 1.02, Z(1.40)], 0.07, 8, true));
    mesh(gear, gearM, T.metal, "gear_struts");
    mesh(gear, gearR, T.rubber, "tyres");

    /* ======================================================= main rotor ==
       The mast and the swashplate's fixed ring are baked into the fittings
       mesh, leaned 4.5 deg with the shaft, so they cost no draw call. */
    var tiltM = new V.Matrix4().makeRotationY(MAST_TILT).premultiply(new V.Matrix4().makeTranslation(0, 0, Z(HUB_H)));
    [cyl(0.16, 0.18, 0.70, 14, "z", 0, 0, -0.42), cyl(0.42, 0.42, 0.06, 18, "z", 0, 0, -0.40)].forEach(function (q) {
      q.applyMatrix4(tiltM); metal.push(q);
    });

    /* --------------------------------------------- airframe meshes ---- */
    skinMesh(g, [[skin], [skinBelly, "belly"], [skinLift, "lift"]], T.skin, "airframe");
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");

    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    var mnt = new V.Group();
    mnt.rotation.x = -PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);
    /* The articulated head: a hub 1.74 m across over its five hinge arms,
       the lag dampers, the pitch links, and the slip-ring column on top
       (its top 4.73 m up). Rectangular metal blades of 0.58 m chord; the
       rotor turns clockwise from above, so the leading edge is on -Y. The
       blades sit at +-36, +-108 and 180 deg; the disc, not a blade, sets
       the front of the box. */
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.30, 0.34, 0.32, 18, "z", 0, 0, 0));
    hubM.push(cyl(0.40, 0.40, 0.05, 18, "z", 0, 0, -0.30));
    hubD.push(cyl(0.15, 0.17, 0.36, 12, "z", 0, 0, 0.30));
    var BP = [[1.10, -0.14], [1.40, -0.18], [ROTOR_R - 0.10, -0.18], [ROTOR_R, -0.12],
              [ROTOR_R, CHORD - 0.22], [ROTOR_R - 0.06, CHORD - 0.18], [1.40, CHORD - 0.18], [1.10, 0.30]];
    for (k = 0; k < 5; k++) {
      a = (36 + 72 * k) * D2R;
      var bl2 = M.slab(V, BP, 0.04);
      bl2.translate(0, 0, -0.02);
      bl2.rotateZ(a);
      blades.push(bl2);
      var parts = [[box(0.62, 0.24, 0.18, 0.56, 0, 0), hubM],
                   [box(0.40, 0.30, 0.14, 1.05, 0.06, 0), hubM],
                   [cyl(0.055, 0.055, 0.60, 8, "x", 0.62, 0.24, 0.04), hubD],
                   [cyl(0.026, 0.026, 0.30, 6, "z", 0.50, -0.22, -0.16), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       Three blades of 0.25 m chord (measured off "70 red") on the left of
       the fin, 0.42 m out; the hub axis is the mount's local Z. The first
       blade points straight aft: see the header on the X extent. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    /* in this mount local -Z is outboard (port): the spinner narrows that way */
    var trM = [cyl(0.11, 0.11, 0.18, 12, "z", 0, 0, 0), cyl(0.07, 0.02, 0.12, 10, "z", 0, 0, -0.15)];
    var trB = [];
    for (k = 0; k < 3; k++) {
      var ang = (180 + 120 * k) * D2R;
      var tb = box(TR_R - 0.25, TR_CHORD, 0.035, 0.25 + (TR_R - 0.25) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(ang);
      tb.translate(0, 0, -0.04);
      trB.push(tb);
      var cuff = box(0.26, 0.12, 0.10, 0.18, 0, 0);
      cuff.rotateZ(ang); cuff.translate(0, 0, -0.04);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");

    return g;
  }

  return {
    d:  function (THREE, M, C) { return build(THREE, M, C, VARIANTS.d); },
    v:  function (THREE, M, C) { return build(THREE, M, C, VARIANTS.v); },
    dk: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.dk); }
  };
})();

UNIT_MODELS["pact_e60_gunship"] = { len: 21.35, build: HeroMi24.d };
UNIT_MODELS["pact_e80_gunship"] = { len: 21.35, build: HeroMi24.v };
UNIT_MODELS["helo_k"]           = { len: 21.35, build: HeroMi24.dk };
UNIT_MODELS["kpa_e80_gunship"]  = { len: 21.35, build: HeroMi24.dk };
UNIT_MODELS["kpa_e90_gunship"]  = { len: 21.35, build: HeroMi24.dk };
UNIT_MODELS["kpa_e00_gunship"]  = { len: 21.35, build: HeroMi24.dk };
