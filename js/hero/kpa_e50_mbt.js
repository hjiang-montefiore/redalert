/* ============ hero/kpa_e50_mbt.js - T-34-85 medium tank (KPA, e50) ============
   Key: kpa_e50_mbt  "T-34-85 medium tank" (js/eras.js, service 1949, era e50 only).

   FULL-QUALITY REDO 2026-11-12.  The first version of this file was a stand-alone build of
   306 meshes (306 draw calls, 38 materials) with no "roadwheel" nodes, its hull 6.10 m and
   its turret measured off a side elevation that was not kept in the repo.  It is replaced by
   the T-34-85 the PLA row already draws, js/hero/pla_t3485.js (HeroT3485.build), which is the
   same tank measured off a dimensioned drawing: review policy rule 5 (reuse before you build).
   No geometry is copied; this file only registers the KPA row onto that builder.

   WHY THE SAME TANK: the KPA's T-34-85s of 1949-50 were Soviet-built tanks of 1944-46
   production - the late-war standard the PLA also received in 1950, and the one HeroT3485
   draws (the wide cast turret with the ZiS-S-53 and no muzzle brake, the two-piece cupola at
   the rear left of the roof, two ventilator domes at the rear of the roof, the ball DT in the
   glacis, the rubber-tyred spoked "starfish" road wheels).
   REFERENCES
     K1  "Knocked-out T-34-85 near Yongsan.png" (Wikimedia Commons, US Army photograph, Korea
         1950; cached in scratchpad/q_rb2/ref): two KPA T-34-85s.  The far tank, nearly side-on,
         shows the five spoked starfish road wheels with rubber tyres, no return rollers, the
         raised front idler, the long low turret set forward with the plain long 85 mm (no
         brake).  The near tank, rear right 3/4, shows the two-piece cupola at the rear left of
         the turret roof, the two domes behind it, the 48-degree rear plate with the two exhaust
         cowls and the round transmission hatch, the engine deck grilles, the starfish wheels.
         Every one of those is in HeroT3485 at the place its drawing puts it; nothing in K1
         contradicts it.  K1 is an oblique view and is used to CONFIRM the variant, not to
         re-measure (no side-on photograph of a KPA tank to scale was found).
     D1, P1-P3 of js/hero/pla_t3485.js: the measurements ("T-34-85 nva.svg" side elevation,
         scaled from the 830 mm road wheel; hull 6.15 m measured against 6.10 published, the
         cupola top 2.72 m against 2.70 published).  See that file's header.
   PUBLISHED (ru.wikipedia T-34-85, via pla_t3485.js): hull 6.10 m, 8.10 m with the gun, width
   3.00 m, height 2.70 m, clearance 0.40 m; 85 mm ZiS-S-53 L/54.6.
   MEASURED (dump.js of this build): 8.30 x 3.00 x 2.72 m (L x W x H) - the rear mudguards at
   -3.25 m to the muzzle at +5.05 m (the published 8.10 m runs from the tail plate at -3.05 m);
   width = the published 3.00 m over the tracks; height 2.72 m to the cupola (published 2.70).
   PAINT: HeroT3485's plain green (#505a39), no markings.  K1 is black and white; the KPA's
   tanks were delivered in the Soviet factory green, which is what that paint stands for.
   No stars, numbers or slogans (K1's tanks carry none legible; none drawn).
   NOT CONFIRMED: the KPA tanks' exact production batch (K1 fits the 1944-46 standard, but a
   mixed fleet of earlier and later turrets cannot be ruled out); whether the KPA tanks carried
   the cylindrical external fuel tanks on the rear hull sides (K1's near tank shows its right
   rear hull side bare - burnt or removed; HeroT3485 draws them, as its D1 and P2 show); the
   paint colour (K1 is monochrome); everything listed NOT CONFIRMED in pla_t3485.js.
   CORRECTIONS against the first version: draw calls 306 -> 11 (merged per material); the five
   "roadwheel" groups the engine turns are now present; the starfish wheels of K1 replace the
   solid discs; the hull roof 1.58 m (D1) replaces 1.66 m; the turret roof 2.47 m (D1) replaces
   2.49 m; the cupola, domes and loader's hatch sit where D1 and K1 put them.

   API kept: UNIT_MODELS["kpa_e50_mbt"] (the only thing other files use: js/eras.js row,
   js/armour_specs.js spec row; no other file calls this module).
   Nodes (from HeroT3485): "turret" (origin on the ring at the hull roof, x 0.62 z 1.58, gun
   along +X), five "roadwheel" groups (one per axle position, both sides, axle on local Y).
   Materials: HeroT3485's PAINT, DARK, WHEEL and TEAM (exactly C.team, two small plates).
   Draw calls: 11.
   LOAD ORDER: none at load time.  This file loads before js/hero/pla_t3485.js in index.html,
   so HeroT3485 is looked up when the model is BUILT (render time, after every script has
   loaded), not when this file loads.  If HeroT3485 is missing the build throws, and
   render3d.js's getModel catches it and draws the generic fallback.
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

UNIT_MODELS["kpa_e50_mbt"] = {
  len: 8.30,
  build: function (THREE, M, C) {
    if (typeof HeroT3485 === "undefined" || !HeroT3485 || typeof HeroT3485.build !== "function")
      throw new Error("kpa_e50_mbt: js/hero/pla_t3485.js (HeroT3485) is not loaded");
    return HeroT3485.build(THREE, M, C);
  }
};
