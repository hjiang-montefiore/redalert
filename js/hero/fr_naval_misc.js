/* ========== fr_naval_misc.js - HERO models: French carrier jets, the Crotale NG and two landing craft ==========
   LOADS AFTER js/hero/eu_sams.js (HeroEuSamKit: Bin, box, cyl, loft, profY, lathe, tyre, materials,
   flush).  No other hero file is called or edited.

   Rows and builders:
     fra_e60_cfighter  HeroCrusaderFN.build     Vought F-8E(FN) Crusader                         NEW (no F-8
                       build existed in js/hero: grep -i "crusader|F-8E|F8U" finds only text)
     fra_e80_cfighter  HeroSuperEtendard.se     Dassault-Breguet Super Etendard (1978)           NEW
     fra_e90_cfighter  HeroSuperEtendard.sem    Super Etendard Modernise: the same builder,      NEW
                                                VARIANTS differ in the finish only (below)
     fra_e00_spaag     HeroCrotaleNG.build      Crotale NG fire unit of the Armee de l'Air: the  NEW
                       shelter and turret on a three-axle full trailer, as K3 shows it (below)
     fra_e50_lst       HeroFrLandingCraft.edic  EDIC, drawn as the EDIC III of the only photographs NEW
     fra_ctm           HeroFrLandingCraft.ctm   CTM (LCM-8 derived)                              NEW

   ------------------------------------------------------------------ F-8E(FN) CRUSADER
   REFERENCES (Wikimedia Commons via thumb.php, cached in scratchpad/q_frnav_ref):
     D  "Vought F-8 Crusader 3-view line art (EG-0027-01).gif" (NASA Dryden 1998, fetched 1600 px):
        THE TABLES.  Plan: span 695 px = the published 10.87 m -> 63.9 px/m; at that scale the plan's
        nose to tail-fairing tip is 16.57 m (the F-8E(FN) page's 16.6 m): two published figures agree
        at one scale.  The side view is at the same scale (nose to tail end 1033 px in side and plan).
        Side: X = (990 - px) / 63.9, Z = (1103 - py) / 63.9 (its ground line, both wheels on it);
        plan: Y = (637 - py) / 63.9.  Fuselage tops and bottoms and the plan outlines were read by a
        pixel scan per column / row; the front view gives the wing's anhedral (6.5 deg), the
        stabilator's dihedral (6 deg) and the main track (3.21 m).
     D2 "Vought F-8E Crusader 3-view line drawing.svg" (1600 px): cross-check.  It agrees on the
        stabilator dihedral (6 deg) and the fin height; it draws the aircraft nose-high on its gear
        (nose wheel 0.34 m lower than D's), which D's side and the photographs do not, so D is drawn.
     C1 "F-8E(FN) catching wire on USS Eisenhower (CVN-69) 1983.JPEG" - near side-on, starboard, on
        deck: the gull grey over white, the black radome, the R.550 Magic on the STARBOARD fuselage
        rail, the main gear and doors, the level stance.  Its fin top over the main wheels' contact,
        over the nose-to-tail-end length, is 340 / 953 px = 0.357 (a lower bound: the fin is the
        farther part); D gives 5.34 / 16.24 = 0.33; the published 4.80 m would be 0.30.
     C2 "Vought F-8E(FN) Crusader, France - Navy AN0758752.jpg", C3 "... AN1682701.jpg" - front left,
        parked: the oval chin mouth under the black radome, the nose leg, the canted ventral fins, the
        leg doors; C3 the canopy hinged open (drawn shut).
     C4 "Vought F-8E(FN) Crusader '150879 AH-204' (really '1') (52707635458).jpg" and C5 "Vought
        F-8P Crusader '35' (52707400489).jpg" (museum): gear and nose shapes; C4 wears US markings and
        C5 the late overall blue-grey of the F-8P - neither finish is drawn.
     C6 "Super Etendard F-8 Clemenceau.jpg" (1988): a Crusader on deck with an R.550 on the starboard
        rail, beside a Super Etendard.
     en.wikipedia "Vought F-8E(FN) Crusader": 16.6 x 10.87 x 4.8 m; the FN changes: blown flaps, more
        slat and flap deflection, "an increase in the surface area of the tail" / "enlarged
        stabilators", AN/APQ-104, R.530 and R.550 on the fuselage rails, no underwing hardpoints.
        "Vought F-8 Crusader": 55 ft 11.6 in (NATOPS F-8D/E).  "R.550 Magic": 2.72 m, 157 mm, 0.66 m.
   FN DIFFERENCES DRAWN: the R.550 Magic on the starboard fuselage rail (C1, C6); no wing pylons.
     NOT DRAWN: the enlarged stabilator (text only, no figure, no drawing of the FN tail - D's
     F-8 stabilator is drawn); blown flaps and the slats (not visible with the surfaces stowed).
   PUBLISHED / MEASURED: 16.79 x 10.94 x 5.40 m against 16.6 x 10.87 x 4.8.  Length: radome tip to the
     fin's top trailing corner (D side; the plan's nose-to-fairing 16.57 m).  HEIGHT 0.60 m OVER: D's
     own ground line and fin give 5.40; C1's ratio supports D, not the published figure (above); the
     published height is not met and nothing was squashed to meet it (NOT CONFIRMED which is right).
   RECOGNITION: the long body with the oval chin intake under the black radome (D, C1-C3); the high
     wing with its dogtooth and 6.5 deg anhedral (D); the low stabilators (D); the tall swept fin
     with its square top (D, C1); the two long fairings on the rear flanks and the canted ventral fins
     (D, C2); the bubble canopy (D, C1); the fuselage missile rails with the Magic (C1, C6); the
     single nose wheel on a long leg forward, mains out of the fuselage sides (D, C1-C3).
   NOT CONFIRMED: the section shapes between D's views (superellipse exponents 0.76-0.90); the
     intake lip and duct; the rail's z (1.55, D side); the wheel widths, legs, struts and the leg
     door; the Magic's fin shapes (published span only); the team bands.  NOT DRAWN: the arrester
     hook (no reference shows it clearly), the guns' ports, the boundary-layer slots, the plan's
     centreline tail spike (not identified), markings.

   ------------------------------------------------------------------ SUPER ETENDARD / SEM
   REFERENCES:
     E0 "Dassault-Breguet Super Etendard 3-view line drawing.png" (Commons title with E-acute;
        574 x 385 px): THE TABLES.  Plan span 188 px = the published 9.6 m -> 19.58 px/m, and at that
        scale the plan's length is 14.30 m (published 14.31): two figures at one scale.  The side
        view is 276 px long and is scaled to the published 14.31 m (19.29 px/m, 1.5 % off the plan's
        scale): X = 7.15 - (px - 258) / 19.29.  The side view has the gear up, so the ground is set
        from E2 (below): Z = (308 - py) / 19.29.  Front view: 5 deg anhedral, level tailplane.
     E1 "Dassault Super Etendard, France - Air Force JP7619285.jpg" - from below on the approach:
        the arrester hook under the rear fuselage (the en.wikipedia caption names it), the single
        nose wheel, single main wheels under the wing roots, two underwing tanks; GEAR STATIONS read
        along its nose-to-pipe axis (13.25 m): nose wheel X 4.18, mains X -0.46; main track 3.5 m
        from the wheels' spread over the span's (lateral foreshortening 0.61).
     E2 "Super Etendard Modernise (4712150737).jpg" - SEM parked, front right, near side-on: at the
        main gear's station the wheel is 0.41 of the fuselage depth and the belly stands 0.655 of
        the depth over the ground; with E0's depth there (1.40 m) the main wheel is 0.58 m, the nose
        wheel 0.38 m and the belly 0.88 m up.  Its nose-wheel station agrees with E1's (3.0 m from
        the nose); its main-wheel station (5.9 m from the nose, a three-quarter view) does not, and
        E1's is drawn.  The SEM finish: blue-grey sampled #485968 / #47535e, drawn #4b5661.
     E3 "Super Etendard in flight in 1988.JPEG" - an SE of the e80 period: the dark sea grey all
        over (sampled #6f6960 sunlit / #504c47 shade, drawn #5d5e5c), two underwing tanks, the boom
        forward from the fin near its top.
     E4 "SUPER-ETENDARD MODERNISE - illustration.svg" - side silhouette: the tailplane on the fin.
     C6 above (an SE on Clemenceau's deck, wings folded, 1988).
     en.wikipedia "Dassault-Breguet Super Etendard": 14.31 x 9.6 x 3.86 m; the SEM's changes are
        radar, cockpit, avionics and weapons (nothing in the outline).
   VARIANTS: se (e80) and sem (e90) differ ONLY in the finish sampled off E3 and E2.  No outline
     difference between the two was found in the references; the tanks, hook and boom are drawn on
     both because E1 (SEM period), E2 (SEM) and E3 (SE, 1988) show them on both.
   PUBLISHED / MEASURED: 14.30 x 9.56 x 4.15 m against 14.31 x 9.6 x 3.86.  HEIGHT 0.29 m OVER: E0's
     fin top stands 3.27 m over its belly line, and E2's ratios put the belly 0.88 m up; the
     published 3.86 m would need a 0.59 m clearance.  E2 is a three-quarter view from slightly
     above, which overstates the depth; NOT CONFIRMED, and nothing was squashed.
   RECOGNITION: the drooped pointed nose with its black radome (E0, E2, E3); the half-round side
     intakes ahead of the mid wing (E0, E2); the 45 deg swept wing, 5 deg anhedral (E0); the
     tailplane set on the fin, the fin's swept leading edge and the boom ahead of it (E0, E3, E4);
     the jet pipe standing out of the tail (E2, E3); two underwing tanks (E1-E3); the stowed hook
     (E1); single wheels, the long nose leg (E1, E2).
   NOT CONFIRMED: the section shapes; the canopy's glazing line; the intake and trunk shape; the
     tank size (3.6 m x 0.48 m) and pylon (D plan Y 1.63); the main-leg geometry; the hook's stowed
     line (E1 shows it lowered); the boom's length (E0 side).  NOT DRAWN: the refuelling probe
     (retracted on the ground; E1 shows it out in flight), Exocet, ASMP, markings.

   ------------------------------------------------------------------ CROTALE NG (Armee de l'Air)
   WHAT IT IS ON: the row is the air force's airfield-defence Crotale NG ("belongs to the air force
     and sits on airfields").  K3 shows that fire unit on parade in 2021: the shelter with the
     turret on a full trailer - a turntable front axle with twin tyres and a rear tandem pair, three
     axles (the row's own spec says wheels: 3) - towed behind a Renault Kerax 6x6 that carries a 20 ft
     container.  The fire unit is the trailer; it is drawn alone, with its drawbar.  No hero chassis
     in js/hero is this vehicle (fr_armour2.js's VAB is not; that file leaves this row undrawn for
     the same reason), so nothing was reused.  THE KERAX AND ITS CONTAINER ARE NOT DRAWN: they are
     the tow and a separate load, not the fire unit; whether the unit should show the truck too is
     the reviewer's call.
   REFERENCES: K1 "Crotale NG P1220851.jpg" (Paris Air Show 2007, head on: the turret - search
     radar box on its column, the tracking dish with the tripod feed, the TV/IR head on its left,
     two launchers of 2 x 2 VT-1 containers with blue bands); K2 "Crotale NG NTW 7 8 93.jpg" (head
     on, over the shelter's rear face: THE TURRET SCALE, the shelter's width taken as 2.44 m ->
     412 px/m: container 0.21 m, dish 0.90 m, radar box 1.0 x 0.63 m, radar top 2.37 m over the
     roof); K3 "Camion Crotale - Armee de l'air (14 juillet 2021).jpg" (Commons title with
     e-acute: the trailer, the ladder at the left front, the louvred panel on the left side, the
     green-grey sampled #726e63); K4 "Crotale p1040750.jpg" (the turret from the right front: the
     containers' length against the dish, the launcher frames).  en.wikipedia "Crotale (missile)".
   PUBLISHED / MEASURED: no published figure for the trailer or the shelter was found.  6.68 x 2.84
     (over the launchers; shelter 2.44) x 5.48 m (radar top; shelter roof 3.12).  The row's spec
     (6.5 x 2.7 x 3.2) is the old generic model's, not a published figure.
   NOT CONFIRMED (proportion or judgement): THE SHELTER'S WIDTH 2.44 m (the scale of every turret
     part); its length 4.9 m, height 1.8 m and the front step, read off K3's three-quarter view by
     ratio to its width; the tyres (0.94 m) and the axle places (1.70, -1.20, -2.20); the drawbar; the
     containers' length (2.30 m, K4 by ratio to the dish); the turret's place on the roof; the
     raised angle of the launchers (0.52 rad, not seen in any reference).
   NODES: "turret" (origin on the roof at the ring, the dish along +X), "podelev" inside it at the
     launcher trunnion (userData.el 0.52, userData.cells the eight container mouths, as the Roland
     in eu_sams.js), "roadwheel" one per axle (both sides' twin tyres), "hull".

   ------------------------------------------------------------------ EDIC
   WHAT IS DRAWN: the row is the 1959 EDIC (L 9091), but the only photographs found are of the
     third group (EDIC III, 1987: Sabre L9051, and the export Sour and Karabane, same design); no
     photograph or drawing of the first or second group was found.  The EDIC III is drawn, to its
     published 59 x 11.6 x 1.7 m; the first groups are published 59.0 x 11.9 x 1.35 m ("193 ft 5 in
     x 39 ft 2 in x 4 ft 5 in") and en.wikipedia describes the same layout for all groups (bow ramp,
     large aft superstructure).  NOT CONFIRMED that the 1959 craft looked like this in detail.
   REFERENCES: L1 "EDIC Sabre.JPG" (L9051, from the port bow, ramp lowered: the vehicle well with
     its low coaming and rails, the high bow walls beside the ramp, the covered crane at the port
     forward corner, the aft superstructure with the wheelhouse and bridge wings, the mast, rafts);
     L2 "USMC-13915.jpg" (Karabane beached: the ramp and bow walls; its ramp gantry is NOT drawn -
     Sabre has none); L3 "U.S. Coast Guard cutters sail with Lebanese vessel 220727-A-KS490-1022.jpg"
     (Sour bow-on, long lens: AT ITS BOW SCALE, 12 m beam = 29.2 px/m and the camera 1.25 m up, the
     ramp and bow walls 3.3 m, the deckhouse roof 3.3 m, the wheelhouse 5.0 m wide and its roof
     5.2 m, the mast top 10.2 m - lower bounds, the superstructure being 45 m farther than the bow);
     en.wikipedia "Engin de debarquement d'infanterie et de chars" (figures above, 2 x 20 mm).
   PUBLISHED / MEASURED: 59.0 x 11.60 x 11.9 m (keel -1.7 to the mast top) against 59 x 11.6, 1.7 m
     draught.  Waterline z = 0.
   NOT CONFIRMED: every superstructure station (deckhouse X -28.5 to -9.0, wheelhouse -16.5 to
     -10.5) read off L1's oblique view; all heights (L3, above); the bow's run-up and the chine; the
     crane; rafts; rails.  NOT DRAWN: the two 20 mm and the machine guns (not identified in L1),
     the lowered ramp (it is drawn raised, closing the bow), markings and the pennant number.

   ------------------------------------------------------------------ CTM
   REFERENCES: T1 "Chaland de transport de materiel recadre.png" (Commons title with accents; CTM 29,
     second series, near side-on, starboard: THE CTM TABLE at the published 23.8 m = 928 px, 39.0 px/m:
     X = 11.9 - (px - 138) / 39.0, Z = (518 - py) / 39.0): the raked raised ramp (top 2.74 m at the
     bow, toe at the waterline), the wing walls (tops 2.46 m forward to 2.20 aft), the lower after
     deck (1.62 m) and the wheelhouse (roof 3.8 m), two ports in the side, the rails.  T2 "Lanester -
     56600 - 2021.06.12 - Marine Nationale - "CTM 15" (c) Anthony Levrot.jpg" (Commons title with
     guillemets; CTM 15, first series 1972, from the port quarter: the same hull, the square
     wheelhouse aft with its door and windows, the pole mast with the radar, the stern winch).
     T3 "Chaland de Transport de Materiel mg 6045.jpg" (CTM 29 beside a frigate).  Published (eras.js,
     facts.js): 23.8 x 6.35 m, 150 t.
   PUBLISHED / MEASURED: 23.80 x 6.38 (hull 6.35; rails) x 7.6 m (keel -1.2 to the mast top 6.4).
   NOT CONFIRMED: the draught (keel -1.2 m), the well's wall thickness, the wheelhouse width (2.2 m)
     and its place on the centreline, the mast height (6.4 m, T2 by eye).  NOT DRAWN: the two
     12.7 mm (not seen), markings, the hull number.

   PAINT: plain, no roundels, codes, unit badges, pennant or hull numbers.  Team colour (C.team):
     chordwise bands on the outer wings of the jets, two strips on the shelter roof, two on each
     wheelhouse roof.
   ENGINE (js/damage3d.js, not edited): the jets classify as "jet" and the craft as "ship" by
     layer.  fra_e00_spaag takes the spaag default "rear"; the fire unit is a trailer and has no
     engine (its tow, the Kerax, is not drawn) - whether to list it is the reviewer's call.
   AS DRAWN (tools/model3d/dump.js; L x W x H; tris; draw calls):
     fra_e60_cfighter 16.79 x 10.94 x 5.40 m; 6006; 11.
     fra_e80_cfighter, fra_e90_cfighter 14.30 x 9.56 x 4.15 m; 5366; 10.
     fra_e00_spaag 6.68 x 2.84 x 5.48 m; 8720; 14.
     fra_e50_lst 59.00 x 11.60 x 11.90 m; 1044; 6 (DETAIL_E).
     fra_ctm 23.80 x 6.38 x 7.60 m; 616; 6 (DETAIL_C).
   DETAIL PASS (2026-11), the two craft only: the boot-topping and rubbing strakes, scuttles and
     ports, doors, rails on the side decks, the stern and the wheelhouse roofs, bitts, bollards and
     fairleads, the kedge anchor (EDIC), ladders, vents, exhausts (CTM), whips, navigation lights,
     searchlights, the ramp hinges, the deck seams, and a weathered plate texture on the
     superstructure.  Fittings typical, NOT CONFIRMED one by one.  The hulls stay the
     box sections the craft have (flat-bottomed landing craft, published beam to the chine).
   Model space: +X nose / bow / drawbar, +Y port, +Z up, metres; aircraft and the trailer stand on
   z = 0; the craft float with the waterline at z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ======================================================================= shared helpers */
