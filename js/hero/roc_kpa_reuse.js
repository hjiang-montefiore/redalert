/* ============ roc_kpa_reuse.js - ROC and KPA rows drawn on hero models that already exist ============
   A MAPPING file, not a model.  It builds nothing new: each row below is a Taiwanese (roc_*) or
   North Korean (kpa_*) row whose vehicle is ALREADY drawn as a hero model for another army, and it
   registers that row on the same builder, with the variant whose period and fit match the row.
   No hero file is edited; every builder is called as its own registration calls it.

   A row is mapped here only if all of these hold:
     - the hero is the SAME vehicle, and a close enough variant (by the row's name/full/desc in
       js/eras.js or js/rules.js against the hero file's header);
     - the builder can be called without editing its module (an exported builder, or the builder
       of a key the module itself registers);
     - the build carries no national markings (no stars, roundels, national titles) and no
       camouflage pattern - the module's header says so and it was checked in its paint code.
   Rows that fail any of these are NOT registered; they are listed in the report of 2026-11-04
   (no model of that vehicle exists / markings or camouflage baked in / different variant).

   ROW                     SOURCE KEY (file)                              BUILDER / VARIANT
   roc_e50_lighttank       nato_e50_lighttank (us_m41.js)                 HeroM41 "M41"  (M41A1 drawn; A3 = injection engine, internal)
   roc_e60_lighttank       nato_e50_lighttank (us_m41.js)                 HeroM41 "M41"
   roc_e80_lighttank       nato_e50_lighttank (us_m41.js)                 HeroM41 "M41"
   roc_e60_recon           nato_e50_lighttank (us_m41.js)                 HeroM41 "M41"  (the row IS the M41A3 in the recon role)
   roc_e60_spaag           nato_e50_spaag (us_m41.js)                     HeroM41 "M42"  (M42A1)
   roc_e50_recon           nato_e50_recon (us_early_light.js)             HeroEarlyLight.m8 (postwar M8, olive drab)
   roc_e80_tankdestroyer   nato_e60_tankdestroyer (us_m113.js)            HeroM113 "TOW" (M113A1 with the M220 TOW, olive drab)
   roc_e50_fighter         deu_e50_fighter (nato_e50_fighter.js)          the F-86F build with plain = true (no US insignia/titles)
   roc_e60_destroyer       roc_e80_destroyer (roc_e80_destroyer.js)       HeroGearingFram (Gearing FRAM I, as transferred)
   roc_e60_sam             deu_e60_sam (nato_launchers_eu.js)             buildHawk, M192, MIM-23A (5.08 m), plain olive
   roc_e80_sam             deu_e80_sam (nato_launchers_eu.js)             buildHawk, M192, MIM-23B (5.03 m), plain olive
   kpa_e50_spg             pla_e50_spg (pla_su76.js)                      HeroSu76 (SU-76M)
   kpa_e50_mlrs            pla_e50_mlrs (pla_bm13.js)                     HeroBm13 (BM-13N on the Studebaker US6)
   kpa_e50_tankdestroyer   pact_e50_spg (ru_su100.js)                     HeroSU100 (SU-100, not the SU-100M)
   kpa_e60_mbt             pact_e50_mbt (ru_t54.js)                       HeroT54 "A" (T-54A)
   kpa_e60_lighttank       pact_e60_lighttank (ru_pt76.js)                HeroPT76 "B" (PT-76B)
   kpa_e60_ifv             pact_e60_btr60 (ru_btr8x8.js)                  HeroRuBtr8x8.b60 (BTR-60PB)
   kpa_e60_recon           pact_e60_recon (ru_brdm.js)                    HeroRuBrdm.brdm2 (BRDM-2, Soviet green)
   kpa_e80_recon           pact_e60_recon (ru_brdm.js)                    HeroRuBrdm.brdm2
   kpa_e60_missileboat     pact_e60_missileboat (ru_osa_boat.js)          HeroOsaBoat (Project 205 Osa I; the Komar is not drawn)
   kpa_e60_sub             pact_e50_sub (ru_whiskey.js)                   HeroWhiskey613 (Project 613)
   kpa_e80_sub             pla_e60_sub (pla_romeo_ming.js)                HeroRomeoMing "romeo" (Project 633 / Type 033)
   kpa_e80_missileboat     kpa_e90_missileboat (kpa_e90_missileboat.js)   the Soju build (same class, built from the early 1980s)
   kpa_e60_sam             pact_e50_s75 (ru_s75_s125.js)                  HeroS75S125.sm63 (S-75 SM-63 launcher)
   kpa_e80_tel             pact_e60_tel (ru_scud_b.js)                    HeroScudB (Scud-B on the MAZ-543P; Hwasong-5 is its copy)
   kpa_e90_tel             pact_e60_tel (ru_scud_b.js)                    HeroScudB (js/tel3d.js: Hwasong-6 = the same launcher and round)
   kpa_e00_tel             pact_e80_tel (ru_tochka.js)                    HeroTochka V80 (9P129; the KN-02 is a Tochka copy)
   kpa_e50_cas             pla_e50_cas (ru_il10.js)                       HeroIl10.plain (Il-10M as an Il-10 STAND-IN, as the PLA row)

   CAVEATS carried by the source builds (not changed here, the reviewer should know):
     - roc_e60_destroyer: the Gearing hero (rebuilt 2026-11) is drawn plain, with no bow or draft
       numbers.
     - kpa_e80_missileboat: the Soju hero (rebuilt 2026-11) is drawn plain, with no bow number.
     - roc_e80_tankdestroyer: the row is turret:true; the M113 TOW build has a FIXED launcher and no
       "turret" node (its own row is turret:false), so the vehicle turns whole to lay the missile.
     - roc_e60_sam / roc_e80_sam: plain Bundeswehr Gelboliv (RAL 6014, #4c4b36), the module's only
       plain paint; ROC olive not sampled.  The M192 is the ROC's towed launcher (the module's own
       references [CK] and [GS] are ROC museum launchers).
     - kpa_e50_spg / kpa_e50_mlrs: PLA green (#505a39 / #525c3a), no markings.

   Load order: this file must load AFTER every file it calls or reads -
     js/air_specs.js, js/armour_specs.js, js/warship_specs.js, js/sub_specs.js, js/sam3d.js and
     js/tel3d.js (their generic registrations of these keys are replaced here), and
     js/hero/us_m41.js, us_early_light.js, us_m113.js, nato_e50_fighter.js, roc_e80_destroyer.js,
     nato_launchers_eu.js, pla_su76.js, pla_bm13.js, ru_su100.js, ru_t54.js, ru_pt76.js,
     ru_btr8x8.js, ru_brdm.js, ru_osa_boat.js, ru_whiskey.js, pla_romeo_ming.js,
     kpa_e90_missileboat.js, ru_s75_s125.js, ru_scud_b.js, ru_tochka.js, ru_il10.js.
   Each mapping checks its builder exists when this file loads and registers nothing if it does not,
   so a missing or misordered source leaves the row on its old model rather than throwing.
   len is the source key's len (the measured X extent of the same build).  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* register key on a builder only when the module that provides it is loaded */
  function reg(key, len, ok, build) {
    if (!ok) return;
    UNIT_MODELS[key] = { len: len, build: build };
  }
  /* the builder of a key a module registers itself (for builders kept private in the module);
     taken now, so a later change to that key does not silently change these rows */
  function keyBuild(src) {
    var e = UNIT_MODELS[src];
    return e && typeof e.build === "function" ? e.build : null;
  }

  /* ------------------------------------------------------------------ ROC */
  var m41 = typeof HeroM41 !== "undefined";
  ["roc_e50_lighttank", "roc_e60_lighttank", "roc_e80_lighttank", "roc_e60_recon"].forEach(function (k) {
    reg(k, 8.15, m41, function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M41"); });
  });
  reg("roc_e60_spaag", 6.464, m41, function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M42"); });

  reg("roc_e50_recon", 5.08, typeof HeroEarlyLight !== "undefined",
      function (THREE, M, C) { return HeroEarlyLight.m8(THREE, M, C); });

  reg("roc_e80_tankdestroyer", 4.92, typeof HeroM113 !== "undefined",
      function (THREE, M, C) { return HeroM113.build(THREE, M, C, "TOW"); });

  var sabrePlain = keyBuild("deu_e50_fighter");
  reg("roc_e50_fighter", 11.5, !!sabrePlain, function (THREE, M, C) { return sabrePlain(THREE, M, C); });

  reg("roc_e60_destroyer", 119.0, typeof HeroGearingFram !== "undefined",
      function (THREE, M, C) { return HeroGearingFram.build(THREE, M, C); });

  var eu = typeof HeroNatoLaunchersEu !== "undefined";
  reg("roc_e60_sam", 5.13, eu, function (THREE, M, C) {
    return HeroNatoLaunchersEu.buildHawk(THREE, C, { paint: "gelb", hawkL: 5.08, roundCol: 0xc6c4b8, wingCol: 0x2e3127 });
  });
  reg("roc_e80_sam", 5.13, eu, function (THREE, M, C) {
    return HeroNatoLaunchersEu.buildHawk(THREE, C, { paint: "gelb", hawkL: 5.03, roundCol: 0x585b40, wingCol: 0x585b40 });
  });

  /* ------------------------------------------------------------------ KPA */
  reg("kpa_e50_spg", 5.37, typeof HeroSu76 !== "undefined", function (THREE, M, C) { return HeroSu76.build(THREE, M, C); });
  reg("kpa_e50_mlrs", 7.15, typeof HeroBm13 !== "undefined", function (THREE, M, C) { return HeroBm13.build(THREE, M, C); });
  reg("kpa_e50_tankdestroyer", 9.648, typeof HeroSU100 !== "undefined", function (THREE, M, C) { return HeroSU100.build(THREE, M, C); });
  reg("kpa_e60_mbt", 9.54, typeof HeroT54 !== "undefined", function (THREE, M, C) { return HeroT54.build(THREE, M, C, "A"); });
  reg("kpa_e60_lighttank", 7.76, typeof HeroPT76 !== "undefined", function (THREE, M, C) { return HeroPT76.build(THREE, M, C, "B"); });
  reg("kpa_e60_ifv", 7.58, typeof HeroRuBtr8x8 !== "undefined", function (THREE, M, C) { return HeroRuBtr8x8.b60(THREE, M, C); });
  ["kpa_e60_recon", "kpa_e80_recon"].forEach(function (k) {
    reg(k, 5.75, typeof HeroRuBrdm !== "undefined", function (THREE, M, C) { return HeroRuBrdm.brdm2(THREE, M, C); });
  });
  reg("kpa_e60_missileboat", 38.6, typeof HeroOsaBoat !== "undefined", function (THREE, M, C) { return HeroOsaBoat.build(THREE, M, C); });
  reg("kpa_e60_sub", 76, typeof HeroWhiskey613 !== "undefined", function (THREE, M, C) { return HeroWhiskey613.build(THREE, M, C); });
  reg("kpa_e80_sub", 76.6, typeof HeroRomeoMing !== "undefined", function (THREE, M, C) { return HeroRomeoMing.build(THREE, M, C, "romeo"); });

  var soju = keyBuild("kpa_e90_missileboat");
  reg("kpa_e80_missileboat", 39.0, !!soju, function (THREE, M, C) { return soju(THREE, M, C); });

  /* kpa_e50_cas: the Il-10M drawn plain, the same STAND-IN the pla_e50_cas row uses (ru_il10.js
     explains it: the Il-10M is larger than the Il-10 the KPA flew, the layout is the same) */
  reg("kpa_e50_cas", 11.87, typeof HeroIl10 !== "undefined" && typeof HeroIl10.plain === "function",
      function (THREE, M, C) { return HeroIl10.plain(THREE, M, C); });

  reg("kpa_e60_sam", 10.39, typeof HeroS75S125 !== "undefined", function (THREE, M, C) { return HeroS75S125.sm63(THREE, C); });
  ["kpa_e80_tel", "kpa_e90_tel"].forEach(function (k) {
    reg(k, 11.93, typeof HeroScudB !== "undefined", function (THREE, M, C) { return HeroScudB.build(THREE, M, C); });
  });
  reg("kpa_e00_tel", 9.56, typeof HeroTochka !== "undefined",
      function (THREE, M, C) { return HeroTochka.build(THREE, M, C, "kpa_e00_tel", HeroTochka.V80); });
})();
