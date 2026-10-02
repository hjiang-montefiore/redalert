/* ======= h60_hawk_family.js - HERO model: the Sikorsky H-60 family, Black Hawk and Seahawk =======
   Thirteen defs, two airframes, one file. They share the cabin, the T700
   nacelles, the gearboxes, the rotors and the tail pylon, and differ in the
   tail gear, the doors and the kit a navy hangs on them.

   THE BLACK HAWKS (US Army green unless noted)
     nato_e80_transport  UH-60A, 1979-89. The original blades and the plain
                         exhaust; the ALQ-144 lantern behind the mast; door
                         guns at the gunner's windows.
     nato_e90_transport  UH-60L, from 1989: the UH-60A modifications made
                         standard - the Hover IR Suppressor (HIRSS) boxes on
                         the exhausts and the wire-strike cutters.
     nato_e00_transport  UH-60M, from 2007: wide-chord blades with swept,
     trans_n             tapered and drooped (anhedral) tips, and the upturned
                         exhaust over the HIRSS.
     trans_r             ROC Army UH-60M, from 2014: the same machine in the
     roc_e00_transport   ROC Army's dark green with its roundel and "Army".
     pla_e80_transport   S-70C-2, 1984: the 24 Black Hawks the PLA bought for
                         Tibet, exported as civil S-70Cs and flown by its Army
                         Aviation. Original blades, no HIRSS, no guns, the
                         nose weather radar, a lighter olive and the Army
                         Aviation serial ("LH922xx") on the boom.
   THE SEAHAWKS (navy grey; the tail gear 13 ft forward under the cabin, a
   single sliding door on the starboard side, a folding tail pylon)
     nato_e80_lamps      SH-60B, LAMPS Mk III, 1984: the APS-124 radar in a
                         broad round radome under the forward fuselage, the
                         ALQ-142 ESM boxes at the corners of the chin and the
                         data-link dome between them, the 25-tube sonobuoy
                         launcher on the port side, the yellow MAD towed body
                         on its housing to starboard, the RAST probe under the
                         belly, a Mk 46 on each weapon pylon.
     nato_e90_aswhelo    SH-60F, 1991: the carrier's dipping-sonar Seahawk. No
                         radar, no ESM, no MAD, no external launcher (its six
                         tubes are inside), no RAST; three torpedo stations.
     nato_e00_aswhelo    MH-60R, 2006: the APS-147/153 radar in a broad flat
     asw_helo_n          dish where the SH-60B had hers, the AAS-44 FLIR turret
                         standing on its bracket ahead of the nose, the ALQ-210
                         ESM boxes at the chin corners, the 25-tube launcher,
                         RAST, the ALQ-144 lantern, Mk 54s.
     roc_e00_aswhelo     S-70C(M)-1/2 Thunderhawk, ROC Navy, 1991: an SH-60F
     asw_helo_r          dipping-sonar Seahawk with a radar tub under the nose,
                         an ESM box on each cheek and the rescue hoist, in the
                         ROC Navy's light grey with its roundel; Mk 46
                         (e90-e00) or Mk 54 (e20).
   The SH-3 Sea King and the SH-2F Seasprite rows also draw a Seahawk as their
   stand-in for now (render3d.js modelKeyFor, the first aswhelo row with a
   model, which is asw_helo_n); they are other airframes and are not built
   here.

   REFERENCES, and what each gave
     TM 1-1520-237-10, Operator's Manual for UH-60A, UH-60L and EH-60A (DTIC
       ADA409934), Figure 2-1 general arrangement and Figure 2-2 principal
       dimensions: overall length 64 ft 10 in with rotors turning, main rotor
       53 ft 8 in, tail rotor 11 ft canted 20 degrees with its upper tip path
       16 ft 10 in above the ground and its lower 6 ft 6 in, top of the rotor
       head 12 ft 4 in, fuselage 7 ft 9 in wide (9 ft 8 in over the HIRSS),
       stabilator 14 ft 4 in, main gear tread 8 ft 10.6 in (9 ft 8.6 in over
       the tyres), wheelbase 29 ft, 1 ft 7 in under the belly. Stations,
       heights and widths were traced off the side and top views on a metre
       grid; their heights run 3% short of the dimensions printed on them,
       and were scaled to those.
     NAVAIR A1-H60BB-NFM-000, NATOPS Flight Manual, SH-60B (2009), sections
       1.1-1.4 and Figures 1-1 to 1-3: the "20 degree tractor type canted
       tail rotor"; main rotor at STA 341.2, tail rotor at STA 732 and the
       nose at STA 162, so the tail rotor hub is 9.93 m behind the mast;
       fuselage 50 ft, height 17 ft 0 in, rotor head 12 ft 5.4 in, tread 8 ft
       8 in, 11.2 in of ground clearance, stabilator 14 ft 4 in; the MAD towed
       body and reeling machine "on a faired structure that extends from the
       forward tail-cone transition section on the right side ... above and
       aft of the right weapon pylon"; the sonobuoy launcher "on the left side
       ... above the left weapon pylon"; the RAST probe "on the bottom
       fuselage centerline, just aft of the main rotor centerline"; a sliding
       cabin door on the right side only; the search radar antenna and two
       data-link antennas under the fuselage.
     NASA CR-166309 (Howlett, Sikorsky SER 70452, 1981), UH-60A engineering
       simulation, Table 4.1: blade chord 1.75 ft, tip sweep 20 degrees, shaft
       tilted 3 degrees forward; tail rotor chord 0.81 ft; stabilator 14.38 ft
       span, chords 3.67 ft root and 2.54 ft tip; vertical fin root chord 6 ft
       and tip chord 2.83 ft over an 8.17 ft span, swept 41 degrees.
     UH-60M: the wide-chord blade has 1.74 in more chord and "a swept,
       tapered, anhedral tip" (Army Recognition; TRID 1813474; Yeo, JAHS
       2004); the Lockheed Martin UH-60M brochure lists the "Upturned Exhaust
       System".
     Wikipedia, "Sikorsky SH-60 Seahawk": the SH-60B differs from the UH-60A in
       its single-stage oleo main gear, the left cabin door removed, two weapon
       pylons, the tail gear moved 13 ft forward and a 25-tube launcher on the
       left side; the SH-60F carried the AQS-13F dipping sonar and a six-tube
       launcher; the MH-60R lists the AAS-44 FLIR, the ALQ-210 ESM, the
       ALQ-144 jammer and the APS-147/153 radar; the S-70C(M)-1/2 has "an
       undernose radar and a dipping sonar"; the S-70C-2 was radar-equipped.
     Wikimedia Commons photographs: SH-60B 161171 side on at Patuxent River
       (1981) for the cabin windows and the hatch between them, the radome's
       place and the MAD housing, the bird's place and its paint; SH-60B
       "450" (Mediterranean, September 1987) for the chin ESM boxes, the
       data-link dome and the radome's breadth; 707 of HSL-51 for the radome
       dish and the bird; an HSL-41 SH-60B air-to-air and an HSL-43 SH-60B
       releasing a Mk 46 (DoD) for the pylons, the twin tail wheels, the
       launcher and the window ahead of it; an HS-10 SH-60F beside an SH-3H
       and SH-60F 163284 at AMARG for the clean F; MH-60R 167050 (HSM-35), 516
       (HSM-48), Indian Navy IN753, the first two RAN MH-60Rs (2013), an
       HSM-40 machine from below and an HSM-77 one head on for the radar
       dish, the FLIR on its bracket and the ESM boxes; ROC Navy S-70C(M)s
       2307 and 2312 (2011-2015, Chengkungling, CCK, Zuoying) for the radar
       tub, the cheek ESM box, the hoist, the roundel and the dipping sonar;
       UH-60A in Reforger 1982 (DA-SN-83-08456) for the plain exhaust; UH-60
       0-26135 and UH-60M "195" (Grayling, 2013) for the HIRSS, the ALQ-144
       lantern and the main gear; ROC Army UH-60M "901" for its green, its
       roundel and "Army", and the door gun. PLA S-70C-2s LH92217 and LH92210
       (not on Commons: Plane Encyclopedia, Leo Guo, after JetPhotos and Ed
       Jackson) for the nose radar, the olive and the serial; English and
       Chinese Wikipedia for their Army Aviation service.

   CORRECTIONS to the brief this was built from
     - The survey put the tail rotor "on the starboard side of the pylon";
       right, and it is a tractor (NATOPS 1.1). asw_helo_fit.js had it on the
       port side.
     - The MH-60R and the S-70C(M) carry no towed MAD (nothing in the
       photographs or the equipment lists; the MAD-XR fitted to MH-60Rs
       from 2020 is a compact sensor, not a bird on a reel); only the SH-60B
       is given one.
     - The undercarriage is NOT named "gear": every H-60 wheel is fixed and
       stays down in flight, and render3d.js hides a "gear" node above 18 m,
       which asw_helo_fit.js used to do to the Seahawk's. The AH-64E and the
       Mi-28N heroes leave their fixed wheels unnamed for the same reason.
       Parking is unaffected: the tyres are the lowest solid part, drawn
       whether or not a node is named.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. x is measured
   from the main rotor centreline (STA 341.2), heights above the ground. The
   origin is under the mast at the centre-of-mass height (WL 251, about 1.85 m
   up), so a Black Hawk's tyres stand on z = -1.85. The Seahawk stands 4 cm
   taller on its single-stage oleos (17 ft 0 in against 16 ft 10 in to the
   tail rotor tip, 12 ft 5.4 in against 12 ft 4 in to the head).

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent. The faint main
   rotor disc reaches 8.17 m ahead of the mast (8.18 m less the 3 degree tilt)
   and one tail rotor blade is built pointing straight aft, its tip 11.60 m
   behind the mast. The extent is therefore 19.77 m, the published 64 ft 10 in
   with both rotors turning. The four main blades sit at 45 degrees, so blade
   phase never sets it.

   NAMED NODES, and why each mount is built the way it is
     rotor      render3d.js turns it positively about whichever of its own axes
                lies along the mast. The head hangs in the asw_helo_fit.js
                mount (+PI/2 about X) inside a group that leans the shaft 3
                degrees forward, so that axis points up the leaning shaft and
                the head turns anti-clockwise from above, as a Sikorsky's does.
                A -PI/2 group inside puts the head back into model axes.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  on the starboard side, the tail mount turned 70 degrees about
                X instead of 90: its local +Z, the axis render3d.js turns it
                positively about, then points to starboard and 20 degrees up,
                the shaft of the canted rotor. Turned that way the top blade
                moves aft (clockwise seen from the left), the forward blade
                climbing into the main rotor's wash, as Prouty gives the rule
                for a tail rotor and as every modern design turns.
   Nothing is named "turret" or "gear" (see above).

   Materials are the house tiers: SKIN (one procedural CanvasTexture per paint
   scheme, roughness 0.86, metalness 0.08; the radomes, ESM boxes and the
   FLIR turret are painted it), METAL and DARK fittings, RUBBER (the tyres
   and the soot in the exhausts and inlets), the BLADE composite, GLASS, the
   TEAM flash, the DISC, the STORES (torpedoes, the guns) and, on the SH-60B
   only, the MAD bird's paint, per vertex. At most ten per variant.
   The skin UVs are projected from model space by face normal (top, port,
   starboard and belly bands of one sheet), as the AH-64E does.

   ON AN ESCORT'S DECK the game draws an aircraft at about 1.47 times its
   size and her pad at well under hers, so no real H-60 fits it: with the
   Seahawk's 16 ft wheelbase on a destroyer's 8 m pad, render3d.js padSpot
   leaves her nose in the hangar (its own comment: "its nose meets her
   hangar or deckhouse or its tail hangs over her wake"). The old model
   cleared more of it on stilts, its belly 1.1 m up; this one keeps the
   real 1 ft 7 in.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroH60 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* x from the main rotor centreline (STA 341.2), forward positive; heights
     above a Black Hawk's ground. Every number two parts must agree on lives
     here. */
  var GROUND   = -1.85;
  function Z(h) { return GROUND + h; }
  var X_NOSE   =  4.64;                    /* STA 157: the nose cone      */
  /* The blade plane: 3.42 m, 0.14 m under the tail rotor hub as both
     manuals draw it. The TM's 12 ft 4 in (NATOPS: 12 ft 5.4 in) is the
     top of the head, the bifilar absorber and its cap standing 0.34 m over
     the blade roots. */
  var HUB_H    =  3.42;
  var MAST_TILT = 3 * D2R;                 /* SER 70452 Table 4.1         */
  var ROTOR_R  =  8.179;                   /* 53 ft 8 in                  */
  /* tail rotor: STA 732 is 9.93 m behind the mast; 16 ft 10 in to the upper
     tip less R cos 20 puts the centre of the disc 3.556 m up, which also
     leaves the 6 ft 6 in under the lower tip. TR_Y is the disc where the
     NATOPS top view draws it, 0.32 m to starboard. The blades ride TR_OUT
     out along the canted shaft from the gearbox face the mount stands on. */
  var TR_X = -9.926, TR_Y = -0.32, TR_H = 3.556, TR_R = 1.676, TR_CANT = 20 * D2R;
  var TR_OUT = 0.15;
  var TR_CHORD = 0.247;                    /* 0.81 ft                     */
  var NAC_Y    =  0.85;                    /* T700 nacelle centreline     */
  var NAC_H    =  2.48;
  /* the stabilator: 14 ft 4 in span over the tip caps (each 5 cm past
     STAB_Y1), 3.67 ft root and 2.54 ft tip chords, at the foot of the pylon,
     its quarter chord at FS 700 (under the tail rotor's leading blades,
     where both manuals' top views draw it) */
  var STAB_H = 1.56, STAB_Y0 = 0.08, STAB_Y1 = 2.135;
  var ST_LE0 = -8.83, ST_TE0 = -9.95, ST_LE1 = -8.95, ST_TE1 = -9.72;

  /* --------------------------------------------------------- variants */
  var VARIANTS = {
    /* MH-60R: USN, 2006 on */
    mh60r: { key: "mh60r", sea: true, scheme: "usn", wcb: false, hirss: 0, gl: 0.04,
             radome: "tub", flir: true, esm: "chin", datalink: false, sono: true, rast: true,
             mad: false, hoist: true, ircm: true, torp: 2.72, stations: ["Li", "R"],
             wsps: false, guns: false, wx: false },
    /* SH-60B, LAMPS Mk III, 1984 on */
    sh60b: { key: "sh60b", sea: true, scheme: "usn", wcb: false, hirss: 0, gl: 0.04,
             radome: "disc", flir: false, esm: "chin", datalink: true, sono: true, rast: true,
             mad: true, hoist: true, ircm: false, torp: 2.59, stations: ["Li", "R"],
             wsps: false, guns: false, wx: false },
    /* SH-60F, the carrier's dipping-sonar Seahawk, 1991 */
    sh60f: { key: "sh60f", sea: true, scheme: "usn", wcb: false, hirss: 0, gl: 0.04,
             radome: null, flir: false, esm: null, datalink: false, sono: false, rast: false,
             mad: false, hoist: true, ircm: false, torp: 2.59, stations: ["Li", "Lo", "R"],
             wsps: false, guns: false, wx: false },
    /* S-70C(M)-1/2 Thunderhawk, ROC Navy: Mk 54 for the present day. The
       hoist over the cabin door as on the US Seahawks (2307 at Zuoying, 2014;
       2312) */
    s70cm54: { key: "s70cm54", sea: true, scheme: "rocn", wcb: false, hirss: 0, gl: 0.04,
               radome: "tub2", flir: false, esm: "cheek", datalink: false, sono: false, rast: false,
               mad: false, hoist: true, ircm: false, torp: 2.72, stations: ["Li", "R"],
               wsps: false, guns: false, wx: false },
    /* the same aircraft with the Mk 46 it came with in 1991 */
    s70cm46: { key: "s70cm46", sea: true, scheme: "rocn", wcb: false, hirss: 0, gl: 0.04,
               radome: "tub2", flir: false, esm: "cheek", datalink: false, sono: false, rast: false,
               mad: false, hoist: true, ircm: false, torp: 2.59, stations: ["Li", "R"],
               wsps: false, guns: false, wx: false },
    uh60a: { key: "uh60a", sea: false, scheme: "army", wcb: false, hirss: 0, gl: 0,
             ircm: true, wsps: false, guns: true, wx: false },
    uh60l: { key: "uh60l", sea: false, scheme: "army", wcb: false, hirss: 1, gl: 0,
             ircm: true, wsps: true, guns: true, wx: false },
    uh60m: { key: "uh60m", sea: false, scheme: "army", wcb: true, hirss: 2, gl: 0,
             ircm: true, wsps: true, guns: true, wx: false },
    /* ROC Army UH-60M: door gun and roundel in the photographs; no lantern.
       The team band goes 0.8 m further aft, clear of the roundel and "Army" */
    uh60m_roca: { key: "uh60m_roca", sea: false, scheme: "roca", wcb: true, hirss: 2, gl: 0,
                  ircm: false, wsps: true, guns: true, wx: false, band: -6.92 },
    /* PLA S-70C-2: civil standard, unarmed, nose weather radar */
    s70c2: { key: "s70c2", sea: false, scheme: "pla", wcb: false, hirss: 0, gl: 0,
             ircm: false, wsps: false, guns: false, wx: true }
  };

  /* ------------------------------------------------------ paint schemes
     The hexes sit darker than the paint chips, because the ACES pass lifts
     mid tones. usn is the tactical paint scheme's light ghost grey (FS 36375)
     the Seahawks have worn since the mid-1980s; rocn the ROC Navy's lighter
     blue-grey; army the US Army's aircraft green (as on the AH-64E); roca the
     ROC Army's dark green; pla the S-70C-2's lighter olive. Only the keys
     that draw no other nation's aircraft carry a national marking. */
  var SCHEMES = {
    usn:  { key: "usn",  base: "#687179", light: "#737c84", dark: "#5c656c", belly: "#6c757c", seed: 6011, mark: null },
    rocn: { key: "rocn", base: "#7a848b", light: "#848e95", dark: "#6e787f", belly: "#7e888f", seed: 7712, mark: "roc" },
    army: { key: "army", base: "#40463a", light: "#4b5244", dark: "#353b30", belly: "#3e4438", seed: 6060, mark: null },
    roca: { key: "roca", base: "#41473b", light: "#4c5345", dark: "#363c31", belly: "#3f4539", seed: 9014, mark: "roc" },
    pla:  { key: "pla",  base: "#4d5935", light: "#58653e", dark: "#424c2d", belly: "#4b5734", seed: 8422, mark: "pla" }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() below picks the band from each triangle's face normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -11.9, UX1 = 5.3;              /* x covered across the sheet  */
  var QY = 2.3;                            /* |y| covered by top/belly    */
  var QZ0 = -1.95, QZ1 = 2.25;             /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* the Republic of China roundel, low-visibility as both services paint it
     on these aircraft: a dark blue-grey disc and the twelve-rayed sun */
  function rocRoundel(g, cx, cy, rx, ry) {
    var i, a;
    g.fillStyle = "#3a4a63"; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, PI * 2); g.fill();
    g.fillStyle = "#c9cdd1";
    g.beginPath();
    for (i = 0; i < 24; i++) {
      a = -PI / 2 + i * PI / 12;
      var q = (i & 1) ? 0.50 : 0.84;
      if (i) g.lineTo(cx + Math.cos(a) * rx * q, cy + Math.sin(a) * ry * q);
      else g.moveTo(cx + Math.cos(a) * rx * q, cy + Math.sin(a) * ry * q);
    }
    g.closePath(); g.fill();
    g.fillStyle = "#3a4a63"; g.beginPath(); g.ellipse(cx, cy, rx * 0.40, ry * 0.40, 0, 0, PI * 2); g.fill();
    g.fillStyle = "#c9cdd1"; g.beginPath(); g.ellipse(cx, cy, rx * 0.33, ry * 0.33, 0, 0, PI * 2); g.fill();
  }

  function skinCanvas(SC, sea) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed);
    var i, b, x, y;
    var SZ = BAND / (QZ1 - QZ0);

    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);

    /* ---- panel-to-panel colour: repainted access panels come up a shade
       lighter or darker than their neighbours, in rectangles */
    for (i = 0; i < 170; i++) {
      var pw = (0.4 + R() * 1.4) * SX, ph = 10 + R() * 30;
      g.fillStyle = (i & 1) ? SC.light : SC.dark;
      g.globalAlpha = 0.22 + R() * 0.30;
      g.fillRect(R() * TW, R() * TH, pw, ph);
    }
    g.globalAlpha = 1;
    /* sun-faded top; salt or dust grime down the sides; a dirtier belly */
    g.fillStyle = sea ? "rgba(255,255,255,0.05)" : "rgba(255,255,236,0.045)";
    g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 190; i++) {
      g.fillStyle = "rgba(20,20,18," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 40);
    }
    g.fillStyle = SC.belly; g.globalAlpha = 0.6; g.fillRect(0, 3 * BAND, TW, BAND); g.globalAlpha = 1;
    for (i = 0; i < 110; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.04 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }

    /* ---- exhaust soot. The T700s blow aft and out from the nacelle tails
       at x -1.6 (through the HIRSS boxes, further aft), so the stain lies
       over the transition fairing and the upper sides of the tail cone. */
    var sg = g.createLinearGradient(pxX(-1.5), 0, pxX(-5.4), 0);
    sg.addColorStop(0, "rgba(16,15,13,0.48)");
    sg.addColorStop(1, "rgba(16,15,13,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-5.4), pyTop(1.35), pxX(-1.5) - pxX(-5.4), pyTop(-1.35) - pyTop(1.35));
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(-5.4), pySide(Z(2.80), b), pxX(-1.5) - pxX(-5.4), pySide(Z(1.95), b) - pySide(Z(2.80), b));

    /* ---- panel seams: frames across the airframe at real stations ---- */
    var frames = [4.30, 3.78, 3.38, 3.08, 2.50, 2.36, 1.80, 1.20, 0.90, 0.40, -0.30,
                  -1.00, -1.60, -2.30, -3.00, -3.70, -4.10, -4.90, -5.70, -6.50, -7.30,
                  -8.10, -8.90, -9.60, -10.30];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.06)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(150,150,140,0.18)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    /* stringers: the side bands at real heights, the top band along the
       cabin roof edges and the nacelle tops */
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.3;
    [0.62, 0.95, 1.30, 2.08, 2.30, 2.62].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    [-1.15, -0.78, -0.45, 0.45, 0.78, 1.15].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-4.2), yy); g.lineTo(pxX(3.1), yy); g.stroke();
    });
    /* access hatches */
    g.lineWidth = 1.2;
    for (i = 0; i < 70; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 32, hh = 8 + R() * 20;
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.strokeRect(hx, hy, hw, hh);
      g.fillStyle = "rgba(160,160,150,0.20)";
      g.fillRect(hx + 2, hy + 2, 2, 2); g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
    }

    /* ---- the doors. A cockpit door each side; the Black Hawk's sliding
       cabin door on both sides with its upper rail running aft over the
       cabin windows; the Seahawk's on the starboard side only (NATOPS
       1.4.2: the left one was deleted for the sonobuoy launcher). */
    function door(b, x0, x1, h0, h1) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
      g.strokeRect(pxX(x1), pySide(Z(h1), b), pxX(x0) - pxX(x1), pySide(Z(h0), b) - pySide(Z(h1), b));
      g.strokeStyle = "rgba(255,255,255,0.08)"; g.lineWidth = 1;
      g.strokeRect(pxX(x1) + 2, pySide(Z(h1), b) + 2, pxX(x0) - pxX(x1) - 4, pySide(Z(h0), b) - pySide(Z(h1), b) - 4);
      g.fillStyle = "rgba(0,0,0,0.6)";
      g.fillRect(pxX(x1) + 6, pySide(Z((h0 + h1) / 2), b), 8, 3);
    }
    function rail(b, x0, x1, h) {
      g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 3;
      g.beginPath(); g.moveTo(pxX(x0), pySide(Z(h), b)); g.lineTo(pxX(x1), pySide(Z(h), b)); g.stroke();
    }
    for (b = 1; b <= 2; b++) door(b, 3.40, 2.42, 0.62, 2.10);
    if (!sea) {
      for (b = 1; b <= 2; b++) {
        /* the gunner's window panel, then the cabin door (STA 305-375)
           with its rails running on aft along the transition section */
        door(b, 2.12, 1.46, 1.24, 2.02);
        door(b, 0.92, -0.88, 0.60, 2.04);
        rail(b, 0.92, -2.60, 2.07); rail(b, 0.92, -2.60, 0.58);
      }
    } else {
      door(2, 0.87, -0.44, 0.58, 2.04);
      rail(2, 0.87, -2.10, 2.07); rail(2, 0.87, -2.10, 0.59);
      /* the solid hatch where the Black Hawk has its gunner's windows */
      door(2, 1.95, 1.22, 1.12, 1.96);
    }
    /* walkway lines along the nacelle tops and the transmission deck */
    g.strokeStyle = "rgba(10,10,8,0.42)"; g.lineWidth = 1.2;
    [NAC_Y - 0.22, NAC_Y + 0.22, -NAC_Y - 0.22, -NAC_Y + 0.22].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-1.4), yy); g.lineTo(pxX(0.5), yy); g.stroke();
    });

    /* ---- markings ---- */
    if (SC.mark === "roc") {
      /* the roundel on the tail cone: the Navy's just aft of the twin tail
         wheels (S-70C(M) 2307 and 2312), the Army's half way down the cone
         with "Army" beside it, aft (UH-60M 901). The characters read from
         the nose on both sides, so right to left on the starboard side. The
         port band runs tail to nose, so what is drawn there is mirrored. */
      for (b = 1; b <= 2; b++) rocRoundel(g, pxX(sea ? -4.50 : -5.85), pySide(Z(sea ? 1.30 : 1.22), b), 0.30 * SX, 0.30 * SZ);
      if (!sea) for (b = 1; b <= 2; b++) {
        g.save();
        g.fillStyle = "rgba(196,201,205,0.85)";
        g.font = "bold " + Math.round(0.30 * SZ) + "px sans-serif";
        g.textAlign = "center"; g.textBaseline = "middle";
        g.translate(pxX(-6.62), pySide(Z(1.22), b));
        if (b === 1) g.scale(-1, 1);
        g.fillText(b === 1 ? "\u9678\u8ecd" : "\u8ecd\u9678", 0, 0);
        g.restore();
      }
    } else if (SC.mark === "pla") {
      /* the serial in the PLA Army Aviation's "LH" series the S-70C-2s
         wear, white on the boom (LH92210, LH92217: exported as civil
         S-70Cs, flown by Army Aviation units); the port band runs tail to
         nose, so its lettering is mirrored there */
      for (b = 1; b <= 2; b++) {
        g.save();
        g.fillStyle = "rgba(232,232,226,0.92)";
        g.font = "bold " + Math.round(0.42 * SZ) + "px sans-serif";
        g.textAlign = "center"; g.textBaseline = "middle";
        g.translate(pxX(-5.05), pySide(Z(1.30), b));
        if (b === 1) g.scale(-1, 1);
        g.fillText("LH92210", 0, 0);
        g.restore();
      }
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope, per scheme     */
  function skinTexture(SC, sea) {
    var k = SC.key + (sea ? "s" : "l");
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(SC, sea);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[k] = t;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft would collapse to a line under an x projection, so they are laid
     out along x + y. */
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
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
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
  function makeMats(C, VR) {
    var SC = SCHEMES[VR.scheme];
    var tex = skinTexture(SC, VR.sea);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.32 });
    /* the tyres, and the soot in the exhaust mouths and the inlets' throats.
       Black enough (HSL lightness under 0.05) that render3d.js eraPaint()
       leaves it alone when asw_helo_n or trans_n draws another nation's
       helicopter in another period: a tyre or an exhaust painted desert sand
       reads as a hole filled in. The glass below is kept as dark for the
       same reason. */
    m.rubber = new V.MeshStandardMaterial({ color: 0x0b0c0c, roughness: 0.95, metalness: 0.02 });
    /* the composite blades, painted the airframe's own dark grey-green and
       weathered flat */
    m.blade  = new V.MeshStandardMaterial({ color: VR.sea ? 0x3a4045 : 0x2e322c, roughness: 0.80, metalness: 0.10 });
    /* torpedoes and the door guns: dark ordnance grey */
    m.store  = new V.MeshStandardMaterial({ color: 0x33383a, roughness: 0.70, metalness: 0.18 });
    /* the SH-60B's MAD bird, high-visibility yellow with a red nose and
       drogue: one material, its paint per vertex (meshVC) */
    if (VR.mad) m.mad = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.55, metalness: 0.05 });
    /* Curved acrylic in thin frames: dark from any distance. The panes are
       patches laid a few centimetres proud of the skin, so at a grazing
       angle their edges stand past the fuselage outline; drawing both faces
       keeps those rims dark instead of see-through. */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x080d10, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05,
                                            side: V.DoubleSide });
    /* The flash is exactly C.team, so eraPaint's team test leaves it alone
       when trans_n or asw_helo_n stands in for another def. The emissive
       keeps it from greying out under ACES. */
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
  /* a round bar from p to q; open-ended unless capped */
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* an open cone from p (radius r0) to q (radius r1), on the same facets as
     a bar() along the same line */
  function bar2(p, q, r0, r1, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r1, r0, L, seg, 1, true);
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
  /* the same surface wound to face the other way: the lining of a duct */
  function inward(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, n = g.attributes.normal.array, t, k, tmp;
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
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
  /* One mesh painted per vertex, from [geometry, sRGB hex] pairs. The
     colours are stored linear, because three reads a colour attribute as
     it stands and render3d.js prepModel() converts only material colours
     (hero/barracks_block.js does the same). */
  function linRGB(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  function meshVC(parent, list, mat, name) {
    if (!list.length || !mat) return null;
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
    var m = new V.Mesh(out, mat);
    m.name = name;
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
     face is wound so its normal points away from the solid's centre. */
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
  /* a convex solid through a run of sections, capped at both ends */
  function pod(secs) {
    var faces = [secs[0], secs[secs.length - 1]], q, j, n = secs[0].length;
    for (q = 0; q < secs.length - 1; q++)
      for (j = 0; j < n; j++)
        faces.push([secs[q][j], secs[q][(j + 1) % n], secs[q + 1][(j + 1) % n], secs[q + 1][j]]);
    return convex(faces);
  }
  /* triangles wound to face along n */
  function facing(list, n) {
    var out = [], i;
    for (i = 0; i < list.length; i += 3) {
      var p = list[i], q = list[i + 1], r = list[i + 2];
      var ux = q[0] - p[0], uy = q[1] - p[1], uz = q[2] - p[2], vx = r[0] - p[0], vy = r[1] - p[1], vz = r[2] - p[2];
      var d = (uy * vz - uz * vy) * n[0] + (uz * vx - ux * vz) * n[1] + (ux * vy - uy * vx) * n[2];
      if (d >= 0) out.push(p, q, r); else out.push(p, r, q);
    }
    return tris(out);
  }
  /* triangles wound to face away from the point c (a convex ring band) */
  function facingOut(list, c) {
    var out = [], i;
    for (i = 0; i < list.length; i += 3) {
      var p = list[i], q = list[i + 1], r = list[i + 2];
      var ux = q[0] - p[0], uy = q[1] - p[1], uz = q[2] - p[2], vx = r[0] - p[0], vy = r[1] - p[1], vz = r[2] - p[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var d = nx * (p[0] - c[0]) + ny * (p[1] - c[1]) + nz * (p[2] - c[2]);
      if (d >= 0) out.push(p, q, r); else out.push(p, r, q);
    }
    return tris(out);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z]; at(x,
     z, k) turns chord-plane coordinates and a thickness offset into a
     model-space point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     box-like where e is low, round where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
       yc       centreline offset (the engine nacelles)
     Heights are given ABOVE GROUND and converted here. Sections run from
     nose to tail (decreasing x), and the quads are wound (a, c, b), which
     for that order puts every normal outward (hero/nato_e20_gunship_ah64e.js;
     the signed volume is checked positive with the model tool). */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  /* one point of a section's port half: th from -PI/2 (belly) to PI/2 (top) */
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
  /* the same about model z, from a (z, r) profile bottom to top */
  function latheZ(prof, seg, x, y) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateX(PI / 2);                       /* lathe +Y -> model +Z         */
    g.translate(x, y, 0);
    return g;
  }

  /* ---- surface patches. A window or a flash that must lie on the curved
     skin is cut from the loft itself, then pushed out along the surface
     normal (gb_lynx.js). The point at station x and ring angle th is found
     on the loft's own triangles: the facet between the ring points either
     side of th, split along the diagonal loft() splits it on. Interpolating
     the curve itself put a pane up to 4 cm under the skin where the nose's
     sections change shape fast (the chin windows), the facets there being
     twisted; secs.n, the ring count loft() was given, says where the facets
     are. Without it, the curve. */
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
        if (f + g <= 1)                       /* the facet (a, c, b) */
          return [x, a[0] + f * (c[0] - a[0]) + g * (b[0] - a[0]), a[1] + f * (c[1] - a[1]) + g * (b[1] - a[1])];
        return [x, d[0] + (1 - f) * (b[0] - d[0]) + (1 - g) * (c[0] - d[0]),   /* and (b, c, d) */
                   d[1] + (1 - f) * (b[1] - d[1]) + (1 - g) * (c[1] - d[1])];
      }
    }
    return null;
  }
  /* the ring angle on the port side where the skin stands at model height z */
  function thAtZ(secs, x, z) {
    var lo = -PI / 2, hi = PI / 2, i, m;
    for (i = 0; i < 40; i++) { m = (lo + hi) / 2; if (surfPt(secs, x, m)[2] < z) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* the ring angle above the widest point where the skin is y out from the
     centreline (y falls as th climbs toward the top) */
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
  /* A patch over x from xa down to xb (xa > xb) and, at each x, ring angles
     t0(x) to t1(x); off metres proud of the skin. Every triangle is wound to
     face along the skin normal. */
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
  function lerp(a, b, f) { return a + (b - a) * f; }
  function lin(xa, va, xb, vb) { return function (x) { return lerp(va, vb, (x - xa) / (xb - xa)); }; }
  function cnst(v) { return function () { return v; }; }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "h60_" + VR.key;
    var i, k, s, a;
    var skin = [], dark = [], metal = [], rubber = [], team = [], glass = [], store = [], mad = [];
    var SEA = VR.sea;
    /* the contact plane under the tyres: the Seahawk's single-stage oleos
       hold it 4 cm taller than the Black Hawk (NATOPS 1.2 against the TM) */
    var GZ = GROUND - VR.gl;
    function ZG(h) { return GZ + h; }

    /* --------------------------------------------------- the fuselage ----
       Traced off the TM's side and top views. The rounded nose cone with the
       chin windows low on its sides; the windshield raked 43 degrees from
       the nose deck at 1.51 m to the cockpit roof at 2.17 m; a box cabin
       2.36 m across (7 ft 9 in) on a flat belly 0.47 m up (the TM's 1 ft 7
       in), its upper sides turned in to a 1.8 m roof (TM Figure 6-9: 85 in
       inside at mid-height, 69 in at the ceiling, 54 in floor to ceiling,
       the floor 6.6 in over the belly); the transition
       section, still wide at the floor where the fuel cells are, narrowing
       quickly aft of x -2.8; then the tail cone, a deep and narrow beam
       twice as tall as it is wide, its belly rising to the pylon. The
       engine deck and the nacelles above the roof are lofts of their own.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 4.62, 0.90, 1.10, 1.00, 0.14, 0.19, 0.13, 0.80),
      sec( 4.57, 0.77, 1.18, 0.98, 0.33, 0.43, 0.30, 0.70),
      sec( 4.48, 0.66, 1.25, 0.96, 0.45, 0.56, 0.41, 0.64),
      sec( 4.34, 0.59, 1.31, 0.95, 0.57, 0.69, 0.50, 0.58),
      sec( 4.16, 0.55, 1.37, 0.95, 0.68, 0.82, 0.57, 0.53),
      sec( 3.96, 0.52, 1.44, 0.96, 0.77, 0.93, 0.62, 0.49),
      sec( 3.76, 0.50, 1.53, 0.98, 0.84, 1.02, 0.66, 0.45),
      sec( 3.56, 0.49, 1.75, 1.04, 0.89, 1.08, 0.70, 0.40),
      sec( 3.32, 0.48, 2.00, 1.10, 0.94, 1.13, 0.75, 0.37),
      sec( 3.10, 0.47, 2.17, 1.16, 0.97, 1.16, 0.80, 0.34),
      sec( 2.82, 0.47, 2.22, 1.24, 0.99, 1.18, 0.86, 0.30),
      sec( 2.40, 0.47, 2.24, 1.30, 1.00, 1.18, 0.90, 0.28),
      sec( 1.80, 0.47, 2.24, 1.33, 1.00, 1.18, 0.91, 0.28),
      sec( 0.50, 0.47, 2.24, 1.33, 1.00, 1.18, 0.91, 0.28),
      sec(-0.80, 0.48, 2.23, 1.33, 1.00, 1.18, 0.90, 0.28),
      sec(-1.50, 0.48, 2.21, 1.32, 0.98, 1.15, 0.86, 0.30),
      sec(-2.20, 0.48, 2.18, 1.30, 0.93, 1.09, 0.78, 0.34),
      sec(-2.80, 0.49, 2.15, 1.28, 0.84, 1.00, 0.66, 0.40),
      sec(-3.30, 0.49, 2.11, 1.22, 0.66, 0.80, 0.48, 0.50),
      sec(-3.80, 0.50, 2.08, 1.26, 0.44, 0.55, 0.36, 0.60),
      sec(-4.30, 0.54, 2.01, 1.30, 0.32, 0.43, 0.30, 0.66),
      sec(-5.00, 0.59, 1.93, 1.31, 0.25, 0.36, 0.27, 0.70),
      sec(-6.00, 0.66, 1.83, 1.30, 0.21, 0.31, 0.24, 0.72),
      sec(-7.00, 0.74, 1.73, 1.28, 0.18, 0.27, 0.21, 0.74),
      sec(-7.90, 0.82, 1.64, 1.27, 0.15, 0.23, 0.18, 0.76),
      sec(-8.60, 0.90, 1.58, 1.27, 0.12, 0.19, 0.15, 0.78),
      sec(-9.20, 1.00, 1.52, 1.28, 0.09, 0.14, 0.11, 0.80),
      sec(-9.50, 1.10, 1.45, 1.28, 0.05, 0.08, 0.06, 0.85)
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
    /* the skin's half-width at station x and model height z (port side) */
    function sideY(x, z) { return surfPt(FUS, x, thAtZ(FUS, x, z))[1]; }
    /* sixteen facets a side: the cabin's round shoulders and the tail cone
       read as curves from the game camera */
    var FUS_N = 16;
    FUS.n = FUS_N;                        /* surfPt() finds its facets by it */
    var fl = loft(FUS, FUS_N, 0.03, 0.05);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);

    /* ------------------------------------------------ the engine deck ----
       Over the cabin roof: the forward fairing rising from the cockpit roof
       to the shoulders either side of the mast, the main gearbox fairing
       between the nacelles at 2.86 m, and the transition fairing falling
       back into the top of the tail cone 4.4 m behind the mast. */
    var DECK = [
      sec( 2.74, 2.18, 2.22, 2.20, 0.02, 0.03, 0.02, 0.90),
      sec( 2.58, 2.15, 2.33, 2.20, 0.28, 0.32, 0.20, 0.60),
      sec( 2.34, 2.15, 2.45, 2.22, 0.48, 0.52, 0.34, 0.55),
      sec( 2.02, 2.15, 2.56, 2.24, 0.64, 0.68, 0.44, 0.50),
      sec( 1.60, 2.15, 2.67, 2.26, 0.74, 0.78, 0.50, 0.50),
      sec( 1.15, 2.15, 2.76, 2.28, 0.76, 0.80, 0.53, 0.50),
      sec( 0.75, 2.15, 2.82, 2.30, 0.68, 0.72, 0.52, 0.50),
      sec( 0.30, 2.15, 2.86, 2.32, 0.60, 0.64, 0.49, 0.50),
      sec(-0.40, 2.15, 2.86, 2.34, 0.57, 0.61, 0.46, 0.50),
      sec(-1.20, 2.15, 2.82, 2.36, 0.56, 0.60, 0.45, 0.52),
      sec(-1.90, 2.14, 2.75, 2.36, 0.55, 0.59, 0.42, 0.54),
      sec(-2.50, 2.13, 2.62, 2.34, 0.52, 0.56, 0.38, 0.56),
      sec(-3.10, 2.10, 2.46, 2.28, 0.44, 0.48, 0.32, 0.60),
      sec(-3.65, 2.06, 2.27, 2.17, 0.32, 0.36, 0.24, 0.66),
      sec(-4.10, 2.02, 2.12, 2.07, 0.18, 0.22, 0.15, 0.72),
      sec(-4.40, 1.99, 2.03, 2.01, 0.05, 0.07, 0.05, 0.80)
    ];
    DECK.n = 12;
    var dk = loft(DECK, DECK.n, 0.02, 0.03);
    for (i = 0; i < dk.length; i++) skin.push(dk[i]);
    function deckTop(x) {
      for (var q = 0; q < DECK.length - 1; q++) {
        var A = DECK[q], B = DECK[q + 1];
        if (x <= A.x && x >= B.x) return A.zt + (B.zt - A.zt) * (A.x - x) / (A.x - B.x);
      }
      return Z(2.2);
    }
    /* the drive shaft cover along the top of the tail cone to the pylon */
    var SHAFT = [], sx;
    for (sx = -4.15; sx >= -7.85; sx -= 0.74) {
      var fs = fusAt(sx);
      SHAFT.push({ x: sx, zb: fs.zt - 0.05, zt: fs.zt + 0.07, zm: fs.zt + 0.01, wb: 0.09, wm: 0.11, wt: 0.08, e: 0.6, yc: 0 });
    }
    var sh = loft(SHAFT, 5, 0.06, 0.05);
    for (i = 0; i < sh.length; i++) skin.push(sh[i]);

    /* ------------------------------------------------ the T700 nacelles --
       Either side of the main gearbox, 1.8 m between their centrelines, so
       the pair spans the cabin's 7 ft 9 in. Each is a round-shouldered
       cowl with the inlet drum standing ahead of it: the bell-mouth with
       the dark annulus of the particle separator round a central bullet. */
    var NAC = [
      sec( 0.62, 2.22, 2.74, 2.48, 0.25, 0.29, 0.25, 0.85, NAC_Y),
      sec( 0.42, 2.20, 2.77, 2.48, 0.28, 0.31, 0.27, 0.80, NAC_Y),
      sec(-0.70, 2.20, 2.77, 2.48, 0.28, 0.31, 0.27, 0.80, NAC_Y),
      sec(-1.25, 2.21, 2.75, 2.47, 0.26, 0.29, 0.25, 0.80, NAC_Y),
      sec(-1.55, 2.25, 2.70, 2.47, 0.22, 0.25, 0.21, 0.85, NAC_Y)
    ];
    var nac = loft(NAC, 10, null, 0.02);
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    var IZ = Z(NAC_H);
    both(skin, cyl(0.285, 0.30, 0.20, 16, "x", 0.71, NAC_Y, IZ, true));
    /* the drum's back face, where it stands past the cowl's shoulders */
    both(skin, disc(0.30, 16, [0.61, NAC_Y, IZ], [-1, 0, 0]));
    both(skin, place(new V.TorusGeometry(0.258, 0.032, 4, 16), 0.81, NAC_Y, IZ, 0, PI / 2, 0));
    both(rubber, disc(0.27, 16, [0.75, NAC_Y, IZ], [1, 0, 0]));
    both(rubber, inward(cyl(0.272, 0.272, 0.08, 16, "x", 0.78, NAC_Y, IZ, true)));
    both(dark, sph(0.13, 10, 6, 0.80, NAC_Y, IZ, 1.35, 1, 1));

    /* ----------------------------------------------------- the exhausts --
       Without the HIRSS (the UH-60A as delivered, the S-70C-2, every
       Seahawk) each T700 blows through a short pipe turned aft and out from
       the nacelle tail: the dark mouth in every photograph. The UH-60L
       carries the Hover IR Suppressor boxes there, which stand out to the
       9 ft 8 in the TM gives over them; the UH-60M's turn their gas up. */
    if (!VR.hirss) {
      var exDir = [-0.80, 0.60, 0], exL = 0.40;
      var e0 = [-1.46, NAC_Y - 0.02, IZ], e1 = [e0[0] + exDir[0] * exL, e0[1] + exDir[1] * exL, IZ];
      var eT = [e1[0] + exDir[0] * 0.003, e1[1] + exDir[1] * 0.003, IZ];
      var eB = [e1[0] - exDir[0] * 0.10, e1[1] - exDir[1] * 0.10, IZ];
      both(skin, bar(e0, e1, 0.225, 14, false));
      both(rubber, inward(bar(eB, eT, 0.215, 14, false)));
      both(rubber, bar2(eB, [eB[0] + exDir[0] * 0.002, eB[1] + exDir[1] * 0.002, IZ], 0.215, 0.0005, 14));
      both(skin, bar2(e1, eT, 0.225, 0.215, 14));
    } else {
      var HF = -1.42, HR = -3.05;
      both(skin, pod([
        [[HF, 0.64, Z(2.18)], [HF, 1.18, Z(2.10)], [HF, 1.18, Z(2.66)], [HF, 0.64, Z(2.74)]],
        [[HF - 0.30, 0.66, Z(2.16)], [HF - 0.30, 1.30, Z(2.06)], [HF - 0.30, 1.30, Z(2.64)], [HF - 0.30, 0.66, Z(2.72)]],
        [[HR, 0.80, Z(2.10)], [HR, 1.473, Z(2.04)], [HR, 1.473, Z(2.52)], [HR, 0.80, Z(2.58)]]]));
      /* the outlet across the back of the box */
      both(rubber, facing([[HR - 0.006, 0.86, Z(2.16)], [HR - 0.006, 1.43, Z(2.10)], [HR - 0.006, 1.43, Z(2.48)],
                         [HR - 0.006, 0.86, Z(2.16)], [HR - 0.006, 1.43, Z(2.48)], [HR - 0.006, 0.86, Z(2.53)]], [-1, 0, 0]));
      if (VR.hirss === 2) {
        /* the upturned exhaust: the cover's after part kicked up 30 degrees,
           the gas leaving upward into the rotor wash */
        both(skin, solid([[HR + 0.42, 0.86, Z(2.56)], [HR + 0.42, 1.473, Z(2.50)], [HR - 0.16, 1.473, Z(2.84)], [HR - 0.16, 0.86, Z(2.90)]],
                         [[HR + 0.42, 0.86, Z(2.52)], [HR + 0.42, 1.473, Z(2.46)], [HR - 0.16, 1.473, Z(2.80)], [HR - 0.16, 0.86, Z(2.86)]]));
      }
    }

    /* ---------------------------------------------- the main gearbox mast
       (in the tilt frame below) and the fixed kit on the deck */
    if (VR.ircm) {
      /* the ALQ-144 lantern on its pedestal behind the mast (TM Figure
         2-1, item 5; the MH-60R's ALQ-144 in the equipment lists) */
      var jz = deckTop(-1.55);
      metal.push(box(0.26, 0.24, 0.12, -1.55, 0, jz + 0.04));
      dark.push(cyl(0.115, 0.115, 0.22, 12, "z", -1.55, 0, jz + 0.21));
      metal.push(cyl(0.125, 0.125, 0.03, 12, "z", -1.55, 0, jz + 0.335));
    }
    /* blade aerials: on the transition fairing, under the cabin and under
       the tail cone; a whip at the tail cone root */
    dark.push(box(0.30, 0.03, 0.20, -2.70, 0, deckTop(-2.70) + 0.08, 0, 0.30, 0));
    dark.push(box(0.26, 0.03, 0.18, -1.30, 0, fusAt(-1.30).zb - 0.08));
    dark.push(box(0.24, 0.03, 0.16, -5.60, 0, fusAt(-5.60).zb - 0.07));
    /* pitot tubes at the front corners of the cockpit roof */
    for (s = -1; s <= 1; s += 2) {
      dark.push(bar([3.02, s * 0.60, Z(2.15)], [3.06, s * 0.62, Z(2.27)], 0.016, 5, true));
      dark.push(bar([3.06, s * 0.62, Z(2.27)], [3.30, s * 0.62, Z(2.27)], 0.013, 5, true));
    }
    if (VR.wsps) {
      /* the wire strike protection cutters: over the cockpit roof and under
         the nose (TM Figure 2-1, items 1, 4 and 17) */
      dark.push(bar([2.98, 0, Z(2.19)], [2.80, 0, Z(2.49)], 0.022, 5, true));
      dark.push(box(0.26, 0.012, 0.07, 2.89, 0, Z(2.33), 0, -1.03, 0));
      dark.push(bar([3.96, 0, Z(0.53)], [4.12, 0, Z(0.33)], 0.022, 5, true));
      dark.push(box(0.22, 0.012, 0.06, 4.04, 0, Z(0.43), 0, 0.90, 0));
    }

    /* --------------------------------------------------- the glazing ----
       Cut from the loft a few centimetres proud: the two windshield panes
       either side of the centre post, the overhead windows over the pilots,
       the cockpit door windows, the chin windows low on the nose, and the
       cabin's windows, which differ between the two airframes. */
    var OFF = 0.028;
    var wsW = lin(3.74, 0.58, 3.12, 0.66);
    both(glass, patch(FUS, 3.74, 3.12, function (x) { return thAtY(FUS, x, wsW(x)); },
                      function (x) { return thAtY(FUS, x, 0.05); }, 6, 5, OFF));
    both(glass, patch(FUS, 3.04, 2.62, function (x) { return thAtY(FUS, x, 0.47); },
                      function (x) { return thAtY(FUS, x, 0.10); }, 3, 3, OFF));
    both(glass, patch(FUS, 3.30, 2.62, function (x) { return thAtZ(FUS, x, Z(1.40)); },
                      function (x) { return Math.min(thAtZ(FUS, x, Z(2.02)), thAtY(FUS, x, 0.71)); }, 5, 4, OFF));
    /* a height along x, straight between the stations given */
    function pwl(xs, hs) {
      return function (x) {
        for (var q = 0; q < xs.length - 1; q++)
          if (x <= xs[q] && x >= xs[q + 1]) return hs[q] + (hs[q + 1] - hs[q]) * (xs[q] - x) / (xs[q] - xs[q + 1]);
        return x > xs[0] ? hs[0] : hs[hs.length - 1];
      };
    }
    /* A pane across the skin's widest line, cut in two along it. The loft
       turns its side in sharply there (ring angle 0: above it the section
       narrows toward its top width, below toward its belly width), and a
       pane cut across that crease in one piece let the crease through it,
       up to 3 cm on the chin windows. */
    function paneX(xa, xb, zLo, zHi, nx, nLo, nHi, off) {
      off = off || OFF;
      return [patch(FUS, xa, xb, function (x) { return thAtZ(FUS, x, Z(zLo(x))); }, cnst(0), nx, nLo, off),
              patch(FUS, xa, xb, cnst(0), function (x) { return thAtZ(FUS, x, Z(zHi(x))); }, nx, nHi, off)];
    }
    /* The chin windows, the TM's "D": an upright aft edge 0.14 m ahead of
       the cockpit door, a nearly flat sill at 0.63 m and a head at 1.35 m,
       rounding to a point 0.36 m short of the nose. The nose's facets turn
       fast here, so the pane is cut finer than the others: a chord across a
       facet edge dips under it by its sag. */
    var CWX = [4.28, 4.20, 4.10, 3.95, 3.75, 3.54];
    var cwB = pwl(CWX, [0.92, 0.88, 0.80, 0.70, 0.64, 0.63]), cwT = pwl(CWX, [1.10, 1.24, 1.31, 1.35, 1.35, 1.30]);
    paneX(4.28, 3.54, cwB, cwT, 10, 3, 4).forEach(function (pp) { both(glass, pp); });
    function sideWin(list, x0, x1, h0, h1, mir) {
      var p = patch(FUS, x0, x1, function (x) { return thAtZ(FUS, x, Z(h0)); },
                    function (x) { return thAtZ(FUS, x, Z(h1)); }, 2, 3, OFF);
      if (mir === 0) both(list, p); else list.push(mir < 0 ? mirrorY(p) : p);
    }
    if (!SEA) {
      /* the TM's Figures 2-1 and 6-9: the gunner's pair of windows in the
         forward cabin, between the cockpit bulkhead at STA 247 and the
         door; the two windows of the sliding door, which runs from STA 305
         to 375, astride the mast */
      sideWin(glass, 2.06, 1.80, 1.32, 1.96, 0);
      sideWin(glass, 1.76, 1.54, 1.32, 1.96, 0);
      sideWin(glass, 0.88, 0.26, 1.30, 1.92, 0);
      sideWin(glass, 0.04, -0.64, 1.30, 1.92, 0);
    } else {
      /* one cabin window a side. Starboard, the jettisonable window in the
         sliding door; between it and the cockpit door a solid panel and
         hatch, where the Black Hawk has its gunner's windows. Port, the
         sensor operator's jettisonable window, just ahead of the launcher
         and nearly as tall (NATOPS 1.4.2; SH-60B 161171 at Patuxent River,
         1981, and an HSL-43 SH-60B, 1988; SH-60F of HS-10; MH-60R IN753 and
         167050; S-70C(M) 2307 and 2312) */
      sideWin(glass, 0.60, -0.24, 1.34, 1.88, -1);
      paneX(0.58, -0.06, cnst(1.14), cnst(1.80), 2, 2, 3).forEach(function (pp) { glass.push(pp); });
    }

    /* ---------------------------------------------- the main landing gear
       Fixed. Each wheel trails on a drag beam hinged in a faired stub at the
       foot of the cockpit door, its oleo standing up into the cabin side
       (the 0-26135 and S-70C(M) 2312 close-ups). 26 x 10.00-11 tyres, 8 ft
       10.6 in apart on the Black Hawk, 8 ft 8 in on the Seahawk. */
    var MW_X = 1.14, MW_R = 0.33, MW_W = 0.254, MWY = SEA ? 1.32 : 1.354;
    var stubO = MWY - 0.06;
    both(skin, pod([
      [[2.64, 0.98, Z(0.64)], [2.64, 1.10, Z(0.64)], [2.64, 1.10, Z(0.78)], [2.64, 0.98, Z(0.80)]],
      [[2.52, 0.98, Z(0.57)], [2.52, stubO, Z(0.59)], [2.52, stubO, Z(0.82)], [2.52, 0.98, Z(0.85)]],
      [[1.86, 0.98, Z(0.57)], [1.86, stubO, Z(0.59)], [1.86, stubO, Z(0.80)], [1.86, 0.98, Z(0.83)]],
      [[1.74, 0.98, Z(0.62)], [1.74, stubO - 0.06, Z(0.63)], [1.74, stubO - 0.06, Z(0.76)], [1.74, 0.98, Z(0.78)]]]));
    var axIn = MWY - MW_W / 2 - 0.02;
    both(metal, bar([1.88, axIn, Z(0.64)], [MW_X + 0.04, axIn, ZG(MW_R + 0.02)], 0.065, 8, true));
    both(metal, bar([MW_X + 0.10, axIn - 0.01, ZG(MW_R + 0.06)], [MW_X + 0.16, 1.10, Z(0.95)], 0.075, 8, true));
    both(metal, bar([MW_X + 0.16, 1.10, Z(0.95)], [MW_X + 0.20, 1.06, Z(1.18)], 0.055, 8, true));
    both(metal, cyl(0.05, 0.05, 0.16, 8, "y", MW_X, axIn + 0.04, ZG(MW_R)));
    both(rubber, cyl(MW_R, MW_R, MW_W, 18, "y", MW_X, MWY, ZG(MW_R)));
    both(metal, cyl(0.16, 0.16, MW_W + 0.012, 12, "y", MW_X, MWY, ZG(MW_R)));

    /* ------------------------------------------------- the tail gear ----
       The Black Hawk's single tailwheel trails under the tail cone, 29 ft
       behind the mains. The Seahawk's pair is 13 ft further forward, under
       the transition section, so that it fits a frigate's deck. */
    if (!SEA) {
      var TW_X = -7.72, TW_R = 0.225, TW_W = 0.16;
      metal.push(bar([-7.20, 0, Z(0.77)], [TW_X + 0.04, 0, ZG(TW_R + 0.07)], 0.05, 8, true));
      metal.push(bar([-7.34, 0, Z(0.82)], [TW_X + 0.10, 0, ZG(TW_R + 0.12)], 0.055, 8, true));
      metal.push(box(0.14, TW_W + 0.10, 0.07, TW_X + 0.07, 0, ZG(TW_R + 0.09)));
      both(metal, box(0.30, 0.03, 0.08, TW_X + 0.04, TW_W / 2 + 0.035, ZG(TW_R + 0.03), 0, 0.45, 0));
      metal.push(cyl(0.035, 0.035, TW_W + 0.10, 8, "y", TW_X, 0, ZG(TW_R)));
      rubber.push(cyl(TW_R, TW_R, TW_W, 14, "y", TW_X, 0, ZG(TW_R)));
      metal.push(cyl(0.10, 0.10, TW_W + 0.01, 10, "y", TW_X, 0, ZG(TW_R)));
    } else {
      var SW_X = -3.74, SW_R = 0.19, SW_W = 0.13, SW_Y = 0.17;
      skin.push(box(0.36, 0.24, 0.12, -3.60, 0, Z(0.46)));
      metal.push(bar([-3.60, 0, Z(0.44)], [SW_X + 0.03, 0, ZG(SW_R + 0.06)], 0.07, 8, true));
      metal.push(cyl(0.04, 0.04, 2 * SW_Y + SW_W, 8, "y", SW_X, 0, ZG(SW_R)));
      both(rubber, cyl(SW_R, SW_R, SW_W, 14, "y", SW_X, SW_Y, ZG(SW_R)));
      both(metal, cyl(0.09, 0.09, SW_W + 0.01, 10, "y", SW_X, SW_Y, ZG(SW_R)));
    }

    /* --------------------------------------------------- the tail pylon --
       Swept 41 degrees (SER 70452), from the end of the tail cone to the
       tail gearbox: its root aerofoil lies along the boom top at 1.6 m, its
       tip under the gearbox fairing at 3.35 m. On the Seahawk it folds; the
       hinge is not modelled. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var finRoot = foil([-7.92, Z(1.60)], [-9.32, Z(1.48)], 0.30, finAt);
    var finTip = foil([-9.62, Z(3.34)], [-10.52, Z(3.40)], 0.24, finAt);
    skin.push(solid(finRoot, finTip));
    var CAP = [
      sec( -9.44, 3.38, 3.58, 3.48, 0.06, 0.09, 0.06, 0.80),
      sec( -9.62, 3.28, 3.68, 3.48, 0.14, 0.17, 0.13, 0.62),
      sec(-10.15, 3.26, 3.70, 3.48, 0.16, 0.19, 0.14, 0.58),
      sec(-10.55, 3.32, 3.64, 3.48, 0.13, 0.15, 0.11, 0.62),
      sec(-10.75, 3.42, 3.54, 3.48, 0.04, 0.05, 0.04, 0.85)
    ];
    var cap = loft(CAP, 8, 0.05, 0.03);
    for (i = 0; i < cap.length; i++) skin.push(cap[i]);
    /* the cooling grille on the gearbox fairing, port side */
    dark.push(box(0.26, 0.012, 0.16, -10.05, 0.185, Z(3.47)));
    /* The stabilator: all-moving, 4.37 m across its tip caps, 1.12 m chord
       at the root and 0.77 m at the tips, at the foot of the pylon under the
       tail rotor. Shown at the 4 degrees, trailing edge down, it holds at
       cruise. */
    var INC = 4 * D2R, HINGE = ST_LE0 - 0.25 * (ST_LE0 - ST_TE0);
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + (x - HINGE) * Math.tan(INC) + kk]; }; }
    var stRoot = foil([ST_LE0, 0], [ST_TE0, 0], 0.157, stabAt(STAB_Y0));
    var stTip = foil([ST_LE1, 0], [ST_TE1, 0], 0.108, stabAt(STAB_Y1));
    both(skin, solid(stRoot, stTip));
    both(skin, sph(0.055, 8, 4, (ST_LE1 + ST_TE1) / 2, STAB_Y1, Z(STAB_H) + ((ST_LE1 + ST_TE1) / 2 - HINGE) * Math.tan(INC), 7.0, 0.9, 1.0));

    /* ---------------------------------------------------- Seahawk kit ---- */
    if (SEA) {
      /* the weapon stations: a pylon off the lower cabin side with its
         BRU-14 rack and the torpedo under it. Left inboard below the
         sonobuoy launcher, right one further aft (NATOPS Figure 1-3); the
         SH-60F's third, left outboard, on an extended beam. */
      var TR_ = 0.162, TL = VR.torp;
      var torpProf = [[TL / 2, 0], [TL / 2 - 0.02, 0.09], [TL / 2 - 0.09, 0.15], [TL / 2 - 0.20, TR_],
                      [-TL / 2 + 0.34, TR_], [-TL / 2 + 0.30, 0.172], [-TL / 2 + 0.02, 0.172], [-TL / 2, 0.12], [-TL / 2, 0]];
      VR.stations.forEach(function (st) {
        var xc = st === "R" ? -1.55 : st === "Lo" ? -0.50 : -0.75;
        var yo = st === "Lo" ? 1.70 : 1.42, ty = st === "Lo" ? 1.64 : 1.30, sg = st === "R" ? -1 : 1;
        var yi = sideY(xc, Z(0.80)) - 0.04;
        var parts = [[skin, pod([[[xc + 0.40, yi, Z(0.72)], [xc + 0.40, yo, Z(0.74)], [xc + 0.40, yo, Z(0.84)], [xc + 0.40, yi, Z(0.88)]],
                                 [[xc - 0.40, yi, Z(0.72)], [xc - 0.40, yo, Z(0.74)], [xc - 0.40, yo, Z(0.84)], [xc - 0.40, yi, Z(0.88)]]])],
                     [dark, box(0.62, 0.10, 0.08, xc, ty, Z(0.69))],
                     [store, latheX(torpProf, 12, ty, Z(0.69) - 0.04 - TR_)],
                     [store, box(0.12, 0.012, 0.30, xc - TL / 2 + 0.10, ty, Z(0.69) - 0.04 - TR_, PI / 4, 0, 0)],
                     [store, box(0.12, 0.012, 0.30, xc - TL / 2 + 0.10, ty, Z(0.69) - 0.04 - TR_, -PI / 4, 0, 0)]];
        parts[2][1].translate(xc, 0, 0);
        parts.forEach(function (pp) { pp[0].push(sg < 0 ? mirrorY(pp[1]) : pp[1]); });
      });
      if (VR.hoist) {
        /* the rescue hoist over the starboard cabin door */
        metal.push(bar([0.30, -0.80, Z(2.18)], [0.30, -1.28, Z(2.30)], 0.05, 8, true));
        metal.push(cyl(0.13, 0.13, 0.50, 12, "x", 0.30, -1.36, Z(2.24)));
        dark.push(cyl(0.135, 0.135, 0.06, 12, "x", 0.06, -1.36, Z(2.24)));
      }
      if (VR.sono) {
        /* the 25-tube pneumatic launcher on the port side, five by five,
           above the left weapon pylon (NATOPS 1.4.1), loaded from outside */
        var L0 = -0.18, L1 = -0.98, LH0 = 0.98, LH1 = 1.78;
        paneX(L0, L1, cnst(LH0), cnst(LH1), 2, 1, 2, 0.012).forEach(function (pp) { dark.push(pp); });
        for (i = 0; i < 5; i++) for (k = 0; k < 5; k++) {
          /* each tube's breech cap square to the skin under it */
          var bx = L0 - 0.08 - i * 0.16, bth = thAtZ(FUS, bx, Z(LH0 + 0.08 + k * 0.16));
          var bp = surfPt(FUS, bx, bth), bn = surfN(FUS, bx, bth, bx + 0.01, bx - 0.01);
          metal.push(disc(0.055, 8, [bp[0] + bn[0] * 0.02, bp[1] + bn[1] * 0.02, bp[2] + bn[2] * 0.02], bn));
        }
      }
      if (VR.rast) {
        /* the RAST probe on the centreline just aft of the mast */
        dark.push(cyl(0.14, 0.14, 0.05, 12, "z", -0.30, 0, Z(0.455)));
        metal.push(cyl(0.075, 0.06, 0.24, 10, "z", -0.30, 0, Z(0.33)));
      }
      if (VR.mad) {
        /* The ASQ-81 towed body ("bird") and its reeling machine, on the
           faired structure out of the starboard side of the forward tail
           cone, above and aft of the right weapon pylon (NATOPS 1.4.1). Where
           161171 shows it, side on at Patuxent River in 1981: the housing
           from the transition section to 5.4 m behind the mast, 1.2 to 1.7 m
           up, its reeling machine dark in its outboard face; the bird slung
           under its outer edge, nose level with the twin tail wheels, 1.14 m
           up, 0.18 m through and 1.45 m long, then its 0.55 m drogue. Yellow
           with a red nose and drogue there and on 702 and 707 of HSL-51. */
        var H_ = function (h) { return Z(h - VR.gl); };   /* above her own ground */
        skin.push(mirrorY(pod([
          [[-3.75, 0.46, H_(1.40)], [-3.75, 0.62, H_(1.40)], [-3.75, 0.62, H_(1.62)], [-3.75, 0.46, H_(1.62)]],
          [[-4.05, 0.44, H_(1.28)], [-4.05, 1.10, H_(1.28)], [-4.05, 1.10, H_(1.68)], [-4.05, 0.44, H_(1.68)]],
          [[-4.30, 0.42, H_(1.24)], [-4.30, 1.30, H_(1.24)], [-4.30, 1.30, H_(1.70)], [-4.30, 0.42, H_(1.70)]],
          [[-5.25, 0.36, H_(1.24)], [-5.25, 1.30, H_(1.24)], [-5.25, 1.30, H_(1.68)], [-5.25, 0.36, H_(1.68)]],
          [[-5.42, 0.34, H_(1.30)], [-5.42, 1.05, H_(1.30)], [-5.42, 1.05, H_(1.60)], [-5.42, 0.34, H_(1.60)]]])));
        dark.push(mirrorY(box(0.92, 0.012, 0.34, -4.78, 1.306, H_(1.46))));
        var BY = 1.19, BZ = H_(1.14);
        mad.push([mirrorY(latheX([[-4.03, 0], [-4.05, 0.05], [-4.09, 0.08], [-4.16, 0.09], [-4.20, 0.09]], 12, BY, BZ)), 0xc8321e]);
        mad.push([mirrorY(latheX([[-4.20, 0.09], [-5.36, 0.09]], 12, BY, BZ)), 0xe0b82a]);
        mad.push([mirrorY(latheX([[-5.36, 0.09], [-5.46, 0.07], [-5.77, 0.27], [-5.78, 0.265], [-5.48, 0.055], [-5.48, 0]], 12, BY, BZ)), 0xc8321e]);
      }
      /* the nose kit. Radomes, ESM boxes and the turret are painted the
         airframe's grey in every photograph, so they are skin. */
      if (VR.esm === "chin") {
        /* ALQ-142 (SH-60B) / ALQ-210 (MH-60R) boxes at the chin corners,
           facing forward and out */
        both(skin, convex([[[4.50, 0.36, Z(0.56)], [4.43, 0.64, Z(0.56)], [4.43, 0.64, Z(0.84)], [4.50, 0.36, Z(0.84)]],
                           [[4.22, 0.36, Z(0.56)], [4.22, 0.62, Z(0.56)], [4.22, 0.62, Z(0.84)], [4.22, 0.36, Z(0.84)]],
                           [[4.50, 0.36, Z(0.56)], [4.43, 0.64, Z(0.56)], [4.22, 0.62, Z(0.56)], [4.22, 0.36, Z(0.56)]],
                           [[4.50, 0.36, Z(0.84)], [4.43, 0.64, Z(0.84)], [4.22, 0.62, Z(0.84)], [4.22, 0.36, Z(0.84)]],
                           [[4.43, 0.64, Z(0.56)], [4.22, 0.62, Z(0.56)], [4.22, 0.62, Z(0.84)], [4.43, 0.64, Z(0.84)]],
                           [[4.50, 0.36, Z(0.56)], [4.22, 0.36, Z(0.56)], [4.22, 0.36, Z(0.84)], [4.50, 0.36, Z(0.84)]]]));
      } else if (VR.esm === "cheek") {
        /* the S-70C(M)'s ESM box on each cheek of the nose cone */
        both(skin, box(0.24, 0.20, 0.17, 4.42, 0.40, Z(1.03), 0, 0, 0.42));
      }
      if (VR.datalink) skin.push(sph(0.15, 12, 5, 4.18, 0, fusAt(4.18).zb + 0.02, 1, 1, 0.65));
      if (VR.flir) {
        /* The AAS-44 turret stands ON the nose mount: a shelf run forward
           from the lower nose at about the nose tip's height, a post under
           its forward half, and the turret on its front end, its top about
           level with the chin windows' (MH-60R IN753, the first two RAN
           MH-60Rs in 2013, HSM-77 head-on, 167050; the same bracket on
           FHS-equipped SH-60Bs 702 and 707). The NATOPS gives its reach:
           42 ft 10 in folded against 40 ft 11 in without it, the turret's
           face 23 in ahead of STA 162, the datum both are measured from. */
        skin.push(pod([
          [[4.40, 0.22, Z(0.84)], [4.40, -0.22, Z(0.84)], [4.40, -0.22, Z(0.98)], [4.40, 0.22, Z(0.98)]],
          [[4.74, 0.22, Z(0.84)], [4.74, -0.22, Z(0.84)], [4.74, -0.22, Z(0.98)], [4.74, 0.22, Z(0.98)]],
          [[5.10, 0.20, Z(0.89)], [5.10, -0.20, Z(0.89)], [5.10, -0.20, Z(0.98)], [5.10, 0.20, Z(0.98)]],
          [[5.18, 0.14, Z(0.92)], [5.18, -0.14, Z(0.92)], [5.18, -0.14, Z(0.98)], [5.18, 0.14, Z(0.98)]]]));
        skin.push(latheZ([[Z(0.62), 0.0005], [Z(0.64), 0.09], [Z(0.69), 0.12], [Z(0.86), 0.12], [Z(0.87), 0.0005]], 10, 4.88, 0));
        skin.push(latheZ([[Z(0.975), 0.0005], [Z(0.975), 0.19], [Z(1.00), 0.205], [Z(1.25), 0.205], [Z(1.33), 0.17],
                          [Z(1.385), 0.0005]], 14, 4.95, 0));
        /* its window, the sensors looking ahead */
        glass.push(box(0.03, 0.17, 0.15, 5.152, 0, Z(1.15)));
      }
      if (VR.radome === "tub" || VR.radome === "disc") {
        /* The search radar: the APS-124 (SH-60B), then the APS-147/153
           (MH-60R) in the same place, a broad round dish under the forward
           fuselage from behind the chin to just ahead of the main gear, as
           wide as the belly and the lowest thing on the aircraft (NATOPS:
           11.2 in of ground clearance; the NATOPS side and bottom views;
           161171 in 1981, 707 and 450; MH-60R IN753, 167050, HSM-40 from
           below and HSM-77 head-on, 2.0 m across against her 2.64 m tread).
           The MH-60R's is flat-bottomed, the SH-60B's a shallower dome. */
        skin.push(latheZ(VR.radome === "tub" ?
          [[Z(0.25), 0.0005], [Z(0.25), 0.80], [Z(0.28), 0.91], [Z(0.34), 0.95], [Z(0.47), 0.95], [Z(0.52), 0.0005]] :
          [[Z(0.24), 0.0005], [Z(0.25), 0.62], [Z(0.29), 0.86], [Z(0.36), 0.93], [Z(0.44), 0.92], [Z(0.52), 0.0005]], 20, 2.30, 0));
      } else if (VR.radome === "tub2") {
        /* the S-70C(M)'s undernose radar: a smaller tub from under the chin
           windows back to the cockpit doors' after edge, ahead of the main
           gear stubs (2312 at Zuoying; the nose at CCK in 2011) */
        var TUB = [], tq = [[0, 0.40, 0.14], [0.08, 0.30, 0.80], [0.22, 0.03, 0.97], [0.80, 0, 1], [0.93, 0.05, 0.86], [1, 0.38, 0.30]];
        for (i = 0; i < tq.length; i++) {
          var tx = 3.88 + (2.52 - 3.88) * tq[i][0], fb = fusAt(tx);
          var zt0 = (fb.zb - GROUND) + 0.06, zb0 = 0.24 + tq[i][1] * (zt0 - 0.24);
          TUB.push(sec(tx, zb0, zt0, zb0 + (zt0 - zb0) * 0.55, 0.36 * tq[i][2] * 0.92, 0.36 * tq[i][2], 0.36 * tq[i][2] * 0.96, 0.5));
        }
        var tub = loft(TUB, 8, 0.02, 0.02);
        for (i = 0; i < tub.length; i++) skin.push(tub[i]);
      }
    } else {
      /* ------------------------------------------------- Black Hawk kit -- */
      if (VR.guns) {
        /* the door guns on pintles in the gunner's windows (TM 2.4: "two
           7.62 mm machineguns, one on each side in the forward cabin") */
        var gd = [0.5, 0.866, 0];
        var g0 = [1.93, 1.28, Z(1.62)];
        both(metal, bar([1.92, 1.14, Z(1.42)], [1.93, 1.24, Z(1.58)], 0.025, 6, true));
        both(store, bar([g0[0] - gd[0] * 0.20, g0[1] - gd[1] * 0.20, g0[2]], [g0[0] + gd[0] * 0.22, g0[1] + gd[1] * 0.22, g0[2]], 0.055, 6, true));
        both(store, bar([g0[0] + gd[0] * 0.22, g0[1] + gd[1] * 0.22, g0[2]], [g0[0] + gd[0] * 0.78, g0[1] + gd[1] * 0.78, g0[2]], 0.022, 6, true));
      }
      if (VR.wx) {
        /* the S-70C-2's weather radar, a black radome on the nose cone
           (LH92217 and LH92210) */
        dark.push(latheX([[5.00, 0.0005], [4.98, 0.08], [4.92, 0.15], [4.84, 0.18], [4.50, 0.18], [4.50, 0.0005]], 14, 0, Z(0.86)));
      }
    }

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the outer halves of
       the stabilator, a plate laid a centimetre clear of the aerofoil's
       upper surface between 18% and 72% chord; and a band right round the
       tail cone, cut from its own sections 3% oversize, which reads from
       the side as well. */
    function flash(le, te, mid, th, y0, y1) {
      function top(f, y, kk) {
        var x = le(y) + (te(y) - le(y)) * f;
        return [x, y, mid(x) + th(y) * (0.5 - 0.12 * (f - 0.15) / 0.6) + kk];
      }
      var lo = [top(0.18, y0, 0.010), top(0.72, y0, 0.010), top(0.72, y1, 0.010), top(0.18, y1, 0.010)];
      var hi = [top(0.18, y0, 0.024), top(0.72, y0, 0.024), top(0.72, y1, 0.024), top(0.18, y1, 0.024)];
      return solid(lo, hi);
    }
    function lerpY(p, q, y0, y1) { return function (y) { return p + (q - p) * (y - y0) / (y1 - y0); }; }
    both(team, flash(lerpY(ST_LE0, ST_LE1, STAB_Y0, STAB_Y1), lerpY(ST_TE0, ST_TE1, STAB_Y0, STAB_Y1),
                     function (x) { return Z(STAB_H) + (x - HINGE) * Math.tan(INC); },
                     lerpY(0.157, 0.108, STAB_Y0, STAB_Y1), 1.05, 2.06));
    /* the band's rings are the loft's own ring points at those stations,
       interpolated exactly as its quads are, pushed 3% and 1 cm out from
       the section's middle, so no facet of the skin can show through; a
       2 cm bevel at each edge brings it down to the skin, so no view looks
       in under the rim */
    function bandRing(x, k, c) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), ra = ringOf(A, FUS_N), rb = ringOf(B, FUS_N), out = [], cy = 0, cz = 0, j;
          for (j = 0; j < ra.length; j++) out.push([ra[j][0] + (rb[j][0] - ra[j][0]) * f, ra[j][1] + (rb[j][1] - ra[j][1]) * f]);
          for (j = 0; j < out.length; j++) { cy += out[j][0]; cz += out[j][1]; }
          cy /= out.length; cz /= out.length;
          return out.map(function (p) {
            var dy = p[0] - cy, dz = p[1] - cz, l = Math.sqrt(dy * dy + dz * dz) || 1;
            return [x, cy + dy * k + dy / l * c, cz + dz * k + dz / l * c];
          });
        }
      }
      return null;
    }
    var BX = VR.band || -6.13;
    var bR = [bandRing(BX, 1.006, 0.004), bandRing(BX - 0.02, 1.03, 0.01),
              bandRing(BX - 0.62, 1.03, 0.01), bandRing(BX - 0.64, 1.006, 0.004)], bq = [], bk;
    for (bk = 0; bk < 3; bk++) {
      var bA = bR[bk], bB = bR[bk + 1];
      for (i = 0; i < bA.length; i++) {
        var i2 = (i + 1) % bA.length;
        bq.push(bA[i], bB[i], bA[i2], bA[i2], bB[i], bB[i2]);
      }
    }
    team.push(facingOut(bq, [BX - 0.32, 0, fusAt(BX - 0.32).zm]));
    /* and a panel on the top of the forward engine-deck fairing, between the
       cockpit roof and the mast, the one stretch of the upper airframe the
       rotor head and the nacelles leave clear when seen from above */
    both(team, patch(DECK, 2.30, 1.45, function (x) { return thAtY(DECK, x, 0.30); },
                     function () { return PI / 2; }, 3, 3, 0.02));

    /* ======================================================= main rotor ==
       Tilt group at the hub, the shaft leaning 3 degrees forward. The mast
       and the swashplate's fixed ring are built into the fixed fittings in
       that frame; they do not turn. */
    var tiltM = new V.Matrix4().makeRotationY(MAST_TILT).setPosition(0, 0, Z(HUB_H));
    var mastParts = [cyl(0.13, 0.14, 0.62, 14, "z", 0, 0, -0.36),
                     cyl(0.36, 0.36, 0.05, 18, "z", 0, 0, -0.44)];
    for (i = 0; i < mastParts.length; i++) { mastParts[i].applyMatrix4(tiltM); metal.push(mastParts[i]); }
    /* the tail rotor's output shaft housing, from the gearbox face out to
       the hub, in the tail mount's frame (below); it does not turn */
    var shaftH = cyl(0.085, 0.10, 0.20, 12, "z", 0, 0, -0.08);
    shaftH.applyMatrix4(new V.Matrix4().makeRotationX(PI / 2 - TR_CANT).setPosition(TR_X,
      TR_Y + TR_OUT * Math.cos(TR_CANT), Z(TR_H) - TR_OUT * Math.sin(TR_CANT)));
    metal.push(shaftH);

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, rubber, T.rubber, "tyres_soot");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");
    meshVC(g, mad, T.mad, "mad_bird");

    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    /* The mount: +PI/2 about X points the rotor node's local +Y - the axis
       render3d.js turns it positively about - up the leaning shaft, so the
       head turns anti-clockwise from above; head undoes the turn so the head
       is authored in model axes, with its origin at the hub centre in the
       plane of the blade roots. */
    var mnt = new V.Group();
    mnt.rotation.x = PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    /* The forged titanium hub with its four elastomeric bearings, the blade
       cuffs, the hydraulic lag dampers on the trailing side and the pitch
       horns on the leading side with their links down to the swashplate's
       turning ring; on top, the four-armed bifilar vibration absorber, its
       pendulum weights between the blades (the TM's top view). The Seahawk
       adds the fold hinges outboard of the cuffs. */
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.22, 0.24, 0.22, 16, "z", 0, 0, 0));
    hubM.push(cyl(0.33, 0.33, 0.05, 16, "z", 0, 0, -0.30));
    hubM.push(cyl(0.15, 0.18, 0.14, 14, "z", 0, 0, 0.17));
    hubM.push(cyl(0.12, 0.12, 0.05, 12, "z", 0, 0, 0.29));
    var CH = SEA || !VR.wcb ? 0.533 : 0.578;
    var LE = 0.25 * CH, TE = LE - CH, R = ROTOR_R;
    for (k = 0; k < 4; k++) {
      /* 45, 135, 225 and 315 degrees: no blade lies along the fuselage */
      a = (45 + 90 * k) * D2R;
      var bparts = [[box(0.42, 0.24, 0.18, 0.31, 0, 0), hubM],
                    [cyl(0.11, 0.11, 0.22, 12, "x", 0.50, 0, 0), hubM],
                    [box(0.56, 0.20, 0.11, 0.86, 0, 0), hubM],
                    [cyl(0.045, 0.045, 0.56, 8, "x", 0.58, -0.17, 0.03), hubD],
                    [box(0.15, 0.07, 0.06, 0.40, 0.18, -0.07), hubD],
                    [cyl(0.022, 0.022, 0.24, 6, "z", 0.40, 0.20, -0.19), hubD]];
      if (SEA) bparts.push([box(0.14, 0.27, 0.15, 1.16, 0, 0.01), hubM]);
      for (i = 0; i < bparts.length; i++) { bparts[i][0].rotateZ(a); bparts[i][1].push(bparts[i][0]); }
      /* the bifilar arm and its pendulum weight, at 45 degrees to the blades */
      var ba = a + PI / 4;
      var arm = box(0.40, 0.10, 0.05, 0.22, 0, 0.245); arm.rotateZ(ba); hubM.push(arm);
      var wt = cyl(0.085, 0.085, 0.13, 10, "z", 0.43, 0, 0.245); wt.rotateZ(ba); hubD.push(wt);
      /* Blade outline, blade along +X: anti-clockwise from above, so the
         leading edge is on +Y, the quarter chord on the pitch axis. The
         original blade (UH-60A/L, every Seahawk, the S-70s) keeps its 0.533 m
         chord into a tip swept back 20 degrees over the last 0.55 m; the
         UH-60M's wide-chord blade, 1.74 in wider, ends in a tip swept and
         tapered to 55% chord and drooped 20 degrees over its last 0.45 m. */
      var bl, tip = null;
      if (CH < 0.55) {
        var SW = 0.55 * Math.tan(20 * D2R);
        bl = M.slab(V, [[1.08, TE + 0.08], [1.30, TE], [R - 0.55, TE], [R, TE - SW], [R, LE - SW - 0.01],
                        [R - 0.55, LE], [1.30, LE], [1.08, LE - 0.05]], 0.05);
      } else {
        var RB = R - 0.45, SW2 = Math.tan(30 * D2R), TS = Math.tan(8 * D2R);
        bl = M.slab(V, [[1.08, TE + 0.08], [1.30, TE], [R - 0.60, TE], [RB, TE - 0.15 * TS],
                        [RB, LE - 0.15 * SW2], [R - 0.60, LE], [1.30, LE], [1.08, LE - 0.05]], 0.05);
        tip = M.slab(V, [[RB, TE - 0.15 * TS], [R, TE - 0.60 * TS], [R, LE - 0.60 * SW2], [RB, LE - 0.15 * SW2]], 0.045);
        tip.translate(-RB, 0, 0); tip.rotateY(20 * D2R); tip.translate(RB, 0, 0);
      }
      var pieces = tip ? [bl, tip] : [bl];
      for (i = 0; i < pieces.length; i++) {
        pieces[i].translate(0, 0, -0.025);
        pieces[i].rotateY(-2 * D2R);           /* coned: tips up */
        pieces[i].rotateZ(a);
        blades.push(pieces[i]);
      }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine ever sees, and it
       casts no shadow (see the AH-64E file) */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.04)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       On the starboard side of the pylon, a tractor, its shaft canted 20
       degrees up so it lifts as well as pulls (NATOPS 1.1). The mount turns
       70 degrees about X: inside it local X is the model's X, local +Z the
       shaft (to starboard and 20 degrees up), local +Y the disc's own "up",
       leaning in over the pylon. render3d.js turns the rotor positively
       about local +Z: top blade aft, clockwise seen from the left. A
       bearingless crossbeam carries the four 0.247 m blades as two crossed
       pairs, the outer pair a little further out along the shaft. One blade
       points straight aft as built: see WHAT SETS THE SCALE. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y + TR_OUT * Math.cos(TR_CANT), Z(TR_H) - TR_OUT * Math.sin(TR_CANT));
    tm.rotation.x = PI / 2 - TR_CANT;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.10, 0.11, 0.16, 12, "z", 0, 0, 0.08), cyl(0.07, 0.025, 0.10, 10, "z", 0, 0, 0.21)];
    var trB = [];
    for (k = 0; k < 4; k++) {
      var tang = (180 + 90 * k) * D2R, zoff = (k & 1) ? TR_OUT : TR_OUT - 0.05;
      var tb = box(TR_R - 0.30, TR_CHORD, 0.032, 0.30 + (TR_R - 0.30) / 2, 0, 0);
      tb.rotateX(8 * D2R);                     /* pitch: thrust to starboard */
      tb.rotateZ(tang);
      tb.translate(0, 0, zoff);
      trB.push(tb);
      var beam = box(0.34, 0.07, 0.03, 0.17, 0, 0);
      beam.rotateZ(tang); beam.translate(0, 0, zoff);
      trM.push(beam);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");
    return g;
  }

  function variant(k) { return function (THREE, M, C) { return build(THREE, M, C, VARIANTS[k]); }; }
  return {
    mh60r: variant("mh60r"), sh60b: variant("sh60b"), sh60f: variant("sh60f"),
    s70cm54: variant("s70cm54"), s70cm46: variant("s70cm46"),
    uh60a: variant("uh60a"), uh60l: variant("uh60l"), uh60m: variant("uh60m"),
    uh60m_roca: variant("uh60m_roca"), s70c2: variant("s70c2")
  };
})();

