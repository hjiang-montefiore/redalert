/* ============ facts.js — real-world reference data ============
   Published specifications for the platforms the game models, compiled as a
   reference layer: the GAME balance in rules.js is deliberately NOT driven by
   these numbers, but every unit can show what the real machine does.
   `confidence` is the compiler's own honesty rating; figures marked medium or
   low should be read as "about right", not as authoritative.               */
var FACTS = {
  atgmv_n: { name: "M1134 Stryker Anti-Tank Guided Missile Vehicle", origin: "United States", armament: "Elevating twin TOW-2B launcher (3.75 km), 10 reload missiles; 7.62 mm M240", protection: "Steel hull with ceramic appliqu\u00e9 vs 14.5 mm; slat armour kit available", note: "Its TOW-2B flies over the target and fires explosive penetrators downward into the thin roof armour.", confidence: "high", service: 2003, crew: 4, weight_t: 16.5, speed_kmh: 100, range_km: 500 },
  atgmv_p: { name: "9P157-2 Khrizantema-S anti-tank missile system", origin: "Russia", armament: "2 ready 9M123 supersonic ATGMs (6 km), 15 carried; radar and laser beam guidance", protection: "Amphibious BMP-3 hull, aluminium/steel, proof against heavy machine guns", note: "Millimetre-wave radar guidance lets it shoot through smoke and fog, engaging two tanks at once.", confidence: "high", service: 2005, crew: 2, weight_t: 18.7, speed_kmh: 70, range_km: 600 },
  bomber_c: { name: "Xi'an JH-7A \"Flying Leopard\" (NATO Flounder)", origin: "China", armament: "23 mm GSh-23L; YJ-82/YJ-83 anti-ship and YJ-91 anti-radiation missiles, 9,000 kg on 9 pylons", protection: "-", note: "China's first indigenously designed strike fighter, built mainly for naval anti-ship strike.", confidence: "medium", service: 2004, crew: 2, weight_t: 28.5, speed_kmh: 1808, range_km: 1650 },
  bomber_n: { name: "Fairchild Republic A-10C Thunderbolt II", origin: "United States", armament: "30 mm GAU-8/A Avenger (1,174 rds); 7,260 kg on 11 pylons, AGM-65 Maverick, rockets", protection: "540 kg titanium cockpit bathtub, redundant manual flight controls, self-sealing tanks", note: "The GAU-8 cannon is nearly 6 m long; the airframe was essentially designed around it.", confidence: "high", service: 2007, crew: 1, weight_t: 23, speed_kmh: 706, range_km: 460 },
  bomber_p: { name: "Sukhoi Su-25SM3 (NATO Frogfoot)", origin: "Russia / Soviet Union", armament: "30 mm GSh-30-2; 4,400 kg on 10 pylons - S-8/S-13 rockets, Kh-25ML, Kh-29, bombs", protection: "Welded titanium cockpit bath up to 24 mm thick; SM3 adds Vitebsk-25 EW with DIRCM", note: "Its Vitebsk DIRCM turret blinds incoming heat-seeking MANPADS rather than just dumping flares.", confidence: "medium", service: 2016, crew: 1, weight_t: 19.3, speed_kmh: 950, range_km: 375 },
  bomber_r: { name: "AIDC F-CK-1 Ching-kuo (Indigenous Defence Fighter)", origin: "Taiwan (Republic of China)", armament: "20 mm M61A1 Vulcan; TC-1 and TC-2 Sky Sword AAMs, Hsiung Feng II anti-ship missiles", protection: "-", note: "Built after Washington refused to sell Taiwan the F-16 or F-20; named for President Chiang Ching-kuo.", confidence: "medium", service: 1994, crew: 1, weight_t: 12.2, speed_kmh: 2223, range_km: 1100 },
  carrier_c: { name: "Fujian (CV-18), Type 003 aircraft carrier", origin: "China", armament: "Air wing of J-15T, J-35 and KJ-600; HHQ-10 SAM launchers and Type 1130 CIWS for self-defence", protection: "HHQ-10 point defence, Type 1130 CIWS, compartmentation", note: "First carrier outside the US Navy with electromagnetic catapults, yet it runs on conventional steam propulsion.", confidence: "medium", service: 2025, weight_t: 80000, speed_kmh: 56 },
  carrier_n: { name: "Nimitz-class nuclear-powered aircraft carrier (CVN-68)", origin: "United States", armament: "Air wing of 60-90 aircraft; Sea Sparrow/ESSM, RIM-116 RAM, Phalanx CIWS for self-defence", protection: "Armoured flight deck and 63 mm Kevlar over vital spaces, compartmentation, CIWS/decoys", note: "Two A4W reactors let a Nimitz steam over twenty years between refuellings.", confidence: "high", service: 1975, crew: 5000, weight_t: 100000, speed_kmh: 56 },
  carrier_p: { name: "Admiral Flota Sovetskogo Soyuza Kuznetsov, Project 1143.5 heavy aircraft cruiser", origin: "Soviet Union / Russia", armament: "Air group of Su-33/MiG-29K and Ka-27 helicopters; 12x P-700 Granit SSM, Kinzhal SAM", protection: "Kinzhal SAM, 8x Kashtan CIWS, 6x AK-630, RBU-12000; partial side and deck armour", note: "Only carrier combining a ski-jump with heavy P-700 Granit anti-ship missiles buried under its flight deck.", confidence: "medium", service: 1991, crew: 1960, weight_t: 61390, speed_kmh: 54, range_km: 15700 },
  corvette_n: { name: "Freedom-class littoral combat ship (LCS-1)", origin: "United States", armament: "57 mm Mk 110 gun, 21-cell SeaRAM, 30 mm guns, Longbow Hellfire; Naval Strike Missile on some hulls", protection: "SeaRAM point defence, Nulka decoys; minimal armour, aluminium superstructure", note: "Its semi-planing steel monohull exceeds 45 knots, but combining-gear failures cut several ships' careers short.", confidence: "high", service: 2008, crew: 50, weight_t: 3500, speed_kmh: 87, range_km: 6500 },
  corvette_r: { name: "Tuo Chiang-class stealth missile corvette", origin: "Taiwan", armament: "8x Hsiung Feng II and 8x supersonic Hsiung Feng III SSM, 76 mm gun, Phalanx CIWS", protection: "Faceted stealth catamaran superstructure, Phalanx CIWS, chaff; later hulls add TC-2N SAM", note: "Taiwan's navy calls the stealth catamaran a 'carrier killer' for its supersonic Hsiung Feng III missiles.", confidence: "medium", service: 2015, crew: 41, weight_t: 567, speed_kmh: 83, range_km: 3700 },
  cruiser_c: { name: "Type 055 large destroyer (NATO: Renhai class)", origin: "China", armament: "112-cell universal VLS (HHQ-9B, YJ-18, CJ-10, Yu-8), 130 mm H/PJ-38 gun, 24-cell HHQ-10", protection: "Dual-band radar suite, HHQ-10 point defence, H/PJ-11 30 mm CIWS, integrated stealth shaping", note: "Its 112 missile cells are the most on any warship afloat except America's 122-cell Ticonderoga cruisers.", confidence: "medium", service: 2020, crew: 300, weight_t: 12500, speed_kmh: 56, range_km: 9300 },
  cruiser_n: { name: "Ticonderoga-class guided missile cruiser (CG-47)", origin: "United States", armament: "122-cell Mk 41 VLS (SM-2, Tomahawk, VLA), 2x 127 mm Mk 45 guns, 8x Harpoon, torpedo tubes", protection: "Aegis/SPY-1B combat system, Kevlar over vital spaces, 2x Phalanx CIWS, SLQ-32 EW", note: "The first five Ticonderogas used older Mk 26 arm launchers and were retired by 1995.", confidence: "high", service: 1983, crew: 330, weight_t: 9800, speed_kmh: 60, range_km: 11100 },
  cruiser_p: { name: "Slava-class guided missile cruiser, Project 1164 Atlant", origin: "Soviet Union / Russia", armament: "16x P-500/P-1000 (SS-N-12) SSM, S-300F Fort SAM (64), twin AK-130 130 mm, torpedoes, RBU-6000", protection: "S-300F and Osa-M SAMs, 6x AK-630 CIWS, decoys; light splinter armour", note: "Lead ship Moskva, Black Sea Fleet flagship, sank in April 2022 after Ukrainian Neptune missile strikes.", confidence: "high", service: 1982, crew: 485, weight_t: 11490, speed_kmh: 59, range_km: 11100 },
  destroyer_c: { name: "Type 052D destroyer (NATO: Luyang III class)", origin: "China", armament: "64-cell universal VLS (HHQ-9B, YJ-18, CJ-10, Yu-8), 130 mm H/PJ-38 gun, 24-cell HHQ-10", protection: "Type 346A AESA radar, HHQ-10 point defence, H/PJ-11 or Type 730 CIWS, decoy launchers", note: "Its 64 universal cells launch air-defence, anti-ship, land-attack and anti-submarine missiles from the same silo.", confidence: "medium", service: 2014, crew: 280, weight_t: 7500, speed_kmh: 56, range_km: 8300 },
  destroyer_n: { name: "Arleigh Burke-class Flight IIA guided missile destroyer (DDG-79 onward)", origin: "United States", armament: "96-cell Mk 41 VLS (SM-2/SM-6/ESSM/Tomahawk/VLA), 127 mm Mk 45 gun, Mk 32 torpedo tubes", protection: "Aegis/SPY-1D combat system, Kevlar splinter armour, Phalanx CIWS, SLQ-32 EW, Nulka decoys", note: "Flight IIA added twin helicopter hangars; later ships dropped the Harpoon launchers entirely.", confidence: "high", service: 2000, crew: 330, weight_t: 9700, speed_kmh: 56, range_km: 8150 },
  destroyer_p: { name: "Sovremenny-class destroyer, Project 956 Sarych", origin: "Soviet Union / Russia", armament: "8x P-270 Moskit (SS-N-22) SSM, 2x Shtil (SA-N-7) SAM, 2x twin AK-130 130 mm, 2x twin 533 mm TT", protection: "4x AK-630 CIWS, Shtil area SAM, chaff launchers; splinter plating only", note: "Steam-turbine powered when rivals went gas turbine; its twin AK-130 mounts are the heaviest destroyer guns afloat.", confidence: "high", service: 1980, crew: 296, weight_t: 7940, speed_kmh: 60, range_km: 7260 },
  destroyer_r: { name: "Kee Lung-class destroyer (ex-US Kidd class)", origin: "United States (built) / Taiwan (operator)", armament: "2x Mk 26 launchers (SM-2MR Block IIIA), 2x 127 mm Mk 45 guns, Harpoon, Mk 32 torpedo tubes", protection: "Kevlar splinter protection, 2x Phalanx CIWS, SLQ-32 EW and decoys", note: "Built for the Shah of Iran, embargoed in 1979, US sailors nicknamed them the 'Ayatollah class'.", confidence: "high", service: 2005, crew: 360, weight_t: 9783, speed_kmh: 61 },
  fighter_c: { name: "Chengdu J-10C \"Vigorous Dragon\" (NATO Firebird)", origin: "China", armament: "23 mm twin cannon; PL-10 HOBS, PL-12 and PL-15 AAMs, PL-15E export missiles", protection: "DSI intake and RAM coatings for reduced frontal RCS; integrated EW and MAWS", note: "Its diverterless supersonic inlet removes the heavy splitter plate, cutting weight and radar return.", confidence: "medium", service: 2018, crew: 1, weight_t: 19.3, speed_kmh: 2200, range_km: 550 },
  fighter_n: { name: "Lockheed Martin F-16C Fighting Falcon Block 52", origin: "United States", armament: "20 mm M61A1 Vulcan; AIM-120 AMRAAM, AIM-9, JDAM/Paveway, up to 7,700 kg on 9 stations", protection: "No armour; ALQ-131/ALQ-184 ECM pod, ALE-47 chaff/flare, ALR-56M RWR", note: "Relaxed static stability makes it aerodynamically unstable; fly-by-wire computers alone keep it flyable.", confidence: "high", service: 1991, crew: 1, weight_t: 19.2, speed_kmh: 2120, range_km: 550 },
  fighter_p: { name: "Mikoyan MiG-29S (izdeliye 9.13S, NATO Fulcrum-C)", origin: "Russia / Soviet Union", armament: "30 mm GSh-30-1; R-27, R-73 and R-77 (RVV-AE) missiles, unguided bombs/rockets", protection: "No armour; SPO-15 RWR, chaff/flare dispensers in the wing roots", note: "Louvred intake doors let it ingest air from top vents, allowing operation from debris-strewn strips.", confidence: "medium", service: 1994, crew: 1, weight_t: 20, speed_kmh: 2450, range_km: 1430 },
  fighter_r: { name: "Lockheed Martin F-16V Block 70 Fighting Falcon (Viper)", origin: "United States", armament: "20 mm M61A1; AIM-120C/D, AIM-9X, AGM-84 Harpoon, JDAM, up to 7,700 kg", protection: "AN/ALQ-254 Viper Shield EW suite, ALE-47 countermeasures; no armour", note: "Adds APG-83 AESA radar and Auto-GCAS, plus a 12,000-hour airframe - double the original design life.", confidence: "medium", service: 2023, crew: 1, weight_t: 21.8, speed_kmh: 2120, range_km: 555 },
  helo_c: { name: "CAIC Z-10", origin: "China", armament: "23 mm or 30 mm chin cannon; 8x HJ-10 ATGM, TY-90 air-to-air missiles, 57/90 mm rocket pods", protection: "Armoured tandem cockpit, narrow low-RCS fuselage, IR-suppressed exhausts", note: "Kamov secretly drew up its baseline design for China under a 1995 contract revealed only in 2013.", confidence: "medium", service: 2012, crew: 2, weight_t: 7, speed_kmh: 270, range_km: 800 },
  helo_k: { name: "Mil Mi-24D (NATO Hind-D)", origin: "Soviet Union", armament: "12.7 mm YakB four-barrel chin gun; 4x 9M17 Falanga ATGM, UB-32 rocket pods, 1,500 kg bombs", protection: "Armoured cockpit tubs, bulletproof canopies, titanium rotor head", note: "The only gunship built to carry an eight-man infantry squad - crews called it the flying tank.", confidence: "high", service: 1976, crew: 2, weight_t: 11.5, speed_kmh: 335, range_km: 450 },
  helo_n: { name: "Boeing AH-64E Apache Guardian", origin: "United States", armament: "30 mm M230 chain gun (1,200 rds); up to 16x AGM-114 Hellfire or 76x Hydra 70 rockets", protection: "Armoured crew stations and blast-tolerant airframe, IR-suppressing exhausts, crashworthy seats", note: "Its crew can steer a nearby drone and its sensors directly from the cockpit (Level 4 teaming).", confidence: "high", service: 2011, crew: 2, weight_t: 10.4, speed_kmh: 300, range_km: 476 },
  helo_p: { name: "Mil Mi-28N \"Night Hunter\" (NATO Havoc)", origin: "Russia", armament: "30 mm 2A42 cannon (250 rds); 16x 9M120 Ataka ATGM, S-8/S-13 rockets, Igla AAMs", protection: "Armoured cockpit tubs rated against 12.7 mm rounds, armoured glass, damage-tolerant rotor", note: "Carries a small cabin behind the cockpit sized to rescue the crew of a downed helicopter.", confidence: "medium", service: 2009, crew: 2, weight_t: 11.5, speed_kmh: 300, range_km: 435 },
  hvy_k: { name: "Songun-ho (Songun-915)", origin: "North Korea", armament: "125 mm 2A46-pattern smoothbore; twin Bulsae ATGM tubes; MANPADS pod; 14.5 mm KPVT", protection: "Steel/composite with explosive reactive armour blocks on turret and glacis", note: "Uniquely mounts anti-tank missile tubes and a shoulder-launched surface-to-air missile pod on its turret roof.", confidence: "low", service: 2010, crew: 4, weight_t: 44, speed_kmh: 70 },
  hvy_n: { name: "M1A2C Abrams (SEP v3) with Trophy APS", origin: "United States / Israel (Trophy)", armament: "120 mm M256 smoothbore; 12.7 mm M2; 2x 7.62 mm M240", protection: "DU-composite armour plus Trophy hard-kill active protection (radar + interceptors)", note: "Trophy's radar tracks incoming RPGs and fires a shotgun-like interceptor, adding roughly two tonnes to the tank.", confidence: "medium", service: 2020, crew: 4, weight_t: 66.8, speed_kmh: 67, range_km: 426 },
  hvy_p: { name: "T-14 Armata", origin: "Russia", armament: "125 mm 2A82-1M smoothbore in unmanned turret; 12.7 mm Kord; 7.62 mm PKT", protection: "Malachit ERA, Afganit active protection, isolated armoured crew capsule", note: "The three-man crew sits in an armoured hull capsule, fully isolated from the unmanned turret and ammunition.", confidence: "medium", crew: 3, weight_t: 48, speed_kmh: 80, range_km: 500 },
  hvy_r: { name: "M1A2T Abrams", origin: "United States (for Taiwan)", armament: "120 mm M256 smoothbore; 12.7 mm M2 in CROWS-LP; 7.62 mm M240", protection: "Export composite armour (no depleted uranium); no active protection system fitted", note: "Taiwan's first new tanks in three decades; deliveries of 108 began in December 2024.", confidence: "medium", service: 2024, crew: 4, weight_t: 66.8, speed_kmh: 67, range_km: 426 },
  ifv_c: { name: "ZBD-04A", origin: "China", armament: "100 mm rifled gun/ATGM launcher; 30 mm coaxial autocannon; 7.62 mm", protection: "Welded steel with modular appliqu\u00e9 armour; amphibious", note: "Swims on two waterjets; its 100 mm plus 30 mm turret layout closely follows the Russian BMP-3.", confidence: "medium", service: 2014, crew: 3, weight_t: 24, speed_kmh: 75, range_km: 600 },
  ifv_n: { name: "M2A3 Bradley Infantry Fighting Vehicle", origin: "United States", armament: "25 mm M242 Bushmaster; twin TOW-2 launcher; 7.62 mm M240C coaxial", protection: "Spaced laminate and appliqu\u00e9 steel, BRAT reactive tiles available, NBC system", note: "The A3's independent commander's thermal sight gave Bradley true hunter-killer gunnery, a first for the type.", confidence: "high", service: 2000, crew: 3, weight_t: 30.4, speed_kmh: 66, range_km: 400 },
  ifv_p: { name: "BMP-3", origin: "Soviet Union / Russia", armament: "100 mm 2A70 gun/ATGM launcher; 30 mm 2A72 coaxial autocannon; 3x 7.62 mm PKT", protection: "Aluminium alloy hull with steel appliqu\u00e9; small-arms proof; fully amphibious", note: "Its 100 mm gun doubles as a launcher for laser-guided Bastion anti-tank missiles, rare on an IFV.", confidence: "high", service: 1987, crew: 3, weight_t: 18.7, speed_kmh: 72, range_km: 600 },
  ifv_r: { name: "CM-34 Clouded Leopard (8x8 IFV)", origin: "Taiwan", armament: "30 mm Mk 44 Bushmaster II in two-man turret; 7.62 mm coaxial; optional 12.7 mm", protection: "All-welded steel proof against 12.7 mm, with add-on appliqu\u00e9 armour", note: "Named for the Formosan clouded leopard, an animal officially declared extinct on Taiwan in 2013.", confidence: "medium", service: 2019, crew: 3, weight_t: 24, speed_kmh: 100, range_km: 800 },
  lst: { name: "Landing Craft Air Cushion (LCAC)", origin: "United States", armament: "Usually unarmed; fittings for two 12.7 mm M2 or M60 machine guns", protection: "-", note: "Air cushion lets it cross roughly 70 percent of world beaches, versus 15 percent for conventional landing craft.", confidence: "high", service: 1986, crew: 5, weight_t: 182, speed_kmh: 74, range_km: 370 },
  lt_c: { name: "ZTQ-15 (Type 15) light tank", origin: "China", armament: "105 mm rifled gun with bustle autoloader and gun-launched ATGM; 12.7 mm; 7.62 mm", protection: "Modular composite and ERA packages (up to ~36 t); optional GL-5 active protection", note: "Designed for the Tibetan plateau; its turbocharged engine keeps power where thin air chokes heavier tanks.", confidence: "high", service: 2018, crew: 3, weight_t: 33, speed_kmh: 70, range_km: 450 },
  lt_n: { name: "M1128 Stryker Mobile Gun System", origin: "United States", armament: "105 mm M68A2 rifled gun with autoloader; 7.62 mm coaxial; 12.7 mm M2", protection: "Steel hull proof against 14.5 mm; bolt-on slat and ceramic armour kits", note: "The US Army retired the whole Mobile Gun System fleet in 2022 after fewer than 150 were built.", confidence: "high", service: 2007, crew: 3, weight_t: 18.8, speed_kmh: 100, range_km: 500 },
  lt_p: { name: "2S25 Sprut-SD", origin: "Russia", armament: "125 mm 2A75 smoothbore firing 9M119 Refleks ATGM; 7.62 mm PKT coaxial", protection: "Welded aluminium armour, small-arms and shell-splinter proof only; amphibious", note: "Airdroppable with its crew aboard from an Il-76, it carries tank-calibre 125 mm firepower at eighteen tonnes.", confidence: "high", service: 2005, crew: 3, weight_t: 18, speed_kmh: 70, range_km: 500 },
  lt_r: { name: "M60A3 TTS", origin: "United States", armament: "105 mm M68 rifled gun; 12.7 mm commander's MG; 7.62 mm coaxial", protection: "Cast and rolled homogeneous steel armour; smoke dischargers; NBC system", note: "TTS means Tank Thermal Sight - the AN/VSG-2 finally gave the M60 genuine night gunnery.", confidence: "high", service: 1979, crew: 4, weight_t: 52.6, speed_kmh: 48, range_km: 480 },
  mbt_c: { name: "ZTZ-99A (Type 99A)", origin: "China", armament: "125 mm smoothbore with autoloader and gun-launched ATGM; 12.7 mm QJC-88; 7.62 mm", protection: "Modular composite plus ERA; JD-3 laser self-defence/dazzler system", note: "Its JD-3 system detects enemy laser rangefinders and fires a dazzling laser back along the beam.", confidence: "medium", service: 2011, crew: 3, weight_t: 58, speed_kmh: 70, range_km: 600 },
  mbt_k: { name: "Chonma-ho (Ch'onma-ho)", origin: "North Korea", armament: "115 mm U-5TS smoothbore (125 mm on late marks); 14.5 mm KPVT AA; 7.62 mm PKT", protection: "Cast steel T-62-pattern hull and turret; later marks add ERA and side skirts", note: "A locally built T-62 descendant; the name means \"Pegasus\", after a mythical Korean winged horse.", confidence: "medium", service: 1980, crew: 4, weight_t: 40, speed_kmh: 50, range_km: 450 },
  mbt_n: { name: "M1A2 SEP v3 Abrams (M1A2C)", origin: "United States", armament: "120 mm M256 smoothbore; 1x 12.7 mm M2; 2x 7.62 mm M240", protection: "Composite armour with depleted-uranium mesh, ARAT reactive tiles, CROWS-LP", note: "SEP v3 adds an under-armour auxiliary power unit, letting crews run sensors silently without the gas turbine.", confidence: "high", service: 2020, crew: 4, weight_t: 66.8, speed_kmh: 67, range_km: 426 },
  mbt_p: { name: "T-90A", origin: "Russia", armament: "125 mm 2A46M-5 smoothbore with autoloader and 9M119 Refleks ATGM; 12.7 mm Kord; 7.62 mm PKT", protection: "Steel/composite hull with Kontakt-5 ERA and Shtora-1 soft-kill countermeasures", note: "Shtora-1's two infrared dazzlers flank the gun, earning the T-90 its \"red eyes\" nickname.", confidence: "high", service: 2004, crew: 3, weight_t: 46.5, speed_kmh: 60, range_km: 550 },
  mbt_r: { name: "CM-11 Brave Tiger (M48H)", origin: "Taiwan / United States", armament: "105 mm M68A1 rifled gun; 12.7 mm M2 commander's MG; 7.62 mm coaxial", protection: "Cast homogeneous steel M48-pattern turret on M60 hull; no composite armour", note: "A hybrid: M48 turret on an M60 hull, wedded to the M1 Abrams fire-control computer.", confidence: "high", service: 1990, crew: 4, weight_t: 50, speed_kmh: 48, range_km: 480 },
  missileboat_c: { name: "Type 022 missile boat (NATO: Houbei class)", origin: "China", armament: "8x YJ-83 anti-ship missiles, 30 mm AK-630-type gun, MANPADS", protection: "Radar-reducing shaping, small silhouette; gun and MANPADS only", note: "Its wave-piercing catamaran hull derives from an Australian commercial fast-ferry design.", confidence: "medium", service: 2004, crew: 12, weight_t: 220, speed_kmh: 67 },
  missileboat_p: { name: "Project 1241 Molniya missile boat (NATO: Tarantul class)", origin: "Soviet Union / Russia", armament: "4x P-15 Termit or 16x Kh-35 Uran SSM, 76 mm AK-176, 2x AK-630, Strela-3 SAM", protection: "2x AK-630 CIWS and MANPADS only; unarmoured", note: "Vietnam builds licensed Molniya boats carrying sixteen Kh-35 missiles, four times the original Termit load.", confidence: "medium", service: 1979, crew: 41, weight_t: 550, speed_kmh: 78, range_km: 4400 },
  mlrs_c: { name: "PHL-03 (Type 03) 300 mm multiple rocket launcher", origin: "China", armament: "12 \u00d7 300 mm rockets, 70-130 km; 800 kg rocket with 280 kg warhead", protection: "Unarmoured 8\u00d78 truck cab", note: "Closely modelled on the Russian Smerch, but Chinese guided rockets stretched its reach past 100 km.", confidence: "medium", service: 2005, crew: 4, weight_t: 43, speed_kmh: 60, range_km: 650 },
  mlrs_k: { name: "M1991 240 mm multiple rocket launcher", origin: "North Korea", armament: "22 \u00d7 240 mm rockets, roughly 43-60 km, full salvo in about 45 seconds", protection: "Unarmoured 6\u00d76 truck cab", note: "Twenty-two tubes in rows of 8-8-6; North Korea shipped these launchers to Russia from 2024.", confidence: "medium", service: 1991 },
  mlrs_n: { name: "M270A2 Multiple Launch Rocket System", origin: "United States", armament: "12 \u00d7 227 mm GMLRS rockets (70-150 km) or 2 \u00d7 ATACMS/PrSM missiles", protection: "Improved Armored Cab with blast-attenuating seats; tracked Bradley-derived chassis", note: "The A2 rebuild adds a 600 hp engine and new fire control so it can launch PrSM.", confidence: "medium", service: 2022, crew: 3, weight_t: 25, speed_kmh: 64, range_km: 483 },
  mlrs_p: { name: "9A52-2 Smerch (BM-30) 300 mm multiple rocket launcher", origin: "Soviet Union / Russia", armament: "12 \u00d7 300 mm rockets, 20-90 km, full salvo in 38 seconds", protection: "Unarmoured MAZ-543M truck cab", note: "One Smerch rocket variant carries a small drone that parachutes out to spot for the battery.", confidence: "high", service: 1987, crew: 4, weight_t: 43.7, speed_kmh: 60, range_km: 850 },
  mlrs_r: { name: "RT-2000 (Ray-Ting 2000) Thunderbolt-2000 multiple rocket launcher", origin: "Taiwan", armament: "Interchangeable pods: 60 \u00d7 117 mm (15 km), 27 \u00d7 180 mm (30 km) or 12 \u00d7 227 mm (45 km)", protection: "Unarmoured 8\u00d78 heavy truck cab", note: "Built to saturate landing beaches: one launcher can blanket a stretch of shoreline in seconds.", confidence: "medium", service: 2010, crew: 3 },
  radarv_n: { name: "AN/TPQ-53 (Q-53) Counterfire Target Acquisition Radar", origin: "United States", armament: "None; S-band phased-array counter-battery radar on a 5-ton truck", protection: "-", note: "Replaces two older Firefinder radars and has since been retasked to detect and track hostile drones.", confidence: "high", service: 2011, crew: 4, range_km: 60 },
  radarv_r: { name: "AN/TPQ-37 Firefinder weapon-locating radar", origin: "United States", armament: "None; S-band phased-array radar locating artillery to 24 km, rockets to 50 km", protection: "-", note: "Back-plots an incoming shell's trajectory to its gun position, cueing return fire before the rounds land.", confidence: "high", service: 1980, crew: 12, range_km: 50 },
  recon_n: { name: "M1151 HMMWV (Expanded Capacity Armament Carrier)", origin: "United States", armament: "Roof ring mount: 12.7 mm M2, Mk 19 40 mm grenade launcher or 7.62 mm M240", protection: "Bolt-on armour B-kit against small arms and fragments; add-on frag kits", note: "Its armour is a bolt-on B-kit, so units can add or strip protection between missions.", confidence: "medium", service: 2005, crew: 4, weight_t: 5.5, speed_kmh: 113, range_km: 480 },
  recon_p: { name: "BRDM-2", origin: "Soviet Union", armament: "14.5 mm KPVT heavy machine gun with 7.62 mm PKT coaxial in small turret", protection: "7-14 mm welded steel, small-arms proof; NBC system; amphibious via waterjet", note: "Four retractable belly wheels drop down to help it claw across trenches and ditches.", confidence: "high", service: 1962, crew: 4, weight_t: 7.7, speed_kmh: 100, range_km: 750 },
  sbomber_c: { name: "Xi'an H-6N (Tu-16 derivative)", origin: "China", armament: "Semi-recessed fuselage station for an air-launched ballistic missile; CJ-20 cruise missiles", protection: "EW/countermeasures suite; tail gun position deleted on modern variants", note: "First Chinese bomber with an aerial-refuelling probe and a belly recess for a ballistic missile.", confidence: "medium", service: 2019, crew: 4, speed_kmh: 1050, range_km: 6000 },
  sbomber_n: { name: "Northrop Grumman B-2A Spirit", origin: "United States", armament: "Up to 18,000 kg internal: 80x Mk 82, 16x JDAM/B61 or B83 nuclear bombs, GBU-57 MOP", protection: "Low-observable flying wing, RAM skin, shielded exhausts; no defensive guns", note: "Only 21 were built at roughly $2.1 billion each, the costliest aircraft ever produced.", confidence: "high", service: 1997, crew: 2, weight_t: 170.6, speed_kmh: 1010, range_km: 11000 },
  sbomber_p: { name: "Tupolev Tu-160M (NATO Blackjack, \"White Swan\")", origin: "Russia / Soviet Union", armament: "12x Kh-55SM / Kh-101 / Kh-102 cruise missiles on two rotary launchers; 40,000 kg payload", protection: "Modernised EW/countermeasures suite; no defensive gun", note: "Heaviest and fastest combat aircraft ever built; each crew station has a proper ejection seat.", confidence: "medium", service: 2021, crew: 4, weight_t: 275, speed_kmh: 2220, range_km: 12300 },
  spaag_c: { name: "PGZ-09 (Type 09) 35 mm self-propelled anti-aircraft gun", origin: "China", armament: "2 \u00d7 35 mm cannon, about 1,100 rounds/min combined, effective to 4-5 km", protection: "Welded steel hull and turret; tracked PLZ-89-family chassis", note: "China's answer to the Gepard: a mast-mounted tracking radar folds down for road travel.", confidence: "medium", service: 2009, crew: 3, weight_t: 35, speed_kmh: 55, range_km: 450 },
  spaag_n: { name: "Flakpanzer Gepard 1A2 self-propelled anti-aircraft gun", origin: "West Germany / Germany", armament: "2 \u00d7 35 mm Oerlikon KDA cannon, 680 rounds; search and tracking radars", protection: "Leopard 1 hull, welded steel, NBC protection, smoke dischargers", note: "Retired by Germany in 2010, it returned in Ukraine as an unexpectedly effective Shahed drone killer.", confidence: "high", service: 1976, crew: 3, weight_t: 47.5, speed_kmh: 65, range_km: 550 },
  spaag_p: { name: "2S6M Tunguska self-propelled air-defence system", origin: "Soviet Union / Russia", armament: "2 \u00d7 30 mm 2A38M cannon (4 km) plus 8 \u00d7 9M311 (SA-19) missiles (8 km)", protection: "Welded steel, proof against small arms and shell splinters; NBC", note: "Guns can fire on the move, but the vehicle must halt briefly to launch its missiles.", confidence: "high", service: 1990, crew: 4, weight_t: 34, speed_kmh: 65, range_km: 500 },
  spaag_r: { name: "Antelope short-range air defence system (TC-1 SAM)", origin: "Taiwan", armament: "4 \u00d7 Sky Sword I (TC-1) infrared-guided SAMs, effective to about 9 km", protection: "Unarmoured 4\u00d74 light truck chassis", note: "Its missile is the TC-1 air-to-air weapon, a Sidewinder-class seeker adapted to shoot from the ground.", confidence: "medium", crew: 2 },
  spg_c: { name: "PLZ-05 (Type 05) 155 mm self-propelled howitzer", origin: "China", armament: "155 mm/52 cal howitzer (39 km ERFB-BB, 50 km rocket-assisted); 12.7 mm MG", protection: "Welded steel hull and turret, NBC system, smoke dischargers", note: "Its autoloader sustains 8-10 rounds a minute and can land several shells on one target simultaneously.", confidence: "medium", service: 2008, crew: 4, weight_t: 35, speed_kmh: 56, range_km: 450 },
  spg_k: { name: "M-1978 Koksan 170 mm self-propelled gun", origin: "North Korea", armament: "170 mm gun, about 40 km standard and up to 60 km with rocket-assisted shells", protection: "Type 59/T-54-derived hull; gun crew works fully exposed", note: "Carries no ammunition at all: a separate vehicle must follow it with rounds and extra crew.", confidence: "medium", service: 1978, crew: 4, weight_t: 40, speed_kmh: 40, range_km: 300 },
  spg_n: { name: "M109A7 Paladin 155 mm self-propelled howitzer", origin: "United States", armament: "155 mm/39 cal M284 howitzer (~24 km, 30 km RAP); 12.7 mm M2 MG", protection: "Welded aluminium hull with steel appliqu\u00e9, NBC overpressure", note: "Reuses Bradley engine, tracks and 600-volt electrics, so a brigade stocks one set of spares.", confidence: "high", service: 2015, crew: 4, weight_t: 36.6, speed_kmh: 61, range_km: 300 },
  spg_p: { name: "2S19 Msta-S 152 mm self-propelled howitzer", origin: "Soviet Union / Russia", armament: "152 mm 2A64 howitzer (24.7 km, 29 km RAP); 12.7 mm NSVT AA MG", protection: "Welded steel hull/turret vs small arms and splinters; 902B smoke, NBC", note: "Can fire the Krasnopol laser-guided shell and reload from the ground through a conveyor hatch.", confidence: "high", service: 1989, crew: 5, weight_t: 42, speed_kmh: 60, range_km: 500 },
  stealth_c: { name: "Chengdu J-20 \"Mighty Dragon\"", origin: "China", armament: "4x PL-15 in main bay, 1x PL-10 in each side bay; no internal cannon", protection: "Canard-delta stealth shaping, RAM, EOTS/DAS-style sensor fusion", note: "World's third operational stealth fighter and the first canard-delta one ever fielded.", confidence: "medium", service: 2017, crew: 1, weight_t: 37, speed_kmh: 2470, range_km: 1200 },
  stealth_n: { name: "Lockheed Martin/Boeing F-22A Raptor", origin: "United States", armament: "20 mm M61A2; 6x AIM-120C + 2x AIM-9 internal, 2x 450 kg JDAM", protection: "All-aspect stealth shaping/RAM, ALR-94 passive RWR, expendables", note: "Supercruises above Mach 1.8 without afterburner; only 187 operational aircraft were ever built.", confidence: "high", service: 2005, crew: 1, weight_t: 38, speed_kmh: 2410, range_km: 850 },
  stealth_p: { name: "Sukhoi Su-57 (NATO Felon)", origin: "Russia", armament: "30 mm 9-A1-4071K; R-77M, R-74M2 and Kh-59MK2/Kh-69 in internal bays", protection: "Stealth shaping and RAM, L-402 Himalayas integrated EW suite", note: "Sent to Syria in 2018 for trials years before it was formally accepted into service.", confidence: "medium", service: 2020, crew: 1, weight_t: 35, speed_kmh: 2600, range_km: 1500 },
  sub_c: { name: "Type 039A/039B submarine (NATO: Yuan class)", origin: "China", armament: "6x 533 mm torpedo tubes; Yu-6 torpedoes, YJ-82 anti-ship missiles, mines", protection: "Stirling AIP for long submerged endurance, anechoic tiles, teardrop hull", note: "China's first air-independent-propulsion boats; Stirling engines let them stay submerged for weeks.", confidence: "medium", service: 2006, crew: 38, weight_t: 3600, speed_kmh: 37 },
  sub_k: { name: "Romeo-class diesel-electric submarine, Project 633", origin: "Soviet Union (built also in China, North Korea)", armament: "8x 533 mm torpedo tubes (6 bow, 2 stern), 14 torpedoes or 28 mines", protection: "None beyond pressure hull; 1950s-era snorkel boat", note: "North Korea still runs the world's last Romeo fleet, assembled locally from Chinese-supplied kits.", confidence: "medium", service: 1957, crew: 54, weight_t: 1712, speed_kmh: 28, range_km: 16700 },
  sub_n: { name: "Los Angeles-class nuclear attack submarine (SSN-688)", origin: "United States", armament: "4x 533 mm torpedo tubes (Mk 48 ADCAP, Harpoon); 12 vertical Tomahawk tubes on 688i boats", protection: "HY-80 steel pressure hull, anechoic coating, quieting rafts, acoustic countermeasures", note: "Improved 688i boats added twelve vertical launch tubes and retractable bow planes for under-ice surfacing.", confidence: "high", service: 1976, crew: 129, weight_t: 6927, speed_kmh: 61 },
  sub_p: { name: "Kilo-class diesel-electric submarine, Project 636 Varshavyanka", origin: "Soviet Union / Russia", armament: "6x 533 mm torpedo tubes, 18 torpedoes or 24 mines; Kalibr cruise missiles on Project 636.3", protection: "Anechoic tiles, rafted machinery, very low acoustic signature; Strela-3 MANPADS", note: "NATO submariners nicknamed the Kilo 'the Black Hole' for how quietly it runs on batteries.", confidence: "medium", service: 1997, crew: 52, weight_t: 3950, speed_kmh: 37, range_km: 13900 },
  sub_r: { name: "Hai Lung-class submarine (Dutch Zwaardvis/Walrus derivative)", origin: "Netherlands (built) / Taiwan (operator)", armament: "6x 533 mm torpedo tubes; SUT torpedoes and UGM-84 Harpoon", protection: "Teardrop hull, X-form stern planes; no active defences", note: "Dutch-built and Taiwan's only combat submarines; follow-on orders were cancelled under Chinese diplomatic pressure.", confidence: "high", service: 1987, crew: 67, weight_t: 2660, speed_kmh: 37 },
  trans_k: { name: "Antonov An-2 (NATO Colt)", origin: "Soviet Union / Poland / China", armament: "None as built; utility/transport biplane carrying 12 passengers or 1,500 kg", protection: "-", note: "Its manual lists no stall speed: below about 50 km/h it simply parachutes down under control.", confidence: "high", service: 1948, crew: 2, weight_t: 5.5, speed_kmh: 258, range_km: 845 },
  trans_n: { name: "Sikorsky UH-60M Black Hawk", origin: "United States", armament: "2x 7.62 mm M240H door guns (or GAU-19 .50 cal); ESSS pylons on armed variants", protection: "Crashworthy airframe and seats, ballistic-tolerant structure, IR suppressors, missile warners", note: "Carries 11 fully equipped troops; the M's wide-chord composite blades add lift over earlier models.", confidence: "high", service: 2007, crew: 4, weight_t: 10.7, speed_kmh: 294, range_km: 590 },
  trans_p: { name: "Mil Mi-8AMTSh \"Terminator\" (export Mi-171Sh)", origin: "Russia", armament: "6 pylons: S-8 rockets, 9M120 Ataka ATGM, 23 mm gun pods; PKT door guns", protection: "Armoured cockpit and crew seats, President-S EW/DIRCM on late builds, exhaust suppressors", note: "Assault variant hauls 26 troops or a 4,000 kg slung load while carrying attack-helicopter weapons.", confidence: "medium", service: 2009, crew: 3, weight_t: 13, speed_kmh: 250, range_km: 590 },

/* ---- airborne early warning, electronic attack, carrier wings, submarines ---- */
  awacs_n: { name:"Boeing E-3G Sentry", origin:"United States", service:"1977",
    crew:"4 flight + 13-19 mission", weight_t:147, speed_kmh:855, range_km:7400,
    armament:"None. Self-defence is chaff, flares and staying behind friendly fighters.",
    note:"The AN/APY-2 rotodome turns six times a minute and detects low-flying targets " +
         "out to roughly 400 km. Its real contribution is not seeing further than a fighter " +
         "but seeing everything at once and telling everyone.", confidence:"high" },
  awacs_c: { name:"Shaanxi KJ-500", origin:"China", service:"2015",
    crew:"5 flight + mission crew", weight_t:77, speed_kmh:550, range_km:5700,
    armament:"None.",
    note:"Three fixed AESA arrays inside a non-rotating dorsal disc give continuous " +
         "360-degree coverage without a mechanical scan. Widely described as central to " +
         "Chinese counter-stealth planning.", confidence:"medium" },
  awacs_p: { name:"Beriev A-50U Mainstay", origin:"Soviet Union / Russia", service:"1985",
    crew:"5 flight + 10 mission", weight_t:190, speed_kmh:800, range_km:7500,
    armament:"None.",
    note:"Built on an Il-76 airframe. The Shmel radar has long been criticised for poor " +
         "performance over land clutter, and very few airframes remain serviceable.",
    confidence:"medium" },
  awacs_r: { name:"Northrop Grumman E-2K Hawkeye 2000", origin:"United States", service:"2006 (ROC)",
    crew:"2 flight + 3 mission", weight_t:26, speed_kmh:648, range_km:2700,
    armament:"None.",
    note:"Taiwan operates a small number and they are the backbone of its air picture. " +
         "The four-fin tail exists because the rotodome blanks a conventional rudder.",
    confidence:"high" },
  cawacs_n: { name:"Northrop Grumman E-2D Advanced Hawkeye", origin:"United States", service:"2015",
    crew:"2 flight + 3 mission", weight_t:26, speed_kmh:648, range_km:2700,
    armament:"None.",
    note:"The APY-9 UHF radar was specified in part because longer wavelengths interact " +
         "differently with shaping optimised against fighter-band radar. It flies from " +
         "carrier decks, which is why the wings fold.", confidence:"high" },
  ew_n: { name:"Boeing EA-18G Growler", origin:"United States", service:"2009",
    crew:2, weight_t:29.9, speed_kmh:1900, range_km:2350,
    armament:"ALQ-99 / NGJ jamming pods, AGM-88 HARM, AIM-120 for self-defence",
    note:"The only dedicated carrier-capable electronic attack aircraft in service. " +
         "Wingtip ALQ-218 receivers locate emitters precisely enough to target them.",
    confidence:"high" },
  ew_c: { name:"Shenyang J-16D", origin:"China", service:"2021",
    crew:2, weight_t:35, speed_kmh:2100, range_km:3900,
    armament:"Wingtip ESM pods, underwing jamming pods, anti-radiation missiles",
    note:"A J-16 with the gun and IRST deleted and wingtip electronic-support pods added. " +
         "Publicly confirmed but performance details are not.", confidence:"medium" },
  sead_n: { name:"F-16CJ Block 50 Wild Weasel", origin:"United States", service:"1993",
    crew:1, weight_t:19.2, speed_kmh:2120, range_km:4220,
    armament:"AGM-88 HARM, HARM Targeting System pod, AIM-120, AIM-9",
    note:"The HTS pod finds a radar by its emissions and the HARM flies down the beam. " +
         "In 1991 the first three nights of the air war were largely this mission.",
    confidence:"high" },
  cfighter_n: { name:"Boeing F/A-18E Super Hornet", origin:"United States", service:"2001",
    crew:1, weight_t:29.9, speed_kmh:1915, range_km:3330,
    armament:"M61A2 20mm, AIM-120, AIM-9X, JDAM, JSOW, Harpoon, LRASM",
    note:"The US Navy's standard carrier fighter. Slower and shorter-legged than a " +
         "land-based F-15, because a tailhook, folding wings and a strengthened " +
         "structure all cost weight.", confidence:"high" },
  cstealth_n: { name:"Lockheed Martin F-35C Lightning II", origin:"United States", service:"2019",
    crew:1, weight_t:31.8, speed_kmh:1960, range_km:2200,
    armament:"Internal AIM-120 and JDAM; external pylons at the cost of signature",
    note:"The carrier variant has the largest wing in the family for a slower approach, " +
         "and folding wingtips. Its sensor fusion makes it as much a scout as a shooter.",
    confidence:"high" },
  cfighter_c: { name:"Shenyang J-15 Flying Shark", origin:"China", service:"2013",
    crew:1, weight_t:33, speed_kmh:2100, range_km:3500,
    armament:"PL-8, PL-12/15, YJ-83K anti-ship missiles",
    note:"A heavy Flanker derivative developed from an unfinished Su-33 airframe obtained " +
         "from Ukraine. Ski-jump launch from the first two carriers limits fuel or weapons.",
    confidence:"medium" },
  cfighter_p: { name:"Sukhoi Su-33 Flanker-D", origin:"Russia", service:"1998",
    crew:1, weight_t:33, speed_kmh:2300, range_km:3000,
    armament:"R-27, R-73, unguided bombs and rockets",
    note:"Navalised Flanker with canards and folding wings. Never received a modern " +
         "air-to-ground or radar-guided missile capability, and very few remain.",
    confidence:"medium" },
  cstealth_c: { name:"Shenyang J-35", origin:"China", service:"c. 2024",
    crew:1, weight_t:28, speed_kmh:2200, range_km:2000,
    armament:"Internal PL-15 and PL-10 (reported)",
    note:"China's carrier-borne stealth fighter, publicly displayed and reported to be " +
         "entering service. Almost every performance figure in open sources is an estimate.",
    confidence:"low" },
  asw_helo_n: { name:"Sikorsky MH-60R Seahawk", origin:"United States", service:"2006",
    crew:"3-4", weight_t:10.7, speed_kmh:270, range_km:830,
    armament:"Mk 54 torpedoes, AGM-114 Hellfire, sonobuoys, AN/AQS-22 dipping sonar",
    note:"The reason a modern surface group is dangerous to submarines. A dipping sonar " +
         "can be lowered below the thermocline where a hull-mounted set cannot hear.",
    confidence:"high" },
  asw_helo_p: { name:"Kamov Ka-27PL Helix", origin:"Soviet Union", service:"1981",
    crew:3, weight_t:12, speed_kmh:270, range_km:800,
    armament:"Torpedoes, depth charges, sonobuoys, dipping sonar",
    note:"Coaxial rotors mean no tail rotor and a very compact footprint on deck. " +
         "The airframe is sound; its sensors are of their era.", confidence:"high" },
  asw_helo_c: { name:"Harbin Z-9C / Z-20F", origin:"China", service:"1994 / 2010s",
    crew:"3-4", weight_t:4.1, speed_kmh:280, range_km:1000,
    armament:"Yu-7 lightweight torpedoes, dipping sonar, surface search radar",
    note:"The Z-9C is a licence-built Dauphin and small for the role; the larger Z-20F is " +
         "steadily replacing it aboard newer ships.", confidence:"medium" },
  sub_n: { name:"Los Angeles-class SSN (688i)", origin:"United States", service:"1976",
    crew:129, weight_t:6900, speed_kmh:"~46 submerged", range_km:"unlimited",
    armament:"Mk 48 ADCAP torpedoes, Tomahawk, Harpoon; 12 VLS tubes on later hulls",
    note:"The improved 688i hulls added a quieting programme and under-ice capability. " +
         "Nuclear power buys endurance and sustained speed, not silence at speed.",
    confidence:"high" },
  ssbn_n: { name:"Ohio-class SSBN", origin:"United States", service:"1981",
    crew:155, weight_t:18750, speed_kmh:"~37 submerged", range_km:"unlimited",
    armament:"24 Trident II D5 ballistic missile tubes, Mk 48 torpedoes",
    note:"Widely assessed as among the quietest submarines ever built. Its mission is to " +
         "not be found; it avoids surface action entirely.", confidence:"high" },
  ssgn_n: { name:"Ohio-class SSGN (converted)", origin:"United States", service:"2007",
    crew:159, weight_t:18750, speed_kmh:"~37 submerged", range_km:"unlimited",
    armament:"Up to 154 Tomahawk in converted tubes, Mk 48 torpedoes, special forces lockout",
    note:"Four Ohio hulls had 22 of their missile tubes converted to seven-round Tomahawk " +
         "canisters. A single boat carries more cruise missiles than a surface group.",
    confidence:"high" },
  ssbn_p: { name:"Project 955A Borei-A", origin:"Russia", service:"2013",
    crew:107, weight_t:24000, speed_kmh:"~54 submerged", range_km:"unlimited",
    armament:"16 Bulava ballistic missile tubes, 533mm torpedo tubes",
    note:"A pump-jet propulsor and considerable quieting effort make this the best-funded " +
         "part of the Russian fleet - it carries the sea leg of the deterrent.",
    confidence:"medium" },
  ssbn_c: { name:"Type 094A Jin-class", origin:"China", service:"2007",
    crew:"~120", weight_t:11000, speed_kmh:"~37 submerged", range_km:"unlimited",
    armament:"12 JL-2 / JL-3 ballistic missile tubes, torpedo tubes",
    note:"China's sea-based deterrent. US Navy assessments have repeatedly described it as " +
         "acoustically noisier than Soviet boats of the 1970s, though the newer hulls are " +
         "believed improved.", confidence:"medium" },
  ssgn_p: { name:"Project 949A Oscar II", origin:"Soviet Union / Russia", service:"1986",
    crew:107, weight_t:24000, speed_kmh:"~59 submerged", range_km:"unlimited",
    armament:"24 P-700 Granit anti-ship missiles, 533mm and 650mm torpedo tubes",
    note:"Built for one purpose: killing a carrier battle group. The double hull gives it " +
         "an enormous 18-metre beam and considerable damage resistance.", confidence:"high" },
  sub_p: { name:"Project 636.3 Improved Kilo", origin:"Russia", service:"1980 / 2010",
    crew:52, weight_t:3950, speed_kmh:"~37 submerged", range_km:"7500 surfaced",
    armament:"533mm torpedoes, mines, Kalibr cruise missiles on later boats",
    note:"NATO nicknamed the class the Black Hole. On batteries at low speed it is " +
         "exceptionally quiet; it is also slow and must eventually snorkel.",
    confidence:"high" },
  sub_c: { name:"Type 039A/B Yuan-class", origin:"China", service:"2006",
    crew:"~65", weight_t:3600, speed_kmh:"~37 submerged", range_km:"~14000 surfaced",
    armament:"533mm torpedoes, YJ-8 anti-ship missiles, mines",
    note:"Air-independent propulsion allows weeks submerged without snorkelling, combining " +
         "diesel quietness with something approaching nuclear patience.", confidence:"medium" },
  sub_r: { name:"Hai Lung-class (Zwaardvis)", origin:"Netherlands", service:"1987",
    crew:67, weight_t:2660, speed_kmh:"~37 submerged", range_km:"10000 surfaced",
    armament:"SUT torpedoes, Harpoon",
    note:"Two boats, both from the 1980s, and no country has been willing to sell Taiwan " +
         "replacements - which is why it is now building its own.", confidence:"high" },
  sub_k: { name:"Type 033 / Project 613 Romeo", origin:"Soviet Union, built in China and DPRK",
    service:"1957", crew:54, weight_t:1830, speed_kmh:"~24 submerged", range_km:"~26000 surfaced",
    armament:"533mm torpedoes, mines",
    note:"A 1950s design still in front-line North Korean service. Extremely loud by any " +
         "modern standard and trackable long before its torpedoes are in range. Its only " +
         "argument is that there are many of them.", confidence:"high" },
  fighter_k: { name:"MiG-21bis / Chengdu J-7", origin:"Soviet Union / China", service:"1959",
    crew:1, weight_t:8.7, speed_kmh:2175, range_km:"~1200 ferry",
    armament:"GSh-23 cannon, R-3 / R-60 short-range missiles",
    note:"The most-produced supersonic aircraft in history, and still the backbone of the " +
         "North Korean air force. Its ranging radar cannot support a modern radar-guided " +
         "missile engagement at all.", confidence:"high" },
  cruiser_c: { name:"Type 055 Renhai-class", origin:"China", service:"2020",
    crew:"~300", weight_t:13000, speed_kmh:56, range_km:"~9200",
    armament:"112 VLS cells, H/PJ-38 130mm gun, HHQ-9B, YJ-18, H/PJ-11 CIWS, 2 helicopters",
    note:"The largest surface combatant built outside the United States since the Cold War, " +
         "and by cell count the most heavily armed destroyer afloat.", confidence:"high" },
  cruiser_p: { name:"Project 1164 Slava-class", origin:"Soviet Union", service:"1982",
    crew:485, weight_t:12500, speed_kmh:59, range_km:"~11000",
    armament:"16 fixed P-1000 launchers, S-300F SAM, AK-130 twin 130mm, AK-630 CIWS",
    note:"The anti-ship missiles sit in sixteen fixed deck tubes that cannot be reloaded " +
         "at sea. One alpha strike and the ship is a gun platform.", confidence:"high" },
};

/* one-line summary for tooltips */
function factLine(id) {
  const f = FACTS[id];
  if (!f) return null;
  const bits = [];
  if (f.origin) bits.push(f.origin);
  if (f.service) bits.push("in service " + f.service);
  if (f.crew) bits.push("crew " + f.crew);
  if (f.weight_t) bits.push(f.weight_t + " t");
  if (f.speed_kmh) bits.push(f.speed_kmh + " km/h");
  if (f.range_km) bits.push(f.range_km + " km range");
  return bits.join(" \u00b7 ");
}
