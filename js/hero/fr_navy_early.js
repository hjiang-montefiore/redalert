/* ==================== js/hero/fr_navy_early.js ===========================
   HERO MODELS -- the French fleet of the 1950s and 1960s, one self-contained module (HeroFrNavyEarly)
   with eleven builders; the geometry kit is js/hero/roc_ships2.js's (Bin, solid, loft, flush) with a
   round-bilge hull from station tables, weathered canvas plating and the rule-10 fittings (lifelines,
   bollards, fairleads, hatches, vents, cowls, boats on davits, raft canisters, anchors in their hawses,
   scuttles, doors, windows, whips, ladders).  Before this file every row below borrowed an American
   model (the Ford for both carriers, a Burke, a Ticonderoga, a Virginia, an Ohio, an LCS).

   ROWS AND BUILDERS (key = eras.js name)                                              measured L x W x H
     fra_e50_corvette   Le Corse E50        leCorse()      Le Corse-class escorteur rapide     99.8 x 13.1 x 25.4
     fra_e50_destroyer  T 47 Surcouf        t47()          T 47 as built, 3 x 2 127 mm        128.6 x 14.6 x 34.3
     fra_e50_cruiser    De Grasse CL        deGrasse()     De Grasse as completed 1956        188.3 x 21.7 x 55.0
     fra_e50_sub        Narval SSK          narval()       Narval class (after the refit)      78.4 x  7.8 x 14.7
     fra_e50_carrier    Arromanches CVL     arromanches()  ex-HMS Colossus, straight deck     212.0 x 32.1 x 49.9
     fra_e60_corvette   Cdt Riviere         riviere()      Commandant Riviere, 3 x 100 mm      98.0 x 14.0 x 28.2
     fra_e60_destroyer  Suffren DDG         suffren()      Suffren class, no Exocet           157.6 x 17.6 x 50.4
     fra_e60_cruiser    Colbert CL          colbert("e60") Colbert as converted, no MM38      180.5 x 21.0 x 52.2
     fra_e60_sub        Daphne SSK          daphne()       Daphne class                        57.75 x 7.2 x 13.5
     fra_e60_ssbn       Le Redoutable SSBN  redoutable()   Redoutable class                   128.2 x 11.2 x 22.8
     fra_e60_carrier    Clemenceau CV       clemenceau("e60") Clemenceau as completed         265.0 x 52.6 x 67.3
   (W includes boats on davits and gun sponsons; H runs keel to masthead.)
   REWORK ROUND 2026-11-12 (the owner's visual review): Daphne and Narval re-lofted -- the measured
   profile rows resampled every 0.8 m and faired (rows unchanged), 32-point sections, a casing with
   upright sides on the hull's back, weld seams, limber rows both sides, a squarer sail with its fore
   top rounded [D1][N1]; Arromanches given wedge gun sponsons with sloped undersides, the bridge's
   rounded front and compass platform, island windows, doors and raft racks, hull ports, davits, the
   open quarterdeck, arrester wires, barrier, centreline and catwalk gratings [A1][A3].  Plan widths of
   the casing and of the sponsons NOT CONFIRMED.
   REWORK 2 (same day, the Redoutable, "a plain tube"): re-lofted on a new submarine kit (gridSkin,
   subSpec, secPts, subHull2, seam2, sail2, foil, screw2, tubeHatch, roundHatch, panelOn; exported as
   HeroFrSubKit for fr_navy_late.js's Amethyste): each section a round pressure hull with the casing
   standing on its back - sloped sides from the knuckle ("foot") line the profile [P1] draws up to
   rounded shoulders and a flat top - as two smooth skins meeting at a crisp knuckle; the missile
   hump so drawn d 22 - 110 [P1][P2][P3]; the casing a paler weathered black (#3a3e41) than the
   hull, as [P2] shows it; plain painted steel (no anechoic tiles: the 1971 boat, [P2][P3]); weld
   seams every 4.2 m; the sixteen tube hatches re-placed off the cutaway [P4] (d 59.5 - 80.3, all
   abaft the sail - the old ones ran on under it) with coamings, lids, hinges and lugs; the crown
   walkway; three escape trunks [P4] and the loading hatch; two rows of free-flood holes along the
   hump and a row on the bow casing; the bow torpedo shutters; the sail lofted (half-round front,
   straight sides, tapered tail, rounded top edge) with its window row, bridge cockpit, rails, masts
   and tapered planes; tapered rudders with their fillets and hinge gaps [P1], tapered stern planes,
   a seven-bladed skewed screw.  5084 -> 18704 tris, 6 -> 7 draw calls; 128.2 x 11.2 x 22.8 m.
   NOT CONFIRMED (rework 2): the casing top's half width (3.0 m) and its shoulder radius (no end
   view: [P2]'s three-quarter view by eye); the walking ridge's 0.2 m off the hump; the sail planes'
   span (tips 4.4 m off the centreline, by ratio to the hull in [P2]); the hatch diameter (1.84 m
   lid); the free-flood holes' rows, the shutters' places (the cutaway's tubes only), the screw's
   seven blades (the profile shows two).
   EXPORTED for the French late-period file: HeroClemenceau.build(THREE, M, C, variant) and
   HeroColbert.build(THREE, M, C, variant); both carry .len and .variants.  Clemenceau variants: "e60"
   (eight 100 mm on four sponsons), or an object { guns: [[d, side], ...] } listing the 100 mm mounts
   kept, for a later fit (d = metres forward of the flight deck's after tip, side +1 port / -1 stbd;
   the e60 list is [[24,1],[41,1],[24,-1],[41,-1],[193,1],[209,1],[193,-1],[209,-1]]).  Colbert
   variants: "e60" and "e80" (the four MM38 Exocet added).  The hull, island and deck of Foch are
   not drawn differently from Clemenceau: no reference here shows a difference.
   HELD (registrations commented out at the foot):
     fra_e50_patrol  Le Fougueux P640 -- no reference found.  Commons searches "Le Fougueux P640
       patrouilleur", "patrouilleur classe Le Fougueux", "P640 Fougueux", "Fougueux patrouilleur" (only
       Gallica launch photographs of the 1930s patrouilleur-dragueur), "Mornar PBR-551", "Mornar class
       patrol boat Yugoslav", "Udarnik patrol" (the Yugoslav derivatives); en.wikipedia "Le Fougueux-
       class patrol vessel/boat" (no article), search "Fougueux class submarine chaser"; fr.wikipedia
       is not reachable through the proxy.
     fra_e60_patrol  La Combattante P730 -- no reference found.  Commons "La Combattante P730" (only the
       2020s P735), "P730 Combattante", "patrouilleur La Combattante 1964", "vedette La Combattante
       Cherbourg"; en.wikipedia "French patrol vessel La Combattante (P730)" has no image.
   REUSE CHECKED: nothing in js/hero draws a French ship of the period (grep "Colossus|Majestic|
   Clemenceau|Suffren|Daphne|Narval|Redoutable|Surcouf|De Grasse"); deu_type148.js is a La Combattante
   II (German Tiger), a different, later boat.  fr_naval_misc.js has the carrier jets, not ships.

   REFERENCES (Wikimedia Commons through thumb.php, one at a time, cached in scratchpad q_frne_ref;
   d = metres forward of the after end, z over the waterline):
     [K1] "FS Clem plan1.jpg" (1600 px): starboard profile drawing of Clemenceau.  Flight deck after tip
          px 40, forward tip 1575 = the published 265 m (5.79 px/m); waterline (boot-top) row 370, flight
          deck edge 272 -> 16.9 m; hull aft end at the gallery d 10.4, at the water d 23.5; stem at the
          water d 242.7, at the gallery d 261.7; island d 112 - 166 (main block to 31.1, bridge 37.8,
          mast head 58.7, DRBV 23 array 41.5 - 47.5 at d 136 - 145, radome d 121 at 27 - 28.5); the
          100 mm sponsons at d 24, 41 (aft) and 193, 209 (forward); boat recesses d 47 - 77, 167 - 187.
     [K2] "French carrier Foch (R99) aerial view aft 1982.jpeg": the plan from astern - the 8 deg angled
          deck to port, the island on its starboard sponson, the deck-edge lift abaft it, the forward lift
          to starboard, 100 mm mounts on all four quarters, the narrow bow.
     [K3] "FS Clemenceau (R98) side view.jpg": starboard broadside afloat: deck edge 16.9 m amidships at
          the drawing's scale (cross-check), the island's tiers, the open galleries.
     [K4] "Grumman F-14A Tomcats of VF-14 fly over French aircraft carrier Foch (R99) ... (6451896).jpg":
          oblique from port: the angled deck's sponson and the bow.
          en.wikipedia "Clemenceau-class aircraft carrier": 265 x 51.2 m (overall), draught 8.6 m; the
          landing area 165.5 x 29.5 m at 8 deg; the forward lift to starboard, the after lift on the
          deck edge; two catapults, the forward one to port on the bow, the other on the angled deck.
     [A1] "HMS Glory SLV Green 1946.jpg" (a sister, starboard bow three-quarter): the island on the
          starboard edge, its funnel aft, the lattice tripod over the bridge, Bofors sponsons along both
          sides, the open stern under the deck.  Island stations read off it with a linear perspective
          correction (scale ratio bow/stern 1.7 from the deck-edge heights): d 65 - 97.5; island 10.7 m
          over the deck, mast head 31 m over it.
     [A2] "HMS Colossus (R15) at Greenock c1945.jpg" (head-on, bow): the flight deck's 24.5 m across 660
          px puts the deck 11.9 m over the water at the bow.
     [A3] "L'Arromanches en 1961 en Mediterranee.jpg" (Commons title with e-grave/e-acute): Arromanches
          herself, from the port bow: the island, the deck-edge sponsons, the plain grey.  She has the
          1957-58 angled deck there; the e50 row (1951) is drawn with the straight deck of [A1]/[A2].
          en.wikipedia "French aircraft carrier Arromanches": 212 x 24.4 m, draught 7.2 m; "the regular
          flight deck 211 x 24.5 m", two lifts, one catapult.
     [G1] "French cruiser De Grasse (C610) in 1957.jpg" (1400 px): port broadside, dressed overall.  Stem
          px 12, stern 1355 = 188.3 m (7.13 px/m); waterline row 400.  Forecastle deck 9.3 m to the break
          at d 34.5, quarterdeck 5.0 m; the forward 127 mm mounts at d 134 / 124.8 and the wing pair at
          d 118; the bridge d 92 - 115 to 23.8; the foremast tower to 49.5 m; the single funnel d 75 -
          82.7 to 30.8 with its dark cap; the mainmast d 65 - 70 to 26.6; the after house d 43 - 75 with
          its director; the after 127 mm group d 38.6 - 55.5.  en.wikipedia "French cruiser De Grasse":
          188.3 x 21.5 m, draught 5.54 m, eight twin 127 mm, twenty 57 mm.
     [C1] "Croiseur Colbert dans le port de Bordeaux (crop).jpg" (1400 px): Colbert at Bordeaux from
          above, port side.  Stem px 88, stern 1310 = 180.5 m (6.77 px/m).  The 100 mm A at d 125, B on
          its house d 118.5; the bridge d 81 - 108; the lattice foremast d 80.4 - 85.6; the funnel d 67 -
          74 to 26.9 with its black cap; 57 mm twins beside the funnel and aft; the lattice mainmast d 48.6
          - 55.4; boats d 49 - 61; the DRBR 51 tower d 40 - 44; the Masurca launcher d 20 - 28; the
          helicopter pad on the quarterdeck d 1.5 - 19.  en.wikipedia "French cruiser Colbert (C611)":
          180.5 x 19.7 m (waterline), draught 6.5 m; the conversion: Masurca, 4 MM38, 2 x 100 mm, 6 x 2
          57 mm.
     [L1] "Frans vlooteskader in Amsterdam ... Bestanddeelnr 928-4485.jpg": the Masurca Mk 2 twin-arm
          launcher close up, missiles slung under the beams.
     [T1] "EE Surcouf D621.jpg" (1500 px): Surcouf at sea, starboard broadside.  Stern px 65, stem head
          1422 = 128.6 m (10.55 px/m), waterline row 638.  Deck 5.0 aft to 6.15 at the stem; the two
          127 mm aft at d 20.4 (deck) and 28.7 (on the 01 house, roof 7.1); the 57 mm twin d 53.1 and its
          director d 58.5; funnels d 65.3 - 68.1 (to 13.1) and 77.7 - 81.0 (to 13.6); the radar lattice
          d 68.5 - 70.3 with its bedspring at 18.5; the foremast d 82 to 29.5; the bridge d 82.9 - 93.4
          to 14.8; the forward 127 mm d 109.6.
     [T2] "Musee des modeles reduits, Le Surcouf, en service en 1955, Escorteur d escadre.JPG": a model
          of the ship as built (paint, boats, rafts, the mounts' shape).  Its stations do not agree with
          [T1] and are not used.  en.wikipedia "T 47-class destroyer": 128.6 x 12.7 m, draught 5.4 m.
     [F1] "Duquesne 4.jpg" (her sister, 1400 px): starboard broadside.  Stem head px 52, stern 1342 =
          157.6 m (8.19 px/m), waterline row 548.  Deck 8.9 at the stem, 6.1 amidships, the quarterdeck
          3.4 aft of d 30.8; 100 mm A d 128.7 and B d 119.7 (01 house roof 10.4); the bridge block to
          16.8; the DRBI 23 radome centre d 91.2 at 24.7 m, radius 5.3; the mack d 66.2 - 72.9 to 29 with
          the pole mast to 45.4; the after house d 30.8 - 54.6 with the lattice mast to 24.8 and the two
          DRBR 51; the Masurca launcher d 9.4.
     [F2] "French destroyer Suffren (D 602) underway in 1983.JPEG": Suffren from the port bow: the same
          layout, the radome, the mack.  en.wikipedia "Suffren-class frigate": 157.6 x 15.54 m.
     [E1] "My25$043 Toulon.jpg": Le Brestois (F762, Le Corse class) at Toulon, the forward half: the
          flared bow, the 57 mm twin over the bridge front.
     [E2] "Aankomst van vijf Franse oorlogsbodems, Bestanddeelnr 910-6111.jpg" / "...6112.jpg": Le
          Bordelais (F764) and a sister head-on: the bow, the bridge, the lattice mast with the bedstead.
     [E3] "Bayonne-Escorteur rapide Le Gascon-196707.jpg" and [E4] "Le Bourguignon F769.jpg": two of
          the Le Normand class (E 52, the repeat of Le Corse with the same layout), from the bow and the
          starboard quarter: the sextuple 375 mm launcher on the 01 front with the 57 mm twin above it,
          the bridge and mast, the single funnel, the tubes amidships, the director tower, the two after
          57 mm twins superfiring.  en.wikipedia "Le Corse-class frigate": 99.8 x 10.3 m, draught 4.3 m,
          3 x 2 57 mm, 4 x 3 550 mm tubes, 1 x 6 375 mm.
     [R1] "Aviso-escorteur.svg" (1600 px): the class profile drawing.  Stern px 75, stem head 1553 =
          98.0 m (15.08 px/m), waterline row 638.  Deck 3.0 to d 71.3, rising to 5.77 at the stem; the
          01 house d 17.3 - 71.3 (5.5); the 02 house d 26.9 - 33.8 (8.0) with its director; the funnel
          d 37.9 - 43.1 to 11.8; the bridge d 51.6 - 68.4 to 10.5 / 11.5 / 13.5; the tripod mast d 53 to
          24.4; the 305 mm mortar d 70 - 74; the 100 mm at d 13.9, 24.3 (aft) and 83.2 (forward).
          en.wikipedia "Commandant Riviere-class frigate": 98.0 x 11.5 m, draught 4.3 m.
     [N1] "Sous-marins au port de La Pallice (La Rochelle) (1).jpg": two Narval-class boats alongside,
          starboard side, after the 1966-70 refit: the bow knob over the stem, the flat casing, the
          tall streamlined sail.  [N2] "Espadon mg 7836.jpg", [N3] "Espadon mg 7833.jpg": Espadon in the
          Saint-Nazaire base: the casing, the free-flood slots, the sail.  en.wikipedia "French
          Narval-class submarine": 78.4 x 7.8 m, draught 5.2 m.
     [D1] "Sous-marin-Flore.jpg" (1280 px): Flore ashore at Lorient, port broadside.  Stern px 55, bow
          1068 = 57.75 m (17.5 px/m): the sail d 22.45 - 31.45, 4.9 m over the casing; the DUUA dome d
          52.3 - 55.1, 2.1 m over it; the cruciform tail.  [D2] "Doris 1994.jpg": Doris surfaced, the
          casing about 1 m over the water.  en.wikipedia "Daphne-class submarine": 57.75 x 6.76 m,
          draught 5.25 m.
     [P1] "Redoutable class SSBN.svg" (1500 px): the profile.  Screw tip px 10, bow 1497 = 128 m (11.62
          px/m); hull top and bottom read by a pixel scan every 50 px (the table REDO.P); the sail d 82.3
          - 95.8, top 8.33 m; the upper rudder d 5.0 - 10.3 to 1.9 m, the lower to -11.1 m.
     [P2] "FS Redoutable.jpg": Le Redoutable surfaced: the hump standing clear of the water, the black
          finish.  [P3] "Le Redoutable.JPG": the museum boat: the sail planes, the missile-deck hatches
          and the hump's free-flood slots.  [P4] "Schema sous-marin SNLE Le Redoutable en coupe.png": the
          cutaway (sixteen tubes in two rows) with its 20 m scale.  en.wikipedia "Redoutable-class
          submarine (1967)": 128 x 10.6 m, draught 10 m.

   MEASURED AGAINST PUBLISHED (length set by the published figure; no height was fitted):
     Le Corse 99.8 (99.8) x hull 10.3 (10.3); Surcouf 128.6 x 12.7 (12.7); De Grasse 188.3 x 21.5
     (21.5); Colbert 180.5 x 19.7 (19.7 wl); Suffren 157.6 x 15.5 (15.54); Riviere 98.0 x 11.5 (11.5);
     Arromanches 212 x 24.4 hull / 24.5 deck (24.4 / 24.5); Clemenceau 265 x 52.6 over the sponsons
     and mounts, 51.2 flight deck (51.2); Narval 78.4 x 7.8; Daphne 57.75 x 6.76 (+ planes 7.2);
     Redoutable 128 x 10.6 (+ stern planes 11.2; 128.2 over the screw cone, rework 2).  Keels: the published draughts where the hull shows none
     (Le Corse 3.4 of 4.3, Surcouf 4.8 of 5.4, Suffren 5.0 of 7.4 and Riviere 3.8 of 4.3: the published
     figures are to the sonar dome / screws, not drawn); the submarines at their published draughts.

   NOT CONFIRMED (estimated, not measured):
     - every hull's half-breadths between the published beam amidships and the stem / transom, the
       flare and the bilge (no lines plan); the boot-topping height;
     - Le Corse: there is no side-on photograph of the class; its stations are fractions of the
       length off [E3]/[E4] (the E 52 sister class), its heights estimates off [E2] (head-on);
     - De Grasse and Colbert heights: [G1] is in perspective and dressed overall, [C1] is from above
          (heights foreshortened; its foremast reads 54 m and is drawn 46 m to the pole tip); the
          freeboards (9.3 / 5.0 m De Grasse, 9.6 - 6.0 m Colbert) are readings off them, not figures;
          De Grasse's after 127 mm group and wing mounts are placed off the barrels seen in [G1] only,
          and only four of her ten 57 mm twins are drawn (the others are not identified in [G1]);
     - Colbert e60: the row is the ship as built (eight twin 127 mm); NO photograph of her before the
          1970-72 conversion was found, so the e60 builder draws the conversion as [C1] shows it,
          without the MM38.  The e80 MM38 boxes stand abreast the bridge front where [C1] shows white
          angled containers at px 500 - 520; that identification is not certain;
     - Suffren: the row (1967) predates the MM38 (1977): none drawn; the Malafon is not drawn (not
          identified in [F1]);
     - Surcouf: the two other 57 mm twins and the four triple tube mounts (text only; not identified in
          [T1]) are not drawn;
     - Narval: [N1] shows the boats after the refit, so the sail is the refit sail (the e50 row is the
          1957 boat); its place (0.43 - 0.56 of the length from the bow) and height (5.6 m over the
          casing) are fractions off [N1], which cannot be scaled;
     - Daphne: the keel is hidden behind the quay in [D1]; the bow planes' place and span;
     - Redoutable: the surfaced trim (the published 10 m draught put under [P1]'s keel line);
     - Arromanches: the island's stations (perspective-corrected); the Bofors sponsons' number and
          places (five a side drawn); the lift and catapult positions (text only);
     - Clemenceau: the waterline half-breadth (15.9 m, no published figure fetched); the deck outline
          between the published overall beam, the landing area's angle and [K2]'s proportions; the lift
          outlines and catapult tracks are seams drawn flush with the deck;
     - all mounts are drawn trained fore and aft; the team colour strips.
   NOT DRAWN: hull and pennant numbers, names, ensigns and jacks (staffs only), deck lettering and the
   carriers' landing markings; aircraft (render3d.js parks the deck); the patrol rows (held).

   PAINT: Marine Nationale light grey over red-brown anti-fouling and a black boot-top; dark-grey
   decks; the submarines black all over; weathered plating texture.  Team colour: small strips on
   bridge roofs, an after house and the flight-deck round-down.
   NODES: the rows with turret:true (corvettes, destroyers, cruisers) carry the forward main gun as
   the group named "turret" (origin on its ring, gun along +X): Le Corse the 57 mm twin over the
   bridge front, Surcouf / De Grasse the forward 127 mm twin, Riviere / Suffren / Colbert the forward
   100 mm.  Colbert carries a hidden "helipad" node over her quarterdeck pad.  The carriers and
   submarines have no named nodes; the carriers' flight decks are left clear and flat (deck marks
   stand 2 cm proud) for render3d.js's deck park.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0 (the submarines at their surfaced
   trim); everything else baked, one mesh per material.  ASCII only.
   LOAD ORDER: self-contained; it needs only three.js and the UNIT_MODELS table (load it with the
   other js/hero files, before any file that calls HeroClemenceau / HeroColbert).
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroFrNavyEarly = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI;

  /* ------------------------------------------------------------ geometry kit (js/hero/roc_ships2.js's) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  /* piecewise-linear table lookup: T = [[d, v], ...] sorted on d */
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  var UVS = 1 / 16;
  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; this.U = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i,
        ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(v[i][0] * UVS, v[i][1] * UVS);
      else if (ay >= ax) this.U.push(v[i][0] * UVS, v[i][2] * UVS);
      else this.U.push(v[i][1] * UVS, v[i][2] * UVS);
    }
  };
  function okTri(bin, a, b, c) {
    var cc = cross(sub(b, a), sub(c, a));
    if (dot(cc, cc) > 1e-12) bin.tri(a, b, c);
  }
  /* a closed solid from vertices and faces; the winding is made outward from the signed volume */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c, cx = 0, cy = 0, cz = 0;
    for (i = 0; i < V.length; i++) { cx += V[i][0]; cy += V[i][1]; cz += V[i][2]; }
    cx /= V.length; cy /= V.length; cz /= V.length;
    var W = V.map(function (p) { return [p[0] - cx, p[1] - cy, p[2] - cz]; });
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(W[f[0]], cross(W[f[1]], W[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var cc = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  /* eight corners: bottom 0-3, top 4-7, both counter-clockwise from above */
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a deckhouse: foot x0..x1 by +-hw at z0, roof z1, the roof set in by tk at the sides and by rf / ra
     at the fore / after faces (rake) */
  function house(bin, x0, x1, hw, z0, z1, tk, rf, ra, yc) {
    var t = tk || 0, a = ra || 0, f = rf || 0, c = yc || 0;
    hexa(bin, [[x0, c - hw, z0], [x1, c - hw, z0], [x1, c + hw, z0], [x0, c + hw, z0],
               [x0 + a, c - hw + t, z1], [x1 - f, c - hw + t, z1], [x1 - f, c + hw - t, z1], [x0 + a, c + hw - t, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg, noCap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), i, j, c, s, rn, P = [], Q = [], N = [];
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      P.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]);
      Q.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      bin.tri(P[i], P[j], Q[j], N[i], N[j], N[j]);
      bin.tri(P[i], Q[j], Q[i], N[i], N[j], N[i]);
    }
    if (noCap) return;
    var na = [-ax[0], -ax[1], -ax[2]];
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      if (r0 > 1e-4) bin.tri(A, P[j], P[i], na, na, na);
      if (r1 > 1e-4) bin.tri(B, Q[i], Q[j], ax, ax, ax);
    }
  }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 10); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg || 8); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 8); }
  /* a thin bar (three-sided, uncapped): wires, rails, braces */
  function bar(bin, A, B, r) { cyl(bin, A, B, r, r, 3, true); }
  /* loft through closed rings of equal point count; flat caps unless noCap; pick(tri) chooses the bin */
  function loft(binOrPick, rings, noCap) {
    var n = rings[0].length, r, k, tris = [];
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      var a = rings[r][k], b = rings[r][(k + 1) % n], c = rings[r + 1][(k + 1) % n], d = rings[r + 1][k];
      tris.push([a, b, c, k], [a, c, d, k]);
    }
    if (!noCap) {
      [0, rings.length - 1].forEach(function (ri, e) {
        var R = rings[ri], cx = 0, cy = 0, cz = 0, i;
        for (i = 0; i < n; i++) { cx += R[i][0] / n; cy += R[i][1] / n; cz += R[i][2] / n; }
        var C = [cx, cy, cz];
        for (i = 0; i < n; i++) tris.push(e ? [C, R[i], R[(i + 1) % n], -1] : [C, R[(i + 1) % n], R[i], -1]);
      });
    }
    /* orientation from the signed volume about the centroid of all points */
    var cx = 0, cy = 0, cz = 0, m = 0, vol = 0, i;
    rings.forEach(function (R) { R.forEach(function (p) { cx += p[0]; cy += p[1]; cz += p[2]; m++; }); });
    var O = [cx / m, cy / m, cz / m];
    for (i = 0; i < tris.length; i++) vol += dot(sub(tris[i][0], O), cross(sub(tris[i][1], O), sub(tris[i][2], O)));
    for (i = 0; i < tris.length; i++) {
      var T = tris[i], p = T[0], q = vol < 0 ? T[2] : T[1], s = vol < 0 ? T[1] : T[2];
      var bin = typeof binOrPick === "function" ? binOrPick(p, q, s, T[3]) : binOrPick;
      if (bin) okTri(bin, p, q, s);
    }
  }
  /* superellipse ring in the y-z plane at x: half-width w, half-height h, centre (yc, zc), exponent e */
  function sring(x, w, h, yc, zc, e, n) {
    var R = [], i;
    for (i = 0; i < n; i++) {
      var t = i / n * TAU, c = Math.cos(t), s = Math.sin(t);
      R.push([x, yc + w * Math.sign(c) * Math.pow(Math.abs(c), e), zc + h * Math.sign(s) * Math.pow(Math.abs(s), e)]);
    }
    return R;
  }
  /* ring in the x-y plane at height z (funnels, masts, sails): half-length a, half-width b, centre (xc, yc) */
  function hring(xc, yc, z, a, b, e, n) {
    var R = [], i;
    for (i = 0; i < n; i++) {
      var t = i / n * TAU, c = Math.cos(t), s = Math.sin(t);
      R.push([xc + a * Math.sign(c) * Math.pow(Math.abs(c), e), yc + b * Math.sign(s) * Math.pow(Math.abs(s), e), z]);
    }
    return R;
  }
  function ellipsoid(bin, C, rx, ry, rz, rings, seg, lo, hi) {
    var i, k, R = [], NR = [], a0 = lo === undefined ? -PI / 2 : lo, a1 = hi === undefined ? PI / 2 : hi;
    for (i = 0; i <= rings; i++) {
      var a = a0 + (a1 - a0) * i / rings, ca = Math.cos(a), sa = Math.sin(a), ring = [], nr = [];
      for (k = 0; k < seg; k++) {
        var t = k / seg * TAU, ct = Math.cos(t), st = Math.sin(t);
        ring.push([C[0] + rx * ca * ct, C[1] + ry * ca * st, C[2] + rz * sa]);
        nr.push(unit([ca * ct / rx, ca * st / ry, sa / rz]));
      }
      R.push(ring); NR.push(nr);
    }
    for (i = 0; i + 1 < R.length; i++) for (k = 0; k < seg; k++) {
      var j = (k + 1) % seg, A = R[i][k], B = R[i][j], C2 = R[i + 1][j], D2 = R[i + 1][k];
      var c1 = cross(sub(B, A), sub(C2, A));
      if (dot(c1, c1) > 1e-12) bin.tri(A, B, C2, NR[i][k], NR[i][j], NR[i + 1][j]);
      var c2 = cross(sub(C2, A), sub(D2, A));
      if (dot(c2, c2) > 1e-12) bin.tri(A, C2, D2, NR[i][k], NR[i + 1][j], NR[i + 1][k]);
    }
    if (a0 > -PI / 2 + 1e-3) {
      var zb = R[0][0][2], cb = [C[0], C[1], zb];
      for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
    }
  }
  /* a convex or star-shaped plan polygon [[x, y], ...] extruded z0..z1, the top set in by k */
  function prism(bin, pts, z0, z1, k) {
    var n = pts.length, cx = 0, cy = 0, i, r0 = [], r1 = [];
    for (i = 0; i < n; i++) { cx += pts[i][0] / n; cy += pts[i][1] / n; }
    for (i = 0; i < n; i++) {
      var p = pts[i], dx = p[0] - cx, dy = p[1] - cy, l = Math.sqrt(dx * dx + dy * dy) || 1, kk = k || 0;
      r0.push([p[0], p[1], z0]); r1.push([p[0] - dx / l * kk, p[1] - dy / l * kk, z1]);
    }
    loft(bin, [r0, r1]);
  }
  /* a side-profile polygon [[x, z], ...] extruded across y0..y1 (shields, gun houses, fins) */
  function sideSlab(bin, pts, y0, y1) {
    loft(bin, [pts.map(function (p) { return [p[0], y0, p[1]]; }), pts.map(function (p) { return [p[0], y1, p[1]]; })]);
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      var me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true;
      group.add(me);
    }
  }

  /* ------------------------------------------------------------ canvas paint, weathered */
  var TEX = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (TEX[key]) return TEX[key];
    if (typeof document === "undefined" || !document.createElement) return null;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return null;
    draw(g, 512);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX[key] = t;
    return t;
  }
  /* plating, 16 m square: strakes every 1 m, staggered butts, rust weeps under scuttles, grime, patch paint */
  function drawPlate(g, S) {
    var R = rng(9137), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 120; i++) {
      g.globalAlpha = 0.025 + R() * 0.04; g.fillStyle = R() < 0.6 ? "#7c868c" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3.5) * m, (0.3 + R() * 1.1) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 16; k++) {
      var y = Math.round(k * m);
      g.fillStyle = "rgba(60,68,74,0.22)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.2)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 6; i++) { var x = Math.round(((i * 3 + (k % 2) * 1.5) % 16) * m); g.fillStyle = "rgba(60,68,74,0.16)"; g.fillRect(x, y, 1.5, m); }
    }
    for (i = 0; i < 40; i++) {                     /* weeps and streaks */
      g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = R() < 0.35 ? "#7a5236" : "#4e4a45";
      g.fillRect(R() * S, R() * S, 0.06 * m, (0.5 + R() * 1.8) * m);
    }
    for (i = 0; i < 14; i++) {                     /* touched-up patches */
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#aab2b6";
      g.fillRect(R() * S, R() * S, (0.6 + R()) * m, (0.4 + R() * 0.6) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: painted steel, seams every 1.5 x 2 m, scuffed walkways and stains */
  function drawDeck(g, S) {
    var R = rng(4417), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(25,25,25,0.26)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    for (i = 0; i < 50; i++) { g.globalAlpha = 0.04 + R() * 0.06; g.fillStyle = R() < 0.5 ? "#ffffff" : "#3a3631"; g.fillRect(R() * S, R() * S, (0.5 + R()) * m, (0.2 + R() * 0.4) * m); }
    g.globalAlpha = 1;
  }
  /* materials: hull / sup (light grey topsides and houses), deck, boot (under water), btop (boot-topping),
     dark (openings, scuttles, funnel caps), metal (rails, barrels, masts), glass, light (radomes,
     canvas, boats), team (C.team as handed in) */
  function materials(THREE, C, P) {
    var plate = canvasTex(THREE, "frne_plate", drawPlate), deckT = canvasTex(THREE, "frne_deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(P.hull, 0.8, 0.08, plate),
      sup: mk(P.sup === undefined ? P.hull : P.sup, 0.8, 0.08, plate),
      deck: mk(P.deck, 0.92, 0.04, deckT),
      boot: mk(P.boot, 0.86, 0.04, plate),
      btop: mk(P.btop || 0x1f2224, 0.8, 0.05),
      dark: mk(P.dark || 0x202426, 0.75, 0.3),
      metal: mk(P.metal || 0x5a6166, 0.5, 0.55),
      glass: mk(0x141c22, 0.15, 0.4),
      light: mk(P.light || 0xc9ccc8, 0.7, 0.05),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }
  var BIN_NAMES = ["hull", "sup", "deck", "boot", "btop", "dark", "metal", "glass", "light", "team"];
  function bins(T) { var B = {}; BIN_NAMES.forEach(function (n) { B[n] = new Bin(T[n]); }); return B; }
  /* PAINT: Marine Nationale light grey sampled off [F1] / [E3] (#a9adae sunlit, #8a8f92 shade, drawn at
     about 0.85 of the sunlit value), the decks a dark grey, red-brown anti-fouling as [C1] draws it;
     the submarines black (sampled off [D1] / [P2] #24272a) */
  var GREY = { hull: 0x9a9fa1, sup: 0xa2a6a7, deck: 0x5b5f61, boot: 0x7b3a2e, btop: 0x1e2123, light: 0xc4c6c2 };
  var SUBP = { hull: 0x2a2d30, sup: 0x2a2d30, deck: 0x303336, boot: 0x2a2d30, btop: 0x2a2d30, metal: 0x3d4246, light: 0x4a4f53 };
  /* the reworked boats (Redoutable, Amethyste): the casing skin weathered paler than the hull, as the
     hump reads in [P2] and the Amethyste's casing in its photograph (#3a3e41 drawn) */
  var SUBP2 = { hull: 0x2a2d30, sup: 0x2c2f32, deck: 0x3a3e41, boot: 0x2a2d30, btop: 0x2a2d30, metal: 0x474c50, light: 0x4a4f53 };

  /* ------------------------------------------------------------ the surface-ship hull
     H.st: stations [d, zd, hd, hw, T] - d metres forward of the after end, deck height, half-breadth at the
     deck edge, half-breadth at the waterline, draught at the keel (a negative T is a stem / stern above
     water: the keel line's z is then -T).  The ring runs port deck edge, flare, waterline, bilge, keel,
     and back up the starboard side; the edge joining the two deck edges is the weather deck. */
  function halfSec(s) {
    var zd = s[1], hd = s[2], hw = s[3], T = s[4];
    if (T < 0 || hw < 0.02) {
      var zk = T < 0 ? -T : 0;
      return [[hd, zd], [hd * 0.75, lerp(zk, zd, 0.62)], [hd * 0.35, lerp(zk, zd, 0.25)], [0.0, zk], [0, zk], [0, zk], [0, zk]];
    }
    return [[hd, zd], [lerp(hw, hd, 0.7), zd * 0.55], [hw, 0], [hw * 0.985, -0.28 * T], [hw * 0.86, -0.7 * T],
            [hw * 0.45, -0.96 * T], [0, -T]];
  }
  function hullRing(x, s) {
    var h = halfSec(s), R = [], i;
    for (i = 0; i < h.length; i++) R.push([x, h[i][0], h[i][1]]);
    for (i = h.length - 2; i >= 0; i--) R.push([x, -h[i][0], h[i][1]]);
    return R;
  }
  /* the hull: X(d) maps a station to model x; bt = boot-topping band height (m); deckOK(d) false where a
     superstructure or flight deck covers the weather deck (the deck strip is still drawn) */
  function shipHull(B, H) {
    var st = H.st, X = H.X, bt = H.bt === undefined ? 0.45 : H.bt;
    var rings = st.map(function (s) { return splitRing(bt)(hullRing(X(s[0]), s)); });
    var nDeck = rings[0].length - 1;
    loft(function (p, q, r, k) {
      var z = (p[2] + q[2] + r[2]) / 3, zmax = Math.max(p[2], q[2], r[2]), zmin = Math.min(p[2], q[2], r[2]);
      if (k === nDeck) return B.deck;
      if (k === -1) return z < 0 ? B.boot : B.hull;
      if (zmax <= 0.001) return B.boot;
      if (zmin >= -0.001 && zmax <= bt + 0.001) return B.btop;
      return z < 0 ? B.boot : B.hull;
    }, rings);
  }
  /* insert a boot-topping row at z = bt between the waterline point and the flare point of a ring */
  function splitRing(bt) {
    return function (R) {
      var out = [], i, n = R.length;
      for (i = 0; i < n; i++) {
        out.push(R[i]);
        var a = R[i], b = R[(i + 1) % n];
        if (i === 1 || i === n - 3) {           /* flare -> waterline (port), waterline -> flare (stbd) */
          var lo = a[2] < b[2] ? a : b, hi = a[2] < b[2] ? b : a;
          var t = (hi[2] - lo[2]) > 1e-3 ? Math.max(0, Math.min(1, (bt - lo[2]) / (hi[2] - lo[2]))) : 0.5;
          out.push([lerp(a[0], b[0], i === 1 ? 1 - t : t), lerp(a[1], b[1], i === 1 ? 1 - t : t), lerp(a[2], b[2], i === 1 ? 1 - t : t)]);
        }
      }
      return out;
    };
  }
  function hullFns(H) {
    H.X = function (d) { return d - H.L / 2; };
    H.zD = function (d) { return tbl(H.st.map(function (s) { return [s[0], s[1]]; }), d); };
    H.hD = function (d) { return tbl(H.st.map(function (s) { return [s[0], s[2]]; }), d); };
    H.hW = function (d) { return tbl(H.st.map(function (s) { return [s[0], s[3]]; }), d); };
    return H;
  }

  /* ------------------------------------------------------------ small fittings (rule 10 detail) */
  /* lifelines along a polyline of deck points: posts every ~1.6 m, two wires, height h */
  function railLine(B, pts, h) {
    var hh = h || 1.0, i, k;
    for (i = 0; i + 1 < pts.length; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)), n = Math.max(1, Math.round(L / 1.6));
      for (k = 0; k < n; k++) {
        var t0 = k / n, t1 = (k + 1) / n;
        var p = [lerp(a[0], b[0], t0), lerp(a[1], b[1], t0), lerp(a[2], b[2], t0)], q = [lerp(a[0], b[0], t1), lerp(a[1], b[1], t1), lerp(a[2], b[2], t1)];
        bar(B.metal, [p[0], p[1], p[2]], [p[0], p[1], p[2] + hh], 0.03);
        bar(B.metal, [p[0], p[1], p[2] + hh], [q[0], q[1], q[2] + hh], 0.02);
        bar(B.metal, [p[0], p[1], p[2] + hh * 0.5], [q[0], q[1], q[2] + hh * 0.5], 0.015);
      }
    }
  }
  /* lifelines along both deck edges of the hull between d0 and d1 */
  function deckRails(B, H, d0, d1, inset) {
    var s, d, ins = inset === undefined ? 0.15 : inset;
    for (s = -1; s <= 1; s += 2) {
      var pts = [];
      for (d = d0; d < d1 + 0.01; d += Math.max(1.6, (d1 - d0) / 40)) {
        var dd = Math.min(d, d1);
        pts.push([H.X(dd), s * Math.max(0.2, H.hD(dd) - ins), H.zD(dd)]);
      }
      railLine(B, pts, 1.0);
    }
  }
  /* rails round a rectangular roof x0..x1 by +-hw at z (open sides listed are skipped) */
  function roofRail(B, x0, x1, hw, z, skip, yc) {
    var c = yc || 0, sk = skip || "";
    if (sk.indexOf("a") < 0) railLine(B, [[x0, c - hw, z], [x0, c + hw, z]]);
    if (sk.indexOf("f") < 0) railLine(B, [[x1, c - hw, z], [x1, c + hw, z]]);
    if (sk.indexOf("p") < 0) railLine(B, [[x0, c + hw, z], [x1, c + hw, z]]);
    if (sk.indexOf("s") < 0) railLine(B, [[x0, c - hw, z], [x1, c - hw, z]]);
  }
  function bollard(B, x, y, z) { cylZ(B.metal, x - 0.22, y, z, z + 0.45, 0.13, 8); cylZ(B.metal, x + 0.22, y, z, z + 0.45, 0.13, 8); box(B.metal, x - 0.4, x + 0.4, y - 0.18, y + 0.18, z, z + 0.08); }
  function fairlead(B, x, y, z) { box(B.metal, x - 0.3, x + 0.3, y - 0.1, y + 0.1, z, z + 0.28); }
  function vent(B, x, y, z, r) { var rr = r || 0.22; cylZ(B.metal, x, y, z, z + 0.8, rr, 8); ellipsoid(B.metal, [x, y, z + 0.85], rr * 1.5, rr * 1.5, rr, 2, 8, 0, PI / 2); }
  function cowl(B, x, y, z) { cylZ(B.sup, x, y, z, z + 1.1, 0.3, 8); cyl(B.sup, [x, y, z + 1.1], [x + 0.35, y, z + 1.4], 0.32, 0.4, 8); }
  function hatch(B, x, y, z, l, w) { box(B.sup, x - l / 2, x + l / 2, y - w / 2, y + w / 2, z, z + 0.22); box(B.dark, x - l / 2 + 0.08, x + l / 2 - 0.08, y - w / 2 + 0.08, y + w / 2 - 0.08, z + 0.22, z + 0.24); }
  function raft(B, x, y, z) { cylX(B.light, x - 0.6, x + 0.6, y, z + 0.32, 0.3, 8); box(B.metal, x - 0.55, x + 0.55, y - 0.3, y + 0.3, z, z + 0.05); }
  function rafts(B, x0, n, y, z, dx) { for (var i = 0; i < n; i++) raft(B, x0 + i * (dx || 1.4), y, z); }
  /* a ship's boat: a half-ellipsoid hull with a canopy, on two davits from the deck at zd (side s) */
  function boat(B, x, y, z, len, bm, zd, s) {
    ellipsoid(B.light, [x, y, z], len / 2, bm / 2, bm * 0.55, 3, 12, -PI / 2, 0);
    box(B.light, x - len * 0.42, x + len * 0.42, y - bm * 0.45, y + bm * 0.45, z, z + 0.12);
    house(B.light, x - len * 0.2, x + len * 0.15, bm * 0.38, z + 0.1, z + 0.75, 0.1, 0.2, 0.1, y);
    if (zd === undefined) return;
    var i;
    for (i = -1; i <= 1; i += 2) {
      var xd = x + i * len * 0.33, yi = y + s * bm * 0.9;
      bar(B.metal, [xd, yi, zd], [xd, yi, z + 1.1], 0.07);
      bar(B.metal, [xd, yi, z + 1.1], [xd, y, z + 1.3], 0.06);
      bar(B.metal, [xd, y, z + 1.3], [xd, y, z + 0.3], 0.015);
    }
  }
  /* anchor in its hawse on the hull side: x, half-breadth there yh, z, side s */
  function anchor(B, x, yh, z, s) {
    var y = s * (yh + 0.02);
    ellipsoid(B.dark, [x, y, z + 0.25], 0.6, 0.12, 0.45, 2, 10);
    box(B.metal, x - 0.12, x + 0.12, y - s * 0.04, y + s * 0.18, z - 0.9, z + 0.2);
    box(B.metal, x - 0.55, x + 0.55, y - s * 0.04, y + s * 0.2, z - 1.0, z - 0.75);
    box(B.metal, x - 0.55, x - 0.35, y - s * 0.04, y + s * 0.2, z - 1.0, z - 0.45);
    box(B.metal, x + 0.35, x + 0.55, y - s * 0.04, y + s * 0.2, z - 1.0, z - 0.45);
  }
  /* scuttles: a row of small dark discs on both hull sides between d0 and d1 at z, every dx */
  function scuttles(B, H, d0, d1, z, dx) {
    var d, s;
    for (d = d0; d <= d1; d += dx) for (s = -1; s <= 1; s += 2) {
      var yh = H.hW(d) + (H.hD(d) - H.hW(d)) * Math.min(1, z / Math.max(0.5, H.zD(d))) * 0.9 + 0.03;
      box(B.dark, H.X(d) - 0.17, H.X(d) + 0.17, s * yh - 0.04, s * yh + 0.04, z - 0.17, z + 0.17);
    }
  }
  function whip(B, x, y, z, h) { bar(B.metal, [x, y, z], [x, y, z + h], 0.03); }
  function ladder(B, x, y, z0, z1, ang) {
    var dx = Math.cos(ang || 0) * 0.25, dy = Math.sin(ang || 0) * 0.25, k;
    bar(B.metal, [x - dy, y + dx, z0], [x - dy, y + dx, z1], 0.03); bar(B.metal, [x + dy, y - dx, z0], [x + dy, y - dx, z1], 0.03);
    for (k = z0 + 0.3; k < z1; k += 0.35) bar(B.metal, [x - dy, y + dx, k], [x + dy, y - dx, k], 0.015);
  }
  /* a row of windows on a house face: x fixed (fore face), y0..y1, z0..z1, n panes */
  function windowsX(B, x, y0, y1, z0, z1, n) {
    var i, w = (y1 - y0) / n;
    for (i = 0; i < n; i++) box(B.glass, x - 0.04, x + 0.04, y0 + i * w + w * 0.12, y0 + (i + 1) * w - w * 0.12, z0, z1);
  }
  function windowsY(B, y, x0, x1, z0, z1, n) {
    var i, w = (x1 - x0) / n;
    for (i = 0; i < n; i++) box(B.glass, x0 + i * w + w * 0.12, x0 + (i + 1) * w - w * 0.12, y - 0.04, y + 0.04, z0, z1);
  }
  /* doors on a house side (y face) */
  function doors(B, y, xs, z) { xs.forEach(function (x) { box(B.dark, x - 0.38, x + 0.38, y - 0.05, y + 0.05, z, z + 1.8); }); }

  /* ------------------------------------------------------------ masts, radars, funnels */
  /* four-legged lattice: foot half-width w0, head w1, z0..z1, n bays of X bracing */
  function lattice(B, x, y, z0, z1, w0, w1, n) {
    var k, i, c = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
    for (i = 0; i < 4; i++) bar(B.metal, [x + c[i][0] * w0, y + c[i][1] * w0, z0], [x + c[i][0] * w1, y + c[i][1] * w1, z1], 0.08);
    for (k = 0; k < n; k++) {
      var za = lerp(z0, z1, k / n), zb = lerp(z0, z1, (k + 1) / n), wa = lerp(w0, w1, k / n), wb = lerp(w0, w1, (k + 1) / n);
      for (i = 0; i < 4; i++) {
        var p = c[i], q = c[(i + 1) % 4];
        bar(B.metal, [x + p[0] * wa, y + p[1] * wa, za], [x + q[0] * wb, y + q[1] * wb, zb], 0.04);
        bar(B.metal, [x + q[0] * wa, y + q[1] * wa, za], [x + p[0] * wb, y + p[1] * wb, zb], 0.04);
        bar(B.metal, [x + p[0] * wb, y + p[1] * wb, zb], [x + q[0] * wb, y + q[1] * wb, zb], 0.04);
      }
    }
  }
  function pole(B, x, y, z0, z1, r0, r1) { cyl(B.metal, [x, y, z0], [x, y, z1], r0, r1 === undefined ? r0 * 0.6 : r1, 8); }
  function yard(B, x, z, span, y) { var c = y || 0; bar(B.metal, [x, c - span, z], [x, c + span, z], 0.06); }
  function platform(B, x, y, z, r) { cylZ(B.sup, x, y, z - 0.15, z, r, 12); }
  /* bedstead air-search array (DRBV 22 / 20 / 23 style): a framed grid w wide, h tall, facing +-y at
     (x, y, z) on a turntable, trained to yaw */
  function bedstead(B, x, y, z, w, h, yaw, nx, nz) {
    var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0), i;
    function P(u, v) { return [x + u * c, y + u * s, z + v]; }
    var cols = nx || 6, rows = nz || 3;
    for (i = 0; i <= cols; i++) { var u = -w / 2 + w * i / cols; bar(B.metal, P(u, 0), P(u, h), 0.04); }
    for (i = 0; i <= rows; i++) { var v = h * i / rows; bar(B.metal, P(-w / 2, v), P(w / 2, v), 0.04); }
    cylZ(B.metal, x, y, z - 0.6, z, 0.25, 8);
  }
  /* a dish reflector facing +x rotated by yaw, radius r */
  function dish(B, x, y, z, r, yaw) {
    var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
    ellipsoid({ tri: function (a, b, cc, na, nb, nc) {
      function T(p) { var dx = p[0] - x, dy = p[1] - y; return [x + dx * c - dy * s, y + dx * s + dy * c, p[2]]; }
      B.light.tri(T(a), T(b), T(cc));
    } }, [x, y, z], r * 0.3, r, r, 3, 12, -PI / 2, PI / 2);
  }
  function radome(B, x, y, z, r, h) { ellipsoid(B.light, [x, y, z], r, r, h || r, 6, 16); }
  /* funnel: oval plan a x b (half), raked back by rk over its height, top cap band dark */
  function funnel(B, x, y, z0, z1, a, b, rk, cap, mat) {
    var rings = [], k, n = 5;
    for (k = 0; k <= n; k++) {
      var z = lerp(z0, z1, k / n), t = k / n;
      rings.push(hring(x - rk * t, y, z, a * (1 - 0.05 * t), b * (1 - 0.05 * t), 0.7, 16));
    }
    loft(mat || B.sup, rings);
    if (cap) {
      var zc = z1 - cap;
      loft(B.dark, [hring(x - rk * (zc - z0) / (z1 - z0), y, zc, a * 0.96, b * 0.96, 0.7, 16), hring(x - rk - 0.05, y, z1 + 0.05, a * 0.97, b * 0.97, 0.7, 16)]);
    }
  }
  /* a fire-control director: a short drum with a dish or rangefinder ears */
  function director(B, x, y, z, r) {
    cylZ(B.sup, x, y, z, z + r * 0.9, r, 12);
    house(B.sup, x - r * 0.8, x + r * 0.9, r * 0.75, z + r * 0.9, z + r * 1.7, 0.1, 0.2, 0.1, y);
    dish(B, x + r * 1.0, y, z + r * 1.4, r * 0.7, 0);
  }

  /* ------------------------------------------------------------ guns (drawn at the origin, gun along +X) */
  /* 127 mm Mle 1948 twin [T1][T2][G1]: gun house 5.0 x 3.7 x 2.4 m, sloped face, 6.9 m barrels */
  function gun127(B) {
    cylZ(B.sup, 0, 0, 0, 0.45, 2.0, 16);
    sideSlab(B.sup, [[-2.6, 0.45], [2.2, 0.45], [2.6, 1.4], [1.7, 2.75], [-2.4, 2.75], [-2.7, 2.1]], -1.85, 1.85);
    box(B.sup, -2.2, -1.2, 1.0, 1.5, 2.75, 3.1); box(B.sup, -2.2, -1.2, -1.5, -1.0, 2.75, 3.1);
    box(B.dark, 2.15, 2.6, -0.85, 0.85, 1.25, 1.95);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 2.0, 2.9, s * 0.55, 1.6, 0.26, 10);
      cylX(B.metal, 2.8, 8.9, s * 0.55, 1.6, 0.1, 8);
      cylX(B.metal, 8.6, 9.0, s * 0.55, 1.6, 0.13, 8);
    }
    box(B.team, -2.2, 0.6, -0.5, 0.5, 2.75, 2.8);
  }
  /* 57 mm Mle 1951 twin [T1][E3][E4]: 3.2 x 2.6 x 2.0 m house, 3.4 m barrels with jackets */
  function gun57(B) {
    cylZ(B.sup, 0, 0, 0, 0.35, 1.35, 14);
    sideSlab(B.sup, [[-1.7, 0.35], [1.4, 0.35], [1.7, 1.0], [1.1, 2.0], [-1.6, 2.0], [-1.8, 1.5]], -1.25, 1.25);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(B.metal, 1.2, 2.8, s * 0.34, 1.25, 0.12, 8);
      cylX(B.metal, 2.7, 4.7, s * 0.34, 1.25, 0.05, 6);
    }
    box(B.dark, -1.4, -0.9, -1.27, 1.27, 0.6, 1.5);
  }
  /* 100 mm Mle 1953 / 1968 single [R1][F1][C1]: the rounded shield 3.6 x 2.7 x 2.4 m, 5.5 m barrel */
  function gun100(B) {
    cylZ(B.sup, 0, 0, 0, 0.4, 1.5, 16);
    var rings = [], k, sec = [[-1.9, 1.15, 0.9, 1.25], [-1.2, 1.3, 1.05, 1.3], [0.2, 1.3, 1.0, 1.35], [1.2, 1.05, 0.85, 1.3], [1.85, 0.7, 0.55, 1.2]];
    for (k = 0; k < sec.length; k++) rings.push(sring(sec[k][0], sec[k][1], sec[k][2], 0, sec[k][3] + 0.4, 0.55, 16));
    loft(B.sup, rings);
    cylX(B.dark, 1.6, 2.2, 0, 1.55, 0.22, 10);
    cylX(B.metal, 2.0, 7.4, 0, 1.55, 0.085, 8);
    box(B.team, -1.4, 0.4, -0.35, 0.35, 2.4, 2.45);
  }
  /* 40 / 20 mm single on a pedestal (light AA) */
  function gunLight(B, x, y, z, yaw) {
    cylZ(B.metal, x, y, z, z + 0.9, 0.22, 8);
    var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
    bar(B.metal, [x, y, z + 1.0], [x + 2.2 * c, y + 2.2 * s, z + 1.5], 0.05);
    box(B.sup, x - 0.35, x + 0.35, y - 0.45, y + 0.45, z + 0.7, z + 1.4);
  }
  /* triple 550 mm torpedo tube mount on a turntable, tubes along yaw */
  function tubes3(B, x, y, z, yaw) {
    cylZ(B.metal, x, y, z, z + 0.35, 1.0, 12);
    var c = Math.cos(yaw), s = Math.sin(yaw), k;
    for (k = -1; k <= 1; k++) {
      var ox = -s * k * 0.62, oy = c * k * 0.62;
      cyl(B.sup, [x + ox - c * 3.2, y + oy - s * 3.2, z + 0.75], [x + ox + c * 3.4, y + oy + s * 3.4, z + 0.75], 0.32, 0.32, 10);
    }
  }
  /* Masurca twin-arm launcher Mk 2 [L1]: a drum on a deckhouse, two beams with the missiles slung under */
  function masurca(B, x, y, z, yaw) {
    var c = Math.cos(yaw || PI), s = Math.sin(yaw || PI), k;
    cylZ(B.sup, x, y, z, z + 1.6, 2.0, 16);
    house(B.sup, x - 1.6, x + 1.6, 1.4, z + 1.6, z + 3.3, 0.2, 0.3, 0.3, y);
    for (k = -1; k <= 1; k += 2) {
      var ox = -s * k * 1.6, oy = c * k * 1.6;
      cyl(B.sup, [x + ox - c * 2.5, y + oy - s * 2.5, z + 3.0], [x + ox + c * 5.5, y + oy + s * 5.5, z + 3.6], 0.45, 0.35, 8);
      cyl(B.light, [x + ox - c * 2.0, y + oy - s * 2.0, z + 2.3], [x + ox + c * 5.8, y + oy + s * 5.8, z + 2.9], 0.2, 0.2, 10);
      cyl(B.light, [x + ox + c * 5.8, y + oy + s * 5.8, z + 2.9], [x + ox + c * 6.8, y + oy + s * 6.8, z + 2.97], 0.2, 0.01, 10);
    }
  }
  /* a trained mount in its own bins, flushed into a group named "turret" at P */
  function turretGroup(THREE, T, P, draw) {
    var tg = new THREE.Group(), TB = bins(T);
    tg.name = "turret";
    draw(TB);
    flush(THREE, tg, TB);
    tg.position.set(P[0], P[1], P[2]);
    return tg;
  }
  /* a fixed mount: drawn at the origin into scratch bins, then moved and turned into B */
  function placed(B, x, y, z, yaw, draw) {
    var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0), k, P = {};
    BIN_NAMES.forEach(function (n) {
      P[n] = { tri: function (a, b, cc, na, nb, nc) {
        function T(p) { return [x + p[0] * c - p[1] * s, y + p[0] * s + p[1] * c, z + p[2]]; }
        function R(nv) { return nv ? [nv[0] * c - nv[1] * s, nv[0] * s + nv[1] * c, nv[2]] : nv; }
        B[n].tri(T(a), T(b), T(cc), R(na), R(nb), R(nc));
      } };
    });
    draw(P);
  }
  function hidden(THREE, root, name, P) {
    var o = new THREE.Object3D(); o.name = name; o.visible = false; o.position.set(P[0], P[1], P[2]); root.add(o);
  }

  /* ================================================== Commandant Riviere [R1]
     d = (px - 75) / 15.08 off [R1] (stern 75, stem head 1553 = 98.0 m), z = (638 - py) / 15.08 */
  var RIV = hullFns({ L: 98.0, bt: 0.5, st: [
    [0.0, 3.0, 4.4, 0.0, -0.4], [1.3, 3.0, 4.7, 3.5, 0.7], [6, 3.0, 5.3, 4.7, 2.6], [15, 3.0, 5.7, 5.5, 3.6],
    [30, 3.0, 5.8, 5.75, 3.8], [50, 3.0, 5.8, 5.75, 3.8], [65, 3.2, 5.7, 5.4, 3.8], [75, 3.7, 5.35, 4.5, 3.7],
    [84, 4.5, 4.6, 3.0, 3.4], [91, 5.1, 3.5, 1.5, 2.6], [95.5, 5.5, 2.1, 0.0, 0.0], [98.0, 5.77, 0.25, 0.0, -5.3]] });
  function riviere(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = RIV, X = H.X, s, d;
    shipHull(B, H);
    deckRails(B, H, 0.4, 97.6);
    /* main deckhouse (01 level) d 17.3 - 71.3, roof 5.5 */
    house(B.sup, X(17.3), X(71.3), 4.2, 2.9, 5.5, 0.05, 0.3, 0);
    roofRail(B, X(17.3), X(51.6), 4.1, 5.5, "f");
    scuttles(B, H, 40, 66, 2.05, 2.6);
    doors(B, 4.22, [X(36), X(46), X(64)], 3.0); doors(B, -4.22, [X(36), X(46), X(64)], 3.0);
    /* 02 deckhouse aft d 26.9 - 33.8 roof 8.0 with the director */
    house(B.sup, X(26.9), X(33.8), 2.4, 5.5, 8.0, 0.05, 0.2, 0.1);
    director(B, X(31.4), 0, 8.0, 1.1);
    roofRail(B, X(26.9), X(33.8), 2.3, 8.0);
    /* funnel d 37.9 - 43.1, z 5.5 - 11.8, raked */
    funnel(B, X(40.5), 0, 5.5, 11.8, 2.6, 1.6, 0.4, 0.5);
    /* bridge block d 51.6 - 68.4 to 10.5, top d 58.2 - 68.0 to 11.5, the tower 58.6 - 60.4 to 13.5 */
    house(B.sup, X(51.6), X(68.4), 3.6, 5.5, 10.5, 0.1, 0.4, 0);
    house(B.sup, X(58.2), X(68.0), 2.9, 10.5, 11.5, 0.05, 0.4, 0);
    house(B.sup, X(58.6), X(60.4), 1.0, 11.5, 13.5, 0.05, 0.1, 0.1);
    windowsX(B, X(68.0) - 0.4, -2.6, 2.6, 10.65, 11.25, 8);
    windowsX(B, X(68.4) - 0.4, -3.3, 3.3, 9.6, 10.2, 9);
    roofRail(B, X(51.6), X(58.2), 3.5, 10.5, "f");
    roofRail(B, X(58.2), X(68.0), 2.8, 11.5);
    rafts(B, X(52.5), 3, 3.0, 10.5, 1.7); rafts(B, X(52.5), 3, -3.0, 10.5, 1.7);
    rafts(B, X(68.6), 2, 3.4, 5.5, 1.5); rafts(B, X(68.6), 2, -3.4, 5.5, 1.5);
    /* the tripod mast at d 53.0 (leg foot 55.8), head 24.4; yards at 20.1 (+-4.6); DRBV 22A on top */
    pole(B, X(53.0), 0, 10.5, 24.4, 0.22, 0.1);
    for (s = -1; s <= 1; s += 2) bar(B.metal, [X(55.8), s * 1.2, 10.5], [X(53.0), 0, 19.3], 0.12);
    yard(B, X(53.0), 20.1, 4.6); yard(B, X(53.2), 16.2, 2.6);
    platform(B, X(53.0), 0, 21.0, 1.1);
    bedstead(B, X(53.0), 0, 21.6, 4.0, 1.6, 0, 6, 3);
    whip(B, X(52.0), 2.0, 11.5, 6.0); whip(B, X(52.0), -2.0, 11.5, 6.0);
    /* 305 mm quadruple A/S mortar on the 01 extension d 70 - 74 [R1] */
    house(B.sup, X(69.5), X(76.0), 2.4, 3.6, 6.2, 0.05, 0.3, 0);
    placed(B, X(72.0), 0, 6.2, 0, function (P) {
      cylZ(P.sup, 0, 0, 0, 0.5, 1.4, 14); box(P.sup, -1.0, 1.0, -1.0, 1.0, 0.5, 1.6);
      for (var i = -1; i <= 1; i += 2) for (var j = -1; j <= 1; j += 2) cyl(P.metal, [-0.2, i * 0.45, 1.2 + j * 0.0], [1.1, i * 0.45, 2.0 + (j + 1) * 0.25], 0.18, 0.18, 8);
    });
    /* the 100 mm guns: aft A on the deck d 13.9, aft B on the 01 roof d 24.3, both trained aft */
    placed(B, X(13.9), 0, 3.0, PI, gun100);
    placed(B, X(24.3), 0, 5.5, PI, gun100);
    /* boats on davits amidships [R1] */
    for (s = -1; s <= 1; s += 2) boat(B, X(35.5), s * 4.9, 5.2, 7.0, 2.3, 3.0, s);
    /* foredeck: anchors, bollards, fairleads, hatches, vents */
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(92.0), H.hW(92.0) + 0.6, 4.2, s);
      bollard(B, X(88.5), s * 2.6, H.zD(88.5)); bollard(B, X(5.0), s * 3.8, 3.0); bollard(B, X(40.0), s * 5.0, 3.0);
      fairlead(B, X(94.0), s * 1.4, H.zD(94.0)); fairlead(B, X(1.5), s * 3.8, 3.0);
      vent(B, X(78.5), s * 2.2, H.zD(78.5)); vent(B, X(9.0), s * 2.4, 3.0);
      cowl(B, X(45.5), s * 2.5, 5.5);
    }
    cylZ(B.metal, X(89.5), 0, H.zD(89.5), H.zD(89.5) + 0.5, 0.45, 10);
    hatch(B, X(79.0), 0, H.zD(79.0), 1.4, 1.2); hatch(B, X(7.5), 0, 3.0, 1.4, 1.2);
    pole(B, X(0.5), 0, 3.0, 7.5, 0.06);                       /* ensign staff (no ensign) */
    pole(B, X(97.6), 0, 5.77, 9.0, 0.05);                     /* jack staff */
    box(B.team, X(59.0), X(67.0), -0.6, 0.6, 11.5, 11.56);
    box(B.team, X(27.5), X(33.0), -0.5, 0.5, 8.0, 8.05);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, [X(83.2), 0, H.zD(83.2)], gun100));
    return g;
  }

  /* ================================================== T 47 Surcouf [T1][T2]
     d = (px - 65) / 10.55 off [T1] (stern 65, stem head 1422 = 128.6 m), z = (638 - py) / 10.55 */
  var T47 = hullFns({ L: 128.6, bt: 0.55, st: [
    [0.0, 5.0, 4.8, 0.0, -0.5], [1.0, 5.0, 5.2, 3.6, 0.8], [8, 5.0, 5.9, 5.5, 3.5], [20, 5.05, 6.3, 6.2, 4.6],
    [40, 5.1, 6.4, 6.35, 4.8], [70, 5.3, 6.4, 6.35, 4.8], [90, 5.6, 6.2, 5.9, 4.7], [105, 5.85, 5.4, 4.4, 4.3],
    [115, 6.0, 4.3, 2.6, 3.6], [122, 6.05, 2.9, 1.0, 2.2], [126.7, 6.1, 1.6, 0.0, 0.0], [128.6, 6.15, 0.25, 0.0, -5.6]] });
  function t47(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = T47, X = H.X, s;
    shipHull(B, H);
    deckRails(B, H, 0.4, 128.2);
    /* the long 01 deckhouse d 22.3 - 87.7, roof 7.1 [T1] */
    house(B.sup, X(22.3), X(96.2), 4.6, 4.9, 7.1, 0.05, 0.4, 0.3);
    roofRail(B, X(22.3), X(82.9), 4.5, 7.1, "f");
    scuttles(B, H, 30, 100, 3.6, 2.4);
    doors(B, 4.62, [X(40), X(58), X(76)], 5.1); doors(B, -4.62, [X(40), X(58), X(76)], 5.1);
    /* the aft 127 mm pair: Y on the deck d 20.4, X superfiring on the 01 roof d 28.7, trained aft */
    placed(B, X(20.4), 0, 5.0, PI, gun127);
    placed(B, X(28.7), 0, 7.1, PI, gun127);
    /* the 57 mm twin on its tub d 53.1 and its director tower d 58.5 [T1] */
    cylZ(B.sup, X(53.1), 0, 7.1, 7.7, 1.8, 16); placed(B, X(53.1), 0, 7.7, PI, gun57);
    house(B.sup, X(57.3), X(59.7), 1.2, 7.1, 9.6, 0.05, 0.1, 0.1); director(B, X(58.5), 0, 9.6, 0.9);
    /* aft funnel d 65.3 - 68.1 to 13.1, radar lattice d 68.5 - 70.3 with the bedspring at 18.5 */
    funnel(B, X(66.7), 0, 7.1, 13.1, 1.8, 1.5, 0.2, 0.9);
    lattice(B, X(69.4), 0, 7.1, 18.3, 1.3, 0.5, 5);
    platform(B, X(69.4), 0, 18.4, 1.5);
    bedstead(B, X(69.4), 0, 18.9, 5.6, 1.3, 0, 8, 3);
    /* forward funnel d 77.7 - 81.0 to 13.6 */
    funnel(B, X(79.3), 0, 7.1, 13.6, 2.0, 1.6, 0.2, 0.9);
    /* bridge d 82.9 - 93.4 to 14.8 on its 01 front to 96.2; director d 89.3 - 92.9 */
    house(B.sup, X(82.9), X(93.4), 3.9, 7.1, 11.6, 0.1, 0.3, 0);
    house(B.sup, X(84.5), X(93.0), 3.3, 11.6, 14.8, 0.1, 0.5, 0);
    windowsX(B, X(93.0) - 0.5, -3.0, 3.0, 13.8, 14.5, 9);
    windowsX(B, X(93.4) - 0.3, -3.6, 3.6, 10.6, 11.2, 9);
    director(B, X(91.1), 0, 14.8, 1.0);
    roofRail(B, X(82.9), X(84.5), 3.8, 11.6, "f"); roofRail(B, X(84.5), X(93.0), 3.2, 14.8);
    rafts(B, X(85.0), 3, 4.2, 7.1, 1.5); rafts(B, X(85.0), 3, -4.2, 7.1, 1.5);
    /* foremast d 82.0 to 29.5: yards 24.5 / 22.6, the radar near its head */
    pole(B, X(82.0), 0, 14.8, 29.5, 0.25, 0.09);
    for (s = -1; s <= 1; s += 2) bar(B.metal, [X(80.8), s * 1.5, 7.1], [X(82.0), 0, 16.0], 0.12);
    yard(B, X(82.0), 24.5, 3.5); yard(B, X(82.0), 22.6, 2.6);
    platform(B, X(82.3), 0, 25.4, 1.0); bedstead(B, X(82.3), 0, 25.8, 2.2, 1.6, 0, 4, 3);
    /* boats on davits by the after funnel, rafts between the funnels */
    for (s = -1; s <= 1; s += 2) {
      boat(B, X(73.0), s * 5.2, 8.2, 7.5, 2.3, 7.1, s);
      rafts(B, X(62.0), 2, s * 3.6, 7.1, 1.4);
      cowl(B, X(75.5), s * 2.6, 7.1); cowl(B, X(63.5), s * 2.6, 7.1);
    }
    /* foredeck: anchors, bollards, capstans, hatches */
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(121.5), H.hW(121.5) + 0.9, 5.0, s);
      bollard(B, X(116.5), s * 3.0, H.zD(116.5)); bollard(B, X(6.0), s * 4.6, 5.0); bollard(B, X(60.0), s * 5.6, 5.3);
      fairlead(B, X(124.5), s * 1.6, H.zD(124.5)); fairlead(B, X(2.0), s * 4.5, 5.0);
      vent(B, X(100.5), s * 2.6, H.zD(100.5)); vent(B, X(12.0), s * 3.0, 5.0);
    }
    cylZ(B.metal, X(118.0), 0, H.zD(118), H.zD(118) + 0.5, 0.5, 10);
    hatch(B, X(103.0), 0, H.zD(103), 1.6, 1.4); hatch(B, X(10.0), 0, 5.0, 1.6, 1.4);
    pole(B, X(0.5), 0, 5.0, 10.0, 0.07); pole(B, X(128.2), 0, 6.15, 9.5, 0.05);
    box(B.team, X(85.5), X(92.5), -0.6, 0.6, 14.8, 14.86); box(B.team, X(24.0), X(32.0), -0.5, 0.5, 7.1, 7.15);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, [X(109.6), 0, H.zD(109.6)], gun127));
    return g;
  }

  /* ================================================== Le Corse (E 50) [E1][E2][E3][E4]
     No side-on photograph: stations are fractions of the 99.8 m length read off [E3] / [E4] (sister
     class, the same layout) and heights off the head-on [E2] at the 10.3 m beam */
  var CORSE = hullFns({ L: 99.8, bt: 0.5, st: [
    [0.0, 3.1, 3.9, 0.0, -0.4], [1.2, 3.1, 4.2, 3.2, 0.6], [8, 3.1, 4.8, 4.5, 2.6], [25, 3.15, 5.15, 5.1, 3.4],
    [50, 3.3, 5.15, 5.15, 3.4], [65, 3.6, 5.1, 4.9, 3.4], [78, 4.2, 4.6, 3.9, 3.2], [88, 4.8, 3.6, 2.2, 2.6],
    [95, 5.2, 2.3, 0.6, 1.4], [97.6, 5.35, 1.4, 0.0, 0.0], [99.8, 5.5, 0.2, 0.0, -5.0]] });
  function leCorse(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = CORSE, X = H.X, s;
    shipHull(B, H);
    deckRails(B, H, 0.4, 99.4);
    /* after deckhouse d 17 - 30 (roof 5.4) with X 57 mm, Y 57 mm on the quarterdeck [E4] */
    house(B.sup, X(17.0), X(30.0), 3.0, 3.0, 5.4, 0.05, 0.3, 0.3);
    roofRail(B, X(17.0), X(30.0), 2.9, 5.4, "f");
    placed(B, X(14.0), 0, 3.1, PI, gun57);
    placed(B, X(21.5), 0, 5.4, PI, gun57);
    /* director tower d 31.5 - 34.5 to 9.0 */
    house(B.sup, X(30.0), X(36.0), 2.8, 3.0, 5.4, 0.05, 0.2, 0.2);
    house(B.sup, X(31.8), X(34.4), 1.1, 5.4, 9.0, 0.05, 0.1, 0.1); director(B, X(33.1), 0, 9.0, 0.85);
    /* four triple 550 mm tube mounts amidships, trained fore and aft [E4] */
    for (s = -1; s <= 1; s += 2) { tubes3(B, X(39.0), s * 2.7, 3.25, 0); tubes3(B, X(44.5), s * 2.7, 3.3, 0); }
    /* the 01 house d 46 - 77, roof 5.6; funnel d 47 - 52 to 11.0; boats on davits */
    house(B.sup, X(46.0), X(77.0), 3.8, 3.2, 5.6, 0.05, 0.4, 0.2);
    scuttles(B, H, 50, 80, 2.2, 2.4);
    doors(B, 3.82, [X(49), X(61)], 3.4); doors(B, -3.82, [X(49), X(61)], 3.4);
    funnel(B, X(49.5), 0, 5.6, 11.0, 2.4, 1.6, 0.3, 0.8);
    for (s = -1; s <= 1; s += 2) { boat(B, X(52.5), s * 4.6, 6.4, 6.5, 2.1, 5.6, s); cowl(B, X(46.5), s * 2.6, 5.6); }
    /* bridge d 56 - 69 to 9.2 / 10.4; the lattice mast d 57 with the DRBV 22A bedstead [E2][E3] */
    house(B.sup, X(56.0), X(69.0), 3.2, 5.6, 8.0, 0.1, 0.3, 0);
    house(B.sup, X(58.0), X(68.2), 2.8, 8.0, 10.4, 0.1, 0.6, 0);
    windowsX(B, X(68.2) - 0.6, -2.5, 2.5, 9.5, 10.1, 8);
    roofRail(B, X(58.0), X(68.2), 2.7, 10.4); roofRail(B, X(56.0), X(58.0), 3.1, 8.0, "f");
    director(B, X(66.0), 0, 10.4, 0.8);
    lattice(B, X(58.5), 0, 10.4, 17.0, 0.9, 0.35, 4);
    platform(B, X(58.5), 0, 17.1, 1.2);
    bedstead(B, X(58.5), 0, 17.5, 4.2, 1.7, 0, 6, 3);
    pole(B, X(58.5), 0, 17.1, 22.0, 0.1, 0.05);
    yard(B, X(58.5), 15.5, 3.2);
    rafts(B, X(57.0), 3, 3.4, 5.6, 1.4); rafts(B, X(57.0), 3, -3.4, 5.6, 1.4);
    /* forward: 57 mm twin superfiring on the bridge front d 71 (the turret), the sextuple 375 mm A/S
       rocket launcher on the 01 front d 75.5 [E1][E3] */
    house(B.sup, X(69.0), X(73.3), 2.4, 5.6, 7.0, 0.05, 0.2, 0);
    placed(B, X(75.5), 0, 5.6, 0, function (P) {
      cylZ(P.sup, 0, 0, 0, 0.5, 1.2, 12); box(P.sup, -0.9, 0.9, -1.0, 1.0, 0.5, 1.6);
      for (var i = 0; i < 2; i++) for (var j = 0; j < 3; j++) cyl(P.metal, [-0.3, (j - 1) * 0.45, 1.2 + i * 0.45], [1.5, (j - 1) * 0.45, 1.9 + i * 0.45], 0.19, 0.19, 8);
    });
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(92.5), H.hW(92.5) + 0.6, 4.0, s);
      bollard(B, X(88.0), s * 2.4, H.zD(88)); bollard(B, X(5.0), s * 3.7, 3.1);
      fairlead(B, X(95.0), s * 1.3, H.zD(95)); fairlead(B, X(1.5), s * 3.6, 3.1);
      vent(B, X(82.0), s * 2.0, H.zD(82)); vent(B, X(9.0), s * 2.4, 3.1);
    }
    cylZ(B.metal, X(89.5), 0, H.zD(89.5), H.zD(89.5) + 0.45, 0.42, 10);
    hatch(B, X(83.0), 0, H.zD(83), 1.3, 1.1); hatch(B, X(8.0), 0, 3.1, 1.3, 1.1);
    pole(B, X(0.5), 0, 3.1, 7.5, 0.06); pole(B, X(99.4), 0, 5.5, 8.5, 0.05);
    box(B.team, X(59.0), X(65.0), -0.6, 0.6, 10.4, 10.46); box(B.team, X(17.5), X(19.5), -0.5, 0.5, 5.4, 5.45);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, [X(71.2), 0, 7.0], gun57));
    return g;
  }

  /* ================================================== Suffren [F1][F2]
     d = (1342 - px) / 8.19 off [F1] (stem head 52, stern 1342 = 157.6 m), z = (548 - py) / 8.19 */
  var SUFF = hullFns({ L: 157.6, bt: 0.6, st: [
    [0.0, 3.4, 6.2, 0.0, -0.6], [1.5, 3.4, 6.6, 5.0, 1.0], [10, 3.4, 7.3, 6.9, 4.2], [30, 3.45, 7.75, 7.6, 5.0],
    [31.2, 6.1, 7.75, 7.6, 5.0], [70, 6.1, 7.8, 7.77, 5.0], [100, 6.3, 7.7, 7.5, 5.0], [120, 7.0, 7.2, 6.4, 4.8],
    [135, 7.7, 6.1, 4.6, 4.3], [147, 8.3, 4.4, 2.2, 3.0], [154, 8.6, 2.6, 0.4, 1.0], [155.5, 8.7, 1.9, 0.0, 0.0],
    [157.6, 8.9, 0.3, 0.0, -7.6]] });
  function suffren(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = SUFF, X = H.X, s;
    shipHull(B, H);
    deckRails(B, H, 0.4, 30.6); deckRails(B, H, 31.6, 157.2);
    /* quarterdeck: the Masurca Mk 2 launcher d 9.4 on its magazine house, trained aft [F1] */
    house(B.sup, X(4.5), X(19.0), 3.6, 3.3, 5.6, 0.05, 0.4, 0.3);
    masurca(B, X(10.5), 0, 5.6, PI);
    /* after superstructure d 30.8 - 54.6 to 11.0; lattice mast d 38.7 to 24.8; the two DRBR 51 */
    house(B.sup, X(30.8), X(54.6), 5.2, 6.0, 11.0, 0.1, 0.4, 0.5);
    roofRail(B, X(30.8), X(54.6), 5.1, 11.0);
    lattice(B, X(38.7), 0, 11.0, 23.5, 1.3, 0.45, 4);
    pole(B, X(38.7), 0, 23.5, 26.5, 0.12, 0.05); platform(B, X(38.7), 0, 22.0, 1.2);
    cylZ(B.sup, X(33.8), 0, 11.0, 13.8, 1.0, 12); radome(B, X(33.8), 0, 14.8, 1.6, 1.3);
    cylZ(B.sup, X(47.3), 0, 11.0, 13.2, 1.0, 12); radome(B, X(47.3), 0, 14.2, 1.6, 1.3);
    scuttles(B, H, 35, 140, 4.2, 2.6);
    /* the mack d 66.2 - 72.9: a tapered oval tower to 29, the pole mast over it to 45 [F1][F2] */
    var mr = [], k;
    for (k = 0; k <= 4; k++) { var t = k / 4; mr.push(hring(X(69.5) - 0.6 * t, 0, lerp(6.1, 29.0, t), lerp(3.4, 1.9, t), lerp(2.6, 1.5, t), 0.75, 16)); }
    loft(B.sup, mr);
    loft(B.dark, [hring(X(68.9), 0, 28.6, 1.95, 1.55, 0.75, 16), hring(X(68.85), 0, 29.3, 1.95, 1.55, 0.75, 16)]);
    lattice(B, X(69.3), 0, 29.0, 40.0, 0.9, 0.3, 4);
    pole(B, X(69.3), 0, 40.0, 45.4, 0.1, 0.04);
    yard(B, X(69.3), 30.4, 4.0); yard(B, X(69.3), 35.5, 2.6); platform(B, X(69.3), 0, 37.5, 1.0);
    /* main superstructure d 72.9 - 109.5: 01 to 11.0, the bridge levels to 16.8; the DRBI 23 radome
       (centre d 91.2, z 24.7, r 5.3) on its pedestal [F1][F2] */
    house(B.sup, X(60.0), X(109.5), 5.4, 6.0, 11.0, 0.1, 0.3, 0.3);
    house(B.sup, X(76.0), X(105.0), 4.4, 11.0, 14.0, 0.1, 0.4, 0.2);
    house(B.sup, X(95.0), X(104.5), 3.6, 14.0, 16.8, 0.1, 0.7, 0);
    windowsX(B, X(104.5) - 0.8, -3.2, 3.2, 15.6, 16.4, 10);
    cylZ(B.sup, X(91.2), 0, 14.0, 19.6, 2.3, 16);
    radome(B, X(91.2), 0, 24.7, 5.3, 5.3);
    roofRail(B, X(60.0), X(76.0), 5.3, 11.0, "f"); roofRail(B, X(76.0), X(95.0), 4.3, 14.0, "f"); roofRail(B, X(95.0), X(104.5), 3.5, 16.8);
    director(B, X(101.0), 2.0, 16.8, 0.8); director(B, X(101.0), -2.0, 16.8, 0.8);
    for (s = -1; s <= 1; s += 2) {
      rafts(B, X(84.5), 8, s * 5.0, 11.0, 1.6);
      boat(B, X(60.0), s * 6.6, 8.0, 7.5, 2.4, 6.1, s);
      cowl(B, X(56.5), s * 4.0, 6.1); doors(B, s * 5.42, [X(64), X(80), X(98)], 6.2);
    }
    whip(B, X(80.0), 4.0, 14.0, 7.0); whip(B, X(80.0), -4.0, 14.0, 7.0);
    /* 100 mm B on the 01 forward house d 107.7 - 126.0 (roof 10.4); A on the forecastle d 128.7 */
    house(B.sup, X(107.7), X(126.0), 3.8, 6.6, 10.4, 0.05, 0.6, 0);
    placed(B, X(119.7), 0, 10.4, 0, gun100);
    roofRail(B, X(107.7), X(126.0), 3.7, 10.4, "a");
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(146.0), H.hW(146) + 1.4, 7.2, s);
      bollard(B, X(140.0), s * 3.4, H.zD(140)); bollard(B, X(5.0), s * 5.6, 3.4); bollard(B, X(26.0), s * 6.9, 3.45);
      fairlead(B, X(150.5), s * 1.8, H.zD(150.5)); fairlead(B, X(1.5), s * 5.8, 3.4);
      vent(B, X(134.0), s * 3.0, H.zD(134));
    }
    cylZ(B.metal, X(142.0), 0, H.zD(142), H.zD(142) + 0.55, 0.55, 10);
    hatch(B, X(136.0), 0, H.zD(136), 1.6, 1.4);
    pole(B, X(0.5), 0, 3.4, 8.5, 0.07); pole(B, X(157.2), 0, 8.9, 12.0, 0.05);
    box(B.team, X(96.0), X(103.0), -0.7, 0.7, 16.8, 16.86); box(B.team, X(32.0), X(37.0), -0.6, 0.6, 11.0, 11.05);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, [X(128.7), 0, H.zD(128.7)], gun100));
    return g;
  }

  /* ================================================== De Grasse [G1]
     d = (1355 - px) / 7.13 off [G1] (stem 12, stern 1355 = 188.3 m), z = (400 - py) / 7.13 */
  var GRASSE = hullFns({ L: 188.3, bt: 0.7, st: [
    [0.0, 5.0, 7.5, 0.0, -0.8], [2.0, 5.0, 8.0, 5.5, 1.2], [12, 5.0, 9.2, 8.6, 4.4], [33, 5.1, 10.4, 10.3, 5.5],
    [34.5, 9.3, 10.4, 10.3, 5.5], [90, 9.3, 10.8, 10.75, 5.54], [130, 9.5, 10.5, 10.2, 5.54], [155, 9.9, 9.0, 7.8, 5.3],
    [170, 10.2, 6.6, 4.4, 4.4], [180, 10.4, 4.2, 1.6, 2.8], [185.6, 10.5, 2.2, 0.0, 0.0], [188.3, 10.6, 0.3, 0.0, -9.6]] });
  function deGrasse(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = GRASSE, X = H.X, s;
    shipHull(B, H);
    deckRails(B, H, 0.5, 33.8); deckRails(B, H, 35.2, 187.8);
    scuttles(B, H, 40, 170, 6.2, 3.0); scuttles(B, H, 8, 32, 2.6, 3.0);
    /* aft 127 mm group [G1]: Y on the quarterdeck d 30.2 is under the forecastle break, so the after
       pair is drawn X d 38.6 on the deck and the superfiring mount d 47.0 on the after house */
    placed(B, X(38.6), 0, 9.3, PI, gun127);
    house(B.sup, X(43.0), X(75.0), 6.2, 9.2, 12.6, 0.1, 0.3, 0.6);
    placed(B, X(47.5), 0, 12.6, PI, gun127);
    for (s = -1; s <= 1; s += 2) placed(B, X(55.5), s * 7.4, 9.3, PI, gun127);
    roofRail(B, X(43.0), X(75.0), 6.1, 12.6);
    house(B.sup, X(58.0), X(66.0), 3.0, 12.6, 15.6, 0.1, 0.2, 0.2); director(B, X(62.0), 0, 15.6, 1.2);
    /* mainmast d 65 - 70 to 26.6, funnel d 75 - 82.7 to 30.8 with its dark cap [G1] */
    pole(B, X(67.5), 0, 15.6, 26.6, 0.3, 0.12);
    for (s = -1; s <= 1; s += 2) bar(B.metal, [X(65.0), s * 2.2, 12.6], [X(67.5), 0, 22.0], 0.16);
    yard(B, X(67.5), 23.5, 4.5);
    house(B.sup, X(70.0), X(115.0), 6.6, 9.2, 13.8, 0.1, 0.3, 0.3);
    funnel(B, X(78.9), 0, 13.8, 30.8, 4.4, 3.0, 1.0, 2.6);
    for (s = -1; s <= 1; s += 2) {
      boat(B, X(88.0), s * 8.2, 14.3, 9.0, 2.6, 13.8, s); boat(B, X(72.5), s * 7.4, 14.0, 7.5, 2.3, 12.6, s);
      placed(B, X(96.0), s * 7.6, 9.3, PI, gun57); placed(B, X(103.0), s * 7.6, 9.3, 0, gun57);
      cowl(B, X(84.0), s * 4.5, 13.8);
    }
    /* foremast tower d 85 - 90 to 49.5 with its radars; the bridge block d 92.4 - 115 to 23.8 [G1] */
    lattice(B, X(87.5), 0, 13.8, 38.0, 2.2, 0.7, 6);
    platform(B, X(87.5), 0, 30.0, 2.0); platform(B, X(87.5), 0, 38.1, 1.4);
    bedstead(B, X(87.5), 0, 38.6, 7.0, 2.0, 0, 8, 3);
    pole(B, X(87.5), 0, 38.1, 49.5, 0.14, 0.05); yard(B, X(87.5), 44.0, 3.5);
    house(B.sup, X(92.4), X(115.0), 5.4, 13.8, 17.8, 0.1, 0.4, 0);
    house(B.sup, X(97.0), X(113.5), 4.4, 17.8, 21.0, 0.1, 0.6, 0);
    house(B.sup, X(100.0), X(111.5), 3.4, 21.0, 23.8, 0.1, 0.7, 0);
    windowsX(B, X(111.5) - 0.8, -3.0, 3.0, 22.7, 23.5, 10);
    director(B, X(104.0), 0, 23.8, 1.3);
    roofRail(B, X(92.4), X(97.0), 5.3, 17.8, "f"); roofRail(B, X(97.0), X(100.0), 4.3, 21.0, "f"); roofRail(B, X(100.0), X(111.5), 3.3, 23.8);
    for (s = -1; s <= 1; s += 2) placed(B, X(118.0), s * 7.2, 9.5, 0, gun127);
    /* forward pair: B superfiring on its barbette house d 124.8, A on the forecastle d 134 (the turret) */
    house(B.sup, X(121.0), X(128.5), 3.0, 9.4, 11.8, 0.05, 0.4, 0.2);
    placed(B, X(124.8), 0, 11.8, 0, gun127);
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(176.0), H.hW(176) + 1.6, 8.8, s);
      bollard(B, X(168.0), s * 4.5, H.zD(168)); bollard(B, X(158.0), s * 6.5, H.zD(158)); bollard(B, X(6.0), s * 7.6, 5.0);
      fairlead(B, X(182.0), s * 2.5, H.zD(182)); fairlead(B, X(2.0), s * 7.5, 5.0);
      vent(B, X(150.0), s * 3.5, H.zD(150)); vent(B, X(20.0), s * 4.0, 5.0);
    }
    cylZ(B.metal, X(170.0), 0, H.zD(170), H.zD(170) + 0.6, 0.6, 10);
    hatch(B, X(145.0), 0, H.zD(145), 2.0, 1.6); hatch(B, X(14.0), 0, 5.0, 2.0, 1.6);
    pole(B, X(0.6), 0, 5.0, 11.0, 0.08); pole(B, X(187.8), 0, 10.6, 14.5, 0.06);
    box(B.team, X(101.0), X(110.0), -0.8, 0.8, 23.8, 23.86); box(B.team, X(44.0), X(52.0), -0.7, 0.7, 12.6, 12.65);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, [X(134.0), 0, H.zD(134.0)], gun127));
    return g;
  }

  /* ================================================== Colbert after the 1970-72 conversion [C1][L1]
     d = (1310 - px) / 6.77 off [C1] (stem 88, stern 1310 = 180.5 m); heights read off [C1] (from
     above, so foreshortened).  VARIANTS: "e60" the conversion as photographed without
     the MM38 boxes; "e80" adds the four MM38 Exocet in two pairs abreast the bridge front. */
  var COLB = hullFns({ L: 180.5, bt: 0.7, st: [
    [0.0, 6.0, 7.2, 0.0, -0.8], [2.0, 6.0, 7.8, 5.2, 1.2], [12, 6.2, 8.8, 8.2, 4.8], [35, 6.8, 9.8, 9.6, 6.2],
    [90, 8.0, 9.9, 9.85, 6.2], [130, 8.3, 9.6, 9.3, 6.2], [150, 8.8, 8.4, 7.3, 5.9], [165, 9.2, 6.2, 4.2, 4.8],
    [174, 9.4, 4.0, 1.5, 3.0], [178, 9.5, 2.4, 0.0, 0.0], [180.5, 9.6, 0.3, 0.0, -8.6]] });
  var COLB_VARIANTS = { e60: { exocet: false }, e80: { exocet: true } };
  function colbert(THREE, M, C, variant) {
    var V = COLB_VARIANTS[variant] || COLB_VARIANTS.e80;
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = COLB, X = H.X, s;
    shipHull(B, H);
    deckRails(B, H, 0.5, 180.0);
    scuttles(B, H, 30, 165, 4.5, 3.0);
    /* helicopter pad on the quarterdeck d 1.5 - 19 [C1]: the deck itself, marked by the hidden node */
    box(B.team, X(17.5), X(18.0), -4.0, 4.0, H.zD(17.8), H.zD(17.8) + 0.03);
    /* Masurca Mk 2 d 20 - 28 on its magazine house, trained aft; the DRBR 51 tower d 40 - 44 [C1] */
    house(B.sup, X(19.5), X(31.0), 4.0, 6.5, 8.8, 0.05, 0.4, 0.3);
    masurca(B, X(24.0), 0, 8.8, PI);
    house(B.sup, X(29.0), X(66.0), 6.4, 7.2, 12.0, 0.1, 0.4, 0.5);
    roofRail(B, X(29.0), X(66.0), 6.3, 12.0);
    house(B.sup, X(39.0), X(45.0), 2.4, 12.0, 17.5, 0.05, 0.2, 0.2);
    cylZ(B.sup, X(42.0), 0, 17.5, 19.0, 1.2, 12); dish(B, X(43.0), 0, 20.6, 1.8, 0);
    /* mainmast lattice d 48.6 - 55.4 to 34; boats on davits d 49 - 61 [C1] */
    lattice(B, X(52.0), 0, 12.0, 30.0, 2.0, 0.6, 5);
    pole(B, X(52.0), 0, 30.0, 34.0, 0.12, 0.05); platform(B, X(52.0), 0, 26.0, 1.4); yard(B, X(52.0), 28.0, 4.0);
    for (s = -1; s <= 1; s += 2) {
      boat(B, X(56.5), s * 8.0, 12.8, 9.5, 2.7, 12.0, s);
      cowl(B, X(63.0), s * 4.0, 12.0);
    }
    /* funnel d 67 - 74 to 26.9 with its dark cap; 57 mm twins beside it (d 66.5, 76.8) [C1] */
    house(B.sup, X(64.0), X(110.0), 6.8, 7.8, 12.0, 0.1, 0.3, 0.3);
    funnel(B, X(70.5), 0, 12.0, 26.9, 3.6, 2.9, 0.5, 2.4);
    for (s = -1; s <= 1; s += 2) {
      placed(B, X(66.5), s * 7.4, 12.0, PI, gun57); placed(B, X(76.8), s * 7.4, 12.0, 0, gun57);
      placed(B, X(36.0), s * 7.2, 12.0, PI, gun57);
      rafts(B, X(80.0), 6, s * 6.2, 12.0, 1.6);
      doors(B, s * 6.82, [X(70), X(86), X(100)], 8.0);
    }
    /* bridge block d 81 - 108 to 22; foremast lattice d 80.4 - 85.6 with the DRBV 23 [C1] */
    house(B.sup, X(84.0), X(108.0), 5.4, 12.0, 16.0, 0.1, 0.4, 0);
    house(B.sup, X(90.0), X(106.5), 4.4, 16.0, 19.4, 0.1, 0.6, 0);
    house(B.sup, X(94.0), X(105.0), 3.4, 19.4, 22.0, 0.1, 0.6, 0);
    windowsX(B, X(105.0) - 0.7, -3.0, 3.0, 20.9, 21.7, 10);
    roofRail(B, X(84.0), X(90.0), 5.3, 16.0, "f"); roofRail(B, X(90.0), X(94.0), 4.3, 19.4, "f"); roofRail(B, X(94.0), X(105.0), 3.3, 22.0);
    director(B, X(99.0), 2.2, 22.0, 0.9); director(B, X(99.0), -2.2, 22.0, 0.9);
    lattice(B, X(83.0), 0, 12.0, 38.0, 2.6, 0.8, 6);
    platform(B, X(83.0), 0, 30.0, 2.0); platform(B, X(83.0), 0, 38.1, 1.5);
    bedstead(B, X(83.0), 0, 38.6, 7.5, 2.4, 0, 9, 3);
    pole(B, X(83.0), 0, 38.1, 46.0, 0.14, 0.05); yard(B, X(83.0), 42.0, 3.5);
    radome(B, X(88.0), 4.2, 23.5, 1.2, 1.2); radome(B, X(88.0), -4.2, 23.5, 1.2, 1.2);
    whip(B, X(92.0), 5.0, 16.0, 8.0); whip(B, X(92.0), -5.0, 16.0, 8.0);
    /* 100 mm B on its barbette house d 117 - 124 */
    house(B.sup, X(111.0), X(122.5), 4.0, 7.8, 10.8, 0.05, 0.5, 0);
    placed(B, X(118.5), 0, 10.8, 0, gun100);
    roofRail(B, X(111.0), X(122.5), 3.9, 10.8, "a");
    if (V.exocet) {
      /* four MM38 in two pairs abreast the bridge front, angled forward and outboard */
      for (s = -1; s <= 1; s += 2) placed(B, X(111.5), s * 5.0, 12.0, s * 0.35, function (P) {
        box(P.metal, -1.2, 1.2, -0.9, 0.9, 0, 0.5);
        for (var i = -1; i <= 1; i += 2) {
          var y = i * 0.45;
          hexa(P.light, [[-2.6, y - 0.38, 0.5], [2.4, y - 0.38, 1.6], [2.4, y + 0.38, 1.6], [-2.6, y + 0.38, 0.5],
                         [-2.6, y - 0.38, 1.25], [2.4, y - 0.38, 2.35], [2.4, y + 0.38, 2.35], [-2.6, y + 0.38, 1.25]]);
        }
      });
    }
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(167.0), H.hW(167) + 1.6, 7.8, s);
      bollard(B, X(160.0), s * 4.2, H.zD(160)); bollard(B, X(148.0), s * 6.6, H.zD(148)); bollard(B, X(4.0), s * 7.2, 6.0);
      fairlead(B, X(174.0), s * 2.6, H.zD(174)); fairlead(B, X(1.5), s * 7.0, 6.0);
      vent(B, X(140.0), s * 3.5, H.zD(140));
    }
    cylZ(B.metal, X(162.0), 0, H.zD(162), H.zD(162) + 0.6, 0.6, 10);
    hatch(B, X(138.0), 0, H.zD(138), 2.0, 1.6);
    pole(B, X(0.6), 0, 6.0, 11.0, 0.08); pole(B, X(180.0), 0, 9.6, 13.0, 0.06);
    box(B.team, X(95.0), X(104.0), -0.8, 0.8, 22.0, 22.06); box(B.team, X(30.0), X(37.0), -0.7, 0.7, 12.0, 12.05);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, [X(126.0), 0, H.zD(126.0)], gun100));
    hidden(THREE, g, "helipad", [X(10.0), 0, H.zD(10.0)]);
    return g;
  }

  /* ------------------------------------------------------------ carrier helpers */
  /* thin flush deck marks (lift seams, catapult tracks): coplanar strips 2 cm proud */
  function seam(bin, x0, y0, x1, y1, z, w) {
    var dx = x1 - x0, dy = y1 - y0, l = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / l * w / 2, ny = dx / l * w / 2;
    hexa(bin, [[x0 + nx, y0 + ny, z], [x0 - nx, y0 - ny, z], [x1 - nx, y1 - ny, z], [x1 + nx, y1 + ny, z],
               [x0 + nx, y0 + ny, z + 0.02], [x0 - nx, y0 - ny, z + 0.02], [x1 - nx, y1 - ny, z + 0.02], [x1 + nx, y1 + ny, z + 0.02]]);
  }
  function liftMark(bin, x0, x1, y0, y1, z) {
    seam(bin, x0, y0, x1, y0, z, 0.12); seam(bin, x0, y1, x1, y1, z, 0.12);
    seam(bin, x0, y0, x0, y1, z, 0.12); seam(bin, x1, y0, x1, y1, z, 0.12);
  }
  /* the flight deck: plan polygon pts [[d, y]...] (anticlockwise from above) as a slab z0..z1 */
  function flightDeck(B, X, pts, z0, z1) {
    var P = pts.map(function (p) { return [X(p[0]), p[1]]; }), n = P.length, i;
    var cx = 0, cy = 0;
    for (i = 0; i < n; i++) { cx += P[i][0] / n; cy += P[i][1] / n; }
    for (i = 0; i < n; i++) {
      var a = P[i], b = P[(i + 1) % n];
      okTri(B.deck, [cx, cy, z1], [a[0], a[1], z1], [b[0], b[1], z1]);
      okTri(B.sup, [cx, cy, z0], [b[0], b[1], z0], [a[0], a[1], z0]);
      okTri(B.sup, [a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1]);
      okTri(B.sup, [a[0], a[1], z0], [b[0], b[1], z1], [a[0], a[1], z1]);
    }
  }
  /* 100 mm on a deck-edge sponson: the sponson block from the hull side out to yo, the mount on it */
  function sponsonGun(B, X, H, d, s, zs, yo, yaw) {
    var yh = H.hD(d);
    hexa(B.sup, [[X(d) - 3.2, s * (yh - 0.5), zs - 3.0], [X(d) + 3.2, s * (yh - 0.5), zs - 3.0], [X(d) + 3.2, s * yo, zs - 0.4], [X(d) - 3.2, s * yo, zs - 0.4],
                 [X(d) - 3.2, s * (yh - 0.5), zs], [X(d) + 3.2, s * (yh - 0.5), zs], [X(d) + 3.2, s * yo, zs], [X(d) - 3.2, s * yo, zs]]);
    railLine(B, [[X(d) - 3.1, s * yo, zs], [X(d) + 3.1, s * yo, zs]], 1.0);
    placed(B, X(d), s * (yo - 2.0), zs, yaw, gun100);
  }

  /* ================================================== Clemenceau / Foch [K1][K2][K3][K4]
     d = (px - 40) / 5.79 off [K1] (flight deck after tip 40, forward tip 1575 = 265 m), z = (370 - py) / 5.79
     VARIANTS: e60 - Clemenceau as completed (eight 100 mm); a variant object may be handed in by another
     module ({ guns: [[d, side], ...] }) to draw a later fit. */
  var CLEM = hullFns({ L: 265.0, bt: 0.8, st: [
    [10.4, 15.95, 11.0, 0.0, -12.0], [17, 15.95, 13.2, 0.0, -5.0], [23.5, 15.95, 14.6, 9.0, 0.6], [35, 15.95, 15.8, 14.0, 6.5],
    [60, 15.95, 16.5, 15.6, 8.4], [150, 15.95, 16.5, 15.9, 8.6], [200, 15.95, 15.8, 14.2, 8.4], [225, 15.95, 13.4, 9.6, 7.6],
    [240, 15.95, 9.6, 3.2, 5.0], [242.7, 15.95, 8.4, 0.0, 0.0], [252, 15.95, 5.0, 0.0, -7.0], [261.7, 15.95, 0.6, 0.0, -14.8]] });
  var CLEM_GUNS = [[24, 1], [41, 1], [24, -1], [41, -1], [193, 1], [209, 1], [193, -1], [209, -1]];
  var CLEM_VARIANTS = { e60: { guns: CLEM_GUNS } };
  var CLEM_DECK = [[0, -12.5], [20, -14.8], [100, -15.6], [106, -19.2], [170, -19.2], [176, -15.6], [238, -13.8],
                   [256, -8.5], [265, -3.5], [265, 3.5], [256, 8.5], [238, 13.5], [202, 14.5], [168, 29.5],
                   [150, 32.0], [10, 12.6], [0, 12.0]];
  function clemenceau(THREE, M, C, variant) {
    var V = (variant && typeof variant === "object") ? variant : (CLEM_VARIANTS[variant] || CLEM_VARIANTS.e60);
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = CLEM, X = H.X, s, i;
    var ZF = 16.9;
    shipHull(B, H);
    /* gallery-deck rails along the hull top where the flight deck does not cover it */
    scuttles(B, H, 30, 230, 9.2, 3.5); scuttles(B, H, 40, 220, 5.6, 4.0);
    /* boats in their side recesses [K1] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(47), X(77), s * 16.3, s * 16.6, 7.2, 10.6);
      boat(B, X(54), s * 16.0, 8.2, 9.0, 2.6); boat(B, X(69), s * 16.0, 8.2, 9.0, 2.6);
      box(B.dark, X(167), X(187), s * 16.3, s * 16.6, 7.2, 10.6);
      boat(B, X(177), s * 16.0, 8.2, 9.0, 2.6);
      anchor(B, X(247.5), H.hW(247.5) + 3.6, 11.5, s);
    }
    /* the angled-deck sponson under the port side, the island sponson, the stern overhang */
    prism(B.sup, [[X(40), 15.0], [X(150), 15.0], [X(150), 31.4], [X(166), 29.0], [X(196), 15.0]].reverse(), 13.4, 15.95);
    prism(B.sup, [[X(104), -15.0], [X(172), -15.0], [X(172), -18.8], [X(104), -18.8]], 13.0, 15.95);
    box(B.sup, X(0.6), X(11.0), -11.6, 11.6, 14.0, 15.95);
    flightDeck(B, X, CLEM_DECK, 15.95, ZF);
    /* deck marks: the forward lift (starboard, d 180 - 196), the deck-edge lift aft of the island
       (d 92 - 104), the bow catapult to port and the angled-deck catapult [K2][K3] */
    liftMark(B.dark, X(180), X(196), -14.5, -2.0, ZF);
    liftMark(B.dark, X(92), X(104), -15.4, -3.5, ZF);
    seam(B.dark, X(196), 7.0, X(255), 3.2, ZF, 0.25);
    seam(B.dark, X(118), 20.5, X(166), 27.2, ZF, 0.25);
    seam(B.light, X(14), 1.5, X(150), 20.6, ZF, 0.3);
    /* deck-edge catwalks: rails one level down round the deck edge */
    for (i = 0; i + 1 < CLEM_DECK.length; i++) {
      var a = CLEM_DECK[i], b = CLEM_DECK[i + 1];
      if (a[0] > 100 && a[0] < 176 && a[1] < 0) continue;
      railLine(B, [[X(a[0]), a[1], 15.2], [X(b[0]), b[1], 15.2]], 0.9);
    }
    /* the 100 mm battery on sponsons [K1][K2] */
    (V.guns || CLEM_GUNS).forEach(function (gp) {
      sponsonGun(B, X, H, gp[0], gp[1], 14.3, H.hD(gp[0]) + 3.6, gp[0] < 130 ? PI : 0);
    });
    /* the island d 112 - 166, y -14 .. -19 [K1][K3] */
    var yI = -16.6;
    house(B.sup, X(116), X(162), 2.4, ZF, 24.0, 0.05, 0.2, 0.6, yI);
    house(B.sup, X(118), X(160), 2.3, 24.0, 31.1, 0.05, 0.3, 0.4, yI);
    house(B.sup, X(128), X(152), 2.0, 31.1, 37.8, 0.05, 0.8, 0.3, yI);
    windowsX(B, X(152) - 0.8, yI - 1.8, yI + 1.8, 36.3, 37.3, 6);
    windowsY(B, yI + 2.05, X(130), X(150), 36.4, 37.3, 12);
    windowsY(B, yI + 2.33, X(122), X(158), 29.6, 30.4, 18);
    funnel(B, X(140.5), yI, 31.1, 37.4, 6.0, 1.8, 1.2, 1.2);
    radome(B, X(121), yI, 28.0, 2.7, 2.7);
    director(B, X(127), yI, 31.1, 1.1); director(B, X(172.7), -17.0, 15.95, 1.0);
    lattice(B, X(150.5), yI, 37.8, 50.0, 1.4, 0.5, 4);
    pole(B, X(150.5), yI, 50.0, 58.7, 0.16, 0.05);
    yard(B, X(150.5), 52.0, 4.0, yI); yard(B, X(150.5), 47.0, 3.0, yI);
    platform(B, X(140.5), yI, 41.0, 2.0);
    lattice(B, X(140.5), yI, 37.8, 41.0, 1.0, 0.8, 1);
    bedstead(B, X(140.5), yI, 41.5, 8.0, 6.0, 0, 10, 5);
    roofRail(B, X(118), X(160), 2.2, 31.1, "", yI); roofRail(B, X(128), X(152), 1.9, 37.8, "", yI);
    whip(B, X(156), yI, 37.8, 7.0); ladder(B, X(162.2), yI, ZF, 24.0, 0);
    box(B.team, X(130), X(150), yI - 0.5, yI + 0.5, 37.8, 37.86);
    box(B.team, X(4), X(9), -0.3, 0.3, ZF, ZF + 0.02);
    flush(THREE, g, B);
    return g;
  }

  /* ================================================== Arromanches (ex-HMS Colossus) [A1][A2][A3]
     Straight deck 211 x 24.5 m, flight deck 11.9 m over the water at the bow off the head-on [A2]
     (beam 660 px = 24.5 m); the island's stations off the three-quarter [A1] corrected for perspective */
  var ARRO = hullFns({ L: 212.0, bt: 0.7, st: [
    [6.0, 10.95, 9.0, 0.0, -9.0], [12, 10.95, 10.6, 6.0, 0.8], [25, 10.95, 12.0, 11.0, 5.6], [50, 10.95, 12.3, 12.2, 7.0],
    [150, 10.95, 12.3, 12.2, 7.2], [175, 10.95, 11.6, 10.2, 6.8], [190, 10.95, 9.8, 6.2, 5.2], [200, 10.95, 7.6, 0.0, 0.0],
    [205, 10.95, 5.2, 0.0, -6.0], [209.5, 10.95, 1.0, 0.0, -10.6]] });
  var ARRO_DECK = [[0, -9.5], [4, -12.25], [196, -12.25], [208, -8.0], [212, -4.5], [212, 4.5], [208, 8.0], [196, 12.25], [4, 12.25], [0, 9.5]];
  function arromanches(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, GREY), B = bins(T), H = ARRO, X = H.X, s, i;
    var ZF = 11.9;
    shipHull(B, H);
    scuttles(B, H, 20, 190, 7.4, 3.5); scuttles(B, H, 30, 180, 4.0, 4.5);
    box(B.sup, X(0.6), X(6.5), -9.0, 9.0, 9.6, 10.95);
    for (s = -1; s <= 1; s += 2) {
      anchor(B, X(196.0), H.hW(196) + 2.6, 8.6, s);
      box(B.dark, X(80), X(104), s * 12.35, s * 12.55, 6.0, 9.6);
      boat(B, X(86), s * 12.2, 7.2, 8.0, 2.4); boat(B, X(98), s * 12.2, 7.2, 8.0, 2.4);
      /* 40 mm Bofors on deck-edge sponsons [A1][A3] */
      [30, 60, 120, 150, 178].forEach(function (d) {
        var yh = H.hD(d);
        /* the sponson a wedge with its underside sloping back to the hull [A1] (rework 2026-11-12) */
        hexa(B.sup, [[X(d) - 2.6, s * (yh - 0.4), 6.6], [X(d) + 2.6, s * (yh - 0.4), 6.6], [X(d) + 2.0, s * (yh + 2.2), 9.6], [X(d) - 2.0, s * (yh + 2.2), 9.6],
                     [X(d) - 2.6, s * (yh - 0.4), 10.2], [X(d) + 2.6, s * (yh - 0.4), 10.2], [X(d) + 2.0, s * (yh + 2.2), 10.2], [X(d) - 2.0, s * (yh + 2.2), 10.2]]);
        box(B.metal, X(d) - 1.6, X(d) + 1.6, s > 0 ? yh + 2.15 : -yh - 2.3, s > 0 ? yh + 2.3 : -yh - 2.15, 10.2, 11.0);
        railLine(B, [[X(d) - 1.9, s * (yh + 2.2), 10.2], [X(d) + 1.9, s * (yh + 2.2), 10.2]], 0.9);
        gunLight(B, X(d) - 0.6, s * (yh + 1.0), 10.2, s * PI / 2); gunLight(B, X(d) + 0.8, s * (yh + 1.0), 10.2, s * PI / 2);
      });
    }
    flightDeck(B, X, ARRO_DECK, 10.95, ZF);
    liftMark(B.dark, X(48), X(62), -5.2, 5.2, ZF); liftMark(B.dark, X(150), X(164), -5.2, 5.2, ZF);
    seam(B.dark, X(170), 6.0, X(208), 4.0, ZF, 0.25);
    /* rework 2026-11-12: the arrester wires and the barrier across the
       after deck, the dashed centreline, and the catwalk grating along both
       deck edges one level down [A1][A3] (marks 2 cm proud, as before) */
    for (i = 0; i < 8; i++) seam(B.dark, X(22 + i * 6.5), -10.5, X(22 + i * 6.5), 10.5, ZF, 0.12);
    seam(B.dark, X(108), -11.0, X(108), 11.0, ZF, 0.3);
    for (i = 0; i < 18; i++) seam(B.light, X(8 + i * 11), 0, X(13 + i * 11), 0, ZF, 0.3);
    for (s = -1; s <= 1; s += 2) box(B.metal, X(6), X(194), s > 0 ? 12.25 : -13.35, s > 0 ? 13.35 : -12.25, 10.15, 10.25);
    for (i = 0; i + 1 < ARRO_DECK.length; i++) {
      var a = ARRO_DECK[i], b = ARRO_DECK[i + 1];
      if (a[1] < -12 && b[1] < -12) continue;
      railLine(B, [[X(a[0]), a[1], 10.3], [X(b[0]), b[1], 10.3]], 0.9);
    }
    /* the island d 65 - 97.5 on its sponson off the starboard deck edge [A1][A3]: bridge front, the
       funnel in its after half, the lattice tripod over the bridge, a pole mast abaft */
    var yI = -13.4;
    prism(B.sup, [[X(62), -12.0], [X(100), -12.0], [X(100), -15.6], [X(62), -15.6]], 9.4, 10.95);
    house(B.sup, X(66), X(97), 2.2, ZF, 17.5, 0.05, 0.2, 0.4, yI);
    house(B.sup, X(82), X(96), 2.0, 17.5, 21.5, 0.05, 0.8, 0.0, yI);
    windowsX(B, X(96) - 0.8, yI - 1.7, yI + 1.7, 20.4, 21.1, 6);
    windowsY(B, yI + 2.05, X(84), X(94), 20.4, 21.1, 6);
    funnel(B, X(73.5), yI, 17.5, 23.5, 5.5, 1.9, 0.8, 1.3);
    roofRail(B, X(82), X(96), 1.9, 21.5, "", yI);
    lattice(B, X(88.0), yI, 21.5, 36.0, 1.4, 0.45, 4);
    pole(B, X(88.0), yI, 36.0, 42.7, 0.14, 0.05); yard(B, X(88.0), 37.5, 3.2, yI);
    platform(B, X(88.0), yI, 33.0, 1.4); bedstead(B, X(88.0), yI, 33.5, 4.5, 2.2, 0, 6, 3);
    pole(B, X(68.5), yI, 17.5, 28.0, 0.14, 0.06); yard(B, X(68.5), 25.0, 2.0, yI);
    /* rework 2026-11-12 [A1][A3]: the bridge's rounded front, the compass
       platform over it, the island's tiers of windows and doors, the raft
       racks on its outboard face and round the funnel, the hull's rows of
       ports and the boats' davits, the open quarterdeck under the round-down */
    cylZ(B.sup, X(96.0), yI, 17.5, 21.4, 1.98, 16);
    windowsX(B, X(98.0) - 0.05, yI - 1.2, yI + 1.2, 20.4, 21.1, 4);
    house(B.sup, X(89.5), X(97.4), 1.7, 21.5, 22.8, 0.05, 0.4, 0.1, yI);
    roofRail(B, X(89.5), X(97.0), 1.6, 22.8, "", yI);
    [yI - 2.24, yI + 2.24].forEach(function (yy) {
      windowsY(B, yy, X(67), X(81), 15.6, 16.2, 10);
      doors(B, yy, [X(70), X(77), X(90)], ZF);
    });
    for (i = 0; i < 2; i++) rafts(B, X(67.5), 9, yI - 2.55, 12.6 + i * 1.5, 1.45);
    rafts(B, X(70.5), 4, yI + 2.55, 17.6, 1.4);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 22; i++) {
        var px = X(24 + i * 7.6), py = s * (H.hD(24 + i * 7.6) + 0.04);
        if (i % 4 !== 1) box(B.dark, px - 0.5, px + 0.5, py - 0.05, py + 0.05, 8.6, 9.4);
      }
      [83.5, 92.5, 101.5].forEach(function (d) {
        bar(B.metal, [X(d), s * (H.hD(d) - 0.2), 9.6], [X(d), s * (H.hD(d) + 0.9), 10.4], 0.08);
      });
      box(B.dark, X(6.4), X(10.0), s * 4.0, s * 8.4, 9.2, 10.9);
    }
    director(B, X(91.0), yI, 21.5, 0.9);
    pole(B, X(120.0), -12.6, ZF, 18.0, 0.08);
    box(B.team, X(84), X(94), yI - 0.5, yI + 0.5, 21.5, 21.56);
    box(B.team, X(3), X(8), -0.3, 0.3, ZF, ZF + 0.02);
    flush(THREE, g, B);
    return g;
  }

  /* ------------------------------------------------------------ submarine body
     P: [[d, ztop, zbot, halfwidth], ...] stern to bow; superellipse sections (exponent e) */
  function subBody(bin, X, P, e, n) {
    var rings = P.map(function (p) {
      var zc = (p[1] + p[2]) / 2, h = Math.max(0.02, (p[1] - p[2]) / 2), w = Math.max(0.02, p[3]);
      return sring(X(p[0]), w, h, 0, zc, e, n || 20);
    });
    loft(bin, rings);
  }
  /* a fin / plane: a slab from a plan or side polygon */
  function fin(bin, pts, y0, y1) { sideSlab(bin, pts, y0, y1); }
  function plane(bin, x0, x1, z, span, t, yc) {
    var c = yc || 0;
    hexa(bin, [[x0, c - span, z - t], [x1 - (x1 - x0) * 0.35, c - span, z - t], [x1, c + 0, z - t], [x0, c + 0, z - t],
               [x0, c - span, z + t], [x1 - (x1 - x0) * 0.35, c - span, z + t], [x1, c + 0, z + t], [x0, c + 0, z + t]]);
    hexa(bin, [[x0, c, z - t], [x1, c, z - t], [x1 - (x1 - x0) * 0.35, c + span, z - t], [x0, c + span, z - t],
               [x0, c, z + t], [x1, c, z + t], [x1 - (x1 - x0) * 0.35, c + span, z + t], [x0, c + span, z + t]]);
  }
  function screw(bin, x, y, z, r, nb) {
    cyl(bin, [x - 0.6, y, z], [x + 0.4, y, z], 0.08 * r + 0.1, 0.25 * r, 8);
    var k;
    for (k = 0; k < nb; k++) {
      var a = k / nb * TAU, c = Math.cos(a), s = Math.sin(a);
      hexa(bin, [[x - 0.12, y + c * 0.15, z + s * 0.15], [x + 0.12, y + c * 0.15, z + s * 0.15], [x + 0.12, y + c * r - s * 0.25, z + s * r + c * 0.25], [x - 0.12, y + c * r - s * 0.25, z + s * r + c * 0.25],
                 [x - 0.02, y + c * 0.15 - s * 0.3, z + s * 0.15 + c * 0.3], [x + 0.02, y + c * 0.15 - s * 0.3, z + s * 0.15 + c * 0.3], [x + 0.02, y + c * r + s * 0.25, z + s * r - c * 0.25], [x - 0.02, y + c * r + s * 0.25, z + s * r - c * 0.25]]);
    }
  }
  /* a sail: plan half-length a, half-width b, z0..z1, its fore end rounded, after end tapered */
  function sail(bin, xc, z0, z1, a, b, rk) {
    var r0 = [], r1 = [], i, n = 18;
    for (i = 0; i < n; i++) {
      var t = i / n * TAU, c = Math.cos(t), s = Math.sin(t);
      var y = b * s * (c > 0 ? 1 : (1 + c * 0.45)), x = a * c;
      r0.push([xc + x, y, z0]); r1.push([xc + x - (rk || 0), y * 0.95, z1]);
    }
    loft(bin, [r0, r1]);
  }
  /* ---- rework 2026-11-12 (visual review: the Daphne and Narval read as
     plain faceted tubes): the profile resampled every ~0.8 m and smoothed so
     the hull runs fair between the measured rows (the rows themselves are
     unchanged); a casing with near-vertical sides on the hull's back; weld
     seams round the pressure hull; a squarer sail section */
  function fairP(P, step) {
    var out = [], d, k, j, d0 = P[0][0], d1 = P[P.length - 1][0];
    function at(dd) {
      for (j = 1; j < P.length; j++) if (dd <= P[j][0]) break;
      var a = P[Math.min(j, P.length - 1) - 1], b = P[Math.min(j, P.length - 1)], f = (dd - a[0]) / ((b[0] - a[0]) || 1);
      return [dd, lerp(a[1], b[1], f), lerp(a[2], b[2], f), lerp(a[3], b[3], f)];
    }
    for (d = d0; d < d1 - 1e-6; d += step) out.push(at(d));
    out.push(P[P.length - 1].slice());
    for (k = 0; k < 3; k++) out = out.map(function (q, i) {
      if (i === 0 || i === out.length - 1) return q;
      var a = out[i - 1], b = out[i + 1];
      return [q[0], (a[1] + 2 * q[1] + b[1]) / 4, (a[2] + 2 * q[2] + b[2]) / 4, (a[3] + 2 * q[3] + b[3]) / 4];
    });
    return out;
  }
  /* a casing d0..d1: top zt, half width cw, its ends drawn in over taper m */
  function casing(bin, X, d0, d1, zt, cw, taper, hgt) {
    var rings = [], n = 10, i;
    for (i = 0; i <= n; i++) {
      var d = d0 + (d1 - d0) * i / n, f = Math.min(1, (d - d0) / taper, (d1 - d) / taper);
      var w = cw * (0.3 + 0.7 * Math.sqrt(Math.max(0, f))), h = hgt / 2;
      rings.push(sring(X(d), w, h, 0, zt - h, 0.35, 16));
    }
    loft(bin, rings);
  }
  /* weld seams: thin bands round the hull every pitch metres d0..d1 */
  function seams(bin, X, P, e, d0, d1, pitch) {
    var d;
    for (d = d0; d <= d1; d += pitch) {
      var q = fairP(P, 0.8).reduce(function (a, b) { return Math.abs(b[0] - d) < Math.abs(a[0] - d) ? b : a; });
      var zc = (q[1] + q[2]) / 2, h = (q[1] - q[2]) / 2 + 0.03, w = q[3] + 0.03;
      loft(bin, [sring(X(d - 0.07), w, h, 0, zc, e, 28), sring(X(d + 0.07), w, h, 0, zc, e, 28)], true);
    }
  }
  /* a sail of squarer plan (exponent e), its top front rounded off */
  function sailSq(bin, xc, z0, z1, a, b, rk, e) {
    var R = [], i, k, n = 24, lv = [[0, 1, 1], [0.86, 1, 1], [0.95, 0.97, 0.985], [1.0, 0.9, 0.96]];
    for (k = 0; k < lv.length; k++) {
      var z = z0 + (z1 - z0) * lv[k][0], r = [];
      for (i = 0; i < n; i++) {
        var t = i / n * TAU, c = Math.cos(t), s = Math.sin(t);
        var ex = a * Math.sign(c) * Math.pow(Math.abs(c), c > 0 ? 0.55 : e) * (c > 0 ? lv[k][1] : 1);
        var y = b * lv[k][2] * Math.sign(s) * Math.pow(Math.abs(s), e) * (c > 0 ? 1 : (1 + c * 0.3));
        r.push([xc + ex - (rk || 0) * lv[k][0], y, z]);
      }
      R.push(r);
    }
    loft(bin, R);
  }
  function periscopes(B, x, z, list) { list.forEach(function (p) { cylZ(B.metal, x + p[0], p[1] || 0, z, z + p[2], p[3] || 0.12, 8); }); }
  function cleat(B, x, y, z) { box(B.metal, x - 0.25, x + 0.25, y - 0.06, y + 0.06, z, z + 0.12); }

  /* ================================================== submarine kit, rework 2 (2026-11-12)
     The owner's review found the Redoutable (and the Amethyste, js/hero/fr_navy_late.js, which calls
     this kit as HeroFrSubKit) plain tubes.  A profile drawing gives three lines along a boat: the top
     of the casing, the keel, and the knuckle where the casing's flat side meets the round pressure
     hull (the "foot" line every French profile here draws).  So a section is a pressure hull (a
     circle where the casing stands on it, an ellipse through the measured top and keel elsewhere)
     with the casing on its back: sloped sides from the foot up to a rounded shoulder and a flat top.
     Outside the foot line's run the casing is a low walking ridge (cmin high).  The hull and the
     casing are two smooth skins (vertex normals averaged) meeting at a crisp knuckle.
     Everything here works in model x (the caller converts its stations). */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  /* piecewise-linear row lookup on [x, a, b, c...] rows sorted on x */
  function rowAt(P, x) {
    var i, n = P.length;
    if (x <= P[0][0]) return P[0].slice();
    for (i = 1; i < n; i++) if (x <= P[i][0]) {
      var a = P[i - 1], b = P[i], f = (x - a[0]) / ((b[0] - a[0]) || 1);
      return a.map(function (v, k) { return k ? lerp(v, b[k], f) : x; });
    }
    return P[n - 1].slice();
  }
  /* a smooth skin over a grid G[i][j] (rings i, open in j): each face turned away from the ring's axis
     point A[i], vertex normals the area-weighted mean of the faces round them */
  function gridSkin(bin, G, A) {
    var m = G.length, n = G[0].length, i, j, N = [], T = [];
    for (i = 0; i < m; i++) { N.push([]); for (j = 0; j < n; j++) N[i].push([0, 0, 0]); }
    function face(t, ax) {
      var a = G[t[0][0]][t[0][1]], b = G[t[1][0]][t[1][1]], c = G[t[2][0]][t[2][1]];
      var f = cross(sub(b, a), sub(c, a));
      if (dot(f, f) < 1e-12) return;
      var mid = [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3];
      if (dot(f, sub(mid, ax)) < 0) { t = [t[0], t[2], t[1]]; f = [-f[0], -f[1], -f[2]]; }
      t.forEach(function (p) { var v = N[p[0]][p[1]]; v[0] += f[0]; v[1] += f[1]; v[2] += f[2]; });
      T.push(t);
    }
    for (i = 0; i + 1 < m; i++) {
      var ax = [(A[i][0] + A[i + 1][0]) / 2, (A[i][1] + A[i + 1][1]) / 2, (A[i][2] + A[i + 1][2]) / 2];
      for (j = 0; j + 1 < n; j++) {
        face([[i, j], [i + 1, j], [i + 1, j + 1]], ax);
        face([[i, j], [i + 1, j + 1], [i, j + 1]], ax);
      }
    }
    T.forEach(function (t) {
      bin.tri(G[t[0][0]][t[0][1]], G[t[1][0]][t[1][1]], G[t[2][0]][t[2][1]],
              unit(N[t[0][0]][t[0][1]]), unit(N[t[1][0]][t[1][1]]), unit(N[t[2][0]][t[2][1]]));
    });
  }
  /* a closed ring fanned flat from its centroid, the face toward +x (dir 1) or -x (dir -1) */
  function fanCap(bin, R, dir) {
    var c = [0, 0, 0], i, n = R.length;
    R.forEach(function (p) { c[0] += p[0] / n; c[1] += p[1] / n; c[2] += p[2] / n; });
    for (i = 0; i < n; i++) {
      var a = R[i], b = R[(i + 1) % n], f = cross(sub(a, c), sub(b, c));
      if (dot(f, f) < 1e-12) continue;
      if (f[0] * dir < 0) bin.tri(c, b, a); else bin.tri(c, a, b);
    }
  }
  var KNA = 16, KNS = 3, KNR = 3, KNT = 3;
  /* the section spec from a faired profile.  o: P [[x, top, keel, halfwidth]], foot [[x, z]] (the
     knuckle line, x ascending), c0 / c1 the casing's ends (it fades out over 2.5 m), WT the casing
     top's largest half width, wk (its half width as a share of the foot's), cmin (the walking ridge) */
  function subSpec(o) {
    var f0 = o.foot[0][0], f1 = o.foot[o.foot.length - 1][0];
    return function (x) {
      var r = rowAt(o.P, x), top = r[1], kz = r[2], w = Math.max(0.04, r[3]);
      var fade = clamp(Math.min(x - o.c0, o.c1 - x) / 2.5, 0, 1), inZ = x >= f0 && x <= f1;
      var hullTop = top - o.cmin * fade;
      if (inZ && kz + 2 * w < hullTop) hullTop = kz + 2 * w;
      var hh = Math.max(0.04, (hullTop - kz) / 2), zc = kz + hh;
      var zf = hullTop - 0.08 * fade;
      if (inZ) zf = Math.min(tbl(o.foot, x), zf);
      return { x: x, zc: zc, hh: hh, w: w, zt: top, zf: zf, WT: o.WT, wk: o.wk || 0.75 };
    };
  }
  /* the port half of a section: arc keel -> foot (KNA + 1 points), casing foot -> top centre */
  function secPts(q) {
    var arc = [], cas = [], i, aF = Math.asin(clamp((q.zf - q.zc) / q.hh, -1, 1));
    for (i = 0; i <= KNA; i++) {
      var a = -PI / 2 + (aF + PI / 2) * i / KNA;
      arc.push([q.w * Math.cos(a), q.zc + q.hh * Math.sin(a)]);
    }
    var F = arc[KNA], wt = Math.min(q.WT, q.wk * F[0]);
    var rs = Math.max(0, Math.min(0.45, (q.zt - q.zf) * 0.35, wt * 0.4));
    var S1 = [wt, q.zt - rs], cx = wt - rs, cz = q.zt - rs;
    cas.push(F);
    for (i = 1; i <= KNS; i++) cas.push([lerp(F[0], S1[0], i / KNS), lerp(F[1], S1[1], i / KNS)]);
    for (i = 1; i <= KNR; i++) { var b = PI / 2 * i / KNR; cas.push([cx + rs * Math.cos(b), cz + rs * Math.sin(b)]); }
    for (i = 1; i <= KNT; i++) cas.push([lerp(cx, 0, i / KNT), q.zt]);
    q.aF = aF; q.yF = F[0]; q.wt = wt; q.rs = rs; q.S1 = S1;
    return { arc: arc, cas: cas };
  }
  /* the hull through stations xs (ascending) of spec Sf, into bin (the casing into binC if given);
     the ends fanned shut */
  function subHull2(bin, xs, Sf, binC) {
    var AR = [], CA = [], AX = [], i;
    xs.forEach(function (x) {
      var q = Sf(x), s = secPts(q), a = [], c = [];
      for (i = KNA; i > 0; i--) a.push([x, -s.arc[i][0], s.arc[i][1]]);
      for (i = 0; i <= KNA; i++) a.push([x, s.arc[i][0], s.arc[i][1]]);
      for (i = 0; i < s.cas.length; i++) c.push([x, s.cas[i][0], s.cas[i][1]]);
      for (i = s.cas.length - 2; i >= 0; i--) c.push([x, -s.cas[i][0], s.cas[i][1]]);
      AR.push(a); CA.push(c); AX.push([x, 0, q.zc]);
    });
    gridSkin(bin, AR, AX); gridSkin(binC || bin, CA, AX);
    fanCap(bin, AR[0].concat(CA[0].slice(1, CA[0].length - 1)), -1);
    var L = xs.length - 1;
    fanCap(bin, AR[L].concat(CA[L].slice(1, CA[L].length - 1)), 1);
  }
  /* stations from x0 to x1, the spacing step(x) (finer where the lines change), and the listed x */
  function stations(x0, x1, step, extra) {
    var xs = [], x = x0;
    while (x < x1 - 1e-6) { xs.push(x); x += step(x); }
    xs.push(x1);
    (extra || []).forEach(function (e) { if (e > x0 && e < x1) xs.push(e); });
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.12; });
  }
  /* a point on the hull (arc angle a, port) and its normal, in the section plane: [y, z, ny, nz] */
  function arcPt(q, a) {
    var n = unit([0, Math.cos(a) / q.w, Math.sin(a) / q.hh]);
    return [q.w * Math.cos(a), q.zc + q.hh * Math.sin(a), n[1], n[2]];
  }
  function arcAtZ(q, z) { return arcPt(q, Math.asin(clamp((z - q.zc) / q.hh, -1, 1))); }
  /* a point on the casing's sloped side, u 0 (foot) .. 1 (shoulder) */
  function slopePt(q, u) {
    var y = lerp(q.yF, q.S1[0], u), z = lerp(q.zf, q.S1[1], u), t = unit([0, q.S1[0] - q.yF, q.S1[1] - q.zf]);
    return [y, z, t[2], -t[1]];
  }
  /* a flat panel standing 2 cm proud of the surface at x, section point p = [y, z, ny, nz] (port),
     half length hx along x, half height hv up the surface; side +1 port, -1 starboard */
  function panelOn(bin, x, p, hx, hv, side) {
    var ny = p[2] * side, nz = p[3], y = p[0] * side + ny * 0.02, z = p[1] + nz * 0.02;
    var vy = -nz, vz = ny;                                /* up the surface in the section plane */
    if (vz < 0) { vy = -vy; vz = -vz; }
    var A = [x - hx, y - vy * hv, z - vz * hv], Bq = [x + hx, y - vy * hv, z - vz * hv],
        Cq = [x + hx, y + vy * hv, z + vz * hv], D = [x - hx, y + vy * hv, z + vz * hv], n = [0, ny, nz];
    var f = cross(sub(Bq, A), sub(Cq, A));
    if (dot(f, n) < 0) { bin.tri(A, Cq, Bq, n, n, n); bin.tri(A, D, Cq, n, n, n); }
    else { bin.tri(A, Bq, Cq, n, n, n); bin.tri(A, Cq, D, n, n, n); }
  }
  /* weld seams: a band 0.12 m wide standing 3 cm proud round the pressure hull's arc at x */
  function seam2(bin, Sf, x) {
    var R = [], AX = [], k, i;
    for (k = -1; k <= 1; k += 2) {
      var q = Sf(x + k * 0.06), s = secPts(q), r = [];
      for (i = KNA; i >= -KNA; i--) {
        var a = -PI / 2 + (q.aF + PI / 2) * Math.abs(i) / KNA, p = arcPt(q, a), sg = i < 0 ? -1 : 1;
        r.push([x + k * 0.06, sg * (p[0] + p[2] * 0.03), p[1] + p[3] * 0.03]);
      }
      R.push(r); AX.push([x + k * 0.06, 0, q.zc]);
    }
    gridSkin(bin, R, AX);
  }
  /* a sail lofted through horizontal sections: the fore end x1 a half-round of radius hw, the sides
     straight, the after end tapered to a rounded tail of half width hw * ta at x0; foot z0, top z1,
     the top edge rounded (radius rt); the after edge comes forward by ra at the top, the fore edge
     aft by rf */
  function sailPlan(x0, x1, hw, ta, z) {
    var P = [], i, r2 = hw * ta, xt = x0 + (x1 - x0) * 0.42, k;
    for (i = 0; i <= 6; i++) { var a = PI / 2 * i / 6; P.push([x1 - hw + hw * Math.cos(a), hw * Math.sin(a), z]); }
    for (i = 1; i <= 4; i++) { k = i / 4; P.push([lerp(x1 - hw, xt, k), hw, z]); }
    for (i = 1; i <= 4; i++) { k = i / 4; P.push([lerp(xt, x0 + r2, k), lerp(hw, r2, (1 - Math.cos(PI * k)) / 2), z]); }
    for (i = 1; i <= 4; i++) { var b = PI / 2 + PI / 2 * i / 4; P.push([x0 + r2 + r2 * Math.cos(b), r2 * Math.sin(b), z]); }
    var S = P.slice(1, P.length - 1).reverse().map(function (p) { return [p[0], -p[1], z]; });
    return P.concat(S);
  }
  function sail2(bin, x0, x1, z0, z1, hw, ta, rt, ra, rf) {
    var G = [], A = [], i, lv = [0, 0.35, 0.7, 1.0], k;
    for (i = 0; i < lv.length; i++) {
      var z = lerp(z0, z1 - rt, lv[i]), f = (z - z0) / (z1 - z0);
      G.push(sailPlan(x0 + ra * f, x1 - rf * f, hw, ta, z)); A.push([(x0 + x1) / 2, 0, z]);
    }
    for (k = 1; k <= 3; k++) {
      var b = PI / 2 * k / 3, ins = rt * (1 - Math.cos(b)), zz = z1 - rt + rt * Math.sin(b);
      G.push(sailPlan(x0 + ra + ins, x1 - rf - ins, hw - ins, ta, zz)); A.push([(x0 + x1) / 2, 0, z1 - rt]);
    }
    G = G.map(function (r) { return r.concat([r[0]]); });
    gridSkin(bin, G, A);
    var top = G[G.length - 1].slice(0, G[0].length - 1), c = [(x0 + x1) / 2, 0, z1];
    for (i = 0; i < top.length; i++) {
      var p = top[i], q = top[(i + 1) % top.length];
      var f2 = cross(sub(p, c), sub(q, c));
      if (dot(f2, f2) < 1e-12) continue;
      if (f2[2] < 0) bin.tri(c, q, p); else bin.tri(c, p, q);
    }
  }
  /* a tapered foil: root chord ra0..ra1 at span s0, tip chord rb0..rb1 at s1, root thickness t (tip
     0.6 t); vertical (span along z at y = h) or horizontal (span along y at z = h) */
  function foil(bin, ra0, ra1, rb0, rb1, s0, s1, t, vert, h) {
    var C = [0, 0.12, 0.35, 0.7, 1], TH = [0, 0.9, 1, 0.62, 0.12];
    function ring(x0, x1, s, tk) {
      var R = [], i;
      for (i = 0; i < C.length; i++) R.push([lerp(x1, x0, C[i]), TH[i] * tk / 2]);
      for (i = C.length - 2; i > 0; i--) R.push([lerp(x1, x0, C[i]), -TH[i] * tk / 2]);
      return R.map(function (p) { return vert ? [p[0], h + p[1], s] : [p[0], s, h + p[1]]; });
    }
    loft(bin, [ring(ra0, ra1, s0, t), ring(lerp(ra0, rb0, 0.5), lerp(ra1, rb1, 0.5), (s0 + s1) / 2, t * 0.82), ring(rb0, rb1, s1, t * 0.6)]);
  }
  /* a screw: hub and cone along x at (y, z), nb skewed blades of radius r (kc scales the cone aft) */
  function screw2(bin, x, y, z, r, nb, hub, kc) {
    var hr = hub || r * 0.2, i, k, c0 = kc === undefined ? 1 : kc;
    cyl(bin, [x - 0.9 * c0, y, z], [x + 0.5, y, z], hr * 0.85, hr, 14);
    cyl(bin, [x - 1.6 * c0, y, z], [x - 0.9 * c0, y, z], 0.05, hr * 0.85, 14, true);
    for (i = 0; i < nb; i++) {
      var a0 = i / nb * TAU, R = [];
      for (k = 0; k <= 4; k++) {
        var rr = hr * 0.9 + (r - hr * 0.9) * k / 4, sk = a0 + 0.45 * Math.pow(k / 4, 1.5), ch = r * 0.32 * (1 - 0.55 * Math.pow(k / 4, 2)), th = 0.07 * (1 - 0.6 * k / 4);
        var c = Math.cos(sk), s = Math.sin(sk), c1 = Math.cos(sk - 0.16), s1 = Math.sin(sk - 0.16), c2 = Math.cos(sk + 0.16), s2 = Math.sin(sk + 0.16);
        R.push([[x - ch * 0.5, y + c1 * rr, z + s1 * rr], [x - th, y + c * rr - s * th, z + s * rr + c * th],
                [x + ch * 0.5, y + c2 * rr, z + s2 * rr], [x + th, y + c * rr + s * th, z + s * rr - c * th]]);
      }
      loft(bin, R);
    }
  }
  /* a missile-tube hatch shut on a flat casing top: the coaming ring, the lid, its hinge and lug */
  function tubeHatch(B, x, y, z, r, side) {
    cylZ(B.metal, x, y, z - 0.06, z + 0.05, r + 0.13, 16);
    cylZ(B.hull, x, y, z + 0.05, z + 0.13, r, 16);
    cylZ(B.dark, x, y, z + 0.13, z + 0.14, r * 0.55, 12);
    box(B.metal, x - 0.45, x + 0.45, y + side * (r - 0.05) - 0.1, y + side * (r - 0.05) + 0.1, z + 0.05, z + 0.25);
    box(B.metal, x - 0.12, x + 0.12, y - side * (r + 0.02) - 0.08, y - side * (r + 0.02) + 0.08, z + 0.05, z + 0.18);
  }
  /* a flush escape or access hatch: ring and lid */
  function roundHatch(B, x, y, z, r) {
    cylZ(B.metal, x, y, z - 0.04, z + 0.04, r + 0.1, 14);
    cylZ(B.hull, x, y, z + 0.04, z + 0.09, r, 14);
    box(B.metal, x - 0.08, x + 0.08, y - r - 0.12, y - r + 0.05, z + 0.04, z + 0.16);
  }

  /* ================================================== Daphne [D1][D2]
     d = (px - 55) / 17.5 off [D1] (stern 55, bow 1068 = 57.75 m); surfaced trim: the casing 1.0 m over
     the water [D2], the keel at the published 5.25 m */
  var DAPH = { L: 57.75, P: [[0, -1.9, -2.5, 0.22], [1.5, -1.1, -3.3, 0.7], [4, -0.3, -4.0, 1.5], [8, 0.4, -4.6, 2.3], [15, 0.85, -5.1, 3.0],
    [22, 1.0, -5.25, 3.38], [45, 1.0, -5.25, 3.38], [51, 0.95, -5.05, 3.15], [54.5, 0.75, -4.5, 2.6], [56.6, 0.3, -3.6, 1.7],
    [57.4, -0.3, -2.8, 0.9], [57.75, -1.0, -2.2, 0.2]] };
  function daphne(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, SUBP), B = bins(T), L = DAPH.L, X = function (d) { return d - L / 2; }, s, i;
    subBody(B.hull, X, fairP(DAPH.P, 0.8), 0.82, 32);
    seams(B.metal, X, DAPH.P, 0.82, 8.0, 50.0, 4.2);
    /* the casing d 3 - 55.5: vertical sides, the flat walking top [D1] */
    casing(B.hull, X, 3.0, 55.5, 1.05, 1.05, 5.0, 1.3);
    box(B.deck, X(3.5), X(55.0), -0.75, 0.75, 1.02, 1.08);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 30; i++) box(B.dark, X(5 + i * 1.65), X(5.5 + i * 1.65), s * 1.0 - 0.05, s * 1.0 + 0.05, 0.4, 0.7);
    /* the sail d 22.45 - 31.45 to 5.9 [D1]: near-rectangular, vertical
       after edge, the fore top rounded; its window rows and the rails on
       the casing abaft it */
    sailSq(B.sup, X(27.0), 0.9, 5.9, 4.5, 0.95, 0.0, 0.45);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) box(B.dark, X(29.8 + i * 0.5), X(30.1 + i * 0.5), s * 0.93 - 0.04, s * 0.93 + 0.04, 5.0, 5.35);
      railLine(B, [[X(13.0), s * 0.7, 1.08], [X(22.0), s * 0.7, 1.08]], 0.9);
    }
    box(B.dark, X(29.6), X(31.0), -0.6, 0.6, 5.6, 5.92);
    periscopes(B, X(26.0), 5.9, [[0, 0, 2.4, 0.11], [-1.2, 0, 1.8, 0.1], [-2.4, 0, 1.4, 0.18], [1.2, 0, 1.0, 0.09]]);
    whip(B, X(24.0), 0, 5.9, 2.2);
    /* the DUUA sonar dome on the bow casing d 52.3 - 55.1, top 3.1 [D1][D2] */
    ellipsoid(B.hull, [X(53.7), 0, 1.0], 1.45, 1.1, 2.1, 6, 14, 0, PI / 2);
    /* bow planes (housed) and the cruciform tail with two screws [D1] */
    plane(B.hull, X(49.5), X(51.0), 0.0, 3.6, 0.07);
    plane(B.hull, X(0.8), X(3.6), -2.2, 3.2, 0.1);
    fin(B.hull, [[X(0.8), -2.2], [X(3.8), -2.2], [X(3.6), 0.6], [X(1.4), 0.4]], -0.08, 0.08);
    fin(B.hull, [[X(0.8), -2.2], [X(3.8), -2.2], [X(3.4), -5.0], [X(1.2), -4.8]], -0.08, 0.08);
    for (s = -1; s <= 1; s += 2) screw(B.metal, X(0.6), s * 1.05, -2.6, 0.95, 4);
    hatch(B, X(40.0), 0, 1.05, 0.9, 0.7); hatch(B, X(14.0), 0, 1.05, 0.9, 0.7);
    for (s = -1; s <= 1; s += 2) { cleat(B, X(50.0), s * 0.6, 1.05); cleat(B, X(8.0), s * 0.6, 1.05); }
    box(B.team, X(28.0), X(30.5), -0.3, 0.3, 5.9, 5.95);
    flush(THREE, g, B);
    return g;
  }

  /* ================================================== Narval [N1][N2][N3]
     The only photographs that show a whole boat ([N1], La Pallice, after the 1966-70 refit) give the
     sail's place as fractions of the 78.4 m length: 0.43 - 0.56 from the bow */
  var NARV = { L: 78.4, P: [[0, -1.2, -3.0, 0.25], [4, 0.2, -4.2, 1.6], [10, 1.0, -5.0, 2.9], [20, 1.3, -5.2, 3.6], [30, 1.3, -5.2, 3.9],
    [55, 1.3, -5.2, 3.9], [68, 1.3, -4.9, 3.4], [74, 1.2, -4.0, 2.4], [77, 1.0, -2.6, 1.2], [78.4, 0.8, -1.4, 0.3]] };
  function narval(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, SUBP), B = bins(T), L = NARV.L, X = function (d) { return d - L / 2; }, s, i;
    subBody(B.hull, X, fairP(NARV.P, 0.8), 0.85, 32);
    seams(B.metal, X, NARV.P, 0.85, 8.0, 72.0, 4.5);
    /* the casing with its vertical sides along the whole back [N1] (rework 2026-11-12) */
    casing(B.hull, X, 2.5, 76.5, 1.45, 1.6, 6.0, 1.6);
    box(B.deck, X(3.0), X(76.0), -1.3, 1.3, 1.42, 1.48);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 40; i++) box(B.dark, X(4 + i * 1.8), X(4.6 + i * 1.8), s * 1.55 - 0.05, s * 1.55 + 0.05, 0.75, 1.1);
    /* the bow buoyancy knob over the stem [N1] */
    ellipsoid(B.hull, [X(76.0), 0, 1.3], 2.4, 1.3, 1.1, 5, 14, -0.3, PI / 2);
    /* sail d 34.5 - 45.1 to 6.9, streamlined [N1][N3] */
    sailSq(B.sup, X(39.8), 1.3, 6.9, 5.3, 1.25, 0.6, 0.6);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) box(B.dark, X(42.4 + i * 0.55), X(42.7 + i * 0.55), s * 1.12 - 0.04, s * 1.12 + 0.04, 6.0, 6.35);
    periscopes(B, X(39.5), 6.9, [[0, 0, 2.6, 0.12], [-1.4, 0, 2.0, 0.11], [-2.8, 0, 1.6, 0.2]]);
    whip(B, X(37.0), 0, 6.9, 2.5);
    plane(B.hull, X(66.0), X(67.8), 0.2, 3.9, 0.08);
    plane(B.hull, X(0.8), X(4.2), -1.9, 3.6, 0.1);
    fin(B.hull, [[X(0.8), -1.9], [X(4.4), -1.9], [X(4.0), 1.2], [X(1.4), 1.0]], -0.09, 0.09);
    fin(B.hull, [[X(0.8), -1.9], [X(4.4), -1.9], [X(3.9), -5.0], [X(1.2), -4.8]], -0.09, 0.09);
    for (s = -1; s <= 1; s += 2) screw(B.metal, X(0.6), s * 1.2, -2.2, 1.1, 4);
    hatch(B, X(55.0), 0, 1.45, 1.0, 0.8); hatch(B, X(22.0), 0, 1.45, 1.0, 0.8);
    for (s = -1; s <= 1; s += 2) { cleat(B, X(70.0), s * 1.2, 1.45); cleat(B, X(8.0), s * 1.2, 1.45); bollard(B, X(60.0), s * 0.9, 1.45); }
    railLine(B, [[X(46), 1.3, 1.45], [X(58), 1.3, 1.45]], 0.9); railLine(B, [[X(46), -1.3, 1.45], [X(58), -1.3, 1.45]], 0.9);
    box(B.team, X(40.5), X(43.5), -0.35, 0.35, 6.9, 6.95);
    flush(THREE, g, B);
    return g;
  }

  /* ================================================== Le Redoutable [P1][P2][P3][P4]
     d = (px - 10) / 11.62 off the profile [P1] (screw tip 10, bow 1497 = 128 m); z = (216 - py) / 11.62
     less the published 10 m draught: the missile-deck hump stands 2.5 m over the water, as [P2] shows.
     REWORK 2 (2026-11-12): re-lofted on the kit above.  REDO.P (top, keel, half width) is unchanged;
     REDO.FOOT is new: the knuckle line [P1] draws along the hump's foot, read by a pixel scan every
     50 px - py 108 at px 300 (d 25), 113-114 from px 350 to 1100 (d 29.3 - 93.8), rising forward
     through py 108 / 103 / 98 at px 1150 / 1200 / 1250 to meet the top at px ~1290 (d 110); aft it
     starts at px ~265 (d 22), where the hump runs out on the pressure hull's circle (zbot + 2 hw).
     The sixteen tubes off the cutaway [P4] (its 20 m bar 218 px; screw px 62, bow px 1475): eight
     pairs at px 703 - 965, d 58.0 - 81.8, pitch 2.97 m, all abaft the sail (the old model's hatches
     ran on under the sail); its "S" escape trunks at d 37.6, 53.9 and 111.5. */
  var REDO = { L: 128.0, P: [[0.3, -4.4, -5.5, 0.4], [1.7, -4.3, -5.6, 0.75], [4.3, -3.7, -6.3, 1.3], [8.0, -2.4, -7.6, 2.6],
    [13.8, -1.5, -8.1, 3.3], [20.7, -0.8, -9.0, 4.1], [25.0, -0.1, -9.3, 4.6], [29.3, 0.76, -9.5, 5.1], [33.6, 1.27, -9.66, 5.3],
    [37.9, 1.79, -9.74, 5.3], [42.2, 2.13, -9.9, 5.3], [47.5, 2.48, -10.0, 5.3], [93.0, 2.48, -10.0, 5.3], [98.1, 1.7, -10.0, 5.3],
    [102.4, 1.19, -9.9, 5.3], [106.7, 0.67, -9.8, 5.2], [111.0, 0.16, -9.7, 4.9], [115.3, -0.19, -9.6, 4.7], [119.6, -0.53, -9.4, 4.4],
    [123.9, -0.88, -9.2, 4.1], [126.5, -0.96, -9.1, 3.7], [127.4, -1.48, -9.05, 3.0], [127.8, -2.0, -8.5, 2.2], [128.0, -3.6, -7.0, 0.9]],
    FOOT: [[22.0, -0.60], [25.0, -0.79], [29.3, -1.15], [33.6, -1.22], [93.8, -1.22], [98.1, -0.71], [102.4, -0.27], [106.7, 0.15], [110.0, 0.22]] };
  function redoutable(THREE, M, C) {
    var g = new THREE.Group(), T = materials(THREE, C, SUBP2), B = bins(T), L = REDO.L, X = function (d) { return d - L / 2; }, s, i, d;
    var SP = subSpec({ P: fairP(REDO.P, 0.8).map(function (r) { return [X(r[0]), r[1], r[2], r[3]]; }),
                       foot: REDO.FOOT.map(function (r) { return [X(r[0]), r[1]]; }), c0: X(5.0), c1: X(127.0), WT: 3.0, wk: 0.75, cmin: 0.2 });
    function Q(dd) { var q = SP(X(dd)); secPts(q); return q; }
    var xs = stations(X(0.3), X(128.0), function (x) { var dd = x + L / 2; return dd < 9 || dd > 123 ? 0.5 : dd > 50 && dd < 92 ? 2.4 : 1.2; },
                      [X(22.0), X(47.5), X(93.0), X(110.0)]);
    subHull2(B.hull, xs, SP, B.deck);
    /* weld seams round the pressure hull, every 4.2 m [P3] */
    for (d = 9.0; d < 125; d += 4.2) seam2(B.metal, SP, X(d));
    /* the sixteen tube hatches, two rows of eight, d 59.5 - 80.3 [P2][P3][P4]; a non-slip walk on
       the hump's crown between them */
    for (i = 0; i < 8; i++) for (s = -1; s <= 1; s += 2) tubeHatch(B, X(59.5 + i * 2.97), s * 1.45, 2.48, 0.92, s);
    for (d = 24.0; d < 82; d += 2.0) { var qw = Q(d + 0.9); box(B.deck, X(d), X(d + 1.8), -0.32, 0.32, qw.zt - 0.02, qw.zt + 0.03); }
    /* escape trunks [P4], the torpedo-loading hatch forward, the hatch abaft the hump */
    [37.6, 53.9, 111.5, 15.0].forEach(function (dd) { roundHatch(B, X(dd), 0, Q(dd).zt, 0.48); });
    hatch(B, X(118.0), 0, Q(118.0).zt - 0.02, 2.4, 0.9);
    /* free-flood holes: two rows along the hump's flank d 26 - 95, a row low on the bow casing [P3] */
    for (d = 26.0; d < 95.5; d += 1.5) {
      var qh = Q(d);
      if (qh.zt - qh.zf < 1.2) continue;
      for (s = -1; s <= 1; s += 2) { panelOn(B.dark, X(d), slopePt(qh, 0.18), 0.28, 0.1, s); panelOn(B.dark, X(d + 0.75), slopePt(qh, 0.4), 0.28, 0.1, s); }
    }
    for (d = 99.0; d < 124.5; d += 1.3) {
      var qb = Q(d);
      for (s = -1; s <= 1; s += 2) panelOn(B.dark, X(d), arcAtZ(qb, qb.zf - 0.3), 0.3, 0.09, s);
    }
    /* the torpedo-tube shutters, two a side in the bow [P4] */
    for (s = -1; s <= 1; s += 2) [-4.6, -6.0].forEach(function (zz) { panelOn(B.dark, X(123.6), arcAtZ(Q(123.6), zz), 0.9, 0.42, s); });
    /* retractable cleats, the capstan, the small fairing on the bow casing d 112.7 [P1] */
    [13.5, 18.0, 115.5, 121.0].forEach(function (dd) { for (s = -1; s <= 1; s += 2) cleat(B, X(dd), s * 0.45, Q(dd).zt); });
    cylZ(B.metal, X(119.8), 0, Q(119.8).zt, Q(119.8).zt + 0.3, 0.28, 12);
    house(B.hull, X(112.2), X(113.3), 0.18, Q(112.7).zt - 0.1, 1.45, 0.02, 0.3, 0.2);
    /* the sail d 82.3 - 95.8 to 8.33 [P1]: a half-round front, straight sides, the tail tapered, the top
       edge rounded [P2][P3]; the bridge cockpit and its windows forward at the top, the planes on its
       forward half at 5.9 [P2] (span off [P2]: tips 0.83 of the hull's breadth apart) */
    sail2(B.sup, X(82.3), X(95.8), 1.7, 8.33, 1.5, 0.3, 0.35, 0.6, 0.0);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(B.glass, X(92.3 + i * 0.5), X(92.65 + i * 0.5), s > 0 ? 1.495 : -1.515, s > 0 ? 1.515 : -1.495, 7.5, 7.85);
      box(B.dark, X(88.0), X(94.3), s > 0 ? 1.495 : -1.51, s > 0 ? 1.51 : -1.495, 7.18, 7.22);
      foil(B.sup, X(90.0), X(93.3), X(90.5), X(92.5), s * 1.42, s * 4.4, 0.34, false, 5.9);
      for (i = 0; i < 6; i++) box(B.metal, X(84.0) - 0.04, X(84.0) + 0.04, s > 0 ? 1.0 : -1.06, s > 0 ? 1.06 : -1.0, 2.9 + i * 0.75, 2.95 + i * 0.75);
    }
    box(B.dark, X(93.4), X(95.0), -0.9, 0.9, 8.08, 8.36);
    box(B.glass, X(94.9), X(95.05), -0.75, 0.75, 8.36, 8.6);
    railLine(B, [[X(93.2), -1.0, 8.33], [X(93.2), 1.0, 8.33]], 0.9);
    periscopes(B, X(88.5), 8.33, [[0, 0, 3.0, 0.14], [-1.5, 0, 2.6, 0.13], [-3.0, 0, 2.0, 0.22], [1.4, 0, 1.6, 0.1]]);
    box(B.sup, X(84.2), X(85.4), -0.35, 0.35, 8.3, 9.5);
    whip(B, X(86.0), 0.4, 8.33, 3.4);
    for (i = 0; i < 4; i++) box(B.dark, X(83.6 + i * 2.2), X(83.6 + i * 2.2 + 1.5), -0.5, 0.5, 8.32, 8.35);
    /* tail [P1]: the upper rudder d 5.0 - 10.3 to 1.9 with the fillet running forward on to the hull
       (to d 12.9), the lower to -11.1, each with its hinge gap (the light slot [P1] draws at d 7.3 -
       7.75); the stern planes on the shaft line; one seven-bladed screw [P3] */
    foil(B.hull, X(5.0), X(10.3), X(5.0), X(9.9), -3.0, 1.88, 0.55, true, 0);
    foil(B.hull, X(10.0), X(12.9), X(9.9), X(10.3), -2.4, 0.2, 0.5, true, 0);
    foil(B.hull, X(5.0), X(10.3), X(5.0), X(10.3), -6.5, -11.1, 0.55, true, 0);
    foil(B.hull, X(10.0), X(12.9), X(10.0), X(10.3), -7.3, -9.4, 0.5, true, 0);
    box(B.dark, X(7.3), X(7.7), -0.22, 0.22, -2.4, 1.7);
    box(B.dark, X(7.3), X(7.7), -0.22, 0.22, -10.9, -7.0);
    box(B.hull, X(4.9), X(10.4), -0.32, 0.32, 1.78, 1.95);
    for (s = -1; s <= 1; s += 2) {
      foil(B.hull, X(3.2), X(8.6), X(3.9), X(6.9), s * 1.0, s * 5.6, 0.45, false, -4.95);
      box(B.dark, X(4.6), X(4.75), s > 0 ? 1.6 : -5.5, s > 0 ? 5.5 : -1.6, -5.2, -4.7);
    }
    screw2(B.metal, X(1.4), 0, -4.95, 2.4, 7, 0.5);
    /* team: the sail top and the hump abaft the tubes */
    box(B.team, X(85.0), X(88.0), -0.4, 0.4, 8.33, 8.38);
    box(B.team, X(30.0), X(33.0), -0.4, 0.4, Q(31.5).zt + 0.01, Q(31.5).zt + 0.06);
    flush(THREE, g, B);
    return g;
  }

  return {
    riviere: riviere, t47: t47, leCorse: leCorse, suffren: suffren, deGrasse: deGrasse, colbert: colbert,
    clemenceau: clemenceau, arromanches: arromanches, daphne: daphne, narval: narval, redoutable: redoutable,
    CLEM_VARIANTS: CLEM_VARIANTS, COLB_VARIANTS: COLB_VARIANTS,
    subKit: { materials: materials, bins: bins, flush: flush, SUBP: SUBP, SUBP2: SUBP2, fairP: fairP, rowAt: rowAt, subSpec: subSpec,
              secPts: secPts, subHull2: subHull2, stations: stations, seam2: seam2, arcAtZ: arcAtZ, slopePt: slopePt,
              panelOn: panelOn, sail2: sail2, foil: foil, screw2: screw2, tubeHatch: tubeHatch, roundHatch: roundHatch,
              hatch: hatch, cleat: cleat, bollard: bollard, whip: whip, periscopes: periscopes, railLine: railLine,
              box: box, cylZ: cylZ, cyl: cyl, house: house, ellipsoid: ellipsoid }
  };
})();

