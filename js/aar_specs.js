/* ================= aar_specs.js - WHO CAN TAKE FUEL FROM WHOM =================
   Air-to-air refuelling comes in two systems that do not mix:

     FLYING BOOM      the tanker's operator flies a rigid telescoping boom into
                      a RECEPTACLE on the receiver's spine. One receiver at a
                      time, high flow. The United States Air Force's system.
     PROBE AND DROGUE the tanker trails a hose with a basket (the drogue) from a
                      wing pod or a centreline hose-drum unit, and the receiver
                      flies its PROBE into the basket. One receiver per hose, so
                      a two-pod tanker refuels two at once. The US Navy and
                      Marine Corps, Britain, France, the Soviet Union, Russia
                      and China.

   A receptacle aircraft cannot use a drogue and a probe aircraft cannot use a
   bare boom. The one bridge is the BOOM DROGUE ADAPTER (BDA), a short hose and
   basket fitted to the end of a KC-135's boom on the ground before the sortie,
   which makes that boom a single probe-and-drogue station: `bda` below. The
   game abstracts the ground swap and lets a BDA boom serve either kind, one
   at a time.

   TANKERS, keyed by row id:
     aar   "boom" | "drogue" | "both" - the system(s) the airframe carries
     st    the stations it really has: "boom", "pod_l"/"pod_r" (wing pods),
           "ctr" (a centreline or rear-fuselage hose-drum unit) and, for the
           Tu-16Z only, "tip_r" (its wing-to-wing hose off the starboard tip)
     bda   the boom carries a boom drogue adapter (serves probes too)
     excl  stations that share the tail and cannot be used at once
     pod   how far out the wing pods hang, as a fraction of the aircraft's
           length (where the model's pod is not at the default 0.34)
   RECEIVERS, keyed by row id: "receptacle" | "probe" | "both" | "wingtip",
     or null for a jet that historically could NOT refuel in flight - those
     stop being `refuelable` here (rules.js, heavyair.js and generations.js
     stamp every fixed-wing jet; this file is applied after all three).

   THE RULE FOR A ROW: what the airframe of that row, in that era, was
   documented as carrying (en.wikipedia unless the note says otherwise). Where
   the note says "guess" the fact was not found and the nearest documented
   sibling was used. A refuelable row missing from RECV keeps `refuelable`
   with no `aarRecv`, which the engine treats as fitting any station - and
   tools/jsc/aar_check.js fails on it, so a new jet row has to be added here.
   ============================================================================ */