/* len is the MEASURED x extent, rotor disc front to the tip of the aft tail
   rotor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["asw_helo_n"]         = { len: 19.77, build: HeroH60.mh60r };
UNIT_MODELS["nato_e00_aswhelo"]   = { len: 19.77, build: HeroH60.mh60r };
UNIT_MODELS["nato_e80_lamps"]     = { len: 19.77, build: HeroH60.sh60b };
UNIT_MODELS["nato_e90_aswhelo"]   = { len: 19.77, build: HeroH60.sh60f };
UNIT_MODELS["asw_helo_r"]         = { len: 19.77, build: HeroH60.s70cm54 };
UNIT_MODELS["roc_e00_aswhelo"]    = { len: 19.77, build: HeroH60.s70cm46 };
UNIT_MODELS["trans_n"]            = { len: 19.77, build: HeroH60.uh60m };
UNIT_MODELS["nato_e80_transport"] = { len: 19.77, build: HeroH60.uh60a };
UNIT_MODELS["nato_e90_transport"] = { len: 19.77, build: HeroH60.uh60l };
UNIT_MODELS["nato_e00_transport"] = { len: 19.77, build: HeroH60.uh60m };
UNIT_MODELS["trans_r"]            = { len: 19.77, build: HeroH60.uh60m_roca };
UNIT_MODELS["roc_e00_transport"]  = { len: 19.77, build: HeroH60.uh60m_roca };
UNIT_MODELS["pla_e80_transport"]  = { len: 19.77, build: HeroH60.s70c2 };
