/* ============================================================================
   roc_air.js  --  HERO models: Republic of China (Taiwan) aircraft
   ----------------------------------------------------------------------------
   Republic of China Air Force and Army Aviation rows that drew generic
   air_specs / rotor_specs airframes. One file, seven builds:

     roc_e50_cas        Republic F-84G Thunderjet          HeroRocAir.f84g
     roc_e50_transport  Curtiss C-46D Commando             HeroRocAir.c46d
     roc_e60_cas        North American F-100A Super Sabre  HeroRocAir.f100a
     roc_e80_cas        AIDC AT-3A/B Tzu Chung             HeroRocAir.at3
     roc_e90_cas        AIDC F-CK-1A/B Ching-kuo           HeroRocAir.fck1a  } one builder,
     roc_e00_cas        AIDC F-CK-1C/D Hsiang Sheng        HeroRocAir.fck1c  } FCK_VARIANTS
     roc_e80_gunship    Hughes 500MD/TOW Defender          HeroRocAir.md500mdTow
                        (calls HeroKpaAir.md500d, js/hero/kpa_air.js)
     roc_e90_gunship    Bell AH-1W SuperCobra              HeroRocAir.ah1w

   Reuse (policy 5): gb_misc_aircraft.js draws the swept F-84F, a different
   airframe, so the F-84G is drawn here. kpa_air.js's 500D is called through
   its export and the 500MD/TOW items are added to what it returns.
   us_bell_huey.js exports only whole AH-1G and UH-1D builds: the AH-1G is the
   single-engine Cobra with its tail rotor on the port side, so it does not
   fit the twin-engine AH-1W, which is drawn here.

   All plain: no ROC roundel, fin flash, serials, unit badges or display
   colours, and no camouflage pattern; one ground colour each (sampled where
   a photograph shows it). Team colour (C.team) as small strips. Model space
   +X nose, +Y port, +Z up, metres. One mesh per material per group. The
   fixed-wing undercarriage retracts, so it is the group "gear"; the
   helicopter skids are fixed and are not.

   ======================================================================
   1. REPUBLIC F-84G THUNDERJET (roc_e50_cas)
   REFERENCES
     D84  Commons "Republic F-84 Thunderjet 3-view.svg" (1600 px render; en.
          wikipedia captions it an F-84C, the same straight-wing Thunderjet):
          side, plan and head-on, every table below. One scale, 89.9 px/m,
          set by the side view's 1044 px = the published 11.61 m; the plan
          is drawn at the same scale (1045 px nose to tail).
     P84  Commons "HAFm F-84G (7097).JPG" (an F-84G, Hellenic Air Force
          Museum, front three-quarter): the round nose intake, the framed
          canopy, the tip tanks, the gear legs. Its dark blue museum paint is
          not used.
     Published (en.wikipedia "Republic F-84 Thunderjet", F-84G, Thompson
     1982): length 38 ft 1 in (11.61 m), span 36 ft 5 in (11.10 m), height
     12 ft 7 in (3.84 m), wing area 260 sq ft.
     P84S Commons "F-84 - Side View (RTAF Museum).JPG" (RTAF F-84G 1231,
          starboard side from slightly ahead, 1600 px): the STANCE. D84
          draws the wheels as bare circles with no legs, so the gear is set
          from this photograph, by ratios taken at one station each (both
          scales cancel within a station):
          - main-gear station: belly-to-ground 115 px against fuselage depth
            203 px, 0.567; times D84's depth there (1.59 m) = 0.90 m (D84's
            wheel circles gave 0.935 m). The ground point is the image
            midpoint of the two main tyres' contacts (they straddle the
            centreline). The legs are set to 0.90 m.
          - fin station: fin top over ground 458 px against fin top over
            tailplane 212 px, 2.16; times D84's 1.86 m = 4.0 m. Its ground
            point is extrapolated 357 px back along the centreline ground line
            through the nose tyre and that midpoint, so +/- 0.2 m.
          - tip tank: bottom about 2.2 tank diameters (1.9 m) above the ground
            (the model has 1.55 m): it does not support a lower stance.
          - nose: the intake centre stands 1.59 m up (by the fuselage depth
            just behind the lip), 0.15 m under the model's; the museum
            aircraft sits about 1.6 deg nose-down or its nose oleo is
            compressed. The model is kept level (the airframe as drawn).
          The overall length could not be used: the photograph is taken from
          ahead of the wing, so it is foreshortened.
   RECOGNITION: round nose intake with the splitter; straight tapered wing
   (LE 2.68 m root chord to 1.58 m tip, D84 plan), 5 deg dihedral (D84
   head-on, measured), the wing low on the deep fuselage; the 230 gal tip
   tanks with their two small tail fins; the framed hood; the tall fin with
   the tailplane on the tail cone; the long tricycle gear.
   MEASURED: L 11.65 m (published 11.61); W 12.55 m over the tip tanks and
   10.79 m over the wing tips (D84's wing-tip span against length, 0.93,
   matches 36 ft 5 in being the span without the tanks; over the tanks it
   would be 1.08); H 4.28 m against the published 3.84. The stance is set
   from P84S at the main-gear station (0.90 m under the belly), and its fin
   station gives 4.0 +/- 0.2 m. To reach 3.84 m, the belly would have to sit
   0.46 m off the ground, half of what P84S shows, so the airframe was not
   lowered to fit. The fin top is 3.38 m over the belly on D84. Why the
   published figure is lower is NOT CONFIRMED: it may be measured another
   way, or it may belong to another variant.
   NOT CONFIRMED: the ROC paint (no ROCAF F-84G photograph fetched: plain
   natural metal, as P84S and the USAF G); the gear leg and door outlines
   (D84 has none: legs under its wheels, length from P84S); the gun port
   positions (D84 plan marks); the speed brake outline. Not drawn: stores,
   the refuelling receptacle, markings.

   ======================================================================
   2. CURTISS C-46D COMMANDO (roc_e50_transport)
   REFERENCES
     D46  Commons "Curtiss C-46 Commando 3-view line drawing.png" (1400 px),
          dimensioned in inches: 915.81 in long, 1296.62 in span, 162 in
          four-blade propellers, 311 in track, the 9 1/2 deg ground angle,
          260.50 in tail-down height. Side view 39.57 px/m (its 915.81 in =
          920 px), plan 39.37 px/m (its 427.20 and 254.60 in dimensions);
          the plan's fore-and-aft run is 3.7 % shorter than the side view's
          and is mapped onto it (csx). The plan's starboard wing is drawn 80
          px longer than its port wing; the port (dimensioned) half is used.
     Published (en.wikipedia "Curtiss C-46 Commando"): length 76 ft 4 in
     (23.27 m), span 108 ft (32.92 m), height 21 ft 9 in (6.63 m), wing area
     1,360 sq ft.
   RECOGNITION: the deep "double bubble" fuselage, 3.97 m deep by 3.30 m
   wide (D46); the stepped cockpit glazing over the round nose; the long
   tapered wing, 2.7 deg dihedral inboard of the nacelles and 5.7 deg out
   (measured on D46 head-on; its note says 7 deg); the big round-cowled
   nacelles, 4.01 m out, running back over the wing; the tall rounded fin;
   the cargo door and cabin windows on the port side; four-blade props.
   ATTITUDE (policy 4, ru_il10.js): the C-46 sits tail-down at 9 1/2 deg
   (D46). Drawn LEVEL: the main wheels where D46 puts them (1.42 m tyres
   under the nacelles), the tailwheel leg lengthened from D46's 0.18 m to
   2.20 m so the tailwheel meets the same ground. Level, the fin top is
   8.80 m up; the published 6.63 m (D46's 260.50 in) is in the tail-down
   attitude.
   MEASURED: L 23.35 m (23.27), W 33.07 m (32.92), H 8.80 m level (6.63 m
   tail-down, above).
   NOT CONFIRMED: ROC paint (no ROCAF C-46 photograph fetched: plain natural
   metal); the cowl's radius (D46 side and plan disagree: 0.71 m drawn);
   the starboard windows (no reference shows the starboard side, none
   drawn); the nacelle's aft fairing outline; the exhaust stack position.

   ======================================================================
   3. NORTH AMERICAN F-100A SUPER SABRE (roc_e60_cas)
   REFERENCES
     D100 Commons "North American F-100A Super Sabre 3-view line drawing.png"
          (T.O. 1F-100A-2-1 "Airplane Dimensions", 1400 px): 47.0 ft long,
          53.9 ft with the nose boom, 38.8 ft span (the extended wing), 15.5
          ft high on the static ground line, 12.4 ft track, 18.8 ft
          stabilizer, 5.6 ft maximum fuselage width, 45 deg at quarter chord,
          NACA 64A007, no dihedral. One scale, 64.0 px/m, from its 47.0 ft
          (917 px).
     P100 Commons "Taiwan F-100s.jpg" (en.wikipedia: ROCAF F-100As in
          flight): natural metal, the tall fin, the dorsal spine, two
          underwing tanks (the tanks are not drawn: no dimensions fetched).
     Published (en.wikipedia, F-100D): length 50 ft, span 38 ft 9 in,
     height 16 ft 2.75 in; the F-100A figures are D100's.
   RECOGNITION: the oval nose intake with the pitot boom on its lower lip;
   wing LE 48.4 deg, TE 26.6 deg (D100 plan, measured), low on the
   fuselage, no dihedral, with the closed slats' seam; the low all-moving
   tailplane; the tall swept fin with the dorsal spine to the canopy; the
   afterburner nozzle.
   ATTITUDE: D100 stands nose-up on its static ground line (about 4 deg).
   Drawn level on the fuselage reference line, the mains where D100 draws
   them; the nose leg is 0.28 m shorter than D100's so its wheel meets the
   same ground.
   MEASURED: L 16.45 m with the boom (D100 53.9 ft = 16.43 m; 14.33 m
   without); W 11.72 m (38.8 ft = 11.83 m); H 5.02 m level (15.5 ft = 4.72 m
   in the nose-up static attitude, where the fin drops about 0.4 m).
   NOT CONFIRMED: the gun port positions; the gear doors; the canopy width
   (0.37 m half width, D100 plan, small).

   ======================================================================
   4. AIDC AT-3A/B TZU CHUNG (roc_e80_cas)
   REFERENCES
     D3   Commons "AIDC AT-3.svg" (1400 px): plan, head-on and side. Side
          70.8 px/m (probe to rudder 913 px = the published 12.9 m); plan
          69.0 px/m (tip to tip 722 px = 10.46 m), its length mapped onto
          the side's (a3sx, 1.8 % apart).
     DP   Commons "Profil AIDC AT-3.png": a check of D3's layout.
     P3   Commons "ROCAF AIDC AT-3 Aoki-1", "-3", "-5" and "ROCAF AIDC AT-3
          0832 Display at Hsinchu Air Force Base 20151121a": the slab-sided
          nacelles hugging the fuselage with their D intakes, the stepped
          tandem canopy with three frames, the low tailplane on the spine,
          the gear. They wear the Thunder Tiger display colours: the white
          ground is kept, the red and blue bands are markings and are not.
     Published (en.wikipedia "AIDC AT-3"): length 12.9 m with the pitot,
     span 10.46 m, height 4.36 m, wing area 21.93 m2.
   RECOGNITION: the two engines in nacelles on the fuselage sides with D
   intakes; straight-tapered wing (LE 11.8 deg, TE 5 deg forward, D3 plan),
   low; the long stepped two-seat canopy; the swept fin and the tailplane
   on the spine; the pitot ahead of the radome.
   MEASURED: L 12.87 m (12.9), W 10.38 m (10.46), H 4.39 m (4.36).
   NOT CONFIRMED: the AT-3A/B attack aircraft's service paint (every
   photograph fetched is a display aircraft: plain white); the dihedral
   (D3 head-on: 0.5 deg port, 2.1 deg starboard; the mean, 1.3 deg, is
   drawn); the main track (D3 head-on, one leg drawn: 3.87 m). Not drawn:
   pylons, the gun pod.

   ======================================================================
   5. AIDC F-CK-1 CHING-KUO (roc_e90_cas A/B, roc_e00_cas C/D)
   No line drawing found on Commons; measured off photographs, each view off
   ONE photograph (policy 2):
     PA   Commons "ROCAF AIDC F-CK-1A Ching Kuo Aoki-2.jpg" (from above,
          1200 px): the planform. Probe to nozzles 1052 px = the published
          14.21 m, 74.0 px/m. Widths are half the silhouette per column.
     PC   Commons "AIDC F-CK-1C Ching-kuo '1441 / 84-8062'.jpg" (port side,
          gear down, 1200 px): the side profile. 74.2 px/m on the same
          length.
     PB   "ROCAF AIDC F-CK-1A Ching Kuo Aoki-1" (banked): the planform and
          rails again, the fin, the ventral fins.
     PG   "ROCAF AIDC F-CK-1A Ching Kuo Aoki-3", "-4" (on the ground): the
          intakes, the gear, the two-tone grey of the A.
     Published (en.wikipedia "AIDC F-CK-1 Ching-kuo"): length 14.21 m, span
     9 m, height 4.42 m, wing area 24.2 m2.
   RECOGNITION: the half-round side intakes under the wing-root extensions;
   the wing (LE 32 deg, TE swept forward 11.6 deg, PA) running into the
   root extension; wingtip launch rails; twin nozzles 0.82 m apart; the
   bubble canopy; the swept fin and all-moving tailplanes; two ventral fins.
   VARIANTS (FCK_VARIANTS): PC (a C) and the A photographs show the same
   outline; no C/D difference is drawn. Only the paint shade differs, each
   sampled off its own photograph. The two-seat B and D are not drawn
   (both rows name the type; the single-seat canopy is drawn).
   MEASURED: L 14.24 m (14.21); W 8.64 m over the rails (published 9.0 m;
   PA measures 8.66 m: the photograph may be slightly rolled, or the
   figure includes the missiles); H 4.57 m (4.42 m: PC's gear is down in
   flight, its oleos extended; ground taken at the near main tyre).
   NOT CONFIRMED: the main track (2.56 m: no head-on measured; the legs
   are put under the intakes, PG); the ventral fin outline; the intake
   depth; the wing thickness (4.5 %). Not drawn: stores, the drop tank.

   ======================================================================
   6. HUGHES 500MD/TOW DEFENDER (roc_e80_gunship)
   The 500D airframe is HeroKpaAir.md500d (js/hero/kpa_air.js: its own
   references E, F, G and measurements; five-blade rotor, T-tail). Added:
     D500 Commons "McDonnell Douglas MD 500 Defender 3-view line drawing.png"
          (574 px): the TOW sight drum in the nose on the PORT side (head-on
          0.40 m out, 0.55 m proud of the pod), two twin-tube TOW launchers
          1.58 m out on outriggers through the cabin floor, s 2.0 to 4.0 m.
          Scaled by kpa_air's own pod (1.75 m deep, 1.54 m wide).
     R13  Commons, Flickr 9668446785 (the ROK Army 500MD/TOW from behind,
          2013, Korean title): the T-tail with endplates, the launcher on its
          outrigger, the five blades and the domed cap over the head.
     R14  Commons, Flickr 13883235272 (ROK Army 500MD firing a TOW, 2014):
          five blades, the T-tail, the skids, the launcher.
     RL   Commons "Givat Olga 090976 Lahatut 01.jpg" (an Israeli 500MD/TOW):
          the twin launchers on their outrigger beam.
     RN   Commons, the ROC Navy 500MD/ASW photograph (Chinese title): the
          ROC flew the type; its ASW fit (radar nose, MAD bird) is not this
          row's TOW Defender and is not drawn.
     Published (en.wikipedia "Hughes OH-6 Cayuse", kpa_air.js): rotor 8.03 m;
     9.24 m with rotors; 2.48 m to the hub.
   MEASURED: L 9.18 m (9.24); rotor 8.03 m; H 2.98 m to the cap (the hub
   2.76 m, kpa_air.js's own measurement against the published 2.48 m).
   ROTOR GROUP NAMES: "rotor" (with "rotordisc" inside), "tailrotor"
   (kpa_air.js's, unchanged; the cap is added inside "rotor").
   NOT CONFIRMED: which rotor the ROC's machines had: D500 draws FOUR
   blades and RL has four with the 500C tail; R13/R14 (the ROK Army's
   500MD/TOW) have five and the T-tail, as kpa_air's 500D, which is kept.
   No ROC 500MD/TOW photograph was found. The tube radius (0.17 m, D500
   head-on, coarse); the outrigger braces; the ROC paint (kpa_air's olive).

   ======================================================================
   7. BELL AH-1W SUPERCOBRA (roc_e90_gunship)
   REFERENCES
     DW   Commons "Bell AH-1W SuperCobra orthographical image.svg" (1800 px):
          plan, head-on, side. Side 69.3 px/m (nose to fin 962 px = the
          published 45 ft 7 in fuselage); plan 70.55 px/m (its own length),
          mapped onto the side (ahs); head-on 1.05 x the plan.
     R9   Commons "One 4-round XM65 Missile Launcher on Outboard Hardpoint
          of ROCA AH-1W 20110813.jpg": a ROC Army AH-1W: the dark olive
          (sampled), the 4-round TOW launcher outboard, two over two, the
          stub-wing tip box with its dispenser grid, the skid.
     Published (en.wikipedia "Bell AH-1 SuperCobra", AH-1W): 58 ft long with
     rotors turning, fuselage 45 ft 7 in, stub wings 10 ft 9 in, height 13
     ft 9 in; its rotor entry reads 45 ft 7 in, the fuselage figure again.
   RECOGNITION: the narrow tandem fuselage and flat-plate canopy; the two
   T700 nacelles beside the pylon fairing with their big exhausts (twin
   engines, against the AH-1G's one); the M197 three-barrel chin gun; the
   stub wings with tip boxes, a 19-tube pod inboard and the TOW launcher
   outboard; two-blade rotor, 0.86 m chord (DW plan); the tail rotor on the
   STARBOARD side of the swept fin (DW plan); skids.
   MEASURED: L 17.44 m with rotors (58 ft = 17.68 m); rotor 14.29 m off DW
   (48 ft, 14.63 m, is the usual figure; not fetched); stub wings 3.32 m
   over the tip boxes (10 ft 9 in = 3.28 m); H 4.11 m (13 ft 9 in = 4.19 m).
   ROTOR GROUP NAMES: "rotor" (unrotated, local +Z up the mast; turns
   anti-clockwise from above, as a Bell head) holding "rotordisc";
   "tailrotor" (unrotated, local Y the shaft) holding its own "rotordisc".
   NOT CONFIRMED: the inboard store (DW's 19-tube pod; R9 shows only the
   outboard station); the tail rotor's distance from the fin (0.24 m); the
   rocket pod and tube lengths (DW side, small); the blade root and hub
   detail. Not drawn: Hellfire rails, Sidewinders, markings.
   ========================================================================== */