var HeroFrNavalKit = (function () {
  "use strict";
  var K = HeroEuSamKit, PI = Math.PI, TAU = PI * 2;
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function avg(r) {
    var c = [0, 0, 0], i;
    for (i = 0; i < r.length; i++) { c[0] += r[i][0]; c[1] += r[i][1]; c[2] += r[i][2]; }
    return [c[0] / r.length, c[1] / r.length, c[2] / r.length];
  }
  /* a smooth skin through rings of equal count (closed: the ring wraps); faces turned outward
     from the rings' own centre line; capA / capB fan the first / last ring flat */
  function skin(bin, rings, closed, capA, capB) {
    var m = rings.length, n = rings[0].length, seg = closed ? n : n - 1, F = [], i, j, k, s = 0, f, a, b, c, fn, ax;
    var C = rings.map(avg), N = rings.map(function (r) { return r.map(function () { return [0, 0, 0]; }); });
    function P(q) { return rings[q[0]][q[1]]; }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % n;
      F.push([[i, j], [i, k], [i + 1, k]], [[i, j], [i + 1, k], [i + 1, j]]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = P(f[0]); b = P(f[1]); c = P(f[2]);
      fn = cross(sub(b, a), sub(c, a));
      ax = [(C[f[0][0]][0] + C[f[2][0]][0]) / 2, (C[f[0][0]][1] + C[f[2][0]][1]) / 2, (C[f[0][0]][2] + C[f[2][0]][2]) / 2];
      s += dot(fn, sub([(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3], ax));
    }
    var flip = s < 0;
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = P(f[0]); b = P(f[1]); c = P(f[2]);
      fn = cross(sub(b, a), sub(c, a));
      if (flip) fn = [-fn[0], -fn[1], -fn[2]];
      for (k = 0; k < 3; k++) { var q = N[f[k][0]][f[k][1]]; q[0] += fn[0]; q[1] += fn[1]; q[2] += fn[2]; }
    }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var o = flip ? [f[0], f[2], f[1]] : f;
      a = P(o[0]); b = P(o[1]); c = P(o[2]);
      fn = cross(sub(b, a), sub(c, a));
      if (dot(fn, fn) < 1e-14) continue;
      bin.tri(a, b, c, unit(N[o[0][0]][o[0][1]]), unit(N[o[1][0]][o[1][1]]), unit(N[o[2][0]][o[2][1]]));
    }
    function cap(ri, rj) {
      var r = rings[ri], cc = C[ri], dir = sub(C[ri], C[rj]), t, p0, p1, nn;
      for (j = 0; j < seg; j++) {
        p0 = r[j]; p1 = r[(j + 1) % n];
        nn = cross(sub(p0, cc), sub(p1, cc));
        if (dot(nn, nn) < 1e-14) continue;
        if (dot(nn, dir) < 0) { t = p0; p0 = p1; p1 = t; }
        bin.tri(cc, p0, p1);
      }
    }
    if (capA && m > 1) cap(0, 1);
    if (capB && m > 1) cap(m - 1, m - 2);
  }
  /* a superellipse section at x: half width w at height zw, top zt, bottom zb; angles a0..a1
     (0 = +Y side, PI/2 = top); n steps, inclusive when open */
  function seRing(x, w, zt, zb, zw, e, n, a0, a1, yc, closed) {
    var r = [], i, t, cy, sz, cnt = closed ? n : n + 1;
    for (i = 0; i < cnt; i++) {
      t = a0 + (a1 - a0) * i / n;
      cy = Math.cos(t); sz = Math.sin(t);
      r.push([x, (yc || 0) + w * (cy < 0 ? -1 : 1) * Math.pow(Math.abs(cy), e),
              zw + (sz >= 0 ? (zt - zw) : (zw - zb)) * (sz < 0 ? -1 : 1) * Math.pow(Math.abs(sz), e)]);
    }
    return r;
  }
  /* a fuselage loft from stations [x, zt, zb, w, zw, e]: upper half (port side, over the top, to
     starboard) into `up`, the lower half into `lo` (the same Bin for one colour); caps into `cap` */
  function fuselage(up, lo, cap, ST, n, capA, capB) {
    var U = [], L = [], R = [], i, s;
    for (i = 0; i < ST.length; i++) {
      s = ST[i];
      U.push(seRing(s[0], s[3], s[1], s[2], s[4], s[5], n, 0, PI));
      L.push(seRing(s[0], s[3], s[1], s[2], s[4], s[5], n, PI, TAU));
      R.push(seRing(s[0], s[3], s[1], s[2], s[4], s[5], 2 * n, 0, TAU, 0, true));
    }
    skin(up, U, false);
    skin(lo, L, false);
    if (capA) capOnly(cap, R[0], R[1]);
    if (capB) capOnly(cap, R[R.length - 1], R[R.length - 2]);
    return R;
  }
  function capOnly(bin, r, other) {
    var cc = avg(r), dir = sub(cc, avg(other)), j, p0, p1, nn, t, n = r.length;
    for (j = 0; j < n; j++) {
      p0 = r[j]; p1 = r[(j + 1) % n];
      nn = cross(sub(p0, cc), sub(p1, cc));
      if (dot(nn, nn) < 1e-14) continue;
      if (dot(nn, dir) < 0) { t = p0; p0 = p1; p1 = t; }
      bin.tri(cc, p0, p1);
    }
  }
  /* an aerofoil lofted spanwise through stations {s, le, te, t, h, pad}: horizontal (s along Y,
     h the chord plane's z) or vert (s along Z, h the plane's y). Upper half into `up`, lower into
     `lo`; the outer end capped. */
  function foilT(xc) { return Math.pow(xc, 0.75) * (1 - xc) / 0.3027; }
  function surface(up, lo, sts, vert, tipCap) {
    var KC = 9, U = [], L = [], i, k, st, xc, th, X, pu, pl, R = [];
    function pt(st, X, d) { return vert ? [X, st.h + d, st.s] : [X, st.s, st.h + d]; }
    for (i = 0; i < sts.length; i++) {
      st = sts[i]; pu = []; pl = [];
      for (k = 0; k <= KC; k++) {
        xc = (1 - Math.cos(PI * k / KC)) * 0.5;
        th = (k === 0 || k === KC) ? 0 : Math.max(0.002, st.t * 0.5 * foilT(xc)) + (st.pad || 0);
        X = st.le - xc * (st.le - st.te);
        pu.push(pt(st, X, th));
        pl.push(pt(st, X, -th));
      }
      U.push(pu); L.push(pl.slice().reverse());
      R.push(pu.concat(pl.slice(1, KC).reverse()));
    }
    skin(up, U, false);
    skin(lo, L, false);
    if (tipCap) capOnly(up, R[R.length - 1], R[R.length - 2]);
  }
  function mirrorSt(sts) { return sts.map(function (q) { var c = {}, k; for (k in q) c[k] = q[k]; c.s = -q.s; return c; }); }
  var I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  function at(bin, x, y, z, R) { return new K.XF(bin, R || I3, [x, y, z]); }
  /* a wheel at (x, y, z) on the Y axis through the kit's tyre (rub, paint rim, dark hub) */
  function wheel(B, x, y, z, r, w, s, rim) {
    K.tyre({ rub: at(B.rub, x, 0, z), paint: at(B.paint, x, 0, z), dark: at(B.dark, x, 0, z) }, y, r, w, s, rim);
  }
  return { K: K, skin: skin, seRing: seRing, fuselage: fuselage, capOnly: capOnly, surface: surface, mirrorSt: mirrorSt,
           at: at, I3: I3, wheel: wheel, avg: avg };
})();