/* exported for the French late-period file: HeroClemenceau(THREE, M, C, variant) and HeroColbert(THREE, M, C,
   variant) - variant "e60" / "e80" (Colbert) or "e60" / an object { guns: [[d, side], ...] } (Clemenceau) */
var HeroClemenceau = { build: function (THREE, M, C, v) { return HeroFrNavyEarly.clemenceau(THREE, M, C, v); }, len: 265.0, variants: HeroFrNavyEarly.CLEM_VARIANTS };
var HeroColbert = { build: function (THREE, M, C, v) { return HeroFrNavyEarly.colbert(THREE, M, C, v); }, len: 180.5, variants: HeroFrNavyEarly.COLB_VARIANTS };
/* the submarine kit of the 2026-11-12 rework (the lofted pressure hull and casing, sail, foils, screw,
   hatches, surface panels; materials, bins and flush), for js/hero/fr_navy_late.js's Amethyste */
var HeroFrSubKit = HeroFrNavyEarly.subKit;

UNIT_MODELS["fra_e50_corvette"]  = { len: 99.8,  build: function (THREE, M, C) { return HeroFrNavyEarly.leCorse(THREE, M, C); } };
UNIT_MODELS["fra_e50_destroyer"] = { len: 128.6, build: function (THREE, M, C) { return HeroFrNavyEarly.t47(THREE, M, C); } };
UNIT_MODELS["fra_e50_cruiser"]   = { len: 188.3, build: function (THREE, M, C) { return HeroFrNavyEarly.deGrasse(THREE, M, C); } };
UNIT_MODELS["fra_e50_sub"]       = { len: 78.4,  build: function (THREE, M, C) { return HeroFrNavyEarly.narval(THREE, M, C); } };
UNIT_MODELS["fra_e50_carrier"]   = { len: 212.0, build: function (THREE, M, C) { return HeroFrNavyEarly.arromanches(THREE, M, C); } };
UNIT_MODELS["fra_e60_corvette"]  = { len: 98.0,  build: function (THREE, M, C) { return HeroFrNavyEarly.riviere(THREE, M, C); } };
UNIT_MODELS["fra_e60_destroyer"] = { len: 157.6, build: function (THREE, M, C) { return HeroFrNavyEarly.suffren(THREE, M, C); } };
UNIT_MODELS["fra_e60_cruiser"]   = { len: 180.5, build: function (THREE, M, C) { return HeroColbert.build(THREE, M, C, "e60"); } };
UNIT_MODELS["fra_e60_sub"]       = { len: 57.75, build: function (THREE, M, C) { return HeroFrNavyEarly.daphne(THREE, M, C); } };
UNIT_MODELS["fra_e60_ssbn"]      = { len: 128.0, build: function (THREE, M, C) { return HeroFrNavyEarly.redoutable(THREE, M, C); } };
UNIT_MODELS["fra_e60_carrier"]   = { len: 265.0, build: function (THREE, M, C) { return HeroClemenceau.build(THREE, M, C, "e60"); } };
/* HELD - no reference found (searches in the header):
   UNIT_MODELS["fra_e50_patrol"]  -- Le Fougueux (P640) submarine chaser: no reference found
   UNIT_MODELS["fra_e60_patrol"]  -- La Combattante (P730) fast patrol boat: no reference found */