/* DETAIL PASS (2026-11): every skin sheet gains fastener rows, access panels, grime, airflow
   streaks and stains; each airframe gains position lamps (red / green material), beacons, the
   white tail lamp, blade aerials, oleo pistons with torque links and hub caps, and its own
   fittings: F-84G the wire aerial, boarding step and jet-pipe ring; F-100A the eyelid ring and
   flame holder, speed brake and steps; C-46D the de-icing boots, windscreen posts, pitot masts,
   ADF loop, long wire, cowl flaps and cargo-door hinges; AT-3 the canopy sills, jet-pipe rims and
   speed brakes; F-CK-1 the splitter plates, intake lips, nozzle petals and canopy sills; 500MD/TOW
   the sight's frame and ring, tube bands and caps, braces, skid shoes and steps, the whip; AH-1W the
   canopy sills and hinges, steps, intake screens, exhaust lips, skid shoes, the wire-strike
   cutters (R9), RWR fairings, blade bolts and tip caps. Placement read off each table's drawing
   or photograph; sizes NOT measured. Extents and len unchanged; 16 draw calls or fewer. */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocAir = (function () {
  "use strict";

  var PI = Math.PI, HALF_PI = PI / 2, D2R = PI / 180;
  var V = null;                       /* THREE, set by each build */

  /* ================================================================ kit ==
     Every part is a BufferGeometry already placed in model space and pushed
     on a list named after its material; emit() merges each list into one
     mesh, so a build costs one draw call per material per group. */
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvas(W, H) { var cv = document.createElement("canvas"); cv.width = W; cv.height = H; return cv; }
  function texOf(cv) {
    var t = new V.CanvasTexture(cv);
    t.wrapS = t.wrapT = V.RepeatWrapping;
    if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }
  /* a skin sheet: the base colour, sheets of slightly different tone, panel
     seams and rivet rows. Kept light, so the airframe reads as one finish. */
  var _sheets = {};
  function skinSheet(key, base, dk, pale, seed, metal) {
    if (_sheets[key] !== undefined) return _sheets[key];
    try {
      var W = 512, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(seed), i, x;
      g.fillStyle = base; g.fillRect(0, 0, W, H);
      for (i = 0; i < (metal ? 22 : 12); i++) {
        g.globalAlpha = (metal ? 0.10 : 0.05) + R() * (metal ? 0.14 : 0.06);
        g.fillStyle = (i % 3 === 0) ? pale : dk;
        g.fillRect(R() * W, R() * H, 20 + R() * 70, 10 + R() * 34);
      }
      g.globalAlpha = 1;
      g.strokeStyle = "rgba(20,22,22,0.26)"; g.lineWidth = 1.2;
      x = 0;
      while (x < W) { x += 24 + R() * 40; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      g.strokeStyle = "rgba(20,22,22,0.14)"; g.lineWidth = 1;
      for (i = 0; i < 40; i++) {
        var px = R() * W, py = R() * H, L = 20 + R() * 70;
        g.beginPath();
        if (R() < 0.6) { g.moveTo(px, py); g.lineTo(px + L, py); } else { g.moveTo(px, py); g.lineTo(px, py + L * 0.5); }
        g.stroke();
      }
      g.strokeStyle = "rgba(20,22,22,0.24)";
      for (i = 0; i < 10; i++) g.strokeRect(R() * W, R() * H, 8 + R() * 20, 6 + R() * 12);
      if (metal) {
        g.fillStyle = "rgba(0,0,0,0.16)";
        for (i = 0; i < 24; i++) {
          var ry = R() * H, rx = R() * W * 0.85, m = 10 + ((R() * 24) | 0);
          for (var k = 0; k < m; k++) g.fillRect(rx + k * 5, ry, 1.2, 1.2);
        }
      }
      /* detail pass: every finish gets the fastener rows along its seams
         (u runs along the airframe, so the frames are the uprights), access
         panels with a fastener at each corner, grime smudges, airflow
         streaks running aft and a few darker oil and exhaust stains */
      g.fillStyle = "rgba(0,0,0," + (metal ? 0.20 : 0.16) + ")";
      x = 0;
      while (x < W) {
        x += 30 + R() * 46;
        for (var yy = 2; yy < H; yy += 5) g.fillRect(x + 3, yy, 1.1, 1.1);
      }
      for (i = 0; i < 18; i++) {
        var fy = R() * H, fx = R() * W, fl = 40 + R() * 120;
        for (var q = 0; q < fl; q += 5) g.fillRect(fx + q, fy, 1.1, 1.1);
      }
      for (i = 0; i < 18; i++) {
        var bx = R() * W, by = R() * H, bw = 10 + R() * 26, bh = 8 + R() * 16;
        g.strokeStyle = "rgba(14,16,16,0.32)"; g.lineWidth = 1;
        g.strokeRect(bx, by, bw, bh);
        g.fillStyle = "rgba(0,0,0,0.30)";
        g.fillRect(bx + 1, by + 1, 1.4, 1.4); g.fillRect(bx + bw - 2.4, by + 1, 1.4, 1.4);
        g.fillRect(bx + 1, by + bh - 2.4, 1.4, 1.4); g.fillRect(bx + bw - 2.4, by + bh - 2.4, 1.4, 1.4);
      }
      for (i = 0; i < 70; i++) {
        g.fillStyle = "rgba(30,28,22," + (0.03 + R() * 0.05).toFixed(3) + ")";
        g.fillRect(R() * W, R() * H, 14 + R() * 60, 4 + R() * 16);
      }
      for (i = 0; i < 120; i++) {
        g.fillStyle = "rgba(24,22,18," + (0.04 + R() * 0.06).toFixed(3) + ")";
        g.fillRect(R() * W, R() * H, 16 + R() * 70, 1 + R() * 1.2);
      }
      for (i = 0; i < 6; i++) {
        var sx0 = R() * W, sy0 = R() * H, sg = g.createLinearGradient(sx0, 0, sx0 + 90, 0);
        sg.addColorStop(0, "rgba(20,16,12,0.22)"); sg.addColorStop(1, "rgba(20,16,12,0)");
        g.fillStyle = sg; g.fillRect(sx0, sy0, 90, 3 + R() * 6);
      }
      _sheets[key] = texOf(cv);
    } catch (e) { _sheets[key] = null; }
    return _sheets[key];
  }
  /* the materials of one airframe: P is its palette */
  function makeMats(C, P) {
    var tc = (C && C.team !== undefined) ? C.team : 0x5f7fd6;
    var rough = P.metal ? 0.62 : 0.78, metl = P.metal ? 0.32 : 0.10;
    function sk(key, col, dk, pale, seed) {
      var m = new V.MeshStandardMaterial({ color: 0xffffff, roughness: rough, metalness: metl, side: V.DoubleSide });
      var t = skinSheet(key, col, dk, pale, seed, P.metal);
      if (t) m.map = t; else m.color.set(col);
      return m;
    }
    return {
      skin: sk(P.key, P.base, P.dk, P.pale, P.seed),
      skin2: sk(P.key + "_2", P.base2 || P.base, P.dk, P.pale, P.seed + 7),
      ink: new V.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.92, metalness: 0.05, side: V.DoubleSide }),
      metal: new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.48, metalness: 0.58, side: V.DoubleSide }),
      hot: new V.MeshStandardMaterial({ color: 0x3a3632, roughness: 0.58, metalness: 0.50, side: V.DoubleSide }),
      tyre: new V.MeshStandardMaterial({ color: 0x1c1d1e, roughness: 0.95, metalness: 0.02 }),
      nose: new V.MeshStandardMaterial({ color: P.nose || 0x2e3133, roughness: 0.70, metalness: 0.10, side: V.DoubleSide }),
      glass: new V.MeshPhysicalMaterial({ color: 0x24343b, roughness: 0.10, metalness: 0.30, clearcoat: 0.4,
                                          transparent: true, opacity: 0.82, side: V.DoubleSide }),
      team: new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.15, side: V.DoubleSide }),
      blade: new V.MeshStandardMaterial({ color: P.blade || 0x26292a, roughness: 0.75, metalness: 0.12, side: V.DoubleSide }),
      disc: new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08, transparent: true,
                                         opacity: 0.06, depthWrite: false, side: V.DoubleSide }),
      lampR: new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 }),
      lampG: new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }),
      /* the redo's panel seams (only builders that lay them emit this) */
      seam: new V.MeshStandardMaterial({ color: 0x4c5052, roughness: 0.8, metalness: 0.2, side: V.DoubleSide })
    };
  }

  function flat(g) { return g.index ? g.toNonIndexed() : g; }
  function merge(list) {
    var n = 0, i, o = 0;
    var parts = list.map(function (g) {
      g = flat(g);
      if (!g.attributes.normal) g.computeVertexNormals();
      n += g.attributes.position.count;
      return g;
    });
    var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
    for (i = 0; i < parts.length; i++) {
      var a = parts[i].attributes;
      P.set(a.position.array, o * 3);
      N.set(a.normal.array, o * 3);
      if (a.uv) U.set(a.uv.array, o * 2);
      o += a.position.count;
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.BufferAttribute(P, 3));
    g.setAttribute("normal", new V.BufferAttribute(N, 3));
    g.setAttribute("uv", new V.BufferAttribute(U, 2));
    return g;
  }
  function emit(parent, K, mats) {
    Object.keys(K).forEach(function (k) {
      if (K[k].length) parent.add(new V.Mesh(merge(K[k]), mats[k]));
    });
  }
  function lists() {
    return { skin: [], skin2: [], ink: [], metal: [], hot: [], tyre: [], nose: [], glass: [], team: [], blade: [], disc: [],
             lampR: [], lampG: [], seam: [] };
  }
  /* small parts take one clean spot of the sheet */
  function pin(g) {
    g = flat(g);
    var u = g.attributes.uv;
    if (u) for (var j = 0; j < u.count; j++) u.setXY(j, 0.5, 0.5);
    return g;
  }

  /* superellipse sections {x, w, zt, zb, zw, e, yc}: half width w at height
     zw, top zt, bottom zb, each quarter a superellipse of exponent e (1 an
     ellipse, below 1 squarer). Nose first. u along the loft, v round it. */
  function S(x, zt, zb, w, zw, e) { return { x: x, w: w, zt: zt, zb: zb, zw: zw === undefined ? (zt + zb) / 2 : zw, e: e || 1 }; }
  function O(x, r, zc, yc) { return { x: x, w: r, zt: zc + r, zb: zc - r, zw: zc, e: 1, yc: yc || 0 }; }
  function loft(secs, segs, capA, capB, a0, a1) {
    var pos = [], uv = [], idx = [], i, j, part = a0 !== undefined;
    if (!part) { a0 = 0; a1 = PI * 2; }
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (i = 0; i < secs.length; i++) {
      var s = secs[i], e = s.e || 1, zw = s.zw === undefined ? (s.zt + s.zb) / 2 : s.zw;
      for (j = 0; j <= segs; j++) {
        var t = a0 + (a1 - a0) * j / segs, cy = Math.cos(t), sz = Math.sin(t);
        var y = (s.yc || 0) + s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        var dz = (sz >= 0 ? (s.zt - zw) : (zw - s.zb)) * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        pos.push(s.x, y, zw + dz);
        uv.push(x1 === x0 ? 0 : (s.x - x0) / (x1 - x0), j / segs);
      }
    }
    var ring = segs + 1;
    for (i = 0; i < secs.length - 1; i++)
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        if (x1 < x0) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    function cap(ri, front) {
      var base = ri * ring, cx = 0, cy2 = 0, cz = 0;
      for (j = 0; j < segs; j++) { cx += pos[(base + j) * 3]; cy2 += pos[(base + j) * 3 + 1]; cz += pos[(base + j) * 3 + 2]; }
      var ci = pos.length / 3;
      pos.push(cx / segs, cy2 / segs, cz / segs); uv.push(0.5, 0.5);
      for (j = 0; j < segs; j++) {
        if (front === (x1 < x0)) idx.push(ci, base + j + 1, base + j); else idx.push(ci, base + j, base + j + 1);
      }
    }
    if (capA && !part) cap(0, true);
    if (capB && !part) cap(secs.length - 1, false);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a lifting surface lofted spanwise through stations {s, le, te, t, h}:
     a rounded-nose section thickest near 40% chord; vert: span along +Z;
     mirror: Y -> -Y. The tip is capped. */
  function foil(xc) { return Math.pow(xc, 0.75) * (1 - xc) / 0.3027; }
  function surf(sts, opt) {
    opt = opt || {};
    var K = 9, pos = [], uv = [], idx = [], ring = 2 * K, i, k;
    for (i = 0; i < sts.length; i++) {
      var st = sts[i];
      for (k = 0; k < ring; k++) {
        var up = k <= K, kk = up ? k : 2 * K - k;
        var xc = (1 - Math.cos(PI * kk / K)) * 0.5;
        var ht = (Math.max(0.003, st.t * 0.5 * foil(xc)) + (st.pad || 0)) * (up ? 1 : -1);
        if (k === 0 || k === K) ht = 0;
        var X = st.le - xc * (st.le - st.te), Sp = st.s, Z = st.h + ht;
        uv.push((st.le - X) / 6 + 0.5 * i / sts.length, Math.abs(Sp) / 8);
        if (opt.vert) pos.push(X, (st.y0 || 0) - ht, Sp); else pos.push(X, Sp, Z);
      }
    }
    var flip = (sts[sts.length - 1].s < sts[0].s) !== !!opt.mirror;
    function tri(a, b, c) { if (flip) idx.push(a, c, b); else idx.push(a, b, c); }
    for (i = 0; i < sts.length - 1; i++)
      for (k = 0; k < ring; k++) {
        var a = i * ring + k, b = i * ring + (k + 1) % ring, c = a + ring, d = b + ring;
        tri(a, c, b); tri(b, c, d);
      }
    var last = sts.length - 1, base = last * ring, cx = 0, cy = 0, cz = 0;
    for (k = 0; k < ring; k++) { cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2]; }
    var ci = pos.length / 3;
    pos.push(cx / ring, cy / ring, cz / ring); uv.push(0.5, 0.5);
    for (k = 0; k < ring; k++) tri(ci, base + (k + 1) % ring, base + k);
    if (opt.mirror) for (i = 1; i < pos.length; i += 3) pos[i] = -pos[i];
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function both(L, sts, opt) {
    opt = opt || {};
    L.push(surf(sts, opt));
    L.push(surf(sts, { mirror: true, vert: opt.vert }));
  }
  function place(g, x, y, z, rx, ry, rz) {
    if (rx || ry || rz) g.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0, "ZYX")));
    g.translate(x || 0, y || 0, z || 0);
    return g;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  /* a cylinder with its axis along Y (a wheel, an axle) */
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 16); g.translate(x, y, z); return g; }
  /* a cylinder with its axis along Z: r0 at the top */
  function cylZ(r0, r1, h, x, y, z, seg) { var g = new V.CylinderGeometry(r0, r1, h, seg || 12); g.rotateX(HALF_PI); g.translate(x, y, z); return g; }
  /* a tube along X: r0 at the front end xf, r1 at the back end xb */
  function tube(r0, r1, xf, xb, y, z, seg, open) {
    var g = new V.CylinderGeometry(r1, r0, xf - xb, seg || 12, 1, !!open);
    g.rotateZ(HALF_PI);
    g.translate((xf + xb) / 2, y || 0, z || 0);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* a flat plate from an outline in (x, z), thickness t, centred at y */
  function plateXZ(pts, t, y) {
    var sh = new V.Shape();
    pts.forEach(function (p, i) { if (i) sh.lineTo(p[0], p[1]); else sh.moveTo(p[0], p[1]); });
    var g = new V.ExtrudeGeometry(sh, { depth: t, bevelEnabled: false });
    g.translate(0, 0, -t / 2);
    g.rotateX(HALF_PI);              /* shape y -> model z, depth -> -y */
    g.translate(0, y || 0, 0);
    return pin(g);
  }
  /* the same in (x, y), thickness along z, centred at z */
  function plateXY(pts, t, z) {
    var sh = new V.Shape();
    pts.forEach(function (p, i) { if (i) sh.lineTo(p[0], p[1]); else sh.moveTo(p[0], p[1]); });
    var g = new V.ExtrudeGeometry(sh, { depth: t, bevelEnabled: false });
    g.translate(0, 0, (z || 0) - t / 2);
    return pin(g);
  }
  function wheel(L, Lt, r, w, x, y, z, hub) {
    Lt.push(cylY(r, w, x, y, z, 18));
    L.push(cylY(hub || r * 0.55, w + 0.02, x, y, z, 12));
  }
  /* linear interpolation in a table of rows by column 0 */
  function lerpTab(tab, v, col) {
    for (var i = 1; i < tab.length; i++)
      if (v <= tab[i][0]) {
        var k = (v - tab[i - 1][0]) / (tab[i][0] - tab[i - 1][0]);
        return tab[i - 1][col] + (tab[i][col] - tab[i - 1][col]) * k;
      }
    return tab[tab.length - 1][col];
  }
  /* a jet's table of fuselage rows [x, zt, zb, w, e] to sections */
  function secs(rows, zw) {
    return rows.map(function (r) { return S(r[0], r[1], r[2], r[3], zw === undefined ? (r[1] + r[2]) / 2 : zw(r), r[4] || 1); });
  }

  /* ======================================================= detail kit ==
     Added in the detail pass: the fittings the first pass left out. Small
     parts take the sheet's clean spot (pin). */
  function ball(r, x, y, z, sx, sy, sz, seg) {
    var g = new V.SphereGeometry(r, seg || 10, Math.max(4, ((seg || 10) / 2) | 0));
    g.scale(sx || 1, sy || 1, sz || 1); g.translate(x, y, z);
    return pin(g);
  }
  /* position lamps: port red at (x, y, z), starboard green at (x, -y, z) */
  function navLamps(K, x, y, z, r) {
    K.lampR.push(ball(r || 0.05, x, y, z, 1.6, 0.7, 0.7));
    K.lampG.push(ball(r || 0.05, x, -y, z, 1.6, 0.7, 0.7));
  }
  /* an anti-collision beacon: a dark base and the red lens, up (dir 1) or
     hanging under (dir -1) */
  function beacon(K, x, y, z, dir) {
    K.ink.push(pin(cylZ(0.05, 0.055, 0.04, x, y, z + dir * 0.02, 10)));
    K.lampR.push(ball(0.045, x, y, z + dir * 0.05, 1, 1, 0.8));
  }
  /* a blade aerial on the centreline (or at y): root chord c at (x, z),
     height h (negative hangs down), raked aft */
  function bladeAnt(L, x, z, h, c, y) {
    var r = Math.abs(h) * 0.45;
    L.push(plateXZ([[x + c / 2, z], [x - c / 2, z], [x - c / 2 - r, z + h], [x - c / 2 - r + c * 0.45, z + h]], 0.02, y || 0));
  }
  /* an oleo leg from axle a up to the top t: the bright piston in the lower
     third, a collar, and the torque link standing off by dx */
  function oleo(L, a, t, r, dx) {
    var f = 0.38, m = [a[0] + (t[0] - a[0]) * f, a[1] + (t[1] - a[1]) * f, a[2] + (t[2] - a[2]) * f];
    L.push(rod(a, m, r * 0.62, 10));
    L.push(pin(place(new V.CylinderGeometry(r * 1.25, r * 1.25, r * 0.9, 10), m[0], m[1], m[2], HALF_PI, 0, 0)));
    var k = [(a[0] + m[0]) / 2 + (dx || r * 2.4), (a[1] + m[1]) / 2, (a[2] + m[2]) / 2];
    L.push(rod([a[0], a[1], a[2] + r], k, r * 0.28, 5));
    L.push(rod(k, [m[0], m[1], m[2] + r * 0.6], r * 0.28, 5));
  }
  /* a wheel's hub cap and nut on its outer face (side sd) */
  function hubCap(L, x, y, z, r, w, sd) {
    L.push(cylY(r * 0.60, 0.02, x, y + sd * (w / 2 + 0.01), z, 14));
    L.push(cylY(r * 0.18, 0.04, x, y + sd * (w / 2 + 0.025), z, 8));
    for (var i = 0; i < 6; i++) {
      var an = i * PI / 3;
      L.push(cylY(r * 0.05, 0.03, x + Math.cos(an) * r * 0.36, y + sd * (w / 2 + 0.02), z + Math.sin(an) * r * 0.36, 5));
    }
  }

  /* ========================================================= detail kit ==
     (the redo) Fittings laid on the skin, and a projected paint sheet.
     ribbon()  a strip along a polyline lying on the skin (outward normal at
               each point given), lifted a little: panel seams, hinge lines,
               walkway edges, de-icer boots;
     blade()   a tapered blade aerial or a fence standing on the skin;
     lamp()    a small eight-faced lamp in a vertex colour (one material);
     sheet()   a grey-scale canvas laid over the coloured skins by projected
               UVs (plan views from above and below, the two sides): panel
               lines, rivet rows, walkways, exhaust soot and weathering. The
               skins keep their colour; the sheet only darkens it. */
  function DK(V) {
    function vsub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function vcross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function vnorm(a) { var m = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1; return [a[0] / m, a[1] / m, a[2] / m]; }
    function geo(pos, col) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      if (col) g.setAttribute("color", new V.Float32BufferAttribute(col, 3));
      g.computeVertexNormals();
      return g;
    }
    function quad(pos, a, b, c, d, n) {
      var u = vsub(b, a), v = vsub(c, a), f = vcross(u, v);
      if (n && f[0] * n[0] + f[1] * n[1] + f[2] * n[2] < 0) { var t = b; b = d; d = t; }
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2],
               a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]);
    }
    /* pts: [[x,y,z]...]; nrm: the outward normal at each point, or a
       function (p) -> normal; w the width, lift the height off the skin */
    function ribbon(pts, nrm, w, lift) {
      var pos = [], A = [], B = [], i, n = pts.length;
      if (n < 2) return null;
      for (i = 0; i < n; i++) {
        var p = pts[i], nn = vnorm(typeof nrm === "function" ? nrm(p) : (nrm[0].length ? nrm[i] : nrm));
        var t = vsub(pts[Math.min(i + 1, n - 1)], pts[Math.max(i - 1, 0)]);
        var s = vnorm(vcross(t, nn)), l = lift === undefined ? 0.012 : lift;
        var c = [p[0] + nn[0] * l, p[1] + nn[1] * l, p[2] + nn[2] * l];
        A.push([c[0] + s[0] * w / 2, c[1] + s[1] * w / 2, c[2] + s[2] * w / 2]);
        B.push([c[0] - s[0] * w / 2, c[1] - s[1] * w / 2, c[2] - s[2] * w / 2]);
        A[i].n = nn;
      }
      for (i = 0; i + 1 < n; i++) quad(pos, A[i], B[i], B[i + 1], A[i + 1], A[i].n);
      return geo(pos);
    }
    /* a blade from base point p, standing along up, chord along fwd (the
       leading edge forward); h tall, chord c0 at the root, c1 at the tip,
       th thick, the tip set back by rake */
    function blade(p, up, fwd, h, c0, c1, th, rake) {
      up = vnorm(up); fwd = vnorm(fwd);
      var sd = vnorm(vcross(up, fwd)), pos = [];
      function P(f, u, s) {
        return [p[0] + fwd[0] * f + up[0] * u + sd[0] * s, p[1] + fwd[1] * f + up[1] * u + sd[1] * s,
                p[2] + fwd[2] * f + up[2] * u + sd[2] * s];
      }
      var r = rake || 0, t = th / 2;
      var a0 = P(c0 / 2, 0, t), a1 = P(-c0 / 2, 0, t), a2 = P(-c0 / 2, 0, -t), a3 = P(c0 / 2, 0, -t);
      var b0 = P(c1 / 2 - r, h, t), b1 = P(-c1 / 2 - r, h, t), b2 = P(-c1 / 2 - r, h, -t), b3 = P(c1 / 2 - r, h, -t);
      quad(pos, a0, a1, b1, b0, sd); quad(pos, a3, a2, b2, b3, [-sd[0], -sd[1], -sd[2]]);
      quad(pos, a0, b0, b3, a3, fwd); quad(pos, a1, a2, b2, b1, [-fwd[0], -fwd[1], -fwd[2]]);
      quad(pos, b0, b1, b2, b3, up);
      return geo(pos);
    }
    /* an eight-faced lamp of radius r at p, in colour hex (vertex colour) */
    function lamp(p, r, hex) {
      var c = [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
      var pos = [], col = [], i, j;
      var X = [[r, 0, 0], [-r, 0, 0]], Y = [[0, r, 0], [0, -r, 0]], Z = [[0, 0, r], [0, 0, -r]];
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) for (var k = 0; k < 2; k++) {
        var a = X[i], b = Y[j], d = Z[k];
        pos.push(p[0] + a[0], p[1] + a[1], p[2] + a[2], p[0] + b[0], p[1] + b[1], p[2] + b[2],
                 p[0] + d[0], p[1] + d[1], p[2] + d[2]);
        col.push(c[0], c[1], c[2], c[0], c[1], c[2], c[0], c[1], c[2]);
      }
      return geo(pos, col);
    }
    /* a closed loop of points around a body: f(angle) -> [x,y,z]; the
       normal is taken radially from the axis point ax(angle) */
    function hoop(f, a0, a1, n, ax, w, lift) {
      var pts = [], nr = [], i;
      for (i = 0; i <= n; i++) {
        var a = a0 + (a1 - a0) * i / n, p = f(a), c = ax(a);
        pts.push(p); nr.push([0, p[1] - c[1], p[2] - c[2]]);
      }
      return ribbon(pts, nr, w, lift);
    }

    /* ------------------------------------------------ the paint sheet --
       Four bands on a 1024 x 2048 sheet: from above (x, y), the port side
       (x, z), the starboard side (x, z), from below (x, y). */
    function layout(xmin, xmax, ymax, zmin, zmax) {
      var TW = 1024, TH = 2048, PX = (TW - 4) / (xmax - xmin);
      var PY = Math.min(PX * 1.6, 620 / (2 * ymax)), PZ = Math.min(PX * 1.6, 300 / (zmax - zmin));
      var TOPH = Math.ceil(2 * ymax * PY) + 2, SIDEH = Math.ceil((zmax - zmin) * PZ) + 2;
      var B_PORT = TOPH + 4, B_STBD = B_PORT + SIDEH + 4, B_BOT = B_STBD + SIDEH + 4;
      return { TW: TW, TH: TH, PX: PX, PY: PY, PZ: PZ, XMIN: xmin, YMAX: ymax, ZMAX: zmax,
               TOPH: TOPH, SIDEH: SIDEH, B_PORT: B_PORT, B_STBD: B_STBD, B_BOT: B_BOT };
    }
    function cl(v, a, b) { return v < a ? a : (v > b ? b : v); }
    function projUV(geo2, L) {
      var p = geo2.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
      for (t = 0; t + 8 < p.length; t += 9) {
        var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
        var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;
        var endOn = Math.abs(nx) > 0.85;
        var band = endOn ? (nz < -0.3 ? 3 : 0) : (nz > 0.45 ? 0 : nz < -0.45 ? 3 : (ny >= 0 ? 1 : 2));
        for (k = 0; k < 3; k++) {
          var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, R;
          U = cl((x - L.XMIN) * L.PX, 1, L.TW - 1);
          if (band === 0) R = cl((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
          else if (band === 3) R = L.B_BOT + cl((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
          else R = (band === 2 ? L.B_STBD : L.B_PORT) + cl((L.ZMAX - z) * L.PZ, 1, L.SIDEH - 1);
          uv[(t / 3 + k) * 2] = U / L.TW;
          uv[(t / 3 + k) * 2 + 1] = 1 - R / L.TH;
        }
      }
      geo2.setAttribute("uv", new V.BufferAttribute(uv, 2));
      return geo2;
    }
    function rng(seed) {
      var s = seed >>> 0 || 1;
      return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    }
    /* spec: { frames: [[x, half-width], ...] lines round the body;
               top: [[[x,y],...], ...] polylines seen from above (mirrored
                    to starboard if spec.mirror);
               bot: the same from below; side: [[[x,z],...]] both sides;
               rivets: polylines (above) dotted;
               walk: [[[x,y],...]] walkway outlines (above);
               soot: [[x, y, z, length, width]] streaks running aft;
               grime: count of weathering blots; seam: line darkness 0-1 } */
    function sheet(L, spec, seed) {
      var cv = document.createElement("canvas");
      cv.width = L.TW; cv.height = L.TH;
      var g = cv.getContext("2d"), R = rng(seed || 7), i, j, sd;
      function U(x) { return (x - L.XMIN) * L.PX; }
      function RT(y) { return (L.YMAX - y) * L.PY; }
      function RB(y) { return L.B_BOT + (L.YMAX - y) * L.PY; }
      function RS(z, s) { return (s ? L.B_STBD : L.B_PORT) + (L.ZMAX - z) * L.PZ; }
      g.fillStyle = "#f2f2f2"; g.fillRect(0, 0, L.TW, L.TH);
      for (i = 0; i < (spec.grime || 140); i++) {          /* weathering */
        g.fillStyle = R() < 0.6 ? "rgba(40,40,40," + (0.03 + R() * 0.04) + ")" : "rgba(255,255,255,0.05)";
        g.beginPath(); g.ellipse(R() * L.TW, R() * L.TH, 4 + R() * 26, 2 + R() * 9, 0, 0, Math.PI * 2); g.fill();
      }
      var sa = spec.seam === undefined ? 0.55 : spec.seam;
      var LINE = "rgba(30,32,34," + sa + ")", FAINT = "rgba(30,32,34," + (sa * 0.45) + ")";
      function path(pts, map, col, lw, dash) {
        g.strokeStyle = col || LINE; g.lineWidth = lw || 1.2;
        if (g.setLineDash) g.setLineDash(dash || []);
        g.beginPath();
        for (var k = 0; k < pts.length; k++) {
          var q = map(pts[k]);
          if (k) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]);
        }
        g.stroke();
        if (g.setLineDash) g.setLineDash([]);
      }
      var mirror = spec.mirror !== false;
      function both(list, fT, col, lw, dash) {
        for (j = 0; j < (list || []).length; j++) {
          path(list[j], fT(1), col, lw, dash);
          if (mirror) path(list[j], fT(-1), col, lw, dash);
        }
      }
      both(spec.top, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; });
      both(spec.bot, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; });
      both(spec.rivets, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      both(spec.rivetsB, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      for (j = 0; j < (spec.side || []).length; j++) {
        for (sd = 0; sd < 2; sd++) {
          path(spec.side[j], (function (s) { return function (q) { return [U(q[0]), RS(q[1], s)]; }; })(sd));
        }
      }
      for (j = 0; j < (spec.frames || []).length; j++) {
        var f = spec.frames[j], x = U(f[0]);
        g.strokeStyle = LINE; g.lineWidth = 1.2;
        g.beginPath(); g.moveTo(x, RT(f[1])); g.lineTo(x, RT(-f[1])); g.stroke();
        g.beginPath(); g.moveTo(x, RB(f[1])); g.lineTo(x, RB(-f[1])); g.stroke();
        for (sd = 0; sd < 2; sd++) {
          g.beginPath(); g.moveTo(x, RS(L.ZMAX, sd)); g.lineTo(x, RS(L.ZMAX - L.SIDEH / L.PZ, sd)); g.stroke();
        }
      }
      for (j = 0; j < (spec.walk || []).length; j++) {     /* walkways: a darker, non-slip band */
        for (sd = 1; sd >= (mirror ? -1 : 1); sd -= 2) {
          var w = spec.walk[j];
          g.fillStyle = "rgba(20,22,24,0.16)";
          g.beginPath();
          for (i = 0; i < w.length; i++) { if (i) g.lineTo(U(w[i][0]), RT(sd * w[i][1])); else g.moveTo(U(w[i][0]), RT(sd * w[i][1])); }
          g.closePath(); g.fill();
        }
      }
      for (j = 0; j < (spec.soot || []).length; j++) {     /* exhaust soot, fading aft */
        var s = spec.soot[j], x0 = U(s[0]), x1 = U(s[0] - s[3]), hw = s[4] * L.PY;
        var grd = g.createLinearGradient(x0, 0, x1, 0);
        grd.addColorStop(0, "rgba(25,22,20,0.55)"); grd.addColorStop(1, "rgba(25,22,20,0)");
        g.fillStyle = grd;
        g.fillRect(x1, RT(s[1]) - hw, x0 - x1, 2 * hw);
        g.fillRect(x1, RB(s[1]) - hw, x0 - x1, 2 * hw);
        for (sd = 0; sd < 2; sd++) g.fillRect(x1, RS(s[2], sd) - s[4] * L.PZ, x0 - x1, 2 * s[4] * L.PZ);
      }
      var tex = new V.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
      tex.anisotropy = 4;
      return tex;
    }
    return { ribbon: ribbon, blade: blade, lamp: lamp, hoop: hoop, layout: layout, projUV: projUV,
             sheet: sheet, geo: geo, quad: quad };
  }

  /* ===================================================================
     1. REPUBLIC F-84G THUNDERJET (roc_e50_cas)
     Tables in drawing D84 pixels (1600 px render): side x px, side y px,
     plan y px. One scale for every view, 89.9 px/m, set by the side
     view's length (1044 px) = the published 11.61 m.
     =================================================================== */
  var F84 = { k: 89.9, x0: 600, z0: 260, y0: 1007 };
  function f84x(px) { return (F84.x0 - px) / F84.k; }
  function f84z(py) { return (F84.z0 - py) / F84.k; }
  function f84y(py) { return (F84.y0 - py) / F84.k; }
  /* BODY: x px, top py, bottom py, half width px (plan), exponent */
  var F84_BODY = [
    [73, 229, 285, 30], [80, 224, 289, 33], [94, 220, 294, 39], [134, 211, 305, 47],
    [174, 205, 313, 52], [214, 199, 319, 56], [254, 195, 324, 59], [300, 192, 327, 61, 0.92],
    [360, 189, 331, 63, 0.9], [440, 187, 333, 65, 0.9], [520, 187, 334, 65, 0.9], [600, 191, 331, 65, 0.9],
    [680, 197, 327, 62, 0.92], [720, 199, 322, 55], [800, 203, 312, 46], [880, 208, 304, 40],
    [920, 214, 300, 37], [960, 220, 302, 34], [1000, 222, 306, 33], [1040, 223, 306, 32],
    [1070, 223, 303, 31], [1090, 224, 299, 29], [1105, 226, 293, 27], [1118, 230, 290, 25]];
  /* CANOPY: x px, top py; the sill at py 190, 0.48 m across the base */
  var F84_CAN = [[268, 193, 0.10], [290, 180, 0.30], [330, 158, 0.42], [360, 149, 0.47], [400, 147, 0.48],
                 [450, 154, 0.47], [500, 165, 0.44], [540, 177, 0.38], [565, 184, 0.30], [588, 190, 0.12]];
  /* WING (plan): y px, LE x px, TE x px */
  var F84_WING = [[962, 438, 683], [942, 440, 681], [900, 444, 677], [800, 455, 665], [700, 465, 653],
                  [600, 476, 641], [520, 487, 630]];
  var F84_DIH = 5.0 * D2R, F84_WZR = -0.22;       /* the root chord line z, dihedral (D84 head-on) */
  function f84wz(y) { return F84_WZR + Math.max(0, y - 0.75) * Math.tan(F84_DIH); }
  /* TIP TANK (plan): x px, radius px; axis at plan y 481, side py 236 */
  var F84_TANK = [[365, 3], [375, 15], [390, 20], [405, 25], [420, 28], [435, 31], [450, 33], [465, 35], [480, 36],
                  [510, 38], [540, 37], [570, 35], [600, 33], [630, 29], [660, 25], [690, 20], [720, 14], [735, 10],
                  [750, 5], [765, 1]];
  /* FIN (side): py, LE x px, TE x px */
  var F84_FIN = [[221, 860, 1107], [215, 883, 1107], [200, 921, 1106], [180, 947, 1105], [150, 963, 1103],
                 [120, 978, 1099], [90, 992, 1094], [60, 1007, 1087], [40, 1021, 1076], [31, 1035, 1062], [28, 1046, 1052]];
  /* TAILPLANE (plan): y px, LE x px, TE x px; chord plane at side py 195 */
  var F84_TAIL = [[1000, 945, 1063], [985, 947, 1062], [931, 960, 1060], [850, 978, 1052], [815, 987, 1047],
                  [805, 993, 1044], [799, 1003, 1036]];

  function buildF84(THREE, M, C) {
    V = THREE;
    var P = { key: "f84", base: "#a6a9a9", dk: "#8d9192", pale: "#b9bbb9", seed: 8401, metal: true, nose: 0x3a3e40 };
    var K = lists(), G = lists(), i, s;
    /* fuselage, nose first */
    K.skin.push(loft(F84_BODY.map(function (r) {
      return S(f84x(r[0]), f84z(r[1]), f84z(r[2]), r[3] / F84.k, undefined, r[4] || 1);
    }), 32));
    /* the round nose intake: a rolled lip, the splitter, the dark duct */
    var lipX = f84x(73), lz = f84z(257);
    K.skin.push(loft([S(lipX - 0.08, lz + 0.27, lz - 0.26, 0.29, lz), S(lipX + 0.01, lz + 0.30, lz - 0.29, 0.32, lz),
                      S(lipX - 0.02, lz + 0.315, lz - 0.305, 0.335, lz)], 28));
    K.ink.push(loft([S(lipX - 0.08, lz + 0.27, lz - 0.26, 0.29, lz), S(lipX - 1.1, lz + 0.22, lz - 0.22, 0.24, lz),
                     S(lipX - 1.12, lz + 0.01, lz - 0.01, 0.01, lz)], 24));
    K.metal.push(box(0.70, 0.03, 0.50, lipX - 0.45, 0, lz));
    /* the jet pipe: the dark nozzle and a heat-darkened lip ring */
    var px0 = f84x(1118), pz = f84z(260);
    K.hot.push(loft([O(px0 + 0.10, 0.345, pz), O(px0, 0.335, pz), O(px0 - 0.02, 0.31, pz), O(px0 + 0.05, 0.29, pz)], 24));
    K.ink.push(tube(0.29, 0.26, px0 + 0.05, px0 + 0.7, 0, pz, 20, true));
    /* canopy: windscreen and the framed hood (the G's framed canopy) */
    var zs = f84z(190);
    K.glass.push(loft(F84_CAN.map(function (c) { return S(f84x(c[0]), f84z(c[1]), zs - 0.06, c[2], zs, 0.88); }), 24));
    /* windscreen frame (D84 side: the rear post at x px 330) and the hood's
       frame bar along each side and over the top */
    var wx = f84x(330);
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(rod([f84x(270), s * 0.10, zs + 0.02], [wx, s * 0.36, f84z(160)], 0.016, 5));
      K.metal.push(rod([f84x(330), s * 0.43, zs + 0.05], [f84x(565), s * 0.33, zs + 0.03], 0.018, 5));
    }
    var arch = new V.TorusGeometry(0.40, 0.02, 5, 18, PI);
    arch.scale(1.0, 1.0, 0.95); arch.rotateX(HALF_PI); arch.rotateZ(HALF_PI); arch.translate(wx, 0, zs);
    K.metal.push(arch);
    var bow = new V.TorusGeometry(0.42, 0.018, 5, 18, PI);
    bow.scale(1.0, 1.0, 0.98); bow.rotateX(HALF_PI); bow.rotateZ(HALF_PI); bow.translate(f84x(455), 0, zs - 0.02);
    K.metal.push(bow);
    K.ink.push(box(0.55, 0.62, 0.20, f84x(440), 0, zs + 0.05));         /* seat and coaming seen through */
    /* wings with 5 deg of dihedral, t/c 11 % at the root to 10 % at the tip */
    var wst = F84_WING.map(function (r) {
      var y = f84y(r[0]), le = f84x(r[1]), te = f84x(r[2]);
      return { s: y, le: le, te: te, t: (le - te) * (0.11 - 0.01 * y / 5.4), h: f84wz(y) };
    });
    both(K.skin, wst);
    /* tip tanks: the 230 gal tanks on the tips, each with two small fins
       at the tail (D84 plan and head-on) */
    var ty = f84y(481), tz = f84z(236);
    for (s = -1; s <= 1; s += 2) {
      K.skin2.push(loft(F84_TANK.map(function (r) { return O(f84x(r[0]), r[1] / F84.k, tz, s * ty); }), 20));
      K.skin2.push(box(0.40, 0.02, 0.26, f84x(735), s * ty, tz + 0.18));
      K.skin2.push(box(0.40, 0.26, 0.02, f84x(735), s * (ty + 0.16), tz));
      /* team colour: a band round each tank */
      K.team.push(loft([O(f84x(560), 0.37, tz, s * ty), O(f84x(585), 0.36, tz, s * ty)], 20));
    }
    /* fin, rooted in the spine at py 221 */
    var fst = F84_FIN.map(function (r) {
      var le = f84x(r[1]), te = f84x(r[2]);
      return { s: f84z(r[0]), le: le, te: te, t: Math.max(0.05, (le - te) * 0.08), h: 0 };
    });
    K.skin.push(surf(fst, { vert: true }));
    /* tailplane on the tail cone */
    var tst = F84_TAIL.map(function (r) {
      var le = f84x(r[1]), te = f84x(r[2]);
      return { s: f84y(r[0]), le: le, te: te, t: (le - te) * 0.08, h: f84z(195) };
    });
    both(K.skin, tst);
    /* the speed brake panel under the belly (D84 side: the outline at x px
       440-530 under the wing root), drawn closed as a seam plate */
    K.skin2.push(pin(box(0.95, 0.70, 0.02, f84x(485), 0, f84z(334) - 0.01)));
    /* six M3 guns: four in the nose above the intake and one in each wing
       root (D84 plan: the muzzle ports beside the lip) */
    for (s = -1; s <= 1; s += 2) {
      K.ink.push(tube(0.025, 0.025, f84x(100) + 0.06, f84x(100) - 0.5, s * 0.18, f84z(226), 6));
      K.ink.push(tube(0.025, 0.025, f84x(110) + 0.06, f84x(110) - 0.5, s * 0.30, f84z(240), 6));
      K.ink.push(tube(0.03, 0.03, f84x(438) + 0.06, f84x(438) - 0.4, s * 0.85, f84wz(0.85), 6));
    }

    /* ---- undercarriage, retracting: "gear" ---- */
    /* ground: 0.90 m under the belly at the main-gear station, the ratio
       measured off P84S (header); D84's own ground line put it 0.935 m */
    var ZG = f84z(332) - 0.90;
    var nX = f84x(94), nR = 22 / F84.k, mX = f84x(581), mR = 31 / F84.k, mY = 240 / F84.k;
    G.metal.push(rod([f84x(118), 0, f84z(296)], [nX, 0, ZG + nR], 0.05, 8));
    G.metal.push(rod([f84x(160), 0, f84z(306)], [nX + 0.02, 0, ZG + nR + 0.30], 0.025, 6));
    wheel(G.metal, G.tyre, nR, 0.16, nX, 0, ZG + nR);
    G.skin2.push(pin(box(0.70, 0.02, 0.30, f84x(140), 0.22, f84z(310) - 0.16, 0.25, 0, 0)));
    G.skin2.push(pin(box(0.70, 0.02, 0.30, f84x(140), -0.22, f84z(310) - 0.16, -0.25, 0, 0)));
    for (s = -1; s <= 1; s += 2) {
      var wzl = f84wz(mY) - 0.08;
      G.metal.push(rod([mX + 0.05, s * (mY - 0.10), wzl], [mX, s * (mY - 0.10), ZG + mR], 0.06, 8));
      G.metal.push(rod([mX + 0.05, s * (mY - 0.80), f84wz(mY - 0.8) - 0.08], [mX + 0.02, s * (mY - 0.12), ZG + mR + 0.45], 0.03, 6));
      wheel(G.metal, G.tyre, mR, 0.22, mX, s * mY, ZG + mR);
      G.skin2.push(pin(box(0.80, 0.02, 0.85, mX, s * (mY + 0.14), wzl - 0.45)));
    }

    /* ---- DETAIL PASS: the fittings the first pass left out, placed off
       D84 and P84S; their sizes are read through the drawing's scale, NOT
       measured ---- */
    var tipX = f84x(540), tipR = 38 / F84.k;
    navLamps(K, tipX, ty + tipR - 0.045, tz, 0.05);                  /* on the tanks' outboard sides */
    K.metal.push(ball(0.035, f84x(1110), 0, f84z(222), 1.3, 0.8, 1.0));          /* tail lamp */
    beacon(K, f84x(640), 0, f84z(191), 1);
    beacon(K, f84x(700), 0, f84z(327), -1);
    bladeAnt(K.skin2, f84x(640), f84z(194), 0.18, 0.24);              /* the radio mast behind the hood */
    bladeAnt(K.skin2, f84x(760), f84z(318), -0.16, 0.22);
    K.ink.push(rod([f84x(640) - 0.1, 0, f84z(194) + 0.16], [f84x(1000), 0, f84z(150)], 0.005, 3));  /* the wire aerial to the fin */
    /* the boarding step and handhold on the port side under the cockpit,
       the gun-bay doors' fasteners in a strip over the nose */
    K.metal.push(pin(box(0.16, 0.10, 0.02, f84x(420), 0.66, f84z(300))));
    K.ink.push(pin(box(0.70, 0.02, 0.02, f84x(180), 0.40, f84z(215))), pin(box(0.70, 0.02, 0.02, f84x(180), -0.40, f84z(215))));
    /* the jet pipe's bright inner ring and the fuel vent */
    K.metal.push(pin(tube(0.30, 0.30, px0 + 0.02, px0 - 0.01, 0, pz, 20, true)));
    K.metal.push(tube(0.012, 0.012, f84x(1080), f84x(1110), 0, f84z(300), 6));
    /* gear: the oleos' bright pistons and torque links, hub caps, the nose
       leg's taxi lamp, the main doors' hinges */
    oleo(G.metal, [nX, 0, ZG + nR], [f84x(118), 0, f84z(296)], 0.05, 0.14);
    hubCap(G.metal, nX, 0, ZG + nR, nR, 0.16, 1); hubCap(G.metal, nX, 0, ZG + nR, nR, 0.16, -1);
    G.metal.push(ball(0.05, nX + 0.16, 0, ZG + nR + 0.42, 1, 1, 1));
    for (s = -1; s <= 1; s += 2) {
      oleo(G.metal, [mX, s * (mY - 0.10), ZG + mR], [mX + 0.05, s * (mY - 0.10), f84wz(mY) - 0.08], 0.06, -0.16);
      hubCap(G.metal, mX, s * mY, ZG + mR, mR, 0.22, s);
      G.ink.push(rod([mX - 0.38, s * (mY + 0.15), f84wz(mY) - 0.06], [mX + 0.38, s * (mY + 0.15), f84wz(mY) - 0.06], 0.012, 4));
    }

    var mats = makeMats(C, P), root = new V.Group(), gear = new V.Group();
    root.name = "f84g";
    emit(root, K, mats);
    gear.name = "gear";
    emit(gear, G, mats);
    root.add(gear);
    return root;
  }

  /* ===================================================================
     2. NORTH AMERICAN F-100A SUPER SABRE (roc_e60_cas)
     Tables in drawing D100 pixels (T.O. 1F-100A-2-1 figure, 1400 px
     render): side x px, side y px (the fuselage reference line, FRL, at
     py 350 is z = 0), plan y px (centreline py 1097). One scale, 64.0
     px/m, from the figure's own 47.0 ft dimension (917 px).
     =================================================================== */
  var F100 = { k: 64.0, x0: 900, z0: 350, y0: 1097 };
  function fhx(px) { return (F100.x0 - px) / F100.k; }
  function fhz(py) { return (F100.z0 - py) / F100.k; }
  function fhy(py) { return (F100.y0 - py) / F100.k; }
  /* BODY: x px, top py, bottom py, half width px (plan), exponent */
  var F100_BODY = [
    [408, 367, 404, 34, 0.85], [420, 364, 406, 36, 0.88], [460, 354, 410, 40, 0.92], [500, 343, 413, 44],
    [545, 333, 416, 47], [600, 330, 419, 50], [650, 327, 421, 53], [700, 324, 422, 55],
    [760, 313, 423, 56], [800, 308, 423, 57], [860, 307, 423, 57], [940, 309, 422, 56],
    [1020, 312, 420, 54], [1100, 315, 418, 51], [1180, 322, 413, 46], [1240, 328, 408, 40],
    [1275, 334, 404, 35], [1300, 336, 400, 32]];
  /* CANOPY: x px, top py, half width m; the sill at py 329 */
  var F100_CAN = [[545, 331, 0.06], [580, 317, 0.25], [615, 301, 0.34], [660, 294, 0.37], [700, 295, 0.37],
                  [740, 297, 0.33], [765, 300, 0.22], [790, 303, 0.10]];
  /* WING (plan): y px, LE x px, TE x px; LE 48.4 deg, TE 26.6 deg */
  var F100_WING = [[1060, 670, 975], [1040, 712, 993], [1002, 755, 1012], [942, 822, 1043], [882, 890, 1073],
                   [822, 957, 1104], [762, 1025, 1135], [732, 1058, 1149], [722, 1074, 1152]];
  var F100_WZ = -0.52;                       /* the chord plane (D100 side, py 383); 0 dihedral (D100) */
  /* TAILPLANE (plan): y px, LE, TE; at side py 400, 0 dihedral */
  var F100_TAIL = [[1060, 1092, 1243], [1045, 1110, 1240], [1000, 1161, 1264], [960, 1207, 1286], [930, 1242, 1300],
                   [912, 1264, 1301], [906, 1276, 1296]];
  /* FIN (side): py, LE x px, TE x px */
  var F100_FIN = [[318, 1110, 1301], [300, 1145, 1302], [269, 1165, 1306], [240, 1198, 1310], [210, 1232, 1314],
                  [185, 1262, 1318], [170, 1279, 1323], [167, 1290, 1323]];

  function buildF100(THREE, M, C) {
    V = THREE;
    var P = { key: "f100", base: "#a9acab", base2: "#8a8d8e", dk: "#909495", pale: "#bcbebc", seed: 10001, metal: true, nose: 0x3a3e40 };
    var K = lists(), G = lists(), s;
    /* (the redo) the body in two skins: forward of the engine-bay joint at
       px 1078 the bright metal, aft of it the darker heat-stained engine
       and tail-pipe skins P100 shows */
    var fb = F100_BODY.filter(function (r) { return r[0] < 1078; }), ab = F100_BODY.filter(function (r) { return r[0] > 1078; });
    var r0 = fb[fb.length - 1], r1 = ab[0], tj = (1078 - r0[0]) / (r1[0] - r0[0]);
    var rj = [1078, r0[1] + (r1[1] - r0[1]) * tj, r0[2] + (r1[2] - r0[2]) * tj, r0[3] + (r1[3] - r0[3]) * tj, 1];
    function bsec(r) { return S(fhx(r[0]), fhz(r[1]), fhz(r[2]), r[3] / F100.k, undefined, r[4] || 1); }
    K.skin.push(loft(fb.concat([rj]).map(bsec), 32));
    K.skin2.push(loft([rj].concat(ab).map(bsec), 32));
    /* the wide oval nose intake: a lip ring and the dark duct (D100 side
       py 367-404, plan 68 px across, and head-on) */
    var lx = fhx(408), lzt = fhz(367), lzb = fhz(404), lw = 34 / F100.k;
    K.skin.push(loft([S(lx - 0.12, lzt - 0.05, lzb + 0.05, lw - 0.06, undefined, 0.85), S(lx + 0.015, lzt - 0.01, lzb + 0.01, lw - 0.02, undefined, 0.85),
                      S(lx, lzt, lzb, lw, undefined, 0.85)], 28));
    K.ink.push(loft([S(lx - 0.12, lzt - 0.05, lzb + 0.05, lw - 0.06, undefined, 0.85), S(lx - 1.4, lzt - 0.10, lzb + 0.08, lw - 0.16, undefined, 0.9),
                     S(lx - 1.42, (lzt + lzb) / 2 + 0.01, (lzt + lzb) / 2 - 0.01, 0.01)], 24));
    /* the pitot boom on the intake's lower lip, 53.9 - 47.0 ft ahead (D100) */
    K.metal.push(tube(0.02, 0.05, fhx(270), lx - 0.05, 0, lzb + 0.04, 6));
    /* the afterburner nozzle */
    var nx = fhx(1300), nz = fhz(368);
    K.hot.push(loft([O(nx + 0.25, 0.50, nz), O(nx, 0.49, nz), O(nx - 0.03, 0.46, nz), O(nx + 0.08, 0.43, nz)], 24));
    K.ink.push(tube(0.43, 0.38, nx + 0.08, nx + 0.9, 0, nz, 20, true));
    /* the dorsal spine from the hood to the fin (D100 side, py 300) */
    K.skin.push(loft([S(fhx(760), fhz(303), fhz(316), 0.06), S(fhx(800), fhz(300), fhz(312), 0.15, fhz(308), 0.8),
                      S(fhx(1035), fhz(298), fhz(314), 0.14, fhz(310), 0.8), S(fhx(1165), fhz(271), fhz(320), 0.10, fhz(316), 0.85),
                      S(fhx(1200), fhz(300), fhz(324), 0.05)], 16));
    /* canopy */
    var zs = fhz(329);
    K.glass.push(loft(F100_CAN.map(function (c) { return S(fhx(c[0]), fhz(c[1]), zs - 0.05, c[2], zs, 0.88); }), 24));
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(rod([fhx(546), s * 0.05, zs + 0.03], [fhx(612), s * 0.33, fhz(302)], 0.016, 5));
      K.metal.push(rod([fhx(612), s * 0.36, zs + 0.02], [fhx(785), s * 0.12, zs + 0.02], 0.016, 5));
    }
    var arch = new V.TorusGeometry(0.35, 0.02, 5, 18, PI);
    arch.scale(1.0, 1.0, 1.0); arch.rotateX(HALF_PI); arch.rotateZ(HALF_PI); arch.translate(fhx(613), 0, zs);
    K.metal.push(arch);
    K.ink.push(box(0.6, 0.55, 0.22, fhx(660), 0, zs + 0.06));
    /* wing: NACA 64A007 root and tip (D100), so 7 % thick */
    both(K.skin, F100_WING.map(function (r) {
      var le = fhx(r[1]), te = fhx(r[2]);
      return { s: fhy(r[0]), le: le, te: te, t: (le - te) * 0.07, h: F100_WZ };
    }));
    /* the leading-edge slats, closed: a thin dark seam strip along the LE
       of the outer three quarters (D100 plan: the slat chord lines) */
    var RW = F100_WING.slice().reverse();
    both(K.ink, [1002, 728].map(function (yy) {
      var le = fhx(lerpTab(RW, yy, 1));
      return { s: fhy(yy), le: le - 0.30, te: le - 0.36, t: 0.05, h: F100_WZ, pad: 0.004 };
    }));
    /* tailplane: the low all-moving slab */
    both(K.skin, F100_TAIL.map(function (r) {
      var le = fhx(r[1]), te = fhx(r[2]);
      return { s: fhy(r[0]), le: le, te: te, t: (le - te) * 0.06, h: fhz(400) };
    }));
    /* fin */
    K.skin.push(surf(F100_FIN.map(function (r) {
      var le = fhx(r[1]), te = fhx(r[2]);
      return { s: fhz(r[0]), le: le, te: te, t: Math.max(0.05, (le - te) * 0.07), h: 0 };
    }), { vert: true }));
    /* team colour: a chordwise band over each wing outboard */
    both(K.team, [800, 770].map(function (yy) {
      var le = fhx(lerpTab(RW, yy, 1)), te = fhx(lerpTab(RW, yy, 2));
      return { s: fhy(yy), le: le + 0.02, te: te - 0.02, t: (le - te) * 0.07, h: F100_WZ, pad: 0.012 };
    }));
    /* four M39 cannon ports under the intake, two a side (D100 side: the
       gun bay panels behind the lip) */
    for (s = -1; s <= 1; s += 2) {
      K.ink.push(tube(0.035, 0.035, fhx(450), fhx(450) - 0.3, s * 0.42, fhz(395), 6));
      K.ink.push(tube(0.035, 0.035, fhx(456), fhx(456) - 0.3, s * 0.48, fhz(385), 6));
    }

    /* ---- undercarriage: "gear". D100 stands nose-up on its static ground
       line; drawn level, the mains where D100 puts them, the nose leg
       0.28 m shorter so its wheel meets the same ground (header) ---- */
    var mX = fhx(936), mR = 25 / F100.k, ZG = fhz(463) - mR, mY = 0.5 * 12.4 * 0.3048;
    var nX = fhx(652), nR = 13 / F100.k;
    G.metal.push(rod([fhx(640), 0, fhz(419)], [nX, 0, ZG + nR], 0.05, 8));
    G.metal.push(rod([fhx(600), 0, fhz(418)], [nX + 0.03, 0, ZG + nR + 0.35], 0.025, 6));
    for (s = -1; s <= 1; s += 2) wheel(G.metal, G.tyre, nR, 0.13, nX, s * 0.11, ZG + nR);
    G.metal.push(cylY(0.03, 0.30, nX, 0, ZG + nR, 6));
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(rod([mX + 0.10, s * (mY - 0.15), F100_WZ - 0.06], [mX, s * (mY - 0.15), ZG + mR], 0.07, 8));
      G.metal.push(rod([mX + 0.10, s * 1.0, fhz(420)], [mX + 0.05, s * (mY - 0.17), ZG + mR + 0.55], 0.03, 6));
      wheel(G.metal, G.tyre, mR, 0.24, mX, s * mY, ZG + mR);
      G.skin2.push(pin(box(1.0, 0.02, 0.80, mX + 0.05, s * (mY + 0.16), F100_WZ - 0.45)));
      G.skin2.push(pin(box(0.80, 0.02, 0.40, fhx(625), s * 0.25, fhz(424) - 0.2, s * 0.2, 0, 0)));
    }

    /* ---- DETAIL PASS: the fittings the first pass left out, placed off
       D100; their sizes are read through the drawing's scale, NOT
       measured ---- */
    var tp = F100_WING[F100_WING.length - 1], tpx = (fhx(tp[1]) + fhx(tp[2])) / 2;
    navLamps(K, tpx, fhy(tp[0]) - 0.04, F100_WZ, 0.05);
    K.metal.push(ball(0.035, fhx(1312), 0, fhz(172), 1.3, 0.8, 1.0));
    beacon(K, fhx(860), 0, fhz(306), 1);
    beacon(K, fhx(820), 0, fhz(423), -1);
    bladeAnt(K.skin2, fhx(830), fhz(305), 0.16, 0.24);
    bladeAnt(K.skin2, fhx(720), fhz(422), -0.18, 0.26);
    bladeAnt(K.skin2, fhx(1000), fhz(421), -0.14, 0.20);
    /* the afterburner's eyelid ring and flame holder, the fuel dump */
    K.metal.push(pin(tube(0.44, 0.44, nx + 0.20, nx + 0.16, 0, nz, 20, true)));
    K.hot.push(pin(place(new V.TorusGeometry(0.30, 0.02, 5, 18), nx + 0.45, 0, nz, 0, HALF_PI, 0)));
    K.metal.push(tube(0.015, 0.015, fhx(1300), fhx(1320), 0, fhz(330), 6));
    /* the speed brake under the belly (D100: the panel behind the nose
       gear) and the boarding steps on the port side */
    K.skin2.push(pin(box(1.10, 0.80, 0.02, fhx(730), 0, fhz(423) - 0.01)));
    K.ink.push(pin(box(1.12, 0.02, 0.02, fhx(730), 0.41, fhz(423) - 0.02)), pin(box(1.12, 0.02, 0.02, fhx(730), -0.41, fhz(423) - 0.02)));
    [fhz(400), fhz(375)].forEach(function (zz) { K.ink.push(pin(box(0.14, 0.03, 0.05, fhx(640), 0.86, zz))); });
    /* gear: oleos, torque links, hub caps, the taxi lamp */
    oleo(G.metal, [nX, 0, ZG + nR], [fhx(640), 0, fhz(419)], 0.05, 0.14);
    for (s = -1; s <= 1; s += 2) {
      hubCap(G.metal, nX, s * 0.11, ZG + nR, nR, 0.13, s);
      oleo(G.metal, [mX, s * (mY - 0.15), ZG + mR], [mX + 0.10, s * (mY - 0.15), F100_WZ - 0.06], 0.07, -0.18);
      hubCap(G.metal, mX, s * mY, ZG + mR, mR, 0.24, s);
    }
    G.metal.push(ball(0.05, nX + 0.15, 0, ZG + nR + 0.50, 1, 1, 1));

    /* ---- THE REDO (the model evaluation: still a plain tube). What D100
       and P100 show and is now drawn: the aft fuselage's darker heat-
       stained engine-bay and tail-pipe skins as their own skin (P100:
       the band from the wing's trailing edge to the nozzle reads darker on
       all four aircraft; the body loft is split at the joint), the lighter ring of the intake lip, the body's
       panel breaks as seam ribbons (D100 side: the frames at the intake
       ring, the gun bay, the cockpit, the wing root, the engine-bay joint
       and the tail-pipe joint), the aileron hinge line and front spar on
       the wing, the tailplane's pivot line, the fin's rudder line, a strip
       along each side at the wing-root line. Seam places off D100, widths
       NOT measured. ---- */
    var DXK = DK(V), rows = F100_BODY;
    function secAt(px) {
      var i = 1;
      while (i < rows.length - 1 && rows[i][0] < px) i++;
      var a = rows[i - 1], b = rows[i], t = Math.max(0, Math.min(1, (px - a[0]) / (b[0] - a[0])));
      return { zt: fhz(a[1] + (b[1] - a[1]) * t), zb: fhz(a[2] + (b[2] - a[2]) * t), w: (a[3] + (b[3] - a[3]) * t) / F100.k,
               e: (a[4] || 1) + ((b[4] || 1) - (a[4] || 1)) * t };
    }
    function bodyPt(px, ang, push) {
      var q = secAt(px), zw = (q.zt + q.zb) / 2, cy = Math.cos(ang), sz = Math.sin(ang);
      var y = q.w * Math.sign(cy) * Math.pow(Math.abs(cy), q.e);
      var z = zw + (sz >= 0 ? (q.zt - zw) : (zw - q.zb)) * Math.sign(sz) * Math.pow(Math.abs(sz), q.e);
      var r = Math.sqrt(y * y + (z - zw) * (z - zw)) || 1;
      return [fhx(px), y + (push || 0) * y / r, z + (push || 0) * (z - zw) / r];
    }
    function hoopAt(px, a0, a1, w) {
      var q = secAt(px), zw = (q.zt + q.zb) / 2;
      return DXK.hoop(function (a) { return bodyPt(px, a, 0); }, a0, a1, 28, function () { return [fhx(px), 0, zw]; }, w || 0.035, 0.008);
    }
    /* the intake lip, bright */
    K.metal.push(loft([S(lx + 0.02, lzt + 0.012, lzb - 0.012, lw + 0.012, undefined, 0.85), S(lx - 0.14, lzt + 0.008, lzb - 0.008, lw + 0.008, undefined, 0.85)], 28));
    /* the frames */
    [470, 545, 610, 790, 860, 940, 1000, 1078, 1180, 1294].forEach(function (px) {
      K.seam.push(hoopAt(px, px > 545 && px < 800 ? -0.15 * PI : 0, px > 545 && px < 800 ? 1.15 * PI : 2 * PI));
    });
    for (s = -1; s <= 1; s += 2) {
      /* the side seam along the wing-root line and the spine's foot */
      var sp = [], sn = [], px2;
      for (px2 = 470; px2 <= 1290; px2 += 41) { var bp = bodyPt(px2, s > 0 ? 0.08 : PI - 0.08, 0.008); sp.push(bp); sn.push([0, s, 0.1]); }
      K.seam.push(DXK.ribbon(sp, sn, 0.035, 0));
      /* wing: front spar and the aileron hinge line, top and bottom */
      [[0.18, 1], [0.76, 1], [0.76, -1]].forEach(function (f) {
        var pts = [];
        for (var k = 0; k <= 8; k++) {
          var yy = 1060 - (1060 - 728) * k / 8, le = fhx(lerpTab(RW, yy, 1)), te = fhx(lerpTab(RW, yy, 2)), c = le - te;
          pts.push([le - f[0] * c, s * fhy(yy), F100_WZ + f[1] * (0.5 * c * 0.07 * foil(f[0]) + 0.004)]);
        }
        K.seam.push(DXK.ribbon(pts, [0, 0, f[1]], 0.035, 0.004));
      });
      /* the aileron's inboard end */
      var ya = 882, la = fhx(lerpTab(RW, ya, 1)), ta = fhx(lerpTab(RW, ya, 2)), ca = la - ta;
      K.seam.push(DXK.ribbon([[la - 0.76 * ca, s * fhy(ya), F100_WZ + 0.5 * ca * 0.07 * foil(0.76) + 0.004],
                              [ta, s * fhy(ya), F100_WZ + 0.004]], [0, 0, 1], 0.035, 0.004));
      /* the tailplane's pivot line */
      var tpts = [];
      F100_TAIL.forEach(function (r) {
        var le = fhx(r[1]), te = fhx(r[2]), c = le - te;
        tpts.push([le - 0.30 * c, s * fhy(r[0]), fhz(400) + 0.5 * c * 0.06 * foil(0.30) + 0.004]);
      });
      K.seam.push(DXK.ribbon(tpts, [0, 0, 1], 0.03, 0.004));
      /* the rudder line on the fin */
      var rp = [];
      F100_FIN.slice(0, 6).forEach(function (r) {
        var le = fhx(r[1]), te = fhx(r[2]), c = le - te;
        rp.push([le - 0.72 * c, s * (0.5 * Math.max(0.05, c * 0.07) * foil(0.72) + 0.004), fhz(r[0])]);
      });
      K.seam.push(DXK.ribbon(rp, [0, s, 0], 0.03, 0.004));
    }

    var mats = makeMats(C, P), root = new V.Group(), gear = new V.Group();
    root.name = "f100a";
    emit(root, K, mats);
    gear.name = "gear";
    emit(gear, G, mats);
    root.add(gear);
    return root;
  }

  /* ===================================================================
     3. CURTISS C-46D COMMANDO (roc_e50_transport)
     Tables in drawing D46 pixels (1400 px render). Side view: x px, y px,
     39.57 px/m (its 915.81 in dimension, 920 px); the dash-dot datum at
     py 1704 is z = 0. Plan: x px across (centreline 659), 39.37 px/m (its
     427.20 and 254.60 in dimensions, 1.00 px/in); the plan's fore-and-aft
     run is 3.7 % short of the side view's, so plan rows map onto side
     stations by sx() below.
     =================================================================== */
  var C46 = { k: 39.57, kp: 39.37, x0: 600, z0: 1704, y0: 659 };
  function cx(px) { return (C46.x0 - px) / C46.k; }
  function cz(py) { return (C46.z0 - py) / C46.k; }
  function cy(px) { return (C46.y0 - px) / C46.kp; }
  function csx(py) { return 155 + (960 - py) * 1.0378; }      /* plan row -> side station px */
  /* BODY: side x px, top py, bottom py, plan half width px */
  var C46_BODY = [
    [156, 1697, 1710, 4], [160, 1689, 1713, 9], [165, 1683, 1717, 14], [176, 1673, 1723, 20], [197, 1660, 1732, 29],
    [217, 1651, 1737, 33], [238, 1644, 1744, 39], [259, 1639, 1747, 44], [280, 1634, 1750, 48], [300, 1631, 1753, 51],
    [321, 1628, 1758, 54], [363, 1624, 1766, 58], [404, 1621, 1772, 61], [446, 1619, 1776, 63], [487, 1619, 1772, 65],
    [570, 1620, 1764, 65], [653, 1619, 1759, 61], [695, 1619, 1754, 58], [736, 1620, 1748, 55], [778, 1618, 1741, 51],
    [819, 1617, 1733, 43], [861, 1618, 1725, 37], [902, 1625, 1712, 31], [944, 1634, 1702, 25], [985, 1643, 1693, 16],
    [1027, 1653, 1686, 9], [1058, 1663, 1680, 5]];
  /* WING (plan): x px across, TE row py, LE row py; the tip cap from x 35 */
  var C46_WING = [[594, 528, 742], [450, 529, 713], [350, 535, 694], [250, 542, 674], [150, 549, 655],
                  [50, 559, 636], [35, 565, 633], [20, 575, 625], [8, 589, 616]];
  var C46_WZ = cz(1725);                     /* root chord line (D46 side, the root section) */
  function c46wz(y) {                        /* D46 head-on: 2.7 deg inboard of 4.0 m, 5.7 deg out */
    var a = Math.abs(y);
    return C46_WZ + Math.min(a, 4.0) * Math.tan(2.7 * D2R) + Math.max(0, a - 4.0) * Math.tan(5.7 * D2R);
  }
  /* TAILPLANE (plan): x px, TE row, LE row; side chord plane py 1650 */
  var C46_TAIL = [[625, 128, 272], [590, 130, 255], [560, 124, 239], [530, 128, 223], [470, 136, 190],
                  [450, 142, 186], [442, 150, 177]];
  /* FIN (side): py, LE px, TE px */
  var C46_FIN = [[1655, 790, 1079], [1630, 830, 1080], [1614, 857, 1080], [1600, 890, 1080], [1589, 901, 1079],
                 [1560, 925, 1076], [1530, 950, 1068], [1507, 965, 1051], [1495, 978, 1035], [1488, 995, 1015]];
  var C46_NAC_Y = (659 - 501) / 39.37;       /* nacelle axis, 4.01 m out (D46 plan and head-on) */

  function buildC46(THREE, M, C) {
    V = THREE;
    var P = { key: "c46", base: "#a8abab", dk: "#8f9394", pale: "#bbbdbb", seed: 4601, metal: true, nose: 0x2b2f31 };
    var K = lists(), G = lists(), s, i;
    var body = C46_BODY.map(function (r) { return S(cx(r[0]), cz(r[1]), cz(r[2]), r[3] / C46.kp, cz((r[1] + r[2]) / 2 + 6), 0.86); });
    K.skin.push(loft(body, 32, true, true));
    /* the stepped cockpit glazing: a glass skin 2 cm proud of the nose
       over the D46 side window band (x px 190-252, py 1650-1690) */
    var gl = C46_BODY.filter(function (r) { return r[0] >= 176 && r[0] <= 259; }).map(function (r) {
      return S(cx(r[0]), cz(r[1]) + 0.02, cz(r[2]) - 0.02, r[3] / C46.kp + 0.02, cz((r[1] + r[2]) / 2 + 6), 0.86);
    });
    K.glass.push(loft(gl, 16, false, false, 0.25 * PI, 0.75 * PI));
    K.metal.push(box(0.03, 2.2, 0.03, cx(222), 0, cz(1668)));
    /* the cabin windows and the big cargo door, PORT side only (D46 side
       is the port side; no reference shows the starboard) */
    [363, 446, 530, 612].forEach(function (wx) {
      K.ink.push(box(0.26, 0.04, 0.26, cx(wx), lerpTab(C46_BODY, wx, 3) / C46.kp + 0.005, cz(1668)));
    });
    K.ink.push(box(0.36, 0.04, 0.55, cx(497), lerpTab(C46_BODY, 497, 3) / C46.kp + 0.005, cz(1656)));
    K.ink.push(box(0.36, 0.04, 0.80, cx(272), lerpTab(C46_BODY, 272, 3) / C46.kp + 0.005, cz(1678)));
    K.skin2.push(pin(box(3.40, 0.03, 1.95, cx(723), lerpTab(C46_BODY, 723, 3) / C46.kp + 0.006, cz(1661))));
    K.ink.push(box(0.04, 0.05, 1.95, cx(706), lerpTab(C46_BODY, 706, 3) / C46.kp + 0.02, cz(1661)));
    /* the astrodome on the roof (D46 side, x px 331) */
    var dome = new V.SphereGeometry(0.22, 12, 6, 0, PI * 2, 0, HALF_PI); dome.rotateX(HALF_PI); dome.translate(cx(331), 0, cz(1626)); K.glass.push(dome);
    /* wing: t/c 0.17 at the root to 0.09 at the tip */
    var wst = C46_WING.map(function (r) {
      var y = cy(r[0]), te = cx(csx(r[1])), le = cx(csx(r[2]));
      return { s: y, le: le, te: te, t: (le - te) * (0.17 - 0.08 * y / 16.4), h: c46wz(y) };
    });
    both(K.skin, wst);
    /* nacelles: the round cowl (0.71 m radius) with its open front and the
       engine face, tapering aft over the wing to the TE; the lower gear
       fairing to x px 575 (D46 side and plan) */
    for (s = -1; s <= 1; s += 2) {
      var ny = s * C46_NAC_Y, nz = cz(1726), wzN = c46wz(C46_NAC_Y);
      K.skin.push(loft([O(cx(300), 0.60, nz, ny), O(cx(304), 0.69, nz, ny), O(cx(318), 0.72, nz, ny), O(cx(400), 0.72, nz, ny),
                        S(cx(440), wzN + 0.55, nz - 0.70, 0.70, nz), S(cx(500), wzN + 0.40, nz - 0.62, 0.62, nz),
                        S(cx(560), wzN + 0.20, nz - 0.30, 0.42, nz + 0.05), S(cx(600), wzN + 0.08, wzN - 0.05, 0.20, wzN)].map(function (q) { q.yc = ny; return q; }), 24));
      K.ink.push(loft([O(cx(300), 0.60, nz, ny), O(cx(330), 0.52, nz, ny), O(cx(332), 0.05, nz, ny)], 20));
      K.metal.push(loft([O(cx(312), 0.30, nz, ny), O(cx(316), 0.32, nz, ny), O(cx(340), 0.30, nz, ny)], 16));
      /* the exhaust stack under the wing behind the cowl */
      K.hot.push(tube(0.08, 0.08, cx(400), cx(440), ny + s * 0.55, nz - 0.30, 8));
      /* the propeller: a spinner, four blades standing still and a faint
         disc for the turning prop (as ru_il10.js); 162 in = 4.11 m */
      var hx = cx(296), hz = cz(1716);
      K.metal.push(loft([O(hx + 0.38, 0.02, hz, ny), O(hx + 0.25, 0.17, hz, ny), O(hx, 0.25, hz, ny), O(hx - 0.06, 0.25, hz, ny)], 14));
      for (i = 0; i < 4; i++) {
        var a = (45 + 90 * i) * D2R, b = box(0.05, 0.26, 1.80, hx + 0.02, 0, 0, 0, 0, 0);
        b.translate(-hx - 0.02, 0, 0.25 + 0.90);
        b.rotateX(a);
        b.translate(hx + 0.02, ny, hz);
        K.blade.push(b);
      }
      var dsk = new V.CircleGeometry(2.055, 40); dsk.rotateY(HALF_PI); dsk.translate(hx + 0.03, ny, hz); K.disc.push(dsk);
    }
    /* tailplane and fin */
    both(K.skin, C46_TAIL.map(function (r) {
      var te = cx(csx(r[1])), le = cx(csx(r[2]));
      return { s: cy(r[0]), le: le, te: te, t: (le - te) * 0.11, h: cz(1650) };
    }));
    K.skin.push(surf(C46_FIN.map(function (r) {
      var le = cx(r[1]), te = cx(r[2]);
      return { s: cz(r[0]), le: le, te: te, t: Math.max(0.06, (le - te) * 0.10), h: 0 };
    }), { vert: true }));
    /* team colour: a band round the rear fuselage and the rudder tip */
    K.team.push(loft(C46_BODY.filter(function (r) { return r[0] >= 819 && r[0] <= 861; }).map(function (r) {
      return S(cx(r[0]), cz(r[1]) + 0.012, cz(r[2]) - 0.012, r[3] / C46.kp + 0.012, cz((r[1] + r[2]) / 2 + 6), 0.86);
    }), 28));

    /* ---- undercarriage, LEVEL (rule 4, ru_il10.js): the mains where D46
       puts them under the nacelles, 1.42 m wheels on a 311 in track; the
       tailwheel leg lengthened from 0.18 m to 2.20 m (header). The gear
       retracts into the nacelles and the tail, so it is "gear". ---- */
    var ZG = cz(1836), mR = 28 / C46.k, mX = cx(434), tR = 13 / C46.k, tX = cx(919);
    for (s = -1; s <= 1; s += 2) {
      var wy = s * C46_NAC_Y;
      for (var f = -1; f <= 1; f += 2) {
        G.metal.push(rod([mX + 0.05, wy + f * 0.24, cz(1760)], [mX, wy + f * 0.24, ZG + mR], 0.07, 8));
        G.metal.push(rod([mX - 0.60, wy + f * 0.24, cz(1760)], [mX, wy + f * 0.24, ZG + mR + 0.30], 0.035, 6));
      }
      G.metal.push(cylY(0.05, 0.56, mX, wy, ZG + mR, 8));
      wheel(G.metal, G.tyre, mR, 0.38, mX, wy, ZG + mR, 0.30);
    }
    G.metal.push(rod([tX + 0.25, 0, cz(1712)], [tX, 0, ZG + tR], 0.06, 8));
    wheel(G.metal, G.tyre, tR, 0.16, tX, 0, ZG + tR);
    G.metal.push(cylY(0.03, 0.30, tX, 0, ZG + tR, 6));
    for (f = -1; f <= 1; f += 2) G.metal.push(rod([tX, f * 0.12, ZG + tR], [tX + 0.15, f * 0.12, ZG + tR + 0.4], 0.025, 5));

    /* ---- DETAIL PASS: the fittings the first pass left out, placed off
       D46; their sizes are read through the drawing's scale, NOT
       measured ---- */
    var wt = C46_WING[C46_WING.length - 1], wtx = (cx(csx(wt[1])) + cx(csx(wt[2]))) / 2;
    navLamps(K, wtx, cy(wt[0]) - 0.06, c46wz(cy(wt[0])), 0.07);
    K.metal.push(ball(0.05, cx(1060), 0, cz(1672), 1.3, 0.8, 1.0));
    beacon(K, cx(600), 0, cz(1619), 1);
    beacon(K, cx(560), 0, cz(1765), -1);
    /* the rubber de-icing boots along the wing's, the tailplane's and the
       fin's leading edges (black strips, as every C-46 photograph shows) */
    var RW46 = C46_WING.slice().reverse();
    both(K.ink, [40, 150, 300, 450, 590].map(function (xx) {
      var le = cx(csx(lerpTab(RW46, xx, 2))), te = cx(csx(lerpTab(RW46, xx, 1)));
      return { s: cy(xx), le: le + 0.03, te: le - 0.30, t: (le - te) * (0.17 - 0.08 * cy(xx) / 16.4) * 0.9, h: c46wz(cy(xx)), pad: 0.008 };
    }));
    var RT46 = C46_TAIL.slice().reverse();
    both(K.ink, [445, 520, 620].map(function (xx) {
      var le = cx(csx(lerpTab(RT46, xx, 2))), te = cx(csx(lerpTab(RT46, xx, 1)));
      return { s: cy(xx), le: le + 0.02, te: le - 0.22, t: (le - te) * 0.11 * 0.9, h: cz(1650), pad: 0.006 };
    }));
    /* the cockpit's windscreen posts, the pitot masts under the nose, the
       ADF loop housing and the long-wire aerial to the fin */
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(rod([cx(200), s * 0.45, cz(1690)], [cx(232), s * 0.62, cz(1648)], 0.02, 5));
      K.metal.push(rod([cx(200), s * 0.22, cz(1728)], [cx(200), s * 0.22, cz(1748)], 0.015, 5));
      K.metal.push(tube(0.012, 0.012, cx(185), cx(205), s * 0.22, cz(1748), 6));
    }
    K.ink.push(pin(cylZ(0.18, 0.18, 0.06, cx(400), 0, cz(1622), 14)));
    K.ink.push(rod([cx(250), 0, cz(1636) + 0.25], [cx(900), 0, cz(1590)], 0.006, 3));
    K.ink.push(rod([cx(250), 0, cz(1636)], [cx(250), 0, cz(1636) + 0.25], 0.012, 4));
    bladeAnt(K.skin2, cx(700), cz(1752), -0.22, 0.30);
    /* the cowl flaps round each cowling's trailing edge, the cargo door's
       hinges (port) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 12; i++) {
        var fa = i * PI / 6, fz = cz(1726), fny = s * C46_NAC_Y;
        var fp = pin(box(0.10, 0.20, 0.015, cx(402), 0, 0.73, 0, 0, 0));
        fp.rotateY(0.25); fp.rotateX(fa); fp.translate(0, fny, fz);
        K.metal.push(fp);
      }
    }
    [cz(1630), cz(1661), cz(1692)].forEach(function (zz) {
      K.metal.push(pin(box(0.08, 0.04, 0.10, cx(764), lerpTab(C46_BODY, 764, 3) / C46.kp + 0.02, zz)));
    });
    /* gear: oleo pistons, hub caps, the tailwheel's fork */
    for (s = -1; s <= 1; s += 2) {
      var wy2 = s * C46_NAC_Y;
      for (var f2 = -1; f2 <= 1; f2 += 2) oleo(G.metal, [mX, wy2 + f2 * 0.24, ZG + mR], [mX + 0.05, wy2 + f2 * 0.24, cz(1760)], 0.07, -0.20);
      hubCap(G.metal, mX, wy2, ZG + mR, mR, 0.38, 1); hubCap(G.metal, mX, wy2, ZG + mR, mR, 0.38, -1);
    }
    hubCap(G.metal, tX, 0, ZG + tR, tR, 0.16, 1); hubCap(G.metal, tX, 0, ZG + tR, tR, 0.16, -1);

    var mats = makeMats(C, P), root = new V.Group(), gear = new V.Group();
    root.name = "c46d";
    emit(root, K, mats);
    gear.name = "gear";
    emit(gear, G, mats);
    root.add(gear);
    return root;
  }

  /* ===================================================================
     4. AIDC AT-3A/B TZU CHUNG (roc_e80_cas)
     Tables in drawing D3 pixels (1400 px render). Side view: x px, y px,
     70.8 px/m (nose probe to rudder 913 px = the published 12.9 m); the
     nacelle axis at py 615 is z = 0. Plan: 69.0 px/m across (tip to tip
     722 px = the published 10.46 m), centreline py 397; plan columns map
     onto side stations by a3sx().
     =================================================================== */
  var AT3 = { k: 70.8, kp: 69.0, x0: 900, z0: 615, y0: 397 };
  function a3x(px) { return (AT3.x0 - px) / AT3.k; }
  function a3z(py) { return (AT3.z0 - py) / AT3.k; }
  function a3y(py) { return (AT3.y0 - py) / AT3.kp; }
  function a3sx(px) { return 485 + (905 - px) * 1.0178; }     /* plan column -> side station px */
  /* BODY: side x px, top py (the sill under the canopy), bottom py, plan half width px */
  var AT3_BODY = [
    [530, 662, 670, 6], [545, 655, 674, 13], [560, 648, 676, 19], [600, 633, 679, 27], [640, 621, 681, 31],
    [680, 616, 680, 34], [740, 610, 679, 35], [820, 600, 678, 36], [900, 590, 677, 34], [980, 580, 675, 27],
    [1020, 572, 672, 23], [1100, 570, 672, 20], [1150, 569, 670, 18], [1200, 569, 663, 17], [1260, 570, 652, 14],
    [1300, 571, 647, 10], [1340, 575, 638, 9], [1370, 582, 633, 8], [1396, 586, 628, 6]];
  /* NACELLE: side x px, top py, bottom py, plan outer edge m */
  var AT3_NAC = [[905, 586, 650, 1.06], [915, 578, 656, 1.10], [960, 574, 657, 1.10], [1100, 574, 657, 1.11],
                 [1150, 575, 655, 1.07], [1200, 578, 650, 0.98], [1235, 584, 638, 0.86], [1265, 592, 626, 0.62],
                 [1290, 600, 618, 0.50], [1305, 607, 612, 0.42]];
  /* CANOPY: side x px, top py, sill py */
  var AT3_CAN = [[660, 612, 618, 8], [700, 590, 614, 22], [740, 573, 610, 28], [780, 562, 604, 31], [820, 556, 600, 31],
                 [860, 554, 594, 31], [900, 555, 590, 31], [940, 559, 585, 30], [980, 564, 580, 26], [1012, 570, 576, 14]];
  /* WING (plan): plan y px, TE column px, LE column px */
  var AT3_WING = [[330, 266, 462], [295, 271, 449], [250, 275, 440], [200, 280, 429], [150, 284, 419],
                  [100, 288, 409], [60, 292, 400], [45, 293, 392], [39, 299, 384]];
  var AT3_WZ = a3z(642), AT3_DIH = 1.3 * D2R;     /* the chord plane (D3 side), dihedral (D3 head-on, mean) */
  function a3wz(y) { return AT3_WZ + Math.max(0, Math.abs(y) - 0.9) * Math.tan(AT3_DIH); }
  /* TAILPLANE (plan): y px, TE column, LE column; on the spine at side py 556 */
  var AT3_TAIL = [[380, 30, 132], [360, 30, 126], [330, 31, 115], [300, 31, 104], [260, 32, 89], [245, 34, 82], [238, 40, 72]];
  /* FIN (side): py, LE x px, TE x px */
  var AT3_FIN = [[572, 1200, 1392], [555, 1240, 1391], [540, 1250, 1390], [520, 1263, 1387], [500, 1276, 1385],
                 [480, 1289, 1383], [460, 1303, 1381], [440, 1320, 1378], [434, 1337, 1378]];

  function buildAT3(THREE, M, C) {
    V = THREE;
    var P = { key: "at3", base: "#d6d8d5", dk: "#c2c5c3", pale: "#e4e5e2", seed: 3301, metal: false, nose: 0x30343a };
    var K = lists(), G = lists(), s;
    K.skin.push(loft(AT3_BODY.map(function (r) {
      return S(a3x(r[0]), a3z(r[1]), a3z(r[2]), r[3] / AT3.kp, a3z((r[1] + r[2]) / 2 + 4), 0.9);
    }), 28, false, true));
    /* the pitot probe ahead of the radome */
    K.metal.push(tube(0.012, 0.03, a3x(485), a3x(532), 0, a3z(667), 6));
    /* the engine nacelles hugging the fuselage, D-shaped intakes in front
       (D3 side, plan and head-on) */
    for (s = -1; s <= 1; s += 2) {
      var nac = AT3_NAC.map(function (r) {
        /* inboard it meets the fuselage side (no gap in D3's plan) */
        var inn = Math.max(0.12, Math.min(r[3] - 0.10, lerpTab(AT3_BODY, r[0], 3) / AT3.kp - 0.06));
        var hw = (r[3] - inn) / 2, q = S(a3x(r[0]), a3z(r[1]), a3z(r[2]), hw, undefined, 0.82);
        q.yc = s * (r[3] + inn) / 2;
        return q;
      });
      K.skin.push(loft(nac, 20));
      var n0 = nac[0];
      K.ink.push(loft([S(n0.x - 0.02, n0.zt - 0.06, n0.zb + 0.06, n0.w - 0.07, undefined, 0.75),
                       S(n0.x - 0.9, n0.zt - 0.12, n0.zb + 0.12, n0.w - 0.12, undefined, 0.8),
                       S(n0.x - 0.92, (n0.zt + n0.zb) / 2, (n0.zt + n0.zb) / 2, 0.01)].map(function (q) { q.yc = n0.yc; return q; }), 16));
      /* the jet pipe at the pointed end */
      K.hot.push(loft([O(a3x(1286), 0.12, a3z(609), s * 0.50), O(a3x(1300), 0.11, a3z(609), s * 0.44), O(a3x(1302), 0.05, a3z(609), s * 0.43)], 12));
    }
    /* canopy: the stepped tandem hood with its three frames (D3 side) */
    K.glass.push(loft(AT3_CAN.map(function (c) {
      return S(a3x(c[0]), a3z(c[1]), a3z(c[2]) - 0.05, c[3] / AT3.kp, a3z(c[2]), 0.85);
    }), 22));
    [722, 838, 958].forEach(function (fx) {
      var top = lerpTab(AT3_CAN, fx, 1), sill = lerpTab(AT3_CAN, fx, 2);
      var ar = new V.TorusGeometry(31 / AT3.kp, 0.018, 5, 16, PI);
      ar.scale(lerpTab(AT3_CAN, fx, 3) / 31, (a3z(top) - a3z(sill)) / (31 / AT3.kp), 1); ar.rotateX(HALF_PI); ar.rotateZ(HALF_PI);
      ar.translate(a3x(fx), 0, a3z(sill)); K.metal.push(ar);
    });
    K.ink.push(box(1.9, 0.6, 0.30, a3x(830), 0, a3z(600) + 0.10));
    /* wing, 10 % thick at the root to 8 % at the tip */
    both(K.skin, AT3_WING.map(function (r) {
      var y = a3y(r[0]), te = a3x(a3sx(r[1])), le = a3x(a3sx(r[2]));
      return { s: y, le: le, te: te, t: (le - te) * (0.10 - 0.02 * y / 5.2), h: a3wz(y) };
    }));
    /* tailplane on the spine, fin */
    both(K.skin, AT3_TAIL.map(function (r) {
      var te = a3x(a3sx(r[1])), le = a3x(a3sx(r[2]));
      return { s: a3y(r[0]), le: le, te: te, t: (le - te) * 0.08, h: a3z(556) };
    }));
    K.skin.push(surf(AT3_FIN.map(function (r) {
      var le = a3x(r[1]), te = a3x(r[2]);
      return { s: a3z(r[0]), le: le, te: te, t: Math.max(0.05, (le - te) * 0.08), h: 0 };
    }), { vert: true }));
    /* team colour: a band over each wing near the tip */
    both(K.team, [80, 62].map(function (yy) {
      var te = a3x(a3sx(lerpTab(AT3_WING.slice().reverse(), yy, 1))), le = a3x(a3sx(lerpTab(AT3_WING.slice().reverse(), yy, 2)));
      return { s: a3y(yy), le: le + 0.02, te: te - 0.02, t: (le - te) * 0.08, h: a3wz(a3y(yy)), pad: 0.012 };
    }));

    /* ---- undercarriage: "gear" (D3 side: nose wheel at x 652, mains at
       1050, ground py 745; head-on: the main track 3.87 m) ---- */
    var ZG = a3z(745), nX = a3x(652), nR = 17 / AT3.k, mX = a3x(1050), mR = 23 / AT3.k, mY = 1.93;
    G.metal.push(rod([nX + 0.05, 0, a3z(679)], [nX, 0, ZG + nR], 0.045, 8));
    G.metal.push(rod([nX - 0.40, 0, a3z(680)], [nX, 0, ZG + nR + 0.25], 0.022, 6));
    wheel(G.metal, G.tyre, nR, 0.13, nX, 0, ZG + nR);
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(rod([mX + 0.05, s * (mY - 0.12), a3wz(mY) - 0.05], [mX, s * (mY - 0.12), ZG + mR], 0.06, 8));
      G.metal.push(rod([mX + 0.6, s * 1.2, a3wz(1.2) - 0.05], [mX + 0.02, s * (mY - 0.12), ZG + mR + 0.35], 0.03, 6));
      wheel(G.metal, G.tyre, mR, 0.18, mX, s * mY, ZG + mR);
      G.skin2.push(pin(box(0.75, 0.02, 0.55, mX, s * (mY + 0.12), a3wz(mY) - 0.32)));
    }

    /* ---- DETAIL PASS: the fittings the first pass left out, placed off
       D3; their sizes are read through the drawing's scale, NOT
       measured ---- */
    var aw = AT3_WING[AT3_WING.length - 1], awx = (a3x(a3sx(aw[1])) + a3x(a3sx(aw[2]))) / 2;
    navLamps(K, awx, a3y(aw[0]) - 0.04, a3wz(a3y(aw[0])), 0.05);
    K.metal.push(ball(0.035, a3x(1380), 0, a3z(440), 1.3, 0.8, 1.0));
    beacon(K, a3x(1080), 0, a3z(570), 1);
    beacon(K, a3x(1000), 0, a3z(676), -1);
    bladeAnt(K.skin2, a3x(1120), a3z(570), 0.18, 0.26);
    bladeAnt(K.skin2, a3x(900), a3z(677), -0.16, 0.22);
    /* the canopy's sills, the intake lips, the jet pipes' bright rims, the
       ventral speed brakes */
    for (s = -1; s <= 1; s += 2) {
      var sl = [];
      [700, 780, 860, 940, 1000].forEach(function (fx) { sl.push([a3x(fx), s * lerpTab(AT3_CAN, fx, 3) / AT3.kp * 1.01, a3z(lerpTab(AT3_CAN, fx, 2))]); });
      for (var q = 0; q < sl.length - 1; q++) K.metal.push(rod(sl[q], sl[q + 1], 0.016, 4));
      K.metal.push(loft([O(a3x(1300) + 0.01, 0.12, a3z(609), s * 0.44), O(a3x(1300) - 0.02, 0.12, a3z(609), s * 0.44)], 12));
      K.ink.push(pin(box(0.60, 0.02, 0.30, a3x(1150), s * 0.60, a3z(655))));
      [a3z(640), a3z(620)].forEach(function (zz) { K.ink.push(pin(box(0.12, 0.03, 0.04, a3x(760), s * 0.52, zz))); });
    }
    /* gear: oleos, torque links, hub caps, the taxi lamp */
    oleo(G.metal, [nX, 0, ZG + nR], [nX + 0.05, 0, a3z(679)], 0.045, 0.12);
    hubCap(G.metal, nX, 0, ZG + nR, nR, 0.13, 1); hubCap(G.metal, nX, 0, ZG + nR, nR, 0.13, -1);
    G.metal.push(ball(0.045, nX + 0.12, 0, ZG + nR + 0.30, 1, 1, 1));
    for (s = -1; s <= 1; s += 2) {
      oleo(G.metal, [mX, s * (mY - 0.12), ZG + mR], [mX + 0.05, s * (mY - 0.12), a3wz(mY) - 0.05], 0.06, -0.16);
      hubCap(G.metal, mX, s * mY, ZG + mR, mR, 0.18, s);
    }

    var mats = makeMats(C, P), root = new V.Group(), gear = new V.Group();
    root.name = "at3";
    emit(root, K, mats);
    gear.name = "gear";
    emit(gear, G, mats);
    root.add(gear);
    return root;
  }

  /* ===================================================================
     5. AIDC F-CK-1 CHING-KUO (roc_e90_cas F-CK-1A/B, roc_e00_cas F-CK-1C/D)
     No line drawing on Commons: measured off two photographs.
     PLAN, photograph PA ("ROCAF AIDC F-CK-1A Ching Kuo Aoki-2", 1200 px,
     from above): probe tip (px 1155) to the nozzle exits (px 103) = the
     published 14.21 m, 74.0 px/m; widths are half the silhouette's extent
     per column (the airframe lies 1.8 deg off the frame's axis, so the
     centre is taken per column, not as one line).
     SIDE, photograph PC ("AIDC F-CK-1C Ching-kuo 1441 / 84-8062", 1200
     px, port side, gear down): probe (px 45) to the nozzle (px 1100) =
     14.21 m, 74.2 px/m; the nozzle axis at py 415 is z = 0. Side
     stations map onto PA columns by fcp().
     =================================================================== */
  var FCK = { k: 74.0, ks: 74.2, x0: 600, z0: 415 };
  function fcx(plan) { return (plan - FCK.x0) / FCK.k; }      /* the nose is to the right in PA */
  function fcp(side) { return 1155 - (side - 45) / 1.00285; }   /* PC station px -> PA column px */
  function fcsx(side) { return fcx(fcp(side)); }
  function fcz(py) { return (FCK.z0 - py) / FCK.ks; }
  /* BODY: PA column px, PA half width px, PC top py, PC bottom py, exponent */
  var FCK_BODY = [
    [1100, 9.5, 410, 425, 1], [1080, 17.5, 402, 429, 1], [1050, 25.5, 394, 432, 1], [1020, 30, 386, 434, 0.95],
    [1000, 37.5, 380, 436, 0.85], [960, 34.5, 374, 437, 0.85], [920, 37, 364, 439, 0.85], [880, 38, 361, 441, 0.85],
    [840, 38.5, 359, 443, 0.85], [800, 41.5, 356, 445, 0.85], [760, 44, 352, 446, 0.82], [720, 50, 350, 447, 0.8],
    [680, 58, 348, 448, 0.78], [640, 66, 347, 449, 0.76], [600, 72, 346, 449, 0.75], [520, 80, 346, 450, 0.75],
    [440, 84, 347, 449, 0.75], [360, 85, 348, 448, 0.75], [280, 85, 351, 447, 0.75], [240, 80, 354, 446, 0.78],
    [200, 72, 361, 443, 0.8], [160, 64, 375, 441, 0.8], [130, 58, 383, 441, 0.8], [106, 54, 388, 441, 0.82]];
  /* CANOPY: PC station px, top py, half width m; the sill at py 360 */
  var FCK_CAN = [[282, 361, 0.08], [300, 348, 0.26], [330, 333, 0.36], [360, 325, 0.40], [400, 322, 0.42],
                 [440, 323, 0.41], [480, 330, 0.36], [510, 340, 0.26], [532, 349, 0.10]];
  /* WING with the leading-edge root extension (PA, upper wing): span m,
     LE column px, TE column px. LE 32 deg, the TE swept 11.6 deg forward. */
  var FCK_WING = [[0.45, 800, 328], [0.67, 760, 330], [0.86, 720, 332], [1.07, 680, 334], [1.26, 640, 336],
                  [1.40, 590, 338], [1.81, 568, 344], [2.62, 531, 356], [3.43, 494, 368], [3.84, 475, 375], [4.11, 462, 378]];
  var FCK_WZ = fcz(398);                           /* the chord plane (PC: the near wing's root) */
  /* TAILPLANE (PA): span m, LE, TE; FIN (PC): py, LE station, TE station */
  var FCK_TAIL = [[1.05, 300, 118], [1.34, 251, 116], [1.61, 234, 117], [2.02, 209, 119], [2.43, 184, 120],
                  [2.70, 167, 121], [2.79, 158, 138]];
  var FCK_FIN = [[352, 860, 1060], [330, 893, 1066], [300, 923, 1073], [260, 963, 1081], [220, 1002, 1090],
                 [195, 1027, 1097], [183, 1042, 1072]];
  /* variants: the C/D upgrade shows no outline change in PC against PA
     and the A-model photographs, so only the paint shade differs (each
     sampled off its own photograph) */
  var FCK_VARIANTS = {
    A: { label: "F-CK-1A", base: "#8e979b", dk: "#7f888c", pale: "#a0a8ab", seed: 1901 },
    C: { label: "F-CK-1C", base: "#a3a8aa", dk: "#94999b", pale: "#b4b8b9", seed: 1903 },
  };

  function buildFCK(THREE, M, C, vkey) {
    V = THREE;
    var VR = FCK_VARIANTS[vkey] || FCK_VARIANTS.A;
    var P = { key: "fck_" + vkey, base: VR.base, dk: VR.dk, pale: VR.pale, seed: VR.seed, metal: false, nose: 0x2c2f33 };
    var K = lists(), G = lists(), s;
    var body = FCK_BODY.map(function (r) { return S(fcx(r[0]), fcz(r[2]), fcz(r[3]), r[1] / FCK.k, fcz((r[2] + r[3]) / 2 + 6), r[4]); });
    K.skin.push(loft(body.slice(4), 30, false, true));
    /* the radome, dark, and the probe (PA, PC) */
    K.nose.push(loft(body.slice(0, 5), 30, true, false));
    K.metal.push(tube(0.012, 0.03, fcsx(45), fcsx(86), 0, fcz(420), 6));
    /* the side intakes under the root extensions (PC: the lip at station
       445, py 395-445; head-on photograph PF: the half-round mouths) */
    for (s = -1; s <= 1; s += 2) {
      var ix = fcsx(445), iy = s * 0.62, zt = fcz(397), zb = fcz(447);
      var ins = [S(ix, zt, zb, 0.27, undefined, 0.8), S(ix - 0.6, zt + 0.02, zb, 0.30, undefined, 0.8),
                 S(ix - 1.8, zt + 0.05, zb + 0.02, 0.30, undefined, 0.8), S(ix - 3.2, zt + 0.08, zb + 0.06, 0.18, undefined, 0.85)];
      ins.forEach(function (q) { q.yc = iy; });
      K.skin.push(loft(ins, 18));
      K.ink.push(loft([S(ix + 0.005, zt - 0.05, zb + 0.05, 0.21, undefined, 0.75), S(ix - 0.5, zt - 0.08, zb + 0.08, 0.18, undefined, 0.8),
                       S(ix - 0.52, (zt + zb) / 2, (zt + zb) / 2, 0.01)].map(function (q) { q.yc = iy; return q; }), 16));
      /* the twin nozzles (PA: centres 0.41 m out, 0.32 m radius) */
      var nx = fcx(103), ny = s * 0.41, nz = fcz(415);
      K.hot.push(loft([O(nx + 0.30, 0.33, nz, ny), O(nx, 0.32, nz, ny), O(nx - 0.02, 0.29, nz, ny), O(nx + 0.05, 0.26, nz, ny)], 18));
      K.ink.push(tube(0.26, 0.22, nx + 0.05, nx + 0.6, ny, nz, 16, true));
      /* the ventral fins under the rear fuselage (PC: one each side,
         canted out) */
      var vf = plateXZ([[fcsx(870), fcz(447)], [fcsx(925), fcz(447)], [fcsx(918), fcz(470)], [fcsx(895), fcz(470)]], 0.03, 0);
      vf.rotateX(s * 0.35); vf.translate(0, s * 0.55, 0.02);
      K.skin.push(vf);
    }
    /* canopy: the one-piece bubble with a frame at its rear (PC) */
    var zs = fcz(360);
    K.glass.push(loft(FCK_CAN.map(function (c) { return S(fcsx(c[0]), fcz(c[1]), zs - 0.05, c[2], zs, 0.9); }), 24));
    var ar = new V.TorusGeometry(0.40, 0.02, 5, 16, PI);
    ar.scale(1, 0.95, 1); ar.rotateX(HALF_PI); ar.rotateZ(HALF_PI); ar.translate(fcsx(470), 0, zs); K.metal.push(ar);
    K.ink.push(box(1.2, 0.6, 0.30, fcsx(400), 0, zs + 0.06));
    /* the wing with its root extension, 5 % thick; wingtip launch rails */
    var wst = FCK_WING.map(function (r) {
      var le = fcx(r[1]), te = fcx(r[2]);
      return { s: r[0], le: le, te: te, t: Math.min(0.20, (le - te) * 0.045), h: FCK_WZ };
    });
    both(K.skin, wst);
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(box(fcx(564) - fcx(357), 0.10, 0.10, (fcx(357) + fcx(564)) / 2, s * 4.27, FCK_WZ));
      K.metal.push(tube(0.02, 0.05, fcx(580), fcx(564), s * 4.27, FCK_WZ, 8));
    }
    /* tailplane (all-moving slabs) on the rear fuselage sides, and the fin */
    both(K.skin, FCK_TAIL.map(function (r) {
      var le = fcx(r[1]), te = fcx(r[2]);
      return { s: r[0], le: le, te: te, t: (le - te) * 0.05, h: fcz(442) };
    }));
    K.skin.push(surf(FCK_FIN.map(function (r) {
      var le = fcsx(r[1]), te = fcsx(r[2]);
      return { s: fcz(r[0]), le: le, te: te, t: Math.max(0.05, (le - te) * 0.06), h: 0 };
    }), { vert: true }));
    /* team colour: a band across each wing inboard of the rail */
    both(K.team, [3.55, 3.75].map(function (sp) {
      var le = fcx(lerpTab(FCK_WING, sp, 1)), te = fcx(lerpTab(FCK_WING, sp, 2));
      return { s: sp, le: le + 0.02, te: te - 0.02, t: (le - te) * 0.045, h: FCK_WZ, pad: 0.012 };
    }));

    /* ---- undercarriage: "gear" (PC: nose wheel at station 345, mains at
       705 and 755, the near main tyre's bottom py 522 taken as ground) ---- */
    var ZG = fcz(522), nX = fcsx(345), nR = 17 / FCK.ks, mX = fcsx(730), mR = 22 / FCK.ks, mY = 1.20;
    G.metal.push(rod([nX + 0.08, 0, fcz(440)], [nX, 0, ZG + nR], 0.045, 8));
    G.metal.push(rod([nX + 0.5, 0, fcz(441)], [nX + 0.02, 0, ZG + nR + 0.3], 0.022, 6));
    wheel(G.metal, G.tyre, nR, 0.15, nX, 0, ZG + nR);
    G.skin2.push(pin(box(1.10, 0.02, 0.32, fcsx(330), 0.20, fcz(450))));
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(rod([mX + 0.1, s * 0.85, fcz(448)], [mX, s * mY, ZG + mR], 0.06, 8));
      G.metal.push(rod([mX + 0.7, s * 0.70, fcz(448)], [mX + 0.04, s * (mY - 0.03), ZG + mR + 0.35], 0.03, 6));
      wheel(G.metal, G.tyre, mR, 0.20, mX, s * (mY + 0.08), ZG + mR);
      G.skin2.push(pin(box(1.0, 0.02, 0.40, mX + 0.1, s * 0.88, fcz(452) - 0.15, s * 0.6, 0, 0)));
    }

    /* ---- DETAIL PASS: the fittings the first pass left out, placed off
       PA and PC; their sizes are read through the photographs' scale and
       perspective, NOT measured ---- */
    navLamps(K, fcx(470), 0.95, fcz(398), 0.045);                    /* on the intake trunks' tops */
    K.metal.push(ball(0.035, fcsx(1068), 0, fcz(190), 1.3, 0.8, 1.0));
    beacon(K, fcsx(700), 0, fcz(347), 1);
    beacon(K, fcsx(640), 0, fcz(451), -1);
    bladeAnt(K.skin2, fcsx(620), fcz(347), 0.16, 0.24);
    bladeAnt(K.skin2, fcsx(560), fcz(451), -0.14, 0.20);
    bladeAnt(K.skin2, fcsx(820), fcz(449), -0.12, 0.18);
    /* the intakes' splitter plates and bright lips, the nozzles' petals */
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(pin(box(0.80, 0.02, 0.44, fcsx(445) - 0.30, s * 0.34, fcz(422))));
      K.metal.push(loft([S(fcsx(445) + 0.012, fcz(397) + 0.01, fcz(447) - 0.01, 0.275, undefined, 0.8), S(fcsx(445) - 0.03, fcz(397) + 0.01, fcz(447) - 0.01, 0.275, undefined, 0.8)].map(function (q) { q.yc = s * 0.62; return q; }), 18));
      for (var pp = 0; pp < 12; pp++) {
        var pa2 = pp * PI / 6, pt = pin(box(0.28, 0.12, 0.012, 0, 0, 0));
        pt.translate(0, 0, 0.315); pt.rotateX(pa2); pt.translate(fcx(103) + 0.12, s * 0.41, fcz(415));
        K.hot.push(pt);
      }
      /* the canopy sill */
      var cs = [];
      [300, 360, 420, 480, 520].forEach(function (cxp) { cs.push([fcsx(cxp), s * lerpTab(FCK_CAN, cxp, 2) * 1.01, zs]); });
      for (var q2 = 0; q2 < cs.length - 1; q2++) K.metal.push(rod(cs[q2], cs[q2 + 1], 0.015, 4));
    }
    /* gear: oleos, torque links, hub caps, the taxi lamps */
    oleo(G.metal, [nX, 0, ZG + nR], [nX + 0.08, 0, fcz(440)], 0.045, 0.12);
    hubCap(G.metal, nX, 0, ZG + nR, nR, 0.15, 1); hubCap(G.metal, nX, 0, ZG + nR, nR, 0.15, -1);
    G.metal.push(ball(0.045, nX + 0.14, 0.06, ZG + nR + 0.38, 1, 1, 1), ball(0.045, nX + 0.14, -0.06, ZG + nR + 0.38, 1, 1, 1));
    for (s = -1; s <= 1; s += 2) {
      oleo(G.metal, [mX, s * mY, ZG + mR], [mX + 0.1, s * 0.85, fcz(448)], 0.06, -0.16);
      hubCap(G.metal, mX, s * (mY + 0.08), ZG + mR, mR, 0.20, s);
    }

    var mats = makeMats(C, P), root = new V.Group(), gear = new V.Group();
    root.name = "fck1" + vkey.toLowerCase();
    emit(root, K, mats);
    gear.name = "gear";
    emit(gear, G, mats);
    root.add(gear);
    return root;
  }

  /* ===================================================================
     6. HUGHES 500MD/TOW DEFENDER (roc_e80_gunship)
     The airframe is js/hero/kpa_air.js's Hughes 500D, called through its
     export HeroKpaAir.md500d (the pod, boom, T-tail, five-blade rotor,
     skids). This adds what the 500MD/TOW carries on top of it, measured
     off D500 ("McDonnell Douglas MD 500 Defender 3-view line drawing",
     574 px; side 25.7 px/m and head-on 27.1 px/m, each set by kpa_air's
     own pod: 1.75 m deep, 1.54 m wide): the TOW sight in the nose, the
     two twin-tube TOW launchers on outriggers, and the domed hub cap over
     the head (R13: the ROK Army 500MD/TOW from behind).
     kpa_air's frame: s metres aft of the pod nose, h above the skid
     bottom; x = 3.20 - s, z = h - 1.20.
     =================================================================== */
  function mdx(s) { return 3.20 - s; }
  function mdz(h) { return h - 1.20; }
  function build500MD(THREE, M, C) {
    if (typeof HeroKpaAir === "undefined" || !HeroKpaAir.md500d)
      throw new Error("roc_air.js: load js/hero/kpa_air.js first (HeroKpaAir.md500d)");
    var root = HeroKpaAir.md500d(THREE, M, C);
    V = THREE;
    root.name = "md500md";
    var P = { key: "md500md", base: "#4a5236", dk: "#3d4430", pale: "#56603f", seed: 5011, metal: false };
    var K = lists(), s, k;
    /* the TOW sight: a drum standing 0.55 m proud of the nose on the PORT
       side (D500 side: x px 310-330, py 244-261; head-on: 0.40 m to port,
       h 1.20), its window dark */
    var sy = 0.40, sz = mdz(1.19);
    K.skin.push(loft([O(mdx(-0.56), 0.20, sz, sy), O(mdx(-0.52), 0.25, sz, sy), O(mdx(-0.20), 0.26, sz, sy),
                      O(mdx(0.35), 0.24, sz, sy)], 18, true, true));
    K.ink.push(box(0.03, 0.30, 0.22, mdx(-0.575), sy, sz));
    /* the TOW launchers: on each side two tubes side by side (D500 head-on:
       pair centres 1.58 m out, 0.69 m across; side: s 2.02 to 4.00, h 0.45),
       on an outrigger beam through the cabin floor at h 0.85 (D500 head-on) */
    for (s = -1; s <= 1; s += 2) {
      var ly = s * 1.58, lz = mdz(0.45);
      for (k = -1; k <= 1; k += 2) {
        K.skin.push(tube(0.17, 0.17, mdx(2.02), mdx(4.00), ly + k * 0.17, lz, 14));
        var mouth = new V.CircleGeometry(0.14, 12); mouth.rotateY(HALF_PI); mouth.translate(mdx(2.02) + 0.005, ly + k * 0.17, lz); K.ink.push(mouth);
      }
      K.skin.push(box(1.70, 0.70, 0.08, mdx(3.0), ly, lz + 0.18));
      K.metal.push(rod([mdx(2.75), s * 0.70, mdz(0.85)], [mdx(2.75), ly, mdz(0.85)], 0.05, 8));
      K.metal.push(rod([mdx(2.75), ly, mdz(0.85)], [mdx(2.75), ly, lz + 0.20], 0.04, 6));
      K.metal.push(rod([mdx(3.35), s * 0.68, mdz(0.80)], [mdx(2.85), ly, lz + 0.20], 0.03, 6));
    }
    /* ---- DETAIL PASS: the fittings the first pass left out (on top of
       the kpa_air.js airframe, which this file does not edit), placed off
       D500 and R13; sizes read through the drawing's scale, NOT measured */
    /* the TOW sight's window frame and its stabilised head's ring */
    K.metal.push(pin(box(0.04, 0.34, 0.03, mdx(-0.58), sy, sz + 0.125)), pin(box(0.04, 0.34, 0.03, mdx(-0.58), sy, sz - 0.125)));
    K.metal.push(pin(place(new V.TorusGeometry(0.255, 0.015, 5, 18), mdx(-0.36), sy, sz, 0, HALF_PI, 0)));
    for (s = -1; s <= 1; s += 2) {
      var ly2 = s * 1.58, lz2 = mdz(0.45);
      for (k = -1; k <= 1; k += 2) {
        /* each tube's front and rear bands and its rear cap */
        K.metal.push(tube(0.18, 0.18, mdx(2.06), mdx(2.12), ly2 + k * 0.17, lz2, 14, true));
        K.metal.push(tube(0.18, 0.18, mdx(3.90), mdx(3.96), ly2 + k * 0.17, lz2, 14, true));
        var rc = new V.CircleGeometry(0.16, 12); rc.rotateY(-HALF_PI); rc.translate(mdx(4.00) - 0.004, ly2 + k * 0.17, lz2); K.ink.push(pin(rc));
      }
      /* the launcher's sway braces and the umbilical to the cabin */
      K.metal.push(rod([mdx(2.40), ly2 - s * 0.30, lz2 + 0.22], [mdx(2.40), ly2 - s * 0.36, lz2 + 0.02], 0.015, 4));
      K.ink.push(rod([mdx(2.75), s * 0.72, mdz(0.80)], [mdx(2.90), ly2 - s * 0.20, lz2 + 0.22], 0.015, 4));
      /* the skids' wear shoes and the boarding steps */
      K.ink.push(pin(box(1.60, 0.05, 0.016, mdx(1.30), s * 0.935, mdz(0.013))));
      K.metal.push(pin(box(0.22, 0.14, 0.02, mdx(1.05), s * 0.76, mdz(0.34))));
      /* nav lamps on the stabiliser's end plates, port red, starboard green */
      (s > 0 ? K.lampR : K.lampG).push(ball(0.03, mdx(7.12), s * 0.85, mdz(2.76), 1.3, 0.7, 1.0));
    }
    /* the anti-collision beacon on the boom top behind the fairing and
       under the belly; the white tail lamp; the whip aerial under the boom */
    beacon(K, mdx(4.40), 0, mdz(1.97), 1);
    beacon(K, mdx(1.90), 0, mdz(0.48), -1);
    K.metal.push(ball(0.028, mdx(7.17), 0, mdz(2.60), 1.3, 0.8, 1.0));
    K.ink.push(rod([mdx(4.80), 0, mdz(1.62)], [mdx(5.20), 0, mdz(1.05)], 0.008, 4));

    var mats = makeMats(C, P);
    var add = new V.Group(); add.name = "tow";
    emit(add, K, mats);
    root.add(add);
    /* the domed cap over the head (R13), turning with the rotor */
    var rotor = root.getObjectByName("rotor");
    if (rotor) {
      var cap = new V.SphereGeometry(0.30, 16, 6, 0, PI * 2, 0, HALF_PI);
      cap.rotateX(HALF_PI); cap.scale(1, 1, 0.55); cap.translate(0, 0, 0.06);
      rotor.add(new V.Mesh(cap, mats.skin));
    }
    /* the draw-call budget (16 a vehicle): the TOW kit's bright metal (bands, rods, brackets) is
       drawn with kpa_air.js's airframe metal, both static (Armour3D.tint keeps its colour, written
       linear, and its diffuse; roughness 0.48 -> 0.46, metalness 0.58 -> 0.62). Its closed parts are
       wound outward, so the airframe metal's single side draws them as the double side did (the
       tube bands' open ends are a centimetre off the tube). Then join. 17 -> 16 */
    var am = null, tm = null, i;
    for (i = 0; i < root.children.length; i++) {
      var c = root.children[i];
      if (c.isMesh && !c.name && rotor && rotor.children.some(function (r) { return r.isMesh && r.material === c.material; }) &&
          !c.material.map && !c.material.transparent) am = c;
    }
    for (i = 0; i < add.children.length; i++) if (add.children[i].material === mats.metal) tm = add.children[i];
    if (typeof Armour3D !== "undefined" && Armour3D.tint && Armour3D.join && am && tm) {
      Armour3D.tint(THREE, [root, add], [[am.material], [tm.material]]);
      Armour3D.join(THREE, am, [tm]);
    }
    return root;
  }

  /* ===================================================================
     7. BELL AH-1W SUPERCOBRA (roc_e90_gunship)
     Tables in drawing DW pixels ("Bell AH-1W SuperCobra orthographical
     image", 1800 px render). Side view: x px, y px, 69.3 px/m (nose to
     fin 962 px = the published 45 ft 7 in fuselage, 13.89 m); the mast at
     x px 1135 is x = 0, py 900 is z = 0. Plan: 70.55 px/m (its own
     length, 980 px), centreline x px 315; plan rows map onto side
     stations by ahs().
     =================================================================== */
  var AHW = { k: 69.3, kp: 70.55, x0: 1135, z0: 900 };
  function ahx(px) { return (AHW.x0 - px) / AHW.k; }
  function ahz(py) { return (AHW.z0 - py) / AHW.k; }
  function ahs(py) { return 793 + (py - 80) * 0.9816; }     /* plan row -> side station px */
  /* BODY: side x px, top py (the sill under the canopy), bottom py, plan half width px, exponent */
  var AHW_BODY = [
    [793, 880, 905, 6, 0.9], [800, 876, 912, 14, 0.85], [815, 872, 920, 22, 0.8], [835, 870, 930, 29, 0.8],
    [855, 869, 940, 31, 0.78], [880, 867, 950, 37, 0.75], [920, 865, 955, 40, 0.72], [960, 862, 958, 41, 0.72],
    [1000, 858, 958, 41.5, 0.72], [1050, 850, 958, 41, 0.72], [1107, 842, 958, 40, 0.72], [1186, 840, 958, 38, 0.72],
    [1264, 842, 954, 34, 0.74], [1313, 853, 950, 28, 0.76], [1343, 870, 946, 23.5, 0.8], [1402, 876, 942, 22.5, 0.82],
    [1460, 877, 939, 21.5, 0.82], [1519, 878, 936, 20, 0.82], [1598, 880, 931, 16.5, 0.84], [1657, 882, 929, 13, 0.85],
    [1696, 885, 928, 12, 0.85], [1730, 890, 926, 8, 0.9], [1745, 896, 922, 4, 0.9]];
  /* CANOPY: side x px, top py, sill py, half width m */
  var AHW_CAN = [[856, 866, 869, 0.10], [880, 840, 867, 0.32], [900, 820, 865, 0.40], [950, 813, 862, 0.42],
                 [1000, 812, 858, 0.42], [1040, 814, 851, 0.40], [1056, 832, 849, 0.24]];
  /* the transmission and engine fairing over the cabin: side x px, top py */
  var AHW_TOP = [[1045, 846], [1075, 795], [1100, 770], [1190, 770], [1230, 786], [1262, 812], [1295, 842]];
  /* FIN (side): py, LE px, TE px */
  var AHW_FIN = [[886, 1612, 1709], [880, 1620, 1713], [860, 1651, 1726], [840, 1681, 1739], [820, 1712, 1752],
                 [808, 1730, 1757], [804, 1738, 1754]];

  function buildAH1W(THREE, M, C) {
    V = THREE;
    var P = { key: "ah1w", base: "#4b5040", dk: "#41463a", pale: "#575c4a", seed: 1101, metal: false, nose: 0x2a2d29,
              blade: 0x2a2d2c };
    var K = lists(), s, k;
    K.skin.push(loft(AHW_BODY.map(function (r) {
      return S(ahx(r[0]), ahz(r[1]), ahz(r[2]), r[3] / AHW.kp, ahz((r[1] + r[2]) / 2), r[4]);
    }), 26, true, true));
    /* the nose sight turret's dark window (DW side: the box at the tip) */
    K.ink.push(box(0.04, 0.26, 0.24, ahx(792), 0, ahz(892)));
    /* the tandem canopy, flat-sided, with the frame between the seats */
    K.glass.push(loft(AHW_CAN.map(function (c) { return S(ahx(c[0]), ahz(c[1]), ahz(c[2]) - 0.05, c[3], ahz(c[2]), 0.72); }), 20));
    [900, 1003].forEach(function (fx) {
      var top = lerpTab(AHW_CAN, fx, 1), sill = lerpTab(AHW_CAN, fx, 2), w = lerpTab(AHW_CAN, fx, 3);
      var ar = new V.TorusGeometry(w, 0.02, 4, 14, PI);
      ar.scale(1, (ahz(top) - ahz(sill)) / w, 1); ar.rotateX(HALF_PI); ar.rotateZ(HALF_PI);
      ar.translate(ahx(fx), 0, ahz(sill)); K.metal.push(ar);
    });
    K.ink.push(box(1.8, 0.6, 0.30, ahx(955), 0, ahz(860) + 0.10));
    /* the pylon fairing over the transmission, and the mast */
    K.skin.push(loft(AHW_TOP.map(function (r, i) {
      var w = (i === 0 || i === AHW_TOP.length - 1) ? 0.12 : 0.38;
      return S(ahx(r[0]), ahz(r[1]), ahz(860), w, ahz(860), 0.8);
    }), 18, true, true));
    K.metal.push(cylZ(0.11, 0.13, ahz(715) - ahz(770), 0, 0, (ahz(715) + ahz(770)) / 2, 12));
    /* the two T700 nacelles either side of the pylon (DW side: x px 1115 to
       1345, py 808-875; plan: 0.81 m out over the pair) with their dark
       intakes and the stepped exhausts */
    for (s = -1; s <= 1; s += 2) {
      var ny = s * 0.58, zt = ahz(808), zb = ahz(875);
      K.skin.push(loft([S(ahx(1115), zt - 0.06, zb + 0.06, 0.18, undefined, 0.8), S(ahx(1130), zt, zb, 0.23, undefined, 0.8),
                        S(ahx(1280), zt + 0.01, zb, 0.23, undefined, 0.8), S(ahx(1322), zt - 0.03, zb + 0.06, 0.19, undefined, 0.8)
                       ].map(function (q) { q.yc = ny; return q; }), 16, true, false));
      K.ink.push(loft([S(ahx(1114), zt - 0.10, zb + 0.10, 0.13, undefined, 0.8), S(ahx(1116), zt - 0.10, zb + 0.10, 0.13, undefined, 0.8)
                      ].map(function (q) { q.yc = ny; return q; }), 12, true, false));
      K.hot.push(tube(0.30, 0.27, ahx(1322), ahx(1346), ny, (zt + zb) / 2 - 0.02, 14));
      var ex = new V.CircleGeometry(0.24, 14); ex.rotateY(-HALF_PI); ex.translate(ahx(1346) - 0.005, ny, (zt + zb) / 2 - 0.02); K.ink.push(ex);
    }
    /* stub wings (DW side: x px 1090-1200 at py 875; head-on 3.10 m over
       the tips), the dispenser box on each tip (DW; the ROC photograph R9),
       an M260 19-tube rocket pod inboard and a 4-round TOW launcher
       outboard, two over two (DW head-on; R9) */
    var wz = ahz(875);
    both(K.skin, [{ s: 0.45, le: ahx(1088), te: ahx(1202), t: 0.22, h: wz }, { s: 1.55, le: ahx(1098), te: ahx(1195), t: 0.18, h: wz }]);
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(box(0.60, 0.22, 0.30, ahx(1150), s * 1.58, wz + 0.18));
      K.ink.push(box(0.36, 0.23, 0.02, ahx(1150), s * 1.58, wz + 0.335));
      /* team colour: the side of each tip box */
      K.team.push(box(0.50, 0.02, 0.18, ahx(1150), s * 1.70, wz + 0.18));
      /* the 19-tube pod */
      K.skin.push(loft([O(ahx(1085), 0.17, wz - 0.61, s * 1.15), O(ahx(1092), 0.20, wz - 0.61, s * 1.15),
                        O(ahx(1180), 0.20, wz - 0.61, s * 1.15), O(ahx(1196), 0.15, wz - 0.61, s * 1.15)], 16, true, true));
      K.metal.push(box(0.60, 0.06, 0.30, ahx(1145), s * 1.15, wz - 0.26));
      /* the TOW launcher */
      for (var r = 0; r < 2; r++) for (k = -1; k <= 1; k += 2) {
        var ty = s * 1.47 + k * 0.12, tz = wz - 0.35 - r * 0.26;
        K.skin2.push(tube(0.11, 0.11, ahx(1065), ahx(1190), ty, tz, 12));
        var tm = new V.CircleGeometry(0.09, 10); tm.rotateY(HALF_PI); tm.translate(ahx(1065) + 0.005, ty, tz); K.ink.push(tm);
      }
      K.metal.push(box(0.70, 0.10, 0.25, ahx(1128), s * 1.47, wz - 0.17));
    }
    /* the M197 three-barrel gun in the chin turret (DW side) */
    K.metal.push(loft([O(ahx(858), 0.05, ahz(935)), O(ahx(864), 0.20, ahz(935)), O(ahx(886), 0.21, ahz(935)), O(ahx(892), 0.08, ahz(935))], 14, true, true));
    for (k = 0; k < 3; k++) {
      var a = k * 2 * PI / 3;
      K.metal.push(tube(0.025, 0.025, ahx(776), ahx(864), Math.cos(a) * 0.045, ahz(930) + Math.sin(a) * 0.045, 6));
    }
    /* fin, horizontal stabiliser (plan: 2.04 m, side py 903) and its end fins */
    K.skin.push(surf(AHW_FIN.map(function (r) {
      var le = ahx(r[1]), te = ahx(r[2]);
      return { s: ahz(r[0]), le: le, te: te, t: Math.max(0.06, (le - te) * 0.14), h: 0 };
    }), { vert: true }));
    both(K.skin, [{ s: 0.15, le: ahx(1548), te: ahx(1600), t: 0.08, h: ahz(903) },
                  { s: 1.02, le: ahx(1556), te: ahx(1598), t: 0.06, h: ahz(903) }]);
    /* the 90-degree tail-rotor gearbox fairing on the fin top, starboard */
    K.skin.push(loft([O(ahx(1736), 0.05, ahz(807), -0.10), O(ahx(1742), 0.14, ahz(807), -0.10), O(ahx(1760), 0.12, ahz(807), -0.10)], 12, true, true));
    /* the tail skid under the boom end */
    K.metal.push(rod([ahx(1665), 0, ahz(928)], [ahx(1712), 0, ahz(946)], 0.025, 6));
    /* skids: fixed (they stay down in flight), so not "gear" (as
       us_bell_huey.js); 0.99 m out (DW plan and head-on), the toes up */
    var zg = ahz(985) + 0.04;
    for (s = -1; s <= 1; s += 2) {
      var yS = s * 0.99;
      K.metal.push(tube(0.045, 0.045, ahx(965), ahx(1200), yS, zg, 10));
      K.metal.push(rod([ahx(965), yS, zg], [ahx(948), yS, zg + 0.12], 0.045, 8));
      K.metal.push(rod([ahx(1010), s * 0.38, ahz(958)], [ahx(1012), yS, zg + 0.02], 0.05, 8));
      K.metal.push(rod([ahx(1168), s * 0.38, ahz(958)], [ahx(1172), yS, zg + 0.02], 0.05, 8));
    }
    K.metal.push(rod([ahx(1010), -0.38, ahz(958)], [ahx(1010), 0.38, ahz(958)], 0.05, 8));
    K.metal.push(rod([ahx(1168), -0.38, ahz(958)], [ahx(1168), 0.38, ahz(958)], 0.05, 8));
    /* team colour: a band round the boom */
    K.team.push(loft(AHW_BODY.filter(function (r) { return r[0] >= 1460 && r[0] <= 1519; }).map(function (r) {
      return S(ahx(r[0]), ahz(r[1]) + 0.012, ahz(r[2]) - 0.012, r[3] / AHW.kp + 0.012, ahz((r[1] + r[2]) / 2), r[4]);
    }), 18));

    /* ---- DETAIL PASS: the fittings the first pass left out, placed off
       DW and R9; sizes read through the drawing's scale and the
       photograph's perspective, NOT measured ---- */
    /* the canopy's sills and the windscreen's centre post */
    for (s = -1; s <= 1; s += 2) {
      var cs2 = [];
      [880, 920, 960, 1000, 1040].forEach(function (cxp) { cs2.push([ahx(cxp), s * lerpTab(AHW_CAN, cxp, 3) * 1.01, ahz(lerpTab(AHW_CAN, cxp, 2))]); });
      for (k = 0; k < cs2.length - 1; k++) K.metal.push(rod(cs2[k], cs2[k + 1], 0.018, 4));
      /* the canopy doors' hinges and the kick-in steps below them */
      [930, 1010].forEach(function (hx2) {
        K.ink.push(pin(box(0.12, 0.03, 0.03, ahx(hx2), s * (lerpTab(AHW_CAN, hx2, 3) + 0.02), ahz(lerpTab(AHW_CAN, hx2, 2)) + 0.25)));
        [0.30, 0.55].forEach(function (dz) { K.ink.push(pin(box(0.12, 0.02, 0.04, ahx(hx2 + 10), s * (lerpTab(AHW_BODY, hx2 + 10, 3) / AHW.kp + 0.006), ahz(958) + dz))); });
      });
      /* the nacelles' intake screens and the exhausts' bright lips */
      var ny2 = s * 0.58, zt2 = ahz(808), zb2 = ahz(875);
      for (k = 0; k < 4; k++) K.metal.push(pin(box(0.02, 0.24, 0.012, ahx(1113), ny2, zt2 - 0.14 - k * 0.07)));
      K.metal.push(tube(0.31, 0.31, ahx(1340), ahx(1346), ny2, (zt2 + zb2) / 2 - 0.02, 14, true));
      /* the skids' wear shoes and the boarding step on the forward cross tube */
      K.ink.push(pin(box(2.4, 0.05, 0.016, ahx(1080), s * 0.99, zg - 0.045 + 0.0085)));
      K.metal.push(pin(box(0.24, 0.14, 0.02, ahx(1010), s * 0.80, zg + 0.20)));
      /* the stub wings' tip lamps, port red and starboard green */
      (s > 0 ? K.lampR : K.lampG).push(ball(0.04, ahx(1120), s * 1.66, wz + 0.18, 1.6, 0.6, 0.8));
      /* the boom's drive-shaft cover hinges */
      [1400, 1480, 1560].forEach(function (bx2) {
        K.ink.push(pin(box(0.10, 0.02, 0.05, ahx(bx2), s * (lerpTab(AHW_BODY, bx2, 3) / AHW.kp + 0.004), ahz(lerpTab(AHW_BODY, bx2, 1)) - 0.10)));
      });
    }
    /* the wire-strike cutters over the canopy and under the nose (R9) */
    K.metal.push(plateXZ([[ahx(870), ahz(845)], [ahx(905), ahz(805)], [ahx(912), ahz(808)], [ahx(880), ahz(848)]], 0.03, 0));
    K.metal.push(plateXZ([[ahx(845), ahz(958)], [ahx(880), ahz(972)], [ahx(885), ahz(966)], [ahx(852), ahz(952)]], 0.03, 0));
    /* the anti-collision beacons on the pylon fairing's top and under the
       belly, the white tail lamp on the fin */
    beacon(K, ahx(1250), 0, ahz(795), 1);
    beacon(K, ahx(1150), 0, ahz(958), -1);
    K.metal.push(ball(0.03, ahx(1755), 0, ahz(860), 1.3, 0.8, 1.0));
    /* aerials: blades under the boom and on the pylon, the radar warning
       receivers' fairings on the nose sides */
    bladeAnt(K.skin2, ahx(1420), ahz(938), -0.18, 0.26);
    bladeAnt(K.skin2, ahx(1290), ahz(812), 0.14, 0.20);
    for (s = -1; s <= 1; s += 2) K.ink.push(ball(0.04, ahx(820), s * 0.30, ahz(900), 1.6, 0.8, 0.8));

    var mats = makeMats(C, P), root = new V.Group();
    root.name = "ah1w";
    emit(root, K, mats);

    /* main rotor: an unrotated group, so its local +Z is the mast, up; the
       engine turns it positively about +Z, anti-clockwise from above, as a
       Bell rotor turns. Origin on the hub in the blade plane. Two blades,
       0.86 m chord (DW plan), 7.14 m radius (DW side). */
    var R = (1628 - 638) / AHW.k / 2, hub = [], bl = [];
    var rotor = new V.Group(); rotor.name = "rotor";
    rotor.position.set(0, 0, ahz(715));
    root.add(rotor);
    hub.push(cylZ(0.18, 0.20, 0.16, 0, 0, 0, 14));
    hub.push(cylZ(0.09, 0.11, 0.14, 0, 0, 0.14, 10));
    for (k = 0; k < 2; k++) {
      var g1 = box(R - 0.75, 0.86, 0.04, 0.75 + (R - 0.75) / 2, 0, 0.0); g1.rotateZ(k * PI + 0.35); bl.push(g1);
      var grip = box(0.60, 0.30, 0.12, 0.45, 0, 0); grip.rotateZ(k * PI + 0.35); hub.push(grip);
      var pl = rod([0.30, 0.20, -0.12], [0.30, 0.20, 0.05], 0.02, 5); pl.rotateZ(k * PI + 0.35); hub.push(pl);
      /* detail pass: the grip's two blade bolts and the bright tip cap */
      [cylZ(0.03, 0.03, 0.16, 0.66, 0.08, 0, 8), cylZ(0.03, 0.03, 0.16, 0.66, -0.08, 0, 8),
       box(0.16, 0.86, 0.05, R - 0.08, 0, 0)].forEach(function (q) { q.rotateZ(k * PI + 0.35); hub.push(q); });
    }
    rotor.add(new V.Mesh(merge(hub), mats.metal));
    rotor.add(new V.Mesh(merge(bl), mats.blade));
    var dsk = new V.CircleGeometry(R, 48); dsk.translate(0, 0, 0.03);
    var rd = new V.Mesh(dsk, mats.disc); rd.name = "rotordisc"; rotor.add(rd);

    /* tail rotor on the STARBOARD side of the fin (DW plan: the hub right
       of the boom), two blades, 2.90 m (DW side). Unrotated group: its
       local Y is the model's lateral axis, the shaft. */
    var TR = 1.45, trs = [], trb = [];
    var tr = new V.Group(); tr.name = "tailrotor";
    tr.position.set(ahx(1748), -0.24, ahz(807));
    root.add(tr);
    trs.push(cylY(0.08, 0.16, 0, 0, 0, 12));
    for (k = 0; k < 2; k++) { var tb = box(0.24, 0.03, TR - 0.12, 0, -0.05, 0.12 + (TR - 0.12) / 2); tb.rotateY(k * PI + 0.5); trb.push(tb); }
    tr.add(new V.Mesh(merge(trs), mats.metal));
    tr.add(new V.Mesh(merge(trb), mats.blade));
    var tdk = new V.CircleGeometry(TR, 28); tdk.rotateX(HALF_PI); tdk.translate(0, -0.06, 0);
    var trd = new V.Mesh(tdk, mats.disc); trd.name = "rotordisc"; tr.add(trd);
    return root;
  }


  return {
    f84g: buildF84, f100a: buildF100, c46d: buildC46, at3: buildAT3,
    fck1a: function (T, M, C) { return buildFCK(T, M, C, "A"); },
    fck1c: function (T, M, C) { return buildFCK(T, M, C, "C"); },
    md500mdTow: build500MD, ah1w: buildAH1W,
    FCK_VARIANTS: FCK_VARIANTS,
  };
})();

