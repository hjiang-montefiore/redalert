/* ============ ai.js — the computer opponent ============
   A utility-driven commander with three loops:
   ECONOMY  : expand power/refineries/derricks, keep harvesters replaced
   TECH     : climb tech tree, buy upgrades when rich
   MILITARY : defend base, scout, then assemble combined-arms strike packages
              (armour + AA escort + supply truck; naval groups; air sorties)   */
var AI = (function () {
  const PERSONALITY = {
    balanced: { name: "Combined Arms", mods: {} },
    turtle:   { name: "Fortress",  mods: { waveTime: 999, waveSize: 30, aggro: 0.35,
                                           defenceBias: 3.0, techBias: 1.2 } },
    rusher:   { name: "Shock",     mods: { waveTime: 55, waveSize: 6, aggro: 2.2,
                                           defenceBias: 0.3, techBias: 0.6, earlyRush: true } },
    airpower: { name: "Air Doctrine", mods: { airBias: 3.0, defenceBias: 0.8, techBias: 1.3 } },
    naval:    { name: "Blue Water",  mods: { navalBias: 3.0, aggro: 1.2 } },
    artillery:{ name: "Gun Line",    mods: { artyBias: 3.0, defenceBias: 1.6, aggro: 0.8 } },
    boomer:   { name: "Industrial",  mods: { econBias: 2.5, waveTime: 190, techBias: 1.5 } },
  };
  const PERSONALITY_LIST = Object.keys(PERSONALITY);
/* ================= what the published tables say about a defence ==========
   A Machine-Gun Nest's card is in the player's sidebar, so deriving a
   commander's opinion of an emplacement from BUILDINGS[key] and WEAPONS[] is
   not a peek at anybody's object list - it is the recognition manual, and it
   is the same manual the human reads. These tables therefore live at module
   level and are shared between commanders: they are derived from static data
   only, and carry no picture, no positions and nothing that belongs to one
   commander's eyes.

   Nothing on this side has ever read them, and three facts fall straight out
   of them, every one of which decides a battle:

     - flak and sam declare tgt.ground = 0. They cannot shoot at a tank AT
       ALL. A player who rings a refinery with SAM sites has spent 1,500
       credits each on something a ground wave should walk straight past, and
       a commander that routed around them would be wrong. It is invisible
       unless you read WEAPONS.tgt.
     - coast_gun and bunker_how carry minRange 2.0 and 4.5 tiles. Inside it
       they are dead. Closing with a howitzer emplacement is not bravado, it
       is what the weapon table says.
     - the ranges are not comparable - nest 6.0, at_gun 7.5, coast_gun 13.5,
       bunker_how 16.0 - so a threat field built on one flat radius would be
       wrong by a factor of seven in area. Read live and never transcribed:
       generations.js rewrites the range table per faction and per era, so a
       figure copied into this file would be wrong the moment either moved.

   Two damage figures are kept, never one, because CFG.DMG has no single
   answer to "is this dangerous". nest_mg is bullet: 1.00 against infantry,
   0.06 against heavy. at_gun is cannon: 0.35 and 0.95. A field that averaged
   them would tell the commander a line of nests was worth going round, which
   is the exact opposite of the truth for armour. Structures are exempt from
   the penetration model - resolveArmor() returns null for anything that is
   not a vehicle - so no aspect or penetration term is needed here.

   `reach` is the listed range and decides whether we can outrange the
   position; `range` carries a 15% margin because the enemy's faction range
   multiplier and their optics upgrade are not things we can honestly know,
   and it is the figure the threat field is stamped with.                  */
const GUNS = {};
function gunProfile(key) {
  if (GUNS[key] !== undefined) return GUNS[key];
  const def = BUILDINGS[key];
  let g = null;
  if (def && def.weapons) for (const wk of def.weapons) {
    const w = WEAPONS[wk];
    if (!w || !w.tgt || !w.tgt.ground) continue;      // an AA mount is not in this war
    if (!g) g = { reach: 0, range: 0, minRange: 1e9, hard: 0, soft: 0,
                  cold: !!def.needPower };
    const cyc = Math.max(0.5, (w.reload || 2) + (w.burst || 1) * (w.burstDelay || 0));
    const dps = (w.dmg || 0) * (w.burst || 1) *
                (w.acc === undefined ? 0.7 : w.acc) / cyc;
    if (w.range > g.reach) g.reach = w.range;
    g.range = Math.max(g.range, w.range * 1.15);
    g.minRange = Math.min(g.minRange, w.minRange || 0);
    g.hard += dps * CFG.dmgMult(w.warhead, "heavy");
    g.soft += dps * CFG.dmgMult(w.warhead, "infantry");
  }
  if (g && g.minRange > 1e8) g.minRange = 0;
  GUNS[key] = g;
  return g;
}
/* the same emplacement priced against the force we have actually built */
function siteDps(key, hardShare) {
  const g = gunProfile(key);
  return g ? g.hard * hardShare + g.soft * (1 - hardShare) : 0;
}
/* Is this a defence some power plant is holding up? entities.js only lets a
   structure engage while `powered`, and powered is !needPower || the owner's
   grid is whole - and sam and the two silos are the only structures in the
   game that declare needPower. A SAM belt is a lodger on the enemy grid, and
   that is worth more to a commander than any amount of shooting at it. */
function coldableGun(key) {
  const d = BUILDINGS[key];
  return !!(d && d.needPower && d.weapons && d.weapons.length);
}
/* ---- the same recognition manual, for the airspace ----
   gunProfile() above deliberately throws away every weapon whose tgt.ground
   is 0, because a SAM site is not in a tank's war. It is very much in a
   tanker's. sam_site declares tgt:{ground:0,air:1,sea:0,sub:0} at range 14.0
   and aa_battery the same at 9.0, so the threat field the wave reads has a
   hole in it EXACTLY the shape of the enemy's air defence - exposureAt() over
   a Patriot returns zero, confidently and without an error. Anything that
   sites an aircraft off that field is siting it inside the envelope it was
   trying to avoid, and reporting the ground as clear while it does so.

   This is the other half of the same static table: published range, published
   target set, read live because generations.js rewrites the range figures per
   faction and per era. Only the REACH is kept - a tanker does not need to know
   how hard it would be hit, only that it would be. The 1.15 margin is
   gunProfile's and is here for the same reason: their range multiplier and
   their optics are not things we can honestly know.                        */
const AAG = {};
function aaProfile(key) {
  if (AAG[key] !== undefined) return AAG[key];
  const def = BUILDINGS[key];
  let reach = 0;
  if (def && def.weapons) for (const wk of def.weapons) {
    const w = WEAPONS[wk];
    if (!w || !w.tgt || !w.tgt.air) continue;
    if (w.range > reach) reach = w.range;
  }
  AAG[key] = reach ? reach * 1.15 : 0;
  return AAG[key];
}

/* ---- what an objective is worth, and why that is not its price tag ----
   The old scorer valued a structure at cost/400 plus Threat.tierOf * 2 - and
   tierOf grades a BUILDING on cost as well, because nothing in its NAMED
   table is a structure and the only structural test it makes is
   def.superweapon. Both halves of the expression were the same number counted
   twice. That is why the wave reliably marched at a 3,500-credit Missile Silo
   in the middle of a defended base and walked past the 1,500-credit Ore
   Refinery on the edge of it.

   Worth here is what REMOVING it costs the enemy over the next few minutes:
     refinery  every hauler still alive is now driving to nowhere, and 2,500
               of storage goes with it
     conyard   nothing they lose from this point is ever replaced
     factory   the armour that would have met the next wave is not built
     derrick   0.55 barrels a second forever, and every era step is gated on
               oil, so a derrick is a generation of equipment
     power     see the plant bonus in objectives(): the SAM belt is a lodger
     silo      storage only. Spilling a bank we cannot spend is not a war aim.
   A defence scores a fraction of its cost, because emplacements are the PRICE
   of an objective and not an objective: a commander that hunts anti-tank guns
   for their own sake is being led round the map by them.

   Hand-authored, and it covers the structure ids in rules.js plus the two
   strategic silos. Anything added later falls to 250 - safe, but silently
   wrong for a new production building until somebody adds a line here.    */
const WORTH = {
  conyard: 2400, refinery: 2600, factory: 1500, derrick: 1400,
  missilesilo: 2400, nukesilo: 2600, airbase: 1200, navalyard: 1000,
  lab: 800, barracks: 700, radar: 700, power: 500, depot: 350,
  silo: 150, sonararray: 200,
  /* A structure with no gun would fall through worthOf() to 250, or - for a
     cat:"defense" entry - to 40% of its cost, and price the enemy's entire
     electronic defence somewhere below a service depot. What it actually costs
     them to lose it is the electronic defence of their whole base, or, for the
     KPA station, everybody's precision missions. It is also already the thing
     a SEAD shooter steers toward, so the raid planner should agree with the
     shooter rather than argue with it. Kept at or just under the radar dome's
     700 for the jamming sites, because a station that can only defend its own
     ground is worth less to kill than the radar that sees yours - and well
     above it for the arrays, which are the most expensive structures in the
     game and blind a theatre when they die. */
  lpar_n: 2400, lpar_p: 2400, lpar_c: 2400, lpar_r: 2400,
  ewsite_p: 800, ewsite_c: 750, ewsite_n: 600, ewsite_r: 550,
  ewsite_p2: 900, ewsite_k: 650,
};
function worthOf(key) {
  if (WORTH[key] !== undefined) return WORTH[key];
  const def = BUILDINGS[key];
  if (def && def.cat === "defense") return (def.cost || 400) * 0.4;
  return 250;
}

/* Which arm of service a sighting belongs to. The `armor === "heavy"` test in
   front of this table is what covers a role nobody has added here yet: an
   unrecognised tank is still counted as armour, which is the case that
   matters. A new artillery or air-defence role would be miscounted as light
   until the table is updated. */
const ROLE_ARM = {
  rifle: "inf", mg: "inf", at: "inf", aa: "inf", sniper: "inf",
  engineer: "inf", medic: "inf",
  mortar: "arty", spg: "arty", mlrs: "arty", tel: "arty",
  mbt: "armour", heavy: "armour",
  ifv: "light", lighttank: "light", recon: "light", tankdestroyer: "light",
  spaag: "light", radarv: "light", ewveh: "light", supply: "light",
  repair: "light", mcv: "light", minelayer: "light", mineclear: "light",
};

/* Each opponent gets its own closure — the module used to be a singleton,
   which capped the game at exactly one AI.                                */
function makeCommander() {
  let G, P, D;
  let thinkT = 0, waveT = 0, scoutT = 0;
  let attackWave = [];           // units committed to current push
  let navalWave = [];
  let phase = "build";           // build -> mass -> attack
  let groundConnected = true;    // false on sea-split theatres (Taiwan!)
  let amphib = { state: "idle", lsts: [], beach: null, staging: null };

  /* ================= what this commander actually knows =================
     Everything below exists because the commander used to read the enemy's
     object lists directly - every building, every unit, every submerged
     boat, from the first tick, through fog, across the whole map. That is
     the largest advantage the computer had over the player and it was
     invisible: no message, no menu option, nothing to turn off.

     In its place: a picture, built only from what this commander's own
     sensors have touched, and remembered afterwards the way a staff map is
     remembered - a structure stays on the map until somebody looks again and
     finds it gone; a vehicle sighting rots quickly, because vehicles move.

     All of it lives in the closure, never in the module. Two commanders on
     opposite sides sharing one picture would be a worse cheat than the one
     being removed.                                                        */
  let look = null;               // tile -> game time/4 when last overlooked, 0 never
  let seenB = new Map();         // building id -> remembered structure
  let seenU = new Map();         // unit id     -> remembered vehicle sighting
  let dossier = [];              // per enemy index: what arms they are known to field
  let alarms = [];               // where our own things have been shot at lately
  /* ---- reading the ground, and remembering what it cost ----
     Everything the wave needs in order to stop using the same road, and
     everything the composition block needs in order to stop rolling dice. It
     lives in the closure with the rest of the picture for exactly the same
     reason: two commanders sharing one threat field would be sharing one set
     of eyes, which is the cheat the picture was written to remove.

     There is ONE threat field. It is rebuilt inside intelSweep, version-gated
     so an ordinary sweep costs a single integer compare, and it is read by the
     approach chooser, the objective scorer and the beach chooser alike. Three
     separate fields would have been three chances to disagree about the same
     anti-tank gun. */
  const GUN_CELL = 4;            // tiles per threat cell: 36x36 over a 144 map
  let gunHard = null, gunSoft = null;   // fire per second on a point, by armour
  let gunW = 0, gunH = 0, gunVer = -1;  // gunVer: the plot revision they were built from
  let seenVer = 0;               // bumped whenever a STRUCTURE enters or leaves the plot
  let graves = [];               // where waves of ours have died. the mirror of alarms
  let lastAxes = [];             // the bearings the last few waves went in on
  let lastAimId = null;          // ...relative to which objective
  let siegeAt = null;            // the emplacement the guns are currently taking apart
  let siegeNeed = 0;             // when we last wanted tube artillery and had none
  let armsCache = null, armsT = -1e9;   // the other side's order of battle, memoised
  let survey = null, surveyT = -1e9;    // the plot, priced
  const aimShy = new Map();      // objective id -> the time it may be tried again
  let aimRvT = -1;               // warAim's review is memoised on the game tick
  let waveBook = null;           // hit points the current wave was committed with
  let oreSites = null;           // where the ore is, surveyed once
  const roleCool = {};           // role -> time a role this era cannot field may be re-asked
  let intelT = 0, lastDigest = 0;
  let hypo = [];                 // unexamined start positions: where they might be
  let aim = null;                // the objective currently being fought for
  /* ---- logistics, recovery and mine warfare ----
     Three doctrines' worth of memory, and every one of these lives in the
     closure for the same reason the picture does: two commanders sharing one
     fuel-break estimate, one repair ledger or one minefield report would be
     sharing one set of eyes and one set of books.

     fuelBreak is the only one that is an ESTIMATOR rather than a record. It is
     the share of our own airborne, refuelable jets that are on an rtb or tank
     order with ordnance still aboard - i.e. broke off for fuel and not for
     being empty - smoothed across think ticks. Counting the events properly
     would need a per-airframe flag and bookkeeping in entities.js; the
     instantaneous time-share is the same number for one pass over units we
     already walk, and it leaves the engine alone.

     mineSigns is the mirror of `graves` for a weapon that leaves no shooter:
     places where our own vehicles were hurt by nothing at all. raidHeat is the
     evidence that bearing() is answering from real alarms rather than falling
     through to intelHome() - which is the difference between a belt across a
     road they use and 700 credits of scrap in an empty field.               */
  let fuelBreak = 0;             // EWMA of fuel-driven, ordnance-aboard break-offs
  let logiT = 0, logiOrbit = null;      // the tanker's orbit, re-priced every 5s
  let ledger = null, ledgerT = -1e9;    // the repair ledger, memoised 2s
  let arvHave = 0, arvLostT = -1e9;     // recovery vehicles held, and when one was lost
  let mineSigns = [];            // inferred minefields: {x,y,t,n,sea}
  let raidHeat = 0, raidT = 0;   // decayed count of our own things shot near home
  /* Enemy GROUND VEHICLES we have actually classified, decayed on the clock.
     The mine doctrine used to test foeArms().sArmour + sLight >= 0.35, which
     is an INSTANTANEOUS share of what is in sight right now. Measured over a
     25-minute Elite game that test held 1% of the time, because seenU empties
     the moment contact goes stale and a share of nothing is zero - so the
     whole doctrine never ran. What the rule actually wants to know is not
     "is a tank in front of me this second" but "does this enemy attack me
     with things a mine can kill", which is a property of the campaign and
     belongs in memory. Same 180s half-life as raidHeat, and it counts only
     what Mines.threatens() would touch. */
  let foeVeh = 0, foeVehT = 0;
  let mineNext = 0;              // the mine doctrine reconsiders on its own clock
  let knownM = null, knownMT = -1e9;    // hostile mines we are entitled to see
  const NO_MINES = [];
  const MINE_MEM = 24;           // signatures kept, oldest dropped
  const BELT_R = 10;             // tiles from home the belt is laid; derived in gapSector
  const ARV_RATE = 26, TENDER_RATE = 30, CONTACT = 0.35;

  /* Six commands, from a garrison unit that mostly digs in to a theatre
     command that techs fast, screens with radar and reaches for the silo.   */
  /* ---- what a difficulty actually buys ----
     Not money. Every commander now earns exactly what its haulers bring in,
     under the same rules the player plays by, so the six settings have to
     differ in how WELL the war is run rather than in how much of it is paid
     for out of thin air:

       think     seconds between decisions - a Recruit reconsiders every 3.6s,
                 a Warlord four times as often
       react     how long trouble has to be happening before the reserve moves
       memory    how many seconds of stale reporting it is still willing to act
                 on, so a poor commander is not merely slower but wronger
       scouts    how many pairs of eyes it keeps out, and how often it re-tasks
       repairAt  the damage level at which it starts mending its own buildings
       micro     manoeuvre, already read by the flanking code
       read      how much of the picture it acts on. Zero means it prices no
                 defence, never besieges, never writes an objective off and
                 builds the standing mixture whatever it is looking at - a
                 Recruit blunders forward exactly as before. It scales
                 analysis, never sensors: every tier reads the same plot with
                 the same code and differs only in how much of it it believes
       air/navy  whether it fields early warning and anti-submarine aircraft

     All of them only ever REMOVE capability going down the table; nothing here
     gives a commander something a human could not do. */
  /* `air` and `navy` gate the airborne-early-warning and anti-submarine
     programmes. Both were read in think() and declared on no tier at all, so
     for the life of the game no commander ever bought an AWACS or an ASW
     helicopter - the two capabilities that make an air force see and a fleet
     hunt. They are off at Recruit, and the navy comes in one tier before the
     air arm because a blind fleet loses hulls faster than a blind air force
     loses airframes. */
  const DIFF = {
    recruit:  { waveTime: 260, waveSize: 4,  aggro: 0.45, rebuild: 0.4,
                think: 3.6, react: 9.0, econ: 0.7, memory: 30,  scouts: 1, scoutT: 70, repairAt: 0.00,
                tech: 0.6, radar: false, stealth: false, superweapon: false, micro: 0.2, read: 0,
                air: false, navy: false },
    regular:  { waveTime: 200, waveSize: 7,  aggro: 0.8,  rebuild: 0.8,
                think: 2.8, react: 6.5, econ: 0.85, memory: 90,  scouts: 1, scoutT: 55, repairAt: 0.60,
                tech: 0.85, radar: false, stealth: false, superweapon: false, micro: 0.4, read: 0.35,
                air: false, navy: true },
    veteran:  { waveTime: 150, waveSize: 10, aggro: 1.1,  rebuild: 1.2,
                think: 2.1, react: 4.5, econ: 1.0, memory: 150, scouts: 2, scoutT: 42, repairAt: 0.70,
                tech: 1.0, radar: true, stealth: false, superweapon: false, micro: 0.6, read: 0.60,
                air: true, navy: true },
    elite:    { waveTime: 118, waveSize: 14, aggro: 1.4,  rebuild: 1.5,
                think: 1.6, react: 3.0, econ: 1.15, memory: 240, scouts: 2, scoutT: 32, repairAt: 0.80,
                tech: 1.2, radar: true, stealth: true, superweapon: true, micro: 0.8, read: 0.80,
                air: true, navy: true },
    commander:{ waveTime: 95,  waveSize: 18, aggro: 1.7,  rebuild: 2.0,
                think: 1.2, react: 2.0, econ: 1.3, memory: 600, scouts: 3, scoutT: 24, repairAt: 0.85,
                tech: 1.4, radar: true, stealth: true, superweapon: true, micro: 1.0, read: 1.0,
                air: true, navy: true },
    warlord:  {  waveTime: 75,  waveSize: 24, aggro: 2.1,  rebuild: 2.6,
                think: 0.9, react: 1.2, econ: 1.45, memory: 600, scouts: 3, scoutT: 18, repairAt: 0.90,
                tech: 1.7, radar: true, stealth: true, superweapon: true, micro: 1.0, read: 1.0,
                air: true, navy: true },
    /* legacy names from earlier builds */
    easy: null, normal: null, hard: null, brutal: null,
  };
  DIFF.easy = DIFF.recruit; DIFF.normal = DIFF.regular;
  DIFF.hard = DIFF.elite;   DIFF.brutal = DIFF.commander;

  /* Personalities layer a doctrine on top of the difficulty. They change what a
     commander spends money on and when it commits — two Elite opponents with
     different personalities play noticeably differently.                      */


  function init(game, player, diff, personality) {
    G = game; P = player; D = DIFF[diff] || DIFF.normal;
    if (personality && PERSONALITY[personality]) {
      D = Object.assign({}, D, PERSONALITY[personality].mods);
      P.personality = personality;
    }
    /* One byte a tile for the whole theatre: 144x144 is 20 kB per commander,
       which is nothing, and it is what lets the commander tell ground it has
       cleared from ground it has simply never visited. */
    look = new Uint8Array(G.map.W * G.map.H);
    /* ---- the deployment survey ----
       A force knows the ground it deploys onto, including the resource it was
       deployed there to work. The human is handed precisely this: the opening
       fog pass reveals about 800 tiles around the construction yard, and on
       these maps that includes the nearest ore field - measured, the player's
       first ore is 7 tiles away and visible on the first frame.

       An AI start is not sited so kindly: measured across these theatres its
       nearest ore is 19 to 26 tiles out. A flat survey radius therefore left
       the commander gated off from its own resource base, hauling instead from
       whatever distant field happened to fall inside the circle - a 24-tile
       round trip that strands a full hauler the moment the route is awkward,
       and the economy never starts. So the survey reaches as far as it must to
       take in the field this commander is expected to live off, and no further:
       everything beyond it still has to be scouted for. */
    {
      const M = G.map, W0 = M.W, H0 = M.H;
      const cx = (P.homeX / CFG.TILE) | 0, cy = (P.homeY / CFG.TILE) | 0;
      let need = 0;
      for (let y = 0; y < H0; y++) for (let x = 0; x < W0; x++) {
        if (M.ore[y * W0 + x] < 20) continue;
        const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        if (!need || d2 < need) need = d2;
      }
      const r = U.clamp(Math.ceil(Math.sqrt(need || 0)) + 6, 16, 34);
      for (let y = Math.max(0, cy - r); y <= Math.min(H0 - 1, cy + r); y++)
        for (let x = Math.max(0, cx - r); x <= Math.min(W0 - 1, cx + r); x++) {
          const dx = x - cx, dy = y - cy;
          if (dx * dx + dy * dy <= r * r) look[y * W0 + x] = 1;
        }
    }
    seenB = new Map(); seenU = new Map(); dossier = []; alarms = []; graves = [];
    /* the threat field, the casualty return and the priced plot all belong to
       one battle: a restarted match must not plan its first two seconds
       against the previous one's order of battle */
    gunHard = null; gunSoft = null; gunVer = -1; seenVer = 0;
    lastAxes = []; lastAimId = null; siegeAt = null; siegeNeed = 0;
    armsCache = null; armsT = -1e9; survey = null; surveyT = -1e9;
    aimShy.clear(); aimRvT = -1; waveBook = null; oreSites = null;
    /* A restarted match must not price its first tanker off the previous
       battle's sortie rate, buy its first workshop against the previous
       battle's casualty rate, or site a belt against a minefield that was on
       another map. */
    fuelBreak = 0; logiT = 0; logiOrbit = null;
    ledger = null; ledgerT = -1e9; arvHave = 0; arvLostT = -1e9;
    mineSigns = []; raidHeat = 0; raidT = 0; mineNext = 0;
    foeVeh = 0; foeVehT = 0;
    knownM = null; knownMT = -1e9;
    for (const k in roleCool) delete roleCool[k];
    intelT = 0; lastDigest = 0; aim = null;
    /* The deployment sites are on the published map - every player can see
       where the start positions are. Which of them the enemy actually took is
       not, so they are ranked as hypotheses, nearest first, and struck off as
       they are examined. This is the honest replacement for knowing homeX. */
    hypo = (G.map.starts || []).filter(st =>
        U.dist(st.x * CFG.TILE, st.y * CFG.TILE, P.homeX, P.homeY) > CFG.TILE * 6)
      .sort((a, b) => U.dist2(a.x * CFG.TILE, a.y * CFG.TILE, P.homeX, P.homeY) -
                      U.dist2(b.x * CFG.TILE, b.y * CFG.TILE, P.homeX, P.homeY));
    thinkT = 2 + (P.idx * 0.4);            // stagger so AIs don't all think on the same tick
    /* earlyRush was declared on the rusher doctrine and never read, so a
       Shock commander opened exactly like everyone else. */
    waveT = D.earlyRush ? 26 : 60;
    scoutT = 20;
    attackWave = []; navalWave = []; phase = "build";
    amphib = { state: "idle", lsts: [], beach: null, staging: null };
    rival = null;
    pickRival();
  }

  /* ---------- who are we fighting? ---------- */
  let rival = null, rivalT = 0;
  function hostiles() {
    return G.players.filter(o => o !== P && !o.defeated && !G.allied(P, o));
  }
  /* nearest surviving enemy, preferring one we can actually walk to */
  function pickRival() {
    const foes = hostiles();
    if (!foes.length) { rival = null; return; }
    let best = null, bestScore = -Infinity;
    for (const f of foes) {
      /* Where they are and how strong they are, as far as we know it. This
         used to read f.homeX/f.homeY and the true length of their unit and
         building lists - a complete order of battle for an enemy we might not
         have laid eyes on once. An unlocated enemy now scores as distant,
         which is what sends the scouts out. */
      const at = intelHome(f);
      const d = at ? U.dist(P.homeX, P.homeY, at.x, at.y) / CFG.TILE : 90;
      const strength = intelB(r => r.own === f.idx && !r.gone).length +
                       intelU(r => r.own === f.idx, D.memory || 240).length * 0.4;
      let score = -d * 1.6 - strength * 0.5;
      if (f === G.human) score += 8 * (D.aggro || 1);   // the player is the point of the game
      if (score > bestScore) { bestScore = score; best = f; }
    }
    rival = best;
    /* can we reach the rival overland? */
    groundConnected = false;
    if (rival) {
      /* Can we walk there? Asked about where we BELIEVE they are. Until we
         believe anything at all, assume yes: a commander that decides the war
         is amphibious before it has looked at the ground builds a fleet it did
         not need and never marches. */
      const at = intelHome(rival);
      if (!at) groundConnected = true;
      else {
        const a = { x: (P.homeX / CFG.TILE) | 0, y: (P.homeY / CFG.TILE) | 0 };
        const b = { x: (at.x / CFG.TILE) | 0, y: (at.y / CFG.TILE) | 0 };
        const path = Path.find(G.map, a.x, a.y, b.x, b.y, "ground", null);
        if (path && path.length) {
          const end = path[path.length - 1];
          groundConnected = U.dist(end.x, end.y, b.x, b.y) < 6;
        }
      }
    }
  }
  function foe() { return rival && !rival.defeated ? rival : (hostiles()[0] || G.human); }
  /* Drop a deployment site from the list once somebody of ours has been close
     enough to see it is not the enemy's home, so scouting converges instead of
     revisiting the same empty corner. */
  function pruneHypotheses() {
    for (let i = hypo.length - 1; i >= 0; i--)
      if (staleness(hypo[i].x, hypo[i].y) < 90) hypo.splice(i, 1);
  }

  function update(dt) {
    if (!P || P.defeated) return;
    /* ---- no free money ----
       Two lines used to live here. One paid the commander 60*(cashMul*handicap-1)
       credits a second out of nowhere - 18/s at Elite, 54/s at Warlord, ~21,600
       and ~64,800 over a twenty-minute battle, more than the whole starting
       purse - with no ore consumed, no hauler at risk and nothing the player
       could do about it. The other topped a broke commander up at 22/s the
       moment its last harvester died, which is precisely the payoff for the one
       economic attack the game supports; because it was a floor rather than a
       grant it simply ran for ever. Both are gone. Every credit on both sides
       now comes off an ore field, through a hauler, into a refinery that has to
       survive. What the difficulty setting buys is competence, not income.

       There was also a bug in the first line worth recording: earn() clamps to
       the storage ceiling, which is 4,000 before a refinery exists, so the very
       first payment threw away everything above it. A commander on Elite or
       above started the battle with 4,000 credits where Recruit and Regular -
       whose multiplier was below one, so the branch never ran - kept the full
       10,000. The harder settings were opening the game poorer. */

    /* how long the bank has been full. Income past the storage cap is simply
       discarded, so this is the signal that production, not money, is what is
       holding the war back. */
    const capNow = P.storageCap ? P.storageCap() : 1e9;
    if (P.cash >= capNow * 0.9) saturated += dt; else saturated = 0;

    /* The picture is refreshed faster than decisions are taken, so a decision
       is never made on a frame-old contact. */
    intelT -= dt;
    if (intelT <= 0) { intelT = 0.8; intelSweep(); }
    thinkT -= dt;
    if (thinkT <= 0) { thinkT = D.think || 1.6; think(); }
    driveFlankers(dt);
    waveT -= dt;
    scoutT -= dt;
    rivalT -= dt;
    if (rivalT <= 0) { rivalT = 25; pickRival(); }
  }

  /* ---------- helpers ---------- */
  function count(pred) { let n = 0; for (const u of P.units) if (!u.dead && pred(u)) n++; return n; }
  function unitsOf(role) { return P.units.filter(u => !u.dead && u.def.role === role); }
  function q(kind) { return P.queues[kind]; }
  function queueLen(kind) { return q(kind).items.length; }
  /* Anything of this role already PAID FOR but not yet on the field.
     Every "buy one of these" rule below priced one platform and then
     tested `count(...)`, which sees units and not orders. A naval yard
     takes the better part of a minute to cut an oiler while the think
     tick comes round every few seconds, so the same unmet need argued
     for the same purchase again and the commander bought two - 2,600
     credits for a rule whose own comment says one. Queue and ready list
     both count: `ready` is a hull that is built and merely waiting. */
  function queuedRole(kind, pred) {
    const qq = q(kind); if (!qq) return 0;
    let n = 0;
    for (const list of [qq.items, qq.ready])
      for (const it of (list || [])) {
        const d = UNITS[it.id || it];
        if (d && pred(d)) n++;
      }
    return n;
  }
  /* What we will HAVE of a thing: on the field plus on order. Every cap
     below is a cap on the capability, not on the hangar, so both count. */
  function fielded(kind, pred) {
    let n = 0;
    for (const u of P.units) if (!u.dead && pred(u.def)) n++;
    return n + queuedRole(kind, pred);
  }
  let saveTarget = 0;            // credits being hoarded for tech
  let saturated = 0;             // seconds spent sitting on a full bank
  /* The generational step this commander is saving for, whether its vault is
     too small to hold the price, and the earliest time another step may be
     started. Re-equipping used to be gated on a flat 6,000 in the bank with
     nothing reserving it - the 1950s step costs 2,600 - so the money was
     always spent on units first and commanders died in the decade they
     started in. */
  let eraStep = null;
  let eraNeedSilo = false;
  let eraNextT = 0;
  const failCool = {};           // building id -> game time when retry is allowed
  /* The tightest knot of enemy this commander can see. Worth spending a
     mission on only if there is a real cluster there. */
  function bestStrikePoint(m) {
    /* Candidates come off our own plot. This used to walk every hostile
       player's complete unit and building list, which is both a cheat and,
       incidentally, several hundred entries to sort through every time. */
    const cand = [];
    for (const r of seenB.values()) if (!r.gone) cand.push(r);
    for (const r of intelU(null, D.memory || 240)) cand.push(r);
    if (cand.length < 3) return null;
    let best = null, bestN = 0;
    const R = (m.aoe || 2) * CFG.TILE * 1.6;
    for (const c of cand) {
      if (!G.radarCovers(P, c.x, c.y)) continue;
      let n = 0;
      for (const d of cand) if (U.dist(c.x, c.y, d.x, d.y) < R) n += d.key ? 2 : 1;
      if (n > bestN) { bestN = n; best = c; }
    }
    /* do not spend a heavy mission on a lone scout */
    return (best && bestN >= (m.rounds > 5 ? 4 : 3)) ? { x: best.x, y: best.y } : null;
  }

  function tryBuildUnit(role) {
    const id = unitFor(P.faction, role, P.era);
    if (!id) return false;
    const def = UNITS[id];
    if (P.lockReason(def)) return false;
    if (P.cash < P.factionCost(def) * 0.6) return false;
    /* respect the tech savings plan (harvesters & supply are always exempt) */
    if (saveTarget > 0 && role !== "harvester" && role !== "supply" &&
        P.cash < saveTarget + P.factionCost(def)) return false;
    /* once the cash for a step is banked the fuel is reserved too, or the
       reserve leaves a few barrels at a time in vehicles and the step is never
       legal. Only once the cash is there: an army held back for a step that
       cannot be paid for yet is worse than no step at all. */
    if (eraStep && def.oil && role !== "harvester" && role !== "supply" &&
        P.cash >= eraStep.cost && P.oil - def.oil < eraStep.oil) return false;
    return P.enqueue(def.cat, id);
  }

  /* choose a legal placement spot near a base anchor, spiralling outward */
  function findSpot(defId, anchorB) {
    const def = BUILDINGS[defId];
    const ax = anchorB ? anchorB.tx : (P.homeX / CFG.TILE) | 0;
    const ay = anchorB ? anchorB.ty : (P.homeY / CFG.TILE) | 0;
    for (let r = 2; r < 26; r++) {
      for (let attempt = 0; attempt < 14; attempt++) {
        const ang = G.rng() * U.PI2;
        const tx = (ax + Math.cos(ang) * r) | 0;
        const ty = (ay + Math.sin(ang) * r) | 0;
        if (G.canPlace(P, defId, tx, ty)) return { tx, ty };
      }
    }
    return null;
  }
  /* naval yard needs shoreline: walk the coast near home */
  function findShoreSpot() {
    const map = G.map;
    const hx = (P.homeX / CFG.TILE) | 0, hy = (P.homeY / CFG.TILE) | 0;
    let best = null, bd = Infinity;
    for (let y = 1; y < map.H - 3; y += 2) for (let x = 1; x < map.W - 3; x += 2) {
      if (!G.canPlace(P, "navalyard", x, y)) continue;
      const d = U.dist2(x, y, hx, hy);
      if (d < bd) { bd = d; best = { tx: x, ty: y }; }
    }
    return best && bd < 40 * 40 ? best : null;
  }
  function findOilSpot() {
    /* Nearest free node, preferring our own half of the theatre but not
       confined to it. The old flat 30-tile cap meant a commander whose only
       near node was an unbuildable shoreline sliver - and there is one on
       Taiwan - never looked past it, and spent the whole match on the 150
       barrels it started with: no tech 3, no generational step, nothing.
       A commander with no well at all reaches across the map for one. */
    const hx = P.homeX / 32, hy = P.homeY / 32;
    const reach = P.countBuilding("derrick") >= 1 ? 30 : 1e9;
    const nodes = G.map.oilNodes.filter(n => !n.taken && U.dist(n.x, n.y, hx, hy) < reach)
      .sort((a, b) => U.dist2(a.x, a.y, hx, hy) - U.dist2(b.x, b.y, hx, hy));
    for (const n of nodes) {
      for (let dy = -1; dy <= 0; dy++) for (let dx = -1; dx <= 0; dx++)
        if (G.canPlace(P, "derrick", n.x + dx, n.y + dy)) return { tx: n.x + dx, ty: n.y + dy };
    }
    return null;
  }

  function placeReady() {
    for (const kind of ["building", "defense"]) {
      const rq = q(kind);
      if (!rq.ready.length) continue;
      const id = rq.ready[0].id;
      let spot = null;
      if (id === "navalyard") spot = findShoreSpot();
      else if (id === "derrick") spot = findOilSpot();
      else if (BUILDINGS[id].cat === "defense") {
        /* defences face the enemy */
        const anchor = P.buildings.find(b => !b.dead && b.def.id === "conyard");
        spot = anchor ? findSpotToward(id, anchor) : findSpot(id, null);
      } else spot = findSpot(id, P.buildings.find(b => !b.dead && b.def.id === "conyard"));
      if (spot) {
        G.placeBuilding(P, id, spot.tx, spot.ty, false);
        constructionStart(P, id, spot);
        P.consumeReady(kind, id); rq.failN = 0;
      } else {
        /* refund anything that can't find ground after a few tries — never jam the queue */
        rq.failN = (rq.failN || 0) + 1;
        if (rq.failN >= (id === "navalyard" || id === "derrick" ? 1 : 4)) {
          P.earn(P.factionCost(BUILDINGS[id])); P.consumeReady(kind, id); rq.failN = 0;
          failCool[id] = G.time + 70;          // stop retrying a spot that does not exist
        }
      }
    }
  }
  function findSpotToward(defId, anchor) {
    /* Face the trouble, not the enemy's front door. This used to read the
       opponent's homeX/homeY, so every gun was correctly oriented from the
       first minute against a base nobody had scouted. */
    const b0 = bearing();
    if (!b0) return findSpot(defId, anchor);
    const ex = b0.x / CFG.TILE, ey = b0.y / CFG.TILE;
    const dx = ex - anchor.tx, dy = ey - anchor.ty;
    const L = Math.sqrt(dx * dx + dy * dy) || 1;
    for (let r = 4; r < 14; r++) {
      for (let a = 0; a < 8; a++) {
        const spread = (G.rng() - 0.5) * 1.6;
        const ang = Math.atan2(dy, dx) + spread;
        const tx = (anchor.tx + Math.cos(ang) * r) | 0;
        const ty = (anchor.ty + Math.sin(ang) * r) | 0;
        if (G.canPlace(P, defId, tx, ty)) return { tx, ty };
      }
    }
    return findSpot(defId, anchor);
  }
  function constructionStart(p, id, spot) {
    /* AI structures build over time like the player's */
    const b = p.buildings[p.buildings.length - 1];
    b.buildProgress = 0;
    const def = BUILDINGS[id];
    const T = Math.max(1, p.factionTime(def));
    const step = () => {
      if (b.dead) return;
      b.buildProgress = Math.min(1, b.buildProgress + 0.1 / T * 1.2);
      if (b.buildProgress < 1) G.defer(0.12, step);
    };
    step();
  }

  /* ================= building the picture =================
     Sensor-outward, not target-inward: walk our own units and structures and
     ask the spatial grid what is standing near each of them. That is the same
     direction the guns acquire in, it costs one grid query per sensor rather
     than a scan of every enemy on the map, and it cannot accidentally see
     something no sensor of ours is near.                                   */
  function intelSweep() {
    if (!look) return;
    /* 0 means "never looked at", so a tile overlooked in the opening seconds
       must still stamp as 1 or the commander decides it has never seen its own
       start position - which is exactly what happened: nothing was explored
       until t=4s, and the harvesters had nowhere they were allowed to go. */
    const now = G.time, stamp = Math.max(1, Math.min(255, (now / 4) | 0));
    const W = G.map.W, H = G.map.H;
    /* mark ground as overlooked, so the commander can tell "nothing there"
       from "never been looked at" - the difference between a safe flank and
       an unscouted one */
    const paint = (cx, cy, r) => {
      const r2 = r * r;
      const y0 = Math.max(0, (cy - r) | 0), y1 = Math.min(H - 1, (cy + r) | 0);
      const x0 = Math.max(0, (cx - r) | 0), x1 = Math.min(W - 1, (cx + r) | 0);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const dx = x - cx, dy = y - cy;
        if (dx * dx + dy * dy <= r2) look[y * W + x] = stamp;
      }
    };
    for (const u of P.units) {
      if (u.dead || u.carried) continue;
      const r = u.sightR();
      paint(u.tx, u.ty, r);
      G.grid.query(u.x, u.y, r * CFG.TILE, (e) => noteContact(e, u, r, now));
    }
    for (const b of P.buildings) {
      if (b.dead || b.buildProgress < 1) continue;
      const r = b.sightR();
      paint(b.tx + b.def.w / 2, b.ty + b.def.h / 2, r);
      G.grid.query(b.x, b.y, r * CFG.TILE, (e) => noteContact(e, b, r, now));
    }
    /* Our own barrier. A node is not a unit and is not in P.units, so a field
       this commander paid for would improve its targeting through canSeeSub
       and never once enter its picture - it would prosecute contacts it had no
       record of making. There is deliberately no paint() call: a hydrophone is
       not eyes, and painting `look` would make the commander believe it had
       scouted open water nobody has ever looked at. The layer gate stops a
       node from handing over surface or air contacts, and noteContact's own
       sub gate then passes only what the barrier actually fixed. */
    if (typeof SonarNet !== "undefined" && G.sonarnet) {
      for (const nd of G.sonarnet) {
        if (nd.dead || nd.owner !== P) continue;
        const rt = nd.r * 2.2;
        G.grid.query(nd.x, nd.y, rt * CFG.TILE, (e) => {
          if (e.layer !== "sub") return;
          noteContact(e, nd, rt, now);
        });
      }
    }
    digest(now);
    forgetStale(now);
    pruneHypotheses();
    /* High-water marks, counted off the picture rather than off the enemy's
       actual roster: how many aircraft we have ever had on the plot at once is
       what a real staff would size its own fighter force against. */
    for (let i = 0; i < dossier.length; i++) {
      const d = dossier[i];
      if (!d) continue;
      let air = 0, all = 0;
      for (const r of seenU.values()) {
        if (r.own !== i || now - r.t > 14) continue;
        all++; if (r.layer === "air") air++;
      }
      if (air > d.peakAir) d.peakAir = air;
      if (all > d.peakUnits) d.peakUnits = all;
    }
    /* ONE threat field, rebuilt here and nowhere else, and version-gated so
       an ordinary sweep costs a single integer compare. Every reader of it -
       the approach chooser, the objective scorer, the beach chooser - gets the
       same numbers, which is the whole reason it is built once. */
    rebuildThreatField();
    lastDigest = now;
  }

  /* The one place a sighting can enter the picture. Deliberately stricter than
     a plain distance test: a submarine has to be held on sonar, a low-observable
     airframe is only seen from closer in, and a structure still going up is not
     yet a structure. If it does not pass here, this commander does not know it. */
  function noteContact(e, sensor, rTiles, now) {
    if (!e || e.dead || e.carried) return;
    if (!e.owner || e.owner === P || G.allied(P, e.owner)) return;
    if (e.kind === "building" && e.buildProgress < 1) return;
    if (e.layer === "sub" && !G.canSeeSub(P, e)) return;
    let r = rTiles * CFG.TILE;
    /* the same reduction the guns already apply when acquiring, so what the
       commander believes and what its weapons can engage agree */
    if (e.def && e.def.stealth) r *= (1 - e.def.stealth * CFG.STEALTH_ACQ);
    if (U.dist2(sensor.x, sensor.y, e.x, e.y) >= r * r) return;
    noteSighting(e, now);
  }

  function noteSighting(e, now) {
    const oi = e.owner.idx;
    let d = dossier[oi];
    if (!d) d = dossier[oi] = { peakUnits: 0, peakAir: 0, sawSub: false, sawRadar: false,
                                sawStealth: false, sawHeavy: false, lastX: 0, lastY: 0, lastT: 0 };
    d.lastX = e.x; d.lastY = e.y; d.lastT = now;
    if (e.kind === "building") {
      /* Bump the plot revision when a structure is newly seen or comes back
         after being written off, so the threat field knows to rebuild. Only
         structures: a vehicle sighting does not change the field, and bumping
         on those would rebuild it several times a second. */
      const rec = seenB.get(e.id);
      if (rec) { if (rec.gone) seenVer++; rec.t = now; rec.gone = false; }
      else {
        seenVer++;
        seenB.set(e.id, { id: e.id, own: oi, tx: e.tx, ty: e.ty, x: e.x, y: e.y, ref: e,
                          key: e.def.id, cost: e.def.cost || 300, t: now, gone: false });
      }
      /* An emitter is an emitter. A jamming station announces itself exactly
         as a radar does - louder, in fact - and it is the single thing a Wild
         Weasel is bought for. Latching on def.jam as well is what makes the
         electronic-warfare block respond to a station the way it already
         responds to a dome. */
      if ((e.def.radar || e.def.jam) && G.emitting && G.emitting(e)) d.sawRadar = true;
      return;
    }
    if (e.layer === "sub") d.sawSub = true;
    if ((e.def.radar || e.def.jam) && G.emitting && G.emitting(e)) d.sawRadar = true;
    if (e.def.stealth) d.sawStealth = true;
    if (e.armor === "heavy") d.sawHeavy = true;
    /* `ref` is the entity itself, and it is only ever handed to a weapon while
       liveTrack() says the sighting is seconds old - i.e. while we are actually
       looking at it. A memory aims manoeuvre; only a live track aims a gun. */
    /* What class of thing it is and how thick its glacis is are what a
       recognition manual gives you the instant you have it in view, so they
       are written down at contact like everything else here. Recording them
       NOW is also the only honest way to read them later: `ref` is the live
       entity and may only be touched while liveTrack() holds, so a reading
       taken off a two-minute-old memory has to have been taken at the time.
       Everything downstream reads these three and never r.ref. */
    /* the durable half of the composition reading: a ground vehicle that is
       not a hauler is exactly what an anti-tank mine exists for */
    if (e.cat === "vehicle" && e.layer === "ground" && !e.def.harvester &&
        !seenU.has(e.id)) {
      foeVeh *= Math.pow(0.5, (now - (foeVehT || now)) / 180);
      foeVehT = now; foeVeh += 1;
    }
    seenU.set(e.id, { id: e.id, own: oi, x: e.x, y: e.y, layer: e.layer, ref: e,
                      role: e.def.role, harvester: !!e.def.harvester,
                      armed: !!(e.def.weapons && e.def.weapons.length),
                      armor: e.armor, cat: e.cat,
                      plate: (e.def.armorMM && e.def.armorMM.front) || 0, t: now });
  }

  /* Being shot at is intelligence, and it is the only kind that arrives without
     looking for it. Nothing on this side has ever read it. */
  function digest(now) {
    const seenSince = lastDigest;
    /* Decayed on the CLOCK and not on the call, so a Warlord thinking every
       0.9s does not accumulate raid heat four times as fast as a Recruit for
       the same amount of being shot at. A 180-second half-life on one point a
       hit makes 6 mean "they have raided us properly, more than once,
       recently". */
    raidHeat *= Math.pow(0.5, (now - (raidT || now)) / 180);
    raidT = now;
    const hits = [];             // our own things hurt by nobody, this window
    const bump = (e) => {
      if (!e.lastHitAt || e.lastHitAt <= seenSince) return;
      alarms.push({ x: e.x, y: e.y, t: e.lastHitAt,
                    tier: (typeof Threat !== "undefined" && Threat.tierOf)
                          ? Threat.tierOf(e.def, e.key) : 1 });
      /* The same thirty-tile filter bearing() itself applies, because this is
         the evidence that bearing() has real alarms to answer from. */
      if (U.dist(e.x, e.y, P.homeX, P.homeY) < CFG.TILE * 30) raidHeat += 1;
      /* Damage with no shooter behind it. Read BEFORE the attribution block
         below so it sees the same field, and restricted to the two classes
         Mines.threatens() will touch - a ground vehicle or a surface hull.
         That is not a filter of convenience, it is Mines.threatens() restated:
         an anti-tank mine is set off by weight, so a rifle squad losing hit
         points to nobody can never be recorded as a mine. */
      if (!e.lastHitBy && ((e.cat === "vehicle" && e.layer === "ground") ||
                           (e.cat === "naval" && e.layer === "sea")))
        hits.push({ x: e.x, y: e.y, sea: e.layer === "sea" });
      const by = e.lastHitBy;
      if (by && by.owner && by.owner !== P && !G.allied(P, by.owner)) {
        const oi = by.owner.idx;
        const d = dossier[oi] || (dossier[oi] = { peakUnits: 0, peakAir: 0, sawSub: false,
          sawRadar: false, sawStealth: false, sawHeavy: false, lastX: 0, lastY: 0, lastT: 0 });
        if (by.layer === "sub") d.sawSub = true;
        if (by.layer === "air") { d.sawAir = true; d.peakAir = Math.max(d.peakAir, 1); }
        if (by.armor === "heavy") d.sawHeavy = true;
        d.lastX = by.x; d.lastY = by.y; d.lastT = now;
      }
      /* a hauler under fire runs for the refinery instead of standing there */
      if (e.def.harvester && !e.dead) {
        const rf = G.nearestBuilding(P, "refinery", e.x, e.y);
        if (rf) e.give({ type: "move", x: rf.x, y: rf.y });
      }
    };
    for (const u of P.units) if (!u.dead) bump(u);
    for (const b of P.buildings) if (!b.dead) bump(b);
    /* Classified once the window has CLOSED. The discriminator between a mine
       and an off-map fire mission is how many of ours were hurt at the same
       instant, and that is not knowable one victim at a time. */
    noteMineHits(hits, now);
    for (let i = alarms.length - 1; i >= 0; i--)
      if (now - alarms[i].t > 20) alarms.splice(i, 1);
  }

  /* A structure is not forgotten on a clock - buildings do not wander off. It
     is struck off only when we look at where it stood and it is not there.
     A vehicle sighting is the opposite: it decays fast, because by the time
     you act on it the vehicle has driven somewhere else. */
  function forgetStale(now) {
    const W = G.map.W;
    for (const [id, r] of seenB) {
      if (staleness(r.tx, r.ty, now) < 6 && r.t < now - 6) {
        /* the same revision counter: shelling a gun line flat has to actually
           open the road in this commander's own estimate of it */
        seenVer++;
        if (r.gone) seenB.delete(id); else r.gone = true;
      }
    }
    for (const [id, r] of seenU) {
      const tau = r.layer === "air" ? 9 : (r.harvester ? 60 : 26);
      if (now - r.t > tau * 2.5) seenU.delete(id);
    }
  }

  /* seconds since anything of ours last overlooked this tile; huge if never */
  function staleness(tx, ty, now) {
    if (!look) return 0;
    if (tx < 0 || ty < 0 || tx >= G.map.W || ty >= G.map.H) return 1e9;
    const b = look[ty * G.map.W + tx];
    return b === 0 ? 1e9 : ((now === undefined ? G.time : now) - b * 4);
  }
  /* remembered structures, newest knowledge first */
  function intelB(pred) {
    const out = [];
    for (const r of seenB.values()) if (!pred || pred(r)) out.push(r);
    return out;
  }
  /* remembered vehicles no older than `maxAge` seconds */
  function intelU(pred, maxAge) {
    const out = [], now = G.time, lim = maxAge === undefined ? 1e9 : maxAge;
    for (const r of seenU.values())
      if (now - r.t <= lim && (!pred || pred(r))) out.push(r);
    return out;
  }
  /* is this remembered vehicle recent enough to shoot at rather than march to */
  function liveTrack(r) { return G.time - r.t <= 5; }
  /* the entity behind a sighting, but only while we still hold the track on it */
  function trackedEntity(r) {
    if (!r || !r.ref || r.ref.dead || !liveTrack(r)) return null;
    return r.ref;
  }

  /* ================= reading the picture for ground decisions =============
     Everything below reads seenB, seenU, dossier and alarms and nothing else.
     It exists because the machinery to know better than a dice roll has been
     sitting in this file unread since the picture was written: seenU carries a
     role on every vehicle sighting and seenB carries the building id on every
     emplacement, so an order of battle and a survey of the enemy's works are
     both a walk over two Maps.                                             */

  /* ---- how covered is this ground ----
     Stamped onto a coarse grid rather than per tile: GUN_CELL is four tiles,
     so 36x36 over the 144-tile theatre - two Float32Arrays, 10.4 kB, against
     the 20.7 kB the look map already costs. Four tiles is coarser than a
     nest's whole six-tile envelope, which over-reports it by up to two tiles;
     that is the acceptable direction to be wrong in, because the error is
     toward caution and it lands on the one emplacement that hardly matters to
     the armour it would be diverting.

     forgetStale() strikes a structure off ONLY when we go back and look and it
     is not there, which is right for remembering a pillbox and wrong for
     planning around one: a pillbox seen once in the opening minute would
     otherwise sit on the plot at full weight an hour later, and a commander
     that shelled the road open and never re-scouted would believe it was still
     shut. So each stamp is scaled by how old the report is, with a floor -
     not forgotten, downgraded to reported-unconfirmed, because the pillbox
     probably is still standing. */
  function rebuildThreatField() {
    if (!G || !G.map) return;
    if (gunVer === seenVer && gunHard) return;
    gunVer = seenVer;
    const C = GUN_CELL;
    if (!gunHard) {
      gunW = Math.ceil(G.map.W / C); gunH = Math.ceil(G.map.H / C);
      gunHard = new Float32Array(gunW * gunH);
      gunSoft = new Float32Array(gunW * gunH);
    } else { gunHard.fill(0); gunSoft.fill(0); }
    const now = G.time, mem = Math.max(30, D.memory || 240);
    for (const r of seenB.values()) {
      if (r.gone) continue;
      const g = gunProfile(r.key);
      if (!g) continue;                      // no ground weapon: not in this war
      const age = staleness(r.tx, r.ty, now);
      const conf = age > mem ? 0.4 : 1 - 0.6 * (age / mem);
      const cx = r.x / CFG.TILE / C, cy = r.y / CFG.TILE / C;
      const rad = g.range / C, rad2 = rad * rad;
      const mr = g.minRange / C, min2 = mr * mr;
      const x0 = Math.max(0, Math.floor(cx - rad)), x1 = Math.min(gunW - 1, Math.ceil(cx + rad));
      const y0 = Math.max(0, Math.floor(cy - rad)), y1 = Math.min(gunH - 1, Math.ceil(cy + rad));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d2 = dx * dx + dy * dy;
        if (d2 > rad2 || d2 < min2) continue;    // outside the envelope, or in the dead zone
        const i = y * gunW + x;
        gunHard[i] += g.hard * conf;
        gunSoft[i] += g.soft * conf;
      }
    }
  }
  /* Fire per second this point is under, for a force that is `hardShare`
     armoured. The share is what makes two fields worth keeping: the same
     hundred metres is a wall to a rifle company and empty to a tank company,
     and every caller knows which it is sending. */
  function exposureAt(px, py, hardShare) {
    if (!gunHard) return 0;
    const C = GUN_CELL * CFG.TILE;
    const x = U.clamp((px / C) | 0, 0, gunW - 1);
    const y = U.clamp((py / C) | 0, 0, gunH - 1);
    const i = y * gunW + x;
    return gunHard[i] * hardShare + gunSoft[i] * (1 - hardShare);
  }
  /* how armoured our own ground force is - our own units, not intelligence */
  function ourHardShare() {
    let hv = 0, all = 0;
    for (const u of P.units) {
      if (u.dead || u.layer !== "ground" || !u.def.weapons.length) continue;
      if (u.def.harvester) continue;
      all++; if (u.armor === "heavy" || u.armor === "light") hv++;
    }
    return all ? hv / all : 0.6;
  }

  /* ---- the casualty return ----
     The mirror of `alarms`. alarms records where our own things were shot
     standing at home and drives the defence reflex; it decays over twenty
     seconds because it is about right now. NOTHING anywhere recorded where the
     ATTACKS died. The only line in this file that has ever seen a wave
     casualty was `attackWave = attackWave.filter(u => !u.dead)`, and it threw
     the information straight in the bin - which is the whole reason the same
     wave could be fed into the same four anti-tank guns for forty minutes.

     This is the most honest intelligence in the game: it is entirely about our
     own dead. It is hooked on the prune rather than in digest() because
     Combat.kill leaves e.x and e.y intact and attackWave holds the reference
     until the filter runs, so every casualty passes here exactly once - where
     a 0.8s digest sweep could miss a unit that died just before a 0.9s think.

     A grave has to outlive the wave that made it or it teaches nothing, so it
     lasts three wave intervals against an alarm's twenty seconds, and it is
     read over a seven-tile radius because a wave dies across a frontage and
     not on a spot. Sixty entries, oldest dropped, so a long battle cannot grow
     the list without bound; the prune happens inside graveWeight so there is
     no separate timer. */
  function noteGrave(u) {
    /* Three more fields, all of them about our own dead and all of them free.
       `hp` is the whole bar the casualty was carrying, which is what the
       repair ledger needs to work out how much of the punishment we absorb
       ends in a write-off rather than in a dent; `cat` keeps a rifle squad out
       of that sum, because a recovery vehicle cannot mend one. graveWeight
       reads only x/y/t/cost and is unaffected, and repairLedger defaults both
       so a grave written before this change cannot poison the ratio. */
    graves.push({ x: u.x, y: u.y, t: G.time, cost: (u.def && u.def.cost) || 300,
                  hp: u.maxHp || 300, cat: (u.def && u.def.cat) || "vehicle" });
    if (graves.length > 60) graves.splice(0, graves.length - 60);
  }
  function graveWeight(px, py, now) {
    const life = Math.min(600, (D.waveTime || 150) * 3), R = CFG.TILE * 7;
    let w = 0;
    for (let i = graves.length - 1; i >= 0; i--) {
      const g = graves[i];
      const age = now - g.t;
      if (age > life) { graves.splice(i, 1); continue; }
      const d = U.dist(px, py, g.x, g.y);
      if (d > R) continue;
      w += (g.cost / 300) * (1 - age / life) * (1 - d / R);
    }
    return w;
  }
  function reapWave() {
    const keep = [];
    for (const u of attackWave) {
      if (u.dead) { if (!u._graved) { u._graved = 1; noteGrave(u); } }
      else keep.push(u);
    }
    attackWave = keep;
  }

  /* ---- the other side's order of battle ----
     The ARMY COMPOSITION block used to be two G.rng() cascades against fixed
     thresholds, and not one term in either of them came from the picture. That
     is why this commander bought twelve percent MANPADS against an enemy that
     had never flown, thirteen percent SPAAG against the same, and exactly as
     many anti-tank teams against a militia as against a tank corps.

     Nothing here touches another player's object lists. Every field read -
     role, layer, armed, harvester, armor, plate, key, gone - is one this
     commander's own sensors wrote through noteContact, and the three added at
     sighting time are what a recognition manual gives you the instant you have
     the thing in view: what class of vehicle it is and how thick its glacis
     is. They are recorded AT CONTACT because `ref` is the live entity and may
     only be touched while liveTrack() holds, so a reading taken off a
     two-minute-old memory has to have been taken at the time.

     Emplacements are deliberately NOT aged. Concrete does not drive away, and
     forgetStale already strikes a work off the moment we look at where it
     stood and find it gone, which is the honest test. What is computed instead
     is `line`: the heaviest cluster of emplacement fire inside seven tiles. A
     wave walks into a cluster, not into a theatre total, and one outlying
     machine-gun nest across the map is not a reason to build a siege train. */
  /* read it decayed, without mutating: the bump owns the clock */
  function foeVehSeen() {
    return foeVeh * Math.pow(0.5, (G.time - (foeVehT || G.time)) / 180);
  }
  function foeArms() {
    const now = G.time;
    /* think() runs every 0.9-3.6s and three blocks want this reading, so the
       sweep is done at most twice a second and handed out from here. */
    if (armsCache && now - armsT < 1.9) return armsCache;
    const mem = Math.max(14, D.memory || 90);
    const a = { armour: 0, aps: 0, light: 0, inf: 0, arty: 0, air: 0,
                plate: 0, works: 0, line: 0, aa: 0, seen: 0,
                sArmour: 0, sLight: 0, sInf: 0, sArty: 0, t: now };
    let plateN = 0;
    for (const r of seenU.values()) {
      if (r.harvester) continue;                 // a hauler is an objective, not a threat
      const age = now - r.t;
      if (age > mem) continue;
      /* A sighting is worth less the older it is, and D.memory is half of the
         difficulty scaling in this block. A Recruit remembers thirty seconds,
         so it plans against what is physically in front of one of its units
         and nothing else; a Warlord remembers ten minutes and plans against
         the campaign. Neither is given anything a human could not write down. */
      const w = 1 - age / mem;
      if (r.layer === "air") { a.air += w; continue; }
      if (r.layer !== "ground") continue;        // hulls are the navy's problem
      const cls = r.armor === "heavy" ? "armour"
                : ROLE_ARM[r.role] || (r.cat === "infantry" ? "inf" : "light");
      if (cls === "armour") {
        a.armour += w;
        /* the tech-3 `heavy` is the one carrying an active protection system,
           and that is the single fact that argues against buying missiles */
        if (r.role === "heavy") a.aps += w;
        if (r.plate) { a.plate += r.plate; plateN++; }
      } else if (cls === "inf") {
        if (r.armed) a.inf += w;                 // engineers and medics are not a threat
      } else if (cls === "arty") a.arty += w;
      else a.light += w;
    }
    a.plate = plateN ? a.plate / plateN : 0;
    a.seen = a.armour + a.light + a.inf + a.arty;
    const n = Math.max(1, a.seen);
    a.sArmour = U.clamp(a.armour / n, 0, 1); a.sLight = U.clamp(a.light / n, 0, 1);
    a.sInf = U.clamp(a.inf / n, 0, 1);        a.sArty = U.clamp(a.arty / n, 0, 1);

    /* the works, priced against a wave that is mostly armour - because that is
       what a wave is - and clustered, because a wave walks into a cluster */
    const works = [];
    for (const r of seenB.values()) {
      if (r.gone) continue;
      const g = gunProfile(r.key);
      if (!g) {
        /* an air-defence work does not stop a ground wave; it is a reason not
           to send the gunships, which is the air block's business */
        /* Counted an air-defence work only if it can actually shoot at an
           aircraft. This used to count ANY gunless defence, which was harmless
           while the sonar array was the only one - and would not be now, since
           it would tell the commander to hold its gunships back from a base
           with no extra SAM in it. aaProfile() reads the published target set
           and answers properly. */
        if (BUILDINGS[r.key] && aaProfile(r.key) > 0) a.aa += 1;
        continue;
      }
      const w = g.hard * 0.75 + g.soft * 0.25;
      a.works += w;
      works.push({ x: r.x, y: r.y, w });
    }
    const R2 = Math.pow(7 * CFG.TILE, 2);
    for (const r of works) {
      let n2 = 0;
      for (const o of works) if (U.dist2(r.x, r.y, o.x, o.y) < R2) n2 += o.w;
      if (n2 > a.line) a.line = n2;
    }
    armsCache = a; armsT = now;
    return a;
  }

  /* ---- is our own gun good enough, or do we need a shaped charge? ----
     generations.js re-bases every CANNON's penetration off GUN_PEN, per
     faction per era, and leaves HEAT completely alone. The consequence is not
     a nuance; it is the difference between an army that works and one that
     does not. At the present day a NATO 120mm makes a penetration ratio just
     over unity against a modern frontal plate and gets PENETRATION, while a
     KPA gun makes about a half and an ROC gun about three-fifths against the
     same plate - which resolveArmor answers with NO PENETRATION and
     CFG.PEN_FAIL_MUL, eighteen points a shot off a five-second reload. The
     ATGM is unchanged in every era for every army and goes clean through all
     of it, because heat's penetration is derived from listed damage at
     CFG.PEN_PER_DMG 5.2 and nothing ever rewrites it.

     So "is an ATGM vehicle the answer to that tank" has a different answer
     depending on who is asking, and the commander has to ask. This is read
     entirely off OUR OWN roster - what our factories can build is our own
     business and not intelligence - and compared against the plate we have
     actually looked at. Returns 0 when our gun goes clean through and there is
     no case for the missile, 1 when our gun bounces and the missile is the
     only anti-armour weapon we own. */
  function heatEdge(plate) {
    if (!plate) return 0.5;                    // nothing identified: no opinion
    let pen = 0;
    for (const role of ["heavy", "mbt", "lighttank"]) {
      const id = unitFor(P.faction, role, P.era);
      if (!id || !UNITS[id]) continue;
      const w = WEAPONS[(UNITS[id].weapons || [])[0]];
      if (!w || w.warhead !== "cannon") continue;
      /* the same derivation penOf uses when a weapon declares no pen of its
         own; generations.js declares one on every tank gun, so this is
         normally the real figure straight off the table */
      const p = w.pen !== undefined ? w.pen : (w.dmg || 0) * CFG.PEN_PER_DMG.cannon;
      if (p > pen) pen = p;
    }
    if (!pen) return 1;                        // no gun at all: it had better be missiles
    /* CFG.PEN_FULL is 1.00 and CFG.PEN_NONE is 0.72, so a little over unity is
       comfortable and anything under about two-thirds is hopeless. */
    return U.clamp((CFG.PEN_FULL + 0.12 - pen / plate) / 0.45, 0, 1);
  }

  /* ---- what to build against what we can see ----
     A floor of general-purpose units first, then counter terms on top, every
     one of them a share of an OBSERVED share so nothing can run away and no
     reading can produce a pure counter-army. The floor is the old dice mixture
     minus the dice, which is what a commander with an empty plot should still
     build - and the plot IS empty for the first several minutes of every
     battle, so the default has to be a sane army in its own right.

     `grip` is D.read: how far this commander is allowed to move off that
     floor. Every tier reads the same picture with the same code; what differs
     is how much of it there is to read - the sighting weights above already
     died at D.memory - and how much of it is acted on. A Recruit at read 0
     both sees less and acts on none of it, and builds precisely the standing
     mixture. That is a commander that does not analyse, which is what a
     Recruit is. */
  function counterMix(a) {
    const inf = { rifle: 0.42, at: 0.20, mg: 0.14, aa: 0.12, mortar: 0.12 };
    const veh = { ifv: 0.16, lighttank: 0.12 };
    if (P.tech >= 2) { veh.mbt = 0.26; veh.spaag = 0.13; veh.spg = 0.11; }
    if (P.tech >= 3) { veh.heavy = 0.13; veh.mlrs = 0.12; }
    const grip = D.read === undefined ? 1 : D.read;
    if (grip <= 0) return { inf, veh };          // a Recruit builds the standing mixture
    const armour = a.sArmour, foot = a.sInf, light = a.sLight, guns = a.sArty;
    const air  = U.clamp(a.air / 3, 0, 1);
    const line = U.clamp(a.line / 70, 0, 1);     // ~70 dps is three or four AT guns
    const heat = heatEdge(a.plate);              // 0 our gun is enough, 1 it bounces
    const aps  = a.armour > 0 ? U.clamp(a.aps / a.armour, 0, 1) : 0;
    /* a Gun Line declares artyBias 3.0, which before normalisation would ask
       for nearly a pure artillery army and no escort at all */
    const ab = Math.min(2.0, D.artyBias || 1);
    const add = (o, k, v) => { o[k] = (o[k] || 0) + v; };

    if (armour > 0.12) {
      /* The ATGM team is 275 to 480 credits depending on the army, and it
         puts a shaped charge through a plate its own side's tank gun cannot
         always defeat: the KPA team makes 700 mm where the KPA tank gun makes
         365, against a modern glacis of 705 to 744. Per credit nothing in the
         roster is close, it needs only a barracks and tech 1, and for the KPA
         and the ROC it is very nearly the only anti-armour weapon they own. */
      add(inf, "at", 0.34 * armour * grip * (0.6 + 0.4 * heat));
      /* The same warhead on a chassis that can keep up with the wave, and at
         9.6 tiles it outranges every tank gun in the game and the anti-tank
         emplacement with it - but it is a LIGHT hull, so it is bought against
         armour in the open rather than against a prepared position, where the
         exchange is with 750 hit points behind structure armour and a thin
         skin loses it. Discounted against the tech-3 heavy: combat.js rolls
         its aps 0.40-0.45 against every incoming missile and does nothing
         whatever to a long rod. */
      add(veh, "tankdestroyer", 0.30 * armour * grip * (1 - 0.45 * aps) * (0.5 + 0.5 * heat));
      /* and back toward the gun exactly where the gun is the better answer */
      if (P.tech >= 2) add(veh, "mbt", 0.16 * armour * grip * (1 - heat) + 0.10 * armour * grip * aps);
      if (P.tech >= 3) add(veh, "heavy", 0.14 * armour * grip);
      /* And fewer of these. The light tank's 76mm makes 624 mm against a 705
         plate - ratio 0.885, PARTIAL PENETRATION, so a 60-damage gun arrives
         as about 36 against eighteen hundred hit points, standing in the open
         to do it. The IFV is less wrong than it looks, since its first weapon
         is a TOW and not the autocannon, but it duplicates the tank destroyer
         on a hull that is also carrying a rifle section - so against a tank
         corps the credits belong on the dedicated carrier. The old dice put a
         fifth of the vehicle queue into the pair of them unconditionally. */
      veh.ifv       *= 1 - 0.35 * armour * grip;
      veh.lighttank *= 1 - 0.70 * armour * grip;
    }

    if (foot > 0.25) {
      /* Damage is not what shifts a squad in cover. Built-up ground is
         CFG.COVER_HEAVY*1.25 and CFG.SUPPRESS_PRONE_DR another 0.42 on top, so
         a rifle round arrives as under three points against 115 hit points -
         forty rounds a squad, and they are shooting back the whole time.
         Suppression ignores all of it: the machine-gun team fires fourteen
         rounds at 30 suppression each against a CFG.SUPPRESS_BREAK of 86, so
         one burst does not merely break a squad, it buries the threshold - and
         CFG.ROUT_TIME then sends it running for six seconds. That is the
         mechanism, and the machine-gun team is 280 credits. */
      add(inf, "mg", 0.22 * foot * grip);
      /* frag is 1.15 against infantry where bullet is 1.00, and it arrives
         over one and a half to two and a half tiles with suppression attached */
      add(inf, "mortar", 0.14 * foot * grip);
      if (P.tech >= 2) add(veh, "spg", 0.16 * foot * grip * ab);
      if (P.tech >= 3) add(veh, "mlrs", 0.14 * foot * grip * ab);
      /* a tank gun is 0.35 against a man; the wave does not need more of them */
      if (veh.mbt) veh.mbt *= 1 - 0.30 * foot * grip;
    }

    if (line > 0.20) {
      /* This is the one the player built, and it is an artillery problem and
         nothing else. Structures get no penetration layer at all, so it is the
         flat matrix, and the ground roster owns no `he` weapon - which leaves
         frag at 0.75 and heat at 0.80. But the decisive term is REACH, not
         damage: the self-propelled howitzer reaches 20.4 tiles and the MLRS
         23.2, against a nest at 6.0, an anti-tank gun at 7.5, an AA battery at
         13.1, a SAM site at 14.0, and the deepest emplacement in the game -
         the howitzer bunker - at 16.0. A gun line therefore takes ANY prepared
         position apart without once being shot at, which is not true of
         armour: sending tanks means trading an 8.0-tile gun in the open
         against 750 hit points behind structure armour. */
      if (P.tech >= 2) add(veh, "spg", 0.30 * line * grip * ab);
      if (P.tech >= 3) add(veh, "mlrs", 0.22 * line * grip * ab);
      /* The guns are blind: an SPG sights 5.5 tiles and shoots 15.5. A sniper
         sights 10.5 and moves stealthily, which is what makes the other ten
         tiles usable at all. */
      if (P.tech >= 2) add(inf, "sniper", 0.08 * line * grip);
      add(inf, "mortar", 0.10 * line * grip);
      /* and stop feeding thin-skinned vehicles into a prepared position */
      veh.ifv       *= 1 - 0.40 * line * grip;
      veh.lighttank *= 1 - 0.60 * line * grip;
    }

    if (guns > 0.10) {
      /* counterbattery is already set on every indirect piece we own; what it
         wants is a plot, and the artillery radar is what gives it one */
      if (P.tech >= 2) add(veh, "spg", 0.12 * guns * grip * ab);
      add(veh, "radarv", 0.06 * guns * grip);
    }

    /* peakAir already sizes the mobile SAM battery and the fighter force
       further down and neither is touched here. What was never wired to
       anything at all is the SPAAG and the MANPADS team, both of which came
       out of the dice - so the commander bought a thousand-credit air-defence
       vehicle against an enemy with no aircraft, and flak is 0.04 against
       heavy armour, one point a shell. */
    if (air > 0) {
      add(inf, "aa", 0.16 * air * grip);
      add(veh, "spaag", 0.18 * air * grip);
    } else {
      inf.aa *= 1 - 0.5 * grip;
      if (veh.spaag) veh.spaag *= 1 - 0.5 * grip;
    }

    /* Worth saying because it is counter-intuitive: an IFV's autocannon makes
       12 mm against a carrier's ~87 mm glacis, which is NO PENETRATION - two
       carriers cannot hurt each other with their guns at all, and the duel is
       decided entirely by the missile. A light tank's 76mm makes 624 mm and
       goes clean through the same plate for its full damage, which is why the
       cheap answer to a column of carriers is the light tank rather than
       another carrier. */
    if (light > 0.40 && armour < 0.15) {
      add(veh, "lighttank", 0.10 * light * grip);
      add(inf, "at", 0.08 * light * grip);
    }

    /* A monoculture in the other direction is the failure mode of all this, so
       the general-purpose floor keeps at least a third of each queue however
       many counter terms have stacked. A wave of nothing but missile carriers
       loses to a rifle company. */
    const guard = (o, keys) => {
      let tot = 0, base = 0;
      for (const k in o) tot += o[k];
      for (const k of keys) base += o[k] || 0;
      if (tot <= 0 || base >= tot * 0.35) return;
      const need = tot * 0.35 - base, share = need / keys.length;
      for (const k of keys) if (o[k] !== undefined) o[k] += share;
    };
    guard(inf, ["rifle"]);
    guard(veh, P.tech >= 2 ? ["mbt", "ifv"] : ["ifv", "lighttank"]);
    return { inf, veh };
  }

  /* ---- build toward a mixture instead of rolling for one ----
     The old block was a ladder of G.rng() thresholds, and a ladder is half the
     bug: it can only express "roll this often", never "we need more of this
     than we have". So it could not recover - lose every anti-tank team to one
     bombardment and the next barracks slot was still 42% rifle. This finds the
     role furthest below its intended share and builds that one, which
     converges on the mixture from wherever the army actually is and
     self-corrects after losses.

     Where the era or the nation has no unit for a role, unitFor answers null
     and lockReason answers a string, and that role is put on a twenty-second
     cool-down so the shortfall genuinely redistributes instead of the slot
     always falling to the same second choice - which would be a new dice roll
     with worse odds. Only structural unavailability cools a role: being broke
     must not, or one poor moment would silence every queue at once. */
  function buildToward(want, army, cat) {
    const now = G.time;
    const have = {};
    let n = 0;
    for (const u of army) {
      if (u.def.cat !== cat) continue;
      have[u.def.role] = (have[u.def.role] || 0) + 1; n++;
    }
    let sum = 0;
    for (const role in want) if (want[role] > 0 && !(roleCool[role] > now)) sum += want[role];
    if (sum <= 0) return false;
    /* a poor commander does not converge cleanly on anything, so what it does
       not act on analytically it still scatters */
    const jit = 0.10 * (1 - (D.read === undefined ? 1 : D.read));
    const gaps = [];
    for (const role in want) {
      if (want[role] <= 0 || roleCool[role] > now) continue;
      gaps.push({ role, gap: want[role] / sum - (n ? (have[role] || 0) / n : 0) +
                             (jit ? (G.rng() - 0.5) * jit : 0) });
    }
    /* Largest shortfall first, and on a tie the role the mixture wants most.
       There is deliberately no "the gap is too small to bother" threshold: the
       caller has already decided the army is under strength, so this must
       always produce something. An early return there would leave a commander
       whose army happens to match its intended mixture building nothing at
       all, which the dice - for all their faults - never did. */
    gaps.sort((x, y) => (y.gap - x.gap) || (want[y.role] - want[x.role]));
    for (let i = 0; i < gaps.length && i < 4; i++) {
      const id = unitFor(P.faction, gaps[i].role, P.era);
      if (!id || !UNITS[id] || P.lockReason(UNITS[id])) {
        roleCool[gaps[i].role] = now + 20; continue;
      }
      if (tryBuildUnit(gaps[i].role)) return true;
      return false;                              // affordable roles exist; we are simply broke
    }
    return false;
  }
  /* where we believe this commander lives: the densest cluster of remembered
     structures, else the last place we were in contact, else an unexamined
     start position, else nothing - and "nothing" is a legitimate answer. */
  function intelHome(f) {
    if (!f) return null;
    const bs = intelB(r => r.own === f.idx && !r.gone);
    if (bs.length) {
      let sx = 0, sy = 0, w = 0;
      for (const r of bs) { const k = r.cost || 300; sx += r.x * k; sy += r.y * k; w += k; }
      return { x: sx / w, y: sy / w };
    }
    const d = dossier[f.idx];
    if (d && d.lastT && G.time - d.lastT < 240) return { x: d.lastX, y: d.lastY };
    return hypo.length ? { x: hypo[0].x * CFG.TILE, y: hypo[0].y * CFG.TILE } : null;
  }
  /* the bearing trouble has been coming from, for siting defences */
  function bearing() {
    if (alarms.length) {
      let sx = 0, sy = 0, w = 0;
      for (const a of alarms) {
        if (U.dist(a.x, a.y, P.homeX, P.homeY) > CFG.TILE * 30) continue;
        const k = (a.tier || 1) * (1 - (G.time - a.t) / 40);
        if (k <= 0) continue;
        sx += a.x * k; sy += a.y * k; w += k;
      }
      if (w > 0) return { x: sx / w, y: sy / w };
    }
    return intelHome(rival);
  }

  /* ---- stationing the air defence ----
     A battery is placed between the base and the direction trouble has actually
     come from, and kept inside its own weapon envelope of the base. It carries
     no ground weapon at all - pickWeapon returns -1 against anything on the
     ground and engage() simply idles it - so it can never trade with a tank,
     and the only correct answer to armour arriving is to drive away.

     No attempt is made to hide it. A launcher with a radar is a Weasel magnet:
     acquire() weights an emitter a hundredfold for a SEAD shooter and an
     anti-radiation round does triple damage to one, so two HARMs kill it. That
     is the counterplay working as designed, and the price of the envelope. */
  function driveAirDefence() {
    const sams = unitsOf("sam");
    if (!sams.length) return;
    const b = bearing() || intelHome(rival);
    let sx = P.homeX, sy = P.homeY;
    if (b) {
      sx = P.homeX + (b.x - P.homeX) * 0.32;
      sy = P.homeY + (b.y - P.homeY) * 0.32;
      const d = U.dist(sx, sy, P.homeX, P.homeY), lim = CFG.TILE * 12;
      if (d > lim) {
        sx = P.homeX + (sx - P.homeX) * (lim / d);
        sy = P.homeY + (sy - P.homeY) * (lim / d);
      }
    }
    for (const u of sams) {
      if (u.dead) continue;
      /* armour within six tiles: it cannot shoot back, so it leaves */
      let hunted = false;
      for (const r of seenU.values()) {
        if (!r.armed || r.layer !== "ground") continue;
        const e = trackedEntity(r);
        if (e && U.dist(e.x, e.y, u.x, u.y) < CFG.TILE * 6) { hunted = true; break; }
      }
      if (hunted) { u.give({ type: "move", x: P.homeX, y: P.homeY }); continue; }
      /* otherwise hold station, re-ordered only once it has really drifted */
      if (U.dist(u.x, u.y, sx, sy) > CFG.TILE * 4 && u.order.type !== "move")
        u.give({ type: "guard", x: sx, y: sy });
    }
  }

  /* ---- aiming the ballistic launchers ----
     No new targeting routine: bestStrikePoint already draws its candidates
     only from what this commander has seen, already refuses a point its own
     radar cannot watch, and already declines anything short of a real cluster -
     which is exactly the "do not spend a round on a lone scout" rule a weapon
     with a ninety-second reload needs. What is added here is only the rule that
     stops two launchers putting their rounds on the same plot of ground. */
  let telFired = [];
  function driveLaunchers() {
    const tels = unitsOf("tel");
    if (!tels.length) return;
    const now = G.time;
    telFired = telFired.filter(f => now - f.t < 45);
    for (const u of tels) {
      if (u.dead) continue;
      if (u.order.type === "attack" || u.order.type === "bombard") continue;
      if (u.roundsMax && u.rounds <= 0) continue;         // dry: wait for resupply
      /* A structure this commander has seen is the natural target: it is not
         going to move, which is the entire reason a ballistic round is worth
         its ninety-second reload. bestStrikePoint is tried first because a
         dense cluster is worth more than a lone outbuilding, but it refuses any
         aimpoint its own radar cannot currently watch - and with a thirty-tile
         weapon behind a twenty-two-tile radar dome that refusal was total, so
         no launcher in any battle ever fired. A remembered building needs no
         live track; a moving column still does. */
      /* In a siege the launcher is aimed at the thing holding the road shut.
         bestStrikePoint wants a cluster of three or more and will therefore
         ignore an isolated emplacement for ever - which is precisely the
         target a siege is about. The fall-back war aim below is priced now
         rather than nearest-and-dearest, which is the difference between
         putting a ninety-second round on a refinery and putting it on a
         concrete barrier. */
      let spot = null;
      if (siegeAt && now - siegeAt.t < 60) spot = { x: siegeAt.x, y: siegeAt.y };
      if (!spot) spot = bestStrikePoint({ aoe: 2.6, rounds: 1 });
      if (!spot) {
        const t = warAim();
        if (t && t.x !== undefined) spot = { x: t.x, y: t.y };
      }
      if (!spot) continue;
      let dup = false;
      for (const f of telFired)
        if (U.dist(f.x, f.y, spot.x, spot.y) < CFG.TILE * 5) { dup = true; break; }
      if (dup) continue;
      telFired.push({ x: spot.x, y: spot.y, t: now });
      u.give({ type: "bombard", x: spot.x, y: spot.y, until: now + 12 });
    }
  }

  /* ================= DOCTRINE A: BUYING REACH =================
     A logistics platform is not bought because the bank can afford one, or
     because we happen to own a navy. It is bought when a credit figure can be
     put on what operating beyond the supply chain is costing RIGHT NOW, and
     that figure exceeds the price of the platform that removes it.

     Three arms, three different meters, because the engine measures the three
     completely differently and pretending otherwise gets a silent zero:
       ground  supplyStrain() is a real time integral and already costs speed,
               accuracy and rate of fire
       sea     nothing at all. updateSupply is called only for
               `roundsMax || cat === "vehicle" || cat === "infantry"`, and a
               hull is cat "naval", so a ship's strain is permanently zero
       air     not limited by any radius worth reading, but by a flat 40% of
               tank floor that fires whatever the range to the target
     Each then owns a stationing rule, because a supply platform parked in the
     wrong place is not a smaller version of the right answer.               */

  /* ---- what being out of contact is actually costing, in credits ----
     supplyStrain() is already a time integral and not an instant: zero until
     CFG.UNSUPPLIED_GRACE (45 s) of lost contact and one at CFG.UNSUPPLIED_MAX
     (180 s), so isOutOfSupply() is true only after about forty-seven seconds.
     "How many are out of supply, and for how long" is therefore ONE number the
     engine keeps for us every tick, and a second duration timer in here would
     be the same clock kept twice.

     The price is in three files and none of it is a guess: speedMul multiplies
     by 1 - 0.25*strain, Combat's accMul by 1 - 0.30*strain, and the reload
     interval by 1 + 0.55*strain. Accuracy and rate of fire MULTIPLY, so at
     full strain a vehicle delivers 0.70/1.55 = 0.45 of its fire and moves at
     three quarters speed. Charged here at 0.30 of the unit's cost per point of
     strain, which is about right at half strain and understates full strain
     badly - deliberately, since this figure has to clear the price of a whole
     truck before one is bought.

     Infantry is counted. It has no fuel tank at all - fuelMax is 0 for cat
     infantry - so a truck has nothing to pour into it, but updateSupply runs
     for it and it takes the same accuracy and rate-of-fire penalty, and
     inSupply() is satisfied by the truck's MERE PRESENCE within
     CFG.SUPPLY_RANGE with supplyLeft still aboard. A rifle company shooting
     thirty percent worse is as good a reason to buy a truck as a tank shooting
     thirty percent worse. */
  function supplyBill() {
    let bill = 0, worst = 0, out = 0;
    for (const u of P.units) {
      if (u.dead || !u.supplyStrain) continue;
      if (u.def.harvester || u.def.supply) continue;   // not what a wave is made of
      const s = u.supplyStrain();
      if (s <= 0.01) continue;
      out++;
      if (s > worst) worst = s;
      bill += P.factionCost(u.def) * s * 0.30;
    }
    return { bill, worst, out };
  }

  /* ---- the other half of the ground meter, and the one with the tail ----
     Strain is the early warning; this is the cliff. A ground vehicle burns
     CFG.FUEL_BURN_LAND (1.5/s) whenever it is MOVING and can only top up
     inside its own base radius. A full tank is a hundred units, so a tank has
     sixty-seven seconds of movement in it - about eighty tiles at 1.2 tiles a
     second, on a map a hundred and forty-four tiles across. At zero, speedMul
     returns 0 outright: the vehicle is not slow, it is parked in the open for
     the rest of the battle, and nothing but a truck can move it again.

     This is NOT the same measurement as strain and cannot be folded into it.
     Strain counts seconds out of CONTACT whether or not the unit moved; this
     counts seconds of MOVEMENT whether or not anybody was ever in contact. A
     wave that marches sixty tiles unopposed arrives with strain zero and no
     fuel to come home on.

     The reference point is the nearest owned STRUCTURE and not homeX/homeY,
     because inBaseRadius tests every building at CFG.BUILD_RADIUS (11 tiles) -
     a forward depot is a fuel point and the start tile may not be. It is
     looked up once for the wave centroid rather than once per vehicle: a wave
     moves as one body, and twenty-five building scans a think tick to refine
     that is not worth the cycles. */
  function fuelShort(wave) {
    if (!wave || !wave.length) return 0;
    let cx = 0, cy = 0, n = 0;
    for (const u of wave) { if (u && !u.dead) { cx += u.x; cy += u.y; n++; } }
    if (!n) return 0;
    cx /= n; cy /= n;
    let src = null, sd = Infinity;
    for (const b of P.buildings) {
      if (b.dead || b.buildProgress < 1) continue;
      const d = U.dist2(cx, cy, b.x, b.y);
      if (d < sd) { sd = d; src = b; }
    }
    const hx = src ? src.x : P.homeX, hy = src ? src.y : P.homeY;
    const burn = CFG.FUEL_BURN_LAND * ((FACTIONS[P.faction] || {}).fuelMul || 1);
    let stranded = 0;
    for (const u of wave) {
      if (!u || u.dead || !u.fuelMax || u.layer !== "ground") continue;
      const sp = Math.max(0.4, u.def.speed);
      const home = U.dist(u.x, u.y, hx, hy) / CFG.TILE;
      if (u.fuel < home / sp * burn * 1.25 + 8) stranded += P.factionCost(u.def);
    }
    return stranded;
  }

  /* ---- a naval reserve, because the engine does not have one ----
     Two things have to be said before any of this reads as an oversight.

     FIRST: supplyStrain() is a DEAD SIGNAL at sea. updateSupply is called only
     for `roundsMax || cat === "vehicle" || cat === "infantry"` and a ship is
     cat "naval", so a hull's `unsupplied` never advances, its strain is
     permanently zero and isOutOfSupply() is permanently false however far out
     it is. Anything that extends the ground doctrine to the fleet by counting
     isOutOfSupply() gets a silent, confident nothing.

     SECOND: there is no RTB for a ship and no reserveFuel() either. A hull
     burns CFG.FUEL_BURN_SEA (1.1/s) whenever it moves, carries the same
     hundred units everything else does, and can take fuel back ONLY inside
     eight tiles of a naval yard at 11/s or from an oiler's runSupply within
     six. Ninety-one seconds of steaming is the entire tank: two hundred and
     eighteen tiles for a Burke at 2.4, a hundred and forty-five for a Nimitz
     at 1.6, on a map a hundred and forty-four across. A fleet that crosses the
     theatre, manoeuvres through a fight and then wants to come home is inside
     one tank with no margin whatever.

     And there is no soft landing. speedMul() returns 0 at zero fuel while the
     guns go on working, so a dry cruiser is a 3,400-credit immobile pillbox in
     open water that can neither run nor be recovered. So the meter is a
     PREDICTION and not an observation - the reserve the engine would compute
     if ships had one - and the test is a ROUND trip, because a hull with
     exactly enough to reach the yard is a hull that has already left the war.

     Rejected: "distance from the yard to where the ships are fighting". It
     correlates with nothing. Burn is per second of MOVEMENT, not per tile of
     separation. A fleet holding a blockade line fifty tiles out burns nothing;
     one chasing a corvette in circles ten tiles out burns everything. */
  function fleetFuel() {
    const burn = CFG.FUEL_BURN_SEA * ((FACTIONS[P.faction] || {}).fuelMul || 1);
    let risk = 0, hulls = 0, thirsty = null, worst = 1e9;
    let yard = null, yd = Infinity;
    for (const b of P.buildings) {
      if (b.dead || b.def.id !== "navalyard" || b.buildProgress < 1) continue;
      const d = U.dist2(P.homeX, P.homeY, b.x, b.y);
      if (d < yd) { yd = d; yard = b; }
    }
    for (const u of P.units) {
      if (u.dead || (u.layer !== "sea" && u.layer !== "sub")) continue;
      if (u.def.supply || u.def.repairRate) continue;   // the train is not the fleet
      if (u.def.weapons.length && u.def.role !== "minesweeper" &&
          u.def.role !== "navminelayer") hulls++;
      const dy = yard ? U.dist(u.x, u.y, yard.x, yard.y) : Infinity;
      if (dy < CFG.TILE * 8) continue;                  // alongside: taking fuel already
      const sp = Math.max(0.4, u.def.speed);
      const res = (yard ? dy / CFG.TILE : 40) / sp * burn * 1.25 + 6;
      if (u.fuel < res * 2) risk += P.factionCost(u.def);  // cannot go out and come back
      const slack = u.fuel - res;
      if (slack < worst) { worst = slack; thirsty = u; }
    }
    return { risk, hulls, yard, thirsty, worst };
  }

  /* ---- what an air force is losing to the transit home ----
     The instrument that looks obvious here is the wrong one, and it is worth
     saying why so that nobody puts it back. combatRadius() is
     (fuelMax/burn)*speed*0.425. Measured on the two kinds of fighter this
     roster actually contains:
       - the hand-written ones (fighter_n, fighter_p, fighter_c, the stealth
         fighters, bomber_n, bomber_p) declare NO `radius`, so airBurn() falls
         back to the flat CFG.FUEL_BURN_AIR of 2.6/s and an F-16 at speed 8.5
         computes a combat radius of 139 tiles;
       - the era-generated ones - nato_e00_fighter and its siblings, which is
         what a commander in a real battle actually builds - declare radius 40,
         which gives a burn of 1.52/s and a combat radius of 236 tiles.
     The map is 144 tiles across. No fighter this commander owns is ever out of
     range of anything, and "the objective is beyond combatRadius()" is a
     trigger that can never fire.

     What actually limits a jet is one line of updateAir():
       bingo = Math.max(this.reserveFuel(), this.fuelMax * 0.40)
     For a generated fighter reserveFuel() is d*0.244 + 8, so the distance
     reserve does not reach forty until the aircraft is a hundred and thirty
     tiles from its pad - which on this map is never. The FLAT FORTY PERCENT
     FLOOR governs everywhere, and the aircraft has sixty usable units - about
     twenty-three seconds of airborne time on the hand-written airframes, forty
     on the generated ones - per sortie regardless of how close the target is.

     A tanker does not postpone that floor; the floor still fires. It changes
     where the aircraft goes when it does, and it is worth exactly nothing to
     an aircraft that broke off EMPTY, because dryAmmo sends that one home
     whatever is orbiting nearby - a tanker carries no bombs. So the
     measurement that decides a 3,200-credit purchase is the share of
     break-offs that are for FUEL with ordnance still aboard.

     Sampled as an instantaneous share and smoothed, rather than counted as
     events: counting events needs a per-airframe flag and bookkeeping in
     entities.js, and the time-share of the airborne force sitting on an rtb or
     tank order with rounds left is the same estimator for one pass. `wing` is
     summed over def.refuelable and never over the hangar, because rules.js
     grants it only to `jet && !tanker && !hover`: a commander whose air arm is
     Apaches, or an AC-130, gets nothing from a tanker at any price and must
     not be allowed to price one.

     No reserveFuel() is called from here, ever. reserveFuel() calls findPad(),
     and findPad loops the owner's buildings with usedOn() - itself O(units) -
     nested inside. combatRadius() touches no other object and is safe; the
     distinction is invisible from the call site. */
  function airDuty() {
    let wing = 0, n = 0, up = 0, cut = 0;
    for (const u of P.units) {
      if (u.dead || u.layer !== "air" || !u.def.refuelable) continue;
      wing += P.factionCost(u.def); n++;
      if (u.parked || u.order.type === "parked") continue;
      up++;
      const ot = u.order.type;
      if ((ot === "rtb" || ot === "tank") && (!u.ammoMax || u.ammo > 0.05)) cut++;
    }
    /* about four think ticks of memory: long enough to smooth one sortie
       cycle, short enough to follow a change of objective */
    if (up) fuelBreak += (cut / up - fuelBreak) * 0.25;
    return { wing, n, up, f: fuelBreak };
  }

  /* ---- where a tanker may orbit, and why the answer is a cap and not a spot -
     reserveFuel() re-measures to the NEAREST TANKER every single tick. That is
     the whole mechanism and it is also the whole danger: the instant this
     aircraft is shot down, hits its own forty percent floor and turns for
     home, or empties its offload, every receiver's reserve jumps straight back
     to the airfield distance. A receiver that was sitting beyond its own
     unaided return range at that moment does not glide home - the fuel-out
     clock gives it four seconds at zero and then destroys it outright. A
     tanker parked too far forward does not merely fail to help; it converts
     one loss into a squadron. Hence the hard cap at HALF the smallest combat
     radius in the wing: whatever happens to the tanker, every aircraft relying
     on it is still inside its own legs.

     The second cap is the air defence, and it must NOT be taken from
     exposureAt(). That field is built by gunProfile(), which drops every
     weapon declaring tgt.ground 0 - which is every SAM and every AA battery in
     the game. Asking the threat field where a Patriot is returns zero,
     confidently. aaProfile() is the published reach of the same emplacements
     off the same tables, and the standoff is that reach plus CFG.CAP_RADIUS -
     the orbit the aircraft will actually fly - plus three tiles for the
     approach. With sam_site at 14.0 and the 1.15 margin that is a twenty-tile
     standoff.

     If nothing legal is left this returns null, the tanker stays on its ramp,
     and logisticsBuy() refuses to buy one at all. An unarmed 3,200-credit
     airframe with 760 hit points and an rcs of 5.2 is the most valuable target
     on the map, and there is no version of flying it into a missile belt that
     is better than not owning it. */
  function tankerOrbit() {
    if (!P.hasBuilding("airbase")) return null;
    const base = G.nearestBuilding(P, "airbase", P.homeX, P.homeY);
    const bx = base ? base.x : P.homeX, by = base ? base.y : P.homeY;
    const at = aim || intelHome(rival);
    if (!at) return null;
    const leg = U.dist(bx, by, at.x, at.y) / CFG.TILE;
    if (leg < 8) return null;                     // nothing to reach out to
    let rc = 1e9;
    for (const u of P.units)
      if (!u.dead && u.layer === "air" && u.def.refuelable && u.combatRadius)
        rc = Math.min(rc, u.combatRadius());       // cheap: touches no other object
    if (rc > 1e8) return null;
    const hot = (px, py) => {
      for (const r of seenB.values()) {
        if (r.gone) continue;
        const reach = aaProfile(r.key);
        if (!reach) continue;
        if (U.dist(px, py, r.x, r.y) / CFG.TILE < reach + CFG.CAP_RADIUS + 3) return true;
      }
      return false;
    };
    let d = Math.min(leg * 0.45, rc * 0.5);
    for (let i = 0; i < 6 && d >= 4; i++) {
      const k = d / leg;
      const px = bx + (at.x - bx) * k, py = by + (at.y - by) * k;
      if (!hot(px, py)) return { x: px, y: py };
      d -= 4;                                      // walk it back toward our own side
    }
    return null;
  }

  /* ---- buying reach, priced rather than rolled ----
     Three purchases, one argument: the platform is bought when what operating
     beyond the chain is costing right now, in credits, exceeds what the
     platform costs.

     PAYBACK, STATED PLAINLY.
       Supply truck 700. A wave of ten vehicles averaging 1,400 is 14,000
       credits of armour; at mean strain 0.5 it fights at roughly three
       quarters value, which is about 3,500 credits of combat power on the
       floor. One truck removes it - five times its price - and on the fuel
       side one truck is the difference between a wave that comes home and
       14,000 credits of immobile tanks.
       Fleet oiler 1,300. One prevented stranding of a destroyer (2,200) pays
       1.7x and of a cruiser (3,400) 2.6x. It also deletes the sail-home cycle
       entirely, since the refuel ring is eight tiles from the yard.
       Aerial tanker 3,200. This one does NOT pay back in saved airframes and
       the comment should say so. It pays back as a standing uplift on the
       refuelable wing's sortie rate. Worked: an F-16 at 1,400, speed 8.5, burn
       2.6/s on a 45-tile leg runs a 31.5 s cycle at 56% duty without one, and
       a 27.4 s cycle at 65% with a tanker orbiting at twenty tiles - plus an
       AI-specific gain the human does not get, since a parked aircraft waits
       up to a whole D.think for the sortie loop while a tanking one carries
       its standing order through in o.then. Call it 0.20 of delivered output.
       The same 3,200 credits is 2.3 more F-16s flying at 56%, which is 1,790
       credits of delivered power, so the tanker wins only when
       0.20 * f * wing > 1,790 - i.e. f * wing > about 9,000. At a realistic
       fuel-limited share of 0.55 that is roughly six F-16s before the
       commander will even look at one. It is a stiff bar and it is meant to
       be: this is the single most expensive speculative mistake available to
       an air force.
     One tanker, and there is deliberately no rule for a second. tanker_n has
     radius 150 and speed 4.4, so its own airBurn is 0.75/s and its own forty
     percent floor turns it home after eighty seconds; its offload of 420 at
     16/s is seven top-ups, so the tanks and not the offload are the binding
     constraint. One is roughly 75-80% coverage of a short leg. A second is a
     second 3,200 credits for the last twenty percent. */
  function logisticsBuy(mineShort) {
    const read = D.read || 0;
    if (read < 0.3) return false;         // a Recruit's logistics stay bad on purpose
    if (mineShort) return false;          // the mining fleet still has first call

    /* ---- ground: the supply truck ---- */
    if (queueLen("vehicle") < 3) {
      const trucks = count(u => u.def.supply && u.cat === "vehicle");
      const s = supplyBill();
      const stranded = fuelShort(attackWave);
      /* A thinner ratio than the old one per six, kept only as a FLOOR because
         a wave always wants one, and the meter buys the rest. 700 is the
         truck's own price, so the first extra is bought only once 700 credits
         of combat power is measurably on the floor; 1,400 is twice its price,
         so the second is bought only once twice its cost of armour is about to
         be immobilised. Capped at four: an army being shelled while out of
         contact must not answer by buying a convoy. */
      const floor = Math.ceil(groundArmy().length / 8);
      const want = Math.min(4, Math.max(floor,
        Math.floor(s.bill / 700) + Math.floor(stranded / 1400)));
      if (trucks < want && tryBuildUnit("supply")) return true;
    }

    /* ---- sea: the fleet oiler ---- */
    if (read >= 0.55 && D.navy && P.tech >= 2 && queueLen("naval") < 2 &&
        P.hasBuilding("navalyard") && !count(u => u.def.role === "oiler") &&
        !queuedRole("naval", d => d.role === "oiler") &&
        !(roleCool.oiler > G.time)) {
      const f = fleetFuel();
      /* hulls >= 4 is the same threshold launchNavalWave already uses to decide
         there is a fleet at all; risk > 2,600 is twice the oiler's own price of
         hull value one bad approach from immobility. */
      if (f.hulls >= 4 && f.risk > 2600) {
        if (tryBuildUnit("oiler")) return true;
        roleCool.oiler = G.time + 25;     // not fieldable this era, or simply broke
      }
    }

    /* ---- air: the aerial tanker ---- */
    if (read >= 0.75 && D.air && P.tech >= 2 &&
        P.hasBuilding("airbase") && P.hasBuilding("radar")) {
      const a = airDuty();                // the estimator has to be fed every think
      if (queueLen("aircraft") < 2 && !count(u => u.def.refuelRate) &&
          !queuedRole("aircraft", d => d.refuelRate) &&
          !(roleCool.tanker > G.time) && a.n >= 4 && a.f * a.wing >= 9000 &&
          P.cash > 3600 && tankerOrbit()) {
        /* the orbit is a PRECONDITION and not a detail: an unarmed
           3,200-credit airframe with nowhere legal to stand is not a purchase,
           it is a gift */
        if (tryBuildUnit("tanker")) return true;
        /* the KPA has never operated one and the ROC has no dedicated tanker,
           so unitFor answers null for two of the five armies and would be
           asked again every think tick for the rest of the battle */
        roleCool.tanker = G.time + 40;
      }
    }
    return false;
  }

  /* ---- where the three of them stand ----
     A supply platform in the wrong place is not a weaker version of the right
     answer, it is a donation. All three rules are geometry off numbers already
     in the tables.

     TRUCK: 3.5 tiles behind the wave centroid on the bearing home. Inside
     CFG.SUPPLY_RANGE 4.5 of the centroid so the whole body stays inSupply(),
     and behind the leading edge - which is what launchGroundWave did not do,
     since it handed the truck the same attackmove as the tanks.
     OILER: seven tiles behind the naval wave toward the yard, out of the gun
     line but near enough that a hull ordered alongside is inside supplyRange
     6.0 within seconds, and refused any point the threat field says is under
     fire, because coast_gun reaches 13.5 tiles and gunProfile does price that
     one. Then the rendezvous, which is the half that actually moves fuel: a
     hull that cannot make a round trip is ORDERED to the oiler. Without that
     order the oiler is a fuel dump nobody visits.
     TANKER: the orbit computed above, never the AWACS station. */
  function logisticsStation() {
    const T = CFG.TILE, read = D.read || 0;
    if (read < 0.3) return;

    /* ---- the supply truck, with the wave and not in it ---- */
    if (attackWave.length) {
      let cx = 0, cy = 0, n = 0;
      for (const u of attackWave) { if (!u.dead) { cx += u.x; cy += u.y; n++; } }
      if (n) {
        cx /= n; cy /= n;
        const dh = U.dist(cx, cy, P.homeX, P.homeY) || 1;
        const sx = cx + (P.homeX - cx) / dh * T * 3.5;
        const sy = cy + (P.homeY - cy) / dh * T * 3.5;
        for (const u of P.units) {
          if (u.dead || !u.def.supply || u.cat !== "vehicle") continue;
          if (u.supplyLeft <= 0) continue;         // runSupply is taking it home
          if (U.dist(u.x, u.y, sx, sy) < T * 2.5) continue;          // on station
          const o = u.order;
          if (o.type === "move" && U.dist(o.x, o.y, sx, sy) < T * 2.5) continue;
          u.give({ type: "move", x: sx, y: sy });
        }
      }
    }

    /* ---- the oiler, and the hull that has to come to it ---- */
    const oilers = unitsOf("oiler");
    if (oilers.length && read >= 0.55) {
      const f = fleetFuel();
      let cx = 0, cy = 0, n = 0;
      const grp = navalWave.length ? navalWave : P.units;
      for (const u of grp) {
        if (u.dead || !u.def.weapons.length) continue;
        if (u.layer !== "sea" && u.layer !== "sub") continue;
        cx += u.x; cy += u.y; n++;
      }
      if (n && f.yard) {
        cx /= n; cy /= n;
        const dy = U.dist(cx, cy, f.yard.x, f.yard.y) || 1;
        let px = cx, py = cy;
        for (let i = 0; i < 4; i++) {
          const back = T * (7 + i * 3);
          px = cx + (f.yard.x - cx) / dy * back;
          py = cy + (f.yard.y - cy) / dy * back;
          if (exposureAt(px, py, 0.85) <= 0) break;   // ships are heavy: price as armour
        }
        for (const o of oilers) {
          if (o.dead || o.supplyLeft <= 0) continue;
          if (U.dist(o.x, o.y, px, py) < T * 4) continue;
          if (o.order.type === "move" && U.dist(o.order.x, o.order.y, px, py) < T * 4) continue;
          o.give({ type: "move", x: px, y: py });
        }
        /* the rendezvous. Elite and above only: pulling a hull off the line is
           a manoeuvre decision, not a purchase. */
        const t = f.thirsty;
        if (t && !t.dead && f.worst < 12 && read >= 0.8 &&
            t.order.type !== "attack" && t.order.type !== "move")
          t.give({ type: "move", x: oilers[0].x, y: oilers[0].y });
      }
    }

    /* ---- the tanker's orbit, re-priced on its own clock ---- */
    if (read < 0.75) return;
    const tks = P.units.filter(u => !u.dead && u.def.refuelRate && u.layer === "air");
    if (!tks.length) return;
    if (G.time >= (logiT || 0)) { logiT = G.time + 5; logiOrbit = tankerOrbit(); }
    for (const t of tks) {
      const ot = t.order.type;
      /* A PARKED tanker is deliberately not skipped. The sortie loop no longer
         launches it - that branch now handles the AWACS and the transports
         only - so if this refused to speak to an aircraft on its ramp the
         3,200-credit purchase would sit there for the whole battle, which is
         the exact bug the AWACS used to have. updateAir clears `parked` the
         moment it is given anything that is not a parked order. */
      if (ot === "rtb" || ot === "land") continue;   // going home: leave it alone
      if (t.offload <= 0) continue;                  // dry boom: entities.js takes it home
      if (t.fuel < t.reserveFuel()) continue;        // ONE reserveFuel call, for one aircraft
      if (!logiOrbit) {                              // no legal station: hold over our own
        if (ot !== "cap") t.give({ type: "cap", x: P.homeX, y: P.homeY });
        continue;
      }
      if (ot !== "cap" ||
          U.dist(t.x, t.y, logiOrbit.x, logiOrbit.y) > T * (CFG.CAP_RADIUS + 3))
        t.give({ type: "cap", x: logiOrbit.x, y: logiOrbit.y });
    }
  }

  /* ============ DOCTRINE B: THE REPAIR LEDGER ============
     The owner's question was whether the repair unit's cost can cover the
     repairing value. Answered literally, on the repair BILL, the answer is no
     and always has been - which is why the vehicle has never been bought.
     Answered on the REPLACEMENT the repair avoids, it is yes, but only while
     the army is actually losing tanks. Both halves are below.

     There are four prices for a hit point in this game and only one of them is
     the recovery vehicle's:

       structure self-repair    CFG.REPAIR_COST 0.30 cr/HP at CFG.REPAIR_RATE,
                                2.2% of the bar a second - Building.update()
       a vehicle or a hull on
       a pad or a slipway       0.12 cr/HP at 5% of the bar a second. Those two
                                numbers are hard-coded in Building.update()'s
                                d.repair block and are NOT CFG.REPAIR_COST,
                                which is the structures-only figure. Quoting
                                0.30 for a tank is out by two and a half times.
       an aircraft on a ramp    the same 0.12 at the same 5% - serviceOnPad()
       recovery vehicle and
       fleet tender             NOTHING AT ALL. repairNearby() adds
                                def.repairRate * dt to every friendly vehicle
                                or hull inside 2.2 tiles and never once calls
                                owner.spend(). It is called unconditionally
                                from Unit.update - no order, no stance, no fuel
                                test - and grid.query runs the callback once
                                per entity, so it heals every client at once.

     So the only free repair in the game is the one this commander has never
     bought - and the case for it cannot be made on the repair bill, because
     800 credits at the depot's own 0.12 is 6,667 hit points, which at 26 a
     second against one client is 256 seconds of unbroken mending: nearly two
     Veteran wave cycles to break even on a bill we were never going to pay.
     Nothing in this file has ever sent a damaged vehicle home to a pad.

     The alternative is not the depot. The alternative is the REPLACEMENT. Our
     own armour prices at 1500/1750 for an Abrams, 1400/1820 for a T-90,
     900/820 for a Bradley - about 0.90 credits a hit point, seven and a half
     times the depot's 0.12 - and this file already carries a conversion of its
     own in HP_CR (0.70 hit points to the credit) which warAim uses to price
     incoming fire. On replacement, 800 credits is 889 hit points: thirty-four
     seconds of mending, or one Abrams brought back from a little under half.

     But a restored hit point is only worth a replacement if the vehicle was
     going to die without it. On one that comes home anyway it saves the depot
     bill - which we never pay - so it is worth nothing in cash. The honest
     value is therefore crPerHp * kill, and both terms are measurable from our
     own things and nothing else: what our own army costs per hit point, and
     what share of the punishment we absorb ends in a write-off. The casualty
     return has recorded every one of our own dead since graves were written;
     it only ever kept the credits, so it now keeps the hit points too.

     Memoised for two seconds, because the ground buy, the naval buy, the
     emergency-sale guard and the debug digest all want it inside one think. */
  function repairLedger() {
    const now = G.time;
    if (ledger && now - ledgerT < 2) return ledger;
    ledgerT = now;
    let cost = 0, landBar = 0, seaBar = 0;
    let hurt = 0, nHurt = 0, seaHurt = 0, nSea = 0, hulls = 0;
    for (const u of P.units) {
      if (u.dead || u.cat === "infantry" || u.def.harvester) continue;
      const sea = u.layer === "sea" || u.layer === "sub";
      if (!sea && u.layer !== "ground") continue;      // aircraft mend on their own ramp
      /* the client is a SHOOTER. Counting our own trucks, tenders and layers
         as things worth mending would let a column of support vehicles argue
         for a workshop to look after itself. */
      if (!u.def.weapons.length) continue;
      cost += P.factionCost(u.def);
      if (sea) { seaBar += u.maxHp; hulls++; } else landBar += u.maxHp;
      /* six percent, not one: a vehicle a scratch below full is not a client,
         and repairNearby would spend its whole rate topping it off */
      const gap = u.maxHp - u.hp;
      if (gap > u.maxHp * 0.06) {
        if (sea) { seaHurt += gap; nSea++; } else { hurt += gap; nHurt++; }
      }
    }
    /* What the punishment has actually cost us. graveWeight owns the prune, so
       this only READS - a grave older than the window is skipped, never
       spliced, or two readers would fight over the same array in one think. */
    const life = Math.min(600, (D.waveTime || 150) * 3);
    let buriedHp = 0, buriedCr = 0;
    for (let i = graves.length - 1; i >= 0; i--) {
      const g = graves[i];
      if (now - g.t > life) continue;
      if (g.cat !== "vehicle" && g.cat !== "naval") continue;   // a rifleman is not a client
      buriedHp += g.hp || 0; buriedCr += g.cost || 0;
    }
    /* Everything that has been shot at us and stuck: the whole bar of every
       vehicle we buried, plus the standing damage on the ones still driving.
       The ratio is the only honest estimate of how often damage turns into a
       write-off, and it is the multiplier that decides this purchase. */
    const absorbed = buriedHp + hurt + seaHurt;
    ledger = {
      hurt, nHurt, seaHurt, nSea, hulls, seaBar,
      crPerHp: (landBar + seaBar) > 0 ? cost / (landBar + seaBar) : 0.90,
      kill: absorbed > 0 ? buriedHp / absorbed : 0,
      buriedCr,
    };
    return ledger;
  }

  /* ---- does the workshop cover its own price ----
     restore is what one vehicle can put back between now and the next wave.
     min(3, clients) because repairNearby's bubble is 2.2 tiles - seventy
     pixels - and a wave deployed on a frontage cannot hold more than about
     three hulls inside it however many are damaged. CONTACT is the one
     modelled constant in this doctrine and it is stated rather than hidden:
     roughly a third of a wave cycle is spent in contact, where there is damage
     to mend; the march out and the reform are dead time for a workshop.

     worth prices those hit points at replacement, discounted by the share of
     our damage that has actually been killing things. need is the purchase
     price marked up twice: by the chance the vehicle itself is lost - it is
     unarmed, 900 hit points, light armour, 1.5 tiles a second, and an SPG at
     20.4 tiles or an MLRS at 23.2 reaches it trivially - and by a confidence
     margin of 1.24 at Veteran falling to 1.00 at Warlord. A commander that
     reads less of the picture must see a clearer case before spending on
     second-order equipment. */
  function repairPayback(price, rate, clients, risk, L) {
    const cycle = D.waveTime || 150;
    const restore = rate * Math.min(3, clients) * cycle * CONTACT;
    const worth = restore * L.crPerHp * L.kill;
    const margin = 1.6 - 0.6 * (D.read === undefined ? 1 : D.read);
    return { worth, need: price * (1 + U.clamp(risk, 0, 0.8)) * margin, restore };
  }

  /* ---- buying the Armoured Recovery Vehicle ----
     kill < 0.12 is the refusal, and it is the answer to the owner's question
     as asked. A commander whose waves come home dented but alive is being
     offered hit points that save a bill it does not pay. It should buy tanks.

     Worked, Veteran, waveTime 150, five damaged vehicles, crPerHp 0.90, kill
     0.35, waveSpent 0.50: restore = 26*3*150*0.35 = 4,095 HP; worth =
     4,095*0.90*0.35 = 1,290 credits; need = 800*1.25*1.24 = 1,240 - BUY,
     narrowly. The same army with kill 0.15 - dented, not dying - is worth 553
     against the same 1,240 and does NOT buy. The same army at Warlord margin
     1.00 needs 1,000 and buys with room. */
  function wantRecovery(army) {
    if ((D.read || 0) < 0.55) return false;      // Recruit and Regular do not do this
    /* Recruit also declares repairAt 0.00 and does not mend its own buildings;
       a commander that lets its base decay has no business running a field
       workshop. */
    if (!P.hasBuilding("depot")) return false;   // hard prereq, and our only other repair
    if (army.length < 6 || queueLen("vehicle") >= 2) return false;
    const id = unitFor(P.faction, "repair", P.era);
    if (!id || !UNITS[id] || P.lockReason(UNITS[id])) return false;
    /* two 2.2-tile bubbles barely overlap and a third is duplication */
    const have = fielded("vehicle", d => d.repairRate && d.layer === "ground");
    const cap = Math.min((D.read || 0) >= 0.80 ? 2 : 1, 1 + ((army.length / 8) | 0));
    if (have >= cap) return false;
    /* one was killed doing this job less than a wave ago: the road has not
       changed and neither would the outcome */
    if (G.time - arvLostT < (D.waveTime || 150)) return false;
    const L = repairLedger();
    if (L.nHurt < 2) return false;               // one client is an escort, not a workshop
    if (L.kill < 0.12) return false;             // damage that is not killing anything
    const p = repairPayback(P.factionCost(UNITS[id]), ARV_RATE, L.nHurt,
                            0.5 * waveSpent(), L);
    return p.worth >= p.need;
  }

  /* ---- buying the Salvage and Repair Tender ----
     The same argument and a stronger one. 1,100 credits at the slipway's 0.12
     is 9,167 hit points and 306 seconds; at the fleet's own replacement price -
     2200/2100 for a Burke, 3400/2900 for a Ticonderoga, 2400/1250 for a Los
     Angeles, about 1.15 credits a hit point - it is 957 hit points and
     thirty-two seconds, which is 46% of a destroyer's bar. One hull that does
     not sink is two tenders.

     And the alternative is worse at sea than on land. The yard mends at 4.6
     tiles precisely because a destroyer cannot sit on top of a three-tile
     slipway; the yard is on our shore and the fighting is on theirs; and a
     hull that sails home is gone for the better part of two minutes. The unit
     description has said this all along and nothing has ever bought one.

     Elite and above only. A fleet is a later and larger problem than a wave.
     Risk is taken from the fleet's OWN standing damage and not from
     waveSpent(), which measures a ground wave and knows nothing about what is
     happening at sea.

     One thing this does NOT buy: fuel. repair_sea declares oiler:true and its
     description promises bunkering, but runSupply is gated on d.supply,
     repair_sea has no supply field, and `oiler` is read nowhere in the
     codebase. The tender mends and does not fuel. The 1,300-credit Fleet Oiler
     is still a separate decision, in logisticsBuy above. */
  function wantTender() {
    if ((D.read || 0) < 0.80 || !D.navy) return false;
    if (!P.hasBuilding("navalyard") || queueLen("naval") >= 2) return false;
    const id = unitFor(P.faction, "repair_sea", P.era);
    if (!id || !UNITS[id] || P.lockReason(UNITS[id])) return false;
    if (fielded("naval", d => d.repairRate && (d.layer === "sea" || d.layer === "sub")) >= 1) return false;
    const L = repairLedger();
    if (L.hulls < 4 || L.nSea < 2 || L.kill < 0.12) return false;
    const risk = L.seaBar > 0 ? L.seaHurt / L.seaBar : 0.3;
    const p = repairPayback(P.factionCost(UNITS[id]), TENDER_RATE, L.nSea, risk, L);
    return p.worth >= p.need;
  }

  /* ---- putting the workshop where the damage is ----
     repairNearby() needs one thing and one thing only: to be within 2.2 tiles
     of something damaged. It takes no order, needs no stance and costs
     nothing. So this is entirely a station-keeping problem.

     It is deliberately NOT put in attackWave: bookWave() would then count an
     unarmed hull as committed combat strength, and reapWave() would write an
     800-credit grave at the objective that teaches the approach chooser to
     fear a road that killed a lorry. Plain `move`, re-aimed as the wave moves,
     and stance "hold" so the idle branch does not go looking for a fight it
     cannot have.

     FOLLOWS, DOES NOT LEAD. The station is the centre of gravity of the wave
     with the DAMAGED pulling hardest - five times the weight at a sliver of
     health - and then clamped so it can never be nearer the objective than the
     wave's own mean distance to it. A workshop in front of the tanks is a free
     kill; a workshop at the mean is inside the 2.2-tile bubble of whatever is
     falling back through it, which is exactly where the damage is. */
  function driveRecovery(gt) {
    const arv = P.units.filter(u => !u.dead && u.def.repairRate && u.layer === "ground");
    /* It is not in attackWave, so reapWave never sees it die. Notice it here:
       one lost doing this job gates the next purchase for a whole wave. */
    if (arv.length < arvHave) arvLostT = G.time;
    arvHave = arv.length;
    if (!arv.length) return;

    let cx = 0, cy = 0, w = 0, sumD = 0, n = 0;
    for (const u of attackWave) {
      if (u.dead || u.cat === "infantry") continue;    // it cannot mend a rifleman
      const k = 1 + 4 * (1 - u.hp / Math.max(1, u.maxHp));
      cx += u.x * k; cy += u.y * k; w += k; n++;
      if (gt) sumD += U.dist(u.x, u.y, gt.x, gt.y);
    }

    let sx, sy;
    if (w > 0) {
      sx = cx / w; sy = cy / w;
      if (gt && n) {
        const mean = sumD / n, d = U.dist(sx, sy, gt.x, gt.y);
        if (d < mean) {                    // drifted in front of the column: pull it back
          const a = Math.atan2(sy - gt.y, sx - gt.x);
          sx = gt.x + Math.cos(a) * mean;
          sy = gt.y + Math.sin(a) * mean;
        }
      }
    } else {
      /* no wave out. It waits at the shed, where the next one forms up and
         where anything that limps home walks into its bubble for free. */
      const shed = G.nearestBuilding(P, "depot", P.homeX, P.homeY) ||
                   G.nearestBuilding(P, "factory", P.homeX, P.homeY);
      if (!shed) return;
      sx = shed.x; sy = shed.y + CFG.TILE * 2;
    }

    for (let i = 0; i < arv.length; i++) {
      const u = arv[i];
      if (u.stance !== "hold") u.stance = "hold";
      /* a second one stands off to one side: two bubbles on one point cover no
         more ground than one */
      const off = i * CFG.TILE * 1.8;
      const ax = sx + Math.cos(i * 2.1) * off;
      const ay = sy + Math.sin(i * 2.1) * off;
      if (U.dist(u.x, u.y, ax, ay) < CFG.TILE * 1.4) continue;      // on station
      const o = u.order;
      if (o.type === "move" && U.dist(o.x, o.y, ax, ay) < CFG.TILE * 2) continue;
      u.give({ type: "move", x: ax, y: ay });
    }
  }

  /* ---- the tender stands INSIDE the formation ----
     Not behind it. repairNearby's bubble is 2.2 tiles where the naval yard's
     slipway reaches 4.6 - and the yard was given the wider berth for the
     stated reason that a destroyer alongside a three-tile building does not
     sit on top of it. A tender trailing the line by three tiles services
     nobody at all. So it is put at the damage-weighted centre of the group and
     nudged only a tile and a half back down the bearing of the enemy: enough
     that it is not the leading hull, not so far that the line leaves its
     bubble. A ship has no rear to hide in, and pretending otherwise costs the
     whole capability. */
  function driveTender(nt) {
    const tend = P.units.filter(u => !u.dead && u.def.repairRate &&
                                     (u.layer === "sea" || u.layer === "sub"));
    if (!tend.length) return;
    const grp = navalWave.length ? navalWave : P.units;
    let cx = 0, cy = 0, w = 0;
    for (const u of grp) {
      if (u.dead || !u.def.weapons.length) continue;
      if (u.layer !== "sea" && u.layer !== "sub") continue;
      const k = 1 + 4 * (1 - u.hp / Math.max(1, u.maxHp));
      cx += u.x * k; cy += u.y * k; w += k;
    }
    if (!w) {
      /* no fleet to keep: lie alongside the yard, which is also the only place
         a tender can take fuel, since oiler:true on repair_sea drives nothing */
      const yard = G.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
      if (!yard) return;
      for (const u of tend)
        if (U.dist(u.x, u.y, yard.x, yard.y) > CFG.TILE * 5 && u.order.type !== "move")
          u.give({ type: "move", x: yard.x, y: yard.y });
      return;
    }
    let sx = cx / w, sy = cy / w;
    if (nt) {
      const a = Math.atan2(sy - nt.y, sx - nt.x);
      sx += Math.cos(a) * CFG.TILE * 1.5;
      sy += Math.sin(a) * CFG.TILE * 1.5;
    }
    for (const u of tend) {
      if (u.stance !== "hold") u.stance = "hold";
      if (U.dist(u.x, u.y, sx, sy) < CFG.TILE * 1.2) continue;
      const o = u.order;
      if (o.type === "move" && U.dist(o.x, o.y, sx, sy) < CFG.TILE * 1.8) continue;
      u.give({ type: "move", x: sx, y: sy });
    }
  }

  /* ============ DOCTRINE C: MINE WARFARE ============
     WHAT A MINE ACTUALLY DOES, IN THIS ENGINE'S OWN NUMBERS. Mines.LAND is
     {dmg:200, r:0.55, arm:3.0, warhead:"heat", aoe:0.5} and detonate() passes
     belly:true, which impactArc() turns into arc "top" with zero obliquity:

       vs a present-day MBT (hp 1680, top plate 52 mm):
         200 * CFG.DMG.heat.heavy (1.20) = 240
         pen = 200 * CFG.PEN_PER_DMG.heat (5.2) = 1040 mm against 52 - clean
         * CFG.ASPECT_MUL.top (2.40) = 576 points. Thirty-four percent.
       vs a 1950s MBT (hp 910): the same 576. Sixty-three percent.
       vs a present-day IFV (hp 785, light): 200*1.05*2.40 = 504. Sixty-four.
       vs a 1950s IFV (hp 425): 504. Destroyed outright.
       vs an Ore Hauler (hp 1000, light): 504. Two mines kill it.
       vs infantry: NOTHING. Mines.threatens() refuses cat "infantry".
     detonate() passes shooter null, so there is no faction ammoQ and no
     veterancy multiplier. The figure is flat.

     AND THE REPAIR BILL IS NOT THE ARGUMENT. 576 points off an Abrams costs
     the player 69 credits at a depot at 0.12 a hit point, and nothing at all
     if they own a recovery vehicle. A mine's value is in outright kills and in
     taking a vehicle out of THIS engagement, never in the repair bill.

     THE DEFECT THIS IS REALLY ABOUT. Before this, ai.js contained no reference
     to Mines or G.mines anywhere: every field the player laid against this
     commander was free. A ten-mine row across a lane takes roughly 4,700
     points off a wave, and bookWave() commits a fourteen-vehicle wave at about
     11,000 - forty percent of a wave for 700 credits - and the commander came
     back down the same lane, because pickApproach's axis-variation term is
     multiplied by `fire` and `fire` comes from exposureAt(), which knows only
     emplacements. A mined lane with no gun on it scored as the safest road on
     the map. Worse, a mine that takes 576 off a 1,680-point tank writes no
     grave, so against heavy armour nothing was learned either.

     The first fix is FREE and it is not a purchase: mineWeight() into the
     approach score and into the stale gate, so the wave goes round. The
     machine is bought only when going round is not on offer.               */

  /* ---- the strike nobody fired ----
     A mine is the only weapon in this game that hurts you with nothing there
     to hurt you, and that is exactly what makes it readable. From inside our
     own fog a mine strike has a signature no other event has:

       - the victim is one of our own GROUND VEHICLES, or a surface hull.
         Mines.threatens() lets a mine touch nothing else: never infantry,
         because an anti-tank mine is set off by weight; never aircraft; and a
         sea mine only a surface ship. A rifle squad losing hit points to
         nobody is therefore never a mine.
       - lastHitBy is null. Combat.applyDamage writes the shooter onto the
         victim and Mines.detonate calls it with null, because there is none.
       - it is the ONLY thing of ours hurt at that spot in this digest window.
         The three other null-shooter sources in the game - an off-map fire
         mission, a superweapon, and the ammunition detonation of one of our
         own tanks (95 points across 46 px) - all catch several units at once
         over a wide area. A mine catches one vehicle, once.
       - our own threat field says nothing there can reach us. A single
         remembered at_gun stamps about 25 points a second onto its cells
         (140 dmg * 0.85 acc / 4.6 s reload * 0.95 against heavy), so a floor
         of 3 is comfortably "we know of nothing that covers this ground".
       - and none of ours died within a tile and a half in the same window,
         which is the ammunition-detonation case: that is our own tank going
         up, not a mine. graves is in time order, so the scan stops at two
         seconds.

     Five terms, every one read off our own units and our own remembered
     picture. Nothing here touches G.mines. This commander infers a minefield
     the way a staff officer does - from its own casualty reports - and it does
     that whether or not it owns a single detector. */
  function noteMineHits(hits, now) {
    if ((D.read || 0) < 0.35) return;        // a Recruit keeps no casualty file
    if (!hits.length) return;
    for (let i = 0; i < hits.length; i++) {
      const h = hits[i];
      let alone = true;
      for (let k = 0; k < hits.length && alone; k++)
        if (k !== i && U.dist(hits[k].x, hits[k].y, h.x, h.y) < CFG.TILE * 4) alone = false;
      if (!alone) continue;
      if (exposureAt(h.x, h.y, 1) > 3) continue;
      let ourOwn = false;
      for (let k = graves.length - 1; k >= 0; k--) {
        if (graves[k].t < now - 2) break;
        if (U.dist(graves[k].x, graves[k].y, h.x, h.y) < CFG.TILE * 1.5) { ourOwn = true; break; }
      }
      if (ourOwn) continue;
      /* Fold into the nearest existing report rather than growing ten entries
         for one belt: a minefield is a place, not an event. */
      let s = null;
      for (const q0 of mineSigns)
        if (!!q0.sea === !!h.sea && U.dist(q0.x, q0.y, h.x, h.y) < CFG.TILE * 3.5) { s = q0; break; }
      if (s) {
        s.x = (s.x * s.n + h.x) / (s.n + 1);
        s.y = (s.y * s.n + h.y) / (s.n + 1);
        s.n++; s.t = now;
      } else {
        mineSigns.push({ x: h.x, y: h.y, t: now, n: 1, sea: !!h.sea });
        if (mineSigns.length > MINE_MEM) mineSigns.shift();
      }
    }
  }

  /* ---- the mines we are entitled to see ----
     The ONLY legal read of G.mines on this side, and it goes through the same
     door the human's does. Mines.visibleTo(m, P) is the identical call
     render3d.js makes with G.human before it draws anything, and Mines.lay
     seeds m.seen with the owner alone - so a hostile mine enters this list
     only when one of our own units with def.mineDetect has been inside its
     detection radius, or when it has already gone off, at which point
     detonate() spots it for every player because a crater is not a secret.

     Walking G.mines raw would be the purest form of the cheat this file has
     spent its life removing: a minefield is invisible BY DEFINITION and the
     whole weapon is the not-knowing. It would also make the 900-credit mine
     clearer pointless, since its entire contribution is that it turns mines
     into entries in this list.

     Memoised on the think tick because mineWeight() walks it once per approach
     candidate and there are up to ten of those per wave. */
  function knownMines() {
    if (typeof Mines === "undefined" || !G.mines || !G.mines.length) return NO_MINES;
    if (knownMT === G.time && knownM) return knownM;
    knownMT = G.time;
    knownM = [];
    for (const m of G.mines) {
      if (m.dead || m.owner === P || G.allied(m.owner, P)) continue;
      if (!Mines.visibleTo(m, P)) continue;
      knownM.push(m);
    }
    return knownM;
  }

  /* ---- how dangerous this ground is because of mines ----
     The same currency as graveWeight, so the approach scorer can add the two
     and compare them. Two sources, deliberately different in kind.

     INFERRED (mineSigns): places where our own vehicles were hurt by nothing.
     One strike is 576 points off a heavy or 504 off a light - two thirds of a
     present-day IFV and the whole of a 1950s one - so one confirmed strike is
     worth about half a tank, and the weight is capped at four because a report
     of ten is still one belt.

     DETECTED (knownMines): mines we can actually see, through the same test
     the renderer applies for the human. Worth more than an inferred one
     because we know precisely where it is rather than roughly where one went
     off - which is the whole of what a mine clearer's 3.4-tile mineDetect
     buys, and where most of its 900 credits is really earned.

     Both decay, on the same life as a grave and for a sharper reason: a belt
     does not move but it is SPENT, because a mine fires once. A field that
     cost us a wave three wave-intervals ago may be bare ground now, and a
     commander that treats a minefield as permanent has been denied a road for
     ever by ten credits' worth of scrap. */
  function mineWeight(px, py, now) {
    const life = Math.min(600, (D.waveTime || 150) * 3), R = CFG.TILE * 6;
    let w = 0;
    for (let i = mineSigns.length - 1; i >= 0; i--) {
      const s = mineSigns[i];
      const age = now - s.t;
      if (age > life) { mineSigns.splice(i, 1); continue; }
      const d = U.dist(px, py, s.x, s.y);
      if (d > R) continue;
      w += Math.min(4, s.n) * (1 - age / life) * (1 - d / R);
    }
    for (const m of knownMines()) {
      const d = U.dist(px, py, m.x, m.y);
      if (d < R) w += 1.5 * (1 - d / R);
    }
    return w;
  }

  /* ---- how much of our own perimeter is actually covered ----
     The mirror of exposureAt, and it has to be a separate function because
     exposureAt is stamped from seenB - the ENEMY's works - and there is no
     honest way to ask it about ours. This one reads P.buildings directly,
     which is not intelligence at all: where our own guns stand is our own
     business.

     gunProfile() is reused verbatim so the figures are the live weapon tables
     and never a transcription. What falls out of that matters here more than
     anywhere else in the file: at_gun reaches 8.6 tiles for about 25 points a
     second against armour, nest_mg reaches 6.0 for almost nothing against it
     (bullet is 0.06 against heavy), and flak and sam return NO PROFILE AT ALL,
     because their weapons declare tgt.ground 0. A commander that counted
     buildings would think a SAM belt held an arc; one that reads the weapon
     table knows a ground wave walks straight through it. That is the whole
     reason this is a weapon walk and not a count.

     Only completed structures count. A gun still under construction cannot
     shoot, and treating a foundation as a covered arc is exactly how a
     commander talks itself out of the one belt it needed. */
  function ownCoverAt(px, py, hardShare) {
    const hs = hardShare === undefined ? 0.8 : hardShare;
    let f = 0;
    for (const b of P.buildings) {
      if (b.dead || b.buildProgress < 1 || b.cat !== "defense") continue;
      const g = gunProfile(b.def.id);
      if (!g) continue;
      const d = U.dist(px, py, b.x, b.y) / CFG.TILE;
      if (d > g.reach || d < g.minRange) continue;
      f += g.hard * hs + g.soft * (1 - hs);
    }
    return f;
  }

  /* ---- where the belt goes: the approach we are NOT holding ----
     Not a ring, and not the bearing itself. bearing() already returns the
     recency-and-tier-weighted centroid of every point where our own things
     have been shot - the direction trouble genuinely comes from - and it has
     exactly one reader in this file, findSpotToward, which uses it to aim a
     gun. Putting mines on that same bearing would be the obvious mistake: that
     arc is where the guns already are, and a mine inside an anti-tank post's
     envelope kills something the post was going to kill anyway.

     What a minefield is FOR is economy of force - it holds the sector you have
     no troops for. So this walks the ring, prices each bearing by our OWN
     cover, and returns the cheapest one an attacker coming from the direction
     of trouble could plausibly use: within 75 degrees of bearing(), because a
     belt behind our own base is a belt facing a wall.

     THE RADIUS IS DERIVED. One load is ten mines. autolay spaces a land layer
     1.6 tiles apart, and a mine kills within 0.55 tiles plus 0.35 of the
     victim's own radius - 0.72 tiles for a 16 px tank - so two adjacent mines
     cover 1.45 of the 1.6-tile pitch and a single row is about a ninety
     percent barrier to anything driving across it. Ten mines is therefore
     sixteen tiles of continuous frontage, and sixteen tiles is a ninety-degree
     arc at radius 16/(pi/2) = 10.2 tiles. Ten is also right on its own terms:
     CFG.BUILD_RADIUS is 11, so the belt sits at the edge of our own footprint
     where every road in has already converged, instead of twenty tiles out
     where the same ten mines cover a third of the frontage, or forty out where
     they cover a sixth.

     Two rejections that are not scoring terms because they are absolute.
     Ground a tank cannot drive over is not a belt - and autolay's reachability
     flood fill would drop those points SILENTLY and leave the layer standing
     with a full rack, so the test has to happen here where a different bearing
     is still available. And ground we have already seeded is not a belt
     either: Mines.tileMined's no-double-mining rule means payloadCovered would
     skip every point and the load would come home untouched. A belt MOVES; it
     does not thicken. */
  function gapSector() {
    if (typeof Mines === "undefined" || !G || !G.map) return null;
    const b = bearing();
    if (!b) return null;
    const TL = CFG.TILE, M = G.map;
    const trouble = Math.atan2(b.y - P.homeY, b.x - P.homeX);
    let best = null;
    for (let k = -5; k <= 5; k++) {
      const a = trouble + k * (U.PI2 / 24);        // 15 degrees apart, +/- 75
      const cx = P.homeX + Math.cos(a) * BELT_R * TL;
      const cy = P.homeY + Math.sin(a) * BELT_R * TL;
      const tx = U.clamp((cx / TL) | 0, 1, M.W - 2), ty = U.clamp((cy / TL) | 0, 1, M.H - 2);
      if (!GameMap.passable(M, tx, ty, "ground")) continue;
      if (G.tileBlocked && G.tileBlocked(tx, ty, null)) continue;
      const cov = ownCoverAt(cx, cy, 0.8);
      const have = Mines.countNear(G, P, cx, cy, 7);
      const score = cov + have * 4 + Math.abs(U.angDiff(a, trouble)) * 6;
      if (!best || score < best.score)
        best = { score, a, cov, have, x: cx, y: cy, tx, ty };
    }
    return best;
  }

  /* ---- is a road actually being denied to us? ----
     A signature on its own is not a reason to buy a machine. A wave that lost
     one vehicle to a mine and then went round has already solved the problem
     for nothing, and mineWeight() in pickApproach is what makes it go round.
     MANOEUVRE IS FREE AND A MINE CLEARER IS 900 CREDITS, so this asks the only
     question that justifies the money: is the road we would take TODAY still
     carrying a field.

     lanes <= 2 is the separate case and the honest one - a corridor theatre,
     where pickApproach found only one or two bearings that are passable at all
     and there is simply nowhere to go round to. That is where a plough is
     bought, and it is the only place a plough is unarguable.

     Calling the approach scorer from a purchase decision couples the
     composition block to the wave planner, which this file has otherwise kept
     apart - siegeNeed is the one existing coupling and is documented as such.
     This is the second, and it is deliberate rather than accidental: it runs
     at most once every twelve seconds and only while no clearer exists. */
  function mineSignsHot() {
    if (!mineSigns.length) return false;
    let n = 0;
    for (const s of mineSigns) if (s.n >= 2 && !s.sea) n++;
    if (!n) return false;
    const t = warAim();
    if (!t) return false;
    const army = groundArmy();
    if (army.length < 4) return false;
    const ap = pickApproach(t, army);
    if (!ap) return false;
    if (ap.lanes <= 2) return true;
    const mid = { x: (ap.gate.x + t.x) / 2, y: (ap.gate.y + t.y) / 2 };
    return mineWeight(ap.gate.x, ap.gate.y, G.time) +
           mineWeight(mid.x, mid.y, G.time) > 1.5;
  }

  /* The vehicle that walks in front of the column. Not part of the army:
     groundArmy() excludes it for the same reason it excludes the scout - it
     carries an hmg and 820 hit points and that is not combat power. */
  function wavePoint() {
    if ((D.read === undefined ? 1 : D.read) < 1.0) return null;
    for (const u of P.units)
      if (!u.dead && u.layer === "ground" && u.def.mineDetect && u.def.mineClear) return u;
    return null;
  }

  /* ================= MINE WARFARE: the driver =================
     Called once a think, after the defences are queued and before the wave
     goes out, and it does nothing at all most of the time. That is the design.

     A minelayer is 700 credits, which is half a present-day MBT or four fifths
     of an IFV - about 800 hit points of vehicle that also shoots back. The
     belt has to beat that or the money belongs in the tank, and MOST OF THE
     TIME IT DOES NOT.

     WHEN IT DOES. The layer is not 700 credits for ten mines; it is 700
     credits for ten mines every ninety seconds, for ever. entities.js refills
     it free inside our own base radius at four seconds a mine, so the cycle is
     a forty-second stand, fifteen seconds each way to a belt ten tiles out at
     1.45 tiles a second, and eleven seconds of laying at 1.1 s a point. A
     ten-mine row is sixteen tiles of frontage that stops about nine of every
     ten vehicles crossing it, and each strike is 576 points off a heavy or 504
     off a light. Five vehicles across one belt is 2,700 points removed for 700
     credits. Better than three to one, and it repeats.

     WHEN IT DOES NOT, WHICH IS OFTEN, and all three of these are gates below:
       1. raidHeat. bearing() answers with intelHome() when it has no alarms,
          and that is where the enemy LIVES, not their line of march. A belt
          across a road nobody drives down is 700 credits of scrap, so the gate
          is the evidence of raiding and not the bearing.
       2. The vehicle share. Mines.threatens() refuses infantry outright, so
          against a rifle-heavy attacker a minefield is worth precisely
          nothing, and foeArms() already says so.
       3. The gap. If our own guns cover the trouble arc, the belt duplicates
          them and the money should have bought the fifth anti-tank post. And
          two completed defences are required first: a belt SUPPLEMENTS a
          perimeter, it never substitutes for one.
     None of this is a dice roll. */
  function driveMines(mineShort) {
    const rd = D.read === undefined ? 1 : D.read;
    if (rd < 0.6 || typeof Mines === "undefined") return;
    if (G.time < mineNext) return;
    mineNext = G.time + 12;

    const layers = unitsOf("minelayer");
    const clearers = unitsOf("mineclear");

    /* ---- put the load in the ground ---- */
    for (const u of layers) {
      if (u.order.type !== "idle" && u.order.type !== "guard") continue;
      if (u.mines <= 0) continue;              // entities.js is walking it home to rearm
      const gap = gapSector();
      if (!gap || gap.have >= 4) continue;
      /* Sixteen tiles long and one lattice step deep, laid across the
         approach. The lattice COUNTS rows and columns rather than stepping in
         from the edge, so a box 1.6 tiles deep yields exactly one row and one
         sixteen tiles long exactly ten columns: ten points for ten mines, one
         trip, one continuous barrier. A deeper box would be two rows of five
         and half the frontage, which is the wrong trade every time - a belt is
         bought by its width, not its depth.

         The area order is a rectangle in MAP AXES and cannot be rotated, so
         the bar is laid on whichever axis lies more nearly across the approach
         - the same choice driveBarrier already makes for a sonar line. On a
         bearing forty-five degrees off either axis the bar is up to 1.41 times
         longer than the frontage it actually covers. That costs coverage, not
         mines: the lattice still lays ten, and it is the price of not writing
         a second, rotated minelaying implementation. */
      const acrossY = Math.abs(Math.cos(gap.a)) >= Math.abs(Math.sin(gap.a));
      const half = CFG.TILE * 8, deep = CFG.TILE * 0.8;
      u.give({ type: "autolay",
               x0: gap.x - (acrossY ? deep : half), y0: gap.y - (acrossY ? half : deep),
               x1: gap.x + (acrossY ? deep : half), y1: gap.y + (acrossY ? half : deep) });
    }

    /* ---- buy one ---- */
    const nDef = P.buildings.filter(b => !b.dead && b.buildProgress >= 1 &&
                                    b.cat === "defense").length;
    const fa = foeArms();
    if (!mineShort && layers.length < (rd >= 1.0 ? 2 : 1) && !queueLen("vehicle") &&
        P.hasBuilding("factory") && nDef >= 2 && P.cash > 1600 &&
        raidHeat >= 6 && (foeVehSeen() >= 2 ||
                          (fa.seen >= 3 && (fa.sArmour + fa.sLight) >= 0.35))) {
      const gap = gapSector();
      /* cov < 6 is under a quarter of one anti-tank gun, which makes about 25
         points a second against armour. A bearing carrying one fewer nest than
         its neighbour is not a hole; a bearing carrying nothing is. */
      if (gap && gap.cov < 6 && gap.have < 4 && tryBuildUnit("minelayer")) return;
    }

    /* ---- the sweeper ----
       Bought only when going round is not on offer, which is what
       mineSignsHot() asks. And when it is bought its job is mineDetect 3.4
       feeding the planner, not mineClear 1.7 ploughing a lane, because a
       clearer moving at column speed cannot plough: Mines.update needs
       clearT >= 2.2 seconds, so at 1.25 tiles a second a mine only dies within
       1.00 tile of the centreline and the swept lane is two tiles wide against
       a fourteen-vehicle column that is far wider. */
    if (rd >= 0.8 && !mineShort && !clearers.length && !queueLen("vehicle") &&
        P.hasBuilding("factory") && P.cash > 1800 && mineSignsHot() &&
        tryBuildUnit("mineclear")) return;

    /* ---- and where to put it ----
       On the route the enemy uses most, and bearing() IS that route by
       construction. A clearer with no wave to lead sweeps our own approach
       lane - the same sixteen-tile bar as the belt, but ON the bearing rather
       than in the gap, because a player who mines anything mines the ground
       our waves and our haulers leave from.

       And it must be an AUTOSWEEP box, not a patrol, because of the figure
       above. On an autosweep order it is a different machine: the lattice
       dwells 1.2 s at every point 1.53 tiles apart, so the effective advance
       is 0.63 tiles a second, the chord needed falls to 1.39 tiles, and the
       swept lane is 3.1 of the 3.4. The area order is not a convenience here;
       it is the only way the vehicle works. */
    for (const u of clearers) {
      if (u.order.type !== "idle" && u.order.type !== "guard") continue;
      if (attackWave.indexOf(u) >= 0) continue;    // it is leading a wave
      const b = bearing();
      if (!b) continue;
      const a = Math.atan2(b.y - P.homeY, b.x - P.homeX);
      const cx = P.homeX + Math.cos(a) * BELT_R * CFG.TILE;
      const cy = P.homeY + Math.sin(a) * BELT_R * CFG.TILE;
      const acrossY = Math.abs(Math.cos(a)) >= Math.abs(Math.sin(a));
      const half = CFG.TILE * 8, deep = CFG.TILE * 1.6;
      u.give({ type: "autosweep",
               x0: cx - (acrossY ? deep : half), y0: cy - (acrossY ? half : deep),
               x1: cx + (acrossY ? deep : half), y1: cy + (acrossY ? half : deep) });
    }
  }

  /* ---------- the brain ---------- */
  function think() {
    placeReady();

    const nPower = P.countBuilding("power");
    const nRef = P.countBuilding("refinery");
    const harv = count(u => u.def.harvester);
    const nBar = P.countBuilding("barracks");
    const nFac = P.countBuilding("factory");
    const nRadar = P.countBuilding("radar");
    const nLab = P.countBuilding("lab");
    const nAir = P.countBuilding("airbase");
    const nYard = P.countBuilding("navalyard");
    const bq = q("building"), dq = q("defense");

    /* -------- RE-EQUIP PLAN --------
       Decided before anything is bought, so the rest of the tick knows there
       is a generation to pay for. Only adopted if this commander could
       actually finish it: past its own ceiling or its nation's procurement
       limit, with no derrick to refill a reserve it has already burned, or
       with a vault too small to hold the price, the money and the fuel belong
       to the army instead. */
    eraStep = null; eraNeedSilo = false;
    if (nLab >= 1 && P.eraProgress <= 0 && G.time > eraNextT) {
      const st = P.eraStepInfo();
      if (st) {
        let ceil = st.reachCap;
        if (P.eraCap && eraIndex(P.eraCap) < eraIndex(ceil)) ceil = P.eraCap;
        /* buysFuel() is the third way to pay for the barrels: a commander
           with no node of their own still has a standing purchase running, so
           the step is reachable and worth reserving cash for. */
        if (eraIndex(st.to) <= eraIndex(ceil) &&
            (P.oil >= st.oil || P.countBuilding("derrick") >= 1 || P.buysFuel())) {
          /* earn() discards everything above the storage ceiling, so a step
             dearer than the vault can never be banked: build tankage first */
          if (P.storageCap() >= st.cost + 500) eraStep = st; else eraNeedSilo = true;
        }
      }
    }

    /* -------- BUILD ORDER --------
       Held behind the haulers. enqueue() checks prerequisites but not the
       bank, and updateQueues then drains every credit that arrives into
       whatever is at the head of the building queue - so a commander short of
       harvesters would pour its entire income into a power plant and never buy
       the hauler that would have paid for it. That stall was invisible while a
       subsidy was topping the bank up; without one it is terminal, and it is
       exactly the mistake a beginner makes. The refinery is exempt, because
       with no refinery there is nothing for a hauler to deliver to. */
    /* ---- the mine has first call on the money ----
       Measured across the six tiers developing undisturbed, the ladder ran
       BACKWARDS at the top: Elite finished with three harvesters and 8,700
       credits of base where Commander had seven and 23,600, and Warlord was
       worse still. The cause is that the harder tiers spend earlier and more
       often - the tech hoard starts at 330/D.tech seconds, which is 194s for a
       Warlord against 550s for a Recruit, and a faster think cadence commits to
       more defences per minute. Both bite while the economy is still one
       refinery and two haulers, and a commander that cannot afford its second
       refinery is capped at two haulers for the rest of the match: a poverty
       trap it entered by being "better". So the mining fleet is funded before
       defences and before the tech programme, at every tier. */
    const harvWant = Math.min(Math.round(5 * (D.econBias || 1) * (D.econ || 1)),
                              Math.max(2, nRef * 2));
    const mineShort = nRef >= 1 && harv < Math.ceil(harvWant * 0.6);
    const harvFloor = Math.min(2, Math.max(1, nRef * 2));
    const starving = nRef >= 1 && harv < harvFloor && P.cash < 2200;
    if (!bq.items.length && !bq.ready.length && !starving) {
      const can = (id) => !(failCool[id] > G.time);
      const tryB = (id) => can(id) && P.enqueue("building", id);
      if (P.powerRatio() < 1.15) tryB("power");
      else if (nRef < 1) tryB("refinery");
      else if (nBar < 1) tryB("barracks");
      else if (nPower < 2) tryB("power");
      else if (nFac < 1) tryB("factory");
      else if (!groundConnected && nYard < 1 && can("navalyard") && findShoreSpot() && P.cash > 1600) tryB("navalyard");
      else if (nRef < 2 && can("refinery") && P.cash > (mineShort ? 1200 : 1800)) tryB("refinery");
      else if (nRadar < 1 && P.cash > 1400) tryB("radar");
      /* ---- fuel is the other economy ----
         Three derricks was a flat cap, and a commander with a full bank and an
         empty fuel reserve simply stopped buying anything that costs barrels.
         Measured: a fully developed Warlord sat on 25,237 credits for the last
         quarter of an hour of a battle and could not buy a 34-barrel air
         defence vehicle, because it had eleven. Money it cannot spend is worth
         nothing; another well is worth a great deal. */
      else if (P.countBuilding("derrick") <
                 ((P.oil < 70 && P.cash > 3500) || (eraStep && P.oil < eraStep.oil) ? 6 : 3) &&
               can("derrick") && findOilSpot() && P.cash > 1200) tryB("derrick");
      /* fuel and vault space are the other half of a generational step */
      else if (eraNeedSilo && P.countBuilding("silo") < 4 && can("silo") && P.cash > 700) tryB("silo");
      else if (nYard < 1 && can("navalyard") && findShoreSpot() && P.cash > 2400 / (D.navalBias || 1)) tryB("navalyard");
      else if (nLab < 1 && nRadar >= 1 && P.cash > 1900) tryB("lab");
      else if (nAir < 1 && P.tech >= 2 && P.cash > 2600 / (D.airBias || 1)) tryB("airbase");
      else if (nAir < 2 && (D.airBias || 1) > 2 && P.cash > 3200) tryB("airbase");
      else if (nFac < 2 && groundConnected && P.cash > 3000) tryB("factory");
      else if (P.countBuilding("depot") < 1 && P.cash > 2000) tryB("depot");
      else if (nRef < (D.econ >= 1.2 ? 4 : 3) && can("refinery") && P.cash > 3500) tryB("refinery");
      else if (nPower < 4 && P.cash > 5000) tryB("power");
      /* ---- the electronic order of battle ----
         Both families sit HERE, at the end of the once-only ladder, and both
         are capped at one. Not in the threat-scaled defence roll below: that
         builds a PROPORTION of each emplacement against a shortfall in an arm,
         has no concept of a cap, and the single most important fact about a
         jamming station is that a second one does nothing - G.jamAgainst and
         G.jamAt take the WORST bubble over a point and never the sum. And not
         before nPower < 4 either: these draw 45 to 130 against a power plant's
         120, so a commander that bought one on a thin grid would brown out its
         own base and, through needPower, the new structure with it.

         Gated on D.radar, the same doctrine knob the electronic-warfare block
         at the unit end already uses, so a Recruit and a Regular never buy
         one. structureFor() returns null where a nation has no such structure
         in this period - which is everybody before the 1980s, the PLA and the
         ROC before the 2000s, the KPA on the array axis for ever, and everyone
         but the KPA and PACT on the satellite axis. lockReason() then refuses
         it a second time through the fac gate, so the honest answer arrives
         twice over and neither path can leak. */
      else if (D.radar && P.tech >= 2 && nRadar >= 1 && P.cash > 2200 &&
               (function () {
                 for (const sr of ["ewsite", "gpsjam"]) {
                   const id = structureFor(P.faction, sr, P.era);
                   if (!id) continue;
                   /* countBuilding sees placed structures and readyCount sees
                      one that is built and waiting for ground; without both,
                      the window between the two buys a second station. */
                   if (P.countBuilding(id) + P.readyCount("building", id) > 0) continue;
                   if (P.cash < P.factionCost(BUILDINGS[id]) + 600) continue;
                   /* try the next srole rather than giving up: a PACT
                      commander in e20 owns both an SPN-4 and a Murmansk-BN
                      slot, and a failed siting on one must not block the
                      other. */
                   if (tryB(id)) return true;
                 }
                 return false;
               })()) { /* enqueued above */ }
      else if (D.radar && P.tech >= 3 && nLab >= 1 && P.cash > 4200 &&
               (function () {
                 const id = structureFor(P.faction, "lpar", P.era);
                 if (!id) return false;
                 if (P.countBuilding(id) + P.readyCount("building", id) > 0) return false;
                 return tryB(id);
               })()) { /* enqueued above */ }
      /* ---- saturated: money is not the constraint any more ----
         Both commanders used to pin at their storage ceiling from about the
         half-hour mark and stay there for the rest of the game, throwing away
         every credit earned after that, because the build list stopped at two
         factories and three refineries. Fifty-seven percent of games never
         resolved. Once the bank has been full for a while the caps come off:
         more production, more storage, and D.rebuild - another knob that was
         declared on every difficulty and never read - decides how far. */
      else if (saturated > 45) {
        const push = 2 + Math.round(2 * (D.rebuild || 1));
        if (nFac < push && groundConnected) tryB("factory");
        else if (nBar < Math.max(2, push - 1)) tryB("barracks");
        else if (nAir < 2 && P.tech >= 2 && can("airbase")) tryB("airbase");
        else if (P.countBuilding("silo") < 4 && can("silo")) tryB("silo");
        else if (nRef < 5 && can("refinery")) tryB("refinery");
        else if (nPower < 7) tryB("power");
      }
    }

    /* -------- DEFENSES (scale with threat) -------- */
    if (!dq.items.length && !dq.ready.length && P.cash > 1000 && !mineShort) {
      const nDef = P.buildings.filter(b => !b.dead && b.cat === "defense").length;
      const wanted = Math.round((2 + Math.floor(G.time / 200) + (D.aggro >= 1.3 ? 2 : 0))
                                * (D.defenceBias || 1));
      if (nDef < wanted) {
        /* The same defect as the army roll, in the other direction: this was
           a G.rng() against fixed thresholds, so a commander being raided by
           armour built machine-gun nests a third of the time and one being
           bombed built anti-tank guns. The picture answers it directly - a
           nest is 1.00 against infantry and 0.06 against heavy armour, an
           anti-tank gun is the mirror of that, and flak and sam cannot touch
           the ground at all - and bearing() already decides which side of the
           base to put the thing on. Shortfall against a wanted mixture, not a
           ladder, so a commander that has four nests and no gun buys the gun. */
        const fa = foeArms(), rd = D.read === undefined ? 1 : D.read;
        const airSeen = U.clamp(fa.air / 3, 0, 1);
        const jit = 0.22 * (1 - rd);
        const cand = [
          { id: "nest",   w: 0.30 + 0.90 * fa.sInf * rd,   ok: P.hasBuilding("barracks") },
          { id: "atpost", w: 0.30 + 1.10 * (fa.sArmour + fa.sLight * 0.5) * rd,
            ok: P.hasBuilding("factory") },
          { id: "flak",   w: 0.12 + 1.20 * airSeen * rd,   ok: P.hasBuilding("radar") },
          { id: "sam",    w: 0.06 + 0.90 * airSeen * rd,
            ok: P.hasBuilding("lab") && P.tech >= 3 },
        ];
        let tot = 0;
        for (const c of cand) if (c.ok) tot += c.w;
        let pickDef = null, bestGap = 0.02;
        for (const c of cand) {
          if (!c.ok || tot <= 0) continue;
          const have = P.buildings.filter(b => !b.dead && b.def.id === c.id).length;
          const gap = c.w / tot - (nDef ? have / nDef : 0) +
                      (jit ? (G.rng() - 0.5) * jit : 0);
          if (gap > bestGap) { bestGap = gap; pickDef = c.id; }
        }
        if (pickDef) P.enqueue("defense", pickDef);
        else if (P.hasBuilding("factory")) P.enqueue("defense", "atpost");
      }
    }

    /* -------- TECH SAVINGS PLAN --------
       after the opening, hoard cash for the lab and the tech programmes
       instead of bleeding everything into tier-1 units                    */
    saveTarget = 0;
    if (!mineShort && G.time > 330 / ((D.techBias || 1) * (D.tech || 1))) {
      if (nLab < 1 && nRadar >= 1) saveTarget = 1900;
      else if (nLab >= 1 && P.tech < 2 && !queueLen("upgrade")) saveTarget = 2100;
      else if (nLab >= 1 && P.tech < 3 && P.oil > 90 && !queueLen("upgrade") && G.time > 720) saveTarget = 3600;
    }
    /* a generational step is hoarded for exactly like a tech programme, with a
       margin so the production queues cannot shave the last few hundred
       credits off the price every time the bank creeps up to it */
    if (eraStep) saveTarget = Math.max(saveTarget, eraStep.cost + 400);

    /* -------- TECH -------- */
    if (nLab >= 1 && !queueLen("upgrade")) {
      /* never hoard toward a tier this commander is not allowed to reach */
      const cap = P.techCap === undefined ? 3 : P.techCap;
      if (P.tech < 2 && cap >= 2 && P.cash > 2100) P.enqueue("upgrade", "tech2");
      else if (P.tech < 3 && cap >= 3 && P.oil >= 90 && P.cash > 3600) P.enqueue("upgrade", "tech3");
      /* a marginal combat upgrade does not outrank a whole generation of
         equipment, and it is bought with fuel the step needs */
      else if (P.cash > 3800 && !eraStep) {
        for (const ug of ["ap", "armor", "optics", "drive"])
          if (!P.upgrades[ug]) { P.enqueue("upgrade", ug); break; }
      }
    }

    /* -------- PROSPECTING --------
       A hauler may only be routed to ore this commander has actually seen, the
       same rule the player's haulers obey. That leaves one hole: a commander
       that can see no ore at all has nowhere to send anybody, earns nothing,
       and therefore never builds the scout that would have found some. So it
       prospects - it drives a hauler at the nearest ground nobody has looked
       at yet. That is searching, not seeing. */
    if (nRef >= 1) {
      let knowOre = false;
      const M = G.map;
      for (let i = 0; i < M.ore.length && !knowOre; i++)
        if (M.ore[i] >= 20 && look[i] !== 0 && !G.occ[i]) knowOre = true;
      if (!knowOre) {
        const idleHarv = P.units.find(u => !u.dead && u.def.harvester &&
          (u.order.type === "idle" || u.order.type === "harvest") && !u.load);
        if (idleHarv) {
          const hx = (P.homeX / CFG.TILE) | 0, hy = (P.homeY / CFG.TILE) | 0;
          let goal = null;
          for (let r = 8; r < 60 && !goal; r += 4) {
            for (let a = 0; a < 24; a++) {
              const an = (a / 24) * U.PI2 + G.rng();
              const tx = (hx + Math.cos(an) * r) | 0, ty = (hy + Math.sin(an) * r) | 0;
              if (tx < 1 || ty < 1 || tx >= M.W - 1 || ty >= M.H - 1) continue;
              if (look[ty * M.W + tx] !== 0) continue;
              if (!GameMap.passable(M, tx, ty, "ground")) continue;
              goal = { x: (tx + 0.5) * CFG.TILE, y: (ty + 0.5) * CFG.TILE };
              break;
            }
          }
          if (goal) idleHarv.give({ type: "move", x: goal.x, y: goal.y });
        }
      }
    }

    /* -------- BROKE, WITH NO WAY TO EARN --------
       This is what the 22-credits-a-second subsidy was really for: a commander
       whose harvesters are dead and whose bank is empty can never buy the
       harvester that would fix it, and sits there for the rest of the match.
       The honest way out is the one the player has - sell something. A silo
       with nothing to store, or a power plant beyond the current load, is
       worth more as the 50% refund that puts a hauler back on the ore. */
    if (harv <= (nRef >= 2 ? 1 : 0) && P.cash < 1100 && !queueLen("vehicle") && nRef >= 1) {
      const spare = [];
      for (const b of P.buildings) {
        if (b.dead || b.buildProgress < 1) continue;
        if (b.def.id === "silo") spare.push({ b, rank: 0 });
        else if (b.def.id === "power" && nPower > 1) spare.push({ b, rank: 1 });
        else if (b.def.id === "depot") {
          /* The Service Depot is the recovery vehicle's PREREQ, and selling it
             for 450 credits locks the workshop out of production through
             lockReason. While one is alive and the ledger says it is earning -
             damage is turning into write-offs - that trade is 450 credits
             against the repair capacity of an 800-credit vehicle already paid
             for, and it is a bad one. Once TWO are alive the army carries its
             own workshop and the depot really is the right thing to sell, so
             it moves ahead of the surplus power plant. */
          const arvN = count(u2 => u2.def.repairRate && u2.layer === "ground");
          if (arvN >= 2) spare.push({ b, rank: 0.5 });
          else if (!(arvN >= 1 && repairLedger().kill >= 0.12)) spare.push({ b, rank: 2 });
        }
      }
      spare.sort((a, z) => a.rank - z.rank);
      if (spare.length && G.sellBuilding) {
        G.sellBuilding(spare[0].b);
        return;
      }
    }

    /* -------- ECONOMY UNITS -------- */
    /* ---- how big a mining fleet this commander runs ----
       Difficulty touched nothing economic at all, so the harder tiers paid for
       more scouts, faster reconsideration and more defences out of the same
       income as a Recruit - and measured over nine minutes of undisturbed
       development they came out POORER and one tech tier behind. A better
       commander is one that mines harder, which is also the only honest way
       to be richer than the player. */
    const harvCap = Math.round(5 * (D.econBias || 1) * (D.econ || 1));
    if (harv < nRef * 2 && harv < harvCap && !queueLen("vehicle") &&
        P.cash > (harv === 0 ? 200 : 900))
      P.enqueue("vehicle", "harvester");

    /* -------- ARMY COMPOSITION -------- */
    /* Scouts are excluded: a reconnaissance vehicle that gets swept into the
       attack wave stops scouting and dies in the first exchange. */
    const army = groundArmy();
    const wantSize = (groundConnected ? D.waveSize : Math.max(6, (D.waveSize * 0.7) | 0)) +
      Math.floor(G.time / 240) * 2;

    if (army.length < wantSize) {
      /* Both queues used to be a G.rng() against fixed thresholds and not one
         term in either expression came from the picture, so the same mixture
         went out against a tank corps, a militia and a fortified line. It is
         a reading of the plot now, and a shortfall picker rather than a
         ladder - a ladder can only say "roll this often", never "we need more
         of this than we have", which is why the old block could not recover
         from losing its anti-tank teams. */
      const mix = counterMix(foeArms());
      /* A commander that priced the approach, found it shut and then queued
         another IFV has learned nothing. This is the one line of coupling the
         wave code needs from here. */
      if (G.time - siegeNeed < 120 && P.tech >= 2) {
        mix.veh.spg = (mix.veh.spg || 0) + 0.45;
        if (P.tech >= 3) mix.veh.mlrs = (mix.veh.mlrs || 0) + 0.30;
      }
      if (queueLen("infantry") < 2) buildToward(mix.inf, army, "infantry");
      if (queueLen("vehicle") < 2 && nFac >= 1) buildToward(mix.veh, army, "vehicle");
      /* Eyes. The scouting block below looks for a unit of role "recon" and
         "recon" appeared on no build list in the file, so there was never one
         to find and the commander has never scouted at all. It did not need to
         while it could read the enemy's object lists directly; it does now. */
      if (unitsOf("recon").length < (D.scouts || 1) && queueLen("vehicle") < 2)
        tryBuildUnit("recon");
      /* The supply truck used to be bought here, at one per six of army and
         inside this `army.length < wantSize` gate. Three defects, and the gate
         was the worst of them: once the army reached strength no truck was
         ever replaced, so the full-size wave out on the map that had just lost
         its only truck was exactly the one that could never buy another. The
         ratio also read nothing - an army sitting at home is inSupply() by
         inBaseRadius, which is eleven tiles from ANY owned structure, and was
         still being sold a 700-credit truck per six men - and "one per six" is
         a claim about a truck that EXISTS rather than one that is pumping,
         since supply:900 at 16/s empties in fifty-six seconds of serving. It
         is re-derived in logisticsBuy() off supplyStrain() and off the fuel a
         wave needs to come home on, and it is no longer gated on strength.

         What is left here is the field workshop, which belongs on this side of
         the gate: it is bought only while the army is under strength, so it is
         never bought INSTEAD of the tanks it exists to mend. */
      if (!mineShort && wantRecovery(army) && tryBuildUnit("repair")) return;
    }

    /* -------- RE-EQUIP --------
       Moving the whole force a generation forward. The gate is the price of
       the step plus a working float, not a flat 6,000: the 1950s step costs
       2,600, and 6,000 is more than a one-refinery bank can even hold. The
       money is here because the savings plan above kept it. */
    if (eraStep && P.cash >= eraStep.cost + 400 && P.eraLockReason() === null) {
      if (P.startEraAdvance()) {
        /* a breather between generations, so the force is rebuilt around the
           new equipment rather than re-equipped on paper */
        eraNextT = G.time + eraStep.time + 75;
        eraStep = null;
        return;
      }
    }

    /* -------- OFF-MAP FIRE SUPPORT --------
       Called on the densest cluster of enemy the commander can actually see,
       and only where its own radar covers the ground - the AI plays under the
       same observation rule the player does. */
    if (typeof SUPPORT !== "undefined" && P.oil > 40) {
      for (const key in SUPPORT) {
        const m = SUPPORT[key];
        if (m.fac !== P.faction) continue;
        /* a fire mission is one bombardment and costs 35-110 barrels; a step
           is the whole army. Fuel promised to the step is not burned here. */
        if (eraStep && P.cash >= eraStep.cost && P.oil - m.oil < eraStep.oil) continue;
        if (G.supportReady(P, key)) continue;
        const spot = bestStrikePoint(m);
        if (!spot) continue;
        if (G.callFireSupport(P, key, spot.x, spot.y) === null) return;
      }
    }

    /* -------- AIRBORNE EARLY WARNING --------
       One AEW aircraft is worth more than a squadron: it sees low-observable
       targets no fighter radar will find and hands the track to every shooter
       on the datalink. A commander with any air force at all wants one. */
    if (D.air && P.tech >= 3 && P.hasBuilding("airbase") && P.hasBuilding("lab") &&
        fielded("aircraft", d => d.awacs) < 1 && queueLen("aircraft") < 2 && P.cash > 3600) {
      if (tryBuildUnit("awacs")) return;
    }

    /* -------- BUYING REACH --------
       The supply truck, the fleet oiler and the aerial tanker, each priced in
       credits against what operating beyond the chain is costing right now.
       Placed after the AEW programme deliberately - an AWACS is what makes an
       air force see at all and comes first - and ahead of the anti-submarine
       block, with the harvester-first rule still holding both back through
       P.cash and through mineShort. */
    if (logisticsBuy(mineShort)) return;

    /* -------- ANTI-SUBMARINE --------
       A surface group with no helicopter is close to blind against a modern
       diesel boat, so build one as soon as the enemy has anything submerged. */
    if (D.navy && P.tech >= 2 && P.hasBuilding("airbase") &&
        fielded("aircraft", d => d.role === "aswhelo") < 2 && queueLen("aircraft") < 3 &&
        P.cash > 1600) {
      /* Build the escort's helicopter because a boat has been DETECTED, not
         because one exists. This used to read every enemy's unit list for
         anything submerged - the purest form of the cheat, since a submerged
         boat is precisely the thing no sensor of ours can find. Sonar contact,
         or a torpedo in one of our hulls, is what puts it on the plot. */
      const dR = dossier[rival ? rival.idx : -1];
      const foeSub = !!(dR && dR.sawSub);
      if (foeSub && tryBuildUnit("aswhelo")) return;
    }

    /* -------- ELECTRONIC WARFARE: blind them, then kill the emitters -------- */
    if (D.radar && P.tech >= 2 && P.hasBuilding("radar")) {
      /* An emitting radar announces itself - that is what electronic support
         measures are for, and detecting a set you cannot see is legitimate.
         A switched-off dome behind a hill is not, and noteSighting only records
         one that G.emitting() says is radiating. */
      const dR2 = dossier[rival ? rival.idx : -1];
      const foeRadar = !!(dR2 && dR2.sawRadar);
      if (foeRadar) {
        if (fielded("vehicle", d => d.jam) < 1 && queueLen("vehicle") < 3 && P.cash > 1700)
          tryBuildUnit("ewveh");
        else if (P.tech >= 2 && nAir >= 1 && fielded("aircraft", d => d.role === "sead") < 1 &&
                 queueLen("aircraft") < 2 && P.cash > 2200) tryBuildUnit("sead");
        else if (D.stealth && P.tech >= 3 && nAir >= 1 && fielded("aircraft", d => d.role === "ewair") < 1 &&
                 queueLen("aircraft") < 2 && P.cash > 3200) tryBuildUnit("ewair");
      }
    }

    /* -------- AREA AIR DEFENCE --------
       Bought against aircraft this commander has actually had on its own plot,
       never against a count of the enemy hangar: peakAir is the high-water mark
       of contacts held at once, the same figure the fighter force is sized
       against. One battery once anything has flown over us, two once that is an
       air force, three only against a real air campaign. tryBuildUnit answers
       false where a nation has no launcher in this period, which is the correct
       and automatic answer for the KPA before the present day, the ROC before
       the 2000s, and everybody in the 1950s. */
    if (P.tech >= 3 && P.hasBuilding("radar") && P.hasBuilding("lab") &&
        queueLen("vehicle") < 3 && !mineShort) {
      const dAD = dossier[rival ? rival.idx : -1];
      const airSeen = (dAD && dAD.peakAir) || 0;
      const wantSam = airSeen >= 5 ? 3 : airSeen >= 2 ? 2 : airSeen >= 1 ? 1 : 0;
      if (unitsOf("sam").length < wantSam && tryBuildUnit("sam")) return;
    }

    /* -------- BALLISTIC LAUNCHERS --------
       Gated on D.superweapon exactly as the missile silo is, so a Recruit,
       a Regular and a Veteran never field one. */
    if (D.superweapon && P.tech >= 3 && nLab >= 1 && nFac >= 1 &&
        queueLen("vehicle") < 3 && !mineShort) {
      const telCap = 1 + ((D.artyBias || 1) > 2 ? 1 : 0);     // a Gun Line fields two
      if (unitsOf("tel").length < telCap && tryBuildUnit("tel")) return;
    }

    /* -------- SENSORS: radar vehicles make everything else shoot straight -------- */
    if (D.radar && P.hasBuilding("radar") && fielded("vehicle", d => d.radar) < 2 &&
        queueLen("vehicle") < 3 && P.cash > 1400) tryBuildUnit("radarv");

    /* -------- AIR FORCE -------- */
    if (nAir >= 1 && queueLen("aircraft") < 2) {
      const helos = count(u => u.def.role === "gunship");
      const fighters = count(u => u.def.role === "fighter") + count(u => u.def.role === "stealthfighter");
      /* Size the fighter force against the most enemy aircraft we have ever had
         on the plot at once, not against an exact count of their hangar. */
      const dA = dossier[rival ? rival.idx : -1];
      const humanAir = (dA && dA.peakAir) || 0;
      /* ---- luxuries wait for the mine ----
         A stealth bomber is 4,200 credits and a stealth fighter 2,800, and the
         first tier that unlocks them is Elite. Measured over nine minutes of
         undisturbed development, an Elite commander finished with THREE
         harvesters and 8,700 credits of base where a Commander one tier up had
         seven and 23,600: it was buying the exquisite aircraft out of the money
         that should have been buying the mining fleet, and ended the weakest
         commander in the game despite being the fourth of six. A good player
         does not buy a strategic bomber while half the ore field is untouched. */
      const harvWant = Math.min(Math.round(5 * (D.econBias || 1) * (D.econ || 1)),
                                Math.max(2, nRef * 2));
      const minedOut = count(u => u.def.harvester) >= Math.ceil(harvWant * 0.7);
      if (minedOut && D.stealth && P.tech >= 3 && P.cash > 4000 &&
          fielded("aircraft", d => d.role === "stealthbomber") < 1) tryBuildUnit("stealthbomber");
      else if (minedOut && D.stealth && P.tech >= 3 && P.cash > 2800 &&
          fielded("aircraft", d => d.role === "stealthfighter") < 2) tryBuildUnit("stealthfighter");
      else if (fighters < Math.min(3, humanAir) && P.tech >= 2) tryBuildUnit("fighter");
      else if (helos < 3 && P.tech >= 2) tryBuildUnit("gunship");
      else if (P.tech >= 3 && fielded("aircraft", d => d.role === "cas") < 2) tryBuildUnit("cas");
    }

    /* -------- STRATEGIC WEAPONS -------- */
    if (D.superweapon && P.tech >= 3 && nLab >= 1 && !dq.items.length && !dq.ready.length) {
      if (!P.hasBuilding("missilesilo") && P.cash > 3800) P.enqueue("defense", "missilesilo");
      else if (P.hasBuilding("missilesilo") && !P.hasBuilding("nukesilo") &&
               P.cash > 6400 && P.oil > 160) P.enqueue("defense", "nukesilo");
    }
    for (const b of P.buildings) {
      if (b.dead || !b.def.superweapon || b.swCharge < 1) continue;
      const t = pickStrikeTarget();
      if (t) G.launchSuperweapon(b, t.x, t.y);
    }

    /* -------- NAVY -------- */
    if (nYard >= 1 && queueLen("naval") < 2) {
      /* landing craft first on split maps */
      if (!groundConnected && fielded("naval", d => d.amphib) < 2 && P.cash > 1200) tryBuildUnit("transport_sea");
      /* The tender is bought before the dice cascade, because a hull that does
         not sink is worth more than the next corvette, and it is bought on a
         measurement rather than on a roll. */
      if (wantTender() && tryBuildUnit("repair_sea")) return;
      /* The cap counted landing craft, the oiler, the minesweeper and the
         tender itself, so buying any one of them silently cost the fleet a
         warship's slot - which is the exact opposite of the intended effect on
         a split-map theatre where the transports already eat two of six. */
      const ships = P.units.filter(u => !u.dead && (u.layer === "sea" || u.layer === "sub") &&
        u.def.weapons.length && !u.def.amphib && !u.def.supply && !u.def.repairRate &&
        u.def.role !== "minesweeper" && u.def.role !== "navminelayer");
      if (ships.length < Math.round((groundConnected ? 6 : 9) * (D.navalBias || 1))) {
        const r = G.rng();
        /* a carrier with an empty deck is a very expensive target: fill it */
        const decks = P.units.reduce((n, u) => n + (!u.dead && u.def.carrier ? u.def.carrier : 0), 0);
        if (decks > 0) {
          const embarked = count(u => u.layer === "air" && u.def.carrierCapable);
          if (embarked < decks && P.cash > 1800 && queueLen("aircraft") < 2) {
            if (tryBuildUnit("cstealth") || tryBuildUnit("cfighter")) return;
          }
        }
        if (r < 0.3) tryBuildUnit("corvette");
        else if (r < 0.5 && P.tech >= 2) tryBuildUnit("destroyer");
        else if (r < 0.65 && P.tech >= 2) tryBuildUnit("sub");
        else if (r < 0.8 && P.tech >= 2) tryBuildUnit("missileboat");
        else if (P.tech >= 3 && r < 0.9) tryBuildUnit("cruiser");
        else tryBuildUnit("patrol");
      }
    }

    /* -------- ARTILLERY: counter-battery + shoot-and-scoot -------- */
    for (const u of P.units) {
      if (u.dead || !u.isIndirect || !u.isIndirect()) continue;
      /* NOT the ballistic launchers. srbm_* rounds carry indirect:true, so
         isIndirect() is true of every TEL we own, and this used to stamp the
         counter-battery stance on them - which sends a 3,400-credit launcher
         driving at an enemy launcher plot in nine-second bursts, and generates
         a fresh ballistic contact of its own on the way for the enemy array to
         plot. A TEL answers the ballistic-launcher block, not this one. */
      if (D.radar && u.def.role !== "tel" && u.stance !== "counterbattery" &&
          attackWave.indexOf(u) < 0)
        u.stance = "counterbattery";
      /* Displace after a few salvos so we are not there when the reply lands.
         Counted per salvo, on the edge. It used to add 0.02 per think tick and
         wait for 3, which is 150 consecutive thinks - four unbroken minutes of
         firing from one spot - so no gun in any game ever displaced once. */
      u._salvos = u._salvos || 0;
      const firing = (u.order.type === "bombard" ||
                      (u.order.type === "attack" && u.cooldowns.some(c => c > 0)));
      if (firing && !u._wasFiring) u._salvos++;
      u._wasFiring = firing;
      if (u._salvos > Math.max(2, Math.round(6 - 4 * (D.micro || 0.4))) && !u._moving2) {
        u._salvos = 0; u._moving2 = true;
        const a = G.rng() * U.PI2, d = CFG.TILE * (5 + G.rng() * 4);
        u.give({ type: "move", x: u.x + Math.cos(a) * d, y: u.y + Math.sin(a) * d });
        G.defer(6, () => { u._moving2 = false; });
      }
    }

    /* -------- KEEPING THE BASE STANDING --------
       Building.update() mends any structure whose `repairing` flag is set and
       charges the owner for it, which is what the player's repair cursor
       toggles. Nothing on this side ever set it, so an AI base only ever lost
       hit points: every raid it survived was permanent damage, and a structure
       shelled twice fell to an attack that should not have been enough. */
    if (D.repairBase !== false) {
      const wantAt = D.repairAt || 0.85;
      for (const b of P.buildings) {
        if (b.dead || b.buildProgress < 1) continue;
        /* A low floor on purpose: repair bills 0.30 a hit point as it goes and
           this commander habitually runs its bank at nearly nothing, so a
           four-figure gate meant the flag was never once set in a real game. */
        b.repairing = b.hp < b.maxHp * wantAt && P.cash > 150;
      }
    }

    driveAirDefence();
    driveLaunchers();
    driveBarrier();
    /* Standing-orders drivers, not purchases, so they run every think tick
       whatever was bought. Both self-gate on D.read and driveMines keeps its
       own twelve-second clock, so at Recruit and Regular this is a comparison
       and a return. */
    logisticsStation();
    driveMines(mineShort);

    /* -------- SCOUTING -------- */
    if (scoutT <= 0) {
      scoutT = D.scoutT || 32;
      /* Somewhere worth looking, rather than a uniformly random point on the
         map. The old version threw a dart at the whole theatre - and since
         nothing was ever learned from where it landed, it did not matter.
         Now: unexamined deployment sites first, because that is where an enemy
         base actually is; then the stalest ground, weighted against the drive. */
      const scout = unitsOf("recon").find(u => u.order.type === "idle");
      if (scout) {
        const goal = scoutGoal(scout);
        if (goal) scout.give({ type: "move", x: goal.x, y: goal.y });
      }
    }

    /* -------- ATTACK WAVES -------- */
    /* This filter was the only line in the file that has ever seen a wave
       casualty, and it threw the information away. reapWave keeps it. */
    reapWave();
    navalWave = navalWave.filter(u => !u.dead);

    if (waveT <= 0 && army.length >= wantSize * 0.8) {
      if (groundConnected) { waveT = D.waveTime; launchGroundWave(army); }
      else if (amphib.state === "idle") { waveT = D.waveTime; startAmphib(army); }
    }
    if (!groundConnected) runAmphib();
    /* naval bombardment group */
    /* A countermeasures vessel is not a member of a bombardment group, and
       neither is a tender or an oiler. navgun_57 makes the minesweeper pass
       the weapons test, so a 1,300-credit sweeper was being sent to shell a
       naval yard. */
    const fleet = P.units.filter(u => !u.dead && (u.layer === "sea" || u.layer === "sub") &&
      u.def.weapons.length && !u.def.supply && !u.def.repairRate &&
      u.def.role !== "minesweeper" && u.def.role !== "navminelayer" &&
      navalWave.indexOf(u) < 0);
    if (fleet.length >= 4 && G.rng() < 0.3) launchNavalWave(fleet);

    /* ---- air sorties ----
       This asked for order type "hover", and nothing ever puts an aircraft
       there: a new airframe is delivered shut down on its ramp, and one that
       comes home to rearm parks again. "hover" is only reached by finishing a
       move order the commander never issued. So every fighter, gunship, CAS
       aircraft and bomber the AI has ever bought sat on the apron for the
       whole match, and the air force existed only as a bill. */
    for (const a of P.units) {
      if (a.dead || a.layer !== "air") continue;
      const idle = a.order.type === "hover" || a.order.type === "parked" ||
                   a.order.type === "idle";
      if (!idle) continue;
      /* ---- the aircraft that carry no weapons ----
         An early-warning aircraft, a tanker or a transport was skipped here for
         having an empty weapons list, so the most expensive airframe in the
         game - a 3,400-credit E-3 whose whole purpose is to be airborne - was
         bought and then left standing on the apron for the entire battle,
         seeing nothing. An AWACS on the ground is a very costly tent. Put it up
         and keep it back: it orbits over our own side of the line, where its
         radar covers the approaches without offering itself to the enemy. */
      if (!a.def.weapons.length) {
        if (a.fuel < a.reserveFuel()) continue;
        if (!a.def.awacs) continue;      // transports wait for a task
        /* The tanker used to be flown from here too, onto the same station as
           the AWACS - a third of the way to the enemy. Those two aircraft want
           opposite things. An early-warning aircraft wants to be BACK, where
           its radar covers the approaches without offering itself; a tanker is
           worth nothing at all unless it is closer to the receivers' break-off
           point than their own runway is, which is the entire test at the
           tanker branch of updateAir(). logisticsStation() flies it, against a
           standoff computed from the enemy's air defence rather than from a
           threat field that cannot see a SAM. */
        const at = intelHome(rival);
        /* a third of the way to the enemy, not over them */
        const ox = at ? P.homeX + (at.x - P.homeX) * 0.30 : P.homeX;
        const oy = at ? P.homeY + (at.y - P.homeY) * 0.30 : P.homeY;
        a.give({ type: "cap", x: ox, y: oy });
        continue;
      }
      if (!(a.ammo > a.ammoMax * 0.6)) continue;
      /* enough in the tanks to get there and get home, the same reserve the
         airframe applies to itself when it decides to scramble */
      if (a.fuel < a.reserveFuel()) continue;
      const tgt = pickAirTarget(a);
      if (tgt) { a.give({ type: "attack", target: tgt }); continue; }
      /* Nothing held on radar. A fighter takes station over the objective and
         acquires for itself; a strike aircraft sweeps armed towards it. Sitting
         on the apron because the plot is momentarily empty is how an air force
         is wasted. */
      const sweep = airSweepPoint();
      if (!sweep) continue;
      /* An armed sweep is an order to acquire, and a held round may not
         acquire, so a Weasel flown out on one burns the fuel and lands full.
         An electronic-attack aircraft is the opposite case: its jamming bubble
         asks only that it be airborne and not parked, so it is worth flying
         with every round on the rail - but NOT over the objective, which is
         where the enemy air defence is. Stood off at 45% of the way there, the
         same shape as the AWACS branch above; ew_n's bubble is 9.5 tiles, so a
         partial advance still covers the approach. */
      if (a.allWeaponsHeld && a.allWeaponsHeld()) {
        if (a.def.jam) a.give({ type: "cap",
                                x: P.homeX + (sweep.x - P.homeX) * 0.45,
                                y: P.homeY + (sweep.y - P.homeY) * 0.45 });
        continue;
      }
      a.give(a.def.role === "fighter"
        ? { type: "cap", x: sweep.x, y: sweep.y }
        : { type: "attackmove", x: sweep.x, y: sweep.y });
    }

    /* keep the wave pushing */
    /* A siege line must not be re-issued an attackmove at the objective, or
       the guns drive into the emplacements they were sent out to stand off
       from - and the screen walks in with them. */
    const gt = groundTarget();
    if (attackWave.length) {
      if (gt && gt.mode === "siege" && gt.stand) runSiege(gt);
      else driveWave(attackWave, gt);
    }
    const nt = navalWave.length ? navalTarget() : null;
    if (nt) driveWave(navalWave, nt);
    /* The two workshops are station-keepers and not wave members, so they are
       driven here rather than through driveWave: a plain move to where the
       damage is, never an attackmove at the objective. */
    driveRecovery(gt);
    driveTender(nt);

    /* defence reflex: anything hostile near home pulls idle army in */
    defendBase(army);
  }

  /* ================= amphibious operations ================= */
  /* ---- choosing a beach ----
     This used to take the nearest SAND tile to groundTarget() that touched
     water and connected overland, and stop there. Since the objective is
     chosen for being worth taking, and anything worth taking is defended,
     "nearest sand to the objective" is a formal procedure for landing directly
     under the guns.

     It is worse than it sounds. The run-in is made in an lst, which declares
     weapons:[] - it carries no weapon at all - with a light hull and six units
     aboard, and a Coastal Battery throws a 210-point HE shell 13.5 tiles at
     0.80 against light armour. A landing craft inside that envelope is not in
     a fight, it is in a queue.

     So beaches are scored rather than sorted, in the same credits the
     objective scorer uses: fire at the landing point, fire over the water we
     have to sit in to unload, and the march from the beach to the objective. A
     quiet beach and a long walk beats a hot beach at the front door. A
     remembered coastal battery covering either point is a veto and not a
     penalty, because there is no landing to be made under one - and an alarm
     out at sea stands in for one we have never actually seen, because an LST
     that got shot at has found a coastal battery whether or not anybody
     looked at it. Path.find is the expensive part and the old loop ran one for
     every sand tile it touched; it runs on the six beaches in contention. */
  const BEACH_DWELL = 14;
  function findBeach(obj) {
    const map = G.map, T2 = CFG.TILE;
    const hb = obj || warAim();
    if (!hb) return null;
    const htx = (hb.x / T2) | 0, hty = (hb.y / T2) | 0;
    const cand = [];
    for (let r = 3; r < 40 && cand.length < 24; r += 2) {
      for (let a = 0; a < 24; a++) {
        const ang = a / 24 * U.PI2;
        const tx = (htx + Math.cos(ang) * r) | 0, ty = (hty + Math.sin(ang) * r) | 0;
        if (tx < 1 || ty < 1 || tx >= map.W - 1 || ty >= map.H - 1) continue;
        if (map.terrain[ty * map.W + tx] !== T.SAND) continue;
        const sea = Path.nearest(map, tx, ty, "sea", null, 3);
        if (!sea) continue;
        const lx = tx * T2 + 16, ly = ty * T2 + 16;
        const sx = sea.x * T2 + 16, sy = sea.y * T2 + 16;
        let vetoed = false, dps = 0;
        for (const b of seenB.values()) {
          if (b.gone) continue;
          const g = gunProfile(b.key);
          if (!g) continue;
          const R2 = Math.pow(g.range * T2, 2);
          if (U.dist2(b.x, b.y, lx, ly) >= R2 && U.dist2(b.x, b.y, sx, sy) >= R2) continue;
          if (b.key === "coastal") { vetoed = true; break; }
          dps += g.hard * 0.5 + g.soft * 0.5;
        }
        if (vetoed) continue;
        /* something shot one of ours out here and we never saw what */
        for (const al of alarms)
          if (U.dist2(al.x, al.y, sx, sy) < Math.pow(T2 * 6, 2)) { vetoed = true; break; }
        if (vetoed) continue;
        dps = Math.max(dps, exposureAt(lx, ly, 0.5), exposureAt(sx, sy, 0.5));
        const march = U.dist(lx, ly, hb.x, hb.y) / T2;
        cand.push({ landX: lx, landY: ly, seaX: sx, seaY: sy, tx, ty,
                    score: -(dps * BEACH_DWELL / HP_CR) - march * 40 });
      }
    }
    if (!cand.length) return null;
    cand.sort((a, b) => b.score - a.score);
    for (let i = 0; i < Math.min(6, cand.length); i++) {
      const c = cand[i];
      const walk = Path.find(map, c.tx, c.ty, htx, hty, "ground", null);
      if (!walk || !walk.length) continue;
      const we = walk[walk.length - 1];
      if (U.dist(we.x, we.y, htx, hty) > 6) continue;
      return c;
    }
    return null;
  }

  function startAmphib(army) {
    const lsts = P.units.filter(u => !u.dead && u.def.amphib);
    if (!lsts.length) return;
    /* the beach is chosen against a KNOWN aim, so the landing keeps marching
       at the objective it was planned for even if the aim later moves */
    const obj = warAim();
    if (!obj) return;
    const beach = findBeach(obj);
    if (!beach) return;
    /* staging point: sea near our own shore */
    const yard = G.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
    if (!yard) return;
    amphib.state = "loading";
    amphib.lsts = lsts.slice(0, 3);
    amphib.beach = beach;
    amphib.obj = obj;
    amphib.cargoPlan = army.filter(u => u.layer === "ground" && !u.def.supply)
      .slice(0, amphib.lsts.length * 6);
    /* bring boats to shore near the yard; troops walk to them */
    for (const l of amphib.lsts) l.give({ type: "move", x: yard.x, y: yard.y + CFG.TILE * 2 });
    for (let i = 0; i < amphib.cargoPlan.length; i++) {
      const u = amphib.cargoPlan[i];
      const l = amphib.lsts[i % amphib.lsts.length];
      u.give({ type: "enter", target: l });
    }
    amphib.timer = 75;                     // give loading over a minute, then go with what we have
  }

  function runAmphib() {
    if (amphib.state === "idle") return;
    amphib.lsts = amphib.lsts.filter(l => !l.dead);
    if (!amphib.lsts.length) { amphib.state = "idle"; return; }
    amphib.timer -= 1.6;

    if (amphib.state === "loading") {
      const loaded = amphib.lsts.reduce((n, l) => n + l.cargo.length, 0);
      const plan = (amphib.cargoPlan || []).filter(u => !u.dead);
      const allAboard = plan.length > 0 && plan.every(u => u.carried || u.dead);
      if (allAboard || amphib.timer <= 0 || loaded >= amphib.lsts.length * 5) {
        if (loaded === 0) { amphib.state = "idle"; return; }
        amphib.state = "sailing";
        for (const l of amphib.lsts)
          l.give({ type: "move", x: amphib.beach.seaX, y: amphib.beach.seaY });
        /* escort: any idle warships come along */
        for (const s2 of P.units) {
          if (s2.dead || s2.layer !== "sea" || s2.def.amphib || !s2.def.weapons.length) continue;
          if (s2.order.type === "idle")
            s2.give({ type: "attackmove", x: amphib.beach.seaX, y: amphib.beach.seaY });
        }
      }
    } else if (amphib.state === "sailing") {
      let anyClose = false, allIdle = true;
      for (const l of amphib.lsts) {
        const d = U.dist(l.x, l.y, amphib.beach.seaX, amphib.beach.seaY);
        if (d < CFG.TILE * 3.5) {
          anyClose = true;
          if (l.cargo.length) { l.unload(); }
        }
        if (l.order.type !== "idle") allIdle = false;
      }
      if (anyClose || amphib.timer < -40) {
        /* troops ashore: attack */
        const t = amphib.obj || groundTarget();
        for (const l of amphib.lsts) if (!l.cargo.length && anyClose) l.give({ type: "move", x: P.homeX, y: P.homeY });
        let joined = false;
        /* six units off a landing craft are the last force in the game that
           should be sent at a position the main body has decided to shell */
        if (t) for (const u of (amphib.cargoPlan || []))
          if (!u.dead && !u.carried) {
            if (t.mode === "siege" && t.stand) u.give({ type: "guard", x: t.stand.x, y: t.stand.y });
            else u.give({ type: "attackmove", x: t.x, y: t.y });
            if (attackWave.indexOf(u) < 0) { attackWave.push(u); joined = true; }
          }
        /* re-book, or a landing joining mid-assault raises the denominator
           after the fact and masks a wave that is in fact losing */
        if (joined) bookWave();
        if (amphib.lsts.every(l => !l.cargo.length) || amphib.timer < -60) amphib.state = "idle";
      }
    }
  }

  /* ---- manoeuvre ----
     D.micro runs from 0.2 at Recruit to 1.0 at Warlord and was declared on
     every difficulty tier and never read once, which meant every commander in
     the game drove straight at the enemy no matter how good it was supposed
     to be. That is not a small omission: the armour model pays two to three
     times for a shot into the side or rear, and nothing in the game was ever
     collecting it. Difficulty was a money and tempo handicap only.

     A skilled commander therefore peels part of its wave off and sends it
     round. The flanking group is routed through a waypoint set well off the
     axis of advance, so it arrives across the enemy's side rather than its
     front. How large that group is, and how wide it swings, both scale with
     micro.

     The body is unchanged, but `from` is no longer the front door: it is the
     approach gate the wave has actually been sent to, so the hook now swings
     off the CHOSEN axis rather than off the permanent home-to-objective line
     that was the whole of the old plan. */
  function flankPoint(from, to, side, width) {
    const dx = to.x - from.x, dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    /* perpendicular, out to `width` tiles, at the two-thirds mark */
    const px = -dy / len, py = dx / len;
    const T = CFG.TILE;
    let x = from.x + dx * 0.62 + px * side * width * T;
    let y = from.y + dy * 0.62 + py * side * width * T;
    const M = G.map;
    x = U.clamp(x, T, (M.W - 2) * T);
    y = U.clamp(y, T, (M.H - 2) * T);
    return { x, y };
  }

  /* ---- choosing a way in ----
     `const from = { x: P.homeX, y: P.homeY }` was the whole of the old axis.
     Every wave, for the whole battle, built its line from the front door to
     the objective; flankPoint then offset a quarter of the wave perpendicular
     to that same line on a coin-flip side, and nothing was remembered between
     waves. The player fortifies one approach and the commander walks into it
     again.

     It is worse than "the same line". Path.find costs each step as
     DIRS[d][2]/speedAt(), CFG.TERRAIN road speed is 1.45 against grass 1.00,
     and GameMap.carveRoad lays exactly ONE road - between the two start
     positions. A* therefore actively pulls the column onto the single strip of
     ground the human most wants to mine. The one route was not an illusion:
     the map generator and the path cost function conspire to produce it.

     Gates are put on a ring around the OBJECTIVE, not around home, because the
     fortification is at the far end and that is where the bearings have to be
     told apart. The rose is rotated by a random phase every wave, so the
     candidates never fall on the same compass points twice.

     Only the last leg is sampled: the long approach march is not where the
     guns are, and pathing every candidate properly would cost an A* apiece -
     Path.find allocates 145 kB of typed arrays and may expand 26,000 nodes,
     and twelve of those per wave per commander is exactly the cost the budget
     forbids. A sample on impassable ground rejects the candidate outright,
     which is the cheap way to refuse a route across a bay without pathing it.

     Note what `dark` does: samples of ground we have NEVER overlooked are
     penalised, and the penalty SHRINKS as micro rises. An unscouted flank is
     by definition the one the human has not fortified, so a good commander is
     willing to gamble on it and a poor one takes the road it already knows.
     That is difficulty buying nerve instead of numbers.

     And `stale` - the penalty for reusing a recent bearing - is multiplied by
     how much fire that bearing is actually under. A line that WORKED once is a
     line that will be fortified before it is used twice, so avoiding it is
     right; but on a theatre with one land corridor and nothing defending it,
     manufacturing variety for its own sake is walking in circles. */
  const AXIS_MEM = 3;
  function pickApproach(t, wave) {
    const M = G.map, TL = CFG.TILE, now = G.time;
    const skill = D.micro === undefined ? 0.4 : D.micro;
    let hard = 0;
    for (const u of wave) if (u.armor === "heavy" || u.armor === "light") hard++;
    const hardShare = wave.length ? hard / wave.length : 1;

    const K = skill >= 0.6 ? 10 : 6;
    const Rg = (10 + 4 * skill) * TL;
    const phase = G.rng() * U.PI2 / K;
    let best = null, lanes = 0;
    for (let k = 0; k < K; k++) {
      const a = phase + k * U.PI2 / K;
      let gx = t.x + Math.cos(a) * Rg, gy = t.y + Math.sin(a) * Rg;
      let tx = U.clamp((gx / TL) | 0, 1, M.W - 2), ty = U.clamp((gy / TL) | 0, 1, M.H - 2);
      if (!GameMap.passable(M, tx, ty, "ground")) {
        const n = Path.nearest(M, tx, ty, "ground", null, 5);
        if (!n) continue;                        // no way in on this bearing at all
        tx = n.x; ty = n.y; gx = (tx + 0.5) * TL; gy = (ty + 0.5) * TL;
      }
      const N = 6;
      let fire = exposureAt(gx, gy, hardShare), slow = 0, unseen = 0, blocked = false;
      for (let s = 1; s <= N; s++) {
        const f = s / N;
        const px = gx + (t.x - gx) * f, py = gy + (t.y - gy) * f;
        const sx = U.clamp((px / TL) | 0, 0, M.W - 1), sy = U.clamp((py / TL) | 0, 0, M.H - 1);
        if (!GameMap.passable(M, sx, sy, "ground")) { blocked = true; break; }
        fire += exposureAt(px, py, hardShare);
        slow += 1 - Math.min(1, GameMap.speedAt(M, sx, sy, "ground"));
        if (staleness(sx, sy, now) > 1e8) unseen++;
      }
      if (blocked) continue;                     // the leg crosses water or rock
      lanes++;
      fire /= (N + 1);
      const dead = graveWeight(gx, gy, now) +
                   graveWeight((gx + t.x) / 2, (gy + t.y) / 2, now);
      /* The free half of the mine doctrine, and the largest single win in it.
         Sampled on the same two points as the casualty return so the two are
         directly comparable, and it buys nothing: a wave that goes round a
         belt has solved the problem for no credits at all. */
      const mined = mineWeight(gx, gy, now) +
                    mineWeight((gx + t.x) / 2, (gy + t.y) / 2, now);
      let stale = 0;
      for (let i = 0; i < lastAxes.length; i++) {
        const d = Math.abs(U.angDiff(lastAxes[i], a));
        if (d < 0.62) stale += (1 - d / 0.62) * (1 - i / (AXIS_MEM + 1));
      }
      /* `fire` comes from exposureAt(), which is built from seenB and knows
         only emplacements, so a mined lane with no gun on it registered as
         perfectly cold - and the axis-variation term, multiplied by that zero,
         went to nothing. The commander reused the one road that had been
         killing it, for ever. A minefield is a reason to vary the axis
         whether or not anything is shooting. */
      stale *= Math.min(1, (fire + mined * 12) / 20);
      const trip = U.dist(P.homeX, P.homeY, gx, gy) / TL;
      const dark = unseen / N * (14 - 12 * skill);
      /* mined is calibrated against `dead`, not guessed at. graveWeight scales
         by cost/300, so one dead present-day MBT scores 4.75 * 9 = 42.8. Two
         mine strikes take 1152 points off heavy armour - 200 * 1.20 for heat
         against heavy, times 2.40 for ASPECT_MUL.top, because detonate() sets
         belly:true and the top plate is 52 mm against 540 of glacis - which is
         about 0.68 of that tank, or 29 points on the same scale. A signature
         with n=2 weighs 2.0, so 2.0 * 12 = 24. Deliberately on the LOW side:
         a mine fires once, and a spent belt must not deny a road for ever. */
      const score = fire * 0.30 + dead * 9 * skill + mined * 12 * skill +
                    stale * 26 * skill + slow * 3 + dark + trip * 0.55;
      if (!best || score < best.score)
        best = { score, a, exposure: fire, gate: { x: gx, y: gy }, tx, ty, hardShare };
    }
    if (best) best.lanes = lanes;
    return best;
  }

  /* ---- when there is no better road ----
     The threat field is in damage per second, so the crossing has a price, and
     once that price approaches the wave's own hit points the answer is not a
     cleverer line of approach - it is counter-battery, and the weapon tables
     say so plainly. An spg's howitzer reaches 20.4 tiles where at_gun reaches
     7.5 and nest_mg 6.0, so the emplacement holding the road shut cannot
     answer at all, and the MLRS at 23.2 puts a ripple of frag onto a cluster
     of nests from further out still. Even the howitzer bunker's 16.0 is short
     of both - which is why the refusal below is written as a range comparison
     and not as a list of building ids: the comparison stays true when the
     ranges move.

     A commander with no tube artillery leaves a timestamp instead and lets the
     wave go. That timestamp is what the composition block reads to start
     buying guns, because analysing a defence is only useful if it changes what
     gets built. */
  function beginSiege(t, ap) {
    /* a lorry in the open is not a position to be besieged */
    if (!t || t.raid || t !== aim) return false;
    const tubes = P.units.filter(u => !u.dead && u.isIndirect && u.isIndirect() &&
                                      u.def.role !== "tel");
    if (tubes.length < 2) { siegeNeed = G.time; return false; }
    /* the one emplacement contributing most of the fire on the chosen leg */
    const mid = ap ? { x: (ap.gate.x + t.x) / 2, y: (ap.gate.y + t.y) / 2 } : { x: t.x, y: t.y };
    const hs = ap ? ap.hardShare : ourHardShare();
    let blocker = null, worst = 0, deepest = 0;
    for (const r of seenB.values()) {
      if (r.gone) continue;
      const g = gunProfile(r.key);
      if (!g) continue;
      const d = Math.min(U.dist(r.x, r.y, mid.x, mid.y), U.dist(r.x, r.y, t.x, t.y));
      if (d > g.range * CFG.TILE) continue;
      if (g.reach > deepest) deepest = g.reach;
      const w = g.hard * hs + g.soft * (1 - hs);
      if (w <= worst) continue;
      worst = w; blocker = r;
    }
    if (!blocker) return false;
    /* our own deepest tube has to actually outrange the position, or standing
       off is only a slower way of losing the guns */
    let reach = 0;
    for (const u of tubes) for (const wn of u.def.weapons) {
      const w = WEAPONS[wn];
      if (w && w.tgt && w.tgt.ground && w.range > reach) reach = w.range;
    }
    if (reach < deepest + 2.5) { siegeNeed = G.time; return false; }
    siegeAt = { x: blocker.x, y: blocker.y, t: G.time };
    aim.mode = "siege"; aim.reach = deepest;
    aim.stand = siegePoint({ x: t.x, y: t.y, reach: deepest });
    runSiege(aim);
    return true;
  }

  /* Standing off and shelling. The tubes are given `bombard`, which closes to
     85% of its own weapon range by itself and therefore halts at about
     seventeen tiles - outside every emplacement in the game, the howitzer
     bunker included. Everything else guards the standoff point as a screen, which
     is also what keeps the wave-freeze guard honest: every unit in attackWave
     leaves this function with an order. Re-issued from think() each tick to
     anything that has gone idle, so a bombard order timing out does not send
     the battery wandering. */
  function runSiege(t) {
    const now = G.time;
    const spot = siegeAt && now - siegeAt.t < 90 ? siegeAt : { x: t.x, y: t.y };
    for (const u of attackWave) {
      if (!u || u.dead) continue;
      if (u.isIndirect && u.isIndirect() && u.def.role !== "tel") {
        if (u.order.type !== "bombard")
          u.give({ type: "bombard", x: spot.x, y: spot.y, until: now + 30 });
        continue;
      }
      if (u.order.type === "idle" || u.order.type === "guard" ||
          u.order.type === "attackmove") {
        if (U.dist(u.x, u.y, t.stand.x, t.stand.y) > CFG.TILE * 4 || u.order.type !== "guard")
          u.give({ type: "guard", x: t.stand.x, y: t.stand.y });
      }
    }
    /* the guns that are NOT in the wave help too - there is no reason to keep
       a battery at home while the road is being opened */
    for (const u of P.units) {
      if (u.dead || attackWave.indexOf(u) >= 0) continue;
      if (!(u.isIndirect && u.isIndirect()) || u.def.role === "tel") continue;
      if (u.order.type === "idle" || u.order.type === "guard")
        u.give({ type: "bombard", x: spot.x, y: spot.y, until: now + 30 });
    }
  }

  function launchGroundWave(army) {
    /* Find the objective BEFORE committing anybody to it. The army used to be
       moved into attackWave first and the target looked up afterwards, so a
       tick with no target left every one of those units sitting in the wave
       list with no order at all - and because the list is only ever pruned of
       the dead, and defendBase skips anything already in it, they stayed inert
       for the rest of the match. */
    const t = groundTarget();
    if (!t) { waveT = 12; return; }                 // look again shortly
    attackWave = army.slice(0, D.waveSize + 6);
    /* ---- the supply truck no longer marches with the assault ----
       It used to be pushed into attackWave here and then handed the same
       attackmove as the tanks, which drives an unarmed 600-hit-point vehicle
       into the objective alongside the lead tank. (It does not FREEZE there -
       acquire() calls canTarget(), and canTarget over an empty weapons list is
       false, so an unarmed vehicle never acquires and never reaches engage()'s
       wi < 0 branch. It simply arrives, at the front, with the assault.) It is
       driven by logisticsStation() instead, three and a half tiles behind the
       wave centroid on the bearing home - inside CFG.SUPPLY_RANGE 4.5 of the
       body, so the whole wave stays inSupply(), and behind the leading edge.
       Being out of attackWave also keeps bookWave() counting combat hit points
       only, and stops reapWave() writing a 700-credit grave at the objective
       that teaches the approach chooser to fear a road that killed a lorry.

       The mine clearer is the opposite case and IS attached, because its whole
       contribution is to be in front: mineDetect 3.4 is a 6.8-tile lane of
       mines that become entries in knownMines(), and a detected mine is one
       mineWeight() prices for nothing next wave. It is not counted as combat
       power - groundArmy() excludes it the way it excludes the scout - and it
       is the slowest thing in the column at 1.25 tiles a second, so the
       speed-sorted flank cut below can never pick it. */
    const lead = wavePoint();
    if (lead && attackWave.indexOf(lead) < 0) attackWave.push(lead);
    bookWave();
    const skill = D.micro === undefined ? 0.4 : D.micro;

    /* warAim already priced this position as one we can outrange and decided
       to take it apart rather than walk into it */
    if (t.mode === "siege" && t.stand) { runSiege(t); return; }

    /* Below about a third there is no manoeuvre and no map reading either: a
       poor commander simply advances, which is what EVERY commander used to do
       and which is all a Recruit should manage. It still writes graves - the
       casualty return costs nothing - it simply never reads them. */
    if (!(skill >= 0.35 && attackWave.length >= 6)) {
      for (const u of attackWave) u.give({ type: "attackmove", x: t.x, y: t.y });
      lastAxes.length = 0;
      return;
    }
    /* bearings are relative to the objective, so a new objective makes the old
       ones meaningless. The graves are absolute positions and survive. */
    if (lastAimId !== t.id) { lastAxes.length = 0; lastAimId = t.id; }

    const ap = pickApproach(t, attackWave);
    if (!ap) { for (const u of attackWave) u.give({ type: "attackmove", x: t.x, y: t.y }); return; }

    /* Price the crossing: what the field says is falling on the last leg times
       how long the wave is under it. `learned` is the correction - the field
       prices only what we can SEE, and the casualty return is how the
       commander finds out that reality has been worse than the plot. Never
       besieged when only one lane survived the passability test: on a
       one-corridor theatre every candidate is the same corridor, and holding
       the wave there would be a stall rather than a decision. */
    let hp = 0;
    for (const u of attackWave) hp += u.maxHp || 300;
    const legT = U.dist(ap.gate.x, ap.gate.y, t.x, t.y) / CFG.TILE / 1.2;
    const mid = { x: (ap.gate.x + t.x) / 2, y: (ap.gate.y + t.y) / 2 };
    const learned = 1 + Math.min(2, graveWeight(mid.x, mid.y, G.time) * 0.35);
    if ((D.read || 0) >= 0.55 && !t.raid && ap.lanes >= 2 &&
        ap.exposure * legT * learned > hp * 0.30 && beginSiege(t, ap)) {
      waveT = 25;                                 // look again soon: the field changes
      return;
    }

    /* one A*, on the chosen gate only, and only for a commander good enough to
       be routing wide - a mid-tier commander occasionally marching into a dead
       end is in character, and twelve of these per wave is not affordable */
    if (skill >= 0.6) {
      const p = Path.find(G.map, (P.homeX / CFG.TILE) | 0, (P.homeY / CFG.TILE) | 0,
                          ap.tx, ap.ty, "ground", null);
      if (!p || !p.length ||
          U.dist(p[p.length - 1].x, p[p.length - 1].y, ap.tx, ap.ty) > 6) {
        for (const u of attackWave) u.give({ type: "attackmove", x: t.x, y: t.y });
        return;
      }
    }

    lastAxes.unshift(ap.a);
    if (lastAxes.length > AXIS_MEM) lastAxes.length = AXIS_MEM;

    /* Two legs for the WHOLE wave, not just the hook. A single attackmove at
       the objective lets A* re-find the road no matter where the wave started;
       marching to a gate off to one side is what actually moves the column.
       The second leg reuses u.flankTo and driveFlankers, which have existed
       all along and only ever served the hook group. */
    for (const u of attackWave) {
      u.give({ type: "attackmove", x: ap.gate.x, y: ap.gate.y });
      u.flankTo = { x: t.x, y: t.y };
    }
    /* the fast and the thin-skinned come in from further round still, so the
       objective is taken from two bearings at once and the aspect multipliers -
       1.55 into the side, 2.10 into the rear - actually get collected */
    if (skill >= 0.6) {
      const share = 0.25 + 0.3 * skill;
      const cut = Math.max(2, Math.round(attackWave.length * share));
      const sorted = attackWave.slice().sort((a, b) => (b.def.speed || 1) - (a.def.speed || 1));
      const side = G.rng() < 0.5 ? -1 : 1;
      const wp = flankPoint(ap.gate, t, side, 5 + 7 * skill);
      for (const u of sorted.slice(0, cut)) u.give({ type: "attackmove", x: wp.x, y: wp.y });
    }
  }

  /* second leg: once a hooking unit reaches its waypoint, turn it in */
  function driveFlankers(dt) {
    /* ---- the clearer goes first, or it goes for nothing ----
       A mine clearer appended to attackWave and given the same attackmove as
       everybody else arrives LAST. It makes 1.25 tiles a second against an
       MBT's 1.53 and an IFV's 1.73, and the AI never sets groupSpeed - ui.js
       is the only thing in the game that does, and only for the human's move
       orders - so the column does not wait for it. Nine hundred credits of
       detector then walks over ground the wave has already cleared with its
       hulls.

       So the wave holds at its waypoint until the pathfinder is level with it.
       Note what that hold is buying: NOT a ploughed lane. mineClear is 1.7
       tiles but Mines.update() needs clearT >= 2.2 seconds, so a mine only
       dies if its chord through the radius is 2.2 times the vehicle's speed -
       2.75 tiles at 1.25 tiles a second, which happens only within 1.00 tile
       of the centreline. A clearer at road speed sweeps a lane TWO tiles wide,
       and a fourteen-vehicle column is far wider than that. What the hold buys
       is DETECTION LEAD TIME, and the eyes are the purchase.

       The dwell costs the wave a few seconds at the gate. That is real, which
       is why wavePoint() only answers at D.read 1.0. It releases the instant
       the clearer dies: a wave waiting on a corpse is worse than a wave in a
       minefield. */
    /* driveFlankers runs every FRAME, not every think, so the pathfinder is
       looked up only once something is actually waiting at a waypoint. */
    let waiting = false;
    for (const u of attackWave) if (u && !u.dead && u.flankTo) { waiting = true; break; }
    if (!waiting) return;
    const lead = wavePoint();
    for (const u of attackWave) {
      if (!u || u.dead || !u.flankTo) continue;
      if (u.order.type !== "idle" && u.order.type !== "guard") continue;
      if (lead && lead !== u && !lead.dead &&
          U.dist2(lead.x, lead.y, u.flankTo.x, u.flankTo.y) >
          U.dist2(u.x, u.y, u.flankTo.x, u.flankTo.y)) continue;
      u.give({ type: "attackmove", x: u.flankTo.x, y: u.flankTo.y });
      u.flankTo = null;
    }
  }
  function launchNavalWave(fleet) {
    navalWave = fleet.slice(0, 6);
    const t = navalTarget();
    if (t) for (const u of navalWave) u.give({ type: "attackmove", x: t.x, y: t.y });
  }
  function driveWave(wave, t) {
    if (!t) return;
    for (const u of wave)
      if (u.order.type === "idle" || u.order.type === "hover")
        u.give({ type: "attackmove", x: t.x, y: t.y });
  }

  /* strategic strike aim point: the densest cluster of enemy structures,
     because a silo shot is worth far more than one building                */
  function pickStrikeTarget() {
    /* Only structures we have seen, and only where our own radar can still
       watch the fall of shot - a strategic weapon is not fired at a memory. */
    const blds = intelB(r => !r.gone && G.radarCovers(P, r.x, r.y));
    if (!blds.length) return null;
    let best = null, bestScore = -1;
    for (const b of blds) {
      let score = 0;
      for (const o of blds) {
        const d = U.dist(b.x, b.y, o.x, o.y);
        if (d < 6 * CFG.TILE) score += (o.cost || 300) / 300 * (1 - d / (6 * CFG.TILE));
      }
      if (score > bestScore) { bestScore = score; best = b; }
    }
    return best ? { x: best.x, y: best.y } : null;
  }

  /* ================= choosing something worth attacking ==================
     The old scorer was (tier*2 + cluster*0.6 + cost/400) / (1 + travel*0.05),
     and three of those four terms were wrong or duplicated while the fourth
     was missing entirely:

       - Threat.tierOf grades a BUILDING purely on cost (nothing in its NAMED
         table is a structure and the only structural test it makes is
         def.superweapon), so tier*2 and cost/400 were the same number counted
         twice. The score was price tag plus neighbours over distance.
       - cluster counted neighbours without asking what they were, so four
         Concrete Barriers scored like four War Factories.
       - DEFENCES APPEARED NOWHERE. seenB has recorded r.key since the picture
         was written, so nest / atpost / flak / sam / coastal / arty have been
         individually on the plot with positions the whole time, and not one
         ground decision has ever looked at them. That is the player's
         complaint in one line.
       - and the commitment comment was a lie about its own code: `if (!aim ||
         aim.id !== best.id)` re-scored every candidate every think and
         replaced the aim the moment anything edged ahead by a point, so two
         near-equal objectives made a wave that turned round every 1.6 seconds
         and arrived at neither.

     The replacement puts both sides of the decision in the same unit -
     credits - so the weight of the defence term is not a constant anybody has
     to guess at. score = worth - price, over travel.                      */
  const DWELL = 20, HP_CR = 0.70, AIM_MIN = 18;
  function shy(id, secs) { aimShy.set(id, G.time + secs); }

  /* The filter that was written inline in think() and is now wanted in three
     places - the composition block, warAim's siege test and the wave launcher.
     Lifted verbatim rather than rewritten, so the three cannot drift apart and
     disagree about what counts as the army. */
  function groundArmy() {
    return P.units.filter(u => !u.dead && u.cat !== "aircraft" && !u.def.harvester &&
      !u.def.supply && u.def.role !== "recon" && u.def.role !== "sam" &&
      u.def.role !== "tel" && u.def.role !== "mineclear" &&
      u.def.weapons.length && u.layer === "ground");
  }

  /* ---- the plot, priced ----
     One pass answering both halves of the question at once, because they are
     the same walk over the same remembered structures: what each objective is
     worth, and what the garrison around it will cost us to get past. Cached
     for four seconds - the picture itself only refreshes every 0.8s, and
     warAim() is called five or six times a think. */
  function objectives() {
    const now = G.time;
    if (survey && now - surveyT < 4) return survey;
    surveyT = now;
    for (const [k, v] of aimShy) if (v < now) aimShy.delete(k);

    const rid = rival ? rival.idx : -1;
    let pool = intelB(r => !r.gone && (rid < 0 || r.own === rid));
    if (!pool.length) pool = intelB(r => !r.gone);
    if (!pool.length) { survey = []; return survey; }

    /* How armoured our own wave is. This decides whether a Machine-Gun Nest is
       an obstacle or a nuisance, and it is our own force, not intelligence. */
    const heavyShare = ourHardShare();

    /* Haulers on the plot. seenU has recorded r.harvester since the picture
       was written and no ground decision has ever read it. A hauler is 1,100
       credits of truck carrying 700 a run and it is the only thing on the map
       whose loss stops the enemy building anything at all, so a refinery with
       trucks working out of it is worth materially more than the same refinery
       standing idle - a distinction cost/400 could not make. */
    const haul = intelU(r => r.harvester, D.memory || 240);
    /* Every remembered needPower defence is a battery some plant holds up. */
    let coldable = 0;
    for (const r of pool) if (coldableGun(r.key)) coldable++;

    const R6 = Math.pow(6 * CFG.TILE, 2), R10 = Math.pow(10 * CFG.TILE, 2);
    const read = D.read === undefined ? 1 : D.read;
    const out = [];
    for (const r of pool) {
      let worth = worthOf(r.key);
      if (r.key === "power") worth += Math.min(4, coldable) * 260;
      let dps = 0, reach = 0;
      for (const o of pool) {
        const d2 = U.dist2(r.x, r.y, o.x, o.y);
        /* neighbours weighted by what they ARE: four War Factories are a
           reason to come, four Concrete Barriers are not */
        if (d2 < R6 && o !== r) worth += worthOf(o.key) * 0.12;
        const g = gunProfile(o.key);
        if (g && d2 < Math.pow(g.range * CFG.TILE, 2)) {
          dps += g.hard * heavyShare + g.soft * (1 - heavyShare);
          if (g.reach > reach) reach = g.reach;
        }
      }
      for (const h of haul) if (U.dist2(r.x, r.y, h.x, h.y) < R10) worth += 500;
      /* The one threat field knows about things that are not buildings - the
         ground our own waves have been shot on. MAX rather than a sum: the
         field already counts these emplacements, and adding the two would
         charge for the same anti-tank gun twice. */
      dps = Math.max(dps, exposureAt(r.x, r.y, heavyShare));
      /* fire into money: dps for DWELL seconds costs dps*DWELL hit points, and
         a hit point is about 1/HP_CR credits across this roster. Both sides of
         the comparison are credits now, so there is no weighting constant
         between them to argue about. */
      const price = dps * DWELL / HP_CR * read;
      const travel = U.dist(P.homeX, P.homeY, r.x, r.y) / CFG.TILE;
      let score = (worth - price) / (1 + travel * 0.045);
      /* an objective a wave has already broken itself on is not deleted - the
         last building standing has to be attacked eventually - it is merely
         made unattractive for a wave cycle */
      const until = aimShy.get(r.id);
      if (until && until > now) score *= 0.25;
      out.push({ id: r.id, x: r.x, y: r.y, ref: r.ref, key: r.key,
                 worth, price, dps, reach, travel, score });
    }
    out.sort((a, b) => b.score - a.score);
    survey = out;
    return survey;
  }
  function aimCand(id) { const l = objectives(); for (const c of l) if (c.id === id) return c; return null; }

  /* ---- storm, besiege, or leave it alone ----
     Bypass needs no code of its own, and that is the point of pricing the
     defence in the same units as the prize: with score = worth - price a
     strongpoint stops being the top of the list and the wave walks to the next
     thing on it. What needs code is the third answer, and it has a mechanical
     test rather than a mood.

     The deepest ground weapon on a position is knowable from the published
     tables: nest 6.0, atpost 7.5, coastal 13.5, arty 16.0 - flak and sam do
     not count, their tgt.ground is 0 and they cannot touch a gun line. Ours
     are howitzer 20.4, mlrs 23.2, mortar 10.7, so a gun line presently
     outranges every emplacement in the game, the howitzer bunker included.
     The test is written as a margin rather than as a list of building ids
     precisely so that it keeps answering correctly when generations.js
     rewrites those ranges for another army or another decade. If two or more
     tubes outrange the position by that margin it can be taken down for
     nothing:
     frag scores 0.75 against structure armour and resolveArmor returns null
     for buildings, so there is no penetration check to fail and no reply to
     take. The one thing we cannot outrange is another Howitzer Emplacement at
     16.0, and the test says so rather than pretending otherwise. */
  function aimMode(c, army) {
    if (!c) return "storm";
    if ((D.read || 0) < 0.55) return "storm";      // siege is a taught skill
    if (c.price < c.worth * 0.45) return "storm";  // cheap enough to walk into
    let tubes = 0, reach = 0;
    for (const u of army) {
      const role = u.def.role;
      if (role !== "spg" && role !== "mlrs" && role !== "mortar") continue;
      tubes++;
      for (const wn of u.def.weapons) {
        const w = WEAPONS[wn];
        if (w && w.tgt && w.tgt.ground && w.range > reach) reach = w.range;
      }
    }
    if (tubes >= 2 && reach >= c.reach + 2.5) return "siege";
    /* Dear, and nothing of ours shoots further than they do. It is still the
       best thing on the list or we would not be here, so it gets stormed - and
       if that wave breaks, waveSpent() writes the position off and the next
       one goes somewhere else. */
    return "storm";
  }

  /* Where the gun line stands: on our side of the objective, at the deepest
     defensive gun's range plus three tiles. Close enough that a 20-tile
     howitzer covers the position comfortably, far enough that a 7.5-tile
     anti-tank gun never sees it. The screen is sent here on a guard and the tubes on a
     bombard, never on an attackmove: a gun that acquires something on the way
     in halts at its own weapon range, which is the wrong range, and dies to
     the emplacement it was sent out to outrange. */
  function siegePoint(c) {
    const M = G.map, T2 = CFG.TILE;
    const dx = P.homeX - c.x, dy = P.homeY - c.y;
    const len = Math.hypot(dx, dy) || 1;
    const stand = (Math.max(c.reach || 6, 6) + 3) * T2;
    let x = U.clamp(c.x + dx / len * stand, T2, (M.W - 2) * T2);
    let y = U.clamp(c.y + dy / len * stand, T2, (M.H - 2) * T2);
    /* the standoff has to be ground the guns can actually stand on: on a map
       where that point is water or cliff the siege would otherwise stall with
       the screen sitting on guard and the tubes pathing round for ever */
    const tx = (x / T2) | 0, ty = (y / T2) | 0;
    if (!GameMap.passable(M, tx, ty, "ground")) {
      const n = Path.nearest(M, tx, ty, "ground", null, 6);
      if (n) { x = (n.x + 0.5) * T2; y = (n.y + 0.5) * T2; }
    }
    return { x, y };
  }

  /* How much of the wave that was committed is still standing, in hit points
     rather than in bodies - a wave of six survivors on a tenth of their health
     is not a wave. attackWave is pruned of the dead every think, so counting
     what is left against what was booked is the only way to know, and nothing
     has ever booked it. Without this the commander cannot tell an assault that
     is working from one that is being destroyed, which is why it would send
     the next wave at the same position, and the one after that. */
  function bookWave() {
    let hp = 0;
    for (const u of attackWave) if (!u.dead) hp += u.hp;
    waveBook = { hp, t: G.time };
  }
  function waveSpent() {
    if (!waveBook || waveBook.hp <= 0) return 0;
    if (G.time - waveBook.t < 12) return 0;        // it has not arrived yet
    let hp = 0;
    for (const u of attackWave) if (!u.dead) hp += u.hp;
    return 1 - hp / waveBook.hp;
  }

  /* ---- a hauler in the open ----
     This used to be the first thing warAim() did: pull the harvester
     sightings and, on a flat 35% of thinks, return the FIRST one regardless of
     what it was worth, where it was, or what was parked around it - before a
     single objective had been scored. Better than a third of every wave in the
     game was sent after whichever lorry happened to be at the head of a Map
     iterator. It is a candidate now like anything else, and it only takes the
     wave if it beats the best standing objective outright. It gets a fifteen
     second hold rather than most of a wave cycle, because a lorry is a target
     of opportunity and not a war aim, and it is never written off - a hauler
     that got away is not a strongpoint. */
  function raidAim(best) {
    const hv = intelU(r => r.harvester, 6);
    if (!hv.length) return null;
    const hs = ourHardShare();
    const read = D.read === undefined ? 1 : D.read;
    let pick = null, ps = -Infinity;
    for (const r of hv) {
      const e = trackedEntity(r);
      if (!e) continue;
      const price = exposureAt(r.x, r.y, hs) * DWELL / HP_CR * read;
      const travel = U.dist(P.homeX, P.homeY, r.x, r.y) / CFG.TILE;
      const s = (1800 - price) / (1 + travel * 0.045);
      if (s > ps) { ps = s; pick = { r, e }; }
    }
    if (!pick || ps <= 0) return null;
    if (best && best.score >= ps) return null;
    return { id: pick.r.id, x: pick.e.x, y: pick.e.y, ref: pick.e, key: "harvester",
             t: G.time, mode: "raid", raid: true, worth: 1800, price: 0,
             score: ps, stand: null };
  }

  /* ---- when to walk away ----
     Four triggers, and "something scored slightly higher" is deliberately not
     one of them. */
  function reviewAim(now) {
    const held = now - aim.t;
    if (aim.raid) {
      const r = seenU.get(aim.id);
      if (!r || !trackedEntity(r)) return true;    // lost the track: it is gone
      aim.x = r.x; aim.y = r.y;                    // lorries move
      return held > 15;
    }
    /* 1. gone - taken, or looked at and not there. forgetStale has already
          decided this properly; there is nothing to add. */
    const rec = seenB.get(aim.id);
    if (!rec || rec.gone || (aim.ref && aim.ref.dead)) return true;

    /* 2. the wave is losing. Whatever is on that position, it is not coming
          down to what is left - and the NEXT wave must not be sent at it
          either, so it is written off for a wave cycle rather than merely
          dropped. This is the line that stops the commander feeding the same
          three tanks into the same three anti-tank guns for the rest of the
          battle. */
    if ((D.read || 0) > 0 && waveSpent() > 0.55) {
      shy(aim.id, D.waveTime || 150);
      return true;
    }

    /* 3. it turned out to be defended. Re-priced against what we signed up for
          when we committed; the first response is to change METHOD, not
          target, because a position we can outrange is a position we want. */
    if (held > 8 && (D.read || 0) >= 0.35) {
      const c = aimCand(aim.id);
      if (c && c.price > aim.price * 1.6 + 200) {
        if (aim.mode !== "siege" && aimMode(c, groundArmy()) === "siege") {
          aim.mode = "siege"; aim.price = c.price; aim.reach = c.reach;
          aim.stand = siegePoint(c);
          return false;
        }
        shy(aim.id, (D.waveTime || 150) * 0.8);
        return true;
      }
      /* the reverse: the guns have done their work and the emplacements that
         made this a siege are off the plot. Walk in and take it. */
      if (c && aim.mode === "siege" && c.price < c.worth * 0.35) {
        aim.mode = "storm"; aim.price = c.price; aim.stand = null; siegeAt = null;
        return false;
      }
    }

    /* 4. the hold expires. */
    if (held >= (D.waveTime || 150) * 0.6) return true;

    /* ...and only then, a materially better objective. 1.35x plus a flat 250
       credits, and never inside AIM_MIN seconds of the last change. Two
       targets of equal worth must not be able to trade places, which is
       exactly the thrash the old line produced on every single think. */
    if (held > AIM_MIN) {
      const top = objectives()[0];
      if (top && top.id !== aim.id && top.score > aim.score * 1.35 + 250) return true;
    }
    return false;
  }

  /* ---- the war aim ----
     Chosen from the plot rather than from the enemy's real building list, and
     now chosen by what the objective is worth MINUS what its garrison will
     cost to get past. Returning null is still a legitimate answer and still
     means "we have not found them yet": the wave holds and the scouts keep
     looking, and scoutGoal is what makes that wait short.

     Called five or six times a think - groundTarget, driveWave,
     driveLaunchers, pickAirTarget, navalTarget, runAmphib - so the review,
     which has side effects (it writes objectives off), is memoised on the
     game tick and runs once. */
  function warAim() {
    const now = G.time;
    if (aim && aimRvT === now) return aim;
    if (aim && !reviewAim(now)) { aimRvT = now; return aim; }
    aim = null; aimRvT = now;

    const list = objectives();
    let pick = list.length ? list[0] : null;
    /* Everything visible costs more to take than it is worth. That is a real
       answer, and the honest response is not to stand still: take the softest
       thing on the plot - the outlying derrick, the power plant on the edge of
       the perimeter - and let the economic term do the work while the factory
       builds something that can deal with the rest. This is the bypass branch
       and it needs no route planning: the wave simply walks at something
       else. */
    if (pick && pick.score <= 0) {
      /* ...but not an emplacement. A defence is the PRICE of an objective and
         never an objective, and the cheapest thing on a plot of nothing but
         negatives is reliably the outermost anti-tank gun - which is how a
         commander ends up being led round the map by the very guns it decided
         it could not afford to fight. Only if the plot is emplacements and
         nothing else does one of them become the aim. */
      let soft = null, any = null;
      for (const c of list) {
        if (!any || c.price < any.price) any = c;
        const d = BUILDINGS[c.key];
        if (d && d.cat === "defense") continue;
        if (!soft || c.price < soft.price) soft = c;
      }
      pick = soft || any;
    }
    /* a hauler in the open beats a building only if it actually beats it */
    const raid = raidAim(pick);
    if (raid) { aim = raid; return aim; }
    if (!pick) return null;

    const mode = aimMode(pick, groundArmy());
    aim = { id: pick.id, x: pick.x, y: pick.y, ref: pick.ref, key: pick.key,
            t: now, mode, raid: false, worth: pick.worth, price: pick.price,
            reach: pick.reach, score: pick.score,
            stand: mode === "siege" ? siegePoint(pick) : null };
    /* a siege decided here rather than on the approach still needs an
       aimpoint for the ballistic launchers, and the objective itself is the
       honest one: a 20-tile howitzer covers it from outside every emplacement
       on the position, so there is no need to take the guns first. */
    siegeAt = mode === "siege" ? { x: pick.x, y: pick.y, t: now } : null;
    return aim;
  }
  function groundTarget() { return warAim(); }

  /* ---- where a scout is worth sending ----
     The old goal was sixty random darts at the map scored by staleness over
     the length of the drive. On 144x144 the stalest passable tile is reliably
     an empty corner, so the commander spent the battle re-examining ground
     that never had anything on it - and since a wave cannot be aimed at ground
     nobody has found anything on, that is the early game the player reads as
     "it only knows one route": there was never a second candidate.

     What reconnaissance is FOR is candidate objectives and the approaches to
     them, in that order:
       1 unexamined deployment sites. That is where a base is.
       2 ore fields away from our own patch. map.ore is published terrain every
         player can see, so this is not a peek at anything - and where there is
         ore there are haulers, which objectives() prices above anything else.
       3 past a structure we have seen but never looked behind. One remembered
         outbuilding is nearly always the edge of a base whose middle we have
         never seen, and the middle is where the refinery is.
       4 the corridor the next wave has to walk down, so its defences are
         priced before the wave pays for them rather than after.
       5 only then the stalest ground - which is where we used to start, and is
         the whole of a Recruit's behaviour. */
  function surveyOre() {
    const M = G.map, W = M.W, H = M.H, B = 8;
    const bw = Math.ceil(W / B), bh = Math.ceil(H / B);
    const acc = new Float32Array(bw * bh), out = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const o = M.ore[y * W + x];
      if (o > 20) acc[((y / B) | 0) * bw + ((x / B) | 0)] += o;
    }
    for (let by = 0; by < bh; by++) for (let bx = 0; bx < bw; bx++) {
      if (acc[by * bw + bx] < 400) continue;
      const tx = (bx * B + B / 2) | 0, ty = (by * B + B / 2) | 0;
      const x = (tx + 0.5) * CFG.TILE, y = (ty + 0.5) * CFG.TILE;
      if (U.dist(x, y, P.homeX, P.homeY) < CFG.TILE * 20) continue;   // our own patch
      out.push({ tx, ty, x, y });
    }
    return out;
  }
  function scoutGoal(scout) {
    const now = G.time, T2 = CFG.TILE, M = G.map;
    if (hypo.length) return { x: (hypo[0].x + 0.5) * T2, y: (hypo[0].y + 0.5) * T2 };
    const read = D.read === undefined ? 1 : D.read;
    if (read > 0.2) {
      let best = null, bs = -Infinity;
      const bid = (x, y, w) => {
        const tx = (x / T2) | 0, ty = (y / T2) | 0;
        if (tx < 1 || ty < 1 || tx >= M.W - 1 || ty >= M.H - 1) return;
        if (!GameMap.passable(M, tx, ty, "ground")) return;
        const age = Math.min(600, staleness(tx, ty, now));
        if (age < 45) return;                        // somebody just looked
        const trip = U.dist(scout.x, scout.y, x, y) / T2;
        const s = age * w - trip * 6;
        if (s > bs) { bs = s; best = { x, y }; }
      };
      if (!oreSites) oreSites = surveyOre();
      for (const s of oreSites) bid(s.x, s.y, 1.6);
      for (const r of seenB.values()) {
        if (r.gone) continue;
        const dx = r.x - P.homeX, dy = r.y - P.homeY;
        const len = Math.hypot(dx, dy) || 1;
        bid(r.x + dx / len * T2 * 7, r.y + dy / len * T2 * 7, 1.3);
      }
      if (aim) for (let f = 0.35; f <= 0.86; f += 0.25)
        bid(P.homeX + (aim.x - P.homeX) * f, P.homeY + (aim.y - P.homeY) * f, 1.1);
      if (best) return best;
    }
    let goal = null, bestS = -Infinity;
    for (let n = 0; n < 60; n++) {
      const tx = (G.rng() * M.W) | 0, ty = (G.rng() * M.H) | 0;
      if (!GameMap.passable(M, tx, ty, "ground")) continue;
      const age = Math.min(600, staleness(tx, ty, now));
      const trip = U.dist(scout.x, scout.y, (tx + 0.5) * T2, (ty + 0.5) * T2) / T2;
      const sc = age / (1 + trip * 0.05);
      if (sc > bestS) { bestS = sc; goal = { x: (tx + 0.5) * T2, y: (ty + 0.5) * T2 }; }
    }
    return goal;
  }
  /* ---- acoustic barriers ----
     Laid from this commander's own remembered picture and nothing else: only
     once a submarine has actually been HELD, behind the same dossier.sawSub
     flag that decides whether to buy an ASW helicopter and set by a sonar
     contact or by one of ours being torpedoed. Reading the enemy's real unit
     list here would be the purest form of the cheat, because a submerged boat
     is precisely the thing no sensor of ours can find. */
  let barrierNext = 0;
  function driveBarrier() {
    if (typeof SonarNet === "undefined" || !G.sonarnet) return;
    if (G.time < barrierNext) return;
    barrierNext = G.time + 25;

    /* A datum goes to whatever ASW asset is idle. The datum tier never touches
       canSeeSub, so without this the commander pays for a sparse barrier and
       gets nothing back from it; with it, the barrier does for the AI exactly
       what it does for the player - it tells the helicopter where to look. */
    const dat = SonarNet.datums(G, P);
    if (dat.length) {
      const dm = dat[dat.length - 1];
      let best = null, bd = Infinity;
      for (const u of P.units) {
        if (u.dead || !u.def.sonar) continue;
        if (u.order.type !== "idle" && u.order.type !== "guard") continue;
        const dd = U.dist2(u.x, u.y, dm.x, dm.y);
        if (dd < bd) { bd = dd; best = u; }
      }
      if (best) best.give({ type: "attackmove", x: dm.x, y: dm.y });
    }

    const dS = dossier[rival ? rival.idx : -1];
    if (!dS || !dS.sawSub) return;
    const boats = P.units.filter(u => !u.dead && u.netMax > 0 && u.net > 0 &&
                                 (u.order.type === "idle" || u.order.type === "guard"));
    if (!boats.length) return;

    /* Where a staff would actually put one: the centroid of the places our own
       hulls have been shot at in the last twenty seconds, because that is where
       the enemy boat is working. Failing that, across the line from our naval
       yard to the water we care about, nearer our own end - a barrier covers an
       approach, and the approach we know about is the one to us. */
    let aim = null, ax = 0, ay = 0, an = 0;
    for (const al of alarms) { ax += al.x; ay += al.y; an++; }
    if (an) aim = { x: ax / an, y: ay / an };
    else {
      let yard = null;
      for (const b of P.buildings)
        if (!b.dead && b.def.produces === "naval") { yard = b; break; }
      const tg = navalTarget();
      if (!yard || !tg) return;
      aim = { x: yard.x + (tg.x - yard.x) * 0.35, y: yard.y + (tg.y - yard.y) * 0.35 };
    }
    const atx = U.clamp((aim.x / CFG.TILE) | 0, 1, G.map.W - 2);
    const aty = U.clamp((aim.y / CFG.TILE) | 0, 1, G.map.H - 2);
    const spot = Path.nearest(G.map, atx, aty, "sea", null, 9);
    if (!spot) return;
    const cx = (spot.x + 0.5) * CFG.TILE, cy = (spot.y + 0.5) * CFG.TILE;
    /* do not re-lay on top of a barrier that is still listening */
    if (SonarNet.countNear(G, P, cx, cy, 6) >= 3) return;

    /* A barrier is a LINE. The area order takes two corners, so the box is one
       lattice step deep and as long as the rack can fill, laid across the axis
       the boat came down rather than along it. */
    const boat = boats[0];
    const halfLen = CFG.TILE * 1.2 * Math.max(2, boat.net - 1);
    const acrossY = Math.abs(cx - boat.x) >= Math.abs(cy - boat.y);
    boat.give({ type: "autolay",
                x0: acrossY ? cx - CFG.TILE * 0.4 : cx - halfLen,
                y0: acrossY ? cy - halfLen : cy - CFG.TILE * 0.4,
                x1: acrossY ? cx + CFG.TILE * 0.4 : cx + halfLen,
                y1: acrossY ? cy + halfLen : cy + CFG.TILE * 0.4 });
  }

  /* The fleet's objective, off the plot rather than off the enemy's real
     building list. A naval yard we have seen is worth crossing the map for. */
  function navalTarget() {
    for (const r of seenB.values())
      if (!r.gone && (r.key === "navalyard" || r.key === "coastal")) return r;
    let best = null, bd = Infinity;
    for (const r of seenB.values()) {
      if (r.gone) continue;
      const spot = Path.nearest(G.map, r.tx, r.ty, "sea", null, 9);
      if (!spot) continue;
      const d = U.dist2(P.homeX, P.homeY, r.x, r.y);
      if (d < bd) { bd = d; best = r; }
    }
    return best || groundTarget();
  }
  /* What an airframe is sent after. A weapon needs a real entity, so this only
     ever answers with something we are holding a live track on; when all we
     have is a memory the caller flies an armed sweep to it instead. It used to
     walk the enemy's real unit list, which is how a fighter could be vectored
     onto an aircraft nobody had detected. */
  /* ---- defence suppression ----
     An anti-radiation round is held, so acquire() will not pick a radar up for
     it any more and an armed sweep is a flight that lands with full pylons. The
     commander has to NAME the emitter, which is the only thing this aircraft
     was ever bought for - HARM does triple damage to a radar fit and next to
     nothing to anything else.

     An emitter is a thing that RADIATES, not a thing with a particular role.
     `role:"aa"` is thirty MANPADS teams and optically-directed towed guns with
     no set at all, and role "spaag" - nineteen of twenty-three of which carry
     one - would have been left out entirely. def.radar || def.jam is the test
     combat.js's own damage table uses and the test acquire() uses; using it
     here means the three cannot disagree.

     Contacts only: trackedEntity() is the honest-sensor gate every other branch
     in this function uses. The building fallback reads r.ref directly, which is
     what warAim() already does for structures - stated plainly rather than
     claimed to be a tracked contact, because it is not one. */
  function pickEmitter(a) {
    let best = null, bd = Infinity;
    for (const r of seenU.values()) {
      if (r.layer !== "ground") continue;
      const e = trackedEntity(r);
      if (!e || !e.def || !(e.def.radar || e.def.jam)) continue;
      if (!a.canTarget(e)) continue;              // commanded question: held rounds count
      const d = U.dist2(a.x, a.y, e.x, e.y);
      if (d < bd) { bd = d; best = e; }
    }
    if (best) return best;
    for (const r of seenB.values()) {
      if (r.gone || (r.key !== "radar" && r.key !== "sam")) continue;
      if (!r.ref || r.ref.dead || !a.canTarget(r.ref)) continue;
      const d = U.dist2(a.x, a.y, r.x, r.y);
      if (d < bd) { bd = d; best = r.ref; }
    }
    return best;
  }
  function pickAirTarget(a) {
    /* TERMINAL, not a fall-through. Role "sead" is neither "fighter" nor "cas",
       so it fell into the gunship branch and could come back with an enemy MBT
       or a refinery - and ai.js then issues a COMMANDED attack order, which
       releases, so the AI would have put anti-radiation missiles into tanks at
       0.35x. Returning null instead drops it to the sweep branch, where AI-2
       holds it on the ramp. */
    if (a.def.role === "sead" || a.def.role === "ewair") return pickEmitter(a);
    if (a.def.role === "fighter") {
      let best = null, bd = Infinity;
      for (const r of seenU.values()) {
        if (r.layer !== "air") continue;
        const e = trackedEntity(r);
        if (!e || e.targetLayer() !== "air") continue;
        const d = U.dist2(a.x, a.y, e.x, e.y);
        if (d < bd) { bd = d; best = e; }
      }
      return best;
    }
    if (a.def.role !== "cas") {
      /* gunships hunt armour and haulers, and only ones actually on the plot */
      let best = null, bd = Infinity;
      for (const r of seenU.values()) {
        if (r.layer !== "ground") continue;
        const e = trackedEntity(r);
        if (!e) continue;
        if (!(e.def.harvester || e.armor === "heavy")) continue;
        const d = U.dist2(a.x, a.y, e.x, e.y);
        if (d < bd) { bd = d; best = e; }
      }
      if (best) return best;
    }
    /* fall through: hit the objective, if it is a structure we can still see */
    const t = warAim();
    if (!t) return null;
    return (t.ref && !t.ref.dead) ? t.ref : null;
  }
  /* where an airframe should sweep when nothing is held on radar */
  function airSweepPoint() {
    const t = aim || intelHome(rival);
    return t ? { x: t.x, y: t.y } : null;
  }

  /* ---- the defence reflex ----
     Two changes. It used to scan every hostile player's real unit list for
     anything within twenty tiles of home, which found a submarine, a stealth
     aircraft or a unit behind a hill just as readily as one in plain sight;
     now it answers to things we have actually been shot by, and to armed
     contacts we are holding on the plot. And it watches every structure we
     own rather than the start position - a commander whose refinery is being
     eaten across the map used to notice nothing at all, because homeX/homeY is
     the tile the battle began on. */
  function defendBase(army) {
    let threat = null;
    /* being shot at is the loudest thing that can happen */
    let hot = null, hotK = 0;
    for (const a of alarms) {
      const k = (a.tier || 1) * (1 - (G.time - a.t) / 25);
      if (k > hotK) { hotK = k; hot = a; }
    }
    for (const r of seenU.values()) {
      if (!r.armed) continue;
      const e = trackedEntity(r);
      if (!e) continue;
      let near = U.dist(e.x, e.y, P.homeX, P.homeY) < CFG.TILE * 22;
      if (!near) for (const b of P.buildings) {
        if (b.dead) continue;
        if (U.dist(e.x, e.y, b.x, b.y) < CFG.TILE * 14) { near = true; break; }
      }
      if (near) { threat = e; break; }
    }
    if (!threat && hot && hotK > 0) {
      /* nothing visible, but rounds are landing: push the reserve at the
         bearing they came from rather than standing in the open */
      for (const u of army) {
        if (attackWave.indexOf(u) >= 0) continue;
        if (u.order.type === "idle" || u.order.type === "guard")
          u.give({ type: "attackmove", x: hot.x, y: hot.y });
      }
      return;
    }
    if (!threat) return;
    for (const u of army) {
      if (attackWave.indexOf(u) >= 0) continue;
      /* Marked auto, so it is a reflex and not a release. Ask the automatic
         question before handing the order out, or it arrives, engage() finds no
         weapon it may use and drops the unit to idle, and this block hands it
         out again on the next think.
         For HELD rounds this guard is unreachable - groundArmy() already
         excludes aircraft, sam and tel - and it is kept for a pre-existing bug
         instead: the seenU scan above filters on armed and distance but not on
         LAYER, so an enemy aircraft near the base hands an attack order to
         every idle ground unit and trades order for idle every think. */
      if (!u.canTarget(threat, true)) continue;
      if (u.order.type === "idle" || u.order.type === "guard")
        u.give({ type: "attack", target: threat, auto: true });
    }
  }

  return {
    init, update,
    get player() { return P; },
    /* The explored map, so the engine can hold this commander's harvesters to
       the same rule the human's obey, and so a test can see what it knows. */
    get look() { return look; },
    intel() {
      /* the new state is exposed for the same reason `look` already is: so a
         test or a debug overlay can see whether any of this is firing */
      return { buildings: seenB.size, units: seenU.size, alarms: alarms.length,
               hypotheses: hypo.length, dossier: dossier,
               home: intelHome(rival), aim: aim,
               graves: graves.length, axes: lastAxes.slice(), siege: siegeAt,
               arms: foeArms(), mix: counterMix(foeArms()),
               objectives: objectives().slice(0, 6),
               /* Exposed for the same reason `look`, `graves` and `axes`
                  already are: so a test or an overlay can see whether any of
                  this is firing, rather than inferring it from a commander
                  that quietly never buys a tanker. */
               logistics: { bill: supplyBill().bill, fuelBreak: fuelBreak,
                            sea: fleetFuel().risk, orbit: logiOrbit,
                            trucks: count(u => u.def.supply && u.cat === "vehicle"),
                            oilers: count(u => u.def.role === "oiler"),
                            tankers: count(u => u.def.refuelRate) },
               repair: repairLedger(),
               mines: { signs: mineSigns.length, seen: knownMines().length,
                        foeVeh: foeVehSeen(),
                        raidHeat: raidHeat, gap: gapSector(),
                        layers: unitsOf("minelayer").length,
                        clearers: unitsOf("mineclear").length },
               exposureAt: (x, y, hs) => exposureAt(x, y, hs === undefined ? 0.6 : hs) };
    },
  };
}

/* ---- registry: the game drives every commander through one update ---- */
const commanders = [];
return {
  create(game, player, diff, personality) {
    const c = makeCommander();
    c.init(game, player, diff, personality);
    commanders.push(c);
    return c;
  },
  reset() { commanders.length = 0; },
  /* legacy single-AI entry point still used by older call sites */
  init(game, player, diff, personality) {
    commanders.length = 0;
    return this.create(game, player, diff, personality);
  },
  update(dt) { for (let i = 0; i < commanders.length; i++) commanders[i].update(dt); },
  get count() { return commanders.length; },
  /* the explored map belonging to a given commander, or null if that player is
     not run by one - which keeps the human and the neutral player unaffected */
  lookOf(player) {
    for (const c of commanders) if (c.player === player) return c.look;
    return null;
  },
  intelOf(player) {
    for (const c of commanders) if (c.player === player) return c.intel();
    return null;
  },
  personalities: PERSONALITY_LIST,
  personalityName(k) { return (PERSONALITY[k] || PERSONALITY.balanced).name; },
};
})();