var AAR_SPECS = {
  TANKERS: {
    /* ---- United States ---- */
    nato_e50_tanker: { aar: "boom", st: ["boom"],
      src: "KC-97G: Boeing flying boom under the tail; no drogue on the G (en.wikipedia Boeing KC-97 Stratofreighter)" },
    nato_e60_tanker: { aar: "boom", st: ["boom"], bda: true,
      src: "KC-135A: flying boom; the BDA lets it refuel Navy/Marine probes (en.wikipedia Boeing KC-135 Stratotanker)" },
    nato_e80_tanker: { aar: "both", st: ["boom", "ctr"], excl: [["boom", "ctr"]],
      src: "KC-10A: boom plus a centreline hose-drum unit, both at the tail; the wing pods came later (en.wikipedia McDonnell Douglas KC-10 Extender)" },
    nato_e90_tanker: { aar: "boom", st: ["boom"], bda: true,
      src: "KC-135R: boom with BDA; MPRS wing pods went on a minority from the 2000s and are not given to this e90-e00 row" },
    tanker_n:        { aar: "both", st: ["boom", "ctr", "pod_l", "pod_r"], excl: [["boom", "ctr"]], pod: 0.30,
      src: "KC-46A: boom, centreline drogue system and two wing aerial refuelling pods (en.wikipedia Boeing KC-46 Pegasus)" },
    /* ---- France ---- */
    fra_e60_tanker:  { aar: "boom", st: ["boom"], bda: true,
      src: "C-135F: KC-135A airframe; French receivers are all probe-equipped, so the boom flew with the BDA (en.wikipedia Boeing C-135 Stratolifter, C-135F)" },
    fra_e80_tanker:  { aar: "boom", st: ["boom"], bda: true, src: "C-135FR: CFM56 re-engine of the C-135F, boom with BDA" },
    fra_e90_tanker:  { aar: "boom", st: ["boom"], bda: true, src: "C-135FR: boom with BDA (guess: wing pods not given to the 1990s row)" },
    fra_e00_tanker:  { aar: "both", st: ["boom", "pod_l", "pod_r"], bda: true, pod: 0.40,
      src: "C-135FR with Mk 32B wing pods fitted to part of the fleet (guess as to date and fit: en.wikipedia KC-135 variants lists the pods without a year)" },
    tanker_f:        { aar: "both", st: ["boom", "pod_l", "pod_r"],
      src: "A330 MRTT Phenix: Airbus aerial refuelling boom and two Cobham 905E wing pods (en.wikipedia Airbus A330 MRTT)" },
    /* ---- Germany ---- */
    deu_e00_tanker:  { aar: "drogue", st: ["pod_l", "pod_r"], pod: 0.33,
      src: "Luftwaffe A310 MRTT: two wing hose-and-drogue pods, no boom (en.wikipedia Airbus A310 MRTT)" },
    tanker_g:        { aar: "both", st: ["boom", "pod_l", "pod_r"],
      src: "MMF A330 MRTT: boom and two wing pods (en.wikipedia Multinational MRTT Fleet)" },
    /* ---- Britain ---- */
    gbr_e50_tanker:  { aar: "drogue", st: ["ctr"],
      src: "Valiant BK.1: a Flight Refuelling Mk 16 hose-drum unit in the bomb bay (en.wikipedia Vickers Valiant)" },
    gbr_e60_tanker:  { aar: "drogue", st: ["pod_l", "pod_r", "ctr"], pod: 0.36,
      src: "Victor K.1A/K.2: three-point, Mk 20B wing pods and a Mk 17 centreline unit (en.wikipedia Handley Page Victor)" },
    gbr_e90_tanker:  { aar: "drogue", st: ["pod_l", "pod_r", "ctr"], pod: 0.27,
      src: "VC10 K.2/K.3: two Mk 32 wing pods and a Mk 17B centreline HDU (en.wikipedia Vickers VC10)" },
    gbr_e00_tanker:  { aar: "drogue", st: ["ctr"],
      src: "TriStar K.1/KC.1: twin Mk 17T HDUs in the rear fuselage, one hose used at a time (en.wikipedia Lockheed TriStar (RAF))" },
    tanker_b:        { aar: "drogue", st: ["pod_l", "pod_r", "ctr"],
      src: "Voyager KC3: two wing pods and a fuselage refuelling unit, no boom (en.wikipedia Airbus Voyager)" },
    /* ---- Soviet Union and Russia ---- */
    pact_e50_tanker: { aar: "drogue", st: ["tip_r"],
      src: "Tu-16Z: wing-to-wing system, the hose off the tanker's starboard tip caught by the receiver's port tip (en.wikipedia Tupolev Tu-16, variants)" },
    pact_e60_tanker: { aar: "drogue", st: ["ctr"],
      src: "3MS-2: one hose-drum unit in the bomb bay for probe receivers (en.wikipedia Myasishchev M-4, 3MS-2)" },
    tanker_p:        { aar: "drogue", st: ["pod_l", "pod_r", "ctr"], pod: 0.37,
      src: "Il-78M: three UPAZ pods, two under the wings and one on the port rear fuselage (en.wikipedia Ilyushin Il-78)" },
    /* ---- China ---- */
    pla_e90_tanker:  { aar: "drogue", st: ["pod_l", "pod_r"], pod: 0.30,
      src: "H-6U: two wing hose-drum pods (en.wikipedia Xian H-6, H-6U)" },
    tanker_c:        { aar: "drogue", st: ["pod_l", "pod_r", "ctr"], pod: 0.41,
      src: "YY-20: two wing pods and a fuselage hose unit (en.wikipedia Xian Y-20, YY-20A)" },
  },

  RECV: {
    /* ======== present day (e20) ======== */
    awacs_b: "receptacle",          // E-7A: boom receptacle above the cockpit (en.wikipedia Boeing E-7 Wedgetail)
    awacs_c: null,                  // KJ-500: no probe; the probe is on the later KJ-500A (en.wikipedia Shaanxi KJ-500)
    awacs_f: "both",                // E-3F: probe and receptacle (en.wikipedia Boeing E-3 Sentry, France)
    awacs_n: "receptacle",          // E-3G
    awacs_p: "probe",               // A-50U: nose probe (en.wikipedia Beriev A-50)
    awacs_r: null,                  // E-2K: no AAR fit
    bomber_b: "probe",              // Typhoon
    bomber_c: "probe",              // JH-7A: probe (en.wikipedia Xian JH-7)
    bomber_f: "probe",              // Mirage 2000D
    bomber_g: "probe",              // Tornado IDS: bolt-on probe
    bomber_k: null,                 // Su-25K: none
    bomber_n: "receptacle",         // A-10C
    bomber_p: null,                 // Su-25SM3: none
    bomber_r: null,                 // F-CK-1C: none (en.wikipedia AIDC F-CK-1 Ching-kuo)
    cawacs_f: null,                 // E-2C: none
    cawacs_n: "probe",              // E-2D: aerial refuelling probe added to the production line (en.wikipedia Northrop Grumman E-2 Hawkeye, E-2D)
    cfighter_c: "probe",            // J-15: retractable probe (en.wikipedia Shenyang J-15)
    cfighter_f: "probe",            // Rafale M
    cfighter_n: "probe",            // F/A-18E
    cfighter_p: "probe",            // Su-33: retractable probe (en.wikipedia Sukhoi Su-33)
    cstealth_b: "probe",            // F-35B
    cstealth_c: "probe",            // J-35: guess, carrier type in the J-15's practice
    cstealth_n: "probe",            // F-35C
    ew_b: "receptacle",             // RC-135W
    ew_c: "probe",                  // J-16D: the J-16's probe
    ew_f: null,                     // Falcon 8X Archange: business-jet airframe, no AAR
    ew_n: "probe",                  // EA-18G
    fighter_b: "probe", fighter_c: "probe", fighter_f: "probe", fighter_g: "probe",
    fighter_k: null,                // MiG-21bis / J-7: none
    fighter_n: "receptacle",        // F-16C
    fighter_p: null,                // MiG-29S (9.13): no probe; the SMT has one
    fighter_r: "receptacle",        // F-16V
    hbomber_n: "receptacle",        // B-52H
    sbomber_c: "probe",             // H-6N: the H-6 with a probe (en.wikipedia Xian H-6, H-6N)
    sbomber_n: "receptacle",        // B-2A
    sbomber_p: "probe",             // Tu-160M
    sead_c: "probe",                // J-16
    sead_g: "probe",                // Tornado ECR
    sead_n: "receptacle",           // F-16CJ
    sead_p: "probe",                // Su-24M
    stealth_b: "probe",             // F-35B
    stealth_c: "probe",             // J-20A: retractable probe (en.wikipedia Chengdu J-20)
    stealth_n: "receptacle",        // F-22A
    stealth_p: "probe",             // Su-57
    stovl_n: "probe",               // F-35B (USMC)

    /* ======== Germany ======== */
    deu_e50_cas: "receptacle",      // F-84F: boom receptacle in the left wing root (en.wikipedia Republic F-84F Thunderstreak)
    deu_e50_fighter: null,          // Sabre Mk 6: none
    deu_e60_cas: null,              // G.91R/3: none
    deu_e60_fighter: "probe",       // F-104G: provision for a removable probe (guess: the Luftwaffe had no tankers to use it with)
    deu_e80_cas: null,              // Alpha Jet: none
    deu_e80_fighter: "receptacle",  // F-4F: guess, the F-4E's dorsal receptacle
    deu_e90_cas: "probe",           // Tornado IDS
    deu_e90_fighter: "receptacle",  // F-4F ICE: guess, as above
    deu_e90_mig29: null,            // MiG-29G (9.12): none

    /* ======== France ======== */
    fra_e00_awacs: "both", fra_e00_cas: "probe", fra_e00_cawacs: null,
    fra_e00_cfighter: "probe", fra_e00_fighter: "probe",
    fra_e50_cas: null,              // Ouragan: none
    fra_e50_cfighter: null,         // Aquilon: none
    fra_e50_fighter: null,          // Super Mystere B.2: none
    fra_e60_cas: "probe",           // Jaguar A: retractable probe (en.wikipedia SEPECAT Jaguar)
    fra_e60_cfighter: "probe",      // F-8E(FN): the Crusader's probe
    fra_e60_fighter: null,          // Mirage IIIE: no probe in French service
    fra_e60_heavybomber: "probe",   // Mirage IVA: nose probe, refuelled by the C-135F (en.wikipedia Dassault Mirage IV)
    fra_e60_sead: null,             // Mirage IIIE: none
    fra_e80_cas: "probe", fra_e80_cfighter: "probe",   // Jaguar A, Super Etendard
    fra_e80_fighter: "probe",       // Mirage 2000C: detachable probe
    fra_e80_heavybomber: "probe",   // Mirage IVP
    fra_e80_sead: "probe",          // Jaguar A
    fra_e90_awacs: "both", fra_e90_cas: "probe", fra_e90_cfighter: "probe",
    fra_e90_fighter: "probe", fra_e90_sead: "probe",

    /* ======== Britain ======== */
    gbr_e00_airlift: "receptacle",  // C-17A
    gbr_e00_awacs: "both",          // E-3D: probe and receptacle (en.wikipedia Boeing E-3 Sentry, UK)
    gbr_e00_cas: "probe", gbr_e00_cfighter: "probe", gbr_e00_fighter: "probe", gbr_e00_sead: "probe",
    gbr_e50_cas: null,              // Venom FB.4: none
    gbr_e50_cfighter: null,         // Sea Hawk: none
    gbr_e50_fighter: null,          // Hunter F.6: none
    gbr_e50_heavybomber: "probe",   // Valiant: nose probe fitted from 1958 (en.wikipedia Vickers Valiant)
    gbr_e60_cas: "probe",           // Harrier GR.1: bolt-on probe
    gbr_e60_cfighter: "probe",      // Phantom FG.1
    gbr_e60_ewair: null,            // Canberra T.17: none
    gbr_e60_fighter: "probe",       // Lightning F.6: underwing probe
    gbr_e60_heavybomber: "probe",   // Vulcan B.2
    gbr_e80_cas: "probe", gbr_e80_cfighter: "probe",
    gbr_e80_ewair: "probe",         // Nimrod R.1: probe added in 1982
    gbr_e80_fighter: "probe", gbr_e80_heavybomber: "probe",
    gbr_e90_awacs: "both", gbr_e90_cas: "probe", gbr_e90_cfighter: "probe",
    gbr_e90_fighter: "probe", gbr_e90_sead: "probe",

    /* ======== North Korea (no tankers, and none of these could take fuel) ======== */
    kpa_e00_cas: null, kpa_e00_fighter: null, kpa_e50_cas: null, kpa_e60_cas: null,
    kpa_e60_fighter: null, kpa_e80_cas: null, kpa_e80_fighter: null,   // MiG-23ML: no probe
    kpa_e90_cas: null, kpa_e90_fighter: null,

    /* ======== United States ======== */
    nato_e00_awacs: "receptacle", nato_e00_c5: "receptacle", nato_e00_cas: "receptacle",
    nato_e00_cawacs: null,          // E-2C Hawkeye 2000: none
    nato_e00_ewair: "probe",        // EA-18G
    nato_e00_fighter: "receptacle", // F-22A
    nato_e00_heavybomber: "receptacle",
    nato_e00_sead: "receptacle",
    nato_e00_stealthfighter: "receptacle",   // F-35A stands for the row (the B and C carry probes)
    nato_e50_cas: null,             // AD-4 Skyraider: none
    nato_e50_cawacs: null,          // WF-2 Tracer: none
    nato_e50_cfighter: "probe",     // F9F-8 Cougar: nose probe (en.wikipedia Grumman F-9 Cougar)
    nato_e50_ewair: null,           // AD-5Q: none
    nato_e50_fighter: null,         // F-86F: none
    nato_e50_heavybomber: "receptacle",      // B-52D
    nato_e60_awacs: null,           // E-2A: none
    nato_e60_c141: null,            // C-141A: the receptacle came with the C-141B (en.wikipedia Lockheed C-141 Starlifter)
    nato_e60_c5: "receptacle",      // C-5A
    nato_e60_cas: "receptacle",     // A-7D: the USAF Corsair had a boom receptacle (en.wikipedia LTV A-7 Corsair II)
    nato_e60_cawacs: null,          // E-2B: none
    nato_e60_cfighter: "probe",     // F-4B
    nato_e60_cstrike: "probe",      // A-6A
    nato_e60_ewair: "probe",        // EA-6B
    nato_e60_fighter: "receptacle", // F-4C
    nato_e60_heavybomber: "receptacle",
    nato_e60_sead: "both",          // F-105G: boom receptacle and a retractable probe (en.wikipedia Republic F-105 Thunderchief)
    nato_e80_awacs: "receptacle", nato_e80_c141: "receptacle", nato_e80_c5: "receptacle",
    nato_e80_cas: "receptacle",     // A-10A
    nato_e80_cawacs: null,
    nato_e80_cfighter: "probe",     // F-14A
    nato_e80_cstrike: "probe",      // A-6E
    nato_e80_ewair: "receptacle",   // EF-111A
    nato_e80_fighter: "receptacle", // F-15C
    nato_e80_heavybomber: "receptacle",
    nato_e80_sead: "receptacle",    // F-4G
    nato_e80_stealthfighter: "receptacle",   // F-117A
    nato_e80_stovl: "probe",        // AV-8B
    nato_e90_awacs: "receptacle",   // E-8C
    nato_e90_c17: "receptacle", nato_e90_cas: "receptacle",
    nato_e90_cawacs: null,
    nato_e90_cfighter: "probe", nato_e90_cstrike: "probe", nato_e90_ewair: "probe",
    nato_e90_fighter: "receptacle", nato_e90_heavybomber: "receptacle", nato_e90_sead: "receptacle",
    nato_e90_stealthbomber: "receptacle", nato_e90_stealthfighter: "receptacle",
    nato_e90_stovl: "probe",

    /* ======== Soviet Union and Russia ======== */
    pact_e00_awacs: "probe",
    pact_e00_cas: null,             // Su-25SM: none
    pact_e00_fighter: "probe",      // Su-35S
    pact_e00_sead: "probe",         // Su-24M
    pact_e50_cas: null, pact_e50_fighter: null,   // Il-10M, MiG-17F
    pact_e60_awacs: "probe",        // Tu-126: nose probe (en.wikipedia Tupolev Tu-126)
    pact_e60_cas: null,             // Su-17M: none
    pact_e60_cfighter: null,        // Yak-38: none
    pact_e60_fighter: null,         // MiG-21F-13 / MiG-21bis: none
    pact_e60_heavybomber: "wingtip",  // Tu-16A: guess, the Tu-16 force's wing-to-wing receiver fit
    pact_e60_sead: null,            // Su-17M: none
    pact_e80_awacs: "probe",        // A-50
    pact_e80_cas: null, pact_e80_cfighter: null,
    pact_e80_fighter: null,         // MiG-29 (9.12): none
    pact_e80_heavybomber: null,     // Tu-22M3: the probe was removed under SALT II (en.wikipedia Tupolev Tu-22M)
    pact_e80_sead: null,            // MiG-25BM: none
    pact_e80_stealthbomber: "probe",  // Tu-160: retractable probe
    pact_e90_awacs: "probe", pact_e90_cas: null,
    pact_e90_fighter: null,         // MiG-29S: none
    pact_e90_sead: "probe",         // Su-24M

    /* ======== China ======== */
    pla_e00_awacs: null,            // KJ-2000: none
    pla_e00_cas: "probe",           // JH-7A
    pla_e00_fighter: "probe",       // J-10: refuelled from the H-6U (en.wikipedia Chengdu J-10)
    pla_e00_heavybomber: null,      // H-6K: no probe; the H-6N has one
    pla_e00_sead: "probe",          // JH-7A
    pla_e00_stealthfighter: "probe",  // J-20
    pla_e50_cas: null, pla_e50_fighter: null,     // Il-10, J-5
    pla_e60_cas: null, pla_e60_fighter: null,     // Q-5, J-6
    pla_e60_heavybomber: null,      // H-6A: none
    pla_e80_cas: null,              // Q-5C: none
    pla_e80_fighter: null,          // J-8II: the probe came with the J-8D (en.wikipedia Shenyang J-8)
    pla_e80_heavybomber: null,      // H-6D: none
    pla_e90_cas: null,              // JH-7: the probe came with the JH-7A
    pla_e90_fighter: null,          // Su-27SK: no probe (en.wikipedia Sukhoi Su-27, export variants)

    /* ======== Republic of China (no tankers; the airframe fit is recorded) ======== */
    roc_e00_awacs: null, roc_e00_cas: null,
    roc_e00_fighter: "receptacle",  // F-16A/B: boom receptacle
    roc_e50_cas: "receptacle",      // F-84G: the first fighter with a boom receptacle (en.wikipedia Republic F-84 Thunderjet)
    roc_e50_fighter: null,          // F-86F: none
    roc_e60_cas: null,              // F-100A: the probe came with the F-100C (en.wikipedia North American F-100 Super Sabre)
    roc_e60_fighter: "probe",       // F-104G: as deu_e60_fighter (guess)
    roc_e80_cas: null,              // AT-3: none
    roc_e80_fighter: "probe",       // F-5E: optional probe (en.wikipedia Northrop F-5)
    roc_e90_awacs: null, roc_e90_cas: null,
    roc_e90_fighter: "receptacle",  // F-16A/B Block 20
  },
};

/* Applied once, after rules.js, eras.js, heavyair.js and generations.js have
   built every roster and stamped `refuelable`. */
(function applyAarSpecs() {
  if (typeof UNITS === "undefined") return;
  var T = AAR_SPECS.TANKERS, R = AAR_SPECS.RECV, id;
  for (id in T) {
    var u = UNITS[id], s = T[id];
    if (!u) continue;
    u.aar = s.aar; u.aarSt = s.st.slice();
    if (s.bda) u.aarBda = true;
    if (s.excl) u.aarExcl = s.excl;
    if (s.pod) u.aarPod = s.pod;
  }
  for (id in UNITS) {
    var d = UNITS[id];
    if (!d || !d.refuelable || !Object.prototype.hasOwnProperty.call(R, id)) continue;
    if (R[id]) d.aarRecv = R[id];
    else d.refuelable = false;    // no probe, no receptacle
  }
})();
