/* ============ sub_specs.js -- real submarine geometry, one row per hull ============
   Generated from a per-era submarine spec pass with an adversarial historical
   audit. Consumed by sub3d_era.js, which turns each row into a silhouette.
   Fields are documented at the top of that file. len and beam are REAL METRES
   -- render3d.js sizes a boat straight off UNIT_MODELS[id].len, so a wrong
   number here is a wrong-sized boat on the map, not just a wrong drawing.

   The ten generic boats (sub_n, sub_p, ssbn_n ...) are NOT here;
   units3d_subs.js still owns those and this file never touches them.

   hull    cigar | teardrop | fat | fleetboat | midget
   sail    step | slab | tower | faired | fat | low
   planes  bow | sail        stern  cruciform | xtail
   prop    screw | pumpjet   skin   plate | tiles
   camo    black | darkgrey                                                */
var SUBS = {

  /* ------------------------------------------------------------ NATO */
  /* A WW2 fleet boat given a reactor: long flat casing over a knife bow,
     limber holes the whole length, and a long low slab fairwater set
     unusually far aft. The only twin-screw boat in the set. */
  nato_e50_sub: {era:"e50", fac:"nato", designation:"Nautilus class (USS Nautilus, SSN-571)",
    len:98.7, beam:8.5, hull:"fleetboat", sail:"step", sailFrac:0.40, sailLen:14, sailH:6.3,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* Short stubby Albacore teardrop under an outsized square-topped fin --
     taller than a 688's on a hull 20 m shorter -- set only a quarter back. */
  nato_e60_sub: {era:"e60", fac:"nato", designation:"Sturgeon class (USS Sturgeon, SSN-637)",
    len:89.1, beam:9.65, hull:"teardrop", sail:"slab", sailFrac:0.25, sailLen:8.7, sailH:6.1,
    planes:"sail", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* Long lean almost parallel-sided teardrop at 11:1, small low box fin a
     third back: the flattest silhouette here, and still on sail planes. */
  nato_e80_sub: {era:"e80", fac:"nato", designation:"Los Angeles class (SSN-688, Flight I)",
    len:110.3, beam:10.06, hull:"teardrop", sail:"slab", sailFrac:0.31, sailLen:8.1, sailH:5.4,
    planes:"sail", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},
  /* The fat one: 12.2 m of beam on a hull 3 m shorter than a 688, a broad
     low fin faired into the casing well forward, bow planes, pumpjet. */
  nato_e90_sub: {era:"e90", fac:"nato", designation:"Seawolf class (USS Seawolf, SSN-21)",
    len:107.6, beam:12.2, hull:"teardrop", sail:"faired", sailFrac:0.25, sailLen:10, sailH:5.6,
    planes:"bow", stern:"cruciform", screws:1, prop:"pumpjet", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},
  /* Longest and smoothest here: matte tile-black teardrop with no seams,
     the fin further forward than any other boat, bow planes and a pumpjet. */
  nato_e00_sub: {era:"e00", fac:"nato", designation:"Virginia class (SSN-774, Block I)",
    len:114.8, beam:10.36, hull:"teardrop", sail:"faired", sailFrac:0.23, sailLen:9.8, sailH:5.6,
    planes:"bow", stern:"cruciform", screws:1, prop:"pumpjet", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},

  /* ------------------------------------------------------------ PACT */
  /* Flat-decked 1950s cigar, blunt forefoot, long low stepped fairwater
     just abaft amidships, twin 57 mm on the casing, shears standing clear. */
  pact_e50_sub: {era:"e50", fac:"pact", designation:"Whiskey-class (Project 613)",
    len:76, beam:6.3, hull:"cigar", sail:"step", sailFrac:0.41, sailLen:11.8, sailH:4,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:true, missileDeck:false,
    skin:"plate", camo:"darkgrey"},
  /* Long lean narrow cigar with a tall flat-sided square-topped fin just
     abaft amidships, and the only three-shaft boat in the set. */
  pact_e60_sub: {era:"e60", fac:"pact", designation:"Foxtrot-class (Project 641)",
    len:91.3, beam:7.4, hull:"cigar", sail:"slab", sailFrac:0.42, sailLen:12.5, sailH:5,
    planes:"bow", stern:"cruciform", screws:3, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* Unmistakably fat: 9.9 m on 72.6 m, bulbous bow, short broad fin only a
     third back, matte black anechoic rubber with no shine and no seams. */
  pact_e80_sub: {era:"e80", fac:"pact", designation:"Kilo-class (Project 877 Paltus)",
    len:72.6, beam:9.9, hull:"fat", sail:"fat", sailFrac:0.38, sailLen:13.8, sailH:4.9,
    planes:"bow", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},
  /* The same bulbous black Kilo 1.2 m longer, a 7-bladed screw instead of
     six, and a fin a shade further forward on the longer hull. */
  pact_e90_sub: {era:"e90", fac:"pact", designation:"Improved Kilo (Project 636)",
    len:73.8, beam:9.9, hull:"fat", sail:"fat", sailFrac:0.37, sailLen:14, sailH:4.9,
    planes:"bow", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},
  /* Externally the 636 to within a metre; Kalibr fires from the torpedo
     tubes, so nothing about the missile fit shows on the outside. */
  pact_e00_sub: {era:"e00", fac:"pact", designation:"Improved Kilo (Project 636.3 Varshavyanka)",
    len:73.8, beam:9.9, hull:"fat", sail:"fat", sailFrac:0.37, sailLen:14, sailH:4.9,
    planes:"bow", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},

  /* ------------------------------------------------------------- PLA */
  /* Long low stepped fairwater just forward of midships with a 100 mm on
     the casing ahead of it, over a blunt parallel-sided cigar. */
  pla_e50_sub: {era:"e50", fac:"pla", designation:"Type 03 (Project 613 Whiskey-class)",
    len:76, beam:6.3, hull:"cigar", sail:"step", sailFrac:0.41, sailLen:11, sailH:4,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:true, missileDeck:false,
    skin:"plate", camo:"black"},
  /* A gunless Whiskey lookalike: same blunt cigar, but a shorter taller
     upright conning tower with bridge windows and a round shears column. */
  pla_e60_sub: {era:"e60", fac:"pla", designation:"Type 033 (Project 633 Romeo-class)",
    len:76.6, beam:6.7, hull:"cigar", sail:"tower", sailFrac:0.44, sailLen:9.5, sailH:4.4,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* The Romeo hull a metre fatter under a taller flat-sided squared-top fin
     with a raked leading edge -- the boxiest silhouette in the fleet. */
  pla_e80_sub: {era:"e80", fac:"pla", designation:"Type 035 Ming-class",
    len:76, beam:7.6, hull:"cigar", sail:"slab", sailFrac:0.43, sailLen:10.5, sailH:4.8,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"darkgrey"},
  /* Unmistakably tubby, beam a seventh of its length: a near-bulbous whale
     in matte black rubber, short broad fin well forward, one big screw. */
  pla_e90_sub: {era:"e90", fac:"pla", designation:"Kilo-class (Project 877EKM / 636)",
    len:73.8, beam:9.9, hull:"fat", sail:"fat", sailFrac:0.37, sailLen:12.5, sailH:5,
    planes:"bow", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"black"},
  /* A tall hard-edged slab of a fin barely a third back with big rounded-tip
     planes at its base, on a Kilo-influenced teardrop in dark-grey tiles. */
  pla_e00_sub: {era:"e00", fac:"pla", designation:"Type 039A / 039B Yuan-class",
    len:77.6, beam:8.4, hull:"teardrop", sail:"slab", sailFrac:0.31, sailLen:11.5, sailH:5.2,
    planes:"sail", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"tiles", camo:"darkgrey"},

  /* ------------------------------------------------------------- ROC */
  /* A WW2 fleet boat with the guns shaved off: long flat narrow casing full
     of free-flood slots, blunt GUPPY bow, one big trapezoidal fairwater. */
  roc_e60_sub: {era:"e60", fac:"roc", designation:"Hai Shih class (Tench GUPPY II)",
    len:93.6, beam:8.3, hull:"fleetboat", sail:"step", sailFrac:0.47, sailLen:13.5, sailH:6,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* Short fat Albacore teardrop, fin well forward, and the only boat here
     with four X-arranged control surfaces around a single screw. */
  roc_e80_sub: {era:"e80", fac:"roc", designation:"Hai Lung class (Zwaardvis-derived)",
    len:66.9, beam:8.4, hull:"teardrop", sail:"slab", sailFrac:0.38, sailLen:11, sailH:5.5,
    planes:"sail", stern:"xtail", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"smooth", camo:"black"},
  /* Identical Zwaardvis teardrop to the e80 boat: only the combat system
     and the torpedoes changed in the 1990s. */
  roc_e90_sub: {era:"e90", fac:"roc", designation:"Hai Lung class (Zwaardvis-derived)",
    len:66.9, beam:8.4, hull:"teardrop", sail:"slab", sailFrac:0.38, sailLen:11, sailH:5.5,
    planes:"sail", stern:"xtail", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"smooth", camo:"black"},
  /* Same X-tailed teardrop as the Harpoon-capable upgrade: the mid-2000s
     work was internal, so the hull keeps painted plate and no tiling. */
  roc_e00_sub: {era:"e00", fac:"roc", designation:"Hai Lung class (Zwaardvis-derived)",
    len:66.9, beam:8.4, hull:"teardrop", sail:"slab", sailFrac:0.38, sailLen:11, sailH:5.5,
    planes:"sail", stern:"xtail", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"smooth", camo:"black"},

  /* ------------------------------------------------------------- KPA */
  /* Long parallel-sided cigar with a blunt rounded bow and a low stepped
     fairwater just forward of midships -- the gun step is there, the guns
     are not; they came off Soviet Whiskeys from 1956-58. */
  kpa_e60_sub: {era:"e60", fac:"kpa", designation:"Whiskey class (Project 613)",
    len:76, beam:6.3, hull:"cigar", sail:"step", sailFrac:0.44, sailLen:10.5, sailH:4.2,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* Near-twin of the Whiskey but slightly longer and visibly fatter, with a
     narrower upright tower, an open bridge and tall shears above it. */
  kpa_e80_sub: {era:"e80", fac:"kpa", designation:"Romeo class (Project 633 / Type 033)",
    len:76.6, beam:6.7, hull:"cigar", sail:"tower", sailFrac:0.45, sailLen:11, sailH:4.5,
    planes:"bow", stern:"cruciform", screws:2, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* A 34 m cylinder barely three times the length of a Whiskey's fairwater:
     blunt bow with recessed planes, a stubby stepped tower a little aft of
     midships, one screw behind a cruciform tail. */
  kpa_e90_sub: {era:"e90", fac:"kpa", designation:"Sang-o class coastal submarine",
    len:34, beam:3.8, hull:"midget", sail:"low", sailFrac:0.55, sailLen:5, sailH:3,
    planes:"bow", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:false,
    skin:"plate", camo:"black"},
  /* A Romeo-sized diesel hull dominated by one outsized fin: the single
     SLBM tube rides in the sail itself, so the fin is far longer and taller
     than anything else in this set. */
  kpa_e00_sub: {era:"e00", fac:"kpa", designation:"Sinpo class (Gorae) experimental SSB",
    len:68, beam:6.7, hull:"cigar", sail:"slab", sailFrac:0.42, sailLen:14, sailH:6,
    planes:"sail", stern:"cruciform", screws:1, prop:"screw", deckGun:false, missileDeck:true,
    skin:"plate", camo:"black"}
};
if (typeof Sub3D !== "undefined" && Sub3D.registerAll) Sub3D.registerAll();
