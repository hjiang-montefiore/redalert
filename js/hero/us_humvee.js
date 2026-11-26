/* ===== us_humvee.js - HERO models: the AM General HMMWV and the vehicles built on it ============
   Full-quality redo (owner 2026-10-24, the US ground set).  Six keys, kept, one builder:
     nato_e80_recon  "HMMWV", e80, service 1985, turret:true, M2 .50 (js/eras.js).  The row's name is the
                     M998, but the armed member of the M998 series with a roof-mounted M2 is the M1025
                     armament carrier: DoD captions use "M998" for the whole family - [P4] is captioned
                     an M998 and is an M1025 slant-back with the ring and M2.  So the M1025 is drawn.
     nato_e90_recon  "M1025/M1026 Armament Carrier HMMWV", e90: the same truck (it did not change).
     nato_e00_recon  "M1151 HMMWV Expanded Capacity Armament Carrier", service 2005: the armoured body
                     with the gunner's shield (GPK) over the ring.
     recon_n         "M1151 HMMWV (armed)", present day: the same body with the enclosed box turret
                     (OGPK) and a second whip.
     nato_e90_spaag  "M1097 Avenger Pedestal Mounted Stinger", e90, service 1990.
     nato_e90_ewveh  "AN/TLQ-17A TRAFFIC JAM on the HMMWV", e90, service 1991.
   Build names kept: HeroHumvee.make, read by nothing else.

   Published (kept from the old header, confirmed): M998 15 ft x 7 ft 1 in x 6 ft (4.57 x 2.16 x 1.83 m),
     wheelbase 130 in (3.30 m), track 71.5 in, 36 x 12.5R16.5 tyres (en.wikipedia Humvee); M1114/M1151
     about 4.9 x 2.3 x 1.9 m on 37 in tyres, 5.5 t (AM General); Avenger 4.95 x 2.18 x 2.64 m, 3,900 kg,
     two Stinger pods of four, the FN M3P, the FLIR, on the M1097 heavy HMMWV (en.wikipedia Avenger).
   TRAFFIC JAM (GlobalSecurity "AN/TLQ-17A(V), TRAFFICJAM" [G]): the (V)1 was two M151 jeeps and trailers;
     the (V)3 "housed the electronics in an S-250 shelter" on the CUCV, and the CUCV was replaced by the
     HMMWV (fielding FY90-92; deployed to Desert Storm; 66 systems).  Its photograph [G1] shows the
     antenna: a log-periodic array of about fourteen VERTICAL dipoles on a horizontal boom, longest at
     one end, on one mast.

   References (Wikimedia Commons at width 960 unless noted; cached in the scratchpad q_humvee_ref):
     [D1] "M1151.png" - side drawing of the M1151 (nose left, used mirrored): the STATION SOURCE.
          110.9 px a metre on the 3.30 m wheelbase; bumper 2.21, tail -2.48, pintle -2.63 (axles at
          +-1.65), bonnet 1.14 m at the nose and 1.34 at the cowl, roof 1.87, sill 0.44, door foot 0.63,
          armour windows 1.31-1.58, the slant from x -1.19 to the tail at 1.33, louvres -1.42..-2.14.
     [D2] "HMMWV SECM.png" - side drawing of a two-door shelter carrier: the cab and the box on the bed.
     [P1] "A left front view of a US Army M998 High-Mobility Multipurpose Wheeled Vehicle" (DoD, DPLA) -
          front-left, NATO three-colour: the front clip, nine-slot grille, round headlamps, amber lamps.
     [P2] "HMMWV armament carrier M1025.jpg" - square side, three-colour: the slant-back, four doors with
          the pressed X, the raked windshield; the profile of the first-generation body.
     [P3] "M1151 HMMWV.jpg" (2015, tan) - front-left: armoured doors and glass, the GPK shield.
     [P4] "An airman mans the M-2 .50-caliber machine gun mounted atop an M998 ..." (DoD, DPLA) - an
          M1025 with the roof ring and the M2, three-colour.
     [P5] "A view of an Avenger air defense system ... during Operation Desert Shield" (DoD, DPLA, 1990) -
          the M1097 Avenger from the side in three-colour: the two-door hard cab, the housing behind it.
     [P6] "HMMWV uparmoured M1114.jpg" - the up-armoured body from the front-left.
     [P7] "M1097 Avenger AA-System.jpg" (USMC) - front: the housing, both pods, the FLIR under the left pod.
     [G1] globalsecurity.org/military/systems/ground/images/an-tlq-17-s.jpg - the TRAFFIC JAM antenna.

   Recognition list (what each rests on; where it is in the code):
     1. Low and wide on four big tyres standing out at the corners, axles 3.30 m apart [D1][P2]: XF/XR, tyreGeo.
     2. The one-piece front clip: bonnet sloping 1.34 -> 1.14 m to the nose, full-width fenders with chamfered
        outer top edges, the bonnet centre a little proud, the black vent on its rear [D1][P1][P3]: BON, frontClip.
     3. The grille face: nine vertical slots, a round headlamp either side, amber lamps outboard [P1][P3][P7].
     4. The square-topped front wheel opening, the fender's trailing edge sweeping down to the sill [D1][P2].
     5. The deep black bumper with the two tow shackles; the pintle hook behind [P1][P7][D1]: frontClip, rearEnd.
     6. The slant-back: flat roof to behind the rear doors, then the long slope to the tail [D1][P2][P4].
     7. The doors: four with the pressed X and big windows on the M1025 [P1][P2]; thick flat armoured doors
        with small windows and outside hinges on the M1151 [D1][P3]: door().
     8. The windshield: raked two-pane on the M1025 [P2]; near-upright armoured on the M1151 [D1][P3].
     9. The M1151's louvred panel on the slant-back side and the intake stack at the right of the cowl [D1].
    10. The weapon station: the M1025's roof ring with the M2 [P4]; the GPK shield [P3]; the OGPK box.
    11. The geared hubs: the wheel face with eight nuts and the hub cap, which turn with the tyre [D1][P1].
    12. Avenger: two-door hard cab, the turret on the bed - housing with the raked glass front, a pod of four
        each side (2 x 2 mouths), the M3P low on the right, the FLIR on the left, two whips [P5][P7].
    13. TRAFFIC JAM: the S-250 shelter on the bed [G][D2] and the vertical-element log-periodic array [G1].
   Paint (batch 2): PLAIN CARC, one colour per row (AGENT_POLICY: no camouflage; the 1985-90 photographs
     show the NATO three-colour, which is no longer drawn): Green 383 for e80, the Avenger and TRAFFIC JAM,
     Tan 686A for e90 (armour_specs gives it "desert", the 1991 truck), e00 and n.  No markings, numbers,
     bumper codes or plates ([P3]'s and [P7]'s are not drawn).
   CORRECTED against the old file: the old body was one slab at one width with a box for a bonnet; the front
     clip is now lofted from [D1]'s bonnet line and [P1]'s section, the fenders stand full width over the
     tyres and the doors are inset.  The old TRAFFIC JAM antenna was a horizontal Yagi, a guess; [G1] shows
     a log-periodic array with vertical elements, now drawn.  The old e80 was in MERDC woodland and the old
     e90 in tan: the 1985-1990 photographs found all show the NATO three-colour.  The old M1151 carried a
     spare wheel on the tail and a wire-cutter post: neither is in [D1] or [P3], both removed.  The armoured
     turret ring moves forward to x -0.35, over the rear doors as [D1] draws it.
   NOT confirmed (drawn as stated): where the TRAFFIC JAM mast stands and how tall it is (on the shelter
     roof, the array 1.25 m above it); the shelter's size (read off [D2]'s proportions on this cab); the
     Avenger's 4.95 m is met with the rear overhang read long (the split is not published); the OGPK box
     (kept from the old file's M1165A1 photograph, not re-checked); the M3P position (under the right pod).
   DATA NOTES (reported, not changed): armour_specs nato_e80_recon says turret "none" and height 1.8 while
     eras.js gives turret:true and an M2; armour_specs nato_e90_recon says camo "desert".

   Meshes: everything fixed is baked, one merged mesh per material (8 materials: skin with the canvas paint,
     dark, tyre, glass, team, white, amber and red lamps); the four tyres are "roadwheel" groups (axle on
     local Y); the weapon station, the Avenger turret and the TRAFFIC JAM array are the named "turret"
     (origin on the ring or mast, along +X).  12-14 draw calls, 6,400-6,600 triangles.  The team material
     is exactly C.team, on a top-facing roof (or shelter) panel.
   Model space: +X nose, +Y left, +Z up, real metres, tyres on z = 0.  Colours authored in sRGB and left to
   prepModel() to linearise.  ASCII only.
   BATCH 2 (2026-11, what reads at the game camera; spec tools/model3d/specs/<key>.json, six of them):
     References added, all in tools/model3d/specs/ref/: [L1] the M1167 broadside (Lithuania 2015) - the
     measuring picture, 141.4 px a metre on the wheelbase; [R2] the ROC M1097 Avenger at CKS (front-left);
     [R3] an HMMWV front clip (ROC display); [R4] an M1151 with the GPK from astern (Croatia).
     - paint: plain, on a canvas registered to the truck (paint()): shade under the belt line, dried mud to
       z 0.6 and thrown round both arches, rivet rows, the bonnet sun-faded and the rear darker, dust drifts
       on the tops; turret parts are mapped where they stand (worldUV takes the group's offset), so the
       Avenger housing no longer takes the mud band; tops map at y + 2.3 m, clear of the mud band.
     - the black steel, the tyres (lathe UVs) and the glass (sky in the upper pane) carry maps of their own
       under userData.hvUV, never userData.worldUV, so roc_artillery.js / roc_retry.js re-skin only the paint.
     - the RAISED AIR INTAKE on the bonnet's left front with its black slat grille, as [R2][R3] show; the
       old file's vent across the rear of the bonnet (in no photograph) is gone.  Bonnet line lowered at the
       nose to [L1] (fender top 1.02 at the nose, 1.075 at 6 cm).
     - the armoured body to [L1]: roof 1.82 (was 1.87), roof end x -1.12 and slant to z 1.42 at the tail,
       tail -2.41 (was -2.48; the pintle stays at -2.62, so the 4.98 m extent atgmv_r keeps is unchanged),
       doors 0.70 / -0.20 / -1.12, glass 1.25-1.54 in wide raised frames, the louvre panel at z 1.03-1.19
       (was 1.31-1.50), the intake stack cap at 1.84 (was 1.98); four jerrycans racked on the tail [R4].
     - the OGPK's rear half open over the gunner (the dark hatch shows); the bonnet's creases, the rear
       lid's seam on the slant; door seams twice as wide; the S-250's joints, ECU, entry panel and door;
       the Avenger pods' black end frames, tube rims, bands, ribs, handles and trunnions, the canopy's frame.
     - floating parts fixed: the side marker lamps (were over the wheel opening), the rear tie-downs, the
       shelter's roof eyes.
     Tris / draw calls before -> after: e80 / e90 11308 -> 11820 (12), e00 11848 -> 12768 (14), n 11928 ->
     12884 (14), av 10460 -> 11832 (14), tj 10560 -> 11360 (12).  make() and its keys, the 'turret' and
     'roadwheel' groups, the skin's userData.worldUV = 4.6 and every UNIT_MODELS len unchanged.
   REVIEW 1 (batch 2, e00 / n sent back): the kit bags and rolled net on the slant-back removed (in
     neither [L1] nor [R4]); the body above the belt line lowered to [L1] - roof 1.78, slant to 1.40 at the
     tail (1.555 at x -1.80), glass 1.25-1.50, stack cap 1.80; what reads at the game camera: the armour
     windows in a black gasket inside wider raised bolted frames, a heavier black windshield frame, the
     louvre panel with dark slats in a raised frame, the GPK's glass blocks thick in wide black frames, and
     off [L1] / [R4] the bolted plate behind the front wheel, the doors' D-ring pulls, the slant's corner
     blocks, ledge and edge bolts, the big rear mudflaps (review 2: the invented roof bolt rows replaced by
     [L1]'s plain edge rail, four bolts a side and a slot; the ledge lowered to 1.5 cm); the armoured pair's tan authored at the 686A chip
     value (the e90 M1025 keeps its accepted shade, "tan90").
   DETAIL PASS 2 (the owner: the models looked plainer than the old ones): hvDetail() on every body (dpKit through the Baker, no new material); (its dpWeather sheet is replaced by batch 2's paint).
     e80 / e90 6608 -> 7664 tris (12 draw calls), e00 6552 -> 7624 (14), n 6620 -> 7692 (14), av 6484 -> 7316
     (14), tj 6584 -> 7416 (12).  make() and its keys unchanged.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHumvee = (function () {
  "use strict";

  /* ------------------------------------------------------------ variants */
  /* Stations off the M1151 side drawing [D1] (110.9 px a metre on the 3.30 m wheelbase; the
     axles at +-1.65) and, for the first-generation body, the M1025 side photograph [P2].
     R: tyre radius (36 in first generation, 37 in on the armoured family); nose: grille face;
     bump: bumper face; tail: rear body face; pint: the pintle hook; hwF: half width over the
     front clip; hwS: half width of the body sides (the doors); roof: roof top. */
  var XF = 1.65, XR = -1.65;
  var VAR = {
    e80: { kind: "slant", paint: "green", R: 0.457, nose: 2.16, bump: 2.21, tail: -2.28, pint: -2.36,
           hwF: 1.08, hwS: 1.03, roof: 1.83 },
    e90: { kind: "slant", paint: "tan90", R: 0.457, nose: 2.16, bump: 2.21, tail: -2.28, pint: -2.36,
           hwF: 1.08, hwS: 1.03, roof: 1.83 },
    e00: { kind: "arm", paint: "tan", R: 0.470, nose: 2.19, bump: 2.245, tail: -2.41, pint: -2.62,
           hwF: 1.15, hwS: 1.12, roof: 1.78, turret: "gpk" },
    n:   { kind: "arm", paint: "tan2", R: 0.470, nose: 2.19, bump: 2.245, tail: -2.41, pint: -2.62,
           hwF: 1.15, hwS: 1.12, roof: 1.78, turret: "ogpk" },
    /* the M1097 heavy HMMWV with the Avenger: 4.95 m on the fact sheet, so its tail is longer
       than the M1025's (read off [P5], the rear bumper about 0.75 m behind the rear axle) */
    av:  { kind: "avenger", paint: "green", R: 0.457, nose: 2.21, bump: 2.26, tail: -2.45, pint: -2.62,
           hwF: 1.08, hwS: 1.03, roof: 1.83 },
    /* the shelter carrier of the TRAFFIC JAM (the M998-family two-door cab) */
    tj:  { kind: "jam", paint: "green", R: 0.457, nose: 2.16, bump: 2.21, tail: -2.28, pint: -2.36,
           hwF: 1.08, hwS: 1.03, roof: 1.83 }
  };
  var TW = 0.318;          /* 12.5 in section width */
  var HALF_TRACK = 0.908;  /* 71.5 in track */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* --------------------------------------------------------------- paint */
  /* PAINT (batch 2, 2026-11): PLAIN service paint, one colour per variant (AGENT_POLICY: no
     camouflage), drawn on a canvas REGISTERED to the truck: the skin is mapped by world position
     (4.6 m to the canvas, worldUV below), side faces take (x, z), front and rear faces (y, z), top
     faces (x, y + 2.3 m) so the roof and bonnet land in the canvas's upper middle band (z-equivalent
     1.15-3.45 m) and never in the mud band at its foot.  What the canvas carries, in metres on the
     truck: the lower body darker (shade under the belt line), dried mud thick to z 0.45 and thinning
     to about 0.95, splashed up round both wheel arches (x +-1.65) and thrown back behind each wheel,
     rivet rows on the belt line (z 1.02) and the sill (z 0.60) as the riveted aluminium body shows,
     sun-faded and darker panels, rain streaks under the windows, dust on the top band, chips.
       green: CARC Green 383 (FS 34094); authored #475034 so it shows about #5d6a43 on a side in sun
              (HeroKit's seenAs ramp)
       tan:   CARC Tan 686A (FS 33446) on the armoured pair, authored at the chip's own value #b8a07a (the
              kit's rule: a chip authored as is shows as that paint in bright sun, as [L1] does)
       tan2:  the same tan, a later lot a little greyer (#b2a07c)
       tan90: the e90 M1025's tan, kept at the darker #8e7858 the review accepted
     Cached per paint kind. */
  var PAINTS = {
    green: { base: "#475034", mud: [112, 96, 70], dust: [128, 122, 96], lite: [120, 126, 96], fade: [88, 96, 66] },
    tan90: { base: "#8e7858", mud: [112, 92, 64], dust: [196, 182, 148], lite: [236, 224, 190], fade: [178, 160, 124] },
    tan:   { base: "#b8a07a", mud: [112, 92, 64], dust: [196, 182, 148], lite: [236, 224, 190], fade: [178, 160, 124] },
    tan2:  { base: "#b2a07c", mud: [108, 90, 64], dust: [192, 180, 150], lite: [232, 222, 192], fade: [174, 160, 128] }
  };
  var TILE = 4.6, _cv = {};
  function paint(kind, V) {
    var ck = kind + "|" + (V ? V.kind + V.nose + V.tail : "");
    if (_cv[ck]) return _cv[ck];
    var P = PAINTS[kind] || PAINTS.green, N = 1024, K = N / TILE, R = rng((kind === "tan90" ? 3 : kind.length) * 7919 + 17), i, k, x, y, w, h, gr;
    var cv = document.createElement("canvas"); cv.width = cv.height = N;
    var q = cv.getContext("2d");
    function X(xm) { return (((xm / TILE) % 1) + 1) % 1 * N; }       /* station -> canvas x (wraps) */
    function Y(zm) { return N * (1 - zm / TILE); }                    /* height  -> canvas y */
    function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
    function ell(cx, cy, rx, ry, a) { q.beginPath(); q.ellipse(cx, cy, rx, ry, a || 0, 0, 2 * Math.PI); q.fill(); }
    function wrapEll(cx, cy, rx, ry, a) { ell(cx, cy, rx, ry, a); if (cx - rx < 0) ell(cx + N, cy, rx, ry, a); if (cx + rx > N) ell(cx - N, cy, rx, ry, a); }
    q.fillStyle = P.base; q.fillRect(0, 0, N, N);
    /* paint that has weathered unevenly: big soft lighter and darker areas, no hard edges */
    for (i = 0; i < 46; i++) {
      q.fillStyle = (i % 2) ? rgba(P.fade, 0.05) : "rgba(20,18,12,0.05)";
      wrapEll(R() * N, R() * N, 60 + R() * 150, 40 + R() * 90, R() * 3);
    }
    /* shade under the belt line: the lower body reads darker than the upper (z 1.1 -> 0) */
    gr = q.createLinearGradient(0, Y(1.15), 0, N);
    gr.addColorStop(0, "rgba(18,16,10,0.00)"); gr.addColorStop(0.5, "rgba(18,16,10,0.10)"); gr.addColorStop(1, "rgba(18,16,10,0.22)");
    q.fillStyle = gr; q.fillRect(0, Y(1.15), N, N - Y(1.15));
    /* the top band (roof, bonnet, the upper sides): sun-bleached, a fine dust */
    gr = q.createLinearGradient(0, Y(3.45), 0, Y(1.15));
    gr.addColorStop(0, rgba(P.lite, 0.06)); gr.addColorStop(0.5, rgba(P.lite, 0.10)); gr.addColorStop(1, rgba(P.lite, 0.03));
    q.fillStyle = gr; q.fillRect(0, Y(3.45), N, Y(1.15) - Y(3.45));
    for (i = 0; i < 900; i++) { q.fillStyle = rgba(P.dust, 0.10 + R() * 0.12); w = 1 + R() * 3; q.fillRect(R() * N, Y(3.45) + R() * (Y(1.15) - Y(3.45)), w, w); }
    /* PANEL SHADING in the top band, registered to the panel breaks along the truck (the top faces
       map x straight across): the bonnet (cowl to nose) sun-faded lighter, the roof as painted, the
       slant-back or bed behind the roof darker and dirtier; a dark line at each break.  The crew's
       boot scuffs and wind-blown dust smears on the bonnet and roof. */
    if (V) {
      var cowl = V.nose - 1.25, re = V.kind === "slant" ? -1.16 : V.kind === "arm" ? ARM_RE : CAB_BACK, yT = Y(3.45), hT = Y(1.15) - Y(3.45);
      var band = function (x0, x1, c, a) {
        var u0 = X(x0), u1 = X(x1); q.fillStyle = rgba(c, a);
        if (u1 >= u0) q.fillRect(u0, yT, u1 - u0, hT); else { q.fillRect(u0, yT, N - u0, hT); q.fillRect(0, yT, u1, hT); }
      };
      band(cowl, V.nose + 0.1, P.lite, 0.14);
      band(V.tail - 0.1, re, [24, 22, 14], 0.16);
      [cowl, re].forEach(function (xb) { q.fillStyle = "rgba(14,13,8,0.35)"; q.fillRect(X(xb) - 1, yT, 3, hT); });
      /* dust drifts, long along the truck as the air carries it, and darker wiped or scuffed
         streaks; soft, so they read as dirt and not as a pattern */
      var drift = function (x0, x1, n, a) {
        for (i = 0; i < n; i++) {
          x = X(x0 + R() * (x1 - x0)); y = yT + R() * hT;
          var rx = 18 + R() * 50, ry = 3 + R() * 8;
          gr = q.createRadialGradient(x, y, 0, x, y, rx);
          var c = (i % 3) ? P.dust : [30, 26, 16], aa = (i % 3) ? a : a * 0.6;
          gr.addColorStop(0, rgba(c, aa)); gr.addColorStop(1, rgba(c, 0));
          q.save(); q.translate(x, y); q.scale(1, ry / rx); q.translate(-x, -y);
          q.fillStyle = gr; q.beginPath(); q.arc(x, y, rx, 0, 2 * Math.PI); q.fill(); q.restore();
        }
      };
      drift(cowl, V.nose, 60, 0.30);
      drift(V.tail, cowl, 110, 0.26);
    }
    /* rain streaks running down from under the windows and the roof edge (z 1.75 -> 1.1) */
    for (i = 0; i < 120; i++) {
      x = R() * N; y = Y(1.75 - R() * 0.4); h = 20 + R() * 90;
      q.fillStyle = (i % 3) ? "rgba(22,20,12,0.10)" : rgba(P.lite, 0.08); q.fillRect(x, y, 1 + R() * 2, h);
    }
    /* MUD: a dried band at the foot, its top edge ragged, then spatter thinning upward */
    var zMud = 0.60;
    q.fillStyle = rgba(P.mud, 0.80);
    q.beginPath(); q.moveTo(0, N);
    for (x = 0; x <= N; x += 8) q.lineTo(x, Y(zMud + 0.10 * Math.sin(x * 0.021) + 0.06 * Math.sin(x * 0.077 + 1) + (R() - 0.5) * 0.05));
    q.lineTo(N, N); q.closePath(); q.fill();
    gr = q.createLinearGradient(0, Y(1.10), 0, Y(0.50));
    gr.addColorStop(0, rgba(P.mud, 0.0)); gr.addColorStop(1, rgba(P.mud, 0.60));
    q.fillStyle = gr; q.fillRect(0, Y(1.10), N, Y(0.50) - Y(1.10));
    for (i = 0; i < 2600; i++) {
      var zz = 0.40 + Math.pow(R(), 1.8) * 0.75; q.fillStyle = rgba(i % 4 ? P.mud : [70, 58, 40], 0.25 + R() * 0.4);
      w = 1 + R() * 4; q.fillRect(R() * N, Y(zz), w, w * (0.6 + R()));
    }
    /* the arches: mud thrown up round each wheel opening (r 0.60 m about the axle at z 0.46) and
       a fan thrown back behind it */
    [1.65, -1.65].forEach(function (ax) {
      var cx = X(ax), cy = Y(0.46);
      for (k = 0; k < 1100; k++) {
        var a = Math.PI * (0.05 + R() * 0.9), r = (0.60 + Math.pow(R(), 2) * 0.42) * K;
        var px = cx + Math.cos(a) * r, py = cy - Math.sin(a) * r;
        q.fillStyle = rgba(k % 5 ? P.mud : [66, 54, 36], 0.22 + R() * 0.45); w = 1 + R() * 4.5;
        q.fillRect(((px % N) + N) % N, py, w, w * (0.5 + R()));
      }
      for (k = 0; k < 260; k++) {                       /* thrown back: behind the wheel, low */
        var bx = cx - (0.62 + R() * 0.55) * K, by = Y(0.30 + R() * 0.55 * R());
        q.fillStyle = rgba(P.mud, 0.20 + R() * 0.35); w = 2 + R() * 6;
        q.fillRect(((bx % N) + N) % N, by, w * 1.8, w * 0.7);
      }
    });
    /* rivet rows: the belt line and the sill of the riveted body (8 cm pitch) */
    [1.02, 0.60, 1.30].forEach(function (zr, j) {
      var yy = Y(zr), pitch = 0.08 * K;
      for (x = R() * pitch; x < N; x += pitch) {
        if (j === 2 && R() < 0.5) continue;
        q.fillStyle = "rgba(14,13,8,0.55)"; q.fillRect(x, yy, 3, 3);
        q.fillStyle = rgba(P.lite, 0.35); q.fillRect(x, yy - 1, 2, 1);
      }
      q.fillStyle = "rgba(14,13,8,0.18)"; q.fillRect(0, yy + 6, N, 1.5);
    });
    /* chips and scuffs, oil and fuel stains */
    for (i = 0; i < 300; i++) { q.fillStyle = (i % 2) ? rgba(P.lite, 0.28) : "rgba(12,10,6,0.35)"; w = 1 + Math.floor(R() * 3); q.fillRect(R() * N, R() * N, w, w); }
    for (i = 0; i < 10; i++) { q.fillStyle = "rgba(14,12,8,0.14)"; wrapEll(R() * N, Y(0.5 + R() * 0.8), 6 + R() * 16, 10 + R() * 30, 0); }
    _cv[ck] = cv;
    return cv;
  }
  /* the black steel, rubber and gun-metal: a grime sheet multiplied into their colour (tile 1.5 m,
     box-mapped like the skin but under userData.hvUV so a re-skin by worldUV never touches it) */
  var _gcv = null;
  function grime() {
    if (_gcv) return _gcv;
    var N = 256, R = rng(4242), i, w, cv = document.createElement("canvas"); cv.width = cv.height = N;
    var q = cv.getContext("2d");
    q.fillStyle = "#a8a8a4"; q.fillRect(0, 0, N, N);
    for (i = 0; i < 60; i++) { q.fillStyle = (i % 2) ? "rgba(255,250,235,0.10)" : "rgba(0,0,0,0.12)"; q.beginPath(); q.ellipse(R() * N, R() * N, 6 + R() * 30, 4 + R() * 18, R() * 3, 0, 6.283); q.fill(); }
    for (i = 0; i < 700; i++) { q.fillStyle = (i % 3) ? "rgba(0,0,0,0.18)" : "rgba(255,245,220,0.30)"; w = 1 + R() * 2; q.fillRect(R() * N, R() * N, w, w); }
    _gcv = cv;
    return cv;
  }
  /* the glass: the sky caught in the upper part of every pane and a dark lower part (v = z / 2 m, so
     a pane at z 1.2-1.8 runs v 0.6-0.9), two diagonal glints, a dust film along the bottom */
  var _glcv = null;
  function glassCanvas() {
    if (_glcv) return _glcv;
    var N = 256, i, cv = document.createElement("canvas"); cv.width = cv.height = N;
    var q = cv.getContext("2d"), gr = q.createLinearGradient(0, 0, 0, N);
    gr.addColorStop(0.00, "#a8b2b6"); gr.addColorStop(0.10, "#7c888e"); gr.addColorStop(0.20, "#4c5458");
    gr.addColorStop(0.30, "#343c40"); gr.addColorStop(1.0, "#30383c");
    q.fillStyle = gr; q.fillRect(0, 0, N, N);
    q.fillStyle = "rgba(240,244,246,0.22)";
    for (i = 0; i < 2; i++) { var x = 40 + i * 120; q.beginPath(); q.moveTo(x, 0); q.lineTo(x + 26, 0); q.lineTo(x - 30, N * 0.5); q.lineTo(x - 56, N * 0.5); q.closePath(); q.fill(); }
    q.fillStyle = "rgba(170,150,110,0.25)"; q.fillRect(0, N * 0.36, N, N * 0.06);
    _glcv = cv;
    return cv;
  }
  /* the tyre: rubber with the tread's wear, dust caked in the sidewall's lower band (u round the
     tyre, v from the axle out to the crown) */
  var _tcv = null;
  function tyreCanvas() {
    if (_tcv) return _tcv;
    var N = 256, R = rng(5151), i, x, w, cv = document.createElement("canvas"); cv.width = cv.height = N;
    var q = cv.getContext("2d");
    /* multiplied into a light rubber colour: the base sheet is dark (bare rubber), the dust light */
    q.fillStyle = "#6a6a68"; q.fillRect(0, 0, N, N);
    /* v 0.88-1 (canvas top): the crown, scrubbed and dusty; v 0.5-0.85: the sidewall, dust caked
       toward the shoulder */
    q.fillStyle = "rgba(200,180,140,0.55)"; q.fillRect(0, 0, N, N * 0.12);
    var g2 = q.createLinearGradient(0, N * 0.12, 0, N * 0.5);
    g2.addColorStop(0, "rgba(200,176,132,0.65)"); g2.addColorStop(1, "rgba(200,176,132,0.0)");
    q.fillStyle = g2; q.fillRect(0, N * 0.12, N, N * 0.38);
    for (i = 0; i < 600; i++) { q.fillStyle = (i % 3) ? "rgba(210,184,140,0.45)" : "rgba(0,0,0,0.30)"; w = 1 + R() * 3; q.fillRect(R() * N, N * (0.05 + R() * 0.45), w, w); }
    for (i = 0; i < 24; i++) { x = R() * N; q.fillStyle = "rgba(0,0,0,0.25)"; q.fillRect(x, N * 0.15, 2, N * 0.3); }
    _tcv = cv;
    return cv;
  }
  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* ----------------------------------------------------------- materials */
  /* skin (painted aluminium and steel), dark (black steel, seats, bezels, guns), rub (tyres),
     glass, team, lamp (white), lampA (amber), lampR (tail).  Eight. */
  function makeMats(THREE, C, V) {
    var T = {};
    var st = canvasTex(THREE, paint(V.paint, V));
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (st) T.skin.map = st; else T.skin.color.set((PAINTS[V.paint] || PAINTS.green).base);
    T.skin.userData.worldUV = TILE;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24261f, roughness: 0.78, metalness: 0.22 });
    var gt = canvasTex(THREE, grime());
    if (gt) { T.dark.map = gt; T.dark.color.setHex(0x363830); T.dark.userData.hvUV = 1.5; }
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1b1b19, roughness: 0.95, metalness: 0.02 });
    var tt = canvasTex(THREE, tyreCanvas());
    if (tt) { T.rub.map = tt; T.rub.color.setHex(0x5a5850); }
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.12, metalness: 0.35 });
    var gl = canvasTex(THREE, glassCanvas());
    if (gl) { T.glass.map = gl; T.glass.color.setHex(0x46606a); T.glass.userData.hvUV = 2.0; }
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xcfc9ac, roughness: 0.3, metalness: 0.1,
                                              emissive: 0x2a2814, emissiveIntensity: 0.7 });
    T.lampA = new THREE.MeshStandardMaterial({ color: 0xc87a1a, roughness: 0.35, metalness: 0.1,
                                               emissive: 0x3a2206, emissiveIntensity: 0.7 });
    T.lampR = new THREE.MeshStandardMaterial({ color: 0xa01a10, roughness: 0.35, metalness: 0.1,
                                               emissive: 0x3c0a06, emissiveIntensity: 0.8 });
    /* named for the tools (the gate's landmarks select by name); nothing in the engine reads them */
    for (var nm in T) T[nm].name = "hv_" + nm;
    return T;
  }

  /* ------------------------------------------------------------ geometry */
  /* Ear clipping for the side profiles (simple polygons, wheel-arch notches
     make them concave).  Returns CCW index triples in the (x, z) plane. */
  function earclip(pts) {
    var n = pts.length, idx = [], i, area = 0, guard = 0, tris = [];
    for (i = 0; i < n; i++) { idx.push(i); area += pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1]; }
    if (area < 0) idx.reverse();
    function cross(a, b, c) { return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); }
    while (idx.length > 3 && guard++ < 4000) {
      var found = false, m = idx.length;
      for (i = 0; i < m; i++) {
        var i0 = idx[(i + m - 1) % m], i1 = idx[i], i2 = idx[(i + 1) % m];
        var a = pts[i0], b = pts[i1], c = pts[i2];
        if (cross(a, b, c) <= 1e-12) continue;
        var ok = true;
        for (var k = 0; k < m; k++) {
          var q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          var p = pts[q];
          if (cross(a, b, p) > 1e-9 && cross(b, c, p) > 1e-9 && cross(c, a, p) > 1e-9) { ok = false; break; }
        }
        if (!ok) continue;
        tris.push([i0, i1, i2]); idx.splice(i, 1); found = true; break;
      }
      if (!found) break;
    }
    if (idx.length === 3) tris.push([idx[0], idx[1], idx[2]]);
    return tris;
  }

  /* A flat triangle with the given outward normal (winding follows it) */
  function addTri(S, a, b, c, n) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz < 1e-14) return;
    if (cx * n[0] + cy * n[1] + cz * n[2] < 0) { var t = b; b = c; c = t; }
    S.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    S.n.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
  }
  /* smooth triangle: winding follows the supplied vertex normals */
  function triN(S, a, b, c, na, nb, nc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-18) return;
    if (nx * (na[0] + nb[0] + nc[0]) + ny * (na[1] + nb[1] + nc[1]) + nz * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t;
    }
    S.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    S.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
  }
  function geoFrom(THREE, S) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(S.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(S.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(S.p.length / 3 * 2).fill(0), 2));
    return g;
  }

  /* Points of a wheel-arch circle from the sill on its left, over the top,
     down to the sill on its right; clipped where it would pass xmin */
  function arch(cx, cz, r, zs, xmin) {
    var a = Math.asin((zs - cz) / r), th0 = Math.PI - a, th1 = a, out = [], n = 10, i, th;
    if (cx + r * Math.cos(th0) < xmin) th0 = Math.acos((xmin - cx) / r);
    for (i = 0; i <= n; i++) {
      th = th0 + (th1 - th0) * i / n;
      out.push([cx + r * Math.cos(th), cz + r * Math.sin(th)]);
    }
    return out;
  }

  /* --------------------------------------------------------------- baker */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var THREE = this.T, m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  /* box from its corners */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.put(mat, new this.T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* the same box on both sides: y0..y1 given for the left, mirrored right */
  Baker.prototype.bbm = function (mat, x0, x1, y0, y1, z0, z1) {
    this.bb(mat, x0, x1, y0, y1, z0, z1);
    this.bb(mat, x0, x1, -y1, -y0, z0, z1);
  };
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 6);
    var m = new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    this.add(mat, g);
  };
  Baker.prototype.torus = function (mat, R, r, x, y, z, rs, ts) {
    this.put(mat, new this.T.TorusGeometry(R, r, rs || 5, ts || 20), x, y, z);
  };
  /* extrude an (x, z) polygon across y0..y1: flat shaded, outward normals */
  Baker.prototype.prism = function (mat, pts0, y0, y1) {
    var pts = [], i, n, S = { p: [], n: [] };
    for (i = 0; i < pts0.length; i++) {
      var q = pts0[i], l = pts[pts.length - 1];
      if (!l || Math.abs(q[0] - l[0]) + Math.abs(q[1] - l[1]) > 1e-6) pts.push(q);
    }
    n = pts.length;
    if (n > 1 && Math.abs(pts[0][0] - pts[n - 1][0]) + Math.abs(pts[0][1] - pts[n - 1][1]) < 1e-6) { pts.pop(); n--; }
    var tris = earclip(pts), area = 0;
    for (i = 0; i < tris.length; i++) {
      var t = tris[i], a = pts[t[0]], b = pts[t[1]], c = pts[t[2]];
      addTri(S, [a[0], y1, a[1]], [b[0], y1, b[1]], [c[0], y1, c[1]], [0, 1, 0]);
      addTri(S, [a[0], y0, a[1]], [b[0], y0, b[1]], [c[0], y0, c[1]], [0, -1, 0]);
    }
    for (i = 0; i < n; i++) area += pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1];
    var sg = area > 0 ? 1 : -1;
    for (i = 0; i < n; i++) {
      var p = pts[i], r = pts[(i + 1) % n];
      var dx = r[0] - p[0], dz = r[1] - p[1], L = Math.sqrt(dx * dx + dz * dz);
      if (L < 1e-9) continue;
      var nn = [sg * dz / L, 0, -sg * dx / L];
      addTri(S, [p[0], y0, p[1]], [r[0], y0, r[1]], [r[0], y1, r[1]], nn);
      addTri(S, [p[0], y0, p[1]], [r[0], y1, r[1]], [p[0], y1, p[1]], nn);
    }
    this.add(mat, geoFrom(this.T, S));
  };
  /* a thin plate lying along the segment a-b of the (x, z) plane, th thick
     towards "up" (hood, roof) or "fwd" (windshield), spanning y0..y1 */
  Baker.prototype.plate = function (mat, ax, az, bx, bz, th, y0, y1, dir) {
    var dx = bx - ax, dz = bz - az, L = Math.sqrt(dx * dx + dz * dz);
    var nx = dz / L, nz = -dx / L;
    if (dir === "fwd" ? nx < 0 : nz < 0) { nx = -nx; nz = -nz; }
    this.prism(mat, [[ax, az], [bx, bz], [bx + nx * th, bz + nz * th], [ax + nx * th, az + nz * th]], y0, y1);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var S = e.mat.userData && (e.mat.userData.worldUV || e.mat.userData.hvUV);
      if (S) worldUV(P, U, S, group.position);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };
  /* box projection by each triangle's own facing; sides take (along, height) */
  function worldUV(P, U, S, off) {
    /* off: the group's position, so a turret's parts (built about its own origin) are mapped where
       they stand on the truck and not into the mud band at the canvas's foot */
    var ox = off ? off.x : 0, oy = off ? off.y : 0, oz = off ? off.z : 0;
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3] + ox, y = P[o + k * 3 + 1] + oy, z = P[o + k * 3 + 2] + oz, u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = y / S + 0.5; }
        else if (nx >= ny) { u = y / S; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* A loft through convex rings of [x, y, z] (same count, all wound the same way), fan-capped
     at both ends; the faces are turned outward by the signed volume, as ru_kamaz.js does. */
  Baker.prototype.loft = function (mat, Rg) {
    var V = [], F = [], m = Rg.length, n = Rg[0].length, i, j, k, c, b0, f, vol = 0, S = { p: [], n: [] };
    function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(Rg[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (i = 0; i < 2; i++) {
      var ring = Rg[i ? m - 1 : 0], ctr = [0, 0, 0];
      for (j = 0; j < n; j++) { ctr[0] += ring[j][0] / n; ctr[1] += ring[j][1] / n; ctr[2] += ring[j][2] / n; }
      b0 = i ? (m - 1) * n : 0; V.push(ctr); c = V.length - 1;
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push(i ? [c, b0 + j, b0 + k] : [c, b0 + k, b0 + j]); }
    }
    for (i = 0; i < F.length; i++) { f = F[i]; var q = cr(V[f[1]], V[f[2]]); vol += V[f[0]][0] * q[0] + V[f[0]][1] * q[1] + V[f[0]][2] * q[2]; }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var a = V[f[0]], b = vol < 0 ? V[f[2]] : V[f[1]], cc = vol < 0 ? V[f[1]] : V[f[2]];
      var nn = cr([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [cc[0] - a[0], cc[1] - a[1], cc[2] - a[2]]);
      var L = Math.sqrt(nn[0] * nn[0] + nn[1] * nn[1] + nn[2] * nn[2]);
      if (L < 1e-12) continue;
      addTri(S, a, b, cc, [nn[0] / L, nn[1] / L, nn[2] / L]);
    }
    this.add(mat, geoFrom(this.T, S));
  };

  /* ------------------------------------------------------------ the tyre */
  /* 36 x 12.5R16.5 (37 in on the armoured family): a lathe about the local Y axle (bead,
     bulging sidewall, shoulder, flat crown) with twenty block lugs on the crown, so the tyre
     notches its own outline and a turning wheel shows.  On the outer face, the parts that turn
     with it: the eight wheel nuts and the hub cap over the geared hub [D1][P1]. */
  function tyreGeo(THREE, R, side) {
    var S = { p: [], n: [] }, seg = 20, h = TW / 2, rc = R - 0.026, i, j, k = R / 0.457;
    var prof = [[0.215, -0.095], [0.262, -0.146], [0.336, -h], [0.405 * k, -0.150], [0.438 * k, -0.126], [rc, -0.105],
                [rc, 0.105], [0.438 * k, 0.126], [0.405 * k, 0.150], [0.336, h], [0.262, 0.146], [0.215, 0.095]];
    for (i = 0; i < prof.length - 1; i++) {
      var r0 = prof[i][0], y0 = prof[i][1], r1 = prof[i + 1][0], y1 = prof[i + 1][1];
      var dr = r1 - r0, dy = y1 - y0, l = Math.sqrt(dr * dr + dy * dy), nr = dy / l, ny = -dr / l;
      for (j = 0; j < seg; j++) {
        var a0 = j / seg * Math.PI * 2, a1 = (j + 1) / seg * Math.PI * 2;
        var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
        var A = [r0 * c0, y0, r0 * s0], B = [r0 * c1, y0, r0 * s1];
        var Cc = [r1 * c1, y1, r1 * s1], D = [r1 * c0, y1, r1 * s0];
        var nA = [nr * c0, ny, nr * s0], nB = [nr * c1, ny, nr * s1];
        if (r0 > 1e-6) triN(S, A, B, Cc, nA, nB, nB);
        if (r1 > 1e-6) triN(S, A, Cc, D, nA, nB, nA);
      }
    }
    var parts = [geoFrom(THREE, S)], lug = 20, g, m;
    function put(geo, x, y, z, ry) {
      geo.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)), new THREE.Vector3(1, 1, 1)));
      parts.push(geo.index ? geo.toNonIndexed() : geo);
    }
    for (j = 0; j < lug; j++) {
      var a = (j + 0.5) / lug * Math.PI * 2;
      put(new THREE.BoxGeometry(0.034, 0.225, 0.062), Math.cos(a) * (rc + 0.010), 0, Math.sin(a) * (rc + 0.010), -a);
    }
    /* outer face (local +Y is outboard on the port wheels, -Y on the starboard ones) */
    var sy = side;
    for (j = 0; j < 8; j++) {
      var b = j / 8 * Math.PI * 2;
      put(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 6), Math.cos(b) * 0.135, sy * 0.112, Math.sin(b) * 0.135);
    }
    put(new THREE.CylinderGeometry(0.07, 0.085, 0.05, 10), 0, sy * 0.118, 0);
    /* DETAIL PASS 3: the two-piece rim's bolt ring that clamps the run-flat insert (twelve bolts on
       the outer rim half), the rim flange, the geared hub's cover bolts round the cap and the CTIS
       valve stem and its hose to the hub (nuts, flange and stem turn with the tyre) */
    for (j = 0; j < 12; j++) {
      var bb2 = (j + 0.5) / 12 * Math.PI * 2;
      put(new THREE.CylinderGeometry(0.011, 0.011, 0.024, 4), Math.cos(bb2) * 0.195, sy * 0.104, Math.sin(bb2) * 0.195);
    }
    g = new THREE.TorusGeometry(0.212, 0.009, 4, 24); g.rotateX(Math.PI / 2); g.translate(0, sy * 0.098, 0); parts.push(g.toNonIndexed());
    for (j = 0; j < 6; j++) {
      var bc = j / 6 * Math.PI * 2 + 0.26;
      put(new THREE.CylinderGeometry(0.009, 0.009, 0.02, 5), Math.cos(bc) * 0.092, sy * 0.142, Math.sin(bc) * 0.092);
    }
    put(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 5), 0.16, sy * 0.12, 0.02, Math.PI / 2);
    m = new THREE.CylinderGeometry(0.006, 0.006, 0.13, 4); m.rotateZ(Math.PI / 2); m.translate(0.095, sy * 0.135, 0.02); parts.push(m.toNonIndexed());
    var n = 0, o = 0, q;
    for (q = 0; q < parts.length; q++) n += parts[q].attributes.position.count;
    var P = new Float32Array(n * 3), N = new Float32Array(n * 3);
    for (q = 0; q < parts.length; q++) {
      P.set(parts[q].attributes.position.array, o * 3);
      N.set(parts[q].attributes.normal.array, o * 3);
      o += parts[q].attributes.position.count;
    }
    /* u round the tyre (four repeats), v from the axle (0) out to the crown (1) */
    var U = new Float32Array(n * 2);
    for (q = 0; q < n; q++) {
      var px = P[q * 3], pz = P[q * 3 + 2];
      U[q * 2] = (Math.atan2(pz, px) / (2 * Math.PI) + 0.5) * 4;
      U[q * 2 + 1] = Math.min(1, Math.sqrt(px * px + pz * pz) / R);
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
    return geo;
  }

  /* --------------------------------------------------- the M2 .50 cal */
  /* Browning M2HB, receiver centred on (x0, 0, z0), barrel along +X.  The
     real gun is 1.65 m overall: receiver and back plate 0.47, barrel 1.0
     as drawn (the 45 in barrel less what the sleeve covers).  Ammunition
     can on the left, as it is fed from the left. */
  function m2(K, T, x0, z0) {
    var d = T.dark;
    K.bb(d, x0 - 0.20, x0 + 0.20, -0.055, 0.055, z0 - 0.07, z0 + 0.075);      /* receiver */
    K.bb(d, x0 - 0.06, x0 + 0.14, -0.045, 0.045, z0 + 0.075, z0 + 0.105);     /* feed cover */
    K.bb(d, x0 - 0.27, x0 - 0.20, -0.05, 0.05, z0 - 0.05, z0 + 0.055);       /* back plate */
    K.bb(d, x0 - 0.31, x0 - 0.27, -0.10, 0.10, z0 - 0.06, z0 - 0.045);       /* spade grips */
    K.cyl(d, 0.027, 0.16, 8, x0 + 0.28, 0, z0 + 0.01, "x");                  /* barrel sleeve */
    K.cyl(d, 0.0155, 1.0, 8, x0 + 0.70, 0, z0 + 0.01, "x");                  /* barrel */
    K.cyl(d, 0.024, 0.10, 8, x0 + 1.17, 0, z0 + 0.01, "x");                  /* flash hider */
    K.bb(d, x0 - 0.10, x0 + 0.12, 0.075, 0.19, z0 - 0.19, z0 - 0.005);        /* ammunition can */
    K.bb(d, x0 - 0.02, x0 + 0.08, 0.055, 0.075, z0 - 0.03, z0 + 0.06);        /* feed throat */
  }

  /* the windshield: two panes either side of the centre post, in its frame */
  function windshield(K, T, x0, z0, x1, z1, hw, dark) {
    var yin = 0.03, yout = hw - 0.05;
    K.plate(T.glass, x0 + 0.006, z0 + 0.04, x1 + 0.006, z1 - 0.04, 0.016, yin, yout, "fwd");
    K.plate(T.glass, x0 + 0.006, z0 + 0.04, x1 + 0.006, z1 - 0.04, 0.016, -yout, -yin, "fwd");
    var f = dark ? T.dark : T.skin, rf = dark ? 0.040 : 0.024, rc = dark ? 0.030 : 0.016;
    /* (review 1: the armoured truck's black frame drawn heavier, so it reads at the game camera) */
    K.rod(f, rf, [x0, hw - 0.02, z0], [x1, hw - 0.02, z1], 6);
    K.rod(f, rf, [x0, -hw + 0.02, z0], [x1, -hw + 0.02, z1], 6);
    K.rod(f, rc, [x0, 0, z0], [x1, 0, z1], 6);
    K.rod(f, rf, [x1, -hw, z1], [x1, hw, z1], 6);
    K.rod(f, rf, [x0, -hw, z0], [x0, hw, z0], 6);
  }
  /* ------------------------------------------------------- shared chassis */
  /* belly pan (16 in ground clearance), axle beams, the differentials, the geared hub-reduction
     housings at each wheel, the shafts, the exhaust; the painted rims stand still, the nuts and
     hub caps turn with the tyre */
  function chassis(K, T, V) {
    var R = V.R, ax, s, i, ys = [XF, XR];
    K.bb(T.dark, XR - 0.35, XF + 0.35, -0.62, 0.62, 0.41, 0.52);
    for (i = 0; i < 2; i++) {
      ax = ys[i];
      K.cyl(T.dark, 0.045, 1.55, 8, ax, 0, R, "y");
      K.bb(T.dark, ax - 0.20, ax + 0.20, -0.22, 0.22, 0.42, 0.62);
      for (s = -1; s <= 1; s += 2) {
        K.bb(T.dark, ax - 0.13, ax + 0.13, s * 0.60, s * 0.74, R - 0.12, R + 0.16);
        K.cyl(T.skin, 0.222, 0.20, 12, ax, s * HALF_TRACK, R, "y");
        K.cyl(T.skin, 0.17, 0.012, 12, ax, s * (HALF_TRACK + 0.102), R, "y");
      }
    }
    K.rod(T.dark, 0.03, [XR, 0, 0.50], [XF, 0, 0.50], 6);
    K.rod(T.dark, 0.035, [XR - 0.1, -0.40, 0.46], [XR + 0.9, -0.40, 0.46], 6);
  }

  /* ------------------------------------------------------- the front clip */
  /* The one-piece tilting bonnet and fenders.  The top is lofted through the stations below:
     the bonnet line off [D1] (1.14 m at the nose, 1.34 at the cowl), the section off the front
     photographs [P1][P3] - full width, the outer top edges chamfered, the bonnet centre a little
     proud of the fender tops, the black vent at its rear.  Under it: the grille face with the
     two round headlamps either side of the vertical-slot grille, amber lamps outboard on the
     fender fronts, and the fender sides with the square-topped wheel opening and the trailing
     edge that sweeps down and back to the sill [D1][P2]. */
  var BON = [   /* back from the nose (m), bonnet centre z, fender top z */
    [0.00, 1.050, 1.020], [0.06, 1.110, 1.075], [0.45, 1.170, 1.135],
    [0.85, 1.250, 1.205], [1.25, 1.335, 1.280]
  ];
  var ZCLIP = 0.98;          /* underside of the clip over the tyres */
  function frontClip(K, T, V) {
    var nose = V.nose, hw = V.hwF, R = V.R, i, s, st, x, Rg = [];
    for (i = 0; i < BON.length; i++) {
      st = BON[i]; x = nose - st[0];
      Rg.push([[x, -hw, ZCLIP], [x, hw, ZCLIP], [x, hw, st[2] - 0.08], [x, hw - 0.08, st[2]], [x, 0.50, st[2]],
               [x, 0.42, st[1]], [x, -0.42, st[1]], [x, -0.50, st[2]], [x, -hw + 0.08, st[2]], [x, -hw, st[2] - 0.08]]);
    }
    K.loft(T.skin, Rg);
    var cowl = nose - 1.25;
    function zb(x) {   /* the bonnet centre's height at station x: piecewise along BON */
      var d = Math.max(0, Math.min(1.25, nose - x)), j;
      for (j = 0; j < BON.length - 1; j++) if (d <= BON[j + 1][0]) break;
      j = Math.min(j, BON.length - 2);
      var t = (d - BON[j][0]) / (BON[j + 1][0] - BON[j][0]);
      return BON[j][1] + (BON[j + 1][1] - BON[j][1]) * t + 0.004;
    }
    /* batch 2: the RAISED AIR INTAKE - a box standing about 6 cm proud of the bonnet's left front
       quarter, its top a black grille of cross slats.  [R2] (the M1097 Avenger, front-left) and [R3]
       (front) show it there, ahead of the bonnet's middle and left of the centre line; the old file's
       vent across the rear of the bonnet is not in either photograph and is gone. */
    var vx0 = nose - 0.78, vx1 = nose - 0.16, vy0 = 0.06, vy1 = 0.60;
    K.prism(T.skin, [[vx0, zb(vx0) - 0.05], [vx1, zb(vx1) - 0.05], [vx1, zb(vx1) + 0.045], [vx1 - 0.04, zb(vx1) + 0.06],
                     [vx0, zb(vx0) + 0.06]], vy0, vy1);
    K.plate(T.dark, vx1 - 0.05, zb(vx1 - 0.05) + 0.061, vx0 + 0.03, zb(vx0 + 0.03) + 0.061, 0.008, vy0 + 0.04, vy1 - 0.04, "up");
    for (i = 0; i < 9; i++) {
      x = vx0 + 0.07 + i * 0.058;
      K.bb(T.skin, x - 0.009, x + 0.009, vy0 + 0.04, vy1 - 0.04, zb(x) + 0.066, zb(x) + 0.078);
    }
    /* fender sides: ahead of the wheel a sliver down to the bumper, behind it the trailing
       edge to the sill; the opening between them is square-topped at the clip's underside */
    var d = 0.60, xa = Math.sqrt(d * d - (ZCLIP - R) * (ZCLIP - R));
    var fr = [[nose, ZCLIP], [XF + xa, ZCLIP]], rr = [[XF - xa, ZCLIP]];
    for (i = 1; i <= 4; i++) {
      var zz = ZCLIP - i * (ZCLIP - 0.62) / 4, dx = Math.sqrt(Math.max(0, d * d - (zz - R) * (zz - R)));
      if (XF + dx < nose) fr.push([XF + dx, zz]);
      rr.push([XF - dx, zz]);
    }
    fr.push([nose, Math.max(0.62, R + Math.sqrt(Math.max(0, d * d - (nose - XF) * (nose - XF))))]);
    rr.push([XF - d + 0.02, 0.52], [0.80, 0.45], [cowl - 0.02, 0.98]);
    for (s = -1; s <= 1; s += 2) {
      K.prism(T.skin, fr, s > 0 ? hw - 0.035 : -hw, s > 0 ? hw : -hw + 0.035);
      K.prism(T.skin, rr, s > 0 ? hw - 0.035 : -hw, s > 0 ? hw : -hw + 0.035);
      /* the fender's front face outboard of the headlamps, with the amber lamp */
      K.bb(T.skin, nose - 0.04, nose, s * 0.60, s * hw, fr[fr.length - 1][1], ZCLIP);
      K.bb(T.lampA, nose, nose + 0.012, s * (hw - 0.30), s * (hw - 0.16), 0.86, 0.94);
      /* black wheel-well liner, seen through the opening */
      K.bb(T.dark, XF - 0.62, nose - 0.002, s * 0.58, s * 0.72, 0.52, ZCLIP);
    }
    /* the radiator block between the wells and the grille face */
    K.bb(T.dark, cowl, nose - 0.02, -0.58, 0.58, 0.50, ZCLIP);
    K.bb(T.skin, nose - 0.02, nose, -0.60, 0.60, 0.62, ZCLIP + 0.02);
    /* the grille: nine slots between the bars [P1][P3] */
    K.bb(T.dark, nose, nose + 0.010, -0.37, 0.37, 0.66, 0.97);
    for (i = -4; i <= 4; i++) K.bb(T.skin, nose + 0.010, nose + 0.024, i * 0.082 - 0.018, i * 0.082 + 0.018, 0.68, 0.95);
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.105, 0.03, 16, nose + 0.005, s * 0.485, 0.84, "x");
      K.cyl(T.lamp, 0.085, 0.034, 16, nose + 0.012, s * 0.485, 0.84, "x");
    }
    /* bumper: a deep channel, its ends turned back, two tow shackles; the lifting eyes */
    K.bb(T.dark, nose - 0.04, V.bump, -(hw - 0.10), hw - 0.10, 0.50, 0.68);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, nose - 0.20, nose - 0.04, s * (hw - 0.22), s * (hw - 0.10), 0.52, 0.66);
      K.torus(T.dark, 0.045, 0.012, V.bump + 0.02, s * 0.62, 0.58, 4, 10);
    }
  }

  /* ------------------------------------------- the body sides: one profile */
  /* the whole side of the body as one extrusion: windshield, roof and slant-back (or the cab
     back and the bed) and the rear wheel opening cut through; door glass and seams on top */
  function rearArch(V, zs, tail) {
    var a = arch(XR, V.R, 0.60, zs, tail), out = [], i;
    for (i = a.length - 1; i >= 0; i--) out.push(a[i]);
    return out;   /* front to back */
  }
  function sideProfile(V, top) {
    var pts = [[V.nose - 1.27, 0.98]], a = rearArch(V, 0.52, V.tail), i;
    for (i = 0; i < top.length; i++) pts.push(top[i]);
    pts.push([V.tail, 0.62]);
    for (i = a.length - 1; i >= 0; i--) pts.push(a[i]);
    pts.push([0.82, 0.45]);
    return pts;
  }
  function sideSkin(K, T, V, pts) {
    K.prism(T.skin, pts, -V.hwS, V.hwS);
    /* the rear wheel houses, black, closing the openings the profile cuts through */
    K.bb(T.dark, XR - 0.62, XR + 0.62, -0.72, 0.72, 0.50, 1.12);
  }
  /* door: seams, the glass (an armour window on the M1151), the handle, the pressed X of the
     first-generation door [P1][P2] */
  function door(K, T, V, x0, x1, zw0, zw1, xw0, xw1, zTop, pressX) {
    var y = V.hwS, s;
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * y, y1 = s * (y + 0.010);
      K.bb(T.dark, x0 - 0.011, x0 + 0.011, y0, y1, 0.60, zTop);
      K.bb(T.dark, x1 - 0.011, x1 + 0.011, y0, y1, 0.60, zTop);
      K.bb(T.dark, x1, x0, y0, y1, 0.60, 0.618);
      K.bb(T.glass, xw1, xw0, y0, s * (y + 0.012), zw0, zw1);
      /* batch 2: the window's frame standing proud of the door round the glass (wide on the armoured
         doors [L1], thin on the first-generation ones), so the window reads as a framed opening */
      var fw = pressX ? 0.03 : 0.06, fy = s * (y + (pressX ? 0.02 : 0.045)), gk = pressX ? 0 : 0.018;
      K.bb(T.skin, xw1 - gk - fw, xw0 + gk + fw, y0, fy, zw1 + gk, zw1 + gk + fw);
      K.bb(T.skin, xw1 - gk - fw, xw0 + gk + fw, y0, fy, zw0 - gk - fw, zw0 - gk);
      K.bb(T.skin, xw0 + gk, xw0 + gk + fw, y0, fy, zw0 - gk, zw1 + gk);
      K.bb(T.skin, xw1 - gk - fw, xw1 - gk, y0, fy, zw0 - gk, zw1 + gk);
      if (!pressX) {
        /* review 1: the armoured window's black rubber gasket between the glass and the raised frame,
           the frame's bolt heads, and the shadow line under and behind the frame [L1] */
        var gy = s * (y + 0.016);
        K.bb(T.dark, xw1 - gk, xw0 + gk, y0, gy, zw1, zw1 + gk);
        K.bb(T.dark, xw1 - gk, xw0 + gk, y0, gy, zw0 - gk, zw0);
        K.bb(T.dark, xw0, xw0 + gk, y0, gy, zw0, zw1);
        K.bb(T.dark, xw1 - gk, xw1, y0, gy, zw0, zw1);
        var ex0 = xw1 - gk - fw, ex1 = xw0 + gk + fw, ez0 = zw0 - gk - fw, ez1 = zw1 + gk + fw, sy2 = s * (y + 0.012);
        K.bb(T.dark, ex0 - 0.012, ex1 + 0.012, y0, sy2, ez0 - 0.014, ez0);
        K.bb(T.dark, ex0 - 0.014, ex0, y0, sy2, ez0, ez1);
        for (var bi = 0; bi < 5; bi++) {
          var bx = ex0 + 0.03 + (ex1 - ex0 - 0.06) * bi / 4, by = s * (y + 0.045);
          K.bb(T.dark, bx - 0.012, bx + 0.012, by, s * (y + 0.053), ez1 - 0.042, ez1 - 0.018);
          K.bb(T.dark, bx - 0.012, bx + 0.012, by, s * (y + 0.053), ez0 + 0.018, ez0 + 0.042);
        }
      }
      K.bb(T.dark, x1 + 0.10, x1 + 0.22, y0, s * (y + 0.025), zw0 - 0.17, zw0 - 0.14);
      if (pressX) {
        K.rod(T.dark, 0.009, [x0 - 0.07, s * (y + 0.006), 0.68], [x1 + 0.07, s * (y + 0.006), zw0 - 0.08], 4);
        K.rod(T.dark, 0.009, [x1 + 0.07, s * (y + 0.006), 0.68], [x0 - 0.07, s * (y + 0.006), zw0 - 0.08], 4);
      }
    }
  }
  function windshieldAt(K, T, V, xf, zf, xh, zh, dark) {
    windshield(K, T, xf + 0.01, zf, xh + 0.01, zh, V.hwS - 0.06, dark);
  }
  function mirrors(K, T, V, x, z) {
    for (var s = -1; s <= 1; s += 2) {
      K.rod(T.dark, 0.013, [x, s * V.hwS, z], [x, s * (V.hwS + 0.12), z + 0.12], 5);
      K.bb(T.dark, x - 0.03, x + 0.03, s * (V.hwS + 0.07), s * (V.hwS + 0.19), z + 0.04, z + 0.32);
    }
  }
  function rearEnd(K, T, V) {
    var s, tail = V.tail;
    K.bb(T.dark, tail - 0.10, tail + 0.04, -(V.hwS - 0.05), V.hwS - 0.05, 0.50, 0.66);
    K.bb(T.dark, V.pint, tail - 0.10, -0.06, 0.06, 0.53, 0.62);
    K.torus(T.dark, 0.05, 0.014, V.pint + 0.03, 0, 0.58, 4, 10);
    for (s = -1; s <= 1; s += 2) K.bb(T.lampR, tail - 0.012, tail, s * (V.hwS - 0.20), s * (V.hwS - 0.06), 0.74, 0.90);
  }

  /* --------------------------------------------- the M1025 slant-back */
  /* [P2][P4]: the raked windshield in its frame, a flat roof to behind the rear doors, the
     slant-back down to the tailgate; four doors with the pressed X; the roof ring and hatch */
  var RING_SLANT = -0.60;
  function bodySlant(K, T, V) {
    var zr = V.roof;
    frontClip(K, T, V);
    var top = [[V.nose - 1.25, 1.30], [0.68, 1.79], [0.62, zr], [-1.08, zr], [-1.16, zr - 0.04], [V.tail + 0.04, 1.22], [V.tail, 1.18]];
    sideSkin(K, T, V, sideProfile(V, top));
    windshieldAt(K, T, V, V.nose - 1.25, 1.31, 0.68, 1.79, false);
    door(K, T, V, 0.86, -0.06, 1.36, 1.72, 0.72, 0.06, 1.80, true);
    door(K, T, V, -0.06, -0.92, 1.36, 1.72, -0.16, -0.84, 1.80, true);
    mirrors(K, T, V, 0.84, 1.36);
    rearEnd(K, T, V);
    /* the tailgate's two hinges and the rear lid's seam */
    K.bb(T.dark, V.tail - 0.012, V.tail, -0.80, 0.80, 1.10, 1.12);
    /* team panel on the roof's front half */
    K.bb(T.team, 0.05, 0.55, -0.45, 0.45, zr, zr + 0.013);
    /* roof ring: the hoop on its posts around the hatch */
    K.cyl(T.dark, 0.40, 0.004, 14, RING_SLANT, 0, zr + 0.002, "z");
    K.torus(T.dark, 0.45, 0.02, RING_SLANT, 0, zr + 0.16, 5, 20);
    for (var i = 0; i < 4; i++) {
      var a = i * Math.PI / 2 + Math.PI / 4;
      K.rod(T.dark, 0.016, [RING_SLANT + 0.45 * Math.cos(a), 0.45 * Math.sin(a), zr], [RING_SLANT + 0.45 * Math.cos(a), 0.45 * Math.sin(a), zr + 0.16], 5);
    }
    /* the radio whip on its mount at the right rear [P2][P4] */
    K.bb(T.dark, -1.30, -1.14, -(V.hwS - 0.18), -(V.hwS - 0.02), 1.42, 1.52);
    K.rod(T.dark, 0.007, [-1.22, -(V.hwS - 0.10), 1.52], [-1.30, -(V.hwS - 0.10), 3.00], 4);
  }

  /* ---------------------------------------------- the M1151 armoured body */
  /* [D1][P3][P6]: the near-upright armoured windshield, thick flat doors with small armour
     windows, the slant-back with the louvred panel on its side, the air intake stack at the
     right of the cowl, the turret ring over the rear doors */
  var RING_ARM = -0.35;
  /* batch 2, off the M1167 broadside [L1] (140.6 px a metre on the 3.30 m wheelbase): the roof ends at
     x -1.12 and the slant meets the tail at z 1.40; doors 0.70 / -0.20 / -1.12; door glass 1.25-1.50; the
     roof at 1.78 (the review: [L1] reads 1.77, 1.30 m above the hub, which has no ground doubt) */
  var ARM_RE = -1.12, ARM_TT = 1.40, ARM_D = [[0.70, -0.20], [-0.20, -1.12]];
  function bodyArm(K, T, V) {
    var zr = V.roof, isN = V.turret === "ogpk", i, s;
    frontClip(K, T, V);
    var top = [[V.nose - 1.25, 1.33], [0.76, zr - 0.04], [0.72, zr], [ARM_RE + 0.05, zr], [ARM_RE, zr - 0.04], [V.tail + 0.05, ARM_TT], [V.tail, ARM_TT - 0.04]];
    sideSkin(K, T, V, sideProfile(V, top));
    windshieldAt(K, T, V, V.nose - 1.25, 1.36, 0.76, zr - 0.05, true);
    door(K, T, V, ARM_D[0][0], ARM_D[0][1], 1.25, 1.50, 0.56, 0.05, zr - 0.02, false);
    door(K, T, V, ARM_D[1][0], ARM_D[1][1], 1.25, 1.50, -0.41, -1.00, zr - 0.02, false);
    mirrors(K, T, V, 0.80, 1.40);
    rearEnd(K, T, V);
    for (s = -1; s <= 1; s += 2) {
      /* the louvred panel on the rear quarter: [L1] has it at x -2.26..-1.42, z 1.02..1.17 */
      K.bb(T.dark, -2.26, -1.42, s * V.hwS, s * (V.hwS + 0.008), 1.03, 1.19);
      for (i = 0; i < 8; i++) K.bb(T.dark, -2.22 + i * 0.105, -2.19 + i * 0.105, s * V.hwS, s * (V.hwS + 0.02), 1.04, 1.18);
      /* review 1: its raised frame, so the dark panel has a hard lit edge round it */
      K.bb(T.skin, -2.30, -1.38, s * V.hwS, s * (V.hwS + 0.03), 1.19, 1.23);
      K.bb(T.skin, -2.30, -1.38, s * V.hwS, s * (V.hwS + 0.03), 0.99, 1.03);
      K.bb(T.skin, -2.30, -2.26, s * V.hwS, s * (V.hwS + 0.03), 1.03, 1.19);
      K.bb(T.skin, -1.42, -1.38, s * V.hwS, s * (V.hwS + 0.03), 1.03, 1.19);
      /* review 1, off [L1]: the bolted armour plate on the body side behind the front wheel (x 0.73..1.19,
         z 0.40..0.94, its top edge raked down to the arch) standing 2 cm proud with a black gap along
         its top, and each door's black D-ring pull low on its rear edge */
      var ap = [[0.73, 0.42], [1.06, 0.42], [1.19, 0.62], [1.19, 0.86], [1.08, 0.94], [0.73, 0.94]];
      K.prism(T.skin, ap, s > 0 ? V.hwS : -(V.hwS + 0.022), s > 0 ? V.hwS + 0.022 : -V.hwS);
      K.bb(T.dark, 0.73, 1.08, s * V.hwS, s * (V.hwS + 0.012), 0.94, 0.958);
      K.rod(T.dark, 0.009, [1.08, s * (V.hwS + 0.012), 0.95], [1.20, s * (V.hwS + 0.012), 0.87], 4);
      for (i = 0; i < 4; i++) K.bb(T.dark, 0.78 + i * 0.09 - 0.012, 0.78 + i * 0.09 + 0.012, s * (V.hwS + 0.022), s * (V.hwS + 0.03), 0.88, 0.905);
      for (i = 0; i < 2; i++) {
        var dx = ARM_D[i][1] + 0.18;
        K.put(T.dark, new K.T.TorusGeometry(0.045, 0.012, 4, 10), dx, s * (V.hwS + 0.016), 0.72, Math.PI / 2, 0, 0);
        K.bb(T.dark, dx - 0.03, dx + 0.03, s * V.hwS, s * (V.hwS + 0.02), 0.75, 0.79);
      }
      /* the door hinges, outside on the armoured doors */
      K.bb(T.dark, ARM_D[0][0] - 0.04, ARM_D[0][0] + 0.02, s * V.hwS, s * (V.hwS + 0.03), 1.05, 1.12);
      K.bb(T.dark, ARM_D[1][0] - 0.04, ARM_D[1][0] + 0.02, s * V.hwS, s * (V.hwS + 0.03), 1.05, 1.12);
    }
    /* the intake stack at the right of the cowl [D1] */
    /* [L1]: from the fender top (z 1.28) to its cap just above the roof (z 1.80), x 0.80..0.97 */
    K.cyl(T.skin, 0.065, 0.48, 10, 0.88, -(V.hwS - 0.10), 1.52, "z");
    K.cyl(T.dark, 0.08, 0.06, 10, 0.88, -(V.hwS - 0.10), 1.77, "z");
    K.cyl(T.dark, 0.072, 0.05, 10, 0.88, -(V.hwS - 0.10), 1.33, "z");
    K.bb(T.team, 0.10, 0.62, -0.45, 0.45, zr, zr + 0.013);
    /* the turret ring around the hatch */
    K.cyl(T.dark, 0.48, 0.03, 18, RING_ARM, 0, zr + 0.015, "z");
    /* radio whip at the right rear; the present-day truck carries a second one at the left */
    K.bb(T.dark, -1.18, -1.02, -(V.hwS - 0.18), -(V.hwS - 0.02), zr - 0.02, zr + 0.06);
    K.rod(T.dark, 0.007, [-1.10, -(V.hwS - 0.10), zr + 0.06], [-1.18, -(V.hwS - 0.10), 3.30], 4);
    if (isN) {
      K.bb(T.dark, -1.18, -1.02, V.hwS - 0.18, V.hwS - 0.02, zr - 0.02, zr + 0.06);
      K.rod(T.dark, 0.007, [-1.10, V.hwS - 0.10, zr + 0.06], [-1.16, V.hwS - 0.10, 3.00], 4);
    }
  }

  /* ------------------------------------------------ the two-door hard cab */
  /* the M1097 and the shelter carrier: the cab to behind the front doors, then the bed walls */
  var CAB_BACK = -0.30;
  function bodyCab(K, T, V) {
    var zr = V.roof;
    frontClip(K, T, V);
    var top = [[V.nose - 1.25, 1.30], [0.68, 1.79], [0.62, zr], [CAB_BACK, zr], [CAB_BACK, 1.12], [V.tail, 1.12]];
    sideSkin(K, T, V, sideProfile(V, top));
    windshieldAt(K, T, V, V.nose - 1.25, 1.31, 0.68, 1.79, false);
    door(K, T, V, 0.86, -0.22, 1.36, 1.72, 0.72, -0.10, 1.80, true);
    mirrors(K, T, V, 0.84, 1.36);
    rearEnd(K, T, V);
    /* the cab's back window */
    K.bb(T.glass, CAB_BACK - 0.012, CAB_BACK, -0.60, 0.60, 1.42, 1.70);
    K.bb(T.team, 0.00, 0.50, -0.45, 0.45, zr, zr + 0.013);
  }

  /* ------------------------------------------------- the M1097 Avenger */
  var AV_X = -1.25, AV_Z = 1.12;        /* slew ring centre on the bed */
  function bodyAvenger(K, T, V) {
    bodyCab(K, T, V);
    K.cyl(T.dark, 0.60, 0.04, 16, AV_X, 0, 1.12, "z");
    /* the gunner's step and the rear-quarter grab handles [P5] */
    K.bb(T.dark, V.tail - 0.02, V.tail + 0.10, -0.40, 0.40, 0.70, 0.74);
  }

  /* ----------------------------------------------- weapon stations */
  function turretRing(THREE, T, g, roof) {
    /* M1025: the gun rides the ring on a swinging arm; it trains about the
       ring's centre, so the arm sweeps the hoop */
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(RING_SLANT, 0, roof);
    K.cyl(T.dark, 0.05, 0.20, 8, 0, 0, 0.10, "z");
    K.bb(T.dark, -0.05, 0.45, -0.035, 0.035, 0.17, 0.215);
    K.cyl(T.dark, 0.04, 0.34, 8, 0.40, 0, 0.34, "z");
    K.bb(T.dark, 0.30, 0.50, -0.07, 0.07, 0.47, 0.55);
    m2(K, T, 0.38, 0.62);
    /* DETAIL PASS 3: the cradle's pintle and elevation lock, the belt, the sights; the ring's
       bolts and its traverse lock */
    m2Detail(K, T, 0.38, 0.62);
    K.cyl(T.dark, 0.03, 0.06, 8, 0.40, 0, 0.53, "z");
    K.rod(T.dark, 0.01, [0.40, 0.05, 0.50], [0.30, 0.10, 0.45], 4);
    ringDetail(K, T, 0.45, 0.0, 12);
    K.flush(tg);
    g.add(tg);
  }
  function turretGpk(THREE, T, g, roof) {
    /* the 2005 gunner's shield: a flat front plate with a glass slit either
       side of the gun, two side plates, open behind and above */
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(RING_ARM, 0, roof);
    K.bb(T.skin, 0.40, 0.46, -0.56, 0.56, 0.04, 0.78);
    K.bbm(T.skin, -0.02, 0.46, 0.53, 0.59, 0.04, 0.78);   /* short side wings [P3][P6] */
    K.bbm(T.glass, 0.46, 0.50, 0.08, 0.46, 0.46, 0.68);     /* the glass blocks: thick, standing proud */
    K.bb(T.skin, -0.36, 0.40, -0.56, 0.56, 0.04, 0.10);
    K.cyl(T.dark, 0.04, 0.34, 8, 0.10, 0, 0.22, "z");
    K.bb(T.dark, 0.0, 0.22, -0.07, 0.07, 0.38, 0.45);
    m2(K, T, 0.22, 0.56);
    /* DETAIL PASS 3: the ring's bolts, traverse lock and handle; the shield's bolt rows and the
       frames of its glass blocks, the gun's shield plate, the belt and sights, a brass bag */
    m2Detail(K, T, 0.22, 0.56);
    ringDetail(K, T, 0.45, 0.04, 16);
    for (var bi = 0; bi < 9; bi++) {
      var by = -0.50 + bi * 0.125;
      K.bb(T.dark, 0.455, 0.47, by - 0.012, by + 0.012, 0.74, 0.76);
      K.bb(T.dark, 0.455, 0.47, by - 0.012, by + 0.012, 0.08, 0.10);
    }
    K.bbm(T.dark, 0.455, 0.515, 0.045, 0.495, 0.425, 0.46);   /* review 1: their black frames, wider */
    K.bbm(T.dark, 0.455, 0.515, 0.045, 0.495, 0.68, 0.715);
    K.bbm(T.dark, 0.455, 0.515, 0.045, 0.08, 0.46, 0.68);
    K.bbm(T.dark, 0.455, 0.515, 0.46, 0.495, 0.46, 0.68);
    K.bb(T.skin, 0.40, 0.55, -0.16, 0.16, 0.44, 0.47);
    K.bb(T.dark, 0.10, 0.26, -0.20, -0.08, 0.40, 0.50);
    K.flush(tg);
    g.add(tg);
  }
  function turretOgpk(THREE, T, g, roof) {
    /* the enclosed box turret: armoured lower walls, glass bands in four
       corner posts, a roof over the front half, the gun out of the front */
    var tg = new THREE.Group(), K = new Baker(THREE), s, sx;
    tg.name = "turret";
    tg.position.set(RING_ARM, 0, roof);
    K.bb(T.skin, -0.50, 0.50, -0.60, 0.60, 0.04, 0.28);
    for (sx = -1; sx <= 1; sx += 2) for (s = -1; s <= 1; s += 2)
      K.bb(T.skin, sx * 0.50 - 0.04, sx * 0.50 + 0.04, s * 0.60 - 0.04, s * 0.60 + 0.04, 0.28, 0.66);
    K.bb(T.skin, -0.04, 0.54, -0.64, 0.64, 0.66, 0.72);
    K.bbm(T.glass, 0.505, 0.512, 0.07, 0.52, 0.32, 0.62);
    K.bbm(T.glass, -0.42, 0.42, 0.605, 0.612, 0.32, 0.62);
    K.bb(T.glass, -0.505, -0.498, -0.52, 0.52, 0.32, 0.62);
    /* batch 2: the rear half is open over the gunner (the old file closed it): the dark ring and
       hatch opening show through it from above, and the rim of the walls reads as a box */
    K.bb(T.skin, -0.54, 0.54, -0.64, -0.60, 0.64, 0.68);
    K.bb(T.skin, -0.54, 0.54, 0.60, 0.64, 0.64, 0.68);
    K.bb(T.skin, -0.54, -0.46, -0.64, 0.64, 0.64, 0.68);
    K.bb(T.dark, -0.46, -0.04, -0.56, 0.56, 0.28, 0.29);
    K.bb(T.dark, 0.44, 0.56, -0.12, 0.12, 0.28, 0.54);
    m2(K, T, 0.60, 0.40);
    /* DETAIL PASS 3: the ring's bolts and traverse handle, the corner posts' bolts, the roof's
       grab handles and its hatch hinge, the glass blocks' frames, the belt and sights */
    m2Detail(K, T, 0.60, 0.40);
    ringDetail(K, T, 0.46, 0.04, 16);
    for (sx = -1; sx <= 1; sx += 2) for (s = -1; s <= 1; s += 2) for (var bz = 0; bz < 3; bz++)
      K.bb(T.dark, sx * 0.54 - 0.012, sx * 0.54 + 0.012, s * 0.64 - 0.012, s * 0.64 + 0.012, 0.34 + bz * 0.12, 0.36 + bz * 0.12);
    for (s = -1; s <= 1; s += 2) K.rod(T.dark, 0.011, [0.10, s * 0.30, 0.72], [0.40, s * 0.30, 0.72], 4);
    K.cyl(T.dark, 0.018, 1.10, 8, -0.04, 0, 0.72, "y");
    K.bbm(T.dark, 0.508, 0.518, 0.06, 0.53, 0.31, 0.33);
    K.bbm(T.dark, 0.508, 0.518, 0.06, 0.53, 0.61, 0.63);
    K.bbm(T.dark, -0.43, 0.43, 0.61, 0.62, 0.31, 0.33);
    K.bbm(T.dark, -0.43, 0.43, 0.61, 0.62, 0.61, 0.63);
    K.flush(tg);
    g.add(tg);
  }

  /* The Avenger's gun: the FN M3P, the electrically fired .50 (the aircraft
     Browning M3): receiver on (x0, y0, z0), barrel along +X.  About 1.5 m
     overall with the 0.91 m barrel; no ammunition can is drawn, no photograph
     shows it. */
  function m3p(K, T, x0, y0, z0) {
    var d = T.dark;
    K.bb(d, x0 - 0.24, x0 + 0.24, y0 - 0.055, y0 + 0.055, z0 - 0.07, z0 + 0.075);   /* receiver */
    K.bb(d, x0 - 0.30, x0 - 0.24, y0 - 0.05, y0 + 0.05, z0 - 0.05, z0 + 0.05);      /* back plate */
    K.cyl(d, 0.0155, 0.91, 8, x0 + 0.695, y0, z0 + 0.01, "x");                      /* barrel */
    K.cyl(d, 0.022, 0.09, 8, x0 + 1.20, y0, z0 + 0.01, "x");                        /* flash hider */
    K.bb(d, x0 - 0.05, x0 + 0.15, y0 + 0.055, y0 + 0.155, z0 - 0.05, z0 + 0.05);    /* bracket to the housing */
  }
  function turretAvenger(THREE, T, g) {
    /* local origin: the ring centre on the bed; gun and pods point along +X.
       The housing is a rivetted box with a raked glass front, the pods stand on
       its sides, the FLIR is on the left, the gun low on the right. */
    var tg = new THREE.Group(), K = new Baker(THREE), s, i, j;
    tg.name = "turret";
    tg.position.set(AV_X, 0, AV_Z);
    K.prism(T.skin, [[-0.62, 0.0], [0.58, 0.0], [0.58, 0.35], [0.32, 1.30], [-0.62, 1.30]], -0.55, 0.55);
    K.bb(T.skin, -0.66, 0.40, -0.60, 0.60, 1.30, 1.35);                              /* roof */
    K.plate(T.glass, 0.584, 0.35, 0.324, 1.30, 0.016, -0.44, 0.44, "fwd");          /* the glass front */
    /* batch 2: the canopy's black frame and centre bar, the housing's corner seams, its rear
       access door outline and the roof's lip, so the housing reads as a cab and not a block */
    K.rod(T.dark, 0.022, [0.59, 0.45, 0.35], [0.33, 0.45, 1.30], 6);
    K.rod(T.dark, 0.022, [0.59, -0.45, 0.35], [0.33, -0.45, 1.30], 6);
    K.rod(T.dark, 0.016, [0.60, 0, 0.35], [0.34, 0, 1.30], 6);
    K.rod(T.dark, 0.022, [0.59, -0.46, 0.35], [0.59, 0.46, 0.35], 6);
    K.rod(T.dark, 0.022, [0.33, -0.46, 1.30], [0.33, 0.46, 1.30], 6);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, -0.635, -0.615, s * 0.53, s * 0.56, 0.02, 1.30);
      K.bb(T.dark, -0.62, 0.40, s * 0.55, s * 0.56, 0.60, 0.62);
    }
    K.bb(T.dark, -0.632, -0.62, -0.30, 0.30, 0.10, 0.12);
    K.bb(T.dark, -0.632, -0.62, -0.30, 0.30, 1.04, 1.06);
    K.bb(T.dark, -0.632, -0.62, -0.31, -0.29, 0.10, 1.06);
    K.bb(T.dark, -0.632, -0.62, 0.29, 0.31, 0.10, 1.06);
    K.bb(T.dark, -0.66, -0.63, 0.18, 0.24, 0.55, 0.60);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -0.45, 1.12, s * 0.57, s * 0.97, 1.06, 1.48);                     /* the pod: 1.6 x 0.40 x 0.42 */
      /* batch 2: the pod reads as a launcher - a black end frame with the four tube ends (2 x 2) in
         it, their caps a lighter grey; the black rear end, two black clamp bands round the pod,
         and the elevation trunnion between the pod and the housing [P5][P7] */
      K.bb(T.dark, 1.12, 1.15, s * 0.565, s * 0.975, 1.055, 1.485);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        K.cyl(T.dark, 0.085, 0.03, 12, 1.165, s * 0.77 + (i - 0.5) * 0.19, 1.27 + (j - 0.5) * 0.19, "x");
        K.cyl(T.skin, 0.062, 0.012, 12, 1.183, s * 0.77 + (i - 0.5) * 0.19, 1.27 + (j - 0.5) * 0.19, "x");
      }
      K.bb(T.dark, -0.48, -0.45, s * 0.565, s * 0.975, 1.055, 1.485);
      K.bb(T.dark, 0.05, 0.11, s * 0.565, s * 0.977, 1.05, 1.49);
      K.bb(T.dark, 0.72, 0.78, s * 0.565, s * 0.977, 1.05, 1.49);
      K.cyl(T.dark, 0.10, 0.06, 12, 0.30, s * 0.565, 1.27, "y");
      /* the pod's stiffening ribs along its top and outer side, the carry handles on top */
      K.bb(T.dark, -0.45, 1.12, s * 0.66, s * 0.68, 1.48, 1.492);
      K.bb(T.dark, -0.45, 1.12, s * 0.86, s * 0.88, 1.48, 1.492);
      K.bb(T.dark, -0.45, 1.12, s * 0.97, s * 0.982, 1.20, 1.22);
      K.bb(T.dark, -0.45, 1.12, s * 0.97, s * 0.982, 1.34, 1.36);
      K.rod(T.dark, 0.012, [0.30, s * 0.70, 1.48], [0.30, s * 0.70, 1.53], 5);
      K.rod(T.dark, 0.012, [0.30, s * 0.84, 1.48], [0.30, s * 0.84, 1.53], 5);
      K.rod(T.dark, 0.012, [0.30, s * 0.70, 1.53], [0.30, s * 0.84, 1.53], 5);
      K.bb(T.dark, -0.56, -0.44, s * 0.40 - 0.06, s * 0.40 + 0.06, 1.35, 1.41);     /* whip base */
      K.rod(T.dark, 0.008, [-0.50, s * 0.40, 1.41], [-0.50, s * 0.40, 2.65], 4);    /* whip */
    }
    K.bb(T.dark, 0.18, 0.50, 0.55, 0.78, 0.46, 0.80);                                /* FLIR / laser box, left */
    K.cyl(T.glass, 0.07, 0.03, 12, 0.515, 0.665, 0.63, "x");                         /* its window */
    m3p(K, T, 0.12, -0.70, 0.84);                                                    /* the .50, right, under the pod */
    K.flush(tg);
    g.add(tg);
  }

  /* --------------------------------------------- the TRAFFIC JAM carrier */
  /* GlobalSecurity [G]: the AN/TLQ-17A(V)3 housed its electronics in an S-250 shelter, first on
     the CUCV and from FY90-92 on the HMMWV; its photograph [G1] shows the antenna - a
     log-periodic array of about fourteen VERTICAL elements on a horizontal boom, the longest at
     one end, on a single mast.  The shelter on the bed and the array on its mast are drawn; where
     the mast stands on the vehicle is not shown in any source found, so it stands on the shelter
     roof (the trained node: the array turns to its target). */
  var JAM_X = -1.30, JAM_Z = 2.65;
  function bodyJam(K, T, V) {
    bodyCab(K, T, V);
    /* the S-250-type shelter: on the bed from the cab back to the tail, 2.0 m wide; skid rails,
       the door on the back with its hinges and handle, the lifting eyes at the roof corners */
    var x0 = CAB_BACK - 0.04, x1 = V.tail, s, i;
    K.bb(T.skin, x1, x0, -1.00, 1.00, 1.12, 2.65);
    K.bb(T.dark, x1, x0, -0.95, -0.85, 1.06, 1.12);
    K.bb(T.dark, x1, x0, 0.85, 0.95, 1.06, 1.12);
    K.bb(T.dark, x1 - 0.012, x1, -0.40, 0.40, 1.22, 2.50);
    K.bb(T.skin, x1 - 0.020, x1 - 0.012, -0.37, 0.37, 1.25, 2.47);
    K.bb(T.dark, x1 - 0.04, x1 - 0.02, 0.20, 0.30, 1.80, 1.84);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) K.torus(T.dark, 0.04, 0.012, i ? x1 + 0.06 : x0 - 0.06, s * 0.94, 2.658, 4, 10);
      /* the corner posts the shelter's sides are framed by */
      K.bb(T.skin, x0 - 0.03, x0 + 0.005, s * 0.97, s * 1.005, 1.12, 2.65);
      K.bb(T.skin, x1 - 0.005, x1 + 0.03, s * 0.97, s * 1.005, 1.12, 2.65);
    }
    K.bb(T.team, -0.95, -0.42, -0.60, 0.60, 2.65, 2.663);
    K.cyl(T.dark, 0.10, 0.04, 10, JAM_X, 0, 2.67, "z");
    /* batch 2: the S-250's own shape, so it reads as a shelter and not a block: the vertical panel
       joints of its sides (about 0.45 m apart) and the mid-height extrusion, the environmental
       control unit standing on the front wall's left half with its black louvred face, the signal
       entry panel low on the right side, the rear door's black gap and hinges, the roof's edge
       extrusions.  Sizes and places by the S-250's usual layout, NOT CONFIRMED on this fit. */
    for (s = -1; s <= 1; s += 2) {
      for (i = 1; i < 5; i++) { var xj = x0 + (x1 - x0) * i / 5; K.bb(T.dark, xj - 0.012, xj + 0.012, s * 1.0, s * 1.008, 1.14, 2.63); }
      K.bb(T.skin, x1 + 0.02, x0 - 0.02, s * 1.0, s * 1.018, 1.86, 1.90);
      K.bb(T.skin, x1, x0, s * 0.96, s * 1.02, 2.63, 2.67);
    }
    K.bb(T.skin, x0 - 0.02, x0 + 0.02, -1.0, 1.0, 2.63, 2.67);
    K.bb(T.skin, x1 - 0.02, x1 + 0.02, -1.0, 1.0, 2.63, 2.67);
    /* the ECU on the front wall, above the cab roof */
    K.bb(T.skin, x0, x0 + 0.34, 0.08, 0.86, 1.90, 2.48);
    K.bb(T.dark, x0 + 0.34, x0 + 0.35, 0.14, 0.80, 1.96, 2.42);
    for (i = 0; i < 8; i++) K.bb(T.skin, x0 + 0.345, x0 + 0.36, 0.14, 0.80, 1.99 + i * 0.054, 2.005 + i * 0.054);
    K.bb(T.dark, x0 + 0.04, x0 + 0.30, 0.20, 0.74, 2.48, 2.50);
    /* the signal entry panel and its cable glands */
    K.bb(T.dark, -1.30, -0.90, -1.02, -1.0, 1.30, 1.62);
    for (i = 0; i < 4; i++) K.cyl(T.dark, 0.03, 0.05, 8, -1.24 + i * 0.1, -1.04, 1.42, "y");
    /* the rear door: its black gap and three hinges */
    K.bb(T.dark, x1 - 0.016, x1, -0.42, -0.38, 1.22, 2.50);
    K.bb(T.dark, x1 - 0.016, x1, 0.38, 0.42, 1.22, 2.50);
    K.bb(T.dark, x1 - 0.016, x1, -0.42, 0.42, 2.46, 2.50);
    for (i = 0; i < 3; i++) K.bb(T.dark, x1 - 0.05, x1, -0.46, -0.40, 1.35 + i * 0.5, 1.45 + i * 0.5);
  }
  function mastJam(THREE, T, g) {
    var tg = new THREE.Group(), K = new Baker(THREE), i, n = 14;
    tg.name = "turret";
    tg.position.set(JAM_X, 0, JAM_Z);
    K.cyl(T.dark, 0.035, 1.25, 8, 0, 0, 0.625, "z");                 /* the mast */
    K.cyl(T.dark, 0.022, 1.70, 6, 0, 0, 1.25, "x");                  /* the boom */
    for (i = 0; i < n; i++) {                                         /* vertical dipoles, longest at the back */
      var x = -0.80 + i * 1.60 / (n - 1), hl = 0.62 - i * (0.62 - 0.32) / (n - 1);
      K.cyl(T.dark, 0.008, hl * 2, 4, x, 0, 1.25, "z");
    }
    K.bb(T.dark, -0.06, 0.06, -0.05, 0.05, 1.18, 1.31);               /* the clamp on the mast head */
    K.flush(tg);
    g.add(tg);
  }

  /* ---------------------------------------------------------------- DETAIL PASS 2: the fittings kit
     Built on this module's own box(bin, x0, x1, y0, y1, z0, z1) and cyl(bin, A, B, r0, r1, seg); every
     part lands in the bin it is handed, so the draw calls do not grow.  s = +1 the left (+Y) side, a
     part on a side face stands off the face y = ys outward.  Sizes are by proportion (NOT CONFIRMED):
     the 20 l jerrycan 0.345 x 0.165 x 0.47 m, tool handles 0.03-0.04 m, tow cable 0.028 m. */
  function dpKit(box, cyl) {
    var TAU = 2 * Math.PI;
    function oy(s, ys, t0, t1) { return s > 0 ? [ys + t0, ys + t1] : [ys - t1, ys - t0]; }
    function bar(b, A, B, r, seg) { cyl(b, A, B, r, r, seg || 6); }
    var D = {
      bar: bar, oy: oy,
      /* a bolt row along X on the side face ys */
      bolts: function (b, x0, x1, n, ys, z, s, r) {
        r = r || 0.013; var i, x, q = oy(s, ys, -0.004, r * 1.1);
        for (i = 0; i < n; i++) { x = n > 1 ? x0 + (x1 - x0) * i / (n - 1) : x0; box(b, x - r, x + r, q[0], q[1], z - r, z + r); }
      },
      /* a bolt row along X on a top face z, or along Y when y1 is given */
      boltsTop: function (b, x0, x1, n, y0, y1, z, r) {
        r = r || 0.013; var i, t;
        for (i = 0; i < n; i++) { t = n > 1 ? i / (n - 1) : 0; var x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t; box(b, x - r, x + r, y - r, y + r, z - 0.004, z + r * 1.1); }
      },
      /* a door hinge on a side face: the barrel up the face and its two leaves */
      hinge: function (b, x, ys, z0, z1, s) {
        var q = oy(s, ys, 0, 0.022);
        cyl(b, [x, (q[0] + q[1]) / 2, z0], [x, (q[0] + q[1]) / 2, z1], 0.02, 0.02, 8);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.15, z0 + (z1 - z0) * 0.35);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.65, z0 + (z1 - z0) * 0.85);
      },
      /* a hatch hinge on a roof: the barrel along X or Y */
      hingeTop: function (b, x0, x1, y0, y1, z) { cyl(b, [x0, y0, z + 0.02], [x1, y1, z + 0.02], 0.022, 0.022, 8); },
      /* a U grab handle standing off the side face ys, along X */
      grab: function (b, s, ys, x0, x1, z) {
        var q = oy(s, ys, 0, 0.055), yf = s > 0 ? q[1] - 0.012 : q[0] + 0.012;
        bar(b, [x0, ys, z], [x0, yf, z], 0.011, 5); bar(b, [x1, ys, z], [x1, yf, z], 0.011, 5);
        bar(b, [x0, yf, z], [x1, yf, z], 0.011, 5);
      },
      /* a U grab handle on a top face z, along X (or Y with y1) */
      grabTop: function (b, x0, x1, y0, y1, z) {
        bar(b, [x0, y0, z], [x0, y0, z + 0.055], 0.011, 5); bar(b, [x1, y1, z], [x1, y1, z + 0.055], 0.011, 5);
        bar(b, [x0, y0, z + 0.055], [x1, y1, z + 0.055], 0.011, 5);
      },
      /* a U grab handle on a face across X (front or rear), dir = +1 the face looks to +X */
      grabX: function (b, xs, dir, y0, y1, z) {
        var xf = xs + dir * 0.05;
        bar(b, [xs, y0, z], [xf, y0, z], 0.011, 5); bar(b, [xs, y1, z], [xf, y1, z], 0.011, 5);
        bar(b, [xf, y0, z], [xf, y1, z], 0.011, 5);
      },
      /* a wire guard over a lamp on a face across X (dir +1 looks forward): three bars and two hoops */
      guard: function (b, x, y, z, r, dir) {
        var i, xf = x + dir * (r * 0.9);
        for (i = -1; i <= 1; i++) bar(b, [x, y + i * r * 0.65, z + r * 1.2], [xf, y + i * r * 0.65, z], 0.008, 4);
        for (i = -1; i <= 1; i++) bar(b, [xf, y + i * r * 0.65, z], [x, y + i * r * 0.65, z - r * 1.2], 0.008, 4);
        bar(b, [x, y - r * 1.25, z + r * 1.2], [x, y + r * 1.25, z + r * 1.2], 0.009, 4);
        bar(b, [x, y - r * 1.25, z - r * 1.2], [x, y + r * 1.25, z - r * 1.2], 0.009, 4);
        bar(b, [xf, y - r * 0.7, z], [xf, y + r * 0.7, z], 0.008, 4);
      },
      /* a 20 l jerrycan standing in its bracket against the side face ys (x its centre, z0 its foot) */
      jerry: function (bP, bD, x, ys, z0, s) {
        var q = oy(s, ys, 0.012, 0.177), yf = s > 0 ? q[1] : q[0];
        box(bP, x - 0.172, x + 0.172, q[0], q[1], z0, z0 + 0.47);
        /* the pressed X on its face and the rim */
        var yr = s > 0 ? [yf, yf + 0.006] : [yf - 0.006, yf];
        bar(bP, [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        bar(bP, [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        /* the three handles and the spout on top */
        var yc = (q[0] + q[1]) / 2, i;
        for (i = -1; i <= 1; i++) box(bD, x + i * 0.07 - 0.012, x + i * 0.07 + 0.012, yc - 0.05, yc + 0.05, z0 + 0.47, z0 + 0.50);
        cyl(bD, [x + 0.13, yc, z0 + 0.47], [x + 0.13, yc, z0 + 0.52], 0.022, 0.022, 6);
        /* the bracket: a foot tray and the strap round it */
        box(bD, x - 0.19, x + 0.19, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z0 - 0.025, z0);
        box(bD, x - 0.19, x + 0.19, s > 0 ? q[1] : q[0] - 0.008, s > 0 ? q[1] + 0.008 : q[0], z0 + 0.30, z0 + 0.33);
      },
      /* a pioneer tool clipped along X on the side face ys (kind: "shovel", "pick", "axe", "bar") */
      tool: function (bH, bM, kind, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.06), y = (q[0] + q[1]) / 2, L = x1 - x0, dir = L > 0 ? 1 : -1;
        bar(bH, [x0, y, z], [x1, y, z], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.008, y + 0.008, z - 0.11, z + 0.11);
          bar(bH, [x0, y, z - 0.06], [x0, y, z + 0.06], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y, z - 0.30], [x1, y, z + 0.30], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.012, y + 0.012, z - 0.04, z + 0.15);
        }
        /* the clamps */
        var c, qa = oy(s, ys, 0, 0.07);
        for (c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, qa[0], qa[1], z - 0.035, z + 0.035); }
      },
      /* the same lying flat on a top face z, the handle along X at y (the blade and the pick head flat) */
      toolTop: function (bH, bM, kind, x0, x1, y, z) {
        var L = x1 - x0, dir = L > 0 ? 1 : -1, zc = z + 0.022;
        bar(bH, [x0, y, zc], [x1, y, zc], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.11, y + 0.11, z + 0.004, z + 0.02);
          bar(bH, [x0, y - 0.06, zc], [x0, y + 0.06, zc], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y - 0.30, zc], [x1, y + 0.30, zc], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.04, y + 0.15, z + 0.01, z + 0.034);
        }
        for (var c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, y - 0.035, y + 0.035, z, z + 0.05); }
      },
      /* a tow cable along X on the side face ys: two strands, the eyes and three clips */
      cable: function (b, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.07), y = (q[0] + q[1]) / 2, i, a, k;
        bar(b, [x0 + 0.08, y, z + 0.025], [x1 - 0.08, y, z + 0.025], 0.016, 6);
        bar(b, [x0 + 0.08, y, z - 0.025], [x1 - 0.08, y, z - 0.025], 0.016, 6);
        for (k = 0; k < 2; k++) {
          var xe = k ? x1 - 0.06 : x0 + 0.06;
          for (i = 0; i < 6; i++) { a = i / 6 * TAU; var b2 = (i + 1) / 6 * TAU;
            bar(b, [xe + Math.cos(a) * 0.06, y, z + Math.sin(a) * 0.06], [xe + Math.cos(b2) * 0.06, y, z + Math.sin(b2) * 0.06], 0.014, 4); }
        }
        for (i = 1; i <= 3; i++) { var xc = x0 + (x1 - x0) * i / 4; box(b, xc - 0.03, xc + 0.03, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z - 0.06, z + 0.06); }
      },
      /* a stowage bin: the box, its lid's lip, the hinge along the top and two latches on the face s */
      stow: function (bP, bD, x0, x1, y0, y1, z0, z1, s) {
        box(bP, x0, x1, y0, y1, z0, z1);
        box(bP, x0 - 0.015, x1 + 0.015, y0 - 0.015, y1 + 0.015, z1 - 0.035, z1 + 0.012);
        var yi = s > 0 ? y0 : y1, yf = s > 0 ? y1 : y0, k;
        cyl(bD, [x0 + 0.05, yi, z1 + 0.012], [x1 - 0.05, yi, z1 + 0.012], 0.018, 0.018, 6);
        for (k = 0; k < 2; k++) { var xl = x0 + (x1 - x0) * (0.25 + k * 0.5);
          box(bD, xl - 0.025, xl + 0.025, s > 0 ? yf : yf - 0.02, s > 0 ? yf + 0.02 : yf, z1 - 0.13, z1 - 0.04); }
      },
      /* a rolled tarpaulin or camouflage net along X, with three straps */
      roll: function (bP, bD, x0, x1, y, z, r) {
        cyl(bP, [x0, y, z], [x1, y, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var x = x0 + (x1 - x0) * (0.15 + i * 0.35); cyl(bD, [x - 0.025, y, z], [x + 0.025, y, z], r + 0.012, r + 0.012, 12); }
      },
      /* the same rolled across Y */
      rollY: function (bP, bD, x, y0, y1, z, r) {
        cyl(bP, [x, y0, z], [x, y1, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var y = y0 + (y1 - y0) * (0.15 + i * 0.35); cyl(bD, [x, y - 0.025, z], [x, y + 0.025, z], r + 0.012, r + 0.012, 12); }
      },
      /* an aerial base: the mount, the spring and the stub of the mast (h, at most 0.5 m: the
         engine's era kit and sling clearances read the model's height, so no full-length whip) */
      whip: function (b, x, y, z, h) {
        h = Math.min(h || 0.4, 0.5);
        cyl(b, [x, y, z], [x, y, z + 0.09], 0.05, 0.042, 8);
        cyl(b, [x, y, z + 0.09], [x, y, z + 0.22], 0.024, 0.024, 6);
        cyl(b, [x, y, z + 0.22], [x, y, z + h], 0.011, 0.008, 4);
      },
      /* a mudflap hanging across X behind a wheel */
      flap: function (b, x, y0, y1, z0, z1) { box(b, x - 0.008, x + 0.008, y0, y1, z0, z1); },
      /* hub nuts round a wheel centre on the outer face y (axis along Y), ring radius R */
      nuts: function (b, x, y, z, R, n, s, r) {
        r = r || 0.018; var i, a;
        for (i = 0; i < n; i++) { a = i / n * TAU; cyl(b, [x + Math.cos(a) * R, y, z + Math.sin(a) * R], [x + Math.cos(a) * R, y + s * 0.025, z + Math.sin(a) * R], r, r, 6); }
      },
      /* grille slats across a top face, n of them along X */
      slats: function (b, x0, x1, y0, y1, z, n) {
        for (var i = 0; i < n; i++) { var x = x0 + (x1 - x0) * (i + 0.5) / n; box(b, x - 0.012, x + 0.012, y0, y1, z, z + 0.025); }
        box(b, x0 - 0.02, x1 + 0.02, y0 - 0.02, y0, z, z + 0.03); box(b, x0 - 0.02, x1 + 0.02, y1, y1 + 0.02, z, z + 0.03);
      },
      /* louvres on a side face ys: n slats along Z */
      louvres: function (b, x0, x1, ys, z0, z1, n, s) {
        var q = oy(s, ys, 0, 0.022);
        for (var i = 0; i < n; i++) { var z = z0 + (z1 - z0) * (i + 0.5) / n; box(b, x0, x1, q[0], q[1], z - 0.012, z + 0.012); }
        box(b, x0 - 0.02, x0, q[0], q[1], z0, z1); box(b, x1, x1 + 0.02, q[0], q[1], z0, z1);
      },
      /* a round hatch on a roof: the lid, the hinge and the handle */
      hatch: function (bP, bD, x, y, z, r, hy) {
        cyl(bP, [x, y, z], [x, y, z + 0.045], r, r * 0.97, 16);
        cyl(bD, [x, y, z + 0.045], [x, y, z + 0.055], r * 0.55, r * 0.5, 12);
        var h = hy || 1;
        cyl(bD, [x - r * 0.5, y + h * (r + 0.02), z + 0.03], [x + r * 0.5, y + h * (r + 0.02), z + 0.03], 0.028, 0.028, 8);
        bar(bD, [x - r * 0.3, y - h * r * 0.3, z + 0.06], [x + r * 0.3, y - h * r * 0.3, z + 0.06], 0.012, 5);
      },
      /* a periscope / vision block on a roof looking along dir (+1 forward): body and glass */
      vblock: function (bD, bG, x, y, z, w, dir) {
        box(bD, x - 0.07, x + 0.07, y - w / 2, y + w / 2, z, z + 0.09);
        var xf = x + dir * 0.07;
        box(bG, Math.min(xf, xf + dir * 0.008), Math.max(xf, xf + dir * 0.008), y - w / 2 + 0.015, y + w / 2 - 0.015, z + 0.02, z + 0.07);
        box(bD, x - 0.09, x + 0.09, y - w / 2 - 0.01, y + w / 2 + 0.01, z + 0.09, z + 0.11);
      },
      /* a towing hook or pintle on a face across X (dir +1 looks forward) */
      /* (L, default 0.19 m, the reach in front of the face; kept inside the model's old length) */
      hook: function (b, xs, y, z, dir, L) {
        var k = (L || 0.19) / 0.19;
        box(b, Math.min(xs, xs + dir * 0.05 * k), Math.max(xs, xs + dir * 0.05 * k), y - 0.09, y + 0.09, z - 0.10, z + 0.10);
        cyl(b, [xs + dir * 0.05 * k, y, z], [xs + dir * 0.16 * k, y, z], 0.035, 0.035, 8);
        cyl(b, [xs + dir * 0.16 * k, y, z - 0.07], [xs + dir * 0.16 * k, y, z + 0.05], 0.03, 0.03, 8);
        cyl(b, [xs + dir * 0.12 * k, y - 0.05, z + 0.06], [xs + dir * 0.12 * k, y + 0.05, z + 0.06], 0.015, 0.015, 5);
      },
      /* a lifting eye on a top face */
      eye: function (b, x, y, z, alongY) {
        if (alongY) box(b, x - 0.012, x + 0.012, y - 0.04, y + 0.04, z - 0.005, z + 0.06);
        else box(b, x - 0.04, x + 0.04, y - 0.012, y + 0.012, z - 0.005, z + 0.06);
      },
      /* an exhaust: the pipe from A to B with its silencer drum part way and a cap */
      exhaust: function (b, A, B, r, at) {
        var t = at === undefined ? 0.5 : at, M = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t];
        cyl(b, A, B, r, r, 8);
        var d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), k = Math.min(0.2, l * 0.25) / l;
        cyl(b, [M[0] - d[0] * k, M[1] - d[1] * k, M[2] - d[2] * k], [M[0] + d[0] * k, M[1] + d[1] * k, M[2] + d[2] * k], r * 2.1, r * 2.1, 10);
        cyl(b, B, [B[0] + d[0] / l * 0.03, B[1] + d[1] / l * 0.03, B[2] + d[2] / l * 0.03], r * 1.3, r * 1.3, 8);
      },
      /* a rack of rails standing on a top face: frame posts and two rails (a basket) */
      basket: function (b, x0, x1, y0, y1, z0, h) {
        var i, n = Math.max(2, Math.round((x1 - x0) / 0.3) + 1), x;
        for (i = 0; i < n; i++) { x = x0 + (x1 - x0) * i / (n - 1);
          bar(b, [x, y0, z0], [x, y0, z0 + h], 0.012, 4); bar(b, [x, y1, z0], [x, y1, z0 + h], 0.012, 4); }
        bar(b, [x0, y0, z0 + h], [x1, y0, z0 + h], 0.013, 4); bar(b, [x0, y1, z0 + h], [x1, y1, z0 + h], 0.013, 4);
        bar(b, [x0, y0, z0 + h * 0.5], [x1, y0, z0 + h * 0.5], 0.01, 4); bar(b, [x0, y1, z0 + h * 0.5], [x1, y1, z0 + h * 0.5], 0.01, 4);
        bar(b, [x0, y0, z0 + h], [x0, y1, z0 + h], 0.013, 4); bar(b, [x1, y0, z0 + h], [x1, y1, z0 + h], 0.013, 4);
      },
      /* kit bags / rucksacks stowed in a basket: lumpy boxes, strapped */
      bags: function (bP, bD, x0, x1, y0, y1, z0, h, seed) {
        var r = (seed || 7) >>> 0, n = Math.max(2, Math.round((x1 - x0) / 0.45)), i;
        function R() { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; return r / 4294967296; }
        for (i = 0; i < n; i++) {
          var a = x0 + (x1 - x0) * i / n + 0.02, c = x0 + (x1 - x0) * (i + 1) / n - 0.02, hh = h * (0.6 + R() * 0.4), w = (y1 - y0) * (0.75 + R() * 0.2), yc = (y0 + y1) / 2 + (R() - 0.5) * 0.06;
          box(bP, a, c, yc - w / 2, yc + w / 2, z0, z0 + hh);
          box(bD, (a + c) / 2 - 0.02, (a + c) / 2 + 0.02, yc - w / 2 - 0.006, yc + w / 2 + 0.006, z0, z0 + hh + 0.006);
        }
      }
    };
    return D;
  }
  /* ------------------------------------------------------------ DETAIL PASS 2
     The fittings the first pass left out, on every body (classes [P1]-[P6] show; places and sizes by
     proportion, NOT CONFIRMED): the bonnet's four rubber T-latches, the lifting shackles at the bonnet's
     front corners, the side marker lamps, the wipers, the mudflaps behind all four wheels, the hinges of
     the doors, the rain gutter along the roof, the tailgate's hinges, the rear bumperettes, the guards
     over the tail lamps, the tie-down rings; the kit bags strapped on the slant-back of the armoured
     trucks.  Built on the kit's fittings (dpKit) through the Baker; no new material. */
  function dpFor(K) {
    var THREE = K.T;
    return dpKit(function (m, x0, x1, y0, y1, z0, z1) { K.bb(m, x0, x1, y0, y1, z0, z1); },
      function (m, A, B, r0, r1, seg) {
        var d = new THREE.Vector3(B[0] - A[0], B[1] - A[1], B[2] - A[2]), len = d.length();
        if (len < 1e-6) return;
        d.normalize();
        var g = new THREE.CylinderGeometry(r1, r0, len, seg || 6);
        g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3((A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2),
          new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d), new THREE.Vector3(1, 1, 1)));
        K.add(m, g);
      });
  }
  function hvDetail(K, T, V) {
    var DP = dpFor(K), D = T.dark, S = T.skin, s, i, x, y, nose = V.nose, cowl = nose - 1.25, hw = V.hwF, ys = V.hwS;
    var zr = V.kind === "slant" || V.kind === "arm" ? V.roof : null;
    for (s = -1; s <= 1; s += 2) {
      /* the bonnet's T-latches on the fender sides, the lifting shackles at its front corners */
      K.bb(D, nose - 0.30, nose - 0.24, s * hw, s * (hw + 0.025), 1.00, 1.08);
      K.bb(D, cowl + 0.10, cowl + 0.16, s * hw, s * (hw + 0.025), 0.98, 1.06);
      K.torus(D, 0.035, 0.010, nose - 0.10, s * (hw - 0.14), 1.085, 4, 8);
      /* the side marker lamp on the fender */
      K.bb(T.lampA, nose - 0.17, nose - 0.09, s * hw, s * (hw + 0.012), 0.86, 0.91);
      /* the wiper on the windscreen */
      DP.bar(D, [nose - 1.22, s * 0.15, 1.37], [nose - 1.30, s * 0.55, 1.62], 0.009, 4);
      /* the mudflaps behind the four wheels */
      DP.flap(D, XF - 0.62, s > 0 ? 0.74 : -hw + 0.02, s > 0 ? hw - 0.02 : -0.74, 0.30, 0.64);
      DP.flap(D, XR - 0.64, s > 0 ? 0.74 : -ys + 0.02, s > 0 ? ys - 0.02 : -0.74, 0.30, 0.60);
      /* the rear bumperettes, the guards over the tail lamps, tie-down rings at the corners */
      K.bb(D, V.tail - 0.06, V.tail + 0.10, s * (ys - 0.22), s * (ys - 0.04), 0.46, 0.52);
      DP.guard(D, V.tail + 0.02, s * (ys - 0.13), 0.82, 0.07, -1);
      K.torus(D, 0.035, 0.010, V.tail + 0.045, s * (ys - 0.01), 0.70, 4, 8);
      /* the rain gutter along the roof edge */
      if (zr) K.bb(D, V.kind === "slant" ? -1.08 : ARM_RE, V.kind === "slant" ? 0.62 : 0.72, s * (ys - 0.012), s * (ys + 0.012), zr - 0.04, zr - 0.02);
      /* the door hinges of the first-generation doors */
      if (V.kind !== "arm") {
        DP.hinge(D, 0.88, s * ys, 0.90, 1.70, s);
        if (V.kind === "slant") DP.hinge(D, -0.04, s * ys, 0.90, 1.70, s);
      }
    }
    if (V.kind === "slant") {
      /* the tailgate's hinges and the lid's handles */
      for (s = -1; s <= 1; s += 2) { DP.hingeTop(D, V.tail + 0.02, V.tail + 0.02, s * 0.45, s * 0.75, 1.13); K.bb(D, V.tail - 0.02, V.tail, s * 0.30 - 0.06, s * 0.30 + 0.06, 0.95, 0.99); }
    }
    if (V.kind === "arm") {
      /* the tailgate's hinges (batch 2 review: the kit bags and rolled net the old file strapped on
         the slant-back are in neither [L1] nor [R4], which shows this truck's slant bare: removed) */
      for (s = -1; s <= 1; s += 2) DP.hingeTop(D, V.tail + 0.03, V.tail + 0.03, s * 0.45, s * 0.75, ARM_TT - 0.04);
      /* review 1, off [R4] (this truck from astern and above): the two black blocks at the top
         corners of the slant where it leaves the roof, the raised ledge across the slant about half way
         down (a lit line with its shadow under it), the lid's latch in the middle, and the big black
         rear mudflaps hanging nearly to the ground */
      var sa = Math.atan2(ARM_TT - (V.roof - 0.04), (V.tail + 0.05) - ARM_RE), sz = function (x) { return V.roof - 0.04 + (x - ARM_RE) * Math.tan(sa); };
      for (s = -1; s <= 1; s += 2) {
        K.bb(D, ARM_RE - 0.26, ARM_RE + 0.02, s * (V.hwS - 0.30), s * (V.hwS - 0.06), sz(ARM_RE - 0.13) - 0.06, V.roof + 0.10);
        DP.flap(D, XR - 0.66, s > 0 ? 0.74 : -(V.hwS - 0.02), s > 0 ? V.hwS - 0.02 : -0.74, 0.10, 0.62);
      }
      /* the armoured roof's edge as [L1] shows it: a plain raised rail along each side (3 cm wide, 1.2 cm
         high, the cowl's top to the roof's end) with four bolts a side, and a small black slot in the
         right-hand rail near x -0.28 (review 2: the 0.12 m bolt rows round the roof were invented) */
      for (s = -1; s <= 1; s += 2) {
        var ry0 = s * (V.hwS - 0.03), ry1 = s * (V.hwS - 0.06);
        K.bb(S, ARM_RE + 0.02, 0.70, ry0, ry1, V.roof, V.roof + 0.012);
        for (i = 0; i < 4; i++) { x = 0.55 - i * 0.50; K.bb(D, x - 0.012, x + 0.012, s * (V.hwS - 0.045) - 0.012, s * (V.hwS - 0.045) + 0.012, V.roof + 0.012, V.roof + 0.020); }
      }
      K.bb(D, -0.36, -0.20, -(V.hwS - 0.035), -(V.hwS - 0.055), V.roof + 0.004, V.roof + 0.0125);
      /* the slant's edge bolts [R4] */
      for (x = ARM_RE - 0.12; x > V.tail + 0.10; x -= 0.12) for (s = -1; s <= 1; s += 2)
        K.bb(D, x - 0.013, x + 0.013, s * (V.hwS - 0.05) - 0.013, s * (V.hwS - 0.05) + 0.013, sz(x) - 0.01, sz(x) + 0.014);
      var xl = (ARM_RE + V.tail) / 2 - 0.05;
      /* the ledge: a thin bar, at most 1.5 cm proud of the slant (review 2: no step in the side outline) */
      K.bb(S, xl - 0.05, xl + 0.05, -(V.hwS - 0.12), V.hwS - 0.12, sz(xl) - 0.04, sz(xl - 0.05) + 0.015);
      K.bb(D, xl - 0.062, xl - 0.05, -(V.hwS - 0.12), V.hwS - 0.12, sz(xl) - 0.04, sz(xl - 0.05) + 0.010);
      var xh = V.tail + 0.30;
      K.bb(D, xh - 0.08, xh + 0.08, -0.12, 0.12, sz(xh) - 0.03, sz(xh) + 0.03);
      /* batch 2: four 20 l jerrycans in their rack across the tail, as [R4] (an M1151 with the GPK,
         from astern) carries them: 0.165 deep, 0.345 wide, 0.47 tall, feet at z 0.70, x behind the
         tail face; a black strap across them and the rack's foot rail */
      for (i = 0; i < 4; i++) {
        var yc = -0.66 + i * 0.44, xc0 = V.tail - 0.17, xc1 = V.tail;
        K.bb(S, xc0, xc1, yc - 0.172, yc + 0.172, 0.70, 1.17);
        K.rod(S, 0.009, [xc0 - 0.002, yc - 0.14, 0.75], [xc0 - 0.002, yc + 0.14, 1.06], 4);
        K.rod(S, 0.009, [xc0 - 0.002, yc + 0.14, 0.75], [xc0 - 0.002, yc - 0.14, 1.06], 4);
        for (var hh = -1; hh <= 1; hh++) K.bb(D, xc0 + 0.06, xc0 + 0.11, yc + hh * 0.07 - 0.012, yc + hh * 0.07 + 0.012, 1.17, 1.20);
      }
      K.bb(D, V.tail - 0.19, V.tail, -0.90, 0.90, 0.67, 0.70);
      K.bb(D, V.tail - 0.185, V.tail - 0.17, -0.90, 0.90, 0.98, 1.02);
    }
  }
  /* ------------------------------------------------------------ DETAIL PASS 3 (2026-11, POLICY 10)
     The fittings still missing after pass 2, on every body ([P1]-[P7] show the classes; places and
     sizes by proportion, NOT CONFIRMED): paddle door handles with their lock barrels, the second
     (upper) outside hinge and the hinge pins of the armoured doors; mirror glass and a lower brace
     on each mirror arm; the black-out drive lamp in its guard on the left fender and the black-out
     markers beside the headlamps; the grille's surround and centre bar, the bonnet's hinge pins
     and hold-down hooks; the front tow brackets behind the shackles with their bolts, the rear
     lifting shackles; the fuel filler on the right rear quarter, the trailer socket; the muffler
     and tail pipe under the right side; a spring and tuner box at each whip mount; ammunition cans
     strapped by the M1025's roof ring.  No new material, so the draw calls do not grow. */
  function hvDetail3(K, T, V) {
    var DP = dpFor(K), D = T.dark, s, i, nose = V.nose, hw = V.hwF, ys = V.hwS, zr = V.roof;
    var doors = V.kind === "slant" ? [[0.86, -0.06], [-0.06, -0.92]] : V.kind === "arm" ? ARM_D : [[0.86, -0.22]];
    var zh = V.kind === "arm" ? 1.16 : 1.22;
    for (s = -1; s <= 1; s += 2) {
      doors.forEach(function (d) {
        var x1 = d[1], q = DP.oy(s, ys, 0.012, 0.045);
        /* the paddle handle in its recess and the lock barrel beside it */
        K.bb(D, x1 + 0.08, x1 + 0.24, s * ys, s * (ys + 0.008), zh - 0.035, zh + 0.035);
        K.bb(D, x1 + 0.10, x1 + 0.22, q[0], q[1], zh - 0.015, zh + 0.012);
        K.cyl(D, 0.014, 0.025, 8, x1 + 0.29, s * (ys + 0.012), zh, "y");
        if (V.kind === "arm") {
          /* the second, upper hinge and both hinge pins */
          K.bb(D, d[0] - 0.04, d[0] + 0.02, s * ys, s * (ys + 0.03), 1.48, 1.55);
          K.cyl(D, 0.016, 0.12, 8, d[0] + 0.005, s * (ys + 0.034), 1.085, "z");
          K.cyl(D, 0.016, 0.12, 8, d[0] + 0.005, s * (ys + 0.034), 1.515, "z");
        }
      });
      /* the mirror glass and a lower brace */
      var mx = V.kind === "arm" ? 0.80 : 0.84, mz = V.kind === "arm" ? 1.40 : 1.36;
      K.bb(T.glass, mx + 0.031, mx + 0.036, s * (V.hwS + 0.08), s * (V.hwS + 0.18), mz + 0.06, mz + 0.30);
      K.rod(D, 0.009, [mx, s * V.hwS, mz - 0.10], [mx, s * (V.hwS + 0.13), mz + 0.05], 4);
      /* the black-out markers beside the headlamps */
      K.bb(T.lampA, nose, nose + 0.012, s * 0.62, s * 0.68, 0.70, 0.75);
      /* the front tow brackets behind the shackles, four bolts each; the rear lifting shackles */
      K.bb(D, V.bump - 0.03, V.bump + 0.012, s * 0.56, s * 0.68, 0.53, 0.65);
      DP.boltsTop(D, V.bump + 0.012, V.bump + 0.012, 2, s * 0.58, s * 0.66, 0.635, 0.009);
      DP.boltsTop(D, V.bump + 0.012, V.bump + 0.012, 2, s * 0.58, s * 0.66, 0.545, 0.009);
      K.torus(D, 0.04, 0.011, V.tail - 0.03, s * (ys - 0.13), 0.45, 4, 10);
      /* the bonnet's hinge pins at the nose and its hold-down hooks at the cowl */
      K.cyl(D, 0.016, 0.10, 8, nose - 0.06, s * 0.50, 1.07, "y");
      K.bb(D, nose - 1.21, nose - 1.17, s * (hw - 0.04), s * (hw + 0.015), 1.12, 1.24);
    }
    /* the black-out drive lamp on the left fender top, in its guard */
    K.bb(T.lamp, nose - 0.10, nose - 0.04, hw - 0.26, hw - 0.12, 1.04, 1.10);
    K.bb(D, nose - 0.16, nose - 0.10, hw - 0.27, hw - 0.11, 1.03, 1.11);
    DP.guard(D, nose - 0.08, hw - 0.19, 1.07, 0.05, 1);
    /* the grille's surround and its centre bar */
    K.bb(D, nose + 0.010, nose + 0.030, -0.40, 0.40, 0.955, 0.975);
    K.bb(D, nose + 0.010, nose + 0.030, -0.40, 0.40, 0.655, 0.675);
    K.bb(D, nose + 0.010, nose + 0.030, -0.40, -0.38, 0.66, 0.97);
    K.bb(D, nose + 0.010, nose + 0.030, 0.38, 0.40, 0.66, 0.97);
    K.bb(T.skin, nose + 0.024, nose + 0.034, -0.37, 0.37, 0.805, 0.825);
    /* the fuel filler on the right rear quarter and the trailer socket on the tail */
    K.cyl(D, 0.05, 0.02, 12, -1.20, -(ys + 0.01), 1.02, "y");
    K.bb(D, -1.27, -1.13, -(ys + 0.004), -ys, 0.95, 1.09);
    K.cyl(D, 0.035, 0.06, 10, V.tail - 0.02, -0.30, 0.60, "x");
    /* the muffler and the tail pipe, under the right side */
    K.cyl(D, 0.075, 0.42, 10, XR + 0.55, -0.40, 0.46, "x");
    K.rod(D, 0.028, [XR - 0.10, -0.40, 0.46], [V.tail + 0.10, -0.55, 0.47], 6);
    K.cyl(D, 0.032, 0.05, 8, V.tail + 0.08, -0.55, 0.47, "x");
    /* a spring and a tuner box at each whip mount */
    var wy = -(ys - 0.10), wx = V.kind === "slant" ? -1.22 : -1.10, wz = V.kind === "slant" ? 1.52 : zr + 0.06;
    if (V.kind === "slant" || V.kind === "arm") {
      K.cyl(D, 0.022, 0.12, 8, wx, wy, wz + 0.06, "z");
      K.bb(D, wx - 0.20, wx - 0.06, wy - 0.06, wy + 0.06, wz - 0.12, wz - 0.02);
      if (V.turret === "ogpk") { K.cyl(D, 0.022, 0.12, 8, wx, -wy, wz + 0.06, "z"); K.bb(D, wx - 0.20, wx - 0.06, -wy - 0.06, -wy + 0.06, wz - 0.12, wz - 0.02); }
    }
    if (V.kind === "slant") {
      /* two ammunition cans strapped on the roof behind the ring */
      for (i = 0; i < 2; i++) {
        var ax = RING_SLANT - 0.62 - i * 0.16;
        K.bb(D, ax - 0.06, ax + 0.06, 0.18, 0.46, zr, zr + 0.18);
        K.bb(D, ax - 0.065, ax + 0.065, 0.28, 0.36, zr + 0.18, zr + 0.20);
      }
      K.bb(D, RING_SLANT - 0.92, RING_SLANT - 0.56, 0.31, 0.33, zr, zr + 0.19);
    }
  }
  /* ------------------------------------------------------------ BATCH 2: what reads at the game camera
     Not more small fittings: the panel breaks that give the truck its shape from above and from the
     front quarter.  The bonnet's two creases where its raised centre meets the fender tops (y +-0.46,
     the loft's step; the raised air intake is in frontClip), the seam round the
     slant-back's rear lid with its two hinges at the roof (x -1.16 / -1.24 to the tail), the cab's
     drip rail over the doors, and the dark gap between the bonnet's rear edge and the cowl. */
  function hvRead(K, T, V) {
    var D = T.dark, nose = V.nose, cowl = nose - 1.25, i, s, st, x;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < BON.length - 1; i++) {
        var a = BON[i], b = BON[i + 1];
        K.rod(D, 0.009, [nose - a[0], s * 0.46, (a[1] + a[2]) / 2 + 0.006], [nose - b[0], s * 0.46, (b[1] + b[2]) / 2 + 0.006], 4);
      }
    }
    /* the bonnet's rear edge: a black gap across the cowl */
    K.bb(D, cowl - 0.005, cowl + 0.025, -(V.hwF - 0.02), V.hwF - 0.02, 1.30, 1.345);
    if (V.kind === "slant" || V.kind === "arm") {
      /* the rear lid: seams down both sides of the slant and across its top, its two hinges */
      var arm = V.kind === "arm", xa = arm ? ARM_RE : -1.16, za = V.roof - 0.04, xb = V.tail + (arm ? 0.05 : 0.04), zb = arm ? ARM_TT : 1.22;
      var L = Math.sqrt((xb - xa) * (xb - xa) + (zb - za) * (zb - za)), nx = -(zb - za) / L, nz = (xb - xa) / L;
      if (nz < 0) { nx = -nx; nz = -nz; }
      var o = 0.008, yl = V.hwS - 0.09;
      var sp = function (t) { return [xa + (xb - xa) * t + nx * o, za + (zb - za) * t + nz * o]; };
      var p0 = sp(0.03), p1 = sp(0.97);
      for (s = -1; s <= 1; s += 2) {
        K.rod(D, 0.011, [p0[0], s * yl, p0[1]], [p1[0], s * yl, p1[1]], 4);
        K.rod(D, 0.022, [xa + 0.03, s * (yl - 0.20), V.roof + 0.012], [xa + 0.03, s * (yl - 0.40), V.roof + 0.012], 8);
      }
      K.rod(D, 0.011, [p0[0], -yl, p0[1]], [p0[0], yl, p0[1]], 4);
      K.rod(D, 0.011, [p1[0], -yl, p1[1]], [p1[0], yl, p1[1]], 4);
    }
  }
  /* turret details shared by the weapon stations: the ring's bolts, its traverse lock and handle */
  function ringDetail(K, T, r, z, n) {
    var i, a;
    for (i = 0; i < n; i++) { a = (i + 0.5) / n * Math.PI * 2; K.bb(T.dark, Math.cos(a) * r - 0.014, Math.cos(a) * r + 0.014, Math.sin(a) * r - 0.014, Math.sin(a) * r + 0.014, z, z + 0.02); }
    K.bb(T.dark, -r - 0.04, -r + 0.06, -0.05, 0.05, z, z + 0.06);
    K.rod(T.dark, 0.012, [-r + 0.02, 0.04, z + 0.06], [-r - 0.10, 0.10, z + 0.20], 5);
    K.cyl(T.dark, 0.018, 0.08, 6, -r - 0.10, 0.10, z + 0.24, "z");
  }
  /* the M2's ammunition belt from the can to the feed tray, its rear sight and the front post */
  function m2Detail(K, T, x0, z0) {
    K.bb(T.dark, x0 - 0.02, x0 + 0.06, 0.055, 0.12, z0 + 0.02, z0 + 0.035);
    K.bb(T.dark, x0 - 0.17, x0 - 0.14, -0.012, 0.012, z0 + 0.075, z0 + 0.12);
    K.bb(T.dark, x0 + 0.33, x0 + 0.35, -0.008, 0.008, z0 + 0.035, z0 + 0.075);
  }

  /* --------------------------------------------------------------- build */
  function make(key) {
    return function (THREE, M, C) {
      var V = VAR[key], T = makeMats(THREE, C, V);
      var g = new THREE.Group();
      g.name = "humvee_" + key;
      var K = new Baker(THREE);
      chassis(K, T, V);
      if (V.kind === "slant") bodySlant(K, T, V);
      else if (V.kind === "avenger") bodyAvenger(K, T, V);
      else if (V.kind === "jam") bodyJam(K, T, V);
      else bodyArm(K, T, V);
      hvDetail(K, T, V);
      hvDetail3(K, T, V);
      hvRead(K, T, V);
      K.flush(g);
      var tgL = tyreGeo(THREE, V.R, 1), tgR = tyreGeo(THREE, V.R, -1), s, i, axs = [XF, XR];
      for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
        var w = new THREE.Group();
        w.name = "roadwheel";
        w.position.set(axs[i], s * HALF_TRACK, V.R);
        w.add(new THREE.Mesh(s > 0 ? tgL : tgR, T.rub));
        g.add(w);
      }
      if (V.kind === "slant") turretRing(THREE, T, g, V.roof);
      else if (V.kind === "avenger") turretAvenger(THREE, T, g);
      else if (V.kind === "jam") mastJam(THREE, T, g);
      else if (V.turret === "gpk") turretGpk(THREE, T, g, V.roof);
      else turretOgpk(THREE, T, g, V.roof);
      g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      return g;
    };
  }

  return { make: make };
})();

/* len is the MEASURED x extent (the front tow shackles to the pintle hook); render3d.js normalises on
   the measurement */
UNIT_MODELS["nato_e80_recon"] = { len: 4.68, build: HeroHumvee.make("e80") };
UNIT_MODELS["nato_e90_recon"] = { len: 4.68, build: HeroHumvee.make("e90") };
UNIT_MODELS["nato_e00_recon"] = { len: 4.98, build: HeroHumvee.make("e00") };
UNIT_MODELS["recon_n"] = { len: 4.98, build: HeroHumvee.make("n") };
UNIT_MODELS["nato_e90_spaag"] = { len: 4.99, build: HeroHumvee.make("av") };
UNIT_MODELS["nato_e90_ewveh"] = { len: 4.68, build: HeroHumvee.make("tj") };