/* ===================================================== F-8E(FN) Crusader (fra_e60_cfighter) */
var HeroCrusaderFN = (function () {
  "use strict";
  var KK = HeroFrNavalKit, K = KK.K, D2R = Math.PI / 180;
  /* light gull grey over white (C1, C4, C5); the radome black (C1-C5) */
  var PAINT = { key: "frnav_f8", base: "#b3b5b0", blots: [["#babcb7", 7, 50], ["#aaaca7", 7, 45]], seed: 1964 };
  /* FUSELAGE [x, zt, zb, w, zw, e] off D (side scan for zt/zb, plan scan for w), ground z = 0 */
  var FUS = [
    [7.20, 2.72, 1.35, 0.64, 2.00, 0.80], [6.85, 2.74, 1.30, 0.62, 1.98, 0.80], [6.45, 2.74, 1.24, 0.62, 1.95, 0.80],
    [6.04, 2.75, 1.21, 0.64, 1.95, 0.80], [5.23, 2.78, 1.16, 0.74, 1.95, 0.78], [4.41, 3.02, 1.11, 0.81, 1.95, 0.76],
    [3.60, 3.08, 1.06, 0.84, 1.95, 0.76], [2.79, 3.00, 1.03, 0.85, 1.95, 0.76], [2.00, 2.96, 0.95, 0.85, 1.92, 0.76],
    [1.16, 2.94, 0.94, 0.85, 1.90, 0.76], [0.00, 2.92, 0.89, 0.85, 1.88, 0.76], [-1.28, 2.88, 0.83, 0.85, 1.85, 0.76],
    [-2.50, 2.82, 0.80, 0.85, 1.82, 0.76], [-3.70, 2.72, 0.82, 0.85, 1.78, 0.78], [-4.60, 2.60, 0.84, 0.83, 1.72, 0.80],
    [-5.40, 2.48, 0.85, 0.77, 1.66, 0.82], [-6.20, 2.33, 0.85, 0.71, 1.59, 0.84], [-7.00, 2.15, 0.86, 0.66, 1.50, 0.86],
    [-7.60, 2.05, 0.87, 0.63, 1.45, 0.88], [-8.11, 1.96, 0.85, 0.61, 1.40, 0.90]];
  /* CANOPY [x, top, sill, w] (D side: windscreen base x 6.95, crown 3.22, into the spine at 4.3) */
  var CAN = [[6.95, 2.76, 2.70, 0.20], [6.60, 2.98, 2.72, 0.40], [6.20, 3.14, 2.74, 0.46], [5.60, 3.22, 2.76, 0.47],
             [5.00, 3.21, 2.78, 0.46], [4.60, 3.15, 2.86, 0.40], [4.30, 3.08, 2.98, 0.25]];
  /* WING (D plan scan) [Y, LE, TE]: the dogtooth at Y 3.16-3.17; chord plane z 3.0 at the root,
     6.5 deg anhedral (D front) */
  var WZ = 3.00, TANH = Math.tan(6.5 * D2R);
  var WING = [[0.30, 1.75, -3.45], [0.85, 1.40, -3.45], [1.52, 0.63, -3.69], [2.22, -0.15, -3.94], [2.93, -0.94, -4.21],
              [3.16, -1.19, -4.28], [3.17, -0.90, -4.28], [3.40, -1.14, -4.36], [4.10, -1.98, -4.63], [4.57, -2.56, -4.80],
              [5.04, -3.13, -4.96], [5.40, -3.56, -5.05], [5.47, -3.80, -4.95]];
  function wz(y) { return WZ - Math.max(0, Math.abs(y) - 0.85) * TANH; }
  /* STABILATOR (D plan, front) [Y, LE, TE], root z 1.35, 6 deg dihedral */
  var SZ = 1.35, TDI = Math.tan(6 * D2R);
  var STAB = [[0.45, -5.20, -7.55], [0.80, -5.55, -7.55], [2.80, -7.51, -7.98], [2.86, -7.70, -7.96]];
  /* FIN (D side) [z, LE, TE] */
  var FIN = [[2.30, -3.60, -7.95], [2.85, -4.20, -7.72], [3.35, -4.95, -7.82], [3.93, -5.76, -8.08], [4.54, -6.57, -8.36],
             [5.15, -7.39, -8.63], [5.34, -7.70, -8.70], [5.40, -7.92, -8.71]];
  /* GEAR (D side and front): nose X 3.79 r 0.28; mains X -1.99, r 0.345, Y +/-1.60 */
  var NX = 3.79, NR = 0.28, MX = -1.99, MR = 0.345, MY = 1.60;

  function body(B) {
    var s, i;
    KK.fuselage(B.paint, B.under, B.paint, FUS, 14, false, true);
    /* the intake lip (rolled in) and the dark duct behind it */
    var f0 = FUS[0], outer = KK.seRing(f0[0], f0[3], f0[1], f0[2], f0[4], f0[5], 28, 0, Math.PI * 2, 0, true);
    var inner = KK.seRing(f0[0] - 0.04, f0[3] - 0.07, f0[1] - 0.07, f0[2] + 0.07, f0[4], f0[5], 28, 0, Math.PI * 2, 0, true);
    var deep = KK.seRing(5.9, 0.42, 2.45, 1.45, 1.95, 0.8, 28, 0, Math.PI * 2, 0, true);
    KK.skin(B.under, [outer, inner], true);
    KK.skin(B.dark, [inner, deep], true, false, true);
    /* the black radome over the mouth (C1-C5): a lathe on the nose axis z 2.22 */
    K.lathe(KK.at(B.dark, 0, 0, 2.22), [[8.08, 0.0], [7.98, 0.10], [7.85, 0.19], [7.69, 0.28], [7.50, 0.37], [7.30, 0.44], [7.10, 0.47], [6.95, 0.46]], 20);
    /* canopy glass and the windscreen arch */
    var CR = CAN.map(function (c) { return KK.seRing(c[0], c[3], c[1], c[2], c[2], 0.85, 12, 0, Math.PI); });
    KK.skin(B.glass, CR, false);
    var arch = KK.seRing(6.50, 0.43, 3.04, 2.73, 2.73, 0.85, 12, 0, Math.PI);
    for (i = 0; i < arch.length - 1; i++) K.bar(B.dark, [arch[i][0], arch[i][1] * 1.03, arch[i][2] + 0.01], [arch[i + 1][0], arch[i + 1][1] * 1.03, arch[i + 1][2] + 0.01], 0.035);
    /* the afterburner nozzle at the end (D, C1) */
    K.cyl(B.hot, [-8.02, 0, 1.40], [-8.16, 0, 1.40], 0.50, 0.48, 22);
    K.cyl(B.dark, [-8.10, 0, 1.40], [-8.18, 0, 1.40], 0.40, 0.40, 18);
    /* the long fairings on the rear flanks (D plan and side: x -5.4 to -8.0, z 1.8-2.3) */
    for (s = -1; s <= 1; s += 2) {
      var PR = [];
      [[-5.40, 0.01], [-5.70, 0.10], [-6.30, 0.13], [-7.40, 0.13], [-7.90, 0.10], [-8.04, 0.04]].forEach(function (p) {
        PR.push(KK.seRing(p[0], p[1], 2.05 + p[1] * 2.0, 2.05 - p[1] * 2.0, 2.05, 1, 10, 0, Math.PI * 2, s * 0.78, true));
      });
      KK.skin(B.paint, PR, true, false, true);
      /* the canted ventral fins (D side x -2.8 to -6.4, 0.3 m deep; D front about 40 deg) */
      K.fin(new K.XF(B.under, K.roll(s * 40 * D2R), [0, s * 0.42, 0.90]),
            [[-2.82, 0.02], [-3.29, -0.30], [-6.10, -0.22], [-6.42, 0.02]], 0.04);
      /* the fuselage missile rails (D side and plan: x 4.6 to 1.0, z 1.55) */
      K.box(B.paint, 1.00, 4.60, s > 0 ? 0.80 : -0.98, s > 0 ? 0.98 : -0.80, 1.50, 1.60);
    }
  }
  function wings(B) {
    var w = WING.map(function (q) { return { s: q[0], le: q[1], te: q[2], t: (q[1] - q[2]) * 0.05, h: wz(q[0]) }; });
    KK.surface(B.paint, B.under, w, false, true);
    KK.surface(B.paint, B.under, KK.mirrorSt(w), false, true);
    var st = STAB.map(function (q) { return { s: q[0], le: q[1], te: q[2], t: (q[1] - q[2]) * 0.045, h: SZ + (q[0] - 0.45) * TDI }; });
    KK.surface(B.paint, B.under, st, false, true);
    KK.surface(B.paint, B.under, KK.mirrorSt(st), false, true);
    var fn = FIN.map(function (q) { return { s: q[0], le: q[1], te: q[2], t: Math.min(0.17, (q[1] - q[2]) * 0.045), h: 0 }; });
    KK.surface(B.paint, B.paint, fn, true, true);
    /* team colour: a chordwise band over each outer wing, proud of the skin */
    var band = [4.25, 4.45].map(function (y) {
      var a = -1.98 - (y - 4.10) * (0.58 / 0.47), b = -4.63 - (y - 4.10) * (0.17 / 0.47);
      return { s: y, le: a + 0.02, te: b - 0.02, t: (a - b) * 0.05, pad: 0.012, h: wz(y) };
    });
    KK.surface(B.team, B.team, band, false, true);
    KK.surface(B.team, B.team, KK.mirrorSt(band), false, true);
  }
  /* R.550 Magic (published 2.72 m x 0.157 m, 0.66 m span): one on the STARBOARD rail, as C1 (1983)
     and C6 (1988) show it; the port rail is drawn empty (no photograph of that side) */
  function magic(B) {
    var L = 2.72, R = 0.0785, xt = 1.62, y = -1.06, z = 1.45, k, Rr;
    K.lathe(KK.at(B.rnd, xt, y, z), [[0, R * 0.9], [0.05, R], [L - 0.30, R], [L - 0.14, R * 0.75], [L - 0.04, R * 0.35], [L, 0.004]], 14);
    K.cyl(B.dark, [xt - 0.01, y, z], [xt + 0.03, y, z], R * 0.7, R * 0.7, 10);
    for (k = 0; k < 4; k++) {
      Rr = K.roll(Math.PI / 4 + k * Math.PI / 2);
      K.fin(new K.XF(B.rnd, Rr, [xt, y, z]), [[L - 0.62, R], [L - 0.42, R], [L - 0.42, 0.33], [L - 0.52, 0.33]], 0.01);
      K.fin(new K.XF(B.rnd, Rr, [xt, y, z]), [[L - 0.40, R], [L - 0.24, R], [L - 0.27, 0.26], [L - 0.36, 0.26]], 0.01);
      K.fin(new K.XF(B.rnd, Rr, [xt, y, z]), [[0.02, R], [0.38, R], [0.30, 0.33], [0.06, 0.33]], 0.012);
    }
    K.box(B.dark, xt + 0.6, xt + 2.0, y + 0.06, y + 0.14, z + 0.02, z + 0.05);
  }
  function gear(B) {
    var s;
    /* nose leg under the mouth to a single wheel (D side and front) */
    K.cyl(B.metal, [NX + 0.10, 0, 1.15], [NX, 0, NR + 0.10], 0.06, 0.05, 8);
    K.bar(B.metal, [NX + 0.70, 0, 1.18], [NX + 0.05, 0, NR + 0.45], 0.05);
    KK.wheel(B, NX, 0, NR, NR, 0.17, 1, 0.13);
    K.box(B.paint, NX - 0.45, NX + 0.65, 0.20, 0.22, 0.75, 1.20);
    K.box(B.paint, NX - 0.45, NX + 0.65, -0.22, -0.20, 0.75, 1.20);
    for (s = -1; s <= 1; s += 2) {
      /* mains: the leg out of the fuselage side to the wheel, a drag strut (D, C1, C5) */
      K.cyl(B.metal, [MX + 0.25, s * 0.80, 1.00], [MX, s * (MY - 0.10), MR], 0.075, 0.065, 8);
      K.bar(B.metal, [MX - 0.70, s * 0.78, 0.98], [MX, s * (MY - 0.15), MR + 0.25], 0.05);
      KK.wheel(B, MX, s * MY, MR, MR, 0.22, s, 0.17);
      /* the leg door along the leg (C1, C5) */
      K.profY(new K.XF(B.paint, K.roll(s * 0.62), [0, s * 0.95, 0]), [[MX + 0.75, 0.95], [MX - 0.55, 0.95], [MX - 0.45, 0.45], [MX + 0.55, 0.45]], -0.012, 0.012);
    }
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { under: [0xdcddd6, 0.78, 0.06], metal: [0x8a8e90, 0.45, 0.55],
      hot: [0x3c3a37, 0.6, 0.5], rnd: [0xd9d9d2, 0.6, 0.1] });
    var g = K.group(THREE, "fra_e60_cfighter"), B;
    B = K.bins(T, ["paint", "under", "dark", "glass", "team", "hot", "rnd"]);
    body(B); wings(B); magic(B);
    K.flush(THREE, g, B);
    var gr = K.group(THREE, "gear");
    B = K.bins(T, ["paint", "dark", "rub", "metal"]);
    gear(B);
    K.flush(THREE, gr, B); g.add(gr);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* =========================== Super Etendard (fra_e80_cfighter) and Super Etendard Modernise (fra_e90_cfighter) */
var HeroSuperEtendard = (function () {
  "use strict";
  var KK = HeroFrNavalKit, K = KK.K, D2R = Math.PI / 180;
  /* VARIANTS: only the finish differs between the references of the two rows (E3 1988, E2 2009);
     the airframe, gear, tanks and hook are drawn the same */
  var VARIANTS = {
    se:  { key: "fra_e80_cfighter", paint: { key: "frnav_se", base: "#5d5e5c", blots: [["#656664", 8, 50], ["#555654", 8, 45]], seed: 1978 } },
    sem: { key: "fra_e90_cfighter", paint: { key: "frnav_sem", base: "#4b5661", blots: [["#535e69", 8, 50], ["#434d57", 8, 45]], seed: 1993 } }
  };
  /* FUSELAGE [x, zt, zb, w, zw, e]: side off D (19.29 px/m, X = 7.15 - (px - 258) / 19.29,
     Z = (308 - py) / 19.29), plan half widths off D (19.58 px/m) */
  var NOSE = [[7.15, 1.10, 1.08, 0.01, 1.09, 1.0], [6.95, 1.24, 0.97, 0.18, 1.10, 0.95], [6.70, 1.42, 0.93, 0.28, 1.14, 0.92],
              [6.45, 1.55, 0.92, 0.33, 1.18, 0.90]];
  var FUS = [[6.45, 1.55, 0.92, 0.33, 1.18, 0.90], [6.00, 1.64, 0.90, 0.40, 1.22, 0.88], [5.30, 1.75, 0.88, 0.46, 1.25, 0.85],
             [4.40, 1.80, 0.86, 0.47, 1.28, 0.85], [3.60, 1.95, 0.84, 0.52, 1.30, 0.82], [2.80, 2.20, 0.83, 0.62, 1.35, 0.80],
             [2.00, 2.26, 0.83, 0.74, 1.38, 0.80], [1.00, 2.28, 0.83, 0.82, 1.40, 0.78], [0.00, 2.28, 0.82, 0.84, 1.40, 0.78],
             [-1.20, 2.27, 0.80, 0.84, 1.40, 0.78], [-2.20, 2.27, 0.78, 0.80, 1.40, 0.80], [-3.20, 2.33, 0.82, 0.72, 1.45, 0.82],
             [-4.20, 2.37, 0.88, 0.60, 1.55, 0.85], [-5.20, 2.38, 0.96, 0.52, 1.65, 0.88], [-6.02, 2.36, 1.14, 0.46, 1.75, 0.90]];
  var CAN = [[5.30, 1.80, 1.74, 0.20], [5.00, 1.98, 1.76, 0.36], [4.60, 2.22, 1.78, 0.42], [4.20, 2.32, 1.80, 0.43],
             [3.70, 2.34, 1.84, 0.42], [3.30, 2.30, 1.98, 0.35], [2.90, 2.26, 2.12, 0.20]];
  /* INTAKES (D side x 318-342, plan outer face Y 0.92 from X 3.47): half-round boxes on the
     fuselage sides ahead of the wing root */
  var IX = 3.60, IZ0 = 1.30, IZ1 = 2.06;
  /* WING (D plan) [Y, LE, TE], mid wing z 1.55 at the root (D front), 5 deg anhedral (D front) */
  var WZ = 1.55, TANH = Math.tan(5 * D2R);
  var WING = [[0.40, 1.70, -2.40], [0.80, 1.45, -2.45], [1.12, 1.23, -2.50], [1.53, 0.77, -2.66], [2.15, 0.05, -3.06], [2.76, -0.66, -3.47],
              [3.37, -1.17, -3.88], [3.98, -1.84, -4.29], [4.60, -2.55, -4.70], [4.78, -2.95, -4.72]];
  function wz(y) { return WZ - Math.max(0, Math.abs(y) - 0.80) * TANH; }
  /* TAILPLANE on the fin (D side z 2.55, D front level) [Y, LE, TE] */
  var SZ = 2.55;
  var STAB = [[0.05, -4.25, -6.10], [0.41, -4.39, -6.18], [1.02, -5.16, -6.64], [1.63, -5.87, -7.10], [1.84, -6.20, -7.15]];
  /* FIN (D side) [z, LE, TE] */
  var FIN = [[2.10, -2.10, -6.05], [2.44, -2.49, -6.12], [2.75, -3.11, -6.22], [3.30, -4.20, -6.45], [3.80, -5.20, -6.65],
             [4.10, -5.85, -6.85], [4.15, -6.10, -6.85]];
  /* GEAR (E1, E2: see the header): nose X 4.18 r 0.19; mains X -0.46, Y +/-1.75, r 0.29 */
  var NX = 4.18, NR = 0.19, MX = -0.46, MY = 1.75, MR = 0.29;

  function body(B) {
    var s, i;
    KK.fuselage(B.dark, B.dark, B.dark, NOSE, 12, false, false);
    KK.fuselage(B.paint, B.paint, B.paint, FUS, 12, false, true);
    var CR = CAN.map(function (c) { return KK.seRing(c[0], c[3], c[1], c[2], c[2], 0.85, 12, 0, Math.PI); });
    KK.skin(B.glass, CR, false);
    var arch = KK.seRing(4.95, 0.37, 2.01, 1.76, 1.76, 0.85, 10, 0, Math.PI);
    for (i = 0; i < arch.length - 1; i++) K.bar(B.dark, [arch[i][0], arch[i][1] * 1.04, arch[i][2] + 0.01], [arch[i + 1][0], arch[i + 1][1] * 1.04, arch[i + 1][2] + 0.01], 0.03);
    /* the jet pipe standing out of the tail (E2, E3) */
    K.cyl(B.hot, [-5.95, 0, 1.75], [-6.30, 0, 1.75], 0.44, 0.42, 20);
    K.cyl(B.dark, [-6.20, 0, 1.75], [-6.32, 0, 1.75], 0.36, 0.36, 16);
    for (s = -1; s <= 1; s += 2) {
      /* the intakes: a half-round lip, a trunk fairing into the wing root, a dark mouth */
      var R = [];
      [[IX, 0.0], [IX - 0.05, 1.0], [IX - 0.60, 1.0], [0.6, 0.6], [-0.6, 0.1]].forEach(function (p, k) {
        var h = (IZ1 - IZ0) / 2 * (k === 0 ? 1 : p[1] === 1.0 ? 1 : Math.max(0.15, p[1])), zc = (IZ0 + IZ1) / 2;
        R.push(KK.seRing(p[0], 0.22 * (k === 0 ? 1 : p[1] === 1.0 ? 1 : Math.max(0.2, p[1])), zc + h, zc - h, zc, 0.9, 16, 0, Math.PI * 2, s * 0.70, true));
      });
      KK.skin(B.paint, R.slice(1), true);
      KK.skin(B.paint, [R[0], R[1]], true);
      K.cyl(B.dark, [IX + 0.01, s * 0.70, (IZ0 + IZ1) / 2], [IX - 0.02, s * 0.70, (IZ0 + IZ1) / 2], 0.17, 0.17, 14);
      /* the hook stowed under the rear fuselage (E1 shows it lowered on the approach) */
    }
    K.bar(B.metal, [-3.70, 0, 0.84], [-5.55, 0, 0.92], 0.07);
    K.box(B.dark, -5.75, -5.50, -0.05, 0.05, 0.82, 0.95);
    /* the boom forward from the fin near its top (E3, E1 and D side z 3.58) */
    K.cyl(B.metal, [-3.10, 0, 3.58], [-4.95, 0, 3.58], 0.035, 0.05, 8);
  }
  function wings(B) {
    var w = WING.map(function (q) { return { s: q[0], le: q[1], te: q[2], t: (q[1] - q[2]) * 0.06, h: wz(q[0]) }; });
    KK.surface(B.paint, B.paint, w, false, true);
    KK.surface(B.paint, B.paint, KK.mirrorSt(w), false, true);
    var st = STAB.map(function (q) { return { s: q[0], le: q[1], te: q[2], t: (q[1] - q[2]) * 0.05, h: SZ }; });
    KK.surface(B.paint, B.paint, st, false, true);
    KK.surface(B.paint, B.paint, KK.mirrorSt(st), false, true);
    var fn = FIN.map(function (q) { return { s: q[0], le: q[1], te: q[2], t: Math.min(0.20, (q[1] - q[2]) * 0.05), h: 0 }; });
    KK.surface(B.paint, B.paint, fn, true, true);
    var band = [3.70, 3.90].map(function (y) {
      var a = -1.17 - (y - 3.37) * (0.67 / 0.61), b = -3.88 - (y - 3.37) * (0.41 / 0.61);
      return { s: y, le: a + 0.02, te: b - 0.02, t: (a - b) * 0.06, pad: 0.012, h: wz(y) };
    });
    KK.surface(B.team, B.team, band, false, true);
    KK.surface(B.team, B.team, KK.mirrorSt(band), false, true);
  }
  /* the two underwing tanks on the inboard pylons (E1, E2, E3); D plan puts the pylons at Y 1.63 */
  function tanks(B) {
    var s, y = 1.63, L = 3.60, R = 0.24, xt = -2.60, z;
    for (s = -1; s <= 1; s += 2) {
      z = wz(y) - 0.08 - 0.22 - R;
      K.lathe(KK.at(B.paint, xt, s * y, z), [[0, 0.02], [0.25, R * 0.62], [0.70, R * 0.97], [1.10, R], [2.50, R], [3.05, R * 0.82], [3.45, R * 0.45], [L, 0.02]], 14);
      K.profY(new K.XF(B.paint, KK.I3, [0, s * y, 0]), [[xt + 2.50, wz(y) - 0.06], [xt + 0.90, wz(y) - 0.06], [xt + 1.10, z + R], [xt + 2.40, z + R]], -0.04, 0.04);
    }
  }
  function gear(B) {
    var s;
    K.cyl(B.metal, [NX - 0.05, 0, 0.88], [NX, 0, NR + 0.10], 0.055, 0.045, 8);
    K.bar(B.metal, [NX - 0.55, 0, 0.86], [NX - 0.02, 0, NR + 0.30], 0.04);
    KK.wheel(B, NX, 0, NR, NR, 0.15, 1, 0.10);
    K.box(B.paint, NX - 0.50, NX + 0.40, 0.18, 0.20, 0.55, 0.86);
    for (s = -1; s <= 1; s += 2) {
      K.cyl(B.metal, [MX + 0.10, s * 1.45, wz(1.45) - 0.05], [MX, s * (MY - 0.12), MR], 0.07, 0.06, 8);
      K.bar(B.metal, [MX + 0.75, s * 1.30, wz(1.30) - 0.05], [MX, s * (MY - 0.15), MR + 0.30], 0.045);
      KK.wheel(B, MX, s * MY, MR, MR, 0.20, s, 0.15);
      K.profY(new K.XF(B.paint, KK.I3, [0, s * (MY - 0.32), 0]), [[MX + 0.45, wz(1.45) - 0.06], [MX - 0.40, wz(1.45) - 0.06], [MX - 0.30, MR + 0.25], [MX + 0.35, MR + 0.25]], -0.012, 0.012);
    }
  }
  function build(vk) {
    var V = VARIANTS[vk];
    return function (THREE, M, C) {
      var T = K.materials(THREE, C, V.paint, { metal: [0x7c8083, 0.45, 0.55], hot: [0x3a3835, 0.6, 0.5] });
      var g = K.group(THREE, V.key), B;
      B = K.bins(T, ["paint", "dark", "glass", "team", "hot", "metal"]);
      body(B); wings(B); tanks(B);
      K.flush(THREE, g, B);
      var gr = K.group(THREE, "gear");
      B = K.bins(T, ["paint", "dark", "rub", "metal"]);
      gear(B);
      K.flush(THREE, gr, B); g.add(gr);
      K.shadows(g);
      return g;
    };
  }
  return { se: build("se"), sem: build("sem") };
})();

/* ===================================================== Crotale NG air force fire unit, trailer (fra_e00_spaag) */
var HeroCrotaleNG = (function () {
  "use strict";
  var KK = HeroFrNavalKit, K = KK.K, TAU = Math.PI * 2;
  /* K3 and K4 (air force green-grey, sampled #726e63 / #767b70, taken a shade darker) */
  var PAINT = { key: "frnav_crotale", base: "#6a6c5c", blots: [["#727464", 9, 50], ["#626454", 9, 45]], seed: 2008 };
  /* TRAILER TABLE (K3; see NOT CONFIRMED) */
  var RT = 0.47, WT = 0.30, AXF = 1.70, AXR = [-1.20, -2.20], YT1 = 0.72, YT2 = 1.04;
  var XF0 = 2.25, XR0 = -2.85, HW = 1.22, ZB = 1.32, ZR = 3.12, XFB = 1.30, ZFB = 2.50;
  /* TURRET TABLE (K1, K2, K4 at the shelter's 2.44 m width: 412 px/m on K2) */
  var XT = -0.55, DR = 0.45, CL = 2.30, CR = 0.105, EL = 0.52;

  function chassis(B) {
    var s, i;
    /* frame, drawbar to the towing eye, the front turntable (K3) */
    K.box(B.dark, XR0 + 0.10, XF0, -0.50, -0.38, 0.95, 1.20);
    K.box(B.dark, XR0 + 0.10, XF0, 0.38, 0.50, 0.95, 1.20);
    K.bar(B.dark, [XF0 - 0.20, 0.45, 1.00], [3.70, 0, 0.82], 0.10);
    K.bar(B.dark, [XF0 - 0.20, -0.45, 1.00], [3.70, 0, 0.82], 0.10);
    K.cyl(B.dark, [3.70, -0.06, 0.82], [3.70, 0.06, 0.82], 0.10, 0.10, 12);
    K.cylZ(B.dark, AXF, 0, 1.00, 1.20, 0.75, 20);
    /* bed and the shelter: the tall box, the lower front box with the ladder (K3), the louvred
       panel on the left side and the grille on the rear face (K3, K2) */
    K.box(B.paint, XR0, XF0, -HW, HW, 1.20, ZB);
    K.box(B.paint, XR0, XFB, -HW, HW, ZB, ZR);
    K.box(B.paint, XFB, XF0, -HW, HW, ZB, ZFB);
    for (s = -1; s <= 1; s += 2) {
      if (s > 0) {
        K.box(B.dark, XR0 + 0.25, XR0 + 1.00, HW, HW + 0.01, 1.75, 2.75);
        for (i = 0; i < 6; i++) K.box(B.paint, XR0 + 0.25, XR0 + 1.00, HW, HW + 0.02, 1.85 + i * 0.15, 1.88 + i * 0.15);
      }
      /* corner castings along the roof edge and the bed (K2) */
      K.box(B.dark, XR0 - 0.02, XR0 + 0.14, s * HW - 0.08, s * HW + 0.08, ZR - 0.14, ZR + 0.02);
      K.box(B.dark, XFB - 0.14, XFB + 0.02, s * HW - 0.08, s * HW + 0.08, ZR - 0.14, ZR + 0.02);
      /* mudguards over the wheels */
      K.box(B.dark, AXF - 0.60, AXF + 0.60, s > 0 ? 0.55 : -1.22, s > 0 ? 1.22 : -0.55, 1.12, 1.16);
      K.box(B.dark, AXR[1] - 0.62, AXR[0] + 0.62, s > 0 ? 0.55 : -1.22, s > 0 ? 1.22 : -0.55, 1.12, 1.16);
      /* lamps at the rear */
      K.box(B.red, XR0 - 0.03, XR0, s * 1.00 - 0.10, s * 1.00 + 0.10, 1.22, 1.30);
    }
    K.box(B.dark, XR0 - 0.02, XR0 + 0.01, -0.90, 0.40, 1.60, 2.90);
    /* the ladder up the left front corner (K3) */
    for (i = 0; i < 2; i++) K.box(B.dark, XFB + 0.30 + i * 0.40, XFB + 0.34 + i * 0.40, HW, HW + 0.05, ZB, ZR + 0.10);
    for (i = 0; i < 9; i++) K.box(B.dark, XFB + 0.30, XFB + 0.74, HW + 0.02, HW + 0.05, ZB + 0.15 + i * 0.20, ZB + 0.18 + i * 0.20);
    K.box(B.team, XR0 + 0.20, XR0 + 0.75, 0.70, 1.05, ZR, ZR + 0.03);
    K.box(B.team, XR0 + 0.20, XR0 + 0.75, -1.05, -0.70, ZR, ZR + 0.03);
  }
  /* the turret (K1, K2, K4): the base ring, the central body with the tracking dish facing
     forward and the TV/IR head on its left, the column with the search radar box on top */
  function head(B) {
    K.cylZ(B.dark, 0, 0, 0, 0.22, 0.62, 22);
    K.box(B.paint, -0.55, 0.40, -0.48, 0.48, 0.22, 1.05);
    /* the tracking dish on its stalk: a shallow dish, the tripod feed */
    var DZ = 0.70, DX = 0.62;
    K.cyl(B.dark, [0.40, 0, DZ], [DX - 0.05, 0, DZ], 0.12, 0.12, 10);
    K.lathe(KK.at(B.paint, DX - 0.06, 0, DZ), [[0, 0.06], [0.06, DR * 0.75], [0.10, DR], [0.11, DR]], 22);
    K.cyl(B.dark, [DX + 0.40, 0, DZ], [DX + 0.46, 0, DZ], 0.05, 0.05, 8);
    for (var k = 0; k < 3; k++) {
      var a = Math.PI / 2 + k * TAU / 3;
      K.bar(B.dark, [DX + 0.08, Math.cos(a) * DR * 0.9, DZ + Math.sin(a) * DR * 0.9], [DX + 0.42, 0, DZ], 0.018);
    }
    K.box(B.dark, 0.20, 0.55, 0.42, 0.62, 0.95, 1.20);
    K.cyl(B.glass, [0.55, 0.52, 1.075], [0.57, 0.52, 1.075], 0.07, 0.07, 10);
    /* the column and the search radar (K2: 0.63 m tall, 1.0 m across, 2.37 m over the shelter) */
    K.box(B.paint, -0.40, -0.05, -0.18, 0.18, 1.05, 1.62);
    K.cylZ(B.dark, -0.22, 0, 1.62, 1.72, 0.14, 12);
    K.box(B.paint, -0.42, -0.02, -0.50, 0.50, 1.72, 2.36);
    K.box(B.dark, -0.025, -0.01, -0.36, 0.36, 1.98, 2.06);
  }
  /* the two launchers of four VT-1 containers in 2 x 2 (K1, K4) on their arms */
  function pod(B) {
    var cells = [], s, i, j, y, z, x0 = -1.15;
    for (s = -1; s <= 1; s += 2) {
      K.cylY(B.dark, 0, s * 0.46, s * 0.70, 0, 0.09, 10);
      K.box(B.paint, -0.22, 0.22, s > 0 ? 0.70 : -1.42, s > 0 ? 1.42 : -0.70, -0.36, -0.24);
      K.box(B.paint, -0.30, 0.10, s > 0 ? 0.74 : -1.38, s > 0 ? 1.38 : -0.74, -0.24, 0.30);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        y = s * (0.92 + i * 0.24); z = -0.12 + j * 0.24;
        K.cyl(B.rnd, [x0, y, z], [x0 + CL, y, z], CR, CR, 12);
        K.cyl(B.blue, [x0 + 0.62, y, z], [x0 + 0.70, y, z], CR + 0.004, CR + 0.004, 12, true, true);
        cells.push([x0 + CL, y, z, x0]);
      }
    }
    return cells;
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { red: [0x9a3326, 0.5, 0.1], rnd: [0x6f7262, 0.7, 0.1], blue: [0x3f7fb5, 0.6, 0.1] });
    var g = K.group(THREE, "fra_e00_spaag"), B, wg, tg, pg, s, ax, all = [AXF].concat(AXR);
    B = K.bins(T, ["paint", "dark", "glass", "team", "red"]);
    chassis(B);
    var hg = K.group(THREE, "hull"); K.flush(THREE, hg, B); g.add(hg);
    for (ax = 0; ax < all.length; ax++) {
      wg = K.group(THREE, "roadwheel", all[ax], 0, RT);
      B = K.wheelBins(T);
      for (s = -1; s <= 1; s += 2) { K.tyre(B, s * YT1, RT, WT, s, 0.24); K.tyre(B, s * YT2, RT, WT, s, 0.24); }
      K.cylY(B.dark, 0, -YT2, YT2, 0, 0.06, 8);
      K.flush(THREE, wg, B); g.add(wg);
    }
    tg = K.group(THREE, "turret", XT, 0, ZR);
    B = K.bins(T, ["paint", "dark", "glass"]); head(B); K.flush(THREE, tg, B);
    pg = K.group(THREE, "podelev", 0, 0, 0.62);
    B = K.bins(T, ["paint", "dark", "rnd", "blue"]);
    var cells = pod(B); K.flush(THREE, pg, B);
    pg.userData.el = EL; pg.userData.cells = cells;
    tg.add(pg); g.add(tg);
    K.shadows(g);
    return g;
  }
  return { build: build };
})();