/* len: each build's measured X extent (the F-100A's with its nose boom, the
   helicopters' rotor disc front to the tail rotor's tip). roc_e80_gunship
   builds through HeroKpaAir.md500d, so js/hero/kpa_air.js must be loaded. */
UNIT_MODELS["roc_e50_cas"] = { len: 11.65, build: function (T, M, C) { return HeroRocAir.f84g(T, M, C); } };
UNIT_MODELS["roc_e60_cas"] = { len: 16.45, build: function (T, M, C) { return HeroRocAir.f100a(T, M, C); } };
UNIT_MODELS["roc_e50_transport"] = { len: 23.35, build: function (T, M, C) { return HeroRocAir.c46d(T, M, C); } };
UNIT_MODELS["roc_e80_cas"] = { len: 12.87, build: function (T, M, C) { return HeroRocAir.at3(T, M, C); } };
UNIT_MODELS["roc_e90_cas"] = { len: 14.24, build: function (T, M, C) { return HeroRocAir.fck1a(T, M, C); } };
UNIT_MODELS["roc_e00_cas"] = { len: 14.24, build: function (T, M, C) { return HeroRocAir.fck1c(T, M, C); } };
UNIT_MODELS["roc_e80_gunship"] = { len: 9.18, build: function (T, M, C) { return HeroRocAir.md500mdTow(T, M, C); } };
UNIT_MODELS["roc_e90_gunship"] = { len: 17.44, build: function (T, M, C) { return HeroRocAir.ah1w(T, M, C); } };
