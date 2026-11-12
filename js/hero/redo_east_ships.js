/* ==================== js/hero/redo_east_ships.js ========================
   ROUGH-MODEL REBUILD ROUND (2026-11-12) -- six Eastern naval rows still drawn
   by the generic builders (js/warship_specs.js, js/sub_specs.js,
   js/units3d_final.js).

     missileboat_r        Kuang Hua VI (settled below)   REUSED: HeroRocShips2.kuangHua6
     kpa_e80_corvette     Soho-class catamaran frigate   HELD -- no reference found
     kpa_e00_missileboat  Nongo-class FAC                HELD -- no reference found
     kpa_e00_sub          Sinpo / Gorae SSB              HELD -- no reference found
     lst_k                Hantae-class LST               HELD -- no reference found
     pla_e80_lst          Type 072 (Yukan) LST           HELD -- no reference found

   Review policy rule 1: a model is drawn only from a photograph or drawing of
   the real ship.  None was found for the five held rows (searches at the
   foot), so they keep their generic models and nothing is invented here.

   LOAD ORDER: after js/hero/roc_ships2.js (HeroRocShips2), and after
   js/units3d_final.js, whose UNIT_MODELS["missileboat_r"] this replaces.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* missileboat_r (rules.js "Hsiung Feng Boat", full "HF-III Missile Craft";
   warship_specs.js designation "Hai Ou class").  SETTLED AS THE KUANG HUA VI,
   from the row's own weapons and era in js/rules.js:
   - it is a skirmish (present-day) row;
   - its NAVY entry arms it with ssm_hf3 and its magazine holds FOUR rounds
     (rules.js missileboat_r: { ssm_hf3: 4 }), and it "carries its own radar"
     (radar 9, radarQ 9);
   - the Kuang Hua VI is the ROC Navy's present-day missile boat: four box
     launchers and her own search and fire-control fit (en.wikipedia
     "Kuang Hua VI-class missile boat"; eras.js roc_e00_missileboat, radarQ 5,
     "still under the present-day row");
   - the Hai Ou carries TWO Hsiung Feng I (eras.js w_e60_roc_missileboat) and
     is the 1970s-90s boat of the e60-e90 rows; the spec's "Hai Ou class" and
     21.6 m are the stale generic header, not the row.
   The Hsiung Feng III is not carried by any ROC missile boat (the Kuang Hua
   VI's rounds are Hsiung Feng II; the HF-III goes to sea in the Tuo Chiang,
   which is corvette_r): the missile is the game's, the boat is drawn as she
   is, with her four HF-II boxes.  The generic model it replaces was a 60 m
   faceted catamaran (units3d_final.js) - the Tuo Chiang's shape, which is
   already corvette_r's.
   REUSED: js/hero/roc_ships2.js HeroRocShips2.kuangHua6 (measured off
   "ROCN FACG 68 Passing through Exercise Water in High Speed 20141123a.jpg",
   34.2 x 7.6 m), the builder roc_e00_missileboat uses; nothing redrawn. */
if (typeof HeroRocShips2 !== "undefined" && HeroRocShips2.kuangHua6) {
  UNIT_MODELS["missileboat_r"] = { len: 34.2, build: function (THREE, M, C) { return HeroRocShips2.kuangHua6(THREE, M, C); } };
}

/* HELD (review policy rule 1) -- the searches of this round, one request at a
   time with the repo-URL User-Agent, on top of those recorded in
   js/hero/kpa_ships.js, kpa_ships2.js, pla_navy_modern.js and pla_retry.js:
   - en.wikipedia article images: "Sinpo-class submarine" (a flag only),
     "Nongo-class fast attack craft" (none), "Soho-class frigate" (a flag; its
     photograph was deleted), "Hantae-class landing ship" (none), "Type 072
     landing ship" (only "Type 072A landing ship - 2.jpg", the later 072A,
     a different ship), "Sinpo South Shipyard", "Hero Kim Kun Ok",
     "Pukguksong-1" (a missile diagram), "Korean People's Navy" (a Najin);
   - ru.wikipedia: "Voenno-morskie sily KNDR" (a Najin, a Tral-class ship
     "North Korean Navy ship.jpg", a semi-submersible), "Voenno-morskie
     sily KNR" (no Yukan); searches for Sinpo, Soho, project 072, Nongo and
     Hantae found no article on any of them;
   - Commons searches: "Yukan", "Yukan class tank landing ship", "Yukan-class",
     "Type 072 landing ship", the Chinese "072 xing tanke denglu jian" and
     "072 xing denglu jian", the Japanese "Yukan-kyu", "Soho class frigate",
     the Korean "Sinpo-geup" and "Soho-geup", "Sinpo class submarine", "Gorae
     submarine", "North Korean submarine SLBM", "Pukguksong", "Nongo",
     "Hantae", "North Korea Military Power", "Office of Naval Intelligence
     PLA Navy", "Worldwide Equipment Guide naval", "PLA Navy tank landing
     ship" (only the 072A and unrelated files);
   - Commons categories: "Ships of the Korean People's Navy", "Korean People's
     Army Naval Force", "Type 072 landing ships", "Tank landing ships of the
     People's Liberation Army Navy" (none exist), "Submarines of North Korea"
     (Sang-O only);
   - the text layers of the public-domain documents on Commons that might
     carry a line drawing: TRADOC "Worldwide Equipment Guide 2015, Volume 3:
     Naval Systems" (Sang-O and the SILC only), "Threat Tactics Report - North
     Korea" (2015; Hantae named, no figure) and (2018; no ships), NPS "Effects
     of the subsurface domain on the security of the Korean Peninsula" (Sinpo /
     Gorae named, no figure), NPS "A dollar cost evaluation of mainland
     China's major weapon systems" (Yukan in a table only), NTI "DPRK
     infographic" (Sinpo South named), "North Korea's Nuclear Weapons and
     Missile Programs"; the USMC "North Korea Country Handbook" (1998) prints
     SOHO FF and HANTAE LCU as "LINE DIAGRAM UNAVAILABLE" and predates the
     Sinpo and Nongo;
   - ko / zh / ja / de Wikipedia, navypedia.org, globalsecurity.org,
     38north.org and archive.org are refused by this session's network.
   UNIT_MODELS["kpa_e80_corvette"]    -- Soho-class frigate: no reference found
   UNIT_MODELS["kpa_e00_missileboat"] -- Nongo-class FAC: no reference found
   UNIT_MODELS["kpa_e00_sub"]         -- Sinpo / Gorae SSB: no reference found
   UNIT_MODELS["lst_k"]               -- Hantae-class LST: no reference found
   UNIT_MODELS["pla_e80_lst"]         -- Type 072 (Yukan) LST: no reference found */