/* ===================================================== EDIC landing craft (fra_e50_lst) and CTM (fra_ctm) */
var HeroFrLandingCraft = (function () {
  "use strict";
  var KK = HeroFrNavalKit, K = KK.K;
  /* a hull loft through stations [x, half beam, bottom z, top z]: flat bottom, a 0.35 m chine */
  function hull(bin, ST, ch) {
    var rings = ST.map(function (q) {
      var x = q[0], hb = q[1], zb = q[2], zt = q[3], c = Math.min(ch, (zt - zb) * 0.4, hb * 0.4);
      return [[x, -hb, zt], [x, -hb, zb + c], [x, -hb + c, zb], [x, hb - c, zb], [x, hb, zb + c], [x, hb, zt]];
    });
    K.loft(bin, rings);
  }
  function rail(B, pts, zt) {
    for (var i = 0; i + 1 < pts.length; i++) K.bar(B.dark, [pts[i][0], pts[i][1], zt], [pts[i + 1][0], pts[i + 1][1], zt], 0.04);
  }

  /* ---------------------------------------------------------------- EDIC (L1-L4) */
  var EDIC_P = { key: "frnav_edic", base: "#7f888a", blots: [["#879092", 9, 60], ["#778082", 9, 55]], seed: 1958 };
  /* hull: 59.0 m overall to the raised ramp, 11.6 m beam, 1.7 m draught (published, EDIC III) */
  var EH = [[-29.50, 5.45, -1.20, 1.50], [-29.00, 5.70, -1.60, 1.50], [-26.00, 5.80, -1.70, 1.50], [20.00, 5.80, -1.60, 1.50],
            [25.00, 5.80, -1.35, 1.50], [27.60, 5.60, -0.60, 1.50], [28.60, 5.20, 0.10, 1.50]];
  function edic(B) {
    var s, i;
    hull(B.paint, EH, 0.35);
    K.box(B.deck, -9.0, 27.9, -5.35, 5.35, 1.515, 1.54);
    for (s = -1; s <= 1; s += 2) {
      /* the low coaming along the vehicle well with its rails (L1), the high bow walls beside
         the ramp (L1, L3: their tops level with the ramp's, 3.3 m) */
      K.box(B.paint, -9.0, 27.9, s > 0 ? 5.45 : -5.78, s > 0 ? 5.78 : -5.45, 1.50, 1.85);
      K.box(B.paint, 26.4, 28.6, s > 0 ? 2.80 : -5.70, s > 0 ? 5.70 : -2.80, 0.10, 3.30);
      rail(B, [[-9.0, s * 5.62], [26.4, s * 5.62]], 2.85);
      rail(B, [[-9.0, s * 5.62], [26.4, s * 5.62]], 2.35);
      for (i = 0; i < 10; i++) K.bar(B.dark, [-8.5 + i * 3.6, s * 5.62, 1.85], [-8.5 + i * 3.6, s * 5.62, 2.85], 0.035);
      /* bitts along the well */
      for (i = 0; i < 3; i++) K.cylZ(B.dark, -4.0 + i * 12.0, s * 4.9, 1.53, 1.85, 0.12, 8);
    }
    /* the ramp, raised (L1 shows it lowered; the section the closed bow takes in L2, L3) */
    K.profY(B.paint, [[28.45, 0.20], [29.50, 3.30], [29.25, 3.35], [28.20, 0.25]], -2.80, 2.80);
    for (i = 0; i < 4; i++) K.profY(B.dark, [[28.50 + 0.25 * i, 0.4 + 0.75 * i], [28.62 + 0.25 * i, 0.4 + 0.75 * i], [28.70 + 0.25 * i, 0.6 + 0.75 * i], [28.58 + 0.25 * i, 0.6 + 0.75 * i]], -2.6, 2.6);
    /* the covered crane at the port forward corner of the well (L1) */
    K.cylZ(B.light, 24.6, 4.85, 1.85, 3.60, 0.30, 12);
    K.bar(B.light, [24.6, 4.85, 3.50], [26.2, 4.40, 5.10], 0.55);
    /* the aft superstructure (L1; heights L3): deckhouse, wheelhouse with the bridge wings, mast */
    K.box(B.light, -28.5, -9.0, -4.80, 4.80, 1.50, 3.30);
    K.box(B.dark, -9.03, -9.0, -4.0, 4.0, 2.10, 2.60);
    K.box(B.light, -16.5, -10.5, -2.50, 2.50, 3.30, 5.20);
    K.box(B.glass, -10.52, -10.45, -2.30, 2.30, 4.40, 4.85);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.glass, -15.8, -11.2, s > 0 ? 2.50 : -2.52, s > 0 ? 2.52 : -2.50, 4.40, 4.85);
      K.box(B.light, -11.6, -10.5, s > 0 ? 2.50 : -4.70, s > 0 ? 4.70 : -2.50, 3.30, 3.42);
      rail(B, [[-28.4, s * 4.75], [-9.1, s * 4.75]], 4.25);
      /* rafts in their canisters at the after end of the deckhouse roof (L1) */
      K.cyl(B.light, [-26.8, s * 3.6, 3.62], [-25.6, s * 3.6, 3.62], 0.30, 0.30, 10);
    }
    rail(B, [[-10.6, 4.70], [-10.6, -4.70]], 4.25);
    K.cylZ(B.dark, -13.5, 0, 5.20, 10.20, 0.10, 8);
    K.bar(B.dark, [-13.5, -1.30, 8.40], [-13.5, 1.30, 8.40], 0.06);
    K.box(B.dark, -13.9, -13.1, -0.40, 0.40, 6.90, 7.00);
    K.box(B.dark, -13.6, -13.4, -0.65, 0.65, 7.05, 7.20);
    K.box(B.team, -15.8, -14.2, -2.20, -1.20, 5.20, 5.23);
    K.box(B.team, -15.8, -14.2, 1.20, 2.20, 5.20, 5.23);
    /* fittings (the detail pass, 2026-11; L1 shows rails, bitts, rafts and the deckhouse's ports;
       sizes and spacings typical, NOT CONFIRMED one by one) */
    for (s = -1; s <= 1; s += 2) {
      var ys = s * 5.80;
      /* the boot-topping and a rubbing strake along the side */
      K.box(B.dark, -28.8, 27.4, s > 0 ? ys : ys - 0.025, s > 0 ? ys + 0.025 : ys, -0.15, 0.30);
      K.box(B.dark, -29.0, 27.9, s > 0 ? ys : ys - 0.10, s > 0 ? ys + 0.10 : ys, 1.30, 1.45);
      /* scuttles under the deckhouse, ports and doors in its sides */
      for (i = 0; i < 8; i++) K.cyl(B.glass, [-27.0 + i * 2.3, ys - 0.02, 0.85], [-27.0 + i * 2.3, ys + s * 0.03, 0.85], 0.15, 0.15, 8);
      for (i = 0; i < 6; i++) K.box(B.glass, -26.5 + i * 2.9, -26.1 + i * 2.9, s > 0 ? 4.80 : -4.82, s > 0 ? 4.82 : -4.80, 2.35, 2.75);
      K.box(B.dark, -12.8, -12.0, s > 0 ? 4.80 : -4.82, s > 0 ? 4.82 : -4.80, 1.55, 3.05);
      /* the side decks abreast the deckhouse: their rail, bitts and fairleads */
      rail(B, [[-29.3, s * 5.62], [-9.0, s * 5.62]], 2.45);
      rail(B, [[-29.3, s * 5.62], [-9.0, s * 5.62]], 2.00);
      for (i = 0; i < 6; i++) K.bar(B.dark, [-29.2 + i * 4.0, s * 5.62, 1.52], [-29.2 + i * 4.0, s * 5.62, 2.45], 0.035);
      [-27.5, -14.0].forEach(function (bx) {
        K.cylZ(B.dark, bx, s * 5.15, 1.52, 1.90, 0.13, 8); K.cylZ(B.dark, bx + 0.6, s * 5.15, 1.52, 1.90, 0.13, 8);
        K.box(B.dark, bx - 0.1, bx + 0.7, s > 0 ? 5.6 : -5.85, s > 0 ? 5.85 : -5.6, 1.50, 1.75);
      });
      /* bollards on the bow walls and the well's coaming */
      K.cylZ(B.dark, 27.5, s * 4.3, 3.30, 3.62, 0.14, 8); K.cylZ(B.dark, 26.9, s * 4.3, 3.30, 3.62, 0.14, 8);
      [8.0, 20.0].forEach(function (bx) { K.cylZ(B.dark, bx, s * 5.6, 1.85, 2.10, 0.12, 8); });
      /* the kedge anchor in its hawse on the quarter */
      K.cyl(B.dark, [-26.0, ys - 0.02, 0.85 + 0.0], [-26.0, ys + s * 0.06, 0.85], 0.32, 0.32, 10);
      K.box(B.dark, -26.15, -25.85, s > 0 ? ys + 0.02 : ys - 0.14, s > 0 ? ys + 0.14 : ys - 0.02, -0.2, 0.75);
      /* ladders from the well up to the deckhouse roof */
      K.bar(B.dark, [-8.9, s * 3.2, 1.55], [-8.9, s * 3.2, 3.30], 0.04);
      K.bar(B.dark, [-8.9, s * 3.7, 1.55], [-8.9, s * 3.7, 3.30], 0.04);
      for (i = 1; i < 6; i++) K.bar(B.dark, [-8.9, s * 3.2, 1.55 + i * 0.3], [-8.9, s * 3.7, 1.55 + i * 0.3], 0.03);
      /* mushroom vents and the engine-room ventilator on the deckhouse roof, the whips */
      K.cylZ(B.light, -22.0, s * 2.8, 3.30, 3.90, 0.16, 8); K.cylZ(B.light, -22.0, s * 2.8, 3.90, 4.08, 0.32, 8);
      K.box(B.light, -20.0, -18.6, s > 0 ? 1.0 : -2.2, s > 0 ? 2.2 : -1.0, 3.30, 4.10);
      K.box(B.dark, -20.02, -19.98, s > 0 ? 1.1 : -2.1, s > 0 ? 2.1 : -1.1, 3.45, 3.95);
      K.cyl(B.dark, [-16.2, s * 2.3, 5.20], [-16.6, s * 2.6, 10.0], 0.035, 0.02, 4);
      /* navigation lights on the bridge wings, a searchlight */
      K.box(B.light, -11.0, -10.7, s > 0 ? 4.45 : -4.65, s > 0 ? 4.65 : -4.45, 3.42, 3.75);
      K.cylZ(B.dark, -11.0, s * 1.8, 5.20, 5.50, 0.06, 6);
      K.cylX(B.light, -11.2, -10.8, s * 1.8, 5.62, 0.18, 10);
    }
    /* rails round the wheelhouse roof, across the stern, the deck's panel seams in the well */
    rail(B, [[-16.4, 2.42], [-10.6, 2.42], [-10.6, -2.42], [-16.4, -2.42], [-16.4, 2.42]], 6.05);
    for (i = 0; i < 8; i++) K.bar(B.dark, [-16.4 + (i % 4) * 1.95, i < 4 ? 2.42 : -2.42, 5.20], [-16.4 + (i % 4) * 1.95, i < 4 ? 2.42 : -2.42, 6.05], 0.03);
    rail(B, [[-29.35, 5.5], [-29.35, -5.5]], 2.45);
    for (i = 0; i < 12; i++) K.box(B.dark, -7.0 + i * 2.9, -6.96 + i * 2.9, -5.3, 5.3, 1.54, 1.548);
    K.cyl(B.dark, [28.35, -2.7, 0.22], [28.35, 2.7, 0.22], 0.16, 0.16, 8);                     /* the ramp's hinge */
  }

  /* ---------------------------------------------------------------- CTM (T1-T3) */
  var CTM_P = { key: "frnav_ctm", base: "#a9adb0", blots: [["#b1b5b8", 9, 55], ["#a1a5a8", 9, 50]], seed: 1965 };
  /* 23.8 x 6.35 m (published); T1 side-on at 39.0 px/m: X = 11.9 - (px - 138) / 39.0,
     Z = (518 - py) / 39.0 */
  var CH = [[-11.90, 3.05, -0.90, 0.30], [-11.50, 3.175, -1.20, 0.30], [6.00, 3.175, -1.10, 0.30], [7.75, 3.00, -0.20, 0.30]];
  function ctm(B) {
    var s, i;
    hull(B.paint, CH, 0.30);
    K.box(B.deck, -6.2, 7.6, -2.55, 2.55, 0.315, 0.34);
    for (s = -1; s <= 1; s += 2) {
      /* the wing walls, their tops at 2.46 forward to 2.20 aft (T1), raked at the bow to the ramp */
      K.profY(B.paint, [[-7.40, 0.30], [8.72, 0.30], [11.60, 2.50], [9.54, 2.46], [-7.40, 2.20]], s > 0 ? 2.55 : -3.175, s > 0 ? 3.175 : -2.55);
      /* the scuttle and port in the wall (T1) */
      K.box(B.dark, 1.2, 1.6, s > 0 ? 3.17 : -3.19, s > 0 ? 3.19 : -3.17, 1.20, 1.45);
      K.box(B.dark, -5.3, -4.9, s > 0 ? 3.17 : -3.19, s > 0 ? 3.19 : -3.17, 1.20, 1.45);
      rail(B, [[-7.3, s * 2.86], [9.5, s * 2.86]], 3.30);
      for (i = 0; i < 6; i++) K.bar(B.dark, [-7.0 + i * 3.2, s * 2.86, 2.45], [-7.0 + i * 3.2, s * 2.86, 3.30], 0.03);
    }
    /* the ramp, raised: its top 2.74 m at the bow, its toe at the waterline (T1) */
    K.profY(B.paint, [[7.75, 0.05], [11.90, 2.74], [11.70, 2.80], [7.55, 0.15]], -2.55, 2.55);
    /* the after deck over the engines, the wheelhouse aft (T1, T2, T3) */
    K.box(B.paint, -11.9, -7.4, -3.05, 3.05, 0.30, 1.62);
    K.box(B.light, -9.9, -7.4, -1.10, 1.10, 1.62, 3.80);
    K.box(B.glass, -7.42, -7.36, -0.95, 0.95, 3.10, 3.50);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.glass, -9.4, -8.0, s > 0 ? 1.10 : -1.12, s > 0 ? 1.12 : -1.10, 3.10, 3.45);
      K.cylZ(B.dark, -11.3, s * 2.5, 1.62, 1.95, 0.12, 8);
      rail(B, [[-11.7, s * 2.95], [-7.5, s * 2.95]], 2.45);
    }
    /* the winch drum at the stern (T2), the pole mast with its radar (T2) */
    K.cylY(B.dark, -11.0, 0.8, 1.9, 1.95, 0.30, 12);
    K.cylZ(B.dark, -8.8, 0, 3.80, 6.40, 0.06, 8);
    K.cylZ(B.light, -8.8, 0, 5.70, 5.95, 0.28, 12);
    K.box(B.team, -9.7, -8.9, -0.90, -0.40, 3.80, 3.83);
    K.box(B.team, -9.7, -8.9, 0.40, 0.90, 3.80, 3.83);
    /* fittings (the detail pass, 2026-11; T1-T3 show the rails, bitts and the wheelhouse's door
       and windows; sizes typical, NOT CONFIRMED one by one) */
    for (s = -1; s <= 1; s += 2) {
      var ys = s * 3.175;
      K.box(B.dark, -11.6, 7.6, s > 0 ? ys : ys - 0.025, s > 0 ? ys + 0.025 : ys, -0.15, 0.22);      /* boot-topping */
      K.box(B.dark, -11.8, 8.6, s > 0 ? ys : ys - 0.09, s > 0 ? ys + 0.09 : ys, 0.95, 1.08);        /* rubbing strake */
      /* bitts on the wing tops and the after deck, fairleads */
      [-6.0, 4.0].forEach(function (bx) {
        var zz = 2.20 + (bx + 7.4) * (0.26 / 16.9);
        K.cylZ(B.dark, bx, s * 2.86, zz, zz + 0.28, 0.1, 8); K.cylZ(B.dark, bx + 0.45, s * 2.86, zz, zz + 0.28, 0.1, 8);
      });
      K.cylZ(B.dark, -10.2, s * 2.5, 1.62, 1.95, 0.12, 8);
      K.box(B.dark, -11.0, -10.5, s > 0 ? 2.95 : -3.12, s > 0 ? 3.12 : -2.95, 1.62, 1.85);
      /* the after deck's rail posts, the engine-room vents and the exhausts */
      for (i = 0; i < 3; i++) K.bar(B.dark, [-11.7 + i * 2.0, s * 2.95, 1.62], [-11.7 + i * 2.0, s * 2.95, 2.45], 0.03);
      K.cylZ(B.light, -10.6, s * 1.6, 1.62, 2.10, 0.13, 8); K.cylZ(B.light, -10.6, s * 1.6, 2.10, 2.24, 0.26, 8);
      K.cyl(B.dark, [-9.95, s * 1.3, 3.0], [-9.95, s * 1.3, 4.4], 0.09, 0.09, 8);
      /* the wheelhouse: door, the rail round its roof, nav lights */
      K.box(B.dark, -9.2, -8.4, s > 0 ? 1.10 : -1.115, s > 0 ? 1.115 : -1.10, 1.70, 2.95);
      K.box(B.light, -7.6, -7.4, s > 0 ? 1.12 : -1.30, s > 0 ? 1.30 : -1.12, 3.45, 3.62);
      rail(B, [[-9.8, s * 1.05], [-7.5, s * 1.05]], 4.35);
      K.bar(B.dark, [-9.8, s * 1.05, 3.8], [-9.8, s * 1.05, 4.35], 0.03);
      K.bar(B.dark, [-7.5, s * 1.05, 3.8], [-7.5, s * 1.05, 4.35], 0.03);
      /* the ramp's hinge lugs and the bow wall's stanchions */
      K.box(B.dark, 7.5, 7.9, s > 0 ? 2.2 : -2.5, s > 0 ? 2.5 : -2.2, 0.0, 0.35);
    }
    rail(B, [[-9.8, 1.05], [-9.8, -1.05]], 4.35);
    K.cyl(B.dark, [-8.6, 0.6, 3.80], [-8.9, 0.75, 7.0], 0.03, 0.015, 4);                        /* whip */
    for (i = 0; i < 6; i++) K.box(B.dark, -5.0 + i * 2.2, -4.96 + i * 2.2, -2.5, 2.5, 0.34, 0.348); /* deck seams */
    K.cyl(B.dark, [7.7, -2.4, 0.12], [7.7, 2.4, 0.12], 0.12, 0.12, 8);
  }
  /* a white plate texture (seams, rust and salt runs, scuffs) that the plain colours multiply */
  var _gt;
  function grimeTex(THREE) {
    if (_gt !== undefined) return _gt;
    _gt = null;
    try {
      var W = 256, cv = document.createElement("canvas"); cv.width = cv.height = W;
      var q = cv.getContext("2d"), s0 = 4242, i;
      var R = function () { s0 = (Math.imul(s0, 1664525) + 1013904223) >>> 0; return s0 / 4294967296; };
      q.fillStyle = "#ffffff"; q.fillRect(0, 0, W, W);
      q.strokeStyle = "rgba(30,32,34,0.20)"; q.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { q.beginPath(); q.moveTo(0, i * W / 4 + 0.5); q.lineTo(W, i * W / 4 + 0.5); q.stroke(); q.beginPath(); q.moveTo(i * W / 4 + 0.5, 0); q.lineTo(i * W / 4 + 0.5, W); q.stroke(); }
      for (i = 0; i < 24; i++) {
        var x = R() * W, y = R() * W * 0.7, l = 16 + R() * 60, gr = q.createLinearGradient(0, y, 0, y + l);
        var c = R() < 0.55 ? "88,52,30" : "40,40,38";
        gr.addColorStop(0, "rgba(" + c + ",0.26)"); gr.addColorStop(1, "rgba(" + c + ",0)");
        q.fillStyle = gr; q.fillRect(x, y, 1.5 + R() * 2, l);
      }
      for (i = 0; i < 30; i++) { q.fillStyle = R() < 0.5 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)"; q.fillRect(R() * W, R() * W, 10 + R() * 40, 6 + R() * 22); }
      _gt = new THREE.CanvasTexture(cv);
      _gt.wrapS = _gt.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _gt.encoding = THREE.sRGBEncoding;
    } catch (e) { _gt = null; }
    return _gt;
  }
  function make(key, P, light, fn) {
    return function (THREE, M, C) {
      var T = K.materials(THREE, C, P, { deck: [0x55595a, 0.9, 0.05], light: [light, 0.82, 0.06] });
      var g = K.group(THREE, key), B = K.bins(T, ["paint", "deck", "light", "dark", "glass", "team"]);
      /* the detail pass: the superstructure takes a weathered plate texture too */
      var gt = grimeTex(THREE);
      if (gt) { T.light.map = gt; B.light.U = []; }
      fn(B);
      K.flush(THREE, g, B);
      K.shadows(g);
      return g;
    };
  }
  return { edic: make("fra_e50_lst", EDIC_P, 0xbcbcb6, edic), ctm: make("fra_ctm", CTM_P, 0xb8bcbe, ctm) };
})();

/* len: the measured X extent of each build (dump.js) */
UNIT_MODELS["fra_e60_cfighter"] = { len: 16.79, build: HeroCrusaderFN.build };
UNIT_MODELS["fra_e80_cfighter"] = { len: 14.30, build: HeroSuperEtendard.se };
UNIT_MODELS["fra_e90_cfighter"] = { len: 14.30, build: HeroSuperEtendard.sem };
UNIT_MODELS["fra_e00_spaag"] = { len: 6.68, build: HeroCrotaleNG.build };
UNIT_MODELS["fra_e50_lst"] = { len: 59.0, build: HeroFrLandingCraft.edic };
UNIT_MODELS["fra_ctm"] = { len: 23.8, build: HeroFrLandingCraft.ctm };
