/* ============ rules.js — weapons, structures, units ============
   Every combat value lives here so balance is one file, not scattered.
   range/minRange/aoe are in TILES. reload/burstDelay in SECONDS.
   proj types: bullet(hitscan tracer) shell(fast ballistic) rocket(slow, unguided)
               missile(guided, interceptable) arc(indirect, lobbed) bomb(released from air)
               torpedo(underwater) depth(depth charge)                                     */

var WEAPONS = {
  /* ---------- small arms ---------- */
  rifle:      { name:"5.56mm rifle", dmg:11, warhead:"bullet", range:5.0, reload:1.10, burst:3, burstDelay:0.07,
                acc:0.72, proj:"bullet", speed:0, suppress:5, tgt:{ground:1,air:0,sea:1,sub:0} },
  lmg:        { name:"7.62mm GPMG", dmg:9, warhead:"bullet", range:5.6, reload:1.9, burst:8, burstDelay:0.055,
                acc:0.60, proj:"bullet", speed:0, suppress:11, tgt:{ground:1,air:0,sea:1,sub:0} },
  sniper:     { name:"12.7mm anti-materiel", dmg:95, warhead:"bullet", range:9.5, reload:3.6, burst:1,
                acc:0.94, proj:"bullet", speed:0, suppress:22, tgt:{ground:1,air:0,sea:1,sub:0} },
  atgm_inf:   { name:"Javelin ATGM", dmg:130, warhead:"heat", range:7.2, minRange:1.2, reload:5.2, burst:1,
                acc:0.86, proj:"missile", speed:340, aoe:0.7, suppress:14, tgt:{ground:1,air:0,sea:1,sub:0} },
  manpad:     { name:"Stinger MANPADS", dmg:110, warhead:"flak", range:7.8, reload:4.6, burst:1,
                acc:0.80, proj:"missile", speed:520, aoe:0.6, tgt:{ground:0,air:1,sea:0,sub:0} },
  mortar:     { name:"81mm mortar", dmg:60, warhead:"frag", range:9.0, minRange:2.6, reload:5.0, burst:1,
                acc:0.42, proj:"arc", speed:180, aoe:1.5, suppress:34, tgt:{ground:1,air:0,sea:1,sub:0} },

  /* ---------- vehicle guns ---------- */
  hmg:        { name:"12.7mm HMG", dmg:13, warhead:"bullet", range:5.4, reload:1.6, burst:6, burstDelay:0.07,
                acc:0.66, proj:"bullet", speed:0, suppress:9, tgt:{ground:1,air:0,sea:1,sub:0} },
  autocannon: { name:"25mm autocannon", dmg:22, warhead:"bullet", range:6.4, reload:2.2, burst:5, burstDelay:0.10,
                acc:0.70, proj:"shell", speed:620, suppress:12, tgt:{ground:1,air:0,sea:1,sub:0} },
  gun_light:  { name:"76mm rifled gun", dmg:60, warhead:"cannon", range:6.6, reload:3.1, burst:1,
                acc:0.78, proj:"shell", speed:700, aoe:0.5, suppress:14, tgt:{ground:1,air:0,sea:1,sub:0} },
  gun_105:    { name:"105mm rifled gun", dmg:105, warhead:"cannon", range:7.4, reload:4.0, burst:1,
                acc:0.80, proj:"shell", speed:780, aoe:0.7, suppress:18, tgt:{ground:1,air:0,sea:1,sub:0} },
  /* The M256 120mm smoothbore, standard on every M1A1 and M1A2. Slightly
     lower raw figure than the 125mm, but paired with a DU long rod and a
     far better fire control - the ammoQ and fireCtrl doctrine terms are
     where the Western advantage actually lives. */
  gun_120:    { name:"M256 120mm smoothbore", dmg:158, warhead:"cannon", range:8.0, reload:4.3, burst:1,
                acc:0.83, proj:"shell", speed:860, aoe:0.9, suppress:24,
                tgt:{ground:1,air:0,sea:1,sub:0} },
  gun_125:    { name:"125mm smoothbore", dmg:165, warhead:"cannon", range:8.2, reload:5.0, burst:1,
                acc:0.82, proj:"shell", speed:860, aoe:0.9, suppress:24, tgt:{ground:1,air:0,sea:1,sub:0} },
  howitzer:   { name:"155mm howitzer", dmg:150, warhead:"frag", range:15.5, minRange:4.0, reload:8.5, burst:1,
                acc:0.34, proj:"arc", speed:210, aoe:2.6, suppress:60, tgt:{ground:1,air:0,sea:1,sub:0} },
  mlrs:       { name:"227mm rocket pod", dmg:70, warhead:"frag", range:14.0, minRange:3.5, reload:14.0, burst:12, burstDelay:0.16,
                acc:0.22, proj:"arc", speed:260, aoe:2.0, suppress:40, tgt:{ground:1,air:0,sea:1,sub:0} },
  spaag:      { name:"35mm twin AA", dmg:26, warhead:"flak", range:7.0, reload:1.7, burst:6, burstDelay:0.07,
                acc:0.62, proj:"shell", speed:900, aoe:0.5, tgt:{ground:1,air:1,sea:0,sub:0} },
  atgm_veh:   { name:"TOW-2 launcher", dmg:150, warhead:"heat", range:8.4, minRange:1.5, reload:6.0, burst:1,
                acc:0.88, proj:"missile", speed:330, aoe:0.8, tgt:{ground:1,air:0,sea:1,sub:0} },
  sam_veh:    { name:"SAM launcher", dmg:150, warhead:"flak", range:11.0, reload:5.5, burst:2, burstDelay:0.5,
                acc:0.84, proj:"missile", speed:600, aoe:0.9, tgt:{ground:0,air:1,sea:0,sub:0} },
  /* ---- mobile area air defence ----
     The SAM Site above is the FIXED tier: emplaced, wired to the grid, and it
     stays where it was built. The roster has never had the tier below it - the
     launcher that shoots and then moves before the reply arrives, which is the
     whole reason the S-300 family rewrote Western air planning. Three
     generations, because the capability genuinely arrived in three steps.
     Every round here is kept INSIDE the static site's 14.0 on purpose: the
     emplacement is still the better and cheaper shooter, and what the vehicle
     buys is that it follows the army and does not go cold in a brownout.
     `abm` is the single-round kill probability against a BALLISTIC body, read
     by combat.js layer 1. Only a system built for that shot carries the field. */
  sam_area1:  { name:"first-generation area SAM", dmg:175, warhead:"flak", range:10.6, reload:9.5, burst:1,
                acc:0.70, proj:"missile", speed:560, aoe:1.0, tgt:{ground:0,air:1,sea:0,sub:0} },
  sam_area2:  { name:"long-range area SAM", dmg:215, warhead:"flak", range:12.5, reload:7.5, burst:2, burstDelay:0.7,
                acc:0.86, proj:"missile", speed:640, aoe:1.1, abm:0.30, tgt:{ground:0,air:1,sea:0,sub:0} },
  sam_area3:  { name:"hit-to-kill area SAM", dmg:240, warhead:"flak", range:13.6, reload:6.5, burst:2, burstDelay:0.6,
                acc:0.90, proj:"missile", speed:700, aoe:1.2, abm:0.75, tgt:{ground:0,air:1,sea:0,sub:0} },
  /* Taiwan's is the odd one: a real hit-to-kill interceptor with a fraction of
     the reach, because it is built to survive an opening barrage rather than
     to cover a theatre. The short range is the design, not a shortfall. */
  sam_tk3:    { name:"Tien Kung III", dmg:210, warhead:"flak", range:11.8, reload:7.0, burst:2, burstDelay:0.6,
                acc:0.90, proj:"missile", speed:690, aoe:1.1, abm:0.62, tgt:{ground:0,air:1,sea:0,sub:0} },
  /* Paraded 2010, tested 2011-2017, assessed operational around 2017. It is
     laid out like an S-300 and is stated here as one whose radar, numbers and
     reliability nobody outside the country has ever verified - so it engages,
     and it misses. That is the honest way to stat an unverified system. */
  sam_pongae: { name:"Pongae-5", dmg:200, warhead:"flak", range:12.6, reload:9.0, burst:2, burstDelay:0.8,
                acc:0.74, proj:"missile", speed:600, aoe:1.1, abm:0.30, tgt:{ground:0,air:1,sea:0,sub:0} },

  /* ---------- naval ---------- */
  navgun_57:  { name:"57mm naval gun", dmg:38, warhead:"he", range:7.2, reload:1.5, burst:3, burstDelay:0.22,
                acc:0.72, proj:"shell", speed:700, aoe:0.7, tgt:{ground:1,air:0,sea:1,sub:0} },
  navgun_127: { name:"127mm naval gun", dmg:120, warhead:"he", range:11.0, reload:4.2, burst:2, burstDelay:0.5,
                acc:0.66, proj:"shell", speed:720, aoe:1.5, suppress:30, tgt:{ground:1,air:0,sea:1,sub:0} },
  navgun_203: { name:"203mm main battery", dmg:230, warhead:"he", range:17.0, minRange:3.0, reload:11.0, burst:3, burstDelay:0.45,
                acc:0.40, proj:"arc", speed:250, aoe:3.0, suppress:70, tgt:{ground:1,air:0,sea:1,sub:0} },
  ssm:        { name:"Harpoon SSM", dmg:260, warhead:"he", range:13.5, minRange:2.0, reload:13.0, burst:2, burstDelay:0.9,
                acc:0.90, proj:"missile", speed:420, aoe:1.6, tgt:{ground:1,air:0,sea:1,sub:0} },
  sam_ship:   { name:"Standard SAM", dmg:170, warhead:"flak", range:12.0, reload:4.0, burst:2, burstDelay:0.4,
                acc:0.86, proj:"missile", speed:640, aoe:1.0, tgt:{ground:0,air:1,sea:0,sub:0} },
  torpedo:    { name:"heavyweight torpedo", dmg:340, warhead:"he", range:9.0, minRange:1.0, reload:12.0, burst:2, burstDelay:1.2,
                acc:0.88, proj:"torpedo", speed:150, aoe:1.4, tgt:{ground:0,air:0,sea:1,sub:1} },
  depthchg:   { name:"ASW depth charge", dmg:190, warhead:"he", range:4.2, reload:6.5, burst:3, burstDelay:0.5,
                acc:0.60, proj:"depth", speed:120, aoe:1.8, tgt:{ground:0,air:0,sea:0,sub:1} },
  ciws:       { name:"20mm CIWS", dmg:0, warhead:"flak", range:4.6, reload:0.55, acc:1, proj:"none",
                intercept:true, tgt:{ground:0,air:0,sea:0,sub:0} },

  /* ---------- aircraft ---------- */
  hellfire:   { name:"AGM-114 Hellfire", dmg:145, warhead:"heat", range:6.6, reload:2.4, burst:1,
                acc:0.90, proj:"missile", speed:400, aoe:1.0, ammo:1, tgt:{ground:1,air:0,sea:1,sub:0} },
  chaingun:   { name:"30mm chain gun", dmg:20, warhead:"bullet", range:4.6, reload:1.4, burst:6, burstDelay:0.06,
                acc:0.68, proj:"shell", speed:640, suppress:16, ammo:0.34, tgt:{ground:1,air:0,sea:1,sub:0} },
  aam:        { name:"AIM-120 AMRAAM", dmg:200, warhead:"flak", range:9.5, reload:3.0, burst:1,
                acc:0.88, proj:"missile", speed:700, aoe:0.8, ammo:1, tgt:{ground:0,air:1,sea:0,sub:0} },
  jdam:       { name:"500lb guided bomb", dmg:330, warhead:"he", range:2.6, reload:1.0, burst:2, burstDelay:0.35,
                acc:0.92, proj:"bomb", speed:0, aoe:2.4, suppress:80, ammo:2, tgt:{ground:1,air:0,sea:1,sub:0} },
  airtorp:    { name:"ASW torpedo", dmg:260, warhead:"he", range:4.0, reload:5.0, burst:1,
                acc:0.85, proj:"torpedo", speed:160, aoe:1.2, ammo:1, tgt:{ground:0,air:0,sea:1,sub:1} },

  /* ---------- static defences ---------- */
  nest_mg:    { name:"emplaced 7.62mm", dmg:10, warhead:"bullet", range:6.0, reload:1.7, burst:9, burstDelay:0.05,
                acc:0.68, proj:"bullet", speed:0, suppress:13, tgt:{ground:1,air:0,sea:1,sub:0} },
  at_gun:     { name:"100mm AT gun", dmg:140, warhead:"cannon", range:8.6, reload:4.6, burst:1,
                acc:0.85, proj:"shell", speed:840, aoe:0.6, tgt:{ground:1,air:0,sea:1,sub:0} },
  aa_battery: { name:"twin 40mm AA", dmg:34, warhead:"flak", range:9.0, reload:1.5, burst:5, burstDelay:0.08,
                acc:0.70, proj:"shell", speed:920, aoe:0.6, tgt:{ground:0,air:1,sea:0,sub:0} },
  sam_site:   { name:"Patriot SAM site", dmg:230, warhead:"flak", range:14.0, reload:5.0, burst:2, burstDelay:0.6,
                acc:0.90, proj:"missile", speed:680, aoe:1.2, tgt:{ground:0,air:1,sea:0,sub:0} },
  coast_gun:  { name:"152mm coastal gun", dmg:210, warhead:"he", range:13.5, minRange:2.0, reload:7.5, burst:2, burstDelay:0.6,
                acc:0.62, proj:"shell", speed:640, aoe:2.0, tgt:{ground:1,air:0,sea:1,sub:0} },
  bunker_how: { name:"emplaced 155mm", dmg:145, warhead:"frag", range:16.0, minRange:4.5, reload:9.0, burst:1,
                acc:0.36, proj:"arc", speed:210, aoe:2.6, suppress:60, tgt:{ground:1,air:0,sea:1,sub:0} },
};

/* ---------------------------------------------------------------- STRUCTURES */
var BUILDINGS = {
  conyard: { name:"Construction Yard", cat:"building", cost:0, time:0, w:3, h:3, hp:2400, armor:"structure",
    power:0, sight:8, tech:1, base:true, undeployable:true,
    desc:"Mobile HQ, deployed. Anchors your build radius and produces all structures." },

  power: { name:"Power Plant", cat:"building", cost:400, time:9, w:2, h:2, hp:850, armor:"structure",
    power:+120, sight:4, tech:1, prereq:["conyard"],
    desc:"Diesel generator hall. Supplies 120 MW. Brownouts cripple production and shut down radar and SAM sites." },

  refinery: { name:"Ore Refinery", cat:"building", cost:1500, time:20, w:3, h:2, hp:1300, armor:"structure",
    power:-40, sight:6, tech:1, prereq:["conyard"], freeUnit:"harvester", storage:2500,
    desc:"Processes raw ore into credits and ships with one Harvester. Also stores 2,500 credits." },

  barracks: { name:"Barracks", cat:"building", cost:500, time:11, w:2, h:2, hp:900, armor:"structure",
    power:-25, sight:5, tech:1, prereq:["conyard"], produces:"infantry",
    desc:"Trains infantry. Additional barracks speed up the queue." },

  factory: { name:"War Factory", cat:"building", cost:2000, time:26, w:3, h:3, hp:1500, armor:"structure",
    power:-60, sight:5, tech:1, prereq:["conyard","power"], produces:"vehicle",
    desc:"Assembles armoured vehicles. Requires a functioning power grid." },

  navalyard: { name:"Naval Yard", cat:"building", cost:1800, time:24, w:3, h:3, hp:1400, armor:"structure",
    power:-50, sight:6, tech:1, prereq:["conyard"], produces:"naval", shore:true,
    /* A yard that can build a destroyer can obviously mend one. Without this
       a damaged ship had nowhere in the world to go: the service depot is a
       land building two tiles wide and no hull can reach it. */
    repair:true, repairSea:true,
    desc:"Slipway for warships. Builds and repairs: bring a damaged hull alongside and it is put right. MUST be laid down on a shoreline with open water to seaward." },

  airbase: { name:"Airbase", cat:"building", cost:1700, time:22, w:3, h:3, hp:1200, armor:"structure",
    power:-55, sight:7, tech:2, prereq:["conyard","radar"], produces:"aircraft", pads:4,
    desc:"Hardened strip with four revetments. Aircraft must return here to rearm and refuel." },

  /* An unpowered hydrophone array does not hear. */
  sonararray: { name:"Coastal Sonar Array", cat:"defense", cost:800, time:14, w:2, h:2, hp:700, needPower:true,
    armor:"structure", power:-30, sight:5, tech:2, prereq:["conyard","navalyard"], sonar:11,
    shore:true,
    desc:"A seabed hydrophone array cabled ashore. It cannot shoot at anything, but it " +
         "hears submarines across the approaches to your coast - and a boat you can see " +
         "is a boat your escorts can kill." },

  /* needPower, like the SAM and the jamming stations. It draws 50 and its
     whole output is a radar picture; a dome on a dead grid is a dish. */
  radar: { name:"Radar Dome", cat:"building", cost:1000, time:15, w:2, h:2, hp:900, armor:"structure", needPower:true,
    power:-50, sight:11, tech:1, prereq:["conyard","power"], radar:true,
    desc:"Air-search and battlefield surveillance radar. Enables the minimap, reveals submarines and unlocks Tech II." },

  lab: { name:"Research Lab", cat:"building", cost:1800, time:24, w:2, h:2, hp:1000, armor:"structure",
    power:-70, sight:5, tech:1, prereq:["radar"], lab:true,
    desc:"Procurement and R&D. Unlocks the Tech II and Tech III equipment programmes and combat upgrades." },

  depot: { name:"Service Depot", cat:"building", cost:900, time:14, w:3, h:2, hp:1000, armor:"structure",
    power:-25, sight:5, tech:1, prereq:["factory"], repair:true,
    desc:"Field workshop. Repairs any vehicle that drives onto the pad, for a modest cost in credits." },

  derrick: { name:"Oil Derrick", cat:"building", cost:700, time:12, w:2, h:2, hp:700, armor:"structure",
    power:-10, sight:4, tech:1, prereq:["conyard"], oilNode:true, oilRate:0.55,
    desc:"Pumps crude from a surveyed oil node. Fuel feeds every vehicle, ship and aircraft you build." },

  silo: { name:"Storage Silo", cat:"building", cost:350, time:7, w:2, h:2, hp:600, armor:"structure",
    power:-10, sight:3, tech:1, prereq:["refinery"], storage:3000,
    desc:"Holds a further 3,000 credits. Overflowing ore is money burned." },

  /* ---------------- defences ---------------- */
  wall: { name:"Concrete Barrier", cat:"defense", cost:40, time:0.5, w:1, h:1, hp:500, armor:"wall",
    power:0, sight:1, tech:1, prereq:["conyard"], line:true,
    desc:"Cheap hard cover. Stops vehicles, funnels infantry, absorbs shells that would hit something expensive." },

/* ---------------- field obstacles ----------------
   Emplaced by a Combat Engineer where the fighting is, not built from the
   base. Each one does something mechanically different, so which you lay is
   a real decision rather than a cosmetic one:

     blocks      "vehicle"  tracks and wheels cannot pass, infantry can
                 "all"      nothing on the ground gets through
     crossSpeed  what fraction of its speed a unit that CAN cross keeps
     cover       protection given to infantry standing on the tile
     crushable   a vehicle drives over it, destroying it and slowing itself
   ------------------------------------------------------ */
  sandbag: { name:"Sandbag Wall", cat:"defense", cost:25, time:4, w:1, h:1, hp:320, armor:"wall",
    power:0, sight:1, tech:1, prereq:["barracks"], line:true,
    obstacle:true, engineerOnly:true, blocks:"vehicle", crossSpeed:0.45, cover:CFG.COVER_HEAVY,
    desc:"Stops vehicles and gives your own infantry a hard fighting position. Riflemen behind " +
         "sandbags are much harder to kill; anything on tracks has to go round." },
  dragonteeth: { name:"Dragon's Teeth", cat:"defense", cost:60, time:7, w:1, h:1, hp:900, armor:"wall",
    power:0, sight:1, tech:1, prereq:["barracks"], line:true,
    obstacle:true, engineerOnly:true, blocks:"vehicle", crossSpeed:1.0, cover:0,
    desc:"Concrete pyramids. Absolutely impassable to vehicles and very hard to shift, but " +
         "infantry walk between them freely and get no cover from them." },
  razorwire: { name:"Razor Wire", cat:"defense", cost:20, time:3, w:1, h:1, hp:120, armor:"wall",
    power:0, sight:1, tech:1, prereq:["barracks"], line:true,
    obstacle:true, engineerOnly:true, blocks:"none", crossSpeed:0.22, cover:0, crushable:true,
    desc:"Does nothing to a tank, which simply crushes it. To infantry it is close to a wall: " +
         "a squad crossing wire is barely moving and completely exposed while it does." },
  tankditch: { name:"Anti-Tank Ditch", cat:"defense", cost:45, time:6, w:1, h:1, hp:600, armor:"wall",
    power:0, sight:1, tech:1, prereq:["barracks"], line:true,
    obstacle:true, engineerOnly:true, blocks:"vehicle", crossSpeed:0.55, cover:CFG.COVER_LIGHT,
    desc:"A cut too steep for tracks. Infantry drop in and scramble out slowly, with the lip " +
         "giving them some protection while they do." },

  nest: { name:"Machine-Gun Nest", cat:"defense", cost:400, time:7, w:1, h:1, hp:600, armor:"structure",
    power:-15, sight:6, tech:1, prereq:["barracks"], weapons:["nest_mg"],
    desc:"Sandbagged GPMG position. Shreds infantry, useless against armour." },

  atpost: { name:"Anti-Tank Gun", cat:"defense", cost:800, time:11, w:1, h:1, hp:750, armor:"structure",
    power:-25, sight:8, tech:1, prereq:["factory"], weapons:["at_gun"], turret:true,
    desc:"Dug-in 100mm gun in a rotating mount. The cheapest way to stop a tank column." },

  /* The SAM beside it has always declared needPower and this never did,
     though it is the same grid and the same radar director. */
  flak: { name:"AA Battery", cat:"defense", cost:850, time:12, w:2, h:2, hp:800, armor:"structure", needPower:true,
    power:-35, sight:9, tech:2, prereq:["radar"], weapons:["aa_battery"], turret:true,
    desc:"Radar-directed twin 40mm. Denies low-level airspace over your base." },

  sam: { name:"SAM Site", cat:"defense", cost:1500, time:18, w:2, h:2, hp:850, armor:"structure",
    power:-70, sight:14, tech:3, prereq:["lab"], weapons:["sam_site"], turret:true, needPower:true,
    desc:"Long-range surface-to-air battery. Goes cold the instant the grid browns out." },

  coastal: { name:"Coastal Battery", cat:"defense", cost:1400, time:17, w:2, h:2, hp:1100, armor:"structure",
    power:-30, sight:13, tech:2, prereq:["navalyard"], weapons:["coast_gun"], turret:true,
    desc:"Casemated 152mm guns that outrange most warships. Blind to aircraft." },

  arty: { name:"Howitzer Emplacement", cat:"defense", cost:1900, time:22, w:2, h:2, hp:900, armor:"structure",
    power:-50, sight:6, tech:3, prereq:["lab"], weapons:["bunker_how"], turret:true,
    desc:"Fixed 155mm battery. Enormous reach, long minimum range, and it needs spotters to shoot at anything." },
};

/* ---------------------------------------------------------------- UPGRADES */
var UPGRADES = {
  tech2:  { name:"Tech II Procurement", cost:2000, oil:40, time:35, prereq:["lab"], tech:2,
            desc:"Unlocks second-generation equipment: MBTs, SPAAG, aviation and the missile fleet." },
  tech3:  { name:"Tech III Procurement", cost:3500, oil:90, time:55, prereq:["lab"], needTech:2, tech:3,
            desc:"Unlocks top-line hardware: heavy armour, MLRS, strike aircraft, cruisers and carriers." },
  ap:     { name:"Tungsten Penetrators", cost:1500, oil:25, time:40, prereq:["lab"],
            desc:"+18% damage from every kinetic gun in the army." },
  armor:  { name:"Composite Armour Kits", cost:1600, oil:30, time:45, prereq:["lab"],
            desc:"+20% hit points on all vehicles and warships." },
  eccm:   { name:"Frequency Agility", cost:1400, oil:35, time:40, prereq:["lab","radar"],
    tech:2, needTech:2,
    desc:"Frequency-hopping and side-lobe cancellation across every radar you own. " +
         "It does not stop a jammer, it makes one work far harder: your radar picture " +
         "survives inside a jamming bubble that would otherwise switch it off, and your " +
         "radar-guided weapons keep their solution." },

  optics: { name:"Thermal Optics", cost:1200, oil:20, time:35, prereq:["lab"],
            desc:"+15% weapon range and +25% sight range across the force. Reveals hidden units sooner." },
  drive:  { name:"Powerpack Overhaul", cost:1100, oil:20, time:30, prereq:["lab"],
            desc:"+15% movement speed for vehicles, +10% for warships." },
};

/* ---------------------------------------------------------------- FACTIONS
   Two real-world force structures. NATO fields fewer, costlier, better-optics
   platforms; the Eastern pattern fields cheaper, tougher, more numerous kit.   */
var FACTIONS = {
  /* The key `nato` is HISTORICAL and now means the UNITED STATES. It is kept
     because 182 unit ids, six hero-model filenames in js/hero/, and the `d:`
     field of every entity in every save file ever written are built on it —
     1009 occurrences across 45 files. Only name/short/bonus change. If a
     genuine multinational alliance is ever wanted alongside these four
     national armies, add a NEW key for it; do not rename this one.
     The roster was already American in all but name — Abrams, Bradley,
     Paladin, MLRS, Raptor, Spirit, Nimitz — so it becomes the United States
     and Britain, France and Germany join it. The B-2, B-52, AC-130 and F-22
     then fall out as American-only with no special casing. */
  nato: { id:"nato", name:"UNITED STATES ARMED FORCES", short:"USA",
          bonus:"Superior optics (+8% weapon range, +7% accuracy). Costlier hardware. " +
                "The only army here with strategic bombers, a fifth-generation " +
                "air-superiority fighter, a fixed-wing gunship, and carriers in numbers.",
          rangeMul:1.08, accMul:1.06, costMul:1.06, hpMul:1.0, buildMul:1.0 },
  pact: { id:"pact", name:"EASTERN COALITION", short:"EAST",
          bonus:"Mass production (-8% unit cost, -10% build time, +8% vehicle HP).",
          rangeMul:1.0, accMul:1.0, costMul:0.92, hpMul:1.08, buildMul:0.90 },
  pla:  { id:"pla", name:"PEOPLE'S LIBERATION ARMY", short:"PLA",
          bonus:"Industrial base (-14% build time, +12% supply throughput). Fuel-hungry fleet.",
          rangeMul:1.02, accMul:1.02, costMul:0.97, hpMul:1.03, buildMul:0.86, supplyMul:1.12, fuelMul:1.12 },

  /* Quantity has a quality all its own: obsolete kit, terrible fire control,
     and the densest artillery park on earth.                                */
  kpa:  { id:"kpa", name:"KOREAN PEOPLE'S ARMY", short:"KPA",
          bonus:"Mass mobilisation: -32% unit cost, -26% build time, huge artillery. " +
                "Obsolete optics (-16% range, -14% accuracy) and thin armour.",
          rangeMul:0.84, accMul:0.86, costMul:0.68, hpMul:0.90, buildMul:0.74,
          supplyMul:0.9, fuelMul:1.0 },

  /* A small, wealthy force that buys the best of everything and fights on
     ground it has fortified for decades.                                    */
  roc:  { id:"roc", name:"REPUBLIC OF CHINA ARMY", short:"ROC",
          bonus:"Premium hardware: +14% weapon range, +10% accuracy, +12% structure HP, " +
                "cheap defences. Everything costs 28% more and builds 18% slower.",
          rangeMul:1.14, accMul:1.10, costMul:1.28, hpMul:1.06, buildMul:1.18,
          supplyMul:1.0, fuelMul:0.95, structHpMul:1.12, defenseCostMul:0.7 },

  /* Small, expensive, and the best-trained gunnery on the board. Chobham was
     invented at FVRDE Chobham and given to the Americans: the M1 fielded it in
     1980, Challenger 1 in 1983, and both first fought with it in the same week
     of February 1991. 386 Challenger 2 built for the British Army, 227 still in
     the fleet by 2021, 148 to be upgraded to Challenger 3 and the rest retired —
     that is what "buys very few of everything" means. */
  gbr:  { id:"gbr", name:"BRITISH ARMED FORCES", short:"UK",
          bonus:"The best gunnery here: +12% accuracy, +10% weapon range, and " +
                "Chobham armour from 1983 (+8% vehicle HP). Very few of everything — " +
                "costs 24% more and builds 22% slower. Invented the steam catapult, " +
                "the angled deck and STOVL; flies off a ski-jump anyway since 1978. " +
                "Land-based nuclear weapons gone by 1993, the WE.177 free-fall bomb " +
                "withdrawn in 1998, and Trident at sea the only British deterrent since.",
          rangeMul:1.10, accMul:1.12, costMul:1.24, hpMul:1.08, buildMul:1.22,
          supplyMul:0.95, fuelMul:0.95 },

  /* Sovereign where it counts and honest about where it is not: the HK416F is
     the service rifle, the carrier's AEW aircraft is an American E-2C, and
     Milan, HOT and Roland are Franco-German while Aster is Franco-Italian.
     What IS wholly French is the warhead, the reactor, the airframes and
     Exocet. French armour chose mobility over protection outright and never
     went back: AMX-13 at 15 t, AMX-30 at 36, Leclerc at 56 where a Challenger 2
     is over 60. */
  fra:  { id:"fra", name:"FRENCH ARMED FORCES", short:"FRANCE",
          bonus:"The only nuclear deterrent in NATO answerable to no one else — " +
                "at sea since 1971 and in the air since 1986, including off a " +
                "carrier deck. Light, fast armour that traded protection away on " +
                "purpose (-6% vehicle HP) and a missile industry that sells to the " +
                "world. Flies on a satellite constellation it does not own.",
          rangeMul:1.04, accMul:1.03, costMul:1.10, hpMul:0.94, buildMul:1.02,
          supplyMul:1.0, fuelMul:0.92 },

  /* Zeiss optics and the gun the Abrams borrowed — the L7 was British and
     Germany licence-built it, but the Rheinmetall Rh-120 L/44 went the other
     way and became the American M256 in 1985. A defensive army fighting on its
     own ground: Article 87a limits the Bundeswehr to defence, Article 26 bans
     preparing a war of aggression, and out-of-area deployment has needed a
     Bundestag mandate since 1994. Slowest procurement in the game. */
  deu:  { id:"deu", name:"BUNDESWEHR", short:"GERMANY",
          bonus:"Zeiss optics and the best fire control on the board (+12% weapon " +
                "range, +10% accuracy) on armour that set the export standard " +
                "(+7% vehicle HP). Hardened positions (+15% structure HP, defences " +
                "28% cheaper) and the finest gun-based air defence ever fielded. " +
                "Procures more slowly than anyone (+26% build time). No carrier, no " +
                "cruiser, no nuclear weapon of its own, no strategic bomber since " +
                "1945, and no surface-to-surface missile beyond the divisional " +
                "rocket launcher since 1992.",
          rangeMul:1.12, accMul:1.10, costMul:1.16, hpMul:1.07, buildMul:1.26,
          supplyMul:0.94, fuelMul:0.90, structHpMul:1.15, defenseCostMul:0.72 },
};

/* ---------------------------------------------------------------- UNITS
   speed  : tiles per second      turn/tturn : radians per second
   sight  : tiles                 r          : collision radius, px
   mass   : crushing weight, tonnes-ish      layer : ground|air|sea|sub
   Stats are scaled from real platform performance, not copied verbatim.        */
var UNITS = {

/* ============================ INFANTRY ============================ */
  rifle_n: { fac:"nato", role:"rifle", name:"Rifle Squad", full:"Rifle Squad, M4A1", cat:"infantry",
    cost:150, oil:0, time:5, hp:115, armor:"infantry", speed:1.05, turn:7, sight:6.0, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Four riflemen with 5.56mm carbines. Cheap, expendable, and the only thing that can hold ground." },
  rifle_p: { fac:"pact", role:"rifle", name:"Motor Rifle Squad", full:"Motor Rifle Squad, AK-74M", cat:"infantry",
    cost:135, oil:0, time:4.5, hp:125, armor:"infantry", speed:1.05, turn:7, sight:5.6, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Conscript rifle section. Slightly tougher and cheaper than its NATO counterpart, slightly blinder." },

  mg_n: { fac:"nato", role:"mg", name:"MG Team", full:"Weapons Team, M240B", cat:"infantry",
    cost:280, oil:0, time:7, hp:110, armor:"infantry", speed:0.82, turn:6, sight:6.2, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"Belt-fed GPMG on a tripod. Long bursts pin infantry in place — suppressed troops shoot back badly." },
  mg_p: { fac:"pact", role:"mg", name:"PK Team", full:"Weapons Team, PKM", cat:"infantry",
    cost:255, oil:0, time:6.5, hp:118, armor:"infantry", speed:0.82, turn:6, sight:5.8, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"7.62x54R general-purpose machine gun team. Area denial against dismounts." },

  at_n: { fac:"nato", role:"at", name:"Javelin Team", full:"AT Team, FGM-148 Javelin", cat:"infantry",
    cost:400, oil:0, time:9, hp:105, armor:"infantry", speed:0.88, turn:6, sight:7.2, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Fire-and-forget top-attack ATGM. Devastating on armour, helpless up close inside arming distance." },
  at_p: { fac:"pact", role:"at", name:"Kornet Team", full:"AT Team, 9M133 Kornet", cat:"infantry",
    cost:370, oil:0, time:8.5, hp:110, armor:"infantry", speed:0.88, turn:6, sight:7.0, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Wire-free laser-beam-riding ATGM. Cheaper than Javelin; the gunner must hold the beam on target." },

  aa_n: { fac:"nato", role:"aa", name:"Stinger Team", full:"MANPADS Team, FIM-92 Stinger", cat:"infantry",
    cost:350, oil:0, time:8, hp:100, armor:"infantry", speed:0.9, turn:6, sight:8.0, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1,
    desc:"Shoulder-launched IR SAM. Cannot engage ground targets at all — screen it with riflemen." },
  aa_p: { fac:"pact", role:"aa", name:"Igla Team", full:"MANPADS Team, 9K338 Igla-S", cat:"infantry",
    cost:325, oil:0, time:7.5, hp:105, armor:"infantry", speed:0.9, turn:6, sight:7.8, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1,
    desc:"IR-homing MANPADS with a proximity fuse. Strictly anti-air." },

  mortar_n: { fac:"nato", role:"mortar", name:"Mortar Team", full:"Mortar Section, M252 81mm", cat:"infantry",
    cost:480, oil:0, time:11, hp:100, armor:"infantry", speed:0.72, turn:6, sight:5.0, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true,
    desc:"Indirect fire beyond direct-fire range, but it cannot see for itself and cannot shoot close in." },
  mortar_p: { fac:"pact", role:"mortar", name:"Podnos Team", full:"Mortar Section, 2B14 82mm", cat:"infantry",
    cost:450, oil:0, time:10, hp:105, armor:"infantry", speed:0.72, turn:6, sight:5.0, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true,
    desc:"82mm light mortar. Lobs frag over walls and into trench lines." },

  sniper_n: { fac:"nato", role:"sniper", name:"Sniper Team", full:"Sniper Team, M107", cat:"infantry",
    cost:700, oil:0, time:14, hp:90, armor:"infantry", speed:0.78, turn:6, sight:10.5, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"Anti-materiel rifle. One shot removes an infantryman. Excellent spotter for artillery." },
  sniper_p: { fac:"pact", role:"sniper", name:"Marksman Team", full:"Sniper Team, OSV-96", cat:"infantry",
    cost:660, oil:0, time:13, hp:92, armor:"infantry", speed:0.78, turn:6, sight:10.0, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"12.7mm anti-materiel rifle. Long reach, glacial rate of fire." },

  engineer: { fac:"both", role:"engineer", name:"Combat Engineer", cat:"infantry",
    cost:500, oil:0, time:10, hp:95, armor:"infantry", speed:0.95, turn:7, sight:5, r:6, mass:0.1,
    layer:"ground", weapons:[], prereq:["barracks"], tech:1, engineer:true,
    desc:"Unarmed. Enters a damaged friendly structure to fully restore it, or an enemy structure to CAPTURE it." },
  medic: { fac:"both", role:"medic", name:"Combat Medic", cat:"infantry",
    cost:320, oil:0, time:8, hp:95, armor:"infantry", speed:0.98, turn:7, sight:5, r:6, mass:0.1,
    layer:"ground", weapons:[], prereq:["barracks"], tech:2, heal:14,
    desc:"Unarmed. Continuously treats wounded infantry within two tiles. Keeps veteran squads alive." },

/* ============================ VEHICLES ============================ */
  harvester: { fac:"both", role:"harvester", name:"Ore Hauler", cat:"vehicle",
    cost:1100, oil:8, time:16, hp:1000, armor:"light", speed:1.05, turn:1.7, sight:5, r:14, mass:40,
    layer:"ground", weapons:[], prereq:["refinery"], tech:1, harvester:true,
    desc:"Armoured mining truck. Carries 700 credits of ore per run. Your entire war rests on these." },

  mcv: { fac:"both", role:"mcv", name:"Mobile Construction Vehicle", cat:"vehicle",
    cost:3000, oil:30, time:40, hp:1300, armor:"light", speed:0.95, turn:1.4, sight:6, r:16, mass:55,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, deployTo:"conyard",
    desc:"Unfolds into a second Construction Yard. The only way to build a forward base or an expansion." },

  recon_n: { fac:"nato", role:"recon", name:"Humvee", full:"M1151 HMMWV (armed)", cat:"vehicle",
    cost:400, oil:5, time:7, hp:340, armor:"light", speed:2.85, turn:3.2, sight:9.5, r:11, mass:5,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.4,
    desc:"Fast wheeled scout with a ring-mounted .50 cal. Finds the enemy; dies to anything that finds it back." },
  recon_p: { fac:"pact", role:"recon", name:"BRDM-2", full:"BRDM-2 Scout Car", cat:"vehicle",
    cost:370, oil:5, time:6.5, hp:380, armor:"light", speed:2.7, turn:3.0, sight:9.0, r:11, mass:7,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.2,
    desc:"Amphibious-hulled 4x4 recon car with a KPVT heavy machine gun." },

  ifv_n: { fac:"nato", role:"ifv", name:"Bradley IFV", full:"M2A3 Bradley", cat:"vehicle",
    cost:900, oil:10, time:14, hp:820, armor:"light", speed:1.75, turn:2.0, sight:7.5, r:14, mass:30,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:1.8, cargo:5,
    desc:"25mm Bushmaster IFV carrying five dismounts. Kills light armour, carries the infantry that hold ground." },
  ifv_p: { fac:"pact", role:"ifv", name:"BMP-3", full:"BMP-3 IFV", cat:"vehicle",
    cost:850, oil:10, time:13, hp:880, armor:"light", speed:1.8, turn:2.0, sight:7.0, r:14, mass:19,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:1.8, cargo:6,
    desc:"Low-slung IFV with a 100mm/30mm combination mount. Carries six and swims across rivers." },

  lt_n: { fac:"nato", role:"lighttank", name:"Stryker MGS", full:"M1128 Mobile Gun System", cat:"vehicle",
    cost:750, oil:9, time:12, hp:700, armor:"light", speed:2.1, turn:2.4, sight:7.5, r:13, mass:20,
    layer:"ground", weapons:["gun_light"], prereq:["factory"], tech:1, turret:true, tturn:1.6,
    desc:"Wheeled 105mm assault gun. Quick to reposition, thin-skinned in a stand-up fight." },
  lt_p: { fac:"pact", role:"lighttank", name:"Sprut-SD", full:"2S25 Sprut-SD", cat:"vehicle",
    cost:720, oil:9, time:11.5, hp:740, armor:"light", speed:2.0, turn:2.4, sight:7.2, r:13, mass:18,
    layer:"ground", weapons:["gun_light"], prereq:["factory"], tech:1, turret:true, tturn:1.6,
    desc:"Airborne tank destroyer mounting a full 125mm gun on a paper-thin hull." },

  mbt_n: { fac:"nato", role:"mbt", name:"M1A2 Abrams", full:"M1A2 SEP v3", cat:"vehicle",
    cost:1500, oil:22, time:22, hp:1750, armor:"heavy", speed:1.55, turn:1.5, sight:8.0, r:16, mass:62,
    layer:"ground", weapons:["gun_120"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.5, crush:true,
    desc:"Main battle tank. M256 120mm smoothbore firing depleted-uranium long rods, Chobham composite front, gas-turbine drive, and hunter-killer thermal sights that see through night and dust." },
  mbt_p: { fac:"pact", role:"mbt", name:"T-90A", full:"T-90A MBT", cat:"vehicle",
    cost:1400, oil:20, time:20, hp:1820, armor:"heavy", speed:1.6, turn:1.6, sight:7.4, r:15, mass:47,
    layer:"ground", weapons:["gun_125"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.3, crush:true,
    desc:"125mm smoothbore with an autoloader and reactive armour. Hits harder, aims slower, costs less." },

  hvy_n: { from:"e20", fac:"nato", role:"heavy", name:"M1A2C Trophy", full:"M1A2C w/ Trophy APS", cat:"vehicle",
    cost:2400, oil:38, time:32, hp:2450, armor:"heavy", speed:1.4, turn:1.35, sight:8.5, r:18, mass:70,
    layer:"ground", weapons:["gun_120"], prereq:["factory","lab"], tech:3, turret:true, tturn:1.5, crush:true, aps:0.45,
    desc:"Upgraded Abrams with an active protection system: a 45% chance to hard-kill any incoming missile." },
  hvy_p: { fac:"pact", role:"heavy", name:"T-14 Armata", full:"T-14 Armata MBT", cat:"vehicle",
    cost:2300, oil:36, time:30, hp:2550, armor:"heavy", speed:1.5, turn:1.4, sight:8.0, r:18, mass:55,
    layer:"ground", weapons:["gun_125"], prereq:["factory","lab"], tech:3, turret:true, tturn:1.4, crush:true, aps:0.40,
    desc:"Unmanned turret, crew in an armoured capsule, Afganit APS. Fast for its weight and very hard to kill." },

  /* The Stryker entered service in 2002 and the M1134 in 2003 - js/facts.js
     already records service 2003 for this id - so from:"e00", not e60. The
     four earlier bands are in eras.js: M56 Scorpion 1957, M113A1 TOW 1973,
     M901 ITV 1979, M901A1 ITV 1991. */
  atgmv_n: { from:"e00", fac:"nato", role:"tankdestroyer", name:"Stryker ATGM", full:"M1134 ATGM Vehicle", cat:"vehicle",
    cost:1100, oil:14, time:16, hp:620, armor:"light", speed:2.0, turn:2.2, sight:8.6, r:13, mass:19,
    layer:"ground", weapons:["atgm_veh"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.4,
    desc:"Twin TOW-2B launcher. Outranges every tank gun; folds instantly if anything reaches it." },
  /* KHRIZANTEMA-S IS A 2005 MACHINE AND WAS DATED 1960. js/facts.js already
     records service 2005 for this id, so the roster and the fact table
     disagreed by forty years. The date is read by generations.js: pact guided
     accuracy is multiplied by 0.968 at e60 and by 0.712 at e00, and the
     measured resolved accuracy moves 0.774 -> 0.570. A 2005 missile dated 1965
     was shooting 36% better than its own decade allows.

     Moving it forward would leave four empty bands, which is the larger error,
     so eras.js now carries the two carriers the army actually had: 9P110
     Malyutka on a BRDM-1 from 1963 and 9P149 Shturm-S on an MT-LB from 1979.
     e50 stays empty and must: the Soviet Army had no guided anti-tank missile
     of any kind until the 3M6 Shmel of 1960, and the 9K11 Malyutka was not
     accepted until 16 September 1963. */
  atgmv_p: { from:"e00", fac:"pact", role:"tankdestroyer", name:"Khrizantema-S", full:"9P157-2 Khrizantema-S", cat:"vehicle",
    cost:1050, oil:14, time:15, hp:680, armor:"light", speed:2.0, turn:2.2, sight:8.4, r:13, mass:20,
    layer:"ground", weapons:["atgm_veh"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.4,
    desc:"Radar-guided ATGM carrier that can engage through smoke and dust." },

  spaag_n: { fac:"nato", role:"spaag", name:"M-SHORAD", full:"Stryker A1 IM-SHORAD", cat:"vehicle",
    cost:1000, oil:14, time:15, hp:800, armor:"light", speed:1.65, turn:1.9, sight:9.5, r:14, mass:47,
    layer:"ground", weapons:["spaag"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.6,
    desc:"Stinger and Hellfire on a Stryker with a 30mm cannon, fielded in 2021 to close a short-range air-defence gap the US Army had left open since the Vulcan and Chaparral went in the 1990s. The Gepard that used to stand here was West German." },
  spaag_p: { fac:"pact", role:"spaag", name:"Tunguska", full:"2S6M Tunguska", cat:"vehicle",
    cost:1050, oil:15, time:15, hp:850, armor:"light", speed:1.6, turn:1.9, sight:9.5, r:14, mass:34,
    layer:"ground", weapons:["spaag"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.6,
    desc:"Guns-and-missiles air defence vehicle. The bane of low-flying attack helicopters." },

  spg_n: { fac:"nato", role:"spg", name:"M109 Paladin", full:"M109A7 Paladin", cat:"vehicle",
    cost:1500, oil:20, time:22, hp:780, armor:"light", speed:1.35, turn:1.5, sight:5.5, r:15, mass:39,
    layer:"ground", weapons:["howitzer","scat_raams"], dispenser:8,
    prereq:["factory","radar"], tech:2, turret:true, tturn:0.9,
    desc:"155mm self-propelled howitzer. Fires far past its own eyesight — it needs a spotter to be useful. It is also NATO's only way to sow a minefield: M741 RAAMS, nine M73 anti-tank mines in a cargo shell, in service since 1982." },
  spg_p: { fac:"pact", role:"spg", name:"Msta-S", full:"2S19 Msta-S", cat:"vehicle",
    cost:1450, oil:20, time:21, hp:820, armor:"light", speed:1.35, turn:1.5, sight:5.5, r:15, mass:42,
    layer:"ground", weapons:["howitzer"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.9,
    desc:"152mm SPH with a long tube and a heavy shell. Same doctrine, same blind spot." },

  mlrs_n: { fac:"nato", role:"mlrs", name:"M270 MLRS", full:"M270A2 MLRS", cat:"vehicle",
    cost:2200, oil:34, time:30, hp:700, armor:"light", speed:1.3, turn:1.3, sight:5.5, r:15, mass:25,
    layer:"ground", weapons:["mlrs"], prereq:["factory","lab"], tech:3, turret:true, tturn:0.8,
    desc:"Twelve 227mm rockets in one ripple. Erases a base block, then reloads for fourteen seconds. " +
         "It cannot sow a minefield. The US Army never fielded an MLRS scatterable-mine rocket, and the " +
         "European AT2 round that did the job in the 1990s has been withdrawn, so NATO's rocket artillery " +
         "no longer carries mines at all — the 155mm RAAMS shell does it instead, shorter and smaller but " +
         "impossible to intercept." },
  mlrs_p: { fac:"pact", role:"mlrs", name:"BM-30 Smerch", full:"9A52 Smerch MRL", cat:"vehicle",
    cost:2100, oil:32, time:29, hp:720, armor:"light", speed:1.3, turn:1.3, sight:5.5, r:15, mass:44,
    layer:"ground", weapons:["mlrs","scat_ptm3"], dispenser:6,
    prereq:["factory","lab"], tech:3, turret:true, tturn:0.8,
    desc:"300mm rocket artillery. Enormous beaten zone, catastrophic against massed infantry. It also sows anti-tank minefields by rocket, which this army has done without a break since the BM-27 Uragan fired the 9M27K2 in 1977." },

  repair: { fac:"both", role:"repair", name:"Recovery Vehicle", full:"Armoured Recovery Vehicle", cat:"vehicle",
    cost:800, oil:10, time:12, hp:900, armor:"light", speed:1.5, turn:1.7, sight:5, r:14, mass:50,
    layer:"ground", weapons:[], prereq:["factory","depot"], tech:1, repairRate:26,
    desc:"Field-repairs friendly vehicles within two tiles. Keeps an armoured push alive far from base." },

  /* The fleet had no equivalent of the recovery vehicle and no yard that
     would take a damaged hull, so a battered destroyer stayed battered for
     the rest of the match. Every real navy keeps a tender with the group for
     exactly this reason. */
  repair_sea: { fac:"both", role:"repair_sea", name:"Repair Tender", full:"Salvage and Repair Tender", cat:"naval",
    cost:1100, oil:14, time:16, hp:1250, armor:"light", speed:2.1, turn:1.2, sight:6.5, r:20, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard"], tech:1, repairRate:30, oiler:true,
    desc:"Repairs friendly ships within a few hundred metres and tops up their bunkers. A task group that has to sail home to be mended is a task group out of the war." },

/* ============================ AIRCRAFT ============================ */
  helo_n: { fac:"nato", role:"gunship", name:"AH-64 Apache", full:"AH-64E Apache Guardian", cat:"aircraft",
    cost:1600, oil:26, time:22, hp:620, armor:"air", speed:3.6, turn:2.2, sight:9.5, r:16, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    desc:"Attack helicopter. Hovers to shoot, engages armour with Hellfires, must land to rearm. Dead meat over SPAAG." },
  helo_p: { fac:"pact", role:"gunship", name:"Mi-28 Havoc", full:"Mi-28N Night Hunter", cat:"aircraft",
    cost:1550, oil:25, time:21, hp:680, armor:"air", speed:3.5, turn:2.2, sight:9.0, r:16, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    desc:"Armoured gunship built to absorb hits. Same doctrine as the Apache, tougher, slightly blinder." },

  trans_n: { fac:"nato", role:"transport", name:"Black Hawk", full:"UH-60M Black Hawk", cat:"aircraft",
    cost:900, oil:14, time:14, hp:520, armor:"air", speed:4.2, turn:2.4, sight:8, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:8, ammo:0,
    desc:"Lifts eight infantry over water, cliffs and defences. Air-assault straight into an undefended flank." },
  trans_p: { fac:"pact", role:"transport", name:"Mi-8 Hip", full:"Mi-8AMTSh Terminator", cat:"aircraft",
    cost:850, oil:13, time:13, hp:580, armor:"air", speed:4.0, turn:2.4, sight:8, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:10, ammo:0,
    desc:"Heavy-lift assault helicopter carrying ten. Slower than the Black Hawk, carries more." },

  fighter_n: { fac:"nato", role:"fighter", name:"F-16 Falcon", full:"F-16C Block 52", cat:"aircraft",
    cost:1400, oil:30, time:20, hp:420, armor:"air", speed:8.5, turn:1.9, sight:11, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    desc:"Air superiority fighter. Only engages aircraft. Makes a pass, then returns to the strip to rearm." },
  fighter_p: { fac:"pact", role:"fighter", name:"MiG-29 Fulcrum", full:"MiG-29S Fulcrum-C", cat:"aircraft",
    cost:1350, oil:29, time:19, hp:440, armor:"air", speed:8.8, turn:2.0, sight:10.5, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    desc:"Fast interceptor with excellent instantaneous turn. Short legs — it is always going home." },

  bomber_n: { fac:"nato", role:"cas", name:"A-10 Thunderbolt II", full:"A-10C Thunderbolt II", cat:"aircraft",
    cost:2000, oil:40, time:28, hp:760, armor:"air", speed:5.6, turn:1.5, sight:9, r:17, mass:0,
    layer:"air", weapons:["jdam","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6,
    desc:"Close air support. Titanium bathtub, 30mm gun and guided bombs. Slow enough for AA to hurt it." },
  bomber_p: { fac:"pact", role:"cas", name:"Su-25 Frogfoot", full:"Su-25SM3 Frogfoot", cat:"aircraft",
    cost:1900, oil:38, time:27, hp:800, armor:"air", speed:5.8, turn:1.5, sight:8.5, r:17, mass:0,
    layer:"air", weapons:["jdam","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6,
    desc:"Armoured ground-attack jet. Delivers heavy ordnance onto a base block and runs for home." },

/* ============================ NAVAL ============================ */
  boat_n: { fac:"nato", role:"patrol", name:"Mk VI Patrol Boat", cat:"naval",
    cost:500, oil:6, time:9, hp:520, armor:"light", speed:3.4, turn:2.2, sight:8.5, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.4,
    desc:"Fast inshore patrol craft. Scouts coastline, chases transports, dies to anything serious." },
  boat_p: { fac:"pact", role:"patrol", name:"Project 21630 Gunboat", cat:"naval",
    cost:470, oil:6, time:8.5, hp:560, armor:"light", speed:3.2, turn:2.2, sight:8.0, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.4,
    desc:"Shallow-draught river gunboat. Cheap hull for screening and scouting." },

  corvette_n: { fac:"nato", role:"corvette", name:"LCS Corvette", full:"Littoral Combat Ship", cat:"naval",
    cost:1200, oil:16, time:16, hp:1150, armor:"light", speed:2.9, turn:1.7, sight:9.5, r:17, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1, turret:true, tturn:2.0,
    desc:"Fast littoral combatant with a 57mm rapid-fire mount that can also engage helicopters." },
  corvette_p: { fac:"pact", role:"corvette", name:"Project 22160 Corvette", cat:"naval",
    cost:1150, oil:16, time:15, hp:1220, armor:"light", speed:2.8, turn:1.7, sight:9.0, r:17, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1, turret:true, tturn:2.0,
    desc:"Patrol corvette built for endurance. A 57mm gun and a very tough hull for the price." },

  missileboat_n: { fac:"nato", role:"missileboat", name:"Harpoon Missile Boat", cat:"naval",
    cost:1500, oil:22, time:19, hp:900, armor:"light", speed:3.0, turn:1.8, sight:9, r:16, mass:0,
    layer:"sea", weapons:["ssm"], prereq:["navalyard","radar"], tech:2,
    desc:"Anti-ship missile craft. Kills capital ships and shore targets from beyond gun range — if nothing intercepts." },
  missileboat_p: { fac:"pact", role:"missileboat", name:"Molniya Missile Boat", full:"Project 1241 Molniya", cat:"naval",
    cost:1450, oil:21, time:18, hp:950, armor:"light", speed:3.1, turn:1.8, sight:8.5, r:16, mass:0,
    layer:"sea", weapons:["ssm"], prereq:["navalyard","radar"], tech:2,
    desc:"Missile cutter carrying heavy anti-ship rounds. Glass cannon — strike first or die." },

  destroyer_n: { fac:"nato", role:"destroyer", name:"Arleigh Burke DDG", full:"DDG-51 Flight IIA", cat:"naval",
    cost:2200, oil:34, time:28, hp:2100, armor:"heavy", speed:2.4, turn:1.2, sight:11, r:20, mass:0,
    layer:"sea", weapons:["navgun_127","sam_ship","depthchg"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.55, sonar:7,
    desc:"Aegis destroyer: 127mm gun, area SAM cover, sonar that finds submarines, and CIWS that swats missiles." },
  destroyer_p: { fac:"pact", role:"destroyer", name:"Sovremenny DDG", full:"Project 956 Sovremenny", cat:"naval",
    cost:2150, oil:33, time:27, hp:2250, armor:"heavy", speed:2.3, turn:1.2, sight:10.5, r:20, mass:0,
    layer:"sea", weapons:["navgun_127","sam_ship","depthchg"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.48, sonar:7,
    desc:"Heavy gun-and-missile destroyer. Tougher hull, slightly less capable fire control than the Burke." },

  cruiser_n: { fac:"nato", role:"cruiser", name:"Ticonderoga CG", full:"CG-47 Ticonderoga", cat:"naval",
    cost:3400, oil:60, time:42, hp:2900, armor:"heavy", speed:2.0, turn:0.9, sight:12, r:23, mass:0,
    layer:"sea", weapons:["navgun_203","sam_ship"], prereq:["navalyard","lab"], tech:3,
    turret:true, tturn:1.0, ciws:0.6, shoreBombard:true,
    desc:"Guided-missile cruiser. Naval gunfire support that flattens a coastal base from 17 tiles out." },
  cruiser_p: { fac:"pact", role:"cruiser", name:"Slava CG", full:"Project 1164 Slava", cat:"naval",
    cost:3300, oil:58, time:41, hp:3050, armor:"heavy", speed:1.95, turn:0.9, sight:11.5, r:23, mass:0,
    layer:"sea", weapons:["navgun_203","sam_ship"], prereq:["navalyard","lab"], tech:3,
    turret:true, tturn:1.0, ciws:0.5, shoreBombard:true,
    desc:"Missile cruiser with a heavy main battery. Anchors a fleet and shells anything on the coast." },

  sub_n: { fac:"nato", role:"sub", name:"Virginia SSN", full:"SSN-774 Virginia class, Block IV/V", cat:"naval",
    cost:2400, oil:40, time:30, hp:1250, armor:"light", speed:2.2, turn:1.1, sight:8.5, r:17, mass:0,
    layer:"sub", weapons:["torpedo"], prereq:["navalyard","radar"], tech:2, submerged:true,
    layNet:6,
    desc:"The boat the United States is actually building. Photonics masts instead of a periscope, a hull designed for the littorals as much as the deep ocean, and enough of them to replace the Los Angeles fleet one for one - which the three Seawolfs were far too expensive to do." +
         "Carries six TRAPS-type acoustic nodes and can lay a barrier across water it does not intend to sit in." , quiet:0.3 },
  sub_p: { fac:"pact", role:"sub", name:"Kilo SSK", full:"Project 636 Kilo", cat:"naval",
    cost:2250, oil:37, time:28, hp:1180, armor:"light", speed:2.1, turn:1.1, sight:8.0, r:17, mass:0,
    layer:"sub", weapons:["torpedo"], prereq:["navalyard","radar"], tech:2, submerged:true,
    layNet:4,
    desc:"Diesel-electric 'Black Hole' — extremely quiet, cheap, and lethal to anything on the surface. " +
         "Carries four Garmoniya-type seabed stations: fewer than a Virginia, and shorter-lived." },

  lst: { fac:"both", role:"transport_sea", name:"Landing Craft", full:"LCAC Air-Cushion Landing Craft", cat:"naval",
    cost:900, oil:12, time:14, hp:900, armor:"light", speed:2.8, turn:1.6, sight:6.5, r:18, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard"], tech:1, cargo:6, amphib:true,
    desc:"Carries six vehicles or infantry across water and drives them straight up onto the beach." },

  carrier_n: { fac:"nato", role:"carrier", name:"Gerald R. Ford CVN", full:"USS Gerald R. Ford (CVN-78)", cat:"naval",
    cost:5000, oil:110, time:60, hp:4200, armor:"heavy", speed:1.6, turn:0.6, sight:14, r:30, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard","lab","airbase"], tech:3, ciws:0.65, carrier:4, storage:0,
    desc:"Commissioned in 2017 and the first new American carrier design since the Nimitz of 1975. Electromagnetic catapults instead of steam, a smaller island moved aft, and a sortie rate a third higher than the class she replaces." },
  carrier_p: { fac:"pact", role:"carrier", name:"Kuznetsov CV", full:"Project 1143.5 Kuznetsov", cat:"naval",
    cost:4800, oil:105, time:58, hp:4400, armor:"heavy", speed:1.6, turn:0.6, sight:13, r:30, mass:0,
    layer:"sea", weapons:["sam_ship"], prereq:["navalyard","lab","airbase"], tech:3, ciws:0.55, carrier:3,
    desc:"Heavy aviation cruiser: three aircraft plus its own SAM battery and a very heavy hull." },
};


/* ======================= AERIAL REFUELLING =======================
   A tanker does not really hand out fuel: it moves where "home" is. Every
   aircraft breaks off when its fuel drops under the reserve it needs to reach
   the nearest place it can land, and a tanker orbiting forward becomes that
   place - so the fighters it supports hold their reserve later, fight longer,
   and go back to the fight afterwards instead of back to the airfield.

     tanker      units of fuel it can give away before it must cycle home
                 (an aircraft holds 100, so 380 is four or five top-ups)
     refuelRate  units per second across the boom

   Three armies here operate tankers and two do not. The KPA has never had one
   and the ROC has no dedicated tanker either, so neither gets the option -
   their fighters live inside their own combat radius, which is exactly the
   constraint those air forces actually have.
   ================================================================= */
Object.assign(UNITS, {
  /* First KC-46A delivered to McConnell AFB in January 2019, so from:"e20".
     It used to read e50 - a 2019 aeroplane refuelling Sabres over Korea -
     because it was the only American tanker in the game. The chain that
     replaces that stamp is in eras.js: KC-97G 1953, KC-135A 1957, KC-10A
     1981, KC-135R 1984. The United States has flown a tanker force since
     1948 and there is no band where it had none. */
  tanker_n: { from:"e20", fac:"nato", role:"tanker", name:"KC-46 Pegasus", full:"Boeing KC-46A Pegasus", cat:"aircraft",
    cost:3200, oil:70, time:40, hp:760, armor:"air", speed:4.4, turn:0.9, sight:9, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0,
    radius:150, tanker:420, refuelRate:16, rcs:5.2,
    desc:"Unarmed, enormous and the most valuable thing you will ever put in the air. Park it " +
         "behind the line and your fighters stop flying home to refuel; park it too far forward " +
         "and you lose the whole air campaign in one interception." },
  tanker_p: { fac:"pact", role:"tanker", name:"Il-78 Midas", full:"Ilyushin Il-78M Midas", cat:"aircraft",
    cost:3000, oil:72, time:40, hp:790, armor:"air", speed:4.2, turn:0.85, sight:8.5, r:23, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0,
    radius:140, tanker:400, refuelRate:14, rcs:5.6, from:"e80",
    desc:"Three-point probe-and-drogue tanker on the Il-76 airframe. Fewer of them than the " +
         "other side has, and slower, but it does the same job: it turns a short-legged " +
         "interceptor into something that can stay where it is needed." },
  tanker_c: { fac:"pla", role:"tanker", name:"YY-20", full:"Xian YY-20 (Y-20U)", cat:"aircraft",
    cost:3100, oil:71, time:40, hp:800, armor:"air", speed:4.3, turn:0.88, sight:8.8, r:23, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0,
    radius:145, tanker:410, refuelRate:15, rcs:5.4,
    /* The Y-20U entered service in 2021, so e00 was a fifteen-year back-date on
       the one aircraft in this roster whose arrival is itself the story. The
       earlier tanker is the H-6U in eras.js: first flight 1990, first transfer
       1993, in the 1999 National Day flypast with four J-8D behind it. Before
       that China had no aerial refuelling at all, so e50, e60 and e80 are
       deliberately empty and every Chinese combat radius in those three eras
       is the aircraft's own. */
    from:"e20",
    desc:"China spent thirty years unable to refuel in the air and the whole force was built " +
         "around that limit. The YY-20 removes it, and is the single aircraft that turns a " +
         "regional air force into one with reach." },
});

/* ================= mobile air defence and ballistic launchers =================
   Two classes the roster has never had. The SAM Site building is the FIXED
   tier and stays exactly as it is; what goes here is the tier below it, the
   launcher that shoots and then moves before the reply arrives. The ballistic
   launchers are the on-map, targetable, killable form of a power the game has
   only ever had as an off-map fire mission.

   Both fire proj:"missile" rather than proj:"arc" on purpose: the layered
   defence in combat.js is only entered for a guided round, so an arc ballistic
   missile would be strictly uninterceptable and the new SAM would have nothing
   to do. They carry indirect:true instead, and the handful of arc-gated
   behaviours are widened to read it. */
Object.assign(UNITS, {
  sam_n: { fac:"nato", role:"sam", name:"Patriot PAC-3", full:"MIM-104F Patriot PAC-3 MSE", cat:"vehicle",
    cost:2650, oil:38, time:33, hp:600, armor:"light", speed:1.10, turn:1.1, sight:13.2, r:16, mass:36,
    layer:"ground", weapons:["sam_area3"], prereq:["factory","radar","lab"], tech:3, turret:true, tturn:0.6,
    deploy:true, deploySec:5.5, radar:13, radarQ:20, rounds:12, from:"e20",
    desc:"Sixteen hit-to-kill rounds on a towed launching station: no warhead at all, just a " +
         "tungsten ring and a closing speed. It is the best anti-ballistic shot in the game and " +
         "the slowest thing in the class into and out of action - the radar is a separate trailer " +
         "and the battery cannot fight until both are sited." },
  sam_p: { fac:"pact", role:"sam", name:"S-400 Triumf", full:"S-400 Triumf, 5P85TE2 TEL", cat:"vehicle",
    cost:2600, oil:38, time:32, hp:640, armor:"light", speed:1.25, turn:1.2, sight:13.2, r:16, mass:40,
    layer:"ground", weapons:["sam_area3"], prereq:["factory","radar","lab"], tech:3, turret:true, tturn:0.6,
    deploy:true, deploySec:4.0, radar:13, radarQ:18, rounds:4, from:"e20",
    desc:"Four cold-launch tubes on an eight-wheeled tractor, five minutes into action and five " +
         "minutes out. Russian ground-based air defence is the one domain where this army is " +
         "genuinely ahead of NATO, and the reach here is the longest in the class." },
  sam_c: { fac:"pla", role:"sam", name:"HQ-9B", full:"HQ-9B on Taian TAS-5380", cat:"vehicle",
    cost:2550, oil:36, time:31, hp:630, armor:"light", speed:1.25, turn:1.2, sight:13.2, r:16, mass:38,
    layer:"ground", weapons:["sam_area3"], prereq:["factory","radar","lab"], tech:3, turret:true, tturn:0.6,
    deploy:true, deploySec:4.5, radar:13, radarQ:20, rounds:4, from:"e20",
    desc:"Laid out to follow the S-300 because that is what China bought in 1993 and studied; the " +
         "planar-array radar on top of it is not. The end of a road that began with a fixed " +
         "S-75 site outside Beijing and forty years of having no answer at all." },
  sam_r: { fac:"roc", role:"sam", name:"Sky Bow III", full:"Tien Kung III mobile launcher", cat:"vehicle",
    cost:2900, oil:34, time:34, hp:560, armor:"light", speed:1.25, turn:1.2, sight:11.6, r:15, mass:28,
    layer:"ground", weapons:["sam_tk3"], prereq:["factory","radar","lab"], tech:3, turret:true, tturn:0.7,
    deploy:true, deploySec:4.5, radar:11, radarQ:17, rounds:4, from:"e20",
    desc:"The shortest reach in its class and the only one Taiwan built itself. Sky Bow I and II " +
         "are silo batteries in hillsides that cannot move; this one can, which on an island " +
         "that expects to be shot at first is worth more than another fifty kilometres." },
  sam_k: { fac:"kpa", role:"sam", name:"Pongae-5", full:"Pongae-5 (KN-06) area SAM", cat:"vehicle",
    cost:2200, oil:30, time:30, hp:560, armor:"light", speed:1.15, turn:1.1, sight:12.2, r:16, mass:36,
    layer:"ground", weapons:["sam_pongae"], prereq:["factory","radar","lab"], tech:3, turret:true, tturn:0.7,
    deploy:true, deploySec:6.0, radar:11, radarQ:9, rounds:4, from:"e20",
    desc:"Paraded 2010, fired in 2011, 2013, 2016 and 2017, and judged to be in service around " +
         "2017 - every one of those dates is an outside assessment. It is shaped like an S-300 " +
         "and its radar, its numbers and its reliability are all unverified, so it shoots and " +
         "mostly misses. Unreachable by re-equipping: this army is capped at 1990." },
  tel_n: { fac:"nato", role:"tel", name:"HIMARS / PrSM", full:"M142 HIMARS with PrSM", cat:"vehicle",
    cost:2900, oil:48, time:34, hp:520, armor:"light", speed:1.55, turn:1.4, sight:5.0, r:15, mass:16,
    layer:"ground", weapons:["srbm_mod"], prereq:["factory","lab","radar"], tech:3, turret:false,
    deploy:true, deploySec:3.0, rounds:2, from:"e20",
    desc:"Two rounds in one pod on the same five-ton truck that fires the rocket artillery. NATO " +
         "has had no dedicated ballistic launcher since INF eliminated Pershing II in 1988, and " +
         "this is the consequence: fast, small, cheap, and it leaves with the battery. It is " +
         "also conventional-only, and so is every launcher NATO fields: INF destroyed Pershing " +
         "II, France dismantled Hades by 1997, and neither ATACMS nor PrSM has ever carried a " +
         "nuclear warhead. NATO's nuclear release in this theatre is the Strategic Silo." },
  tel_p: { fac:"pact", role:"tel", name:"Iskander-M", full:"9K720 Iskander-M, 9P78-1 TEL", cat:"vehicle",
    cost:3200, oil:58, time:38, hp:580, armor:"light", speed:1.30, turn:1.0, sight:5.0, r:17, mass:42,
    layer:"ground", weapons:["srbm_mod"], prereq:["factory","lab","radar"], tech:3, turret:false,
    deploy:true, deploySec:4.0, rounds:2, from:"e20",
    desc:"Two rounds under one hinged cover, a depressed flight path and a terminal manoeuvre, " +
         "which is why an ordinary air-defence system gets almost nothing at it. Fifteen years " +
         "late because INF destroyed its predecessor and the replacement programme went with it." },
  tel_c: { fac:"pla", role:"tel", name:"DF-16", full:"DF-16 (CSS-11) on a 10x10 TEL", cat:"vehicle",
    cost:3300, oil:60, time:39, hp:570, armor:"light", speed:1.25, turn:0.95, sight:5.0, r:17, mass:46,
    layer:"ground", weapons:["srbm_mod"], prereq:["factory","lab","radar"], tech:3, turret:false,
    deploy:true, deploySec:4.5, rounds:1, from:"e20",
    desc:"One round, ten wheels and a separating manoeuvring re-entry vehicle. The PLA had no " +
         "mobile ballistic missile at all before 1992 and now has the largest conventional " +
         "force of them anywhere, which is the sharpest change of any army in this game." },
  tel_k: { fac:"kpa", role:"tel", name:"Hwasong-11Ga", full:"KN-23 / Hwasong-11Ga tracked TEL", cat:"vehicle",
    cost:2800, oil:52, time:36, hp:600, armor:"light", speed:1.20, turn:0.95, sight:5.0, r:17, mass:44,
    layer:"ground", weapons:["srbm_mod"], prereq:["factory","lab","radar"], tech:3, turret:false,
    deploy:true, deploySec:4.5, rounds:2, from:"e20",
    desc:"First fired in May 2019 and in service from about 2021: an Iskander in outline, flying " +
         "the same depressed manoeuvring path, on tracks. This army has the deepest missile " +
         "inventory of the five and the worst of everything else - and it cannot re-equip to " +
         "reach this, so it must start here." },
  nato_e60_sam: {"fac":"nato","role":"sam","cat":"vehicle","layer":"ground","name":"SP-HAWK","full":"M727 Self-Propelled Improved HAWK","cost":1900,"oil":26,"time":24,"hp":540,"armor":"light","speed":1.35,"turn":1.3,"sight":10.4,"r":15,"mass":18,"weapons":["sam_area1"],"prereq":["factory","radar"],"tech":3,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"Three MIM-23 rounds on an open frame on a tracked cargo hull. The first Western area SAM that could move at all - the Nike sites it replaced took days to build.","turret":true,"tturn":0.7,"deploy":true,"radar":9,"radarQ":12,"rounds":3},
  pact_e60_sam: {"fac":"pact","role":"sam","cat":"vehicle","layer":"ground","name":"2K11 Krug","full":"2K11 Krug, 2P24 launcher","cost":2050,"oil":28,"time":26,"hp":640,"armor":"light","speed":1.30,"turn":1.2,"sight":10.4,"r":16,"mass":30,"weapons":["sam_area1"],"prereq":["factory","radar"],"tech":3,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"Two ramjet missiles on a tracked launcher: the first genuinely mobile long-range SAM anywhere, and it belonged to the field army rather than to the air defence troops.","turret":true,"tturn":0.7,"deploy":true,"radar":9,"radarQ":11,"rounds":2},
  pla_e60_sam: {"fac":"pla","role":"sam","cat":"vehicle","layer":"ground","name":"HQ-2 (SP)","full":"HQ-2B on a Type 63 tracked chassis","cost":1750,"oil":24,"time":24,"hp":520,"armor":"light","speed":1.10,"turn":1.0,"sight":10.4,"r":16,"mass":22,"weapons":["sam_area1"],"prereq":["factory","radar"],"tech":3,"from":"e60","to":"e80","service":"1967","confidence":"medium","desc":"A Chinese S-75 on one rail on a tracked hull: mobile in the crudest sense, one round, and a 1950s missile underneath. China's first SAM kill was scored by a fixed Soviet site over Beijing in 1959.","turret":true,"tturn":0.5,"deploy":true,"radar":8,"radarQ":9,"rounds":1},
  nato_e80_sam: {"fac":"nato","role":"sam","cat":"vehicle","layer":"ground","name":"Patriot PAC-2","full":"MIM-104C Patriot, M901 launching station","cost":2450,"oil":34,"time":31,"hp":580,"armor":"light","speed":1.05,"turn":1.0,"sight":12.1,"r":16,"mass":34,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"Four sealed canisters on a semitrailer behind an eight-wheeled tractor. Under an hour into action, which is fast for the West and slow beside the thing it was built to answer.","turret":true,"tturn":0.5,"deploy":true,"deploySec":6.0,"radar":12,"radarQ":18,"rounds":4},
  pact_e80_sam: {"fac":"pact","role":"sam","cat":"vehicle","layer":"ground","name":"S-300PS","full":"S-300PS, 5P85S TEL","cost":2500,"oil":36,"time":30,"hp":630,"armor":"light","speed":1.25,"turn":1.2,"sight":12.1,"r":16,"mass":42,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e80","to":"e80","service":"1982","confidence":"high","desc":"Four vertical cold-launch tubes on an eight-wheeled tractor, five minutes into action. A gas generator throws the round clear before the motor lights, and the five minutes is the design point that rewrote Western air planning.","turret":true,"tturn":0.6,"deploy":true,"deploySec":4.0,"radar":12,"radarQ":16,"rounds":4},
  pact_e90_sam: {"fac":"pact","role":"sam","cat":"vehicle","layer":"ground","name":"S-300PM","full":"S-300PM / PMU-1, 5P85SE TEL","cost":2550,"oil":36,"time":30,"hp":630,"armor":"light","speed":1.25,"turn":1.2,"sight":12.1,"r":16,"mass":42,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"The same launcher with the 48N6 round in it. Exported hard through the 1990s because it was one of very few things this industry could still sell.","turret":true,"tturn":0.6,"deploy":true,"deploySec":4.0,"radar":12,"radarQ":16,"rounds":4},
  nato_e90_sam: {"fac":"nato","role":"sam","cat":"vehicle","layer":"ground","name":"Patriot GEM","full":"MIM-104D Patriot PAC-2 GEM","cost":2500,"oil":34,"time":31,"hp":580,"armor":"light","speed":1.05,"turn":1.0,"sight":12.1,"r":16,"mass":34,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1994","confidence":"high","desc":"The guidance-enhanced round, bought because the 1991 engagements against Scuds went less well than the first press conferences said they had.","turret":true,"tturn":0.5,"deploy":true,"deploySec":6.0,"radar":12,"radarQ":19,"rounds":4},
  pla_e90_sam: {"fac":"pla","role":"sam","cat":"vehicle","layer":"ground","name":"S-300PMU","full":"S-300PMU, imported","cost":2700,"oil":36,"time":31,"hp":620,"armor":"light","speed":1.25,"turn":1.2,"sight":12.1,"r":16,"mass":42,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"Bought, not built. China had nothing modern in this class from the 1960s until the Russian sale in 1993, and the HQ-9 that followed is visibly what was learned from it.","turret":true,"tturn":0.6,"deploy":true,"deploySec":4.5,"radar":12,"radarQ":15,"rounds":4},
  nato_e00_sam: {"fac":"nato","role":"sam","cat":"vehicle","layer":"ground","name":"Patriot PAC-3","full":"MIM-104E Patriot PAC-3","cost":2650,"oil":38,"time":33,"hp":600,"armor":"light","speed":1.10,"turn":1.1,"sight":13.2,"r":16,"mass":36,"weapons":["sam_area3"],"prereq":["factory","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"Sixteen hit-to-kill rounds per launcher, no warhead worth the name, and the first Western system built to hit a ballistic missile rather than to hope.","turret":true,"tturn":0.6,"deploy":true,"deploySec":5.5,"radar":13,"radarQ":20,"rounds":12},
  pact_e00_sam: {"fac":"pact","role":"sam","cat":"vehicle","layer":"ground","name":"S-300PMU-2","full":"S-300PMU-2 Favorit","cost":2600,"oil":38,"time":32,"hp":640,"armor":"light","speed":1.25,"turn":1.2,"sight":13.2,"r":16,"mass":42,"weapons":["sam_area3"],"prereq":["factory","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"The last of the S-300 line before the S-400 took the name and the money. Same launcher, longer round, and by now a genuine anti-ballistic capability.","turret":true,"tturn":0.6,"deploy":true,"deploySec":4.0,"radar":13,"radarQ":18,"rounds":4},
  pla_e00_sam: {"fac":"pla","role":"sam","cat":"vehicle","layer":"ground","name":"HQ-9","full":"HQ-9 on Taian TAS-5380","cost":2500,"oil":36,"time":31,"hp":630,"armor":"light","speed":1.25,"turn":1.2,"sight":13.2,"r":16,"mass":38,"weapons":["sam_area3"],"prereq":["factory","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2003","confidence":"medium","desc":"Chinese air defence's first modern mobile battery. Laid out like the S-300 it followed; the planar-array radar is not. HQ-16 (2011) and HQ-22 (2016) fill in below it.","turret":true,"tturn":0.6,"deploy":true,"deploySec":4.5,"radar":13,"radarQ":19,"rounds":4},
  roc_e00_sam: {"fac":"roc","role":"sam","cat":"vehicle","layer":"ground","name":"Patriot GEM+","full":"MIM-104D PAC-2 GEM+ (MADS)","cost":2900,"oil":36,"time":34,"hp":570,"armor":"light","speed":1.05,"turn":1.0,"sight":12.1,"r":16,"mass":34,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"1998","confidence":"high","desc":"Three fire units bought as the Modified Air Defense System and delivered from 1997. Taiwan's first mobile area SAM of any kind, and a purchase rather than a capability - Sky Bow I and II are hillside silos that cannot move.","turret":true,"tturn":0.5,"deploy":true,"deploySec":6.0,"radar":12,"radarQ":18,"rounds":4},
  nato_e50_tel: {"fac":"nato","role":"tel","cat":"vehicle","layer":"ground","name":"MGM-5 Corporal","full":"MGM-5 Corporal guided missile","cost":2600,"oil":46,"time":36,"hp":440,"armor":"light","speed":0.85,"turn":0.8,"sight":5.0,"r":16,"mass":12,"weapons":["srbm_early"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"A slim white finned rocket on a towed erector with a convoy of vans behind it. Liquid-fuelled, radio-commanded, and a battalion of two hundred and fifty men to fire one round.","turret":false,"deploy":true,"deploySec":9.0,"rounds":1},
  pact_e50_tel: {"fac":"pact","role":"tel","cat":"vehicle","layer":"ground","name":"R-11 Scud-A","full":"R-11 (8K11) on the 8U218 erector","cost":2500,"oil":44,"time":35,"hp":520,"armor":"light","speed":1.00,"turn":0.9,"sight":5.0,"r":16,"mass":40,"weapons":["srbm_early"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"One fat missile on an erector welded to a wartime heavy assault-gun hull. Crude, and the ancestor of every launcher in this role.","turret":false,"deploy":true,"deploySec":8.0,"rounds":1},
  nato_e60_tel: {"fac":"nato","role":"tel","cat":"vehicle","layer":"ground","name":"Pershing 1a","full":"MGM-31A Pershing 1a, M790 erector-launcher","cost":2900,"oil":50,"time":37,"hp":500,"armor":"light","speed":1.15,"turn":1.0,"sight":5.0,"r":17,"mass":20,"weapons":["srbm_scud"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"Solid-fuelled, and the wheeled erector cut the reaction time hard against the tracked launcher it replaced. The divisional weapon alongside it was MGM-52 Lance.","turret":false,"deploy":true,"deploySec":6.0,"rounds":1},
  pact_e60_tel: {"fac":"pact","role":"tel","cat":"vehicle","layer":"ground","name":"Scud-B","full":"R-17 Elbrus on the 9P117 Uragan","cost":2700,"oil":48,"time":36,"hp":540,"armor":"light","speed":1.25,"turn":0.95,"sight":5.0,"r":17,"mass":37,"weapons":["srbm_scud"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e80","service":"1962","confidence":"high","desc":"The archetype of the whole class and the shape everything else is measured against. A 985kg warhead and a CEP of about 450 metres: this is an area weapon aimed at a city or an airfield, not at a vehicle.","turret":false,"deploy":true,"deploySec":6.0,"rounds":1},
  nato_e80_tel: {"fac":"nato","role":"tel","cat":"vehicle","layer":"ground","name":"Pershing II","full":"MGM-31B Pershing II","cost":3400,"oil":62,"time":40,"hp":520,"armor":"light","speed":1.20,"turn":0.95,"sight":5.0,"r":17,"mass":38,"weapons":["srbm_p2"],"prereq":["factory","lab","radar"],"tech":3,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Radar area-correlation terminal guidance and a CEP around thirty metres, which made it the most accurate ballistic missile of its generation by a distance. Every one was destroyed between 1988 and 1991 under the INF Treaty, which is why NATO has fired its ballistic rounds out of a rocket launcher ever since.","turret":false,"deploy":true,"deploySec":6.0,"rounds":1},
  pact_e80_tel: {"fac":"pact","role":"tel","cat":"vehicle","layer":"ground","name":"Tochka","full":"OTR-21 Tochka, 9P129 launcher","cost":2900,"oil":50,"time":36,"hp":540,"armor":"light","speed":1.45,"turn":1.1,"sight":5.0,"r":16,"mass":18,"weapons":["srbm_short"],"prereq":["factory","lab","radar"],"tech":3,"from":"e80","to":"e80","service":"1976","confidence":"high","desc":"Much shorter reach than a Scud and far better accuracy, which is the whole trade. Amphibious, fast, and it moves the moment the round is away. The off-map SUPPORT power of the same name is this weapon fired from somebody else's map.","turret":false,"deploy":true,"deploySec":4.0,"rounds":1},
  kpa_e80_tel: {"fac":"kpa","role":"tel","cat":"vehicle","layer":"ground","name":"Hwasong-5","full":"Hwasong-5 (Scud-B derivative)","cost":2400,"oil":44,"time":34,"hp":540,"armor":"light","speed":1.20,"turn":0.95,"sight":5.0,"r":17,"mass":37,"weapons":["srbm_scud"],"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1985","confidence":"medium","desc":"A Scud-B reverse-engineered from examples obtained by way of Egypt, in series production from about 1985. The start of the deepest ballistic inventory of the five armies here.","turret":false,"deploy":true,"deploySec":6.5,"rounds":1},
  nato_e90_tel: {"fac":"nato","role":"tel","cat":"vehicle","layer":"ground","name":"M270 / ATACMS","full":"M270 MLRS with MGM-140 ATACMS Block I","cost":2800,"oil":50,"time":34,"hp":700,"armor":"light","speed":1.30,"turn":1.3,"sight":5.0,"r":16,"mass":25,"weapons":["srbm_atacms"],"prereq":["factory","lab","radar"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"Two missiles in place of twelve rockets, in the launcher the battery already owns. First fired in January 1991 and the reason the United States never built another dedicated erector after INF.","turret":true,"tturn":0.8,"deploy":true,"deploySec":3.0,"rounds":2},
  pact_e90_tel: {"fac":"pact","role":"tel","cat":"vehicle","layer":"ground","name":"Tochka-U","full":"OTR-21 Tochka-U","cost":2950,"oil":50,"time":36,"hp":540,"armor":"light","speed":1.45,"turn":1.1,"sight":5.0,"r":16,"mass":18,"weapons":["srbm_short"],"prereq":["factory","lab","radar"],"tech":3,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"All this army had that was new. The Oka was destroyed under INF and the Iskander that should have replaced it slipped fifteen years, so the 1990s force is a 1976 missile with a better warhead.","turret":false,"deploy":true,"deploySec":4.0,"rounds":1},
  pla_e90_tel: {"fac":"pla","role":"tel","cat":"vehicle","layer":"ground","name":"DF-15","full":"DF-15 (M-9) on a WS2400 TEL","cost":3100,"oil":56,"time":38,"hp":560,"armor":"light","speed":1.25,"turn":0.95,"sight":5.0,"r":17,"mass":42,"weapons":["srbm_scud"],"prereq":["factory","lab","radar"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"The missile fired into the sea off Keelung and Kaohsiung during the 1995-96 Strait crisis. The PLA had no mobile ballistic missile of any kind before the DF-11 in 1992; this is where that force begins.","turret":false,"deploy":true,"deploySec":5.0,"rounds":1},
  kpa_e90_tel: {"fac":"kpa","role":"tel","cat":"vehicle","layer":"ground","name":"Hwasong-6","full":"Hwasong-6 (Scud-C derivative)","cost":2500,"oil":46,"time":35,"hp":540,"armor":"light","speed":1.20,"turn":0.95,"sight":5.0,"r":17,"mass":37,"weapons":["srbm_scud"],"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"medium","desc":"Five hundred kilometres bought by throwing away two hundred kilogrammes of warhead and accepting a miss distance of one to two kilometres. That trade is the design, and it is why this army's missiles are aimed at cities. This is as far as it can go - it cannot re-equip past 1990.","turret":false,"deploy":true,"deploySec":6.5,"rounds":1},
  nato_e00_tel: {"fac":"nato","role":"tel","cat":"vehicle","layer":"ground","name":"HIMARS / ATACMS","full":"M142 HIMARS with M57 ATACMS Unitary","cost":2850,"oil":48,"time":33,"hp":520,"armor":"light","speed":1.55,"turn":1.4,"sight":5.0,"r":15,"mass":16,"weapons":["srbm_atacms"],"prereq":["factory","lab","radar"],"tech":3,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"One round, a 227kg unitary warhead in place of 950 bomblets, and a wheeled truck that can be flown in. Fast into action and faster out of it.","turret":false,"deploy":true,"deploySec":3.0,"rounds":1},
  pact_e00_tel: {"fac":"pact","role":"tel","cat":"vehicle","layer":"ground","name":"Iskander-M","full":"9K720 Iskander-M, 9P78-1 TEL","cost":3200,"oil":58,"time":38,"hp":580,"armor":"light","speed":1.30,"turn":1.0,"sight":5.0,"r":17,"mass":42,"weapons":["srbm_mod"],"prereq":["factory","lab","radar"],"tech":3,"from":"e00","to":"e00","service":"2006","confidence":"high","desc":"Two rounds under a shared hinged cover, a depressed flight path and a terminal manoeuvre. Twenty years late, because the treaty that killed the Oka killed the programme with it.","turret":false,"deploy":true,"deploySec":4.0,"rounds":2},
  pla_e00_tel: {"fac":"pla","role":"tel","cat":"vehicle","layer":"ground","name":"DF-15B","full":"DF-15B on a WS2400 TEL","cost":3300,"oil":58,"time":38,"hp":560,"armor":"light","speed":1.25,"turn":0.95,"sight":5.0,"r":17,"mass":42,"weapons":["srbm_mod"],"prereq":["factory","lab","radar"],"tech":3,"from":"e00","to":"e00","service":"2006","confidence":"medium","desc":"A separating manoeuvring re-entry vehicle drops the miss distance from hundreds of metres to single figures. The same launcher as 1995 with a completely different weapon on it.","turret":false,"deploy":true,"deploySec":5.0,"rounds":1},
  kpa_e00_tel: {"fac":"kpa","role":"tel","cat":"vehicle","layer":"ground","name":"KN-02 Toksa","full":"KN-02 Toksa (OTR-21 derivative)","cost":2600,"oil":46,"time":34,"hp":530,"armor":"light","speed":1.40,"turn":1.1,"sight":5.0,"r":16,"mass":18,"weapons":["srbm_short"],"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2007","confidence":"medium","desc":"A reverse-engineered Tochka and this army's first accurate solid-fuelled battlefield missile - short, quick, and aimed at a target rather than at a map square. Reachable only by starting here: the KPA cannot re-equip past 1990.","turret":false,"deploy":true,"deploySec":4.5,"rounds":1},
});

/* ======================= MINE WARFARE =======================
   Mines are older than every period this game covers and every army in it
   has always used them, so like the landing craft and the fleet oiler these
   are shared rather than duplicated five ways. A minelayer carries a finite
   load and must go home for more; a clearing vehicle is slow, lightly armed
   and exists only to walk in front of everything else.

     layMines    how many it carries
     mineSea     lays moored sea mines instead of anti-tank mines
     mineDetect  tiles at which it reveals hostile mines
     mineClear   tiles within which it destroys them
     layNet      bottom acoustic nodes a submarine carries (see sonarnet.js)

   layNet is the same shape of field on a very different object. A node kills
   nothing, runs out of battery in four minutes, and is laid by a submarine
   through a torpedo tube in the Mk 60 CAPTOR / Mk 67 SLMM tradition. It is
   emphatically NOT shared five ways the way mines are. Nothing before the
   2000s has it at all: the deployable seabed field begins with the American
   Advanced Deployable System (1997-2006, cancelled) and matures as TRAPS,
   Russia fields Garmoniya seabed stations from the 2010s and China markets
   the Underwater Great Wall from 2015. The KPA and Taiwan never get it - a
   1950s Romeo at quiet 1.00 has no business laying a sensor network and
   Taiwan's two Hai Lung boats cannot lay anything - and those gaps are
   content, not defects to be patched.
   ========================================================== */
Object.assign(UNITS, {
  minelayer: { fac:"both", role:"minelayer", name:"Minelayer", full:"Armoured Mine-Laying Vehicle", cat:"vehicle",
    cost:700, oil:8, time:14, hp:620, armor:"light", speed:1.45, turn:1.8, sight:4.5, r:14, mass:26,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, layMines:10, mineDetect:2.2,
    desc:"Scatters anti-tank mines behind it. Ten to a load, then back to base for more. " +
         "A minefield does not have to kill anything to be worth laying \u2014 it decides where the enemy may drive." },
  mineclear: { fac:"both", role:"mineclear", name:"Mine Clearer", full:"Mine-Clearing Vehicle (plough and flail)", cat:"vehicle",
    cost:900, oil:10, time:16, hp:820, armor:"light", speed:1.25, turn:1.6, sight:5.0, r:14, mass:34,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, mineDetect:3.4, mineClear:1.7, mineClearRate:1.0,
    desc:"Finds mines further off than anything else and destroys them as it goes. Slow, thinly armed, " +
         "and the vehicle you put at the front of a column when you suspect the ground has been seeded." },

  navminelayer: { fac:"both", role:"navminelayer", name:"Mine Transport", full:"Naval Minelayer", cat:"naval",
    cost:1100, oil:14, time:18, hp:900, armor:"light", speed:2.6, turn:1.7, sight:7.0, r:16, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, layMines:10, mineSea:true, mineDetect:2.6,
    desc:"Rolls moored mines off the stern. A sea mine will not sink a carrier by itself, but a channel " +
         "that might be mined is a channel a fleet has to route around or sweep first." },
  minesweeper: { fac:"both", role:"minesweeper", name:"Minesweeper", full:"Mine Countermeasures Vessel", cat:"naval",
    cost:1300, oil:16, time:20, hp:780, armor:"light", speed:2.3, turn:1.6, sight:8.0, r:15, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1, mineDetect:5.0, mineClear:2.2, mineClearRate:1.2,
    desc:"Hunts and destroys sea mines ahead of the fleet. Without one, a mined approach has to be taken " +
         "by driving ships through it and finding out." },
});

/* ==================== SCATTERABLE-MINE AMMUNITION ====================
   Named OUTSIDE the w_<era>_<fac>_<role> scheme on purpose: generations.js
   rescales anything matching that pattern through ART_ERA_M, and a cargo
   round's range is derived from its HOST's finished figure instead.

   Every one carries `tgt` with all four layers cleared. That is not decoration
   - it is what makes the weapon invisible to pickWeapon, fireOtherMounts,
   canHurtLayer and Building.canTarget, so the only way it fires is an order
   naming its index. dmg is 0 for the same reason.

   The numbers are playable, not scaled, and it is worth saying why: this map
   runs at roughly 1.4 km to the tile, so a real AT2 footprint of 300 m by 150
   would be a fifth of a tile - smaller than one mine's own trigger radius.

     scatter    mines this round puts in the ground
     scatterR   radius in tiles, stretched 1.6:1 along the flight axis
     rangeMul   fraction of the HOST round's finished range
     mineDmg    per-mine damage. 130 against LAND's 200: a scattered mine lies
                on the surface at whatever attitude it landed in. Against a
                modern MBT that is about 374 points (22%) where a hand-laid one
                takes 576 (34%); against an IFV 328 (42%) against 504 (64%).
                A mobility-kill weapon, and it should be.
     mineArm    6.0 seconds. The LAND default of 3.0 would let a launcher drop a
                live field on a column already inside the footprint. THIS IS AN
                ARMING DELAY, NOT A LIFETIME. Nothing here expires.            */
Object.assign(WEAPONS, {
  /* --- rocket-delivered. eras.js stamps rocket:true on any arc round carried
     by an mlrs unit, so these are eligible for the arcRocket interception gate.
     In practice that gate engages only when something of the enemy's is
     standing within the round's own lethal radius of the aim point, because
     coverAt returns null on empty ground - and a minefield is sown on ground
     the enemy is NOT standing on. Stated honestly here and on the panel: the
     round is interceptable, but do not promise a defence that will not turn
     up. --- */
  scat_at2: { name:"AT2 scatterable mine rocket", dmg:0, warhead:"he",
    range:18.0, minRange:3.5, reload:26, burst:1, acc:0.55, proj:"arc",
    speed:250, aoe:1.4, scatter:8, scatterR:2.2, rangeMul:0.92,
    mineDmg:130, mineR:0.5, mineArm:6.0, tgt:{ground:0,air:0,sea:0,sub:0} },
  /* A 110mm LARS rocket is a smaller round on a smaller launcher. */
  scat_at2_lars: { name:"DM-711 AT2 mine rocket (110mm)", dmg:0, warhead:"he",
    range:16.0, minRange:3.0, reload:22, burst:1, acc:0.52, proj:"arc",
    speed:250, aoe:1.2, scatter:6, scatterR:1.8, rangeMul:0.85,
    mineDmg:125, mineR:0.5, mineArm:6.0, tgt:{ground:0,air:0,sea:0,sub:0} },
  scat_ptm3: { name:"9M55K4 mine-laying rocket", dmg:0, warhead:"he",
    range:18.0, minRange:3.5, reload:26, burst:1, acc:0.55, proj:"arc",
    speed:250, aoe:1.4, scatter:8, scatterR:2.4, rangeMul:0.92,
    mineDmg:130, mineR:0.5, mineArm:6.0, tgt:{ground:0,air:0,sea:0,sub:0} },
  /* A 122mm cargo rocket carries less and the launcher carries more of them.
     The designation is deliberately generic: the PLA capability is not in
     doubt, the round numbering is poorly attested, and the Type 84 proper is a
     dedicated mine-scattering VEHICLE rather than a round for the Type 81. */
  scat_cn122: { name:"122mm cargo mine rocket", dmg:0, warhead:"he",
    range:18.0, minRange:3.5, reload:22, burst:1, acc:0.52, proj:"arc",
    speed:250, aoe:1.2, scatter:6, scatterR:1.9, rangeMul:0.92,
    mineDmg:120, mineR:0.5, mineArm:6.0, tgt:{ground:0,air:0,sea:0,sub:0} },
  scat_cn300: { name:"PHL-03 mine-laying rocket", dmg:0, warhead:"he",
    range:18.0, minRange:3.5, reload:26, burst:1, acc:0.55, proj:"arc",
    speed:250, aoe:1.4, scatter:8, scatterR:2.4, rangeMul:0.92,
    mineDmg:130, mineR:0.5, mineArm:6.0, tgt:{ground:0,air:0,sea:0,sub:0} },

  /* --- gun-delivered. NOT registered in ROCKET_ROLES, so nothing intercepts
     it: nobody shoots down a 155mm shell. It carries half what a rocket does
     over half the footprint, reaches four fifths as far, and reloads faster.
     That is the honest trade for being unstoppable.
     M718 and M741 are BOTH RAAMS - the anti-armour family, nine mines each,
     M70 in the M718 and M73 in the M741. ADAM (M692/M731) is the ANTI-PERSONNEL
     family and has no place here at all, because Mines.threatens() refuses
     infantry outright. --- */
  scat_raams: { name:"M741 RAAMS 155mm cargo shell", dmg:0, warhead:"he",
    range:16.0, minRange:3.5, reload:16, burst:1, acc:0.62, proj:"arc",
    speed:210, aoe:1.0, scatter:5, scatterR:1.2, rangeMul:0.80,
    mineDmg:150, mineR:0.5, mineArm:6.0, tgt:{ground:0,air:0,sea:0,sub:0} },
});

/* ============================ PLA ROSTER ============================ */
Object.assign(UNITS, {
  rifle_c: { fac:"pla", role:"rifle", name:"Infantry Squad", full:"Rifle Squad, QBZ-191", cat:"infantry",
    cost:140, oil:0, time:4.4, hp:120, armor:"infantry", speed:1.07, turn:7, sight:5.8, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Well-drilled rifle squad with modern bullpup carbines and good digital comms." },
  mg_c: { fac:"pla", role:"mg", name:"QJY Weapons Team", full:"Weapons Team, QJY-201", cat:"infantry",
    cost:265, oil:0, time:6.6, hp:114, armor:"infantry", speed:0.82, turn:6, sight:6.0, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"Squad support machine gun team. Suppresses dismounted infantry across open ground." },
  at_c: { fac:"pla", role:"at", name:"Red Arrow Team", full:"AT Team, HJ-12 Red Arrow", cat:"infantry",
    cost:385, oil:0, time:8.7, hp:108, armor:"infantry", speed:0.88, turn:6, sight:7.1, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Fire-and-forget top-attack ATGM in the Javelin class. Ambush weapon, useless in the open." },
  aa_c: { fac:"pla", role:"aa", name:"FN-6 Team", full:"MANPADS Team, FN-6", cat:"infantry",
    cost:335, oil:0, time:7.7, hp:102, armor:"infantry", speed:0.9, turn:6, sight:7.9, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1,
    desc:"IR-homing shoulder SAM with a four-element seeker. Strictly anti-air." },
  mortar_c: { fac:"pla", role:"mortar", name:"PP-87 Mortar Team", full:"Mortar Section, PP-87 82mm", cat:"infantry",
    cost:460, oil:0, time:10.2, hp:103, armor:"infantry", speed:0.72, turn:6, sight:5.0, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true,
    desc:"82mm mortar section. Cheap indirect fire that still needs someone else's eyes." },
  sniper_c: { fac:"pla", role:"sniper", name:"QBU Sniper Team", full:"Sniper Team, QBU-10", cat:"infantry",
    cost:670, oil:0, time:13.2, hp:91, armor:"infantry", speed:0.78, turn:6, sight:10.2, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"12.7mm anti-materiel rifle. Kills infantry outright and spots for the guns." },

  recon_c: { fac:"pla", role:"recon", name:"Mengshi Scout", full:"CSK-131 Mengshi", cat:"vehicle",
    cost:385, oil:5, time:6.6, hp:360, armor:"light", speed:2.8, turn:3.1, sight:9.2, r:11, mass:6,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.3,
    desc:"Protected 4x4 scout with a remote weapon station. Fast eyes for the armoured push." },
  ifv_c: { fac:"pla", role:"ifv", name:"ZBD-04A", full:"ZBD-04A IFV", cat:"vehicle",
    cost:870, oil:10, time:13.4, hp:850, armor:"light", speed:1.78, turn:2.0, sight:7.2, r:14, mass:24,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:1.8, cargo:6,
    desc:"Tracked IFV with a 100mm gun-launcher and a 30mm autocannon. Carries six dismounts." },
  lt_c: { fac:"pla", role:"lighttank", name:"ZTQ-15 Black Panther", full:"ZTQ-15 Light Tank", cat:"vehicle",
    cost:735, oil:9, time:11.7, hp:760, armor:"light", speed:2.05, turn:2.4, sight:7.4, r:13, mass:35,
    layer:"ground", weapons:["gun_light"], prereq:["factory"], tech:1, turret:true, tturn:1.6,
    desc:"Highland light tank: a 105mm gun on a hull light enough for soft ground and mountain roads." },
  mbt_c: { fac:"pla", role:"mbt", name:"Type 99A", full:"ZTZ-99A MBT", cat:"vehicle",
    cost:1450, oil:21, time:21, hp:1800, armor:"heavy", speed:1.6, turn:1.55, sight:7.8, r:16, mass:58,
    layer:"ground", weapons:["gun_125"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.4, crush:true,
    desc:"125mm smoothbore, autoloader, welded composite turret. The backbone of the armoured corps." },
  hvy_c: { fac:"pla", role:"heavy", name:"Type 99A2 GL5", full:"ZTZ-99A2 w/ GL5 APS", cat:"vehicle",
    cost:2350, oil:37, time:31, hp:2500, armor:"heavy", speed:1.45, turn:1.4, sight:8.2, r:18, mass:60,
    layer:"ground", weapons:["gun_125"], prereq:["factory","lab"], tech:3, turret:true, tturn:1.45, crush:true, aps:0.42,
    desc:"Up-armoured Type 99 with the GL5 active protection system. Hard-kills 42% of incoming missiles." },
  /* The HJ-10 fibre-optic missile this vehicle carries first appeared in public
     in 2014, so from:"e80" put a 2014 weapon in a 1985 battle - and because
     DOMAIN_BITE in generations.js scales every round a unit carries by the
     unit's `from`, it was simultaneously being given 1980s ordnance quality.
     eras.js now carries the three machines that actually held this role:
     the HJ-73 carrier of 1979, the PTZ-89 gun of 1989 and the AFT-9 of 1999.
     e50 and e60 stay empty because the PLA had no vehicle-mounted anti-tank
     missile of any kind before the HJ-73. */
  atgmv_c: { from:"e20", fac:"pla", role:"tankdestroyer", name:"AFT-10", full:"AFT-10 ATGM Carrier", cat:"vehicle",
    cost:1080, oil:14, time:15.5, hp:650, armor:"light", speed:2.0, turn:2.2, sight:8.5, r:13, mass:22,
    layer:"ground", weapons:["atgm_veh"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.4,
    desc:"Fibre-optic guided missile carrier that can shoot from behind a ridge line." },
  spaag_c: { fac:"pla", role:"spaag", name:"PGZ-09", full:"PGZ-09 SPAAG", cat:"vehicle",
    cost:1020, oil:14, time:15, hp:820, armor:"light", speed:1.62, turn:1.9, sight:9.5, r:14, mass:35,
    layer:"ground", weapons:["spaag"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.6,
    desc:"Twin 35mm radar-directed AA on a tracked hull. Clears the sky over a moving column." },
  spg_c: { fac:"pla", role:"spg", name:"PLZ-05", full:"PLZ-05 155mm SPH", cat:"vehicle",
    cost:1470, oil:20, time:21.5, hp:800, armor:"light", speed:1.35, turn:1.5, sight:5.5, r:15, mass:35,
    layer:"ground", weapons:["howitzer"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.9,
    desc:"155mm/52 self-propelled howitzer with a long tube and an autoloader." },
  mlrs_c: { fac:"pla", role:"mlrs", name:"PHL-03", full:"PHL-03 300mm MRL", cat:"vehicle",
    cost:2150, oil:33, time:29.5, hp:710, armor:"light", speed:1.3, turn:1.3, sight:5.5, r:15, mass:43,
    layer:"ground", weapons:["mlrs","scat_cn300"], dispenser:6,
    prereq:["factory","lab"], tech:3, turret:true, tturn:0.8,
    desc:"Twelve 300mm rockets. One salvo saturates a grid square and everything standing in it. Also fires a cargo round that lays an anti-tank minefield; Chinese designations for these are poorly attested in open sources, the capability is not." },

  helo_c: { fac:"pla", role:"gunship", name:"Z-10", full:"Z-10ME Attack Helicopter", cat:"aircraft",
    cost:1570, oil:25, time:21.5, hp:640, armor:"air", speed:3.55, turn:2.2, sight:9.2, r:16, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    desc:"Narrow-profile attack helicopter with mast-mounted sight and HJ-10 missiles." },
  trans_c: { fac:"pla", role:"transport", name:"Z-20", full:"Z-20 Transport Helicopter", cat:"aircraft",
    cost:880, oil:14, time:13.5, hp:545, armor:"air", speed:4.1, turn:2.4, sight:8, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:9, ammo:0,
    desc:"Medium-lift helicopter carrying nine. Flies infantry over the front line and onto an objective." },
  fighter_c: { fac:"pla", role:"fighter", name:"J-10C", full:"J-10C Vigorous Dragon", cat:"aircraft",
    cost:1380, oil:29, time:19.5, hp:430, armor:"air", speed:8.7, turn:1.95, sight:10.8, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    desc:"Multirole fighter flying air-superiority loadout with AESA radar and PL-15 missiles." },
  bomber_c: { fac:"pla", role:"cas", name:"JH-7A", full:"JH-7A Flying Leopard", cat:"aircraft",
    cost:1950, oil:39, time:27.5, hp:780, armor:"air", speed:5.7, turn:1.5, sight:8.8, r:17, mass:0,
    layer:"air", weapons:["jdam","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6,
    desc:"Two-seat strike fighter hauling guided bombs onto hardened targets." },

  boat_c: { fac:"pla", role:"patrol", name:"Type 022 Houbei", cat:"naval",
    cost:485, oil:6, time:8.7, hp:540, armor:"light", speed:3.5, turn:2.3, sight:8.2, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.4,
    desc:"Wave-piercing catamaran missile boat, here in its gun-armed patrol fit. Very fast." },
  corvette_c: { fac:"pla", role:"corvette", name:"Type 056 Jiangdao", cat:"naval",
    cost:1175, oil:16, time:15.5, hp:1190, armor:"light", speed:2.85, turn:1.7, sight:9.2, r:17, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1, turret:true, tturn:2.0,
    desc:"Light frigate built in quantity for coastal defence. A 76mm mount and a solid hull." },
  missileboat_c: { fac:"pla", role:"missileboat", name:"Type 022 (YJ-83)", cat:"naval",
    cost:1470, oil:21, time:18.5, hp:920, armor:"light", speed:3.2, turn:1.85, sight:8.8, r:16, mass:0,
    layer:"sea", weapons:["ssm"], prereq:["navalyard","radar"], tech:2,
    desc:"Eight YJ-83 anti-ship missiles on a stealth catamaran. Fires, then runs before the reply lands." },
  destroyer_c: { fac:"pla", role:"destroyer", name:"Type 052D Luyang III", cat:"naval",
    cost:2180, oil:33, time:27.5, hp:2180, armor:"heavy", speed:2.35, turn:1.2, sight:10.8, r:20, mass:0,
    layer:"sea", weapons:["navgun_127","sam_ship","depthchg"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.52, sonar:7,
    desc:"AESA-equipped destroyer with 64 VLS cells, a 130mm gun, towed sonar and a CIWS mount." },
  cruiser_c: { fac:"pla", role:"cruiser", name:"Type 055 Renhai", cat:"naval",
    cost:3450, oil:59, time:42, hp:3000, armor:"heavy", speed:2.05, turn:0.9, sight:12, r:23, mass:0,
    layer:"sea", weapons:["navgun_203","sam_ship"], prereq:["navalyard","lab"], tech:3,
    turret:true, tturn:1.0, ciws:0.62, shoreBombard:true,
    desc:"112-cell guided missile cruiser. The heaviest surface combatant afloat and a superb shore bombardment platform." },
  sub_c: { fac:"pla", role:"sub", name:"Type 039A Yuan", cat:"naval",
    cost:2300, oil:38, time:29, hp:1210, armor:"light", speed:2.15, turn:1.1, sight:8.2, r:17, mass:0,
    layer:"sub", weapons:["torpedo"], prereq:["navalyard","radar"], tech:2, submerged:true,
    layNet:4,
    desc:"Air-independent-propulsion attack submarine. Sits silent on a shipping lane and empties its tubes. " +
         "Carries four Underwater Great Wall nodes — a programme marketed since 2015 and taken seriously." },
  carrier_c: { fac:"pla", role:"carrier", name:"Type 003 Fujian", cat:"naval",
    cost:4900, oil:108, time:59, hp:4300, armor:"heavy", speed:1.6, turn:0.6, sight:13.5, r:30, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard","lab","airbase"], tech:3, ciws:0.6, carrier:4,
    desc:"Catapult-equipped supercarrier. Four aircraft rearm and refuel at sea, wherever you sail it." },
});

/* ============================ LOGISTICS ============================
   Supply trucks are the spine of the whole force. Without them, an armoured
   push runs dry two thirds of the way to the objective and stops dead.       */
Object.assign(UNITS, {
  supply_n: { fac:"nato", role:"supply", name:"HEMTT Supply Truck", full:"M977 HEMTT", cat:"vehicle",
    cost:700, oil:6, time:11, hp:600, armor:"light", speed:1.9, turn:2.0, sight:6, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:900, supplyRange:5.0,
    desc:"Rolling fuel and ammunition point. Refuels and rearms anything within five tiles, then drives back to a depot to reload." },
  supply_p: { fac:"pact", role:"supply", name:"KamAZ Supply Truck", full:"KamAZ-6350", cat:"vehicle",
    cost:650, oil:6, time:10, hp:640, armor:"light", speed:1.95, turn:2.0, sight:6, r:14, mass:15,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:900, supplyRange:5.0,
    desc:"8x8 logistics truck hauling fuel bladders and ammunition pallets to the forward edge." },
  supply_c: { fac:"pla", role:"supply", name:"Shaanxi Supply Truck", full:"SX2306 Logistics Truck", cat:"vehicle",
    cost:660, oil:6, time:9.5, hp:630, armor:"light", speed:1.95, turn:2.0, sight:6, r:14, mass:15,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:1000, supplyRange:5.2,
    desc:"High-mobility logistics truck. Carries a heavier load than its NATO equivalent." },

  oiler: { from:"e50", fac:"both", role:"oiler", name:"Fleet Oiler", full:"Replenishment Oiler", cat:"naval",
    cost:1300, oil:10, time:18, hp:1400, armor:"light", speed:2.0, turn:1.0, sight:7, r:22, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard"], tech:2, supply:2000, supplyRange:6.0,
    desc:"Underway replenishment ship. Keeps a fleet fuelled and armed far from any friendly port — fragile, and worth killing." },
});

/* ============================ SENSORS & STEALTH ============================
   RADAR: units and structures with a `radar` value project a sensor bubble.
   Firing at a target that lies outside your own eyesight is far more accurate
   inside friendly radar coverage than blind (see Combat.sensorFactor).
   STEALTH: low-observable airframes defeat radar-guided missiles outright a
   fraction of the time, and cannot be acquired at full range.                */
Object.assign(WEAPONS, {
  aam_lo:   { name:"AIM-260 (LO)", dmg:230, warhead:"flak", range:11.0, reload:2.8, burst:1,
              acc:0.92, proj:"missile", speed:760, aoe:0.8, ammo:1, tgt:{ground:0,air:1,sea:0,sub:0} },
  /* What fits in a fighter's internal bay. A Raptor really does carry two
     1000lb JDAM or eight small-diameter bombs alongside its missiles; giving it
     nothing at all against the ground made the most expensive fighter in the
     game useless the moment the sky was clear. Deliberately weak - one light
     pass - so it is a target of opportunity, not a substitute for a bomber. */
  sdb:      { name:"small-diameter bomb", dmg:210, warhead:"he", range:2.4, reload:2.0, burst:2,
              burstDelay:0.3, acc:0.90, proj:"bomb", speed:0, aoe:1.6, suppress:45, ammo:1,
              tgt:{ground:1,air:0,sea:1,sub:0} },
  jdam_hvy: { name:"2000lb JDAM", dmg:520, warhead:"he", range:3.0, reload:1.2, burst:2, burstDelay:0.4,
              acc:0.94, proj:"bomb", speed:0, aoe:3.4, suppress:110, ammo:2, tgt:{ground:1,air:0,sea:1,sub:0} },
  alcm:     { name:"KD-20 cruise missile", dmg:430, warhead:"he", range:9.0, minRange:2.0, reload:7.0, burst:1,
              acc:0.90, proj:"missile", speed:360, aoe:2.6, suppress:70, ammo:1, tgt:{ground:1,air:0,sea:1,sub:0} },
});

Object.assign(UNITS, {
  /* ---- radar vehicles: mobile sensor coverage for the whole force ---- */
  radarv_n: { from:"e80", fac:"nato", role:"radarv", name:"TPQ-53 Radar", full:"AN/TPQ-53 Radar Vehicle", cat:"vehicle",
    cost:1200, oil:12, time:16, hp:520, armor:"light", speed:1.7, turn:1.8, sight:9, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, radar:15, turret:true, tturn:0.9,
    desc:"Mobile phased-array radar. Projects a 15-tile sensor bubble: artillery, SAMs and missile boats firing inside it hit far more often. Unarmed and fragile — keep it behind the line." },
  radarv_p: { fac:"pact", role:"radarv", name:"Zoopark-1", full:"1L219 Zoopark-1 Radar", cat:"vehicle",
    cost:1150, oil:12, time:15, hp:560, armor:"light", speed:1.65, turn:1.8, sight:9, r:14, mass:15,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, radar:14.5, turret:true, tturn:0.9,
    desc:"Tracked counter-battery radar. Extends accurate fire support across the front and spots for the guns." },
  radarv_c: { from:"e90", fac:"pla", role:"radarv", name:"SLC-2 Radar", full:"SLC-2 Artillery Radar", cat:"vehicle",
    cost:1150, oil:12, time:14.5, hp:540, armor:"light", speed:1.7, turn:1.8, sight:9, r:14, mass:15,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, radar:15.5, turret:true, tturn:0.9,
    desc:"Truck-mounted array with the widest coverage of its class. The backbone of PLA fire control." },

  /* ---- stealth fighters: radar-guided missiles struggle to hold a lock ---- */
  stealth_n: { fac:"nato", role:"stealthfighter", name:"F-22 Raptor", full:"F-22A Raptor", cat:"aircraft",
    cost:2600, oil:48, time:34, hp:520, armor:"air", speed:9.6, turn:2.4, sight:12.5, r:16, mass:0,
    layer:"air", weapons:["aam_lo","sdb"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6, stealth:0.65,
    desc:"Low-observable air dominance fighter. 65% of radar-guided missiles lose the lock, and SAMs cannot engage it until it is close. Supercruise makes it the fastest thing in the sky. Carries a pair of small-diameter bombs in the side bays for targets of opportunity - not a strike aircraft, but not helpless over a ground target either." },
  stealth_p: { fac:"pact", role:"stealthfighter", name:"Su-57 Felon", full:"Su-57 Felon", cat:"aircraft",
    cost:2450, oil:46, time:32, hp:600, armor:"air", speed:9.4, turn:2.7, sight:11.5, r:16, mass:0,
    layer:"air", weapons:["aam_lo","sdb"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6, stealth:0.22,
    desc:"Fifth-generation fighter, but only frontally low-observable — the engine faces and shaping fall well short of true VLO, so it defeats far fewer missiles than a Raptor. Compensates with thrust vectoring: the best turn rate in the game." },
  stealth_c: { fac:"pla", role:"stealthfighter", name:"J-20 Mighty Dragon", full:"J-20A Mighty Dragon", cat:"aircraft",
    cost:2500, oil:47, time:32, hp:540, armor:"air", speed:9.5, turn:2.3, sight:12.0, r:16, mass:0,
    layer:"air", weapons:["aam_lo","sdb"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6, stealth:0.60,
    desc:"Long-range stealth interceptor with canard-delta agility and a deep internal weapons bay." },

  /* ---- stealth bombers: the base-killers ---- */
  sbomber_n: { fac:"nato", role:"stealthbomber", name:"B-2 Spirit", full:"B-2A Spirit", cat:"aircraft",
    cost:4200, oil:90, time:52, hp:900, armor:"air", speed:5.2, turn:1.2, sight:11, r:22, mass:0,
    layer:"air", weapons:["jdam_hvy"], prereq:["airbase","lab"], tech:3, jet:true, ammo:8, stealth:0.75,
    desc:"Flying-wing strategic bomber. Practically invisible to missiles — 75% of them never acquire it — and it removes a base block per pass. Enormously expensive and slow to replace. Its magazine used to hold four, which at two rounds a pass is two bombs for a 4,200-credit aircraft that flies halfway across the map to deliver them; the real thing carries sixteen." },
  /* No other nation fields an operational stealth bomber, so the Eastern and
     PLA heavy-bomber slots go to real in-service aircraft that solve the same
     problem differently: raw speed, and standoff range.                      */
  sbomber_p: { fac:"pact", role:"heavybomber", name:"Tu-160M Blackjack", full:"Tu-160M Blackjack", cat:"aircraft",
    cost:3800, oil:95, time:50, hp:1150, armor:"air", speed:9.8, turn:0.85, sight:10.5, r:24, mass:0,
    layer:"air", weapons:["jdam_hvy"], prereq:["airbase","lab"], tech:3, jet:true, ammo:8,
    desc:"The largest and fastest combat aircraft ever built — supersonic, swing-wing and heavily armoured, but NOT stealthy. It survives by crossing defended airspace faster than the SAMs can solve the problem." },
  sbomber_c: { fac:"pla", role:"heavybomber", name:"H-6N", full:"Xian H-6N", cat:"aircraft",
    cost:3500, oil:80, time:46, hp:880, armor:"air", speed:4.4, turn:1.0, sight:12.5, r:22, mass:0,
    layer:"air", weapons:["alcm"], prereq:["airbase","lab"], tech:3, jet:true, ammo:4,
    desc:"Standoff cruise-missile carrier. No stealth and slow, but it never has to enter the threat ring: it launches heavy air-launched cruise missiles from nine tiles out. The missiles themselves can be shot down by CIWS." },
});

/* radar fits on existing platforms */
UNITS.destroyer_n.radar = 12; UNITS.destroyer_p.radar = 11; UNITS.destroyer_c.radar = 12;
UNITS.cruiser_n.radar = 15;   UNITS.cruiser_p.radar = 14;   UNITS.cruiser_c.radar = 15.5;
UNITS.carrier_n.radar = 16;   UNITS.carrier_p.radar = 14;   UNITS.carrier_c.radar = 16;
UNITS.spaag_n.radar = 8;      UNITS.spaag_p.radar = 8;      UNITS.spaag_c.radar = 8;

/* ============ STRATEGIC EARLY WARNING AND FIXED ELECTRONIC WARFARE ============

   Two new families, and the first faction-gated STRUCTURES in the game. Three
   fields on a BUILDINGS entry are new and all three are read in exactly the
   places listed here, so a fourth family can be added later without touching
   an engine file again:

     fac      the army that operated the thing. player.js lockReason() refuses
              it to anybody else and ui.js never draws the card, exactly the
              way both already work for a UNIT.
     srole    what job it does, and the opt-in for era gating. Structures are
              exempt from inEra() as a class because rules.js stamps
              from:"e50" on all of them; `srole` is a field that blanket stamp
              cannot forge, so an entry carrying one is held to its real
              service window. structureFor() also indexes on it.
     bare     render3d.js runs neither restyle() nor archFixture() nor
              eraFixture() over this model. A national radar array is the same
              Raytheon concrete for everybody who bought it, and the period
              rooftop kit is actively wrong here: the e80 fixture is a
              camouflage net sized to the plot, which on a 3x3 is 49 m square
              and lands ON the array faces, and the e00/e20 fixture is a white
              radome, which is the one thing a phased array is not.

   THE LADDER IS THE HISTORY AND THE GAPS ARE THE POINT.

     strategic array   NATO e80  PACT e80  PLA e00  ROC e20  KPA never
     radar jamming     NATO e80  PACT e80  PLA e00  ROC e00  KPA never
     satellite denial  KPA  e00  PACT e20  everybody else never

   In 1980 exactly two armies on this map could see a ballistic launch, which
   is how it was. The KPA has a launcher in four eras and no way to see
   anybody else's, and gets instead the one axis it is genuinely good at.
   Nobody at all has any of this in the 1950s or the 1960s.

   THREE DATES WORTH THE OWNER'S EYE, all following the agreed ladder rather
   than the game's own era table, and all a one-word edit either way:
     Leshan was operational in February 2013 and Murmansk-BN entered service
     in 2014, both of which fall inside e00 ("2000s-10s") by ERA_INFO; the
     agreed ladder puts them in e20 and that is what is written here.
     The SPN-2/SPN-4 and the AN/TLQ-17A are 1970s equipment, which is e60 by
     ERA_INFO; the agreed ladder puts them at e80 and that is what is written
     here, dated to the period of widest fielded service - SPN-30 from the
     1980s, Traffic Jam in Grenada in 1983 and Desert Storm in 1991.
   ========================================================================= */
Object.assign(BUILDINGS, {

  /* ------------------- strategic early-warning arrays ------------------- */

  /* WHAT `ew` IS AND WHAT IT IS NOT. `radar` is the general picture: it lifts
     fog, sharpens fire control and answers G.radarCovers. `ew` is a second,
     narrower sensor read in exactly one place - G.updateCounterBattery - and
     it answers one question, whether a BALLISTIC round was fired from that
     square. It lifts no fog, feeds no shooter and is worth nothing at all to
     a commander nobody is shooting ballistic missiles at.

     WHY THIRTY TILES. The launchers reach 24.0 (srbm_early) to 31.0
     (srbm_p2), the radar dome reaches 22, and CFG.BUILD_RADIUS is 11 - so a
     TEL firing into your base from 27 tiles is usually outside the dome's
     circle and the counter-battery plot simply never happens. Thirty tiles
     centred on your own base closes that and leaves a Pershing II at
     absolute maximum range still able to beat it.

     IT IS NOT AN INTERCEPT. A ballistic round covers 27 tiles in about 1.3
     seconds and the plot lands at 2.0. The warning always arrives after the
     impact. What the plot buys is the LAUNCHER: a TEL deploys in 3 to 9
     seconds and reloads in 55 to 95, so a fix that lands two seconds after
     launch and lives for twenty-eight lands while the vehicle is still on
     its firing point. Interception is a PAC-3 or an S-400 battery's job and
     the descs say so.

     radarQ is a second-order benefit and is described as one. G.radarReach is
     radarQ * rcs^0.25 and G.airTrack then multiplies by FACTIONS[].datalink,
     so against a stealth airframe at rcs 0.004 a NATO array holds it at
     32*0.25*1.00 = 8.0 tiles against the prereq radar dome's 6.5 - about a
     tile and a half, standing in the same base. Worth having, not worth a
     headline, and no card claims otherwise.

     hp is in the strategic-silo band, not the radar dome's. combat.js triples
     anti-radiation damage against an emitter, so a 210-point HARM lands 630 -
     at 1,400 a single four-round Weasel pass deleted the most expensive
     structure in the game. At 2,000 it survives one package and dies to two,
     which is the loop these are priced for. */

  lpar_n: { name:"PAVE PAWS Array", full:"AN/FPS-115 PAVE PAWS", cat:"building",
    fac:"nato", srole:"lpar", bare:true, from:"e80",
    service:"1980", confidence:"high",
    cost:2800, time:34, w:3, h:3, hp:2000, armor:"structure",
    power:-110, sight:6, tech:3, prereq:["lab","radar"], needPower:true,
    radar:26, radarQ:32, ew:30,
    desc:"Two thirty-one-metre octagonal faces of 1,792 UHF elements, raked twenty degrees " +
         "back on a concrete pyramid. Otis Air Force Base, April 1980. This is not a bigger " +
         "radar dome: what it adds is a thirty-tile BALLISTIC BACK-PLOT that fixes the launch " +
         "point of any ballistic round fired at you, two seconds after launch. It will not " +
         "intercept the round - that is what a Patriot battery is for, and by the time this " +
         "array speaks the round is already down. It will get you the launcher before it has " +
         "packed up and driven away. A second array widens the ground covered; it does not " +
         "deepen it. And it transmits: every anti-radiation missile in the theatre triples " +
         "its damage against this building, and it joins your radar dome and your SAM sites " +
         "in the class every Wild Weasel is bought to hunt." },

  lpar_p: { name:"Daryal Array", full:"5N79 Daryal (NATO: Pechora)", cat:"building",
    fac:"pact", srole:"lpar", bare:true, from:"e80",
    service:"1984", confidence:"high",
    cost:3000, time:44, w:3, h:3, hp:2200, armor:"structure",
    power:-130, sight:6, tech:3, prereq:["lab","radar"], needPower:true,
    radar:24, radarQ:28, ew:32,
    desc:"A bistatic pair - a forty-metre transmitter and a separate eighty-metre receiver - " +
         "at the end of a line that began with the Dnestr Hen House sets in 1971 and ends " +
         "with Voronezh in 2006. Pechora, Komi, 1984; Gabala the year after. The longest " +
         "ballistic BACK-PLOT in this war at thirty-two tiles, and the shortest air-search " +
         "picture of the four, which is the trade the real machines made: enormous apertures " +
         "and antique processing. It will fix a launcher for you two seconds after the round " +
         "is away. Getting that plot to a shooter is a separate problem this army has never " +
         "solved." },

  lpar_c: { name:"Strategic LPAR", full:"Large phased-array EW radar, Type 7010 lineage",
    cat:"building", fac:"pla", srole:"lpar", bare:true, from:"e00",
    service:"1976 / 2000s", confidence:"medium",
    cost:2900, time:36, w:3, h:3, hp:2000, armor:"structure",
    power:-115, sight:6, tech:3, prereq:["lab","radar"], needPower:true,
    radar:25, radarQ:30, ew:30,
    desc:"The Type 7010 was cut into a mountainside at Huangyangshan, went into service in " +
         "1976 and tracked Skylab coming down in 1979. It was one experimental set in a hill; " +
         "the network that replaced it is a 2000s programme, and that is when this becomes " +
         "something a commander can buy. Thirty tiles of ballistic BACK-PLOT: a launch inside " +
         "that circle gives up the launcher's position two seconds after it fires. It will " +
         "not stop the round. It also holds a low-observable airframe a little further out " +
         "than a radar dome does - about a tile, which is worth having and is not why you " +
         "are buying it." },

  lpar_r: { name:"Leshan PAVE PAWS", full:"AN/FPS-115 PAVE PAWS, Leshan", cat:"building",
    fac:"roc", srole:"lpar", bare:true, from:"e20",
    service:"2013", confidence:"high",
    cost:3600, time:40, w:3, h:3, hp:2000, armor:"structure",
    power:-110, sight:6, tech:3, prereq:["lab","radar"], needPower:true,
    radar:26, radarQ:32, ew:30,
    desc:"The same Raytheon array the Americans built, single-faced, on a 2,620-metre ridge " +
         "in Hsinchu County. Approved in 2000, contracted in 2005 after a two-year suspension " +
         "over the overrun, accepted in 2012, operational in February 2013, and at about 1.4 " +
         "billion dollars the most expensive radar ever built - which is the price on this " +
         "card. Thirty tiles of ballistic BACK-PLOT. It fires nothing and it stops nothing. " +
         "It tells you where the launcher is standing, two seconds after it shoots, and for " +
         "an army with no ballistic launcher of its own that has to be enough." },

  /* ------------------------ fixed jamming sites ------------------------- */

  /* Three things are true of every entry below and every card says all three,
     because none of them is guessable from the numbers.

     1. IT DEFENDS. CFG.BUILD_RADIUS is 11 tiles from your own structures, so
        a station built in your base can never reach anybody else's. What it
        reaches is the air and ground over YOUR plot: it burns down the picture
        of any radar platform that comes to you, and because G.jamAt() is keyed
        on the SHOOTER's position it blunts every radar-laid shot fired from
        inside the bubble.
     2. TWO OF THEM DO NOTHING. G.jamAgainst() and G.jamAt() take the WORST
        bubble over a point and never the sum. A second station on the same
        ground is money set on fire.
     3. IT IS A BEACON. combat.js makes anything with def.jam an EMITTER and
        entities.js weights an emitter at 0.06x distance for a shooter carrying
        an anti-radiation missile. Site it inside the SAM belt, not outside it.

     jamPower IS CALIBRATED FOR THE CROSS-ERA CASE, which is the one that bites:
     the game lets each side pick its era independently. Peak effect is
     jamPower * FACTIONS[jammer].ecm / FACTIONS[victim].eccm, times genContest.
     At the top of this family that is 0.72 * 0.95 / 1.20 = 0.57 against a NATO
     set of the same generation - so k > 0.55 only inside 20 per cent of the
     radius, about two and a half tiles. A radar platform has to fly right over
     the station to be switched off, and only a genuine generational gap
     switches one off at range. The existing jamming VEHICLES sit at jamPower
     0.85 to 0.9 and blind a contemporary set outright at close range; the fixed
     site trades that punch for a bubble half again as wide and for never being
     caught out of position, which is the honest difference between a truck and
     a transmitter hall. */

  ewsite_n: { name:"Electronic Attack Shelter", full:"AN/TLQ-17A ground electronic attack site",
    cat:"building", fac:"nato", srole:"ewsite", bare:true, from:"e80",
    service:"1970s", confidence:"high",
    cost:1250, time:16, w:2, h:2, hp:900, armor:"structure",
    power:-70, sight:6, tech:2, prereq:["radar"], needPower:true,
    jam:10.0, jamPower:0.55,
    desc:"A transportable shelter, a guyed mast and one broadband array - and that is the " +
         "whole station, because American electronic attack has lived in the air since the " +
         "EB-66: Prowler 1971 (Navy to 2015, Marine Corps to 2019), Compass Call 1983, " +
         "Growler 2009. The ground half was Traffic Jam, fielded in the mid-1970s and taken " +
         "to Grenada and Desert Storm, and the Army then disbanded most of its ground " +
         "electronic warfare in the 1990s and did not begin rebuilding until after 2015 - so " +
         "this is still the 1980s shelter in the 2020s and a modern radar walks through it. " +
         "It denies the spectrum over your own ground only: it cannot reach their base. A " +
         "second one adds nothing, because only the strongest bubble over a point counts. " +
         "And it emits, so anti-radiation missiles come for it first." },

  ewsite_p: { name:"SPN-4 Jamming Station", full:"SPN-4 front-aviation jamming station",
    cat:"building", fac:"pact", srole:"ewsite", bare:true, from:"e80",
    service:"1970s-80s", confidence:"high",
    cost:1500, time:19, w:2, h:2, hp:950, armor:"structure",
    power:-95, sight:6, tech:2, prereq:["radar"], needPower:true,
    jam:14.0, jamPower:0.72,
    desc:"Trough reflectors on a common turntable, screaming across the bands that airborne " +
         "fire-control and side-looking radars work in. The SPN-2 and SPN-4 of the 1970s and " +
         "the SPN-30 that followed them were built to meet NATO air power at the forward " +
         "edge, they were relocatable sets emplaced on a prepared site for months at a time, " +
         "and they are the strongest fixed jamming anywhere. The widest bubble in the game. " +
         "It blinds radar platforms that come to YOU and ruins radar-laid shooting from " +
         "inside it; it cannot reach their base. A second station buys nothing. It is a HARM " +
         "magnet: site it inside your SAM belt." },

  ewsite_c: { name:"Electronic Countermeasures Station",
    full:"PLA fixed electronic countermeasures site",
    cat:"building", fac:"pla", srole:"ewsite", bare:true, from:"e00",
    service:"1970s / 2018", confidence:"high",
    cost:1600, time:20, w:2, h:2, hp:950, armor:"structure",
    power:-100, sight:6, tech:2, prereq:["radar"], needPower:true,
    jam:13.0, jamPower:0.58,
    desc:"Two rotatable log-periodic arrays on a hardened hall. The PLA has run fixed " +
         "electronic countermeasures units under its Fourth Department since the 1970s; what " +
         "can be pointed at is newer and it is on the map - in April 2018 the US Defense " +
         "Department confirmed communications and radar jamming equipment installed on " +
         "Mischief Reef and Fiery Cross Reef. It wins the spectrum over your own ground " +
         "before the shooting starts, and cannot reach theirs. Only the strongest bubble over " +
         "a point counts, so one is enough. Anything carrying an anti-radiation missile comes " +
         "for it first." },

  ewsite_r: { name:"Electronic Warfare Post", full:"ICEFCOM fixed electronic warfare post",
    cat:"building", fac:"roc", srole:"ewsite", bare:true, from:"e00",
    service:"2017", confidence:"medium",
    cost:1400, time:18, w:2, h:2, hp:900, armor:"structure",
    power:-75, sight:6, tech:2, prereq:["radar"], needPower:true,
    jam:9.5, jamPower:0.50,
    desc:"American equipment, revetted, on an island that has fortified everything for " +
         "seventy years. Taiwan's electronic warfare units were gathered under the " +
         "Information, Communications and Electronic Force Command on 29 June 2017, often " +
         "described as a fourth service; before that the visible fleet was airborne and " +
         "small, the C-130HE Tien Ken of the 1990s. There is no Taiwanese strategic jamming " +
         "programme and this does not pretend to be one - a modest, well-protected, purely " +
         "defensive bubble over your own ground, and the weakest station in the game. One " +
         "only; the sum of two is not a thing." },

  /* --------------------- satellite navigation denial -------------------- */

  /* Jamming a radar and jamming GPS are not the same act and must not share a
     number. A radar jammer fights a transmitter that is looking for it and
     hopping to get away; a GPS jammer sits on a band that has not moved since
     1978 and shouts down a receiver listening for about a hundred attowatts
     from twenty thousand kilometres up. That is why the second is so much
     easier than the first, why an army that cannot build a decent radar jammer
     can still do it well, and why North Korea - behind on every other sensor
     axis in this game - is the one nation whose jamming has repeatedly closed
     an adversary's airspace in peacetime.

     So it has its own field (gpsJam radius, gpsPower strength), its own
     hardening term (FACTIONS.*.gpsHard, which is keyed military GPS and a
     null-steering antenna on the round, not radar ECCM), and it is deliberately
     outside genContest. Same worst-bubble-never-the-sum rule as the other two,
     for the same physical reason. It is read by G.supportScatter, so an off-map
     precision mission called onto ground you have denied scatters badly, and
     ui.js and render3d.js both show the bubble and the effect. */

  ewsite_k: { name:"GPS Jamming Station", full:"KPA satellite navigation jamming site",
    cat:"building", fac:"kpa", srole:"gpsjam", bare:true, from:"e00",
    service:"2010", confidence:"high",
    cost:900, time:13, w:2, h:2, hp:800, armor:"structure",
    power:-45, sight:5, tech:2, prereq:["radar"], needPower:true,
    jam:6.0, jamPower:0.35, gpsJam:16.0, gpsPower:1.00,
    desc:"A truck backed into a revetment under camouflage netting, and four little crossed " +
         "dipoles on a stick. Against radar it is nearly worthless: it never switches a " +
         "contemporary set off at any range, it only degrades one within about three tiles. " +
         "Against satellite navigation it is the widest and most effective station in the " +
         "game, and that is not a balance decision - North Korea jammed GPS over the South in " +
         "August 2010, in March 2011, from 28 April to 13 May 2012 (about 1,016 aircraft and " +
         "254 vessels affected) and from 31 March to 5 April 2016 (about 1,000 aircraft and " +
         "700 vessels), from sites near Kaesong and Haeju. Precision missions called onto " +
         "your base scatter badly. One is enough; and it still emits, so it still draws the " +
         "anti-radiation missiles." },

  ewsite_p2: { name:"Murmansk-BN Station", full:"Murmansk-BN HF jamming complex, with Pole-21",
    cat:"building", fac:"pact", srole:"gpsjam", bare:true, from:"e20",
    service:"2014", confidence:"high",
    cost:2200, time:27, w:2, h:2, hp:1000, armor:"structure",
    power:-110, sight:7, tech:3, prereq:["radar","lab"], needPower:true,
    jam:6.0, jamPower:0.40, gpsJam:12.0, gpsPower:0.90,
    desc:"In service 2014 and genuinely emplaced: telescopic masts of some thirty-two metres " +
         "carrying wire curtains, at Kaliningrad, in Crimea and on Kamchatka. Read carefully, " +
         "because the name is more famous than the job - Murmansk-BN jams the HF " +
         "COMMUNICATIONS band, not radar, and the 5,000 km quoted for it is a Russian claim. " +
         "Against a radar picture it does almost nothing and this card will not pretend " +
         "otherwise. What it denies is the other half of the spectrum, and a separate " +
         "GNSS-jamming set (Pole-21, fielded around 2016, mounted on mast infrastructure) is " +
         "emplaced on the same ground: precision missions called onto your base lose their " +
         "coordinates. Pair it with an SPN-4 - they are two machines doing two jobs and they " +
         "do combine, which nothing else in this family does." },
});

/* ============================ STRATEGIC WEAPONS ============================ */
Object.assign(BUILDINGS, {
  missilesilo: { name:"Missile Silo", cat:"defense", cost:3500, time:40, w:2, h:2, hp:1200, armor:"structure",
    power:-90, sight:6, tech:3, prereq:["lab","radar"], needPower:true,
    superweapon: { key:"conv", label:"BALLISTIC MISSILE", charge:240, dmg:950, aoe:5.0,
                   warhead:"he", flight:7, alert:"MISSILE LAUNCH DETECTED" },
    desc:"Hardened silo holding a conventional ballistic missile. Charges over four minutes, then flattens a base block anywhere on the map. Needs steady power." },
  nukesilo: { name:"Strategic Silo", cat:"defense", cost:6000, oil:150, time:60, w:3, h:3, hp:1600, armor:"structure",
    power:-150, sight:7, tech:3, prereq:["lab","missilesilo"], needPower:true,
    superweapon: { key:"nuke", label:"NUCLEAR MISSILE", charge:420, dmg:3200, aoe:9.0,
                   warhead:"nuclear", flight:10, nuke:true, alert:"NUCLEAR LAUNCH DETECTED" },
    desc:"Nuclear-tipped ICBM. Seven minutes to charge, and the strike erases everything inside nine tiles. Both sides are warned the moment it flies." },
});
BUILDINGS.radar.radar = 22;
BUILDINGS.airbase.radar = 11;
BUILDINGS.sam.radar = 15;
BUILDINGS.flak.radar = 9;

/* ==================== KOREAN PEOPLE'S ARMY (KPA) ====================
   Doctrine: overwhelm with numbers and shells. Almost everything is a
   1960s-70s design kept in service by sheer stubbornness, so the kit is
   cheap and plentiful but out-ranged and out-aimed by anything modern.
   The exception is the artillery, which is genuinely fearsome.           */
Object.assign(UNITS, {
  rifle_k: { fac:"kpa", role:"rifle", name:"Infantry Squad", full:"Rifle Squad, Type 88", cat:"infantry",
    cost:95, oil:0, time:3.2, hp:112, armor:"infantry", speed:1.08, turn:7, sight:5.0, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Conscript riflemen with helical-magazine Kalashnikov copies. Individually poor; there are simply always more of them." },
  mg_k: { fac:"kpa", role:"mg", name:"Type 73 Team", full:"Weapons Team, Type 73 LMG", cat:"infantry",
    cost:185, oil:0, time:4.8, hp:108, armor:"infantry", speed:0.82, turn:6, sight:5.2, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"Belt-or-magazine fed light machine gun. Crude, cheap, and perfectly adequate at pinning infantry." },
  at_k: { fac:"kpa", role:"at", name:"Bulsae Team", full:"AT Team, Bulsae-3 ATGM", cat:"infantry",
    cost:275, oil:0, time:6.4, hp:104, armor:"infantry", speed:0.86, turn:6, sight:6.4, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Locally built Kornet derivative. The one modern-ish weapon in the infantry inventory." },
  aa_k: { fac:"kpa", role:"aa", name:"HT-16PGJ Team", full:"MANPADS Team, HT-16PGJ", cat:"infantry",
    cost:245, oil:0, time:5.6, hp:100, armor:"infantry", speed:0.9, turn:6, sight:7.0, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1,
    desc:"Igla-pattern shoulder SAM. Numerous enough that low-flying aircraft still die over KPA ground." },
  mortar_k: { fac:"kpa", role:"mortar", name:"82mm Mortar Team", full:"Mortar Section, Type 63 82mm", cat:"infantry",
    cost:320, oil:0, time:7.0, hp:102, armor:"infantry", speed:0.72, turn:6, sight:4.6, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:1, deploy:true,
    desc:"Available at Tech I, unlike everyone else's. Indirect fire from the opening minutes of the war." },
  sniper_k: { fac:"kpa", role:"sniper", name:"Designated Marksman", full:"Marksman Team, SVD", cat:"infantry",
    cost:520, oil:0, time:10, hp:88, armor:"infantry", speed:0.78, turn:6, sight:8.8, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"Dragunov-armed marksman. Shorter reach than a true anti-materiel team, but cheap." },

  recon_k: { fac:"kpa", role:"recon", name:"M-1992 Scout", full:"M-1992 Armoured Car", cat:"vehicle",
    cost:250, oil:4, time:4.6, hp:300, armor:"light", speed:2.6, turn:3.0, sight:7.8, r:11, mass:6,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.0,
    desc:"Light 4x4 scout car with a heavy machine gun. Blind by modern standards but disposable." },
  ifv_k: { fac:"kpa", role:"ifv", name:"VTT-323", full:"VTT-323 APC", cat:"vehicle",
    cost:560, oil:8, time:9, hp:700, armor:"light", speed:1.7, turn:2.0, sight:6.0, r:14, mass:13,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:1.7, cargo:8,
    desc:"Tracked box on a Type 63 chassis carrying eight. Armed with only a machine gun — it is a bus, not a fighting vehicle." },
  lt_k: { fac:"kpa", role:"lighttank", name:"PT-85 Shin'heung", full:"PT-85 Light Tank", cat:"vehicle",
    cost:480, oil:6, time:8, hp:560, armor:"light", speed:2.2, turn:2.5, sight:6.4, r:13, mass:20,
    layer:"ground", weapons:["gun_light"], prereq:["factory"], tech:1, turret:true, tturn:1.5,
    desc:"Amphibious light tank with an 85mm gun. Fast, thin, and cheap enough to lose in quantity." },
  mbt_k: { fac:"kpa", role:"mbt", name:"Chonma-ho", full:"Chonma-ho V MBT", cat:"vehicle",
    cost:850, oil:14, time:13, hp:1320, armor:"heavy", speed:1.55, turn:1.5, sight:6.2, r:15, mass:40,
    layer:"ground", weapons:["gun_125"], prereq:["factory"], tech:1, turret:true, tturn:1.15, crush:true,
    desc:"T-62 derivative with a bigger gun bolted on. Available at Tech I and barely half the price of a modern MBT — but its fire control is a generation behind." },
  hvy_k: { fac:"kpa", role:"heavy", name:"Songun-ho", full:"Songun-915 MBT", cat:"vehicle",
    cost:1500, oil:24, time:21, hp:1950, armor:"heavy", speed:1.5, turn:1.4, sight:6.8, r:17, mass:50,
    layer:"ground", weapons:["gun_125"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.25, crush:true,
    desc:"The best tank the KPA fields: reactive armour, an ATGM box and a 125mm gun. Reaches the field at Tech II, when everyone else is still fielding their first MBTs." },
  /* M-2018: eight sealed tubes on the M-2010 6x6 APC hull, fibre-optic
     command guidance off a video seeker, first paraded 2018 and in serial
     production since. It is the newest ground system the KPA has and dating it
     e80 made a 2018 launcher fight as a 1980s one - DOMAIN_BITE scales its
     missile by the unit's from-era, so it was drawing 1980s guided-weapon
     quality at 0.35 bite instead of 2020s at 1.00. The 1950s to 2000s bands
     are the SU-100 and the Susong-po BRDM-2 in eras.js. */
  atgmv_k: { from:"e20", fac:"kpa", role:"tankdestroyer", name:"Bulsae-4", full:"Bulsae-4 (M-2018) ATGM carrier", cat:"vehicle",
    cost:820, oil:11, time:12, hp:580, armor:"light", speed:1.9, turn:2.1, sight:7.4, r:13, mass:15,
    layer:"ground", weapons:["atgm_veh"], prereq:["factory"], tech:1, turret:true, tturn:1.3,
    desc:"Eight tubes in a rotating box on a shortened BTR-80 copy, steering the missile down a fibre-optic link off a nose camera so the launcher can shoot from cover at something it cannot see directly. The only genuinely modern anti-armour system this army fields, and the one piece of KPA ground equipment whose combat performance is not a guess - Ukraine has been destroying them since 2024." },
  spaag_k: { fac:"kpa", role:"spaag", name:"M-1989 Flak", full:"M-1989 Twin 37mm SPAAG", cat:"vehicle",
    cost:640, oil:9, time:10, hp:660, armor:"light", speed:1.6, turn:1.9, sight:7.6, r:14, mass:26,
    layer:"ground", weapons:["spaag"], prereq:["factory"], tech:1, turret:true, tturn:2.4,
    desc:"Optically laid twin 37mm. No radar, so it is far less accurate than a Gepard — but it costs a third as much and arrives at Tech I." },
  /* the KPA's real weapon */
  spg_k: { fac:"kpa", role:"spg", name:"M-1978 Koksan", full:"M-1978 Koksan 170mm SPG", cat:"vehicle",
    cost:1250, oil:16, time:18, hp:640, armor:"light", speed:1.15, turn:1.3, sight:4.8, r:15, mass:40,
    layer:"ground", weapons:["koksan"], prereq:["factory"], tech:1, turret:true, tturn:0.7,
    desc:"A 170mm gun on an open mount with no crew protection whatsoever. It outranges every other artillery piece in the game and is available from Tech I. It cannot defend itself at all." },
  mlrs_k: { fac:"kpa", role:"mlrs", name:"M1991 240mm MRL", full:"M1991 240mm Rocket Launcher", cat:"vehicle",
    cost:1450, oil:20, time:20, hp:600, armor:"light", speed:1.3, turn:1.3, sight:5.0, r:15, mass:30,
    layer:"ground", weapons:["mrl240"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.8,
    desc:"Twenty-two 240mm rockets. Shorter ranged and less accurate than an MLRS, but it saturates a whole grid square and costs far less." },
  supply_k: { fac:"kpa", role:"supply", name:"Supply Truck", full:"Sungri-58 Truck", cat:"vehicle",
    cost:420, oil:4, time:6.5, hp:520, armor:"light", speed:1.85, turn:2.0, sight:5.4, r:14, mass:9,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:720, supplyRange:4.4,
    desc:"Ageing cargo truck hauling fuel drums and shell crates. Smaller load than a HEMTT, half the price." },
  radarv_k: { from:"e90", fac:"kpa", role:"radarv", name:"Counter-Battery Radar", full:"M-1992 Radar Vehicle", cat:"vehicle",
    cost:1050, oil:10, time:14, hp:470, armor:"light", speed:1.6, turn:1.7, sight:8.0, r:14, mass:14,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, radar:12.5, turret:true, tturn:0.9,
    desc:"Elderly artillery-locating radar. Smaller bubble than its rivals, but it is what makes the Koksan park lethal instead of merely loud." },

  helo_k: { fac:"kpa", role:"gunship", name:"Mi-24 Hind", full:"Mi-24D Hind", cat:"aircraft",
    cost:1150, oil:20, time:16, hp:700, armor:"air", speed:3.3, turn:2.0, sight:7.6, r:17, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:7,
    desc:"Gunship and troop carrier in one heavily armoured airframe. Slow and easy to hit, but it soaks punishment other helicopters cannot." },
  trans_k: { fac:"kpa", role:"transport", name:"Mi-2 / An-2 Lift", full:"An-2 Colt", cat:"aircraft",
    cost:520, oil:8, time:8, hp:420, armor:"air", speed:3.4, turn:2.6, sight:7.0, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:10, ammo:0,
    desc:"A fabric-skinned biplane used to sneak commandos over the line. Absurdly cheap, carries ten, and its tiny radar signature is a genuine historical quirk." },
  fighter_k: { fac:"kpa", role:"fighter", name:"MiG-29 Fulcrum", full:"MiG-29 (9-13)", cat:"aircraft",
    cost:1250, oil:26, time:17, hp:400, armor:"air", speed:8.4, turn:1.9, sight:9.0, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    desc:"The only genuinely capable fighter in the inventory, and there are very few of them. Everything else in the air force is a MiG-21." },
  bomber_k: { fac:"kpa", role:"cas", name:"Su-25 Frogfoot", full:"Su-25K Frogfoot", cat:"aircraft",
    cost:1500, oil:32, time:22, hp:760, armor:"air", speed:5.6, turn:1.5, sight:7.8, r:17, mass:0,
    layer:"air", weapons:["jdam","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6,
    desc:"Armoured ground-attack jet flying unguided ordnance. Cheap for its weight class, and blind compared to a NATO A-10." },

  boat_k: { fac:"kpa", role:"patrol", name:"Chaho Gunboat", full:"Chaho-class Gunboat", cat:"naval",
    cost:340, oil:5, time:6, hp:460, armor:"light", speed:3.3, turn:2.3, sight:7.2, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.3,
    desc:"Small rocket-armed patrol boat. The KPA navy is mostly these, and there are hundreds of them." },
  corvette_k: { fac:"kpa", role:"corvette", name:"Nampo Corvette", full:"Nampo-class Corvette", cat:"naval",
    cost:880, oil:12, time:12, hp:1050, armor:"light", speed:2.8, turn:1.7, sight:7.8, r:17, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1, turret:true, tturn:1.9,
    desc:"Coastal gun corvette. Cheap hull, no air-search radar worth the name." },
  missileboat_k: { fac:"kpa", role:"missileboat", name:"Soju Missile Boat", full:"Soju-class Missile Boat", cat:"naval",
    cost:1080, oil:16, time:14, hp:820, armor:"light", speed:3.1, turn:1.85, sight:7.4, r:16, mass:0,
    layer:"sea", weapons:["ssm"], prereq:["navalyard","radar"], tech:2,
    desc:"Styx-derivative anti-ship missiles on a small hull. Fires first or dies — but you can afford three for the price of one Harpoon boat." },
  sub_k: { fac:"kpa", role:"sub", name:"Romeo-class SSK", full:"Project 633 Romeo", cat:"naval",
    cost:1500, oil:26, time:20, hp:900, armor:"light", speed:1.85, turn:1.0, sight:6.6, r:16, mass:0,
    layer:"sub", weapons:["torpedo"], prereq:["navalyard","radar"], tech:2, submerged:true,
    desc:"A 1950s Soviet design built under licence. Noisy and slow, so ASW finds it easily — but the KPA operates a great many of them." },
  lst_k: { fac:"kpa", role:"transport_sea", name:"Hantae Landing Ship", full:"Hantae-class LST", cat:"naval",
    cost:620, oil:8, time:10, hp:820, armor:"light", speed:2.4, turn:1.5, sight:5.8, r:18, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard"], tech:1, cargo:6, amphib:true,
    desc:"Basic landing ship. Slower than an LCAC, far cheaper, and carries just as much." },
});

/* ==================== REPUBLIC OF CHINA ARMY (ROC) ====================
   Doctrine: a small, wealthy, technically excellent force that expects to
   fight outnumbered on prepared ground. Superb missiles and fire control,
   expensive everything, and defences at a discount.                      */
Object.assign(UNITS, {
  rifle_r: { fac:"roc", role:"rifle", name:"Infantry Squad", full:"Rifle Squad, T91", cat:"infantry",
    cost:190, oil:0, time:6, hp:120, armor:"infantry", speed:1.05, turn:7, sight:6.6, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Well-equipped volunteer riflemen with modern optics and body armour. Expensive per man, and there are never enough of them." },
  mg_r: { fac:"roc", role:"mg", name:"T74 Weapons Team", full:"Weapons Team, T74 GPMG", cat:"infantry",
    cost:340, oil:0, time:8, hp:116, armor:"infantry", speed:0.82, turn:6, sight:6.8, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"Locally built general-purpose machine gun on a tripod with a thermal sight." },
  at_r: { fac:"roc", role:"at", name:"Javelin Team", full:"AT Team, FGM-148 Javelin", cat:"infantry",
    cost:480, oil:0, time:10, hp:110, armor:"infantry", speed:0.88, turn:6, sight:7.8, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Imported top-attack ATGM, held in quantity precisely for beach defence. The best infantry anti-armour weapon available." },
  aa_r: { fac:"roc", role:"aa", name:"Stinger Team", full:"MANPADS Team, FIM-92 Stinger", cat:"infantry",
    cost:400, oil:0, time:8.5, hp:104, armor:"infantry", speed:0.9, turn:6, sight:8.4, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1,
    desc:"Shoulder-launched SAM with excellent seeker discrimination. Layered under the Sky Bow umbrella." },
  mortar_r: { fac:"roc", role:"mortar", name:"T75 Mortar Team", full:"Mortar Section, T75 81mm", cat:"infantry",
    cost:560, oil:0, time:12, hp:106, armor:"infantry", speed:0.72, turn:6, sight:5.4, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true,
    desc:"Computer-laid 81mm mortar section with digital fire control." },
  sniper_r: { fac:"roc", role:"sniper", name:"Sniper Team", full:"Sniper Team, T93", cat:"infantry",
    cost:790, oil:0, time:15, hp:94, armor:"infantry", speed:0.78, turn:6, sight:11.2, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"The longest-sighted infantry unit in the game. An outstanding spotter for the guns." },

  recon_r: { fac:"roc", role:"recon", name:"CM-32 Yunpao", full:"CM-32 Clouded Leopard", cat:"vehicle",
    cost:520, oil:6, time:9, hp:420, armor:"light", speed:2.75, turn:3.0, sight:10.2, r:12, mass:22,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.4,
    desc:"Indigenous 8x8 with a remote weapon station and excellent sensors — the best scout car in the game, and priced accordingly." },
  ifv_r: { fac:"roc", role:"ifv", name:"CM-34 Yunpao", full:"CM-34 30mm IFV", cat:"vehicle",
    cost:1120, oil:11, time:16, hp:820, armor:"light", speed:1.9, turn:2.1, sight:8.2, r:14, mass:24,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:1.9, cargo:6,
    desc:"CM-32 hull with a stabilised 30mm Bushmaster turret, carrying six. Fast on roads, well-sighted, expensive." },
  lt_r: { fac:"roc", role:"lighttank", name:"M60A3 TTS", full:"M60A3 TTS", cat:"vehicle",
    cost:820, oil:10, time:13, hp:900, armor:"heavy", speed:1.45, turn:1.6, sight:8.0, r:14, mass:52,
    layer:"ground", weapons:["gun_105"], prereq:["factory"], tech:1, turret:true, tturn:1.4, crush:true,
    desc:"An old hull with a genuinely good thermal sight and a 105mm gun. Counts as heavy armour at Tech I — the ROC's early-game trump card." },
  mbt_r: { fac:"roc", role:"mbt", name:"CM-11 Brave Tiger", full:"CM-11 Brave Tiger", cat:"vehicle",
    cost:1650, oil:22, time:24, hp:1680, armor:"heavy", speed:1.5, turn:1.5, sight:8.6, r:16, mass:50,
    layer:"ground", weapons:["gun_105"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.6, crush:true,
    desc:"M60 hull married to an M1 turret and fire control. Not the toughest MBT, but it acquires and hits first — which usually settles it." },
  hvy_r: { from:"e20", fac:"roc", role:"heavy", name:"M1A2T Abrams", full:"M1A2T Abrams", cat:"vehicle",
    cost:2750, oil:42, time:36, hp:2400, armor:"heavy", speed:1.4, turn:1.35, sight:9.0, r:18, mass:66,
    layer:"ground", weapons:["gun_120"], prereq:["factory","lab"], tech:3, turret:true, tturn:1.55, crush:true, aps:0.35,
    desc:"The export Abrams, delivered with modern armour and optics. The most expensive tank in the game and the best-sighted." },
  /* There is no CM-32 TOW. The Yunpao family runs CM-32 / CM-33 / CM-34 with
     remote weapon stations and a 30 mm turret; the ROC Army's current ATGM
     carrier is the M1167 HMMWV with the M41A7 ITAS launcher, which is a
     2010s-2020s re-equipment of the M966/M113A1 TOW fleet. Dated e20 for that
     reason - the earlier bands are held by the M18, the M113A1 TOW and the
     CM-25 in eras.js, not by this vehicle. */
  atgmv_r: { from:"e20", fac:"roc", role:"tankdestroyer", name:"M1167 TOW", full:"M1167 HMMWV, M41A7 ITAS TOW", cat:"vehicle",
    cost:1280, oil:14, time:17, hp:600, armor:"light", speed:2.1, turn:2.2, sight:9.4, r:13, mass:22,
    layer:"ground", weapons:["atgm_veh"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.4,
    desc:"An armoured-cab Humvee with the improved target acquisition system: a thermal sight with its own laser rangefinder that finds and hands over a target far beyond the range of the missile, so the gunner shoots from a reverse slope and moves. Light enough to be hidden anywhere on a small island and thin enough that anything which sees it first wins." },
  spaag_r: { fac:"roc", role:"spaag", name:"Antelope AD", full:"Antelope Air Defence System", cat:"vehicle",
    cost:1300, oil:15, time:17, hp:740, armor:"light", speed:1.85, turn:2.0, sight:10.5, r:14, mass:14,
    layer:"ground", weapons:["sam_veh"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.6, radar:10,
    desc:"Chaparral-successor firing Sky Sword missiles from a Humvee-class chassis. A true SAM vehicle rather than a gun system: longer reach than any rival SPAAG, and it carries its own radar." },
  spg_r: { fac:"roc", role:"spg", name:"M109A6 Paladin", full:"M109A6 Paladin", cat:"vehicle",
    cost:1800, oil:22, time:26, hp:780, armor:"light", speed:1.35, turn:1.5, sight:6.2, r:15, mass:29,
    layer:"ground", weapons:["howitzer"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.9,
    desc:"Digitised 155mm howitzer with autonomous laying. Same shell as everyone else's, delivered more accurately." },
  mlrs_r: { fac:"roc", role:"mlrs", name:"Thunderbolt-2000", full:"RT-2000 Thunderbolt", cat:"vehicle",
    cost:2450, oil:34, time:32, hp:700, armor:"light", speed:1.35, turn:1.35, sight:6.0, r:15, mass:22,
    layer:"ground", weapons:["mlrs"], prereq:["factory","lab"], tech:3, turret:true, tturn:0.85,
    desc:"Indigenous multiple rocket launcher built to break up landing craft at the waterline. Accurate for its class." },
  supply_r: { fac:"roc", role:"supply", name:"Supply Truck", full:"M977 HEMTT", cat:"vehicle",
    cost:880, oil:7, time:13, hp:600, armor:"light", speed:1.9, turn:2.0, sight:6.2, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:1000, supplyRange:5.4,
    desc:"Imported heavy logistics truck with the largest supply pool available." },
  radarv_r: { from:"e80", fac:"roc", role:"radarv", name:"AN/TPQ-37 Radar", full:"AN/TPQ-37 Firefinder", cat:"vehicle",
    cost:1420, oil:13, time:18, hp:520, armor:"light", speed:1.65, turn:1.7, sight:9.6, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, radar:17.5, turret:true, tturn:0.9,
    desc:"Long-range counter-battery radar — the widest sensor bubble in the game. It is how a smaller force out-shoots a bigger one. Four sets bought from the United States in 1986, which is why this row starts in the 1980s and not the 1990s: Taiwan has been able to back-plot PLA tube artillery across the Strait and the offshore islands since then, and had nothing that could before." },

  helo_r: { fac:"roc", role:"gunship", name:"AH-64E Apache", full:"AH-64E Apache Guardian", cat:"aircraft",
    cost:1850, oil:28, time:25, hp:620, armor:"air", speed:3.6, turn:2.2, sight:10.2, r:16, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    desc:"Latest-block Apache with the mast-mounted radar. Superb sensors, eye-watering price." },
  trans_r: { fac:"roc", role:"transport", name:"UH-60M Black Hawk", full:"UH-60M Black Hawk", cat:"aircraft",
    cost:1050, oil:15, time:16, hp:540, armor:"air", speed:4.2, turn:2.4, sight:8.4, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:8, ammo:0,
    desc:"Standard medium-lift helicopter, used to reposition infantry along the coast faster than a landing can develop." },
  fighter_r: { fac:"roc", role:"fighter", name:"F-16V Viper", full:"F-16V Block 70", cat:"aircraft",
    cost:1950, oil:33, time:26, hp:440, armor:"air", speed:8.6, turn:2.0, sight:12.5, r:15, mass:0,
    layer:"air", weapons:["aam_lo"], prereq:["airbase"], tech:2, jet:true, ammo:5,
    desc:"AESA-radar Viper firing the same advanced missile as a Raptor. Not stealthy, but it sees further than anything else that is not." },
  bomber_r: { fac:"roc", role:"cas", name:"F-CK-1 Ching-kuo", full:"F-CK-1C Ching-kuo", cat:"aircraft",
    cost:2100, oil:36, time:29, hp:560, armor:"air", speed:7.2, turn:1.8, sight:9.6, r:16, mass:0,
    layer:"air", weapons:["jdam","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:6,
    desc:"Indigenous Defence Fighter in the strike role — far faster over the target than an A-10, with a lighter bomb load." },

  boat_r: { fac:"roc", role:"patrol", name:"Kuang Hua VI", full:"Kuang Hua VI Missile Boat", cat:"naval",
    cost:640, oil:7, time:10, hp:500, armor:"light", speed:3.6, turn:2.4, sight:8.6, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.4,
    desc:"Fast stealth-shaped inshore boat. The quickest hull in the game — built to sortie from a cave and run." },
  corvette_r: { fac:"roc", role:"corvette", name:"Tuo Chiang", full:"Tuo Chiang-class Corvette", cat:"naval",
    cost:1550, oil:18, time:19, hp:1050, armor:"light", speed:3.3, turn:1.9, sight:10.2, r:17, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1, turret:true, tturn:2.1, radar:9,
    desc:"Stealth catamaran corvette — the 'carrier killer'. Very fast, carries its own radar, and thinly protected." },
  missileboat_r: { fac:"roc", role:"missileboat", name:"Hsiung Feng Boat", full:"HF-III Missile Craft", cat:"naval",
    cost:1850, oil:24, time:22, hp:880, armor:"light", speed:3.2, turn:1.9, sight:9.6, r:16, mass:0,
    layer:"sea", weapons:["ssm"], prereq:["navalyard","radar"], tech:2, radar:9,
    desc:"Supersonic Hsiung Feng III anti-ship missiles. The longest reach of any missile boat, and it spots for itself." },
  destroyer_r: { fac:"roc", role:"destroyer", name:"Kee Lung DDG", full:"Kee Lung-class Destroyer", cat:"naval",
    cost:2600, oil:36, time:32, hp:1950, armor:"heavy", speed:2.35, turn:1.2, sight:11.5, r:20, mass:0,
    layer:"sea", weapons:["navgun_127","sam_ship","depthchg"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.5, sonar:7.5, radar:13,
    desc:"Ex-Kidd-class air defence destroyer. Older hull, excellent area SAM coverage — the shield the rest of the fleet hides behind." },
  sub_r: { fac:"roc", role:"sub", name:"Hai Lung SSK", full:"Hai Lung-class Submarine", cat:"naval",
    cost:2550, oil:38, time:31, hp:1150, armor:"light", speed:2.0, turn:1.05, sight:8.4, r:17, mass:0,
    layer:"sub", weapons:["torpedo"], prereq:["navalyard","radar"], tech:2, submerged:true,
    desc:"Zwaardvis-derived diesel boat, meticulously maintained. Only a handful exist and each one is irreplaceable." },
  lst_r: { fac:"roc", role:"transport_sea", name:"LCU Landing Craft", full:"Landing Craft, Utility", cat:"naval",
    cost:980, oil:12, time:15, hp:900, armor:"light", speed:2.6, turn:1.6, sight:6.8, r:18, mass:0,
    layer:"sea", weapons:[], prereq:["navalyard"], tech:1, cargo:6, amphib:true,
    desc:"Utility landing craft. The ROC is built to repel landings rather than mount them, so this is a workmanlike hull." },
});

/* ==================================================================
   THE BUNDESWEHR — present-day roster (key `deu`, suffix `_g`)

   Founded 12 November 1955 and, for its first decade, equipped almost
   entirely with American and British hand-me-downs. What it built for
   itself afterwards it built very well: the Leopard line, the Rh-120
   that became the American M256 in 1985, the Gepard, the PzH 2000.

   The gaps below are deliberate and are the faction. Germany has no
   carrier and no carrier air wing (Graf Zeppelin was launched in 1938,
   never completed, scuttled at Stettin in 1945, raised by the Soviets
   in 1946 and expended as a Baltic weapons target in 1947), no nuclear
   propulsion and no nuclear weapon of its own, no strategic bomber
   since 1945, no dedicated escort jammer, no AWACS of its own (the
   Geilenkirchen E-3As are NATO-owned and Luxembourg-registered), no
   light tank since the mid-1970s, no active protection system in
   service, and — since the Lance went in 1992 — nothing ballistic
   beyond the divisional rocket launcher. None of these are placeholders
   to be filled later.

   What it does NOT lack, and what two earlier drafts got wrong: deep
   strike aviation. The Tornado IDS has been the Luftwaffe's
   interdiction aircraft since 1981 and has carried Taurus KEPD 350, a
   German-owned stand-off cruise missile, since 2005.
   ================================================================== */
Object.assign(WEAPONS, {
  /* Named OUTSIDE the w_<era>_<fac>_<role> pattern on purpose: the era
     normaliser in generations.js rewrites the range of anything matching it
     to a per-era constant, which would flatten both of the two German guns
     whose reach is the point of them. */
  gun_120_l55: { name:"120mm Rh-120 L/55 smoothbore", dmg:162, warhead:"cannon", range:8.2,
                 reload:4.3, burst:1, acc:0.82, proj:"shell", speed:880, aoe:0.9, suppress:24,
                 tgt:{ground:1,air:0,sea:1,sub:0} },
  pzh2000_l52: { name:"155mm L/52 (PzH 2000)", dmg:158, warhead:"frag", range:24.6, minRange:5.0,
                 reload:6.4, burst:1, acc:0.34, proj:"arc", speed:220, aoe:2.7, suppress:64,
                 tgt:{ground:1,air:0,sea:1,sub:0} },
  hot_jaguar:  { name:"HOT-2 (Jagdpanzer Jaguar 1)", dmg:118, warhead:"heat", range:9.6, minRange:1.1,
                 reload:6.2, burst:1, acc:0.74, proj:"missile", speed:260, aoe:0.8, suppress:16,
                 tgt:{ground:1,air:0,sea:1,sub:0}, profile:"pop", intercept:1 },
  tow_wiesel:  { name:"TOW-2A (Wiesel 1 TOW)", dmg:145, warhead:"heat", range:8.4, minRange:1.1,
                 reload:7.4, burst:1, acc:0.80, proj:"missile", speed:230, aoe:0.8, suppress:16,
                 tgt:{ground:1,air:0,sea:1,sub:0}, profile:"pop", intercept:1 },
  taurus_kepd: { name:"Taurus KEPD 350", dmg:360, warhead:"he", range:9.6, minRange:2.4,
                 reload:7.2, burst:1, acc:0.92, proj:"missile", speed:340, aoe:2.4, suppress:70,
                 ammo:1, stealthy:0.55, tgt:{ground:1,air:0,sea:1,sub:0},
                 profile:"pop", intercept:0.6 },
});

Object.assign(UNITS, {
  rifle_g: { fac:"deu", role:"rifle", name:"Panzergrenadiergruppe", full:"Rifle Section, Gewehr G36A2", cat:"infantry",
    cost:175, oil:0, time:6, hp:118, armor:"infantry", speed:1.04, turn:7, sight:6.2, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Conscription was suspended in 2011 and the Bundeswehr has been an all-volunteer force since, which is why there are never many sections and each one is expensive. The G36 has been standard since 1997; the G95A1 (HK416A8) was selected to replace it and deliveries only began in 2023, so the rifle in the section is still a G36." },
  mg_g: { from:"e50", fac:"deu", role:"mg", name:"MG3 Weapons Team", full:"Weapons Team, MG3 7.62mm", cat:"infantry",
    cost:320, oil:0, time:8, hp:114, armor:"infantry", speed:0.82, turn:6, sight:6.6, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"The same gun for seventy years: the MG42 rebarrelled for 7.62mm NATO as the MG1 in 1958, refined into the MG3 in 1968, and still in the field when the MG5 began replacing it in 2015. Roughly 1,200 rounds a minute, which is the highest cyclic rate of any general-purpose machine gun in service anywhere." },
  at_g: { fac:"deu", role:"at", name:"MELLS Team", full:"AT Team, MELLS (Spike LR2)", cat:"infantry",
    cost:470, oil:0, time:10, hp:108, armor:"infantry", speed:0.87, turn:6, sight:7.6, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Israeli Spike bought off the shelf and fielded from 2012 as MELLS, after thirty years of MILAN. Fire-and-forget with a fibre-optic man-in-the-loop option, and the longest infantry anti-armour reach of the four Western armies here. Panzerfaust 3 remains the short-range answer." },
  aa_g: { from:"e90", fac:"deu", role:"aa", name:"Fliegerfaust 2", full:"MANPADS Team, Fliegerfaust 2 Stinger", cat:"infantry",
    cost:380, oil:0, time:8.5, hp:102, armor:"infantry", speed:0.90, turn:6, sight:8.2, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1,
    desc:"Germany adopted the Stinger as Fliegerfaust 2 in 1992, eleven years behind the US Army. Before it the Heer had the Fliegerfaust 1, a Redeye with a seeker that could only chase a jet from behind." },
  mortar_g: { from:"e50", fac:"deu", role:"mortar", name:"Moerser Section", full:"Mortar Section, 120mm Moerser", cat:"infantry",
    cost:545, oil:0, time:12, hp:104, armor:"infantry", speed:0.72, turn:6, sight:5.4, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true,
    desc:"81mm from 1956, then the 120mm Tampella from the mid-1960s, and from 2013 the same tube in the turret of a Wiesel 2 leichter Moerser. The heaviest company mortar of the four Western armies here and the only one that ended up armoured." },
  sniper_g: { from:"e20", fac:"deu", role:"sniper", name:"Scharfschuetzentrupp", full:"Sniper Team, G29 (.338 Lapua)", cat:"infantry",
    cost:780, oil:0, time:15, hp:92, armor:"infantry", speed:0.78, turn:6, sight:11.0, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"The Bundeswehr had no dedicated sniper rifle and no sniper school for forty-three years — the trade was politically unwelcome in the post-war army. The G22 arrived in 1998 after Bosnia made the omission untenable; the G29 in .338 Lapua Magnum followed in 2016." },
  supply_g: { fac:"deu", role:"supply", name:"Supply Truck", full:"MAN gl 7t milGL", cat:"vehicle",
    cost:850, oil:7, time:13, hp:600, armor:"light", speed:1.85, turn:2.0, sight:6.2, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:950, supplyRange:5.2,
    desc:"Unimog and MAN trucks, armoured cab, and a logistics branch sized for a defensive war fought at home. Germany can sustain a corps on its own ground and struggles to sustain a brigade a long way from it, which is what supplyMul 0.94 is." },

  recon_g: { from:"e00", fac:"deu", role:"recon", name:"Fennek", full:"Spaehwagen Fennek", cat:"vehicle",
    cost:500, oil:6, time:9, hp:400, armor:"light", speed:2.70, turn:3.0, sight:10.4, r:12, mass:10,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.4,
    desc:"A Dutch-German 4x4 built around one idea: an observation head on a telescopic mast that lifts a thermal imager and a laser rangefinder 1.5 m above the roof, so the vehicle watches from behind cover it never has to leave. Fielded 2003. The Luchs it replaced was an 8x8 with a rear driver that could reverse at full speed." },
  ifv_g: { fac:"deu", role:"ifv", name:"Puma", full:"Schuetzenpanzer Puma S1", cat:"vehicle",
    cost:1240, oil:12, time:17, hp:900, armor:"light", speed:1.85, turn:2.1, sight:8.8, r:14, mass:43,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:2.0, cargo:6,
    desc:"The most heavily protected IFV in service anywhere, and it carries six rather than the eight the Marder did, because the protection took the space. Unmanned turret with a 30mm MK 30-2/ABM firing airburst rounds. Fielded 2015 and famously unreliable in its first years; the S1 standard is the fix." },
  mbt_g: { fac:"deu", role:"mbt", name:"Leopard 2A7V", full:"Leopard 2A7V", cat:"vehicle",
    cost:1780, oil:24, time:26, hp:1780, armor:"heavy", speed:1.45, turn:1.45, sight:9.2, r:16, mass:66,
    layer:"ground", weapons:["gun_120_l55"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.6, crush:true,
    desc:"The gun is the point. Rheinmetall designed the Rh-120, the United States licence-built it as the M256 in 1985, and an Abrams has fired a German gun ever since. The L/55 barrel arrived on the 2A6 in 2001. No active protection system: Trophy was contracted for the 2A8 in 2023 and nothing has been delivered, which is why Germany has no tech-3 heavy armour in this game." },
  atgmv_g: { from:"e00", fac:"deu", role:"tankdestroyer", name:"Wiesel 1 TOW", full:"Wiesel 1 TOW", cat:"vehicle",
    cost:900, oil:8, time:12, hp:330, armor:"light", speed:2.15, turn:2.6, sight:8.8, r:12, mass:5,
    layer:"ground", weapons:["tow_wiesel"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.5,
    desc:"A tracked vehicle weighing under three tonnes with a TOW launcher on the roof, built so that two of them fit in a CH-53. It is the airborne brigade's anti-armour weapon and it dies to anything that sees it first. Germany has fielded no full-size tank destroyer since the Jaguar went in the mid-2000s." },
  spaag_g: { fac:"deu", role:"spaag", name:"Ozelot", full:"LeFlaSys Ozelot (ASRAD)", cat:"vehicle",
    cost:980, oil:11, time:14, hp:400, armor:"light", speed:2.00, turn:2.4, sight:9.6, r:13, mass:5,
    layer:"ground", weapons:["manpad"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.8, radar:4.0,
    desc:"Four Stingers on a Wiesel 2, and it is a placeholder for something that is not there. Germany fielded the finest gun-based air defence ever built — the Gepard, twin 35mm with separate search and tracking radars, engaging on the move, in service 1976 — and retired the vehicle in 2010 and the whole army air defence branch in 2012. Skyranger 30 was contracted in 2024 and is not in service. Ozelot cannot engage a ground target at all." },
  spg_g: { from:"e90", fac:"deu", role:"spg", name:"PzH 2000", full:"Panzerhaubitze 2000 A2", cat:"vehicle",
    cost:1950, oil:24, time:28, hp:820, armor:"light", speed:1.35, turn:1.5, sight:6.4, r:15, mass:56,
    layer:"ground", weapons:["pzh2000_l52"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.95,
    desc:"A 155mm L/52 with a fully automatic magazine: three rounds in under ten seconds, and it will put all three on the same point at the same moment. In service 1998 and still the longest-reaching tube gun any of these four armies fields. It fires SMArt 155, a German sensor-fuzed top-attack cargo round, since about 2000 — but no scatterable mine round, because Germany destroyed its AT-2 stocks under the Ottawa Convention." },
  mlrs_g: { from:"e00", fac:"deu", role:"mlrs", name:"MARS II", full:"Mittleres Artillerieraketensystem II", cat:"vehicle",
    cost:2350, oil:33, time:31, hp:700, armor:"light", speed:1.30, turn:1.35, sight:5.6, r:15, mass:25,
    layer:"ground", weapons:["mlrs"], prereq:["factory","lab"], tech:3, turret:true, tturn:0.85,
    desc:"The M270 with a European fire control, guided rockets only since the cluster warheads were destroyed under the 2008 Convention on Cluster Munitions. It is the longest-ranged thing the Bundeswehr owns: since the Lance was withdrawn in 1992 Germany has fielded nothing ballistic at all, and this launcher is where the German fire plan stops." },
  sam_g: { from:"e20", fac:"deu", role:"sam", name:"Patriot PAC-3", full:"MIM-104F Patriot PAC-3 MSE", cat:"vehicle",
    cost:2700, oil:38, time:34, hp:600, armor:"light", speed:1.05, turn:1.05, sight:13.6, r:16, mass:36,
    layer:"ground", weapons:["sam_area3"], prereq:["factory","radar","lab"], tech:3, turret:true, tturn:0.6,
    deploy:true, deploySec:5.5, radar:13, radarQ:20, rounds:12,
    desc:"The Luftwaffe has run Patriot since 1989 and operates one of the largest fleets outside the United States. IRIS-T SLM, the German-built medium-range system, was fielded to Ukraine in 2022 before the Bundeswehr had a single battery of its own — the export order came first, which is a recurring German procurement story." },
  radarv_g: { from:"e00", fac:"deu", role:"radarv", name:"COBRA", full:"COBRA counter-battery radar", cat:"vehicle",
    cost:1400, oil:13, time:18, hp:520, armor:"light", speed:1.60, turn:1.7, sight:9.4, r:14, mass:17,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, radar:17, turret:true, tturn:0.9,
    desc:"A phased array that backtracks incoming shells to the tube that fired them: up to forty batteries located in two minutes, across a hundred-kilometre front. Delivered from 2004 under a trilateral OCCAR programme — twelve German sets of twenty-nine built, alongside ten French and seven British. It is not the first artillery radar the Bundeswehr owned: Green Archer rode an M113 from 1968 and RATAC from 1976. It is the first that back-plots a ballistic trajectory to the firing point instead of watching a mortar arc, and the first that can do it to a whole artillery group at once." },

  helo_g: { from:"e00", fac:"deu", role:"gunship", name:"Tiger UHT", full:"Eurocopter Tiger UHT", cat:"aircraft",
    cost:1720, oil:26, time:24, hp:580, armor:"air", speed:3.5, turn:2.3, sight:9.8, r:16, mass:0,
    layer:"air", weapons:["atgm_veh"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    desc:"The only attack helicopter in the game with no gun at all: the German Tiger was ordered as a pure anti-armour machine and the chin turret was deleted to save weight, a decision Afghanistan made everyone regret. It carries PARS 3 LR, a fire-and-forget imaging-infrared missile that is one of the few genuinely German guided weapons of its generation, alongside HOT-3." },
  trans_g: { from:"e00", fac:"deu", role:"transport", name:"NH90 TTH", full:"NHIndustries NH90 TTH", cat:"aircraft",
    cost:980, oil:15, time:15, hp:510, armor:"air", speed:4.1, turn:2.4, sight:8.0, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:8, ammo:0,
    desc:"Fly-by-wire, composite airframe, and twenty years between contract and a usable aircraft. It replaced the UH-1D, which the Heeresflieger flew from 1967 to 2021 — fifty-four years. The CH-53G, in service since 1972, still does the heavy lifting." },
  fighter_g: { from:"e00", fac:"deu", role:"fighter", name:"Eurofighter", full:"Eurofighter Typhoon Tranche 3", cat:"aircraft",
    cost:1750, oil:32, time:25, hp:430, armor:"air", speed:8.8, turn:2.1, sight:11.4, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    desc:"Supersonic without reheat, and it out-turns almost anything. Fielded 2004 after a development that began in 1983. The radar is still a mechanically scanned CAPTOR-M on the German fleet: the ECRS Mk1 AESA is in flight test and has not reached a squadron. Germany ordered 35 F-35A in 2022 for the nuclear-sharing role, with deliveries expected from 2026 — so there is no German fifth-generation fighter here." },
  bomber_g: { from:"e00", fac:"deu", role:"cas", name:"Tornado IDS", full:"Panavia Tornado IDS (Taurus)", cat:"aircraft",
    cost:2250, oil:42, time:30, hp:620, armor:"air", speed:7.6, turn:1.6, sight:9.4, r:17, mass:0,
    layer:"air", weapons:["taurus_kepd","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:4,
    desc:"Swing-wing, two crew, built to cross the inner-German border at 60 metres in weather nobody else would fly in. Germany bought 324 IDS and 35 ECR. Since 2005 it has carried Taurus KEPD 350, a stealthy 500 km stand-off missile that is German-owned and German-built — which is why the claim that Germany has no long-range strike aviation is wrong. What Germany has not had since 1945 is a strategic bomber." },
  sead_g: { from:"e90", fac:"deu", role:"sead", name:"Tornado ECR", full:"Panavia Tornado ECR", cat:"aircraft",
    cost:2000, oil:35, time:25, hp:520, armor:"air", speed:7.7, turn:1.7, sight:11.0, r:16, mass:0,
    layer:"air", weapons:["harm"], prereq:["airbase","radar"], tech:2, jet:true, ammo:4,
    desc:"An emitter locating system in the nose and HARM under the wing. Thirty-five aircraft, delivered from 1990, and they flew the Luftwaffe's first combat missions since 1945 over Kosovo in 1999. Note what it is not: the ECR kills radars, it does not blind them. Germany has never fielded a dedicated escort jammer of any kind." },
  tanker_g: { from:"e20", fac:"deu", role:"tanker", name:"A330 MRTT", full:"Airbus A330 MRTT (MMF)", cat:"aircraft",
    cost:3100, oil:68, time:39, hp:740, armor:"air", speed:4.3, turn:0.9, sight:9, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0,
    radius:145, tanker:400, refuelRate:15, rcs:5.2,
    desc:"Germany had no aerial tanker at all until 2004 and owns none outright now. These belong to the Multinational MRTT Fleet, an NSPA-owned pool shared by six nations, carried on the Netherlands military register and based at Eindhoven. It is a real capability held on somebody else's terms, which is the German air force in one aircraft." },
  airlift_g: { from:"e20", fac:"deu", role:"airlift", name:"A400M Atlas", full:"Airbus A400M Atlas", cat:"aircraft",
    cost:1750, oil:44, time:25, hp:700, armor:"air", speed:3.6, turn:1.4, sight:8, r:20, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:1, jet:false, ammo:0,
    radius:70, cargo:9, rcs:3.4, gen:4, radarQ:0,
    desc:"Four counter-rotating turboprops, a 37-tonne load, and it still lands on dirt. It replaced the Transall C-160, which the Luftwaffe flew from 1968 to 2021. The programme ran years late and billions over, and the aircraft that came out of it is the best tactical airlifter in the world." },
});


/* ==================================================================
   BRITISH ARMED FORCES — the present day, e20
   ------------------------------------------------------------------
   Small, expensive and gunnery-first: 148 Challenger hulls, fourteen
   Archer systems, three Wedgetails, nine Astutes. The gaps here are
   real and several of them are recent losses rather than things
   Britain never had:
     sead   — ALARM was withdrawn in 2013 and nothing replaced it. There
              is no anti-radiation missile in British service; SEAD is an
              allied-provided capability. NO ENTRY, deliberately.
     ewair  — ew_b IS Airseeker (RC-135W, delivered from November 2013),
              and it COLLECTS rather than jams. That is the same reading
              ew_f Archange and the four French Gabriel rows already get,
              and one role cannot be scored two ways. What Britain no
              longer has is electronic ATTACK: the Canberra T.17 of 360
              Squadron jammed, it is in eras.js with jam:6, and it went on
              31 October 1994. Nothing has replaced THAT.
     tel    — Lance left in 1993 with the last British Army surface-to-
              surface missile. M270 was bought without ATACMS, so the
              Royal Artillery's longest reach is a GMLRS rocket.
     tankdestroyer — Striker/Swingfire withdrew in 2005 and the Ajax
              Overwatch ATGM variant was never fielded.
     heavybomber / stealthbomber / gunshipair — none, and none since the
              last Vulcan retired in 1984.
     cas    — no dedicated close air support aircraft since the Harrier
              went in 2010 and Tornado GR4 in 2019. bomber_b is the
              air-superiority fighter carrying Brimstone, and the name
              on the card says so.
   NAVGUN in generations.js already carries a gbr row for the 4.5in Mk 8;
   it only substitutes into weapons matching /OTO 76mm/, so it stays dead
   code until the British escorts are authored.
   ================================================================== */
Object.assign(WEAPONS, {
  /* gun_120_rifled and howitzer_52 are named OUTSIDE the w_<era>_<fac>_<role>
     pattern deliberately — the era normaliser in generations.js would flatten
     the ranges that are the point of them. */
  gun_120_rifled: { name:"120mm L30A1 rifled", dmg:158, warhead:"cannon", range:8.1, reload:4.8, burst:1,
                acc:0.84, proj:"shell", speed:840, aoe:1.2, suppress:26, tgt:{ground:1,air:0,sea:1,sub:0} },
  ct40:       { name:"40mm CTAS cased-telescoped", dmg:38, warhead:"bullet", range:6.8, reload:2.4, burst:3, burstDelay:0.12,
                acc:0.80, proj:"shell", speed:650, suppress:16, tgt:{ground:1,air:0,sea:1,sub:0} },
  howitzer_52:{ name:"155mm 52-calibre howitzer", dmg:150, warhead:"frag", range:17.2, minRange:4.2, reload:7.4, burst:1,
                acc:0.34, proj:"arc", speed:230, aoe:2.6, suppress:60, tgt:{ground:1,air:0,sea:1,sub:0} },
  /* warhead "flak" is the engine's damage class for a round that kills
     aircraft, not a claim that Starstreak has a fragmenting warhead - it has
     three tungsten darts and no fuse at all. It was written "cannon" for that
     reason, and CFG.DMG.cannon.air is 0.00, so every Starstreak in the game
     fired at an aircraft and could not scratch it. Air is this weapon's ONLY
     target, so the whole system was inert. See the four era rows in eras.js. */
  hvm:        { name:"Starstreak HVM", dmg:130, warhead:"flak", range:6.8, reload:2.4, burst:3, burstDelay:0.05,
                acc:0.88, proj:"missile", speed:1300, aoe:0, tgt:{ground:0,air:1,sea:0,sub:0} },
  sam_camm:   { name:"CAMM soft-launch active SAM", dmg:205, warhead:"flak", range:10.4, reload:4.8, burst:2, burstDelay:0.35,
                acc:0.91, proj:"missile", speed:680, aoe:0.9, tgt:{ground:0,air:1,sea:0,sub:0} },
});

Object.assign(UNITS, {
  rifle_b: { fac:"gbr", role:"rifle", name:"Rifle Section", full:"Rifle Section, L85A3", cat:"infantry",
    cost:150, oil:0, time:5, hp:115, armor:"infantry", speed:1.05, turn:7, sight:6.0, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1,
    desc:"Eight men, bullpup rifles and a section of two fireteams. The L85A3 is the third rebuild of a rifle first issued in 1987 - flat-top rail, lighter upper, and finally a reputation it does not have to apologise for." },
  at_b: { fac:"gbr", role:"at", name:"NLAW / Javelin", full:"AT Team, NLAW and FGM-148 Javelin", cat:"infantry",
    cost:390, oil:0, time:9, hp:105, armor:"infantry", speed:0.88, turn:6, sight:7.2, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1,
    desc:"Javelin for the long shot, NLAW for everything else. NLAW has no seeker at all: the gunner tracks the target for a few seconds, fires, and the missile flies a metre above the tank and detonates downward through the roof. Nothing to jam, and 20,000 of them went to Ukraine." },
  aa_b: { fac:"gbr", role:"aa", name:"Starstreak Team", full:"HVM Team, Starstreak and Martlet LMM", cat:"infantry",
    cost:400, oil:0, time:8, hp:100, armor:"infantry", speed:0.9, turn:6, sight:8.0, r:6, mass:0.1,
    layer:"ground", weapons:["hvm"], prereq:["barracks"], tech:1,
    desc:"The fastest surface-to-air missile in the world, above Mach 4, riding a laser beam so there is no seeker to decoy and nothing to jam. Three tungsten darts and no proximity fuse - it must hit. Short reach, and strictly anti-air." },
  recon_b: { fac:"gbr", role:"recon", name:"Jackal", full:"Jackal 2 MWMIK / Foxhound", cat:"vehicle",
    cost:400, oil:5, time:7, hp:330, armor:"light", speed:2.95, turn:3.3, sight:9.5, r:11, mass:7,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.4,
    desc:"Air-sprung, open-topped and fast, on the argument that seeing and hearing the ambush beats surviving it. Foxhound is the opposite bet - a fully protected pod - and the Army fields both because it never settled the question." },
  ifv_b: { fac:"gbr", role:"ifv", name:"Warrior", full:"FV510 Warrior", cat:"vehicle",
    cost:870, oil:10, time:14, hp:840, armor:"light", speed:1.72, turn:2.0, sight:7.2, r:14, mass:32,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:1.7, cargo:6,
    desc:"Thirty-eight years old and unmodernised. The Rarden cannon is manually stabilised and cannot be fired accurately on the move; the turret upgrade that would have fixed that was cancelled in 2021 after a decade and 430 million pounds. It also carries no anti-tank missile, so it cannot fight armour at all." },
  lt_b: { from:"e20", fac:"gbr", role:"lighttank", name:"Ajax", full:"Ajax reconnaissance vehicle", cat:"vehicle",
    cost:820, oil:11, time:13, hp:760, armor:"light", speed:1.95, turn:2.3, sight:9.8, r:13, mass:38,
    layer:"ground", weapons:["ct40"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.7,
    desc:"A 38-tonne reconnaissance vehicle with a stabilised 40mm cased-telescoped cannon and the best sensor fit in the British Army - it is meant to find, not to be found. Ordered in 2014, halted twice when vibration and noise injured crews, and only declared initially operational in 2025." },
  mbt_b: { fac:"gbr", role:"mbt", name:"Challenger 2", full:"Challenger 2", cat:"vehicle",
    cost:1500, oil:22, time:22, hp:1820, armor:"heavy", speed:1.38, turn:1.4, sight:8.0, r:16, mass:64,
    layer:"ground", weapons:["gun_120_rifled"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.4, crush:true,
    desc:"The last rifled tank gun in NATO, kept because the British Army will not give up the HESH round - which means one country in the world makes its ammunition. Dorchester armour that has never been defeated frontally, a 1998 fire-control system, and a fleet down to 148 hulls." },
  hvy_b: { from:"e20", fac:"gbr", role:"heavy", name:"Challenger 3", full:"Challenger 3 (in service 2027)", cat:"vehicle",
    cost:2400, oil:38, time:32, hp:2400, armor:"heavy", speed:1.45, turn:1.4, sight:8.6, r:18,
    mass:66, layer:"ground", weapons:["gun_120"], prereq:["factory","lab"], tech:3,
    turret:true, tturn:1.5, crush:true, aps:0.45,
    desc:"148 Challenger 2 hulls rebuilt with a new turret, modular armour, Trophy active protection and - finally - a 120mm smoothbore, ending fifty years of British rifled tank guns and putting the fleet on NATO ammunition. First deliveries 2025; it is NOT yet in service, with an in-service date of 2027." },
  spaag_b: { fac:"gbr", role:"spaag", name:"Stormer HVM", full:"Stormer HVM", cat:"vehicle",
    cost:980, oil:13, time:15, hp:700, armor:"light", speed:1.9, turn:2.1, sight:9.2, r:13, mass:13,
    layer:"ground", weapons:["hvm"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.8,
    desc:"Eight Starstreak on tracks, cued by a passive infrared sight that never emits - so an anti-radiation missile has nothing to home on. It has no gun and no ground capability whatsoever: it cannot defend itself against infantry, and its ceiling is a third of a Tunguska's." },
  spg_b: { fac:"gbr", role:"spg", name:"Archer", full:"Archer FH77BW L5 155mm", cat:"vehicle",
    cost:1550, oil:20, time:22, hp:640, armor:"light", speed:2.1, turn:2.0, sight:5.5, r:15, mass:34,
    layer:"ground", weapons:["howitzer_52"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.7,
    desc:"A wheeled, fully automatic 52-calibre gun bought from Sweden in 2024 after 32 AS-90s went to Ukraine. It fires from the cab without anyone leaving it and is moving again in thirty seconds - shoot-and-scoot in the literal sense. Fourteen systems. The AS-90 it partly replaces entered service in 1993 and was never upgraded." },
  mlrs_b: { fac:"gbr", role:"mlrs", name:"M270 MLRS", full:"M270A2 with GMLRS", cat:"vehicle",
    cost:2200, oil:34, time:30, hp:700, armor:"light", speed:1.3, turn:1.3, sight:5.5, r:15, mass:25,
    layer:"ground", weapons:["mlrs"], prereq:["factory","lab"], tech:3, turret:true, tturn:0.8,
    desc:"The Royal Artillery's longest reach, and it is a rocket. Britain bought M270 without ATACMS and has fielded no surface-to-surface missile since Lance left in 1993, so where the US launcher can reach 300km this one stops at the end of a GMLRS trajectory. It sows no mines." },
  helo_b: { fac:"gbr", role:"gunship", name:"Apache AH-64E", full:"AH-64E Apache (British Army)", cat:"aircraft",
    cost:1650, oil:26, time:22, hp:620, armor:"air", speed:3.6, turn:2.2, sight:9.5, r:16, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    desc:"Fifty new-build AH-64Es replacing the licence-built AH.1, fully operational from 2024. Manned-unmanned teaming, uprated engines, and a folding rotor so it can go to sea on a carrier or an assault ship - which is how Britain intends to use it." },
  trans_b: { fac:"gbr", role:"transport", name:"Chinook HC6A", full:"Boeing Chinook HC.6A", cat:"aircraft",
    cost:1250, oil:20, time:18, hp:700, armor:"air", speed:4.2, turn:1.9, sight:7.6, r:17, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:14, ammo:0,
    desc:"Britain lifts with a tandem-rotor heavy, not a utility helicopter: roughly twice a Black Hawk's load, digital cockpit, and the most fought-over airframe in every British operation since the Falklands. There have never been enough of them." },
  fighter_b: { fac:"gbr", role:"fighter", name:"Typhoon FGR4", full:"Eurofighter Typhoon FGR.4", cat:"aircraft",
    cost:1450, oil:31, time:20, hp:440, armor:"air", speed:8.8, turn:2.2, sight:10.5, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    desc:"Supercruise, canard-delta agility and Meteor - a ramjet missile with the longest no-escape zone in NATO. Against that, it still flies a mechanically scanned Captor-M radar: the ECRS Mk2 active array is funded but not in service, so the best missile in Europe is cued by the oldest radar in its class." },
  bomber_b: { fac:"gbr", role:"cas", name:"Typhoon (strike fit)", full:"Typhoon FGR.4 with Brimstone 3 and Paveway IV", cat:"aircraft",
    cost:1900, oil:38, time:26, hp:440, armor:"air", speed:8.4, turn:2.1, sight:9.5, r:16, mass:0,
    layer:"air", weapons:["jdam"], prereq:["airbase","lab"], tech:3, jet:true, ammo:5,
    desc:"Say this plainly: Britain has had no dedicated close air support aircraft since the Harrier went in 2010 and Tornado GR4 in 2019. The mission is now flown by the air-superiority fighter carrying Brimstone - a millimetre-wave missile precise enough to take one moving vehicle out of a convoy - and there is no armoured gun platform behind it." },
  sam_b: { fac:"gbr", role:"sam", name:"Sky Sabre", full:"Sky Sabre (Land Ceptor, CAMM)", cat:"vehicle",
    cost:2100, oil:28, time:26, hp:520, armor:"light", speed:1.4, turn:1.3, sight:11.5, r:15, mass:20,
    layer:"ground", weapons:["sam_camm"], prereq:["factory","radar","lab"], tech:3, turret:false,
    deploy:true, deploySec:5.0, radar:11, radarQ:17, rounds:8,
    desc:"Eight soft-launched active-radar missiles that can turn onto a target behind the launcher, a Giraffe radar and a fire-control system that can hold twenty-four engagements at once - a genuine generational jump over the Rapier it replaced in 2021. But its reach is about 25km. Britain has had no long-range or anti-ballistic air defence of any kind since Bloodhound retired in 1991." },
  stealth_b: { fac:"gbr", role:"stealthfighter", name:"F-35B Lightning", full:"F-35B Lightning (617 Sqn)", cat:"aircraft",
    cost:2600, oil:48, time:34, hp:500, armor:"air", speed:9.2, turn:2.3, sight:12.2, r:16, mass:0,
    layer:"air", weapons:["aam_lo","sdb"], prereq:["airbase","lab"], tech:3, jet:true, ammo:5, stealth:0.62,
    desc:"The short take-off and vertical landing variant, in British service since 2018, flown by the RAF and the Fleet Air Arm from the same squadrons. The lift fan is what lets it operate from a ramp-equipped carrier with no catapult, and it is also what costs it fuel and bay volume - the B has the shortest legs and the smallest magazine of the three variants." },
  awacs_b: { from:"e20", fac:"gbr", role:"awacs", name:"E-7 Wedgetail AEW1", full:"Boeing E-7A Wedgetail AEW.1", cat:"aircraft",
    cost:3400, oil:70, time:34, hp:600, armor:"air", speed:4.3, turn:0.9, sight:15.5, r:26, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar","lab"], tech:3, jet:true, ammo:0,
    radarQ:42, rcs:2.8, gen:4.5, awacs:true,
    desc:"A fixed dorsal MESA array instead of a rotating dome: it can stare electronically in one direction while still scanning, which a rotodome cannot. Three aircraft, cut from five, entering service from 2025 - and Britain went without any airborne early warning of its own from the Sentry's retirement in 2021 until they arrived." },
  airlift_b: { from:"e20", fac:"gbr", role:"airlift", name:"A400M Atlas", full:"Airbus A400M Atlas C.1", cat:"aircraft",
    cost:2000, oil:48, time:26, hp:740, armor:"air", speed:3.9, turn:1.2, sight:8, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, jet:false, ammo:0, cargo:14, radius:95, rcs:4.4,
    desc:"Eight-bladed scimitar propellers, jet-like speed, and it lands on the dirt strip a C-17 cannot use while carrying more than twice a Hercules. Twenty-two of them replaced the entire C-130 fleet in 2023, alongside eight C-17s for anything tank-sized." },
  cawacs_b: { from:"e20", fac:"gbr", role:"cawacs", name:"Crowsnest", full:"Merlin HM2 with Crowsnest AEW", cat:"aircraft",
    cost:1750, oil:32, time:19, hp:420, armor:"air", speed:3.0, turn:2.1, sight:12.4, r:13, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:3, jet:false, ammo:0,
    radar:24, radarQ:18, rcs:2.4, gen:4.5, radius:26, awacs:true, hover:true, carrierCapable:true,
    desc:"The same Searchwater 2000 aerial the Sea King carried, in a roll-on bag that fits any of thirty Merlin HM2 when the job calls for it - ten kits rather than ten aircraft. Initial operating capability in 2021, in time to sail with HMS Queen Elizabeth and three years after the Sea King it replaced was retired. A helicopter radar is not an E-2D, and the figures here say so: this is the capability the Queen Elizabeth class is SHORT of, not one it does without." },
  ew_b: { from:"e20", fac:"gbr", role:"ewair", name:"Airseeker R.1", full:"Boeing RC-135W Rivet Joint, 51 Squadron", cat:"aircraft",
    cost:2900, oil:52, time:31, hp:560, armor:"air", speed:4.2, turn:0.9, sight:13.0, r:20, mass:0,
    layer:"air", weapons:[], prereq:["airbase","lab"], tech:3, jet:true, ammo:0,
    radar:15, radarQ:22, rcs:3.6, gen:4.0, radius:70, noAuto:true,
    desc:"Three airframes converted from KC-135R tankers, delivered from November 2013 and flown under a co-operative programme that puts RAF crews in American aircraft and American crews in these. It COLLECTS and does not jam - which is the entry the French Gabriel and Archange already get in this roster, so the same reading applies here. Britain's last JAMMING aircraft was the Canberra T.17, and 360 Squadron disbanded on 31 October 1994." },
  tanker_b: { from:"e20", fac:"gbr", role:"tanker", name:"Voyager KC3", full:"Airbus Voyager KC.3 (A330 MRTT)", cat:"aircraft",
    cost:3100, oil:68, time:39, hp:740, armor:"air", speed:4.4, turn:0.9, sight:9, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0,
    radius:145, tanker:400, refuelRate:15, rcs:5.0,
    desc:"Probe-and-drogue only - no boom - so it can refuel British and European aircraft but not an American one without a probe, which is a real coalition constraint. Fourteen aircraft held under a PFI contract, part of which flies as an airline in peacetime." },

  /* ---- the four era-spanning infantry and logistics roles ----
     These have no era entries anywhere in the roster: mg, mortar, sniper and
     supply are authored once here with from:"e50" and carry every era. The
     British land package covered e50-e00 and the modern package covered the
     present day, and both recorded these four as owed rather than absent —
     without them this army has no machine-gun team, no mortar, no sniper and
     no supply truck in ANY era, which is not a historical gap. */
  mg_b: { from:"e50", fac:"gbr", role:"mg", name:"GPMG (SF) Team", full:"Weapons Team, L7A2 GPMG in the sustained-fire role", cat:"infantry",
    cost:290, oil:0, time:7, hp:112, armor:"infantry", speed:0.82, turn:6, sight:6.4, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"The same gun since 1961 — the FN MAG, built at Enfield as the L7 and still the section and sustained-fire machine gun sixty years later. On the C2 tripod with a dial sight it shoots indirect onto a map reference at 1,800 metres, which almost no other army still teaches." },
  mortar_b: { from:"e50", fac:"gbr", role:"mortar", name:"Mortar Section", full:"Mortar Section, L16A2 81mm", cat:"infantry",
    cost:495, oil:0, time:11, hp:100, armor:"infantry", speed:0.72, turn:6, sight:5.2, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true,
    desc:"The L16 of 1965 is the most widely copied mortar in the world and the Americans adopted it themselves as the M252. Britain went no heavier: there is no 120mm in the British infantry battalion, so the mortar line stops at 81mm and the weight of fire beyond it belongs to the guns." },
  sniper_b: { from:"e60", fac:"gbr", role:"sniper", name:"Sniper Pair", full:"Sniper Pair, L115A3 (.338 Lapua)", cat:"infantry",
    cost:720, oil:0, time:14, hp:90, armor:"infantry", speed:0.78, turn:6, sight:10.8, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"An unbroken sniping tradition, and the trade was never allowed to lapse the way it was in some armies. The L42A1 of 1970 was a rebarrelled wartime Lee-Enfield; the L96 followed in 1985 and the .338 L115A3 in 2007, with which the longest confirmed sniper kill of its day was made at 2,475 metres." },
  supply_b: { fac:"gbr", role:"supply", name:"MAN SV", full:"MAN SV 9t Support Vehicle", cat:"vehicle",
    cost:740, oil:6, time:11, hp:590, armor:"light", speed:1.88, turn:2.0, sight:6.0, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:880, supplyRange:5.0,
    desc:"Fuel, ammunition and water forward, then back to the depot. British logistics is built to move a brigade a long way rather than to sustain a corps, and it leans on chartered shipping to do it — which is what supplyMul 0.95 records." },
});

/* ==================================================================
   FRENCH ARMED FORCES — the present day (e20), suffix _f
   ==================================================================
   Sovereign where it counts and honest about where it is not. The HK416F
   is a German rifle, the carrier's early-warning aircraft is an American
   E-2C and the Tigre's missile is a Hellfire because the European Trigat
   was cancelled; what is wholly French is the warhead, the reactor, the
   airframe and the missile industry that built Exocet, Aster, SCALP and
   the AASM.

   THE EMPTY SLOTS, every one of them deliberate:
     tel    — EMPTY, and the single most important structural difference
              from the American roster. Hades was accepted in 1992, put
              into store in 1993 without ever standing alert, and
              dismantled by 1997. France never bought ATACMS with its
              M270s and has no PrSM equivalent, so since 1997 there has
              been no French mobile ballistic launcher of any kind,
              nuclear or conventional.
     sead   — EMPTY. ARMAT left service with the Jaguar in the 2000s and
              was never replaced. France has no anti-radiation missile.
     ewair  — ew_f is FILLED but carries jam:0 on purpose. Archange is
              three business jets full of receivers replacing the C-160
              Gabriel; France has never operated an electronic-attack
              aircraft and has no programme for one. Treat the role as
              functionally empty and read the card.
     heavybomber / stealthbomber / gunshipair / stealthfighter /
     cstealth — none, ever. France declined the JSF outright, FCAS has
              not flown a demonstrator, and the Charles de Gaulle air
              group is Rafale M only. hbomber_f WAS written by the roster
              as the Rafale B carrying ASMP-A, and it is left out here for
              the same reason the Vulcan is left off the British roster:
              strategic bombers are American-only in this game, and a
              two-seat fighter with one stand-off missile is not a bomber
              whatever role it would have to occupy. France's airborne
              deterrent is on the faction card instead. Restoring it means
              pasting back hbomber_f and the five fra_e**_heavybomber era
              entries from the France roster documents; nothing else
              depends on them.
     heavy  — EMPTY. No French tank heavier than the Leclerc and no
              hard-kill active protection on any French vehicle: Galix is
              a smoke and decoy dispenser.
     tankdestroyer — EMPTY. VAB Méphisto withdrew in the 2010s and the
              anti-tank missile moved onto the EBRC Jaguar, which sits in
              the lighttank slot as a reconnaissance vehicle.
     ewveh  — EMPTY. French ground electronic-warfare units exist but no
              vehicle in the Prophet or Krasukha class is publicly
              identified by designation and in-service date, so nothing is
              claimed rather than inventing one.
     minelaying — France signed Ottawa in 1997 and Oslo in 2008. There is
              no French cargo-mine shell or rocket, so neither spg_f nor
              mlrs_f carries a dispenser, unlike their American opposites.
   mg_f, mortar_f, sniper_f and supply_f carry NO `from`, so the
   ERA_TIMELESS stamp gives them e50 and this army has a machine-gun team,
   a mortar section, a sniper pair and a supply truck in every era. Their
   cards name what held the role in the earlier decades.
   cfighter_f and cawacs_f are carrier aviation and are authored here
   rather than with the navies: game.js fills a deck from unitFor(fac,
   "cfighter"), so a French hull sails with an empty deck until they
   exist.
   ================================================================== */
Object.assign(UNITS, {
/* -------- infantry -------- */
  rifle_f: { fac:"fra", role:"rifle", name:"Groupe de combat", full:"Groupe de combat, HK416F", cat:"infantry",
    cost:155, oil:0, time:5, hp:115, armor:"infantry", speed:1.05, turn:7, sight:6.2, r:6, mass:0.1,
    layer:"ground", weapons:["rifle"], prereq:["barracks"], tech:1, from:"e20",
    desc:"France retired the FAMAS in 2017 after thirty-seven years and bought a German rifle, because no French factory had built a service rifle since the Manufacture de Saint-Etienne closed. 117,000 HK416F, plus the FELIN sight and radio kit on top." },
  mg_f: { fac:"fra", role:"mg", name:"MAG 58 Team", full:"Equipe mitrailleuse, MAG 58 7,62mm", cat:"infantry",
    cost:280, oil:0, time:7, hp:110, armor:"infantry", speed:0.82, turn:6, sight:6.2, r:6, mass:0.1,
    layer:"ground", weapons:["lmg"], prereq:["barracks"], tech:1,
    desc:"Era-spanning: the AA-52 held this role from 1952 and the Belgian MAG replaced it from the 2000s. Same weapon as the British GPMG and the American M240 - the one place where the three armies genuinely share a gun." },
  at_f: { fac:"fra", role:"at", name:"MMP Team", full:"Equipe antichar, MMP / Akeron MP", cat:"infantry",
    cost:410, oil:0, time:9, hp:105, armor:"infantry", speed:0.88, turn:6, sight:7.4, r:6, mass:0.1,
    layer:"ground", weapons:["atgm_inf"], prereq:["barracks"], tech:1, from:"e20",
    desc:"Fire-and-forget top-attack, plus a fibre-optic link that lets the gunner watch the missile's own seeker and re-aim or abort in flight - something Javelin cannot do. In service 2017, twenty-one years after Javelin, and it replaced a wire-guided MILAN that was still front-line until then." },
  aa_f: { fac:"fra", role:"aa", name:"Mistral Team", full:"Equipe SATCP, Mistral 3", cat:"infantry",
    cost:355, oil:0, time:8, hp:100, armor:"infantry", speed:0.9, turn:6, sight:8.0, r:6, mass:0.1,
    layer:"ground", weapons:["manpad"], prereq:["barracks"], tech:1, from:"e20",
    desc:"Mistral 3 (2019) has an imaging seeker that can take a drone or a cruise missile against a hot background. Heavier than a Stinger, harder-hitting, tripod-launched rather than shoulder-fired, and for most French brigades it is the entire air defence." },
  mortar_f: { fac:"fra", role:"mortar", name:"MO 120 RT Section", full:"Section mortier, MO 120 RT 120mm", cat:"infantry",
    cost:520, oil:0, time:12, hp:100, armor:"infantry", speed:0.68, turn:6, sight:5.0, r:6, mass:0.1,
    layer:"ground", weapons:["mortar"], prereq:["barracks"], tech:2, deploy:true, rounds:16,
    desc:"A rifled 120mm towed mortar - not the smoothbore 81mm every other army calls a mortar section. Spin-stabilised bombs out to 13 km with artillery accuracy, at the cost of a 582 kg weapon that needs a vehicle to move. France has used it as light artillery since 1973 and still does, and the Brandt 81mm and 120mm before it go back to the 1930s - which is why this section carries every era." },
  sniper_f: { fac:"fra", role:"sniper", name:"Hecate II Team", full:"Equipe tireur d'elite, PGM Hecate II", cat:"infantry",
    cost:700, oil:0, time:14, hp:90, armor:"infantry", speed:0.78, turn:6, sight:10.5, r:6, mass:0.1,
    layer:"ground", weapons:["sniper"], prereq:["barracks","radar"], tech:2, stealthMove:true,
    desc:"12.7mm anti-materiel rifle, French-designed and in service since 1993. Kills equipment as readily as people out past 1,800 m. The trade never lapsed: a scoped MAS 36 in the 1950s, the FR-F1 in 7.5mm from 1966 and the FR-F2 from 1984 carry the earlier eras." },

/* -------- vehicles -------- */
  recon_f: { fac:"fra", role:"recon", name:"VBL Ultima", full:"Panhard VBL Ultima", cat:"vehicle",
    cost:400, oil:5, time:7, hp:330, armor:"light", speed:2.85, turn:3.3, sight:9.5, r:11, mass:5,
    layer:"ground", weapons:["hmg"], prereq:["factory"], tech:1, turret:true, tturn:2.4, from:"e20",
    desc:"A five-tonne armoured car, smaller than a Humvee and actually armoured, rebuilt in 2021 to run to 2035 because its replacement keeps slipping. Amphibious, air-portable, and now carrying more weight than the chassis was ever designed for." },
  ifv_f: { fac:"fra", role:"ifv", name:"VBCI", full:"Nexter VBCI 25mm", cat:"vehicle",
    cost:920, oil:11, time:14, hp:850, armor:"light", speed:1.92, turn:2.2, sight:7.5, r:14, mass:32,
    layer:"ground", weapons:["autocannon"], prereq:["factory"], tech:1, turret:true, tturn:1.8, cargo:9, from:"e20",
    desc:"Eight wheels, thirty-two tonnes, 100 km/h, nine dismounts. France went wheeled where America and Germany went tracked, on the argument that its wars are 3,000 km away and getting there matters more than cross-country speed. Behind it the Scorpion programme's Griffon carries the rest of the infantry with a remote weapon station and no turret." },
  lt_f: { fac:"fra", role:"lighttank", name:"EBRC Jaguar", full:"EBRC Jaguar, 40mm CTA and MMP", cat:"vehicle",
    cost:820, oil:10, time:13, hp:730, armor:"light", speed:2.15, turn:2.5, sight:8.2, r:13, mass:25,
    layer:"ground", weapons:["gun_light"], prereq:["factory"], tech:1, turret:true, tturn:1.7, from:"e20",
    desc:"A 40mm cased-telescoped cannon, developed jointly with Britain, plus two MMP missiles in the same turret - so one vehicle covers everything from a drone to a tank. It replaced the AMX-10 RC and the Sagaie from 2022. Twenty-five tonnes on six wheels: it dies to anything that hits it, and it is the reconnaissance regiment's only gun." },
  mbt_f: { fac:"fra", role:"mbt", name:"Leclerc XLR", full:"Leclerc XLR (Scorpion standard)", cat:"vehicle",
    cost:1520, oil:22, time:22, hp:1700, armor:"heavy", speed:1.72, turn:1.65, sight:8.0, r:16, mass:58,
    layer:"ground", weapons:["gun_120"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.7, crush:true, from:"e20",
    desc:"The only Western tank with a bustle autoloader: three crew, 22 ready rounds, six a minute, and a hull four tonnes lighter than an Abrams on a 1,500 hp hyperbar diesel that makes it the fastest MBT in the game. XLR (2022) adds the Scorpion battle-management net, remote weapon station and belly and cage armour. Two hundred are being rebuilt out of 406 ever built, on a line that closed in 2008 - France cannot make another one." },
  spaag_f: { fac:"fra", role:"spaag", name:"Crotale NG", full:"Crotale NG, VT-1", cat:"vehicle",
    cost:1000, oil:14, time:15, hp:640, armor:"light", speed:1.25, turn:1.4, sight:9.5, r:14, mass:15,
    layer:"ground", weapons:["spaag"], prereq:["factory","radar"], tech:2, turret:true, tturn:2.4, from:"e20",
    desc:"Pulse-Doppler search, TWT tracker, TV and IR channels, eight VT-1 missiles. It belongs to the air force and defends airfields. The Armee de Terre gave up Roland in the late 2000s and has had no vehicle-mounted short-range air defence since - Mistral teams and towed 20mm guns are the whole of it, which Ukraine has made look like a serious mistake." },
  spg_f: { fac:"fra", role:"spg", name:"CAESAR", full:"CAESAR 155mm 52-cal on 6x6", cat:"vehicle",
    cost:1250, oil:14, time:17, hp:460, armor:"light", speed:2.35, turn:2.6, sight:5.5, r:14, mass:18,
    layer:"ground", weapons:["howitzer"], prereq:["factory","radar"], tech:2, turret:true, tturn:0.7,
    deploy:true, deploySec:4, from:"e20",
    desc:"A 52-calibre 155 bolted to an eighteen-tonne lorry with an unarmoured cab - a different idea from a tracked SPG, not a cheaper one. In action in sixty seconds, out again in sixty, 40 km with a base-bleed shell, and it fits inside an A400M. It cannot take a single fragment, and both halves of that bargain have been proved in Ukraine. It cannot lay a minefield: France signed Ottawa and Oslo and has no cargo-mine shell." },
  mlrs_f: { fac:"fra", role:"mlrs", name:"LRU", full:"Lance-Roquettes Unitaire (M270 GMLRS)", cat:"vehicle",
    cost:2200, oil:34, time:30, hp:700, armor:"light", speed:1.3, turn:1.3, sight:5.5, r:15, mass:25,
    layer:"ground", weapons:["mlrs"], prereq:["factory","lab"], tech:3, turret:true, tturn:0.8, from:"e20",
    desc:"Thirteen launchers. That is the whole of French rocket artillery: 55 M270s cut to 13 rebuilt for the GPS-guided unitary rocket, the cluster stock destroyed under Oslo, and a replacement not due until the late 2020s. Accurate to metres at 70 km, and there is almost none of it. No mine-laying rocket - France has never had one." },
  /* NOT IN THE ROSTER DOCUMENT AND ADDED HERE. The France package entered
     SAMP/T at e00 and then wrote no present-day sam row, which would have
     left France the only Western army in the game with an area SAM in 2011
     and none in 2025 — and its own gap list never claims the slot is empty.
     SAMP/T is in service, went to Ukraine in 2023, and the Aster 30 B1NT
     round entered service in 2025, so the honest present-day entry is the
     same system, upgraded. */
  sam_f: { fac:"fra", role:"sam", name:"SAMP/T Mamba", full:"SAMP/T with Aster 30 B1NT", cat:"vehicle",
    cost:2750, oil:38, time:34, hp:580, armor:"light", speed:1.2, turn:1.1, sight:13.6, r:16, mass:34,
    layer:"ground", weapons:["sam_area3"], prereq:["factory","radar","lab"], tech:3, turret:false,
    deploy:true, deploySec:5.0, radar:13, radarQ:19, rounds:8, from:"e20",
    desc:"The only long-range surface-to-air missile in service anywhere that was designed in Europe. Eight Aster 30 in vertical cells on a lorry, an Arabel or GF300 radar, and a terminal stage that steers on side thrusters and pulls 60 g in the last instant instead of on fins alone. Competitive with PAC-3 against aircraft and shorter-ranged ballistic missiles, and there are only about eight batteries - one of which went to Ukraine in 2023." },
  radarv_f: { fac:"fra", role:"radarv", name:"COBRA", full:"COBRA counter-battery radar", cat:"vehicle",
    cost:1200, oil:12, time:16, hp:500, armor:"light", speed:1.6, turn:1.7, sight:9, r:14, mass:18,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, turret:true, tturn:0.9,
    radar:14, radarQ:20, from:"e20",
    desc:"Franco-German-British phased array that back-plots a shell to the gun that fired it. Ten in French service. Before it, the French army had battlefield surveillance radars and no counter-battery capability at all." },
  supply_f: { fac:"fra", role:"supply", name:"PPLOG", full:"Porteur Polyvalent Logistique", cat:"vehicle",
    cost:700, oil:6, time:11, hp:600, armor:"light", speed:1.9, turn:2, sight:6, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory"], tech:1, supply:900, supplyRange:5,
    desc:"Armoured-cab 8x8 flatrack lorry. Moves the ammunition that CAESAR fires faster than anyone can bring it forward." },

/* -------- air -------- */
  helo_f: { fac:"fra", role:"gunship", name:"Tigre HAD", full:"Airbus Helicopters Tigre HAD", cat:"aircraft",
    cost:1550, oil:25, time:22, hp:590, armor:"air", speed:3.6, turn:2.5, sight:9.4, r:16, mass:0,
    layer:"air", weapons:["hellfire","chaingun"], prereq:["airbase"], tech:2, hover:true, ammo:8,
    gen:4.0, rcs:0.55, radarQ:4.0, radius:22, from:"e20",
    desc:"Six tonnes against the Apache's ten: quicker, quieter, shorter-legged, and with no mast-mounted radar - the Tigre must expose itself to find a target where a Longbow Apache does not. Hellfire II because the European Trigat missile it was designed around was cancelled." },
  trans_f: { fac:"fra", role:"transport", name:"NH90 Caiman", full:"NHIndustries NH90 TTH Caiman", cat:"aircraft",
    cost:950, oil:15, time:15, hp:530, armor:"air", speed:4.1, turn:2.4, sight:8, r:15, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, hover:true, cargo:12, ammo:0,
    gen:4.5, rcs:0.85, radarQ:1.5, radius:32, from:"e20",
    desc:"Composite airframe, fly-by-wire with no mechanical reversion, fourteen to twenty troops. Fifteen years late and expensive enough that too few were bought, so the Puma of 1970 flew beside it into the 2020s." },
  fighter_f: { fac:"fra", role:"fighter", name:"Rafale", full:"Dassault Rafale, standard F4", cat:"aircraft",
    cost:1480, oil:31, time:21, hp:450, armor:"air", speed:8.8, turn:2.2, sight:11.2, r:15, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:6,
    gen:4.5, rcs:0.70, radarQ:15.0, radius:42, refuelable:true, from:"e20",
    desc:"Close-coupled canard delta, RBE2 AESA, and SPECTRA - a self-protection suite that finds and jams threats on its own instead of relying on an escort, which matters enormously to an air force that has no jamming aircraft at all. Omnirole: one airframe does the fighter, strike, reconnaissance and nuclear jobs. Not stealthy, and never meant to be." },
  bomber_f: { fac:"fra", role:"cas", name:"Mirage 2000D RMV", full:"Mirage 2000D RMV", cat:"aircraft",
    cost:1750, oil:35, time:25, hp:520, armor:"air", speed:7.2, turn:1.8, sight:9, r:17, mass:0,
    layer:"air", weapons:["jdam","chaingun"], prereq:["airbase","lab"], tech:3, jet:true, ammo:5,
    gen:4.0, rcs:1.10, radarQ:4.0, radius:32, refuelable:true, from:"e20",
    desc:"Fifty airframes rebuilt in 2021 to carry a gun pod, the Hammer glide bomb and MICA, keeping them flying to 2035. It is the closest thing France has to a close-support aircraft, and it is a 1990s two-seat bomber with no armour: there has never been a French A-10 and there is no plan for one." },
  ew_f: { fac:"fra", role:"ewair", name:"Archange", full:"Dassault Falcon 8X Archange (CUGE)", cat:"aircraft",
    cost:2600, oil:44, time:31, hp:480, armor:"air", speed:6.4, turn:1.4, sight:13.5, r:18, mass:0,
    layer:"air", weapons:[], prereq:["airbase","lab"], tech:3, jet:true, ammo:0,
    jam:0, jamPower:0, radar:12, radarQ:22, gen:4.5, rcs:1.2, radius:60, refuelable:true, noAuto:true, from:"e20",
    desc:"Read this slot honestly: France has never operated an electronic-attack aircraft, and Archange is not one either. It is three business jets full of receivers that find, locate and fingerprint hostile emitters, replacing the C-160 Gabriel from 2025. It jams nothing and carries nothing - and since ARMAT left service France has had no anti-radiation missile to hand the targets to. Every French package into a defended area borrows American Growlers." },
  awacs_f: { fac:"fra", role:"awacs", name:"E-3F Sentry", full:"Boeing E-3F SDA", cat:"aircraft",
    cost:3400, oil:70, time:34, hp:620, armor:"air", speed:4.2, turn:0.9, sight:16, r:26, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar","lab"], tech:3,
    jet:true, ammo:0, radar:14, radarQ:38, rcs:3.2, gen:3.5, radius:65, awacs:true, refuelable:true, from:"e20",
    desc:"Four aircraft, bought outright in 1991 so that France could see the air picture without asking the NATO pool, and upgraded again in 2025. The APY-2 antenna underneath is still the 1977 design. Four airframes is the entire national capability: two in depot and the picture goes dark." },
  cfighter_f: { fac:"fra", role:"cfighter", name:"Rafale M", full:"Dassault Rafale M, standard F4", cat:"aircraft",
    cost:1550, oil:32, time:20, hp:450, armor:"air", speed:8.7, turn:2.2, sight:10.4, r:16, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:5,
    gen:4.5, rcs:0.70, radarQ:15.0, radius:38, carrierCapable:true, refuelable:true, radar:7, from:"e20",
    desc:"The first Rafale variant to enter service, in 2001, four years before the air force got one. A jump strut, a single nose wheel and an arrestor hook on the same airframe - France is the only country outside the United States operating catapult-launched conventional carrier fighters, and this is the only aircraft type its carrier flies." },
  cawacs_f: { fac:"fra", role:"cawacs", name:"E-2C Hawkeye", full:"Northrop Grumman E-2C Hawkeye 2000", cat:"aircraft",
    cost:2900, oil:58, time:30, hp:500, armor:"air", speed:4.3, turn:1.0, sight:13, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:3, jet:true, ammo:0,
    radar:26, radarQ:28, rcs:2.6, gen:4.0, radius:52, awacs:true, carrierCapable:true, from:"e20",
    desc:"Three aircraft, bought from the United States in 1998 because nothing European exists that can do this off a deck. The reason a French carrier group can see past its own horizon at all. E-2D on order for the late 2020s." },
  airlift_f: { fac:"fra", role:"airlift", name:"A400M Atlas", full:"Airbus A400M Atlas", cat:"aircraft",
    cost:2200, oil:54, time:29, hp:780, armor:"air", speed:3.9, turn:1.3, sight:8.5, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase"], tech:2, jet:false, ammo:0,
    gen:4.0, rcs:4.2, radarQ:0, radius:90, cargo:14, magazine:2, from:"e20",
    desc:"Thirty-seven tonnes of payload on eight-bladed scimitar propellers - jet-speed cruise, dirt-strip landing, and the only aircraft that fills the gap between a Hercules and a C-17. Fourteen years late and ruinously expensive, and the sole reason France can put an armoured vehicle into the Sahel without asking Washington for the lift." },
  tanker_f: { fac:"fra", role:"tanker", name:"A330 MRTT Phenix", full:"Airbus A330 MRTT Phenix", cat:"aircraft",
    cost:3300, oil:72, time:41, hp:790, armor:"air", speed:4.4, turn:0.9, sight:9, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0,
    radius:150, tanker:440, refuelRate:16, rcs:5.4, gen:4, from:"e20",
    desc:"Boom and hose on one airframe, and it carries freight and casualties as well. It replaced eleven sixty-year-old C-135FRs on which the entire airborne deterrent depended - the most consequential French air force purchase of the decade, and the fleet is still only around fifteen aircraft." },
});

/* faction-specific weapons */
Object.assign(WEAPONS, {
  koksan: { name:"170mm gun", dmg:200, warhead:"frag", range:20.0, minRange:6.0, reload:13.0, burst:1,
            acc:0.24, proj:"arc", speed:230, aoe:2.8, suppress:75, tgt:{ground:1,air:0,sea:1,sub:0} },
  mrl240: { name:"240mm rocket pod", dmg:62, warhead:"frag", range:12.5, minRange:3.0, reload:15.0,
            burst:16, burstDelay:0.13, acc:0.16, proj:"arc", speed:240, aoe:2.2, suppress:45,
            tgt:{ground:1,air:0,sea:1,sub:0} },
});


/* ==================== ELECTRONIC WARFARE ====================
   Two coupled systems:
   SEAD  - anti-radiation missiles home on emitting radars. They do crushing
           damage to anything with a `radar` fit and little to anything else,
           so they are a scalpel for prying open an air-defence network.
   ECM   - jammers project a bubble that blinds hostile radar inside it. Fire
           directed into a jammed area falls back to blind accuracy, and
           radar-guided missiles launched from inside it degrade badly.
   NATO and the PLA field airborne jammers and the deepest SEAD inventories;
   the Eastern Coalition relies on powerful but ground-bound systems.        */
Object.assign(WEAPONS, {
  harm:    { name:"AGM-88 HARM", dmg:210, warhead:"he", range:10.5, minRange:1.5, reload:6.0, burst:1,
             acc:0.88, proj:"missile", speed:520, aoe:1.4, ammo:1, antiRadiation:true, manual:true,
             tgt:{ground:1,air:0,sea:1,sub:0} },
  arm_kh:  { name:"Kh-31P ARM", dmg:230, warhead:"he", range:10.0, minRange:1.5, reload:6.6, burst:1,
             acc:0.84, proj:"missile", speed:560, aoe:1.5, ammo:1, antiRadiation:true, manual:true,
             tgt:{ground:1,air:0,sea:1,sub:0} },
  arm_yj:  { name:"YJ-91 ARM", dmg:220, warhead:"he", range:10.8, minRange:1.5, reload:6.2, burst:1,
             acc:0.87, proj:"missile", speed:540, aoe:1.4, ammo:1, antiRadiation:true, manual:true,
             tgt:{ground:1,air:0,sea:1,sub:0} },
  arm_gnd: { name:"ground-launched ARM", dmg:180, warhead:"he", range:12.0, minRange:2.5, reload:9.0, burst:1,
             acc:0.86, proj:"missile", speed:480, aoe:1.3, antiRadiation:true, manual:true,
             tgt:{ground:1,air:0,sea:1,sub:0} },
});

Object.assign(UNITS, {
  /* ---- airborne electronic attack ---- */
  ew_n: { fac:"nato", role:"ewair", name:"EA-18G Growler", full:"EA-18G Growler", cat:"aircraft",
    cost:2800, oil:44, time:32, hp:520, armor:"air", speed:7.6, turn:1.9, sight:12.5, r:16, mass:0,
    layer:"air", weapons:["harm"], prereq:["airbase","lab"], tech:3, jet:true, ammo:4,
    jam:9.5, jamPower:1.0, radar:10,
    desc:"Airborne electronic attack. Its jamming pods blind every hostile radar within nine tiles, and it carries HARM to kill the emitters that keep transmitting. The single most disruptive aircraft in the game." },
  ew_c: { fac:"pla", role:"ewair", name:"J-16D", full:"Shenyang J-16D", cat:"aircraft",
    cost:2700, oil:42, time:31, hp:560, armor:"air", speed:7.8, turn:1.9, sight:12.0, r:16, mass:0,
    layer:"air", weapons:["arm_yj"], prereq:["airbase","lab"], tech:3, jet:true, ammo:4,
    jam:9.0, jamPower:0.95, radar:10,
    desc:"Electronic-attack Flanker with wingtip jamming pods and the gun deleted to save weight. China's answer to the Growler, and very nearly its equal." },

  /* ---- ground-based jammers ---- */
  /* Prophet Block I was fielded from 2003-04, not 1980, so from:"e00" - it
     covers e00 and e20, which is right, because Prophet is still the Army's
     ground SIGINT/EW vehicle while TLS-BCT works its way through test.
     eras.js adds TACJAM for e80 and TRAFFIC JAM for e90. e50 and e60 stay
     EMPTY on purpose: the Army had no divisional jamming vehicle before its
     first Combat Electronic Warfare Intelligence battalions stood up in
     1977-78, and until then the jamming mission belonged to the Air Force and
     the Navy - which is what the EB-66, the EA-6A and the EF-111 in this same
     roster already say. */
  ewv_n: { from:"e00", fac:"nato", role:"ewveh", name:"Prophet EW", full:"AN/MLQ-44 Prophet", cat:"vehicle",
    cost:1500, oil:14, time:19, hp:560, armor:"light", speed:1.8, turn:1.9, sight:9, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, jam:7.5, jamPower:0.85, radar:9,
    turret:true, tturn:0.9,
    desc:"Signals-intelligence and jamming vehicle. Parks behind the line and blinds hostile radar over the approach, which collapses enemy long-range accuracy." },
  ewv_c: { from:"e00", fac:"pla", role:"ewveh", name:"CHL-906 Jammer", full:"CHL-906 EW Vehicle", cat:"vehicle",
    cost:1450, oil:14, time:18, hp:580, armor:"light", speed:1.8, turn:1.9, sight:9, r:14, mass:16,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, jam:7.8, jamPower:0.85, radar:9,
    turret:true, tturn:0.9,
    desc:"Truck-mounted communications and radar jammer. The PLA fields these in quantity to win the spectrum before the shooting starts." },
  /* KRASUKHA-4 IS A 2014 MACHINE AND WAS DATED 1960. Ordered 11 September
     2007, factory tests complete 2009, serial production 2011, first delivery
     to the Ministry of Defence November 2013, formally introduced 2014 - which
     is e00 by ERA_INFO. The old from:"e60" was not a label. genContest() reads
     it: dated e60 this vehicle took x0.166 against an e00 or e20 radar, six
     times weaker than it should be, and a fabricated x1.000 against 1960s
     radar it could never meet. At e00 it takes x1.000 against its
     contemporaries, x0.550 against a 2020s set and x2.890 against an 80s one.

     THE EARLIER BANDS STAY EMPTY, and the ladder at the head of the building
     table in this file is why: "radar jamming NATO e80 PACT e80 PLA e00 ROC
     e00 KPA never ... Nobody at all has any of this in the 1950s or the
     1960s." The pact's e80 radar jamming is already in this game as ewsite_p,
     the SPN-4 station - and a set "emplaced on a prepared site for months at a
     time", as its own desc puts it, is a building and not a vehicle. Putting
     an SPN in here as well would count the same hardware twice.

     Considered and rejected for e80: SPR-2 "Rtut-B", VNII Gradient, accepted
     1985 on a BTR-70. Real, dated and mobile - but it jams radio proximity
     FUZES, and `jam` in this game is radar. That would be a worse lie than
     the one being removed. The R-330 "Mandat" family and the R-934B Sinitsa
     have no in-service year in open sources, and the fra ewveh band in
     eras.js is already left empty for exactly that reason. */
  ewv_p: { from:"e00", fac:"pact", role:"ewveh", name:"Krasukha-4", full:"1RL257 Krasukha-4", cat:"vehicle",
    cost:1650, oil:16, time:21, hp:640, armor:"light", speed:1.5, turn:1.6, sight:8.5, r:15, mass:20,
    layer:"ground", weapons:[], prereq:["factory","radar"], tech:2, jam:8.5, jamPower:0.9, radar:8,
    turret:true, tturn:0.7,
    desc:"Heavy ground-based jammer with a huge dish — genuinely formidable, and the Eastern Coalition's main answer to Western air power. Slow, conspicuous, and it cannot follow the air battle the way a Growler can." },

  /* ---- SEAD strike aircraft (defence suppression as a mission) ---- */
  sead_n: { fac:"nato", role:"sead", name:"F-16CJ Wild Weasel", full:"F-16CJ Block 50 SEAD", cat:"aircraft",
    cost:1900, oil:34, time:24, hp:430, armor:"air", speed:8.6, turn:2.0, sight:11.5, r:15, mass:0,
    layer:"air", weapons:["harm"], prereq:["airbase","radar"], tech:2, jet:true, ammo:4,
    desc:"Wild Weasel: hunts radars for a living. HARM does triple damage to anything emitting, and almost nothing to anything else — bring it to break a SAM belt, not to fight a war." },
  sead_c: { fac:"pla", role:"sead", name:"J-16 SEAD", full:"Shenyang J-16 (YJ-91)", cat:"aircraft",
    cost:1950, oil:35, time:25, hp:470, armor:"air", speed:8.2, turn:1.9, sight:11.0, r:16, mass:0,
    layer:"air", weapons:["arm_yj"], prereq:["airbase","radar"], tech:2, jet:true, ammo:4,
    desc:"Heavy multirole Flanker in the defence-suppression role, carrying anti-radiation missiles for the same job." },
  sead_p: { fac:"pact", role:"sead", name:"Su-24M SEAD", full:"Su-24M (Kh-31P)", cat:"aircraft",
    cost:1850, oil:36, time:25, hp:500, armor:"air", speed:7.4, turn:1.6, sight:10.0, r:16, mass:0,
    layer:"air", weapons:["arm_kh"], prereq:["airbase","radar"], tech:2, jet:true, ammo:3,
    desc:"Swing-wing strike aircraft carrying Kh-31P. Fewer shots and shorter legs than a Weasel, but the missile itself is fast and hard to dodge." },
});

/* digital-war doctrine: how well a faction fights in the spectrum */
/* ---- Gulf-War doctrine model ----
   thermal   : fraction of the force with working thermal sights
   fireCtrl   : stabilisation and fire control — accuracy on the move, first shot
   ammoQ      : penetrator quality against heavy armour (DU vs export steel)
   carousel   : Soviet-pattern autoloader carries rounds in the crew compartment,
                so a penetration often detonates the whole load                */
FACTIONS.nato.thermal = 1.00; FACTIONS.nato.fireCtrl = 1.12; FACTIONS.nato.ammoQ = 1.14;
FACTIONS.pla.thermal  = 0.90; FACTIONS.pla.fireCtrl  = 1.11; FACTIONS.pla.ammoQ  = 1.13;
FACTIONS.roc.thermal  = 0.95; FACTIONS.roc.fireCtrl  = 1.06; FACTIONS.roc.ammoQ  = 1.04;
FACTIONS.pact.thermal = 0.55; FACTIONS.pact.fireCtrl = 0.86; FACTIONS.pact.ammoQ = 0.94;
FACTIONS.kpa.thermal  = 0.15; FACTIONS.kpa.fireCtrl  = 0.62; FACTIONS.kpa.ammoQ  = 0.74;
FACTIONS.gbr.thermal  = 1.00; FACTIONS.gbr.fireCtrl  = 1.16; FACTIONS.gbr.ammoQ  = 1.10;
FACTIONS.deu.thermal  = 1.00; FACTIONS.deu.fireCtrl  = 1.18; FACTIONS.deu.ammoQ  = 1.14;
FACTIONS.fra.thermal  = 0.95; FACTIONS.fra.fireCtrl  = 1.06; FACTIONS.fra.ammoQ  = 1.08;
/* No carousel entry for any of the three. Britain has never fielded an
   autoloader. The Leclerc has one, but it is a BUSTLE magazine behind a blast
   door with blowout panels — the precise opposite of what `carousel` models. */
FACTIONS.pact.carousel = 0.55; FACTIONS.kpa.carousel = 0.70; FACTIONS.pla.carousel = 0.30;
FACTIONS.nato.bonus += " Thermal sights and stabilised fire control: fights at night and in sandstorm.";
FACTIONS.pact.bonus += " Autoloader carousels detonate catastrophically when penetrated.";
FACTIONS.kpa.bonus += " Optical sights only — nearly blind after dark.";
FACTIONS.gbr.bonus += " The longest recorded tank-on-tank kill, and crews trained to take it.";
FACTIONS.deu.bonus += " The Abrams fires a German gun: the Rh-120, adopted as the M256 in 1985.";
FACTIONS.fra.bonus += " Armour that chose speed over protection and never went back.";


/* ---- relative standing ----
   NATO and the PLA are peers: the best equipment on the map, and a fight
   between them should be close. Everyone else is behind them by a margin
   that reflects the real gap rather than a token one.
     Taiwan  - capable crews and modern optics, but a mainline tank built on
               an M48 hull, small numbers, and a very high unit cost.
     East    - numerous and cheap, one generation back in fire control and
               optics, and carrying ammunition in the crew compartment.
     KPA     - a 1960s army with 1960s sights.                              */
FACTIONS.nato.accMul = 1.07; FACTIONS.nato.hpMul = 1.03;
FACTIONS.pla.accMul  = 1.06; FACTIONS.pla.hpMul  = 1.06;
FACTIONS.roc.accMul  = 0.99; FACTIONS.roc.hpMul  = 0.95;
FACTIONS.pact.accMul = 0.94; FACTIONS.pact.hpMul = 0.95;
FACTIONS.kpa.accMul  = 0.84; FACTIONS.kpa.hpMul  = 0.86;
/* This block OVERWRITES the FACTIONS table values above. A faction absent here
   keeps its table value while everyone else's is replaced, which is a silent
   inconsistency — so the three new armies restate theirs, unchanged. */
FACTIONS.gbr.accMul  = 1.12; FACTIONS.gbr.hpMul  = 1.08;
FACTIONS.deu.accMul  = 1.10; FACTIONS.deu.hpMul  = 1.07;
FACTIONS.fra.accMul  = 1.03; FACTIONS.fra.hpMul  = 0.94;

FACTIONS.nato.ecm = 1.15;  FACTIONS.nato.eccm = 1.20;   // best jammers, best hardening
FACTIONS.pla.ecm  = 1.12;  FACTIONS.pla.eccm  = 1.15;
FACTIONS.pact.ecm = 0.95;  FACTIONS.pact.eccm = 0.85;   // strong emitters, softer to SEAD
FACTIONS.kpa.ecm  = 0.55;  FACTIONS.kpa.eccm  = 0.55;   // analogue army
FACTIONS.roc.ecm  = 1.05;  FACTIONS.roc.eccm  = 1.10;
FACTIONS.gbr.ecm  = 1.10;  FACTIONS.gbr.eccm  = 1.14;
FACTIONS.fra.ecm  = 1.10;  FACTIONS.fra.eccm  = 1.08;   // Thales EW is genuinely strong
FACTIONS.deu.ecm  = 1.05;  FACTIONS.deu.eccm  = 1.10;

/* ---- how hard this army's guided weapons are to spoof off a satellite fix ----
   The counterpart of eccm, and deliberately NOT the same number: keyed military
   GPS and a null-steering antenna on the round are a different question from
   whether your radars hop frequency, and an army can be good at one and hopeless
   at the other. NATO shoots SAASM and M-code through controlled-reception-pattern
   antennas; Taiwan buys the same kit a block behind; China navigates on a
   constellation of its own; Russia has GLONASS and puts inertial mid-course on
   the rounds that matter; and most of what the KPA fires rides a civil receiver. */
FACTIONS.nato.gpsHard = 1.35;
FACTIONS.roc.gpsHard  = 1.20;
FACTIONS.pla.gpsHard  = 1.15;
FACTIONS.pact.gpsHard = 1.05;
FACTIONS.kpa.gpsHard  = 0.85;
FACTIONS.gbr.gpsHard  = 1.30;   // keyed M-code, on somebody else's terms
FACTIONS.deu.gpsHard  = 1.15;
/* France is the weakest of the Western four here and the reason is NOT that it
   was denied a receiver — French forces use military-code GPS and the AASM
   Hammer is a French GPS/INS weapon in heavy use. It is that France depends on
   a constellation it does not own and does not control, and Galileo's PRS came
   late. Where France IS sovereign in space — Helios, CSO, Syracuse — it is a
   strength Britain and Germany do not have, and that belongs on a card. */
FACTIONS.fra.gpsHard  = 1.10;
FACTIONS.nato.bonus += " Strongest electronic warfare and SEAD.";
FACTIONS.pla.bonus  += " Near-peer electronic warfare and SEAD.";
FACTIONS.kpa.bonus  += " Almost no electronic warfare: its radars are loud and easy to kill.";


/* ==================================================================
   GENERATIONAL AIR COMBAT

   Radar detection range scales with the FOURTH ROOT of radar cross
   section - halving detection range needs a sixteen-fold reduction in
   RCS. That single fact is why a fifth-generation fighter can kill a
   third-generation one that never sees it coming, and it is modelled
   here literally:   detection = radarQ * rcs^0.25

     rcs    : radar cross section relative to a MiG-21 (= 1.0)
     radarQ : this radar's reach in tiles against an rcs 1.0 target
     gen    : generation, shown in the UI

   Two peer stealth fighters cancel out - an F-22 and a J-20 detect one
   another at roughly the same short range and end up in a knife fight.
   What breaks the tie is OFF-BOARD radar: an AWACS or an Aegis ship
   sees far better than any fighter nose, and a good datalink hands that
   track to the shooter. Winning the air war means winning the sensor war.
   ================================================================== */
var AIR = {
  /* ---- third generation: no real radar, huge return ---- */
  fighter_k: { gen:3.0, rcs:1.00, radarQ: 5.0 },
  bomber_k:  { gen:3.0, rcs:1.50, radarQ: 2.0 },
  helo_k:    { gen:3.0, rcs:0.90, radarQ: 2.0 },
  trans_k:   { gen:2.5, rcs:1.30, radarQ: 1.5 },

  /* ---- fourth generation ---- */
  fighter_n: { gen:4.0, rcs:0.55, radarQ:12.0 },
  fighter_p: { gen:4.0, rcs:0.85, radarQ: 9.0 },
  fighter_c: { gen:4.5, rcs:0.50, radarQ:14.0 },
  fighter_r: { gen:4.5, rcs:0.50, radarQ:15.0 },
  bomber_n:  { gen:3.5, rcs:1.40, radarQ: 2.5 },
  bomber_p:  { gen:3.5, rcs:1.50, radarQ: 2.0 },
  bomber_c:  { gen:3.5, rcs:1.20, radarQ: 5.0 },
  bomber_r:  { gen:4.0, rcs:0.70, radarQ:10.0 },
  helo_n:    { gen:4.0, rcs:0.75, radarQ: 6.0 },
  helo_p:    { gen:3.5, rcs:0.85, radarQ: 3.0 },
  helo_c:    { gen:4.0, rcs:0.80, radarQ: 4.0 },
  helo_r:    { gen:4.0, rcs:0.75, radarQ: 6.0 },
  trans_n:   { gen:4.0, rcs:0.90, radarQ: 1.5 },
  trans_p:   { gen:3.5, rcs:1.10, radarQ: 1.5 },
  trans_c:   { gen:4.0, rcs:0.95, radarQ: 1.5 },
  trans_r:   { gen:4.0, rcs:0.90, radarQ: 1.5 },
  ew_n:      { gen:4.5, rcs:0.60, radarQ:16.0 },
  ew_c:      { gen:4.5, rcs:0.70, radarQ:15.0 },
  sead_n:    { gen:4.0, rcs:0.55, radarQ:13.0 },
  sead_c:    { gen:4.5, rcs:0.65, radarQ:14.0 },
  sead_p:    { gen:3.5, rcs:1.10, radarQ: 7.0 },

  /* ---- the Bundeswehr's five aircraft ----
     The Typhoon radar figure is deliberately short of the American and
     Taiwanese AESA numbers: the German fleet still flies the mechanically
     scanned CAPTOR-M, and the ECRS Mk1 array is in flight test, not on a
     squadron. The Tiger UHT has no mast-mounted radar at all. */
  fighter_g: { gen:4.5, rcs:0.45, radarQ:13.5 },
  bomber_g:  { gen:3.5, rcs:1.30, radarQ: 4.0 },
  sead_g:    { gen:3.5, rcs:1.20, radarQ: 5.0 },
  helo_g:    { gen:4.0, rcs:0.70, radarQ: 2.0 },
  trans_g:   { gen:4.0, rcs:0.85, radarQ: 1.5 },

  /* ---- the British five ----
     bomber_b is the same Typhoon airframe in a strike fit, so it carries the
     same figures as fighter_b. Both sit below the American and Taiwanese
     numbers for one reason: the RAF fleet still flies the mechanically
     scanned CAPTOR-M, and the ECRS Mk2 active array is funded and not in
     service. There is no sead_b and no ew_b — see the roster comment. */
  fighter_b: { gen:4.5, rcs:0.60, radarQ:11.0 },
  bomber_b:  { gen:4.5, rcs:0.60, radarQ:11.0 },
  helo_b:    { gen:4.0, rcs:0.75, radarQ: 6.0 },
  trans_b:   { gen:4.0, rcs:1.10, radarQ: 1.5 },
  stealth_b: { gen:5.0, rcs:0.0080, radarQ:20.0 },

  /* ---- the French seven ----
     The Rafale's RBE2 is the one ACTIVE array of the three European
     fighters here — fitted from 2013, where the RAF and the Luftwaffe are
     still flying mechanically scanned CAPTOR-M — so fighter_f sits above
     fighter_b and fighter_g and below the American and Taiwanese numbers
     only on fleet size and integration, not on the antenna. Nothing here
     is low-observable: France skipped the fifth generation entirely, and
     the lowest rcs on this list is a canard delta with a coating.
     ew_f carries a high radarQ and jam:0 — Archange listens and does not
     jam, which is the whole point of the entry. */
  fighter_f:  { gen:4.5, rcs:0.70, radarQ:15.0 },
  cfighter_f: { gen:4.5, rcs:0.70, radarQ:15.0 },
  bomber_f:   { gen:4.0, rcs:1.10, radarQ: 4.0 },
  helo_f:     { gen:4.0, rcs:0.55, radarQ: 4.0 },
  trans_f:    { gen:4.5, rcs:0.85, radarQ: 1.5 },
  ew_f:       { gen:4.5, rcs:1.20, radarQ:22.0 },
  cawacs_f:   { gen:4.0, rcs:2.60, radarQ:28.0 },

  /* ---- fifth generation: near-peer, and near-blind to each other ---- */
  stealth_n: { gen:5.0, rcs:0.0050, radarQ:22.0 },
  stealth_c: { gen:5.0, rcs:0.0080, radarQ:21.0 },
  stealth_p: { gen:4.8, rcs:0.1300, radarQ:18.0 },
  sbomber_n: { gen:5.0, rcs:0.0030, radarQ: 8.0 },
  sbomber_p: { gen:3.5, rcs:2.5000, radarQ: 6.0 },
  sbomber_c: { gen:3.5, rcs:3.0000, radarQ: 5.0 },
};
/* ---- combat radius, in tiles ----
   Relative ranges are true to the real aircraft, compressed to the map so
   that reach is a real planning constraint. The MiG-21's notoriously short
   legs and the B-2's intercontinental reach both survive the compression. */
var AIR_RADIUS = {
  fighter_k: 22, bomber_k: 28, helo_k: 20, trans_k: 26,
  fighter_n: 40, fighter_p: 30, fighter_c: 40, fighter_r: 42,
  bomber_n:  34, bomber_p:  28, bomber_c:  40, bomber_r:  30,
  helo_n:    24, helo_p:    22, helo_c:    23, helo_r:    24,
  trans_n:   34, trans_p:   30, trans_c:   33, trans_r:   34,
  ew_n:      38, ew_c:      40, sead_n:    38, sead_c:    40, sead_p: 32,
  fighter_g: 38, bomber_g:  34, sead_g:    34, helo_g:    22, trans_g: 32,
  fighter_b: 38, bomber_b:  36, helo_b:    24, trans_b:   30, stealth_b: 40,
  awacs_b:   66,
  fighter_f: 42, cfighter_f: 38, bomber_f: 32, helo_f: 22, trans_f: 32,
  ew_f:      60, awacs_f:    65, cawacs_f: 52, airlift_f: 90,
  stealth_n: 48, stealth_c: 52, stealth_p: 46,
  sbomber_n: 95, sbomber_p: 90, sbomber_c: 75,
  awacs_n:   70, awacs_c:   65, awacs_p:   60, awacs_r: 55,
};
for (var _ak in AIR) if (UNITS[_ak]) Object.assign(UNITS[_ak], AIR[_ak]);


/* North Korea flies MiG-21s, not Fulcrums. Correcting the roster. */
Object.assign(UNITS.fighter_k, {
  name: "MiG-21bis Fishbed", full: "MiG-21bis / Chengdu J-7",
  cost: 700, oil: 18, time: 11, hp: 300, speed: 8.0, turn: 2.0, sight: 6.2, ammo: 2,
  desc: "A 1960s day fighter whose ranging radar can barely pick out a bomber, still the " +
        "backbone of the KPAF. Against a modern AESA it is shot down by a missile fired " +
        "from an aircraft its pilot never detected.",
});

/* ---- off-board sensors: the platforms that actually win the air war ---- */
Object.assign(UNITS, {
  awacs_n: { fac:"nato", role:"awacs", name:"E-3G Sentry", full:"Boeing E-3G Sentry AWACS",
    cat:"aircraft", cost:3400, oil:70, time:34, hp:620, armor:"air", speed:4.2, turn:0.9,
    sight:16, r:26, mass:0, layer:"air", weapons:[], prereq:["airbase","radar","lab"], tech:3,
    jet:true, ammo:0, radar:14, radarQ:40, rcs:3.2, gen:3.5, awacs:true,
    desc:"Rotodome early warning on a 707. The biggest antenna in the sky, so nothing sees " +
         "further — but the APY-2 array itself dates from 1977 and Block 40/45 modernised the " +
         "mission computers, not the radar. Unarmed, slow, and the most valuable thing up there." },
  awacs_c: { fac:"pla", role:"awacs", name:"KJ-500", full:"Shaanxi KJ-500 AEW&C",
    cat:"aircraft", cost:3300, oil:68, time:33, hp:600, armor:"air", speed:4.0, turn:0.9,
    sight:15, r:25, mass:0, layer:"air", weapons:[], prereq:["airbase","radar","lab"], tech:3,
    jet:true, ammo:0, radar:13, radarQ:41, rcs:3.4, gen:4.5, awacs:true,
    desc:"Fixed three-face AESA in a dorsal disc: the sensor half of China's counter-stealth " +
         "answer. It cannot shoot, but it tells the J-20s exactly where to look." },
  awacs_p: { fac:"pact", role:"awacs", name:"A-50U Mainstay", full:"Beriev A-50U Mainstay",
    cat:"aircraft", cost:3200, oil:72, time:34, hp:600, armor:"air", speed:3.9, turn:0.8,
    sight:13, r:26, mass:0, layer:"air", weapons:[], prereq:["airbase","radar","lab"], tech:3,
    jet:true, ammo:0, radar:11, radarQ:27, rcs:3.6, gen:3.5, awacs:true,
    desc:"Mainstay's radar struggles against ground clutter and its datalink is a voice radio " +
         "in practice. It sees a long way, but the picture reaches the shooters slowly." },
  awacs_r: { fac:"roc", role:"awacs", name:"E-2K Hawkeye", full:"Northrop E-2K Hawkeye 2000",
    cat:"aircraft", cost:3000, oil:60, time:31, hp:520, armor:"air", speed:4.4, turn:1.0,
    sight:14, r:22, mass:0, layer:"air", weapons:[], prereq:["airbase","radar","lab"], tech:3,
    jet:true, ammo:0, radar:12, radarQ:33, rcs:2.6, gen:4.0, awacs:true,
    desc:"Carrier-sized early warning aircraft covering the whole Strait from over the island. " +
         "Taiwan's air defence is built around keeping these flying." },
});

/* ---- surface and ground radars as off-board sensors ----
   An Aegis ship's SPY array is a far better air-search radar than any
   fighter nose, which is why a surface group can cue fighters onto
   contacts they cannot see themselves. Same units as above.          */
var SURFACE_RADAR = {
  /* detection quality against a low-observable target. The Type 346B is a
     newer array than SPY-1, and China has invested heavily in ground-based
     counter-stealth radar (VHF/UHF sets such as JY-27A and YLC-8B), so its
     land radars are not a generation behind either. */
  /* ship values live in the NAVY refit block below, which runs later and is
     the single authority for hull statistics - duplicating them here meant
     the two disagreed and the later one silently won. */
  radarv_n: 22, radarv_c: 22, radarv_p: 15, radarv_k: 11, radarv_r: 20,
  /* COBRA locates up to forty batteries in two minutes across a hundred-
     kilometre front - the widest counter-battery coverage in the game. */
  radarv_g: 22,
  /* The same Franco-German-British array, and France took ten of them.
     Before COBRA arrived in 2008 the French army had battlefield
     surveillance sets and no counter-battery capability at all, which is
     why the AuF1 batteries in Bosnia were largely shooting blind. */
  radarv_f: 20,
  sam_veh_n: 16, sam_veh_c: 16, sam_veh_p: 13,
  ewv_n: 14, ewv_c: 14, ewv_p: 12,
};
for (var _sk in SURFACE_RADAR) if (UNITS[_sk]) UNITS[_sk].radarQ = SURFACE_RADAR[_sk];
/* def.radar is used as a RADIUS IN TILES by G.radarCovers, so a boolean here
   silently becomes a one-tile picture - the radar dome was providing almost
   no coverage at all. These are real coverage radii. */
if (BUILDINGS.radar) { BUILDINGS.radar.radar = 22; BUILDINGS.radar.radarQ = 26; }
if (BUILDINGS.sam)   BUILDINGS.sam.radarQ = 15;
if (BUILDINGS.flak)  BUILDINGS.flak.radarQ = 8;

/* ---- datalink: how well an off-board track reaches the shooter ----
   The digital half of the war. NATO fuses every sensor into one picture;
   the Eastern bloc still largely passes a track over the radio. */
for (var _rk in AIR_RADIUS) if (UNITS[_rk]) UNITS[_rk].radius = AIR_RADIUS[_rk];

FACTIONS.nato.datalink = 1.00;
FACTIONS.pla.datalink  = 0.88;
FACTIONS.roc.datalink  = 0.85;
FACTIONS.pact.datalink = 0.45;
FACTIONS.kpa.datalink  = 0.10;
FACTIONS.gbr.datalink  = 0.92;   // full Link 16; Bowman and Morpheus were not successes
FACTIONS.fra.datalink  = 0.88;
FACTIONS.deu.datalink  = 0.85;   // first-rate equipment, late networked warfare (D-LBO)


/* ==================================================================
   CARRIER AIR WINGS

   A carrier is an airbase that sails. You build the hull, then buy the
   wing that flies off it - but only aircraft that are actually carrier
   aircraft. A tailhook, a strengthened nose gear and folding wings are
   not retrofits: no F-22, A-10 or B-2 has ever flown off a deck, and
   they never will here either.
   ================================================================== */
Object.assign(UNITS, {
  cfighter_n: { fac:"nato", role:"cfighter", name:"F/A-18E Super Hornet",
    full:"Boeing F/A-18E Super Hornet", cat:"aircraft",
    cost:1650, oil:34, time:19, hp:470, armor:"air", speed:8.0, turn:2.0, sight:9.6, r:16, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:5,
    gen:4.5, rcs:0.45, radarQ:15.0, radius:36, carrierOnly:false, carrierCapable:true,
    /* No longer standing in for the whole family: this row is the Super Hornet
       and only the Super Hornet. IOC September 2001, first combat cruise with
       VFA-115 in 2002, so from:"e00", and it covers e00 and e20 because the
       E/F is still the fleet fighter today. The four earlier decks are in
       eras.js - F9F-8 Cougar 1952, F-4B Phantom II 1961, F-14A Tomcat 1974,
       F/A-18C Hornet 1987 - which closes the e50 and e60 gap this comment
       used to record: Forrestal and Enterprise now have aeroplanes. */
    from:"e00",
    desc:"The workhorse of a US carrier air wing. Slightly slower and shorter-legged than a " +
         "land-based fighter, because a tailhook and folding wings cost weight - the price " +
         "of being able to operate from anywhere the fleet can sail." },
  cstealth_n: { from:"e20", fac:"nato", role:"cstealth", name:"F-35C Lightning II",
    full:"Lockheed Martin F-35C", cat:"aircraft",
    cost:2900, oil:58, time:28, hp:510, armor:"air", speed:8.2, turn:1.9, sight:11.5, r:15, mass:0,
    layer:"air", weapons:["aam_lo"], prereq:["airbase","lab"], tech:3, jet:true, ammo:4,
    gen:5.0, rcs:0.0090, radarQ:21.0, radius:44, stealth:0.62, carrierCapable:true,
    desc:"Carrier-capable stealth fighter with the largest wing of the F-35 family for slow " +
         "approach speeds. Its sensor fusion makes it a scout as much as a shooter: what it " +
         "sees, the whole battle group sees." },
  /* THE ERA CHAIN NOW EXISTS, so the 1950 stamp and the eraStamped escape
     hatch are both gone. This row is the E-2D: AN/APY-9 UHF AESA, first flight
     2007, IOC October 2014, first operational deployment March 2015 with
     VAW-125 aboard Theodore Roosevelt. from:"e20" is now the truth.

     What the mark was covering: carrier AEW had ONE row for six decades, so
     that row had to be buildable in 1950, and G.genContest() - which reads
     `from` as a real service date - then scored the E-2D as a 1950s radar and
     handed it 1.7^3 = 4.91x jamming, the largest penalty in the subsystem, to
     the aircraft whose APY-9 was designed to be hard to jam. eraStamped bought
     it a flat 1.00x, which was the right patch for a missing chain and the
     wrong answer for a radar. It now reads e20 and takes 0.55^3 = 0.166x from
     an e80 jammer, 0.55 from an e00 one, 1.00 only from its own generation.

     The five earlier bands are in eras.js: E-1B Tracer 1958, E-2B 1969,
     E-2C 1973, E-2C Group II 1992, E-2C Hawkeye 2000 in 2001. */
  cawacs_n: { from:"e20", fac:"nato", role:"cawacs", name:"E-2D Advanced Hawkeye",
    full:"Northrop Grumman E-2D", cat:"aircraft",
    cost:3000, oil:60, time:31, hp:520, armor:"air", speed:4.4, turn:1.0, sight:14, r:22, mass:0,
    layer:"air", weapons:[], prereq:["airbase","radar"], tech:3, jet:true, ammo:0,
    radar:12, radarQ:33, rcs:2.6, gen:4.5, radius:55, awacs:true, carrierCapable:true,
    desc:"The carrier's own eyes. Its UHF radar was built specifically to find low-observable " +
         "targets that fighter radars miss, and it feeds them straight to the group." },

  cfighter_c: { fac:"pla", role:"cfighter", name:"J-15 Flying Shark",
    full:"Shenyang J-15", cat:"aircraft",
    cost:1700, oil:36, time:20, hp:500, armor:"air", speed:7.8, turn:1.9, sight:9.4, r:17, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    gen:4.0, rcs:0.80, radarQ:12.0, radius:34, carrierCapable:true,
    /* deck-qualified from 2013, in time for Liaoning and Shandong */
    from:"e00",
    desc:"A heavy Flanker derivative flown from Chinese decks. Powerful and long-ranged for a " +
         "carrier aircraft, but heavy enough that ski-jump launches cost it fuel or weapons." },
  cstealth_c: { from:"e20", fac:"pla", role:"cstealth", name:"J-35",
    full:"Shenyang J-35 (carrier)", cat:"aircraft",
    cost:2850, oil:57, time:28, hp:495, armor:"air", speed:8.4, turn:2.0, sight:11.0, r:15, mass:0,
    layer:"air", weapons:["aam_lo"], prereq:["airbase","lab"], tech:3, jet:true, ammo:4,
    gen:5.0, rcs:0.0130, radarQ:19.0, radius:42, stealth:0.58, carrierCapable:true,
    desc:"China's carrier-borne stealth fighter, sized between an F-35 and an F-22. Public " +
         "detail is thin, so its exact signature here is an estimate rather than a fact." },

  cfighter_p: { fac:"pact", role:"cfighter", name:"Su-33 Flanker-D",
    full:"Sukhoi Su-33", cat:"aircraft",
    cost:1600, oil:38, time:20, hp:520, armor:"air", speed:7.6, turn:1.8, sight:8.8, r:17, mass:0,
    layer:"air", weapons:["aam"], prereq:["airbase"], tech:2, jet:true, ammo:4,
    gen:4.0, rcs:0.95, radarQ:9.5, radius:30, carrierCapable:true,
    /* accepted into service 1998, which is Kuznetsov's own air group */
    from:"e90",
    desc:"Navalised Flanker launching off a ski-jump, which means it flies with reduced fuel " +
         "or reduced weapons and never both. No radar-guided missile capability worth the name." },
  /* There is no kpa carrier fighter, and there never was one to date. North
     Korea has never operated an aircraft carrier, has never been sold the
     MiG-29K, and flies early-model land-based MiG-29s it can barely keep
     airworthy. The row that used to sit here was a designation invented so the
     slot would not be empty, and its own description admitted it: "this exists
     only so a KPA commander who somehow captures a deck has something to put
     on it." Germany and Taiwan have no cfighter either and the game is
     content; an empty band is the honest answer. */
});
/* land-based aircraft that genuinely do operate from decks */
["helo_n", "helo_r", "trans_n", "trans_r", "helo_c", "trans_c", "helo_p", "trans_p"]
  .forEach(function (k) { if (UNITS[k]) UNITS[k].carrierCapable = true; });


/* ==================================================================
   NAVAL WARFARE - REAL SYSTEMS, REAL GAPS

   A warship is a layered system, not a hit-point bar with a gun. Every
   hull below is described by what it actually carries: a main gun, an
   anti-ship missile, an area SAM, a close-in weapon system, torpedoes,
   and - the thing that really kills submarines - an embarked helicopter.

   The capability gaps are the honest ones:
     * NATO and the PLA field true area-air-defence ships with deep VLS
       magazines and modern phased arrays.
     * The Russian surface fleet is a 1980s force. Slava carries her
       anti-ship missiles in sixteen fixed deck tubes she cannot reload
       at sea, her air defence is not networked, and her ASW depends on
       rocket launchers rather than a helicopter with a dipping sonar.
     * North Korea has no navy in the blue-water sense at all. It is a
       coastal defence force: fast attack craft, shore-launched missiles
       and a fleet of 1950s-design submarines.
     * Taiwan's surface combatants are recycled 1980s American hulls with
       no VLS. Its strength is small, fast, modern missile craft close to
       its own coast - not fleet action.
   ================================================================== */

Object.assign(WEAPONS, {
  /* ---- guns ---- */
  navgun_mk45: { name:"Mk 45 Mod 4 127mm", dmg:125, warhead:"he", range:11.5, reload:3.6, burst:2,
    burstDelay:0.45, acc:0.80, proj:"shell", speed:720, aoe:0.9,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"cannon" },
  navgun_ak130: { name:"AK-130 twin 130mm", dmg:150, warhead:"he", range:10.2, reload:4.6, burst:4,
    burstDelay:0.30, acc:0.68, proj:"shell", speed:700, aoe:1.0,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"cannon" },
  navgun_pj38: { name:"H/PJ-38 130mm", dmg:132, warhead:"he", range:11.2, reload:3.8, burst:2,
    burstDelay:0.42, acc:0.78, proj:"shell", speed:720, aoe:0.9,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"cannon" },
  navgun_76: { name:"OTO 76mm Super Rapid", dmg:52, warhead:"he", range:8.0, reload:1.2, burst:4,
    burstDelay:0.16, acc:0.74, proj:"shell", speed:700, aoe:0.5,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"shot" },

  /* ---- anti-ship missiles ---- */
  ssm_harpoon: { name:"RGM-84 Harpoon", dmg:265, warhead:"he", range:14.0, minRange:2.0, reload:13.0,
    burst:2, burstDelay:0.9, acc:0.86, proj:"missile", speed:13, aoe:1.5,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  ssm_nsm: { name:"Naval Strike Missile", dmg:280, warhead:"he", range:16.0, minRange:2.0, reload:14.0,
    burst:2, burstDelay:0.9, acc:0.90, proj:"missile", speed:13, aoe:1.5, stealthy:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  ssm_yj18: { name:"YJ-18 SSM", dmg:300, warhead:"he", range:17.0, minRange:2.0, reload:15.0,
    burst:2, burstDelay:0.8, acc:0.85, proj:"missile", speed:15, aoe:1.6,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  ssm_oniks: { name:"P-800 Oniks", dmg:320, warhead:"he", range:15.0, minRange:2.5, reload:19.0,
    burst:1, acc:0.74, proj:"missile", speed:17, aoe:1.7,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  ssm_hf3: { name:"Hsiung Feng III", dmg:285, warhead:"he", range:15.0, minRange:2.0, reload:15.0,
    burst:2, burstDelay:0.9, acc:0.84, proj:"missile", speed:16, aoe:1.5,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  ssm_kn01: { name:"KN-01 coastal SSM", dmg:200, warhead:"he", range:9.5, minRange:1.5, reload:17.0,
    burst:1, acc:0.58, proj:"missile", speed:11, aoe:1.2,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },

  /* ---- area air defence ---- */
  sam_sm2: { name:"SM-2/SM-6 Standard", dmg:185, warhead:"flak", range:14.5, reload:3.2, burst:2,
    burstDelay:0.35, acc:0.90, proj:"missile", speed:22,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },
  sam_hhq9: { name:"HHQ-9B", dmg:180, warhead:"flak", range:14.0, reload:3.4, burst:2,
    burstDelay:0.35, acc:0.87, proj:"missile", speed:22,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },
  sam_shtil: { name:"9M317 Shtil-1", dmg:165, warhead:"flak", range:11.0, reload:5.0, burst:1,
    acc:0.72, proj:"missile", speed:19,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },
  sam_sm1: { name:"SM-1MR Standard", dmg:150, warhead:"flak", range:10.5, reload:5.2, burst:1,
    acc:0.74, proj:"missile", speed:19,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },

  /* ---- close-in weapon systems: the last line against a sea-skimmer ---- */
  ciws_phalanx: { name:"Mk 15 Phalanx CIWS", dmg:60, warhead:"flak", range:3.2, reload:0.9, burst:8,
    burstDelay:0.05, acc:0.80, proj:"tracer", speed:940,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"shot" },
  ciws_ak630: { name:"AK-630 CIWS", dmg:52, warhead:"flak", range:2.8, reload:1.1, burst:8,
    burstDelay:0.05, acc:0.66, proj:"tracer", speed:900,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"shot" },
  ciws_pj11: { name:"H/PJ-11 CIWS", dmg:58, warhead:"flak", range:3.0, reload:0.95, burst:9,
    burstDelay:0.05, acc:0.77, proj:"tracer", speed:930,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"shot" },

  /* ---- torpedoes ----
     Speed is PIXELS per second, as everywhere else in this table. A warship
     makes 1.6-3.6 tiles/sec, which is 51-115 px/s, so a torpedo has to run
     above that to catch one and still stay well below a missile's 330-700.
     These were authored on the tiles/sec scale instead: a Mk 48 at 8 covered
     a quarter of a tile a second and was outrun by the boat that fired it. */
  torp_mk48: { name:"Mk 48 ADCAP", dmg:380, warhead:"he", range:10.5, minRange:1.0, reload:11.0,
    burst:2, burstDelay:1.2, acc:0.90, proj:"torpedo", speed:160, aoe:1.2,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  torp_ugst: { name:"UGST Fizik", dmg:350, warhead:"he", range:9.0, minRange:1.0, reload:13.0,
    burst:2, burstDelay:1.4, acc:0.78, proj:"torpedo", speed:150, aoe:1.2,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  torp_yu6: { name:"Yu-6 torpedo", dmg:355, warhead:"he", range:9.6, minRange:1.0, reload:12.0,
    burst:2, burstDelay:1.3, acc:0.84, proj:"torpedo", speed:160, aoe:1.2,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  torp_sut: { name:"SUT torpedo", dmg:300, warhead:"he", range:7.5, minRange:1.0, reload:15.0,
    burst:1, acc:0.72, proj:"torpedo", speed:136, aoe:1.1,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  torp_53: { name:"53-65 torpedo", dmg:250, warhead:"he", range:5.5, minRange:0.8, reload:19.0,
    burst:1, acc:0.52, proj:"torpedo", speed:120, aoe:1.0,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },

  /* ---- anti-submarine ---- */
  asw_mk54: { name:"Mk 54 lightweight torpedo", dmg:215, warhead:"he", range:6.5, reload:7.0,
    burst:1, acc:0.88, proj:"torpedo", speed:180, aoe:0.8,
    tgt:{ground:0,air:0,sea:0,sub:1}, sfx:"missile" },
  asw_yu7: { name:"Yu-7 lightweight torpedo", dmg:205, warhead:"he", range:6.2, reload:7.4,
    burst:1, acc:0.84, proj:"torpedo", speed:180, aoe:0.8,
    tgt:{ground:0,air:0,sea:0,sub:1}, sfx:"missile" },
  asw_rbu: { name:"RBU-6000 rocket mortar", dmg:170, warhead:"he", range:3.6, reload:6.0, burst:6,
    burstDelay:0.18, acc:0.46, proj:"arc", speed:12, aoe:1.4,
    tgt:{ground:0,air:0,sea:0,sub:1}, sfx:"cannon" },

  /* ---- European naval ordnance ----
     Named OUTSIDE the w_<era>_<fac>_<role> pattern so the era-range normaliser
     at the foot of generations.js leaves the figures alone. The differences
     are the identity: Britain buys the heavy gun and the heavyweight torpedo,
     France buys the missile and sells it to everyone else, Germany buys the
     last-ditch interceptor and a wire-guided fish tuned for shallow water.
     Aster is Franco-Italian and CAMM is British; RAM is German-American and
     Germany put it to sea first, on the Type 143A in 1992. */
  sam_aster15: { name:"Aster 15", dmg:190, warhead:"flak", range:10.8, reload:3.6, burst:2,
    burstDelay:0.35, acc:0.90, proj:"missile", speed:660,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },
  sam_aster30: { name:"Aster 30", dmg:200, warhead:"flak", range:15.0, reload:3.4, burst:2,
    burstDelay:0.35, acc:0.92, proj:"missile", speed:700,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },
  sam_ram: { name:"RIM-116 RAM", dmg:120, warhead:"flak", range:4.6, reload:1.8, burst:2,
    burstDelay:0.30, acc:0.88, proj:"missile", speed:640,
    tgt:{ground:0,air:1,sea:0,sub:0}, sfx:"missile" },
  ssm_exocet: { name:"MM40 Exocet Block 3", dmg:250, warhead:"he", range:15.0, minRange:2.0,
    reload:13.5, burst:2, burstDelay:0.9, acc:0.88, proj:"missile", speed:122, aoe:1.4,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  torp_spearfish: { name:"Spearfish Mod 1", dmg:390, warhead:"he", range:11.0, minRange:1.0,
    reload:11.5, burst:2, burstDelay:1.2, acc:0.90, proj:"torpedo", speed:170, aoe:1.2,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  torp_f21: { name:"F21 Artemis", dmg:370, warhead:"he", range:10.0, minRange:1.0,
    reload:12.0, burst:2, burstDelay:1.3, acc:0.88, proj:"torpedo", speed:160, aoe:1.2,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  torp_dm2a4: { name:"DM2A4 Seehecht", dmg:340, warhead:"he", range:9.5, minRange:0.8,
    reload:12.5, burst:2, burstDelay:1.3, acc:0.92, proj:"torpedo", speed:150, aoe:1.1,
    tgt:{ground:0,air:0,sea:1,sub:1}, sfx:"missile" },
  asw_stingray: { name:"Sting Ray Mod 1", dmg:200, warhead:"he", range:6.4, reload:7.0,
    burst:1, acc:0.90, proj:"torpedo", speed:180, aoe:0.8,
    tgt:{ground:0,air:0,sea:0,sub:1}, sfx:"missile" },
  asw_mu90: { name:"MU90 Impact", dmg:205, warhead:"he", range:6.6, reload:7.2,
    burst:1, acc:0.89, proj:"torpedo", speed:185, aoe:0.8,
    tgt:{ground:0,air:0,sea:0,sub:1}, sfx:"missile" },

  /* ---- naval electronic warfare ---- */
  decoy_chaff: { name:"Nulka / chaff decoy", dmg:0, warhead:"bullet", range:0.1, reload:20, burst:1,
    acc:0.1, proj:"none", tgt:{ground:0,air:0,sea:0,sub:0} },
});

/* ---- refit every hull with its real armament and capability ----
   vls    : vertical launch cells - magazine depth and how fast a ship can
            put missiles in the air. Slava famously has none.
   helo   : embarked helicopters - the single biggest ASW multiplier
   sonar  : hull/towed array reach, in tiles
   quiet  : acoustic signature; lower is harder to find                  */
var NAVY = {
  /* ================= NATO ================= */
  boat_n:        { weapons:["hmg"], sonar:0, vls:0, helo:0, radarQ:4 },
  corvette_n:    { weapons:["navgun_76","ssm_nsm","ciws_phalanx"], sonar:6.0, vls:8, helo:1,
                   radarQ:14, ciws:0.45 },
  missileboat_n: { weapons:["ssm_harpoon","ciws_phalanx"], sonar:0, vls:0, helo:0, radarQ:9 },
  destroyer_n:   { weapons:["navgun_mk45","sam_sm2","ssm_harpoon","asw_mk54","ciws_phalanx"],
                   sonar:9.5, vls:96, helo:2, radarQ:34, ciws:0.72 },
  cruiser_n:     { weapons:["navgun_mk45","sam_sm2","ssm_harpoon","asw_mk54","ciws_phalanx"],
                   sonar:9.0, vls:122, helo:2, radarQ:40, ciws:0.78 },
  carrier_n:     { weapons:["ciws_phalanx"], sonar:5.0, vls:0, helo:2, radarQ:20, ciws:0.65 },

  /* ================= PLA ================= */
  boat_c:        { weapons:["hmg"], sonar:0, vls:0, helo:0, radarQ:4 },
  corvette_c:    { weapons:["navgun_76","ssm_yj18","ciws_pj11"], sonar:6.2, vls:8, helo:1,
                   radarQ:13, ciws:0.44 },
  missileboat_c: { weapons:["ssm_yj18"], sonar:0, vls:0, helo:0, radarQ:8 },
  destroyer_c:   { weapons:["navgun_pj38","sam_hhq9","ssm_yj18","asw_yu7","ciws_pj11"],
                   sonar:8.8, vls:64, helo:1, radarQ:32, ciws:0.66 },
  cruiser_c:     { weapons:["navgun_pj38","sam_hhq9","ssm_yj18","asw_yu7","ciws_pj11"],
                   sonar:9.2, vls:112, helo:2, radarQ:41, ciws:0.72 },
  carrier_c:     { weapons:["ciws_pj11"], sonar:4.5, vls:0, helo:2, radarQ:19, ciws:0.60 },

  /* ================= EASTERN BLOC =================
     A 1980s fleet. Deck-mounted anti-ship missiles that cannot be reloaded
     at sea, air defence that is not networked across the group, and ASW
     that still leans on rocket mortars instead of a helicopter. */
  boat_p:        { weapons:["hmg"], sonar:0, vls:0, helo:0, radarQ:4 },
  corvette_p:    { weapons:["navgun_76","ssm_oniks","ciws_ak630"], sonar:4.6, vls:0, helo:0,
                   radarQ:9, ciws:0.34 },
  missileboat_p: { weapons:["ssm_oniks"], sonar:0, vls:0, helo:0, radarQ:7 },
  destroyer_p:   { weapons:["navgun_ak130","sam_shtil","ssm_oniks","asw_rbu","ciws_ak630"],
                   sonar:6.4, vls:0, helo:1, radarQ:18, ciws:0.42 },
  cruiser_p:     { weapons:["navgun_ak130","sam_shtil","ssm_oniks","asw_rbu","ciws_ak630"],
                   sonar:6.0, vls:0, helo:1, radarQ:21, ciws:0.46 },
  carrier_p:     { weapons:["sam_shtil","ciws_ak630"], sonar:4.0, vls:0, helo:1,
                   radarQ:14, ciws:0.44 },

  /* ================= NORTH KOREA =================
     Not a navy in the fleet sense: a coastal defence force of fast attack
     craft and very old submarines that cannot operate far from home. */
  boat_k:        { weapons:["hmg"], sonar:0, vls:0, helo:0, radarQ:2.5 },
  corvette_k:    { weapons:["navgun_76","ssm_kn01"], sonar:2.4, vls:0, helo:0, radarQ:5, ciws:0 },
  missileboat_k: { weapons:["ssm_kn01"], sonar:0, vls:0, helo:0, radarQ:4 },

  /* ================= TAIWAN =================
     Recycled 1980s American destroyers with no VLS, offset by genuinely
     modern light missile craft operating under shore-based cover. */
  boat_r:        { weapons:["hmg"], sonar:0, vls:0, helo:0, radarQ:5 },
  corvette_r:    { weapons:["navgun_76","ssm_hf3"], sonar:3.2, vls:0, helo:0, radarQ:12, ciws:0.30 },
  missileboat_r: { weapons:["ssm_hf3"], sonar:0, vls:0, helo:0, radarQ:9 },
  destroyer_r:   { weapons:["navgun_mk45","sam_sm1","ssm_hf3","asw_mk54","ciws_phalanx"],
                   sonar:7.0, vls:0, helo:2, radarQ:26, ciws:0.58 },
};
for (var _nk in NAVY) if (UNITS[_nk]) Object.assign(UNITS[_nk], NAVY[_nk]);

/* ---- honest hull statistics ----
   The Eastern bloc and North Korean hulls are not simply cheaper versions
   of the same ship. They are older, less survivable and less capable. */
Object.assign(UNITS.corvette_p, { cost:1050, hp:1080, speed:2.7, sight:7.4,
  desc:"Project 22160 was built as a cheap patrol ship and it shows: a gun, a " +
       "handful of missiles bolted on, no area air defence and no helicopter. " +
       "Adequate for policing a coastline, outmatched by anything built to fight." });
Object.assign(UNITS.destroyer_p, { cost:2000, hp:2050, speed:2.25, sight:8.4,
  desc:"Sovremenny dates from the mid-1980s. Her twin 130mm mounts hit hard and her " +
       "Sunburn missiles are genuinely dangerous, but the air-defence system is not " +
       "networked with the rest of the group and much of the class has been laid up " +
       "for want of working boilers." });
Object.assign(UNITS.cruiser_p, { cost:3100, hp:2900, speed:1.9, sight:9.0,
  desc:"Slava carries sixteen enormous anti-ship missiles in fixed deck tubes she " +
       "cannot reload at sea - a single alpha strike and the ship is a gun platform. " +
       "Impressive silhouette, 1979 combat system." });
Object.assign(UNITS.carrier_p, { cost:4600, hp:4100, speed:1.5, sight:11.5,
  desc:"Kuznetsov launches from a ski-jump rather than a catapult, which costs her " +
       "aircraft fuel or weapons on every sortie, and she has spent more of her life " +
       "under repair than at sea." });

Object.assign(UNITS.corvette_k, { cost:620, hp:700, speed:2.7, sight:5.2,
  name:"Nampo-class Patrol Craft",
  desc:"A coastal patrol craft with an elderly gun and a pair of short-ranged missiles. " +
       "North Korea's surface fleet exists to defend its own harbours and cannot " +
       "operate beyond sight of the coast." });
Object.assign(UNITS.missileboat_k, { cost:760, hp:560, speed:3.2, sight:5.0,
  desc:"A Soju hull carrying an ageing Styx derivative. Fast, cheap, numerous, and " +
       "reliant on getting close enough that a modern warship kills it first." });
Object.assign(UNITS.boat_k, { cost:280, hp:380, speed:3.4, sight:4.6,
  desc:"A gun boat. There are a great many of them, which is the entire doctrine: " +
       "swarm anything that comes close to the coast and accept the losses." });

Object.assign(UNITS.destroyer_r, { cost:2500, hp:1850, speed:2.3, sight:8.6,
  desc:"Kee Lung is an ex-US Kidd-class hull laid down in the 1970s for the Shah of " +
       "Iran. Powerful for her age and well armed for air defence, but she has no " +
       "vertical launch cells at all, so her missile capacity is fixed by her rails." });
Object.assign(UNITS.corvette_r, { cost:1450, hp:980, speed:3.4, sight:7.8,
  desc:"Tuo Chiang is a modern stealth catamaran and the one genuinely current warship " +
       "in the fleet - fast, low-signature and heavily armed for its tonnage, but with " +
       "no endurance and no air defence beyond its own gun." });


/* ==================================================================
   SUBMARINES - NUCLEAR, DIESEL, AND WHAT ACTUALLY FINDS THEM

   Two things separate submarines, and neither is hit points.

   PROPULSION. A nuclear boat (SSN/SSBN) has unlimited endurance and real
   speed; it never has to come up. A diesel-electric boat (SSK) is slow
   and must eventually recharge, but running on batteries it is the
   quietest thing in the ocean - which is why a modern AIP diesel is
   harder to find than a nuclear attack boat, not easier.

   ACOUSTICS. `quiet` is the acoustic signature: lower is harder to
   detect. Detection range against a boat scales with that signature, so
   a 1950s Romeo is found from four times further away than a Kilo.

   ROLE. An SSN hunts. An SSBN does not fight ships at all - it carries
   ballistic missiles and its whole job is to not be found.
   ================================================================== */
var SUBS = {
  /* id: [propulsion, quiet, sonar, notes] */
  sub_n: { nuclear:true,  quiet:0.30, sonar:11.0, speed:2.5, weapons:["torp_mk48"], radarQ:6 },
  sub_c: { nuclear:false, quiet:0.26, sonar:8.0,  speed:1.9, weapons:["torp_yu6"],  radarQ:5, aip:true },
  sub_p: { nuclear:false, quiet:0.24, sonar:7.2,  speed:1.8, weapons:["torp_ugst"], radarQ:4 },
  sub_r: { nuclear:false, quiet:0.44, sonar:6.0,  speed:1.8, weapons:["torp_sut"],  radarQ:4 },
  sub_k: { nuclear:false, quiet:1.00, sonar:2.6,  speed:1.6, weapons:["torp_53"],   radarQ:2 },
};
for (var _sb in SUBS) if (UNITS[_sb]) Object.assign(UNITS[_sb], SUBS[_sb]);

Object.assign(UNITS.sub_n, {
  name:"Virginia SSN", full:"SSN-774 Virginia class, Block IV/V",
  desc:"The boat the United States is actually building. Photonics masts instead of a " +
       "periscope, a hull meant for the littorals as much as the deep ocean, and enough " +
       "of them to replace the Los Angeles fleet one for one - which the three Seawolfs " +
       "were far too expensive to do. A modern diesel sitting still on batteries is " +
       "still quieter." });
Object.assign(UNITS.sub_p, {
  name:"Kilo SSK", full:"Project 636.3 Improved Kilo",
  desc:"NATO nicknamed the Kilo the Black Hole for a reason: on batteries it is " +
       "extraordinarily quiet. It is also slow, short-legged and must eventually snorkel, " +
       "so it is a superb ambusher and a poor pursuer." });
Object.assign(UNITS.sub_c, {
  name:"Type 039A Yuan SSK", full:"Type 039A/B Yuan-class",
  desc:"Air-independent propulsion lets this boat stay down for weeks without snorkelling, " +
       "combining a diesel's quietness with something close to a nuclear boat's patience." });
Object.assign(UNITS.sub_r, {
  name:"Hai Lung SSK", full:"Hai Lung-class (Zwaardvis)",
  desc:"A Dutch design from the 1980s and the only two operational combat submarines " +
       "Taiwan possesses. Serviceable, thoroughly dated, and impossible to buy a " +
       "replacement for - no other country would sell - so Taiwan is building its own: " +
       "Hai Kun (SS-711) launched 28 September 2023 and is still in sea trials, not yet " +
       "delivered. She will carry Mk 48 and Harpoon and no land-attack weapon, because " +
       "Taiwan has never had one under water and still does not." });
Object.assign(UNITS.sub_k, {
  name:"Romeo-class SSK", full:"Type 033 / Project 633 Romeo",
  cost:900, hp:700,
  desc:"A 1950s Soviet design built under licence and still in front-line service. It is " +
       "enormously loud, slow, and can be tracked by any modern sonar long before its " +
       "torpedoes are in range. It exists in numbers, which is the only argument for it." });

/* ---- strategic and cruise-missile submarines ---- */
Object.assign(UNITS, {
  ssbn_n: { from:"e80", fac:"nato", role:"ssbn", name:"Ohio SSBN", full:"SSBN-726 Ohio-class", cat:"naval",
    cost:6200, oil:140, time:70, hp:2600, armor:"heavy", speed:2.0, turn:0.5, sight:6, r:26, mass:0,
    layer:"sub", weapons:["torp_mk48"], prereq:["navalyard","lab","radar"], tech:3,
    nuclear:true, quiet:0.22, sonar:10.0, radarQ:5, ssbn:true,
    desc:"Ballistic missile submarine. It does not fight surface groups and it does not " +
         "want to be seen - its entire purpose is to remain undetected while holding a " +
         "strategic weapon at readiness. Twenty-four launch tubes, and the quietest hull " +
         "the US ever built." },
  /* from:"e00" and not "e60". K-535 Yuriy Dolgorukiy commissioned 10 January
     2013; the 955A this row is named for is Knyaz Vladimir of 12 June 2020;
     and the Bulava it fires was not accepted into service until 2018, after a
     test record that lost roughly half of its first fourteen launches - the
     9 December 2009 failure is the spiral that was photographed over northern
     Norway. js/facts.js already records service 2013 for this id. The Soviet
     boomers that hold e60, e80 and e90 are the Yankee, the Typhoon and the
     Delta IV, added at the foot of eras.js. */
  ssbn_p: { from:"e00", fac:"pact", role:"ssbn", name:"Borei SSBN", full:"Project 955A Borei-A", cat:"naval",
    cost:6000, oil:145, time:70, hp:2700, armor:"heavy", speed:2.0, turn:0.5, sight:5.5, r:26, mass:0,
    layer:"sub", weapons:["torp_ugst"], prereq:["navalyard","lab","radar"], tech:3,
    nuclear:true, quiet:0.30, sonar:8.0, radarQ:4, ssbn:true,
    desc:"The one part of the Russian fleet that is genuinely modern and genuinely well " +
         "funded, because it carries the deterrent. Quieter than anything else the yard " +
         "builds, though still not an Ohio." },
  ssbn_c: { from:"e00", fac:"pla", role:"ssbn", name:"Type 094 Jin SSBN", full:"Type 094 Jin-class (094A from 2018)", cat:"naval",
    cost:5900, oil:142, time:69, hp:2600, armor:"heavy", speed:1.95, turn:0.5, sight:5.5, r:26, mass:0,
    layer:"sub", weapons:["torp_yu6"], prereq:["navalyard","lab","radar"], tech:3,
    nuclear:true, quiet:0.62, sonar:7.0, radarQ:4, ssbn:true,
    desc:"China's sea-based deterrent. Capable and steadily improving, but acoustically " +
         "the noisiest boat in this class of ship - Western assessments have long held " +
         "that the Jin is easier to track than the Soviet boats of forty years ago." },
  ssgn_n: { from:"e00", fac:"nato", role:"ssgn", name:"Ohio SSGN", full:"SSGN-726 (converted)", cat:"naval",
    cost:5200, oil:125, time:62, hp:2500, armor:"heavy", speed:2.1, turn:0.55, sight:6, r:26, mass:0,
    layer:"sub", weapons:["torp_mk48","ssm_harpoon"], prereq:["navalyard","lab"], tech:3,
    nuclear:true, quiet:0.24, sonar:10.0, radarQ:5, layNet:6,
    desc:"Four Ohio hulls had their ballistic tubes converted to carry 154 Tomahawks. " +
         "It is a submerged missile magazine that can empty a small war's worth of " +
         "cruise missiles into a coastline without ever surfacing." },
  /* from:"e80", not "e60": Project 949 Granit (K-525 Arkhangelsk) commissioned
     30 December 1980 and Project 949A Antey (K-148 Krasnodar) 30 September
     1986, which js/facts.js already records. The Soviet cruise-missile boats
     of the 1960s were the Juliett, the Echo II and the Charlie, and none of
     them is in this game - so pact correctly has NO ssgn in e60, and that is
     a result rather than a hole. The weapons array is set at the foot of this
     file: twenty-four P-700 Granit, not a P-800 Oniks from twenty years later. */
  ssgn_p: { from:"e80", fac:"pact", role:"ssgn", name:"Oscar II SSGN", full:"Project 949A Antey", cat:"naval",
    cost:4900, oil:130, time:60, hp:2900, armor:"heavy", speed:2.0, turn:0.45, sight:5.5, r:28, mass:0,
    layer:"sub", weapons:["torp_ugst","ssm_oniks"], prereq:["navalyard","lab"], tech:3,
    nuclear:true, quiet:0.55, sonar:6.6, radarQ:4,
    desc:"An enormous double-hulled boat built around twenty-four anti-ship missiles, " +
         "designed for one job: killing an American carrier group. Survivable, heavily " +
         "armed, and loud enough that finding it was never the hard part." },
});

/* ---- ASW helicopters: what actually kills a submarine ---- */
Object.assign(UNITS, {
  asw_helo_n: { from:"e60", fac:"nato", role:"aswhelo", name:"MH-60R Seahawk", full:"Sikorsky MH-60R",
    cat:"aircraft", cost:1400, oil:26, time:16, hp:380, armor:"air", speed:3.4, turn:2.4,
    sight:8.5, r:13, mass:0, layer:"air", weapons:["asw_mk54"], prereq:["airbase"], tech:2,
    ammo:4, radius:24, sonar:9.5, rcs:0.75, radarQ:9, gen:4.5, carrierCapable:true,
    desc:"Dipping sonar, sonobuoys and lightweight torpedoes. A surface group without one " +
         "of these is close to blind against a modern submarine; with one, a diesel boat " +
         "that has been localised rarely escapes." },
  asw_helo_c: { from:"e00", fac:"pla", role:"aswhelo", name:"Z-9C / Z-20F", full:"Harbin Z-9C",
    cat:"aircraft", cost:1300, oil:24, time:15, hp:340, armor:"air", speed:3.3, turn:2.4,
    sight:7.8, r:12, mass:0, layer:"air", weapons:["asw_yu7"], prereq:["airbase"], tech:2,
    ammo:3, radius:22, sonar:8.0, rcs:0.80, radarQ:7, gen:4.0, carrierCapable:true,
    desc:"China's shipborne ASW helicopter. Competent and increasingly numerous, though " +
         "its sonar and processing lag a generation behind the Seahawk." },
  /* TWO FAULTS IN ONE FIELD. This row is a Ka-27PL and js/facts.js records
     service 1981 for it, so from:"e60" put a 1981 helicopter in the 1960s. And
     pact_e80_aswhelo in eras.js is the SAME aircraft with to:"e80", so both
     sat at from-index 2 in e80 - unitFor() compares with `f > bestFrom`,
     strictly greater, and the winner was therefore decided by ROLES insertion
     order, which is UNITS enumeration order and not something to rely on.
     Starting here at e90, where that row's window closes, removes both.
     pact_e60_aswhelo below is the Ka-25PL Hormone-A of 1968 - the helicopter
     Moskva was built to carry fourteen of - and e50 stays empty because the
     navy had no shipborne ASW helicopter before it. */
  asw_helo_p: { from:"e90", fac:"pact", role:"aswhelo", name:"Ka-27 Helix", full:"Kamov Ka-27PL",
    cat:"aircraft", cost:1200, oil:26, time:15, hp:360, armor:"air", speed:3.1, turn:2.2,
    sight:6.8, r:12, mass:0, layer:"air", weapons:["asw_rbu"], prereq:["airbase"], tech:2,
    ammo:3, radius:20, sonar:6.2, rcs:0.85, radarQ:5, gen:3.5, carrierCapable:true,
    desc:"Coaxial-rotor ASW helicopter dating from 1981. It still flies from Russian decks " +
         "because there is no replacement, and its sensors are of their era." },
  asw_helo_r: { from:"e90", fac:"roc", role:"aswhelo", name:"S-70C(M) Thunderhawk", full:"Sikorsky S-70C(M)-1/2",
    cat:"aircraft", cost:1350, oil:25, time:16, hp:360, armor:"air", speed:3.3, turn:2.3,
    sight:8.0, r:13, mass:0, layer:"air", weapons:["asw_mk54"], prereq:["airbase"], tech:2,
    ammo:3, radius:22, sonar:8.6, rcs:0.78, radarQ:8, gen:4.0, carrierCapable:true,
    desc:"Taiwan's Seahawk derivative, flown from its frigates. Well suited to hunting " +
         "diesel boats in the shallow, noisy water of the Strait. Ordered in 1983 and " +
         "delivered around 1990; the 501st Squadron's Hughes 500MD/ASW stood the ASW " +
         "watch before it, off the decks of 1940s American destroyers." },
});


/* ============ BRITISH, FRENCH AND GERMAN NAVIES - the present day ============
   Three fleets that are not each other and are not the United States Navy, and
   the differences are in the FIELDS, not only in the prose:

     Britain  small carriers and the best ASW in the game. `sonar` on a Type 23
              with Sonar 2087 beats every hull afloat here including the
              American destroyer, and `quiet` on an Astute is bettered only by
              a boomer and by the German 212A.
     France   the only nuclear carrier outside the US Navy (`nuclear` on a
              carrier appears exactly twice in this table), the only European
              deck with fixed-wing AEW, and Exocet on everything.
     Germany  NO CARRIER, NO CRUISER, NO NUCLEAR ANYTHING - four `carrier`
              roles and two submarine roles that are permanently empty. What
              it has instead is `aip` on the quietest boat in the game, mines
              on that boat (`layMines` + `mineSea`, a Baltic weapon nobody else
              here carries under water) and the best minesweeper afloat.

   British escorts carry `navgun_76` deliberately: the NAVGUN loop in
   generations.js substitutes the 4.5in Mk 8 into any British weapon named
   "OTO 76mm", which is what makes that row live rather than dead code. France
   and Germany fall through and keep the 76 mm, which is what their ships
   actually mount. */
Object.assign(UNITS, {
  /* -------------------------------- BRITAIN -------------------------------- */
  boat_b: { from:"e20", fac:"gbr", role:"patrol", name:"River Batch 2 OPV", full:"HMS Forth (P222), River-class Batch 2", cat:"naval",
    cost:540, oil:6, time:9, hp:640, armor:"light", speed:2.7, turn:1.9, sight:8.8, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.4, sonar:1.0,
    desc:"Ninety metres and two thousand tonnes for a 30 mm gun and a flight deck - an ocean-going constabulary hull, not a warship, and slower than the American Mk VI it stands opposite. Britain has never operated a missile-armed fast attack craft and does not now; the small end of the Royal Navy is patrol work, and this is honestly what it looks like." },
  corvette_b: { from:"e20", fac:"gbr", role:"corvette", name:"Type 23 Duke", full:"Type 23 Duke-class frigate, Sea Ceptor fit", cat:"naval",
    cost:1290, oil:17, time:17, hp:1120, armor:"light", speed:2.9, turn:1.7, sight:9.8, r:17, mass:0,
    layer:"sea", weapons:["navgun_76","sam_camm","asw_stingray"], prereq:["navalyard"], tech:1,
    turret:true, tturn:2.0, sonar:11.0, ciws:0.46,
    desc:"Designed in the 1980s as a cheap towed-array hull to sit quietly in the Atlantic and listen, and still the best submarine hunter in this game: Sonar 2087 is a low-frequency active-passive array with no equal in any other fleet here. Harpoon was withdrawn in 2023 with nothing to replace it, so a British frigate now has a gun, a short-range SAM and a torpedo, and nothing at all with which to sink a ship beyond the horizon. Type 26 and Type 31 are building; neither is in service." },
  destroyer_b: { from:"e20", fac:"gbr", role:"destroyer", name:"Type 45 Daring DDG", full:"HMS Daring (D32), Type 45 Daring-class", cat:"naval",
    cost:2280, oil:35, time:29, hp:1980, armor:"heavy", speed:2.5, turn:1.2, sight:11.6, r:20, mass:0,
    layer:"sea", weapons:["navgun_76","sam_aster30","sam_aster15"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.58, sonar:6.4,
    desc:"SAMPSON on a mast at 27 metres and Aster 30 beneath it: the best air-defence ship in Europe and, on a good day, in the world - six of them, and often two at sea. It was built with no anti-ship missile whatsoever and had none for fourteen years, until NSM began appearing in 2023-24; the propulsion plant tripped repeatedly in warm water and every hull has been through a power-improvement refit. Superb at one job, thin everywhere else." },
  sub_b: { from:"e20", fac:"gbr", role:"sub", name:"Astute SSN", full:"HMS Astute (S119), Astute-class", cat:"naval",
    cost:2520, oil:42, time:31, hp:1230, armor:"light", speed:2.4, turn:1.1, sight:8.6, r:17, mass:0,
    layer:"sub", weapons:["torp_spearfish"], prereq:["navalyard","radar"], tech:2, submerged:true,
    nuclear:true, quiet:0.25, sonar:11.2, radarQ:6, layNet:5,
    desc:"A reactor core that never needs refuelling in the boat's life, Spearfish, Tomahawk out of the same tubes, and an acoustic signature the Royal Navy will not discuss. Seven boats for a fleet that had thirty attack submarines in 1980 - the recurring British answer, which is to buy the best article in the world and then buy four of it." },
  ssbn_b: { from:"e90", fac:"gbr", role:"ssbn", name:"Vanguard SSBN", full:"HMS Vanguard (S28), Vanguard-class", cat:"naval",
    cost:6100, oil:138, time:70, hp:2520, armor:"heavy", speed:1.95, turn:0.5, sight:6, r:26, mass:0,
    layer:"sub", weapons:["slbm_b"], prereq:["navalyard","lab","radar"], tech:3,
    nuclear:true, quiet:0.23, sonar:9.6, radarQ:5, ssbn:true,
    desc:"Four boats holding the only British nuclear weapon of any kind. The RAF's WE.177 free-fall bomb went in 1998 and the WE.177A nuclear depth bomb left the ships and helicopters in 1992, so since then the deterrent is this hull and nothing else - one boat at sea, always, unbroken since HMS Resolution sailed on 30 June 1969, the longest continuous deterrent patrol of any nuclear power." },
  carrier_b: { from:"e20", fac:"gbr", role:"carrier", name:"Queen Elizabeth CV", full:"HMS Queen Elizabeth (R08), Queen Elizabeth-class", cat:"naval",
    cost:4150, oil:88, time:53, hp:3300, armor:"heavy", speed:1.6, turn:0.6, sight:13, r:30, mass:0,
    layer:"sea", weapons:["ciws_phalanx"], prereq:["navalyard","lab","airbase"], tech:3, ciws:0.5, carrier:3, storage:0,
    desc:"Sixty-five thousand tonnes, two islands, a ski-jump and no catapult - so it flies F-35B and nothing else, and can never operate a fixed-wing early-warning aircraft. Britain invented the steam catapult, the angled deck and the mirror landing sight, gave all three to the United States Navy, and then built a carrier that uses none of them. Two ships, and for years not enough escorts to screen one." },
  cstealth_b: { from:"e20", fac:"gbr", role:"cstealth", name:"F-35B Lightning", full:"Lockheed Martin F-35B Lightning II", cat:"aircraft",
    cost:1780, oil:34, time:22, hp:440, armor:"air", speed:7.9, turn:2.1, sight:11.0, r:16, mass:0,
    layer:"air", weapons:["aam_lo"], prereq:["airbase"], tech:3, jet:true, ammo:4,
    gen:5, rcs:0.16, radarQ:17, radius:34, carrierCapable:true, refuelable:true, radar:8,
    desc:"The only fifth-generation aircraft that flies from a ski-jump, and the reason the Queen Elizabeth class exists in the shape it does. Op Fortis in 2021 put British and American F-35Bs on the same British deck and took the group to the Pacific. Short legs compared with the carrier variants, a lift fan where the fuel would otherwise be, and a British squadron count that is still in the low tens." },
  asw_helo_b: { from:"e20", fac:"gbr", role:"aswhelo", name:"Merlin HM2", full:"AgustaWestland Merlin HM2", cat:"aircraft",
    cost:1520, oil:28, time:17, hp:420, armor:"air", speed:3.2, turn:2.2, sight:8.8, r:13, mass:0,
    layer:"air", weapons:["asw_stingray"], prereq:["airbase"], tech:2,
    ammo:4, radius:26, sonar:10.4, rcs:0.9, radarQ:10, gen:4.5, carrierCapable:true,
    desc:"Three engines, a fourteen-tonne airframe and the Blue Kestrel radar - the heaviest shipborne ASW helicopter in the West, and paired with a Type 23's towed array it is the other half of the best anti-submarine system in this game. The Wildcat HMA2 flies the light end from frigate decks; the Crowsnest radar bag on a Merlin replaced the Sea King ASaC7 in the airborne early-warning role in 2021, badly and late." },

  /* -------------------------------- FRANCE --------------------------------- */
  boat_f: { from:"e20", fac:"fra", role:"patrol", name:"Patrouilleur Outre-mer", full:"Auguste Benebig (P780), POM class", cat:"naval",
    cost:500, oil:6, time:9, hp:560, armor:"light", speed:2.8, turn:2.0, sight:8.4, r:13, mass:0,
    layer:"sea", weapons:["hmg"], prereq:["navalyard"], tech:1, turret:true, tturn:2.4, sonar:0.9,
    desc:"Eighty metres for the overseas territories, delivered from 2023 - France polices more ocean than anyone here except the United States and needs cheap hulls to do it. Like the Royal Navy, the Marine Nationale has never bought a missile-armed fast attack craft; it built them by the dozen for export as La Combattante and sold every one." },
  corvette_f: { from:"e20", fac:"fra", role:"corvette", name:"FREMM Aquitaine", full:"Aquitaine (D650), FREMM multi-mission frigate", cat:"naval",
    cost:1340, oil:18, time:17, hp:1180, armor:"light", speed:2.9, turn:1.7, sight:9.8, r:17, mass:0,
    layer:"sea", weapons:["navgun_76","sam_aster15","ssm_exocet"], prereq:["navalyard"], tech:1,
    turret:true, tturn:2.0, sonar:9.2, ciws:0.44,
    desc:"Six thousand tonnes on a shaped hull with a variable-depth sonar aft, Aster 15 in Sylver cells, Exocet on the beam and - on the ASW hulls - the naval cruise missile MdCN, which no other European escort carries. The frigate France sells: Morocco, Egypt and Greece all bought it. Not quite a British towed array, and considerably better armed." },
  destroyer_f: { from:"e20", fac:"fra", role:"destroyer", name:"Horizon DDG", full:"Forbin (D620), Horizon-class air-defence destroyer", cat:"naval",
    cost:2240, oil:34, time:28, hp:2020, armor:"heavy", speed:2.4, turn:1.2, sight:11.2, r:20, mass:0,
    layer:"sea", weapons:["navgun_76","sam_aster30","ssm_exocet"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.56, sonar:6.8,
    desc:"The same PAAMS system as a Type 45, under a rotating EMPAR instead of SAMPSON, on a hull France and Italy designed together after Britain walked out of the three-nation Horizon programme in 1999. Two ships. Unlike the Type 45 it went to sea with an anti-ship missile from the first day, because it is French and Exocet is the point." },
  sub_f: { from:"e20", fac:"fra", role:"sub", name:"Suffren SSN", full:"Suffren (S635), Barracuda-class", cat:"naval",
    cost:2460, oil:41, time:30, hp:1210, armor:"light", speed:2.35, turn:1.1, sight:8.4, r:17, mass:0,
    layer:"sub", weapons:["torp_f21"], prereq:["navalyard","radar"], tech:2, submerged:true,
    nuclear:true, quiet:0.26, sonar:10.6, radarQ:5, layNet:4,
    desc:"France's second generation of nuclear attack boat and a very large step from the Rubis it replaces: pump-jet propulsion, a diver lock-out, and from 2022 the MdCN cruise missile fired from the torpedo tubes, which makes France the second country in the world with a submarine land-attack missile of its own design. Six boats replacing six boats, built at Cherbourg with a French reactor and a French torpedo." },
  /* from:"e00", not "e90". The hull commissioned 21 March 1997, but the M51
     it carries here did not fly until 9 November 2006 and did not go on
     patrol until Le Terrible in 2010; Le Triomphant was not converted until
     her 2016-18 refit. eras.js fra_e90_ssbn holds the same boat with the M45
     she actually sailed with, so the 1990s are not left empty. */
  ssbn_f: { from:"e00", fac:"fra", role:"ssbn", name:"Le Triomphant SSBN", full:"Le Triomphant (S616), Triomphant-class", cat:"naval",
    cost:6050, oil:140, time:70, hp:2540, armor:"heavy", speed:1.95, turn:0.5, sight:6, r:26, mass:0,
    layer:"sub", weapons:["slbm_f"], prereq:["navalyard","lab","radar"], tech:3,
    nuclear:true, quiet:0.24, sonar:9.4, radarQ:5, ssbn:true,
    desc:"Four boats carrying the M51, and the only strategic weapon in NATO that answers to nobody outside its own capital - the missile, the warhead, the reactor and the boat are all French. France has kept a boat at sea since Le Redoutable's first patrol in 1972 and is the only nuclear power here with a second, airborne leg it also owns outright, including one flown off a carrier deck." },
  carrier_f: { from:"e20", fac:"fra", role:"carrier", name:"Charles de Gaulle CVN", full:"Charles de Gaulle (R91)", cat:"naval",
    cost:4400, oil:96, time:55, hp:3400, armor:"heavy", speed:1.55, turn:0.6, sight:13.4, r:30, mass:0,
    layer:"sea", weapons:["sam_aster15"], prereq:["navalyard","lab","airbase"], tech:3,
    ciws:0.52, carrier:3, nuclear:true, storage:0,
    desc:"The only nuclear-powered aircraft carrier outside the United States Navy, and the only carrier in the world besides an American one with catapults, arrestor wires and a fixed-wing early-warning aircraft. Forty-two thousand tonnes, two K15 reactors from the SSBN programme, a flight deck that had to be lengthened before the E-2C could use it, and one ship - when she is in refit France has no carrier at all. Rafale M off this deck carries ASMP-A: nuclear strike from the sea, which nobody else here can do." },
  asw_helo_f: { from:"e20", fac:"fra", role:"aswhelo", name:"NH90 NFH Caiman", full:"NHIndustries NH90 NFH Caiman Marine", cat:"aircraft",
    cost:1430, oil:26, time:16, hp:395, armor:"air", speed:3.3, turn:2.3, sight:8.4, r:13, mass:0,
    layer:"air", weapons:["asw_mu90"], prereq:["airbase"], tech:2,
    ammo:4, radius:24, sonar:9.6, rcs:0.82, radarQ:9, gen:4.5, carrierCapable:true,
    desc:"Fly-by-wire, a composite airframe and a folding tail for a frigate hangar, with the FLASH dipping sonar and MU90 beneath it. Late, expensive and shared with Germany, Italy and the Netherlands - the European pattern. It replaced the Lynx Mk4, which had served since 1979 and whose retirement left a gap the fleet felt." },

  /* -------------------------------- GERMANY -------------------------------- */
  corvette_g: { from:"e20", fac:"deu", role:"corvette", name:"K130 Braunschweig", full:"Braunschweig-class (Type 130) corvette, Batch 2", cat:"naval",
    cost:1180, oil:15, time:16, hp:980, armor:"light", speed:3.0, turn:1.9, sight:9.0, r:17, mass:0,
    layer:"sea", weapons:["navgun_76","sam_ram","ssm_exocet"], prereq:["navalyard"], tech:1,
    turret:true, tturn:2.0, sonar:2.4, ciws:0.5,
    desc:"Eighteen hundred tonnes, a shaped topside, two RAM launchers, four RBS15 and no sonar worth the name - a Baltic ship built to fight from the coast, not to hunt submarines in the Atlantic. It is also now the SMALLEST combatant Germany owns: the last Gepard-class fast attack craft paid off in 2016 and the navy that operated thirty missile boats through the Cold War cannot buy a cheap hull any more." },
  destroyer_g: { from:"e20", fac:"deu", role:"destroyer", name:"Sachsen F124", full:"Sachsen (F219), Type 124 air-defence frigate", cat:"naval",
    cost:2150, oil:33, time:28, hp:2060, armor:"heavy", speed:2.35, turn:1.2, sight:11.0, r:20, mass:0,
    layer:"sea", weapons:["navgun_76","sam_sm2","sam_ram"], prereq:["navalyard","radar"], tech:2,
    turret:true, tturn:1.4, ciws:0.54, sonar:7.4,
    desc:"APAR - four fixed active phased-array faces, and one of the few radars in the world in the class of SPY-1 and SAMPSON - over SM-2 and ESSM. Three ships, and Germany has no others like them: the newest German class, the Type 125 Baden-Wurttemberg of 2019, is a seven-thousand-tonne stabilisation frigate with a 127 mm gun, no towed array and no anti-submarine torpedoes at all, and cannot escort anything against a submarine. There is no German cruiser and there never has been." },
  sub_g: { from:"e20", fac:"deu", role:"sub", name:"Type 212A", full:"U-31 (S181), Type 212A", cat:"naval",
    cost:2050, oil:30, time:26, hp:820, armor:"light", speed:1.9, turn:1.3, sight:7.4, r:15, mass:0,
    layer:"sub", weapons:["torp_dm2a4"], prereq:["navalyard","radar"], tech:2, submerged:true,
    nuclear:false, aip:true, quiet:0.20, sonar:8.8, radarQ:3, layMines:8, mineSea:true,
    desc:"Nine polymer-electrolyte fuel cells, a non-magnetic hull and weeks submerged without ever coming up for air - the quietest submarine in this game, and it is not nuclear. Eighteen hundred tonnes against an Astute's seven thousand: it cannot cross an ocean and does not need to, because its water is the Baltic and the North Sea, where it can sit on a shoal a nuclear boat cannot enter and lay mines across a strait. Six boats. The Type 212CD was contracted in 2021; the first German one is expected around 2032 and none has been delivered." },
  asw_helo_g: { from:"e20", fac:"deu", role:"aswhelo", name:"Sea Lynx Mk88A", full:"Westland Sea Lynx Mk88A", cat:"aircraft",
    cost:1240, oil:24, time:15, hp:340, armor:"air", speed:3.4, turn:2.4, sight:7.6, r:12, mass:0,
    layer:"air", weapons:["asw_mu90"], prereq:["airbase"], tech:2,
    ammo:3, radius:20, sonar:7.4, rcs:0.74, radarQ:7, gen:4.0, carrierCapable:true,
    desc:"A British airframe of 1981, rebuilt in the 1990s, and still the German navy's only shipborne ASW helicopter more than forty years on. The NH90 Sea Tiger was ordered in 2020 to replace it and deliveries have barely begun. Germany had no shipborne ASW helicopter at all before 1981." },
  minesweeper_g: { from:"e90", fac:"deu", role:"minesweeper", name:"Frankenthal MCMV", full:"Frankenthal-class (Type 332) mine hunter", cat:"naval",
    cost:1420, oil:17, time:21, hp:760, armor:"light", speed:2.2, turn:1.6, sight:8.4, r:15, mass:0,
    layer:"sea", weapons:["navgun_57"], prereq:["navalyard"], tech:1,
    mineDetect:8.0, mineClear:3.4, mineClearRate:2.0, sonar:3.2,
    desc:"Mine countermeasures is the one branch of naval warfare where Germany genuinely leads, and it has for fifty years: the Troika system of 1981 put one manned control ship in charge of three unmanned Seehund sweep drones, which is the first operational unmanned minesweeping anywhere. The Frankenthal hull is non-magnetic, hunts with a variable-depth sonar and puts a Pinguin drone down the wire to kill what it finds. The Baltic is the most heavily mined sea in Europe and this is why." },
});


/* ---- radar cross section of surface ships ----
   Relative to a conventional 1980s destroyer (= 1.0). Superstructure shaping
   is the single biggest lever a designer has: an angled, enclosed topside
   with no exposed clutter returns a fraction of what a Slava's forest of
   deck launchers, masts and radar dishes puts back. Detection range scales
   with the fourth root of this, and it also drives how easily an incoming
   missile can hold a lock. */
var SHIP_RCS = {
  /* NATO: shaped topsides across the board */
  boat_n:0.30, corvette_n:0.10, missileboat_n:0.28, destroyer_n:0.55,
  cruiser_n:0.85, carrier_n:2.6,
  /* PLA: newer hulls are well shaped, older ones less so */
  boat_c:0.22, corvette_c:0.40, missileboat_c:0.16, destroyer_c:0.50,
  cruiser_c:0.60, carrier_c:2.6,
  /* Eastern bloc: 1980s topsides covered in deck launchers and dishes */
  boat_p:0.55, corvette_p:0.75, missileboat_p:0.50, destroyer_p:1.30,
  cruiser_p:1.70, carrier_p:2.9,
  /* North Korea: small, but no shaping whatsoever */
  boat_k:0.50, corvette_k:0.85, missileboat_k:0.60,
  /* Taiwan: an old destroyer and a genuinely stealthy catamaran */
  boat_r:0.30, corvette_r:0.12, missileboat_r:0.26, destroyer_r:1.15,
  /* Britain, France and Germany. The La Fayette of 1996 was the first warship
     in the world designed for a low signature and the number says so; the
     FREMM, the K130 and the Type 45 are shaped too, while a Type 23 is a
     1980s hull with the clutter tidied up rather than a stealth design. */
  boat_b:0.30, corvette_b:0.45, destroyer_b:0.30, carrier_b:2.2,
  boat_f:0.28, corvette_f:0.18, destroyer_f:0.26, carrier_f:2.1,
  corvette_g:0.16, destroyer_g:0.34,
};
for (var _rc in SHIP_RCS) if (UNITS[_rc]) UNITS[_rc].rcs = SHIP_RCS[_rc];

/* ---- soft kill ----
   Chaff, decoys and off-board jammers seduce a missile away rather than
   shooting it down. Modern western and Chinese ships carry good ones; the
   North Korean fleet carries essentially none. */
var SOFTKILL = {
  corvette_n:0.30, destroyer_n:0.34, cruiser_n:0.34, carrier_n:0.26, missileboat_n:0.20,
  corvette_c:0.26, destroyer_c:0.29, cruiser_c:0.31, carrier_c:0.24, missileboat_c:0.16,
  corvette_p:0.14, destroyer_p:0.17, cruiser_p:0.18, carrier_p:0.15, missileboat_p:0.10,
  corvette_r:0.24, destroyer_r:0.22, missileboat_r:0.16,
  corvette_k:0.04, missileboat_k:0.03, boat_k:0.0,
  corvette_b:0.32, destroyer_b:0.36, carrier_b:0.27,
  corvette_f:0.33, destroyer_f:0.34, carrier_f:0.26,
  corvette_g:0.30, destroyer_g:0.31,
};
for (var _sk2 in SOFTKILL) if (UNITS[_sk2]) UNITS[_sk2].softkill = SOFTKILL[_sk2];


/* ---- submarine-launched land attack ----
   A ballistic missile submarine that can only fire torpedoes is a very
   expensive torpedo boat. The whole reason these hulls exist is to hold a
   target ashore at risk from under water, so they get a land-attack missile:
   slow to reload, long-ranged, and fired while submerged. */
Object.assign(WEAPONS, {
  slbm_n: { name:"Trident II D5 (conventional)", coldLaunch:true, dmg:900, warhead:"he", range:22.0,
    minRange:3.0, reload:165, burst:1, acc:0.82, proj:"missile", speed:16, aoe:4.2,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  slbm_p: { name:"Bulava (conventional)", coldLaunch:true, dmg:840, warhead:"he", range:20.0,
    minRange:3.0, reload:172, burst:1, acc:0.74, proj:"missile", speed:16, aoe:4.0,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  slbm_c: { name:"JL-2 (conventional)", coldLaunch:true, dmg:780, warhead:"he", range:19.5,
    minRange:3.0, reload:180, burst:1, acc:0.76, proj:"missile", speed:16, aoe:3.8,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  /* Britain fires the SAME missile as the United States - Trident II D5, drawn
     from the common pool at King's Bay - and builds only the warhead and the
     boat, which is why this row is a relabelled D5 and says so. France built
     the entire chain itself and the M51 is a separate design. The two 1960s
     rows exist because HMS Resolution (1967) and Le Redoutable (1971) were
     real: Polaris A3 and M20 are shorter-ranged and far less accurate than
     what replaced them, and that gap across thirty years is the point. */
  slbm_b: { name:"Trident II D5 (British warhead)", coldLaunch:true, dmg:900, warhead:"he", range:22.0,
    minRange:3.0, reload:165, burst:1, acc:0.82, proj:"missile", speed:16, aoe:4.2,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  slbm_f: { name:"M51 (conventional)", coldLaunch:true, dmg:860, warhead:"he", range:21.0,
    minRange:3.0, reload:170, burst:1, acc:0.80, proj:"missile", speed:16, aoe:4.0,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  slbm_polaris: { name:"Polaris A3TK (Chevaline)", coldLaunch:true, dmg:700, warhead:"he", range:17.0,
    minRange:3.0, reload:190, burst:1, acc:0.55, proj:"missile", speed:16, aoe:4.4,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  slbm_m20: { name:"M20 (conventional)", coldLaunch:true, dmg:680, warhead:"he", range:16.0,
    minRange:3.0, reload:195, burst:1, acc:0.50, proj:"missile", speed:16, aoe:4.4,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  tlam_n: { name:"BGM-109 Tomahawk", dmg:320, warhead:"he", range:19.0, minRange:2.5,
    reload:20, burst:2, burstDelay:1.1, acc:0.90, proj:"missile", speed:13, aoe:2.0,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },

  /* ---- Tomahawk from an ATTACK boat, which is not the same magazine ----
     Los Angeles, Seawolf and Virginia all carried only a torpedo with
     tgt.ground 0, so not one of them could touch a target ashore - while
     nato_e80_sub's own description talked about "twelve vertical Tomahawk
     tubes forward" and nato_e00_sub's about "Tomahawk capacity to 40". The
     text described a weapon the unit did not have.

     They do not all get the same row, because the magazine is the whole
     difference between these boats and the reason the SSGN exists at all.
     Three ways to carry the same missile:

     FROM A TORPEDO TUBE. Every round competes with a Mk 48 for one of a
     handful of tubes, and reloading a 21-foot missile into a tube at sea is
     slow. This is how Tomahawk went to sea in 1983 and it is the ONLY way a
     Seawolf can do it - eight 660 mm tubes and no vertical launcher, ever.
     Matches the Astute's tube-launched row at reload 32.

     FROM DEDICATED VERTICAL TUBES. Twelve of them forward of the sail, on
     the 688i from USS Providence (SSN-719, 1985) and on Virginia Blocks I-IV.
     They do not compete with the torpedo room at all, which is the point.

     FROM THE PAYLOAD MODULE. Virginia Block V adds a 25 m section with four
     more tubes of seven, taking the boat to about forty rounds. Deep enough
     to salvo.

     The converted Ohio SSGN keeps the deepest magazine in the game at
     reload 20 and a pair per salvo - 154 missiles - and none of these
     touches it. An attack boat is a Tomahawk carrier; the SSGN is a Tomahawk
     magazine that happens to float. */
  tlam_n_tube: { name:"BGM-109 Tomahawk (torpedo tube)", dmg:320, warhead:"he",
    range:19.0, minRange:2.5, reload:32, burst:1, acc:0.90, proj:"missile",
    speed:13, aoe:2.0, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  tlam_n_vls: { name:"BGM-109 Tomahawk (12 vertical tubes)", dmg:320, warhead:"he",
    range:19.0, minRange:2.5, reload:26, burst:1, acc:0.90, proj:"missile",
    speed:13, aoe:2.0, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  tlam_n_vpm: { name:"BGM-109 Tomahawk (Virginia Payload Module)", dmg:320,
    warhead:"he", range:19.0, minRange:2.5, reload:23, burst:2, burstDelay:1.1,
    acc:0.90, proj:"missile", speed:13, aoe:2.0,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
});

/* ---- road-mobile ballistic missiles ----
   The on-map, targetable, killable form of a power the game has only ever had
   off-map (SUPPORT.tochka, js/rules.js:2173). These fire proj:"missile" and NOT
   proj:"arc", because the whole layered-defence block in combat.js is entered
   only for a guided round: an arc round would be strictly uninterceptable and
   the new SAM would have nothing to do. Firing as a missile costs the counter-
   battery contact and the ready-round decrement, both of which are arc-gated,
   so each round carries `indirect:true` and the four gates are widened to read
   it - see the integration list.

   Ranges are on the LIVE scale, not the authored one. generations.js:292-305
   rewrote the artillery through R(metres) - mlrs 23.2, howitzer 20.4, koksan
   25.7, mrl240 26.5 - and never migrated sam_site or the slbm block, which is
   why a Trident still says 22.0. A launcher that cannot out-shoot an M270 has
   no reason to exist, so this family runs 24.0 to 31.0. */
Object.assign(WEAPONS, {
  srbm_early: { name:"MGM-5 / R-11 class", dmg:430, warhead:"he", range:24.0, minRange:8.0, reload:95, burst:1,
    acc:0.12, proj:"missile", speed:620, aoe:3.0, suppress:90, indirect:true, manual:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  srbm_short: { name:"OTR-21 class", dmg:400, warhead:"he", range:26.0, minRange:8.0, reload:55, burst:1,
    acc:0.80, proj:"missile", speed:700, aoe:2.2, suppress:80, indirect:true, manual:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  /* A plain Scud is a big, hot, non-manoeuvring airframe on a predictable
     parabola and Patriot did engage them in 1991, so 0.45 - not the SLBM's
     0.12 - is both the accurate figure and the one that makes the new SAM
     mean something. See MISSILE_PROFILE. */
  srbm_scud:  { name:"R-17 class", dmg:470, warhead:"he", range:27.0, minRange:8.0, reload:80, burst:1,
    acc:0.30, proj:"missile", speed:680, aoe:3.2, suppress:95, indirect:true, manual:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  srbm_atacms:{ name:"MGM-140 ATACMS", dmg:440, warhead:"he", range:28.5, minRange:8.0, reload:60, burst:1,
    acc:0.88, proj:"missile", speed:700, aoe:2.4, suppress:80, indirect:true, manual:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  /* The most accurate ballistic missile of its generation, by a distance, and
     the only weapon in this file deleted by a treaty rather than by obsolescence.
     `to:"e80"` on the unit is the INF Treaty and the desc says so. */
  srbm_p2:    { name:"MGM-31B Pershing II", dmg:520, warhead:"he", range:31.0, minRange:8.0, reload:95, burst:1,
    acc:0.90, proj:"missile", speed:730, aoe:2.6, suppress:95, indirect:true, manual:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  srbm_mod:   { name:"9K720 class", dmg:520, warhead:"he", range:30.0, minRange:8.0, reload:58, burst:1,
    acc:0.90, proj:"missile", speed:720, aoe:2.6, suppress:90, indirect:true, manual:true,
    tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
});

if (UNITS.ssbn_n) UNITS.ssbn_n.weapons = ["slbm_n", "torp_mk48"];
if (UNITS.ssbn_p) UNITS.ssbn_p.weapons = ["slbm_p", "torp_ugst"];
if (UNITS.ssbn_c) UNITS.ssbn_c.weapons = ["slbm_c", "torp_yu6"];
if (UNITS.ssbn_b) UNITS.ssbn_b.weapons = ["slbm_b", "torp_spearfish"];
if (UNITS.ssbn_f) UNITS.ssbn_f.weapons = ["slbm_f", "torp_f21"];
/* the converted Ohio is a submerged cruise-missile magazine, so it gets the
   deep Tomahawk load rather than a pair of Harpoons */
if (UNITS.ssgn_n) UNITS.ssgn_n.weapons = ["tlam_n", "torp_mk48", "ssm_harpoon"];
/* The e20 Virginia is a Block IV/V hull by its own `full` string, so it gets
   the payload module. This assignment has to live HERE rather than on the row
   at the top of the file: the SUBS table at rules.js:2924 rewrites sub_n's
   weapons wholesale, so editing the definition at :636 changes nothing. */
if (UNITS.sub_n) UNITS.sub_n.weapons = ["tlam_n_vpm", "torp_mk48"];


/* ==================================================================
   THE RADAR PICTURE

   Radar is not one building. It is a network, and the player should be
   able to invest in it from several directions:

     a fixed radar dome        cheap, large, but it cannot move
     a mobile radar vehicle    follows the advance, dies to a HARM
     an Aegis-type warship     the best surface radar there is
     an early warning aircraft the largest picture on the map, and the
                               most fragile thing carrying it

   def.radar is the COVERAGE RADIUS in tiles - how much of the map this
   platform puts under a fire-control-quality picture. def.radarQ is
   DETECTION QUALITY against a low-observable target, which is a
   different question and scales with the fourth root of RCS.

   An airborne radar looks down from altitude and sees vastly further
   than anything on the surface, so the AEW aircraft dominate this list
   by a wide margin - which is exactly why they are worth escorting. */
var RADAR_COVERAGE = {
  /* airborne early warning - the largest picture available to anyone */
  awacs_n: 34, awacs_c: 32, cawacs_n: 30, awacs_r: 28, awacs_p: 24,

  /* Area air defence radars.
     A flat Western advantage here would be wrong. SPY-1 on Ticonderoga and on
     Burke Flight IIA is a PASSIVE phased array designed in the 1980s; the US
     Navy only gets a true modern AESA at sea with SPY-6 on Flight III. The
     Type 346B on a Type 055 is a newer dual-band active array, and by radar
     hardware alone it is at least the equal of what it faces. Where the US
     advantage is real is integration - Link-16 and cooperative engagement
     have decades of operational maturity behind them - and that is modelled
     separately by FACTIONS.*.datalink, not by crippling Chinese antennas. */
  cruiser_c: 23, cruiser_n: 22, destroyer_n: 20, destroyer_c: 19, destroyer_r: 15,
  /* 1980s Soviet sets: capable, but not networked area defence */
  cruiser_p: 14, destroyer_p: 11,
  carrier_n: 18, carrier_c: 17, carrier_p: 13,

  /* electronic attack aircraft carry excellent receivers */
  ew_n: 16, ew_c: 15,

  /* a modern fighter with an AESA contributes a forward slice of the
     picture over the datalink - narrow compared with an AEW aircraft,
     but real, and a reason to keep a combat air patrol up */
  /* Chinese fighter AESA is current-generation and fielded in quantity; the
     APG-77 is a 1990s design on a small fleet. Treat them as peers. */
  stealth_n: 11, stealth_c: 11, stealth_p: 8,
  cstealth_n: 10, cstealth_c: 9,
  fighter_n: 6, fighter_c: 7, fighter_r: 7, fighter_p: 4, cfighter_n: 7,
  sead_n: 7, sead_c: 7,
  /* MESA is the newest AEW array in NATO service. The Typhoon figure is
     deliberately below fighter_n's 6 — Captor-M is mechanically scanned. */
  awacs_b: 33, stealth_b: 9, fighter_b: 5,
  /* Four E-3F, bought outright in 1991 so that France could see the air
     picture without asking the NATO pool, and the only non-American
     carrier-based fixed-wing AEW anywhere sits under cawacs_f. ew_f is a
     receiver, so it earns a collection radius and no jamming. */
  awacs_f: 32, cawacs_f: 28, ew_f: 16, fighter_f: 7, cfighter_f: 7,
  fighter_k: 1.5,          // a MiG-21 ranging set contributes almost nothing
};
/* Anything with a probe or a receptacle can take fuel from a tanker. That is
   fixed-wing jets: a helicopter needs a specially fitted tanker and none of
   these carry the kit, and a tanker cannot refuel itself. */
for (var _rf in UNITS) {
  var _u2 = UNITS[_rf];
  if (_u2.cat === "aircraft" && _u2.jet && !_u2.tanker && !_u2.hover) _u2.refuelable = true;
}
for (var _rcv in RADAR_COVERAGE) if (UNITS[_rcv]) UNITS[_rcv].radar = RADAR_COVERAGE[_rcv];
/* Every airborne early-warning aircraft carries an electronic warfare suite -
   that is half of what the airframe is for - but none of them had a jam value,
   so they were pure receivers. Scale the jamming off the radar fit, which is
   the same aerial farm doing the work. Must run after RADAR_COVERAGE has been
   applied below, because that is where these aircraft finally get their
   radar figure - reading it any earlier finds nothing. */
for (var _wk in UNITS) {
  var _w = UNITS[_wk];
  if ((_w.role === "awacs" || _w.role === "cawacs") && _w.radar && !_w.jam)
    _w.jam = Math.round(_w.radar * 0.42 * 10) / 10;
}



/* ==================================================================
   MISSILE FLIGHT PROFILES

   Not every missile is the same problem. What decides whether a ship
   can kill an inbound round is how it flies, and how fast:

     skim      sea-skimmer. Hugs the surface, so the defender's radar
               horizon hides it until it is close - little warning, but
               a subsonic one is a fair target once seen.
     cruise    a subsonic land-attack missile at medium altitude. Long
               ranged and accurate, and the easiest thing on this list
               to shoot down, because it is slow and clearly visible.
     loft      climbs, cruises high, then dives supersonically on the
               target. The terminal sprint is what makes it hard.
     ballistic a submarine-launched or theatre ballistic weapon. It
               arrives almost vertically at enormous speed and a
               close-in gun system has essentially no chance.
     pop       a short-ranged direct-attack round: a SAM, an air-to-air
               missile or an ATGM. These are the interceptors, not the
               intercepted.

   `intercept` scales every hard-kill roll against the round. Lower is
   harder to stop. It is a separate axis from speed on purpose: an NSM
   is subsonic but shaped to be hard to see, while an Oniks is easy to
   see and simply too fast to engage.
   ================================================================== */
var MISSILE_PROFILE = {
  /* --- anti-ship --- */
  ssm_harpoon: { profile:"skim",   intercept:1.00 },
  ssm_nsm:     { profile:"skim",   intercept:0.72 },   // low-observable airframe
  ssm_yj18:    { profile:"loft",   intercept:0.55 },   // subsonic cruise, supersonic sprint
  ssm_oniks:   { profile:"loft",   intercept:0.45 },   // Mach 2.5 the whole way
  ssm_hf3:     { profile:"loft",   intercept:0.60 },
  ssm_kn01:    { profile:"skim",   intercept:1.45 },   // a 1960s Styx derivative
  ssm:         { profile:"skim",   intercept:1.00 },

  /* --- land attack --- */
  tlam_n:      { profile:"cruise", intercept:1.55 },   // slow and visible
  tlam_n_tube: { profile:"cruise", intercept:1.55 },
  tlam_n_vls:  { profile:"cruise", intercept:1.55 },
  tlam_n_vpm:  { profile:"cruise", intercept:1.55 },
  slbm_n:      { profile:"ballistic", intercept:0.12 },
  slbm_p:      { profile:"ballistic", intercept:0.16 },
  slbm_c:      { profile:"ballistic", intercept:0.18 },

  /* --- anti-radiation --- */
  harm:        { profile:"loft",   intercept:0.70 },
  arm_kh:      { profile:"loft",   intercept:0.80 },
  arm_yj:      { profile:"loft",   intercept:0.75 },
  arm_gnd:     { profile:"loft",   intercept:0.90 },

  /* --- interceptors and direct-attack rounds --- */
  sam_sm2:     { profile:"pop", intercept:0.60 },
  sam_hhq9:    { profile:"pop", intercept:0.62 },
  sam_shtil:   { profile:"pop", intercept:0.85 },
  sam_sm1:     { profile:"pop", intercept:0.85 },
  sam_ship:    { profile:"pop", intercept:0.70 },
  sam_veh:     { profile:"pop", intercept:0.75 },
  /* Starstreak has no proximity fuse and no seeker: three tungsten darts on a
     laser beam at above Mach 4. Nothing to decoy, and almost nothing catches
     it — hence the 0.15. CAMM is soft-launched and actively guided. */
  hvm:         { profile:"pop", intercept:0.15 },
  sam_camm:    { profile:"pop", intercept:0.70 },
  /* European naval rounds. Aster 30 is a hit-to-kill round with a lateral
     thruster ring at the centre of gravity and is genuinely hard to spoof;
     RAM is the last-ditch layer and is meant to be shot at. Exocet is a
     subsonic sea-skimmer with no shaping - the round every navy learned to
     stop, and the one that taught them why they had to. */
  sam_aster15: { profile:"pop", intercept:0.62 },
  sam_aster30: { profile:"pop", intercept:0.55 },
  sam_ram:     { profile:"pop", intercept:0.68 },
  ssm_exocet:  { profile:"skim", intercept:0.95 },
  slbm_b:      { profile:"ballistic", intercept:0.12 },
  slbm_f:      { profile:"ballistic", intercept:0.14 },
  slbm_polaris:{ profile:"ballistic", intercept:0.20 },
  slbm_m20:    { profile:"ballistic", intercept:0.22 },
  aam:         { profile:"pop", intercept:0.55 },
  aam_lo:      { profile:"pop", intercept:0.45 },
  atgm:        { profile:"pop", intercept:1.10 },

  /* --- mobile area air defence: the interceptors, not the intercepted --- */
  sam_area1:   { profile:"pop", intercept:0.85 },
  sam_area2:   { profile:"pop", intercept:0.65 },
  sam_area3:   { profile:"pop", intercept:0.55 },
  sam_tk3:     { profile:"pop", intercept:0.60 },
  sam_pongae:  { profile:"pop", intercept:0.72 },

  /* --- road-mobile ballistic missiles ---
     Deliberately NOT the slbm band above. A Trident re-entry body at 0.12 is a
     strategic weapon and is meant to be unanswerable; a theatre round is a
     smaller, slower, lower problem that Patriot really did engage in 1991. The
     split inside the family is the one that matters: a plain Scud does not
     manoeuvre and sits at 0.45, while an Iskander, a KN-23, a DF-15B and a
     Pershing II fly depressed and pull in the terminal phase, so they sit at
     0.28-0.30 - close to the SLBM band without pretending to be one. */
  srbm_early:  { profile:"ballistic", intercept:0.55 },
  srbm_short:  { profile:"ballistic", intercept:0.40 },
  srbm_scud:   { profile:"ballistic", intercept:0.45 },
  srbm_atacms: { profile:"ballistic", intercept:0.42 },
  srbm_p2:     { profile:"ballistic", intercept:0.30 },
  srbm_mod:    { profile:"ballistic", intercept:0.28 },
};
for (var _mp in MISSILE_PROFILE) if (WEAPONS[_mp]) Object.assign(WEAPONS[_mp], MISSILE_PROFILE[_mp]);

/* ---- flight speed ----
   Projectile speed is in PIXELS per second and a tile is 32px, so a tank
   shell at 860 is about 27 tiles/sec. The ship-launched weapons were authored
   on a different scale entirely - a Harpoon at 13px/s is 0.4 tiles/sec, slower
   than the ship it is chasing, and it expired long before covering its own
   range. In practice no warship ever fired a missile. These are relative to
   the shell: subsonic sea-skimmers around Mach 0.8, supersonic rounds three
   times that, interceptors faster still. */
var MISSILE_SPEED = {
  ssm_harpoon: 120, ssm_nsm: 118, ssm_kn01: 100, ssm: 120,     // subsonic
  tlam_n:      112,                                             // subsonic cruise
  tlam_n_tube: 112, tlam_n_vls: 112, tlam_n_vpm: 112,
  ssm_yj18:    300, ssm_oniks: 330, ssm_hf3: 310,               // supersonic
  slbm_n:      760, slbm_p: 720, slbm_c: 700,                   // ballistic terminal
  sam_sm2:     620, sam_hhq9: 610, sam_shtil: 520, sam_sm1: 520,
  sam_ship:    600, sam_veh: 600,
  sam_camm:    680, hvm:     1300,
  sam_aster15: 660, sam_aster30: 700, sam_ram: 640,
  ssm_exocet:  122,
  slbm_b: 760, slbm_f: 740, slbm_polaris: 700, slbm_m20: 690,
  atgm:        210,
  sam_area1:   560, sam_area2: 640, sam_area3: 700,
  sam_tk3:     690, sam_pongae: 600,
  srbm_early:  620, srbm_short: 700, srbm_scud: 680,
  srbm_atacms: 700, srbm_p2:    730, srbm_mod:  720,
};
for (var _ms in MISSILE_SPEED) if (WEAPONS[_ms]) WEAPONS[_ms].speed = MISSILE_SPEED[_ms];
/* any guided round still on the old scale gets a sane subsonic speed */
for (var _mz in WEAPONS) {
  var _z = WEAPONS[_mz];
  if (_z.proj === "missile" && _z.speed < 60) _z.speed = 130;
}
/* anything guided that was not named above still needs a profile */
for (var _mw in WEAPONS) {
  var _w = WEAPONS[_mw];
  if (_w.proj !== "missile" || _w.profile) continue;
  _w.profile = _w.range >= 12 ? "cruise" : "pop";
  if (_w.intercept === undefined) _w.intercept = 1.0;
}


/* ---- fixed launchers versus vertical launch ----
   A vertical launch cell is reloaded from a magazine below decks. A fixed
   deck tube is not: what is in the tubes when the ship sails is what she has.
   The Eastern bloc ships and the smaller missile craft carry their rounds
   this way, which is why a Slava's first salvo is terrifying and her second
   does not exist. */
var FIXED_MAGAZINE = {
  cruiser_p:     { ssm_oniks: 16 },   // sixteen P-1000 in deck tubes
  destroyer_p:   { ssm_oniks: 8 },    // Sovremenny: two quad mounts
  corvette_p:    { ssm_oniks: 4 },
  missileboat_p: { ssm_oniks: 4 },
  missileboat_k: { ssm_kn01: 4 },
  corvette_k:    { ssm_kn01: 4 },
  missileboat_r: { ssm_hf3: 4 },
  corvette_r:    { ssm_hf3: 8 },
  missileboat_n: { ssm_harpoon: 8 },
  missileboat_c: { ssm_yj18: 8 },
  /* Oscar II carries twenty-four, and cannot reload submerged either */
  ssgn_p:        { ssm_oniks: 24 },
};
for (var _fm in FIXED_MAGAZINE) if (UNITS[_fm]) UNITS[_fm].magazine = FIXED_MAGAZINE[_fm];


/* ==================================================================
   SUBMARINE ORDNANCE FOR THE OTHER SEVEN NAVIES

   WHY THIS BLOCK IS DOWN HERE AND NOT IN THE LAND-ATTACK BLOCK ABOVE.
   The natural home for these rows is the "submarine-launched land attack"
   Object.assign a few hundred lines up, next to slbm_n and tlam_n. They are
   here instead because that block is being rewritten at the same time by the
   work on the American boats, and a merge conflict in the middle of a weapon
   table is expensive. Fold them back in once that has landed.

   The cost of sitting here is that both post-processing loops have already
   run: MISSILE_PROFILE and MISSILE_SPEED are applied above, and so are the
   two catch-alls that give an unnamed guided round profile "cruise" and a
   flat 130 px/s. Nothing below would be caught by either, which is exactly
   the trap: an SLBM left to the catch-all comes out as a subsonic cruise
   missile at intercept 1.0, and combat.js gates its whole ballistic path on
   profile === "ballistic". So every row here carries profile, intercept and
   speed INLINE. Do not delete them on the grounds that the tables handle it.
   ================================================================== */
Object.assign(WEAPONS, {

  /* ---------------------------------------------------------- pact ----
     The Oscar's real missile, and the reason it loses its coastline.
     P-700 Granit (3M45, SS-N-19 Shipwreck, in service 1983) is seven tonnes
     of missile built for one target - an American carrier group - fired
     twenty-four at a time from tubes angled at 40 degrees between a Project
     949A's two hulls, 550-625 km at Mach 1.6 under a 750 kg conventional
     warhead, with a salvo that talked to itself. A secondary mode against a
     fixed target ashore existed on paper; it was never used in that role and
     it is not modelled here, so tgt.ground is 0. Russia's submarine
     land-attack round is the Kalibr below, and it reaches an Oscar only
     through the Project 949AM refit, which has not delivered a boat.

     Note for whoever tidies the surface fleet: three OTHER weapons in this
     game are already called P-700 Granit and none of them agrees with this
     one - w_e90_pact_cruiser has tgt.ground 1, and the two carrier rows are
     warhead "flak" and cannot engage a ship at all. Left alone deliberately;
     they are surface ships and out of a submarine audit's scope. */
  ssm_granit: { name:"P-700 Granit", dmg:380, warhead:"he", range:16.5, minRange:2.5,
    reload:26.0, burst:1, acc:0.72, proj:"missile", speed:300, aoe:2.0,
    profile:"loft", intercept:0.40, tgt:{ground:0,air:0,sea:1,sub:0}, sfx:"missile" },

  /* 3M-14 Kalibr, and it is late. First combat use 7 October 2015, twenty-six
     rounds from four Caspian Flotilla SURFACE ships. The first submarine shot
     in anger was 8 December 2015: B-237 Rostov-na-Donu, a Project 636.3
     Varshavyanka, four rounds from the eastern Mediterranean at Raqqa, with
     Krasnodar, Kolpino and Velikiy Novgorod repeating it through 2017. That is
     the whole of it, which is why this round appears on pact_e00_sub and sub_p
     and on nothing earlier: the P-5 Shaddock of 1959 was nuclear-only with a
     CEP in kilometres and the RK-55 Granat of 1987 went to the INF Treaty.
     burst 1 and a long reload against the Tomahawk's paired shots, because a
     Kilo fires Kalibr out of six torpedo tubes off an eighteen-weapon rack and
     an Ohio SSGN fires it out of 154 dedicated canisters.

     There is already a weapon in this game called Kalibr - the Buyan-M's
     "8 x Kalibr or Oniks in VLS" era row, w_e00_pact_missileboat. That row is
     a mixed VLS fit modelled as a supersonic anti-ship loft; this one is the
     3M-14 land-attack round specifically, and it is subsonic. */
  tlam_p: { name:"3M-14 Kalibr", dmg:315, warhead:"he", range:19.0, minRange:2.5,
    reload:34, burst:1, acc:0.88, proj:"missile", speed:112, aoe:2.0,
    profile:"cruise", intercept:1.50, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },

  /* The Soviet deterrent before the Borei. ssbn_p is a Project 955A firing a
     Bulava, so it moves to e00 where it belongs - but taking it out of e60,
     e80 and e90 without putting the real boats in would leave the navy that
     had more ballistic-missile submarines at sea than anyone holding nothing,
     which is the larger error. These three are genuinely different weapons.

     LAUNCH METHOD, because it is not uniform and the American cold-launch
     sequence is being built right now. R-39 on the Typhoon is COLD launched:
     a powder gas accumulator throws it clear, it coasts up unlit, and the
     first stage lights after it breaches - the same sequence as Bulava,
     Trident, M51 and JL-2. R-27 on the Yankee and the whole R-29 family on
     the Deltas are NOT: the tube is flooded and the motor lights inside it, a
     hot wet start, and the missile breaks the surface already burning.
     Earlier still, R-11FM (1955) and R-13 (1961) on the Golf and Hotel were
     fired from the SURFACE off an elevator inside the fin. Three methods in
     one navy and only one of them is the American one.

     R-27 (4K10, SS-N-6 Serb, 1968): 2,400 km against Polaris A3's 4,600, one
     warhead, CEP near two kilometres. A Yankee had to come close inshore to
     hold anything, which is why it was trailed out of the Barents as routine.
     Shortest and least accurate of the three by design. */
  /* no coldLaunch: hot wet start - see the note above. It breaks the surface
     already burning, so it must NOT get the ejected-and-unlit sequence. */
  slbm_r27: { name:"R-27 (conventional)", dmg:660, warhead:"he", range:14.5,
    minRange:3.0, reload:200, burst:1, acc:0.42, proj:"missile", speed:700, aoe:4.6,
    profile:"ballistic", intercept:0.26, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  /* R-39 (3M65, SS-N-20 Sturgeon, 1983): ninety tonnes, the heaviest SLBM any
     navy has fielded, ten warheads, 8,300 km. The missile is the reason the
     Typhoon is the size it is - the boat was built around it, not the reverse
     - and the production line was at Yuzhmash in Ukraine, so the class died
     with the Union that paid for it. */
  slbm_r39: { name:"R-39 (conventional)", coldLaunch:true, dmg:820, warhead:"he", range:19.0,
    minRange:3.0, reload:185, burst:1, acc:0.62, proj:"missile", speed:730, aoe:4.2,
    profile:"ballistic", intercept:0.18, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  /* R-29RM / R-29RMU2 Sineva (SS-N-23 Skiff, 1986 / 2007): liquid-fuelled,
     which the West gave up on at sea, and the most ACCURATE missile the
     Soviet Union ever put in a boat - astro-inertial with a satellite update
     on the Sineva, CEP around 500 m, and a 2008 test that flew 11,547 km.
     Accuracy close to a Trident, throw-weight and reach below it. */
  /* no coldLaunch: the whole R-29 family is a hot wet start, like the R-27. */
  slbm_sineva: { name:"R-29RM Sineva (conventional)", dmg:800, warhead:"he", range:19.5,
    minRange:3.0, reload:178, burst:1, acc:0.72, proj:"missile", speed:740, aoe:4.0,
    profile:"ballistic", intercept:0.17, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },

  /* ----------------------------------------------------------- gbr ----
     Britain buys the SAME missile off the same American line - 65 Block III
     TLAM-C ordered November 1995, Block IV TLAM-E from 2008 - so damage,
     range and accuracy are tlam_n's and this row exists to carry the one real
     difference. Every British Tomahawk has been fired from a 21-inch TORPEDO
     TUBE: no Royal Navy submarine has ever had a vertical launch system, and
     those tubes are shared with the Spearfish, so what you load is what you
     do not have room for. One round at a time and a long reload, against an
     Ohio SSGN putting pairs out of dedicated cells. First firing HMS
     Splendid, 9 November 1998 on the US east coast range; first shot in anger
     from the same boat over Kosovo in March 1999, HMS Triumph over Libya in
     2011. tgt.sea is 1 because every land-attack row in this file carries it;
     it is this file's shorthand for "reaches a surface target", not a claim
     that the Royal Navy has a submarine anti-ship missile. It does not. */
  tlam_b: { name:"BGM-109 Tomahawk (tube-launched)", dmg:320, warhead:"he", range:19.0,
    minRange:2.5, reload:32, burst:1, acc:0.90, proj:"missile", speed:112, aoe:2.0,
    profile:"cruise", intercept:1.55, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },

  /* ----------------------------------------------------------- fra ----
     MdCN is the ONLY land-attack weapon a French submarine has ever carried
     and it arrived very late. The naval cruise missile went to sea on a FREMM
     around 2017 and was fired in anger at Syria on 14 April 2018, but the
     submarine round - boosted clear of a 533 mm tube inside a capsule before
     the turbojet lights - was not launched from a boat until Suffren fired
     one at the Biscarrosse range on 20 October 2020, and Suffren was not
     admitted to active service until 3 June 2022. Thirty-nine years after
     Tomahawk went to sea on a Los Angeles, which is why no French hull before
     sub_f carries it: the Narval, the Daphne, the Agosta and both marks of
     Rubis genuinely could not touch a target ashore. About 1,000 km against a
     Tomahawk's 1,600, carried in ones and twos among the torpedoes. Named
     tlam_f to sit with tlam_n, tlam_b and tlam_p rather than inventing a
     prefix that appears nowhere else in this table. */
  tlam_f: { name:"MdCN naval cruise missile", dmg:300, warhead:"he", range:17.5,
    minRange:2.5, reload:26, burst:1, acc:0.90, proj:"missile", speed:112, aoe:1.9,
    profile:"cruise", intercept:1.55, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
  /* The missile the file was missing entirely. Le Triomphant commissioned on
     21 March 1997 with sixteen M45 - the M4 airframe under the hardened TN 75
     warhead, 6,000 km, six bodies - and M51 did not fly until 9 November 2006
     or go on patrol until Le Terrible in 2010; Le Triomphant herself was not
     converted until the 2016-18 refit. Without this row a 1990s French boomer
     fires a missile ten years from its first test flight. Cold launched, like
     every French SLBM from M1 to M51: gas generator, unlit coast, first stage
     after it breaches. There is no French exception to record. */
  slbm_m45: { name:"M45 (conventional)", coldLaunch:true, dmg:780, warhead:"he", range:19.0,
    minRange:3.0, reload:178, burst:1, acc:0.70, proj:"missile", speed:720, aoe:4.1,
    profile:"ballistic", intercept:0.17, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },

  /* ----------------------------------------------------------- kpa ----
     North Korea's one demonstrated submarine-launched land-attack round, and
     the reason kpa_e00_sub exists at all. The Pukguksong-1 (KN-11) was
     ejected from the Sinpo-class Gorae and flew about 500 km on 24 August
     2016, after a barge ejection campaign and a run of failures through 2015
     and 2016. One hull, one tube, and never a deterrent patrol - so it is the
     shortest-ranged missile in the SLBM family here and by a distance the
     least accurate once the DPRK guidance multiplier in generations.js has
     been applied to it. Cold launched: gas generator, unlit coast, first
     stage above the surface, which is exactly what the released photographs
     show and why the barge ejection programme came first.

     NOT `manual`. Every other slbm_* row fires on acquisition, and a held
     round on a submarine is unreachable in this build: the map-point gesture
     in ui.js is gated on isIndirect(), which needs indirect:true, and the
     AI's only bombard path iterates tel units. A manual SLBM on a boat would
     be a missile nobody could ever fire. The single tube is modelled the
     right way instead - see the magazine below, which holds ONE round and
     needs a naval yard to put another in the tube. */
  slbm_pk1: { name:"Pukguksong-1 (conventional)", coldLaunch:true, dmg:520, warhead:"he", range:15.0,
    minRange:3.0, reload:200, burst:1, acc:0.70, proj:"missile", speed:660, aoe:3.4,
    profile:"ballistic", intercept:0.38, tgt:{ground:1,air:0,sea:1,sub:0}, sfx:"missile" },
});

/* Chevaline was a British penetration-aid front end fitted to Polaris A3 from
   1982 and to nothing else on earth, and slbm_polaris is shared with
   nato_e60_ssbn - an American Lafayette, which fired Polaris A3 and then
   Poseidon C3. So the shared row carried a British-only designation onto a US
   hull AND put a 1982 warhead on a 1967 boat. The plain name is correct for
   both; gbr_e60_ssbn's own desc already tells the Chevaline story. */
if (WEAPONS.slbm_polaris) WEAPONS.slbm_polaris.name = "Polaris A3";

/* ---- present-day boats, by navy ----
   Era hulls are refitted in eras.js, because they do not exist yet here. */

/* pact: the Kilo gets the round B-237 Rostov-na-Donu really fired, appended
   rather than prepended because the torpedo is correctly this boat's primary
   weapon and generations.js rewrites weapons[0] when it clones. The Oscar
   trades a P-800 Oniks it never carried for the P-700 Granit it was built
   around - and with it loses the ability to engage anything ashore, which is
   the accurate answer rather than a gap. */
if (UNITS.sub_p)  UNITS.sub_p.weapons  = ["torp_ugst", "tlam_p"];
if (UNITS.ssgn_p) { UNITS.ssgn_p.weapons = ["torp_ugst", "ssm_granit"];
                    UNITS.ssgn_p.magazine = { ssm_granit: 24 }; }

/* gbr: the Astute's own desc has always said "Spearfish, Tomahawk out of the
   same tubes" and the weapon list had one torpedo. */
if (UNITS.sub_b)  UNITS.sub_b.weapons  = ["torp_spearfish", "tlam_b"];

/* fra: sub_f's desc has claimed MdCN since it was written - "which makes
   France the second country in the world with a submarine land-attack missile
   of its own design". The missile is real and this row supplies it. The
   ordinal in that desc is not: the United States had Tomahawk at sea in 1983
   and the Soviet Union the indigenous RK-55 Granat from 1984, so France is
   third at best. Left as prose for the owner to cut rather than silently
   rewritten here. */
if (UNITS.sub_f)  UNITS.sub_f.weapons  = ["torp_f21", "tlam_f"];


/* ==================================================================
   ERAS

   The game can be fought in any of six periods from the early Cold War
   to the present. A unit declares a SERVICE WINDOW rather than a single
   era, because the interesting fact about a lot of this equipment is how
   long it stayed in the field: a T-55 or a B-52 spans five decades, and
   pretending it belongs to one of them would lose that.

     from   first era the platform is available in
     to     last era it is still fielded (omitted = still in service)

   Anything with no window at all is treated as present-day only, so an
   untagged unit can never leak into a 1950s battle by accident.
   ================================================================== */
var ERAS = ["e50", "e60", "e80", "e90", "e00", "e20"];
var ERA_INFO = {
  e50: { name: "1950s",      full: "Early Cold War",   tag: "jets, first guided missiles, WWII holdovers" },
  e60: { name: "1960s-70s",  full: "Cold War",         tag: "ATGMs arrive, SAMs mature, helicopters go to war" },
  e80: { name: "1980s",      full: "Late Cold War",    tag: "thermal sights, composite armour, fourth-generation fighters" },
  e90: { name: "1990s",      full: "Gulf War era",     tag: "GPS, precision munitions, the first true stealth" },
  e00: { name: "2000s-10s",  full: "Networked warfare", tag: "datalinks, AESA radar, unmanned systems" },
  e20: { name: "2020s",      full: "Present day",      tag: "the roster the game ships with" },
};
function eraIndex(k) { var i = ERAS.indexOf(k); return i < 0 ? ERAS.length - 1 : i; }

/* Is this definition fielded in the given era? */
function inEra(def, era) {
  if (!def) return false;
  var cur = eraIndex(era);
  var from = def.from !== undefined ? eraIndex(def.from) : ERAS.length - 1;
  var to = def.to !== undefined ? eraIndex(def.to) : ERAS.length - 1;
  return cur >= from && cur <= to;
}

/* Everything already in the roster is present-day equipment unless the era
   content below says otherwise. Support units that have no meaningful
   generational identity - a bulldozer, a fuel truck, a construction rig -
   are available throughout, because every army has always had them.

   WHAT WENT WRONG HERE, recorded so it is not repeated. Not one unit in this
   file was written with a from: tag, so the loop underneath is the only thing
   that dates any of them, and its default is "e20". Where eras.js supplies
   proper per-era variants that is harmless - unitFor() picks the era unit and
   the present-day one surfaces only in the 2020s. Where eras.js supplies
   nothing, the role simply vanished from five of the six periods. Measured at
   runtime before this change, a NATO commander could field 58 roles in e20,
   40 in e90, 39 in e80, 37 in e60 and 33 in e50: twenty-five of fifty-eight
   missing from the earliest setting, and every faction worse - the PLA had 24
   roles in e50 against 53 in e20. A 1980s battle had no mortars, no
   machine-gun teams, no snipers, no medics, no recovery vehicles, no radar or
   EW vehicles, no patrol boats and no fleet oiler. That is not a period
   difference; it is a set of missing mechanics, and it amputated the game's
   headline feature in five of its six settings.

   THE TEST FOR THIS LIST. A role belongs here only if the capability ran the
   whole length of the game in every one of the five armies AND the
   generational difference does not survive the zoom. The seven added below
   pass it. An 81mm mortar section, a belt-fed machine-gun team, a sniper
   pair, a company aidman, an armoured recovery vehicle, a fleet workshop and
   a fast gun-armed inshore boat were all in the hands of all five of these
   armies in 1950 and are all still there today: between an M1 mortar and an
   M252 there is a few hundred metres of range and a round a minute, between
   an M32 on a Sherman hull and an M88A2 there is winch tonnage, and between a
   Project 183 and a Mk VI there is a diesel. One honest caveat: the
   present-day sniper units are 12.7mm anti-materiel rifles and that weapon
   class really is late (Barrett M82, 1989) - what is being dated here is the
   role, one team that removes individuals at distance and carries the best
   eyes on the field, not the rifle. Denying every 1950s army a sniper is the
   larger error by a wide margin.

   WHAT DOES NOT BELONG HERE. Where a capability genuinely arrives at a date -
   an ATGM carrier, a ground jammer, a ballistic-missile submarine, a
   counter-battery radar, a fleet oiler for four of the five navies - the unit
   carries an explicit from: instead, because a stealth bomber in Korea is the
   same mistake as no mortars in 1985, only louder. And where an army never
   had the thing at all, it gets nothing: the KPA has no destroyer, no AWACS
   and no carrier fighter in any era, Taiwan has no ballistic missile and no
   ground jammer, and those gaps are content, not defects to be patched. */
var ERA_TIMELESS = ["harvester", "mcv", "engineer", "supply", "transport_sea",
                    "minelayer", "mineclear", "navminelayer", "minesweeper",
                    "mortar", "mg", "sniper", "medic", "repair", "repair_sea",
                    "patrol"];
for (var _eu in UNITS) {
  var _e = UNITS[_eu];
  if (_e.from !== undefined) continue;
  if (ERA_TIMELESS.indexOf(_e.role) >= 0) { _e.from = "e50"; continue; }
  _e.from = "e20";
}
for (var _eb in BUILDINGS) {
  var _bb = BUILDINGS[_eb];
  /* `eraStamped` marks a structure that was given a date it never earned, and
     G.genContest() reads it. Without the mark the contest was measuring every
     jammer in the game against a fabricated 1950 service date: an e80 jamming
     vehicle scored 1.7^3 = 4.91x against a radar dome, a SAM site or an
     airbase, because this loop had told it they were all built in 1950. A
     structure that carries a real `from` - the strategic arrays and the fixed
     jamming sites below are the first that do - is not marked and is contested
     honestly. */
  if (_bb.from === undefined) { _bb.from = "e50"; _bb.eraStamped = true; }
}

/* ==================================================================
   OFF-MAP FIRE SUPPORT

   Missions flown or fired from outside the battlefield. They cost FUEL
   rather than cash, because what you are buying is somebody else's
   sortie or somebody else's magazine, and fuel is the resource a player
   has to take ground to get.

     oil       barrels per mission
     cooldown  seconds before it can be called again
     flight    seconds between the call and the first impact
     rounds    impacts in the mission - a battery fires a pattern
     cep       nominal scatter in tiles, multiplied up when called blind
     blindMul  how badly it scatters with no observation: a cruise missile
               navigating itself barely cares, unguided rockets very much do
   ================================================================== */
var SUPPORT = {
  /* ---- off-map fire support: REMOVED at the owner's request ----
     Fourteen powers used to live here - Arc Light, MLRS time-on-target,
     Tomahawk and CJ-10 salvos, an AC-130 loiter, Tochka, Grad, Koksan and the
     rest - fired from outside the map, paid for in fuel rather than cash, on a
     cooldown.

     The table is kept and left EMPTY rather than deleted outright, because
     every consumer already handles the empty case correctly and none of them
     needs editing: ui.js builds the support tab by iterating this object, so
     it now yields no cards; ai.js iterates it the same way and calls nothing;
     and G.supportReady in game.js already opens with `if (!m) return "NO SUCH
     MISSION"`. Emptying it therefore removes the feature at one site instead
     of unpicking fifteen.

     It also closes a report the owner made earlier: being hit by what looked
     like a silo strike from an enemy that had no silo. A Tomahawk or CJ-10
     salvo needed only a radar to call, arrived with 290-300 damage over a
     1.6-tile area, and read exactly like a superweapon to the player on the
     receiving end. With these gone, a strategic strike now always means an
     actual Strategic Silo standing on the map.

     To restore them, revert this commit - the definitions are in git. */
};
for (var _sp in SUPPORT) { SUPPORT[_sp].id = _sp; SUPPORT[_sp].cat = "support"; }

/* ---- ammunition carried ----
   Indirect fire and heavy launchers carry a finite number of rounds. A gun
   that has shot off its ready rounds is not destroyed, it is simply out of
   the fight until somebody brings it more - which is what makes a supply
   line worth attacking and worth defending. Direct-fire weapons are not
   modelled this way: a tank carries enough main gun rounds for a battle. */
var ROUNDS = {
  spg: 14, mlrs: 8, mortar: 18, atgmv: 10, heavy: 0,
};
for (var _ru in UNITS) {
  var _r = UNITS[_ru];
  if (_r.rounds !== undefined) continue;
  var n = ROUNDS[_r.role];
  if (n) _r.rounds = n;
}
/* a supply truck or a service depot replenishes them */
if (BUILDINGS.depot) BUILDINGS.depot.resupply = true;

/* ---- garrisonable structures ----
   A civilian building on built-up ground can be occupied by infantry, who
   then fight from inside it with real protection and a better view. Clearing
   them out needs something that can burn or blast the structure rather than
   shoot at the men in it - which is what makes a town expensive to take. */
Object.assign(BUILDINGS, {
  /* The wreck a civilian block leaves behind. It still blocks the ground and
     still gives cover, but nobody can fight from it until an engineer has put
     a roof back on. */
  civrubble: { name:"Collapsed Block", cat:"civilian", cost:0, time:0, w:2, h:2, hp:260,
    armor:"structure", power:0, sight:2, neutral:true, rubble:true, restoresTo:"civblock",
    from:"e50",
    desc:"What is left after the building came down. It blocks the street and " +
         "gives cover to anyone crouching behind it, but it cannot be occupied. " +
         "Send an engineer to make it habitable again." },
  civblock: { name:"Civilian Block", cat:"civilian", cost:0, time:0, w:2, h:2, hp:900,
    armor:"structure", power:0, sight:6, neutral:true, garrison:5, from:"e50",
    desc:"An ordinary building somebody used to live in. Infantry can occupy it and " +
         "fight from the windows: small arms barely touch them in there, but fire or " +
         "high explosive brings the whole thing down on top of them." },
});

/* Index units by role for the AI and for faction filtering.
   Rebuildable, because the era rosters in eras.js are merged into UNITS after
   this file has already run - without a re-index none of them would exist as
   far as unitFor() is concerned. */
var ROLES = {};
/* ---------------------------------------------------------------------------
   Capabilities an army did not actually have
   ---------------------------------------------------------------------------
   The era rosters record honest gaps: the PLA had no airborne early warning
   aircraft before the KJ-2000, the Soviet Union never fielded a low-observable
   fighter, Russia laid down no new destroyers in the 2000s. Those gaps were
   written into the tables as placeholder entries named "NONE".

   A placeholder must not be purchasable. Left in the roster it becomes a real
   unit with a real price, so an army could buy the very capability it is
   recorded as lacking. They are deleted instead, which makes unitFor() fall
   through to whatever older equipment is still in service — or return nothing
   at all, which is the correct answer when the army simply had none.        */
function isPhantomUnit(def) {
  if (!def) return false;
  /* Strip surrounding parentheses before testing. A roster author writing a
     gap naturally writes "(none)" or "(effectively none)", and neither form
     matched: three placeholders survived the purge and were BUYABLE - a
     645-credit US light tank whose own full name is "No US light tank in
     service after 1996", a 1,290-credit missile boat reading "No US Navy
     missile craft after 1993", and a 950-credit air-defence vehicle for the
     "US Army short-range air defence gap, roughly 1994-2021". The data had
     recorded those gaps correctly and the game sold them anyway. */
  var n = String(def.name || "").trim().toLowerCase().replace(/^\((.*)\)$/, "$1").trim();
  if (n === "none" || n === "n/a" || n === "nil" || n === "-" || n === "\u2014") return true;
  /* "none new", "none in service", "none operational", "effectively none" */
  if (/^none\b/.test(n) || /^(effectively|essentially|virtually|practically)\s+none\b/.test(n)) return true;
  var f = String(def.full || "").trim().toLowerCase().replace(/^\((.*)\)$/, "$1").trim();
  if (f === "none" || /^no\s+(soviet|chinese|russian|operational|such)\b/.test(f)) return true;
  /* "No US light tank in service after 1996" - the nation is the subject, so
     the earlier list of adjectives could never cover every army. Match the
     shape instead: "no <anything> in service / after / since / between". */
  if (/^no\b.*\b(in service|after \d{4}|since \d{4}|between \d{4})/.test(f)) return true;
  if (/\bgap\b.*\d{4}/.test(f)) return true;
  return false;
}

function purgePhantomUnits() {
  var gone = [], k, i;
  for (k in UNITS) {
    if (!Object.prototype.hasOwnProperty.call(UNITS, k)) continue;
    if (isPhantomUnit(UNITS[k])) { gone.push({ id: k, def: UNITS[k] }); }
  }
  for (i = 0; i < gone.length; i++) delete UNITS[gone[i].id];

  /* "No new destroyers" is not the same as "no destroyers". Where an army
     already fielded this capability in an earlier period, the placeholder
     only recorded a pause in procurement, so the previous generation stays
     in service instead of vanishing. Where there is nothing earlier, the
     army genuinely never had it and the gap is left open. */
  for (i = 0; i < gone.length; i++) {
    var g = gone[i], best = null, bestFrom = -1;
    for (k in UNITS) {
      if (!Object.prototype.hasOwnProperty.call(UNITS, k)) continue;
      var u = UNITS[k];
      if (u.role !== g.def.role) continue;
      if (u.fac !== g.def.fac && u.fac !== "both") continue;
      var f = u.from !== undefined ? eraIndex(u.from) : 0;
      if (f >= eraIndex(g.def.from)) continue;          // not earlier
      if (f > bestFrom) { bestFrom = f; best = u; }
    }
    if (!best) continue;                                 // never had one
    var need = eraIndex(g.def.from);
    var have = best.to !== undefined ? eraIndex(best.to) : ERAS.length - 1;
    if (have < need) best.to = ERAS[need];
  }
  return gone.map(function (x) { return x.id; });
}

function reindexRoles() {
  purgePhantomUnits();
  ROLES = {};
  for (var _k in UNITS) {
    var _u = UNITS[_k]; _u.id = _k;
    /* Every rotorcraft must carry the hover flag. Seven anti-submarine
       helicopters - the Seahawk, the Ka-27 Helix, the Z-9C and the Thunderhawk
       among them - were missing it, which mattered in three places at once:
       they were refused an escort's flight deck, they were put on the
       fixed-wing fuel clock, and they were given a landing-run capture radius
       instead of a hover one. Deriving it from the role means a new rotary
       unit cannot be added without it again. */
    if (_u.cat === "aircraft" && !_u.hover &&
        /gunship$|^transport$|aswhelo|scouthelo|heavylift/.test(_u.role || ""))
      _u.hover = true;
    /* The same omission one field over: an ASW helicopter exists to fly from a
       deck, but only the four hand-written ones carry the flag - the
       era-generated airframes do not, which shuts them out of a carrier. */
    if (_u.cat === "aircraft" && !_u.carrierCapable && /aswhelo/.test(_u.role || ""))
      _u.carrierCapable = true;
    (ROLES[_u.role] = ROLES[_u.role] || []).push(_k);
  }
  for (var _b in BUILDINGS) BUILDINGS[_b].id = _b;
  for (var _w in WEAPONS) WEAPONS[_w].id = _w;
  return ROLES;
}
reindexRoles();

/* returns the unit id a faction fields for a given role */
/* The era a battle is being fought in. Set by Game.init from the setup
   screen; defaults to the present so anything that does not care still
   behaves exactly as it did before eras existed. */
var CUR_ERA = "e20";
function setEra(e) { CUR_ERA = (ERAS.indexOf(e) >= 0) ? e : "e20"; }

/* Returns the unit id a faction fields for a role IN THE CURRENT ERA.
   Where a faction fielded several generations of the same role, the newest
   one available is chosen - which is what an army would do. */
function unitFor(fac, role, era) {
  var e = era || CUR_ERA;
  var list = ROLES[role] || [];
  var best = null, bestFrom = -1;
  for (var i = 0; i < list.length; i++) {
    var u = UNITS[list[i]];
    if (u.fac !== fac && u.fac !== "both") continue;
    if (!inEra(u, e)) continue;
    var f = u.from !== undefined ? eraIndex(u.from) : 0;
    if (f > bestFrom) { bestFrom = f; best = list[i]; }
  }
  return best;
}
/* every id a faction can field for a role in this era, newest last */
function unitsFor(fac, role, era) {
  var e = era || CUR_ERA;
  var list = ROLES[role] || [], out = [];
  for (var i = 0; i < list.length; i++) {
    var u = UNITS[list[i]];
    if ((u.fac === fac || u.fac === "both") && inEra(u, e)) out.push(list[i]);
  }
  return out;
}

/* ---- the structure a faction uses for a job, in this period ----
   unitFor() answers this for UNITS off the ROLES index. Structures never needed
   it: all twenty-eight of them were available to every army in every era, so
   nothing ever had to choose. The strategic early-warning array and the fixed
   jamming site are the first that are not - they carry `fac` and a real `from`,
   and something has to pick Taiwan's PAVE PAWS rather than NATO's, and the
   Murmansk-BN rather than the SPN-4 beside it. Returns null far more often than
   it returns a string, and null is the correct answer rather than a gap to fill:
   there is no North Korean early-warning array, no Chinese one before the 2000s
   and no Taiwanese one before 2013. Linear over BUILDINGS on purpose - the table
   is thirty-eight entries and this is read a few times a minute by one
   commander, not once a frame by all of them. */
function structureFor(fac, srole, era) {
  var e = era || CUR_ERA, best = null, bestFrom = -1;
  for (var k in BUILDINGS) {
    var b = BUILDINGS[k];
    if (b.srole !== srole) continue;
    if (b.fac !== undefined && b.fac !== "both" && b.fac !== fac) continue;
    if (!inEra(b, e)) continue;
    var f = b.from !== undefined ? eraIndex(b.from) : 0;
    if (f > bestFrom) { bestFrom = f; best = k; }
  }
  return best;
}

/* ---- advancing a generation ----
   A commander can re-equip mid-battle, moving the whole force one period
   forward. It is expensive in cash, fuel and time - re-equipping an army is
   supposed to be a serious commitment - and it gets dearer each step, so
   starting in 1950 and racing to the present is a real investment rather
   than a formality. Units already built are not retro-fitted: what changes
   is what the factories will produce from now on. */
var ERA_STEP = {
  e50: { cost: 2600, oil: 60,  time: 42 },
  e60: { cost: 3200, oil: 75,  time: 48 },
  e80: { cost: 3900, oil: 95,  time: 54 },
  e90: { cost: 4600, oil: 115, time: 60 },
  e00: { cost: 5400, oil: 140, time: 66 },
};
/* ---- who can actually re-equip ----
   Advancing a generation assumes an army that procures new equipment. Not
   every army does. North Korea's ground and air forces are still built around
   1960s Soviet designs and it cannot buy replacements; Taiwan can buy, but
   only what the United States is willing to sell and only slowly; the Russian
   ground forces re-equip in fits and starts. So the cost of advancing is not
   the same for everyone, and the KPA in particular is capped short of the
   present day however much money it makes. */
var ERA_REACH = {
  nato: { cap: "e20", costMul: 1.00 },
  pla:  { cap: "e20", costMul: 1.00 },   // the fastest modernisation of the five
  roc:  { cap: "e20", costMul: 1.45 },   // can buy, but pays dearly and waits
  pact: { cap: "e20", costMul: 1.25 },   // uneven procurement, long gaps
  kpa:  { cap: "e90", costMul: 1.90 },   // cannot buy replacements at all
  gbr:  { cap: "e20", costMul: 1.30 },   // buys the best, in tiny numbers, slowly
  fra:  { cap: "e20", costMul: 1.15 },   // sovereign industry, and it keeps building
  deu:  { cap: "e20", costMul: 1.35 },   // the slowest procurement of the four
};

function nextEra(k) {
  var i = ERAS.indexOf(k);
  return (i >= 0 && i < ERAS.length - 1) ? ERAS[i + 1] : null;
}
