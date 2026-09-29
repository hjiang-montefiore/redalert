/* ======= eu_tiger.js - HERO model: Eurocopter / Airbus Helicopters Tiger =======
   Three defs, two variants of one airframe:
     helo_f            France, e20   Tigre HAD (Appui-Destruction)
     fra_e00_gunship   France, e00   Tigre HAD, in service from 2013
     helo_g            Germany, e00- Tiger UHT (Unterstuetzungshubschrauber)
   Before this file all three fell through render3d.js modelKeyFor to helo_n
   and were drawn as a Longbow Apache: the wrong nose, the wrong crew order,
   a radar the Tiger never had, and a 30 mm gun under the German one, which
   has none. modelKeyFor returns a def's own id first, so each def id is
   registered here with its own build.

   Reference. Published figures (the French, German, Italian, Czech and
   Russian Wikipedias' "Tigre" / "Tiger" data tables, the English one's,
   the Bundeswehr's Tiger page, army-technology.com "Tiger"):
     main rotor        13.00 m   four blades, hingeless head, turning
                                 CLOCKWISE seen from above (DE-wiki:
                                 "rechtslaufend"; the swept tips in the BJM
                                 photographs and the trim tabs in the Paris
                                 2019 rear view say the same)
     tail rotor         2.70 m   three blades, on the RIGHT (starboard) face
                                 of the fin
     length            15.80 m   rotors turning (RU-wiki); fuselage 14.08 m
                                 (FR, DE, IT, CS and NL-wiki; EN-wiki's
                                 13.85 m is not what the BJM photograph
                                 measures, 14.1 m)
     height             3.83 m   ground to the top of the rotor head, HAP
                                 and HAD (FR, DE, IT and CS-wiki; EN-wiki
                                 3.84 m "without top-mounted sensors")
                        4.32 m   with the tail rotor, i.e. to the top of
                                 its disc (RU-wiki "4,32 m (s khvostovym
                                 vintom)")
                        5.20 m   UHT, ground to the top of the mast sight
                                 (FR and DE-wiki)
     width              4.53 m   over the outer weapon pylons (PL and
                                 RU-wiki)
     crew              two in tandem, the PILOT IN FRONT and the gunner /
                       commander behind and higher (the Apache's order
                       reversed); the roof sight serves the rear seat
   Stations were measured off a near-orthographic starboard view of the
   ALAT's Tigre HAD BJM at Belgian Air Force Days 2018 (Wikimedia Commons,
   "Eurocopter EC665 Tigre, of 5 RHC No 2009, BJM ... pic1"), scaled so the
   tail rotor hub stands 2.97 m up: the published 4.32 m to the top of its
   disc less its 1.35 m radius. That one scale puts the blade roots 3.7 m up and the head's
   cover about 0.1 m above the published 3.83 m (the cover is built to the
   published figure) and makes the fuselage 14.1 m against the published
   14.08 m.
   From the nose: rotor hub 5.05 m, main axle 3.6 m (the near wheel taken
   back 0.14 m for perspective), tailwheel 11.3 m, tail rotor hub 13.1 m.
   The model's profile was traced over that photograph and over the USAF's
   port view of the ALAT's BIF at Trident Juncture 2018; the two agree
   everywhere but the wheels, which hang extended in flight. Widths are
   from a head-on telephoto of a UHT in flight ("Tiger (48093086887)",
   Gunnar Ries, June 2019) scaled on the 4.53 m over the pylons, and a view
   from below of the HAD BJJ at Paris 2019 ("BJJ Eurocopter Tiger 9"):
   pylons 1.45 and 2.08 m out, the intakes 1.7 m across the pair, the
   tailplane 2.6 m over its endplates, the main wheels 2.4 m apart. The
   tail rotor's side was read off three photographs: in the starboard
   views (BJM; the Paris 2019 rear quarter of 6026) the hub and all three
   blades lie over the fin; in the port view of a HAP (Andre Gerwing
   collection 007649) the fin hides the third blade.

   The fits, from the ALAT's own page and the Bundeswehr's:
     HAD   Nexter THL 30 turret and 30M781 gun under the nose, the Sagem
           Strix sight on the roof over the rear cockpit, two M299 rails
           of four AGM-114 Hellfire II on the INNER pylons, and on the
           OUTER pylons either Telson 12 pods of 68 mm rockets or twin
           Mistral launchers ("2 x 22 (int) + 2 x 12 (ext)"; "4 missiles
           Mistral" on the outer pylons). The airframe and the paint did
           not change between the two periods and the ALAT lists both outer
           fits to this day, so the two French defs share everything but
           that one choice, each a fit photographed on a HAD: fra_e00_gunship
           carries Telson 12 beside its Hellfires ("Telson 12 panache avec
           des missiles Hellfire", 2015), helo_f "2 missiles Mistral et 4
           Hellfire" on each stub wing (Commons, 2014), the published full
           fit of eight Hellfire II and four Mistral.
     UHT   NO GUN: where the HAD has its turret, the UHT has the pilot's
           steerable FLIR drum under the nose tip (DE-wiki, "Pilot Sight
           Unit": "am Kinn statt einer Turmmaschinenkanone ein schwenk- und
           nickbares FLIR"), a black drum about 0.3 m across in every UHT
           photograph checked, 74+53 in 2016 and 74+25 and 74+57 in 2024.
           The Heer can hang HMP 400 12.7 mm pods on the inner pylons
           instead of missiles; this anti-armour fit does not. The Osiris
           sight on a fixed stalk above the rotor head; four PARS 3 LR on
           each INNER pylon ("jeweils vier PARS 3 LR an den inneren
           Aufhaengungen") and two Stinger on each OUTER one (the twin
           rail beside a rocket pod in "Eurocopter Tiger (Bewaffnung)",
           Laupheim 2015). The PARS 3 rounds are never seen: they ride in
           a closed, square launcher of four, which keeps splinters off
           them and pre-cools their seekers (DE-wiki PARS 3 LR, "eckige
           Startbehaelter, die je vier Lenkwaffen pro Behaelter fassen").
           Its front shows four domed frangible covers two by two ("ILA
           2010 Samstag 041", the EN-wiki "Eurocopter Tiger 2" beside a
           UHT), and the rounds are slid into it from behind in their own
           canisters (euro-sd.com, "Arming the attack helicopter", 2019).
           HOT 3 was the alternative until PARS 3 LR series rounds were
           delivered from the end of 2015 (DE-wiki PARS 3 LR, citing the
           Bundesrechnungshof); the def names PARS 3 LR first, so the model
           carries it.
   Paint: the ALAT's three-tone "centre Europe" green, brown and black,
   carried over the top and the belly as well (ALAT: "camoufle en trois
   tons dit 'centre Europe', dessus inclus"), in a few BROAD bands, 1-3 m
   across, with a black cap over the forward metre and a half of the nose
   (BJM 2018, BIF at Trident Juncture 2018, BJI at BALTOPS 2024); on the
   Heer's machines a bronze green broken with a basalt grey and a
   black-grey, a grey nose, the low-vis Balkenkreuz on the boom, as every
   Tiger in the Airpower 2022 and ILA 2024 photographs wears it.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   the point the aircraft is flown at, under the mast at about the height of
   its centre of mass; the wheels stand 1.60 m below it on GROUND.
   render3d.js stands the model up with rotation.x = -PI/2 and rescales it
   by the measured X extent (about 2.26 times for these defs). It parks an
   aircraft with this origin 1.2 world units above the ground whatever the
   model, so on the apron the Tiger stands some 2.4 units deep in it,
   wheels and belly, as the AH-64E and Mi-28N heroes do; that is for
   render3d.js to put right (seat a parked machine on its lowest point),
   not for this origin.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent and every node
   counts. The faint rotor disc reaches 6.50 m ahead of the hub, clear of
   the 30 mm muzzle, and one tail rotor blade is built pointing straight
   aft, 1.35 m behind its hub. The extent is 15.87 m, the published 15.80 m
   length with rotors turning to within the photographs' error. The four
   main blades sit at 45 degrees, so blade phase never sets it.

   NAMED NODES, built the way pact_e20_gunship_mi28n.js and
   nato_e20_gunship_ah64e.js worked out:
     rotor      render3d.js turns it with rotateOnWorldAxis(scene up), taken
                in the PARENT's frame. The head hangs in a mount turned -PI/2
                about X, which lands the renderer's axis on the model's
                DOWNWARD mast, so the head turns clockwise seen from above as
                the Tiger's does. Inside, a +PI/2 group puts the head back
                into model axes.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X): hub axis on
                local Z, the model's lateral axis; the rotor is on the
                starboard face, so outboard is local +Z.
   The UHT's mast sight is NOT in the rotor: like the Longbow radome it
   sits on a fixed stalk up through the hollow rotor shaft, and it does not
   turn. The HAD's gun is NOT named "turret" (no def.turret, so the renderer
   would slew it by the accumulated heading) and the fixed wheels are NOT
   named "gear" (the renderer hides a "gear" node above 18 m).

   Materials are the house tiers: SKIN (one procedural CanvasTexture per
   scheme, roughness 0.86, metalness 0.08), METAL and DARK fittings, RUBBER,
   the BLADE composite, a STORES olive, GLASS, the TEAM flash and the DISC.
   Nine in all, thirteen draw calls. The skin UVs are projected from model
   space by face normal (top, port, starboard, belly bands of one sheet), so
   a camouflage patch is the same size in metres on a wing as on the boom.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTiger = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* Every number two parts must agree on lives here. x is measured from
     the rotor hub, forward positive; heights are above the ground. */
  var GROUND   = -1.60;                    /* wheel contact plane         */
  function Z(h) { return GROUND + h; }     /* height above ground -> z    */
  var X_NOSE   =  5.05;                    /* tip of the nose             */
  var HUB_H    =  3.70;                    /* blade plane; head top 3.83  */
  var ROTOR_R  =  6.50;                    /* 13.0 m disc                 */
  var CHORD    =  0.50;                    /* main blade chord            */
  var TR_R     =  1.35;                    /* 2.70 m tail rotor           */
  /* 13.07 m behind the nose; the starboard face of the fin gearbox */
  var TR_X = -8.02, TR_Y = -0.36, TR_H = 2.97;
  var NAC_Y    =  0.50;                    /* engine cowl centreline      */
  var WING_H   =  1.80;                    /* stub wing mid-plane         */
  var WING_ROOT = 0.40, WING_MID = 0.95, TIP_Y = 2.14;
  var PYL_IN   =  1.45, PYL_OUT = 2.08;    /* stores stations, each side  */
  var MW_X = 1.48, MW_Y = 1.20, MW_R = 0.28, MW_W = 0.18;   /* main wheels */
  var TW_X = -6.27, TW_R = 0.15, TW_W = 0.10;               /* tailwheel   */
  /* the fin, as its outline in the XZ plane (heights above ground): a
     thick swept pylon from the end of the boom to the tail gearbox, and
     above the gearbox a raked tip that carries the beacon */
  var FIN_LE0 = [-6.42, 1.82], FIN_TE0 = [-7.62, 1.70];
  var FIN_LE1 = [-7.64, 2.82], FIN_TE1 = [-8.58, 2.82];
  var FIN_LE2 = [-8.30, 3.32], FIN_TE2 = [-8.86, 3.32];
  /* the tailplane and its endplate fins, at the foot of the fin */
  var STAB_H = 1.45, STAB_Y0 = 0.10, STAB_Y1 = 1.27, EP_Y = 1.30;

  /* The three fits. scheme picks the paint; sight, gun and the two
     stations pick the kit. */
  var FITS = {
    had_e00: { scheme: "fr", sight: "strix", gun: true,  inner: "hellfire", outer: "telson12" },
    had_e20: { scheme: "fr", sight: "strix", gun: true,  inner: "hellfire", outer: "mistral" },
    uht:     { scheme: "de", sight: "mms",   gun: false, inner: "pars3",    outer: "stinger" },
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() below picks the band from each triangle's face normal.
     Each band gets its own patches, so the two sides are not mirror images
     of each other, which a sprayed scheme never is. The hexes sit darker
     than the paint chips, because the ACES pass lifts untextured mid tones
     by about 1.8x. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -9.3, UX1 = 5.4;               /* x covered across the sheet  */
  var QY = 2.4;                            /* |y| covered by top/belly    */
  var QZ0 = -1.3, QZ1 = 3.7;               /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }

  /* The ALAT's "centre Europe": olive green, a warm earth brown and black
     in broad bands that run diagonally across the airframe, green and
     brown in about equal share and black the narrowest. The Heer's Tiger:
     bronze green broken by large patches of basalt grey (the whole nose is
     often grey) and smaller ones of black-grey. */
  var SCHEMES = {
    fr: { base: "#58412b", p1: "#465231", p2: "#1c1d1a" },
    de: { base: "#3b4330", p1: "#4c5155", p2: "#25282a", n1: 8, n2: 7, r1: [0.9, 1.8], r2: [0.5, 0.9] },
  };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* One hard-edged camouflage patch: a long irregular band laid at a slant,
     as the Tiger's patterns run, rx along its length and ry across it. */
  function patch(g, cx, cy, rx, ry, rot, R) {
    var n = 16, i, a, k, pts = [];
    for (i = 0; i < n; i++) {
      a = i / n * PI * 2;
      k = 0.74 + R() * 0.42;
      pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
    }
    var c = Math.cos(rot), s = Math.sin(rot);
    g.beginPath();
    for (i = 0; i < n; i++) {
      var x = cx + pts[i][0] * c - pts[i][1] * s;
      var y = cy + pts[i][0] * s + pts[i][1] * c;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
    g.fill();
  }

  /* The ALAT pattern as the photographs show it: a handful of BROAD bands
     running diagonally round the airframe, not a fine stripe. Each edge
     is a line of [height above ground, x] stations, joined straight,
     read off the BJM 2018 starboard view (84 px/m) and checked against
     BIF's port side at Trident Juncture 2018 and BJI's at BALTOPS 2024.
     Nose to tail the colours run: black cap | brown | green | black |
     brown | green | black | brown. The cap reaches 1.0 m back along the
     top of the nose, 1.3 m at mid height and 1.6 m under the chin; the
     big green band takes in the wing root and the intake; the black
     band behind it frames the intake and runs up over the cowl behind the
     mast; the aft green covers the boom and the fin's leading edge, and
     the last black band crosses the end of the boom and climbs the fin
     to the tail rotor gearbox, the ventral fin black in front and brown
     behind. */
  var ALAT_EDGES = [
    [[0.6, 3.40], [0.9, 3.48], [1.35, 3.72], [1.7, 4.03], [2.2, 4.40]],
    [[0.6, 1.35], [1.0, 1.52], [1.4, 1.45], [1.8, 0.95], [2.1, 0.62], [3.6, 0.60]],
    [[0.6, -0.95], [1.5, -0.75], [2.4, -0.15], [2.9, -0.20], [3.2, -1.00], [3.6, -1.10]],
    [[0.6, -2.05], [2.0, -1.90], [2.6, -1.40], [3.6, -1.70]],
    [[0.6, -3.60], [1.0, -3.39], [2.0, -2.83], [2.5, -2.47], [3.0, -2.17], [3.6, -1.90]],
    [[0.4, -4.95], [1.0, -5.13], [1.6, -5.57], [1.85, -6.00], [2.0, -7.30], [2.8, -7.75], [3.6, -8.20]],
    [[0.4, -5.85], [1.0, -6.14], [1.5, -6.75], [1.9, -7.90], [2.8, -8.45], [3.6, -8.90]]
  ];
  /* where each edge crosses the top of the airframe (the nose, the
     canopy roof, the gearbox fairing, the cowls, the boom) and the belly;
     how far it leans across the top from port to starboard, as the bands
     wrap diagonally over the spine; and how far the port side's edge
     stands from the starboard one's, since a sprayed scheme is never a
     mirror image */
  var ALAT_TOP = [1.85, 3.30, 3.40, 3.40, 3.10, 1.80, 1.70];
  var ALAT_BELLY = 0.70;
  var ALAT_LEAN = [0.00, 0.30, -0.30, 0.35, -0.25, 0.30, 0.20];
  var ALAT_PORT = [0.00, 0.10, -0.12, 0.08, -0.10, 0.06, 0.04];

  function edgeX(E, h) {
    var i = 0;
    while (i < E.length - 2 && h > E[i + 1][0]) i++;
    var a = E[i], b = E[i + 1];
    return a[1] + (b[1] - a[1]) * (h - a[0]) / (b[0] - a[0]);
  }
  /* an edge as pixels down one paint band: down the side for the side
     bands, across from port to starboard for the top and the belly. The
     edge wanders a few centimetres, as a hand-sprayed line does. */
  function edgePts(i, b) {
    var pts = [], n = 12, k, t, x, y, E = ALAT_EDGES[i];
    for (k = 0; k <= n; k++) {
      t = k / n;
      var wob = 0.05 * Math.sin(t * 9.7 + i * 1.9 + b) + 0.03 * Math.sin(t * 23.0 + i * 4.1);
      if (b === 1 || b === 2) {
        var h = 5.4 - 5.2 * t;
        x = edgeX(E, h) + (b === 1 ? ALAT_PORT[i] : 0);
        y = pySide(Z(h), b);
      } else {
        var q = QY - 2 * QY * t;
        x = edgeX(E, b === 0 ? ALAT_TOP[i] : ALAT_BELLY) + ALAT_LEAN[i] * q * (b === 0 ? 1 : 0.4) +
            ALAT_PORT[i] * (q + QY) / (2 * QY);
        y = (b === 0 ? 0 : 3 * BAND) + pyTop(q);
      }
      pts.push([pxX(x + wob), y]);
    }
    return pts;
  }
  /* fill the band between two edges (a < 0: the front of the sheet) */
  function region(g, a, c, b) {
    var A = a < 0 ? edgePts(c, b).map(function (p) { return [TW + 8, p[1]]; }) : edgePts(a, b);
    var C = edgePts(c, b), i;
    g.beginPath();
    g.moveTo(A[0][0], A[0][1]);
    for (i = 1; i < A.length; i++) g.lineTo(A[i][0], A[i][1]);
    for (i = C.length - 1; i >= 0; i--) g.lineTo(C[i][0], C[i][1]);
    g.closePath(); g.fill();
  }

  /* the Bundeswehr's low-visibility Balkenkreuz: a black cross whose arms
     widen to the ends, edged in white. rx and ry are its half-width and
     half-height in pixels, given apart because the side bands do not map
     a metre to the same number of pixels along x as up z (SX against SZ);
     one radius for both drew the cross 1.36 times taller than wide. */
  function balken(g, cx, cy, rx, ry) {
    function cross(q, w) {
      var P = [[-w, -w], [-q * 0.42, -q], [q * 0.42, -q], [w, -w], [q, -q * 0.42], [q, q * 0.42],
               [w, w], [q * 0.42, q], [-q * 0.42, q], [-w, w], [-q, q * 0.42], [-q, -q * 0.42]];
      g.beginPath();
      for (var i = 0; i < P.length; i++) {
        if (i) g.lineTo(cx + P[i][0] * rx, cy + P[i][1] * ry);
        else g.moveTo(cx + P[i][0] * rx, cy + P[i][1] * ry);
      }
      g.closePath(); g.fill();
    }
    g.fillStyle = "#d9d9d2"; cross(1.12, 0.24);
    g.fillStyle = "#151617"; cross(1, 0.16);
  }

  function skinCanvas(key) {
    var S = SCHEMES[key];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(key === "fr" ? 6651 : 7447);
    var i, b, x, y;
    var SQ = BAND / (2 * QY), SZ = BAND / (QZ1 - QZ0);   /* px per metre */

    g.fillStyle = S.base; g.fillRect(0, 0, TW, TH);

    /* ---- the ALAT pattern over the brown base, band by band, top and
       belly included: the black nose cap, the two green bands and the two
       black ones between the edges above. */
    if (key === "fr") {
      for (b = 0; b < 4; b++) {
        g.save();
        g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
        g.fillStyle = S.p2; region(g, -1, 0, b);
        g.fillStyle = S.p1; region(g, 1, 2, b);
        g.fillStyle = S.p2; region(g, 2, 3, b);
        g.fillStyle = S.p1; region(g, 4, 5, b);
        g.fillStyle = S.p2; region(g, 5, 6, b);
        g.restore();
      }
    }
    /* ---- the Heer's pattern, band by band, top and belly included: the
       grey patches first, the black-grey over them; each is 0.9-1.8 m long
       and laid 25-45 degrees off the fuselage line. */
    for (b = 0; key === "de" && b < 4; b++) {
      g.save();
      g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
      var flatBand = (b === 0 || b === 3), sy = flatBand ? SQ : SZ;
      var cyAt = function () {
        return flatBand ? b * BAND + (0.05 + R() * 0.9) * BAND
                        : pySide(QZ0 + 0.8 + R() * (QZ1 - QZ0 - 0.8), b);
      };
      for (i = 0; i < S.n1 * 2; i++) {
        var r1 = S.r1[0] + R() * (S.r1[1] - S.r1[0]);
        x = UX0 + (i + R() * 0.8) / (S.n1 * 2) * (UX1 - UX0);
        g.fillStyle = S.p1;
        patch(g, pxX(x), cyAt(), r1 * SX, r1 * 0.45 * sy, (b === 2 ? -1 : 1) * (0.45 + R() * 0.25), R);
      }
      for (i = 0; i < S.n2 * 2; i++) {
        var r2 = S.r2[0] + R() * (S.r2[1] - S.r2[0]);
        x = UX0 + (i + R() * 0.9) / (S.n2 * 2) * (UX1 - UX0);
        g.fillStyle = S.p2;
        patch(g, pxX(x), cyAt(), r2 * SX, r2 * 0.40 * sy, (b === 2 ? -1 : 1) * (0.50 + R() * 0.3), R);
      }
      g.restore();
    }
    /* the Heer's Tigers wear the whole nose in the grey */
    if (key === "de") {
      g.fillStyle = S.p1;
      for (b = 0; b < 4; b++) g.fillRect(pxX(3.9), b * BAND, TW - pxX(3.9), BAND);
    }

    /* ---- sun on the top band, grime down the sides ---- */
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 160; i++) {
      g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 40);
    }
    /* ---- exhaust soot: the MTR390 outlets blow up and aft from the step
       in each cowl, so the soot lies on the cowl tails and the top of the
       boom behind them, x -2.4 to -5.5 */
    var sg = g.createLinearGradient(pxX(-2.4), 0, pxX(-5.5), 0);
    sg.addColorStop(0, "rgba(18,17,15,0.45)");
    sg.addColorStop(1, "rgba(18,17,15,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-5.5), pyTop(1.0), pxX(-2.4) - pxX(-5.5), pyTop(-1.0) - pyTop(1.0));
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(-5.5), pySide(Z(3.0), b), pxX(-2.4) - pxX(-5.5), pySide(Z(2.0), b) - pySide(Z(3.0), b));

    /* ---- panel seams: frames across the airframe at real stations ---- */
    var frames = [4.70, 4.20, 3.78, 3.05, 2.39, 1.60, 0.90, 0.40, -0.40, -1.50,
                  -2.30, -2.90, -3.50, -4.20, -5.10, -6.00, -6.80, -7.60, -8.40];
    g.lineWidth = 1.6;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.06)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.6, 1.6);
    }
    /* stringers: side bands at real heights, top band along the spine
       and the nacelle tops */
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.4;
    [0.95, 1.35, 1.75, 2.30, 2.85].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    [-0.85, -0.30, 0.30, 0.85, -1.6, 1.6].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
    });
    /* access hatches and their fasteners */
    g.lineWidth = 1.3;
    for (i = 0; i < 80; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 12 + R() * 34, hh = 10 + R() * 22;
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.strokeRect(hx, hy, hw, hh);
      g.fillStyle = "rgba(0,0,0,0.26)";
      g.fillRect(hx + 2, hy + 2, 2, 2); g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
    }
    /* the big avionics bay doors below the rear cockpit, both sides */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 2;
      g.strokeRect(pxX(0.10), pySide(Z(1.62), b), pxX(1.00) - pxX(0.10), pySide(Z(0.95), b) - pySide(Z(1.62), b));
      g.strokeRect(pxX(3.25), pySide(Z(1.70), b), pxX(4.15) - pxX(3.25), pySide(Z(1.08), b) - pySide(Z(1.70), b));
    }
    /* ---- the Heer's Balkenkreuz on the boom, both sides, 4.1 m behind
       the hub (74+54, Airpower 2022) ---- */
    if (key === "de") {
      balken(g, pxX(-4.10), pySide(Z(1.36), 1), 0.21 * SX, 0.21 * SZ);
      balken(g, pxX(-4.10), pySide(Z(1.36), 2), 0.21 * SX, 0.21 * SZ);
    }
    /* the belly: the same scheme, dirtier, with oil weep under the engines */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }
    var zb = g.createLinearGradient(pxX(0.6), 0, pxX(-4.5), 0);
    zb.addColorStop(0, "rgba(22,20,16,0.28)");
    zb.addColorStop(1, "rgba(22,20,16,0)");
    g.fillStyle = zb; g.fillRect(pxX(-4.5), 3 * BAND, pxX(0.6) - pxX(-4.5), BAND);
    return cv;
  }

  var _tex = {};                           /* module scope: one per scheme */
  function skinTexture(key) {
    if (_tex[key] !== undefined) return _tex[key];
    try {
      var t = new V.CanvasTexture(skinCanvas(key));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[key] = t;
    } catch (e) { _tex[key] = false; }
    return _tex[key];
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft (the nose, intake faces, leading edges) would collapse to a line
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
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0)      { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = 3 * BAND + pyTop(y); }
        else                 { U = pxX(endOn ? x + y : x); W = pySide(z, band); }
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
  function makeMats(C, fit) {
    var tex = skinTexture(fit.scheme);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SCHEMES[fit.scheme].base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1d2022, roughness: 0.64, metalness: 0.35 });
    /* composite blades, painted and weathered to a flat dark grey-green */
    m.blade  = new V.MeshStandardMaterial({ color: 0x2b2f2b, roughness: 0.82, metalness: 0.08 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* launchers, pods and missiles: ordnance olive, not the camouflage */
    m.store  = new V.MeshStandardMaterial({ color: 0x464b37, roughness: 0.80, metalness: 0.10 });
    /* flat-panel canopies and sight windows: dark, with a hard coat */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    /* The flash is exactly C.team; the emissive keeps it from greying out
       under ACES. */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
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
  /* a round bar from p to q, capped */
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
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
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
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
  /* push a port part and its starboard twin */
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
  /* A closed solid between two sections with the same number of corners,
     each a convex polygon: a wing, the tailplane, the fin, an endplate.
     convex() cannot be trusted with these. It winds each face by its side
     of the solid's centre, and on a plate 5 cm thick that is swept and
     tapered over a metre, a side triangle's own tilt can outweigh the
     half-thickness and flip it: the first cut of the endplates came out
     with a third of their faces inside out. Here the winding follows from
     the sections instead: both are put in the same turning sense about
     the axis from A's centre to B's, and every side quad is then wound
     outward by construction, the caps facing away from each other. */
  function solid(A, B) {
    var n = A.length, i, j, cA = [0, 0, 0], cB = [0, 0, 0], nA = [0, 0, 0], out = [];
    for (i = 0; i < n; i++) for (j = 0; j < 3; j++) { cA[j] += A[i][j] / n; cB[j] += B[i][j] / n; }
    for (i = 0; i < n; i++) {                /* Newell normal of A */
      var p = A[i], q = A[(i + 1) % n];
      nA[0] += (p[1] - q[1]) * (p[2] + q[2]);
      nA[1] += (p[2] - q[2]) * (p[0] + q[0]);
      nA[2] += (p[0] - q[0]) * (p[1] + q[1]);
    }
    if (nA[0] * (cB[0] - cA[0]) + nA[1] * (cB[1] - cA[1]) + nA[2] * (cB[2] - cA[2]) < 0) {
      A = A.slice().reverse(); B = B.slice().reverse();
    }
    for (i = 0; i < n; i++) {
      var k = (i + 1) % n;
      out.push(A[i], A[k], B[k], A[i], B[k], B[i]);
    }
    for (i = 1; i < n - 1; i++) { out.push(A[0], A[i + 1], A[i]); out.push(B[0], B[i], B[i + 1]); }
    return tris(out);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z] (or a
     chord line tilted in XZ, as at the fin root); at(x, z, k) turns
     chord-plane coordinates and the thickness offset k into a point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     faceted where e is low, round where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
       yc       centreline offset (engine nacelles)
     Heights are given ABOVE GROUND and converted here. Sections run from
     nose to tail (decreasing x), and the quads are wound (a, c, b), which
     for that order puts every normal outward. The signed volume of every
     closed piece is checked positive with the model tool. */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {                       /* belly, up the port side, to the top */
      var th = -PI / 2 + PI * i / n, c = Math.cos(th), sn = Math.sin(th);
      var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
      var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
      var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
      pts.push([W * Math.pow(Math.abs(c), s.e), z]);
    }
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);   /* and down starboard */
    for (i = 0; i < pts.length; i++) pts[i][0] += s.yc;
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
    /* domed end caps: a fan to a centre point pushed out along x */
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
  /* a solid of revolution about model x from an (x, r) profile, front to
     back; LatheGeometry turns about Y, so it is built there and laid down */
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);                       /* lathe -Y (front) -> model +X */
    g.translate(0, y, z);
    return g;
  }

  /* ========================================================= the stores ==
     Each builder hangs one station's load, port side, under a pylon whose
     lower face is at height top; the caller mirrors it. */

  /* M299 launcher, four AGM-114 Hellfire II: a spine under the pylon with a
     rail each side at two levels. The missile is 1.63 m long and 0.178 m
     across, with a dark seeker dome and a cruciform of wings and fins. */
  function hellfires(L, y0, top) {
    var s, k;
    L.store.push(box(1.48, 0.09, 0.44, -0.02, y0, Z(top - 0.22)));
    L.store.push(box(1.30, 0.40, 0.04, -0.02, y0, Z(top - 0.05)));
    L.store.push(box(1.30, 0.40, 0.04, -0.02, y0, Z(top - 0.31)));
    var MR = 0.089, ML = 1.40;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var my = y0 + s * 0.15, mz = Z(top - 0.16 - k * 0.26), mx = 0.02;
      L.store.push(cyl(MR, MR, ML, 8, "x", mx, my, mz, true));
      L.dark.push(sph(MR, 8, 3, mx + ML / 2, my, mz, 1.9, 1, 1));
      L.store.push(disc(MR, 8, [mx - ML / 2, my, mz], [-1, 0, 0]));
      L.store.push(box(0.12, 0.34, 0.012, mx + 0.30, my, mz, 0.785, 0, 0));
      L.store.push(box(0.12, 0.34, 0.012, mx + 0.30, my, mz, -0.785, 0, 0));
      L.store.push(box(0.10, 0.26, 0.012, mx - 0.64, my, mz, 0.785, 0, 0));
      L.store.push(box(0.10, 0.26, 0.012, mx - 0.64, my, mz, -0.785, 0, 0));
    }
  }
  /* PARS 3 LR: never seen on the Tiger as bare rounds. Four of them (1.60 m
     long, 0.159 m across) ride in one closed, square launcher, which
     keeps splinters off them and pre-cools their seekers; the rounds are
     slid in from behind, each in its own canister. The launcher is a
     round-edged box, about 1.8 m long, 0.52 m wide and 0.60 m deep (sized
     on the rounds it holds and on its four covers in "ILA 2010 Samstag
     041" and the EN-wiki "Eurocopter Tiger 2"), whose top rolls down in
     a broad radius to a flat front carrying the four domed frangible
     covers two by two, a hinge bar between each pair. At the back, the
     four canister ends. It hangs straight off the inner pylon. */
  function pars3(L, y0, top) {
    var s, k, H = 0.60, HW = 0.26, X0 = 1.00, X1 = -0.80;
    function bx(x, zb, zt, w) { return sec(x, top - H + zb, top - zt, top - H / 2, w, w, w, 0.30, y0); }
    var BOX = [bx(X0, 0.03, 0.13, HW - 0.02), bx(X0 - 0.03, 0.01, 0.07, HW),
               bx(X0 - 0.13, 0.00, 0.02, HW), bx(X0 - 0.30, 0.00, 0.00, HW),
               bx(X1 + 0.02, 0.00, 0.00, HW), bx(X1, 0.01, 0.01, HW - 0.01)];
    var lb = loft(BOX, 8, 0.004, 0.004);
    for (k = 0; k < lb.length; k++) L.store.push(lb[k]);
    /* the covers: the lower pair low on the face, the upper pair under the
       rolled top, each 0.22 m across and standing 0.06 m proud */
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var cy = y0 + s * 0.12, cz = Z(top - H + 0.14 + k * 0.22);
      L.store.push(sph(0.11, 10, 5, X0, cy, cz, 0.55, 1, 1));
      /* the canister end at the back */
      L.dark.push(disc(0.085, 10, [X1 - 0.006, cy, cz], [-1, 0, 0]));
    }
    L.dark.push(box(0.05, 0.04, 0.44, X0 + 0.02, y0, Z(top - H + 0.25)));
  }
  /* Telson 12: a round pod of twelve 68 mm tubes, 1.35 m long, the mouths
     in a ring of nine round three. */
  function telson12(L, y0, top) {
    var PR = 0.185, pz = Z(top - 0.06 - PR), k, a;
    L.store.push(box(0.36, 0.08, 0.10, -0.06, y0, Z(top - 0.04)));
    L.store.push(latheX([[0.62, 0.0], [0.62, 0.17], [0.60, PR], [-0.60, PR],
                         [-0.70, 0.16], [-0.74, 0.10], [-0.74, 0.0]], 14, y0, pz));
    L.metal.push(cyl(PR + 0.008, PR + 0.008, 0.05, 14, "x", 0.40, y0, pz, true));
    L.metal.push(cyl(PR + 0.008, PR + 0.008, 0.05, 14, "x", -0.40, y0, pz, true));
    var mouths = [];
    for (k = 0; k < 9; k++) { a = k * 2 * PI / 9; mouths.push([Math.cos(a) * 0.125, Math.sin(a) * 0.125]); }
    for (k = 0; k < 3; k++) { a = k * 2 * PI / 3 + PI / 6; mouths.push([Math.cos(a) * 0.045, Math.sin(a) * 0.045]); }
    for (k = 0; k < mouths.length; k++)
      L.dark.push(disc(0.034, 6, [0.625, y0 + mouths[k][0], pz + mouths[k][1]], [1, 0, 0]));
  }
  /* A twin launcher: two tubes side by side under a short beam - Mistral
     (1.95 m tubes, 0.13 m across) on the HAD, Stinger (1.52 m, 0.09 m) on
     the UHT. The front caps are the frangible covers, domed on Mistral. */
  function twin(L, y0, top, len, r, dome) {
    var s;
    L.store.push(box(len * 0.50, 0.08, 0.10, -0.05, y0, Z(top - 0.05)));
    L.store.push(box(len * 0.46, 0.30, 0.04, -0.05, y0, Z(top - 0.11)));
    for (s = -1; s <= 1; s += 2) {
      var ty = y0 + s * (r + 0.02), tz = Z(top - 0.13 - r);
      L.store.push(cyl(r, r, len, 10, "x", -0.05 + len * 0.02, ty, tz));
      if (dome) L.dark.push(sph(r, 10, 4, -0.05 + len * 0.52, ty, tz, 0.9, 1, 1));
      L.metal.push(cyl(r + 0.01, r + 0.01, 0.05, 10, "x", -0.05 + len * 0.30, ty, tz, true));
      L.metal.push(cyl(r + 0.01, r + 0.01, 0.05, 10, "x", -0.05 - len * 0.25, ty, tz, true));
    }
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, fit) {
    V = THREE;
    var T = makeMats(C, fit);
    var g = new V.Group();
    g.name = "tiger_" + (fit.sight === "mms" ? "uht" : "had");
    var i, k, s, a;
    var skin = [], dark = [], metal = [], store = [], rubber = [], team = [], glass = [];
    var L = { skin: skin, dark: dark, metal: metal, store: store, glass: glass };

    /* --------------------------------------------------- the fuselage ----
       A slim, faceted body: the blunt nose with the pilot's sensor in its
       tip, the pilot's sill at 1.97-2.05 m, a small step 2.4 m ahead of the
       hub to the gunner's sill at 2.13 m, and behind the gunner a bulkhead
       up into the gearbox fairing, which stands 3.55 m high just behind the
       mast. Behind the gearbox the top falls away over the engine bay to
       the boom, which is deep (1.2 m at 4 m behind the hub) and tapers to
       the fin. The belly runs almost straight at 0.62-0.80 m from the chin
       to the boom. Every height here was traced over the BJM photograph.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 5.00, 1.33, 1.56, 1.45, 0.10, 0.15, 0.09, 0.80),
      sec( 4.90, 1.24, 1.62, 1.43, 0.18, 0.25, 0.15, 0.70),
      sec( 4.68, 1.11, 1.69, 1.40, 0.24, 0.33, 0.21, 0.60),
      sec( 4.35, 0.99, 1.79, 1.36, 0.32, 0.43, 0.29, 0.52),
      sec( 3.95, 0.90, 1.91, 1.32, 0.37, 0.49, 0.34, 0.46),
      sec( 3.78, 0.87, 1.97, 1.32, 0.38, 0.50, 0.36, 0.45),
      sec( 3.05, 0.80, 2.00, 1.33, 0.40, 0.52, 0.38, 0.42),
      sec( 2.42, 0.76, 2.05, 1.34, 0.41, 0.53, 0.39, 0.42),
      sec( 2.34, 0.75, 2.13, 1.35, 0.41, 0.53, 0.39, 0.42),
      sec( 1.50, 0.70, 2.21, 1.38, 0.42, 0.54, 0.40, 0.42),
      sec( 0.92, 0.66, 2.28, 1.42, 0.43, 0.55, 0.41, 0.42),
      sec( 0.84, 0.66, 3.08, 1.52, 0.43, 0.56, 0.36, 0.44),
      sec( 0.40, 0.64, 3.32, 1.60, 0.44, 0.57, 0.34, 0.46),
      sec( 0.00, 0.63, 3.44, 1.64, 0.44, 0.57, 0.33, 0.46),
      sec(-0.40, 0.62, 3.56, 1.68, 0.44, 0.57, 0.32, 0.44),
      sec(-1.50, 0.63, 3.55, 1.70, 0.43, 0.55, 0.32, 0.44),
      sec(-2.00, 0.65, 3.36, 1.68, 0.41, 0.52, 0.30, 0.48),
      sec(-2.40, 0.67, 3.06, 1.64, 0.39, 0.49, 0.29, 0.52),
      sec(-2.90, 0.69, 2.74, 1.58, 0.36, 0.45, 0.27, 0.55),
      sec(-3.50, 0.72, 2.43, 1.50, 0.33, 0.40, 0.25, 0.57),
      sec(-4.10, 0.74, 2.13, 1.40, 0.29, 0.35, 0.23, 0.60),
      sec(-4.70, 0.76, 1.97, 1.36, 0.27, 0.32, 0.21, 0.61),
      sec(-5.30, 0.77, 1.91, 1.35, 0.25, 0.30, 0.20, 0.62),
      sec(-6.00, 0.80, 1.86, 1.34, 0.22, 0.26, 0.17, 0.64),
      sec(-6.80, 0.88, 1.84, 1.36, 0.18, 0.21, 0.14, 0.68),
      sec(-7.40, 1.02, 1.78, 1.40, 0.13, 0.15, 0.10, 0.74),
      sec(-7.75, 1.18, 1.66, 1.42, 0.07, 0.08, 0.06, 0.82),
    ];
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), o = {};
          ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (kk) {
            o[kk] = A[kk] + (B[kk] - A[kk]) * f;
          });
          return o;
        }
      }
      return null;
    }
    var fl = loft(FUS, 12, 0.03, 0.05);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);

    /* ---------------------------------------------- engine nacelles ----
       The two MTR390s lie side by side in the upper fuselage, under cowls
       that bulge out either side of the gearbox fairing, 1.7 m across the
       pair at the intakes. Each cowl opens at the front, right beside the
       mast, in a big oval intake behind a mesh screen that faces forward
       and a little outboard; its top steps down 2.3 m behind the mast at
       the exhaust, which the Tiger turns up and aft; and behind that step
       the cowl tapers into the top of the boom 4.5 m back. */
    var NAC = [
      sec( 0.06, 2.24, 3.08, 2.64, 0.24, 0.30, 0.22, 0.55, NAC_Y),
      sec(-0.40, 2.14, 3.20, 2.64, 0.29, 0.35, 0.25, 0.50, NAC_Y),
      sec(-1.60, 2.10, 3.20, 2.60, 0.29, 0.35, 0.25, 0.50, NAC_Y),
      sec(-2.22, 2.06, 3.12, 2.56, 0.28, 0.34, 0.24, 0.50, NAC_Y),
      sec(-2.40, 2.04, 2.86, 2.48, 0.27, 0.33, 0.23, 0.52, NAC_Y),
      sec(-3.20, 1.98, 2.66, 2.34, 0.23, 0.28, 0.19, 0.56, NAC_Y),
      sec(-4.00, 1.95, 2.40, 2.18, 0.16, 0.20, 0.13, 0.62, NAC_Y - 0.06),
      sec(-4.50, 1.98, 2.20, 2.09, 0.07, 0.09, 0.06, 0.75, NAC_Y - 0.14),
    ];
    var nac = loft(NAC, 10, 0.03, 0.04);
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    /* the intake, built facing +X and turned 25 degrees outboard: an oval
       rolled lip, the dark duct and the screen standing in it */
    var inlet = [place(new V.TorusGeometry(0.21, 0.045, 4, 16), 0, 0, 0, 0, PI / 2, 0)];
    inlet[0].scale(1, 1, 1.45);
    var inD = disc(0.215, 16, [0, 0, 0], [1, 0, 0]); inD.scale(1, 1, 1.45); inD.translate(-0.03, 0, 0);
    var inM = sph(0.17, 10, 5, 0, 0, 0, 0.35, 1, 1.45); inM.translate(-0.05, 0, 0);
    [[inlet[0], skin], [inD, dark], [inM, metal]].forEach(function (pr) {
      pr[0].rotateZ(25 * D2R);
      pr[0].translate(0.10, NAC_Y + 0.08, Z(2.64));
      both(pr[1], pr[0]);
    });
    /* the exhaust: a soot-black oval in the step, facing up and aft */
    var ex = disc(0.20, 12, [0, 0, 0], [0, 0, 1]);
    ex.scale(0.75, 1, 1);
    ex.rotateY(-58 * D2R);
    ex.translate(-2.33, NAC_Y + 0.04, Z(2.99));
    both(dark, ex);

    /* --------------------------------------------------- stub wings ----
       Short, straight and level, a thick fairing where they leave the
       fuselage under the engines, then a square-ended beam 0.6-0.7 m in
       chord out to a downturned tip that carries the outer pylon. */
    function wingAt(y) { return function (x, z, kk) { return [x, y, Z(WING_H) + kk]; }; }
    var wRoot = foil([0.78, 0], [-0.82, 0], 0.42, wingAt(WING_ROOT));
    var wMid  = foil([0.42, 0], [-0.36, 0], 0.32, wingAt(WING_MID));
    var wTip  = foil([0.36, 0], [-0.28, 0], 0.27, wingAt(TIP_Y));
    both(skin, solid(wRoot, wMid));
    both(skin, solid(wMid, wTip));
    /* the tip fairing, turned down over the outer station, and its light */
    both(skin, box(0.60, 0.13, 0.30, 0.03, TIP_Y + 0.05, Z(WING_H - 0.06)));
    both(skin, sph(0.065, 8, 4, 0.33, TIP_Y + 0.05, Z(WING_H - 0.06), 1, 1, 2.3));
    both(dark, sph(0.035, 6, 3, 0.20, TIP_Y + 0.12, Z(WING_H - 0.02)));
    /* pylons: deep beams, their tops buried in the wing */
    var WBOT = WING_H - 0.10;
    both(skin, box(0.72, 0.10, 0.20, 0.00, PYL_IN, Z(WBOT - 0.08)));
    both(skin, box(0.58, 0.10, 0.16, 0.03, PYL_OUT, Z(WBOT - 0.22)));
    var inTop = WBOT - 0.18, outTop = WBOT - 0.30;
    var P = { skin: [], dark: [], metal: [], store: [], glass: [] };
    if (fit.inner === "hellfire") hellfires(P, PYL_IN, inTop);
    else pars3(P, PYL_IN, inTop);
    if (fit.outer === "telson12") telson12(P, PYL_OUT, outTop);
    else if (fit.outer === "mistral") twin(P, PYL_OUT, outTop, 1.95, 0.065, true);
    else twin(P, PYL_OUT, outTop, 1.52, 0.045, false);
    ["skin", "dark", "metal", "store", "glass"].forEach(function (kk) {
      for (var q = 0; q < P[kk].length; q++) both(L[kk], P[kk][q]);
    });

    /* ------------------------------------------------------ the nose ----
       The pilot's night sensor looks out of the tip of the nose through
       two round windows side by side in a dark recessed housing, on the
       HAP/HAD and the UHT alike (HAP close-up, Andre Gerwing 007649). */
    var hsg = disc(0.10, 14, [0, 0, 0], [1, 0, 0]);
    hsg.scale(1, 1.25, 0.75);
    hsg.translate(5.024, 0, Z(1.45));
    dark.push(hsg);
    glass.push(disc(0.042, 10, [5.030, 0.060, Z(1.45)], [1, 0, 0]));
    glass.push(disc(0.042, 10, [5.030, -0.060, Z(1.45)], [1, 0, 0]));

    /* ---------------------------------------------- the HAD's chin gun --
       The THL 30 turret hangs under the nose, ahead of the pilot's feet:
       a squat drum under a boxy cradle, the 30M781 gun reaching 1.0 m past
       the nose, a little depressed. */
    if (fit.gun) {
      var GX = 4.40, GH = 0.74;
      dark.push(cyl(0.21, 0.23, 0.12, 14, "z", GX, 0, Z(0.96)));
      dark.push(box(0.62, 0.42, 0.26, GX - 0.02, 0, Z(0.80)));
      both(dark, box(0.40, 0.05, 0.22, GX + 0.02, 0.19, Z(GH)));
      var gunDip = -3 * D2R;
      var gun = [box(0.66, 0.16, 0.18, 0.00, 0, 0),
                 cyl(0.050, 0.050, 0.34, 10, "x", 0.50, 0, 0),
                 cyl(0.032, 0.032, 1.04, 8, "x", 1.19, 0, 0),
                 cyl(0.048, 0.048, 0.13, 8, "x", 1.64, 0, 0)];
      for (i = 0; i < gun.length; i++) {
        gun[i].rotateY(-gunDip);
        gun[i].translate(GX, 0, Z(GH));
        dark.push(gun[i]);
      }
    } else {
      /* ------------------------------------ the UHT's Pilot Sight Unit --
         No gun: in its place the pilot's steerable FLIR, a squat black
         drum on a vertical axis hanging under the nose tip, 0.32 m across
         and 0.23 m deep below the skin, its axis 0.25 m behind the tip, its
         window facing ahead (74+53 close up, 2016; 74+25 in flight, 2024,
         scaled on its 0.56 m main wheels). Its top is sunk 5 cm into the
         nose so no daylight shows between them. */
      var FX = X_NOSE - 0.25, FT = fusAt(FX).zb + 0.05;
      dark.push(cyl(0.16, 0.16, 0.28, 16, "z", FX, 0, FT - 0.14));
      glass.push(box(0.03, 0.15, 0.09, FX + 0.152, 0, FT - 0.18));
    }

    /* ---------------------------------------------------- the cockpits --
       Flat-panelled canopies in heavy frames, stepped in tandem. The pilot
       sits in front under a raked windscreen; the gunner behind him and
       higher, his windscreen rising off the pilot's roof, his roof ending
       against the bulkhead under the gearbox fairing. */
    function pane(pts) {
      /* pts: [x, y, h] with y >= 0; mirrored to make the solid */
      return { P: pts.map(function (p) { return [p[0], p[1], Z(p[2])]; }),
               S: pts.map(function (p) { return [p[0], -p[1], Z(p[2])]; }) };
    }
    /* sill front, windscreen base, windscreen top, roof rear, sill rear */
    var cf = pane([[3.80, 0.36, 1.96], [3.78, 0.29, 2.00], [3.38, 0.24, 2.54],
                   [2.39, 0.25, 2.60], [2.39, 0.39, 2.04]]);
    var cr = pane([[2.39, 0.39, 2.12], [2.38, 0.28, 2.60], [2.15, 0.25, 3.09],
                   [0.90, 0.27, 3.09], [0.90, 0.41, 2.28]]);
    function canopy(c) {
      var Pp = c.P, Sp = c.S;
      glass.push(convex([
        [Pp[0], Pp[1], Pp[2], Pp[3], Pp[4]], [Sp[0], Sp[1], Sp[2], Sp[3], Sp[4]],
        [Pp[0], Sp[0], Sp[1], Pp[1]], [Pp[1], Sp[1], Sp[2], Pp[2]], [Pp[2], Sp[2], Sp[3], Pp[3]],
        [Pp[3], Sp[3], Sp[4], Pp[4]], [Pp[4], Sp[4], Sp[0], Pp[0]]]));
      var fr = 0.032, e, edges = [];
      for (e = 0; e < 5; e++) { edges.push([Pp[e], Pp[(e + 1) % 5]]); edges.push([Sp[e], Sp[(e + 1) % 5]]); }
      edges.push([Pp[1], Sp[1]], [Pp[2], Sp[2]], [Pp[3], Sp[3]]);
      for (e = 0; e < edges.length; e++) skin.push(bar(edges[e][0], edges[e][1], fr, 4));
      /* the door frame half way along each side */
      for (e = 0; e < 2; e++) {
        var Q = e ? Sp : Pp;
        var pb = [(Q[0][0] + Q[4][0]) / 2, (Q[0][1] + Q[4][1]) / 2, (Q[0][2] + Q[4][2]) / 2];
        var pt = [(Q[2][0] + Q[3][0]) / 2, (Q[2][1] + Q[3][1]) / 2, (Q[2][2] + Q[3][2]) / 2];
        skin.push(bar(pb, pt, fr * 0.9, 4));
      }
    }
    canopy(cf);
    canopy(cr);

    /* ------------------------------------------------- the HAD's Strix --
       The gunner's roof sight: a drum on its side, 0.55 m across, carried
       on a short pedestal over the back of the rear canopy, with its day
       window and its round thermal window facing ahead. */
    if (fit.sight === "strix") {
      var SXP = 0.98, SHP = 3.38;
      skin.push(cyl(0.13, 0.16, 0.26, 12, "z", SXP, 0, Z(3.13)));
      skin.push(cyl(0.26, 0.26, 0.40, 16, "y", SXP, 0, Z(SHP)));
      both(skin, sph(0.26, 12, 6, SXP, 0.20, Z(SHP), 1, 0.30, 1));
      glass.push(box(0.03, 0.15, 0.13, SXP + 0.255, 0.09, Z(SHP + 0.02)));
      glass.push(disc(0.075, 12, [SXP + 0.262, -0.10, Z(SHP + 0.01)], [1, 0, 0]));
    }

    /* ------------------------------------------------ fin and tailplane --
       The fin is a thick swept pylon carrying the tail rotor drive to the
       gearbox 2.97 m up, with a raked tip above it that carries the
       beacon. Its root aerofoil lies along the end of the boom. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var fin0 = foil([FIN_LE0[0], Z(FIN_LE0[1])], [FIN_TE0[0], Z(FIN_TE0[1])], 0.26, finAt);
    var fin1 = foil([FIN_LE1[0], Z(FIN_LE1[1])], [FIN_TE1[0], Z(FIN_TE1[1])], 0.20, finAt);
    var fin2 = foil([FIN_LE2[0], Z(FIN_LE2[1])], [FIN_TE2[0], Z(FIN_TE2[1])], 0.09, finAt);
    skin.push(solid(fin0, fin1));
    skin.push(solid(fin1, fin2));
    /* the tail gearbox bulge on the starboard face, under the rotor hub */
    skin.push(sph(0.22, 12, 6, TR_X, -0.10, Z(TR_H), 1.40, 0.80, 1.15));
    dark.push(sph(0.04, 6, 3, -8.40, 0, Z(3.36)));
    /* the ventral fin under the end of the boom, which carries the
       tailwheel 0.4 m off the ground */
    var VF = [[-5.30, 0.78], [-5.90, 0.42], [-6.75, 0.40], [-7.25, 0.95], [-6.60, 0.95]];
    var vfP = VF.map(function (p) { return [p[0], 0.07, Z(p[1])]; });
    var vfS = VF.map(function (p) { return [p[0], -0.07, Z(p[1])]; });
    skin.push(solid(vfP, vfS));
    /* the tailplane, 2.6 m over the endplates, 0.86 m chord at the root */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    both(skin, solid(foil([-7.42, 0], [-8.28, 0], 0.11, stabAt(STAB_Y0)),
                     foil([-7.52, 0], [-8.26, 0], 0.08, stabAt(STAB_Y1))));
    /* its endplate fins, swept and reaching well above the tailplane */
    function epAt(z0) { return function (x, z, kk) { return [x, EP_Y + kk, Z(z0)]; }; }
    both(skin, solid(foil([-7.28, 0], [-7.98, 0], 0.07, epAt(0.95)),
                     foil([-7.92, 0], [-8.62, 0], 0.05, epAt(2.22))));

    /* ---------------------------------------------- the undercarriage ----
       Fixed, tailwheel type. Each main wheel is on a trailing arm from the
       belly with a long oleo leaning forward and in to the fuselage side
       under the pilot's canopy. The tailwheel trails on a short fork under
       the ventral fin. */
    var axle = [MW_X + 0.02, MW_Y - MW_W / 2 - 0.02, Z(MW_R)];
    both(metal, bar([2.18, 0.44, Z(0.72)], axle, 0.055, 8));
    both(metal, bar([MW_X + 0.08, 1.00, Z(0.40)], [2.00, 0.74, Z(1.05)], 0.065, 8));
    both(metal, bar([2.00, 0.74, Z(1.05)], [2.34, 0.52, Z(1.58)], 0.085, 8));
    both(metal, box(0.30, 0.12, 0.14, 2.34, 0.50, Z(1.58)));
    both(metal, cyl(0.045, 0.045, 0.20, 8, "y", MW_X, MW_Y - 0.12, Z(MW_R)));
    both(rubber, cyl(MW_R, MW_R, MW_W, 18, "y", MW_X, MW_Y, Z(MW_R)));
    both(metal, cyl(0.15, 0.15, MW_W + 0.01, 12, "y", MW_X, MW_Y, Z(MW_R)));
    metal.push(bar([-6.10, 0, Z(0.46)], [TW_X + 0.05, 0, Z(TW_R + 0.05)], 0.045, 8));
    both(metal, box(0.06, 0.03, 0.20, TW_X + 0.02, TW_W / 2 + 0.03, Z(0.22)));
    metal.push(cyl(0.03, 0.03, TW_W + 0.10, 8, "y", TW_X, 0, Z(TW_R)));
    rubber.push(cyl(TW_R, TW_R, TW_W, 14, "y", TW_X, 0, Z(TW_R)));

    /* ------------------------------------------------------ small kit ---- */
    dark.push(box(0.28, 0.03, 0.18, -1.2, 0, fusAt(-1.2).zb - 0.07));
    dark.push(box(0.24, 0.03, 0.16, -4.6, 0, fusAt(-4.6).zb - 0.06));
    dark.push(box(0.26, 0.03, 0.18, -3.2, 0, fusAt(-3.2).zt + 0.07, 0, 0.30, 0));

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the outer wing
       beams and the tailplane. Each flash is a thin plate laid 1 cm clear
       of the aerofoil's upper surface between 18% and 72% chord. A band
       right round the boom, cut from the boom's own sections 3% oversize,
       reads from the side as well as from above. */
    function flash(le, te, mid, th, y0, y1) {
      function top(f, y, kk) {
        var x = le(y) + (te(y) - le(y)) * f;
        return [x, y, mid(y) + th(y) * (0.5 - 0.12 * (f - 0.15) / 0.6) + kk];
      }
      var lo = [top(0.18, y0, 0.010), top(0.72, y0, 0.010), top(0.72, y1, 0.010), top(0.18, y1, 0.010)];
      var hi = [top(0.18, y0, 0.024), top(0.72, y0, 0.024), top(0.72, y1, 0.024), top(0.18, y1, 0.024)];
      return solid(lo, hi);
    }
    function lerpY(p, q, y0, y1) { return function (y) { return p + (q - p) * (y - y0) / (y1 - y0); }; }
    both(team, flash(lerpY(0.42, 0.36, WING_MID, TIP_Y), lerpY(-0.36, -0.28, WING_MID, TIP_Y),
                     function () { return Z(WING_H); }, lerpY(0.32, 0.27, WING_MID, TIP_Y), 1.10, 2.02));
    both(team, flash(lerpY(-7.42, -7.52, STAB_Y0, STAB_Y1), lerpY(-8.28, -8.26, STAB_Y0, STAB_Y1),
                     function () { return Z(STAB_H); }, lerpY(0.11, 0.08, STAB_Y0, STAB_Y1), 0.40, 1.15));
    var bandSecs = [], bx = [-5.35, -5.95];
    for (i = 0; i < 2; i++) {
      var B0 = fusAt(bx[i]), zm = B0.zm;
      bandSecs.push({ x: bx[i], zm: zm, zb: zm - (zm - B0.zb) * 1.03, zt: zm + (B0.zt - zm) * 1.03,
                      wb: B0.wb * 1.03, wm: B0.wm * 1.03, wt: B0.wt * 1.03, e: B0.e, yc: 0 });
    }
    team.push(loft(bandSecs, 12, null, null)[0]);

    /* ======================================================= main rotor ==
       Fixed parts first, in model axes: the mast out of the gearbox fairing and
       the swashplate's fixed ring. On the UHT the Osiris sight stands on
       its own stalk through the hollow shaft: a head 0.75 m across, 1.1 m
       over the rotor, its top at the published 5.20 m, with its window and
       lens facing ahead. None of it turns. */
    var HZ = Z(HUB_H);
    metal.push(cyl(0.14, 0.16, HUB_H - 3.40, 14, "z", 0, 0, Z((HUB_H + 3.40) / 2)));
    metal.push(cyl(0.31, 0.31, 0.05, 18, "z", 0, 0, Z(HUB_H - 0.22)));
    if (fit.sight === "mms") {
      skin.push(cyl(0.12, 0.14, 0.62, 12, "z", 0, 0, Z(4.20)));
      skin.push(cyl(0.20, 0.15, 0.12, 14, "z", 0, 0, Z(4.55)));
      skin.push(sph(0.36, 16, 10, 0, 0, Z(4.84), 1.0, 1.05, 1.0));
      glass.push(box(0.05, 0.30, 0.24, 0.345, -0.08, Z(4.87)));
      glass.push(disc(0.08, 12, [0.352, 0.16, Z(4.84)], [1, 0, 0]));
    }

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, rubber, T.rubber, "tyres");
    mesh(g, team, T.team, "team");

    /* The mount. Its -PI/2 about X puts the renderer's spin axis (scene
       up, taken in this frame) on the mast pointing DOWN, so the head turns
       clockwise from above. head undoes the turn so the head is authored
       in model axes, with its origin at the hub. */
    var mnt = new V.Group();
    mnt.position.set(0, 0, HZ);
    mnt.rotation.x = -PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);

    var hubM = [], hubD = [], blades = [];
    /* the hingeless hub: a star plate under a low domed cover 1.0 m
       across, its top at the published 3.83 m, 0.13 m over the blade
       plane (the first cut stood 0.12 m higher than that) */
    hubM.push(cyl(0.24, 0.27, 0.20, 16, "z", 0, 0, -0.01));
    hubM.push(cyl(0.40, 0.40, 0.05, 18, "z", 0, 0, 0.02));
    hubM.push(cyl(0.30, 0.30, 0.05, 18, "z", 0, 0, -0.16));   /* turning ring */
    hubD.push(sph(0.50, 18, 6, 0, 0, 0.015, 1, 1, 0.23));
    /* Blade outline, blade along +X. The rotor turns clockwise from above,
       so the leading edge is on the -Y side. Chord 0.50 m, the pitch axis
       at the quarter chord; the parabolic tip sweeps the leading edge back
       over the last 0.7 m to meet the straight trailing edge. */
    var LE = -0.125, TE = LE + CHORD, RR = ROTOR_R;
    var BP = [[0.95, LE + 0.03], [1.40, LE], [RR - 0.70, LE], [RR - 0.40, LE + 0.03],
              [RR - 0.18, LE + 0.10], [RR - 0.04, LE + 0.22], [RR, LE + 0.34],
              [RR, TE - 0.05], [RR - 0.04, TE], [1.40, TE], [0.95, TE - 0.04]];
    for (k = 0; k < 4; k++) {
      /* 45, 135, 225 and 315 degrees: no blade lies along the fuselage */
      a = (45 + 90 * k) * D2R;
      var bl = M.slab(V, BP, 0.035);
      bl.translate(0, 0, -0.0175);
      bl.rotateZ(a);
      blades.push(bl);
      /* the blade sleeve, its pitch horn on the leading side and the
         pitch link down to the swashplate */
      var parts = [[box(0.62, 0.20, 0.11, 0.70, 0.02, 0), hubM],
                   [box(0.20, 0.05, 0.05, 0.40, -0.16, -0.05), hubD],
                   [cyl(0.022, 0.022, 0.14, 6, "z", 0.36, -0.20, -0.10), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dark");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine ever sees, and it
       casts no shadow (three draws a FrontSide material's back faces into
       the shadow map, and this disc's back faces away from the sun). */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: +PI/2 about X, so inside it local X is
       the model's X, local Y the model's up and local Z the model's
       right-hand side. The hub axis runs along local Z and the rotor is on
       the starboard face of the fin, so outboard is local +Z. Three blades
       of 0.21 m chord; one points straight aft as built, which is what
       sets the back of the box (see WHAT SETS THE SCALE). */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.09, 0.11, 0.26, 12, "z", 0, 0, -0.04), cyl(0.06, 0.03, 0.10, 10, "z", 0, 0, 0.14)];
    var trB = [];
    var tAng = [180, 60, 300];
    for (k = 0; k < 3; k++) {
      var tb = box(TR_R - 0.16, 0.21, 0.03, 0.16 + (TR_R - 0.16) / 2, 0, 0);
      tb.rotateX(8 * D2R);                    /* blade pitch */
      tb.rotateZ(tAng[k] * D2R);
      tb.translate(0, 0, 0.06);
      trB.push(tb);
      var cuff = box(0.22, 0.10, 0.08, 0.15, 0, 0);
      cuff.rotateZ(tAng[k] * D2R);
      cuff.translate(0, 0, 0.06);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");

    return g;
  }

  return {
    had_e00: function (THREE, M, C) { return build(THREE, M, C, FITS.had_e00); },
    had_e20: function (THREE, M, C) { return build(THREE, M, C, FITS.had_e20); },
    uht:     function (THREE, M, C) { return build(THREE, M, C, FITS.uht); },
  };
})();

/* len is the MEASURED x extent, rotor disc front to the tip of the aft
   tail rotor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["helo_f"]          = { len: 15.87, build: HeroTiger.had_e20 };
UNIT_MODELS["fra_e00_gunship"] = { len: 15.87, build: HeroTiger.had_e00 };
UNIT_MODELS["helo_g"]          = { len: 15.87, build: HeroTiger.uht };
