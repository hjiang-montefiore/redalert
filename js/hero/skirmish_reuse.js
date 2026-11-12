/* ============ skirmish_reuse.js - skirmish rows drawn on the era hero model of the same vehicle ============
   A MAPPING file, not a model.  The skirmish rosters (keys ending _k, _c, _r, _n, _p) each register a
   generic model of their own in js/armour_specs.js, js/air_specs.js, js/warship_specs.js or
   js/sub_specs.js, so render3d.js never lets them borrow the redone era model of the same vehicle.
   Each row below names the SAME vehicle and variant as an era row that already has a hero model
   (checked by the row's full name in js/rules.js against the era row's name and the hero file's
   header), and is registered on a copy of that era row's entry (len, build, and any named round).

   SKIRMISH ROW      ERA ROW               VEHICLE
   fighter_k         kpa_e90_fighter       MiG-21bis, plain
   ifv_k             kpa_e90_ifv           VTT-323
   lt_k              kpa_e90_lighttank     PT-85
   mbt_k             kpa_e90_mbt           Ch'onma-214 (Western "Chonma-ho V")
   md500_k           kpa_e00_md500         MD 500D with the Sagger conversion
   missileboat_k     kpa_e90_missileboat   Soju class
   mlrs_k            kpa_e90_mlrs          M1991 240 mm
   spg_k             kpa_e80_spg           M-1978 Koksan
   sub_k             kpa_e80_sub           Project 633 Romeo
   trans_k           kpa_e00_transport     An-2
   asw_helo_n        nato_e00_aswhelo      MH-60R
   asw_helo_p        pact_e80_aswhelo      Ka-27PL
   bomber_c          pla_e00_cas           JH-7A
   corvette_c        pla_e00_corvette      Type 056
   ifv_c             pla_e00_ifv           ZBD-04A
   mlrs_c            pla_e00_mlrs          PHL-03
   recon_c           pla_e00_recon         CSK-131 Mengshi
   spaag_c           pla_e00_spaag         PGZ-09
   spg_c             pla_e00_spg           PLZ-05
   sub_c             pla_e00_sub           Type 039A/B Yuan
   missileboat_c     pla_e00_missileboat   Type 022 Houbei
   asw_helo_r        roc_e00_aswhelo       S-70C(M) Thunderhawk
   bomber_r          roc_e00_cas           F-CK-1C/D
   corvette_r        roc_e00_corvette      Tuo Chiang
   destroyer_r       roc_e00_destroyer     Kee Lung (ex-Kidd)
   lt_r              roc_e90_lighttank     M60A3 TTS
   mbt_r             roc_e90_mbt           CM-11 Brave Tiger
   mlrs_r            roc_e00_mlrs          RT-2000 Thunderbolt
   recon_r           roc_e00_recon         CM-32 Yunpao
   sub_r             roc_e00_sub           Hai Lung
   spg_r             nato_e90_spg          M109A6 Paladin
   radarv_r          nato_e80_radarv       AN/TPQ-37 Firefinder

   British, German and French skirmish rows (added later: they had no model at all and drew
   the American row of the same role, a Challenger 2 as an M1A2):
   mbt_b             gbr_e90_heavy         Challenger 2 (green; gbr_e00_mbt is the desert one)
   ifv_b             gbr_e00_ifv           FV510 Warrior
   recon_b           gbr_e00_recon         Jackal
   spaag_b           gbr_e00_spaag         Stormer HVM
   helo_b            helo_r                AH-64E Apache
   airlift_b         fra_e00_airlift       A400M Atlas
   ifv_g             deu_e00_ifv           Puma
   bomber_g          deu_e90_cas           Tornado IDS
   trans_g           fra_e00_transport     NH90
   airlift_g         fra_e00_airlift       A400M Atlas
   radarv_g          fra_e00_radarv        COBRA
   ifv_f             fra_e00_ifv           VBCI
   spaag_f           fra_e00_spaag         Crotale NG
   spg_f             fra_e00_spg           CAESAR
   mlrs_f            fra_e00_mlrs          LRU
   sam_f             fra_e00_sam           SAMP/T Mamba
   radarv_f          fra_e00_radarv        COBRA
   trans_f           fra_e00_transport     NH90 Caiman
   fighter_f         fra_e00_fighter       Rafale
   bomber_f          fra_e90_cas           Mirage 2000D
   airlift_f         fra_e00_airlift       A400M Atlas

   NOT mapped, because the hero model is a different variant from the skirmish row: awacs_c (KJ-500;
   the hero is the Il-76-based A-50 shape), destroyer_c (Type 052D; the hero is the 052B), fighter_c
   (J-10C; the hero is the J-10A), helo_c (Z-10ME), hvy_r (M1A2T; the hero is the M1A2), ifv_r (CM-34;
   the hero is the CM-33), lst_r (ROC LCU; class not confirmed), atgmv_r (M1167 TOW), mbt_f (Leclerc XLR; the hero is the
   Leclerc), cfighter_f / fra_e00_cfighter (Rafale M; the hero is the Rafale C), mlrs_b (M270A2; the hero
   is the M270B1), hvy_b (Challenger 3; no hero).

   Rows that still drew a GENERIC model (found by the model evaluation; each names the same vehicle as
   a hero row, checked by full name in js/eras.js and the spec designation):
   boat_c            pla_e00_missileboat   Type 022 Houbei
   boat_r            roc_e00_missileboat   Kuang Hua VI
   gbr_e80_spg       nato_e80_spg          M109A2 (British service; plain paint)
   gbr_e60_mlrs      nato_e50_mlrs         MGR-1 Honest John
   nato_e50_gunship  fra_e50_gunship       Alouette II with AS.11 (the spec's designation)
   nato_e00_spaag    nato_e90_spaag        M1097 Avenger (the spec's designation)
   nato_e60_mlrs     deu_e60_mlrs          110mm LARS (the spec's designation)

   Load order: LAST among the hero files, after every file that registers an era row named above.
   A missing era row leaves its skirmish row on its old model.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";
  var MAP = {
    fighter_k: "kpa_e90_fighter", ifv_k: "kpa_e90_ifv", lt_k: "kpa_e90_lighttank", mbt_k: "kpa_e90_mbt",
    md500_k: "kpa_e00_md500", missileboat_k: "kpa_e90_missileboat", mlrs_k: "kpa_e90_mlrs",
    spg_k: "kpa_e80_spg", sub_k: "kpa_e80_sub", trans_k: "kpa_e00_transport",
    asw_helo_n: "nato_e00_aswhelo", asw_helo_p: "pact_e80_aswhelo",
    bomber_c: "pla_e00_cas", corvette_c: "pla_e00_corvette", ifv_c: "pla_e00_ifv", mlrs_c: "pla_e00_mlrs",
    recon_c: "pla_e00_recon", spaag_c: "pla_e00_spaag", spg_c: "pla_e00_spg", sub_c: "pla_e00_sub",
    missileboat_c: "pla_e00_missileboat",
    asw_helo_r: "roc_e00_aswhelo", bomber_r: "roc_e00_cas", corvette_r: "roc_e00_corvette",
    destroyer_r: "roc_e00_destroyer", lt_r: "roc_e90_lighttank", mbt_r: "roc_e90_mbt",
    mlrs_r: "roc_e00_mlrs", recon_r: "roc_e00_recon", sub_r: "roc_e00_sub",
    spg_r: "nato_e90_spg", radarv_r: "nato_e80_radarv",
    mbt_b: "gbr_e90_heavy", ifv_b: "gbr_e00_ifv", recon_b: "gbr_e00_recon", spaag_b: "gbr_e00_spaag", helo_b: "helo_r", airlift_b: "fra_e00_airlift", ifv_g: "deu_e00_ifv", bomber_g: "deu_e90_cas", trans_g: "fra_e00_transport", airlift_g: "fra_e00_airlift", radarv_g: "fra_e00_radarv", ifv_f: "fra_e00_ifv", spaag_f: "fra_e00_spaag", spg_f: "fra_e00_spg", mlrs_f: "fra_e00_mlrs", sam_f: "fra_e00_sam", radarv_f: "fra_e00_radarv", trans_f: "fra_e00_transport", fighter_f: "fra_e00_fighter", bomber_f: "fra_e90_cas", airlift_f: "fra_e00_airlift",
    boat_c: "pla_e00_missileboat", boat_r: "roc_e00_missileboat", gbr_e80_spg: "nato_e80_spg",
    gbr_e60_mlrs: "nato_e50_mlrs", nato_e50_gunship: "fra_e50_gunship", nato_e00_spaag: "nato_e90_spaag",
    nato_e60_mlrs: "deu_e60_mlrs"
  };
  Object.keys(MAP).forEach(function (dst) {
    var src = UNIT_MODELS[MAP[dst]];
    if (!src || typeof src.build !== "function") return;
    var e = {};
    Object.keys(src).forEach(function (p) { e[p] = src[p]; });
    UNIT_MODELS[dst] = e;
  });
  /* a named round is keyed by the firing weapon, and a skirmish row fires its own weapon: the
     LRU's GMLRS is re-keyed to mlrs_f's "mlrs" (the skirmish M270 rows' weapon, as mlrs_n) */
  if (UNIT_MODELS.mlrs_f && UNIT_MODELS.mlrs_f.ord) UNIT_MODELS.mlrs_f.ord = { mlrs: "gmlrs" };
})();
